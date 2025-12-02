import { Divider, Grid, Typography } from '@mui/material';
import LocationIcon from '../../../../assets/icons/apartmenticon';
import { loginConstants } from '../../../../constants/auth-constants';
import carouselImage from '../../../../assets/images/carousel.png';

function Carousel() {
  return (
    <Grid
      container
      sx={{
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Grid
        size={{ xs: 12 }}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `
          linear-gradient(
      rgba(0, 0, 0, 0.4), 
      rgba(0, 0, 0, 0.5)
    ),
          url(${carouselImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <Grid
          mt={15}
          alignItems={'center'}
          display="flex"
          justifyContent="center"
          width="100%"
        ></Grid>
      </Grid>

      <Grid
        size={{ xs: 12 }}
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '50vh',
          pointerEvents: 'none',
        }}
      >
        <Grid mt={'40%'} display={'flex'} flexDirection={'column'} alignItems={'center'}>
          <Grid mb={1.5}>
            <Typography variant="titleBold1" color="Base.white">
              {loginConstants.CONTACT_INFO}
            </Typography>
          </Grid>
          <Divider
            sx={{
              width: '60%',
              backgroundColor: 'Base.white',
              opacity: 0.5,
              my: 1,
              mb: 2,
              fontWeight: 500,
            }}
          />
          <Grid display={'flex'} flexDirection={'row'} gap={2} mb={2} mt={1}>
            <Grid>
              <LocationIcon />
            </Grid>
            <Grid>
              <Typography variant="bodyRegular4" color="Base.white">
                {loginConstants.ADDRESS_LINE_LOGIN_SCREEN}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Carousel;
