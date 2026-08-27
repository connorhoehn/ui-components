import { useEffect as e, useState as t } from "react";
//#region src/components/diagram/useResolvedTheme.ts
function n(e) {
	if (typeof document > "u") return "light";
	let t = (e?.closest("[data-theme]") ?? document.querySelector("[data-theme]"))?.getAttribute("data-theme");
	return t === "dark" ? "dark" : t === "light" ? "light" : typeof window < "u" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
function r(r) {
	let [i, a] = t("light");
	return e(() => {
		if (typeof document > "u") return;
		let e = () => a(n(r.current));
		e();
		let t = new MutationObserver(e);
		t.observe(document.documentElement, {
			attributes: !0,
			attributeFilter: ["data-theme"],
			subtree: !0
		});
		let i = window.matchMedia?.("(prefers-color-scheme: dark)");
		return i?.addEventListener?.("change", e), () => {
			t.disconnect(), i?.removeEventListener?.("change", e);
		};
	}, [r]), i;
}
//#endregion
export { r as t };
