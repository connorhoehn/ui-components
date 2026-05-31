import { jsx as t, jsxs as i, Fragment as z } from "react/jsx-runtime";
import { Outlet as xe, useNavigate as me } from "react-router";
import { useState as g, useRef as T, useCallback as Y, useEffect as O, useMemo as D } from "react";
import { u as W, d as ee } from "./ObservabilityContext-mvmEXnGv.js";
import { u as fe } from "./IdentityContext-CLalsm_M.js";
import { S as te, a as he, C as re } from "./CardHeader-CHxrs92b.js";
import { c as f } from "./cn-B6yFEsav.js";
import { S as be, L as _, B as ge } from "./Chart-ByoxeiYX.js";
import { a as ye } from "./EventStreamContext-CjzSHXy-.js";
import { E as ve } from "./EmptyState-D_CN3LUx.js";
import { M as Ne } from "./Modal-2jg4229_.js";
import { C as ne } from "./Card-B2uO9v1w.js";
import { C as ae } from "./Chip-CAS9vOWq.js";
import { S as se } from "./StatusDot-BC7B1tTr.js";
function Jt() {
  return /* @__PURE__ */ t(xe, {});
}
function we() {
  return W().dashboard;
}
const ke = "", Ce = 1e4, Se = 1e3, Me = 2, Re = 3e4;
function Le(e) {
  const r = Math.max(0, e - 1);
  return Math.min(
    Se * Math.pow(Me, r),
    Re
  );
}
function Ae() {
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
  const r = e ?? {}, n = (l) => typeof l == "number" && Number.isFinite(l) ? l : null, a = r.source, s = a === "bridge" || a === "stub" || a === "error" ? a : (
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
function ie() {
  const { idToken: e } = fe(), [r, n] = g(null), [a, s] = g(!0), [l, o] = g(null), [x, u] = g(null), [d, p] = g(!1), h = T(null), L = T(!0), A = T(!1), M = T(0), v = Y(async () => {
    h.current && h.current.abort();
    const N = new AbortController();
    h.current = N;
    try {
      const k = {
        "Content-Type": "application/json"
      };
      e && (k.Authorization = `Bearer ${e}`);
      const R = await fetch(`${ke}/api/pipelines/metrics`, {
        method: "GET",
        headers: k,
        signal: N.signal
      });
      if (!R.ok)
        throw new Error(`HTTP ${R.status}`);
      const c = Ee(await R.json());
      if (!L.current || N.signal.aborted) return;
      n(c), u((/* @__PURE__ */ new Date()).toISOString()), o(null), p(!0), A.current = !1, M.current = 0;
    } catch (k) {
      if (k.name === "AbortError" || !L.current) return;
      o(k.message || "Failed to fetch pipeline metrics"), p(!1), M.current += 1, n((R) => R ?? Ae()), A.current || (console.warn(
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
      const y = M.current > 0 ? Le(M.current) : Ce;
      N = setTimeout(() => {
        N = null, v().finally(() => {
          R();
        });
      }, y);
    }, c = () => {
      N === null && R();
    };
    v().finally(() => {
      document.hidden || c();
    });
    const b = () => {
      document.hidden ? k() : (k(), v().finally(() => {
        document.hidden || c();
      }));
    };
    return document.addEventListener("visibilitychange", b), () => {
      L.current = !1, k(), document.removeEventListener("visibilitychange", b), h.current && (h.current.abort(), h.current = null);
    };
  }, [v]), {
    metrics: r,
    loading: a,
    error: l,
    lastUpdatedAt: x,
    refresh: v,
    isLiveData: d,
    source: r?.source ?? null
  };
}
function Ie(e) {
  return typeof e == "number" ? e.toLocaleString() : e;
}
function H({ title: e, value: r, delta: n, sparklineData: a, onClick: s }) {
  const [l, o] = g(!1), x = !!s;
  return /* @__PURE__ */ i(
    "div",
    {
      "data-testid": "kpi-card",
      onClick: s,
      onMouseEnter: () => o(!0),
      onMouseLeave: () => o(!1),
      role: x ? "button" : void 0,
      tabIndex: x ? 0 : void 0,
      onKeyDown: x ? (u) => {
        (u.key === "Enter" || u.key === " ") && (u.preventDefault(), s?.());
      } : void 0,
      className: f(
        "flex-1 min-w-[180px] bg-surface border rounded-[10px] p-4",
        "flex flex-col gap-1.5 font-[inherit] transition-[border-color] duration-[120ms] ease-linear",
        x ? "cursor-pointer" : "cursor-default",
        l && x ? "border-primary" : "border-border"
      ),
      children: [
        /* @__PURE__ */ t("div", { className: "text-xs font-semibold text-text-secondary tracking-[0.2px]", children: e }),
        /* @__PURE__ */ i("div", { className: "flex items-baseline justify-between gap-2", children: [
          /* @__PURE__ */ t("div", { className: "text-[28px] font-bold text-text-primary leading-[1.1]", children: Ie(r) }),
          a && a.length > 0 && /* @__PURE__ */ t(
            te,
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
            className: f(
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
function Te({
  runsToday: e,
  runsSparkline: r,
  activeNow: n,
  pendingApprovals: a,
  failed24h: s,
  avgFirstTokenLatency: l,
  onScrollToActive: o,
  onGoToPipelines: x,
  onGoToFailedEvents: u
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
        onClick: o
      }
    ),
    /* @__PURE__ */ t(
      H,
      {
        title: "Pending approvals",
        value: a,
        onClick: x
      }
    ),
    /* @__PURE__ */ t(
      H,
      {
        title: "Failed (24h)",
        value: s,
        delta: typeof s == "number" ? { value: 4, direction: "down" } : void 0,
        onClick: u
      }
    ),
    /* @__PURE__ */ t(
      H,
      {
        title: "Avg first-token latency",
        value: l
      }
    )
  ] });
}
const J = {
  healthy: "border-state-completed",
  degraded: "border-state-awaiting",
  dead: "border-state-failed",
  idle: "border-state-idle"
}, Pe = {
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
function _e({ node: e, selected: r, onClick: n, onKill: a }) {
  const [s, l] = g(!1), o = e.activeRuns > 0 ? `${e.activeRuns}` : "— idle";
  return /* @__PURE__ */ i(
    "div",
    {
      "data-testid": "node-grid-tile",
      onClick: n,
      onMouseEnter: () => l(!0),
      onMouseLeave: () => l(!1),
      className: f(
        "w-[200px] h-[200px] bg-surface rounded-[10px] p-3",
        "flex flex-col gap-1.5 font-[inherit] box-border border",
        "transition-[box-shadow,border-color] duration-[120ms] ease-linear",
        n ? "cursor-pointer" : "cursor-default",
        r ? "border-primary shadow-[0_0_0_4px_rgba(100,108,255,0.18)]" : s ? f(J[e.status], "shadow-[0_2px_8px_rgba(100,108,255,0.10)]") : J[e.status]
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
              className: f("w-2 h-2 rounded-full shrink-0", Pe[e.status])
            }
          )
        ] }),
        (e.role || e.region) && /* @__PURE__ */ t("div", { className: "text-[11px] text-text-tertiary font-[inherit]", children: [e.role, e.region].filter(Boolean).join(" · ") }),
        /* @__PURE__ */ i("div", { className: "flex flex-col gap-0.5", children: [
          /* @__PURE__ */ t(B, { label: "CPU", value: `${Math.round(e.cpu)}%` }),
          /* @__PURE__ */ t(B, { label: "MEM", value: $e(e.memoryMb) }),
          /* @__PURE__ */ t(B, { label: "CONN", value: `${e.connections}` }),
          /* @__PURE__ */ t(B, { label: "RUNS", value: o })
        ] }),
        /* @__PURE__ */ t("div", { className: "mt-auto", children: /* @__PURE__ */ t(
          te,
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
            onClick: (x) => {
              x.stopPropagation(), a();
            },
            className: "self-start px-2 py-0.5 text-[11px] font-semibold bg-transparent text-text-tertiary border border-border rounded-sm cursor-pointer font-[inherit]",
            children: "● kill"
          }
        )
      ]
    }
  );
}
function oe({ nodes: e, onSelect: r, selectedId: n }) {
  return !e || e.length === 0 ? /* @__PURE__ */ t(
    "div",
    {
      "data-testid": "node-grid-empty",
      className: f("p-6 text-center text-text-tertiary text-[13px] font-[inherit]"),
      children: "No nodes connected"
    }
  ) : /* @__PURE__ */ t(
    "div",
    {
      "data-testid": "node-grid",
      className: f("flex flex-wrap gap-4 font-[inherit]"),
      children: e.map((a) => /* @__PURE__ */ t(
        _e,
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
function De({
  run: e,
  onClick: r,
  onCancel: n
}) {
  const [a, s] = g(!1), l = !!r, o = l ? `Open run ${e.runId} of pipeline ${e.pipelineName}` : void 0, x = (p) => {
    r && (p.key === "Enter" || p.key === " " || p.key === "Spacebar") && (p.preventDefault(), r(e));
  }, u = (p) => {
    p.stopPropagation(), n && n(e);
  }, d = !!n && e.status === "running";
  return /* @__PURE__ */ i(
    "tr",
    {
      "data-testid": "active-run-row",
      role: l ? "button" : void 0,
      "aria-label": o,
      tabIndex: l ? 0 : void 0,
      onClick: r ? () => r(e) : void 0,
      onKeyDown: l ? x : void 0,
      onMouseEnter: () => s(!0),
      onMouseLeave: () => s(!1),
      className: f(
        "outline-none",
        r ? "cursor-pointer" : "cursor-default",
        a ? "bg-surface-hover" : "bg-transparent"
      ),
      children: [
        /* @__PURE__ */ t("td", { className: "px-3 py-2 text-[13px] text-text-primary font-[inherit] border-b border-border font-semibold", children: /* @__PURE__ */ i("span", { className: "inline-flex items-center gap-1.5", children: [
          e.pipelineName,
          a && l && /* @__PURE__ */ t(
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
            onClick: u,
            onKeyDown: (p) => p.stopPropagation(),
            className: "px-2 py-0.5 text-[11px] font-semibold bg-transparent text-state-failed border border-border rounded-sm cursor-pointer font-[inherit]",
            children: "Cancel"
          }
        ) })
      ]
    }
  );
}
function Fe({ runs: e, onRowClick: r, onCancelRun: n }) {
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
          De,
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
const Oe = {
  info: "text-info",
  warning: "text-state-awaiting",
  error: "text-danger",
  critical: "text-danger"
}, je = {
  info: "border-l-info",
  warning: "border-l-state-awaiting",
  error: "border-l-danger",
  critical: "border-l-danger"
}, He = {
  info: "ℹ",
  warning: "⚠",
  error: "✕",
  critical: "✕"
};
function Ue(e) {
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
function Be({
  alert: e,
  onDismiss: r
}) {
  const n = He[e.severity];
  return /* @__PURE__ */ i(
    "div",
    {
      "data-testid": "alert-item",
      className: f(
        "flex items-start gap-2.5 px-3 py-2.5",
        "bg-surface border border-border border-l-[3px] rounded-md font-[inherit]",
        je[e.severity]
      ),
      children: [
        /* @__PURE__ */ t(
          "span",
          {
            "aria-hidden": "true",
            className: f("text-sm leading-5 shrink-0 w-4 text-center", Oe[e.severity]),
            children: n
          }
        ),
        /* @__PURE__ */ i("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ t("div", { className: "text-[13px] text-text-primary leading-[1.4]", children: e.message }),
          /* @__PURE__ */ i("div", { className: "text-[11px] text-text-tertiary mt-0.5", children: [
            e.category ? `${e.category} · ` : "",
            Ue(e.timestamp)
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
function Ge({ alerts: e, onDismiss: r }) {
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
      children: e.map((n) => /* @__PURE__ */ t(Be, { alert: n, onDismiss: r }, n.id))
    }
  );
}
const Ve = {
  info: "text-slate-500",
  warning: "text-amber-600",
  error: "text-red-600",
  success: "text-green-600"
};
function le({ timestamp: e, type: r, summary: n, severity: a = "info", onClick: s, selected: l }) {
  const o = he(r);
  return /* @__PURE__ */ i(
    "div",
    {
      "data-testid": "event-row",
      onClick: s,
      className: f(
        "flex items-center gap-2 px-2.5 py-1.5 text-[13px] font-[inherit] rounded-md text-slate-900",
        l ? "bg-violet-100" : "bg-transparent",
        s ? "cursor-pointer" : "cursor-default"
      ),
      children: [
        /* @__PURE__ */ t("span", { className: "text-sm shrink-0", style: { color: o.color }, children: o.icon }),
        /* @__PURE__ */ t("span", { className: "text-[11px] text-slate-400 shrink-0 w-[70px]", children: e }),
        /* @__PURE__ */ t("span", { className: f("text-xs font-semibold shrink-0", Ve[a]), children: r }),
        /* @__PURE__ */ t("span", { className: "flex-1 overflow-hidden text-ellipsis whitespace-nowrap", children: n })
      ]
    }
  );
}
const U = "—";
function Ke(e) {
  return typeof e != "number" || !Number.isFinite(e) ? U : e < 1e3 ? `${Math.round(e)} ms` : `${(e / 1e3).toFixed(1)}s`;
}
function ze(e) {
  const r = Math.max(0, e.totalNodes ?? 0), n = (a) => Array.from(
    { length: 12 },
    (s, l) => Math.max(0, Math.round(10 + Math.sin(a + l / 2) * 4 + l * 0.3))
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
function Ye({ source: e }) {
  if (e === null || e === "bridge") return null;
  const r = e === "error";
  return /* @__PURE__ */ t(
    "span",
    {
      "data-testid": "pipeline-metrics-source-pill",
      "data-source": e,
      title: r ? "/api/pipelines/metrics returned an error — values are placeholders" : "No pipeline bridge wired — metrics are synthesized fixture data",
      className: f(
        "inline-block px-2 py-0.5 rounded-sm text-[11px] font-semibold",
        r ? "bg-danger-bg text-state-failed" : "bg-warning-bg text-state-awaiting"
      ),
      children: r ? "metrics error" : "demo data"
    }
  );
}
function We({
  live: e,
  onChange: r
}) {
  return /* @__PURE__ */ i(
    "button",
    {
      "data-testid": "live-toggle",
      onClick: () => r(!e),
      className: f(
        "inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold",
        "rounded-md cursor-pointer font-[inherit]",
        e ? "bg-surface border border-primary text-primary" : "bg-surface-inset border border-border text-text-secondary"
      ),
      children: [
        /* @__PURE__ */ t(
          "span",
          {
            className: f("w-2 h-2 rounded-full", e ? "bg-success" : "bg-text-tertiary")
          }
        ),
        e ? "Live" : "Paused"
      ]
    }
  );
}
function Je({
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
          className: f(
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
    /* @__PURE__ */ t(oe, { nodes: e, onSelect: a })
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
      le,
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
function Xt() {
  const e = me(), r = T(null), { live: n, setLive: a, recentEvents: s, activeRunsCount: l, isLiveData: o } = W(), u = we() ?? ee, { metrics: d, source: p } = ie(), h = u?.overview ?? {}, L = D(() => ze(h), [h]), A = d?.runsStarted ?? U, M = [0, 0, 0, 0, 0, 0, 0, 0], v = l > 0 ? l : d?.runsActive ?? U, N = d?.runsAwaitingApproval ?? U, k = d?.runsFailed ?? U, R = d?.avgFirstTokenLatencyMs ?? null, c = Ke(R), b = Array.isArray(u?.alerts) ? u.alerts : [], y = () => {
    r.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, S = () => {
    e("/pipelines");
  }, P = () => {
    e("/observability/events?filter=errors");
  }, E = ($) => {
    e(`/observability/nodes?selected=${encodeURIComponent($)}`);
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
                title: o ? "Connected to /api/observability/dashboard" : "Backend unreachable — using fixture data",
                className: f(
                  "text-[11px] font-semibold",
                  o ? "text-state-completed" : "text-text-tertiary"
                ),
                children: o ? "live data" : "fixture"
              }
            ),
            /* @__PURE__ */ t(Ye, { source: p }),
            /* @__PURE__ */ t(We, { live: n, onChange: a })
          ] })
        ] }),
        /* @__PURE__ */ t(
          Te,
          {
            runsToday: A,
            runsSparkline: M,
            activeNow: v,
            pendingApprovals: N,
            failed24h: k,
            avgFirstTokenLatency: c,
            onScrollToActive: y,
            onGoToPipelines: S,
            onGoToFailedEvents: P
          }
        ),
        /* @__PURE__ */ t(
          Je,
          {
            nodes: L,
            healthyCount: h.healthyNodes ?? 0,
            totalCount: h.totalNodes ?? 0,
            onSelect: E
          }
        ),
        /* @__PURE__ */ i("div", { ref: r, children: [
          /* @__PURE__ */ i("div", { className: "text-sm font-semibold text-text-primary mb-2 font-[inherit]", children: [
            "Active runs (",
            X.length,
            ")"
          ] }),
          /* @__PURE__ */ t(
            Fe,
            {
              runs: X,
              onRowClick: ($) => e(`/pipelines/${$.pipelineId}/runs/${$.runId}`)
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
            b.length,
            ")"
          ] }),
          /* @__PURE__ */ t(Ge, { alerts: b })
        ] })
      ]
    }
  );
}
function qe(e = 60) {
  const { dashboard: r } = W(), [n, a] = g([]);
  return O(() => {
    r && a((s) => [...s, r].slice(-e));
  }, [r, e]), n;
}
const Qe = "", Ze = 1e4;
function et() {
  const [e, r] = g(null), [n, a] = g(!0), [s, l] = g(null), o = T(!1), x = Y(async () => {
    try {
      const u = await fetch(`${Qe}/api/pipelines/dashboard-data`, {
        credentials: "same-origin"
      });
      if (!u.ok) {
        const h = (await u.json().catch(() => null))?.error ?? `HTTP ${u.status}`;
        o.current || l(h);
        return;
      }
      const d = await u.json();
      o.current || (r(d), l(null));
    } catch (u) {
      const d = u instanceof Error ? u.message : String(u);
      o.current || l(d);
    } finally {
      o.current || a(!1);
    }
  }, []);
  return O(() => {
    o.current = !1, x();
    const u = window.setInterval(() => {
      document.hidden || x();
    }, Ze);
    return () => {
      o.current = !0, window.clearInterval(u);
    };
  }, [x]), { data: e, loading: n, error: s, refresh: x };
}
function I({ title: e, timeRange: r, children: n, onMaximize: a }) {
  return /* @__PURE__ */ i(
    "div",
    {
      "data-testid": "metric-card",
      className: f(
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
  const [l, o] = g("1h"), [x, u] = g("30s"), d = q.find((p) => p.value === l)?.label ?? "";
  return /* @__PURE__ */ i(z, { children: [
    /* @__PURE__ */ i("div", { className: "flex items-center gap-3 px-4 py-2.5 border-b border-border bg-surface-panel", children: [
      /* @__PURE__ */ t(
        "select",
        {
          "data-testid": "metrics-time-range",
          "aria-label": "Time range",
          value: l,
          onChange: (p) => o(p.target.value),
          className: "min-w-[120px] border border-border-field rounded-md px-2.5 py-1.5 text-[13px] font-[inherit] bg-[#f9fafb] text-text-primary outline-none",
          children: q.map((p) => /* @__PURE__ */ t("option", { value: p.value, children: p.label }, p.value))
        }
      ),
      /* @__PURE__ */ t(
        "select",
        {
          "data-testid": "metrics-refresh-interval",
          "aria-label": "Refresh interval",
          value: x,
          onChange: (p) => u(p.target.value),
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
                className: f(
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
          /* @__PURE__ */ t(I, { title: "Runs per minute", timeRange: d, children: /* @__PURE__ */ t(
            be,
            {
              series: r?.runsPerMinute ?? e.runsPerMinute,
              height: 180
            }
          ) }),
          /* @__PURE__ */ t(I, { title: "Step duration (p50/p95/p99)", timeRange: d, children: /* @__PURE__ */ t(
            _,
            {
              series: e.stepDuration,
              height: 180,
              yFormat: (p) => `${Math.round(p)}ms`
            }
          ) }),
          /* @__PURE__ */ t(I, { title: "LLM tokens", timeRange: d, children: /* @__PURE__ */ t(
            _,
            {
              series: r?.llmTokens ?? e.llmTokens,
              height: 180
            }
          ) }),
          /* @__PURE__ */ t(I, { title: "LLM cost", timeRange: d, children: /* @__PURE__ */ t(
            _,
            {
              series: r?.llmCost ?? e.llmCost,
              height: 180,
              yFormat: (p) => `$${p.toFixed(2)}`
            }
          ) }),
          /* @__PURE__ */ t(I, { title: "Cluster CPU", timeRange: d, children: /* @__PURE__ */ t(
            _,
            {
              series: e.clusterCpu,
              height: 180,
              yFormat: (p) => `${Math.round(p)}%`
            }
          ) }),
          /* @__PURE__ */ t(I, { title: "Cluster memory", timeRange: d, children: /* @__PURE__ */ t(
            _,
            {
              series: e.clusterMemory,
              height: 180,
              yFormat: (p) => `${Math.round(p)}MB`
            }
          ) }),
          /* @__PURE__ */ t(I, { title: "Event rate", timeRange: d, children: /* @__PURE__ */ t(_, { series: e.eventRate, height: 180 }) }),
          /* @__PURE__ */ t(I, { title: "Active runs over time", timeRange: d, children: /* @__PURE__ */ t(
            _,
            {
              series: r?.activeRuns ?? e.activeRuns,
              height: 180
            }
          ) }),
          /* @__PURE__ */ t(I, { title: "Failure rate by type", timeRange: d, children: /* @__PURE__ */ t(
            ge,
            {
              data: e.failureRate,
              xKey: "x",
              yKey: "total",
              color: s,
              height: 180
            }
          ) }),
          /* @__PURE__ */ t(I, { title: "Approval latency", timeRange: d, children: /* @__PURE__ */ t(
            _,
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
  for (let l = 0; l < r; l++)
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
const F = {
  primary: "#646cff",
  completed: "#16a34a",
  failed: "#dc2626"
};
function nt() {
  return {
    runsPerMinute: [
      C("started", w(3, 30, 40), F.primary),
      C("completed", w(7, 30, 40), F.completed),
      C("failed", w(11, 30, 20), F.failed)
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
  const [e, r] = g(() => typeof window > "u" ? 2 : window.innerWidth >= 1600 ? 3 : 2);
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
            className: f(
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
function qt() {
  const e = D(nt, []), r = at();
  qe(60);
  const { metrics: n, isLiveData: a } = ie(), [s, l] = g([]);
  O(() => {
    n && l((x) => [...x, n].slice(-30));
  }, [n]);
  const o = D(() => {
    if (s.length < 2) return null;
    const x = (N) => {
      const k = [];
      return s.forEach((R, c) => {
        const b = R[N];
        typeof b == "number" && Number.isFinite(b) && k.push({ x: c, y: b });
      }), k;
    }, u = (N) => N.length >= 2, d = x("runsActive"), p = x("llmTokensIn"), h = x("llmTokensOut"), L = x("estimatedCostUsd"), A = x("runsStarted"), M = x("runsCompleted"), v = x("runsFailed");
    return {
      activeRuns: u(d) ? [{ label: "active", data: d }] : null,
      llmTokens: u(p) && u(h) ? [
        { label: "input", data: p },
        { label: "output", data: h }
      ] : null,
      llmCost: u(L) ? [{ label: "USD", data: L }] : null,
      runsPerMinute: u(A) && u(M) && u(v) ? [
        { label: "started", color: F.primary, data: A },
        { label: "completed", color: F.completed, data: M },
        { label: "failed", color: F.failed, data: v }
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
            liveSeries: o,
            cols: r,
            isLiveData: a,
            failedColor: F.failed
          }
        ),
        /* @__PURE__ */ t(st, {})
      ]
    }
  );
}
function it({ events: e, selectedId: r, onSelect: n, live: a = !1 }) {
  const s = T(null), [l, o] = g(!1);
  O(() => {
    if (!a || l) return;
    const d = s.current;
    d && (d.scrollTop = d.scrollHeight);
  }, [e, a, l]);
  const x = () => {
    const d = s.current;
    if (!d) return;
    const p = d.scrollHeight - d.scrollTop - d.clientHeight < 24;
    o(!p);
  }, u = () => {
    const d = s.current;
    d && (d.scrollTop = d.scrollHeight, o(!1));
  };
  return e.length === 0 ? /* @__PURE__ */ t("div", { className: "flex-1 flex", children: /* @__PURE__ */ t(
    ve,
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
            onScroll: x,
            className: "flex-1 overflow-y-auto py-1.5 font-[inherit]",
            children: e.map((d) => /* @__PURE__ */ t(
              le,
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
        a && l && /* @__PURE__ */ t(
          "button",
          {
            "data-testid": "jump-to-live",
            onClick: u,
            className: f(
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
        className: f(
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
    const s = new Blob([r], { type: "application/json" }), l = URL.createObjectURL(s), o = document.createElement("a");
    o.href = l, o.download = `${e.type}-${e.id}.json`, document.body.appendChild(o), o.click(), document.body.removeChild(o), URL.revokeObjectURL(l);
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
              className: f(
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
              className: f(
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
            className: f(
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
], de = ["node-0", "node-1", "node-2"], ce = [
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
  nodes: new Set(de),
  severities: new Set(ce),
  timeRange: "1h"
};
function ft() {
  const [e, r] = g([]), [n, a] = g(null), [s, l] = g(!1), [o, x] = g(Z), [u, d] = g(!1), p = T(s);
  p.current = s;
  const h = T(0), L = Y((c) => {
    if (p.current) return;
    const b = c, y = b?.eventType ?? "unknown", S = b?.payload ?? b;
    h.current += 1;
    const P = {
      id: `ev-${Date.now()}-${h.current}`,
      timestamp: mt(),
      type: y,
      summary: xt(y, S),
      severity: pt(y),
      payload: S
    };
    r((E) => {
      const m = [...E, P];
      return m.length > Q ? m.slice(m.length - Q) : m;
    });
  }, []);
  ye("*", L);
  const A = D(() => {
    const c = o.runIds.split(",").map((S) => S.trim()).filter(Boolean), b = o.pipelineIds.split(",").map((S) => S.trim()).filter(Boolean), y = o.groups.has("All");
    return e.filter((S) => {
      if (!y) {
        const E = ut(S.type);
        if (!o.groups.has(E)) return !1;
      }
      if (S.severity && !o.severities.has(S.severity)) return !1;
      if (c.length > 0) {
        const E = S.payload?.runId;
        if (!E || !c.some((m) => E.includes(m))) return !1;
      }
      if (b.length > 0) {
        const E = S.payload?.pipelineId;
        if (!E || !b.some((m) => E.includes(m))) return !1;
      }
      const P = S.payload?.nodeId;
      return !(P && !o.nodes.has(P));
    });
  }, [e, o]), M = D(
    () => A.find((c) => c.id === n) ?? null,
    [A, n]
  ), v = (c) => {
    x((b) => {
      const y = new Set(b.groups);
      return y.has(c) ? y.delete(c) : y.add(c), { ...b, groups: y };
    });
  }, N = (c) => {
    x((b) => {
      const y = new Set(b.nodes);
      return y.has(c) ? y.delete(c) : y.add(c), { ...b, nodes: y };
    });
  }, k = (c) => {
    x((b) => {
      const y = new Set(b.severities);
      return y.has(c) ? y.delete(c) : y.add(c), { ...b, severities: y };
    });
  }, R = () => x(Z);
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
              onClick: () => l((c) => !c),
              "data-testid": "events-live-toggle",
              className: f(
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
              value: o.timeRange,
              onChange: (c) => x((b) => ({ ...b, timeRange: c.target.value })),
              className: "min-w-[120px] border border-border-field rounded-md px-2.5 py-1.5 text-[13px] font-[inherit] bg-[#f9fafb] text-text-primary outline-none",
              children: ct.map((c) => /* @__PURE__ */ t("option", { value: c.value, children: c.label }, c.value))
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
              className: f(
                "shrink-0 border-r border-border bg-surface-panel overflow-y-auto transition-[width] duration-150 ease-in-out",
                u ? "w-9" : "w-60"
              ),
              children: [
                /* @__PURE__ */ i("div", { className: "flex items-center justify-between px-3.5 py-2.5 border-b border-border", children: [
                  !u && /* @__PURE__ */ t("div", { className: "text-[11px] font-bold tracking-[0.3px] text-text-secondary", children: "FILTERS" }),
                  /* @__PURE__ */ t(
                    "button",
                    {
                      onClick: () => d((c) => !c),
                      "aria-label": u ? "Expand filters" : "Collapse filters",
                      className: "border-none bg-transparent text-text-tertiary cursor-pointer text-xs p-0.5 font-[inherit]",
                      children: u ? "›" : "‹"
                    }
                  )
                ] }),
                !u && /* @__PURE__ */ i(z, { children: [
                  /* @__PURE__ */ i("div", { className: "flex flex-col gap-1.5 px-3.5 py-3 border-b border-border", children: [
                    /* @__PURE__ */ t("div", { className: "text-[11px] font-bold tracking-[0.3px] text-text-secondary uppercase", children: "Event type" }),
                    dt.map((c) => /* @__PURE__ */ i(
                      "label",
                      {
                        className: "flex items-center gap-1.5 text-xs",
                        children: [
                          /* @__PURE__ */ t(
                            "input",
                            {
                              type: "checkbox",
                              checked: o.groups.has(c),
                              onChange: () => v(c)
                            }
                          ),
                          c
                        ]
                      },
                      c
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
                        value: o.runIds,
                        onChange: (c) => x((b) => ({ ...b, runIds: c.target.value })),
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
                        value: o.pipelineIds,
                        onChange: (c) => x((b) => ({ ...b, pipelineIds: c.target.value })),
                        className: "flex-1 min-w-[120px] border border-border-field rounded-md px-2.5 py-1.5 text-[13px] font-[inherit] bg-[#f9fafb] text-text-primary outline-none"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ i("div", { className: "flex flex-col gap-1.5 px-3.5 py-3 border-b border-border", children: [
                    /* @__PURE__ */ t("div", { className: "text-[11px] font-bold tracking-[0.3px] text-text-secondary uppercase", children: "Nodes" }),
                    de.map((c) => /* @__PURE__ */ i(
                      "label",
                      {
                        className: "flex items-center gap-1.5 text-xs",
                        children: [
                          /* @__PURE__ */ t(
                            "input",
                            {
                              type: "checkbox",
                              checked: o.nodes.has(c),
                              onChange: () => N(c)
                            }
                          ),
                          c
                        ]
                      },
                      c
                    ))
                  ] }),
                  /* @__PURE__ */ i("div", { className: "flex flex-col gap-1.5 px-3.5 py-3 border-b border-border", children: [
                    /* @__PURE__ */ t("div", { className: "text-[11px] font-bold tracking-[0.3px] text-text-secondary uppercase", children: "Severity" }),
                    ce.map((c) => /* @__PURE__ */ i(
                      "label",
                      {
                        className: "flex items-center gap-1.5 text-xs",
                        children: [
                          /* @__PURE__ */ t(
                            "input",
                            {
                              type: "checkbox",
                              checked: o.severities.has(c),
                              onChange: () => k(c)
                            }
                          ),
                          c
                        ]
                      },
                      c
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
function Qt() {
  return /* @__PURE__ */ t(ft, {});
}
const pe = {
  injectedLatencyMs: 0,
  injectedFailureRate: 0,
  paused: !1
};
let G = { ...pe };
const K = /* @__PURE__ */ new Set();
function ht() {
  return G;
}
function j(e) {
  G = { ...G, ...e }, K.forEach((r) => {
    try {
      r(G);
    } catch (n) {
      console.error("[chaosState] listener threw", n);
    }
  });
}
function bt() {
  j(pe);
}
function gt(e) {
  return K.add(e), () => {
    K.delete(e);
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
    onReset: l = () => bt(),
    availableNodes: o = yt
  } = e, [x, u] = g("0"), [d, p] = g("0"), [h, L] = g([]), [A, M] = g(!1), [v, N] = g(() => ht());
  O(() => gt((m) => N(m)), []);
  const k = (m) => {
    L(
      ($) => $.includes(m) ? $.filter((ue) => ue !== m) : [...$, m]
    );
  }, R = () => {
    const m = Number.parseInt(x, 10);
    Number.isFinite(m) && r(m);
  }, c = () => {
    const m = Number.parseInt(d, 10);
    Number.isFinite(m) && a(m);
  }, b = () => {
    n(h);
  }, y = () => {
    s(), M(!1);
  }, S = () => {
    j({ paused: !v.paused });
  }, P = D(() => o, [o]), E = v.injectedLatencyMs > 0 || v.injectedFailureRate > 0 || v.paused;
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
            className: f(
              "flex flex-col gap-1.5 pb-3 mb-3 border-b border-border",
              E && "bg-[#fffbeb] p-2 rounded-md border border-[#fde68a]"
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
                value: x,
                onChange: (m) => u(m.target.value),
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
                    checked: h.includes(m.id),
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
              onClick: b,
              className: f(
                "px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-white border-none rounded-md font-[inherit] shrink-0",
                h.length === 0 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
              ),
              disabled: h.length === 0,
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
              onClick: c,
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
              onClick: l,
              className: "px-3 py-1.5 text-[13px] bg-transparent border-none text-text-secondary cursor-pointer font-[inherit] shrink-0",
              children: "Reset"
            }
          )
        ] }),
        /* @__PURE__ */ t(
          Ne,
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
                  onClick: y,
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
  const e = ee?.regions ?? {}, r = [];
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
function Zt() {
  const e = D(wt, []), [r, n] = g(null), a = D(
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
          oe,
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
                ].map(([s, l]) => /* @__PURE__ */ i("tr", { children: [
                  /* @__PURE__ */ t("td", { className: "text-text-tertiary py-[3px] w-[45%]", children: s }),
                  /* @__PURE__ */ t("td", { className: "text-text-primary py-[3px]", children: l })
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
const Ct = {
  critical: "var(--color-danger)",
  warning: "var(--color-warning)",
  info: "var(--color-info)"
}, St = {
  critical: "bg-[var(--color-danger-bg)]",
  warning: "bg-[var(--color-warning-bg)]",
  info: "bg-[var(--color-info-bg)]"
}, Mt = {
  critical: "border-l-[var(--color-danger)]",
  warning: "border-l-[var(--color-warning)]",
  info: "border-l-[var(--color-info)]"
};
function Rt({
  severity: e,
  title: r,
  description: n,
  timestamp: a,
  resolved: s = !1,
  action: l,
  className: o,
  style: x,
  "data-testid": u = `alert-${e}`
}) {
  return /* @__PURE__ */ i(
    "div",
    {
      role: "listitem",
      "data-testid": u,
      "data-resolved": s || void 0,
      className: f(
        "rounded-md px-3 py-2.5 border-l-[3px] transition-opacity duration-300",
        s ? "bg-[var(--color-surface-subtle,#f8fafc)] border-l-[var(--color-text-tertiary)] opacity-70" : f(St[e], Mt[e]),
        o
      ),
      style: x,
      children: [
        /* @__PURE__ */ i("div", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ t(
            se,
            {
              size: "xs",
              color: s ? "var(--color-text-tertiary)" : Ct[e],
              "aria-label": s ? "Resolved" : e
            }
          ),
          /* @__PURE__ */ t("span", { className: "text-[12px] font-semibold text-[var(--color-text-primary)]", children: r }),
          s && /* @__PURE__ */ t(ae, { tone: "success", size: "xs", className: "ml-1", children: "Resolved" }),
          a != null && /* @__PURE__ */ t("span", { className: "ml-auto text-[10px] text-[var(--color-text-tertiary)]", children: a }),
          l && /* @__PURE__ */ t("span", { className: "ml-1 shrink-0", children: l })
        ] }),
        n != null && /* @__PURE__ */ t("div", { className: "mt-1 text-[11px] leading-snug text-[var(--color-text-secondary)]", children: n })
      ]
    }
  );
}
const Lt = /* @__PURE__ */ t("div", { className: "text-center text-[12px] text-[var(--color-text-tertiary)] py-8", children: "No alerts." }), At = /* @__PURE__ */ t("div", { className: "text-center text-[12px] text-[var(--color-text-tertiary)] py-8", children: "Loading alerts…" });
function er({
  items: e,
  title: r = "Alerts",
  headerSlot: n,
  loading: a = !1,
  empty: s,
  maxHeight: l,
  className: o,
  style: x,
  "data-testid": u = "alert-list"
}) {
  const d = e.filter((h) => !h.resolved).length, p = d > 0 ? /* @__PURE__ */ i(ae, { tone: "danger", size: "xs", "data-testid": "alert-list-active-count", children: [
    d,
    " active"
  ] }) : null;
  return /* @__PURE__ */ i(
    ne,
    {
      "data-testid": u,
      className: f("flex flex-col", o),
      style: x,
      children: [
        /* @__PURE__ */ t("div", { className: "px-4 py-3 border-b border-[var(--color-border)]", children: /* @__PURE__ */ t(re, { title: r, meta: n ?? p }) }),
        /* @__PURE__ */ t(
          "div",
          {
            role: "list",
            "data-testid": `${u}-rows`,
            className: "flex-1 overflow-y-auto p-2 space-y-1.5",
            style: { maxHeight: l },
            children: a ? At : e.length === 0 ? s ?? Lt : e.map((h) => /* @__PURE__ */ t(
              Rt,
              {
                severity: h.severity,
                title: h.title,
                description: h.description,
                timestamp: h.timestamp,
                resolved: h.resolved,
                action: h.action
              },
              `${h.id}-${h.resolved ? "resolved" : "active"}`
            ))
          }
        )
      ]
    }
  );
}
const Et = {
  healthy: "var(--color-success)",
  degraded: "var(--color-warning)",
  down: "var(--color-danger)",
  unknown: "var(--color-text-tertiary)"
}, It = {
  healthy: "bg-[var(--color-success-bg)] border-[var(--color-success-border)]",
  degraded: "bg-[var(--color-warning-bg)] border-[var(--color-warning-border)]",
  down: "bg-[var(--color-danger-bg)] border-[var(--color-danger-border)]",
  unknown: "bg-[var(--color-surface)] border-[var(--color-border)]"
};
function Tt({
  status: e,
  label: r,
  reason: n,
  dense: a = !1,
  className: s,
  style: l,
  "data-testid": o = `health-cell-${e}`
}) {
  return /* @__PURE__ */ i(
    "div",
    {
      "data-testid": o,
      "data-status": e,
      className: f(
        "rounded-md border transition-colors duration-300",
        a ? "px-2.5 py-2" : "px-3 py-2.5",
        It[e],
        s
      ),
      style: l,
      children: [
        /* @__PURE__ */ i("div", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ t(se, { size: "xs", color: Et[e], "aria-label": e }),
          /* @__PURE__ */ t("span", { className: "text-[11px] font-semibold text-[var(--color-text-primary)]", children: r })
        ] }),
        /* @__PURE__ */ t("div", { className: "mt-1 text-[10px] text-[var(--color-text-tertiary)]", children: n ?? e })
      ]
    }
  );
}
const Pt = {
  1: "sm:grid-cols-1",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-4",
  6: "sm:grid-cols-6"
}, $t = /* @__PURE__ */ t("div", { className: "text-center text-[12px] text-[var(--color-text-tertiary)] py-8", children: "No nodes reporting." });
function tr({
  items: e,
  columns: r = 3,
  dense: n = !1,
  title: a,
  headerSlot: s,
  empty: l,
  className: o,
  style: x,
  "data-testid": u = "health-grid"
}) {
  const d = e.length === 0 ? l ?? $t : /* @__PURE__ */ t(
    "div",
    {
      role: "list",
      className: f(
        "grid grid-cols-1",
        Pt[r],
        n ? "gap-1.5" : "gap-2"
      ),
      children: e.map((p) => /* @__PURE__ */ t("div", { role: "listitem", children: /* @__PURE__ */ t(
        Tt,
        {
          status: p.status,
          label: p.label,
          reason: p.reason,
          dense: n
        }
      ) }, p.id))
    }
  );
  return a ? /* @__PURE__ */ i(
    ne,
    {
      "data-testid": u,
      className: f("flex flex-col", o),
      style: x,
      children: [
        /* @__PURE__ */ t("div", { className: "px-4 py-3 border-b border-[var(--color-border)]", children: /* @__PURE__ */ t(re, { title: a, meta: s }) }),
        /* @__PURE__ */ t("div", { className: f(n ? "p-2" : "p-3"), children: d })
      ]
    }
  ) : /* @__PURE__ */ t(
    "div",
    {
      "data-testid": u,
      className: f(n ? "p-2" : "p-3", o),
      style: x,
      children: d
    }
  );
}
export {
  Rt as AlertItem,
  er as AlertList,
  Te as DashboardKPIStrip,
  Xt as DashboardPage,
  Qt as EventsPage,
  Tt as HealthCell,
  tr as HealthGrid,
  rt as MetricTimeSeriesPanel,
  qt as MetricsPage,
  Zt as NodesPage,
  Jt as ObservabilityLayout
};
