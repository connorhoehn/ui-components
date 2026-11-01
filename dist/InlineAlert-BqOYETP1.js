import { t as e } from "./cn-D4QmbyEy.js";
import { l as t, u as n } from "./overlayStack-DxIDMUs-.js";
import "react";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
//#region src/components/shared/InlineAlert.tsx
var a = {
	error: "danger",
	success: "success",
	info: "info",
	warning: "warning"
}, o = {
	error: "bg-code-surface border-code-red text-code-red",
	success: "bg-code-surface border-code-green text-code-green",
	info: "bg-code-surface border-code-blue text-code-blue",
	warning: "bg-code-surface border-code-peach text-code-peach"
};
function s({ tone: s, palette: c = "surface", children: l, onDismiss: u, className: d, "data-testid": f }) {
	return /* @__PURE__ */ i("div", {
		"data-testid": f,
		role: s === "error" || s === "warning" ? "alert" : "status",
		"aria-live": s === "error" || s === "warning" ? "assertive" : "polite",
		className: e("flex items-start gap-2 px-3 py-2 rounded-md border-l-[3px] text-sm", c === "code" ? o[s] : e(n[a[s]], t[a[s]]), d),
		children: [/* @__PURE__ */ r("span", {
			className: "flex-1",
			children: l
		}), u && /* @__PURE__ */ r("button", {
			type: "button",
			onClick: u,
			"aria-label": "Dismiss",
			className: "flex-shrink-0 opacity-70 hover:opacity-100",
			children: "✕"
		})]
	});
}
//#endregion
export { s as t };
