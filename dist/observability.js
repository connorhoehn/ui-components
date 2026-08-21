import { jsx as t, jsxs as i, Fragment as J } from "react/jsx-runtime";
import { Outlet as he, useNavigate as be } from "react-router";
import { useState as g, useRef as T, useCallback as X, useEffect as O, useMemo as D } from "react";
import { u as q, d as ne } from "./ObservabilityContext-mvmEXnGv.js";
import { u as ge } from "./IdentityContext-CLalsm_M.js";
import { S as ae, E as se, C as ie } from "./CardHeader-Cri3P8GV.js";
import { c as h } from "./cn-B6yFEsav.js";
import { S as ve, L as _, B as ye } from "./Chart-ByoxeiYX.js";
import { S as Y } from "./Select-DAEcKWg2.js";
import { a as Ne } from "./EventStreamContext-CjzSHXy-.js";
import { E as we } from "./EmptyState-Ejc9dJA3.js";
import { I as z } from "./Input-Dt0yAs9r.js";
import { C as V } from "./Checkbox-vOc5I8kn.js";
import { M as ke } from "./Modal-X8tdpRKs.js";
import { C as oe } from "./Card-qOg_oC77.js";
import { C as le } from "./Chip-BDT8ro4h.js";
import { S as ce } from "./StatusDot-BC7B1tTr.js";
function Zt() {
  return /* @__PURE__ */ t(he, {});
}
function Ce() {
  return q().dashboard;
}
const Se = "", Me = 1e4, Re = 1e3, Le = 2, Ae = 3e4;
function Ee(e) {
  const r = Math.max(0, e - 1);
  return Math.min(
    Re * Math.pow(Le, r),
    Ae
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
function Te(e) {
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
function de() {
  const { idToken: e } = ge(), [r, n] = g(null), [a, s] = g(!0), [c, o] = g(null), [x, u] = g(null), [l, p] = g(!1), f = T(null), L = T(!0), A = T(!1), M = T(0), y = X(async () => {
    f.current && f.current.abort();
    const N = new AbortController();
    f.current = N;
    try {
      const k = {
        "Content-Type": "application/json"
      };
      e && (k.Authorization = `Bearer ${e}`);
      const R = await fetch(`${Se}/api/pipelines/metrics`, {
        method: "GET",
        headers: k,
        signal: N.signal
      });
      if (!R.ok)
        throw new Error(`HTTP ${R.status}`);
      const d = Te(await R.json());
      if (!L.current || N.signal.aborted) return;
      n(d), u((/* @__PURE__ */ new Date()).toISOString()), o(null), p(!0), A.current = !1, M.current = 0;
    } catch (k) {
      if (k.name === "AbortError" || !L.current) return;
      o(k.message || "Failed to fetch pipeline metrics"), p(!1), M.current += 1, n((R) => R ?? Ie()), A.current || (console.warn(
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
      const v = M.current > 0 ? Ee(M.current) : Me;
      N = setTimeout(() => {
        N = null, y().finally(() => {
          R();
        });
      }, v);
    }, d = () => {
      N === null && R();
    };
    y().finally(() => {
      document.hidden || d();
    });
    const b = () => {
      document.hidden ? k() : (k(), y().finally(() => {
        document.hidden || d();
      }));
    };
    return document.addEventListener("visibilitychange", b), () => {
      L.current = !1, k(), document.removeEventListener("visibilitychange", b), f.current && (f.current.abort(), f.current = null);
    };
  }, [y]), {
    metrics: r,
    loading: a,
    error: c,
    lastUpdatedAt: x,
    refresh: y,
    isLiveData: l,
    source: r?.source ?? null
  };
}
function Pe(e) {
  return typeof e == "number" ? e.toLocaleString() : e;
}
function H({ title: e, value: r, delta: n, sparklineData: a, onClick: s }) {
  const [c, o] = g(!1), x = !!s;
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
      className: h(
        "flex-1 min-w-[180px] bg-surface border rounded-[10px] p-4",
        "flex flex-col gap-1.5 font-[inherit] transition-[border-color] duration-[120ms] ease-linear",
        x ? "cursor-pointer" : "cursor-default",
        c && x ? "border-primary" : "border-border"
      ),
      children: [
        /* @__PURE__ */ t("div", { className: "text-xs font-semibold text-text-secondary tracking-[0.2px]", children: e }),
        /* @__PURE__ */ i("div", { className: "flex items-baseline justify-between gap-2", children: [
          /* @__PURE__ */ t("div", { className: "text-[28px] font-bold text-text-primary leading-[1.1]", children: Pe(r) }),
          a && a.length > 0 && /* @__PURE__ */ t(
            ae,
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
function $e({
  runsToday: e,
  runsSparkline: r,
  activeNow: n,
  pendingApprovals: a,
  failed24h: s,
  avgFirstTokenLatency: c,
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
        value: c
      }
    )
  ] });
}
const Q = {
  healthy: "border-state-completed",
  degraded: "border-state-awaiting",
  dead: "border-state-failed",
  idle: "border-state-idle"
}, _e = {
  healthy: "bg-state-completed",
  degraded: "bg-state-awaiting",
  dead: "bg-state-failed",
  idle: "bg-state-idle"
};
function De(e) {
  return e >= 1024 ? `${(e / 1024).toFixed(1)}G` : `${Math.round(e)}M`;
}
function B({ label: e, value: r }) {
  return /* @__PURE__ */ i("div", { className: "flex justify-between items-baseline text-xs font-[inherit]", children: [
    /* @__PURE__ */ t("span", { className: "text-text-secondary font-semibold", children: e }),
    /* @__PURE__ */ t("span", { className: "text-text-primary font-mono text-[11px]", children: r })
  ] });
}
function Fe({ node: e, selected: r, onClick: n, onKill: a }) {
  const [s, c] = g(!1), o = e.activeRuns > 0 ? `${e.activeRuns}` : "— idle";
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
        r ? "border-primary shadow-[0_0_0_4px_rgba(100,108,255,0.18)]" : s ? h(Q[e.status], "shadow-[0_2px_8px_rgba(100,108,255,0.10)]") : Q[e.status]
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
              className: h("w-2 h-2 rounded-full shrink-0", _e[e.status])
            }
          )
        ] }),
        (e.role || e.region) && /* @__PURE__ */ t("div", { className: "text-[11px] text-text-tertiary font-[inherit]", children: [e.role, e.region].filter(Boolean).join(" · ") }),
        /* @__PURE__ */ i("div", { className: "flex flex-col gap-0.5", children: [
          /* @__PURE__ */ t(B, { label: "CPU", value: `${Math.round(e.cpu)}%` }),
          /* @__PURE__ */ t(B, { label: "MEM", value: De(e.memoryMb) }),
          /* @__PURE__ */ t(B, { label: "CONN", value: `${e.connections}` }),
          /* @__PURE__ */ t(B, { label: "RUNS", value: o })
        ] }),
        /* @__PURE__ */ t("div", { className: "mt-auto", children: /* @__PURE__ */ t(
          ae,
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
function pe({ nodes: e, onSelect: r, selectedId: n }) {
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
        Fe,
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
function Oe({
  run: e,
  onClick: r,
  onCancel: n
}) {
  const [a, s] = g(!1), c = !!r, o = c ? `Open run ${e.runId} of pipeline ${e.pipelineName}` : void 0, x = (p) => {
    r && (p.key === "Enter" || p.key === " " || p.key === "Spacebar") && (p.preventDefault(), r(e));
  }, u = (p) => {
    p.stopPropagation(), n && n(e);
  }, l = !!n && e.status === "running";
  return /* @__PURE__ */ i(
    "tr",
    {
      "data-testid": "active-run-row",
      role: c ? "button" : void 0,
      "aria-label": o,
      tabIndex: c ? 0 : void 0,
      onClick: r ? () => r(e) : void 0,
      onKeyDown: c ? x : void 0,
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
        n && /* @__PURE__ */ t("td", { className: "px-3 py-2 text-[13px] text-text-primary font-[inherit] border-b border-border text-right w-px whitespace-nowrap", children: l && /* @__PURE__ */ t(
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
function je({ runs: e, onRowClick: r, onCancelRun: n }) {
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
          Oe,
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
const He = {
  info: "text-info",
  warning: "text-state-awaiting",
  error: "text-danger",
  critical: "text-danger"
}, Ue = {
  info: "border-l-info",
  warning: "border-l-state-awaiting",
  error: "border-l-danger",
  critical: "border-l-danger"
}, Be = {
  info: "ℹ",
  warning: "⚠",
  error: "✕",
  critical: "✕"
};
function Ve(e) {
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
function Ge({
  alert: e,
  onDismiss: r
}) {
  const n = Be[e.severity];
  return /* @__PURE__ */ i(
    "div",
    {
      "data-testid": "alert-item",
      className: h(
        "flex items-start gap-2.5 px-3 py-2.5",
        "bg-surface border border-border border-l-[3px] rounded-md font-[inherit]",
        Ue[e.severity]
      ),
      children: [
        /* @__PURE__ */ t(
          "span",
          {
            "aria-hidden": "true",
            className: h("text-sm leading-5 shrink-0 w-4 text-center", He[e.severity]),
            children: n
          }
        ),
        /* @__PURE__ */ i("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ t("div", { className: "text-[13px] text-text-primary leading-[1.4]", children: e.message }),
          /* @__PURE__ */ i("div", { className: "text-[11px] text-text-tertiary mt-0.5", children: [
            e.category ? `${e.category} · ` : "",
            Ve(e.timestamp)
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
function Ke({ alerts: e, onDismiss: r }) {
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
      children: e.map((n) => /* @__PURE__ */ t(Ge, { alert: n, onDismiss: r }, n.id))
    }
  );
}
const U = "—";
function ze(e) {
  return typeof e != "number" || !Number.isFinite(e) ? U : e < 1e3 ? `${Math.round(e)} ms` : `${(e / 1e3).toFixed(1)}s`;
}
function Ye(e) {
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
const Z = [];
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
function Xe({
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
    /* @__PURE__ */ t(pe, { nodes: e, onSelect: a })
  ] });
}
function qe({
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
      se,
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
function er() {
  const e = be(), r = T(null), { live: n, setLive: a, recentEvents: s, activeRunsCount: c, isLiveData: o } = q(), u = Ce() ?? ne, { metrics: l, source: p } = de(), f = u?.overview ?? {}, L = D(() => Ye(f), [f]), A = l?.runsStarted ?? U, M = [0, 0, 0, 0, 0, 0, 0, 0], y = c > 0 ? c : l?.runsActive ?? U, N = l?.runsAwaitingApproval ?? U, k = l?.runsFailed ?? U, R = l?.avgFirstTokenLatencyMs ?? null, d = ze(R), b = Array.isArray(u?.alerts) ? u.alerts : [], v = () => {
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
                className: h(
                  "text-[11px] font-semibold",
                  o ? "text-state-completed" : "text-text-tertiary"
                ),
                children: o ? "live data" : "fixture"
              }
            ),
            /* @__PURE__ */ t(We, { source: p }),
            /* @__PURE__ */ t(Je, { live: n, onChange: a })
          ] })
        ] }),
        /* @__PURE__ */ t(
          $e,
          {
            runsToday: A,
            runsSparkline: M,
            activeNow: y,
            pendingApprovals: N,
            failed24h: k,
            avgFirstTokenLatency: d,
            onScrollToActive: v,
            onGoToPipelines: S,
            onGoToFailedEvents: P
          }
        ),
        /* @__PURE__ */ t(
          Xe,
          {
            nodes: L,
            healthyCount: f.healthyNodes ?? 0,
            totalCount: f.totalNodes ?? 0,
            onSelect: E
          }
        ),
        /* @__PURE__ */ i("div", { ref: r, children: [
          /* @__PURE__ */ i("div", { className: "text-sm font-semibold text-text-primary mb-2 font-[inherit]", children: [
            "Active runs (",
            Z.length,
            ")"
          ] }),
          /* @__PURE__ */ t(
            je,
            {
              runs: Z,
              onRowClick: ($) => e(`/pipelines/${$.pipelineId}/runs/${$.runId}`)
            }
          )
        ] }),
        /* @__PURE__ */ t(
          qe,
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
          /* @__PURE__ */ t(Ke, { alerts: b })
        ] })
      ]
    }
  );
}
function Qe(e = 60) {
  const { dashboard: r } = q(), [n, a] = g([]);
  return O(() => {
    r && a((s) => [...s, r].slice(-e));
  }, [r, e]), n;
}
const Ze = "", et = 1e4;
function tt() {
  const [e, r] = g(null), [n, a] = g(!0), [s, c] = g(null), o = T(!1), x = X(async () => {
    try {
      const u = await fetch(`${Ze}/api/pipelines/dashboard-data`, {
        credentials: "same-origin"
      });
      if (!u.ok) {
        const f = (await u.json().catch(() => null))?.error ?? `HTTP ${u.status}`;
        o.current || c(f);
        return;
      }
      const l = await u.json();
      o.current || (r(l), c(null));
    } catch (u) {
      const l = u instanceof Error ? u.message : String(u);
      o.current || c(l);
    } finally {
      o.current || a(!1);
    }
  }, []);
  return O(() => {
    o.current = !1, x();
    const u = window.setInterval(() => {
      document.hidden || x();
    }, et);
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
const ee = [
  { value: "15m", label: "Last 15m" },
  { value: "1h", label: "Last 1h" },
  { value: "24h", label: "Last 24h" },
  { value: "7d", label: "Last 7d" }
], rt = [
  { value: "off", label: "Off" },
  { value: "5s", label: "5s" },
  { value: "30s", label: "30s" },
  { value: "60s", label: "60s" }
];
function nt({
  seeds: e,
  liveSeries: r,
  cols: n,
  isLiveData: a,
  failedColor: s
}) {
  const [c, o] = g("1h"), [x, u] = g("30s"), l = ee.find((p) => p.value === c)?.label ?? "";
  return /* @__PURE__ */ i(J, { children: [
    /* @__PURE__ */ i("div", { className: "flex items-center gap-3 px-4 py-2.5 border-b border-border bg-surface-panel", children: [
      /* @__PURE__ */ t(
        Y,
        {
          "data-testid": "metrics-time-range",
          "aria-label": "Time range",
          value: c,
          onChange: (p) => o(p.target.value),
          className: "w-auto min-w-[120px]",
          options: ee.map((p) => ({ value: p.value, label: p.label }))
        }
      ),
      /* @__PURE__ */ t(
        Y,
        {
          "data-testid": "metrics-refresh-interval",
          "aria-label": "Refresh interval",
          value: x,
          onChange: (p) => u(p.target.value),
          className: "w-auto min-w-[100px]",
          options: rt.map((p) => ({ value: p.value, label: `Refresh: ${p.label}` }))
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
          /* @__PURE__ */ t(I, { title: "Runs per minute", timeRange: l, children: /* @__PURE__ */ t(
            ve,
            {
              series: r?.runsPerMinute ?? e.runsPerMinute,
              height: 180
            }
          ) }),
          /* @__PURE__ */ t(I, { title: "Step duration (p50/p95/p99)", timeRange: l, children: /* @__PURE__ */ t(
            _,
            {
              series: e.stepDuration,
              height: 180,
              yFormat: (p) => `${Math.round(p)}ms`
            }
          ) }),
          /* @__PURE__ */ t(I, { title: "LLM tokens", timeRange: l, children: /* @__PURE__ */ t(
            _,
            {
              series: r?.llmTokens ?? e.llmTokens,
              height: 180
            }
          ) }),
          /* @__PURE__ */ t(I, { title: "LLM cost", timeRange: l, children: /* @__PURE__ */ t(
            _,
            {
              series: r?.llmCost ?? e.llmCost,
              height: 180,
              yFormat: (p) => `$${p.toFixed(2)}`
            }
          ) }),
          /* @__PURE__ */ t(I, { title: "Cluster CPU", timeRange: l, children: /* @__PURE__ */ t(
            _,
            {
              series: e.clusterCpu,
              height: 180,
              yFormat: (p) => `${Math.round(p)}%`
            }
          ) }),
          /* @__PURE__ */ t(I, { title: "Cluster memory", timeRange: l, children: /* @__PURE__ */ t(
            _,
            {
              series: e.clusterMemory,
              height: 180,
              yFormat: (p) => `${Math.round(p)}MB`
            }
          ) }),
          /* @__PURE__ */ t(I, { title: "Event rate", timeRange: l, children: /* @__PURE__ */ t(_, { series: e.eventRate, height: 180 }) }),
          /* @__PURE__ */ t(I, { title: "Active runs over time", timeRange: l, children: /* @__PURE__ */ t(
            _,
            {
              series: r?.activeRuns ?? e.activeRuns,
              height: 180
            }
          ) }),
          /* @__PURE__ */ t(I, { title: "Failure rate by type", timeRange: l, children: /* @__PURE__ */ t(
            ye,
            {
              data: e.failureRate,
              xKey: "x",
              yKey: "total",
              color: s,
              height: 180
            }
          ) }),
          /* @__PURE__ */ t(I, { title: "Approval latency", timeRange: l, children: /* @__PURE__ */ t(
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
const F = {
  primary: "#646cff",
  completed: "#16a34a",
  failed: "#dc2626"
};
function at() {
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
function st() {
  const [e, r] = g(() => typeof window > "u" ? 2 : window.innerWidth >= 1600 ? 3 : 2);
  return O(() => {
    if (typeof window > "u") return;
    const n = () => {
      r(window.innerWidth >= 1600 ? 3 : 2);
    };
    return window.addEventListener("resize", n), () => window.removeEventListener("resize", n);
  }, []), e;
}
function it() {
  const { data: e, loading: r, error: n } = tt();
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
function tr() {
  const e = D(at, []), r = st();
  Qe(60);
  const { metrics: n, isLiveData: a } = de(), [s, c] = g([]);
  O(() => {
    n && c((x) => [...x, n].slice(-30));
  }, [n]);
  const o = D(() => {
    if (s.length < 2) return null;
    const x = (N) => {
      const k = [];
      return s.forEach((R, d) => {
        const b = R[N];
        typeof b == "number" && Number.isFinite(b) && k.push({ x: d, y: b });
      }), k;
    }, u = (N) => N.length >= 2, l = x("runsActive"), p = x("llmTokensIn"), f = x("llmTokensOut"), L = x("estimatedCostUsd"), A = x("runsStarted"), M = x("runsCompleted"), y = x("runsFailed");
    return {
      activeRuns: u(l) ? [{ label: "active", data: l }] : null,
      llmTokens: u(p) && u(f) ? [
        { label: "input", data: p },
        { label: "output", data: f }
      ] : null,
      llmCost: u(L) ? [{ label: "USD", data: L }] : null,
      runsPerMinute: u(A) && u(M) && u(y) ? [
        { label: "started", color: F.primary, data: A },
        { label: "completed", color: F.completed, data: M },
        { label: "failed", color: F.failed, data: y }
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
          nt,
          {
            seeds: e,
            liveSeries: o,
            cols: r,
            isLiveData: a,
            failedColor: F.failed
          }
        ),
        /* @__PURE__ */ t(it, {})
      ]
    }
  );
}
function ot({ events: e, selectedId: r, onSelect: n, live: a = !1 }) {
  const s = T(null), [c, o] = g(!1);
  O(() => {
    if (!a || c) return;
    const l = s.current;
    l && (l.scrollTop = l.scrollHeight);
  }, [e, a, c]);
  const x = () => {
    const l = s.current;
    if (!l) return;
    const p = l.scrollHeight - l.scrollTop - l.clientHeight < 24;
    o(!p);
  }, u = () => {
    const l = s.current;
    l && (l.scrollTop = l.scrollHeight, o(!1));
  };
  return e.length === 0 ? /* @__PURE__ */ t("div", { className: "flex-1 flex", children: /* @__PURE__ */ t(
    we,
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
            children: e.map((l) => /* @__PURE__ */ t(
              se,
              {
                timestamp: l.timestamp,
                type: l.type,
                summary: l.summary,
                severity: l.severity,
                selected: l.id === r,
                onClick: n ? () => n(l.id) : void 0
              },
              l.id
            ))
          }
        ),
        a && c && /* @__PURE__ */ t(
          "button",
          {
            "data-testid": "jump-to-live",
            onClick: u,
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
function lt(e) {
  try {
    return JSON.stringify(e, null, 2);
  } catch {
    return String(e);
  }
}
function ct({ event: e }) {
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
  const r = lt(e.payload ?? e), n = () => {
    typeof navigator < "u" && navigator.clipboard && navigator.clipboard.writeText(r).catch(() => {
      console.warn("[EventDetailPane] clipboard copy failed");
    });
  }, a = () => {
    if (typeof window > "u") return;
    const s = new Blob([r], { type: "application/json" }), c = URL.createObjectURL(s), o = document.createElement("a");
    o.href = c, o.download = `${e.type}-${e.id}.json`, document.body.appendChild(o), o.click(), document.body.removeChild(o), URL.revokeObjectURL(c);
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
const te = 500, dt = ["All", "Errors", "LLM", "Approvals", "Lifecycle"], pt = [
  { value: "15m", label: "Last 15m" },
  { value: "1h", label: "Last 1h" },
  { value: "6h", label: "Last 6h" },
  { value: "24h", label: "Last 24h" },
  { value: "custom", label: "Custom" }
], ue = ["node-0", "node-1", "node-2"], xe = [
  "info",
  "warning",
  "error",
  "success"
];
function ut(e) {
  return e.includes("failed") || e.includes("error") ? "error" : e.includes("completed") ? "success" : e.includes("warn") || e.includes("awaiting") ? "warning" : "info";
}
function xt(e) {
  return e.includes("failed") || e.includes("error") ? "Errors" : e.startsWith("llm.") || e.includes(".llm.") ? "LLM" : e.includes("approval") ? "Approvals" : (e.includes("run.") || e.includes("pipeline."), "Lifecycle");
}
function mt(e, r) {
  if (r && typeof r == "object") {
    const n = r, a = [];
    if (typeof n.runId == "string" && a.push(`run ${n.runId}`), typeof n.pipelineId == "string" && a.push(`pipeline ${n.pipelineId}`), typeof n.nodeId == "string" && a.push(`node ${n.nodeId}`), a.length > 0) return a.join(" · ");
  }
  return e;
}
function ft(e = /* @__PURE__ */ new Date()) {
  const r = String(e.getHours()).padStart(2, "0"), n = String(e.getMinutes()).padStart(2, "0"), a = String(e.getSeconds()).padStart(2, "0"), s = String(e.getMilliseconds()).padStart(3, "0");
  return `${r}:${n}:${a}.${s}`;
}
const re = {
  groups: /* @__PURE__ */ new Set(["All"]),
  runIds: "",
  pipelineIds: "",
  nodes: new Set(ue),
  severities: new Set(xe),
  timeRange: "1h"
};
function ht() {
  const [e, r] = g([]), [n, a] = g(null), [s, c] = g(!1), [o, x] = g(re), [u, l] = g(!1), p = T(s);
  p.current = s;
  const f = T(0), L = X((d) => {
    if (p.current) return;
    const b = d, v = b?.eventType ?? "unknown", S = b?.payload ?? b;
    f.current += 1;
    const P = {
      id: `ev-${Date.now()}-${f.current}`,
      timestamp: ft(),
      type: v,
      summary: mt(v, S),
      severity: ut(v),
      payload: S
    };
    r((E) => {
      const m = [...E, P];
      return m.length > te ? m.slice(m.length - te) : m;
    });
  }, []);
  Ne("*", L);
  const A = D(() => {
    const d = o.runIds.split(",").map((S) => S.trim()).filter(Boolean), b = o.pipelineIds.split(",").map((S) => S.trim()).filter(Boolean), v = o.groups.has("All");
    return e.filter((S) => {
      if (!v) {
        const E = xt(S.type);
        if (!o.groups.has(E)) return !1;
      }
      if (S.severity && !o.severities.has(S.severity)) return !1;
      if (d.length > 0) {
        const E = S.payload?.runId;
        if (!E || !d.some((m) => E.includes(m))) return !1;
      }
      if (b.length > 0) {
        const E = S.payload?.pipelineId;
        if (!E || !b.some((m) => E.includes(m))) return !1;
      }
      const P = S.payload?.nodeId;
      return !(P && !o.nodes.has(P));
    });
  }, [e, o]), M = D(
    () => A.find((d) => d.id === n) ?? null,
    [A, n]
  ), y = (d) => {
    x((b) => {
      const v = new Set(b.groups);
      return v.has(d) ? v.delete(d) : v.add(d), { ...b, groups: v };
    });
  }, N = (d) => {
    x((b) => {
      const v = new Set(b.nodes);
      return v.has(d) ? v.delete(d) : v.add(d), { ...b, nodes: v };
    });
  }, k = (d) => {
    x((b) => {
      const v = new Set(b.severities);
      return v.has(d) ? v.delete(d) : v.add(d), { ...b, severities: v };
    });
  }, R = () => x(re);
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
              onClick: () => c((d) => !d),
              "data-testid": "events-live-toggle",
              className: h(
                "px-3 py-[5px] text-xs font-semibold rounded-md cursor-pointer font-[inherit]",
                s ? "bg-surface-hover text-text-secondary border border-border" : "bg-state-completed text-white border border-state-completed"
              ),
              children: s ? "■ Paused" : "● Live"
            }
          ),
          /* @__PURE__ */ t(
            Y,
            {
              "data-testid": "events-time-range",
              "aria-label": "Time range",
              value: o.timeRange,
              onChange: (d) => x((b) => ({ ...b, timeRange: d.target.value })),
              className: "w-auto min-w-[120px]",
              options: pt.map((d) => ({ value: d.value, label: d.label }))
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
                u ? "w-9" : "w-60"
              ),
              children: [
                /* @__PURE__ */ i("div", { className: "flex items-center justify-between px-3.5 py-2.5 border-b border-border", children: [
                  !u && /* @__PURE__ */ t("div", { className: "text-[11px] font-bold tracking-[0.3px] text-text-secondary", children: "FILTERS" }),
                  /* @__PURE__ */ t(
                    "button",
                    {
                      onClick: () => l((d) => !d),
                      "aria-label": u ? "Expand filters" : "Collapse filters",
                      className: "border-none bg-transparent text-text-tertiary cursor-pointer text-xs p-0.5 font-[inherit]",
                      children: u ? "›" : "‹"
                    }
                  )
                ] }),
                !u && /* @__PURE__ */ i(J, { children: [
                  /* @__PURE__ */ i("div", { className: "flex flex-col gap-1.5 px-3.5 py-3 border-b border-border", children: [
                    /* @__PURE__ */ t("div", { className: "text-[11px] font-bold tracking-[0.3px] text-text-secondary uppercase", children: "Event type" }),
                    dt.map((d) => /* @__PURE__ */ i(
                      "label",
                      {
                        className: "flex items-center gap-1.5 text-xs",
                        children: [
                          /* @__PURE__ */ t(
                            V,
                            {
                              checked: o.groups.has(d),
                              onChange: () => y(d)
                            }
                          ),
                          d
                        ]
                      },
                      d
                    ))
                  ] }),
                  /* @__PURE__ */ i("div", { className: "flex flex-col gap-1.5 px-3.5 py-3 border-b border-border", children: [
                    /* @__PURE__ */ t("div", { className: "text-[11px] font-bold tracking-[0.3px] text-text-secondary uppercase", children: "Runs" }),
                    /* @__PURE__ */ t(
                      z,
                      {
                        "data-testid": "events-filter-runs",
                        placeholder: "runId (comma-separated)",
                        value: o.runIds,
                        onChange: (d) => x((b) => ({ ...b, runIds: d.target.value })),
                        className: "flex-1 min-w-[120px]"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ i("div", { className: "flex flex-col gap-1.5 px-3.5 py-3 border-b border-border", children: [
                    /* @__PURE__ */ t("div", { className: "text-[11px] font-bold tracking-[0.3px] text-text-secondary uppercase", children: "Pipelines" }),
                    /* @__PURE__ */ t(
                      z,
                      {
                        "data-testid": "events-filter-pipelines",
                        placeholder: "pipelineId (comma-separated)",
                        value: o.pipelineIds,
                        onChange: (d) => x((b) => ({ ...b, pipelineIds: d.target.value })),
                        className: "flex-1 min-w-[120px]"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ i("div", { className: "flex flex-col gap-1.5 px-3.5 py-3 border-b border-border", children: [
                    /* @__PURE__ */ t("div", { className: "text-[11px] font-bold tracking-[0.3px] text-text-secondary uppercase", children: "Nodes" }),
                    ue.map((d) => /* @__PURE__ */ i(
                      "label",
                      {
                        className: "flex items-center gap-1.5 text-xs",
                        children: [
                          /* @__PURE__ */ t(
                            V,
                            {
                              checked: o.nodes.has(d),
                              onChange: () => N(d)
                            }
                          ),
                          d
                        ]
                      },
                      d
                    ))
                  ] }),
                  /* @__PURE__ */ i("div", { className: "flex flex-col gap-1.5 px-3.5 py-3 border-b border-border", children: [
                    /* @__PURE__ */ t("div", { className: "text-[11px] font-bold tracking-[0.3px] text-text-secondary uppercase", children: "Severity" }),
                    xe.map((d) => /* @__PURE__ */ i(
                      "label",
                      {
                        className: "flex items-center gap-1.5 text-xs",
                        children: [
                          /* @__PURE__ */ t(
                            V,
                            {
                              checked: o.severities.has(d),
                              onChange: () => k(d)
                            }
                          ),
                          d
                        ]
                      },
                      d
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
            ot,
            {
              events: A,
              selectedId: n,
              onSelect: a,
              live: !s
            }
          ) }),
          /* @__PURE__ */ t("aside", { className: "w-80 shrink-0 border-l border-border bg-surface", children: /* @__PURE__ */ t(ct, { event: M }) })
        ] })
      ]
    }
  );
}
function rr() {
  return /* @__PURE__ */ t(ht, {});
}
const me = {
  injectedLatencyMs: 0,
  injectedFailureRate: 0,
  paused: !1
};
let G = { ...me };
const W = /* @__PURE__ */ new Set();
function bt() {
  return G;
}
function j(e) {
  G = { ...G, ...e }, W.forEach((r) => {
    try {
      r(G);
    } catch (n) {
      console.error("[chaosState] listener threw", n);
    }
  });
}
function gt() {
  j(me);
}
function vt(e) {
  return W.add(e), () => {
    W.delete(e);
  };
}
const yt = [
  { id: "node-0" },
  { id: "node-1" },
  { id: "node-2" }
];
function Nt(e) {
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
    onReset: c = () => gt(),
    availableNodes: o = yt
  } = e, [x, u] = g("0"), [l, p] = g("0"), [f, L] = g([]), [A, M] = g(!1), [y, N] = g(() => bt());
  O(() => vt((m) => N(m)), []);
  const k = (m) => {
    L(
      ($) => $.includes(m) ? $.filter((fe) => fe !== m) : [...$, m]
    );
  }, R = () => {
    const m = Number.parseInt(x, 10);
    Number.isFinite(m) && r(m);
  }, d = () => {
    const m = Number.parseInt(l, 10);
    Number.isFinite(m) && a(m);
  }, b = () => {
    n(f);
  }, v = () => {
    s(), M(!1);
  }, S = () => {
    j({ paused: !y.paused });
  }, P = D(() => o, [o]), E = y.injectedLatencyMs > 0 || y.injectedFailureRate > 0 || y.paused;
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
              E && "bg-warning-bg p-2 rounded-md border border-warning-border"
            ),
            children: [
              /* @__PURE__ */ t("div", { className: "text-[11px] font-semibold text-text-secondary uppercase tracking-[0.3px]", children: "Current state" }),
              /* @__PURE__ */ i("div", { className: "text-xs text-text-primary leading-relaxed", children: [
                /* @__PURE__ */ i("div", { children: [
                  /* @__PURE__ */ t("span", { className: "text-text-tertiary", children: "Latency:" }),
                  " ",
                  /* @__PURE__ */ t("strong", { "data-testid": "chaos-state-latency", children: y.injectedLatencyMs }),
                  " ms"
                ] }),
                /* @__PURE__ */ i("div", { children: [
                  /* @__PURE__ */ t("span", { className: "text-text-tertiary", children: "Failure rate:" }),
                  " ",
                  /* @__PURE__ */ t("strong", { "data-testid": "chaos-state-failure", children: Math.round(y.injectedFailureRate * 100) }),
                  "%"
                ] }),
                /* @__PURE__ */ i("div", { children: [
                  /* @__PURE__ */ t("span", { className: "text-text-tertiary", children: "Paused:" }),
                  " ",
                  /* @__PURE__ */ t("strong", { "data-testid": "chaos-state-paused", children: y.paused ? "yes" : "no" })
                ] })
              ] }),
              /* @__PURE__ */ t(
                "button",
                {
                  "data-testid": "chaos-pause-toggle",
                  onClick: S,
                  className: "px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-white border-none rounded-md cursor-pointer font-[inherit] shrink-0",
                  children: y.paused ? "Resume" : "Pause"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ i("div", { className: "flex flex-col gap-1.5 pb-3 mb-3 border-b border-border", children: [
          /* @__PURE__ */ t("div", { className: "text-[11px] font-semibold text-text-secondary uppercase tracking-[0.3px]", children: "Latency" }),
          /* @__PURE__ */ i("div", { className: "flex gap-1.5", children: [
            /* @__PURE__ */ t(
              z,
              {
                "data-testid": "chaos-latency-input",
                type: "number",
                min: 0,
                value: x,
                onChange: (m) => u(m.target.value),
                className: "flex-1 min-w-[60px]",
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
                  V,
                  {
                    checked: f.includes(m.id),
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
              className: h(
                "px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-white border-none rounded-md font-[inherit] shrink-0",
                f.length === 0 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
              ),
              disabled: f.length === 0,
              children: "Inject"
            }
          )
        ] }),
        /* @__PURE__ */ i("div", { className: "flex flex-col gap-1.5 pb-3 mb-3 border-b border-border", children: [
          /* @__PURE__ */ t("div", { className: "text-[11px] font-semibold text-text-secondary uppercase tracking-[0.3px]", children: "Drop messages" }),
          /* @__PURE__ */ i("div", { className: "flex gap-1.5", children: [
            /* @__PURE__ */ t(
              z,
              {
                "data-testid": "chaos-drop-input",
                type: "number",
                min: 0,
                max: 100,
                value: l,
                onChange: (m) => p(m.target.value),
                className: "flex-1 min-w-[60px]",
                "aria-label": "Drop percent"
              }
            ),
            /* @__PURE__ */ t("span", { className: "text-[11px] text-text-tertiary self-center", children: "%" })
          ] }),
          /* @__PURE__ */ t(
            "button",
            {
              "data-testid": "chaos-drop-apply",
              onClick: d,
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
          ke,
          {
            open: A,
            onClose: () => M(!1),
            title: "Kill all nodes?",
            footer: /* @__PURE__ */ i(J, { children: [
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
                  onClick: v,
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
function K(e) {
  const r = [];
  let n = e;
  for (let a = 0; a < 24; a++)
    n = (n * 9301 + 49297) % 233280, r.push(Math.abs(n % 40) + 5);
  return r;
}
function wt() {
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
      cpuHistory: K(1)
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
      cpuHistory: K(7)
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
      cpuHistory: K(13)
    }
  ];
}
function kt() {
  const e = ne?.regions ?? {}, r = [];
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
          cpuHistory: s.cpuHistory ?? K(r.length + 1)
        });
  }
  return r.length > 0 ? r : wt();
}
function Ct(e) {
  return e >= 1024 ? `${(e / 1024).toFixed(1)}G` : `${Math.round(e)}M`;
}
function nr() {
  const e = D(kt, []), [r, n] = g(null), a = D(
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
              Nt,
              {
                availableNodes: e.map((s) => ({ id: s.id, label: s.id }))
              }
            )
          }
        ),
        /* @__PURE__ */ t("section", { className: "flex-1 min-w-0 overflow-auto p-6", children: /* @__PURE__ */ t(
          pe,
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
                  ["Memory", Ct(a.memoryMb)],
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
const St = {
  critical: "var(--color-danger)",
  warning: "var(--color-warning)",
  info: "var(--color-info)"
}, Mt = {
  critical: "bg-[var(--color-danger-bg)]",
  warning: "bg-[var(--color-warning-bg)]",
  info: "bg-[var(--color-info-bg)]"
}, Rt = {
  critical: "border-l-[var(--color-danger)]",
  warning: "border-l-[var(--color-warning)]",
  info: "border-l-[var(--color-info)]"
};
function Lt({
  severity: e,
  title: r,
  description: n,
  timestamp: a,
  resolved: s = !1,
  action: c,
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
      className: h(
        "rounded-md px-3 py-2.5 border-l-[3px] transition-opacity duration-300",
        s ? "bg-[var(--color-surface-subtle,#f8fafc)] border-l-[var(--color-text-tertiary)] opacity-70" : h(Mt[e], Rt[e]),
        o
      ),
      style: x,
      children: [
        /* @__PURE__ */ i("div", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ t(
            ce,
            {
              size: "xs",
              color: s ? "var(--color-text-tertiary)" : St[e],
              "aria-label": s ? "Resolved" : e
            }
          ),
          /* @__PURE__ */ t("span", { className: "text-[12px] font-semibold text-[var(--color-text-primary)]", children: r }),
          s && /* @__PURE__ */ t(le, { tone: "success", size: "xs", className: "ml-1", children: "Resolved" }),
          a != null && /* @__PURE__ */ t("span", { className: "ml-auto text-[10px] text-[var(--color-text-tertiary)]", children: a }),
          c && /* @__PURE__ */ t("span", { className: "ml-1 shrink-0", children: c })
        ] }),
        n != null && /* @__PURE__ */ t("div", { className: "mt-1 text-[11px] leading-snug text-[var(--color-text-secondary)]", children: n })
      ]
    }
  );
}
const At = /* @__PURE__ */ t("div", { className: "text-center text-[12px] text-[var(--color-text-tertiary)] py-8", children: "No alerts." }), Et = /* @__PURE__ */ t("div", { className: "text-center text-[12px] text-[var(--color-text-tertiary)] py-8", children: "Loading alerts…" });
function ar({
  items: e,
  title: r = "Alerts",
  headerSlot: n,
  loading: a = !1,
  empty: s,
  maxHeight: c,
  className: o,
  style: x,
  "data-testid": u = "alert-list"
}) {
  const l = e.filter((f) => !f.resolved).length, p = l > 0 ? /* @__PURE__ */ i(le, { tone: "danger", size: "xs", "data-testid": "alert-list-active-count", children: [
    l,
    " active"
  ] }) : null;
  return /* @__PURE__ */ i(
    oe,
    {
      "data-testid": u,
      className: h("flex flex-col", o),
      style: x,
      children: [
        /* @__PURE__ */ t("div", { className: "px-4 py-3 border-b border-[var(--color-border)]", children: /* @__PURE__ */ t(ie, { title: r, meta: n ?? p }) }),
        /* @__PURE__ */ t(
          "div",
          {
            role: "list",
            "data-testid": `${u}-rows`,
            className: "flex-1 overflow-y-auto p-2 space-y-1.5",
            style: { maxHeight: c },
            children: a ? Et : e.length === 0 ? s ?? At : e.map((f) => /* @__PURE__ */ t(
              Lt,
              {
                severity: f.severity,
                title: f.title,
                description: f.description,
                timestamp: f.timestamp,
                resolved: f.resolved,
                action: f.action
              },
              `${f.id}-${f.resolved ? "resolved" : "active"}`
            ))
          }
        )
      ]
    }
  );
}
const It = {
  healthy: "var(--color-success)",
  degraded: "var(--color-warning)",
  down: "var(--color-danger)",
  unknown: "var(--color-text-tertiary)"
}, Tt = {
  healthy: "bg-[var(--color-success-bg)] border-[var(--color-success-border)]",
  degraded: "bg-[var(--color-warning-bg)] border-[var(--color-warning-border)]",
  down: "bg-[var(--color-danger-bg)] border-[var(--color-danger-border)]",
  unknown: "bg-[var(--color-surface)] border-[var(--color-border)]"
};
function Pt({
  status: e,
  label: r,
  reason: n,
  dense: a = !1,
  className: s,
  style: c,
  "data-testid": o = `health-cell-${e}`
}) {
  return /* @__PURE__ */ i(
    "div",
    {
      "data-testid": o,
      "data-status": e,
      className: h(
        "rounded-md border transition-colors duration-300",
        a ? "px-2.5 py-2" : "px-3 py-2.5",
        Tt[e],
        s
      ),
      style: c,
      children: [
        /* @__PURE__ */ i("div", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ t(ce, { size: "xs", color: It[e], "aria-label": e }),
          /* @__PURE__ */ t("span", { className: "text-[11px] font-semibold text-[var(--color-text-primary)]", children: r })
        ] }),
        /* @__PURE__ */ t("div", { className: "mt-1 text-[10px] text-[var(--color-text-tertiary)]", children: n ?? e })
      ]
    }
  );
}
const $t = {
  1: "sm:grid-cols-1",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-4",
  6: "sm:grid-cols-6"
}, _t = /* @__PURE__ */ t("div", { className: "text-center text-[12px] text-[var(--color-text-tertiary)] py-8", children: "No nodes reporting." });
function sr({
  items: e,
  columns: r = 3,
  dense: n = !1,
  title: a,
  headerSlot: s,
  empty: c,
  className: o,
  style: x,
  "data-testid": u = "health-grid"
}) {
  const l = e.length === 0 ? c ?? _t : /* @__PURE__ */ t(
    "div",
    {
      role: "list",
      className: h(
        "grid grid-cols-1",
        $t[r],
        n ? "gap-1.5" : "gap-2"
      ),
      children: e.map((p) => /* @__PURE__ */ t("div", { role: "listitem", children: /* @__PURE__ */ t(
        Pt,
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
    oe,
    {
      "data-testid": u,
      className: h("flex flex-col", o),
      style: x,
      children: [
        /* @__PURE__ */ t("div", { className: "px-4 py-3 border-b border-[var(--color-border)]", children: /* @__PURE__ */ t(ie, { title: a, meta: s }) }),
        /* @__PURE__ */ t("div", { className: h(n ? "p-2" : "p-3"), children: l })
      ]
    }
  ) : /* @__PURE__ */ t(
    "div",
    {
      "data-testid": u,
      className: h(n ? "p-2" : "p-3", o),
      style: x,
      children: l
    }
  );
}
export {
  Lt as AlertItem,
  ar as AlertList,
  $e as DashboardKPIStrip,
  er as DashboardPage,
  rr as EventsPage,
  Pt as HealthCell,
  sr as HealthGrid,
  nt as MetricTimeSeriesPanel,
  tr as MetricsPage,
  nr as NodesPage,
  Zt as ObservabilityLayout
};
