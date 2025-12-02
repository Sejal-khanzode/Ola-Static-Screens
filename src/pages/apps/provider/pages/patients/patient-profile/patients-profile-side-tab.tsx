import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import FolderCopyOutlinedIcon from '@mui/icons-material/FolderCopyOutlined';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import { Box, Grid, List, ListItem, Typography } from '@mui/material';
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

export const patientProfileSideBarMenu = [
  {
    id: 'Dashboard',
    name: 'Dashboard',
    icon: <DashboardOutlinedIcon />,
    route: 'dashboard',
    clickable: true,
  },
  {
    id: 'Appointments',
    name: 'Appointments',
    icon: <WatchLaterOutlinedIcon />,
    route: 'appointments',
    clickable: true,
  },

  {
    id: 'Orders',
    name: 'Orders',
    icon: <AttachMoneyOutlinedIcon />,
    route: 'billing',
    clickable: false,
  },
  {
    id: 'Insurance',
    name: 'Insurance',
    icon: <AccountBalanceOutlinedIcon />,
    route: 'insurance',
    clickable: true,
  },
  {
    id: 'Documents',
    name: 'Documents',
    icon: <FolderCopyOutlinedIcon />,
    route: 'documents',
    clickable: true,
  },
  {
    id: 'Profile',
    name: 'Profile',
    icon: <PersonOutlineOutlinedIcon />,
    route: 'profile-details',
    clickable: true,
  },
];

function PatientProfileSidebar({
  onTabChange,
  selectedTab,
}: {
  onTabChange?: (tabId: string) => void;
  selectedTab?: string;
}) {
  const navigate = useNavigate();
  const location = useLocation();

  // Function to get the current tab based on URL path matching
  const getCurrentTabFromUrl = (): string | undefined => {
    const currentPath = location.pathname;
    const lastSegment = currentPath.split('/').pop();

    // Find the tab whose route matches the last URL segment
    const matchingTab = patientProfileSideBarMenu.find(tab => {
      return tab.route === lastSegment;
    });

    return matchingTab?.id;
  };

  // Use selectedTab if provided, otherwise derive from URL path matching
  const activeTab = getCurrentTabFromUrl() || selectedTab;

  const navigateSidebar = (route: string, id: string) => {
    // Let parent handle state management
    if (onTabChange) {
      onTabChange(id);
    }

    const basePath = location.pathname.split('/').slice(0, -1).join('/');
    navigate(`${basePath}/${route}`);
  };

  return (
    <Box
      sx={{
        width: '10vw',
        backgroundColor: '#FFFFFF',
        border: '1px solid #E7E7E7',
        borderRadius: '8px',
      }}
    >
      <Grid sx={{ flex: 1 }}>
        <List
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
          }}
        >
          {patientProfileSideBarMenu.map(tab => {
            const isSelected = activeTab === tab.id;
            return (
              <ListItem
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '10px',
                  cursor: tab.clickable ? 'pointer' : 'not-allowed',
                  backgroundColor: isSelected ? '#F0F8FF' : 'transparent',
                  borderLeft: '3px solid ',
                  borderColor: isSelected ? 'Primary.main' : 'Primary.0',
                  opacity: tab.clickable ? 1 : 0.5,
                  '&:hover': {
                    backgroundColor: tab.clickable ? '#F0F8FF' : 'transparent',
                  },
                }}
                key={tab.id}
                onClick={() => tab.clickable && navigateSidebar(tab.route, tab.id)}
              >
                <Typography
                  variant="titleSemiBold4"
                  noWrap
                  title={tab.name}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                  }}
                >
                  <Box
                    sx={{
                      width: 20,
                      height: 20,
                      color: isSelected ? 'Primary.main' : 'Neutral.60',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {tab.icon}
                  </Box>
                  <Typography
                    variant="titleSemiBold4"
                    component="span"
                    sx={{
                      ml: 1,
                      fontWeight: isSelected ? 600 : 400,
                      color: isSelected ? 'Primary.main' : 'Neutral.70',
                    }}
                  >
                    {tab.name}
                  </Typography>
                </Typography>
              </ListItem>
            );
          })}
        </List>
      </Grid>
    </Box>
  );
}

export default PatientProfileSidebar;
