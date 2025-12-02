/* eslint-disable @typescript-eslint/no-explicit-any */
import Autocomplete from '@mui/material/Autocomplete';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { fontStyleMultiSelect } from '../custom-select/widgets/customSelectStyles';
import { errorStyle } from '../custom-input/widgets/customInputStyles';
import { dropDownPlaceHolder } from '../custom-auto-complete/custom-auto-complete.widgets';

type CustomAutoMultiSelectProps = {
  options: { key: string; value: string; disabled?: boolean }[];
  value: any;
  onChange: (selectedValues: string[]) => void;
  placeholder?: string;
  errorMessage?: string;
  bgWhite?: any;
  showEllipse?: boolean;
  isDisabled?: boolean;
  name: string;
  showPlaceholder?: boolean;
};
const CustomAutoMultiSelect = (props: CustomAutoMultiSelectProps) => {
  const {
    options,
    value,
    onChange,
    errorMessage,
    placeholder,
    bgWhite,
    showEllipse,
    showPlaceholder,
  } = props;
  const optionKeys = options?.map(opt => opt.key).filter(opt => opt) || [];
  const preSelectedCleanValues = value
    ?.filter((val: any) => optionKeys.includes(val))
    .map((val: any) => options.find(opt => opt.key === val)?.value || '')
    ?.filter((val: any) => val);
  const [selectedOptions, setSelectedOptions] = useState<string[]>(preSelectedCleanValues);

  const areArraysSame = (arr1: string[], arr2: string[]) => {
    const filteredArr1 = arr1?.filter(item => !arr2?.includes(item));
    const filteredArr2 = arr2?.filter(item => !arr1?.includes(item));

    return filteredArr1?.length === 0 && filteredArr2?.length === 0;
  };

  useEffect(() => {
    if (!areArraysSame(selectedOptions, preSelectedCleanValues)) {
      setSelectedOptions(preSelectedCleanValues);
    }
  }, [preSelectedCleanValues]);

  const handleChange = (_: React.SyntheticEvent, newValue: any) => {
    onChange(newValue.map((option: any) => option.key));
  };

  const inputStyles = {
    background: bgWhite ? 'white' : 'inherit',
    maxHeight: '40px',
  };

  // Convert value array of objects to an array of string values
  const selectedValues = value?.map(
    (val: any) => options.find(opt => opt.key === val)?.value || ''
  );

  return (
    <div>
      <Autocomplete
        disabled={props.isDisabled && props.isDisabled}
        multiple
        sx={{
          ...inputStyles,
          '& .MuiInputBase-sizeSmall': {
            paddingTop: '8px !important',
            paddingBottom: '8px !important',
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
            fontFamily: 'Roboto',
          },
          '& p': {
            color: 'black',
            fontFamily: 'Roboto',
            fontSize: '12px',
            fontStyle: 'normal',
            fontWeight: '400',
            lineHeight: '120%',
            letterSpacing: '0.024px',
          },
          '& .MuiAutocomplete-root ': {
            padding: '4px 9px !important',
            maxHeight: '40px',
          },
          '& .MuiOutlinedInput-root': {
            padding: '4px 9px !important',
            maxHeight: '40px',
            borderRadius: '4px !important',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            border: errorMessage ? '1px solid #d32f2f' : '',
          },
        }}
        id="checkboxes-timezones"
        options={options}
        disableCloseOnSelect
        getOptionLabel={option => option.value}
        getOptionDisabled={option => option.disabled || false}
        value={options?.filter(option => value?.includes(option.key))}
        onChange={handleChange}
        renderOption={(props, option, { selected }) => (
          <li {...props}>
            <Checkbox
              checked={selected}
              disabled={option.disabled || false}
              onChange={() => {
                if (!option.disabled) {
                  onChange(
                    selected
                      ? value?.filter((val: any) => val !== option.key)
                      : [...value, option.key]
                  );
                }
              }}
            />
            <Typography 
              variant="bodyRegular4" 
              sx={{ 
                color: option.disabled ? 'text.disabled' : 'inherit',
                // opacity: option.disabled ? 0.6 : 1 
                
              }}
            >
              {option.value}
            </Typography>
          </li>
        )}
        renderInput={params => {
          return (
            <TextField
              {...params}
              inputProps={{
                ...params.inputProps,
                style: {
                  ...dropDownPlaceHolder,

                  ...params.inputProps.style,
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                },
                placeholder: showPlaceholder
                  ? placeholder
                  : selectedValues?.length
                    ? ''
                    : placeholder,
              }}
              variant="outlined"
              placeholder={placeholder}
              value={selectedValues?.join(', ')} // Use selectedValues instead of selectedOptions
            />
          );
        }}
        renderTags={
          showEllipse === false
            ? () => {
                const selectedValuesString = selectedValues.join(', ');
                const displayedValue =
                  selectedValuesString?.length > 40
                    ? selectedValuesString.substring(0, 40) + '...'
                    : selectedValuesString;
                return <Typography sx={{ fontStyleMultiSelect }}>{displayedValue}</Typography>;
              }
            : () => {
                const selectedValuesString = selectedValues.join(', ');
                const displayedValue =
                  selectedValuesString?.length > 20
                    ? selectedValuesString.substring(0, 20) + '...'
                    : selectedValuesString;
                return <Typography sx={{ fontStyleMultiSelect }}>{displayedValue}</Typography>;
              }
        }
      />
      {errorMessage && (
        <Typography sx={errorStyle} variant="caption">
          {errorMessage}
        </Typography>
      )}
    </div>
  );
};

export default CustomAutoMultiSelect;
