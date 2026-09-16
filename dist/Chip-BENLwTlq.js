import { t as e } from "./cn-DhjIN-s0.js";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
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
var f = {
	neutral: "bg-code-surface text-code-subtle",
	success: "bg-code-surface text-code-green",
	warning: "bg-code-surface text-code-peach",
	danger: "bg-code-surface text-code-red",
	info: "bg-code-surface text-code-blue",
	caution: "bg-code-surface text-code-yellow",
	accent: "bg-code-surface text-code-mauve"
}, p = {
	neutral: "bg-code-raised text-code-text",
	success: "bg-code-green text-code-bg",
	warning: "bg-code-peach text-code-bg",
	danger: "bg-code-red text-code-bg",
	info: "bg-code-blue text-code-bg",
	caution: "bg-code-yellow text-code-bg",
	accent: "bg-code-mauve text-code-bg"
}, m = {
	neutral: "bg-code-subtle",
	success: "bg-code-green",
	warning: "bg-code-peach",
	danger: "bg-code-red",
	info: "bg-code-blue",
	caution: "bg-code-yellow",
	accent: "bg-code-mauve"
}, h = {
	neutral: "text-code-subtle",
	success: "text-code-green",
	warning: "text-code-peach",
	danger: "text-code-red",
	info: "text-code-blue",
	caution: "text-code-yellow",
	accent: "text-code-mauve"
}, g = {
	surface: {
		soft: a,
		solid: o,
		swatch: s
	},
	code: {
		soft: f,
		solid: p,
		swatch: m
	}
}, _ = {
	sm: "px-2 py-0.5 text-[11px]",
	xs: "px-1.5 py-px text-[10px]"
}, v = {
	sm: "h-1.5 w-1.5",
	xs: "h-1 w-1"
};
function y({ tone: r = "neutral", palette: a = "surface", size: o = "sm", solid: s = !1, mono: c = !1, dot: l, uppercase: u = !1, icon: d, children: f, title: p, className: m, style: h, "data-testid": y, "aria-label": b, href: x, external: S = !1 }) {
	let C = i(r), w = g[a] ?? g.surface, T = s ? w.solid[C] : w.soft[C], E = !!(l || d);
	return /* @__PURE__ */ n(x ? "a" : "span", {
		...x ? {
			href: x,
			target: S ? "_blank" : void 0,
			rel: "noopener noreferrer"
		} : {},
		"data-testid": y,
		"aria-label": b,
		title: p,
		className: e("inline-flex items-center rounded-sm font-semibold leading-[1.4] whitespace-nowrap", _[o], T, c && "font-mono", u && "uppercase tracking-wide", E && "gap-1", m),
		style: h,
		children: [
			l && /* @__PURE__ */ t("span", {
				"aria-hidden": !0,
				className: e("relative inline-block rounded-full shrink-0", v[o], w.swatch[C]),
				children: l === "pulse" && /* @__PURE__ */ t("span", {
					"aria-hidden": !0,
					className: e("absolute inset-0 rounded-full animate-ping opacity-70", w.swatch[C])
				})
			}),
			d && /* @__PURE__ */ t("span", {
				"aria-hidden": !0,
				className: "inline-flex shrink-0 [&_svg]:h-3 [&_svg]:w-3",
				children: d
			}),
			f
		]
	});
}
//#endregion
export { h as a, c, s as d, l as f, m as i, a as l, d as m, f as n, r as o, i as p, p as r, u as s, y as t, o as u };
