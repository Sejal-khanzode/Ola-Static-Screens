import { Grid, Typography } from '@mui/material';
import { useForm, Controller, useWatch } from 'react-hook-form';
import CustomDatePicker from 'src/components/core/reusable/custom-date-picker/custom-date-picker';
import CustomLabel from 'src/components/core/reusable/custom-label/custom-label';
import SignatureComponent from 'src/components/core/reusable/signature-component';
import useAuthority from 'src/hooks/use-authority';
import { templateConstants } from 'src/constants/setting-constants';
import { getCurrentDate } from 'src/constants/date-format';
import { useEffect, useState, useRef } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { useSelector } from 'react-redux';
import { PatientControllerService } from 'src/sdk/requests';
import { useQuery } from '@tanstack/react-query';
import { RootState } from 'src/redux/store';
import { hideLoader, showLoader } from 'src/redux/reducers/loaderReducer';
import { useAppDispatch } from 'src/redux/hooks';
import { addPatientConstants } from 'src/constants/patients-constants';

export interface ConsentFormData {
  patientSignature: string;
  signatureDate: string;
  hasSigned: boolean;
}

interface PatientConsentFormProps {
  onChangeData?: (data: ConsentFormData) => void;
  formStatus?: string;
  data?: ConsentFormData | null;
}

const PatientConsentForm = ({ onChangeData, formStatus, data }: PatientConsentFormProps) => {
  const [hasLoadedInitialData, setHasLoadedInitialData] = useState(false);
  const [showSignature, setShowSignature] = useState(false);
  const userProfile = useSelector((state: RootState) => state.userProfileReducer.userProfile);
  const dispatch = useAppDispatch();
  const isInitialMount = useRef(true);

  const { data: getSignature, isPending } = useQuery({
    queryKey: ['patientSignature', userProfile?.uuid],
    enabled: !!userProfile?.uuid,
    queryFn: () =>
      PatientControllerService.getApiMasterPatientByPatientIdSignature({
        patientId: userProfile?.uuid as string,
      }),
  });

  const sign = getSignature?.data?.signature;

  const { control, setValue, handleSubmit, getValues } = useForm<ConsentFormData>({
    defaultValues: {
      patientSignature: '',
      signatureDate: getCurrentDate(),
      hasSigned: false,
    },
  });

  const formValues = useWatch({ control });
  const { isPatientPortal } = useAuthority();

  const debouncedOnChange = useDebouncedCallback((values: ConsentFormData) => {
    if (!isInitialMount.current && onChangeData) {
      onChangeData(values);
    }
  }, 300);
  const handleSignatureSave = (signatureData: string) => {
    setValue('patientSignature', signatureData);
    setShowSignature(true);
  };

  const onSubmit = () => {};

  const currentSignature = getValues('patientSignature');

  useEffect(() => {
    if (data && !hasLoadedInitialData) {
      if (data.patientSignature) {
        setValue('patientSignature', data?.patientSignature, { shouldDirty: false });
      }
      if (data.signatureDate) {
        setValue('signatureDate', data?.signatureDate, { shouldDirty: false });
      }
      if (sign) {
        setValue('hasSigned', true, { shouldDirty: false });
      }
      setHasLoadedInitialData(true);
    }
  }, [data, hasLoadedInitialData]);

  useEffect(() => {
    if (data === null) {
      setValue('patientSignature', '', { shouldDirty: false });
      setValue('signatureDate', getCurrentDate(), { shouldDirty: false });
      setValue('hasSigned', false, { shouldDirty: false });
      setShowSignature(false);
      setHasLoadedInitialData(false);
    }
  }, [data]);

  useEffect(() => {
    debouncedOnChange(formValues as ConsentFormData);
  }, [formValues]);

  useEffect(() => {
    isInitialMount.current = false;
  }, []);

  useEffect(() => {
    if (isPending) {
      dispatch(showLoader());
    } else {
      dispatch(hideLoader());
    }
  }, [isPending]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid sx={{ width: '100%', overflowY: 'auto', paddingBottom: 2, gap: 2, mb: 2 }}>
        <Grid container sx={{ padding: 1, paddingLeft: 2, gap: 2 }}>
          <Grid size={12}>
            <Typography variant="bodyMedium4">
              I authorize Ola EHR to release any medical or other information that may be necessary
              to process medical claims on my behalf to related physicians, rehabilitation
              counselors, social workers, insurance carriers, or attorneys.
            </Typography>
          </Grid>

          <Grid size={12}>
            <Typography variant="bodyMedium4">
              I authorize Ola EHR to initiate a complaint to the insurance commissioner for any
              reason on my behalf.
            </Typography>
          </Grid>

          <Grid size={12}>
            <Typography variant="bodyMedium4" sx={{ mb: 4, lineHeight: 1.6 }}>
              I, the undersigned, state that I have read and agree to the terms and conditions set
              forth.
            </Typography>
          </Grid>
        </Grid>

        <Grid size={12} paddingLeft={2} mt={2}>
          <Grid container spacing={4}>
            <Grid size={3}>
              <CustomLabel label={templateConstants.PATIENT_SIGNATURE} />
              {isPatientPortal ? (
                formStatus === 'SUBMITTED' ? (
                  currentSignature ? (
                    <img
                      src={currentSignature}
                      alt="Signature"
                      style={{
                        width: '200px',
                        height: '80px',
                        border: '1px solid #ccc',
                        borderRadius: '8px',
                        objectFit: 'contain',
                      }}
                    />
                  ) : (
                    <></>
                  )
                ) : (
                  <Controller
                    name="patientSignature"
                    control={control}
                    render={({ field }) => {
                      if (sign && !showSignature) {
                        return (
                          <Typography
                            variant="bodyRegular5"
                            sx={{
                              cursor: 'pointer',
                              textDecoration: 'underline',
                              color: 'Primary.main',
                            }}
                            onClick={() => {
                              setValue('patientSignature', sign as string, { shouldDirty: true });
                              setShowSignature(true);
                            }}
                          >
                            Sign
                          </Typography>
                        );
                      }

                      if (showSignature && sign) {
                        return (
                          <img
                            src={sign as string}
                            alt="Signature"
                            style={{
                              width: '200px',
                              height: '80px',
                              border: '1px solid #ccc',
                              borderRadius: '8px',
                              objectFit: 'contain',
                              cursor: 'pointer',
                            }}
                          />
                        );
                      }
                      return (
                        <SignatureComponent
                          onSave={handleSignatureSave}
                          buttonLabel={addPatientConstants.ADD_SIGN}
                          initialSignature={field.value}
                        />
                      );
                    }}
                  />
                )
              ) : currentSignature ? (
                <img
                  src={currentSignature}
                  alt="Signature"
                  style={{
                    width: '200px',
                    height: '80px',
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    objectFit: 'contain',
                  }}
                />
              ) : null}
            </Grid>

            <Grid size={3}>
              <CustomLabel label={templateConstants.DATE} />
              <Controller
                name="signatureDate"
                control={control}
                render={({ field }) => (
                  <CustomDatePicker
                    value={field.value || getCurrentDate()}
                    readonly={formStatus === 'SUBMITTED'}
                    handleDateChange={date => field.onChange(date)}
                  />
                )}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default PatientConsentForm;
