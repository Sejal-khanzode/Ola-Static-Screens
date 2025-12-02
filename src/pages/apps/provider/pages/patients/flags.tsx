import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Grid, Typography, Chip, Popover } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { AddIcon } from 'src/assets/icons/addIcon';
import CustomButton from 'src/components/core/reusable/custom-button/custom-button';
import CustomClinicSelect from 'src/components/core/reusable/custom-clinic-select/custom-clinic-select';
import CustomDialog from 'src/components/core/reusable/custom-dialog/custom-dialog';
import CustomLabel from 'src/components/core/reusable/custom-label/custom-label';
import { APIFeedbackMessages } from 'src/constants/formConst';
import {
  addPatientConstants,
  formsConstants,
  patientsConstants,
} from 'src/constants/patients-constants';
import useApiFeedback from 'src/hooks/useApiFeedback';
import { useAppDispatch } from 'src/redux/hooks';
import { hideLoader, showLoader } from 'src/redux/reducers/loaderReducer';
import { patientDetailsFlagSchema } from 'src/schema/flag-schema/flag-schema';
import { PatientFlagControllerService } from 'src/sdk/requests';
import { getDataFromLocalStorage } from 'src/sdk/requests/core/localStorage';

interface PatientFlagFormData {
  patientFlags: Array<{ key: string; value: string }>;
}

const flags = () => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const patientUUID = getDataFromLocalStorage('patientUUID');
  const [openEditFlagModal, setOpenEditFlagModal] = useState(false);
  const [popoverAnchorEl, setPopoverAnchorEl] = useState<null | HTMLElement>(null);
  const [popoverOpen, setPopoverOpen] = useState(false);

  const handleFlagPopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setPopoverAnchorEl(event.currentTarget);
    setPopoverOpen(true);
  };

  const handleFlagPopoverClose = () => {
    setPopoverAnchorEl(null);
    setPopoverOpen(false);
  };

  const {
    data: flags,
    isLoading: isLoadingFlags,
    refetch,
  } = useQuery({
    queryKey: ['patientFlagData'],
    queryFn: () =>
      PatientFlagControllerService.getApiMasterPatientFlag({
        archive: false,
        status: true,
      }),
  });

  const {
    mutate: updatePatientFlag,
    data: dataUpdatePatientFlag,
    isSuccess: isSuccessUpdatePatientFlag,
    isError: isErrorUpdatePatientFlag,
    error: errorUpdatePatientFlag,
  } = useMutation({
    mutationFn: (patientFlagUuids: string[]) =>
      PatientFlagControllerService.putApiMasterPatientFlagUpdatePatientClinic({
        requestBody: {
          patientClinicUuid: patientUUID || '',
          patientFlagUuids: patientFlagUuids,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['patientFlagData', patientUUID],
      });
      reset();
      setOpenEditFlagModal(false);
    },
  });

  const { data: patientFlagData } = useQuery({
    queryKey: ['patientFlagData', patientUUID],
    queryFn: () =>
      PatientFlagControllerService.getApiMasterPatientFlagPatientClinicByPatientClinicUuid({
        patientClinicUuid: patientUUID || '',
      }),
    enabled: !!patientUUID,
  });

  const displayedFlags = Array.isArray(patientFlagData?.data)
    ? patientFlagData.data.slice(0, 2)
    : [];
  const remainingFlags = Array.isArray(patientFlagData?.data) ? patientFlagData.data.slice(2) : [];

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<PatientFlagFormData>({
    resolver: yupResolver(patientDetailsFlagSchema) as any,
    defaultValues: {
      patientFlags: [],
    },
  });

  const selectedFlag = watch('patientFlags');

  const flagData = Array.isArray(flags?.data?.content) ? flags.data.content : [];

  const availableFlags = useMemo(() => {
    if (!Array.isArray(flagData)) return [];

    return flagData
      .filter((flag: any) => !selectedFlag.some(selected => selected.key === flag.uuid))
      .map((flag: any) => ({
        key: flag.uuid,
        value: flag.name,
      }));
  }, [flagData, selectedFlag]);

  useEffect(() => {
    if (Array.isArray(patientFlagData?.data)) {
      const initialSelectedFlags = patientFlagData.data.map((flag: any) => ({
        key: flag.uuid,
        value: flag.name,
      }));
      reset({
        patientFlags: initialSelectedFlags,
      });
    }
  }, [patientFlagData, reset]);

  useEffect(() => {
    if (openEditFlagModal && Array.isArray(patientFlagData?.data)) {
      const initialSelectedFlags = patientFlagData.data.map((flag: any) => ({
        key: flag.uuid,
        value: flag.name,
      }));
      reset({
        patientFlags: initialSelectedFlags,
      });
    }
  }, [openEditFlagModal, patientFlagData, reset]);

  const onSubmit = (data: PatientFlagFormData) => {
    const patientFlagUuids = data.patientFlags.map(flag => flag.key);
    updatePatientFlag(patientFlagUuids);
  };

  useEffect(() => {
    if (isLoadingFlags) {
      dispatch(showLoader);
    } else {
      dispatch(hideLoader);
    }
  }, [isLoadingFlags]);

  useEffect(() => {
    if (isSuccessUpdatePatientFlag) {
      refetch();
    }
  }, [isSuccessUpdatePatientFlag]);

  useApiFeedback(
    isErrorUpdatePatientFlag,
    errorUpdatePatientFlag,
    isSuccessUpdatePatientFlag,
    (dataUpdatePatientFlag?.message?.data ||
      APIFeedbackMessages.PATIENT_FLAG_UPDATED_SUCCESSFULLY) as string
  );

  return (
    <Grid display={'flex'} justifyContent={'flex-end'} gap={2} width={'100%'}>
      <Grid
        sx={{
          display: 'flex',
          flexDirection: 'column',
          opacity: 1,
        }}
        width={'100%'}
      >
        <Grid display="flex" alignItems="center" gap={1}>
          <Grid
            onClick={() => setOpenEditFlagModal(true)}
            sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', gap: 1 }}
          >
            <AddIcon fontSize="small" color={'Neutral.70'} />
            <Typography variant="bodyMedium4">{addPatientConstants.FLAGS}</Typography>
          </Grid>
          <Grid>
            {displayedFlags.map((flag: any, index: number) => (
              <Box
                key={index}
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  border: `1px solid ${flag.hexColor}`,
                  backgroundColor: `${flag.hexColor}10`,
                  borderRadius: '16px',
                  px: 0.8,
                  m: 0.25,
                }}
              >
                <Typography
                  variant="bodyMedium4"
                  sx={{
                    color: flag.hexColor,
                  }}
                >
                  {flag.name}
                </Typography>
              </Box>
            ))}

            {remainingFlags.length > 0 && (
              <>
                <Chip
                  label={`+${remainingFlags.length}`}
                  onClick={handleFlagPopoverOpen}
                  sx={{
                    border: '1px solid #ccc',
                    backgroundColor: '#f5f5f5',
                    borderRadius: '16px',
                    fontSize: '0.75rem',
                    height: '24px',
                    cursor: 'pointer',
                    m: '2px',
                  }}
                />

                <Popover
                  open={popoverOpen}
                  anchorEl={popoverAnchorEl}
                  onClose={handleFlagPopoverClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  disableRestoreFocus
                  slotProps={{
                    paper: {
                      sx: {
                        p: 1,
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '4px',
                        maxWidth: 250,
                        cursor: 'default',
                      },
                    },
                  }}
                >
                  {remainingFlags.map((flag: any, index: number) => (
                    <Box
                      key={index}
                      sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        border: `1px solid ${flag.hexColor}`,
                        backgroundColor: `${flag.hexColor}10`,
                        borderRadius: '16px',
                        px: 0.8,
                        py: 0.2,
                      }}
                    >
                      <Typography
                        variant="bodyMedium4"
                        sx={{
                          color: flag.hexColor,
                        }}
                      >
                        {flag.name}
                      </Typography>
                    </Box>
                  ))}
                </Popover>
              </>
            )}
          </Grid>
        </Grid>

        <CustomDialog
          open={openEditFlagModal}
          onClose={() => {
            setOpenEditFlagModal(false);
          }}
          title={patientsConstants.EDIT_PATIENT_FLAG}
          width="30vw"
          height="40vh"
          overFlow="none"
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box
              sx={{ display: 'flex', flexDirection: 'column', height: '100%', paddingBottom: 2 }}
            >
              <Box sx={{ flex: 1 }}>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12 }}>
                    <CustomLabel label={patientsConstants.PATIENT_FLAG} />
                    <Controller
                      control={control}
                      name="patientFlags"
                      render={({ field }) => (
                        <CustomClinicSelect
                          placeholder={patientsConstants.SELECT_PATIENT_FLAG}
                          options={availableFlags}
                          selectedValue={field.value}
                          onValueAdd={(value: string) => {
                            const newFlag = flagData.find((flag: any) => flag.uuid === value);
                            if (newFlag) {
                              const updatedFlags = [
                                ...field.value,
                                { key: newFlag.uuid, value: newFlag.name },
                              ];
                              field.onChange(updatedFlags);
                            }
                          }}
                          onValueRemove={(value: string) => {
                            const updatedFlags = field.value.filter(
                              (flag: any) => flag.key !== value
                            );
                            field.onChange(updatedFlags);
                          }}
                          noRecords={true}
                          hasError={!!errors.patientFlags}
                          errorMessage={errors.patientFlags?.message}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </Box>

              <Box
                sx={{
                  position: 'sticky',
                  backgroundColor: 'white',
                  paddingTop: 2,
                  borderTop: '1px solid #e0e0e0',
                  marginTop: 'auto',
                }}
              >
                <Grid container justifyContent="flex-end">
                  <Grid>
                    <CustomButton label={formsConstants.SAVE} variant="filled" type="submit" />
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </form>
        </CustomDialog>
      </Grid>
    </Grid>
  );
};

export default flags;
