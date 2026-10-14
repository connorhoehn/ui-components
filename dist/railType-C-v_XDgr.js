import { t as e } from "./cn-D4QmbyEy.js";
import { jsx as t } from "react/jsx-runtime";
//#region src/components/shared/railType.tsx
var n = "text-[14px] font-medium leading-5", r = "py-2", i = 36, a = "text-[12px] font-medium leading-4 tabular-nums text-text-tertiary", o = "text-[12px] font-semibold uppercase leading-4 tracking-wide", s = "text-text-secondary", c = "text-[12px] font-medium leading-4 normal-case tracking-normal tabular-nums text-text-tertiary", l = "py-2", u = "text-[12px] font-semibold uppercase tracking-[0.06em]", d = "bg-primary/8", f = {
	item: n,
	rowPadY: r,
	rowPitch: 36,
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
