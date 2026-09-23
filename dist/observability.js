import { t as e } from "./apiBaseUrl-DLrXlmVj.js";
import { r as t } from "./IdentityContext-CQM1qwH6.js";
import { t as n } from "./cn-DhjIN-s0.js";
import { t as r } from "./Card-RQCeAPNU.js";
import { n as i, r as a, t as o } from "./Chart-BbfaF2-B.js";
import { t as s } from "./Chip-DYqbAD3L.js";
import { t as c } from "./Modal-D2qxMX2_.js";
import { t as l } from "./EmptyState-DQYx5Oyy.js";
import { n as u, t as d } from "./Sparkline-Ci_cmVWU.js";
import { t as f } from "./Input-DLknWXri.js";
import { t as p } from "./StatusDot-Bgx2zxgC.js";
import { t as m } from "./CardHeader-CsPhVpCm.js";
import { t as h } from "./Select-CD8ixtYi.js";
import { t as g } from "./Checkbox-Db43XgBJ.js";
import { t as _ } from "./activationKey-CjbL3LUv.js";
import { n as v } from "./EventStreamContext-CLzG8O5_.js";
import { n as y, r as b } from "./ObservabilityContext-DpoDrm3T.js";
import { useCallback as x, useEffect as S, useId as C, useMemo as w, useRef as T, useState as E } from "react";
import { Fragment as D, jsx as O, jsxs as k } from "react/jsx-runtime";
import { Outlet as A, useNavigate as j } from "react-router";
//#region src/components/observability/ObservabilityLayout.tsx
function M() {
	return /* @__PURE__ */ O(A, {});
}
//#endregion
//#region src/components/observability/hooks/useDashboard.ts
function N() {
	return y().dashboard;
}
//#endregion
//#region src/components/observability/hooks/usePipelineMetrics.ts
var P = 1e4, F = 1e3, ee = 2, te = 3e4;
function ne(e) {
	let t = Math.max(0, e - 1);
	return Math.min(F * ee ** +t, te);
}
function re() {
	return {
		runsStarted: null,
		runsCompleted: null,
		runsFailed: null,
		runsActive: null,
		runsAwaitingApproval: null,
		avgDurationMs: null,
		llmTokensIn: null,
		llmTokensOut: null,
		estimatedCostUsd: null,
		avgFirstTokenLatencyMs: null,
		asOf: (/* @__PURE__ */ new Date()).toISOString(),
		source: "error"
	};
}
function ie(e) {
	let t = e ?? {}, n = (e) => typeof e == "number" && Number.isFinite(e) ? e : null, r = t.source, i = r === "bridge" || r === "stub" || r === "error" ? r : "stub";
	return {
		runsStarted: n(t.runsStarted),
		runsCompleted: n(t.runsCompleted),
		runsFailed: n(t.runsFailed),
		runsActive: n(t.runsActive),
		runsAwaitingApproval: n(t.runsAwaitingApproval),
		avgDurationMs: n(t.avgDurationMs),
		llmTokensIn: n(t.llmTokensIn),
		llmTokensOut: n(t.llmTokensOut),
		estimatedCostUsd: n(t.estimatedCostUsd),
		avgFirstTokenLatencyMs: n(t.avgFirstTokenLatencyMs),
		asOf: typeof t.asOf == "string" ? t.asOf : (/* @__PURE__ */ new Date()).toISOString(),
		source: i
	};
}
function ae(n = {}) {
	let r = t(), i = n.idToken === void 0 ? r?.idToken ?? null : n.idToken, a = n.baseUrl ?? e(), { pollIntervalMs: o = P } = n, s = typeof o == "number" && o > 0, c = s ? o : P, [l, u] = E(null), [d, f] = E(!0), [p, m] = E(null), [h, g] = E(null), [_, v] = E(!1), y = T(null), b = T(!0), C = T(!1), w = T(0), D = x(async () => {
		y.current && y.current.abort();
		let e = new AbortController();
		y.current = e;
		try {
			let t = { "Content-Type": "application/json" };
			i && (t.Authorization = `Bearer ${i}`);
			let n = await fetch(`${a}/api/pipelines/metrics`, {
				method: "GET",
				headers: t,
				signal: e.signal
			});
			if (!n.ok) throw Error(`HTTP ${n.status}`);
			let r = ie(await n.json());
			if (!b.current || e.signal.aborted) return;
			u(r), g((/* @__PURE__ */ new Date()).toISOString()), m(null), v(!0), C.current = !1, w.current = 0;
		} catch (e) {
			if (e.name === "AbortError" || !b.current) return;
			m(e.message || "Failed to fetch pipeline metrics"), v(!1), w.current += 1, u((e) => e ?? re()), C.current ||= (console.warn("[usePipelineMetrics] /api/pipelines/metrics unreachable — using fallback", e), !0);
		} finally {
			b.current && !e.signal.aborted && f(!1);
		}
	}, [i, a]);
	return S(() => {
		b.current = !0;
		let e = null, t = !0, n = () => {
			e !== null && (clearTimeout(e), e = null);
		}, r = () => {
			if (!t || document.hidden || !s) return;
			let n = w.current > 0 ? ne(w.current) : c;
			e = setTimeout(() => {
				e = null, D().finally(() => {
					r();
				});
			}, n);
		}, i = () => {
			!t || e !== null || r();
		};
		D().finally(() => {
			document.hidden || i();
		});
		let a = () => {
			document.hidden ? n() : (n(), D().finally(() => {
				document.hidden || i();
			}));
		};
		return document.addEventListener("visibilitychange", a), () => {
			t = !1, b.current = !1, n(), document.removeEventListener("visibilitychange", a), y.current &&= (y.current.abort(), null);
		};
	}, [
		D,
		s,
		c
	]), {
		metrics: l,
		loading: d,
		error: p,
		lastUpdatedAt: h,
		refresh: D,
		isLiveData: _,
		source: l?.source ?? null
	};
}
//#endregion
//#region src/components/observability/components/KPICard.tsx
function oe(e) {
	return typeof e == "number" ? e.toLocaleString() : e;
}
function I({ title: e, value: t, delta: r, sparklineData: i, onClick: a }) {
	let [o, s] = E(!1), c = !!a;
	return /* @__PURE__ */ k("div", {
		"data-testid": "kpi-card",
		onClick: a,
		onMouseEnter: () => s(!0),
		onMouseLeave: () => s(!1),
		role: c ? "button" : void 0,
		tabIndex: c ? 0 : void 0,
		onKeyDown: c ? (e) => {
			(e.key === "Enter" || e.key === " ") && (e.preventDefault(), a?.());
		} : void 0,
		className: n("flex-1 min-w-[180px] bg-surface border rounded-[10px] p-4", "flex flex-col gap-1.5 font-[inherit] transition-[border-color] duration-[120ms] ease-linear", c ? "cursor-pointer" : "cursor-default", o && c ? "border-primary" : "border-border"),
		children: [
			/* @__PURE__ */ O("div", {
				className: "text-xs font-semibold text-text-secondary tracking-[0.2px]",
				children: e
			}),
			/* @__PURE__ */ k("div", {
				className: "flex items-baseline justify-between gap-2",
				children: [/* @__PURE__ */ O("div", {
					className: "text-[28px] font-bold text-text-primary leading-[1.1]",
					children: oe(t)
				}), i && i.length > 0 && /* @__PURE__ */ O(d, {
					data: i,
					width: 80,
					height: 20,
					color: "#646cff"
				})]
			}),
			r && /* @__PURE__ */ k("div", {
				className: n("text-[11px] font-semibold font-[inherit]", r.direction === "up" ? "text-state-completed" : "text-state-failed"),
				children: [
					r.direction === "up" ? "▲" : "▼",
					" ",
					Math.abs(r.value),
					"%"
				]
			})
		]
	});
}
//#endregion
//#region src/components/observability/components/DashboardKPIStrip.tsx
function L({ runsToday: e, runsSparkline: t, activeNow: n, pendingApprovals: r, failed24h: i, avgFirstTokenLatency: a, runsTodayDelta: o, failed24hDelta: s, onScrollToActive: c, onGoToPipelines: l, onGoToFailedEvents: u }) {
	return /* @__PURE__ */ k("div", {
		className: "grid grid-cols-[repeat(auto-fit,minmax(170px,1fr))] gap-4",
		children: [
			/* @__PURE__ */ O(I, {
				title: "Runs today",
				value: e,
				delta: typeof e == "number" ? o : void 0,
				sparklineData: t
			}),
			/* @__PURE__ */ O(I, {
				title: "Active now",
				value: n,
				onClick: c
			}),
			/* @__PURE__ */ O(I, {
				title: "Pending approvals",
				value: r,
				onClick: l
			}),
			/* @__PURE__ */ O(I, {
				title: "Failed (24h)",
				value: i,
				delta: typeof i == "number" ? s : void 0,
				onClick: u
			}),
			/* @__PURE__ */ O(I, {
				title: "Avg first-token latency",
				value: a
			})
		]
	});
}
//#endregion
//#region src/components/observability/components/NodeGridTile.tsx
var R = {
	healthy: "border-state-completed",
	degraded: "border-state-awaiting",
	dead: "border-state-failed",
	idle: "border-state-idle"
}, se = {
	healthy: "bg-state-completed",
	degraded: "bg-state-awaiting",
	dead: "bg-state-failed",
	idle: "bg-state-idle"
};
function ce(e) {
	return e >= 1024 ? `${(e / 1024).toFixed(1)}G` : `${Math.round(e)}M`;
}
function z({ label: e, value: t }) {
	return /* @__PURE__ */ k("div", {
		className: "flex justify-between items-baseline text-xs font-[inherit]",
		children: [/* @__PURE__ */ O("span", {
			className: "text-text-secondary font-semibold",
			children: e
		}), /* @__PURE__ */ O("span", {
			className: "text-text-primary font-mono text-[11px]",
			children: t
		})]
	});
}
function le({ node: e, selected: t, onClick: r, onKill: i }) {
	let [a, o] = E(!1), s = e.activeRuns > 0 ? `${e.activeRuns}` : "— idle";
	return /* @__PURE__ */ k("div", {
		"data-testid": "node-grid-tile",
		onClick: r,
		onKeyDown: r ? _(r) : void 0,
		role: r ? "button" : void 0,
		tabIndex: r ? 0 : void 0,
		"aria-pressed": r ? !!t : void 0,
		"aria-label": r ? `Node ${e.id}` : void 0,
		onMouseEnter: () => o(!0),
		onMouseLeave: () => o(!1),
		className: n("w-[200px] h-[200px] bg-surface rounded-[10px] p-3", "flex flex-col gap-1.5 font-[inherit] box-border border", "transition-[box-shadow,border-color] duration-[120ms] ease-linear", r ? "cursor-pointer" : "cursor-default", t ? "border-primary shadow-[0_0_0_4px_rgba(100,108,255,0.18)]" : a ? n(R[e.status], "shadow-[0_2px_8px_rgba(100,108,255,0.10)]") : R[e.status]),
		children: [
			/* @__PURE__ */ k("div", {
				className: "flex justify-between items-center",
				children: [/* @__PURE__ */ O("div", {
					className: "text-[13px] font-semibold text-text-primary overflow-hidden text-ellipsis whitespace-nowrap",
					title: e.id,
					children: e.id
				}), /* @__PURE__ */ O("span", {
					role: "img",
					"aria-label": `status ${e.status}`,
					className: n("w-2 h-2 rounded-full shrink-0", se[e.status])
				})]
			}),
			(e.role || e.region) && /* @__PURE__ */ O("div", {
				className: "text-[11px] text-text-tertiary font-[inherit]",
				children: [e.role, e.region].filter(Boolean).join(" · ")
			}),
			/* @__PURE__ */ k("div", {
				className: "flex flex-col gap-0.5",
				children: [
					/* @__PURE__ */ O(z, {
						label: "CPU",
						value: `${Math.round(e.cpu)}%`
					}),
					/* @__PURE__ */ O(z, {
						label: "MEM",
						value: ce(e.memoryMb)
					}),
					/* @__PURE__ */ O(z, {
						label: "CONN",
						value: `${e.connections}`
					}),
					/* @__PURE__ */ O(z, {
						label: "RUNS",
						value: s
					})
				]
			}),
			/* @__PURE__ */ O("div", {
				className: "mt-auto",
				children: /* @__PURE__ */ O(d, {
					data: e.cpuHistory,
					width: 176,
					height: 18,
					color: "#646cff"
				})
			}),
			i && /* @__PURE__ */ O("button", {
				"data-testid": "node-kill-btn",
				type: "button",
				onClick: (e) => {
					e.stopPropagation(), i();
				},
				onKeyDown: (e) => e.stopPropagation(),
				className: "self-start px-2 py-0.5 text-[11px] font-semibold bg-transparent text-text-tertiary border border-border rounded-sm cursor-pointer font-[inherit]",
				children: "● kill"
			})
		]
	});
}
//#endregion
//#region src/components/observability/components/NodeGrid.tsx
function B({ nodes: e, onSelect: t, selectedId: r }) {
	return !e || e.length === 0 ? /* @__PURE__ */ O("div", {
		"data-testid": "node-grid-empty",
		className: n("p-6 text-center text-text-tertiary text-[13px] font-[inherit]"),
		children: "No nodes connected"
	}) : /* @__PURE__ */ O("div", {
		"data-testid": "node-grid",
		className: n("flex flex-wrap gap-4 font-[inherit]"),
		children: e.map((e) => /* @__PURE__ */ O(le, {
			node: e,
			selected: r === e.id,
			onClick: t ? () => t(e.id) : void 0
		}, e.id))
	});
}
//#endregion
//#region src/components/observability/components/ActiveRunsTable.tsx
function ue({ run: e, onClick: t, onCancel: r }) {
	let [i, a] = E(!1), o = !!t, s = o ? `Open run ${e.runId} of pipeline ${e.pipelineName}` : void 0, c = (n) => {
		t && (n.key === "Enter" || n.key === " " || n.key === "Spacebar") && (n.preventDefault(), t(e));
	}, l = (t) => {
		t.stopPropagation(), r && r(e);
	}, u = !!r && e.status === "running";
	return /* @__PURE__ */ k("tr", {
		"data-testid": "active-run-row",
		role: o ? "button" : void 0,
		"aria-label": s,
		tabIndex: o ? 0 : void 0,
		onClick: t ? () => t(e) : void 0,
		onKeyDown: o ? c : void 0,
		onMouseEnter: () => a(!0),
		onMouseLeave: () => a(!1),
		className: n("outline-none", t ? "cursor-pointer" : "cursor-default", i ? "bg-surface-hover" : "bg-transparent"),
		children: [
			/* @__PURE__ */ O("td", {
				className: "px-3 py-2 text-[13px] text-text-primary font-[inherit] border-b border-border font-semibold",
				children: /* @__PURE__ */ k("span", {
					className: "inline-flex items-center gap-1.5",
					children: [e.pipelineName, i && o && /* @__PURE__ */ O("span", {
						"data-testid": "active-run-link-icon",
						"aria-hidden": "true",
						className: "text-[11px] text-primary font-medium",
						children: "↗"
					})]
				})
			}),
			/* @__PURE__ */ O("td", {
				className: "px-3 py-2 text-[11px] text-text-secondary font-mono border-b border-border",
				children: e.currentStep
			}),
			/* @__PURE__ */ O("td", {
				className: "px-3 py-2 text-[11px] text-text-secondary font-mono border-b border-border",
				children: e.ownerNode
			}),
			/* @__PURE__ */ O("td", {
				className: "px-3 py-2 text-[11px] text-text-secondary font-mono border-b border-border text-right",
				children: e.elapsed
			}),
			r && /* @__PURE__ */ O("td", {
				className: "px-3 py-2 text-[13px] text-text-primary font-[inherit] border-b border-border text-right w-px whitespace-nowrap",
				children: u && /* @__PURE__ */ O("button", {
					"data-testid": "active-run-cancel",
					type: "button",
					"aria-label": `Cancel run ${e.runId}`,
					onClick: l,
					onKeyDown: (e) => e.stopPropagation(),
					className: "px-2 py-0.5 text-[11px] font-semibold bg-transparent text-state-failed border border-border rounded-sm cursor-pointer font-[inherit]",
					children: "Cancel"
				})
			})
		]
	});
}
function de({ runs: e, onRowClick: t, onCancelRun: n }) {
	return !e || e.length === 0 ? /* @__PURE__ */ O("div", {
		"data-testid": "active-runs-empty",
		className: "p-6 text-center text-text-tertiary text-[13px] border border-border rounded-lg bg-surface font-[inherit]",
		children: "No active runs"
	}) : /* @__PURE__ */ O("div", {
		"data-testid": "active-runs-table",
		className: "border border-border rounded-lg overflow-hidden bg-surface",
		children: /* @__PURE__ */ k("table", {
			className: "w-full border-collapse font-[inherit]",
			children: [/* @__PURE__ */ O("thead", { children: /* @__PURE__ */ k("tr", { children: [
				/* @__PURE__ */ O("th", {
					className: "text-left px-3 py-2 text-[11px] font-semibold text-text-secondary uppercase tracking-[0.3px] bg-surface-inset border-b border-border",
					children: "Pipeline"
				}),
				/* @__PURE__ */ O("th", {
					className: "text-left px-3 py-2 text-[11px] font-semibold text-text-secondary uppercase tracking-[0.3px] bg-surface-inset border-b border-border",
					children: "Step"
				}),
				/* @__PURE__ */ O("th", {
					className: "text-left px-3 py-2 text-[11px] font-semibold text-text-secondary uppercase tracking-[0.3px] bg-surface-inset border-b border-border",
					children: "Owner"
				}),
				/* @__PURE__ */ O("th", {
					className: "text-right px-3 py-2 text-[11px] font-semibold text-text-secondary uppercase tracking-[0.3px] bg-surface-inset border-b border-border",
					children: "Elapsed"
				}),
				n && /* @__PURE__ */ O("th", { className: "text-right px-3 py-2 text-[11px] font-semibold text-text-secondary uppercase tracking-[0.3px] bg-surface-inset border-b border-border" })
			] }) }), /* @__PURE__ */ O("tbody", { children: e.map((e) => /* @__PURE__ */ O(ue, {
				run: e,
				onClick: t,
				onCancel: n
			}, e.runId)) })]
		})
	});
}
//#endregion
//#region src/components/observability/components/AlertsPanel.tsx
var fe = {
	info: "text-info",
	warning: "text-state-awaiting",
	error: "text-danger",
	critical: "text-danger"
}, pe = {
	info: "border-l-info",
	warning: "border-l-state-awaiting",
	error: "border-l-danger",
	critical: "border-l-danger"
}, me = {
	info: "ℹ",
	warning: "⚠",
	error: "✕",
	critical: "✕"
};
function he(e) {
	let t = Date.parse(e);
	if (Number.isNaN(t)) return e;
	let n = Math.max(0, Math.floor((Date.now() - t) / 1e3));
	if (n < 60) return "just now";
	if (n < 3600) return `${Math.floor(n / 60)}m ago`;
	if (n < 86400) return `${Math.floor(n / 3600)}h ago`;
	let r = Math.floor(n / 86400);
	if (r < 3) return `${r}d ago`;
	try {
		return new Date(t).toLocaleDateString(void 0, {
			month: "short",
			day: "numeric"
		});
	} catch {
		return e;
	}
}
function ge({ alert: e, onDismiss: t }) {
	let r = me[e.severity];
	return /* @__PURE__ */ k("div", {
		"data-testid": "alert-item",
		className: n("flex items-start gap-2.5 px-3 py-2.5", "bg-surface border border-border border-l-[3px] rounded-md font-[inherit]", pe[e.severity]),
		children: [
			/* @__PURE__ */ O("span", {
				"aria-hidden": "true",
				className: n("text-sm leading-5 shrink-0 w-4 text-center", fe[e.severity]),
				children: r
			}),
			/* @__PURE__ */ k("div", {
				className: "flex-1 min-w-0",
				children: [/* @__PURE__ */ O("div", {
					className: "text-[13px] text-text-primary leading-[1.4]",
					children: e.message
				}), /* @__PURE__ */ k("div", {
					className: "text-[11px] text-text-tertiary mt-0.5",
					children: [e.category ? `${e.category} · ` : "", he(e.timestamp)]
				})]
			}),
			t && /* @__PURE__ */ O("button", {
				"data-testid": "alert-dismiss",
				"aria-label": "dismiss alert",
				onClick: () => t(e.id),
				className: "bg-transparent border-none text-text-tertiary text-base leading-none cursor-pointer px-1.5 py-0.5 font-[inherit] shrink-0",
				children: "×"
			})
		]
	});
}
function _e({ alerts: e, onDismiss: t }) {
	return !e || e.length === 0 ? /* @__PURE__ */ O("div", {
		"data-testid": "alerts-empty",
		className: "p-6 text-center text-text-tertiary text-[13px] border border-border rounded-lg bg-surface font-[inherit]",
		children: "No active alerts"
	}) : /* @__PURE__ */ O("div", {
		"data-testid": "alerts-panel",
		className: "flex flex-col gap-2",
		children: e.map((e) => /* @__PURE__ */ O(ge, {
			alert: e,
			onDismiss: t
		}, e.id))
	});
}
//#endregion
//#region src/components/observability/DashboardPage.tsx
var V = "—";
function ve(e) {
	return typeof e != "number" || !Number.isFinite(e) ? V : e < 1e3 ? `${Math.round(e)} ms` : `${(e / 1e3).toFixed(1)}s`;
}
function ye(e) {
	let t = e?.regions ?? {}, n = [];
	for (let e of Object.keys(t)) {
		let r = t[e]?.nodes;
		if (Array.isArray(r)) for (let t of r) n.push({
			id: t.id ?? `node-${n.length}`,
			status: t.status ?? "healthy",
			role: t.role ?? "worker",
			region: e,
			cpu: t.cpu ?? 0,
			memoryMb: t.memoryMb ?? 0,
			connections: t.connections ?? 0,
			activeRuns: t.activeRuns ?? 0,
			cpuHistory: t.cpuHistory ?? []
		});
	}
	return n;
}
function be({ source: e }) {
	if (e === null || e === "bridge") return null;
	let t = e === "error";
	return /* @__PURE__ */ O("span", {
		"data-testid": "pipeline-metrics-source-pill",
		"data-source": e,
		title: t ? "/api/pipelines/metrics returned an error — values are placeholders" : "No pipeline bridge wired — metrics are synthesized fixture data",
		className: n("inline-block px-2 py-0.5 rounded-sm text-[11px] font-semibold", t ? "bg-danger-bg text-state-failed" : "bg-warning-bg text-state-awaiting"),
		children: t ? "metrics error" : "demo data"
	});
}
function xe({ live: e, onChange: t }) {
	return /* @__PURE__ */ k("button", {
		"data-testid": "live-toggle",
		onClick: () => t(!e),
		className: n("inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold", "rounded-md cursor-pointer font-[inherit]", e ? "bg-surface border border-primary text-primary" : "bg-surface-inset border border-border text-text-secondary"),
		children: [/* @__PURE__ */ O("span", { className: n("w-2 h-2 rounded-full", e ? "bg-success" : "bg-text-tertiary") }), e ? "Live" : "Paused"]
	});
}
function Se({ nodes: e, healthyCount: t, totalCount: r, onSelect: i }) {
	let a = t === r;
	return /* @__PURE__ */ k("div", {
		className: "bg-surface border border-border rounded-[10px] p-4 font-[inherit]",
		children: [/* @__PURE__ */ k("div", {
			className: "flex justify-between items-center mb-3",
			children: [/* @__PURE__ */ O("div", {
				className: "text-sm font-semibold text-text-primary mb-0 font-[inherit]",
				children: "Cluster health"
			}), /* @__PURE__ */ k("span", {
				"data-testid": "cluster-health-chip",
				className: n("inline-block px-2 py-0.5 rounded-sm text-[11px] font-semibold", a ? "bg-success-bg text-state-completed" : "bg-warning-bg text-state-awaiting"),
				children: [
					t,
					"/",
					r,
					" ",
					a ? "✓" : "!"
				]
			})]
		}), e.length > 0 ? /* @__PURE__ */ O(B, {
			nodes: e,
			onSelect: i
		}) : /* @__PURE__ */ k("div", {
			"data-testid": "cluster-health-no-telemetry",
			className: "p-4 text-center text-text-tertiary text-[13px]",
			children: [
				"No per-node telemetry in this dashboard payload — ",
				r,
				" node",
				r === 1 ? "" : "s",
				" reported, ",
				t,
				" healthy."
			]
		})]
	});
}
function Ce({ events: e, onViewAll: t }) {
	return /* @__PURE__ */ k("div", {
		className: "bg-surface border border-border rounded-[10px] p-4 font-[inherit]",
		children: [/* @__PURE__ */ k("div", {
			className: "flex justify-between items-center mb-2",
			children: [/* @__PURE__ */ O("div", {
				className: "text-sm font-semibold text-text-primary font-[inherit]",
				children: "Recent events (last 20)"
			}), /* @__PURE__ */ O("button", {
				"data-testid": "recent-events-view-all",
				onClick: t,
				className: "bg-transparent border-none text-primary text-xs font-semibold cursor-pointer font-[inherit]",
				children: "▸ view all"
			})]
		}), e.length === 0 ? /* @__PURE__ */ O("div", {
			className: "p-4 text-center text-text-tertiary text-[13px]",
			children: "No recent events"
		}) : /* @__PURE__ */ O("div", {
			className: "flex flex-col gap-0.5",
			children: e.slice(0, 20).map((e) => /* @__PURE__ */ O(u, {
				timestamp: e.timestamp,
				type: e.type,
				summary: e.summary,
				severity: e.severity
			}, e.id))
		})]
	});
}
function we({ activeRuns: e } = {}) {
	let t = j(), r = T(null), { live: i, setLive: a, recentEvents: o, activeRunsCount: s, isLiveData: c, unauthorized: l } = y(), u = N() ?? b, { metrics: d, source: f } = ae(), p = u?.overview ?? {}, m = w(() => ye(u), [u]), h = d?.runsStarted ?? V, g = [], _ = s > 0 ? s : d?.runsActive ?? V, v = d?.runsAwaitingApproval ?? V, x = d?.runsFailed ?? V, S = ve(d?.avgFirstTokenLatencyMs ?? null), C = Array.isArray(u?.alerts) ? u.alerts : [], E = () => {
		r.current?.scrollIntoView({
			behavior: "smooth",
			block: "start"
		});
	}, D = () => {
		t("/pipelines");
	};
	return /* @__PURE__ */ k("div", {
		"data-testid": "observability-dashboard",
		className: "p-6 flex flex-col gap-4 font-sans text-[13px] text-text-primary bg-surface-panel min-h-full",
		children: [
			/* @__PURE__ */ k("div", {
				className: "flex justify-between items-center",
				children: [/* @__PURE__ */ O("h1", {
					className: "text-lg font-bold text-text-primary m-0 leading-[1.3]",
					children: "Dashboard"
				}), /* @__PURE__ */ k("div", {
					className: "flex items-center gap-2",
					children: [
						/* @__PURE__ */ O("span", {
							"data-testid": "dashboard-data-source",
							title: c ? "Connected to /api/observability/dashboard" : l ? "Not authorized to read /api/observability/dashboard — the numbers below are fixture data, NOT your cluster. Sign in or supply a token to ObservabilityProvider." : "Backend unreachable — using fixture data",
							className: n("text-[11px] font-semibold", c ? "text-state-completed" : l ? "text-danger-fg bg-danger-bg border border-danger-border rounded-sm px-1.5 py-0.5" : "text-text-tertiary"),
							children: c ? "live data" : l ? "not authorized — fixture" : "fixture"
						}),
						/* @__PURE__ */ O(be, { source: f }),
						/* @__PURE__ */ O(xe, {
							live: i,
							onChange: a
						})
					]
				})]
			}),
			/* @__PURE__ */ O(L, {
				runsToday: h,
				runsSparkline: g,
				activeNow: _,
				pendingApprovals: v,
				failed24h: x,
				avgFirstTokenLatency: S,
				onScrollToActive: E,
				onGoToPipelines: D,
				onGoToFailedEvents: () => {
					t("/observability/events?filter=errors");
				}
			}),
			/* @__PURE__ */ O(Se, {
				nodes: m,
				healthyCount: p.healthyNodes ?? 0,
				totalCount: p.totalNodes ?? 0,
				onSelect: (e) => {
					t(`/observability/nodes?selected=${encodeURIComponent(e)}`);
				}
			}),
			/* @__PURE__ */ k("div", {
				ref: r,
				children: [/* @__PURE__ */ k("div", {
					className: "text-sm font-semibold text-text-primary mb-2 font-[inherit]",
					children: ["Active runs", e ? ` (${e.length})` : ""]
				}), e ? /* @__PURE__ */ O(de, {
					runs: e,
					onRowClick: (e) => t(`/pipelines/${e.pipelineId}/runs/${e.runId}`)
				}) : /* @__PURE__ */ k("div", {
					"data-testid": "active-runs-not-wired",
					className: "bg-surface border border-border rounded-[10px] p-4 text-center text-text-tertiary text-[13px]",
					children: [
						"No active-run source is wired to this dashboard.",
						" ",
						/* @__PURE__ */ O("button", {
							"data-testid": "active-runs-go-to-pipelines",
							onClick: D,
							className: "bg-transparent border-none text-primary text-[13px] font-semibold cursor-pointer font-[inherit] p-0",
							children: "Open Pipelines"
						}),
						" ",
						"to see runs in progress."
					]
				})]
			}),
			/* @__PURE__ */ O(Ce, {
				events: o,
				onViewAll: () => {
					t("/observability/events");
				}
			}),
			/* @__PURE__ */ k("div", { children: [/* @__PURE__ */ k("div", {
				className: "text-sm font-semibold text-text-primary mb-2 font-[inherit]",
				children: [
					"Alerts (",
					C.length,
					")"
				]
			}), /* @__PURE__ */ O(_e, { alerts: C })] })
		]
	});
}
//#endregion
//#region src/components/observability/hooks/useMetricsHistory.ts
function Te(e = 60) {
	let { dashboard: t } = y(), [n, r] = E([]);
	return S(() => {
		t && r((n) => [...n, t].slice(-e));
	}, [t, e]), n;
}
//#endregion
//#region src/components/observability/hooks/usePipelineModuleDashboard.ts
var Ee = "", De = 1e4;
function Oe() {
	let [e, t] = E(null), [n, r] = E(!0), [i, a] = E(null), o = T(!1), s = x(async () => {
		try {
			let e = await fetch(`${Ee}/api/pipelines/dashboard-data`, { credentials: "same-origin" });
			if (!e.ok) {
				let t = (await e.json().catch(() => null))?.error ?? `HTTP ${e.status}`;
				o.current || a(t);
				return;
			}
			let n = await e.json();
			o.current || (t(n), a(null));
		} catch (e) {
			let t = e instanceof Error ? e.message : String(e);
			o.current || a(t);
		} finally {
			o.current || r(!1);
		}
	}, []);
	return S(() => {
		o.current = !1, s();
		let e = window.setInterval(() => {
			document.hidden || s();
		}, De);
		return () => {
			o.current = !0, window.clearInterval(e);
		};
	}, [s]), {
		data: e,
		loading: n,
		error: i,
		refresh: s
	};
}
//#endregion
//#region src/components/observability/components/MetricCard.tsx
function H({ title: e, timeRange: t, children: r, onMaximize: i, sample: a }) {
	return /* @__PURE__ */ k("div", {
		"data-testid": "metric-card",
		className: n("bg-surface border border-border rounded-[10px] p-4", "flex flex-col gap-2.5 font-[inherit]"),
		children: [/* @__PURE__ */ k("div", {
			className: "flex items-center justify-between gap-2",
			children: [/* @__PURE__ */ O("div", {
				className: "text-[13px] font-semibold text-text-primary overflow-hidden text-ellipsis whitespace-nowrap",
				title: e,
				children: e
			}), /* @__PURE__ */ k("div", {
				className: "flex items-center gap-1.5",
				children: [
					a && /* @__PURE__ */ O("span", {
						"data-testid": "metric-card-sample-chip",
						title: "Synthesized sample series — this chart has no live data source yet",
						className: "inline-block px-2 py-0.5 rounded-sm text-[11px] font-semibold bg-warning-bg text-state-awaiting leading-[1.4] whitespace-nowrap",
						children: "sample"
					}),
					t && /* @__PURE__ */ O("span", {
						className: "inline-block px-2 py-0.5 rounded-sm text-[11px] font-semibold bg-surface-hover text-text-secondary leading-[1.4] whitespace-nowrap",
						children: t
					}),
					i && /* @__PURE__ */ O("button", {
						"data-testid": "metric-card-maximize",
						onClick: i,
						"aria-label": `Maximize ${e}`,
						className: "border-none bg-transparent text-text-tertiary cursor-pointer text-sm px-1 py-0.5 font-[inherit]",
						children: "⛶"
					})
				]
			})]
		}), /* @__PURE__ */ O("div", {
			className: "flex-1",
			children: r
		})]
	});
}
//#endregion
//#region src/components/observability/components/MetricTimeSeriesPanel.tsx
var U = [
	{
		value: "15m",
		label: "Last 15m"
	},
	{
		value: "1h",
		label: "Last 1h"
	},
	{
		value: "24h",
		label: "Last 24h"
	},
	{
		value: "7d",
		label: "Last 7d"
	}
], ke = [
	{
		value: "off",
		label: "Off"
	},
	{
		value: "5s",
		label: "5s"
	},
	{
		value: "30s",
		label: "30s"
	},
	{
		value: "60s",
		label: "60s"
	}
];
function W({ seeds: e, liveSeries: t, cols: r, isLiveData: s, failedColor: c, onResetZoom: l, onExportCsv: u, timeRange: d, onTimeRangeChange: f, refreshInterval: p, onRefreshIntervalChange: m }) {
	let g = d !== void 0 && f !== void 0, _ = p !== void 0 && m !== void 0, v = g ? U.find((e) => e.value === d)?.label ?? "" : void 0, y = (e) => e == null;
	return /* @__PURE__ */ k(D, { children: [/* @__PURE__ */ k("div", {
		className: "flex items-center gap-3 px-4 py-2.5 border-b border-border bg-surface-panel",
		children: [
			g && /* @__PURE__ */ O(h, {
				"data-testid": "metrics-time-range",
				"aria-label": "Time range",
				value: d,
				onChange: (e) => f(e.target.value),
				className: "w-auto min-w-[120px]",
				options: U.map((e) => ({
					value: e.value,
					label: e.label
				}))
			}),
			_ && /* @__PURE__ */ O(h, {
				"data-testid": "metrics-refresh-interval",
				"aria-label": "Refresh interval",
				value: p,
				onChange: (e) => m(e.target.value),
				className: "w-auto min-w-[100px]",
				options: ke.map((e) => ({
					value: e.value,
					label: `Refresh: ${e.label}`
				}))
			}),
			l && /* @__PURE__ */ O("button", {
				"data-testid": "metrics-reset-zoom",
				onClick: l,
				className: "px-3 py-1.5 text-[13px] bg-transparent border-none text-text-secondary cursor-pointer font-[inherit] shrink-0",
				children: "Reset zoom"
			}),
			u && /* @__PURE__ */ O("button", {
				"data-testid": "metrics-export-csv",
				onClick: u,
				className: "px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-white border-none rounded-md cursor-pointer font-[inherit] shrink-0",
				children: "Export CSV"
			}),
			/* @__PURE__ */ k("div", {
				"data-testid": "metrics-data-source",
				className: "ml-auto flex items-center gap-3 text-[11px] text-text-tertiary",
				children: [/* @__PURE__ */ O("span", {
					title: s ? "Connected to /api/pipelines/metrics" : "Backend unreachable — using seeded fixture",
					className: n("font-semibold", s ? "text-state-completed" : "text-text-tertiary"),
					children: s ? "live" : "fixture"
				}), /* @__PURE__ */ k("span", { children: [
					r,
					" column",
					r === 1 ? "" : "s"
				] })]
			})
		]
	}), /* @__PURE__ */ k("div", {
		className: "gap-4 p-4 overflow-y-auto flex-1 grid",
		style: { gridTemplateColumns: `repeat(${r}, minmax(0, 1fr))` },
		children: [
			/* @__PURE__ */ O(H, {
				title: "Runs per minute",
				timeRange: v,
				sample: y(t?.runsPerMinute),
				children: /* @__PURE__ */ O(a, {
					series: t?.runsPerMinute ?? e.runsPerMinute,
					height: 180
				})
			}),
			/* @__PURE__ */ O(H, {
				title: "Step duration (p50/p95/p99)",
				timeRange: v,
				sample: !0,
				children: /* @__PURE__ */ O(i, {
					series: e.stepDuration,
					height: 180,
					yFormat: (e) => `${Math.round(e)}ms`
				})
			}),
			/* @__PURE__ */ O(H, {
				title: "LLM tokens",
				timeRange: v,
				sample: y(t?.llmTokens),
				children: /* @__PURE__ */ O(i, {
					series: t?.llmTokens ?? e.llmTokens,
					height: 180
				})
			}),
			/* @__PURE__ */ O(H, {
				title: "LLM cost",
				timeRange: v,
				sample: y(t?.llmCost),
				children: /* @__PURE__ */ O(i, {
					series: t?.llmCost ?? e.llmCost,
					height: 180,
					yFormat: (e) => `$${e.toFixed(2)}`
				})
			}),
			/* @__PURE__ */ O(H, {
				title: "Cluster CPU",
				timeRange: v,
				sample: !0,
				children: /* @__PURE__ */ O(i, {
					series: e.clusterCpu,
					height: 180,
					yFormat: (e) => `${Math.round(e)}%`
				})
			}),
			/* @__PURE__ */ O(H, {
				title: "Cluster memory",
				timeRange: v,
				sample: !0,
				children: /* @__PURE__ */ O(i, {
					series: e.clusterMemory,
					height: 180,
					yFormat: (e) => `${Math.round(e)}MB`
				})
			}),
			/* @__PURE__ */ O(H, {
				title: "Event rate",
				timeRange: v,
				sample: !0,
				children: /* @__PURE__ */ O(i, {
					series: e.eventRate,
					height: 180
				})
			}),
			/* @__PURE__ */ O(H, {
				title: "Active runs over time",
				timeRange: v,
				sample: y(t?.activeRuns),
				children: /* @__PURE__ */ O(i, {
					series: t?.activeRuns ?? e.activeRuns,
					height: 180
				})
			}),
			/* @__PURE__ */ O(H, {
				title: "Failure rate by type",
				timeRange: v,
				sample: !0,
				children: /* @__PURE__ */ O(o, {
					data: e.failureRate,
					xKey: "x",
					yKey: "total",
					color: c,
					height: 180
				})
			}),
			/* @__PURE__ */ O(H, {
				title: "Approval latency",
				timeRange: v,
				sample: !0,
				children: /* @__PURE__ */ O(i, {
					series: e.approvalLatency,
					height: 180,
					yFormat: (e) => `${Math.round(e)}s`
				})
			})
		]
	})] });
}
//#endregion
//#region src/components/observability/MetricsPage.tsx
function G(e, t = 30, n = 60) {
	let r = [], i = e;
	for (let e = 0; e < t; e++) i = (i * 9301 + 49297) % 233280, r.push(Math.abs(i % n));
	return r;
}
function K(e, t, n) {
	return {
		label: e,
		color: n,
		data: t.map((e, t) => ({
			x: t,
			y: e
		}))
	};
}
var q = {
	primary: "var(--color-primary)",
	completed: "var(--color-success)",
	failed: "var(--color-danger)"
};
function Ae() {
	return {
		runsPerMinute: [
			K("started", G(3, 30, 40), q.primary),
			K("completed", G(7, 30, 40), q.completed),
			K("failed", G(11, 30, 20), q.failed)
		],
		stepDuration: [
			K("p50", G(17, 30, 400)),
			K("p95", G(23, 30, 800)),
			K("p99", G(29, 30, 1200))
		],
		llmTokens: [K("input", G(31, 30, 2e3)), K("output", G(37, 30, 1e3))],
		llmCost: [K("USD", G(41, 30, 5))],
		clusterCpu: [
			K("node-0", G(43, 30, 40)),
			K("node-1", G(47, 30, 40)),
			K("node-2", G(53, 30, 40))
		],
		clusterMemory: [
			K("node-0", G(59, 30, 512)),
			K("node-1", G(61, 30, 512)),
			K("node-2", G(67, 30, 512))
		],
		eventRate: [K("events/s", G(71, 30, 20))],
		activeRuns: [K("active", G(73, 30, 10))],
		failureRate: (() => {
			let e = G(79, 30, 15), t = G(83, 30, 15), n = G(89, 30, 15);
			return e.map((r, i) => ({
				x: i,
				llm: e[i],
				http: t[i],
				transform: n[i],
				total: e[i] + t[i] + n[i]
			}));
		})(),
		approvalLatency: [K("seconds", G(97, 30, 120))]
	};
}
function je() {
	let [e, t] = E(() => typeof window > "u" ? 2 : window.innerWidth >= 1600 ? 3 : 2);
	return S(() => {
		if (typeof window > "u") return;
		let e = () => {
			t(window.innerWidth >= 1600 ? 3 : 2);
		};
		return window.addEventListener("resize", e), () => window.removeEventListener("resize", e);
	}, []), e;
}
function Me() {
	let { data: e, loading: t, error: r } = Oe();
	return t && !e ? /* @__PURE__ */ O("div", {
		"data-testid": "modules-section-loading",
		className: "flex flex-col gap-2 px-4 py-3 bg-surface border border-border rounded-[10px] mb-4",
		children: /* @__PURE__ */ O("span", {
			className: "text-[11px] font-semibold text-text-tertiary uppercase tracking-[0.5px]",
			children: "Loading active modules…"
		})
	}) : e ? /* @__PURE__ */ k("div", {
		"data-testid": "modules-section",
		className: "flex flex-col gap-2 px-4 py-3 bg-surface border border-border rounded-[10px] mb-4",
		children: [
			/* @__PURE__ */ k("div", {
				className: "flex items-baseline gap-3",
				children: [/* @__PURE__ */ O("span", {
					className: "text-sm font-bold text-text-primary",
					children: e.moduleName
				}), /* @__PURE__ */ k("span", {
					className: "text-[11px] font-semibold text-text-tertiary uppercase tracking-[0.5px]",
					children: [
						e.source,
						" · ",
						e.state
					]
				})]
			}),
			/* @__PURE__ */ k("div", {
				className: "flex gap-4 flex-wrap",
				children: [
					/* @__PURE__ */ k("div", {
						className: "flex flex-col gap-0.5 min-w-[110px]",
						children: [/* @__PURE__ */ O("span", {
							className: "text-[11px] text-text-tertiary",
							children: "Total"
						}), /* @__PURE__ */ O("span", {
							className: "text-lg font-bold text-text-primary",
							children: e.summary.totalResources
						})]
					}),
					/* @__PURE__ */ k("div", {
						className: "flex flex-col gap-0.5 min-w-[110px]",
						children: [/* @__PURE__ */ O("span", {
							className: "text-[11px] text-text-tertiary",
							children: "Healthy"
						}), /* @__PURE__ */ O("span", {
							className: "text-lg font-bold text-text-primary",
							children: e.summary.healthyResources
						})]
					}),
					/* @__PURE__ */ k("div", {
						className: "flex flex-col gap-0.5 min-w-[110px]",
						children: [/* @__PURE__ */ O("span", {
							className: "text-[11px] text-text-tertiary",
							children: "Active"
						}), /* @__PURE__ */ O("span", {
							className: "text-lg font-bold text-text-primary",
							children: e.summary.activeConnections
						})]
					}),
					/* @__PURE__ */ k("div", {
						className: "flex flex-col gap-0.5 min-w-[110px]",
						children: [/* @__PURE__ */ O("span", {
							className: "text-[11px] text-text-tertiary",
							children: "Throughput"
						}), /* @__PURE__ */ O("span", {
							className: "text-lg font-bold text-text-primary",
							children: e.summary.throughput
						})]
					})
				]
			}),
			e.alerts && e.alerts.length > 0 ? /* @__PURE__ */ O("div", {
				"data-testid": "modules-section-alerts",
				className: "flex flex-col gap-1",
				children: e.alerts.map((e, t) => /* @__PURE__ */ k("div", {
					className: n("text-xs px-2.5 py-1.5 rounded-md bg-surface-inset", e.level === "critical" || e.level === "error" ? "text-state-failed" : "text-text-primary"),
					children: [
						"[",
						e.level,
						"] ",
						e.message
					]
				}, t))
			}) : null
		]
	}) : /* @__PURE__ */ O("div", {
		"data-testid": "modules-section-error",
		className: "flex flex-col gap-2 px-4 py-3 bg-surface border border-border rounded-[10px] mb-4",
		children: /* @__PURE__ */ k("span", {
			className: "text-[11px] font-semibold text-text-tertiary uppercase tracking-[0.5px]",
			children: ["Active modules unavailable", r ? `: ${r}` : ""]
		})
	});
}
var Ne = {
	off: null,
	"5s": 5e3,
	"30s": 3e4,
	"60s": 6e4
};
function Pe() {
	let e = w(Ae, []), t = je(), [n, r] = E("30s");
	Te(60);
	let { metrics: i, isLiveData: a } = ae({ pollIntervalMs: Ne[n] }), [o, s] = E([]);
	S(() => {
		i && s((e) => [...e, i].slice(-30));
	}, [i]);
	let c = w(() => {
		if (o.length < 2) return null;
		let e = (e) => {
			let t = [];
			return o.forEach((n, r) => {
				let i = n[e];
				typeof i == "number" && Number.isFinite(i) && t.push({
					x: r,
					y: i
				});
			}), t;
		}, t = (e) => e.length >= 2, n = e("runsActive"), r = e("llmTokensIn"), i = e("llmTokensOut"), a = e("estimatedCostUsd"), s = e("runsStarted"), c = e("runsCompleted"), l = e("runsFailed");
		return {
			activeRuns: t(n) ? [{
				label: "active",
				data: n
			}] : null,
			llmTokens: t(r) && t(i) ? [{
				label: "input",
				data: r
			}, {
				label: "output",
				data: i
			}] : null,
			llmCost: t(a) ? [{
				label: "USD",
				data: a
			}] : null,
			runsPerMinute: t(s) && t(c) && t(l) ? [
				{
					label: "started",
					color: q.primary,
					data: s
				},
				{
					label: "completed",
					color: q.completed,
					data: c
				},
				{
					label: "failed",
					color: q.failed,
					data: l
				}
			] : null
		};
	}, [o]);
	return /* @__PURE__ */ k("div", {
		"data-testid": "metrics-page",
		className: "flex flex-col h-full min-h-0 font-[inherit] text-[13px] text-text-primary bg-surface",
		children: [/* @__PURE__ */ O(W, {
			seeds: e,
			liveSeries: c,
			cols: t,
			isLiveData: a,
			failedColor: q.failed,
			refreshInterval: n,
			onRefreshIntervalChange: r
		}), /* @__PURE__ */ O(Me, {})]
	});
}
//#endregion
//#region src/components/observability/components/EventTimeline.tsx
function Fe({ events: e, selectedId: t, onSelect: r, live: i = !1 }) {
	let a = T(null), [o, s] = E(!1);
	return S(() => {
		if (!i || o) return;
		let e = a.current;
		e && (e.scrollTop = e.scrollHeight);
	}, [
		e,
		i,
		o
	]), e.length === 0 ? /* @__PURE__ */ O("div", {
		className: "flex-1 flex",
		children: /* @__PURE__ */ O(l, {
			icon: "📡",
			title: "No events yet",
			body: "Trigger a pipeline to see activity here."
		})
	}) : /* @__PURE__ */ k("div", {
		"data-testid": "event-timeline",
		className: "relative flex-1 min-h-0 flex",
		children: [/* @__PURE__ */ O("div", {
			ref: a,
			onScroll: () => {
				let e = a.current;
				if (!e) return;
				let t = e.scrollHeight - e.scrollTop - e.clientHeight < 24;
				s(!t);
			},
			className: "flex-1 overflow-y-auto py-1.5 font-[inherit]",
			children: e.map((e) => /* @__PURE__ */ O(u, {
				timestamp: e.timestamp,
				type: e.type,
				summary: e.summary,
				severity: e.severity,
				selected: e.id === t,
				onClick: r ? () => r(e.id) : void 0
			}, e.id))
		}), i && o && /* @__PURE__ */ O("button", {
			"data-testid": "jump-to-live",
			onClick: () => {
				let e = a.current;
				e && (e.scrollTop = e.scrollHeight, s(!1));
			},
			className: n("absolute bottom-3 left-1/2 -translate-x-1/2", "px-3.5 py-1.5 text-xs font-semibold", "bg-primary text-white", "border-none rounded-full cursor-pointer", "shadow-[0_2px_8px_rgba(0,0,0,0.15)] font-[inherit]"),
			children: "Jump to live ↓"
		})]
	});
}
//#endregion
//#region src/components/observability/components/EventDetailPane.tsx
function Ie(e) {
	try {
		return JSON.stringify(e, null, 2);
	} catch {
		return String(e);
	}
}
function Le({ event: e }) {
	if (!e) return /* @__PURE__ */ O("div", {
		"data-testid": "event-detail-empty",
		className: n("flex items-center justify-center h-full text-[13px] text-text-tertiary", "p-6 text-center font-[inherit]"),
		children: "Select an event to see details"
	});
	let t = Ie(e.payload ?? e);
	return /* @__PURE__ */ k("div", {
		"data-testid": "event-detail-pane",
		className: "flex flex-col h-full font-[inherit] bg-surface",
		children: [
			/* @__PURE__ */ k("div", {
				className: "px-3.5 py-3 border-b border-border flex flex-col gap-1",
				children: [/* @__PURE__ */ O("div", {
					className: "text-[13px] font-semibold text-text-primary",
					children: e.type
				}), /* @__PURE__ */ O("div", {
					className: "text-[11px] text-text-tertiary",
					children: e.timestamp
				})]
			}),
			/* @__PURE__ */ k("div", {
				className: "px-3.5 py-2.5 flex gap-2 border-b border-border",
				children: [/* @__PURE__ */ O("button", {
					"data-testid": "event-detail-copy",
					onClick: () => {
						typeof navigator < "u" && navigator.clipboard && navigator.clipboard.writeText(t).catch(() => {
							console.warn("[EventDetailPane] clipboard copy failed");
						});
					},
					className: n("px-2.5 py-[5px] text-xs font-semibold", "bg-surface-hover text-text-secondary", "border border-border rounded-md", "cursor-pointer font-[inherit]"),
					children: "Copy"
				}), /* @__PURE__ */ O("button", {
					"data-testid": "event-detail-download",
					onClick: () => {
						if (typeof window > "u") return;
						let n = new Blob([t], { type: "application/json" }), r = URL.createObjectURL(n), i = document.createElement("a");
						i.href = r, i.download = `${e.type}-${e.id}.json`, document.body.appendChild(i), i.click(), document.body.removeChild(i), URL.revokeObjectURL(r);
					},
					className: n("px-2.5 py-[5px] text-xs font-semibold", "bg-surface-hover text-text-secondary", "border border-border rounded-md", "cursor-pointer font-[inherit]"),
					children: "Download"
				})]
			}),
			/* @__PURE__ */ O("pre", {
				className: n("m-0 px-3.5 py-3 flex-1 overflow-auto", "bg-surface-inset font-mono text-xs text-text-primary", "leading-normal whitespace-pre [tab-size:2]"),
				children: t
			})
		]
	});
}
//#endregion
//#region src/components/observability/EventsPage.tsx
var J = 500, Re = [
	"All",
	"Errors",
	"LLM",
	"Approvals",
	"Lifecycle"
], ze = [
	{
		value: "15m",
		label: "Last 15m"
	},
	{
		value: "1h",
		label: "Last 1h"
	},
	{
		value: "6h",
		label: "Last 6h"
	},
	{
		value: "24h",
		label: "Last 24h"
	}
], Be = {
	"15m": 9e5,
	"1h": 36e5,
	"6h": 216e5,
	"24h": 864e5
}, Y = [
	"node-0",
	"node-1",
	"node-2"
], Ve = [
	"info",
	"warning",
	"error",
	"success"
];
function He(e) {
	return e.includes("failed") || e.includes("error") ? "error" : e.includes("completed") ? "success" : e.includes("warn") || e.includes("awaiting") ? "warning" : "info";
}
function Ue(e) {
	return e.includes("failed") || e.includes("error") ? "Errors" : e.startsWith("llm.") || e.includes(".llm.") ? "LLM" : e.includes("approval") ? "Approvals" : (e.includes("run.") || e.includes("pipeline."), "Lifecycle");
}
function We(e, t) {
	if (t && typeof t == "object") {
		let e = t, n = [];
		if (typeof e.runId == "string" && n.push(`run ${e.runId}`), typeof e.pipelineId == "string" && n.push(`pipeline ${e.pipelineId}`), typeof e.nodeId == "string" && n.push(`node ${e.nodeId}`), n.length > 0) return n.join(" · ");
	}
	return e;
}
function Ge(e = /* @__PURE__ */ new Date()) {
	return `${String(e.getHours()).padStart(2, "0")}:${String(e.getMinutes()).padStart(2, "0")}:${String(e.getSeconds()).padStart(2, "0")}.${String(e.getMilliseconds()).padStart(3, "0")}`;
}
var Ke = {
	groups: /* @__PURE__ */ new Set(["All"]),
	runIds: "",
	pipelineIds: "",
	nodes: new Set(Y),
	severities: new Set(Ve),
	timeRange: "1h"
};
function qe() {
	let [e, t] = E([]), [r, i] = E(null), [a, o] = E(!1), [s, c] = E(Ke), [l, u] = E(!1), d = C(), p = T(a);
	p.current = a;
	let m = T(0), _ = x((e) => {
		if (p.current) return;
		let n = e, r = n?.eventType ?? "unknown", i = n?.payload ?? n;
		m.current += 1;
		let a = Date.now(), o = {
			id: `ev-${a}-${m.current}`,
			timestamp: Ge(new Date(a)),
			receivedAt: a,
			type: r,
			summary: We(r, i),
			severity: He(r),
			payload: i
		};
		t((e) => {
			let t = [...e, o];
			return t.length > J ? t.slice(t.length - J) : t;
		});
	}, []);
	v("*", _);
	let y = w(() => {
		let t = s.runIds.split(",").map((e) => e.trim()).filter(Boolean), n = s.pipelineIds.split(",").map((e) => e.trim()).filter(Boolean), r = s.groups.has("All"), i = Date.now() - Be[s.timeRange];
		return e.filter((e) => {
			if (typeof e.receivedAt == "number" && e.receivedAt < i) return !1;
			if (!r) {
				let t = Ue(e.type);
				if (!s.groups.has(t)) return !1;
			}
			if (e.severity && !s.severities.has(e.severity)) return !1;
			if (t.length > 0) {
				let n = e.payload?.runId;
				if (!n || !t.some((e) => n.includes(e))) return !1;
			}
			if (n.length > 0) {
				let t = e.payload?.pipelineId;
				if (!t || !n.some((e) => t.includes(e))) return !1;
			}
			let a = e.payload?.nodeId;
			return !(a && !s.nodes.has(a));
		});
	}, [e, s]), b = w(() => y.find((e) => e.id === r) ?? null, [y, r]), S = (e) => {
		c((t) => {
			let n = new Set(t.groups);
			return n.has(e) ? n.delete(e) : n.add(e), {
				...t,
				groups: n
			};
		});
	}, A = (e) => {
		c((t) => {
			let n = new Set(t.nodes);
			return n.has(e) ? n.delete(e) : n.add(e), {
				...t,
				nodes: n
			};
		});
	}, j = (e) => {
		c((t) => {
			let n = new Set(t.severities);
			return n.has(e) ? n.delete(e) : n.add(e), {
				...t,
				severities: n
			};
		});
	};
	return /* @__PURE__ */ k("div", {
		"data-testid": "events-page",
		className: "flex flex-col h-full min-h-0 font-[inherit] text-[13px] text-text-primary bg-surface",
		children: [/* @__PURE__ */ k("div", {
			className: "flex items-center gap-3 px-4 py-2.5 border-b border-border bg-surface-panel",
			children: [
				/* @__PURE__ */ O("button", {
					onClick: () => o((e) => !e),
					"data-testid": "events-live-toggle",
					className: n("px-3 py-[5px] text-xs font-semibold rounded-md cursor-pointer font-[inherit]", a ? "bg-surface-hover text-text-secondary border border-border" : "bg-state-completed text-white border border-state-completed"),
					children: a ? "■ Paused" : "● Live"
				}),
				/* @__PURE__ */ O(h, {
					"data-testid": "events-time-range",
					"aria-label": "Time range",
					value: s.timeRange,
					onChange: (e) => c((t) => ({
						...t,
						timeRange: e.target.value
					})),
					className: "w-auto min-w-[120px]",
					options: ze.map((e) => ({
						value: e.value,
						label: e.label
					}))
				}),
				/* @__PURE__ */ k("div", {
					className: "ml-auto text-xs text-text-tertiary",
					children: [
						y.length,
						" / ",
						e.length,
						" event",
						e.length === 1 ? "" : "s"
					]
				})
			]
		}), /* @__PURE__ */ k("div", {
			className: "flex flex-1 min-h-0",
			children: [
				/* @__PURE__ */ k("aside", {
					"data-testid": "events-filter-rail",
					className: n("shrink-0 border-r border-border bg-surface-panel overflow-y-auto transition-[width] duration-150 ease-in-out", l ? "w-9" : "w-60"),
					children: [/* @__PURE__ */ k("div", {
						className: "flex items-center justify-between px-3.5 py-2.5 border-b border-border",
						children: [!l && /* @__PURE__ */ O("div", {
							className: "text-[11px] font-bold tracking-[0.3px] text-text-secondary",
							children: "FILTERS"
						}), /* @__PURE__ */ O("button", {
							onClick: () => u((e) => !e),
							"aria-label": l ? "Expand filters" : "Collapse filters",
							className: "border-none bg-transparent text-text-tertiary cursor-pointer text-xs p-0.5 font-[inherit]",
							children: l ? "›" : "‹"
						})]
					}), !l && /* @__PURE__ */ k(D, { children: [
						/* @__PURE__ */ k("div", {
							role: "group",
							"aria-labelledby": `${d}-event-type`,
							className: "flex flex-col gap-1.5 px-3.5 py-3 border-b border-border",
							children: [/* @__PURE__ */ O("div", {
								id: `${d}-event-type`,
								className: "text-[11px] font-bold tracking-[0.3px] text-text-secondary uppercase",
								children: "Event type"
							}), Re.map((e) => /* @__PURE__ */ k("label", {
								className: "flex items-center gap-1.5 text-xs",
								children: [/* @__PURE__ */ O(g, {
									checked: s.groups.has(e),
									onChange: () => S(e)
								}), e]
							}, e))]
						}),
						/* @__PURE__ */ k("div", {
							className: "flex flex-col gap-1.5 px-3.5 py-3 border-b border-border",
							children: [/* @__PURE__ */ O("label", {
								htmlFor: `${d}-runs`,
								className: "text-[11px] font-bold tracking-[0.3px] text-text-secondary uppercase",
								children: "Runs"
							}), /* @__PURE__ */ O(f, {
								id: `${d}-runs`,
								"data-testid": "events-filter-runs",
								placeholder: "runId (comma-separated)",
								value: s.runIds,
								onChange: (e) => c((t) => ({
									...t,
									runIds: e.target.value
								})),
								className: "flex-1 min-w-[120px]"
							})]
						}),
						/* @__PURE__ */ k("div", {
							className: "flex flex-col gap-1.5 px-3.5 py-3 border-b border-border",
							children: [/* @__PURE__ */ O("label", {
								htmlFor: `${d}-pipelines`,
								className: "text-[11px] font-bold tracking-[0.3px] text-text-secondary uppercase",
								children: "Pipelines"
							}), /* @__PURE__ */ O(f, {
								id: `${d}-pipelines`,
								"data-testid": "events-filter-pipelines",
								placeholder: "pipelineId (comma-separated)",
								value: s.pipelineIds,
								onChange: (e) => c((t) => ({
									...t,
									pipelineIds: e.target.value
								})),
								className: "flex-1 min-w-[120px]"
							})]
						}),
						/* @__PURE__ */ k("div", {
							role: "group",
							"aria-labelledby": `${d}-nodes`,
							className: "flex flex-col gap-1.5 px-3.5 py-3 border-b border-border",
							children: [/* @__PURE__ */ O("div", {
								id: `${d}-nodes`,
								className: "text-[11px] font-bold tracking-[0.3px] text-text-secondary uppercase",
								children: "Nodes"
							}), Y.map((e) => /* @__PURE__ */ k("label", {
								className: "flex items-center gap-1.5 text-xs",
								children: [/* @__PURE__ */ O(g, {
									checked: s.nodes.has(e),
									onChange: () => A(e)
								}), e]
							}, e))]
						}),
						/* @__PURE__ */ k("div", {
							role: "group",
							"aria-labelledby": `${d}-severity`,
							className: "flex flex-col gap-1.5 px-3.5 py-3 border-b border-border",
							children: [/* @__PURE__ */ O("div", {
								id: `${d}-severity`,
								className: "text-[11px] font-bold tracking-[0.3px] text-text-secondary uppercase",
								children: "Severity"
							}), Ve.map((e) => /* @__PURE__ */ k("label", {
								className: "flex items-center gap-1.5 text-xs",
								children: [/* @__PURE__ */ O(g, {
									checked: s.severities.has(e),
									onChange: () => j(e)
								}), e]
							}, e))]
						}),
						/* @__PURE__ */ O("div", {
							className: "px-3.5 py-3",
							children: /* @__PURE__ */ O("button", {
								"data-testid": "events-clear-filters",
								onClick: () => c(Ke),
								className: "px-3 py-1.5 text-[13px] bg-transparent border-none text-text-secondary cursor-pointer font-[inherit] shrink-0",
								children: "Clear"
							})
						})
					] })]
				}),
				/* @__PURE__ */ O("section", {
					className: "flex-1 min-w-0 flex flex-col",
					children: /* @__PURE__ */ O(Fe, {
						events: y,
						selectedId: r,
						onSelect: i,
						live: !a
					})
				}),
				/* @__PURE__ */ O("aside", {
					className: "w-80 shrink-0 border-l border-border bg-surface",
					children: /* @__PURE__ */ O(Le, { event: b })
				})
			]
		})]
	});
}
function Je() {
	return /* @__PURE__ */ O(qe, {});
}
//#endregion
//#region src/components/pipelines/chaos/chaosState.ts
var Ye = {
	injectedLatencyMs: 0,
	injectedFailureRate: 0,
	paused: !1
}, X = { ...Ye }, Z = /* @__PURE__ */ new Set();
function Xe() {
	return X;
}
function Q(e) {
	X = {
		...X,
		...e
	}, Z.forEach((e) => {
		try {
			e(X);
		} catch (e) {
			console.error("[chaosState] listener threw", e);
		}
	});
}
function Ze() {
	Q(Ye);
}
function Qe(e) {
	return Z.add(e), () => {
		Z.delete(e);
	};
}
//#endregion
//#region src/components/observability/components/ChaosPanel.tsx
var $e = [
	{ id: "node-0" },
	{ id: "node-1" },
	{ id: "node-2" }
];
function et(e) {
	let { onInjectLatency: t = (e) => Q({ injectedLatencyMs: Math.max(0, e) }), onInjectPartition: r = (e) => Q({ paused: e.length > 0 }), onDropMessages: i = (e) => Q({ injectedFailureRate: Math.min(1, Math.max(0, e / 100)) }), onKillAll: a = () => Q({ paused: !0 }), onReset: o = () => Ze(), availableNodes: s = $e } = e, [l, u] = E("0"), [d, p] = E("0"), [m, h] = E([]), [_, v] = E(!1), y = C(), [b, x] = E(() => Xe());
	S(() => Qe((e) => x(e)), []);
	let T = (e) => {
		h((t) => t.includes(e) ? t.filter((t) => t !== e) : [...t, e]);
	}, A = () => {
		let e = Number.parseInt(l, 10);
		Number.isFinite(e) && t(e);
	}, j = () => {
		let e = Number.parseInt(d, 10);
		Number.isFinite(e) && i(e);
	}, M = () => {
		r(m);
	}, N = () => {
		a(), v(!1);
	}, P = () => {
		Q({ paused: !b.paused });
	}, F = w(() => s, [s]), ee = b.injectedLatencyMs > 0 || b.injectedFailureRate > 0 || b.paused;
	return /* @__PURE__ */ k("div", {
		"data-testid": "chaos-panel",
		className: "w-60 shrink-0 p-4 bg-surface-panel border-r border-border font-[inherit] text-[13px] text-text-primary overflow-y-auto",
		children: [
			/* @__PURE__ */ O("div", {
				className: "text-[11px] font-bold text-text-secondary tracking-[0.4px] mb-3",
				children: "CHAOS"
			}),
			/* @__PURE__ */ k("div", {
				"data-testid": "chaos-state-readout",
				className: n("flex flex-col gap-1.5 pb-3 mb-3 border-b border-border", ee && "bg-warning-bg p-2 rounded-md border border-warning-border"),
				children: [
					/* @__PURE__ */ O("div", {
						className: "text-[11px] font-semibold text-text-secondary uppercase tracking-[0.3px]",
						children: "Current state"
					}),
					/* @__PURE__ */ k("div", {
						className: "text-xs text-text-primary leading-relaxed",
						children: [
							/* @__PURE__ */ k("div", { children: [
								/* @__PURE__ */ O("span", {
									className: "text-text-tertiary",
									children: "Latency:"
								}),
								" ",
								/* @__PURE__ */ O("strong", {
									"data-testid": "chaos-state-latency",
									children: b.injectedLatencyMs
								}),
								" ms"
							] }),
							/* @__PURE__ */ k("div", { children: [
								/* @__PURE__ */ O("span", {
									className: "text-text-tertiary",
									children: "Failure rate:"
								}),
								" ",
								/* @__PURE__ */ O("strong", {
									"data-testid": "chaos-state-failure",
									children: Math.round(b.injectedFailureRate * 100)
								}),
								"%"
							] }),
							/* @__PURE__ */ k("div", { children: [
								/* @__PURE__ */ O("span", {
									className: "text-text-tertiary",
									children: "Paused:"
								}),
								" ",
								/* @__PURE__ */ O("strong", {
									"data-testid": "chaos-state-paused",
									children: b.paused ? "yes" : "no"
								})
							] })
						]
					}),
					/* @__PURE__ */ O("button", {
						"data-testid": "chaos-pause-toggle",
						onClick: P,
						className: "px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-white border-none rounded-md cursor-pointer font-[inherit] shrink-0",
						children: b.paused ? "Resume" : "Pause"
					})
				]
			}),
			/* @__PURE__ */ k("div", {
				className: "flex flex-col gap-1.5 pb-3 mb-3 border-b border-border",
				children: [
					/* @__PURE__ */ O("div", {
						className: "text-[11px] font-semibold text-text-secondary uppercase tracking-[0.3px]",
						children: "Latency"
					}),
					/* @__PURE__ */ k("div", {
						className: "flex gap-1.5",
						children: [/* @__PURE__ */ O(f, {
							"data-testid": "chaos-latency-input",
							type: "number",
							min: 0,
							value: l,
							onChange: (e) => u(e.target.value),
							className: "flex-1 min-w-[60px]",
							"aria-label": "Latency in milliseconds"
						}), /* @__PURE__ */ O("span", {
							className: "text-[11px] text-text-tertiary self-center",
							children: "ms"
						})]
					}),
					/* @__PURE__ */ O("button", {
						"data-testid": "chaos-latency-apply",
						onClick: A,
						className: "px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-white border-none rounded-md cursor-pointer font-[inherit] shrink-0",
						children: "Apply"
					})
				]
			}),
			/* @__PURE__ */ k("div", {
				role: "group",
				"aria-labelledby": `${y}-partition`,
				className: "flex flex-col gap-1.5 pb-3 mb-3 border-b border-border",
				children: [
					/* @__PURE__ */ O("div", {
						id: `${y}-partition`,
						className: "text-[11px] font-semibold text-text-secondary uppercase tracking-[0.3px]",
						children: "Partition nodes"
					}),
					/* @__PURE__ */ O("div", {
						className: "flex flex-col gap-1",
						children: F.map((e) => /* @__PURE__ */ k("label", {
							className: "flex items-center gap-1.5 text-xs text-text-primary cursor-pointer",
							children: [/* @__PURE__ */ O(g, {
								checked: m.includes(e.id),
								onChange: () => T(e.id)
							}), e.label ?? e.id]
						}, e.id))
					}),
					/* @__PURE__ */ O("button", {
						"data-testid": "chaos-partition-inject",
						onClick: M,
						className: n("px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-white border-none rounded-md font-[inherit] shrink-0", m.length === 0 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"),
						disabled: m.length === 0,
						children: "Inject"
					})
				]
			}),
			/* @__PURE__ */ k("div", {
				className: "flex flex-col gap-1.5 pb-3 mb-3 border-b border-border",
				children: [
					/* @__PURE__ */ O("div", {
						className: "text-[11px] font-semibold text-text-secondary uppercase tracking-[0.3px]",
						children: "Drop messages"
					}),
					/* @__PURE__ */ k("div", {
						className: "flex gap-1.5",
						children: [/* @__PURE__ */ O(f, {
							"data-testid": "chaos-drop-input",
							type: "number",
							min: 0,
							max: 100,
							value: d,
							onChange: (e) => p(e.target.value),
							className: "flex-1 min-w-[60px]",
							"aria-label": "Drop percent"
						}), /* @__PURE__ */ O("span", {
							className: "text-[11px] text-text-tertiary self-center",
							children: "%"
						})]
					}),
					/* @__PURE__ */ O("button", {
						"data-testid": "chaos-drop-apply",
						onClick: j,
						className: "px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-white border-none rounded-md cursor-pointer font-[inherit] shrink-0",
						children: "Apply"
					})
				]
			}),
			/* @__PURE__ */ k("div", {
				className: "flex flex-col gap-2",
				children: [/* @__PURE__ */ O("button", {
					"data-testid": "chaos-kill-all",
					onClick: () => v(!0),
					className: "px-3.5 py-1.5 text-[13px] font-semibold bg-state-failed text-white border-none rounded-md cursor-pointer font-[inherit]",
					children: "Kill all"
				}), /* @__PURE__ */ O("button", {
					"data-testid": "chaos-reset",
					onClick: o,
					className: "px-3 py-1.5 text-[13px] bg-transparent border-none text-text-secondary cursor-pointer font-[inherit] shrink-0",
					children: "Reset"
				})]
			}),
			/* @__PURE__ */ O(c, {
				open: _,
				onClose: () => v(!1),
				title: "Kill all nodes?",
				footer: /* @__PURE__ */ k(D, { children: [/* @__PURE__ */ O("button", {
					"data-testid": "chaos-kill-cancel",
					onClick: () => v(!1),
					className: "px-3 py-1.5 text-[13px] bg-transparent border-none text-text-secondary cursor-pointer font-[inherit] shrink-0",
					children: "Cancel"
				}), /* @__PURE__ */ O("button", {
					"data-testid": "chaos-kill-confirm",
					onClick: N,
					className: "px-3.5 py-1.5 text-[13px] font-semibold bg-state-failed text-white border-none rounded-md cursor-pointer font-[inherit]",
					children: "Kill all"
				})] }),
				children: "This will terminate every node in the cluster. This action is destructive and cannot be undone."
			})
		]
	});
}
//#endregion
//#region src/components/observability/NodesPage.tsx
function $(e) {
	let t = [], n = e;
	for (let e = 0; e < 24; e++) n = (n * 9301 + 49297) % 233280, t.push(Math.abs(n % 40) + 5);
	return t;
}
function tt() {
	return [
		{
			id: "node-0",
			status: "healthy",
			role: "worker",
			region: "us-east-1",
			cpu: 12,
			memoryMb: 340,
			connections: 12,
			activeRuns: 2,
			cpuHistory: $(1)
		},
		{
			id: "node-1",
			status: "healthy",
			role: "worker",
			region: "us-east-1",
			cpu: 8,
			memoryMb: 280,
			connections: 15,
			activeRuns: 1,
			cpuHistory: $(7)
		},
		{
			id: "node-2",
			status: "healthy",
			role: "worker",
			region: "us-east-1",
			cpu: 19,
			memoryMb: 395,
			connections: 9,
			activeRuns: 0,
			cpuHistory: $(13)
		}
	];
}
function nt() {
	let e = b?.regions ?? {}, t = [];
	for (let n of Object.keys(e)) {
		let r = e[n];
		if (r?.nodes && Array.isArray(r.nodes)) for (let e of r.nodes) t.push({
			id: e.id ?? `node-${t.length}`,
			status: e.status ?? "healthy",
			role: e.role ?? "worker",
			region: n,
			cpu: e.cpu ?? 0,
			memoryMb: e.memoryMb ?? 0,
			connections: e.connections ?? 0,
			activeRuns: e.activeRuns ?? 0,
			cpuHistory: e.cpuHistory ?? $(t.length + 1)
		});
	}
	return t.length > 0 ? t : tt();
}
function rt(e) {
	return e >= 1024 ? `${(e / 1024).toFixed(1)}G` : `${Math.round(e)}M`;
}
function it({ nodes: e, onAddLatency: t, onKillNode: n, onTransferResource: r }) {
	let i = w(nt, []), a = e ?? i, [o, s] = E(null), c = w(() => a.find((e) => e.id === o) ?? null, [a, o]);
	return /* @__PURE__ */ k("div", {
		"data-testid": "nodes-page",
		className: "flex h-full min-h-0 font-[inherit] text-[13px] text-text-primary bg-surface",
		children: [
			/* @__PURE__ */ O("div", {
				title: "Stub: writes to local chaosState; real cluster injection ships in Phase 5",
				"data-testid": "chaos-rail-stub-wrapper",
				children: /* @__PURE__ */ O(et, { availableNodes: a.map((e) => ({
					id: e.id,
					label: e.id
				})) })
			}),
			/* @__PURE__ */ k("section", {
				className: "flex-1 min-w-0 overflow-auto p-6",
				children: [!e && /* @__PURE__ */ O("div", {
					"data-testid": "nodes-sample-banner",
					title: "No `nodes` prop supplied — these node summaries are synthesized sample data, not your cluster",
					className: "mb-4 px-3 py-2 rounded-md text-[12px] font-semibold bg-warning-bg text-warning-fg border border-warning-border",
					children: "Sample data — no node source is wired to this page. These nodes, their metrics and their history are synthesized."
				}), /* @__PURE__ */ O(B, {
					nodes: a,
					selectedId: o ?? void 0,
					onSelect: (e) => s(e === o ? null : e)
				})]
			}),
			c && /* @__PURE__ */ k("aside", {
				"data-testid": "nodes-detail-drawer",
				className: "w-80 shrink-0 border-l border-border bg-surface flex flex-col overflow-y-auto",
				children: [
					/* @__PURE__ */ k("div", {
						className: "px-3.5 py-3 border-b border-border flex items-center justify-between",
						children: [/* @__PURE__ */ k("div", {
							className: "flex flex-col",
							children: [/* @__PURE__ */ O("div", {
								className: "text-[13px] font-semibold",
								children: c.id
							}), /* @__PURE__ */ O("div", {
								className: "text-[11px] text-text-tertiary",
								children: [c.role, c.region].filter(Boolean).join(" · ") || "worker"
							})]
						}), /* @__PURE__ */ O("button", {
							"data-testid": "nodes-detail-close",
							onClick: () => s(null),
							"aria-label": "Close drawer",
							className: "border-none bg-transparent text-text-tertiary cursor-pointer text-base p-0.5 font-[inherit]",
							children: "×"
						})]
					}),
					/* @__PURE__ */ k("div", {
						className: "px-3.5 py-3 border-b border-border flex flex-col gap-2",
						children: [/* @__PURE__ */ O("div", {
							className: "text-[11px] font-bold tracking-[0.3px] text-text-secondary uppercase",
							children: "Metrics"
						}), /* @__PURE__ */ O("table", {
							className: "w-full text-xs border-collapse",
							children: /* @__PURE__ */ O("tbody", { children: [
								["Status", c.status],
								["CPU", `${Math.round(c.cpu)}%`],
								["Memory", rt(c.memoryMb)],
								["Connections", String(c.connections)],
								["Active runs", String(c.activeRuns)],
								["Region", c.region ?? "—"],
								["Role", c.role ?? "—"]
							].map(([e, t]) => /* @__PURE__ */ k("tr", { children: [/* @__PURE__ */ O("td", {
								className: "text-text-tertiary py-[3px] w-[45%]",
								children: e
							}), /* @__PURE__ */ O("td", {
								className: "text-text-primary py-[3px]",
								children: t
							})] }, e)) })
						})]
					}),
					/* @__PURE__ */ k("div", {
						className: "px-3.5 py-3 border-b border-border flex flex-col gap-2",
						children: [/* @__PURE__ */ O("div", {
							className: "text-[11px] font-bold tracking-[0.3px] text-text-secondary uppercase",
							children: "Owned resources"
						}), /* @__PURE__ */ O("div", {
							className: "text-xs text-text-tertiary",
							children: "No resources owned (Phase 1 placeholder)."
						})]
					}),
					(t || n) && /* @__PURE__ */ k("div", {
						className: "px-3.5 py-3 border-b border-border flex flex-col gap-2",
						children: [
							/* @__PURE__ */ O("div", {
								className: "text-[11px] font-bold tracking-[0.3px] text-text-secondary uppercase",
								children: "Chaos (this node)"
							}),
							t && /* @__PURE__ */ O("button", {
								onClick: () => t(c.id),
								className: "self-start px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-white border-none rounded-md cursor-pointer font-[inherit] shrink-0",
								children: "Add latency"
							}),
							n && /* @__PURE__ */ O("button", {
								onClick: () => n(c.id),
								className: "self-start px-3.5 py-1.5 text-[13px] font-semibold bg-state-failed text-white border-none rounded-md cursor-pointer font-[inherit]",
								children: "Kill node"
							})
						]
					}),
					r && /* @__PURE__ */ k("div", {
						className: "px-3.5 py-3 border-b border-border flex flex-col gap-2",
						children: [/* @__PURE__ */ O("div", {
							className: "text-[11px] font-bold tracking-[0.3px] text-text-secondary uppercase",
							children: "Actions"
						}), /* @__PURE__ */ O("button", {
							onClick: () => r(c.id),
							className: "px-3 py-1.5 text-[13px] bg-transparent border-none text-text-secondary cursor-pointer font-[inherit] shrink-0",
							children: "Transfer resource"
						})]
					})
				]
			})
		]
	});
}
//#endregion
//#region src/components/observability/components/MetricsGraph.tsx
function at({ title: e, data: t, series: r, yLabel: i, sparkWidth: a = 180, sparkHeight: o = 28 }) {
	let s = r && r.length > 0 ? r : t ? [{
		label: e,
		data: t,
		color: "var(--color-primary)"
	}] : [];
	return /* @__PURE__ */ k("div", {
		"data-testid": "metrics-graph",
		className: "flex flex-col gap-2 font-[inherit] text-[13px] text-text-primary",
		children: [/* @__PURE__ */ k("div", {
			className: "flex items-baseline justify-between gap-2",
			children: [/* @__PURE__ */ O("div", {
				className: "text-[13px] font-semibold text-text-primary",
				children: e
			}), i && /* @__PURE__ */ O("div", {
				className: "text-[11px] text-text-tertiary",
				children: i
			})]
		}), /* @__PURE__ */ O("div", {
			className: n("flex flex-col gap-1", "bg-surface-inset border border-border rounded-md px-3 py-2.5"),
			children: s.length === 0 ? /* @__PURE__ */ O("div", {
				className: "text-xs text-text-tertiary",
				children: "No data"
			}) : s.map((e) => /* @__PURE__ */ k("div", {
				className: "flex items-center gap-2.5",
				children: [/* @__PURE__ */ O("div", {
					className: "text-[11px] text-text-secondary w-20 shrink-0 overflow-hidden text-ellipsis whitespace-nowrap",
					title: e.label,
					children: e.label
				}), /* @__PURE__ */ O(d, {
					data: e.data,
					width: a,
					height: o,
					color: e.color ?? "var(--color-primary)"
				})]
			}, e.label))
		})]
	});
}
//#endregion
//#region src/components/observability/components/AlertItem.tsx
var ot = {
	critical: "var(--color-danger)",
	warning: "var(--color-warning)",
	info: "var(--color-info)"
}, st = {
	critical: "bg-[var(--color-danger-bg)]",
	warning: "bg-[var(--color-warning-bg)]",
	info: "bg-[var(--color-info-bg)]"
}, ct = {
	critical: "border-l-[var(--color-danger)]",
	warning: "border-l-[var(--color-warning)]",
	info: "border-l-[var(--color-info)]"
};
function lt({ severity: e, title: t, description: r, timestamp: i, resolved: a = !1, action: o, className: c, style: l, "data-testid": u = `alert-${e}` }) {
	return /* @__PURE__ */ k("div", {
		role: "listitem",
		"data-testid": u,
		"data-resolved": a || void 0,
		className: n("rounded-md px-3 py-2.5 border-l-[3px] transition-opacity duration-300", a ? "bg-[var(--color-surface-subtle,#f8fafc)] border-l-[var(--color-text-tertiary)] opacity-70" : n(st[e], ct[e]), c),
		style: l,
		children: [/* @__PURE__ */ k("div", {
			className: "flex items-center gap-1.5",
			children: [
				/* @__PURE__ */ O(p, {
					size: "xs",
					color: a ? "var(--color-text-tertiary)" : ot[e],
					"aria-label": a ? "Resolved" : e
				}),
				/* @__PURE__ */ O("span", {
					className: "text-[12px] font-semibold text-[var(--color-text-primary)]",
					children: t
				}),
				a && /* @__PURE__ */ O(s, {
					tone: "success",
					size: "xs",
					className: "ml-1",
					children: "Resolved"
				}),
				i != null && /* @__PURE__ */ O("span", {
					className: "ml-auto text-[10px] text-[var(--color-text-tertiary)]",
					children: i
				}),
				o && /* @__PURE__ */ O("span", {
					className: "ml-1 shrink-0",
					children: o
				})
			]
		}), r != null && /* @__PURE__ */ O("div", {
			className: "mt-1 text-[11px] leading-snug text-[var(--color-text-secondary)]",
			children: r
		})]
	});
}
//#endregion
//#region src/components/observability/components/AlertList.tsx
var ut = /* @__PURE__ */ O("div", {
	className: "text-center text-[12px] text-[var(--color-text-tertiary)] py-8",
	children: "No alerts."
}), dt = /* @__PURE__ */ O("div", {
	className: "text-center text-[12px] text-[var(--color-text-tertiary)] py-8",
	children: "Loading alerts…"
});
function ft({ items: e, title: t = "Alerts", headerSlot: i, loading: a = !1, empty: o, maxHeight: c, className: l, style: u, "data-testid": d = "alert-list" }) {
	let f = e.filter((e) => !e.resolved).length, p = f > 0 ? /* @__PURE__ */ k(s, {
		tone: "danger",
		size: "xs",
		"data-testid": "alert-list-active-count",
		children: [f, " active"]
	}) : null;
	return /* @__PURE__ */ k(r, {
		"data-testid": d,
		className: n("flex flex-col", l),
		style: u,
		children: [/* @__PURE__ */ O("div", {
			className: "px-4 py-3 border-b border-[var(--color-border)]",
			children: /* @__PURE__ */ O(m, {
				title: t,
				meta: i ?? p
			})
		}), /* @__PURE__ */ O("div", {
			role: "list",
			"data-testid": `${d}-rows`,
			className: "flex-1 overflow-y-auto p-2 space-y-1.5",
			style: { maxHeight: c },
			children: a ? dt : e.length === 0 ? o ?? ut : e.map((e) => /* @__PURE__ */ O(lt, {
				severity: e.severity,
				title: e.title,
				description: e.description,
				timestamp: e.timestamp,
				resolved: e.resolved,
				action: e.action
			}, `${e.id}-${e.resolved ? "resolved" : "active"}`))
		})]
	});
}
//#endregion
//#region src/components/observability/components/HealthCell.tsx
var pt = {
	healthy: "var(--color-success)",
	degraded: "var(--color-warning)",
	down: "var(--color-danger)",
	unknown: "var(--color-text-tertiary)"
}, mt = {
	healthy: "bg-[var(--color-success-bg)] border-[var(--color-success-border)]",
	degraded: "bg-[var(--color-warning-bg)] border-[var(--color-warning-border)]",
	down: "bg-[var(--color-danger-bg)] border-[var(--color-danger-border)]",
	unknown: "bg-[var(--color-surface)] border-[var(--color-border)]"
};
function ht({ status: e, label: t, reason: r, dense: i = !1, className: a, style: o, "data-testid": s = `health-cell-${e}` }) {
	return /* @__PURE__ */ k("div", {
		"data-testid": s,
		"data-status": e,
		className: n("rounded-md border transition-colors duration-300", i ? "px-2.5 py-2" : "px-3 py-2.5", mt[e], a),
		style: o,
		children: [/* @__PURE__ */ k("div", {
			className: "flex items-center gap-1.5",
			children: [/* @__PURE__ */ O(p, {
				size: "xs",
				color: pt[e],
				"aria-label": e
			}), /* @__PURE__ */ O("span", {
				className: "text-[11px] font-semibold text-[var(--color-text-primary)]",
				children: t
			})]
		}), /* @__PURE__ */ O("div", {
			className: "mt-1 text-[10px] text-[var(--color-text-tertiary)]",
			children: r ?? e
		})]
	});
}
//#endregion
//#region src/components/observability/components/HealthGrid.tsx
var gt = {
	1: "sm:grid-cols-1",
	2: "sm:grid-cols-2",
	3: "sm:grid-cols-3",
	4: "sm:grid-cols-4",
	6: "sm:grid-cols-6"
}, _t = /* @__PURE__ */ O("div", {
	className: "text-center text-[12px] text-[var(--color-text-tertiary)] py-8",
	children: "No nodes reporting."
});
function vt({ items: e, columns: t = 3, dense: i = !1, title: a, headerSlot: o, empty: s, className: c, style: l, "data-testid": u = "health-grid" }) {
	let d = e.length === 0 ? s ?? _t : /* @__PURE__ */ O("div", {
		role: "list",
		className: n("grid grid-cols-1", gt[t], i ? "gap-1.5" : "gap-2"),
		children: e.map((e) => /* @__PURE__ */ O("div", {
			role: "listitem",
			children: /* @__PURE__ */ O(ht, {
				status: e.status,
				label: e.label,
				reason: e.reason,
				dense: i
			})
		}, e.id))
	});
	return a ? /* @__PURE__ */ k(r, {
		"data-testid": u,
		className: n("flex flex-col", c),
		style: l,
		children: [/* @__PURE__ */ O("div", {
			className: "px-4 py-3 border-b border-[var(--color-border)]",
			children: /* @__PURE__ */ O(m, {
				title: a,
				meta: o
			})
		}), /* @__PURE__ */ O("div", {
			className: n(i ? "p-2" : "p-3"),
			children: d
		})]
	}) : /* @__PURE__ */ O("div", {
		"data-testid": u,
		className: n(i ? "p-2" : "p-3", c),
		style: l,
		children: d
	});
}
//#endregion
export { lt as AlertItem, ft as AlertList, L as DashboardKPIStrip, we as DashboardPage, Je as EventsPage, ht as HealthCell, vt as HealthGrid, W as MetricTimeSeriesPanel, at as MetricsGraph, Pe as MetricsPage, it as NodesPage, M as ObservabilityLayout };
