import { d as e } from "./Button-DQoeE5dN.js";
import { jsx as t } from "react/jsx-runtime";
//#region src/components/shared/Link.tsx
var n = "text-primary no-underline hover:underline";
function r(e) {
	let t = new Set((e ?? "").split(/\s+/).filter(Boolean));
	return t.add("noopener"), t.add("noreferrer"), [...t].join(" ");
}
function i({ href: i, children: a, external: o = !1, unstyled: s = !1, target: c, rel: l, className: u, ...d }) {
	let f = o ? "_blank" : c, p = f === "_blank";
	return /* @__PURE__ */ t("a", {
		...d,
		href: i,
		target: f,
		rel: p ? r(l) : l,
		className: e(!s && n, u),
		children: a
	});
}
//#endregion
export { i as t };
