// Importing MiniDrawer component and drawerWidth constant
import MiniDrawer, { drawerWidth } from "./components/MiniDrawer.jsx";

// Importing Box component from MUI
import { Box } from "@mui/material";

// Importing useState and Outlet from React and React Router
import { useState } from "react";
import { Outlet } from "react-router-dom";

// Main Root component
const Root = () => {
  // State for controlling the drawer open/close state
  const [open, setOpen] = useState(false);

  // Styling for the main content area
  const style = {
    // Adjusting margin and width based on the drawer state
    marginTop: "64px",
    marginLeft: open ? `${drawerWidth}px` : "64px",
    width: open ? `calc(100% - ${drawerWidth}px)` : `calc(100% - 64px)`,
    minHeight: `calc(100vh - 64px)`,
    transition: "all .2s linear",
    // Styling for sections within the main content area
    "& section": {
      py: "12px",
      px: "18px",
      maxWidth: "1000px",
      margin: "auto",
      height: "fit-content",
      display: 'flex',
      flexWrap: 'wrap',
    },
  };

  return (
    <>
      {/* Rendering the MiniDrawer component */}
      <MiniDrawer {...{ open, setOpen }} />
      {/* Main content area using Box component */}
      <Box component="main" sx={style}>
        {/* Rendering the nested routes using Outlet */}
        <Outlet />
      </Box>
    </>
  );
};

// Exporting the Root component
export default Root;
