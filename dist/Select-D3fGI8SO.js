import { t as e } from "./cn-DhjIN-s0.js";
import { c as t, h as n, l as r, p as i } from "./overlayStack-CHdlnODN.js";
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
}, f = a(function({ options: a, groups: f, placeholder: p, size: m = "md", variant: h = "default", tone: g = "neutral", invalid: _ = !1, disabled: v = !1, className: y, wrapperClassName: b, chevron: x = "native", "data-testid": S, "aria-invalid": C, value: w, ...T }, E) {
	let D = C ?? (_ || void 0), O = /* @__PURE__ */ c(o, { children: [
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
	] }), k = h === "pill", A = h === "ghost", j = n(g), M = /* @__PURE__ */ s("select", {
		ref: E,
		disabled: v,
		"data-testid": S,
		"aria-invalid": D,
		value: w,
		className: e("font-inherit outline-none transition-colors duration-150 cursor-pointer", k ? e("w-auto appearance-none rounded-full border font-semibold capitalize leading-[1.4]", "focus:ring-1 focus:ring-info/40 disabled:cursor-not-allowed", _ ? "border-danger text-danger-fg bg-danger-bg focus:ring-danger/40" : e(r[j], t[j], i[j]), u[m]) : A ? e("w-auto max-w-full appearance-auto rounded-md border border-transparent bg-transparent text-right font-medium text-text-primary [text-align-last:right]", "hover:bg-surface-hover focus:border-info focus:ring-1 focus:ring-info/40", "disabled:opacity-50 disabled:cursor-not-allowed", _ && "border-danger", l[m]) : e("w-full appearance-none rounded-md border bg-surface-panel text-text-primary", x === "custom" ? "appearance-none pr-8" : "appearance-auto", "focus:bg-surface focus:border-info focus:ring-1 focus:ring-info/40", "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-surface-hover", _ ? "border-danger focus:border-danger focus:ring-danger/40" : "border-border-emphasis", l[m]), y),
		...T,
		children: O
	});
	return !k && !A && x === "custom" ? /* @__PURE__ */ c("span", {
		className: e("relative flex w-full items-center", b),
		children: [M, /* @__PURE__ */ s("svg", {
			"aria-hidden": "true",
			focusable: "false",
			width: "14",
			height: "14",
			viewBox: "0 0 16 16",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "1.6",
			strokeLinecap: "round",
			strokeLinejoin: "round",
			className: e("pointer-events-none absolute right-3 top-1/2 -translate-y-1/2", _ ? "text-danger-fg" : "text-text-secondary"),
			children: /* @__PURE__ */ s("path", { d: "M4 6l4 4 4-4" })
		})]
	}) : k ? /* @__PURE__ */ c("span", {
		className: e("relative inline-flex items-center align-middle", v && "opacity-50", b),
		children: [M, /* @__PURE__ */ s("svg", {
			"aria-hidden": "true",
			focusable: "false",
			width: "8",
			height: "5",
			viewBox: "0 0 8 5",
			className: e("pointer-events-none absolute top-1/2 -translate-y-1/2", d[m], _ ? "text-danger-fg" : i[j]),
			children: /* @__PURE__ */ s("path", {
				d: "M0 0l4 5 4-5z",
				fill: "currentColor"
			})
		})]
	}) : M;
});
//#endregion
export { f as t };
