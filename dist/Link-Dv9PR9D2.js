import { d as e } from "./Button-DQoeE5dN.js";
import { n as t } from "./safeHref-CSAycLWi.js";
import { jsx as n } from "react/jsx-runtime";
//#region src/components/shared/Link.tsx
var r = "text-primary no-underline hover:underline";
function i(e) {
	let t = new Set((e ?? "").split(/\s+/).filter(Boolean));
	return t.add("noopener"), t.add("noreferrer"), [...t].join(" ");
}
function a({ href: a, children: o, external: s = !1, unstyled: c = !1, target: l, rel: u, className: d, ...f }) {
	let p = s ? "_blank" : l, m = p === "_blank";
	return /* @__PURE__ */ n("a", {
		...f,
		href: t(a) ?? void 0,
		target: p,
		rel: m ? i(u) : u,
		className: e(!c && r, d),
		children: o
	});
}
//#endregion
export { a as t };
