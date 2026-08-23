import { createContext as e, useCallback as t, useContext as n, useEffect as r, useMemo as i, useRef as a } from "react";
import { jsx as o } from "react/jsx-runtime";
//#region src/components/pipelines/context/EventStreamContext.tsx
var s = e(null), c = 2048;
function l(e) {
	let t = e.payload;
	return `${t && typeof t.runId == "string" ? t.runId : "<no-run>"}:${t && typeof t.stepId == "string" ? t.stepId : "<run>"}:${e.seq}`;
}
function u({ children: e }) {
	let n = a(/* @__PURE__ */ new Map()), r = a(/* @__PURE__ */ new Set()), u = a(0), d = t((e, t) => {
		let r = e, i = n.current.get(r);
		i || (i = /* @__PURE__ */ new Set(), n.current.set(r, i));
		let a = t;
		return i.add(a), () => {
			let e = n.current.get(r);
			e && (e.delete(a), e.size === 0 && n.current.delete(r));
		};
	}, []), f = t((e, t) => {
		let r = n.current.get(e);
		if (r) for (let n of Array.from(r)) try {
			n(t);
		} catch (t) {
			console.error("[EventStream] handler threw", e, t);
		}
		let i = n.current.get("*");
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
	}, []), p = t((e) => {
		let t = l(e), n = r.current;
		if (!n.has(t)) {
			if (n.add(t), n.size > c) {
				let e = n.values().next().value;
				e !== void 0 && n.delete(e);
			}
			f(e.eventType, e.payload);
		}
	}, [f]), m = t((e, t) => {
		let n = {
			eventType: e,
			payload: t,
			seq: u.current++,
			sourceNodeId: "local",
			emittedAt: Date.now()
		};
		p(n);
	}, [p]), h = t((e) => () => {}, []), g = t(() => () => {}, []), _ = t(() => () => {}, []), v = i(() => ({
		subscribe: d,
		dispatch: m,
		dispatchEnvelope: p,
		subscribeToRun: h,
		subscribeToAll: g,
		subscribeToApprovals: _
	}), [
		d,
		m,
		p,
		h,
		g,
		_
	]);
	return /* @__PURE__ */ o(s.Provider, {
		value: v,
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
