import { t as e } from "./cn-DhjIN-s0.js";
import { t } from "./Spinner-CLcq5z8N.js";
import "react";
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
				className: "text-[15px] font-medium text-text-primary",
				children: i
			}),
			a && /* @__PURE__ */ n("div", {
				className: "text-[13px] text-center max-w-[340px] text-text-secondary leading-normal",
				children: a
			})
		]
	});
}
//#endregion
//#region src/components/shared/SearchInput.tsx
var a = {
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
function o({ value: t, onChange: i, placeholder: o, onClear: s, tone: c = "surface", className: l, inputClassName: u, size: d = "sm", onKeyDown: f, style: p, autoFocus: m, "aria-label": h, "data-testid": g }) {
	let _ = a[c] ?? a.surface;
	return /* @__PURE__ */ r("div", {
		className: e("relative inline-flex items-center", l),
		style: p,
		children: [
			/* @__PURE__ */ r("svg", {
				className: e("absolute pointer-events-none", d === "lg" ? "left-4 h-5 w-5" : d === "md" ? "left-3 h-[18px] w-[18px]" : "left-3 w-3.5 h-3.5", _.icon),
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
				onKeyDown: f,
				placeholder: o ?? "Search…",
				autoFocus: m,
				"aria-label": h ?? o ?? "Search",
				"data-testid": g,
				className: e("w-full border focus:outline-none focus:ring-2 transition-colors", d === "lg" ? "h-11 pl-12 pr-11 text-base rounded-lg" : d === "md" ? "h-9 pl-10 pr-7 text-[15px] rounded-md" : "pl-8 pr-7 py-1.5 text-sm rounded-md", _.field, u)
			}),
			t && /* @__PURE__ */ n("button", {
				type: "button",
				onClick: () => {
					i(""), s?.();
				},
				className: e("absolute rounded", d === "lg" ? "right-3 p-1" : "right-2 p-0.5", _.clear),
				"aria-label": "Clear search",
				children: /* @__PURE__ */ n("svg", {
					width: d === "lg" ? 16 : 12,
					height: d === "lg" ? 16 : 12,
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
export { i as n, o as t };
