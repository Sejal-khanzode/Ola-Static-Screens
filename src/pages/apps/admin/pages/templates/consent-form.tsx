import { Box, Typography, Grid, Alert } from '@mui/material';
import { DropDownSection } from './intake-form';
import PatientConsentForm, { ConsentFormData } from './consent-form/patient-consent-form';
import MedicalAppointmentCancellation, {
  MedicalFormData,
} from './consent-form/medical-appointment-policy';
import AuthorizationOfDisclosure, {
  AuthorizationOfDisclosureData,
} from './consent-form/authorization-of-disclosure';
import FinancialResponsibility, {
  FinancialResponsibilityData,
} from './consent-form/financial-responsibility';
import Acknoledgement, { AcknoledgementOfDisclosureData } from './consent-form/acknoledgement';
import { BackArrowIcon } from 'src/assets/icons/backArrowIcon';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import TreatPhotoConsent, { TreatPhotoData } from './consent-form/treat-photo-concent';
import { templateConstants } from 'src/constants/setting-constants';
import { useDispatch } from 'react-redux';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  IntakeFormConsentFormTemplate,
  IntakeFormConsentTemplateService,
  PatientClinicControllerService,
  PatientControllerService,
} from 'src/sdk/requests';
import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import CustomButton from 'src/components/core/reusable/custom-button/custom-button';
import useAuthority from 'src/hooks/use-authority';
import { hideLoader, showLoader } from 'src/redux/reducers/loaderReducer';
import useApiFeedback from 'src/hooks/useApiFeedback';
import { getDataFromLocalStorage } from 'src/sdk/requests/core/localStorage';
import Chip from 'src/components/core/reusable/chip/chip';

interface ConsentFormProps {
  isEdit?: boolean;
  patientProfile?: boolean;
  hasSigned?: boolean;
}

const ConsentForm = (props: ConsentFormProps) => {
  const { patientProfile } = props;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isPatientPortal, isAdminPortal } = useAuthority();

  const [patientConsentData, setPatientConsentData] = useState<ConsentFormData | null>(null);
  const [financialData, setFinancialData] = useState<FinancialResponsibilityData | null>(null);
  const [treatPhotoData, setTreatPhotoData] = useState<TreatPhotoData | null>(null);
  const [authorizationData, setAuthorizationData] = useState<AuthorizationOfDisclosureData | null>(
    null
  );
  const [acknowledgementData, setAcknowledgementData] =
    useState<AcknoledgementOfDisclosureData | null>(null);
  const [medicalAppointmentData, setMedicalAppointmentData] = useState<MedicalFormData | null>(
    null
  );

  const [sharedSignature, setSharedSignature] = useState<string>('');
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const isInitialLoad = useRef(true);
  const loadedTemplateData = useRef<any>(null);
  const prevSignaturesRef = useRef<string>('');
  const isUpdatingSignature = useRef(false);

  const { data: patientProfileData } = useQuery({
    queryKey: ['patientProfileData'],
    enabled: !isAdminPortal,
    queryFn: () => PatientControllerService.getApiMasterPatientProfile(),
  });

  const userProfile = patientProfileData?.data;

  const patientClinicUuid = isPatientPortal
    ? userProfile?.uuid
    : getDataFromLocalStorage('patientUUID');

  const { data: patientsApiData } = useQuery({
    queryKey: ['patientDataa'],
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

  const patientDetails = patientsApiData?.data;

  const {
    data: consentData,
    isPending,
    refetch: consentFormRefetch,
  } = useQuery({
    queryKey: ['consentFormData', patientDetails?.uuid],
    enabled: !!patientDetails?.uuid,
    queryFn: () =>
      IntakeFormConsentTemplateService.getApiMasterIntakeFormConsentTemplatePatientClinicByPatientClinicUuidTypeByFormType(
        {
          patientClinicUuid: patientDetails?.uuid as string,
          formType: 'CONSENT_FORM',
        }
      ),
  });

  const consentTemplateData = useMemo(() => {
    return (consentData?.data as any)?.[0]?.templateData;
  }, [consentData?.data]);


  const ConsentFormStatus = (consentData as any)?.data[0]?.formStatus;

  const {
    mutate: updateConsentForm,
    isPending: isUpdating,
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

  useApiFeedback(
    isErrorUpdate,
    errorUpdate,
    isSuccessUpdate,
    (dataUpdate?.message || 'Consent forms submitted successfully') as string
  );

  const { handleSubmit } = useForm({});

  const handlePatientConsentChange = useCallback((data: ConsentFormData) => {
    setPatientConsentData(prev => {
      if (JSON.stringify(prev) !== JSON.stringify(data)) {
        return data;
      }
      return prev;
    });
  }, []);

  const handleFinancialDataChange = useCallback((data: FinancialResponsibilityData) => {
    setFinancialData(prev => {
      if (JSON.stringify(prev) !== JSON.stringify(data)) {
        return data;
      }
      return prev;
    });
  }, []);

  const handleTreatPhotoDataChange = useCallback((data: TreatPhotoData) => {
    setTreatPhotoData(prev => {
      if (JSON.stringify(prev) !== JSON.stringify(data)) {
        return data;
      }
      return prev;
    });
  }, []);

  const handleAuthorizationDataChange = useCallback((data: AuthorizationOfDisclosureData) => {
    setAuthorizationData(prev => {
      if (JSON.stringify(prev) !== JSON.stringify(data)) {
        return data;
      }
      return prev;
    });
  }, []);

  const handleAcknowledgementDataChange = useCallback((data: AcknoledgementOfDisclosureData) => {
    setAcknowledgementData(prev => {
      if (JSON.stringify(prev) !== JSON.stringify(data)) {
        return data;
      }
      return prev;
    });
  }, []);

  const handleMedicalAppointmentDataChange = useCallback((data: MedicalFormData) => {
    setMedicalAppointmentData(prev => {
      if (JSON.stringify(prev) !== JSON.stringify(data)) {
        return data;
      }
      return prev;
    });
  }, []);

  const memoizedPatientConsentData = useMemo(
    () => (isInitialLoad.current ? null : patientConsentData),
    [patientConsentData]
  );
  const memoizedFinancialData = useMemo(
    () => (isInitialLoad.current ? null : financialData),
    [financialData]
  );
  const memoizedTreatPhotoData = useMemo(
    () => (isInitialLoad.current ? null : treatPhotoData),
    [treatPhotoData]
  );
  const memoizedAuthorizationData = useMemo(
    () => (isInitialLoad.current ? null : authorizationData),
    [authorizationData]
  );
  const memoizedAcknowledgementData = useMemo(
    () => (isInitialLoad.current ? null : acknowledgementData),
    [acknowledgementData]
  );
  const memoizedMedicalAppointmentData = useMemo(
    () => (isInitialLoad.current ? null : medicalAppointmentData),
    [medicalAppointmentData]
  );

  useEffect(() => {
    if (consentTemplateData && consentTemplateData !== loadedTemplateData?.current) {
      loadedTemplateData.current = consentTemplateData;

      if (consentTemplateData?.patientConsent) {
        setPatientConsentData(consentTemplateData?.patientConsent as ConsentFormData);
      }
      if (consentTemplateData?.financialResponsibility) {
        setFinancialData(
          consentTemplateData?.financialResponsibility as FinancialResponsibilityData
        );
      }
      if (consentTemplateData?.treatPhotoConsent) {
        setTreatPhotoData(consentTemplateData?.treatPhotoConsent as TreatPhotoData);
      }
      if (consentTemplateData?.authorizationOfDisclosure) {
        setAuthorizationData(
          consentTemplateData?.authorizationOfDisclosure as AuthorizationOfDisclosureData
        );
      }
      if (consentTemplateData?.acknowledgement) {
        setAcknowledgementData(
          consentTemplateData?.acknowledgement as AcknoledgementOfDisclosureData
        );
      }
      if (consentTemplateData?.medicalAppointmentCancellation) {
        setMedicalAppointmentData(
          consentTemplateData?.medicalAppointmentCancellation as MedicalFormData
        );
      }

      isInitialLoad.current = false;
    }
  }, [consentTemplateData]);

useEffect(() => {
  if (patientDetails?.uuid) {
    loadedTemplateData.current = null;
    
    isInitialLoad.current = true;
    
    setPatientConsentData(null);
    setFinancialData(null);
    setTreatPhotoData(null);
    setAuthorizationData(null);
    setAcknowledgementData(null);
    setMedicalAppointmentData(null);
    setSharedSignature('');
    
    setValidationErrors([]);
  }
}, [patientDetails?.uuid]);

useEffect(() => {
  if (consentTemplateData && consentTemplateData !== loadedTemplateData.current) {
    loadedTemplateData.current = consentTemplateData;

    setPatientConsentData(consentTemplateData?.patientConsent || null);
    setFinancialData(consentTemplateData?.financialResponsibility || null);
    setTreatPhotoData(consentTemplateData?.treatPhotoConsent || null);
    setAuthorizationData(consentTemplateData?.authorizationOfDisclosure || null);
    setAcknowledgementData(consentTemplateData?.acknowledgement || null);
    setMedicalAppointmentData(consentTemplateData?.medicalAppointmentCancellation || null);

    isInitialLoad.current = false;
  }
}, [consentTemplateData]);

  useEffect(() => {
    if (isInitialLoad.current || isUpdatingSignature.current) {
      return;
    }

    const signatures = [
      patientConsentData?.patientSignature,
      financialData?.patientSignature,
      treatPhotoData?.patientSignature,
      authorizationData?.patientSignature,
      acknowledgementData?.patientSignature,
      medicalAppointmentData?.patientSignature,
    ].filter(sig => sig && sig.trim() !== '');

    const signaturesString = signatures.join('|');

    if (signaturesString && signaturesString !== prevSignaturesRef.current) {
      prevSignaturesRef.current = signaturesString;
      const firstSignature = signatures[0];

      if (firstSignature && firstSignature !== sharedSignature) {
        isUpdatingSignature.current = true;
        setSharedSignature(firstSignature);
        setTimeout(() => {
          isUpdatingSignature.current = false;
        }, 0);
      }
    }
  }, [
    patientConsentData?.patientSignature,
    financialData?.patientSignature,
    treatPhotoData?.patientSignature,
    authorizationData?.patientSignature,
    acknowledgementData?.patientSignature,
    medicalAppointmentData?.patientSignature,
  ]);

  const validateSignatures = () => {
    const errors: string[] = [];
    
    const hasAtLeastOneSigned =
      (patientConsentData?.hasSigned === true || 
       (patientConsentData?.patientSignature && patientConsentData.patientSignature.trim() !== '')) ||
      (financialData?.hasSigned === true || 
       (financialData?.patientSignature && financialData.patientSignature.trim() !== '')) ||
      (treatPhotoData?.hasSigned === true || 
       (treatPhotoData?.patientSignature && treatPhotoData.patientSignature.trim() !== '')) ||
      (authorizationData?.hasSigned === true || 
       (authorizationData?.patientSignature && authorizationData.patientSignature.trim() !== '')) ||
      (acknowledgementData?.hasSigned === true || 
       (acknowledgementData?.patientSignature && acknowledgementData.patientSignature.trim() !== '')) ||
      (medicalAppointmentData?.hasSigned === true || 
       (medicalAppointmentData?.patientSignature && medicalAppointmentData.patientSignature.trim() !== ''));

    if (!hasAtLeastOneSigned) {
      errors.push('Please sign at least one consent form before submission');
    }

    return errors;
  };

  const onSubmit = () => {
    const errors = validateSignatures();

    if (errors.length > 0) {
      setValidationErrors(errors);
      return;
    }

    setValidationErrors([]);

    if (!patientDetails?.uuid) {
      console.error('Patient details not loaded yet');
      return;
    }

    if (!userProfile?.uuid) {
      console.error('User profile UUID missing');
      return;
    }

    const templateUUid = (consentData?.data as any)?.[0]?.uuid;

    const combinedData = {
      patientConsent: patientConsentData ?? {},
      financialResponsibility: financialData ?? {},
      treatPhotoConsent: treatPhotoData ?? {},
      authorizationOfDisclosure: authorizationData ?? {},
      acknowledgement: acknowledgementData ?? {},
      medicalAppointmentCancellation: medicalAppointmentData ?? {},
      patientUuid: userProfile.uuid,
    };

    const payload: IntakeFormConsentFormTemplate = {
      uuid: templateUUid as string,
      patientClinicUuid: patientDetails?.uuid as string,
      templateName: (consentData?.data as any)?.[0]?.templateName || 'Consent Form',
      formType: 'CONSENT_FORM',
      formStatus: 'SUBMITTED',
      templateData: combinedData as any,
    };

    updateConsentForm(payload);
  };

  useEffect(() => {
    if (!isAdminPortal) {
      const shouldShowLoader = isUpdating || isPending;
      dispatch(shouldShowLoader ? showLoader() : hideLoader());
    }
  }, [isUpdating, isPending, isAdminPortal]);

  useEffect(() => {
    if (isSuccessUpdate) {
      consentFormRefetch();
    }
  }, [isSuccessUpdate]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {!patientProfile && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
          <BackArrowIcon
            color="Primary.main"
            onClick={() => navigate(`/admin/templates/custom-templates`)}
            style={{ cursor: 'pointer' }}
          />
          <Typography variant="bodyRegular3">{templateConstants.CONSENT_FORM}</Typography>
        </Box>
      )}
      <Box
        sx={{
          height: 'calc(100vh - 120px)',
          overflowY: 'auto',
          width: '100%',
          scrollbarWidth: 'none',
          pb: 5,
        }}
      >
        <Grid container mt={!patientProfile ? 2 : 0} gap={1} sx={{ width: '100%' }} size={12}>
          {!patientProfile && <Grid size={3}></Grid>}
          <Grid size={!patientProfile ? 6 : 12}>
            <DropDownSection title={templateConstants.PATIENT_CONSENT_FORM}>
              <PatientConsentForm
                onChangeData={handlePatientConsentChange}
                formStatus={ConsentFormStatus}
                data={memoizedPatientConsentData}
              />
            </DropDownSection>
            <DropDownSection title={templateConstants.FINANCIAL_RESPONSIBILITY}>
              <FinancialResponsibility
                onChangeData={handleFinancialDataChange}
                formStatus={ConsentFormStatus}
                data={memoizedFinancialData}
              />
            </DropDownSection>
            <DropDownSection title={templateConstants.TREAT_PHOTO_CONSENT}>
              <TreatPhotoConsent
                onChangeData={handleTreatPhotoDataChange}
                formStatus={ConsentFormStatus}
                data={memoizedTreatPhotoData}
              />
            </DropDownSection>
            <DropDownSection title={templateConstants.PATIENT_AUTHORIZATION_OF_DISCLOSURE}>
              <AuthorizationOfDisclosure
                onChangeData={handleAuthorizationDataChange}
                formStatus={ConsentFormStatus}
                data={memoizedAuthorizationData}
              />
            </DropDownSection>
            <DropDownSection
              title={templateConstants.ACKNOWLEDGEMENT_OF_RECEIPT_OF_NOTICE_OF_PRIVACY_RULES}
            >
              <Acknoledgement
                onChangeData={handleAcknowledgementDataChange}
                formStatus={ConsentFormStatus}
                data={memoizedAcknowledgementData}
              />
            </DropDownSection>
            <DropDownSection title={templateConstants.MEDICAL_APPOINTMENT_CANCELLATION}>
              <MedicalAppointmentCancellation
                onChangeData={handleMedicalAppointmentDataChange}
                formStatus={ConsentFormStatus}
                data={memoizedMedicalAppointmentData}
              />
            </DropDownSection>

            {validationErrors.length > 0 && (
              <Box sx={{ mt: 2 }}>
                <Alert severity="error">
                  <Typography variant="bodyMedium4" sx={{ mb: 1 }}>
                    Please sign the above consent forms:
                  </Typography>
                  <ul style={{ margin: 0, paddingLeft: '20px' }}>
                    {validationErrors.map((error, index) => (
                      <li key={index}>
                        <Typography variant="bodyMedium5">{error}</Typography>
                      </li>
                    ))}
                  </ul>
                </Alert>
              </Box>
            )}
            {!isAdminPortal &&
              (isPatientPortal && ConsentFormStatus !== 'SUBMITTED' ? (
                <Grid
                  container
                  sx={{
                    my: 2,
                    gap: 2,
                    justifyContent: 'flex-end',
                  }}
                >
                  <CustomButton
                    label="Submit"
                    variant="filled"
                    type="submit"
                    disabled={isUpdating}
                  />
                </Grid>
              ) : (
                <Grid display="flex" gap={1.5} mt={2} justifyContent="flex-end">
                  <Typography variant="bodyMedium3">Status :</Typography>
                  <Chip type={ConsentFormStatus} />
                </Grid>
              ))}
          </Grid>
        </Grid>
      </Box>
    </form>
  );
};

export default ConsentForm;
