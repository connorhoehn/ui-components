import { t as e } from "./cn-DhjIN-s0.js";
import { _ as t, d as n, f as r, h as i, i as a, m as o, n as s, o as c, r as l, u } from "./overlayStack-CHdlnODN.js";
import { jsx as d, jsxs as f } from "react/jsx-runtime";
//#region src/components/shared/Chip.tsx
var p = {
	surface: {
		soft: u,
		solid: n,
		translucent: o,
		swatch: r
	},
	code: {
		soft: s,
		solid: l,
		translucent: c,
		swatch: a
	}
}, m = {
	md: "min-w-6 justify-center px-1.5 py-0.5 text-[12px] font-semibold leading-4 tabular-nums",
	sm: "px-2 py-0.5 text-[11px]",
	xs: "px-1.5 py-px text-[10px]"
}, h = {
	md: "h-1.5 w-1.5",
	sm: "h-1.5 w-1.5",
	xs: "h-1 w-1"
};
function g({ tone: n = "neutral", palette: r = "surface", size: a = "sm", solid: o = !1, translucent: s = !1, mono: c = !1, dot: l, uppercase: u = !1, icon: g, children: _, title: v, className: y, style: b, "data-testid": x, "aria-label": S, href: C, external: w = !1, onRemove: T, removeLabel: E = "Remove", removeTestId: D, removeIcon: O = "×" }) {
	let k = i(n), A = p[r] ?? p.surface, j = s ? A.translucent[k] : o ? A.solid[k] : A.soft[k], M = !!(l || g || T);
	return /* @__PURE__ */ f(C ? "a" : "span", {
		...C ? {
			href: C,
			target: w ? "_blank" : void 0,
			rel: "noopener noreferrer"
		} : {},
		"data-testid": x,
		"aria-label": S,
		title: v,
		className: e("inline-flex items-center rounded-sm font-semibold leading-[1.4] whitespace-nowrap", m[a], j, c && "font-mono", u && "uppercase tracking-wide", M && "gap-1", y),
		style: b,
		children: [
			l && /* @__PURE__ */ d("span", {
				"aria-hidden": !0,
				className: e("relative inline-block rounded-full shrink-0", h[a], A.swatch[k]),
				children: l === "pulse" && /* @__PURE__ */ d("span", {
					"aria-hidden": !0,
					className: e("absolute inset-0 rounded-full animate-ping opacity-70", A.swatch[k])
				})
			}),
			g && /* @__PURE__ */ d("span", {
				"aria-hidden": !0,
				className: "inline-flex shrink-0 [&_svg]:h-3 [&_svg]:w-3",
				children: g
			}),
			_,
			T && /* @__PURE__ */ d(t, {
				variant: "link",
				tone: r,
				onClick: (e) => {
					e.preventDefault(), e.stopPropagation(), T();
				},
				"aria-label": E,
				"data-testid": D,
				className: "ml-0.5 text-xs leading-none text-inherit no-underline hover:underline",
				children: O
			})
		]
	});
}
//#endregion
export { g as t };
