import { Button, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const goBackHandler = () => {
    navigate(-1);
  };

  return (
    <Grid
      container
      alignItems={"center"}
      justifyContent={"center"}
      flexDirection={"column"}
      gap={5}
      height={"80vh"}
    >
      <Typography variant="h3">Page not found!!</Typography>
      <Button size="large" variant="outlined" onClick={goBackHandler}>
        Go back
      </Button>
    </Grid>
  );
};

export default NotFound;
