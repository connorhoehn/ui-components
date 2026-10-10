import { createContext as e, useContext as t } from "react";
import { jsx as n } from "react/jsx-runtime";
//#region src/components/shared/Density.tsx
var r = ["comfortable", "compact"], i = e("comfortable");
function a({ value: e, children: t }) {
	return /* @__PURE__ */ n(i.Provider, {
		value: e,
		children: t
	});
}
function o(e) {
	let n = t(i);
	return e ?? n;
}
//#endregion
export { a as n, o as r, r as t };
