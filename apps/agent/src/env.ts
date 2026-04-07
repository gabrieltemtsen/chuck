import { z } from "zod";

const Env = z.object({
  DATABASE_URL: z.string().url(),

  // X API keys (app + user)
  X_API_KEY: z.string().min(1),
  X_API_KEY_SECRET: z.string().min(1),
  X_ACCESS_TOKEN: z.string().min(1),
  X_ACCESS_TOKEN_SECRET: z.string().min(1),

  // Behavior
  X_DRY_RUN: z.string().optional(),
  SEED_POST_ON_BOOT: z.string().optional(),
});

export function getEnv() {
  const parsed = Env.safeParse(process.env);
  if (!parsed.success) {
    // eslint-disable-next-line no-console
    console.error("Invalid env", parsed.error.flatten().fieldErrors);
    throw new Error("Invalid environment variables");
  }
  return {
    ...parsed.data,
    X_DRY_RUN: parsed.data.X_DRY_RUN === "true" || parsed.data.X_DRY_RUN === "1",
    SEED_POST_ON_BOOT: parsed.data.SEED_POST_ON_BOOT === "true" || parsed.data.SEED_POST_ON_BOOT === "1",
  };
}
