export type BlockDay = {
  startTime: string;
  endTime: string;
};

export type Location = {
  [key: string]: string;
};

export type DaySlot = {
  day: string;
  startTime: string;
  endTime: string;
  locationUuid: string;
  availabilityMode?: "IN_PERSON" | "VIRTUAL";
  location: Location;
  locationName: string;
  dateRangeId?: number;
  clinicUuid?: string;
  clinicName?: string;
};

export const ALLOWED_TIMEZONES = [
  "PST",
  "CST",
  "IST",
  "AST",
  "EST",
  "MST",
  "HST",
  "PDT",
  "CDT",
  "EDT",
  "ADT",
  "MDT",
  "AKDT",
  "AKST",
] as const;

export type AllowedTimezone = (typeof ALLOWED_TIMEZONES)[number];

export type AvailabilitySetting = {
  providerId: string;
  bookingWindow: number;
  timezone: AllowedTimezone;
  initialConsultTime: number;
  followupConsultTime: number;
  bufferTime: number;
  bookBefore: string;
  blockDays: BlockDay[];
  daySlots: DaySlot[];
  startDate?: string;
  endDate?: string;
};

export const availabilityDataInitialValue = {
  providerId: "",
  bookingWindow: 0,
  timezone: "" as
    | "PST"
    | "CST"
    | "IST"
    | "AST"
    | "EST"
    | "MST"
    | "HST"
    | "PDT"
    | "CDT"
    | "EDT"
    | "ADT"
    | "MDT"
    | "AKDT"
    | "AKST",
  initialConsultTime: 15,
  followupConsultTime: 15,
  bufferTime: 0,
  bookBefore: "",
  blockDays: [],
  daySlots: [
    {
      day: "",
      startTime: "",
      endTime: "",
      locationUuid: "",
      availabilityMode: "IN_PERSON" as "IN_PERSON" | "VIRTUAL",
      location: {},
      locationName: "",
      clinicUuid: "",
  clinicName: "",
},
  ],
  startDate: "",
  endDate: "",
};

export enum DAYS {
  MONDAY = "MONDAY",
  TUESDAY = "TUESDAY",
  WEDNESDAY = "WEDNESDAY",
  THURSDAY = "THURSDAY",
  FRIDAY = "FRIDAY",
  SATURDAY = "SATURDAY",
  SUNDAY = "SUNDAY",
}

export const bookingWindowOptions = [
  { value: "1", label: "1 Week" },
  { value: "2", label: "2 Week" },
  { value: "3", label: "3 Week" },
  { value: "4", label: "4 Week" },
  { value: "5", label: "5 Week" },
  { value: "6", label: "6 Week" },
  { value: "12", label: "12 Week" },
  { value: "26", label: "26 Week" },
  { value: "52", label: "52 Week" },
];

export const AvailabilityConstants = {
  BOOKING_WINDOW: "Booking Window",
  SELECT_DAY: "Select Day",
  TIMEZONE: "Time Zone",
  SELECT_BOOKING_WINDOW: "Select Booking Window",
  SELECT_TIMEZONE: "Select Timezone",
  BOOKING_WINDOW_REQUIRED: "Booking Window is required",
  TIMEZONE_REQUIRED: "Time zone is required",
  NEW_APPOINTMENTS_TIME: "New Appointments Time",
  FOLLOWUP_APPOINTMENT_TIME: "Follow Up Appointments Time",
  MINUTES: "minutes",
  BLOCK_DAYS: "Block Days",
  FROM: "From",
  TILL: "Till",
  TO: "To",
  DATE: "Date",
  TIME: "Time",
  START_DATE_REQD: "Start date is required",
  END_DATE_REQD: "End date is required",
  DATE_REQUIRED: "Date is required",
  ENTER_FROM_TIME: "From time is required",
  ENTER_TILL_TIME: "Till time is required",
  AVAILABILITY: "Availability",
  PROVIDER_NAME: "Clinician Name",
  SELECT_PROVIDER_NAME: "Select Clinician Name",
  SET_AVAILABILITY: "Day Slot Creation",
  SLOT_CREATION_SETTING: "Slot Creation Setting",
  DAY: "Day",
  DAY_REQUIRED: "Day is required",
  LOCATION: "Location",
  ENTER_LOCATION: "Location is required",
  SELECT_LOCATION: "Select Location",
  ADD_MORE: "Add more",
  CLINICIAN: "Clinician",
  DAY_WISE_AVAILABILITY: "Day Wise Availability",
  SELECT_DATE_RANGE: "Select Range",
  ADD_AVAILABILITY: "Add Availability",
  START_DATE: "Start Date",
  END_DATE: "End Date",
  ADD_BLOCK_DAYS: "Add Block Days",
  CLINICIAN_NAME: "Clinician Name",
  FILTER_BY_CLINICIAN: "Filter By Clinician",
  SELECT_CLINICIAN_NAME: "Select Clinician Name",
  SELECT_GROUP_NAME: "Select Group Name",
};
