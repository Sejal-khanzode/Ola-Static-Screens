import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  PatientClinic,
  PatientClinicControllerService,
  PatientControllerService,
} from 'src/sdk/requests';
import { Box, Typography, Paper, Avatar, Grid } from '@mui/material';
import { formatDateToMMDDYYYY } from 'src/constants/date-format';
import { addPatientConstants, providerConstants } from 'src/constants/patients-constants';
import { formatPhoneNumber } from 'src/utils/toCamelCase';
import CustomButton from 'src/components/core/reusable/custom-button/custom-button';
import CustomDrawer from 'src/components/core/reusable/custom-drawer/custom-drawer';
import EditProfile from './edit-profile';
import {
  getLanguageNames,
  getEthinicity,
} from 'src/pages/apps/provider/pages/patients/patient-profile/profile-details-tab';
import { RelationshipList } from 'src/constants/formConst';

export const getRelationship = (relation: string | null): string => {
  if (!relation) return '-';
  const lang = RelationshipList.find(option => option.value === relation);
  return lang ? lang.label : '-';
};

let globalRefetchUserDetailsFunction: (() => void) | null = null;
export const getglobalRefetchUserDetailsFunctionFunction = () => globalRefetchUserDetailsFunction;

export default function ClientProfile() {
  const [openEditProfile, setOpenEditProfile] = useState(false);

  const { data: patientProfileData } = useQuery({
    queryKey: ['patientProfileData'],
    queryFn: () => PatientControllerService.getApiMasterPatientProfile(),
  });

  const patientData = (patientProfileData as any)?.data;

  const { data: patientsApiData, refetch: refetchPatientData } = useQuery({
    queryKey: ['patientData'],
    enabled: !!patientData?.uuid,
    queryFn: () =>
      PatientClinicControllerService.getApiMasterPatientClinicPatientByPatientUuid({
        patientUuid: patientData?.uuid || '',
      }),
  });

  const patientDetails = patientsApiData?.data as PatientClinic;

  const { data: getSignature } = useQuery({
    queryKey: ['signature', patientDetails?.patient?.uuid],
    enabled: !!patientDetails?.patient?.uuid,
    queryFn: () =>
      PatientControllerService.getApiMasterPatientByPatientIdSignature({
        patientId: patientDetails?.patient?.uuid as string,
      }),
  });

  const sign = getSignature?.data?.signature;

  if (!patientData) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography variant="titleSemiBold4">{providerConstants.LOADING_PROFILE}</Typography>
      </Box>
    );
  }

  const handleClose = (shouldRefetch?: boolean) => {
    setOpenEditProfile(false);
    if (shouldRefetch) {
      refetchPatientData();
    }
  };

  const InfoRow = ({ label, value }: { label: string; value: string }) => (
    <Box sx={{ display: 'flex', py: 1 }}>
      <Typography
        variant="titleMedium4"
        sx={{
          width: '130px',
          color: 'Neutral.60',
        }}
      >
        {label}
      </Typography>
      <Typography>:</Typography>

      <Typography
        variant="titleMedium4"
        sx={{
          ml: 1,
          color: 'Neutral.80',
        }}
      >
        {value || '-'}
      </Typography>
    </Box>
  );

  return (
    <Box sx={{ p: 2, width: '100%' }}>
      <Paper
        sx={{
          p: 2,
          mb: 4,
          borderRadius: 1,
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        }}
      >
        <Grid display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
          <Typography variant="titleSemiBold3" mb={3}>
            {providerConstants.PROFILE_DETAILS}
          </Typography>
          <CustomButton
            variant="filled"
            label={addPatientConstants.EDIT_PROFILE}
            onClick={() => {
              setOpenEditProfile(true);
            }}
          />
        </Grid>

        <Box sx={{ display: 'flex', gap:3}}>
          <Grid
            size={2}
            mt={3}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'flex-start',
            }}
          >
            <Avatar
              src={patientDetails?.patient?.avatar}
              sx={{
                width: 160,
                height: 160,
                fontSize: '2rem',
              }}
            >
              {!patientDetails?.patient?.avatar &&
                `${patientDetails?.patient?.firstName?.[0] || ''}${patientDetails?.patient?.lastName?.[0] || ''}`}
            </Avatar>
          </Grid>

          <Grid sx={{ flex: 1 }}>
            <Box sx={{ display: 'flex', }}>
              <Box sx={{ flex: 1 }}>
                <InfoRow
                  label={addPatientConstants.NAME}
                  value={`${patientDetails?.patient?.firstName} ${patientDetails?.patient?.lastName}`}
                />
                <InfoRow
                  label={addPatientConstants.PHONE_NUMBER}
                  value={
                    patientDetails?.patient?.phone
                      ? formatPhoneNumber(patientDetails?.patient?.phone) || ''
                      : ''
                  }
                />
                <InfoRow
                  label={addPatientConstants.DATE_OF_BIRTH}
                  value={
                    patientDetails?.patient?.dob
                      ? formatDateToMMDDYYYY(patientDetails?.patient?.dob)
                      : ''
                  }
                />
                <InfoRow
                  label={addPatientConstants.GENDER}
                  value={
                    patientDetails?.patient?.gender
                      ? patientDetails?.patient?.gender.charAt(0).toUpperCase() +
                        patientDetails?.patient?.gender.slice(1).toLowerCase()
                      : ''
                  }
                />{' '}
                <InfoRow
                  label={addPatientConstants.ADDRESS}
                  value={
                    patientDetails?.address
                      ? `${patientDetails.address.line1}${patientDetails.address.line2 ? `, ${patientDetails.address.line2}` : ''}, ${patientDetails.address.city}, ${patientDetails.address.state}, ${patientDetails.address.zipcode}`
                      : ''
                  }
                />
              </Box>

              <Box sx={{ flex: 1 }}>
                <InfoRow
                  label={addPatientConstants.EMAIL_ID}
                  value={patientDetails?.patient?.email as string}
                />

                <InfoRow
                  label={addPatientConstants.LANGUAGES}
                  value={getLanguageNames(patientDetails?.patient?.language as string) || '-'}
                />
                <InfoRow
                  label={addPatientConstants.ETHNICITY}
                  value={getEthinicity(patientDetails?.patient?.ethnicity as any) || '-'}
                />
                <InfoRow
                  label={addPatientConstants.SSN}
                  value={(patientDetails?.patient?.ssn as string) || '-'}
                />

                <Grid display={'flex'} gap={2} py={1.5}>
                  <Grid display={'flex'}>
                    <Typography
                      variant="titleMedium4"
                      sx={{
                        width: '130px',
                        color: 'Neutral.60',
                      }}
                    >
                      {addPatientConstants.SIGNATURE}
                    </Typography>
                    <Typography>:</Typography>
                  </Grid>
                  {sign && typeof sign === 'string' ? (
                    <Grid>
                      <img
                        src={sign as string}
                        alt="Signature"
                        style={{
                          width: '100%',
                          height: '70px',
                          border: '1px solid #ccc',
                          borderRadius: '8px',
                          objectFit: 'contain',
                        }}
                      />
                    </Grid>
                  ) : (
                    <></>
                  )}
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Box>
      </Paper>

      <Paper
        sx={{
          p: 2,
          borderRadius: 1,
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        }}
      >
        <Typography variant="titleSemiBold3" mb={2}>
          {addPatientConstants.EMEGENCY_CONTACT_DETAILS}
        </Typography>

        <Box sx={{ display: 'flex', gap: 6 }}>
          <Box sx={{ flex: 1 }}>
            <InfoRow
              label={addPatientConstants.NAME}
              value={
                patientDetails?.emergencyContacts
                  ? patientDetails?.emergencyContacts?.[0]?.name || '-'
                  : '-'
              }
            />
          </Box>

          <Box sx={{ flex: 1 }}>
            <InfoRow
              label={addPatientConstants.PHONE_NUMBER}
              value={
                patientDetails?.emergencyContacts
                  ? formatPhoneNumber(patientDetails?.emergencyContacts?.[0]?.mobile) || '-'
                  : '-'
              }
            />
          </Box>

          <Box sx={{ flex: 1 }}>
            <InfoRow
              label={addPatientConstants.RELATIONSHIP}
              value={
                patientDetails?.emergencyContacts
                  ? getRelationship(
                      patientDetails?.emergencyContacts?.[0]?.relationshipWithPatient as string
                    ) || '-'
                  : '-'
              }
            />
          </Box>
        </Box>
      </Paper>

      <CustomDrawer
        title={addPatientConstants.EDIT_PROFILE}
        open={openEditProfile}
        onClose={handleClose}
        anchor="right"
      >
        <EditProfile
          patientDetails={patientDetails}
          onClose={() => handleClose(true)}
          refetch={refetchPatientData}
        />
      </CustomDrawer>
    </Box>
  );
}
