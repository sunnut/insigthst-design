import { useState } from 'react';
import { Copy, Check, Layers } from 'lucide-react';
import TokenDownload from './TokenDownload';
import { useTheme } from '../theme';
import CodeBlock from './CodeBlock';

interface ShadowToken {
  name: string;
  nameEn: string;
  level: string;
  shadowDark: string;
  shadowLight: string;
  usage: string;
  usageEn: string;
  example: string;
}

const shadowTokens: ShadowToken[] = [
  {
    name: '底层', nameEn: 'Base', level: 'z-0',
    shadowDark: 'none', shadowLight: 'none',
    usage: '普通文本、分割线', usageEn: 'Text, Divider',
    example: '页面底色上的静态文本',
  },
  {
    name: '卡片默认', nameEn: 'Card Default', level: 'z-1',
    shadowDark: '0 1px 2px rgba(0,0,0,0.30)', shadowLight: '0 1px 2px rgba(0,0,0,0.06)',
    usage: '卡片默认态、按钮默认态', usageEn: 'Card, Button default',
    example: '信息展示卡片',
  },
  {
    name: '卡片悬停', nameEn: 'Card Hover', level: 'z-2',
    shadowDark: '0 2px 12px rgba(0,0,0,0.35)', shadowLight: '0 2px 8px rgba(0,0,0,0.08)',
    usage: '卡片悬停、按钮悬停', usageEn: 'Card/Button hover',
    example: '鼠标悬停时的卡片',
  },
  {
    name: '下拉浮层', nameEn: 'Dropdown', level: 'z-4',
    shadowDark: '0 4px 20px rgba(0,0,0,0.40)', shadowLight: '0 4px 16px rgba(0,0,0,0.10)',
    usage: '下拉菜单、日期面板、气泡提示', usageEn: 'Dropdown, DatePicker, Tooltip',
    example: '自定义选择器展开面板',
  },
  {
    name: '弹窗/抽屉', nameEn: 'Modal / Drawer', level: 'z-8',
    shadowDark: '0 8px 40px rgba(0,0,0,0.50)', shadowLight: '0 8px 32px rgba(0,0,0,0.12)',
    usage: '弹窗、侧边抽屉、确认框', usageEn: 'Modal, Drawer, Confirm',
    example: '新增节点弹窗',
  },
  {
    name: '悬浮通知', nameEn: 'Toast / FAB', level: 'z-16',
    shadowDark: '0 16px 56px rgba(0,0,0,0.55)', shadowLight: '0 16px 48px rgba(0,0,0,0.15)',
    usage: '全局通知、悬浮操作按钮', usageEn: 'Toast, FAB',
    example: '成功/错误通知消息',
  },
];

export default function ShadowPlayground() {
  const { mode } = useTheme();
  const isDark = mode === 'dark';
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedToken(text);
    setTimeout(() => setCopiedToken(null), 1200);
  };

  return (
    <div className="space-y-8">
      <div className="text-caption" style={{ color: 'var(--ds-text-tertiary)' }}>
        交互范例 · 鼠标悬停卡片查看投影效果 Hover cards to see shadow effect
      </div>

      <TokenDownload
        title="下载投影配置文件"
        subtitle="支持 JSON / CSS Variables / SCSS / LESS 四种格式"
        filePrefix="shadow-tokens"
        data={{
          'Light Theme': {
            'shadow-z0': 'none',
            'shadow-z1': '0 1px 2px rgba(0,0,0,0.06)',
            'shadow-z2': '0 2px 8px rgba(0,0,0,0.08)',
            'shadow-z4': '0 4px 16px rgba(0,0,0,0.10)',
            'shadow-z8': '0 8px 32px rgba(0,0,0,0.12)',
            'shadow-z16': '0 16px 48px rgba(0,0,0,0.15)',
          },
          'Dark Theme': {
            'shadow-dark-z0': 'none',
            'shadow-dark-z1': '0 1px 2px rgba(0,0,0,0.30)',
            'shadow-dark-z2': '0 2px 12px rgba(0,0,0,0.35)',
            'shadow-dark-z4': '0 4px 20px rgba(0,0,0,0.40)',
            'shadow-dark-z8': '0 8px 40px rgba(0,0,0,0.50)',
            'shadow-dark-z16': '0 16px 56px rgba(0,0,0,0.55)',
          },
        }}
      />

      {/* 投影层级对比展示 */}
      <div className="grid grid-cols-3 gap-4">
        {shadowTokens.map((token, idx) => {
          const isHovered = hoveredIdx === idx;
          const shadow = isDark ? token.shadowDark : token.shadowLight;

          return (
            <button
              key={token.level}
              className="rounded-lg p-5 text-left transition-all duration-200"
              style={{
                background: 'var(--ds-bg-card)',
                border: `1px solid ${isHovered ? 'var(--ds-primary)' : 'var(--ds-border)'}`,
                boxShadow: isHovered ? shadow : 'none',
                transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
                cursor: 'pointer',
              }}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              onClick={() => handleCopy(shadow)}
            >
              {/* 层级标签 */}
              <div className="flex items-center gap-2 mb-3">
                <span className="text-caption font-mono font-medium px-2 py-0.5 rounded" style={{ background: 'var(--ds-primary-subtle)', color: 'var(--ds-primary)' }}>
                  {token.level}
                </span>
                <span className="text-body font-medium" style={{ color: 'var(--ds-text-primary)' }}>{token.name}</span>
                <span className="text-caption" style={{ color: 'var(--ds-text-tertiary)' }}>{token.nameEn}</span>
              </div>

              {/* 投影值 */}
              <div className="rounded-md px-3 py-2 mb-3 flex items-center justify-between" style={{ background: 'var(--ds-bg-elevated)', border: '1px solid var(--ds-border)' }}>
                <code className="text-caption font-mono" style={{ color: 'var(--ds-text-secondary)' }}>{shadow}</code>
                {copiedToken === shadow ? (
                  <Check size={14} style={{ color: '#43CB89', flexShrink: 0 }} />
                ) : (
                  <Copy size={14} className="opacity-0 group-hover:opacity-50" style={{ color: 'var(--ds-text-tertiary)', flexShrink: 0 }} />
                )}
              </div>

              {/* 使用场景 */}
              <div className="text-caption" style={{ color: 'var(--ds-text-tertiary)' }}>
                <Layers size={12} className="inline mr-1" />
                {token.usage} · {token.usageEn}
              </div>
              <div className="text-caption mt-1" style={{ color: 'var(--ds-text-secondary)' }}>
                例：{token.example}
              </div>
            </button>
          );
        })}
      </div>

      {/* 动态对比演示 */}
      <div>
        <div className="text-caption mb-3" style={{ color: 'var(--ds-text-tertiary)' }}>
          动态对比 · 同一元素在不同层级下的投影差异
        </div>
        <div className="rounded-lg p-6" style={{ background: 'var(--ds-bg-elevated)', border: '1px solid var(--ds-border)' }}>
          <div className="flex items-end gap-6 justify-center" style={{ minHeight: 140 }}>
            {[0, 1, 2, 4, 8, 16].map((z, i) => {
              const token = shadowTokens[i];
              const shadow = isDark ? token.shadowDark : token.shadowLight;
              return (
                <div key={z} className="flex flex-col items-center gap-2">
                  <div
                    className="rounded-lg flex items-center justify-center transition-all duration-300"
                    style={{
                      width: 80, height: 80,
                      background: 'var(--ds-bg-card)',
                      border: '1px solid var(--ds-border)',
                      boxShadow: shadow === 'none' ? 'none' : shadow,
                    }}
                  >
                    <span className="text-caption font-mono" style={{ color: 'var(--ds-text-tertiary)' }}>z-{z}</span>
                  </div>
                  <span className="text-caption" style={{ color: 'var(--ds-text-tertiary)' }}>{token.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 亮色/暗色对比表 */}
      <div>
        <div className="text-caption mb-3" style={{ color: 'var(--ds-text-tertiary)' }}>
          双主题对比表 · Light / Dark Theme Comparison
        </div>
        <div className="rounded-lg overflow-hidden" style={{ background: 'var(--ds-bg-card)', border: '1px solid var(--ds-border)' }}>
          {/* 表头 */}
          <div className="grid grid-cols-5 gap-4 px-4 py-3" style={{ borderBottom: '1px solid var(--ds-divider)', background: 'var(--ds-bg-elevated)' }}>
            <span className="text-caption font-medium" style={{ color: 'var(--ds-text-tertiary)' }}>层级 Level</span>
            <span className="text-caption font-medium" style={{ color: 'var(--ds-text-tertiary)' }}>暗色投影 Dark</span>
            <span className="text-caption font-medium" style={{ color: 'var(--ds-text-tertiary)' }}>亮色投影 Light</span>
            <span className="text-caption font-medium" style={{ color: 'var(--ds-text-tertiary)' }}>用途 Usage</span>
            <span className="text-caption font-medium" style={{ color: 'var(--ds-text-tertiary)' }}>操作</span>
          </div>
          {/* 数据行 */}
          {shadowTokens.map((token) => (
            <div key={token.level} className="grid grid-cols-5 gap-4 px-4 py-3 items-center transition-colors duration-100 hover:bg-white/[0.02]" style={{ borderBottom: '1px solid var(--ds-divider)' }}>
              <div className="flex items-center gap-2">
                <span className="text-caption font-mono font-medium px-1.5 py-0.5 rounded" style={{ background: 'var(--ds-primary-subtle)', color: 'var(--ds-primary)' }}>{token.level}</span>
                <span className="text-body" style={{ color: 'var(--ds-text-primary)' }}>{token.name}</span>
              </div>
              <code className="text-caption font-mono truncate" style={{ color: 'var(--ds-text-secondary)' }}>{token.shadowDark}</code>
              <code className="text-caption font-mono truncate" style={{ color: 'var(--ds-text-secondary)' }}>{token.shadowLight}</code>
              <span className="text-caption" style={{ color: 'var(--ds-text-tertiary)' }}>{token.usage}</span>
              <div className="flex gap-2">
                <button onClick={() => handleCopy(token.shadowDark)} className="px-2 py-1 rounded text-caption transition-all duration-150" style={{ background: 'var(--ds-bg-elevated)', color: 'var(--ds-text-secondary)', border: '1px solid var(--ds-border)' }}>
                  {copiedToken === token.shadowDark ? '已复制' : '暗'}
                </button>
                <button onClick={() => handleCopy(token.shadowLight)} className="px-2 py-1 rounded text-caption transition-all duration-150" style={{ background: 'var(--ds-bg-elevated)', color: 'var(--ds-text-secondary)', border: '1px solid var(--ds-border)' }}>
                  {copiedToken === token.shadowLight ? '已复制' : '亮'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <CodeBlock
        darkCode={`// 投影系统 (Shadow) · 暗色主题
const shadows = {
  z0:  'none',                                     // 底层
  z1:  '0 1px 2px rgba(0,0,0,0.30)',             // 卡片默认
  z2:  '0 2px 12px rgba(0,0,0,0.35)',            // 卡片悬停
  z4:  '0 4px 20px rgba(0,0,0,0.40)',            // 下拉浮层
  z8:  '0 8px 40px rgba(0,0,0,0.50)',            // 弹窗/抽屉
  z16: '0 16px 56px rgba(0,0,0,0.55)',           // 悬浮通知
};

// 使用示例
<div style={{
  background: '#222427',
  borderRadius: 8,
  boxShadow: shadows.z2,  // 卡片悬停投影
}}>卡片内容</div>`}
        lightCode={`// 投影系统 (Shadow) · 亮色主题
const shadows = {
  z0:  'none',                                     // 底层
  z1:  '0 1px 2px rgba(0,0,0,0.06)',             // 卡片默认
  z2:  '0 2px 8px rgba(0,0,0,0.08)',             // 卡片悬停
  z4:  '0 4px 16px rgba(0,0,0,0.10)',            // 下拉浮层
  z8:  '0 8px 32px rgba(0,0,0,0.12)',            // 弹窗/抽屉
  z16: '0 16px 48px rgba(0,0,0,0.15)',           // 悬浮通知
};

// 使用示例
<div style={{
  background: '#ffffff',
  borderRadius: 8,
  boxShadow: shadows.z2,  // 卡片悬停投影
}}>卡片内容</div>`}
      />
    </div>
  );
}
