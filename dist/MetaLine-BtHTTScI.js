import { t as e } from "./cn-D4QmbyEy.js";
import { Children as t } from "react";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
//#region src/components/shared/MetaLine.tsx
var i = {
	xs: "text-[11px]",
	sm: "text-[12px]"
}, a = {
	tertiary: "text-text-tertiary",
	secondary: "text-text-secondary"
};
function o(e) {
	return e == null || e === !1 || e === !0 ? !1 : typeof e == "string" ? e.trim() !== "" : !Array.isArray(e) || t.toArray(e).some(o);
}
function s({ items: t, separator: s = "·", size: c = "xs", tone: l = "tertiary", className: u, "data-testid": d }) {
	let f = t.filter(o);
	return f.length === 0 ? null : /* @__PURE__ */ n("div", {
		className: e("flex flex-wrap items-center gap-x-1.5 gap-y-0.5", i[c], a[l], u),
		"data-testid": d,
		children: f.map((e, t) => /* @__PURE__ */ r("span", {
			className: "flex items-center gap-1.5",
			children: [t > 0 ? /* @__PURE__ */ n("span", {
				"aria-hidden": "true",
				children: s
			}) : null, e]
		}, t))
	});
}
//#endregion
export { s as t };
