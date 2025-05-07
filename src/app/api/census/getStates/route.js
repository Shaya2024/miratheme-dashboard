import { NextResponse } from "next/server";
import { Pool } from "pg";

// You must set this in your .env.local file
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false, // for self-signed certs or Render/Heroku
  },
});

export async function GET() {
  try {
    const result = await pool.query(
      "select distinct state from stern_portfolio_location_info"
    );

    return NextResponse.json({
      result: result.rows.map((item) => item.state),
    });
  } catch (error) {
    console.error("Error fetching census:", error);
    return NextResponse.json(
      { error: "Failed to fetch census" },
      { status: 500 }
    );
  }
}
