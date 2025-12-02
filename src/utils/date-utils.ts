/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from 'moment-timezone';
import {
  BASIC_DATE_FORMAT,
  BASIC_DATE_TIME_FORMAT,
  BASIC_MONTH_DATE_FORMAT,
} from '../constants/date-format';
import { TimeZoneMap } from '../constants/timezone-map';

export const getTimeZoneValue = (key: string) => {
  switch (key) {
    case 'PST':
      return 'America/Los_Angeles';
    case 'CST':
      return 'America/Chicago';
    case 'IST':
      return 'Asia/Kolkata';
    case 'AST':
      return 'America/Halifax';
    case 'EST':
      return 'America/New_York';
    case 'MST':
      return 'America/Phoenix';
    case 'HST':
      return 'Pacific/Honolulu';
    case 'PDT':
      return 'America/Los_Angeles';
    case 'CDT':
      return 'America/Chicago';
    case 'EDT':
      return 'America/New_York';
    case 'ADT':
      return 'America/Halifax';
    case 'MDT':
      return 'America/Denver';
    case 'NDT':
      return 'America/St_Johns';
    case 'VET':
      return 'America/Caracas';
    case 'AKDT':
      return 'America/Anchorage';
    case 'AKST':
      return 'America/Anchorage';
    default:
      return key;
  }
};

export function isDaylightSavingTime(timeZoneKey: string) {
  const timeZoneValue = getTimeZoneValue(timeZoneKey);
  const now = moment();
  return now.tz(timeZoneValue).isDST();
}

export const getTimeZoneAbbreviation = () => {
  const timezone = moment.tz.guess();
  const abbreviation = moment.tz(timezone).format('z');
  return abbreviation;
};

/**Input 2023-12-17T18:30:00Z  Output 18:30:00*/
export const getTimeString = (originalDateTimeString: string) => {
  const originalDate = new Date(originalDateTimeString);

  const formattedTimeString =
    originalDate.getUTCHours().toString().padStart(2, '0') +
    ':' +
    originalDate.getUTCMinutes().toString().padStart(2, '0') +
    ':' +
    originalDate.getUTCSeconds().toString().padStart(2, '0');

  return formattedTimeString;
};

/** Required value format: 14:59:00 */
export const convertToLocalTime = (value: string | undefined | null) => {
  if (!value) {
    return '';
  }

  const [hours, minutes, seconds] = value.split(':');

  const date = new Date();
  date.setHours(+hours);
  date.setMinutes(+minutes);
  date.setSeconds(+seconds);

  const localDate = moment.utc(moment(date).format(BASIC_DATE_TIME_FORMAT)).local();

  const formattedValue = `${localDate.hours()}:${localDate.minute()}:${localDate.seconds()}`;

  const [localHours, localMinutes] = formattedValue.split(':');
  return `${String(localHours).padStart(2, '0')}:${String(localMinutes).padStart(2, '0')}`;
};

/** Required value format: 14:59:00 */
/** For displaying Local time only along with AM/PM suffix */
export const getAmPmAlternative = (value: string | undefined | null, orginalUtcTime?: string) => {
  const timeString = getTimeString(value || '');
  const localTime = convertToLocalTime(timeString);

  const [localHours, localMinutes] = localTime.split(':');
  const localHoursAmPmFormat = +localHours % 12;
  const isPM = +localHours > 11;

  //for MST only. We are not considering MDT for now so below code
  const timeInUTC = moment.utc(orginalUtcTime);
  const timeInMST = timeInUTC.utcOffset(-7);

  return orginalUtcTime
    ? timeInMST.format('h:mm A')
    : `${(localHoursAmPmFormat <= 9 && localHoursAmPmFormat > 0 && '0') || ''}${
        localHoursAmPmFormat === 0 ? '12' : localHoursAmPmFormat
      }:${localMinutes} ${isPM ? 'PM' : 'AM'}`;
};

export function convertLocalToUTC(localDate: string, timeZoneKey: string) {
  const timeZoneValue = getTimeZoneValue(timeZoneKey);

  if (!timeZoneValue) {
    throw new Error(`Timezone value not found for key: ${timeZoneKey || ''}`);
  }

  let utcDate;

  if (timeZoneKey === 'MST' && getTimeZoneAbbreviation() === 'MST') {
    utcDate = moment(localDate).utcOffset(-7).utc().format('YYYY-MM-DDTHH:mm:ss[Z]');
  } else {
    utcDate = moment.tz(localDate, timeZoneValue).utc().format('YYYY-MM-DDTHH:mm:ss[Z]');
  }

  return utcDate;
}

export const convertDateTimeToSpecifiedZoneWithoutDate = (
  startTime: string,
  endTime: string,
  timeZoneAbbr: any,
  state?: string
) => {
  const startDateAndTime = moment.utc(startTime);
  const endDateAndTime = moment.utc(endTime);

  const inputTimeZone = getTimeZoneValue(timeZoneAbbr);

  const convertedStartDate = startDateAndTime.clone().tz(inputTimeZone);
  const convertedEndDate = endDateAndTime.clone().tz(inputTimeZone);

  const date = convertedEndDate.format('YYYY-MM-DD');
  const startDateTime = convertedStartDate.format('HH:mm:ss');
  const endDateTime = convertedEndDate.format('HH:mm:ss');

  const convertedDate = convertedStartDate.format(BASIC_MONTH_DATE_FORMAT);
  const formattedStartTime = getAmPmAlternative(
    `${date}T${startDateTime}`,
    state === 'AZ' && (timeZoneAbbr === 'MST' || timeZoneAbbr === 'MDT') ? startTime : ''
  );
  const formattedEndTime = getAmPmAlternative(
    `${date}T${endDateTime}`,
    state === 'AZ' && (timeZoneAbbr === 'MST' || timeZoneAbbr === 'MDT') ? endTime : ''
  );

  return { convertedDate, formattedStartTime, formattedEndTime };
};

export const convertTime = (
  selectedTimeZone: string,
  time: string,
  utcTime?: string
) => {
  const timezone = getTimeZoneValue(selectedTimeZone);

  // Use the full UTC timestamp if provided to get correct DST calculation
  // Otherwise parse just the time (which may have DST issues)
  const formattedTime = utcTime 
    ? moment.utc(utcTime).tz(timezone)?.format('h:mm A')
    : moment.utc(time, 'HH:mm:ss').tz(timezone)?.format('h:mm A');


  return formattedTime;
};

export function checkUtcDateForPast(givenDateString: string) {
  const givenDate = moment.utc(givenDateString);

  const currentUTCDate = moment.utc();

  if (givenDate.isBefore(currentUTCDate)) {
    return currentUTCDate.format('YYYY-MM-DDTHH:mm:ss[Z]');
  } else {
    return givenDate.format('YYYY-MM-DDTHH:mm:ss[Z]');
  }
}

export const convertInSpecificTimezone = (dateTime: string, timezone: string) => {
  const timestampUtc = moment.utc(dateTime);

  const targetTimezone = moment.tz.zone(timezone)
    ? timezone
    : TimeZoneMap[timezone]
      ? TimeZoneMap[timezone]
      : moment.tz.guess();

  const timestampTargetTz = timestampUtc.tz(targetTimezone);

  const resultDateStr = timestampTargetTz.format(BASIC_DATE_FORMAT);

  return resultDateStr;
};

export const convertTimeAndDateUsingSingleValue = (startTime: string, timeZoneAbbr: any) => {
  const startDateAndTime = moment.utc(startTime);

  const inputTimeZone = getTimeZoneValue(timeZoneAbbr);

  const convertedStartDate = startDateAndTime.clone().tz(inputTimeZone);

  const date = convertedStartDate.format('YYYY-MM-DD');
  const startDateTime = convertedStartDate.format('HH:mm:ss');

  const convertedDate = convertedStartDate.format(BASIC_MONTH_DATE_FORMAT);
  const formattedStartTime = getAmPmAlternative(`${date}T${startDateTime}`);

  return { convertedDate, formattedStartTime };
};

export const formatISODate = (dateStr: string) => {
  if (!dateStr || typeof dateStr !== 'string') {
    return 'N/A';
  }
  // Extract the date part from ISO string (handles both "YYYY-MM-DD" and "YYYY-MM-DDTHH:mm:ssZ" formats)
  const datePart = dateStr.split('T')[0];
  const [year, month, day] = datePart.split('-');
  return `${month}/${day}/${year}`;
};
