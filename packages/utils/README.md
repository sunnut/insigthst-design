# @insightst-design/utils

通用工具函数库，包含请求封装（HttpClient）、会话管理（SessionManager）、样式工具（clsx）等。

## 安装

```bash
npm install @insightst-design/utils
```

---

## HttpClient

基于 `fetch` 封装的 HTTP 请求工具，支持 GET、POST、PUT、DELETE、PATCH 及 SSE 流式请求。

### 创建实例

```ts
import { HttpClient } from "@insightst-design/utils";

const http = new HttpClient({
  // 将原始 URL 解析为完整请求地址
  resolveUrl: (url) => `/api/v1${url}`,
  // 请求头（支持异步）
  headers: () => ({
    authorization: `Bearer ${getToken()}`,
    "accept-language": "zh-CN",
  }),
  // 超时时间（ms），默认 20000；<= 0 表示不超时
  timeout: 10000,
  // 401 未授权回调
  onUnauthorized: () => {
    window.location.href = "/login";
  },
  // 全局错误回调
  onError: (error) => {
    console.error("Request error:", error.message);
  },
});
```

### GET 请求

```ts
interface User {
  id: number
  name: string
  role: string
}

interface PageResult {
  list: User[]
  total: number
}

// 基础 GET，泛型指定返回数据类型
const res = await http.get<User[]>("/users");
if (res.success) {
  console.log(res.data);  // User[]
  console.log(res.total); // 列表总数（如有）
}

// 带查询参数
const res = await http.get<PageResult>("/users", {
  page: 1,
  pageSize: 20,
  status: "active",
});

// 数组参数（同名多值）
const res = await http.get<User[]>("/items", { ids: [1, 2, 3] });
// 实际请求：/items?ids=1&ids=2&ids=3

// 文件下载（自动触发浏览器下载）
await http.get("/report/export", { download: { filename: "report.xlsx" } });

// 下载并获取 Blob URL（不自动点击，可用于预览）
const res = await http.get<string>("/file/preview", { download: { noClick: true } });
const blobUrl = res.data; // 可用于 <img src> 或 <a href>
```

### POST 请求

```ts
// JSON 请求体（默认）
const res = await http.post("/users", { name: "张三", role: "admin" });

// Form 表单提交
const res = await http.post("/login", {
  "content-type": "application/x-www-form-urlencoded",
  username: "admin",
  password: "123456",
});

// 文件上传（FormData）
const formData = new FormData();
formData.append("file", file);
formData.append("type", "avatar");
const res = await http.post("/upload/file", formData);

if (res.success) {
  console.log("上传成功:", res.data);
} else {
  console.error("上传失败:", res.message);
}
```

### PUT / PATCH / DELETE

```ts
// 更新整体资源
const res = await http.put("/users/1", { name: "李四", role: "viewer" });

// 局部更新
const res = await http.patch("/users/1", { role: "editor" });

// 删除
const res = await http.del("/users/1");

// 带请求体的批量删除
const res = await http.del("/users/batch", { ids: [1, 2, 3] });
```

### SSE 流式请求（stream）

泛型 `T` 为每条 SSE 消息解析后的数据类型。

```ts
// 示例一：GET 轮询部署状态，status 为字符串
hubHttpClient.stream<string>({
  url: `/spaces/${spacePath}/status`,
  method: "GET",
  // status === 'Running' 时自动终止连接
  shouldStop: (status) => status === "Running",
  onMessage: async (status) => {
    if (status === "Running") {
      const spaceInfo = await getSpace(spacePath);
      if (spaceInfo.data) {
        await injectData({ serverUrl: `https://${spaceInfo.data.endpoint}/mcp` });
      }
    }
  },
  onError: (error) => {
    console.error("查询部署状态失败:", error);
    setDeploying(false);
  },
  onClose: () => {
    setDeploying(false);
  },
});

// 示例二：POST AI 流式对话，消息体为对象
interface ChatChunk {
  content: string;
  done: boolean;
}

const controller = hubHttpClient.stream<ChatChunk>({
  url: "/ai/chat",
  method: "POST",
  data: { prompt: "介绍一下洞察时空" },
  shouldStop: (chunk) => chunk.done,
  onMessage: (chunk) => {
    appendText(chunk.content);
  },
  onClose: () => setLoading(false),
  onError: (err) => console.error("流错误:", err.message),
});

// 手动中止（组件卸载时调用）
controller.abort();
```

### 统一返回格式 Result

所有非流式方法均返回 `Promise<Result<T>>`：

```ts
interface Result<T = unknown> {
  success: boolean; // 请求是否成功（网络/HTTP/超时/鉴权错误均为 false）
  data?: T; // 业务数据
  total?: number; // 列表总数（列表类接口）
  hasMore?: boolean; // 是否还有更多（分页 / 无限滚动）
  message?: string; // 提示或错误信息
}
```

工具永远 resolve，不会 reject，调用方只需判断 `success`，无需 try/catch。

### 按服务拆分多实例（项目最佳实践）

```ts
// src/util/fetch.ts
import { HttpClient } from "@insightst-design/utils";
import Cookies from "js-cookie";
import session from "./session";

const makeHeaders = () => ({
  "accept-language": "zh-CN",
  "X-Csrf-Token": Cookies.get("csrf_token") ?? "",
  authorization: `Bearer ${session.get("user_token", true)}`,
});

const onUnauthorized = () => {
  clearSession();
  navigate("/login");
};

// Hub API（主服务）
export const hubHttpClient = new HttpClient({
  resolveUrl: (url) => `/hub/api/v1${url}`,
  headers: makeHeaders,
  onUnauthorized,
});

// Workflow API（Dify 服务）
export const dfHttpClient = new HttpClient({
  resolveUrl: (url) => `/wf${url}`,
  headers: makeHeaders,
  onUnauthorized,
});

// 用法
const res = await hubHttpClient.get("/datasets");
const stream = dfHttpClient.stream({
  url: "/ai/run",
  method: "POST",
  data: payload,
  onMessage,
});
```

---

## SessionManager

对 `sessionStorage` 和 `localStorage` 的轻量封装，支持 SSR 环境（服务端访问不报错）。

### 基础用法

```ts
import { session } from "@insightst-design/utils";

// 写入 sessionStorage（默认）
session.put("userToken", "abc123");

// 写入 localStorage（第三个参数 isLocal = true）
session.put("theme", "dark", true);

// 读取 sessionStorage
const token = session.get("userToken"); // 'abc123' | ''

// 读取 localStorage
const theme = session.get("theme", true); // 'dark' | ''

// 删除单个 key
session.remove("userToken");
session.remove("theme", true);

// 清空整个存储
session.clear(); // 清空 sessionStorage
session.clear(true); // 清空 localStorage
```

### 存取 JSON 对象

`put` 会自动对非字符串值调用 `JSON.stringify`，读取时需手动解析：

```ts
const userInfo = { name: "张三", role: "admin" };
session.put("userInfo", JSON.stringify(userInfo));

const raw = session.get("userInfo");
const parsed = raw ? JSON.parse(raw) : null;
console.log(parsed?.name); // '张三'
```
