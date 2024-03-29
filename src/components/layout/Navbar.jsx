import React, { useState } from "react";
import {
  Avatar,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Box } from "@mui/system";
import { createTheme, styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getBlogs } from "../../store/blogs-slice";
import { toast } from "react-toastify";
import { pages } from "../../constants/constants";

const drawerWidth = 180;
const settings = ["Profile", "Logout"];

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      xsm: 400,
      sm: 600, // Define your breakpoint for small screens
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Navbar = ({
  handleDrawerOpen,
  open,
  handleDrawerClose,
  setIsNavbarMenu,
  handleMobileDrawerOpen,
  handleMobileDrawerClose,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = JSON.parse(localStorage.getItem("userData"));
  const currentUser = token?.firstName;
  const currentUserId = token?._id;
  const isAdmin = token?.role === "admin";
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  setIsNavbarMenu(useMediaQuery(theme.breakpoints.down("sm")));

  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (key) => {
    if (key === "Logout") {
      handleDrawerClose();
      handleMobileDrawerClose()
      toast.success("User Loggedout");
      localStorage.removeItem("userData");
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      dispatch(getBlogs());
      navigate("/");
    }

    if (key === "Profile") {
      navigate(`/users/${currentUserId}`);
    }

    setAnchorElUser(null);
  };

  return (
    <AppBar position="fixed" open={open} className="layout-color">
      <Toolbar>
        {isAdmin && !isSmallScreen && (
          <IconButton
            style={{ color: "#66FCF1", justifyContent: "left" }}
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            sx={{
              mr: 2,
              ...(isSmallScreen && { flexGrow: 1 }),
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
        )}

        {isSmallScreen && isAdmin && (
          <IconButton
            style={{ color: "#66FCF1", justifyContent: "left" }}
            aria-label="open mobile sidebar"
            onClick={handleMobileDrawerOpen}
            sx={{
              mr: 2,
              ...(isSmallScreen && { flexGrow: 1 }),
            }}
          >
            <MenuIcon />
          </IconButton>
        )}

        <img
          src="../logo.png"
          alt=""
          height="35px"
          style={{ marginLeft: "20px", cursor: "pointer" }}
          onClick={() => {
            navigate("/");
          }}
          role="link"
        />
        {!isSmallScreen ? (
          <Box sx={{ flexGrow: 1, display: "flex", marginLeft: "30px" }}>
            {pages.map((page) => (
              <Button key={page} sx={{ color: "white", display: "block" }}>
                <NavLink
                  style={({ isActive }) => ({
                    color: isActive ? "#66FCF1" : "white",
                    fontWeight: isActive ? "bolder" : "normal",
                    textDecoration: "none",
                  })}
                  to={`/${
                    page.toLowerCase() === "home" ? "" : page.toLowerCase()
                  }`}
                >
                  {page}
                </NavLink>
              </Button>
            ))}
          </Box>
        ) : (
          <Box sx={{ flexGrow: 1, display: "flex", marginLeft: "30px" }}></Box>
        )}
        <Box sx={{ flexGrow: 0 }}>
          {currentUser ? (
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar
                alt={currentUser}
                src=".....  "
                style={{ color: "black", backgroundColor: "#66FCF1" }}
              />
            </IconButton>
          ) : (
            <Button variant="contained" className="loginbtn">
              <Link to="/signin" className="loginbtn">
                Login
              </Link>
            </Button>
          )}
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <MenuItem
                key={setting}
                onClick={() => handleCloseUserMenu(setting)}
              >
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
