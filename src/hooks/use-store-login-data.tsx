import { jwtDecode } from 'jwt-decode';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { AlertSeverity } from '../components/core/reusable/snackbar-alert/snackbar-alert';
import { LoginModel } from '../models/auth/login-model';
import { AccessTokenPayload } from '../models/auth/token-payload';
import { setSnackbarOn } from '../redux/actions/snackbar-actions';
import storageService from '../services/core/storage-service';

const useStoreLoginData = () => {
  // const { isPatientDomain } = useAuthority();
  const isPatientDomain = false;
  const dispatch = useDispatch();

  const getRoleFromAccessToken = (accessToken: string): string => {
    const decodedPayload: AccessTokenPayload = jwtDecode(accessToken);
    const role = decodedPayload?.realm_access?.roles[0];

    return role || '';
  };

  const storeLoginDataInStore = useCallback((loginResponse: LoginModel) => {
    const userRole = getRoleFromAccessToken(loginResponse.access_token);

    if (userRole === 'PATIENT' && !isPatientDomain) {
      dispatch(
        setSnackbarOn({
          severity: AlertSeverity.INFO,
          message: 'Please visit to patient portal.',
        })
      );
      return;
    }

    if (userRole !== 'PATIENT' && isPatientDomain) {
      dispatch(
        setSnackbarOn({
          severity: AlertSeverity.INFO,
          message: 'Please visit to provider/staff portal.',
        })
      );
      return;
    }

    const date = new Date();
    date.setTime(date.getTime() + loginResponse.expires_in * 1000);
    const expires = date.toUTCString();
    // Use sessionOnly: true to clear cookies when browser closes
    const cookieStoreOption = { path: '/', expires: expires, sessionOnly: true };
    storageService.setRoles(userRole, cookieStoreOption);

    storageService.setToken(loginResponse.access_token, cookieStoreOption);
    // localStorage.setItem('token', loginResponse.access_token);
    storageService.setRefreshToken(loginResponse.refresh_token, cookieStoreOption);
    storageService.setExpiry(expires, cookieStoreOption);
  }, []);

  return storeLoginDataInStore;
};

export default useStoreLoginData;
