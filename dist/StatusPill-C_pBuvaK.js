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
	sm: "w-1.5 h-1.5",
	md: "w-2 h-2"
};
function s({ state: s, tone: c, label: l, icon: u, meta: d, size: f = "md", variant: p = "pill", className: m, "data-testid": h }) {
	let g = c ?? s ?? "neutral", _ = r[g] ?? r.neutral ?? Object.values(r)[0], v = g === "pending";
	return /* @__PURE__ */ n("span", {
		role: "status",
		"data-testid": h,
		"data-state": g,
		"data-variant": p,
		className: e("inline-flex items-center font-medium leading-none select-none", p === "pill" ? e("rounded-full border", _.pill, i[f]) : a[f], _.text, m),
		children: [
			u ? /* @__PURE__ */ t("span", {
				"aria-hidden": "true",
				className: "shrink-0",
				children: u
			}) : /* @__PURE__ */ n("span", {
				className: e("relative inline-flex shrink-0", o[f]),
				children: [v && /* @__PURE__ */ t("span", {
					"aria-hidden": "true",
					className: e("absolute inset-0 rounded-full animate-ping opacity-75", _.dot)
				}), /* @__PURE__ */ t("span", {
					"aria-hidden": "true",
					className: e("relative rounded-full", o[f], _.dot)
				})]
			}),
			l,
			d && /* @__PURE__ */ n("span", {
				"data-testid": h ? `${h}-meta` : void 0,
				className: "font-normal text-text-tertiary",
				children: [/* @__PURE__ */ t("span", {
					"aria-hidden": "true",
					children: "· "
				}), d]
			})
		]
	});
}
//#endregion
export { s as t };
