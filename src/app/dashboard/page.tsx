"use client";

import React from "react";
import FileUpload from "@/components/layout/dashboard/main/FileUpload";
import AccountsReceivable from "@/components/layout/dashboard/main/AccountsReceivable";
import { useInvoice } from "@/hooks/dashboard/useInvoice";
import { filterInvoices, transformInvoices } from "@/lib/utils";
import Skeleton_table from "@/components/ui/skeleton_table";

export default function Page() {
  const { data, loading, error, refetch } = useInvoice();

  if (loading) {
    return <Skeleton_table />;
  }

  if (error) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-red-600 text-lg">
        Error: {error}
      </div>
    );
  }

  const isEmpty = data.length === 0;

  // Transformamos la data (añade days_expired a cada objeto)
  const transformedData = !isEmpty ? transformInvoices(data) : [];

  // Filtramos y ordenamos las facturas
  const sortedData = !isEmpty ? filterInvoices(transformedData) : [];



  return isEmpty ? (
    <FileUpload refetch={refetch}/>
  ) : (
    <AccountsReceivable data={sortedData} refetch={refetch} />
  );
}