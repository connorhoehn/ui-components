import { createContext as e, useContext as t } from "react";
import { jsx as n } from "react/jsx-runtime";
//#region src/components/shared/Density.tsx
var r = ["comfortable", "compact"], i = e({
	scale: "comfortable",
	form: "comfortable"
});
function a({ density: e, value: r, children: a }) {
	let o = t(i), s = r ?? e ?? o.scale, c = r ?? o.form, l = s === o.scale && c === o.form ? o : {
		scale: s,
		form: c
	};
	return /* @__PURE__ */ n(i.Provider, {
		value: l,
		children: a
	});
}
function o(e) {
	let n = t(i);
	return e ?? n.scale;
}
function s(e) {
	let n = t(i);
	return e ?? n.form;
}
var c = /* @__PURE__ */ new Set();
function l(e, t) {
	process.env.NODE_ENV !== "production" && (c.has(e) || (c.add(e), console.warn(`[${e}] \`size="${t}"\` is deprecated (2.440.0): the compact density draws it. Set \`<DensityProvider density="compact">\` once at the shell and drop the prop; the explicit size stays an override until 2.441.`)));
}
function u(e, t, n) {
	let r = o();
	return t === void 0 ? n[r] : (t === n.compact && n.compact !== n.comfortable && l(e, t), t);
}
//#endregion
export { u as a, s as i, a as n, l as o, o as r, r as t };
