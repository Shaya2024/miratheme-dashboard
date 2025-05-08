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
  function parseMDYY(str) {
    const [month, day, year] = str.split("/");
    return new Date(`20${year}`, month - 1, day); // 2-digit year → 20xx
  }

  try {
    const { searchParams } = new URL(req.url);
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const facility = searchParams.get("facility");
    const residentStatusPaid = searchParams.get("residentStatusPaid");
    const residentStatusUnpaid = searchParams.get("residentStatusUnpaid");
    const payors = searchParams.get("payors");
    const splitMedicaidPending = searchParams.get("splitMedicaidPending");
    const state = searchParams.get("state") || "All";

    // Adjust this to your actual stored procedure or query
    const result = await pool.query(
      "SELECT *from payorpie($1, $2, $3, $4, $5,yes $6, $7, $8)",
      [
        startDate,
        endDate,
        facility,
        residentStatusPaid,
        residentStatusUnpaid,
        payors,
        splitMedicaidPending,
        state,
      ]
    );

    console.log(
      `result.rows for Payor Distribution: ${JSON.stringify(result.rows)}`
    );

    return NextResponse.json({ result: result.rows });
  } catch (error) {
    console.error("Error fetching census:", error);
    return NextResponse.json(
      { error: "Failed to fetch census" },
      { status: 500 }
    );
  }
}
