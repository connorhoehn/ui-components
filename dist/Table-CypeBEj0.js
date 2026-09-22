import { t as e } from "./cn-DhjIN-s0.js";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
//#region src/components/ui/Table.tsx
function r({ children: n, className: r, ...i }) {
	return /* @__PURE__ */ t("table", {
		className: e("w-full text-sm", r),
		...i,
		children: n
	});
}
function i({ children: n, className: r, ...i }) {
	return /* @__PURE__ */ t("thead", {
		className: e("border-b border-border bg-surface-panel", r),
		...i,
		children: n
	});
}
function a({ children: n, className: r, ...i }) {
	return /* @__PURE__ */ t("tbody", {
		className: e("", r),
		...i,
		children: n
	});
}
function o({ children: n, clickable: r, className: i, ...a }) {
	return /* @__PURE__ */ t("tr", {
		className: e("border-b border-border-subtle last:border-b-0 transition-colors", r && "cursor-pointer hover:bg-surface-panel", i),
		...a,
		children: n
	});
}
function s({ children: r, sortable: i, sortDirection: a, className: o, ...s }) {
	return /* @__PURE__ */ n("th", {
		className: e("text-left px-4 py-2.5 text-neutral font-semibold text-[11px] uppercase tracking-wide select-none", i && "cursor-pointer hover:text-text-primary transition-colors", o),
		...s,
		children: [r, i && a && /* @__PURE__ */ t("span", {
			className: "ml-1 text-text-tertiary",
			children: a === "asc" ? "↑" : "↓"
		})]
	});
}
function c({ children: n, className: r, ...i }) {
	return /* @__PURE__ */ t("td", {
		className: e("px-4 py-3 text-sm text-text-primary align-middle", r),
		...i,
		children: n
	});
}
//#endregion
export { c as a, o as i, a as n, s as o, i as r, r as t };
