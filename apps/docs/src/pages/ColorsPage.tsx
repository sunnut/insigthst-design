import { Suspense, useState } from 'react'
import ColorsSection from '../sections/ColorsSection'
import PageLoading from '../components/PageLoading'

export default function ColorsPage() {
  const [copied, setCopied] = useState<string | null>(null)

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(text)
      setTimeout(() => setCopied(null), 1500)
    })
  }

  return (
    <Suspense fallback={<PageLoading />}>
      <ColorsSection onCopy={handleCopy} copied={copied} />
    </Suspense>
  )
}
