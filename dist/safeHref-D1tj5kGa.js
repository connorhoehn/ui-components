import { d as e, n as t } from "./Button-DQoeE5dN.js";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
//#region src/components/shared/tones.ts
var i = [
	"neutral",
	"success",
	"warning",
	"danger",
	"info",
	"caution",
	"accent"
];
function a(e) {
	return e === "purple" ? "accent" : e;
}
var o = {
	neutral: "bg-neutral-bg text-neutral-fg",
	success: "bg-success-bg text-success-fg",
	warning: "bg-warning-bg text-warning-fg",
	danger: "bg-danger-bg text-danger-fg",
	info: "bg-info-bg text-info-fg",
	caution: "bg-caution-bg text-caution-fg",
	accent: "bg-accent-bg text-accent-fg"
}, s = {
	neutral: "bg-neutral text-white",
	success: "bg-success text-white",
	warning: "bg-warning text-white",
	danger: "bg-danger text-white",
	info: "bg-info text-white",
	caution: "bg-caution text-white",
	accent: "bg-accent text-white"
}, c = {
	neutral: "bg-neutral",
	success: "bg-success",
	warning: "bg-warning",
	danger: "bg-danger",
	info: "bg-info",
	caution: "bg-caution",
	accent: "bg-accent"
}, l = {
	neutral: "bg-neutral/15 text-neutral-fg",
	success: "bg-success/15 text-success-fg",
	warning: "bg-warning/15 text-warning-fg",
	danger: "bg-danger/15 text-danger-fg",
	info: "bg-info/15 text-info-fg",
	caution: "bg-caution/15 text-caution-fg",
	accent: "bg-accent/15 text-accent-fg"
}, u = {
	neutral: "border-neutral-border",
	success: "border-success-border",
	warning: "border-warning-border",
	danger: "border-danger-border",
	info: "border-info-border",
	caution: "border-caution-border",
	accent: "border-accent-border"
}, d = {
	neutral: "text-neutral-fg",
	success: "text-success-fg",
	warning: "text-warning-fg",
	danger: "text-danger-fg",
	info: "text-info-fg",
	caution: "text-caution-fg",
	accent: "text-accent-fg"
}, f = {
	neutral: "bg-neutral-bg",
	success: "bg-success-bg",
	warning: "bg-warning-bg",
	danger: "bg-danger-bg",
	info: "bg-info-bg",
	caution: "bg-caution-bg",
	accent: "bg-accent-bg"
};
function p(e) {
	return `var(--color-${a(e)})`;
}
var m = {
	neutral: "bg-code-surface text-code-subtle",
	success: "bg-code-surface text-code-green",
	warning: "bg-code-surface text-code-peach",
	danger: "bg-code-surface text-code-red",
	info: "bg-code-surface text-code-blue",
	caution: "bg-code-surface text-code-yellow",
	accent: "bg-code-surface text-code-mauve"
}, h = {
	neutral: "bg-code-raised text-code-text",
	success: "bg-code-green text-code-bg",
	warning: "bg-code-peach text-code-bg",
	danger: "bg-code-red text-code-bg",
	info: "bg-code-blue text-code-bg",
	caution: "bg-code-yellow text-code-bg",
	accent: "bg-code-mauve text-code-bg"
}, g = {
	neutral: "bg-code-subtle/15 text-code-subtle",
	success: "bg-code-green/15 text-code-green",
	warning: "bg-code-peach/15 text-code-peach",
	danger: "bg-code-red/15 text-code-red",
	info: "bg-code-blue/15 text-code-blue",
	caution: "bg-code-yellow/15 text-code-yellow",
	accent: "bg-code-mauve/15 text-code-mauve"
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
		soft: o,
		solid: s,
		translucent: l,
		swatch: c
	},
	code: {
		soft: m,
		solid: h,
		translucent: g,
		swatch: _
	}
}, b = {
	lg: "rounded-md px-2.5 py-1 text-[14px] font-normal leading-5",
	md: "min-w-6 justify-center px-1.5 py-0.5 text-[12px] font-semibold leading-4 tabular-nums",
	sm: "px-2 py-0.5 text-[11px]",
	xs: "px-1.5 py-px text-[10px]"
}, x = {
	lg: "h-2 w-2",
	md: "h-1.5 w-1.5",
	sm: "h-1.5 w-1.5",
	xs: "h-1 w-1"
};
function S({ tone: i = "neutral", palette: o = "surface", size: s = "sm", solid: c = !1, translucent: l = !1, outline: p = !1, mono: m = !1, dot: h, uppercase: g = !1, icon: _, children: v, title: S, className: C, style: w, "data-testid": T, "aria-label": E, href: D, external: O = !1, onRemove: k, removeLabel: A = "Remove", removeTestId: j, removeIcon: M = "×" }) {
	let N = a(i), P = y[o] ?? y.surface, F = l ? P.translucent[N] : c ? P.solid[N] : p && o === "surface" ? e("border", p === "soft" ? f[N] : "bg-surface/60", u[N], d[N]) : P.soft[N], I = !!(h || _ || k);
	return /* @__PURE__ */ r(D ? "a" : "span", {
		...D ? {
			href: D,
			target: O ? "_blank" : void 0,
			rel: "noopener noreferrer"
		} : {},
		"data-testid": T,
		"aria-label": E,
		title: S,
		className: e("inline-flex items-center rounded-sm font-semibold leading-[1.4] whitespace-nowrap", b[s], F, m && "font-mono", g && "uppercase tracking-wide", I && "gap-1", C),
		style: w,
		children: [
			h && /* @__PURE__ */ n("span", {
				"aria-hidden": !0,
				className: e("relative inline-block rounded-full shrink-0", x[s], P.swatch[N]),
				children: h === "pulse" && /* @__PURE__ */ n("span", {
					"aria-hidden": !0,
					className: e("absolute inset-0 rounded-full animate-ping opacity-70", P.swatch[N])
				})
			}),
			_ && /* @__PURE__ */ n("span", {
				"aria-hidden": !0,
				className: "inline-flex shrink-0 [&_svg]:h-3 [&_svg]:w-3",
				children: _
			}),
			v,
			k && /* @__PURE__ */ n(t, {
				variant: "link",
				tone: o,
				onClick: (e) => {
					e.preventDefault(), e.stopPropagation(), k();
				},
				"aria-label": A,
				"data-testid": j,
				className: "ml-0.5 text-xs leading-none text-inherit no-underline hover:underline",
				children: M
			})
		]
	});
}
//#endregion
//#region src/lib/safeHref.ts
var C = /^(https?:|mailto:|tel:|sms:)/i, w = /[\u0000-\u001f\u007f\\]/;
function T(e) {
	if (!e) return null;
	let t = e.trim();
	if (!t || w.test(t) || t.startsWith("//")) return null;
	if (t.startsWith("/") || t.startsWith("#") || t.startsWith("?") || C.test(t)) return t;
	let n = t.search(/[/?#]/);
	return (n === -1 ? t : t.slice(0, n)).includes(":") ? null : t;
}
var E = /^data:(image\/(png|jpe?g|gif|webp|avif|bmp)|audio\/[\w.+-]+|video\/[\w.+-]+|application\/(pdf|octet-stream|zip|json)|text\/(plain|csv))[;,]/i;
function D(e) {
	if (!e) return null;
	let t = e.trim();
	return w.test(t) ? null : /^blob:/i.test(t) || E.test(t) ? t : T(t);
}
//#endregion
export { h as a, i as c, o as d, s as f, p as g, a as h, m as i, f as l, d as m, T as n, _ as o, c as p, S as r, v as s, D as t, u };
