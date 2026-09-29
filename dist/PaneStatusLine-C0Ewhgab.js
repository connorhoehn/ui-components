import { t as e } from "./cn-DhjIN-s0.js";
import { t } from "./Chip-4IBrlduZ.js";
import { t as n } from "./DotMeter-BDVkadI8.js";
import { Fragment as r, jsx as i, jsxs as a } from "react/jsx-runtime";
//#region src/components/compute/lib/status.ts
var o = {
	idle: {
		tone: "success",
		label: "idle",
		help: "Session is up and doing nothing. Give it a task or open a terminal.",
		color: "var(--color-success)",
		pulse: !1
	},
	running: {
		tone: "info",
		label: "running",
		help: "An agent task is in flight. The timeline below is live.",
		color: "var(--color-primary)",
		pulse: !0
	},
	waiting: {
		tone: "warning",
		label: "needs you",
		help: "The last run ended by asking a question. Reply with a new task, resume on.",
		color: "var(--color-warning)",
		pulse: !1
	},
	stopped: {
		tone: "neutral",
		label: "stopped",
		help: "Session is down. The workspace persists — the next task or command resumes it.",
		color: "var(--color-text-tertiary)",
		pulse: !1
	},
	error: {
		tone: "danger",
		label: "error",
		help: "The last run failed. Open the timeline for what it said.",
		color: "var(--color-danger)",
		pulse: !1
	}
}, s = {
	connecting: {
		tone: "neutral",
		label: "connecting",
		help: "Minting a presigned URL and attaching to the PTY.",
		color: "var(--color-code-muted)",
		pulse: !0
	},
	ready: {
		tone: "success",
		label: "ready",
		help: "Attached and quiet.",
		color: "var(--color-code-green)",
		pulse: !1
	},
	busy: {
		tone: "caution",
		label: "output",
		help: "Bytes are arriving. Inferred from traffic — a silent command still reads as ready.",
		color: "var(--color-code-peach)",
		pulse: !0
	},
	detached: {
		tone: "neutral",
		label: "detached",
		help: "Socket dropped, shell still running server-side. Reattach to pick it back up.",
		color: "var(--color-code-muted)",
		pulse: !1
	},
	error: {
		tone: "danger",
		label: "error",
		help: "Could not attach. The runtime may already hold its ten shells.",
		color: "var(--color-code-red)",
		pulse: !1
	}
};
function c(e) {
	return e?.status ?? "idle";
}
function l(e, t) {
	return {
		fraction: t > 0 ? Math.max(0, Math.min(e, t)) / t : 0,
		urgent: e < 3e5
	};
}
//#endregion
//#region src/components/compute/components/PaneStatusLine.tsx
var u = 36e5;
function d(e, t = []) {
	if (!e) return "—";
	let n = t.find((t) => t.id === e);
	return n ? n.label : e.replace(/^[a-z]{2,3}\.(anthropic|amazon|meta)\./, "").replace(/-\d{8}-v\d+:\d+$/, "").replace(/-v\d+:\d+$/, "");
}
function f(e) {
	let t = Math.round(e / 6e4);
	return t < 60 ? `${t}m` : `${Math.floor(t / 60)}h ${t % 60}m`;
}
function p({ computer: s, modelId: p, models: m = [], idleWindowMs: h = u, broadcasting: g = !1, mode: _, className: v, "data-testid": y }) {
	let b = o[c(s)], x = s.lastResult, S = s.stopsInMs == null ? null : l(s.stopsInMs, h);
	return /* @__PURE__ */ a("div", {
		"data-testid": y,
		className: e("flex flex-col gap-0.5 px-2 py-1 border-t border-code-border bg-code-panel font-mono select-none shrink-0", v),
		children: [
			/* @__PURE__ */ a("div", {
				className: "flex items-center gap-2 text-[10px] leading-none min-w-0",
				children: [
					/* @__PURE__ */ i("span", {
						className: "text-code-mauve shrink-0",
						children: d(s.activeModel ?? p ?? null, m)
					}),
					s.contextUsed != null && /* @__PURE__ */ a(r, { children: [/* @__PURE__ */ i("span", {
						"aria-hidden": "true",
						className: "text-code-raised",
						children: "│"
					}), /* @__PURE__ */ a("span", {
						className: e("shrink-0 tabular-nums", s.contextUsed > .85 ? "text-code-peach" : "text-code-muted"),
						title: "Share of the agent's context window in use",
						children: [
							"ctx ",
							Math.round(s.contextUsed * 100),
							"%"
						]
					})] }),
					/* @__PURE__ */ i("span", {
						"aria-hidden": "true",
						className: "text-code-raised",
						children: "│"
					}),
					/* @__PURE__ */ i("span", {
						className: "text-code-subtle shrink-0 tabular-nums",
						children: x ? `$${x.costUsd.toFixed(4)}` : "$—"
					}),
					/* @__PURE__ */ i("span", { className: "flex-1 min-w-0" }),
					s.project ? /* @__PURE__ */ i("span", {
						className: "text-code-blue truncate",
						title: s.workspace ? `${s.project} — ${s.workspace}` : s.project,
						children: s.project
					}) : /* @__PURE__ */ i("span", {
						className: "text-code-muted truncate",
						children: s.label
					})
				]
			}),
			S && /* @__PURE__ */ i(n, {
				label: "expires",
				value: 1 - S.fraction,
				note: s.stopsInMs == null ? void 0 : `⟳ stops in ${f(s.stopsInMs)}`,
				warnAbove: .9,
				tone: "code"
			}),
			/* @__PURE__ */ a("div", {
				className: "flex items-center gap-2 text-[10px] leading-none min-w-0",
				children: [
					/* @__PURE__ */ i(t, {
						size: "xs",
						mono: !0,
						uppercase: !0,
						tone: b.tone,
						title: b.help,
						className: "bg-transparent px-0 shrink-0",
						children: b.label
					}),
					g && /* @__PURE__ */ i(t, {
						size: "xs",
						mono: !0,
						tone: "caution",
						title: "The prompt bar reaches this pane",
						className: "shrink-0",
						children: "▶▶ broadcast"
					}),
					_ && /* @__PURE__ */ i("span", {
						className: "text-code-muted truncate",
						children: _
					}),
					/* @__PURE__ */ i("span", { className: "flex-1" }),
					s.currentTask && /* @__PURE__ */ i("span", {
						className: "text-code-comment truncate max-w-[60%]",
						title: s.currentTask,
						children: s.currentTask
					})
				]
			})
		]
	});
}
//#endregion
export { s as a, o as i, p as n, l as o, d as r, c as s, u as t };
