// Importing necessary MUI components and styles
import { Box, Link, Paper, Typography } from "@mui/material";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import formatCurrency from "../shared/formatCurrency";

// Define colors for the pie chart
const palette = ["green", "red", "blue"];

// Define size for the pie chart
const size = {
  width: 500,
  height: 300,
};

// Summary component
const Summary = () => {
  // Redux selectors to get incomes and expenses data from the store
  const { incomes } = useSelector((state) => state.incomesReducer);
  const { expenses } = useSelector((store) => store.expensesReducer);

  // React Router's useNavigate hook for navigation
  const navigate = useNavigate();

  // Calculate total incomes and expenses
  const totalIncomes = incomes.reduce((acc, cur) => acc + cur.price, 0);
  const totalExpenses = expenses.reduce((acc, cur) => acc + cur.price, 0);

  // Prepare data for the pie chart
  const data = [
    { value: totalIncomes, label: "Incomes" },
    { value: totalExpenses, label: "Expenses" },
  ];

  // Calculate the balance
  const balance = formatCurrency(totalIncomes - totalExpenses);

  return (
    // Box component for styling and layout purposes
    <Box
      component="section"
      sx={{
        justifyContent: "center",
        alignItems: "center",
        minHeight: `calc(100vh - 64px)`,
        "& > :not(style)": {
          m: 1,
          py: "12px",
          px: "18px",
          maxWidth: "800px",
          height: "fit-content",
        },
      }}
    >
      {/* Paper component for a styled elevation effect */}
      <Paper elevation={6}>
        {/* Check if there is any income or expense data */}
        {incomes.length > 0 || expenses.length > 0 ? (
          <>
            {/* Displaying summary header */}
            <Typography
              variant="h4"
              component="h1"
              sx={{
                color: "white",
                fontWeight: "bold",
                p: 2,
                textAlign: "center",
              }}
            >
              Summary
            </Typography>
            {/* Displaying pie chart (visible on larger screens) */}
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              {/* PieChart component for visualizing income and expense data */}
              <PieChart
                colors={palette}
                series={[
                  {
                    arcLabel: (item) => `${item.label}: ${item.value}`,
                    data,
                    highlightScope: { faded: "global", highlighted: "item" },
                    faded: {
                      innerRadius: 30,
                      additionalRadius: -30,
                      color: "gray",
                    },
                  },
                ]}
                sx={{
                  [`& .${pieArcLabelClasses.root}`]: {
                    fill: "white",
                    fontWeight: "bold",
                  },
                }}
                {...size}
              />
            </Box>
            {/* Displaying data (visible on smaller screens) */}
            <Box sx={{ display: { xs: "block", sm: "none" } }}>
              {/* Loop through data and display it as Typography components */}
              {data.map((item, i) => (
                <Typography
                  variant="body1"
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                    p: 2,
                    textAlign: "center",
                  }}
                  key={i}
                >
                  {item.label}: {item.value}
                </Typography>
              ))}
            </Box>
            {/* Displaying balance */}
            {/* Typography component for displaying the calculated balance */}
            <Typography
              variant="h6"
              sx={{
                color: "white",
                fontWeight: "bold",
                p: 2,
                textAlign: "center",
              }}
            >
              Balance: {balance}
            </Typography>
          </>
        ) : (
          <>
            {/* Displaying welcome message when there is no data */}
            <Typography variant="h4">
              Welcome to the Budget Tracker, please{" "}
              {/* Link component to navigate to the incomes page */}
              <Link
                sx={{ cursor: "pointer" }}
                onClick={() => navigate("/incomes")}
              >
                add your income
              </Link>{" "}
              to get started
            </Typography>
          </>
        )}
      </Paper>
    </Box>
  );
};

// Exporting the Summary component as the default export
export default Summary;
