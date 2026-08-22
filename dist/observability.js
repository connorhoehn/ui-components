import { jsx as t, jsxs as s, Fragment as J } from "react/jsx-runtime";
import { Outlet as he, useNavigate as be } from "react-router";
import { useState as v, useRef as T, useCallback as X, useEffect as O, useMemo as D } from "react";
import { u as q, d as ne } from "./ObservabilityContext-mvmEXnGv.js";
import { u as ge } from "./IdentityContext-CLalsm_M.js";
import { S as ae, E as se, C as ie } from "./CardHeader-C068zmoE.js";
import { c as b } from "./cn-B6yFEsav.js";
import { S as ve, L as _, B as ye } from "./Chart-D_DsFB-7.js";
import { S as Y } from "./Select-DAEcKWg2.js";
import { a as Ne } from "./EventStreamContext-CjzSHXy-.js";
import { E as we } from "./EmptyState-Ejc9dJA3.js";
import { I as z } from "./Input-Dt0yAs9r.js";
import { C as G } from "./Checkbox-vOc5I8kn.js";
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
const Se = "", Me = 1e4, Re = 1e3, Le = 2, Ee = 3e4;
function Ae(e) {
  const n = Math.max(0, e - 1);
  return Math.min(
    Re * Math.pow(Le, n),
    Ee
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
  const n = e ?? {}, r = (c) => typeof c == "number" && Number.isFinite(c) ? c : null, a = n.source, i = a === "bridge" || a === "stub" || a === "error" ? a : (
    // Backwards-compat: legacy responses without a discriminator are
    // assumed to be stub-shaped (full numbers), since the previous
    // backend always synthesized values.
    "stub"
  );
  return {
    runsStarted: r(n.runsStarted),
    runsCompleted: r(n.runsCompleted),
    runsFailed: r(n.runsFailed),
    runsActive: r(n.runsActive),
    runsAwaitingApproval: r(n.runsAwaitingApproval),
    avgDurationMs: r(n.avgDurationMs),
    llmTokensIn: r(n.llmTokensIn),
    llmTokensOut: r(n.llmTokensOut),
    estimatedCostUsd: r(n.estimatedCostUsd),
    // distributed-core v0.3.7+ surfaces this via the bridge. Older responses
    // omit it entirely → numOrNull collapses `undefined` to `null`, preserving
    // back-compat with the pre-v0.3.7 backend.
    avgFirstTokenLatencyMs: r(n.avgFirstTokenLatencyMs),
    asOf: typeof n.asOf == "string" ? n.asOf : (/* @__PURE__ */ new Date()).toISOString(),
    source: i
  };
}
function de() {
  const { idToken: e } = ge(), [n, r] = v(null), [a, i] = v(!0), [c, o] = v(null), [u, l] = v(null), [d, h] = v(!1), x = T(null), f = T(!0), E = T(!1), R = T(0), N = X(async () => {
    x.current && x.current.abort();
    const w = new AbortController();
    x.current = w;
    try {
      const C = {
        "Content-Type": "application/json"
      };
      e && (C.Authorization = `Bearer ${e}`);
      const L = await fetch(`${Se}/api/pipelines/metrics`, {
        method: "GET",
        headers: C,
        signal: w.signal
      });
      if (!L.ok)
        throw new Error(`HTTP ${L.status}`);
      const p = Te(await L.json());
      if (!f.current || w.signal.aborted) return;
      r(p), l((/* @__PURE__ */ new Date()).toISOString()), o(null), h(!0), E.current = !1, R.current = 0;
    } catch (C) {
      if (C.name === "AbortError" || !f.current) return;
      o(C.message || "Failed to fetch pipeline metrics"), h(!1), R.current += 1, r((L) => L ?? Ie()), E.current || (console.warn(
        "[usePipelineMetrics] /api/pipelines/metrics unreachable — using fallback",
        C
      ), E.current = !0);
    } finally {
      f.current && !w.signal.aborted && i(!1);
    }
  }, [e]);
  return O(() => {
    f.current = !0;
    let w = null;
    const C = () => {
      w !== null && (clearTimeout(w), w = null);
    }, L = () => {
      if (!f.current || document.hidden) return;
      const y = R.current > 0 ? Ae(R.current) : Me;
      w = setTimeout(() => {
        w = null, N().finally(() => {
          L();
        });
      }, y);
    }, p = () => {
      w === null && L();
    };
    N().finally(() => {
      document.hidden || p();
    });
    const g = () => {
      document.hidden ? C() : (C(), N().finally(() => {
        document.hidden || p();
      }));
    };
    return document.addEventListener("visibilitychange", g), () => {
      f.current = !1, C(), document.removeEventListener("visibilitychange", g), x.current && (x.current.abort(), x.current = null);
    };
  }, [N]), {
    metrics: n,
    loading: a,
    error: c,
    lastUpdatedAt: u,
    refresh: N,
    isLiveData: d,
    source: n?.source ?? null
  };
}
function Pe(e) {
  return typeof e == "number" ? e.toLocaleString() : e;
}
function H({ title: e, value: n, delta: r, sparklineData: a, onClick: i }) {
  const [c, o] = v(!1), u = !!i;
  return /* @__PURE__ */ s(
    "div",
    {
      "data-testid": "kpi-card",
      onClick: i,
      onMouseEnter: () => o(!0),
      onMouseLeave: () => o(!1),
      role: u ? "button" : void 0,
      tabIndex: u ? 0 : void 0,
      onKeyDown: u ? (l) => {
        (l.key === "Enter" || l.key === " ") && (l.preventDefault(), i?.());
      } : void 0,
      className: b(
        "flex-1 min-w-[180px] bg-surface border rounded-[10px] p-4",
        "flex flex-col gap-1.5 font-[inherit] transition-[border-color] duration-[120ms] ease-linear",
        u ? "cursor-pointer" : "cursor-default",
        c && u ? "border-primary" : "border-border"
      ),
      children: [
        /* @__PURE__ */ t("div", { className: "text-xs font-semibold text-text-secondary tracking-[0.2px]", children: e }),
        /* @__PURE__ */ s("div", { className: "flex items-baseline justify-between gap-2", children: [
          /* @__PURE__ */ t("div", { className: "text-[28px] font-bold text-text-primary leading-[1.1]", children: Pe(n) }),
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
        r && /* @__PURE__ */ s(
          "div",
          {
            className: b(
              "text-[11px] font-semibold font-[inherit]",
              r.direction === "up" ? "text-state-completed" : "text-state-failed"
            ),
            children: [
              r.direction === "up" ? "▲" : "▼",
              " ",
              Math.abs(r.value),
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
  runsSparkline: n,
  activeNow: r,
  pendingApprovals: a,
  failed24h: i,
  avgFirstTokenLatency: c,
  onScrollToActive: o,
  onGoToPipelines: u,
  onGoToFailedEvents: l
}) {
  return /* @__PURE__ */ s("div", { className: "grid grid-cols-[repeat(auto-fit,minmax(170px,1fr))] gap-4", children: [
    /* @__PURE__ */ t(
      H,
      {
        title: "Runs today",
        value: e,
        delta: typeof e == "number" ? { value: 12, direction: "up" } : void 0,
        sparklineData: n
      }
    ),
    /* @__PURE__ */ t(
      H,
      {
        title: "Active now",
        value: r,
        onClick: o
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
        value: i,
        delta: typeof i == "number" ? { value: 4, direction: "down" } : void 0,
        onClick: l
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
function B({ label: e, value: n }) {
  return /* @__PURE__ */ s("div", { className: "flex justify-between items-baseline text-xs font-[inherit]", children: [
    /* @__PURE__ */ t("span", { className: "text-text-secondary font-semibold", children: e }),
    /* @__PURE__ */ t("span", { className: "text-text-primary font-mono text-[11px]", children: n })
  ] });
}
function Fe({ node: e, selected: n, onClick: r, onKill: a }) {
  const [i, c] = v(!1), o = e.activeRuns > 0 ? `${e.activeRuns}` : "— idle";
  return /* @__PURE__ */ s(
    "div",
    {
      "data-testid": "node-grid-tile",
      onClick: r,
      onMouseEnter: () => c(!0),
      onMouseLeave: () => c(!1),
      className: b(
        "w-[200px] h-[200px] bg-surface rounded-[10px] p-3",
        "flex flex-col gap-1.5 font-[inherit] box-border border",
        "transition-[box-shadow,border-color] duration-[120ms] ease-linear",
        r ? "cursor-pointer" : "cursor-default",
        n ? "border-primary shadow-[0_0_0_4px_rgba(100,108,255,0.18)]" : i ? b(Q[e.status], "shadow-[0_2px_8px_rgba(100,108,255,0.10)]") : Q[e.status]
      ),
      children: [
        /* @__PURE__ */ s("div", { className: "flex justify-between items-center", children: [
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
              className: b("w-2 h-2 rounded-full shrink-0", _e[e.status])
            }
          )
        ] }),
        (e.role || e.region) && /* @__PURE__ */ t("div", { className: "text-[11px] text-text-tertiary font-[inherit]", children: [e.role, e.region].filter(Boolean).join(" · ") }),
        /* @__PURE__ */ s("div", { className: "flex flex-col gap-0.5", children: [
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
function pe({ nodes: e, onSelect: n, selectedId: r }) {
  return !e || e.length === 0 ? /* @__PURE__ */ t(
    "div",
    {
      "data-testid": "node-grid-empty",
      className: b("p-6 text-center text-text-tertiary text-[13px] font-[inherit]"),
      children: "No nodes connected"
    }
  ) : /* @__PURE__ */ t(
    "div",
    {
      "data-testid": "node-grid",
      className: b("flex flex-wrap gap-4 font-[inherit]"),
      children: e.map((a) => /* @__PURE__ */ t(
        Fe,
        {
          node: a,
          selected: r === a.id,
          onClick: n ? () => n(a.id) : void 0
        },
        a.id
      ))
    }
  );
}
function Oe({
  run: e,
  onClick: n,
  onCancel: r
}) {
  const [a, i] = v(!1), c = !!n, o = c ? `Open run ${e.runId} of pipeline ${e.pipelineName}` : void 0, u = (h) => {
    n && (h.key === "Enter" || h.key === " " || h.key === "Spacebar") && (h.preventDefault(), n(e));
  }, l = (h) => {
    h.stopPropagation(), r && r(e);
  }, d = !!r && e.status === "running";
  return /* @__PURE__ */ s(
    "tr",
    {
      "data-testid": "active-run-row",
      role: c ? "button" : void 0,
      "aria-label": o,
      tabIndex: c ? 0 : void 0,
      onClick: n ? () => n(e) : void 0,
      onKeyDown: c ? u : void 0,
      onMouseEnter: () => i(!0),
      onMouseLeave: () => i(!1),
      className: b(
        "outline-none",
        n ? "cursor-pointer" : "cursor-default",
        a ? "bg-surface-hover" : "bg-transparent"
      ),
      children: [
        /* @__PURE__ */ t("td", { className: "px-3 py-2 text-[13px] text-text-primary font-[inherit] border-b border-border font-semibold", children: /* @__PURE__ */ s("span", { className: "inline-flex items-center gap-1.5", children: [
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
        r && /* @__PURE__ */ t("td", { className: "px-3 py-2 text-[13px] text-text-primary font-[inherit] border-b border-border text-right w-px whitespace-nowrap", children: d && /* @__PURE__ */ t(
          "button",
          {
            "data-testid": "active-run-cancel",
            type: "button",
            "aria-label": `Cancel run ${e.runId}`,
            onClick: l,
            onKeyDown: (h) => h.stopPropagation(),
            className: "px-2 py-0.5 text-[11px] font-semibold bg-transparent text-state-failed border border-border rounded-sm cursor-pointer font-[inherit]",
            children: "Cancel"
          }
        ) })
      ]
    }
  );
}
function je({ runs: e, onRowClick: n, onCancelRun: r }) {
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
      children: /* @__PURE__ */ s("table", { className: "w-full border-collapse font-[inherit]", children: [
        /* @__PURE__ */ t("thead", { children: /* @__PURE__ */ s("tr", { children: [
          /* @__PURE__ */ t("th", { className: "text-left px-3 py-2 text-[11px] font-semibold text-text-secondary uppercase tracking-[0.3px] bg-surface-inset border-b border-border", children: "Pipeline" }),
          /* @__PURE__ */ t("th", { className: "text-left px-3 py-2 text-[11px] font-semibold text-text-secondary uppercase tracking-[0.3px] bg-surface-inset border-b border-border", children: "Step" }),
          /* @__PURE__ */ t("th", { className: "text-left px-3 py-2 text-[11px] font-semibold text-text-secondary uppercase tracking-[0.3px] bg-surface-inset border-b border-border", children: "Owner" }),
          /* @__PURE__ */ t("th", { className: "text-right px-3 py-2 text-[11px] font-semibold text-text-secondary uppercase tracking-[0.3px] bg-surface-inset border-b border-border", children: "Elapsed" }),
          r && /* @__PURE__ */ t("th", { className: "text-right px-3 py-2 text-[11px] font-semibold text-text-secondary uppercase tracking-[0.3px] bg-surface-inset border-b border-border" })
        ] }) }),
        /* @__PURE__ */ t("tbody", { children: e.map((a) => /* @__PURE__ */ t(
          Oe,
          {
            run: a,
            onClick: n,
            onCancel: r
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
function Ge(e) {
  const n = Date.parse(e);
  if (Number.isNaN(n)) return e;
  const r = Math.max(0, Math.floor((Date.now() - n) / 1e3));
  if (r < 60) return "just now";
  if (r < 3600) return `${Math.floor(r / 60)}m ago`;
  if (r < 86400) return `${Math.floor(r / 3600)}h ago`;
  const a = Math.floor(r / 86400);
  if (a < 3) return `${a}d ago`;
  try {
    return new Date(n).toLocaleDateString(void 0, {
      month: "short",
      day: "numeric"
    });
  } catch {
    return e;
  }
}
function Ve({
  alert: e,
  onDismiss: n
}) {
  const r = Be[e.severity];
  return /* @__PURE__ */ s(
    "div",
    {
      "data-testid": "alert-item",
      className: b(
        "flex items-start gap-2.5 px-3 py-2.5",
        "bg-surface border border-border border-l-[3px] rounded-md font-[inherit]",
        Ue[e.severity]
      ),
      children: [
        /* @__PURE__ */ t(
          "span",
          {
            "aria-hidden": "true",
            className: b("text-sm leading-5 shrink-0 w-4 text-center", He[e.severity]),
            children: r
          }
        ),
        /* @__PURE__ */ s("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ t("div", { className: "text-[13px] text-text-primary leading-[1.4]", children: e.message }),
          /* @__PURE__ */ s("div", { className: "text-[11px] text-text-tertiary mt-0.5", children: [
            e.category ? `${e.category} · ` : "",
            Ge(e.timestamp)
          ] })
        ] }),
        n && /* @__PURE__ */ t(
          "button",
          {
            "data-testid": "alert-dismiss",
            "aria-label": "dismiss alert",
            onClick: () => n(e.id),
            className: "bg-transparent border-none text-text-tertiary text-base leading-none cursor-pointer px-1.5 py-0.5 font-[inherit] shrink-0",
            children: "×"
          }
        )
      ]
    }
  );
}
function Ke({ alerts: e, onDismiss: n }) {
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
      children: e.map((r) => /* @__PURE__ */ t(Ve, { alert: r, onDismiss: n }, r.id))
    }
  );
}
const U = "—";
function ze(e) {
  return typeof e != "number" || !Number.isFinite(e) ? U : e < 1e3 ? `${Math.round(e)} ms` : `${(e / 1e3).toFixed(1)}s`;
}
function Ye(e) {
  const n = Math.max(0, e.totalNodes ?? 0), r = (a) => Array.from(
    { length: 12 },
    (i, c) => Math.max(0, Math.round(10 + Math.sin(a + c / 2) * 4 + c * 0.3))
  );
  return Array.from({ length: n }, (a, i) => ({
    id: `node-${i}`,
    status: "healthy",
    role: "worker",
    cpu: 10 + i * 4,
    memoryMb: 280 + i * 60,
    connections: 12 + i * 3,
    activeRuns: 0,
    cpuHistory: r(i)
  }));
}
const Z = [];
function We({ source: e }) {
  if (e === null || e === "bridge") return null;
  const n = e === "error";
  return /* @__PURE__ */ t(
    "span",
    {
      "data-testid": "pipeline-metrics-source-pill",
      "data-source": e,
      title: n ? "/api/pipelines/metrics returned an error — values are placeholders" : "No pipeline bridge wired — metrics are synthesized fixture data",
      className: b(
        "inline-block px-2 py-0.5 rounded-sm text-[11px] font-semibold",
        n ? "bg-danger-bg text-state-failed" : "bg-warning-bg text-state-awaiting"
      ),
      children: n ? "metrics error" : "demo data"
    }
  );
}
function Je({
  live: e,
  onChange: n
}) {
  return /* @__PURE__ */ s(
    "button",
    {
      "data-testid": "live-toggle",
      onClick: () => n(!e),
      className: b(
        "inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold",
        "rounded-md cursor-pointer font-[inherit]",
        e ? "bg-surface border border-primary text-primary" : "bg-surface-inset border border-border text-text-secondary"
      ),
      children: [
        /* @__PURE__ */ t(
          "span",
          {
            className: b("w-2 h-2 rounded-full", e ? "bg-success" : "bg-text-tertiary")
          }
        ),
        e ? "Live" : "Paused"
      ]
    }
  );
}
function Xe({
  nodes: e,
  healthyCount: n,
  totalCount: r,
  onSelect: a
}) {
  const i = n === r;
  return /* @__PURE__ */ s("div", { className: "bg-surface border border-border rounded-[10px] p-4 font-[inherit]", children: [
    /* @__PURE__ */ s("div", { className: "flex justify-between items-center mb-3", children: [
      /* @__PURE__ */ t("div", { className: "text-sm font-semibold text-text-primary mb-0 font-[inherit]", children: "Cluster health" }),
      /* @__PURE__ */ s(
        "span",
        {
          "data-testid": "cluster-health-chip",
          className: b(
            "inline-block px-2 py-0.5 rounded-sm text-[11px] font-semibold",
            i ? "bg-success-bg text-state-completed" : "bg-warning-bg text-state-awaiting"
          ),
          children: [
            n,
            "/",
            r,
            " ",
            i ? "✓" : "!"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ t(pe, { nodes: e, onSelect: a })
  ] });
}
function qe({
  events: e,
  onViewAll: n
}) {
  return /* @__PURE__ */ s("div", { className: "bg-surface border border-border rounded-[10px] p-4 font-[inherit]", children: [
    /* @__PURE__ */ s("div", { className: "flex justify-between items-center mb-2", children: [
      /* @__PURE__ */ t("div", { className: "text-sm font-semibold text-text-primary font-[inherit]", children: "Recent events (last 20)" }),
      /* @__PURE__ */ t(
        "button",
        {
          "data-testid": "recent-events-view-all",
          onClick: n,
          className: "bg-transparent border-none text-primary text-xs font-semibold cursor-pointer font-[inherit]",
          children: "▸ view all"
        }
      )
    ] }),
    e.length === 0 ? /* @__PURE__ */ t("div", { className: "p-4 text-center text-text-tertiary text-[13px]", children: "No recent events" }) : /* @__PURE__ */ t("div", { className: "flex flex-col gap-0.5", children: e.slice(0, 20).map((r) => /* @__PURE__ */ t(
      se,
      {
        timestamp: r.timestamp,
        type: r.type,
        summary: r.summary,
        severity: r.severity
      },
      r.id
    )) })
  ] });
}
function er() {
  const e = be(), n = T(null), { live: r, setLive: a, recentEvents: i, activeRunsCount: c, isLiveData: o } = q(), l = Ce() ?? ne, { metrics: d, source: h } = de(), x = l?.overview ?? {}, f = D(() => Ye(x), [x]), E = d?.runsStarted ?? U, R = [0, 0, 0, 0, 0, 0, 0, 0], N = c > 0 ? c : d?.runsActive ?? U, w = d?.runsAwaitingApproval ?? U, C = d?.runsFailed ?? U, L = d?.avgFirstTokenLatencyMs ?? null, p = ze(L), g = Array.isArray(l?.alerts) ? l.alerts : [], y = () => {
    n.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, M = () => {
    e("/pipelines");
  }, P = () => {
    e("/observability/events?filter=errors");
  }, A = ($) => {
    e(`/observability/nodes?selected=${encodeURIComponent($)}`);
  }, m = () => {
    e("/observability/events");
  };
  return /* @__PURE__ */ s(
    "div",
    {
      "data-testid": "observability-dashboard",
      className: "p-6 flex flex-col gap-4 font-sans text-[13px] text-text-primary bg-surface-panel min-h-full",
      children: [
        /* @__PURE__ */ s("div", { className: "flex justify-between items-center", children: [
          /* @__PURE__ */ t("h1", { className: "text-lg font-bold text-text-primary m-0 leading-[1.3]", children: "Dashboard" }),
          /* @__PURE__ */ s("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ t(
              "span",
              {
                "data-testid": "dashboard-data-source",
                title: o ? "Connected to /api/observability/dashboard" : "Backend unreachable — using fixture data",
                className: b(
                  "text-[11px] font-semibold",
                  o ? "text-state-completed" : "text-text-tertiary"
                ),
                children: o ? "live data" : "fixture"
              }
            ),
            /* @__PURE__ */ t(We, { source: h }),
            /* @__PURE__ */ t(Je, { live: r, onChange: a })
          ] })
        ] }),
        /* @__PURE__ */ t(
          $e,
          {
            runsToday: E,
            runsSparkline: R,
            activeNow: N,
            pendingApprovals: w,
            failed24h: C,
            avgFirstTokenLatency: p,
            onScrollToActive: y,
            onGoToPipelines: M,
            onGoToFailedEvents: P
          }
        ),
        /* @__PURE__ */ t(
          Xe,
          {
            nodes: f,
            healthyCount: x.healthyNodes ?? 0,
            totalCount: x.totalNodes ?? 0,
            onSelect: A
          }
        ),
        /* @__PURE__ */ s("div", { ref: n, children: [
          /* @__PURE__ */ s("div", { className: "text-sm font-semibold text-text-primary mb-2 font-[inherit]", children: [
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
            events: i,
            onViewAll: m
          }
        ),
        /* @__PURE__ */ s("div", { children: [
          /* @__PURE__ */ s("div", { className: "text-sm font-semibold text-text-primary mb-2 font-[inherit]", children: [
            "Alerts (",
            g.length,
            ")"
          ] }),
          /* @__PURE__ */ t(Ke, { alerts: g })
        ] })
      ]
    }
  );
}
function Qe(e = 60) {
  const { dashboard: n } = q(), [r, a] = v([]);
  return O(() => {
    n && a((i) => [...i, n].slice(-e));
  }, [n, e]), r;
}
const Ze = "", et = 1e4;
function tt() {
  const [e, n] = v(null), [r, a] = v(!0), [i, c] = v(null), o = T(!1), u = X(async () => {
    try {
      const l = await fetch(`${Ze}/api/pipelines/dashboard-data`, {
        credentials: "same-origin"
      });
      if (!l.ok) {
        const x = (await l.json().catch(() => null))?.error ?? `HTTP ${l.status}`;
        o.current || c(x);
        return;
      }
      const d = await l.json();
      o.current || (n(d), c(null));
    } catch (l) {
      const d = l instanceof Error ? l.message : String(l);
      o.current || c(d);
    } finally {
      o.current || a(!1);
    }
  }, []);
  return O(() => {
    o.current = !1, u();
    const l = window.setInterval(() => {
      document.hidden || u();
    }, et);
    return () => {
      o.current = !0, window.clearInterval(l);
    };
  }, [u]), { data: e, loading: r, error: i, refresh: u };
}
function I({ title: e, timeRange: n, children: r, onMaximize: a }) {
  return /* @__PURE__ */ s(
    "div",
    {
      "data-testid": "metric-card",
      className: b(
        "bg-surface border border-border rounded-[10px] p-4",
        "flex flex-col gap-2.5 font-[inherit]"
      ),
      children: [
        /* @__PURE__ */ s("div", { className: "flex items-center justify-between gap-2", children: [
          /* @__PURE__ */ t(
            "div",
            {
              className: "text-[13px] font-semibold text-text-primary overflow-hidden text-ellipsis whitespace-nowrap",
              title: e,
              children: e
            }
          ),
          /* @__PURE__ */ s("div", { className: "flex items-center gap-1.5", children: [
            n && /* @__PURE__ */ t("span", { className: "inline-block px-2 py-0.5 rounded-sm text-[11px] font-semibold bg-surface-hover text-text-secondary leading-[1.4] whitespace-nowrap", children: n }),
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
        /* @__PURE__ */ t("div", { className: "flex-1", children: r })
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
  liveSeries: n,
  cols: r,
  isLiveData: a,
  failedColor: i,
  onResetZoom: c,
  onExportCsv: o
}) {
  const [u, l] = v("1h"), [d, h] = v("30s"), x = ee.find((f) => f.value === u)?.label ?? "";
  return /* @__PURE__ */ s(J, { children: [
    /* @__PURE__ */ s("div", { className: "flex items-center gap-3 px-4 py-2.5 border-b border-border bg-surface-panel", children: [
      /* @__PURE__ */ t(
        Y,
        {
          "data-testid": "metrics-time-range",
          "aria-label": "Time range",
          value: u,
          onChange: (f) => l(f.target.value),
          className: "w-auto min-w-[120px]",
          options: ee.map((f) => ({ value: f.value, label: f.label }))
        }
      ),
      /* @__PURE__ */ t(
        Y,
        {
          "data-testid": "metrics-refresh-interval",
          "aria-label": "Refresh interval",
          value: d,
          onChange: (f) => h(f.target.value),
          className: "w-auto min-w-[100px]",
          options: rt.map((f) => ({ value: f.value, label: `Refresh: ${f.label}` }))
        }
      ),
      c && /* @__PURE__ */ t(
        "button",
        {
          "data-testid": "metrics-reset-zoom",
          onClick: c,
          className: "px-3 py-1.5 text-[13px] bg-transparent border-none text-text-secondary cursor-pointer font-[inherit] shrink-0",
          children: "Reset zoom"
        }
      ),
      o && /* @__PURE__ */ t(
        "button",
        {
          "data-testid": "metrics-export-csv",
          onClick: o,
          className: "px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-white border-none rounded-md cursor-pointer font-[inherit] shrink-0",
          children: "Export CSV"
        }
      ),
      /* @__PURE__ */ s(
        "div",
        {
          "data-testid": "metrics-data-source",
          className: "ml-auto flex items-center gap-3 text-[11px] text-text-tertiary",
          children: [
            /* @__PURE__ */ t(
              "span",
              {
                title: a ? "Connected to /api/pipelines/metrics" : "Backend unreachable — using seeded fixture",
                className: b(
                  "font-semibold",
                  a ? "text-state-completed" : "text-text-tertiary"
                ),
                children: a ? "live" : "fixture"
              }
            ),
            /* @__PURE__ */ s("span", { children: [
              r,
              " column",
              r === 1 ? "" : "s"
            ] })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ s(
      "div",
      {
        className: "gap-4 p-4 overflow-y-auto flex-1 grid",
        style: { gridTemplateColumns: `repeat(${r}, minmax(0, 1fr))` },
        children: [
          /* @__PURE__ */ t(I, { title: "Runs per minute", timeRange: x, children: /* @__PURE__ */ t(
            ve,
            {
              series: n?.runsPerMinute ?? e.runsPerMinute,
              height: 180
            }
          ) }),
          /* @__PURE__ */ t(I, { title: "Step duration (p50/p95/p99)", timeRange: x, children: /* @__PURE__ */ t(
            _,
            {
              series: e.stepDuration,
              height: 180,
              yFormat: (f) => `${Math.round(f)}ms`
            }
          ) }),
          /* @__PURE__ */ t(I, { title: "LLM tokens", timeRange: x, children: /* @__PURE__ */ t(
            _,
            {
              series: n?.llmTokens ?? e.llmTokens,
              height: 180
            }
          ) }),
          /* @__PURE__ */ t(I, { title: "LLM cost", timeRange: x, children: /* @__PURE__ */ t(
            _,
            {
              series: n?.llmCost ?? e.llmCost,
              height: 180,
              yFormat: (f) => `$${f.toFixed(2)}`
            }
          ) }),
          /* @__PURE__ */ t(I, { title: "Cluster CPU", timeRange: x, children: /* @__PURE__ */ t(
            _,
            {
              series: e.clusterCpu,
              height: 180,
              yFormat: (f) => `${Math.round(f)}%`
            }
          ) }),
          /* @__PURE__ */ t(I, { title: "Cluster memory", timeRange: x, children: /* @__PURE__ */ t(
            _,
            {
              series: e.clusterMemory,
              height: 180,
              yFormat: (f) => `${Math.round(f)}MB`
            }
          ) }),
          /* @__PURE__ */ t(I, { title: "Event rate", timeRange: x, children: /* @__PURE__ */ t(_, { series: e.eventRate, height: 180 }) }),
          /* @__PURE__ */ t(I, { title: "Active runs over time", timeRange: x, children: /* @__PURE__ */ t(
            _,
            {
              series: n?.activeRuns ?? e.activeRuns,
              height: 180
            }
          ) }),
          /* @__PURE__ */ t(I, { title: "Failure rate by type", timeRange: x, children: /* @__PURE__ */ t(
            ye,
            {
              data: e.failureRate,
              xKey: "x",
              yKey: "total",
              color: i,
              height: 180
            }
          ) }),
          /* @__PURE__ */ t(I, { title: "Approval latency", timeRange: x, children: /* @__PURE__ */ t(
            _,
            {
              series: e.approvalLatency,
              height: 180,
              yFormat: (f) => `${Math.round(f)}s`
            }
          ) })
        ]
      }
    )
  ] });
}
function k(e, n = 30, r = 60) {
  const a = [];
  let i = e;
  for (let c = 0; c < n; c++)
    i = (i * 9301 + 49297) % 233280, a.push(Math.abs(i % r));
  return a;
}
function S(e, n, r) {
  return {
    label: e,
    color: r,
    data: n.map((a, i) => ({ x: i, y: a }))
  };
}
const F = {
  primary: "var(--color-primary)",
  completed: "var(--color-success)",
  failed: "var(--color-danger)"
};
function at() {
  return {
    runsPerMinute: [
      S("started", k(3, 30, 40), F.primary),
      S("completed", k(7, 30, 40), F.completed),
      S("failed", k(11, 30, 20), F.failed)
    ],
    stepDuration: [
      S("p50", k(17, 30, 400)),
      S("p95", k(23, 30, 800)),
      S("p99", k(29, 30, 1200))
    ],
    llmTokens: [
      S("input", k(31, 30, 2e3)),
      S("output", k(37, 30, 1e3))
    ],
    llmCost: [S("USD", k(41, 30, 5))],
    clusterCpu: [
      S("node-0", k(43, 30, 40)),
      S("node-1", k(47, 30, 40)),
      S("node-2", k(53, 30, 40))
    ],
    clusterMemory: [
      S("node-0", k(59, 30, 512)),
      S("node-1", k(61, 30, 512)),
      S("node-2", k(67, 30, 512))
    ],
    eventRate: [S("events/s", k(71, 30, 20))],
    activeRuns: [S("active", k(73, 30, 10))],
    // Failure-rate-by-type is rendered as a bar chart and needs row-shaped data.
    failureRate: (() => {
      const e = k(79, 30, 15), n = k(83, 30, 15), r = k(89, 30, 15);
      return e.map((a, i) => ({
        x: i,
        llm: e[i],
        http: n[i],
        transform: r[i],
        // For a single-series bar view we expose a `total` field too.
        total: e[i] + n[i] + r[i]
      }));
    })(),
    approvalLatency: [S("seconds", k(97, 30, 120))]
  };
}
function st() {
  const [e, n] = v(() => typeof window > "u" ? 2 : window.innerWidth >= 1600 ? 3 : 2);
  return O(() => {
    if (typeof window > "u") return;
    const r = () => {
      n(window.innerWidth >= 1600 ? 3 : 2);
    };
    return window.addEventListener("resize", r), () => window.removeEventListener("resize", r);
  }, []), e;
}
function it() {
  const { data: e, loading: n, error: r } = tt();
  return n && !e ? /* @__PURE__ */ t(
    "div",
    {
      "data-testid": "modules-section-loading",
      className: "flex flex-col gap-2 px-4 py-3 bg-surface border border-border rounded-[10px] mb-4",
      children: /* @__PURE__ */ t("span", { className: "text-[11px] font-semibold text-text-tertiary uppercase tracking-[0.5px]", children: "Loading active modules…" })
    }
  ) : e ? /* @__PURE__ */ s(
    "div",
    {
      "data-testid": "modules-section",
      className: "flex flex-col gap-2 px-4 py-3 bg-surface border border-border rounded-[10px] mb-4",
      children: [
        /* @__PURE__ */ s("div", { className: "flex items-baseline gap-3", children: [
          /* @__PURE__ */ t("span", { className: "text-sm font-bold text-text-primary", children: e.moduleName }),
          /* @__PURE__ */ s("span", { className: "text-[11px] font-semibold text-text-tertiary uppercase tracking-[0.5px]", children: [
            e.source,
            " · ",
            e.state
          ] })
        ] }),
        /* @__PURE__ */ s("div", { className: "flex gap-4 flex-wrap", children: [
          /* @__PURE__ */ s("div", { className: "flex flex-col gap-0.5 min-w-[110px]", children: [
            /* @__PURE__ */ t("span", { className: "text-[11px] text-text-tertiary", children: "Total" }),
            /* @__PURE__ */ t("span", { className: "text-lg font-bold text-text-primary", children: e.summary.totalResources })
          ] }),
          /* @__PURE__ */ s("div", { className: "flex flex-col gap-0.5 min-w-[110px]", children: [
            /* @__PURE__ */ t("span", { className: "text-[11px] text-text-tertiary", children: "Healthy" }),
            /* @__PURE__ */ t("span", { className: "text-lg font-bold text-text-primary", children: e.summary.healthyResources })
          ] }),
          /* @__PURE__ */ s("div", { className: "flex flex-col gap-0.5 min-w-[110px]", children: [
            /* @__PURE__ */ t("span", { className: "text-[11px] text-text-tertiary", children: "Active" }),
            /* @__PURE__ */ t("span", { className: "text-lg font-bold text-text-primary", children: e.summary.activeConnections })
          ] }),
          /* @__PURE__ */ s("div", { className: "flex flex-col gap-0.5 min-w-[110px]", children: [
            /* @__PURE__ */ t("span", { className: "text-[11px] text-text-tertiary", children: "Throughput" }),
            /* @__PURE__ */ t("span", { className: "text-lg font-bold text-text-primary", children: e.summary.throughput })
          ] })
        ] }),
        e.alerts && e.alerts.length > 0 ? /* @__PURE__ */ t("div", { "data-testid": "modules-section-alerts", className: "flex flex-col gap-1", children: e.alerts.map((a, i) => /* @__PURE__ */ s(
          "div",
          {
            className: b(
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
          i
        )) }) : null
      ]
    }
  ) : /* @__PURE__ */ t(
    "div",
    {
      "data-testid": "modules-section-error",
      className: "flex flex-col gap-2 px-4 py-3 bg-surface border border-border rounded-[10px] mb-4",
      children: /* @__PURE__ */ s("span", { className: "text-[11px] font-semibold text-text-tertiary uppercase tracking-[0.5px]", children: [
        "Active modules unavailable",
        r ? `: ${r}` : ""
      ] })
    }
  );
}
function tr() {
  const e = D(at, []), n = st();
  Qe(60);
  const { metrics: r, isLiveData: a } = de(), [i, c] = v([]);
  O(() => {
    r && c((u) => [...u, r].slice(-30));
  }, [r]);
  const o = D(() => {
    if (i.length < 2) return null;
    const u = (w) => {
      const C = [];
      return i.forEach((L, p) => {
        const g = L[w];
        typeof g == "number" && Number.isFinite(g) && C.push({ x: p, y: g });
      }), C;
    }, l = (w) => w.length >= 2, d = u("runsActive"), h = u("llmTokensIn"), x = u("llmTokensOut"), f = u("estimatedCostUsd"), E = u("runsStarted"), R = u("runsCompleted"), N = u("runsFailed");
    return {
      activeRuns: l(d) ? [{ label: "active", data: d }] : null,
      llmTokens: l(h) && l(x) ? [
        { label: "input", data: h },
        { label: "output", data: x }
      ] : null,
      llmCost: l(f) ? [{ label: "USD", data: f }] : null,
      runsPerMinute: l(E) && l(R) && l(N) ? [
        { label: "started", color: F.primary, data: E },
        { label: "completed", color: F.completed, data: R },
        { label: "failed", color: F.failed, data: N }
      ] : null
    };
  }, [i]);
  return /* @__PURE__ */ s(
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
            cols: n,
            isLiveData: a,
            failedColor: F.failed
          }
        ),
        /* @__PURE__ */ t(it, {})
      ]
    }
  );
}
function ot({ events: e, selectedId: n, onSelect: r, live: a = !1 }) {
  const i = T(null), [c, o] = v(!1);
  O(() => {
    if (!a || c) return;
    const d = i.current;
    d && (d.scrollTop = d.scrollHeight);
  }, [e, a, c]);
  const u = () => {
    const d = i.current;
    if (!d) return;
    const h = d.scrollHeight - d.scrollTop - d.clientHeight < 24;
    o(!h);
  }, l = () => {
    const d = i.current;
    d && (d.scrollTop = d.scrollHeight, o(!1));
  };
  return e.length === 0 ? /* @__PURE__ */ t("div", { className: "flex-1 flex", children: /* @__PURE__ */ t(
    we,
    {
      icon: "📡",
      title: "No events yet",
      body: "Trigger a pipeline to see activity here."
    }
  ) }) : /* @__PURE__ */ s(
    "div",
    {
      "data-testid": "event-timeline",
      className: "relative flex-1 min-h-0 flex",
      children: [
        /* @__PURE__ */ t(
          "div",
          {
            ref: i,
            onScroll: u,
            className: "flex-1 overflow-y-auto py-1.5 font-[inherit]",
            children: e.map((d) => /* @__PURE__ */ t(
              se,
              {
                timestamp: d.timestamp,
                type: d.type,
                summary: d.summary,
                severity: d.severity,
                selected: d.id === n,
                onClick: r ? () => r(d.id) : void 0
              },
              d.id
            ))
          }
        ),
        a && c && /* @__PURE__ */ t(
          "button",
          {
            "data-testid": "jump-to-live",
            onClick: l,
            className: b(
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
        className: b(
          "flex items-center justify-center h-full text-[13px] text-text-tertiary",
          "p-6 text-center font-[inherit]"
        ),
        children: "Select an event to see details"
      }
    );
  const n = lt(e.payload ?? e), r = () => {
    typeof navigator < "u" && navigator.clipboard && navigator.clipboard.writeText(n).catch(() => {
      console.warn("[EventDetailPane] clipboard copy failed");
    });
  }, a = () => {
    if (typeof window > "u") return;
    const i = new Blob([n], { type: "application/json" }), c = URL.createObjectURL(i), o = document.createElement("a");
    o.href = c, o.download = `${e.type}-${e.id}.json`, document.body.appendChild(o), o.click(), document.body.removeChild(o), URL.revokeObjectURL(c);
  };
  return /* @__PURE__ */ s(
    "div",
    {
      "data-testid": "event-detail-pane",
      className: "flex flex-col h-full font-[inherit] bg-surface",
      children: [
        /* @__PURE__ */ s("div", { className: "px-3.5 py-3 border-b border-border flex flex-col gap-1", children: [
          /* @__PURE__ */ t("div", { className: "text-[13px] font-semibold text-text-primary", children: e.type }),
          /* @__PURE__ */ t("div", { className: "text-[11px] text-text-tertiary", children: e.timestamp })
        ] }),
        /* @__PURE__ */ s("div", { className: "px-3.5 py-2.5 flex gap-2 border-b border-border", children: [
          /* @__PURE__ */ t(
            "button",
            {
              "data-testid": "event-detail-copy",
              onClick: r,
              className: b(
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
              className: b(
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
            className: b(
              "m-0 px-3.5 py-3 flex-1 overflow-auto",
              "bg-surface-inset font-mono text-xs text-text-primary",
              "leading-normal whitespace-pre [tab-size:2]"
            ),
            children: n
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
function mt(e, n) {
  if (n && typeof n == "object") {
    const r = n, a = [];
    if (typeof r.runId == "string" && a.push(`run ${r.runId}`), typeof r.pipelineId == "string" && a.push(`pipeline ${r.pipelineId}`), typeof r.nodeId == "string" && a.push(`node ${r.nodeId}`), a.length > 0) return a.join(" · ");
  }
  return e;
}
function ft(e = /* @__PURE__ */ new Date()) {
  const n = String(e.getHours()).padStart(2, "0"), r = String(e.getMinutes()).padStart(2, "0"), a = String(e.getSeconds()).padStart(2, "0"), i = String(e.getMilliseconds()).padStart(3, "0");
  return `${n}:${r}:${a}.${i}`;
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
  const [e, n] = v([]), [r, a] = v(null), [i, c] = v(!1), [o, u] = v(re), [l, d] = v(!1), h = T(i);
  h.current = i;
  const x = T(0), f = X((p) => {
    if (h.current) return;
    const g = p, y = g?.eventType ?? "unknown", M = g?.payload ?? g;
    x.current += 1;
    const P = {
      id: `ev-${Date.now()}-${x.current}`,
      timestamp: ft(),
      type: y,
      summary: mt(y, M),
      severity: ut(y),
      payload: M
    };
    n((A) => {
      const m = [...A, P];
      return m.length > te ? m.slice(m.length - te) : m;
    });
  }, []);
  Ne("*", f);
  const E = D(() => {
    const p = o.runIds.split(",").map((M) => M.trim()).filter(Boolean), g = o.pipelineIds.split(",").map((M) => M.trim()).filter(Boolean), y = o.groups.has("All");
    return e.filter((M) => {
      if (!y) {
        const A = xt(M.type);
        if (!o.groups.has(A)) return !1;
      }
      if (M.severity && !o.severities.has(M.severity)) return !1;
      if (p.length > 0) {
        const A = M.payload?.runId;
        if (!A || !p.some((m) => A.includes(m))) return !1;
      }
      if (g.length > 0) {
        const A = M.payload?.pipelineId;
        if (!A || !g.some((m) => A.includes(m))) return !1;
      }
      const P = M.payload?.nodeId;
      return !(P && !o.nodes.has(P));
    });
  }, [e, o]), R = D(
    () => E.find((p) => p.id === r) ?? null,
    [E, r]
  ), N = (p) => {
    u((g) => {
      const y = new Set(g.groups);
      return y.has(p) ? y.delete(p) : y.add(p), { ...g, groups: y };
    });
  }, w = (p) => {
    u((g) => {
      const y = new Set(g.nodes);
      return y.has(p) ? y.delete(p) : y.add(p), { ...g, nodes: y };
    });
  }, C = (p) => {
    u((g) => {
      const y = new Set(g.severities);
      return y.has(p) ? y.delete(p) : y.add(p), { ...g, severities: y };
    });
  }, L = () => u(re);
  return /* @__PURE__ */ s(
    "div",
    {
      "data-testid": "events-page",
      className: "flex flex-col h-full min-h-0 font-[inherit] text-[13px] text-text-primary bg-surface",
      children: [
        /* @__PURE__ */ s("div", { className: "flex items-center gap-3 px-4 py-2.5 border-b border-border bg-surface-panel", children: [
          /* @__PURE__ */ t(
            "button",
            {
              onClick: () => c((p) => !p),
              "data-testid": "events-live-toggle",
              className: b(
                "px-3 py-[5px] text-xs font-semibold rounded-md cursor-pointer font-[inherit]",
                i ? "bg-surface-hover text-text-secondary border border-border" : "bg-state-completed text-white border border-state-completed"
              ),
              children: i ? "■ Paused" : "● Live"
            }
          ),
          /* @__PURE__ */ t(
            Y,
            {
              "data-testid": "events-time-range",
              "aria-label": "Time range",
              value: o.timeRange,
              onChange: (p) => u((g) => ({ ...g, timeRange: p.target.value })),
              className: "w-auto min-w-[120px]",
              options: pt.map((p) => ({ value: p.value, label: p.label }))
            }
          ),
          /* @__PURE__ */ s("div", { className: "ml-auto text-xs text-text-tertiary", children: [
            E.length,
            " / ",
            e.length,
            " event",
            e.length === 1 ? "" : "s"
          ] })
        ] }),
        /* @__PURE__ */ s("div", { className: "flex flex-1 min-h-0", children: [
          /* @__PURE__ */ s(
            "aside",
            {
              "data-testid": "events-filter-rail",
              className: b(
                "shrink-0 border-r border-border bg-surface-panel overflow-y-auto transition-[width] duration-150 ease-in-out",
                l ? "w-9" : "w-60"
              ),
              children: [
                /* @__PURE__ */ s("div", { className: "flex items-center justify-between px-3.5 py-2.5 border-b border-border", children: [
                  !l && /* @__PURE__ */ t("div", { className: "text-[11px] font-bold tracking-[0.3px] text-text-secondary", children: "FILTERS" }),
                  /* @__PURE__ */ t(
                    "button",
                    {
                      onClick: () => d((p) => !p),
                      "aria-label": l ? "Expand filters" : "Collapse filters",
                      className: "border-none bg-transparent text-text-tertiary cursor-pointer text-xs p-0.5 font-[inherit]",
                      children: l ? "›" : "‹"
                    }
                  )
                ] }),
                !l && /* @__PURE__ */ s(J, { children: [
                  /* @__PURE__ */ s("div", { className: "flex flex-col gap-1.5 px-3.5 py-3 border-b border-border", children: [
                    /* @__PURE__ */ t("div", { className: "text-[11px] font-bold tracking-[0.3px] text-text-secondary uppercase", children: "Event type" }),
                    dt.map((p) => /* @__PURE__ */ s(
                      "label",
                      {
                        className: "flex items-center gap-1.5 text-xs",
                        children: [
                          /* @__PURE__ */ t(
                            G,
                            {
                              checked: o.groups.has(p),
                              onChange: () => N(p)
                            }
                          ),
                          p
                        ]
                      },
                      p
                    ))
                  ] }),
                  /* @__PURE__ */ s("div", { className: "flex flex-col gap-1.5 px-3.5 py-3 border-b border-border", children: [
                    /* @__PURE__ */ t("div", { className: "text-[11px] font-bold tracking-[0.3px] text-text-secondary uppercase", children: "Runs" }),
                    /* @__PURE__ */ t(
                      z,
                      {
                        "data-testid": "events-filter-runs",
                        placeholder: "runId (comma-separated)",
                        value: o.runIds,
                        onChange: (p) => u((g) => ({ ...g, runIds: p.target.value })),
                        className: "flex-1 min-w-[120px]"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ s("div", { className: "flex flex-col gap-1.5 px-3.5 py-3 border-b border-border", children: [
                    /* @__PURE__ */ t("div", { className: "text-[11px] font-bold tracking-[0.3px] text-text-secondary uppercase", children: "Pipelines" }),
                    /* @__PURE__ */ t(
                      z,
                      {
                        "data-testid": "events-filter-pipelines",
                        placeholder: "pipelineId (comma-separated)",
                        value: o.pipelineIds,
                        onChange: (p) => u((g) => ({ ...g, pipelineIds: p.target.value })),
                        className: "flex-1 min-w-[120px]"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ s("div", { className: "flex flex-col gap-1.5 px-3.5 py-3 border-b border-border", children: [
                    /* @__PURE__ */ t("div", { className: "text-[11px] font-bold tracking-[0.3px] text-text-secondary uppercase", children: "Nodes" }),
                    ue.map((p) => /* @__PURE__ */ s(
                      "label",
                      {
                        className: "flex items-center gap-1.5 text-xs",
                        children: [
                          /* @__PURE__ */ t(
                            G,
                            {
                              checked: o.nodes.has(p),
                              onChange: () => w(p)
                            }
                          ),
                          p
                        ]
                      },
                      p
                    ))
                  ] }),
                  /* @__PURE__ */ s("div", { className: "flex flex-col gap-1.5 px-3.5 py-3 border-b border-border", children: [
                    /* @__PURE__ */ t("div", { className: "text-[11px] font-bold tracking-[0.3px] text-text-secondary uppercase", children: "Severity" }),
                    xe.map((p) => /* @__PURE__ */ s(
                      "label",
                      {
                        className: "flex items-center gap-1.5 text-xs",
                        children: [
                          /* @__PURE__ */ t(
                            G,
                            {
                              checked: o.severities.has(p),
                              onChange: () => C(p)
                            }
                          ),
                          p
                        ]
                      },
                      p
                    ))
                  ] }),
                  /* @__PURE__ */ t("div", { className: "px-3.5 py-3", children: /* @__PURE__ */ t(
                    "button",
                    {
                      "data-testid": "events-clear-filters",
                      onClick: L,
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
              events: E,
              selectedId: r,
              onSelect: a,
              live: !i
            }
          ) }),
          /* @__PURE__ */ t("aside", { className: "w-80 shrink-0 border-l border-border bg-surface", children: /* @__PURE__ */ t(ct, { event: R }) })
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
let V = { ...me };
const W = /* @__PURE__ */ new Set();
function bt() {
  return V;
}
function j(e) {
  V = { ...V, ...e }, W.forEach((n) => {
    try {
      n(V);
    } catch (r) {
      console.error("[chaosState] listener threw", r);
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
    onInjectLatency: n = (m) => j({ injectedLatencyMs: Math.max(0, m) }),
    onInjectPartition: r = (m) => (
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
    onKillAll: i = () => j({ paused: !0 }),
    onReset: c = () => gt(),
    availableNodes: o = yt
  } = e, [u, l] = v("0"), [d, h] = v("0"), [x, f] = v([]), [E, R] = v(!1), [N, w] = v(() => bt());
  O(() => vt((m) => w(m)), []);
  const C = (m) => {
    f(
      ($) => $.includes(m) ? $.filter((fe) => fe !== m) : [...$, m]
    );
  }, L = () => {
    const m = Number.parseInt(u, 10);
    Number.isFinite(m) && n(m);
  }, p = () => {
    const m = Number.parseInt(d, 10);
    Number.isFinite(m) && a(m);
  }, g = () => {
    r(x);
  }, y = () => {
    i(), R(!1);
  }, M = () => {
    j({ paused: !N.paused });
  }, P = D(() => o, [o]), A = N.injectedLatencyMs > 0 || N.injectedFailureRate > 0 || N.paused;
  return /* @__PURE__ */ s(
    "div",
    {
      "data-testid": "chaos-panel",
      className: "w-60 shrink-0 p-4 bg-surface-panel border-r border-border font-[inherit] text-[13px] text-text-primary overflow-y-auto",
      children: [
        /* @__PURE__ */ t("div", { className: "text-[11px] font-bold text-text-secondary tracking-[0.4px] mb-3", children: "CHAOS" }),
        /* @__PURE__ */ s(
          "div",
          {
            "data-testid": "chaos-state-readout",
            className: b(
              "flex flex-col gap-1.5 pb-3 mb-3 border-b border-border",
              A && "bg-warning-bg p-2 rounded-md border border-warning-border"
            ),
            children: [
              /* @__PURE__ */ t("div", { className: "text-[11px] font-semibold text-text-secondary uppercase tracking-[0.3px]", children: "Current state" }),
              /* @__PURE__ */ s("div", { className: "text-xs text-text-primary leading-relaxed", children: [
                /* @__PURE__ */ s("div", { children: [
                  /* @__PURE__ */ t("span", { className: "text-text-tertiary", children: "Latency:" }),
                  " ",
                  /* @__PURE__ */ t("strong", { "data-testid": "chaos-state-latency", children: N.injectedLatencyMs }),
                  " ms"
                ] }),
                /* @__PURE__ */ s("div", { children: [
                  /* @__PURE__ */ t("span", { className: "text-text-tertiary", children: "Failure rate:" }),
                  " ",
                  /* @__PURE__ */ t("strong", { "data-testid": "chaos-state-failure", children: Math.round(N.injectedFailureRate * 100) }),
                  "%"
                ] }),
                /* @__PURE__ */ s("div", { children: [
                  /* @__PURE__ */ t("span", { className: "text-text-tertiary", children: "Paused:" }),
                  " ",
                  /* @__PURE__ */ t("strong", { "data-testid": "chaos-state-paused", children: N.paused ? "yes" : "no" })
                ] })
              ] }),
              /* @__PURE__ */ t(
                "button",
                {
                  "data-testid": "chaos-pause-toggle",
                  onClick: M,
                  className: "px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-white border-none rounded-md cursor-pointer font-[inherit] shrink-0",
                  children: N.paused ? "Resume" : "Pause"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ s("div", { className: "flex flex-col gap-1.5 pb-3 mb-3 border-b border-border", children: [
          /* @__PURE__ */ t("div", { className: "text-[11px] font-semibold text-text-secondary uppercase tracking-[0.3px]", children: "Latency" }),
          /* @__PURE__ */ s("div", { className: "flex gap-1.5", children: [
            /* @__PURE__ */ t(
              z,
              {
                "data-testid": "chaos-latency-input",
                type: "number",
                min: 0,
                value: u,
                onChange: (m) => l(m.target.value),
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
              onClick: L,
              className: "px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-white border-none rounded-md cursor-pointer font-[inherit] shrink-0",
              children: "Apply"
            }
          )
        ] }),
        /* @__PURE__ */ s("div", { className: "flex flex-col gap-1.5 pb-3 mb-3 border-b border-border", children: [
          /* @__PURE__ */ t("div", { className: "text-[11px] font-semibold text-text-secondary uppercase tracking-[0.3px]", children: "Partition nodes" }),
          /* @__PURE__ */ t("div", { className: "flex flex-col gap-1", children: P.map((m) => /* @__PURE__ */ s(
            "label",
            {
              className: "flex items-center gap-1.5 text-xs text-text-primary cursor-pointer",
              children: [
                /* @__PURE__ */ t(
                  G,
                  {
                    checked: x.includes(m.id),
                    onChange: () => C(m.id)
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
              onClick: g,
              className: b(
                "px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-white border-none rounded-md font-[inherit] shrink-0",
                x.length === 0 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
              ),
              disabled: x.length === 0,
              children: "Inject"
            }
          )
        ] }),
        /* @__PURE__ */ s("div", { className: "flex flex-col gap-1.5 pb-3 mb-3 border-b border-border", children: [
          /* @__PURE__ */ t("div", { className: "text-[11px] font-semibold text-text-secondary uppercase tracking-[0.3px]", children: "Drop messages" }),
          /* @__PURE__ */ s("div", { className: "flex gap-1.5", children: [
            /* @__PURE__ */ t(
              z,
              {
                "data-testid": "chaos-drop-input",
                type: "number",
                min: 0,
                max: 100,
                value: d,
                onChange: (m) => h(m.target.value),
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
              onClick: p,
              className: "px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-white border-none rounded-md cursor-pointer font-[inherit] shrink-0",
              children: "Apply"
            }
          )
        ] }),
        /* @__PURE__ */ s("div", { className: "flex flex-col gap-2", children: [
          /* @__PURE__ */ t(
            "button",
            {
              "data-testid": "chaos-kill-all",
              onClick: () => R(!0),
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
            open: E,
            onClose: () => R(!1),
            title: "Kill all nodes?",
            footer: /* @__PURE__ */ s(J, { children: [
              /* @__PURE__ */ t(
                "button",
                {
                  "data-testid": "chaos-kill-cancel",
                  onClick: () => R(!1),
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
function K(e) {
  const n = [];
  let r = e;
  for (let a = 0; a < 24; a++)
    r = (r * 9301 + 49297) % 233280, n.push(Math.abs(r % 40) + 5);
  return n;
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
  const e = ne?.regions ?? {}, n = [];
  for (const r of Object.keys(e)) {
    const a = e[r];
    if (a?.nodes && Array.isArray(a.nodes))
      for (const i of a.nodes)
        n.push({
          id: i.id ?? `node-${n.length}`,
          status: i.status ?? "healthy",
          role: i.role ?? "worker",
          region: r,
          cpu: i.cpu ?? 0,
          memoryMb: i.memoryMb ?? 0,
          connections: i.connections ?? 0,
          activeRuns: i.activeRuns ?? 0,
          cpuHistory: i.cpuHistory ?? K(n.length + 1)
        });
  }
  return n.length > 0 ? n : wt();
}
function Ct(e) {
  return e >= 1024 ? `${(e / 1024).toFixed(1)}G` : `${Math.round(e)}M`;
}
function nr({
  nodes: e,
  onAddLatency: n,
  onKillNode: r,
  onTransferResource: a
} = {}) {
  const i = D(kt, []), c = e ?? i, [o, u] = v(null), l = D(
    () => c.find((d) => d.id === o) ?? null,
    [c, o]
  );
  return /* @__PURE__ */ s(
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
                availableNodes: c.map((d) => ({ id: d.id, label: d.id }))
              }
            )
          }
        ),
        /* @__PURE__ */ t("section", { className: "flex-1 min-w-0 overflow-auto p-6", children: /* @__PURE__ */ t(
          pe,
          {
            nodes: c,
            selectedId: o ?? void 0,
            onSelect: (d) => u(d === o ? null : d)
          }
        ) }),
        l && /* @__PURE__ */ s(
          "aside",
          {
            "data-testid": "nodes-detail-drawer",
            className: "w-80 shrink-0 border-l border-border bg-surface flex flex-col overflow-y-auto",
            children: [
              /* @__PURE__ */ s("div", { className: "px-3.5 py-3 border-b border-border flex items-center justify-between", children: [
                /* @__PURE__ */ s("div", { className: "flex flex-col", children: [
                  /* @__PURE__ */ t("div", { className: "text-[13px] font-semibold", children: l.id }),
                  /* @__PURE__ */ t("div", { className: "text-[11px] text-text-tertiary", children: [l.role, l.region].filter(Boolean).join(" · ") || "worker" })
                ] }),
                /* @__PURE__ */ t(
                  "button",
                  {
                    "data-testid": "nodes-detail-close",
                    onClick: () => u(null),
                    "aria-label": "Close drawer",
                    className: "border-none bg-transparent text-text-tertiary cursor-pointer text-base p-0.5 font-[inherit]",
                    children: "×"
                  }
                )
              ] }),
              /* @__PURE__ */ s("div", { className: "px-3.5 py-3 border-b border-border flex flex-col gap-2", children: [
                /* @__PURE__ */ t("div", { className: "text-[11px] font-bold tracking-[0.3px] text-text-secondary uppercase", children: "Metrics" }),
                /* @__PURE__ */ t("table", { className: "w-full text-xs border-collapse", children: /* @__PURE__ */ t("tbody", { children: [
                  ["Status", l.status],
                  ["CPU", `${Math.round(l.cpu)}%`],
                  ["Memory", Ct(l.memoryMb)],
                  ["Connections", String(l.connections)],
                  ["Active runs", String(l.activeRuns)],
                  ["Region", l.region ?? "—"],
                  ["Role", l.role ?? "—"]
                ].map(([d, h]) => /* @__PURE__ */ s("tr", { children: [
                  /* @__PURE__ */ t("td", { className: "text-text-tertiary py-[3px] w-[45%]", children: d }),
                  /* @__PURE__ */ t("td", { className: "text-text-primary py-[3px]", children: h })
                ] }, d)) }) })
              ] }),
              /* @__PURE__ */ s("div", { className: "px-3.5 py-3 border-b border-border flex flex-col gap-2", children: [
                /* @__PURE__ */ t("div", { className: "text-[11px] font-bold tracking-[0.3px] text-text-secondary uppercase", children: "Owned resources" }),
                /* @__PURE__ */ t("div", { className: "text-xs text-text-tertiary", children: "No resources owned (Phase 1 placeholder)." })
              ] }),
              (n || r) && /* @__PURE__ */ s("div", { className: "px-3.5 py-3 border-b border-border flex flex-col gap-2", children: [
                /* @__PURE__ */ t("div", { className: "text-[11px] font-bold tracking-[0.3px] text-text-secondary uppercase", children: "Chaos (this node)" }),
                n && /* @__PURE__ */ t(
                  "button",
                  {
                    onClick: () => n(l.id),
                    className: "self-start px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-white border-none rounded-md cursor-pointer font-[inherit] shrink-0",
                    children: "Add latency"
                  }
                ),
                r && /* @__PURE__ */ t(
                  "button",
                  {
                    onClick: () => r(l.id),
                    className: "self-start px-3.5 py-1.5 text-[13px] font-semibold bg-state-failed text-white border-none rounded-md cursor-pointer font-[inherit]",
                    children: "Kill node"
                  }
                )
              ] }),
              a && /* @__PURE__ */ s("div", { className: "px-3.5 py-3 border-b border-border flex flex-col gap-2", children: [
                /* @__PURE__ */ t("div", { className: "text-[11px] font-bold tracking-[0.3px] text-text-secondary uppercase", children: "Actions" }),
                /* @__PURE__ */ t(
                  "button",
                  {
                    onClick: () => a(l.id),
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
  title: n,
  description: r,
  timestamp: a,
  resolved: i = !1,
  action: c,
  className: o,
  style: u,
  "data-testid": l = `alert-${e}`
}) {
  return /* @__PURE__ */ s(
    "div",
    {
      role: "listitem",
      "data-testid": l,
      "data-resolved": i || void 0,
      className: b(
        "rounded-md px-3 py-2.5 border-l-[3px] transition-opacity duration-300",
        i ? "bg-[var(--color-surface-subtle,#f8fafc)] border-l-[var(--color-text-tertiary)] opacity-70" : b(Mt[e], Rt[e]),
        o
      ),
      style: u,
      children: [
        /* @__PURE__ */ s("div", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ t(
            ce,
            {
              size: "xs",
              color: i ? "var(--color-text-tertiary)" : St[e],
              "aria-label": i ? "Resolved" : e
            }
          ),
          /* @__PURE__ */ t("span", { className: "text-[12px] font-semibold text-[var(--color-text-primary)]", children: n }),
          i && /* @__PURE__ */ t(le, { tone: "success", size: "xs", className: "ml-1", children: "Resolved" }),
          a != null && /* @__PURE__ */ t("span", { className: "ml-auto text-[10px] text-[var(--color-text-tertiary)]", children: a }),
          c && /* @__PURE__ */ t("span", { className: "ml-1 shrink-0", children: c })
        ] }),
        r != null && /* @__PURE__ */ t("div", { className: "mt-1 text-[11px] leading-snug text-[var(--color-text-secondary)]", children: r })
      ]
    }
  );
}
const Et = /* @__PURE__ */ t("div", { className: "text-center text-[12px] text-[var(--color-text-tertiary)] py-8", children: "No alerts." }), At = /* @__PURE__ */ t("div", { className: "text-center text-[12px] text-[var(--color-text-tertiary)] py-8", children: "Loading alerts…" });
function ar({
  items: e,
  title: n = "Alerts",
  headerSlot: r,
  loading: a = !1,
  empty: i,
  maxHeight: c,
  className: o,
  style: u,
  "data-testid": l = "alert-list"
}) {
  const d = e.filter((x) => !x.resolved).length, h = d > 0 ? /* @__PURE__ */ s(le, { tone: "danger", size: "xs", "data-testid": "alert-list-active-count", children: [
    d,
    " active"
  ] }) : null;
  return /* @__PURE__ */ s(
    oe,
    {
      "data-testid": l,
      className: b("flex flex-col", o),
      style: u,
      children: [
        /* @__PURE__ */ t("div", { className: "px-4 py-3 border-b border-[var(--color-border)]", children: /* @__PURE__ */ t(ie, { title: n, meta: r ?? h }) }),
        /* @__PURE__ */ t(
          "div",
          {
            role: "list",
            "data-testid": `${l}-rows`,
            className: "flex-1 overflow-y-auto p-2 space-y-1.5",
            style: { maxHeight: c },
            children: a ? At : e.length === 0 ? i ?? Et : e.map((x) => /* @__PURE__ */ t(
              Lt,
              {
                severity: x.severity,
                title: x.title,
                description: x.description,
                timestamp: x.timestamp,
                resolved: x.resolved,
                action: x.action
              },
              `${x.id}-${x.resolved ? "resolved" : "active"}`
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
  label: n,
  reason: r,
  dense: a = !1,
  className: i,
  style: c,
  "data-testid": o = `health-cell-${e}`
}) {
  return /* @__PURE__ */ s(
    "div",
    {
      "data-testid": o,
      "data-status": e,
      className: b(
        "rounded-md border transition-colors duration-300",
        a ? "px-2.5 py-2" : "px-3 py-2.5",
        Tt[e],
        i
      ),
      style: c,
      children: [
        /* @__PURE__ */ s("div", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ t(ce, { size: "xs", color: It[e], "aria-label": e }),
          /* @__PURE__ */ t("span", { className: "text-[11px] font-semibold text-[var(--color-text-primary)]", children: n })
        ] }),
        /* @__PURE__ */ t("div", { className: "mt-1 text-[10px] text-[var(--color-text-tertiary)]", children: r ?? e })
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
  columns: n = 3,
  dense: r = !1,
  title: a,
  headerSlot: i,
  empty: c,
  className: o,
  style: u,
  "data-testid": l = "health-grid"
}) {
  const d = e.length === 0 ? c ?? _t : /* @__PURE__ */ t(
    "div",
    {
      role: "list",
      className: b(
        "grid grid-cols-1",
        $t[n],
        r ? "gap-1.5" : "gap-2"
      ),
      children: e.map((h) => /* @__PURE__ */ t("div", { role: "listitem", children: /* @__PURE__ */ t(
        Pt,
        {
          status: h.status,
          label: h.label,
          reason: h.reason,
          dense: r
        }
      ) }, h.id))
    }
  );
  return a ? /* @__PURE__ */ s(
    oe,
    {
      "data-testid": l,
      className: b("flex flex-col", o),
      style: u,
      children: [
        /* @__PURE__ */ t("div", { className: "px-4 py-3 border-b border-[var(--color-border)]", children: /* @__PURE__ */ t(ie, { title: a, meta: i }) }),
        /* @__PURE__ */ t("div", { className: b(r ? "p-2" : "p-3"), children: d })
      ]
    }
  ) : /* @__PURE__ */ t(
    "div",
    {
      "data-testid": l,
      className: b(r ? "p-2" : "p-3", o),
      style: u,
      children: d
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
