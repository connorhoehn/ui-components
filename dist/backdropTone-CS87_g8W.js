import { createContext as e, useContext as t, useLayoutEffect as n, useState as r } from "react";
//#region src/components/shared/backdropTone.ts
function i() {
	return typeof window > "u" || typeof window.matchMedia != "function" ? !1 : window.matchMedia("(prefers-color-scheme: dark)").matches;
}
function a(e, t, n = i()) {
	if (e !== "auto") return e;
	for (let e = t?.parentElement ?? null; e; e = e.parentElement) {
		let t = e.getAttribute("data-backdrop-tone");
		if (t === "night" || t === "graphite") return t;
		let n = e.getAttribute("data-theme");
		if (n === "dark") return "night";
		if (n === "light") return "graphite";
	}
	return n ? "night" : "graphite";
}
function o(e, t, i = !0) {
	let [o, s] = r(() => t === "auto" ? "graphite" : t);
	return n(() => {
		if (t !== "auto") {
			s(t);
			return;
		}
		if (!i) return;
		let n = () => s(a("auto", e.current));
		n();
		let r = [];
		if (typeof MutationObserver < "u" && typeof document < "u") {
			let e = new MutationObserver(n);
			e.observe(document.documentElement, {
				attributes: !0,
				subtree: !0,
				attributeFilter: ["data-theme", "data-backdrop-tone"]
			}), r.push(() => e.disconnect());
		}
		if (typeof window < "u" && typeof window.matchMedia == "function") {
			let e = window.matchMedia("(prefers-color-scheme: dark)");
			e.addEventListener?.("change", n), r.push(() => e.removeEventListener?.("change", n));
		}
		return () => r.forEach((e) => e());
	}, [
		t,
		i,
		e
	]), o;
}
var s = [
	"#f4f4f5",
	"#d4d4d8",
	"#a1a1aa"
], c = e(null);
function l() {
	return t(c);
}
//#endregion
export { o as a, l as i, s as n, a as r, c as t };
