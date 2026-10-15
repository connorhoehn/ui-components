import { t as e } from "./cn-D4QmbyEy.js";
import { t } from "./StatusDot-GwVn-q5q.js";
import { useState as n } from "react";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
//#region src/components/shared/PresenceDot.tsx
var a = {
	online: "var(--color-success, #22c55e)",
	away: "var(--color-state-pending, #f59e0b)",
	busy: "var(--color-state-error, #ef4444)",
	offline: "var(--color-text-tertiary, #94a3b8)",
	unknown: "var(--color-text-tertiary, #94a3b8)"
}, o = {
	online: "Online",
	away: "Away",
	busy: "Busy",
	offline: "Offline",
	unknown: "Unknown presence"
};
function s({ state: e, ariaLabel: n, label: i, pulse: s, size: c = "sm", className: l, style: u, title: d, "data-testid": f }) {
	let p = s ?? e === "online", m = n ?? o[e];
	return /* @__PURE__ */ r(t, {
		color: a[e],
		pulse: p,
		size: c,
		label: i,
		className: l,
		style: u,
		title: d,
		"data-testid": f ?? `presence-${e}`,
		"aria-label": m
	});
}
//#endregion
//#region src/components/shared/ChoiceList.tsx
function c({ children: t, className: n, "data-testid": i = "choice-list" }) {
	return /* @__PURE__ */ r("div", {
		role: "list",
		"data-testid": i,
		className: e("flex flex-col divide-y divide-border border-y border-border", n),
		children: t
	});
}
function l({ open: t }) {
	return /* @__PURE__ */ r("svg", {
		viewBox: "0 0 16 16",
		className: e("h-3.5 w-3.5 shrink-0 text-text-tertiary transition-transform", t && "rotate-90"),
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		"aria-hidden": "true",
		children: /* @__PURE__ */ r("path", {
			d: "M6 3l5 5-5 5",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
}
function u({ icon: t, title: a, description: o, onSelect: s, children: c, open: u, onOpenChange: d, disabled: f = !1, disabledReason: p, busy: m = !1, selected: h, "data-testid": g = "choice-row" }) {
	let _ = h !== void 0, [v, y] = n(!1), b = c !== void 0, x = u ?? v, S = (e) => {
		u === void 0 && y(e), d?.(e);
	};
	return /* @__PURE__ */ i("div", {
		role: "listitem",
		"data-testid": g,
		"data-open": b ? String(x) : void 0,
		children: [/* @__PURE__ */ i("button", {
			type: "button",
			role: _ ? "radio" : void 0,
			"aria-checked": _ ? h : void 0,
			disabled: f || m,
			title: f ? p : void 0,
			"aria-expanded": b ? x : void 0,
			"aria-busy": m || void 0,
			onClick: () => b ? S(!x) : s?.(),
			className: e("flex w-full cursor-pointer items-center gap-3 border-none bg-transparent px-4 py-3 text-left font-[inherit] transition-colors", "hover:bg-surface-hover disabled:cursor-default disabled:opacity-50 disabled:hover:bg-transparent", x && "bg-surface-hover"),
			"data-testid": `${g}-button`,
			children: [
				_ ? /* @__PURE__ */ r("span", {
					"aria-hidden": "true",
					"data-testid": `${g}-mark`,
					className: e("flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2", h ? "border-primary" : "border-border"),
					children: h && /* @__PURE__ */ r("span", { className: "h-2 w-2 rounded-full bg-primary" })
				}) : t ? /* @__PURE__ */ r("span", {
					className: "flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-surface-panel text-text-secondary ring-1 ring-border",
					"aria-hidden": "true",
					children: t
				}) : null,
				/* @__PURE__ */ i("span", {
					className: "flex min-w-0 flex-1 flex-col gap-0.5",
					children: [/* @__PURE__ */ r("span", {
						className: "truncate text-sm font-medium text-text-primary",
						children: a
					}), o ? /* @__PURE__ */ r("span", {
						className: "truncate text-xs text-text-secondary",
						children: o
					}) : null]
				}),
				b ? /* @__PURE__ */ r(l, { open: x }) : null
			]
		}), b && x ? /* @__PURE__ */ r("div", {
			className: "border-t border-border bg-surface pb-1",
			"data-testid": `${g}-panel`,
			children: c
		}) : null]
	});
}
function d({ icon: t, label: n, onSelect: a, disabled: o = !1, "data-testid": s = "choice-option" }) {
	return /* @__PURE__ */ i("button", {
		type: "button",
		disabled: o,
		onClick: a,
		className: e("flex w-full cursor-pointer items-center gap-2.5 border-none bg-transparent py-1.5 pl-[3.75rem] pr-4 text-left font-[inherit] text-sm text-text-primary transition-colors", "hover:bg-surface-hover disabled:cursor-default disabled:opacity-50"),
		"data-testid": s,
		children: [t ? /* @__PURE__ */ r("span", {
			className: "flex shrink-0 items-center",
			"aria-hidden": "true",
			children: t
		}) : null, /* @__PURE__ */ r("span", {
			className: "truncate",
			children: n
		})]
	});
}
//#endregion
export { s as i, d as n, u as r, c as t };
