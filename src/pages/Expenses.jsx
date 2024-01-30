// Importing necessary React hooks and components
import { useState } from "react";
import Table from "../components/Table";
import Form from "../components/Form";
import PageHeader from "../components/PageHeader";
import { DeletePopup } from "../components/DeletePopup";
import { useDispatch, useSelector } from "react-redux";
import { expensesActions } from "../store/expenses/expensesSlice";
import ActionAlert from "../components/ActionAlert";
import { Helmet } from "react-helmet-async";

// Expenses component
const Expenses = () => {
  // State variables for managing selected row data and modal visibility
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [open, setOpen] = useState(false);
  const [openDeletePopup, setOpenDeletePopup] = useState(false);

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  // Function to show an alert for a certain time
  const handleAlert = (message, timeToHide) => {
    setShowAlert(true);
    setAlertMessage(message);
    setTimeout(() => {
      setShowAlert(false);
    }, timeToHide);
  };

  // Redux selector to get expenses data from the store
  const { expenses } = useSelector((store) => store.expensesReducer);

  // Redux dispatcher for dispatching actions
  const dispatch = useDispatch();

  // Function to toggle the modal for adding or editing expenses data
  const openOrClose = (rowData) => {
    setOpen(!open);
    setSelectedRowData(open ? null : rowData);
  };

  // Function to toggle the delete confirmation popup
  const openOrCloseDeletePopup = (rowData) => {
    setOpenDeletePopup(!openDeletePopup);
    setSelectedRowData(openDeletePopup ? null : rowData);
  };

  // Function to handle adding expenses data
  const handleAdd = (data) => {
    dispatch(expensesActions.addExpenses(data));
    openOrClose();
    handleAlert("Expense added successfully", 3000);
  };

  // Function to handle editing expenses data
  const handleEdit = (data) => {
    dispatch(expensesActions.editExpenses(data));
    openOrClose();
    handleAlert("The expense has been modified successfully", 3000);
  };

  // Function to handle deleting expenses data
  const handleDelete = () => {
    dispatch(expensesActions.removeExpenses(selectedRowData.id));
    openOrCloseDeletePopup();
    handleAlert("The expense was deleted successfully", 3000);
  };

  // Rendering the components - PageHeader, Table, Form, and DeletePopup
  return (
    <>
      <Helmet prioritizeSeoTags>
        <title>Expenses</title>
        <meta
          name="description"
          content="The dedicated page for adding, editing, or deleting expense."
        />
      </Helmet>
      {/* Page header component */}
      <PageHeader {...{ openOrClose }} pageName={"Expenses"} />
      {/* Displaying an alert if showAlert is true */}
      {showAlert && <ActionAlert {...{ alertMessage }} />}
      {/* Table component for displaying expenses data */}
      <Table
        {...{
          noData: "There are no expenses yet, please add an expense",
          openOrClose,
          open,
          data: expenses,
          openOrCloseDeletePopup,
        }}
      />
      {/* Form component for adding or editing expenses data */}
      <Form
        FormType={selectedRowData ? "Edit expense" : "Add expense"}
        {...{ open, openOrClose, selectedRowData, handleAdd, handleEdit }}
      />
      {/* DeletePopup component for confirming deletion of expenses data */}
      <DeletePopup
        {...{
          openDeletePopup,
          openOrCloseDeletePopup,
          selectedRowData,
          handleDelete,
        }}
      />
    </>
  );
};

// Exporting the Expenses component as the default export
export default Expenses;
