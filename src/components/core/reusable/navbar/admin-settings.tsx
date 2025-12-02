import { Menu, MenuItem, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface AdminSettingsProps {
  anchorEl: null | HTMLElement;
  open: boolean;
  handleClose: () => void;
}

const adminSettings = [
  {
    label: 'Availability',
    route: '/admin/settings/availability',
  },

  {
    label: 'Appointment Types',
    route: '/admin/settings/appt-type',
  },
  {
    label: 'Fee Schedule',
    route: '/admin/settings/fee-schedule',
  },
  {
    label: 'Patient Flags',
    route: '/admin/settings/patient-flag',
  },
  {
    label: 'Document Types',
    route: '/admin/settings/document-types',
  },
];
const AdminSettings: React.FC<AdminSettingsProps> = ({ anchorEl, open, handleClose }) => {
  const navigate = useNavigate();

  return (
    <Menu
      id="admin-settings-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        'aria-labelledby': 'admin-settings-button',
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
      {adminSettings.map(item => (
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

export default AdminSettings;
