import{cy as $,j as e,c as k,r as d,cz as y,cA as f}from"./index-xmebibFO.js";import{C as p}from"./CodeBlock-yFUMCofH.js";import{P as S,a as m}from"./playgroundLayout-CGRPHSL3.js";import{a as I}from"./index-BixDX8zu.js";import{I as T}from"./index-cDK7M9L-.js";import{s as b}from"./index-D6FVM-QA.js";import{C as w}from"./check-Dj_QKhp6.js";import{C as N}from"./copy-pcll_cHZ.js";import"./index-DBXKx-wM.js";import"./Input-BKc4tNfr.js";import"./EyeOutlined-DDJ_kKJH.js";import"./SearchOutlined-DLe303NC.js";const L=({name:r,className:i,style:l})=>{const o=$(r)?"icon-fill":"icon-line";return e.jsx("i",{className:`${o} icon-${r}${i?` ${i}`:""}`,style:l})};/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const v=[["path",{d:"m21 21-4.34-4.34",key:"14j7rj"}],["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}]],z=k("search",v),C=`import { Icon } from '@insightst-design/icons'

// 实心图标
<Icon name="apps-fill" />
<Icon name="database-fill" />

// 空心图标
<Icon name="apps-line" />
<Icon name="download-line" />`;function j({icons:r,copiedName:i,onCopy:l}){const{token:o}=I.useToken();return r.length===0?e.jsx("div",{style:{padding:"32px 0",textAlign:"center",color:o.colorTextTertiary,fontSize:13},children:"没有匹配的图标"}):e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(108px, 1fr))",gap:12},children:r.map(n=>{const s=i===n;return e.jsxs("button",{type:"button",onClick:()=>l(n),title:`复制 ${n}`,style:{display:"flex",flexDirection:"column",alignItems:"center",gap:8,padding:"14px 8px",borderRadius:8,border:`1px solid ${s?o.colorPrimary:o.colorBorder}`,background:s?`${o.colorPrimary}14`:o.colorBgContainer,cursor:"pointer",transition:"all 0.15s"},children:[e.jsx(L,{name:n}),e.jsx("span",{style:{fontSize:11,color:o.colorTextSecondary,wordBreak:"break-all",textAlign:"center",lineHeight:1.4},children:n}),e.jsxs("span",{style:{display:"flex",alignItems:"center",gap:4,fontSize:11,color:s?o.colorSuccess:o.colorTextTertiary},children:[s?e.jsx(w,{size:10}):e.jsx(N,{size:10}),s?"已复制":"点击复制"]})]},n)})})}function U(){const{token:r}=I.useToken(),[i,l]=d.useState(""),[o,n]=d.useState(null),s=i.trim().toLowerCase(),c=d.useMemo(()=>y.filter(t=>t.toLowerCase().includes(s)),[s]),a=d.useMemo(()=>f.filter(t=>t.toLowerCase().includes(s)),[s]),x=t=>{const g=`<Icon name="${t}" />`;navigator.clipboard.writeText(g).then(()=>{n(t),b.success(`已复制 ${g}`),setTimeout(()=>n(null),1500)})},h=`import { Icon } from '@insightst-design/icons'

${c.slice(0,6).map(t=>`<Icon name="${t}" />`).join(`
`)}${c.length>6?`
// ...`:""}`,u=`import { Icon } from '@insightst-design/icons'

${a.slice(0,6).map(t=>`<Icon name="${t}" />`).join(`
`)}${a.length>6?`
// ...`:""}`;return e.jsxs(S,{children:[e.jsxs("div",{children:[e.jsx("h1",{className:"text-h1 mb-1",style:{color:"var(--ds-text-primary)"},children:"图标"}),e.jsxs("p",{className:"text-body",style:{color:"var(--ds-text-secondary)"},children:["Icons · 共 ",y.length," 个实心图标、",f.length," 个空心图标，点击可复制用法"]})]}),e.jsx(T,{allowClear:!0,prefix:e.jsx(z,{size:14,style:{color:r.colorTextTertiary}}),placeholder:"搜索图标名称，如 database、search、folder",value:i,onChange:t=>l(t.target.value),style:{maxWidth:360}}),e.jsxs(m,{title:`实心图标 Fill (${c.length})`,children:[e.jsx(j,{icons:c,copiedName:o,onCopy:x}),e.jsx(p,{darkCode:h,lightCode:h})]}),e.jsxs(m,{title:`空心图标 Line (${a.length})`,children:[e.jsx(j,{icons:a,copiedName:o,onCopy:x}),e.jsx(p,{darkCode:u,lightCode:u})]}),e.jsx(m,{title:"基础用法",titleEn:"Usage",children:e.jsx(p,{darkCode:C,lightCode:C})})]})}export{U as default};
