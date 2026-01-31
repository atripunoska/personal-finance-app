import { NextResponse } from 'next/server';
import { getDB } from '@/lib/db';

// GET all pages
export async function GET() {
  try {
    const sql = await getDB();
    const pages = await sql`SELECT * FROM pages`;
    return NextResponse.json(pages);
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch pages' },
      { status: 500 }
    );
  }
}
