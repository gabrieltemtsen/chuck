export const dynamic = "force-dynamic";

async function getActions() {
  const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/actions` : "http://localhost:3000/api/actions", { cache: "no-store" });
  if (!res.ok) return { rows: [] };
  return res.json();
}

export default async function ActionsPage() {
  const data = await getActions();
  return (
    <main style={{ padding: 24 }}>
      <h1 style={{ fontSize: 28, marginBottom: 10 }}>Action Log</h1>
      <p style={{ opacity: 0.75, marginTop: 0 }}>Latest 50 actions from the agent.</p>
      <div style={{ marginTop: 14, display: "grid", gap: 10 }}>
        {(data.rows ?? []).map((r: any) => (
          <div key={r.id} style={{ border: "1px solid #e5e7eb", borderRadius: 12, padding: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
              <div style={{ fontWeight: 700 }}>{r.type} · {r.status}</div>
              <div style={{ opacity: 0.7, fontFamily: "ui-monospace" }}>{new Date(r.createdAt).toLocaleString()}</div>
            </div>
            <div style={{ marginTop: 6 }}>{r.message}</div>
            {r.meta ? (
              <pre style={{ marginTop: 10, background: "#111827", color: "#e5e7eb", padding: 10, borderRadius: 10, overflow: "auto" }}>
                {JSON.stringify(r.meta, null, 2)}
              </pre>
            ) : null}
          </div>
        ))}
      </div>
    </main>
  );
}
