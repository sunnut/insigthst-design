import { useState } from 'react'
import { Buttons } from '@insightst-design/ui'
import CodeBlock from './CodeBlock'
import {
  PlaygroundRoot,
  PlaygroundHeader,
  PlaygroundSection,
  buildThemeCode,
} from './playgroundLayout'

const buttonsCode = `import { Buttons } from '@insightst-design/ui'

const [region, setRegion] = useState('global')

<Buttons
  data={[
    { label: '全球', value: 'global', active: region === 'global' },
    { label: '华东', value: 'east_china', active: region === 'east_china' },
    ...['华北', '华南', '华中', '西南', '西北', '东北'].map(r => ({
      label: r,
      value: r,
      disabled: true,
    }))
  ]}
  onChange={(item) => setRegion(item.value as string)}
/>`

export default function ButtonsPlayground() {
  const [region, setRegion] = useState('global')

  const { darkCode, lightCode } = buildThemeCode('按钮组 (Buttons)', buttonsCode)

  return (
    <PlaygroundRoot>
      <PlaygroundHeader />

      <PlaygroundSection title="区域选择" titleEn="Region Selector">
        <Buttons
          data={[
            { label: '全球', value: 'global', active: region === 'global' },
            { label: '华东', value: 'east_china', active: region === 'east_china' },
            ...['华北', '华南', '华中', '西南', '西北', '东北'].map(r => ({
              label: r,
              value: r,
              disabled: true,
            }))
          ]}
          onChange={(item) => setRegion(item.value as string)}
        />
      </PlaygroundSection>

      <CodeBlock darkCode={darkCode} lightCode={lightCode} />
    </PlaygroundRoot>
  )
}
