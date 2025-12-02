import CustomLabel from 'src/components/core/reusable/custom-label/custom-label';
import { addPatientConstants } from 'src/constants/patients-constants';
import { Grid } from '@mui/material';
import { Controller, Control, FieldErrors, useWatch, UseFormSetValue } from 'react-hook-form';
import { PatientInsurance, PatientClinic } from 'src/sdk/requests';
import CustomInput from 'src/components/core/reusable/custom-input/custom-input';
import CustomDatePicker from 'src/components/core/reusable/custom-date-picker/custom-date-picker';
import { RelationshipList } from 'src/constants/formConst';
import { InsurancePayerControllerService } from 'src/sdk/requests';
import { useQuery } from '@tanstack/react-query';
import CustomSelect from 'src/components/core/reusable/custom-select/custom-select';
import CustomImageUpload from 'src/components/core/reusable/image-upload/custom-image-upload';
import CustomAutoComplete from 'src/components/core/reusable/custom-auto-complete/custom-auto-complete';
import { useEffect, useState } from 'react';

interface InsuranceProps {
  insuranceType: 'PRIMARY' | 'SECONDARY';
  patientInsurances: PatientInsurance[];
  control: Control<PatientClinic>;
  errors: FieldErrors<PatientClinic>;
  isSubmitted: boolean;
  insuranceIndex: number;
  watch?: string;
  setValue: UseFormSetValue<PatientClinic>;
}

const Insurance = ({
  control,
  errors,
  isSubmitted,
  insuranceIndex,
  setValue,
  patientInsurances,
}: InsuranceProps) => {
  const [searchText, setSearchText] = useState('');
  const [insuranceList, setInsuranceList] = useState<{ key: string; value: string }[]>([]);

  const relationship = useWatch({
    control,
    name: `patientInsurances.${insuranceIndex}.insuredRelationshipWithPatient`,
  });

  const { data: insurancePayers } = useQuery({
    queryKey: ['insurancePayers', searchText],
    queryFn: () =>
      InsurancePayerControllerService.getApiMasterInsurancePayers({
        page: 0,
        ...(searchText && { searchString: searchText }),
      }),
  });

  const handleFrontImageUpload = (image: string | ArrayBuffer | null) => {
    if (!image) return;
    const reader = new FileReader();
    reader.onload = () => {
      setValue(`patientInsurances.${insuranceIndex}.frontPhoto`, image as string);
    };
  };

  const handleBackImageUpload = (image: string | ArrayBuffer | null) => {
    if (!image) return;
    const reader = new FileReader();
    reader.onload = () => {
      setValue(`patientInsurances.${insuranceIndex}.backPhoto`, image as string);
    };
  };

  const handleInputChange = (inputValue: any) => {
    if (inputValue?.length > 2) {
      setSearchText(inputValue);
    } else if (inputValue === '' || !inputValue) {
      setSearchText('');
    }
  };

  useEffect(() => {
    const apiData = Array.isArray(insurancePayers?.data?.content)
      ? insurancePayers?.data?.content?.map((ele: any) => ({
          key: ele?.payerId,
          value: ele?.payerName,
        }))
      : [];
    const uniqueNewInsuranceOptions = apiData?.filter(
      newInsurance =>
        !insuranceList?.some(existingInsurance => existingInsurance.key === newInsurance.key)
    );

    setInsuranceList(prevOptions => [...prevOptions, ...uniqueNewInsuranceOptions]);
  }, [insurancePayers]);

  // Add existing insurance payer to the list if not present
  useEffect(() => {
    if (patientInsurances && patientInsurances[insuranceIndex]) {
      const currentInsurance = patientInsurances[insuranceIndex];
      const insurancePayer = currentInsurance?.insurancePayer;

      if (insurancePayer?.payerId && insurancePayer?.payerName) {
        const payerId = insurancePayer?.payerId;
        const payerName = insurancePayer?.payerName;

        setInsuranceList(prev => {
          const existsInList = prev.some(item => item.key === payerId);

          if (!existsInList) {
            return [
              ...prev,
              {
                key: payerId,
                value: payerName,
              },
            ];
          }
          return prev;
        });
      }
    }
  }, [patientInsurances, insuranceIndex]);

  return (
    <Grid container spacing={1} mt={1.5} display="flex" flexDirection="column" gap={2}>
      <Grid size={12} display="flex" flexDirection="row" gap={2}>
        {/* <Grid size={2}>
          <CustomLabel label={addPatientConstants.INSURANCE_TYPE} isRequired />
          <Controller
            name={`patientInsurances.${insuranceIndex}.insuranceType`}
            control={control}
            render={({ field }) => (
              <CustomSelect
                placeholder={addPatientConstants.SELECT_INSURANCE_TYPE}
                bgWhite
                items={insuranceTypeList}
                isDisabled
                {...field}
                value={insuranceType}
                hasError={
                  isSubmitted && !!errors.patientInsurances?.[insuranceIndex]?.insuranceType
                }
                errorMessage={
                  isSubmitted
                    ? errors.patientInsurances?.[insuranceIndex]?.insuranceType?.message
                    : ''
                }
              />
            )}
          />
        </Grid> */}
        <Grid size={4}>
          <CustomLabel label={addPatientConstants.INSURANCE_NAME} isRequired />
          <Controller
            name={`patientInsurances.${insuranceIndex}.insurancePayer`}
            control={control}
            render={({ field }) => (
              <CustomAutoComplete
                placeholder={addPatientConstants.ENTER_INSURANCE_NAME}
                bgWhite
                options={insuranceList}
                value={field.value?.payerId || ''}
                onChange={selectedVal => {
                  const selectedPayer = Array.isArray(insurancePayers?.data?.content)
                    ? insurancePayers?.data?.content?.find(
                        (payer: any) => payer.payerId === selectedVal
                      )
                    : undefined;
                  setValue(`patientInsurances.${insuranceIndex}.insurancePayer`, selectedPayer, {
                    shouldValidate: true,
                  });
                }}
                hasError={
                  isSubmitted &&
                  !!errors.patientInsurances?.[insuranceIndex]?.insurancePayer?.payerName
                }
                errorMessage={
                  isSubmitted
                    ? errors.patientInsurances?.[insuranceIndex]?.insurancePayer?.payerName?.message
                    : ''
                }
                onInputChange={handleInputChange}
                autoname={`patientInsurances.${insuranceIndex}.insurancePayer`}
              />
            )}
          />
        </Grid>
        <Grid size={4}>
          <CustomLabel label={addPatientConstants.MEMBER_ID} isRequired />
          <Controller
            name={`patientInsurances.${insuranceIndex}.memberId`}
            control={control}
            render={({ field }) => (
              <CustomInput
                placeholder={addPatientConstants.ENTER_MEMBER_ID}
                bgWhite
                {...field}
                hasError={!!errors.patientInsurances?.[insuranceIndex]?.memberId}
                errorMessage={errors.patientInsurances?.[insuranceIndex]?.memberId?.message}
              />
            )}
          />
        </Grid>
        <Grid size={4}>
          <CustomLabel label={addPatientConstants.GROUP_ID} />
          <Controller
            name={`patientInsurances.${insuranceIndex}.groupId`}
            control={control}
            render={({ field }) => (
              <CustomInput
                placeholder={addPatientConstants.ENTER_GROUP_ID}
                bgWhite
                {...field}
                hasError={!!errors.patientInsurances?.[insuranceIndex]?.groupId}
                errorMessage={errors.patientInsurances?.[insuranceIndex]?.groupId?.message}
              />
            )}
          />
        </Grid>
      </Grid>
      <Grid size={12} display="flex" flexDirection="row" gap={2}>
        <Grid size={4}>
          <CustomLabel label={addPatientConstants.START_DATE} isRequired />
          <Controller
            name={`patientInsurances.${insuranceIndex}.effectiveStartDate`}
            control={control}
            render={({ field }) => (
              <CustomDatePicker
                {...field}
                value={field.value || ''}
                disableFuture
                handleDateChange={(date: string) => field.onChange(date)}
                hasError={
                  isSubmitted && !!errors.patientInsurances?.[insuranceIndex]?.effectiveStartDate
                }
                errorMessage={
                  isSubmitted
                    ? errors.patientInsurances?.[insuranceIndex]?.effectiveStartDate?.message
                    : ''
                }
              />
            )}
          />
        </Grid>
        <Grid size={4}>
          <CustomLabel label={addPatientConstants.END_DATE} isRequired />
          <Controller
            name={`patientInsurances.${insuranceIndex}.effectiveEndDate`}
            control={control}
            render={({ field }) => (
              <CustomDatePicker
                {...field}
                value={field.value || ''}
                disablePast
                handleDateChange={(date: string) => field.onChange(date)}
                hasError={
                  isSubmitted && !!errors.patientInsurances?.[insuranceIndex]?.effectiveEndDate
                }
                errorMessage={
                  isSubmitted
                    ? errors.patientInsurances?.[insuranceIndex]?.effectiveEndDate?.message
                    : ''
                }
              />
            )}
          />
        </Grid>
        <Grid size={4}>
          <CustomLabel label={addPatientConstants.RELATIONSHIP_WITH_PATIENT} isRequired />
          <Controller
            name={`patientInsurances.${insuranceIndex}.insuredRelationshipWithPatient`}
            control={control}
            render={({ field }) => (
              <CustomSelect
                placeholder={addPatientConstants.SELECT_RELATIONSHIP}
                bgWhite
                items={RelationshipList.map(item => ({
                  value: item.value,
                  label: item.label,
                }))}
                {...field}
                value={field.value || ''}
                hasError={
                  !!errors.patientInsurances?.[insuranceIndex]?.insuredRelationshipWithPatient
                }
                errorMessage={
                  errors.patientInsurances?.[insuranceIndex]?.insuredRelationshipWithPatient
                    ?.message
                }
              />
            )}
          />
        </Grid>
      </Grid>

      <Grid size={12} display="flex" flexDirection="row" gap={2}>
        {relationship !== 'SELF' && (
          <>
            <Grid size={4}>
              <CustomLabel label={addPatientConstants.SUBSCRIBER_FIRST_NAME} isRequired />
              <Controller
                name={`patientInsurances.${insuranceIndex}.subscriberFirstName`}
                control={control}
                render={({ field }) => (
                  <CustomInput
                    placeholder={addPatientConstants.ENTER_FIRST_NAME}
                    bgWhite
                    {...field}
                    hasError={!!errors.patientInsurances?.[insuranceIndex]?.subscriberFirstName}
                    errorMessage={
                      errors.patientInsurances?.[insuranceIndex]?.subscriberFirstName?.message
                    }
                  />
                )}
              />
            </Grid>
            <Grid size={4}>
              <CustomLabel label={addPatientConstants.SUBSCRIBER_LAST_NAME} isRequired />
              <Controller
                name={`patientInsurances.${insuranceIndex}.subscriberLastName`}
                control={control}
                render={({ field }) => (
                  <CustomInput
                    placeholder={addPatientConstants.ENTER_LAST_NAME}
                    bgWhite
                    {...field}
                    hasError={!!errors.patientInsurances?.[insuranceIndex]?.subscriberLastName}
                    errorMessage={
                      errors.patientInsurances?.[insuranceIndex]?.subscriberLastName?.message
                    }
                  />
                )}
              />
            </Grid>
            <Grid size={4}>
              <CustomLabel label={addPatientConstants.SUBSCRIBER_DATE_OF_BIRTH} isRequired />
              <Controller
                name={`patientInsurances.${insuranceIndex}.subscriberBirthDate`}
                control={control}
                render={({ field }) => (
                  <CustomDatePicker
                    {...field}
                    value={field.value || ''}
                    disableFuture
                    handleDateChange={(date: string) => field.onChange(date)}
                    hasError={!!errors.patientInsurances?.[insuranceIndex]?.subscriberBirthDate}
                    errorMessage={
                      errors.patientInsurances?.[insuranceIndex]?.subscriberBirthDate?.message
                    }
                  />
                )}
              />
            </Grid>
          </>
        )}
      </Grid>

      <Grid size={12} display="flex" flexDirection="row" pb={1}>
        <Grid display="flex" flexDirection="row" gap={2}>
          <Grid size={6}>
            <Controller
              name={`patientInsurances.${insuranceIndex}.frontPhoto`}
              control={control}
              render={({ field }) => (
                <CustomImageUpload
                  {...field}
                  text={addPatientConstants.UPLOAD_FRONT_VIEW}
                  customStyle={{ width: '240px', height: '140px' }}
                  handleSetImage={image => {
                    field.onChange(image);
                    handleFrontImageUpload(image);
                  }}
                  imageUrl={field.value}
                  onRemoveImage={() => {
                    field.onChange(null);
                    handleFrontImageUpload(null);
                  }}
                />
              )}
            />
          </Grid>
          <Grid size={6}>
            <Controller
              name={`patientInsurances.${insuranceIndex}.backPhoto`}
              control={control}
              render={({ field }) => (
                <CustomImageUpload
                  {...field}
                  text={addPatientConstants.UPLOAD_BACK_VIEW}
                  customStyle={{ width: '240px', height: '140px' }}
                  handleSetImage={image => {
                    field.onChange(image);
                    handleBackImageUpload(image);
                  }}
                  imageUrl={field.value}
                  onRemoveImage={() => {
                    field.onChange(null);
                    handleBackImageUpload(null);
                  }}
                />
              )}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Insurance;
