declare module 'react-big-calendar' {
  import { ComponentType } from 'react';

  export interface CalendarProps {
    localizer: any;
    events: Array<{
      title: string;
      start: Date;
      end: Date;
      [key: string]: any;
    }>;
    defaultView?: 'day' | 'week' | 'month';
    views?: Array<'day' | 'week' | 'month'>;
    step?: number;
    defaultDate?: Date;
    style?: React.CSSProperties;
    [key: string]: any;
  }

  export const Calendar: ComponentType<CalendarProps>;
  export const dateFnsLocalizer: (config: {
    format: any;
    parse: any;
    startOfWeek: any;
    getDay: any;
    locales: any;
  }) => any;
} 