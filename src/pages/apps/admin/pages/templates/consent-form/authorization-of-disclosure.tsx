import { Grid, Typography, Box, Checkbox, FormControlLabel } from '@mui/material';
import { useForm, Controller, useWatch } from 'react-hook-form';
import CustomLabel from 'src/components/core/reusable/custom-label/custom-label';
import CustomInput from 'src/components/core/reusable/custom-input/custom-input';
import CustomContactInput from 'src/components/core/reusable/custom-contact-input/custom-contact-field';
import SignatureComponent from 'src/components/core/reusable/signature-component';
import useAuthority from 'src/hooks/use-authority';
import { templateConstants } from 'src/constants/setting-constants';
import { getCurrentDate } from 'src/constants/date-format';
import { useEffect, useState, useCallback } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { RootState } from 'src/redux/store';
import { useSelector } from 'react-redux';
import { PatientControllerService } from 'src/sdk/requests';
import { useQuery } from '@tanstack/react-query';
import { useAppDispatch } from 'src/redux/hooks';
import { hideLoader, showLoader } from 'src/redux/reducers/loaderReducer';


export interface AuthorizationOfDisclosureData {
  homeTelephone: string;
  workTelephone: string;
  mobileTelephone: string;
  email: string;
  contactPreferences: {
    detailedMessageHome: boolean;
    callbackNumberHome: boolean;
    doNotContactHome: boolean;
    detailedMessageWork: boolean;
    callbackNumberWork: boolean;
    doNotContactWork: boolean;
    detailedMessageMobile: boolean;
    callbackNumberMobile: boolean;
    doNotContactMobile: boolean;
    communicateByEmail: boolean;
    contactme: boolean;
    discloseInformation: boolean;
  };
  patientSignature: string;
  signatureDate: string;
  relationshipToPatient: string;
  hasSigned?: boolean;
}

interface AuthorizationOfDisclosureProps {
  onChangeData?: (data: AuthorizationOfDisclosureData) => void;
  formStatus?: string;
  data?: AuthorizationOfDisclosureData | null;
}

const AuthorizationOfDisclosure = ({
  onChangeData,
  formStatus,
  data,
}: AuthorizationOfDisclosureProps) => {
  const [loadedDataRef, setLoadedDataRef] = useState<any>(null);
  const [showSignature, setShowSignature] = useState(false);
  const userProfile = useSelector((state: RootState) => state.userProfileReducer.userProfile);

  const { control, setValue, watch } = useForm<AuthorizationOfDisclosureData>({
    defaultValues: {
      homeTelephone: '',
      workTelephone: '',
      mobileTelephone: '',
      email: '',
      contactPreferences: {
        detailedMessageHome: false,
        callbackNumberHome: false,
        doNotContactHome: false,
        detailedMessageWork: false,
        callbackNumberWork: false,
        doNotContactWork: false,
        detailedMessageMobile: false,
        callbackNumberMobile: false,
        doNotContactMobile: false,
        communicateByEmail: false,
        contactme: false,
        discloseInformation: false,
      },
      patientSignature: '',
      signatureDate: getCurrentDate(),
      relationshipToPatient: 'SELF',
      hasSigned: false,
    },
  });

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
      if (data?.homeTelephone !== undefined) {
        setValue('homeTelephone', data?.homeTelephone, { shouldDirty: false });
      }
      if (data?.workTelephone !== undefined) {
        setValue('workTelephone', data?.workTelephone, { shouldDirty: false });
      }
      if (data.mobileTelephone !== undefined) {
        setValue('mobileTelephone', data?.mobileTelephone, { shouldDirty: false });
      }
      if (data?.email !== undefined) {
        setValue('email', data?.email, { shouldDirty: false });
      }
      if (data?.patientSignature !== undefined) {
        setValue('patientSignature', data?.patientSignature, { shouldDirty: false });
      }
      if (data?.signatureDate !== undefined) {
        setValue('signatureDate', data?.signatureDate, { shouldDirty: false });
      }
      if (data.relationshipToPatient !== undefined) {
        setValue('relationshipToPatient', data?.relationshipToPatient, { shouldDirty: false });
      }
      if (sign) {
        setValue('hasSigned', true, { shouldDirty: false });
      }

      if (data.contactPreferences !== undefined) {
        Object.keys(data.contactPreferences).forEach(key => {
          setValue(
            `contactPreferences.${key}` as any,
            data.contactPreferences[key as keyof typeof data.contactPreferences],
            { shouldDirty: false }
          );
        });
      }

      setLoadedDataRef(data);
    }
  }, [data, loadedDataRef]);

  useEffect(() => {
    if (data === null) {
      setValue('homeTelephone', '', { shouldDirty: false });
      setValue('workTelephone', '', { shouldDirty: false });
      setValue('mobileTelephone', '', { shouldDirty: false });
      setValue('email', '', { shouldDirty: false });
      setValue('contactPreferences', {
        detailedMessageHome: false,
        callbackNumberHome: false,
        doNotContactHome: false,
        detailedMessageWork: false,
        callbackNumberWork: false,  
        doNotContactWork: false,
        detailedMessageMobile: false,
        callbackNumberMobile: false,
        doNotContactMobile: false,
        communicateByEmail: false,
        contactme: false,
        discloseInformation: false,
      }, { shouldDirty: false });
      setValue('relationshipToPatient', 'SELF', { shouldDirty: false });
      setValue('patientSignature', '', { shouldDirty: false });
      setValue('signatureDate', getCurrentDate(), { shouldDirty: false });
      setValue('hasSigned', false, { shouldDirty: false });
      setShowSignature(false);
      setLoadedDataRef(null);
    }
  }, [data]);

  const formValues = useWatch({ control });

  const debouncedChange = useDebouncedCallback((values: AuthorizationOfDisclosureData) => {
    onChangeData?.(values);
  }, 400);

   const handleSignatureSave = useCallback((signatureData: string) => {
    setValue('patientSignature', signatureData);
    setShowSignature(true);
  }, []);

  useEffect(() => {
    debouncedChange(formValues as AuthorizationOfDisclosureData);
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
    <Grid container sx={{ width: '100%', height: 'auto', overflowY: 'auto', mb: 2 }}>
      <Grid size={12} sx={{ padding: 1, paddingLeft: 2, gap: 2 }}>
        <Grid size={12} gap={2} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Grid size={12}>
            <Typography variant="bodyMedium4" sx={{ mb: 3, lineHeight: 1.6 }}>
              In general, HIPPA Privacy Rules gives individuals the right to request restrictions on
              uses and disclosures of their protected health information (PHI). The individual is
              also provided with the right to request confidential communications of PHI made by
              alternative means, such as sending correspondence to the individual's office instead
              of the individual's home. The patient may revoke or change this authorization at any
              time with a written request.{' '}
            </Typography>
          </Grid>
          <Grid size={12}>
            <Typography variant="bodyBold4" sx={{ mb: 3, lineHeight: 1.6 }}>
              I wish to be contacted in the following manner (Mark all that apply):{' '}
            </Typography>
          </Grid>
        </Grid>

        <Grid size={12} mt={2} sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
          <Grid size={3} sx={{ mb: 3 }}>
            <CustomLabel label={templateConstants.HOME_TELEPHONE} />
            <Controller
              name="homeTelephone"
              control={control}
              render={({ field }) => (
                <CustomContactInput
                  {...field}
                  value={field.value}
                  readonly={formStatus === 'SUBMITTED'}
                  onChange={value => field.onChange(value)}
                  placeholder={templateConstants.ENTER_HOME_TELEPHONE}
                />
              )}
            />

            <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Controller
                name="contactPreferences.detailedMessageHome"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        {...field}
                        checked={field.value}
                        onChange={e => field.onChange(e.target.checked)}
                        size="small"
                      />
                    }
                    label="OK to leave message with detailed information."
                    sx={{ '& .MuiFormControlLabel-label': { fontSize: '14px' } }}
                  />
                )}
              />

              <Controller
                name="contactPreferences.callbackNumberHome"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        {...field}
                        checked={field.value}
                        onChange={e => field.onChange(e.target.checked)}
                        size="small"
                      />
                    }
                    label="Leave a message with call-back number only."
                    sx={{ '& .MuiFormControlLabel-label': { fontSize: '14px' } }}
                  />
                )}
              />

              <Controller
                name="contactPreferences.doNotContactHome"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        {...field}
                        checked={field.value}
                        onChange={e => field.onChange(e.target.checked)}
                        size="small"
                      />
                    }
                    label="Do not contact me at"
                    sx={{ '& .MuiFormControlLabel-label': { fontSize: '14px' } }}
                  />
                )}
              />
            </Box>
          </Grid>

          <Grid size={3} sx={{ mb: 3 }}>
            <CustomLabel label={templateConstants.WORK_TELEPHONE} />
            <Controller
              name="workTelephone"
              control={control}
              render={({ field }) => (
                <CustomContactInput
                  {...field}
                  value={field.value}
                  onChange={value => field.onChange(value)}
                  placeholder={templateConstants.ENTER_WORK_TELEPHONE}
                  readonly={formStatus === 'SUBMITTED'}
                />
              )}
            />

            <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Controller
                name="contactPreferences.detailedMessageWork"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        {...field}
                        checked={field.value}
                        onChange={e => field.onChange(e.target.checked)}
                        size="small"
                      />
                    }
                    label="OK to leave message with detailed information."
                    sx={{ '& .MuiFormControlLabel-label': { fontSize: '14px' } }}
                  />
                )}
              />

              <Controller
                name="contactPreferences.callbackNumberWork"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        {...field}
                        checked={field.value}
                        onChange={e => field.onChange(e.target.checked)}
                        size="small"
                      />
                    }
                    label="Leave a message with call-back number only."
                    sx={{ '& .MuiFormControlLabel-label': { fontSize: '14px' } }}
                  />
                )}
              />

              <Controller
                name="contactPreferences.doNotContactWork"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        {...field}
                        checked={field.value}
                        onChange={e => field.onChange(e.target.checked)}
                        size="small"
                      />
                    }
                    label="Do not contact me at"
                    sx={{ '& .MuiFormControlLabel-label': { fontSize: '14px' } }}
                  />
                )}
              />
            </Box>
          </Grid>

          <Grid size={3} sx={{ mb: 3 }}>
            <CustomLabel label={templateConstants.MOBILE_TELEPHONE} />
            <Controller
              name="mobileTelephone"
              control={control}
              render={({ field }) => (
                <CustomContactInput
                  {...field}
                  value={field.value}
                  onChange={value => field.onChange(value)}
                  placeholder={templateConstants.ENTER_MOBILE_TELEPHONE}
                  readonly={formStatus === 'SUBMITTED'}
                />
              )}
            />

            <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Controller
                name="contactPreferences.detailedMessageMobile"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        {...field}
                        checked={field.value}
                        onChange={e => field.onChange(e.target.checked)}
                        size="small"
                      />
                    }
                    label="OK to leave message with detailed information."
                    sx={{ '& .MuiFormControlLabel-label': { fontSize: '14px' } }}
                  />
                )}
              />

              <Controller
                name="contactPreferences.callbackNumberMobile"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        {...field}
                        checked={field.value}
                        onChange={e => field.onChange(e.target.checked)}
                        size="small"
                      />
                    }
                    label="Leave a message with call-back number only."
                    sx={{ '& .MuiFormControlLabel-label': { fontSize: '14px' } }}
                  />
                )}
              />

              <Controller
                name="contactPreferences.doNotContactMobile"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        {...field}
                        checked={field.value}
                        onChange={e => field.onChange(e.target.checked)}
                        size="small"
                      />
                    }
                    label="Do not contact me at"
                    sx={{ '& .MuiFormControlLabel-label': { fontSize: '14px' } }}
                  />
                )}
              />
            </Box>
          </Grid>

          <Grid size={3} sx={{ mb: 3 }}>
            <CustomLabel label="Email" />
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <CustomInput
                  {...field}
                  value={field.value}
                  onChange={e => field.onChange(e.target.value)}
                  placeholder="Enter Email"
                  readonly={formStatus === 'SUBMITTED'}
                  />
              )}
            />

            <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Controller
                name="contactPreferences.communicateByEmail"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        {...field}
                        checked={field.value}
                        onChange={e => field.onChange(e.target.checked)}
                        size="small"
                      />
                    }
                    label="OK to communicate by email"
                    sx={{ '& .MuiFormControlLabel-label': { fontSize: '14px' } }}
                  />
                )}
              />

              <Controller
                name="contactPreferences.contactme"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        {...field}
                        checked={field.value}
                        onChange={e => field.onChange(e.target.checked)}
                        size="small"
                      />
                    }
                    label="Contact me for appointment reminders"
                    sx={{ '& .MuiFormControlLabel-label': { fontSize: '14px' } }}
                  />
                )}
              />

              <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography variant="bodyMedium4">
                  In a further effort to protect your PHI, we ask that you designate below to whom
                  the physicians and staff may discuss your healthcare and scheduling needs as well
                  as billing issues that may arise.{' '}
                </Typography>
              </Box>

              <Controller
                name="contactPreferences.discloseInformation"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        {...field}
                        checked={field.value}
                        onChange={e => field.onChange(e.target.checked)}
                        size="small"
                      />
                    }
                    label="Do not disclose information to anyone"
                    sx={{ '& .MuiFormControlLabel-label': { fontSize: '14px' } }}
                  />
                )}
              />
            </Box>
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
    </Grid>
  );
};

export default AuthorizationOfDisclosure;
