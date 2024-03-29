// React imports
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

// Importing Roboto font styles
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// HelmetProvider for managing document head updates
import { HelmetProvider } from "react-helmet-async";

// Theme context provider for theming in the application
import { ThemeContextProvider } from "./theme/ThemeContext.jsx";

// Redux imports
import { Provider } from "react-redux";
import { store } from "./store/store.js";

// Create a root for the ReactDOM (concurrent mode)
ReactDOM.createRoot(document.getElementById("root")).render(
  // React StrictMode for identifying potential problems
  <React.StrictMode>
    {/* HelmetProvider for managing document head updates */}
    <HelmetProvider>
      {/* Theme context provider for managing application theming */}
      <ThemeContextProvider>
        {/* Redux Provider providing access to the Redux store */}
        <Provider store={store}>
          {/* Main application component */}
          <App />
        </Provider>
      </ThemeContextProvider>
    </HelmetProvider>
  </React.StrictMode>
);
