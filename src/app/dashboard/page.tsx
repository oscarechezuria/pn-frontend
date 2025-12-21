"use client";

import React from "react";
import FileUpload from "@/components/layout/dashboard/main/FileUpload";
import AccountsReceivable from "@/components/layout/dashboard/main/AccountsReceivable";
import { useInvoice } from "@/hooks/dashboard/useInvoice";
import { filterInvoices, transformInvoices } from "@/lib/utils";


export default function Page() {
  const { data, loading, error, refetch } = useInvoice();


  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-lg font-semibold">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-red-600 text-lg">
        Error: {error}
      </div>
    );
  }

  const isEmpty = Array.isArray(data) && data.length === 0;

  // Transformamos la data (añade days_expired, a cada objeto.)
  const transformedData = !isEmpty ? transformInvoices(data) : [];

  // Ordenamos solo facturas por days_expired (desc) sin tomar en cuenta las notas de crédito
  const sortedData =
    !isEmpty && Array.isArray(transformedData)
      ? filterInvoices(transformedData)
      : [];

  return isEmpty ? (
    <FileUpload refetch={refetch} />
  ) : (
    <AccountsReceivable data={sortedData} />
  );
}
