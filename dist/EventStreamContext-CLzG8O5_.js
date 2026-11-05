import { createContext as e, useCallback as t, useContext as n, useEffect as r, useMemo as i, useRef as a } from "react";
import { jsx as o } from "react/jsx-runtime";
//#region src/components/pipelines/context/EventStreamContext.tsx
var s = e(null), c = 2048;
function l(e) {
	let t = e.payload;
	return `${t && typeof t.runId == "string" ? t.runId : "<no-run>"}:${t && typeof t.stepId == "string" ? t.stepId : "<run>"}:${e.seq}`;
}
function u({ children: e, channelTransport: n }) {
	let r = a(/* @__PURE__ */ new Map()), u = a(/* @__PURE__ */ new Set()), d = a(0), f = t((e, t) => {
		let n = e, i = r.current.get(n);
		i || (i = /* @__PURE__ */ new Set(), r.current.set(n, i));
		let a = t;
		return i.add(a), () => {
			let e = r.current.get(n);
			e && (e.delete(a), e.size === 0 && r.current.delete(n));
		};
	}, []), p = t((e, t) => {
		let n = r.current.get(e);
		if (n) for (let r of Array.from(n)) try {
			r(t);
		} catch (t) {
			console.error("[EventStream] handler threw", e, t);
		}
		let i = r.current.get("*");
		if (i) {
			let n = {
				eventType: e,
				payload: t
			};
			for (let t of Array.from(i)) try {
				t(n);
			} catch (t) {
				console.error("[EventStream] wildcard handler threw", e, t);
			}
		}
	}, []), m = t((e) => {
		let t = l(e), n = u.current;
		if (!n.has(t)) {
			if (n.add(t), n.size > c) {
				let e = n.values().next().value;
				e !== void 0 && n.delete(e);
			}
			p(e.eventType, e.payload);
		}
	}, [p]), h = t((e, t) => {
		let n = {
			eventType: e,
			payload: t,
			seq: d.current++,
			sourceNodeId: "local",
			emittedAt: Date.now()
		};
		m(n);
	}, [m]);
	a(/* @__PURE__ */ new Set());
	let g = a(/* @__PURE__ */ new Map()), _ = t((e) => {
		if (!n) return () => {};
		let t = g.current, r = t.get(e) ?? 0;
		t.set(e, r + 1), r === 0 && n.subscribe(e);
		let i = !1;
		return () => {
			if (i) return;
			i = !0;
			let r = t.get(e) ?? 0, a = Math.max(0, r - 1);
			a === 0 ? (t.delete(e), n.unsubscribe(e)) : t.set(e, a);
		};
	}, [n]), v = t((e) => _(`pipeline:run:${e}`), [_]), y = t(() => _("pipeline:all"), [_]), b = t(() => _("pipeline:approvals"), [_]), x = i(() => ({
		subscribe: f,
		dispatch: h,
		dispatchEnvelope: m,
		subscribeToRun: v,
		subscribeToAll: y,
		subscribeToApprovals: b
	}), [
		f,
		h,
		m,
		v,
		y,
		b
	]);
	return /* @__PURE__ */ o(s.Provider, {
		value: x,
		children: e
	});
}
function d() {
	let e = n(s);
	if (!e) throw Error("useEventStreamContext must be used within an EventStreamProvider");
	return e;
}
function f(e, t) {
	let { subscribe: n } = d(), i = a(t);
	r(() => {
		i.current = t;
	}, [t]), r(() => n(e, (e) => i.current(e)), [n, e]);
}
//#endregion
export { f as n, d as r, u as t };
