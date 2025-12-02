import { Grid, Paper, Typography, Box, Collapse, IconButton } from '@mui/material';
import React, { useEffect, useMemo, useState, useRef, useCallback } from 'react';
import { KeyboardArrowDownOutlined, KeyboardArrowUpOutlined } from '@mui/icons-material';
import HealthHistoryForm, { HealthHistoryFormData } from './intake-form/patient-health-history';
import FamilyHealthHistory, { FamilyHealthHistoryData } from './intake-form/family-health-history';
import HealthHabit, { HealthHabitData } from './intake-form/health-habit';
import MenOnly, { MenHealthData } from './intake-form/men-only';
import WomenOnly, { WomenHealthData } from './intake-form/women-only';
import { BackArrowIcon } from 'src/assets/icons/backArrowIcon';
import { useNavigate } from 'react-router-dom';
import { templateConstants } from 'src/constants/setting-constants';
import useAuthority from 'src/hooks/use-authority';
import CustomButton from 'src/components/core/reusable/custom-button/custom-button';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  IntakeFormConsentFormTemplate,
  IntakeFormConsentTemplateService,
  PatientClinic,
  PatientClinicControllerService,
  PatientControllerService,
} from 'src/sdk/requests';
import { hideLoader, showLoader } from 'src/redux/reducers/loaderReducer';
import useApiFeedback from 'src/hooks/useApiFeedback';
import { getDataFromLocalStorage } from 'src/sdk/requests/core/localStorage';
import Chip from 'src/components/core/reusable/chip/chip';
import ConfirmationPopUp from 'src/components/core/reusable/confirmation-pop-up/confirmation-pop-up';
import { useAppDispatch } from 'src/redux/hooks';
import { useForm } from 'react-hook-form';
import { APIFeedbackMessages } from 'src/constants/formConst';
interface DropDownSectionProps {
  title: string;
  children: React.ReactNode;
  sx?: object;
  defaultOpen?: boolean;
}

export const DropDownSection = ({
  title,
  children,
  sx = {},
  defaultOpen = true,
}: DropDownSectionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const toggleSection = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Paper
      elevation={0}
      sx={{
        padding: 0,
        border: '1px solid #E0E0E0',
        borderRadius: 1,
        overflow: 'hidden',
        ...sx,
      }}
    >
      <Box
        sx={{
          padding: 1,
          paddingLeft: 2,
          cursor: 'pointer',
          backgroundColor: '#F3F6FB',
        }}
        onClick={toggleSection}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="bodyMedium4">{title}</Typography>
          <IconButton
            size="small"
            sx={{
              padding: '4px',
            }}
          >
            {isOpen ? <KeyboardArrowUpOutlined /> : <KeyboardArrowDownOutlined />}
          </IconButton>
        </Box>
      </Box>

      <Collapse in={isOpen}>
        <Box sx={{ borderTop: '1px solid #E0E0E0' }}>{children}</Box>
      </Collapse>
    </Paper>
  );
};

interface IntakeFormProps {
  isEdit?: boolean;
  patientProfile?: boolean;
  patientApptIntake?: string;
  markCurrentTabCompleted?: () => void;
}

const IntakeForm = (props: IntakeFormProps) => {
  const { patientProfile, patientApptIntake } = props;

  const { isPatientPortal, isProviderPortal, isAdminPortal } = useAuthority();
  const navigate = useNavigate();
  const [healthFormData, setHealthFormData] = useState<HealthHistoryFormData | null>(null);
  const [familyFormData, setFamilyFormData] = useState<FamilyHealthHistoryData | null>(null);
  const [healthHabitFormData, setHealthHabitFormData] = useState<HealthHabitData | null>(null);
  const [menFormData, setMenFormData] = useState<MenHealthData | null>(null);
  const [womenFormData, setWomenFormData] = useState<WomenHealthData | null>(null);
  const [confirmationPopUp, setConfirmationPopup] = useState(false);
  const dispatch = useAppDispatch();

  const isInitialLoad = useRef(true);
  const loadedTemplateData = useRef<any>(null);

  const { data: patientProfileData } = useQuery({
    queryKey: ['patientProfileData'],
    enabled: !isAdminPortal && !isProviderPortal,
    queryFn: () => PatientControllerService.getApiMasterPatientProfile(),
  });

  const userProfile = patientProfileData?.data;
  const patientClinicUuid = isPatientPortal
    ? userProfile?.uuid
    : patientApptIntake
      ? patientApptIntake
      : getDataFromLocalStorage('patientUUID');

  const { handleSubmit } = useForm({});

  const { data: patientsApiData } = useQuery({
    queryKey: ['patientData'],
    enabled: !!patientClinicUuid,
    queryFn: () =>
      isPatientPortal
        ? PatientClinicControllerService.getApiMasterPatientClinicPatientByPatientUuid({
            patientUuid: patientClinicUuid as string,
          })
        : PatientClinicControllerService.getApiMasterPatientClinicByPatientClinicUuid({
            patientClinicUuid: patientClinicUuid as string,
          }),
  });

  const patientDetails = patientsApiData?.data as PatientClinic;

  const gender = isPatientPortal
    ? userProfile?.gender
    : isProviderPortal
      ? patientDetails?.patient?.gender
      : undefined;

  const patientUuid = patientApptIntake ? patientApptIntake : patientDetails?.uuid;

  const {
    data: intakeFormData,
    refetch: refetchIntakeForm,
    isPending: isIntakeFormDataPending,
  } = useQuery({
    queryKey: ['intakeData', patientUuid],
    enabled: !!patientDetails?.uuid && !isAdminPortal,
    queryFn: () =>
      IntakeFormConsentTemplateService.getApiMasterIntakeFormConsentTemplatePatientClinicByPatientClinicUuidTypeByFormType(
        {
          patientClinicUuid: patientUuid as string,
          formType: 'INTAKE_FORM',
        }
      ),
  });

  const {
    mutate: updateIntakeEntry,
    isPending: isUpdatingIntake,
    isSuccess: isSuccessUpdate,
    isError: isErrorUpdate,
    error: errorUpdate,
    data: dataUpdate,
  } = useMutation({
    mutationFn: (payload: IntakeFormConsentFormTemplate) =>
      IntakeFormConsentTemplateService.putApiMasterIntakeFormConsentTemplateUpdate({
        requestBody: payload,
      }),
  });

  const intakeTemplateData = useMemo(
    () => (intakeFormData?.data as any)?.[0]?.templateData,
    [intakeFormData?.data]
  );

  // Memoize callback functions to prevent child re-renders and infinite loops
  const handleHealthDataChange = useCallback((childData: HealthHistoryFormData) => {
    setHealthFormData(prev => {
      if (JSON.stringify(prev) !== JSON.stringify(childData)) {
        return childData;
      }
      return prev;
    });
  }, []);

  const handlefamilyDataChange = useCallback((childData: FamilyHealthHistoryData) => {
    setFamilyFormData(prev => {
      if (JSON.stringify(prev) !== JSON.stringify(childData)) {
        return childData;
      }
      return prev;
    });
  }, []);

  const handleHealthHabit = useCallback((childData: HealthHabitData) => {
    setHealthHabitFormData(prev => {
      if (JSON.stringify(prev) !== JSON.stringify(childData)) {
        return childData;
      }
      return prev;
    });
  }, []);

  const handleMenOnly = useCallback((childData: MenHealthData) => {
    setMenFormData(prev => {
      if (JSON.stringify(prev) !== JSON.stringify(childData)) {
        return childData;
      }
      return prev;
    });
  }, []);

  const handleWomenOnly = useCallback((childData: WomenHealthData) => {
    setWomenFormData(prev => {
      if (JSON.stringify(prev) !== JSON.stringify(childData)) {
        return childData;
      }
      return prev;
    });
  }, []);

  // Memoize data props to prevent unnecessary re-renders
  const memoizedHealthFormData = useMemo(() => healthFormData, [healthFormData]);
  const memoizedFamilyFormData = useMemo(() => familyFormData, [familyFormData]);
  const memoizedHealthHabitFormData = useMemo(() => healthHabitFormData, [healthHabitFormData]);
  const memoizedMenFormData = useMemo(() => menFormData, [menFormData]);
  const memoizedWomenFormData = useMemo(() => womenFormData, [womenFormData]);

  const handleClose = () => {
    setConfirmationPopup(false);
  };

  const handleSaveAsDraft = () => {
    if (!patientDetails?.uuid) {
      console.error('Patient details not loaded yet');
      return;
    }

    if (!patientClinicUuid) {
      console.error('User profile UUID missing');
      return;
    }

    const templateUUid = (intakeFormData?.data as any)?.[0]?.uuid as string;

    const combinedData = {
      healthHistory: healthFormData ?? {},
      familyHistory: familyFormData ?? { familyMembers: [] },
      healthHabit: healthHabitFormData ?? {},
      menOnly: menFormData ?? {},
      womenOnly: womenFormData ?? {},
      patientUuid: patientClinicUuid,
    };

    const normalizedTemplateData = {
      healthHistory: combinedData.healthHistory || {},
      familyHistory: { familyMembers: combinedData.familyHistory.familyMembers || [] },
      healthHabit: combinedData.healthHabit || {},
      menOnly: combinedData.menOnly || {},
      womenOnly: combinedData.womenOnly || {},
      patientUuid: { value: combinedData.patientUuid },
    };

    const payload: IntakeFormConsentFormTemplate = {
      uuid: templateUUid as string,
      patientClinicUuid: patientDetails?.uuid as string,
      templateName: ((intakeFormData?.data as any)?.[0]?.templateName as string) || 'Intake Form',
      formType: 'INTAKE_FORM',
      formStatus: 'DRAFT',
      templateData: normalizedTemplateData,
    };

    updateIntakeEntry(payload);
  };

  const handleSave = () => {
    if (!patientDetails?.uuid) {
      console.error('Patient details not loaded yet');
      return;
    }

    if (!patientClinicUuid) {
      console.error('User profile UUID missing');
      return;
    }

    const templateUUid = (intakeFormData?.data as any)?.[0]?.uuid;

    const combinedData = {
      healthHistory: healthFormData ?? {},
      familyHistory: familyFormData ?? { familyMembers: [] },
      healthHabit: healthHabitFormData ?? {},
      menOnly: menFormData ?? {},
      womenOnly: womenFormData ?? {},
      patientUuid: patientClinicUuid,
    };

    const normalizedTemplateData = {
      healthHistory: combinedData.healthHistory || {},
      familyHistory: { familyMembers: combinedData.familyHistory.familyMembers || [] },
      healthHabit: combinedData.healthHabit || {},
      menOnly: combinedData.menOnly || {},
      womenOnly: combinedData.womenOnly || {},
      patientUuid: { value: combinedData.patientUuid },
    };

    const payload: IntakeFormConsentFormTemplate = {
      uuid: templateUUid as string,
      patientClinicUuid: patientDetails?.uuid as string,
      templateName: ((intakeFormData?.data as any)?.[0]?.templateName as string) || 'Intake Form',
      formType: 'INTAKE_FORM',
      formStatus: 'SUBMITTED',
      templateData: normalizedTemplateData,
    };

    updateIntakeEntry(payload);
  };

  const handleUpdateStatus = () => {
    const templateUUid = (intakeFormData?.data as any)?.[0]?.uuid as string;

    const combinedData = {
      healthHistory: healthFormData ?? {},
      familyHistory: familyFormData ?? { familyMembers: [] },
      healthHabit: healthHabitFormData ?? {},
      menOnly: menFormData ?? {},
      womenOnly: womenFormData ?? {},
      patientUuid: patientClinicUuid,
    };

    const normalizedTemplateData = {
      healthHistory: combinedData.healthHistory || {},
      familyHistory: { familyMembers: combinedData.familyHistory.familyMembers || [] },
      healthHabit: combinedData.healthHabit || {},
      menOnly: combinedData.menOnly || {},
      womenOnly: combinedData.womenOnly || {},
      patientUuid: { value: combinedData.patientUuid },
    };

    const newFormStatus =
      (intakeFormData as any)?.data[0]?.formStatus === 'DRAFT' ? 'SUBMITTED' : 'DRAFT';

    const payload: IntakeFormConsentFormTemplate = {
      uuid: templateUUid as string,
      patientClinicUuid: patientDetails?.uuid as string,
      templateName: (intakeFormData?.data as any)?.[0]?.templateName as string,
      formType: 'INTAKE_FORM',
      formStatus: newFormStatus,
      templateData: normalizedTemplateData,
    };

    updateIntakeEntry(payload);
  };

  useEffect(() => {
    if (isSuccessUpdate) {
      setConfirmationPopup(false);
      refetchIntakeForm();
    }
  }, [isSuccessUpdate, refetchIntakeForm]);

  useEffect(() => {
    const shouldShowLoader =
      (isPatientPortal || isProviderPortal) && (isUpdatingIntake || isIntakeFormDataPending);
    dispatch(shouldShowLoader ? showLoader() : hideLoader());
  }, [isUpdatingIntake, isIntakeFormDataPending, isPatientPortal, isProviderPortal]);

  useEffect(() => {
    if (intakeTemplateData && intakeTemplateData !== loadedTemplateData.current) {
      loadedTemplateData.current = intakeTemplateData;

      setHealthFormData(
        intakeTemplateData.healthHistory
          ? (intakeTemplateData.healthHistory as HealthHistoryFormData)
          : null
      );
      setFamilyFormData(
        intakeTemplateData.familyHistory
          ? (intakeTemplateData.familyHistory as FamilyHealthHistoryData)
          : null
      );
      setHealthHabitFormData(
        intakeTemplateData.healthHabit ? (intakeTemplateData.healthHabit as HealthHabitData) : null
      );
      setMenFormData(
        intakeTemplateData.menOnly ? (intakeTemplateData.menOnly as MenHealthData) : null
      );
      setWomenFormData(
        intakeTemplateData.womenOnly ? (intakeTemplateData.womenOnly as WomenHealthData) : null
      );

      isInitialLoad.current = false;
    } else if (!intakeTemplateData && patientDetails?.uuid) {
      setHealthFormData(null);
      setFamilyFormData(null);
      setHealthHabitFormData(null);
      setMenFormData(null);
      setWomenFormData(null);
      loadedTemplateData.current = null;
    }
  }, [intakeTemplateData, patientDetails?.uuid]);

  useApiFeedback(
    isErrorUpdate,
    errorUpdate,
    isSuccessUpdate,
    (dataUpdate?.message || APIFeedbackMessages.INTAKE_UPDATE) as string
  );

  const IntakeFormStatus = (intakeFormData as any)?.data[0]?.formStatus;

  return (
    <form onSubmit={handleSubmit(handleSave)}>
      {!patientProfile && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, my: 1 }}>
          <BackArrowIcon
            color="Primary.main"
            onClick={() => navigate(`/admin/templates/custom-templates`)}
            style={{ cursor: 'pointer' }}
          />
          <Typography variant="bodyRegular3">{templateConstants.INTAKE_FORM}</Typography>
        </Box>
      )}

      <Box
        sx={{
          height: 'calc(100vh - 120px)',
          overflowY: 'auto',
          width: '100%',
          scrollbarWidth: 'none',
        }}
      >
        <Grid
          container
          mt={!patientProfile ? 2 : 0}
          gap={1}
          sx={{ height: 'auto', scroll: 'auto' }}
        >
          {!patientProfile && <Grid size={2.5}></Grid>}
          <Grid size={!patientProfile ? 7 : 12}>
            <DropDownSection title={templateConstants.PATIENT_HEALTH_HISTORY}>
              <HealthHistoryForm
                onChangeData={handleHealthDataChange}
                data={memoizedHealthFormData}
                patientApptIntake={patientApptIntake}
              />
            </DropDownSection>

            <DropDownSection title={templateConstants.FAMILY_HEALTH_HISTORY}>
              <FamilyHealthHistory
                onChangeData={handlefamilyDataChange}
                data={memoizedFamilyFormData}
                patientApptIntake={patientApptIntake}
              />
            </DropDownSection>

            <DropDownSection title={templateConstants.HEALTH_HABIT_AND_PERSONAL_SAFETY}>
              <HealthHabit
                onChangeData={handleHealthHabit}
                data={memoizedHealthHabitFormData}
                patientApptIntake={patientApptIntake}
              />
            </DropDownSection>

            {gender === 'MALE' && (
              <DropDownSection title={templateConstants.MEN_ONLY}>
                <MenOnly
                  onChangeData={handleMenOnly}
                  data={memoizedMenFormData}
                  patientApptIntake={patientApptIntake}
                />
              </DropDownSection>
            )}
            {gender === 'FEMALE' && (
              <DropDownSection title={templateConstants.WOMEN_ONLY}>
                <WomenOnly
                  onChangeData={handleWomenOnly}
                  data={memoizedWomenFormData}
                  patientApptIntake={patientApptIntake}
                />
              </DropDownSection>
            )}
            {!gender && (
              <>
                <DropDownSection title={templateConstants.MEN_ONLY}>
                  <MenOnly
                    onChangeData={handleMenOnly}
                    data={memoizedMenFormData}
                    patientApptIntake={patientApptIntake}
                  />
                </DropDownSection>
                <DropDownSection title={templateConstants.WOMEN_ONLY}>
                  <WomenOnly
                    onChangeData={handleWomenOnly}
                    data={memoizedWomenFormData}
                    patientApptIntake={patientApptIntake}
                  />
                </DropDownSection>
              </>
            )}
          </Grid>
        </Grid>
        {!isAdminPortal && (
          <>
            <Grid display={'flex'} gap={1.5} mt={2} justifyContent={'end'}>
              <Typography variant="bodyMedium3">Status :</Typography>
              <Chip type={(intakeFormData as any)?.data[0]?.formStatus} />
            </Grid>

            {!patientApptIntake && (
              <Grid mb={6}>
                {IntakeFormStatus != 'SUBMITTED' ? (
                  <Grid
                    container
                    sx={{
                      mt: 2,
                      gap: 2,
                      justifyContent: 'flex-end',
                    }}
                  >
                    <CustomButton
                      label={templateConstants.SAVE_AS_DRAFT}
                      variant="outlined"
                      type="button"
                      onClick={handleSaveAsDraft}
                    />

                    <CustomButton label={templateConstants.SAVE} variant="filled" type="submit" />
                  </Grid>
                ) : null}

                {isProviderPortal && IntakeFormStatus == 'SUBMITTED' ? (
                  <Grid
                    container
                    sx={{
                      mt: 2,
                      gap: 2,
                      justifyContent: 'flex-end',
                    }}
                  >
                    <CustomButton
                      label={templateConstants.UPDATE_STATUS}
                      variant="outlined"
                      type="button"
                      onClick={() => setConfirmationPopup(true)}
                    />
                  </Grid>
                ) : null}
              </Grid>
            )}
          </>
        )}
      </Box>

      <ConfirmationPopUp
        open={confirmationPopUp}
        onClose={handleClose}
        onConfirm={handleUpdateStatus}
        message={templateConstants.CONFIRM_POP}
      />
    </form>
  );
};

export default IntakeForm;
