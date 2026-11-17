import { d as e } from "./Button-DQoeE5dN.js";
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
	md: "px-2.5 py-1 text-[12px] gap-1"
}, a = {
	sm: "text-[10px] gap-1",
	md: "text-[12px] gap-1"
}, o = {
	sm: "px-1.5 py-0.5 text-[11px] gap-1",
	md: "px-2 py-[5px] text-[12px] gap-1"
}, s = {
	sm: "w-1.5 h-1.5",
	md: "w-2 h-2"
};
function c({ state: c, tone: l, label: u, icon: d, meta: f, size: p = "md", variant: m = "pill", truncate: h = !0, className: g, "data-testid": _ }) {
	let v = l ?? c ?? "neutral", y = r[v] ?? r.neutral ?? Object.values(r)[0], b = v === "pending";
	return /* @__PURE__ */ n("span", {
		role: "status",
		"data-testid": _,
		"data-state": v,
		"data-variant": m,
		className: e("inline-flex max-w-full min-w-0 items-center font-medium leading-none select-none", h ? "whitespace-nowrap" : "whitespace-normal", m === "pill" ? e("rounded-full border", y.pill, i[p]) : m === "tag" || m === "label" ? e("rounded-md border-0", y.pill, o[p]) : a[p], m === "tag" && v === "neutral" ? "text-text-primary" : y.text, g),
		children: [
			m === "tag" ? null : d ? /* @__PURE__ */ t("span", {
				"aria-hidden": "true",
				className: "shrink-0",
				children: d
			}) : /* @__PURE__ */ n("span", {
				className: e("relative inline-flex shrink-0", s[p]),
				children: [b && /* @__PURE__ */ t("span", {
					"aria-hidden": "true",
					className: e("absolute inset-0 rounded-full animate-ping opacity-75", y.dot)
				}), /* @__PURE__ */ t("span", {
					"aria-hidden": "true",
					className: e("relative rounded-full", s[p], y.dot)
				})]
			}),
			/* @__PURE__ */ t("span", {
				className: h ? "min-w-0 truncate" : "min-w-0 leading-tight",
				title: h ? u : void 0,
				"data-status-pill-label": "",
				children: u
			}),
			f && /* @__PURE__ */ n("span", {
				"data-testid": _ ? `${_}-meta` : void 0,
				className: "shrink-0 font-normal text-text-tertiary",
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
