import { createContext as e, useContext as t } from "react";
import { jsx as n } from "react/jsx-runtime";
//#region src/contexts/IdentityContext.tsx
var r = e(null);
function i({ value: e, children: t }) {
	return /* @__PURE__ */ n(r.Provider, {
		value: e,
		children: t
	});
}
function a() {
	let e = t(r);
	if (!e) throw Error("useIdentityContext must be used within an <IdentityProvider>");
	return e;
}
//#endregion
export { a as n, i as t };
