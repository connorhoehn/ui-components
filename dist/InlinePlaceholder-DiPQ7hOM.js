import { t as e } from "./cn-D4QmbyEy.js";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
//#region src/components/shared/InlinePlaceholder.tsx
var r = {
	xs: "text-[12px] gap-2",
	sm: "text-[14px] gap-3"
}, i = {
	start: "justify-start text-left",
	center: "justify-center text-center"
}, a = {
	surface: "text-text-tertiary",
	code: "text-code-raised"
};
function o({ children: o, action: s, size: c = "xs", align: l = "start", tone: u = "surface", className: d, "data-testid": f = "inline-placeholder" }) {
	return /* @__PURE__ */ n("div", {
		"data-testid": f,
		className: e("flex items-center flex-wrap leading-normal", r[c] ?? r.xs, i[l] ?? i.start, a[u] ?? a.surface, d),
		children: [/* @__PURE__ */ t("span", { children: o }), s != null && /* @__PURE__ */ t("span", {
			className: "shrink-0",
			children: s
		})]
	});
}
//#endregion
export { o as t };
