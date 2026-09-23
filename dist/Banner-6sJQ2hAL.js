import { t as e } from "./cn-DhjIN-s0.js";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
//#region src/components/shared/Banner.tsx
var r = {
	error: "bg-danger-bg border-danger-border text-danger-fg",
	warning: "bg-warning-bg border-warning-border text-warning-fg",
	info: "bg-info-bg border-info-border text-info-fg",
	success: "bg-success-bg border-success-border text-success-fg"
};
function i({ variant: i = "error", title: a, layout: o = "inline", onDismiss: s, action: c, children: l, className: u, style: d, "data-testid": f }) {
	return /* @__PURE__ */ n("div", {
		role: i === "error" || i === "warning" ? "alert" : "status",
		"aria-live": i === "error" || i === "warning" ? "assertive" : "polite",
		"data-testid": f,
		className: e("px-3.5 py-2.5 rounded-lg text-[13px] flex gap-2 border", o === "stacked" ? "flex-col items-start gap-1" : "items-center", r[i], u),
		style: d,
		children: [
			a && /* @__PURE__ */ t("strong", { children: a }),
			/* @__PURE__ */ t("span", {
				className: o === "stacked" ? "w-full" : "flex-1",
				children: l
			}),
			c && /* @__PURE__ */ t("span", {
				className: "shrink-0 flex items-center gap-2",
				children: c
			}),
			s && /* @__PURE__ */ t("button", {
				type: "button",
				onClick: s,
				"aria-label": "Dismiss",
				className: "bg-transparent border-none text-current cursor-pointer text-base p-0 leading-none",
				children: "×"
			})
		]
	});
}
//#endregion
export { i as t };
