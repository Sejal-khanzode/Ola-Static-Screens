import { useLocation } from 'react-router-dom';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ContentPasteOutlinedIcon from '@mui/icons-material/ContentPasteOutlined';

const useMenu = () => {
  const location = useLocation();

  const pathArr = location.pathname
    ?.trim()
    .split('/')
    .filter(path => path?.length);
  const pathPrefix = (pathArr && pathArr[0]) || '';

  const adminSideMenu = [
    {
      title: 'Clinics',
      route: '/admin/clinics',
      // icon: <GridViewIcon />,
      hide: false,
      disabled: false,
    },
    {
      title: 'Codes',
      route: '/admin/codes',
      // icon: <GridViewIcon />,
      hide: false,
      disabled: false,
    },
    {
      title: 'Users',
      route: '/admin/users',
      // icon: <GridViewIcon />,
      hide: false,
      disabled: false,
    },
    {
      title: 'Templates',
      route: '/admin/templates',
      // icon: <GridViewIcon />,
      hide: false,
      disabled: false,
    },
    {
      title: 'Settings',
      route: '/admin/settings',
      hide: false,
      disabled: false,
    },
  ];

  const providerSideMenu = [
    {
      title: 'Dashboard',
      route: '/provider/dashboard',
      hide: false,
      disabled: false,
    },
    {
      title: 'Scheduling',
      route: '/provider/scheduling',
      icon: <ContentPasteOutlinedIcon />,
      hide: false,
      disabled: false,
    },
    {
      title: 'Patients',
      route: '/provider/patients',
      icon: <SettingsOutlinedIcon />,
      hide: false,
      disabled: false,
    },
    {
      title: 'Communications',
      route: '/provider/communications',
      icon: <SettingsOutlinedIcon />,
      hide: false,
      disabled: true,
    },
    {
      title: 'Billing',
      route: '/provider/billing',
      icon: <SettingsOutlinedIcon />,
      hide: false,
      disabled: false,
    },
    {
      title: 'Referrals',
      route: '/provider/referrals',
      icon: <SettingsOutlinedIcon />,
      hide: false,
      disabled: true,
    },
    {
      title: 'Reports',
      route: '/provider/reports',
      icon: <SettingsOutlinedIcon />,
      hide: false,
      disabled: true,
    },
    {
      title: 'Settings',
      route: '/provider/settings',
      icon: <SettingsOutlinedIcon />,
      hide: false,
      disabled: false,
    },
  ];

  const clientSideMenu = [
    {
      title: 'Appointments',
      route: '/client/appointments',
      // icon: <GridViewIcon />,
      hide: false,
      disabled: false,
    },
    {
      title: 'Documents',
      route: '/client/documents',
      hide: false,
      disabled: false,
    },
    {
      title: 'Settings',
      route: '/client/settings',
      hide: false,
      disabled: false,
    },
  ];

  return pathPrefix === 'admin'
    ? adminSideMenu
    : pathPrefix === 'provider'
      ? providerSideMenu
      : pathPrefix === 'client'
        ? clientSideMenu
        : [];
};

export default useMenu;
