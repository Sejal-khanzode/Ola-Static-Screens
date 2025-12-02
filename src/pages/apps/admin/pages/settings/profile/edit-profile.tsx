// components/NotificationDrawer.tsx
import { useEffect } from 'react';
import { Box, Stack, Grid } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import CustomLabel from '../../../../../../components/core/reusable/custom-label/custom-label';
import { settingConstants } from '../../../../../../constants/admin-constants';
import { editProfileSchema } from '../../../../../../schema/user-schema/user-schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { User } from '../../../../../../sdk/requests/types.gen';
import { UserControllerService } from '../../../../../../sdk/requests/services.gen';
import { useMutation } from '@tanstack/react-query';
import { useAppSelector, useAppDispatch } from '../../../../../../redux/hooks';
import { setSnackbarOn } from '../../../../../../redux/actions/snackbar-actions';
import { AlertSeverity } from '../../../../../../components/core/reusable/snackbar-alert/snackbar-alert';
import CustomInput from '../../../../../../components/core/reusable/custom-input/custom-input';
import CustomButton from '../../../../../../components/core/reusable/custom-button/custom-button';
import useApiFeedback from '../../../../../../hooks/useApiFeedback';
import CustomContactInput from '../../../../../..//components/core/reusable/custom-contact-input/custom-contact-field';
import CustomSelect from 'src/components/core/reusable/custom-select/custom-select';

export const rolesList: { value: string; label: string }[] = [
  { value: 'TENANT_ADMIN', label: 'Tenant Admin' },
  { value: 'TENANT_SUPPORT', label: 'Tenant Support' },
];

interface EditProfileDialogProps {
  schema?: string;
  isEdit?: boolean;
  handleDrawerClose: () => void;
  refetchList?: () => void;
  uuid?: string;
}

const AdminEditProfile = (props: EditProfileDialogProps) => {
  const { isEdit, handleDrawerClose, refetchList, uuid } = props;
  const dispatch = useAppDispatch();

  const userDataAPI = useAppSelector((state: any) => state.user?.userData);

  const form = useForm({
    resolver: yupResolver(editProfileSchema),
    defaultValues: {
      lastName: '',
      firstName: '',
      email: '',
      phone: '',
      roles: [],
    },
  });

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = form;

  useEffect(() => {
    if (userDataAPI && isEdit) {
      reset({
        lastName: userDataAPI?.lastName || '',
        firstName: userDataAPI?.firstName || '',
        email: userDataAPI?.email || '',
        phone: userDataAPI?.phone || '',
        roles: userDataAPI?.roles || [],
      });
    }
  }, [userDataAPI, isEdit, reset]);

  const {
    mutateAsync: asyncEditAdmin,
    data,
    isSuccess,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: UserControllerService.putApiMasterUser,
  });

  useEffect(() => {
    if (isSuccess) {
      handleDrawerClose();
      refetchList?.();
    }
  }, [isSuccess]);

  useApiFeedback(
    isError,
    error,
    isSuccess,
    (data?.message || 'Profile updated successfully') as string
  );

  const onSubmit = async (values: any) => {
    if (!userDataAPI) {
      dispatch(
        setSnackbarOn({
          severity: AlertSeverity.ERROR,
          message: 'No user data available. Please refresh the page and try again.',
        })
      );
      return;
    }

    if (!values.firstName || !values.lastName || !values.email || !values.phone || !values.roles) {
      dispatch(
        setSnackbarOn({
          severity: AlertSeverity.ERROR,
          message: 'Please fill in all required fields.',
        })
      );
      return;
    }

    const payload: User = {
      ...userDataAPI,
      firstName: values.firstName.trim(),
      lastName: values.lastName.trim(),
      email: values.email.trim().toLowerCase(),
      phone: values.phone.trim(),
      roles: values.roles as any,
    };

    try {
      await asyncEditAdmin({
        requestBody: payload,
      });
    } catch (error) {
      console.error('Failed to update user:', error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ height: '100%', p: 3, overflowY: 'auto' }}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 12 }}>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <CustomLabel label={settingConstants.FIRST_NAME} isRequired />
                  <Controller
                    name="firstName"
                    control={control}
                    render={({ field }) => (
                      <CustomInput
                        placeholder={`${settingConstants.ENTER} ${settingConstants.FIRST_NAME}`}
                        {...field}
                        hasError={!!errors.firstName}
                        errorMessage={errors.firstName?.message as string}
                        disableField={isPending}
                      />
                    )}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <CustomLabel label={settingConstants.LAST_NAME} isRequired />
                  <Controller
                    name="lastName"
                    control={control}
                    render={({ field }) => (
                      <CustomInput
                        placeholder={`${settingConstants.ENTER} ${settingConstants.LAST_NAME}`}
                        {...field}
                        hasError={!!errors.lastName}
                        errorMessage={errors.lastName?.message as string}
                        disableField={isPending}
                      />
                    )}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <CustomLabel label={settingConstants.EMAIL} isRequired />
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <CustomInput
                        placeholder={`${settingConstants.ENTER} ${settingConstants.EMAIL}`}
                        {...field}
                        disableField={uuid ? true : false}
                        hasError={!!errors.email}
                        errorMessage={errors.email?.message as string}
                      />
                    )}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <CustomLabel label={settingConstants.CONTACT_NUMBER} isRequired />
                  <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                      <CustomContactInput
                        placeholder={`${settingConstants.ENTER} ${settingConstants.CONTACT_NUMBER}`}
                        {...field}
                        hasError={!!errors.phone}
                        errorMessage={errors.phone?.message as string}
                        isDisabled={isPending}
                      />
                    )}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <CustomLabel label={settingConstants.ROLE} isRequired />
                  <Controller
                    name="roles"
                    control={control}
                    render={({ field }) => (
                      <CustomSelect
                        items={rolesList}
                        placeholder={settingConstants.ROLE}
                        value={Array.isArray(field.value) ? field.value[0] || '' : field.value || ''}
                        onChange={(e) => field.onChange([e.target.value])}
                        name={field.name}
                        hasError={!!errors.roles}
                        errorMessage={errors.roles?.message as string}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Stack direction="row" justifyContent="flex-end" mt={4} gap={2}>
            <CustomButton
              variant="outlined"
              onClick={handleDrawerClose}
              disabled={isPending}
              label={settingConstants.CANCEL}
            />

            <CustomButton
              variant="filled"
              type="submit"
              disabled={isPending}
              label={isPending ? 'Saving...' : settingConstants.SAVE}
            />
          </Stack>
        </Box>
      </form>
    </>
  );
};

export default AdminEditProfile;
