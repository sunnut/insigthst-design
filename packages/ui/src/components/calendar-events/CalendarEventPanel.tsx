import type { FC, ReactNode } from 'react';
import { Card, Typography } from 'antd';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { ClockCircleOutlined } from '@insightst-design/icons';
import type { AntTagColor, CalendarEvent, CalendarRangeEvent, MonthEventItem } from './types';
import { formatEventDateRange } from './useCalendarEvents';
import { CalendarEventTag } from './CalendarEventTag';
import styles from './view.module.css';

const { Text } = Typography;

const antColorCss: Record<AntTagColor, string> = {
  processing: 'var(--ds-primary)',
  success: 'var(--ds-success)',
  warning: 'var(--ds-warning)',
  error: 'var(--ds-danger)',
};

export function getEventAccentColor(antColor?: AntTagColor) {
  return antColor ? antColorCss[antColor] : 'var(--ds-text-secondary)';
}

export type CalendarEventPanelProps = {
  selectedDate: Dayjs;
  panelDate: Dayjs;
  selectedEvents: CalendarEvent[];
  selectedRange?: CalendarRangeEvent;
  monthEvents: MonthEventItem[];
  onSelectDate: (date: Dayjs) => void;
  title?: ReactNode;
  emptyText?: string;
  monthEmptyText?: string;
  showAllDayHint?: boolean;
  size?: 'default' | 'small';
  className?: string;
};

export const CalendarEventPanel: FC<CalendarEventPanelProps> = ({
  selectedDate,
  panelDate,
  selectedEvents,
  selectedRange,
  monthEvents,
  onSelectDate,
  title = '事件详情',
  emptyText = '暂无事件',
  monthEmptyText = '无',
  showAllDayHint = true,
  size = 'small',
  className,
}) => (
  <Card size={size} title={title} className={className ?? styles.panel}>
    <Text type="secondary" className={styles.dateLabel}>
      {selectedDate.format('M月D日')}
    </Text>
    {selectedEvents.length > 0 ? (
      <div>
        <div className={styles.eventList}>
          {selectedEvents.map((event) => (
            <span key={event.label}><CalendarEventTag event={event} /></span>
          ))}
        </div>
        {selectedRange && selectedRange.start !== selectedRange.end && (
          <Text type="secondary" className={styles.rangeHint}>
            跨天 · {dayjs(selectedRange.start).format('M月D日')} – {dayjs(selectedRange.end).format('M月D日')}
          </Text>
        )}
        {showAllDayHint && (
          <div className={styles.allDayHint}>
            <Text type="secondary" style={{ fontSize: 11 }}>
              <ClockCircleOutlined style={{ fontSize: 10 }} /> 全天事件
            </Text>
          </div>
        )}
      </div>
    ) : (
      <Text type="secondary" className={styles.emptyText}>{emptyText}</Text>
    )}

    <div className={styles.monthSection}>
      <Text type="secondary" className={styles.monthTitle}>
        {panelDate.format('M月')}事件
      </Text>
      {monthEvents.length > 0 ? monthEvents.map((ev) => (
        <div
          key={ev.isRange ? `${ev.date}-${ev.endDate}` : ev.date}
          className={styles.monthItem}
          onClick={() => onSelectDate(dayjs(ev.date))}
        >
          <span
            className={styles.monthDot}
            style={{ background: getEventAccentColor(ev.antColor) }}
          />
          <Text type="secondary" className={styles.monthDate}>
            {formatEventDateRange(ev.date, ev.endDate)}
          </Text>
          <Text className={styles.monthLabel} style={{ color: getEventAccentColor(ev.antColor) }}>
            {ev.label}
          </Text>
        </div>
      )) : (
        <Text type="secondary" className={styles.emptyText}>{monthEmptyText}</Text>
      )}
    </div>
  </Card>
);
