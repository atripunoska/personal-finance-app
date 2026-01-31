import { NextResponse } from 'next/server';
import { getDB } from '@/lib/db';

export async function POST(
  request: Request,
  { params }: { params: { potId: string } }
) {
  try {
    const { amount } = await request.json();
    const sql = await getDB();

    const result = await sql`
      UPDATE pots
      SET total = total + ${amount}
      WHERE name = ${params.potId}
      RETURNING *
    `;

    return NextResponse.json({ success: true, data: result[0] });
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { error: 'Failed to add amount to pot' },
      { status: 500 }
    );
  }
}
