import { Autocomplete, CircularProgress, Grid, Paper, TextField, Typography } from '@mui/material';
import { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import SearchIcon from '@mui/icons-material/Search';
import './custom-auto-complete.css';
import { Options } from 'src/constants/options';
import { errorStyle } from '../custom-text-area/custom-textarea';
import { valueStyles } from './custom-auto-complete.widgets';

type CustomAutoCompleteProps = {
  options: { key: string; value: string; child?: React.ReactElement }[];
  value?: string;
  loading?: boolean;
  loadingText?: boolean;
  onChange: (selectedValue: string | '') => void;
  onClick?: () => void;
  onDebounceCall?: (selectedValue: string | '') => void;
  onInputEmpty?: () => void;
  onTextChange?: (text: string) => void;
  width?: string;
  hasError?: boolean;
  errorMessage?: string;
  placeholder?: string;
  isDisabled?: boolean;
  bgWhite?: boolean;
  hasStartSearchIcon?: boolean;
  hideTextPreview?: boolean;
  menuStyle?: {
    maxHeight: number;
    width: number;
  };
  maxHeightForOptionsList?: number;
  hideArrow?: boolean;
  onInputChange?: (inputValue: any) => void;
  autoname: string;
  customHeight?: string;
  showClearIcon?: boolean;
};

const CustomAutoComplete = (props: CustomAutoCompleteProps) => {
  const {
    options,
    maxHeightForOptionsList,
    value,
    loading,
    loadingText,
    placeholder,
    bgWhite,
    isDisabled,
    onDebounceCall,
    onTextChange,
    onClick,
    onInputEmpty,
    hasStartSearchIcon,
    hideTextPreview,
    hideArrow,
    onInputChange,
    autoname,
    customHeight,
    showClearIcon,
  } = props;

  const [selectedOptionState, setSelectedOptionState] = useState('');
  const [selectedOptionDebounce] = useDebounce(selectedOptionState, 1000);

  const _options: Options = [...options];
  const optionsList = _options
    .filter(opt => !opt.hide)
    .map(opt => {
      return opt.value;
    });

  const [defaultOption, setDefaultOption] = useState(
    value ? _options.find(opt => opt.key === value)?.value || null : null
  );

  useEffect(() => {
    setDefaultOption(value ? _options.find(opt => opt.key === value)?.value || null : null);
  }, [value, _options]);

  const handleChange = (event: SyntheticEvent<Element, Event>, newValue: string | null) => {
    // If newValue is null, it means the clear button was clicked
    if (newValue === null) {
      props.onChange('');
      return;
    }
    const selectedText = (event.target as HTMLInputElement).textContent || newValue;
    const selectedOption = _options.find(opt => opt.value === selectedText);
    const selectedOptionKey = selectedOption?.key || '';
    props.onChange(selectedOptionKey);
  };

  const handleTextChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (event.target.value === '') {
      onInputEmpty && onInputEmpty();
    }
    if (onTextChange) {
      onTextChange(event?.target?.value);
    }
    setSelectedOptionState((event && event.target.value) || '');
  };

  useEffect(() => {
    if (
      selectedOptionDebounce &&
      (selectedOptionDebounce.length > 3 || selectedOptionDebounce === '')
    ) {
      onDebounceCall && onDebounceCall(selectedOptionDebounce);
    }
  }, [selectedOptionDebounce]);

  const inputStyles = {
    background: bgWhite ? 'white' : 'inherit',
    height: customHeight ? customHeight : '40px !important',
    '&.Mui-focused': {
      border: '1px solid',
      borderColor: 'Primary.main',
      borderRadius: '4px !important',
    },
    '& input': {
      ...valueStyles,
      color: 'black !important',
      paddingRight: '24px !important',
    },
    '& .MuiFormControl-root .MuiTextField-root input': {
      color: 'black !important',
    },
  };

  return (
    <>
      <Autocomplete
        value={defaultOption}
        onInputChange={(_event, newInputValue) => {
          if (onInputChange) {
            onInputChange(newInputValue);
          }
        }}
        sx={{
          ...inputStyles,
          '& .MuiInputBase-sizeSmall': {
            paddingTop: customHeight ? '2.5px !important' : '5.5px !important',
            paddingBottom: '5.5px !important',
            paddingRight: '35px !important',
            height: customHeight ? customHeight : '40px !important',
          },
          '& .Mui-error': {
            margin: 0,
            fontWeight: 400,
            fontSize: '0.75rem',
            lineHeight: 1.66,
            color: '#d32f2f',
            marginRight: '14px',
            marginBottom: '0px',
            marginLeft: '0px',
            fontFamily: 'Inter',
          },
          '&.MuiAutocomplete-root': {
            border: props.hasError ? '1px solid red' : '1px solid #ccc',
            borderRadius: '4px',
            height: customHeight ? customHeight : '40px',
            paddingTop: customHeight ? '0px' : 'auto',
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              ...valueStyles,
              border: 'none',
            },
          },
        }}
        disableClearable={showClearIcon === false}
        className={hideArrow ? 'custom-autocomplete' : ''}
        onChange={handleChange}
        size="small"
        disablePortal
        disabled={isDisabled}
        options={loading ? [] : optionsList}
        ListboxProps={{
          style: { maxHeight: maxHeightForOptionsList },
        }}
        renderOption={(props, option) => {
          const selectedOption = _options.find(opt => opt.value === option);
          const { key, ...otherProps } = props;
          return (
            <li
              key={key}
              {...otherProps}
              style={{
                fontFamily: 'Roboto',
                fontSize: '14px',
                letterSpacing: '0.25%',
                lineHeight: '150%',
              }}
            >
              {selectedOption?.child || option}
            </li>
          );
        }}
        loading={loading}
        loadingText={loadingText || 'Loading...'}
        PaperComponent={props => <Paper {...props} />}
        renderInput={params => (
          <TextField
            {...params}
            name={autoname}
            inputProps={{
              ...params.inputProps,
              value: hideTextPreview ? '' : params.inputProps.value,
              name: autoname,
            }}
            InputProps={{
              ...params.InputProps,

              endAdornment: (
                <Grid container width={'fit-content'}>
                  {loading && <CircularProgress size={'20px'} color="inherit" />}
                  {params.InputProps.endAdornment}
                  {hasStartSearchIcon && <SearchIcon sx={{ opacity: 0.5 }} />}
                </Grid>
              ),
              style: {
                fontFamily: 'Roboto',
                fontSize: '14px',
                letterSpacing: '0.25%',
                lineHeight: '150%',
              },
            }}
            onClick={onClick && !isDisabled ? onClick : () => {}}
            onChange={handleTextChange}
            placeholder={placeholder}
          />
        )}
      />

      {props.hasError && (
        <Typography sx={errorStyle} variant="caption">
          {props.hasError ? props.errorMessage : ''}
        </Typography>
      )}
    </>
  );
};

export default CustomAutoComplete;
