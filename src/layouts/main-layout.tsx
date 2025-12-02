import { Grid, useMediaQuery } from '@mui/material';
import Navbar from '../components/core/reusable/navbar/navbar';

const MainLayout = (props: React.PropsWithChildren) => {
  const below500 = useMediaQuery('(max-width:500px)');
  return (
    <>
      <Grid container height={'100vh'} overflow={'hidden'}>
        <Grid
          container
          flex={1}
          flexDirection={'column'}
          height={'100vh'}
          sx={{
            overflow: 'hidden',
            maxHeight: '100vh',
            transition: 'all .2s',
          }}
          flexWrap={'nowrap'}
        >
          <Navbar />
          <Grid size={12} container flex={1} padding={below500 ? '1rem' : '0.6rem'} sx={{ backgroundColor: 'Neutral.20' }}>
            {props.children}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default MainLayout;
