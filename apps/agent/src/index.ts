import { ensureSettings, logAction } from "@chuck/db";
import { postTweet } from "./x";

async function main() {
  await ensureSettings();

  // Smoke test: post a dry-run tweet if configured
  const now = new Date().toISOString();
  const text = `Chuck ~ The Intersect booted (${now}).`;

  try {
    const r = await postTweet(text);
    await logAction({
      type: "x_post",
      status: r.dryRun ? "skipped" : "success",
      message: r.dryRun ? "X_DRY_RUN enabled: tweet skipped" : `Tweet posted: ${r.id}`,
      meta: { text },
    });
    // eslint-disable-next-line no-console
    console.log(r);
  } catch (e) {
    await logAction({
      type: "x_post",
      status: "error",
      message: "Failed to post tweet",
      meta: { error: String(e) },
    });
    throw e;
  }
}

main().catch((e) => {
  // eslint-disable-next-line no-console
  console.error(e);
  process.exit(1);
});
