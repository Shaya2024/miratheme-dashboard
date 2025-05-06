import { NextResponse } from "next/server";
import { Pool } from "pg";

// You must set this in your .env.local file
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false, // for self-signed certs or Render/Heroku
  },
});

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const state = searchParams.get("state")?.split(",") || [];
    const facility = searchParams.get("facility")?.split(",") || [];
    const status = searchParams.get("status")?.split(",") || [];
    const splitMedicaidPending =
      searchParams.get("splitMedicaidPending") === "true";

    // Adjust this to your actual stored procedure or query
    const result = await pool.query("SELECT cnt FROM testCensusFunc($1, $2)", [
      startDate,
      endDate,
    ]);
    console.log("Rows:", result.rows);

    return NextResponse.json({ averageCensus: result.rows[0].cnt });
  } catch (error) {
    console.error("Error fetching census:", error);
    return NextResponse.json(
      { error: "Failed to fetch census" },
      { status: 500 }
    );
  }
}
