import { d as e } from "./Button-DQoeE5dN.js";
import { a as t, i as n, n as r, o as i, r as a, t as o } from "./Table-DIDqq2Q1.js";
import { t as s } from "./IconButton-BgM9MvwA.js";
import { I as c, h as l, m as u, ut as d } from "./Icons-CqVFbuiZ.js";
import { t as f } from "./Select-CG_PYETL.js";
import { t as p } from "./Tooltip-ClzY6PN8.js";
import { t as m } from "./InlinePopover-BQTS5egk.js";
import { a as h, t as g } from "./Toolbar-DxZ_2leI.js";
import { t as ee } from "./FormField-BDZIVA7n.js";
import { t as _ } from "./SearchInput-Dk3D9lhs.js";
import { isValidElement as v, useMemo as y, useRef as te, useState as b } from "react";
import { Fragment as x, jsx as S, jsxs as C } from "react/jsx-runtime";
//#region src/components/shared/CollectionToolbar.tsx
function w({ label: e, layout: t = "table", search: n, filters: r = [], filterPanel: i, summary: a, resultCount: o, placement: u = "band", notices: v = [], actions: y = [], onRefresh: w, refreshing: T = !1, selection: E, children: D }) {
	let O = te(null), [k, A] = b(!1), j = r.filter((e) => e.value !== (e.emptyValue ?? ""));
	if (E && E.count > 0) return /* @__PURE__ */ C(g, {
		"aria-label": `${e}: selection`,
		wrap: !0,
		variant: "collection",
		"data-collection-layout": t,
		className: t === "cards" ? "px-0" : void 0,
		"data-collection-selection": "active",
		end: E.actions,
		children: [/* @__PURE__ */ S(p, {
			content: "Clear selection",
			children: /* @__PURE__ */ S(s, {
				"aria-label": "Clear selection",
				icon: /* @__PURE__ */ S(l, {}),
				onClick: E.onClear
			})
		}), /* @__PURE__ */ S("span", {
			className: "min-w-0 truncate text-xs font-medium text-text-primary",
			role: "status",
			"data-collection-selection-count": !0,
			children: E.label ?? `${E.count} selected`
		})]
	});
	let { collapsible: M = !0, ...ne } = n ?? {
		value: "",
		onChange: () => {}
	}, N = a != null && a !== !1 && o !== 0, P = !!(n || r.length > 0 || i || w), F = /* @__PURE__ */ C(x, { children: [P && /* @__PURE__ */ C("div", {
		className: "flex min-w-0 items-center gap-2",
		"data-collection-query": "",
		children: [
			n && /* @__PURE__ */ S(_, {
				...ne,
				collapsible: M,
				className: M ? "min-w-0 w-56 max-w-full" : "min-w-0 w-full max-w-64"
			}),
			(r.length > 0 || i) && /* @__PURE__ */ C(h, {
				label: "Filters",
				trigger: "icon",
				placement: "bottom-end",
				activeCount: j.length + (i?.activeCount ?? 0),
				panelLabel: e,
				onClear: () => {
					r.forEach((e) => e.onChange(e.emptyValue ?? "")), i?.onClear?.();
				},
				children: [r.map((e) => /* @__PURE__ */ S(ee, {
					label: e.label,
					children: (t) => /* @__PURE__ */ S(f, {
						...t,
						"aria-label": e.label,
						value: e.value,
						options: e.options,
						onChange: (t) => e.onChange(t.target.value),
						chevron: "custom"
					})
				}, e.id)), i?.content]
			}),
			w && /* @__PURE__ */ S(p, {
				content: "Refresh",
				children: /* @__PURE__ */ S(s, {
					"aria-label": "Refresh",
					icon: /* @__PURE__ */ S(d, {}),
					onClick: w,
					disabled: T
				})
			})
		]
	}), y.map((e) => /* @__PURE__ */ S(p, {
		content: e.label,
		children: /* @__PURE__ */ S(s, {
			"aria-label": e.label,
			icon: e.icon,
			onClick: e.onClick,
			disabled: e.disabled,
			"data-testid": e["data-testid"]
		})
	}, e.id))] }), re = j.length > 0 || N || v.length > 0 || D != null;
	return /* @__PURE__ */ S(g, {
		"aria-label": e,
		wrap: u === "band",
		variant: "collection",
		bordered: !1,
		"data-collection-layout": t,
		"data-collection-placement": u,
		className: u === "header" ? "min-h-0 px-0 py-0" : t === "cards" ? "px-0" : void 0,
		"data-collection-selection": E ? "idle" : void 0,
		end: P || y.length ? F : void 0,
		children: re && /* @__PURE__ */ C(x, { children: [
			j.length > 0 && /* @__PURE__ */ S("span", {
				className: "min-w-0 truncate text-xs text-text-primary",
				title: j.map((e) => `${e.label}: ${e.options.find((t) => t.value === e.value)?.label ?? e.value}`).join(" · "),
				children: j.map((e) => e.options.find((t) => t.value === e.value)?.label ?? e.value).join(" · ")
			}),
			N && /* @__PURE__ */ S("span", {
				className: "min-w-0 text-xs text-text-secondary",
				"data-collection-summary": !0,
				children: a
			}),
			v.length > 0 && /* @__PURE__ */ C(x, { children: [/* @__PURE__ */ S(p, {
				content: "About these results",
				children: /* @__PURE__ */ S(s, {
					ref: O,
					"aria-label": "About these results",
					"aria-haspopup": "dialog",
					"aria-expanded": k,
					icon: /* @__PURE__ */ S(c, {}),
					onClick: () => A(!k)
				})
			}), /* @__PURE__ */ S(m, {
				open: k,
				onClose: () => A(!1),
				trigger: O,
				"aria-label": "About these results",
				className: "max-w-sm p-3 text-sm text-text-secondary",
				children: /* @__PURE__ */ S("ul", {
					className: "flex flex-col gap-2",
					children: v.map((e, t) => /* @__PURE__ */ S("li", { children: e }, t))
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
var E = "@max-[40rem]:block", D = "@max-[40rem]:sr-only", O = "@max-[40rem]:block", k = "@max-[40rem]:block @max-[40rem]:px-3 @max-[40rem]:py-2", A = "@max-[40rem]:flex @max-[40rem]:h-auto @max-[40rem]:items-baseline @max-[40rem]:justify-between @max-[40rem]:gap-4 @max-[40rem]:whitespace-normal @max-[40rem]:px-0 @max-[40rem]:py-1 @max-[40rem]:text-right @max-[40rem]:before:shrink-0 @max-[40rem]:before:text-left @max-[40rem]:before:text-xs @max-[40rem]:before:font-semibold @max-[40rem]:before:uppercase @max-[40rem]:before:tracking-wide @max-[40rem]:before:text-text-secondary @max-[40rem]:before:content-[attr(data-label)]", j = "normal-case tracking-normal", M = "max-w-0 overflow-hidden whitespace-nowrap @max-[40rem]:max-w-none";
function ne(e, t, n) {
	let r = t[e.key];
	return !e.render && r != null && typeof r != "object" ? String(r) : typeof n == "string" || typeof n == "number" ? String(n) : e.getFilterText ? e.getFilterText(t) : I(n).replace(/\s+/g, " ").trim();
}
function N(e) {
	return e.label ?? (typeof e.header == "string" ? e.header : e.key);
}
var P = "a[href], button, input, select, textarea, label, summary, [role=\"button\"], [role=\"checkbox\"], [role=\"link\"], [role=\"menuitem\"], [role=\"switch\"], [contenteditable=\"true\"]";
function F(e, t) {
	if (!(e instanceof Element)) return !1;
	let n = e.closest(P);
	return !!n && n !== t && t.contains(n);
}
function re(e, t) {
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
function I(e) {
	if (e == null || typeof e == "boolean") return "";
	if (typeof e == "string") return e;
	if (typeof e == "number") return String(e);
	if (Array.isArray(e)) return e.map(I).join(" ");
	if (v(e)) {
		let t = e.props?.children;
		return t === void 0 ? "" : I(t);
	}
	return "";
}
var L = /* @__PURE__ */ new Set();
function ie(e, t, n) {
	if (e.getFilterText) return e.getFilterText(t);
	let r = t[e.key];
	return r != null && typeof r != "object" && typeof r != "function" ? String(r) : e.render ? I(e.render(t, n)) : (process.env.NODE_ENV !== "production" && !L.has(e.key) && (L.add(e.key), console.warn(`[DataTable] Column "${e.key}" is searchable but its value lives in neither a primitive row value nor getFilterText, and it has no render function to fall back on — it will never match a search query. Add getFilterText, add render, or set filterable={false}.`)), String(r ?? ""));
}
function R(e) {
	if (e === "right") return "text-right";
	if (e === "center") return "text-center";
}
function z({ rowHeight: c = "fixed", data: l, columns: d, keyField: f, onRowClick: m, rowActions: h, searchable: g = !1, searchPlaceholder: ee = "Search…", pageSize: _, emptyMessage: v = "No records.", loading: te = !1, loadingRows: x = 5, frameless: T = !1, size: P, striped: I = !0, narrow: L = !1, "aria-label": z, "aria-labelledby": ae, selectedKey: B, isRowSelected: oe, headerCase: se = "upper", className: ce, "data-testid": le, staticRows: V }) {
	let H = se === "sentence", U = B !== void 0 || !!oe, ue = (e) => B === void 0 ? !!oe?.(e) : B !== null && f(e) === B, W = Array.isArray(l) ? l : [], G = Array.isArray(d) ? d : [], [K, de] = b(null), [q, fe] = b("asc"), [J, pe] = b(""), [me, Y] = b(0), he = (e) => {
		K === e ? fe((e) => e === "asc" ? "desc" : "asc") : (de(e), fe("asc"));
	}, X = y(() => {
		if (!g || J.trim() === "") return W;
		let e = J.trim().toLowerCase();
		return W.filter((t, n) => G.some((r) => r.filterable !== !1 && ie(r, t, n).toLowerCase().includes(e)));
	}, [
		W,
		G,
		J,
		g
	]), Z = y(() => {
		if (!K) return X;
		let e = G.find((e) => e.key === K);
		if (!e || !e.sortable) return X;
		let t = e.compare ?? ((t, n) => re(t[e.key], n[e.key])), n = [...X];
		return n.sort((e, n) => q === "asc" ? t(e, n) : -t(e, n)), n;
	}, [
		X,
		G,
		K,
		q
	]), Q = _ && _ > 0 ? Math.max(1, Math.ceil(Z.length / _)) : 1, $ = Math.min(me, Q - 1), ge = y(() => {
		if (!_ || _ <= 0) return Z;
		let e = $ * _;
		return Z.slice(e, e + _);
	}, [
		Z,
		_,
		$
	]);
	return /* @__PURE__ */ C("div", {
		className: e("flex min-w-0 flex-col gap-3", L && "@container", ce),
		"data-testid": le,
		"data-collection-table": "",
		"data-collection-rows": m ? "activatable" : V ? "static" : void 0,
		"data-collection-rows-reason": !m && V ? V : void 0,
		children: [
			g && /* @__PURE__ */ S(w, {
				label: "Table controls",
				search: {
					value: J,
					onChange: (e) => {
						pe(e), Y(0);
					},
					placeholder: ee,
					"aria-label": "Search",
					"data-testid": "datatable-search"
				}
			}),
			/* @__PURE__ */ C(o, {
				"data-ui-table-rows": c,
				...P ? { size: P } : {},
				className: e(!T && "border border-border rounded-lg overflow-hidden", L && E),
				...z ? { "aria-label": z } : {},
				...ae ? { "aria-labelledby": ae } : {},
				children: [/* @__PURE__ */ S(a, {
					className: L ? D : void 0,
					"data-header-case": se,
					children: /* @__PURE__ */ C("tr", { children: [G.map((t) => {
						let n = t.sortable && K === t.key;
						return /* @__PURE__ */ S(i, {
							sortable: t.sortable,
							sortDirection: n ? q : null,
							style: t.width ? { width: t.width } : void 0,
							numeric: t.numeric,
							className: e(H && j, R(t.align), t.className),
							onClick: t.sortable ? () => he(t.key) : void 0,
							"data-testid": t.sortable ? `datatable-header-${t.key}` : void 0,
							children: t.header
						}, t.key);
					}), h && /* @__PURE__ */ S(i, {
						className: e(H && j, "text-right"),
						children: "Actions"
					})] })
				}), /* @__PURE__ */ S(r, {
					striped: !1,
					className: L ? O : void 0,
					"data-ui-table-striped": I ? "" : void 0,
					children: te ? Array.from({ length: x }).map((e, r) => /* @__PURE__ */ C(n, {
						"data-testid": "datatable-loading-row",
						children: [G.map((e) => /* @__PURE__ */ S(t, {
							numeric: e.numeric,
							className: R(e.align),
							children: /* @__PURE__ */ S("div", { className: "h-4 w-3/4 animate-pulse rounded bg-surface-hover" })
						}, e.key)), h && /* @__PURE__ */ S(t, {
							className: "text-right",
							children: /* @__PURE__ */ S("div", { className: "ml-auto h-4 w-16 animate-pulse rounded bg-surface-hover" })
						})]
					}, `skeleton-${r}`)) : ge.length === 0 ? /* @__PURE__ */ S(n, { children: /* @__PURE__ */ S(t, {
						colSpan: G.length + +!!h,
						className: "text-center text-text-secondary py-8",
						children: v
					}) }) : ge.map((r, i) => {
						let a = U && ue(r);
						return /* @__PURE__ */ C(n, {
							clickable: !!m,
							...U ? { "aria-selected": a } : {},
							...a ? { "data-selected": "" } : {},
							className: e(L && k, a ? "bg-primary-bg hover:bg-primary-bg" : I && i % 2 == 1 ? "bg-surface-inset" : void 0, m && "focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"),
							tabIndex: m ? 0 : void 0,
							"aria-rowindex": m ? i + 2 : void 0,
							onClick: m ? (e) => {
								F(e.target, e.currentTarget) || m(r);
							} : void 0,
							onKeyDown: m ? (e) => {
								e.target === e.currentTarget && (e.key === "Enter" || e.key === " ") && (e.preventDefault(), m(r));
							} : void 0,
							children: [G.map((n) => {
								let a = n.render ? n.render(r, i) : String(r[n.key] ?? ""), o = n.truncate ? ne(n, r, a) : "";
								return /* @__PURE__ */ S(t, {
									numeric: n.numeric,
									className: e(R(n.align), n.truncate && M, L && A, n.className),
									...L ? { "data-label": N(n) } : {},
									...n.truncate ? { "data-truncate": "" } : {},
									...o ? { title: o } : {},
									children: n.truncate ? /* @__PURE__ */ S("span", {
										className: "block min-w-0 truncate",
										children: a
									}) : a
								}, n.key);
							}), h && /* @__PURE__ */ S(t, {
								className: "text-right",
								onClick: (e) => e.stopPropagation(),
								children: /* @__PURE__ */ S("div", {
									className: "flex items-center justify-end gap-2",
									children: h(r)
								})
							})]
						}, f(r));
					})
				})]
			}),
			_ && _ > 0 && Z.length > _ && /* @__PURE__ */ C("div", {
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
					children: [/* @__PURE__ */ S(p, {
						content: "Previous page",
						children: /* @__PURE__ */ S(s, {
							size: "sm",
							"aria-label": "Previous page",
							icon: /* @__PURE__ */ S(u, { dir: "left" }),
							onClick: () => Y(Math.max(0, $ - 1)),
							disabled: $ === 0,
							"data-testid": "datatable-prev"
						})
					}), /* @__PURE__ */ S(p, {
						content: "Next page",
						children: /* @__PURE__ */ S(s, {
							size: "sm",
							"aria-label": "Next page",
							icon: /* @__PURE__ */ S(u, { dir: "right" }),
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
