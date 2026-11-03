import { t as e } from "./cn-D4QmbyEy.js";
import { a as t, i as n, n as r, o as i, r as a, t as o } from "./Table-Cntt19RZ.js";
import { t as s } from "./IconButton-J9jGN6eo.js";
import { I as c, h as l, lt as u, m as d } from "./Icons-C__ztBBw.js";
import { t as f } from "./Select-BFyECVVL.js";
import { t as p } from "./Tooltip-Q0urBp4N.js";
import { t as m } from "./InlinePopover-Dx8-r-XU.js";
import { a as h, t as g } from "./Toolbar-DTMhrPmz.js";
import { t as _ } from "./FormField-CQ27qxWt.js";
import { t as v } from "./SearchInput-DDKsA6gZ.js";
import { isValidElement as y, useMemo as b, useRef as x, useState as S } from "react";
import { Fragment as C, jsx as w, jsxs as T } from "react/jsx-runtime";
//#region src/components/shared/CollectionToolbar.tsx
function E({ label: e, layout: t = "table", search: n, filters: r = [], summary: i, notices: a = [], actions: o = [], onRefresh: d, refreshing: y = !1, selection: b, children: E }) {
	let D = x(null), [O, k] = S(!1), A = r.filter((e) => e.value !== (e.emptyValue ?? ""));
	return b && b.count > 0 ? /* @__PURE__ */ T(g, {
		"aria-label": `${e}: selection`,
		wrap: !0,
		variant: "collection",
		"data-collection-layout": t,
		className: t === "cards" ? "px-0" : void 0,
		"data-collection-selection": "active",
		end: b.actions,
		children: [/* @__PURE__ */ w(p, {
			content: "Clear selection",
			children: /* @__PURE__ */ w(s, {
				"aria-label": "Clear selection",
				icon: /* @__PURE__ */ w(l, {}),
				onClick: b.onClear
			})
		}), /* @__PURE__ */ w("span", {
			className: "min-w-0 truncate text-xs font-medium text-text-primary",
			role: "status",
			"data-collection-selection-count": !0,
			children: b.label ?? `${b.count} selected`
		})]
	}) : /* @__PURE__ */ T(g, {
		"aria-label": e,
		wrap: !0,
		variant: "collection",
		"data-collection-layout": t,
		className: t === "cards" ? "px-0" : void 0,
		"data-collection-selection": b ? "idle" : void 0,
		end: o.length ? /* @__PURE__ */ w(C, { children: o.map((e) => /* @__PURE__ */ w(p, {
			content: e.label,
			children: /* @__PURE__ */ w(s, {
				"aria-label": e.label,
				icon: e.icon,
				onClick: e.onClick,
				disabled: e.disabled,
				"data-testid": e["data-testid"]
			})
		}, e.id)) }) : void 0,
		children: [
			n && /* @__PURE__ */ w(v, {
				...n,
				className: "min-w-0 w-full max-w-64"
			}),
			r.length > 0 && /* @__PURE__ */ w(h, {
				label: "Filters",
				trigger: "icon",
				activeCount: A.length,
				panelLabel: e,
				onClear: () => r.forEach((e) => e.onChange(e.emptyValue ?? "")),
				children: r.map((e) => /* @__PURE__ */ w(_, {
					label: e.label,
					children: (t) => /* @__PURE__ */ w(f, {
						...t,
						"aria-label": e.label,
						value: e.value,
						options: e.options,
						onChange: (t) => e.onChange(t.target.value),
						chevron: "custom"
					})
				}, e.id))
			}),
			d && /* @__PURE__ */ w(p, {
				content: "Refresh",
				children: /* @__PURE__ */ w(s, {
					"aria-label": "Refresh",
					icon: /* @__PURE__ */ w(u, {}),
					onClick: d,
					disabled: y
				})
			}),
			A.length > 0 && /* @__PURE__ */ w("span", {
				className: "min-w-0 truncate text-xs text-text-primary",
				title: A.map((e) => `${e.label}: ${e.options.find((t) => t.value === e.value)?.label ?? e.value}`).join(" · "),
				children: A.map((e) => e.options.find((t) => t.value === e.value)?.label ?? e.value).join(" · ")
			}),
			i && /* @__PURE__ */ w("span", {
				className: "min-w-0 text-xs text-text-secondary",
				"data-collection-summary": !0,
				children: i
			}),
			a.length > 0 && /* @__PURE__ */ T(C, { children: [/* @__PURE__ */ w(p, {
				content: "About these results",
				children: /* @__PURE__ */ w(s, {
					ref: D,
					"aria-label": "About these results",
					"aria-haspopup": "dialog",
					"aria-expanded": O,
					icon: /* @__PURE__ */ w(c, {}),
					onClick: () => k(!O)
				})
			}), /* @__PURE__ */ w(m, {
				open: O,
				onClose: () => k(!1),
				trigger: D,
				"aria-label": "About these results",
				className: "max-w-sm p-3 text-sm text-text-secondary",
				children: /* @__PURE__ */ w("ul", {
					className: "flex flex-col gap-2",
					children: a.map((e, t) => /* @__PURE__ */ w("li", { children: e }, t))
				})
			})] }),
			E
		]
	});
}
//#endregion
//#region src/components/shared/DataTable.tsx
var D = "a[href], button, input, select, textarea, label, summary, [role=\"button\"], [role=\"checkbox\"], [role=\"link\"], [role=\"menuitem\"], [role=\"switch\"], [contenteditable=\"true\"]";
function O(e, t) {
	if (!(e instanceof Element)) return !1;
	let n = e.closest(D);
	return !!n && n !== t && t.contains(n);
}
function k(e, t) {
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
function A(e) {
	if (e == null || typeof e == "boolean") return "";
	if (typeof e == "string") return e;
	if (typeof e == "number") return String(e);
	if (Array.isArray(e)) return e.map(A).join(" ");
	if (y(e)) {
		let t = e.props?.children;
		return t === void 0 ? "" : A(t);
	}
	return "";
}
var j = /* @__PURE__ */ new Set();
function M(e, t, n) {
	if (e.getFilterText) return e.getFilterText(t);
	let r = t[e.key];
	return r != null && typeof r != "object" && typeof r != "function" ? String(r) : e.render ? A(e.render(t, n)) : (process.env.NODE_ENV !== "production" && !j.has(e.key) && (j.add(e.key), console.warn(`[DataTable] Column "${e.key}" is searchable but its value lives in neither a primitive row value nor getFilterText, and it has no render function to fall back on — it will never match a search query. Add getFilterText, add render, or set filterable={false}.`)), String(r ?? ""));
}
function N(e) {
	if (e === "right") return "text-right";
	if (e === "center") return "text-center";
}
function P({ rowHeight: c = "fixed", data: l, columns: u, keyField: f, onRowClick: m, rowActions: h, searchable: g = !1, searchPlaceholder: _ = "Search…", pageSize: v, emptyMessage: y = "No records.", loading: x = !1, loadingRows: C = 5, frameless: D = !1, size: A, striped: j = !1, className: P, "data-testid": F, staticRows: I }) {
	let L = Array.isArray(l) ? l : [], R = Array.isArray(u) ? u : [], [z, B] = S(null), [V, H] = S("asc"), [U, W] = S(""), [G, K] = S(0), q = (e) => {
		z === e ? H((e) => e === "asc" ? "desc" : "asc") : (B(e), H("asc"));
	}, J = b(() => {
		if (!g || U.trim() === "") return L;
		let e = U.trim().toLowerCase();
		return L.filter((t, n) => R.some((r) => r.filterable !== !1 && M(r, t, n).toLowerCase().includes(e)));
	}, [
		L,
		R,
		U,
		g
	]), Y = b(() => {
		if (!z) return J;
		let e = R.find((e) => e.key === z);
		if (!e || !e.sortable) return J;
		let t = e.compare ?? ((t, n) => k(t[e.key], n[e.key])), n = [...J];
		return n.sort((e, n) => V === "asc" ? t(e, n) : -t(e, n)), n;
	}, [
		J,
		R,
		z,
		V
	]), X = v && v > 0 ? Math.max(1, Math.ceil(Y.length / v)) : 1, Z = Math.min(G, X - 1), Q = b(() => {
		if (!v || v <= 0) return Y;
		let e = Z * v;
		return Y.slice(e, e + v);
	}, [
		Y,
		v,
		Z
	]);
	return /* @__PURE__ */ T("div", {
		className: e("flex min-w-0 flex-col gap-3", P),
		"data-testid": F,
		"data-collection-table": "",
		"data-collection-rows": m ? "activatable" : I ? "static" : void 0,
		"data-collection-rows-reason": !m && I ? I : void 0,
		children: [
			g && /* @__PURE__ */ w(E, {
				label: "Table controls",
				search: {
					value: U,
					onChange: (e) => {
						W(e), K(0);
					},
					placeholder: _,
					"aria-label": "Search",
					"data-testid": "datatable-search"
				}
			}),
			/* @__PURE__ */ T(o, {
				"data-ui-table-rows": c,
				...A ? { size: A } : {},
				className: D ? void 0 : "border border-border rounded-lg overflow-hidden",
				children: [/* @__PURE__ */ w(a, { children: /* @__PURE__ */ T("tr", { children: [R.map((t) => {
					let n = t.sortable && z === t.key;
					return /* @__PURE__ */ w(i, {
						sortable: t.sortable,
						sortDirection: n ? V : null,
						style: t.width ? { width: t.width } : void 0,
						numeric: t.numeric,
						className: e(N(t.align), t.className),
						onClick: t.sortable ? () => q(t.key) : void 0,
						"data-testid": t.sortable ? `datatable-header-${t.key}` : void 0,
						children: t.header
					}, t.key);
				}), h && /* @__PURE__ */ w(i, {
					className: "text-right",
					children: "Actions"
				})] }) }), /* @__PURE__ */ w(r, { children: x ? Array.from({ length: C }).map((e, r) => /* @__PURE__ */ T(n, {
					"data-testid": "datatable-loading-row",
					children: [R.map((e) => /* @__PURE__ */ w(t, {
						numeric: e.numeric,
						className: N(e.align),
						children: /* @__PURE__ */ w("div", { className: "h-4 w-3/4 animate-pulse rounded bg-surface-hover" })
					}, e.key)), h && /* @__PURE__ */ w(t, {
						className: "text-right",
						children: /* @__PURE__ */ w("div", { className: "ml-auto h-4 w-16 animate-pulse rounded bg-surface-hover" })
					})]
				}, `skeleton-${r}`)) : Q.length === 0 ? /* @__PURE__ */ w(n, { children: /* @__PURE__ */ w(t, {
					colSpan: R.length + +!!h,
					className: "text-center text-text-secondary py-8",
					children: y
				}) }) : Q.map((r, i) => /* @__PURE__ */ T(n, {
					clickable: !!m,
					className: e(j && i % 2 == 1 ? "bg-surface-inset" : void 0, m && "focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"),
					tabIndex: m ? 0 : void 0,
					"aria-rowindex": m ? i + 2 : void 0,
					onClick: m ? (e) => {
						O(e.target, e.currentTarget) || m(r);
					} : void 0,
					onKeyDown: m ? (e) => {
						e.target === e.currentTarget && (e.key === "Enter" || e.key === " ") && (e.preventDefault(), m(r));
					} : void 0,
					children: [R.map((n) => /* @__PURE__ */ w(t, {
						numeric: n.numeric,
						className: e(N(n.align), n.className),
						children: n.render ? n.render(r, i) : String(r[n.key] ?? "")
					}, n.key)), h && /* @__PURE__ */ w(t, {
						className: "text-right",
						onClick: (e) => e.stopPropagation(),
						children: /* @__PURE__ */ w("div", {
							className: "flex items-center justify-end gap-2",
							children: h(r)
						})
					})]
				}, f(r))) })]
			}),
			v && v > 0 && Y.length > v && /* @__PURE__ */ T("div", {
				className: "flex items-center justify-between text-xs text-text-secondary",
				children: [/* @__PURE__ */ T("span", {
					"data-testid": "datatable-page-summary",
					children: [
						"Page ",
						Z + 1,
						" of ",
						X,
						" · ",
						Y.length,
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
							icon: /* @__PURE__ */ w(d, { dir: "left" }),
							onClick: () => K(Math.max(0, Z - 1)),
							disabled: Z === 0,
							"data-testid": "datatable-prev"
						})
					}), /* @__PURE__ */ w(p, {
						content: "Next page",
						children: /* @__PURE__ */ w(s, {
							size: "sm",
							"aria-label": "Next page",
							icon: /* @__PURE__ */ w(d, { dir: "right" }),
							onClick: () => K(Math.min(X - 1, Z + 1)),
							disabled: Z >= X - 1,
							"data-testid": "datatable-next"
						})
					})]
				})]
			})
		]
	});
}
//#endregion
export { E as n, P as t };
