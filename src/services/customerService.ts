import { supabase } from "@/lib/supabase/supabaseClient";
import { Customer } from "@/app/types/Common";

export const customerService = {

  async getAll(): Promise<Customer[]> {

    const { data, error } = await supabase
      .from("customers")
      .select("*")
      .order("customer_name", { ascending: true });

    if (error) {
      console.error("Error fetching customers:", error);
      throw new Error(error.message);
    }

    return data as Customer[];
  },

  async updateStatus(customerId: number, isActive: boolean): Promise<void> {

    const { error } = await supabase
      .from("customers")
      .update({ is_active: isActive })
      .eq("customer_id", customerId);

    if (error) {
      console.error("Error updating customer status:", error);
      throw new Error(error.message);
    }
  },
};
