import { t as e } from "./cn-D4QmbyEy.js";
import { forwardRef as t, useId as n } from "react";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
//#region src/components/forms/Slider.tsx
var a = t(function({ value: t, onChange: a, min: o = 0, max: s = 100, step: c = 1, "aria-label": l, readout: u = !0, disabled: d = !1, className: f, "data-testid": p }, m) {
	let h = n(), g = typeof u == "function" ? u(t) : String(t);
	return /* @__PURE__ */ i("div", {
		className: e("flex items-center gap-2", f),
		children: [/* @__PURE__ */ r("input", {
			"data-ui-part": "",
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
			"data-testid": p,
			"data-ui-control": "slider"
		}), u !== !1 && /* @__PURE__ */ r("output", {
			htmlFor: h,
			className: "text-xs text-text-secondary tabular-nums min-w-[2.5rem] text-right",
			children: g
		})]
	});
}), o = {
	sm: "w-7 h-4",
	md: "w-9 h-5"
}, s = {
	sm: "w-3 h-3",
	md: "w-4 h-4"
}, c = {
	sm: "translate-x-3",
	md: "translate-x-4"
};
function l({ checked: t, onChange: n, disabled: i = !1, size: a = "md", "aria-label": l, "aria-labelledby": u, className: d, style: f, "data-testid": p }) {
	return /* @__PURE__ */ r("button", {
		"data-ui-part": "",
		type: "button",
		role: "switch",
		"aria-checked": t,
		"aria-label": l,
		"aria-labelledby": u,
		disabled: i,
		"data-testid": p,
		"data-ui-control": "switch",
		onClick: () => {
			i || n(!t);
		},
		className: e("relative inline-flex items-center rounded-full border border-transparent transition-colors", "focus:outline-none focus-visible:ring-2 focus-visible:ring-info", o[a], t ? "bg-info" : "bg-surface-emphasis", i ? "opacity-50 cursor-not-allowed" : "cursor-pointer", d),
		style: f,
		children: /* @__PURE__ */ r("span", { className: e("inline-block rounded-full bg-white shadow transform transition-transform", s[a], t ? c[a] : "translate-x-0.5") })
	});
}
//#endregion
export { a as n, l as t };
