import { StringMap } from '../models/roles';

export const Portals: StringMap = {
  admin: 'admin',
  provider: 'provider',
  patient: 'client',
};

export const PortalStartingRoute: StringMap = {
  admin: `/${Portals.admin}/clinics/dashboard`,
  provider: `/${Portals.provider}/dashboard`,
  patient: `/${Portals.patient}/appointments`,
};
