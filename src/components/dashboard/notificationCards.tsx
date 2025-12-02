import { Box, Typography, Grid } from '@mui/material';
import { dashboardConstants } from '../../constants/dashboard-constants';
import React from 'react';
import { Link } from 'react-router-dom';

interface NotificationItem {
  heading: string;
  value: number;
  route: string;
}

const notificationItemsData: NotificationItem[] = [
  { heading: 'Patient Intake Forms', value: 17, route: '/dashboard/patient-intake' },
  { heading: 'eRX Request', value: 29 ,route: '/dashboard/e-precription' },
  { heading: 'Lab Results', value: 7,route: '/dashboard/lab-results' },
  { heading: 'Claim Received', value: 2 ,route: '/dashboard/claim-received' },
];

const NotificationCards: React.FC = () => {
  return (
    <Box sx={{ 
      backgroundColor:'Base.white', 
      padding: '1rem', 
      width: '100%', 
    }} borderRadius={0.5}>
      <Typography variant="titleSemiBold4" sx={{
        color: 'Neutral.80'
      }}>
        {dashboardConstants.UNCHECK_NOTIFICATION}
      </Typography>
      <Grid container spacing={2}>
        {notificationItemsData.map((item, index) => (
          <Grid  size={{xs:12,sm:6, md:3}} key={index}>
            <Link to={item.route} style={{ textDecoration: 'none' }}>
              <Box
                sx={{
                  height: 85,
                  borderRadius: 0.5,
                  border: '1px solid',
                  paddingLeft: 1.5,
                  paddingTop: 1,
                  paddingRight: 2,
                  paddingBottom: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  background: 'Base.white',
                  borderColor: 'Neutral.30',
                }}
              >
                <Typography
                  variant="titleSemiBold4"
                  color="Neutral.80"
                  sx={{ textDecoration: 'underline', opacity: "80%" }}
                >
                  {item.heading}
                </Typography>
                <Typography variant="bodyBold1" color='Primary.main'>{item.value}</Typography>
              </Box>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default NotificationCards;