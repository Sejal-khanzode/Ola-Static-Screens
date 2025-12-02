export const tableHeadStyles = {
  color: "var(--Neutral-08, #565656)",
  fontFamily: "Roboto",
  fontSize: "14px",
  fontStyle: "normal",
  fontWeight: 500,
  lineHeight: "150%",
  letterSpacing: "0.035px",
};

export const tableBodyStyles = {
  color: "var(--Neutral-09, #393939)",
  fontFamily: "Roboto",
  fontSize: "14px",
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: "150%",
  letterSpacing: "0.035px",
  paddingX: "18px",
  paddingY: "6px",
  gap:'8px'
};

export const patientNameStyles = {
  ...tableBodyStyles,
  fontSize: "16px",
  fontWeight: 500,
  color: "Primary.main",
  cursor: "pointer",
};

export const actionStyles = {
  ...tableBodyStyles,
  color:"Primary.main",
  cursor:'pointer',
  fontWeight: 400,
  textTransform: 'capitalize',
}

export const paginationButton = {
  width: "100%",
  display: "flex",
  justifyContent: "flex-end",

  "& .Mui-selected": {
    color: "#145DA0 !important",
    background: "#F6FAFF !important",
  },
  "& .Mui-selected:hover": {
    color: "#145DA0",
    background: "#F6FAFF",
  },
  "& button": {
    textTransform: "inherit",
    borderRadius: "50%",
    width: "32px",
    height: "32px",
    minWidth: "32px",
    padding: 0,
    border: "1px solid var(--Neutral-02, #F4F4F4)",
    boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
    color: "#595F63",
    display: "flex",
    alignItems: "center", 
    justifyContent: "center",
  },
  "& li:first-of-type": {
    color: "#565656",
  },
  "& li:last-of-type": {
    color: "#565656",
  },
};

export const backArrow = {
  color: "#565656",
  mr: 1,
};

export const fordwardArrow = {
  color: "#565656",
  ml: 1,
};

export const tableBorder = {
  border: "1px solid var(--Neutral-03, #E9E9E9)",
};
