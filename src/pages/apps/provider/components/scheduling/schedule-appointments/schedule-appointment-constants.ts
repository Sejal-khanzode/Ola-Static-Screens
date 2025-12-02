import { StatusAndTypes } from 'src/components/core/reusable/calendar/lib/components/common/statuses-types';

export enum AppointmentViewOptions {
  LIST = 'LIST',
  CALENDAR = 'CALENDAR',
}

export const AppointmentModeOptions = [
  { label: 'In-Person', value: 'IN_PERSON' },
  { label: 'Virtual', value: 'VIRTUAL' },
];

export const AppointmentStatusTypeList = [
  { label: 'Scheduled', value: StatusAndTypes.SCHEDULED },
  { label: 'Cancelled', value: StatusAndTypes.CANCELLED },
  { label: 'Completed', value: StatusAndTypes.COMPLETED },
  { label: 'No show', value: StatusAndTypes.NO_SHOW },
  { label: 'Checked In', value: StatusAndTypes.CHECKED_IN },
  { label: 'In session', value: StatusAndTypes.IN_SESSION },
];

export const appointmentStatusColors = [
  { name: 'Scheduled', colorCode: '#4873B9' },
  { name: 'Cancelled', colorCode: '#B42318' },
  { name: 'Confirmed', colorCode: '#1fb577' },
  { name: 'In Exam', colorCode: '#9688FF' },
  { name: 'No Show', colorCode: '#767676' },
  { name: 'Pending', colorCode: '#e6be49' },
];

export const AppointmentConstants = {
  APPOINTMENT_STATUS: 'Appointment Status',
};
