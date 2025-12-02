import CommonTabsOutlet from 'src/components/core/reusable/common-tab-outlet/common-tabs-outlet';
import PaymentCardsSubtab from '../profile/payment-cards-subtab';
import ProfileDetailsTab from './profile-details-tab';
import { Box, Button, Grid, Typography } from '@mui/material';
import CustomButton from 'src/components/core/reusable/custom-button/custom-button';
import { useNavigate } from 'react-router-dom';
import { getDataFromLocalStorage } from 'src/sdk/requests/core/localStorage';
import ConfirmationPopUp from 'src/components/core/reusable/confirmation-pop-up/confirmation-pop-up';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ClinicControllerService, PatientClinicControllerService } from 'src/sdk/requests';
import useApiFeedback from 'src/hooks/useApiFeedback';
import { APIFeedbackMessages } from 'src/constants/formConst';
import SimpleStripeProvider from 'src/components/stripe/SimpleStripeProvider';
import StripeCardElement from '../profile/stripe-card-element';
import CustomDrawer from 'src/components/core/reusable/custom-drawer/custom-drawer';
import { hideLoader, showLoader } from 'src/redux/reducers/loaderReducer';
import { useAppDispatch } from 'src/redux/hooks';
import { AddIcon } from 'src/assets/icons/addIcon';

const ProfileSubTabsOutlet = () => {
  const navigate = useNavigate();
  const patientUuid = getDataFromLocalStorage('patientUUID');
  const clinicUuid = getDataFromLocalStorage('selectedClinicUuid');
  const [open, setOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const dispatch = useAppDispatch();
  const {
    mutate: archivePatient,
    isSuccess: isSuccessArchivePatient,
    isError: isErrorArchivePatient,
    error: errorArchivePatient,
    data: dataArchivePatient,
    isPending: isArchivePending,
  } = useMutation({
    mutationFn:
      PatientClinicControllerService.putApiMasterPatientClinicByPatientClinicIdArchiveStatusByStatus,
  });

  const {
    data: profileData,
    refetch: refetchProfileData,
    isPending: isLoadingPatientData,
  } = useQuery({
    queryKey: ['patientData', patientUuid],
    queryFn: () =>
      PatientClinicControllerService.getApiMasterPatientClinicByPatientClinicUuid({
        patientClinicUuid: patientUuid as string,
      }),
  });

  const { data: ClinicDetails } = useQuery({
    queryKey: ['clinicDetails', clinicUuid],
    queryFn: () =>
      ClinicControllerService.getApiMasterClinicByClinicId({
        clinicId: clinicUuid as string,
      }),
  });

  const clinicData = ClinicDetails?.data;
  const profileArchived = profileData?.data?.archived;
  const patientData = (profileData?.data as any)?.patient as any;
  const patientName = `${patientData?.firstName} ${patientData?.lastName}`;

  const handleEditPatient = () => {
    navigate(`/provider/patients/patient-profile/profile-details/edit-profile/${patientUuid}`);
  };

  const handleArchivePatient = () => {
    setOpen(true);
  };

  const handleConfirmArchivePatient = () => {
    archivePatient(
      {
        patientClinicId: patientUuid || '',
        status: !profileArchived,
      },
      {
        onSuccess: () => {
          refetchProfileData();
        },
      }
    );
    setOpen(false);
  };

  useApiFeedback(
    isErrorArchivePatient,
    errorArchivePatient,
    isSuccessArchivePatient,
    (dataArchivePatient?.message ||
      (profileArchived
        ? APIFeedbackMessages.PATIENT_RESTORED_SUCCESSFULLY
        : APIFeedbackMessages.PATIENT_ARCHIVED_SUCCESSFULLY)) as string
  );

  useEffect(() => {
    if (isArchivePending || isLoadingPatientData) {
      dispatch(showLoader);
    } else {
      dispatch(hideLoader);
    }
  }, [isArchivePending, isLoadingPatientData]);

  const PROFILE_TABS_CONFIG = [
    {
      id: 'profile-details',
      label: 'Profile',
      component: ProfileDetailsTab,
      actions: (
        <Box display="flex" gap={1}>
          <Button variant="outlined" onClick={handleEditPatient} sx={{ width: '5rem' }}>
            <Typography variant="bodyMedium4" color="#233853">
              Edit
            </Typography>
          </Button>
          <Button
            sx={{
              borderRadius: 0.5,
              border: '1px solid',
              borderColor: 'Warning.50',
              padding: '8px 16px',
              backgroundColor: 'Warning.1',
              opacity: isArchivePending ? 0.6 : 1,
              pointerEvents: isArchivePending ? 'none' : 'auto',
              width: '5rem',
            }}
            // startIcon={
            //   isArchivePending ? (
            //     <CircularProgress size={16} sx={{ color: 'Warning.50' }} />
            //   ) : profileArchived ? (
            //     <RestoreIcon sx={{ color: 'Warning.50' }} />
            //   ) : (
            //     <ArchiveIcon sx={{ color: 'Warning.50' }} />
            //   )
            // }
            onClick={handleArchivePatient}
            disabled={isArchivePending}
          >
            <Typography variant="bodyMedium4" color="Warning.50">
              {isArchivePending ? 'Processing...' : profileArchived ? 'Restore' : 'Archive'}
            </Typography>
          </Button>
        </Box>
      ),
    },
    {
      id: 'payment-cards',
      label: 'Payment Cards',
      component: PaymentCardsSubtab,
      disabled: false,
      actions: (
        <CustomButton
          startIcon={<AddIcon />}
          variant="filled"
          label="Add Payment Card"
          disabled={!clinicData?.stripeOnboarding}
          message={
            !clinicData?.stripeOnboarding
              ? 'Clinic not enrolled for payments. Please contact the administrator to enroll.'
              : ''
          }
          onClick={() => setIsDrawerOpen(true)}
        />
      ),
    },
  ];

  return (
    <Grid>
      <CommonTabsOutlet tabsConfig={PROFILE_TABS_CONFIG} />

      <CustomDrawer
        title="Add Payment Card"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        anchor="right"
        drawerWidth="45vw"
        drawerPadding="20px"
      >
        <SimpleStripeProvider>
          <StripeCardElement onClose={() => setIsDrawerOpen(false)} />
        </SimpleStripeProvider>
      </CustomDrawer>

      <Grid>
        <ConfirmationPopUp
          open={open}
          onClose={() => setOpen(false)}
          onConfirm={handleConfirmArchivePatient}
          title="Confirm"
          message={`Do you really want to ${profileArchived ? 'Restore' : 'Archive'} patient ${patientName}?`}
        />
      </Grid>
    </Grid>
  );
};

export default ProfileSubTabsOutlet;
