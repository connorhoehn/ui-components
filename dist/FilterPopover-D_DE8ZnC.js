import { c as e, f as t, n } from "./Button-DwPf_9pb.js";
import { t as r } from "./Chip-DVGdTxaN.js";
import { t as i } from "./IconButton-BmDqeC-b.js";
import { t as a } from "./Tooltip-BaCci7O5.js";
import { t as o } from "./InlinePopover-C-Dtxban.js";
import { useId as s, useRef as c, useState as l } from "react";
import { Fragment as u, jsx as d, jsxs as f } from "react/jsx-runtime";
//#region src/components/shared/FilterPopover.tsx
var p = {
	"bottom-start": "bottom-start",
	"bottom-end": "bottom-end",
	"top-start": "bottom-start",
	"top-end": "bottom-end"
};
function m() {
	return /* @__PURE__ */ d("svg", {
		width: "14",
		height: "14",
		viewBox: "0 0 16 16",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		"aria-hidden": "true",
		children: /* @__PURE__ */ d("path", { d: "M2 3h12l-4.5 5.5V13l-3-1.5V8.5L2 3Z" })
	});
}
function h({ children: h, label: g = "Filter", activeCount: _ = 0, onClear: v, clearLabel: y = "Clear filters", open: b, onOpenChange: x, placement: S = "bottom-start", size: C, trigger: w = "label", panelLabel: T = "Filters", className: E, panelClassName: D, icon: O, "data-testid": k = "filter-popover" }) {
	let A = e(), j = C ?? (A === "compact" ? "sm" : "md"), [M, N] = l(!1), P = b ?? M, F = (e) => {
		b === void 0 && N(e), x?.(e);
	}, I = c(null), L = s(), R = _ > 0;
	return /* @__PURE__ */ f("span", {
		className: t("inline-flex shrink-0", E),
		"data-testid": `${k}-root`,
		children: [w === "icon" ? /* @__PURE__ */ d(a, {
			content: g,
			children: /* @__PURE__ */ d(i, {
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
				icon: /* @__PURE__ */ f(u, { children: [O ?? /* @__PURE__ */ d(m, {}), R && /* @__PURE__ */ d("span", {
					"aria-hidden": "true",
					"data-testid": `${k}-dot`,
					className: "absolute right-0.5 top-0.5 h-1.5 w-1.5 rounded-full bg-primary"
				})] })
			})
		}) : /* @__PURE__ */ f(n, {
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
				O ?? /* @__PURE__ */ d(m, {}),
				/* @__PURE__ */ d("span", { children: g }),
				R && /* @__PURE__ */ d(r, {
					size: "xs",
					tone: "accent",
					solid: !0,
					"data-testid": `${k}-count`,
					"aria-label": `${_} active filters`,
					children: _
				})
			]
		}), /* @__PURE__ */ d(o, {
			open: P,
			onClose: () => F(!1),
			trigger: I,
			placement: p[S],
			"aria-label": T,
			"data-testid": k,
			className: t("min-w-[280px] max-w-[420px] p-3", D),
			children: /* @__PURE__ */ f("div", {
				id: L,
				className: "flex flex-col gap-3",
				children: [h, v && /* @__PURE__ */ d("div", {
					className: "flex justify-end border-t border-border pt-2",
					children: /* @__PURE__ */ d(n, {
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
export { h as t };
