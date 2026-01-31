import { NextResponse } from 'next/server';
import { getDB } from '@/lib/db';

export async function GET() {
  try {
    const sql = await getDB();
    const themes = await sql`SELECT DISTINCT theme FROM budgets`;
    return NextResponse.json(themes);
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch themes' },
      { status: 500 }
    );
  }
}
