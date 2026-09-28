import { t as e } from "./cn-DhjIN-s0.js";
import { t } from "./Stack-CkiMw5K0.js";
import { Children as n } from "react";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
//#region src/components/shared/MetaLine.tsx
var a = {
	xs: "text-[11px]",
	sm: "text-[12px]"
}, o = {
	tertiary: "text-text-tertiary",
	secondary: "text-text-secondary"
};
function s(e) {
	return e == null || e === !1 || e === !0 ? !1 : typeof e == "string" ? e.trim() !== "" : !Array.isArray(e) || n.toArray(e).some(s);
}
function c({ items: t, separator: n = "·", size: c = "xs", tone: l = "tertiary", className: u, "data-testid": d }) {
	let f = t.filter(s);
	return f.length === 0 ? null : /* @__PURE__ */ r("div", {
		className: e("flex flex-wrap items-center gap-x-1.5 gap-y-0.5", a[c], o[l], u),
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
function l({ as: e = "span", className: n, title: i, children: a, wrap: o = !1, ...s }) {
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
var u = l;
//#endregion
export { l as n, c as r, u as t };
