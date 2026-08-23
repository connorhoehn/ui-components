import { createContext as e, useContext as t } from "react";
import { jsx as n } from "react/jsx-runtime";
//#region src/contexts/WebSocketContext.tsx
var r = e(null);
function i({ value: e, children: t }) {
	return /* @__PURE__ */ n(r.Provider, {
		value: e,
		children: t
	});
}
function a() {
	let e = t(r);
	if (!e) throw Error("useWebSocketContext must be used within a <WebSocketProvider>");
	return e;
}
//#endregion
export { a as n, i as t };
