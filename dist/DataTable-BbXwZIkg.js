import { d as e, n as t } from "./Button-DQoeE5dN.js";
import { a as n, i as r, n as i, o as a, r as o, t as s } from "./Table-DIDqq2Q1.js";
import { t as c } from "./IconButton-BgM9MvwA.js";
import { I as l, h as u, m as d, ut as f } from "./Icons-CqVFbuiZ.js";
import { t as p } from "./Select-CDxAVVnW.js";
import { t as m } from "./Tooltip-ClzY6PN8.js";
import { t as h } from "./InlinePopover-qnf51Wbc.js";
import { a as g, t as _ } from "./Toolbar-B54xCQ4Q.js";
import { t as v } from "./FormField-BDZIVA7n.js";
import { t as ee } from "./SearchInput-Dk3D9lhs.js";
import { t as y } from "./KeyValue-Cas8iY09.js";
import { isValidElement as b, useCallback as te, useEffect as x, useLayoutEffect as S, useMemo as C, useRef as w, useState as T } from "react";
import { Fragment as E, jsx as D, jsxs as O } from "react/jsx-runtime";
//#region src/components/shared/CollectionToolbar.tsx
function k({ label: e, layout: t = "table", search: n, filters: r = [], filterPanel: i, summary: a, resultCount: o, placement: s = "band", notices: d = [], actions: y = [], onRefresh: b, refreshing: te = !1, selection: x, children: S }) {
	let C = w(null), [k, A] = T(!1), j = r.filter((e) => e.value !== (e.emptyValue ?? ""));
	if (x && x.count > 0) return /* @__PURE__ */ O(_, {
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
	let { collapsible: M = !0, ...ne } = n ?? {
		value: "",
		onChange: () => {}
	}, re = a != null && a !== !1 && o !== 0, ie = !!(n || r.length > 0 || i || b), N = /* @__PURE__ */ O(E, { children: [ie && /* @__PURE__ */ O("div", {
		className: "flex min-w-0 items-center gap-2",
		"data-collection-query": "",
		children: [
			n && /* @__PURE__ */ D(ee, {
				...ne,
				collapsible: M,
				className: M ? "min-w-0 w-56 max-w-full" : "min-w-0 w-full max-w-64"
			}),
			(r.length > 0 || i) && /* @__PURE__ */ O(g, {
				label: "Filters",
				trigger: "icon",
				placement: "bottom-end",
				activeCount: j.length + (i?.activeCount ?? 0),
				panelLabel: e,
				onClear: () => {
					r.forEach((e) => e.onChange(e.emptyValue ?? "")), i?.onClear?.();
				},
				children: [r.map((e) => /* @__PURE__ */ D(v, {
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
			b && /* @__PURE__ */ D(m, {
				content: "Refresh",
				children: /* @__PURE__ */ D(c, {
					"aria-label": "Refresh",
					icon: /* @__PURE__ */ D(f, {}),
					onClick: b,
					disabled: te
				})
			})
		]
	}), y.map((e) => /* @__PURE__ */ D(m, {
		content: e.label,
		children: /* @__PURE__ */ D(c, {
			"aria-label": e.label,
			icon: e.icon,
			onClick: e.onClick,
			disabled: e.disabled,
			"data-testid": e["data-testid"]
		})
	}, e.id))] }), ae = j.length > 0 || re || d.length > 0 || S != null;
	return /* @__PURE__ */ D(_, {
		"aria-label": e,
		wrap: s === "band",
		variant: "collection",
		bordered: !1,
		"data-collection-layout": t,
		"data-collection-placement": s,
		className: s === "header" ? "min-h-0 px-0 py-0" : t === "cards" ? "px-0" : void 0,
		"data-collection-selection": x ? "idle" : void 0,
		end: ie || y.length ? N : void 0,
		children: ae && /* @__PURE__ */ O(E, { children: [
			j.length > 0 && /* @__PURE__ */ D("span", {
				className: "min-w-0 truncate text-xs text-text-primary",
				title: j.map((e) => `${e.label}: ${e.options.find((t) => t.value === e.value)?.label ?? e.value}`).join(" · "),
				children: j.map((e) => e.options.find((t) => t.value === e.value)?.label ?? e.value).join(" · ")
			}),
			re && /* @__PURE__ */ D("span", {
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
var j = "@max-[40rem]:block", M = "@max-[40rem]:sr-only", ne = "@max-[40rem]:block", re = "@max-[40rem]:block @max-[40rem]:px-3 @max-[40rem]:py-2", ie = "@max-[40rem]:flex @max-[40rem]:h-auto @max-[40rem]:items-baseline @max-[40rem]:justify-between @max-[40rem]:gap-4 @max-[40rem]:whitespace-normal @max-[40rem]:px-0 @max-[40rem]:py-1 @max-[40rem]:text-right @max-[40rem]:before:shrink-0 @max-[40rem]:before:text-left @max-[40rem]:before:text-xs @max-[40rem]:before:font-semibold @max-[40rem]:before:uppercase @max-[40rem]:before:tracking-wide @max-[40rem]:before:text-text-secondary @max-[40rem]:before:content-[attr(data-label)]", N = "normal-case tracking-normal", ae = "max-w-0 overflow-hidden whitespace-nowrap @max-[40rem]:max-w-none";
function oe(e, t, n) {
	let r = t[e.key];
	return !e.render && r != null && typeof r != "object" ? String(r) : typeof n == "string" || typeof n == "number" ? String(n) : e.getFilterText ? e.getFilterText(t) : I(n).replace(/\s+/g, " ").trim();
}
function se(e) {
	return e.label ?? (typeof e.header == "string" ? e.header : e.key);
}
function ce(e, t, n) {
	if (!e) return "";
	if (e.getFilterText) return e.getFilterText(t);
	let r = t[e.key];
	return r != null && typeof r != "object" ? String(r) : e.render ? I(e.render(t, n)).replace(/\s+/g, " ").trim() : "";
}
function le(e) {
	return e.map((e, t) => ({
		key: e.key,
		p: e.priority ?? 1,
		index: t
	})).filter((e) => e.p > 1).sort((e, t) => t.p - e.p || t.index - e.index).map((e) => e.key);
}
var P = "hidden", ue = "hidden @max-[40rem]:flex", de = "@max-[40rem]:hidden", fe = "block", pe = "sr-only", me = "block", he = "block px-3 py-2", ge = "flex h-auto max-w-none items-baseline justify-between gap-4 whitespace-normal px-0 py-1 text-right before:shrink-0 before:text-left before:text-xs before:font-semibold before:uppercase before:tracking-wide before:text-text-secondary before:content-[attr(data-label)]";
function _e(e, t, n, r, i) {
	let a = Math.min(t, Math.floor(n / 2)), [o, s] = T(0), [c, l] = T(0), u = w(!1), d = w(i);
	if (x(() => {
		if (!e) return;
		let t = !0, n = () => {
			t && (u.current = !0, l((e) => e + 1));
		};
		if (typeof document < "u" && document.fonts?.ready && document.fonts.ready.then(n, () => void 0), typeof ResizeObserver > "u") return () => {
			t = !1;
		};
		let i = r.current?.querySelector("[data-table-scroller]");
		if (!i) return () => {
			t = !1;
		};
		let a = -1, o = new ResizeObserver(() => {
			let e = i.clientWidth;
			!t || e === a || (a = e, n());
		});
		o.observe(i);
		let s = null, c = 0, d = () => Array.from(i.querySelectorAll("tbody td:not([data-column-more])"), (e) => e.textContent ?? "").join(""), f = typeof MutationObserver > "u" ? null : new MutationObserver(() => {
			c || typeof requestAnimationFrame > "u" || (c = requestAnimationFrame(() => {
				if (c = 0, !t) return;
				let e = d();
				s !== null && e !== s && n(), s = e;
			}));
		});
		return s = d(), f?.observe(i, {
			subtree: !0,
			childList: !0,
			characterData: !0
		}), () => {
			t = !1, o.disconnect(), f?.disconnect(), c && cancelAnimationFrame(c);
		};
	}, [e, r]), S(() => {
		if (!e) return;
		if (d.current !== i && (d.current = i, u.current = !0), u.current && (u.current = !1, o !== 0)) {
			s(0);
			return;
		}
		let t = r.current?.querySelector("[data-table-scroller]");
		if (!t) return;
		let n = t.clientWidth;
		n <= 0 || t.scrollWidth > n + 1 && o <= a && s(o + 1);
	}), !e) return {
		hidden: 0,
		stacked: !1
	};
	let f = o > a;
	return {
		hidden: f ? 0 : o,
		stacked: f
	};
}
function ve({ count: e, items: n, rowLabel: r, testId: i }) {
	let [a, o] = T(!1), s = w(null), c = te(() => o(!1), []);
	return /* @__PURE__ */ O(E, { children: [/* @__PURE__ */ D(t, {
		ref: s,
		variant: "ghost",
		size: "sm",
		"aria-expanded": a,
		"aria-haspopup": "dialog",
		onClick: () => o((e) => !e),
		"data-testid": i,
		className: "whitespace-nowrap font-normal text-text-secondary",
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
		children: /* @__PURE__ */ D(y, {
			items: n,
			layout: "row",
			"data-testid": `${i}-values`
		})
	})] });
}
var F = "a[href], button, input, select, textarea, label, summary, [role=\"button\"], [role=\"checkbox\"], [role=\"link\"], [role=\"menuitem\"], [role=\"switch\"], [contenteditable=\"true\"]";
function ye(e, t) {
	if (!(e instanceof Element)) return !1;
	let n = e.closest(F);
	return !!n && n !== t && t.contains(n);
}
function be(e, t) {
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
	if (b(e)) {
		let t = e.props?.children;
		return t === void 0 ? "" : I(t);
	}
	return "";
}
var L = /* @__PURE__ */ new Set();
function xe(e, t, n) {
	if (e.getFilterText) return e.getFilterText(t);
	let r = t[e.key];
	return r != null && typeof r != "object" && typeof r != "function" ? String(r) : e.render ? I(e.render(t, n)) : (process.env.NODE_ENV !== "production" && !L.has(e.key) && (L.add(e.key), console.warn(`[DataTable] Column "${e.key}" is searchable but its value lives in neither a primitive row value nor getFilterText, and it has no render function to fall back on — it will never match a search query. Add getFilterText, add render, or set filterable={false}.`)), String(r ?? ""));
}
function R(e) {
	if (e === "right") return "text-right";
	if (e === "center") return "text-center";
}
function z({ rowHeight: t = "fixed", data: l, columns: u, keyField: f, onRowClick: p, rowActions: h, rowActionsHeader: g = "Actions", rowActionsHeaderHidden: _ = !1, searchable: v = !1, searchPlaceholder: ee = "Search…", pageSize: y, emptyMessage: b = "No records.", loading: te = !1, loadingRows: x = 5, frameless: S = !1, size: E, striped: A = !0, narrow: F = !1, "aria-label": I, "aria-labelledby": L, selectedKey: z, isRowSelected: Se, headerCase: Ce = "upper", responsiveColumns: B = !1, className: we, "data-testid": Te, staticRows: Ee }) {
	let De = Ce === "sentence", Oe = z !== void 0 || !!Se, ke = (e) => z === void 0 ? !!Se?.(e) : z !== null && f(e) === z, Ae = Array.isArray(l) ? l : [], V = Array.isArray(u) ? u : [], [H, je] = T(null), [Me, Ne] = T("asc"), [U, Pe] = T(""), [Fe, Ie] = T(0), Le = w(null), Re = C(() => B ? le(V) : [], [B, V]), ze = V.map((e) => e.key).join("|"), Be = (e) => {
		H === e ? Ne((e) => e === "asc" ? "desc" : "asc") : (je(e), Ne("asc"));
	}, W = C(() => {
		if (!v || U.trim() === "") return Ae;
		let e = U.trim().toLowerCase();
		return Ae.filter((t, n) => V.some((r) => r.filterable !== !1 && xe(r, t, n).toLowerCase().includes(e)));
	}, [
		Ae,
		V,
		U,
		v
	]), G = C(() => {
		if (!H) return W;
		let e = V.find((e) => e.key === H);
		if (!e || !e.sortable) return W;
		let t = e.compare ?? ((t, n) => be(t[e.key], n[e.key])), n = [...W];
		return n.sort((e, n) => Me === "asc" ? t(e, n) : -t(e, n)), n;
	}, [
		W,
		V,
		H,
		Me
	]), K = y && y > 0 ? Math.max(1, Math.ceil(G.length / y)) : 1, q = Math.min(Fe, K - 1), J = C(() => {
		if (!y || y <= 0) return G;
		let e = q * y;
		return G.slice(e, e + y);
	}, [
		G,
		y,
		q
	]), Ve = C(() => ({
		paged: J,
		columnKeys: ze
	}), [J, ze]), Y = _e(B, Re.length, V.length, Le, Ve), X = Y.stacked, Z = C(() => new Set(Re.slice(0, Y.hidden)), [Re, Y.hidden]), Q = V.filter((e) => Z.has(e.key)), He = F ? ue : P, $ = Q.length > 0, Ue = F || X;
	return /* @__PURE__ */ O("div", {
		ref: Le,
		className: e("flex min-w-0 flex-col gap-3", F && "@container", we),
		"data-testid": Te,
		"data-responsive-columns": B ? "" : void 0,
		"data-hidden-columns": B ? Q.map((e) => e.key).join(" ") : void 0,
		"data-stacked": X ? "" : void 0,
		"data-collection-table": "",
		"data-collection-rows": p ? "activatable" : Ee ? "static" : void 0,
		"data-collection-rows-reason": !p && Ee ? Ee : void 0,
		children: [
			v && /* @__PURE__ */ D(k, {
				label: "Table controls",
				search: {
					value: U,
					onChange: (e) => {
						Pe(e), Ie(0);
					},
					placeholder: ee,
					"aria-label": "Search",
					"data-testid": "datatable-search"
				}
			}),
			/* @__PURE__ */ O(s, {
				"data-ui-table-rows": t,
				...E ? { size: E } : {},
				className: e(!S && "border border-border rounded-lg overflow-hidden", F && j, X && fe),
				...I ? { "aria-label": I } : {},
				...L ? { "aria-labelledby": L } : {},
				children: [/* @__PURE__ */ D(o, {
					className: e(F && M, X && pe),
					"data-header-case": Ce,
					children: /* @__PURE__ */ O("tr", { children: [
						V.map((t) => {
							let n = t.sortable && H === t.key;
							return /* @__PURE__ */ D(a, {
								sortable: t.sortable,
								sortDirection: n ? Me : null,
								style: t.width ? { width: t.width } : void 0,
								numeric: t.numeric,
								className: e(De && N, R(t.align), t.className, Z.has(t.key) && P),
								onClick: t.sortable ? () => Be(t.key) : void 0,
								"data-testid": t.sortable ? `datatable-header-${t.key}` : void 0,
								"data-column": B ? t.key : void 0,
								...Z.has(t.key) ? { "data-column-hidden": "" } : {},
								children: t.header
							}, t.key);
						}),
						$ && /* @__PURE__ */ D(a, {
							className: e(De && N, "w-px whitespace-nowrap text-right"),
							"data-testid": "datatable-more-header",
							"data-column-more": "",
							children: "More"
						}),
						h && /* @__PURE__ */ D(a, {
							className: e(De && N, "text-right"),
							"data-testid": "datatable-actions-header",
							"data-row-actions-header": _ ? "hidden" : "visible",
							children: _ ? /* @__PURE__ */ D("span", {
								className: "sr-only",
								children: g
							}) : g
						})
					] })
				}), /* @__PURE__ */ D(i, {
					striped: !1,
					className: e(F && ne, X && me),
					"data-ui-table-striped": A ? "" : void 0,
					children: te ? Array.from({ length: x }).map((t, i) => /* @__PURE__ */ O(r, {
						"data-testid": "datatable-loading-row",
						children: [
							V.map((t) => /* @__PURE__ */ D(n, {
								numeric: t.numeric,
								className: e(R(t.align), Z.has(t.key) && P),
								children: /* @__PURE__ */ D("div", { className: "h-4 w-3/4 animate-pulse rounded bg-surface-hover" })
							}, t.key)),
							$ && /* @__PURE__ */ D(n, { "data-column-more": "" }),
							h && /* @__PURE__ */ D(n, {
								className: "text-right",
								children: /* @__PURE__ */ D("div", { className: "ml-auto h-4 w-16 animate-pulse rounded bg-surface-hover" })
							})
						]
					}, `skeleton-${i}`)) : J.length === 0 ? /* @__PURE__ */ D(r, { children: /* @__PURE__ */ D(n, {
						colSpan: V.length - Q.length + +!!$ + +!!h,
						className: "text-center text-text-secondary py-8",
						children: b
					}) }) : J.map((t, i) => {
						let a = Oe && ke(t);
						return /* @__PURE__ */ O(r, {
							clickable: !!p,
							...Oe ? { "aria-selected": a } : {},
							...a ? { "data-selected": "" } : {},
							className: e(F && re, X && he, a ? "bg-primary-bg hover:bg-primary-bg" : A && i % 2 == 1 ? "bg-surface-inset" : void 0, p && "focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"),
							tabIndex: p ? 0 : void 0,
							"aria-rowindex": p ? i + 2 : void 0,
							onClick: p ? (e) => {
								ye(e.target, e.currentTarget) || p(t);
							} : void 0,
							onKeyDown: p ? (e) => {
								e.target === e.currentTarget && (e.key === "Enter" || e.key === " ") && (e.preventDefault(), p(t));
							} : void 0,
							children: [
								V.map((r) => {
									let a = r.render ? r.render(t, i) : String(t[r.key] ?? ""), o = r.truncate ? oe(r, t, a) : "";
									return /* @__PURE__ */ D(n, {
										numeric: r.numeric,
										className: e(R(r.align), r.truncate && ae, F && ie, r.className, X && ge, Z.has(r.key) && He),
										...Ue ? { "data-label": se(r) } : {},
										...r.truncate ? { "data-truncate": "" } : {},
										...o ? { title: o } : {},
										children: r.truncate ? /* @__PURE__ */ D("span", {
											className: "block min-w-0 truncate",
											children: a
										}) : a
									}, r.key);
								}),
								$ && /* @__PURE__ */ D(n, {
									"data-column-more": "",
									className: e("w-px whitespace-nowrap text-right", F && de),
									onClick: (e) => e.stopPropagation(),
									onKeyDown: (e) => e.stopPropagation(),
									children: /* @__PURE__ */ D(ve, {
										count: Q.length,
										rowLabel: ce(V.find((e) => !Z.has(e.key)), t, i) || f(t),
										testId: `datatable-more-${f(t)}`,
										items: Q.map((e) => ({
											label: se(e),
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
			y && y > 0 && G.length > y && /* @__PURE__ */ O("div", {
				className: "flex items-center justify-between text-xs text-text-secondary",
				"data-collection-pager": !0,
				children: [/* @__PURE__ */ O("span", {
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
							onClick: () => Ie(Math.max(0, q - 1)),
							disabled: q === 0,
							"data-testid": "datatable-prev"
						})
					}), /* @__PURE__ */ D(m, {
						content: "Next page",
						children: /* @__PURE__ */ D(c, {
							size: "sm",
							"aria-label": "Next page",
							icon: /* @__PURE__ */ D(d, { dir: "right" }),
							onClick: () => Ie(Math.min(K - 1, q + 1)),
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
export { k as n, A as r, z as t };
