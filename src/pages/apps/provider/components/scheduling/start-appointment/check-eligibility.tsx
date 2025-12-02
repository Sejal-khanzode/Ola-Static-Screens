import { Grid } from '@mui/material';
import CustomLabel from 'src/components/core/reusable/custom-label/custom-label';
import { EligibilityLables } from 'src/constants/setting-constants';
import { formsConstants } from 'src/constants/patients-constants';

import { Controller, useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import {
  AppointmentType,
  AppointmentTypeManagementService,
  PatientInsuranceControllerService,
  ProviderControllerService,
} from 'src/sdk/requests';
import CustomAutoComplete from 'src/components/core/reusable/custom-auto-complete/custom-auto-complete';
import { useEffect, useState } from 'react';
import { getDataFromLocalStorage } from 'src/sdk/requests/core/localStorage';
import CustomButton from 'src/components/core/reusable/custom-button/custom-button';

interface CheckEligibilityProps {
  appointmentData: any;
}

const CheckEligibility = (props: CheckEligibilityProps) => {
  const { appointmentData } = props;
  const [, setDrawerOpen] = useState(false);
  const clinicId = getDataFromLocalStorage('selectedClinicUuid')?.replace(/"/g, '') || '';
  const [, setApptTypeSelected] = useState('');
  const [appointmentTypesList, setAppointmentTypesList] = useState<
    { key: string; value: string }[]
  >([]);
  const [insuranceList, setInsuranceList] = useState<{ key: string; value: string }[]>([]);
  const [providersList, setProvidersList] = useState<{ key: string; value: string }[]>([]);

  const [, setProviderSelected] = useState('');
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  const { data: patienInusrancetData } = useQuery({
    queryKey: ['InusrancetData', appointmentData.patientClinicId],
    queryFn: () =>
      PatientInsuranceControllerService.getApiMasterPatientInsurancePatientClinicByPatientClinicUuid(
        {
          patientClinicUuid: appointmentData?.patientClinicId,
          archive: false,
        }
      ),
  });

  console.log('patienInusrancetData', patienInusrancetData?.data);

  const { data: providerAPIData } = useQuery({
    queryKey: ['providerData'],
    queryFn: () =>
      ProviderControllerService.getApiMasterProvider({
        clinicId: clinicId,
        archive: false,
        status: true,
      }),
  });

  const { data: appointmentTypesData } = useQuery({
    queryKey: ['appointmentTypesAPIData'],
    queryFn: () => AppointmentTypeManagementService.getApiMasterAppointmentTypes({}),
  });

  const onSubmit = () => {};
  useEffect(() => {
    if (patienInusrancetData?.data && Array.isArray(patienInusrancetData.data)) {
      const insuranceList = patienInusrancetData.data.map((item: any, index: number) => ({
        key: item?.insuranceId || index,
        value: item?.insurancePayer?.payerName || 'Unknown Payer',
      }));

      setInsuranceList(insuranceList);
    }
  }, [patienInusrancetData]);

  useEffect(() => {
    if (providerAPIData?.data?.content && Array.isArray(providerAPIData.data.content)) {
      const apiData = providerAPIData.data.content.map((provider: any) => ({
        key: provider.uuid,
        value: `${provider.firstName} ${provider.lastName}`,
      }));
      setProvidersList(apiData);
    }
  }, [providerAPIData]);

  useEffect(() => {
    if (appointmentTypesData?.data?.content && Array.isArray(appointmentTypesData?.data?.content)) {
      const apiData = appointmentTypesData?.data?.content
        ?.filter((appointmentType: AppointmentType) => appointmentType.uuid)
        ?.map((appointmentType: AppointmentType) => ({
          key: appointmentType.uuid!,
          value: appointmentType.title,
        }));
      setAppointmentTypesList(apiData);
    }
  }, [appointmentTypesData]);
  console.log(appointmentTypesData);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={1}>
        <Grid size={12}>
          <CustomLabel label={EligibilityLables.APPOINTMENT_TYPE} isRequired />
          <Controller
            control={control}
            name="type"
            render={({ field }) => (
              <CustomAutoComplete
                placeholder={EligibilityLables.SELECT_APPT_TYPE}
                value={appointmentData.appointmentType}
                options={appointmentTypesList}
                onChange={selectedValue => {
                  field.onChange(selectedValue);
                  setApptTypeSelected(selectedValue);
                }}
                hasError={!!errors.type}
                errorMessage={errors.type?.message as string}
                autoname="type"
              />
            )}
          />
        </Grid>
        <Grid size={12}>
          <CustomLabel label={EligibilityLables.BILLING_CLINICIAN} isRequired />
          <Controller
            control={control}
            name="provider"
            render={({ field }) => (
              <CustomAutoComplete
                placeholder={EligibilityLables.SELECT_PROVIDER}
                value={field.value || ''}
                options={providersList}
                onChange={selectedValue => {
                  field.onChange(selectedValue);
                  setProviderSelected(selectedValue);
                }}
                hasError={!!errors.provider}
                errorMessage={errors.provider?.message as string}
                autoname="provider"
              />
            )}
          />
        </Grid>
        <Grid size={12}>
          <CustomLabel label={EligibilityLables.INSURANCE} isRequired />
          <Controller
            control={control}
            name="type"
            render={({ field }) => (
              <CustomAutoComplete
                placeholder={EligibilityLables.SELECT_INSURANCE}
                value={field.value || ''}
                options={insuranceList}
                onChange={selectedValue => {
                  field.onChange(selectedValue);
                  setApptTypeSelected(selectedValue);
                }}
                hasError={!!errors.type}
                errorMessage={errors.type?.message as string}
                autoname="type"
              />
            )}
          />
        </Grid>
        <Grid size={12}>
          <CustomLabel label={EligibilityLables.SERVICE_TYPE_CODE} isRequired />
          <Controller
            control={control}
            name="provider"
            render={({ field }) => (
              <CustomAutoComplete
                placeholder={EligibilityLables.SELECT_SERVICE}
                value={field.value || ''}
                options={providersList}
                onChange={selectedValue => {
                  field.onChange(selectedValue);
                  setProviderSelected(selectedValue);
                }}
                hasError={!!errors.provider}
                errorMessage={errors.provider?.message as string}
                autoname="provider"
              />
            )}
          />
        </Grid>

        <Grid size={12} display={'flex'} mt={1} gap={2} justifyContent={'flex-end'}>
          <CustomButton
            label={formsConstants.CANCEL}
            variant="outlined"
            onClick={() => {
              setDrawerOpen(true);
            }}
          />
          <CustomButton label={formsConstants.SEND} variant="filled" />
        </Grid>
      </Grid>
    </form>
  );
};

export default CheckEligibility;
