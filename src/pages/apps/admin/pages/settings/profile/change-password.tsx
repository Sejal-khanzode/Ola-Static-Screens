
import { Box, Grid, Button } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import CustomInput from '../../../../../../components/core/reusable/custom-input/custom-input';
import CustomLabel from '../../../../../../components/core/reusable/custom-label/custom-label';
import { settingConstants } from '../../../../../../constants/admin-constants';
import { UserControllerService } from '../../../../../../sdk/requests';
import { useMutation } from '@tanstack/react-query';
import { useAppDispatch } from '../../../../../../redux/hooks';
import { setSnackbarOn } from '../../../../../../redux/actions/snackbar-actions';
import { AlertSeverity } from '../../../../../../components/core/reusable/snackbar-alert/snackbar-alert';
import { changePasswordSchema } from '../../../../../../schema/user-schema/user-schema';
import useApiFeedback from '../../../../../../hooks/useApiFeedback';

interface ChangePasswordSubmit {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword?: string;
}

interface ChangePasswordProps {
  onClose?: () => void;
}

const ChangePassword = (props: ChangePasswordProps) => {
  const { onClose } = props;
  const dispatch = useAppDispatch();

  // Initial form values
  const initialValues = {
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  };

  const method = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(changePasswordSchema),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = method;

  const {
    mutateAsync: changePasswordAsync,
    isPending,
    isError:isErrorChangePassword,
    isSuccess:isSuccessChangePassword,
    error:errorChangePassword,
    data:dataChangePassword,

  } = useMutation({
    mutationFn: UserControllerService.postApiMasterChangePassword,
    onSuccess: () => {
      dispatch(
        setSnackbarOn({
          severity: AlertSeverity.SUCCESS,
          message: "Password changed successfully",
        })
      );
      if (onClose) onClose();
    },
    onError: (error: any) => {
      console.error('Error changing password:', error);
      
      let errorMessage = "Failed to change password. Please try again.";
      
      if (error?.code === 'INVALID_OLD_PASSWORD') {
        errorMessage = "Current password is incorrect. Please enter the correct current password.";
      } else if (error?.message) {
        errorMessage = error.message;
      }
      
      dispatch(
        setSnackbarOn({
          severity: AlertSeverity.ERROR,
          message: errorMessage,
        })
      );
    },
  });

  useApiFeedback(
    isErrorChangePassword,
    errorChangePassword,
    isSuccessChangePassword,
    (dataChangePassword?.message || 'Password changed successfully') as string
  );

  const onSubmit = async (values: ChangePasswordSubmit) => {
    try {
      await changePasswordAsync({
        requestBody: {
          oldPassword: values.oldPassword,
          newPassword: values.newPassword,
        },
      });
    } catch (error) {
      console.error('Failed to change password:', error);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <FormProvider {...method}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12 }}>
              <CustomLabel label={settingConstants.CURRENT_PASSWORD} isRequired />
              <Controller
                control={control}
                name="oldPassword"
                render={({ field }) => (
                  <CustomInput
                    placeholder={`${settingConstants.ENTER} ${settingConstants.CURRENT_PASSWORD}`}
                    hasError={!!errors.oldPassword}
                    errorMessage={errors.oldPassword?.message}
                    {...field}
                    isPassword
                    disableField={isPending}
                  />
                )}
              />
            </Grid>
            
            <Grid size={{ xs: 12 }}>
              <CustomLabel label={settingConstants.NEW_PASSWORD} isRequired />
              <Controller
                control={control}
                name="newPassword"
                render={({ field }) => (
                  <CustomInput
                    placeholder={`${settingConstants.ENTER} ${settingConstants.NEW_PASSWORD}`}
                    hasError={!!errors.newPassword}
                    errorMessage={errors.newPassword?.message}
                    {...field}
                    isPassword
                    disableField={isPending}
                  />
                )}
              />
            </Grid>
            
            <Grid size={{ xs: 12 }}>
              <CustomLabel label={settingConstants.CONFIRM_NEW_PASSWORD} isRequired />
              <Controller
                control={control}
                name="confirmNewPassword"
                render={({ field }) => (
                  <CustomInput
                    placeholder={`${settingConstants.ENTER} ${settingConstants.CONFIRM_NEW_PASSWORD}`}
                    hasError={!!errors.confirmNewPassword}
                    errorMessage={errors.confirmNewPassword?.message}
                    {...field}
                    isPassword
                    disableField={isPending}
                  />
                )}
              />
            </Grid>
            
            <Grid size={{ xs: 12 }}>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                <Button 
                  variant="outlined" 
                  onClick={onClose}
                  disabled={isPending}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  variant="contained"
                  disabled={isPending}
                >
                  {isPending ? 'Updating...' : settingConstants.UPDATE_PASSWORD}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </Box>
  );
};

export default ChangePassword;
