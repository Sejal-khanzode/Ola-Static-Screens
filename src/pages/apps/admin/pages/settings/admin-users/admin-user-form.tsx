import { useEffect, useMemo, useState } from 'react';
import { Box, Grid, IconButton, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import {
  PostApiMasterProviderData,
  Provider,
  ProviderLicenseDetail,
  User,
  providerType,
} from '../../../../../../sdk/requests/types.gen';
import { settingConstants } from '../../../../../../constants/admin-constants';
import CustomSelect from '../../../../../../components/core/reusable/custom-select/custom-select';
import CustomLabel from '../../../../../../components/core/reusable/custom-label/custom-label';
import CustomButton from '../../../../../../components/core/reusable/custom-button/custom-button';
import CustomInput from '../../../../../../components/core/reusable/custom-input/custom-input';
import useApiFeedback from '../../../../../../hooks/useApiFeedback';
import CustomContactInput from '../../../../../../components/core/reusable/custom-contact-input/custom-contact-field';
import {
  ClinicianFormLabels,
  ClinicianFormPlaceholders,
  genderList,
  StaffFormPlaceholders,
  ValidationMessages,
} from 'src/constants/formConst';
import { hideLoader, showLoader } from 'src/redux/reducers/loaderReducer';
import { useDispatch } from 'react-redux';
import {
  ClinicControllerService,
  LicenseStateControllerService,
  SpecialityControllerService,
  UserControllerService,
  ProviderControllerService,
} from 'src/sdk/requests';
import CustomTextArea from 'src/components/core/reusable/custom-text-area/custom-textarea';
import CustomDatePicker from 'src/components/core/reusable/custom-date-picker/custom-date-picker';
import {
  providerTypeList,
  rolesList,
  activeStatusOptions,
} from '../../../../../../constants/staff-provider-types';
import { yupResolver } from '@hookform/resolvers/yup';
import { userSchema } from 'src/schema/user-schema/user-schema';
import { AddIcon } from 'src/assets/icons/addIcon';
import { Delete } from '@mui/icons-material';
import CustomAutoMultiSelect from 'src/components/core/reusable/custom-multiselect/custom-autocomplete-multiselect';
import CustomClinicSelect from 'src/components/core/reusable/custom-clinic-select/custom-clinic-select';
import useAuthority from 'src/hooks/use-authority';

interface LicenseDetail {
  licenseState: {
    uuid: string;
    state: string;
    country: string;
  };
  licenseNumber: string;
  licenseExpiryDate: string;
}

interface AdminUserFormProps {
  onClose: () => void;
  RefetchUserData: () => void;
  uuid: string;
  isEdit: boolean;
  userData?: any;
}

const AdminUserForm = (props: AdminUserFormProps) => {
  const dispatch = useDispatch();
  const { onClose, RefetchUserData, isEdit, userData } = props;
  const [licenseDetails, setLicenseDetails] = useState<LicenseDetail[]>([]);
  const [formattedSpecialityTypes, setFormattedSpecialityTypes] = useState<
    { value: string; key: string }[]
  >([]);
  const [licenseStates, setLicenseStates] = useState<any[]>([]);
  const [clinicList, setClinicList] = useState<any[]>([]);
  const [selectedClinicsList, setSelectedClinicsList] = useState<any[]>([]);
  const [_, setRoleType] = useState<string>('');
  const { isProviderPortal } = useAuthority();
  const [searchText, setsearchText] = useState('');

  const listOfStateOptions = useMemo(() => {
    return licenseStates?.map(state => ({
      value: state.uuid,
      label: state.state,
    }));
  }, [licenseStates]);

  // Filter out already selected states
  const getAvailableStateOptions = (currentIndex?: number) => {
    const selectedStateUuids = licenseDetails
      .map((detail, index) => {
        // Don't filter out the current item being edited
        if (currentIndex !== undefined && index === currentIndex) {
          return null;
        }
        return detail.licenseState.uuid;
      })
      .filter(Boolean);

    return listOfStateOptions.filter(option => !selectedStateUuids.includes(option.value));
  };

  const listOfClinicOptions = useMemo(() => {
    return clinicList?.map(clinic => ({
      key: clinic.key,
      value: clinic.value,
    }));
  }, [clinicList]);

  // Filter out already selected clinics
  const getAvailableClinicOptions = () => {
    const selectedClinicKeys = (watch('clinics') as string[]) || [];
    return listOfClinicOptions.filter(option => !selectedClinicKeys.includes(option.key));
  };

  // Get selected clinic details for display
  const getSelectedClinics = () => {
    const selectedClinicKeys = (watch('clinics') as string[]) || [];
    return selectedClinicKeys
      .map(key => {
        const clinic = listOfClinicOptions?.find(option => option.key === key);
        return clinic ? { key, value: clinic.value } : null;
      })
      .filter((clinic): clinic is { key: string; value: string } => clinic !== null);
  };

  // Add clinic to selection
  const addClinic = (clinicKey: string) => {
    const currentClinics = (watch('clinics') as string[]) || [];
    if (!currentClinics.includes(clinicKey)) {
      const updatedClinics = [...currentClinics, clinicKey];
      setValue('clinics', updatedClinics, { shouldValidate: true });

      // Also save the full clinic details to preserve it
      const clinicDetails = listOfClinicOptions?.find(option => option.key === clinicKey);
      if (clinicDetails) {
        setSelectedClinicsList(prev => {
          if (!prev.some(c => c.key === clinicKey)) {
            return [...prev, clinicDetails];
          }
          return prev;
        });
      }
    }
  };

  // Remove clinic from selection
  const removeClinic = (clinicKey: string) => {
    const currentClinics = (watch('clinics') as string[]) || [];
    const updatedClinics = currentClinics.filter(key => key !== clinicKey);
    setValue('clinics', updatedClinics, { shouldValidate: true });

    // Also remove from selected clinics list
    setSelectedClinicsList(prev => prev.filter(c => c.key !== clinicKey));
  };

  const initialValues = {
    firstName: userData?.firstName || '',
    lastName: userData?.lastName || '',
    email: userData?.email || '',
    phone: userData?.phone || '',
    active: userData?.active || true,
    roles: userData?.roles || [],
    providerType: userData?.providerType as providerType,
    specialities: userData?.specialities ? Object.keys(userData?.specialities) : ([] as string[]),
    gender: userData?.gender || '',
    npiNumber: userData?.npi || '',
    clinics: userData?.clinics ? Object.keys(userData?.clinics) : ([] as string[]),
    workExperience: userData?.workExperience || '',
    languagesSpoken: userData?.languagesSpoken || '',
    bio: userData?.bio || '',
    licenseDetails:
      userData?.licenceDetails?.map((detail: ProviderLicenseDetail) => ({
        licenseState: {
          uuid: detail.licenseState.uuid,
          state: detail.licenseState.state,
          country: detail.licenseState.country || '',
        },
        licenseNumber: detail.licenseNumber,
        licenseExpiryDate: detail.licenseExpiryDate,
      })) || [],
  };

  const method = useForm<any>({
    defaultValues: initialValues,
    resolver: yupResolver(userSchema),
  });

  const handleRoleChange = (selectedRoles: string[]) => {
    if (selectedRoles && selectedRoles.length > 0) {
      const allRoles = [...rolesList];
      const selectedRoleData = allRoles.find(roles => roles.key === selectedRoles[0]);

      if (selectedRoleData) {
        setRoleType(selectedRoleData.roleType);
      }
    }
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = method;

  const roles = watch('roles');

  // Helper function to determine if clinic dropdown should be shown
  const shouldShowClinicDropdown = (roles: string[]) => {
    if (!roles || !Array.isArray(roles)) return false;
    return roles.some(role =>
      ['PHYSICIAN', 'NURSE', 'THERAPIST', 'FRONTDESK', 'BILLER', 'MEDICAL_ASSISTANT'].includes(role)
    );
  };

  // Helper function to determine if user is a provider (needs provider-specific fields)
  const isProviderRole = (roles: string[]) => {
    if (!roles || !Array.isArray(roles)) return false;
    return roles.some(role => ['PHYSICIAN', 'NURSE', 'THERAPIST'].includes(role));
  };

  // Helper function to get role options with disabled state based on current selection
  const getRoleOptionsWithDisabledState = (currentRoles: string[]) => {
    if (!currentRoles || !Array.isArray(currentRoles) || currentRoles?.length === 0) {
      // If no roles selected, show all options as enabled
      return rolesList?.map(role => ({ ...role, disabled: false }));
    }

    const hasTenantRole = currentRoles.some(role =>
      ['TENANT_ADMIN', 'TENANT_SUPPORT'].includes(role)
    );
    const hasOtherRole = currentRoles.some(
      role => !['TENANT_ADMIN', 'TENANT_SUPPORT'].includes(role)
    );

    return rolesList?.map(role => {
      let disabled = false;

      if (hasTenantRole) {
        // If TENANT_ADMIN or TENANT_SUPPORT is selected, disable all other roles
        disabled = !['TENANT_ADMIN', 'TENANT_SUPPORT'].includes(role.key);
      } else if (hasOtherRole) {
        // If any other role is selected, disable TENANT_ADMIN and TENANT_SUPPORT
        disabled = ['TENANT_ADMIN', 'TENANT_SUPPORT'].includes(role.key);
      }

      return { ...role, disabled };
    });
  };

  // License Details Functions
  const addLicenseDetail = () => {
    const newLicenseDetail: LicenseDetail = {
      licenseState: {
        uuid: '',
        state: '',
        country: '',
      },
      licenseNumber: '',
      licenseExpiryDate: '',
    };
    const updatedLicenseDetails = [...licenseDetails, newLicenseDetail];
    setLicenseDetails(updatedLicenseDetails);
    setValue('licenseDetails', updatedLicenseDetails, { shouldValidate: false });
  };

  const removeLicenseDetail = (index: number) => {
    const updatedLicenseDetails = licenseDetails.filter((_, i) => i !== index);
    setLicenseDetails(updatedLicenseDetails);
    setValue('licenseDetails', updatedLicenseDetails, { shouldValidate: false });
  };

  const updateLicenseDetail = (index: number, field: keyof LicenseDetail, value: any) => {
    const updatedLicenseDetails = [...licenseDetails];
    if (field === 'licenseState') {
      const stateData = licenseStates.find(state => state.uuid === value);
      updatedLicenseDetails[index] = {
        ...updatedLicenseDetails[index],
        [field]: {
          uuid: value,
          state: stateData?.state || '',
          country: stateData?.country || '',
        },
      };
    } else {
      updatedLicenseDetails[index] = {
        ...updatedLicenseDetails[index],
        [field]: value,
      };
    }
    setLicenseDetails(updatedLicenseDetails);
    setValue('licenseDetails', updatedLicenseDetails, { shouldValidate: true });

    // Trigger validation for the specific field
    setTimeout(() => {
      method.trigger('licenseDetails');
    }, 0);
  };

  const fetchLicenseStates = async () => {
    try {
      const response = await LicenseStateControllerService.getApiMasterStateList({});
      const states = response?.data?.content || [];
      setLicenseStates(states as any[]);
    } catch (error) {
      console.error('Error fetching license states:', error);
    }
  };

  const getSpecialtyList = async () => {
    try {
      const response = await SpecialityControllerService.getApiMasterSpeciality({});
      const list = (response?.data?.content as any[]) || [];
      const formattedList = list?.map((specialities: any) => ({
        key: specialities?.uuid || '',
        value: specialities?.name || '',
      }));
      setFormattedSpecialityTypes(formattedList);
    } finally {
      console.log('Fetching specialties process completed.');
    }
  };

  const AdminUserPayload = (values: any, uuid?: string) => {
    const payload: Provider = {
      firstName: values.firstName?.trim(),
      lastName: values.lastName?.trim(),
      phone: values.phone,
      roles: values.roles,
      email: values.email.trim(),
      active: values.active as User['active'],
      providerType: values.providerType as any,
      gender: values.gender,
      workExperience: values.workExperience,
      languagesSpoken: values.languagesSpoken,
      specialities: values.specialities,
      licenceDetails: values.licenseDetails,
      clinics: values.clinics,
      npi: values.npiNumber,
      bio: values.bio,
    };

    if (uuid) {
      payload.uuid = uuid;
    }
    return payload;
  };

  const formatDateToDDMMYYYY = (dateString: string): string => {
    if (!dateString) return '';

    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '';

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${month}/${day}/${year}`;
  };

  const { mutateAsync: getClinics, data: clinicsData } = useMutation({
    mutationFn: ClinicControllerService.getApiMasterClinic,
  });

  const {
    mutateAsync: createUserAsync,
    isSuccess: isSuccessCreateUser,
    isError: isErrorCreateUser,
    error: errorCreateUser,
    data: dataCreateUser,
    isPending: isPendingCreateUser,
  } = useMutation({
    mutationFn: UserControllerService.postApiMasterUser,
  });

  const {
    mutateAsync: createProviderAsync,
    isSuccess: isSuccessCreateProvider,
    isError: isErrorCreateProvider,
    error: errorCreateProvider,
    data: dataCreateProvider,
    isPending: isPendingCreateProvider,
  } = useMutation({
    mutationFn: ProviderControllerService.postApiMasterProvider,
  });

  const {
    mutateAsync: updateUserAsync,
    isSuccess: isSuccessUpdateUser,
    isError: isErrorUpdateUser,
    error: errorUpdateUser,
    data: dataUpdateUser,
    isPending: isPendingUpdateUser,
  } = useMutation({
    mutationFn: UserControllerService.putApiMasterUser,
  });

  const {
    mutateAsync: updateProviderAsync,
    isSuccess: isSuccessUpdateProvider,
    isError: isErrorUpdateProvider,
    error: errorUpdateProvider,
    data: dataUpdateProvider,
    isPending: isPendingUpdateProvider,
  } = useMutation({
    mutationFn: ProviderControllerService.putApiMasterProvider,
  });

  useApiFeedback(
    isErrorUpdateProvider || isErrorUpdateUser,
    errorUpdateProvider || errorUpdateUser,
    isSuccessUpdateProvider || isSuccessUpdateUser,
    (dataUpdateProvider?.message ||
      dataUpdateUser?.message ||
      'User updated successfully') as string
  );

  useApiFeedback(
    isErrorCreateProvider || isErrorCreateUser,
    errorCreateProvider || errorCreateUser,
    isSuccessCreateProvider || isSuccessCreateUser,
    (dataCreateProvider?.message ||
      dataCreateUser?.message ||
      'User created successfully') as string
  );

  useEffect(() => {
    fetchLicenseStates();
  }, []);

  useEffect(() => {
    getSpecialtyList();
  }, []);

  useEffect(() => {
    if (clinicsData?.data?.content && Array.isArray(clinicsData?.data?.content)) {
      const mappedClinics = clinicsData?.data?.content?.map((item: any) => ({
        key: item?.uuid,
        value: item?.name,
      }));

      // Start with currently selected clinics (preserved across API calls)
      const allClinics = [...selectedClinicsList];

      // If editing and userData has clinics, merge them as well
      if (isEdit && userData?.clinics) {
        const userClinics = Object.entries(userData?.clinics)?.map(([key, value]) => ({
          key,
          value: value as string,
        }));

        userClinics.forEach((clinic: any) => {
          if (!allClinics.some(c => c.key === clinic.key)) {
            allClinics.push(clinic);
          }
        });
      }

      // Add newly fetched clinics
      mappedClinics.forEach((clinic: any) => {
        if (!allClinics.some(c => c.key === clinic.key)) {
          allClinics.push(clinic);
        }
      });

      setClinicList(allClinics);
    }
  }, [clinicsData, isEdit, userData, selectedClinicsList]);

  useEffect(() => {
    getClinics({
      status: true,
      archive: false,
      sortDirection: 'asc',
      sortBy: 'name',
      searchString: searchText,
    });
  }, [searchText]);

  // Initialize clinicList with userData clinics if available before API loads
  useEffect(() => {
    if (isEdit && userData?.clinics && clinicList?.length === 0) {
      const userClinics = Object.entries(userData?.clinics)?.map(([key, value]) => ({
        key,
        value: value as string,
      }));
      setClinicList(userClinics);
    }
  }, [isEdit, userData, clinicList?.length]);

  const onSubmit = async (values: any) => {
    const formErrors: any = { ...method.formState.errors };
    let hasLicenseErrors = false;

    // Validate license details for provider roles
    if (roles && Array.isArray(roles) && isProviderRole(roles)) {
      if (!licenseDetails || licenseDetails.length === 0) {
        formErrors.licenseDetails = 'At least one license detail is required';
        hasLicenseErrors = true;
      } else {
        const licenseErrors: any = {};
        licenseDetails.forEach((detail, index) => {
          const detailErrors: any = {};

          if (!detail.licenseState.uuid) {
            detailErrors.licenseState = 'License State is required';
            hasLicenseErrors = true;
          }
          if (!detail.licenseNumber?.trim()) {
            detailErrors.licenseNumber = 'License Number is required';
            hasLicenseErrors = true;
          }
          if (!detail.licenseExpiryDate) {
            detailErrors.licenseExpiryDate = 'License Expiry Date is required';
            hasLicenseErrors = true;
          }

          if (Object.keys(detailErrors).length > 0) {
            licenseErrors[index] = detailErrors;
          }
        });

        if (Object.keys(licenseErrors).length > 0) {
          formErrors.licenseDetails = licenseErrors;
          hasLicenseErrors = true;
        }
      }
    }

    if (hasLicenseErrors) {
      method.setError('licenseDetails', { message: 'Please fix license details errors' });
      return;
    }

    try {
      const specialitiesObject = Array.isArray(values?.specialities)
        ? Object.fromEntries(
            values?.specialities?.map((key: string) => {
              const specialities = formattedSpecialityTypes.find(s => s.key === key);
              return [key, specialities?.value || ''];
            })
          )
        : values.specialities || {};

      const clinicsObject = Array.isArray(values?.clinics)
        ? Object.fromEntries(
            values?.clinics?.map((clinicUuid: string) => {
              const clinic = clinicList.find(c => c.key === clinicUuid);
              return [clinicUuid, clinic?.value || ''];
            })
          )
        : {};

      const formattedLicenseDetails = (licenseDetails || [])?.map((detail: LicenseDetail) => ({
        ...detail,
        licenseExpiryDate: formatDateToDDMMYYYY(detail?.licenseExpiryDate),
      }));

      if (isEdit) {
        const updatePayload = {
          uuid: userData?.uuid,
          ...values,
          roles: values?.roles,
          specialities: specialitiesObject,
          licenceDetails:
            roles && Array.isArray(roles) && isProviderRole(roles) ? formattedLicenseDetails : [],
          clinics: clinicsObject,
          npi: values?.npiNumber,
          bio: values?.bio,
        };

        if (isProviderRole(roles)) {
          await updateProviderAsync({
            requestBody: updatePayload,
          });
        } else {
          // For staff roles (FRONTDESK, BILLER), include clinics if applicable
          const staffUpdatePayload = {
            ...updatePayload,
            ...(shouldShowClinicDropdown(roles) && { clinics: clinicsObject }),
          };

          await updateUserAsync({
            requestBody: staffUpdatePayload,
          });
        }
      } else {
        const PayloadSubmitProvider: Provider = AdminUserPayload(values, userData?.uuid) as any;
        const payloadProvider: PostApiMasterProviderData = {
          requestBody: PayloadSubmitProvider,
        };

        if (isProviderRole(roles)) {
          const updatedPayloadProvider = {
            ...payloadProvider,
            requestBody: {
              ...payloadProvider.requestBody,
              specialities: specialitiesObject,
              clinics: clinicsObject,
              licenceDetails: formattedLicenseDetails,
            },
          };

          await createProviderAsync(updatedPayloadProvider);
        } else {
          const payload = {
            firstName: values.firstName?.trim(),
            lastName: values.lastName?.trim(),
            email: values.email.trim(),
            phone: values.phone,
            active: values.active,
            roles: values.roles,
            ...(shouldShowClinicDropdown(roles) && { clinics: clinicsObject }),
          };

          await createUserAsync({ requestBody: payload });
        }
      }
    } catch (error) {
      console.error('Failed to submit user data:', error);
    }
  };

  const handleInputChange = (inputValue: any) => {
    if (inputValue?.length > 2) {
      setsearchText(inputValue);
    } else if (inputValue === '') {
      // Reset search when input is cleared
      setsearchText('');
    }
  };

  useEffect(() => {
    if (
      isSuccessUpdateUser ||
      isSuccessUpdateProvider ||
      isSuccessCreateUser ||
      isSuccessCreateProvider
    ) {
      RefetchUserData();
      onClose();
    }
  }, [isSuccessUpdateUser, isSuccessUpdateProvider, isSuccessCreateUser, isSuccessCreateProvider]);

  useEffect(() => {
    if (isEdit && userData) {
      const resetData = {
        firstName: userData.firstName || '',
        lastName: userData.lastName || '',
        email: userData.email || '',
        phone: userData.phone || '',
        active: userData?.active !== undefined ? userData.active : true,
        roles: userData.roles ? userData.roles : [],
        providerType: userData.providerType || '',
        specialities: userData?.specialities ? Object.keys(userData?.specialities) : [],
        gender: userData.gender || '',
        npiNumber: userData.npi || '',
        clinics: userData?.clinics ? Object.keys(userData?.clinics) : [],
        workExperience: userData.workExperience || '',
        languagesSpoken: userData.languagesSpoken || '',
        bio: userData.bio || '',
        licenseDetails:
          userData?.licenceDetails?.map((detail: ProviderLicenseDetail) => ({
            licenseState: {
              uuid: detail.licenseState.uuid,
              state: detail.licenseState.state,
              country: detail.licenseState.country || '',
            },
            licenseNumber: detail.licenseNumber,
            licenseExpiryDate: detail.licenseExpiryDate,
          })) || [],
      };
      reset(resetData);
      setLicenseDetails(resetData.licenseDetails);
      setRoleType(userData.roleType || '');

      // Initialize selected clinics list for edit mode
      if (userData?.clinics) {
        const userClinics = Object.entries(userData?.clinics)?.map(([key, value]) => ({
          key,
          value: value as string,
        }));
        setSelectedClinicsList(userClinics);
      }
    } else if (!isEdit) {
      reset(initialValues);
      setSelectedClinicsList([]);
    }
  }, [isEdit, userData, reset, setValue]);

  // Trigger validation when license details change
  useEffect(() => {
    if (licenseDetails?.length > 0) {
      // Trigger form validation for license details
      method.trigger('licenseDetails');
    }
  }, [licenseDetails, method]);

  useEffect(() => {
    if (
      isPendingCreateProvider ||
      isPendingUpdateProvider ||
      isPendingCreateUser ||
      isPendingUpdateUser
    ) {
      dispatch(showLoader());
    } else {
      dispatch(hideLoader());
    }
  }, [
    isPendingCreateProvider,
    isPendingUpdateProvider,
    isPendingCreateUser,
    isPendingUpdateUser,
    dispatch,
  ]);

  return (
    <FormProvider {...method}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <CustomLabel label={settingConstants.FIRST_NAME} isRequired />
            <Controller
              control={control}
              name="firstName"
              render={({ field }) => (
                <CustomInput
                  placeholder={StaffFormPlaceholders.ENTER_FIRST_NAME}
                  {...field}
                  hasError={!!errors.firstName}
                  errorMessage={(errors.firstName?.message as string) || ''}
                  onChange={e => {
                    field.onChange(e);
                  }}
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <CustomLabel label={settingConstants.LAST_NAME} isRequired />
            <Controller
              control={control}
              name="lastName"
              render={({ field }) => (
                <CustomInput
                  placeholder={StaffFormPlaceholders.ENTER_LAST_NAME}
                  {...field}
                  hasError={!!errors.lastName}
                  errorMessage={(errors.lastName?.message as string) || ''}
                  onChange={e => {
                    field.onChange(e);
                  }}
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <CustomLabel label={settingConstants.EMAIL} isRequired />
            <Controller
              control={control}
              name="email"
              render={({ field }) => (
                <CustomInput
                  placeholder={StaffFormPlaceholders.ENTER_EMAIL_ID}
                  {...field}
                  hasError={!!errors.email}
                  errorMessage={(errors.email?.message as string) || ''}
                  onChange={e => {
                    field.onChange(e);
                  }}
                  disableField={isProviderPortal}
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <CustomLabel label={settingConstants.CONTACT_NUMBER} isRequired />
            <Controller
              control={control}
              name="phone"
              render={({ field }) => (
                <CustomContactInput
                  placeholder={StaffFormPlaceholders.ENTER_CONTACT_NUMBER}
                  hasError={!!errors.phone}
                  errorMessage={(errors.phone?.message as string) || ''}
                  {...field}
                  onChange={e => {
                    field.onChange(e);
                  }}
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <CustomLabel label={settingConstants.STATUS} />
            <Controller
              control={control}
              name="active"
              render={({ field }) => (
                <CustomSelect
                  items={activeStatusOptions}
                  placeholder={StaffFormPlaceholders.SELECT_STATUS}
                  {...field}
                  value={field.value === true ? 'true' : 'false'}
                  hasError={!!errors.active}
                  errorMessage={(errors.active?.message as string) || ''}
                  onChange={e => {
                    field.onChange(e.target.value === 'true');
                  }}
                  isDisabled={isProviderPortal}
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <CustomLabel label={settingConstants.ROLE} isRequired />
            <Controller
              control={control}
              name="roles"
              render={({ field }) => (
                <>
                  <CustomAutoMultiSelect
                    {...field}
                    placeholder={StaffFormPlaceholders.SELECT_ROLE}
                    options={getRoleOptionsWithDisabledState((field.value as string[]) || [])}
                    value={(field.value as string[]) || []}
                    onChange={selectedValue => {
                      field.onChange(selectedValue);
                      handleRoleChange(selectedValue);
                    }}
                    errorMessage={(errors.roles?.message as string) || ''}
                    name="roles"
                    showEllipse
                    isDisabled={isProviderPortal}
                  />
                </>
              )}
            />
          </Grid>
          {roles && Array.isArray(roles) && isProviderRole(roles) && (
            <>
              <Grid size={{ xs: 12, sm: 6 }}>
                <CustomLabel label={settingConstants.PROVIDER_TYPE} isRequired />
                <Controller
                  control={control}
                  name="providerType"
                  render={({ field }) => (
                    <CustomSelect
                      {...field}
                      placeholder={settingConstants.SELECT_PROVIDER_TYPE}
                      hasError={!!errors.providerType}
                      errorMessage={(errors.providerType?.message as string) || ''}
                      items={providerTypeList}
                      onChange={e => {
                        field.onChange(e);
                      }}
                    />
                  )}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <CustomLabel label={settingConstants.SPECIALITY} isRequired />
                <Controller
                  control={control}
                  name="specialities"
                  render={({ field }) => (
                    <CustomAutoMultiSelect
                      {...field}
                      placeholder={settingConstants.SELECT_SPECIALITY}
                      options={formattedSpecialityTypes}
                      value={(field.value as string[]) || []}
                      onChange={selectedValue => {
                        field.onChange(selectedValue);
                      }}
                      errorMessage={(errors.specialities?.message as string) || ''}
                      name="specialities"
                      showEllipse
                    />
                  )}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <CustomLabel label={settingConstants.GENDER} isRequired />
                <Controller
                  control={control}
                  name="gender"
                  render={({ field }) => (
                    <CustomSelect
                      {...field}
                      items={genderList}
                      placeholder={settingConstants.SELECT_GENDER}
                      hasError={!!errors.gender}
                      onChange={e => {
                        field.onChange(e);
                      }}
                      errorMessage={(errors.gender?.message as string) || ''}
                    />
                  )}
                ></Controller>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <CustomLabel label={ClinicianFormLabels.NPI_NUMBER} isRequired />
                <Controller
                  control={control}
                  name="npiNumber"
                  render={({ field }) => (
                    <CustomInput
                      placeholder={ClinicianFormPlaceholders.ENTER_NPI_NUMBER}
                      {...field}
                      hasError={!!errors.npiNumber}
                      errorMessage={(errors.npiNumber?.message as string) || ''}
                      onChange={e => {
                        field.onChange(e);
                      }}
                      isNumeric
                    />
                  )}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <CustomLabel label={settingConstants.YR_OF_EXP} />
                <Controller
                  control={control}
                  name="workExperience"
                  render={({ field }) => (
                    <CustomInput
                      placeholder={settingConstants.ENTER_YR_OF_EXP}
                      {...field}
                      hasError={!!errors.workExperience}
                      errorMessage={(errors.workExperience?.message as string) || ''}
                    />
                  )}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <CustomLabel label="Languages Spoken" />
                <Controller
                  control={control}
                  name="languagesSpoken"
                  render={({ field }) => (
                    <CustomInput
                      placeholder="Enter Languages Spoken"
                      {...field}
                      onChange={e => {
                        field.onChange(e);
                      }}
                      hasError={!!errors.languagesSpoken}
                      errorMessage={(errors.languagesSpoken?.message as string) || ''}
                    />
                  )}
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <CustomLabel label="Provider Bio" />
                <Controller
                  control={control}
                  name="bio"
                  render={({ field }) => (
                    <CustomTextArea
                      placeholder="Enter Bio"
                      {...field}
                      hasError={!!errors.bio}
                      errorMessage={(errors.bio?.message as string) || ''}
                      minRow={3}
                    />
                  )}
                />
              </Grid>

              {/* License Details Section */}
              <Grid size={{ xs: 12 }}>
                <Grid container spacing={2}>
                  <Grid
                    size={{ xs: 12 }}
                    display={'flex'}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                  >
                    <Typography variant="bodyBold4" fontWeight="bold">
                      License Details
                    </Typography>
                    <CustomButton
                      label="Add License"
                      variant="filled"
                      startIcon={<AddIcon />}
                      onClick={addLicenseDetail}
                      type="button"
                    />
                  </Grid>

                  {licenseDetails?.length === 0 && (
                    <Grid size={{ xs: 12 }}>
                      <Grid size={{ xs: 12, sm: 4 }}>
                        <CustomLabel label={settingConstants.LICENSE_STATES} isRequired />
                        <CustomSelect
                          value=""
                          items={getAvailableStateOptions()}
                          placeholder={settingConstants.SELECT_LICENSE_STATES}
                          hasError={true}
                          errorMessage={ValidationMessages.LICENCED_STATE_REQUIRED}
                          onChange={e => {
                            // When state is selected, add a new license detail
                            const newLicenseDetail: LicenseDetail = {
                              licenseState: {
                                uuid: e.target.value,
                                state:
                                  listOfStateOptions.find(option => option.value === e.target.value)
                                    ?.label || '',
                                country: 'US',
                              },
                              licenseNumber: '',
                              licenseExpiryDate: '',
                            };
                            const updatedLicenseDetails = [newLicenseDetail];
                            setLicenseDetails(updatedLicenseDetails);
                            setValue('licenseDetails', updatedLicenseDetails, {
                              shouldValidate: true,
                            });
                          }}
                        />
                      </Grid>
                    </Grid>
                  )}

                  {licenseDetails?.map((license, index) => (
                    <Grid key={index} size={{ xs: 12 }}>
                      <Grid container spacing={2} alignItems="flex-start">
                        <Grid size={{ xs: 12, sm: 3 }}>
                          <CustomLabel label={settingConstants.LICENSE_STATES} isRequired />
                          <CustomSelect
                            value={license.licenseState.uuid}
                            items={getAvailableStateOptions(index)}
                            placeholder={settingConstants.SELECT_LICENSE_STATES}
                            hasError={
                              !!(
                                errors.licenseDetails &&
                                Array.isArray(errors.licenseDetails) &&
                                errors.licenseDetails[index]?.licenseState
                              ) || !license.licenseState.uuid
                            }
                            errorMessage={
                              (errors.licenseDetails &&
                                Array.isArray(errors.licenseDetails) &&
                                errors.licenseDetails[index]?.licenseState?.message) ||
                              (!license.licenseState.uuid
                                ? ValidationMessages.LICENCED_STATE_REQUIRED
                                : '')
                            }
                            onChange={e =>
                              updateLicenseDetail(index, 'licenseState', e.target.value)
                            }
                          />
                        </Grid>

                        {license.licenseState.uuid && (
                          <>
                            <Grid size={{ xs: 12, sm: 4 }}>
                              <CustomLabel label={settingConstants.LICENSE_NUMBER} isRequired />
                              <CustomInput
                                value={license.licenseNumber}
                                placeholder={settingConstants.ENTER_LICENSE_NUMBER}
                                hasError={
                                  !!(
                                    errors.licenseDetails &&
                                    Array.isArray(errors.licenseDetails) &&
                                    errors.licenseDetails[index]?.licenseNumber
                                  ) || !license.licenseNumber?.trim()
                                }
                                errorMessage={
                                  (errors.licenseDetails &&
                                    Array.isArray(errors.licenseDetails) &&
                                    errors.licenseDetails[index]?.licenseNumber?.message) ||
                                  (!license.licenseNumber?.trim()
                                    ? ValidationMessages.LICENSE_NUMBER_REQUIRED
                                    : '')
                                }
                                onChange={e =>
                                  updateLicenseDetail(index, 'licenseNumber', e.target.value)
                                }
                              />
                            </Grid>

                            <Grid size={{ xs: 12, sm: 4 }}>
                              <CustomLabel
                                label={settingConstants.LICENSE_EXPIRY_DATE}
                                isRequired
                              />
                              <CustomDatePicker
                                value={license.licenseExpiryDate}
                                placeholder={settingConstants.ENTER_LICENSE_EXPIRY_DATE}
                                hasError={
                                  !!(
                                    errors.licenseDetails &&
                                    Array.isArray(errors.licenseDetails) &&
                                    errors.licenseDetails[index]?.licenseExpiryDate
                                  ) || !license.licenseExpiryDate
                                }
                                errorMessage={
                                  (errors.licenseDetails &&
                                    Array.isArray(errors.licenseDetails) &&
                                    errors.licenseDetails[index]?.licenseExpiryDate?.message) ||
                                  (!license.licenseExpiryDate
                                    ? ValidationMessages.LICENSE_EXPIRY_DATE_REQUIRED
                                    : '')
                                }
                                handleDateChange={(date: string) =>
                                  updateLicenseDetail(index, 'licenseExpiryDate', date)
                                }
                              />
                            </Grid>
                          </>
                        )}

                        <Grid
                          size={{ xs: 12, sm: 1 }}
                          display="flex"
                          alignItems="center"
                          sx={{ mt: 3.5 }}
                        >
                          <IconButton
                            size="small"
                            onClick={() => removeLicenseDetail(index)}
                            color="error"
                            sx={{
                              color: '#f44336',
                              padding: '4px',
                              '&:hover': {
                                backgroundColor: 'rgba(244, 67, 54, 0.1)',
                              },
                            }}
                          >
                            <Delete fontSize="small" />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </>
          )}

          {/* Clinic Dropdown Section - Show for FRONTDESK, BILLER, PHYSICIAN, NURSE, THERAPIST */}
          {roles && Array.isArray(roles) && shouldShowClinicDropdown(roles) && (
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography variant="bodyBold4" fontWeight="bold" sx={{ mb: 1 }}>
                Clinics
              </Typography>
              <Controller
                control={control}
                name="clinics"
                render={({ field }) => (
                  <CustomClinicSelect
                    {...field}
                    options={getAvailableClinicOptions()}
                    selectedValue={getSelectedClinics()}
                    onValueAdd={addClinic}
                    onValueRemove={removeClinic}
                    placeholder="Select Clinic"
                    hasError={!!errors.clinics}
                    errorMessage={(errors.clinics?.message as string) || ''}
                    hideDropdown={isProviderPortal ? true : false}
                    noRecords={!isEdit ? true : false}
                    onInputChange={handleInputChange}
                  />
                )}
              />
            </Grid>
          )}

          <Grid size={{ xs: 12 }} mb={4}>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', alignItems: 'center' }}>
              <CustomButton variant="outlined" onClick={onClose} label={settingConstants.CANCEL} />
              <CustomButton variant="filled" type="submit" label={settingConstants.SAVE} />
            </Box>
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  );
};

export default AdminUserForm;
