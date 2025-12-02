export type StringMap = {
  [key: string]: string;
};

export const Roles = [
  'SUPER_ADMIN',
  'TENANT_ADMIN',
  'TENANT_SUPPORT',
  'FRONTDESK',
  'BILLER',
  'MEDICAL_ASSISTANT',
  'PHYSICIAN',
  'NURSE',
  'THERAPIST',
  'PSYCHIATRIST',
  'PROVIDER',
  'DOCTOR',
  'PHARMACIST',
  'LAB_SPECIALIST',
  'RESOLUTION_SPECIALIST',
];

export const RolesPortalMap: StringMap = {
  SUPER_ADMIN: 'admin',
  TENANT_ADMIN: 'admin',
  FRONTDESK: 'provider',
  BILLER: 'provider',
  MEDICAL_ASSISTANT: 'provider',
  PROVIDER: 'provider',
  NURSE: 'provider',
  THERAPIST: 'provider',
  PHYSICIAN: 'provider',
  TENANT_SUPPORT: 'admin',
};
