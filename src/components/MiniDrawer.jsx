// Importing necessary components and styles from Material-UI and other libraries
import { styled, useTheme } from "@mui/material/styles";
import {
  Box,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";

import {
  Menu,
  ChevronLeft,
  ChevronRight,
  LightMode,
  DarkMode,
} from "@mui/icons-material";
import { NavLinks } from "../nav-links/NavLinks";
import { useLocation, useNavigate } from "react-router-dom";
import { useThemeContext } from "../theme/ThemeContext";

// Width of the drawer when open
export const drawerWidth = 180;

// Styles for the open state of the drawer
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

// Styles for the closed state of the drawer
const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

// Styling for the header of the drawer
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

// Styling for the AppBar component
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

// Styling for the Drawer component
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  position:"absolute",
  zIndex:1,
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

// MiniDrawer component
const MiniDrawer = ({ open, setOpen }) => {
  const theme = useTheme();

  // Accessing theme context to toggle between light and dark themes
  const { toggleTheme, setToggleTheme } = useThemeContext();

  // Function to toggle between light and dark themes
  const changeTheme = () => {
    setToggleTheme(toggleTheme === "light" ? "dark" : "light");
  };

  // Functions to open and close the drawer
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // Get the current location and navigation function
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();

  return (
    <Box sx={{ display: "flex" }}>
      {/* AppBar component */}
      <AppBar position="fixed" open={open}>
        <Toolbar>
          {/* IconButton to open the drawer */}
          <Tooltip placement="right" title="Open">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: "none" }),
              }}
            >
              <Menu />
            </IconButton>
          </Tooltip>
          {/* Application title */}
          <Typography variant="body1" noWrap component="p">
            Budget Tracker
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Drawer component */}
      <Drawer variant="permanent" open={open}>
        {/* Header of the drawer */}
        <DrawerHeader>
          {/* Theme toggle button */}
          <Box sx={{ flexGrow: 1, textAlign: "center" }}>
            <Tooltip title={toggleTheme === "dark" ? "Light" : "Dark"}>
              <IconButton edge="start" onClick={changeTheme}>
                {toggleTheme === "dark" ? <LightMode /> : <DarkMode />}
              </IconButton>
            </Tooltip>
          </Box>
          {/* Close drawer button */}
          <Tooltip title="Close">
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? <ChevronRight /> : <ChevronLeft />}
            </IconButton>
          </Tooltip>
        </DrawerHeader>

        {/* Divider between header and navigation links */}
        <Divider />

        {/* List of navigation links */}
        <List sx={{ py: "0" }}>
          {NavLinks().map((link, i) => (
            <ListItem
              onClick={() => navigate(link.path)}
              key={i}
              disablePadding
              sx={{ display: "block" }}
            >
              <Tooltip placement="right" title={!open ? link.name : null}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                  selected={currentPath === link.path}
                >
                  {/* Icon for the navigation link */}
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {link.icon}
                  </ListItemIcon>
                  {/* Text for the navigation link */}
                  <ListItemText
                    primary={link.name}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </Tooltip>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};

// Exporting the MiniDrawer component as the default export
export default MiniDrawer;
