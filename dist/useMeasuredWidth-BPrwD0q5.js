import { useCallback as e, useRef as t, useState as n } from "react";
//#region src/components/doc-editor/useMeasuredWidth.ts
function r(r) {
	let [i, a] = n(null), o = t(null);
	return {
		ref: e((e) => {
			if (typeof r == "function" ? r(e) : r && (r.current = e), o.current?.disconnect(), o.current = null, !e || typeof ResizeObserver > "u") return;
			let t = new ResizeObserver((e) => {
				let t = e[0]?.contentRect.width;
				t != null && a(t);
			});
			t.observe(e), o.current = t;
		}, [r]),
		width: i
	};
}
//#endregion
export { r as t };
