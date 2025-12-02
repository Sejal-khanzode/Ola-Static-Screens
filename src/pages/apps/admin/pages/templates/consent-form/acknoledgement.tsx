import { Grid, Typography } from '@mui/material';
import { useForm, Controller, useWatch } from 'react-hook-form';
import CustomDatePicker from 'src/components/core/reusable/custom-date-picker/custom-date-picker';
import CustomInput from 'src/components/core/reusable/custom-input/custom-input';
import CustomLabel from 'src/components/core/reusable/custom-label/custom-label';
import { RelationshipList } from 'src/constants/formConst';
import CustomSelect from 'src/components/core/reusable/custom-select/custom-select';
import CustomContactInput from 'src/components/core/reusable/custom-contact-input/custom-contact-field';
import SignatureComponent from 'src/components/core/reusable/signature-component';
import useAuthority from 'src/hooks/use-authority';
import { templateConstants } from 'src/constants/setting-constants';
import { getCurrentDate } from 'src/constants/date-format';
import { useEffect, useState, useCallback } from 'react';
import { RootState } from 'src/redux/store';
import { useSelector } from 'react-redux';
import { useDebouncedCallback } from 'use-debounce';
import { useQuery } from '@tanstack/react-query';
import { PatientControllerService } from 'src/sdk/requests';
import { useAppDispatch } from 'src/redux/hooks';
import { hideLoader, showLoader } from 'src/redux/reducers/loaderReducer';

let globalRefetchSignFunction: (() => void) | null = null;
export const setglobalRefetchSignFunction = (refetchFn: () => void) => {
  globalRefetchSignFunction = refetchFn;
};
export const getglobalRefetchSignFunction = () => globalRefetchSignFunction;

export interface AcknoledgementOfDisclosureData {
  patientSignature: string;
  date: string;
  relationship: string;
  name: string;
  phoneNumber: string;
  hasSigned: boolean;
}

interface AcknoledgementProps {
  onChangeData?: (data: AcknoledgementOfDisclosureData) => void;
  formStatus?: string;
  data?: AcknoledgementOfDisclosureData | null;
}

const Acknoledgement = ({ onChangeData, data, formStatus }: AcknoledgementProps) => {
  const [loadedDataRef, setLoadedDataRef] = useState<any>(null);
  const [showSignature, setShowSignature] = useState(false);

  const { control, setValue, getValues, watch } = useForm<AcknoledgementOfDisclosureData>({
    defaultValues: {
      patientSignature: '',
      date: getCurrentDate(),
      relationship: 'SELF',
      name: '',
      phoneNumber: '',
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

  useEffect(() => {
    if (data && data !== loadedDataRef) {
      if (data?.patientSignature !== undefined) {
        setValue('patientSignature', data?.patientSignature, { shouldDirty: false });
      }
      if (data?.relationship !== undefined) {
        setValue('relationship', data?.relationship, { shouldDirty: false });
      }
      if (data?.name !== undefined) {
        setValue('name', data?.name, { shouldDirty: false });
      }
      if (data?.date !== undefined) {
        setValue('date', data?.date, { shouldDirty: false });
      }
      if (data?.phoneNumber !== undefined) {
        setValue('phoneNumber', data?.phoneNumber, { shouldDirty: false });
      }
      if (sign) {
        setValue('hasSigned', true, { shouldDirty: false });
      }
      setLoadedDataRef(data);
    }
  }, [data, loadedDataRef]);

  useEffect(() => {
    if (data === null) {
      setValue('patientSignature', '', { shouldDirty: false });
      setValue('name', '', { shouldDirty: false });
      setValue('relationship', 'SELF', { shouldDirty: false });
      setValue('date', getCurrentDate(), { shouldDirty: false });
      setValue('hasSigned', false, { shouldDirty: false });
    }
  }, [data]);

  useEffect(() => {
    if (isPatientPortal && userProfile && !getValues('name')) {
      const fullName = `${userProfile?.firstName} ${userProfile?.lastName}`;
      setValue('name', fullName, { shouldDirty: false });
    }
  }, [isPatientPortal, userProfile, getValues]);

  const formValues = useWatch({ control });

  const debouncedChange = useDebouncedCallback((values: AcknoledgementOfDisclosureData) => {
    onChangeData?.(values);
  }, 400);

  const handleSignatureSave = useCallback((signatureData: string) => {
    setValue('patientSignature', signatureData);
    setShowSignature(true);
  }, []);

  useEffect(() => {
    debouncedChange(formValues as AcknoledgementOfDisclosureData);
  }, [formValues, debouncedChange]);

  useEffect(() => {
    if (isPending) {
      dispatch(showLoader());
    } else {
      dispatch(hideLoader());
    }
  }, [isPending]);

  const currentSignature = watch('patientSignature');

  return (
    <Grid container padding={1} paddingLeft={2} gap={1} mb={2}>
      <Grid size={12} spacing={1}>
        <Grid size={12} sx={{ mb: 2 }}>
          <Typography variant="bodyMedium4" sx={{ mb: 3, lineHeight: 1.6 }}>
            I certify that I was offered a copy of Ola EHR's Notice of Privacy Practices. The Notice
            of Privacy Practices describes the types and uses and disclosures of my PHI that might
            occur in my treatment, payment of my bills or in the performance of Ola EHR's health
            care operations. The notice of Privacy Practices also describes my rights and Ola EHR's
            duties with respect to my PHI. The Notice of Privacy Practices is also posted in the
            reception area.{' '}
          </Typography>
        </Grid>

        <Grid size={12}>
          <Typography variant="bodyMedium4" sx={{ mb: 3, lineHeight: 1.6 }}>
            Ola EHR reserves the right to change the privacy practices that are described in the
            Notice of Privacy Practices. I may obtain a revised Notice of Privacy Practices by
            calling the office and requesting a revised copy by sent in the mail or asking for one
            at the time of my next appointments.
          </Typography>
        </Grid>
      </Grid>

      <Grid size={12} sx={{ mb: 2 }}>
        <Grid container spacing={4}>
          <Grid size={3}>
            <CustomLabel label={templateConstants.PATIENT_NAME} />
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <CustomInput
                  {...field}
                  value={field.value}
                  onChange={e => field.onChange(e.target.value)}
                  placeholder={templateConstants.ENTER_NAME}
                  readonly={formStatus === 'SUBMITTED'}
                />
              )}
            />
          </Grid>

          <Grid size={3}>
            <CustomLabel label={templateConstants.RELATIONSHIP_TO_PATIENT} />
            <Controller
              name="relationship"
              control={control}
              render={({ field }) => (
                <CustomSelect
                  items={RelationshipList}
                  value={field.value || 'SELF'}
                  onChange={field.onChange}
                  placeholder={templateConstants.SELECT_RELATIONSHIP_TO_PATIENT}
                  readonly={formStatus === 'SUBMITTED'}
                />
              )}
            />
          </Grid>

          <Grid size={3}>
            <CustomLabel label={templateConstants.PHONE_NUMBER} />
            <Controller
              name="phoneNumber"
              control={control}
              render={({ field }) => (
                <CustomContactInput
                  {...field}
                  value={field.value}
                  readonly={formStatus === 'SUBMITTED'}
                  onChange={value => field.onChange(value)}
                  placeholder={templateConstants.ENTER_PHONE_NUMBER}
                />
              )}
            />
          </Grid>
          <Grid size={3}>
            <CustomLabel label={templateConstants.DATE} />
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

      <Grid size={12}>
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
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Acknoledgement;
