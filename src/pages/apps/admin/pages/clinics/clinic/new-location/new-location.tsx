import { useEffect, useState } from 'react';
import { Box, Grid, Checkbox, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import {
  useLocationControllerServicePostApiMasterLocation,
  useLocationControllerServicePutApiMasterLocation,
} from '../../../../../../../sdk/queries/queries';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import CustomInput from '../../../../../../../components/core/reusable/custom-input/custom-input';
import CustomLabel from '../../../../../../../components/core/reusable/custom-label/custom-label';
import CustomSelect from '../../../../../../../components/core/reusable/custom-select/custom-select';
import { Location, LocationHour } from '../../../../../../../sdk/requests/types.gen';
import {
  locationConstants,
  settingConstants,
} from '../../../../../../../constants/admin-constants';
import StateList from '../../../../../../../assets/states/states.json';
import CustomButton from '../../../../../../../components/core/reusable/custom-button/custom-button';
import { locationSchema } from '../../../../../../../schema/location-schema/location-schema';
import useApiFeedback from '../../../../../../../hooks/useApiFeedback';
import { hideLoader, showLoader } from 'src/redux/reducers/loaderReducer';
import { useDispatch } from 'react-redux';
import CustomContactInput from '../../../../../../../components/core/reusable/custom-contact-input/custom-contact-field';
import { ValidationMessages } from 'src/constants/formConst';
import { toCamelCase } from 'src/utils/toCamelCase';
import { useParams } from 'react-router-dom';
import CustomAutoMultiSelect from 'src/components/core/reusable/custom-multiselect/custom-autocomplete-multiselect';
import CustomTimePicker from 'src/components/core/reusable/custom-time-picker/custom-time-picker';
import { SpecialityControllerService } from 'src/sdk/requests';

const listOfStateOptions = StateList.map(state => {
  return {
    value: state.code,
    label: state.name,
  };
});

export const statusOptions = [
  { label: 'Active', value: 'true' },
  { label: 'Inactive', value: 'false' },
];

const daysOfWeekFull = [
  'MONDAY',
  'TUESDAY',
  'WEDNESDAY',
  'THURSDAY',
  'FRIDAY',
  'SATURDAY',
  'SUNDAY',
];

interface LocationFormProps {
  onClose: () => void;
  RefetchLocationData?: () => void;
  isEdit: boolean;
  locationData?: Location;
  schema?: string;
}

const LocationForm = (props: LocationFormProps) => {
  const { onClose, isEdit, locationData, RefetchLocationData } = props;
  const { uuid } = useParams();
  const dispatch = useDispatch();

  const [usePhysicalAddress, setUsePhysicalAddress] = useState(false);
  const [isRefetching, setIsRefetching] = useState(false);
  const [formattedSpecialityTypes, setFormattedSpecialityTypes] = useState<
    { value: string; key: string }[]
  >([]);

  const [locationHours, setLocationHours] = useState(
    daysOfWeekFull?.map(day => ({
      dayOfWeek: day as
        | 'MONDAY'
        | 'TUESDAY'
        | 'WEDNESDAY'
        | 'THURSDAY'
        | 'FRIDAY'
        | 'SATURDAY'
        | 'SUNDAY',
      openingTime: '',
      closingTime: '',
    }))
  );
  const initialValues: Location = {
    name: '',
    locationId: '',
    specialities: {},
    contact: '',
    email: '',
    fax: '',
    active: true,
    physicalAddress: {
      line1: '',
      line2: '',
      city: '',
      state: '',
      zipcode: '',
      country: 'USA',
    },
    billingAddress: {
      line1: '',
      line2: '',
      city: '',
      state: '',
      zipcode: '',
      country: 'USA',
    },
    locationHours: [],
    archive: false,
    clinicId: '',
  };

  const {
    mutateAsync: createLocationAsync,
    data: createLocationData,
    isPending: isCreating,
    isSuccess: isSuccessCreateLocation,
    isError: isErrorCreateLocation,
    error: errorCreateLocation,
  } = useLocationControllerServicePostApiMasterLocation();

  const {
    mutateAsync: updateLocationAsync,
    isPending: isUpdating,
    data: updatedLocation,
    isSuccess: isSuccessUpdateLocation,
    isError: isErrorUpdateLocation,
    error: errorUpdateLocation,
  } = useLocationControllerServicePutApiMasterLocation();

  const { mutateAsync: getSpecialities } = useMutation({
    mutationFn: SpecialityControllerService.getApiMasterSpeciality,
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
    setValue,
    clearErrors,
    setError,
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(locationSchema) as any,
  });

  const handleUsePhysicalAddressChange = (checked: boolean) => {
    setUsePhysicalAddress(checked);
    if (checked) {
      const physicalAddress = control._formValues.physicalAddress;
      if (physicalAddress) {
        reset({
          ...control._formValues,
          billingAddress: {
            line1: physicalAddress?.line1 || '',
            line2: physicalAddress?.line2 || '',
            city: physicalAddress?.city || '',
            state: physicalAddress?.state || '',
            zipcode: physicalAddress?.zipcode || '',
            country: physicalAddress?.country || 'USA',
          },
        });
      }
    } else {
      reset({
        ...control._formValues,
        billingAddress: {
          line1: '',
          line2: '',
          city: '',
          state: '',
          zipcode: '',
          country: 'USA',
        },
      });
    }
  };

  const handleTimeChange = (day: string, field: string, value: string, idx: number) => {
    const updatedHours = locationHours?.map(d =>
      d.dayOfWeek === day ? { ...d, [field]: value } : d
    );
    setLocationHours(updatedHours);
    setValue('locationHours', updatedHours);

    // Clear previous errors for this field
    clearErrors(`locationHours.${idx}.${field}` as any);

    // Real-time validation
    const currentHour = updatedHours.find(d => d.dayOfWeek === day);
    if (currentHour) {
      // If user enters opening time, check if closing time is required
      if (field === 'openingTime' && value && !currentHour.closingTime) {
        setError(`locationHours.${idx}.closingTime`, {
          type: 'manual',
          message: 'Closing time is required when opening time is set',
        });
      }

      // If user enters closing time, check if opening time is required
      if (field === 'closingTime' && value && !currentHour.openingTime) {
        setError(`locationHours.${idx}.openingTime`, {
          type: 'manual',
          message: 'Opening time is required when closing time is set',
        });
      }

      // Check if closing time is after opening time
      if (currentHour.openingTime && currentHour.closingTime) {
        const [openHours, openMinutes] = currentHour.openingTime.split(':')?.map(Number);
        const [closeHours, closeMinutes] = currentHour.closingTime.split(':')?.map(Number);

        const openingTimeInMinutes = openHours * 60 + openMinutes;
        const closingTimeInMinutes = closeHours * 60 + closeMinutes;

        if (closingTimeInMinutes <= openingTimeInMinutes) {
          setError(`locationHours.${idx}.closingTime`, {
            type: 'manual',
            message: 'Closing time must be after opening time',
          });
        }
      }
    }
  };

  const createLocationPayload = (values: Location): Location => {
    return {
      name: values.name.trim(),
      contact: values.contact,
      email: values?.email,
      fax: values.fax,
      physicalAddress: {
        line1: values.physicalAddress?.line1 || '',
        line2: values.physicalAddress?.line2 || '',
        city: values.physicalAddress?.city || '',
        state: values.physicalAddress?.state || '',
        zipcode: values.physicalAddress?.zipcode || '',
        country: values.physicalAddress?.country || 'USA',
      },
      billingAddress: {
        line1: values.billingAddress?.line1 || '',
        line2: values.billingAddress?.line2 || '',
        city: values.billingAddress?.city || '',
        state: values.billingAddress?.state || '',
        zipcode: values.billingAddress?.zipcode || '',
        country: values.billingAddress?.country || 'USA',
      },
      locationHours: values.locationHours as LocationHour[],
      specialities: values.specialities || {},
      locationId: values.locationId || '',
      active: values.active ?? true,
      clinicId: values.clinicId,
    };
  };

  const getSpecialtyList = async () => {
    try {
      const response = await SpecialityControllerService.getApiMasterSpeciality({});
      const list = (response?.data?.content as any[]) || [];
      const formattedList = list?.map((speciality: any) => ({
        key: speciality?.uuid || '',
        value: speciality?.name,
      }));
      setFormattedSpecialityTypes(formattedList);
    } finally {
      console.log('Fetching specialties process completed.');
    }
  };

  useEffect(() => {
    if (isSuccessCreateLocation || isSuccessUpdateLocation) {
      dispatch(hideLoader());
      if (isEdit && RefetchLocationData && !isRefetching) {
        setIsRefetching(true);
        setTimeout(() => {
          try {
            RefetchLocationData();
          } catch (error) {
            console.error('Failed to refetch clinic data:', error);
          } finally {
            setIsRefetching(false);
            onClose();
          }
        }, 500);
      } else if (!isEdit) {
        onClose();
      }
    }
  }, [
    isSuccessCreateLocation,
    isSuccessUpdateLocation,
    isEdit,
    RefetchLocationData,
    dispatch,
    isRefetching,
    onClose,
  ]);

  useEffect(() => {
    if (isEdit && locationData) {
      const existingLocation = locationData;

      // Map locationHours to match the daysOfWeekFull order
      const mappedLocationHours = daysOfWeekFull?.map(day => {
        const existingHour = existingLocation?.locationHours?.find(hour => hour.dayOfWeek === day);
        return {
          dayOfWeek: day as
            | 'MONDAY'
            | 'TUESDAY'
            | 'WEDNESDAY'
            | 'THURSDAY'
            | 'FRIDAY'
            | 'SATURDAY'
            | 'SUNDAY',
          openingTime: existingHour?.openingTime || '',
          closingTime: existingHour?.closingTime || '',
        };
      });

      const formData = {
        name: existingLocation?.name || '',
        locationId: existingLocation?.locationId || '',
        // specialities: existingLocation?.specialities || {},
        specialities: existingLocation?.specialities
          ? Object.fromEntries(Object.keys(existingLocation?.specialities)?.map(key => [key, '']))
          : {},
        contact: existingLocation?.contact || '',

        email: existingLocation?.email || '',
        fax: existingLocation?.fax || '',
        active: existingLocation?.active ?? true,
        physicalAddress: {
          line1: existingLocation?.physicalAddress?.line1 || '',
          line2: existingLocation?.physicalAddress?.line2 || '',
          city: existingLocation?.physicalAddress?.city || '',
          state: existingLocation?.physicalAddress?.state || '',
          zipcode: existingLocation?.physicalAddress?.zipcode || '',
          country: existingLocation?.physicalAddress?.country || 'USA',
        },
        billingAddress: {
          line1: existingLocation?.billingAddress?.line1 || '',
          line2: existingLocation?.billingAddress?.line2 || '',
          city: existingLocation?.billingAddress?.city || '',
          state: existingLocation?.billingAddress?.state || '',
          zipcode: existingLocation?.billingAddress?.zipcode || '',
          country: existingLocation?.billingAddress?.country || 'USA',
        },
        locationHours: mappedLocationHours,
        archive: existingLocation?.archive || false,
        clinicId: existingLocation?.clinicId || '',
      };

      reset(formData);

      // Update the locationHours state to match the form data
      setLocationHours(mappedLocationHours);

      const physicalAddress = existingLocation?.physicalAddress;
      const billingAddress = existingLocation?.billingAddress;
      if (physicalAddress && billingAddress) {
        const isSameAddress =
          physicalAddress.line1 === billingAddress.line1 &&
          physicalAddress.line2 === billingAddress.line2 &&
          physicalAddress.city === billingAddress.city &&
          physicalAddress.state === billingAddress.state &&
          physicalAddress.zipcode === billingAddress.zipcode &&
          physicalAddress.country === billingAddress.country;

        setUsePhysicalAddress(isSameAddress);
      }
    }
  }, [isEdit, locationData, reset]);

  useEffect(() => {
    if (isSuccessCreateLocation || isSuccessUpdateLocation) {
      onClose();
    }
  }, [isSuccessCreateLocation, isSuccessUpdateLocation, onClose]);

  useEffect(() => {
    getSpecialities({});
  }, []);

  const isPending = isCreating || isUpdating;

  useApiFeedback(
    isErrorCreateLocation,
    errorCreateLocation,
    isSuccessCreateLocation,
    (createLocationData?.message || 'Location created successfully') as string
  );

  useApiFeedback(
    isErrorUpdateLocation,
    errorUpdateLocation,
    isSuccessUpdateLocation,
    (updatedLocation?.message || 'Location updated successfully') as string
  );

  useEffect(() => {
    if (isPending) {
      dispatch(showLoader());
    } else {
      dispatch(hideLoader());
    }
  }, [isPending, dispatch]);

  useEffect(() => {
    getSpecialtyList();
  }, []);

  const onSubmit = async (values: Location) => {
    let hasTimeError = false;
    (values?.locationHours || []).forEach((hour: any, idx: number) => {
      if (hour?.openingTime && !hour?.closingTime) {
        setError(`locationHours.${idx}.closingTime`, {
          type: 'manual',
          message: 'Please enter closing time',
        });
        hasTimeError = true;
      }
      if (!hour?.openingTime && hour?.closingTime) {
        setError(`locationHours.${idx}.openingTime`, {
          type: 'manual',
          message: 'Please enter opening time',
        });
        hasTimeError = true;
      }
    });

    if (hasTimeError) return;

    // Add validation for closingTime not less than openingTime
    (values?.locationHours || []).forEach((hour: any, idx: number) => {
      if (hour?.openingTime && hour?.closingTime) {
        // Assuming time format is HH:mm (24-hour format)
        const [openHours, openMinutes] = hour?.openingTime.split(':')?.map(Number);
        const [closeHours, closeMinutes] = hour?.closingTime.split(':')?.map(Number);

        const openingTimeInMinutes = openHours * 60 + openMinutes;
        const closingTimeInMinutes = closeHours * 60 + closeMinutes;

        if (closingTimeInMinutes <= openingTimeInMinutes) {
          setError(`locationHours.${idx}.closingTime`, {
            type: 'manual',
            message: 'Closing time must be after opening time',
          });
          hasTimeError = true;
        }
      }
    });

    if (hasTimeError) {
      // Optionally, you can display a general error message here as well
      // dispatch(setSnackbarOn({ severity: AlertSeverity.ERROR, message: "Please fix time errors." }));
      return;
    }

    // Transform specialities array to object format
    const specialitiesObject = Array.isArray(values?.specialities)
      ? Object.fromEntries(values?.specialities?.map(key => [key, '']))
      : values?.specialities || {};

    const payloadSubmit: Location = createLocationPayload({
      ...values,
      specialities: specialitiesObject,
      clinicId: uuid || '',
    });

    try {
      if (isEdit && locationData?.uuid) {
        await updateLocationAsync({
          requestBody: {
            ...payloadSubmit,
            uuid: locationData?.uuid,
          },
        });
      } else {
        await createLocationAsync({
          requestBody: payloadSubmit,
        });
      }
    } catch (error) {
      console.error('Failed to submit location data:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12 }}>
          <CustomLabel label={locationConstants.LOCATION_NAME} isRequired />
          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <CustomInput
                placeholder={`${locationConstants.ENTER} ${locationConstants.LOCATION_NAME}`}
                {...field}
                hasError={!!errors.name}
                errorMessage={errors.name?.message}
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <CustomLabel label={locationConstants.LOCATION_ID} isRequired/>
          <Controller
            control={control}
            name="locationId"
            render={({ field }) => (
              <CustomInput
                placeholder={`${locationConstants.ENTER} ${locationConstants.LOCATION_ID}`}
                {...field}
                hasError={!!errors.locationId}
                errorMessage={errors.locationId?.message}
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <CustomLabel label={locationConstants.SPECIALITY} isRequired />

          <Controller
            control={control}
            name="specialities"
            render={({ field }) => (
              <CustomAutoMultiSelect
                name="specialities"
                placeholder={settingConstants.SELECT_SPECIALITY_TYPE}
                options={formattedSpecialityTypes}
                value={Array.isArray(field.value) ? field.value : Object.keys(field.value || {})}
                onChange={selectedValue => {
                  const specialitiesObject = Object.fromEntries(
                    (selectedValue || []).map(key => [key, ''])
                  );
                  field.onChange(specialitiesObject);
                }}
                errorMessage={errors.specialities?.message as unknown as string}
                showEllipse
              />
            )}
          ></Controller>
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <CustomLabel label={locationConstants.CONTACT_NUMBER} isRequired />
          <Controller
            control={control}
            name="contact"
            render={({ field }) => (
              <CustomContactInput
                placeholder={`${locationConstants.ENTER} ${locationConstants.CONTACT_NUMBER}`}
                {...field}
                hasError={!!errors.contact}
                errorMessage={errors.contact?.message}
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <CustomLabel label={locationConstants.EMAIL} />
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <CustomInput
                placeholder={`${locationConstants.ENTER} ${locationConstants.EMAIL}`}
                {...field}
                hasError={!!errors.email}
                errorMessage={errors.email?.message}
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <CustomLabel label={locationConstants.FAX_ID} />
          <Controller
            control={control}
            name="fax"
            render={({ field }) => (
              <CustomInput
                placeholder={`${locationConstants.ENTER} ${locationConstants.FAX_ID}`}
                {...field}
                hasError={!!errors.fax}
                errorMessage={errors.fax?.message}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <CustomLabel label="Status" />
          <Controller
            control={control}
            name="active"
            render={({ field }) => (
              <CustomSelect
                items={statusOptions}
                placeholder={ValidationMessages.SELECT_STATUS}
                {...field}
                value={field.value === true ? 'true' : 'false'}
                onChange={e => field.onChange(e.target.value === 'true')}
                hasError={!!errors.active}
                errorMessage={errors.active?.message}
              />
            )}
          />
        </Grid>

        {/* Physical Address */}
        <Grid
          sx={{
            pt: 1.5,
            width: '100%',
          }}
        >
          <Grid size={{ xs: 12 }} pb={2}>
            <Typography variant="titleSemiBold3">{locationConstants.PHYSICAL_ADDRESS}</Typography>
          </Grid>

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <CustomLabel label={locationConstants.LINE_1} isRequired />
              <Controller
                control={control}
                name="physicalAddress.line1"
                render={({ field }) => (
                  <CustomInput
                    placeholder={`${locationConstants.ENTER} ${locationConstants.LINE_1}`}
                    {...field}
                    hasError={!!errors.physicalAddress?.line1}
                    errorMessage={errors.physicalAddress?.line1?.message}
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <CustomLabel label={locationConstants.LINE_2} />
              <Controller
                control={control}
                name="physicalAddress.line2"
                render={({ field }) => (
                  <CustomInput
                    placeholder={`${locationConstants.ENTER} ${locationConstants.LINE_2}`}
                    {...field}
                    hasError={!!errors.physicalAddress?.line2}
                    errorMessage={errors.physicalAddress?.line2?.message}
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }}>
              <CustomLabel label={locationConstants.CITY} isRequired />
              <Controller
                control={control}
                name="physicalAddress.city"
                render={({ field }) => (
                  <CustomInput
                    placeholder={`${locationConstants.ENTER} ${locationConstants.CITY}`}
                    {...field}
                    hasError={!!errors.physicalAddress?.city}
                    errorMessage={errors.physicalAddress?.city?.message}
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }}>
              <CustomLabel label={locationConstants.STATE} isRequired />
              <Controller
                control={control}
                name="physicalAddress.state"
                render={({ field }) => (
                  <CustomSelect
                    items={listOfStateOptions}
                    placeholder={`${locationConstants.ENTER} ${locationConstants.STATE}`}
                    {...field}
                    hasError={!!errors.physicalAddress?.state}
                    errorMessage={errors.physicalAddress?.state?.message}
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }}>
              <CustomLabel label={locationConstants.ZIP_CODE} isRequired />
              <Controller
                control={control}
                name="physicalAddress.zipcode"
                render={({ field }) => (
                  <CustomInput
                    placeholder={`${locationConstants.ENTER} ${locationConstants.ZIP_CODE}`}
                    {...field}
                    hasError={!!errors.physicalAddress?.zipcode}
                    errorMessage={errors.physicalAddress?.zipcode?.message}
                  />
                )}
              />
            </Grid>
          </Grid>
        </Grid>

        {/* Billing Address */}

        <Grid
          sx={{
            width: '100%',
          }}
        >
          <Grid size={{ xs: 12 }} display={'flex'} alignItems={'center'} gap={2}>
            <Typography variant="titleSemiBold3">{locationConstants.BILLING_ADDRESS}</Typography>
            <Grid container alignItems="center" spacing={0.5}>
              <Grid>
                <Checkbox
                  checked={usePhysicalAddress}
                  onChange={e => handleUsePhysicalAddressChange(e.target.checked)}
                  disabled={isPending}
                  sx={{
                    '&.Mui-checked': {
                      color: 'Primary.main',
                    },
                  }}
                />
              </Grid>
              <Grid>
                <Typography variant="titleSemiBold4" color="Neutral.60">
                  Use same as physical address
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <CustomLabel label={locationConstants.LINE_1} isRequired />
              <Controller
                control={control}
                name="billingAddress.line1"
                render={({ field }) => (
                  <CustomInput
                    placeholder={`${locationConstants.ENTER} ${locationConstants.LINE_1}`}
                    {...field}
                    hasError={!!errors.billingAddress?.line1}
                    errorMessage={errors.billingAddress?.line1?.message}
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <CustomLabel label={locationConstants.LINE_2} />
              <Controller
                control={control}
                name="billingAddress.line2"
                render={({ field }) => (
                  <CustomInput
                    placeholder={`${locationConstants.ENTER} ${locationConstants.LINE_2}`}
                    {...field}
                    hasError={!!errors.billingAddress?.line2}
                    errorMessage={errors.billingAddress?.line2?.message}
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }}>
              <CustomLabel label={locationConstants.CITY} isRequired />
              <Controller
                control={control}
                name="billingAddress.city"
                render={({ field }) => (
                  <CustomInput
                    placeholder={`${locationConstants.ENTER} ${locationConstants.CITY}`}
                    {...field}
                    hasError={!!errors.billingAddress?.city}
                    errorMessage={errors.billingAddress?.city?.message}
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }}>
              <CustomLabel label={locationConstants.STATE} isRequired />
              <Controller
                control={control}
                name="billingAddress.state"
                render={({ field }) => (
                  <CustomSelect
                    items={listOfStateOptions}
                    placeholder={`${locationConstants.ENTER} ${locationConstants.STATE}`}
                    {...field}
                    value={field.value || ''}
                    hasError={!!errors.billingAddress?.state}
                    errorMessage={errors.billingAddress?.state?.message}
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }}>
              <CustomLabel label={locationConstants.ZIP_CODE} isRequired />
              <Controller
                control={control}
                name="billingAddress.zipcode"
                render={({ field }) => (
                  <CustomInput
                    placeholder={`${locationConstants.ENTER} ${locationConstants.ZIP_CODE}`}
                    {...field}
                    hasError={!!errors.billingAddress?.zipcode}
                    errorMessage={errors.billingAddress?.zipcode?.message}
                  />
                )}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid size={12}>
          <Grid mt={2} container display={'flex'} flexDirection={'row'} alignItems={'center'}>
            <Grid>
              <Typography variant="titleSemiBold3">{locationConstants.OFFICE_HOURS}</Typography>
            </Grid>
          </Grid>
          <Grid display={'flex'}>
            <Grid size={3}></Grid>
            <Grid size={3}>
              <Typography variant="titleMedium4" align="center">
                Open Time
              </Typography>
            </Grid>
            <Grid size={3}>
              <Typography variant="titleMedium4" align="center">
                Close Time
              </Typography>
            </Grid>
          </Grid>
          {locationHours?.map(({ dayOfWeek, openingTime, closingTime }, idx) => (
            <Grid
              container
              key={dayOfWeek}
              width={'100%'}
              p={1}
              columnGap={1}
              rowGap={1}
              pb={2}
              pl={2}
              pr={2}
            >
              <Grid size={2} display={'flex'} justifyContent={'start'} alignItems={'center'}>
                <Typography variant="body1" align="center">
                  {toCamelCase(dayOfWeek)}
                </Typography>
              </Grid>
              <Grid size={3}>
                <CustomTimePicker
                  value={openingTime}
                  handleTimeChange={(timeValue: string) => {
                    handleTimeChange(dayOfWeek, 'openingTime', timeValue, idx);
                  }}
                  hasError={!!errors.locationHours?.[idx]?.openingTime}
                  errorMessage={errors.locationHours?.[idx]?.openingTime?.message}
                />
              </Grid>
              <Grid size={3}>
                <CustomTimePicker
                  value={closingTime}
                  handleTimeChange={(timeValue: string) => {
                    handleTimeChange(dayOfWeek, 'closingTime', timeValue, idx);
                  }}
                  hasError={!!errors.locationHours?.[idx]?.closingTime}
                  errorMessage={errors.locationHours?.[idx]?.closingTime?.message}
                />
              </Grid>
            </Grid>
          ))}
        </Grid>

        <Grid size={{ xs: 12 }} mb={2}>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <CustomButton
              variant="outlined"
              onClick={onClose}
              disabled={isPending}
              label={locationConstants.CANCEL}
            />
            <CustomButton
              variant="filled"
              type="submit"
              label={isPending ? 'Saving...' : locationConstants.SAVE}
              disabled={isPending}
            />
          </Box>
        </Grid>
      </Grid>
    </form>
  );
};

export default LocationForm;
