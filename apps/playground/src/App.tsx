import React, { useState } from 'react';
import { Button, Switch, Space, Panel, Input, StatCard, CardPro } from '@insightst-design/ui';
import {
  FileTextOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
} from '@insightst-design/icons';
import {
  ThemeProvider,
  type ThemeMode,
} from '@insightst-design/theme';
import '@insightst-design/theme/tokens.css';

const statCards = [
  { label: '模型总数', value: '128', icon: <FileTextOutlined />, tone: 'primary' as const },
  { label: '已部署', value: '96', icon: <CheckCircleOutlined />, tone: 'success' as const },
  { label: '运行中任务', value: '23', icon: <ClockCircleOutlined />, tone: 'warning' as const },
  {
    label: '异常告警',
    value: '3',
    icon: <ExclamationCircleOutlined />,
    tone: 'danger' as const,
    valueColor: 'var(--ds-danger)',
  },
];

function App() {
  const [mode, setMode] = useState<ThemeMode>('dark');


  return (
    <ThemeProvider mode={mode}>
      <div style={{ padding: 40, minHeight: '100vh' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 24,
          }}
        >
          <h1 style={{ margin: 0 }}>Insightst Design Playground</h1>
          <Space>
            <span>浅色</span>
            <Switch
              checked={mode === 'dark'}
              onChange={(checked) => setMode(checked ? 'dark' : 'light')}
            />
            <span>深色</span>
          </Space>
        </div>

        <div style={{ display: 'grid', gap: 24 }}>
        <CardPro
          variant="entity"
          title="通义千问3-VL-8B-Instruct"
          domain="通用领域"
          status={{ label: '已上线', tone: 'success' }}
          stats={[
            { label: '概念', value: 63 },
            { label: '关系', value: 63 },
            { label: '版本', value: 63 },
          ]}
          meta={{ creator: '创建者ID', time: '14 小时前' }}
          onEdit={() => {}}
          onDelete={() => {}}
        />
          <Panel title="StatCard · 统计数字卡片">
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: 16,
                padding: 16,
              }}
            >
              {statCards.map((card) => (
                <StatCard key={card.label} {...card} />
              ))}
            </div>
          </Panel>

          <Panel title="Default Panel">
            <p style={{ padding: 16 }}>
              This is a custom Panel component matching the deepinsight design.
            </p>
            <Space style={{ padding: '0 16px 16px' }}>
              <Button type="primary">Click me</Button>
              <Input placeholder="Input" style={{ width: 200 }} />
            </Space>
          </Panel>

          <Panel title="Fullscreen Panel" fullscreen>
            <p style={{ padding: 16 }}>
              This Panel has fullscreen capability. Click the expand button on
              the right to try it.
            </p>
          </Panel>

        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
