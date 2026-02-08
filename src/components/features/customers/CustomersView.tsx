"use client";

import { flexRender } from "@tanstack/react-table";
import { useCustomer } from "@/hooks/useCustomer";

export default function CustomersView() {
    const { table, total, loading } = useCustomer();

    if (loading) {
        return <div className="p-6">Cargando clientes...</div>;
    }

    return (
        <div className="w-full h-screen flex flex-col">
            <table className="min-w-full bg-white">
                {/* HEADER */}
                <thead className="bg-primary text-white sticky top-0 z-10">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th
                                    key={header.id}
                                    className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider"
                                >
                                    {flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>

                {/* BODY */}
                <tbody className="divide-y divide-gray-200">
                    {table.getRowModel().rows.map((row, index) => (
                        <tr
                            key={row.id}
                            className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"
                                } hover:bg-blue-50 transition-colors`}
                        >
                            {row.getVisibleCells().map((cell) => (
                                <td
                                    key={cell.id}
                                    className="px-6 py-4 text-sm text-gray-700"
                                >
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>

                {/* FOOTER */}
                <tfoot className="bg-primary">
                    <tr>
                        <td
                            colSpan={6}
                            className="px-6 py-4 text-sm font-bold text-white text-right"
                        >
                            TOTAL DE CLIENTES: {total}
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
}
