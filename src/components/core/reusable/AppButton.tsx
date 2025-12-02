import React from 'react';
import { Button, ButtonProps } from '@mui/material';

const AppButton: React.FC<ButtonProps> = (props) => {
  // You can add default props or common styles here if needed
  // For maximum reusability, we'll just pass all props down
  return <Button {...props} />;
};

export default AppButton; 