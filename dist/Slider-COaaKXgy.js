import { d as e } from "./Button-DQoeE5dN.js";
import { forwardRef as t, useId as n } from "react";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
//#region src/components/forms/Slider.tsx
var a = t(function({ value: t, onChange: a, min: o = 0, max: s = 100, step: c = 1, "aria-label": l, "aria-valuetext": u, readout: d = !0, disabled: f = !1, className: p, "data-testid": m }, h) {
	let g = n(), _ = typeof d == "function" ? d(t) : String(t);
	return /* @__PURE__ */ i("div", {
		className: e("flex items-center gap-2", p),
		children: [/* @__PURE__ */ r("input", {
			"data-ui-part": "",
			ref: h,
			id: g,
			type: "range",
			min: o,
			max: s,
			step: c,
			value: t,
			disabled: f,
			"aria-label": l,
			"aria-valuetext": u,
			onChange: (e) => a(parseFloat(e.target.value)),
			className: "flex-1 w-full min-w-0 accent-primary cursor-pointer disabled:cursor-not-allowed",
			"data-testid": m,
			"data-ui-control": "slider"
		}), d !== !1 && /* @__PURE__ */ r("output", {
			htmlFor: g,
			className: "text-xs text-text-secondary tabular-nums min-w-[2.5rem] text-right",
			children: _
		})]
	});
});
//#endregion
export { a as t };
