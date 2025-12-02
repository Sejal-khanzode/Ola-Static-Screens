export const providerTypeList = [
  { value: 'MD', label: 'MD' },
  { value: 'PA', label: 'PA' },
  { value: 'PSYD', label: 'PSYD' },
  { value: 'LCSW', label: 'LCSW' },
  { value: 'NP', label: 'NP' },
  { value: 'RN', label: 'RN' },
  { value: 'BHNP', label: 'BHNP' },
  { value: 'FNP', label: 'FNP' },
  { value: 'RD', label: 'RD' },
  { value: 'NPS', label: 'NPS' },
];

export const rolesList: { key: string; value: string; roleType: string }[] = [
  { key: 'TENANT_ADMIN', value: 'Tenant Admin', roleType: 'STAFF' },
  { key: 'TENANT_SUPPORT', value: 'Tenant Support', roleType: 'STAFF' },
  { key: 'FRONTDESK', value: 'Front Desk', roleType: 'STAFF' },
  { key: 'BILLER', value: 'Biller', roleType: 'STAFF' },
  { key: 'MEDICAL_ASSISTANT', value: 'Medical Assistant', roleType: 'PROVIDER' },
  { key: 'PHYSICIAN', value: 'Physician', roleType: 'PROVIDER' },
  { key: 'NURSE', value: 'Nurse', roleType: 'PROVIDER' },
  { key: 'THERAPIST', value: 'Therapist', roleType: 'PROVIDER' },
];

export const activeStatusOptions = [
  { label: 'Active', value: 'true' },
  { label: 'Inactive', value: 'false' },
];
