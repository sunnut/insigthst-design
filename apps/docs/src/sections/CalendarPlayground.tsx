import { CalendarWithEvents } from '@insightst-design/ui'
import type { CalendarEvent, CalendarRangeEvent } from '@insightst-design/ui'
import CodeBlock from './CodeBlock'
import {
  PlaygroundRoot,
  PlaygroundHeader,
  PlaygroundSection,
  buildThemeCode,
} from './playgroundLayout'

const events: Record<string, CalendarEvent> = {
  '2025-08-05': { label: '图谱构建', antColor: 'processing' },
  '2025-08-10': { label: '自定义' },
  '2025-08-12': { label: '专家审核', antColor: 'warning' },
  '2025-08-15': { label: '论文截止', antColor: 'processing' },
  '2025-08-20': { label: '版本发布', antColor: 'success' },
  '2025-08-28': { label: '数据备份', antColor: 'error' },
}

const rangeEvents: CalendarRangeEvent[] = [
  { label: '年度评审', antColor: 'warning', start: '2025-08-22', end: '2025-08-24' },
]

const defaultSelectedDate = '2025-08-15'

function buildCalendarCode() {
  const eventsCode = Object.entries(events)
    .map(([date, e]) => (
      e.antColor
        ? `  '${date}': { label: '${e.label}', antColor: '${e.antColor}' },`
        : `  '${date}': { label: '${e.label}' },`
    ))
    .join('\n')

  const rangeEventsCode = rangeEvents
    .map((e) => `  { label: '${e.label}', antColor: '${e.antColor}', start: '${e.start}', end: '${e.end}' },`)
    .join('\n')

  return `import { CalendarWithEvents } from '@insightst-design/ui'
import type { CalendarEvent, CalendarRangeEvent } from '@insightst-design/ui'

const events: Record<string, CalendarEvent> = {
${eventsCode}
}

const rangeEvents: CalendarRangeEvent[] = [
${rangeEventsCode}
]

export function TaskCalendar() {
  return (
    <CalendarWithEvents
      events={events}
      rangeEvents={rangeEvents}
      defaultDate="${defaultSelectedDate}"
    />
  )
}`
}

export default function CalendarPlayground() {
  const { darkCode, lightCode } = buildThemeCode('日历 (Calendar)', buildCalendarCode())

  return (
    <PlaygroundRoot>
      <PlaygroundHeader hint="交互范例 · 点击日期或右侧事件列表" />

      <PlaygroundSection title="月历与事件" titleEn="Calendar & Events">
        <CalendarWithEvents
          events={events}
          rangeEvents={rangeEvents}
          defaultDate={defaultSelectedDate}
        />
      </PlaygroundSection>

      <CodeBlock darkCode={darkCode} lightCode={lightCode} />
    </PlaygroundRoot>
  )
}
