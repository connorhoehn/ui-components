import { useCallback as e, useEffect as t, useRef as n } from "react";
//#region src/lib/overlayStack.ts
var r = [];
function i(e) {
	r = r.filter((t) => t !== e), r.push(e);
}
function a(e) {
	r = r.filter((t) => t !== e);
}
function o(e) {
	return r.length === 0 || !r.includes(e) || r[r.length - 1] === e;
}
function s(r) {
	let s = n(null);
	s.current === null && (s.current = Symbol("overlay-layer"));
	let c = s.current;
	return t(() => {
		if (r) return i(c), () => a(c);
	}, [r, c]), e(() => o(c), [c]);
}
//#endregion
export { s as t };
