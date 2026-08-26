import { t as e } from "./cn-DhjIN-s0.js";
import { a as t, l as n, o as r, s as i } from "./overlayStack-8srL4FsO.js";
import { jsx as a, jsxs as o } from "react/jsx-runtime";
//#region src/components/shared/Chip.tsx
var s = {
	sm: "px-2 py-0.5 text-[11px]",
	xs: "px-1.5 py-px text-[10px]"
}, c = {
	sm: "h-1.5 w-1.5",
	xs: "h-1 w-1"
};
function l({ tone: l = "neutral", size: u = "sm", solid: d = !1, mono: f = !1, dot: p, uppercase: m = !1, icon: h, children: g, title: _, className: v, style: y, "data-testid": b, "aria-label": x }) {
	let S = n(l), C = d ? r[S] : t[S], w = !!(p || h);
	return /* @__PURE__ */ o("span", {
		"data-testid": b,
		"aria-label": x,
		title: _,
		className: e("inline-flex items-center rounded-sm font-semibold leading-[1.4] whitespace-nowrap", s[u], C, f && "font-mono", m && "uppercase tracking-wide", w && "gap-1", v),
		style: y,
		children: [
			p && /* @__PURE__ */ a("span", {
				"aria-hidden": !0,
				className: e("relative inline-block rounded-full shrink-0", c[u], i[S]),
				children: p === "pulse" && /* @__PURE__ */ a("span", {
					"aria-hidden": !0,
					className: e("absolute inset-0 rounded-full animate-ping opacity-70", i[S])
				})
			}),
			h && /* @__PURE__ */ a("span", {
				"aria-hidden": !0,
				className: "inline-flex shrink-0 [&_svg]:h-3 [&_svg]:w-3",
				children: h
			}),
			g
		]
	});
}
//#endregion
export { l as t };
