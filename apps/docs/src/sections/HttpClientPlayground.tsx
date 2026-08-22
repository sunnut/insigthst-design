import { Typography } from '@insightst-design/ui'
import CodeBlock from './CodeBlock'
import { PlaygroundRoot, PlaygroundSection } from './playgroundLayout'

const { Text } = Typography

const installCode = `npm install @insightst-design/utils`

const createCode = `import { HttpClient } from '@insightst-design/utils'

const http = new HttpClient({
  // 将原始 URL 解析为完整请求地址
  resolveUrl: (url) => \`/api/v1\${url}\`,
  // 请求头（支持异步）
  headers: () => ({
    authorization: \`Bearer \${getToken()}\`,
    'accept-language': 'zh-CN',
  }),
  // 超时时间（ms），默认 20000；<= 0 表示不超时
  timeout: 10000,
  // 401 未授权回调
  onUnauthorized: () => {
    window.location.href = '/login'
  },
  // 全局错误回调
  onError: (error) => {
    console.error('Request error:', error.message)
  },
})`

const getCode = `interface User {
  id: number
  name: string
  role: string
}

interface PageResult {
  list: User[]
  total: number
}

// 基础 GET，泛型指定返回数据类型
const res = await http.get<User[]>('/users')
if (res.success) {
  console.log(res.data)   // User[]
  console.log(res.total)  // 列表总数（如有）
}

// 带查询参数
const res = await http.get<PageResult>('/users', { page: 1, pageSize: 20, status: 'active' })

// 数组参数（同名多值）
const res = await http.get<User[]>('/items', { ids: [1, 2, 3] })
// 实际请求：/items?ids=1&ids=2&ids=3

// 文件下载（自动触发浏览器下载）
await http.get('/report/export', { download: { filename: 'report.xlsx' } })

// 下载并获取 Blob URL（不自动点击，可用于预览）
const res = await http.get<string>('/file/preview', { download: { noClick: true } })
const blobUrl = res.data // 可用于 <img src> 或 <a href>`

const postCode = `// JSON 请求体（默认）
const res = await http.post('/users', { name: '张三', role: 'admin' })

// Form 表单提交
const res = await http.post('/login', {
  'content-type': 'application/x-www-form-urlencoded',
  username: 'admin',
  password: '123456',
})

// 文件上传（FormData）
const formData = new FormData()
formData.append('file', file)
formData.append('type', 'avatar')
const res = await http.post('/upload/file', formData)

if (res.success) {
  console.log('上传成功:', res.data)
} else {
  console.error('上传失败:', res.message)
}`

const otherMethodsCode = `// 更新整体资源
const res = await http.put('/users/1', { name: '李四', role: 'viewer' })

// 局部更新
const res = await http.patch('/users/1', { role: 'editor' })

// 删除
const res = await http.del('/users/1')

// 带请求体的批量删除
const res = await http.del('/users/batch', { ids: [1, 2, 3] })`

const streamCode = `// 泛型 T 为每条 SSE 消息解析后的数据类型
// 示例一：轮询部署状态（GET，status 为字符串）
hubHttpClient.stream<string>({
  url: \`/spaces/\${spacePath}/status\`,
  method: 'GET',
  // status === 'Running' 时自动终止连接
  shouldStop: (status) => status === 'Running',
  onMessage: async (status) => {
    if (status === 'Running') {
      const spaceInfo = await getSpace(spacePath)
      if (spaceInfo.data) {
        await injectData({ serverUrl: \`https://\${spaceInfo.data.endpoint}/mcp\` })
      }
    }
  },
  onError: (error) => {
    console.error('查询部署状态失败:', error)
    setDeploying(false)
  },
  onClose: () => {
    setDeploying(false)
  },
})

// 示例二：AI 流式对话（POST，消息体为对象）
interface ChatChunk {
  content: string
  done: boolean
}

const controller = hubHttpClient.stream<ChatChunk>({
  url: '/ai/chat',
  method: 'POST',
  data: { prompt: '介绍一下洞察时空' },
  shouldStop: (chunk) => chunk.done,
  onMessage: (chunk) => {
    appendText(chunk.content)
  },
  onClose: () => setLoading(false),
  onError: (err) => console.error('流错误:', err.message),
})

// 手动中止（组件卸载时调用）
controller.abort()`

const resultCode = `interface Result<T = unknown> {
  success: boolean   // 请求是否成功（网络/HTTP/超时/鉴权错误均为 false）
  data?: T           // 业务数据
  total?: number     // 列表总数（列表类接口）
  hasMore?: boolean  // 是否还有更多（分页 / 无限滚动）
  message?: string   // 提示或错误信息
}

// 工具永远 resolve，不会 reject，只需判断 success，无需 try/catch
const res = await http.get<User[]>('/users')
if (!res.success) {
  message.error(res.message ?? '请求失败')
  return
}
setList(res.data ?? [])`

const multiInstanceCode = `// src/util/fetch.ts —— 按服务拆分多实例
import { HttpClient } from '@insightst-design/utils'
import Cookies from 'js-cookie'
import session from './session'

const makeHeaders = () => ({
  'accept-language': 'zh-CN',
  'X-Csrf-Token': Cookies.get('csrf_token') ?? '',
  authorization: \`Bearer \${session.get('user_token', true)}\`,
})

const onUnauthorized = () => {
  clearSession()
  navigate('/login')
}

// Hub API（主服务）
export const hubHttpClient = new HttpClient({
  resolveUrl: (url) => \`/hub/api/v1\${url}\`,
  headers: makeHeaders,
  onUnauthorized,
})

// Workflow API（Dify 服务）
export const dfHttpClient = new HttpClient({
  resolveUrl: (url) => \`/wf\${url}\`,
  headers: makeHeaders,
  onUnauthorized,
})

// 调用方按归属选择实例
const res = await hubHttpClient.get('/datasets')
const ctrl = dfHttpClient.stream({ url: '/ai/run', method: 'POST', data: payload, onMessage })`

interface ResultRow {
  field: string
  type: string
  desc: string
}

const resultRows: ResultRow[] = [
  { field: 'success', type: 'boolean', desc: '请求是否成功（网络/HTTP/超时/鉴权错误均为 false）' },
  { field: 'data', type: 'T | undefined', desc: '业务数据，类型由泛型 T 指定' },
  { field: 'total', type: 'number | undefined', desc: '列表总数，列表类接口适用' },
  { field: 'hasMore', type: 'boolean | undefined', desc: '是否还有更多，分页/无限滚动场景适用' },
  { field: 'message', type: 'string | undefined', desc: '提示信息或错误原因' },
]

interface ApiRow {
  method: string
  signature: string
  desc: string
}

const apiRows: ApiRow[] = [
  { method: 'get', signature: 'get<T>(url, params?)', desc: '发送 GET 请求，支持查询参数与文件下载' },
  { method: 'post', signature: 'post<T>(url, data?)', desc: '发送 POST 请求，支持 JSON / Form / FormData' },
  { method: 'put', signature: 'put<T>(url, data?)', desc: '发送 PUT 请求' },
  { method: 'patch', signature: 'patch<T>(url, data?)', desc: '发送 PATCH 请求（局部更新）' },
  { method: 'del', signature: 'del<T>(url, data?)', desc: '发送 DELETE 请求，支持请求体' },
  { method: 'stream', signature: 'stream<T>(options)', desc: '发起 SSE 流式连接，返回 AbortController' },
  { method: 'configure', signature: 'configure(config)', desc: '动态更新实例配置（可在应用启动后调用）' },
]

function PropTable({ rows }: { rows: ResultRow[] }) {
  const tdBase: React.CSSProperties = {
    padding: '8px 12px',
    borderBottom: '1px solid var(--ds-border)',
    fontSize: 13,
  }
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
        <thead>
          <tr style={{ background: 'var(--ds-bg-layout)' }}>
            {['字段', '类型', '说明'].map((h) => (
              <th key={h} style={{ ...tdBase, color: 'var(--ds-text-secondary)', textAlign: 'left', fontWeight: 500 }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.field}>
              <td style={{ ...tdBase, color: 'var(--ds-primary)', fontFamily: 'monospace' }}>{row.field}</td>
              <td style={{ ...tdBase, color: 'var(--ds-text-secondary)', fontFamily: 'monospace' }}>{row.type}</td>
              <td style={{ ...tdBase, color: 'var(--ds-text-primary)' }}>{row.desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function ApiTable({ rows }: { rows: ApiRow[] }) {
  const tdBase: React.CSSProperties = {
    padding: '8px 12px',
    borderBottom: '1px solid var(--ds-border)',
    fontSize: 13,
  }
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
        <thead>
          <tr style={{ background: 'var(--ds-bg-layout)' }}>
            {['方法', '签名', '说明'].map((h) => (
              <th key={h} style={{ ...tdBase, color: 'var(--ds-text-secondary)', textAlign: 'left', fontWeight: 500 }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.method}>
              <td style={{ ...tdBase, color: 'var(--ds-primary)', fontFamily: 'monospace', fontWeight: 500 }}>{row.method}</td>
              <td style={{ ...tdBase, color: 'var(--ds-text-secondary)', fontFamily: 'monospace', whiteSpace: 'nowrap' }}>{row.signature}</td>
              <td style={{ ...tdBase, color: 'var(--ds-text-primary)' }}>{row.desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function HttpClientPlayground() {
  return (
    <PlaygroundRoot>
      <div>
        <Text style={{ fontSize: 13, color: 'var(--ds-text-secondary)', display: 'block', marginBottom: 8 }}>
          基于 <code>fetch</code> 封装的 HTTP 请求工具，支持 GET、POST、PUT、DELETE、PATCH 及 SSE 流式请求。
          永远 resolve，不会 reject，调用方只需判断 <code>success</code>。
        </Text>
      </div>

      <PlaygroundSection title="安装" titleEn="Install">
        <CodeBlock darkCode={installCode} lightCode={installCode} lang="bash" />
      </PlaygroundSection>

      <PlaygroundSection title="创建实例" titleEn="Create Instance">
        <CodeBlock darkCode={createCode} lightCode={createCode} />
      </PlaygroundSection>

      <PlaygroundSection title="GET 请求" titleEn="GET">
        <CodeBlock darkCode={getCode} lightCode={getCode} />
      </PlaygroundSection>

      <PlaygroundSection title="POST 请求" titleEn="POST">
        <CodeBlock darkCode={postCode} lightCode={postCode} />
      </PlaygroundSection>

      <PlaygroundSection title="PUT / PATCH / DELETE" titleEn="Other Methods">
        <CodeBlock darkCode={otherMethodsCode} lightCode={otherMethodsCode} />
      </PlaygroundSection>

      <PlaygroundSection title="SSE 流式请求" titleEn="stream (SSE)">
        <Text style={{ fontSize: 12, color: 'var(--ds-text-secondary)', display: 'block', marginBottom: 8 }}>
          底层使用 <code>@microsoft/fetch-event-source</code>，支持 POST 方法与 <code>shouldStop</code> 自动终止。
        </Text>
        <CodeBlock darkCode={streamCode} lightCode={streamCode} />
      </PlaygroundSection>

      <PlaygroundSection title="统一返回格式 Result" titleEn="Result">
        <div
          className="rounded-lg overflow-hidden"
          style={{ border: '1px solid var(--ds-border)', marginBottom: 12 }}
        >
          <PropTable rows={resultRows} />
        </div>
        <CodeBlock darkCode={resultCode} lightCode={resultCode} />
      </PlaygroundSection>

      <PlaygroundSection title="实例方法速查" titleEn="API Reference">
        <div className="rounded-lg overflow-hidden" style={{ border: '1px solid var(--ds-border)' }}>
          <ApiTable rows={apiRows} />
        </div>
      </PlaygroundSection>

      <PlaygroundSection title="按服务拆分多实例" titleEn="Multiple Instances">
        <Text style={{ fontSize: 12, color: 'var(--ds-text-secondary)', display: 'block', marginBottom: 8 }}>
          推荐按后端服务边界创建独立实例，调用方根据接口归属选择对应实例。
        </Text>
        <CodeBlock darkCode={multiInstanceCode} lightCode={multiInstanceCode} />
      </PlaygroundSection>
    </PlaygroundRoot>
  )
}
