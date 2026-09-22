import { t as e } from "./cn-DhjIN-s0.js";
import { t } from "./Stack-CkiMw5K0.js";
import { Children as n } from "react";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
//#region src/components/ui/SelectableCard.tsx
var a = {
	sm: "p-3",
	md: "p-4",
	lg: "p-6"
};
function o({ children: t, selected: n = !1, onSelect: i, padding: o = "sm", disabled: s = !1, className: c, ...l }) {
	return /* @__PURE__ */ r("button", {
		type: "button",
		"aria-pressed": n,
		disabled: s,
		onClick: i,
		className: e("block w-full text-left font-inherit rounded-lg border transition-colors duration-150", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40", a[o], n ? "border-primary bg-surface-hover" : "border-border bg-surface hover:border-border-emphasis", s ? "opacity-50 cursor-not-allowed" : "cursor-pointer", c),
		...l,
		children: t
	});
}
//#endregion
//#region src/components/shared/MetaLine.tsx
var s = {
	xs: "text-[11px]",
	sm: "text-[12px]"
}, c = {
	tertiary: "text-text-tertiary",
	secondary: "text-text-secondary"
};
function l(e) {
	return e == null || e === !1 || e === !0 ? !1 : typeof e == "string" ? e.trim() !== "" : !Array.isArray(e) || n.toArray(e).some(l);
}
function u({ items: t, separator: n = "·", size: a = "xs", tone: o = "tertiary", className: u, "data-testid": d }) {
	let f = t.filter(l);
	return f.length === 0 ? null : /* @__PURE__ */ r("div", {
		className: e("flex flex-wrap items-center gap-x-1.5 gap-y-0.5", s[a], c[o], u),
		"data-testid": d,
		children: f.map((e, t) => /* @__PURE__ */ i("span", {
			className: "flex items-center gap-1.5",
			children: [t > 0 ? /* @__PURE__ */ r("span", {
				"aria-hidden": "true",
				children: n
			}) : null, e]
		}, t))
	});
}
//#endregion
//#region src/components/shared/Text.tsx
function d({ as: e = "span", className: n, title: i, children: a, wrap: o = !1, ...s }) {
	return /* @__PURE__ */ r(t, {
		as: e,
		gap: "none",
		wrap: o,
		className: n,
		title: i,
		...s,
		children: a
	});
}
var f = d;
//#endregion
export { o as i, d as n, u as r, f as t };
