import{j as e}from"./index-xmebibFO.js";import{C as r}from"./CodeBlock-yFUMCofH.js";import{P as g,a as o}from"./playgroundLayout-CGRPHSL3.js";import{T as f}from"./index-DBXKx-wM.js";import"./check-Dj_QKhp6.js";import"./copy-pcll_cHZ.js";const{Text:n}=f,l="npm install @insightst-design/utils",i=`import { HttpClient } from '@insightst-design/utils'

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
})`,d=`interface User {
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
const blobUrl = res.data // 可用于 <img src> 或 <a href>`,c=`// JSON 请求体（默认）
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
}`,p=`// 更新整体资源
const res = await http.put('/users/1', { name: '李四', role: 'viewer' })

// 局部更新
const res = await http.patch('/users/1', { role: 'editor' })

// 删除
const res = await http.del('/users/1')

// 带请求体的批量删除
const res = await http.del('/users/batch', { ids: [1, 2, 3] })`,h=`// 泛型 T 为每条 SSE 消息解析后的数据类型
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
controller.abort()`,u=`interface Result<T = unknown> {
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
setList(res.data ?? [])`,m=`// src/util/fetch.ts —— 按服务拆分多实例
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
const ctrl = dfHttpClient.stream({ url: '/ai/run', method: 'POST', data: payload, onMessage })`,x=[{field:"success",type:"boolean",desc:"请求是否成功（网络/HTTP/超时/鉴权错误均为 false）"},{field:"data",type:"T | undefined",desc:"业务数据，类型由泛型 T 指定"},{field:"total",type:"number | undefined",desc:"列表总数，列表类接口适用"},{field:"hasMore",type:"boolean | undefined",desc:"是否还有更多，分页/无限滚动场景适用"},{field:"message",type:"string | undefined",desc:"提示信息或错误原因"}],y=[{method:"get",signature:"get<T>(url, params?)",desc:"发送 GET 请求，支持查询参数与文件下载"},{method:"post",signature:"post<T>(url, data?)",desc:"发送 POST 请求，支持 JSON / Form / FormData"},{method:"put",signature:"put<T>(url, data?)",desc:"发送 PUT 请求"},{method:"patch",signature:"patch<T>(url, data?)",desc:"发送 PATCH 请求（局部更新）"},{method:"del",signature:"del<T>(url, data?)",desc:"发送 DELETE 请求，支持请求体"},{method:"stream",signature:"stream<T>(options)",desc:"发起 SSE 流式连接，返回 AbortController"},{method:"configure",signature:"configure(config)",desc:"动态更新实例配置（可在应用启动后调用）"}];function C({rows:a}){const s={padding:"8px 12px",borderBottom:"1px solid var(--ds-border)",fontSize:13};return e.jsx("div",{style:{overflowX:"auto"},children:e.jsxs("table",{style:{width:"100%",borderCollapse:"collapse",fontSize:13},children:[e.jsx("thead",{children:e.jsx("tr",{style:{background:"var(--ds-bg-layout)"},children:["字段","类型","说明"].map(t=>e.jsx("th",{style:{...s,color:"var(--ds-text-secondary)",textAlign:"left",fontWeight:500},children:t},t))})}),e.jsx("tbody",{children:a.map(t=>e.jsxs("tr",{children:[e.jsx("td",{style:{...s,color:"var(--ds-primary)",fontFamily:"monospace"},children:t.field}),e.jsx("td",{style:{...s,color:"var(--ds-text-secondary)",fontFamily:"monospace"},children:t.type}),e.jsx("td",{style:{...s,color:"var(--ds-text-primary)"},children:t.desc})]},t.field))})]})})}function j({rows:a}){const s={padding:"8px 12px",borderBottom:"1px solid var(--ds-border)",fontSize:13};return e.jsx("div",{style:{overflowX:"auto"},children:e.jsxs("table",{style:{width:"100%",borderCollapse:"collapse",fontSize:13},children:[e.jsx("thead",{children:e.jsx("tr",{style:{background:"var(--ds-bg-layout)"},children:["方法","签名","说明"].map(t=>e.jsx("th",{style:{...s,color:"var(--ds-text-secondary)",textAlign:"left",fontWeight:500},children:t},t))})}),e.jsx("tbody",{children:a.map(t=>e.jsxs("tr",{children:[e.jsx("td",{style:{...s,color:"var(--ds-primary)",fontFamily:"monospace",fontWeight:500},children:t.method}),e.jsx("td",{style:{...s,color:"var(--ds-text-secondary)",fontFamily:"monospace",whiteSpace:"nowrap"},children:t.signature}),e.jsx("td",{style:{...s,color:"var(--ds-text-primary)"},children:t.desc})]},t.method))})]})})}function k(){return e.jsxs(g,{children:[e.jsx("div",{children:e.jsxs(n,{style:{fontSize:13,color:"var(--ds-text-secondary)",display:"block",marginBottom:8},children:["基于 ",e.jsx("code",{children:"fetch"})," 封装的 HTTP 请求工具，支持 GET、POST、PUT、DELETE、PATCH 及 SSE 流式请求。 永远 resolve，不会 reject，调用方只需判断 ",e.jsx("code",{children:"success"}),"。"]})}),e.jsx(o,{title:"安装",titleEn:"Install",children:e.jsx(r,{darkCode:l,lightCode:l,lang:"bash"})}),e.jsx(o,{title:"创建实例",titleEn:"Create Instance",children:e.jsx(r,{darkCode:i,lightCode:i})}),e.jsx(o,{title:"GET 请求",titleEn:"GET",children:e.jsx(r,{darkCode:d,lightCode:d})}),e.jsx(o,{title:"POST 请求",titleEn:"POST",children:e.jsx(r,{darkCode:c,lightCode:c})}),e.jsx(o,{title:"PUT / PATCH / DELETE",titleEn:"Other Methods",children:e.jsx(r,{darkCode:p,lightCode:p})}),e.jsxs(o,{title:"SSE 流式请求",titleEn:"stream (SSE)",children:[e.jsxs(n,{style:{fontSize:12,color:"var(--ds-text-secondary)",display:"block",marginBottom:8},children:["底层使用 ",e.jsx("code",{children:"@microsoft/fetch-event-source"}),"，支持 POST 方法与 ",e.jsx("code",{children:"shouldStop"})," 自动终止。"]}),e.jsx(r,{darkCode:h,lightCode:h})]}),e.jsxs(o,{title:"统一返回格式 Result",titleEn:"Result",children:[e.jsx("div",{className:"rounded-lg overflow-hidden",style:{border:"1px solid var(--ds-border)",marginBottom:12},children:e.jsx(C,{rows:x})}),e.jsx(r,{darkCode:u,lightCode:u})]}),e.jsx(o,{title:"实例方法速查",titleEn:"API Reference",children:e.jsx("div",{className:"rounded-lg overflow-hidden",style:{border:"1px solid var(--ds-border)"},children:e.jsx(j,{rows:y})})}),e.jsxs(o,{title:"按服务拆分多实例",titleEn:"Multiple Instances",children:[e.jsx(n,{style:{fontSize:12,color:"var(--ds-text-secondary)",display:"block",marginBottom:8},children:"推荐按后端服务边界创建独立实例，调用方根据接口归属选择对应实例。"}),e.jsx(r,{darkCode:m,lightCode:m})]})]})}export{k as default};
