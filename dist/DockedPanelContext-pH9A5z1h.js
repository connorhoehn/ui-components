import { createContext as e, useContext as t } from "react";
import { jsx as n } from "react/jsx-runtime";
//#region src/components/shared/DockedPanelContext.tsx
var r = e(null);
function i() {
	return t(r);
}
function a({ hasHeader: e = !0, fillsHeight: t = !0, children: i }) {
	return /* @__PURE__ */ n(r.Provider, {
		value: {
			hasHeader: e,
			fillsHeight: t
		},
		children: i
	});
}
//#endregion
export { i as n, a as t };
