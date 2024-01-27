// React imports
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

// Importing Roboto font styles
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// Theme context provider for theming in the application
import { ThemeContextProvider } from "./theme/ThemeContext.jsx";

// Redux imports
import { Provider } from "react-redux";
import { store } from "./store/store.js";

// Create a root for the ReactDOM (concurrent mode)
ReactDOM.createRoot(document.getElementById("root")).render(
  // React StrictMode for identifying potential problems
  <React.StrictMode>
    {/* Theme context provider */}
    <ThemeContextProvider>
      {/* Redux Provider providing access to the Redux store */}
      <Provider store={store}>
        {/* Main application component */}
        <App />
      </Provider>
    </ThemeContextProvider>
  </React.StrictMode>
);
