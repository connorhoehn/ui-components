import { t as e } from "./cn-DhjIN-s0.js";
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
}, s = {
	sm: "px-2.5 py-1 text-xs",
	md: "px-4 py-2 text-sm",
	lg: "px-5 py-2.5 text-sm"
};
function c({ variant: t = "primary", size: n = "md", tone: r = "surface", disabled: c = !1, fullWidth: l = !1, children: u, type: d = "button", className: f, ref: p, ...m }) {
	let h = t === "link";
	return /* @__PURE__ */ i("button", {
		ref: p,
		type: d,
		disabled: c,
		className: e(h ? "font-[inherit] transition-colors duration-150 ease-in-out" : "whitespace-nowrap font-semibold rounded-md font-[inherit] transition-colors duration-150 ease-in-out", (o[r] ?? a)[t], !h && s[n], c && "opacity-50 cursor-not-allowed", !c && "cursor-pointer", l && "w-full", f),
		...m,
		children: u
	});
}
//#endregion
//#region src/components/shared/tones.ts
var l = [
	"neutral",
	"success",
	"warning",
	"danger",
	"info",
	"caution",
	"accent"
];
function u(e) {
	return e === "purple" ? "accent" : e;
}
var d = {
	neutral: "bg-neutral-bg text-neutral-fg",
	success: "bg-success-bg text-success-fg",
	warning: "bg-warning-bg text-warning-fg",
	danger: "bg-danger-bg text-danger-fg",
	info: "bg-info-bg text-info-fg",
	caution: "bg-caution-bg text-caution-fg",
	accent: "bg-accent-bg text-accent-fg"
}, f = {
	neutral: "bg-neutral text-white",
	success: "bg-success text-white",
	warning: "bg-warning text-white",
	danger: "bg-danger text-white",
	info: "bg-info text-white",
	caution: "bg-caution text-white",
	accent: "bg-accent text-white"
}, p = {
	neutral: "bg-neutral",
	success: "bg-success",
	warning: "bg-warning",
	danger: "bg-danger",
	info: "bg-info",
	caution: "bg-caution",
	accent: "bg-accent"
}, m = {
	neutral: "bg-neutral/15 text-neutral-fg",
	success: "bg-success/15 text-success-fg",
	warning: "bg-warning/15 text-warning-fg",
	danger: "bg-danger/15 text-danger-fg",
	info: "bg-info/15 text-info-fg",
	caution: "bg-caution/15 text-caution-fg",
	accent: "bg-accent/15 text-accent-fg"
}, h = {
	neutral: "border-neutral-border",
	success: "border-success-border",
	warning: "border-warning-border",
	danger: "border-danger-border",
	info: "border-info-border",
	caution: "border-caution-border",
	accent: "border-accent-border"
}, g = {
	neutral: "text-neutral-fg",
	success: "text-success-fg",
	warning: "text-warning-fg",
	danger: "text-danger-fg",
	info: "text-info-fg",
	caution: "text-caution-fg",
	accent: "text-accent-fg"
}, _ = {
	neutral: "bg-neutral-bg",
	success: "bg-success-bg",
	warning: "bg-warning-bg",
	danger: "bg-danger-bg",
	info: "bg-info-bg",
	caution: "bg-caution-bg",
	accent: "bg-accent-bg"
};
function v(e) {
	return `var(--color-${u(e)})`;
}
var y = {
	neutral: "bg-code-surface text-code-subtle",
	success: "bg-code-surface text-code-green",
	warning: "bg-code-surface text-code-peach",
	danger: "bg-code-surface text-code-red",
	info: "bg-code-surface text-code-blue",
	caution: "bg-code-surface text-code-yellow",
	accent: "bg-code-surface text-code-mauve"
}, b = {
	neutral: "bg-code-raised text-code-text",
	success: "bg-code-green text-code-bg",
	warning: "bg-code-peach text-code-bg",
	danger: "bg-code-red text-code-bg",
	info: "bg-code-blue text-code-bg",
	caution: "bg-code-yellow text-code-bg",
	accent: "bg-code-mauve text-code-bg"
}, x = {
	neutral: "bg-code-subtle/15 text-code-subtle",
	success: "bg-code-green/15 text-code-green",
	warning: "bg-code-peach/15 text-code-peach",
	danger: "bg-code-red/15 text-code-red",
	info: "bg-code-blue/15 text-code-blue",
	caution: "bg-code-yellow/15 text-code-yellow",
	accent: "bg-code-mauve/15 text-code-mauve"
}, S = {
	neutral: "bg-code-subtle",
	success: "bg-code-green",
	warning: "bg-code-peach",
	danger: "bg-code-red",
	info: "bg-code-blue",
	caution: "bg-code-yellow",
	accent: "bg-code-mauve"
}, C = {
	neutral: "text-code-subtle",
	success: "text-code-green",
	warning: "text-code-peach",
	danger: "text-code-red",
	info: "text-code-blue",
	caution: "text-code-yellow",
	accent: "text-code-mauve"
}, w = [];
function T(e) {
	w = w.filter((t) => t !== e), w.push(e);
}
function E(e) {
	w = w.filter((t) => t !== e);
}
function D(e) {
	return w.length === 0 || !w.includes(e) || w[w.length - 1] === e;
}
function O(e) {
	let i = r(null);
	i.current === null && (i.current = Symbol("overlay-layer"));
	let a = i.current;
	return n(() => {
		if (e) return T(a), () => E(a);
	}, [e, a]), t(() => D(a), [a]);
}
//#endregion
export { c as _, C as a, _ as c, f as d, p as f, v as g, u as h, S as i, h as l, m, y as n, x as o, g as p, b as r, l as s, O as t, d as u };
