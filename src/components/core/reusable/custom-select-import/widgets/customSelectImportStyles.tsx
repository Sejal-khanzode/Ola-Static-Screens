import { makeStyles } from "@mui/styles";
// import {theme} from "src/theme/theme"

export const customSelectStyles = makeStyles({
  headerLabel: {
    color: "#a19a9a ",
    fontFamily: "Roboto !important",
    fontSize: "14px !important",
    fontStyle: "normal !important",
    fontWeight: 400,
    lineHeight: "120% !important",
    letterSpacing: "0.024px",
  },
  menuLabel: {
    color: "black ",
    fontFamily: "Roboto !important",
    fontSize: "14px !important",
    fontStyle: "normal !important",
    fontWeight: 400,
    lineHeight: "120% !important",
    letterSpacing: "0.024px",
  },
});

export const customChipSelectStyles = makeStyles({
  headerLabel: {
    color: "#a19a9a ",
    fontFamily: "Roboto !important",
    fontSize: "14px !important",
    fontStyle: "normal !important",
    fontWeight: 400,
    lineHeight: "120% !important",
    letterSpacing: "0.024px",
  },
  menuLabel: {
    color: "black ",
    fontFamily: "Roboto !important",
    fontSize: "14px !important",
    fontStyle: "normal !important",
    fontWeight: 400,
    lineHeight: "120% !important",
    letterSpacing: "0.024px",
  },
});

export const selectInputStyle = {
  ".MuiOutlinedInput-notchedOutline": { border: 0 },
  // border: `1px solid ${theme.palette.Neutral[400]}`,
  height: "40px !important",
  width: "100%",
  borderRadius: "4px",
  "& .MuiSelect-select": {
    display: "flex",
    alignItems: "center",
    padding: "0px 14px !important",
  },
  "&.Mui-error": {
    // border: `1px solid ${theme.palette.warning.dark}`,
    padding: "0px!important",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(228, 219, 233, 0.25)",
  },
};

export const someStyle = {
  ".MuiOutlinedInput-notchedOutline": { border: 0 },
  // border: `1px solid ${theme.palette.Neutral[400]}`,
  height: "40px !important",
  width: "100%",
  borderRadius: "4px",
  ".Mui-readOnly": {
    borderRadius: "4px",
    // border: `1px solid ${theme.palette.Neutral[400]}`,
    padding: "10px !important",
  },
  ".css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input": {
    display: "flex",
    alignItems: "center",
  },
};

export const fontStyleMultiSelect = {
  color: "black ",
  fontFamily: "Roboto !important",
  fontSize: "14px !important",
  fontStyle: "normal !important",
  fontWeight: 400,
  lineHeight: "120% !important",
  letterSpacing: "0.024px",
  "& .MuiTypography-root": {
    color: "black ",
    fontFamily: "Roboto !important",
    fontSize: "14px !important",
    fontStyle: "normal !important",
    fontWeight: 400,
    lineHeight: "120% !important",
    letterSpacing: "0.024px",
  },
};
