import { t as e } from "./cn-DhjIN-s0.js";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
//#region src/components/shared/StatusPill.tsx
var r = {
	success: {
		pill: "bg-success-bg border-success-border",
		dot: "bg-success",
		text: "text-success-fg"
	},
	error: {
		pill: "bg-danger-bg border-danger-border",
		dot: "bg-danger",
		text: "text-danger-fg"
	},
	danger: {
		pill: "bg-danger-bg border-danger-border",
		dot: "bg-danger",
		text: "text-danger-fg"
	},
	warning: {
		pill: "bg-warning-bg border-warning-border",
		dot: "bg-warning",
		text: "text-warning-fg"
	},
	info: {
		pill: "bg-info-bg border-info-border",
		dot: "bg-info",
		text: "text-info-fg"
	},
	neutral: {
		pill: "bg-surface-hover border-border",
		dot: "bg-surface-emphasis",
		text: "text-text-primary"
	},
	pending: {
		pill: "bg-accent-bg border-accent-border",
		dot: "bg-accent",
		text: "text-accent-fg"
	}
}, i = {
	sm: "px-1.5 py-0.5 text-[10px] gap-1",
	md: "px-2.5 py-1 text-[12px] gap-1.5"
}, a = {
	sm: "text-[10px] gap-1",
	md: "text-[12px] gap-1.5"
}, o = {
	sm: "px-1.5 py-0.5 text-[11px] gap-1",
	md: "px-2 py-[5px] text-[13px] gap-1.5"
}, s = {
	sm: "w-1.5 h-1.5",
	md: "w-2 h-2"
};
function c({ state: c, tone: l, label: u, icon: d, meta: f, size: p = "md", variant: m = "pill", className: h, "data-testid": g }) {
	let _ = l ?? c ?? "neutral", v = r[_] ?? r.neutral ?? Object.values(r)[0], y = _ === "pending";
	return /* @__PURE__ */ n("span", {
		role: "status",
		"data-testid": g,
		"data-state": _,
		"data-variant": m,
		className: e("inline-flex items-center font-medium leading-none select-none", m === "pill" ? e("rounded-full border", v.pill, i[p]) : m === "tag" ? e("rounded-md border-0", v.pill, o[p]) : a[p], m === "tag" && _ === "neutral" ? "text-text-primary" : v.text, h),
		children: [
			m === "tag" ? null : d ? /* @__PURE__ */ t("span", {
				"aria-hidden": "true",
				className: "shrink-0",
				children: d
			}) : /* @__PURE__ */ n("span", {
				className: e("relative inline-flex shrink-0", s[p]),
				children: [y && /* @__PURE__ */ t("span", {
					"aria-hidden": "true",
					className: e("absolute inset-0 rounded-full animate-ping opacity-75", v.dot)
				}), /* @__PURE__ */ t("span", {
					"aria-hidden": "true",
					className: e("relative rounded-full", s[p], v.dot)
				})]
			}),
			u,
			f && /* @__PURE__ */ n("span", {
				"data-testid": g ? `${g}-meta` : void 0,
				className: "font-normal text-text-tertiary",
				children: [/* @__PURE__ */ t("span", {
					"aria-hidden": "true",
					children: "· "
				}), f]
			})
		]
	});
}
//#endregion
export { c as t };
