import { t as e } from "./cn-DhjIN-s0.js";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
//#region src/components/shared/FollowUpChips.tsx
function r({ suggestions: r, onSelect: i, onRefresh: a, label: o, className: s }) {
	return /* @__PURE__ */ n("div", {
		className: e("flex items-center flex-wrap gap-1.5 py-2", s),
		children: [
			o && /* @__PURE__ */ t("span", {
				className: "text-xs text-[var(--color-text-tertiary)] mr-1",
				children: o
			}),
			r.map((e, n) => /* @__PURE__ */ t("button", {
				type: "button",
				onClick: () => i(e),
				className: "inline-flex items-center px-3 py-1 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-xs text-[var(--color-text-secondary)] hover:bg-[var(--color-primary)] hover:text-white hover:border-[var(--color-primary)] transition-colors",
				children: e
			}, n)),
			a && /* @__PURE__ */ t("button", {
				type: "button",
				onClick: a,
				className: "inline-flex items-center justify-center w-7 h-7 rounded-full border border-[var(--color-border)] text-[var(--color-text-tertiary)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text-primary)] transition-colors text-base",
				title: "Refresh suggestions",
				children: "↻"
			})
		]
	});
}
//#endregion
export { r as t };
