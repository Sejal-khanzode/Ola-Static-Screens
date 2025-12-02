import { AppBar, Grid, Toolbar, useMediaQuery } from "@mui/material";
import { useState } from "react";;
import { toolBarContainer } from "./widgets/navbar-widget";
import TopMenu from "./top-menu";
import Drawer from "../custom-drawer/custom-drawer";

const Navbar = () => {
  const [openNotification, setOpenNotification] = useState(false);
  const below500 = useMediaQuery("(max-width:500px)");

  const handleCloseDrawer = () => {
    setOpenNotification((prev) => !prev);
  };

  return (
    <>
      <AppBar
        elevation={0}
        position="sticky"
        variant="outlined"
        sx={{
          backgroundColor: "Primary.main",
          // ...(openNotification
          //   ? { zIndex: (theme) => theme.zIndex.drawer + 1 }
          //   : {}),
        }}
      >
        <Toolbar variant="dense" sx={toolBarContainer}>
          <Grid container alignItems={"center"}>
            {<TopMenu />}
          </Grid>
        </Toolbar>
      </AppBar>
      <Drawer
        drawerPadding={"20px"}
        headerStyle={"72px"}
        drawerWidth={below500 ? "90vw" : "30vw"}
        anchor="right"
        open={openNotification}
        onClose={handleCloseDrawer}
        title="Notifications"
      ></Drawer>
    </>
  );
};

export default Navbar;
