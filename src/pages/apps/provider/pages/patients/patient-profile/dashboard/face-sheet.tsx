import { Box, Typography, Paper, Grid } from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import CustomButton from 'src/components/core/reusable/custom-button/custom-button';
import CustomDrawer from 'src/components/core/reusable/custom-drawer/custom-drawer';
import { RootState } from 'src/redux/store';
import {
  PatientAllergyControllerService,
  PatientDiagnosisControllerService,
  PatientFamilyHistoryControllerService,
  PatientMedicalHistoryControllerService,
  PatientSurgicalHistoryControllerService,
} from 'src/sdk/requests';
import { getDataFromLocalStorage } from 'src/sdk/requests/core/localStorage';
import Allergies from './face-sheet-view/allergies/allergies';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Diagnoses from './face-sheet-view/diagnoses/diagnoses';
import { formatDateToMMDDYYYY } from 'src/constants/date-format';
import { ReactionOptions, SeverityOptions, RelationshipList } from 'src/constants/formConst';
import { historyConstants, patientDashboardConstants } from 'src/constants/patients-constants';
import FamilyHistory from './face-sheet-view/family-history/family-history';
import MedicalHistory from './face-sheet-view/medical-history/medical-history';
import SurgicalHistory from './face-sheet-view/surgical-history/surgical-history';

export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

const InfoSection = ({
  title,
  children,
  sx = {},
  onClick,
}: {
  title: string;
  children: React.ReactNode;
  sx?: object;
  onClick?: () => void;
}) => (
  <Paper
    elevation={0}
    sx={{
    height: '25vh',
    padding: 2,
    border: '1px solid #E0E0E0',
    borderRadius: 1,
    overflowY: 'auto', 
    overflowX: 'hidden', 
    '&::-webkit-scrollbar': {
      width: '3px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#BDBDBD',
      borderRadius: '2px',
    },
    '&::-webkit-scrollbar-thumb:hover': {
      backgroundColor: '#9E9E9E',
    },
    ...sx,
  }}
  >
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <Typography
        variant="titleBold4"
        sx={{ color: 'Primary.main', display: 'flex', alignItems: 'center' }}
      >
        {title}
      </Typography>
      <CustomButton
        label="View All"
        variant="text"
        onClick={onClick}
        endIcon={<ArrowForwardIcon />}
      />
    </Box>
    {children}
  </Paper>
);

const InfoRow = ({ label, color, size }: { label: string; color?: string; size?: number }) => (
  <>
    <Grid size={size || 'auto'}>
      <Typography variant="bodyMedium4" color={color || 'Base.black'}>
        {label}
      </Typography>
    </Grid>
  </>
);

export default function Dashboard() {
  const [drawerOpenAllergies, setDrawerOpenAllergies] = useState(false);
  const [drawerOpenDiagnoses, setDrawerOpenDiagnoses] = useState(false);
  // const [drawerOpenMedications, setDrawerOpenMedications] = useState(false);
  const [drawerOpenFamilyHistory, setDrawerOpenFamilyHistory] = useState(false);
  const [drawerOpenMedicalHistory, setDrawerOpenMedicalHistory] = useState(false);
  const [drawerOpenSurgicalHistory, setDrawerOpenSurgicalHistory] = useState(false);
  const patientData = useSelector((state: RootState) => state.patientReducer.currentPatient);
  const patientUUID = getDataFromLocalStorage('patientUUID');

  const { data: allergiesData } = useQuery({
    queryKey: ['allAllergies', patientUUID],
    queryFn: () =>
      PatientAllergyControllerService.getApiMasterPatientAllergy({
        patientClinicUuid: patientUUID || '',
        archive: false,
      }),
  });

  const { data: diagnosesData } = useQuery({
    queryKey: ['allDiagnoses', patientUUID],
    queryFn: () =>
      PatientDiagnosisControllerService.getApiMasterPatientDiagnosis({
        patientClinicUuid: patientUUID || '',
      }),
  });

  const { data: familyHistoryData } = useQuery({
    queryKey: ['allFamilyHistory', patientUUID],
    queryFn: () =>
      PatientFamilyHistoryControllerService.getApiMasterPatientFamilyHistory({
        patientClinicUuid: patientUUID || '',
        archive: false,
      }),
  });

  const { data: medicalHistoryData } = useQuery({
    queryKey: ['allMedicalHistory', patientUUID],
    queryFn: () =>
      PatientMedicalHistoryControllerService.getApiMasterPatientMedicalHistory({
        patientClinicUuid: patientUUID || '',
        archive: false,
      }),
  });

  const { data: surgicalHistoryData } = useQuery({
    queryKey: ['allSurgicalHistory', patientUUID],
    queryFn: () =>
      PatientSurgicalHistoryControllerService.getApiMasterPatientSurgicalHistory({
        patientClinicUuid: patientUUID || '',
        archive: false,
      }),
  });

  const allAllergies = (allergiesData?.data?.content as any[]) || [];
  const nonArchivedAllergies = allAllergies.filter(allergy => !allergy.archive);
  const latestAllergies = nonArchivedAllergies.slice(0, 3);
  const allDiagnoses = (diagnosesData?.data?.content as any[]) || [];
  const nonArchivedDiagnosis = allDiagnoses.filter(
    diagnosis => diagnosis?.active === true && diagnosis?.archive === false
  );
  const latestDiagnoses = nonArchivedDiagnosis.slice(0, 3);
  const allFamilyHistory = (familyHistoryData?.data?.content as any[]) || [];
  const nonArchivedFamily = allFamilyHistory.filter(diagnoses => !diagnoses.archive);
  const latestFamilyHistory = nonArchivedFamily.slice(0, 3);
  const allMedicalHistory = (medicalHistoryData?.data?.content as any[]) || [];
  const nonArchivedMedical = allMedicalHistory.filter(medicalHistory => !medicalHistory.archive);
  const latestMedicalHistory = nonArchivedMedical.slice(0, 3);
  const allSurgicalHistory = (surgicalHistoryData?.data?.content as any[]) || [];
  const nonArchivedSurgical = allSurgicalHistory.filter(
    surgicalHistory => !surgicalHistory.archive
  );
  const latestSurgicalHistory = nonArchivedSurgical.slice(0, 3);

  if (!patientData) {
    return (
      <Box sx={{ backgroundColor: '#F8F9FA', minHeight: '100vh', p: 3 }}>
        <Typography>Loading patient data...</Typography>
      </Box>
    );
  }
  const relativeEnum = (relative: string) => {
    const relativeLabel = RelationshipList.find(item => item.value === relative)?.label || relative;
    return relativeLabel;
  };

  return (
    <Box sx={{ backgroundColor: '#F8F9FA', minHeight: '100vh' }}>
      <Grid
        container
        spacing={2}
        sx={{
          display: 'flex',
          alignItems: 'center',
          maxHeight: '80vh',
        }}
      >
        <Grid size={{ xs: 12, md: 4 }}>
          <InfoSection
            title={patientDashboardConstants.ALLERGIES}
            onClick={() => setDrawerOpenAllergies(true)}
          >
            <Grid container spacing={1}>
              {latestAllergies.length > 0 ? (
                latestAllergies.map((allergy: any) => (
                  <Grid container size={12} spacing={1}>
                    <Grid
                      size={12}
                      sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
                    >
                      <Grid size={0.8}>
                        <Box
                          bgcolor="Primary.main"
                          sx={{
                            width: '10px',
                            height: '10px',
                            borderRadius: '50%',
                            marginRight: '10px',
                          }}
                        ></Box>
                      </Grid>
                      <Grid sx={{ display: 'flex', alignItems: 'center', gap: 1 }} size={11.2}>
                        <InfoRow label={allergy.allergy?.name ?? ''} size={2} />
                        <InfoRow label={capitalize(allergy.allergyType ?? '')} size={2.5} />
                        <InfoRow
                          label={
                            ReactionOptions.find(option => option.value === allergy.reaction)
                              ?.label ?? ''
                          }
                          size={2.5}
                        />
                        <InfoRow
                          label={
                            SeverityOptions.find(option => option.value === allergy.severity)
                              ?.label ?? ''
                          }
                          size={2.5}
                        />
                        <InfoRow
                          label={formatDateToMMDDYYYY(allergy.onSetDate ?? '')}
                          color="Neutral.60"
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                ))
              ) : (
                <Grid size={12}>
                  <InfoRow color="Neutral.60" label={historyConstants.NO_ALLERGY_RECORDED} />
                </Grid>
              )}
            </Grid>
          </InfoSection>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <InfoSection
            title={patientDashboardConstants.DIAGNOSES}
            onClick={() => setDrawerOpenDiagnoses(true)}
          >
            <Grid container spacing={1}>
              {latestDiagnoses.length > 0 ? (
                latestDiagnoses.map((diagnosis: any) => (
                  <Grid container size={12} spacing={1}>
                    <Grid sx={{ display: 'flex', flexDirection: 'row' }} size={12}>
                      <Grid size={1}>
                        <Box
                          bgcolor="Primary.main"
                          sx={{
                            width: '10px',
                            height: '10px',
                            mt: '6px',
                            borderRadius: '50%',
                            marginRight: '10px',
                          }}
                        ></Box>
                      </Grid>
                      <Grid container sx={{ display: 'flex', gap: 2 }} size={11}>
                        <InfoRow label={diagnosis.medicalCode?.code} size={1.6} />
                        <InfoRow label={diagnosis.medicalCode?.description} size={5.5} />

                        <InfoRow label={capitalize(diagnosis.type)} size={1.8} />

                        <InfoRow
                          color="Neutral.60"
                          label={formatDateToMMDDYYYY(diagnosis.diagnosedDate)}
                          size={1}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                ))
              ) : (
                <Grid size={12}>
                  <InfoRow color="Neutral.60" label={historyConstants.NO_DIAGNOSIS_RECORDED} />
                </Grid>
              )}
            </Grid>
          </InfoSection>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <InfoSection
            title={patientDashboardConstants.FAMILY_HISTORY}
            onClick={() => setDrawerOpenFamilyHistory(true)}
          >
            <Grid container spacing={1}>
              {latestFamilyHistory.length > 0 ? (
                latestFamilyHistory.map((familyHistory: any) => (
                  <Grid container size={12} spacing={1}>
                    <Grid size={12} sx={{ display: 'flex', flexDirection: 'row' }}>
                      <Grid size={0.8}>
                        <Box
                          bgcolor="Primary.main"
                          sx={{
                            width: '10px',
                            height: '10px',
                            mt: '6px',
                            borderRadius: '50%',
                            marginRight: '10px',
                          }}
                        ></Box>
                      </Grid>
                      <Grid size={12} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <InfoRow label={familyHistory.problems} size={9} />
                        <InfoRow color="Neutral.60" label={relativeEnum(familyHistory.relative)}  size={3}/>
                      </Grid>
                    </Grid>
                  </Grid>
                ))
              ) : (
                <Grid size={12}>
                  <InfoRow color="Neutral.60" label={historyConstants.NO_FAMILY_HISTORY_RECORDED} />
                </Grid>
              )}
            </Grid>
          </InfoSection>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <InfoSection
            title={patientDashboardConstants.MEDICAL_HISTORY}
            onClick={() => setDrawerOpenMedicalHistory(true)}
          >
            <Grid container spacing={1}>
              {latestMedicalHistory.length > 0 ? (
                latestMedicalHistory.map((medicalHistory: any) => (
                  <Grid container size={12} spacing={1}>
                    <Grid size={12} sx={{ display: 'flex', flexDirection: 'row' }}>
                      <Grid size={0.8}>
                        <Box
                          bgcolor="Primary.main"
                          sx={{
                            width: '10px',
                            height: '10px',
                            mt: '6px',
                            borderRadius: '50%',
                            marginRight: '10px',
                          }}
                        ></Box>
                      </Grid>
                      <Grid size={12} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <InfoRow label={medicalHistory.conditionName} size={9} />
                        <InfoRow
                          color="Neutral.60"
                          label={formatDateToMMDDYYYY(medicalHistory.medicalHistoryDate)}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                ))
              ) : (
                <Grid size={12}>
                  <InfoRow
                    color="Neutral.60"
                    label={historyConstants.NO_MEDICAL_HISTORY_RECORDED}
                  />
                </Grid>
              )}
            </Grid>
          </InfoSection>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <InfoSection
            title={patientDashboardConstants.SURGERICAL_HISTORY}
            onClick={() => setDrawerOpenSurgicalHistory(true)}
          >
            <Grid container spacing={1}>
              {latestSurgicalHistory.length > 0 ? (
                latestSurgicalHistory.map((surgicalHistory: any) => (
                  <Grid container size={12} spacing={1}>
                    <Grid size={12} sx={{ display: 'flex', flexDirection: 'row' }}>
                      <Grid size={0.8}>
                        <Box
                          bgcolor="Primary.main"
                          sx={{
                            width: '10px',
                            height: '10px',
                            mt: '6px',
                            borderRadius: '50%',
                            marginRight: '10px',
                          }}
                        ></Box>
                      </Grid>
                      <Grid size={12} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <InfoRow label={surgicalHistory.surgeryName} size={9} />
                        <InfoRow
                          color="Neutral.60"
                          label={formatDateToMMDDYYYY(surgicalHistory.surgeryDate)}
                          size={3}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                ))
              ) : (
                <Grid size={12}>
                  <InfoRow
                    color="Neutral.60"
                    label={historyConstants.NO_SURGERICAL_HISTORY_RECORDED}
                  />
                </Grid>
              )}
            </Grid>
          </InfoSection>
        </Grid>
      </Grid>

      <Grid>
        <CustomDrawer
          open={drawerOpenAllergies}
          onClose={() => setDrawerOpenAllergies(false)}
          title={patientDashboardConstants.ALLERGIES}
          anchor="right"
          drawerWidth="55vw"
        >
          <Allergies />
        </CustomDrawer>
        <CustomDrawer
          open={drawerOpenDiagnoses}
          onClose={() => setDrawerOpenDiagnoses(false)}
          title={patientDashboardConstants.DIAGNOSES}
          anchor="right"
          drawerWidth="50vw"
        >
          <Diagnoses />
        </CustomDrawer>

        <CustomDrawer
          open={drawerOpenFamilyHistory}
          onClose={() => setDrawerOpenFamilyHistory(false)}
          title={patientDashboardConstants.FAMILY_HISTORY}
          anchor="right"
          drawerWidth="50vw"
        >
          <FamilyHistory />
        </CustomDrawer>

        <CustomDrawer
          open={drawerOpenMedicalHistory}
          onClose={() => setDrawerOpenMedicalHistory(false)}
          title={patientDashboardConstants.MEDICAL_HISTORY}
          anchor="right"
          drawerWidth="50vw"
        >
          <MedicalHistory />
        </CustomDrawer>

        <CustomDrawer
          open={drawerOpenSurgicalHistory}
          onClose={() => setDrawerOpenSurgicalHistory(false)}
          title={patientDashboardConstants.SURGERICAL_HISTORY}
          anchor="right"
          drawerWidth="50vw"
        >
          <SurgicalHistory />
        </CustomDrawer>
      </Grid>
    </Box>
  );
}
