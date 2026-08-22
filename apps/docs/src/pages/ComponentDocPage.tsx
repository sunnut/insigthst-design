import { Suspense } from 'react'
import { Navigate, useParams } from 'react-router'
import { componentSections } from '../sections/componentSections'
import PageLoading from '../components/PageLoading'

export default function ComponentDocPage({ slug: slugProp }: { slug?: string } = {}) {
  const params = useParams<{ slug: string }>()
  const slug = slugProp ?? params.slug
  const section = componentSections.find((item) => item.slug === slug)

  if (!section) {
    return <Navigate to="/components/button" replace />
  }

  const { Component, title, titleEn, color } = section

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-h1 mb-1" style={{ color: 'var(--ds-text-primary)' }}>组件规范</h1>
        <p className="text-body" style={{ color: 'var(--ds-text-secondary)' }}>
          Components · 所有组件支持交互，切换明暗主题可查看不同配色代码
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
