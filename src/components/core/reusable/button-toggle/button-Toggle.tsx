import { ToggleButton, ToggleButtonGroup, ToggleButtonGroupProps } from '@mui/material';
import React from 'react';

interface TimeRangeToggleProps extends Omit<ToggleButtonGroupProps, 'children' | 'value' | 'onChange'> {
  options: { value: string; label: string }[];
  value: string | null;
  onChange: (event: React.MouseEvent<HTMLElement>, newValue: string | null) => void;
}

const Toggle: React.FC<TimeRangeToggleProps> = ({ options, value, onChange, ...props }) => {
  return (
    <ToggleButtonGroup
      value={value}
      onChange={onChange}
      aria-label="Time Range"
     exclusive
      sx={{
        borderRadius: 0.5,
        backgroundColor: 'Neutral.20',
        boxShadow: '0 1px 4px 0 rgba(0,0,0,0.04)',
        p: 0.5,
        maxWidth: '100%',
        width: '100%',
        '.MuiToggleButtonGroup-grouped': {
          flex: 1,
          minWidth: 0,
          border: 0,
          borderRadius: 0.5,
          '&.Mui-selected': {
            backgroundColor: 'Base.white',
            color: 'Primary.main',
            border:'1px solid',
            borderColor:'Neutral.40',
            fontWeight: 500,
          },
          '&:not(.Mui-selected)': {
            color: '#727272',
            backgroundColor: 'transparent',
          },
        },
      }}
      {...props}
    >
      {options.map((option) => (
        <ToggleButton
          key={option.value}
          value={option.value}
          aria-label={option.label}
          sx={{
            borderRadius: 0.5,
            padding:0.5,
            fontSize: '1rem',
            textTransform: 'none',
            fontWeight: 500,
            backgroundColor: 'transparent',
            '&.Mui-selected': {
              backgroundColor: 'Base.white',
              color: 'Neutral.60',
            },
            '&:not(.Mui-selected)': {
              color: 'Primary.main',
            },
          }}
        >
          {option.label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

export default Toggle; 