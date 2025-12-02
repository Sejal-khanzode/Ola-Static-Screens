import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Grid, Typography } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { loginConstants } from '../../../constants/auth-constants';
import CustomLabel from '../../../components/core/reusable/custom-label/custom-label';
import { SetPasswordSchema } from '../../../schema/auth-schema/auth-schema';
import { useMutation } from '@tanstack/react-query';
import { UserControllerService } from 'src/sdk/requests';
import useApiFeedback from 'src/hooks/useApiFeedback';
import CustomInput from '../reusable/custom-input/custom-input';

interface SetPasswordForm {
  newPassword: string;
  confirmPassword: string;
}

const SetPassword = () => {
  const navigate = useNavigate();
  const { username } = useParams();

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<SetPasswordForm>({
    mode: 'onChange',
    resolver: yupResolver(SetPasswordSchema),
  });

  const {
    mutateAsync: asyncSetPassword,
    data,
    error,
    isError,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: UserControllerService.postApiMasterSetPasswordByLinkType,
  });

  useApiFeedback(
    isError,
    error,
    isSuccess,
    (data?.message || 'Password set successfully') as string
  );

  const onSubmit = async (values: SetPasswordForm) => {
    await asyncSetPassword({
      requestBody: {
        newPassword: values.newPassword,
        emailId: username || '',
        isPatient: window.location.href.includes('patient'),
      },
      linkType: 'reset',
    });
    navigate('../login');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3} width={'29vw'} ml={5} mb={10}>
        <Grid display={'flex'} mt={5} mb={4}>
          <Grid>
            <Typography variant="titleMediumBold">{loginConstants.SET_NEW_PASSWORD}</Typography>
          </Grid>
        </Grid>
        <Grid display={'flex'} flexDirection={'column'} width={'29vw'}>
          <Grid mb={3}>
            <CustomLabel label={loginConstants.NEW_PASSWORD} isRequired={false} isAuth={true} />

            <Controller
              control={control}
              name="newPassword"
              render={({ field }) => (
                <CustomInput
                  isAuth={true}
                  isPassword={true}
                  placeholder={loginConstants.PASSWORD}
                  {...field}
                  hasError={!!errors.newPassword}
                  errorMessage={errors.newPassword?.message}
                  isNumeric={false}
                />
              )}
            />
          </Grid>
          <Grid>
            <CustomLabel label={loginConstants.CONFIRM_PASSWORD} isRequired={false} isAuth={true} />
            <Controller
              control={control}
              name="confirmPassword"
              render={({ field }) => (
                <CustomInput
                  isAuth={true}
                  isPassword={true}
                  placeholder={loginConstants.CONFIRM_PASSWORD}
                  {...field}
                  hasError={!!errors.confirmPassword}
                  errorMessage={errors.confirmPassword?.message}
                  isNumeric={false}
                />
              )}
            />
          </Grid>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Button variant="contained" fullWidth type="submit" disabled={isPending}>
            {isPending ? 'Logging in...' : loginConstants.SET_PASSWORD}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default SetPassword;
