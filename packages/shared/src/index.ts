export type XAuthMode = "keys" | "oauth";

export type AgentRunState = "running" | "paused";

export type ActionType =
  | "x_post"
  | "x_reply"
  | "opportunity_found"
  | "trade_paper_open"
  | "trade_paper_close"
  | "system";

export type ActionStatus = "success" | "error" | "skipped";

export interface ActionLogRecord {
  id: string;
  createdAt: string; // ISO
  type: ActionType;
  status: ActionStatus;
  message: string;
  meta?: Record<string, unknown>;
}

export interface ChuckSettings {
  xAuthMode: XAuthMode;
  autopilotState: AgentRunState;
  xDryRun: boolean;
}
