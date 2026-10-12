import { t as e } from "./cn-D4QmbyEy.js";
import { n as t } from "./Button-DZuk8L0q.js";
import { c as n, d as r, f as i, h as a, i as o, l as s, m as c, n as l, o as u, p as d, r as f, u as p } from "./overlayStack-D0Hf2ZrU.js";
import { jsx as m, jsxs as h } from "react/jsx-runtime";
//#region src/components/shared/Chip.tsx
var g = {
	surface: {
		soft: p,
		solid: r,
		translucent: c,
		swatch: i
	},
	code: {
		soft: l,
		solid: f,
		translucent: u,
		swatch: o
	}
}, _ = {
	lg: "rounded-md px-2.5 py-1 text-[14px] font-normal leading-5",
	md: "min-w-6 justify-center px-1.5 py-0.5 text-[12px] font-semibold leading-4 tabular-nums",
	sm: "px-2 py-0.5 text-[11px]",
	xs: "px-1.5 py-px text-[10px]"
}, v = {
	lg: "h-2 w-2",
	md: "h-1.5 w-1.5",
	sm: "h-1.5 w-1.5",
	xs: "h-1 w-1"
};
function y({ tone: r = "neutral", palette: i = "surface", size: o = "sm", solid: c = !1, translucent: l = !1, outline: u = !1, mono: f = !1, dot: p, uppercase: y = !1, icon: b, children: x, title: S, className: C, style: w, "data-testid": T, "aria-label": E, href: D, external: O = !1, onRemove: k, removeLabel: A = "Remove", removeTestId: j, removeIcon: M = "×" }) {
	let N = a(r), P = g[i] ?? g.surface, F = l ? P.translucent[N] : c ? P.solid[N] : u && i === "surface" ? e("border", u === "soft" ? n[N] : "bg-surface/60", s[N], d[N]) : P.soft[N], I = !!(p || b || k);
	return /* @__PURE__ */ h(D ? "a" : "span", {
		...D ? {
			href: D,
			target: O ? "_blank" : void 0,
			rel: "noopener noreferrer"
		} : {},
		"data-testid": T,
		"aria-label": E,
		title: S,
		className: e("inline-flex items-center rounded-sm font-semibold leading-[1.4] whitespace-nowrap", _[o], F, f && "font-mono", y && "uppercase tracking-wide", I && "gap-1", C),
		style: w,
		children: [
			p && /* @__PURE__ */ m("span", {
				"aria-hidden": !0,
				className: e("relative inline-block rounded-full shrink-0", v[o], P.swatch[N]),
				children: p === "pulse" && /* @__PURE__ */ m("span", {
					"aria-hidden": !0,
					className: e("absolute inset-0 rounded-full animate-ping opacity-70", P.swatch[N])
				})
			}),
			b && /* @__PURE__ */ m("span", {
				"aria-hidden": !0,
				className: "inline-flex shrink-0 [&_svg]:h-3 [&_svg]:w-3",
				children: b
			}),
			x,
			k && /* @__PURE__ */ m(t, {
				variant: "link",
				tone: i,
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
export { y as t };
