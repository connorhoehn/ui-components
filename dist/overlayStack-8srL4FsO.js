import { useCallback as e, useEffect as t, useRef as n } from "react";
//#region src/components/shared/tones.ts
var r = [
	"neutral",
	"success",
	"warning",
	"danger",
	"info",
	"caution",
	"accent"
];
function i(e) {
	return e === "purple" ? "accent" : e;
}
var a = {
	neutral: "bg-neutral-bg text-neutral-fg",
	success: "bg-success-bg text-success-fg",
	warning: "bg-warning-bg text-warning-fg",
	danger: "bg-danger-bg text-danger-fg",
	info: "bg-info-bg text-info-fg",
	caution: "bg-caution-bg text-caution-fg",
	accent: "bg-accent-bg text-accent-fg"
}, o = {
	neutral: "bg-neutral text-white",
	success: "bg-success text-white",
	warning: "bg-warning text-white",
	danger: "bg-danger text-white",
	info: "bg-info text-white",
	caution: "bg-caution text-white",
	accent: "bg-accent text-white"
}, s = {
	neutral: "bg-neutral",
	success: "bg-success",
	warning: "bg-warning",
	danger: "bg-danger",
	info: "bg-info",
	caution: "bg-caution",
	accent: "bg-accent"
}, c = {
	neutral: "border-neutral-border",
	success: "border-success-border",
	warning: "border-warning-border",
	danger: "border-danger-border",
	info: "border-info-border",
	caution: "border-caution-border",
	accent: "border-accent-border"
}, l = {
	neutral: "text-neutral-fg",
	success: "text-success-fg",
	warning: "text-warning-fg",
	danger: "text-danger-fg",
	info: "text-info-fg",
	caution: "text-caution-fg",
	accent: "text-accent-fg"
}, u = {
	neutral: "bg-neutral-bg",
	success: "bg-success-bg",
	warning: "bg-warning-bg",
	danger: "bg-danger-bg",
	info: "bg-info-bg",
	caution: "bg-caution-bg",
	accent: "bg-accent-bg"
};
function d(e) {
	return `var(--color-${i(e)})`;
}
//#endregion
//#region src/lib/overlayStack.ts
var f = [];
function p(e) {
	f = f.filter((t) => t !== e), f.push(e);
}
function m(e) {
	f = f.filter((t) => t !== e);
}
function h(e) {
	return f.length === 0 || !f.includes(e) || f[f.length - 1] === e;
}
function g(r) {
	let i = n(null);
	i.current === null && (i.current = Symbol("overlay-layer"));
	let a = i.current;
	return t(() => {
		if (r) return p(a), () => m(a);
	}, [r, a]), e(() => h(a), [a]);
}
//#endregion
export { a, l as c, c as i, i as l, r as n, o, u as r, s, g as t, d as u };
