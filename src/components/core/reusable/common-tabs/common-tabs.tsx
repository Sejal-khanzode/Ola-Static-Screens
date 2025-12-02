import { Tab, Tabs, Box } from '@mui/material';
import { useState } from 'react';

interface TabItem {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

interface ActionButton {
  label: string;
  icon?: React.ReactNode;
  variant?: 'filled' | 'outlined';
  onClick: () => void;
  showCondition?: (currentTab: number) => boolean;
}

interface CommonTabsProps {
  tabItems: TabItem[];
  actionButtons?: ActionButton[];
  onTabChange?: (selectedTab: number) => void;
  showActions?: boolean;
  tabValue?: number;
  onTabValueChange?: (value: number) => void;
  customStyles?: {
    container?: React.CSSProperties;
    tabsContainer?: React.CSSProperties;
  };
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const CommonTabs = (props: CommonTabsProps) => {
  const {
    tabItems,
    onTabChange,
    tabValue: externalTabValue,
    onTabValueChange,
    customStyles = {},
  } = props;

  const [internalTabValue, setInternalTabValue] = useState(0);

  const currentTabValue = externalTabValue !== undefined ? externalTabValue : internalTabValue;

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    if (onTabValueChange) {
      onTabValueChange(newValue);
    } else {
      setInternalTabValue(newValue);
    }
    
    if (onTabChange) {
      onTabChange(newValue);
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', ...customStyles.container }}>
      <Box
        sx={{
          backgroundColor: 'Neutral.30',
          borderRadius: '8px',
          padding: '4px',
          display: 'flex',
          alignItems: 'center',
          ...customStyles.tabsContainer,
        }}
      >
        <Tabs
          value={currentTabValue}
          onChange={handleChange}
          sx={{
            minHeight: '35px',
            '& .MuiTabs-indicator': {
              display: 'none',
            },
            '& .MuiTabs-flexContainer': {
              gap: '4px',
            },
          }}
        >
          {tabItems?.map((item, index) => (
            <Tab
              key={index}
              label={item.label}
              iconPosition="start"
              {...a11yProps(index)}
              sx={{
                minHeight: '25px',
                padding: 1,
                borderRadius: '6px',
                textTransform: 'none',
                fontWeight: 500,
                fontFamily: 'Roboto',
                fontSize: '14px',
                color: currentTabValue === index ? 'Primary.main' : 'Neutral.80',
                backgroundColor: currentTabValue === index ? 'Base.white' : 'transparent',
                boxShadow: currentTabValue === index ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  backgroundColor: currentTabValue === index ? 'Base.white' : 'transparent',
                },
                '&.Mui-selected': {
                  color: 'Primary.main',
                  backgroundColor: 'Base.white',
                },
              }}
            />
          ))}
        </Tabs>
      </Box>

    
    </Box>
  );
};

export default CommonTabs; 