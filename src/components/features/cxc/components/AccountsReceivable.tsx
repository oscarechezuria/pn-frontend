"use client";

import React from "react";
import { useReactTable, getCoreRowModel, flexRender, createColumnHelper } from "@tanstack/react-table";
import { AccountsReceivableWithCustomer } from "@/app/types/Common";
import { formatCurrency } from "@/lib/utils";
import { groupInvoicesByCustomer, calculateInvoiceSubtotals, calculateTotalReceivables } from "@/lib/invoices";
import type { QueryObserverResult } from "@tanstack/react-query"

type AccountsReceivableProps = {
  data: AccountsReceivableWithCustomer[];
  refetch: () => Promise<QueryObserverResult<AccountsReceivableWithCustomer[], Error>>;
};
const columnHelper = createColumnHelper<AccountsReceivableWithCustomer>();

const columns = [
  columnHelper.accessor("customer_name", {
    header: "Cliente",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("document_number", {
    header: "Número",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("document_type", {
    header: "Tipo Documento",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("issue_date", {
    header: "Emisión",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("due_date", {
    header: "Vencimiento",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("days_expired", {
    header: "Días Vencidos",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("seller_first_name", {
    header: "Vendedor",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("net_amount", {
    header: "Neto",
    cell: (info) => `$${info.getValue().toFixed(2)}`,
  }),
];

export default function AccountsReceivable({ data }: AccountsReceivableProps) {

  // Ejecutar funciones puras desde @/lib/invoices
  const groupedData = groupInvoicesByCustomer(data);
  const subtotales = calculateInvoiceSubtotals(groupedData);
  const totalGeneral = calculateTotalReceivables(subtotales);


  //  Tabla TanStack

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });


  return (
    <div className="w-full h-screen flex flex-col">
      <table className="animate-fadeIn min-w-full bg-white">


        {/* HEADER FIJO */}
        <thead className="bg-primary text-white sticky top-0">
          <tr>
            <th colSpan={100} className="px-4 py-2 text-left bg-primary">
              TOTAL CXC: {formatCurrency(totalGeneral)} $
            </th>
          </tr>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider whitespace-nowrap bg-primary"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        {/* BODY*/}
        <tbody className="divide-y divide-gray-200">
          {Object.keys(groupedData).map((client) => (
            <React.Fragment key={client}>
              {groupedData[client].map((factura, index) => {
                const rowIndex = table
                  .getRowModel()
                  .rows.findIndex((row) => row.original === factura);
                const row = table.getRowModel().rows[rowIndex];

                return (
                  <tr
                    key={row.id}
                    className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                  >
                    {row.getVisibleCells().map((cell) => {
                      const cellValue = flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      );

                      // Formatear si es la columna net_amount
                      const formattedValue = cell.column.id === 'net_amount'
                        ? `${formatCurrency(cell.getValue() as number)} $`
                        : cellValue;

                      return (
                        <td
                          key={cell.id}
                          className={`px-4 py-3 text-sm text-gray-700 whitespace-nowrap 
                        ${cell.column.id === 'days_expired' ? 'text-center' : ''}
                         ${cell.column.id === 'net_amount' ? 'font-mono text-right tabular-nums' : ''}`
                          }
                        >
                          {formattedValue}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}

              {/* SUBTOTAL */}
              <tr className="bg-black/10 font-semibold">
                <td
                  colSpan={6}
                  className="px-4 py-3 text-sm text-gray-800 whitespace-nowrap"
                >
                  SUBTOTAL: {groupedData[client][0].customer_name}
                </td>
                <td className="px-4 py-3 text-sm text-gray-800 whitespace-nowrap"></td>
                <td className="px-4 py-3 text-sm text-gray-800 whitespace-nowrap font-mono text-right tabular-nums">
                  {formatCurrency(subtotales[client])} $
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
