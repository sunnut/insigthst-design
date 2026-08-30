import{c as g,j as e,L as i,P as y,B as u,W as v,a as j,b as k}from"./index-xmebibFO.js";import{C as l}from"./CodeBlock-yFUMCofH.js";import{P as b,a as r}from"./playgroundLayout-CGRPHSL3.js";import{A as c}from"./arrow-right-Dn1xazJ_.js";import"./check-Dj_QKhp6.js";import"./copy-pcll_cHZ.js";import"./index-DBXKx-wM.js";/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f=[["path",{d:"M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z",key:"1a0edw"}],["path",{d:"M12 22V12",key:"d0xqtd"}],["polyline",{points:"3.29 7 12 12 20.71 7",key:"ousv84"}],["path",{d:"m7.5 4.27 9 5.15",key:"1c824w"}]],C=g("package",f),p=`# 配置私有源（项目根目录 .npmrc）
registry=https://npm-registry.insightst.com/
或运行如下命令
npm config set registry https://npm-registry.insightst.com/

# 安装核心包（theme、icons会随 @insightst-design/ui 自动安装）
npm install @insightst-design/ui

# 安装hooks包
npm install @insightst-design/hooks

# 安装utils包
npm install @insightst-design/utils
`,h=`// main.tsx
import { ThemeProvider } from '@insightst-design/theme'
import '@insightst-design/theme/tokens.css'

createRoot(document.getElementById('root')!).render(
  <ThemeProvider mode="dark">
    <App />
  </ThemeProvider>,
)`,m=`import { Button, CardPro } from '@insightst-design/ui'

export function Demo() {
  return (
    <>
      <Button type="primary">主要按钮</Button>
      <CardPro
        title="示例卡片"
        description="基于设计系统封装的业务组件"
        variant="model"
        statusTone="success"
      />
    </>
  )
}`,N=[{name:"@insightst-design/theme",desc:"设计 Token、CSS 变量与 Ant Design 主题适配",icon:y,link:"/themes"},{name:"@insightst-design/ui",desc:"基于 Ant Design 开发的通用组件与自定义的业务组件库",icon:u,link:"/components/button"},{name:"@insightst-design/icons",desc:"图标组件，统一图标使用方式",icon:C,link:"/icons"},{name:"@insightst-design/hooks",desc:"React 业务 Hooks（表格、分页、请求等），按需安装",icon:v,link:"/hooks/use-table"},{name:"@insightst-design/utils",desc:"通用工具函数（请求封装、Session、clsx 等），按需安装",icon:j,link:"/utils/http-client"}],S=[{step:"01",title:"安装依赖",desc:"通过私有 npm 源安装 theme、ui；antd、react、react-dom 会随 ui 包自动安装。"},{step:"02",title:"接入主题",desc:"在应用入口引入 tokens.css，使用 ThemeProvider 包裹根组件。"},{step:"03",title:"使用组件",desc:"从 @insightst-design/ui 按需引入组件，配合主题 Token 保持视觉一致。"}],P=[{label:"色彩系统",path:"/colors",color:"#5264E0"},{label:"排版系统",path:"/typography",color:"#43CB89"},{label:"通用",path:"/components/button",color:"#FFA564"},{label:"设计原则",path:"/principles",color:"#8a8f99"}];function x({children:t,style:s}){return e.jsx("div",{className:"rounded-lg p-6",style:{background:"var(--ds-bg-card)",border:"1px solid var(--ds-border)",...s},children:t})}function w(){return e.jsxs(b,{children:[e.jsxs("div",{children:[e.jsx("h1",{className:"text-h1 mb-1",style:{color:"var(--ds-text-primary)"},children:"快速入门"}),e.jsx("p",{className:"text-body",style:{color:"var(--ds-text-secondary)"},children:"Quick Start · 5 分钟接入洞察时空设计系统"})]}),e.jsx(x,{children:e.jsxs("p",{className:"text-body",style:{color:"var(--ds-text-secondary)",lineHeight:1.8,margin:0},children:[e.jsx("strong",{style:{color:"var(--ds-text-primary)"},children:"Insightst Design"})," 是洞察时空的统一 UI 组件库， 包含设计 Token、主题适配与业务组件。本文档将引导你完成安装、主题接入与第一个组件的使用。"]})}),e.jsx(r,{title:"接入步骤",titleEn:"Steps",children:e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:16},children:S.map(t=>e.jsxs("div",{className:"rounded-lg p-5",style:{background:"var(--ds-bg-card)",border:"1px solid var(--ds-border)"},children:[e.jsxs("div",{className:"text-caption font-mono mb-3",style:{color:"var(--ds-primary)",fontWeight:600,fontSize:13},children:["STEP ",t.step]}),e.jsx("div",{className:"text-h3 mb-2",style:{color:"var(--ds-text-primary)",fontSize:16},children:t.title}),e.jsx("p",{className:"text-caption",style:{color:"var(--ds-text-secondary)",margin:0,lineHeight:1.7},children:t.desc})]},t.step))})}),e.jsx(r,{title:"安装依赖",titleEn:"Install",children:e.jsx(l,{darkCode:p,lightCode:p,lang:"bash"})}),e.jsxs(r,{title:"接入主题",titleEn:"Theme Setup",children:[e.jsx(l,{darkCode:h,lightCode:h}),e.jsxs("p",{className:"text-caption mt-3",style:{color:"var(--ds-text-tertiary)"},children:["ThemeProvider 支持 ",e.jsx("code",{children:"mode"}),"（dark / light）、",e.jsx("code",{children:"lang"}),"（zh / en）等配置， 详见 ",e.jsx(i,{to:"/themes",style:{color:"var(--ds-primary)"},children:"主题"}),"。"]})]}),e.jsx(r,{title:"使用组件",titleEn:"Use Components",children:e.jsx(l,{darkCode:m,lightCode:m})}),e.jsx(r,{title:"核心包",titleEn:"Packages",children:e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:12},children:N.map(({name:t,desc:s,icon:o,link:n})=>{const a={background:"var(--ds-bg-card)",border:"1px solid var(--ds-border)",textDecoration:"none"},d=e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"flex items-center justify-center rounded-lg",style:{width:40,height:40,background:"rgba(82,100,224,0.08)",color:"var(--ds-primary)",flexShrink:0},children:e.jsx(o,{size:20})}),e.jsxs("div",{style:{flex:1,minWidth:0},children:[e.jsx("div",{className:"font-mono text-body",style:{color:"var(--ds-text-primary)",fontWeight:500},children:t}),e.jsx("div",{className:"text-caption",style:{color:"var(--ds-text-secondary)"},children:s})]}),n?e.jsx(c,{size:16,style:{color:"var(--ds-text-tertiary)",flexShrink:0}}):null]});return n?e.jsx(i,{to:n,className:"rounded-lg p-4 flex items-center gap-4 hover:no-underline transition-all duration-150",style:a,children:d},t):e.jsx("div",{className:"rounded-lg p-4 flex items-center gap-4",style:a,children:d},t)})})}),e.jsx(r,{title:"继续探索",titleEn:"Explore More",children:e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(4, 1fr)",gap:12},children:P.map(({label:t,path:s,color:o})=>e.jsxs(i,{to:s,className:"rounded-lg p-4 flex flex-col gap-2 hover:no-underline transition-all duration-150",style:{background:"var(--ds-bg-card)",border:"1px solid var(--ds-border)",textDecoration:"none"},children:[e.jsx("div",{className:"w-1 h-4 rounded-full",style:{background:o}}),e.jsx("span",{style:{color:"var(--ds-text-primary)",fontSize:14,fontWeight:500},children:t}),e.jsxs("span",{className:"flex items-center gap-1 text-caption",style:{color:"var(--ds-primary)"},children:["查看文档 ",e.jsx(c,{size:12})]})]},s))})}),e.jsxs(x,{style:{display:"flex",alignItems:"center",gap:12,background:"rgba(82,100,224,0.06)",border:"1px solid rgba(82,100,224,0.15)"},children:[e.jsx(k,{size:20,style:{color:"var(--ds-primary)",flexShrink:0}}),e.jsxs("p",{className:"text-caption",style:{color:"var(--ds-text-secondary)",margin:0,lineHeight:1.7},children:["建议先阅读 ",e.jsx(i,{to:"/colors",style:{color:"var(--ds-primary)"},children:"色彩系统"})," 与"," ",e.jsx(i,{to:"/typography",style:{color:"var(--ds-primary)"},children:"排版系统"}),"， 再进入组件文档查看交互范例与代码片段。"]})]})]})}export{w as default};
