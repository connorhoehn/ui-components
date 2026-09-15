import { t as e } from "./cn-DhjIN-s0.js";
import { forwardRef as t, useId as n } from "react";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
//#region src/components/forms/Slider.tsx
var a = t(function({ value: t, onChange: a, min: o = 0, max: s = 100, step: c = 1, "aria-label": l, readout: u = !0, disabled: d = !1, className: f, "data-testid": p }, m) {
	let h = n(), g = typeof u == "function" ? u(t) : String(t);
	return /* @__PURE__ */ i("div", {
		className: e("flex items-center gap-2", f),
		children: [/* @__PURE__ */ r("input", {
			ref: m,
			id: h,
			type: "range",
			min: o,
			max: s,
			step: c,
			value: t,
			disabled: d,
			"aria-label": l,
			onChange: (e) => a(parseFloat(e.target.value)),
			className: "flex-1 w-full min-w-0 accent-primary cursor-pointer disabled:cursor-not-allowed",
			"data-testid": p
		}), u !== !1 && /* @__PURE__ */ r("output", {
			htmlFor: h,
			className: "text-xs text-text-secondary tabular-nums min-w-[2.5rem] text-right",
			children: g
		})]
	});
});
//#endregion
export { a as t };
