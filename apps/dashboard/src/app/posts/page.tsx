export const dynamic = "force-dynamic";

async function getPosts() {
  const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const res = await fetch(`${base}/api/posts`, { cache: "no-store" });
  if (!res.ok) return { rows: [] };
  return res.json();
}

export default async function PostsPage() {
  const data = await getPosts();
  return (
    <main style={{ padding: 24 }}>
      <h1 style={{ fontSize: 28, marginBottom: 10 }}>Posts</h1>
      <p style={{ opacity: 0.75, marginTop: 0 }}>Scheduled/sent posts (latest 50).</p>

      <div style={{ marginTop: 14, display: "grid", gap: 10 }}>
        {(data.rows ?? []).map((p: any) => (
          <div key={p.id} style={{ border: "1px solid #e5e7eb", borderRadius: 12, padding: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
              <div style={{ fontWeight: 700 }}>{p.status}</div>
              <div style={{ opacity: 0.7, fontFamily: "ui-monospace" }}>{new Date(p.scheduledAt).toLocaleString()}</div>
            </div>
            <div style={{ marginTop: 8, whiteSpace: "pre-wrap" }}>{p.text}</div>
            {p.xTweetId ? <div style={{ marginTop: 8, opacity: 0.8 }}>xTweetId: <span style={{ fontFamily: "ui-monospace" }}>{p.xTweetId}</span></div> : null}
            {p.lastError ? (
              <pre style={{ marginTop: 10, background: "#7f1d1d", color: "#fee2e2", padding: 10, borderRadius: 10, overflow: "auto" }}>
                {p.lastError}
              </pre>
            ) : null}
          </div>
        ))}
      </div>
    </main>
  );
}
