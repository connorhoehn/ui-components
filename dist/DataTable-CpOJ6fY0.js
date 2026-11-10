import { d as e, n as t } from "./Button-DQoeE5dN.js";
import { a as n, i as r, n as i, o as a, r as o, t as s } from "./Table-DIDqq2Q1.js";
import { t as c } from "./IconButton-BgM9MvwA.js";
import { I as l, h as u, m as d, ut as f } from "./Icons-CqVFbuiZ.js";
import { t as p } from "./Select-CDxAVVnW.js";
import { t as m } from "./Tooltip-DDF0fs2n.js";
import { t as h } from "./InlinePopover-CM6MewS0.js";
import { a as g, t as _ } from "./Toolbar-CnDq0PwM.js";
import { t as v } from "./FormField-BDZIVA7n.js";
import { t as ee } from "./SearchInput-Dk3D9lhs.js";
import { t as y } from "./KeyValue-Cas8iY09.js";
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
var M = "@max-[40rem]:block", te = "@max-[40rem]:sr-only", ne = "@max-[40rem]:block", re = "@max-[40rem]:block @max-[40rem]:px-3 @max-[40rem]:py-2", ie = "@max-[40rem]:flex @max-[40rem]:h-auto @max-[40rem]:items-baseline @max-[40rem]:justify-between @max-[40rem]:gap-4 @max-[40rem]:whitespace-normal @max-[40rem]:px-0 @max-[40rem]:py-1 @max-[40rem]:text-right @max-[40rem]:before:shrink-0 @max-[40rem]:before:text-left @max-[40rem]:before:text-xs @max-[40rem]:before:font-semibold @max-[40rem]:before:uppercase @max-[40rem]:before:tracking-wide @max-[40rem]:before:text-text-secondary @max-[40rem]:before:content-[attr(data-label)]", N = "normal-case tracking-normal", ae = "max-w-0 overflow-hidden whitespace-nowrap @max-[40rem]:max-w-none", oe = "max-w-0 overflow-hidden @max-[40rem]:max-w-none", se = "line-clamp-2 whitespace-normal break-words";
function ce(e, t, n) {
	let r = t[e.key];
	return !e.render && r != null && typeof r != "object" ? String(r) : typeof n == "string" || typeof n == "number" ? String(n) : e.getFilterText ? e.getFilterText(t) : I(n).replace(/\s+/g, " ").trim();
}
function le(e) {
	return e.label ?? (typeof e.header == "string" ? e.header : e.key);
}
function ue(e, t, n) {
	if (!e) return "";
	if (e.getFilterText) return e.getFilterText(t);
	let r = t[e.key];
	return r != null && typeof r != "object" ? String(r) : e.render ? I(e.render(t, n)).replace(/\s+/g, " ").trim() : "";
}
function de(e) {
	return e.map((e, t) => ({
		key: e.key,
		p: e.priority ?? 1,
		index: t
	})).filter((e) => e.p > 1).sort((e, t) => t.p - e.p || t.index - e.index).map((e) => e.key);
}
var P = "hidden", fe = "hidden @max-[40rem]:flex", pe = "@max-[40rem]:hidden", me = "block", he = "sr-only", ge = "block", _e = "block px-3 py-2", ve = "flex h-auto max-w-none items-baseline justify-between gap-4 whitespace-normal px-0 py-1 text-right before:shrink-0 before:text-left before:text-xs before:font-semibold before:uppercase before:tracking-wide before:text-text-secondary before:content-[attr(data-label)]";
function ye(e, t, n, r, i) {
	let a = Math.min(t, Math.floor(n / 2)), [o, s] = E(0), [c, l] = E(0), u = T(!1), d = T(i);
	if (S(() => {
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
	}, [e, r]), C(() => {
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
function be({ count: e, items: n, rowLabel: r, testId: i }) {
	let [a, o] = E(!1), s = T(null), c = x(() => o(!1), []);
	return /* @__PURE__ */ k(D, { children: [/* @__PURE__ */ O(t, {
		ref: s,
		variant: "ghost",
		size: "sm",
		"aria-expanded": a,
		"aria-haspopup": "dialog",
		onClick: () => o((e) => !e),
		"data-testid": i,
		className: "whitespace-nowrap font-normal text-text-secondary",
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
var F = "a[href], button, input, select, textarea, label, summary, [role=\"button\"], [role=\"checkbox\"], [role=\"link\"], [role=\"menuitem\"], [role=\"switch\"], [contenteditable=\"true\"]";
function xe(e, t) {
	if (!(e instanceof Element)) return !1;
	let n = e.closest(F);
	return !!n && n !== t && t.contains(n);
}
function Se(e, t) {
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
function Ce(e, t, n) {
	if (e.getFilterText) return e.getFilterText(t);
	let r = t[e.key];
	return r != null && typeof r != "object" && typeof r != "function" ? String(r) : e.render ? I(e.render(t, n)) : (process.env.NODE_ENV !== "production" && !L.has(e.key) && (L.add(e.key), console.warn(`[DataTable] Column "${e.key}" is searchable but its value lives in neither a primitive row value nor getFilterText, and it has no render function to fall back on — it will never match a search query. Add getFilterText, add render, or set filterable={false}.`)), String(r ?? ""));
}
function R(e) {
	if (e === "right") return "text-right";
	if (e === "center") return "text-center";
}
function z({ rowHeight: t = "fixed", data: l, columns: u, keyField: f, onRowClick: p, rowActions: h, rowActionsHeader: g = "Actions", rowActionsHeaderHidden: _ = !1, searchable: v = !1, searchPlaceholder: ee = "Search…", pageSize: y, emptyMessage: b = "No records.", loading: x = !1, loadingRows: S = 5, frameless: C = !1, size: D, striped: j = !0, narrow: F = !1, "aria-label": I, "aria-labelledby": L, selectedKey: z, isRowSelected: we, headerCase: Te = "upper", responsiveColumns: B = !1, className: Ee, "data-testid": De, staticRows: V }) {
	let Oe = Te === "sentence", ke = z !== void 0 || !!we, Ae = (e) => z === void 0 ? !!we?.(e) : z !== null && f(e) === z, je = Array.isArray(l) ? l : [], H = Array.isArray(u) ? u : [], [U, Me] = E(null), [Ne, Pe] = E("asc"), [W, Fe] = E(""), [Ie, Le] = E(0), Re = T(null), ze = w(() => B ? de(H) : [], [B, H]), Be = H.map((e) => e.key).join("|"), Ve = (e) => {
		U === e ? Pe((e) => e === "asc" ? "desc" : "asc") : (Me(e), Pe("asc"));
	}, G = w(() => {
		if (!v || W.trim() === "") return je;
		let e = W.trim().toLowerCase();
		return je.filter((t, n) => H.some((r) => r.filterable !== !1 && Ce(r, t, n).toLowerCase().includes(e)));
	}, [
		je,
		H,
		W,
		v
	]), K = w(() => {
		if (!U) return G;
		let e = H.find((e) => e.key === U);
		if (!e || !e.sortable) return G;
		let t = e.compare ?? ((t, n) => Se(t[e.key], n[e.key])), n = [...G];
		return n.sort((e, n) => Ne === "asc" ? t(e, n) : -t(e, n)), n;
	}, [
		G,
		H,
		U,
		Ne
	]), q = y && y > 0 ? Math.max(1, Math.ceil(K.length / y)) : 1, J = Math.min(Ie, q - 1), Y = w(() => {
		if (!y || y <= 0) return K;
		let e = J * y;
		return K.slice(e, e + y);
	}, [
		K,
		y,
		J
	]), He = w(() => ({
		paged: Y,
		columnKeys: Be
	}), [Y, Be]), Ue = ye(B, ze.length, H.length, Re, He), X = Ue.stacked, Z = w(() => new Set(ze.slice(0, Ue.hidden)), [ze, Ue.hidden]), Q = H.filter((e) => Z.has(e.key)), We = F ? fe : P, $ = Q.length > 0, Ge = F || X;
	return /* @__PURE__ */ k("div", {
		ref: Re,
		className: e("flex min-w-0 flex-col gap-3", F && "@container", Ee),
		"data-testid": De,
		"data-responsive-columns": B ? "" : void 0,
		"data-hidden-columns": B ? Q.map((e) => e.key).join(" ") : void 0,
		"data-stacked": X ? "" : void 0,
		"data-collection-table": "",
		"data-collection-rows": p ? "activatable" : V ? "static" : void 0,
		"data-collection-rows-reason": !p && V ? V : void 0,
		children: [
			v && /* @__PURE__ */ O(A, {
				label: "Table controls",
				search: {
					value: W,
					onChange: (e) => {
						Fe(e), Le(0);
					},
					placeholder: ee,
					"aria-label": "Search",
					"data-testid": "datatable-search"
				}
			}),
			/* @__PURE__ */ k(s, {
				"data-ui-table-rows": t,
				...D ? { size: D } : {},
				className: e(!C && "border border-border rounded-lg overflow-hidden", F && M, X && me),
				...I ? { "aria-label": I } : {},
				...L ? { "aria-labelledby": L } : {},
				children: [/* @__PURE__ */ O(o, {
					className: e(F && te, X && he),
					"data-header-case": Te,
					children: /* @__PURE__ */ k("tr", { children: [
						H.map((t) => {
							let n = t.sortable && U === t.key;
							return /* @__PURE__ */ O(a, {
								sortable: t.sortable,
								sortDirection: n ? Ne : null,
								style: t.width ? { width: t.width } : void 0,
								numeric: t.numeric,
								className: e(Oe && N, R(t.align), t.className, Z.has(t.key) && P),
								onClick: t.sortable ? () => Ve(t.key) : void 0,
								"data-testid": t.sortable ? `datatable-header-${t.key}` : void 0,
								"data-column": B ? t.key : void 0,
								...Z.has(t.key) ? { "data-column-hidden": "" } : {},
								children: t.header
							}, t.key);
						}),
						$ && /* @__PURE__ */ O(a, {
							className: e(Oe && N, "w-px whitespace-nowrap text-right"),
							"data-testid": "datatable-more-header",
							"data-column-more": "",
							children: "More"
						}),
						h && /* @__PURE__ */ O(a, {
							className: e(Oe && N, "text-right"),
							"data-testid": "datatable-actions-header",
							"data-row-actions-header": _ ? "hidden" : "visible",
							children: _ ? /* @__PURE__ */ O("span", {
								className: "sr-only",
								children: g
							}) : g
						})
					] })
				}), /* @__PURE__ */ O(i, {
					striped: !1,
					className: e(F && ne, X && ge),
					"data-ui-table-striped": j ? "" : void 0,
					children: x ? Array.from({ length: S }).map((t, i) => /* @__PURE__ */ k(r, {
						"data-testid": "datatable-loading-row",
						children: [
							H.map((t) => /* @__PURE__ */ O(n, {
								numeric: t.numeric,
								className: e(R(t.align), Z.has(t.key) && P),
								children: /* @__PURE__ */ O("div", { className: "h-4 w-3/4 animate-pulse rounded bg-surface-hover" })
							}, t.key)),
							$ && /* @__PURE__ */ O(n, { "data-column-more": "" }),
							h && /* @__PURE__ */ O(n, {
								className: "text-right",
								children: /* @__PURE__ */ O("div", { className: "ml-auto h-4 w-16 animate-pulse rounded bg-surface-hover" })
							})
						]
					}, `skeleton-${i}`)) : Y.length === 0 ? /* @__PURE__ */ O(r, { children: /* @__PURE__ */ O(n, {
						colSpan: H.length - Q.length + +!!$ + +!!h,
						className: "text-center text-text-secondary py-8",
						children: b
					}) }) : Y.map((t, i) => {
						let a = ke && Ae(t);
						return /* @__PURE__ */ k(r, {
							clickable: !!p,
							...ke ? { "aria-selected": a } : {},
							...a ? { "data-selected": "" } : {},
							className: e(F && re, X && _e, a ? "bg-primary-bg hover:bg-primary-bg" : j && i % 2 == 1 ? "bg-surface-inset" : void 0, p && "focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"),
							tabIndex: p ? 0 : void 0,
							"aria-rowindex": p ? i + 2 : void 0,
							onClick: p ? (e) => {
								xe(e.target, e.currentTarget) || p(t);
							} : void 0,
							onKeyDown: p ? (e) => {
								e.target === e.currentTarget && (e.key === "Enter" || e.key === " ") && (e.preventDefault(), p(t));
							} : void 0,
							children: [
								H.map((r) => {
									let a = r.render ? r.render(t, i) : String(t[r.key] ?? ""), o = r.truncate ? ce(r, t, a) : "";
									return /* @__PURE__ */ O(n, {
										numeric: r.numeric,
										className: e(R(r.align), r.truncate && (r.wrap === "two-lines" ? oe : ae), F && ie, r.className, X && ve, Z.has(r.key) && We),
										...Ge ? { "data-label": le(r) } : {},
										...r.truncate ? { "data-truncate": r.wrap === "two-lines" ? "two-lines" : "" } : {},
										...o ? { "data-full-text": o } : {},
										children: r.truncate ? /* @__PURE__ */ O(m, {
											content: o,
											disabled: !o,
											onlyWhenTruncated: !0,
											triggerClassName: "block min-w-0",
											"data-testid": "datatable-cell-tooltip",
											children: /* @__PURE__ */ O("span", {
												className: e("block min-w-0", r.wrap === "two-lines" ? se : "truncate"),
												children: a
											})
										}) : a
									}, r.key);
								}),
								$ && /* @__PURE__ */ O(n, {
									"data-column-more": "",
									className: e("w-px whitespace-nowrap text-right", F && pe),
									onClick: (e) => e.stopPropagation(),
									onKeyDown: (e) => e.stopPropagation(),
									children: /* @__PURE__ */ O(be, {
										count: Q.length,
										rowLabel: ue(H.find((e) => !Z.has(e.key)), t, i) || f(t),
										testId: `datatable-more-${f(t)}`,
										items: Q.map((e) => ({
											label: le(e),
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
			y && y > 0 && K.length > y && /* @__PURE__ */ k("div", {
				className: "flex items-center justify-between text-xs text-text-secondary",
				"data-collection-pager": !0,
				children: [/* @__PURE__ */ k("span", {
					"data-testid": "datatable-page-summary",
					children: [
						"Page ",
						J + 1,
						" of ",
						q,
						" · ",
						K.length,
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
							onClick: () => Le(Math.max(0, J - 1)),
							disabled: J === 0,
							"data-testid": "datatable-prev"
						})
					}), /* @__PURE__ */ O(m, {
						content: "Next page",
						children: /* @__PURE__ */ O(c, {
							size: "sm",
							"aria-label": "Next page",
							icon: /* @__PURE__ */ O(d, { dir: "right" }),
							onClick: () => Le(Math.min(q - 1, J + 1)),
							disabled: J >= q - 1,
							"data-testid": "datatable-next"
						})
					})]
				})]
			})
		]
	});
}
//#endregion
export { A as n, j as r, z as t };
