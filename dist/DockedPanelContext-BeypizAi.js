import { createContext as e, useContext as t } from "react";
import { jsx as n } from "react/jsx-runtime";
//#region src/components/shared/VisuallyHidden.tsx
var r = {
	position: "absolute",
	width: "1px",
	height: "1px",
	padding: 0,
	margin: "-1px",
	overflow: "hidden",
	clipPath: "inset(50%)",
	whiteSpace: "nowrap",
	border: 0
};
function i({ as: e = "span", children: t, className: i, id: a, "data-testid": o }) {
	return /* @__PURE__ */ n(e, {
		id: a,
		"data-testid": o,
		className: i,
		style: r,
		children: t
	});
}
//#endregion
//#region src/components/shared/DockedPanelContext.tsx
var a = e(null);
function o() {
	return t(a);
}
function s({ hasHeader: e = !0, fillsHeight: t = !0, children: r }) {
	return /* @__PURE__ */ n(a.Provider, {
		value: {
			hasHeader: e,
			fillsHeight: t
		},
		children: r
	});
}
//#endregion
export { i, o as n, r, s as t };
