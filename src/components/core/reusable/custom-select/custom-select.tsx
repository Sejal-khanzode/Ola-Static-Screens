import { MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import { errorStyle } from '../custom-input/widgets/customInputStyles';
import { customSelectStyles, selectInputStyle } from './widgets/customSelectStyles';

interface CustomSelectProps {
  placeholder: string;
  name?: string;
  value: string;
  items: { value: string; label: string }[];
  onChange?: (e: SelectChangeEvent<string>) => void;
  hasError?: boolean;
  errorMessage?: string;
  isDisabled?: boolean;
  bgWhite?: boolean;
  tablepagination?: boolean;
  backgroundColor?: string;
  multiple?: boolean;
  showEllipse?: boolean;
  showEllipseLength?: number;
  readonly?: boolean;
}

function CustomSelect(props: CustomSelectProps) {
  const classes = customSelectStyles();
  const { items, bgWhite, onChange, backgroundColor, multiple, showEllipse, showEllipseLength } =
    props;

  const handleValue = (e: SelectChangeEvent<string>) => {
    const selectedLabel = e.target.value;
    const selectedKey = props?.items?.find(item => item.label === selectedLabel)?.value || '';
    e.target.value = selectedKey;

    if (onChange) onChange(e);
  };

  const getLabel = (value: string) => {
    return items?.find(item => item.value === value)?.label || '';
  };  

  return (
    <>
      <Select
        disabled={props.isDisabled}
        readOnly={props.readonly}
        multiple={multiple}
        sx={{
          ...selectInputStyle,
          backgroundColor: backgroundColor || (bgWhite === true ? 'Base.white' : 'inherit'),
          ...(props.tablepagination && { border: 'none' }),
          ...(props.readonly && {
            backgroundColor: 'Base.white',
          }),
          '&.Mui-disabled .MuiSelect-select': {
            ...(props.isDisabled && props.value
              ? {
                  color: 'black',
                  WebkitTextFillColor: 'black',
                }
              : {}),
          },
        }}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: 300,
            },
          },
        }}
        displayEmpty
        name={props?.name}
        value={getLabel(props.value)}
        onChange={handleValue}
        error={props.hasError}
        classes={{
          focused: classes.textFieldActive,
        }}
        renderValue={selected => {
          const displayText = selected || props?.placeholder;
          const shouldTruncate = showEllipse && showEllipseLength && displayText && displayText.length > showEllipseLength;
          const truncatedText = shouldTruncate ? displayText.substring(0, showEllipseLength) + '...' : displayText;
          
          return (
            <Typography
              className={classes.headerLabel}
              sx={{
                color: selected && selected !== props?.placeholder ? 'Base.black' : '#939292',
                ...(shouldTruncate && {
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }),
              }}
              title={displayText}
            >
              {truncatedText}
            </Typography>
          );
        }}
      >
        {props?.items && props?.items?.length !== 0 ? (
          props?.items?.map(option => (
            <MenuItem key={option.value} value={option.label}>
              <Typography className={classes.menuLabel}>{option.label}</Typography>
            </MenuItem>
          ))
        ) : (
          <MenuItem value="">
            <Typography className={classes.menuLabel}>No options available</Typography>
          </MenuItem>
        )}
      </Select>
      {props.hasError && (
        <Typography sx={errorStyle} variant="titleMedium5">
          {props.hasError ? props?.errorMessage : ''}
        </Typography>
      )}
    </>
  );
}

export default CustomSelect;
