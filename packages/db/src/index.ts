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

export async function enqueuePost(args: { scheduledAt: Date; text: string }) {
  const db = getPrisma();
  return db.post.create({ data: { scheduledAt: args.scheduledAt, text: args.text } });
}

export async function listQueuedPosts(now = new Date()) {
  const db = getPrisma();
  return db.post.findMany({
    where: { status: "queued", scheduledAt: { lte: now } },
    orderBy: { scheduledAt: "asc" },
    take: 5,
  });
}

export async function markPostSent(id: string, xTweetId: string) {
  const db = getPrisma();
  return db.post.update({ where: { id }, data: { status: "sent", xTweetId } });
}

export async function markPostFailed(id: string, err: string) {
  const db = getPrisma();
  return db.post.update({ where: { id }, data: { status: "failed", lastError: err } });
}
