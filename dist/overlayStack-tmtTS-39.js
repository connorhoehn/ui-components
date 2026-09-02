import { t as e } from "./cn-DhjIN-s0.js";
import { useCallback as t, useEffect as n, useRef as r } from "react";
import { jsx as i, jsxs as a } from "react/jsx-runtime";
//#region src/components/shared/tones.ts
var o = [
	"neutral",
	"success",
	"warning",
	"danger",
	"info",
	"caution",
	"accent"
];
function s(e) {
	return e === "purple" ? "accent" : e;
}
var c = {
	neutral: "bg-neutral-bg text-neutral-fg",
	success: "bg-success-bg text-success-fg",
	warning: "bg-warning-bg text-warning-fg",
	danger: "bg-danger-bg text-danger-fg",
	info: "bg-info-bg text-info-fg",
	caution: "bg-caution-bg text-caution-fg",
	accent: "bg-accent-bg text-accent-fg"
}, l = {
	neutral: "bg-neutral text-white",
	success: "bg-success text-white",
	warning: "bg-warning text-white",
	danger: "bg-danger text-white",
	info: "bg-info text-white",
	caution: "bg-caution text-white",
	accent: "bg-accent text-white"
}, u = {
	neutral: "bg-neutral",
	success: "bg-success",
	warning: "bg-warning",
	danger: "bg-danger",
	info: "bg-info",
	caution: "bg-caution",
	accent: "bg-accent"
}, d = {
	neutral: "border-neutral-border",
	success: "border-success-border",
	warning: "border-warning-border",
	danger: "border-danger-border",
	info: "border-info-border",
	caution: "border-caution-border",
	accent: "border-accent-border"
}, f = {
	neutral: "text-neutral-fg",
	success: "text-success-fg",
	warning: "text-warning-fg",
	danger: "text-danger-fg",
	info: "text-info-fg",
	caution: "text-caution-fg",
	accent: "text-accent-fg"
}, p = {
	neutral: "bg-neutral-bg",
	success: "bg-success-bg",
	warning: "bg-warning-bg",
	danger: "bg-danger-bg",
	info: "bg-info-bg",
	caution: "bg-caution-bg",
	accent: "bg-accent-bg"
};
function m(e) {
	return `var(--color-${s(e)})`;
}
var h = {
	neutral: "bg-code-surface text-code-subtle",
	success: "bg-code-surface text-code-green",
	warning: "bg-code-surface text-code-peach",
	danger: "bg-code-surface text-code-red",
	info: "bg-code-surface text-code-blue",
	caution: "bg-code-surface text-code-yellow",
	accent: "bg-code-surface text-code-mauve"
}, g = {
	neutral: "bg-code-raised text-code-text",
	success: "bg-code-green text-code-bg",
	warning: "bg-code-peach text-code-bg",
	danger: "bg-code-red text-code-bg",
	info: "bg-code-blue text-code-bg",
	caution: "bg-code-yellow text-code-bg",
	accent: "bg-code-mauve text-code-bg"
}, _ = {
	neutral: "bg-code-subtle",
	success: "bg-code-green",
	warning: "bg-code-peach",
	danger: "bg-code-red",
	info: "bg-code-blue",
	caution: "bg-code-yellow",
	accent: "bg-code-mauve"
}, v = {
	neutral: "text-code-subtle",
	success: "text-code-green",
	warning: "text-code-peach",
	danger: "text-code-red",
	info: "text-code-blue",
	caution: "text-code-yellow",
	accent: "text-code-mauve"
}, y = {
	surface: {
		soft: c,
		solid: l,
		swatch: u
	},
	code: {
		soft: h,
		solid: g,
		swatch: _
	}
}, b = {
	sm: "px-2 py-0.5 text-[11px]",
	xs: "px-1.5 py-px text-[10px]"
}, x = {
	sm: "h-1.5 w-1.5",
	xs: "h-1 w-1"
};
function S({ tone: t = "neutral", palette: n = "surface", size: r = "sm", solid: o = !1, mono: c = !1, dot: l, uppercase: u = !1, icon: d, children: f, title: p, className: m, style: h, "data-testid": g, "aria-label": _ }) {
	let v = s(t), S = y[n] ?? y.surface, C = o ? S.solid[v] : S.soft[v], w = !!(l || d);
	return /* @__PURE__ */ a("span", {
		"data-testid": g,
		"aria-label": _,
		title: p,
		className: e("inline-flex items-center rounded-sm font-semibold leading-[1.4] whitespace-nowrap", b[r], C, c && "font-mono", u && "uppercase tracking-wide", w && "gap-1", m),
		style: h,
		children: [
			l && /* @__PURE__ */ i("span", {
				"aria-hidden": !0,
				className: e("relative inline-block rounded-full shrink-0", x[r], S.swatch[v]),
				children: l === "pulse" && /* @__PURE__ */ i("span", {
					"aria-hidden": !0,
					className: e("absolute inset-0 rounded-full animate-ping opacity-70", S.swatch[v])
				})
			}),
			d && /* @__PURE__ */ i("span", {
				"aria-hidden": !0,
				className: "inline-flex shrink-0 [&_svg]:h-3 [&_svg]:w-3",
				children: d
			}),
			f
		]
	});
}
//#endregion
//#region src/lib/overlayStack.ts
var C = [];
function w(e) {
	C = C.filter((t) => t !== e), C.push(e);
}
function T(e) {
	C = C.filter((t) => t !== e);
}
function E(e) {
	return C.length === 0 || !C.includes(e) || C[C.length - 1] === e;
}
function D(e) {
	let i = r(null);
	i.current === null && (i.current = Symbol("overlay-layer"));
	let a = i.current;
	return n(() => {
		if (e) return w(a), () => T(a);
	}, [e, a]), t(() => E(a), [a]);
}
//#endregion
export { _ as a, p as c, l as d, u as f, m as h, g as i, d as l, s as m, S as n, v as o, f as p, h as r, o as s, D as t, c as u };
