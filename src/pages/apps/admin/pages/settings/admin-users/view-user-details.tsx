import React, { useEffect } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { settingConstants } from 'src/constants/admin-constants';
import { ClinicianFormLabels } from 'src/constants/formConst';
import { formatPhoneNumber, toCamelCase } from 'src/utils/toCamelCase';
import { User } from 'src/sdk/requests/types.gen';
import { useQuery } from '@tanstack/react-query';
import { UserControllerService } from 'src/sdk/requests/services.gen';
import { showLoader, hideLoader } from 'src/redux/reducers/loaderReducer';
import { useAppDispatch } from 'src/redux/hooks';

interface DataViewProps {
  dataView: User;
}

const PROVIDER_PROFILE = {
  basicInfo: 'Basic Information',
  licensedDetails: 'Licensed Details',
  clinicsDetails: 'Clinics',
} as const;

interface DetailRowProps {
  label: string;
  value: string | React.ReactNode;
  gridSize?: { xs: number; md: number };
}

const ViewUserDetails = (props: DataViewProps) => {
  const { dataView } = props;
  const uuid = dataView.uuid;
  const dispatch = useAppDispatch();

  const {
    data: userData,
    isLoading: isLoadingUser,
    isFetching: isFetchingUser,
  } = useQuery({
    queryKey: ['AdminUserData', uuid],
    queryFn: () => {
      return UserControllerService.getApiMasterUserByUserId({
        userId: uuid || '',
      });
    },
    enabled: !!uuid,
  });

  const formatValue = (value: any): string => {
    if (!value) return '-';
    if (typeof value === 'object' && value !== null) {
      return JSON.stringify(value) === '{}' ? '-' : JSON.stringify(value);
    }
    return String(value);
  };

  const formatRoles = (roles: any): string => {
    if (!roles) return '-';
    if (typeof roles === 'object' && Object.keys(roles)?.length === 0) return '-';
    return Object.values(roles)
      .map(role => toCamelCase(role as string))
      .join(', ');
  };

  const DetailRow: React.FC<DetailRowProps> = ({ label, value, gridSize = { xs: 6, md: 6 } }) => (
    <Grid size={gridSize}>
      <Box display="flex" flexDirection="row" alignItems="flex-start" gap={1} mb={0.5}>
        <Grid size={4.5}>
          <Typography variant="titleMedium4" color="Neutral.70">
            {label}
          </Typography>
        </Grid>
        <Grid>
          <Typography>:</Typography>
        </Grid>
        <Grid size={8}>
          {typeof value === 'string' ? (
            <Typography variant="titleMedium4">{value}</Typography>
          ) : (
            value
          )}
        </Grid>
      </Box>
    </Grid>
  );

  const specialityFormat = (specialities: any) => {
    if (!specialities) return '-';
    if (typeof specialities === 'object' && Object.keys(specialities)?.length === 0) return '-';
    return Object.values(specialities).join(', ');
  };

  const userdata = userData?.data;

  useEffect(() => {
    if (isLoadingUser || isFetchingUser) {
      dispatch(showLoader());
    } else {
      dispatch(hideLoader());
    }
  }, [isLoadingUser, isFetchingUser, dispatch]);

  const providerRoles = ['PHYSICIAN', 'THERAPIST', 'NURSE'];

  const isProvider =
    Array.isArray(userdata?.roles) &&
    userdata?.roles.some(role => providerRoles.includes(role.toUpperCase()));

  const basicInfoFields = isProvider
    ? [
        {
          label: settingConstants.NAME,
          value:
            userdata?.firstName && userdata?.lastName
              ? formatValue(`${userdata?.firstName} ${userdata?.lastName}`)
              : '',
        },
        {
          label: settingConstants.PROVIDER_TYPE,
          value: userdata?.providerType ? formatValue(userdata?.providerType) : '-',
        },
        {
          label: settingConstants.ROLE,
          value: userdata?.roles ? formatRoles(userdata?.roles) : '-',
        },
        {
          label: settingConstants.GENDER,
          value: userdata?.gender ? toCamelCase(userdata?.gender as string) : '-',
        },
        {
          label: settingConstants.CONTACT,
          value: userdata?.phone ? formatPhoneNumber(userdata?.phone as string) : '-',
        },
        {
          label: settingConstants.EMAIL,
          value: userdata?.email ? formatValue(userdata?.email) : '-',
        },
        {
          label: ClinicianFormLabels.NPI_NUMBER,
          value: userdata?.npi ? formatValue(userdata?.npi) : '-',
        },
        {
          label: settingConstants.LANGUAGE,
          value: userdata?.languagesSpoken ? formatValue(userdata?.languagesSpoken) : '-',
        },
      ]
    : [
        {
          label: settingConstants.NAME,
          value:
            userdata?.firstName && userdata?.lastName
              ? formatValue(`${userdata?.firstName} ${userdata?.lastName}`)
              : '',
        },
        {
          label: settingConstants.EMAIL,
          value: userdata?.email ? formatValue(userdata?.email) : '-',
        },
        {
          label: settingConstants.ROLE,
          value: userdata?.roles ? formatRoles(userdata?.roles) : '-',
        },
        {
          label: settingConstants.CONTACT,
          value: userdata?.phone ? formatPhoneNumber(userdata?.phone as string) : '-',
        },
      ];

  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12 }}>
        <Grid container spacing={1}>
          {basicInfoFields?.map((field, index) => (
            <Grid size={{ xs: 12, md: 6 }} key={index}>
              <Grid container spacing={0.5} alignItems="center">
                <Grid size={{ xs: 4 }}>
                  <Typography variant="bodyBold4" color="text.secondary" sx={{ minWidth: '120px' }}>
                    {field.label}
                  </Typography>
                </Grid>
                <Grid>
                  <Typography variant="bodyBold4" color="text.secondary" sx={{ minWidth: '120px' }}>
                    :
                  </Typography>
                </Grid>
                <Grid size={{ xs: 7 }}>
                  <Typography variant="titleMedium4" sx={{ fontWeight: 'bold' }}>
                    {field.value || '-'}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Grid>

      {isProvider && (
        <>
          <Grid size={{ xs: 12 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
              <Typography variant="titleSemiBold2" color="Primary.main">
                {PROVIDER_PROFILE.basicInfo}
              </Typography>
            </Box>

            <Box display="flex" flexDirection="row" gap={2}>
              <DetailRow
                label={settingConstants.SPECIALTIES}
                value={specialityFormat(userdata?.specialities)}
              />
              <DetailRow
                label={settingConstants.WORK_EXP}
                value={formatValue(userdata?.workExperience)}
              />
            </Box>
            <Box display="flex" flexDirection="row" gap={2}>
              <DetailRow label={settingConstants.BIO} value={formatValue(userdata?.bio)} />
            </Box>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Box>
              <Grid size={{ xs: 12, md: 12 }}>
                <Box display="flex" flexDirection="column" gap={1} mb={0.5}>
                  <Typography variant="titleSemiBold2" color="Primary.main">
                    {PROVIDER_PROFILE.licensedDetails}
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    {userdata?.licenceDetails &&
                    Array.isArray(userdata?.licenceDetails) &&
                    userdata?.licenceDetails?.length > 0 ? (
                      (userdata?.licenceDetails as any[])?.map((item: any, idx: number) => (
                        <Grid
                          container
                          spacing={2}
                          key={`${item.licenseState.uuid || item.licenseState.state}-${idx}`}
                        >
                          <Grid size={{ xs: 12, md: 4 }} display={'flex'} gap={1}>
                            <Grid size={6}>
                              <Typography variant="bodyMedium4" color="Neutral.70">
                                {settingConstants.LICENSE_NUMBER}
                              </Typography>
                            </Grid>
                            <Grid>:</Grid>
                            <Grid>
                              <Typography variant="titleMedium4" color="Base.black">
                                {item.licenseNumber || '-'}
                              </Typography>
                            </Grid>
                          </Grid>
                          <Grid size={{ xs: 12, md: 4 }} display={'flex'} gap={1}>
                            <Grid size={6}>
                              <Typography variant="bodyMedium4" color="Neutral.70">
                                {settingConstants.LICENSE_STATE}
                              </Typography>
                            </Grid>
                            <Grid>:</Grid>
                            <Grid>
                              <Typography variant="titleMedium4" color="Base.black">
                                {item.licenseState.state || '-'}{' '}
                              </Typography>
                            </Grid>
                          </Grid>
                          <Grid size={{ xs: 12, md: 4 }} display={'flex'} gap={1}>
                            <Grid size={6}>
                              <Typography variant="bodyMedium4" color="Neutral.70">
                                {settingConstants.LICENSE_EXPIRY_DATE}
                              </Typography>
                            </Grid>
                            <Grid>:</Grid>
                            <Grid>
                              <Typography variant="titleMedium4" color="Base.black">
                                {item.licenseExpiryDate || '-'}
                              </Typography>
                            </Grid>
                           
                          </Grid>
                        </Grid>
                      ))
                    ) : (
                      <Typography variant="titleMedium4">-</Typography>
                    )}
                  </Box>
                </Box>
              </Grid>
            </Box>
          </Grid>
        </>
      )}

      <Grid>
        <Typography variant="titleSemiBold2" color="Primary.main">
          {PROVIDER_PROFILE.clinicsDetails}
        </Typography>
        <Box sx={{ mt: 1 }}>
          <Box sx={{ pl: 2 }}>
            {userdata?.clinics ? (
              Object.entries(userdata?.clinics as Record<string, string>)?.map(([key, value]) => (
                <Box
                  key={key}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    py: 0.5,
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body2" style={{ display: 'flex' }}>
                      <Typography variant="body2" sx={{ mr: 1, color: '#666' }}>
                        •
                      </Typography>
                      {String(value)}
                    </Typography>
                  </Box>
                </Box>
              ))
            ) : (
              <Typography variant="body2" style={{ display: 'flex', color: '#b6b4b4' }}>
                {settingConstants.NO_CLINICS_FOUND}
              </Typography>
            )}
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ViewUserDetails;
