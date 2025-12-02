import { styled, TextareaAutosize, Typography } from '@mui/material';
import { ChangeEvent } from 'react';
import { editTextAreaStyle } from './widgets/custom-textarea-widgets';

interface CustomTextAreaProps {
  placeholder: string;
  name: string;
  value: string | number | undefined;
  minRow: number;
  maxRow?: number;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: () => void;
  isDisabled?: boolean;
  hasError?: boolean;
  errorMessage?: string;
  defaultValue?: string;
}

export const errorStyle = {
  color: `rgb(211, 47, 47)`,
};

const StyledTextarea = styled(TextareaAutosize)<{ hasError?: boolean }>(({ hasError }) => ({
  ...editTextAreaStyle.textArea,
  borderColor: hasError ? 'red' : '#D3D3D3',
  '&:focus': {
    borderRadius: '8px',
    height: '40px',
    padding: '10px 12px',
    outline: 'none',
    fontFamily: 'Roboto',
    fontSize: '14px',
    letterSpacing: '0.25%',
    lineHeight: '150%',
  },
}));

const ErrorTypography = styled(Typography)({
  ...errorStyle,
});

function CustomTextArea(props: CustomTextAreaProps) {
  return (
    <>
      <StyledTextarea
        hasError={props.hasError}
        disabled={props.isDisabled && props.isDisabled}
        minRows={props.minRow}
        maxRows={props.maxRow || 10}
        draggable={false}
        name={props.name}
        placeholder={props.placeholder}
        defaultValue={props.defaultValue}
        value={props.value ? props.value : ''}
        onChange={props.onChange}
        className={props.hasError ? `${editTextAreaStyle.errorMessage}` : ''}
      />
      <ErrorTypography sx={{ ...errorStyle }} variant="caption">
        {props.hasError ? props.errorMessage : ''}
      </ErrorTypography>
    </>
  );
}

export default CustomTextArea;
