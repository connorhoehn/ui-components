import { t as e } from "./cn-D4QmbyEy.js";
import { useCallback as t, useRef as n } from "react";
import { Fragment as r, jsx as i, jsxs as a } from "react/jsx-runtime";
//#region src/components/shared/Toolbar.tsx
var o = {
	sm: "min-h-9 px-3 gap-2 text-xs",
	md: "min-h-11 px-4 gap-2.5 text-sm"
}, s = {
	surface: "bg-surface text-text-primary border-border",
	code: "bg-code-panel text-code-text border-code-border"
}, c = {
	surface: "bg-border",
	code: "bg-code-border"
}, l = "a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex=\"-1\"])";
function u({ children: r, end: c, tone: u = "surface", variant: d = "surface", size: f = "sm", sticky: p = !1, bordered: m = !0, wrap: h = !1, className: g, "aria-label": _ = "Toolbar", "data-testid": v, "data-collection-selection": y, "data-collection-layout": b, "data-collection-placement": x }) {
	let S = n(null), C = t((e) => {
		if (![
			"ArrowLeft",
			"ArrowRight",
			"Home",
			"End"
		].includes(e.key)) return;
		let t = e.target;
		if (t && (t.isContentEditable || t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.tagName === "SELECT")) return;
		let n = S.current;
		if (!n) return;
		let r = Array.from(n.querySelectorAll(l));
		if (r.length === 0) return;
		let i = r.indexOf(document.activeElement), a;
		a = e.key === "Home" ? 0 : e.key === "End" ? r.length - 1 : i < 0 ? 0 : (i + (e.key === "ArrowRight" ? 1 : -1) + r.length) % r.length, r[a]?.focus(), e.preventDefault();
	}, []);
	return /* @__PURE__ */ a("div", {
		ref: S,
		role: "toolbar",
		"aria-label": _,
		"aria-orientation": "horizontal",
		"data-testid": v,
		"data-toolbar-variant": d,
		"data-collection-selection": y,
		"data-collection-layout": b,
		"data-collection-placement": x,
		onKeyDown: C,
		className: e("flex flex-none", h ? "flex-wrap items-start py-1.5" : "items-center", o[f], d === "collection" ? "bg-transparent text-text-primary px-[var(--ui-table-inset,0.75rem)]" : s[u], m && d !== "collection" && "border-b", p && "sticky top-0 z-20", g),
		children: [/* @__PURE__ */ i("div", {
			className: e("flex min-w-0 flex-auto items-center gap-2", h ? "flex-wrap gap-y-1.5" : "overflow-x-auto"),
			"data-toolbar-controls": "",
			children: r
		}), c && /* @__PURE__ */ i("div", {
			className: e("flex flex-initial shrink-[3] items-center gap-2", h ? "flex-wrap" : "pl-2"),
			children: c
		})]
	});
}
function d({ children: t, divided: n = !1, tone: o = "surface", className: s, "aria-label": c }) {
	return /* @__PURE__ */ a(r, { children: [n && /* @__PURE__ */ i(f, { tone: o }), /* @__PURE__ */ i("div", {
		role: c ? "group" : void 0,
		"aria-label": c,
		className: e("flex flex-none items-center gap-1.5", s),
		children: t
	})] });
}
function f({ tone: t = "surface", className: n }) {
	return /* @__PURE__ */ i("span", {
		role: "separator",
		"aria-orientation": "vertical",
		className: e("h-4 w-px flex-none", c[t], n)
	});
}
function p({ children: t, tone: n = "surface", className: r }) {
	return /* @__PURE__ */ i("span", {
		className: e("flex-none whitespace-nowrap", n === "code" ? "text-code-subtle" : "text-text-tertiary", r),
		children: t
	});
}
//#endregion
export { f as i, d as n, p as r, u as t };
