import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import storageService from '../services/core/storage-service';
import { ENV } from '../config';
import { Portals } from '../constants/portals';
import { ENVIRONMENTS } from '../constants/environments';
import { getDataFromLocalStorage } from 'src/sdk/requests/core/localStorage';

type AuthorityInfo = {
  hasRouteAuthority: boolean;
  portal: string;
  role: string | null;
  token: string | null;
  isSuperAdmin: boolean;
  isProvider: boolean;
  isPatient: boolean;
  isAdminPortal: boolean;
  isProviderPortal: boolean;
  isPatientPortal: boolean;
  isEnvDevelopment: boolean;
  isEnvProduction: boolean;
  isEnvUAT: boolean;
  isEnvQa: boolean;
  isStaff: boolean;
  considerProvider: boolean;
};

const useAuthority = () => {
  const role = getDataFromLocalStorage('roles');
  const token = storageService.getToken();
  const location = useLocation();

  const pathArr = location.pathname
    ?.trim()
    .split('/')
    .filter((path: string) => path.length);

  const pathPrefix = pathArr[0];

  const isAdminPortal = pathPrefix === Portals.admin;
  const isProviderPortal = pathPrefix === Portals.provider;
  const isPatientPortal = pathPrefix === Portals.patient;

  const hasProviderRole =
    (role &&
      (role.includes('PHYSICIAN') ||
        role.includes('NURSE') ||
        role.includes('THERAPIST') ||
        role.includes('FRONTDESK') ||
        role.includes('BILLER'))) ||
    role?.includes('MEDICAL_ASSISTANT');
  
  const hasPatientRole = role && role.includes('PATIENT');
  
  const portal = hasPatientRole ? 'client' : hasProviderRole ? 'provider' : 'admin';

  const isSuperAdmin = role ? role.includes('SUPER_ADMIN') : false;
  const isProvider = role
    ? role.includes('PHYSICIAN') || role.includes('NURSE') || role.includes('THERAPIST')
    : false;
  const isPatient = role ? role.includes('PATIENT') : false;
  const isStaff = role
    ? role.includes('FRONTDESK') || role.includes('BILLER') || role.includes('MEDICAL_ASSISTANT')
    : false;
  const considerProvider = role
    ? role.includes('PHYSICIAN') || role.includes('NURSE') || role.includes('THERAPIST')
    : false;
  const isEnvDevelopment = ENV === ENVIRONMENTS.DEVELOPMENT;
  const isEnvProduction = ENV === ENVIRONMENTS.PRODUCTION;
  const isEnvUAT = ENV === ENVIRONMENTS.UAT;
  const isEnvQa = ENV === ENVIRONMENTS.QA;

  const authorityInfo: AuthorityInfo = useMemo(
    () => ({
      hasRouteAuthority: pathPrefix === portal,
      portal,
      role,
      token,
      isSuperAdmin,
      isProvider,
      isPatient,
      isAdminPortal,
      isProviderPortal,
      isPatientPortal,
      isEnvDevelopment,
      isEnvProduction,
      isEnvUAT,
      isEnvQa,
      isStaff,
      considerProvider,
    }),
    [
      pathPrefix,
      portal,
      role,
      token,
      isSuperAdmin,
      isProvider,
      isPatient,
      isAdminPortal,
      isProviderPortal,
      isPatientPortal,
      isEnvDevelopment,
      isEnvProduction,
      isEnvUAT,
      isEnvQa,
      isStaff,
      considerProvider,
    ]
  );

  return authorityInfo;
};

export default useAuthority;
