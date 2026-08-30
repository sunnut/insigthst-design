import{r as u,j as t}from"./index-xmebibFO.js";import{C as S}from"./check-Dj_QKhp6.js";function O({title:p,subtitle:j,filePrefix:h,data:x,cssComments:a}){const[c,$]=u.useState("css"),[b,y]=u.useState(!1),v=[{key:"json",label:"JSON"},{key:"css",label:"CSS Variables"},{key:"scss",label:"SCSS"},{key:"less",label:"LESS"}],f=()=>{const o=new Date().toISOString().slice(0,10),i=`/* ═══════════════════════════════════════════
   ${p}
   Generated on ${o}
═══════════════════════════════════════════ */

`;switch(c){case"json":return JSON.stringify(x,null,2);case"css":{let e=i+`:root {
`;return Object.entries(x).forEach(([n,d])=>{e+=`  /* ── ${n} ── */
`,Object.entries(d).forEach(([r,s])=>{const l=(a==null?void 0:a[`${n}.${r}`])||"";l&&(e+=`  /* ${l} */
`),e+=`  --${r}: ${s};
`})}),e+=`}
`,e}case"scss":{let e=i;return Object.entries(x).forEach(([n,d])=>{e+=`// ── ${n} ──
`,Object.entries(d).forEach(([r,s])=>{const l=(a==null?void 0:a[`${n}.${r}`])||"";e+=`$${r}: ${s};${l?` // ${l}`:""}
`}),e+=`
`}),e}case"less":{let e=i;return Object.entries(x).forEach(([n,d])=>{e+=`// ── ${n} ──
`,Object.entries(d).forEach(([r,s])=>{const l=(a==null?void 0:a[`${n}.${r}`])||"";e+=`@${r}: ${s};${l?` // ${l}`:""}
`}),e+=`
`}),e}}},k=()=>{const o=f(),i=c==="json"?"json":c,e=new Date().toISOString().slice(0,10),n=`${h}-${e}.${i}`,d=new Blob([o],{type:c==="json"?"application/json":"text/plain"}),r=URL.createObjectURL(d),s=document.createElement("a");s.href=r,s.download=n,document.body.appendChild(s),s.click(),document.body.removeChild(s),URL.revokeObjectURL(r),y(!0),setTimeout(()=>y(!1),2e3)};return t.jsx("div",{className:"rounded-lg p-4",style:{background:"var(--ds-bg-elevated)",border:"1px solid var(--ds-border)"},children:t.jsxs("div",{className:"flex items-center justify-between flex-wrap gap-3",children:[t.jsxs("div",{children:[t.jsx("div",{className:"text-body font-medium",style:{color:"var(--ds-text-primary)"},children:p}),t.jsx("div",{className:"text-caption",style:{color:"var(--ds-text-tertiary)"},children:j})]}),t.jsxs("div",{className:"flex items-center gap-2",children:[v.map(o=>t.jsx("button",{onClick:()=>$(o.key),className:"px-3 py-1.5 rounded-md text-caption transition-all duration-150",style:{background:c===o.key?"var(--ds-primary-subtle)":"var(--ds-bg-card)",color:c===o.key?"var(--ds-primary)":"var(--ds-text-secondary)",border:`1px solid ${c===o.key?"var(--ds-primary-border)":"var(--ds-border)"}`,cursor:"pointer"},children:o.label},o.key)),t.jsxs("button",{onClick:k,className:"flex items-center gap-2 px-4 py-1.5 rounded-md text-button transition-all duration-150",style:{background:b?"var(--ds-success)":"var(--ds-primary)",color:"#fff",border:"none",cursor:"pointer"},children:[b?t.jsx(S,{size:14}):t.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[t.jsx("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),t.jsx("polyline",{points:"7 10 12 15 17 10"}),t.jsx("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]}),b?"已下载":"下载"]})]})]})})}export{O as T};
