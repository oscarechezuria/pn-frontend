"use client";

import { useEffect, useState } from "react";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Switch } from "@/components/ui/switch";
import { Customer } from "@/app/types/Common";
import { customerService } from "@/services/dashboard/customerService";

const columnHelper = createColumnHelper<Customer>();

export function useCustomer() {
  const [data, setData] = useState<Customer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const customers = await customerService.getAll();
        setData(customers);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const handleToggleActive = async (
    customerId: number,
    newValue: boolean
  ) => {
    // Optimistic update
    setData((prev) =>
      prev.map((customer) =>
        customer.customer_id === customerId
          ? { ...customer, is_active: newValue }
          : customer
      )
    );

    try {
      await customerService.updateStatus(customerId, newValue);
    } catch {
      // Rollback simple
      setData((prev) =>
        prev.map((customer) =>
          customer.customer_id === customerId
            ? { ...customer, is_active: !newValue }
            : customer
        )
      );
    }
  };

  const columns = [
    columnHelper.accessor("customer_code", {
      header: "Código",
    }),
    columnHelper.accessor("customer_name", {
      header: "Nombre del Cliente",
    }),
    columnHelper.accessor("credit_days", {
      header: "Días de Crédito",
      cell: (info) => `${info.getValue()} días`,
    }),
    columnHelper.accessor("region", {
      header: "Región",
    }),
    columnHelper.accessor("seller", {
      header: "Vendedor",
    }),
    columnHelper.accessor("is_active", {
      header: "Estado",
      cell: (info) => (
        <Switch
          checked={info.getValue()}
          onCheckedChange={(checked) =>
            handleToggleActive(info.row.original.customer_id, checked)
          }
        />
      ),
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return {
    table,
    total: data.length,
    loading,
  };
}
