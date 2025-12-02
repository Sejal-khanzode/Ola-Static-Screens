import { Box } from '@mui/material';
import { Outlet, useLocation } from 'react-router-dom';
import PatientProfileSidebar from './patients-profile-side-tab';
import { useEffect, useState } from 'react';
// import Dashboard from '../dashboard/dashboard';

// Tab component mapping - use consistent IDs that match sidebar
const TAB_COMPONENTS: Record<string, React.ComponentType> = {
  // Dashboard: Dashboard,
};

function PatientProfileOutlet({ customSetTab }: { customSetTab?: string }) {
  const location = useLocation();

  // Initialize selectedTab from URL - FIXED: Match sidebar route names to tab IDs
  const getTabFromUrl = () => {
    const currentPath = location.pathname.split('/').pop();
    // This mapping should match exactly with the sidebar routes and IDs
    const routeToTabMap: Record<string, string> = {
      // dashboard: 'Dashboard',
      'profile-details': 'Profile',
    };
    return routeToTabMap[currentPath || ''] || 'Profile';
  };

  const [selectedTab, setSelectedTab] = useState(getTabFromUrl());

  // Sync with URL changes
  useEffect(() => {
    const tabId = getTabFromUrl();
    setSelectedTab(tabId);
  }, [location.pathname]);

  // Handle external tab changes
  useEffect(() => {
    if (customSetTab) {
      setSelectedTab(customSetTab);
    }
  }, [customSetTab]);

  const handleTabChange = (tabId: string) => {
    setSelectedTab(tabId);
  };

  // Smart component renderer - render based on URL, not state
  const renderTabContent = () => {
    // Always get the current tab from URL for rendering
    const currentTabFromUrl = getTabFromUrl();

    const TabComponent = TAB_COMPONENTS[currentTabFromUrl];
    return TabComponent ? <TabComponent /> : <Outlet />;
  };

  return (
    <Box
      display="flex"
      width="100%"
      height="100%"
      sx={{ display: 'flex', gap: 2, maxHeight: '81vh' }}
    >
      <PatientProfileSidebar onTabChange={handleTabChange} selectedTab={selectedTab} />
      <Box
        sx={{
          flex: 1,
          background: '#FFFFFF',
          borderTop: '1px solid #E7E7E7',
          overflowY: 'scroll',
          borderRadius: '8px',
        }}
      >
        {renderTabContent()}
      </Box>
    </Box>
  );
}

export default PatientProfileOutlet;
