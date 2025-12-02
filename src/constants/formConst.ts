export enum ValidationMessages {
  OtpRequired = 'OTP is required',
  OtpLength = 'OTP must be exactly 6 digits',
  OtpInvalid = 'Invalid OTP. Please try again.',
  NewPasswordRequired = 'Please enter your new password',
  PasswordMinLength = 'Password must be at least 6 characters',
  ConfirmPasswordRequired = 'Please confirm your password',
  PasswordsMustMatch = 'Passwords must match',
  EmailRequired = 'Email is required',
  ValidEmailRequired = 'Please enter a valid Email',
  EmailMaxLength = 'Email should be at most 255 characters',
  PasswordRequired = 'Password is required',
  PasswordNoSpaces = 'Password cannot contain spaces',
  LOCATION_REQUIRED = 'Location name is required',
  LOC_ERR = "Location name should only contain letters, numbers, and spaces'",
  SELECT_STATUS = 'Select Status',
  FIRST_NAME_REQUIRED = 'First name is required',
  LAST_NAME_REQUIRED = 'Last name is required',
  EMAIL_ID_REQUIRED = 'Email ID is required',
  CONTACT_NUMBER_REQUIRED = 'Contact number is required',
  ROLE_REQUIRED = 'Role is required',
  SPECIALITY_REQUIRED = 'At least one speciality is required',
  GENDER_REQUIRED = 'Gender is required',
  NPI_NUMBER_REQUIRED = 'NPI number is required',
  START_DATE_REQUIRED = 'Start date is required',
  END_DATE_REQUIRED = 'End date is required',
  NPI_NUMBER_MIN_LENGTH = 'NPI number must be exactly 10 digits',
  NPI_NUMBER_MAX_LENGTH = 'NPI number must be exactly 10 digits',
  LICENCED_STATE_REQUIRED = 'Licensed state is required',
  PROVIDER_TYPE_REQUIRED = 'Clinician type is required',
  OLD_PASSWORD_REQUIRED = 'Please enter current password',
  NEW_PASSWORD_REQUIRED = 'Please enter your new password',
  CONFIRM_PASSWORD_REQUIRED = 'Please confirm your password',
  PASSWORD_MIN_LENGTH = 'Password must be at least 6 characters long',
  PASSWORD_NO_SPACES = 'Password cannot contain spaces',
  PASSWORD_MATCH = 'Passwords must match',
  PASSWORD_NO_ONE_OF = 'New password must be different from the current password',
  LICENSE_NUMBER_REQUIRED = 'License number is required',
  LICENSE_NUMBER_MIN_LENGTH = 'License number must be at least 5 characters',
  LICENSE_NUMBER_MAX_LENGTH = 'License number must be at most 10 characters',
  LICENSE_EXPIRY_DATE_REQUIRED = 'License expiry date is required',
  FIRST_NAME_ALPHABETS = 'First Name should only contain alphabets',
  LAST_NAME_ALPHABETS = 'Last Name should only contain alphabets',
  CONTACT_NUMBER_MIN_LENGTH = 'Contact Number must be of minimum 10 digits',
  CONTACT_NUMBER_MAX_LENGTH = 'Contact Number must be at most 10 digits',
  LICENSE_NUMBER_ALPHANUMERIC = 'License number must be 5 to 10 alphanumeric characters',
  CLINIC_NAME_REQUIRED = 'Clinic name is required',
  GROUP_NPI_NUMBER_REQUIRED = 'Group NPI number is required',
  LINE_1_REQUIRED = 'Line 1 is required',
  CITY_REQUIRED = 'City is required',
  STATE_REQUIRED = 'State is required',
  ZIP_CODE_REQUIRED = 'Zip code is required',
  ZIP_CODE_FORMAT = 'Zipcode should be either 5 or 9 digits',
  COUNTRY_REQUIRED = 'Country is required',
  DATE_OF_BIRTH_REQUIRED = 'Date of birth is required',
  PAYMENT_METHOD_REQUIRED = 'Payment method is required',
  INSURANCE_NAME_REQUIRED = 'Insurance name is required',
  MEMBER_ID_REQUIRED = 'Member ID is required',
  GROUP_ID_REQUIRED = 'Group ID is required',
  PATIENT_RELATIONSHIP_REQUIRED = 'Patient relationship is required',
  SUBSCRIBER_FIRST_NAME_REQUIRED = 'Subscriber first name is required',
  SUBSCRIBER_LAST_NAME_REQUIRED = 'Subscriber last name is required',
  SUBSCRIBER_DATE_OF_BIRTH_REQUIRED = 'Subscriber date of birth is required',
  SECONDARY_INSURANCE_NAME_REQUIRED = 'Secondary insurance name is required',
  SECONDARY_MEMBER_ID_REQUIRED = 'Secondary member ID is required',
  SECONDARY_GROUP_ID_REQUIRED = 'Secondary group ID is required',
  SECONDARY_PATIENT_RELATIONSHIP_REQUIRED = 'Secondary patient relationship is required',
  SECONDARY_SUBSCRIBER_FIRST_NAME_REQUIRED = 'Secondary subscriber first name is required',
  SECONDARY_SUBSCRIBER_LAST_NAME_REQUIRED = 'Secondary subscriber last name is required',
  SECONDARY_SUBSCRIBER_DATE_OF_BIRTH_REQUIRED = 'Secondary subscriber date of birth is required',
  INSURANCE_TYPE_REQUIRED = 'Insurance type is required',
  ADDRESS_LINE_1_REQUIRED = 'Address line 1 is required',
  PHONE_NUMBER_FORMAT = 'Phone number must be exactly 10 digits',
  PHONE_NUMBER_REQUIRED = 'Phone number is required',
  PRIMARY_CLINICIAN_REQUIRED = 'Primary clinician is required',
  NAME_REQUIRED = 'Name is required',
  INSURANCE_REQUIRED = 'At least one insurance is required',
  SSN_FORMAT = 'SSN must be exactly 4 digits',
  ALLERGY_TYPE_REQUIRED = 'Allergy type is required',
  ALLERGY_NAME_REQUIRED = 'Allergy name is required',
  REACTION_REQUIRED = 'Reaction is required',
  SEVERITY_REQUIRED = 'Severity is required',
  ON_SET_DATE_REQUIRED = 'Onset date is required',
  RECORDED_DATE_REQUIRED = 'Recorded date is required',
  RECORDED_BY_REQUIRED = 'Recorded by is required',
  DIAGNOSIS_REQUIRED = 'Diagnosis is required',
  DIAGNOSIS_CODE_REQUIRED = 'Diagnosis code is required',
  DIAGNOSIS_DESCRIPTION_REQUIRED = 'Diagnosis description is required',
  DIAGNOSIS_TYPE_REQUIRED = 'Diagnosis type is required',
  STATUS_REQUIRED = 'Status is required',
  DOCUMENT_TYPE_REQUIRED = 'Document type is required',
  DATE_REQUIRED = 'Date is required',
  DOCUMENT_REQUIRED = 'Document is required',
  DOCUMENT_NAME_REQUIRED = 'Document name is required',
  DOCUMENT_FILE_REQUIRED = 'Document file is required',
  PROBLEM_NAME_REQUIRED = 'Problem name is required',
  RELATIVE_REQUIRED = 'Relative is required',
  ON_SET_AGE_REQUIRED = 'Onset age is required',
  CONDITION_NAME_REQUIRED = 'Condition name is required',
  SURGERY_NAME_REQUIRED = 'Surgery name is required',
  END_DATE_AFTER_START_DATE = 'End date must be after start date',
  MEDICINES_REQUIRED = 'Medicines is required',
  SIG_REQUIRED = 'Sig is required',
  ROUTE_REQUIRED = 'Route is required',
  CONTACT_NUMBER_FORMAT = 'Contact number must be exactly 10 digits',
  SELECT_ATLEAST_ONE_FLAG = 'Please select at least one flag',
  FLAG_NAME_REQUIRED = 'Flag Name is required',
  FLAG_COLOR_REQUIRED = 'Flag Color is required',
  DURATION_REQUIRED = 'Duration is required',
  DURATION_CANNOT_0 = 'Duration cannot be 0',
}

export enum SettingsFormMessages {
  MAX_FILE_SIZE = 'Maximum file size: 5MB',
  SUPPORTED_FILES = 'Supported files: PNG, JPG, JPEG',
}

export enum ViewMode {
  EDIT = 'Edit',
  VIEW = 'View',
  DELETE = 'Delete',
  RESTORE = 'Restore',
  OPEN_CHART = 'Open Chart',
  RESCHEDULE = 'Reschedule',
  CANCEL = 'Cancel',
  CONNECT_TO_VIDEO = 'Connect to Video',
  VIEW_NOTE = 'View Note',
  NO_SHOW = 'No-show',
  CLOSER_NOTE = 'Closer note',
  CONSULT_NOTE = 'Consult note',
  VIEW_CLOSER_NOTE = 'View closer note',
  VIEW_CONSULT_NOTE = 'View consult note',
  COPY = 'Copy',
  CONFIRM = 'Confirm',
}

export enum UnsubscribeReason {
  CONTENT_NOT_RELEVANT = 'CONTENT_NOT_RELEVANT',
  TOO_MANY_EMAILS = 'TOO_MANY_EMAILS',
  FOUND_ALTERNATIVE_SERVICES = 'FOUND_ALTERNATIVE_SERVICES',
  NO_LONGER_INTERESTED = 'NO_LONGER_INTERESTED',
  OTHER = 'OTHER',
}

export enum AppointmentStatus {
  COMPLETED = 'COMPLETED',
  NO_SHOW = 'NO_SHOW',
  CANCELLED = 'CANCELLED',
  SCHEDULED = 'SCHEDULED',
  CHECKED_IN = 'CHECKED_IN',
  PENDING = 'PENDING',
  IN_EXAM = 'IN_EXAM',
  CONFIRMED = 'CONFIRMED',
}

export enum PatientProfileToggleRoutes {
  PROFILE = 'Profile',
  LOGIN_HISTORY = 'Login History',
  PAYMENT_CARDS = 'Payment Cards',
}

export enum PatientInsuranceToggleRoutes {
  PLAN = 'Plan',
  VERIFICATION = 'Verification',
  AUTHORIZATION = 'Authorization',
}

export enum PatientInsurancePlan {
  PRIMARY_INSURANCE = 'Primary Insurance',
  SECONDARY_INSURANCE = 'Secondary Insurance',
  INSURANCE_TYPE = 'Insurance Type',
  PLAN_NAME = 'Plan Name',
  PLAN_TYPE = 'Plan Type',
  PATIENT_RELATIONSHIP_WITH_IMPORTANCE = 'Patient Relationship with Importance (Self)',
  NAME = 'Name',
  DATE_OF_BIRTH = 'Date of Birth',
  GENDER = 'Gender',
  SET_AS_PRIMARY = 'Set As Primary',
}

export enum PatientNavCardLabels {
  PATIENT_BALANCE = 'Patient Balance',
  PRIMARY_CLINICIAN = 'Primary Clinician',
  LAST_VISIT_DATE_AND_TIME = 'Last Visit Date and Time',
  ALERT_NOTE = 'Alert Note',
  NOTES = 'Notes',
}

export enum PatientProfileOutletLabels {
  DEMOGRAPHICS = 'Demographics',
  GUARDIAN_INFORMATION = 'Guardian Information',
  EMERGENCY_CONTACT_DETAILS = 'Emergency Contact Details',
  CLINICIANS = 'Clinicians',
  PRIVACY = 'Privacy ',
  PAYMENT_METHOD = 'Payment Method',
  ASSIGN_GROUPS = 'Assign Groups',
}

export enum PatientDemographicsLabels {
  LANGUAGES = 'Languages',
  RACE = 'Race',
  ETHNICITY = 'Ethnicity',
  LEGAL_SEX = 'Legal Sex',
  FAX = 'Fax',
  ACCOUNT_CREATOR = 'Account creator',
  ACCOUNT_CREATED_ON = 'Account created on',
}

export enum PatientPrivacyLabels {
  PHONE_APPOINTMENT_REMINDERS = 'Phone Appointment Reminders',
  EMAIL_APPOINTMENT_REMINDERS = 'Email Appointment Reminders',
}

export enum PatientGuardianLabels {
  NAME = 'Name',
  ADDRESS_LINE_1 = 'Address Line 1',
  COUNTRY = 'Country',
  ADDRESS_LINE_2 = 'Address Line 2',
  CITY = 'City',
  EMAIL_ID = 'Email ID',
  RELATIONSHIP_WITH_PATIENT = 'Relationship with Patient',
  PHONE_NO = 'Phone no',
  STATE = 'State',
  ZIP_CODE = 'Zip Code',
}

export enum PatientEmergencyContactLabels {
  NAME = 'Name',
  ADDRESS_LINE_1 = 'Address Line 1',
  COUNTRY = 'Country',
  ADDRESS_LINE_2 = 'Address Line 2',
  CITY = 'City',
  EMAIL_ID = 'Email ID',
  RELATIONSHIP_WITH_PATIENT = 'Relationship with Patient',
  PHONE_NO = 'Phone no',
  STATE = 'State',
  ZIP_CODE = 'Zip Code',
}

export enum PatientAssignedGroupsLabels {
  GROUP_NAME = 'Group Name',
}

export enum UserRole {
  PROVIDER_GROUP_ADMIN = 'PROVIDER_GROUP_ADMIN',
  FRONTDESK = 'FRONTDESK',
  BILLER = 'BILLER',
  ENB = 'ENB',
  PSYCHIATRIST = 'PSYCHIATRIST',
  THERAPIST = 'THERAPIST',
  NURSE = 'NURSE',
  PATIENT = 'PATIENT',
  ANONYMOUS = 'ANONYMOUS',
  DOCTOR = 'DOCTOR',
  NURSE_PRACTITIONERS = 'NURSE_PRACTITIONERS',
  CRNA = 'CRNA',
  PHARMACIST = 'PHARMACIST',
  LAB_SPECIALIST = 'LAB_SPECIALIST',
  REMOTE_CLINICIAN = 'REMOTE_CLINICIAN',
  ADMISSIONS_COORDINATOR = 'ADMISSIONS_COORDINATOR',
  PATIENT_EDUCATOR = 'PATIENT_EDUCATOR',
  SETTER = 'SETTER',
  ACCOUNTANT = 'ACCOUNTANT',
  IT_SUPPORT = 'IT_SUPPORT',
  QA_COMPLIANCE = 'QA_COMPLIANCE',
  SUPERADMIN = 'SUPER_ADMIN',
  SUPPORT = 'SUPPORT',
}

export enum RoleType {
  PROVIDER = 'PROVIDER',
  STAFF = 'STAFF',
  PATIENT = 'PATIENT',
}

export enum SettingsFormLabels {
  // Section Titles
  PRACTICE_INFORMATION = 'Practice Information',
  BILLING_ADDRESS = 'Billing Address',
  PRACTICE = 'Practice',
  // Practice Information Fields
  CLINIC_NAME = 'Clinic Name',
  CLINIC_NPI_NUMBER = 'Clinic NPI Number',
  TAX_TYPE = 'Tax Type',
  TAX_NUMBER = 'Tax Number',
  CONTACT_NUMBER = 'Contact',
  EMAIL_ID = 'Email ID',
  TAXONOMY = 'Taxonomy',
  SAVE = 'Save',
  CANCEL = 'Cancel',

  // Billing Address Fields
  ADDRESS_LINE_1 = 'Address line 1',
  ADDRESS_LINE_2 = 'Address line 2',
  CITY = 'City',
  STATE = 'State',
  ZIP_CODE = 'Zip Code',
  TYPE = 'Type',
  MODE = 'Mode',
  TIME = 'Time',
}

export enum SettingsFormPlaceholders {
  // Practice Information Fields
  ENTER_CLINIC_NAME = 'Enter Clinic Name',
  ENTER_CLINIC_NPI_NUMBER = 'Enter Clinic NPI Number',
  SELECT_TAX_TYPE = 'Select Tax Type',
  ENTER_TAX_NUMBER = 'Enter Tax Number',
  ENTER_CONTACT_NUMBER = 'Enter Contact Number',
  ENTER_EMAIL_ID = 'Enter Email ID',
  ENTER_TAXONOMY = 'Enter Taxonomy',
  OTHER_SETTINGS = 'Other Settings',
  PRACTICE = 'Practice',

  // Billing Address Fields
  ENTER_ADDRESS_LINE_1 = 'Enter address line 1',
  ENTER_ADDRESS_LINE_2 = 'Enter address line 2',
  ENTER_CITY = 'Enter City',
  SELECT_STATE = 'Select State',
  ENTER_ZIP_CODE = 'Enter Zip Code',
}

export enum ContactFormLabels {
  CANCEL = 'Cancel',
  SAVE = 'Save',
  CONTACT_TYPE = 'Select Contact Type',
  FULL_NAME = 'Full Name',
  CONTACT_NUMBER = 'Contact Number',
  FAX_NUMBER = 'Fax Number',
  EMAIL_ID = 'Email ID',
  ADDRESS = 'Address',
  CITY = 'City',
  STATE = 'State',
  ZIP_CODE = 'Zip Code',
}

export enum ContactFormPlaceholders {
  SELECT_TYPE = 'Select Type',
  ENTER_FULL_NAME = 'Enter Full Name',
  ENTER_CONTACT_NUMBER = 'Enter Contact Number',
  ENTER_FAX_NUMBER = 'Enter Fax Number',
  ENTER_EMAIL_ID = 'Enter Email ID',
  ENTER_ADDRESS = 'Enter Address',
  SELECT_CITY = 'Enter City',
  SELECT_STATE = 'Select State',
  ENTER_ZIP_CODE = 'Enter Zip Code',
}

export enum StaffFormLabels {
  FIRST_NAME = 'First Name',
  LAST_NAME = 'Last Name',
  EMAIL_ID = 'Email ID',
  CONTACT_NUMBER = 'Contact Number',
  STATUS = 'Status',
  ROLE = 'Role',
  CANCEL = 'Cancel',
  SAVE = 'Save',
}

export enum StaffFormPlaceholders {
  ENTER_FIRST_NAME = 'Enter First Name',
  ENTER_LAST_NAME = 'Enter Last Name',
  ENTER_EMAIL_ID = 'Enter Email',
  ENTER_CONTACT_NUMBER = 'Enter Contact Number',
  SELECT_STATUS = 'Select Status',
  SELECT_ROLE_TYPE = 'Select Role Type',
  SELECT_ROLE = 'Select Role',
}

export enum ClinicianFormLabels {
  FIRST_NAME = 'First Name',
  LAST_NAME = 'Last Name',
  EMAIL_ID = 'Email ID',
  CONTACT_NUMBER = 'Contact Number',
  NPI_NUMBER = 'NPI Number',
  WORK_LOCATIONS = 'Work Locations',
  LANGUAGES_SPOKEN = 'Languages Spoken',
  SUPERVISING_CLINICIAN = 'Supervising Clinician',
  ROLE = 'Role',
  SIGNATURE = 'Signature',
  CANCEL = 'Cancel',
  SAVE = 'Save',
}

export enum ClinicianFormPlaceholders {
  ENTER_FIRST_NAME = 'Enter First Name',
  ENTER_LAST_NAME = 'Enter Last Name',
  ENTER_EMAIL_ID = 'Enter Email ID',
  ENTER_CONTACT_NUMBER = 'Enter Contact Number',
  ENTER_NPI_NUMBER = 'Enter NPI Number',
  SELECT_WORK_LOCATIONS = 'Select Work Locations',
  SELECT_LANGUAGES = 'Select Languages Spoken',
  SELECT_SUPERVISING_CLINICIAN = 'Select Supervising Clinician',
  SELECT_ROLE = 'Select Role',
}

export enum LocationFormLabels {
  LOCATION_INFORMATION = 'Location Information',
  PHYSICAL_ADDRESS = 'Physical Address',
  LOCATION_NAME = 'Location Name',
  CONTACT_NUMBER = 'Contact Number',
  EMAIL_ID = 'Email ID',
  GROUP_NPI_NUMBER = 'Group NPI Number',
  STATUS = 'Status',
  FAX = 'Fax',
  ADDRESS_LINE_1 = 'Address line 1',
  ADDRESS_LINE_2 = 'Address line 2',
  CITY = 'City',
  STATE = 'State',
  ZIP_CODE = 'Zip Code',
}

export const ClinicFormLabels = {
  GROUP_NPI_NUMBER: 'Group NPI Number',
  CONTACT_NUMBER: 'Contact Number',
  EMAIL_ID: 'Email ',
  WEBSITE: 'Website',
  CLINIC_FAX_NUMBER: 'Clinic Fax Number',
  CLINIC_DESCRIPTION: 'Clinic Description',
  PHYSICAL_ADDRESS: 'Physical Address',
  BILLING_ADDRESS: 'Billing Address',
};

export enum LocationFormPlaceholders {
  ENTER_LOCATION_NAME = 'Enter Location Name',
  ENTER_CONTACT_NUMBER = 'Enter Contact Number',
  ENTER_EMAIL_ID = 'Enter Email',
  ENTER_GROUP_NPI_NUMBER = 'Enter Group NPI Number',
  SELECT_STATUS = 'Select Status',
  ENTER_FAX = 'Enter Fax',
  ENTER_CITY = 'Enter City',
  ENTER_ADDRESS_LINE_1 = 'Enter address line 1',
  ENTER_ADDRESS_LINE_2 = 'Enter address line 2',
  SELECT_CITY = 'Select City',
  SELECT_STATE = 'Select State',
  ENTER_ZIP_CODE = 'Enter Zip Code',
}

export enum PracticeSettingsTabs {
  PROFILE = 'Profile',
  LOCATION = 'Locations',
  USER = 'Users',
  ROLES = 'Roles',
  CONTACT = 'Contacts',
}
export enum OtherSettingsTabs {
  AVAILABILITY = 'Availability',
  FEE_SCHEDULE = 'Fee-Schedule',
  PROFILE = 'Profile',
  FORMS = 'Forms',
  GROUP_SETTINGS = 'Group Settings',
  AGREEMENTS = 'Agreements',
  AUDIT_LOG = 'Audit Logs',
}

export enum PracticeSettingsRoutes {
  PROFILE = 'profile',
  LOCATION = 'location',
  USER = 'user',
  ROLES = 'roles',
  CONTACT = 'contact',
}

export enum UserTabs {
  STAFF = 'Staff',
  CLINICIAN = 'Clinicians',
}
export enum TabConst {
  ADD_STAFF = 'Add Staff',
  ADD_CLINICIAN = 'Add Clinician',
}

export enum UserTabRoutes {
  STAFF = 'staff',
  CLINICIAN = 'clinician',
}

export enum LocationTableLabels {
  LOCATION_NAME = 'Location Name',
  CONTACT_NUMBER = 'Contact Number',
  EMAIL = 'Email',
  GROUP_NPI = 'Group NPI',
  FAX = 'Fax',
  ADDRESS = 'Address',
  STATUS = 'Status',
  ACTION = 'Action',
}

export enum LocationStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export enum LocationActions {
  EDIT = 'Edit',
  DELETE = 'Delete',
}

export enum ProfileFieldLabels {
  CLINIC_NPI_NUMBER = 'Clinic NPI Number',
  TAX_TYPE = 'Tax Type',
  TAX_NUMBER = 'Tax Number',
  CONTACT_NUMBER = 'Contact Number',
  EMAIL_ID = 'Email ID',
  TAXONOMY_CODE = 'Taxonomy Code',
  ADDRESS = 'Address',
}

export enum ProfilePlaceholders {
  ENTER_CLINIC_NPI = 'Enter clinic NPI number',
  ENTER_TAX_TYPE = 'Enter tax type',
  ENTER_TAX_NUMBER = 'Enter tax number',
  ENTER_CONTACT_NUMBER = 'Enter contact number',
  ENTER_EMAIL = 'Enter Email',
  ENTER_TAXONOMY_CODE = 'Enter taxonomy code',
  ENTER_ADDRESS = 'Enter address',
}

export enum ProfileValidationMessages {
  REQUIRED_CLINIC_NPI = 'Clinic NPI number is required',
  REQUIRED_TAX_TYPE = 'Tax type is required',
  REQUIRED_TAX_NUMBER = 'Tax number is required',
  REQUIRED_CONTACT_NUMBER = 'Contact number is required',
  REQUIRED_EMAIL = 'Email is required',
  REQUIRED_TAXONOMY_CODE = 'Taxonomy code is required',
  REQUIRED_ADDRESS = 'Address is required',
}

export enum SettingsFormConstants {
  PRACTICE_SETTINGS = 'Practice Settings',
  EDIT_PROFILE = 'Edit Profile',
  ADD_NEW_LOCATION = 'Add Location',
  ADD_NEW_CONTACT = 'Add Contact',
  ADD_NEW_FEE_SCHEDULE = 'Add Fee Schedule',
  ADD_FEE_SCHEDULE = 'Add Fee Schedule',
  OTHER_SETTINGS = 'Other Settings',
  SAVE = 'Save',
  CANCEL = 'Cancel',
  ADD_NEW_PATIENT = 'Add Client',
  ADD_NEW_CLIENT = 'Add Client',
}

export enum CardFormConstants {
  CARD_INFORMATION = 'Card Information',
  ADD_CARD = 'Add Card',
  CARD_NUMBER = 'Card Number',
  EXPIRY_DATE = 'Expiry Date',
  CVV = 'CVV',
  SAVE = 'Save',
  CANCEL = 'Cancel',
}

export enum CardFormPlaceholders {
  ENTER_CARD_NUMBER = 'Enter Card Number',
  ENTER_EXPIRY_DATE = 'Enter Expiry Date',
  ENTER_CVV = 'Enter CVV',
}

export enum FeeScheduleFormLabels {
  PROCEDURE_CODE = 'Procedure Code',
  RATE = 'Rate',
  CODE_TYPE = 'Code Type',
}

export enum FeeScheduleFormPlaceholders {
  SELECT_PROCEDURE_CODE = 'Select Procedure Code',
  ENTER_RATE = 'Enter Rate',
  SELECT_CODE_TYPE = 'Select Code Type',
}

export enum PatientFormLabels {
  PATIENT_INFORMATION = 'Patient Information',
  INSURANCE_NAME = 'Insurance Name',
  MEMBER_ID = 'Member ID',
  GROUP_ID = 'Group ID',
  PATIENT_RELATIONSHIP = 'Patient Relationship with Subscriber',
  FIRST_NAME = 'First Name',
  MIDDLE_NAME = 'Middle Name',
  LAST_NAME = 'Last Name',
  PREFERRED_NAME = 'Preferred Name',
  DATE_OF_BIRTH = 'Date of Birth',
  LEGAL_SEX = 'Legal Sex',
  GENDER_IDENTITY = 'Gender Identity',
  EMAIL_ID = 'Email ID',
  PHONE_NUMBER = 'Phone Number',
  ETHNICITY = 'Ethnicity',
  RACE = 'Race',
  PREFERRED_LANGUAGE = 'Preferred Language',
  ADDRESS_LINE_1 = 'Address Line 1',
  ADDRESS_LINE_2 = 'Address Line 2',
  CITY = 'City',
  STATE = 'State',
  ZIPCODE = 'Zipcode',
  EMERGENCY_NAME = 'Name',
  EMERGENCY_PHONE = 'Phone Number',
  RELATIONSHIP = 'Relationship with Patient',
  PRIMARY_CLINICIAN = 'Primary Clinician',
  SECONDARY_CLINICIAN = 'Secondary Clinician',
  RESPONSIBLE_PARTY = 'Responsible Party',
  SAME_AS_EMERGENCY_CONTACT = 'Same as Emergency Contact',
  PHONE_APPOINTMENT_REMINDERS = 'Phone Appointment Reminders',
  EMAIL_APPOINTMENT_REMINDERS = 'Email Appointment Reminders',
}

export enum PatientFormPlaceholders {
  SELECT_INSURANCE_NAME = 'Select Insurance Name',
  ENTER_MEMBER_ID = 'Enter Member ID',
  ENTER_GROUP_ID = 'Enter Group ID',
  ENTER_FIRST_NAME = 'Enter First Name',
  ENTER_MIDDLE_NAME = 'Enter Middle Name',
  ENTER_LAST_NAME = 'Enter Last Name',
  ENTER_PREFERRED_NAME = 'Enter Preferred Name',
  SELECT_DATE = 'Select Date',
  SELECT_LEGAL_SEX = 'Select Legal Sex',
  SELECT_GENDER_IDENTITY = 'Select Gender Identity',
  ENTER_EMAIL_ID = 'Enter Email ID',
  ENTER_PHONE_NUMBER = 'Enter Phone Number',
  SELECT_ETHNICITY = 'Select Ethnicity',
  ENTER_RACE = 'Enter Race',
  SELECT_PREFERRED_LANGUAGE = 'Select Preferred Language',
  ENTER_ADDRESS_LINE_1 = 'Enter Address Line 1',
  ENTER_ADDRESS_LINE_2 = 'Enter Address Line 2',
  ENTER_CITY = 'Enter City',
  SELECT_STATE = 'Select State',
  ENTER_ZIPCODE = 'Enter Zipcode',
  ENTER_NAME = 'Enter Name',
  SELECT_RELATIONSHIP = 'Select Relationship',
  SELECT_PRIMARY_CLINICIAN = 'Select Primary Clinician',
  SELECT_SECONDARY_CLINICIAN = 'Select Secondary Clinician',
}

export enum PatientFormSectionTitles {
  PATIENT_INFORMATION = 'Patient Information',
  SUBSCRIBER_DETAILS = 'Subscriber Details',
  UPLOAD_INSURANCE_CARD = 'Upload Insurance Card',
  EMERGENCY_CONTACT = 'Emergency Contact Information',
  GUARDIAN_INFORMATION = 'Guardian Information',
  CLINICIAN_INFORMATION = 'Clinician Information',
  PRIVACY_CONSENT = 'Privacy Consent',
  INSURANCE = 'Insurance',
  PAYMENT_METHOD = 'Payment Method',
  PRIMARY_INSURANCE = 'Primary Insurance',
  SECONDARY_INSURANCE = 'Secondary Insurance',
}

export enum PatientFormButtons {
  SAVE = 'Save',
  CANCEL = 'Cancel',
  SAVE_AND_NEXT = 'Save & Next',
  IMPORT_CLIENTS = 'Import Clients',
  IMPORT_PATIENTS = 'Import Patients',
}

export enum PatientFormCheckboxLabels {
  RESPONSIBLE_PARTY = 'Responsible Party',
  SAME_AS_EMERGENCY = 'Same as Emergency Contact',
  PHONE_REMINDERS = 'Phone Appointment Reminders',
  EMAIL_REMINDERS = 'Email Appointment Reminders',
}

export enum PatientGenderOptions {
  MALE = 'Male',
  FEMALE = 'Female',
  NON_BINARY = 'Non-binary',
  OTHER = 'Other',
}

export enum PatientRaceOptions {
  AFRICAN_AMERICAN = 'African American',
  AMERICAN_INDIAN = 'American Indian',
  ASIAN = 'Asian',
  ASIAN_INDIAN = 'Asian Indian',
  OTHER_RACE = 'Other Race',
}

export const PatientEthnicityOptions = {
  CENTRAL_AMERICAN: 'Central American',
  CUBAN: 'Cuban',
  DOMINICAN: 'Dominican',
  SOUTH_AMERICAN: 'South American',
  MAXICAN: 'Maxican',
};

export enum PatientInsuranceOptions {
  AETNA = 'Aetna',
  BLUE_CROSS = 'Blue Cross',
  CIGNA = 'Cigna',
  UNITED = 'United Healthcare',
}

export enum PatientTableLabels {
  NAME = 'Name',
  SEARCH = 'Search',
}

export enum PatientNoteLabels {
  NAME = 'Name',
  CREATE_NOTE = 'Create Note',
}

export enum PatientPaymentCardsTableLabels {
  CARD_NUMBER = 'Card Number',
  EXPIRY_DATE = 'Expiry Date',
  STATUS = 'Status',
  ACTION = 'Action',
}

export enum PatientNotesTableLabels {
  NOTE = 'Note',
  TYPE = 'Type',
  CLINICIAN_NAME = 'Clinician Name',
  CREATED_DATE = 'Created Date',
  LAST_UPDATED = 'Action',
  NOTE_STATUS = 'Note Status',
  BILLING_STATUS = 'Billing Status',
  ACTION = 'Action',
}

export enum PatientTemplateActions {
  DOWNLOAD_TEMPLATE = 'Download Template',
  TEMPLATE_SUCCESS_MESSAGE = 'The CSV file has been successfully imported, containing records for 180 patients.',
  TEMPLATE = 'Template Downloaded Successfully',
  LOGIN_SUCCESS = 'Logged in Successfully',
  IMPORT_CLIENTS = 'Import Clients',
}

export enum FileUploadActions {
  DROP_FILES = 'Drop the files here ...Only pdf, png or jpeg.',
  CLICK_TO_UPLOAD = 'Click here to upload',
  OR_DRAG_AND_DROP = 'or drag and drop',
}

export enum AppointmentViewOptions {
  LIST = 'List',
  CALENDAR = 'Calendar',
}

export enum UploadFileComponentConstants {
  DROP_FILES = 'Drop the files here ...Only pdf, png or jpeg.',
  CLICK_TO_UPLOAD = 'Click here to upload',
  OR_DRAG_AND_DROP = 'or drag and drop',
  FRONT_OF_CARD = 'Front of card',
  BACK_OF_CARD = 'Back of card',
}

const genderType = {
  MALE: 'MALE',
  FEMALE: 'FEMALE',
  OTHERS: 'OTHER',
  UNKNOWN: 'UNKNOWN',
};

export const genderList = [
  { value: genderType.FEMALE, label: 'Female' },
  { value: genderType.MALE, label: 'Male' },
  { value: genderType.OTHERS, label: 'Other' },
];

export const maritalStatusList = [
  { value: 'SINGLE', label: 'Single' },
  { value: 'MARRIED', label: 'Married' },
  { value: 'WIDOWED', label: 'Widowed' },
  { value: 'DIVORCED', label: 'Divorced' },
];

export const RelationshipList = [
  { value: 'SELF', label: 'Self' },
  { value: 'SPOUSE', label: 'Spouse' },
  { value: 'CHILD', label: 'Child' },
  { value: 'DEPENDENT', label: 'Dependent' },
];

export const languageOptions = [
  { value: 'ENGLISH', label: 'English' },
  { value: 'AUSTRALIAN_ENGLISH', label: 'Australian English' },
  { value: 'BRITISH_ENGLISH', label: 'British English' },
  { value: 'ARGENTINIAN_SPANISH', label: 'Argentinian Spanish' },
  { value: 'COLOMBIAN_SPANISH', label: 'Colombian Spanish' },
  { value: 'MEXICAN_SPANISH', label: 'Mexican Spanish' },
  { value: 'NICARAGUAN_SPANISH', label: 'Nicaraguan Spanish' },
  { value: 'VENEZUELAN_SPANISH', label: 'Venezuelan Spanish' },
  { value: 'CHINESE', label: 'Chinese' },
  { value: 'FRENCH', label: 'French' },
  { value: 'JAPANESE', label: 'Japanese' },
  { value: 'GERMAN', label: 'German' },
  { value: 'ARABIC', label: 'Arabic' },
  { value: 'TAGALOG', label: 'Tagalog' },
  { value: 'VIETNAMESE', label: 'Vietnamese' },
  { value: 'ESPERANTO', label: 'Esperanto' },
  { value: 'ESTONIAN', label: 'Estonian' },
  { value: 'BASQUE', label: 'Basque' },
  { value: 'PERSIAN', label: 'Persian' },
  { value: 'FINNISH', label: 'Finnish' },
  { value: 'FRISIAN', label: 'Frisian' },
  { value: 'IRISH', label: 'Irish' },
  { value: 'GEORGIAN', label: 'Georgian' },
  { value: 'KOREAN', label: 'Korean' },
  { value: 'RUSSIAN', label: 'Russian' },
  { value: 'MANDARIN', label: 'Mandarin' },
  { value: 'PORTUGUESE', label: 'Portuguese' },
  { value: 'OTHER', label: 'Other' },
  { value: 'UNKNOWN', label: 'Unknown' },
];

export const ReactionOptions = [
  { value: 'PAIN', label: 'Pain' },
  { value: 'RUNNY_NOSE', label: 'Runny Nose' },
  { value: 'SWELLING', label: 'Swelling' },
  { value: 'BLOATING', label: 'Bloating' },
  { value: 'VOMITING', label: 'Vomiting' },
  { value: 'RASHES', label: 'Rashes' },
  { value: 'ITCHY_NOSE', label: 'Itchy Nose' },
  { value: 'THROAT_CLOSING', label: 'Throat Closing' },
  { value: 'COUGH', label: 'Cough' },
  { value: 'REDNESS', label: 'Redness' },
];

export const SeverityOptions = [
  { value: 'MILD', label: 'Mild' },
  { value: 'MODERATE', label: 'Moderate' },
  { value: 'HIGH', label: 'High' },
];

export const CodeList = [
  { value: 'CPT', label: 'CPT' },
  { value: 'CUSTOM', label: 'Custom' },
];

export enum VisitNotesEnum {
  SIMPLE_NOTE = 'Simple Note',
  CONSULTATION_NOTE = 'Consultation Note',
  SOAP_NOTE = 'SOAP Note',
  EDIT_VISIT_NOTE = 'Edit Visit Note Template',
  CREATE_VISIT_NOTE = 'Create Visit Note Template',
  TEMPLATE_NOTE_NAME = 'Template Note Name ',
  TEMPLATE_TYPE = 'Template Type',
  PROVIDER = 'Provider',
  APPOINTMENT_DETAILS = 'Appointment Details',
  SERVICE_TYPE = 'Service Type',
  NOTE_TYPE = 'Note Type',
  DATE_TIME = 'Date & Time',
  CLINICIAN = 'Clinician',
  LOCATION = 'Location',
  PARTICIPANT = 'Participant',
  AGE = 'Age',
  LAST_ENCOUNTER = 'Last Encounter',
  CHIEF_COMPLAINT = 'Chief Complaint',
  HISTORY_OF_PRESENT_ILLNESS = 'History of Present Illness',
  FOLLOW_UP = 'Follow Up',
  TODAY_VISIT = "Today's Visit",
  MEDICAL_HISTORY = 'Medical History',
  SURGICAL_HISTORY = 'Surgical History',
  HOSPITALIZATION = 'Hospitalization/ Major Diagostic Procedures',
  SUBJECTIVE = 'Subjective',
  OBJECTIVE = 'Objective',
  REVIEW_OF_SYSTEMS = 'Review of Systems',
  PHYSICAL_EXAM = 'Physical Exam',
  ASSESSMENT = 'Assessment',
  PLAN = 'Plan',
  SERVICE_CODE = 'Service Code',
  APPOINTMENT_TYPE = 'Appointment Type',
  DURATION = 'Duration',
  DIAGNOSIS = 'Diagnosis',
  NOTE_CONTENT = 'Note Content',
  ENTER_DIAGNOSIS = 'Enter Diagnosis',
  ENTER_SERVICE_CODE = 'Enter Service Code',
  ENTER_APPOINTMENT_TYPE = 'Enter Appointment Type',
  ENTER_DURATION = 'Enter Duration',
  VISIT_NOTE_SAVED = 'Visit Note Saved Successfully',
  VISIT_NOTE_DELETE = 'Visit Note Deleted Successfully',
  ENTER_TEMPLATE_NOTE_NAME = 'Enter Template Note Name',
  SELECT_TEMPLATE_TYPE = 'Select Template Type',
  ENTER_SERVICE_TYPE = 'Enter Service Type',
  ENTER_PROVIDER = 'Enter Provider',
  ENTER_LOCATION = 'Enter Location',
  ENTER_AGE = 'Enter Age',
  ENTER_LAST_ENCOUNTER = 'Enter Last Encounter',
  ENTER_SUBJECTIVE = 'Enter Subjective',
  ENTER_OBJECTIVE = 'Enter Objective',
  ENTER_ASSESSMENT = 'Enter Assessment',
  ENTER_PLAN = 'Enter Plan',
  ENTER_TODAY_VISIT = "Enter Today's Visit",
  ENTER_PARTICIPANT = 'Enter Participant',
  SELECT_REVIEW_OF_SYSTEMS = 'Select Review of Systems',
  SELECT_PHYSICAL_EXAM = 'Select Physical Exam',
  TEMPLATE_NOTE_NAME_REQUIRED = 'Template Note Name is required',
  TEMPLATE_TYPE_REQUIRED = 'Template Type is required',
  TEMPLATE_NOTE_NAME_MIN_LENGTH = 'Template Note Name must be at least 2 characters',
  TEMPLATE_NOTE_NAME_MAX_LENGTH = 'Template Note Name must not exceed 50 characters',
  SERVICE_TYPE_REQUIRED = 'Service Type is required',
  INSTRUCTIONS_NOTE = 'Instructions Note',
  VITAL = 'Vital',
  ENTER_VITAL = 'Enter Vital',
  BLOOD_PRESSURE = 'Blood Pressure',
  HEART_RATE = 'Heart Rate',
  OXYGEN_SATURATION_LEVEL = 'Oxygen Saturation Level',
  HEIGHT = 'Height',
  WEIGHT = 'Weight',
  BODY_TEMPERATURE = 'Body Temperature',
  BODY_MASS_INDEX = 'Body Mass Index',
  PAIN = 'Pain',
  ENTER_BLOOD_PRESSURE = 'Enter Blood Pressure',
  ENTER_HEART_RATE = 'Enter Heart Rate',
  ENTER_OXYGEN_SATURATION_LEVEL = 'Enter Oxygen Saturation Level',
  ENTER_HEIGHT = 'Enter Height',
  ENTER_WEIGHT = 'Enter Weight',
  ENTER_BODY_TEMPERATURE = 'Enter Body Temperature',
  CARE_PLAN = 'Care Plan',
  WEIGHT_NOTE = 'Weight Note',
  HEIGHT_NOTE = 'Height Note',
  BLOOD_PRESSURE_NOTE = 'Blood Pressure Note',
  BODY_MASS_INDEX_NOTE = 'Body Mass Index Note',
  PAIN_NOTE = 'Pain Note',
  TEMPERATURE_NOTE = 'Temperature Note',
  HEART_RATE_NOTE = 'Heart Rate Note',
  RESPIRATORY_RATE_NOTE = 'Respiratory Rate Note',
  OXYGEN_SATURATION_NOTE = 'Oxygen Saturation Note',
  MEDICATIONS = 'Medications',
}

export enum MacrosEnum {
  ADD_MACRO = 'Add Macros',
  MACRO_NAME = 'Title',
  MACRO_DESCRIPTION = 'Macro Description',
  MACRO_NAME_REQUIRED = 'Title is required',
  ENTER_MACRO_NAME = 'Enter Title',
  ENTER_MACRO_DESCRIPTION = 'Enter Macro Description',
  MACRO_DESCRIPTION_REQUIRED = 'Macro Description is required',
  EDIT_MACRO = 'Edit Macro',
  ADD_NEW_MACRO = 'Add Macro',
  CLONE_MACRO = 'Clone Macro',
  VIEW_MACRO = 'View Macro',
}

export enum APIFeedbackMessages {
  IMAGE_SIZE_ERROR = 'Image size should not exceed 1 MB',
  UNSUPPORTED_FORMAT = 'Unsupported file format',
  PATIENT_CREATED_SUCCESSFULLY = 'Patient Created Successfully',
  PATIENT_UPDATED_SUCCESSFULLY = 'Patient Updated Successfully',
  PATIENT_ARCHIVED_SUCCESSFULLY = 'Patient Archived Successfully',
  PATIENT_RESTORED_SUCCESSFULLY = 'Patient Restored Successfully',
  ALLERGY_ADDED_SUCCESSFULLY = 'Allergy Added Successfully',
  ALLERGY_UPDATED_SUCCESSFULLY = 'Allergy Updated Successfully',
  ALLERGY_DELETED_SUCCESSFULLY = 'Allergy Deleted Successfully',
  ALLERGY_ARCHIVED_SUCCESSFULLY = 'Allergy Archived Successfully',
  ALLERGY_RESTORED_SUCCESSFULLY = 'Allergy Restored Successfully',
  PHARMACY_LAB_RADIOLOGY_CREATED_SUCCESSFULLY = 'Pharmacy lab radiology created successfully',
  DIAGNOSIS_ARCHIVED_SUCCESSFULLY = 'Diagnosis Archived Successfully',
  DIAGNOSIS_RESTORED_SUCCESSFULLY = 'Diagnosis Restored Successfully',
  DIAGNOSIS_CREATED_SUCCESSFULLY = 'Diagnosis Created Successfully',
  DIAGNOSIS_UPDATED_SUCCESSFULLY = 'Diagnosis Updated Successfully',
  STICKY_NOTE_ARCHIVED_SUCCESSFULLY = 'Sticky note Archived Successfully',
  DOCUMENT_TYPE_ARCHIVED_SUCCESSFULLY = 'Document type Archived Successfully',
  PATIENT_FLAG_UPDATED_SUCCESSFULLY = 'Patient Flag Updated Successfully',
  DOCUMENT_RESTORED_SUCCESSFULLY = 'Document Restored Successfully',
  DOCUMENT_ARCHIVED_SUCCESSFULLY = 'Document Archived Successfully',
  DOCUMENT_UPLOADED_SUCCESSFULLY = 'Document Uploaded Successfully',
  DOCUMENT_UPDATED_SUCCESSFULLY = 'Document Updated Successfully',
  FAMILY_HISTORY_ARCHIVED_SUCCESSFULLY = 'Family History Archived Successfully',
  FAMILY_HISTORY_CREATED_SUCCESSFULLY = 'Family History Created Successfully',
  FAMILY_HISTORY_UPDATED_SUCCESSFULLY = 'Family History Updated Successfully',
  FAMILY_HISTORY_RESTORED_SUCCESSFULLY = 'Family History Restored Successfully',
  MEDICAL_HISTORY_CREATED_SUCCESSFULLY = 'Medical History Created Successfully',
  MEDICAL_HISTORY_UPDATED_SUCCESSFULLY = 'Medical History Updated Successfully',
  MEDICAL_HISTORY_ARCHIVED_SUCCESSFULLY = 'Medical History Archived Successfully',
  MEDICAL_HISTORY_RESTORED_SUCCESSFULLY = 'Medical History Restored Successfully',
  SURGICAL_HISTORY_CREATED_SUCCESSFULLY = 'Surgical History Created Successfully',
  SURGICAL_HISTORY_UPDATED_SUCCESSFULLY = 'Surgical History Updated Successfully',
  SURGICAL_HISTORY_ARCHIVED_SUCCESSFULLY = 'Surgical History Archived Successfully',
  SURGICAL_HISTORY_RESTORED_SUCCESSFULLY = 'Surgical History Restored Successfully',
  INTAKE_UPDATE = 'Intake Form Updated Successfully',
}

export const allergyTypeOptions = [
  { value: 'DRUG', label: 'Drug' },
  { value: 'FOOD', label: 'Food' },
  { value: 'ENVIRONMENT', label: 'Environment' },
  { value: 'OTHER', label: 'Other' },
];

export const AppointmentModeOptions = [
  { value: 'IN_PERSON', label: 'In Person' },
  { value: 'VIRTUAL', label: 'Virtual' },
  { value: 'HOME', label: 'Home' },
];
