import { Box } from "@mui/material";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

export default function ActionAlert({alertMessage}) {
  return (
    <Box component="section">
      <Stack sx={{ width: "100%"}} spacing={2}>
        <Alert variant="filled" severity={alertMessage !== "Expenses can be added only if the total expenses are less than the total incomes." ?"success":"error"}>
          {alertMessage}
        </Alert>
      </Stack>
    </Box>
  );
}
