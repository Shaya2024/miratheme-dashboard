import { NextResponse } from "next/server";
import { Pool } from "pg";
import { queryRegistry } from "@/utils/queryRegistry";

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: { rejectUnauthorized: false },
});

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const rawQuery = searchParams.get("selectCommand");

    const meta = queryRegistry[rawQuery];
    if (!meta) {
      return NextResponse.json({ error: "Invalid procedure" }, { status: 400 });
    }

    const values = [];
    const placeholders = [];

    meta.args.forEach((param, index) => {
      const rawValue = searchParams.get(param);
      if (rawValue == null) {
        throw new Error(`Missing required param: ${param}`);
      }

      const isArray = meta.arrayParams?.includes(param);
      let parsed;

      if (isArray) {
        parsed = JSON.parse(rawValue); // must be stringified array in query
      } else if (param.toLowerCase().includes("date")) {
        parsed = new Date(rawValue).toISOString().split("T")[0]; // YYYY-MM-DD
      } else if (!isNaN(rawValue)) {
        parsed = Number(rawValue);
      } else {
        parsed = rawValue;
      }

      values.push(parsed);
      placeholders.push(`$${index + 1}`);
    });

    const sql = meta.sql(placeholders.join(", "));
    console.log("Executing SQL:", sql, values);

    const result = await pool.query(sql, values);
    console.log(`Result for ${sql}:`, JSON.stringify(result.rows));
    return NextResponse.json({ result: result.rows });
  } catch (err) {
    console.error("Error fetching widget data:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
