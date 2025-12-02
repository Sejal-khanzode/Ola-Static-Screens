import { Chip, Grid, Typography } from '@mui/material';
import { settingConstants } from 'src/constants/admin-constants';
import { Location } from 'src/sdk/requests';

interface DataViewProps {
  dataView: Location;
}

const ViewLocationDetails = (props: DataViewProps) => {
  const { dataView } = props;

  const orderedDays = [
    'MONDAY',
    'TUESDAY',
    'WEDNESDAY',
    'THURSDAY',
    'FRIDAY',
    'SATURDAY',
    'SUNDAY',
  ];

  const formatDay = (day: string) => {
    return day.charAt(0) + day.slice(1).toLowerCase();
  };

  const formatTime = (time: string): string => {
    if (!time || time === 'Closed') {
      return time;
    }
    if (time.includes(' - ')) {
      const [startTime, endTime] = time.split(' - ');
      return `${formatTime(startTime)} - ${formatTime(endTime)}`;
    }
    try {
      const [hoursStr, minutesStr] = time.split(':');
      const hours = parseInt(hoursStr, 10);
      const minutes = parseInt(minutesStr, 10);
      
      if (isNaN(hours) || isNaN(minutes)) {
        return time;
      }     
      const period = hours >= 12 ? 'PM' : 'AM';  
      const twelveHour = hours % 12 || 12;
      const formattedMinutes = minutes.toString().padStart(2, '0');
      return `${twelveHour}:${formattedMinutes} ${period}`;
    } catch (error) {
      return time;
    }
  };

  const basicInfoFields = [
    { label: settingConstants.LOCATION_NAME, value: dataView?.name },
    { label: settingConstants.LOCATION_ID, value: dataView?.locationId },
    { label: settingConstants.CONTACT_NUMBER, value: dataView?.contact },
    { label: settingConstants.EMAIL, value: dataView?.email },
  ];

  const additionalInfoFields = [{ label: settingConstants.FAX_ID, value: dataView?.fax || '-' }];

  const addressFields = [
    { label: settingConstants.ADDRESS_LINE_1, value: dataView?.physicalAddress?.line1 },
    { label: settingConstants.ADDRESS_LINE_2, value: dataView?.physicalAddress?.line2 },
    { label: settingConstants.STATE, value: dataView?.physicalAddress?.state },
    { label: settingConstants.CITY, value: dataView?.physicalAddress?.city },
    { label: settingConstants.ZIP_CODE, value: dataView?.physicalAddress?.zipcode },
  ];

  const addressFields2 = [
    { label: settingConstants.ADDRESS_LINE_1, value: dataView?.billingAddress?.line1 },
    { label: settingConstants.ADDRESS_LINE_2, value: dataView?.billingAddress?.line2 },
    { label: settingConstants.STATE, value: dataView?.billingAddress?.state },
    { label: settingConstants.CITY, value: dataView?.billingAddress?.city },
    { label: settingConstants.ZIP_CODE, value: dataView?.billingAddress?.zipcode },
  ];

  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12 }}>
        <Grid container spacing={2}>
          {basicInfoFields?.map((field, index) => (
            <Grid size={{ xs: 12, md: 6 }} key={index}>
              <Grid container spacing={2} alignItems="center">
                <Grid size={{ xs: 4 }}>
                  <Typography variant="bodyBold4" color="text.secondary" sx={{ minWidth: '120px' }}>
                    {field.label}:
                  </Typography>
                </Grid>
                <Grid size={{ xs: 8 }}>
                  <Typography variant="titleMedium4" sx={{ fontWeight: 'bold' }}>
                    {field.value || '-'}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Grid>

      <Grid size={{ xs: 12 }}>
        <Grid container spacing={2}>
          {additionalInfoFields?.map((field, index) => (
            <Grid size={{ xs: 12, md: 6 }} key={index}>
              <Grid container spacing={2} alignItems="center">
                <Grid size={{ xs: 4 }}>
                  <Typography variant="bodyBold4" color="text.secondary" sx={{ minWidth: '120px' }}>
                    {field.label}:
                  </Typography>
                </Grid>
                <Grid size={{ xs: 8 }}>
                  <Typography variant="titleMedium4" sx={{ fontWeight: 'bold' }}>
                    {field.value}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Grid>

      <Grid size={{ xs: 12 }}>
        <Grid container alignItems="center">
          <Typography variant="bodyBold3" color="Primary.main" sx={{ mb: 1 }}>
            {settingConstants.PHYSICAL_ADDRESS}:
          </Typography>
        </Grid>
        <Grid container spacing={2}>
          {addressFields?.map((field, index) => (
            <Grid size={{ xs: 12, md: 6 }} key={index}>
              <Grid container spacing={2} alignItems="center">
                <Grid size={{ xs: 4 }}>
                  <Typography variant="bodyBold4" color="text.secondary" sx={{ minWidth: '120px' }}>
                    {field.label}:
                  </Typography>
                </Grid>
                <Grid size={{ xs: 8 }}> 
                  <Typography variant="titleMedium4" sx={{ fontWeight: 'bold' }}>
                    {field.value || '-'}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Grid>

      <Grid size={{ xs: 12 }}>
        <Grid container alignItems="center">
          <Typography variant="bodyBold3" color="Primary.main" sx={{ mb: 1 }}>
            {settingConstants.BILLING_ADDRESS}:
          </Typography>
        </Grid>
        <Grid container spacing={2}>
          {addressFields2?.map((field, index) => (
            <Grid size={{ xs: 12, md: 6 }} key={index}>
              <Grid container spacing={2} alignItems="center">
                <Grid size={{ xs: 4 }}>
                  <Typography variant="bodyBold4" color="text.secondary" sx={{ minWidth: '120px' }}>
                    {field.label}:
                  </Typography>
                </Grid>
                <Grid size={{ xs: 8 }}>
                  <Typography variant="titleMedium4" sx={{ fontWeight: 'bold' }}>
                    {field.value || '-'}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Grid>

      <Grid size={{ xs: 12 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid size={{ xs: 2 }}>
            <Typography variant="bodyBold4" color="Neutral.70">
              {settingConstants.SPECIALITIES}:
            </Typography>
          </Grid>
          <Grid>
            <Grid container spacing={1}>
              {dataView?.specialities
                ? (typeof dataView?.specialities === 'string'
                    ? (dataView?.specialities as string).split(',')?.map((s: string) => s.trim())
                    : Object.values(dataView?.specialities)
                  )?.map((speciality: any, index: number) => {
                    const specialityText =
                      typeof speciality === 'string' ? speciality : String(speciality);
                    return (
                      <Grid size={{ xs: 'auto' }} key={index}>
                        <Chip
                          label={specialityText}
                          sx={{
                            fontFamily: 'Roboto',
                            fontSize: '14px',
                            fontWeight: 'bold',
                            color: '#0F9EF1',
                            backgroundColor: '#F0F9FF',
                            height: '32px',
                            borderRadius: '16px',
                            '& .MuiChip-label': {
                              padding: '0 12px',
                            },
                          }}
                        />
                      </Grid>
                    );
                  })
                : null}
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid size={{ xs: 12 }} gap={2}>
        <Grid container alignItems="center">
          <Typography variant="bodyBold3" color="Primary.main" sx={{ mb: 1 }}>
            {settingConstants.LOCATION_HOURS}:
          </Typography>
        </Grid>
        <Grid container spacing={2} gap={2}>
          {orderedDays?.map(day => {
            const data = dataView?.locationHours?.find(d => d.dayOfWeek === day);
            const displayTime =
              data?.openingTime && data?.closingTime
                ? `${data?.openingTime} - ${data?.closingTime}`
                : 'Closed';

            return (
              <Grid size={{ xs: 12 }} key={day}>
                <Grid container spacing={2} alignItems="center">
                  <Grid size={{ xs: 3 }}>
                    <Typography
                      variant="titleMedium4"
                      sx={{ fontWeight: 'bold', minWidth: '100px' }}
                    >
                      {formatDay(day)}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 9 }}>
                    <Typography variant="titleMedium4" sx={{ fontWeight: 'bold' }}>
                      {formatTime(displayTime)}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ViewLocationDetails;
