import { makeStyles } from "@mui/styles";

export const customInputStyles = makeStyles({
  textFieldRoot: {
    borderRadius: "5px",
    border: `1px solid #C9CBCC`,
    height: "40px",
    padding: "10px 10px",
  },
  textFieldRootAuth: {
    borderRadius: "5px",
    border: `1px solid #C9CBCC`,
    height: "50px",
    padding: "10px 10px",
  },
  textFieldInput: {
    fontFamily: "Roboto",
    fontSize: "14px",
    fontStyle: "normal",
    lineHeight: "150%",
    letterSpacing: "0.048px",
    borderRadius: "8px !important",
  },
  textFieldInputAuth: {
    fontFamily: "Roboto",
    fontSize: "14px",
    fontStyle: "normal",
    lineHeight: "150%",
    letterSpacing: "0.048px",
    borderRadius: "8px !important",
  },
  textFieldActive: {
    borderRadius: "8px !important",
    border: `1px solid #C9CBCC`,
  },
  textFieldError: {
    border: `1px solid #d32f2f`,
  },
});

export const errorStyle = {
  color: "#d32f2f",
  marginRight: "14px",
  marginBottom: "0px",
  fontFamily: "Roboto",
};

export const placeHolderStyle = {
  color: "#9B9D9F",
  fontFamily: "Roboto",
  fontSize: "14px",
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: "120%",
  letterSpacing: "0.024px",
  opacity: "100%",
};

export const inputStyle = {
  color: "black",
  fontFamily: "Roboto",
  fontSize: "14px",
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: "120%",
  letterSpacing: "0.024px",
};
