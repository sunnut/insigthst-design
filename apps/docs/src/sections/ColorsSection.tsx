import { useState } from 'react';
import { Check, Copy, CheckCircle2, AlertTriangle, XCircle, Info, Minus, FileText } from 'lucide-react';
import { useTheme } from '../theme';

interface Props {
  onCopy: (text: string) => void;
  copied: string | null;
}

/* ───────── 颜色卡片 ───────── */
function ColorCard({ name, nameCn, valueDark, valueLight, onCopy, copied, textColor = '#fff', textColorLight = '#1d1f23' }: {
  name: string; nameCn: string; valueDark: string; valueLight: string; onCopy: (t: string) => void; copied: string | null; textColor?: string; textColorLight?: string;
}) {
  const { mode } = useTheme();
  const isDark = mode === 'dark';
  const value = isDark ? valueDark : valueLight;
  const tc = isDark ? textColor : textColorLight;
  const isRgba = value.startsWith('rgba');

  return (
    <button
      onClick={() => onCopy(value)}
      className="group relative rounded-lg overflow-hidden transition-all duration-200 hover:scale-[1.02] text-left"
      style={{
        background: isRgba ? (isDark ? valueDark : valueLight) : value,
        border: isRgba ? `1px solid ${isDark ? 'rgba(82,100,224,0.25)' : 'rgba(82,100,224,0.15)'}` : '1px solid transparent',
      }}
    >
      <div className="p-3" style={{ minHeight: 72 }}>
        <div className="flex items-center justify-between mb-1">
          <span className="text-caption font-medium opacity-90" style={{ color: tc }}>{nameCn}</span>
          {copied === value ? <Check size={14} style={{ color: isDark ? '#43CB89' : '#43CB89' }} /> : <Copy size={14} className="opacity-0 group-hover:opacity-50 transition-opacity" style={{ color: tc }} />}
        </div>
        <div className="text-body font-mono font-medium" style={{ color: tc, fontSize: 13 }}>{name}</div>
        <div className="text-caption font-mono opacity-70 mt-0.5" style={{ color: tc }}>{value}</div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none" style={{ background: 'rgba(0,0,0,0.2)' }}>
        <span className="text-caption font-medium" style={{ color: '#fff' }}>点击复制色值</span>
      </div>
    </button>
  );
}

/* ───────── 语义标签 ───────── */
function SemanticTag({ label, cn, bgDark, bgLight, text, borderDark, borderLight, icon: Icon }: {
  label: string; cn: string; bgDark: string; bgLight: string; text: string; borderDark: string; borderLight: string; icon: typeof CheckCircle2;
}) {
  const { mode } = useTheme();
  const isDark = mode === 'dark';
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded transition-all duration-150 cursor-default"
      style={{
        background: hovered ? (isDark ? bgDark : bgLight).replace(/0\.0[48]/, '0.15').replace('0.1', '0.2').replace('0.12', '0.2') : (isDark ? bgDark : bgLight),
        color: text,
        border: `1px solid ${isDark ? borderDark : borderLight}`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      title={`${cn} (${label})`}
    >
      <Icon size={14} />
      <span className="text-caption font-medium">{cn}</span>
      <span className="text-caption opacity-60">{label}</span>
    </div>
  );
}

/* ───────── 复制按钮 ───────── */
function CopyButton({ text, onCopy, copied }: { text: string; onCopy: (t: string) => void; copied: string | null }) {
  const isCopied = copied === text;
  return (
    <button
      onClick={() => onCopy(text)}
      className="flex items-center gap-1 px-2 py-1 rounded text-caption transition-all duration-150 flex-shrink-0"
      style={{
        background: isCopied ? 'rgba(67,203,137,0.12)' : 'var(--ds-bg-elevated)',
        color: isCopied ? '#43CB89' : 'var(--ds-text-tertiary)',
        border: `1px solid ${isCopied ? 'rgba(67,203,137,0.25)' : 'var(--ds-border)'}`,
        cursor: 'pointer',
      }}
    >
      {isCopied ? <Check size={12} /> : <Copy size={12} />}
      {isCopied ? '已复制' : '复制'}
    </button>
  );
}

/* ───────── 下载配置文件 ───────── */
function DownloadPanel() {
  const [format, setFormat] = useState<'json' | 'css' | 'scss' | 'less'>('json');
  const [downloaded, setDownloaded] = useState(false);

  const fullConfig = {
    // 背景层级
    background: {
      'bg-base': { dark: '#17191C', light: '#f0f1f5', desc: '页面底色' },
      'bg-sidebar': { dark: '#17191C', light: '#ffffff', desc: '侧边栏背景' },
      'bg-header': { dark: '#17191C', light: '#ffffff', desc: '顶部导航背景' },
      'bg-card': { dark: '#222427', light: '#ffffff', desc: '卡片/面板背景' },
      'bg-elevated': { dark: '#2C2E31', light: '#f5f6fa', desc: '浮层/悬停背景' },
      'bg-input': { dark: '#1d1f23', light: '#f5f6fa', desc: '输入框背景' },
      'bg-overlay': { dark: 'rgba(0,0,0,0.6)', light: 'rgba(0,0,0,0.4)', desc: '遮罩层' },
    },
    // 边框与分割线
    border: {
      'border': { dark: '#323640', light: '#e4e5e9', desc: '默认边框' },
      'border-hover': { dark: '#5b62b8', light: '#d0d2d8', desc: '悬停边框' },
      'border-active': { dark: '#5264E0', light: '#5264E0', desc: '聚焦/激活边框' },
      'divider': { dark: '#323640', light: '#edf0f2', desc: '分割线' },
    },
    // 主题色
    primary: {
      'primary': { dark: '#5264E0', light: '#5264E0', desc: '主色/品牌色' },
      'primary-hover': { dark: '#6B80F0', light: '#3F50C0', desc: '悬停色' },
      'primary-active': { dark: '#3F50C0', light: '#2D40B0', desc: '按下/激活色' },
      'primary-subtle': { dark: 'rgba(82,100,224,0.12)', light: 'rgba(82,100,224,0.08)', desc: '主色浅色背景' },
    },
    // 语义色
    semantic: {
      'success': { dark: '#43CB89', light: '#43CB89', desc: '成功' },
      'success-bg': { dark: 'rgba(67,203,137,0.15)', light: 'rgba(67,203,137,0.12)', desc: '成功背景' },
      'warning': { dark: '#FFA564', light: '#FFA564', desc: '警告' },
      'warning-bg': { dark: 'rgba(255,165,100,0.12)', light: 'rgba(255,165,100,0.08)', desc: '警告背景' },
      'danger': { dark: '#FF6464', light: '#FF6464', desc: '危险' },
      'danger-bg': { dark: 'rgba(255,100,100,0.12)', light: 'rgba(255,100,100,0.08)', desc: '危险背景' },
      'info': { dark: '#5264E0', light: '#5264E0', desc: '信息' },
      'info-bg': { dark: 'rgba(82,100,224,0.12)', light: 'rgba(82,100,224,0.08)', desc: '信息背景' },
      'neutral': { dark: '#8a8f99', light: '#8c8c8c', desc: '中性' },
      'neutral-bg': { dark: 'rgba(200,205,215,0.1)', light: 'rgba(0,0,0,0.04)', desc: '中性背景' },
    },
    // 文本色
    text: {
      'text-primary': { dark: '#d0d2d8', light: '#1d1f23', desc: '主要文本/已输入' },
      'text-secondary': { dark: '#8a8f99', light: '#5c5f66', desc: '次要文本' },
      'text-tertiary': { dark: '#6d717a', light: '#b8bcc4', desc: '辅助·占位符·禁用' },
      'text-link': { dark: '#5264E0', light: '#5264E0', desc: '链接文本' },
      'text-inverse': { dark: '#ffffff', light: '#ffffff', desc: '反色文本（按钮上）' },
      'text-error': { dark: '#FF8A8A', light: '#D44B4B', desc: '错误状态文字' },
      'text-success': { dark: '#6DE0A8', light: '#3AAA68', desc: '成功状态文字' },
    },
    // 投影/阴影层级
    shadow: {
      'shadow-z0': { dark: 'none', light: 'none', desc: '底层（无阴影）' },
      'shadow-z1': { dark: '0 1px 2px rgba(0,0,0,0.30)', light: '0 1px 2px rgba(0,0,0,0.06)', desc: '卡片/按钮默认' },
      'shadow-z2': { dark: '0 2px 12px rgba(0,0,0,0.35)', light: '0 2px 8px rgba(0,0,0,0.08)', desc: '卡片/按钮悬停' },
      'shadow-z4': { dark: '0 4px 20px rgba(0,0,0,0.40)', light: '0 4px 16px rgba(0,0,0,0.10)', desc: '下拉浮层' },
      'shadow-z8': { dark: '0 8px 40px rgba(0,0,0,0.50)', light: '0 8px 32px rgba(0,0,0,0.12)', desc: '弹窗/抽屉' },
      'shadow-z16': { dark: '0 16px 56px rgba(0,0,0,0.55)', light: '0 16px 48px rgba(0,0,0,0.15)', desc: '悬浮通知/FAB' },
    },
  };

  const generateContent = () => {
    switch (format) {
      case 'json':
        return JSON.stringify(fullConfig, null, 2);
      case 'css': {
        let css = '/* 洞察时空·本体智见 — 色彩系统 CSS Variables */\n:root {\n';
        Object.values(fullConfig).forEach(group => {
          Object.entries(group).forEach(([token, val]) => {
            const v = val as { dark: string; light: string; desc: string };
            css += `  /* ${v.desc} */\n`;
            css += `  --${token}: ${v.light};\n`;
          });
        });
        css += '}\n\n[data-theme="dark"] {\n';
        Object.values(fullConfig).forEach(group => {
          Object.entries(group).forEach(([token, val]) => {
            const v = val as { dark: string; desc: string };
            css += `  --${token}: ${v.dark};\n`;
          });
        });
        css += '}\n';
        return css;
      }
      case 'scss': {
        let scss = '// 洞察时空·本体智见 — 色彩系统 SCSS\n$theme-colors: (\n';
        Object.values(fullConfig).forEach(group => {
          Object.entries(group).forEach(([token, val]) => {
            const v = val as { dark: string; light: string; desc: string };
            scss += `  '${token}': (\n`;
            scss += `    dark: ${v.dark},\n`;
            scss += `    light: ${v.light},\n`;
            scss += `    desc: '${v.desc}'\n`;
            scss += `  ),\n`;
          });
        });
        scss += ");\n\n// Usage: map-get(map-get($theme-colors, \"primary\"), \"dark\")\n";
        return scss;
      }
      case 'less': {
        let less = '// 洞察时空·本体智见 — 色彩系统 LESS\n// Dark Theme\n';
        Object.values(fullConfig).forEach(group => {
          Object.entries(group).forEach(([token, val]) => {
            const v = val as { dark: string; desc: string };
            less += `@${token}-dark: ${v.dark}; // ${v.desc}\n`;
          });
        });
        less += '\n// Light Theme\n';
        Object.values(fullConfig).forEach(group => {
          Object.entries(group).forEach(([token, val]) => {
            const v = val as { light: string; desc: string };
            less += `@${token}-light: ${v.light}; // ${v.desc}\n`;
          });
        });
        return less;
      }
    }
  };

  const getFileName = () => {
    const date = new Date().toISOString().slice(0, 10);
    const ext = format === 'json' ? 'json' : format;
    return `design-system-colors-${date}.${ext}`;
  };

  const handleDownload = () => {
    const content = generateContent();
    const blob = new Blob([content], {
      type: format === 'json' ? 'application/json' : 'text/plain',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = getFileName();
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2000);
  };

  const formats: { key: typeof format; label: string }[] = [
    { key: 'json', label: 'JSON' },
    { key: 'css', label: 'CSS Variables' },
    { key: 'scss', label: 'SCSS' },
    { key: 'less', label: 'LESS' },
  ];

  return (
    <div className="rounded-lg p-4" style={{ background: 'var(--ds-bg-elevated)', border: '1px solid var(--ds-border)' }}>
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <div className="text-body font-medium" style={{ color: 'var(--ds-text-primary)' }}>下载配色配置文件</div>
          <div className="text-caption" style={{ color: 'var(--ds-text-tertiary)' }}>Download Color Config · 包含暗色/亮色双主题全部 token</div>
        </div>
        <div className="flex items-center gap-2">
          {formats.map((f) => (
            <button
              key={f.key}
              onClick={() => setFormat(f.key)}
              className="px-3 py-1.5 rounded-md text-caption transition-all duration-150"
              style={{
                background: format === f.key ? 'var(--ds-primary-subtle)' : 'var(--ds-bg-card)',
                color: format === f.key ? '#5264E0' : 'var(--ds-text-secondary)',
                border: `1px solid ${format === f.key ? 'rgba(82,100,224,0.3)' : 'var(--ds-border)'}`,
                cursor: 'pointer',
              }}
            >
              {f.label}
            </button>
          ))}
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-4 py-1.5 rounded-md text-button transition-all duration-150"
            style={{
              background: downloaded ? '#43CB89' : '#5264E0',
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            {downloaded ? <Check size={14} /> : <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>}
            {downloaded ? '已下载' : '下载'}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ───────── 主模块 ───────── */
export default function ColorsSection({ onCopy, copied }: Props) {
  const { mode } = useTheme();
  const isDark = mode === 'dark';

  // 主题色值由 ColorCard 的 valueDark/valueLight 自动切换
  void isDark;

  return (
    <div className="space-y-10">
      {/* 标题 */}
      <div>
        <h1 className="text-h1 mb-1" style={{ color: 'var(--ds-text-primary)' }}>色彩系统</h1>
        <p className="text-body" style={{ color: 'var(--ds-text-secondary)' }}>
          Color System · 基于 13 张设计稿提取的完整色板，点击色块即可复制色值
        </p>
      </div>

      {/* 下载配置文件 */}
      <DownloadPanel />

      {/* ====== 背景层级 ====== */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-1 h-5 rounded-full" style={{ background: 'var(--ds-primary)' }} />
          <h2 className="text-h2" style={{ color: 'var(--ds-text-primary)' }}>背景层级</h2>
          <span className="text-caption" style={{ color: 'var(--ds-text-tertiary)' }}>Background Hierarchy</span>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <ColorCard name="--bg-base" nameCn="页面底色" valueDark="#17191C" valueLight="#f0f1f5" onCopy={onCopy} copied={copied} />
          <ColorCard name="--bg-sidebar" nameCn="侧边栏背景" valueDark="#17191C" valueLight="#ffffff" onCopy={onCopy} copied={copied} />
          <ColorCard name="--bg-header" nameCn="顶部导航背景" valueDark="#17191C" valueLight="#ffffff" onCopy={onCopy} copied={copied} />
          <ColorCard name="--bg-card" nameCn="卡片/面板背景" valueDark="#222427" valueLight="#ffffff" onCopy={onCopy} copied={copied} textColor="#d0d2d8" textColorLight="#1d1f23" />
          <ColorCard name="--bg-elevated" nameCn="浮层/悬停背景" valueDark="#2C2E31" valueLight="#f5f6fa" onCopy={onCopy} copied={copied} textColor="#d0d2d8" textColorLight="#1d1f23" />
          <ColorCard name="--bg-input" nameCn="输入框背景" valueDark="#1d1f23" valueLight="#f5f6fa" onCopy={onCopy} copied={copied} />
        </div>
      </section>

      {/* ====== 边框与分割线 ====== */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-1 h-5 rounded-full" style={{ background: 'var(--ds-text-tertiary)' }} />
          <h2 className="text-h2" style={{ color: 'var(--ds-text-primary)' }}>边框与分割线</h2>
          <span className="text-caption" style={{ color: 'var(--ds-text-tertiary)' }}>Borders & Dividers</span>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <ColorCard name="--border" nameCn="默认边框" valueDark="#323640" valueLight="#e4e5e9" onCopy={onCopy} copied={copied} textColor="#8a8f99" textColorLight="#5c5f66" />
          <ColorCard name="--border-hover" nameCn="悬停边框" valueDark="#5b62b8" valueLight="#d0d2d8" onCopy={onCopy} copied={copied} textColor="#8a8f99" textColorLight="#5c5f66" />
          <ColorCard name="--border-active" nameCn="聚焦边框" valueDark="#5264E0" valueLight="#5264E0" onCopy={onCopy} copied={copied} />
          <ColorCard name="--divider" nameCn="分割线" valueDark="#323640" valueLight="#edf0f2" onCopy={onCopy} copied={copied} textColor="#8a8f99" textColorLight="#5c5f66" />
          <ColorCard name="--bg-overlay" nameCn="遮罩层" valueDark="rgba(0,0,0,0.6)" valueLight="rgba(0,0,0,0.4)" onCopy={onCopy} copied={copied} textColor="#8a8f99" textColorLight="#5c5f66" />
        </div>
      </section>

      {/* ====== 主题色 ====== */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-1 h-5 rounded-full" style={{ background: 'var(--ds-primary)' }} />
          <h2 className="text-h2" style={{ color: 'var(--ds-text-primary)' }}>主题色</h2>
          <span className="text-caption" style={{ color: 'var(--ds-text-tertiary)' }}>Brand Primary · 品牌主色调</span>
        </div>
        <div className="grid grid-cols-4 gap-3">
          <ColorCard name="--primary" nameCn="主色/默认" valueDark="#5264E0" valueLight="#5264E0" onCopy={onCopy} copied={copied} />
          <ColorCard name="--primary-hover" nameCn="悬停色" valueDark="#6B80F0" valueLight="#3F50C0" onCopy={onCopy} copied={copied} />
          <ColorCard name="--primary-active" nameCn="按下色" valueDark="#3F50C0" valueLight="#2D40B0" onCopy={onCopy} copied={copied} />
          <ColorCard name="--primary-subtle" nameCn="浅色背景" valueDark="rgba(82,100,224,0.12)" valueLight="rgba(82,100,224,0.08)" onCopy={onCopy} copied={copied} textColor="#5264E0" textColorLight="#5264E0" />
        </div>
      </section>

      {/* ====== 语义色 ====== */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-1 h-5 rounded-full" style={{ background: 'var(--ds-success)' }} />
          <h2 className="text-h2" style={{ color: 'var(--ds-text-primary)' }}>语义色</h2>
          <span className="text-caption" style={{ color: 'var(--ds-text-tertiary)' }}>Semantic Colors · 状态指示色</span>
        </div>

        {/* 语义标签 */}
        <div className="rounded-lg p-5 mb-4 flex flex-wrap gap-3" style={{ background: 'var(--ds-bg-card)', border: '1px solid var(--ds-border)' }}>
          <SemanticTag label="Success" cn="成功" bgDark="rgba(67,203,137,0.15)" bgLight="rgba(67,203,137,0.1)" text="#43CB89" borderDark="rgba(67,203,137,0.3)" borderLight="rgba(67,203,137,0.2)" icon={CheckCircle2} />
          <SemanticTag label="Warning" cn="警告" bgDark="rgba(255,165,100,0.12)" bgLight="rgba(255,165,100,0.08)" text="#FFA564" borderDark="rgba(255,165,100,0.25)" borderLight="rgba(255,165,100,0.15)" icon={AlertTriangle} />
          <SemanticTag label="Danger" cn="危险" bgDark="rgba(255,100,100,0.12)" bgLight="rgba(255,100,100,0.08)" text="#FF6464" borderDark="rgba(255,100,100,0.25)" borderLight="rgba(255,100,100,0.15)" icon={XCircle} />
          <SemanticTag label="Info" cn="信息" bgDark="rgba(82,100,224,0.12)" bgLight="rgba(82,100,224,0.08)" text="#5264E0" borderDark="rgba(82,100,224,0.25)" borderLight="rgba(82,100,224,0.15)" icon={Info} />
          <SemanticTag label="Neutral" cn="中性" bgDark="rgba(200,205,215,0.1)" bgLight="rgba(0,0,0,0.04)" text={isDark ? '#8a8f99' : '#8c8c8c'} borderDark="rgba(200,205,215,0.15)" borderLight="rgba(0,0,0,0.08)" icon={Minus} />
        </div>

        {/* 语义色值 */}
        <div className="grid grid-cols-5 gap-3">
          <ColorCard name="--success" nameCn="成功绿" valueDark="#43CB89" valueLight="#43CB89" onCopy={onCopy} copied={copied} />
          <ColorCard name="--warning" nameCn="警告橙" valueDark="#FFA564" valueLight="#FFA564" onCopy={onCopy} copied={copied} />
          <ColorCard name="--danger" nameCn="危险红" valueDark="#FF6464" valueLight="#FF6464" onCopy={onCopy} copied={copied} />
          <ColorCard name="--info" nameCn="信息蓝" valueDark="#5264E0" valueLight="#5264E0" onCopy={onCopy} copied={copied} />
          <ColorCard name="--neutral" nameCn="中性灰" valueDark="#8a8f99" valueLight="#8c8c8c" onCopy={onCopy} copied={copied} />
        </div>

        {/* 状态标签示例 */}
        <div className="mt-4 rounded-lg p-5" style={{ background: 'var(--ds-bg-card)', border: '1px solid var(--ds-border)' }}>
          <div className="text-caption mb-3" style={{ color: 'var(--ds-text-tertiary)' }}>状态标签实际应用 / Status Badge Usage</div>
          <div className="flex items-center gap-4">
            {[
              { label: '进行中', sub: 'Processing', bgDark: 'rgba(82,100,224,0.12)', bgLight: 'rgba(82,100,224,0.08)', text: '#5264E0', borderDark: 'rgba(82,100,224,0.25)', borderLight: 'rgba(82,100,224,0.15)' },
              { label: '已完成', sub: 'Completed', bgDark: 'rgba(67,203,137,0.15)', bgLight: 'rgba(67,203,137,0.1)', text: '#43CB89', borderDark: 'rgba(67,203,137,0.3)', borderLight: 'rgba(67,203,137,0.2)' },
              { label: '草稿', sub: 'Draft', bgDark: 'rgba(200,205,215,0.1)', bgLight: 'rgba(0,0,0,0.04)', text: isDark ? '#8a8f99' : '#8c8c8c', borderDark: 'rgba(200,205,215,0.15)', borderLight: 'rgba(0,0,0,0.08)' },
              { label: '建议复审', sub: 'Review', bgDark: 'rgba(255,165,100,0.12)', bgLight: 'rgba(255,165,100,0.08)', text: '#FFA564', borderDark: 'rgba(255,165,100,0.25)', borderLight: 'rgba(255,165,100,0.15)' },
              { label: '不建议使用', sub: 'Rejected', bgDark: 'rgba(255,100,100,0.12)', bgLight: 'rgba(255,100,100,0.08)', text: '#FF6464', borderDark: 'rgba(255,100,100,0.25)', borderLight: 'rgba(255,100,100,0.15)' },
            ].map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-1.5">
                <span className="inline-flex items-center px-3 py-1 rounded text-caption font-medium" style={{ background: isDark ? s.bgDark : s.bgLight, color: s.text, border: `1px solid ${isDark ? s.borderDark : s.borderLight}` }}>
                  {s.label}
                </span>
                <span className="text-caption" style={{ color: 'var(--ds-text-tertiary)' }}>{s.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== 文本色 ====== */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-1 h-5 rounded-full" style={{ background: 'var(--ds-text-primary)' }} />
          <h2 className="text-h2" style={{ color: 'var(--ds-text-primary)' }}>文本色</h2>
          <span className="text-caption" style={{ color: 'var(--ds-text-tertiary)' }}>Text Colors · 输入控件文字状态规范</span>
        </div>

        {/* 基础文本层级 */}
        <div className="rounded-lg overflow-hidden mb-5" style={{ background: 'var(--ds-bg-card)', border: '1px solid var(--ds-border)' }}>
          <div className="px-4 py-2 text-caption font-medium" style={{ background: 'var(--ds-bg-elevated)', color: 'var(--ds-text-tertiary)', borderBottom: '1px solid var(--ds-divider)' }}>
            基础层级 · Base Hierarchy
          </div>
          {[
            { token: '--text-primary', cn: '主要文本', en: 'Primary', colorDark: '#d0d2d8', colorLight: '#1d1f23', sample: '管理本体构建全流程任务' },
            { token: '--text-secondary', cn: '次要文本', en: 'Secondary', colorDark: '#8a8f99', colorLight: '#5c5f66', sample: '创建者ID · 更新 14小时前' },
            { token: '--text-tertiary', cn: '辅助/禁用文本', en: 'Tertiary / Disabled', colorDark: '#6d717a', colorLight: '#b8bcc4', sample: '共 24 篇文献 · 全部解析完成' },
            { token: '--text-link', cn: '链接文本', en: 'Link', colorDark: '#5264E0', colorLight: '#5264E0', sample: '查看详情 →' },
            { token: '--text-inverse', cn: '反色文本', en: 'Inverse', colorDark: '#ffffff', colorLight: '#ffffff', sample: '按钮内文字', bg: '#5264E0' },
          ].map((t) => {
            const tc = isDark ? t.colorDark : t.colorLight;
            return (
              <div key={t.token} className="flex items-center gap-4 px-5 py-3.5 transition-colors duration-100 hover:bg-white/[0.02]" style={{ borderBottom: '1px solid var(--ds-divider)' }}>
                <div className="w-36 flex-shrink-0">
                  <div className="text-body" style={{ color: 'var(--ds-text-primary)' }}>{t.cn}</div>
                  <div className="text-caption font-mono" style={{ color: 'var(--ds-text-tertiary)' }}>{t.token}</div>
                </div>
                <div className="text-caption w-16 flex-shrink-0" style={{ color: 'var(--ds-text-tertiary)' }}>{t.en}</div>
                <div className="text-caption font-mono w-20 flex-shrink-0" style={{ color: 'var(--ds-text-tertiary)' }}>{tc}</div>
                <div className="flex-1 min-w-0">
                  <span className="text-body truncate block px-3 py-1.5 rounded" style={{ color: tc, background: t.bg || 'transparent' }}>{t.sample}</span>
                </div>
                <CopyButton text={tc} onCopy={onCopy} copied={copied} />
              </div>
            );
          })}
        </div>

        {/* 输入控件文字状态 */}
        <div className="rounded-lg overflow-hidden mb-5" style={{ background: 'var(--ds-bg-card)', border: '1px solid var(--ds-border)' }}>
          <div className="px-4 py-2 text-caption font-medium" style={{ background: 'var(--ds-bg-elevated)', color: 'var(--ds-text-tertiary)', borderBottom: '1px solid var(--ds-divider)' }}>
            输入控件文字状态 · Input Text States（辅助/占位符/禁用 统一为 --text-tertiary）
          </div>
          {[
            { token: '--text-input', cn: '已输入文字', en: 'Input Value', colorDark: '#d0d2d8', colorLight: '#1d1f23', sample: '风力发电预测系统', state: '用户已输入的内容' },
            { token: '--text-tertiary', cn: '辅助·占位符·禁用', en: 'Tertiary / Placeholder / Disabled', colorDark: '#6d717a', colorLight: '#b8bcc4', sample: '请输入任务名称...', state: '辅助说明、占位符、禁用态统一' },
            { token: '--text-error', cn: '错误状态文字', en: 'Error', colorDark: '#FF8A8A', colorLight: '#D44B4B', sample: '字段格式不正确', state: '校验失败时的提示' },
            { token: '--text-success', cn: '成功状态文字', en: 'Success', colorDark: '#6DE0A8', colorLight: '#3AAA68', sample: '验证通过', state: '校验成功时的提示' },
          ].map((t) => {
            const tc = isDark ? t.colorDark : t.colorLight;
            return (
              <div key={t.token} className="flex items-center gap-4 px-5 py-3.5 transition-colors duration-100 hover:bg-white/[0.02]" style={{ borderBottom: '1px solid var(--ds-divider)' }}>
                <div className="w-40 flex-shrink-0">
                  <div className="text-body" style={{ color: 'var(--ds-text-primary)' }}>{t.cn}</div>
                  <div className="text-caption font-mono" style={{ color: 'var(--ds-text-tertiary)' }}>{t.token}</div>
                </div>
                <div className="text-caption w-24 flex-shrink-0" style={{ color: 'var(--ds-text-tertiary)' }}>{t.en}</div>
                <div className="text-caption font-mono w-20 flex-shrink-0" style={{ color: 'var(--ds-text-tertiary)' }}>{tc}</div>
                <div className="flex-1 min-w-0">
                  <span className="text-body truncate block px-3 py-1.5 rounded" style={{ color: tc, background: 'var(--ds-bg-elevated)' }}>{t.sample}</span>
                </div>
                <div className="text-caption w-48 flex-shrink-0" style={{ color: 'var(--ds-text-tertiary)' }}>{t.state}</div>
                <CopyButton text={tc} onCopy={onCopy} copied={copied} />
              </div>
            );
          })}
        </div>

        {/* 实际输入框文字状态演示 */}
        <div className="rounded-lg p-5" style={{ background: 'var(--ds-bg-card)', border: '1px solid var(--ds-border)' }}>
          <div className="text-caption mb-4 font-medium" style={{ color: 'var(--ds-text-tertiary)' }}>
            输入控件实际效果 · Input Demo
          </div>
          <div className="grid grid-cols-3 gap-4">
            {/* 正常已输入 */}
            <div>
              <label className="text-caption block mb-1.5" style={{ color: 'var(--ds-text-secondary)' }}>正常已输入 Value</label>
              <div className="text-body px-3 rounded-md" style={{ height: 36, lineHeight: '34px', background: isDark ? '#1d1f23' : '#f5f6fa', border: `1px solid ${isDark ? '#323640' : '#e4e5e9'}`, color: isDark ? '#d0d2d8' : '#1d1f23' }}>
                风力发电预测系统
              </div>
            </div>
            {/* Placeholder */}
            <div>
              <label className="text-caption block mb-1.5" style={{ color: 'var(--ds-text-secondary)' }}>待输入 Placeholder</label>
              <div className="text-body px-3 rounded-md" style={{ height: 36, lineHeight: '34px', background: isDark ? '#1d1f23' : '#f5f6fa', border: `1px solid ${isDark ? '#323640' : '#e4e5e9'}`, color: isDark ? '#6d717a' : '#b8bcc4' }}>
                请输入任务名称...
              </div>
            </div>
            {/* 禁用 — 与占位符共用 --text-tertiary */}
            <div>
              <label className="text-caption block mb-1.5" style={{ color: 'var(--ds-text-secondary)' }}>禁用 Disabled (--text-tertiary)</label>
              <div className="text-body px-3 rounded-md" style={{ height: 36, lineHeight: '34px', background: isDark ? '#1d1f23' : '#f0f1f5', border: `1px solid ${isDark ? '#26282C' : '#e8e9ed'}`, color: isDark ? '#6d717a' : '#b8bcc4', cursor: 'not-allowed' }}>
                已锁定不可编辑
              </div>
            </div>
            {/* 错误 */}
            <div>
              <label className="text-caption block mb-1.5" style={{ color: 'var(--ds-text-secondary)' }}>错误 Error</label>
              <div className="text-body px-3 rounded-md" style={{ height: 36, lineHeight: '34px', background: isDark ? '#1f1616' : '#fef2f2', border: '1px solid #FF6464', color: isDark ? '#FF8A8A' : '#D44B4B' }}>
                字段格式不正确
              </div>
            </div>
            {/* 成功 */}
            <div>
              <label className="text-caption block mb-1.5" style={{ color: 'var(--ds-text-secondary)' }}>成功 Success</label>
              <div className="text-body px-3 rounded-md flex items-center gap-2" style={{ height: 36, lineHeight: '34px', background: isDark ? '#131f18' : '#f0fdf4', border: `1px solid ${isDark ? '#1a3828' : '#c8e8d0'}`, color: isDark ? '#6DE0A8' : '#3AAA68' }}>
                <CheckCircle2 size={14} /> 验证通过
              </div>
            </div>
            {/* 只读 */}
            <div>
              <label className="text-caption block mb-1.5" style={{ color: 'var(--ds-text-secondary)' }}>只读 Readonly</label>
              <div className="text-body px-3 rounded-md" style={{ height: 36, lineHeight: '34px', background: isDark ? '#181a20' : '#fafbfc', border: `1px dashed ${isDark ? '#3a3f4d' : '#d0d2d8'}`, color: isDark ? '#8a8f99' : '#5c5f66' }}>
                系统自动生成，不可修改
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== 渐变色 ====== */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-1 h-5 rounded-full" style={{ background: 'linear-gradient(135deg, #5264E0, #43CB89)' }} />
          <h2 className="text-h2" style={{ color: 'var(--ds-text-primary)' }}>渐变色</h2>
          <span className="text-caption" style={{ color: 'var(--ds-text-tertiary)' }}>Gradients · 仅用于统计卡片</span>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {[
            { cn: '全部文献', en: 'Total Documents', value: '24', desc: '本月新增：12', from: isDark ? '#222640' : '#e8eafc', to: isDark ? '#2a3050' : '#f0f2ff', iconBg: isDark ? '#2d3458' : '#d8dcfa', icon: <FileText size={20} /> },
            { cn: '文献领域', en: 'Fields', value: '7', desc: '涉及 3 个行业', from: isDark ? '#1a3028' : '#e6f5ef', to: isDark ? '#223838' : '#f0f9f4', iconBg: isDark ? '#264840' : '#c8e8d8', icon: <CheckCircle2 size={20} /> },
            { cn: '总容量', en: 'Storage', value: '38.7', desc: 'MB 存储占用', from: isDark ? '#2a2040' : '#f0eaf8', to: isDark ? '#382848' : '#f5f0fa', iconBg: isDark ? '#403058' : '#ddd4f0', icon: <Info size={20} /> },
            { cn: '已完成', en: 'Completed', value: '10', desc: '任务已完成', from: isDark ? '#1e3420' : '#e6f5e8', to: isDark ? '#284030' : '#f0f9f1', iconBg: isDark ? '#305840' : '#c8e8cc', icon: <CheckCircle2 size={20} /> },
          ].map((card) => (
            <div key={card.cn} className="rounded-lg p-4" style={{ background: `linear-gradient(135deg, ${card.from}, ${card.to})`, border: '1px solid var(--ds-border)' }}>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-caption mb-1" style={{ color: 'var(--ds-text-secondary)' }}>{card.cn} <span className="opacity-60">{card.en}</span></div>
                  <div className="text-data" style={{ color: 'var(--ds-text-primary)' }}>{card.value}</div>
                  <div className="text-caption mt-1" style={{ color: 'var(--ds-text-tertiary)' }}>{card.desc}</div>
                </div>
                <div className="flex items-center justify-center rounded-lg" style={{ width: 44, height: 44, background: card.iconBg }}>
                  <span style={{ color: 'var(--ds-text-primary)' }}>{card.icon}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
