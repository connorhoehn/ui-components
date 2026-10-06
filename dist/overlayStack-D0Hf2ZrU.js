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
	neutral: "bg-neutral/15 text-neutral-fg",
	success: "bg-success/15 text-success-fg",
	warning: "bg-warning/15 text-warning-fg",
	danger: "bg-danger/15 text-danger-fg",
	info: "bg-info/15 text-info-fg",
	caution: "bg-caution/15 text-caution-fg",
	accent: "bg-accent/15 text-accent-fg"
}, l = {
	neutral: "border-neutral-border",
	success: "border-success-border",
	warning: "border-warning-border",
	danger: "border-danger-border",
	info: "border-info-border",
	caution: "border-caution-border",
	accent: "border-accent-border"
}, u = {
	neutral: "text-neutral-fg",
	success: "text-success-fg",
	warning: "text-warning-fg",
	danger: "text-danger-fg",
	info: "text-info-fg",
	caution: "text-caution-fg",
	accent: "text-accent-fg"
}, d = {
	neutral: "bg-neutral-bg",
	success: "bg-success-bg",
	warning: "bg-warning-bg",
	danger: "bg-danger-bg",
	info: "bg-info-bg",
	caution: "bg-caution-bg",
	accent: "bg-accent-bg"
};
function f(e) {
	return `var(--color-${i(e)})`;
}
var p = {
	neutral: "bg-code-surface text-code-subtle",
	success: "bg-code-surface text-code-green",
	warning: "bg-code-surface text-code-peach",
	danger: "bg-code-surface text-code-red",
	info: "bg-code-surface text-code-blue",
	caution: "bg-code-surface text-code-yellow",
	accent: "bg-code-surface text-code-mauve"
}, m = {
	neutral: "bg-code-raised text-code-text",
	success: "bg-code-green text-code-bg",
	warning: "bg-code-peach text-code-bg",
	danger: "bg-code-red text-code-bg",
	info: "bg-code-blue text-code-bg",
	caution: "bg-code-yellow text-code-bg",
	accent: "bg-code-mauve text-code-bg"
}, h = {
	neutral: "bg-code-subtle/15 text-code-subtle",
	success: "bg-code-green/15 text-code-green",
	warning: "bg-code-peach/15 text-code-peach",
	danger: "bg-code-red/15 text-code-red",
	info: "bg-code-blue/15 text-code-blue",
	caution: "bg-code-yellow/15 text-code-yellow",
	accent: "bg-code-mauve/15 text-code-mauve"
}, g = {
	neutral: "bg-code-subtle",
	success: "bg-code-green",
	warning: "bg-code-peach",
	danger: "bg-code-red",
	info: "bg-code-blue",
	caution: "bg-code-yellow",
	accent: "bg-code-mauve"
}, _ = {
	neutral: "text-code-subtle",
	success: "text-code-green",
	warning: "text-code-peach",
	danger: "text-code-red",
	info: "text-code-blue",
	caution: "text-code-yellow",
	accent: "text-code-mauve"
}, v = [];
function y(e) {
	v = v.filter((t) => t !== e), v.push(e);
}
function b(e) {
	v = v.filter((t) => t !== e);
}
function x(e) {
	return v.length === 0 || !v.includes(e) || v[v.length - 1] === e;
}
function S(r) {
	let i = n(null);
	i.current === null && (i.current = Symbol("overlay-layer"));
	let a = i.current;
	return t(() => {
		if (r) return y(a), () => b(a);
	}, [r, a]), e(() => x(a), [a]);
}
//#endregion
export { _ as a, d as c, o as d, s as f, f as g, i as h, g as i, l, c as m, p as n, h as o, u as p, m as r, r as s, S as t, a as u };
