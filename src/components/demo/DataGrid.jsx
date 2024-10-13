import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'name',
    headerName: 'Product Name',
    width: 200,
    editable: true,
  },
  {
    field: 'company',
    headerName: 'Company',
    width: 180,
    editable: true,
  },
  {
    field: 'email',
    headerName: 'Support Email',
    width: 250,
    editable: true,
  },
  {
    field: 'price',
    headerName: 'Price (USD)',
    type: 'number',
    width: 130,
    editable: true,
  },
];


const DataGridMaterial = ({rows}) => {
  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}

export default DataGridMaterial
