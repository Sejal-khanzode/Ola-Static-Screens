import { useState } from 'react';
import { Avatar, Box, Menu, MenuItem, Typography } from '@mui/material';
import { UserProfile } from '../../../../models/userModel';
import { navAvatarStyles } from './widgets/navAvatarStyles';
import { PersonIcon } from '../../../../assets/icons/personIcon';
import { KeyboardArrowDown, KeyboardArrowUp } from '../../../../assets/icons/keyboardArrow';
import './widgets/navAvatarStyles'; 
import { removeDataFromLocalStorage } from '../../../../sdk/requests/core/localStorage';
import { useNavigate } from 'react-router-dom';

interface NavAvatarProps {
  response?: UserProfile | null;
}

export default function NavAvatar(props: NavAvatarProps) {
  const { response } = props;
  const [anchorEl, setAnchorEl] = useState<null   | HTMLElement>(null);
  const [, setOpenCustomDialog] = useState(false);
  const navigate = useNavigate();

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  

  const handleClose = () => {
    setAnchorEl(null);
    removeDataFromLocalStorage('token');
    navigate('/auth/login');
  };

  return (
    <Box display="flex" alignItems="center" className="nav-avatar-wrapper">
      <Box onClick={handleClick} component="div" sx={{ cursor: 'pointer', display:'flex' }}>
        <Avatar
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          alt={`${response?.firstName} ${response?.lastName}`}
          src={response?.avatar ?? ''}
          sx={navAvatarStyles}
        />
         {open ? (
        <KeyboardArrowUp className="arrow-icon" />
      ) : (
        <KeyboardArrowDown className="arrow-icon" />
      )}

      </Box>
     
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        PaperProps={{
          elevation: 3,
          className: 'navAvatarMenuPaper',
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem
          onClick={() => {
            handleClose();
          }}
          sx={{gap:1}}
        >
          <PersonIcon width={20} height={20} color='Neutral.80'/>
          <Typography variant="bodyRegular5" color='Neutral.80'>Profile</Typography>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            setOpenCustomDialog(true);
          }}
          sx={{gap:1}}
        >
          <PersonIcon width={20} height={20} color='Neutral.80'/>
          <Typography variant="bodyRegular5" color='Neutral.80'>Log Out</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
}
