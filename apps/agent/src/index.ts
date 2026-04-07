import { ensureSettings, enqueuePost, logAction } from "@chuck/db";
import { getEnv } from "./env";
import { runAutopilotTick } from "./autopilot";

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  const env = getEnv();
  await ensureSettings();

  // Seed one queued post on boot (MVP) if requested.
  if (process.env.SEED_POST_ON_BOOT === "true") {
    const when = new Date(Date.now() + 5_000);
    const text = `Chuck autopilot seed post (${new Date().toISOString()})`;
    await enqueuePost({ scheduledAt: when, text });
    await logAction({ type: "system", status: "success", message: "Seeded a queued post", meta: { when: when.toISOString() } });
  }

  await logAction({
    type: "system",
    status: "success",
    message: `Agent started (X_DRY_RUN=${env.X_DRY_RUN ? "true" : "false"})`,
  });

  // Main loop (MVP): run every 15 seconds
  // Later: split into loops + add jitter + backoff.
  while (true) {
    try {
      await runAutopilotTick();
    } catch (e) {
      await logAction({ type: "system", status: "error", message: "Autopilot tick crashed", meta: { error: String(e) } });
    }
    await sleep(15_000);
  }
}

main().catch((e) => {
  // eslint-disable-next-line no-console
  console.error(e);
  process.exit(1);
});
