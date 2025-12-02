export const editTextAreaStyle = {
  textArea: {
    border: `1px solid #ccc`,
    height: "40px",
    padding: "10px 12px",
    width: "100%",
    color: "black",
    fontSize: "14px",
    //fontStyle: "inter sans-serif ",
    fontWeight: "400 ",
    lineHeight: "150% ",
    letterSpacing: "0.25px ",
    borderRadius: "8px ",
    fontFamily: "Roboto",
    //boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",

    "&::placeholder": {
      //fontSize: "16px ",
      //fontStyle: "inter sans-serif ",
      fontWeight: "400",
      fontFamily: "Roboto",
      fontSize: "15px",
      letterSpacing: "0.25%",
      lineHeight: "150%",
      color: "#9B9D9F"
    },
  },
  errorMessage: {
    border: "1px solid red",
  },
};
