import { d as e, n as t, s as n } from "./Button-DQoeE5dN.js";
import { r } from "./safeHref-CSAycLWi.js";
import { t as i } from "./IconButton-BgM9MvwA.js";
import { t as a } from "./Tooltip-DGN3JB6V.js";
import { t as o } from "./InlinePopover-BJntntHW.js";
import { useCallback as s, useId as c, useRef as l, useState as u } from "react";
import { Fragment as d, jsx as f, jsxs as p } from "react/jsx-runtime";
//#region src/components/shared/FilterPopover.tsx
var m = {
	"bottom-start": "bottom-start",
	"bottom-end": "bottom-end",
	"top-start": "bottom-start",
	"top-end": "bottom-end"
};
function h() {
	return /* @__PURE__ */ f("svg", {
		width: "14",
		height: "14",
		viewBox: "0 0 16 16",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		"aria-hidden": "true",
		children: /* @__PURE__ */ f("path", { d: "M2 3h12l-4.5 5.5V13l-3-1.5V8.5L2 3Z" })
	});
}
function g({ children: s, label: g = "Filter", activeCount: _ = 0, onClear: v, clearLabel: y = "Clear filters", open: b, onOpenChange: x, placement: S = "bottom-start", size: C, trigger: w = "label", panelLabel: T = "Filters", className: E, panelClassName: D, icon: O, "data-testid": k = "filter-popover" }) {
	let A = n(), j = C ?? (A === "compact" ? "sm" : "md"), [M, N] = u(!1), P = b ?? M, F = (e) => {
		b === void 0 && N(e), x?.(e);
	}, I = l(null), L = c(), R = _ > 0;
	return /* @__PURE__ */ p("span", {
		className: e("inline-flex shrink-0", E),
		"data-testid": `${k}-root`,
		children: [w === "icon" ? /* @__PURE__ */ f(a, {
			content: g,
			children: /* @__PURE__ */ f(i, {
				ref: I,
				size: j,
				"aria-label": R ? `${g} (${_} active)` : g,
				"aria-haspopup": "dialog",
				"aria-expanded": P,
				"aria-controls": P ? L : void 0,
				"data-testid": `${k}-trigger`,
				"data-active": R || void 0,
				"aria-pressed": R,
				onClick: () => F(!P),
				className: "relative",
				icon: /* @__PURE__ */ p(d, { children: [O ?? /* @__PURE__ */ f(h, {}), R && /* @__PURE__ */ f("span", {
					"aria-hidden": "true",
					"data-testid": `${k}-dot`,
					className: "absolute right-0.5 top-0.5 h-1.5 w-1.5 rounded-full bg-primary"
				})] })
			})
		}) : /* @__PURE__ */ p(t, {
			ref: I,
			variant: "secondary",
			size: j,
			"aria-haspopup": "dialog",
			"aria-expanded": P,
			"aria-controls": P ? L : void 0,
			"data-testid": `${k}-trigger`,
			"data-active": R || void 0,
			onClick: () => F(!P),
			children: [
				O ?? /* @__PURE__ */ f(h, {}),
				/* @__PURE__ */ f("span", { children: g }),
				R && /* @__PURE__ */ f(r, {
					size: "xs",
					tone: "accent",
					solid: !0,
					"data-testid": `${k}-count`,
					"aria-label": `${_} active filters`,
					children: _
				})
			]
		}), /* @__PURE__ */ f(o, {
			open: P,
			onClose: () => F(!1),
			trigger: I,
			placement: m[S],
			"aria-label": T,
			"data-testid": k,
			className: e("min-w-[280px] max-w-[420px] p-3", D),
			children: /* @__PURE__ */ p("div", {
				id: L,
				className: "flex flex-col gap-3",
				children: [s, v && /* @__PURE__ */ f("div", {
					className: "flex justify-end border-t border-border pt-2",
					children: /* @__PURE__ */ f(t, {
						type: "button",
						variant: "ghost",
						size: "sm",
						disabled: !R,
						"data-testid": `${k}-clear`,
						onClick: () => {
							v();
						},
						children: y
					})
				})]
			})
		})]
	});
}
//#endregion
//#region src/components/shared/Toolbar.tsx
var _ = {
	sm: "min-h-9 px-3 gap-2 text-xs",
	md: "min-h-11 px-4 gap-2.5 text-sm"
}, v = {
	surface: "bg-surface text-text-primary border-border",
	code: "bg-code-panel text-code-text border-code-border"
}, y = {
	surface: "bg-border",
	code: "bg-code-border"
}, b = "a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex=\"-1\"])";
function x({ children: t, end: n, tone: r = "surface", variant: i = "surface", size: a = "sm", sticky: o = !1, bordered: c = !0, wrap: u = !1, className: d, "aria-label": m = "Toolbar", "data-testid": h, "data-collection-selection": g, "data-collection-layout": y, "data-collection-placement": x }) {
	let S = l(null), C = s((e) => {
		if (![
			"ArrowLeft",
			"ArrowRight",
			"Home",
			"End"
		].includes(e.key)) return;
		let t = e.target;
		if (t && (t.isContentEditable || t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.tagName === "SELECT")) return;
		let n = S.current;
		if (!n) return;
		let r = Array.from(n.querySelectorAll(b));
		if (r.length === 0) return;
		let i = r.indexOf(document.activeElement), a;
		a = e.key === "Home" ? 0 : e.key === "End" ? r.length - 1 : i < 0 ? 0 : (i + (e.key === "ArrowRight" ? 1 : -1) + r.length) % r.length, r[a]?.focus(), e.preventDefault();
	}, []);
	return /* @__PURE__ */ p("div", {
		ref: S,
		role: "toolbar",
		"aria-label": m,
		"aria-orientation": "horizontal",
		"data-testid": h,
		"data-toolbar-variant": i,
		"data-collection-selection": g,
		"data-collection-layout": y,
		"data-collection-placement": x,
		onKeyDown: C,
		className: e("flex flex-none", u ? "flex-wrap items-start py-1.5" : "items-center", _[a], i === "collection" ? "bg-transparent text-text-primary px-[var(--ui-table-inset,0.75rem)]" : v[r], c && i !== "collection" && "border-b", o && "sticky top-0 z-20", d),
		children: [/* @__PURE__ */ f("div", {
			className: e("flex min-w-0 flex-auto items-center gap-2", u ? "flex-wrap gap-y-1.5" : "overflow-x-auto"),
			"data-toolbar-controls": "",
			children: t
		}), n && /* @__PURE__ */ f("div", {
			className: e("flex flex-initial shrink-[3] items-center gap-2", u ? "flex-wrap" : "pl-2"),
			children: n
		})]
	});
}
function S({ children: t, divided: n = !1, tone: r = "surface", className: i, "aria-label": a }) {
	return /* @__PURE__ */ p(d, { children: [n && /* @__PURE__ */ f(C, { tone: r }), /* @__PURE__ */ f("div", {
		role: a ? "group" : void 0,
		"aria-label": a,
		className: e("flex flex-none items-center gap-1.5", i),
		children: t
	})] });
}
function C({ tone: t = "surface", className: n }) {
	return /* @__PURE__ */ f("span", {
		role: "separator",
		"aria-orientation": "vertical",
		className: e("h-4 w-px flex-none", y[t], n)
	});
}
function w({ children: t, tone: n = "surface", className: r }) {
	return /* @__PURE__ */ f("span", {
		className: e("flex-none whitespace-nowrap", n === "code" ? "text-code-subtle" : "text-text-tertiary", r),
		children: t
	});
}
//#endregion
export { g as a, C as i, S as n, w as r, x as t };
