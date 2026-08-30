import{j as e,k as h,aA as g}from"./index-xmebibFO.js";import{u}from"./useFetch-BR2-YnyL.js";import{C as r}from"./CodeBlock-yFUMCofH.js";import{P as x,a as i,b as y}from"./playgroundLayout-CGRPHSL3.js";import{T as f,S as j}from"./index-DBXKx-wM.js";import{F as k}from"./Table-D1NkAf_t.js";import"./check-Dj_QKhp6.js";import"./copy-pcll_cHZ.js";import"./index-Bb-42o0d.js";import"./index-D5q0OV2r.js";import"./SearchOutlined-DLe303NC.js";import"./index-CVXb91g1.js";import"./index-CjaCUbl5.js";import"./useBreakpoint-BTBPzJyn.js";import"./Input-BKc4tNfr.js";const{Text:o}=f,U=async s=>new Promise(t=>{setTimeout(()=>{t({success:!0,data:[{id:1,name:"张三",age:24,description:"全栈开发工程师，热爱开源"},{id:2,name:"李四",age:28,description:"高级算法专家，专注于大语言模型"},{id:3,name:"王五",age:32,description:"产品总监，负责数字化转型项目"}],total:3,message:"获取成功"})},800)}),n=`// api.ts —— 接口层
import { type Result } from '@insightst-design/hooks';

export interface User {
  id: number;
  name: string;
  age: number;
  description: string;
}

// 模拟获取用户列表的 API 接口
export const getUserList = async (params: Record<string, unknown>): Promise<Result<User[]>> => {
  console.log('Fetching users with params:', params);
  
  const mockUsers: User[] = [
    { id: 1, name: '张三', age: 24, description: '全栈开发工程师，热爱开源' },
    { id: 2, name: '李四', age: 28, description: '高级算法专家，专注于大语言模型' },
    { id: 3, name: '王五', age: 32, description: '产品总监，负责数字化转型项目' }
  ];

  return {
    success: true,
    data: mockUsers,
    total: mockUsers.length,
    message: '获取成功'
  };
};`,a=`// UserFetchDemo.tsx —— 组件层
import React from 'react';
import { useFetch } from '@insightst-design/hooks';
import { getUserList, type User } from './api';
import { Button, Table, Spin, Space } from '@insightst-design/ui';

export default function UserFetchDemo() {
  const [loading, result, setResult, request, params] = useFetch<User[]>(
    getUserList,
    { role: 'developer' }
  );

  const users = result?.data ?? [];

  const handleRefetch = () => {
    // 重新发起请求，可传入新参数
    request({ role: 'developer', timestamp: Date.now() });
  };

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: '姓名', dataIndex: 'name', key: 'name' },
    { title: '年龄', dataIndex: 'age', key: 'age' },
    { title: '个人简介', dataIndex: 'description', key: 'description' }
  ];

  return (
    <Space direction="vertical" size="middle" style={{ width: '100%' }}>
      <Button type="primary" onClick={handleRefetch} loading={loading}>
        重新加载 (Refetch)
      </Button>
      <Table dataSource={users} columns={columns} rowKey="id" pagination={false} />
    </Space>
  );
}`;function L(){const[s,t,,d,c]=u(U,{role:"developer"}),l=(t==null?void 0:t.data)??[],m=()=>{d({role:"developer",timestamp:Date.now()})},p=[{title:"ID",dataIndex:"id",key:"id",width:60},{title:"姓名",dataIndex:"name",key:"name",width:100},{title:"年龄",dataIndex:"age",key:"age",width:80},{title:"个人简介",dataIndex:"description",key:"description"}];return e.jsxs(x,{children:[e.jsx("div",{children:e.jsxs(o,{style:{fontSize:13,color:"var(--ds-text-secondary)",display:"block",marginBottom:8},children:[e.jsx("code",{children:"useFetch"})," 用于处理通用的异步数据请求。它维护了请求的 ",e.jsx("code",{children:"loading"})," 状态、返回的 ",e.jsx("code",{children:"result"})," 结果， 并且提供了 ",e.jsx("code",{children:"request"})," 函数用于根据新参数重新获取数据（",e.jsx("code",{children:"refetch"})," 机制）。"]})}),e.jsxs(i,{title:"交互演示",titleEn:"Interactive Demo",children:[e.jsx(y,{hint:"交互范例 · 模拟延迟 800ms 进行加载，支持重新加载 (Refetch)",trailing:e.jsxs(o,{type:"secondary",style:{fontSize:12},children:["当前请求参数: ",JSON.stringify(c)]})}),e.jsx("div",{style:{marginTop:16,marginBottom:16},children:e.jsxs(j,{direction:"vertical",size:"middle",style:{width:"100%",maxWidth:800},children:[e.jsx(h,{type:"primary",onClick:m,loading:s,children:"重新加载 (Refetch)"}),e.jsx(g,{spinning:s,children:e.jsx(k,{dataSource:l,columns:p,rowKey:"id",pagination:!1})})]})})]}),e.jsx(i,{title:"接口代码",titleEn:"api.ts",children:e.jsx(r,{darkCode:n,lightCode:n,lang:"typescript"})}),e.jsx(i,{title:"组件代码",titleEn:"UserFetchDemo.tsx",children:e.jsx(r,{darkCode:a,lightCode:a,lang:"tsx"})})]})}export{L as default};
