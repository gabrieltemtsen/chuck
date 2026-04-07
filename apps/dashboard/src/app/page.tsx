export default function HomePage() {
  return (
    <main style={{ padding: 24 }}>
      <h1 style={{ fontSize: 32, marginBottom: 8 }}>Chuck ~ The Intersect</h1>
      <p style={{ opacity: 0.8, marginTop: 0 }}>
        Dashboard scaffold. Next: connect X, show posts/opportunities/trades.
      </p>

      <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12, marginTop: 20 }}>
        {[
          { title: "Autopilot", desc: "Posting scheduler + queue", href: "/posts" },
          { title: "Action Log", desc: "See what the agent is doing", href: "/actions" },
          { title: "Opportunities", desc: "Bounties/leads + application packs", href: "#" },
          { title: "Paper Trading", desc: "Portfolio + PnL + rationale", href: "#" },
        ].map((c) => (
          <a key={c.title} href={c.href} style={{ textDecoration: "none", color: "inherit" }}>
            <div style={{ border: "1px solid #e5e7eb", borderRadius: 12, padding: 14 }}>
              <div style={{ fontWeight: 700 }}>{c.title}</div>
              <div style={{ opacity: 0.75, marginTop: 6 }}>{c.desc}</div>
            </div>
          </a>
        ))}
      </section>
    </main>
  );
}
