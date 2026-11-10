import { d as e } from "./Button-DQoeE5dN.js";
import { d as t, h as n } from "./safeHref-BL4Z8n8E.js";
import { useState as r } from "react";
import { jsx as i, jsxs as a } from "react/jsx-runtime";
//#region src/components/shared/Avatar.tsx
var o = [
	"#2563eb",
	"#15803d",
	"#b45309",
	"#dc2626",
	"#9333ea",
	"#0f766e",
	"#0369a1",
	"#c2410c"
];
function s(e) {
	let t = typeof e == "string" ? e : "", n = 5381;
	for (let e = 0; e < t.length; e++) n = n * 33 ^ t.charCodeAt(e);
	return o[Math.abs(n) % o.length];
}
function c(e) {
	let t = e.trim(), n, r, i, a = /^#([0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/i.exec(t);
	if (a) {
		let e = a[1], t = e.length <= 4, o = (n) => parseInt(t ? e[n] + e[n] : e.slice(n * 2, n * 2 + 2), 16);
		[n, r, i] = [
			o(0),
			o(1),
			o(2)
		];
	} else {
		let e = /^rgba?\(\s*([0-9.]+)[\s,]+([0-9.]+)[\s,]+([0-9.]+)/i.exec(t);
		if (!e) return null;
		[n, r, i] = [
			Number(e[1]),
			Number(e[2]),
			Number(e[3])
		];
	}
	if (![
		n,
		r,
		i
	].every((e) => Number.isFinite(e))) return null;
	let o = (e) => {
		let t = e / 255;
		return t <= .03928 ? t / 12.92 : ((t + .055) / 1.055) ** 2.4;
	};
	return .2126 * o(n) + .7152 * o(r) + .0722 * o(i);
}
function l(e) {
	let t = c(e);
	return t === null ? null : t > .6 ? "var(--color-text-primary)" : "#fff";
}
function u(e) {
	let t = (typeof e == "string" ? e : "").trim();
	if (!t) return "?";
	let n = t.split(/\s+/);
	if (n.length >= 2) return (n[0][0] + n[1][0]).toUpperCase();
	let r = n[0];
	return r.length >= 2 ? r[0].toUpperCase() + r[1].toLowerCase() : r[0].toUpperCase();
}
function d({ name: a, size: o = 28, initials: c, color: d, src: f, icon: p, glyph: m, foreground: h, tone: g, autoContrast: _ = !1, className: v, style: y, title: b, showTitle: x = !0 }) {
	let S = d || s(a), C = g ? t[n(g)] : void 0, w = h ?? (_ ? l(S) ?? "#fff" : "#fff"), T = !x || b === null ? void 0 : b ?? a, E = c ?? u(a), [D, O] = r(null), k = !!f && f !== D, A = !k && (p !== void 0 || !!m);
	return /* @__PURE__ */ i("div", {
		title: T,
		"data-ui-text": "avatar",
		className: e("inline-flex items-center justify-center rounded-full flex-shrink-0 font-semibold select-none overflow-hidden", C, v),
		style: {
			width: o,
			height: o,
			background: C ? void 0 : S,
			color: C ? void 0 : w,
			fontSize: A ? Math.max(9, o * .5) : Math.min(16, Math.max(9, o * .38)),
			...y
		},
		children: k ? /* @__PURE__ */ i("img", {
			src: f,
			alt: a,
			width: o,
			height: o,
			onError: () => O(f ?? null),
			className: "w-full h-full object-cover"
		}) : p === void 0 ? m ? /* @__PURE__ */ i("span", {
			className: "leading-none",
			"aria-hidden": "true",
			children: m
		}) : E : /* @__PURE__ */ i("span", {
			className: "inline-flex items-center justify-center leading-none",
			"aria-hidden": "true",
			children: p
		})
	});
}
function f({ names: t, items: n, maxVisible: r = 5, size: o = 28, className: s, total: c }) {
	let l = n ?? (t ?? []).map((e) => ({ name: e })), u = l.slice(0, r), f = (c ?? l.length) - u.length, p = -(o * .3);
	return /* @__PURE__ */ a("div", {
		className: e("inline-flex items-center", s),
		children: [u.map((e, t) => /* @__PURE__ */ i(d, {
			name: e.name,
			initials: e.initials,
			color: e.color,
			src: e.src,
			size: o,
			className: "border-2 border-white",
			style: { marginLeft: t > 0 ? p : 0 }
		}, `${e.name}-${t}`)), f > 0 && /* @__PURE__ */ a("div", {
			"data-ui-text": "avatar",
			className: "inline-flex items-center justify-center rounded-full flex-shrink-0 font-semibold select-none bg-surface-emphasis text-text-secondary border-2 border-white",
			style: {
				width: o,
				height: o,
				fontSize: Math.max(10, o * .38),
				marginLeft: p
			},
			title: `+${f} more`,
			children: ["+", f]
		})]
	});
}
//#endregion
export { u as a, s as i, d as n, l as o, f as r, o as t };
