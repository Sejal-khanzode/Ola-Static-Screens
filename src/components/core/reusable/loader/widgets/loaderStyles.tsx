// import { theme } from "../../../utils/theme/theme";

export const loaderContainer = {
  position: "fixed",
  top: "-13%", // Adjust this value to move it higher
  left: "0",
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "rgba(0, 0, 0, 0)",
  zIndex: 99999,
  WebkitUserSelect: "none",
  KhtmlUserSelect: "none",
  MozUserSelect: "none",
  OUserSelect: "none",
  userSelect: "none",
};

export const loaderContainerForm = {
  position: "fixed",
  top: "0",
  right: "0",
  left: "auto",
  width: "40%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "rgba(0, 0, 0, 0)",
  zIndex: 99999,
  WebkitUserSelect: "none",
  KhtmlUserSelect: "none",
  MozUserSelect: "none",
  OUserSelect: "none",
  userSelect: "none",
};

export const circularProgress = {
  width: 90,
  height: 90,
  position: "relative",
  color: 'Primary.main',
};

export const circularProgress1 = {
  width: 90,
  height: 90,
  position: "absolute",
  color: 'Primary.main',
  scale: "-1 1",
};