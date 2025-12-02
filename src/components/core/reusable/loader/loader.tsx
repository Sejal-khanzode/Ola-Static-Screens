import { CircularProgress, Grid } from "@mui/material";
import {
  loaderContainer,
  circularProgress,
  circularProgress1,
} from "./widgets/loaderStyles";
import { useSelector } from "react-redux";

function Loader() {
  const { showLoaderStatus } = useSelector(
    (state: any) => state.loaderReducer
  );

  return showLoaderStatus ? (
    <Grid sx={loaderContainer}>
      <CircularProgress sx={circularProgress} />
      <CircularProgress size={53} sx={circularProgress1} />
    </Grid>
  ) : null;
}

export default Loader;