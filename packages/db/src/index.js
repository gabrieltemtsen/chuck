import { PrismaClient } from "@prisma/client";
let prisma = null;
export function getPrisma() {
    if (!prisma)
        prisma = new PrismaClient();
    return prisma;
}
export async function ensureSettings() {
    const db = getPrisma();
    const existing = await db.settings.findUnique({ where: { id: "singleton" } });
    if (existing)
        return existing;
    return db.settings.create({ data: { id: "singleton" } });
}
export async function logAction(args) {
    const db = getPrisma();
    return db.actionLog.create({
        data: {
            type: args.type,
            status: args.status,
            message: args.message,
            meta: args.meta,
        },
    });
}
