import { Box, Grid, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import { loginConstants } from "../constants/auth-constants";
import logo from "../assets/images/logo.png";
import Carousel from "../components/core/reusable/carousel/carousel";
import { commonThemeSettings } from "../theme/theme";

const AuthLayout = (props: React.PropsWithChildren) => {
  const matchesTablet = useMediaQuery(
    commonThemeSettings.breakpoints?.down
      ? commonThemeSettings.breakpoints.down("lg")
      : "(max-width:1200px)" // fallback for 'lg'
  ); 
  //  const isMobile = useMediaQuery("(max-width:702px)");

  return (
    <Grid container height={"100vh"} padding={"0"}>
      {!matchesTablet && (
        <Grid size={{xs:4}} height={"100%"}>
          <Carousel />
        </Grid>
      )}
      <Grid  size={{xs:8}}>
        <Grid
          container
          justifyContent={"start"}
          pl={8}
          mt={11}
        >
          <img src={logo} width="160px"/>
        </Grid>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingX: "25%",
            height: "65%",
          }}
        >
          {props.children}
        </Box>
        <Grid
          display={"flex"}
          flexDirection={"row"}
          gap={1.5}
          position="absolute"
          bottom={25}
          ml={8}
        >
          <Grid>
            <Typography variant="titleMedium5" color="Neutral.70">
              {loginConstants.OLA_EHR}
            </Typography>
          </Grid>
          <Grid sx={{ cursor: "pointer" }}>
            <Typography variant="titleMedium5" color="Neutral.50">
              {loginConstants.SUPPORT}
            </Typography>
          </Grid>
          <Grid sx={{ cursor: "pointer" }}>
            <Typography variant="titleMedium5" color="Neutral.50">
              {loginConstants.PRIVACY}
            </Typography>
          </Grid>
          <Grid sx={{ cursor: "pointer" }}>
            <Typography variant="titleMedium5" color="Neutral.50">
              {loginConstants.COOKIE_SETTINGS}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AuthLayout;
