import TokenDownload from './TokenDownload';

const typeStyles = [
  { token: '--text-h1', cn: 'H1 页面标题', en: 'Page Title', className: 'text-h1', sample: '任务中心 / 本体管理', color: 'var(--ds-text-primary)', size: '24px', lineHeight: '32px', weight: '600 (Semibold)' },
  { token: '--text-h2', cn: 'H2 卡片标题', en: 'Card Title', className: 'text-h2', sample: '新建抽取任务', color: 'var(--ds-text-primary)', size: '18px', lineHeight: '26px', weight: '600 (Semibold)' },
  { token: '--text-h3', cn: 'H3 区块标题', en: 'Section Title', className: 'text-h3', sample: '质检参数配置', color: 'var(--ds-text-primary)', size: '16px', lineHeight: '24px', weight: '500 (Medium)' },
  { token: '--text-body', cn: '正文', en: 'Body Text', className: 'text-body', sample: '管理本体构建全流程任务，追踪各阶段状态', color: 'var(--ds-text-primary)', size: '14px', lineHeight: '22px', weight: '400 (Regular)' },
  { token: '--text-small', cn: '次要信息', en: 'Secondary Text', className: 'text-small', sample: '创建者ID · 更新 14 小时前 · 文献数 12', color: 'var(--ds-text-secondary)', size: '13px', lineHeight: '20px', weight: '400 (Regular)' },
  { token: '--text-caption', cn: '说明文字', en: 'Caption', className: 'text-caption', sample: '共 24 篇文献 · 全部解析完成 · 2025-08-20', color: 'var(--ds-text-tertiary)', size: '12px', lineHeight: '18px', weight: '400 (Regular)' },
  { token: '--text-button', cn: '按钮文字', en: 'Button Text', className: 'text-button', sample: '确认提交 / 取消操作', color: 'var(--ds-primary)', size: '14px', lineHeight: '22px', weight: '500 (Medium)' },
  { token: '--text-data', cn: '统计数字', en: 'Data Number', className: 'text-data', sample: '24', color: 'var(--ds-text-primary)', size: '28px', lineHeight: '36px', weight: '600 (Semibold)' },
];

const fontStack = [
  { name: '苹果系统', en: 'macOS System', value: '-apple-system, BlinkMacSystemFont', desc: 'San Francisco 字体，苹果设备首选' },
  { name: '中文字体', en: 'Chinese Font', value: '"PingFang SC", "Microsoft YaHei"', desc: '苹方 / 微软雅黑，中文显示' },
  { name: '西文回退', en: 'Western Fallback', value: '"Helvetica Neue", Arial, sans-serif', desc: '通用无衬线字体栈' },
];

export default function TypographySection() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-h1 mb-1" style={{ color: 'var(--ds-text-primary)' }}>排版系统</h1>
        <p className="text-body" style={{ color: 'var(--ds-text-secondary)' }}>
          Typography · 基于 4px 栅格的字体规范，覆盖从 12px 到 28px 的完整层级
        </p>
      </div>

      <TokenDownload
        title="下载排版配置文件"
        subtitle="支持 JSON / CSS Variables / SCSS / LESS 四种格式"
        filePrefix="typography-tokens"
        data={{
          'Font Stack': {
            'font-sans': '-apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", "Helvetica Neue", Arial, sans-serif',
            'font-mono': '"SF Mono", "Fira Code", Consolas, monospace',
          },
          'Heading 1': {
            'font-size-h1': '24px',
            'font-line-h1': '32px',
            'font-weight-h1': 600,
            'font-ls-h1': 0,
          },
          'Heading 2': {
            'font-size-h2': '18px',
            'font-line-h2': '26px',
            'font-weight-h2': 600,
            'font-ls-h2': 0,
          },
          'Heading 3': {
            'font-size-h3': '16px',
            'font-line-h3': '24px',
            'font-weight-h3': 500,
            'font-ls-h3': 0,
          },
          'Body': {
            'font-size-body': '14px',
            'font-line-body': '22px',
            'font-weight-body': 400,
            'font-ls-body': 0,
          },
          'Body Small': {
            'font-size-small': '13px',
            'font-line-small': '20px',
            'font-weight-small': 400,
            'font-ls-small': '0.01em',
          },
          'Caption': {
            'font-size-caption': '12px',
            'font-line-caption': '18px',
            'font-weight-caption': 400,
            'font-ls-caption': '0.02em',
          },
          'Button': {
            'font-size-button': '14px',
            'font-line-button': '22px',
            'font-weight-button': 500,
            'font-ls-button': '0.01em',
          },
          'Data': {
            'font-size-data': '28px',
            'font-line-data': '36px',
            'font-weight-data': 600,
            'font-ls-data': '-0.01em',
          },
        }}
        cssComments={{
          'Font Stack.font-sans': '系统字体栈',
          'Font Stack.font-mono': '等宽字体栈',
        }}
      />

      {/* ====== 字体栈 ====== */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-1 h-5 rounded-full" style={{ background: 'var(--ds-primary)' }} />
          <h2 className="text-h2" style={{ color: 'var(--ds-text-primary)' }}>字体栈</h2>
          <span className="text-caption" style={{ color: 'var(--ds-text-tertiary)' }}>Font Stack</span>
        </div>
        <div className="rounded-lg p-5 space-y-3" style={{ background: 'var(--ds-bg-card)', border: '1px solid var(--ds-border)' }}>
          {fontStack.map((f) => (
            <div key={f.name} className="flex items-center gap-4">
              <div className="w-20 flex-shrink-0">
                <div className="text-small" style={{ color: 'var(--ds-text-primary)' }}>{f.name}</div>
                <div className="text-caption" style={{ color: 'var(--ds-text-tertiary)' }}>{f.en}</div>
              </div>
              <code className="flex-1 p-2 rounded text-small font-mono" style={{ background: 'var(--ds-bg-elevated)', color: 'var(--ds-text-secondary)' }}>
                {f.value}
              </code>
              <div className="w-48 flex-shrink-0 text-caption text-right" style={{ color: 'var(--ds-text-tertiary)' }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ====== 完整字体声明 ====== */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-1 h-5 rounded-full" style={{ background: 'var(--ds-success)' }} />
          <h2 className="text-h2" style={{ color: 'var(--ds-text-primary)' }}>CSS 字体声明</h2>
          <span className="text-caption" style={{ color: 'var(--ds-text-tertiary)' }}>CSS Font Declaration</span>
        </div>
        <div className="rounded-lg p-5" style={{ background: 'var(--ds-bg-card)', border: '1px solid var(--ds-border)' }}>
          <code className="block text-small font-mono leading-relaxed" style={{ color: 'var(--ds-text-secondary)' }}>
            <span style={{ color: '#FF6464' }}>font-family</span>:{' '}
            <span style={{ color: '#FFA564' }}>-apple-system</span>,{' '}
            <span style={{ color: '#FFA564' }}>BlinkMacSystemFont</span>,{' '}
            <span style={{ color: '#43CB89' }}>&quot;PingFang SC&quot;</span>,{' '}
            <span style={{ color: '#43CB89' }}>&quot;Microsoft YaHei&quot;</span>,{' '}
            <span style={{ color: '#5264E0' }}>&quot;Helvetica Neue&quot;</span>,{' '}
            <span style={{ color: '#5264E0' }}>Arial</span>,{' '}
            <span style={{ color: '#8a8f99' }}>sans-serif</span>;
          </code>
          <div className="mt-3 flex gap-3 text-caption">
            <span style={{ color: '#FF6464' }}>■ CSS 属性名</span>
            <span style={{ color: '#FFA564' }}>■ 系统字体</span>
            <span style={{ color: '#43CB89' }}>■ 中文字体</span>
            <span style={{ color: '#5264E0' }}>■ 西文字体</span>
            <span style={{ color: '#8a8f99' }}>■ 通用回退</span>
          </div>
        </div>
      </section>

      {/* ====== 字号层级 ====== */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-1 h-5 rounded-full" style={{ background: 'var(--ds-warning)' }} />
          <h2 className="text-h2" style={{ color: 'var(--ds-text-primary)' }}>字号层级</h2>
          <span className="text-caption" style={{ color: 'var(--ds-text-tertiary)' }}>Type Scale</span>
        </div>
        <div className="rounded-lg overflow-hidden" style={{ background: 'var(--ds-bg-card)', border: '1px solid var(--ds-border)' }}>
          {/* 表头 */}
          <div className="grid grid-cols-12 gap-0 px-5 py-2 text-caption font-medium" style={{ color: 'var(--ds-text-tertiary)', borderBottom: '1px solid var(--ds-divider)', background: 'var(--ds-bg-elevated)' }}>
            <div className="col-span-2">Token / 名称</div>
            <div className="col-span-1">字号</div>
            <div className="col-span-1">行高</div>
            <div className="col-span-2">字重</div>
            <div className="col-span-6">效果预览 / Preview</div>
          </div>
          {/* 行 */}
          {typeStyles.map((style) => (
            <div
              key={style.token}
              className="grid grid-cols-12 gap-0 px-5 py-3 items-center transition-colors duration-100 hover:bg-white/[0.02]"
              style={{ borderBottom: '1px solid var(--ds-divider)' }}
            >
              <div className="col-span-2">
                <div className="text-caption font-mono" style={{ color: 'var(--ds-text-tertiary)' }}>{style.token}</div>
                <div className="text-small" style={{ color: 'var(--ds-text-secondary)' }}>{style.cn}</div>
                <div className="text-caption" style={{ color: 'var(--ds-text-tertiary)' }}>{style.en}</div>
              </div>
              <div className="col-span-1 text-body font-medium" style={{ color: 'var(--ds-text-primary)' }}>{style.size}</div>
              <div className="col-span-1 text-caption" style={{ color: 'var(--ds-text-secondary)' }}>{style.lineHeight}</div>
              <div className="col-span-2 text-caption" style={{ color: 'var(--ds-text-secondary)' }}>{style.weight}</div>
              <div className="col-span-6 min-w-0">
                <div className={style.className} style={{ color: style.color }}>{style.sample}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ====== 字重展示 ====== */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-1 h-5 rounded-full" style={{ background: 'var(--ds-danger)' }} />
          <h2 className="text-h2" style={{ color: 'var(--ds-text-primary)' }}>字重展示</h2>
          <span className="text-caption" style={{ color: 'var(--ds-text-tertiary)' }}>Font Weight</span>
        </div>
        <div className="rounded-lg p-5 space-y-3" style={{ background: 'var(--ds-bg-card)', border: '1px solid var(--ds-border)' }}>
          {[
            { weight: 400, cn: '常规体', en: 'Regular', usage: '正文文本，阅读舒适，大段内容首选' },
            { weight: 500, cn: '中等体', en: 'Medium', usage: '按钮文字、区块标题、需要轻微强调' },
            { weight: 600, cn: '半粗体', en: 'Semibold', usage: '页面标题、统计数字、卡片标题' },
            { weight: 700, cn: '粗体', en: 'Bold', usage: '强调文本（极少使用，避免过度强调）' },
          ].map((w) => (
            <div key={w.weight} className="flex items-center gap-4 transition-colors duration-100 hover:bg-white/[0.02] rounded px-2 -mx-2 py-1">
              <div className="w-16 flex-shrink-0">
                <div className="text-body font-medium" style={{ color: 'var(--ds-text-primary)' }}>{w.weight}</div>
                <div className="text-caption" style={{ color: 'var(--ds-text-tertiary)' }}>{w.en}</div>
              </div>
              <div className="w-16 flex-shrink-0 text-small" style={{ color: 'var(--ds-text-secondary)' }}>{w.cn}</div>
              <div className="flex-1 text-body" style={{ color: 'var(--ds-text-primary)', fontWeight: w.weight }}>
                洞察时空 · 本体智见 Knowledge Graph Platform
              </div>
              <div className="w-48 flex-shrink-0 text-caption text-right" style={{ color: 'var(--ds-text-tertiary)' }}>{w.usage}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ====== 行高可视化 ====== */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-1 h-5 rounded-full" style={{ background: 'var(--ds-info)' }} />
          <h2 className="text-h2" style={{ color: 'var(--ds-text-primary)' }}>行高可视化</h2>
          <span className="text-caption" style={{ color: 'var(--ds-text-tertiary)' }}>Line Height Visualization</span>
        </div>
        <div className="rounded-lg p-5 space-y-4" style={{ background: 'var(--ds-bg-card)', border: '1px solid var(--ds-border)' }}>
          {[
            { lh: '32px', size: '24px', ratio: '1.33', label: 'H1 标题', desc: '紧凑行高，标题区垂直空间高效利用' },
            { lh: '22px', size: '14px', ratio: '1.57', label: '正文 Body', desc: '黄金行高比，长文本阅读最舒适' },
            { lh: '18px', size: '12px', ratio: '1.50', label: '说明 Caption', desc: '小字体的合适行高，保持可读性' },
          ].map((item) => (
            <div key={item.label} className="flex items-start gap-4">
              <div className="w-24 flex-shrink-0 pt-1">
                <div className="text-small" style={{ color: 'var(--ds-text-primary)' }}>{item.label}</div>
                <div className="text-caption font-mono" style={{ color: 'var(--ds-text-tertiary)' }}>{item.size} / {item.lh}</div>
                <div className="text-caption" style={{ color: 'var(--ds-text-tertiary)' }}>比例 {item.ratio}</div>
              </div>
              <div className="flex-1">
                <div
                  className="rounded px-3 py-2"
                  style={{
                    lineHeight: item.lh,
                    fontSize: item.size,
                    color: 'var(--ds-text-primary)',
                    background: 'rgba(82,100,224,0.06)',
                    border: '1px dashed rgba(82,100,224,0.2)',
                  }}
                >
                  管理本体构建全流程任务<br />
                  追踪各阶段状态与进度
                </div>
                <div className="text-caption mt-1" style={{ color: 'var(--ds-text-tertiary)' }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ====== 实际排版效果 ====== */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-1 h-5 rounded-full" style={{ background: 'var(--ds-neutral)' }} />
          <h2 className="text-h2" style={{ color: 'var(--ds-text-primary)' }}>实际排版效果</h2>
          <span className="text-caption" style={{ color: 'var(--ds-text-tertiary)' }}>Real-world Example</span>
        </div>
        <div className="rounded-lg p-6 space-y-4" style={{ background: 'var(--ds-bg-card)', border: '1px solid var(--ds-border)' }}>
          {/* Example 1: Page Header */}
          <div>
            <div className="text-h1 mb-1" style={{ color: 'var(--ds-text-primary)' }}>文献库</div>
            <div className="text-body" style={{ color: 'var(--ds-text-secondary)' }}>管理所有平台文献，支持全局检索与预览</div>
          </div>

          {/* Stats row */}
          <div className="flex gap-4 pt-3" style={{ borderTop: '1px solid var(--ds-divider)' }}>
            {[
              { num: '12', label: '全部文献', sub: '本月新增：12' },
              { num: '7', label: '文献领域', sub: '涉及 3 个行业领域' },
              { num: '38.7', label: '总容量占用', sub: 'MB 文献文件存储于服务器' },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-data" style={{ color: 'var(--ds-text-primary)' }}>{s.num}</div>
                <div className="text-small" style={{ color: 'var(--ds-text-secondary)' }}>{s.label}</div>
                <div className="text-caption" style={{ color: 'var(--ds-text-tertiary)' }}>{s.sub}</div>
              </div>
            ))}
          </div>

          {/* Toolbar */}
          <div className="flex items-center gap-2 pt-3" style={{ borderTop: '1px solid var(--ds-divider)' }}>
            <div className="rounded px-3 py-1.5 text-button" style={{ background: '#5264E0', color: '#fff', fontSize: 13 }}>上传文献</div>
            <div className="rounded px-3 py-1.5 text-button" style={{ background: 'transparent', border: '1px solid #3a3f4d', color: '#d0d2d8', fontSize: 13 }}>刷新</div>
            <div className="ml-auto flex items-center gap-2">
              <span className="text-caption" style={{ color: 'var(--ds-text-tertiary)' }}>全部年份</span>
              <span className="text-caption" style={{ color: 'var(--ds-text-tertiary)' }}>全部作者</span>
              <span className="text-caption" style={{ color: 'var(--ds-text-tertiary)' }}>搜索文献...</span>
            </div>
          </div>

          {/* Table preview */}
          <div className="rounded" style={{ border: '1px solid var(--ds-border)' }}>
            <div className="grid grid-cols-5 px-4 py-2" style={{ borderBottom: '1px solid var(--ds-border)', background: 'var(--ds-bg-elevated)' }}>
              {['文献标题', '文件大小', '来源/作者', '创建时间', '操作'].map((h) => (
                <div key={h} className="text-caption font-medium" style={{ color: 'var(--ds-text-tertiary)' }}>{h}</div>
              ))}
            </div>
            <div className="grid grid-cols-5 px-4 py-2.5" style={{ borderBottom: '1px solid var(--ds-divider)' }}>
              <div className="text-body truncate pr-2" style={{ color: 'var(--ds-text-primary)' }}>基于U-Net深度学习网络的风速预报订正...</div>
              <div className="text-small" style={{ color: 'var(--ds-text-secondary)' }}>1.2 MB</div>
              <div className="text-small" style={{ color: 'var(--ds-text-secondary)' }}>—</div>
              <div className="text-caption" style={{ color: 'var(--ds-text-tertiary)' }}>2025-08-20 25:00</div>
              <div className="flex gap-2">
                <span className="text-small" style={{ color: '#5264E0' }}>预览</span>
                <span className="text-small" style={{ color: '#FF6464' }}>删除</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
