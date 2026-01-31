import { NextResponse } from 'next/server';
import { getDB } from '@/lib/db';

// GET all pots
export async function GET() {
  try {
    const sql = await getDB();
    const pots = await sql`SELECT * FROM pots`;
    return NextResponse.json(pots);
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch pots' },
      { status: 500 }
    );
  }
}

// POST - Create new pot
export async function POST(request: Request) {
  try {
    const { name, theme, target } = await request.json();
    const sql = await getDB();

    const result = await sql`
      INSERT INTO pots (name, theme, target, total) 
      VALUES (${name}, ${theme}, ${target}, 0) 
      RETURNING *
    `;

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { error: 'Failed to create pot' },
      { status: 500 }
    );
  }
}
