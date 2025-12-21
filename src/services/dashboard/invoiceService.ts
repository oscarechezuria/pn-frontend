"use client";

import {supabase}  from "@/lib/supabaseClient";

export interface Invoice {
  client_id: string;
  document_number: number;
  document_type: string;
  seller_name: string;
  issue_date: string;
  due_date: string;
  days_expired: number;
  net_amount: number;
  is_active: boolean;
}


export async function fetchInvoices(): Promise<Invoice[]> {
  const { data, error } = await supabase
    .from("accounts_receivable")
    .select("*")
    .eq("is_active", true);

  if (error) {
    console.error("Error fetching facturas:", error);
    throw new Error(error.message);
  }

  return data ?? [];
}
