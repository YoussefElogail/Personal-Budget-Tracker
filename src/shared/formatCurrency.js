// The formatCurrency function takes a numeric value and formats it as currency
const formatCurrency = (number) => {
  // Uses the Intl.NumberFormat object to format the number based on the user's locale and formatting preferences
  return new Intl.NumberFormat().format(number);
}

// Exporting the function to make it available for use in other files
export default formatCurrency;
