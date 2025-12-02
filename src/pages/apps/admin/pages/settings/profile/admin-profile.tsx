import { useEffect, useState } from 'react';
import { Box, Typography, Paper, Button, Grid } from '@mui/material';
import { settingConstants } from '../../../../../../constants/admin-constants';
import CustomButton from '../../../../../../components/core/reusable/custom-button/custom-button';
import { EditIcon } from '../../../../../../assets/icons/editIcon';
import { useQuery } from '@tanstack/react-query';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { UserControllerService } from 'src/sdk/requests';
import { setUserData } from 'src/redux/user/userReducer';
import AdminEditProfile from './edit-profile';
import CustomDrawer from 'src/components/core/reusable/custom-drawer/custom-drawer';
import ChangePassword from './change-password';
import { hideLoader, showLoader } from 'src/redux/reducers/loaderReducer';
import { formatRoleDisplay } from 'src/utils/roleFormatter';
import { formatPhoneNumber } from 'src/utils/toCamelCase';

const AdminProfile = () => {
  const dispatch = useAppDispatch();
  const userDataAPI = useAppSelector((state: any) => state.user?.userData);
  const [openEditProfileDialog, setOpenEditProfileDialog] = useState(false);

  const {
    data: userData,
    refetch: asyncUserProfile,
    isSuccess: isSuccessUserProfile,
    isPending: isPendingUserProfile,
  } = useQuery({
    queryKey: ['AdminProviderData'],
    queryFn: () => {
      return UserControllerService.getApiMasterProfile();
    },
  });

  const UUID = userData?.data?.uuid as string;

  const refetchUserProfile = () => {
    asyncUserProfile({});
  };

  useEffect(() => {
    refetchUserProfile();
  }, []);

  useEffect(() => {
    if (isPendingUserProfile) {
      dispatch(showLoader());
    } else {
      dispatch(hideLoader());
    }
  }, [isPendingUserProfile, dispatch]);

  useEffect(() => {
    if (userData?.data) {
      dispatch(setUserData(userData.data));
    }
  }, [userData, dispatch]);

  useEffect(() => {
    if (isSuccessUserProfile) {
      dispatch(setUserData(userData?.data));
    }
  }, [isSuccessUserProfile]);

  const adminFields = [
    {
      label: settingConstants.NAME,
      value: `${userDataAPI?.firstName || ''} ${userDataAPI?.lastName || ''}`,
    },
    { label: settingConstants.EMAIL, value: userDataAPI?.email },
    {
      label: settingConstants.CONTACT_NUMBER,
      value: userDataAPI?.phone ? formatPhoneNumber(userDataAPI?.phone) : '-',
    },
    {
      label: settingConstants.ROLE,
      value: Array.isArray(userDataAPI?.roles)
        ? userDataAPI?.roles.map((role: string) => formatRoleDisplay(role)).join(', ')
        : formatRoleDisplay(userDataAPI?.roles || '-'),
    },
  ];

  // const fieldsToShow = isProviderPortal ? providerFields : adminFields;
  const fieldsToShow = adminFields;

  const [openChangePasswordDialog, setOpenChangePasswordDialog] = useState(false);

  return (
    <Grid container sx={{ width: '100%', borderRadius: 1.5 }}>
      <Grid size={12}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid>
            <Typography variant="titleBold4" color="Primary.main">
              {settingConstants.ADMIN_PROFILE}
            </Typography>
          </Grid>

          <Grid>
            <CustomButton
              variant="outlined"
              onClick={() => setOpenEditProfileDialog(true)}
              startIcon={<EditIcon color="Primary.main" />}
              label={settingConstants.EDIT_PROFILE}
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid container size={12} sx={{ position: 'relative' }}>
        <Paper
          elevation={3}
          sx={{
            position: 'absolute',
            top: 40,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '30%',
            p: 4,

            borderRadius: 1,
            textAlign: 'center',
          }}
        >
          <Grid container direction="column" gap={1.5}>
            {fieldsToShow.map(
              field =>
                field.value && (
                  <Grid
                    container
                    key={field.label}
                    alignItems="center"
                    sx={{ width: '100%', pl: 4 }}
                  >
                    <Grid size={5}>
                      <Typography
                        variant="bodyMedium4"
                        color="Neutral.60"
                        sx={{ display: 'flex', justifyContent: 'flex-start', pb: 1 }}
                      >
                        {field.label}
                      </Typography>
                    </Grid>
                    <Grid size={7}>
                      <Typography
                        variant="bodyMedium4"
                        color="Neutral.80"
                        sx={{ display: 'flex', justifyContent: 'flex-start' }}
                      >
                        <Box component="span" mx={0.5} gap={2}>
                          :
                        </Box>
                        {field.value}
                      </Typography>
                    </Grid>
                  </Grid>
                )
            )}
          </Grid>

          <Grid container justifyContent="center" py={2}>
            <Button variant="contained" onClick={() => setOpenChangePasswordDialog(true)}>
              {settingConstants.CHANGE_PASSWORD}
            </Button>
          </Grid>
        </Paper>
      </Grid>

      {/* Edit Profile Drawer */}
      <Grid size={12}>
        <CustomDrawer
          title={settingConstants.EDIT_PROFILE}
          open={openEditProfileDialog}
          onClose={() => setOpenEditProfileDialog(false)}
          anchor="right"
          drawerWidth="40vw"
          drawerPadding="12px"
        >
          <AdminEditProfile
            uuid={UUID}
            isEdit={true}
            handleDrawerClose={() => setOpenEditProfileDialog(false)}
            refetchList={refetchUserProfile}
          />
        </CustomDrawer>
      </Grid>

      <Grid size={12}>
        <CustomDrawer
          title={settingConstants.CHANGE_PASSWORD}
          open={openChangePasswordDialog}
          onClose={() => setOpenChangePasswordDialog(false)}
          anchor="right"
          drawerWidth="30vw"
          drawerPadding="12px"
        >
          <ChangePassword onClose={() => setOpenChangePasswordDialog(false)} />
        </CustomDrawer>
      </Grid>
    </Grid>
  );
};

export default AdminProfile;
