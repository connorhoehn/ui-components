import { t as e } from "./Stack-DNMA-_4L.js";
import { jsx as t } from "react/jsx-runtime";
//#region src/components/shared/Text.tsx
var n = {
	xs: "text-xs",
	sm: "text-sm",
	base: "text-base",
	lg: "text-lg"
}, r = {
	normal: "font-normal",
	medium: "font-medium",
	semibold: "font-semibold",
	bold: "font-bold"
}, i = {
	primary: "text-text-primary",
	secondary: "text-text-secondary",
	tertiary: "text-text-tertiary",
	inherit: ""
};
function a({ as: a = "span", className: o, title: s, children: c, wrap: l = !1, size: u, weight: d, tone: f, tabular: p = !1, ...m }) {
	let h = [
		u && n[u],
		d && r[d],
		f && i[f],
		p && "tabular-nums",
		o
	].filter(Boolean).join(" ") || void 0;
	return /* @__PURE__ */ t(e, {
		as: a,
		gap: "none",
		wrap: l,
		className: h,
		title: s,
		...m,
		children: c
	});
}
var o = a;
//#endregion
export { a as n, o as t };
