import CommonTabsOutlet from 'src/components/core/reusable/common-tab-outlet/common-tabs-outlet';
import { Box, Grid } from '@mui/material';
import CustomButton from 'src/components/core/reusable/custom-button/custom-button';
import { AddIcon } from 'src/assets/icons/addIcon';
import ClientInsurance from 'src/pages/apps/client/pages/insurance/client-insurance';
import CustomDrawer from 'src/components/core/reusable/custom-drawer/custom-drawer';
import AddInsuranceForm from 'src/pages/apps/client/pages/insurance/add-client-insurance';
import { ClientInsurnaceLables, EligibilityLables } from 'src/constants/setting-constants';
import { useState } from 'react';
import { getDataFromLocalStorage } from 'src/sdk/requests/core/localStorage';
import { useQueryClient } from '@tanstack/react-query';
import Eligibility from 'src/pages/apps/provider/pages/patients/patient-profile/insurance/eligibility/eligibility';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AddEligibility from './insurance/eligibility/addEligibility';

const InsuranceSubTabsOutlet = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const patientUUID = getDataFromLocalStorage('patientUUID');
  const [drawerMode, setDrawerMode] = useState<'add' | 'edit'>('add');
  const [selectedInsurance, setSelectedInsurance] = useState<any>(null);
  const [drawerEligibilityOpen, setDrawerEligibilityOpen] = useState(false);

  const queryClient = useQueryClient();

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setDrawerEligibilityOpen(false);
    setSelectedInsurance(null);
  };

  const handleFormSubmit = async () => {
    await queryClient.invalidateQueries({ queryKey: ['patienInusrancetData'] });
    handleCloseDrawer();
  };

  const INSURANCE_TABS_CONFIG = [
    {
      id: 'insurance',
      label: 'Insurance',
      component: ClientInsurance,
      actions: (
        <Box display="flex" gap={1}>
          <CustomButton
            startIcon={<AddIcon />}
            variant="filled"
            label="Add Insurance"
            onClick={() => {
              setDrawerMode('add');
              setDrawerOpen(true);
            }}
          />
        </Box>
      ),
    },
    {
      id: 'eligibility',
      label: 'Eligibility',
      component: Eligibility,
      actions: (
        <Box display="flex">
          <CustomButton
            startIcon={<CheckCircleOutlineIcon />}
            variant="outlined"
            label="Check Eligibility"
            onClick={() => {
              setDrawerEligibilityOpen(true);
            }}
          />
        </Box>
      ),
    },
  ];

  return (
    <Grid>
      <CommonTabsOutlet tabsConfig={INSURANCE_TABS_CONFIG} />

      <CustomDrawer
        anchor="right"
        open={drawerOpen}
        onClose={handleCloseDrawer}
        title={
          drawerMode === 'edit'
            ? ClientInsurnaceLables.EDIT_INSURANCE
            : ClientInsurnaceLables.ADD_INSURANCE
        }
        drawerWidth="50vw"
      >
        <AddInsuranceForm
          defaultValues={selectedInsurance?.formData || {}}
          onSubmit={handleFormSubmit}
          onCancel={handleCloseDrawer}
          isEdit={drawerMode === 'edit'}
          patientClinicUuid={patientUUID || ''}
          insuranceUuid={selectedInsurance?.uuid}
        />
      </CustomDrawer>

      <CustomDrawer
        anchor="right"
        open={drawerEligibilityOpen}
        onClose={handleCloseDrawer}
        title={EligibilityLables.ELIGIBILITY_CHECK}
        drawerWidth="50vw"
      >
        <AddEligibility />
      </CustomDrawer>
    </Grid>
  );
};

export default InsuranceSubTabsOutlet;
