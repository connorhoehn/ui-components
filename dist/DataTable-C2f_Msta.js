import { d as e, n as t } from "./Button-DQoeE5dN.js";
import { a as n, i as r, n as i, o as a, r as o, t as s } from "./Table-DIDqq2Q1.js";
import { t as c } from "./IconButton-BgM9MvwA.js";
import { I as l, h as u, m as d, ut as f } from "./Icons-CqVFbuiZ.js";
import { t as p } from "./Select-CG_PYETL.js";
import { t as m } from "./Tooltip-ClzY6PN8.js";
import { t as h } from "./InlinePopover-BQTS5egk.js";
import { a as g, t as _ } from "./Toolbar-DxZ_2leI.js";
import { t as v } from "./FormField-BDZIVA7n.js";
import { t as ee } from "./SearchInput-Dk3D9lhs.js";
import { t as y } from "./KeyValue-AuDcvU3Z.js";
import { isValidElement as b, useCallback as x, useEffect as S, useLayoutEffect as C, useMemo as w, useRef as T, useState as E } from "react";
import { Fragment as D, jsx as O, jsxs as k } from "react/jsx-runtime";
//#region src/components/shared/CollectionToolbar.tsx
function A({ label: e, layout: t = "table", search: n, filters: r = [], filterPanel: i, summary: a, resultCount: o, placement: s = "band", notices: d = [], actions: y = [], onRefresh: b, refreshing: x = !1, selection: S, children: C }) {
	let w = T(null), [A, j] = E(!1), M = r.filter((e) => e.value !== (e.emptyValue ?? ""));
	if (S && S.count > 0) return /* @__PURE__ */ k(_, {
		"aria-label": `${e}: selection`,
		wrap: !0,
		variant: "collection",
		"data-collection-layout": t,
		className: t === "cards" ? "px-0" : void 0,
		"data-collection-selection": "active",
		end: S.actions,
		children: [/* @__PURE__ */ O(m, {
			content: "Clear selection",
			children: /* @__PURE__ */ O(c, {
				"aria-label": "Clear selection",
				icon: /* @__PURE__ */ O(u, {}),
				onClick: S.onClear
			})
		}), /* @__PURE__ */ O("span", {
			className: "min-w-0 truncate text-xs font-medium text-text-primary",
			role: "status",
			"data-collection-selection-count": !0,
			children: S.label ?? `${S.count} selected`
		})]
	});
	let { collapsible: te = !0, ...ne } = n ?? {
		value: "",
		onChange: () => {}
	}, re = a != null && a !== !1 && o !== 0, ie = !!(n || r.length > 0 || i || b), N = /* @__PURE__ */ k(D, { children: [ie && /* @__PURE__ */ k("div", {
		className: "flex min-w-0 items-center gap-2",
		"data-collection-query": "",
		children: [
			n && /* @__PURE__ */ O(ee, {
				...ne,
				collapsible: te,
				className: te ? "min-w-0 w-56 max-w-full" : "min-w-0 w-full max-w-64"
			}),
			(r.length > 0 || i) && /* @__PURE__ */ k(g, {
				label: "Filters",
				trigger: "icon",
				placement: "bottom-end",
				activeCount: M.length + (i?.activeCount ?? 0),
				panelLabel: e,
				onClear: () => {
					r.forEach((e) => e.onChange(e.emptyValue ?? "")), i?.onClear?.();
				},
				children: [r.map((e) => /* @__PURE__ */ O(v, {
					label: e.label,
					children: (t) => /* @__PURE__ */ O(p, {
						...t,
						"aria-label": e.label,
						value: e.value,
						options: e.options,
						onChange: (t) => e.onChange(t.target.value),
						chevron: "custom"
					})
				}, e.id)), i?.content]
			}),
			b && /* @__PURE__ */ O(m, {
				content: "Refresh",
				children: /* @__PURE__ */ O(c, {
					"aria-label": "Refresh",
					icon: /* @__PURE__ */ O(f, {}),
					onClick: b,
					disabled: x
				})
			})
		]
	}), y.map((e) => /* @__PURE__ */ O(m, {
		content: e.label,
		children: /* @__PURE__ */ O(c, {
			"aria-label": e.label,
			icon: e.icon,
			onClick: e.onClick,
			disabled: e.disabled,
			"data-testid": e["data-testid"]
		})
	}, e.id))] }), ae = M.length > 0 || re || d.length > 0 || C != null;
	return /* @__PURE__ */ O(_, {
		"aria-label": e,
		wrap: s === "band",
		variant: "collection",
		bordered: !1,
		"data-collection-layout": t,
		"data-collection-placement": s,
		className: s === "header" ? "min-h-0 px-0 py-0" : t === "cards" ? "px-0" : void 0,
		"data-collection-selection": S ? "idle" : void 0,
		end: ie || y.length ? N : void 0,
		children: ae && /* @__PURE__ */ k(D, { children: [
			M.length > 0 && /* @__PURE__ */ O("span", {
				className: "min-w-0 truncate text-xs text-text-primary",
				title: M.map((e) => `${e.label}: ${e.options.find((t) => t.value === e.value)?.label ?? e.value}`).join(" · "),
				children: M.map((e) => e.options.find((t) => t.value === e.value)?.label ?? e.value).join(" · ")
			}),
			re && /* @__PURE__ */ O("span", {
				className: "min-w-0 text-xs text-text-secondary",
				"data-collection-summary": !0,
				children: a
			}),
			d.length > 0 && /* @__PURE__ */ k(D, { children: [/* @__PURE__ */ O(m, {
				content: "About these results",
				children: /* @__PURE__ */ O(c, {
					ref: w,
					"aria-label": "About these results",
					"aria-haspopup": "dialog",
					"aria-expanded": A,
					icon: /* @__PURE__ */ O(l, {}),
					onClick: () => j(!A)
				})
			}), /* @__PURE__ */ O(h, {
				open: A,
				onClose: () => j(!1),
				trigger: w,
				"aria-label": "About these results",
				className: "max-w-sm p-3 text-sm text-text-secondary",
				children: /* @__PURE__ */ O("ul", {
					className: "flex flex-col gap-2",
					children: d.map((e, t) => /* @__PURE__ */ O("li", { children: e }, t))
				})
			})] }),
			C
		] })
	});
}
function j(e) {
	return !e.selection && e.children == null;
}
//#endregion
//#region src/components/shared/DataTable.tsx
var M = "@max-[40rem]:block", te = "@max-[40rem]:sr-only", ne = "@max-[40rem]:block", re = "@max-[40rem]:block @max-[40rem]:px-3 @max-[40rem]:py-2", ie = "@max-[40rem]:flex @max-[40rem]:h-auto @max-[40rem]:items-baseline @max-[40rem]:justify-between @max-[40rem]:gap-4 @max-[40rem]:whitespace-normal @max-[40rem]:px-0 @max-[40rem]:py-1 @max-[40rem]:text-right @max-[40rem]:before:shrink-0 @max-[40rem]:before:text-left @max-[40rem]:before:text-xs @max-[40rem]:before:font-semibold @max-[40rem]:before:uppercase @max-[40rem]:before:tracking-wide @max-[40rem]:before:text-text-secondary @max-[40rem]:before:content-[attr(data-label)]", N = "normal-case tracking-normal", ae = "max-w-0 overflow-hidden whitespace-nowrap @max-[40rem]:max-w-none";
function oe(e, t, n) {
	let r = t[e.key];
	return !e.render && r != null && typeof r != "object" ? String(r) : typeof n == "string" || typeof n == "number" ? String(n) : e.getFilterText ? e.getFilterText(t) : F(n).replace(/\s+/g, " ").trim();
}
function se(e) {
	return e.label ?? (typeof e.header == "string" ? e.header : e.key);
}
function ce(e, t, n) {
	if (!e) return "";
	if (e.getFilterText) return e.getFilterText(t);
	let r = t[e.key];
	return r != null && typeof r != "object" ? String(r) : e.render ? F(e.render(t, n)).replace(/\s+/g, " ").trim() : "";
}
function le(e) {
	return e.map((e, t) => ({
		key: e.key,
		p: e.priority ?? 1,
		index: t
	})).filter((e) => e.p > 1).sort((e, t) => t.p - e.p || t.index - e.index).map((e) => e.key);
}
var ue = "hidden", de = "hidden @max-[40rem]:flex", fe = "@max-[40rem]:hidden";
function pe(e, t, n, r) {
	let [i, a] = E(0), o = T([]), [s, c] = E(0), l = T(r);
	return S(() => {
		if (!e || typeof ResizeObserver > "u") return;
		let t = n.current?.querySelector("[data-table-scroller]");
		if (!t) return;
		let r = new ResizeObserver(() => c((e) => e + 1));
		return r.observe(t), () => r.disconnect();
	}, [e, n]), C(() => {
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
	let [a, o] = E(!1), s = T(null), c = x(() => o(!1), []);
	return /* @__PURE__ */ k(D, { children: [/* @__PURE__ */ O(t, {
		ref: s,
		variant: "ghost",
		size: "sm",
		"aria-expanded": a,
		"aria-haspopup": "dialog",
		onClick: () => o((e) => !e),
		"data-testid": i,
		className: "whitespace-nowrap",
		children: `+${e} ${e === 1 ? "column" : "columns"}`
	}), /* @__PURE__ */ O(h, {
		trigger: s,
		open: a,
		onClose: c,
		placement: "bottom-end",
		"aria-label": `Hidden columns for ${r}`,
		kind: "datatable-hidden-columns",
		"data-testid": `${i}-popover`,
		className: "max-w-80 p-3",
		children: /* @__PURE__ */ O(y, {
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
	if (b(e)) {
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
function R({ rowHeight: t = "fixed", data: l, columns: u, keyField: f, onRowClick: p, rowActions: h, searchable: g = !1, searchPlaceholder: _ = "Search…", pageSize: v, emptyMessage: ee = "No records.", loading: y = !1, loadingRows: b = 5, frameless: x = !1, size: S, striped: C = !0, narrow: D = !1, "aria-label": j, "aria-labelledby": P, selectedKey: F, isRowSelected: I, headerCase: R = "upper", responsiveColumns: z = !1, className: ve, "data-testid": ye, staticRows: B }) {
	let V = R === "sentence", be = F !== void 0 || !!I, xe = (e) => F === void 0 ? !!I?.(e) : F !== null && f(e) === F, H = Array.isArray(l) ? l : [], U = Array.isArray(u) ? u : [], [W, Se] = E(null), [Ce, we] = E("asc"), [G, Te] = E(""), [Ee, De] = E(0), Oe = T(null), K = w(() => z ? le(U) : [], [z, U]), ke = pe(z && K.length > 0, K.length, Oe, `${U.map((e) => e.key).join("|")}#${H.length}`), q = w(() => new Set(K.slice(0, ke)), [K, ke]), J = U.filter((e) => q.has(e.key)), Ae = D ? de : ue, Y = J.length > 0, je = (e) => {
		W === e ? we((e) => e === "asc" ? "desc" : "asc") : (Se(e), we("asc"));
	}, X = w(() => {
		if (!g || G.trim() === "") return H;
		let e = G.trim().toLowerCase();
		return H.filter((t, n) => U.some((r) => r.filterable !== !1 && _e(r, t, n).toLowerCase().includes(e)));
	}, [
		H,
		U,
		G,
		g
	]), Z = w(() => {
		if (!W) return X;
		let e = U.find((e) => e.key === W);
		if (!e || !e.sortable) return X;
		let t = e.compare ?? ((t, n) => ge(t[e.key], n[e.key])), n = [...X];
		return n.sort((e, n) => Ce === "asc" ? t(e, n) : -t(e, n)), n;
	}, [
		X,
		U,
		W,
		Ce
	]), Q = v && v > 0 ? Math.max(1, Math.ceil(Z.length / v)) : 1, $ = Math.min(Ee, Q - 1), Me = w(() => {
		if (!v || v <= 0) return Z;
		let e = $ * v;
		return Z.slice(e, e + v);
	}, [
		Z,
		v,
		$
	]);
	return /* @__PURE__ */ k("div", {
		ref: Oe,
		className: e("flex min-w-0 flex-col gap-3", D && "@container", ve),
		"data-testid": ye,
		"data-responsive-columns": z ? "" : void 0,
		"data-hidden-columns": z ? J.map((e) => e.key).join(" ") : void 0,
		"data-collection-table": "",
		"data-collection-rows": p ? "activatable" : B ? "static" : void 0,
		"data-collection-rows-reason": !p && B ? B : void 0,
		children: [
			g && /* @__PURE__ */ O(A, {
				label: "Table controls",
				search: {
					value: G,
					onChange: (e) => {
						Te(e), De(0);
					},
					placeholder: _,
					"aria-label": "Search",
					"data-testid": "datatable-search"
				}
			}),
			/* @__PURE__ */ k(s, {
				"data-ui-table-rows": t,
				...S ? { size: S } : {},
				className: e(!x && "border border-border rounded-lg overflow-hidden", D && M),
				...j ? { "aria-label": j } : {},
				...P ? { "aria-labelledby": P } : {},
				children: [/* @__PURE__ */ O(o, {
					className: D ? te : void 0,
					"data-header-case": R,
					children: /* @__PURE__ */ k("tr", { children: [
						U.map((t) => {
							let n = t.sortable && W === t.key;
							return /* @__PURE__ */ O(a, {
								sortable: t.sortable,
								sortDirection: n ? Ce : null,
								style: t.width ? { width: t.width } : void 0,
								numeric: t.numeric,
								className: e(V && N, L(t.align), t.className, q.has(t.key) && ue),
								onClick: t.sortable ? () => je(t.key) : void 0,
								"data-testid": t.sortable ? `datatable-header-${t.key}` : void 0,
								"data-column": z ? t.key : void 0,
								...q.has(t.key) ? { "data-column-hidden": "" } : {},
								children: t.header
							}, t.key);
						}),
						Y && /* @__PURE__ */ O(a, {
							className: e(V && N, "w-px whitespace-nowrap text-right"),
							"data-testid": "datatable-more-header",
							children: /* @__PURE__ */ O("span", {
								className: "sr-only",
								children: "Hidden columns"
							})
						}),
						h && /* @__PURE__ */ O(a, {
							className: e(V && N, "text-right"),
							children: "Actions"
						})
					] })
				}), /* @__PURE__ */ O(i, {
					striped: !1,
					className: D ? ne : void 0,
					"data-ui-table-striped": C ? "" : void 0,
					children: y ? Array.from({ length: b }).map((t, i) => /* @__PURE__ */ k(r, {
						"data-testid": "datatable-loading-row",
						children: [
							U.map((t) => /* @__PURE__ */ O(n, {
								numeric: t.numeric,
								className: e(L(t.align), q.has(t.key) && ue),
								children: /* @__PURE__ */ O("div", { className: "h-4 w-3/4 animate-pulse rounded bg-surface-hover" })
							}, t.key)),
							Y && /* @__PURE__ */ O(n, {}),
							h && /* @__PURE__ */ O(n, {
								className: "text-right",
								children: /* @__PURE__ */ O("div", { className: "ml-auto h-4 w-16 animate-pulse rounded bg-surface-hover" })
							})
						]
					}, `skeleton-${i}`)) : Me.length === 0 ? /* @__PURE__ */ O(r, { children: /* @__PURE__ */ O(n, {
						colSpan: U.length - J.length + +!!Y + +!!h,
						className: "text-center text-text-secondary py-8",
						children: ee
					}) }) : Me.map((t, i) => {
						let a = be && xe(t);
						return /* @__PURE__ */ k(r, {
							clickable: !!p,
							...be ? { "aria-selected": a } : {},
							...a ? { "data-selected": "" } : {},
							className: e(D && re, a ? "bg-primary-bg hover:bg-primary-bg" : C && i % 2 == 1 ? "bg-surface-inset" : void 0, p && "focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"),
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
									let a = r.render ? r.render(t, i) : String(t[r.key] ?? ""), o = r.truncate ? oe(r, t, a) : "";
									return /* @__PURE__ */ O(n, {
										numeric: r.numeric,
										className: e(L(r.align), r.truncate && ae, D && ie, r.className, q.has(r.key) && Ae),
										...D ? { "data-label": se(r) } : {},
										...r.truncate ? { "data-truncate": "" } : {},
										...o ? { title: o } : {},
										children: r.truncate ? /* @__PURE__ */ O("span", {
											className: "block min-w-0 truncate",
											children: a
										}) : a
									}, r.key);
								}),
								Y && /* @__PURE__ */ O(n, {
									className: e("w-px whitespace-nowrap text-right", D && fe),
									onClick: (e) => e.stopPropagation(),
									onKeyDown: (e) => e.stopPropagation(),
									children: /* @__PURE__ */ O(me, {
										count: J.length,
										rowLabel: ce(U.find((e) => !q.has(e.key)), t, i) || f(t),
										testId: `datatable-more-${f(t)}`,
										items: J.map((e) => ({
											label: se(e),
											value: e.render ? e.render(t, i) : String(t[e.key] ?? "")
										}))
									})
								}),
								h && /* @__PURE__ */ O(n, {
									className: "text-right",
									onClick: (e) => e.stopPropagation(),
									children: /* @__PURE__ */ O("div", {
										className: "flex items-center justify-end gap-2",
										children: h(t)
									})
								})
							]
						}, f(t));
					})
				})]
			}),
			v && v > 0 && Z.length > v && /* @__PURE__ */ k("div", {
				className: "flex items-center justify-between text-xs text-text-secondary",
				"data-collection-pager": !0,
				children: [/* @__PURE__ */ k("span", {
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
				}), /* @__PURE__ */ k("div", {
					className: "flex gap-1",
					role: "group",
					"aria-label": "Pagination",
					children: [/* @__PURE__ */ O(m, {
						content: "Previous page",
						children: /* @__PURE__ */ O(c, {
							size: "sm",
							"aria-label": "Previous page",
							icon: /* @__PURE__ */ O(d, { dir: "left" }),
							onClick: () => De(Math.max(0, $ - 1)),
							disabled: $ === 0,
							"data-testid": "datatable-prev"
						})
					}), /* @__PURE__ */ O(m, {
						content: "Next page",
						children: /* @__PURE__ */ O(c, {
							size: "sm",
							"aria-label": "Next page",
							icon: /* @__PURE__ */ O(d, { dir: "right" }),
							onClick: () => De(Math.min(Q - 1, $ + 1)),
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
export { A as n, j as r, R as t };
