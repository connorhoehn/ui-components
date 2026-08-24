import { n as e } from "./IdentityContext-CQM1qwH6.js";
import { t } from "./cn-DhjIN-s0.js";
import { t as n } from "./Card-CcJetqWt.js";
import { n as r, r as i, t as a } from "./Chart-B40fkHgm.js";
import { t as o } from "./Chip-2lIuHwy5.js";
import { t as s } from "./Modal-DbKyLw86.js";
import { t as c } from "./EmptyState-CUHf5NYN.js";
import { n as l, r as u, t as d } from "./CardHeader-MBY5yyXT.js";
import { t as f } from "./StatusDot-Bgx2zxgC.js";
import { t as p } from "./activationKey-CjbL3LUv.js";
import { t as m } from "./Input-DcK2h-jK.js";
import { n as h } from "./EventStreamContext-C0egqLaF.js";
import { n as g, r as _ } from "./ObservabilityContext-CYf5AAod.js";
import { t as v } from "./Select-Z0TLUVeL.js";
import { t as y } from "./Checkbox-DsS7fIUO.js";
import { useCallback as b, useEffect as x, useId as S, useMemo as C, useRef as w, useState as T } from "react";
import { Fragment as E, jsx as D, jsxs as O } from "react/jsx-runtime";
import { Outlet as k, useNavigate as A } from "react-router";
//#region src/components/observability/ObservabilityLayout.tsx
function j() {
	return /* @__PURE__ */ D(k, {});
}
//#endregion
//#region src/components/observability/hooks/useDashboard.ts
function M() {
	return g().dashboard;
}
//#endregion
//#region src/components/observability/hooks/usePipelineMetrics.ts
var N = "", P = 1e4, F = 1e3, I = 2, ee = 3e4;
function te(e) {
	let t = Math.max(0, e - 1);
	return Math.min(F * I ** +t, ee);
}
function ne() {
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
function re(e) {
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
function L(t = {}) {
	let { idToken: n } = e(), { pollIntervalMs: r = P } = t, i = typeof r == "number" && r > 0, a = i ? r : P, [o, s] = T(null), [c, l] = T(!0), [u, d] = T(null), [f, p] = T(null), [m, h] = T(!1), g = w(null), _ = w(!0), v = w(!1), y = w(0), S = b(async () => {
		g.current && g.current.abort();
		let e = new AbortController();
		g.current = e;
		try {
			let t = { "Content-Type": "application/json" };
			n && (t.Authorization = `Bearer ${n}`);
			let r = await fetch(`${N}/api/pipelines/metrics`, {
				method: "GET",
				headers: t,
				signal: e.signal
			});
			if (!r.ok) throw Error(`HTTP ${r.status}`);
			let i = re(await r.json());
			if (!_.current || e.signal.aborted) return;
			s(i), p((/* @__PURE__ */ new Date()).toISOString()), d(null), h(!0), v.current = !1, y.current = 0;
		} catch (e) {
			if (e.name === "AbortError" || !_.current) return;
			d(e.message || "Failed to fetch pipeline metrics"), h(!1), y.current += 1, s((e) => e ?? ne()), v.current ||= (console.warn("[usePipelineMetrics] /api/pipelines/metrics unreachable — using fallback", e), !0);
		} finally {
			_.current && !e.signal.aborted && l(!1);
		}
	}, [n]);
	return x(() => {
		_.current = !0;
		let e = null, t = !0, n = () => {
			e !== null && (clearTimeout(e), e = null);
		}, r = () => {
			if (!t || document.hidden || !i) return;
			let n = y.current > 0 ? te(y.current) : a;
			e = setTimeout(() => {
				e = null, S().finally(() => {
					r();
				});
			}, n);
		}, o = () => {
			!t || e !== null || r();
		};
		S().finally(() => {
			document.hidden || o();
		});
		let s = () => {
			document.hidden ? n() : (n(), S().finally(() => {
				document.hidden || o();
			}));
		};
		return document.addEventListener("visibilitychange", s), () => {
			t = !1, _.current = !1, n(), document.removeEventListener("visibilitychange", s), g.current &&= (g.current.abort(), null);
		};
	}, [
		S,
		i,
		a
	]), {
		metrics: o,
		loading: c,
		error: u,
		lastUpdatedAt: f,
		refresh: S,
		isLiveData: m,
		source: o?.source ?? null
	};
}
//#endregion
//#region src/components/observability/components/KPICard.tsx
function ie(e) {
	return typeof e == "number" ? e.toLocaleString() : e;
}
function R({ title: e, value: n, delta: r, sparklineData: i, onClick: a }) {
	let [o, s] = T(!1), c = !!a;
	return /* @__PURE__ */ O("div", {
		"data-testid": "kpi-card",
		onClick: a,
		onMouseEnter: () => s(!0),
		onMouseLeave: () => s(!1),
		role: c ? "button" : void 0,
		tabIndex: c ? 0 : void 0,
		onKeyDown: c ? (e) => {
			(e.key === "Enter" || e.key === " ") && (e.preventDefault(), a?.());
		} : void 0,
		className: t("flex-1 min-w-[180px] bg-surface border rounded-[10px] p-4", "flex flex-col gap-1.5 font-[inherit] transition-[border-color] duration-[120ms] ease-linear", c ? "cursor-pointer" : "cursor-default", o && c ? "border-primary" : "border-border"),
		children: [
			/* @__PURE__ */ D("div", {
				className: "text-xs font-semibold text-text-secondary tracking-[0.2px]",
				children: e
			}),
			/* @__PURE__ */ O("div", {
				className: "flex items-baseline justify-between gap-2",
				children: [/* @__PURE__ */ D("div", {
					className: "text-[28px] font-bold text-text-primary leading-[1.1]",
					children: ie(n)
				}), i && i.length > 0 && /* @__PURE__ */ D(l, {
					data: i,
					width: 80,
					height: 20,
					color: "#646cff"
				})]
			}),
			r && /* @__PURE__ */ O("div", {
				className: t("text-[11px] font-semibold font-[inherit]", r.direction === "up" ? "text-state-completed" : "text-state-failed"),
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
function z({ runsToday: e, runsSparkline: t, activeNow: n, pendingApprovals: r, failed24h: i, avgFirstTokenLatency: a, runsTodayDelta: o, failed24hDelta: s, onScrollToActive: c, onGoToPipelines: l, onGoToFailedEvents: u }) {
	return /* @__PURE__ */ O("div", {
		className: "grid grid-cols-[repeat(auto-fit,minmax(170px,1fr))] gap-4",
		children: [
			/* @__PURE__ */ D(R, {
				title: "Runs today",
				value: e,
				delta: typeof e == "number" ? o : void 0,
				sparklineData: t
			}),
			/* @__PURE__ */ D(R, {
				title: "Active now",
				value: n,
				onClick: c
			}),
			/* @__PURE__ */ D(R, {
				title: "Pending approvals",
				value: r,
				onClick: l
			}),
			/* @__PURE__ */ D(R, {
				title: "Failed (24h)",
				value: i,
				delta: typeof i == "number" ? s : void 0,
				onClick: u
			}),
			/* @__PURE__ */ D(R, {
				title: "Avg first-token latency",
				value: a
			})
		]
	});
}
//#endregion
//#region src/components/observability/components/NodeGridTile.tsx
var B = {
	healthy: "border-state-completed",
	degraded: "border-state-awaiting",
	dead: "border-state-failed",
	idle: "border-state-idle"
}, ae = {
	healthy: "bg-state-completed",
	degraded: "bg-state-awaiting",
	dead: "bg-state-failed",
	idle: "bg-state-idle"
};
function oe(e) {
	return e >= 1024 ? `${(e / 1024).toFixed(1)}G` : `${Math.round(e)}M`;
}
function V({ label: e, value: t }) {
	return /* @__PURE__ */ O("div", {
		className: "flex justify-between items-baseline text-xs font-[inherit]",
		children: [/* @__PURE__ */ D("span", {
			className: "text-text-secondary font-semibold",
			children: e
		}), /* @__PURE__ */ D("span", {
			className: "text-text-primary font-mono text-[11px]",
			children: t
		})]
	});
}
function se({ node: e, selected: n, onClick: r, onKill: i }) {
	let [a, o] = T(!1), s = e.activeRuns > 0 ? `${e.activeRuns}` : "— idle";
	return /* @__PURE__ */ O("div", {
		"data-testid": "node-grid-tile",
		onClick: r,
		onKeyDown: r ? p(r) : void 0,
		role: r ? "button" : void 0,
		tabIndex: r ? 0 : void 0,
		"aria-pressed": r ? !!n : void 0,
		"aria-label": r ? `Node ${e.id}` : void 0,
		onMouseEnter: () => o(!0),
		onMouseLeave: () => o(!1),
		className: t("w-[200px] h-[200px] bg-surface rounded-[10px] p-3", "flex flex-col gap-1.5 font-[inherit] box-border border", "transition-[box-shadow,border-color] duration-[120ms] ease-linear", r ? "cursor-pointer" : "cursor-default", n ? "border-primary shadow-[0_0_0_4px_rgba(100,108,255,0.18)]" : a ? t(B[e.status], "shadow-[0_2px_8px_rgba(100,108,255,0.10)]") : B[e.status]),
		children: [
			/* @__PURE__ */ O("div", {
				className: "flex justify-between items-center",
				children: [/* @__PURE__ */ D("div", {
					className: "text-[13px] font-semibold text-text-primary overflow-hidden text-ellipsis whitespace-nowrap",
					title: e.id,
					children: e.id
				}), /* @__PURE__ */ D("span", {
					role: "img",
					"aria-label": `status ${e.status}`,
					className: t("w-2 h-2 rounded-full shrink-0", ae[e.status])
				})]
			}),
			(e.role || e.region) && /* @__PURE__ */ D("div", {
				className: "text-[11px] text-text-tertiary font-[inherit]",
				children: [e.role, e.region].filter(Boolean).join(" · ")
			}),
			/* @__PURE__ */ O("div", {
				className: "flex flex-col gap-0.5",
				children: [
					/* @__PURE__ */ D(V, {
						label: "CPU",
						value: `${Math.round(e.cpu)}%`
					}),
					/* @__PURE__ */ D(V, {
						label: "MEM",
						value: oe(e.memoryMb)
					}),
					/* @__PURE__ */ D(V, {
						label: "CONN",
						value: `${e.connections}`
					}),
					/* @__PURE__ */ D(V, {
						label: "RUNS",
						value: s
					})
				]
			}),
			/* @__PURE__ */ D("div", {
				className: "mt-auto",
				children: /* @__PURE__ */ D(l, {
					data: e.cpuHistory,
					width: 176,
					height: 18,
					color: "#646cff"
				})
			}),
			i && /* @__PURE__ */ D("button", {
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
function H({ nodes: e, onSelect: n, selectedId: r }) {
	return !e || e.length === 0 ? /* @__PURE__ */ D("div", {
		"data-testid": "node-grid-empty",
		className: t("p-6 text-center text-text-tertiary text-[13px] font-[inherit]"),
		children: "No nodes connected"
	}) : /* @__PURE__ */ D("div", {
		"data-testid": "node-grid",
		className: t("flex flex-wrap gap-4 font-[inherit]"),
		children: e.map((e) => /* @__PURE__ */ D(se, {
			node: e,
			selected: r === e.id,
			onClick: n ? () => n(e.id) : void 0
		}, e.id))
	});
}
//#endregion
//#region src/components/observability/components/ActiveRunsTable.tsx
function ce({ run: e, onClick: n, onCancel: r }) {
	let [i, a] = T(!1), o = !!n, s = o ? `Open run ${e.runId} of pipeline ${e.pipelineName}` : void 0, c = (t) => {
		n && (t.key === "Enter" || t.key === " " || t.key === "Spacebar") && (t.preventDefault(), n(e));
	}, l = (t) => {
		t.stopPropagation(), r && r(e);
	}, u = !!r && e.status === "running";
	return /* @__PURE__ */ O("tr", {
		"data-testid": "active-run-row",
		role: o ? "button" : void 0,
		"aria-label": s,
		tabIndex: o ? 0 : void 0,
		onClick: n ? () => n(e) : void 0,
		onKeyDown: o ? c : void 0,
		onMouseEnter: () => a(!0),
		onMouseLeave: () => a(!1),
		className: t("outline-none", n ? "cursor-pointer" : "cursor-default", i ? "bg-surface-hover" : "bg-transparent"),
		children: [
			/* @__PURE__ */ D("td", {
				className: "px-3 py-2 text-[13px] text-text-primary font-[inherit] border-b border-border font-semibold",
				children: /* @__PURE__ */ O("span", {
					className: "inline-flex items-center gap-1.5",
					children: [e.pipelineName, i && o && /* @__PURE__ */ D("span", {
						"data-testid": "active-run-link-icon",
						"aria-hidden": "true",
						className: "text-[11px] text-primary font-medium",
						children: "↗"
					})]
				})
			}),
			/* @__PURE__ */ D("td", {
				className: "px-3 py-2 text-[11px] text-text-secondary font-mono border-b border-border",
				children: e.currentStep
			}),
			/* @__PURE__ */ D("td", {
				className: "px-3 py-2 text-[11px] text-text-secondary font-mono border-b border-border",
				children: e.ownerNode
			}),
			/* @__PURE__ */ D("td", {
				className: "px-3 py-2 text-[11px] text-text-secondary font-mono border-b border-border text-right",
				children: e.elapsed
			}),
			r && /* @__PURE__ */ D("td", {
				className: "px-3 py-2 text-[13px] text-text-primary font-[inherit] border-b border-border text-right w-px whitespace-nowrap",
				children: u && /* @__PURE__ */ D("button", {
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
function le({ runs: e, onRowClick: t, onCancelRun: n }) {
	return !e || e.length === 0 ? /* @__PURE__ */ D("div", {
		"data-testid": "active-runs-empty",
		className: "p-6 text-center text-text-tertiary text-[13px] border border-border rounded-lg bg-surface font-[inherit]",
		children: "No active runs"
	}) : /* @__PURE__ */ D("div", {
		"data-testid": "active-runs-table",
		className: "border border-border rounded-lg overflow-hidden bg-surface",
		children: /* @__PURE__ */ O("table", {
			className: "w-full border-collapse font-[inherit]",
			children: [/* @__PURE__ */ D("thead", { children: /* @__PURE__ */ O("tr", { children: [
				/* @__PURE__ */ D("th", {
					className: "text-left px-3 py-2 text-[11px] font-semibold text-text-secondary uppercase tracking-[0.3px] bg-surface-inset border-b border-border",
					children: "Pipeline"
				}),
				/* @__PURE__ */ D("th", {
					className: "text-left px-3 py-2 text-[11px] font-semibold text-text-secondary uppercase tracking-[0.3px] bg-surface-inset border-b border-border",
					children: "Step"
				}),
				/* @__PURE__ */ D("th", {
					className: "text-left px-3 py-2 text-[11px] font-semibold text-text-secondary uppercase tracking-[0.3px] bg-surface-inset border-b border-border",
					children: "Owner"
				}),
				/* @__PURE__ */ D("th", {
					className: "text-right px-3 py-2 text-[11px] font-semibold text-text-secondary uppercase tracking-[0.3px] bg-surface-inset border-b border-border",
					children: "Elapsed"
				}),
				n && /* @__PURE__ */ D("th", { className: "text-right px-3 py-2 text-[11px] font-semibold text-text-secondary uppercase tracking-[0.3px] bg-surface-inset border-b border-border" })
			] }) }), /* @__PURE__ */ D("tbody", { children: e.map((e) => /* @__PURE__ */ D(ce, {
				run: e,
				onClick: t,
				onCancel: n
			}, e.runId)) })]
		})
	});
}
//#endregion
//#region src/components/observability/components/AlertsPanel.tsx
var ue = {
	info: "text-info",
	warning: "text-state-awaiting",
	error: "text-danger",
	critical: "text-danger"
}, de = {
	info: "border-l-info",
	warning: "border-l-state-awaiting",
	error: "border-l-danger",
	critical: "border-l-danger"
}, fe = {
	info: "ℹ",
	warning: "⚠",
	error: "✕",
	critical: "✕"
};
function pe(e) {
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
function me({ alert: e, onDismiss: n }) {
	let r = fe[e.severity];
	return /* @__PURE__ */ O("div", {
		"data-testid": "alert-item",
		className: t("flex items-start gap-2.5 px-3 py-2.5", "bg-surface border border-border border-l-[3px] rounded-md font-[inherit]", de[e.severity]),
		children: [
			/* @__PURE__ */ D("span", {
				"aria-hidden": "true",
				className: t("text-sm leading-5 shrink-0 w-4 text-center", ue[e.severity]),
				children: r
			}),
			/* @__PURE__ */ O("div", {
				className: "flex-1 min-w-0",
				children: [/* @__PURE__ */ D("div", {
					className: "text-[13px] text-text-primary leading-[1.4]",
					children: e.message
				}), /* @__PURE__ */ O("div", {
					className: "text-[11px] text-text-tertiary mt-0.5",
					children: [e.category ? `${e.category} · ` : "", pe(e.timestamp)]
				})]
			}),
			n && /* @__PURE__ */ D("button", {
				"data-testid": "alert-dismiss",
				"aria-label": "dismiss alert",
				onClick: () => n(e.id),
				className: "bg-transparent border-none text-text-tertiary text-base leading-none cursor-pointer px-1.5 py-0.5 font-[inherit] shrink-0",
				children: "×"
			})
		]
	});
}
function he({ alerts: e, onDismiss: t }) {
	return !e || e.length === 0 ? /* @__PURE__ */ D("div", {
		"data-testid": "alerts-empty",
		className: "p-6 text-center text-text-tertiary text-[13px] border border-border rounded-lg bg-surface font-[inherit]",
		children: "No active alerts"
	}) : /* @__PURE__ */ D("div", {
		"data-testid": "alerts-panel",
		className: "flex flex-col gap-2",
		children: e.map((e) => /* @__PURE__ */ D(me, {
			alert: e,
			onDismiss: t
		}, e.id))
	});
}
//#endregion
//#region src/components/observability/DashboardPage.tsx
var U = "—";
function ge(e) {
	return typeof e != "number" || !Number.isFinite(e) ? U : e < 1e3 ? `${Math.round(e)} ms` : `${(e / 1e3).toFixed(1)}s`;
}
function _e(e) {
	let t = Math.max(0, e.totalNodes ?? 0), n = (e) => Array.from({ length: 12 }, (t, n) => Math.max(0, Math.round(10 + Math.sin(e + n / 2) * 4 + n * .3)));
	return Array.from({ length: t }, (e, t) => ({
		id: `node-${t}`,
		status: "healthy",
		role: "worker",
		cpu: 10 + t * 4,
		memoryMb: 280 + t * 60,
		connections: 12 + t * 3,
		activeRuns: 0,
		cpuHistory: n(t)
	}));
}
var W = [];
function ve({ source: e }) {
	if (e === null || e === "bridge") return null;
	let n = e === "error";
	return /* @__PURE__ */ D("span", {
		"data-testid": "pipeline-metrics-source-pill",
		"data-source": e,
		title: n ? "/api/pipelines/metrics returned an error — values are placeholders" : "No pipeline bridge wired — metrics are synthesized fixture data",
		className: t("inline-block px-2 py-0.5 rounded-sm text-[11px] font-semibold", n ? "bg-danger-bg text-state-failed" : "bg-warning-bg text-state-awaiting"),
		children: n ? "metrics error" : "demo data"
	});
}
function ye({ live: e, onChange: n }) {
	return /* @__PURE__ */ O("button", {
		"data-testid": "live-toggle",
		onClick: () => n(!e),
		className: t("inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold", "rounded-md cursor-pointer font-[inherit]", e ? "bg-surface border border-primary text-primary" : "bg-surface-inset border border-border text-text-secondary"),
		children: [/* @__PURE__ */ D("span", { className: t("w-2 h-2 rounded-full", e ? "bg-success" : "bg-text-tertiary") }), e ? "Live" : "Paused"]
	});
}
function be({ nodes: e, healthyCount: n, totalCount: r, onSelect: i }) {
	let a = n === r;
	return /* @__PURE__ */ O("div", {
		className: "bg-surface border border-border rounded-[10px] p-4 font-[inherit]",
		children: [/* @__PURE__ */ O("div", {
			className: "flex justify-between items-center mb-3",
			children: [/* @__PURE__ */ D("div", {
				className: "text-sm font-semibold text-text-primary mb-0 font-[inherit]",
				children: "Cluster health"
			}), /* @__PURE__ */ O("span", {
				"data-testid": "cluster-health-chip",
				className: t("inline-block px-2 py-0.5 rounded-sm text-[11px] font-semibold", a ? "bg-success-bg text-state-completed" : "bg-warning-bg text-state-awaiting"),
				children: [
					n,
					"/",
					r,
					" ",
					a ? "✓" : "!"
				]
			})]
		}), /* @__PURE__ */ D(H, {
			nodes: e,
			onSelect: i
		})]
	});
}
function xe({ events: e, onViewAll: t }) {
	return /* @__PURE__ */ O("div", {
		className: "bg-surface border border-border rounded-[10px] p-4 font-[inherit]",
		children: [/* @__PURE__ */ O("div", {
			className: "flex justify-between items-center mb-2",
			children: [/* @__PURE__ */ D("div", {
				className: "text-sm font-semibold text-text-primary font-[inherit]",
				children: "Recent events (last 20)"
			}), /* @__PURE__ */ D("button", {
				"data-testid": "recent-events-view-all",
				onClick: t,
				className: "bg-transparent border-none text-primary text-xs font-semibold cursor-pointer font-[inherit]",
				children: "▸ view all"
			})]
		}), e.length === 0 ? /* @__PURE__ */ D("div", {
			className: "p-4 text-center text-text-tertiary text-[13px]",
			children: "No recent events"
		}) : /* @__PURE__ */ D("div", {
			className: "flex flex-col gap-0.5",
			children: e.slice(0, 20).map((e) => /* @__PURE__ */ D(u, {
				timestamp: e.timestamp,
				type: e.type,
				summary: e.summary,
				severity: e.severity
			}, e.id))
		})]
	});
}
function Se() {
	let e = A(), n = w(null), { live: r, setLive: i, recentEvents: a, activeRunsCount: o, isLiveData: s, unauthorized: c } = g(), l = M() ?? _, { metrics: u, source: d } = L(), f = l?.overview ?? {}, p = C(() => _e(f), [f]), m = u?.runsStarted ?? U, h = [], v = o > 0 ? o : u?.runsActive ?? U, y = u?.runsAwaitingApproval ?? U, b = u?.runsFailed ?? U, x = ge(u?.avgFirstTokenLatencyMs ?? null), S = Array.isArray(l?.alerts) ? l.alerts : [];
	return /* @__PURE__ */ O("div", {
		"data-testid": "observability-dashboard",
		className: "p-6 flex flex-col gap-4 font-sans text-[13px] text-text-primary bg-surface-panel min-h-full",
		children: [
			/* @__PURE__ */ O("div", {
				className: "flex justify-between items-center",
				children: [/* @__PURE__ */ D("h1", {
					className: "text-lg font-bold text-text-primary m-0 leading-[1.3]",
					children: "Dashboard"
				}), /* @__PURE__ */ O("div", {
					className: "flex items-center gap-2",
					children: [
						/* @__PURE__ */ D("span", {
							"data-testid": "dashboard-data-source",
							title: s ? "Connected to /api/observability/dashboard" : c ? "Not authorized to read /api/observability/dashboard — the numbers below are fixture data, NOT your cluster. Sign in or supply a token to ObservabilityProvider." : "Backend unreachable — using fixture data",
							className: t("text-[11px] font-semibold", s ? "text-state-completed" : c ? "text-danger-fg bg-danger-bg border border-danger-border rounded-sm px-1.5 py-0.5" : "text-text-tertiary"),
							children: s ? "live data" : c ? "not authorized — fixture" : "fixture"
						}),
						/* @__PURE__ */ D(ve, { source: d }),
						/* @__PURE__ */ D(ye, {
							live: r,
							onChange: i
						})
					]
				})]
			}),
			/* @__PURE__ */ D(z, {
				runsToday: m,
				runsSparkline: h,
				activeNow: v,
				pendingApprovals: y,
				failed24h: b,
				avgFirstTokenLatency: x,
				onScrollToActive: () => {
					n.current?.scrollIntoView({
						behavior: "smooth",
						block: "start"
					});
				},
				onGoToPipelines: () => {
					e("/pipelines");
				},
				onGoToFailedEvents: () => {
					e("/observability/events?filter=errors");
				}
			}),
			/* @__PURE__ */ D(be, {
				nodes: p,
				healthyCount: f.healthyNodes ?? 0,
				totalCount: f.totalNodes ?? 0,
				onSelect: (t) => {
					e(`/observability/nodes?selected=${encodeURIComponent(t)}`);
				}
			}),
			/* @__PURE__ */ O("div", {
				ref: n,
				children: [/* @__PURE__ */ O("div", {
					className: "text-sm font-semibold text-text-primary mb-2 font-[inherit]",
					children: [
						"Active runs (",
						W.length,
						")"
					]
				}), /* @__PURE__ */ D(le, {
					runs: W,
					onRowClick: (t) => e(`/pipelines/${t.pipelineId}/runs/${t.runId}`)
				})]
			}),
			/* @__PURE__ */ D(xe, {
				events: a,
				onViewAll: () => {
					e("/observability/events");
				}
			}),
			/* @__PURE__ */ O("div", { children: [/* @__PURE__ */ O("div", {
				className: "text-sm font-semibold text-text-primary mb-2 font-[inherit]",
				children: [
					"Alerts (",
					S.length,
					")"
				]
			}), /* @__PURE__ */ D(he, { alerts: S })] })
		]
	});
}
//#endregion
//#region src/components/observability/hooks/useMetricsHistory.ts
function Ce(e = 60) {
	let { dashboard: t } = g(), [n, r] = T([]);
	return x(() => {
		t && r((n) => [...n, t].slice(-e));
	}, [t, e]), n;
}
//#endregion
//#region src/components/observability/hooks/usePipelineModuleDashboard.ts
var we = "", Te = 1e4;
function Ee() {
	let [e, t] = T(null), [n, r] = T(!0), [i, a] = T(null), o = w(!1), s = b(async () => {
		try {
			let e = await fetch(`${we}/api/pipelines/dashboard-data`, { credentials: "same-origin" });
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
	return x(() => {
		o.current = !1, s();
		let e = window.setInterval(() => {
			document.hidden || s();
		}, Te);
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
function G({ title: e, timeRange: n, children: r, onMaximize: i }) {
	return /* @__PURE__ */ O("div", {
		"data-testid": "metric-card",
		className: t("bg-surface border border-border rounded-[10px] p-4", "flex flex-col gap-2.5 font-[inherit]"),
		children: [/* @__PURE__ */ O("div", {
			className: "flex items-center justify-between gap-2",
			children: [/* @__PURE__ */ D("div", {
				className: "text-[13px] font-semibold text-text-primary overflow-hidden text-ellipsis whitespace-nowrap",
				title: e,
				children: e
			}), /* @__PURE__ */ O("div", {
				className: "flex items-center gap-1.5",
				children: [n && /* @__PURE__ */ D("span", {
					className: "inline-block px-2 py-0.5 rounded-sm text-[11px] font-semibold bg-surface-hover text-text-secondary leading-[1.4] whitespace-nowrap",
					children: n
				}), i && /* @__PURE__ */ D("button", {
					"data-testid": "metric-card-maximize",
					onClick: i,
					"aria-label": `Maximize ${e}`,
					className: "border-none bg-transparent text-text-tertiary cursor-pointer text-sm px-1 py-0.5 font-[inherit]",
					children: "⛶"
				})]
			})]
		}), /* @__PURE__ */ D("div", {
			className: "flex-1",
			children: r
		})]
	});
}
//#endregion
//#region src/components/observability/components/MetricTimeSeriesPanel.tsx
var K = [
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
], De = [
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
function Oe({ seeds: e, liveSeries: n, cols: o, isLiveData: s, failedColor: c, onResetZoom: l, onExportCsv: u, timeRange: d, onTimeRangeChange: f, refreshInterval: p, onRefreshIntervalChange: m }) {
	let h = d !== void 0 && f !== void 0, g = p !== void 0 && m !== void 0, _ = h ? K.find((e) => e.value === d)?.label ?? "" : void 0;
	return /* @__PURE__ */ O(E, { children: [/* @__PURE__ */ O("div", {
		className: "flex items-center gap-3 px-4 py-2.5 border-b border-border bg-surface-panel",
		children: [
			h && /* @__PURE__ */ D(v, {
				"data-testid": "metrics-time-range",
				"aria-label": "Time range",
				value: d,
				onChange: (e) => f(e.target.value),
				className: "w-auto min-w-[120px]",
				options: K.map((e) => ({
					value: e.value,
					label: e.label
				}))
			}),
			g && /* @__PURE__ */ D(v, {
				"data-testid": "metrics-refresh-interval",
				"aria-label": "Refresh interval",
				value: p,
				onChange: (e) => m(e.target.value),
				className: "w-auto min-w-[100px]",
				options: De.map((e) => ({
					value: e.value,
					label: `Refresh: ${e.label}`
				}))
			}),
			l && /* @__PURE__ */ D("button", {
				"data-testid": "metrics-reset-zoom",
				onClick: l,
				className: "px-3 py-1.5 text-[13px] bg-transparent border-none text-text-secondary cursor-pointer font-[inherit] shrink-0",
				children: "Reset zoom"
			}),
			u && /* @__PURE__ */ D("button", {
				"data-testid": "metrics-export-csv",
				onClick: u,
				className: "px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-white border-none rounded-md cursor-pointer font-[inherit] shrink-0",
				children: "Export CSV"
			}),
			/* @__PURE__ */ O("div", {
				"data-testid": "metrics-data-source",
				className: "ml-auto flex items-center gap-3 text-[11px] text-text-tertiary",
				children: [/* @__PURE__ */ D("span", {
					title: s ? "Connected to /api/pipelines/metrics" : "Backend unreachable — using seeded fixture",
					className: t("font-semibold", s ? "text-state-completed" : "text-text-tertiary"),
					children: s ? "live" : "fixture"
				}), /* @__PURE__ */ O("span", { children: [
					o,
					" column",
					o === 1 ? "" : "s"
				] })]
			})
		]
	}), /* @__PURE__ */ O("div", {
		className: "gap-4 p-4 overflow-y-auto flex-1 grid",
		style: { gridTemplateColumns: `repeat(${o}, minmax(0, 1fr))` },
		children: [
			/* @__PURE__ */ D(G, {
				title: "Runs per minute",
				timeRange: _,
				children: /* @__PURE__ */ D(i, {
					series: n?.runsPerMinute ?? e.runsPerMinute,
					height: 180
				})
			}),
			/* @__PURE__ */ D(G, {
				title: "Step duration (p50/p95/p99)",
				timeRange: _,
				children: /* @__PURE__ */ D(r, {
					series: e.stepDuration,
					height: 180,
					yFormat: (e) => `${Math.round(e)}ms`
				})
			}),
			/* @__PURE__ */ D(G, {
				title: "LLM tokens",
				timeRange: _,
				children: /* @__PURE__ */ D(r, {
					series: n?.llmTokens ?? e.llmTokens,
					height: 180
				})
			}),
			/* @__PURE__ */ D(G, {
				title: "LLM cost",
				timeRange: _,
				children: /* @__PURE__ */ D(r, {
					series: n?.llmCost ?? e.llmCost,
					height: 180,
					yFormat: (e) => `$${e.toFixed(2)}`
				})
			}),
			/* @__PURE__ */ D(G, {
				title: "Cluster CPU",
				timeRange: _,
				children: /* @__PURE__ */ D(r, {
					series: e.clusterCpu,
					height: 180,
					yFormat: (e) => `${Math.round(e)}%`
				})
			}),
			/* @__PURE__ */ D(G, {
				title: "Cluster memory",
				timeRange: _,
				children: /* @__PURE__ */ D(r, {
					series: e.clusterMemory,
					height: 180,
					yFormat: (e) => `${Math.round(e)}MB`
				})
			}),
			/* @__PURE__ */ D(G, {
				title: "Event rate",
				timeRange: _,
				children: /* @__PURE__ */ D(r, {
					series: e.eventRate,
					height: 180
				})
			}),
			/* @__PURE__ */ D(G, {
				title: "Active runs over time",
				timeRange: _,
				children: /* @__PURE__ */ D(r, {
					series: n?.activeRuns ?? e.activeRuns,
					height: 180
				})
			}),
			/* @__PURE__ */ D(G, {
				title: "Failure rate by type",
				timeRange: _,
				children: /* @__PURE__ */ D(a, {
					data: e.failureRate,
					xKey: "x",
					yKey: "total",
					color: c,
					height: 180
				})
			}),
			/* @__PURE__ */ D(G, {
				title: "Approval latency",
				timeRange: _,
				children: /* @__PURE__ */ D(r, {
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
function q(e, t = 30, n = 60) {
	let r = [], i = e;
	for (let e = 0; e < t; e++) i = (i * 9301 + 49297) % 233280, r.push(Math.abs(i % n));
	return r;
}
function J(e, t, n) {
	return {
		label: e,
		color: n,
		data: t.map((e, t) => ({
			x: t,
			y: e
		}))
	};
}
var Y = {
	primary: "var(--color-primary)",
	completed: "var(--color-success)",
	failed: "var(--color-danger)"
};
function ke() {
	return {
		runsPerMinute: [
			J("started", q(3, 30, 40), Y.primary),
			J("completed", q(7, 30, 40), Y.completed),
			J("failed", q(11, 30, 20), Y.failed)
		],
		stepDuration: [
			J("p50", q(17, 30, 400)),
			J("p95", q(23, 30, 800)),
			J("p99", q(29, 30, 1200))
		],
		llmTokens: [J("input", q(31, 30, 2e3)), J("output", q(37, 30, 1e3))],
		llmCost: [J("USD", q(41, 30, 5))],
		clusterCpu: [
			J("node-0", q(43, 30, 40)),
			J("node-1", q(47, 30, 40)),
			J("node-2", q(53, 30, 40))
		],
		clusterMemory: [
			J("node-0", q(59, 30, 512)),
			J("node-1", q(61, 30, 512)),
			J("node-2", q(67, 30, 512))
		],
		eventRate: [J("events/s", q(71, 30, 20))],
		activeRuns: [J("active", q(73, 30, 10))],
		failureRate: (() => {
			let e = q(79, 30, 15), t = q(83, 30, 15), n = q(89, 30, 15);
			return e.map((r, i) => ({
				x: i,
				llm: e[i],
				http: t[i],
				transform: n[i],
				total: e[i] + t[i] + n[i]
			}));
		})(),
		approvalLatency: [J("seconds", q(97, 30, 120))]
	};
}
function Ae() {
	let [e, t] = T(() => typeof window > "u" ? 2 : window.innerWidth >= 1600 ? 3 : 2);
	return x(() => {
		if (typeof window > "u") return;
		let e = () => {
			t(window.innerWidth >= 1600 ? 3 : 2);
		};
		return window.addEventListener("resize", e), () => window.removeEventListener("resize", e);
	}, []), e;
}
function je() {
	let { data: e, loading: n, error: r } = Ee();
	return n && !e ? /* @__PURE__ */ D("div", {
		"data-testid": "modules-section-loading",
		className: "flex flex-col gap-2 px-4 py-3 bg-surface border border-border rounded-[10px] mb-4",
		children: /* @__PURE__ */ D("span", {
			className: "text-[11px] font-semibold text-text-tertiary uppercase tracking-[0.5px]",
			children: "Loading active modules…"
		})
	}) : e ? /* @__PURE__ */ O("div", {
		"data-testid": "modules-section",
		className: "flex flex-col gap-2 px-4 py-3 bg-surface border border-border rounded-[10px] mb-4",
		children: [
			/* @__PURE__ */ O("div", {
				className: "flex items-baseline gap-3",
				children: [/* @__PURE__ */ D("span", {
					className: "text-sm font-bold text-text-primary",
					children: e.moduleName
				}), /* @__PURE__ */ O("span", {
					className: "text-[11px] font-semibold text-text-tertiary uppercase tracking-[0.5px]",
					children: [
						e.source,
						" · ",
						e.state
					]
				})]
			}),
			/* @__PURE__ */ O("div", {
				className: "flex gap-4 flex-wrap",
				children: [
					/* @__PURE__ */ O("div", {
						className: "flex flex-col gap-0.5 min-w-[110px]",
						children: [/* @__PURE__ */ D("span", {
							className: "text-[11px] text-text-tertiary",
							children: "Total"
						}), /* @__PURE__ */ D("span", {
							className: "text-lg font-bold text-text-primary",
							children: e.summary.totalResources
						})]
					}),
					/* @__PURE__ */ O("div", {
						className: "flex flex-col gap-0.5 min-w-[110px]",
						children: [/* @__PURE__ */ D("span", {
							className: "text-[11px] text-text-tertiary",
							children: "Healthy"
						}), /* @__PURE__ */ D("span", {
							className: "text-lg font-bold text-text-primary",
							children: e.summary.healthyResources
						})]
					}),
					/* @__PURE__ */ O("div", {
						className: "flex flex-col gap-0.5 min-w-[110px]",
						children: [/* @__PURE__ */ D("span", {
							className: "text-[11px] text-text-tertiary",
							children: "Active"
						}), /* @__PURE__ */ D("span", {
							className: "text-lg font-bold text-text-primary",
							children: e.summary.activeConnections
						})]
					}),
					/* @__PURE__ */ O("div", {
						className: "flex flex-col gap-0.5 min-w-[110px]",
						children: [/* @__PURE__ */ D("span", {
							className: "text-[11px] text-text-tertiary",
							children: "Throughput"
						}), /* @__PURE__ */ D("span", {
							className: "text-lg font-bold text-text-primary",
							children: e.summary.throughput
						})]
					})
				]
			}),
			e.alerts && e.alerts.length > 0 ? /* @__PURE__ */ D("div", {
				"data-testid": "modules-section-alerts",
				className: "flex flex-col gap-1",
				children: e.alerts.map((e, n) => /* @__PURE__ */ O("div", {
					className: t("text-xs px-2.5 py-1.5 rounded-md bg-surface-inset", e.level === "critical" || e.level === "error" ? "text-state-failed" : "text-text-primary"),
					children: [
						"[",
						e.level,
						"] ",
						e.message
					]
				}, n))
			}) : null
		]
	}) : /* @__PURE__ */ D("div", {
		"data-testid": "modules-section-error",
		className: "flex flex-col gap-2 px-4 py-3 bg-surface border border-border rounded-[10px] mb-4",
		children: /* @__PURE__ */ O("span", {
			className: "text-[11px] font-semibold text-text-tertiary uppercase tracking-[0.5px]",
			children: ["Active modules unavailable", r ? `: ${r}` : ""]
		})
	});
}
var Me = {
	off: null,
	"5s": 5e3,
	"30s": 3e4,
	"60s": 6e4
};
function Ne() {
	let e = C(ke, []), t = Ae(), [n, r] = T("30s");
	Ce(60);
	let { metrics: i, isLiveData: a } = L({ pollIntervalMs: Me[n] }), [o, s] = T([]);
	x(() => {
		i && s((e) => [...e, i].slice(-30));
	}, [i]);
	let c = C(() => {
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
					color: Y.primary,
					data: s
				},
				{
					label: "completed",
					color: Y.completed,
					data: c
				},
				{
					label: "failed",
					color: Y.failed,
					data: l
				}
			] : null
		};
	}, [o]);
	return /* @__PURE__ */ O("div", {
		"data-testid": "metrics-page",
		className: "flex flex-col h-full min-h-0 font-[inherit] text-[13px] text-text-primary bg-surface",
		children: [/* @__PURE__ */ D(Oe, {
			seeds: e,
			liveSeries: c,
			cols: t,
			isLiveData: a,
			failedColor: Y.failed,
			refreshInterval: n,
			onRefreshIntervalChange: r
		}), /* @__PURE__ */ D(je, {})]
	});
}
//#endregion
//#region src/components/observability/components/EventTimeline.tsx
function Pe({ events: e, selectedId: n, onSelect: r, live: i = !1 }) {
	let a = w(null), [o, s] = T(!1);
	return x(() => {
		if (!i || o) return;
		let e = a.current;
		e && (e.scrollTop = e.scrollHeight);
	}, [
		e,
		i,
		o
	]), e.length === 0 ? /* @__PURE__ */ D("div", {
		className: "flex-1 flex",
		children: /* @__PURE__ */ D(c, {
			icon: "📡",
			title: "No events yet",
			body: "Trigger a pipeline to see activity here."
		})
	}) : /* @__PURE__ */ O("div", {
		"data-testid": "event-timeline",
		className: "relative flex-1 min-h-0 flex",
		children: [/* @__PURE__ */ D("div", {
			ref: a,
			onScroll: () => {
				let e = a.current;
				if (!e) return;
				let t = e.scrollHeight - e.scrollTop - e.clientHeight < 24;
				s(!t);
			},
			className: "flex-1 overflow-y-auto py-1.5 font-[inherit]",
			children: e.map((e) => /* @__PURE__ */ D(u, {
				timestamp: e.timestamp,
				type: e.type,
				summary: e.summary,
				severity: e.severity,
				selected: e.id === n,
				onClick: r ? () => r(e.id) : void 0
			}, e.id))
		}), i && o && /* @__PURE__ */ D("button", {
			"data-testid": "jump-to-live",
			onClick: () => {
				let e = a.current;
				e && (e.scrollTop = e.scrollHeight, s(!1));
			},
			className: t("absolute bottom-3 left-1/2 -translate-x-1/2", "px-3.5 py-1.5 text-xs font-semibold", "bg-primary text-white", "border-none rounded-full cursor-pointer", "shadow-[0_2px_8px_rgba(0,0,0,0.15)] font-[inherit]"),
			children: "Jump to live ↓"
		})]
	});
}
//#endregion
//#region src/components/observability/components/EventDetailPane.tsx
function Fe(e) {
	try {
		return JSON.stringify(e, null, 2);
	} catch {
		return String(e);
	}
}
function Ie({ event: e }) {
	if (!e) return /* @__PURE__ */ D("div", {
		"data-testid": "event-detail-empty",
		className: t("flex items-center justify-center h-full text-[13px] text-text-tertiary", "p-6 text-center font-[inherit]"),
		children: "Select an event to see details"
	});
	let n = Fe(e.payload ?? e);
	return /* @__PURE__ */ O("div", {
		"data-testid": "event-detail-pane",
		className: "flex flex-col h-full font-[inherit] bg-surface",
		children: [
			/* @__PURE__ */ O("div", {
				className: "px-3.5 py-3 border-b border-border flex flex-col gap-1",
				children: [/* @__PURE__ */ D("div", {
					className: "text-[13px] font-semibold text-text-primary",
					children: e.type
				}), /* @__PURE__ */ D("div", {
					className: "text-[11px] text-text-tertiary",
					children: e.timestamp
				})]
			}),
			/* @__PURE__ */ O("div", {
				className: "px-3.5 py-2.5 flex gap-2 border-b border-border",
				children: [/* @__PURE__ */ D("button", {
					"data-testid": "event-detail-copy",
					onClick: () => {
						typeof navigator < "u" && navigator.clipboard && navigator.clipboard.writeText(n).catch(() => {
							console.warn("[EventDetailPane] clipboard copy failed");
						});
					},
					className: t("px-2.5 py-[5px] text-xs font-semibold", "bg-surface-hover text-text-secondary", "border border-border rounded-md", "cursor-pointer font-[inherit]"),
					children: "Copy"
				}), /* @__PURE__ */ D("button", {
					"data-testid": "event-detail-download",
					onClick: () => {
						if (typeof window > "u") return;
						let t = new Blob([n], { type: "application/json" }), r = URL.createObjectURL(t), i = document.createElement("a");
						i.href = r, i.download = `${e.type}-${e.id}.json`, document.body.appendChild(i), i.click(), document.body.removeChild(i), URL.revokeObjectURL(r);
					},
					className: t("px-2.5 py-[5px] text-xs font-semibold", "bg-surface-hover text-text-secondary", "border border-border rounded-md", "cursor-pointer font-[inherit]"),
					children: "Download"
				})]
			}),
			/* @__PURE__ */ D("pre", {
				className: t("m-0 px-3.5 py-3 flex-1 overflow-auto", "bg-surface-inset font-mono text-xs text-text-primary", "leading-normal whitespace-pre [tab-size:2]"),
				children: n
			})
		]
	});
}
//#endregion
//#region src/components/observability/EventsPage.tsx
var Le = 500, Re = [
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
}, Ve = [
	"node-0",
	"node-1",
	"node-2"
], He = [
	"info",
	"warning",
	"error",
	"success"
];
function Ue(e) {
	return e.includes("failed") || e.includes("error") ? "error" : e.includes("completed") ? "success" : e.includes("warn") || e.includes("awaiting") ? "warning" : "info";
}
function We(e) {
	return e.includes("failed") || e.includes("error") ? "Errors" : e.startsWith("llm.") || e.includes(".llm.") ? "LLM" : e.includes("approval") ? "Approvals" : (e.includes("run.") || e.includes("pipeline."), "Lifecycle");
}
function Ge(e, t) {
	if (t && typeof t == "object") {
		let e = t, n = [];
		if (typeof e.runId == "string" && n.push(`run ${e.runId}`), typeof e.pipelineId == "string" && n.push(`pipeline ${e.pipelineId}`), typeof e.nodeId == "string" && n.push(`node ${e.nodeId}`), n.length > 0) return n.join(" · ");
	}
	return e;
}
function Ke(e = /* @__PURE__ */ new Date()) {
	return `${String(e.getHours()).padStart(2, "0")}:${String(e.getMinutes()).padStart(2, "0")}:${String(e.getSeconds()).padStart(2, "0")}.${String(e.getMilliseconds()).padStart(3, "0")}`;
}
var qe = {
	groups: /* @__PURE__ */ new Set(["All"]),
	runIds: "",
	pipelineIds: "",
	nodes: new Set(Ve),
	severities: new Set(He),
	timeRange: "1h"
};
function Je() {
	let [e, n] = T([]), [r, i] = T(null), [a, o] = T(!1), [s, c] = T(qe), [l, u] = T(!1), d = S(), f = w(a);
	f.current = a;
	let p = w(0), g = b((e) => {
		if (f.current) return;
		let t = e, r = t?.eventType ?? "unknown", i = t?.payload ?? t;
		p.current += 1;
		let a = Date.now(), o = {
			id: `ev-${a}-${p.current}`,
			timestamp: Ke(new Date(a)),
			receivedAt: a,
			type: r,
			summary: Ge(r, i),
			severity: Ue(r),
			payload: i
		};
		n((e) => {
			let t = [...e, o];
			return t.length > Le ? t.slice(t.length - Le) : t;
		});
	}, []);
	h("*", g);
	let _ = C(() => {
		let t = s.runIds.split(",").map((e) => e.trim()).filter(Boolean), n = s.pipelineIds.split(",").map((e) => e.trim()).filter(Boolean), r = s.groups.has("All"), i = Date.now() - Be[s.timeRange];
		return e.filter((e) => {
			if (typeof e.receivedAt == "number" && e.receivedAt < i) return !1;
			if (!r) {
				let t = We(e.type);
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
	}, [e, s]), x = C(() => _.find((e) => e.id === r) ?? null, [_, r]), k = (e) => {
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
	return /* @__PURE__ */ O("div", {
		"data-testid": "events-page",
		className: "flex flex-col h-full min-h-0 font-[inherit] text-[13px] text-text-primary bg-surface",
		children: [/* @__PURE__ */ O("div", {
			className: "flex items-center gap-3 px-4 py-2.5 border-b border-border bg-surface-panel",
			children: [
				/* @__PURE__ */ D("button", {
					onClick: () => o((e) => !e),
					"data-testid": "events-live-toggle",
					className: t("px-3 py-[5px] text-xs font-semibold rounded-md cursor-pointer font-[inherit]", a ? "bg-surface-hover text-text-secondary border border-border" : "bg-state-completed text-white border border-state-completed"),
					children: a ? "■ Paused" : "● Live"
				}),
				/* @__PURE__ */ D(v, {
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
				/* @__PURE__ */ O("div", {
					className: "ml-auto text-xs text-text-tertiary",
					children: [
						_.length,
						" / ",
						e.length,
						" event",
						e.length === 1 ? "" : "s"
					]
				})
			]
		}), /* @__PURE__ */ O("div", {
			className: "flex flex-1 min-h-0",
			children: [
				/* @__PURE__ */ O("aside", {
					"data-testid": "events-filter-rail",
					className: t("shrink-0 border-r border-border bg-surface-panel overflow-y-auto transition-[width] duration-150 ease-in-out", l ? "w-9" : "w-60"),
					children: [/* @__PURE__ */ O("div", {
						className: "flex items-center justify-between px-3.5 py-2.5 border-b border-border",
						children: [!l && /* @__PURE__ */ D("div", {
							className: "text-[11px] font-bold tracking-[0.3px] text-text-secondary",
							children: "FILTERS"
						}), /* @__PURE__ */ D("button", {
							onClick: () => u((e) => !e),
							"aria-label": l ? "Expand filters" : "Collapse filters",
							className: "border-none bg-transparent text-text-tertiary cursor-pointer text-xs p-0.5 font-[inherit]",
							children: l ? "›" : "‹"
						})]
					}), !l && /* @__PURE__ */ O(E, { children: [
						/* @__PURE__ */ O("div", {
							role: "group",
							"aria-labelledby": `${d}-event-type`,
							className: "flex flex-col gap-1.5 px-3.5 py-3 border-b border-border",
							children: [/* @__PURE__ */ D("div", {
								id: `${d}-event-type`,
								className: "text-[11px] font-bold tracking-[0.3px] text-text-secondary uppercase",
								children: "Event type"
							}), Re.map((e) => /* @__PURE__ */ O("label", {
								className: "flex items-center gap-1.5 text-xs",
								children: [/* @__PURE__ */ D(y, {
									checked: s.groups.has(e),
									onChange: () => k(e)
								}), e]
							}, e))]
						}),
						/* @__PURE__ */ O("div", {
							className: "flex flex-col gap-1.5 px-3.5 py-3 border-b border-border",
							children: [/* @__PURE__ */ D("label", {
								htmlFor: `${d}-runs`,
								className: "text-[11px] font-bold tracking-[0.3px] text-text-secondary uppercase",
								children: "Runs"
							}), /* @__PURE__ */ D(m, {
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
						/* @__PURE__ */ O("div", {
							className: "flex flex-col gap-1.5 px-3.5 py-3 border-b border-border",
							children: [/* @__PURE__ */ D("label", {
								htmlFor: `${d}-pipelines`,
								className: "text-[11px] font-bold tracking-[0.3px] text-text-secondary uppercase",
								children: "Pipelines"
							}), /* @__PURE__ */ D(m, {
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
						/* @__PURE__ */ O("div", {
							role: "group",
							"aria-labelledby": `${d}-nodes`,
							className: "flex flex-col gap-1.5 px-3.5 py-3 border-b border-border",
							children: [/* @__PURE__ */ D("div", {
								id: `${d}-nodes`,
								className: "text-[11px] font-bold tracking-[0.3px] text-text-secondary uppercase",
								children: "Nodes"
							}), Ve.map((e) => /* @__PURE__ */ O("label", {
								className: "flex items-center gap-1.5 text-xs",
								children: [/* @__PURE__ */ D(y, {
									checked: s.nodes.has(e),
									onChange: () => A(e)
								}), e]
							}, e))]
						}),
						/* @__PURE__ */ O("div", {
							role: "group",
							"aria-labelledby": `${d}-severity`,
							className: "flex flex-col gap-1.5 px-3.5 py-3 border-b border-border",
							children: [/* @__PURE__ */ D("div", {
								id: `${d}-severity`,
								className: "text-[11px] font-bold tracking-[0.3px] text-text-secondary uppercase",
								children: "Severity"
							}), He.map((e) => /* @__PURE__ */ O("label", {
								className: "flex items-center gap-1.5 text-xs",
								children: [/* @__PURE__ */ D(y, {
									checked: s.severities.has(e),
									onChange: () => j(e)
								}), e]
							}, e))]
						}),
						/* @__PURE__ */ D("div", {
							className: "px-3.5 py-3",
							children: /* @__PURE__ */ D("button", {
								"data-testid": "events-clear-filters",
								onClick: () => c(qe),
								className: "px-3 py-1.5 text-[13px] bg-transparent border-none text-text-secondary cursor-pointer font-[inherit] shrink-0",
								children: "Clear"
							})
						})
					] })]
				}),
				/* @__PURE__ */ D("section", {
					className: "flex-1 min-w-0 flex flex-col",
					children: /* @__PURE__ */ D(Pe, {
						events: _,
						selectedId: r,
						onSelect: i,
						live: !a
					})
				}),
				/* @__PURE__ */ D("aside", {
					className: "w-80 shrink-0 border-l border-border bg-surface",
					children: /* @__PURE__ */ D(Ie, { event: x })
				})
			]
		})]
	});
}
function Ye() {
	return /* @__PURE__ */ D(Je, {});
}
//#endregion
//#region src/components/pipelines/chaos/chaosState.ts
var Xe = {
	injectedLatencyMs: 0,
	injectedFailureRate: 0,
	paused: !1
}, X = { ...Xe }, Z = /* @__PURE__ */ new Set();
function Ze() {
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
function Qe() {
	Q(Xe);
}
function $e(e) {
	return Z.add(e), () => {
		Z.delete(e);
	};
}
//#endregion
//#region src/components/observability/components/ChaosPanel.tsx
var et = [
	{ id: "node-0" },
	{ id: "node-1" },
	{ id: "node-2" }
];
function tt(e) {
	let { onInjectLatency: n = (e) => Q({ injectedLatencyMs: Math.max(0, e) }), onInjectPartition: r = (e) => Q({ paused: e.length > 0 }), onDropMessages: i = (e) => Q({ injectedFailureRate: Math.min(1, Math.max(0, e / 100)) }), onKillAll: a = () => Q({ paused: !0 }), onReset: o = () => Qe(), availableNodes: c = et } = e, [l, u] = T("0"), [d, f] = T("0"), [p, h] = T([]), [g, _] = T(!1), v = S(), [b, w] = T(() => Ze());
	x(() => $e((e) => w(e)), []);
	let k = (e) => {
		h((t) => t.includes(e) ? t.filter((t) => t !== e) : [...t, e]);
	}, A = () => {
		let e = Number.parseInt(l, 10);
		Number.isFinite(e) && n(e);
	}, j = () => {
		let e = Number.parseInt(d, 10);
		Number.isFinite(e) && i(e);
	}, M = () => {
		r(p);
	}, N = () => {
		a(), _(!1);
	}, P = () => {
		Q({ paused: !b.paused });
	}, F = C(() => c, [c]), I = b.injectedLatencyMs > 0 || b.injectedFailureRate > 0 || b.paused;
	return /* @__PURE__ */ O("div", {
		"data-testid": "chaos-panel",
		className: "w-60 shrink-0 p-4 bg-surface-panel border-r border-border font-[inherit] text-[13px] text-text-primary overflow-y-auto",
		children: [
			/* @__PURE__ */ D("div", {
				className: "text-[11px] font-bold text-text-secondary tracking-[0.4px] mb-3",
				children: "CHAOS"
			}),
			/* @__PURE__ */ O("div", {
				"data-testid": "chaos-state-readout",
				className: t("flex flex-col gap-1.5 pb-3 mb-3 border-b border-border", I && "bg-warning-bg p-2 rounded-md border border-warning-border"),
				children: [
					/* @__PURE__ */ D("div", {
						className: "text-[11px] font-semibold text-text-secondary uppercase tracking-[0.3px]",
						children: "Current state"
					}),
					/* @__PURE__ */ O("div", {
						className: "text-xs text-text-primary leading-relaxed",
						children: [
							/* @__PURE__ */ O("div", { children: [
								/* @__PURE__ */ D("span", {
									className: "text-text-tertiary",
									children: "Latency:"
								}),
								" ",
								/* @__PURE__ */ D("strong", {
									"data-testid": "chaos-state-latency",
									children: b.injectedLatencyMs
								}),
								" ms"
							] }),
							/* @__PURE__ */ O("div", { children: [
								/* @__PURE__ */ D("span", {
									className: "text-text-tertiary",
									children: "Failure rate:"
								}),
								" ",
								/* @__PURE__ */ D("strong", {
									"data-testid": "chaos-state-failure",
									children: Math.round(b.injectedFailureRate * 100)
								}),
								"%"
							] }),
							/* @__PURE__ */ O("div", { children: [
								/* @__PURE__ */ D("span", {
									className: "text-text-tertiary",
									children: "Paused:"
								}),
								" ",
								/* @__PURE__ */ D("strong", {
									"data-testid": "chaos-state-paused",
									children: b.paused ? "yes" : "no"
								})
							] })
						]
					}),
					/* @__PURE__ */ D("button", {
						"data-testid": "chaos-pause-toggle",
						onClick: P,
						className: "px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-white border-none rounded-md cursor-pointer font-[inherit] shrink-0",
						children: b.paused ? "Resume" : "Pause"
					})
				]
			}),
			/* @__PURE__ */ O("div", {
				className: "flex flex-col gap-1.5 pb-3 mb-3 border-b border-border",
				children: [
					/* @__PURE__ */ D("div", {
						className: "text-[11px] font-semibold text-text-secondary uppercase tracking-[0.3px]",
						children: "Latency"
					}),
					/* @__PURE__ */ O("div", {
						className: "flex gap-1.5",
						children: [/* @__PURE__ */ D(m, {
							"data-testid": "chaos-latency-input",
							type: "number",
							min: 0,
							value: l,
							onChange: (e) => u(e.target.value),
							className: "flex-1 min-w-[60px]",
							"aria-label": "Latency in milliseconds"
						}), /* @__PURE__ */ D("span", {
							className: "text-[11px] text-text-tertiary self-center",
							children: "ms"
						})]
					}),
					/* @__PURE__ */ D("button", {
						"data-testid": "chaos-latency-apply",
						onClick: A,
						className: "px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-white border-none rounded-md cursor-pointer font-[inherit] shrink-0",
						children: "Apply"
					})
				]
			}),
			/* @__PURE__ */ O("div", {
				role: "group",
				"aria-labelledby": `${v}-partition`,
				className: "flex flex-col gap-1.5 pb-3 mb-3 border-b border-border",
				children: [
					/* @__PURE__ */ D("div", {
						id: `${v}-partition`,
						className: "text-[11px] font-semibold text-text-secondary uppercase tracking-[0.3px]",
						children: "Partition nodes"
					}),
					/* @__PURE__ */ D("div", {
						className: "flex flex-col gap-1",
						children: F.map((e) => /* @__PURE__ */ O("label", {
							className: "flex items-center gap-1.5 text-xs text-text-primary cursor-pointer",
							children: [/* @__PURE__ */ D(y, {
								checked: p.includes(e.id),
								onChange: () => k(e.id)
							}), e.label ?? e.id]
						}, e.id))
					}),
					/* @__PURE__ */ D("button", {
						"data-testid": "chaos-partition-inject",
						onClick: M,
						className: t("px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-white border-none rounded-md font-[inherit] shrink-0", p.length === 0 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"),
						disabled: p.length === 0,
						children: "Inject"
					})
				]
			}),
			/* @__PURE__ */ O("div", {
				className: "flex flex-col gap-1.5 pb-3 mb-3 border-b border-border",
				children: [
					/* @__PURE__ */ D("div", {
						className: "text-[11px] font-semibold text-text-secondary uppercase tracking-[0.3px]",
						children: "Drop messages"
					}),
					/* @__PURE__ */ O("div", {
						className: "flex gap-1.5",
						children: [/* @__PURE__ */ D(m, {
							"data-testid": "chaos-drop-input",
							type: "number",
							min: 0,
							max: 100,
							value: d,
							onChange: (e) => f(e.target.value),
							className: "flex-1 min-w-[60px]",
							"aria-label": "Drop percent"
						}), /* @__PURE__ */ D("span", {
							className: "text-[11px] text-text-tertiary self-center",
							children: "%"
						})]
					}),
					/* @__PURE__ */ D("button", {
						"data-testid": "chaos-drop-apply",
						onClick: j,
						className: "px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-white border-none rounded-md cursor-pointer font-[inherit] shrink-0",
						children: "Apply"
					})
				]
			}),
			/* @__PURE__ */ O("div", {
				className: "flex flex-col gap-2",
				children: [/* @__PURE__ */ D("button", {
					"data-testid": "chaos-kill-all",
					onClick: () => _(!0),
					className: "px-3.5 py-1.5 text-[13px] font-semibold bg-state-failed text-white border-none rounded-md cursor-pointer font-[inherit]",
					children: "Kill all"
				}), /* @__PURE__ */ D("button", {
					"data-testid": "chaos-reset",
					onClick: o,
					className: "px-3 py-1.5 text-[13px] bg-transparent border-none text-text-secondary cursor-pointer font-[inherit] shrink-0",
					children: "Reset"
				})]
			}),
			/* @__PURE__ */ D(s, {
				open: g,
				onClose: () => _(!1),
				title: "Kill all nodes?",
				footer: /* @__PURE__ */ O(E, { children: [/* @__PURE__ */ D("button", {
					"data-testid": "chaos-kill-cancel",
					onClick: () => _(!1),
					className: "px-3 py-1.5 text-[13px] bg-transparent border-none text-text-secondary cursor-pointer font-[inherit] shrink-0",
					children: "Cancel"
				}), /* @__PURE__ */ D("button", {
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
function nt() {
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
function rt() {
	let e = _?.regions ?? {}, t = [];
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
	return t.length > 0 ? t : nt();
}
function it(e) {
	return e >= 1024 ? `${(e / 1024).toFixed(1)}G` : `${Math.round(e)}M`;
}
function at({ nodes: e, onAddLatency: t, onKillNode: n, onTransferResource: r }) {
	let i = C(rt, []), a = e ?? i, [o, s] = T(null), c = C(() => a.find((e) => e.id === o) ?? null, [a, o]);
	return /* @__PURE__ */ O("div", {
		"data-testid": "nodes-page",
		className: "flex h-full min-h-0 font-[inherit] text-[13px] text-text-primary bg-surface",
		children: [
			/* @__PURE__ */ D("div", {
				title: "Stub: writes to local chaosState; real cluster injection ships in Phase 5",
				"data-testid": "chaos-rail-stub-wrapper",
				children: /* @__PURE__ */ D(tt, { availableNodes: a.map((e) => ({
					id: e.id,
					label: e.id
				})) })
			}),
			/* @__PURE__ */ D("section", {
				className: "flex-1 min-w-0 overflow-auto p-6",
				children: /* @__PURE__ */ D(H, {
					nodes: a,
					selectedId: o ?? void 0,
					onSelect: (e) => s(e === o ? null : e)
				})
			}),
			c && /* @__PURE__ */ O("aside", {
				"data-testid": "nodes-detail-drawer",
				className: "w-80 shrink-0 border-l border-border bg-surface flex flex-col overflow-y-auto",
				children: [
					/* @__PURE__ */ O("div", {
						className: "px-3.5 py-3 border-b border-border flex items-center justify-between",
						children: [/* @__PURE__ */ O("div", {
							className: "flex flex-col",
							children: [/* @__PURE__ */ D("div", {
								className: "text-[13px] font-semibold",
								children: c.id
							}), /* @__PURE__ */ D("div", {
								className: "text-[11px] text-text-tertiary",
								children: [c.role, c.region].filter(Boolean).join(" · ") || "worker"
							})]
						}), /* @__PURE__ */ D("button", {
							"data-testid": "nodes-detail-close",
							onClick: () => s(null),
							"aria-label": "Close drawer",
							className: "border-none bg-transparent text-text-tertiary cursor-pointer text-base p-0.5 font-[inherit]",
							children: "×"
						})]
					}),
					/* @__PURE__ */ O("div", {
						className: "px-3.5 py-3 border-b border-border flex flex-col gap-2",
						children: [/* @__PURE__ */ D("div", {
							className: "text-[11px] font-bold tracking-[0.3px] text-text-secondary uppercase",
							children: "Metrics"
						}), /* @__PURE__ */ D("table", {
							className: "w-full text-xs border-collapse",
							children: /* @__PURE__ */ D("tbody", { children: [
								["Status", c.status],
								["CPU", `${Math.round(c.cpu)}%`],
								["Memory", it(c.memoryMb)],
								["Connections", String(c.connections)],
								["Active runs", String(c.activeRuns)],
								["Region", c.region ?? "—"],
								["Role", c.role ?? "—"]
							].map(([e, t]) => /* @__PURE__ */ O("tr", { children: [/* @__PURE__ */ D("td", {
								className: "text-text-tertiary py-[3px] w-[45%]",
								children: e
							}), /* @__PURE__ */ D("td", {
								className: "text-text-primary py-[3px]",
								children: t
							})] }, e)) })
						})]
					}),
					/* @__PURE__ */ O("div", {
						className: "px-3.5 py-3 border-b border-border flex flex-col gap-2",
						children: [/* @__PURE__ */ D("div", {
							className: "text-[11px] font-bold tracking-[0.3px] text-text-secondary uppercase",
							children: "Owned resources"
						}), /* @__PURE__ */ D("div", {
							className: "text-xs text-text-tertiary",
							children: "No resources owned (Phase 1 placeholder)."
						})]
					}),
					(t || n) && /* @__PURE__ */ O("div", {
						className: "px-3.5 py-3 border-b border-border flex flex-col gap-2",
						children: [
							/* @__PURE__ */ D("div", {
								className: "text-[11px] font-bold tracking-[0.3px] text-text-secondary uppercase",
								children: "Chaos (this node)"
							}),
							t && /* @__PURE__ */ D("button", {
								onClick: () => t(c.id),
								className: "self-start px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-white border-none rounded-md cursor-pointer font-[inherit] shrink-0",
								children: "Add latency"
							}),
							n && /* @__PURE__ */ D("button", {
								onClick: () => n(c.id),
								className: "self-start px-3.5 py-1.5 text-[13px] font-semibold bg-state-failed text-white border-none rounded-md cursor-pointer font-[inherit]",
								children: "Kill node"
							})
						]
					}),
					r && /* @__PURE__ */ O("div", {
						className: "px-3.5 py-3 border-b border-border flex flex-col gap-2",
						children: [/* @__PURE__ */ D("div", {
							className: "text-[11px] font-bold tracking-[0.3px] text-text-secondary uppercase",
							children: "Actions"
						}), /* @__PURE__ */ D("button", {
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
function lt({ severity: e, title: n, description: r, timestamp: i, resolved: a = !1, action: s, className: c, style: l, "data-testid": u = `alert-${e}` }) {
	return /* @__PURE__ */ O("div", {
		role: "listitem",
		"data-testid": u,
		"data-resolved": a || void 0,
		className: t("rounded-md px-3 py-2.5 border-l-[3px] transition-opacity duration-300", a ? "bg-[var(--color-surface-subtle,#f8fafc)] border-l-[var(--color-text-tertiary)] opacity-70" : t(st[e], ct[e]), c),
		style: l,
		children: [/* @__PURE__ */ O("div", {
			className: "flex items-center gap-1.5",
			children: [
				/* @__PURE__ */ D(f, {
					size: "xs",
					color: a ? "var(--color-text-tertiary)" : ot[e],
					"aria-label": a ? "Resolved" : e
				}),
				/* @__PURE__ */ D("span", {
					className: "text-[12px] font-semibold text-[var(--color-text-primary)]",
					children: n
				}),
				a && /* @__PURE__ */ D(o, {
					tone: "success",
					size: "xs",
					className: "ml-1",
					children: "Resolved"
				}),
				i != null && /* @__PURE__ */ D("span", {
					className: "ml-auto text-[10px] text-[var(--color-text-tertiary)]",
					children: i
				}),
				s && /* @__PURE__ */ D("span", {
					className: "ml-1 shrink-0",
					children: s
				})
			]
		}), r != null && /* @__PURE__ */ D("div", {
			className: "mt-1 text-[11px] leading-snug text-[var(--color-text-secondary)]",
			children: r
		})]
	});
}
//#endregion
//#region src/components/observability/components/AlertList.tsx
var ut = /* @__PURE__ */ D("div", {
	className: "text-center text-[12px] text-[var(--color-text-tertiary)] py-8",
	children: "No alerts."
}), dt = /* @__PURE__ */ D("div", {
	className: "text-center text-[12px] text-[var(--color-text-tertiary)] py-8",
	children: "Loading alerts…"
});
function ft({ items: e, title: r = "Alerts", headerSlot: i, loading: a = !1, empty: s, maxHeight: c, className: l, style: u, "data-testid": f = "alert-list" }) {
	let p = e.filter((e) => !e.resolved).length, m = p > 0 ? /* @__PURE__ */ O(o, {
		tone: "danger",
		size: "xs",
		"data-testid": "alert-list-active-count",
		children: [p, " active"]
	}) : null;
	return /* @__PURE__ */ O(n, {
		"data-testid": f,
		className: t("flex flex-col", l),
		style: u,
		children: [/* @__PURE__ */ D("div", {
			className: "px-4 py-3 border-b border-[var(--color-border)]",
			children: /* @__PURE__ */ D(d, {
				title: r,
				meta: i ?? m
			})
		}), /* @__PURE__ */ D("div", {
			role: "list",
			"data-testid": `${f}-rows`,
			className: "flex-1 overflow-y-auto p-2 space-y-1.5",
			style: { maxHeight: c },
			children: a ? dt : e.length === 0 ? s ?? ut : e.map((e) => /* @__PURE__ */ D(lt, {
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
function ht({ status: e, label: n, reason: r, dense: i = !1, className: a, style: o, "data-testid": s = `health-cell-${e}` }) {
	return /* @__PURE__ */ O("div", {
		"data-testid": s,
		"data-status": e,
		className: t("rounded-md border transition-colors duration-300", i ? "px-2.5 py-2" : "px-3 py-2.5", mt[e], a),
		style: o,
		children: [/* @__PURE__ */ O("div", {
			className: "flex items-center gap-1.5",
			children: [/* @__PURE__ */ D(f, {
				size: "xs",
				color: pt[e],
				"aria-label": e
			}), /* @__PURE__ */ D("span", {
				className: "text-[11px] font-semibold text-[var(--color-text-primary)]",
				children: n
			})]
		}), /* @__PURE__ */ D("div", {
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
}, _t = /* @__PURE__ */ D("div", {
	className: "text-center text-[12px] text-[var(--color-text-tertiary)] py-8",
	children: "No nodes reporting."
});
function vt({ items: e, columns: r = 3, dense: i = !1, title: a, headerSlot: o, empty: s, className: c, style: l, "data-testid": u = "health-grid" }) {
	let f = e.length === 0 ? s ?? _t : /* @__PURE__ */ D("div", {
		role: "list",
		className: t("grid grid-cols-1", gt[r], i ? "gap-1.5" : "gap-2"),
		children: e.map((e) => /* @__PURE__ */ D("div", {
			role: "listitem",
			children: /* @__PURE__ */ D(ht, {
				status: e.status,
				label: e.label,
				reason: e.reason,
				dense: i
			})
		}, e.id))
	});
	return a ? /* @__PURE__ */ O(n, {
		"data-testid": u,
		className: t("flex flex-col", c),
		style: l,
		children: [/* @__PURE__ */ D("div", {
			className: "px-4 py-3 border-b border-[var(--color-border)]",
			children: /* @__PURE__ */ D(d, {
				title: a,
				meta: o
			})
		}), /* @__PURE__ */ D("div", {
			className: t(i ? "p-2" : "p-3"),
			children: f
		})]
	}) : /* @__PURE__ */ D("div", {
		"data-testid": u,
		className: t(i ? "p-2" : "p-3", c),
		style: l,
		children: f
	});
}
//#endregion
export { lt as AlertItem, ft as AlertList, z as DashboardKPIStrip, Se as DashboardPage, Ye as EventsPage, ht as HealthCell, vt as HealthGrid, Oe as MetricTimeSeriesPanel, Ne as MetricsPage, at as NodesPage, j as ObservabilityLayout };
