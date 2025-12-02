import { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { Box, Grid, Typography, Checkbox, FormControlLabel } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { loginConstants } from '../../../constants/auth-constants';
import CustomLabel from '../../../components/core/reusable/custom-label/custom-label';
import { LoginPageSchema } from '../../../schema/auth-schema/auth-schema';
import { useMutation, useQuery } from '@tanstack/react-query';
import useStoreLoginData from '../../../hooks/use-store-login-data';
import { useDispatch } from 'react-redux';
import { setSnackbarOn } from '../../../redux/actions/snackbar-actions';
import { AlertSeverity } from '../../../components/core/reusable/snackbar-alert/snackbar-alert';
import { ErrorResponseEntity } from '../../../models/response/error-response';
import { jwtDecode } from 'jwt-decode';
import { AccessTokenPayload } from '../../../models/auth/token-payload';
import { PortalStartingRoute } from '../../../constants/portals';
import { AxiosResponse } from 'axios';
import { emailRegex } from '../../../constants/regex-constant';
import CustomInput from '../../core/reusable/custom-input/custom-input';
import CustomButton from '../reusable/custom-button/custom-button';
import { saveToLocalStorage } from 'src/sdk/requests/core/localStorage';
import { UserControllerService, LoginRequest } from 'src/sdk/requests';
import { mapRolesToPortal } from '../../../utils/roleFormatter';
import { setUserProfile, setUserProfileLoading } from '../../../redux/reducers/userProfileReducer';

export const getRoleFromAccessToken = (accessToken: string): string[] => {
  const decodedPayload: AccessTokenPayload = jwtDecode(accessToken);
  const roles = decodedPayload.realm_access?.roles || [];
  const filteredRoles = roles.filter(role => role === role.toUpperCase());
  return filteredRoles || [];
};

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const storeLoginDataInStore = useStoreLoginData();

  // const location = useLocation();
  // const tokenExpired = location.state?.tokenExpired || false;
  const dispatch = useDispatch();

  const [loginData] = useState<LoginRequest>({
    username: '',
    password: '',
    isPatient: false,
  });
  // const [searchParams] = useSearchParams();

  const [, setRole] = useState<string[]>([]);
  const [isPatient, setIsPatient] = useState<boolean>(false);
  const [shouldFetchProfile, setShouldFetchProfile] = useState<boolean>(false);

  const isLocalhost = window.location.hostname === 'localhost';

  const {
    control,
    formState: { errors },
    handleSubmit,
    clearErrors,
  } = useForm({
    defaultValues: loginData,
    resolver: yupResolver(LoginPageSchema),
  });

  const {
    mutateAsync: asyncUserLogin,
    data,
    isSuccess,
    isPending,
    isError,
    error,
    reset,
  } = useMutation({
    mutationFn: UserControllerService.postApiMasterLogin,
  });

  // Fetch user profile after successful login
  const { data: userProfileData, isLoading: isLoadingProfile } = useQuery({
    queryKey: ['userProfile'],
    queryFn: () => UserControllerService.getApiMasterProfile(),
    enabled: shouldFetchProfile,
  });

  // useEffect(() => {
  //   if (tokenExpired) {
  //     window.history.replaceState({}, '');
  //     dispatch(
  //       setSnackbarOn({
  //         severity: AlertSeverity.ERROR,
  //         message: 'Token Expired. Please re-login.',
  //       })
  //     );
  //   }
  // }, [dispatch, tokenExpired]);

  // useEffect(() => {
  //   if (searchParams.get('tokenExpired')) {
  //     navigate('/auth/login', { state: { tokenExpired: true } });
  //   }
  // }, [navigate, searchParams]);

  useEffect(() => {
    const message =
      (error && (error as unknown as ErrorResponseEntity)?.body?.message) ||
      'Error occurred while logging in';
    if (isError) {
      dispatch(
        setSnackbarOn({
          severity: AlertSeverity.ERROR,
          message: message as string,
        })
      );
    }
  }, [dispatch, isError, error]);

  // Handle user profile data and store in Redux
  useEffect(() => {
    if (userProfileData) {
      const profileData = (userProfileData as any)?.data;

      dispatch(setUserProfile(profileData));
      dispatch(setUserProfileLoading(false));
    }
  }, [userProfileData, dispatch]);

  // Handle loading state
  useEffect(() => {
    if (isLoadingProfile) {
      dispatch(setUserProfileLoading(true));
    }
  }, [isLoadingProfile, dispatch]);

  useEffect(() => {
    if (isSuccess && data) {
      reset();

      const loginResponse = (data as unknown as AxiosResponse).data;
      storeLoginDataInStore(loginResponse);
      const userRole = getRoleFromAccessToken(loginResponse.access_token);
      setRole(userRole);

      const primaryRole = userRole[0] || '';

      saveToLocalStorage('roles', userRole);

      const redirectURL = localStorage.getItem('redirectURL');

      const portal = mapRolesToPortal(userRole);

      if (redirectURL && !primaryRole) {
        navigate(redirectURL);
        localStorage.removeItem('redirectURL');
      } else {
        // Fetch user profile after determining the target route
        setShouldFetchProfile(true);

        const targetRoute = PortalStartingRoute[portal];

        setTimeout(() => {
          navigate(targetRoute);
        }, 1000);
      }
    }
  }, [isSuccess, data, navigate]);

  const onSubmit = async (values: LoginRequest) => {
    // Determine isPatient value based on environment
    const isPatientValue = isLocalhost ? isPatient : window.location.href.includes('patient');

    const payload: LoginRequest = {
      password: values.password,
      username: values.username,
      isPatient: isPatientValue,
    };
    await asyncUserLogin({
      requestBody: payload,
    });
  };

  return (
    <Box width="100%" margin="0 auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container flexDirection="column" spacing={3} padding={2}>
          <Grid>
            <Grid container flexDirection="column">
              <Typography variant="titleMediumBold">{loginConstants.LOG_IN_TO_ACC}</Typography>
              <Grid container display="flex" justifyContent={'space-between'}>
                <Grid mt={1}>
                  <Typography variant="bodyRegular4" color={'#74797B'}>
                    {loginConstants.WELCOME_BACK}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid>
            <CustomLabel label={loginConstants.EMAIL} isRequired={false} isAuth={true} />
            <Controller
              control={control}
              name="username"
              render={({ field }) => (
                <CustomInput
                  placeholder={loginConstants.ENTER_EMAIL}
                  {...field}
                  hasError={!!errors.username}
                  errorMessage={errors.username?.message}
                  disableField={isPending}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const value = e.target.value.trim();
                    field.onChange(value);
                    if (emailRegex.test(value.toLowerCase())) {
                      clearErrors('username');
                    }
                  }}
                />
              )}
            />
          </Grid>

          <Grid>
            <CustomLabel label={loginConstants.PASSWORD} isRequired={false} isAuth={true} />
            <Controller
              control={control}
              name="password"
              render={({ field }) => (
                <CustomInput
                  placeholder={loginConstants.ENTER_PASSWORD}
                  {...field}
                  hasError={!!errors.password}
                  errorMessage={errors.password?.message}
                  disableField={isPending}
                  isPassword
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const value = e.target.value;
                    field.onChange(value);
                  }}
                />
              )}
            />
            <Grid container justifyContent="flex-end" marginTop={2}>
              <Typography
                onClick={() =>
                  navigate('../forgot-password', {
                    state: {
                      isForgot: true,
                    },
                  })
                }
                color="Primary.main"
                variant="titleSemiBold5"
                sx={{ cursor: 'pointer' }}
              >
                {loginConstants.FORGOT_PASSWORD}
              </Typography>
            </Grid>
          </Grid>

          {isLocalhost && (
            <Grid>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isPatient}
                    onChange={e => setIsPatient(e.target.checked)}
                    color="primary"
                  />
                }
                label="Patient"
              />
            </Grid>
          )}

          <Grid size={{ xs: 12 }} mb={2}>
            <CustomButton
              variant="filled"
              fullWidth
              type="submit"
              disabled={isPending}
              label={isPending ? 'Logging in...' : loginConstants.CONFIRM_LOGIN}
            />
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default LoginPage;
