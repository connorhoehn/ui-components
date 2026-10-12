import { t as e } from "./cn-D4QmbyEy.js";
import { r as t, s as n } from "./Button-DZuk8L0q.js";
import { c as r, h as i, l as a, p as o } from "./overlayStack-D0Hf2ZrU.js";
import { forwardRef as s } from "react";
import { Fragment as c, jsx as l, jsxs as u } from "react/jsx-runtime";
//#region src/components/forms/Select.tsx
var d = {
	sm: `${t.sm} px-2 text-xs`,
	md: `${t.md} px-2.5 text-sm`
}, f = {
	sm: "h-6 pl-2 pr-4 text-[11px]",
	md: "h-7 pl-2.5 pr-5 text-[12px]"
}, p = {
	sm: "right-1.5",
	md: "right-2"
}, m = s(function({ options: t, groups: s, placeholder: m, size: h, variant: g = "default", tone: _ = "neutral", invalid: v = !1, disabled: y = !1, className: b, wrapperClassName: x, chevron: S = "native", "data-testid": C, "aria-invalid": w, value: T, ...E }, D) {
	let O = n(), k = h ?? (O === "compact" ? "sm" : "md"), A = w ?? (v || void 0), j = /* @__PURE__ */ u(c, { children: [
		m && /* @__PURE__ */ l("option", {
			value: "",
			disabled: !0,
			children: m
		}),
		t.map((e) => /* @__PURE__ */ l("option", {
			value: e.value,
			disabled: e.disabled,
			children: e.label
		}, e.value)),
		s?.map((e) => /* @__PURE__ */ l("optgroup", {
			label: e.label,
			children: e.options.map((e) => /* @__PURE__ */ l("option", {
				value: e.value,
				disabled: e.disabled,
				children: e.label
			}, e.value))
		}, e.label))
	] }), M = g === "pill", N = g === "ghost", P = i(_), F = /* @__PURE__ */ l("select", {
		ref: D,
		disabled: y,
		"data-testid": C,
		"aria-invalid": A,
		value: T,
		className: e("font-inherit outline-none transition-colors duration-150 cursor-pointer", M ? e("w-auto appearance-none rounded-full border font-semibold capitalize leading-[1.4]", "focus:ring-1 focus:ring-info/40 disabled:cursor-not-allowed", v ? "border-danger text-danger-fg bg-danger-bg focus:ring-danger/40" : e(a[P], r[P], o[P]), f[k]) : N ? e("w-auto max-w-full appearance-auto rounded-md border border-transparent bg-transparent text-right font-medium text-text-primary [text-align-last:right]", "hover:bg-surface-hover focus:border-info focus:ring-1 focus:ring-info/40", "disabled:opacity-50 disabled:cursor-not-allowed", v && "border-danger", d[k]) : e("w-full appearance-none rounded-md border bg-surface-panel text-text-primary", S === "custom" ? "appearance-none pr-8" : "appearance-auto", "focus:bg-surface focus:border-info focus:ring-1 focus:ring-info/40", "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-surface-hover", v ? "border-danger focus:border-danger focus:ring-danger/40" : "border-border-emphasis", d[k]), b),
		...E,
		children: j
	});
	return !M && !N && S === "custom" ? /* @__PURE__ */ u("span", {
		className: e("relative flex w-full items-center", x),
		children: [F, /* @__PURE__ */ l("svg", {
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
			className: e("pointer-events-none absolute right-3 top-1/2 -translate-y-1/2", v ? "text-danger-fg" : "text-text-secondary"),
			children: /* @__PURE__ */ l("path", { d: "M4 6l4 4 4-4" })
		})]
	}) : M ? /* @__PURE__ */ u("span", {
		className: e("relative inline-flex items-center align-middle", y && "opacity-50", x),
		children: [F, /* @__PURE__ */ l("svg", {
			"aria-hidden": "true",
			focusable: "false",
			width: "8",
			height: "5",
			viewBox: "0 0 8 5",
			className: e("pointer-events-none absolute top-1/2 -translate-y-1/2", p[k], v ? "text-danger-fg" : o[P]),
			children: /* @__PURE__ */ l("path", {
				d: "M0 0l4 5 4-5z",
				fill: "currentColor"
			})
		})]
	}) : F;
});
//#endregion
export { m as t };
