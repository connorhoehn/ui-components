import { t as e } from "./cn-DhjIN-s0.js";
import { t } from "./Chip-BENLwTlq.js";
import { n } from "./RisingParticles-DvxMtXJ2.js";
import { useCallback as r, useEffect as i, useMemo as a, useRef as o, useState as s } from "react";
import { Fragment as c, jsx as l, jsxs as u } from "react/jsx-runtime";
//#region src/components/compute/lib/status.ts
var d = {
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
}, f = {
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
function p(e) {
	return e?.status ?? "idle";
}
function m(e, t) {
	return {
		fraction: t > 0 ? Math.max(0, Math.min(e, t)) / t : 0,
		urgent: e < 3e5
	};
}
//#endregion
//#region src/components/compute/components/PaneStatusLine.tsx
var h = 36e5;
function g(e, t = []) {
	if (!e) return "—";
	let n = t.find((t) => t.id === e);
	return n ? n.label : e.replace(/^[a-z]{2,3}\.(anthropic|amazon|meta)\./, "").replace(/-\d{8}-v\d+:\d+$/, "").replace(/-v\d+:\d+$/, "");
}
function _(e) {
	let t = Math.round(e / 6e4);
	return t < 60 ? `${t}m` : `${Math.floor(t / 60)}h ${t % 60}m`;
}
function v({ computer: r, modelId: i, models: a = [], idleWindowMs: o = h, broadcasting: s = !1, mode: f, className: v, "data-testid": y }) {
	let b = d[p(r)], x = r.lastResult, S = r.stopsInMs == null ? null : m(r.stopsInMs, o);
	return /* @__PURE__ */ u("div", {
		"data-testid": y,
		className: e("flex flex-col gap-0.5 px-2 py-1 border-t border-code-border bg-code-panel font-mono select-none shrink-0", v),
		children: [
			/* @__PURE__ */ u("div", {
				className: "flex items-center gap-2 text-[10px] leading-none min-w-0",
				children: [
					/* @__PURE__ */ l("span", {
						className: "text-code-mauve shrink-0",
						children: g(r.activeModel ?? i ?? null, a)
					}),
					r.contextUsed != null && /* @__PURE__ */ u(c, { children: [/* @__PURE__ */ l("span", {
						"aria-hidden": "true",
						className: "text-code-raised",
						children: "│"
					}), /* @__PURE__ */ u("span", {
						className: e("shrink-0 tabular-nums", r.contextUsed > .85 ? "text-code-peach" : "text-code-muted"),
						title: "Share of the agent's context window in use",
						children: [
							"ctx ",
							Math.round(r.contextUsed * 100),
							"%"
						]
					})] }),
					/* @__PURE__ */ l("span", {
						"aria-hidden": "true",
						className: "text-code-raised",
						children: "│"
					}),
					/* @__PURE__ */ l("span", {
						className: "text-code-subtle shrink-0 tabular-nums",
						children: x ? `$${x.costUsd.toFixed(4)}` : "$—"
					}),
					/* @__PURE__ */ l("span", { className: "flex-1 min-w-0" }),
					r.project ? /* @__PURE__ */ l("span", {
						className: "text-code-blue truncate",
						title: r.workspace ? `${r.project} — ${r.workspace}` : r.project,
						children: r.project
					}) : /* @__PURE__ */ l("span", {
						className: "text-code-muted truncate",
						children: r.label
					})
				]
			}),
			S && /* @__PURE__ */ l(n, {
				label: "expires",
				value: 1 - S.fraction,
				note: r.stopsInMs == null ? void 0 : `⟳ stops in ${_(r.stopsInMs)}`,
				warnAbove: .9,
				tone: "code"
			}),
			/* @__PURE__ */ u("div", {
				className: "flex items-center gap-2 text-[10px] leading-none min-w-0",
				children: [
					/* @__PURE__ */ l(t, {
						size: "xs",
						mono: !0,
						uppercase: !0,
						tone: b.tone,
						title: b.help,
						className: "bg-transparent px-0 shrink-0",
						children: b.label
					}),
					s && /* @__PURE__ */ l(t, {
						size: "xs",
						mono: !0,
						tone: "caution",
						title: "The prompt bar reaches this pane",
						className: "shrink-0",
						children: "▶▶ broadcast"
					}),
					f && /* @__PURE__ */ l("span", {
						className: "text-code-muted truncate",
						children: f
					}),
					/* @__PURE__ */ l("span", { className: "flex-1" }),
					r.currentTask && /* @__PURE__ */ l("span", {
						className: "text-code-comment truncate max-w-[60%]",
						title: r.currentTask,
						children: r.currentTask
					})
				]
			})
		]
	});
}
//#endregion
//#region src/components/compute/hooks/useComputeProjects.ts
var y = "__unassigned__";
function b({ client: e, projects: t, pollIntervalMs: n = 6e4, enabled: a = !0 }) {
	let [c, l] = s(t ?? []), [u, d] = s(!1), [f, p] = s(null), m = o(0), h = !!e.listProjects, g = r(async () => {
		if (t || !a || !e.listProjects) return;
		let n = ++m.current;
		d(!0);
		try {
			let t = await e.listProjects();
			if (m.current !== n) return;
			l(t), p(null);
		} catch (e) {
			m.current === n && p(e instanceof Error ? e.message : "Failed to list projects");
		} finally {
			m.current === n && d(!1);
		}
	}, [
		e,
		t,
		a
	]);
	return i(() => {
		if (t) {
			l(t);
			return;
		}
		if (!a || !h || (g(), n <= 0)) return;
		let e = setInterval(() => void g(), n);
		return () => {
			clearInterval(e), m.current += 1;
		};
	}, [
		g,
		t,
		a,
		h,
		n
	]), {
		projects: c,
		rollups: [],
		absent: !h && !t,
		isLoading: u,
		error: f,
		refresh: g
	};
}
function x(e, t) {
	let n = /* @__PURE__ */ new Map();
	for (let e of t) {
		let t = e.projectId ?? "__unassigned__", r = n.get(t);
		r ? r.push(e) : n.set(t, [e]);
	}
	let r = (e) => {
		let t = n.get(e.id) ?? [], r = t.map((e) => e.stopsInMs).filter((e) => typeof e == "number");
		return {
			...e,
			computers: t,
			activeCount: t.filter((e) => e.status === "running" || e.status === "waiting").length,
			soonestExpiryMs: r.length > 0 ? Math.min(...r) : null,
			liveSpendUsd: t.reduce((e, t) => e + (t.spendUsd ?? 0), 0),
			liveTokens: t.reduce((e, t) => e + (t.tokensUsed ?? 0), 0)
		};
	}, i = e.map(r);
	return (n.get("__unassigned__") ?? []).length > 0 && i.push(r({
		id: y,
		name: "No project"
	})), i;
}
function S(e) {
	return !Number.isFinite(e) || e < 0 ? "—" : e < 1e3 ? String(Math.round(e)) : e < 1e6 ? `${(e / 1e3).toFixed(+(e < 1e4))}k` : `${(e / 1e6).toFixed(1)}M`;
}
function C(e, t) {
	return a(() => x(e, t), [e, t]);
}
//#endregion
export { C as a, g as c, m as d, p as f, b as i, d as l, S as n, h as o, x as r, v as s, y as t, f as u };
