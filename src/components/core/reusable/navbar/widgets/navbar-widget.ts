// import { theme } from "../../../utils/theme";
import { lightTheme } from "../../../../../theme/theme";

export const hamburger = {
  color: "inherit",
  mr: 2,
  display: "none",
  [lightTheme.breakpoints.up("lg")]: {
    display: "block",
  },
};
export const searchContainer = {
  display: "flex",
  alignItems: "center",
  height: "28px",
};

export const toolBarContainer = {
  display: "grid",
  height: "40px",
  minHeight: "40px",
  paddingRight:"0px !important"
};
export const searchBar = () => {
  return {
    borderRadius: "4px",
    background: "white",
    height: "28px",
    "& fieldset": {
      border: "none",
    },
    ".MuiInputLabel-root": {
      top: "-10.5px",
      fontSize: "14px",
      color: "grey",
    },
    ".MuiOutlinedInput-root": {
      padding: "0px 0px 0px 8px   ",
      height: "28px ",
    },
    ".MuiChip-root": {
      height: "28px  ",
    },
  };
};

export const navBarStyles = {
  badge: {
    fontSize: 17,
    height: 20,
    minWidth: 20,
  },
};

export const badgeStyle = {
  color: "white",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "40px",
  height: "40px",
  cursor: "pointer",
};
