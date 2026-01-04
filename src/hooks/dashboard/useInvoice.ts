"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchInvoices } from "@/services/dashboard/invoiceService";
import { Invoice } from "@/app/types/Common";

export function useInvoice() {
  const { data, isLoading, error, refetch, isRefetching } = useQuery<Invoice[], Error>({
    queryKey: ["invoices"],
    queryFn: fetchInvoices,
    staleTime: 20 * 60 * 1000, 
});
  

  return {
    data: data ?? [],
    loading: isLoading || isRefetching,
    error: error?.message ?? null,
    refetch,
  };
}