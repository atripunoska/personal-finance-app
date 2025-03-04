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

const ITEMS_PER_PAGE = 10;
export async function fetchFilteredTransactions(
  query: string,
  currentPage: number
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const transactions = await supabase
      .from("transactions")
      .select("*")
      .ilike("name", `%${query}%`)
      .range(offset, offset + ITEMS_PER_PAGE - 1);

    //,category.in.(${category.join(",")})`);
    //  .range(offset, offset + ITEMS_PER_PAGE - 1);
    console.log(transactions);
    return transactions;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch transactions data.");
  }
}

export async function fetchCategories() {
  try {
    const data = await supabase.from("categories").select("*");

    console.log(data, "data");
    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}

export async function fetchTransactionsPages(query: string) {
  try {
    const data = await supabase
      .from("transactions")
      .select("*", { count: "exact", head: true })
      .ilike("name", `%${query}%`);

    const totalPages = Math.ceil(Number(data.count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of transactions data.");
  }
}

export async function fetchUniqueTransactions() {
  try {
    const { data, error } = await supabase
      .from("transactions")
      .select("category");

    if (error) throw error;

    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}

export async function fetchPots() {
  try {
    const { data, error } = await supabase.from("pots").select("*");

    if (error) throw error;

    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}

export async function fetchRecurringBills() {
  try {
    const data = await supabase
      .from("transactions")
      .select("*")
      .eq("recurring", "TRUE");
    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch recurring data.");
  }
}
