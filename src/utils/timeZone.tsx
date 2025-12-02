import { isDaylightSavingTime } from './date-utils';
import moment from 'moment';

export const getDayLightTimeZoneValue = (key: string) => {
  switch (key) {
    case 'PST':
      return isDaylightSavingTime('America/Los_Angeles') ? 'PDT' : 'PST';
    case 'CST':
      return isDaylightSavingTime('America/Chicago') ? 'CDT' : 'CST';
    case 'IST':
      return 'IST';
    case 'AST':
      return isDaylightSavingTime('America/Halifax') ? 'ADT' : 'AST';
    case 'EST':
      return isDaylightSavingTime('America/New_York') ? 'EDT' : 'EST';
    case 'MST':
      return 'MST';
    case 'MDT':
      return 'MDT';
    case 'AKST':
      return isDaylightSavingTime('America/Anchorage') ? 'AKDT' : 'AKST';
    case 'HST':
      return 'HST';
    default:
      return key;
  }
};

export const getTimeZoneFullName = (key: string) => {
  switch (key) {
    case 'PST':
    case 'PDT':
      return isDaylightSavingTime('America/Los_Angeles')
        ? 'Pacific Daylight Time (GMT -7:00)'
        : 'Pacific Standard Time (GMT -8:00)';
    case 'CST':
    case 'CDT':
      return isDaylightSavingTime('America/Chicago')
        ? 'Central Daylight Time (GMT -5:00)'
        : 'Central Standard Time (GMT -6:00)';
    case 'MST':
    case 'MDT':
      return isDaylightSavingTime('America/Denver')
        ? 'Mountain Daylight Time (GMT -6:00)'
        : 'Mountain Standard Time (GMT -7:00)';
    case 'IST':
      return 'Indian Standard Time (GMT +5:30)';
    case 'AST':
    case 'ADT':
      return isDaylightSavingTime('America/Halifax')
        ? 'Atlantic Daylight Time (GMT -3:00)'
        : 'Atlantic Standard Time (GMT -4:00)';
    case 'EST':
    case 'EDT':
      return isDaylightSavingTime('America/New_York')
        ? 'Eastern Daylight Time (GMT -4:00)'
        : 'Eastern Standard Time (GMT -5:00)';
    case 'AKDT':
    case 'AKST':
      return isDaylightSavingTime('America/Anchorage')
        ? 'Alaska Daylight Time (GMT -8:00)'
        : 'Alaska Standard Time (GMT -9:00)';
    case 'HST':
      return 'Hawaii Standard Time (GMT -10:00)';
    default:
      return key;
  }
};

export const timeZoneType = [
  { key: 'IST', value: 'IST (GMT +5:30)' },

  {
    key: isDaylightSavingTime('America/New_York') ? 'EDT' : 'EST',
    value: isDaylightSavingTime('America/New_York') ? 'EDT (GMT -4:00)' : 'EST (GMT -5:00)',
  },
  {
    key: 'MST',
    value: 'MST (GMT -7:00)',
  },
  { key: 'HST', value: 'HST (GMT -10:00)' },
  {
    key: isDaylightSavingTime('America/Los_Angeles') ? 'PDT' : 'PST',
    value: isDaylightSavingTime('America/Los_Angeles') ? 'PDT (GMT -7:00)' : 'PST (GMT -8:00)',
  },
  {
    key: isDaylightSavingTime('America/Chicago') ? 'CDT' : 'CST',
    value: isDaylightSavingTime('America/Chicago') ? 'CDT (GMT -5:00)' : 'CST (GMT -6:00)',
  },
  {
    key: isDaylightSavingTime('America/Halifax') ? 'ADT' : 'AST',
    value: isDaylightSavingTime('America/Halifax') ? 'ADT (GMT -3:00)' : 'AST (GMT -4:00)',
  },
  {
    key: isDaylightSavingTime('America/Anchorage') ? 'AKDT' : 'AKST',
    value: isDaylightSavingTime('America/Anchorage') ? 'ADT (GMT -8:00)' : 'AST (GMT -9:00)',
  },
];

export const dynamicTimeZone = !isDaylightSavingTime('America/Denver')
  ? [...timeZoneType]
  : [
      ...timeZoneType,
      {
        key: 'MDT',
        value: 'Mountain Daylight Time (GMT -6:00)',
      },
    ];

export const getTimeZoneFullNameAll = (key: string) => {
  switch (key) {
    case 'PST':
      return 'Pacific Standard Time (GMT -8:00)';
    case 'PDT':
      return 'Pacific Daylight Time (GMT -7:00)';

    case 'CST':
      return 'Central Standard Time (GMT -6:00)';
    case 'CDT':
      return 'Central Daylight Time (GMT -5:00)';

    case 'MST':
      return 'Mountain Standard Time (GMT -7:00)';
    case 'MDT':
      return 'Mountain Daylight Time (GMT -6:00)';

    case 'IST':
      return 'Indian Standard Time (GMT +5:30)';
    case 'AST':
      return 'Atlantic Standard Time (GMT -4:00)';
    case 'ADT':
      return 'Atlantic Daylight Time (GMT -3:00)';
    case 'EST':
      return 'Eastern Standard Time (GMT -5:00)';
    case 'EDT':
      return 'Eastern Daylight Time (GMT -4:00)';
    case 'AKDT':
      return 'Alaska Daylight Time (GMT -8:00)';
    case 'AKST':
      return 'Alaska Standard Time (GMT -9:00)';
    case 'HST':
      return 'Hawaii Standard Time (GMT -10:00)';
    default:
      return key;
  }
};

export const adjustTimeForDST = (dateTime: string, selectedTimeZone: string): string => {
  // Check if the date is in DST (Daylight Saving Time) using Denver timezone
  const dateInDenver = moment.tz(dateTime, 'America/Denver');
  const isDST = dateInDenver.isDST();

  // If standard time (ST), keep dateTime as it is
  // If daylight time ( DST), add one hour
  if (isDST && selectedTimeZone != 'IST') {
    return moment(dateTime).add(1, 'hour').toISOString();
  }

  return dateTime;
};

export const standardTimeZoneType = [
  { key: 'IST', value: 'Indian Standard Time (GMT +5:30)' },

  {
    key: 'EST',
    value: 'Eastern Standard Time (GMT -5:00)',
  },
  {
    key: 'MST',
    value: 'Mountain Standard Time (GMT -7:00)',
  },
  { key: 'HST', value: 'Hawaii Standard Time (GMT -10:00)' },
  {
    key: 'PST',
    value: 'Pacific Standard Time (GMT -8:00)',
  },
  {
    key: 'CST',
    value: 'Central Standard Time (GMT -6:00)',
  },
  {
    key: 'AST',
    value: 'Atlantic Standard Time (GMT -4:00)',
  },
  {
    key: 'AKST',
    value: 'Alaska Standard Time (GMT -9:00)',
  },
];
