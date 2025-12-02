import React, { useEffect, useMemo } from 'react';
import { Box, Grid, Paper, Typography, Stack, Chip } from '@mui/material';
import { Provider, ProviderControllerService, UserControllerService } from 'src/sdk/requests';
import { useQuery } from '@tanstack/react-query';
import { useAppDispatch } from 'src/redux/hooks';
import { hideLoader, showLoader } from 'src/redux/reducers/loaderReducer';
import { settingConstants } from 'src/constants/admin-constants';
import { ClinicianFormLabels } from 'src/constants/formConst';
import { formatPhoneNumber, toCamelCase } from 'src/utils/toCamelCase';
import useAuthority from 'src/hooks/use-authority';

// Utility function to format roles
const formatRoleDisplay = (role: string): string => {
  if (!role) return '';
  return role
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

export const formatRoles = (roles: any): string => {
  if (!roles) return '-';
  if (Array.isArray(roles)) {
    return roles.map(role => formatRoleDisplay(role)).join(', ');
  }
  if (typeof roles === 'object' && roles !== null) {
    return Object.values(roles)
      .map(role => formatRoleDisplay(role as string))
      .join(', ');
  }
  return formatRoleDisplay(roles);
};

// Constants
const PROVIDER_PROFILE = {
  basicInfo: 'Basic Information',
} as const;

const CHIP_STYLES = {
  backgroundColor: '#F0FAFF',
  color: 'Primary.main',
  fontWeight: 'bold',
  width: 'fit-content',
} as const;

const LABEL_STYLES = {
  minWidth: 120,
  maxWidth: 120,
} as const;

const DETAIL_LABEL_STYLES = {
  minWidth: 200,
  maxWidth: 250,
} as const;

interface InfoRowProps {
  label: string;
  value: string;
  labelStyles?: object;
}

const InfoRow: React.FC<InfoRowProps> = ({ label, value, labelStyles = LABEL_STYLES }) => (
  <Grid
    size={{ xs: 12 }}
    sx={{
      display: 'flex',
      flexDirection: 'row',
      gap: 2,
    }}
  >
    <Typography variant="bodyMedium4" color="Neutral.70" sx={labelStyles}>
      {label}
    </Typography>
    <Typography variant="bodyMedium4">{value}</Typography>
  </Grid>
);

interface DetailRowProps {
  label: string;
  value: string | React.ReactNode;
  gridSize?: { xs: number; md: number };
}

const DetailRow: React.FC<DetailRowProps> = ({ label, value, gridSize = { xs: 6, md: 6 } }) => (
  <Grid size={gridSize}>
    <Box display="flex" flexDirection="row" alignItems="flex-start" gap={2} mb={1}>
      <Typography variant="titleMedium4" color="Neutral.70" sx={DETAIL_LABEL_STYLES}>
        {label}
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {typeof value === 'string' ? (
          <Typography variant="titleMedium4">{value}</Typography>
        ) : (
          value
        )}
      </Box>
    </Box>
  </Grid>
);

const formatValue = (value: any): string => {
  if (!value) return '-';
  return String(value);
};

const getFullName = (data: Provider | undefined): string => {
  if (!data?.firstName && !data?.lastName) return '';
  return `${data.firstName || ''} ${data.lastName || ''}`.trim();
};

const ProfileSetting: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isProvider } = useAuthority();

  const { data: userData, isPending: isPendingUserProfile } = useQuery({
    queryKey: ['ProviderData'],

    queryFn: () => {
      if (isProvider) {
        return ProviderControllerService.getApiMasterProviderProfile();
      } else {
        return UserControllerService.getApiMasterProfile();
      }
    },
  });

  useEffect(() => {
    if (isPendingUserProfile) {
      dispatch(showLoader());
    } else {
      dispatch(hideLoader());
    }
  }, [isPendingUserProfile, dispatch]);

  const specialitiesList = useMemo(() => {
    try {
      const specialities = userData?.data?.specialities;
      if (!specialities) return [];

      if (Array.isArray(specialities)) {
        return specialities.filter(val => val && typeof val === 'string');
      }

      if (typeof specialities === 'object' && specialities !== null) {
        const values = Object.values(specialities);
        return values.filter(val => val && typeof val === 'string');
      }

      return [];
    } catch (error) {
      console.error('Error processing specialities:', error);
      return [];
    }
  }, [userData?.data?.specialities]);

  const providerData = userData?.data as Provider | undefined;
  const fullName = useMemo(() => getFullName(providerData), [providerData]);

  const basicInfoFields = useMemo(() => {
    if (isProvider) {
      // Show all fields for providers
      return [
        { label: settingConstants.PROVIDER_TYPE, value: formatValue(providerData?.providerType) },
        {
          label: settingConstants.GENDER,
          value: toCamelCase(providerData?.gender || ''),
        },
        {
          label: settingConstants.CONTACT_NUMBER,
          value: formatPhoneNumber(providerData?.phone),
        },
        { label: settingConstants.EMAIL, value: formatValue(providerData?.email) },
        { label: ClinicianFormLabels.NPI_NUMBER, value: formatValue(providerData?.npi) },
        { label: settingConstants.BIO, value: formatValue(providerData?.bio) },
        { label: 'Languages Spoken', value: formatValue(providerData?.languagesSpoken) },
      ];
    } else {
      // Show only CONTACT_NUMBER, EMAIL, and Role for non-providers
      return [
        {
          label: settingConstants.CONTACT_NUMBER,
          value: formatPhoneNumber(providerData?.phone),
        },
        { label: settingConstants.EMAIL, value: formatValue(providerData?.email) },
        { label: settingConstants.ROLE, value: formatRoles(providerData?.roles) },
      ];
    }
  }, [providerData, isProvider]);

  return (
    <Box paddingTop={2}>
      <Grid container spacing={2}>
        {/* Left Column - Basic Profile */}
        <Grid size={{ xs: isProvider ? 4 : 12 }}>
          <Paper elevation={0} sx={{ borderRadius: 1, p: 3, minHeight: 'auto', gap: 8 }}>
            <Stack>
              <Box sx={{ gap: 2, paddingBottom: 2 }}>
                <Typography
                  variant="h5Bold"
                  color="Neutral.90"
                  sx={{ paddingBottom: 2, display: 'flex' }}
                >
                  {fullName}
                </Typography>

                {isProvider && specialitiesList.length > 0 && (
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    {specialitiesList.map((speciality, index) => (
                      <Chip
                        key={`speciality-${index}`}
                        label={String(speciality)}
                        sx={CHIP_STYLES}
                      />
                    ))}
                  </Stack>
                )}
              </Box>

              <Grid container spacing={2}>
                {basicInfoFields.map((field, index) => (
                  <InfoRow
                    key={`basic-info-${index}`}
                    label={field.label}
                    value={field.value || ''}
                  />
                ))}
              </Grid>
            </Stack>
          </Paper>
        </Grid>

        {/* Right Column - Detailed Information - Only show for providers */}
        {isProvider && (
          <Grid size={{ xs: 8 }}>
            <Paper
              sx={{
                borderRadius: 1,
                p: 3,
                minHeight: 'auto',
              }}
            >
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="titleSemiBold2" color="Primary.main">
                  {PROVIDER_PROFILE.basicInfo}
                </Typography>
              </Box>

              <Grid container spacing={2}>
                <DetailRow
                  label={settingConstants.WORK_EXP}
                  value={formatValue(providerData?.workExperience)}
                />

                <Grid size={{ xs: 12, md: 12 }}>
                  <Box display="flex" flexDirection="column" gap={2} mb={1}>
                    <Typography
                      variant="titleMedium2"
                      color="Primary.main"
                      sx={DETAIL_LABEL_STYLES}
                    >
                      {settingConstants.LICENSED_DETAILS}
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      {providerData?.licenceDetails && providerData?.licenceDetails.length > 0 ? (
                        providerData?.licenceDetails.map((item, idx) => (
                          <Grid
                            container
                            spacing={2}
                            key={`${item.licenseState.uuid || item.licenseState.state}-${idx}`}
                          >
                            <Grid size={{ xs: 12, md: 4 }}>
                              <Typography variant="bodyMedium4" color="Neutral.70">
                                {settingConstants.LICENSE_NUMBER}:{' '}
                                <Typography variant="titleMedium4" color="Base.black">
                                  {item.licenseNumber || '-'}
                                </Typography>
                              </Typography>
                            </Grid>
                            <Grid size={{ xs: 12, md: 4 }}>
                              <Typography variant="bodyMedium4" color="Neutral.70">
                                {settingConstants.LICENSE_STATE}:{' '}
                                <Typography variant="titleMedium4" color="Base.black">
                                  {item.licenseState.state || '-'}
                                </Typography>
                              </Typography>
                            </Grid>
                            <Grid size={{ xs: 12, md: 4 }}>
                              <Typography variant="bodyMedium4" color="Neutral.70">
                                {settingConstants.LICENSE_EXPIRY_DATE}:{' '}
                                <Typography variant="titleMedium4" color="Base.black">
                                  {item.licenseExpiryDate || '-'}
                                </Typography>
                              </Typography>
                            </Grid>
                          </Grid>
                        ))
                      ) : (
                        <Typography variant="titleMedium4">-</Typography>
                      )}
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default ProfileSetting;
