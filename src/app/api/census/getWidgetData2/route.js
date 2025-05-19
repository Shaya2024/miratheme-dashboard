import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: { rejectUnauthorized: false },
});

function parseMDYY(str) {
  const [month, day, year] = str.split("/");
  return new Date(2000 + Number(year), Number(month) - 1, Number(day));
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const rawQuery = searchParams.get("selectCommand");

    const allowed = [
      "SELECT * FROM funccensus_payorarry",
      "SELECT occupancypct from funcoccupancy_payorarry",
      "SELECT * FROM payorpie_new",
      "SELECT * FROM censustrend_payorarry",
      "SELECT * FROM bar_census",
      "SELECT * FROM total_hours",
      "SELECT * FROM total_hours_worked",
      "SELECT * FROM total_rn_hours_worked",
      "SELECT * FROM total_nursing_hours_worked",
    ];

    if (!allowed.includes(rawQuery)) {
      return NextResponse.json({ error: "Invalid procedure" }, { status: 400 });
    }

    // remove selectCommand from params
    const dynamicParams = {};
    for (const [key, value] of searchParams.entries()) {
      if (key === "selectCommand") continue;

      // Parse payors as JSON
      if (key === "payors") {
        dynamicParams[key] = JSON.parse(value);
      }
      // Parse startDate / endDate
      else if (key === "startDate" || key === "endDate") {
        dynamicParams[key] = parseMDYY(value);
      }
      // Convert numbers to int
      else if (!isNaN(value) && value.trim() !== "") {
        dynamicParams[key] = Number(value);
      }
      // Else, leave as string
      else {
        dynamicParams[key] = value;
      }
    }

    const values = Object.values(dynamicParams);
    const placeholders = values.map((_, i) => `$${i + 1}`).join(", ");
    const sql = `${rawQuery}(${placeholders})`;

    const result = await pool.query(sql, values);

    console.log("Executing:", sql, values);

    return NextResponse.json({ result: result.rows });
  } catch (err) {
    console.error("Error fetching widget data:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
