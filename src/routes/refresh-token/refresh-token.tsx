import { useMutation } from '@tanstack/react-query';
import cookieService from '../../services/core/cookie-service';
import storageService from '../../services/core/storage-service';
import { BASE_API_URL } from 'src/config';
import { AccessTokenPayload } from 'src/models/auth/token-payload';
import { jwtDecode } from 'jwt-decode';

const callRefreshToken = (refreshToken: string) => {
  return fetch(`${BASE_API_URL}/api/master/access-token?refreshToken=${refreshToken}`, {
    method: 'POST',
  }).then(res => res.json());
};

const RefreshToken = () => {
  const { mutateAsync: refreshTokenMutate } = useMutation({
    mutationFn: callRefreshToken,
  });

  const clearCookiesAndLogout = () => {
    // Check if we're already on the login page to prevent redirect loops
    if (window.location.pathname.includes('/auth/login')) {
      return; // Don't redirect if already on login page
    }

    cookieService.clearCookies();
    localStorage.clear();
    // const someDiv = window.parent.document.getElementById('iFrame');
    // if (someDiv) {
    //   someDiv.style.display = 'none';
    // }
    window.parent.location.href = '/auth/login?tokenExpired=true';
  };

  const handleRefreshTokenError = (url: string) => {
    // Don't redirect if we're on login page or if it's a login request
    if (
      window.location.pathname.includes('/auth/login') ||
      url.toString().includes('/api/master/login')
    ) {
      return;
    }

    if (url.toString().includes('/api/master/access-token')) {
      /** Logout: Clear cookies and navigate to login */
      clearCookiesAndLogout();
      localStorage.removeItem('redirectURL');
    }
  };

  const { fetch: originalFetch } = window;

  window.fetch = async (...args) => {
    const [resource, config] = args;
    // request interceptor here

    let response = await originalFetch(resource as URL, config);

    /** Handle logout if refresh token api fails */
    if (response.status !== 200) {
      handleRefreshTokenError(resource as string);
    }

    // response interceptor here
    switch (response.status) {
      case 401: {
        // Don't try to refresh token if we're on login page or if it's a login request
        if (
          window.location.pathname.includes('/auth/login') ||
          resource.toString().includes('/api/master/login')
        ) {
          return response; // Return the original response without trying to refresh
        }

        const refreshToken = storageService.getRefreshToken();
        if (refreshToken) {
          const res = await refreshTokenMutate(refreshToken);
          if (res && res.code === 'ENTITY') {
            const { access_token, refreshToken } = res.data;
            // storeLoginDataInStore(res.data);

            // const date = new Date();
            // date.setTime(date.getTime() + expires_in * 1000);
            // const expires = date.toUTCString();
            // const cookieStoreOption = { path: "/", expires: expires };
            // storageService.setToken(access_token, cookieStoreOption);
            // storageService.setRefreshToken(refresh_token, cookieStoreOption);
            // storageService.setExpiry(expires, cookieStoreOption);

            const getRoleFromAccessToken = (accessToken: string): string => {
              const decodedPayload: AccessTokenPayload = jwtDecode(accessToken);
              const role = decodedPayload?.realm_access?.roles[0];

              return role || '';
            };
            const userRole = getRoleFromAccessToken(access_token);

            const date = new Date();
            date.setTime(date.getTime() + 1 * 24 * 60 * 60 * 1000);
            const expires = date.toUTCString();
            const cookieStoreOption = { path: '/', expires: expires };
            storageService.setRoles(userRole, cookieStoreOption);
            storageService.setToken(access_token, cookieStoreOption);
            storageService.setRefreshToken(refreshToken, cookieStoreOption);
            storageService.setExpiry(expires, cookieStoreOption);

            // dispatch(
            //   setSnackbarOn({
            //     message: "Token refreshed!!!!",
            //     severity: AlertSeverity.SUCCESS,
            //   })
            // );

            config!.headers = {
              ...config!.headers,
              Authorization: `Bearer ${access_token}`,
            };

            // Recall the api
            response = await originalFetch(resource as URL, config);
            return response;
          }
        }

        /** Logout: Clear cookies and navigate to login */
        clearCookiesAndLogout();

        break;
      }
    }

    return response;
  };

  return <></>;
};

export default RefreshToken;
