import { Menu, MenuItem, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { providerConstants } from 'src/constants/patients-constants';

interface ClientSettingsProps {
  anchorEl: null | HTMLElement;
  open: boolean;
  handleClose: () => void;
}

const clientSettings = [
  {
    label: providerConstants.PROFILE_SETTINGS,
    route: '/client/settings/profile',
  },
  {
    label: providerConstants.INSURANCE,
    route: '/client/settings/insurance',
  },
];
const ClientSettings: React.FC<ClientSettingsProps> = ({ anchorEl, open, handleClose }) => {
  const navigate = useNavigate();

  return (
    <Menu
      id="client-settings-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        'aria-labelledby': 'client-settings-button',
      }}
      slotProps={{
        paper: {
          sx: {
            mt: 1.5,
            '& .MuiMenuItem-root': {
              textAlign: 'left',
            },
          },
        },
      }}
    >
      {clientSettings.map(item => (
        <MenuItem
          key={item.label}
          onClick={() => {
            navigate(item.route);
            handleClose();
          }}
        >
          <Typography>{item.label}</Typography>
        </MenuItem>
      ))}
    </Menu>
  );
};

export default ClientSettings;
