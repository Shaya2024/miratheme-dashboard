import { NextResponse } from "next/server";
import { Pool } from "pg";

// You must set this in your .env.local file
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

export async function GET() {
  try {
    // Adjust this to your actual stored procedure or query
    const result = await pool.query(
      "select * from stern_portfolio_location_info"
    );

    // Assuming the procedure returns one row with one column
    const averageCensus = result.rows[0]?.average_census;

    return NextResponse.json({ averageCensus });
  } catch (error) {
    console.error("Error fetching average census:", error);
    return NextResponse.json(
      { error: "Failed to fetch average census" },
      { status: 500 }
    );
  }
}
