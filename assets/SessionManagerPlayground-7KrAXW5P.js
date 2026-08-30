import{r as c,j as e,k as g}from"./index-xmebibFO.js";import{C as y}from"./CodeBlock-yFUMCofH.js";import{P as U,a as m}from"./playgroundLayout-CGRPHSL3.js";import{T as J,S as k}from"./index-DBXKx-wM.js";import{I as S}from"./index-cDK7M9L-.js";import"./check-Dj_QKhp6.js";import"./copy-pcll_cHZ.js";import"./Input-BKc4tNfr.js";import"./EyeOutlined-DDJ_kKJH.js";import"./SearchOutlined-DLe303NC.js";const a=typeof window<"u"?window.sessionStorage:null,i=typeof window<"u"?window.localStorage:null,f="userInfo";class K{put(s,o,p){if(!(!s||!a||!i))try{const t=typeof o=="string"?o:JSON.stringify(o);p?i.setItem(s,t):a.setItem(s,t)}catch{console.warn("json parse error")}}get(s,o){return!s||!a||!i?"":(o?i.getItem(s):a.getItem(s))??""}remove(s,o){!a||!i||(o?i.removeItem(s):a.removeItem(s))}clear(s){!a||!i||(s?i.clear():a.clear())}}const d=new K,P=()=>{let r=d.get(f,!0);r||(r=d.get(f),r&&(d.put(f,r,!0),d.remove(f)));try{return r?JSON.parse(r):null}catch{return null}};var T;(T=P())==null||T.username;const{Text:l}=J,I="npm install @insightst-design/utils",C=`import { session } from '@insightst-design/utils'

// 写入 sessionStorage（默认）
session.put('userToken', 'abc123')

// 写入 localStorage（第三个参数 isLocal = true）
session.put('theme', 'dark', true)

// 读取 sessionStorage
const token = session.get('userToken')       // 'abc123' | ''

// 读取 localStorage
const theme = session.get('theme', true)     // 'dark' | ''

// 删除单个 key
session.remove('userToken')
session.remove('theme', true)

// 清空整个存储
session.clear()        // 清空 sessionStorage
session.clear(true)    // 清空 localStorage`,w=`// put 会自动对非字符串值调用 JSON.stringify
// get 返回字符串，需手动解析
const userInfo = { name: '张三', role: 'admin' }
session.put('userInfo', JSON.stringify(userInfo))

const raw = session.get('userInfo')
const parsed = raw ? JSON.parse(raw) : null
console.log(parsed?.name) // '张三'`,L=`import {
  getUserInfoStorage,
  setUserInfoStorage,
  clearUserSession,
} from '@insightst-design/utils'

// 读取（优先从 localStorage，兼容旧版 sessionStorage 数据）
const userInfo = getUserInfoStorage()
console.log(userInfo?.username, userInfo?.email)

// 写入（存至 localStorage）
setUserInfoStorage({
  username: 'zhangsan',
  nickname: '张三',
  email: 'zhangsan@example.com',
})

// 登出时清理所有会话数据（token、userInfo 等）
clearUserSession()`,_=[{method:"put",signature:"put(key, value, isLocal?)",desc:"写入值，isLocal=true 时存入 localStorage"},{method:"get",signature:"get(key, isLocal?)",desc:"读取值，不存在时返回空字符串"},{method:"remove",signature:"remove(key, isLocal?)",desc:"删除指定 key"},{method:"clear",signature:"clear(isLocal?)",desc:"清空 sessionStorage 或 localStorage"}];function F({rows:r}){const s={padding:"8px 12px",borderBottom:"1px solid var(--ds-border)",fontSize:13};return e.jsx("div",{style:{overflowX:"auto"},children:e.jsxs("table",{style:{width:"100%",borderCollapse:"collapse"},children:[e.jsx("thead",{children:e.jsx("tr",{style:{background:"var(--ds-bg-layout)"},children:["方法","签名","说明"].map(o=>e.jsx("th",{style:{...s,color:"var(--ds-text-secondary)",textAlign:"left",fontWeight:500},children:o},o))})}),e.jsx("tbody",{children:r.map(o=>e.jsxs("tr",{children:[e.jsx("td",{style:{...s,color:"var(--ds-primary)",fontFamily:"monospace",fontWeight:500},children:o.method}),e.jsx("td",{style:{...s,color:"var(--ds-text-secondary)",fontFamily:"monospace",whiteSpace:"nowrap"},children:o.signature}),e.jsx("td",{style:{...s,color:"var(--ds-text-primary)"},children:o.desc})]},o.method))})]})})}function Q(){const[r,s]=c.useState("demo_key"),[o,p]=c.useState("hello world"),[t,j]=c.useState(!1),[u,z]=c.useState("demo_key"),[v,B]=c.useState(null),[b,R]=c.useState([]),h=n=>R(x=>[`[${new Date().toLocaleTimeString()}] ${n}`,...x].slice(0,10)),N=()=>{d.put(r,o,t),h(`put("${r}", "${o}", isLocal=${t}) → 写入 ${t?"localStorage":"sessionStorage"}`)},O=()=>{const n=d.get(u,t);B(n||"（空）"),h(`get("${u}", isLocal=${t}) → "${n||""}"`)},$=()=>{d.remove(u,t),h(`remove("${u}", isLocal=${t}) → 已删除`)},E=()=>{d.clear(t),h(`clear(isLocal=${t}) → 已清空 ${t?"localStorage":"sessionStorage"}`)};return e.jsxs(U,{children:[e.jsx("div",{children:e.jsxs(l,{style:{fontSize:13,color:"var(--ds-text-secondary)",display:"block",marginBottom:8},children:["对 ",e.jsx("code",{children:"sessionStorage"})," 和 ",e.jsx("code",{children:"localStorage"})," 的轻量封装，支持 SSR 环境（服务端访问不报错）。"]})}),e.jsx(m,{title:"交互演示",titleEn:"Interactive Demo",children:e.jsxs("div",{className:"rounded-lg p-5",style:{border:"1px solid var(--ds-border)",background:"var(--ds-bg-card)"},children:[e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:16},children:[e.jsxs("div",{children:[e.jsx(l,{style:{fontSize:12,color:"var(--ds-text-secondary)",display:"block",marginBottom:6},children:"Key"}),e.jsx(S,{value:r,onChange:n=>s(n.target.value),placeholder:"存储 key"})]}),e.jsxs("div",{children:[e.jsx(l,{style:{fontSize:12,color:"var(--ds-text-secondary)",display:"block",marginBottom:6},children:"Value"}),e.jsx(S,{value:o,onChange:n=>p(n.target.value),placeholder:"存储值"})]})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,marginBottom:16},children:[e.jsx(l,{style:{fontSize:12,color:"var(--ds-text-secondary)"},children:"存储位置："}),e.jsx(g,{size:"small",type:t?"default":"primary",onClick:()=>j(!1),children:"sessionStorage"}),e.jsx(g,{size:"small",type:t?"primary":"default",onClick:()=>j(!0),children:"localStorage"})]}),e.jsx(k,{children:e.jsx(g,{type:"primary",onClick:N,children:"put（写入）"})}),e.jsxs("div",{style:{marginTop:20,paddingTop:16,borderTop:"1px solid var(--ds-border)"},children:[e.jsx(l,{style:{fontSize:12,color:"var(--ds-text-secondary)",display:"block",marginBottom:6},children:"读取 / 删除 Key"}),e.jsx("div",{style:{display:"flex",gap:8,marginBottom:12},children:e.jsx(S,{value:u,onChange:n=>z(n.target.value),placeholder:"要读取或删除的 key",style:{flex:1}})}),e.jsxs(k,{children:[e.jsx(g,{onClick:O,children:"get（读取）"}),e.jsx(g,{danger:!0,onClick:$,children:"remove（删除）"}),e.jsx(g,{danger:!0,onClick:E,children:"clear（清空全部）"})]}),v!==null&&e.jsxs("div",{className:"rounded mt-3 px-3 py-2",style:{background:"var(--ds-bg-layout)",border:"1px solid var(--ds-border)"},children:[e.jsx(l,{style:{fontSize:12,color:"var(--ds-text-secondary)"},children:"读取结果："}),e.jsx(l,{style:{fontSize:13,color:"var(--ds-primary)",fontFamily:"monospace",marginLeft:8},children:v})]})]}),b.length>0&&e.jsxs("div",{style:{marginTop:16,paddingTop:12,borderTop:"1px solid var(--ds-border)"},children:[e.jsx(l,{style:{fontSize:12,color:"var(--ds-text-secondary)",display:"block",marginBottom:8},children:"操作日志"}),e.jsx("div",{className:"rounded p-3",style:{background:"var(--ds-bg-layout)",fontFamily:"monospace",fontSize:12,maxHeight:160,overflow:"auto"},children:b.map((n,x)=>e.jsx("div",{style:{color:x===0?"var(--ds-primary)":"var(--ds-text-tertiary)",marginBottom:2},children:n},x))})]})]})}),e.jsx(m,{title:"安装",titleEn:"Install",children:e.jsx(y,{darkCode:I,lightCode:I,lang:"bash"})}),e.jsx(m,{title:"基础用法",titleEn:"Basic Usage",children:e.jsx(y,{darkCode:C,lightCode:C})}),e.jsx(m,{title:"存取 JSON 对象",titleEn:"JSON Object",children:e.jsx(y,{darkCode:w,lightCode:w})}),e.jsxs(m,{title:"用户信息快捷方法",titleEn:"User Info Helpers",children:[e.jsx(l,{style:{fontSize:12,color:"var(--ds-text-secondary)",display:"block",marginBottom:8},children:"utils 包内置了用户信息的存取辅助函数，读取时会自动兼容旧版 sessionStorage 数据。"}),e.jsx(y,{darkCode:L,lightCode:L})]}),e.jsx(m,{title:"实例方法速查",titleEn:"API Reference",children:e.jsx("div",{className:"rounded-lg overflow-hidden",style:{border:"1px solid var(--ds-border)"},children:e.jsx(F,{rows:_})})})]})}export{Q as default};
