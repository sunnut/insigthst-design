import { useState } from 'react'
import {
  KnowledgeGraph3D,
  type KnowledgeGraph3DData,
} from '@insightst-design/ui'
import CodeBlock from '../CodeBlock'
import {
  PlaygroundHeader,
  PlaygroundRoot,
  PlaygroundSection,
  buildThemeCode,
} from '../playgroundLayout'
import demo1 from './demo/demo1.json'
import demo2 from './demo/demo2.json'
import styles from './index.module.css'

type Demo1Node = (typeof demo1.nodes)[number]
type Demo1Link = (typeof demo1.relations)[number]
type Demo2Node = (typeof demo2.nodes)[number]
type Demo2Link = (typeof demo2.relations)[number]

const smallGraphData: KnowledgeGraph3DData<Demo1Node, Demo1Link> = demo1
const largeGraphData: KnowledgeGraph3DData<Demo2Node, Demo2Link> = demo2

const metaTypeColors: Record<string, string> = {
  data: '#43cb89',
  constraint: '#cba029',
  algorithm: '#2563eb',
  model: '#8b5cf6',
  metric: '#06b6d4',
  task: '#f97316',
}

const usageCode = `import { useState } from 'react'
import { KnowledgeGraph3D } from '@insightst-design/ui'
import graphData from './graph-data.json'

export default function GraphExample() {
  const [selectedId, setSelectedId] = useState<string | null>(null)

  return (
    <div style={{ height: 520 }}>
      <KnowledgeGraph3D
        data={graphData}
        selectedNodeId={selectedId}
        onSelectionChange={(node) => setSelectedId(node?.id ?? null)}
        onNodeClick={(node) => console.log('node', node)}
        onLinkClick={(link) => console.log('link', link)}
      />
    </div>
  )
}`

function DemoSummary({
  nodes,
  relations,
  selectedName,
}: {
  nodes: number
  relations: number
  selectedName?: string
}) {
  return (
    <div className={styles.summary}>
      <div className={styles.summaryStats}>
        <span className={styles.badge}>{nodes} 个节点</span>
        <span className={styles.badge}>{relations} 条关系</span>
      </div>
      <div className={styles.selection}>
        <span>当前选中</span>
        <span className={styles.selectedName}>{selectedName || '—'}</span>
      </div>
    </div>
  )
}

export default function KnowledgeGraph3DPlayground() {
  const [smallSelected, setSmallSelected] = useState<Demo1Node | null>(null)
  const [largeSelected, setLargeSelected] = useState<Demo2Node | null>(null)
  const { darkCode, lightCode } = buildThemeCode('知识图谱 3D (KnowledgeGraph3D)', usageCode)

  return (
    <PlaygroundRoot>
      <PlaygroundHeader hint="拖拽旋转 · 滚轮缩放 · 点击节点聚焦 · 点击背景清除选择" />

      <PlaygroundSection title="基础图谱" titleEn="Small Graph · demo1.json">
        <DemoSummary
          nodes={demo1.nodes.length}
          relations={demo1.relations.length}
          selectedName={smallSelected?.name}
        />
        <div className={styles.graphFrame}>
          <KnowledgeGraph3D
            data={smallGraphData}
            selectedNodeId={smallSelected?.id ?? null}
            onSelectionChange={setSmallSelected}
            renderTooltip={(node) => (
              <>
                <div className={styles.tooltipTitle}>{node.name}</div>
                <div className={styles.tooltipMeta}>
                  <span>{node.meta_type}</span>
                  <span>{node.num_relations} 条关系</span>
                  <span>{node.num_refer} 次引用</span>
                </div>
              </>
            )}
          />
        </div>
      </PlaygroundSection>

      <PlaygroundSection title="大规模图谱与外观定制" titleEn="Large Graph · demo2.json">
        <DemoSummary
          nodes={demo2.nodes.length}
          relations={demo2.relations.length}
          selectedName={largeSelected?.name}
        />
        <div className={`${styles.graphFrame} ${styles.largeGraphFrame}`}>
          <KnowledgeGraph3D
            data={largeGraphData}
            selectedNodeId={largeSelected?.id ?? null}
            onSelectionChange={setLargeSelected}
            nodeColor={(node) => metaTypeColors[node.meta_type] ?? '#5264e0'}
            nodeRadius={(node) => node.type === 'property' ? 3.8 : 6.2}
            nodeShape={(node) => node.type === 'property' ? 'diamond' : 'sphere'}
            linkWidth={0.45}
            linkDistance={(link) => link.type === 'has_property' ? 38 : 58}
            maxVisibleLabels={48}
            showLinkArrows={false}
            renderTooltip={(node) => (
              <>
                <div className={styles.tooltipTitle}>{node.name}</div>
                <div className={styles.tooltipMeta}>
                  <span>{node.type}</span>
                  <span>{node.meta_type}</span>
                  <span>层级 {node.layer}</span>
                </div>
              </>
            )}
          />
        </div>
      </PlaygroundSection>

      <PlaygroundSection title="基础用法" titleEn="Usage">
        <CodeBlock darkCode={darkCode} lightCode={lightCode} />
      </PlaygroundSection>
    </PlaygroundRoot>
  )
}
