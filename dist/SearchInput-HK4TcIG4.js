import { t as e } from "./cn-D4QmbyEy.js";
import { r as t } from "./Button-uREUOWUk.js";
import "react";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
//#region src/components/shared/SearchInput.tsx
var i = {
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
function a({ value: a, onChange: o, placeholder: s, onClear: c, tone: l = "surface", className: u, inputClassName: d, size: f = "sm", onKeyDown: p, style: m, autoFocus: h, "aria-label": g, "data-testid": _ }) {
	let v = i[l] ?? i.surface;
	return /* @__PURE__ */ r("div", {
		className: e("relative inline-flex items-center", u),
		style: m,
		children: [
			/* @__PURE__ */ r("svg", {
				className: e("absolute pointer-events-none", f === "lg" ? "left-4 h-5 w-5" : f === "md" ? "left-3 h-[18px] w-[18px]" : "left-3 w-3.5 h-3.5", v.icon),
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
				value: a,
				onChange: (e) => o(e.target.value),
				onKeyDown: p,
				placeholder: s ?? "Search…",
				autoFocus: h,
				"aria-label": g ?? s ?? "Search",
				"data-testid": _,
				className: e("w-full border focus:outline-none focus:ring-2 transition-colors", f === "lg" ? `${t.lg} pl-12 pr-11 text-sm rounded-lg` : f === "md" ? `${t.md} pl-10 pr-7 text-sm rounded-md` : `${t.sm} pl-8 pr-7 text-xs rounded-md`, v.field, d)
			}),
			a && /* @__PURE__ */ n("button", {
				type: "button",
				onClick: () => {
					o(""), c?.();
				},
				className: e("absolute rounded", f === "lg" ? "right-3 p-1" : "right-2 p-0.5", v.clear),
				"aria-label": "Clear search",
				children: /* @__PURE__ */ n("svg", {
					width: f === "lg" ? 16 : 12,
					height: f === "lg" ? 16 : 12,
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
export { a as t };
