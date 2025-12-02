import { makeStyles } from "@mui/styles";
// import {theme} from "src/theme/theme"

export const customSelectStyles = makeStyles({
  headerLabel: {
    // color: "#a19a9a",
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
  textFieldActive: {
    borderRadius: "8px !important",
    border: `1px solid`,
    borderColor: "Primary.main",
  },
  textFieldError: {
    border: `1px solid #d32f2f`,
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
  textFieldActive: {
    borderRadius: "8px !important",
    border: `1px solid`,
    borderColor: "Primary.main",
  },
  
});

export const selectInputStyle = {
  height: "40px !important",
  width: "100%",
  borderRadius: "4px",
  border: "1px solid",
  borderColor: "Neutral.40", 
  backgroundColor: "white",

  "& .MuiOutlinedInput-notchedOutline": {
    border: "none", 
  },

  "&.Mui-focused": {
    borderColor: "#1976d2", 
    boxShadow: "none",      
    outline: "none",       
  },

  "&.Mui-error": {
    borderColor: "#d32f2f", 
  },

  "& .MuiSelect-select": {
    display: "flex",
    alignItems: "center",
    padding: "0px 14px !important",
  },
};


export const someStyle = {
  ".MuiOutlinedInput-notchedOutline": { border: 0 },
  height: "40px !important",
  width: "100%",
  borderRadius: "4px",
  ".Mui-readOnly": {
    borderRadius: "4px",
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
