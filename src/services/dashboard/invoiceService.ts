"use client";

import {supabase}  from "@/lib/supabaseClient";
import { AccountsReceivableWithCustomer } from "@/app/types/Common";


export const fetchInvoices = {

  fetchInvoicesWithCustomer: async(): Promise<AccountsReceivableWithCustomer[]> => {
    const { data, error } = await supabase
    .from('accounts_receivable_with_customer')
    .select(`*`);

    if (error) {
      console.error("Error fetching invoices with customer:", error);
      throw new Error(error.message);
    }


    return data ?? [];

  },


}
