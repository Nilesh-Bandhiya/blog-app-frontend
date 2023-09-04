import React from "react";
import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Link } from "react-router-dom";
import { pages } from "../../constants/constants";

const drawerWidth = 180;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const SideBar = ({
  handleDrawerClose,
  handleMobileDrawerClose,
  open,
  isMobileSidebarOpen,
  isNavbarMenu = false,
}) => {
  return (
    <>
      {!isMobileSidebarOpen ? (
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              backgroundColor: "#1f2833",
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose} style={{ color: "white" }}>
              <ChevronLeftIcon />
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {isNavbarMenu && (
              <>
                {pages.map((page, index) => (
                  <Link
                    key={index}
                    className="nav-link-black"
                    to={`/${
                      page.toLowerCase() === "home" ? "" : page.toLowerCase()
                    }`}
                  >
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemText primary={page} />
                      </ListItemButton>
                    </ListItem>
                  </Link>
                ))}
              </>
            )}
            {["My Blogs", "All Blogs", "Users"].map((text, index) => (
              <Link
                key={index}
                className="nav-link-black"
                to={`/${
                  text.toLowerCase() === "all blogs"
                    ? ""
                    : text.split(" ").join("").toLowerCase()
                }`}
              >
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}
          </List>
        </Drawer>
      ) : (
        <Drawer
          sx={{
            width: drawerWidth,
            height: "100%", // Set the height to cover the entire screen
            position: "fixed", // Position the sidebar layer above other components
            zIndex: 9999, // Ensure it's on top of other elements
            // ... (other styles)
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              backgroundColor: "#1f2833",
            },
          }}
          variant="persistent"
          anchor="left"
          open={isMobileSidebarOpen}
        >
          <DrawerHeader>
            <IconButton onClick={handleMobileDrawerClose} style={{ color: "white" }}>
              <ChevronLeftIcon />
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {isNavbarMenu && (
              <>
                {pages.map((page, index) => (
                  <Link
                    key={index}
                    className="nav-link-black"
                    to={`/${
                      page.toLowerCase() === "home" ? "" : page.toLowerCase()
                    }`}
                  >
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemText primary={page} />
                      </ListItemButton>
                    </ListItem>
                  </Link>
                ))}
              </>
            )}
            {["My Blogs", "All Blogs", "Users"].map((text, index) => (
              <Link
                key={index}
                className="nav-link-black"
                to={`/${
                  text.toLowerCase() === "all blogs"
                    ? ""
                    : text.split(" ").join("").toLowerCase()
                }`}
              >
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}
          </List>
        </Drawer>
      )}
    </>
  );
};

export default SideBar;
