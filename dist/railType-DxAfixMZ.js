import { t as e } from "./cn-DhjIN-s0.js";
import { jsx as t } from "react/jsx-runtime";
//#region src/components/shared/railType.tsx
var n = "text-[15px] font-medium leading-[22px]", r = "py-[9px]", i = 40, a = "text-[13px] font-medium leading-5 tabular-nums text-text-tertiary", o = "text-[11px] font-semibold uppercase leading-4 tracking-wide", s = "text-text-secondary", c = "text-[11px] font-medium leading-4 normal-case tracking-normal tabular-nums text-text-tertiary", l = "py-2.5", u = "text-[13px] font-semibold uppercase tracking-[0.06em]", d = "bg-primary/8", f = {
	item: n,
	rowPadY: r,
	rowPitch: 40,
	itemCount: a,
	groupLabel: o,
	groupLabelInk: s,
	groupCount: c,
	groupPadY: l,
	caption: u,
	currentFill: d
};
function p({ open: n, className: r }) {
	return /* @__PURE__ */ t("svg", {
		viewBox: "0 0 16 16",
		width: "14",
		height: "14",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.75",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		"aria-hidden": "true",
		className: e("shrink-0 transition-transform duration-150", n ? "" : "-rotate-90", r),
		children: /* @__PURE__ */ t("path", { d: "M4 6l4 4 4-4" })
	});
}
//#endregion
export { s as a, n as c, p as d, f, o as i, r as l, d as n, l as o, c as r, a as s, u as t, i as u };
