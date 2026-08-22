import type { CSSProperties, FC } from 'react';
import { Calendar, Card } from 'antd';
import type { Dayjs } from 'dayjs';
import type { CalendarEventsData } from './types';
import { useCalendarEvents } from './useCalendarEvents';
import { CalendarEventTag } from './CalendarEventTag';
import { CalendarEventPanel } from './CalendarEventPanel';

export type CalendarWithEventsProps = CalendarEventsData & {
  defaultDate?: string | Dayjs;
  panelTitle?: string;
  calendarCardStyle?: CSSProperties;
  panelClassName?: string;
  showAllDayHint?: boolean;
};

const CalendarWithEvents: FC<CalendarWithEventsProps> = ({
  events,
  rangeEvents,
  defaultDate,
  panelTitle,
  calendarCardStyle,
  panelClassName,
  showAllDayHint,
}) => {
  const {
    selectedDate,
    panelDate,
    handleSelect,
    setPanelDate,
    selectedEvents,
    selectedRange,
    monthEvents,
    getDayEvents,
  } = useCalendarEvents({ events, rangeEvents, defaultDate });

  const dateCellRender = (date: Dayjs) => {
    const dayEvents = getDayEvents(date);
    if (dayEvents.length === 0) return null;
    if (dayEvents.length === 1) return <CalendarEventTag event={dayEvents[0]} />;
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {dayEvents.map((event) => (
          <span key={event.label}><CalendarEventTag event={event} /></span>
        ))}
      </div>
    );
  };

  return (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      <Card size="small" style={{ flex: '1 1 360px', minWidth: 320, ...calendarCardStyle }}>
        <Calendar
          value={selectedDate}
          onSelect={handleSelect}
          onPanelChange={setPanelDate}
          fullscreen={false}
          dateCellRender={dateCellRender}
        />
      </Card>
      <CalendarEventPanel
        selectedDate={selectedDate}
        panelDate={panelDate}
        selectedEvents={selectedEvents}
        selectedRange={selectedRange}
        monthEvents={monthEvents}
        onSelectDate={handleSelect}
        title={panelTitle}
        className={panelClassName}
        showAllDayHint={showAllDayHint}
      />
    </div>
  );
};

export default CalendarWithEvents;
export { CalendarWithEvents };
