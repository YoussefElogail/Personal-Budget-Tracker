// Importing necessary components from Material-UI
import { Box, Button, Paper, Toolbar, Typography } from "@mui/material";

// PageHeader component renders a styled header with a title (pageName) and an "Add" button.
// The openOrClose function is passed as a prop to handle the button click.
const PageHeader = ({ pageName, openOrClose }) => {
  return (
    // Box component used for styling and layout purposes.
    <Box
      component="section"
      sx={{
        flexDirection: "column",
      }}
    >
      {/* Paper component for a styled elevation effect and padding */}
      <Paper elevation={6} sx={{ width: "100%", p: "20px" }}>
        {/* Toolbar component with title and "Add" button */}
        <Toolbar sx={{ justifyContent: "space-between", flexWrap:"wrap", gap:1 }}>
          {/* Typography component for displaying the page title */}
          <Typography variant="h4" component="h1">
            {pageName}
          </Typography>
          {/* Button component triggering the openOrClose function on click */}
          <Button variant="contained" onClick={()=> openOrClose(null)}>
            Add
          </Button>
        </Toolbar>
      </Paper>
    </Box>
  );
};

// Exporting the PageHeader component as the default export.
export default PageHeader;
