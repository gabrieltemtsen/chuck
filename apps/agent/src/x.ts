import { TwitterApi } from "twitter-api-v2";
import { getEnv } from "./env.js";

export function getXClient() {
  const env = getEnv();
  return new TwitterApi({
    appKey: env.X_API_KEY,
    appSecret: env.X_API_KEY_SECRET,
    accessToken: env.X_ACCESS_TOKEN,
    accessSecret: env.X_ACCESS_TOKEN_SECRET,
  });
}

export async function postTweet(text: string) {
  const env = getEnv();
  if (env.X_DRY_RUN) {
    return { dryRun: true, id: "dry_run", text };
  }

  const client = getXClient();
  const res = await client.v2.tweet(text);
  return { dryRun: false, id: res.data.id, text: res.data.text };
}
