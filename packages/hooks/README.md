# @insightst-design/hooks

A collection of React Hooks designed for data fetching, tables, pagination, and selection handling.

## 安装 (Installation)

```bash
npm install @insightst-design/hooks
```

---

## 1. `useFetch` 示例 (useFetch Example)

`useFetch` 用于处理通用异步数据请求，支持传参和重新发起请求 (`refetch`)。

### 示例代码

#### `api.ts`
```typescript
import { type Result } from '@insightst-design/hooks';

export interface User {
  id: number;
  name: string;
  age: number;
  description: string;
}

// 模拟接口请求
export const getUserList = async (params: Record<string, unknown>): Promise<Result<User[]>> => {
  console.log('Fetching users with params:', params);
  
  // 模拟返回 3 条数据
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
};
```

#### `UserFetchDemo.tsx`
```tsx
import React from 'react';
import { useFetch } from '@insightst-design/hooks';
import { getUserList, type User } from './api';
import { Button, Table, Spin, Space } from 'antd';

export default function UserFetchDemo() {
  const [loading, result, setResult, request, params] = useFetch<User[]>(
    getUserList,
    { role: 'developer' }
  );

  const users = result?.data ?? [];

  const handleRefetch = () => {
    // 重新发起请求，可传入新的查询参数，不传则使用上一次的参数
    request({ role: 'developer', timestamp: Date.now() });
  };

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: '姓名', dataIndex: 'name', key: 'name' },
    { title: '年龄', dataIndex: 'age', key: 'age' },
    { title: '个人简介', dataIndex: 'description', key: 'description' }
  ];

  return (
    <div style={{ padding: 24 }}>
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3>用户列表 (useFetch)</h3>
          <Button type="primary" onClick={handleRefetch} loading={loading}>
            重新加载 (Refetch)
          </Button>
        </div>
        <Spin spinning={loading}>
          <Table dataSource={users} columns={columns} rowKey="id" pagination={false} />
        </Spin>
      </Space>
    </div>
  );
}
```

---

## 2. `useTable` 示例 (useTable Example)

`useTable` 完美封装了 Antd Table 的数据流逻辑，包含**分页切换**、**多选操作**和**条件搜索**。
推荐参照 deepinsight 的组件结构，将表格页面的各个模块进行**分离封装**，保证代码高可读性与可维护性。

### 组件结构 (Module Structure)
* `api.ts` —— 接口层：定义数据类型和接口请求
* `useColumn.tsx` —— 列表列定义：封装 `columns` 配置，处理单元格渲染与单项操作
* `batchActions.tsx` —— 批量操作组件：处理选中的多行数据，执行批量动作
* `view.tsx` —— 主页面视图：组合各模块，传入 `useTable` 的 `tableProps`

### 示例代码

#### `api.ts`
```typescript
import { type Result } from '@insightst-design/hooks';

export interface User {
  id: number;
  name: string;
  age: number;
  description: string;
}

// 获取用户列表 (带分页参数)
export const getUsers = async (params: Record<string, unknown>): Promise<Result<User[]>> => {
  console.log('Request API parameters:', params);
  
  // 模拟返回 3 条数据
  const mockUsers: User[] = [
    { id: 1, name: '张三', age: 24, description: '全栈开发工程师，热爱开源' },
    { id: 2, name: '李四', age: 28, description: '高级算法专家，专注于大语言模型' },
    { id: 3, name: '王五', age: 32, description: '产品总监，负责数字化转型项目' }
  ];

  return {
    success: true,
    data: mockUsers,
    total: mockUsers.length,
  };
};

// 批量删除用户
export const deleteUsers = async (ids: number[]): Promise<Result<null>> => {
  console.log('Deleting users:', ids);
  return { success: true, message: '删除成功' };
};
```

#### `useColumn.tsx`
```tsx
import React, { useMemo } from 'react';
import { type TableColumnsType, Button, App } from 'antd';
import { type User } from './api';

export default function useColumn(onDelete: (id: number) => void): TableColumnsType<User> {
  const { message } = App.useApp();

  const columns: TableColumnsType<User> = useMemo(() => [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      width: 120,
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
      width: 100,
    },
    {
      title: '个人简介',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: '操作',
      key: 'action',
      width: 120,
      render: (_, record) => (
        <Button 
          type="link" 
          danger 
          onClick={() => {
            onDelete(record.id);
            message.success(`用户 ${record.name} 已被删除`);
          }}
        >
          删除
        </Button>
      ),
    }
  ], [onDelete, message]);

  return columns;
}
```

#### `batchActions.tsx`
```tsx
import React, { type FC } from 'react';
import { Button, Space, App } from 'antd';
import { type User, deleteUsers } from './api';

interface BatchActionsProps {
  selectedList: User[];
  refresh: () => void;
}

const BatchActions: FC<BatchActionsProps> = ({ selectedList, refresh }) => {
  const { modal, message } = App.useApp();
  const hasSelected = selectedList.length > 0;

  const handleBatchDelete = () => {
    modal.confirm({
      title: '确认删除',
      content: `确定要批量删除选中的 ${selectedList.length} 个用户吗？`,
      onOk: async () => {
        const ids = selectedList.map(item => item.id);
        const res = await deleteUsers(ids);
        if (res.success) {
          message.success('批量删除成功');
          refresh();
        } else {
          message.error(res.message || '批量删除失败');
        }
      }
    });
  };

  return (
    <div style={{ marginBottom: 16 }}>
      <Space>
        <Button 
          type="primary" 
          danger 
          disabled={!hasSelected} 
          onClick={handleBatchDelete}
        >
          批量删除
        </Button>
        <Button onClick={() => refresh()}>
          刷新
        </Button>
      </Space>
    </div>
  );
};

export default BatchActions;
```

#### `view.tsx`
```tsx
import React, { type FC } from 'react';
import { Table, Card } from 'antd';
import { useTable } from '@insightst-design/hooks';
import { getUsers, type User, deleteUsers } from './api';
import useColumn from './useColumn';
import BatchActions from './batchActions';

const UserListView: FC = () => {
  // 1. 初始化 useTable 核心数据流
  const { tableProps, refresh, selectedList } = useTable<User>({
    getData: getUsers,
    options: {
      rowSelection: { type: 'checkbox' },
      pagination: { pageSize: 10 }
    }
  });

  // 2. 处理单项删除后刷新表格
  const handleDeleteItem = async (id: number) => {
    await deleteUsers([id]);
    refresh();
  };

  // 3. 加载列配置
  const columns = useColumn(handleDeleteItem);

  return (
    <Card title="用户管理系统 (useTable)">
      {/* 4. 渲染批量操作栏 */}
      <BatchActions selectedList={selectedList} refresh={refresh} />
      
      {/* 5. 渲染表格组件 */}
      <Table<User> 
        columns={columns} 
        {...tableProps} 
        rowKey="id" 
      />
    </Card>
  );
};

export default UserListView;
```
