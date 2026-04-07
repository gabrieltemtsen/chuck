import { NextResponse } from "next/server";
import { getPrisma } from "@chuck/db";

export async function GET() {
  const db = getPrisma();
  const rows = await db.post.findMany({ orderBy: { scheduledAt: "desc" }, take: 50 });
  return NextResponse.json({ rows });
}
