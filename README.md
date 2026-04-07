# Chuck ~ The Intersect

**Chuck** is a personal agent that sits at the intersect of:
- **Attention** → fully automated X (Twitter) posting + replies
- **Opportunities** → scouts bounties/leads and drafts application packs
- **Capital** → paper-trading portfolio (opt-in live mode later with strict limits)

Built for the **Nosana x ElizaOS Builders Challenge**.

## Monorepo Layout

- `apps/agent` — ElizaOS agent runtime (X autopilot, opportunity scout, paper trader)
- `apps/dashboard` — Next.js dashboard (plans, posts, opportunities, trades)
- `packages/shared` — shared types/utilities
- `packages/db` — schema + db utilities
- `infra/nosana` — container + deployment notes

## Dev (WIP)

```bash
npm install
npm run dev
```

## Roadmap (MVP)

- [ ] X Auth (API keys first, OAuth-ready)
- [ ] Autopilot posting scheduler + action log
- [ ] Opportunity scout + Telegram pings
- [ ] Paper trading engine + performance dashboard
- [ ] Nosana deployment URL + 1-min demo

