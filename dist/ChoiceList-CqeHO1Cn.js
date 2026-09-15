import { t as e } from "./cn-DhjIN-s0.js";
import { t } from "./StatusDot-Bgx2zxgC.js";
import { useState as n } from "react";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
//#region src/components/ui/Stack.tsx
var a = {
	none: "gap-0",
	xs: "gap-1.5",
	sm: "gap-2",
	md: "gap-3",
	lg: "gap-4",
	xl: "gap-6"
}, o = {
	start: "items-start",
	center: "items-center",
	end: "items-end",
	baseline: "items-baseline",
	stretch: "items-stretch"
}, s = {
	start: "justify-start",
	center: "justify-center",
	end: "justify-end",
	between: "justify-between"
};
function c(t, { gap: n = "md", align: r, justify: i, wrap: c }) {
	return e("flex", t === "col" ? "flex-col" : "flex-row", a[n], r ? o[r] : void 0, i ? s[i] : void 0, c ? "flex-wrap" : void 0);
}
function l({ children: t, gap: n, align: i, justify: a, wrap: o = !1, as: s = "div", className: l, ref: u, ...d }) {
	return /* @__PURE__ */ r(s, {
		ref: u,
		className: e(c("col", {
			gap: n,
			align: i,
			justify: a,
			wrap: o
		}), l),
		...d,
		children: t
	});
}
function u({ children: t, gap: n = "sm", align: i = "center", justify: a, wrap: o = !0, as: s = "div", className: l, ref: u, ...d }) {
	return /* @__PURE__ */ r(s, {
		ref: u,
		className: e(c("row", {
			gap: n,
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
var d = {
	online: "var(--color-success, #22c55e)",
	away: "var(--color-state-pending, #f59e0b)",
	busy: "var(--color-state-error, #ef4444)",
	offline: "var(--color-text-tertiary, #94a3b8)",
	unknown: "var(--color-text-tertiary, #94a3b8)"
}, f = {
	online: "Online",
	away: "Away",
	busy: "Busy",
	offline: "Offline",
	unknown: "Unknown presence"
};
function p({ state: e, ariaLabel: n, label: i, pulse: a, size: o = "sm", className: s, style: c, title: l, "data-testid": u }) {
	let p = a ?? e === "online", m = n ?? f[e];
	return /* @__PURE__ */ r(t, {
		color: d[e],
		pulse: p,
		size: o,
		label: i,
		className: s,
		style: c,
		title: l,
		"data-testid": u ?? `presence-${e}`,
		"aria-label": m
	});
}
//#endregion
//#region src/components/shared/SearchInput.tsx
var m = {
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
function h({ value: t, onChange: n, placeholder: a, onClear: o, tone: s = "surface", className: c, inputClassName: l, style: u, autoFocus: d, "aria-label": f, "data-testid": p }) {
	let h = m[s] ?? m.surface;
	return /* @__PURE__ */ i("div", {
		className: e("relative inline-flex items-center", c),
		style: u,
		children: [
			/* @__PURE__ */ i("svg", {
				className: e("absolute left-3 w-3.5 h-3.5 pointer-events-none", h.icon),
				viewBox: "0 0 16 16",
				fill: "none",
				"aria-hidden": "true",
				children: [/* @__PURE__ */ r("circle", {
					cx: "7",
					cy: "7",
					r: "4.5",
					stroke: "currentColor",
					strokeWidth: "1.5"
				}), /* @__PURE__ */ r("path", {
					d: "M10.5 10.5L14 14",
					stroke: "currentColor",
					strokeWidth: "1.5",
					strokeLinecap: "round"
				})]
			}),
			/* @__PURE__ */ r("input", {
				type: "text",
				value: t,
				onChange: (e) => n(e.target.value),
				placeholder: a ?? "Search…",
				autoFocus: d,
				"aria-label": f ?? a ?? "Search",
				"data-testid": p,
				className: e("w-full pl-8 pr-7 py-1.5 text-sm rounded-md border focus:outline-none focus:ring-2 transition-colors", h.field, l)
			}),
			t && /* @__PURE__ */ r("button", {
				type: "button",
				onClick: () => {
					n(""), o?.();
				},
				className: e("absolute right-2 p-0.5 rounded", h.clear),
				"aria-label": "Clear search",
				children: /* @__PURE__ */ r("svg", {
					width: "12",
					height: "12",
					viewBox: "0 0 12 12",
					fill: "none",
					children: /* @__PURE__ */ r("path", {
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
//#region src/components/shared/ChoiceList.tsx
function g({ children: t, className: n, "data-testid": i = "choice-list" }) {
	return /* @__PURE__ */ r("div", {
		role: "list",
		"data-testid": i,
		className: e("flex flex-col divide-y divide-border border-y border-border", n),
		children: t
	});
}
function _({ open: t }) {
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
function v({ icon: t, title: a, description: o, onSelect: s, children: c, open: l, onOpenChange: u, disabled: d = !1, disabledReason: f, busy: p = !1, "data-testid": m = "choice-row" }) {
	let [h, g] = n(!1), v = c !== void 0, y = l ?? h, b = (e) => {
		l === void 0 && g(e), u?.(e);
	};
	return /* @__PURE__ */ i("div", {
		role: "listitem",
		"data-testid": m,
		"data-open": v ? String(y) : void 0,
		children: [/* @__PURE__ */ i("button", {
			type: "button",
			disabled: d || p,
			title: d ? f : void 0,
			"aria-expanded": v ? y : void 0,
			"aria-busy": p || void 0,
			onClick: () => v ? b(!y) : s?.(),
			className: e("flex w-full cursor-pointer items-center gap-3 border-none bg-transparent px-4 py-3 text-left font-[inherit] transition-colors", "hover:bg-surface-hover disabled:cursor-default disabled:opacity-50 disabled:hover:bg-transparent", y && "bg-surface-hover"),
			"data-testid": `${m}-button`,
			children: [
				t ? /* @__PURE__ */ r("span", {
					className: "flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-surface-panel text-text-secondary ring-1 ring-border",
					"aria-hidden": "true",
					children: t
				}) : null,
				/* @__PURE__ */ i("span", {
					className: "flex min-w-0 flex-1 flex-col gap-0.5",
					children: [/* @__PURE__ */ r("span", {
						className: "truncate text-[13px] font-semibold text-text-primary",
						children: a
					}), o ? /* @__PURE__ */ r("span", {
						className: "truncate text-[12px] text-text-secondary",
						children: o
					}) : null]
				}),
				v ? /* @__PURE__ */ r(_, { open: y }) : null
			]
		}), v && y ? /* @__PURE__ */ r("div", {
			className: "border-t border-border bg-surface pb-1",
			"data-testid": `${m}-panel`,
			children: c
		}) : null]
	});
}
function y({ icon: t, label: n, onSelect: a, disabled: o = !1, "data-testid": s = "choice-option" }) {
	return /* @__PURE__ */ i("button", {
		type: "button",
		disabled: o,
		onClick: a,
		className: e("flex w-full cursor-pointer items-center gap-2.5 border-none bg-transparent py-1.5 pl-[3.75rem] pr-4 text-left font-[inherit] text-[13px] text-text-primary transition-colors", "hover:bg-surface-hover disabled:cursor-default disabled:opacity-50"),
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
export { p as a, h as i, y as n, u as o, v as r, l as s, g as t };
