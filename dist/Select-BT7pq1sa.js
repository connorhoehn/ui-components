import { t as e } from "./cn-DhjIN-s0.js";
import { c as t, f as n, m as r, s as i } from "./tones-CEbHiujQ.js";
import { forwardRef as a } from "react";
import { Fragment as o, jsx as s, jsxs as c } from "react/jsx-runtime";
//#region src/components/forms/Select.tsx
var l = {
	sm: "h-7 px-2 text-[12px]",
	md: "h-9 px-2.5 text-[13px]"
}, u = {
	sm: "h-6 pl-2 pr-4 text-[11px]",
	md: "h-7 pl-2.5 pr-5 text-[12px]"
}, d = {
	sm: "right-1.5",
	md: "right-2"
}, f = a(function({ options: a, groups: f, placeholder: p, size: m = "md", variant: h = "default", tone: g = "neutral", invalid: _ = !1, disabled: v = !1, className: y, wrapperClassName: b, "data-testid": x, "aria-invalid": S, value: C, ...w }, T) {
	let E = S ?? (_ || void 0), D = /* @__PURE__ */ c(o, { children: [
		p && /* @__PURE__ */ s("option", {
			value: "",
			disabled: !0,
			children: p
		}),
		a.map((e) => /* @__PURE__ */ s("option", {
			value: e.value,
			disabled: e.disabled,
			children: e.label
		}, e.value)),
		f?.map((e) => /* @__PURE__ */ s("optgroup", {
			label: e.label,
			children: e.options.map((e) => /* @__PURE__ */ s("option", {
				value: e.value,
				disabled: e.disabled,
				children: e.label
			}, e.value))
		}, e.label))
	] }), O = h === "pill", k = h === "ghost", A = r(g), j = /* @__PURE__ */ s("select", {
		ref: T,
		disabled: v,
		"data-testid": x,
		"aria-invalid": E,
		value: C,
		className: e("font-inherit outline-none transition-colors duration-150 cursor-pointer", O ? e("w-auto appearance-none rounded-full border font-semibold capitalize leading-[1.4]", "focus:ring-1 focus:ring-info/40 disabled:cursor-not-allowed", _ ? "border-danger text-danger-fg bg-danger-bg focus:ring-danger/40" : e(t[A], i[A], n[A]), u[m]) : k ? e("w-auto max-w-full appearance-auto rounded-md border border-transparent bg-transparent text-right font-medium text-text-primary [text-align-last:right]", "hover:bg-surface-hover focus:border-info focus:ring-1 focus:ring-info/40", "disabled:opacity-50 disabled:cursor-not-allowed", _ && "border-danger", l[m]) : e("w-full appearance-none rounded-md border bg-surface-panel text-text-primary", "appearance-auto", "focus:bg-surface focus:border-info focus:ring-1 focus:ring-info/40", "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-surface-hover", _ ? "border-danger focus:border-danger focus:ring-danger/40" : "border-border-emphasis", l[m]), y),
		...w,
		children: D
	});
	return O ? /* @__PURE__ */ c("span", {
		className: e("relative inline-flex items-center align-middle", v && "opacity-50", b),
		children: [j, /* @__PURE__ */ s("svg", {
			"aria-hidden": "true",
			focusable: "false",
			width: "8",
			height: "5",
			viewBox: "0 0 8 5",
			className: e("pointer-events-none absolute top-1/2 -translate-y-1/2", d[m], _ ? "text-danger-fg" : n[A]),
			children: /* @__PURE__ */ s("path", {
				d: "M0 0l4 5 4-5z",
				fill: "currentColor"
			})
		})]
	}) : j;
});
//#endregion
export { f as t };
