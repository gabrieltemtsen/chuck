import { ensureSettings, listQueuedPosts, logAction, markPostFailed, markPostSent } from "@chuck/db";
import { postTweet } from "./x.js";

export async function runAutopilotTick() {
  const settings = await ensureSettings();
  if (settings.autopilotState === "paused") {
    await logAction({ type: "system", status: "skipped", message: "Autopilot paused" });
    return;
  }

  const queued = await listQueuedPosts(new Date());
  if (queued.length === 0) return;

  for (const p of queued) {
    try {
      const r = await postTweet(p.text);
      if (r.dryRun) {
        await logAction({
          type: "x_post",
          status: "skipped",
          message: "X_DRY_RUN enabled: scheduled post skipped",
          meta: { postId: p.id, scheduledAt: p.scheduledAt.toISOString(), text: p.text },
        });
        // Mark as sent to avoid infinite queue in dry-run. We still set a synthetic id.
        await markPostSent(p.id, "dry_run");
        continue;
      }
      await markPostSent(p.id, r.id);
      await logAction({
        type: "x_post",
        status: "success",
        message: `Scheduled post sent: ${r.id}`,
        meta: { postId: p.id, scheduledAt: p.scheduledAt.toISOString(), text: p.text },
      });
    } catch (e) {
      await markPostFailed(p.id, String(e));
      await logAction({
        type: "x_post",
        status: "error",
        message: "Scheduled post failed",
        meta: { postId: p.id, error: String(e) },
      });
    }
  }
}
