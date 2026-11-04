import { useCallback as e, useEffect as t, useState as n } from "react";
//#region src/hooks/useFullscreen.ts
function r() {
	if (typeof document > "u") return null;
	let e = document;
	return e.fullscreenElement ?? e.webkitFullscreenElement ?? null;
}
function i() {
	if (typeof document > "u" || typeof Element > "u") return !1;
	let e = Element.prototype;
	return document.fullscreenEnabled !== !1 && !!(e.requestFullscreen ?? e.webkitRequestFullscreen);
}
function a(a) {
	let [o, s] = n(!1), [c, l] = n(!1), [u, d] = n(!1);
	t(() => {
		if (d(i()), typeof document > "u") return;
		let e = () => s(!!a.current && r() === a.current);
		return e(), document.addEventListener("fullscreenchange", e), document.addEventListener("webkitfullscreenchange", e), () => {
			document.removeEventListener("fullscreenchange", e), document.removeEventListener("webkitfullscreenchange", e);
		};
	}, [a]);
	let f = e(async () => {
		let e = a.current;
		if (l(!1), !e) {
			l(!0);
			return;
		}
		try {
			let t = e.requestFullscreen ?? e.webkitRequestFullscreen;
			if (!t) {
				l(!0);
				return;
			}
			await t.call(e);
		} catch {
			l(!0);
		}
	}, [a]), p = e(async () => {
		if (typeof document > "u") return;
		let e = document;
		l(!1);
		try {
			if (!r()) return;
			await (e.exitFullscreen ?? e.webkitExitFullscreen)?.call(e);
		} catch {
			l(!0);
		}
	}, []);
	return {
		active: o,
		supported: u,
		error: c,
		enter: f,
		exit: p,
		toggle: e(async () => {
			a.current && r() === a.current ? await p() : await f();
		}, [
			a,
			f,
			p
		])
	};
}
//#endregion
export { a as n, i as t };
