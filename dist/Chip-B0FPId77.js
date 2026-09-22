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
}, v = {
	surface: {
		soft: a,
		solid: o,
		translucent: c,
		swatch: s
	},
	code: {
		soft: p,
		solid: m,
		translucent: h,
		swatch: g
	}
}, y = {
	sm: "px-2 py-0.5 text-[11px]",
	xs: "px-1.5 py-px text-[10px]"
}, b = {
	sm: "h-1.5 w-1.5",
	xs: "h-1 w-1"
};
function x({ tone: r = "neutral", palette: a = "surface", size: o = "sm", solid: s = !1, translucent: c = !1, mono: l = !1, dot: u, uppercase: d = !1, icon: f, children: p, title: m, className: h, style: g, "data-testid": _, "aria-label": x, href: S, external: C = !1 }) {
	let w = i(r), T = v[a] ?? v.surface, E = c ? T.translucent[w] : s ? T.solid[w] : T.soft[w], D = !!(u || f);
	return /* @__PURE__ */ n(S ? "a" : "span", {
		...S ? {
			href: S,
			target: C ? "_blank" : void 0,
			rel: "noopener noreferrer"
		} : {},
		"data-testid": _,
		"aria-label": x,
		title: m,
		className: e("inline-flex items-center rounded-sm font-semibold leading-[1.4] whitespace-nowrap", y[o], E, l && "font-mono", d && "uppercase tracking-wide", D && "gap-1", h),
		style: g,
		children: [
			u && /* @__PURE__ */ t("span", {
				"aria-hidden": !0,
				className: e("relative inline-block rounded-full shrink-0", b[o], T.swatch[w]),
				children: u === "pulse" && /* @__PURE__ */ t("span", {
					"aria-hidden": !0,
					className: e("absolute inset-0 rounded-full animate-ping opacity-70", T.swatch[w])
				})
			}),
			f && /* @__PURE__ */ t("span", {
				"aria-hidden": !0,
				className: "inline-flex shrink-0 [&_svg]:h-3 [&_svg]:w-3",
				children: f
			}),
			p
		]
	});
}
//#endregion
export { _ as a, l as c, s as d, u as f, g as i, a as l, f as m, p as n, r as o, i as p, m as r, d as s, x as t, o as u };
