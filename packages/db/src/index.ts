import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient | null = null;

export function getPrisma() {
  if (!prisma) prisma = new PrismaClient();
  return prisma;
}

export async function ensureSettings() {
  const db = getPrisma();
  const existing = await db.settings.findUnique({ where: { id: "singleton" } });
  if (existing) return existing;
  return db.settings.create({ data: { id: "singleton" } });
}

export async function logAction(args: {
  type: "x_post" | "x_reply" | "opportunity_found" | "trade_paper_open" | "trade_paper_close" | "system";
  status: "success" | "error" | "skipped";
  message: string;
  meta?: Record<string, unknown>;
}) {
  const db = getPrisma();
  return db.actionLog.create({
    data: {
      type: args.type as any,
      status: args.status as any,
      message: args.message,
      meta: args.meta as any,
    },
  });
}
