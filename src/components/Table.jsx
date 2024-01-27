// Importing necessary MUI components and icons
import { DataGrid } from "@mui/x-data-grid";
import { Box, IconButton, Tooltip } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

// Columns configuration for the table
const columns = [
  { field: "category", headerName: "Category", flex: 1, minWidth: 150 },
  { field: "date", headerName: "Date", flex: 1, minWidth: 100 },
  { field: "description", headerName: "Description", flex: 1, minWidth: 150 },
  {
    field: "price",
    headerName: "Price",
    type: "number",
    flex: 1,
    minWidth: 150,
  },
];

// Table component
const Table = ({ noData, data, openOrClose, openOrCloseDeletePopup }) => {
  // Additional columns configuration including actions (edit and delete)
  const allColumns = [
    ...columns,
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      minWidth: 200,
      renderCell: (params) => (
        <Box>
          {/* Edit button with a tooltip */}
          <Tooltip title="Edit" placement="left">
            <IconButton
              onClick={() => openOrClose(params.row)}
              aria-label="edit"
            >
              <Edit />
            </IconButton>
          </Tooltip>
          {/* Delete button with a tooltip */}
          <Tooltip title="Delete" placement="right">
            <IconButton
              onClick={() => openOrCloseDeletePopup(params.row)}
              aria-label="delete"
              color="error"
            >
              <Delete />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  // Rendering the DataGrid component with the specified data and columns
  return (
    <Box component="section">
      <DataGrid
        rows={data}
        columns={allColumns}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
        autoHeight
        localeText={{
          noRowsLabel: noData,
        }}
      />
    </Box>
  );
};

// Exporting the Table component as the default export
export default Table;
