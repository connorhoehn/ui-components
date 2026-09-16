import { t as e } from "./cn-DhjIN-s0.js";
import { isValidElement as t, useMemo as n, useState as r } from "react";
import { jsx as i, jsxs as a } from "react/jsx-runtime";
//#region src/components/ui/Table.tsx
function o({ children: t, className: n, ...r }) {
	return /* @__PURE__ */ i("table", {
		className: e("w-full text-sm", n),
		...r,
		children: t
	});
}
function s({ children: t, className: n, ...r }) {
	return /* @__PURE__ */ i("thead", {
		className: e("border-b border-border bg-surface-panel", n),
		...r,
		children: t
	});
}
function c({ children: t, className: n, ...r }) {
	return /* @__PURE__ */ i("tbody", {
		className: e("", n),
		...r,
		children: t
	});
}
function l({ children: t, clickable: n, className: r, ...a }) {
	return /* @__PURE__ */ i("tr", {
		className: e("border-b border-border-subtle last:border-b-0 transition-colors", n && "cursor-pointer hover:bg-surface-panel", r),
		...a,
		children: t
	});
}
function u({ children: t, sortable: n, sortDirection: r, className: o, ...s }) {
	return /* @__PURE__ */ a("th", {
		className: e("text-left px-4 py-2.5 text-neutral font-semibold text-[11px] uppercase tracking-wide select-none", n && "cursor-pointer hover:text-text-primary transition-colors", o),
		...s,
		children: [t, n && r && /* @__PURE__ */ i("span", {
			className: "ml-1 text-text-tertiary",
			children: r === "asc" ? "↑" : "↓"
		})]
	});
}
function d({ children: t, className: n, ...r }) {
	return /* @__PURE__ */ i("td", {
		className: e("px-4 py-3 text-sm text-text-primary align-middle", n),
		...r,
		children: t
	});
}
//#endregion
//#region src/components/ui/PageSection.tsx
function f({ title: t, description: n, actions: r, children: o, className: s }) {
	return /* @__PURE__ */ a("section", {
		className: e("flex flex-col gap-6", s),
		children: [/* @__PURE__ */ a("div", {
			className: "flex items-start justify-between gap-4",
			children: [/* @__PURE__ */ a("div", { children: [/* @__PURE__ */ i("h1", {
				className: "text-xl font-semibold text-text-primary m-0",
				children: t
			}), n && /* @__PURE__ */ i("p", {
				className: "text-sm text-neutral mt-1 mb-0",
				children: n
			})] }), r && /* @__PURE__ */ i("div", {
				className: "flex items-center gap-2 shrink-0",
				children: r
			})]
		}), o]
	});
}
//#endregion
//#region src/components/shared/DataTable.tsx
function p(e, t) {
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
function m(e) {
	if (e == null || typeof e == "boolean") return "";
	if (typeof e == "string") return e;
	if (typeof e == "number") return String(e);
	if (Array.isArray(e)) return e.map(m).join(" ");
	if (t(e)) {
		let t = e.props?.children;
		return t === void 0 ? "" : m(t);
	}
	return "";
}
var h = /* @__PURE__ */ new Set();
function g(e, t, n) {
	if (e.getFilterText) return e.getFilterText(t);
	let r = t[e.key];
	return r != null && typeof r != "object" && typeof r != "function" ? String(r) : e.render ? m(e.render(t, n)) : (process.env.NODE_ENV !== "production" && !h.has(e.key) && (h.add(e.key), console.warn(`[DataTable] Column "${e.key}" is searchable but its value lives in neither a primitive row value nor getFilterText, and it has no render function to fall back on — it will never match a search query. Add getFilterText, add render, or set filterable={false}.`)), String(r ?? ""));
}
function _(e) {
	if (e === "right") return "text-right";
	if (e === "center") return "text-center";
}
function v({ data: t, columns: f, keyField: m, onRowClick: h, rowActions: v, searchable: y = !1, searchPlaceholder: b = "Search…", pageSize: x, emptyMessage: S = "No records.", loading: C = !1, loadingRows: w = 5, frameless: T = !1, striped: E = !1, className: D, "data-testid": O }) {
	let k = Array.isArray(t) ? t : [], A = Array.isArray(f) ? f : [], [j, M] = r(null), [N, P] = r("asc"), [F, I] = r(""), [L, R] = r(0), z = (e) => {
		j === e ? P((e) => e === "asc" ? "desc" : "asc") : (M(e), P("asc"));
	}, B = n(() => {
		if (!y || F.trim() === "") return k;
		let e = F.trim().toLowerCase();
		return k.filter((t, n) => A.some((r) => r.filterable !== !1 && g(r, t, n).toLowerCase().includes(e)));
	}, [
		k,
		A,
		F,
		y
	]), V = n(() => {
		if (!j) return B;
		let e = A.find((e) => e.key === j);
		if (!e || !e.sortable) return B;
		let t = e.compare ?? ((t, n) => p(t[e.key], n[e.key])), n = [...B];
		return n.sort((e, n) => N === "asc" ? t(e, n) : -t(e, n)), n;
	}, [
		B,
		A,
		j,
		N
	]), H = x && x > 0 ? Math.max(1, Math.ceil(V.length / x)) : 1, U = Math.min(L, H - 1), W = n(() => {
		if (!x || x <= 0) return V;
		let e = U * x;
		return V.slice(e, e + x);
	}, [
		V,
		x,
		U
	]);
	return /* @__PURE__ */ a("div", {
		className: e("flex flex-col gap-3", D),
		"data-testid": O,
		children: [
			y && /* @__PURE__ */ i("input", {
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
			/* @__PURE__ */ i("div", {
				className: "w-full max-w-full overflow-x-auto",
				children: /* @__PURE__ */ a(o, {
					className: T ? void 0 : "border border-border rounded-lg overflow-hidden",
					children: [/* @__PURE__ */ i(s, { children: /* @__PURE__ */ a("tr", { children: [A.map((t) => {
						let n = t.sortable && j === t.key;
						return /* @__PURE__ */ i(u, {
							sortable: t.sortable,
							sortDirection: n ? N : null,
							style: t.width ? { width: t.width } : void 0,
							className: e(_(t.align), t.className),
							onClick: t.sortable ? () => z(t.key) : void 0,
							"data-testid": t.sortable ? `datatable-header-${t.key}` : void 0,
							children: t.header
						}, t.key);
					}), v && /* @__PURE__ */ i(u, {
						className: "text-right",
						children: "Actions"
					})] }) }), /* @__PURE__ */ i(c, { children: C ? Array.from({ length: w }).map((e, t) => /* @__PURE__ */ a(l, {
						"data-testid": "datatable-loading-row",
						children: [A.map((e) => /* @__PURE__ */ i(d, {
							className: _(e.align),
							children: /* @__PURE__ */ i("div", { className: "h-4 w-3/4 animate-pulse rounded bg-surface-hover" })
						}, e.key)), v && /* @__PURE__ */ i(d, {
							className: "text-right",
							children: /* @__PURE__ */ i("div", { className: "ml-auto h-4 w-16 animate-pulse rounded bg-surface-hover" })
						})]
					}, `skeleton-${t}`)) : W.length === 0 ? /* @__PURE__ */ i(l, { children: /* @__PURE__ */ i(d, {
						colSpan: A.length + +!!v,
						className: "text-center text-text-secondary py-8",
						children: S
					}) }) : W.map((t, n) => /* @__PURE__ */ a(l, {
						clickable: !!h,
						className: e(E && n % 2 == 1 ? "bg-surface-inset" : void 0, h && "focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"),
						tabIndex: h ? 0 : void 0,
						"aria-rowindex": h ? n + 2 : void 0,
						onClick: h ? () => h(t) : void 0,
						onKeyDown: h ? (e) => {
							(e.key === "Enter" || e.key === " ") && (e.preventDefault(), h(t));
						} : void 0,
						children: [A.map((r) => /* @__PURE__ */ i(d, {
							className: e(_(r.align), r.className),
							children: r.render ? r.render(t, n) : String(t[r.key] ?? "")
						}, r.key)), v && /* @__PURE__ */ i(d, {
							className: "text-right",
							onClick: (e) => e.stopPropagation(),
							children: /* @__PURE__ */ i("div", {
								className: "flex items-center justify-end gap-2",
								children: v(t)
							})
						})]
					}, m(t))) })]
				})
			}),
			x && x > 0 && V.length > x && /* @__PURE__ */ a("div", {
				className: "flex items-center justify-between text-xs text-text-secondary",
				children: [/* @__PURE__ */ a("span", {
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
				}), /* @__PURE__ */ a("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ i("button", {
						type: "button",
						onClick: () => R(Math.max(0, U - 1)),
						disabled: U === 0,
						"data-testid": "datatable-prev",
						className: "rounded border border-border bg-surface px-2 py-1 text-xs text-text-primary disabled:cursor-not-allowed disabled:opacity-50 hover:bg-surface-panel",
						children: "Prev"
					}), /* @__PURE__ */ i("button", {
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
export { s as a, u as c, c as i, f as n, l as o, o as r, d as s, v as t };
