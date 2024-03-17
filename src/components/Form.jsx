// Importing necessary React, MUI, and date-related components
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  Grid,
  Slide,
  Box,
  DialogContentText,
  Typography,
} from "@mui/material";
import category from "../../category.json";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { expensesActions } from "../store/expenses/expensesSlice";

// Transition component for the Dialog
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// Form component
const Form = ({
  FormType,
  open,
  openOrClose,
  handleAdd,
  selectedRowData,
  handleEdit,
}) => {
  // React Hook Form configuration
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      category: "",
      price: "",
      date: dayjs(),
      description: "",
    },
  });

  // Effect to set default values when selectedRowData changes
  useEffect(() => {
    reset({
      category: selectedRowData?.category || "",
      price: selectedRowData?.price || "",
      date: selectedRowData?.date ? dayjs(selectedRowData.date) : dayjs(),
      description: selectedRowData?.description || "",
    });
  }, [selectedRowData, reset]);

  // State to manage whether to show the error message
  const [showMessage, setShowMessage] = useState(false);

  // Function to show the error message for a brief period
  const handleShowMessage = () => {
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 10000);
  };

  // Function to close the form and hide the error message
  const closeForm = () => {
    openOrClose();
    setShowMessage(false);
  };

  // Extracting expenses and incomes from Redux store
  const { categories } = useSelector((state) => state.categoriesReducer);
  const { expenses } = useSelector((store) => store.expensesReducer);
  const { incomes } = useSelector((state) => state.incomesReducer);

  // Calculating total expenses and total incomes
  const totalExpenses = expenses.reduce((acc, prv) => acc + prv.price, 0);
  const totalIncomes = incomes.reduce((acc, prv) => acc + prv.price, 0);

  // Form submission callback
  const onSubmit = (data) => {
    const trimmedDescription = data.description.trim();
    const formattedDate = dayjs(data.date).format("YYYY-MM-DD");
    const currentPrice = +data.price;

    // Calculate updated total expenses after adding or editing the expense
    const updatedTotalExpenses =
      FormType === "Add expense"
        ? currentPrice + totalExpenses
        : FormType === "Edit expense"
        ? totalExpenses - selectedRowData?.price + currentPrice
        : totalExpenses;

    // Calculate updated total incomes after adding or editing the expense
    const updatedTotalIncomes =
      FormType === "Add income"
        ? currentPrice + totalIncomes
        : FormType === "Edit income"
        ? totalIncomes - selectedRowData?.price + currentPrice
        : totalIncomes;

    // Check if updated total expenses exceed total incomes or if total incomes are negative
    if (updatedTotalExpenses > updatedTotalIncomes || updatedTotalIncomes < 0) {
      handleShowMessage();
    } else {
      // Handling edit or add based on whether selectedRowData is present
      if (selectedRowData) {
        handleEdit({
          id: selectedRowData?.id,
          updatedData: {
            category: data.category,
            price: currentPrice,
            date: formattedDate,
            description: trimmedDescription,
          },
        });
      } else {
        handleAdd({
          ...data,
          date: formattedDate,
          price: currentPrice,
          description: trimmedDescription,
        });
      }
      setShowMessage(false);
      openOrClose();
      reset();
    }
  };

  return (
    // Dialog component for the form
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={closeForm}
      aria-labelledby="form-dialog-title"
    >
      {/* Form content within a Box component */}
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        {/* Dialog title */}
        <DialogTitle>{FormType}</DialogTitle>
        <DialogContent>
          {/* Display error message if showMessage is true */}
          {showMessage && (
            <DialogContentText color="error">
              It is not possible to modify or add because the total expenses
              will exceed the total income or the total income will be negative.
            </DialogContentText>
          )}
          {/* Grid container for form inputs */}
          <Grid container spacing={2}>
            {categories.length < 1 && (
              <Grid item xs={12}>
                <Typography textAlign="center" component="p" variant="body1" color="error">
                  There are no categories, please add categories
                </Typography>
              </Grid>
            )}

            {/* Category Select */}
            <Grid item sm={6} xs={12}>
              {/* Controller for handling the category select input */}
              <Controller
                name="category"
                control={control}
                rules={{ required: "Category is required" }}
                render={({ field }) => (
                  <>
                    <TextField
                      {...field}
                      disabled={categories.length < 1}
                      select
                      label="Category"
                      margin="dense"
                      fullWidth
                      error={!!errors.category}
                      helperText={errors.category?.message}
                    >
                      {categories.map((item, i) => (
                        <MenuItem
                          key={i}
                          value={item.category}
                          sx={{ textTransform: "capitalize" }}
                        >
                          {item.category}
                        </MenuItem>
                      ))}
                    </TextField>
                  </>
                )}
              />
            </Grid>
            {/* Price TextField */}
            <Grid item sm={6} xs={12}>
              {/* Controller for handling the price input */}
              <Controller
                name="price"
                control={control}
                rules={{
                  required: "Price is required",
                  min: { value: 1, message: "Price must be at least 1" },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Price"
                    type="number"
                    margin="dense"
                    fullWidth
                    error={!!errors.price}
                    helperText={errors.price?.message}
                  />
                )}
              />
            </Grid>
            {/* Date Picker */}
            <Grid item xs={12}>
              {/* Controller for handling the date input */}
              <Controller
                name="date"
                control={control}
                rules={{ required: "Date is required" }}
                render={({ field }) => (
                  <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    defaultValue={dayjs()}
                  >
                    <DatePicker
                      sx={{ width: "100%" }}
                      {...field}
                      label="Date"
                      fullWidth
                      error={!!errors.date}
                      helperText={errors.date?.message}
                    />
                  </LocalizationProvider>
                )}
              />
            </Grid>
            {/* Description TextArea */}
            <Grid item xs={12}>
              {/* Controller for handling the description input */}
              <Controller
                name="description"
                control={control}
                rules={{
                  required: "Description is required",
                  validate: (value) =>
                    value.trim() !== "" || "Description is required",
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Description"
                    multiline
                    rows={4}
                    fullWidth
                    error={!!errors.description}
                    helperText={errors.description?.message}
                  />
                )}
              />
            </Grid>
          </Grid>
        </DialogContent>
        {/* Dialog actions */}
        <DialogActions>
          <Button variant="outlined" onClick={closeForm}>
            Cancel
          </Button>
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

// Exporting the Form component as the default export
export default Form;
