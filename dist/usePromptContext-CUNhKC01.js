import { useCallback as e, useMemo as t, useSyncExternalStore as n } from "react";
//#region src/hooks/usePromptContext.ts
var r = 10, i = "application/x-uic-prompt-context", a = "uic:prompt-context:", o = Object.freeze([]), s = /* @__PURE__ */ new Map();
function c(e) {
	if (!e || typeof e != "object") return null;
	let t = e;
	if (typeof t.id != "string" || !t.id.trim()) return null;
	let n = typeof t.title == "string" && t.title.trim() ? t.title.trim().slice(0, 200) : t.id;
	return {
		id: t.id.trim(),
		title: n,
		...typeof t.kind == "string" && t.kind ? { kind: t.kind } : {}
	};
}
function l(e) {
	if (!Array.isArray(e)) return [];
	let t = /* @__PURE__ */ new Set(), n = [];
	for (let r of e) {
		let e = c(r);
		if (!(!e || t.has(e.id)) && (t.add(e.id), n.push(e), n.length >= 10)) break;
	}
	return n;
}
function u(e) {
	try {
		let t = globalThis.sessionStorage?.getItem(a + e);
		if (!t) return o;
		let n = l(JSON.parse(t));
		return n.length ? n : o;
	} catch {
		return o;
	}
}
function d(e) {
	let t = s.get(e);
	return t || (t = {
		items: u(e),
		listeners: /* @__PURE__ */ new Set()
	}, s.set(e, t)), t;
}
function f(e, t) {
	let n = d(e);
	n.items = t.length ? t : o;
	try {
		t.length ? globalThis.sessionStorage?.setItem(a + e, JSON.stringify(t)) : globalThis.sessionStorage?.removeItem(a + e);
	} catch {}
	for (let e of [...n.listeners]) e();
}
function p(e = "documents") {
	let t = () => d(e).items, n = (e) => t().some((t) => t.id === e), r = (n) => {
		let r = c(n);
		if (!r) return !1;
		let i = t(), a = i.findIndex((e) => e.id === r.id);
		return a >= 0 ? ((i[a].title !== r.title || i[a].kind !== r.kind) && f(e, i.map((e, t) => t === a ? r : e)), !0) : i.length >= 10 ? !1 : (f(e, [...i, r]), !0);
	}, i = (n) => {
		let r = t();
		r.some((e) => e.id === n) && f(e, r.filter((e) => e.id !== n));
	};
	return {
		get: t,
		add: r,
		remove: i,
		has: n,
		toggle: (e) => n(e.id) ? (i(e.id), !1) : r(e),
		clear: () => {
			t().length && f(e, o);
		}
	};
}
function m() {
	s.clear();
}
function h(r = "documents") {
	let i = e((e) => {
		let t = d(r);
		return t.listeners.add(e), () => {
			t.listeners.delete(e);
		};
	}, [r]), a = e(() => d(r).items, [r]), s = n(i, a, () => o), c = t(() => p(r), [r]);
	return t(() => ({
		items: s,
		add: c.add,
		remove: c.remove,
		has: (e) => s.some((t) => t.id === e),
		toggle: c.toggle,
		clear: c.clear
	}), [s, c]);
}
function g(e, t) {
	let n = l(t);
	n.length && (e.setData(i, JSON.stringify(n)), e.setData("text/plain", n.map((e) => e.title).join("\n")), e.effectAllowed = "copy");
}
function _(e) {
	return !!e && Array.from(e.types ?? []).includes("application/x-uic-prompt-context");
}
function v(e) {
	if (!e) return [];
	try {
		let t = e.getData(i);
		return t ? l(JSON.parse(t)) : [];
	} catch {
		return [];
	}
}
//#endregion
export { v as a, g as c, p as i, r as n, m as o, _ as r, h as s, i as t };
