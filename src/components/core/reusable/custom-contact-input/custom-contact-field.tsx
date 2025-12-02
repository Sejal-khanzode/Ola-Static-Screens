declare global {
  interface Window {
    MSStream?: object;
  }
}

import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { Box, FormHelperText } from '@mui/material';
import {
  errorStyle,
  inputStyle,
  placeHolderStyle,
} from '../custom-input/widgets/customInputStyles';

const customcontactFieldStyles = {
  '& .react-tel-input': {
    width: '100%',
  },
  '& .form-control': {
    ...inputStyle,
    padding: '11.5px 14px 11.5px 50px',
    borderRadius: '4px',
    width: '100%',
    height: '40px',
    outline: 'none',
    border: '1px solid',
    borderColor: 'Neutral.50',
    '&:focus': {
      borderColor: 'Neutral.50',
      borderWidth: '1px',
    },
    '&:disabled': {
      backgroundColor: '#f5f5f5',
      color: '#666',
    },
    '&::placeholder': {
      ...placeHolderStyle,
    },
  },
  '& .form-control--error': {
    borderColor: 'red',
    borderWidth: '1px',
  },
  '& .flag-dropdown': {
    position: 'absolute',
    left: '0',
    top: '0',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '8px',
    pointerEvents: 'none',
    '& .selected-flag': {
      background: 'none',
      border: 'none',
      padding: '0',
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      '&:hover': {
        background: 'none',
      },
      '&:focus': {
        background: 'none',
      },
    },
    '& .flag': {
      transform: 'scale(0.9)',
      marginRight: '2px',
    },
    '& .arrow': {
      display: 'none',
    },
    '& .country-name': {
      display: 'none',
    },
    '& .dial-code': {
      color: 'black',
      fontSize: '14px',
      fontWeight: '400',
      fontFamily: 'Roboto,Helvetica,Arial,sans-serif',
    },
  },
};

interface CustomContactInputProps {
  value?: string | number;
  hasError?: boolean;
  errorMessage?: string | unknown;
  placeholder: string;
  isDisabled?: boolean;
  onChange(selectedValue?: string): void;
  disableFlag?: boolean;
  name: string;
  readonly?: boolean;
}

export default function CustomContactInput(props: CustomContactInputProps) {
  const { value, hasError, errorMessage, isDisabled, onChange, name, placeholder, readonly } =
    props;

  const handleChange = (phoneNumber: string) => {
    if (phoneNumber) {
      let formattedNumber = phoneNumber;
      if (!formattedNumber.startsWith('+')) {
        formattedNumber = '+' + formattedNumber;
      }
      if (!formattedNumber.startsWith('+1')) {
        formattedNumber = '+1' + formattedNumber.replace('+', '');
      }
      onChange(formattedNumber);
    } else {
      onChange('');
    }
  };

  return (
    <Box sx={customcontactFieldStyles}>
      <PhoneInput
        country={'us'}
        value={value as string}
        onChange={handleChange}
        disabled={isDisabled}
        enableSearch={false}
        disableSearchIcon={true}
        disableDropdown={true}
        countryCodeEditable={false}
        inputClass={hasError ? 'form-control form-control--error' : 'form-control'}
        inputProps={{
          name: name,
          placeholder: placeholder,
          readOnly: readonly,
        }}
        containerClass="react-tel-input"
        buttonClass="flag-dropdown"
        dropdownClass="flag-dropdown"
      />

      {hasError && errorMessage ? (
        <FormHelperText error sx={errorStyle}>
          {typeof errorMessage === 'string' ? errorMessage : String(errorMessage)}
        </FormHelperText>
      ) : null}
    </Box>
  );
}
