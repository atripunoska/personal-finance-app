import { getDB } from '@/lib/db';
import { Pot } from '@/lib/definitions';

export async function fetchPages() {
  try {
    const sql = await getDB();
    const data = await sql`SELECT * FROM pages`;
    return data as Record<string, unknown>[];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch pages data.');
  }
}

// OVERVIEW PAGE

export async function fetchBalance() {
  try {
    const sql = await getDB();
    const data = await sql`SELECT * FROM balance`;

    return data as Record<string, unknown>[];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

// BUDGETS

export async function fetchBudgets() {
  try {
    const sql = await getDB();
    const data = await sql`SELECT * FROM budgets`;

    return data as Record<string, unknown>[];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function deleteBudget(category: string) {
  try {
    const sql = await getDB();
    const data = await sql`DELETE FROM budgets WHERE category = ${category}`;

    return data as Record<string, unknown>[];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to delete budget.');
  }
}

export async function updateBudget(
  category: string,
  updates: { category: string; maximum: number; theme: string }
) {
  try {
    const sql = await getDB();
    const data =
      await sql`UPDATE budgets SET category = ${updates.category}, maximum = ${updates.maximum}, theme = ${updates.theme} WHERE category = ${category}`;

    return data as Record<string, unknown>[];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to update budget.');
  }
}
export async function addNewBudget(
  category: string,
  maximum: number,
  theme: string
) {
  try {
    const sql = await getDB();
    const data =
      await sql`INSERT INTO budgets (category, maximum, theme) VALUES (${category}, ${maximum}, ${theme})`;

    return data as Record<string, unknown>[];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to add new budget.');
  }
}

export async function fetchTransactions() {
  try {
    const sql = await getDB();
    const data = await sql`SELECT * FROM transactions`;

    return data as Record<string, unknown>[];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

const ITEMS_PER_PAGE = 10;
export async function fetchFilteredTransactions(
  query: string,
  currentPage: number,
  category: string,
  sort: string
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const sql = await getDB();
    // Build WHERE clause
    let whereClause = sql`name ILIKE ${'%' + query + '%'}`;

    if (category) {
      whereClause = sql`${whereClause} AND category ILIKE ${'%' + category + '%'}`;
    }

    // Build ORDER BY clause
    let orderBy = 'date DESC'; // default to 'latest'

    if (sort === 'oldest') {
      orderBy = 'date ASC';
    } else if (sort === 'a-to-z') {
      orderBy = 'name ASC';
    } else if (sort === 'z-to-a') {
      orderBy = 'name DESC';
    } else if (sort === 'highest') {
      orderBy = 'amount DESC';
    } else if (sort === 'lowest') {
      orderBy = 'amount ASC';
    }

    // Execute the query with dynamic conditions
    const data = await sql`
      SELECT * FROM transactions
      WHERE ${whereClause}
      ORDER BY ${sql([orderBy])}
      LIMIT ${ITEMS_PER_PAGE}
      OFFSET ${offset}
    `;

    return { data };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch transactions data.');
  }
}

export async function fetchCategories() {
  try {
    const sql = await getDB();
    const data = await sql`SELECT category, amount FROM transactions`;

    return data as Record<string, unknown>[];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchTransactionsByCategory(query: string) {
  try {
    const sql = await getDB();
    const data =
      await sql`SELECT * FROM transactions WHERE category ILIKE ${`%${query}%`} ORDER BY date DESC LIMIT 3`;

    return data as Record<string, unknown>[];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch categories data.');
  }
}

export async function fetchTransactionsPages(query: string) {
  try {
    const sql = await getDB();
    const data =
      await sql`SELECT COUNT(*) FROM transactions WHERE name ILIKE ${`%${query}%`}`;

    const totalPages = Math.ceil(Number(data[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of transactions data.');
  }
}

export async function fetchUniqueTransactions() {
  try {
    const sql = await getDB();
    const data = await sql`SELECT DISTINCT category FROM transactions`;

    return data as Record<string, unknown>[];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

//RECURRING BILLS

export async function fetchRecurringBills() {
  try {
    const sql = await getDB();
    const data = await sql`SELECT * FROM transactions WHERE recurring = true`;

    return data as Record<string, unknown>[];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch recurring data.');
  }
}

export async function fetchTotalAmountByCategory() {
  try {
    const sql = await getDB();
    const data =
      await sql`SELECT category, SUM(amount) AS total_amount FROM transactions WHERE date >= '2024-08-01' AND date <= '2024-08-31' GROUP BY category`;

    return data as Record<string, unknown>[];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total amount by category.');
  }
}

export async function getLatestTransaction() {
  try {
    const sql = await getDB();
    const latestTransaction =
      await sql`SELECT date FROM transactions ORDER BY date DESC LIMIT 1`;

    return [...latestTransaction];
  } catch (error) {
    console.error('Error fetching payments due soon:', error);
    throw error;
  }
}

// POTS

export async function addAmountToPot(pot_id: string, amount: number) {
  try {
    const sql = await getDB();
    const data = await sql`SELECT add_amount_to_pot(${pot_id}, ${amount})`;

    return data as Record<string, unknown>[];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to add amount to pot.');
  }
}

export async function withdrawAmountFromPot(potId: string, amount: number) {
  try {
    const sql = await getDB();
    const data =
      await sql`SELECT withdraw_amount_from_pot(${potId}, ${amount})`;

    return data as Record<string, unknown>[];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to withdraw amount from pot.');
  }
}

export async function addNewPot(name: string, theme: string, target: number) {
  try {
    const sql = await getDB();
    const data =
      await sql`INSERT INTO pots (name, theme, target, total) VALUES (${name}, ${theme}, ${target}, 0) RETURNING *`;

    return data as Record<string, unknown>[];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to add new pot.');
  }
}

export async function deletePot(name: string) {
  try {
    const sql = await getDB();
    const data = await sql`DELETE FROM pots WHERE name = ${name}`;

    return data as Record<string, unknown>[];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to add new pot.');
  }
}

export async function updatePot(
  potId: string,
  updates: { name: string; target: number; theme: string }
) {
  try {
    const sql = await getDB();
    const data =
      await sql`UPDATE pots SET name = ${updates.name}, target = ${updates.target}, theme = ${updates.theme} WHERE name = ${potId}`;

    return data as Record<string, unknown>[];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to update pot.');
  }
}

export async function fetchThemes() {
  try {
    const sql = await getDB();
    const data = await sql`SELECT DISTINCT theme FROM pots`;

    return data as Record<string, unknown>[];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch themes.');
  }
}

// Client-side fetch for pots
export async function fetchPotsClient(): Promise<Pot[]> {
  const response = await fetch('/api/pots');
  if (!response.ok) throw new Error('Failed to fetch pots');
  return response.json();
}
