import { Box, Grid, Link, Typography } from '@mui/material';
import { Controller, useForm, useWatch } from 'react-hook-form';
import CustomLabel from 'src/components/core/reusable/custom-label/custom-label';
import CustomDatePicker from 'src/components/core/reusable/custom-date-picker/custom-date-picker';
import CustomSelect from 'src/components/core/reusable/custom-select/custom-select';
import { RelationshipList } from 'src/constants/formConst';
import CustomInput from 'src/components/core/reusable/custom-input/custom-input';
import SignatureComponent from 'src/components/core/reusable/signature-component';
import useAuthority from 'src/hooks/use-authority';
import { templateConstants } from 'src/constants/setting-constants';
import { getCurrentDate } from 'src/constants/date-format';
import { useEffect, useState, useCallback, useRef } from 'react';
import { RootState } from 'src/redux/store';
import { useSelector } from 'react-redux';
import { useDebouncedCallback } from 'use-debounce';
import { PatientControllerService } from 'src/sdk/requests';
import { useQuery } from '@tanstack/react-query';
import { useAppDispatch } from 'src/redux/hooks';
import { hideLoader, showLoader } from 'src/redux/reducers/loaderReducer';

export interface TreatPhotoData {
  patientSignature: string;
  relationshipToPatient: string;
  patientName: string;
  date: string;
  hasSigned: boolean;
}

interface TreatPhotoConsentProps {
  onChangeData?: (data: TreatPhotoData) => void;
  formStatus?: string;
  data?: TreatPhotoData | null;
}

const TreatPhotoConsent = ({ onChangeData, formStatus, data }: TreatPhotoConsentProps) => {
  const [loadedDataRef, setLoadedDataRef] = useState<any>(null);
  const [showSignature, setShowSignature] = useState(false);

  const isInitialMount = useRef(true);

  const { control, setValue, getValues, watch } = useForm<TreatPhotoData>({
    defaultValues: {
      patientSignature: '',
      relationshipToPatient: 'SELF',
      patientName: '',
      date: getCurrentDate(),
      hasSigned: false,
    },
  });

  const userProfile = useSelector((state: RootState) => state.userProfileReducer.userProfile);
  const { isPatientPortal } = useAuthority();
  const dispatch = useAppDispatch();

  const { data: getSignature, isPending } = useQuery({
    queryKey: ['patientSignature', userProfile?.uuid],
    enabled: !!userProfile?.uuid,
    queryFn: () =>
      PatientControllerService.getApiMasterPatientByPatientIdSignature({
        patientId: userProfile?.uuid as string,
      }),
  });

  const sign = getSignature?.data?.signature;
  const handleSignatureSave = useCallback((signatureData: string) => {
    setValue('patientSignature', signatureData);
    setShowSignature(true);
  }, []);

  const debouncedChange = useDebouncedCallback((values: TreatPhotoData) => {
    if (!isInitialMount?.current) {
      onChangeData?.(values);
    }
  }, 400);

  useEffect(() => {
    if (data && !loadedDataRef) {
      const currentValues = getValues();
      const hasSignificantChanges =
        data.patientSignature !== currentValues?.patientSignature ||
        data.relationshipToPatient !== currentValues?.relationshipToPatient ||
        data.patientName !== currentValues?.patientName ||
        data.date !== currentValues?.date;

      if (hasSignificantChanges) {
        if (data?.patientSignature !== undefined) {
          setValue('patientSignature', data?.patientSignature, { shouldDirty: false });
        }
        if (sign) {
          setValue('hasSigned', true, { shouldDirty: false });
        }
        if (data?.relationshipToPatient !== undefined) {
          setValue('relationshipToPatient', data?.relationshipToPatient || 'SELF', {
            shouldDirty: false,
          });
        }
        if (data?.patientName !== undefined) {
          setValue('patientName', data?.patientName, { shouldDirty: false });
        }
        if (data?.date !== undefined) {
          setValue('date', data?.date, { shouldDirty: false });
        }
        setLoadedDataRef(data);
      }
    }
  }, [data, getValues, loadedDataRef]);

  useEffect(() => {
    if (data === null) {
      setValue('patientSignature', '', { shouldDirty: false });
      setValue('relationshipToPatient', 'SELF', { shouldDirty: false });
      setValue('patientName', '', { shouldDirty: false });
      setValue('date', getCurrentDate(), { shouldDirty: false });
      setValue('hasSigned', false, { shouldDirty: false });
      setShowSignature(false);
      setLoadedDataRef(null);
    }
  }, [data]);

  useEffect(() => {
    if (isPatientPortal && userProfile && !getValues('patientName')) {
      const fullName = `${userProfile?.firstName} ${userProfile?.lastName}`;
      setValue('patientName', fullName, { shouldDirty: false });
    }
  }, [isPatientPortal, userProfile, getValues]);

  const formValues = useWatch({ control });

  useEffect(() => {
    debouncedChange(formValues as TreatPhotoData);
  }, [formValues, debouncedChange]);

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

  const currentSignature = watch('patientSignature');

  return (
    <Box sx={{ width: '100%', overflowY: 'auto', mb: 2 }}>
      <Grid container sx={{ padding: 1, paddingLeft: 2, gap: 1 }}>
        <Grid size={12}>
          <Typography variant="bodyMedium4">
            I authorize the healthcare clinicians at Ola EHR to perform necessary evaluations and
            treatments for my care.
          </Typography>
        </Grid>

        <Grid size={12}>
          <Typography variant="bodyMedium4">
            I also consent to the taking of clinical and wound photographs for medical documentation
            and treatment purposes.
          </Typography>
        </Grid>
        <Grid size={12}>
          <Typography variant="bodyMedium4">
            These images will be securely stored in my medical record and will not be shared or used
            for any external purpose without my written consent.
          </Typography>
        </Grid>

        <Grid size={12}>
          <Typography variant="bodyMedium4">
            To cancel or reschedule, contact us 24 hours in advance at +1-(111)-111-1111 or online
            at {}
            <Link href="https://oladigital.health/" target="_blank" color="Primary.main">
              www.olaehr.com
            </Link>
            . Your cooperation helps us serve you better. Thank you for choosing Ola EHR.
          </Typography>
        </Grid>
      </Grid>
      <Grid container sx={{ p: 2 }}>
        <Grid size={12} display="flex" flexDirection="row" gap={2}>
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
                        buttonLabel="Add Signature"
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
            <CustomLabel label={templateConstants.PATIENT_NAME} />
            <Controller
              name="patientName"
              control={control}
              render={({ field }) => (
                <CustomInput
                  {...field}
                  value={field.value}
                  readonly={formStatus === 'SUBMITTED'}
                  onChange={e => field.onChange(e.target.value)}
                  placeholder={templateConstants.ENTER_NAME}
                />
              )}
            />
          </Grid>

          <Grid size={3}>
            <CustomLabel label={templateConstants.RELATIONSHIP_TO_PATIENT} />
            <Controller
              name="relationshipToPatient"
              control={control}
              render={({ field }) => (
                <CustomSelect
                  items={RelationshipList}
                  value={field.value}
                  readonly={formStatus === 'SUBMITTED'}
                  onChange={field.onChange}
                  placeholder={templateConstants.SELECT_RELATIONSHIP_TO_PATIENT}
                />
              )}
            />
          </Grid>

          <Grid size={3}>
            <CustomLabel label="Date" />
            <Controller
              name="date"
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
    </Box>
  );
};

export default TreatPhotoConsent;
