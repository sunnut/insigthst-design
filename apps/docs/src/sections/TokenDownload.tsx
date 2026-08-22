import { useState } from 'react';
import { Check } from 'lucide-react';

type Format = 'json' | 'css' | 'scss' | 'less';

interface TokenDownloadProps {
  title: string;
  subtitle: string;
  filePrefix: string;
  data: Record<string, Record<string, string | number>>;
  cssComments?: Record<string, string>;
}

export default function TokenDownload({ title, subtitle, filePrefix, data, cssComments }: TokenDownloadProps) {
  const [format, setFormat] = useState<Format>('css');
  const [downloaded, setDownloaded] = useState(false);

  const formats: { key: Format; label: string }[] = [
    { key: 'json', label: 'JSON' },
    { key: 'css', label: 'CSS Variables' },
    { key: 'scss', label: 'SCSS' },
    { key: 'less', label: 'LESS' },
  ];

  const generateContent = () => {
    const date = new Date().toISOString().slice(0, 10);
    const header = `/* ═══════════════════════════════════════════\n   ${title}\n   Generated on ${date}\n═══════════════════════════════════════════ */\n\n`;

    switch (format) {
      case 'json':
        return JSON.stringify(data, null, 2);

      case 'css': {
        let css = header + ':root {\n';
        Object.entries(data).forEach(([groupName, group]) => {
          css += `  /* ── ${groupName} ── */\n`;
          Object.entries(group).forEach(([token, val]) => {
            const comment = cssComments?.[`${groupName}.${token}`] || '';
            if (comment) css += `  /* ${comment} */\n`;
            css += `  --${token}: ${val};\n`;
          });
        });
        css += '}\n';
        return css;
      }

      case 'scss': {
        let scss = header;
        Object.entries(data).forEach(([groupName, group]) => {
          scss += `// ── ${groupName} ──\n`;
          Object.entries(group).forEach(([token, val]) => {
            const comment = cssComments?.[`${groupName}.${token}`] || '';
            scss += `$${token}: ${val};${comment ? ` // ${comment}` : ''}\n`;
          });
          scss += '\n';
        });
        return scss;
      }

      case 'less': {
        let less = header;
        Object.entries(data).forEach(([groupName, group]) => {
          less += `// ── ${groupName} ──\n`;
          Object.entries(group).forEach(([token, val]) => {
            const comment = cssComments?.[`${groupName}.${token}`] || '';
            less += `@${token}: ${val};${comment ? ` // ${comment}` : ''}\n`;
          });
          less += '\n';
        });
        return less;
      }
    }
  };

  const handleDownload = () => {
    const content = generateContent();
    const ext = format === 'json' ? 'json' : format;
    const date = new Date().toISOString().slice(0, 10);
    const fileName = `${filePrefix}-${date}.${ext}`;

    const blob = new Blob([content], {
      type: format === 'json' ? 'application/json' : 'text/plain',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2000);
  };

  return (
    <div className="rounded-lg p-4" style={{ background: 'var(--ds-bg-elevated)', border: '1px solid var(--ds-border)' }}>
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <div className="text-body font-medium" style={{ color: 'var(--ds-text-primary)' }}>{title}</div>
          <div className="text-caption" style={{ color: 'var(--ds-text-tertiary)' }}>{subtitle}</div>
        </div>
        <div className="flex items-center gap-2">
          {formats.map((f) => (
            <button
              key={f.key}
              onClick={() => setFormat(f.key)}
              className="px-3 py-1.5 rounded-md text-caption transition-all duration-150"
              style={{
                background: format === f.key ? 'var(--ds-primary-subtle)' : 'var(--ds-bg-card)',
                color: format === f.key ? 'var(--ds-primary)' : 'var(--ds-text-secondary)',
                border: `1px solid ${format === f.key ? 'var(--ds-primary-border)' : 'var(--ds-border)'}`,
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
              background: downloaded ? 'var(--ds-success)' : 'var(--ds-primary)',
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
