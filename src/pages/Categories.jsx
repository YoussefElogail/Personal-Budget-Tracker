import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { categoriesActions } from "../store/categories/categoriesSlice";
import { Helmet } from 'react-helmet-async';
import PageHeader from '../components/PageHeader';
import ActionAlert from '../components/ActionAlert';
import { DeletePopup } from '../components/DeletePopup';
import CategoriesTable from '../components/categoriesTable';
import CategoriesForm from '../components/CategoriesForm';
import { CategoriesDeletePopup } from '../components/CategoriesDeletePopup';

const Categories = () => {
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

  // Redux selector to get Category data from the store
  const { categories } = useSelector((state) => state.categoriesReducer);

  // Redux dispatcher for dispatching actions
  const dispatch = useDispatch();

  // Function to toggle the modal for adding or editing Category data
  const openOrClose = (rowData) => {
    setOpen(!open);
    setSelectedRowData(open ? null : rowData);
  };

  // Function to toggle the delete confirmation popup
  const openOrCloseDeletePopup = (rowData) => {
    setOpenDeletePopup(!openDeletePopup);
    setSelectedRowData(openDeletePopup ? null : rowData);
  };

  // Function to handle adding Category data
  const handleAdd = (data) => {
    dispatch(categoriesActions.addCategories(data));
    openOrClose();
    handleAlert("Category added successfully", 3000);
  };

  // Function to handle editing Category data
  const handleEdit = (data) => {
    dispatch(categoriesActions.editCategories(data));
    openOrClose();
    handleAlert("The Category has been modified successfully", 3000);
  };

  // Function to handle deleting Category data
  const handleDelete = () => {
    dispatch(categoriesActions.removeCategories(selectedRowData.id));
    openOrCloseDeletePopup();
    handleAlert("The Category was deleted successfully", 3000);
  };

  // Rendering the components - PageHeader, Table, Form, and DeletePopup
  return (
    <>
      {/* Setting metadata using Helmet */}
      <Helmet prioritizeSeoTags>
        <title>Categories</title>
        <meta name="description" content="The dedicated page for adding, editing, or deleting Category." />
      </Helmet>
      {/* Page header component */}
      <PageHeader {...{ openOrClose }} pageName={"Categories"} />
      {showAlert && <ActionAlert {...{ alertMessage }} />}
      {/* Table component for displaying Category data */}
      <CategoriesTable
        {...{
          openOrClose,
          open,
          noData: "There are no categories yet, please add category",
          data: categories,
          openOrCloseDeletePopup,
        }}
      />
      {/* Form component for adding or editing Category data */}
      <CategoriesForm
        FormType={selectedRowData ? "Edit categories" : "Add categories"}
        {...{ open, openOrClose, selectedRowData, handleAdd, handleEdit }}
      />
      {/* DeletePopup component for confirming deletion of Category data */}
      <CategoriesDeletePopup
        {...{
          openDeletePopup,
          openOrCloseDeletePopup,
          selectedRowData,
          handleDelete,
        }}
      />
    </>
  );
}

export default Categories