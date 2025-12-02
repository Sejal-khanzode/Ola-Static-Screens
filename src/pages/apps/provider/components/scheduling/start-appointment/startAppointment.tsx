import { Grid, Typography } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';

import { formatDateToMMDDYYYY } from 'src/constants/date-format';
import { appointmentConstants } from 'src/constants/patients-constants';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CustomLabel from 'src/components/core/reusable/custom-label/custom-label';
import CustomInput from 'src/components/core/reusable/custom-input/custom-input';
import CustomButton from 'src/components/core/reusable/custom-button/custom-button';
import Chip from 'src/components/core/reusable/chip/chip';
import { formatToCapitalize } from 'src/constants/capitalize-function';
import { IntakeFormConsentTemplateService } from 'src/sdk/requests';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { hideLoader, showLoader } from 'src/redux/reducers/loaderReducer';
import { useAppDispatch } from 'src/redux/hooks';
import CustomDrawer from 'src/components/core/reusable/custom-drawer/custom-drawer';
import CheckEligibility from './check-eligibility';
import { EligibilityLables } from 'src/constants/setting-constants';

export interface StartApptProps {
  refetchList?: () => void;
  handleDrawerClose?: () => void;
  appointmentData?: any;
  isEdit?: boolean;
  isReschedule?: boolean;
}

export const getTimeDuration = (dateTimeString: string): number | null => {
  if (!dateTimeString) return null;
  const timePart = dateTimeString.match(/\(([^)]+)\)/)?.[1];
  if (!timePart) return null;

  const [startTime, endTime] = timePart.split(' - ');

  const date = dateTimeString.split(' ')[0];

  const start = new Date(`${date} ${startTime}`) as any;
  const end = new Date(`${date} ${endTime}`) as any;

  const diffMs = end - start;
  const diffMins = Math.floor(diffMs / 1000 / 60);

  return diffMins;
};

const StartAppointment = (props: StartApptProps) => {
  const { appointmentData } = props;
  const [drawerOpen, setDrawerOpen] = useState(false);
  const dispatch = useAppDispatch();
  
  const leftSideApptDetails = [
    {
      label: appointmentConstants.APPOINTMENT_MODE,
      value: formatToCapitalize(appointmentData?.mode),
    },
    { label: appointmentConstants.CLINICIAN, value: appointmentData?.providerName },
    {
      label: appointmentConstants.DURATION,
      value: `${getTimeDuration(appointmentData?.time)} mins`,
    },
  ];

  const rightSideApptDetails = [
    { label: appointmentConstants.APPOINTMENT_TYPE, value: appointmentData?.appointmentType },
    { label: appointmentConstants.DATE_TIME, value: appointmentData?.time },
  ];

  const { data: consentData, isPending: isConsentFormDataPending } = useQuery({
    queryKey: ['consentForm', appointmentData?.patientClinicId],
    queryFn: () =>
      IntakeFormConsentTemplateService.getApiMasterIntakeFormConsentTemplatePatientClinicByPatientClinicUuidTypeByFormType(
        {
          patientClinicUuid: appointmentData?.patientClinicId as string,
          formType: 'CONSENT_FORM',
        }
      ),
  });

  const { data: intakeFormData, isPending: isIntakeFormDataPending } = useQuery({
    queryKey: ['intake', appointmentData?.patientClinicId],
    queryFn: () =>
      IntakeFormConsentTemplateService.getApiMasterIntakeFormConsentTemplatePatientClinicByPatientClinicUuidTypeByFormType(
        {
          patientClinicUuid: appointmentData?.patientClinicId as string,
          formType: 'INTAKE_FORM',
        }
      ),
  });

  const ConsentFormStatus = (consentData as any)?.data[0]?.formStatus;
  const IntakeFormStatus = (intakeFormData as any)?.data[0]?.formStatus;

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
  };

  useEffect(() => {
    if (isConsentFormDataPending || isIntakeFormDataPending) {
      dispatch(showLoader());
    } else {
      dispatch(hideLoader());
    }
  }, [isConsentFormDataPending, isIntakeFormDataPending]);

  return (
    <Grid container size={12} gap={2}>
      <Grid bgcolor={'Neutral.30'} size={12} px={1} py={1.5} borderRadius={1}>
        <Grid>
          <Typography variant="bodyMedium3">{appointmentData?.patientName}</Typography>
        </Grid>
        <Grid display={'flex'} gap={2}>
          <Grid sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CalendarTodayIcon sx={{ width: '16px', height: '16px' }} />
            <Typography variant="bodyRegular4">
              {appointmentData?.patientDob
                ? `${formatDateToMMDDYYYY(appointmentData?.patientDob)} (${new Date().getFullYear() - new Date(appointmentData?.patientDob).getFullYear()} yrs)`
                : ''}
            </Typography>
          </Grid>
          <Grid sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <MailOutlineIcon sx={{ width: '16px', height: '16px' }} />
            <Typography variant="bodyRegular4">{appointmentData?.patientEmail}</Typography>
          </Grid>
          <Grid sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LocalPhoneOutlinedIcon sx={{ width: '16px', height: '16px' }} />
            <Typography variant="bodyRegular4">{appointmentData?.patientPhone}</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        border={'1px solid'}
        borderColor={'Neutral.30'}
        size={12}
        borderRadius={1}
        p={1}
        display={'flex'}
      >
        <Grid size={6}>
          {leftSideApptDetails.map(({ label, value }) => (
            <Grid display={'flex'}>
              <Grid size={3.5}>
                <Typography variant="bodyRegular4" color="Neutral.70">
                  {label}
                </Typography>
              </Grid>

              <Typography sx={{ pr: 1 }}>:</Typography>
              <Typography variant="bodyMedium4">{value || '-'}</Typography>
            </Grid>
          ))}
        </Grid>
        <Grid size={6}>
          {rightSideApptDetails.map(({ label, value }) => (
            <Grid display={'flex'}>
              <Grid size={3.5} gap={1}>
                <Typography variant="bodyRegular4" color="Neutral.70">
                  {label}
                </Typography>
              </Grid>

              <Typography sx={{ pr: 1 }}>:</Typography>
              <Typography variant="bodyMedium4">{value || '-'}</Typography>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid border={'1px solid'} borderColor={'Neutral.30'} size={12} borderRadius={1} p={1}>
        <Grid size={12}>
          <Typography variant="bodyRegular3">{appointmentConstants.FORMS}</Typography>
        </Grid>
        <Grid size={12} sx={{ display: 'flex' }}>
          <Grid size={12} sx={{ display: 'flex', gap: 2 }}>
            <Grid display={'flex'} gap={2}>
              <Typography variant={'bodyRegular4'} color="Primary.main">
                {appointmentConstants.INTAKE_FORM}
              </Typography>
              <Typography>:</Typography>
            </Grid>
            <Chip type={IntakeFormStatus} />
          </Grid>
          <Grid size={12} sx={{ display: 'flex', gap: 2 }}>
            <Grid display={'flex'} gap={2}>
              <Typography variant={'bodyRegular4'} color="Primary.main">
                {appointmentConstants.CONSENT_FORM}
              </Typography>
              <Typography>:</Typography>
            </Grid>
            <Chip type={ConsentFormStatus} />
          </Grid>
        </Grid>
      </Grid>

      <Grid
        border={'1px solid'}
        borderColor={'Neutral.30'}
        size={12}
        borderRadius={1}
        p={1}
        display={'flex'}
        gap={1}
      >
        <CustomButton
          startIcon={<CheckCircleOutlineIcon width="10px" height="10px" />}
          label={appointmentConstants.CHECK_ELIGIBILITY}
          variant="outlined"
          onClick={() => {
            setDrawerOpen(true);
          }}
        />
        <CustomButton label={appointmentConstants.VIEW_AUTHORIZATION} variant="outlined" />
      </Grid>

      <Grid size={12}>
        <Grid size={3}>
          <CustomLabel label="Estimated Amount ($)" />
          <CustomInput placeholder="Enter" />
        </Grid>
      </Grid>
      <Grid size={12} display={'flex'}>
        <Typography>{appointmentConstants.STATUS} :</Typography>
        <Chip type={appointmentData?.status} />
      </Grid>

      {/* <Grid size={12} display="flex" justifyContent="flex-end" alignItems="end">
        <CustomButton
          label={appointmentConstants.START_VISIT_NOTE}
          variant="filled"
          type="submit"
          onClick={() => {
            setStartVisitNoteDrawerOpen(true);
          }}
        />
      </Grid> */}

      <CustomDrawer
        anchor="right"
        open={drawerOpen}
        onClose={handleCloseDrawer}
        title={EligibilityLables.ELIGIBILITY_CHECK}
        drawerWidth="50vw"
      >
        <CheckEligibility appointmentData={appointmentData} />
      </CustomDrawer>
    </Grid>
  );
};

export default StartAppointment;
