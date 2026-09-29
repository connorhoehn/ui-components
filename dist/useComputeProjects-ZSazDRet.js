import { useCallback as e, useEffect as t, useMemo as n, useRef as r, useState as i } from "react";
//#region src/components/compute/hooks/useComputeProjects.ts
var a = "__unassigned__";
function o({ client: n, projects: a, pollIntervalMs: o = 6e4, enabled: s = !0 }) {
	let [c, l] = i(a ?? []), [u, d] = i(!1), [f, p] = i(null), m = r(0), h = !!n.listProjects, g = e(async () => {
		if (a || !s || !n.listProjects) return;
		let e = ++m.current;
		d(!0);
		try {
			let t = await n.listProjects();
			if (m.current !== e) return;
			l(t), p(null);
		} catch (t) {
			m.current === e && p(t instanceof Error ? t.message : "Failed to list projects");
		} finally {
			m.current === e && d(!1);
		}
	}, [
		n,
		a,
		s
	]);
	return t(() => {
		if (a) {
			l(a);
			return;
		}
		if (!s || !h || (g(), o <= 0)) return;
		let e = setInterval(() => void g(), o);
		return () => {
			clearInterval(e), m.current += 1;
		};
	}, [
		g,
		a,
		s,
		h,
		o
	]), {
		projects: c,
		rollups: [],
		absent: !h && !a,
		isLoading: u,
		error: f,
		refresh: g
	};
}
function s(e, t) {
	let n = /* @__PURE__ */ new Map();
	for (let e of t) {
		let t = e.projectId ?? "__unassigned__", r = n.get(t);
		r ? r.push(e) : n.set(t, [e]);
	}
	let r = (e) => {
		let t = n.get(e.id) ?? [], r = t.map((e) => e.stopsInMs).filter((e) => typeof e == "number");
		return {
			...e,
			computers: t,
			activeCount: t.filter((e) => e.status === "running" || e.status === "waiting").length,
			soonestExpiryMs: r.length > 0 ? Math.min(...r) : null,
			liveSpendUsd: t.reduce((e, t) => e + (t.spendUsd ?? 0), 0),
			liveTokens: t.reduce((e, t) => e + (t.tokensUsed ?? 0), 0)
		};
	}, i = e.map(r);
	return (n.get("__unassigned__") ?? []).length > 0 && i.push(r({
		id: a,
		name: "No project"
	})), i;
}
function c(e) {
	return !Number.isFinite(e) || e < 0 ? "—" : e < 1e3 ? String(Math.round(e)) : e < 1e6 ? `${(e / 1e3).toFixed(+(e < 1e4))}k` : `${(e / 1e6).toFixed(1)}M`;
}
function l(e, t) {
	return n(() => s(e, t), [e, t]);
}
//#endregion
export { l as a, o as i, c as n, s as r, a as t };
