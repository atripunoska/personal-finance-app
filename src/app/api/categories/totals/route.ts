import { NextResponse } from 'next/server';
import { getDB } from '@/lib/db';

// GET total amounts by category
export async function GET() {
  try {
    const sql = await getDB();
    const categoryTotals =
      await sql`SELECT category, COALESCE(SUM(amount), 0) AS total_amount FROM transactions GROUP BY category`;
    return NextResponse.json(categoryTotals);
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch category totals' },
      { status: 500 }
    );
  }
}
