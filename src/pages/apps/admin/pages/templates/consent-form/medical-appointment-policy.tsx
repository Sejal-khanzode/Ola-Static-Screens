import { Grid, Typography, Box } from '@mui/material';
import { useForm, Controller, useWatch } from 'react-hook-form';
import CustomLabel from 'src/components/core/reusable/custom-label/custom-label';
import { RelationshipList } from 'src/constants/formConst';
import CustomSelect from 'src/components/core/reusable/custom-select/custom-select';
import CustomDatePicker from 'src/components/core/reusable/custom-date-picker/custom-date-picker';
import CustomInput from 'src/components/core/reusable/custom-input/custom-input';
import SignatureComponent from 'src/components/core/reusable/signature-component';
import { templateConstants } from 'src/constants/setting-constants';
import useAuthority from 'src/hooks/use-authority';
import { getCurrentDate } from 'src/constants/date-format';
import { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { useDebouncedCallback } from 'use-debounce';
import { PatientControllerService } from 'src/sdk/requests';
import { useQuery } from '@tanstack/react-query';
import { useAppDispatch } from 'src/redux/hooks';
import { hideLoader, showLoader } from 'src/redux/reducers/loaderReducer';

export interface MedicalFormData {
  patientSignature: string;
  relationshipToPatient: string;
  patientName: string;
  date: string;
  hasSigned?: boolean;
}

interface MedicalAppointmentCancellationProps {
  onChangeData?: (data: MedicalFormData) => void;
  formStatus?: string;
  data?: MedicalFormData | null;
}

const MedicalAppointmentCancellation = ({
  onChangeData,
  formStatus,
  data,
}: MedicalAppointmentCancellationProps) => {
  const [loadedDataRef, setLoadedDataRef] = useState<any>(null);
  const [showSignature, setShowSignature] = useState(false);
  const dispatch = useAppDispatch();

  const { control, setValue, getValues, watch } = useForm<MedicalFormData>({
    defaultValues: {
      patientSignature: '',
      patientName: '',
      relationshipToPatient: 'SELF',
      date: getCurrentDate(),
      hasSigned: false,
    },
  });

  const userProfile = useSelector((state: RootState) => state.userProfileReducer.userProfile);
  const { isPatientPortal } = useAuthority();

  const { data: getSignature, isPending } = useQuery({
    queryKey: ['patientSignature', userProfile?.uuid],
    enabled: !!userProfile?.uuid,
    queryFn: () =>
      PatientControllerService.getApiMasterPatientByPatientIdSignature({
        patientId: userProfile?.uuid as string,
      }),
  });

  const sign = getSignature?.data?.signature;
  const debouncedChange = useDebouncedCallback((values: MedicalFormData) => {
    onChangeData?.(values);
  }, 400);

  const handleSignatureSave = useCallback((signatureData: string) => {
    setValue('patientSignature', signatureData);
    setShowSignature(true);
  }, []);

  useEffect(() => {
    if (data && data !== loadedDataRef) {
      if (data?.patientSignature !== undefined) {
        setValue('patientSignature', data?.patientSignature, { shouldDirty: false });
      }
      if (data?.relationshipToPatient !== undefined) {
        setValue('relationshipToPatient', data?.relationshipToPatient, { shouldDirty: false });
      }
      if (data?.patientName !== undefined) {
        setValue('patientName', data?.patientName, { shouldDirty: false });
      }
      if (data?.date !== undefined) {
        setValue('date', data?.date, { shouldDirty: false });
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
    setValue('patientName', '', { shouldDirty: false });
    setValue('relationshipToPatient', 'SELF', { shouldDirty: false });
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
  }, [isPatientPortal, userProfile, setValue, getValues]);

  const formValues = useWatch({ control });

  useEffect(() => {
    debouncedChange(formValues as MedicalFormData);
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
    <Box sx={{ width: '100%', height: 'auto', overflowY: 'auto', mb: 2 }}>
      <Grid container sx={{ padding: 1, paddingLeft: 2, gap: 2 }}>
        <Grid size={12}>
          <Typography variant="bodyMedium4" sx={{ mb: 3, lineHeight: 1.6 }}>
            Thank you for trusting your medical care to Ola EHR . When you schedule an appointment
            with Ola EHR, we set aside enough time to provide you with the highest quality care.
            Should you need to cancel or reschedule an appointment please contact our office as soon
            as possible, <span style={{ fontWeight: 'bold' }}>no later than 24 hours prior </span>to
            your scheduled appointment. This gives us time to schedule other patients who may be
            waiting for an appointment.{' '}
          </Typography>

          <strong style={{ fontWeight: '700', fontFamily: 'sans-serif', fontSize: '14px' }}>
            Please see our Appointment Cancellation/No Show Policy below:{' '}
          </strong>
        </Grid>

        <Grid size={12} sx={{ gap: 2 }}>
          <Grid size={12} display={'flex'} alignItems={'center'} gap={1}>
            <Box bgcolor={'Primary.main'} height={8} width={8} borderRadius={1}></Box>
            <Grid size={12}>
              <Typography variant="bodyMedium4" sx={{ lineHeight: 1.6 }}>
                Any established patient who fails to show or cancels/reschedules an appointment and
                has not contacted our office{' '}
                <strong style={{ fontWeight: '700', fontFamily: 'sans-serif', fontSize: '14px' }}>
                  at least 24-hour notice
                </strong>{' '}
                will be considered a No Show.
              </Typography>
            </Grid>
          </Grid>
          <Grid size={12} display={'flex'} alignItems={'center'} gap={1}>
            <Box bgcolor={'Primary.main'} height={8} width={8} borderRadius={1}></Box>
            <Grid size={12}>
              <Typography variant="bodyMedium4" sx={{ mb: 3, lineHeight: 1.6 }}>
                On the first occurrence, you will be given a warning{' '}
              </Typography>
            </Grid>
          </Grid>
          <Grid size={12} gap={1}>
            <Grid size={12} display={'flex'} alignItems={'center'} gap={1}>
              <Box bgcolor={'Primary.main'} height={8} width={8} borderRadius={1}></Box>
              <Grid size={12}>
                <Typography variant="bodyMedium4" sx={{ mb: 3, lineHeight: 1.6 }}>
                  From the second occurrence you will be charged a{' '}
                  <strong style={{ fontWeight: '700', fontFamily: 'sans-serif', fontSize: '14px' }}>
                    $45.00 fee.
                  </strong>{' '}
                </Typography>
              </Grid>
            </Grid>
            <Grid size={12} paddingLeft={2}>
              <strong style={{ fontWeight: '700', fontFamily: 'sans-serif', fontSize: '14px' }}>
                If a fourth No Show or cancellation/reschedule without a 24-hour notice should occur
                the patient will no longer be able to schedule appointments in advance. You will be
                seen on a walk-in basis.
              </strong>
            </Grid>
          </Grid>
          <Grid size={12} display={'flex'} alignItems={'center'} gap={1}>
            <Box bgcolor={'Primary.main'} height={8} width={8} borderRadius={1}></Box>
            <Grid size={12}>
              <Typography variant="bodyMedium4" sx={{ mb: 3, lineHeight: 1.6 }}>
                Any new patient who fails to show up for their initial visit will be given one
                additional appointment. If you are again no show for the second new patient
                appointment, no further appointments will be scheduled.{' '}
              </Typography>
            </Grid>
          </Grid>
          <Grid size={12} display={'flex'} alignItems={'center'} gap={1}>
            <Box bgcolor={'Primary.main'} height={8} width={8} borderRadius={1}></Box>
            <Grid size={12}>
              <Typography variant="bodyMedium4" sx={{ mb: 3, lineHeight: 1.6 }}>
                The fee is charged to the patient, not the insurance company, and is{' '}
                <strong style={{ fontWeight: '700', fontFamily: 'sans-serif', fontSize: '14px' }}>
                  due at the time of the patient's next office visit.
                </strong>
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid size={12}>
          <Typography variant="bodyMedium4" sx={{ mb: 3, lineHeight: 1.6 }}>
            We understand there may be times when an unforeseen emergency occurs, and you may not be
            able to keep your scheduled appointment. If you should experience extenuating
            circumstances, please contact the Office Manager to discuss your situation. You may
            contact Ola EHR during normal business hours Monday through Friday. Should it be after
            regular business hours you may leave a message, and we will return your call the next
            business day.
          </Typography>
        </Grid>
        <Grid size={12}>
          <strong style={{ fontWeight: '700', fontFamily: 'sans-serif', fontSize: '14px' }}>
            I have read and understand the Medical Appointment Cancellation/No Show Policy and agree
            to its terms.
          </strong>
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
                    value={field.value || 'SELF'}
                    onChange={field.onChange}
                    readonly={formStatus === 'SUBMITTED'}
                    placeholder={templateConstants.SELECT_RELATIONSHIP_TO_PATIENT}
                    items={RelationshipList}
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
      </Grid>
    </Box>
  );
};

export default MedicalAppointmentCancellation;
