import{j as e,cU as g,r as b,k as h,cV as j,cx as y,cW as o}from"./index-xmebibFO.js";import{C as d}from"./CodeBlock-yFUMCofH.js";import{P as v,a as s,b as B}from"./playgroundLayout-CGRPHSL3.js";import{T as f,S as p}from"./index-DBXKx-wM.js";import{T as a}from"./index-BZlQKXiU.js";import"./check-Dj_QKhp6.js";import"./copy-pcll_cHZ.js";const{Text:n}=f;function P(){const r=j();return e.jsx("div",{style:{padding:"8px 16px",background:"var(--ds-bg-input)",border:"1px solid var(--ds-border)",borderRadius:6,minHeight:36,display:"flex",alignItems:"center"},children:r.length>0?e.jsx(y,{items:r}):e.jsx(n,{type:"secondary",style:{fontSize:12},children:"（未设置面包屑）"})})}function k(){return o([{title:"首页"}]),e.jsx(l,{title:"首页",color:"var(--ds-primary)",bg:"var(--ds-primary-subtle)"})}function C(){return o([{title:"首页"},{title:"用户列表"}]),e.jsx(l,{title:"用户列表",color:"var(--ds-success)",bg:"var(--ds-success-bg)"})}function A(){return o([{title:"首页"},{title:"用户列表"},{title:"用户详情"}]),e.jsx(l,{title:"用户详情",color:"var(--ds-warning)",bg:"var(--ds-warning-bg)"})}function l({title:r,color:i,bg:t}){return e.jsx("div",{style:{padding:"20px 16px",borderRadius:6,background:t,border:`1px dashed ${i}`,textAlign:"center"},children:e.jsx(n,{style:{color:i,fontWeight:600},children:r})})}const V=[{key:"home",label:"首页"},{key:"list",label:"用户列表"},{key:"detail",label:"用户详情"}];function D(){const[r,i]=b.useState("home");return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:12},children:[e.jsx(p,{wrap:!0,children:V.map(t=>e.jsx(h,{type:r===t.key?"primary":"default",size:"small",onClick:()=>i(t.key),children:t.label},t.key))}),e.jsx(P,{}),r==="home"&&e.jsx(k,{}),r==="list"&&e.jsx(C,{}),r==="detail"&&e.jsx(A,{})]})}const c=`// main.tsx / App.tsx —— 在应用顶层包裹 Provider
import { BreadcrumbProvider } from '@insightst-design/hooks';

export default function App() {
  return (
    <BreadcrumbProvider>
      <Layout />   {/* 内部包含路由和面包屑展示组件 */}
    </BreadcrumbProvider>
  );
}`,u=`// AppBreadcrumb.tsx —— 面包屑展示组件
import { useBreadcrumbValue } from '@insightst-design/hooks';
import { Breadcrumb } from '@insightst-design/ui';

export function AppBreadcrumb() {
  const items = useBreadcrumbValue();   // 订阅 items 变化
  return <Breadcrumb items={items} />;
}`,m=`// UserDetailPage.tsx —— 子路由页面声明面包屑
import { useBreadcrumb } from '@insightst-design/hooks';

export default function UserDetailPage() {
  useBreadcrumb([
    { title: '首页' },
    { title: '用户列表' },
    { title: '用户详情' },
  ]);

  return <div>用户详情内容…</div>;
}`,x=`// API 说明
// BreadcrumbProvider  — Context 提供者，包裹在应用顶层
// useBreadcrumb(items) — 子路由调用，声明当前页面的面包屑；组件卸载自动清空
// useBreadcrumbValue() — 面包屑渲染组件调用，读取当前 items`;function U(){return e.jsxs(v,{children:[e.jsxs("div",{children:[e.jsxs(n,{style:{fontSize:13,color:"var(--ds-text-secondary)",display:"block",marginBottom:8},children:[e.jsx("code",{children:"useBreadcrumb"})," / ",e.jsx("code",{children:"useBreadcrumbValue"})," / ",e.jsx("code",{children:"BreadcrumbProvider"})," ","通过双 Context 实现面包屑的声明式管理：子路由用"," ",e.jsx("code",{children:"useBreadcrumb"})," 声明路径，顶部栏用"," ",e.jsx("code",{children:"useBreadcrumbValue"})," 展示，互不干扰，卸载自动清空。"]}),e.jsxs(p,{size:6,wrap:!0,children:[e.jsx(a,{style:{color:"var(--ds-primary)",background:"var(--ds-primary-subtle)",border:"none"},children:"BreadcrumbProvider"}),e.jsx(a,{style:{color:"var(--ds-success)",background:"var(--ds-success-bg)",border:"none"},children:"useBreadcrumb"}),e.jsx(a,{style:{color:"var(--ds-warning)",background:"var(--ds-warning-bg)",border:"none"},children:"useBreadcrumbValue"})]})]}),e.jsxs(s,{title:"交互演示",titleEn:"Interactive Demo",children:[e.jsx(B,{hint:"切换页面 · 面包屑自动更新"}),e.jsx("div",{style:{marginTop:16},children:e.jsx(g,{children:e.jsx(D,{})})})]}),e.jsx(s,{title:"1. 顶层包裹 Provider",titleEn:"App.tsx",children:e.jsx(d,{darkCode:c,lightCode:c,lang:"tsx"})}),e.jsx(s,{title:"2. 面包屑展示组件",titleEn:"AppBreadcrumb.tsx",children:e.jsx(d,{darkCode:u,lightCode:u,lang:"tsx"})}),e.jsx(s,{title:"3. 子路由声明面包屑",titleEn:"UserDetailPage.tsx",children:e.jsx(d,{darkCode:m,lightCode:m,lang:"tsx"})}),e.jsx(s,{title:"API 说明",titleEn:"API",children:e.jsx(d,{darkCode:x,lightCode:x,lang:"typescript"})})]})}export{U as default};
