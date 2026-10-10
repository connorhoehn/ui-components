import { t as e } from "./cn-D4QmbyEy.js";
import { createContext as t, useContext as n } from "react";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
//#region src/components/ui/Table.tsx
var a = t("md");
function o({ children: t, className: n, size: i = "md", ...o }) {
	return /* @__PURE__ */ r(a.Provider, {
		value: i,
		children: /* @__PURE__ */ r("table", {
			className: e("w-full text-sm", n),
			"data-size": i === "sm" ? "sm" : void 0,
			...o,
			children: t
		})
	});
}
function s({ children: t, className: n, ...i }) {
	return /* @__PURE__ */ r("thead", {
		className: e("border-b border-border bg-surface-panel", n),
		...i,
		children: t
	});
}
function c({ children: t, className: n, ...i }) {
	return /* @__PURE__ */ r("tbody", {
		className: e("", n),
		...i,
		children: t
	});
}
function l({ children: t, clickable: n, className: i, ...a }) {
	return /* @__PURE__ */ r("tr", {
		className: e("border-b border-border-subtle last:border-b-0 transition-colors", n && "cursor-pointer hover:bg-surface-panel", i),
		...a,
		children: t
	});
}
function u({ children: t, sortable: o, sortDirection: s, numeric: c, className: l, ...u }) {
	let d = n(a);
	return /* @__PURE__ */ i("th", {
		className: e(d === "sm" ? "text-left px-3 py-2 text-neutral font-semibold text-xs uppercase tracking-wide whitespace-nowrap select-none" : "text-left px-4 py-2.5 text-neutral font-semibold text-[11px] uppercase tracking-wide select-none", c && "text-right", o && "cursor-pointer hover:text-text-primary transition-colors", l),
		...u,
		children: [t, o && s && /* @__PURE__ */ r("span", {
			className: "ml-1 text-text-tertiary",
			children: s === "asc" ? "↑" : "↓"
		})]
	});
}
function d({ children: t, numeric: i, className: o, ...s }) {
	let c = n(a);
	return /* @__PURE__ */ r("td", {
		className: e(c === "sm" ? "h-11 px-3 py-0 text-sm leading-5 text-text-primary align-middle whitespace-nowrap" : "px-4 py-3 text-sm text-text-primary align-middle", i && "text-right tabular-nums", o),
		...s,
		children: t
	});
}
//#endregion
export { d as a, l as i, c as n, u as o, s as r, o as t };
