import React, { useState, useEffect } from 'react';
import { Grid, Box, Slider, Typography, IconButton } from '@mui/material';
import * as muiColors from '@mui/material/colors';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

interface ColorPickerProps {
  value?: string;
  onChange: (color: string) => void;
  hasError?: boolean;
  errorMessage?: string;
  defaultColor?: string;
}

const shadeOptions = [100, 300, 500, 700, 900];

// Generate random hex color - moved outside component
export const generateRandomHex = (): string => {
  const randomHex = Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0');

  return `#${randomHex}`;
};

const CustomColorPicker: React.FC<ColorPickerProps> = ({
  value,
  onChange,
  hasError,
  errorMessage,
  defaultColor,
}) => {
  const [shade, setShade] = useState(500);
  const [selectedColor, setSelectedColor] = useState(value || defaultColor || generateRandomHex());
  const [open, setOpen] = useState(false);

  // Sync selectedColor with value prop changes
  useEffect(() => {
    if (value) {
      setSelectedColor(value);
    } else if (defaultColor) {
      setSelectedColor(defaultColor);
    }
  }, [value, defaultColor]);

  const colorFamilies = [
    'red',
    'pink',
    'purple',
    'deepPurple',
    'indigo',
    'blue',
    'lightBlue',
    'cyan',
    'teal',
    'green',
    'lightGreen',
    'lime',
    'yellow',
    'amber',
    'orange',
    'deepOrange',
  ];

  const handleColorClick = (family: string) => {
    const hex = (muiColors as any)[family][shade];
    setSelectedColor(hex);
    onChange(hex);
    setOpen(false); // collapse after selection
  };

  const handleShadeChange = (_: any, newValue: number | number[]) => {
    if (typeof newValue === 'number') {
      setShade(newValue);
      if (selectedColor) {
        const family = Object.keys(muiColors).find(f =>
          Object.values((muiColors as any)[f]).includes(selectedColor)
        );
        if (family) {
          const hex = (muiColors as any)[family][newValue];
          setSelectedColor(hex);
          onChange(hex);
        }
      }
    }
  };

  return (
    <Box>
      <Box
        onClick={() => setOpen(!open)}
        sx={{
          display: 'flex',
          alignItems: 'center',
          border: '1px solid ',
          borderColor: 'Neutral.40',
          p: 1,
          borderRadius: 1,
          cursor: 'pointer',
          justifyContent: 'space-between',
        }}
      >
        <Box
          sx={{
            backgroundColor: selectedColor || defaultColor || generateRandomHex(),
            width: 100,
            height: 30,
            borderRadius: 0.5,
          }}
        />
        <IconButton size="small">
          <ArrowDropDownIcon />
        </IconButton>
      </Box>

      {/* Picker UI */}
      {open && (
        <Box mt={0.5} p={1} border="1px solid #ddd" borderRadius={1}>
          <Typography variant="subtitle2" >
            Shade: {shade}
          </Typography>
          <Grid m={1}>
            <Slider
              value={shade}
              onChange={handleShadeChange}
              step={100}
              marks={shadeOptions.map(s => ({ value: s, label: s.toString() }))}
              min={100}
              max={900}
            />
          </Grid>

          <Grid display="flex" size={12}>
            {colorFamilies.map(family => {
              const hex = (muiColors as any)[family][shade];
              return (
                <Grid key={family}>
                  <Box
                    onClick={() => handleColorClick(family)}
                    sx={{
                      backgroundColor: hex,
                      width: 26,
                      height: 30,
                      cursor: 'pointer',
                      border: selectedColor === hex ? '2px solid black' : '',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  />
                </Grid>
              );
            })}
          </Grid>
        </Box>
      )}

      {hasError && (
        <Typography variant="caption" color="error">
          {errorMessage}
        </Typography>
      )}
    </Box>
  );
};

export default CustomColorPicker;
