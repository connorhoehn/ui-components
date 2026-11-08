import { d as e } from "./Button-DQoeE5dN.js";
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
				className: "text-[14px] mb-2",
				"aria-hidden": !0,
				children: r
			}) : /* @__PURE__ */ t("div", {
				className: "mb-2",
				children: r
			})),
			/* @__PURE__ */ t("div", {
				className: "text-sm font-semibold text-danger-fg",
				children: i
			}),
			f && /* @__PURE__ */ t("div", {
				className: "text-sm text-center max-w-[340px] text-text-secondary leading-normal",
				children: f
			}),
			l ? /* @__PURE__ */ t("div", {
				className: "mt-2.5",
				children: l
			}) : s && c && /* @__PURE__ */ t("button", {
				"data-ui-part": "",
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
//#region src/components/shared/ThinkingDots.tsx
function i({ size: n = "md", className: r }) {
	return /* @__PURE__ */ t("span", {
		className: e("inline-flex items-center gap-1", r),
		"data-testid": "thinking-dots",
		children: [
			0,
			1,
			2
		].map((r) => /* @__PURE__ */ t("span", { className: e("ui-thinking-dot inline-block rounded-full bg-current", n === "sm" ? "h-1 w-1" : "h-1.5 w-1.5", r === 1 && "[animation-delay:200ms]", r === 2 && "[animation-delay:400ms]") }, r))
	});
}
//#endregion
//#region src/lib/safeHref.ts
var a = /^(https?:|mailto:)/i;
function o(e) {
	if (!e) return null;
	let t = e.trim();
	return t.startsWith("/") && t[1] !== "/" && t[1] !== "\\" || t.startsWith("#") || a.test(t) ? t : null;
}
//#endregion
export { i as n, r, o as t };
