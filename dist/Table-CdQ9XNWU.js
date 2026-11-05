import { t as e } from "./cn-D4QmbyEy.js";
import { l as t } from "./Button-C-I3BxWI.js";
import { createContext as n, useContext as r } from "react";
import { jsx as i, jsxs as a } from "react/jsx-runtime";
//#region src/components/ui/Table.tsx
var o = n("md"), s = n(!1), c = "even:bg-surface-inset", l = /(?:^|\s)bg-/;
function u({ children: n, className: r, size: a, ...s }) {
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
				"data-ui-part": "",
				className: e("w-full text-sm", r),
				"data-ui-table": "",
				"data-size": c === "sm" ? "sm" : void 0,
				...s,
				children: n
			})
		})
	});
}
function d({ children: t, className: n, ...r }) {
	return /* @__PURE__ */ i("thead", {
		className: e("border-b border-border bg-surface-panel", n),
		...r,
		children: t
	});
}
function f({ children: t, className: n, striped: r = !0, ...a }) {
	return /* @__PURE__ */ i(s.Provider, {
		value: r,
		children: /* @__PURE__ */ i("tbody", {
			className: e("", n),
			"data-striped": r ? "" : void 0,
			"data-ui-table-striped": r ? "" : void 0,
			...a,
			children: t
		})
	});
}
function p({ children: t, clickable: n, className: a, ...o }) {
	let u = r(s);
	return /* @__PURE__ */ i("tr", {
		className: e("border-b border-border-subtle last:border-b-0 transition-colors", u && !(a && l.test(a)) && c, n && "cursor-pointer hover:bg-surface-panel", a),
		...o,
		children: t
	});
}
function m({ children: t, sortable: n, sortDirection: s, numeric: c, className: l, ...u }) {
	let d = r(o);
	return /* @__PURE__ */ a("th", {
		className: e(d === "sm" ? "text-left px-[var(--ui-table-inset,0.75rem)] py-2 text-text-secondary font-semibold text-xs uppercase tracking-wide whitespace-nowrap select-none" : "text-left px-4 py-2.5 text-text-secondary font-semibold text-[12px] uppercase tracking-wide select-none", c && "text-right", n && "cursor-pointer hover:text-text-primary transition-colors", l),
		...u,
		children: [t, n && s && /* @__PURE__ */ i("span", {
			className: "ml-1 text-text-tertiary",
			children: s === "asc" ? "↑" : "↓"
		})]
	});
}
function h({ children: t, numeric: n, className: a, ...s }) {
	let c = r(o);
	return /* @__PURE__ */ i("td", {
		className: e(c === "sm" ? "h-[var(--ui-table-row,2.75rem)] px-[var(--ui-table-inset,0.75rem)] py-0 text-sm leading-5 text-text-primary align-middle whitespace-nowrap" : "px-4 py-3 text-sm text-text-primary align-middle", n && "text-right tabular-nums", a),
		...s,
		children: t
	});
}
//#endregion
export { h as a, p as i, f as n, m as o, d as r, u as t };
