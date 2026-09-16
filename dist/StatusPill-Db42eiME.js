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
	sm: "w-1.5 h-1.5",
	md: "w-2 h-2"
};
function o({ state: o, label: s, icon: c, size: l = "md", className: u, "data-testid": d }) {
	let f = r[o] ?? r.neutral ?? Object.values(r)[0], p = o === "pending";
	return /* @__PURE__ */ n("span", {
		role: "status",
		"data-testid": d,
		"data-state": o,
		className: e("inline-flex items-center rounded-full border font-medium leading-none select-none", f.pill, f.text, i[l], u),
		children: [c ? /* @__PURE__ */ t("span", {
			"aria-hidden": "true",
			className: "shrink-0",
			children: c
		}) : /* @__PURE__ */ n("span", {
			className: e("relative inline-flex shrink-0", a[l]),
			children: [p && /* @__PURE__ */ t("span", {
				"aria-hidden": "true",
				className: e("absolute inset-0 rounded-full animate-ping opacity-75", f.dot)
			}), /* @__PURE__ */ t("span", {
				"aria-hidden": "true",
				className: e("relative rounded-full", a[l], f.dot)
			})]
		}), s]
	});
}
//#endregion
export { o as t };
