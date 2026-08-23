import { t as e } from "./cn-DhjIN-s0.js";
import { forwardRef as t } from "react";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
//#region src/components/forms/Select.tsx
var i = {
	sm: "h-7 px-2 text-[12px]",
	md: "h-9 px-2.5 text-[13px]"
}, a = t(function({ options: t, groups: a, placeholder: o, size: s = "md", invalid: c = !1, disabled: l = !1, className: u, "data-testid": d, value: f, ...p }, m) {
	return /* @__PURE__ */ r("select", {
		ref: m,
		disabled: l,
		"data-testid": d,
		value: f,
		className: e("w-full appearance-none rounded-md border bg-surface-panel font-inherit text-text-primary", "outline-none transition-colors duration-150 cursor-pointer", "appearance-auto", "focus:bg-white focus:border-info focus:ring-1 focus:ring-info/40", "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-surface-hover", c ? "border-danger focus:border-danger focus:ring-danger/40" : "border-border-emphasis", i[s], u),
		...p,
		children: [
			o && /* @__PURE__ */ n("option", {
				value: "",
				disabled: !0,
				children: o
			}),
			t.map((e) => /* @__PURE__ */ n("option", {
				value: e.value,
				disabled: e.disabled,
				children: e.label
			}, e.value)),
			a?.map((e) => /* @__PURE__ */ n("optgroup", {
				label: e.label,
				children: e.options.map((e) => /* @__PURE__ */ n("option", {
					value: e.value,
					disabled: e.disabled,
					children: e.label
				}, e.value))
			}, e.label))
		]
	});
});
//#endregion
export { a as t };
