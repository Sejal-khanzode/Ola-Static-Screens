import { yupResolver } from '@hookform/resolvers/yup';
import CustomButton from 'src/components/core/reusable/custom-button/custom-button';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { Box, Grid } from '@mui/material';
import { useEffect } from 'react';
import CustomLabel from 'src/components/core/reusable/custom-label/custom-label';
import CustomInput from 'src/components/core/reusable/custom-input/custom-input';
import CustomSelect from 'src/components/core/reusable/custom-select/custom-select';
import CustomTextArea from 'src/components/core/reusable/custom-text-area/custom-textarea';
import CustomColorPicker from 'src/components/core/reusable/custom-color-picker/custom-color-picker';
import { AppointmentType, AppointmentTypeManagementService } from 'src/sdk/requests';
import { useMutation, useQuery } from '@tanstack/react-query';
import useApiFeedback from 'src/hooks/useApiFeedback';
import { useDispatch } from 'react-redux';
import { hideLoader, showLoader } from 'src/redux/reducers/loaderReducer';
import { formConstants } from 'src/constants/setting-constants';
import CustomClinicSelect from 'src/components/core/reusable/custom-clinic-select/custom-clinic-select';
import { MedicalCodeControllerService } from 'src/sdk/requests';
import { generateRandomHex } from 'src/components/core/reusable/custom-color-picker/custom-color-picker';
import { patientApptFlagSchema } from 'src/schema/flag-schema/flag-schema';

interface FormProps {
  onClose: () => void;
  isEdit: boolean;
  selectedData?: any;
  uuid?: string;
  ReftechData?: () => void;
}

const AddEditApptTypes = (props: FormProps) => {
  const { onClose, isEdit, selectedData, ReftechData } = props;
  const dispatch = useDispatch();

  const durationOptions = [
    { value: '15', label: '15' },
    { value: '30', label: '30' },
    { value: '45', label: '45' },
    { value: '60', label: '60' },
  ];

  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm<AppointmentType>({
    defaultValues: {
      title: selectedData?.title || '',
      colorCode: selectedData?.colorCode || generateRandomHex(),
      description: selectedData?.description || '',
      duration: selectedData?.duration || '',
      procedureCodes: selectedData?.procedureCodes || [],
    },
    resolver: yupResolver(patientApptFlagSchema) as any,
  });

  const watchedProcedureCodes = useWatch({
    control,
    name: 'procedureCodes',
    defaultValue: [],
  });

  const {
    mutateAsync: createAsync,
    isPending: isCreating,
    isSuccess: isSuccessCreate,
    isError: isErrorCreate,
    error: errorCreate,
    data: dataCreate,
  } = useMutation({
    mutationFn: AppointmentTypeManagementService.postApiMasterAppointmentTypes,
  });

  const {
    mutateAsync: updateAsync,
    isPending: isUpdating,
    isSuccess: isSuccessUpdate,
    isError: isErrorUpdate,
    error: errorUpdate,
    data: dataUpdate,
  } = useMutation({
    mutationFn: AppointmentTypeManagementService.putApiMasterAppointmentTypesByUuid,
  });

  const { data: procedureCodes } = useQuery({
    queryKey: ['medicalCodeData', 'CPT'],
    queryFn: () =>
      MedicalCodeControllerService.getApiMasterMedicalCodes({
        type: 'CPT',
        active: true,
        archive: false,
      }),
  });

  const { data: customCodes } = useQuery({
    queryKey: ['medicalCodeData', 'CUSTOM'],
    queryFn: () =>
      MedicalCodeControllerService.getApiMasterMedicalCodes({
        type: 'CUSTOM',
        active: true,
        archive: false,
      }),
  });

  const procedureCodesData = procedureCodes?.data?.content as any;
  const customCodesData = customCodes?.data?.content as any;

  const allCodes = [...(procedureCodesData || []), ...(customCodesData || [])];

  useEffect(() => {
    if (isEdit && selectedData) {
      reset({
        title: selectedData?.title || '',
        colorCode: selectedData.colorCode || '',
        description: selectedData?.description || '',
        duration: selectedData?.duration || '',
        procedureCodes: selectedData?.procedureCodes || [],
      });
    }
  }, [isEdit, selectedData, reset]);

  const formatAllCodes = (allCodes: any) => {
    // Filter out already selected codes
    const selectedKeys = watchedProcedureCodes || [];
    const filteredCodes = allCodes?.filter((code: any) => !selectedKeys.includes(code.code));

    return filteredCodes?.map((code: any) => ({
      key: code?.code,
      value: `${code?.code} - ${code?.description}`,
    }));
  };

  const getSelectedProcedureCodes = () => {
    if (!watchedProcedureCodes || watchedProcedureCodes.length === 0) return [];

    return watchedProcedureCodes?.map((key: string) => {
      const code = allCodes?.find((c: any) => c.code === key);
      return {
        key: key,
        value: code ? `${code?.code} - ${code?.description}` : key,
      };
    });
  };

  const handleAddProcedureCode = (codeKey: string) => {
    const currentCodes = watchedProcedureCodes || [];
    if (!currentCodes.includes(codeKey)) {
      const updatedCodes = [...currentCodes, codeKey];
      setValue('procedureCodes', updatedCodes);
    }
  };

  const handleRemoveProcedureCode = (codeKeyToRemove: string) => {
    const currentCodes = watchedProcedureCodes || [];
    const updatedCodes = currentCodes?.filter((key: string) => key !== codeKeyToRemove);
    setValue('procedureCodes', updatedCodes);
  };

  const onSubmit = async (data: any) => {
    if (isEdit) {
      await updateAsync({
        uuid: selectedData?.uuid,
        requestBody: data,
      });
    } else {
      await createAsync({ requestBody: data });
    }

    if (ReftechData) {
      ReftechData();
    }
    reset();
    onClose?.();
  };

  useApiFeedback(
    isErrorCreate,
    errorCreate,
    isSuccessCreate,
    (dataCreate?.message || 'Added Successfully') as string
  );

  useApiFeedback(
    isErrorUpdate,
    errorUpdate,
    isSuccessUpdate,
    (dataUpdate?.message || 'Updated Successfully') as string
  );

  const isPending = isCreating || isUpdating;

  useEffect(() => {
    if (isPending) {
      dispatch(showLoader());
    } else {
      dispatch(hideLoader());
    }
  }, [isPending, dispatch]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid size={12}>
          <CustomLabel label={formConstants.APPOINTMENT_TYPE} isRequired />
          <Controller
            control={control}
            name="title"
            render={({ field }) => (
              <CustomInput
                placeholder={`${formConstants.ENTER} ${formConstants.APPOINTMENT_TYPE}`}
                {...field}
                hasError={!!errors.title}
                errorMessage={errors.title?.message as string}
              />
            )}
          />
        </Grid>
        <Grid size={6}>
          <CustomLabel label={formConstants.COLOR_CODE} isRequired />
          <Controller
            control={control}
            name="colorCode"
            render={({ field }) => (
              <CustomColorPicker
                value={field.value}
                onChange={field.onChange}
                hasError={!!errors.colorCode}
                errorMessage={errors.colorCode?.message as string}
              />
            )}
          />
        </Grid>

        <Grid size={12}>
          <CustomLabel label={formConstants.DESCRIPTION} />
          <Controller
            control={control}
            name="description"
            render={({ field }) => (
              <CustomTextArea
                placeholder={`${formConstants.ENTER} ${formConstants.DESCRIPTION}`}
                {...field}
                hasError={!!errors.description}
                errorMessage={errors.description?.message as string}
                minRow={3}
              />
            )}
          />
        </Grid>

        <Grid size={12} display={'flex'} flexDirection={'row'} gap={2}>
          <Grid size={{ xs: 8 }}>
            <CustomLabel label={formConstants.PROCEDURE_CODE} />
            <Controller
              control={control}
              name="procedureCodes"
              render={({ field }) => (
                <CustomClinicSelect
                  {...field}
                  placeholder={formConstants.SELECT_CODE}
                  options={formatAllCodes(allCodes)}
                  selectedValue={getSelectedProcedureCodes()}
                  onValueAdd={handleAddProcedureCode}
                  onValueRemove={handleRemoveProcedureCode}
                  hasError={!!errors.procedureCodes}
                  errorMessage={errors.procedureCodes?.message as string}
                  noRecords
                />
              )}
            />
          </Grid>
          <Grid size={4}>
            <CustomLabel label={`${formConstants.DURATION} (mins)`} isRequired />
            <Controller
              control={control}
              name="duration"
              render={({ field }) => (
                <CustomSelect
                  placeholder={`${formConstants.SELECT} ${formConstants.DURATION}`}
                  {...field}
                  value={String(field.value)}
                  onChange={e => field.onChange(Number(e.target.value))}
                  items={durationOptions}
                  hasError={!!errors.duration}
                  errorMessage={errors.duration?.message as string}
                />
              )}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid size={{ xs: 12 }} mt={2}>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
          <CustomButton variant="outlined" onClick={onClose} label={formConstants.CANCEL} />
          <CustomButton variant="filled" label={formConstants.SAVE} type="submit" />
        </Box>
      </Grid>
    </form>
  );
};
export default AddEditApptTypes;
