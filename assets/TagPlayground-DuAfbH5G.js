import{r,j as e,k as d}from"./index-xmebibFO.js";import{C}from"./CodeBlock-yFUMCofH.js";import{e as h,P as p,b as T,a}from"./playgroundLayout-CGRPHSL3.js";import{S as m}from"./index-DBXKx-wM.js";import{T as t}from"./index-BZlQKXiU.js";import"./check-Dj_QKhp6.js";import"./copy-pcll_cHZ.js";const u=[{cn:"进行中",en:"Processing",antColor:"processing"},{cn:"已完成",en:"Completed",antColor:"success"},{cn:"草稿",en:"Draft",antColor:"default"},{cn:"建议复审",en:"Review",antColor:"warning"},{cn:"不建议使用",en:"Rejected",antColor:"error"}],x=`import { Tag } from '@insightst-design/ui'

<Tag color="processing">进行中 Processing</Tag>
<Tag color="success">已完成 Completed</Tag>
<Tag>草稿 Draft</Tag>
<Tag color="warning">建议复审 Review</Tag>
<Tag color="error">不建议使用 Rejected</Tag>

{/* 可关闭 */}
<Tag closable onClose={() => {}}>可关闭标签</Tag>

{/* 可选中（需自行管理选中态样式） */}
<Tag.CheckableTag checked={checked} onChange={setChecked}>可选中</Tag.CheckableTag>`;function E(){const[s,l]=r.useState(!0),[c,n]=r.useState(!0),{darkCode:i,lightCode:g}=h("标签 (Tag)",x);return e.jsxs(p,{children:[e.jsx(T,{hint:"交互范例 · Interactive Example"}),e.jsx(a,{title:"语义色标签",titleEn:"Semantic Colors",children:e.jsx(m,{size:[8,8],wrap:!0,children:u.map(o=>e.jsxs(t,{color:o.antColor,style:{fontSize:12},children:[o.cn," ",e.jsx("span",{style:{opacity:.6},children:o.en})]},o.cn))})}),e.jsx(a,{title:"可关闭标签",titleEn:"Closable",children:c?e.jsx(t,{closable:!0,onClose:()=>n(!1),children:"可关闭标签"}):e.jsx(d,{type:"link",size:"small",onClick:()=>n(!0),style:{padding:0,fontSize:12},children:"重置标签"})}),e.jsx(a,{title:"可选中标签",titleEn:"Checkable",children:e.jsxs(t.CheckableTag,{checked:s,onChange:l,children:["文献筛选 · ",s?"已启用":"未启用"]})}),e.jsx(C,{darkCode:i,lightCode:g})]})}export{E as default};
