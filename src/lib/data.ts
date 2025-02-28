import { createClient } from "@/utils/supabase/client";

const supabase = createClient();
export async function fetchPages() {
  try {
    const { data, error } = await supabase.from("pages").select("*");

    if (error) throw error;

    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}

export async function fetchBudgets() {
  try {
    const { data, error } = await supabase.from("budgets").select("*");

    if (error) throw error;

    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}

export async function fetchBalance() {
  try {
    const { data, error } = await supabase.from("balance").select("*");

    if (error) throw error;

    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}

export async function fetchTransactions() {
  try {
    const { data, error } = await supabase.from("transactions").select("*");

    if (error) throw error;

    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}
