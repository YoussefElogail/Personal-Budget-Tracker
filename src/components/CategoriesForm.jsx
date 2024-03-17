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

const CategoriesForm = ({
  FormType,
  open,
  openOrClose,
  handleAdd,
  selectedRowData,
  handleEdit,
}) => {

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      category: "",
    },
  });


  useEffect(() => {
    reset({
      category: selectedRowData?.category || "",
    });
  }, [selectedRowData, reset]);

  const closeForm = () => {
    openOrClose();
    // setShowMessage(false);
  };


  const onSubmit = (data) => {
    // Check if updated total expenses exceed total incomes or if total incomes are negative

      // Handling edit or add based on whether selectedRowData is present
      if (selectedRowData) {
        handleEdit({
          id: selectedRowData?.id,
          updatedData: {
            category: data.category,
          },
        });
      } else {
        handleAdd(data);
      }
      openOrClose();
      reset();
    
  };


  return (
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
          {/* {showMessage && (
            <DialogContentText color="error">
              It is not possible to modify or add because the total expenses
              will exceed the total income or the total income will be negative.
            </DialogContentText>
          )} */}
          {/* Grid container for form inputs */}
          <Grid container spacing={2}>
            <Grid item xs={12} sx={{my:2}}>
              {/* Controller for handling the description input */}
              <Controller
                name="category"
                control={control}
                rules={{
                  required: "Category is required",
                  validate: (value) =>
                    value.trim() !== "" || "Category is required",
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Description"

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
  )
}

export default CategoriesForm