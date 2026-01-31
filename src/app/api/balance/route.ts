import { NextResponse } from 'next/server';
import { getDB } from '@/lib/db';

// GET balance data
export async function GET() {
  try {
    const sql = await getDB();
    const balance = await sql`SELECT * FROM balance`;
    return NextResponse.json(balance);
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch balance data' },
      { status: 500 }
    );
  }
}
