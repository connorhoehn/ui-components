import { useEffect as e, useState as t } from "react";
//#region src/hooks/usePrefersReducedMotion.ts
function n() {
	let [n, r] = t(() => typeof window < "u" && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
	return e(() => {
		if (typeof window > "u") return;
		let e = window.matchMedia("(prefers-reduced-motion: reduce)"), t = () => r(e.matches);
		return e.addEventListener("change", t), () => e.removeEventListener("change", t);
	}, []), n;
}
//#endregion
export { n as t };
