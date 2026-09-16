import { t as e } from "./cn-DhjIN-s0.js";
import { jsx as t } from "react/jsx-runtime";
//#region src/components/ui/SelectableCard.tsx
var n = {
	sm: "p-3",
	md: "p-4",
	lg: "p-6"
};
function r({ children: r, selected: i = !1, onSelect: a, padding: o = "sm", disabled: s = !1, className: c, ...l }) {
	return /* @__PURE__ */ t("button", {
		type: "button",
		"aria-pressed": i,
		disabled: s,
		onClick: a,
		className: e("block w-full text-left font-inherit rounded-lg border transition-colors duration-150", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40", n[o], i ? "border-primary bg-surface-hover" : "border-border bg-surface hover:border-border-emphasis", s ? "opacity-50 cursor-not-allowed" : "cursor-pointer", c),
		...l,
		children: r
	});
}
//#endregion
export { r as t };
