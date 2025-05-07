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
    const facility = searchParams.get("facility");
    const residentStatusPaid = searchParams.get("residentStatusPaid");
    const residentStatusUnpaid = searchParams.get("residentStatusUnpaid");
    const splitMedicaidPending = searchParams.get("splitMedicaidPending");
    const state = searchParams.get("state")?.split(",") || [];

    // Adjust this to your actual stored procedure or query
    const result = await pool.query(
      "SELECT cnt from funcCensus($1, $2, $3, $4, $5, $6, $7)",
      [
        startDate,
        endDate,
        facility,
        residentStatusPaid,
        residentStatusUnpaid,
        splitMedicaidPending,
        state,
      ]
    );

    return NextResponse.json({ averageCensus: result.rows[0].cnt });
  } catch (error) {
    console.error("Error fetching census:", error);
    return NextResponse.json(
      { error: "Failed to fetch census" },
      { status: 500 }
    );
  }
}
