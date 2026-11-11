import { d as e, n as t } from "./Button-DQoeE5dN.js";
import { n } from "./Stack-CE1FjEn8.js";
import { a as r, i, n as a, o, r as s, t as c } from "./Table-DIDqq2Q1.js";
import { t as l } from "./IconButton-BgM9MvwA.js";
import { I as u, h as d, m as f, ut as p } from "./Icons-CqVFbuiZ.js";
import { t as m } from "./Select-CDxAVVnW.js";
import { t as h } from "./Tooltip-DDF0fs2n.js";
import { t as g } from "./InlinePopover-BJntntHW.js";
import { a as ee, t as _ } from "./Toolbar-C04NW-U-.js";
import { t as te } from "./FormField-BDZIVA7n.js";
import { t as v } from "./SearchInput-Dk3D9lhs.js";
import { t as y } from "./KeyValue-Cas8iY09.js";
import { isValidElement as b, useCallback as x, useEffect as S, useLayoutEffect as C, useMemo as w, useRef as T, useState as E } from "react";
import { Fragment as D, jsx as O, jsxs as k } from "react/jsx-runtime";
//#region src/components/shared/CollectionToolbar.tsx
function A({ label: e, layout: t = "table", search: n, filters: r = [], filterPanel: i, summary: a, resultCount: o, placement: s = "band", notices: c = [], actions: f = [], onRefresh: y, refreshing: b = !1, selection: x, children: S }) {
	let C = T(null), [w, A] = E(!1), j = r.filter((e) => e.value !== (e.emptyValue ?? ""));
	if (x && x.count > 0) return /* @__PURE__ */ k(_, {
		"aria-label": `${e}: selection`,
		wrap: !0,
		variant: "collection",
		"data-collection-layout": t,
		className: t === "cards" ? "px-0" : void 0,
		"data-collection-selection": "active",
		end: x.actions,
		children: [/* @__PURE__ */ O(h, {
			content: "Clear selection",
			children: /* @__PURE__ */ O(l, {
				"aria-label": "Clear selection",
				icon: /* @__PURE__ */ O(d, {}),
				onClick: x.onClear
			})
		}), /* @__PURE__ */ O("span", {
			className: "min-w-0 truncate text-xs font-medium text-text-primary",
			role: "status",
			"data-collection-selection-count": !0,
			children: x.label ?? `${x.count} selected`
		})]
	});
	let { collapsible: ne = !0, ...re } = n ?? {
		value: "",
		onChange: () => {}
	}, ie = a != null && a !== !1 && o !== 0, ae = !!(n || r.length > 0 || i || y), oe = /* @__PURE__ */ k(D, { children: [ae && /* @__PURE__ */ k("div", {
		className: "flex min-w-0 items-center gap-2",
		"data-collection-query": "",
		children: [
			n && /* @__PURE__ */ O(v, {
				...re,
				collapsible: ne,
				className: ne ? "min-w-0 w-56 max-w-full" : "min-w-0 w-full max-w-64"
			}),
			(r.length > 0 || i) && /* @__PURE__ */ k(ee, {
				label: "Filters",
				trigger: "icon",
				placement: "bottom-end",
				activeCount: j.length + (i?.activeCount ?? 0),
				panelLabel: e,
				onClear: () => {
					r.forEach((e) => e.onChange(e.emptyValue ?? "")), i?.onClear?.();
				},
				children: [r.map((e) => /* @__PURE__ */ O(te, {
					label: e.label,
					children: (t) => /* @__PURE__ */ O(m, {
						...t,
						"aria-label": e.label,
						value: e.value,
						options: e.options,
						onChange: (t) => e.onChange(t.target.value),
						chevron: "custom"
					})
				}, e.id)), i?.content]
			}),
			y && /* @__PURE__ */ O(h, {
				content: "Refresh",
				children: /* @__PURE__ */ O(l, {
					"aria-label": "Refresh",
					icon: /* @__PURE__ */ O(p, {}),
					onClick: y,
					disabled: b
				})
			})
		]
	}), f.map((e) => /* @__PURE__ */ O(h, {
		content: e.label,
		children: /* @__PURE__ */ O(l, {
			"aria-label": e.label,
			icon: e.icon,
			onClick: e.onClick,
			disabled: e.disabled,
			"data-testid": e["data-testid"]
		})
	}, e.id))] }), se = j.length > 0 || ie || c.length > 0 || S != null;
	return /* @__PURE__ */ O(_, {
		"aria-label": e,
		wrap: s === "band",
		variant: "collection",
		bordered: !1,
		"data-collection-layout": t,
		"data-collection-placement": s,
		className: s === "header" ? "min-h-0 px-0 py-0" : t === "cards" ? "px-0" : void 0,
		"data-collection-selection": x ? "idle" : void 0,
		end: ae || f.length ? oe : void 0,
		children: se && /* @__PURE__ */ k(D, { children: [
			j.length > 0 && /* @__PURE__ */ O("span", {
				className: "min-w-0 truncate text-xs text-text-primary",
				title: j.map((e) => `${e.label}: ${e.options.find((t) => t.value === e.value)?.label ?? e.value}`).join(" · "),
				children: j.map((e) => e.options.find((t) => t.value === e.value)?.label ?? e.value).join(" · ")
			}),
			ie && /* @__PURE__ */ O("span", {
				className: "min-w-0 text-xs text-text-secondary",
				"data-collection-summary": !0,
				children: a
			}),
			c.length > 0 && /* @__PURE__ */ k(D, { children: [/* @__PURE__ */ O(h, {
				content: "About these results",
				children: /* @__PURE__ */ O(l, {
					ref: C,
					"aria-label": "About these results",
					"aria-haspopup": "dialog",
					"aria-expanded": w,
					icon: /* @__PURE__ */ O(u, {}),
					onClick: () => A(!w)
				})
			}), /* @__PURE__ */ O(g, {
				open: w,
				onClose: () => A(!1),
				trigger: C,
				"aria-label": "About these results",
				className: "max-w-sm p-3 text-sm text-text-secondary",
				children: /* @__PURE__ */ O("ul", {
					className: "flex flex-col gap-2",
					children: c.map((e, t) => /* @__PURE__ */ O("li", { children: e }, t))
				})
			})] }),
			S
		] })
	});
}
function j(e) {
	return !e.selection && e.children == null;
}
//#endregion
//#region src/components/shared/DataTable.tsx
var ne = "[--ui-table-layout:table] @max-[40rem]:block @max-[40rem]:[--ui-table-layout:cards]", re = "@max-[40rem]:sr-only", ie = "@max-[40rem]:block", ae = "@max-[40rem]:block @max-[40rem]:px-3 @max-[40rem]:py-2", oe = "@max-[40rem]:flex @max-[40rem]:h-auto @max-[40rem]:items-baseline @max-[40rem]:justify-between @max-[40rem]:gap-4 @max-[40rem]:whitespace-normal @max-[40rem]:px-0 @max-[40rem]:py-1 @max-[40rem]:text-right @max-[40rem]:before:shrink-0 @max-[40rem]:before:text-left @max-[40rem]:before:text-xs @max-[40rem]:before:font-semibold @max-[40rem]:before:uppercase @max-[40rem]:before:tracking-wide @max-[40rem]:before:text-text-secondary @max-[40rem]:before:content-[attr(data-label)]", se = "normal-case tracking-normal", ce = "max-w-0 overflow-hidden whitespace-nowrap @max-[40rem]:max-w-none", le = "max-w-0 overflow-hidden @max-[40rem]:max-w-none", ue = "line-clamp-2 whitespace-normal break-words";
function de(e, t, n) {
	let r = t[e.key];
	return !e.render && r != null && typeof r != "object" ? String(r) : typeof n == "string" || typeof n == "number" ? String(n) : e.getFilterText ? e.getFilterText(t) : M(n).replace(/\s+/g, " ").trim();
}
function fe(e) {
	return e.label ?? (typeof e.header == "string" ? e.header : e.key);
}
function pe(e, t, n) {
	if (!e) return "";
	if (e.getFilterText) return e.getFilterText(t);
	let r = t[e.key];
	return r != null && typeof r != "object" ? String(r) : e.render ? M(e.render(t, n)).replace(/\s+/g, " ").trim() : "";
}
function me(e) {
	return e.map((e, t) => ({
		key: e.key,
		p: e.priority ?? 1,
		index: t
	})).filter((e) => e.p > 1).sort((e, t) => t.p - e.p || t.index - e.index).map((e) => e.key);
}
var he = "hidden", ge = "hidden @max-[40rem]:flex", _e = "@max-[40rem]:hidden", ve = "block [--ui-table-layout:cards]", ye = "sr-only", be = "block", xe = "block px-3 py-2", Se = "flex h-auto max-w-none items-baseline justify-between gap-4 whitespace-normal px-0 py-1 text-right before:shrink-0 before:text-left before:text-xs before:font-semibold before:uppercase before:tracking-wide before:text-text-secondary before:content-[attr(data-label)]";
function Ce(e, t, n, r, i) {
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
function we({ columns: e, onChoose: r, onStack: i }) {
	let [a, o] = E(!1), s = T(null), c = x(() => o(!1), []), l = e.length;
	return /* @__PURE__ */ k(D, { children: [/* @__PURE__ */ k(t, {
		ref: s,
		variant: "ghost",
		size: "sm",
		"aria-expanded": a,
		"aria-haspopup": "dialog",
		"aria-label": `${l} hidden ${l === 1 ? "column" : "columns"}: choose one to show`,
		onClick: () => o((e) => !e),
		"data-testid": "datatable-more-header-control",
		className: "gap-1 whitespace-nowrap font-normal normal-case tracking-normal text-text-secondary",
		children: [`+${l} ${l === 1 ? "column" : "columns"}`, /* @__PURE__ */ O(f, { dir: "down" })]
	}), /* @__PURE__ */ O(g, {
		trigger: s,
		open: a,
		onClose: c,
		placement: "bottom-end",
		"aria-label": "Hidden columns",
		kind: "datatable-hidden-columns-menu",
		"data-testid": "datatable-more-header-menu",
		className: "max-w-80 p-1",
		children: /* @__PURE__ */ k(n, {
			gap: "none",
			children: [e.map((e) => /* @__PURE__ */ O(t, {
				variant: "ghost",
				size: "sm",
				className: "justify-start font-normal",
				onClick: () => {
					o(!1), r(e.key);
				},
				"data-testid": `datatable-more-header-show-${e.key}`,
				children: `Show ${e.label}`
			}, e.key)), i ? /* @__PURE__ */ O(t, {
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
function Te({ count: e, items: n, rowLabel: r, testId: i, variant: a = "link" }) {
	let [o, s] = E(!1), c = T(null), u = x(() => s(!1), []);
	return /* @__PURE__ */ k(D, { children: [a === "chevron" ? /* @__PURE__ */ O(l, {
		ref: c,
		size: "sm",
		variant: "ghost",
		"aria-expanded": o,
		"aria-haspopup": "dialog",
		"aria-label": `${e} more ${e === 1 ? "value" : "values"} for ${r}`,
		icon: /* @__PURE__ */ O(f, { dir: o ? "up" : "down" }),
		onClick: () => s((e) => !e),
		"data-testid": i
	}) : /* @__PURE__ */ O(t, {
		ref: c,
		variant: "ghost",
		size: "sm",
		"aria-expanded": o,
		"aria-haspopup": "dialog",
		onClick: () => s((e) => !e),
		"data-testid": i,
		className: "whitespace-nowrap font-normal text-text-secondary",
		children: `+${e} ${e === 1 ? "column" : "columns"}`
	}), /* @__PURE__ */ O(g, {
		trigger: c,
		open: o,
		onClose: u,
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
var Ee = "a[href], button, input, select, textarea, label, summary, [role=\"button\"], [role=\"checkbox\"], [role=\"link\"], [role=\"menuitem\"], [role=\"switch\"], [contenteditable=\"true\"]";
function De(e, t) {
	if (!(e instanceof Element)) return !1;
	let n = e.closest(Ee);
	return !!n && n !== t && t.contains(n);
}
function Oe(e, t) {
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
function M(e) {
	if (e == null || typeof e == "boolean") return "";
	if (typeof e == "string") return e;
	if (typeof e == "number") return String(e);
	if (Array.isArray(e)) return e.map(M).join(" ");
	if (b(e)) {
		let t = e.props?.children;
		return t === void 0 ? "" : M(t);
	}
	return "";
}
var N = /* @__PURE__ */ new Set();
function ke(e, t, n) {
	if (e.getFilterText) return e.getFilterText(t);
	let r = t[e.key];
	return r != null && typeof r != "object" && typeof r != "function" ? String(r) : e.render ? M(e.render(t, n)) : (process.env.NODE_ENV !== "production" && !N.has(e.key) && (N.add(e.key), console.warn(`[DataTable] Column "${e.key}" is searchable but its value lives in neither a primitive row value nor getFilterText, and it has no render function to fall back on — it will never match a search query. Add getFilterText, add render, or set filterable={false}.`)), String(r ?? ""));
}
function Ae(e) {
	if (e === "right") return "text-right";
	if (e === "center") return "text-center";
}
function je({ rowHeight: t = "fixed", data: n, columns: u, keyField: d, onRowClick: p, rowActions: m, rowActionsHeader: g = "Actions", rowActionsHeaderHidden: ee = !1, searchable: _ = !1, searchPlaceholder: te = "Search…", pageSize: v, emptyMessage: y = "No records.", loading: b = !1, loadingRows: x = 5, frameless: D = !1, size: j, striped: Ee = !0, narrow: M = !1, "aria-label": N, "aria-labelledby": je, selectedKey: P, revealSelection: F = !1, isRowSelected: Me, headerCase: Ne = "upper", responsiveColumns: I = !1, hiddenColumnsControl: Pe = "row", className: Fe, "data-testid": Ie, staticRows: Le }) {
	let Re = Ne === "sentence", ze = P !== void 0 || !!Me, Be = (e) => P === void 0 ? !!Me?.(e) : P !== null && d(e) === P, Ve = Array.isArray(n) ? n : [], L = Array.isArray(u) ? u : [], [R, He] = E(null), [Ue, We] = E("asc"), [z, Ge] = E(""), [Ke, B] = E(0), qe = T(null), [V, Je] = E(null), [Ye, Xe] = E(!1), H = w(() => {
		if (!I) return [];
		let e = me(L);
		return V ? e.filter((e) => e !== V) : e;
	}, [
		I,
		L,
		V
	]), Ze = L.map((e) => e.key).join("|"), Qe = (e) => {
		R === e ? We((e) => e === "asc" ? "desc" : "asc") : (He(e), We("asc"));
	}, U = w(() => {
		if (!_ || z.trim() === "") return Ve;
		let e = z.trim().toLowerCase();
		return Ve.filter((t, n) => L.some((r) => r.filterable !== !1 && ke(r, t, n).toLowerCase().includes(e)));
	}, [
		Ve,
		L,
		z,
		_
	]), W = w(() => {
		if (!R) return U;
		let e = L.find((e) => e.key === R);
		if (!e || !e.sortable) return U;
		let t = e.compare ?? ((t, n) => Oe(t[e.key], n[e.key])), n = [...U];
		return n.sort((e, n) => Ue === "asc" ? t(e, n) : -t(e, n)), n;
	}, [
		U,
		L,
		R,
		Ue
	]), G = v && v > 0 ? Math.max(1, Math.ceil(W.length / v)) : 1, $e = F && P != null ? W.findIndex((e) => d(e) === P) : -1, K = $e < 0 ? -1 : v && v > 0 ? Math.floor($e / v) : 0;
	C(() => {
		!b && K >= 0 && B(K);
	}, [
		P,
		K,
		b
	]);
	let q = Math.min(Ke, G - 1), J = w(() => {
		if (!v || v <= 0) return W;
		let e = q * v;
		return W.slice(e, e + v);
	}, [
		W,
		v,
		q
	]), et = w(() => ({
		paged: J,
		columnKeys: Ze,
		shownByChoice: V
	}), [
		J,
		Ze,
		V
	]), Y = Ce(I, H.length, L.length, qe, et), X = Y.stacked || I && Ye, Z = w(() => new Set(X ? [] : H.slice(0, Y.hidden)), [
		H,
		Y.hidden,
		X
	]), tt = Pe === "header", nt = (e) => {
		H.length > Y.hidden ? Je(e) : Xe(!0);
	}, Q = L.filter((e) => Z.has(e.key)), rt = M ? ge : he, $ = Q.length > 0, it = M || X;
	return S(() => {
		let e = qe.current;
		if (!F || P == null || K < 0 || b || !e) return;
		let t = !0, n = 0, r = () => {
			t && (cancelAnimationFrame(n), n = requestAnimationFrame(() => {
				n = requestAnimationFrame(() => {
					t && e.querySelector("tbody > tr[data-selected]")?.scrollIntoView({
						block: "nearest",
						inline: "nearest",
						behavior: "auto"
					});
				});
			}));
		};
		r();
		let i = e.clientWidth, a = typeof ResizeObserver > "u" ? null : new ResizeObserver(() => {
			let t = e.clientWidth;
			t !== i && (i = t, r());
		});
		return a?.observe(e), document.fonts?.ready && document.fonts.ready.then(r, () => void 0), () => {
			t = !1, a?.disconnect(), cancelAnimationFrame(n);
		};
	}, [
		F,
		P,
		K,
		b,
		q,
		M,
		I,
		Ye
	]), /* @__PURE__ */ k("div", {
		ref: qe,
		className: e("flex min-w-0 flex-col gap-3", M && "@container", Fe),
		"data-testid": Ie,
		"data-responsive-columns": I ? "" : void 0,
		"data-hidden-columns": I ? Q.map((e) => e.key).join(" ") : void 0,
		"data-stacked": X ? "" : void 0,
		"data-reveal-selection": F ? "" : void 0,
		"data-collection-table": "",
		"data-collection-rows": p ? "activatable" : Le ? "static" : void 0,
		"data-collection-rows-reason": !p && Le ? Le : void 0,
		children: [
			_ && /* @__PURE__ */ O(A, {
				label: "Table controls",
				search: {
					value: z,
					onChange: (e) => {
						Ge(e), B(0);
					},
					placeholder: te,
					"aria-label": "Search",
					"data-testid": "datatable-search"
				}
			}),
			/* @__PURE__ */ k(c, {
				"data-ui-table-rows": t,
				"data-ui-table-cards": M || X ? "" : void 0,
				...j ? { size: j } : {},
				className: e(!D && "border border-border rounded-lg overflow-hidden", M && ne, X && ve),
				...N ? { "aria-label": N } : {},
				...je ? { "aria-labelledby": je } : {},
				children: [/* @__PURE__ */ O(s, {
					className: e(M && re, X && ye),
					"data-header-case": Ne,
					children: /* @__PURE__ */ k("tr", { children: [
						L.map((t) => {
							let n = t.sortable && R === t.key;
							return /* @__PURE__ */ O(o, {
								sortable: t.sortable,
								sortDirection: n ? Ue : null,
								style: t.width ? { width: t.width } : void 0,
								numeric: t.numeric,
								className: e(Re && se, Ae(t.align), t.className, Z.has(t.key) && he),
								onClick: t.sortable ? () => Qe(t.key) : void 0,
								"data-testid": t.sortable ? `datatable-header-${t.key}` : void 0,
								"data-column": I ? t.key : void 0,
								...Z.has(t.key) ? { "data-column-hidden": "" } : {},
								children: t.header
							}, t.key);
						}),
						$ && /* @__PURE__ */ O(o, {
							className: e(Re && se, "w-px whitespace-nowrap text-right"),
							"data-testid": "datatable-more-header",
							"data-column-more": "",
							"data-hidden-columns-control": Pe,
							children: tt ? /* @__PURE__ */ O(we, {
								columns: Q.map((e) => ({
									key: e.key,
									label: fe(e)
								})),
								onChoose: nt,
								onStack: H.length > Y.hidden ? void 0 : () => Xe(!0)
							}) : "More"
						}),
						m && /* @__PURE__ */ O(o, {
							className: e(Re && se, "text-right"),
							"data-testid": "datatable-actions-header",
							"data-row-actions-header": ee ? "hidden" : "visible",
							children: ee ? /* @__PURE__ */ O("span", {
								className: "sr-only",
								children: g
							}) : g
						})
					] })
				}), /* @__PURE__ */ O(a, {
					striped: !1,
					className: e(M && ie, X && be),
					"data-ui-table-striped": Ee ? "" : void 0,
					children: b ? Array.from({ length: x }).map((t, n) => /* @__PURE__ */ k(i, {
						"data-testid": "datatable-loading-row",
						children: [
							L.map((t) => /* @__PURE__ */ O(r, {
								numeric: t.numeric,
								className: e(Ae(t.align), Z.has(t.key) && he),
								children: /* @__PURE__ */ O("div", { className: "h-4 w-3/4 animate-pulse rounded bg-surface-hover" })
							}, t.key)),
							$ && /* @__PURE__ */ O(r, { "data-column-more": "" }),
							m && /* @__PURE__ */ O(r, {
								className: "text-right",
								children: /* @__PURE__ */ O("div", { className: "ml-auto h-4 w-16 animate-pulse rounded bg-surface-hover" })
							})
						]
					}, `skeleton-${n}`)) : J.length === 0 ? /* @__PURE__ */ O(i, { children: /* @__PURE__ */ O(r, {
						colSpan: L.length - Q.length + +!!$ + +!!m,
						className: "text-center text-text-secondary py-8",
						children: y
					}) }) : J.map((t, n) => {
						let a = ze && Be(t);
						return /* @__PURE__ */ k(i, {
							clickable: !!p,
							...ze ? { "aria-selected": a } : {},
							...a ? { "data-selected": "" } : {},
							className: e(M && ae, X && xe, a ? "bg-primary-bg hover:bg-primary-bg" : Ee && n % 2 == 1 ? "bg-surface-inset" : void 0, p && "focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"),
							tabIndex: p ? 0 : void 0,
							"aria-rowindex": p ? n + 2 : void 0,
							onClick: p ? (e) => {
								De(e.target, e.currentTarget) || p(t);
							} : void 0,
							onKeyDown: p ? (e) => {
								e.target === e.currentTarget && (e.key === "Enter" || e.key === " ") && (e.preventDefault(), p(t));
							} : void 0,
							children: [
								L.map((i) => {
									let a = i.render ? i.render(t, n) : String(t[i.key] ?? ""), o = i.truncate ? de(i, t, a) : "";
									return /* @__PURE__ */ O(r, {
										numeric: i.numeric,
										className: e(Ae(i.align), i.truncate && (i.wrap === "two-lines" ? le : ce), M && oe, i.className, X && Se, Z.has(i.key) && rt),
										...it ? { "data-label": fe(i) } : {},
										...i.truncate ? { "data-truncate": i.wrap === "two-lines" ? "two-lines" : "" } : {},
										...o ? { "data-full-text": o } : {},
										children: i.truncate ? /* @__PURE__ */ O(h, {
											content: o,
											disabled: !o,
											onlyWhenTruncated: !0,
											triggerClassName: "block min-w-0",
											"data-testid": "datatable-cell-tooltip",
											children: /* @__PURE__ */ O("span", {
												className: e("block min-w-0", i.wrap === "two-lines" ? ue : "truncate"),
												children: a
											})
										}) : a
									}, i.key);
								}),
								$ && /* @__PURE__ */ O(r, {
									"data-column-more": "",
									className: e("w-px whitespace-nowrap text-right", M && _e),
									onClick: (e) => e.stopPropagation(),
									onKeyDown: (e) => e.stopPropagation(),
									children: /* @__PURE__ */ O(Te, {
										count: Q.length,
										rowLabel: pe(L.find((e) => !Z.has(e.key)), t, n) || d(t),
										testId: `datatable-more-${d(t)}`,
										variant: tt ? "chevron" : "link",
										items: Q.map((e) => ({
											label: fe(e),
											value: e.render ? e.render(t, n) : String(t[e.key] ?? "")
										}))
									})
								}),
								m && /* @__PURE__ */ O(r, {
									className: "text-right",
									onClick: (e) => e.stopPropagation(),
									children: /* @__PURE__ */ O("div", {
										className: "flex items-center justify-end gap-2",
										children: m(t)
									})
								})
							]
						}, d(t));
					})
				})]
			}),
			v && v > 0 && W.length > v && /* @__PURE__ */ k("div", {
				className: "flex items-center justify-between text-xs text-text-secondary",
				"data-collection-pager": !0,
				children: [/* @__PURE__ */ k("span", {
					"data-testid": "datatable-page-summary",
					children: [
						"Page ",
						q + 1,
						" of ",
						G,
						" · ",
						W.length,
						" total"
					]
				}), /* @__PURE__ */ k("div", {
					className: "flex gap-1",
					role: "group",
					"aria-label": "Pagination",
					children: [/* @__PURE__ */ O(h, {
						content: "Previous page",
						children: /* @__PURE__ */ O(l, {
							size: "sm",
							"aria-label": "Previous page",
							icon: /* @__PURE__ */ O(f, { dir: "left" }),
							onClick: () => B(Math.max(0, q - 1)),
							disabled: q === 0,
							"data-testid": "datatable-prev"
						})
					}), /* @__PURE__ */ O(h, {
						content: "Next page",
						children: /* @__PURE__ */ O(l, {
							size: "sm",
							"aria-label": "Next page",
							icon: /* @__PURE__ */ O(f, { dir: "right" }),
							onClick: () => B(Math.min(G - 1, q + 1)),
							disabled: q >= G - 1,
							"data-testid": "datatable-next"
						})
					})]
				})]
			})
		]
	});
}
//#endregion
export { A as n, j as r, je as t };
