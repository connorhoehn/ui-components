import { d as e } from "./Button-DQoeE5dN.js";
import { a as t, i as n, n as r, o as i, r as a, t as o } from "./Table-BdYa6mv8.js";
import { t as s } from "./IconButton-BgM9MvwA.js";
import { I as ee, h as c, m as l, ut as u } from "./Icons-CqVFbuiZ.js";
import { t as d } from "./Select-DCdh9fS7.js";
import { t as f } from "./Tooltip-ClzY6PN8.js";
import { t as p } from "./InlinePopover-BQTS5egk.js";
import { a as m, t as h } from "./Toolbar-BtzHEH6b.js";
import { t as te } from "./FormField-BDZIVA7n.js";
import { t as g } from "./SearchInput-Dk3D9lhs.js";
import { isValidElement as _, useMemo as v, useRef as y, useState as b } from "react";
import { Fragment as x, jsx as S, jsxs as C } from "react/jsx-runtime";
//#region src/components/shared/CollectionToolbar.tsx
function w({ label: e, layout: t = "table", search: n, filters: r = [], filterPanel: i, summary: a, resultCount: o, placement: l = "band", notices: _ = [], actions: v = [], onRefresh: w, refreshing: T = !1, selection: E, children: D }) {
	let O = y(null), [k, A] = b(!1), j = r.filter((e) => e.value !== (e.emptyValue ?? ""));
	if (E && E.count > 0) return /* @__PURE__ */ C(h, {
		"aria-label": `${e}: selection`,
		wrap: !0,
		variant: "collection",
		"data-collection-layout": t,
		className: t === "cards" ? "px-0" : void 0,
		"data-collection-selection": "active",
		end: E.actions,
		children: [/* @__PURE__ */ S(f, {
			content: "Clear selection",
			children: /* @__PURE__ */ S(s, {
				"aria-label": "Clear selection",
				icon: /* @__PURE__ */ S(c, {}),
				onClick: E.onClear
			})
		}), /* @__PURE__ */ S("span", {
			className: "min-w-0 truncate text-xs font-medium text-text-primary",
			role: "status",
			"data-collection-selection-count": !0,
			children: E.label ?? `${E.count} selected`
		})]
	});
	let { collapsible: M = !0, ...N } = n ?? {
		value: "",
		onChange: () => {}
	}, P = a != null && a !== !1 && o !== 0, F = !!(n || r.length > 0 || i || w), I = /* @__PURE__ */ C(x, { children: [F && /* @__PURE__ */ C("div", {
		className: "flex min-w-0 items-center gap-2",
		"data-collection-query": "",
		children: [
			n && /* @__PURE__ */ S(g, {
				...N,
				collapsible: M,
				className: M ? "min-w-0 w-56 max-w-full" : "min-w-0 w-full max-w-64"
			}),
			(r.length > 0 || i) && /* @__PURE__ */ C(m, {
				label: "Filters",
				trigger: "icon",
				placement: "bottom-end",
				activeCount: j.length + (i?.activeCount ?? 0),
				panelLabel: e,
				onClear: () => {
					r.forEach((e) => e.onChange(e.emptyValue ?? "")), i?.onClear?.();
				},
				children: [r.map((e) => /* @__PURE__ */ S(te, {
					label: e.label,
					children: (t) => /* @__PURE__ */ S(d, {
						...t,
						"aria-label": e.label,
						value: e.value,
						options: e.options,
						onChange: (t) => e.onChange(t.target.value),
						chevron: "custom"
					})
				}, e.id)), i?.content]
			}),
			w && /* @__PURE__ */ S(f, {
				content: "Refresh",
				children: /* @__PURE__ */ S(s, {
					"aria-label": "Refresh",
					icon: /* @__PURE__ */ S(u, {}),
					onClick: w,
					disabled: T
				})
			})
		]
	}), v.map((e) => /* @__PURE__ */ S(f, {
		content: e.label,
		children: /* @__PURE__ */ S(s, {
			"aria-label": e.label,
			icon: e.icon,
			onClick: e.onClick,
			disabled: e.disabled,
			"data-testid": e["data-testid"]
		})
	}, e.id))] }), L = j.length > 0 || P || _.length > 0 || D != null;
	return /* @__PURE__ */ S(h, {
		"aria-label": e,
		wrap: l === "band",
		variant: "collection",
		bordered: !1,
		"data-collection-layout": t,
		"data-collection-placement": l,
		className: l === "header" ? "min-h-0 px-0 py-0" : t === "cards" ? "px-0" : void 0,
		"data-collection-selection": E ? "idle" : void 0,
		end: F || v.length ? I : void 0,
		children: L && /* @__PURE__ */ C(x, { children: [
			j.length > 0 && /* @__PURE__ */ S("span", {
				className: "min-w-0 truncate text-xs text-text-primary",
				title: j.map((e) => `${e.label}: ${e.options.find((t) => t.value === e.value)?.label ?? e.value}`).join(" · "),
				children: j.map((e) => e.options.find((t) => t.value === e.value)?.label ?? e.value).join(" · ")
			}),
			P && /* @__PURE__ */ S("span", {
				className: "min-w-0 text-xs text-text-secondary",
				"data-collection-summary": !0,
				children: a
			}),
			_.length > 0 && /* @__PURE__ */ C(x, { children: [/* @__PURE__ */ S(f, {
				content: "About these results",
				children: /* @__PURE__ */ S(s, {
					ref: O,
					"aria-label": "About these results",
					"aria-haspopup": "dialog",
					"aria-expanded": k,
					icon: /* @__PURE__ */ S(ee, {}),
					onClick: () => A(!k)
				})
			}), /* @__PURE__ */ S(p, {
				open: k,
				onClose: () => A(!1),
				trigger: O,
				"aria-label": "About these results",
				className: "max-w-sm p-3 text-sm text-text-secondary",
				children: /* @__PURE__ */ S("ul", {
					className: "flex flex-col gap-2",
					children: _.map((e, t) => /* @__PURE__ */ S("li", { children: e }, t))
				})
			})] }),
			D
		] })
	});
}
function T(e) {
	return !e.selection && e.children == null;
}
//#endregion
//#region src/components/shared/DataTable.tsx
var E = "@max-[40rem]:block", D = "@max-[40rem]:sr-only", O = "@max-[40rem]:block", k = "@max-[40rem]:block @max-[40rem]:px-3 @max-[40rem]:py-2", A = "@max-[40rem]:flex @max-[40rem]:h-auto @max-[40rem]:items-baseline @max-[40rem]:justify-between @max-[40rem]:gap-4 @max-[40rem]:whitespace-normal @max-[40rem]:px-0 @max-[40rem]:py-1 @max-[40rem]:text-right @max-[40rem]:before:shrink-0 @max-[40rem]:before:text-left @max-[40rem]:before:text-xs @max-[40rem]:before:font-semibold @max-[40rem]:before:uppercase @max-[40rem]:before:tracking-wide @max-[40rem]:before:text-text-secondary @max-[40rem]:before:content-[attr(data-label)]";
function j(e) {
	return e.label ?? (typeof e.header == "string" ? e.header : e.key);
}
var M = "a[href], button, input, select, textarea, label, summary, [role=\"button\"], [role=\"checkbox\"], [role=\"link\"], [role=\"menuitem\"], [role=\"switch\"], [contenteditable=\"true\"]";
function N(e, t) {
	if (!(e instanceof Element)) return !1;
	let n = e.closest(M);
	return !!n && n !== t && t.contains(n);
}
function P(e, t) {
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
function F(e) {
	if (e == null || typeof e == "boolean") return "";
	if (typeof e == "string") return e;
	if (typeof e == "number") return String(e);
	if (Array.isArray(e)) return e.map(F).join(" ");
	if (_(e)) {
		let t = e.props?.children;
		return t === void 0 ? "" : F(t);
	}
	return "";
}
var I = /* @__PURE__ */ new Set();
function L(e, t, n) {
	if (e.getFilterText) return e.getFilterText(t);
	let r = t[e.key];
	return r != null && typeof r != "object" && typeof r != "function" ? String(r) : e.render ? F(e.render(t, n)) : (process.env.NODE_ENV !== "production" && !I.has(e.key) && (I.add(e.key), console.warn(`[DataTable] Column "${e.key}" is searchable but its value lives in neither a primitive row value nor getFilterText, and it has no render function to fall back on — it will never match a search query. Add getFilterText, add render, or set filterable={false}.`)), String(r ?? ""));
}
function R(e) {
	if (e === "right") return "text-right";
	if (e === "center") return "text-center";
}
function z({ rowHeight: ee = "fixed", data: c, columns: u, keyField: d, onRowClick: p, rowActions: m, searchable: h = !1, searchPlaceholder: te = "Search…", pageSize: g, emptyMessage: _ = "No records.", loading: y = !1, loadingRows: x = 5, frameless: T = !1, size: M, striped: F = !0, narrow: I = !1, "aria-label": z, "aria-labelledby": B, selectedKey: V, isRowSelected: H, className: ne, "data-testid": re, staticRows: U }) {
	let ie = V !== void 0 || !!H, ae = (e) => V === void 0 ? !!H?.(e) : V !== null && d(e) === V, W = Array.isArray(c) ? c : [], G = Array.isArray(u) ? u : [], [K, oe] = b(null), [q, se] = b("asc"), [J, ce] = b(""), [le, Y] = b(0), ue = (e) => {
		K === e ? se((e) => e === "asc" ? "desc" : "asc") : (oe(e), se("asc"));
	}, X = v(() => {
		if (!h || J.trim() === "") return W;
		let e = J.trim().toLowerCase();
		return W.filter((t, n) => G.some((r) => r.filterable !== !1 && L(r, t, n).toLowerCase().includes(e)));
	}, [
		W,
		G,
		J,
		h
	]), Z = v(() => {
		if (!K) return X;
		let e = G.find((e) => e.key === K);
		if (!e || !e.sortable) return X;
		let t = e.compare ?? ((t, n) => P(t[e.key], n[e.key])), n = [...X];
		return n.sort((e, n) => q === "asc" ? t(e, n) : -t(e, n)), n;
	}, [
		X,
		G,
		K,
		q
	]), Q = g && g > 0 ? Math.max(1, Math.ceil(Z.length / g)) : 1, $ = Math.min(le, Q - 1), de = v(() => {
		if (!g || g <= 0) return Z;
		let e = $ * g;
		return Z.slice(e, e + g);
	}, [
		Z,
		g,
		$
	]);
	return /* @__PURE__ */ C("div", {
		className: e("flex min-w-0 flex-col gap-3", I && "@container", ne),
		"data-testid": re,
		"data-collection-table": "",
		"data-collection-rows": p ? "activatable" : U ? "static" : void 0,
		"data-collection-rows-reason": !p && U ? U : void 0,
		children: [
			h && /* @__PURE__ */ S(w, {
				label: "Table controls",
				search: {
					value: J,
					onChange: (e) => {
						ce(e), Y(0);
					},
					placeholder: te,
					"aria-label": "Search",
					"data-testid": "datatable-search"
				}
			}),
			/* @__PURE__ */ C(o, {
				"data-ui-table-rows": ee,
				...M ? { size: M } : {},
				className: e(!T && "border border-border rounded-lg overflow-hidden", I && E),
				...z ? { "aria-label": z } : {},
				...B ? { "aria-labelledby": B } : {},
				children: [/* @__PURE__ */ S(a, {
					className: I ? D : void 0,
					children: /* @__PURE__ */ C("tr", { children: [G.map((t) => {
						let n = t.sortable && K === t.key;
						return /* @__PURE__ */ S(i, {
							sortable: t.sortable,
							sortDirection: n ? q : null,
							style: t.width ? { width: t.width } : void 0,
							numeric: t.numeric,
							className: e(R(t.align), t.className),
							onClick: t.sortable ? () => ue(t.key) : void 0,
							"data-testid": t.sortable ? `datatable-header-${t.key}` : void 0,
							children: t.header
						}, t.key);
					}), m && /* @__PURE__ */ S(i, {
						className: "text-right",
						children: "Actions"
					})] })
				}), /* @__PURE__ */ S(r, {
					striped: !1,
					className: I ? O : void 0,
					"data-ui-table-striped": F ? "" : void 0,
					children: y ? Array.from({ length: x }).map((e, r) => /* @__PURE__ */ C(n, {
						"data-testid": "datatable-loading-row",
						children: [G.map((e) => /* @__PURE__ */ S(t, {
							numeric: e.numeric,
							className: R(e.align),
							children: /* @__PURE__ */ S("div", { className: "h-4 w-3/4 animate-pulse rounded bg-surface-hover" })
						}, e.key)), m && /* @__PURE__ */ S(t, {
							className: "text-right",
							children: /* @__PURE__ */ S("div", { className: "ml-auto h-4 w-16 animate-pulse rounded bg-surface-hover" })
						})]
					}, `skeleton-${r}`)) : de.length === 0 ? /* @__PURE__ */ S(n, { children: /* @__PURE__ */ S(t, {
						colSpan: G.length + +!!m,
						className: "text-center text-text-secondary py-8",
						children: _
					}) }) : de.map((r, i) => {
						let a = ie && ae(r);
						return /* @__PURE__ */ C(n, {
							clickable: !!p,
							...ie ? { "aria-selected": a } : {},
							...a ? { "data-selected": "" } : {},
							className: e(I && k, a ? "bg-primary-bg hover:bg-primary-bg" : F && i % 2 == 1 ? "bg-surface-inset" : void 0, p && "focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"),
							tabIndex: p ? 0 : void 0,
							"aria-rowindex": p ? i + 2 : void 0,
							onClick: p ? (e) => {
								N(e.target, e.currentTarget) || p(r);
							} : void 0,
							onKeyDown: p ? (e) => {
								e.target === e.currentTarget && (e.key === "Enter" || e.key === " ") && (e.preventDefault(), p(r));
							} : void 0,
							children: [G.map((n) => /* @__PURE__ */ S(t, {
								numeric: n.numeric,
								className: e(R(n.align), I && A, n.className),
								...I ? { "data-label": j(n) } : {},
								children: n.render ? n.render(r, i) : String(r[n.key] ?? "")
							}, n.key)), m && /* @__PURE__ */ S(t, {
								className: "text-right",
								onClick: (e) => e.stopPropagation(),
								children: /* @__PURE__ */ S("div", {
									className: "flex items-center justify-end gap-2",
									children: m(r)
								})
							})]
						}, d(r));
					})
				})]
			}),
			g && g > 0 && Z.length > g && /* @__PURE__ */ C("div", {
				className: "flex items-center justify-between text-xs text-text-secondary",
				"data-collection-pager": !0,
				children: [/* @__PURE__ */ C("span", {
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
				}), /* @__PURE__ */ C("div", {
					className: "flex gap-1",
					role: "group",
					"aria-label": "Pagination",
					children: [/* @__PURE__ */ S(f, {
						content: "Previous page",
						children: /* @__PURE__ */ S(s, {
							size: "sm",
							"aria-label": "Previous page",
							icon: /* @__PURE__ */ S(l, { dir: "left" }),
							onClick: () => Y(Math.max(0, $ - 1)),
							disabled: $ === 0,
							"data-testid": "datatable-prev"
						})
					}), /* @__PURE__ */ S(f, {
						content: "Next page",
						children: /* @__PURE__ */ S(s, {
							size: "sm",
							"aria-label": "Next page",
							icon: /* @__PURE__ */ S(l, { dir: "right" }),
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
export { w as n, T as r, z as t };
