import React from 'react';
import { Menu, Button, Typography, Box, Grid , Stack} from '@mui/material';

interface MenuOption {
  value: string;
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

interface CustomSelectIconMenuProps {
  label?: string;
  options: MenuOption[];
}

const CustomSelectIconMenu: React.FC<CustomSelectIconMenuProps> = ({
  label,
  options,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {/* <CustomButton variant="whiteOutline" label={label}     onClick={handleClick} /> */}

      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{
          width:'300px',
          boxShadow: '0px 4px 16px 0px rgba(0, 0, 0, 0.10)',
          borderRadius: 0.5,
          padding: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderColor: 'Neutral.70',
          color: 'Neutral.70',
          backgroundColor: 'Base.white',

        }}
      >
        {label}

      </Button>
      <>
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          <Grid container spacing={2} margin={2}>
            {options.map(option => (
              <Grid size={{xs:4}} key={option.value}>
                <Stack alignItems="center" gap={1} >
                  <Box sx={{backgroundColor:'Neutral.10', padding:0.5, borderRadius:0.5, border:'1px solid', borderColor:'Neutral.40'}}>{option.icon}</Box>
                  <Typography variant="titleSemiBold5" color='Neutral.70'>{option.label}</Typography>
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Menu>
      </>
    </>
  );
};

export default CustomSelectIconMenu;
