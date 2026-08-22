import { Suspense } from 'react'
import { Navigate, useParams } from 'react-router'
import { hooksSections } from '../sections/hooksSections'
import PageLoading from '../components/PageLoading'

export default function HooksDocPage() {
  const { slug } = useParams<{ slug: string }>()
  const section = hooksSections.find((item) => item.slug === slug)

  if (!section) {
    return <Navigate to="/hooks/use-fetch" replace />
  }

  const { Component, title, titleEn, color } = section

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-h1 mb-1" style={{ color: 'var(--ds-text-primary)' }}>Hooks组件文档</h1>
        <p className="text-body" style={{ color: 'var(--ds-text-secondary)' }}>
          Hooks · @insightst-design/hooks 组件库 Hooks
        </p>
      </div>

      <section>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-1 h-5 rounded-full" style={{ background: color }} />
          <h2 className="text-h2" style={{ color: 'var(--ds-text-primary)' }}>{title}</h2>
          <span className="text-caption" style={{ color: 'var(--ds-text-tertiary)' }}>{titleEn}</span>
        </div>
        <div
          className="rounded-lg p-6"
          style={{ background: 'var(--ds-bg-card)', border: '1px solid var(--ds-border)' }}
        >
          <Suspense fallback={<PageLoading />}>
            <Component />
          </Suspense>
        </div>
      </section>
    </div>
  )
}
