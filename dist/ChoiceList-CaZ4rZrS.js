import { t as e } from "./cn-DhjIN-s0.js";
import { useState as t } from "react";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
//#region src/components/shared/ChoiceList.tsx
function i({ children: t, className: r, "data-testid": i = "choice-list" }) {
	return /* @__PURE__ */ n("div", {
		role: "list",
		"data-testid": i,
		className: e("flex flex-col divide-y divide-border border-y border-border", r),
		children: t
	});
}
function a({ open: t }) {
	return /* @__PURE__ */ n("svg", {
		viewBox: "0 0 16 16",
		className: e("h-3.5 w-3.5 shrink-0 text-text-tertiary transition-transform", t && "rotate-90"),
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		"aria-hidden": "true",
		children: /* @__PURE__ */ n("path", {
			d: "M6 3l5 5-5 5",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
}
function o({ icon: i, title: o, description: s, onSelect: c, children: l, open: u, onOpenChange: d, disabled: f = !1, disabledReason: p, busy: m = !1, selected: h, "data-testid": g = "choice-row" }) {
	let _ = h !== void 0, [v, y] = t(!1), b = l !== void 0, x = u ?? v, S = (e) => {
		u === void 0 && y(e), d?.(e);
	};
	return /* @__PURE__ */ r("div", {
		role: "listitem",
		"data-testid": g,
		"data-open": b ? String(x) : void 0,
		children: [/* @__PURE__ */ r("button", {
			type: "button",
			role: _ ? "radio" : void 0,
			"aria-checked": _ ? h : void 0,
			disabled: f || m,
			title: f ? p : void 0,
			"aria-expanded": b ? x : void 0,
			"aria-busy": m || void 0,
			onClick: () => b ? S(!x) : c?.(),
			className: e("flex w-full cursor-pointer items-center gap-3 border-none bg-transparent px-4 py-3 text-left font-[inherit] transition-colors", "hover:bg-surface-hover disabled:cursor-default disabled:opacity-50 disabled:hover:bg-transparent", x && "bg-surface-hover"),
			"data-testid": `${g}-button`,
			children: [
				_ ? /* @__PURE__ */ n("span", {
					"aria-hidden": "true",
					"data-testid": `${g}-mark`,
					className: e("flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2", h ? "border-primary" : "border-border"),
					children: h && /* @__PURE__ */ n("span", { className: "h-2 w-2 rounded-full bg-primary" })
				}) : i ? /* @__PURE__ */ n("span", {
					className: "flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-surface-panel text-text-secondary ring-1 ring-border",
					"aria-hidden": "true",
					children: i
				}) : null,
				/* @__PURE__ */ r("span", {
					className: "flex min-w-0 flex-1 flex-col gap-0.5",
					children: [/* @__PURE__ */ n("span", {
						className: "truncate text-[13px] font-semibold text-text-primary",
						children: o
					}), s ? /* @__PURE__ */ n("span", {
						className: "truncate text-[12px] text-text-secondary",
						children: s
					}) : null]
				}),
				b ? /* @__PURE__ */ n(a, { open: x }) : null
			]
		}), b && x ? /* @__PURE__ */ n("div", {
			className: "border-t border-border bg-surface pb-1",
			"data-testid": `${g}-panel`,
			children: l
		}) : null]
	});
}
function s({ icon: t, label: i, onSelect: a, disabled: o = !1, "data-testid": s = "choice-option" }) {
	return /* @__PURE__ */ r("button", {
		type: "button",
		disabled: o,
		onClick: a,
		className: e("flex w-full cursor-pointer items-center gap-2.5 border-none bg-transparent py-1.5 pl-[3.75rem] pr-4 text-left font-[inherit] text-[13px] text-text-primary transition-colors", "hover:bg-surface-hover disabled:cursor-default disabled:opacity-50"),
		"data-testid": s,
		children: [t ? /* @__PURE__ */ n("span", {
			className: "flex shrink-0 items-center",
			"aria-hidden": "true",
			children: t
		}) : null, /* @__PURE__ */ n("span", {
			className: "truncate",
			children: i
		})]
	});
}
//#endregion
export { s as n, o as r, i as t };
