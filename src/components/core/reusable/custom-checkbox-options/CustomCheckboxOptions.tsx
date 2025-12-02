import React from 'react';
import { Box, Checkbox, FormControlLabel, Button, Typography } from '@mui/material';

interface CustomCheckboxOptionsProps {
  items: { value: string; label: string; color?: string }[];
  selectedValues: string[];
  onChange: (newSelectedValues: string[]) => void;
  onClear: () => void;
}

const CustomCheckboxOptions: React.FC<CustomCheckboxOptionsProps> = ({ items, selectedValues, onChange, onClear }) => {

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const newSelected = event.target.checked
      ? [...selectedValues, value]
      : selectedValues.filter((item) => item !== value);
    onChange(newSelected);
  };

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      onChange(items.map(item => item.value));
    } else {
      onChange([]);
    }
  };

  return (
    <Box sx={{ p: 1, display: 'flex', flexDirection: 'column' }}>
      <FormControlLabel
        control={
          <Checkbox
            checked={selectedValues.length === items.length && items.length > 0}
            onChange={handleSelectAll}
            sx={{
              color: 'Primary.main',
              '&.Mui-checked': {
                color: 'Primary.main',
              },
            }}
          />
        }
        label={<Typography variant="titleSemiBold5">All</Typography>}
      />

      {items.map((item) => (
        <FormControlLabel
          key={item.value}
          control={
            <Checkbox
              checked={selectedValues.includes(item.value)}
              onChange={handleCheckboxChange}
              value={item.value}
              sx={{
                color: 'Primary.main',
                '&.Mui-checked': {
                  color: 'Primary.main',
                },
              }}
            />
          }
          label={
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {item.color && (
                <Box
                  sx={{
                    width: 16,
                    height: 16,
                    borderRadius: '4px',
                    backgroundColor: item.color,
                    mr: 1,
                  }}
                />
              )}
              <Typography variant="bodyMedium5">{item.label}</Typography>
            </Box>
          }
        />
      ))}

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1, borderTop: '1px solid #979797' }}>
        <Button variant="text" sx={{ textTransform: 'none', color: 'Primary.main' }} onClick={onClear}>
          <Typography variant="titleSemiBold5">Clear</Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default CustomCheckboxOptions;
