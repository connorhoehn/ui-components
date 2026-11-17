import { d as e } from "./Button-DQoeE5dN.js";
import "react";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
//#region src/components/shared/CardHeader.tsx
function r({ title: r, as: i = "h3", subtitle: a, meta: o, action: s, inset: c = !1, className: l }) {
	return /* @__PURE__ */ n("div", {
		className: e("flex items-center justify-between gap-4", c && "px-3.5 pt-3 pb-2.5 border-b border-[var(--color-border)]", l),
		children: [/* @__PURE__ */ n("div", {
			className: "min-w-0",
			children: [/* @__PURE__ */ n("div", {
				className: "flex items-center gap-2 min-w-0",
				children: [/* @__PURE__ */ t(i, {
					className: "text-sm font-semibold text-[var(--color-text-primary)] truncate",
					children: r
				}), o]
			}), a && /* @__PURE__ */ t("p", {
				className: "text-xs text-[var(--color-text-tertiary)] mt-0.5",
				children: a
			})]
		}), s && /* @__PURE__ */ t("div", {
			className: "flex-shrink-0",
			children: s
		})]
	});
}
//#endregion
export { r as t };
