import { NextResponse } from 'next/server';
import { getDB } from '@/lib/db';

const ITEMS_PER_PAGE = 10;

// GET transactions with multiple query options
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const recurring = searchParams.get('recurring');
    const latest = searchParams.get('latest');
    const query = searchParams.get('query') || '';
    const page = searchParams.get('page') || '1';
    const sort = searchParams.get('sort') || 'latest';
    const filtered = searchParams.get('filtered');

    const sql = await getDB();

    // Get recurring bills
    if (recurring === 'true') {
      const transactions =
        await sql`SELECT * FROM transactions WHERE recurring = true`;
      return NextResponse.json({ data: transactions, error: null });
    }

    // Get latest transaction
    if (latest === 'true') {
      const latestTransaction =
        await sql`SELECT date FROM transactions ORDER BY date DESC LIMIT 1`;
      return NextResponse.json(
        latestTransaction[0] || { date: new Date().toISOString() }
      );
    }

    // Get filtered/paginated transactions
    if (filtered === 'true') {
      const currentPage = Number(page);
      const offset = (currentPage - 1) * ITEMS_PER_PAGE;

      // Build ORDER BY clause
      let orderBy = 'date DESC';
      switch (sort) {
        case 'latest':
          orderBy = 'date DESC';
          break;
        case 'oldest':
          orderBy = 'date ASC';
          break;
        case 'a-to-z':
          orderBy = 'name ASC';
          break;
        case 'z-to-a':
          orderBy = 'name DESC';
          break;
        case 'highest':
          orderBy = 'amount DESC';
          break;
        case 'lowest':
          orderBy = 'amount ASC';
          break;
      }

      // Build WHERE conditions
      const namePattern = `%${query}%`;
      const categoryPattern = `%${category}%`;

      let transactions;
      if (category && category !== 'all' && category !== '') {
        transactions = await sql`
          SELECT * FROM transactions
          WHERE name ILIKE ${namePattern} AND category ILIKE ${categoryPattern}
          ORDER BY ${sql.unsafe(orderBy)}
          LIMIT ${ITEMS_PER_PAGE}
          OFFSET ${offset}
        `;
      } else {
        transactions = await sql`
          SELECT * FROM transactions
          WHERE name ILIKE ${namePattern}
          ORDER BY ${sql.unsafe(orderBy)}
          LIMIT ${ITEMS_PER_PAGE}
          OFFSET ${offset}
        `;
      }

      return NextResponse.json({ data: transactions, error: null });
    }

    // Get transactions by category (for budget cards)
    if (category) {
      const categoryPattern = `%${category}%`;
      const transactions =
        await sql`SELECT * FROM transactions WHERE category ILIKE ${categoryPattern} ORDER BY date DESC LIMIT 3`;
      return NextResponse.json({ data: transactions, error: null });
    }

    // Get all transactions (default)
    const transactions = await sql`SELECT * FROM transactions`;
    return NextResponse.json(transactions);
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { data: [], error: 'Failed to fetch transactions' },
      { status: 500 }
    );
  }
}
