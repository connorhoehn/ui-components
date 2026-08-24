//#region src/lib/focusTrap.ts
var e = [
	"a[href]",
	"button:not([disabled])",
	"input:not([disabled]):not([type=\"hidden\"])",
	"select:not([disabled])",
	"textarea:not([disabled])",
	"[tabindex]:not([tabindex=\"-1\"])",
	"[contenteditable=\"true\"]"
].join(",");
function t(t) {
	return Array.from(t.querySelectorAll(e)).filter((e) => e.getAttribute("aria-hidden") !== "true" && e.style.display !== "none" && e.style.visibility !== "hidden");
}
function n(e, n) {
	if (e.key !== "Tab" || !n) return !1;
	let r = t(n);
	if (r.length === 0) return e.preventDefault(), !0;
	let i = r[0], a = r[r.length - 1], o = n.ownerDocument?.activeElement ?? null;
	return !o || !n.contains(o) ? (e.preventDefault(), i.focus(), !0) : e.shiftKey && o === i ? (e.preventDefault(), a.focus(), !0) : !e.shiftKey && o === a && (e.preventDefault(), i.focus(), !0);
}
function r(e) {
	if (!e) return;
	let n = e.querySelector("[data-autofocus]");
	if (n) {
		n.focus();
		return;
	}
	let r = t(e);
	if (r.length > 0) {
		r[0].focus();
		return;
	}
	e.setAttribute("tabindex", "-1"), e.focus();
}
function i(e) {
	e && typeof e.focus == "function" && e.ownerDocument?.contains(e) && e.focus();
}
//#endregion
export { i as n, n as r, r as t };
