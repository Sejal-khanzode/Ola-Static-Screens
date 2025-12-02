import React, { useRef } from 'react';
import { TextField, TextFieldProps } from '@mui/material';
import { useTestFieldControl } from '../../../hooks/useTestFileControl';

const AppTextField: React.FC<TextFieldProps> = props => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const testId = inputRef.current?.dataset.testid;

  useTestFieldControl(inputRef, testId);

  return <TextField {...props} inputRef={inputRef} />;
};

export default AppTextField;
