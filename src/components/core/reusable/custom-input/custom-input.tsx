/* eslint-disable @typescript-eslint/no-explicit-any */
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, IconButton, InputAdornment, InputBase, Typography } from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import {
  customInputStyles,
  errorStyle,
  inputStyle,
  placeHolderStyle,
} from './widgets/customInputStyles';

interface CustomInputProps {
  placeholder?: string;
  name?: string;
  value?: string | number | null | undefined;
  isNumeric?: boolean;
  hasError?: boolean;
  errorMessage?: string | undefined;
  isPassword?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  disableField?: boolean;
  bgWhite?: boolean;
  showIcon?: any;
  isAuth?: boolean;
  limit?: number;
  dobSearch?: boolean;
  sinceYearRange?: boolean;
  onlyCharacters?: boolean;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  readonly?: boolean;
}

export default function CustomInput(props: CustomInputProps) {
  const classes = customInputStyles();
  const { bgWhite, isAuth } = props;
  const [showPassword, setShowPassword] = useState(false);
  const [inputValue, setInputValue] = useState(props.value ? props.value : '');

  useEffect(() => {
    setInputValue(props.value ?? '');
  }, [props.value]);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (props.dobSearch && e.target.value.includes('/')) {
      return;
    }
    if (props.onlyCharacters && !/^[A-Za-z\s]*$/.test(e.target.value)) {
      return;
    }

    let value = e.target.value;

    // Remove spaces from password fields
    if (props.isPassword) {
      value = value.replace(/\s/g, '');
    }

    setInputValue(value);

    // Create a new event with the modified value
    const modifiedEvent = {
      ...e,
      target: {
        ...e.target,
        value: value,
      },
    };

    props.onChange && props.onChange(modifiedEvent);
  };

  return (
    <>
      <InputBase
        fullWidth
        readOnly={props.readonly}
        autoComplete="off"
        name={props.name}
        type={showPassword ? 'text' : props.isPassword ? 'password' : 'text'}
        placeholder={props.placeholder}
        value={inputValue}
        sx={{
          background: bgWhite ? 'white' : 'inherit',
          '&.Mui-focused': {
            border: '1px solid',
            borderColor: 'Primary.main',
            borderRadius: '4px !important',
          },
          '& input::placeholder': {
            ...placeHolderStyle,
            ...(isAuth ? { fontSize: '14px' } : {}),
          },
          '& input': {
            ...inputStyle,
            ...(isAuth ? { fontSize: '14px' } : {}),
          },
          '&.Mui-disabled input': {
            ...(props.disableField && inputValue !== '' && inputValue !== null && inputValue !== undefined
              ? {
                  color: 'black',
                  WebkitTextFillColor: 'black',
                }
              : {}),
          },
        }}
        onChange={handleInputChange}
        onKeyDown={props.onKeyDown}
        error={props.hasError}
        disabled={props.disableField}
        inputMode={props.isNumeric ? 'numeric' : 'text'}
        onInput={
          props.isNumeric
            ? (e: ChangeEvent<HTMLInputElement>) => {
                e.target.value = e.target.value.replace(/[^0-9]/g, '');
              }
            : undefined
        }
        classes={{
          root: isAuth ? classes.textFieldRootAuth : classes.textFieldRoot,
          input: isAuth ? classes.textFieldInputAuth : classes.textFieldInput,
          focused: classes.textFieldActive,
          error: classes.textFieldError,
        }}
        endAdornment={
          <InputAdornment position="end" sx={{ color: '#BCBCBC' }}>
            {props.isPassword && (
              <IconButton onClick={handleClickShowPassword}>
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            )}
            {props.showIcon && (
              <Box display={'flex'} alignItems={'center'}>
                {props.showIcon}
              </Box>
            )}
          </InputAdornment>
        }
        inputProps={{
          maxLength: props.limit ? props.limit : '',
        }}
      />
      {props.hasError && (
        <Typography sx={errorStyle} variant="titleMedium5">
          {props.hasError ? props?.errorMessage : ''}
        </Typography>
      )}
    </>
  );
}
