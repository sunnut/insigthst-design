import { useState, useEffect, useRef } from 'react';
import {
  X, CheckCircle, AlertTriangle, Info, Loader2
} from 'lucide-react';
import { useTheme } from '../theme';

/* ═══════════════════════════════════════════
   Toast 通知演示
═══════════════════════════════════════════ */
type ToastType = 'success' | 'warning' | 'error' | 'info';

interface Toast {
  id: number;
  type: ToastType;
  message: string;
}

function ToastDemo() {
  const { mode } = useTheme();
  const isDark = mode === 'dark';
  const [toasts, setToasts] = useState<Toast[]>([]);
  const toastIdRef = useRef(0);

  const addToast = (type: ToastType) => {
    const messages: Record<ToastType, { cn: string; en: string }> = {
      success: { cn: '任务创建成功！正在跳转到任务列表...', en: 'Task created successfully' },
      warning: { cn: '质检结果存在低分文献，建议复查', en: 'Low scores found in review' },
      error: { cn: '网络连接失败，请稍后重试', en: 'Network connection failed' },
      info: { cn: '新版本的模型已上线，可前往体验', en: 'New model version available' },
    };
    const m = messages[type];
    const newToast: Toast = { id: ++toastIdRef.current, type, message: `${m.cn} (${m.en})` };
    setToasts((prev) => [...prev, newToast]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== newToast.id)), 3500);
  };

  const removeToast = (id: number) => setToasts((prev) => prev.filter((t) => t.id !== id));

  const config: Record<ToastType, { icon: typeof CheckCircle; bg: string; border: string; color: string; cn: string }> = {
    success: { icon: CheckCircle, bg: 'rgba(67,203,137,0.1)', border: 'rgba(67,203,137,0.2)', color: 'var(--ds-success)', cn: '成功' },
    warning: { icon: AlertTriangle, bg: 'rgba(255,165,100,0.1)', border: 'rgba(255,165,100,0.2)', color: 'var(--ds-warning)', cn: '警告' },
    error: { icon: X, bg: 'rgba(255,100,100,0.1)', border: 'rgba(255,100,100,0.2)', color: 'var(--ds-danger)', cn: '错误' },
    info: { icon: Info, bg: 'rgba(82,100,224,0.1)', border: 'rgba(82,100,224,0.2)', color: 'var(--ds-primary)', cn: '信息' },
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 flex-wrap">
        {(['success', 'warning', 'error', 'info'] as ToastType[]).map((type) => {
          const c = config[type];
          return (
            <button key={type} onClick={() => addToast(type)} className="px-4 py-2 rounded-md text-button transition-all duration-150" style={{ background: c.bg, color: c.color, border: `1px solid ${c.border}` }}>
              发送{c.cn}通知
            </button>
          );
        })}
      </div>
      {/* Toast 容器 */}
      <div className="relative h-20">
        {toasts.map((toast) => {
          const c = config[toast.type];
          const Icon = c.icon;
          return (
            <div
              key={toast.id}
              className="flex items-center gap-3 px-4 py-3 rounded-lg animate-slideInRight absolute top-0 left-0 right-0"
              style={{ background: isDark ? 'var(--ds-bg-card)' : 'var(--ds-text-inverse)', border: `1px solid ${c.border}`, boxShadow: isDark ? '0 8px 24px rgba(0,0,0,0.3)' : '0 8px 24px rgba(0,0,0,0.1)' }}
            >
              <Icon size={18} style={{ color: c.color, flexShrink: 0 }} />
              <span className="text-body flex-1" style={{ color: 'var(--ds-text-primary)' }}>{toast.message}</span>
              <button onClick={() => removeToast(toast.id)} className="flex-shrink-0" style={{ color: 'var(--ds-text-tertiary)' }}><X size={14} /></button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   弹窗演示
═══════════════════════════════════════════ */
function ModalDemo() {
  const { mode } = useTheme();
  const isDark = mode === 'dark';
  const [activeModal, setActiveModal] = useState<'small' | 'large' | null>(null);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <button onClick={() => setActiveModal('small')} className="px-4 py-2 rounded-md text-button transition-all duration-150" style={{ background: 'var(--ds-primary)', color: 'var(--ds-text-inverse)' }}>
          打开 640px 弹窗（新增节点）
        </button>
        <button onClick={() => setActiveModal('large')} className="px-4 py-2 rounded-md text-button transition-all duration-150" style={{ background: 'var(--ds-primary)', color: 'var(--ds-text-inverse)' }}>
          打开 900px 弹窗（节点过滤）
        </button>
      </div>

      {/* 640px 弹窗 */}
      {activeModal === 'small' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center animate-fadeIn" style={{ background: 'var(--ds-bg-overlay)' }} onClick={() => setActiveModal(null)}>
          <div className="rounded-xl overflow-hidden animate-fadeIn" style={{ width: 640, maxWidth: 'calc(100vw - 48px)', maxHeight: 'calc(100vh - 48px)', background: 'var(--ds-bg-card)', border: '1px solid var(--ds-border)', boxShadow: isDark ? '0 16px 48px rgba(0,0,0,0.4)' : '0 16px 48px rgba(0,0,0,0.15)' }} onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: '1px solid var(--ds-divider)' }}>
              <h3 className="text-h2" style={{ color: 'var(--ds-text-primary)' }}>新增节点</h3>
              <button onClick={() => setActiveModal(null)} className="flex items-center justify-center rounded-md" style={{ width: 32, height: 32, color: 'var(--ds-text-tertiary)' }}><X size={18} /></button>
            </div>
            <div className="px-5 py-4 space-y-4" style={{ maxHeight: 'calc(100vh - 220px)', overflowY: 'auto' }}>
              <div>
                <label className="text-caption block mb-1.5" style={{ color: 'var(--ds-text-secondary)' }}>节点名称 <span style={{ color: 'var(--ds-danger)' }}>*</span></label>
                <input type="text" placeholder="请输入节点名称" className="w-full rounded-md text-body outline-none" style={{ height: 40, padding: '10px 12px', background: 'var(--ds-bg-input)', border: '1px solid var(--ds-border)', color: 'var(--ds-text-primary)' }} />
              </div>
              <div>
                <label className="text-caption block mb-1.5" style={{ color: 'var(--ds-text-secondary)' }}>节点类型</label>
                <select className="w-full rounded-md text-body appearance-none outline-none" style={{ height: 40, padding: '10px 12px', background: 'var(--ds-bg-input)', border: '1px solid var(--ds-border)', color: 'var(--ds-text-primary)' }}>
                  <option>class(类)</option>
                  <option>property(属性)</option>
                  <option>instance(实例)</option>
                </select>
              </div>
              <div>
                <label className="text-caption block mb-1.5" style={{ color: 'var(--ds-text-secondary)' }}>描述</label>
                <textarea placeholder="请输入描述内容" className="w-full rounded-md text-body outline-none resize-y" style={{ minHeight: 80, padding: '10px 12px', background: 'var(--ds-bg-input)', border: '1px solid var(--ds-border)', color: 'var(--ds-text-primary)' }} />
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 px-5 py-4" style={{ borderTop: '1px solid var(--ds-divider)' }}>
              <button onClick={() => setActiveModal(null)} className="px-4 py-2 rounded-md text-button" style={{ background: 'transparent', border: '1px solid var(--ds-border)', color: 'var(--ds-text-primary)' }}>取消 Cancel</button>
              <button className="px-4 py-2 rounded-md text-button" style={{ background: 'var(--ds-primary)', color: 'var(--ds-text-inverse)' }}>确认新增 Confirm</button>
            </div>
          </div>
        </div>
      )}

      {/* 900px 弹窗 */}
      {activeModal === 'large' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center animate-fadeIn" style={{ background: 'var(--ds-bg-overlay)' }} onClick={() => setActiveModal(null)}>
          <div className="rounded-xl overflow-hidden animate-fadeIn" style={{ width: 900, maxWidth: 'calc(100vw - 48px)', maxHeight: 'calc(100vh - 48px)', background: 'var(--ds-bg-card)', border: '1px solid var(--ds-border)', boxShadow: isDark ? '0 16px 48px rgba(0,0,0,0.4)' : '0 16px 48px rgba(0,0,0,0.15)' }} onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: '1px solid var(--ds-divider)' }}>
              <h3 className="text-h2" style={{ color: 'var(--ds-text-primary)' }}>节点过滤 Node Filter</h3>
              <button onClick={() => setActiveModal(null)} className="flex items-center justify-center rounded-md" style={{ width: 32, height: 32, color: 'var(--ds-text-tertiary)' }}><X size={18} /></button>
            </div>
            <div className="px-5 py-4 space-y-4" style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>
              <div>
                <label className="text-caption block mb-2" style={{ color: 'var(--ds-text-secondary)' }}>节点类型 Type</label>
                <div className="flex gap-3 flex-wrap">
                  {['CLASS 类', 'PROPERTY 属性', 'INSTANCE 实例', 'CONCEPT 概念'].map((type, i) => (
                    <label key={type} className="flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer" style={{ background: i === 0 ? 'var(--ds-primary-subtle)' : 'var(--ds-bg-input)', border: `1px solid ${i === 0 ? 'var(--ds-primary)' : 'var(--ds-border)'}`, color: i === 0 ? 'var(--ds-primary)' : 'var(--ds-text-primary)' }}>
                      <input type="checkbox" defaultChecked={i === 0} className="rounded" style={{ accentColor: 'var(--ds-primary)' }} />
                      <span className="text-small">{type}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-caption block mb-2" style={{ color: 'var(--ds-text-secondary)' }}>业务类型 Business_type</label>
                <div className="flex gap-3 flex-wrap">
                  {['DATA 数据', 'ALGORITHM 算法', 'MODEL 模型', 'METRIC 指标', 'TASK 任务', 'CONSTRAINT 约束'].map((type, i) => (
                    <label key={type} className="flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer" style={{ background: i === 0 ? 'var(--ds-primary-subtle)' : 'var(--ds-bg-input)', border: `1px solid ${i === 0 ? 'var(--ds-primary)' : 'var(--ds-border)'}`, color: i === 0 ? 'var(--ds-primary)' : 'var(--ds-text-primary)' }}>
                      <input type="checkbox" defaultChecked={i === 0} className="rounded" style={{ accentColor: 'var(--ds-primary)' }} />
                      <span className="text-small">{type}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 px-5 py-4" style={{ borderTop: '1px solid var(--ds-divider)' }}>
              <button onClick={() => setActiveModal(null)} className="px-4 py-2 rounded-md text-button" style={{ background: 'transparent', border: '1px solid var(--ds-border)', color: 'var(--ds-text-primary)' }}>重置 Reset</button>
              <button onClick={() => setActiveModal(null)} className="px-4 py-2 rounded-md text-button" style={{ background: 'var(--ds-primary)', color: 'var(--ds-text-inverse)' }}>确认过滤 Apply</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════
   骨架屏演示
═══════════════════════════════════════════ */
function SkeletonDemo() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  const restart = () => { setLoading(true); setTimeout(() => setLoading(false), 4000); };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-caption" style={{ color: 'var(--ds-text-tertiary)' }}>{loading ? '加载中 Loading...' : '加载完成 Loaded'}</span>
        <button onClick={restart} className="px-3 py-1 rounded text-caption transition-all duration-150" style={{ background: 'var(--ds-primary-subtle)', color: 'var(--ds-primary)' }}>重新加载 Reload</button>
      </div>
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="animate-shimmer rounded" style={{ width: 40, height: 40 }} />
              <div className="flex-1 space-y-2">
                <div className="animate-shimmer rounded" style={{ width: '60%', height: 16 }} />
                <div className="animate-shimmer rounded" style={{ width: '40%', height: 12 }} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {[
            { name: '本体抽取任务 #1024', desc: '风力发电预测 · 24篇文献' },
            { name: '本体抽取任务 #1025', desc: '光伏功率预测 · 18篇文献' },
            { name: '本体抽取任务 #1026', desc: '气象数据分析 · 31篇文献' },
          ].map((item) => (
            <div key={item.name} className="flex items-center gap-3">
              <div className="rounded flex items-center justify-center" style={{ width: 40, height: 40, background: 'var(--ds-primary-subtle)' }}>
                <Loader2 size={18} style={{ color: 'var(--ds-primary)' }} />
              </div>
              <div>
                <div className="text-body" style={{ color: 'var(--ds-text-primary)' }}>{item.name}</div>
                <div className="text-caption" style={{ color: 'var(--ds-text-tertiary)' }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════
   缓动曲线演示
═══════════════════════════════════════════ */
function EasingDemo() {
  const { mode } = useTheme();
  const isDark = mode === 'dark';
  const [animating, setAnimating] = useState(false);
  const easings = [
    { name: '默认', en: 'Default', value: 'cubic-bezier(0.4, 0, 0.2, 1)', color: 'var(--ds-primary)', duration: '200ms' },
    { name: '进入', en: 'Enter', value: 'cubic-bezier(0, 0, 0.2, 1)', color: 'var(--ds-success)', duration: '250ms' },
    { name: '退出', en: 'Exit', value: 'cubic-bezier(0.4, 0, 1, 1)', color: 'var(--ds-danger)', duration: '200ms' },
    { name: '弹性', en: 'Bounce', value: 'cubic-bezier(0.34, 1.56, 0.64, 1)', color: 'var(--ds-warning)', duration: '300ms' },
  ];

  return (
    <div className="space-y-4">
      <button onClick={() => { setAnimating(true); setTimeout(() => setAnimating(false), 1200); }} className="px-4 py-2 rounded-md text-button" style={{ background: 'var(--ds-primary)', color: 'var(--ds-text-inverse)' }}>
        播放动画 Play Animation
      </button>
      <div className="space-y-4 pt-2">
        {easings.map((e) => (
          <div key={e.name} className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-small">{e.name} <span style={{ color: 'var(--ds-text-tertiary)' }}>{e.en}</span></span>
              <div className="flex items-center gap-3">
                <code className="text-caption font-mono" style={{ color: 'var(--ds-text-tertiary)' }}>{e.value}</code>
                <span className="text-caption" style={{ color: 'var(--ds-text-tertiary)' }}>{e.duration}</span>
              </div>
            </div>
            <div className="h-2 rounded-full overflow-hidden" style={{ background: isDark ? 'var(--ds-border)' : 'var(--ds-divider)' }}>
              <div className="h-full rounded-full" style={{ width: animating ? '100%' : '0%', background: e.color, transition: `width 1s ${e.value}` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   步骤条演示
═══════════════════════════════════════════ */
function StepperDemo() {
  const { mode } = useTheme();
  const isDark = mode === 'dark';
  const [currentStep, setCurrentStep] = useState(2);
  const steps = [
    { cn: '抽取任务', en: 'Extract' },
    { cn: '文献选择', en: 'Select' },
    { cn: '文献质检', en: 'Review' },
    { cn: '抽取配置', en: 'Config' },
    { cn: '确认结果', en: 'Confirm' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          return (
            <div key={step.cn} className="flex items-center flex-1">
              <div className="flex flex-col items-center gap-2 cursor-pointer" onClick={() => setCurrentStep(index)}>
                <div
                  className="flex items-center justify-center rounded-full text-caption font-medium transition-all duration-200"
                  style={{
                    width: 32, height: 32,
                    background: isCompleted || isCurrent ? 'var(--ds-primary)' : isDark ? 'var(--ds-border)' : 'var(--ds-border)',
                    border: !isCompleted && !isCurrent ? `2px solid ${isDark ? 'var(--ds-border)' : 'var(--ds-text-primary)'}` : 'none',
                    color: isCompleted || isCurrent ? 'var(--ds-text-inverse)' : isDark ? 'var(--ds-text-tertiary)' : '#b8bcc4',
                  }}
                >
                  {isCompleted ? <CheckCircle size={16} /> : index + 1}
                </div>
                <div className="text-center">
                  <span className="text-caption block transition-colors duration-200" style={{ color: isCurrent ? 'var(--ds-primary)' : isCompleted ? 'var(--ds-text-primary)' : isDark ? 'var(--ds-text-tertiary)' : '#b8bcc4', fontWeight: isCurrent ? 500 : 400 }}>{step.cn}</span>
                  <span className="text-caption block" style={{ color: 'var(--ds-text-tertiary)', fontSize: 10 }}>{step.en}</span>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className="flex-1 h-0.5 mx-2 -mt-6 transition-colors duration-300" style={{ background: isCompleted ? 'var(--ds-primary)' : isDark ? 'var(--ds-border)' : 'var(--ds-border)' }} />
              )}
            </div>
          );
        })}
      </div>
      <div className="text-center">
        <span className="text-caption" style={{ color: 'var(--ds-text-tertiary)' }}>点击步骤圆点切换当前步骤 · Click step circles to navigate</span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   主模块
═══════════════════════════════════════════ */
export default function InteractionsSection() {
  const { mode } = useTheme();
  const isDark = mode === 'dark';
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-h1 mb-1" style={{ color: 'var(--ds-text-primary)' }}>交互演示</h1>
        <p className="text-body" style={{ color: 'var(--ds-text-secondary)' }}>
          Interactions · 点击按钮体验真实的交互反馈和动效
        </p>
      </div>

      <Section title="通知消息" en="Toast Notification" color="#43CB89"><ToastDemo /></Section>
      <Section title="弹窗" en="Modal Dialog" color="#5264E0"><ModalDemo /></Section>
      <Section title="步骤条" en="Stepper / Wizard" color="#8a8f99"><StepperDemo /></Section>
      <Section title="骨架屏" en="Skeleton Loading" color="#FFA564"><SkeletonDemo /></Section>
      <Section title="缓动曲线" en="Easing Curves" color="#FF6464"><EasingDemo /></Section>

      {/* 聚焦环演示 */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-1 h-5 rounded-full" style={{ background: 'var(--ds-primary)' }} />
          <h2 className="text-h2" style={{ color: 'var(--ds-text-primary)' }}>聚焦环</h2>
          <span className="text-caption" style={{ color: 'var(--ds-text-tertiary)' }}>Focus Ring · 键盘导航无障碍支持</span>
        </div>
        <div className="rounded-lg p-5" style={{ background: 'var(--ds-bg-card)', border: '1px solid var(--ds-border)' }}>
          <p className="text-body mb-4" style={{ color: 'var(--ds-text-secondary)' }}>
            点击以下元素查看聚焦状态 · Click elements below to see focus state
          </p>
          <div className="flex items-center gap-4 flex-wrap">
            {[
              { label: '按钮聚焦', en: 'Button Focus', color: 'var(--ds-primary)', bg: 'var(--ds-primary)', text: 'var(--ds-text-inverse)' },
              { label: '输入框聚焦', en: 'Input Focus', color: 'var(--ds-primary)', bg: isDark ? 'var(--ds-bg-input)' : '#f5f6fa', text: 'var(--ds-text-primary)', border: 'var(--ds-border)' },
              { label: '链接聚焦', en: 'Link Focus', color: 'var(--ds-primary)', bg: 'transparent', text: 'var(--ds-primary)' },
              { label: '错误聚焦', en: 'Error Focus', color: 'var(--ds-danger)', bg: isDark ? 'var(--ds-bg-input)' : '#f5f6fa', text: 'var(--ds-text-primary)', border: 'var(--ds-border)' },
            ].map((item) => (
              <button
                key={item.label}
                className="px-4 py-2 rounded-md text-button outline-none transition-all duration-150"
                style={{ background: item.bg, color: item.text, border: item.border ? `1px solid ${item.border}` : 'none' }}
                onFocus={(e) => { e.currentTarget.style.boxShadow = `0 0 0 2px ${item.color}40`; }}
                onBlur={(e) => { e.currentTarget.style.boxShadow = 'none'; }}
              >
                {item.label}
                <span className="block text-caption opacity-60" style={{ fontWeight: 400 }}>{item.en}</span>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ─── 辅助组件 ─── */
function Section({ title, en, color, children }: { title: string; en: string; color: string; children: React.ReactNode }) {
  return (
    <section>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-1 h-5 rounded-full" style={{ background: color }} />
        <h2 className="text-h2" style={{ color: 'var(--ds-text-primary)' }}>{title}</h2>
        <span className="text-caption" style={{ color: 'var(--ds-text-tertiary)' }}>{en}</span>
      </div>
      <div className="rounded-lg p-5" style={{ background: 'var(--ds-bg-card)', border: '1px solid var(--ds-border)' }}>
        {children}
      </div>
    </section>
  );
}
