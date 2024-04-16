"use client"
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { GlassmorphicDataGrid } from '@/components/datagrid';
import { IncomingIcon, OutgoingIcon } from '@/components/datagrid';


const columns: GridColDef<(typeof rows)[number]>[] = [
  {
    field: 'type', headerName: 'Type', width: 90,
    sortable: false,
    renderCell: (params) => {
      return params.value === 1 ? <IncomingIcon /> : <OutgoingIcon/>;
    }
  },
  {
    field: 'recipient',
    headerName: 'Recipient',
    minWidth: 150,
    resizable: false,
    flex: 1,
  },
  {
    field: 'amount',
    headerName: 'Amount',
    type: 'number',
    minWidth: 150,
    resizable: false,
    flex: 1,
    valueFormatter: (value?: number) => `RS ${value?.toLocaleString()}`
  },
  {
    field: 'date',
    headerName: 'Date',
    type: 'string',
    minWidth: 110,
    resizable: false,
    flex: 1,
  },
  {
    field: 'time',
    headerName: 'Time',
    type: 'string',
    minWidth: 110,
    resizable: false,
    flex: 1,
  },
];



const rows = [
  { id: 1, type: 1, recipient: 'John Doe', amount: 1000, date: '2022-01-01', time: '12:00:00' },
  { id: 2, type: 2, recipient: 'Youtube Premium', amount: 200, date: '2022-01-01', time: '12:00:00' },
  { id: 3, type: 1, recipient: 'Spotify', amount: 200, date: '2022-01-01', time: '12:00:00' },
  { id: 4, type: 2, recipient: 'Netflix', amount: 200, date: '2022-01-01', time: '12:00:00' },
  { id: 5, type: 1, recipient: 'John Doe', amount: 1000, date: '2022-01-01', time: '12:00:00' },

];


export default function Home() {
  return (
    <div className="p-8 flex flex-col gap-5 flex-grow overflow-hidden">
      <text className="text-2xl font-semibold text-white text-opacity-80">
        Transactions
      </text>

      <GlassmorphicDataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />

    </div>
  );
}
