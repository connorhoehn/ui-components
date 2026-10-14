import { t as e } from "./cn-D4QmbyEy.js";
import { l as t } from "./Button-uREUOWUk.js";
import { createContext as n, useContext as r } from "react";
import { jsx as i, jsxs as a } from "react/jsx-runtime";
//#region src/components/ui/Table.tsx
var o = n("md");
function s({ children: n, className: r, size: a, ...s }) {
	let c = t("Table", a, {
		comfortable: "md",
		compact: "sm"
	});
	return /* @__PURE__ */ i(o.Provider, {
		value: c,
		children: /* @__PURE__ */ i("div", {
			className: "w-full min-w-0 max-w-full overflow-x-auto",
			"data-table-scroller": "",
			children: /* @__PURE__ */ i("table", {
				className: e("w-full text-sm", r),
				"data-size": c === "sm" ? "sm" : void 0,
				...s,
				children: n
			})
		})
	});
}
function c({ children: t, className: n, ...r }) {
	return /* @__PURE__ */ i("thead", {
		className: e("border-b border-border bg-surface-panel", n),
		...r,
		children: t
	});
}
function l({ children: t, className: n, ...r }) {
	return /* @__PURE__ */ i("tbody", {
		className: e("", n),
		...r,
		children: t
	});
}
function u({ children: t, clickable: n, className: r, ...a }) {
	return /* @__PURE__ */ i("tr", {
		className: e("border-b border-border-subtle last:border-b-0 transition-colors", n && "cursor-pointer hover:bg-surface-panel", r),
		...a,
		children: t
	});
}
function d({ children: t, sortable: n, sortDirection: s, numeric: c, className: l, ...u }) {
	let d = r(o);
	return /* @__PURE__ */ a("th", {
		className: e(d === "sm" ? "text-left px-[var(--ui-table-inset,0.75rem)] py-2 text-neutral font-semibold text-xs uppercase tracking-wide whitespace-nowrap select-none" : "text-left px-4 py-2.5 text-neutral font-semibold text-[12px] uppercase tracking-wide select-none", c && "text-right", n && "cursor-pointer hover:text-text-primary transition-colors", l),
		...u,
		children: [t, n && s && /* @__PURE__ */ i("span", {
			className: "ml-1 text-text-tertiary",
			children: s === "asc" ? "↑" : "↓"
		})]
	});
}
function f({ children: t, numeric: n, className: a, ...s }) {
	let c = r(o);
	return /* @__PURE__ */ i("td", {
		className: e(c === "sm" ? "h-[var(--ui-table-row,2.75rem)] px-[var(--ui-table-inset,0.75rem)] py-0 text-sm leading-5 text-text-primary align-middle whitespace-nowrap" : "px-4 py-3 text-sm text-text-primary align-middle", n && "text-right tabular-nums", a),
		...s,
		children: t
	});
}
//#endregion
export { f as a, u as i, l as n, d as o, c as r, s as t };
