import { Link } from 'react-router'
import TokenDownload from './TokenDownload';

/* ───────── 间距刻度 ───────── */
const spacingTokens = [
  { token: '--space-1', cn: '微间距', value: 4, usage: '图标与文字间距、紧凑内联间距' },
  { token: '--space-2', cn: '小间距', value: 8, usage: '按钮内边距（上下）、小图标间距' },
  { token: '--space-3', cn: '中间距', value: 12, usage: '输入框内部 padding、标签间距' },
  { token: '--space-4', cn: '默认间距', value: 16, usage: '卡片内边距、表单元素间距' },
  { token: '--space-5', cn: '中大方距', value: 20, usage: '中等间距' },
  { token: '--space-6', cn: '区块间距', value: 24, usage: '区块间距、弹窗内边距' },
  { token: '--space-8', cn: '大方距', value: 32, usage: '大区块间距、页面水平边距' },
  { token: '--space-10', cn: '页顶边距', value: 40, usage: '页面顶部边距（标题区到内容区）' },
  { token: '--space-12', cn: '页侧边距', value: 48, usage: '页面两侧边距' },
];

/* ───────── 主模块 ───────── */
export default function SpacingSection() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-h1 mb-1" style={{ color: 'var(--ds-text-primary)' }}>间距与布局</h1>
        <p className="text-body" style={{ color: 'var(--ds-text-secondary)' }}>
          Spacing & Layout · 基于 4px 栅格系统的间距规范，以及全局布局结构的可交互演示
        </p>
      </div>

      <TokenDownload
        title="下载间距配置文件"
        subtitle="支持 JSON / CSS Variables / SCSS / LESS 四种格式"
        filePrefix="spacing-tokens"
        data={{
          '4px Grid': {
            'space-1': '4px',
            'space-2': '8px',
            'space-3': '12px',
            'space-4': '16px',
            'space-5': '20px',
            'space-6': '24px',
            'space-8': '32px',
            'space-10': '40px',
            'space-12': '48px',
            'space-16': '64px',
          },
          'Layout': {
            'layout-sidebar': '200px',
            'layout-sidebar-collapsed': '56px',
            'layout-header': '56px',
            'layout-content-gap': 0,
            'layout-page-padding': '48px',
          },
          'Components': {
            'modal-width-sm': '640px',
            'modal-width-lg': '900px',
            'card-gap': '16px',
            'card-padding': '16px',
            'button-height': '36px',
            'button-padding-x': '16px',
            'input-height': '36px',
            'input-padding-x': '12px',
            'tag-padding-x': '12px',
            'tag-padding-y': '4px',
          },
        }}
      />

      {/* ====== 布局结构演示范例 → 已迁移至组件规范 ====== */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-1 h-5 rounded-full" style={{ background: 'var(--ds-warning)' }} />
          <h2 className="text-h2" style={{ color: 'var(--ds-text-primary)' }}>布局结构演示范例</h2>
          <span className="text-caption" style={{ color: 'var(--ds-text-tertiary)' }}>Interactive Layout Demo</span>
        </div>
        <Link
          to="/components/menu"
          className="rounded-lg p-5 flex items-center gap-4 transition-all duration-150 block hover:no-underline"
          style={{
            background: 'var(--ds-bg-card)',
            border: '1px solid var(--ds-border)',
            cursor: 'pointer',
            textDecoration: 'none',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--ds-primary)'
            e.currentTarget.style.background = 'var(--ds-primary-subtle)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--ds-border)'
            e.currentTarget.style.background = 'var(--ds-bg-card)'
          }}
        >
          <div
            className="rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ width: 48, height: 48, background: 'var(--ds-primary-subtle)' }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="var(--ds-primary)" strokeWidth="1.5" />
              <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="var(--ds-primary)" strokeWidth="1.5" />
              <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="var(--ds-primary)" strokeWidth="1.5" />
              <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="var(--ds-primary)" strokeWidth="1.5" />
            </svg>
          </div>
          <div className="flex-1">
            <div className="text-body font-medium" style={{ color: 'var(--ds-text-primary)' }}>
              查看完整布局演示 →
            </div>
            <div className="text-caption mt-1" style={{ color: 'var(--ds-text-secondary)' }}>
              布局结构演示范例已迁移至 <strong style={{ color: 'var(--ds-primary)' }}>组件规范 → 导航菜单</strong>，使用真实的 DataPlatformLayout + SidebarMenu 组件，
              支持侧边栏展开/折叠、多级菜单激活追踪、暗/亮主题切换、完整生产级 Header 工具栏。
            </div>
          </div>
        </Link>
      </section>

      {/* ====== 布局尺寸速查 ====== */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-1 h-5 rounded-full" style={{ background: 'var(--ds-primary)' }} />
          <h2 className="text-h2" style={{ color: 'var(--ds-text-primary)' }}>布局尺寸速查</h2>
          <span className="text-caption" style={{ color: 'var(--ds-text-tertiary)' }}>Layout Dimensions</span>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {[
            { cn: '侧边栏（展开）', en: 'Sidebar Expanded', value: '200px', desc: '显示图标+文字' },
            { cn: '侧边栏（折叠）', en: 'Sidebar Collapsed', value: '56px', desc: '仅显示图标' },
            { cn: '顶部导航栏', en: 'Header Height', value: '56px', desc: 'Logo + 面包屑 + 用户区' },
            { cn: '面包屑区域', en: 'Breadcrumb Area', value: '40px', desc: '路径导航' },
            { cn: '内容区水平内边距', en: 'Content Padding X', value: '32px', desc: '页面左右留白' },
            { cn: '内容区垂直内边距', en: 'Content Padding Y', value: '24px', desc: '页面上下留白' },
            { cn: '卡片间距', en: 'Card Gap', value: '16px', desc: '卡片之间的间隙' },
            { cn: '表格行高', en: 'Table Row Height', value: '52px', desc: '表格内容行' },
          ].map((item) => (
            <div key={item.cn} className="rounded-lg p-4" style={{ background: 'var(--ds-bg-card)', border: '1px solid var(--ds-border)' }}>
              <div className="text-caption mb-1" style={{ color: 'var(--ds-text-tertiary)' }}>{item.en}</div>
              <div className="text-h2 mb-1" style={{ color: 'var(--ds-text-primary)', fontSize: 22 }}>{item.value}</div>
              <div className="text-small" style={{ color: 'var(--ds-text-secondary)' }}>{item.cn}</div>
              <div className="text-caption mt-1" style={{ color: 'var(--ds-text-tertiary)' }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ====== 间距刻度 ====== */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-1 h-5 rounded-full" style={{ background: 'var(--ds-success)' }} />
          <h2 className="text-h2" style={{ color: 'var(--ds-text-primary)' }}>间距刻度</h2>
          <span className="text-caption" style={{ color: 'var(--ds-text-tertiary)' }}>Spacing Scale · 4px 栅格系统</span>
        </div>
        <div className="rounded-lg overflow-hidden" style={{ background: 'var(--ds-bg-card)', border: '1px solid var(--ds-border)' }}>
          <div className="grid grid-cols-7 gap-0 px-5 py-2 text-caption font-medium" style={{ color: 'var(--ds-text-tertiary)', borderBottom: '1px solid var(--ds-divider)', background: 'var(--ds-bg-elevated)' }}>
            <div>Token 名称</div>
            <div>中文名</div>
            <div className="text-right">数值</div>
            <div className="col-span-2">可视化</div>
            <div className="col-span-2">用途说明</div>
          </div>
          {spacingTokens.map((item) => (
            <div key={item.token} className="grid grid-cols-7 gap-0 px-5 py-2.5 items-center transition-colors duration-100 hover:bg-white/[0.02]" style={{ borderBottom: '1px solid var(--ds-divider)' }}>
              <div className="text-caption font-mono" style={{ color: 'var(--ds-text-secondary)' }}>{item.token}</div>
              <div className="text-small" style={{ color: 'var(--ds-text-primary)' }}>{item.cn}</div>
              <div className="text-body font-medium text-right" style={{ color: 'var(--ds-text-primary)' }}>{item.value}px</div>
              <div className="col-span-2 px-2">
                <div className="h-3 rounded-full" style={{ width: Math.max(item.value * 3, 4), background: 'var(--ds-primary)', opacity: 0.6 }} />
              </div>
              <div className="col-span-2 text-caption" style={{ color: 'var(--ds-text-secondary)' }}>{item.usage}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ====== 组件间距 ====== */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-1 h-5 rounded-full" style={{ background: 'var(--ds-warning)' }} />
          <h2 className="text-h2" style={{ color: 'var(--ds-text-primary)' }}>组件间距</h2>
          <span className="text-caption" style={{ color: 'var(--ds-text-tertiary)' }}>Component Spacing</span>
        </div>
        <div className="rounded-lg overflow-hidden" style={{ background: 'var(--ds-bg-card)', border: '1px solid var(--ds-border)' }}>
          {[
            { cn: '卡片（Card）', en: 'Card', padding: '16px–20px', margin: '16px（卡片间距）', example: 'card' },
            { cn: '按钮 - 默认', en: 'Button Default', padding: '8px 16px', margin: '8px（按钮间距）', example: 'btn-md' },
            { cn: '按钮 - 紧凑', en: 'Button Small', padding: '6px 12px', margin: '4px', example: 'btn-sm' },
            { cn: '输入框', en: 'Input', padding: '10px 12px', margin: '12px（与标签间距）', example: 'input' },
            { cn: '表格行', en: 'Table Row', padding: '12px 16px', margin: '0', example: 'table-row' },
            { cn: '弹窗', en: 'Modal', padding: '24px', margin: '—', example: 'modal' },
            { cn: '标签/Tag', en: 'Tag', padding: '4px 12px', margin: '8px', example: 'tag' },
            { cn: '统计卡片', en: 'Stats Card', padding: '20px', margin: '16px', example: 'stats' },
          ].map((item, idx) => (
            <div key={item.cn} className="flex items-center gap-4 px-5 py-3 transition-colors duration-100 hover:bg-white/[0.02]" style={{ borderBottom: idx < 7 ? '1px solid var(--ds-divider)' : 'none' }}>
              <div className="w-32 flex-shrink-0">
                <div className="text-body" style={{ color: 'var(--ds-text-primary)' }}>{item.cn}</div>
                <div className="text-caption" style={{ color: 'var(--ds-text-tertiary)' }}>{item.en}</div>
              </div>
              {/* Visual example */}
              <div className="w-24 flex-shrink-0 flex items-center justify-center">
                {item.example === 'card' && <div className="rounded" style={{ width: 48, height: 32, background: 'var(--ds-bg-elevated)', border: '1px solid var(--ds-border)' }} />}
                {item.example === 'btn-md' && <div className="rounded px-2 py-0.5 text-caption" style={{ background: '#5264E0', color: '#fff', fontSize: 10 }}>按钮</div>}
                {item.example === 'btn-sm' && <div className="rounded px-1.5 py-0.5 text-caption" style={{ background: '#5264E0', color: '#fff', fontSize: 9 }}>按钮</div>}
                {item.example === 'input' && <div className="rounded w-16 h-4" style={{ background: 'var(--ds-bg-input)', border: '1px solid var(--ds-border)' }} />}
                {item.example === 'table-row' && <div className="w-20 h-4 flex items-center px-1" style={{ borderBottom: '1px solid var(--ds-divider)' }}><div className="w-full h-0.5 rounded" style={{ background: 'var(--ds-text-tertiary)' }} /></div>}
                {item.example === 'modal' && <div className="rounded w-12 h-8" style={{ background: 'var(--ds-bg-card)', border: '1px solid var(--ds-border)' }} />}
                {item.example === 'tag' && <div className="rounded px-1.5 py-0.5 text-caption" style={{ background: 'rgba(82,100,224,0.12)', color: '#5264E0', fontSize: 9 }}>标签</div>}
                {item.example === 'stats' && <div className="rounded w-14 h-8" style={{ background: 'linear-gradient(135deg, #222640, #2a3050)' }} />}
              </div>
              <div className="flex-1 text-caption" style={{ color: 'var(--ds-text-secondary)' }}>
                内边距 <strong style={{ color: 'var(--ds-text-primary)' }}>{item.padding}</strong>
                {' · '}
                外边距 <strong style={{ color: 'var(--ds-text-primary)' }}>{item.margin}</strong>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
