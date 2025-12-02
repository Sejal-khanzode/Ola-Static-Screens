import { Box, Grid, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import TabsForAdminSettings from './clinic/clinicPortalTabs';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { BackArrowIcon } from '../../../../assets/icons/backArrowIcon';
import { useAppSelector } from 'src/redux/hooks';
import { useQuery } from '@tanstack/react-query';
import { ClinicControllerService } from 'src/sdk/requests';
import { getGlobalRefetchClinicDetailsFunction } from '../pages/clinics/clinic/clinic-details';

export const AdminPortalClinic = () => {
  const navigate = useNavigate();
  const { uuid } = useParams();

  const handleBackToDashboard = () => {
    localStorage.removeItem('clinicSchema');
    navigate('/admin/clinics/dashboard');
  };

  const selectedClinic = useAppSelector((state: any) => state.clinicReducer?.data);

  const { data: clinicDetailsData } = useQuery({
    queryKey: ['clinicDetailsData', uuid],
    queryFn: () => ClinicControllerService.getApiMasterClinicByClinicId({ clinicId: uuid || '' }),
    enabled: !!uuid && !selectedClinic,
  });

  const clinicData = clinicDetailsData?.data || selectedClinic;
  const clinicName = clinicData?.name || '';

  useEffect(() => {
    const refetchFunction = getGlobalRefetchClinicDetailsFunction();
    if (refetchFunction) {
      refetchFunction();
    }
  }, []);

  return (
    <React.Fragment>
      <Grid size={12}>
        <Grid container>
          <Grid
            size={12}
            alignItems={'center'}
            sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 1 }}
          >
            <Box onClick={handleBackToDashboard}>
              <BackArrowIcon color="Primary.main" />
            </Box>
            <Typography variant="bodyRegular3">{clinicName}</Typography>
          </Grid>
          <Grid>
            <TabsForAdminSettings />
          </Grid>
        </Grid>
        <Grid size={12}>
          <Outlet />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
