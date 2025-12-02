import { Avatar, Box, Chip, Grid, Paper, Typography } from '@mui/material';
import profile from 'src/assets/images/avatar.png';
import { formatDateToMMDDYYYY } from 'src/constants/date-format';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

const AppointmentNoteNav = () => {
  return (
    <Paper
      sx={{
        p: 2,
        minHeight: { xs: 'auto', md: 10 },
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        bgcolor: 'Base.white',
        boxShadow: 'none',
      }}
    >
      <Grid container size={12} justifyContent="space-between" sx={{ width: '100%' }}>
        <Grid alignItems="center" spacing={2} display="flex" flexDirection="row" gap={2}>
          <Grid ml={2}>
            <Avatar src={profile} sx={{ width: '70px', height: '70px' }} />
          </Grid>
          <Grid ml={1} display="flex" gap={2}>
            <Box display="flex" flexDirection={'column'} alignItems="start" gap={1}>
              <Typography variant="bodyBold2">John Due </Typography>
              <Box display="flex" alignItems={'center'} gap={1} mt={1}>
                <Chip
                  label="Male"
                  variant="outlined"
                  sx={{ color: '#0068FF', backgroundColor: '#EEF7FE' }}
                  size="small"
                />
                <Typography variant="bodyRegular5" color="#595F63">
                  #1234567890
                </Typography>
              </Box>
            </Box>

            <Box display="flex" flexDirection="row" gap="24px" color="#595F63">
              <Box display="flex" flexDirection="column" gap={1}>
                <Box display="flex" alignItems="center" gap={1}>
                  <CalendarTodayIcon sx={{ width: '16px', height: '16px' }} />
                  <Typography variant="bodyRegular4">
                    {formatDateToMMDDYYYY(new Date().toISOString())}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1} mt={1}>
                  <LocationOnOutlinedIcon sx={{ width: '16px', height: '16px' }} />
                  <Typography variant="bodyRegular4">New York, NY, 10001</Typography>
                </Box>
              </Box>
              <Box display="flex" flexDirection="column" gap={1}>
                <Box display="flex" alignItems="center" gap={1}>
                  <LocalPhoneOutlinedIcon sx={{ width: '16px', height: '16px' }} />
                  <Typography variant="bodyRegular4">+1 (234) 567-8900</Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1} mt={1}>
                  <MailOutlineIcon sx={{ width: '16px', height: '16px' }} />
                  <Typography variant="bodyRegular4">john.due@example.com</Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Grid
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Grid display="flex" flexDirection="column" gap={0.5}>
            <Grid display="flex" alignItems="center" gap={1}>
              <Typography variant="bodyRegular3" width="130px">
                Insurance Payer
              </Typography>
              <Typography variant="bodyRegular3">:</Typography>
              <Typography variant="bodyRegular3">Blue Shield Association (Default)</Typography>
            </Grid>
            <Grid display="flex" alignItems="center" gap={1} mt={1}>
              <Typography variant="bodyRegular3" width="130px">
                Primary Provider
              </Typography>
              <Typography variant="bodyRegular3">:</Typography>
              <Typography variant="bodyRegular3">Dr. Albert Melbourne</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default AppointmentNoteNav;
