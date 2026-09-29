import { t as e } from "./cn-D4QmbyEy.js";
import "react";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
//#region src/components/shared/CardHeader.tsx
function r({ title: r, subtitle: i, meta: a, action: o, inset: s = !1, className: c }) {
	return /* @__PURE__ */ n("div", {
		className: e("flex items-center justify-between gap-4", s && "px-3.5 pt-3 pb-2.5 border-b border-[var(--color-border)]", c),
		children: [/* @__PURE__ */ n("div", {
			className: "min-w-0",
			children: [/* @__PURE__ */ n("div", {
				className: "flex items-center gap-2 min-w-0",
				children: [/* @__PURE__ */ t("h3", {
					className: "text-sm font-semibold text-[var(--color-text-primary)] truncate",
					children: r
				}), a]
			}), i && /* @__PURE__ */ t("p", {
				className: "text-xs text-[var(--color-text-tertiary)] mt-0.5",
				children: i
			})]
		}), o && /* @__PURE__ */ t("div", {
			className: "flex-shrink-0",
			children: o
		})]
	});
}
//#endregion
export { r as t };
