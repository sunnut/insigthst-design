import{j as a,r as i}from"./index-xmebibFO.js";import{C as r}from"./CodeBlock-yFUMCofH.js";import{e as d,P as c,b,a as u}from"./playgroundLayout-CGRPHSL3.js";import"./check-Dj_QKhp6.js";import"./copy-pcll_cHZ.js";import"./index-DBXKx-wM.js";const g="_btnGroup_1khc6_1",v="_btn_1khc6_1",p="_active_1khc6_33",h="_disabled_1khc6_39",o={btnGroup:g,btn:v,active:p,disabled:h},_=({data:t,onChange:s})=>a.jsx("div",{className:o.btnGroup,children:t.map((e,n)=>a.jsx("button",{type:"button",className:`${o.btn} ${e.active?o.active:""} ${e.disabled?o.disabled:""}`,onClick:()=>!e.disabled&&s({label:e.label,value:e.value}),disabled:e.disabled,children:e.label},n))}),m=`import { Buttons } from '@insightst-design/ui'

const [region, setRegion] = useState('global')

<Buttons
  data={[
    { label: '全球', value: 'global', active: region === 'global' },
    { label: '华东', value: 'east_china', active: region === 'east_china' },
    ...['华北', '华南', '华中', '西南', '西北', '东北'].map(r => ({
      label: r,
      value: r,
      disabled: true,
    }))
  ]}
  onChange={(item) => setRegion(item.value as string)}
/>`;function B(){const[t,s]=i.useState("global"),{darkCode:e,lightCode:n}=d("按钮组 (Buttons)",m);return a.jsxs(c,{children:[a.jsx(b,{}),a.jsx(u,{title:"区域选择",titleEn:"Region Selector",children:a.jsx(_,{data:[{label:"全球",value:"global",active:t==="global"},{label:"华东",value:"east_china",active:t==="east_china"},...["华北","华南","华中","西南","西北","东北"].map(l=>({label:l,value:l,disabled:!0}))],onChange:l=>s(l.value)})}),a.jsx(r,{darkCode:e,lightCode:n})]})}export{B as default};
