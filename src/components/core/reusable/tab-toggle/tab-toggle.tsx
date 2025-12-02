import React from 'react';
import { ToggleButton, ToggleButtonGroup, Typography, Box } from '@mui/material';

interface TabToggleProps {
  value: string;
  onChange: (value: string) => void;
  options: { label: string; value: string; count: number }[];
}

const TabToggle: React.FC<TabToggleProps> = ({ value, onChange, options }) => (
  <ToggleButtonGroup
    value={value}
    exclusive
    onChange={(_, newValue) => {
      if (newValue !== null) onChange(newValue);
    }}
    sx={{
      backgroundColor: 'transparent',
      borderRadius: 0,
      '& .MuiToggleButtonGroup-grouped': {
        border: 0,
        borderRadius: 0,
        mx: 2,
        py: 1,
        px: 0, fontWeight:'500', fontSize:'16px',
        '&.Mui-selected': {
          backgroundColor: 'transparent',
          color: 'Primary.main',
          paddingX:2, 
          borderBottom: '3px solid ', 

          '&:hover': {
            backgroundColor: 'transparent',
          },
        },
        '&:not(.Mui-selected)': {
          color: 'Neutral.60', 
          backgroundColor: 'transparent',
          '&:hover': {
            backgroundColor: 'transparent',
          },
        },
      },
    }}
  >
    {options.map(opt => (
      <ToggleButton key={opt.value} value={opt.value}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Typography variant="titleSemiBold3" sx={{ textTransform: 'none', fontWeight: 'inherit' }}>
            {opt.label}
          </Typography>
          <Box
            sx={{
              backgroundColor: 'Primary.10', 
              color: 'Primary.main', 
              borderRadius: '50%',
              minWidth: 20, 
              height: 20,
              display: 'flex', padding:1,
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.75rem',
              fontWeight: 600,
            }}
          >
            {opt.count}
          </Box>
        </Box>
      </ToggleButton>
    
    ))}
  </ToggleButtonGroup>
);

export default TabToggle;