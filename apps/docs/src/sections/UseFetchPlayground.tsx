import { Button, Space, Typography, Table, Spin } from '@insightst-design/ui'
import { useFetch } from '@insightst-design/hooks'
import { type Result } from '@insightst-design/hooks'
import CodeBlock from './CodeBlock'
import { PlaygroundRoot, PlaygroundSection, PlaygroundHeader } from './playgroundLayout'

const { Text } = Typography

interface User {
  id: number
  name: string
  age: number
  description: string
}

// 模拟 API 请求
const getUserList = async (_params: Record<string, unknown>): Promise<Result<User[]>> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: [
          { id: 1, name: '张三', age: 24, description: '全栈开发工程师，热爱开源' },
          { id: 2, name: '李四', age: 28, description: '高级算法专家，专注于大语言模型' },
          { id: 3, name: '王五', age: 32, description: '产品总监，负责数字化转型项目' }
        ],
        total: 3,
        message: '获取成功'
      })
    }, 800) // 延迟 800ms 展现 Loading 效果
  })
}

const apiCode = `// api.ts —— 接口层
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
};`

const demoCode = `// UserFetchDemo.tsx —— 组件层
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
}`

export default function UseFetchPlayground() {
  const [loading, result, , request, params] = useFetch<User[]>(
    getUserList,
    { role: 'developer' }
  )

  const users = result?.data ?? []

  const handleRefetch = () => {
    request({ role: 'developer', timestamp: Date.now() })
  }

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id', width: 60 },
    { title: '姓名', dataIndex: 'name', key: 'name', width: 100 },
    { title: '年龄', dataIndex: 'age', key: 'age', width: 80 },
    { title: '个人简介', dataIndex: 'description', key: 'description' }
  ]

  return (
    <PlaygroundRoot>
      <div>
        <Text style={{ fontSize: 13, color: 'var(--ds-text-secondary)', display: 'block', marginBottom: 8 }}>
          <code>useFetch</code> 用于处理通用的异步数据请求。它维护了请求的 <code>loading</code> 状态、返回的 <code>result</code> 结果，
          并且提供了 <code>request</code> 函数用于根据新参数重新获取数据（<code>refetch</code> 机制）。
        </Text>
      </div>

      <PlaygroundSection title="交互演示" titleEn="Interactive Demo">
        <PlaygroundHeader
          hint="交互范例 · 模拟延迟 800ms 进行加载，支持重新加载 (Refetch)"
          trailing={
            <Text type="secondary" style={{ fontSize: 12 }}>
              当前请求参数: {JSON.stringify(params)}
            </Text>
          }
        />
        <div style={{ marginTop: 16, marginBottom: 16 }}>
          <Space direction="vertical" size="middle" style={{ width: '100%', maxWidth: 800 }}>
            <Button type="primary" onClick={handleRefetch} loading={loading}>
              重新加载 (Refetch)
            </Button>
            <Spin spinning={loading}>
              <Table dataSource={users} columns={columns} rowKey="id" pagination={false} />
            </Spin>
          </Space>
        </div>
      </PlaygroundSection>

      <PlaygroundSection title="接口代码" titleEn="api.ts">
        <CodeBlock darkCode={apiCode} lightCode={apiCode} lang="typescript" />
      </PlaygroundSection>

      <PlaygroundSection title="组件代码" titleEn="UserFetchDemo.tsx">
        <CodeBlock darkCode={demoCode} lightCode={demoCode} lang="tsx" />
      </PlaygroundSection>
    </PlaygroundRoot>
  )
}
