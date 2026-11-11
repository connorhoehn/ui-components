import { d as e, n as t } from "./Button-DQoeE5dN.js";
import { n } from "./Stack-CE1FjEn8.js";
import { a as r, i, n as a, o, r as s, t as c } from "./Table-DIDqq2Q1.js";
import { t as l } from "./IconButton-BgM9MvwA.js";
import { I as u, h as d, m as f, ut as p } from "./Icons-CqVFbuiZ.js";
import { t as m } from "./Select-CDxAVVnW.js";
import { t as h } from "./Tooltip-DDF0fs2n.js";
import { t as g } from "./InlinePopover-CEzf8hyR.js";
import { a as ee, t as _ } from "./Toolbar-tUFXj6Bc.js";
import { t as te } from "./FormField-BDZIVA7n.js";
import { t as v } from "./SearchInput-Dk3D9lhs.js";
import { t as y } from "./KeyValue-Cas8iY09.js";
import { isValidElement as ne, useCallback as b, useEffect as x, useLayoutEffect as S, useMemo as C, useRef as w, useState as T } from "react";
import { Fragment as E, jsx as D, jsxs as O } from "react/jsx-runtime";
//#region src/components/shared/CollectionToolbar.tsx
function k({ label: e, layout: t = "table", search: n, filters: r = [], filterPanel: i, summary: a, resultCount: o, placement: s = "band", notices: c = [], actions: f = [], onRefresh: y, refreshing: ne = !1, selection: b, children: x }) {
	let S = w(null), [C, k] = T(!1), A = r.filter((e) => e.value !== (e.emptyValue ?? ""));
	if (b && b.count > 0) return /* @__PURE__ */ O(_, {
		"aria-label": `${e}: selection`,
		wrap: !0,
		variant: "collection",
		"data-collection-layout": t,
		className: t === "cards" ? "px-0" : void 0,
		"data-collection-selection": "active",
		end: b.actions,
		children: [/* @__PURE__ */ D(h, {
			content: "Clear selection",
			children: /* @__PURE__ */ D(l, {
				"aria-label": "Clear selection",
				icon: /* @__PURE__ */ D(d, {}),
				onClick: b.onClear
			})
		}), /* @__PURE__ */ D("span", {
			className: "min-w-0 truncate text-xs font-medium text-text-primary",
			role: "status",
			"data-collection-selection-count": !0,
			children: b.label ?? `${b.count} selected`
		})]
	});
	let { collapsible: re = !0, ...ie } = n ?? {
		value: "",
		onChange: () => {}
	}, j = a != null && a !== !1 && o !== 0, ae = !!(n || r.length > 0 || i || y), oe = /* @__PURE__ */ O(E, { children: [ae && /* @__PURE__ */ O("div", {
		className: "flex min-w-0 items-center gap-2",
		"data-collection-query": "",
		children: [
			n && /* @__PURE__ */ D(v, {
				...ie,
				collapsible: re,
				className: re ? "min-w-0 w-56 max-w-full" : "min-w-0 w-full max-w-64"
			}),
			(r.length > 0 || i) && /* @__PURE__ */ O(ee, {
				label: "Filters",
				trigger: "icon",
				placement: "bottom-end",
				activeCount: A.length + (i?.activeCount ?? 0),
				panelLabel: e,
				onClear: () => {
					r.forEach((e) => e.onChange(e.emptyValue ?? "")), i?.onClear?.();
				},
				children: [r.map((e) => /* @__PURE__ */ D(te, {
					label: e.label,
					children: (t) => /* @__PURE__ */ D(m, {
						...t,
						"aria-label": e.label,
						value: e.value,
						options: e.options,
						onChange: (t) => e.onChange(t.target.value),
						chevron: "custom"
					})
				}, e.id)), i?.content]
			}),
			y && /* @__PURE__ */ D(h, {
				content: "Refresh",
				children: /* @__PURE__ */ D(l, {
					"aria-label": "Refresh",
					icon: /* @__PURE__ */ D(p, {}),
					onClick: y,
					disabled: ne
				})
			})
		]
	}), f.map((e) => /* @__PURE__ */ D(h, {
		content: e.label,
		children: /* @__PURE__ */ D(l, {
			"aria-label": e.label,
			icon: e.icon,
			onClick: e.onClick,
			disabled: e.disabled,
			"data-testid": e["data-testid"]
		})
	}, e.id))] }), M = A.length > 0 || j || c.length > 0 || x != null;
	return /* @__PURE__ */ D(_, {
		"aria-label": e,
		wrap: s === "band",
		variant: "collection",
		bordered: !1,
		"data-collection-layout": t,
		"data-collection-placement": s,
		className: s === "header" ? "min-h-0 px-0 py-0" : t === "cards" ? "px-0" : void 0,
		"data-collection-selection": b ? "idle" : void 0,
		end: ae || f.length ? oe : void 0,
		children: M && /* @__PURE__ */ O(E, { children: [
			A.length > 0 && /* @__PURE__ */ D("span", {
				className: "min-w-0 truncate text-xs text-text-primary",
				title: A.map((e) => `${e.label}: ${e.options.find((t) => t.value === e.value)?.label ?? e.value}`).join(" · "),
				children: A.map((e) => e.options.find((t) => t.value === e.value)?.label ?? e.value).join(" · ")
			}),
			j && /* @__PURE__ */ D("span", {
				className: "min-w-0 text-xs text-text-secondary",
				"data-collection-summary": !0,
				children: a
			}),
			c.length > 0 && /* @__PURE__ */ O(E, { children: [/* @__PURE__ */ D(h, {
				content: "About these results",
				children: /* @__PURE__ */ D(l, {
					ref: S,
					"aria-label": "About these results",
					"aria-haspopup": "dialog",
					"aria-expanded": C,
					icon: /* @__PURE__ */ D(u, {}),
					onClick: () => k(!C)
				})
			}), /* @__PURE__ */ D(g, {
				open: C,
				onClose: () => k(!1),
				trigger: S,
				"aria-label": "About these results",
				className: "max-w-sm p-3 text-sm text-text-secondary",
				children: /* @__PURE__ */ D("ul", {
					className: "flex flex-col gap-2",
					children: c.map((e, t) => /* @__PURE__ */ D("li", { children: e }, t))
				})
			})] }),
			x
		] })
	});
}
function A(e) {
	return !e.selection && e.children == null;
}
//#endregion
//#region src/components/shared/DataTable.tsx
var re = "@max-[40rem]:block", ie = "@max-[40rem]:sr-only", j = "@max-[40rem]:block", ae = "@max-[40rem]:block @max-[40rem]:px-3 @max-[40rem]:py-2", oe = "@max-[40rem]:flex @max-[40rem]:h-auto @max-[40rem]:items-baseline @max-[40rem]:justify-between @max-[40rem]:gap-4 @max-[40rem]:whitespace-normal @max-[40rem]:px-0 @max-[40rem]:py-1 @max-[40rem]:text-right @max-[40rem]:before:shrink-0 @max-[40rem]:before:text-left @max-[40rem]:before:text-xs @max-[40rem]:before:font-semibold @max-[40rem]:before:uppercase @max-[40rem]:before:tracking-wide @max-[40rem]:before:text-text-secondary @max-[40rem]:before:content-[attr(data-label)]", M = "normal-case tracking-normal", se = "max-w-0 overflow-hidden whitespace-nowrap @max-[40rem]:max-w-none", ce = "max-w-0 overflow-hidden @max-[40rem]:max-w-none", le = "line-clamp-2 whitespace-normal break-words";
function ue(e, t, n) {
	let r = t[e.key];
	return !e.render && r != null && typeof r != "object" ? String(r) : typeof n == "string" || typeof n == "number" ? String(n) : e.getFilterText ? e.getFilterText(t) : N(n).replace(/\s+/g, " ").trim();
}
function de(e) {
	return e.label ?? (typeof e.header == "string" ? e.header : e.key);
}
function fe(e, t, n) {
	if (!e) return "";
	if (e.getFilterText) return e.getFilterText(t);
	let r = t[e.key];
	return r != null && typeof r != "object" ? String(r) : e.render ? N(e.render(t, n)).replace(/\s+/g, " ").trim() : "";
}
function pe(e) {
	return e.map((e, t) => ({
		key: e.key,
		p: e.priority ?? 1,
		index: t
	})).filter((e) => e.p > 1).sort((e, t) => t.p - e.p || t.index - e.index).map((e) => e.key);
}
var me = "hidden", he = "hidden @max-[40rem]:flex", ge = "@max-[40rem]:hidden", _e = "block", ve = "sr-only", ye = "block", be = "block px-3 py-2", xe = "flex h-auto max-w-none items-baseline justify-between gap-4 whitespace-normal px-0 py-1 text-right before:shrink-0 before:text-left before:text-xs before:font-semibold before:uppercase before:tracking-wide before:text-text-secondary before:content-[attr(data-label)]";
function Se(e, t, n, r, i) {
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
function Ce({ columns: e, onChoose: r, onStack: i }) {
	let [a, o] = T(!1), s = w(null), c = b(() => o(!1), []), l = e.length;
	return /* @__PURE__ */ O(E, { children: [/* @__PURE__ */ O(t, {
		ref: s,
		variant: "ghost",
		size: "sm",
		"aria-expanded": a,
		"aria-haspopup": "dialog",
		"aria-label": `${l} hidden ${l === 1 ? "column" : "columns"}: choose one to show`,
		onClick: () => o((e) => !e),
		"data-testid": "datatable-more-header-control",
		className: "gap-1 whitespace-nowrap font-normal normal-case tracking-normal text-text-secondary",
		children: [`+${l} ${l === 1 ? "column" : "columns"}`, /* @__PURE__ */ D(f, { dir: "down" })]
	}), /* @__PURE__ */ D(g, {
		trigger: s,
		open: a,
		onClose: c,
		placement: "bottom-end",
		"aria-label": "Hidden columns",
		kind: "datatable-hidden-columns-menu",
		"data-testid": "datatable-more-header-menu",
		className: "max-w-80 p-1",
		children: /* @__PURE__ */ O(n, {
			gap: "none",
			children: [e.map((e) => /* @__PURE__ */ D(t, {
				variant: "ghost",
				size: "sm",
				className: "justify-start font-normal",
				onClick: () => {
					o(!1), r(e.key);
				},
				"data-testid": `datatable-more-header-show-${e.key}`,
				children: `Show ${e.label}`
			}, e.key)), i ? /* @__PURE__ */ D(t, {
				variant: "ghost",
				size: "sm",
				className: "justify-start font-normal",
				onClick: () => {
					o(!1), i();
				},
				"data-testid": "datatable-more-header-stack",
				children: "Show every column as cards"
			}) : null]
		})
	})] });
}
function we({ count: e, items: n, rowLabel: r, testId: i, variant: a = "link" }) {
	let [o, s] = T(!1), c = w(null), u = b(() => s(!1), []);
	return /* @__PURE__ */ O(E, { children: [a === "chevron" ? /* @__PURE__ */ D(l, {
		ref: c,
		size: "sm",
		variant: "ghost",
		"aria-expanded": o,
		"aria-haspopup": "dialog",
		"aria-label": `${e} more ${e === 1 ? "value" : "values"} for ${r}`,
		icon: /* @__PURE__ */ D(f, { dir: o ? "up" : "down" }),
		onClick: () => s((e) => !e),
		"data-testid": i
	}) : /* @__PURE__ */ D(t, {
		ref: c,
		variant: "ghost",
		size: "sm",
		"aria-expanded": o,
		"aria-haspopup": "dialog",
		onClick: () => s((e) => !e),
		"data-testid": i,
		className: "whitespace-nowrap font-normal text-text-secondary",
		children: `+${e} ${e === 1 ? "column" : "columns"}`
	}), /* @__PURE__ */ D(g, {
		trigger: c,
		open: o,
		onClose: u,
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
var Te = "a[href], button, input, select, textarea, label, summary, [role=\"button\"], [role=\"checkbox\"], [role=\"link\"], [role=\"menuitem\"], [role=\"switch\"], [contenteditable=\"true\"]";
function Ee(e, t) {
	if (!(e instanceof Element)) return !1;
	let n = e.closest(Te);
	return !!n && n !== t && t.contains(n);
}
function De(e, t) {
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
function N(e) {
	if (e == null || typeof e == "boolean") return "";
	if (typeof e == "string") return e;
	if (typeof e == "number") return String(e);
	if (Array.isArray(e)) return e.map(N).join(" ");
	if (ne(e)) {
		let t = e.props?.children;
		return t === void 0 ? "" : N(t);
	}
	return "";
}
var P = /* @__PURE__ */ new Set();
function Oe(e, t, n) {
	if (e.getFilterText) return e.getFilterText(t);
	let r = t[e.key];
	return r != null && typeof r != "object" && typeof r != "function" ? String(r) : e.render ? N(e.render(t, n)) : (process.env.NODE_ENV !== "production" && !P.has(e.key) && (P.add(e.key), console.warn(`[DataTable] Column "${e.key}" is searchable but its value lives in neither a primitive row value nor getFilterText, and it has no render function to fall back on — it will never match a search query. Add getFilterText, add render, or set filterable={false}.`)), String(r ?? ""));
}
function ke(e) {
	if (e === "right") return "text-right";
	if (e === "center") return "text-center";
}
function Ae({ rowHeight: t = "fixed", data: n, columns: u, keyField: d, onRowClick: p, rowActions: m, rowActionsHeader: g = "Actions", rowActionsHeaderHidden: ee = !1, searchable: _ = !1, searchPlaceholder: te = "Search…", pageSize: v, emptyMessage: y = "No records.", loading: ne = !1, loadingRows: b = 5, frameless: x = !1, size: S, striped: E = !0, narrow: A = !1, "aria-label": Te, "aria-labelledby": N, selectedKey: P, isRowSelected: Ae, headerCase: je = "upper", responsiveColumns: F = !1, hiddenColumnsControl: Me = "row", className: Ne, "data-testid": Pe, staticRows: I }) {
	let L = je === "sentence", Fe = P !== void 0 || !!Ae, Ie = (e) => P === void 0 ? !!Ae?.(e) : P !== null && d(e) === P, R = Array.isArray(n) ? n : [], z = Array.isArray(u) ? u : [], [B, Le] = T(null), [Re, ze] = T("asc"), [V, Be] = T(""), [Ve, He] = T(0), Ue = w(null), [H, We] = T(null), [Ge, Ke] = T(!1), U = C(() => {
		if (!F) return [];
		let e = pe(z);
		return H && e.includes(H) ? [...e.filter((e) => e !== H), H] : e;
	}, [
		F,
		z,
		H
	]), qe = z.map((e) => e.key).join("|"), Je = (e) => {
		B === e ? ze((e) => e === "asc" ? "desc" : "asc") : (Le(e), ze("asc"));
	}, W = C(() => {
		if (!_ || V.trim() === "") return R;
		let e = V.trim().toLowerCase();
		return R.filter((t, n) => z.some((r) => r.filterable !== !1 && Oe(r, t, n).toLowerCase().includes(e)));
	}, [
		R,
		z,
		V,
		_
	]), G = C(() => {
		if (!B) return W;
		let e = z.find((e) => e.key === B);
		if (!e || !e.sortable) return W;
		let t = e.compare ?? ((t, n) => De(t[e.key], n[e.key])), n = [...W];
		return n.sort((e, n) => Re === "asc" ? t(e, n) : -t(e, n)), n;
	}, [
		W,
		z,
		B,
		Re
	]), K = v && v > 0 ? Math.max(1, Math.ceil(G.length / v)) : 1, q = Math.min(Ve, K - 1), J = C(() => {
		if (!v || v <= 0) return G;
		let e = q * v;
		return G.slice(e, e + v);
	}, [
		G,
		v,
		q
	]), Ye = C(() => ({
		paged: J,
		columnKeys: qe,
		shownByChoice: H
	}), [
		J,
		qe,
		H
	]), Y = Se(F, U.length, z.length, Ue, Ye), X = Y.stacked || F && Ge, Z = C(() => new Set(X ? [] : U.slice(0, Y.hidden)), [
		U,
		Y.hidden,
		X
	]), Xe = Me === "header", Ze = (e) => {
		U.length > Y.hidden ? We(e) : Ke(!0);
	}, Q = z.filter((e) => Z.has(e.key)), Qe = A ? he : me, $ = Q.length > 0, $e = A || X;
	return /* @__PURE__ */ O("div", {
		ref: Ue,
		className: e("flex min-w-0 flex-col gap-3", A && "@container", Ne),
		"data-testid": Pe,
		"data-responsive-columns": F ? "" : void 0,
		"data-hidden-columns": F ? Q.map((e) => e.key).join(" ") : void 0,
		"data-stacked": X ? "" : void 0,
		"data-collection-table": "",
		"data-collection-rows": p ? "activatable" : I ? "static" : void 0,
		"data-collection-rows-reason": !p && I ? I : void 0,
		children: [
			_ && /* @__PURE__ */ D(k, {
				label: "Table controls",
				search: {
					value: V,
					onChange: (e) => {
						Be(e), He(0);
					},
					placeholder: te,
					"aria-label": "Search",
					"data-testid": "datatable-search"
				}
			}),
			/* @__PURE__ */ O(c, {
				"data-ui-table-rows": t,
				...S ? { size: S } : {},
				className: e(!x && "border border-border rounded-lg overflow-hidden", A && re, X && _e),
				...Te ? { "aria-label": Te } : {},
				...N ? { "aria-labelledby": N } : {},
				children: [/* @__PURE__ */ D(s, {
					className: e(A && ie, X && ve),
					"data-header-case": je,
					children: /* @__PURE__ */ O("tr", { children: [
						z.map((t) => {
							let n = t.sortable && B === t.key;
							return /* @__PURE__ */ D(o, {
								sortable: t.sortable,
								sortDirection: n ? Re : null,
								style: t.width ? { width: t.width } : void 0,
								numeric: t.numeric,
								className: e(L && M, ke(t.align), t.className, Z.has(t.key) && me),
								onClick: t.sortable ? () => Je(t.key) : void 0,
								"data-testid": t.sortable ? `datatable-header-${t.key}` : void 0,
								"data-column": F ? t.key : void 0,
								...Z.has(t.key) ? { "data-column-hidden": "" } : {},
								children: t.header
							}, t.key);
						}),
						$ && /* @__PURE__ */ D(o, {
							className: e(L && M, "w-px whitespace-nowrap text-right"),
							"data-testid": "datatable-more-header",
							"data-column-more": "",
							"data-hidden-columns-control": Me,
							children: Xe ? /* @__PURE__ */ D(Ce, {
								columns: Q.map((e) => ({
									key: e.key,
									label: de(e)
								})),
								onChoose: Ze,
								onStack: U.length > Y.hidden ? void 0 : () => Ke(!0)
							}) : "More"
						}),
						m && /* @__PURE__ */ D(o, {
							className: e(L && M, "text-right"),
							"data-testid": "datatable-actions-header",
							"data-row-actions-header": ee ? "hidden" : "visible",
							children: ee ? /* @__PURE__ */ D("span", {
								className: "sr-only",
								children: g
							}) : g
						})
					] })
				}), /* @__PURE__ */ D(a, {
					striped: !1,
					className: e(A && j, X && ye),
					"data-ui-table-striped": E ? "" : void 0,
					children: ne ? Array.from({ length: b }).map((t, n) => /* @__PURE__ */ O(i, {
						"data-testid": "datatable-loading-row",
						children: [
							z.map((t) => /* @__PURE__ */ D(r, {
								numeric: t.numeric,
								className: e(ke(t.align), Z.has(t.key) && me),
								children: /* @__PURE__ */ D("div", { className: "h-4 w-3/4 animate-pulse rounded bg-surface-hover" })
							}, t.key)),
							$ && /* @__PURE__ */ D(r, { "data-column-more": "" }),
							m && /* @__PURE__ */ D(r, {
								className: "text-right",
								children: /* @__PURE__ */ D("div", { className: "ml-auto h-4 w-16 animate-pulse rounded bg-surface-hover" })
							})
						]
					}, `skeleton-${n}`)) : J.length === 0 ? /* @__PURE__ */ D(i, { children: /* @__PURE__ */ D(r, {
						colSpan: z.length - Q.length + +!!$ + +!!m,
						className: "text-center text-text-secondary py-8",
						children: y
					}) }) : J.map((t, n) => {
						let a = Fe && Ie(t);
						return /* @__PURE__ */ O(i, {
							clickable: !!p,
							...Fe ? { "aria-selected": a } : {},
							...a ? { "data-selected": "" } : {},
							className: e(A && ae, X && be, a ? "bg-primary-bg hover:bg-primary-bg" : E && n % 2 == 1 ? "bg-surface-inset" : void 0, p && "focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"),
							tabIndex: p ? 0 : void 0,
							"aria-rowindex": p ? n + 2 : void 0,
							onClick: p ? (e) => {
								Ee(e.target, e.currentTarget) || p(t);
							} : void 0,
							onKeyDown: p ? (e) => {
								e.target === e.currentTarget && (e.key === "Enter" || e.key === " ") && (e.preventDefault(), p(t));
							} : void 0,
							children: [
								z.map((i) => {
									let a = i.render ? i.render(t, n) : String(t[i.key] ?? ""), o = i.truncate ? ue(i, t, a) : "";
									return /* @__PURE__ */ D(r, {
										numeric: i.numeric,
										className: e(ke(i.align), i.truncate && (i.wrap === "two-lines" ? ce : se), A && oe, i.className, X && xe, Z.has(i.key) && Qe),
										...$e ? { "data-label": de(i) } : {},
										...i.truncate ? { "data-truncate": i.wrap === "two-lines" ? "two-lines" : "" } : {},
										...o ? { "data-full-text": o } : {},
										children: i.truncate ? /* @__PURE__ */ D(h, {
											content: o,
											disabled: !o,
											onlyWhenTruncated: !0,
											triggerClassName: "block min-w-0",
											"data-testid": "datatable-cell-tooltip",
											children: /* @__PURE__ */ D("span", {
												className: e("block min-w-0", i.wrap === "two-lines" ? le : "truncate"),
												children: a
											})
										}) : a
									}, i.key);
								}),
								$ && /* @__PURE__ */ D(r, {
									"data-column-more": "",
									className: e("w-px whitespace-nowrap text-right", A && ge),
									onClick: (e) => e.stopPropagation(),
									onKeyDown: (e) => e.stopPropagation(),
									children: /* @__PURE__ */ D(we, {
										count: Q.length,
										rowLabel: fe(z.find((e) => !Z.has(e.key)), t, n) || d(t),
										testId: `datatable-more-${d(t)}`,
										variant: Xe ? "chevron" : "link",
										items: Q.map((e) => ({
											label: de(e),
											value: e.render ? e.render(t, n) : String(t[e.key] ?? "")
										}))
									})
								}),
								m && /* @__PURE__ */ D(r, {
									className: "text-right",
									onClick: (e) => e.stopPropagation(),
									children: /* @__PURE__ */ D("div", {
										className: "flex items-center justify-end gap-2",
										children: m(t)
									})
								})
							]
						}, d(t));
					})
				})]
			}),
			v && v > 0 && G.length > v && /* @__PURE__ */ O("div", {
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
					children: [/* @__PURE__ */ D(h, {
						content: "Previous page",
						children: /* @__PURE__ */ D(l, {
							size: "sm",
							"aria-label": "Previous page",
							icon: /* @__PURE__ */ D(f, { dir: "left" }),
							onClick: () => He(Math.max(0, q - 1)),
							disabled: q === 0,
							"data-testid": "datatable-prev"
						})
					}), /* @__PURE__ */ D(h, {
						content: "Next page",
						children: /* @__PURE__ */ D(l, {
							size: "sm",
							"aria-label": "Next page",
							icon: /* @__PURE__ */ D(f, { dir: "right" }),
							onClick: () => He(Math.min(K - 1, q + 1)),
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
export { k as n, A as r, Ae as t };
