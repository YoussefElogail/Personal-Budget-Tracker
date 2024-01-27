// Importing necessary MUI components
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";

// DeletePopup component
export const DeletePopup = ({
  openDeletePopup,
  openOrCloseDeletePopup,
  selectedRowData,
  handleDelete
}) => {
  return (
    <>
      {/* Confirmation Dialog */}
      <Dialog
        fullWidth
        open={openDeletePopup}
        onClose={openOrCloseDeletePopup}
        aria-labelledby="Delete warning"
        aria-describedby="Delete warning"
      >
        <DialogTitle>Are you sure to delete the following?</DialogTitle>
        <DialogContent>
          {/* Displaying details of the selected row */}
          <Typography component="p">
            Category: {selectedRowData?.category}
          </Typography>
          <Typography component="p">
            Price: {selectedRowData?.price}
          </Typography>
          <Typography component="p">
            Date: {selectedRowData?.date}
          </Typography>
          <Typography component="p">
            Description: {selectedRowData?.description}
          </Typography>
        </DialogContent>
        <DialogActions>
          {/* Cancel button */}
          <Button variant="outline" onClick={openOrCloseDeletePopup}>
            Cancel
          </Button>
          {/* Delete button */}
          <Button color="error" onClick={handleDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
