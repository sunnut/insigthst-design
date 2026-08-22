import type { CSSProperties, FC } from 'react';
import { Tag } from 'antd';
import type { CalendarEvent } from './types';

const defaultTagStyle: CSSProperties = {
  fontSize: 10,
  lineHeight: '16px',
  padding: '0 4px',
};

export type CalendarEventTagProps = {
  event: CalendarEvent;
  style?: CSSProperties;
};

export const CalendarEventTag: FC<CalendarEventTagProps> = ({ event, style }) => {
  const mergedStyle = { ...defaultTagStyle, ...style };
  return event.antColor
    ? <Tag color={event.antColor} style={mergedStyle}>{event.label}</Tag>
    : <Tag style={mergedStyle}>{event.label}</Tag>;
};
