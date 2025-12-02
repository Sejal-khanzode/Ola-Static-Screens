import { yupResolver } from '@hookform/resolvers/yup';
import { useLocation, useNavigate } from 'react-router-dom';
import { Grid, Typography } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { loginConstants } from '../../../constants/auth-constants';
import CustomLabel from '../../../components/core/reusable/custom-label/custom-label';
import CustomInput from '../../../components/core/reusable/custom-input/custom-input';
import CustomButton from '../../../components/core/reusable/custom-button/custom-button';
import { ForgotPasswordSchema } from '../../../schema/auth-schema/auth-schema';
import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import useApiFeedback from 'src/hooks/useApiFeedback';
import { ArrowBack } from '@mui/icons-material';
import { UserControllerService } from 'src/sdk/requests';

const ForgotPassword: React.FC = () => {
  const {
    control,
    formState: { errors },
    setValue,
    handleSubmit,
    getValues,
    clearErrors,
  } = useForm({
    resolver: yupResolver(ForgotPasswordSchema),
  });

  const navigate = useNavigate();
  const location = useLocation();
  const isForgot = location?.state?.isForgot;

  const {
    mutateAsync: sendOtp,
    isPending,
    isSuccess,
    isError,
    error,
    data,
  } = useMutation({
    mutationFn: UserControllerService.postApiMasterSetResetPasswordByLinkType,
  });

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setValue('email', value);

    if (value) {
      clearErrors('email');
    }
  };

  useEffect(() => {
    if (isSuccess) {
      navigate(`/auth/verify-otp/${getValues('email')}`, {
        state: {
          isForgot: isForgot,
        },
      });
    }
  }, [isSuccess]);

  useApiFeedback(
    isError,
    error,
    isSuccess,
    (data?.message || 'OTP sent successfully to email!') as string
  );

  const onSubmit = () => {
    sendOtp({
      linkType: 'reset',
      requestBody: {
        email: getValues('email'),
        isPatient: window.location.href.includes('patient'),
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid size={{ xs: 12 }} justifyContent={'center'} mb={12} width={'29vw'} ml={9}>
        <Grid display={'flex'} flexDirection={'column'} mb={4} width={'29vw'}>
          <Grid mb={1}>
            <Typography variant="titleMediumBold">{loginConstants.FORGOT_PASSWORD}</Typography>
          </Grid>
          <Grid>
            <Typography variant="bodyRegular4" color={'#74797B'}>
              {loginConstants.WELCOME_BACK}
            </Typography>
          </Grid>
        </Grid>
        <Grid>
          <CustomLabel label={loginConstants.EMAIL} isRequired={false} isAuth={true} />
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <CustomInput
                placeholder={loginConstants.ENTER_EMAIL}
                {...field}
                hasError={!!errors.email}
                errorMessage={errors.email?.message}
                disableField={isPending}
                onChange={handleEmailChange}
              />
            )}
          />
        </Grid>
        <Grid
          size={12}
          justifyContent={'center'}
          mt={2}
          display={'flex'}
          flexDirection={'column'}
          alignItems={'center'}
          gap={2}
        >
          <Grid size={12} display={'flex'}>
            <CustomButton
              variant="filled"
              type="submit"
              disabled={isPending}
              label={isPending ? 'Sending verification...' : loginConstants.SEND_VERIFICATION}
              fullWidth={true}
            />
          </Grid>

          <Grid size={12} display={'flex'} justifyContent={'center'}>
            <CustomButton
              variant="text"
              startIcon={<ArrowBack />}
              onClick={() => navigate('/auth/login')}
              label={loginConstants.BACK_TO_LOGIN}
            />
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default ForgotPassword;
