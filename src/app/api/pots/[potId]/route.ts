import { NextResponse } from 'next/server';
import { getDB } from '@/lib/db';

// GET specific pot
export async function GET(
  request: Request,
  { params }: { params: Promise<{ potId: string }> }
) {
  try {
    const { potId } = await params;
    const sql = await getDB();
    const result = await sql`SELECT * FROM pots WHERE name = ${potId}`;

    if (result.length === 0) {
      return NextResponse.json({ error: 'Pot not found' }, { status: 404 });
    }

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json({ error: 'Failed to fetch pot' }, { status: 500 });
  }
}

// PATCH - Update pot
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ potId: string }> }
) {
  try {
    const { potId } = await params;
    const { name, target, theme } = await request.json();
    const sql = await getDB();

    const result = await sql`
      UPDATE pots
      SET name = ${name}, target = ${target}, theme = ${theme}
      WHERE name = ${potId}
      RETURNING *
    `;

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { error: 'Failed to update pot' },
      { status: 500 }
    );
  }
}

// DELETE pot
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ potId: string }> }
) {
  try {
    const { potId } = await params;
    const sql = await getDB();
    await sql`DELETE FROM pots WHERE name = ${potId}`;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { error: 'Failed to delete pot' },
      { status: 500 }
    );
  }
}
