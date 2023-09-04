import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import SideBar from "./SideBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./Footer";

const drawerWidth = 180;

const Main = styled("main", {
  shouldForwardProp: (prop) =>
    prop !== "open" && prop !== "isMobileSidebarOpen",
})(({ theme, open, isMobileSidebarOpen }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open &&
    !isMobileSidebarOpen && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  ...(isMobileSidebarOpen &&
    !open && {
      transition: "none",
      marginLeft: 0,
    }),
}));

const MobileSidebarOpenMain = styled(Main)(({ isMobileSidebarOpen }) => ({
  ...(isMobileSidebarOpen && {
    transition: "none", // Set transition to none when isMobileSidebarOpen is true
    marginLeft: 0,
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const MainLayout = () => {
  const [open, setOpen] = useState(false);
  const [isNavbarMenu, setIsNavbarMenu] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleMobileDrawerOpen = () => {
    setIsMobileSidebarOpen(true);
  };

  const handleMobileDrawerClose = () => {
    setIsMobileSidebarOpen(false);
  };

  return (
    <>
      <ToastContainer />
      <Box sx={{ display: "flex" }}>
        <CssBaseline />

        <Navbar
          handleDrawerOpen={handleDrawerOpen}
          handleDrawerClose={handleDrawerClose}
          open={open}
          setIsNavbarMenu={setIsNavbarMenu}
          handleMobileDrawerOpen={handleMobileDrawerOpen}
          handleMobileDrawerClose={handleMobileDrawerClose}
        />

        <SideBar
          handleDrawerClose={handleDrawerClose}
          handleMobileDrawerClose={handleMobileDrawerClose}
          open={open}
          isNavbarMenu={isNavbarMenu}
          isMobileSidebarOpen={isMobileSidebarOpen}
        />

        <MobileSidebarOpenMain
          open={open}
          isMobileSidebarOpen={isMobileSidebarOpen}
        >
          <DrawerHeader />
          <Outlet />
        </MobileSidebarOpenMain>
      </Box>
      <Box style={{ position: "fixed", bottom: 0, width: "100%" }}>
        <Footer />
      </Box>
    </>
  );
};

export default MainLayout;
