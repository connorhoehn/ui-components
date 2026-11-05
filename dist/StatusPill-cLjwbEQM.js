import { t as e } from "./cn-D4QmbyEy.js";
import { t } from "./Spinner-CYflBP-c.js";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
//#region src/components/shared/LoadingState.tsx
function i({ label: i = "Loading…", description: a, spinnerSize: o = "lg", spinnerColor: s, testId: c = "loading-state" }) {
	return /* @__PURE__ */ r("div", {
		role: "status",
		"aria-live": "polite",
		"data-testid": c,
		className: e("flex flex-col items-center justify-center min-h-[220px]", "text-text-secondary gap-3 p-8 font-[inherit]"),
		children: [
			/* @__PURE__ */ n(t, {
				size: o,
				color: s,
				decorative: !0
			}),
			/* @__PURE__ */ n("div", {
				className: "text-sm font-medium text-text-primary",
				children: i
			}),
			a && /* @__PURE__ */ n("div", {
				className: "text-xs text-center max-w-[340px] text-text-secondary leading-normal",
				children: a
			})
		]
	});
}
//#endregion
//#region src/components/shared/StatusPill.tsx
var a = {
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
}, o = {
	sm: "px-1.5 py-0.5 text-[10px] gap-1",
	md: "px-2.5 py-1 text-[12px] gap-1.5"
}, s = {
	sm: "text-[10px] gap-1",
	md: "text-[12px] gap-1.5"
}, c = {
	sm: "px-1.5 py-0.5 text-[11px] gap-1",
	md: "px-2 py-[5px] text-[13px] gap-1.5"
}, l = {
	sm: "w-1.5 h-1.5",
	md: "w-2 h-2"
};
function u({ state: t, tone: i, label: u, icon: d, meta: f, size: p = "md", variant: m = "pill", className: h, "data-testid": g }) {
	let _ = i ?? t ?? "neutral", v = a[_] ?? a.neutral ?? Object.values(a)[0], y = _ === "pending";
	return /* @__PURE__ */ r("span", {
		role: "status",
		"data-testid": g,
		"data-state": _,
		"data-variant": m,
		className: e("inline-flex max-w-full min-w-0 items-center whitespace-nowrap font-medium leading-none select-none", m === "pill" ? e("rounded-full border", v.pill, o[p]) : m === "tag" || m === "label" ? e("rounded-md border-0", v.pill, c[p]) : s[p], m === "tag" && _ === "neutral" ? "text-text-primary" : v.text, h),
		children: [
			m === "tag" ? null : d ? /* @__PURE__ */ n("span", {
				"aria-hidden": "true",
				className: "shrink-0",
				children: d
			}) : /* @__PURE__ */ r("span", {
				className: e("relative inline-flex shrink-0", l[p]),
				children: [y && /* @__PURE__ */ n("span", {
					"aria-hidden": "true",
					className: e("absolute inset-0 rounded-full animate-ping opacity-75", v.dot)
				}), /* @__PURE__ */ n("span", {
					"aria-hidden": "true",
					className: e("relative rounded-full", l[p], v.dot)
				})]
			}),
			/* @__PURE__ */ n("span", {
				className: "min-w-0 truncate",
				title: u,
				"data-status-pill-label": "",
				children: u
			}),
			f && /* @__PURE__ */ r("span", {
				"data-testid": g ? `${g}-meta` : void 0,
				className: "shrink-0 font-normal text-text-tertiary",
				children: [/* @__PURE__ */ n("span", {
					"aria-hidden": "true",
					children: "· "
				}), f]
			})
		]
	});
}
//#endregion
export { i as n, u as t };
