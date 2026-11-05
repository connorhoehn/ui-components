import { t as e } from "./apiBaseUrl-DLrXlmVj.js";
import { useCallback as t, useEffect as n, useState as r } from "react";
//#region src/hooks/useApiHealth.ts
var i = 3e4;
function a(e) {
	if (!e || typeof e != "object") return null;
	let t = e, n;
	if (t.status === "ok" || t.status === "healthy") n = "ok";
	else if (t.status === "degraded" || t.status === "unhealthy") n = "degraded";
	else return null;
	let r = {};
	if (Array.isArray(t.checks)) for (let e of t.checks) {
		if (!e || typeof e.name != "string") continue;
		let t = e.ok === !0 || e.status === "ok";
		r[e.name] = {
			status: t ? e.degraded ? "degraded" : "ok" : "error",
			...typeof e.details == "string" && e.details ? { detail: e.details } : {},
			...e.durationMs === void 0 ? {} : { latencyMs: e.durationMs },
			...e.error === void 0 ? {} : { error: e.error }
		};
	}
	else t.checks && typeof t.checks == "object" && (r = t.checks);
	return {
		status: n,
		checks: r
	};
}
function o(e) {
	return e ? Object.entries(e).filter(([, e]) => e && e.status !== "ok").map(([e]) => e) : [];
}
function s(t = {}) {
	let { pollMs: s = i, baseUrl: c } = typeof t == "number" ? { pollMs: t } : t, l = c ?? e(), [u, d] = r({
		status: "unknown",
		checks: {},
		failing: []
	});
	return n(() => {
		if (!l) return;
		let e = !0, t = async () => {
			try {
				let t = await (await fetch(`${l}/health`)).json().catch(() => null);
				if (!e) return;
				let n = a(t);
				d(n ? {
					status: n.status,
					checks: n.checks,
					failing: o(n.checks)
				} : {
					status: "degraded",
					checks: {},
					failing: ["unknown"]
				});
			} catch {
				if (!e) return;
				d({
					status: "degraded",
					checks: {},
					failing: ["network"]
				});
			}
		};
		t();
		let n = setInterval(() => {
			t();
		}, s), r = () => {
			typeof document < "u" && document.visibilityState === "visible" && t();
		}, i = () => {
			t();
		};
		return typeof document < "u" && document.addEventListener("visibilitychange", r), typeof window < "u" && window.addEventListener("online", i), () => {
			e = !1, clearInterval(n), typeof document < "u" && document.removeEventListener("visibilitychange", r), typeof window < "u" && window.removeEventListener("online", i);
		};
	}, [l, s]), u;
}
function c(e) {
	let t = e.checks.model;
	if (!t || t.status === "ok") return null;
	let n = t.detail ?? t.error;
	return n ? /^model unavailable/i.test(n) ? n : `Model unavailable — ${n}` : "Model unavailable";
}
//#endregion
//#region src/hooks/useFullscreen.ts
function l() {
	if (typeof document > "u") return null;
	let e = document;
	return e.fullscreenElement ?? e.webkitFullscreenElement ?? null;
}
function u() {
	if (typeof document > "u" || typeof Element > "u") return !1;
	let e = Element.prototype;
	return document.fullscreenEnabled !== !1 && !!(e.requestFullscreen ?? e.webkitRequestFullscreen);
}
function d(e) {
	let [i, a] = r(!1), [o, s] = r(!1), [c, d] = r(!1);
	n(() => {
		if (d(u()), typeof document > "u") return;
		let t = () => a(!!e.current && l() === e.current);
		return t(), document.addEventListener("fullscreenchange", t), document.addEventListener("webkitfullscreenchange", t), () => {
			document.removeEventListener("fullscreenchange", t), document.removeEventListener("webkitfullscreenchange", t);
		};
	}, [e]);
	let f = t(async () => {
		let t = e.current;
		if (s(!1), !t) {
			s(!0);
			return;
		}
		try {
			let e = t.requestFullscreen ?? t.webkitRequestFullscreen;
			if (!e) {
				s(!0);
				return;
			}
			await e.call(t);
		} catch {
			s(!0);
		}
	}, [e]), p = t(async () => {
		if (typeof document > "u") return;
		let e = document;
		s(!1);
		try {
			if (!l()) return;
			await (e.exitFullscreen ?? e.webkitExitFullscreen)?.call(e);
		} catch {
			s(!0);
		}
	}, []);
	return {
		active: i,
		supported: c,
		error: o,
		enter: f,
		exit: p,
		toggle: t(async () => {
			e.current && l() === e.current ? await p() : await f();
		}, [
			e,
			f,
			p
		])
	};
}
//#endregion
export { s as a, a as i, d as n, c as r, u as t };
