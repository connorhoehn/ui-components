import { t as e } from "./cn-D4QmbyEy.js";
import { t } from "./Chip-DJyxHDn3.js";
import { t as n } from "./DotMeter-KxyExwVb.js";
import { Fragment as r } from "react";
import { Fragment as i, jsx as a, jsxs as o } from "react/jsx-runtime";
//#region src/components/compute/lib/status.ts
var s = {
	provisioning: {
		tone: "info",
		label: "provisioning",
		help: "The box has been minted and its microVM is starting. It takes work once it is up.",
		color: "var(--color-info)",
		pulse: !0
	},
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
}, c = {
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
function l(e) {
	return e?.status ?? "idle";
}
function u(e, t) {
	return {
		fraction: t > 0 ? Math.max(0, Math.min(e, t)) / t : 0,
		urgent: e < 3e5
	};
}
//#endregion
//#region src/components/compute/components/PaneStatusLine.tsx
var d = 36e5;
function f(e, t = []) {
	if (!e) return "—";
	let n = t.find((t) => t.id === e);
	return n ? n.label : e.replace(/^[a-z]{2,3}\.(anthropic|amazon|meta)\./, "").replace(/-\d{8}-v\d+:\d+$/, "").replace(/-v\d+:\d+$/, "");
}
function p(e) {
	let t = Math.round(e / 6e4);
	return t < 60 ? `${t}m` : `${Math.floor(t / 60)}h ${t % 60}m`;
}
function m({ computer: c, modelId: m, models: h = [], idleWindowMs: g = d, broadcasting: _ = !1, mode: v, variant: y = "full", extra: b, className: x, "data-testid": S }) {
	if (y === "meta") {
		let t = c.lastResult?.costUsd ?? c.spendUsd, n = [/* @__PURE__ */ a("span", { children: f(c.activeModel ?? m ?? null, h) }, "model")];
		return c.contextUsed != null && n.push(/* @__PURE__ */ o("span", {
			title: "Share of the agent's context window in use",
			className: e("tabular-nums", c.contextUsed > .85 && "text-warning"),
			children: [
				"ctx ",
				Math.round(c.contextUsed * 100),
				"%"
			]
		}, "ctx")), n.push(/* @__PURE__ */ a("span", {
			className: "tabular-nums",
			children: t == null ? "$—" : `$${t.toFixed(4)}`
		}, "cost")), c.stopsInMs != null && n.push(/* @__PURE__ */ o("span", {
			className: "tabular-nums",
			title: "Until the reaper stops this computer",
			children: ["auto-stop ", p(c.stopsInMs)]
		}, "stop")), b && n.push(/* @__PURE__ */ a("span", {
			className: "tabular-nums",
			children: b
		}, "extra")), _ && n.push(/* @__PURE__ */ a("span", {
			className: "text-warning",
			children: "broadcast"
		}, "bc")), v && n.push(/* @__PURE__ */ a("span", {
			className: "uppercase",
			children: v
		}, "mode")), /* @__PURE__ */ a("span", {
			"data-testid": S,
			className: e("inline-flex items-center gap-1.5 min-w-0 text-[11px] text-text-tertiary truncate", x),
			children: n.map((e, t) => /* @__PURE__ */ o(r, { children: [t > 0 && /* @__PURE__ */ a("span", {
				"aria-hidden": "true",
				children: "·"
			}), e] }, t))
		});
	}
	let C = s[l(c)], w = c.lastResult, T = c.stopsInMs == null ? null : u(c.stopsInMs, g);
	return /* @__PURE__ */ o("div", {
		"data-testid": S,
		className: e("flex flex-col gap-0.5 px-2 py-1 border-t border-code-border bg-code-panel font-mono select-none shrink-0", x),
		children: [
			/* @__PURE__ */ o("div", {
				className: "flex items-center gap-2 text-[10px] leading-none min-w-0",
				children: [
					/* @__PURE__ */ a("span", {
						className: "text-code-mauve shrink-0",
						children: f(c.activeModel ?? m ?? null, h)
					}),
					c.contextUsed != null && /* @__PURE__ */ o(i, { children: [/* @__PURE__ */ a("span", {
						"aria-hidden": "true",
						className: "text-code-raised",
						children: "│"
					}), /* @__PURE__ */ o("span", {
						className: e("shrink-0 tabular-nums", c.contextUsed > .85 ? "text-code-peach" : "text-code-muted"),
						title: "Share of the agent's context window in use",
						children: [
							"ctx ",
							Math.round(c.contextUsed * 100),
							"%"
						]
					})] }),
					/* @__PURE__ */ a("span", {
						"aria-hidden": "true",
						className: "text-code-raised",
						children: "│"
					}),
					/* @__PURE__ */ a("span", {
						className: "text-code-subtle shrink-0 tabular-nums",
						children: w ? `$${w.costUsd.toFixed(4)}` : "$—"
					}),
					/* @__PURE__ */ a("span", { className: "flex-1 min-w-0" }),
					c.project ? /* @__PURE__ */ a("span", {
						className: "text-code-blue truncate",
						title: c.workspace ? `${c.project} — ${c.workspace}` : c.project,
						children: c.project
					}) : /* @__PURE__ */ a("span", {
						className: "text-code-muted truncate",
						children: c.label
					})
				]
			}),
			T && /* @__PURE__ */ a(n, {
				label: "expires",
				value: 1 - T.fraction,
				note: c.stopsInMs == null ? void 0 : `⟳ stops in ${p(c.stopsInMs)}`,
				warnAbove: .9,
				tone: "code"
			}),
			/* @__PURE__ */ o("div", {
				className: "flex items-center gap-2 text-[10px] leading-none min-w-0",
				children: [
					/* @__PURE__ */ a(t, {
						size: "xs",
						mono: !0,
						uppercase: !0,
						tone: C.tone,
						title: C.help,
						className: "bg-transparent px-0 shrink-0",
						children: C.label
					}),
					_ && /* @__PURE__ */ a(t, {
						size: "xs",
						mono: !0,
						tone: "caution",
						title: "The prompt bar reaches this pane",
						className: "shrink-0",
						children: "▶▶ broadcast"
					}),
					v && /* @__PURE__ */ a("span", {
						className: "text-code-muted truncate",
						children: v
					}),
					/* @__PURE__ */ a("span", { className: "flex-1" }),
					c.currentTask && /* @__PURE__ */ a("span", {
						className: "text-code-comment truncate max-w-[60%]",
						title: c.currentTask,
						children: c.currentTask
					})
				]
			})
		]
	});
}
//#endregion
export { c as a, s as i, m as n, u as o, f as r, l as s, d as t };
