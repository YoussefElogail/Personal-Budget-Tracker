// Importing necessary React hooks and components
import { useState } from "react";
import Table from "../components/Table";
import PageHeader from "../components/PageHeader";
import Form from "../components/Form";
import { DeletePopup } from "../components/DeletePopup";
import { useDispatch, useSelector } from "react-redux";
import { incomeActions } from "../store/incomes/incomesSlice";
import ActionAlert from "../components/ActionAlert";

// Incomes component
const Incomes = () => {
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

  // Redux selector to get income data from the store
  const { incomes } = useSelector((state) => state.incomesReducer);

  // Redux dispatcher for dispatching actions
  const dispatch = useDispatch();

  // Function to toggle the modal for adding or editing income data
  const openOrClose = (rowData) => {
    setOpen(!open);
    setSelectedRowData(open ? null : rowData);
  };

  // Function to toggle the delete confirmation popup
  const openOrCloseDeletePopup = (rowData) => {
    setOpenDeletePopup(!openDeletePopup);
    setSelectedRowData(openDeletePopup ? null : rowData);
  };

  // Function to handle adding income data
  const handleAdd = (data) => {
    dispatch(incomeActions.addIncome(data));
    openOrClose();
    handleAlert("Income added successfully", 3000);
  };

  // Function to handle editing income data
  const handleEdit = (data) => {
    dispatch(incomeActions.editIncome(data));
    openOrClose();
    handleAlert("The income has been modified successfully", 3000);
  };

  // Function to handle deleting income data
  const handleDelete = () => {
    dispatch(incomeActions.removeIncome(selectedRowData.id));
    openOrCloseDeletePopup();
    handleAlert("The income was deleted successfully", 3000);
  };

  // Rendering the components - PageHeader, Table, Form, and DeletePopup
  return (
    <>
      {/* Page header component */}
      <PageHeader {...{ openOrClose }} pageName={"Incomes"} />
      {showAlert && <ActionAlert {...{ alertMessage }} />}
      {/* Table component for displaying income data */}
      <Table
        {...{
          openOrClose,
          open,
          noData: "There are no incomes yet, please add income",
          data: incomes,
          openOrCloseDeletePopup,
        }}
      />
      {/* Form component for adding or editing income data */}
      <Form
        FormType={selectedRowData ? "Edit income" : "Add income"}
        {...{ open, openOrClose, selectedRowData, handleAdd, handleEdit }}
      />
      {/* DeletePopup component for confirming deletion of income data */}
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

// Exporting the Incomes component as the default export
export default Incomes;
