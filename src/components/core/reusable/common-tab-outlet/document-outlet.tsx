import { Box, Tab, Tabs, useTheme } from '@mui/material';
import React, { useState } from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export const tabSx = {
  borderColor: 'divider',
  '& .MuiTabs-indicator': { display: 'none' },
  '& .MuiTabs-flexContainer': { height: '100%', gap: 1 },
  padding: 0,
  '& .MuiTab-root': {
    minWidth: 'auto',
    padding: 0.5,
    backgroundColor: 'transparent',
  },
};

export const tabLabel = {
  fontSize: '14px',
  fontWeight: '500',
  fontFamily: 'Roboto',
  textTransform: 'none',
  color: 'Neutral.70',
  '&.Mui-selected': {
    color: 'Primary.main',
    fontWeight: '600',
  },
};

interface TabConfig {
  id: string;
  label: string;
  component: React.ComponentType<any>;
  disabled?: boolean;
  completed?: boolean;
  props?: Record<string, any>;
}

interface TabsOutletProps {
  tabsConfig: TabConfig[];
  onTabChange?: (currentTab: number, previousTab: number) => void;
}

const DocumentTabsOutlet: React.FC<TabsOutletProps> = ({ tabsConfig, onTabChange }) => {
  const theme = useTheme();
  const [selectedSubTab, setSelectedSubTab] = useState(0);
  const [mountedTabs, setMountedTabs] = useState<Set<number>>(new Set([0]));

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    const prev = selectedSubTab;
    setSelectedSubTab(newValue);
    setMountedTabs((prevSet) => new Set(prevSet).add(newValue));
    onTabChange?.(newValue, prev);
  };

  return (
    <Box>
      <Box sx={{ p: 1, borderBottom: '1px solid #E0E0E0' }}>
        <Tabs
          value={selectedSubTab}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{
            width: '100%',
            ...tabSx,
            '& .MuiTabs-flexContainer': { justifyContent: 'space-between' },
          }}
        >
          {tabsConfig.map((tab) => (
            <Tab
              key={tab.id}
              label={
                <Box display="flex" alignItems="center" gap={1}>
                  {tab.label}
                  {tab.completed && (
                    <CheckCircleIcon
                      sx={{ fontSize: 18, color: theme.palette.success.main }}
                    />
                  )}
                </Box>
              }
              sx={{
                flex: 1,
                textAlign: 'center',
                ...tabLabel,
                '&.Mui-selected': {
                  borderBottom: '3px solid',
                  borderColor: 'Primary.main',
                  color: 'Primary.main',
                },
              }}
            />
          ))}
        </Tabs>
      </Box>

      <Box sx={{ p: 2, minHeight: 100 }}>
        {tabsConfig.map((tab, i) => {
          if (!mountedTabs.has(i)) return null;
          const TabComponent = tab.component;
          return (
            <Box key={tab.id} hidden={selectedSubTab !== i}>
              <TabComponent {...(tab.props || {})} />
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default React.memo(DocumentTabsOutlet);
