import { Box, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CommonTabs from '../../../../../components/core/reusable/common-tabs/common-tabs';
import { BackArrowIcon } from 'src/assets/icons/backArrowIcon';
import CustomButton from 'src/components/core/reusable/custom-button/custom-button';
import { ProviderControllerService, UserControllerService } from 'src/sdk/requests';
import { useQuery } from '@tanstack/react-query';
import CustomDrawer from 'src/components/core/reusable/custom-drawer/custom-drawer';
import AdminUserForm from 'src/pages/apps/admin/pages/settings/admin-users/admin-user-form';
import { EditIcon } from 'src/assets/icons/editIcon';
import { useDispatch } from 'react-redux';
import { hideLoader, showLoader } from 'src/redux/reducers/loaderReducer';
import { providerSettingConstants } from 'src/constants/setting-constants';
import useAuthority from 'src/hooks/use-authority';

export const ProviderTabsConst = ['Profile'];

export const ProviderPortalAccount = () => {
  const navigate = useNavigate();
  const [openAddUserDialog, setOpenAddUserDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const dispatch = useDispatch();
  const { isProvider } = useAuthority();

  const {
    data: userData,
    isPending: isPendingUserProfile,
    refetch,
  } = useQuery({
    queryKey: ['ProviderData'],
    queryFn: () => {
      if (isProvider) {
        return ProviderControllerService.getApiMasterProviderProfile();
      } else {
        return UserControllerService.getApiMasterProfile();
      }
    },
  });

  const tabItems =
    ProviderTabsConst?.map((label, index) => ({
      label,
      value: `tab-${index}`,
    })) || [];

  const returnIndex = () => {
    const pathSegments = location?.pathname?.split('/');
    const lastSegment = pathSegments?.[pathSegments.length - 1];
    const secondLastSegment = pathSegments?.[pathSegments.length - 2];

    if (secondLastSegment === 'profile') {
      return 0;
    } else if (lastSegment === 'patient-flag') {
      return 1;
    } else {
      return 0;
    }
  };

  const [value, setValue] = useState(returnIndex());

  useEffect(() => {
    setValue(returnIndex());
  }, [location.pathname]);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    switch (newValue) {
      case 0:
        navigate(`profile`);
        break;
      case 1:
        navigate(`patient-flag`);
        break;
    }
    setValue(newValue);
  };

  const handleBackToDashboard = () => {
    navigate('/provider/settings');
  };

  const handleEdit = () => {
    setSelectedUser(userData);
    setIsEditMode(true);
    setOpenAddUserDialog(true);
  };

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (isPendingUserProfile) {
      dispatch(showLoader());
    } else {
      dispatch(hideLoader());
    }
  }, [isPendingUserProfile, dispatch]);

  return (
    <Box>
      <Grid container sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Grid
          alignItems={'center'}
          sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 1 }}
        >
          <Box display={'flex'} alignItems={'center'} gap={1}>
            <Box onClick={handleBackToDashboard} sx={{ cursor: 'pointer' }}>
              <BackArrowIcon color="Primary.main" />
            </Box>
            <Typography variant="bodyRegular3">
              {providerSettingConstants.PROVIDER_SETTINGS}
            </Typography>
          </Box>
        </Grid>

        {tabItems?.length > 1 && (
          <Grid size={{ xs: 6 }} pt={1}>
            <CommonTabs
              tabItems={tabItems}
              tabValue={value}
              onTabValueChange={(newValue: number) =>
                handleChange({} as React.SyntheticEvent, newValue)
              }
              onTabChange={(newValue: number) => handleChange({} as React.SyntheticEvent, newValue)}
            />{' '}
          </Grid>
        )}

        <Grid alignItems={'end'}>
          {value === 0 && (
            <CustomButton
              variant="outlined"
              startIcon={<EditIcon />}
              onClick={() => handleEdit()}
              label={'Edit Profile'}
            />
          )}
        </Grid>
      </Grid>

      <Grid>
        <CustomDrawer
          title={isEditMode ? 'Edit Profile' : 'Edit Profile'}
          anchor="right"
          open={openAddUserDialog}
          onClose={() => {
            setOpenAddUserDialog(false);
            setSelectedUser(null);
            setIsEditMode(false);
          }}
          drawerPadding="18px"
        >
          <AdminUserForm
            onClose={() => {
              setOpenAddUserDialog(false);
              setSelectedUser(null);
              setIsEditMode(false);
            }}
            RefetchUserData={refetch}
            isEdit={isEditMode}
            uuid={selectedUser?.uuid || ''}
            userData={isEditMode ? selectedUser?.data : undefined}
          />
        </CustomDrawer>
      </Grid>
    </Box>
  );
};
