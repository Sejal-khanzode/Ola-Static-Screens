import { Box, Typography, Paper, Grid, Chip } from '@mui/material';
import { useSelector } from 'react-redux';
import { addPatientConstants, patientsConstants } from 'src/constants/patients-constants';
import { RootState } from 'src/redux/store';
import { formatPhoneNumber } from 'src/utils/toCamelCase';
import {
  languageOptions,
  PatientRaceOptions,
  maritalStatusList,
  PatientEthnicityOptions,
} from 'src/constants/formConst';
import { clinicConstants } from 'src/constants/admin-constants';

const InfoSection = ({
  title,
  children,
  sx = {},
}: {
  flag?: boolean;
  title: string;
  children: React.ReactNode;
  sx?: object;
  patientFlagData?: any;
}) => {
  return (
    <>
      <Paper
        elevation={0}
        sx={{
          padding: '16px',
          border: '1px solid #E0E0E0',
          borderRadius: '8px',
          position: 'relative',
          ...sx,
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="bodyBold3" color="#1A1A1A">
            {title}
          </Typography>
        </Box>
        {children}
      </Paper>
    </>
  );
};

export const getLanguageNames = (languageCodes: string | null): string => {
  if (!languageCodes) return '-';
  const lang = languageOptions.find(option => option.value === languageCodes);
  return lang ? lang.label : '-';
};

export const getRaceName = (raceCode: keyof typeof PatientRaceOptions | null): string => {
  if (!raceCode) return '-';
  return PatientRaceOptions[raceCode] ?? '-';
};

export const getMarritalStatus = (status: string): string => {
  const statusObj = maritalStatusList.find(item => item.value === status);
  return statusObj ? statusObj.label : '-';
};

export const getEthinicity = (ethnicity: keyof typeof PatientEthnicityOptions | null): string => {
  if (!ethnicity) return '-';
  return PatientEthnicityOptions[ethnicity] ?? '-';
};

const InfoRow = ({
  label,
  value,
  colon = true,
}: {
  label: string;
  value: string | React.ReactNode;
  colon?: boolean;
}) => (
  <>
    <Grid size={{ xs: 2.5 }}>
      <Typography variant="bodyMedium4" color="#666666">
        {label}
      </Typography>
    </Grid>
    <Grid size={{ xs: 9.5 }}>
      <Typography variant="bodyMedium4" color="#1A1A1A">
        {colon ? ': ' : ''}
        {value}
      </Typography>
    </Grid>
  </>
);

export default function ProfileDetailsTab() {
  const patientData = useSelector((state: RootState) => state.patientReducer.currentPatient);

  const getPrimaryProviderName = () => {
    if (!patientData?.primaryProvider) return '-';
    return Object.values(patientData.primaryProvider)[0] || '-';
  };

  const getEmergencyContact = () => {
    if (!patientData?.emergencyContacts || patientData.emergencyContacts.length === 0) return '-';
    const contact = patientData.emergencyContacts[0];
    return contact.name
      ? `${contact.name} (${formatPhoneNumber(contact.mobile)})`
      : contact.email || `${contact.name}` || '-';
  };

  if (!patientData) {
    return (
      <Box sx={{ backgroundColor: '#F8F9FA', minHeight: '100vh', p: 3 }}>
        <Typography>Loading patient data...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{minHeight: '100vh' }}>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <InfoSection title="Details">
            <Grid container spacing={1}>
              <InfoRow
                label={patientsConstants.STATUS}
                value={
                  <Chip
                    label={patientData.active ? 'Active' : 'Inactive'}
                    size="small"
                    sx={{ backgroundColor: '#E8F5E8', color: '#2E7D32', fontSize: '12px' }}
                  />
                }
              />
              <InfoRow label={addPatientConstants.SSN} value={patientData.patient?.ssn || '-'} />
              <InfoRow
                label={addPatientConstants.PATIENT_EMERGENCY_CONTACT_NUMBER}
                value={getEmergencyContact()}
              />
              <InfoRow
                label={addPatientConstants.LANGUAGES}
                value={getLanguageNames(patientData.patient?.language || null)}
              />
              <InfoRow
                label={addPatientConstants.RACE}
                value={getRaceName(
                  (patientData.patient?.race as keyof typeof PatientRaceOptions) || null
                )}
              />
              <InfoRow
                label={addPatientConstants.MARITAL_STATUS}
                value={getMarritalStatus(patientData.patient?.maritalStatus || '-')}
              />
              <InfoRow
                label={addPatientConstants.ETHNICITY}
                value={getEthinicity(
                  (patientData.patient?.ethnicity as keyof typeof PatientEthnicityOptions) || null
                )}
              />
            </Grid>
          </InfoSection>

          <InfoSection title={addPatientConstants.ADDRESS} sx={{ mt: 3 }}>
            <Grid container spacing={1}>
              <InfoRow label={clinicConstants.LINE_1} value={patientData.address?.line1 || '-'} />
              <InfoRow label={clinicConstants.LINE_2} value={patientData.address?.line2 || '-'} />
              <InfoRow label={addPatientConstants.CITY} value={patientData.address?.city || '-'} />
              <InfoRow
                label={addPatientConstants.STATE}
                value={patientData.address?.state || '-'}
              />
              <InfoRow
                label={addPatientConstants.ZIP_CODE}
                value={patientData.address?.zipcode || '-'}
              />
            </Grid>
          </InfoSection>
          
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <InfoSection title={addPatientConstants.PREFERENCES} >
            <Grid container spacing={1}>
              <InfoRow
                label={addPatientConstants.PREFERRED_PROVIDER}
                value={getPrimaryProviderName() as string}
              />
              <InfoRow label={addPatientConstants.DEFAULT_PHARMACY} value="-" />
              <InfoRow label={addPatientConstants.PREFERRED_LAB} value="-" />
              <InfoRow label={addPatientConstants.PREFERRED_RADIOLOGY} value="-" />
            </Grid>
          </InfoSection>
        </Grid>
      </Grid>
    </Box>
  );
}
