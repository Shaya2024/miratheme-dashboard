import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const rawQuery = searchParams.get("selectCommand");

    const allowedQueries = {
      "SELECT DISTINCT state FROM stern_portfolio_location_info": (row) =>
        row.state,
      'SELECT DISTINCT "Facility Name" FROM stern_portfolio_location_info': (
        row
      ) => row["Facility Name"],
    };

    if (!allowedQueries[rawQuery]) {
      return NextResponse.json({ error: "Invalid query" }, { status: 400 });
    }

    const result = await pool.query(rawQuery);
    console.log(`result: ${JSON.stringify(result.rows)}`);
    const transformer = allowedQueries[rawQuery];

    return NextResponse.json({
      result: result.rows.map(transformer),
    });
  } catch (err) {
    console.error("Error in getFilterOptions:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
