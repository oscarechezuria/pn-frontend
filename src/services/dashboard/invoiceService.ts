"use client";

import {supabase}  from "@/lib/supabaseClient";
import { Invoice } from "@/app/types/Common";


export async function fetchInvoices(): Promise<Invoice[]> {
  const { data, error } = await supabase
    .from("accounts_receivable")
    .select("*")
    .eq("is_active", true);
    

  if (error) {
    console.error("Error fetching facturas:", error);
    throw new Error(error.message);
  }

  console.log("Fetched facturas:", data);

  return data ?? [];
}
