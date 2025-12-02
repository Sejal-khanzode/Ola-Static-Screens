export namespace AvailableSlot {
  export enum status {
    BOOKED = 'BOOKED',
    AVAILABLE = 'AVAILABLE',
    HOLD = 'HOLD',
    NOT_AVAILABLE = 'NOT_AVAILABLE',
  }

  export enum timeZone {
    EST = 'EST',
    MST = 'MST',
    HST = 'HST',
    PST = 'PST',
    CST = 'CST',
    IST = 'IST',
    AST = 'AST',
  }
}

export type AvailableSlot = {
  date?: string;
  duration?: number;
  status?: AvailableSlot.status;
  start?: string;
  end?: string;
  timeZone?: AvailableSlot.timeZone;
};

export const schedulingConstants = {
  FILTER: 'Filter',
  SEARCH_BY_PATIENT: 'Search By Patient',
  SEARCH_BY_PROVIDER: 'Search By Clinician',
  LOCATIONS: 'Locations',
  STATUS: 'Status',
  APPOINTMENT_TYPES: 'Appointment Types',
  APPOINTMENTS: 'Appointments',
  UNSIGNED_VISITS: 'Unsigned Visits',
  SCHEDULE_APPOINTMENT: 'Schedule Appointment',
  SEARCH: 'Search',
  SEARCH_AND_SELECT: 'Search & Select',
  TODAY: 'Today',
  DAY: 'Day',
  WEEK: 'Week',
  MONTH: 'Month',
  ALL: 'All',
  SIGNED: 'Signed',
  UNSIGNED: 'Unsigned',
  NEW_APPOINTMENT: 'New Appointment',
  INSTANT_APPOINTMENT: 'Instant Appointment',
  SEARCH_BY_LOCATION: 'Search by Location',
  APPOINTMENT_MODE: 'Appointment Mode',
  IN_PERSON: 'In Person',
  VIRTUAL: 'Virtual',
  DATE_TIME: 'Date & Time',
  PROVIDER_NAME: 'Clinician Name',
  LOCATION: 'Location',
  COMPLETE_INTAKE_FORM: 'Complete Intake Form',
  CANCEL_APPOINTMENT: 'Cancel',
  RESCHEDULE_APPOINTMENT: 'Reschedule',
  JOIN_VISIT: 'Join Visit',
  UPCOMING_APPOINTMENT: 'Upcoming Appointment',
  REQUEST_APPOINTMENT: 'Request Appointment',
  PAST_APPOINTMENT: 'Past Appointment',
  RESCHEDULE: 'RESCHEDULE',
  CANCELLED: 'CANCELLED',
  NO_SHOW: 'NO_SHOW',
  PROVIDER: 'Provider :',
  DATE: 'Date :',
  DURATION: 'Duration',
  TIME: 'Time :',
  REASON_FOR_CANCELLATION: 'Reason for cancelling',
  CANCEL_REASON: 'Enter reason for cancellation',
  PATIENT: 'Patient',
  APPT_TYPE: 'Appt. Type',
  CLINICIAN: 'Clinician :',
  NO_PAST_APPT: "No Past Appointments",
};

export const newAppointment = {
  SCHEDULE_NEW_APPOINTMENT: 'Schedule New Appointment',
  PATIENT_NAME: 'Patient Name',
  SEARCH_PATIENT: 'Search Patient',
  APPOINTMENT_MODE: 'Appointment Mode',
  IN_PERSON: 'In Person',
  VIDEO_CALL: 'Video Call',
  HOME: 'Home',
  LOCATION: 'Location',
  SELECT_LOCATION: 'Select Location',
  PROVIDER: 'Clinician',
  SEARCH_PROVIDER: 'Search Clinician',
  APPOINTMENT_TYPE: 'Appointment Type',
  SELECT_TYPE: 'Select Type',
  ESTIMATED_AMOUNT: 'Estimated Amount ($)',
  ENTER_AMOUNT: 'Enter Amount',
  DATE_AND_TIME: 'Date & Time',
  CHOOSE_DATE: 'Choose Date',
  REPEAT: 'Repeat',
  CHIEF_COMPLAINT: 'Chief Complaint',
  REASON: 'Reason',
  SEND_FORM: 'Send Form',
  SEARCH_AND_SELECT_FORMS: 'Search & Select Forms',
  NEW_PATIENT: 'New Patient',
  SELECT_PATIENT: 'Select Patient',
  SELECT_PROVIDER: 'Select Clinician',
  ENTER_ESTIMATED_AMOUNT: 'Enter Estimated Amount',
  APPT_DATE_TIME: 'Appt. Date & Time',
  CANCE_APPT_REQ: 'Cancel Appointment Request',
  BOOK_APPT_REQ: 'Book Appointment Request',
  APPT_REQ: 'Appointment Request',
  APPROVE_CANCELLATION: 'Approve Cancellation',
  REJ_CANCELLATION: 'Reject Cancellation',
  REJECT_REASON: "Enter reason for rejection'",
};

export const instantAppointment = {
  INSTANT_APPOINTMENT: 'Instant appointment',
  ENTER_EMAIL_OR_SEARCH_PATIENT: 'enter email or search patient',
  SEARCH_EMAIL_PATIENT: 'Search email patient',
  NOTE: 'Note',
  TYPE_HERE: 'Type Here',
  COPY_APPOINTMENT_URL: 'Copy Appointment URL',
  INVITE_VIA_OLA_EHR: 'Invite via Ola EHR',
  CANCEL: 'Cancel',
  START_VISIT: 'Start Visit',
};

export const newPatient = {
  NEW_PATIENT: 'New Patient',
  FIRST_NAME: 'First Name',
  ENTER_FIRST_NAME: 'Enter First Name',
  MIDDLE_NAME: 'Middle Name',
  ENTER_MIDDLE_NAME: 'Enter Middle Name',
  LAST_NAME: 'Last Name',
  ENTER_LAST_NAME: 'Enter Last Name',
  LAST_PROVIDER: 'Last Provider',
  SEARCH_LAST_PROVIDER: 'Search Last Provider',
  ENTER_SEARCH_LAST_PROVIDER: 'Enter Search Last Provider',
  DATE_OF_BIRTH: 'Bate of Birth',
  CHOOSE_DATE: 'Choose Date',
  GENDER: 'Gender',
  ENTER_GENDER: 'Enter Gender',
  EMAIL_ID: 'Email ID',
  ENTER_EMAIL_ID: 'Enter Email ID',
  MOBILE_NUMBER: 'Mobile Number',
  ENTER_MOBILE_NUMBER: 'Enter Mobile NUmber',
  EMERGENCY_CONTAT_NUMBER: 'Emergency Contact Number',
  ENTER_EMERGENCY_CONTACT_NUMBER: 'Enter Emergency Contact Number',
  ADD: 'Add',
};

export const scheduleAppointment = {
  PATIENT_NAME_IS_REQUIRED: 'Patient Name is required',
  PROVIDER_IS_REQUIRED: 'Clinician is required',
  LOCATION_IS_REQUIRED: 'Location is required',
  REASON_FOR_VISIT_IS_REQUIRED: 'Reason for Visit is required',
  APPOINTMENT_TYPE_IS_REQUIRED: 'Appointment Type is required',
};

export const requestAppointmentConstants = {
  REQ_APPT: 'Requested Appointments',
  NO_REQ_APPTS: 'No requested appointments found',
};

