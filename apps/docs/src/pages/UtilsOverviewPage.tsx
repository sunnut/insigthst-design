import { Link } from 'react-router'
import { ArrowRight, Globe, HardDrive } from 'lucide-react'

const utilsItems = [
  {
    slug: 'http-client',
    title: '请求工具',
    titleEn: 'HttpClient',
    color: '#5264E0',
    icon: Globe,
    desc: '基于 fetch 封装，支持 GET / POST / PUT / DELETE / PATCH 及 SSE 流式请求，永远 resolve，只需判断 success。',
    tags: ['GET', 'POST', 'SSE', '文件上传', '文件下载'],
  },
  {
    slug: 'session-manager',
    title: '本地操作',
    titleEn: 'SessionManager',
    color: '#43CB89',
    icon: HardDrive,
    desc: '对 sessionStorage 和 localStorage 的轻量封装，支持 SSR 环境，内置用户信息存取辅助方法。',
    tags: ['sessionStorage', 'localStorage', '用户信息', 'SSR 安全'],
  },
]

export default function UtilsOverviewPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-h1 mb-1" style={{ color: 'var(--ds-text-primary)' }}>工具</h1>
        <p className="text-body" style={{ color: 'var(--ds-text-secondary)' }}>
          Utils · 通用工具函数库，包含请求封装、本地存储管理等
        </p>
      </div>

      <div
        className="rounded-lg p-4"
        style={{
          background: 'rgba(82,100,224,0.06)',
          border: '1px solid rgba(82,100,224,0.15)',
        }}
      >
        <p className="text-caption" style={{ color: 'var(--ds-text-secondary)', margin: 0, lineHeight: 1.8 }}>
          安装方式：<code style={{ color: 'var(--ds-primary)' }}>npm install @insightst-design/utils</code>
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {utilsItems.map(({ slug, title, titleEn, color, icon: Icon, desc, tags }) => (
          <Link
            key={slug}
            to={`/utils/${slug}`}
            className="rounded-lg p-5 flex gap-5 hover:no-underline transition-all duration-150"
            style={{
              background: 'var(--ds-bg-card)',
              border: '1px solid var(--ds-border)',
              textDecoration: 'none',
              alignItems: 'flex-start',
            }}
          >
            <div
              className="flex items-center justify-center rounded-lg"
              style={{
                width: 44,
                height: 44,
                background: `${color}18`,
                color,
                flexShrink: 0,
                marginTop: 2,
              }}
            >
              <Icon size={22} />
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 6 }}>
                <span style={{ color: 'var(--ds-text-primary)', fontSize: 15, fontWeight: 600 }}>{title}</span>
                <span style={{ color: 'var(--ds-text-tertiary)', fontSize: 12 }}>{titleEn}</span>
              </div>
              <p className="text-caption" style={{ color: 'var(--ds-text-secondary)', margin: '0 0 10px', lineHeight: 1.7 }}>
                {desc}
              </p>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-caption"
                    style={{
                      padding: '2px 8px',
                      borderRadius: 4,
                      background: `${color}14`,
                      color,
                      fontSize: 11,
                      fontWeight: 500,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <ArrowRight size={16} style={{ color: 'var(--ds-text-tertiary)', flexShrink: 0, marginTop: 4 }} />
          </Link>
        ))}
      </div>
    </div>
  )
}
