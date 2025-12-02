import { Box, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

interface TabItem {
  label: string;
  path: string;
}

interface TabNavigationProps {
  menuItems: TabItem[];
  basePath: string;
  onTabChange?: (tab: string) => void;  
}

const SettingTab: React.FC<TabNavigationProps> = ({ menuItems, basePath, onTabChange }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentTab = location.pathname.split('/').pop();

  const handleClick = (path: string) => {
    navigate(`${basePath}/${path}`);
    onTabChange?.(path); 
  };

  return (
    <Box
      sx={{
        display: 'inline-flex',
        backgroundColor: 'Neutral.30',
        borderRadius: 1,
        p: 0.8,
        gap: 1.5,
      }}
    >
      {menuItems.map((item) => {
               const isActive = item.path === currentTab;

        return (
          <Box
            key={item.label}
            onClick={() => handleClick(item.path)}
            sx={{
              px: 2,
              py: 1,
              borderRadius: 1,
              bgcolor: isActive ? 'Base.white' : 'transparent',
              color: isActive ? 'Primary.main' : 'Base.black',
              fontWeight: isActive ? 600 : 400,
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: 'action.hover',
              },
            }}
          >
            <Typography variant="body2">{item.label}</Typography>
          </Box>
        );
      })}
    </Box>
  );
};

export default SettingTab;
