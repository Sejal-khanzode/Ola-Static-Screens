import { Button, Switch, Typography, styled } from "@mui/material";
import { withStyles } from "@mui/styles";
import { makeStyles } from "@mui/styles";

type Props = {
  state: boolean;
  onChange: any;
  role?: boolean;
};

export const CustomSwitch = withStyles({
  switchBase: {
    color: "#4C4C4C66",
    "&$checked": {
      color: `#FFFFFF !important`,
      top: "10px",
      width: "35px !important",
      height: "5px !important",
    },
    "&$checked + $track": {
      backgroundColor: `#2BAC1D !important`,
    },
  },
  checked: {},
  track: {},
})(Switch);

export const AntSwitch = styled(Switch)(({}) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    transitionDuration: "100ms !important",
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(12px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: "#15A97A",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: { duration: 300 },
  },
  "& .MuiSwitch-track": {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: "#BFBFBF",
    boxSizing: "border-box",
  },
}));

export const switchStyles = makeStyles(() => {
  return {
    enablegreen: {
      color: "red",
    },
    disablered: {
      color: "#FF3939",
    },
    enableDisableMainTheme: {
      color: "#1A1A1A",
      fontSize: "14px !important",
      textTransform: "capitalize",
      fontWeight: "bold",
      marginLeft: "5px",
    },
  };
});

const ActiveInactiveSwitch = (props: Props) => {
  const classes = switchStyles();
  const { state, onChange, role } = props;

  return (
    <Button
      sx={{
        background: "inherite 0% 0% no-repeat padding-box",
        borderRadius: "13px",
        padding: 0.6,
        gap: 0.1,
        // width: "rem",
      }}
    >
      <AntSwitch
        onChange={onChange}
        checked={state}
        sx={{}}
        inputProps={{ "aria-label": "ant design" }}
      />
      {!role && (
        <Typography
          className={classes.enableDisableMainTheme}
          fontFamily={"Roboto"}
        >
          {state ? "Active" : "Inactive"}
        </Typography>
      )}
      {role && (
        <Typography
          className={classes.enableDisableMainTheme}
          fontFamily={"Roboto"}
        >
          {state ? "Enable" : "Disable"}
        </Typography>
      )}
    </Button>
  );
};

export default ActiveInactiveSwitch;
