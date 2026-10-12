import { t as e } from "./cn-D4QmbyEy.js";
import { a as t, i as n, n as r, o as i, r as a, t as o } from "./Table-JL7cMjRX.js";
import { t as s } from "./IconButton-IiLzRH-W.js";
import { m as c } from "./Icons-B_xESAH3.js";
import { t as l } from "./Tooltip-DWyAb81m.js";
import { isValidElement as u, useMemo as d, useState as f } from "react";
import { jsx as p, jsxs as m } from "react/jsx-runtime";
//#region src/components/shared/DataTable.tsx
function h(e, t) {
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
function g(e) {
	if (e == null || typeof e == "boolean") return "";
	if (typeof e == "string") return e;
	if (typeof e == "number") return String(e);
	if (Array.isArray(e)) return e.map(g).join(" ");
	if (u(e)) {
		let t = e.props?.children;
		return t === void 0 ? "" : g(t);
	}
	return "";
}
var _ = /* @__PURE__ */ new Set();
function v(e, t, n) {
	if (e.getFilterText) return e.getFilterText(t);
	let r = t[e.key];
	return r != null && typeof r != "object" && typeof r != "function" ? String(r) : e.render ? g(e.render(t, n)) : (process.env.NODE_ENV !== "production" && !_.has(e.key) && (_.add(e.key), console.warn(`[DataTable] Column "${e.key}" is searchable but its value lives in neither a primitive row value nor getFilterText, and it has no render function to fall back on — it will never match a search query. Add getFilterText, add render, or set filterable={false}.`)), String(r ?? ""));
}
function y(e) {
	if (e === "right") return "text-right";
	if (e === "center") return "text-center";
}
function b({ data: u, columns: g, keyField: _, onRowClick: b, rowActions: x, searchable: S = !1, searchPlaceholder: C = "Search…", pageSize: w, emptyMessage: T = "No records.", loading: E = !1, loadingRows: D = 5, frameless: O = !1, size: k, striped: A = !1, className: j, "data-testid": M }) {
	let N = Array.isArray(u) ? u : [], P = Array.isArray(g) ? g : [], [F, I] = f(null), [L, R] = f("asc"), [z, B] = f(""), [V, H] = f(0), U = (e) => {
		F === e ? R((e) => e === "asc" ? "desc" : "asc") : (I(e), R("asc"));
	}, W = d(() => {
		if (!S || z.trim() === "") return N;
		let e = z.trim().toLowerCase();
		return N.filter((t, n) => P.some((r) => r.filterable !== !1 && v(r, t, n).toLowerCase().includes(e)));
	}, [
		N,
		P,
		z,
		S
	]), G = d(() => {
		if (!F) return W;
		let e = P.find((e) => e.key === F);
		if (!e || !e.sortable) return W;
		let t = e.compare ?? ((t, n) => h(t[e.key], n[e.key])), n = [...W];
		return n.sort((e, n) => L === "asc" ? t(e, n) : -t(e, n)), n;
	}, [
		W,
		P,
		F,
		L
	]), K = w && w > 0 ? Math.max(1, Math.ceil(G.length / w)) : 1, q = Math.min(V, K - 1), J = d(() => {
		if (!w || w <= 0) return G;
		let e = q * w;
		return G.slice(e, e + w);
	}, [
		G,
		w,
		q
	]);
	return /* @__PURE__ */ m("div", {
		className: e("flex min-w-0 flex-col gap-3", j),
		"data-testid": M,
		children: [
			S && /* @__PURE__ */ p("input", {
				type: "text",
				value: z,
				onChange: (e) => {
					B(e.target.value), H(0);
				},
				placeholder: C,
				"aria-label": "Search",
				"data-testid": "datatable-search",
				className: "w-full max-w-xs rounded-md border border-border-field bg-surface px-3 py-1.5 text-sm text-text-primary placeholder:text-text-tertiary focus:border-primary focus:outline-none"
			}),
			/* @__PURE__ */ p("div", {
				className: "w-full max-w-full overflow-x-auto",
				children: /* @__PURE__ */ m(o, {
					...k ? { size: k } : {},
					className: O ? void 0 : "border border-border rounded-lg overflow-hidden",
					children: [/* @__PURE__ */ p(a, { children: /* @__PURE__ */ m("tr", { children: [P.map((t) => {
						let n = t.sortable && F === t.key;
						return /* @__PURE__ */ p(i, {
							sortable: t.sortable,
							sortDirection: n ? L : null,
							style: t.width ? { width: t.width } : void 0,
							numeric: t.numeric,
							className: e(y(t.align), t.className),
							onClick: t.sortable ? () => U(t.key) : void 0,
							"data-testid": t.sortable ? `datatable-header-${t.key}` : void 0,
							children: t.header
						}, t.key);
					}), x && /* @__PURE__ */ p(i, {
						className: "text-right",
						children: "Actions"
					})] }) }), /* @__PURE__ */ p(r, { children: E ? Array.from({ length: D }).map((e, r) => /* @__PURE__ */ m(n, {
						"data-testid": "datatable-loading-row",
						children: [P.map((e) => /* @__PURE__ */ p(t, {
							numeric: e.numeric,
							className: y(e.align),
							children: /* @__PURE__ */ p("div", { className: "h-4 w-3/4 animate-pulse rounded bg-surface-hover" })
						}, e.key)), x && /* @__PURE__ */ p(t, {
							className: "text-right",
							children: /* @__PURE__ */ p("div", { className: "ml-auto h-4 w-16 animate-pulse rounded bg-surface-hover" })
						})]
					}, `skeleton-${r}`)) : J.length === 0 ? /* @__PURE__ */ p(n, { children: /* @__PURE__ */ p(t, {
						colSpan: P.length + +!!x,
						className: "text-center text-text-secondary py-8",
						children: T
					}) }) : J.map((r, i) => /* @__PURE__ */ m(n, {
						clickable: !!b,
						className: e(A && i % 2 == 1 ? "bg-surface-inset" : void 0, b && "focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"),
						tabIndex: b ? 0 : void 0,
						"aria-rowindex": b ? i + 2 : void 0,
						onClick: b ? () => b(r) : void 0,
						onKeyDown: b ? (e) => {
							(e.key === "Enter" || e.key === " ") && (e.preventDefault(), b(r));
						} : void 0,
						children: [P.map((n) => /* @__PURE__ */ p(t, {
							numeric: n.numeric,
							className: e(y(n.align), n.className),
							children: n.render ? n.render(r, i) : String(r[n.key] ?? "")
						}, n.key)), x && /* @__PURE__ */ p(t, {
							className: "text-right",
							onClick: (e) => e.stopPropagation(),
							children: /* @__PURE__ */ p("div", {
								className: "flex items-center justify-end gap-2",
								children: x(r)
							})
						})]
					}, _(r))) })]
				})
			}),
			w && w > 0 && G.length > w && /* @__PURE__ */ m("div", {
				className: "flex items-center justify-between text-xs text-text-secondary",
				children: [/* @__PURE__ */ m("span", {
					"data-testid": "datatable-page-summary",
					children: [
						"Page ",
						q + 1,
						" of ",
						K,
						" · ",
						G.length,
						" total"
					]
				}), /* @__PURE__ */ m("div", {
					className: "flex gap-1",
					role: "group",
					"aria-label": "Pagination",
					children: [/* @__PURE__ */ p(l, {
						content: "Previous page",
						children: /* @__PURE__ */ p(s, {
							size: "sm",
							"aria-label": "Previous page",
							icon: /* @__PURE__ */ p(c, { dir: "left" }),
							onClick: () => H(Math.max(0, q - 1)),
							disabled: q === 0,
							"data-testid": "datatable-prev"
						})
					}), /* @__PURE__ */ p(l, {
						content: "Next page",
						children: /* @__PURE__ */ p(s, {
							size: "sm",
							"aria-label": "Next page",
							icon: /* @__PURE__ */ p(c, { dir: "right" }),
							onClick: () => H(Math.min(K - 1, q + 1)),
							disabled: q >= K - 1,
							"data-testid": "datatable-next"
						})
					})]
				})]
			})
		]
	});
}
//#endregion
export { b as t };
