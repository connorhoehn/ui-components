import { useLayoutEffect as e, useState as t } from "react";
//#region src/components/shared/backdropTone.ts
function n() {
	return typeof window > "u" || typeof window.matchMedia != "function" ? !1 : window.matchMedia("(prefers-color-scheme: dark)").matches;
}
function r(e, t, r = n()) {
	if (e !== "auto") return e;
	for (let e = t?.parentElement ?? null; e; e = e.parentElement) {
		let t = e.getAttribute("data-backdrop-tone");
		if (t === "night" || t === "graphite") return t;
		let n = e.getAttribute("data-theme");
		if (n === "dark") return "night";
		if (n === "light") return "graphite";
	}
	return r ? "night" : "graphite";
}
function i(n, i, a = !0) {
	let [o, s] = t(() => i === "auto" ? "graphite" : i);
	return e(() => {
		if (i !== "auto") {
			s(i);
			return;
		}
		if (!a) return;
		let e = () => s(r("auto", n.current));
		e();
		let t = [];
		if (typeof MutationObserver < "u" && typeof document < "u") {
			let n = new MutationObserver(e);
			n.observe(document.documentElement, {
				attributes: !0,
				subtree: !0,
				attributeFilter: ["data-theme", "data-backdrop-tone"]
			}), t.push(() => n.disconnect());
		}
		if (typeof window < "u" && typeof window.matchMedia == "function") {
			let n = window.matchMedia("(prefers-color-scheme: dark)");
			n.addEventListener?.("change", e), t.push(() => n.removeEventListener?.("change", e));
		}
		return () => t.forEach((e) => e());
	}, [
		i,
		a,
		n
	]), o;
}
var a = [
	"#f4f4f5",
	"#d4d4d8",
	"#a1a1aa"
];
//#endregion
export { r as n, i as r, a as t };
