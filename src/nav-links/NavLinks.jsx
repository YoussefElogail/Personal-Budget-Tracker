// Importing page components and icons from Material-UI
import Incomes from '../pages/Incomes';
import Expenses from '../pages/Expenses';
import { Home, MoneyOff, AttachMoney } from '@mui/icons-material';

// Function to generate an array of navigation links
export const NavLinks = () => {
  return [
    {
      path: "/",              // Route path for the Summary page
      name: "Summary",        // Display name for the navigation link
      icon: <Home />,          // Material-UI icon for the navigation link
    },
    {
      path: "/incomes",       // Route path for the Incomes page
      name: "Incomes",        // Display name for the navigation link
      icon: <AttachMoney />,   // Material-UI icon for the navigation link
      pageComponent: <Incomes />  // Component to be rendered when navigating to this link
    },
    {
      path: "/expenses",      // Route path for the Expenses page
      name: "Expenses",       // Display name for the navigation link
      icon: <MoneyOff />,      // Material-UI icon for the navigation link
      pageComponent: <Expenses /> // Component to be rendered when navigating to this link
    }
  ];
}
