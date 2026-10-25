import { t as e } from "./cn-D4QmbyEy.js";
import { n as t } from "./Button-C-I3BxWI.js";
import { useCallback as n, useEffect as r, useRef as i } from "react";
import { jsx as a, jsxs as o } from "react/jsx-runtime";
//#region src/components/shared/tones.ts
var s = [
	"neutral",
	"success",
	"warning",
	"danger",
	"info",
	"caution",
	"accent"
];
function c(e) {
	return e === "purple" ? "accent" : e;
}
var l = {
	neutral: "bg-neutral-bg text-neutral-fg",
	success: "bg-success-bg text-success-fg",
	warning: "bg-warning-bg text-warning-fg",
	danger: "bg-danger-bg text-danger-fg",
	info: "bg-info-bg text-info-fg",
	caution: "bg-caution-bg text-caution-fg",
	accent: "bg-accent-bg text-accent-fg"
}, u = {
	neutral: "bg-neutral text-white",
	success: "bg-success text-white",
	warning: "bg-warning text-white",
	danger: "bg-danger text-white",
	info: "bg-info text-white",
	caution: "bg-caution text-white",
	accent: "bg-accent text-white"
}, d = {
	neutral: "bg-neutral",
	success: "bg-success",
	warning: "bg-warning",
	danger: "bg-danger",
	info: "bg-info",
	caution: "bg-caution",
	accent: "bg-accent"
}, f = {
	neutral: "bg-neutral/15 text-neutral-fg",
	success: "bg-success/15 text-success-fg",
	warning: "bg-warning/15 text-warning-fg",
	danger: "bg-danger/15 text-danger-fg",
	info: "bg-info/15 text-info-fg",
	caution: "bg-caution/15 text-caution-fg",
	accent: "bg-accent/15 text-accent-fg"
}, p = {
	neutral: "border-neutral-border",
	success: "border-success-border",
	warning: "border-warning-border",
	danger: "border-danger-border",
	info: "border-info-border",
	caution: "border-caution-border",
	accent: "border-accent-border"
}, m = {
	neutral: "text-neutral-fg",
	success: "text-success-fg",
	warning: "text-warning-fg",
	danger: "text-danger-fg",
	info: "text-info-fg",
	caution: "text-caution-fg",
	accent: "text-accent-fg"
}, h = {
	neutral: "bg-neutral-bg",
	success: "bg-success-bg",
	warning: "bg-warning-bg",
	danger: "bg-danger-bg",
	info: "bg-info-bg",
	caution: "bg-caution-bg",
	accent: "bg-accent-bg"
};
function g(e) {
	return `var(--color-${c(e)})`;
}
var _ = {
	neutral: "bg-code-surface text-code-subtle",
	success: "bg-code-surface text-code-green",
	warning: "bg-code-surface text-code-peach",
	danger: "bg-code-surface text-code-red",
	info: "bg-code-surface text-code-blue",
	caution: "bg-code-surface text-code-yellow",
	accent: "bg-code-surface text-code-mauve"
}, v = {
	neutral: "bg-code-raised text-code-text",
	success: "bg-code-green text-code-bg",
	warning: "bg-code-peach text-code-bg",
	danger: "bg-code-red text-code-bg",
	info: "bg-code-blue text-code-bg",
	caution: "bg-code-yellow text-code-bg",
	accent: "bg-code-mauve text-code-bg"
}, y = {
	neutral: "bg-code-subtle/15 text-code-subtle",
	success: "bg-code-green/15 text-code-green",
	warning: "bg-code-peach/15 text-code-peach",
	danger: "bg-code-red/15 text-code-red",
	info: "bg-code-blue/15 text-code-blue",
	caution: "bg-code-yellow/15 text-code-yellow",
	accent: "bg-code-mauve/15 text-code-mauve"
}, b = {
	neutral: "bg-code-subtle",
	success: "bg-code-green",
	warning: "bg-code-peach",
	danger: "bg-code-red",
	info: "bg-code-blue",
	caution: "bg-code-yellow",
	accent: "bg-code-mauve"
}, x = {
	neutral: "text-code-subtle",
	success: "text-code-green",
	warning: "text-code-peach",
	danger: "text-code-red",
	info: "text-code-blue",
	caution: "text-code-yellow",
	accent: "text-code-mauve"
}, S = {
	surface: {
		soft: l,
		solid: u,
		translucent: f,
		swatch: d
	},
	code: {
		soft: _,
		solid: v,
		translucent: y,
		swatch: b
	}
}, C = {
	lg: "rounded-md px-2.5 py-1 text-[14px] font-normal leading-5",
	md: "min-w-6 justify-center px-1.5 py-0.5 text-[12px] font-semibold leading-4 tabular-nums",
	sm: "px-2 py-0.5 text-[11px]",
	xs: "px-1.5 py-px text-[10px]"
}, w = {
	lg: "h-2 w-2",
	md: "h-1.5 w-1.5",
	sm: "h-1.5 w-1.5",
	xs: "h-1 w-1"
};
function T({ tone: n = "neutral", palette: r = "surface", size: i = "sm", solid: s = !1, translucent: l = !1, outline: u = !1, mono: d = !1, dot: f, uppercase: g = !1, icon: _, children: v, title: y, className: b, style: x, "data-testid": T, "aria-label": E, href: D, external: O = !1, onRemove: k, removeLabel: A = "Remove", removeTestId: j, removeIcon: M = "×" }) {
	let N = c(n), P = S[r] ?? S.surface, F = l ? P.translucent[N] : s ? P.solid[N] : u && r === "surface" ? e("border", u === "soft" ? h[N] : "bg-surface/60", p[N], m[N]) : P.soft[N], I = !!(f || _ || k);
	return /* @__PURE__ */ o(D ? "a" : "span", {
		...D ? {
			href: D,
			target: O ? "_blank" : void 0,
			rel: "noopener noreferrer"
		} : {},
		"data-testid": T,
		"aria-label": E,
		title: y,
		className: e("inline-flex items-center rounded-sm font-semibold leading-[1.4] whitespace-nowrap", C[i], F, d && "font-mono", g && "uppercase tracking-wide", I && "gap-1", b),
		style: x,
		children: [
			f && /* @__PURE__ */ a("span", {
				"aria-hidden": !0,
				className: e("relative inline-block rounded-full shrink-0", w[i], P.swatch[N]),
				children: f === "pulse" && /* @__PURE__ */ a("span", {
					"aria-hidden": !0,
					className: e("absolute inset-0 rounded-full animate-ping opacity-70", P.swatch[N])
				})
			}),
			_ && /* @__PURE__ */ a("span", {
				"aria-hidden": !0,
				className: "inline-flex shrink-0 [&_svg]:h-3 [&_svg]:w-3",
				children: _
			}),
			v,
			k && /* @__PURE__ */ a(t, {
				variant: "link",
				tone: r,
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
//#region src/lib/overlayStack.ts
var E = [];
function D(e) {
	E = E.filter((t) => t !== e), E.push(e);
}
function O(e) {
	E = E.filter((t) => t !== e);
}
function k(e) {
	return E.length === 0 || !E.includes(e) || E[E.length - 1] === e;
}
function A(e) {
	let t = i(null);
	t.current === null && (t.current = Symbol("overlay-layer"));
	let a = t.current;
	return r(() => {
		if (e) return D(a), () => O(a);
	}, [e, a]), n(() => k(a), [a]);
}
//#endregion
export { b as a, h as c, u as d, d as f, g as h, v as i, p as l, c as m, T as n, x as o, m as p, _ as r, s, A as t, l as u };
