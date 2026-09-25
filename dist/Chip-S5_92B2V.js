import { t as e } from "./cn-DhjIN-s0.js";
import { a as t, d as n, g as r, l as i, m as a, n as o, p as s, r as c, t as l, u } from "./tones-CEbHiujQ.js";
import { jsx as d, jsxs as f } from "react/jsx-runtime";
//#region src/components/shared/Chip.tsx
var p = {
	surface: {
		soft: i,
		solid: u,
		translucent: s,
		swatch: n
	},
	code: {
		soft: l,
		solid: o,
		translucent: t,
		swatch: c
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
function g({ tone: t = "neutral", palette: n = "surface", size: i = "sm", solid: o = !1, translucent: s = !1, mono: c = !1, dot: l, uppercase: u = !1, icon: g, children: _, title: v, className: y, style: b, "data-testid": x, "aria-label": S, href: C, external: w = !1, onRemove: T, removeLabel: E = "Remove", removeTestId: D, removeIcon: O = "×" }) {
	let k = a(t), A = p[n] ?? p.surface, j = s ? A.translucent[k] : o ? A.solid[k] : A.soft[k], M = !!(l || g || T);
	return /* @__PURE__ */ f(C ? "a" : "span", {
		...C ? {
			href: C,
			target: w ? "_blank" : void 0,
			rel: "noopener noreferrer"
		} : {},
		"data-testid": x,
		"aria-label": S,
		title: v,
		className: e("inline-flex items-center rounded-sm font-semibold leading-[1.4] whitespace-nowrap", m[i], j, c && "font-mono", u && "uppercase tracking-wide", M && "gap-1", y),
		style: b,
		children: [
			l && /* @__PURE__ */ d("span", {
				"aria-hidden": !0,
				className: e("relative inline-block rounded-full shrink-0", h[i], A.swatch[k]),
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
			T && /* @__PURE__ */ d(r, {
				variant: "link",
				tone: n,
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
