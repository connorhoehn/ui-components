//#region src/lib/apiBaseUrl.ts
var e = null;
function t(t) {
	e = t;
}
function n() {
	if (e !== null) return e;
	let t = globalThis.__UI_COMPONENTS_ENV__, n = t?.VITE_SOCIAL_API_URL ?? t?.VITE_PLATFORM_API_URL;
	if (n) return n;
	let r = {
		BASE_URL: "/",
		DEV: !1,
		MODE: "production",
		PROD: !0,
		SSR: !1
	};
	return r.VITE_SOCIAL_API_URL ?? r.VITE_PLATFORM_API_URL ?? "";
}
var r = t, i = n;
//#endregion
export { r as i, i as n, t as r, n as t };
