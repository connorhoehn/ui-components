import { t as e } from "./cn-DhjIN-s0.js";
import { createContext as t, useContext as n, useState as r } from "react";
import { jsx as i, jsxs as a } from "react/jsx-runtime";
//#region src/components/shared/DockedPanelContext.tsx
var o = t(null);
function s() {
	return n(o);
}
function c({ hasHeader: e = !0, fillsHeight: t = !0, children: n }) {
	return /* @__PURE__ */ i(o.Provider, {
		value: {
			hasHeader: e,
			fillsHeight: t
		},
		children: n
	});
}
//#endregion
//#region src/components/shared/Avatar.tsx
var l = [
	"#4f7cff",
	"#22c55e",
	"#f59e0b",
	"#ef4444",
	"#a855f7",
	"#14b8a6",
	"#0ea5e9",
	"#f97316"
];
function u(e) {
	let t = typeof e == "string" ? e : "", n = 5381;
	for (let e = 0; e < t.length; e++) n = n * 33 ^ t.charCodeAt(e);
	return l[Math.abs(n) % l.length];
}
function d(e) {
	let t = (typeof e == "string" ? e : "").trim();
	if (!t) return "?";
	let n = t.split(/\s+/);
	if (n.length >= 2) return (n[0][0] + n[1][0]).toUpperCase();
	let r = n[0];
	return r.length >= 2 ? r[0].toUpperCase() + r[1].toLowerCase() : r[0].toUpperCase();
}
function f({ name: t, size: n = 28, initials: a, color: o, src: s, className: c, style: l, title: f }) {
	let p = o || u(t), m = a ?? d(t), [h, g] = r(null), _ = !!s && s !== h;
	return /* @__PURE__ */ i("div", {
		title: f ?? t,
		className: e("inline-flex items-center justify-center rounded-full flex-shrink-0 font-semibold select-none overflow-hidden", c),
		style: {
			width: n,
			height: n,
			background: p,
			color: "#fff",
			fontSize: n * .38,
			...l
		},
		children: _ ? /* @__PURE__ */ i("img", {
			src: s,
			alt: t,
			width: n,
			height: n,
			onError: () => g(s ?? null),
			className: "w-full h-full object-cover"
		}) : m
	});
}
function p({ names: t, items: n, maxVisible: r = 5, size: o = 28, className: s, total: c }) {
	let l = n ?? (t ?? []).map((e) => ({ name: e })), u = l.slice(0, r), d = (c ?? l.length) - u.length, p = -(o * .3);
	return /* @__PURE__ */ a("div", {
		className: e("inline-flex items-center", s),
		children: [u.map((e, t) => /* @__PURE__ */ i(f, {
			name: e.name,
			initials: e.initials,
			color: e.color,
			src: e.src,
			size: o,
			className: "border-2 border-white",
			style: { marginLeft: t > 0 ? p : 0 }
		}, `${e.name}-${t}`)), d > 0 && /* @__PURE__ */ a("div", {
			className: "inline-flex items-center justify-center rounded-full flex-shrink-0 font-semibold select-none bg-surface-emphasis text-text-secondary border-2 border-white",
			style: {
				width: o,
				height: o,
				fontSize: o * .38,
				marginLeft: p
			},
			title: `+${d} more`,
			children: ["+", d]
		})]
	});
}
//#endregion
export { c as a, d as i, p as n, s as o, u as r, f as t };
