export interface Profile {
  uuid: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  userName: string;
  active: boolean;
  emailVerified: boolean;
  phoneVerified: boolean;
  currentRoles: string[];
  licenseNumber: string;
  avatar: string;
  created: string;
  modified: string;
  createdBy: string | null;
  modifiedBy: string | null;
  providerId: string;
  discipline: string;
  timeZone: string;
  enablePaycom: boolean;
  enablePto: boolean;
  enableTherapistImport: boolean;
  enableClockInOut: boolean;
  enablePayRate: boolean;
  credentials: string;
  expirationDate: string;
}

// Type for role-based access control
export type UserRole = 'dor' | 'therapist';

