import { t as e } from "./cn-DhjIN-s0.js";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
//#region src/components/shared/ErrorState.tsx
function r({ icon: r = "⚠️", title: i, body: a, description: o, actionLabel: s, onAction: c, action: l, testId: u = "error-state", actionTestId: d = "error-state-action" }) {
	let f = o ?? a;
	return /* @__PURE__ */ n("div", {
		role: "alert",
		"data-testid": u,
		className: e("flex flex-col items-center justify-center min-h-[220px]", "text-text-secondary gap-2 p-8 font-[inherit]"),
		children: [
			r && (typeof r == "string" ? /* @__PURE__ */ t("div", {
				className: "text-[52px] mb-2",
				"aria-hidden": !0,
				children: r
			}) : /* @__PURE__ */ t("div", {
				className: "mb-2",
				children: r
			})),
			/* @__PURE__ */ t("div", {
				className: "text-[17px] font-semibold text-[var(--color-state-error,#dc2626)]",
				children: i
			}),
			f && /* @__PURE__ */ t("div", {
				className: "text-[13px] text-center max-w-[340px] text-text-secondary leading-normal",
				children: f
			}),
			l ? /* @__PURE__ */ t("div", {
				className: "mt-2.5",
				children: l
			}) : s && c && /* @__PURE__ */ t("button", {
				"data-testid": d,
				onClick: c,
				type: "button",
				className: e("mt-2.5 px-[22px] py-[9px] text-sm font-semibold", "bg-surface text-text-primary border border-border rounded-lg cursor-pointer font-[inherit]", "hover:bg-surface-panel"),
				children: s
			})
		]
	});
}
//#endregion
export { r as t };
