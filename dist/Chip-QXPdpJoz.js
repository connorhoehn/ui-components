import { t as e } from "./cn-D4QmbyEy.js";
import { c as t, d as n, f as r, h as i, i as a, l as o, m as s, n as c, o as l, p as u, r as d, u as f, v as p } from "./overlayStack-DWxp7Rsz.js";
import { jsx as m, jsxs as h } from "react/jsx-runtime";
//#region src/components/shared/Chip.tsx
var g = {
	surface: {
		soft: f,
		solid: n,
		translucent: s,
		swatch: r
	},
	code: {
		soft: c,
		solid: d,
		translucent: l,
		swatch: a
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
function y({ tone: n = "neutral", palette: r = "surface", size: a = "sm", solid: s = !1, translucent: c = !1, outline: l = !1, mono: d = !1, dot: f, uppercase: y = !1, icon: b, children: x, title: S, className: C, style: w, "data-testid": T, "aria-label": E, href: D, external: O = !1, onRemove: k, removeLabel: A = "Remove", removeTestId: j, removeIcon: M = "×" }) {
	let N = i(n), P = g[r] ?? g.surface, F = c ? P.translucent[N] : s ? P.solid[N] : l && r === "surface" ? e("border", l === "soft" ? t[N] : "bg-surface/60", o[N], u[N]) : P.soft[N], I = !!(f || b || k);
	return /* @__PURE__ */ h(D ? "a" : "span", {
		...D ? {
			href: D,
			target: O ? "_blank" : void 0,
			rel: "noopener noreferrer"
		} : {},
		"data-testid": T,
		"aria-label": E,
		title: S,
		className: e("inline-flex items-center rounded-sm font-semibold leading-[1.4] whitespace-nowrap", _[a], F, d && "font-mono", y && "uppercase tracking-wide", I && "gap-1", C),
		style: w,
		children: [
			f && /* @__PURE__ */ m("span", {
				"aria-hidden": !0,
				className: e("relative inline-block rounded-full shrink-0", v[a], P.swatch[N]),
				children: f === "pulse" && /* @__PURE__ */ m("span", {
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
			k && /* @__PURE__ */ m(p, {
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
export { y as t };
