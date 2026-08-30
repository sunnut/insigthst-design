import{r as i,j as e,k as o}from"./index-xmebibFO.js";import{C as w}from"./CodeBlock-yFUMCofH.js";import{e as k,P as T,b as j,f as c,a as v}from"./playgroundLayout-CGRPHSL3.js";import{T as C,S as p}from"./index-DBXKx-wM.js";import{F as B}from"./Table-D1NkAf_t.js";import{T as z}from"./index-BZlQKXiU.js";import"./check-Dj_QKhp6.js";import"./copy-pcll_cHZ.js";import"./index-Bb-42o0d.js";import"./index-D5q0OV2r.js";import"./SearchOutlined-DLe303NC.js";import"./index-CVXb91g1.js";import"./index-CjaCUbl5.js";import"./useBreakpoint-BTBPzJyn.js";import"./Input-BKc4tNfr.js";const{Text:l}=C,m=958,I=800,D=[{key:1,name:"基于U-Net深度学习网络的风速预报订正...",field:"气象",status:"进行中",papers:0,time:"2025-08-20"},{key:2,name:"一种融合大语言模型与知识图谱的电力数据...",field:"金融",status:"待确认",papers:1,time:"2025-08-20"},{key:3,name:"复杂地形风场多尺度耦合的地形边界效应研究...",field:"医疗",status:"草稿",papers:3,time:"2025-08-20"},{key:4,name:"基于注意力机制的遥感图像语义分割方法...",field:"计算机",status:"已完成",papers:7,time:"2025-08-19"}];function R(a){switch(a){case"进行中":return"processing";case"待确认":return"warning";case"草稿":return"default";case"已完成":return"success";default:return"default"}}const P=`// 颜色通过 Ant Design theme token 注入，映射到 CSS 变量：
//   headerBg: 'var(--ds-bg-elevated)'          → 表头背景
//   headerColor: 'var(--ds-text-secondary)'     → --ant-table-header-color  表头文字
//   borderColor: 'var(--ds-border)'             → 描边/分割线
//   rowHoverBg: 'var(--ds-bg-elevated)'         → 暗色行悬停 / 亮色 #f8f9fc
//   rowSelectedBg: color-mix(primary, bg-card)  → 选中行（不透明，避免 fixed 列叠字）
//   cellPaddingBlock: 12px · cellPaddingInline: 16px
//   单元格文字: var(--ds-text-primary) · 链接: var(--ds-text-link) / var(--ds-danger)`;function E(a,s){return`${P}
import { useState } from 'react'
import { Table, Tag, Button, Space } from '@insightst-design/ui'

const data = [
  { key: 1, name: '任务名称示例', field: '气象', status: '进行中', papers: 0, time: '2025-08-20' },
  { key: 2, name: '另一条任务', field: '金融', status: '已完成', papers: 7, time: '2025-08-19' },
]

function TaskTable() {
  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([])

  const columns = [
    { title: '任务名称', dataIndex: 'name', width: 280, ellipsis: true },
    { title: '领域', dataIndex: 'field', width: 100 },
    {
      title: '状态',
      dataIndex: 'status',
      width: 100,
      render: (status: string) => (
        <Tag color={
          status === '进行中' ? 'processing'
          : status === '待确认' ? 'warning'
          : status === '已完成' ? 'success' : 'default'
        }>{status}</Tag>
      ),
    },
    {
      title: '文献数',
      dataIndex: 'papers',
      width: 140,
      sorter: (a, b) => a.papers - b.papers,
    },
    { title: '更新时间', dataIndex: 'time', width: 120 },
    {
      title: '操作',
      key: 'action',
      width: 170,
      fixed: 'right',
      render: () => (
        <Space>
          <Button type="link" size="small" style={{ padding: 0 }}>查看</Button>
          <Button type="link" size="small" danger style={{ padding: 0 }}>删除</Button>
        </Space>
      ),
    },
  ]

  return (
    <Table
      rowSelection={{ selectedRowKeys, onChange: setSelectedRowKeys }}
      columns={columns}
      dataSource={data}
      size="${a}"${s?`
      bordered`:""}
      pagination={false}
      scroll={{ x: ${m} }}
    />
  )
}`}function G(){const[a,s]=i.useState([]),[u,g]=i.useState(D),[r,y]=i.useState("middle"),[n,x]=i.useState(!1),f=()=>{g(t=>t.filter(d=>!a.includes(d.key))),s([])},h=[{title:"任务名称 Task",dataIndex:"name",key:"name",width:280,ellipsis:!0},{title:"领域 Field",dataIndex:"field",key:"field",width:100},{title:"状态 Status",dataIndex:"status",key:"status",width:100,render:t=>e.jsx(z,{color:R(t),children:t})},{title:"文献数 Papers",dataIndex:"papers",key:"papers",width:140,sorter:(t,d)=>t.papers-d.papers},{title:"更新时间 Time",dataIndex:"time",key:"time",width:120},{title:"操作 Action",key:"action",width:170,fixed:"right",render:()=>e.jsxs(p,{size:"middle",children:[e.jsx(o,{type:"link",size:"small",style:{padding:0},children:"查看 View"}),e.jsx(o,{type:"link",size:"small",danger:!0,style:{padding:0},children:"删除 Delete"})]})}],{darkCode:S,lightCode:b}=k("表格 (Table)",E(r,n));return e.jsxs(T,{children:[e.jsx(j,{hint:"交互范例 · 多选、排序、固定列、横向滚动",trailing:e.jsxs(l,{type:"secondary",style:{fontSize:12},children:["已选 ",a.length," 项"]})}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:24,flexWrap:"wrap"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8},children:[e.jsx(l,{type:"secondary",style:{fontSize:12},children:"尺寸"}),e.jsx(c,{size:"small",value:r,onChange:t=>y(t),options:[{label:"小",value:"small"},{label:"中",value:"middle"},{label:"大",value:"large"}]})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8},children:[e.jsx(l,{type:"secondary",style:{fontSize:12},children:"边框"}),e.jsx(c,{size:"small",value:n?"on":"off",onChange:t=>x(t==="on"),options:[{label:"无边框",value:"off"},{label:"有边框",value:"on"}]})]})]}),e.jsx(v,{title:"数据表格",titleEn:"Data Table",children:e.jsxs(p,{direction:"vertical",size:"middle",style:{width:"100%",maxWidth:I},children:[e.jsxs(o,{danger:!0,disabled:a.length===0,onClick:f,children:["批量删除",e.jsx(l,{style:{fontSize:12,opacity:.5,marginLeft:4},children:"Batch Delete"})]}),e.jsx(B,{rowSelection:{selectedRowKeys:a,onChange:s},columns:h,dataSource:u,size:r,bordered:n,pagination:!1,scroll:{x:m}})]})}),e.jsx(w,{darkCode:S,lightCode:b})]})}export{G as default};
