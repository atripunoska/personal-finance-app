import { createClient } from "@/utils/supabase/client";
import { time } from "console";

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

export async function fetchRecurringBillCategories() {
  try {
    const { data, error } = await supabase
      .from("transactions")
      .select("category")
      .eq("recurring", true)
      .select("category");

    if (error) throw error;

    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch recurring bill categories.");
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

export async function fetchTotalBills() {
  try {
    const data = await supabase.from("transactions").select("amount");

    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch recurring data.");
  }
}

export async function fetchTotalAmountByCategory() {
  try {
    const { data, error } = await supabase
      .from("transactions")
      .select("category, amount")
      .eq("recurring", true);

    if (error) throw error;

    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total amount by category.");
  }
}

export async function getPaymentsDueSoon() {
  try {
    // Step 1: Get the latest overall transaction date
    const { data: latestTransaction, error: latestError } = await supabase
      .from("transactions")
      .select("date")
      .order("date", { ascending: false })
      .limit(1)
      .single();

    if (latestError) throw latestError;

    const latestDate = new Date(latestTransaction.date);

    // Step 2: Get recurring transactions for August 2024 that are not paid yet
    const { data: recurringTransactions, error: recurringError } =
      await supabase
        .from("transactions")
        .select("*")
        .eq("recurring", true)
        .gte("date", "2024-08-01")
        .lte("date", "2024-08-31");

    if (recurringError) throw recurringError;

    // Step 3: Filter transactions due within five days of the latest transaction date
    const dueSoonTransactions = recurringTransactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      console.log(transactionDate, "transactionDate");
      const timeDiff = Math.abs(
        transactionDate.getTime() - latestDate.getTime()
      );

      const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
      console.log(dayDiff, "dayDiff");
      return dayDiff <= 15;
    });
    console.log(dueSoonTransactions, "xxxxx");

    return dueSoonTransactions;
  } catch (error) {
    console.error("Error fetching payments due soon:", error);
    throw error;
  }
}

export async function addAmountToPot(amount: number, pot_id: string) {
  try {
    const { data, error } = await supabase.rpc("add_amount_to_pot1", {
      pot_name: pot_id,
      total: amount,
    });

    if (error) throw error;

    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to add amount to pot.");
  }
}

export async function addNewPot(name: string, theme: string, target: number) {
  try {
    const { data, error } = await supabase
      .from("pots")
      .insert([{ name, theme, target, total: 0 }]);

    if (error) throw error;

    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to add new pot.");
  }
}
