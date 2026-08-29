//#region src/components/shared/tones.ts
var e = [
	"neutral",
	"success",
	"warning",
	"danger",
	"info",
	"caution",
	"accent"
];
function t(e) {
	return e === "purple" ? "accent" : e;
}
var n = {
	neutral: "bg-neutral-bg text-neutral-fg",
	success: "bg-success-bg text-success-fg",
	warning: "bg-warning-bg text-warning-fg",
	danger: "bg-danger-bg text-danger-fg",
	info: "bg-info-bg text-info-fg",
	caution: "bg-caution-bg text-caution-fg",
	accent: "bg-accent-bg text-accent-fg"
}, r = {
	neutral: "bg-neutral text-white",
	success: "bg-success text-white",
	warning: "bg-warning text-white",
	danger: "bg-danger text-white",
	info: "bg-info text-white",
	caution: "bg-caution text-white",
	accent: "bg-accent text-white"
}, i = {
	neutral: "bg-neutral",
	success: "bg-success",
	warning: "bg-warning",
	danger: "bg-danger",
	info: "bg-info",
	caution: "bg-caution",
	accent: "bg-accent"
}, a = {
	neutral: "border-neutral-border",
	success: "border-success-border",
	warning: "border-warning-border",
	danger: "border-danger-border",
	info: "border-info-border",
	caution: "border-caution-border",
	accent: "border-accent-border"
}, o = {
	neutral: "text-neutral-fg",
	success: "text-success-fg",
	warning: "text-warning-fg",
	danger: "text-danger-fg",
	info: "text-info-fg",
	caution: "text-caution-fg",
	accent: "text-accent-fg"
}, s = {
	neutral: "bg-neutral-bg",
	success: "bg-success-bg",
	warning: "bg-warning-bg",
	danger: "bg-danger-bg",
	info: "bg-info-bg",
	caution: "bg-caution-bg",
	accent: "bg-accent-bg"
};
function c(e) {
	return `var(--color-${t(e)})`;
}
var l = {
	neutral: "bg-code-surface text-code-subtle",
	success: "bg-code-surface text-code-green",
	warning: "bg-code-surface text-code-peach",
	danger: "bg-code-surface text-code-red",
	info: "bg-code-surface text-code-blue",
	caution: "bg-code-surface text-code-yellow",
	accent: "bg-code-surface text-code-mauve"
}, u = {
	neutral: "bg-code-raised text-code-text",
	success: "bg-code-green text-code-bg",
	warning: "bg-code-peach text-code-bg",
	danger: "bg-code-red text-code-bg",
	info: "bg-code-blue text-code-bg",
	caution: "bg-code-yellow text-code-bg",
	accent: "bg-code-mauve text-code-bg"
}, d = {
	neutral: "bg-code-subtle",
	success: "bg-code-green",
	warning: "bg-code-peach",
	danger: "bg-code-red",
	info: "bg-code-blue",
	caution: "bg-code-yellow",
	accent: "bg-code-mauve"
}, f = {
	neutral: "text-code-subtle",
	success: "text-code-green",
	warning: "text-code-peach",
	danger: "text-code-red",
	info: "text-code-blue",
	caution: "text-code-yellow",
	accent: "text-code-mauve"
};
//#endregion
export { e as a, n as c, o as d, t as f, f as i, r as l, u as n, s as o, c as p, d as r, a as s, l as t, i as u };
