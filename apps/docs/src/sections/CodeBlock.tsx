import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useTheme } from '../theme';

interface CodeBlockProps {
  darkCode: string;
  lightCode: string;
  lang?: string;
}

const codeBlockStyle = {
  margin: 0,
  padding: '16px',
  background: 'transparent',
  maxHeight: 280,
  overflow: 'auto',
  fontSize: 13,
  lineHeight: 1.625,
};

export default function CodeBlock({ darkCode, lightCode, lang = 'tsx' }: CodeBlockProps) {
  const { mode } = useTheme();
  const [copied, setCopied] = useState(false);
  const code = mode === 'light' ? lightCode : darkCode;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // fallback
    }
  };

  const isDark = mode === 'dark';

  return (
    <div
      className="rounded-lg overflow-hidden mt-3"
      style={{
        border: `1px solid ${isDark ? '#323640' : '#e4e5e9'}`,
        background: isDark ? '#181C26' : '#fafbfc',
      }}
    >
      <div
        className="flex items-center justify-between px-3 py-2"
        style={{
          borderBottom: `1px solid ${isDark ? '#323640' : '#edf0f2'}`,
          background: isDark ? '#1d1f23' : '#f5f6fa',
        }}
      >
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#ff5f57' }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#febc2e' }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#28c840' }} />
          </div>
          <span className="text-caption font-mono" style={{ color: isDark ? '#6d717a' : '#b8bcc4' }}>
            {lang}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2 py-1 rounded text-caption transition-all duration-150"
          style={{
            background: isDark ? 'rgba(82,100,224,0.08)' : 'rgba(82,100,224,0.06)',
            color: copied ? '#43CB89' : isDark ? '#8a8f99' : '#5c5f66',
          }}
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
          {copied ? '已复制' : '复制代码'}
        </button>
      </div>
      <SyntaxHighlighter
        language={lang}
        style={isDark ? oneDark : oneLight}
        customStyle={codeBlockStyle}
        codeTagProps={{ className: 'font-mono' }}
        wrapLongLines
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
