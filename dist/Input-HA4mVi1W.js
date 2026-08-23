import { t as e } from "./cn-DhjIN-s0.js";
import { forwardRef as t } from "react";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
//#region src/components/forms/Input.tsx
var i = {
	sm: "h-7 px-2 text-[12px]",
	md: "h-9 px-2.5 text-[13px]"
}, a = {
	sm: "px-1.5",
	md: "px-2"
}, o = t(function({ type: t = "text", size: o = "md", prefix: s, suffix: c, invalid: l = !1, disabled: u = !1, mono: d = !1, className: f, "data-testid": p, ...m }, h) {
	let g = s != null, _ = c != null;
	return !g && !_ ? /* @__PURE__ */ n("input", {
		ref: h,
		type: t,
		disabled: u,
		"data-testid": p,
		className: e("w-full rounded-md border bg-surface-panel font-inherit text-text-primary", "outline-none transition-colors duration-150", "placeholder:text-text-tertiary", "focus:bg-white focus:border-info focus:ring-1 focus:ring-info/40", "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-surface-hover", l ? "border-danger focus:border-danger focus:ring-danger/40" : "border-border-emphasis", d && "font-mono", i[o], f),
		...m
	}) : /* @__PURE__ */ r("div", {
		className: e("relative flex w-full items-center rounded-md border bg-surface-panel", "transition-colors duration-150", "focus-within:bg-white focus-within:border-info focus-within:ring-1 focus-within:ring-info/40", l ? "border-danger focus-within:border-danger focus-within:ring-danger/40" : "border-border-emphasis", u && "opacity-50 cursor-not-allowed bg-surface-hover"),
		children: [
			g && /* @__PURE__ */ n("span", {
				"aria-hidden": "true",
				className: e("flex shrink-0 items-center text-text-tertiary", a[o]),
				children: s
			}),
			/* @__PURE__ */ n("input", {
				ref: h,
				type: t,
				disabled: u,
				"data-testid": p,
				className: e("flex-1 min-w-0 bg-transparent font-inherit text-text-primary outline-none", "placeholder:text-text-tertiary", "disabled:cursor-not-allowed", g ? "pl-0" : i[o].split(" ")[1], _ ? "pr-0" : i[o].split(" ")[2], o === "sm" ? "h-7 text-[12px]" : "h-9 text-[13px]", d && "font-mono", f),
				...m
			}),
			_ && /* @__PURE__ */ n("span", {
				"aria-hidden": "true",
				className: e("flex shrink-0 items-center text-text-tertiary", a[o]),
				children: c
			})
		]
	});
});
//#endregion
export { o as t };
