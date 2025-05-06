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
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const state = searchParams.get("state")?.split(",") || [];
    const facility = searchParams.get("facility")?.split(",") || [];
    const status = searchParams.get("status")?.split(",") || [];
    const splitMedicaidPending =
      searchParams.get("splitMedicaidPending") === "true";

    // Adjust this to your actual stored procedure or query
    const result = await pool.query(
      "SELECT placeholder FROM placeholder($1, $2)",
      [startDate, endDate]
    );

    return NextResponse.json({
      totalOccupancy: result.rows[0].occupancy_percentage,
    });
  } catch (error) {
    console.error("Error fetching occupancy:", error);
    return NextResponse.json(
      { error: "Failed to fetch occupancy data" },
      { status: 500 }
    );
  }
}
