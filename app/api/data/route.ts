import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    // Query to get foster care data by state
    // Adjust table name and column names based on your actual Supabase schema
    const result = await pool.query(`
      SELECT 
        state,
        children_count,
        year,
        state_abbr
      FROM foster_care_data
      ORDER BY children_count DESC
    `);

    const total = result.rows.reduce((sum, row) => sum + (row.children_count || 0), 0);

    return NextResponse.json({
      states: result.rows,
      total: total,
      lastUpdated: new Date().toISOString()
    });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch foster care data', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
