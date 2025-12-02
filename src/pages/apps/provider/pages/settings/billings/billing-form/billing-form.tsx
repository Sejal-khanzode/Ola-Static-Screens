import { Box, Grid } from '@mui/material';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import CustomInput from '../../../../../../../components/core/reusable/custom-input/custom-input';
import CustomLabel from '../../../../../../../components/core/reusable/custom-label/custom-label';
import CustomSelect from '../../../../../../../components/core/reusable/custom-select/custom-select';
import CustomButton from '../../../../../../../components/core/reusable/custom-button/custom-button';
import { formConstants } from '../../../../../../../constants/setting-constants';
import CustomTextArea from 'src/components/core/reusable/custom-text-area/custom-textarea';
import { useState, useEffect } from 'react';
import { useMedicalCodeControllerServiceGetApiMasterMedicalCodes } from 'src/sdk/queries';
import { useMutation } from '@tanstack/react-query';
import useApiFeedback from 'src/hooks/useApiFeedback';
import { useDispatch } from 'react-redux';
import { hideLoader, showLoader } from 'src/redux/reducers/loaderReducer';
import { Options } from 'src/constants/options';
import CustomAutoComplete from 'src/components/core/reusable/custom-auto-complete/custom-auto-complete';
import { FeeSchedule, FeeScheduleControllerService } from 'src/sdk/requests';

const feeScheduleSchema = yup.object().shape({
  procedureCode: yup.string().required(formConstants.PROCEDURE_CODE_REQ),
  description: yup.string(),
  rate: yup
    .string()
    .required(formConstants.RATE_REQ)
    .test('is-positive', formConstants.RATE_POSITIVE, function (value) {
      if (!value) return false;
      const numValue = parseFloat(value);
      return !isNaN(numValue) && numValue > 0;
    }),
  active: yup.boolean().default(true),
});

interface FeeScheduleFormData {
  procedureCode: string;
  description: string;
  rate: string;
  active: boolean;
}

const DUMMY_STATUS = [
  { label: 'Active', value: 'true' },
  { label: 'Inactive', value: 'false' },
];

interface FeeScheduleFormProps {
  onClose: () => void;
  RefetchFeeScheduleData?: () => void;
  uuid?: string;
  isEdit: boolean;
}

const FeeScheduleForm = (props: FeeScheduleFormProps) => {
  const { onClose, isEdit, uuid, RefetchFeeScheduleData } = props;
  const dispatch = useDispatch();
  const [codeOptions, setCodeOptions] = useState<Options>([]);

  const initialValues: FeeScheduleFormData = {
    procedureCode: '',
    description: '',
    rate: '',
    active: true,
  };
  const [searchText, setsearchText] = useState('');

  const method = useForm<FeeScheduleFormData>({
    defaultValues: initialValues,
    resolver: yupResolver(feeScheduleSchema) as any,
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = method;

  const { mutateAsync: fetchFeeScheduleByIdAsync, isPending: isFetching } = useMutation({
    mutationFn: FeeScheduleControllerService.getApiMasterFeeScheduleByFeeScheduleId,
  });

  useEffect(() => {
    const fetchFeeScheduleData = async () => {
      if (isEdit && uuid) {
        try {
          const response = await fetchFeeScheduleByIdAsync({
            feeScheduleId: uuid,
          });

          if (response?.data) {
            const feeData = response.data as any;

            reset({
              procedureCode: feeData.procedureCode || '',
              description: feeData.description || '',
              rate: feeData.rate?.toString() || '',
              active: feeData.active ?? true,
            });
          }
        } catch (error) {
          console.error('Error fetching fee schedule data:', error);
        }
      }
    };

    fetchFeeScheduleData();
  }, [isEdit, uuid, fetchFeeScheduleByIdAsync, reset]);

  const { data: cptCodesData } = useMedicalCodeControllerServiceGetApiMasterMedicalCodes({
    type: 'CPT',
    searchString: searchText,
  });

  const { data: customCodesData } = useMedicalCodeControllerServiceGetApiMasterMedicalCodes({
    type: 'CUSTOM',
    searchString: searchText,
  });

  const cptCodeData = Array.isArray(cptCodesData?.data?.content)
    ? cptCodesData.data.content
    : [];
  const customCodeData = Array.isArray(customCodesData?.data?.content)
    ? customCodesData.data.content
    : [];

  const allCodes = [...cptCodeData, ...customCodeData];

  useEffect(() => {
    if (allCodes?.length) {
      const getList = allCodes
        .filter((data: any) => data?.active)
        ?.map((data: any) => ({
          key: `${data.code} - ${data.description}`,
          value: `${data.code} - ${data.description}`,
        }));

      setCodeOptions(prev => {
        const unique = getList?.filter(newItem => !prev.some(p => p.key === newItem.key));
        return unique.length ? [...prev, ...unique] : prev;
      });
    }
  }, [allCodes]);

  const {
    mutateAsync: createFeeScheduleAsync,
    isPending: isCreating,
    isSuccess: isSuccessCreate,
    isError: isErrorCreate,
    error: errorCreate,
    data: dataCreate,
  } = useMutation({
    mutationFn: FeeScheduleControllerService.postApiMasterFeeSchedule,
  });

  const {
    mutateAsync: updateFeeScheduleAsync,
    isPending: isUpdating,
    isSuccess: isSuccessUpdate,
    isError: isErrorUpdate,
    error: errorUpdate,
    data: dataUpdate,
  } = useMutation({
    mutationFn: FeeScheduleControllerService.putApiMasterFeeSchedule,
  });

  const onSubmit = async (values: FeeScheduleFormData) => {
    try {
      const feeScheduleData: FeeSchedule = {
        procedureCode: values.procedureCode,
        rate: parseFloat(values.rate),
        active: values.active,
        description: values.description,
        uuid: uuid,
      };

      if (isEdit && uuid) {
        await updateFeeScheduleAsync({
          requestBody: feeScheduleData,
        });
      } else {
        await createFeeScheduleAsync({
          requestBody: feeScheduleData,
        });
      }

      if (RefetchFeeScheduleData) {
        RefetchFeeScheduleData();
      }
      onClose();
    } catch (error) {
      console.error('Failed to submit fee schedule:', error);
    }
  };

  const handleInputChange = (inputValue: any) => {
    if (inputValue?.length > 2) {
      setsearchText(inputValue);
    }
  };

  const isPending = isCreating || isUpdating || isFetching;

  useEffect(() => {
    if (isPending) {
      dispatch(showLoader());
    } else {
      dispatch(hideLoader());
    }
  }, [isPending, dispatch]);

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

  return (
    <FormProvider {...method}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={1.5}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <CustomLabel label={formConstants.PROCEDURE_CODE} isRequired />
            <Controller
              control={control}
              name="procedureCode"
              render={({ field }) => (
                <CustomAutoComplete
                  placeholder={formConstants.SELECT_CODE}
                  value={field.value}
                  options={codeOptions}
                  onChange={selectedValue => {
                    setValue('procedureCode', selectedValue, { shouldValidate: true });
                  }}
                  hasError={!!errors.procedureCode}
                  errorMessage={errors.procedureCode?.message as string}
                  onInputChange={handleInputChange}
                  autoname="procedureCode"
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <CustomLabel label={formConstants.RATE} isRequired />
            <Controller
              control={control}
              name="rate"
              render={({ field }) => (
                <CustomInput
                  placeholder={formConstants.ENTER_RATE}
                  {...field}
                  hasError={!!errors.rate}
                  errorMessage={errors.rate?.message as string}
                  disableField={isPending}
                  isNumeric
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <CustomLabel label={formConstants.STATUS} isRequired />
            <Controller
              control={control}
              name="active"
              render={({ field }) => (
                <CustomSelect
                  items={DUMMY_STATUS}
                  placeholder={formConstants.SELECT_STATUS}
                  {...field}
                  value={field.value ? 'true' : 'false'}
                  onChange={(event) => field.onChange(event.target.value === 'true')}
                  isDisabled={isPending}
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <CustomLabel label={formConstants.CODE_DESCRIPTION} />
            <Controller
              control={control}
              name="description"
              render={({ field }) => (
                <CustomTextArea
                  placeholder={formConstants.ENTER_CODE_DESCRIPTION}
                  {...field}
                  hasError={!!errors.description}
                  errorMessage={errors.description?.message as string}
                  minRow={3}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12 }} mt={3}>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
              <CustomButton
                variant="outlined"
                onClick={onClose}
                disabled={isPending}
                label="Cancel"
              />
              <CustomButton
                variant="filled"
                type="submit"
                disabled={isPending}
                label={isPending ? formConstants.SAVING : formConstants.SAVE}
              />
            </Box>
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  );
};

export default FeeScheduleForm;
