"use client"
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { GlassmorphicDataGrid } from '@/components/datagrid';
import { IncomingIcon, OutgoingIcon } from '@/components/datagrid';
import {GlassmorphicInputField} from '@/components/inputs';
import SearchIconRounded from '@mui/icons-material/SearchRounded';
import { InputAdornment } from '@mui/material';
import { Fragment } from 'react';
import { GlassmorphicButton } from '@/components/buttons';


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
  { id: 6, type: 2, recipient: 'Youtube Premium', amount: 200, date: '2022-01-01', time: '12:00:00' },
  { id: 7, type: 1, recipient: 'Spotify', amount: 200, date: '2022-01-01', time: '12:00:00' },
  { id: 8, type: 2, recipient: 'Netflix', amount: 200, date: '2022-01-01', time: '12:00:00' },
  { id: 9, type: 1, recipient: 'John Doe', amount: 1000, date: '2022-01-01', time: '12:00:00' },
  { id: 10, type: 2, recipient: 'Youtube Premium', amount: 200, date: '2022-01-01', time: '12:00:00' },
  { id: 11, type: 1, recipient: 'Spotify', amount: 200, date: '2022-01-01', time: '12:00:00' },
  { id: 12, type: 2, recipient: 'Netflix', amount: 200, date: '2022-01-01', time: '12:00:00' },
  { id: 13, type: 1, recipient: 'John Doe', amount: 1000, date: '2022-01-01', time: '12:00:00' },
  { id: 14, type: 2, recipient: 'Youtube Premium', amount: 200, date: '2022-01-01', time: '12:00:00' },
  { id: 15, type: 1, recipient: 'Spotify', amount: 200, date: '2022-01-01', time: '12:00:00' },
  { id: 16, type: 2, recipient: 'Netflix', amount: 200, date: '2022-01-01', time: '12:00:00' },

];


export default function Home() {
  return (
    <div className="p-8 flex flex-col gap-5 flex-grow overflow-hidden">

      <div className='flex justify-between'>
        <text className="text-2xl font-semibold text-white text-opacity-80 my-auto">
          Transactions
        </text>
        <GlassmorphicInputField
          label={
            <Fragment>
              <SearchIconRounded className='text-white text-opacity-80 text-3xl mr-2 mb-2' />
              <text className='text-white text-opacity-80 -mt-[2px]'>Search for transactions</text>
            </Fragment>
          }
            size='small'
            className='w-96'
          
        />
      </div>
      <div className='flex gap-5'>
        <GlassmorphicButton fontSize={16}>
          New Expense
        </GlassmorphicButton>
        <GlassmorphicButton fontSize={16}>
          New Income
        </GlassmorphicButton>
        
      </div>

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
