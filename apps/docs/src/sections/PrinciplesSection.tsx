import { useState } from 'react';
import {
  Eye, MousePointer, Zap, Layers,
  AlertCircle, Layout, Move
} from 'lucide-react';

/* ═══════════════════════════════════════════
   设计价值观
═══════════════════════════════════════════ */
const coreValues = [
  {
    icon: <Eye size={24} />,
    cn: '自然',
    en: 'Natural',
    desc: '降低认知负荷，遵循视觉感知定律（邻近性、对齐、对比、连续性）。交互直觉化，减少额外用户操作。',
    descEn: 'Reduce cognitive load. Follow visual perception laws. Keep interactions intuitive.',
    application: '通过步骤条将复杂流程拆解为可理解的阶段；卡片式信息组织降低认知负荷',
  },
  {
    icon: <Layers size={24} />,
    cn: '确定',
    en: 'Certain',
    desc: '确保跨产品和终端的一致性。使用模块化、可复用的模式。保持熟悉的外观和交互以降低学习成本。',
    descEn: 'Ensure consistency across products. Use modular, reusable patterns. Maintain familiar interactions.',
    application: '全局一致的深色主题，状态色（成功/警告/危险）在所有页面保持统一语义',
  },
  {
    icon: <Zap size={24} />,
    cn: '有意义',
    en: 'Meaningful',
    desc: '为每个操作提供即时、清晰的反馈。帮助用户专注任务不被干扰。避免不必要的元素。',
    descEn: 'Provide immediate, clear feedback for every action. Help users focus. Avoid unnecessary elements.',
    application: '每个操作都有即时反馈：进度条、状态标签、Toast 提示；无感知保存减少用户焦虑',
  },
  {
    icon: <Move size={24} />,
    cn: '生长',
    en: 'Growing',
    desc: '为可扩展性而设计。从一开始就考虑未来功能、无障碍改进和多设备扩展。',
    descEn: 'Design for scalability. Consider future features, a11y improvements, multi-device expansion.',
    application: '模块化的弹窗体系支持功能渐进扩展；本体版本管理天然支持协作演进',
  },
];

/* ═══════════════════════════════════════════
   交互原则
═══════════════════════════════════════════ */
const interactionPrinciples = [
  {
    cn: '直接操作',
    en: 'Make it direct',
    icon: <MousePointer size={18} />,
    desc: '优先使用上下文内编辑而非单独页面。有输出的地方，就应该有输入。',
    example: '文献列表内直接预览，无需跳转新页面',
  },
  {
    cn: '留在页面',
    en: 'Stay on the page',
    icon: <Layout size={18} />,
    desc: '尽可能避免整页刷新来解决问题。不要打断用户的心流。',
    example: '弹窗内完成任务，表格数据局部刷新',
  },
  {
    cn: '保持轻量',
    en: 'Keep it lightweight',
    icon: <Zap size={18} />,
    desc: '将工具放在上下文中（菲茨定律）。减少到达目标操作的距离。',
    example: '行内操作按钮，悬停显示快捷操作',
  },
  {
    cn: '提供邀请',
    en: 'Provide an invitation',
    icon: <Eye size={18} />,
    desc: '使用视觉 affordance 和即时线索来引导发现丰富的交互（拖拽、行内编辑）。',
    example: '虚线边框暗示可拖拽上传，下划线暗示可编辑',
  },
  {
    cn: '使用过渡',
    en: 'Use transition',
    icon: <Move size={18} />,
    desc: '平滑地动画化状态变化。动效应具有信息性、聚焦性、高性能（微交互 < 300ms）。',
    example: '弹窗淡入淡出，步骤条滑动切换，Toast 滑入滑出',
  },
  {
    cn: '即时响应',
    en: 'React immediately',
    icon: <AlertCircle size={18} />,
    desc: '每个用户操作都需要即时反馈。按钮按下、字段显示输入、错误精确定位问题。',
    example: '按钮按下态 scale(0.97)，输入框即时聚焦环，表单即时校验',
  },
];

/* ═══════════════════════════════════════════
   视觉感知定律
═══════════════════════════════════════════ */
const perceptionLaws = [
  {
    cn: '邻近性',
    en: 'Proximity',
    desc: '相近的元素被感知为一组。用留白来分隔不同的功能单元。',
    example: '表单标签必须比与其他字段更靠近其输入框',
    demo: (
      <div className="space-y-3">
        <div className="flex gap-6">
          <div className="flex flex-col items-center gap-1">
            <div className="w-6 h-6 rounded" style={{ background: '#5264E0' }} />
            <div className="w-6 h-6 rounded" style={{ background: '#5264E0' }} />
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-6 h-6 rounded" style={{ background: '#43CB89' }} />
            <div className="w-6 h-6 rounded" style={{ background: '#43CB89' }} />
          </div>
        </div>
        <div className="text-caption" style={{ color: 'var(--ds-text-tertiary)' }}>间距相近 → 被感知为一组</div>
      </div>
    ),
  },
  {
    cn: '对齐',
    en: 'Alignment',
    desc: '将元素对齐到共同的边缘。左对齐最适合阅读流；右对齐适合数值数据。',
    example: '表格列对齐，表单左对齐标签',
    demo: (
      <div className="space-y-1.5">
        <div className="flex items-center gap-2"><div className="w-16 text-right text-caption" style={{ color: 'var(--ds-text-tertiary)' }}>名称</div><div className="h-3 rounded flex-1" style={{ background: '#5264E0', opacity: 0.4 }} /></div>
        <div className="flex items-center gap-2"><div className="w-16 text-right text-caption" style={{ color: 'var(--ds-text-tertiary)' }}>状态</div><div className="h-3 rounded flex-1" style={{ background: '#43CB89', opacity: 0.4 }} /></div>
        <div className="flex items-center gap-2"><div className="w-16 text-right text-caption" style={{ color: 'var(--ds-text-tertiary)' }}>时间</div><div className="h-3 rounded flex-1" style={{ background: '#FFA564', opacity: 0.4 }} /></div>
      </div>
    ),
  },
  {
    cn: '对比',
    en: 'Contrast',
    desc: '使用对比来强调和建立层次，而非装饰。主要操作应与背景形成最强对比。',
    example: '主按钮用品牌色，次要操作用灰色，文字对比度满足 WCAG 4.5:1',
    demo: (
      <div className="flex items-center gap-3">
        <div className="px-3 py-1.5 rounded text-caption font-medium" style={{ background: '#5264E0', color: '#fff' }}>主要操作</div>
        <div className="px-3 py-1.5 rounded text-caption" style={{ background: 'transparent', border: '1px solid #3a3f4d', color: '#8a8f99' }}>次要操作</div>
        <div className="px-3 py-1.5 rounded text-caption" style={{ color: '#5a5e68' }}>文字链接</div>
      </div>
    ),
  },
  {
    cn: '连续性',
    en: 'Continuity',
    desc: '用户将对齐的元素感知为相关的。在表格和表单中使用一致的列对齐来减少扫描成本。',
    example: '步骤条的连线表示流程连续性，面包屑显示层级路径',
    demo: (
      <div className="flex items-center gap-0">
        <div className="w-6 h-6 rounded-full flex items-center justify-center text-caption" style={{ background: '#5264E0', color: '#fff', fontSize: 10 }}>1</div>
        <div className="w-8 h-0.5" style={{ background: '#5264E0' }} />
        <div className="w-6 h-6 rounded-full flex items-center justify-center text-caption" style={{ background: '#5264E0', color: '#fff', fontSize: 10 }}>2</div>
        <div className="w-8 h-0.5" style={{ background: '#5264E0' }} />
        <div className="w-6 h-6 rounded-full flex items-center justify-center text-caption" style={{ background: '#2a2d35', border: '2px solid #3a3f4d', color: '#5a5e68', fontSize: 10 }}>3</div>
      </div>
    ),
  },
];

/* ═══════════════════════════════════════════
   反馈模式
═══════════════════════════════════════════ */
const feedbackPatterns = [
  { cn: '轻量操作', en: 'Low', example: '开关切换、关闭标签', pattern: '即时生效，无需确认，提供撤销', color: '#43CB89' },
  { cn: '中等操作', en: 'Medium', example: '删除单项、发送任务', pattern: '行内确认或二次提示', color: '#FFA564' },
  { cn: '高危操作', en: 'High', example: '删除本体、批量删除', pattern: '弹窗要求显式文字确认', color: '#FF6464' },
];

/* ═══════════════════════════════════════════
   主模块
═══════════════════════════════════════════ */
export default function PrinciplesSection() {
  const [activeTab, setActiveTab] = useState<'values' | 'interaction' | 'perception' | 'feedback'>('values');

  const tabs = [
    { id: 'values' as const, label: '设计价值观', en: 'Core Values', icon: <Layers size={16} /> },
    { id: 'interaction' as const, label: '交互原则', en: 'Interaction', icon: <MousePointer size={16} /> },
    { id: 'perception' as const, label: '视觉感知定律', en: 'Perception Laws', icon: <Eye size={16} /> },
    { id: 'feedback' as const, label: '反馈模式', en: 'Feedback', icon: <AlertCircle size={16} /> },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-h1 mb-1" style={{ color: 'var(--ds-text-primary)' }}>设计原则</h1>
        <p className="text-body" style={{ color: 'var(--ds-text-secondary)' }}>
          UX Design Principles · 基于 Modern UX 框架，指导产品设计的核心准则
        </p>
      </div>

      {/* Tab 导航 */}
      <div className="flex gap-1 p-1 rounded-lg" style={{ background: 'var(--ds-bg-card)', border: '1px solid var(--ds-border)' }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-md transition-all duration-150"
            style={{
              background: activeTab === tab.id ? 'rgba(82,100,224,0.12)' : 'transparent',
              color: activeTab === tab.id ? '#5264E0' : 'var(--ds-text-secondary)',
            }}
          >
            {tab.icon}
            <span className="text-body font-medium">{tab.label}</span>
            <span className="text-caption hidden sm:inline" style={{ opacity: 0.6 }}>{tab.en}</span>
          </button>
        ))}
      </div>

      {/* 内容区域 */}
      <div className="animate-fadeIn">
        {/* ====== 设计价值观 ====== */}
        {activeTab === 'values' && (
          <div className="grid grid-cols-2 gap-4">
            {coreValues.map((v) => (
              <div key={v.cn} className="rounded-lg p-5" style={{ background: 'var(--ds-bg-card)', border: '1px solid var(--ds-border)' }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center justify-center rounded-lg" style={{ width: 40, height: 40, background: 'rgba(82,100,224,0.12)', color: '#5264E0' }}>
                    {v.icon}
                  </div>
                  <div>
                    <div className="text-h3" style={{ color: 'var(--ds-text-primary)' }}>{v.cn}</div>
                    <div className="text-caption" style={{ color: 'var(--ds-text-tertiary)' }}>{v.en}</div>
                  </div>
                </div>
                <p className="text-body mb-2" style={{ color: 'var(--ds-text-secondary)' }}>{v.desc}</p>
                <p className="text-caption" style={{ color: 'var(--ds-text-tertiary)' }}>{v.descEn}</p>
                <div className="mt-3 p-2.5 rounded" style={{ background: 'var(--ds-bg-elevated)' }}>
                  <div className="text-caption mb-1" style={{ color: 'var(--ds-text-tertiary)' }}>在本产品中的应用</div>
                  <div className="text-small" style={{ color: 'var(--ds-text-secondary)' }}>{v.application}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ====== 交互原则 ====== */}
        {activeTab === 'interaction' && (
          <div className="space-y-3">
            {interactionPrinciples.map((p, i) => (
              <div key={p.cn} className="flex items-start gap-4 rounded-lg p-4" style={{ background: 'var(--ds-bg-card)', border: '1px solid var(--ds-border)' }}>
                <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-caption font-medium" style={{ background: 'rgba(82,100,224,0.12)', color: '#5264E0' }}>
                  {i + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span style={{ color: '#5264E0' }}>{p.icon}</span>
                    <span className="text-h3" style={{ color: 'var(--ds-text-primary)' }}>{p.cn}</span>
                    <span className="text-caption" style={{ color: 'var(--ds-text-tertiary)' }}>{p.en}</span>
                  </div>
                  <p className="text-body mb-2" style={{ color: 'var(--ds-text-secondary)' }}>{p.desc}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-caption" style={{ color: 'var(--ds-text-tertiary)' }}>应用示例：</span>
                    <span className="text-small px-2 py-0.5 rounded" style={{ background: 'var(--ds-bg-elevated)', color: 'var(--ds-text-primary)' }}>{p.example}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ====== 视觉感知定律 ====== */}
        {activeTab === 'perception' && (
          <div className="grid grid-cols-2 gap-4">
            {perceptionLaws.map((law) => (
              <div key={law.cn} className="rounded-lg p-5" style={{ background: 'var(--ds-bg-card)', border: '1px solid var(--ds-border)' }}>
                <div className="mb-3">
                  <div className="text-h3 mb-1" style={{ color: 'var(--ds-text-primary)' }}>{law.cn} <span className="text-caption" style={{ color: 'var(--ds-text-tertiary)', fontWeight: 400 }}>{law.en}</span></div>
                  <p className="text-body" style={{ color: 'var(--ds-text-secondary)' }}>{law.desc}</p>
                </div>
                <div className="p-3 rounded mb-3 flex items-center justify-center" style={{ background: 'var(--ds-bg-elevated)', minHeight: 60 }}>
                  {law.demo}
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-caption flex-shrink-0" style={{ color: 'var(--ds-text-tertiary)' }}>应用：</span>
                  <span className="text-small" style={{ color: 'var(--ds-text-secondary)' }}>{law.example}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ====== 反馈模式 ====== */}
        {activeTab === 'feedback' && (
          <div className="space-y-4">
            <div className="rounded-lg overflow-hidden" style={{ background: 'var(--ds-bg-card)', border: '1px solid var(--ds-border)' }}>
              <div className="grid grid-cols-4 gap-0 px-5 py-2 text-caption font-medium" style={{ color: 'var(--ds-text-tertiary)', borderBottom: '1px solid var(--ds-divider)', background: 'var(--ds-bg-elevated)' }}>
                <div>操作严重级别 / Severity</div>
                <div>示例 / Example</div>
                <div>反馈模式 / Pattern</div>
                <div>可视化 / Visual</div>
              </div>
              {feedbackPatterns.map((f) => (
                <div key={f.cn} className="grid grid-cols-4 gap-0 px-5 py-4 items-center" style={{ borderBottom: '1px solid var(--ds-divider)' }}>
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ background: f.color }} />
                      <span className="text-body" style={{ color: 'var(--ds-text-primary)' }}>{f.cn}</span>
                    </div>
                    <div className="text-caption ml-5" style={{ color: 'var(--ds-text-tertiary)' }}>{f.en}</div>
                  </div>
                  <div className="text-small" style={{ color: 'var(--ds-text-secondary)' }}>{f.example}</div>
                  <div className="text-small" style={{ color: 'var(--ds-text-secondary)' }}>{f.pattern}</div>
                  <div>
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-caption font-medium" style={{ background: `${f.color}20`, color: f.color, border: `1px solid ${f.color}40` }}>
                      {f.en} Severity
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* 反馈时机速查 */}
            <div className="rounded-lg p-5" style={{ background: 'var(--ds-bg-card)', border: '1px solid var(--ds-border)' }}>
              <h3 className="text-h3 mb-4" style={{ color: 'var(--ds-text-primary)' }}>
                反馈时机速查 / Feedback Timing
              </h3>
              <div className="grid grid-cols-4 gap-3">
                {[
                  { trigger: '失焦时 / On Blur', usage: '格式错误的即时反馈（邮箱、电话）', color: '#5264E0' },
                  { trigger: '变更时 / On Change', usage: '密码强度、字符限制的实时校验', color: '#43CB89' },
                  { trigger: '提交时 / On Submit', usage: '最终校验关卡；滚动到第一个错误', color: '#FFA564' },
                  { trigger: '预防性 / Preventive', usage: '禁用提交直到必填字段有效', color: '#8a8f99' },
                ].map((t) => (
                  <div key={t.trigger} className="p-3 rounded-lg" style={{ background: 'var(--ds-bg-elevated)' }}>
                    <div className="text-small font-medium mb-1" style={{ color: t.color }}>{t.trigger}</div>
                    <div className="text-caption" style={{ color: 'var(--ds-text-secondary)' }}>{t.usage}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
