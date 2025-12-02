import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Box, Typography, Grid, Chip, Paper, Stack } from '@mui/material';
import CustomDrawer from '../../../../../../components/core/reusable/custom-drawer/custom-drawer';
import ClinicForm from './new-clinic/new-clinic';
import { clinicConstants } from '../../../../../../constants/admin-constants';
import { useAppSelector } from '../../../../../../redux/hooks';
import { formatPhoneNumber } from 'src/utils/toCamelCase';
import { ClinicFormLabels } from 'src/constants/formConst';
import { ClinicControllerService } from 'src/sdk/requests';
import { useQuery } from '@tanstack/react-query';
import { getDataFromLocalStorage } from 'src/sdk/requests/core/localStorage';
import { hideLoader, showLoader } from 'src/redux/reducers/loaderReducer';
import { providerConstants } from 'src/constants/patients-constants';

let globalRefetchClinicDetailsFunction: (() => void) | null = null;

export const setGlobalRefetchClinicDetailsFunction = (refetchFn: () => void) => {
  globalRefetchClinicDetailsFunction = refetchFn;
};

export const getGlobalRefetchClinicDetailsFunction = () => globalRefetchClinicDetailsFunction;

const ClinicDetails = () => {
  const dispatch = useDispatch();
  const { uuid } = useParams();
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [_, setClinicUuid] = useState('');

  const selectedClinic = useAppSelector((state: any) => state.clinicReducer?.data);
  const getClinicId = () => {
    const role = getDataFromLocalStorage('roles');

    if (role && role.includes('SUPER_ADMIN')) {
      return uuid || '';
    } else {
      const localStorageClinicId =
        getDataFromLocalStorage('selectedClinicUuid')?.replace(/"/g, '') || '';
      return localStorageClinicId;
    }
  };

  const clinicId = getClinicId();

  const {
    data: clinicDetailsData,
    isLoading: isLoadingClinicDetails,
    refetch: refetchClinicDetails,
  } = useQuery({
    queryKey: ['clinicDetailsData', clinicId],
    queryFn: () =>
      ClinicControllerService.getApiMasterClinicByClinicId({
        clinicId: clinicId || getDataFromLocalStorage('selectedClinicUuid')?.replace(/"/g, '') || '',
      }),
  });

  const clinicData = clinicDetailsData?.data || selectedClinic;

  const specialitiesList = (() => {
    try {
      if (!clinicData?.specialities) return [];

      if (typeof clinicData?.specialities === 'object' && clinicData?.specialities !== null) {
        const values = Object.values(clinicData?.specialities);
        return values.filter(val => val && typeof val === 'string');
      }

      return [];
    } catch (error) {
      return [];
    }
  })();

  useEffect(() => {
    if (isLoadingClinicDetails) {
      dispatch(showLoader());
    } else {
      dispatch(hideLoader());
    }
  }, [isLoadingClinicDetails]);

  useEffect(() => {
    const initialClinicId = getDataFromLocalStorage('selectedClinicUuid')?.replace(/"/g, '') || '';
    setClinicUuid(initialClinicId);
    refetchClinicDetails();
  }, []);

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'selectedClinicUuid') {
        const newClinicId = e.newValue?.replace(/"/g, '') || '';
        setClinicUuid(newClinicId);
        refetchClinicDetails();
      }
    };

    const handleClinicChanged = (e: CustomEvent) => {
      const newClinicId = e.detail?.clinicId || '';
      setClinicUuid(newClinicId);
      refetchClinicDetails();
    };
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('clinicChanged', handleClinicChanged as EventListener);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('clinicChanged', handleClinicChanged as EventListener);
    };
  }, []);

  useEffect(() => {
    setGlobalRefetchClinicDetailsFunction(refetchClinicDetails);

    return () => {
      setGlobalRefetchClinicDetailsFunction(() => {});
    };
  }, [refetchClinicDetails]);

  useEffect(() => {
    const handleClinicUuidChange = () => {
      if (uuid) {
        setClinicUuid(uuid);
        refetchClinicDetails();
      }
    };
    window.addEventListener('clinicChanged', handleClinicUuidChange);
    return () => {
      window.removeEventListener('clinicChanged', handleClinicUuidChange);
    };
  }, []);

  const clinicInfo = [
    {
      label: ClinicFormLabels.GROUP_NPI_NUMBER,
      value: String(clinicData?.groupNpiNumber || ''),
    },
    {
      label: ClinicFormLabels.WEBSITE,
      value: String(clinicData?.website || ''),
    },
    {
      label: ClinicFormLabels.CONTACT_NUMBER,
      value: `${formatPhoneNumber(clinicData?.phone)}`,
    },
    {
      label: ClinicFormLabels.EMAIL_ID,
      value: String(clinicData?.email || ''),
    },
  ];

  const clinicBasicInfo = [
    { label: ClinicFormLabels.CLINIC_FAX_NUMBER, value: String(clinicData?.fax || '') },
    {
      label: ClinicFormLabels.PHYSICAL_ADDRESS,
      value: (() => {
        try {
          const address = clinicData?.physicalAddress;
          if (!address) return '';

          const parts = [
            address.line1,
            address.line2,
            address.city,
            address.state,
            address.zipcode,
            address.country,
          ].filter(part => part && typeof part === 'string');

          return parts.length > 0 ? parts.join(', ') : '';
        } catch (error) {
          console.error('Error processing physical address:', error);
          return '';
        }
      })(),
    },
    {
      label: ClinicFormLabels.BILLING_ADDRESS,
      value: (() => {
        try {
          const address = clinicData?.billingAddress;
          if (!address) return '';

          const parts = [
            address.line1,
            address.line2,
            address.city,
            address.state,
            address.zipcode,
            address.country,
          ].filter(part => part && typeof part === 'string');

          return parts.length > 0 ? parts.join(', ') : '';
        } catch (error) {
          console.error('Error processing billing address:', error);
          return '';
        }
      })(),
    },
    {
      label: ClinicFormLabels.CLINIC_DESCRIPTION,
      value: String(clinicData?.description || selectedClinic?.description || ''),
    },
  ];

  return (
    <>
      {clinicData != null ? (
        <Box>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 3.5 }} paddingTop={2}>
              <Paper sx={{ borderRadius: 1, p: 2, gap: 2 }}>
                <Box pb={1}>
                  <Stack spacing={1}>
                    <Typography variant="h5Bold" color="Neutral.90">
                      {String(clinicData?.name || '')}
                    </Typography>

                    {specialitiesList?.length > 0 ? (
                      <Stack direction="row" spacing={1.5} flexWrap="wrap" useFlexGap>
                        {specialitiesList?.map((speciality, index) => (
                          <Chip
                            key={index}
                            label={String(speciality)}
                            sx={{
                              backgroundColor: '#F0FAFF',
                              color: 'Primary.main',
                              fontWeight: 'bold',
                              width: 'fit-content',
                            }}
                          />
                        ))}
                      </Stack>
                    ) : null}
                  </Stack>
                </Box>
                <Grid container spacing={1}>
                  {clinicInfo?.map(item => (
                    <Grid
                      size={{ xs: 12 }}
                      key={item.label}
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        gap: 2,
                        wordBreak: 'break-word',
                      }}
                    >
                      <Typography
                        variant="titleMedium4"
                        color="Neutral.70"
                        sx={{ width:130 }}
                      >
                        {item.label}
                      </Typography>
                      <Typography>:</Typography>
                      <Typography variant="titleMedium4">{item.value}</Typography>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </Grid>

            <Grid size={{ xs: 12, md: 8.5 }} pt={2}>
              <Paper
                sx={{
                  borderRadius: 1,
                  p: 2,
                  gap: 2,
                  backgroundColor: 'Base.white',
                }}
              >
                <Box display="flex" justifyContent="space-between" alignItems="center" pb={3}>
                  <Typography variant="titleSemiBold2" color="Primary.main">
                    {clinicConstants.BASIC_INFORMATION}
                  </Typography>
                </Box>

                <Grid container spacing={2}>
                  {clinicBasicInfo?.map((item, index) => (
                    <Grid
                      key={index}
                      size={{
                        xs: 12,
                      }}
                    >
                      <Box display="flex" flexDirection="row" gap={2}>
                        <Typography
                          variant="titleMedium4"
                          color="Neutral.70"
                          sx={{ width:130 }}
                        >
                          {item.label}
                        </Typography>
                        <Typography>:</Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                          {Array.isArray(item?.value) ? (
                            item.value?.map((line, idx) => (
                              <Typography key={idx} variant="titleMedium4">
                                {line}
                              </Typography>
                            ))
                          ) : (
                            <Typography variant="titleMedium4">{item.value}</Typography>
                          )}
                        </Box>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      ) : clinicData === null && !isLoadingClinicDetails ? (
        <Grid display={'flex'} justifyContent={'center'}>
          <Typography variant="titleMedium3">{providerConstants.NO_CLINICS_ASSOCIATED}</Typography>
        </Grid>
      ) : (
        ''
      )}

      <CustomDrawer
        title={providerConstants.EDIT_CLINIC}
        anchor="right"
        open={openEditDialog}
        onClose={() => {
          setOpenEditDialog(false);
          setIsEditMode(false);
        }}
        drawerPadding="18px"
      >
        <ClinicForm
          onClose={() => {
            setOpenEditDialog(false);
            setIsEditMode(false);
            const refetchFunction = getGlobalRefetchClinicDetailsFunction();
            if (refetchFunction) {
              refetchFunction();
            }
          }}
          RefetchClinicData={() => {
            const refetchFunction = getGlobalRefetchClinicDetailsFunction();
            if (refetchFunction) {
              refetchFunction();
            }
          }}
          initialData={clinicData}
          isEdit={isEditMode}
          uuid={clinicId}
        />
      </CustomDrawer>
    </>
  );
};

export default ClinicDetails;
