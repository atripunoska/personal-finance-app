import { NextResponse } from 'next/server';
import { getDB } from '@/lib/db';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ potId: string }> }
) {
  try {
    const { potId } = await params;
    const { amount } = await request.json();
    const sql = await getDB();

    const result = await sql`
      UPDATE pots
      SET total = total - ${amount}
      WHERE name = ${potId}
      RETURNING *
    `;

    return NextResponse.json({ success: true, data: result[0] });
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { error: 'Failed to withdraw amount from pot' },
      { status: 500 }
    );
  }
}
