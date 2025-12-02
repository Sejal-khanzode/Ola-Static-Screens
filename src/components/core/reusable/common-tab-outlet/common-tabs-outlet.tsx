import { Box, Tab, Tabs, useMediaQuery, useTheme } from '@mui/material';
import React, { useState } from 'react';

export const tabSx = {
  '& .MuiTabs-indicator': {
    display: 'none',
  },
  '& .MuiTabs-flexContainer': {
    gap: '4px',
  },
  backgroundColor: 'Neutral.30',
  padding: '3px',
  height: '41px',
  borderRadius: '10px',
};

export const tabLabel = {
  fontSize: '14px',
  fontWeight: 500,
  fontFamily: 'Roboto',
  textTransform: 'none',
  minHeight: '35px',
  padding: 1,
  borderRadius: '6px',
  backgroundColor: 'transparent',
  color: 'Neutral.70',
  transition: 'all 0.2s ease',

  '&.Mui-selected': {
    backgroundColor: 'Base.white',
    color: 'Primary.main',
    fontWeight: 600,
    boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
  },
};

interface TabConfig {
  id: string;
  label: string;
  component: React.ComponentType<any>;
  disabled?: boolean;
  actions?: React.ReactNode;
  props?: any;
}

interface CommonTabsOutletProps {
  tabsConfig: TabConfig[];
  renderTabActions?: (activeTabId: string) => React.ReactNode;
  componentProps?: any;
}

const CommonTabsOutlet: React.FC<CommonTabsOutletProps> = ({ tabsConfig, componentProps }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [selectedSubTab, setSelectedSubTab] = useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    if (tabsConfig[newValue].disabled) return;
    setSelectedSubTab(newValue);
  };

  const a11yProps = (index: number) => {
    return {
      id: `subtab-${index}`,
      'aria-controls': `subtab-panel-${index}`,
    };
  };

  const SubTabComponent = tabsConfig[selectedSubTab]?.component;
  const currentTabActions = tabsConfig[selectedSubTab]?.actions;

  return (
    <Box>
      <Box sx={{ p: 1, borderBottom: '1px solid #E0E0E0' }}>
        <Box
          display="flex"
          flexDirection={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          width="100%"
          alignItems={{ xs: 'flex-start', sm: 'center' }}
        >
          <Box sx={{ ...tabSx, width: { xs: '100%', md: 'auto' } }}>
            <Tabs
              value={selectedSubTab}
              onChange={handleTabChange}
              variant={isMobile ? 'scrollable' : 'standard'}
              scrollButtons="auto"
            >
              {tabsConfig.map((tab, index) => (
                <Tab
                  key={index}
                  label={tab.label}
                  disabled={tab.disabled}
                  {...a11yProps(index)}
                  sx={{
                    ...tabLabel,
                    ...(tab.disabled && {
                      color: '#BDBDBD !important',
                      cursor: 'not-allowed',
                      '&:hover': {
                        backgroundColor: 'transparent',
                      },
                    }),
                  }}
                />
              ))}
            </Tabs>
          </Box>

          <Box
            display="flex"
            gap={1}
            alignItems="center"
            width={{ xs: '100%', sm: 'auto' }}
            justifyContent={{ xs: 'flex-end', sm: 'flex-start' }}
          >
            {currentTabActions}
          </Box>
        </Box>
      </Box>

      <Box sx={{ p: 2, minHeight: 100 }}>
        {SubTabComponent ? (
          <SubTabComponent {...componentProps} {...(tabsConfig[selectedSubTab]?.props || {})} />
        ) : null}
      </Box>
    </Box>
  );
};

export default CommonTabsOutlet;
