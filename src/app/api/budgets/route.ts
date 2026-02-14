import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getDB } from '@/lib/db';

// GET all budgets
export async function GET() {
  try {
    const sql = await getDB();
    const budgets = await sql`SELECT * FROM budgets`;
    return NextResponse.json(budgets);
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch budgets' },
      { status: 500 }
    );
  }
}

// POST - Create new budget
export async function POST(request: Request) {
  try {
    const { category, maximum, theme } = await request.json();
    const sql = await getDB();

    const result = await sql`
      INSERT INTO budgets (category, maximum, theme)
      VALUES (${category}, ${maximum}, ${theme})
      RETURNING *
    `;

    revalidatePath('/dashboard/budgets');
    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { error: 'Failed to create budget' },
      { status: 500 }
    );
  }
}

// DELETE - Delete a budget
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    if (!category) {
      return NextResponse.json(
        { error: 'Category parameter is required' },
        { status: 400 }
      );
    }

    const sql = await getDB();
    const result = await sql`DELETE FROM budgets WHERE category = ${category}`;

    revalidatePath('/dashboard/budgets');
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { error: 'Failed to delete budget' },
      { status: 500 }
    );
  }
}

// PUT - Update a budget
export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const originalCategory = searchParams.get('category');

    if (!originalCategory) {
      return NextResponse.json(
        { error: 'Category parameter is required' },
        { status: 400 }
      );
    }

    const { category, maximum, theme } = await request.json();
    const sql = await getDB();

    const result = await sql`
      UPDATE budgets
      SET category = ${category}, maximum = ${maximum}, theme = ${theme}
      WHERE category = ${originalCategory}
      RETURNING *
    `;

    revalidatePath('/dashboard/budgets');
    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { error: 'Failed to update budget' },
      { status: 500 }
    );
  }
}
