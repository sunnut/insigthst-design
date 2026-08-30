import{u as r,j as e,aQ as i}from"./index-xmebibFO.js";import{C as a}from"./CodeBlock-yFUMCofH.js";import{e as d,P as n,b as l,a as c}from"./playgroundLayout-CGRPHSL3.js";import"./check-Dj_QKhp6.js";import"./copy-pcll_cHZ.js";import"./index-DBXKx-wM.js";const u="_customLayoutDemo_l3lf8_1",g={customLayoutDemo:u};function m(){return`import { Layout } from '@insightst-design/ui'
import styles from './LayoutPlayground.module.css'

const breadcrumbItems = [
  { title: '首页' },
  { title: '功能模块' },
  { title: '当前页面' },
]

export function LayoutDemo() {
  return (
    <div style={{ height: 520, borderRadius: 8, overflow: 'hidden', border: '1px solid var(--ds-border)' }}>
      <Layout
        className={styles.customLayoutDemo}
        platformName="项目xxx"
        logo="/insigthst-design/icons/icon-logo.svg"
        items={breadcrumbItems}
        topRight={
          <div style={{ height: 36, display: 'flex', alignItems: 'center', gap: 4, padding: '0 10px', background: 'var(--ds-header-button-bg)', borderRadius: 224, cursor: 'pointer' }}>
            <img src="/insigthst-design/icons/icon-user.svg" alt="用户" style={{ width: 16, height: 16 }} />
            <span style={{ color: 'var(--ds-text-inverse)', fontSize: 14, whiteSpace: 'nowrap' }}>
              xxx
            </span>
          </div>
        }
        sidebar={
          <div style={{ width: 200, height: '100%', background: 'var(--ds-bg-sidebar)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--ds-text-secondary)' }}>
            导航菜单区域
          </div>
        }
      >
        <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--ds-bg-card)', borderRadius: 8, border: '1px solid var(--ds-border)' }}>
          内容区域
        </div>
      </Layout>
    </div>
  )
}`}const y=[{title:"首页"},{title:"功能模块"},{title:"当前页面"}];function j(){const{mode:t}=r(),{darkCode:o,lightCode:s}=d("整体布局 (Layout)",m());return e.jsxs(n,{children:[e.jsx(l,{hint:"交互范例 · 整体布局（Layout）"}),e.jsx(c,{title:"布局预览",titleEn:"Layout Preview",children:e.jsx("div",{style:{height:520,borderRadius:8,overflow:"hidden",border:"1px solid var(--ds-border)"},children:e.jsx(i,{className:g.customLayoutDemo,platformName:"项目xxx",logo:t==="light"?"/insigthst-design/icons/icon-logo-light.svg":"/insigthst-design/icons/icon-logo.svg",items:y,topRight:e.jsxs("div",{style:{height:36,display:"flex",alignItems:"center",gap:4,padding:"0 10px",background:"var(--ds-header-button-bg)",borderRadius:224,cursor:"pointer"},children:[e.jsx("img",{src:"/insigthst-design/icons/icon-user.svg",alt:"用户",className:"nav-icon-img",style:{width:16,height:16}}),e.jsx("span",{style:{color:"var(--ds-text-inverse)",fontSize:14,fontFamily:"OPPOSans, -apple-system, sans-serif",lineHeight:"18px",whiteSpace:"nowrap"},children:"xxx"})]}),sidebar:e.jsx("div",{style:{width:"var(--layout-sidebar-width, 200px)",height:"100%",background:"var(--ds-bg-sidebar, #17191C)",display:"flex",alignItems:"center",justifyContent:"center",color:"var(--ds-text-secondary)",fontSize:14},children:"导航菜单区域"}),children:e.jsx("div",{style:{height:"100%",display:"flex",alignItems:"center",justifyContent:"center",background:"var(--ds-bg-card)",borderRadius:8,border:"1px solid var(--ds-border)",color:"var(--ds-text-primary)",fontSize:16},children:"内容区域"})})})}),e.jsx(a,{darkCode:o,lightCode:s})]})}export{j as default};
