import { t as e } from "./cn-D4QmbyEy.js";
import "react";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
//#region src/components/shared/PageHeader.tsx
function r({ title: r, description: i, actions: a, back: o, badge: s, size: c = "md", className: l }) {
	return /* @__PURE__ */ n("div", {
		className: e("flex flex-col gap-1.5", l),
		children: [
			o && /* @__PURE__ */ n("a", {
				href: o.to,
				onClick: o.onClick,
				className: "inline-flex items-center gap-1 text-xs text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] mb-1 w-fit",
				children: [/* @__PURE__ */ t("svg", {
					width: "12",
					height: "12",
					viewBox: "0 0 12 12",
					fill: "none",
					"aria-hidden": "true",
					children: /* @__PURE__ */ t("path", {
						d: "M7 2L3 6l4 4",
						stroke: "currentColor",
						strokeWidth: "1.5",
						strokeLinecap: "round",
						strokeLinejoin: "round"
					})
				}), o.label]
			}),
			/* @__PURE__ */ n("div", {
				className: "flex items-center justify-between gap-4",
				children: [/* @__PURE__ */ n("div", {
					className: "min-w-0 flex items-center gap-2.5",
					children: [/* @__PURE__ */ t("h1", {
						className: e("font-semibold text-[var(--color-text-primary)] leading-tight", c === "lg" ? "text-[28px] font-bold tracking-[-0.01em]" : "text-xl"),
						children: r
					}), s]
				}), a && /* @__PURE__ */ t("div", {
					className: "flex-shrink-0 flex items-center gap-2",
					children: a
				})]
			}),
			i && /* @__PURE__ */ t("p", {
				className: "text-sm text-[var(--color-text-secondary)]",
				children: i
			})
		]
	});
}
//#endregion
export { r as t };
