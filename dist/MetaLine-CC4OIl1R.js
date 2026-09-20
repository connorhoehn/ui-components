import { t as e } from "./cn-DhjIN-s0.js";
import { Children as t } from "react";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
//#region src/components/ui/SelectableCard.tsx
var i = {
	sm: "p-3",
	md: "p-4",
	lg: "p-6"
};
function a({ children: t, selected: r = !1, onSelect: a, padding: o = "sm", disabled: s = !1, className: c, ...l }) {
	return /* @__PURE__ */ n("button", {
		type: "button",
		"aria-pressed": r,
		disabled: s,
		onClick: a,
		className: e("block w-full text-left font-inherit rounded-lg border transition-colors duration-150", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40", i[o], r ? "border-primary bg-surface-hover" : "border-border bg-surface hover:border-border-emphasis", s ? "opacity-50 cursor-not-allowed" : "cursor-pointer", c),
		...l,
		children: t
	});
}
//#endregion
//#region src/components/shared/MetaLine.tsx
var o = {
	xs: "text-[11px]",
	sm: "text-[12px]"
}, s = {
	tertiary: "text-text-tertiary",
	secondary: "text-text-secondary"
};
function c(e) {
	return e == null || e === !1 || e === !0 ? !1 : typeof e == "string" ? e.trim() !== "" : !Array.isArray(e) || t.toArray(e).some(c);
}
function l({ items: t, separator: i = "·", size: a = "xs", tone: l = "tertiary", className: u, "data-testid": d }) {
	let f = t.filter(c);
	return f.length === 0 ? null : /* @__PURE__ */ n("div", {
		className: e("flex flex-wrap items-center gap-x-1.5 gap-y-0.5", o[a], s[l], u),
		"data-testid": d,
		children: f.map((e, t) => /* @__PURE__ */ r("span", {
			className: "flex items-center gap-1.5",
			children: [t > 0 ? /* @__PURE__ */ n("span", {
				"aria-hidden": "true",
				children: i
			}) : null, e]
		}, t))
	});
}
//#endregion
export { a as n, l as t };
