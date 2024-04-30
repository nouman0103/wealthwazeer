"use client"
import React from "react";
import { LoanCard, AddLoanCard } from "./loanCards";
import { GlassmorphicButton } from '@/components/buttons';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { GlassmorphicDataGrid } from '@/components/datagrid';

const handleCreatePayment = (row: any) => {
  console.log('Creating payment for row:', row);
};

const columns: GridColDef<(typeof rows)[number]>[] = [
  {
    field: 'amount',
    headerName: 'Amount',
    minWidth: 150,
    resizable: false,
    flex: 1,
    valueFormatter: (params: { value?: number }) => `RS ${params.value?.toLocaleString()}`
  },
  {
    field: 'recipient',
    headerName: 'Member',
    minWidth: 150,
    resizable: false,
    flex: 1,
  },
  {
    field: 'paid',
    headerName: 'Paid',
    type: 'number',
    minWidth: 150,
    resizable: false,
    flex: 1,
    valueFormatter: (params: { value?: number }) => `RS ${params.value?.toLocaleString()}`
  },
  {
    field: 'outstanding',
    headerName: 'Outstanding',
    type: 'number',
    minWidth: 150,
    resizable: false,
    flex: 1,
    valueFormatter: (params: { value?: number }) => `RS ${params.value?.toLocaleString()}`
  },
  {
    field: 'category',
    headerName: 'Category',
    minWidth: 150,
    resizable: false,
    flex: 1,
  },
  {
    field: 'deadline',
    headerName: 'Deadline',
    minWidth: 150,
    resizable: false,
    flex: 1,
  },
  {
    field: 'actions',
    headerName: 'Actions',
    minWidth: 200,
    resizable: false,
    flex: 1,
    renderCell: (params) => (
      <GlassmorphicButton onClick={() => handleCreatePayment(params.row)}>
        {params.value}
      </GlassmorphicButton>
    ),
  }
];

const rows = [
  { id: 1, amount: 30000, recipient: 'Alice', paid: 20000, outstanding: 10000, category: 'Personal Loan', deadline: '1st Nov, 2024', actions: 'Create Payment' },
  { id: 2, amount: 30000, recipient: 'Bob', paid: 20000, outstanding: 10000, category: 'Car Loan', deadline: '2nd Nov, 2024', actions: 'Create Payment' },

];

export default function Home() {
  return (
    <>
      <div className="p-8 flex flex-col gap-5 flex-grow overflow-hidden">
        <span className="text-2xl font-semibold text-white text-opacity-80">
          Loans
        </span>

        <div className="flex gap-8">
          <LoanCard key="homeLoan" loanName="Home Loan" money={100000} />
          <LoanCard key="carLoan" loanName="Car Loan" money={50000} />
          <LoanCard key="personalLoan" loanName="Personal Loan" money={10000} />
          <AddLoanCard />
        </div>

        <GlassmorphicDataGrid
          rows={rows}
          columns={columns}
          pageSizeOptions={[5]}
          disableRowSelectionOnClick
        />
      </div>
    </>
  );
}
