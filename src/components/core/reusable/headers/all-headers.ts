export interface Header {
  id: string;
  label: string;
  numeric?: boolean;
  vital?: boolean;
  type?:
    | 'action'
    | 'text'
    | 'patientName'
    | 'intakeForm'
    | 'insurance'
    | 'status'
    | 'actionButton'
    | 'chip'
    | 'edit'
    | 'checkbox'
    | 'color'
    | 'activeStatus'
    | 'customButton'
    | 'textField'
    | 'warning'
    | 'stickyNote'
    | 'view'
    | 'card'
    | 'account';
}

export const patientIntakePendingFormHeader: Header[] = [
  { id: 'intakeDate', label: 'Intake Date', type: 'text' },
  { id: 'patientName', label: 'Patient Name', type: 'patientName' },
  { id: 'appointment', label: 'Appointment', type: 'text' },
  { id: 'action', label: 'Action', type: 'action' },
];

export const patientIntakeNotSubmittedFormHeader: Header[] = [
  { id: 'firstSend', label: 'First Send', type: 'text' },
  { id: 'patientName', label: 'Patient Name', type: 'patientName' },
  { id: 'appointment', label: 'Appointment', type: 'text' },
  { id: 'action', label: 'Action', type: 'action' },
];

export const renewalRequestTableHeader: Header[] = [
  { id: 'status', label: 'Status', type: 'chip' },
  { id: 'from', label: 'From', type: 'text' },
  { id: 'to', label: 'To', type: 'text' },
  { id: 'patientName', label: 'Patient Name', type: 'patientName' },
  { id: 'medication', label: 'Medication', type: 'text' },
  { id: 'lastUpdated', label: 'Last Updated', type: 'text' },
  { id: 'action', label: 'Action', type: 'action' },
];

export const labResultTableHeader: Header[] = [
  { id: 'status', label: 'Status', type: 'chip' },
  { id: 'changeType', label: 'Change Type', type: 'text' },
  { id: 'from', label: 'From', type: 'text' },
  { id: 'patientName', label: 'Patient Name', type: 'patientName' },
  { id: 'medication', label: 'Medication', type: 'text' },
  { id: 'lastUpdated', label: 'Last Updated', type: 'text' },
  { id: 'action', label: 'Action', type: 'action' },
];

export const TableHeader: Header[] = [
  { id: 'status', label: 'Status', type: 'chip' },
  { id: 'details', label: 'Details', type: 'text' },
  { id: 'from', label: 'From', type: 'text' },
  { id: 'patientName', label: 'Patient Name', type: 'patientName' },
  { id: 'medication', label: 'Medication', type: 'text' },
  { id: 'lastUpdated', label: 'Last Updated', type: 'text' },
  { id: 'action', label: 'Action', type: 'action' },
];

export const appointmentsTableHeader: Header[] = [
  { id: 'location', label: 'Location', type: 'text' },
  { id: 'time', label: 'Time', type: 'text' },
  { id: 'appointmentType', label: 'Appointment Type', type: 'text' },
  { id: 'intakeForm', label: 'Intake Form', type: 'intakeForm' },
  { id: 'insuranceEligibility', label: 'Insurance Eligibility', type: 'insurance' },
  { id: 'time', label: 'Time', type: 'text' },
  { id: 'patientName', label: 'Patient Name', type: 'patientName' },
  { id: 'dateOfBirth', label: 'Date Of Birth', type: 'text' },
  { id: 'contactDetails', label: 'Contact Details', type: 'text' },
  { id: 'providerName', label: 'Clinician Name', type: 'text' },
  { id: 'chiefComplaint', label: 'Chief Complaint', type: 'text' },
  { id: 'status', label: 'Status', type: 'status' },
  { id: 'action', label: 'Action', type: 'action' },
];

export const unsignedVisitsTableHeader: Header[] = [
  { id: 'appointmentType', label: 'Appointment Type', type: 'text' },
  { id: 'patientName', label: 'Patient Name', type: 'patientName' },
  { id: 'dateOfService', label: 'Date Of Service', type: 'text' },
  { id: 'noteType', label: 'Note Type', type: 'text' },
  { id: 'updatedDate', label: 'Updated Date', type: 'text' },
  { id: 'intakeForm', label: 'Intake Form', type: 'intakeForm' },
  { id: 'status', label: 'Status', type: 'chip' },
  { id: 'action', label: 'Action', type: 'actionButton' },
];

export const patientsTableHeader: Header[] = [
  // { id: 'mrn', label: 'MRN', type: 'text' },
  { id: 'patientName', label: 'Patient Name', type: 'patientName' },
  { id: 'dob', label: 'Date Of Birth', type: 'text' },
  { id: 'email', label: 'Email', type: 'text' },
  { id: 'phone', label: 'Contact Number', type: 'text' },
  { id: 'status', label: 'Status', type: 'chip' },
  { id: 'primaryProviderName', label: 'Primary Clinician', type: 'text' },
  { id: 'action', label: 'Action', type: 'actionButton' },
];

export const documentTypesHeader: Header[] = [
  { id: 'srn', label: 'Sr.No', type: 'text' },
  { id: 'name', label: 'Document Type', type: 'text' },
  { id: 'action', label: 'Action', type: 'actionButton' },
];

export const profileLocationHeader: Header[] = [
  { id: 'locationId', label: 'Location ID', type: 'text' },
  { id: 'name', label: 'Location Name', type: 'view' },
  { id: 'groupspecialities', label: 'Specialities', type: 'text' },
  { id: 'address', label: 'Address', type: 'text' },
  { id: 'city', label: 'City', type: 'text' },
  { id: 'state', label: 'State', type: 'text' },
  { id: 'zipCode', label: 'Zip Code', type: 'text' },
  { id: 'contact', label: 'Contact Number', type: 'text' },
  { id: 'locationStatus', label: 'Status', type: 'chip' },
  { id: 'action', label: 'Action', type: 'actionButton' },
];

export const profileLocationHeaderProvider: Header[] = [
  { id: 'locationId', label: 'Location ID', type: 'text' },
  { id: 'name', label: 'Location Name', type: 'view' },
  { id: 'groupspecialities', label: 'Specialities', type: 'text' },
  { id: 'address', label: 'Address', type: 'text' },
  { id: 'city', label: 'City', type: 'text' },
  { id: 'state', label: 'State', type: 'text' },
  { id: 'zipCode', label: 'Zip Code', type: 'text' },
  { id: 'contact', label: 'Contact Number', type: 'text' },
  { id: 'locationStatus', label: 'Status', type: 'chip' },
];

export const profileUserHeader: Header[] = [
  { id: 'name', label: 'Name', type: 'view' },
  { id: 'email', label: 'Email ID', type: 'text' },
  { id: 'contact', label: 'Contact Number', type: 'text' },
  { id: 'role', label: 'Role', type: 'text' },
  { id: 'status', label: 'Status', type: 'chip' },
];

export const profileRoleHeader: Header[] = [
  { id: 'description', label: 'Description', type: 'text' },
  { id: 'superAdmin', label: 'Super Admin', type: 'checkbox' },
  { id: 'clinician', label: 'Clinician', type: 'checkbox' },
  { id: 'staff', label: 'Staff', type: 'checkbox' },
  { id: 'client', label: 'Client', type: 'checkbox' },
  { id: 'recordCustodian', label: 'Record Custodian', type: 'checkbox' },
];

export const patinetFlagProviderHeader: Header[] = [
  { id: 'name', label: 'Flag Name', type: 'text' },
  { id: 'hexColor', label: 'Color', type: 'color' },
  { id: 'customupdatedDate', label: 'Updated Date', type: 'text' },
  { id: 'customcreatedDate', label: 'Created Date', type: 'text' },
  { id: 'status', label: 'Status', type: 'chip' },
  { id: 'action', label: 'Action', type: 'actionButton' },
];

export const colorConfigurationHeader: Header[] = [
  { id: 'appointmentName', label: 'Appointment Name', type: 'text' },
  { id: 'color', label: 'Color', type: 'color' },
  { id: 'updatedDate', label: 'Updated Date', type: 'text' },
  { id: 'createdDate', label: 'Created Date', type: 'text' },
  { id: 'action', label: 'Action', type: 'actionButton' },
];

export const visitNotesHeader: Header[] = [
  { id: 'templateName', label: 'Template Name', type: 'view' },
  { id: 'templateType', label: 'Template Type', type: 'text' },
  { id: 'createdBy', label: 'Created By', type: 'text' },
  { id: 'updateAt', label: 'Updated Date', type: 'text' },
  { id: 'action', label: 'Action', type: 'actionButton' },
];

export const VitalHeader: Header[] = [
  { id: 'vital', label: 'Vital', type: 'text' },
  { id: 'value', label: 'Value', type: 'textField' },
  { id: 'note', label: 'Note', type: 'textField' },
];

export const rosAndPEHeader: Header[] = [
  { id: 'title', label: 'Title', type: 'view' },
  { id: 'createdBy', label: 'Created By', type: 'text' },
  { id: 'updateDate', label: 'Updated Date', type: 'text' },
  { id: 'action', label: 'Action', type: 'actionButton' },
];

export const macrosHeader: Header[] = [
  { id: 'title', label: 'Title', type: 'view' },
  { id: 'createdBy', label: 'Created By', type: 'text' },
  { id: 'action', label: 'Action', type: 'actionButton' },
];

export const annotableImageHeader: Header[] = [
  { id: 'imageName', label: 'Image Name', type: 'text' },
  { id: 'fileName', label: 'File Name', type: 'text' },
  { id: 'action', label: 'Action', type: 'actionButton' },
];

export const providerDataHeader: Header[] = [
  { id: 'id', label: 'ID', type: 'text' },
  { id: 'providerType', label: 'Clinician Type', type: 'text' },
  { id: 'providerName', label: 'Clinician Name', type: 'text' },
  { id: 'speciality', label: 'Speciality', type: 'text' },
  { id: 'npiNumber', label: 'NPI Number', type: 'text' },
  { id: 'emailId', label: 'Email Id', type: 'text' },
];

export const patientDataHeader: Header[] = [
  { id: 'id', label: 'ID', type: 'text' },
  { id: 'firstName', label: 'First Name', type: 'text' },
  { id: 'lastName', label: 'Last Name', type: 'text' },
  { id: 'primaryProviderName', label: 'Primary Clinician Name', type: 'text' },
  { id: 'emailId', label: 'Email Id', type: 'text' },
  { id: 'contactNumber', label: 'Contact Number', type: 'text' },
];

export const icdCodeHeader: Header[] = [
  { id: 'code', label: 'ICD 10 Code', type: 'text' },
  { id: 'description', label: 'Description', type: 'text' },
  { id: 'status', label: 'Status', type: 'activeStatus' },
];

export const cptHeader: Header[] = [
  { id: 'code', label: 'Procedure Code', type: 'text' },
  { id: 'description', label: 'Description', type: 'text' },
  { id: 'status', label: 'Status', type: 'activeStatus' },
];

export const servicesHeader: Header[] = [
  { id: 'procedureCode', label: 'Procedure Code', type: 'text' },
  { id: 'description', label: 'Code Description', type: 'text' },
  { id: 'rate', label: 'Rate', type: 'text' },
  { id: 'status', label: 'Active', type: 'chip' },
  { id: 'action', label: 'Action', type: 'actionButton' },
];

export const adminSettingsUsersHeader: Header[] = [
  { id: 'name', label: 'Name', type: 'view' },
  { id: 'email', label: 'Email Id', type: 'text' },
  { id: 'contact', label: 'Contact Number', type: 'text' },
  { id: 'role', label: 'Role', type: 'text' },
  { id: 'status', label: 'Status', type: 'chip' },
  { id: 'action', label: 'Action', type: 'actionButton' },
];

export const adminDashboardClinicsData: Header[] = [
  { id: 'name', label: 'Clinic Name', type: 'patientName' },
  { id: 'groupspecialities', label: 'Speciality', type: 'text' },
  { id: 'contact', label: 'Contact', type: 'text' },
  { id: 'address', label: 'Address', type: 'text' },
  { id: 'state', label: 'State', type: 'text' },
  { id: 'account', label: 'Account', type: 'account' },
  { id: 'status', label: 'Status', type: 'chip' },
  { id: 'action', label: 'Action', type: 'actionButton' },
];

export const apptTypeHeader: Header[] = [
  { id: 'title', label: 'Appointment Name', type: 'text' },
  { id: 'colorCode', label: 'Color', type: 'color' },
  { id: 'description', label: 'Description', type: 'text' },
  { id: 'duration', label: 'Duration (mins)', type: 'text' },
  { id: 'action', label: 'Action', type: 'actionButton' },
];

export const appointmentTableHeaders: Header[] = [
  { id: 'location', label: 'Location' },
  { id: 'time', label: 'Time' },
  { id: 'appointmentType', label: 'Appointment Type' },
  { id: 'intakeForm', label: 'Intake', type: 'patientName' },
  { id: 'insuranceEligibility', label: 'Eligibility' },
  { id: 'patientName', label: 'Patient Name' },
  { id: 'dateOfBirth', label: 'Date of Birth' },
  { id: 'contactDetails', label: 'Contact Details' },
  { id: 'providerName', label: 'Clinician Name' },
  { id: 'status', label: 'Status', type: 'chip' },
  { id: 'action', label: 'Action', type: 'actionButton' },
];

export const stickyNotesHeader: Header[] = [
  { id: 'noteName', label: 'Note Name', type: 'stickyNote' },
  { id: 'action', label: 'Action', type: 'actionButton' },
];

export const allergiesHeader: Header[] = [
  { id: 'allergyType', label: 'Allergy Type', type: 'text' },
  { id: 'allergies', label: 'Allergies', type: 'text' },
  { id: 'reaction', label: 'Reaction', type: 'text' },
  { id: 'severity', label: 'Severity', type: 'text' },
  { id: 'date', label: 'Onset Date', type: 'text' },
  { id: 'recordedDate', label: 'Recorded Date', type: 'text' },
  { id: 'recordedBy', label: 'Recorded By', type: 'text' },
  { id: 'note', label: 'Note', type: 'text' },
  { id: 'status', label: 'Status', type: 'chip' },
  { id: 'action', label: 'Action', type: 'actionButton' },
];

export const diagnosesHeader: Header[] = [
  { id: 'type', label: 'Type', type: 'text' },
  { id: 'diagnosisCode', label: 'Diagnosis', type: 'text' },
  { id: 'onsetDate', label: 'Onset Date', type: 'text' },
  { id: 'recordedDate', label: 'Recorded Date', type: 'text' },
  { id: 'recordedBy', label: 'Recorded By', type: 'text' },
  { id: 'note', label: 'Note', type: 'text' },
  { id: 'status', label: 'Status', type: 'chip' },
  { id: 'action', label: 'Action', type: 'actionButton' },
];
export const customTemplatesHeader: Header[] = [
  { id: 'templateName', label: 'Template Name', type: 'patientName' },
];

export const documentTableHeader: Header[] = [
  { id: 'documentName', label: 'Document Name', type: 'patientName' },
  { id: 'documentType', label: 'Document Type', type: 'text' },
  { id: 'date', label: 'Document Date', type: 'text' },
  { id: 'uploadedBy', label: 'Uploaded By', type: 'text' },
  { id: 'action', label: 'Action', type: 'actionButton' },
];

export const manageDocumentTypesHeader: Header[] = [
  { id: 'documentType', label: 'Document Type', type: 'text' },
  { id: 'action', label: 'Action', type: 'actionButton' },
];

export const familyHistoryHeader: Header[] = [
  { id: 'problems', label: 'Problems', type: 'text' },
  { id: 'relative', label: 'Relative', type: 'text' },
  { id: 'onSetAge', label: 'Onset Age', type: 'text' },
  { id: 'died', label: 'Died', type: 'text' },
  { id: 'recordedBy', label: 'Recorded By', type: 'text' },
  { id: 'status', label: 'Status', type: 'chip' },
  { id: 'note', label: 'Note', type: 'text' },
  { id: 'action', label: 'Action', type: 'actionButton' },
];

export const medicalHistoryHeader: Header[] = [
  { id: 'conditionName', label: 'Condition Name', type: 'text' },
  { id: 'date', label: 'Date', type: 'text' },
  { id: 'note', label: 'Note', type: 'text' },
  { id: 'recordedDate', label: 'Recorded Date', type: 'text' },
  { id: 'recordedBy', label: 'Recorded By', type: 'text' },
  { id: 'status', label: 'Status', type: 'chip' },
  { id: 'action', label: 'Action', type: 'actionButton' },
];

export const surgicalHistoryHeader: Header[] = [
  { id: 'surgeryName', label: 'Surgery Name', type: 'text' },
  { id: 'date', label: 'Surgery Date', type: 'text' },
  { id: 'recordedBy', label: 'Recorded By', type: 'text' },
  { id: 'note', label: 'Surgery Note', type: 'text' },
  { id: 'status', label: 'Status', type: 'chip' },
  { id: 'action', label: 'Action', type: 'actionButton' },
];

export const medicationHeader: Header[] = [
  { id: 'medicine', label: 'Medicines', type: 'text' },
  { id: 'dispense', label: 'Dispense', type: 'text' },
  { id: 'date', label: 'Date', type: 'text' },
  { id: 'dispensing', label: 'Dispensing', type: 'text' },
  { id: 'status', label: 'Status', type: 'chip' },
  { id: 'action', label: 'Action', type: 'actionButton' },
];

export const eligibilityHeader: Header[] = [
  { id: 'insurance', label: 'Insurance', type: 'text' },
  { id: 'clinician', label: 'Clinician', type: 'text' },
  { id: 'reqDate', label: 'Requested date', type: 'text' },
  { id: 'insuranceType', label: 'Insurance Type', type: 'text' },
  { id: 'action', label: 'Action', type: 'actionButton' },
];

export const appointmentHeaders: Header[] = [
  { id: 'location', label: 'Location' },
  { id: 'time', label: 'Time' },
  { id: 'appointmentType', label: 'Appointment Type' },
  { id: 'patientName', label: 'Patient Name' },
  { id: 'dateOfBirth', label: 'Date of Birth' },
  { id: 'contactDetails', label: 'Contact Details' },
  { id: 'providerName', label: 'Clinician Name' },
  { id: 'status', label: 'Status', type: 'chip' },
];

export const RequestApptHeadCells = [
  {
    id: 'requestType',
    label: 'Request Type',
  },
  {
    id: 'providerName',
    label: 'Clinician Name',
  },
  {
    id: 'appointmentType',
    label: 'Appointment Type',
  },
  {
    id: 'dateTime',
    label: 'Date & Time',
  },
  {
    id: 'location',
    label: 'Location',
  },
  {
    id: 'status',
    label: 'Status',
    align: 'center' as const,
  },
];

export const readyForBillingHeader: Header[] = [
  { id: 'dateOfService', label: 'Date of Service' },
  { id: 'patientName', label: 'Patient Name' },
  { id: 'appointmentType', label: 'Appointment Type' },
  { id: 'renderingProvider', label: 'Rendering Provider' },
  { id: 'location', label: 'Location' },
  { id: 'status', label: 'Status', type: 'chip' },
  { id: 'action', label: 'Action', type: 'actionButton' },
];

export const superbillHeader: Header[] = [
  { id: 'billDate', label: 'Bill Date' },
  { id: 'billId', label: 'Bill Id' },
  { id: 'dateOfService', label: 'Date of Service' },
  { id: 'patientName', label: 'Patient Name' },
  { id: 'renderingProvider', label: 'Rendering Provider' },
  { id: 'totalAmount', label: 'Total Amount' },
  { id: 'insuranceBalance', label: 'Insurance Balance' },
  { id: 'patientPaid', label: 'Patient Paid' },
  { id: 'patientBalance', label: 'Patient Balance' },
  { id: 'status', label: 'Status', type: 'chip' },
  { id: 'action', label: 'Action', type: 'actionButton' },
];

export const diagocode: Header[] = [
  { id: 'srn', label: 'Sr.No', type: 'text' },
  { id: 'icd', label: 'ICD Code', type: 'text' },
  { id: 'action', label: 'Action', type: 'actionButton' },
];

export const proceCode: Header[] = [
  { id: 'srn', label: 'Sr.No', type: 'text' },
  { id: 'procedure', label: 'Procedure Code', type: 'text' },
  { id: 'modifiers', label: 'Modifiers' },
  { id: 'units', label: 'Units', type: 'text' },
  { id: 'amount', label: 'Amount ($)', type: 'text' },
  { id: 'subtotal', label: 'SubTotal ($)', type: 'text' },
  { id: 'action', label: 'Action', type: 'actionButton' },
];

export const remits: Header[] = [
  { id: 'era', label: 'ERA doc No', type: 'text' },
  { id: 'eraDate', label: 'ERA Date', type: 'text' },
  { id: 'eft', label: 'Check/EFT No.' },
  { id: 'eftDate', label: 'Check/EFT Date', type: 'text' },
  { id: 'payer', label: 'Payer', type: 'text' },
  { id: 'amount', label: 'Amount ($)', type: 'text' },
  { id: 'batchNo', label: 'Batch No.', type: 'text' },
  { id: 'action', label: 'Action', type: 'actionButton' },
];

export const claims: Header[] = [
  { id: 'claimId', label: 'Claim ID', type: 'text' },
  { id: 'billDate', label: 'Bill Date', type: 'text' },
  { id: 'dateOfService', label: 'Date of Service' },
  { id: 'patientName', label: 'Patient Name', type: 'text' },
  { id: 'payerName', label: 'Payer Name', type: 'text' },
  { id: 'renderingProvider', label: 'Rendering Provider', type: 'text' },
  { id: 'insuranceAmt', label: 'Insurance Amt', type: 'text' },
  { id: 'patientAmt', label: 'Patient Amt', type: 'text' },
    { id: 'updateOn', label: 'Update On' },

  { id: 'secClaim', label: 'Sec Claim',  type: 'chip'},
  { id: 'status', label: 'Status', },
  { id: 'action', label: 'Action', type: 'actionButton' },
];

export const invoice: Header[] = [
  { id: 'invoiceId', label: 'Invoice ID', type: 'text' },
  { id: 'invoiceDate', label: 'Invoice Date', type: 'text' },
  { id: 'mrn', label: 'MRN' },
  { id: 'patientName', label: 'Patient Name', type: 'text' },
  { id: 'encounterDate', label: 'Encounter Date', type: 'text' },
  { id: 'billingProvider', label: 'Billing Provider', type: 'text' },
  { id: 'amount', label: 'Amount', type: 'text' },
  { id: 'payment', label: 'Payment' },
  { id: 'due', label: 'Due' },
  { id: 'status', label: 'Status', type:'chip' },
  { id: 'action', label: 'Action', type: 'actionButton' },
];
