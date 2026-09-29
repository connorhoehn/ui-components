import { t as e } from "./cn-D4QmbyEy.js";
import { useCallback as t, useEffect as n, useRef as r } from "react";
import { jsx as i } from "react/jsx-runtime";
//#region src/components/ui/Button.tsx
var a = {
	primary: "bg-primary text-on-primary border-none hover:bg-primary-hover",
	secondary: "bg-surface-inset text-text-primary border border-border hover:bg-surface-hover",
	ghost: "bg-transparent text-text-primary border border-border hover:bg-surface-hover",
	danger: "bg-transparent text-danger-fg border border-danger-border hover:bg-danger-bg",
	"danger-solid": "bg-danger text-white border-none hover:bg-danger/90",
	success: "bg-transparent text-success-fg border border-success-border hover:bg-success-bg",
	info: "bg-info text-white border-none hover:bg-info/90",
	link: "bg-transparent text-primary border-none p-0 no-underline hover:underline"
}, o = {
	surface: a,
	code: {
		primary: "bg-code-blue text-code-bg border-none hover:bg-code-blue/90",
		secondary: "bg-code-surface text-code-text border border-code-border hover:bg-code-raised",
		ghost: "bg-transparent text-code-text border border-code-border hover:bg-code-surface",
		danger: "bg-transparent text-code-red border border-code-red/40 hover:bg-code-surface",
		"danger-solid": "bg-code-red text-code-bg border-none hover:bg-code-red/90",
		success: "bg-transparent text-code-green border border-code-green/40 hover:bg-code-surface",
		info: "bg-code-blue text-code-bg border-none hover:bg-code-blue/90",
		link: "bg-transparent text-code-blue border-none p-0 no-underline hover:underline"
	}
}, s = "font-semibold", c = {
	sm: "h-6.5 gap-1.5 px-2.5 text-xs",
	md: "h-9 gap-2 px-4 text-sm",
	lg: "h-10 gap-2 px-5 text-sm"
};
function l({ variant: t = "primary", size: n = "md", tone: r = "surface", disabled: l = !1, fullWidth: u = !1, children: d, type: f = "button", className: p, ref: m, ...h }) {
	let g = t === "link";
	return /* @__PURE__ */ i("button", {
		ref: m,
		type: f,
		disabled: l,
		"data-variant": t,
		"data-size": g ? void 0 : n,
		className: e(g ? "font-[inherit] transition-colors duration-150 ease-in-out" : "inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-md font-[inherit] transition-colors duration-150 ease-in-out", s, (o[r] ?? a)[t], !g && c[n], l && "opacity-50 cursor-not-allowed", !l && "cursor-pointer", u && "w-full", p),
		...h,
		children: d
	});
}
//#endregion
//#region src/components/shared/tones.ts
var u = [
	"neutral",
	"success",
	"warning",
	"danger",
	"info",
	"caution",
	"accent"
];
function d(e) {
	return e === "purple" ? "accent" : e;
}
var f = {
	neutral: "bg-neutral-bg text-neutral-fg",
	success: "bg-success-bg text-success-fg",
	warning: "bg-warning-bg text-warning-fg",
	danger: "bg-danger-bg text-danger-fg",
	info: "bg-info-bg text-info-fg",
	caution: "bg-caution-bg text-caution-fg",
	accent: "bg-accent-bg text-accent-fg"
}, p = {
	neutral: "bg-neutral text-white",
	success: "bg-success text-white",
	warning: "bg-warning text-white",
	danger: "bg-danger text-white",
	info: "bg-info text-white",
	caution: "bg-caution text-white",
	accent: "bg-accent text-white"
}, m = {
	neutral: "bg-neutral",
	success: "bg-success",
	warning: "bg-warning",
	danger: "bg-danger",
	info: "bg-info",
	caution: "bg-caution",
	accent: "bg-accent"
}, h = {
	neutral: "bg-neutral/15 text-neutral-fg",
	success: "bg-success/15 text-success-fg",
	warning: "bg-warning/15 text-warning-fg",
	danger: "bg-danger/15 text-danger-fg",
	info: "bg-info/15 text-info-fg",
	caution: "bg-caution/15 text-caution-fg",
	accent: "bg-accent/15 text-accent-fg"
}, g = {
	neutral: "border-neutral-border",
	success: "border-success-border",
	warning: "border-warning-border",
	danger: "border-danger-border",
	info: "border-info-border",
	caution: "border-caution-border",
	accent: "border-accent-border"
}, _ = {
	neutral: "text-neutral-fg",
	success: "text-success-fg",
	warning: "text-warning-fg",
	danger: "text-danger-fg",
	info: "text-info-fg",
	caution: "text-caution-fg",
	accent: "text-accent-fg"
}, v = {
	neutral: "bg-neutral-bg",
	success: "bg-success-bg",
	warning: "bg-warning-bg",
	danger: "bg-danger-bg",
	info: "bg-info-bg",
	caution: "bg-caution-bg",
	accent: "bg-accent-bg"
};
function y(e) {
	return `var(--color-${d(e)})`;
}
var b = {
	neutral: "bg-code-surface text-code-subtle",
	success: "bg-code-surface text-code-green",
	warning: "bg-code-surface text-code-peach",
	danger: "bg-code-surface text-code-red",
	info: "bg-code-surface text-code-blue",
	caution: "bg-code-surface text-code-yellow",
	accent: "bg-code-surface text-code-mauve"
}, x = {
	neutral: "bg-code-raised text-code-text",
	success: "bg-code-green text-code-bg",
	warning: "bg-code-peach text-code-bg",
	danger: "bg-code-red text-code-bg",
	info: "bg-code-blue text-code-bg",
	caution: "bg-code-yellow text-code-bg",
	accent: "bg-code-mauve text-code-bg"
}, S = {
	neutral: "bg-code-subtle/15 text-code-subtle",
	success: "bg-code-green/15 text-code-green",
	warning: "bg-code-peach/15 text-code-peach",
	danger: "bg-code-red/15 text-code-red",
	info: "bg-code-blue/15 text-code-blue",
	caution: "bg-code-yellow/15 text-code-yellow",
	accent: "bg-code-mauve/15 text-code-mauve"
}, C = {
	neutral: "bg-code-subtle",
	success: "bg-code-green",
	warning: "bg-code-peach",
	danger: "bg-code-red",
	info: "bg-code-blue",
	caution: "bg-code-yellow",
	accent: "bg-code-mauve"
}, w = {
	neutral: "text-code-subtle",
	success: "text-code-green",
	warning: "text-code-peach",
	danger: "text-code-red",
	info: "text-code-blue",
	caution: "text-code-yellow",
	accent: "text-code-mauve"
}, T = [];
function E(e) {
	T = T.filter((t) => t !== e), T.push(e);
}
function D(e) {
	T = T.filter((t) => t !== e);
}
function O(e) {
	return T.length === 0 || !T.includes(e) || T[T.length - 1] === e;
}
function k(e) {
	let i = r(null);
	i.current === null && (i.current = Symbol("overlay-layer"));
	let a = i.current;
	return n(() => {
		if (e) return E(a), () => D(a);
	}, [e, a]), t(() => O(a), [a]);
}
//#endregion
export { s as _, w as a, v as c, p as d, m as f, y as g, d as h, C as i, g as l, h as m, b as n, S as o, _ as p, x as r, u as s, k as t, f as u, l as v };
