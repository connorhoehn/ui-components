import { t as e } from "./cn-DhjIN-s0.js";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
//#region src/components/shared/Banner.tsx
var r = {
	error: "bg-danger-bg border-danger-border text-danger-fg",
	warning: "bg-warning-bg border-warning-border text-warning-fg",
	info: "bg-info-bg border-info-border text-info-fg",
	success: "bg-success-bg border-success-border text-success-fg"
};
function i({ variant: i = "error", title: a, onDismiss: o, children: s, className: c, style: l, "data-testid": u }) {
	return /* @__PURE__ */ n("div", {
		role: i === "error" || i === "warning" ? "alert" : "status",
		"aria-live": i === "error" || i === "warning" ? "assertive" : "polite",
		"data-testid": u,
		className: e("px-3.5 py-2.5 rounded-lg text-[13px] flex items-center gap-2 border", r[i], c),
		style: l,
		children: [
			a && /* @__PURE__ */ t("strong", { children: a }),
			/* @__PURE__ */ t("span", {
				className: "flex-1",
				children: s
			}),
			o && /* @__PURE__ */ t("button", {
				type: "button",
				onClick: o,
				"aria-label": "Dismiss",
				className: "bg-transparent border-none text-current cursor-pointer text-base p-0 leading-none",
				children: "×"
			})
		]
	});
}
//#endregion
export { i as t };
