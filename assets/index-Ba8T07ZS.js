import{aS as g,aT as v,r as l,j as e,aU as x}from"./index-xmebibFO.js";import{C as k}from"./CodeBlock-yFUMCofH.js";import{e as _,P as B,b as R,a as j}from"./playgroundLayout-CGRPHSL3.js";import"./check-Dj_QKhp6.js";import"./copy-pcll_cHZ.js";import"./index-DBXKx-wM.js";const C="_root_ia7x2_4",S="_tabsBar_ia7x2_17",P="_tabButton_ia7x2_28",T="_tabButtonActive_ia7x2_53",U="_tabsContent_ia7x2_65",i={root:C,tabsBar:S,tabButton:P,tabButtonActive:T,tabsContent:U};function d(a){return a.replace(/\/+$/,"")||"/"}function h(a,n){const s=d(a),r=d(n);return s===r||s.startsWith(r+"/")}const A=({basePath:a,defaultActiveKey:n,items:s})=>{var m;const r=g(),{pathname:c}=v(),b=l.useMemo(()=>d(a),[a]),u=l.useMemo(()=>s.map(t=>({key:t.key,path:`${b}/${t.key}`})),[s,b]),y=((m=u.find(t=>h(c,t.path)))==null?void 0:m.key)??n,p=l.useMemo(()=>new Map(u.map(t=>[t.key,t.path])),[u]),f=l.useCallback(t=>{const o=p.get(t);!o||h(c,o)||r(o)},[r,c,p]);return e.jsxs("div",{className:i.root,children:[e.jsx("div",{className:i.tabsBar,children:s.map(t=>{const o=y===t.key;return e.jsx("button",{role:"tab","aria-selected":o,disabled:t.disabled,onClick:()=>!t.disabled&&f(t.key),className:`${i.tabButton} ${o?i.tabButtonActive:""}`,children:t.label},t.key)})}),e.jsx("div",{className:i.tabsContent,children:e.jsx(x,{})})]})},z="/components/route-tabs",N=[{key:"info",label:"个人信息"},{key:"order",label:"我的订单"},{key:"settings",label:"账号设置"}];function I(){return`import { lazy, Suspense } from 'react'
import { Navigate } from 'react-router'
import { RouteTabs } from '@insightst-design/ui'

const UserInfo = lazy(() => import('./UserInfo'))
const UserOrder = lazy(() => import('./UserOrder'))
const UserSettings = lazy(() => import('./UserSettings'))

const tabItems = [
  { key: 'info',     label: '个人信息' },
  { key: 'order',    label: '我的订单' },
  { key: 'settings', label: '账号设置' },
]

// 在顶层路由定义处直接使用 RouteTabs 作为 layout，
// 子路由 (children) 对应各个标签页内容。
export const routes = [
  {
    path: '/user',
    element: (
      <RouteTabs
        basePath="/user"
        defaultActiveKey="info"
        items={tabItems}
      />
    ),
    children: [
      { index: true, element: <Navigate to="info" replace /> },
      {
        path: 'info',
        element: (
          <Suspense fallback={<div>loading...</div>}>
            <UserInfo />
          </Suspense>
        ),
      },
      {
        path: 'order',
        element: (
          <Suspense fallback={<div>loading...</div>}>
            <UserOrder />
          </Suspense>
        ),
      },
      {
        path: 'settings',
        element: (
          <Suspense fallback={<div>loading...</div>}>
            <UserSettings />
          </Suspense>
        ),
      },
    ],
  },
]`}function H(){const{darkCode:a,lightCode:n}=_("路由标签 (RouteTabs)",I());return e.jsxs(B,{children:[e.jsx(R,{hint:"交互范例 · 路由标签（RouteTabs）· 切换标签会真实更新地址栏路由"}),e.jsx(j,{title:"预览",titleEn:"Preview",children:e.jsx("div",{style:{height:360,borderRadius:8,overflow:"hidden"},children:e.jsx(A,{basePath:z,defaultActiveKey:"info",items:N})})}),e.jsx(k,{darkCode:a,lightCode:n})]})}export{H as default};
