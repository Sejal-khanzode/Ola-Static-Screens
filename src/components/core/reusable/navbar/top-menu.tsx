import MenuIcon from '@mui/icons-material/Menu';
import { Drawer, Grid, IconButton, Typography, Box, useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import useMenu from '../../../../hooks/use-menu';
import AdminSettings from './admin-settings';
import { lightTheme } from '../../../../theme/theme';
import { Logo } from '../../../../assets/icons/logo';
import UserProfile from './user-profile';
import {
  getDataFromLocalStorage,
  removeDataFromLocalStorage,
  saveToLocalStorage,
} from 'src/sdk/requests/core/localStorage';
import { useQuery } from '@tanstack/react-query';
import { ProviderControllerService, UserControllerService } from 'src/sdk/requests';
import CustomAutoComplete from '../custom-auto-complete/custom-auto-complete';
import { Options } from 'src/constants/options';
import { hideLoader, showLoader } from 'src/redux/reducers/loaderReducer';
import useAuthority from 'src/hooks/use-authority';
import ClientSettings from './patient-settings';
import { useAppDispatch } from 'src/redux/hooks';

const TopMenu = () => {
  const [openTopDrawer, setOpenTopDrawer] = useState(false);
  const menuItems = useMenu();
  const location = useLocation();
  const navigate = useNavigate();
  const pathPrefix = location.pathname.split('/')[1];
  const isProviderPortal = pathPrefix === 'provider';
  const { considerProvider, isPatientPortal } = useAuthority();

  const belowXl1 = useMediaQuery(lightTheme.breakpoints.down('xl'));

  const classes = {
    link: {
      '&:hover': {
        background: 'Primary.main',
      },
    },
  };

  const [subMenuAnchorEl, setSubMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [subMenuOpen, setSubMenuOpen] = useState(false);

  const [subMenuAnchorClientEl, setSubMenuClientAnchorEl] = useState<null | HTMLElement>(null);
  const [subMenuClientOpen, setSubMenuClientOpen] = useState(false);

  const [selectedClinic, setSelectedClinic] = useState<string>('');
  const [clinicOptions, setClinicOptions] = useState<Options>([]);
  const dispatch = useAppDispatch();

  const handleSubMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setSubMenuAnchorEl(event.currentTarget);
    setSubMenuOpen(true);
  };

  const handleSubMenuClose = () => {
    setSubMenuAnchorEl(null);
    setSubMenuOpen(false);
  };

  const handleSubMenuClientClick = (event: React.MouseEvent<HTMLElement>) => {
    setSubMenuClientAnchorEl(event.currentTarget);
    setSubMenuClientOpen(true);
  };

  const handleSubMenuClientClose = () => {
    setSubMenuClientAnchorEl(null);
    setSubMenuClientOpen(false);
  };

  const roles = (getDataFromLocalStorage('roles') as unknown as string[]) || [];
  const isSuperAdmin = Array.isArray(roles) && roles.includes('SUPER_ADMIN');

  const {
    data: userData,
    refetch: refetchUser,
    isPending: isLoading,
  } = useQuery({
    queryKey: ['AdminProviderData'],
    queryFn: () => {
      if (considerProvider) {
        return ProviderControllerService.getApiMasterProviderProfile();
      } else {
        return UserControllerService.getApiMasterProfile();
      }
    },
  });

  const { data: clinicData, isPending: isLoadingClinic } = useQuery({
    queryKey: ['clinicsData'],
    enabled: !!userData?.data?.uuid && isProviderPortal,
    queryFn: () => {
      const providerId = userData?.data?.uuid;
      return ProviderControllerService.getApiMasterProviderByProviderIdClinics({
        providerId: providerId as string,
        active: true,
        isProvider: considerProvider ? true : false,
        archive: false,
      });
    },
  });

  const handleClinicChange = (selectedValue: string) => {
    const selectedClinicData = clinicOptions.find(clinic => clinic.key === selectedValue);

    if (selectedClinicData) {
      setSelectedClinic(selectedClinicData.value);
      saveToLocalStorage('selectedClinicUuid', selectedValue);

      window.dispatchEvent(
        new CustomEvent('clinicChanged', {
          detail: { clinicId: selectedValue },
        })
      );

      const pathParts = location.pathname.split('/').filter(Boolean);
      const section = pathParts[1];

      if (section) {
        dispatch(hideLoader());
        navigate(`/provider/${section}`);
      }
    }
  };

  useEffect(() => {
    if (isSuperAdmin) refetchUser();
    else {
    }
  }, [isSuperAdmin]);

  useEffect(() => {
    if (clinicData?.data && Array.isArray(clinicData?.data) && clinicData?.data?.length > 0) {
      const getList = clinicData?.data?.map((data: { uuid: string; name: string }) => {
        return {
          key: data?.uuid,
          value: data?.name,
        };
      });

      const uniqueOptions = getList.filter(
        (option, index, self) =>
          index === self.findIndex(o => o.key === option.key && o.value === option.value)
      );

      setClinicOptions(uniqueOptions);
    } else if (
      clinicData?.data === null ||
      (Array.isArray(clinicData?.data) && clinicData?.data?.length === 0)
    ) {
      removeDataFromLocalStorage('selectedClinicUuid');
    }
  }, [clinicData]);

  useEffect(() => {
    if (clinicOptions?.length > 0) {
      if (!isSuperAdmin) {
        const storedClinicId = (getDataFromLocalStorage('selectedClinicUuid') as string)?.replace(
          /"/g,
          ''
        );

        if (storedClinicId && clinicOptions?.some(clinic => clinic.key === storedClinicId)) {
          const selectedClinicData = clinicOptions?.find(clinic => clinic.key === storedClinicId);
          setSelectedClinic(selectedClinicData?.value || '');
        } else if (!storedClinicId) {
          setSelectedClinic(clinicOptions[0]?.value);
          saveToLocalStorage('selectedClinicUuid', clinicOptions[0]?.key);
          window.dispatchEvent(
            new CustomEvent('clinicChanged', {
              detail: { clinicId: clinicOptions[0].key },
            })
          );
        }
      }
    }
  }, [clinicOptions]);

  useEffect(() => {
    if (isLoading) {
      dispatch(showLoader());
    } else {
      dispatch(hideLoader());
    }
  }, [isLoading]);

  useEffect(() => {
    if (isLoadingClinic) {
      dispatch(showLoader());
    } else {
      dispatch(hideLoader());
    }
  }, [isLoadingClinic]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isLoading && !isLoadingClinic) {
        dispatch(hideLoader());
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [location.pathname, isLoading, isLoadingClinic, dispatch]);

  return (
    <>
      <Grid
        container
        width={'100%'}
        justifyContent={'space-between'}
        flexWrap={'nowrap'}
        alignItems={'center'}
      >
        <Grid
          container
          width={'fit-content'}
          gap={7}
          alignItems={'center'}
          sx={{ display: 'flex' }}
        >
          <Grid
            container
            flexWrap="nowrap"
            alignItems="center"
            gap={2}
            width={'fit-content'}
            height={'40px'}
          >
            {belowXl1 && (
              <IconButton
                sx={{ color: 'Base.white' }}
                onClick={() => setOpenTopDrawer(prev => !prev)}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Box>
              <Logo />
            </Box>
            <Drawer
              PaperProps={{
                sx: {
                  borderRadius: '0 0 20px 20px',
                },
              }}
              anchor={'top'}
              open={openTopDrawer}
              onClose={() => setOpenTopDrawer(false)}
            >
              <Grid
                container
                justifyContent={'center'}
                alignItems={'center'}
                flexDirection={'column'}
                padding={2}
              >
                {menuItems
                  .filter(item => !item.hide)
                  ?.map((item, i) => (
                    <NavLink
                      key={i}
                      to={item.route}
                      className={`${classes.link}`}
                      onClick={() => setOpenTopDrawer(false)}
                      style={({ isActive }) => {
                        return {
                          pointerEvents: item.disabled ? 'none' : 'auto',
                          textDecoration: 'none',
                          fontWeight: isActive ? 'bold' : 'normal',
                          letterSpacing: isActive ? '.5px' : '0px',
                          width: '100%',
                          textAlign: 'center',
                          padding: 8,
                          borderRadius: 20,
                        };
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: 'inherit',
                          letterSpacing: 'inherit',
                        }}
                        variant="bodyMedium4"
                      >
                        {item.title}
                      </Typography>
                    </NavLink>
                  ))}
              </Grid>
            </Drawer>
          </Grid>
          {!belowXl1 && (
            <Grid container gap={3} width={'fit-content'}>
              {menuItems &&
                menuItems
                  .filter(item => !item.hide)
                  ?.map((item, i) => (
                    <>
                      <Box
                        component={NavLink}
                        to={item.route}
                        key={i}
                        sx={{
                          px: 1,
                          textDecoration: 'none',
                          display: 'inline-block',
                          color: 'Base.white',
                          pointerEvents: item.disabled ? 'none' : 'auto',
                          '&.active': {
                            borderBottom: '2px solid',
                            borderColor: 'Base.white',
                            borderRadius: 0.25,
                            fontWeight: 'bold',
                            letterSpacing: '0.5px',
                          },
                        }}
                      >
                        <NavLink
                          to={item.route}
                          key={i}
                          style={({ isActive }) => {
                            return {
                              pointerEvents: item.disabled ? 'none' : 'auto',
                              textDecoration: isActive ? 'none' : 'none',
                              // textDecorationColor: 'white',
                              fontWeight: isActive ? 'bold' : 'normal',
                              letterSpacing: isActive ? '.5px' : '1px',
                              color: 'Base.white',
                            };
                          }}
                        >
                          <Typography
                            sx={{
                              fontWeight: 'inherit',
                              color: item.disabled ? 'Neutral.50' : 'Base.white',
                            }}
                            variant="subtitle2"
                            onMouseEnter={event => {
                              if (
                                item.title === 'Settings' &&
                                !isProviderPortal &&
                                !isPatientPortal
                              ) {
                                handleSubMenuClick(event);
                              }
                              if (item.title === 'Settings' && isPatientPortal) {
                                handleSubMenuClientClick(event);
                              }
                            }}
                            onClick={event => {
                              if (
                                item.title === 'Settings' &&
                                !isProviderPortal &&
                                !isPatientPortal
                              ) {
                                handleSubMenuClick(event);
                              }
                              if (item.title === 'Settings' && isPatientPortal) {
                                handleSubMenuClientClick(event);
                              }
                            }}
                          >
                            {item.title}
                          </Typography>
                        </NavLink>
                      </Box>
                      {item.title === 'Settings' && !isProviderPortal && !isPatientPortal && (
                        <AdminSettings
                          anchorEl={subMenuAnchorEl}
                          open={subMenuOpen}
                          handleClose={handleSubMenuClose}
                        />
                      )}
                      {item.title === 'Settings' && isPatientPortal && (
                        <ClientSettings
                          anchorEl={subMenuAnchorClientEl}
                          open={subMenuClientOpen}
                          handleClose={handleSubMenuClientClose}
                        />
                      )}
                    </>
                  ))}
            </Grid>
          )}
        </Grid>

        <Grid size={3}>
          <Grid
            container
            gap={1}
            display={'flex'}
            alignItems={'center'}
            width={'100%'}
            justifyContent={'space-between'}
          >
            <Grid size={8}>
              {isProviderPortal && (
                <CustomAutoComplete
                  placeholder={clinicOptions.length === 0 ? 'No Clinic Associated' : ''}
                  autoname="selectedClinic"
                  onChange={handleClinicChange}
                  value={clinicOptions.find(clinic => clinic.value === selectedClinic)?.key || ''}
                  options={clinicOptions}
                  bgWhite
                  customHeight="30px !important"
                />
              )}
            </Grid>
            <Grid size={1}>
              <UserProfile userData={userData?.data} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default TopMenu;
