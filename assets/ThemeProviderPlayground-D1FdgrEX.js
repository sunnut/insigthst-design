import{r as d,j as e,k as n,cu as a,cv as l,cw as m,cx as c}from"./index-xmebibFO.js";import{C as u}from"./CodeBlock-yFUMCofH.js";import{P as h,b as g,a as x}from"./playgroundLayout-CGRPHSL3.js";import"./check-Dj_QKhp6.js";import"./copy-pcll_cHZ.js";import"./index-DBXKx-wM.js";function f(t){return`import { Breadcrumb } from '@insightst-design/ui'
import { ThemeProvider } from '@insightst-design/theme'
import '@insightst-design/theme/tokens.css'

<ThemeProvider mode="${t}">
  <Breadcrumb
    items={[
      { title: '首页' },
      { title: '组件库' },
      { title: '主题沙箱' },
    ]}
  />
</ThemeProvider>`}function y(){const[t,o]=d.useState("dark"),r=t==="dark",s=()=>o(r?"light":"dark"),i=f(t);return e.jsxs(h,{children:[e.jsx(g,{hint:"在沙箱中独立切换主题，不影响全局页面",trailing:e.jsx(n,{size:"small",icon:r?e.jsx(a,{size:14}):e.jsx(l,{size:14}),onClick:s,children:r?"切换亮色":"切换暗色"})}),e.jsx(x,{title:"主题预览",titleEn:"Preview",children:e.jsx(m,{mode:t,syncDocumentTheme:!1,children:e.jsx("div",{style:{padding:24,borderRadius:8,background:r?"#141414":"#ffffff",border:`1px solid ${r?"#303030":"#e8e8e8"}`},children:e.jsx(c,{items:[{title:"首页"},{title:"组件库"},{title:"主题沙箱"}]})})})}),e.jsx(u,{darkCode:i,lightCode:i})]})}export{y as default};
