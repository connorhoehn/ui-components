import { t as e } from "./cn-DhjIN-s0.js";
import { _ as t, d as n, f as r, h as i, i as a, l as o, m as s, n as c, o as l, p as u, r as d, u as f } from "./overlayStack-CHdlnODN.js";
import { jsx as p, jsxs as m } from "react/jsx-runtime";
//#region src/components/shared/Chip.tsx
var h = {
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
}, g = {
	md: "min-w-6 justify-center px-1.5 py-0.5 text-[12px] font-semibold leading-4 tabular-nums",
	sm: "px-2 py-0.5 text-[11px]",
	xs: "px-1.5 py-px text-[10px]"
}, _ = {
	md: "h-1.5 w-1.5",
	sm: "h-1.5 w-1.5",
	xs: "h-1 w-1"
};
function v({ tone: n = "neutral", palette: r = "surface", size: a = "sm", solid: s = !1, translucent: c = !1, outline: l = !1, mono: d = !1, dot: f, uppercase: v = !1, icon: y, children: b, title: x, className: S, style: C, "data-testid": w, "aria-label": T, href: E, external: D = !1, onRemove: O, removeLabel: k = "Remove", removeTestId: A, removeIcon: j = "×" }) {
	let M = i(n), N = h[r] ?? h.surface, P = c ? N.translucent[M] : s ? N.solid[M] : l && r === "surface" ? e("border bg-surface/60", o[M], u[M]) : N.soft[M], F = !!(f || y || O);
	return /* @__PURE__ */ m(E ? "a" : "span", {
		...E ? {
			href: E,
			target: D ? "_blank" : void 0,
			rel: "noopener noreferrer"
		} : {},
		"data-testid": w,
		"aria-label": T,
		title: x,
		className: e("inline-flex items-center rounded-sm font-semibold leading-[1.4] whitespace-nowrap", g[a], P, d && "font-mono", v && "uppercase tracking-wide", F && "gap-1", S),
		style: C,
		children: [
			f && /* @__PURE__ */ p("span", {
				"aria-hidden": !0,
				className: e("relative inline-block rounded-full shrink-0", _[a], N.swatch[M]),
				children: f === "pulse" && /* @__PURE__ */ p("span", {
					"aria-hidden": !0,
					className: e("absolute inset-0 rounded-full animate-ping opacity-70", N.swatch[M])
				})
			}),
			y && /* @__PURE__ */ p("span", {
				"aria-hidden": !0,
				className: "inline-flex shrink-0 [&_svg]:h-3 [&_svg]:w-3",
				children: y
			}),
			b,
			O && /* @__PURE__ */ p(t, {
				variant: "link",
				tone: r,
				onClick: (e) => {
					e.preventDefault(), e.stopPropagation(), O();
				},
				"aria-label": k,
				"data-testid": A,
				className: "ml-0.5 text-xs leading-none text-inherit no-underline hover:underline",
				children: j
			})
		]
	});
}
//#endregion
export { v as t };
