import { jsx as G } from "react/jsx-runtime";
import { createContext as z, useContext as M, useState as s, useRef as d, useCallback as O, useEffect as g, useMemo as W } from "react";
import { u as q } from "./EventStreamContext-CjzSHXy-.js";
const B = {
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
  hotspots: {
    highTrafficResources: [],
    overloadedNodes: []
  },
  trends: {
    connectionGrowth: 0,
    messageVolumeGrowth: 0,
    nodeHealthTrend: "stable"
  },
  alerts: []
}, J = {}, K = {
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
}, P = z(K), Q = typeof import.meta < "u" && J?.VITE_SOCIAL_API_URL || "", $ = 50;
function X(e) {
  return e.includes("failed") || e.includes("error") ? "error" : e.includes("completed") ? "success" : e.includes("warn") || e.includes("awaiting") ? "warning" : "info";
}
function Y(e, n) {
  if (n && typeof n == "object") {
    const r = n;
    if (typeof r.runId == "string") return `${e} · ${r.runId}`;
  }
  return e;
}
function Z(e = /* @__PURE__ */ new Date()) {
  const n = String(e.getHours()).padStart(2, "0"), r = String(e.getMinutes()).padStart(2, "0"), l = String(e.getSeconds()).padStart(2, "0");
  return `${n}:${r}:${l}`;
}
function se({
  children: e,
  pollIntervalMs: n = 1e4
}) {
  const [r, l] = s(null), [S, w] = s(!1), [y, C] = s(null), [R, E] = s(null), [i, T] = s(!0), [I, N] = s([]), [_, L] = s(!1), U = d(/* @__PURE__ */ new Set()), [A, j] = s(0), k = d(B), f = d(!1), v = q(), D = d(i);
  D.current = i;
  const c = O(async () => {
    w(!0), C(null);
    try {
      const t = await fetch(`${Q}/api/observability/dashboard`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      });
      if (!t.ok) throw new Error(`HTTP ${t.status}`);
      const o = await t.json();
      l(o), E((/* @__PURE__ */ new Date()).toISOString()), L(!0), f.current = !1;
    } catch (t) {
      f.current || (console.warn(
        "[ObservabilityContext] /api/observability/dashboard unreachable — using fixture",
        t
      ), f.current = !0), l((o) => o ?? k.current), E((o) => o ?? (/* @__PURE__ */ new Date()).toISOString()), C(t instanceof Error ? t.message : "Failed to load dashboard"), L(!1);
    } finally {
      w(!1);
    }
  }, []), x = O(async () => {
    await c();
  }, [c]);
  g(() => {
    c();
  }, [c]), g(() => {
    if (!i) return;
    const t = setInterval(() => {
      c();
    }, n);
    return () => clearInterval(t);
  }, [i, n, c]), g(() => {
    const t = v.subscribeToAll(), o = v.subscribe("*", (V) => {
      if (!D.current) return;
      const b = V, a = b?.eventType ?? "unknown", h = b?.payload ?? b, m = h?.runId;
      if (m) {
        const u = U.current;
        a === "pipeline.run.started" ? u.add(m) : (a === "pipeline.run.completed" || a === "pipeline.run.failed" || a === "pipeline.run.cancelled") && u.delete(m), j(u.size);
      }
      const F = {
        id: `obs-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        timestamp: Z(),
        type: a,
        summary: Y(a, h),
        severity: X(a),
        payload: h
      };
      N((u) => {
        const p = [F, ...u];
        return p.length > $ ? p.slice(0, $) : p;
      });
    });
    return () => {
      t(), o();
    };
  }, [v]);
  const H = W(
    () => ({
      dashboard: r,
      loading: S,
      error: y,
      lastUpdatedAt: R,
      live: i,
      setLive: T,
      refreshDashboard: x,
      recentEvents: I,
      activeRunsCount: A,
      isLiveData: _
    }),
    [
      r,
      S,
      y,
      R,
      i,
      x,
      I,
      A,
      _
    ]
  );
  return /* @__PURE__ */ G(P.Provider, { value: H, children: e });
}
function re() {
  return M(P);
}
export {
  se as O,
  B as d,
  re as u
};
