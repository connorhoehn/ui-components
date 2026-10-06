import { t as e } from "./cn-D4QmbyEy.js";
import { a as t, i as n, n as r, o as i, r as a, t as o } from "./Table-CPSPcCzr.js";
import { isValidElement as s, useMemo as c, useState as l } from "react";
import { jsx as u, jsxs as d } from "react/jsx-runtime";
//#region src/components/shared/DataTable.tsx
function f(e, t) {
	if (typeof e == "number" && typeof t == "number") {
		let n = Number.isNaN(e), r = Number.isNaN(t);
		return n || r ? n && r ? 0 : n ? 1 : -1 : e < t ? -1 : +(e > t);
	}
	if (typeof e == "bigint" && typeof t == "bigint") return e < t ? -1 : +(e > t);
	if (e instanceof Date && t instanceof Date) {
		let n = e.getTime(), r = t.getTime(), i = Number.isNaN(n), a = Number.isNaN(r);
		return i || a ? i && a ? 0 : i ? 1 : -1 : n < r ? -1 : +(n > r);
	}
	return typeof e == "boolean" && typeof t == "boolean" ? e === t ? 0 : e ? 1 : -1 : String(e ?? "").localeCompare(String(t ?? ""));
}
function p(e) {
	if (e == null || typeof e == "boolean") return "";
	if (typeof e == "string") return e;
	if (typeof e == "number") return String(e);
	if (Array.isArray(e)) return e.map(p).join(" ");
	if (s(e)) {
		let t = e.props?.children;
		return t === void 0 ? "" : p(t);
	}
	return "";
}
var m = /* @__PURE__ */ new Set();
function h(e, t, n) {
	if (e.getFilterText) return e.getFilterText(t);
	let r = t[e.key];
	return r != null && typeof r != "object" && typeof r != "function" ? String(r) : e.render ? p(e.render(t, n)) : (process.env.NODE_ENV !== "production" && !m.has(e.key) && (m.add(e.key), console.warn(`[DataTable] Column "${e.key}" is searchable but its value lives in neither a primitive row value nor getFilterText, and it has no render function to fall back on — it will never match a search query. Add getFilterText, add render, or set filterable={false}.`)), String(r ?? ""));
}
function g(e) {
	if (e === "right") return "text-right";
	if (e === "center") return "text-center";
}
function _({ data: s, columns: p, keyField: m, onRowClick: _, rowActions: v, searchable: y = !1, searchPlaceholder: b = "Search…", pageSize: x, emptyMessage: S = "No records.", loading: C = !1, loadingRows: w = 5, frameless: T = !1, striped: E = !1, className: D, "data-testid": O }) {
	let k = Array.isArray(s) ? s : [], A = Array.isArray(p) ? p : [], [j, M] = l(null), [N, P] = l("asc"), [F, I] = l(""), [L, R] = l(0), z = (e) => {
		j === e ? P((e) => e === "asc" ? "desc" : "asc") : (M(e), P("asc"));
	}, B = c(() => {
		if (!y || F.trim() === "") return k;
		let e = F.trim().toLowerCase();
		return k.filter((t, n) => A.some((r) => r.filterable !== !1 && h(r, t, n).toLowerCase().includes(e)));
	}, [
		k,
		A,
		F,
		y
	]), V = c(() => {
		if (!j) return B;
		let e = A.find((e) => e.key === j);
		if (!e || !e.sortable) return B;
		let t = e.compare ?? ((t, n) => f(t[e.key], n[e.key])), n = [...B];
		return n.sort((e, n) => N === "asc" ? t(e, n) : -t(e, n)), n;
	}, [
		B,
		A,
		j,
		N
	]), H = x && x > 0 ? Math.max(1, Math.ceil(V.length / x)) : 1, U = Math.min(L, H - 1), W = c(() => {
		if (!x || x <= 0) return V;
		let e = U * x;
		return V.slice(e, e + x);
	}, [
		V,
		x,
		U
	]);
	return /* @__PURE__ */ d("div", {
		className: e("flex flex-col gap-3", D),
		"data-testid": O,
		children: [
			y && /* @__PURE__ */ u("input", {
				type: "text",
				value: F,
				onChange: (e) => {
					I(e.target.value), R(0);
				},
				placeholder: b,
				"aria-label": "Search",
				"data-testid": "datatable-search",
				className: "w-full max-w-xs rounded-md border border-border-field bg-surface px-3 py-1.5 text-sm text-text-primary placeholder:text-text-tertiary focus:border-primary focus:outline-none"
			}),
			/* @__PURE__ */ u("div", {
				className: "w-full max-w-full overflow-x-auto",
				children: /* @__PURE__ */ d(o, {
					className: T ? void 0 : "border border-border rounded-lg overflow-hidden",
					children: [/* @__PURE__ */ u(a, { children: /* @__PURE__ */ d("tr", { children: [A.map((t) => {
						let n = t.sortable && j === t.key;
						return /* @__PURE__ */ u(i, {
							sortable: t.sortable,
							sortDirection: n ? N : null,
							style: t.width ? { width: t.width } : void 0,
							className: e(g(t.align), t.className),
							onClick: t.sortable ? () => z(t.key) : void 0,
							"data-testid": t.sortable ? `datatable-header-${t.key}` : void 0,
							children: t.header
						}, t.key);
					}), v && /* @__PURE__ */ u(i, {
						className: "text-right",
						children: "Actions"
					})] }) }), /* @__PURE__ */ u(r, { children: C ? Array.from({ length: w }).map((e, r) => /* @__PURE__ */ d(n, {
						"data-testid": "datatable-loading-row",
						children: [A.map((e) => /* @__PURE__ */ u(t, {
							className: g(e.align),
							children: /* @__PURE__ */ u("div", { className: "h-4 w-3/4 animate-pulse rounded bg-surface-hover" })
						}, e.key)), v && /* @__PURE__ */ u(t, {
							className: "text-right",
							children: /* @__PURE__ */ u("div", { className: "ml-auto h-4 w-16 animate-pulse rounded bg-surface-hover" })
						})]
					}, `skeleton-${r}`)) : W.length === 0 ? /* @__PURE__ */ u(n, { children: /* @__PURE__ */ u(t, {
						colSpan: A.length + +!!v,
						className: "text-center text-text-secondary py-8",
						children: S
					}) }) : W.map((r, i) => /* @__PURE__ */ d(n, {
						clickable: !!_,
						className: e(E && i % 2 == 1 ? "bg-surface-inset" : void 0, _ && "focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"),
						tabIndex: _ ? 0 : void 0,
						"aria-rowindex": _ ? i + 2 : void 0,
						onClick: _ ? () => _(r) : void 0,
						onKeyDown: _ ? (e) => {
							(e.key === "Enter" || e.key === " ") && (e.preventDefault(), _(r));
						} : void 0,
						children: [A.map((n) => /* @__PURE__ */ u(t, {
							className: e(g(n.align), n.className),
							children: n.render ? n.render(r, i) : String(r[n.key] ?? "")
						}, n.key)), v && /* @__PURE__ */ u(t, {
							className: "text-right",
							onClick: (e) => e.stopPropagation(),
							children: /* @__PURE__ */ u("div", {
								className: "flex items-center justify-end gap-2",
								children: v(r)
							})
						})]
					}, m(r))) })]
				})
			}),
			x && x > 0 && V.length > x && /* @__PURE__ */ d("div", {
				className: "flex items-center justify-between text-xs text-text-secondary",
				children: [/* @__PURE__ */ d("span", {
					"data-testid": "datatable-page-summary",
					children: [
						"Page ",
						U + 1,
						" of ",
						H,
						" · ",
						V.length,
						" total"
					]
				}), /* @__PURE__ */ d("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ u("button", {
						type: "button",
						onClick: () => R(Math.max(0, U - 1)),
						disabled: U === 0,
						"data-testid": "datatable-prev",
						className: "rounded border border-border bg-surface px-2 py-1 text-xs text-text-primary disabled:cursor-not-allowed disabled:opacity-50 hover:bg-surface-panel",
						children: "Prev"
					}), /* @__PURE__ */ u("button", {
						type: "button",
						onClick: () => R(Math.min(H - 1, U + 1)),
						disabled: U >= H - 1,
						"data-testid": "datatable-next",
						className: "rounded border border-border bg-surface px-2 py-1 text-xs text-text-primary disabled:cursor-not-allowed disabled:opacity-50 hover:bg-surface-panel",
						children: "Next"
					})]
				})]
			})
		]
	});
}
//#endregion
export { _ as t };
