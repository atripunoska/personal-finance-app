import { NextResponse } from 'next/server';
import { getDB } from '@/lib/db';

// GET all categories
export async function GET() {
  try {
    const sql = await getDB();
    const categories = await sql`SELECT category, amount FROM transactions`;
    return NextResponse.json({ data: categories, error: null });
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { data: [], error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}
