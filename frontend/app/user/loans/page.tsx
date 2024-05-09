"use client";
import React, { useMemo } from "react";
import { LoanCard, AddLoanCard } from "./loanCards";
import { GlassmorphicButton } from "@/components/buttons";
import { DataGrid, GridCellParams, GridColDef } from "@mui/x-data-grid";
import { GlassmorphicDataGrid } from "@/components/datagrid";
import { NewLoanDialog } from "./newLoanDialog";
import { CreatePaymentDialog } from "./createPaymentDialog";
import { redirect } from "next/navigation";
import { MetaResponse } from "@/utls/interface";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthContex";

const rows = [
  {
    id: 1,
    amount: 30000,
    recipient: "Alice",
    paid: 20000,
    outstanding: 10000,
    category: "Personal Loan",
    deadline: "1st Nov, 2024",
    actions: "Create Payment",
  },
  {
    id: 2,
    amount: 30000,
    recipient: "Bob",
    paid: 20000,
    outstanding: 10000,
    category: "Car Loan",
    deadline: "2nd Nov, 2024",
    actions: "Create Payment",
  },
];

export type Loan = {
  id: string;
  amount: number;
  date: string;
  description: string;
  partner: string;
  type: "payable" | "receivable";
};
export interface LoansList {
  transactions: Loan[];
  meta: MetaResponse;
}

export interface LoansReport {
  payableAmount: number;
  receivableAmount: number;
}

export default function Home() {
  const [newLoanDialogOpen, setNewLoanDialogOpen] = React.useState(false);
  const [createPaymentDialogOpen, setCreatePaymentDialogOpen] =
    React.useState(false);
  const [selectedloanid, setSelectedLoanId] = React.useState(0);
  const columns: GridColDef[] = useMemo(
    () => [
      {
        field: "partner",
        headerName: "Member",
        minWidth: 150,
        resizable: false,
        flex: 1,
        headerAlign: "center",
        align: "center",
      },
      {
        field: "amount",
        headerName: "Amount",
        minWidth: 150,
        resizable: false,
        flex: 1,
        valueFormatter: (params: { params?: number }) =>
          `RS ${params?.toLocaleString()}`,
        headerAlign: "center",
        align: "center",
      },
      // {
      //   field: "paid",
      //   headerName: "Paid",
      //   type: "number",
      //   minWidth: 150,
      //   resizable: false,
      //   flex: 1,
      //   valueFormatter: (params: { params?: number }) =>
      //     `RS ${params?.toLocaleString()}`,
      //   headerAlign: "center",
      //   align: "right",
      // },

      {
        field: "type",
        headerName: "Type",
        minWidth: 150,
        resizable: false,
        flex: 1,
        headerAlign: "center",
        align: "center",
        cellClassName: "capitalize",
      },
      {
        field: "date",
        headerName: "Date",
        minWidth: 150,
        resizable: false,
        flex: 1,
        headerAlign: "center",
        align: "center",
        valueFormatter: (value: string) => new Date(value).toLocaleString(),
      },
      {
        field: "description",
        headerName: "Description",
        type: "string",
        minWidth: 150,
        resizable: true,
        flex: 1,
        headerAlign: "center",
        align: "left",
      },
      {
        field: "actions",
        headerName: "Actions",
        minWidth: 200,
        resizable: false,
        flex: 1,
        headerAlign: "center",
        align: "center",
        renderCell: (params) => (
          <GlassmorphicButton onClick={() => setCreatePaymentDialogOpen(true)}>
            Pay Now
          </GlassmorphicButton>
        ),
      },
    ],
    []
  );

  const { api } = useAuth();

  const getLoans = async () => {
    const response = await api.get<LoansList>("/transactions/loans", {
      params: {
        limit: 0,
        page: 0,
      },
    });
    return response.data;
  };

  const { data, isLoading, isError } = useQuery<LoansList>({
    queryKey: ["loans"],
    queryFn: getLoans,
  });

  const getLoansReport = async () => {
    const response = await api.get<LoansReport>(
      "/transactions/loans/report",
      {}
    );
    return response.data;
  };

  const {
    data: loansReport,
    isLoading: loansReportLoading,
    isError: loansReportError,
  } = useQuery<LoansReport>({
    queryKey: ["loansReport"],
    queryFn: getLoansReport,
  });

  return (
    <>
      <div className="p-8 flex flex-col gap-5 flex-grow overflow-hidden">
        <span className="text-2xl font-semibold text-white text-opacity-80">
          Loans
        </span>

        <div className="flex gap-8">
          <LoanCard
            key="payableLoan"
            loanName="Payable Loan"
            money={loansReport?.payableAmount || 0}
          />
          <LoanCard
            key="receivableLoan"
            loanName="Receivable Loan"
            money={loansReport?.receivableAmount || 0}
          />
          <LoanCard
            key="netLoan"
            loanName="Net Loan"
            money={
              (loansReport?.receivableAmount || 0) -
              (loansReport?.payableAmount || 0)
            }
          />
          <AddLoanCard onClick={() => setNewLoanDialogOpen(true)} />
        </div>

        <GlassmorphicDataGrid
          rows={data?.transactions || []}
          columns={columns}
          pageSizeOptions={[5]}
          disableRowSelectionOnClick
        />
      </div>
      <NewLoanDialog
        open={newLoanDialogOpen}
        handleClose={() => setNewLoanDialogOpen(false)}
      />
      <CreatePaymentDialog
        open={createPaymentDialogOpen}
        handleClose={() => setCreatePaymentDialogOpen(false)}
      />
    </>
  );
}
