import { type EventSourceMessage, fetchEventSource } from '@microsoft/fetch-event-source';

//===================================================================
// 统一返回格式
//
// 后端各接口返回结构差异较大，统一归一化为下面的 Result：
//   success  请求是否成功（网络/HTTP/超时/鉴权错误均为 false）
//   data     业务数据
//   total    列表类接口的总条数（可选）
//   hasMore  是否还有更多数据（可选，分页/无限滚动场景）
//   message  提示或错误信息（可选）
//
// 工具本身永远 resolve，不会 reject —— 调用方只需判断 success。
//===================================================================
export interface Result<T = unknown> {
  success: boolean;
  data?: T;
  total?: number;
  hasMore?: boolean;
  message?: string;
}

//===================================================================
// 配置：所有项目相关的逻辑都通过配置注入，工具本身保持通用
//===================================================================
export interface RequestContext {
  /** 调用方传入的原始 url（未经 resolveUrl 处理） */
  url: string;
  /** 请求方法 */
  method: string;
  /** 即将发送的 RequestInit */
  init: RequestInit;
}

export interface HttpClientConfig {
  /**
   * 将调用方的 url 解析为最终请求地址。
   * 用于拼接 baseURL / 不同服务前缀等项目相关逻辑。默认原样返回。
   */
  resolveUrl?: (url: string, method: string) => string;
  /**
   * 自定义请求头，由调用方控制（鉴权、CSRF、语言等）。
   * 返回的头会与每个请求自带的头合并（自定义头优先）。
   */
  headers?: (ctx: RequestContext) => HeadersInit | undefined | Promise<HeadersInit | undefined>;
  /** 请求超时时间(ms)，默认 20000；<= 0 表示不超时。 */
  timeout?: number;
  /**
   * 收到 401 时的回调，由调用方决定如何处理（如清理会话、跳转登录）。
   * 仍会正常返回 success: false 的 Result。
   */
  onUnauthorized?: (response: Response) => void;
  /** 统一错误回调（HTTP 错误、超时、网络异常等）。 */
  onError?: (error: Error, response?: Response) => void;
  /**
   * 将原始 Response 归一化为 Result。默认实现见 defaultNormalize，
   * 已能处理 JSON 对象 / 数组 / 纯文本 / 二进制 / 空响应等常见情况。
   * 后端格式特殊时可整体覆盖。
   */
  normalize?: <T>(response: Response) => Promise<Result<T>>;
}

//===================================================================
// 下载参数
//===================================================================
export interface DownloadParam {
  type?: 'blob' | 'data';
  filename?: string;
  noClick?: boolean;
}

//===================================================================
// SSE 流式请求选项
//===================================================================
export interface StreamOptions<T = unknown> {
  /** 请求 URL */
  url: string;
  /** 请求方法，默认 GET */
  method?: 'GET' | 'POST';
  /** 请求体数据 */
  data?: Record<string, unknown>;
  /** 收到消息时的回调 */
  onMessage: (data: T, event?: EventSourceMessage) => void;
  /** 结束条件判断函数，返回 true 时自动结束请求 */
  shouldStop?: (data: T, event?: EventSourceMessage) => boolean;
  /** 请求打开时的回调 */
  onOpen?: () => void;
  /** 请求关闭时的回调 */
  onClose?: () => void;
  /** 错误回调 */
  onError?: (error: Error) => void;
}

//===================================================================
// 工具函数
//===================================================================
const isPlainObject = (v: unknown): v is Record<string, unknown> =>
  typeof v === 'object' && v !== null && !Array.isArray(v);

/** 合并多组请求头，后者覆盖前者。 */
const mergeHeaders = (...sources: (HeadersInit | undefined)[]): Headers => {
  const result = new Headers();
  for (const source of sources) {
    if (!source) continue;
    new Headers(source).forEach((value, key) => result.set(key, value));
  }
  return result;
};

/** 给 fetch 加超时控制（基于 AbortController）。 */
const withTimeout = async (
  run: (signal: AbortSignal) => Promise<Response>,
  timeout: number,
  externalSignal?: AbortSignal | null
): Promise<Response> => {
  if (timeout <= 0) {
    return run(externalSignal ?? new AbortController().signal);
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(new DOMException('Request timeout', 'TimeoutError')), timeout);

  // 透传调用方自带的取消信号
  externalSignal?.addEventListener('abort', () => controller.abort(externalSignal.reason), { once: true });

  try {
    return await run(controller.signal);
  } finally {
    clearTimeout(timer);
  }
};

const createAndClickAnchor = (url: string, filename?: string) => {
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename ?? `file-${new Date().getTime()}`;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  window.URL.revokeObjectURL(url);
};

const tryParseJSON = (str: string): unknown => {
  try {
    return JSON.parse(str);
  } catch {
    return str;
  }
};

//===================================================================
// 默认归一化：把五花八门的后端返回收敛到 Result
//===================================================================
const defaultNormalize = async <T>(response: Response): Promise<Result<T>> => {
  if (response.status === 204) {
    return { success: true };
  }

  const contentType = response.headers.get('content-type') ?? '';

  // 纯文本 / 二进制：整体作为 data 返回
  if (!contentType.includes('application/json')) {
    const text = await response.text();
    return { success: true, data: (text || undefined) as T };
  }

  const raw = await response.json().catch(() => undefined);

  // 数组：直接作为 data
  if (Array.isArray(raw)) {
    return { success: true, data: raw as T, total: raw.length };
  }

  // 对象：尽量从常见字段中提取 data / total / hasMore / message
  if (isPlainObject(raw)) {
    const total = (raw.total ?? raw.count) as number | undefined;
    // 是否还有更多：兼容 has_more / hasMore / has_next / hasNext 等命名
    const hasMore = (raw.has_more ?? raw.hasMore ?? raw.has_next ?? raw.hasNext ?? raw.has_next_page ?? raw.hasNextPage) as boolean | undefined;
    const message = (raw.message ?? raw.msg) as string | undefined;
    const success = typeof raw.success === 'boolean' ? raw.success : true;

    let data: unknown;
    if ('data' in raw && !('id' in raw)) data = raw.data;
    else if ('results' in raw) data = raw.results;
    else if ('tasks' in raw) data = raw.tasks;
    else if ('templates' in raw) data = raw.templates;
    else data = raw; // 没有公认的容器字段时，整个对象即数据

    return {
      success,
      data: (data ?? undefined) as T,
      ...(total !== undefined ? { total } : {}),
      ...(hasMore !== undefined ? { hasMore } : {}),
      ...(message !== undefined ? { message } : {})
    };
  }

  // 原始值（字符串/数字/布尔/null）
  return { success: true, data: (raw ?? undefined) as T };
};

//===================================================================
// 从响应中提取错误信息
//===================================================================
const extractErrorMessage = async (response: Response): Promise<string> => {
  const fallback = `HTTP error ${response.status}`;
  try {
    const data = await response.clone().json();
    if (isPlainObject(data)) {
      return (data.message || data.msg || data.error || data.code || fallback) as string;
    }
  } catch {
    // 响应体非 JSON，使用默认信息
  }
  return fallback;
};

//===================================================================
// HttpClient：文件唯一的对外接口
//
// 用法：
//   const http = new HttpClient({ resolveUrl, headers, onUnauthorized });
//   const res = await http.get('/api/list');
//===================================================================
export class HttpClient {
  private config: HttpClientConfig;

  constructor(config: HttpClientConfig = {}) {
    this.config = config;
  }

  /** 合并（更新）配置，通常在应用启动时调用一次。 */
  configure(config: HttpClientConfig): void {
    this.config = { ...this.config, ...config };
  }

  async request<T = unknown>(url: string, init: RequestInit, download?: DownloadParam): Promise<Result<T>> {
    const config = this.config;
    const method = init.method ?? 'GET';
    const finalUrl = config.resolveUrl ? config.resolveUrl(url, method) : url;
    const timeout = config.timeout ?? 20000;

    let response: Response | undefined;
    try {
      const customHeaders = await config.headers?.({ url, method, init });
      const requestInit: RequestInit = {
        ...init,
        headers: mergeHeaders(init.headers, customHeaders)
      };

      response = await withTimeout(
        (signal) => fetch(finalUrl, { ...requestInit, signal }),
        timeout,
        init.signal
      );

      if (response.status === 401) {
        config.onUnauthorized?.(response);
      }

      if (!response.ok) {
        const message = await extractErrorMessage(response);
        config.onError?.(new Error(message), response);
        return { success: false, message };
      }

      // 下载：返回对象 URL（noClick）或直接触发下载
      if (download) {
        let downloadUrl: string;
        if (download.type === 'data') {
          const json = await response.json();
          downloadUrl = (json as { data: string }).data;
        } else {
          downloadUrl = window.URL.createObjectURL(await response.blob());
        }

        if (!download.noClick) {
          createAndClickAnchor(downloadUrl, download.filename);
          return { success: true };
        }
        return { success: true, data: downloadUrl as T };
      }

      const normalize = config.normalize ?? defaultNormalize;
      return await normalize<T>(response);
    } catch (e) {
      const error = e instanceof Error ? e : new Error(String(e));
      const message =
        error.name === 'TimeoutError'
          ? 'Request timeout'
          : error.message || 'Network error';
      config.onError?.(error, response);
      return { success: false, message };
    }
  }

  get<T = unknown>(url: string, params?: Record<string, unknown>): Promise<Result<T>> {
    let download: DownloadParam | undefined;

    if (params) {
      if (params.download) {
        download = params.download as DownloadParam;
        delete params.download;
      }

      const paramsArray: string[] = [];
      Object.keys(params).forEach((key) => {
        const value = params[key];
        if (Array.isArray(value)) {
          value.forEach((item) => paramsArray.push(`${key}=${item}`));
        } else {
          paramsArray.push(`${key}=${value}`);
        }
      });

      if (paramsArray.length) {
        url += (url.includes('?') ? '&' : '?') + paramsArray.join('&');
      }
    }

    return this.request<T>(url, { method: 'GET' }, download);
  }

  post<T = unknown>(url: string, data?: unknown): Promise<Result<T>> {
    if (data instanceof FormData) {
      return this.request<T>(url, { method: 'POST', body: data });
    }

    const dataRecord = data as Record<string, unknown> | undefined;
    const contentType = dataRecord?.['content-type'] as string | undefined;
    delete dataRecord?.['content-type'];

    return this.request<T>(url, {
      method: 'POST',
      headers: { 'content-type': contentType ?? 'application/json' },
      body: dataRecord
        ? contentType === 'application/x-www-form-urlencoded'
          ? new URLSearchParams(dataRecord as Record<string, string>)
          : JSON.stringify(dataRecord)
        : undefined
    });
  }

  put<T = unknown>(url: string, data?: unknown): Promise<Result<T>> {
    if (data instanceof FormData) {
      return this.request<T>(url, { method: 'PUT', body: data });
    }
    return this.request<T>(url, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: data ? JSON.stringify(data) : undefined
    });
  }

  del<T = unknown>(url: string, data?: unknown): Promise<Result<T>> {
    return this.request<T>(url, {
      method: 'DELETE',
      headers: { 'content-type': 'application/json' },
      body: data ? JSON.stringify(data) : undefined
    });
  }

  patch<T = unknown>(url: string, data?: unknown): Promise<Result<T>> {
    return this.request<T>(url, {
      method: 'PATCH',
      headers: { 'content-type': 'application/json' },
      body: data ? JSON.stringify(data) : undefined
    });
  }

  stream<T = unknown>(options: StreamOptions<T>): AbortController {
    const config = this.config;
    const { url, method = 'GET', data, onMessage, shouldStop, onOpen, onClose, onError } = options;

    const abortController = new AbortController();
    let hasStopped = false;

    const finalUrl = config.resolveUrl ? config.resolveUrl(url, method) : url;
    const init: RequestInit = { method, body: data ? JSON.stringify(data) : undefined };

    const startup = async () => {
      const customHeaders = await config.headers?.({ url, method, init });
      const headers = mergeHeaders({ 'Content-Type': 'application/json' }, customHeaders);

      await fetchEventSource(finalUrl, {
        method,
        headers: Object.fromEntries(headers.entries()),
        body: init.body as string | undefined,
        signal: abortController.signal,
        openWhenHidden: true,

        onopen: async (response) => {
          if (response.status === 401) {
            config.onUnauthorized?.(response);
          }
          if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
          }
          onOpen?.();
        },

        onmessage: (event) => {
          if (!event.data || hasStopped) return;

          (async () => {
            try {
              const parsedData = tryParseJSON(event.data) as T;
              if (shouldStop?.(parsedData, event)) {
                if (hasStopped) return;
                hasStopped = true;
                await onMessage(parsedData, event);
                abortController.abort();
                onClose?.();
              } else {
                await onMessage(parsedData, event);
              }
            } catch {
              if (shouldStop?.(event.data as T, event)) {
                if (hasStopped) return;
                hasStopped = true;
                abortController.abort();
                onClose?.();
              }
            }
          })();
        },

        onclose: () => {
          if (!hasStopped) onClose?.();
        },

        onerror: (error) => {
          onError?.(error instanceof Error ? error : new Error(String(error)));
          throw error;
        }
      });
    };

    startup().catch((error) => {
      onError?.(error instanceof Error ? error : new Error(String(error)));
    });

    return abortController;
  }
}
