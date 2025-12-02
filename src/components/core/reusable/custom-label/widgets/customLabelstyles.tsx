import { makeStyles } from "@mui/styles";

export const customLabelStyles = makeStyles({
  headerLabel: {
    color: "var(--Grey-60, var(--Grey-60, #595F63)) !important",
    fontFamily: "Roboto !important",
    fontSize: "12px !important",
    fontStyle: "normal !important",
    fontWeight: 500,
    lineHeight: "120% !important",
    letterSpacing: "0.024px",
  },
  authLabel: {
    color: "var(--Grey-60, var(--Grey-60, #595F63)) !important",
    fontFamily: "Roboto !important",
    fontSize: "14px !important",
    fontStyle: "normal !important",
    fontWeight: 500,
    lineHeight: "120% !important",
    letterSpacing: "0.024px",
  },
  required: {
    color: "red",
    marginLeft: "0.2rem",
  },
});
