// Importing necessary components and functions from external libraries and files
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import { NavLinks } from "./nav-links/NavLinks";
import Root from "./Root";
import Summary from "./pages/Summary";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { ThemeProvider } from "@emotion/react";
import { createTheme, CssBaseline } from "@mui/material";
import { useThemeContext } from "./theme/ThemeContext";
import { Helmet } from "react-helmet-async";

// Function component representing the main application
function App() {
  // Accessing the theme context to toggle between light and dark themes
  const { toggleTheme } = useThemeContext();

  // Retrieving income and expense data from the Redux store
  const { categories } = useSelector((state) => state.categoriesReducer);
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
    localStorage.setItem("categories", JSON.stringify(categories));
    localStorage.setItem("incomes", JSON.stringify(incomes));
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [toggleTheme, categories, incomes, expenses]);

  // Creating routes using react-router-dom and defining their elements
  const AppRoutes = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<Summary />} />

        {/* Mapping through NavLinks and creating routes */}
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
    <>
      {/* Setting metadata using Helmet */}
      <Helmet>
        <meta name="author" content="Youssef Elogail" />
      </Helmet>
      {/* Applying the MUI theme and providing the router */}
      <ThemeProvider theme={darkTheme}>
        {/* Applying MUI's baseline CSS styles */}
        <CssBaseline />
        {/* Providing the router context */}
        <RouterProvider router={AppRoutes} />
      </ThemeProvider>
    </>
  );
}

// Exporting the App component as the default export
export default App;
