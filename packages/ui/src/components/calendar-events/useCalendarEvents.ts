import { useCallback, useMemo, useState } from 'react';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import type { CalendarEvent, CalendarRangeEvent, MonthEventItem } from './types';

export function isDateInRange(date: Dayjs, start: string, end: string) {
  const current = date.format('YYYY-MM-DD');
  return current >= start && current <= end;
}

export function getRangeEventForDate(date: Dayjs, rangeEvents: CalendarRangeEvent[]) {
  return rangeEvents.find((event) => isDateInRange(date, event.start, event.end));
}

export function getEventsForDate(
  date: Dayjs,
  events: Record<string, CalendarEvent>,
  rangeEvents: CalendarRangeEvent[] = [],
): CalendarEvent[] {
  const dayEvents: CalendarEvent[] = [];
  const single = events[date.format('YYYY-MM-DD')];
  const range = getRangeEventForDate(date, rangeEvents);
  if (range) dayEvents.push({ label: range.label, antColor: range.antColor });
  if (single) dayEvents.push(single);
  return dayEvents;
}

export function getEventsInMonth(
  month: Dayjs,
  events: Record<string, CalendarEvent>,
  rangeEvents: CalendarRangeEvent[] = [],
): MonthEventItem[] {
  const prefix = month.format('YYYY-MM');
  const monthStart = month.startOf('month').format('YYYY-MM-DD');
  const monthEnd = month.endOf('month').format('YYYY-MM-DD');

  const singles: MonthEventItem[] = Object.entries(events)
    .filter(([date]) => date.startsWith(prefix))
    .map(([date, meta]) => ({ date, ...meta }));

  const ranges: MonthEventItem[] = rangeEvents
    .filter((event) => event.start <= monthEnd && event.end >= monthStart)
    .map((event) => ({
      date: event.start,
      endDate: event.end,
      label: event.label,
      antColor: event.antColor,
      isRange: true,
    }));

  return [...singles, ...ranges].sort((a, b) => a.date.localeCompare(b.date));
}

export function formatEventDateRange(date: string, endDate?: string) {
  if (!endDate || date === endDate) return dayjs(date).format('M/D');
  return `${dayjs(date).format('M/D')}–${dayjs(endDate).format('M/D')}`;
}

export type UseCalendarEventsOptions = {
  events: Record<string, CalendarEvent>;
  rangeEvents?: CalendarRangeEvent[];
  defaultDate?: string | Dayjs;
};

export function useCalendarEvents({
  events,
  rangeEvents = [],
  defaultDate,
}: UseCalendarEventsOptions) {
  const [selectedDate, setSelectedDate] = useState<Dayjs>(() =>
    defaultDate ? dayjs(defaultDate) : dayjs(),
  );
  const [panelDate, setPanelDate] = useState<Dayjs>(() =>
    defaultDate ? dayjs(defaultDate) : dayjs(),
  );

  const handleSelect = useCallback((date: Dayjs) => {
    setSelectedDate(date);
    setPanelDate(date);
  }, []);

  const selectedEvents = useMemo(
    () => getEventsForDate(selectedDate, events, rangeEvents),
    [selectedDate, events, rangeEvents],
  );

  const selectedRange = useMemo(
    () => getRangeEventForDate(selectedDate, rangeEvents),
    [selectedDate, rangeEvents],
  );

  const monthEvents = useMemo(
    () => getEventsInMonth(panelDate, events, rangeEvents),
    [panelDate, events, rangeEvents],
  );

  const getDayEvents = useCallback(
    (date: Dayjs) => getEventsForDate(date, events, rangeEvents),
    [events, rangeEvents],
  );

  return {
    selectedDate,
    setSelectedDate,
    panelDate,
    setPanelDate,
    handleSelect,
    selectedEvents,
    selectedRange,
    monthEvents,
    getDayEvents,
  };
}
