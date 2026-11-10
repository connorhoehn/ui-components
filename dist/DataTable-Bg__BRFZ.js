import { d as e } from "./Button-DQoeE5dN.js";
import { a as t, i as n, n as r, o as i, r as a, t as o } from "./Table-BdYa6mv8.js";
import { t as s } from "./IconButton-BgM9MvwA.js";
import { I as c, h as l, m as u, ut as d } from "./Icons-CqVFbuiZ.js";
import { t as f } from "./Select-CG_PYETL.js";
import { t as p } from "./Tooltip-ClzY6PN8.js";
import { t as m } from "./InlinePopover-BQTS5egk.js";
import { a as h, t as g } from "./Toolbar-DxZ_2leI.js";
import { t as _ } from "./FormField-BDZIVA7n.js";
import { t as v } from "./SearchInput-Dk3D9lhs.js";
import { isValidElement as y, useMemo as b, useRef as x, useState as S } from "react";
import { Fragment as C, jsx as w, jsxs as T } from "react/jsx-runtime";
//#region src/components/shared/CollectionToolbar.tsx
function E({ label: e, layout: t = "table", search: n, filters: r = [], filterPanel: i, summary: a, resultCount: o, placement: u = "band", notices: y = [], actions: b = [], onRefresh: E, refreshing: D = !1, selection: O, children: k }) {
	let A = x(null), [j, M] = S(!1), N = r.filter((e) => e.value !== (e.emptyValue ?? ""));
	if (O && O.count > 0) return /* @__PURE__ */ T(g, {
		"aria-label": `${e}: selection`,
		wrap: !0,
		variant: "collection",
		"data-collection-layout": t,
		className: t === "cards" ? "px-0" : void 0,
		"data-collection-selection": "active",
		end: O.actions,
		children: [/* @__PURE__ */ w(p, {
			content: "Clear selection",
			children: /* @__PURE__ */ w(s, {
				"aria-label": "Clear selection",
				icon: /* @__PURE__ */ w(l, {}),
				onClick: O.onClear
			})
		}), /* @__PURE__ */ w("span", {
			className: "min-w-0 truncate text-xs font-medium text-text-primary",
			role: "status",
			"data-collection-selection-count": !0,
			children: O.label ?? `${O.count} selected`
		})]
	});
	let { collapsible: P = !0, ...F } = n ?? {
		value: "",
		onChange: () => {}
	}, I = a != null && a !== !1 && o !== 0, L = !!(n || r.length > 0 || i || E), R = /* @__PURE__ */ T(C, { children: [L && /* @__PURE__ */ T("div", {
		className: "flex min-w-0 items-center gap-2",
		"data-collection-query": "",
		children: [
			n && /* @__PURE__ */ w(v, {
				...F,
				collapsible: P,
				className: P ? "min-w-0 w-56 max-w-full" : "min-w-0 w-full max-w-64"
			}),
			(r.length > 0 || i) && /* @__PURE__ */ T(h, {
				label: "Filters",
				trigger: "icon",
				placement: "bottom-end",
				activeCount: N.length + (i?.activeCount ?? 0),
				panelLabel: e,
				onClear: () => {
					r.forEach((e) => e.onChange(e.emptyValue ?? "")), i?.onClear?.();
				},
				children: [r.map((e) => /* @__PURE__ */ w(_, {
					label: e.label,
					children: (t) => /* @__PURE__ */ w(f, {
						...t,
						"aria-label": e.label,
						value: e.value,
						options: e.options,
						onChange: (t) => e.onChange(t.target.value),
						chevron: "custom"
					})
				}, e.id)), i?.content]
			}),
			E && /* @__PURE__ */ w(p, {
				content: "Refresh",
				children: /* @__PURE__ */ w(s, {
					"aria-label": "Refresh",
					icon: /* @__PURE__ */ w(d, {}),
					onClick: E,
					disabled: D
				})
			})
		]
	}), b.map((e) => /* @__PURE__ */ w(p, {
		content: e.label,
		children: /* @__PURE__ */ w(s, {
			"aria-label": e.label,
			icon: e.icon,
			onClick: e.onClick,
			disabled: e.disabled,
			"data-testid": e["data-testid"]
		})
	}, e.id))] }), z = N.length > 0 || I || y.length > 0 || k != null;
	return /* @__PURE__ */ w(g, {
		"aria-label": e,
		wrap: u === "band",
		variant: "collection",
		bordered: !1,
		"data-collection-layout": t,
		"data-collection-placement": u,
		className: u === "header" ? "min-h-0 px-0 py-0" : t === "cards" ? "px-0" : void 0,
		"data-collection-selection": O ? "idle" : void 0,
		end: L || b.length ? R : void 0,
		children: z && /* @__PURE__ */ T(C, { children: [
			N.length > 0 && /* @__PURE__ */ w("span", {
				className: "min-w-0 truncate text-xs text-text-primary",
				title: N.map((e) => `${e.label}: ${e.options.find((t) => t.value === e.value)?.label ?? e.value}`).join(" · "),
				children: N.map((e) => e.options.find((t) => t.value === e.value)?.label ?? e.value).join(" · ")
			}),
			I && /* @__PURE__ */ w("span", {
				className: "min-w-0 text-xs text-text-secondary",
				"data-collection-summary": !0,
				children: a
			}),
			y.length > 0 && /* @__PURE__ */ T(C, { children: [/* @__PURE__ */ w(p, {
				content: "About these results",
				children: /* @__PURE__ */ w(s, {
					ref: A,
					"aria-label": "About these results",
					"aria-haspopup": "dialog",
					"aria-expanded": j,
					icon: /* @__PURE__ */ w(c, {}),
					onClick: () => M(!j)
				})
			}), /* @__PURE__ */ w(m, {
				open: j,
				onClose: () => M(!1),
				trigger: A,
				"aria-label": "About these results",
				className: "max-w-sm p-3 text-sm text-text-secondary",
				children: /* @__PURE__ */ w("ul", {
					className: "flex flex-col gap-2",
					children: y.map((e, t) => /* @__PURE__ */ w("li", { children: e }, t))
				})
			})] }),
			k
		] })
	});
}
function D(e) {
	return !e.selection && e.children == null;
}
//#endregion
//#region src/components/shared/DataTable.tsx
var O = "@max-[40rem]:block", k = "@max-[40rem]:sr-only", A = "@max-[40rem]:block", j = "@max-[40rem]:block @max-[40rem]:px-3 @max-[40rem]:py-2", M = "@max-[40rem]:flex @max-[40rem]:h-auto @max-[40rem]:items-baseline @max-[40rem]:justify-between @max-[40rem]:gap-4 @max-[40rem]:whitespace-normal @max-[40rem]:px-0 @max-[40rem]:py-1 @max-[40rem]:text-right @max-[40rem]:before:shrink-0 @max-[40rem]:before:text-left @max-[40rem]:before:text-xs @max-[40rem]:before:font-semibold @max-[40rem]:before:uppercase @max-[40rem]:before:tracking-wide @max-[40rem]:before:text-text-secondary @max-[40rem]:before:content-[attr(data-label)]";
function N(e) {
	return e.label ?? (typeof e.header == "string" ? e.header : e.key);
}
var P = "a[href], button, input, select, textarea, label, summary, [role=\"button\"], [role=\"checkbox\"], [role=\"link\"], [role=\"menuitem\"], [role=\"switch\"], [contenteditable=\"true\"]";
function F(e, t) {
	if (!(e instanceof Element)) return !1;
	let n = e.closest(P);
	return !!n && n !== t && t.contains(n);
}
function I(e, t) {
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
function L(e) {
	if (e == null || typeof e == "boolean") return "";
	if (typeof e == "string") return e;
	if (typeof e == "number") return String(e);
	if (Array.isArray(e)) return e.map(L).join(" ");
	if (y(e)) {
		let t = e.props?.children;
		return t === void 0 ? "" : L(t);
	}
	return "";
}
var R = /* @__PURE__ */ new Set();
function z(e, t, n) {
	if (e.getFilterText) return e.getFilterText(t);
	let r = t[e.key];
	return r != null && typeof r != "object" && typeof r != "function" ? String(r) : e.render ? L(e.render(t, n)) : (process.env.NODE_ENV !== "production" && !R.has(e.key) && (R.add(e.key), console.warn(`[DataTable] Column "${e.key}" is searchable but its value lives in neither a primitive row value nor getFilterText, and it has no render function to fall back on — it will never match a search query. Add getFilterText, add render, or set filterable={false}.`)), String(r ?? ""));
}
function B(e) {
	if (e === "right") return "text-right";
	if (e === "center") return "text-center";
}
function V({ rowHeight: c = "fixed", data: l, columns: d, keyField: f, onRowClick: m, rowActions: h, searchable: g = !1, searchPlaceholder: _ = "Search…", pageSize: v, emptyMessage: y = "No records.", loading: x = !1, loadingRows: C = 5, frameless: D = !1, size: P, striped: L = !0, narrow: R = !1, className: V, "data-testid": ee, staticRows: H }) {
	let U = Array.isArray(l) ? l : [], W = Array.isArray(d) ? d : [], [G, te] = S(null), [K, q] = S("asc"), [J, ne] = S(""), [re, Y] = S(0), ie = (e) => {
		G === e ? q((e) => e === "asc" ? "desc" : "asc") : (te(e), q("asc"));
	}, X = b(() => {
		if (!g || J.trim() === "") return U;
		let e = J.trim().toLowerCase();
		return U.filter((t, n) => W.some((r) => r.filterable !== !1 && z(r, t, n).toLowerCase().includes(e)));
	}, [
		U,
		W,
		J,
		g
	]), Z = b(() => {
		if (!G) return X;
		let e = W.find((e) => e.key === G);
		if (!e || !e.sortable) return X;
		let t = e.compare ?? ((t, n) => I(t[e.key], n[e.key])), n = [...X];
		return n.sort((e, n) => K === "asc" ? t(e, n) : -t(e, n)), n;
	}, [
		X,
		W,
		G,
		K
	]), Q = v && v > 0 ? Math.max(1, Math.ceil(Z.length / v)) : 1, $ = Math.min(re, Q - 1), ae = b(() => {
		if (!v || v <= 0) return Z;
		let e = $ * v;
		return Z.slice(e, e + v);
	}, [
		Z,
		v,
		$
	]);
	return /* @__PURE__ */ T("div", {
		className: e("flex min-w-0 flex-col gap-3", R && "@container", V),
		"data-testid": ee,
		"data-collection-table": "",
		"data-collection-rows": m ? "activatable" : H ? "static" : void 0,
		"data-collection-rows-reason": !m && H ? H : void 0,
		children: [
			g && /* @__PURE__ */ w(E, {
				label: "Table controls",
				search: {
					value: J,
					onChange: (e) => {
						ne(e), Y(0);
					},
					placeholder: _,
					"aria-label": "Search",
					"data-testid": "datatable-search"
				}
			}),
			/* @__PURE__ */ T(o, {
				"data-ui-table-rows": c,
				...P ? { size: P } : {},
				className: e(!D && "border border-border rounded-lg overflow-hidden", R && O),
				children: [/* @__PURE__ */ w(a, {
					className: R ? k : void 0,
					children: /* @__PURE__ */ T("tr", { children: [W.map((t) => {
						let n = t.sortable && G === t.key;
						return /* @__PURE__ */ w(i, {
							sortable: t.sortable,
							sortDirection: n ? K : null,
							style: t.width ? { width: t.width } : void 0,
							numeric: t.numeric,
							className: e(B(t.align), t.className),
							onClick: t.sortable ? () => ie(t.key) : void 0,
							"data-testid": t.sortable ? `datatable-header-${t.key}` : void 0,
							children: t.header
						}, t.key);
					}), h && /* @__PURE__ */ w(i, {
						className: "text-right",
						children: "Actions"
					})] })
				}), /* @__PURE__ */ w(r, {
					striped: !1,
					className: R ? A : void 0,
					"data-ui-table-striped": L ? "" : void 0,
					children: x ? Array.from({ length: C }).map((e, r) => /* @__PURE__ */ T(n, {
						"data-testid": "datatable-loading-row",
						children: [W.map((e) => /* @__PURE__ */ w(t, {
							numeric: e.numeric,
							className: B(e.align),
							children: /* @__PURE__ */ w("div", { className: "h-4 w-3/4 animate-pulse rounded bg-surface-hover" })
						}, e.key)), h && /* @__PURE__ */ w(t, {
							className: "text-right",
							children: /* @__PURE__ */ w("div", { className: "ml-auto h-4 w-16 animate-pulse rounded bg-surface-hover" })
						})]
					}, `skeleton-${r}`)) : ae.length === 0 ? /* @__PURE__ */ w(n, { children: /* @__PURE__ */ w(t, {
						colSpan: W.length + +!!h,
						className: "text-center text-text-secondary py-8",
						children: y
					}) }) : ae.map((r, i) => /* @__PURE__ */ T(n, {
						clickable: !!m,
						className: e(R && j, L && i % 2 == 1 ? "bg-surface-inset" : void 0, m && "focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"),
						tabIndex: m ? 0 : void 0,
						"aria-rowindex": m ? i + 2 : void 0,
						onClick: m ? (e) => {
							F(e.target, e.currentTarget) || m(r);
						} : void 0,
						onKeyDown: m ? (e) => {
							e.target === e.currentTarget && (e.key === "Enter" || e.key === " ") && (e.preventDefault(), m(r));
						} : void 0,
						children: [W.map((n) => /* @__PURE__ */ w(t, {
							numeric: n.numeric,
							className: e(B(n.align), R && M, n.className),
							...R ? { "data-label": N(n) } : {},
							children: n.render ? n.render(r, i) : String(r[n.key] ?? "")
						}, n.key)), h && /* @__PURE__ */ w(t, {
							className: "text-right",
							onClick: (e) => e.stopPropagation(),
							children: /* @__PURE__ */ w("div", {
								className: "flex items-center justify-end gap-2",
								children: h(r)
							})
						})]
					}, f(r)))
				})]
			}),
			v && v > 0 && Z.length > v && /* @__PURE__ */ T("div", {
				className: "flex items-center justify-between text-xs text-text-secondary",
				"data-collection-pager": !0,
				children: [/* @__PURE__ */ T("span", {
					"data-testid": "datatable-page-summary",
					children: [
						"Page ",
						$ + 1,
						" of ",
						Q,
						" · ",
						Z.length,
						" total"
					]
				}), /* @__PURE__ */ T("div", {
					className: "flex gap-1",
					role: "group",
					"aria-label": "Pagination",
					children: [/* @__PURE__ */ w(p, {
						content: "Previous page",
						children: /* @__PURE__ */ w(s, {
							size: "sm",
							"aria-label": "Previous page",
							icon: /* @__PURE__ */ w(u, { dir: "left" }),
							onClick: () => Y(Math.max(0, $ - 1)),
							disabled: $ === 0,
							"data-testid": "datatable-prev"
						})
					}), /* @__PURE__ */ w(p, {
						content: "Next page",
						children: /* @__PURE__ */ w(s, {
							size: "sm",
							"aria-label": "Next page",
							icon: /* @__PURE__ */ w(u, { dir: "right" }),
							onClick: () => Y(Math.min(Q - 1, $ + 1)),
							disabled: $ >= Q - 1,
							"data-testid": "datatable-next"
						})
					})]
				})]
			})
		]
	});
}
//#endregion
export { E as n, D as r, V as t };
