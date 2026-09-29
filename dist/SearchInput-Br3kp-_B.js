import { t as e } from "./cn-DhjIN-s0.js";
import "react";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
//#region src/components/shared/SearchInput.tsx
var r = {
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
function i({ value: i, onChange: a, placeholder: o, onClear: s, tone: c = "surface", className: l, inputClassName: u, size: d = "sm", onKeyDown: f, style: p, autoFocus: m, "aria-label": h, "data-testid": g }) {
	let _ = r[c] ?? r.surface;
	return /* @__PURE__ */ n("div", {
		className: e("relative inline-flex items-center", l),
		style: p,
		children: [
			/* @__PURE__ */ n("svg", {
				className: e("absolute pointer-events-none", d === "lg" ? "left-4 h-5 w-5" : d === "md" ? "left-3 h-[18px] w-[18px]" : "left-3 w-3.5 h-3.5", _.icon),
				viewBox: "0 0 16 16",
				fill: "none",
				"aria-hidden": "true",
				children: [/* @__PURE__ */ t("circle", {
					cx: "7",
					cy: "7",
					r: "4.5",
					stroke: "currentColor",
					strokeWidth: "1.5"
				}), /* @__PURE__ */ t("path", {
					d: "M10.5 10.5L14 14",
					stroke: "currentColor",
					strokeWidth: "1.5",
					strokeLinecap: "round"
				})]
			}),
			/* @__PURE__ */ t("input", {
				type: "text",
				value: i,
				onChange: (e) => a(e.target.value),
				onKeyDown: f,
				placeholder: o ?? "Search…",
				autoFocus: m,
				"aria-label": h ?? o ?? "Search",
				"data-testid": g,
				className: e("w-full border focus:outline-none focus:ring-2 transition-colors", d === "lg" ? "h-11 pl-12 pr-11 text-base rounded-lg" : d === "md" ? "h-9 pl-10 pr-7 text-sm rounded-md" : "pl-8 pr-7 py-1.5 text-sm rounded-md", _.field, u)
			}),
			i && /* @__PURE__ */ t("button", {
				type: "button",
				onClick: () => {
					a(""), s?.();
				},
				className: e("absolute rounded", d === "lg" ? "right-3 p-1" : "right-2 p-0.5", _.clear),
				"aria-label": "Clear search",
				children: /* @__PURE__ */ t("svg", {
					width: d === "lg" ? 16 : 12,
					height: d === "lg" ? 16 : 12,
					viewBox: "0 0 12 12",
					fill: "none",
					children: /* @__PURE__ */ t("path", {
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
export { i as t };
