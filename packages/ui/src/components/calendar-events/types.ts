export type AntTagColor = 'processing' | 'success' | 'warning' | 'error';

export type CalendarEvent = {
  label: string;
  antColor?: AntTagColor;
};

export type CalendarRangeEvent = CalendarEvent & {
  start: string;
  end: string;
};

export type MonthEventItem = CalendarEvent & {
  date: string;
  endDate?: string;
  isRange?: boolean;
};

export type CalendarEventsData = {
  events: Record<string, CalendarEvent>;
  rangeEvents?: CalendarRangeEvent[];
};
