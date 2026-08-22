import { Suspense, lazy } from 'react'
import PageLoading from '../components/PageLoading'

const IconsSection = lazy(() => import('../sections/IconsSection'))

export default function IconsPage() {
  return (
    <Suspense fallback={<PageLoading />}>
      <IconsSection />
    </Suspense>
  )
}
