import { d as e, n as t } from "./Button-DQoeE5dN.js";
import { a as n, i as r, n as i, o as a, r as o, t as s } from "./Table-DIDqq2Q1.js";
import { t as c } from "./IconButton-BgM9MvwA.js";
import { I as l, h as u, m as d, ut as f } from "./Icons-CqVFbuiZ.js";
import { t as p } from "./Select-CDxAVVnW.js";
import { t as m } from "./Tooltip-ClzY6PN8.js";
import { t as h } from "./InlinePopover-BQTS5egk.js";
import { a as ee, t as g } from "./Toolbar-D9tcsLG7.js";
import { t as _ } from "./FormField-BDZIVA7n.js";
import { t as te } from "./SearchInput-Dk3D9lhs.js";
import { t as v } from "./KeyValue-AuDcvU3Z.js";
import { isValidElement as y, useCallback as b, useEffect as x, useLayoutEffect as S, useMemo as C, useRef as w, useState as T } from "react";
import { Fragment as E, jsx as D, jsxs as O } from "react/jsx-runtime";
//#region src/components/shared/CollectionToolbar.tsx
function k({ label: e, layout: t = "table", search: n, filters: r = [], filterPanel: i, summary: a, resultCount: o, placement: s = "band", notices: d = [], actions: v = [], onRefresh: y, refreshing: b = !1, selection: x, children: S }) {
	let C = w(null), [k, A] = T(!1), j = r.filter((e) => e.value !== (e.emptyValue ?? ""));
	if (x && x.count > 0) return /* @__PURE__ */ O(g, {
		"aria-label": `${e}: selection`,
		wrap: !0,
		variant: "collection",
		"data-collection-layout": t,
		className: t === "cards" ? "px-0" : void 0,
		"data-collection-selection": "active",
		end: x.actions,
		children: [/* @__PURE__ */ D(m, {
			content: "Clear selection",
			children: /* @__PURE__ */ D(c, {
				"aria-label": "Clear selection",
				icon: /* @__PURE__ */ D(u, {}),
				onClick: x.onClear
			})
		}), /* @__PURE__ */ D("span", {
			className: "min-w-0 truncate text-xs font-medium text-text-primary",
			role: "status",
			"data-collection-selection-count": !0,
			children: x.label ?? `${x.count} selected`
		})]
	});
	let { collapsible: ne = !0, ...re } = n ?? {
		value: "",
		onChange: () => {}
	}, ie = a != null && a !== !1 && o !== 0, ae = !!(n || r.length > 0 || i || y), M = /* @__PURE__ */ O(E, { children: [ae && /* @__PURE__ */ O("div", {
		className: "flex min-w-0 items-center gap-2",
		"data-collection-query": "",
		children: [
			n && /* @__PURE__ */ D(te, {
				...re,
				collapsible: ne,
				className: ne ? "min-w-0 w-56 max-w-full" : "min-w-0 w-full max-w-64"
			}),
			(r.length > 0 || i) && /* @__PURE__ */ O(ee, {
				label: "Filters",
				trigger: "icon",
				placement: "bottom-end",
				activeCount: j.length + (i?.activeCount ?? 0),
				panelLabel: e,
				onClear: () => {
					r.forEach((e) => e.onChange(e.emptyValue ?? "")), i?.onClear?.();
				},
				children: [r.map((e) => /* @__PURE__ */ D(_, {
					label: e.label,
					children: (t) => /* @__PURE__ */ D(p, {
						...t,
						"aria-label": e.label,
						value: e.value,
						options: e.options,
						onChange: (t) => e.onChange(t.target.value),
						chevron: "custom"
					})
				}, e.id)), i?.content]
			}),
			y && /* @__PURE__ */ D(m, {
				content: "Refresh",
				children: /* @__PURE__ */ D(c, {
					"aria-label": "Refresh",
					icon: /* @__PURE__ */ D(f, {}),
					onClick: y,
					disabled: b
				})
			})
		]
	}), v.map((e) => /* @__PURE__ */ D(m, {
		content: e.label,
		children: /* @__PURE__ */ D(c, {
			"aria-label": e.label,
			icon: e.icon,
			onClick: e.onClick,
			disabled: e.disabled,
			"data-testid": e["data-testid"]
		})
	}, e.id))] }), oe = j.length > 0 || ie || d.length > 0 || S != null;
	return /* @__PURE__ */ D(g, {
		"aria-label": e,
		wrap: s === "band",
		variant: "collection",
		bordered: !1,
		"data-collection-layout": t,
		"data-collection-placement": s,
		className: s === "header" ? "min-h-0 px-0 py-0" : t === "cards" ? "px-0" : void 0,
		"data-collection-selection": x ? "idle" : void 0,
		end: ae || v.length ? M : void 0,
		children: oe && /* @__PURE__ */ O(E, { children: [
			j.length > 0 && /* @__PURE__ */ D("span", {
				className: "min-w-0 truncate text-xs text-text-primary",
				title: j.map((e) => `${e.label}: ${e.options.find((t) => t.value === e.value)?.label ?? e.value}`).join(" · "),
				children: j.map((e) => e.options.find((t) => t.value === e.value)?.label ?? e.value).join(" · ")
			}),
			ie && /* @__PURE__ */ D("span", {
				className: "min-w-0 text-xs text-text-secondary",
				"data-collection-summary": !0,
				children: a
			}),
			d.length > 0 && /* @__PURE__ */ O(E, { children: [/* @__PURE__ */ D(m, {
				content: "About these results",
				children: /* @__PURE__ */ D(c, {
					ref: C,
					"aria-label": "About these results",
					"aria-haspopup": "dialog",
					"aria-expanded": k,
					icon: /* @__PURE__ */ D(l, {}),
					onClick: () => A(!k)
				})
			}), /* @__PURE__ */ D(h, {
				open: k,
				onClose: () => A(!1),
				trigger: C,
				"aria-label": "About these results",
				className: "max-w-sm p-3 text-sm text-text-secondary",
				children: /* @__PURE__ */ D("ul", {
					className: "flex flex-col gap-2",
					children: d.map((e, t) => /* @__PURE__ */ D("li", { children: e }, t))
				})
			})] }),
			S
		] })
	});
}
function A(e) {
	return !e.selection && e.children == null;
}
//#endregion
//#region src/components/shared/DataTable.tsx
var j = "@max-[40rem]:block", ne = "@max-[40rem]:sr-only", re = "@max-[40rem]:block", ie = "@max-[40rem]:block @max-[40rem]:px-3 @max-[40rem]:py-2", ae = "@max-[40rem]:flex @max-[40rem]:h-auto @max-[40rem]:items-baseline @max-[40rem]:justify-between @max-[40rem]:gap-4 @max-[40rem]:whitespace-normal @max-[40rem]:px-0 @max-[40rem]:py-1 @max-[40rem]:text-right @max-[40rem]:before:shrink-0 @max-[40rem]:before:text-left @max-[40rem]:before:text-xs @max-[40rem]:before:font-semibold @max-[40rem]:before:uppercase @max-[40rem]:before:tracking-wide @max-[40rem]:before:text-text-secondary @max-[40rem]:before:content-[attr(data-label)]", M = "normal-case tracking-normal", oe = "max-w-0 overflow-hidden whitespace-nowrap @max-[40rem]:max-w-none";
function se(e, t, n) {
	let r = t[e.key];
	return !e.render && r != null && typeof r != "object" ? String(r) : typeof n == "string" || typeof n == "number" ? String(n) : e.getFilterText ? e.getFilterText(t) : F(n).replace(/\s+/g, " ").trim();
}
function ce(e) {
	return e.label ?? (typeof e.header == "string" ? e.header : e.key);
}
function le(e, t, n) {
	if (!e) return "";
	if (e.getFilterText) return e.getFilterText(t);
	let r = t[e.key];
	return r != null && typeof r != "object" ? String(r) : e.render ? F(e.render(t, n)).replace(/\s+/g, " ").trim() : "";
}
function ue(e) {
	return e.map((e, t) => ({
		key: e.key,
		p: e.priority ?? 1,
		index: t
	})).filter((e) => e.p > 1).sort((e, t) => t.p - e.p || t.index - e.index).map((e) => e.key);
}
var N = "hidden", de = "hidden @max-[40rem]:flex", fe = "@max-[40rem]:hidden";
function pe(e, t, n, r) {
	let [i, a] = T(0), o = w([]), [s, c] = T(0), l = w(r);
	return x(() => {
		if (!e || typeof ResizeObserver > "u") return;
		let t = n.current?.querySelector("[data-table-scroller]");
		if (!t) return;
		let r = new ResizeObserver(() => c((e) => e + 1));
		return r.observe(t), () => r.disconnect();
	}, [e, n]), S(() => {
		if (!e) return;
		if (l.current !== r && (l.current = r, o.current = [], i !== 0)) {
			a(0);
			return;
		}
		let s = n.current?.querySelector("[data-table-scroller]");
		if (!s) return;
		let c = s.clientWidth, u = s.scrollWidth;
		if (!(c <= 0)) {
			if (u > c + 1 && i < t) o.current[i] = u, a(i + 1);
			else if (i > 0) {
				let e = o.current[i - 1];
				e !== void 0 && c >= e && a(i - 1);
			}
		}
	}), e ? Math.min(i, t) : 0;
}
function me({ count: e, items: n, rowLabel: r, testId: i }) {
	let [a, o] = T(!1), s = w(null), c = b(() => o(!1), []);
	return /* @__PURE__ */ O(E, { children: [/* @__PURE__ */ D(t, {
		ref: s,
		variant: "ghost",
		size: "sm",
		"aria-expanded": a,
		"aria-haspopup": "dialog",
		onClick: () => o((e) => !e),
		"data-testid": i,
		className: "whitespace-nowrap",
		children: `+${e} ${e === 1 ? "column" : "columns"}`
	}), /* @__PURE__ */ D(h, {
		trigger: s,
		open: a,
		onClose: c,
		placement: "bottom-end",
		"aria-label": `Hidden columns for ${r}`,
		kind: "datatable-hidden-columns",
		"data-testid": `${i}-popover`,
		className: "max-w-80 p-3",
		children: /* @__PURE__ */ D(v, {
			items: n,
			layout: "row",
			"data-testid": `${i}-values`
		})
	})] });
}
var P = "a[href], button, input, select, textarea, label, summary, [role=\"button\"], [role=\"checkbox\"], [role=\"link\"], [role=\"menuitem\"], [role=\"switch\"], [contenteditable=\"true\"]";
function he(e, t) {
	if (!(e instanceof Element)) return !1;
	let n = e.closest(P);
	return !!n && n !== t && t.contains(n);
}
function ge(e, t) {
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
	if (y(e)) {
		let t = e.props?.children;
		return t === void 0 ? "" : F(t);
	}
	return "";
}
var I = /* @__PURE__ */ new Set();
function _e(e, t, n) {
	if (e.getFilterText) return e.getFilterText(t);
	let r = t[e.key];
	return r != null && typeof r != "object" && typeof r != "function" ? String(r) : e.render ? F(e.render(t, n)) : (process.env.NODE_ENV !== "production" && !I.has(e.key) && (I.add(e.key), console.warn(`[DataTable] Column "${e.key}" is searchable but its value lives in neither a primitive row value nor getFilterText, and it has no render function to fall back on — it will never match a search query. Add getFilterText, add render, or set filterable={false}.`)), String(r ?? ""));
}
function L(e) {
	if (e === "right") return "text-right";
	if (e === "center") return "text-center";
}
function R({ rowHeight: t = "fixed", data: l, columns: u, keyField: f, onRowClick: p, rowActions: h, rowActionsHeader: ee = "Actions", rowActionsHeaderHidden: g = !1, searchable: _ = !1, searchPlaceholder: te = "Search…", pageSize: v, emptyMessage: y = "No records.", loading: b = !1, loadingRows: x = 5, frameless: S = !1, size: E, striped: A = !0, narrow: P = !1, "aria-label": F, "aria-labelledby": I, selectedKey: R, isRowSelected: ve, headerCase: ye = "upper", responsiveColumns: z = !1, className: be, "data-testid": xe, staticRows: B }) {
	let V = ye === "sentence", Se = R !== void 0 || !!ve, Ce = (e) => R === void 0 ? !!ve?.(e) : R !== null && f(e) === R, H = Array.isArray(l) ? l : [], U = Array.isArray(u) ? u : [], [W, we] = T(null), [Te, Ee] = T("asc"), [G, De] = T(""), [Oe, ke] = T(0), Ae = w(null), K = C(() => z ? ue(U) : [], [z, U]), je = pe(z && K.length > 0, K.length, Ae, `${U.map((e) => e.key).join("|")}#${H.length}`), q = C(() => new Set(K.slice(0, je)), [K, je]), J = U.filter((e) => q.has(e.key)), Me = P ? de : N, Y = J.length > 0, Ne = (e) => {
		W === e ? Ee((e) => e === "asc" ? "desc" : "asc") : (we(e), Ee("asc"));
	}, X = C(() => {
		if (!_ || G.trim() === "") return H;
		let e = G.trim().toLowerCase();
		return H.filter((t, n) => U.some((r) => r.filterable !== !1 && _e(r, t, n).toLowerCase().includes(e)));
	}, [
		H,
		U,
		G,
		_
	]), Z = C(() => {
		if (!W) return X;
		let e = U.find((e) => e.key === W);
		if (!e || !e.sortable) return X;
		let t = e.compare ?? ((t, n) => ge(t[e.key], n[e.key])), n = [...X];
		return n.sort((e, n) => Te === "asc" ? t(e, n) : -t(e, n)), n;
	}, [
		X,
		U,
		W,
		Te
	]), Q = v && v > 0 ? Math.max(1, Math.ceil(Z.length / v)) : 1, $ = Math.min(Oe, Q - 1), Pe = C(() => {
		if (!v || v <= 0) return Z;
		let e = $ * v;
		return Z.slice(e, e + v);
	}, [
		Z,
		v,
		$
	]);
	return /* @__PURE__ */ O("div", {
		ref: Ae,
		className: e("flex min-w-0 flex-col gap-3", P && "@container", be),
		"data-testid": xe,
		"data-responsive-columns": z ? "" : void 0,
		"data-hidden-columns": z ? J.map((e) => e.key).join(" ") : void 0,
		"data-collection-table": "",
		"data-collection-rows": p ? "activatable" : B ? "static" : void 0,
		"data-collection-rows-reason": !p && B ? B : void 0,
		children: [
			_ && /* @__PURE__ */ D(k, {
				label: "Table controls",
				search: {
					value: G,
					onChange: (e) => {
						De(e), ke(0);
					},
					placeholder: te,
					"aria-label": "Search",
					"data-testid": "datatable-search"
				}
			}),
			/* @__PURE__ */ O(s, {
				"data-ui-table-rows": t,
				...E ? { size: E } : {},
				className: e(!S && "border border-border rounded-lg overflow-hidden", P && j),
				...F ? { "aria-label": F } : {},
				...I ? { "aria-labelledby": I } : {},
				children: [/* @__PURE__ */ D(o, {
					className: P ? ne : void 0,
					"data-header-case": ye,
					children: /* @__PURE__ */ O("tr", { children: [
						U.map((t) => {
							let n = t.sortable && W === t.key;
							return /* @__PURE__ */ D(a, {
								sortable: t.sortable,
								sortDirection: n ? Te : null,
								style: t.width ? { width: t.width } : void 0,
								numeric: t.numeric,
								className: e(V && M, L(t.align), t.className, q.has(t.key) && N),
								onClick: t.sortable ? () => Ne(t.key) : void 0,
								"data-testid": t.sortable ? `datatable-header-${t.key}` : void 0,
								"data-column": z ? t.key : void 0,
								...q.has(t.key) ? { "data-column-hidden": "" } : {},
								children: t.header
							}, t.key);
						}),
						Y && /* @__PURE__ */ D(a, {
							className: e(V && M, "w-px whitespace-nowrap text-right"),
							"data-testid": "datatable-more-header",
							children: /* @__PURE__ */ D("span", {
								className: "sr-only",
								children: "Hidden columns"
							})
						}),
						h && /* @__PURE__ */ D(a, {
							className: e(V && M, "text-right"),
							"data-testid": "datatable-actions-header",
							"data-row-actions-header": g ? "hidden" : "visible",
							children: g ? /* @__PURE__ */ D("span", {
								className: "sr-only",
								children: ee
							}) : ee
						})
					] })
				}), /* @__PURE__ */ D(i, {
					striped: !1,
					className: P ? re : void 0,
					"data-ui-table-striped": A ? "" : void 0,
					children: b ? Array.from({ length: x }).map((t, i) => /* @__PURE__ */ O(r, {
						"data-testid": "datatable-loading-row",
						children: [
							U.map((t) => /* @__PURE__ */ D(n, {
								numeric: t.numeric,
								className: e(L(t.align), q.has(t.key) && N),
								children: /* @__PURE__ */ D("div", { className: "h-4 w-3/4 animate-pulse rounded bg-surface-hover" })
							}, t.key)),
							Y && /* @__PURE__ */ D(n, {}),
							h && /* @__PURE__ */ D(n, {
								className: "text-right",
								children: /* @__PURE__ */ D("div", { className: "ml-auto h-4 w-16 animate-pulse rounded bg-surface-hover" })
							})
						]
					}, `skeleton-${i}`)) : Pe.length === 0 ? /* @__PURE__ */ D(r, { children: /* @__PURE__ */ D(n, {
						colSpan: U.length - J.length + +!!Y + +!!h,
						className: "text-center text-text-secondary py-8",
						children: y
					}) }) : Pe.map((t, i) => {
						let a = Se && Ce(t);
						return /* @__PURE__ */ O(r, {
							clickable: !!p,
							...Se ? { "aria-selected": a } : {},
							...a ? { "data-selected": "" } : {},
							className: e(P && ie, a ? "bg-primary-bg hover:bg-primary-bg" : A && i % 2 == 1 ? "bg-surface-inset" : void 0, p && "focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"),
							tabIndex: p ? 0 : void 0,
							"aria-rowindex": p ? i + 2 : void 0,
							onClick: p ? (e) => {
								he(e.target, e.currentTarget) || p(t);
							} : void 0,
							onKeyDown: p ? (e) => {
								e.target === e.currentTarget && (e.key === "Enter" || e.key === " ") && (e.preventDefault(), p(t));
							} : void 0,
							children: [
								U.map((r) => {
									let a = r.render ? r.render(t, i) : String(t[r.key] ?? ""), o = r.truncate ? se(r, t, a) : "";
									return /* @__PURE__ */ D(n, {
										numeric: r.numeric,
										className: e(L(r.align), r.truncate && oe, P && ae, r.className, q.has(r.key) && Me),
										...P ? { "data-label": ce(r) } : {},
										...r.truncate ? { "data-truncate": "" } : {},
										...o ? { title: o } : {},
										children: r.truncate ? /* @__PURE__ */ D("span", {
											className: "block min-w-0 truncate",
											children: a
										}) : a
									}, r.key);
								}),
								Y && /* @__PURE__ */ D(n, {
									className: e("w-px whitespace-nowrap text-right", P && fe),
									onClick: (e) => e.stopPropagation(),
									onKeyDown: (e) => e.stopPropagation(),
									children: /* @__PURE__ */ D(me, {
										count: J.length,
										rowLabel: le(U.find((e) => !q.has(e.key)), t, i) || f(t),
										testId: `datatable-more-${f(t)}`,
										items: J.map((e) => ({
											label: ce(e),
											value: e.render ? e.render(t, i) : String(t[e.key] ?? "")
										}))
									})
								}),
								h && /* @__PURE__ */ D(n, {
									className: "text-right",
									onClick: (e) => e.stopPropagation(),
									children: /* @__PURE__ */ D("div", {
										className: "flex items-center justify-end gap-2",
										children: h(t)
									})
								})
							]
						}, f(t));
					})
				})]
			}),
			v && v > 0 && Z.length > v && /* @__PURE__ */ O("div", {
				className: "flex items-center justify-between text-xs text-text-secondary",
				"data-collection-pager": !0,
				children: [/* @__PURE__ */ O("span", {
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
				}), /* @__PURE__ */ O("div", {
					className: "flex gap-1",
					role: "group",
					"aria-label": "Pagination",
					children: [/* @__PURE__ */ D(m, {
						content: "Previous page",
						children: /* @__PURE__ */ D(c, {
							size: "sm",
							"aria-label": "Previous page",
							icon: /* @__PURE__ */ D(d, { dir: "left" }),
							onClick: () => ke(Math.max(0, $ - 1)),
							disabled: $ === 0,
							"data-testid": "datatable-prev"
						})
					}), /* @__PURE__ */ D(m, {
						content: "Next page",
						children: /* @__PURE__ */ D(c, {
							size: "sm",
							"aria-label": "Next page",
							icon: /* @__PURE__ */ D(d, { dir: "right" }),
							onClick: () => ke(Math.min(Q - 1, $ + 1)),
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
export { k as n, A as r, R as t };
