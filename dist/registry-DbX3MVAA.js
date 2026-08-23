//#region src/renderers/registry.ts
var e = /* @__PURE__ */ new Map();
function t(t) {
	e.set(t.type, t);
}
function n() {
	return Array.from(e.values());
}
function r(t) {
	return e.get(t);
}
var i = /* @__PURE__ */ new Map();
function a(e, t) {
	return `${e}:${t}`;
}
function o(e, t, n) {
	i.set(a(e, t), n);
}
function s(t, n) {
	let r = t ?? "*", o = e.get(r)?.rendererType ?? r;
	return i.get(a(o, n)) ?? i.get(a(o, "*")) ?? i.get(a("*", n)) ?? i.get(a("*", "*")) ?? null;
}
function c() {
	return Array.from(i.entries()).map(([e, t]) => {
		let [n, r] = e.split(":");
		return {
			sectionType: n,
			viewMode: r,
			component: t
		};
	});
}
//#endregion
export { t as a, c as i, n, o, s as r, r as t };
