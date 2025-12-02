import { Box, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AddIcon } from 'src/assets/icons/addIcon';
import { BackArrowIcon } from 'src/assets/icons/backArrowIcon';
import CommonTabs from 'src/components/core/reusable/common-tabs/common-tabs';
import CustomButton from 'src/components/core/reusable/custom-button/custom-button';
import AddEditApptTypes from 'src/pages/apps/provider/pages/settings/availability/add-edit-appt-types';
import CustomDrawer from 'src/components/core/reusable/custom-drawer/custom-drawer';
import { getGlobalRefetchApptTypeFunction } from 'src/pages/apps/provider/pages/settings/availability/appointment-types';
import { formConstants } from 'src/constants/setting-constants';

const TabsConst = ['Availability', 'Appointment Types', 'Color Configuration'];

export const AvailabilityRoutes = () => {
  const navigate = useNavigate();
  const [isCreateMode, setIsCreateMode] = useState(false);

  const tabItems =
    TabsConst?.map((label, index) => ({
      label,
      value: `tab-${index}`,
    })) || [];

  const returnIndex = () => {
    const pathSegments = location?.pathname?.split('/');
    const lastSegment = pathSegments?.[pathSegments.length - 1];
    const secondLastSegment = pathSegments?.[pathSegments.length - 2];

    if (secondLastSegment === 'availability') {
      return 0;
    } else if (lastSegment === 'appointment-types') {
      return 1;
    } else if (lastSegment === 'color-config') {
      return 2;
    } else {
      return 0;
    }
  };

  const [value, setValue] = useState(returnIndex());
  const handleBackToDashboard = () => {
    navigate('/provider/settings');
  };

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    switch (newValue) {
      case 0:
        navigate(`availability`);
        break;
      case 1:
        navigate(`appointment-types`);
        break;
      case 2:
        navigate(`color-config`);
        break;
    }
    setValue(newValue);
  };

  const handleAddAppointmentType = () => {
    setIsCreateMode(true);
  };

  return (
    <Box>
      <Grid container sx={{ display: 'flex', gap: 1, justifyContent: 'space-between' }}>
        <Grid
          size={12}
          alignItems={'center'}
          sx={{
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            justifyContent: 'space-between',
          }}
        >
          <Box display={'flex'} alignItems={'center'} gap={1}>
            <Box onClick={handleBackToDashboard} sx={{ cursor: 'pointer' }}>
              <BackArrowIcon color="Primary.main" />
            </Box>
            <Typography variant="bodyRegular3">Appointment Settings</Typography>
          </Box>
        </Grid>
        <Grid pt={1} pb={1}>
          <CommonTabs
            tabItems={tabItems}
            tabValue={value}
            onTabValueChange={(newValue: number) =>
              handleChange({} as React.SyntheticEvent, newValue)
            }
            onTabChange={(newValue: number) => handleChange({} as React.SyntheticEvent, newValue)}
          />
        </Grid>

        <Grid>
          {value === 1 && (
            <CustomButton
              variant="filled"
              startIcon={<AddIcon />}
              onClick={handleAddAppointmentType}
              label={formConstants.ADD_APPT_TYPE}
            />
          )}
        </Grid>
      </Grid>

      <CustomDrawer
        title={formConstants.ADD_APPT_TYPE}
        anchor="right"
        open={isCreateMode}
        onClose={() => {
          setIsCreateMode(false);
        }}
        drawerPadding="18px"
      >
        <AddEditApptTypes
          onClose={() => {
            setIsCreateMode(false);
          }}
          isEdit={false}
          ReftechData={() => {
            const refetchFunction = getGlobalRefetchApptTypeFunction();
            if (refetchFunction) {
              refetchFunction();
            } else {
              setTimeout(() => {
                window.location.reload();
              }, 1000);
            }
          }}
        />
      </CustomDrawer>
    </Box>
  );
};
