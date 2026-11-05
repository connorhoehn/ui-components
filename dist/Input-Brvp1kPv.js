import { t as e } from "./cn-D4QmbyEy.js";
import { r as t, s as n } from "./Button-C-I3BxWI.js";
import { forwardRef as r } from "react";
import { jsx as i, jsxs as a } from "react/jsx-runtime";
//#region src/components/forms/Input.tsx
var o = {
	sm: `${t.sm} px-2 text-xs`,
	md: `${t.md} px-2.5 text-sm`
}, s = {
	sm: "px-1.5",
	md: "px-2"
}, c = r(function({ type: r = "text", size: c, prefix: l, suffix: u, invalid: d = !1, disabled: f = !1, mono: p = !1, className: m, "data-testid": h, "aria-invalid": g, ..._ }, v) {
	let y = n(), b = c ?? (y === "compact" ? "sm" : "md"), x = l != null, S = u != null, C = g ?? (d || void 0);
	return !x && !S ? /* @__PURE__ */ i("input", {
		"data-ui-part": "",
		ref: v,
		type: r,
		disabled: f,
		"data-testid": h,
		"data-ui-control": "input",
		"aria-invalid": C,
		className: e("w-full rounded-md border bg-surface-panel font-inherit text-text-primary", "outline-none transition-colors duration-150", "placeholder:text-text-tertiary", "focus:bg-surface focus:border-info focus:ring-1 focus:ring-info/40", "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-surface-hover", d ? "border-danger focus:border-danger focus:ring-danger/40" : "border-border-emphasis", p && "font-mono", o[b], m),
		...p ? { "data-ui-text": "code" } : {},
		..._
	}) : /* @__PURE__ */ a("div", {
		className: e("relative flex w-full items-center rounded-md border bg-surface-panel", "transition-colors duration-150", "focus-within:bg-surface focus-within:border-info focus-within:ring-1 focus-within:ring-info/40", d ? "border-danger focus-within:border-danger focus-within:ring-danger/40" : "border-border-emphasis", f && "opacity-50 cursor-not-allowed bg-surface-hover"),
		children: [
			x && /* @__PURE__ */ i("span", {
				"aria-hidden": "true",
				className: e("flex shrink-0 items-center text-text-tertiary", s[b]),
				children: l
			}),
			/* @__PURE__ */ i("input", {
				"data-ui-part": "",
				ref: v,
				type: r,
				disabled: f,
				"data-testid": h,
				"data-ui-control": "input",
				"aria-invalid": C,
				className: e("flex-1 min-w-0 bg-transparent font-inherit text-text-primary outline-none", "placeholder:text-text-tertiary", "disabled:cursor-not-allowed", x ? "pl-0" : b === "sm" ? "pl-2" : "pl-2.5", S ? "pr-0" : b === "sm" ? "pr-2" : "pr-2.5", b === "sm" ? `${t.sm} text-xs` : `${t.md} text-sm`, p && "font-mono", m),
				...p ? { "data-ui-text": "code" } : {},
				..._
			}),
			S && /* @__PURE__ */ i("span", {
				"aria-hidden": "true",
				className: e("flex shrink-0 items-center text-text-tertiary", s[b]),
				children: u
			})
		]
	});
});
//#endregion
export { c as t };
