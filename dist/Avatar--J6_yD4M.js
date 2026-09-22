import { t as e } from "./cn-DhjIN-s0.js";
import { useState as t } from "react";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
//#region src/components/shared/Avatar.tsx
var i = [
	"#4f7cff",
	"#22c55e",
	"#f59e0b",
	"#ef4444",
	"#a855f7",
	"#14b8a6",
	"#0ea5e9",
	"#f97316"
];
function a(e) {
	let t = typeof e == "string" ? e : "", n = 5381;
	for (let e = 0; e < t.length; e++) n = n * 33 ^ t.charCodeAt(e);
	return i[Math.abs(n) % i.length];
}
function o(e) {
	let t = (typeof e == "string" ? e : "").trim();
	if (!t) return "?";
	let n = t.split(/\s+/);
	if (n.length >= 2) return (n[0][0] + n[1][0]).toUpperCase();
	let r = n[0];
	return r.length >= 2 ? r[0].toUpperCase() + r[1].toLowerCase() : r[0].toUpperCase();
}
function s({ name: r, size: i = 28, initials: s, color: c, src: l, icon: u, glyph: d, className: f, style: p, title: m }) {
	let h = c || a(r), g = s ?? o(r), [_, v] = t(null), y = !!l && l !== _, b = !y && (u !== void 0 || !!d);
	return /* @__PURE__ */ n("div", {
		title: m ?? r,
		className: e("inline-flex items-center justify-center rounded-full flex-shrink-0 font-semibold select-none overflow-hidden", f),
		style: {
			width: i,
			height: i,
			background: h,
			color: "#fff",
			fontSize: b ? i * .5 : i * .38,
			...p
		},
		children: y ? /* @__PURE__ */ n("img", {
			src: l,
			alt: r,
			width: i,
			height: i,
			onError: () => v(l ?? null),
			className: "w-full h-full object-cover"
		}) : u === void 0 ? d ? /* @__PURE__ */ n("span", {
			className: "leading-none",
			"aria-hidden": "true",
			children: d
		}) : g : /* @__PURE__ */ n("span", {
			className: "inline-flex items-center justify-center leading-none",
			"aria-hidden": "true",
			children: u
		})
	});
}
function c({ names: t, items: i, maxVisible: a = 5, size: o = 28, className: c, total: l }) {
	let u = i ?? (t ?? []).map((e) => ({ name: e })), d = u.slice(0, a), f = (l ?? u.length) - d.length, p = -(o * .3);
	return /* @__PURE__ */ r("div", {
		className: e("inline-flex items-center", c),
		children: [d.map((e, t) => /* @__PURE__ */ n(s, {
			name: e.name,
			initials: e.initials,
			color: e.color,
			src: e.src,
			size: o,
			className: "border-2 border-white",
			style: { marginLeft: t > 0 ? p : 0 }
		}, `${e.name}-${t}`)), f > 0 && /* @__PURE__ */ r("div", {
			className: "inline-flex items-center justify-center rounded-full flex-shrink-0 font-semibold select-none bg-surface-emphasis text-text-secondary border-2 border-white",
			style: {
				width: o,
				height: o,
				fontSize: o * .38,
				marginLeft: p
			},
			title: `+${f} more`,
			children: ["+", f]
		})]
	});
}
//#endregion
export { o as i, c as n, a as r, s as t };
