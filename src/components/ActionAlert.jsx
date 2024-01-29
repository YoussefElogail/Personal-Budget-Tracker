// Importing necessary Material-UI components
import { Box } from "@mui/material";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

// ActionAlert component displays an alert message using Material-UI components.
export default function ActionAlert({ alertMessage }) {
  return (
    // Box component used for styling and layout purposes.
    <Box component="section">
      {/* Stack component for managing the layout of multiple alerts */}
      <Stack sx={{ width: "100%" }} spacing={2}>
        {/* Alert component displaying the alert message */}
        <Alert
          variant="filled"
          severity={
            alertMessage !==
            "Expenses can be added only if the total expenses are less than the total incomes."
              ? "success"
              : "error"
          }
        >
          {alertMessage}
        </Alert>
      </Stack>
    </Box>
  );
}
