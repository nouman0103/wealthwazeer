"use client"
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { GlassmorphicDataGrid } from '@/components/datagrid';
import { IncomingIcon, OutgoingIcon } from '@/components/datagrid';
import { GlassmorphicInputField } from '@/components/inputs';
import SearchIconRounded from '@mui/icons-material/SearchRounded';
import { InputAdornment } from '@mui/material';
import { Fragment, useState } from 'react';
import { GlassmorphicButton } from '@/components/buttons';
import { NewExpenseDialog, NewIncomeDialog } from './newTransactionDialog';
import { MetaResponse } from '@/utls/interface';
import { useAuth } from '@/context/AuthContex';
import { useQuery } from '@tanstack/react-query';

export type Transaction = {
  id: string;
  amount: number;
  date: string;
  description: string;
  partner: string;
};
export interface TransactionList {
  transactions: Transaction[];
  meta: MetaResponse;
}


const columns: GridColDef<Transaction>[] = [
  {
    field: 'type', headerName: 'Type', width: 90,
    sortable: false,
    renderCell: (params) => {
      return params.value === "income" ? <IncomingIcon /> : <OutgoingIcon />;
    }
  },
  {
    field: 'partner',
    headerName: 'Contact',
    minWidth: 150,
    resizable: false,
    flex: 1,
  },
  {
    field: 'description',
    headerName: 'Description',
    type: 'string',
    minWidth: 110,
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
    headerName: 'Date & Time',
    type: 'string',
    minWidth: 110,
    resizable: false,
    flex: 1,
    valueFormatter: (value: string) => new Date(value).toLocaleString()
  },
 
];







export default function Home() {
  const [newExpenseDialogOpen, setNewExpenseDialogOpen] = useState(false)
  const [newIncomeDialogOpen, setNewIncomeDialogOpen] = useState(false);
  const {api } = useAuth();
  const getTransactions = async () => {
    const response = await api.get<TransactionList>('/transactions',{
      params: {
        limit: 0,
        page: 0,
        
      },
    
    });
    return response.data;
  }
  const { data, isLoading, isError } = useQuery<TransactionList>({
    queryKey: ['transactions'],
    queryFn: getTransactions,
  });

  return (
    <>
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
          <GlassmorphicButton fontSize={16} onClick={() => {setNewExpenseDialogOpen(true);}}>
            New Expense
          </GlassmorphicButton>
          <GlassmorphicButton fontSize={16} onClick={() => {setNewIncomeDialogOpen(true);}}>
            New Income
          </GlassmorphicButton>

        </div>

        <GlassmorphicDataGrid
          rows={data?.transactions || []}
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
      <NewExpenseDialog open={newExpenseDialogOpen} handleClose={() => setNewExpenseDialogOpen(false)} />
      <NewIncomeDialog open={newIncomeDialogOpen} handleClose={() => setNewIncomeDialogOpen(false)} />
    </>
  );
}
