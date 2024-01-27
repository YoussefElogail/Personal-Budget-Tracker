// Importing necessary components and functions from external libraries and files
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import Summary from "./pages/Summary";
import { NavLinks } from "./nav-links/NavLinks";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Root from "./Root";
import { ThemeProvider } from "@emotion/react";
import { createTheme, CssBaseline } from "@mui/material";
import { useThemeContext } from "./theme/ThemeContext";

function App() {
  // Accessing the theme context to toggle between light and dark themes
  const { toggleTheme } = useThemeContext();

  // Retrieving income and expense data from the Redux store
  const { incomes } = useSelector((state) => state.incomesReducer);
  const { expenses } = useSelector((store) => store.expensesReducer);

  // Creating a dark or light MUI theme based on the theme toggle
  const darkTheme = createTheme({
    palette: {
      mode: toggleTheme, // Using the toggleTheme state to determine the theme mode
    },
  });

  // Saving theme, incomes, and expenses to localStorage on changes
  useEffect(() => {
    localStorage.setItem("theme", toggleTheme);
    localStorage.setItem("incomes", JSON.stringify(incomes));
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [toggleTheme, incomes, expenses]);

  // Creating routes using react-router-dom and defining their elements
  const AppRoutes = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<Summary />} />

        {NavLinks().map((link, i) =>
          link.path !== "/" ? (
            <Route key={i} path={link.path} element={link.pageComponent} />
          ) : null
        )}
      </Route>
    )
  );

  // Rendering the main application component with MUI theme and routing
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <RouterProvider router={AppRoutes} />
    </ThemeProvider>
  );
}

// Exporting the App component as the default export
export default App;
