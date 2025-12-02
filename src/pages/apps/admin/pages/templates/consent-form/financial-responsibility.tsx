import { Grid, Typography } from '@mui/material';
import { Controller, useForm, useWatch } from 'react-hook-form';
import CustomDatePicker from 'src/components/core/reusable/custom-date-picker/custom-date-picker';
import CustomInput from 'src/components/core/reusable/custom-input/custom-input';
import CustomLabel from 'src/components/core/reusable/custom-label/custom-label';
import CustomSelect from 'src/components/core/reusable/custom-select/custom-select';
import { RelationshipList } from 'src/constants/formConst';
import SignatureComponent from 'src/components/core/reusable/signature-component';
import useAuthority from 'src/hooks/use-authority';
import { templateConstants } from 'src/constants/setting-constants';
import { getCurrentDate } from 'src/constants/date-format';
import { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { useDebouncedCallback } from 'use-debounce';
import { useQuery } from '@tanstack/react-query';
import { PatientControllerService } from 'src/sdk/requests';
import { hideLoader, showLoader } from 'src/redux/reducers/loaderReducer';
import { useAppDispatch } from 'src/redux/hooks';

export interface FinancialResponsibilityData {
  patientSignature: string;
  relationshipToPatient: string;
  name: string;
  date: string;
  hasSigned: boolean;
}

interface FinancialResponsibilityProps {
  onChangeData?: (data: FinancialResponsibilityData) => void;
  formStatus?: string;
  data?: FinancialResponsibilityData | null;
}

const FinancialResponsibility = ({
  onChangeData,
  formStatus,
  data,
}: FinancialResponsibilityProps) => {
  const [hasLoadedInitialData, setHasLoadedInitialData] = useState(false);
  const [showSignature, setShowSignature] = useState(false);
  const dispatch = useAppDispatch();
  const { control, setValue, getValues } = useForm<FinancialResponsibilityData>({
    defaultValues: {
      patientSignature: '',
      relationshipToPatient: 'SELF',
      name: '',
      date: getCurrentDate(),
      hasSigned: false,
    },
  });

  const userProfile = useSelector((state: RootState) => state.userProfileReducer.userProfile);
  const { isPatientPortal } = useAuthority();
  const currentSignature = getValues('patientSignature');

  const { data: getSignature, isPending } = useQuery({
    queryKey: ['patientSignature', userProfile?.uuid],
    enabled: !!userProfile?.uuid,
    queryFn: () =>
      PatientControllerService.getApiMasterPatientByPatientIdSignature({
        patientId: userProfile?.uuid as string,
      }),
  });

  const sign = getSignature?.data?.signature;

  const formValues = useWatch({ control });

  const debouncedChange = useDebouncedCallback((values: FinancialResponsibilityData) => {
    onChangeData?.(values);
  }, 400);

  useEffect(() => {
    if (data && !hasLoadedInitialData) {
      if (data?.patientSignature !== undefined) {
        setValue('patientSignature', data?.patientSignature, { shouldDirty: false });
      }
      if (data?.relationshipToPatient !== undefined) {
        setValue('relationshipToPatient', data?.relationshipToPatient, { shouldDirty: false });
      }
      if (data?.name !== undefined) {
        setValue('name', data?.name, { shouldDirty: false });
      }
      if (data?.date !== undefined) {
        setValue('date', data?.date, { shouldDirty: false });
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
      setValue('relationshipToPatient', 'SELF', { shouldDirty: false });
      setValue('name', '', { shouldDirty: false });
      setValue('date', getCurrentDate(), { shouldDirty: false });
      setValue('hasSigned', false, { shouldDirty: false });
      setShowSignature(false);
      setHasLoadedInitialData(false);
    }
  }, [data]);

  useEffect(() => {
    if (isPatientPortal && userProfile && !getValues('name')) {
      const fullName = `${userProfile?.firstName} ${userProfile?.lastName}`;
      setValue('name', fullName, { shouldDirty: false });
    }
  }, [isPatientPortal, userProfile, getValues]);

  useEffect(() => {
    debouncedChange(formValues as FinancialResponsibilityData);
  }, [formValues, debouncedChange]);

  const handleSignatureSave = useCallback((signatureData: string) => {
    setValue('patientSignature', signatureData);
    setShowSignature(true);
  }, []);

  useEffect(() => {
    if (isPending) {
      dispatch(showLoader());
    } else {
      dispatch(hideLoader());
    }
  }, [isPending]);

  return (
    <Grid sx={{ width: '100%', overflowY: 'auto', paddingBottom: 2, gap: 2, mb: 2 }}>
      <Grid container sx={{ padding: 1, paddingLeft: 2, gap: 2 }}>
        <Grid size={12}>
          <Typography variant="bodyMedium4" sx={{ mb: 3, lineHeight: 1.6 }}>
            I understand that I am responsible for paying my co-payments and deductibles at the time
            of service. I also understand that I am responsible for any balance due after payment by
            my insurance company.
          </Typography>
        </Grid>

        <Grid size={12}>
          <Typography variant="bodyMedium4" sx={{ mb: 3, lineHeight: 1.6 }}>
            I, the undersigned, understand that Ola EHR will bill my insurance company for services
            rendered upon verification of coverage by my insurance company. If my insurance company
            fails to render payment for services rendered, I hereby personally guarantee payment for
            my medical care and services rendered. If your insurance company does not remit payment
            within 60 days, the balance will be due in full.
          </Typography>
        </Grid>
        <Grid size={12}>
          <Typography variant="bodyMedium4">
            I hereby request that my insurance carrier make payment directly to Ola EHR for all
            services rendered by this facility. If my current policy prohibits direct payment to Ola
            EHR, I hereby instruct and direct my insurance company to make the check out in my name
            but send the check to the listed address of Ola EHR.
          </Typography>
        </Grid>
        <Grid size={12}>
          <Typography variant="bodyMedium4">
            If my insurance carrier makes a payment to me, I agree to immediately pay over these
            funds to Ola EHR. I also authorize Ola EHR to deposit checks received on my account when
            made out to me.
          </Typography>
        </Grid>
        <Grid size={12}>
          <Typography variant="bodyMedium4">
            I understand and agree that if I fail to make any of the payments for which I am
            responsible in a timely manner, I will be responsible for all the costs of collecting
            monies owed, including court costs, collection agency fees and attorney fees.
          </Typography>
        </Grid>
        <Grid size={12}>
          <Typography variant="bodyMedium4">
            Charges related to Worker’s Compensation injury shall be forwarded to the Worker’s
            Compensation insurance carrier. However, be advised if you claim Worker’s Compensation
            benefits and are subsequently denied such benefits, you will be held responsible for the
            total amount of charges for services rendered to you.{' '}
          </Typography>
        </Grid>
        <Grid size={12}>
          <Typography variant="bodyMedium4">
            I, the undersigned, acknowledge that by signing this form I am authorizing Ola EHR to
            submit charges via mail or internet to my insurance carrier. This is a “signature on
            file” authorization.
          </Typography>
        </Grid>

        <Grid size={12}>
          <Typography variant="bodyMedium4">
            Patient recognizes that policy quotes are not a guarantee of payment by my carrier and
            the patient is responsible for obtaining actual policy benefits, limits from the carrier
            and if needed any referrals from primary care physicians or pre- authorization for
            chiropractic treatment. Patients are responsible for confirming
            referrals/pre-authorization with insurance. All referrals or recommendations from our
            office have no confirmation of payment or benefits to referring providers.
          </Typography>
        </Grid>

        <Grid size={12}>
          <Typography variant="bodyMedium4">
            I authorize my healthcare provider and/or entity authorized by my healthcare provider,
            including those using automated dialing systems, automated messages, email, text
            messaging, or other electronic communication to contact me for any reason by any
            telephone number, email address and/or mailing address provided. I authorize all my
            numbers that I have provided to the office in my file to be able to accept phone and/or
            text messages. I authorize stating a detailed message to all phone numbers I have given
            to Ola EHR.{' '}
          </Typography>
        </Grid>

        <Grid size={12}>
          <Typography variant="bodyMedium4">
            The patient, a legal guardian or parent (if the patient is under 18 years old) will be
            responsible for the co-payment and the deductible at the time of service.
          </Typography>
        </Grid>

        <Grid size={12}>
          <strong style={{ fontWeight: '700', fontFamily: 'sans-serif', fontSize: '14px' }}>
            I have read and understand the Financial Responsibilities/Assignment of Benefits and
            agree to its terms.
          </strong>
        </Grid>
      </Grid>

      <Grid container sx={{ p: 2 }}>
        <Grid size={12} display="flex" flexDirection="row" gap={4}>
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
              name="name"
              control={control}
              render={({ field }) => (
                <CustomInput
                  {...field}
                  placeholder={templateConstants.ENTER_NAME}
                  value={
                    isPatientPortal
                      ? `${userProfile?.firstName} ${userProfile?.lastName}`
                      : field.value
                  }
                  readonly={formStatus === 'SUBMITTED'}
                  onChange={e => field.onChange(e.target.value)}
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
                  value={field.value || 'SELF'}
                  onChange={field.onChange}
                  placeholder={templateConstants.SELECT_RELATIONSHIP_TO_PATIENT}
                  readonly={formStatus === 'SUBMITTED'}
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
  );
};

export default FinancialResponsibility;
