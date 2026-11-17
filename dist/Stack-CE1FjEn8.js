import { d as e } from "./Button-DQoeE5dN.js";
import { jsx as t } from "react/jsx-runtime";
//#region src/components/ui/Stack.tsx
var n = {
	none: "gap-0",
	xs: "gap-1",
	sm: "gap-2",
	md: "gap-3",
	lg: "gap-4",
	xl: "gap-6"
}, r = {
	start: "items-start",
	center: "items-center",
	end: "items-end",
	baseline: "items-baseline",
	stretch: "items-stretch"
}, i = {
	start: "justify-start",
	center: "justify-center",
	end: "justify-end",
	between: "justify-between"
};
function a(t, { gap: a = "md", align: o, justify: s, wrap: c }) {
	return e("flex", t === "col" ? "flex-col" : "flex-row", n[a], o ? r[o] : void 0, s ? i[s] : void 0, c ? "flex-wrap" : void 0);
}
function o({ children: n, gap: r, align: i, justify: o, wrap: s = !1, as: c = "div", className: l, ref: u, ...d }) {
	return /* @__PURE__ */ t(c, {
		ref: u,
		className: e(a("col", {
			gap: r,
			align: i,
			justify: o,
			wrap: s
		}), l),
		"data-ui-layout": "stack",
		...d,
		children: n
	});
}
function s({ children: n, gap: r = "sm", align: i = "center", justify: o, wrap: s = !0, as: c = "div", className: l, ref: u, ...d }) {
	return /* @__PURE__ */ t(c, {
		ref: u,
		className: e(a("row", {
			gap: r,
			align: i,
			justify: o,
			wrap: s
		}), l),
		"data-ui-layout": "inline",
		...d,
		children: n
	});
}
//#endregion
export { o as n, s as t };
