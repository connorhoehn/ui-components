import { t as e } from "./cn-DhjIN-s0.js";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
//#region src/components/ui/SelectableCard.tsx
var r = {
	sm: "p-3",
	md: "p-4",
	lg: "p-6"
};
function i({ children: n, selected: i = !1, onSelect: a, padding: o = "sm", disabled: s = !1, className: c, ...l }) {
	return /* @__PURE__ */ t("button", {
		type: "button",
		"aria-pressed": i,
		disabled: s,
		onClick: a,
		className: e("block w-full text-left font-inherit rounded-lg border transition-colors duration-150", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40", r[o], i ? "border-primary bg-surface-hover" : "border-border bg-surface hover:border-border-emphasis", s ? "opacity-50 cursor-not-allowed" : "cursor-pointer", c),
		...l,
		children: n
	});
}
//#endregion
//#region src/components/shared/SegmentedControl.tsx
var a = {
	sm: "px-2.5 py-1 text-xs",
	md: "px-3 py-1.5 text-sm"
}, o = "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]", s = "bg-surface shadow-sm text-[var(--color-text-primary)] border border-[var(--color-border)]";
function c({ options: r, value: i, onChange: c, size: l = "md", className: u }) {
	return /* @__PURE__ */ t("div", {
		role: "group",
		className: e("inline-flex items-center rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-inset,#f8fafc)] p-0.5 gap-0.5", u),
		children: r.map((t) => {
			let r = t.value === i;
			return /* @__PURE__ */ n("button", {
				type: "button",
				onClick: () => c(t.value),
				"aria-pressed": r,
				className: e("inline-flex items-center gap-1.5 rounded-md font-medium transition-all cursor-pointer", a[l], r ? s : o),
				children: [t.icon, t.label]
			}, t.value);
		})
	});
}
//#endregion
export { i as n, c as t };
