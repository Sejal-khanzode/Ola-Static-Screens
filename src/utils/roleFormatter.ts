import { getDataFromLocalStorage } from 'src/sdk/requests/core/localStorage';

/**
 * Formats role display names from backend format to user-friendly format
 * @param role - The role string from backend (e.g., 'TENANT_ADMIN')
 * @returns Formatted role string (e.g., 'Tenant Admin')
 */
export const formatRoleDisplay = (role: string): string => {
  const roleMap: { [key: string]: string } = {
    TENANT_ADMIN: 'Tenant Admin',
    SUPER_ADMIN: 'Super Admin',
    TENANT_SUPPORT: 'Tenant Support',
    FRONTDESK: 'Front Desk',
    BILLER: 'Biller',
    MEDICAL_ASSISTANT: 'Medical Assistant',
    PHYSICIAN: 'Physician',
    NURSE: 'Nurse',
    THERAPIST: 'Therapist',
    PSYCHIATRIST: 'Psychiatrist',
    PROVIDER: 'Provider',
    DOCTOR: 'Doctor',
    PHARMACIST: 'Pharmacist',
    LAB_SPECIALIST: 'Lab Specialist',
    RESOLUTION_SPECIALIST: 'Resolution Specialist',
    PATIENT: 'Patient',
    ANONYMOUS: 'Anonymous',
    ENB: 'ENB',
  };

  return roleMap[role] || role;
};

export const mapRolesToPortal = (roles: string[]): string => {
  if (roles.some(role => role === 'PATIENT')) {
    return 'patient';
  } else if (
    roles.some(role =>
      ['PHYSICIAN', 'NURSE', 'THERAPIST', 'FRONTDESK', 'BILLER', 'MEDICAL_ASSISTANT'].includes(role)
    )
  ) {
    return 'provider';
  } else {
    return 'admin';
  }
};

export const getRoleArrayFromStorage = (): string[] => {
  try {
    const roleArray = getDataFromLocalStorage('roles');

    if (roleArray) {
      const parsed = JSON.parse(roleArray);
      return Array.isArray(parsed) ? parsed : [];
    }

    const primaryRole = getDataFromLocalStorage('roles');
    return primaryRole ? [primaryRole] : [];
  } catch (error) {
    console.error('getRoleArrayFromStorage - error:', error);
    return [];
  }
};
