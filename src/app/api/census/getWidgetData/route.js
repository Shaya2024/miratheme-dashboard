import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: { rejectUnauthorized: false },
});

function parseMDYY(str) {
  const [month, day, year] = str.split("/");
  return new Date(20 + year, month - 1, day); // Converts MM/DD/YY to Date
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const rawQuery = searchParams.get("selectCommand");

    // Validate that the selectCommand string is in allowed formats
    const allowed = [
      "SELECT * FROM funccensus_payorarry",
      "SELECT occupancypct from funcoccupancy_payorarry",
      "SELECT * FROM payorpie_new",
      "SELECT * from censustrend_payorarry",
      "SELECT * from bar_census",
    ];

    if (!allowed.includes(rawQuery)) {
      return NextResponse.json({ error: "Invalid procedure" }, { status: 400 });
    }

    const isPayorPie = rawQuery.includes("payorpie_new");

    const startDate = parseMDYY(searchParams.get("startDate"));
    const endDate = parseMDYY(searchParams.get("endDate"));
    const facility = searchParams.get("facility");
    const residentStatusPaid = searchParams.get("residentStatusPaid");
    const residentStatusUnpaid = searchParams.get("residentStatusUnpaid");
    const payors = JSON.parse(searchParams.get("payors") || "[]");

    const splitMedicaidPending = searchParams.get("splitMedicaidPending");
    const state = searchParams.get("state");

    console.log(
      `payors: ${JSON.stringify(payors)} and isPayorPie: ${isPayorPie}`
    );

    // Build values array — omit 'payors' only for payorpie
    const values = isPayorPie
      ? [
          startDate,
          endDate,
          facility,
          residentStatusPaid,
          residentStatusUnpaid,
          splitMedicaidPending,
          state,
        ]
      : [
          startDate,
          endDate,
          facility,
          residentStatusPaid,
          residentStatusUnpaid,
          payors,
          splitMedicaidPending,
          state,
        ];

    // Prepare dynamic parameter placeholders like $1, $2, ...
    const paramPlaceholders = values.map((_, i) => `$${i + 1}`).join(", ");
    const sql = `${rawQuery}(${paramPlaceholders})`;

    const result = await pool.query(sql, values);
    //  const result = await pool.query(`EXPLAIN ANALYZE ${sql}`, values);

    console.log(`
      raw query: ${rawQuery} and these are the result.rows for getWidgetData: ${JSON.stringify(
      result.rows
    )}
    `);
    return NextResponse.json({ result: result.rows });
    // return NextResponse.json({
    //   result: result.rows.map((r) => r["QUERY PLAN"]),
    // });
  } catch (err) {
    console.error("Error fetching widget data:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
