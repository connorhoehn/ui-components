import { t as e } from "./cn-DhjIN-s0.js";
import "react";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
//#region src/components/shared/InlineAlert.tsx
var r = {
	error: "bg-[var(--color-danger-bg,#fef2f2)] border-[var(--color-danger,#dc2626)] text-[var(--color-danger,#dc2626)]",
	success: "bg-[var(--color-success-bg,#f0fdf4)] border-[var(--color-success,#16a34a)] text-[var(--color-success,#16a34a)]",
	info: "bg-[var(--color-info-bg,#eff6ff)] border-[var(--color-info,#2563eb)] text-[var(--color-info,#2563eb)]",
	warning: "bg-[var(--color-warning-bg,#fffbeb)] border-[var(--color-warning,#f59e0b)] text-[var(--color-warning,#f59e0b)]"
}, i = {
	surface: r,
	code: {
		error: "bg-code-surface border-code-red text-code-red",
		success: "bg-code-surface border-code-green text-code-green",
		info: "bg-code-surface border-code-blue text-code-blue",
		warning: "bg-code-surface border-code-peach text-code-peach"
	}
};
function a({ tone: a, palette: o = "surface", children: s, onDismiss: c, className: l, "data-testid": u }) {
	return /* @__PURE__ */ n("div", {
		"data-testid": u,
		role: a === "error" || a === "warning" ? "alert" : "status",
		"aria-live": a === "error" || a === "warning" ? "assertive" : "polite",
		className: e("flex items-start gap-2 px-3 py-2 rounded-md border-l-[3px] text-sm", (i[o] ?? r)[a], l),
		children: [/* @__PURE__ */ t("span", {
			className: "flex-1",
			children: s
		}), c && /* @__PURE__ */ t("button", {
			type: "button",
			onClick: c,
			"aria-label": "Dismiss",
			className: "flex-shrink-0 opacity-70 hover:opacity-100",
			children: "✕"
		})]
	});
}
//#endregion
export { a as t };
