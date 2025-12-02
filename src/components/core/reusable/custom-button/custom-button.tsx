import { Button, Menu, MenuItem, Tooltip } from '@mui/material';
import React, { useState } from 'react';
import {
  paddingZero,
  filled,
  outlined,
  warning,
  disableButton,
  transformTextNone,
  editProfile,
  whiteOutline,
  edit,
  // menuStyle
} from './widgets/custom-button-styles';

interface MenuItemType {
  label: string;
  onClick: () => void;
}

interface CustomButtonProps {
  onClick?: (index?: number, e?: React.MouseEvent) => void;
  label?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  variant?: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
  disabled?: any;
  fullWidth?: boolean;
  changePadding?: boolean;
  isSubmitButton?: boolean;
  isSubmitButtonTwo?: boolean;
  menuItems?: MenuItemType[];
  message?: string;
}

function CustomButton(props: CustomButtonProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (props.menuItems && props.menuItems.length > 0) {
      setAnchorEl(event.currentTarget);
    } else if (props.onClick) {
      props.onClick(undefined, event);
    }
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const getButtonStyle = () => {
    let baseStyle;

    if (props.changePadding === true) {
      baseStyle = paddingZero;
    } else if (props.variant === 'filled') {
      baseStyle = filled;
    } else if (props.variant === 'outlined') {
      baseStyle = outlined;
    } else if (props.variant === 'warning') {
      baseStyle = warning;
    } else if (props.variant === 'editButton') {
      baseStyle = editProfile;
    } else if (props.variant === 'whiteOutline') {
      baseStyle = whiteOutline;
    } else if (props.variant === 'edit') {
      baseStyle = edit;
    } else if (props.disabled === true) {
      baseStyle = disableButton;
    } else {
      baseStyle = transformTextNone;
    }

    if (props.label === 'Save' || props.label === 'Save & Next') {
      return {
        ...baseStyle,
        borderRadius: '3px',
        padding: '12.5px 28px',
      };
    }

    if (props.isSubmitButton) {
      return {
        ...baseStyle,
        borderRadius: '3px',
        padding: '12.5px 20px',
      };
    }

    if (props.isSubmitButtonTwo) {
      return {
        ...baseStyle,
        borderRadius: '4px',
        padding: '9px 17px',
      };
    }

    return baseStyle;
  };

  return (
    <>
      {props.disabled ? (
        <Tooltip title={props.message || ''} arrow placement="top">
          <span>
            <Button
              disabled={props.disabled}
              sx={getButtonStyle()}
              onClick={handleClick}
              type={props.type || 'button'}
              startIcon={props.startIcon}
              endIcon={props.endIcon}
              fullWidth={props?.fullWidth}
            >
              {props.label}
            </Button>
          </span>
        </Tooltip>
      ) : (
        <Tooltip title={props.message || ''} arrow placement="top">
          <span>
            <Button
              disabled={props.disabled}
              sx={getButtonStyle()}
              onClick={handleClick}
              type={props.type || 'button'}
              startIcon={props.startIcon}
              endIcon={props.endIcon}
              fullWidth={props?.fullWidth}
            >
              {props.label}
            </Button>
          </span>
        </Tooltip>
      )}

      {props.menuItems && (
        <Menu
          // sx={menuStyle}
          anchorEl={anchorEl}
          open={menuOpen}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        >
          {props.menuItems.map((item, index) => (
            <MenuItem
              key={index}
              onClick={() => {
                item.onClick();
                handleMenuClose();
              }}
            >
              {item.label}
            </MenuItem>
          ))}
        </Menu>
      )}
    </>
  );
}

export default CustomButton;
