import { Autocomplete, Box, IconButton, Paper, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { Delete } from '@mui/icons-material';
import {
  errorStyle,
} from 'src/components/core/reusable/custom-input/widgets/customInputStyles';

interface Option {
  key: string;
  value: string;
}

interface CustomClinicSelectProps {
  options: Option[];
  selectedValue: Option[];
  onValueAdd: (clinicKey: string) => void;
  onValueRemove: (clinicKey: string) => void;
  placeholder?: string;
  hasError?: boolean;
  errorMessage?: string;
  hideDropdown?: boolean;
  noRecords?: boolean;
  bgWhite?: boolean;
  onInputChange?: (inputValue: any) => void;
}

const CustomClinicSelect = ({
  options,
  selectedValue,
  onValueAdd,
  onValueRemove,
  placeholder,
  hasError = false,
  errorMessage = '',
  hideDropdown,
  noRecords,
  bgWhite,
  onInputChange,
}: CustomClinicSelectProps) => {
  const [inputValue, setInputValue] = useState('');

  const handleSelection = (_event: any, value: string | null) => {
    if (value) {
      const selectedOption = options.find(option => option.value === value);
      if (selectedOption) {
        onValueAdd(selectedOption.key);
        setInputValue('');
        // Reset search to reload all options
        if (onInputChange) {
          onInputChange('');
        }
      }
    }
  };

  return (
    <Box>
      {!hideDropdown && (
        <Autocomplete
          value={null as any}
          inputValue={inputValue}
          onInputChange={(_event, newInputValue) => {
            setInputValue(newInputValue);
            if (onInputChange) {
              onInputChange(newInputValue);
            }
          }}
          onChange={handleSelection}
          onOpen={() => {
            // Ensure all options are loaded when dropdown opens
            if (inputValue === '' && onInputChange) {
              onInputChange('');
            }
          }}
          options={options.map(option => option.value)}
          renderInput={params => (
            <TextField
              {...params}
              placeholder={placeholder}
              sx={{
                background: bgWhite ? 'white' : 'inherit',

                '& .MuiOutlinedInput-root': {
                  border: hasError ? '1px solid red' : '1px solid #ccc',
                  borderRadius: '4px',
                  height: '40px',
                  '& fieldset': {
                    border: 'none',
                  },
                  '&:hover': {
                    border: hasError ? '1px solid red' : '1px solid #999',
                  },
                  '&.Mui-focused': {
                    border: '1px solid #1976d2',
                  },
                },
                '& .MuiInputBase-input': {
                  padding: '8px 12px',
                  fontSize: '14px',
                  fontFamily: 'Roboto',
                },
              }}
            />
          )}
          PaperComponent={props => <Paper {...props} />}
          clearIcon={null}
          disableClearable
          size="small"
          disablePortal
        />
      )}
      {hasError && (
        <Typography sx={errorStyle} variant="titleMedium5">
          {errorMessage}
        </Typography>
      )}

      {selectedValue?.length > 0 ? (
        <Box sx={{ mt: 2 }}>
          <Box sx={{ pl: 2 }}>
            {selectedValue?.map(clinic => (
              <Box
                key={clinic.key}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  py: 0.5,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="body2" style={{ display: 'flex' }}>
                    <Typography variant="body2" sx={{ mr: 1, color: '#666' }}>
                      •
                    </Typography>
                    {clinic.value}
                  </Typography>
                </Box>
                {!hideDropdown && (
                  <IconButton
                    size="small"
                    onClick={() => onValueRemove(clinic.key)}
                    sx={{
                      color: '#f44336',
                      padding: '4px',
                      '&:hover': {
                        backgroundColor: 'rgba(244, 67, 54, 0.1)',
                      },
                    }}
                  >
                    <Delete fontSize="small" />
                  </IconButton>
                )}
              </Box>
            ))}
          </Box>
        </Box>
      ) : (
        <Typography variant="body2" style={{ display: 'flex', color: '#b6b4b4' }}>
          {!noRecords && 'No Records Selected'}
        </Typography>
      )}
    </Box>
  );
};

export default CustomClinicSelect;
