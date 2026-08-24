import { r as e } from "./IdentityContext-CQM1qwH6.js";
import { r as t } from "./EventStreamContext-C0egqLaF.js";
import { createContext as n, useCallback as r, useContext as i, useEffect as a, useMemo as o, useRef as s, useState as c } from "react";
import { jsx as l } from "react/jsx-runtime";
//#region src/components/observability/fixtures/dashboardFixture.ts
var u = {
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
}, d = n({
	dashboard: null,
	loading: !1,
	error: null,
	lastUpdatedAt: null,
	live: !0,
	setLive: () => {},
	refreshDashboard: async () => {},
	recentEvents: [],
	activeRunsCount: 0,
	isLiveData: !1,
	unauthorized: !1
}), f = "", p = 50;
function m(e) {
	return e.includes("failed") || e.includes("error") ? "error" : e.includes("completed") ? "success" : e.includes("warn") || e.includes("awaiting") ? "warning" : "info";
}
function h(e, t) {
	if (t && typeof t == "object") {
		let n = t;
		if (typeof n.runId == "string") return `${e} · ${n.runId}`;
	}
	return e;
}
function g(e = /* @__PURE__ */ new Date()) {
	return `${String(e.getHours()).padStart(2, "0")}:${String(e.getMinutes()).padStart(2, "0")}:${String(e.getSeconds()).padStart(2, "0")}`;
}
function _({ children: n, pollIntervalMs: i = 1e4, authToken: _, fetchImpl: v, credentials: y = "include" }) {
	let b = e(), x = _ ?? b?.idToken ?? null, [S, C] = c(null), [w, T] = c(!1), [E, D] = c(null), [O, k] = c(null), [A, j] = c(!0), [M, N] = c([]), [P, F] = c(!1), [I, L] = c(!1), R = s(/* @__PURE__ */ new Set()), [z, B] = c(0), V = s(u), H = s(!1), U = t(), W = s(A);
	W.current = A;
	let G = r(async () => {
		T(!0), D(null);
		try {
			let e = { "Content-Type": "application/json" };
			x && (e.Authorization = `Bearer ${x}`);
			let t = await (v ?? fetch)(`${f}/api/observability/dashboard`, {
				method: "GET",
				headers: e,
				credentials: y
			});
			if (t.status === 401 || t.status === 403) {
				let e = /* @__PURE__ */ Error(`Not authorized to read the observability dashboard (HTTP ${t.status})`);
				throw e.unauthorized = !0, e;
			}
			if (!t.ok) throw Error(`HTTP ${t.status}`);
			let n = await t.json();
			C(n), k((/* @__PURE__ */ new Date()).toISOString()), F(!0), L(!1), H.current = !1;
		} catch (e) {
			let t = !!e?.unauthorized;
			H.current ||= (console.warn(t ? "[ObservabilityContext] /api/observability/dashboard refused our credentials — using fixture" : "[ObservabilityContext] /api/observability/dashboard unreachable — using fixture", e), !0), C((e) => e ?? V.current), k((e) => e ?? (/* @__PURE__ */ new Date()).toISOString()), D(e instanceof Error ? e.message : "Failed to load dashboard"), F(!1), L(t);
		} finally {
			T(!1);
		}
	}, [
		x,
		v,
		y
	]), K = r(async () => {
		await G();
	}, [G]);
	a(() => {
		G();
	}, [G]), a(() => {
		if (!A) return;
		let e = setInterval(() => {
			G();
		}, i);
		return () => clearInterval(e);
	}, [
		A,
		i,
		G
	]), a(() => {
		let e = U.subscribeToAll(), t = U.subscribe("*", (e) => {
			if (!W.current) return;
			let t = e, n = t?.eventType ?? "unknown", r = t?.payload ?? t, i = r?.runId;
			if (i) {
				let e = R.current;
				n === "pipeline.run.started" ? e.add(i) : (n === "pipeline.run.completed" || n === "pipeline.run.failed" || n === "pipeline.run.cancelled") && e.delete(i), B(e.size);
			}
			let a = {
				id: `obs-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
				timestamp: g(),
				type: n,
				summary: h(n, r),
				severity: m(n),
				payload: r
			};
			N((e) => {
				let t = [a, ...e];
				return t.length > p ? t.slice(0, p) : t;
			});
		});
		return () => {
			e(), t();
		};
	}, [U]);
	let q = o(() => ({
		dashboard: S,
		loading: w,
		error: E,
		lastUpdatedAt: O,
		live: A,
		setLive: j,
		refreshDashboard: K,
		recentEvents: M,
		activeRunsCount: z,
		isLiveData: P,
		unauthorized: I
	}), [
		S,
		w,
		E,
		O,
		A,
		K,
		M,
		z,
		P,
		I
	]);
	return /* @__PURE__ */ l(d.Provider, {
		value: q,
		children: n
	});
}
function v() {
	return i(d);
}
//#endregion
export { v as n, u as r, _ as t };
