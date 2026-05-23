import { jsxs as i, jsx as t, Fragment as z } from "react/jsx-runtime";
import { Outlet as de, useNavigate as ce } from "react-router";
import { createContext as pe, useContext as ue, useState as b, useRef as T, useCallback as W, useEffect as O, useMemo as D } from "react";
import { u as xe } from "./EventStreamContext-DEaDWFtC.js";
import { u as me } from "./IdentityContext-CLalsm_M.js";
import { a as fe, S as ee } from "./Sparkline-B8POanAQ.js";
import { c as h } from "./cn-B6yFEsav.js";
import { S as he, L as $, B as be } from "./Chart-ByoxeiYX.js";
import { E as ge } from "./EmptyState-PM9wTjxk.js";
import { M as ye } from "./Modal-2jg4229_.js";
const ve = {
  info: "text-slate-500",
  warning: "text-amber-600",
  error: "text-red-600",
  success: "text-green-600"
};
function te({ timestamp: e, type: r, summary: n, severity: a = "info", onClick: s, selected: c }) {
  const l = fe(r);
  return /* @__PURE__ */ i(
    "div",
    {
      "data-testid": "event-row",
      onClick: s,
      className: h(
        "flex items-center gap-2 px-2.5 py-1.5 text-[13px] font-[inherit] rounded-md text-slate-900",
        c ? "bg-violet-100" : "bg-transparent",
        s ? "cursor-pointer" : "cursor-default"
      ),
      children: [
        /* @__PURE__ */ t("span", { className: "text-sm shrink-0", style: { color: l.color }, children: l.icon }),
        /* @__PURE__ */ t("span", { className: "text-[11px] text-slate-400 shrink-0 w-[70px]", children: e }),
        /* @__PURE__ */ t("span", { className: h("text-xs font-semibold shrink-0", ve[a]), children: r }),
        /* @__PURE__ */ t("span", { className: "flex-1 overflow-hidden text-ellipsis whitespace-nowrap", children: n })
      ]
    }
  );
}
function Ft() {
  return /* @__PURE__ */ t(de, {});
}
const re = {
  overview: {
    totalNodes: 3,
    healthyNodes: 3,
    totalResources: 0,
    totalConnections: 0,
    messagesPerSecond: 0,
    averageLatency: 0,
    clusterHealth: "healthy"
  },
  regions: {},
  alerts: []
}, Ne = {
  dashboard: null,
  loading: !1,
  error: null,
  lastUpdatedAt: null,
  live: !0,
  setLive: () => {
  },
  refreshDashboard: async () => {
  },
  recentEvents: [],
  activeRunsCount: 0,
  isLiveData: !1
}, we = pe(Ne);
function J() {
  return ue(we);
}
function ke() {
  return J().dashboard;
}
const Ce = "", Se = 1e4, Me = 1e3, Re = 2, Le = 3e4;
function Ae(e) {
  const r = Math.max(0, e - 1);
  return Math.min(
    Me * Math.pow(Re, r),
    Le
  );
}
function Ie() {
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
function Ee(e) {
  const r = e ?? {}, n = (c) => typeof c == "number" && Number.isFinite(c) ? c : null, a = r.source, s = a === "bridge" || a === "stub" || a === "error" ? a : (
    // Backwards-compat: legacy responses without a discriminator are
    // assumed to be stub-shaped (full numbers), since the previous
    // backend always synthesized values.
    "stub"
  );
  return {
    runsStarted: n(r.runsStarted),
    runsCompleted: n(r.runsCompleted),
    runsFailed: n(r.runsFailed),
    runsActive: n(r.runsActive),
    runsAwaitingApproval: n(r.runsAwaitingApproval),
    avgDurationMs: n(r.avgDurationMs),
    llmTokensIn: n(r.llmTokensIn),
    llmTokensOut: n(r.llmTokensOut),
    estimatedCostUsd: n(r.estimatedCostUsd),
    // distributed-core v0.3.7+ surfaces this via the bridge. Older responses
    // omit it entirely → numOrNull collapses `undefined` to `null`, preserving
    // back-compat with the pre-v0.3.7 backend.
    avgFirstTokenLatencyMs: n(r.avgFirstTokenLatencyMs),
    asOf: typeof r.asOf == "string" ? r.asOf : (/* @__PURE__ */ new Date()).toISOString(),
    source: s
  };
}
function ne() {
  const { idToken: e } = me(), [r, n] = b(null), [a, s] = b(!0), [c, l] = b(null), [u, x] = b(null), [d, p] = b(!1), y = T(null), L = T(!0), A = T(!1), M = T(0), v = W(async () => {
    y.current && y.current.abort();
    const N = new AbortController();
    y.current = N;
    try {
      const k = {
        "Content-Type": "application/json"
      };
      e && (k.Authorization = `Bearer ${e}`);
      const R = await fetch(`${Ce}/api/pipelines/metrics`, {
        method: "GET",
        headers: k,
        signal: N.signal
      });
      if (!R.ok)
        throw new Error(`HTTP ${R.status}`);
      const o = Ee(await R.json());
      if (!L.current || N.signal.aborted) return;
      n(o), x((/* @__PURE__ */ new Date()).toISOString()), l(null), p(!0), A.current = !1, M.current = 0;
    } catch (k) {
      if (k.name === "AbortError" || !L.current) return;
      l(k.message || "Failed to fetch pipeline metrics"), p(!1), M.current += 1, n((R) => R ?? Ie()), A.current || (console.warn(
        "[usePipelineMetrics] /api/pipelines/metrics unreachable — using fallback",
        k
      ), A.current = !0);
    } finally {
      L.current && !N.signal.aborted && s(!1);
    }
  }, [e]);
  return O(() => {
    L.current = !0;
    let N = null;
    const k = () => {
      N !== null && (clearTimeout(N), N = null);
    }, R = () => {
      if (!L.current || document.hidden) return;
      const g = M.current > 0 ? Ae(M.current) : Se;
      N = setTimeout(() => {
        N = null, v().finally(() => {
          R();
        });
      }, g);
    }, o = () => {
      N === null && R();
    };
    v().finally(() => {
      document.hidden || o();
    });
    const f = () => {
      document.hidden ? k() : (k(), v().finally(() => {
        document.hidden || o();
      }));
    };
    return document.addEventListener("visibilitychange", f), () => {
      L.current = !1, k(), document.removeEventListener("visibilitychange", f), y.current && (y.current.abort(), y.current = null);
    };
  }, [v]), {
    metrics: r,
    loading: a,
    error: c,
    lastUpdatedAt: u,
    refresh: v,
    isLiveData: d,
    source: r?.source ?? null
  };
}
function Te(e) {
  return typeof e == "number" ? e.toLocaleString() : e;
}
function H({ title: e, value: r, delta: n, sparklineData: a, onClick: s }) {
  const [c, l] = b(!1), u = !!s;
  return /* @__PURE__ */ i(
    "div",
    {
      "data-testid": "kpi-card",
      onClick: s,
      onMouseEnter: () => l(!0),
      onMouseLeave: () => l(!1),
      role: u ? "button" : void 0,
      tabIndex: u ? 0 : void 0,
      onKeyDown: u ? (x) => {
        (x.key === "Enter" || x.key === " ") && (x.preventDefault(), s?.());
      } : void 0,
      className: h(
        "flex-1 min-w-[180px] bg-surface border rounded-[10px] p-4",
        "flex flex-col gap-1.5 font-[inherit] transition-[border-color] duration-[120ms] ease-linear",
        u ? "cursor-pointer" : "cursor-default",
        c && u ? "border-primary" : "border-border"
      ),
      children: [
        /* @__PURE__ */ t("div", { className: "text-xs font-semibold text-text-secondary tracking-[0.2px]", children: e }),
        /* @__PURE__ */ i("div", { className: "flex items-baseline justify-between gap-2", children: [
          /* @__PURE__ */ t("div", { className: "text-[28px] font-bold text-text-primary leading-[1.1]", children: Te(r) }),
          a && a.length > 0 && /* @__PURE__ */ t(
            ee,
            {
              data: a,
              width: 80,
              height: 20,
              color: "#646cff"
            }
          )
        ] }),
        n && /* @__PURE__ */ i(
          "div",
          {
            className: h(
              "text-[11px] font-semibold font-[inherit]",
              n.direction === "up" ? "text-state-completed" : "text-state-failed"
            ),
            children: [
              n.direction === "up" ? "▲" : "▼",
              " ",
              Math.abs(n.value),
              "%"
            ]
          }
        )
      ]
    }
  );
}
function Pe({
  runsToday: e,
  runsSparkline: r,
  activeNow: n,
  pendingApprovals: a,
  failed24h: s,
  avgFirstTokenLatency: c,
  onScrollToActive: l,
  onGoToPipelines: u,
  onGoToFailedEvents: x
}) {
  return /* @__PURE__ */ i("div", { className: "grid grid-cols-[repeat(auto-fit,minmax(170px,1fr))] gap-4", children: [
    /* @__PURE__ */ t(
      H,
      {
        title: "Runs today",
        value: e,
        delta: typeof e == "number" ? { value: 12, direction: "up" } : void 0,
        sparklineData: r
      }
    ),
    /* @__PURE__ */ t(
      H,
      {
        title: "Active now",
        value: n,
        onClick: l
      }
    ),
    /* @__PURE__ */ t(
      H,
      {
        title: "Pending approvals",
        value: a,
        onClick: u
      }
    ),
    /* @__PURE__ */ t(
      H,
      {
        title: "Failed (24h)",
        value: s,
        delta: typeof s == "number" ? { value: 4, direction: "down" } : void 0,
        onClick: x
      }
    ),
    /* @__PURE__ */ t(
      H,
      {
        title: "Avg first-token latency",
        value: c
      }
    )
  ] });
}
const Y = {
  healthy: "border-state-completed",
  degraded: "border-state-awaiting",
  dead: "border-state-failed",
  idle: "border-state-idle"
}, Fe = {
  healthy: "bg-state-completed",
  degraded: "bg-state-awaiting",
  dead: "bg-state-failed",
  idle: "bg-state-idle"
};
function $e(e) {
  return e >= 1024 ? `${(e / 1024).toFixed(1)}G` : `${Math.round(e)}M`;
}
function B({ label: e, value: r }) {
  return /* @__PURE__ */ i("div", { className: "flex justify-between items-baseline text-xs font-[inherit]", children: [
    /* @__PURE__ */ t("span", { className: "text-text-secondary font-semibold", children: e }),
    /* @__PURE__ */ t("span", { className: "text-text-primary font-mono text-[11px]", children: r })
  ] });
}
function De({ node: e, selected: r, onClick: n, onKill: a }) {
  const [s, c] = b(!1), l = e.activeRuns > 0 ? `${e.activeRuns}` : "— idle";
  return /* @__PURE__ */ i(
    "div",
    {
      "data-testid": "node-grid-tile",
      onClick: n,
      onMouseEnter: () => c(!0),
      onMouseLeave: () => c(!1),
      className: h(
        "w-[200px] h-[200px] bg-surface rounded-[10px] p-3",
        "flex flex-col gap-1.5 font-[inherit] box-border border",
        "transition-[box-shadow,border-color] duration-[120ms] ease-linear",
        n ? "cursor-pointer" : "cursor-default",
        r ? "border-primary shadow-[0_0_0_4px_rgba(100,108,255,0.18)]" : s ? h(Y[e.status], "shadow-[0_2px_8px_rgba(100,108,255,0.10)]") : Y[e.status]
      ),
      children: [
        /* @__PURE__ */ i("div", { className: "flex justify-between items-center", children: [
          /* @__PURE__ */ t(
            "div",
            {
              className: "text-[13px] font-semibold text-text-primary overflow-hidden text-ellipsis whitespace-nowrap",
              title: e.id,
              children: e.id
            }
          ),
          /* @__PURE__ */ t(
            "span",
            {
              role: "img",
              "aria-label": `status ${e.status}`,
              className: h("w-2 h-2 rounded-full shrink-0", Fe[e.status])
            }
          )
        ] }),
        (e.role || e.region) && /* @__PURE__ */ t("div", { className: "text-[11px] text-text-tertiary font-[inherit]", children: [e.role, e.region].filter(Boolean).join(" · ") }),
        /* @__PURE__ */ i("div", { className: "flex flex-col gap-0.5", children: [
          /* @__PURE__ */ t(B, { label: "CPU", value: `${Math.round(e.cpu)}%` }),
          /* @__PURE__ */ t(B, { label: "MEM", value: $e(e.memoryMb) }),
          /* @__PURE__ */ t(B, { label: "CONN", value: `${e.connections}` }),
          /* @__PURE__ */ t(B, { label: "RUNS", value: l })
        ] }),
        /* @__PURE__ */ t("div", { className: "mt-auto", children: /* @__PURE__ */ t(
          ee,
          {
            data: e.cpuHistory,
            width: 176,
            height: 18,
            color: "#646cff"
          }
        ) }),
        a && /* @__PURE__ */ t(
          "button",
          {
            "data-testid": "node-kill-btn",
            onClick: (u) => {
              u.stopPropagation(), a();
            },
            className: "self-start px-2 py-0.5 text-[11px] font-semibold bg-transparent text-text-tertiary border border-border rounded-sm cursor-pointer font-[inherit]",
            children: "● kill"
          }
        )
      ]
    }
  );
}
function ae({ nodes: e, onSelect: r, selectedId: n }) {
  return !e || e.length === 0 ? /* @__PURE__ */ t(
    "div",
    {
      "data-testid": "node-grid-empty",
      className: h("p-6 text-center text-text-tertiary text-[13px] font-[inherit]"),
      children: "No nodes connected"
    }
  ) : /* @__PURE__ */ t(
    "div",
    {
      "data-testid": "node-grid",
      className: h("flex flex-wrap gap-4 font-[inherit]"),
      children: e.map((a) => /* @__PURE__ */ t(
        De,
        {
          node: a,
          selected: n === a.id,
          onClick: r ? () => r(a.id) : void 0
        },
        a.id
      ))
    }
  );
}
function _e({
  run: e,
  onClick: r,
  onCancel: n
}) {
  const [a, s] = b(!1), c = !!r, l = c ? `Open run ${e.runId} of pipeline ${e.pipelineName}` : void 0, u = (p) => {
    r && (p.key === "Enter" || p.key === " " || p.key === "Spacebar") && (p.preventDefault(), r(e));
  }, x = (p) => {
    p.stopPropagation(), n && n(e);
  }, d = !!n && e.status === "running";
  return /* @__PURE__ */ i(
    "tr",
    {
      "data-testid": "active-run-row",
      role: c ? "button" : void 0,
      "aria-label": l,
      tabIndex: c ? 0 : void 0,
      onClick: r ? () => r(e) : void 0,
      onKeyDown: c ? u : void 0,
      onMouseEnter: () => s(!0),
      onMouseLeave: () => s(!1),
      className: h(
        "outline-none",
        r ? "cursor-pointer" : "cursor-default",
        a ? "bg-surface-hover" : "bg-transparent"
      ),
      children: [
        /* @__PURE__ */ t("td", { className: "px-3 py-2 text-[13px] text-text-primary font-[inherit] border-b border-border font-semibold", children: /* @__PURE__ */ i("span", { className: "inline-flex items-center gap-1.5", children: [
          e.pipelineName,
          a && c && /* @__PURE__ */ t(
            "span",
            {
              "data-testid": "active-run-link-icon",
              "aria-hidden": "true",
              className: "text-[11px] text-primary font-medium",
              children: "↗"
            }
          )
        ] }) }),
        /* @__PURE__ */ t("td", { className: "px-3 py-2 text-[11px] text-text-secondary font-mono border-b border-border", children: e.currentStep }),
        /* @__PURE__ */ t("td", { className: "px-3 py-2 text-[11px] text-text-secondary font-mono border-b border-border", children: e.ownerNode }),
        /* @__PURE__ */ t("td", { className: "px-3 py-2 text-[11px] text-text-secondary font-mono border-b border-border text-right", children: e.elapsed }),
        n && /* @__PURE__ */ t("td", { className: "px-3 py-2 text-[13px] text-text-primary font-[inherit] border-b border-border text-right w-px whitespace-nowrap", children: d && /* @__PURE__ */ t(
          "button",
          {
            "data-testid": "active-run-cancel",
            type: "button",
            "aria-label": `Cancel run ${e.runId}`,
            onClick: x,
            onKeyDown: (p) => p.stopPropagation(),
            className: "px-2 py-0.5 text-[11px] font-semibold bg-transparent text-state-failed border border-border rounded-sm cursor-pointer font-[inherit]",
            children: "Cancel"
          }
        ) })
      ]
    }
  );
}
function Oe({ runs: e, onRowClick: r, onCancelRun: n }) {
  return !e || e.length === 0 ? /* @__PURE__ */ t(
    "div",
    {
      "data-testid": "active-runs-empty",
      className: "p-6 text-center text-text-tertiary text-[13px] border border-border rounded-lg bg-surface font-[inherit]",
      children: "No active runs"
    }
  ) : /* @__PURE__ */ t(
    "div",
    {
      "data-testid": "active-runs-table",
      className: "border border-border rounded-lg overflow-hidden bg-surface",
      children: /* @__PURE__ */ i("table", { className: "w-full border-collapse font-[inherit]", children: [
        /* @__PURE__ */ t("thead", { children: /* @__PURE__ */ i("tr", { children: [
          /* @__PURE__ */ t("th", { className: "text-left px-3 py-2 text-[11px] font-semibold text-text-secondary uppercase tracking-[0.3px] bg-surface-inset border-b border-border", children: "Pipeline" }),
          /* @__PURE__ */ t("th", { className: "text-left px-3 py-2 text-[11px] font-semibold text-text-secondary uppercase tracking-[0.3px] bg-surface-inset border-b border-border", children: "Step" }),
          /* @__PURE__ */ t("th", { className: "text-left px-3 py-2 text-[11px] font-semibold text-text-secondary uppercase tracking-[0.3px] bg-surface-inset border-b border-border", children: "Owner" }),
          /* @__PURE__ */ t("th", { className: "text-right px-3 py-2 text-[11px] font-semibold text-text-secondary uppercase tracking-[0.3px] bg-surface-inset border-b border-border", children: "Elapsed" }),
          n && /* @__PURE__ */ t("th", { className: "text-right px-3 py-2 text-[11px] font-semibold text-text-secondary uppercase tracking-[0.3px] bg-surface-inset border-b border-border" })
        ] }) }),
        /* @__PURE__ */ t("tbody", { children: e.map((a) => /* @__PURE__ */ t(
          _e,
          {
            run: a,
            onClick: r,
            onCancel: n
          },
          a.runId
        )) })
      ] })
    }
  );
}
const je = {
  info: "text-info",
  warning: "text-state-awaiting",
  error: "text-danger",
  critical: "text-danger"
}, He = {
  info: "border-l-info",
  warning: "border-l-state-awaiting",
  error: "border-l-danger",
  critical: "border-l-danger"
}, Ue = {
  info: "ℹ",
  warning: "⚠",
  error: "✕",
  critical: "✕"
};
function Be(e) {
  const r = Date.parse(e);
  if (Number.isNaN(r)) return e;
  const n = Math.max(0, Math.floor((Date.now() - r) / 1e3));
  if (n < 60) return "just now";
  if (n < 3600) return `${Math.floor(n / 60)}m ago`;
  if (n < 86400) return `${Math.floor(n / 3600)}h ago`;
  const a = Math.floor(n / 86400);
  if (a < 3) return `${a}d ago`;
  try {
    return new Date(r).toLocaleDateString(void 0, {
      month: "short",
      day: "numeric"
    });
  } catch {
    return e;
  }
}
function Ke({
  alert: e,
  onDismiss: r
}) {
  const n = Ue[e.severity];
  return /* @__PURE__ */ i(
    "div",
    {
      "data-testid": "alert-item",
      className: h(
        "flex items-start gap-2.5 px-3 py-2.5",
        "bg-surface border border-border border-l-[3px] rounded-md font-[inherit]",
        He[e.severity]
      ),
      children: [
        /* @__PURE__ */ t(
          "span",
          {
            "aria-hidden": "true",
            className: h("text-sm leading-5 shrink-0 w-4 text-center", je[e.severity]),
            children: n
          }
        ),
        /* @__PURE__ */ i("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ t("div", { className: "text-[13px] text-text-primary leading-[1.4]", children: e.message }),
          /* @__PURE__ */ i("div", { className: "text-[11px] text-text-tertiary mt-0.5", children: [
            e.category ? `${e.category} · ` : "",
            Be(e.timestamp)
          ] })
        ] }),
        r && /* @__PURE__ */ t(
          "button",
          {
            "data-testid": "alert-dismiss",
            "aria-label": "dismiss alert",
            onClick: () => r(e.id),
            className: "bg-transparent border-none text-text-tertiary text-base leading-none cursor-pointer px-1.5 py-0.5 font-[inherit] shrink-0",
            children: "×"
          }
        )
      ]
    }
  );
}
function Ve({ alerts: e, onDismiss: r }) {
  return !e || e.length === 0 ? /* @__PURE__ */ t(
    "div",
    {
      "data-testid": "alerts-empty",
      className: "p-6 text-center text-text-tertiary text-[13px] border border-border rounded-lg bg-surface font-[inherit]",
      children: "No active alerts"
    }
  ) : /* @__PURE__ */ t(
    "div",
    {
      "data-testid": "alerts-panel",
      className: "flex flex-col gap-2",
      children: e.map((n) => /* @__PURE__ */ t(Ke, { alert: n, onDismiss: r }, n.id))
    }
  );
}
const U = "—";
function Ge(e) {
  return typeof e != "number" || !Number.isFinite(e) ? U : e < 1e3 ? `${Math.round(e)} ms` : `${(e / 1e3).toFixed(1)}s`;
}
function ze(e) {
  const r = Math.max(0, e.totalNodes ?? 0), n = (a) => Array.from(
    { length: 12 },
    (s, c) => Math.max(0, Math.round(10 + Math.sin(a + c / 2) * 4 + c * 0.3))
  );
  return Array.from({ length: r }, (a, s) => ({
    id: `node-${s}`,
    status: "healthy",
    role: "worker",
    cpu: 10 + s * 4,
    memoryMb: 280 + s * 60,
    connections: 12 + s * 3,
    activeRuns: 0,
    cpuHistory: n(s)
  }));
}
const X = [];
function We({ source: e }) {
  if (e === null || e === "bridge") return null;
  const r = e === "error";
  return /* @__PURE__ */ t(
    "span",
    {
      "data-testid": "pipeline-metrics-source-pill",
      "data-source": e,
      title: r ? "/api/pipelines/metrics returned an error — values are placeholders" : "No pipeline bridge wired — metrics are synthesized fixture data",
      className: h(
        "inline-block px-2 py-0.5 rounded-sm text-[11px] font-semibold",
        r ? "bg-danger-bg text-state-failed" : "bg-warning-bg text-state-awaiting"
      ),
      children: r ? "metrics error" : "demo data"
    }
  );
}
function Je({
  live: e,
  onChange: r
}) {
  return /* @__PURE__ */ i(
    "button",
    {
      "data-testid": "live-toggle",
      onClick: () => r(!e),
      className: h(
        "inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold",
        "rounded-md cursor-pointer font-[inherit]",
        e ? "bg-surface border border-primary text-primary" : "bg-surface-inset border border-border text-text-secondary"
      ),
      children: [
        /* @__PURE__ */ t(
          "span",
          {
            className: h("w-2 h-2 rounded-full", e ? "bg-success" : "bg-text-tertiary")
          }
        ),
        e ? "Live" : "Paused"
      ]
    }
  );
}
function Ye({
  nodes: e,
  healthyCount: r,
  totalCount: n,
  onSelect: a
}) {
  const s = r === n;
  return /* @__PURE__ */ i("div", { className: "bg-surface border border-border rounded-[10px] p-4 font-[inherit]", children: [
    /* @__PURE__ */ i("div", { className: "flex justify-between items-center mb-3", children: [
      /* @__PURE__ */ t("div", { className: "text-sm font-semibold text-text-primary mb-0 font-[inherit]", children: "Cluster health" }),
      /* @__PURE__ */ i(
        "span",
        {
          "data-testid": "cluster-health-chip",
          className: h(
            "inline-block px-2 py-0.5 rounded-sm text-[11px] font-semibold",
            s ? "bg-success-bg text-state-completed" : "bg-warning-bg text-state-awaiting"
          ),
          children: [
            r,
            "/",
            n,
            " ",
            s ? "✓" : "!"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ t(ae, { nodes: e, onSelect: a })
  ] });
}
function Xe({
  events: e,
  onViewAll: r
}) {
  return /* @__PURE__ */ i("div", { className: "bg-surface border border-border rounded-[10px] p-4 font-[inherit]", children: [
    /* @__PURE__ */ i("div", { className: "flex justify-between items-center mb-2", children: [
      /* @__PURE__ */ t("div", { className: "text-sm font-semibold text-text-primary font-[inherit]", children: "Recent events (last 20)" }),
      /* @__PURE__ */ t(
        "button",
        {
          "data-testid": "recent-events-view-all",
          onClick: r,
          className: "bg-transparent border-none text-primary text-xs font-semibold cursor-pointer font-[inherit]",
          children: "▸ view all"
        }
      )
    ] }),
    e.length === 0 ? /* @__PURE__ */ t("div", { className: "p-4 text-center text-text-tertiary text-[13px]", children: "No recent events" }) : /* @__PURE__ */ t("div", { className: "flex flex-col gap-0.5", children: e.slice(0, 20).map((n) => /* @__PURE__ */ t(
      te,
      {
        timestamp: n.timestamp,
        type: n.type,
        summary: n.summary,
        severity: n.severity
      },
      n.id
    )) })
  ] });
}
function $t() {
  const e = ce(), r = T(null), { live: n, setLive: a, recentEvents: s, activeRunsCount: c, isLiveData: l } = J(), x = ke() ?? re, { metrics: d, source: p } = ne(), y = x?.overview ?? {}, L = D(() => ze(y), [y]), A = d?.runsStarted ?? U, M = [0, 0, 0, 0, 0, 0, 0, 0], v = c > 0 ? c : d?.runsActive ?? U, N = d?.runsAwaitingApproval ?? U, k = d?.runsFailed ?? U, R = d?.avgFirstTokenLatencyMs ?? null, o = Ge(R), f = Array.isArray(x?.alerts) ? x.alerts : [], g = () => {
    r.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, S = () => {
    e("/pipelines");
  }, P = () => {
    e("/observability/events?filter=errors");
  }, I = (F) => {
    e(`/observability/nodes?selected=${encodeURIComponent(F)}`);
  }, m = () => {
    e("/observability/events");
  };
  return /* @__PURE__ */ i(
    "div",
    {
      "data-testid": "observability-dashboard",
      className: "p-6 flex flex-col gap-4 font-sans text-[13px] text-text-primary bg-surface-panel min-h-full",
      children: [
        /* @__PURE__ */ i("div", { className: "flex justify-between items-center", children: [
          /* @__PURE__ */ t("h1", { className: "text-lg font-bold text-text-primary m-0 leading-[1.3]", children: "Dashboard" }),
          /* @__PURE__ */ i("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ t(
              "span",
              {
                "data-testid": "dashboard-data-source",
                title: l ? "Connected to /api/observability/dashboard" : "Backend unreachable — using fixture data",
                className: h(
                  "text-[11px] font-semibold",
                  l ? "text-state-completed" : "text-text-tertiary"
                ),
                children: l ? "live data" : "fixture"
              }
            ),
            /* @__PURE__ */ t(We, { source: p }),
            /* @__PURE__ */ t(Je, { live: n, onChange: a })
          ] })
        ] }),
        /* @__PURE__ */ t(
          Pe,
          {
            runsToday: A,
            runsSparkline: M,
            activeNow: v,
            pendingApprovals: N,
            failed24h: k,
            avgFirstTokenLatency: o,
            onScrollToActive: g,
            onGoToPipelines: S,
            onGoToFailedEvents: P
          }
        ),
        /* @__PURE__ */ t(
          Ye,
          {
            nodes: L,
            healthyCount: y.healthyNodes ?? 0,
            totalCount: y.totalNodes ?? 0,
            onSelect: I
          }
        ),
        /* @__PURE__ */ i("div", { ref: r, children: [
          /* @__PURE__ */ i("div", { className: "text-sm font-semibold text-text-primary mb-2 font-[inherit]", children: [
            "Active runs (",
            X.length,
            ")"
          ] }),
          /* @__PURE__ */ t(
            Oe,
            {
              runs: X,
              onRowClick: (F) => e(`/pipelines/${F.pipelineId}/runs/${F.runId}`)
            }
          )
        ] }),
        /* @__PURE__ */ t(
          Xe,
          {
            events: s,
            onViewAll: m
          }
        ),
        /* @__PURE__ */ i("div", { children: [
          /* @__PURE__ */ i("div", { className: "text-sm font-semibold text-text-primary mb-2 font-[inherit]", children: [
            "Alerts (",
            f.length,
            ")"
          ] }),
          /* @__PURE__ */ t(Ve, { alerts: f })
        ] })
      ]
    }
  );
}
function qe(e = 60) {
  const { dashboard: r } = J(), [n, a] = b([]);
  return O(() => {
    r && a((s) => [...s, r].slice(-e));
  }, [r, e]), n;
}
const Qe = "", Ze = 1e4;
function et() {
  const [e, r] = b(null), [n, a] = b(!0), [s, c] = b(null), l = T(!1), u = W(async () => {
    try {
      const x = await fetch(`${Qe}/api/pipelines/dashboard-data`, {
        credentials: "same-origin"
      });
      if (!x.ok) {
        const y = (await x.json().catch(() => null))?.error ?? `HTTP ${x.status}`;
        l.current || c(y);
        return;
      }
      const d = await x.json();
      l.current || (r(d), c(null));
    } catch (x) {
      const d = x instanceof Error ? x.message : String(x);
      l.current || c(d);
    } finally {
      l.current || a(!1);
    }
  }, []);
  return O(() => {
    l.current = !1, u();
    const x = window.setInterval(() => {
      document.hidden || u();
    }, Ze);
    return () => {
      l.current = !0, window.clearInterval(x);
    };
  }, [u]), { data: e, loading: n, error: s, refresh: u };
}
function E({ title: e, timeRange: r, children: n, onMaximize: a }) {
  return /* @__PURE__ */ i(
    "div",
    {
      "data-testid": "metric-card",
      className: h(
        "bg-surface border border-border rounded-[10px] p-4",
        "flex flex-col gap-2.5 font-[inherit]"
      ),
      children: [
        /* @__PURE__ */ i("div", { className: "flex items-center justify-between gap-2", children: [
          /* @__PURE__ */ t(
            "div",
            {
              className: "text-[13px] font-semibold text-text-primary overflow-hidden text-ellipsis whitespace-nowrap",
              title: e,
              children: e
            }
          ),
          /* @__PURE__ */ i("div", { className: "flex items-center gap-1.5", children: [
            r && /* @__PURE__ */ t("span", { className: "inline-block px-2 py-0.5 rounded-sm text-[11px] font-semibold bg-surface-hover text-text-secondary leading-[1.4] whitespace-nowrap", children: r }),
            a && /* @__PURE__ */ t(
              "button",
              {
                "data-testid": "metric-card-maximize",
                onClick: a,
                "aria-label": `Maximize ${e}`,
                className: "border-none bg-transparent text-text-tertiary cursor-pointer text-sm px-1 py-0.5 font-[inherit]",
                children: "⛶"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ t("div", { className: "flex-1", children: n })
      ]
    }
  );
}
const q = [
  { value: "15m", label: "Last 15m" },
  { value: "1h", label: "Last 1h" },
  { value: "24h", label: "Last 24h" },
  { value: "7d", label: "Last 7d" }
], tt = [
  { value: "off", label: "Off" },
  { value: "5s", label: "5s" },
  { value: "30s", label: "30s" },
  { value: "60s", label: "60s" }
];
function rt({
  seeds: e,
  liveSeries: r,
  cols: n,
  isLiveData: a,
  failedColor: s
}) {
  const [c, l] = b("1h"), [u, x] = b("30s"), d = q.find((p) => p.value === c)?.label ?? "";
  return /* @__PURE__ */ i(z, { children: [
    /* @__PURE__ */ i("div", { className: "flex items-center gap-3 px-4 py-2.5 border-b border-border bg-surface-panel", children: [
      /* @__PURE__ */ t(
        "select",
        {
          "data-testid": "metrics-time-range",
          "aria-label": "Time range",
          value: c,
          onChange: (p) => l(p.target.value),
          className: "min-w-[120px] border border-border-field rounded-md px-2.5 py-1.5 text-[13px] font-[inherit] bg-[#f9fafb] text-text-primary outline-none",
          children: q.map((p) => /* @__PURE__ */ t("option", { value: p.value, children: p.label }, p.value))
        }
      ),
      /* @__PURE__ */ t(
        "select",
        {
          "data-testid": "metrics-refresh-interval",
          "aria-label": "Refresh interval",
          value: u,
          onChange: (p) => x(p.target.value),
          className: "min-w-[100px] border border-border-field rounded-md px-2.5 py-1.5 text-[13px] font-[inherit] bg-[#f9fafb] text-text-primary outline-none",
          children: tt.map((p) => /* @__PURE__ */ i("option", { value: p.value, children: [
            "Refresh: ",
            p.label
          ] }, p.value))
        }
      ),
      /* @__PURE__ */ t(
        "button",
        {
          "data-testid": "metrics-reset-zoom",
          onClick: () => console.log("[MetricsPage] reset zoom"),
          className: "px-3 py-1.5 text-[13px] bg-transparent border-none text-text-secondary cursor-pointer font-[inherit] shrink-0",
          children: "Reset zoom"
        }
      ),
      /* @__PURE__ */ t(
        "button",
        {
          "data-testid": "metrics-export-csv",
          onClick: () => console.log("[MetricsPage] export CSV"),
          className: "px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-white border-none rounded-md cursor-pointer font-[inherit] shrink-0",
          children: "Export CSV"
        }
      ),
      /* @__PURE__ */ i(
        "div",
        {
          "data-testid": "metrics-data-source",
          className: "ml-auto flex items-center gap-3 text-[11px] text-text-tertiary",
          children: [
            /* @__PURE__ */ t(
              "span",
              {
                title: a ? "Connected to /api/pipelines/metrics" : "Backend unreachable — using seeded fixture",
                className: h(
                  "font-semibold",
                  a ? "text-state-completed" : "text-text-tertiary"
                ),
                children: a ? "live" : "fixture"
              }
            ),
            /* @__PURE__ */ i("span", { children: [
              n,
              " column",
              n === 1 ? "" : "s"
            ] })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ i(
      "div",
      {
        className: "gap-4 p-4 overflow-y-auto flex-1 grid",
        style: { gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` },
        children: [
          /* @__PURE__ */ t(E, { title: "Runs per minute", timeRange: d, children: /* @__PURE__ */ t(
            he,
            {
              series: r?.runsPerMinute ?? e.runsPerMinute,
              height: 180
            }
          ) }),
          /* @__PURE__ */ t(E, { title: "Step duration (p50/p95/p99)", timeRange: d, children: /* @__PURE__ */ t(
            $,
            {
              series: e.stepDuration,
              height: 180,
              yFormat: (p) => `${Math.round(p)}ms`
            }
          ) }),
          /* @__PURE__ */ t(E, { title: "LLM tokens", timeRange: d, children: /* @__PURE__ */ t(
            $,
            {
              series: r?.llmTokens ?? e.llmTokens,
              height: 180
            }
          ) }),
          /* @__PURE__ */ t(E, { title: "LLM cost", timeRange: d, children: /* @__PURE__ */ t(
            $,
            {
              series: r?.llmCost ?? e.llmCost,
              height: 180,
              yFormat: (p) => `$${p.toFixed(2)}`
            }
          ) }),
          /* @__PURE__ */ t(E, { title: "Cluster CPU", timeRange: d, children: /* @__PURE__ */ t(
            $,
            {
              series: e.clusterCpu,
              height: 180,
              yFormat: (p) => `${Math.round(p)}%`
            }
          ) }),
          /* @__PURE__ */ t(E, { title: "Cluster memory", timeRange: d, children: /* @__PURE__ */ t(
            $,
            {
              series: e.clusterMemory,
              height: 180,
              yFormat: (p) => `${Math.round(p)}MB`
            }
          ) }),
          /* @__PURE__ */ t(E, { title: "Event rate", timeRange: d, children: /* @__PURE__ */ t($, { series: e.eventRate, height: 180 }) }),
          /* @__PURE__ */ t(E, { title: "Active runs over time", timeRange: d, children: /* @__PURE__ */ t(
            $,
            {
              series: r?.activeRuns ?? e.activeRuns,
              height: 180
            }
          ) }),
          /* @__PURE__ */ t(E, { title: "Failure rate by type", timeRange: d, children: /* @__PURE__ */ t(
            be,
            {
              data: e.failureRate,
              xKey: "x",
              yKey: "total",
              color: s,
              height: 180
            }
          ) }),
          /* @__PURE__ */ t(E, { title: "Approval latency", timeRange: d, children: /* @__PURE__ */ t(
            $,
            {
              series: e.approvalLatency,
              height: 180,
              yFormat: (p) => `${Math.round(p)}s`
            }
          ) })
        ]
      }
    )
  ] });
}
function w(e, r = 30, n = 60) {
  const a = [];
  let s = e;
  for (let c = 0; c < r; c++)
    s = (s * 9301 + 49297) % 233280, a.push(Math.abs(s % n));
  return a;
}
function C(e, r, n) {
  return {
    label: e,
    color: n,
    data: r.map((a, s) => ({ x: s, y: a }))
  };
}
const _ = {
  primary: "#646cff",
  completed: "#16a34a",
  failed: "#dc2626"
};
function nt() {
  return {
    runsPerMinute: [
      C("started", w(3, 30, 40), _.primary),
      C("completed", w(7, 30, 40), _.completed),
      C("failed", w(11, 30, 20), _.failed)
    ],
    stepDuration: [
      C("p50", w(17, 30, 400)),
      C("p95", w(23, 30, 800)),
      C("p99", w(29, 30, 1200))
    ],
    llmTokens: [
      C("input", w(31, 30, 2e3)),
      C("output", w(37, 30, 1e3))
    ],
    llmCost: [C("USD", w(41, 30, 5))],
    clusterCpu: [
      C("node-0", w(43, 30, 40)),
      C("node-1", w(47, 30, 40)),
      C("node-2", w(53, 30, 40))
    ],
    clusterMemory: [
      C("node-0", w(59, 30, 512)),
      C("node-1", w(61, 30, 512)),
      C("node-2", w(67, 30, 512))
    ],
    eventRate: [C("events/s", w(71, 30, 20))],
    activeRuns: [C("active", w(73, 30, 10))],
    // Failure-rate-by-type is rendered as a bar chart and needs row-shaped data.
    failureRate: (() => {
      const e = w(79, 30, 15), r = w(83, 30, 15), n = w(89, 30, 15);
      return e.map((a, s) => ({
        x: s,
        llm: e[s],
        http: r[s],
        transform: n[s],
        // For a single-series bar view we expose a `total` field too.
        total: e[s] + r[s] + n[s]
      }));
    })(),
    approvalLatency: [C("seconds", w(97, 30, 120))]
  };
}
function at() {
  const [e, r] = b(() => typeof window > "u" ? 2 : window.innerWidth >= 1600 ? 3 : 2);
  return O(() => {
    if (typeof window > "u") return;
    const n = () => {
      r(window.innerWidth >= 1600 ? 3 : 2);
    };
    return window.addEventListener("resize", n), () => window.removeEventListener("resize", n);
  }, []), e;
}
function st() {
  const { data: e, loading: r, error: n } = et();
  return r && !e ? /* @__PURE__ */ t(
    "div",
    {
      "data-testid": "modules-section-loading",
      className: "flex flex-col gap-2 px-4 py-3 bg-surface border border-border rounded-[10px] mb-4",
      children: /* @__PURE__ */ t("span", { className: "text-[11px] font-semibold text-text-tertiary uppercase tracking-[0.5px]", children: "Loading active modules…" })
    }
  ) : e ? /* @__PURE__ */ i(
    "div",
    {
      "data-testid": "modules-section",
      className: "flex flex-col gap-2 px-4 py-3 bg-surface border border-border rounded-[10px] mb-4",
      children: [
        /* @__PURE__ */ i("div", { className: "flex items-baseline gap-3", children: [
          /* @__PURE__ */ t("span", { className: "text-sm font-bold text-text-primary", children: e.moduleName }),
          /* @__PURE__ */ i("span", { className: "text-[11px] font-semibold text-text-tertiary uppercase tracking-[0.5px]", children: [
            e.source,
            " · ",
            e.state
          ] })
        ] }),
        /* @__PURE__ */ i("div", { className: "flex gap-4 flex-wrap", children: [
          /* @__PURE__ */ i("div", { className: "flex flex-col gap-0.5 min-w-[110px]", children: [
            /* @__PURE__ */ t("span", { className: "text-[11px] text-text-tertiary", children: "Total" }),
            /* @__PURE__ */ t("span", { className: "text-lg font-bold text-text-primary", children: e.summary.totalResources })
          ] }),
          /* @__PURE__ */ i("div", { className: "flex flex-col gap-0.5 min-w-[110px]", children: [
            /* @__PURE__ */ t("span", { className: "text-[11px] text-text-tertiary", children: "Healthy" }),
            /* @__PURE__ */ t("span", { className: "text-lg font-bold text-text-primary", children: e.summary.healthyResources })
          ] }),
          /* @__PURE__ */ i("div", { className: "flex flex-col gap-0.5 min-w-[110px]", children: [
            /* @__PURE__ */ t("span", { className: "text-[11px] text-text-tertiary", children: "Active" }),
            /* @__PURE__ */ t("span", { className: "text-lg font-bold text-text-primary", children: e.summary.activeConnections })
          ] }),
          /* @__PURE__ */ i("div", { className: "flex flex-col gap-0.5 min-w-[110px]", children: [
            /* @__PURE__ */ t("span", { className: "text-[11px] text-text-tertiary", children: "Throughput" }),
            /* @__PURE__ */ t("span", { className: "text-lg font-bold text-text-primary", children: e.summary.throughput })
          ] })
        ] }),
        e.alerts && e.alerts.length > 0 ? /* @__PURE__ */ t("div", { "data-testid": "modules-section-alerts", className: "flex flex-col gap-1", children: e.alerts.map((a, s) => /* @__PURE__ */ i(
          "div",
          {
            className: h(
              "text-xs px-2.5 py-1.5 rounded-md bg-surface-inset",
              a.level === "critical" || a.level === "error" ? "text-state-failed" : "text-text-primary"
            ),
            children: [
              "[",
              a.level,
              "] ",
              a.message
            ]
          },
          s
        )) }) : null
      ]
    }
  ) : /* @__PURE__ */ t(
    "div",
    {
      "data-testid": "modules-section-error",
      className: "flex flex-col gap-2 px-4 py-3 bg-surface border border-border rounded-[10px] mb-4",
      children: /* @__PURE__ */ i("span", { className: "text-[11px] font-semibold text-text-tertiary uppercase tracking-[0.5px]", children: [
        "Active modules unavailable",
        n ? `: ${n}` : ""
      ] })
    }
  );
}
function Dt() {
  const e = D(nt, []), r = at();
  qe(60);
  const { metrics: n, isLiveData: a } = ne(), [s, c] = b([]);
  O(() => {
    n && c((u) => [...u, n].slice(-30));
  }, [n]);
  const l = D(() => {
    if (s.length < 2) return null;
    const u = (N) => {
      const k = [];
      return s.forEach((R, o) => {
        const f = R[N];
        typeof f == "number" && Number.isFinite(f) && k.push({ x: o, y: f });
      }), k;
    }, x = (N) => N.length >= 2, d = u("runsActive"), p = u("llmTokensIn"), y = u("llmTokensOut"), L = u("estimatedCostUsd"), A = u("runsStarted"), M = u("runsCompleted"), v = u("runsFailed");
    return {
      activeRuns: x(d) ? [{ label: "active", data: d }] : null,
      llmTokens: x(p) && x(y) ? [
        { label: "input", data: p },
        { label: "output", data: y }
      ] : null,
      llmCost: x(L) ? [{ label: "USD", data: L }] : null,
      runsPerMinute: x(A) && x(M) && x(v) ? [
        { label: "started", color: _.primary, data: A },
        { label: "completed", color: _.completed, data: M },
        { label: "failed", color: _.failed, data: v }
      ] : null
    };
  }, [s]);
  return /* @__PURE__ */ i(
    "div",
    {
      "data-testid": "metrics-page",
      className: "flex flex-col h-full min-h-0 font-[inherit] text-[13px] text-text-primary bg-surface",
      children: [
        /* @__PURE__ */ t(
          rt,
          {
            seeds: e,
            liveSeries: l,
            cols: r,
            isLiveData: a,
            failedColor: _.failed
          }
        ),
        /* @__PURE__ */ t(st, {})
      ]
    }
  );
}
function it({ events: e, selectedId: r, onSelect: n, live: a = !1 }) {
  const s = T(null), [c, l] = b(!1);
  O(() => {
    if (!a || c) return;
    const d = s.current;
    d && (d.scrollTop = d.scrollHeight);
  }, [e, a, c]);
  const u = () => {
    const d = s.current;
    if (!d) return;
    const p = d.scrollHeight - d.scrollTop - d.clientHeight < 24;
    l(!p);
  }, x = () => {
    const d = s.current;
    d && (d.scrollTop = d.scrollHeight, l(!1));
  };
  return e.length === 0 ? /* @__PURE__ */ t("div", { className: "flex-1 flex", children: /* @__PURE__ */ t(
    ge,
    {
      icon: "📡",
      title: "No events yet",
      body: "Trigger a pipeline to see activity here."
    }
  ) }) : /* @__PURE__ */ i(
    "div",
    {
      "data-testid": "event-timeline",
      className: "relative flex-1 min-h-0 flex",
      children: [
        /* @__PURE__ */ t(
          "div",
          {
            ref: s,
            onScroll: u,
            className: "flex-1 overflow-y-auto py-1.5 font-[inherit]",
            children: e.map((d) => /* @__PURE__ */ t(
              te,
              {
                timestamp: d.timestamp,
                type: d.type,
                summary: d.summary,
                severity: d.severity,
                selected: d.id === r,
                onClick: n ? () => n(d.id) : void 0
              },
              d.id
            ))
          }
        ),
        a && c && /* @__PURE__ */ t(
          "button",
          {
            "data-testid": "jump-to-live",
            onClick: x,
            className: h(
              "absolute bottom-3 left-1/2 -translate-x-1/2",
              "px-3.5 py-1.5 text-xs font-semibold",
              "bg-primary text-white",
              "border-none rounded-full cursor-pointer",
              "shadow-[0_2px_8px_rgba(0,0,0,0.15)] font-[inherit]"
            ),
            children: "Jump to live ↓"
          }
        )
      ]
    }
  );
}
function ot(e) {
  try {
    return JSON.stringify(e, null, 2);
  } catch {
    return String(e);
  }
}
function lt({ event: e }) {
  if (!e)
    return /* @__PURE__ */ t(
      "div",
      {
        "data-testid": "event-detail-empty",
        className: h(
          "flex items-center justify-center h-full text-[13px] text-text-tertiary",
          "p-6 text-center font-[inherit]"
        ),
        children: "Select an event to see details"
      }
    );
  const r = ot(e.payload ?? e), n = () => {
    typeof navigator < "u" && navigator.clipboard && navigator.clipboard.writeText(r).catch(() => {
      console.warn("[EventDetailPane] clipboard copy failed");
    });
  }, a = () => {
    if (typeof window > "u") return;
    const s = new Blob([r], { type: "application/json" }), c = URL.createObjectURL(s), l = document.createElement("a");
    l.href = c, l.download = `${e.type}-${e.id}.json`, document.body.appendChild(l), l.click(), document.body.removeChild(l), URL.revokeObjectURL(c);
  };
  return /* @__PURE__ */ i(
    "div",
    {
      "data-testid": "event-detail-pane",
      className: "flex flex-col h-full font-[inherit] bg-surface",
      children: [
        /* @__PURE__ */ i("div", { className: "px-3.5 py-3 border-b border-border flex flex-col gap-1", children: [
          /* @__PURE__ */ t("div", { className: "text-[13px] font-semibold text-text-primary", children: e.type }),
          /* @__PURE__ */ t("div", { className: "text-[11px] text-text-tertiary", children: e.timestamp })
        ] }),
        /* @__PURE__ */ i("div", { className: "px-3.5 py-2.5 flex gap-2 border-b border-border", children: [
          /* @__PURE__ */ t(
            "button",
            {
              "data-testid": "event-detail-copy",
              onClick: n,
              className: h(
                "px-2.5 py-[5px] text-xs font-semibold",
                "bg-surface-hover text-text-secondary",
                "border border-border rounded-md",
                "cursor-pointer font-[inherit]"
              ),
              children: "Copy"
            }
          ),
          /* @__PURE__ */ t(
            "button",
            {
              "data-testid": "event-detail-download",
              onClick: a,
              className: h(
                "px-2.5 py-[5px] text-xs font-semibold",
                "bg-surface-hover text-text-secondary",
                "border border-border rounded-md",
                "cursor-pointer font-[inherit]"
              ),
              children: "Download"
            }
          )
        ] }),
        /* @__PURE__ */ t(
          "pre",
          {
            className: h(
              "m-0 px-3.5 py-3 flex-1 overflow-auto",
              "bg-surface-inset font-mono text-xs text-text-primary",
              "leading-normal whitespace-pre [tab-size:2]"
            ),
            children: r
          }
        )
      ]
    }
  );
}
const Q = 500, dt = ["All", "Errors", "LLM", "Approvals", "Lifecycle"], ct = [
  { value: "15m", label: "Last 15m" },
  { value: "1h", label: "Last 1h" },
  { value: "6h", label: "Last 6h" },
  { value: "24h", label: "Last 24h" },
  { value: "custom", label: "Custom" }
], se = ["node-0", "node-1", "node-2"], ie = [
  "info",
  "warning",
  "error",
  "success"
];
function pt(e) {
  return e.includes("failed") || e.includes("error") ? "error" : e.includes("completed") ? "success" : e.includes("warn") || e.includes("awaiting") ? "warning" : "info";
}
function ut(e) {
  return e.includes("failed") || e.includes("error") ? "Errors" : e.startsWith("llm.") || e.includes(".llm.") ? "LLM" : e.includes("approval") ? "Approvals" : (e.includes("run.") || e.includes("pipeline."), "Lifecycle");
}
function xt(e, r) {
  if (r && typeof r == "object") {
    const n = r, a = [];
    if (typeof n.runId == "string" && a.push(`run ${n.runId}`), typeof n.pipelineId == "string" && a.push(`pipeline ${n.pipelineId}`), typeof n.nodeId == "string" && a.push(`node ${n.nodeId}`), a.length > 0) return a.join(" · ");
  }
  return e;
}
function mt(e = /* @__PURE__ */ new Date()) {
  const r = String(e.getHours()).padStart(2, "0"), n = String(e.getMinutes()).padStart(2, "0"), a = String(e.getSeconds()).padStart(2, "0"), s = String(e.getMilliseconds()).padStart(3, "0");
  return `${r}:${n}:${a}.${s}`;
}
const Z = {
  groups: /* @__PURE__ */ new Set(["All"]),
  runIds: "",
  pipelineIds: "",
  nodes: new Set(se),
  severities: new Set(ie),
  timeRange: "1h"
};
function ft() {
  const [e, r] = b([]), [n, a] = b(null), [s, c] = b(!1), [l, u] = b(Z), [x, d] = b(!1), p = T(s);
  p.current = s;
  const y = T(0), L = W((o) => {
    if (p.current) return;
    const f = o, g = f?.eventType ?? "unknown", S = f?.payload ?? f;
    y.current += 1;
    const P = {
      id: `ev-${Date.now()}-${y.current}`,
      timestamp: mt(),
      type: g,
      summary: xt(g, S),
      severity: pt(g),
      payload: S
    };
    r((I) => {
      const m = [...I, P];
      return m.length > Q ? m.slice(m.length - Q) : m;
    });
  }, []);
  xe("*", L);
  const A = D(() => {
    const o = l.runIds.split(",").map((S) => S.trim()).filter(Boolean), f = l.pipelineIds.split(",").map((S) => S.trim()).filter(Boolean), g = l.groups.has("All");
    return e.filter((S) => {
      if (!g) {
        const I = ut(S.type);
        if (!l.groups.has(I)) return !1;
      }
      if (S.severity && !l.severities.has(S.severity)) return !1;
      if (o.length > 0) {
        const I = S.payload?.runId;
        if (!I || !o.some((m) => I.includes(m))) return !1;
      }
      if (f.length > 0) {
        const I = S.payload?.pipelineId;
        if (!I || !f.some((m) => I.includes(m))) return !1;
      }
      const P = S.payload?.nodeId;
      return !(P && !l.nodes.has(P));
    });
  }, [e, l]), M = D(
    () => A.find((o) => o.id === n) ?? null,
    [A, n]
  ), v = (o) => {
    u((f) => {
      const g = new Set(f.groups);
      return g.has(o) ? g.delete(o) : g.add(o), { ...f, groups: g };
    });
  }, N = (o) => {
    u((f) => {
      const g = new Set(f.nodes);
      return g.has(o) ? g.delete(o) : g.add(o), { ...f, nodes: g };
    });
  }, k = (o) => {
    u((f) => {
      const g = new Set(f.severities);
      return g.has(o) ? g.delete(o) : g.add(o), { ...f, severities: g };
    });
  }, R = () => u(Z);
  return /* @__PURE__ */ i(
    "div",
    {
      "data-testid": "events-page",
      className: "flex flex-col h-full min-h-0 font-[inherit] text-[13px] text-text-primary bg-surface",
      children: [
        /* @__PURE__ */ i("div", { className: "flex items-center gap-3 px-4 py-2.5 border-b border-border bg-surface-panel", children: [
          /* @__PURE__ */ t(
            "button",
            {
              onClick: () => c((o) => !o),
              "data-testid": "events-live-toggle",
              className: h(
                "px-3 py-[5px] text-xs font-semibold rounded-md cursor-pointer font-[inherit]",
                s ? "bg-surface-hover text-text-secondary border border-border" : "bg-state-completed text-white border border-state-completed"
              ),
              children: s ? "■ Paused" : "● Live"
            }
          ),
          /* @__PURE__ */ t(
            "select",
            {
              "data-testid": "events-time-range",
              "aria-label": "Time range",
              value: l.timeRange,
              onChange: (o) => u((f) => ({ ...f, timeRange: o.target.value })),
              className: "min-w-[120px] border border-border-field rounded-md px-2.5 py-1.5 text-[13px] font-[inherit] bg-[#f9fafb] text-text-primary outline-none",
              children: ct.map((o) => /* @__PURE__ */ t("option", { value: o.value, children: o.label }, o.value))
            }
          ),
          /* @__PURE__ */ i("div", { className: "ml-auto text-xs text-text-tertiary", children: [
            A.length,
            " / ",
            e.length,
            " event",
            e.length === 1 ? "" : "s"
          ] })
        ] }),
        /* @__PURE__ */ i("div", { className: "flex flex-1 min-h-0", children: [
          /* @__PURE__ */ i(
            "aside",
            {
              "data-testid": "events-filter-rail",
              className: h(
                "shrink-0 border-r border-border bg-surface-panel overflow-y-auto transition-[width] duration-150 ease-in-out",
                x ? "w-9" : "w-60"
              ),
              children: [
                /* @__PURE__ */ i("div", { className: "flex items-center justify-between px-3.5 py-2.5 border-b border-border", children: [
                  !x && /* @__PURE__ */ t("div", { className: "text-[11px] font-bold tracking-[0.3px] text-text-secondary", children: "FILTERS" }),
                  /* @__PURE__ */ t(
                    "button",
                    {
                      onClick: () => d((o) => !o),
                      "aria-label": x ? "Expand filters" : "Collapse filters",
                      className: "border-none bg-transparent text-text-tertiary cursor-pointer text-xs p-0.5 font-[inherit]",
                      children: x ? "›" : "‹"
                    }
                  )
                ] }),
                !x && /* @__PURE__ */ i(z, { children: [
                  /* @__PURE__ */ i("div", { className: "flex flex-col gap-1.5 px-3.5 py-3 border-b border-border", children: [
                    /* @__PURE__ */ t("div", { className: "text-[11px] font-bold tracking-[0.3px] text-text-secondary uppercase", children: "Event type" }),
                    dt.map((o) => /* @__PURE__ */ i(
                      "label",
                      {
                        className: "flex items-center gap-1.5 text-xs",
                        children: [
                          /* @__PURE__ */ t(
                            "input",
                            {
                              type: "checkbox",
                              checked: l.groups.has(o),
                              onChange: () => v(o)
                            }
                          ),
                          o
                        ]
                      },
                      o
                    ))
                  ] }),
                  /* @__PURE__ */ i("div", { className: "flex flex-col gap-1.5 px-3.5 py-3 border-b border-border", children: [
                    /* @__PURE__ */ t("div", { className: "text-[11px] font-bold tracking-[0.3px] text-text-secondary uppercase", children: "Runs" }),
                    /* @__PURE__ */ t(
                      "input",
                      {
                        "data-testid": "events-filter-runs",
                        type: "text",
                        placeholder: "runId (comma-separated)",
                        value: l.runIds,
                        onChange: (o) => u((f) => ({ ...f, runIds: o.target.value })),
                        className: "flex-1 min-w-[120px] border border-border-field rounded-md px-2.5 py-1.5 text-[13px] font-[inherit] bg-[#f9fafb] text-text-primary outline-none"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ i("div", { className: "flex flex-col gap-1.5 px-3.5 py-3 border-b border-border", children: [
                    /* @__PURE__ */ t("div", { className: "text-[11px] font-bold tracking-[0.3px] text-text-secondary uppercase", children: "Pipelines" }),
                    /* @__PURE__ */ t(
                      "input",
                      {
                        "data-testid": "events-filter-pipelines",
                        type: "text",
                        placeholder: "pipelineId (comma-separated)",
                        value: l.pipelineIds,
                        onChange: (o) => u((f) => ({ ...f, pipelineIds: o.target.value })),
                        className: "flex-1 min-w-[120px] border border-border-field rounded-md px-2.5 py-1.5 text-[13px] font-[inherit] bg-[#f9fafb] text-text-primary outline-none"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ i("div", { className: "flex flex-col gap-1.5 px-3.5 py-3 border-b border-border", children: [
                    /* @__PURE__ */ t("div", { className: "text-[11px] font-bold tracking-[0.3px] text-text-secondary uppercase", children: "Nodes" }),
                    se.map((o) => /* @__PURE__ */ i(
                      "label",
                      {
                        className: "flex items-center gap-1.5 text-xs",
                        children: [
                          /* @__PURE__ */ t(
                            "input",
                            {
                              type: "checkbox",
                              checked: l.nodes.has(o),
                              onChange: () => N(o)
                            }
                          ),
                          o
                        ]
                      },
                      o
                    ))
                  ] }),
                  /* @__PURE__ */ i("div", { className: "flex flex-col gap-1.5 px-3.5 py-3 border-b border-border", children: [
                    /* @__PURE__ */ t("div", { className: "text-[11px] font-bold tracking-[0.3px] text-text-secondary uppercase", children: "Severity" }),
                    ie.map((o) => /* @__PURE__ */ i(
                      "label",
                      {
                        className: "flex items-center gap-1.5 text-xs",
                        children: [
                          /* @__PURE__ */ t(
                            "input",
                            {
                              type: "checkbox",
                              checked: l.severities.has(o),
                              onChange: () => k(o)
                            }
                          ),
                          o
                        ]
                      },
                      o
                    ))
                  ] }),
                  /* @__PURE__ */ t("div", { className: "px-3.5 py-3", children: /* @__PURE__ */ t(
                    "button",
                    {
                      "data-testid": "events-clear-filters",
                      onClick: R,
                      className: "px-3 py-1.5 text-[13px] bg-transparent border-none text-text-secondary cursor-pointer font-[inherit] shrink-0",
                      children: "Clear"
                    }
                  ) })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ t("section", { className: "flex-1 min-w-0 flex flex-col", children: /* @__PURE__ */ t(
            it,
            {
              events: A,
              selectedId: n,
              onSelect: a,
              live: !s
            }
          ) }),
          /* @__PURE__ */ t("aside", { className: "w-80 shrink-0 border-l border-border bg-surface", children: /* @__PURE__ */ t(lt, { event: M }) })
        ] })
      ]
    }
  );
}
function _t() {
  return /* @__PURE__ */ t(ft, {});
}
const oe = {
  injectedLatencyMs: 0,
  injectedFailureRate: 0,
  paused: !1
};
let K = { ...oe };
const G = /* @__PURE__ */ new Set();
function ht() {
  return K;
}
function j(e) {
  K = { ...K, ...e }, G.forEach((r) => {
    try {
      r(K);
    } catch (n) {
      console.error("[chaosState] listener threw", n);
    }
  });
}
function bt() {
  j(oe);
}
function gt(e) {
  return G.add(e), () => {
    G.delete(e);
  };
}
const yt = [
  { id: "node-0" },
  { id: "node-1" },
  { id: "node-2" }
];
function vt(e) {
  const {
    onInjectLatency: r = (m) => j({ injectedLatencyMs: Math.max(0, m) }),
    onInjectPartition: n = (m) => (
      // No partition semantics exist locally — map to pause so something
      // visibly happens when you click Inject.
      j({ paused: m.length > 0 })
    ),
    onDropMessages: a = (m) => (
      // Interpret drop % as bonus failure-rate so the executor produces
      // roughly that many extra failed steps. Clamp 0..100.
      j({
        injectedFailureRate: Math.min(1, Math.max(0, m / 100))
      })
    ),
    onKillAll: s = () => j({ paused: !0 }),
    onReset: c = () => bt(),
    availableNodes: l = yt
  } = e, [u, x] = b("0"), [d, p] = b("0"), [y, L] = b([]), [A, M] = b(!1), [v, N] = b(() => ht());
  O(() => gt((m) => N(m)), []);
  const k = (m) => {
    L(
      (F) => F.includes(m) ? F.filter((le) => le !== m) : [...F, m]
    );
  }, R = () => {
    const m = Number.parseInt(u, 10);
    Number.isFinite(m) && r(m);
  }, o = () => {
    const m = Number.parseInt(d, 10);
    Number.isFinite(m) && a(m);
  }, f = () => {
    n(y);
  }, g = () => {
    s(), M(!1);
  }, S = () => {
    j({ paused: !v.paused });
  }, P = D(() => l, [l]), I = v.injectedLatencyMs > 0 || v.injectedFailureRate > 0 || v.paused;
  return /* @__PURE__ */ i(
    "div",
    {
      "data-testid": "chaos-panel",
      className: "w-60 shrink-0 p-4 bg-surface-panel border-r border-border font-[inherit] text-[13px] text-text-primary overflow-y-auto",
      children: [
        /* @__PURE__ */ t("div", { className: "text-[11px] font-bold text-text-secondary tracking-[0.4px] mb-3", children: "CHAOS" }),
        /* @__PURE__ */ i(
          "div",
          {
            "data-testid": "chaos-state-readout",
            className: h(
              "flex flex-col gap-1.5 pb-3 mb-3 border-b border-border",
              I && "bg-[#fffbeb] p-2 rounded-md border border-[#fde68a]"
            ),
            children: [
              /* @__PURE__ */ t("div", { className: "text-[11px] font-semibold text-text-secondary uppercase tracking-[0.3px]", children: "Current state" }),
              /* @__PURE__ */ i("div", { className: "text-xs text-text-primary leading-relaxed", children: [
                /* @__PURE__ */ i("div", { children: [
                  /* @__PURE__ */ t("span", { className: "text-text-tertiary", children: "Latency:" }),
                  " ",
                  /* @__PURE__ */ t("strong", { "data-testid": "chaos-state-latency", children: v.injectedLatencyMs }),
                  " ms"
                ] }),
                /* @__PURE__ */ i("div", { children: [
                  /* @__PURE__ */ t("span", { className: "text-text-tertiary", children: "Failure rate:" }),
                  " ",
                  /* @__PURE__ */ t("strong", { "data-testid": "chaos-state-failure", children: Math.round(v.injectedFailureRate * 100) }),
                  "%"
                ] }),
                /* @__PURE__ */ i("div", { children: [
                  /* @__PURE__ */ t("span", { className: "text-text-tertiary", children: "Paused:" }),
                  " ",
                  /* @__PURE__ */ t("strong", { "data-testid": "chaos-state-paused", children: v.paused ? "yes" : "no" })
                ] })
              ] }),
              /* @__PURE__ */ t(
                "button",
                {
                  "data-testid": "chaos-pause-toggle",
                  onClick: S,
                  className: "px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-white border-none rounded-md cursor-pointer font-[inherit] shrink-0",
                  children: v.paused ? "Resume" : "Pause"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ i("div", { className: "flex flex-col gap-1.5 pb-3 mb-3 border-b border-border", children: [
          /* @__PURE__ */ t("div", { className: "text-[11px] font-semibold text-text-secondary uppercase tracking-[0.3px]", children: "Latency" }),
          /* @__PURE__ */ i("div", { className: "flex gap-1.5", children: [
            /* @__PURE__ */ t(
              "input",
              {
                "data-testid": "chaos-latency-input",
                type: "number",
                min: 0,
                value: u,
                onChange: (m) => x(m.target.value),
                className: "flex-1 min-w-[60px] border border-border-field rounded-md px-2.5 py-1.5 text-[13px] font-[inherit] bg-[#f9fafb] text-text-primary outline-none",
                "aria-label": "Latency in milliseconds"
              }
            ),
            /* @__PURE__ */ t("span", { className: "text-[11px] text-text-tertiary self-center", children: "ms" })
          ] }),
          /* @__PURE__ */ t(
            "button",
            {
              "data-testid": "chaos-latency-apply",
              onClick: R,
              className: "px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-white border-none rounded-md cursor-pointer font-[inherit] shrink-0",
              children: "Apply"
            }
          )
        ] }),
        /* @__PURE__ */ i("div", { className: "flex flex-col gap-1.5 pb-3 mb-3 border-b border-border", children: [
          /* @__PURE__ */ t("div", { className: "text-[11px] font-semibold text-text-secondary uppercase tracking-[0.3px]", children: "Partition nodes" }),
          /* @__PURE__ */ t("div", { className: "flex flex-col gap-1", children: P.map((m) => /* @__PURE__ */ i(
            "label",
            {
              className: "flex items-center gap-1.5 text-xs text-text-primary cursor-pointer",
              children: [
                /* @__PURE__ */ t(
                  "input",
                  {
                    type: "checkbox",
                    checked: y.includes(m.id),
                    onChange: () => k(m.id)
                  }
                ),
                m.label ?? m.id
              ]
            },
            m.id
          )) }),
          /* @__PURE__ */ t(
            "button",
            {
              "data-testid": "chaos-partition-inject",
              onClick: f,
              className: h(
                "px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-white border-none rounded-md font-[inherit] shrink-0",
                y.length === 0 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
              ),
              disabled: y.length === 0,
              children: "Inject"
            }
          )
        ] }),
        /* @__PURE__ */ i("div", { className: "flex flex-col gap-1.5 pb-3 mb-3 border-b border-border", children: [
          /* @__PURE__ */ t("div", { className: "text-[11px] font-semibold text-text-secondary uppercase tracking-[0.3px]", children: "Drop messages" }),
          /* @__PURE__ */ i("div", { className: "flex gap-1.5", children: [
            /* @__PURE__ */ t(
              "input",
              {
                "data-testid": "chaos-drop-input",
                type: "number",
                min: 0,
                max: 100,
                value: d,
                onChange: (m) => p(m.target.value),
                className: "flex-1 min-w-[60px] border border-border-field rounded-md px-2.5 py-1.5 text-[13px] font-[inherit] bg-[#f9fafb] text-text-primary outline-none",
                "aria-label": "Drop percent"
              }
            ),
            /* @__PURE__ */ t("span", { className: "text-[11px] text-text-tertiary self-center", children: "%" })
          ] }),
          /* @__PURE__ */ t(
            "button",
            {
              "data-testid": "chaos-drop-apply",
              onClick: o,
              className: "px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-white border-none rounded-md cursor-pointer font-[inherit] shrink-0",
              children: "Apply"
            }
          )
        ] }),
        /* @__PURE__ */ i("div", { className: "flex flex-col gap-2", children: [
          /* @__PURE__ */ t(
            "button",
            {
              "data-testid": "chaos-kill-all",
              onClick: () => M(!0),
              className: "px-3.5 py-1.5 text-[13px] font-semibold bg-state-failed text-white border-none rounded-md cursor-pointer font-[inherit]",
              children: "Kill all"
            }
          ),
          /* @__PURE__ */ t(
            "button",
            {
              "data-testid": "chaos-reset",
              onClick: c,
              className: "px-3 py-1.5 text-[13px] bg-transparent border-none text-text-secondary cursor-pointer font-[inherit] shrink-0",
              children: "Reset"
            }
          )
        ] }),
        /* @__PURE__ */ t(
          ye,
          {
            open: A,
            onClose: () => M(!1),
            title: "Kill all nodes?",
            footer: /* @__PURE__ */ i(z, { children: [
              /* @__PURE__ */ t(
                "button",
                {
                  "data-testid": "chaos-kill-cancel",
                  onClick: () => M(!1),
                  className: "px-3 py-1.5 text-[13px] bg-transparent border-none text-text-secondary cursor-pointer font-[inherit] shrink-0",
                  children: "Cancel"
                }
              ),
              /* @__PURE__ */ t(
                "button",
                {
                  "data-testid": "chaos-kill-confirm",
                  onClick: g,
                  className: "px-3.5 py-1.5 text-[13px] font-semibold bg-state-failed text-white border-none rounded-md cursor-pointer font-[inherit]",
                  children: "Kill all"
                }
              )
            ] }),
            children: "This will terminate every node in the cluster. This action is destructive and cannot be undone."
          }
        )
      ]
    }
  );
}
function V(e) {
  const r = [];
  let n = e;
  for (let a = 0; a < 24; a++)
    n = (n * 9301 + 49297) % 233280, r.push(Math.abs(n % 40) + 5);
  return r;
}
function Nt() {
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
      cpuHistory: V(1)
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
      cpuHistory: V(7)
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
      cpuHistory: V(13)
    }
  ];
}
function wt() {
  const e = re?.regions ?? {}, r = [];
  for (const n of Object.keys(e)) {
    const a = e[n];
    if (a?.nodes && Array.isArray(a.nodes))
      for (const s of a.nodes)
        r.push({
          id: s.id ?? `node-${r.length}`,
          status: s.status ?? "healthy",
          role: s.role ?? "worker",
          region: n,
          cpu: s.cpu ?? 0,
          memoryMb: s.memoryMb ?? 0,
          connections: s.connections ?? 0,
          activeRuns: s.activeRuns ?? 0,
          cpuHistory: s.cpuHistory ?? V(r.length + 1)
        });
  }
  return r.length > 0 ? r : Nt();
}
function kt(e) {
  return e >= 1024 ? `${(e / 1024).toFixed(1)}G` : `${Math.round(e)}M`;
}
function Ot() {
  const e = D(wt, []), [r, n] = b(null), a = D(
    () => e.find((s) => s.id === r) ?? null,
    [e, r]
  );
  return /* @__PURE__ */ i(
    "div",
    {
      "data-testid": "nodes-page",
      className: "flex h-full min-h-0 font-[inherit] text-[13px] text-text-primary bg-surface",
      children: [
        /* @__PURE__ */ t(
          "div",
          {
            title: "Stub: writes to local chaosState; real cluster injection ships in Phase 5",
            "data-testid": "chaos-rail-stub-wrapper",
            children: /* @__PURE__ */ t(
              vt,
              {
                availableNodes: e.map((s) => ({ id: s.id, label: s.id }))
              }
            )
          }
        ),
        /* @__PURE__ */ t("section", { className: "flex-1 min-w-0 overflow-auto p-6", children: /* @__PURE__ */ t(
          ae,
          {
            nodes: e,
            selectedId: r ?? void 0,
            onSelect: (s) => n(s === r ? null : s)
          }
        ) }),
        a && /* @__PURE__ */ i(
          "aside",
          {
            "data-testid": "nodes-detail-drawer",
            className: "w-80 shrink-0 border-l border-border bg-surface flex flex-col overflow-y-auto",
            children: [
              /* @__PURE__ */ i("div", { className: "px-3.5 py-3 border-b border-border flex items-center justify-between", children: [
                /* @__PURE__ */ i("div", { className: "flex flex-col", children: [
                  /* @__PURE__ */ t("div", { className: "text-[13px] font-semibold", children: a.id }),
                  /* @__PURE__ */ t("div", { className: "text-[11px] text-text-tertiary", children: [a.role, a.region].filter(Boolean).join(" · ") || "worker" })
                ] }),
                /* @__PURE__ */ t(
                  "button",
                  {
                    "data-testid": "nodes-detail-close",
                    onClick: () => n(null),
                    "aria-label": "Close drawer",
                    className: "border-none bg-transparent text-text-tertiary cursor-pointer text-base p-0.5 font-[inherit]",
                    children: "×"
                  }
                )
              ] }),
              /* @__PURE__ */ i("div", { className: "px-3.5 py-3 border-b border-border flex flex-col gap-2", children: [
                /* @__PURE__ */ t("div", { className: "text-[11px] font-bold tracking-[0.3px] text-text-secondary uppercase", children: "Metrics" }),
                /* @__PURE__ */ t("table", { className: "w-full text-xs border-collapse", children: /* @__PURE__ */ t("tbody", { children: [
                  ["Status", a.status],
                  ["CPU", `${Math.round(a.cpu)}%`],
                  ["Memory", kt(a.memoryMb)],
                  ["Connections", String(a.connections)],
                  ["Active runs", String(a.activeRuns)],
                  ["Region", a.region ?? "—"],
                  ["Role", a.role ?? "—"]
                ].map(([s, c]) => /* @__PURE__ */ i("tr", { children: [
                  /* @__PURE__ */ t("td", { className: "text-text-tertiary py-[3px] w-[45%]", children: s }),
                  /* @__PURE__ */ t("td", { className: "text-text-primary py-[3px]", children: c })
                ] }, s)) }) })
              ] }),
              /* @__PURE__ */ i("div", { className: "px-3.5 py-3 border-b border-border flex flex-col gap-2", children: [
                /* @__PURE__ */ t("div", { className: "text-[11px] font-bold tracking-[0.3px] text-text-secondary uppercase", children: "Owned resources" }),
                /* @__PURE__ */ t("div", { className: "text-xs text-text-tertiary", children: "No resources owned (Phase 1 placeholder)." })
              ] }),
              /* @__PURE__ */ i("div", { className: "px-3.5 py-3 border-b border-border flex flex-col gap-2", children: [
                /* @__PURE__ */ t("div", { className: "text-[11px] font-bold tracking-[0.3px] text-text-secondary uppercase", children: "Chaos (this node)" }),
                /* @__PURE__ */ t(
                  "button",
                  {
                    title: "Stub: real per-node chaos injection ships in Phase 5",
                    onClick: () => console.log("[NodesPage] add latency to", a.id),
                    className: "self-start px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-white border-none rounded-md cursor-pointer font-[inherit] shrink-0",
                    children: "Add latency"
                  }
                ),
                /* @__PURE__ */ t(
                  "button",
                  {
                    title: "Stub: real per-node chaos injection ships in Phase 5",
                    onClick: () => console.log("[NodesPage] kill", a.id),
                    className: "self-start px-3.5 py-1.5 text-[13px] font-semibold bg-state-failed text-white border-none rounded-md cursor-pointer font-[inherit]",
                    children: "Kill node"
                  }
                )
              ] }),
              /* @__PURE__ */ i("div", { className: "px-3.5 py-3 border-b border-border flex flex-col gap-2", children: [
                /* @__PURE__ */ t("div", { className: "text-[11px] font-bold tracking-[0.3px] text-text-secondary uppercase", children: "Actions" }),
                /* @__PURE__ */ t(
                  "button",
                  {
                    onClick: () => console.log("[NodesPage] transfer resource from", a.id),
                    className: "px-3 py-1.5 text-[13px] bg-transparent border-none text-text-secondary cursor-pointer font-[inherit] shrink-0",
                    children: "Transfer resource"
                  }
                )
              ] })
            ]
          }
        )
      ]
    }
  );
}
export {
  Pe as DashboardKPIStrip,
  $t as DashboardPage,
  _t as EventsPage,
  rt as MetricTimeSeriesPanel,
  Dt as MetricsPage,
  Ot as NodesPage,
  Ft as ObservabilityLayout
};
