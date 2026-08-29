import { t as e } from "./cn-DhjIN-s0.js";
import { c as t, f as n, l as r, n as i, r as a, t as o, u as s } from "./tones-C9hh8KQ3.js";
import { jsx as c, jsxs as l } from "react/jsx-runtime";
//#region src/components/shared/Chip.tsx
var u = {
	surface: {
		soft: t,
		solid: r,
		swatch: s
	},
	code: {
		soft: o,
		solid: i,
		swatch: a
	}
}, d = {
	sm: "px-2 py-0.5 text-[11px]",
	xs: "px-1.5 py-px text-[10px]"
}, f = {
	sm: "h-1.5 w-1.5",
	xs: "h-1 w-1"
};
function p({ tone: t = "neutral", palette: r = "surface", size: i = "sm", solid: a = !1, mono: o = !1, dot: s, uppercase: p = !1, icon: m, children: h, title: g, className: _, style: v, "data-testid": y, "aria-label": b }) {
	let x = n(t), S = u[r] ?? u.surface, C = a ? S.solid[x] : S.soft[x], w = !!(s || m);
	return /* @__PURE__ */ l("span", {
		"data-testid": y,
		"aria-label": b,
		title: g,
		className: e("inline-flex items-center rounded-sm font-semibold leading-[1.4] whitespace-nowrap", d[i], C, o && "font-mono", p && "uppercase tracking-wide", w && "gap-1", _),
		style: v,
		children: [
			s && /* @__PURE__ */ c("span", {
				"aria-hidden": !0,
				className: e("relative inline-block rounded-full shrink-0", f[i], S.swatch[x]),
				children: s === "pulse" && /* @__PURE__ */ c("span", {
					"aria-hidden": !0,
					className: e("absolute inset-0 rounded-full animate-ping opacity-70", S.swatch[x])
				})
			}),
			m && /* @__PURE__ */ c("span", {
				"aria-hidden": !0,
				className: "inline-flex shrink-0 [&_svg]:h-3 [&_svg]:w-3",
				children: m
			}),
			h
		]
	});
}
//#endregion
export { p as t };
