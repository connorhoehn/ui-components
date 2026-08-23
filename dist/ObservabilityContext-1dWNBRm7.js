import { r as e } from "./EventStreamContext-C0egqLaF.js";
import { createContext as t, useCallback as n, useContext as r, useEffect as i, useMemo as a, useRef as o, useState as s } from "react";
import { jsx as c } from "react/jsx-runtime";
//#region src/components/observability/fixtures/dashboardFixture.ts
var l = {
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
}, u = t({
	dashboard: null,
	loading: !1,
	error: null,
	lastUpdatedAt: null,
	live: !0,
	setLive: () => {},
	refreshDashboard: async () => {},
	recentEvents: [],
	activeRunsCount: 0,
	isLiveData: !1
}), d = "", f = 50;
function p(e) {
	return e.includes("failed") || e.includes("error") ? "error" : e.includes("completed") ? "success" : e.includes("warn") || e.includes("awaiting") ? "warning" : "info";
}
function m(e, t) {
	if (t && typeof t == "object") {
		let n = t;
		if (typeof n.runId == "string") return `${e} · ${n.runId}`;
	}
	return e;
}
function h(e = /* @__PURE__ */ new Date()) {
	return `${String(e.getHours()).padStart(2, "0")}:${String(e.getMinutes()).padStart(2, "0")}:${String(e.getSeconds()).padStart(2, "0")}`;
}
function g({ children: t, pollIntervalMs: r = 1e4 }) {
	let [g, _] = s(null), [v, y] = s(!1), [b, x] = s(null), [S, C] = s(null), [w, T] = s(!0), [E, D] = s([]), [O, k] = s(!1), A = o(/* @__PURE__ */ new Set()), [j, M] = s(0), N = o(l), P = o(!1), F = e(), I = o(w);
	I.current = w;
	let L = n(async () => {
		y(!0), x(null);
		try {
			let e = await fetch(`${d}/api/observability/dashboard`, {
				method: "GET",
				headers: { "Content-Type": "application/json" }
			});
			if (!e.ok) throw Error(`HTTP ${e.status}`);
			let t = await e.json();
			_(t), C((/* @__PURE__ */ new Date()).toISOString()), k(!0), P.current = !1;
		} catch (e) {
			P.current ||= (console.warn("[ObservabilityContext] /api/observability/dashboard unreachable — using fixture", e), !0), _((e) => e ?? N.current), C((e) => e ?? (/* @__PURE__ */ new Date()).toISOString()), x(e instanceof Error ? e.message : "Failed to load dashboard"), k(!1);
		} finally {
			y(!1);
		}
	}, []), R = n(async () => {
		await L();
	}, [L]);
	i(() => {
		L();
	}, [L]), i(() => {
		if (!w) return;
		let e = setInterval(() => {
			L();
		}, r);
		return () => clearInterval(e);
	}, [
		w,
		r,
		L
	]), i(() => {
		let e = F.subscribeToAll(), t = F.subscribe("*", (e) => {
			if (!I.current) return;
			let t = e, n = t?.eventType ?? "unknown", r = t?.payload ?? t, i = r?.runId;
			if (i) {
				let e = A.current;
				n === "pipeline.run.started" ? e.add(i) : (n === "pipeline.run.completed" || n === "pipeline.run.failed" || n === "pipeline.run.cancelled") && e.delete(i), M(e.size);
			}
			let a = {
				id: `obs-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
				timestamp: h(),
				type: n,
				summary: m(n, r),
				severity: p(n),
				payload: r
			};
			D((e) => {
				let t = [a, ...e];
				return t.length > f ? t.slice(0, f) : t;
			});
		});
		return () => {
			e(), t();
		};
	}, [F]);
	let z = a(() => ({
		dashboard: g,
		loading: v,
		error: b,
		lastUpdatedAt: S,
		live: w,
		setLive: T,
		refreshDashboard: R,
		recentEvents: E,
		activeRunsCount: j,
		isLiveData: O
	}), [
		g,
		v,
		b,
		S,
		w,
		R,
		E,
		j,
		O
	]);
	return /* @__PURE__ */ c(u.Provider, {
		value: z,
		children: t
	});
}
function _() {
	return r(u);
}
//#endregion
export { _ as n, l as r, g as t };
