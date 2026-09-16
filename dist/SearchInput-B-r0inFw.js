import { t as e } from "./cn-DhjIN-s0.js";
import { t } from "./StatusDot-Bgx2zxgC.js";
import "react";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
//#region src/components/ui/Stack.tsx
var i = {
	none: "gap-0",
	xs: "gap-1.5",
	sm: "gap-2",
	md: "gap-3",
	lg: "gap-4",
	xl: "gap-6"
}, a = {
	start: "items-start",
	center: "items-center",
	end: "items-end",
	baseline: "items-baseline",
	stretch: "items-stretch"
}, o = {
	start: "justify-start",
	center: "justify-center",
	end: "justify-end",
	between: "justify-between"
};
function s(t, { gap: n = "md", align: r, justify: s, wrap: c }) {
	return e("flex", t === "col" ? "flex-col" : "flex-row", i[n], r ? a[r] : void 0, s ? o[s] : void 0, c ? "flex-wrap" : void 0);
}
function c({ children: t, gap: r, align: i, justify: a, wrap: o = !1, as: c = "div", className: l, ref: u, ...d }) {
	return /* @__PURE__ */ n(c, {
		ref: u,
		className: e(s("col", {
			gap: r,
			align: i,
			justify: a,
			wrap: o
		}), l),
		...d,
		children: t
	});
}
function l({ children: t, gap: r = "sm", align: i = "center", justify: a, wrap: o = !0, as: c = "div", className: l, ref: u, ...d }) {
	return /* @__PURE__ */ n(c, {
		ref: u,
		className: e(s("row", {
			gap: r,
			align: i,
			justify: a,
			wrap: o
		}), l),
		...d,
		children: t
	});
}
//#endregion
//#region src/components/shared/PresenceDot.tsx
var u = {
	online: "var(--color-success, #22c55e)",
	away: "var(--color-state-pending, #f59e0b)",
	busy: "var(--color-state-error, #ef4444)",
	offline: "var(--color-text-tertiary, #94a3b8)",
	unknown: "var(--color-text-tertiary, #94a3b8)"
}, d = {
	online: "Online",
	away: "Away",
	busy: "Busy",
	offline: "Offline",
	unknown: "Unknown presence"
};
function f({ state: e, ariaLabel: r, label: i, pulse: a, size: o = "sm", className: s, style: c, title: l, "data-testid": f }) {
	let p = a ?? e === "online", m = r ?? d[e];
	return /* @__PURE__ */ n(t, {
		color: u[e],
		pulse: p,
		size: o,
		label: i,
		className: s,
		style: c,
		title: l,
		"data-testid": f ?? `presence-${e}`,
		"aria-label": m
	});
}
//#endregion
//#region src/components/shared/SearchInput.tsx
var p = {
	surface: {
		icon: "text-[var(--color-text-tertiary)]",
		field: "border-[var(--color-border-field,#d1d5db)] bg-surface text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]",
		clear: "text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]"
	},
	code: {
		icon: "text-code-muted",
		field: "border-code-border bg-code-surface text-code-text placeholder:text-code-muted focus:ring-code-blue focus:border-code-blue",
		clear: "text-code-muted hover:text-code-text hover:bg-code-raised"
	}
};
function m({ value: t, onChange: i, placeholder: a, onClear: o, tone: s = "surface", className: c, inputClassName: l, style: u, autoFocus: d, "aria-label": f, "data-testid": m }) {
	let h = p[s] ?? p.surface;
	return /* @__PURE__ */ r("div", {
		className: e("relative inline-flex items-center", c),
		style: u,
		children: [
			/* @__PURE__ */ r("svg", {
				className: e("absolute left-3 w-3.5 h-3.5 pointer-events-none", h.icon),
				viewBox: "0 0 16 16",
				fill: "none",
				"aria-hidden": "true",
				children: [/* @__PURE__ */ n("circle", {
					cx: "7",
					cy: "7",
					r: "4.5",
					stroke: "currentColor",
					strokeWidth: "1.5"
				}), /* @__PURE__ */ n("path", {
					d: "M10.5 10.5L14 14",
					stroke: "currentColor",
					strokeWidth: "1.5",
					strokeLinecap: "round"
				})]
			}),
			/* @__PURE__ */ n("input", {
				type: "text",
				value: t,
				onChange: (e) => i(e.target.value),
				placeholder: a ?? "Search…",
				autoFocus: d,
				"aria-label": f ?? a ?? "Search",
				"data-testid": m,
				className: e("w-full pl-8 pr-7 py-1.5 text-sm rounded-md border focus:outline-none focus:ring-2 transition-colors", h.field, l)
			}),
			t && /* @__PURE__ */ n("button", {
				type: "button",
				onClick: () => {
					i(""), o?.();
				},
				className: e("absolute right-2 p-0.5 rounded", h.clear),
				"aria-label": "Clear search",
				children: /* @__PURE__ */ n("svg", {
					width: "12",
					height: "12",
					viewBox: "0 0 12 12",
					fill: "none",
					children: /* @__PURE__ */ n("path", {
						d: "M2 2l8 8M10 2l-8 8",
						stroke: "currentColor",
						strokeWidth: "1.5",
						strokeLinecap: "round"
					})
				})
			})
		]
	});
}
//#endregion
export { c as i, f as n, l as r, m as t };
