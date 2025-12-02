import { IconButton, IconButtonProps, SxProps, Theme } from '@mui/material';
import { ReactNode } from 'react';

interface CustomIconProps extends Omit<IconButtonProps, 'children'> {
  icon: ReactNode;
  iconColor?: string;
  customSx?: SxProps<Theme>;
}

const CustomIcon = ({
  icon,
  iconColor = 'white',
  customSx,
  size = 'small',
  ...props
}: CustomIconProps) => {
  return (
    <IconButton
      size={size}
      sx={{
        color: iconColor,
        ...customSx,
      }}
      {...props}
    >
      {icon}
    </IconButton>
  );
};

export default CustomIcon;