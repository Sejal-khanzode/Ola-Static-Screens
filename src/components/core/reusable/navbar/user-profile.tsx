import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import PowerSettingsNewOutlinedIcon from '@mui/icons-material/PowerSettingsNewOutlined';
import KeyIcon from '@mui/icons-material/Key';
import {
  Avatar,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthority from '../../../../hooks/use-authority';
import Cookies from 'js-cookie';
import { KeyboardArrowDown, KeyboardArrowUp } from '../../../../assets/icons/keyboardArrow';
import cookieService from 'src/services/core/cookie-service';
import { AuthControllerService } from 'src/sdk/requests';
import storageService from 'src/services/core/storage-service';
import CustomDrawer from '../custom-drawer/custom-drawer';
import { settingConstants } from 'src/constants/admin-constants';
import ChangePassword from 'src/pages/apps/admin/pages/settings/profile/change-password';
import { profile } from 'src/constants/setting-constants';
import CustomButton from '../custom-button/custom-button';

interface UserProfileProps {
  userData?: any;
}

const UserProfile = (props: UserProfileProps) => {
  const { userData } = props;
  const { isAdminPortal, isPatientPortal } = useAuthority();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const [openChangePasswordDialog, setOpenChangePasswordDialog] = useState(false);

  const navigate = useNavigate();

  const handleLogoutDialogOpen = () => {
    setLogoutDialogOpen(true);
    setMenuOpen(false);
  };

  const handleLogoutDialogClose = () => {
    setLogoutDialogOpen(false);
  };

  const handleProfileClick = () => {
    if (isAdminPortal) {
      navigate('/admin/settings/profile');
      setMenuOpen(false);
    } else {
      navigate('/provider/settings/provider-account/profile');
      setMenuOpen(false);
    }
  };

  // Clear cookies and local storage
  const handleChangePasswordClick = () => {
    setOpenChangePasswordDialog(true);
    setMenuOpen(false);
  };

  const logoutUser = async () => {
    try {
      const refreshToken = storageService.getRefreshToken() || '';
      await AuthControllerService.postApiMasterAuthLogout({ requestBody: { refreshToken } });
    } catch (error) {
      console.error('Logout API call failed:', error);
    }
    Object.keys(Cookies.get()).forEach(cookieName => {
      Cookies.remove(cookieName);
    });
    cookieService.clearCookies();
    localStorage.clear();
    localStorage.removeItem('redirectURL');

    window.location.reload();
  };

  return (
    <>
      <Grid
        container
        gap={1}
        flexWrap={'nowrap'}
        sx={{
          display: 'flex',
          alignItems: 'center  ',
          justifyContent: 'flex-end',
        }}
      >
          <Grid display="flex" alignItems="center" minWidth={"auto"}>
            <Avatar
              style={{
                cursor: 'pointer',
                height: '30px',
                width: '30px',
              }}
              onClick={(event: React.MouseEvent<HTMLElement>) => {
                setAnchorEl(event.currentTarget);
                setMenuOpen(true);
              }}
            >
              {!userData?.avatar &&
                `${userData?.firstName?.[0] || ''}${userData?.lastName?.[0] || ''}`}
            </Avatar>
            <IconButton
              onClick={(event: React.MouseEvent<HTMLElement>) => {
                setAnchorEl(event.currentTarget);
                setMenuOpen(true);
              }}
            >
              {menuOpen ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            </IconButton>
          </Grid>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={menuOpen}
            onClose={() => setMenuOpen(false)}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            {!isPatientPortal && (
              <MenuItem onClick={handleProfileClick}>
                <PermIdentityOutlinedIcon />
                <Typography ml={1}>{profile.PROFILE}</Typography>
              </MenuItem>
            )}
            {!isAdminPortal && (
              <MenuItem onClick={handleChangePasswordClick}>
                <KeyIcon />
                <Typography ml={1}>{profile.CHANGE_PASSWORD}</Typography>
              </MenuItem>
            )}
            <MenuItem onClick={handleLogoutDialogOpen}>
              <PowerSettingsNewOutlinedIcon />
              <Typography ml={1}>{profile.LOGOUT}</Typography>
            </MenuItem>
          </Menu>
          <Dialog open={logoutDialogOpen} onClose={handleLogoutDialogClose}>
            <DialogContent style={{ padding: '2rem 3rem 1rem 3rem' }}>
              <Grid container flexDirection={'column'} alignItems={'center'}>
                {/* <img
                  src={CautionIcon}
                  width={"30px"}
                  height={"30px"}
                  alt="caution"
                /> */}
                <Typography variant="h6" mt={2}>
                  {profile.LOGOUT_CONFIRMATION}
                </Typography>
                <Typography mt={2}>{profile.LOGOUT_CONFIRMATION_MESSAGE}</Typography>
                <Typography>{profile.LOGOUT_CONFIRMATION_MESSAGE_2}</Typography>
              </Grid>
            </DialogContent>
            <DialogActions
              sx={{
                display: 'flex',
                justifyContent: 'center',
                padding: '1rem 5rem 2rem 5rem',
                gap: '1rem',
              }}
            >
              <CustomButton
                label={profile.CANCEL}
                variant="outlined"
                onClick={handleLogoutDialogClose}
              />
              <CustomButton
                label={profile.LOGOUT}
                variant="filled"
                onClick={async () => {
                  await logoutUser();
                }}
              />
            </DialogActions>
          </Dialog>
     

        <CustomDrawer
          title={settingConstants.CHANGE_PASSWORD}
          open={openChangePasswordDialog}
          onClose={() => setOpenChangePasswordDialog(false)}
          anchor="right"
          drawerWidth="30vw"
          drawerPadding="12px"
        >
          <ChangePassword onClose={() => setOpenChangePasswordDialog(false)} />
        </CustomDrawer>
      </Grid>
    </>
  );
};

export default UserProfile;
