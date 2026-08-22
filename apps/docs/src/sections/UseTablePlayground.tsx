import { useState, useMemo, useEffect } from 'react'
import { Table, Button, Space, Typography, Card, App, Form, Input, InputNumber, Descriptions, Spin, Modal } from '@insightst-design/ui'
import { useTable } from '@insightst-design/hooks'
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

// 模拟数据库数据
let mockUsersList: User[] = [
  { id: 1, name: '张三', age: 24, description: '全栈开发工程师，热爱开源' },
  { id: 2, name: '李四', age: 28, description: '高级算法专家，专注于大语言模型' },
  { id: 3, name: '王五', age: 32, description: '产品总监，负责数字化转型项目' }
]

// 模拟 API 请求
const getUsers = async (_params: Record<string, unknown>): Promise<Result<User[]>> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: [...mockUsersList],
        total: mockUsersList.length
      })
    }, 600)
  })
}

// Mock delete action
const deleteUsers = async (ids: number[]): Promise<Result<null>> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      mockUsersList = mockUsersList.filter((item) => !ids.includes(item.id))
      resolve({ success: true, message: '删除成功' })
    }, 400)
  })
}

// Mock create action
const createUser = async (user: Omit<User, 'id'>): Promise<Result<User>> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const nextId = mockUsersList.length > 0 ? Math.max(...mockUsersList.map(u => u.id)) + 1 : 1
      const newUser = { id: nextId, ...user }
      mockUsersList.push(newUser)
      resolve({ success: true, data: newUser, message: '创建成功' })
    }, 400)
  })
}

// Mock update action
const updateUser = async (user: User): Promise<Result<User>> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      mockUsersList = mockUsersList.map((u) => u.id === user.id ? user : u)
      resolve({ success: true, data: user, message: '更新成功' })
    }, 400)
  })
}

// Mock get detail action
const getUserDetail = async (id: number): Promise<Result<User>> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const user = mockUsersList.find((u) => u.id === id)
      if (user) {
        resolve({ success: true, data: user })
      } else {
        resolve({ success: false, message: '用户不存在' })
      }
    }, 400)
  })
}

// Interactive Sub-Components for Live Demo
interface AddModalProps {
  open: boolean
  onCancel: () => void
  onSuccess: () => void
}

const AddModal: React.FC<AddModalProps> = ({ open, onCancel, onSuccess }) => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const { message } = App.useApp()

  const handleOk = async () => {
    try {
      const values = await form.validateFields()
      setLoading(true)
      const res = await createUser(values)
      setLoading(false)
      if (res.success) {
        message.success('创建成功')
        form.resetFields()
        onSuccess()
      } else {
        message.error(res.message || '创建失败')
      }
    } catch (error) {
      console.log('Validation failed:', error)
    }
  }

  return (
    <Modal
      title="创建用户"
      open={open}
      onOk={handleOk}
      confirmLoading={loading}
      onCancel={() => {
        form.resetFields()
        onCancel()
      }}
      destroyOnClose
    >
      <Form form={form} layout="vertical" initialValues={{ age: 24 }}>
        <Form.Item
          name="name"
          label="姓名"
          rules={[{ required: true, message: '请输入姓名' }]}
        >
          <Input placeholder="请输入姓名" />
        </Form.Item>
        <Form.Item
          name="age"
          label="年龄"
          rules={[{ required: true, message: '请输入年龄' }]}
        >
          <InputNumber min={1} max={120} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          name="description"
          label="个人简介"
          rules={[{ required: true, message: '请输入个人简介' }]}
        >
          <Input.TextArea placeholder="请输入个人简介" rows={3} />
        </Form.Item>
      </Form>
    </Modal>
  )
}

interface EditModalProps {
  open: boolean
  user: User | null
  onCancel: () => void
  onSuccess: () => void
}

const EditModal: React.FC<EditModalProps> = ({ open, user, onCancel, onSuccess }) => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const { message } = App.useApp()

  useEffect(() => {
    if (open && user) {
      form.setFieldsValue(user)
    }
  }, [open, user, form])

  const handleOk = async () => {
    if (!user) return
    try {
      const values = await form.validateFields()
      setLoading(true)
      const res = await updateUser({ ...user, ...values })
      setLoading(false)
      if (res.success) {
        message.success('更新成功')
        onSuccess()
      } else {
        message.error(res.message || '更新失败')
      }
    } catch (error) {
      console.log('Validation failed:', error)
    }
  }

  return (
    <Modal
      title="编辑用户"
      open={open}
      onOk={handleOk}
      confirmLoading={loading}
      onCancel={onCancel}
      destroyOnClose
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label="姓名"
          rules={[{ required: true, message: '请输入姓名' }]}
        >
          <Input placeholder="请输入姓名" />
        </Form.Item>
        <Form.Item
          name="age"
          label="年龄"
          rules={[{ required: true, message: '请输入年龄' }]}
        >
          <InputNumber min={1} max={120} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          name="description"
          label="个人简介"
          rules={[{ required: true, message: '请输入个人简介' }]}
        >
          <Input.TextArea placeholder="请输入个人简介" rows={3} />
        </Form.Item>
      </Form>
    </Modal>
  )
}

interface DetailModalProps {
  open: boolean
  userId: number | null
  onCancel: () => void
}

const DetailModal: React.FC<DetailModalProps> = ({ open, userId, onCancel }) => {
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const { message } = App.useApp()

  useEffect(() => {
    if (open && userId !== null) {
      setLoading(true)
      getUserDetail(userId).then(res => {
        setLoading(false)
        if (res.success && res.data) {
          setUser(res.data)
        } else {
          message.error(res.message || '获取详情失败')
          onCancel()
        }
      })
    } else {
      setUser(null)
    }
  }, [open, userId, onCancel])

  return (
    <Modal
      title="用户详情"
      open={open}
      footer={null}
      onCancel={onCancel}
      destroyOnClose
    >
      <Spin spinning={loading}>
        {user && (
          <Descriptions column={1} bordered size="small">
            <Descriptions.Item label="ID">{user.id}</Descriptions.Item>
            <Descriptions.Item label="姓名">{user.name}</Descriptions.Item>
            <Descriptions.Item label="年龄">{user.age}</Descriptions.Item>
            <Descriptions.Item label="个人简介">{user.description}</Descriptions.Item>
          </Descriptions>
        )}
      </Spin>
    </Modal>
  )
}

// 静态文档展示的源码字符串定义
const apiCode = `// api.ts —— 接口及数据模型层
import { type Result } from '@insightst-design/hooks';

export interface User {
  id: number;
  name: string;
  age: number;
  description: string;
}

// 模拟数据库数据
let mockUsersList: User[] = [
  { id: 1, name: '张三', age: 24, description: '全栈开发工程师，热爱开源' },
  { id: 2, name: '李四', age: 28, description: '高级算法专家，专注于大语言模型' },
  { id: 3, name: '王五', age: 32, description: '产品总监，负责数字化转型项目' }
];

// 获取用户列表 (带分页与筛选参数)
export const getUsers = async (params: Record<string, unknown>): Promise<Result<User[]>> => {
  console.log('Request API parameters:', params);
  return {
    success: true,
    data: [...mockUsersList],
    total: mockUsersList.length,
  };
};

// 批量删除用户
export const deleteUsers = async (ids: number[]): Promise<Result<null>> => {
  console.log('Deleting users:', ids);
  mockUsersList = mockUsersList.filter(item => !ids.includes(item.id));
  return { success: true, message: '删除成功' };
};

// 创建用户
export const createUser = async (user: Omit<User, 'id'>): Promise<Result<User>> => {
  console.log('Creating user:', user);
  const nextId = mockUsersList.length > 0 ? Math.max(...mockUsersList.map(u => u.id)) + 1 : 1;
  const newUser = { id: nextId, ...user };
  mockUsersList.push(newUser);
  return { success: true, data: newUser, message: '创建成功' };
};

// 更新用户
export const updateUser = async (user: User): Promise<Result<User>> => {
  console.log('Updating user:', user);
  mockUsersList = mockUsersList.map(u => u.id === user.id ? user : u);
  return { success: true, data: user, message: '更新成功' };
};

// 获取用户详情
export const getUserDetail = async (id: number): Promise<Result<User>> => {
  console.log('Getting user detail:', id);
  const user = mockUsersList.find(u => u.id === id);
  if (user) {
    return { success: true, data: user };
  }
  return { success: false, message: '用户不存在' };
};`

const useColumnCode = `// useColumn.tsx —— 列表列定义 Hook
import React, { useMemo } from 'react';
import { type TableColumnsType, Button, Space, App } from '@insightst-design/ui';
import { type User } from './api';

export default function useColumn(
  onDetail: (record: User) => void,
  onEdit: (record: User) => void,
  onDelete: (id: number) => void
): TableColumnsType<User> {
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
      width: 180,
      render: (_, record) => (
        <Space size={0}>
          <Button type="link" onClick={() => onDetail(record)}>
            详情
          </Button>
          <Button type="link" onClick={() => onEdit(record)}>
            编辑
          </Button>
          <Button 
            type="link" 
            danger 
            onClick={() => {
              onDelete(record.id);
            }}
          >
            删除
          </Button>
        </Space>
      ),
    }
  ], [onDetail, onEdit, onDelete]);

  return columns;
}`

const batchActionsCode = `// batchActions.tsx —— 批量操作组件
import React, { type FC } from 'react';
import { Button, Space, App } from '@insightst-design/ui';
import { type User, deleteUsers } from './api';

interface BatchActionsProps {
  selectedList: User[];
  refresh: () => void;
  onCreate: () => void;
}

const BatchActions: FC<BatchActionsProps> = ({ selectedList, refresh, onCreate }) => {
  const { modal, message } = App.useApp();
  const hasSelected = selectedList.length > 0;

  const handleBatchDelete = () => {
    modal.confirm({
      title: '确认删除',
      content: \`确定要批量删除选中的 \${selectedList.length} 个用户吗？\`,
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
        <Button type="primary" onClick={onCreate}>
          创建
        </Button>
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

export default BatchActions;`

const addCode = `// add.tsx —— 创建组件
import React, { type FC, useState } from 'react';
import { Modal, Form, Input, InputNumber, App } from '@insightst-design/ui';
import { createUser } from './api';

interface AddProps {
  open: boolean;
  onCancel: () => void;
  onSuccess: () => void;
}

const Add: FC<AddProps> = ({ open, onCancel, onSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { message } = App.useApp();

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      const res = await createUser(values);
      setLoading(false);
      if (res.success) {
        message.success('创建成功');
        form.resetFields();
        onSuccess();
      } else {
        message.error(res.message || '创建失败');
      }
    } catch (error) {
      console.log('Validation failed:', error);
    }
  };

  return (
    <Modal
      title="创建用户"
      open={open}
      onOk={handleOk}
      confirmLoading={loading}
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      destroyOnClose
    >
      <Form form={form} layout="vertical" initialValues={{ age: 24 }}>
        <Form.Item
          name="name"
          label="姓名"
          rules={[{ required: true, message: '请输入姓名' }]}
        >
          <Input placeholder="请输入姓名" />
        </Form.Item>
        <Form.Item
          name="age"
          label="年龄"
          rules={[{ required: true, message: '请输入年龄' }]}
        >
          <InputNumber min={1} max={120} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          name="description"
          label="个人简介"
          rules={[{ required: true, message: '请输入个人简介' }]}
        >
          <Input.TextArea placeholder="请输入个人简介" rows={3} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Add;`

const updateCode = `// update.tsx —— 编辑组件
import React, { type FC, useState, useEffect } from 'react';
import { Modal, Form, Input, InputNumber, App } from '@insightst-design/ui';
import { updateUser, type User } from './api';

interface UpdateProps {
  open: boolean;
  user: User | null;
  onCancel: () => void;
  onSuccess: () => void;
}

const Update: FC<UpdateProps> = ({ open, user, onCancel, onSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { message } = App.useApp();

  useEffect(() => {
    if (open && user) {
      form.setFieldsValue(user);
    }
  }, [open, user, form]);

  const handleOk = async () => {
    if (!user) return;
    try {
      const values = await form.validateFields();
      setLoading(true);
      const res = await updateUser({ ...user, ...values });
      setLoading(false);
      if (res.success) {
        message.success('更新成功');
        onSuccess();
      } else {
        message.error(res.message || '更新失败');
      }
    } catch (error) {
      console.log('Validation failed:', error);
    }
  };

  return (
    <Modal
      title="编辑用户"
      open={open}
      onOk={handleOk}
      confirmLoading={loading}
      onCancel={onCancel}
      destroyOnClose
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label="姓名"
          rules={[{ required: true, message: '请输入姓名' }]}
        >
          <Input placeholder="请输入姓名" />
        </Form.Item>
        <Form.Item
          name="age"
          label="年龄"
          rules={[{ required: true, message: '请输入年龄' }]}
        >
          <InputNumber min={1} max={120} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          name="description"
          label="个人简介"
          rules={[{ required: true, message: '请输入个人简介' }]}
        >
          <Input.TextArea placeholder="请输入个人简介" rows={3} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Update;`

const detailCode = `// detail.tsx —— 详情组件
import React, { type FC, useState, useEffect } from 'react';
import { Modal, Descriptions, Spin, App } from '@insightst-design/ui';
import { getUserDetail, type User } from './api';

interface DetailProps {
  open: boolean;
  userId: number | null;
  onCancel: () => void;
}

const Detail: FC<DetailProps> = ({ open, userId, onCancel }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const { message } = App.useApp();

  useEffect(() => {
    if (open && userId !== null) {
      setLoading(true);
      getUserDetail(userId).then(res => {
        setLoading(false);
        if (res.success && res.data) {
          setUser(res.data);
        } else {
          message.error(res.message || '获取详情失败');
          onCancel();
        }
      });
    } else {
      setUser(null);
    }
  }, [open, userId, onCancel]);

  return (
    <Modal
      title="用户详情"
      open={open}
      footer={null}
      onCancel={onCancel}
      destroyOnClose
    >
      <Spin spinning={loading}>
        {user && (
          <Descriptions column={1} bordered size="small">
            <Descriptions.Item label="ID">{user.id}</Descriptions.Item>
            <Descriptions.Item label="姓名">{user.name}</Descriptions.Item>
            <Descriptions.Item label="年龄">{user.age}</Descriptions.Item>
            <Descriptions.Item label="个人简介">{user.description}</Descriptions.Item>
          </Descriptions>
        )}
      </Spin>
    </Modal>
  );
};

export default Detail;`

const viewCode = `// view.tsx —— 主页面视图组件
import React, { type FC, useState } from 'react';
import { Table, Card } from '@insightst-design/ui';
import { useTable } from '@insightst-design/hooks';
import { getUsers, type User, deleteUsers } from './api';
import useColumn from './useColumn';
import BatchActions from './batchActions';
import Add from './add';
import Update from './update';
import Detail from './detail';

const UserListView: FC = () => {
  const [addOpen, setAddOpen] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [detailUserId, setDetailUserId] = useState<number | null>(null);

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

  // 3. 加载列配置并绑定操作回调
  const columns = useColumn(
    (record) => setDetailUserId(record.id),
    (record) => setEditUser(record),
    handleDeleteItem
  );

  return (
    <Card title="用户管理系统 (useTable)">
      {/* 4. 批量操作栏 */}
      <BatchActions 
        selectedList={selectedList} 
        refresh={refresh} 
        onCreate={() => setAddOpen(true)} 
      />
      
      {/* 5. 数据表格 */}
      <Table<User> 
        columns={columns} 
        {...tableProps} 
        rowKey="id" 
      />

      {/* 6. 创建、编辑与详情模态框 */}
      <Add
        open={addOpen}
        onCancel={() => setAddOpen(false)}
        onSuccess={() => {
          setAddOpen(false);
          refresh();
        }}
      />

      <Update
        open={!!editUser}
        user={editUser}
        onCancel={() => setEditUser(null)}
        onSuccess={() => {
          setEditUser(null);
          refresh();
        }}
      />

      <Detail
        open={detailUserId !== null}
        userId={detailUserId}
        onCancel={() => setDetailUserId(null)}
      />
    </Card>
  );
};

export default UserListView;`

export default function UseTablePlayground() {
  const { message, modal } = App.useApp()
  const [loading, setLoading] = useState(false)

  // 交互用模态框状态管理
  const [addOpen, setAddOpen] = useState(false)
  const [editUser, setEditUser] = useState<User | null>(null)
  const [detailUserId, setDetailUserId] = useState<number | null>(null)

  // 1. 初始化 useTable 核心数据流
  const { tableProps, refresh, selectedList } = useTable<User>({
    getData: getUsers,
    options: {
      rowSelection: { type: 'checkbox' },
      pagination: { pageSize: 5 }
    }
  })

  // 2. 单项删除操作
  const handleDeleteItem = async (id: number) => {
    setLoading(true)
    const res = await deleteUsers([id])
    setLoading(false)
    if (res.success) {
      message.success('删除成功')
      refresh()
    }
  }

  // 3. 批量删除操作
  const handleBatchDelete = () => {
    modal.confirm({
      title: '确认删除',
      content: `确定要批量删除选中的 ${selectedList.length} 个用户吗？`,
      onOk: async () => {
        setLoading(true)
        const ids = selectedList.map((item: User) => item.id)
        const res = await deleteUsers(ids)
        setLoading(false)
        if (res.success) {
          message.success('批量删除成功')
          refresh()
        }
      }
    })
  }

  // 4. 定义列
  const columns = useMemo(() => [
    { title: 'ID', dataIndex: 'id', key: 'id', width: 60 },
    { title: '姓名', dataIndex: 'name', key: 'name', width: 100 },
    { title: '年龄', dataIndex: 'age', key: 'age', width: 80 },
    { title: '个人简介', dataIndex: 'description', key: 'description' },
    {
      title: '操作',
      key: 'action',
      width: 180,
      render: (_: any, record: User) => (
        <Space size={0}>
          <Button
            type="link"
            onClick={() => setDetailUserId(record.id)}
            style={{ padding: '0 8px' }}
          >
            详情
          </Button>
          <Button
            type="link"
            onClick={() => setEditUser(record)}
            style={{ padding: '0 8px' }}
          >
            编辑
          </Button>
          <Button
            type="link"
            danger
            onClick={() => handleDeleteItem(record.id)}
            style={{ padding: '0 8px' }}
          >
            删除
          </Button>
        </Space>
      ),
    }
  ], [selectedList])

  const hasSelected = selectedList.length > 0

  return (
    <PlaygroundRoot>
      <div>
        <Text style={{ fontSize: 13, color: 'var(--ds-text-secondary)', display: 'block', marginBottom: 8 }}>
          <code>useTable</code> 整合了 <code>useFetch</code>、<code>usePagination</code>、<code>useRowSelection</code> 与 <code>useColumn</code>。
          它支持列表加载、翻页重载、条件过滤、单行/批量行选择等整套后台数据流水线。
        </Text>
      </div>

      <PlaygroundSection title="交互演示" titleEn="Interactive Demo">
        <PlaygroundHeader
          hint="交互范例 · 完美集成创建、编辑、详情、多选、删除操作，动作会执行列表重载及真实数据更新"
          trailing={
            <Text type="secondary" style={{ fontSize: 12 }}>
              已选中 {selectedList.length} 项
            </Text>
          }
        />
        <div style={{ marginTop: 16, marginBottom: 16 }}>
          <Card
            styles={{ body: { padding: 16 } }}
            style={{
              background: 'var(--ds-bg-card)',
              border: '1px solid var(--ds-border)',
              borderRadius: 8
            }}
          >
            <div style={{ marginBottom: 16 }}>
              <Space>
                <Button
                  type="primary"
                  onClick={() => setAddOpen(true)}
                  loading={loading}
                >
                  创建
                </Button>
                <Button
                  type="primary"
                  danger
                  disabled={!hasSelected}
                  onClick={handleBatchDelete}
                  loading={loading}
                >
                  批量删除
                </Button>
                <Button onClick={() => refresh()} loading={loading}>
                  刷新列表
                </Button>
              </Space>
            </div>
            <Table<User>
              columns={columns}
              {...tableProps}
              rowKey="id"
            />
          </Card>
        </div>
      </PlaygroundSection>

      <PlaygroundSection title="组件文件结构" titleEn="Component Directory Structure">
        <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 8 }}>
          将表格页面的各个模块<strong>按职责拆分到独立文件中</strong>进行封装，可维护性更高。以下是推荐的文件结构：
        </Text>
        <pre style={{
          background: 'var(--ds-bg-card)',
          padding: '12px 16px',
          borderRadius: 8,
          border: '1px solid var(--ds-border)',
          fontFamily: 'monospace',
          fontSize: 13,
          color: 'var(--ds-text)',
          lineHeight: '1.6',
          margin: 0
        }}>
{`UseTablePlayground/
├── api.ts          # 接口及数据模型层（负责数据的增删改查 API 模拟）
├── useColumn.tsx   # 列表列定义 Hook（抽离表格列配置及操作回调）
├── batchActions.tsx# 批量操作组件（处理表格上方的批量操作和刷新）
├── add.tsx         # 创建组件（新增数据弹窗/表单）
├── update.tsx      # 编辑组件（修改数据弹窗/表单）
├── detail.tsx      # 详情组件（查看单条数据详情弹窗）
└── view.tsx        # 主页面视图组件（入口视图，进行核心数据流整合与装配）`}
        </pre>
      </PlaygroundSection>

      <PlaygroundSection title="1. 接口文件" titleEn="api.ts">
        <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 8 }}>
          定义数据传输契约，直接以统一的 <code>Result</code> 格式作为返回值。
        </Text>
        <CodeBlock darkCode={apiCode} lightCode={apiCode} lang="typescript" />
      </PlaygroundSection>

      <PlaygroundSection title="2. 列表列配置文件" titleEn="useColumn.tsx">
        <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 8 }}>
          将表格的 columns 单独抽离成 Hook。在渲染每一行（例如详情、编辑、删除按钮）时，可通过依赖传入的回调来联动。
        </Text>
        <CodeBlock darkCode={useColumnCode} lightCode={useColumnCode} lang="tsx" />
      </PlaygroundSection>

      <PlaygroundSection title="3. 批量操作栏组件" titleEn="batchActions.tsx">
        <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 8 }}>
          批量操作、新建按钮等工具栏通常较为复杂，将其抽离并接收外部的 <code>selectedList</code>、<code>refresh</code> 方法和 <code>onCreate</code> 回调。
        </Text>
        <CodeBlock darkCode={batchActionsCode} lightCode={batchActionsCode} lang="tsx" />
      </PlaygroundSection>

      <PlaygroundSection title="4. 创建组件" titleEn="add.tsx">
        <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 8 }}>
          负责展示创建新用户的模态对话框，包含输入校验，并在成功后执行刷新。
        </Text>
        <CodeBlock darkCode={addCode} lightCode={addCode} lang="tsx" />
      </PlaygroundSection>

      <PlaygroundSection title="5. 编辑组件" titleEn="update.tsx">
        <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 8 }}>
          负责展示编辑已有用户的模态对话框，预填充被修改的数据，保存成功后刷新。
        </Text>
        <CodeBlock darkCode={updateCode} lightCode={updateCode} lang="tsx" />
      </PlaygroundSection>

      <PlaygroundSection title="6. 详情组件" titleEn="detail.tsx">
        <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 8 }}>
          负责展示单条数据的详细属性，采用只读形式显示。
        </Text>
        <CodeBlock darkCode={detailCode} lightCode={detailCode} lang="tsx" />
      </PlaygroundSection>

      <PlaygroundSection title="7. 主页面视图" titleEn="view.tsx">
        <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 8 }}>
          入口视图，用于将 `useTable` 的 `tableProps` 和上面定义的各个独立文件组装在一起，使代码极为紧凑、条理清晰。
        </Text>
        <CodeBlock darkCode={viewCode} lightCode={viewCode} lang="tsx" />
      </PlaygroundSection>

      {/* 交互用弹窗组件挂载 */}
      <AddModal
        open={addOpen}
        onCancel={() => setAddOpen(false)}
        onSuccess={() => {
          setAddOpen(false)
          refresh()
        }}
      />

      <EditModal
        open={!!editUser}
        user={editUser}
        onCancel={() => setEditUser(null)}
        onSuccess={() => {
          setEditUser(null)
          refresh()
        }}
      />

      <DetailModal
        open={detailUserId !== null}
        userId={detailUserId}
        onCancel={() => setDetailUserId(null)}
      />
    </PlaygroundRoot>
  )
}

