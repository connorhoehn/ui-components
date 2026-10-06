import { t as e } from "./overlayStack-D0Hf2ZrU.js";
import { useEffect as t, useRef as n } from "react";
//#region src/lib/focusTrap.ts
var r = [
	"a[href]",
	"button:not([disabled])",
	"input:not([disabled]):not([type=\"hidden\"])",
	"select:not([disabled])",
	"textarea:not([disabled])",
	"[tabindex]:not([tabindex=\"-1\"])",
	"[contenteditable=\"true\"]"
].join(",");
function i(e) {
	return Array.from(e.querySelectorAll(r)).filter((e) => e.getAttribute("aria-hidden") !== "true" && e.style.display !== "none" && e.style.visibility !== "hidden");
}
function a(e, t) {
	if (e.key !== "Tab" || !t) return !1;
	let n = i(t);
	if (n.length === 0) return e.preventDefault(), !0;
	let r = n[0], a = n[n.length - 1], o = t.ownerDocument?.activeElement ?? null;
	return !o || !t.contains(o) ? (e.preventDefault(), r.focus(), !0) : e.shiftKey && o === r ? (e.preventDefault(), a.focus(), !0) : !e.shiftKey && o === a && (e.preventDefault(), r.focus(), !0);
}
function o(e) {
	if (!e) return;
	let t = e.querySelector("[data-autofocus]");
	if (t) {
		t.focus();
		return;
	}
	let n = i(e);
	if (n.length > 0) {
		n[0].focus();
		return;
	}
	e.setAttribute("tabindex", "-1"), e.focus();
}
function s(e) {
	e && typeof e.focus == "function" && e.ownerDocument?.contains(e) && e.focus();
}
function c(r, i) {
	let a = e(r), o = n(null), c = n(i);
	c.current = i, t(() => {
		if (!r) return;
		let e = (e) => {
			e.key === "Escape" && a() && c.current();
		};
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, [r, a]), t(() => {
		if (r) return o.current = typeof document < "u" ? document.activeElement : null, () => {
			s(o.current), o.current = null;
		};
	}, [r]);
}
//#endregion
export { c as i, s as n, a as r, o as t };
