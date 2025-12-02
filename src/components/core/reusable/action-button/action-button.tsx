import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Typography } from "@mui/material";
import { actionButtonLabelStyle } from "./widgets/actionButtonStyles";

const ITEM_HEIGHT = 48;

interface ActionButtonProps {
  list: { label: string; route: string; disabled?: boolean }[];
  onItemSelected: (
    selectedItem: { label: string; route: string; disabled?: boolean },
    rowData: { label: string; route: string }[]
  ) => void;
}

export default function ActionButton(props: ActionButtonProps) {
  const { list, onItemSelected } = props;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (selectedItem: { label: string; route: string }) => {
    onItemSelected(selectedItem, list);
    handleClose();
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button"
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "25ch"
          }
        }}>
        {list?.map((option: { label: string; route: string; disabled?: boolean }, index) => (
          <MenuItem
            disabled={option.disabled || false}
            key={index}
            onClick={() => handleMenuItemClick(option)}>
            <Typography sx={actionButtonLabelStyle}>{option.label}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
