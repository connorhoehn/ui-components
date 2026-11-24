import { f as e, n as t } from "./Button-DwPf_9pb.js";
import { n } from "./Stack-BPtkNzDm.js";
import { a as r, i, n as a, o, r as s, t as c } from "./Table-9_YsTOuH.js";
import { t as l } from "./IconButton-BmDqeC-b.js";
import { I as u, ft as d, h as f, m as p } from "./Icons-DX0dqgD-.js";
import { t as m } from "./Select-nxx_K9gv.js";
import { t as h } from "./Tooltip-BaCci7O5.js";
import { t as g } from "./InlinePopover-C-Dtxban.js";
import { t as _ } from "./FilterPopover-D_DE8ZnC.js";
import { t as v } from "./FormField-BwK2AS6I.js";
import { t as ee } from "./SearchInput-CPnuBA94.js";
import { t as y } from "./Toolbar-CAQic0jU.js";
import { t as b } from "./KeyValue-BnfGD3-K.js";
import { isValidElement as x, useCallback as S, useEffect as te, useLayoutEffect as ne, useMemo as C, useRef as w, useState as T } from "react";
import { Fragment as E, jsx as D, jsxs as O } from "react/jsx-runtime";
//#region src/components/shared/CollectionToolbar.tsx
function re({ label: e, layout: t = "table", search: n, filters: r = [], filterPanel: i, summary: a, resultCount: o, placement: s = "band", notices: c = [], actions: p = [], onRefresh: b, refreshing: x = !1, selection: S, children: te }) {
	let ne = w(null), [C, re] = T(!1), k = r.filter((e) => e.value !== (e.emptyValue ?? ""));
	if (S && S.count > 0) return /* @__PURE__ */ O(y, {
		"aria-label": `${e}: selection`,
		wrap: !0,
		variant: "collection",
		"data-collection-layout": t,
		className: t === "cards" ? "px-0" : void 0,
		"data-collection-selection": "active",
		end: S.actions,
		children: [/* @__PURE__ */ D(h, {
			content: "Clear selection",
			children: /* @__PURE__ */ D(l, {
				"aria-label": "Clear selection",
				icon: /* @__PURE__ */ D(f, {}),
				onClick: S.onClear
			})
		}), /* @__PURE__ */ D("span", {
			className: "min-w-0 truncate text-xs font-medium text-text-primary",
			role: "status",
			"data-collection-selection-count": !0,
			children: S.label ?? `${S.count} selected`
		})]
	});
	let { collapsible: ie = !0, ...ae } = n ?? {
		value: "",
		onChange: () => {}
	}, oe = a != null && a !== !1 && o !== 0, se = !!(n || r.length > 0 || i || b), ce = /* @__PURE__ */ O(E, { children: [se && /* @__PURE__ */ O("div", {
		className: "flex min-w-0 items-center gap-2",
		"data-collection-query": "",
		children: [
			n && /* @__PURE__ */ D(ee, {
				...ae,
				collapsible: ie,
				className: ie ? "min-w-0 w-56 max-w-full" : "min-w-0 w-full max-w-64"
			}),
			(r.length > 0 || i) && /* @__PURE__ */ O(_, {
				label: "Filters",
				trigger: "icon",
				placement: "bottom-end",
				activeCount: k.length + (i?.activeCount ?? 0),
				panelLabel: e,
				onClear: () => {
					r.forEach((e) => e.onChange(e.emptyValue ?? "")), i?.onClear?.();
				},
				children: [r.map((e) => /* @__PURE__ */ D(v, {
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
			b && /* @__PURE__ */ D(h, {
				content: "Refresh",
				children: /* @__PURE__ */ D(l, {
					"aria-label": "Refresh",
					icon: /* @__PURE__ */ D(d, {}),
					onClick: b,
					disabled: x
				})
			})
		]
	}), p.map((e) => /* @__PURE__ */ D(h, {
		content: e.label,
		children: /* @__PURE__ */ D(l, {
			"aria-label": e.label,
			icon: e.icon,
			onClick: e.onClick,
			disabled: e.disabled,
			"data-testid": e["data-testid"]
		})
	}, e.id))] }), le = k.length > 0 || oe || c.length > 0 || te != null;
	return /* @__PURE__ */ D(y, {
		"aria-label": e,
		wrap: s === "band",
		variant: "collection",
		bordered: !1,
		"data-collection-layout": t,
		"data-collection-placement": s,
		className: s === "header" ? "min-h-0 px-0 py-0" : t === "cards" ? "px-0" : void 0,
		"data-collection-selection": S ? "idle" : void 0,
		end: se || p.length ? ce : void 0,
		children: le && /* @__PURE__ */ O(E, { children: [
			k.length > 0 && /* @__PURE__ */ D("span", {
				className: "min-w-0 truncate text-xs text-text-primary",
				title: k.map((e) => `${e.label}: ${e.options.find((t) => t.value === e.value)?.label ?? e.value}`).join(" · "),
				children: k.map((e) => e.options.find((t) => t.value === e.value)?.label ?? e.value).join(" · ")
			}),
			oe && /* @__PURE__ */ D("span", {
				className: "min-w-0 text-xs text-text-secondary",
				"data-collection-summary": !0,
				children: a
			}),
			c.length > 0 && /* @__PURE__ */ O(E, { children: [/* @__PURE__ */ D(h, {
				content: "About these results",
				children: /* @__PURE__ */ D(l, {
					ref: ne,
					"aria-label": "About these results",
					"aria-haspopup": "dialog",
					"aria-expanded": C,
					icon: /* @__PURE__ */ D(u, {}),
					onClick: () => re(!C)
				})
			}), /* @__PURE__ */ D(g, {
				open: C,
				onClose: () => re(!1),
				trigger: ne,
				"aria-label": "About these results",
				className: "max-w-sm p-3 text-sm text-text-secondary",
				children: /* @__PURE__ */ D("ul", {
					className: "flex flex-col gap-2",
					children: c.map((e, t) => /* @__PURE__ */ D("li", { children: e }, t))
				})
			})] }),
			te
		] })
	});
}
function k(e) {
	return !e.selection && e.children == null;
}
//#endregion
//#region src/components/shared/DataTable.tsx
var ie = "block min-w-0 pl-6", ae = "[--ui-table-layout:table] @max-[40rem]:block @max-[40rem]:[--ui-table-layout:cards]", oe = "@max-[40rem]:sr-only", se = "@max-[40rem]:block", ce = "@max-[40rem]:block @max-[40rem]:px-3 @max-[40rem]:py-2", le = "@max-[40rem]:flex @max-[40rem]:h-auto @max-[40rem]:items-baseline @max-[40rem]:justify-between @max-[40rem]:gap-4 @max-[40rem]:whitespace-normal @max-[40rem]:px-0 @max-[40rem]:py-1 @max-[40rem]:text-right @max-[40rem]:before:shrink-0 @max-[40rem]:before:text-left @max-[40rem]:before:text-xs @max-[40rem]:before:font-semibold @max-[40rem]:before:uppercase @max-[40rem]:before:tracking-wide @max-[40rem]:before:text-text-secondary @max-[40rem]:before:content-[attr(data-label)]", A = "normal-case tracking-normal", ue = "max-w-0 overflow-hidden whitespace-nowrap @max-[40rem]:max-w-none", de = "h-auto whitespace-normal break-words align-top [[data-size=sm]_&]:py-2", fe = "sticky left-0 z-[1] bg-inherit shadow-[inset_-1px_0_0_var(--color-border)]", pe = "sticky left-0 z-[2] bg-surface-panel shadow-[inset_-1px_0_0_var(--color-border)]", me = "@max-[40rem]:static @max-[40rem]:shadow-none";
function he(e, t, n = !1) {
	let r = new Map((t ?? []).map((e) => [e.key, e])), i = [];
	return e.forEach((e, t) => {
		let a = e.group ?? null, o = i[i.length - 1];
		if (o && o.key === a && !(n && t === 1)) {
			o.span += 1;
			return;
		}
		i.push({
			key: a,
			span: 1,
			first: t === 0,
			...a == null ? {} : { group: r.get(a) ?? {
				key: a,
				header: a
			} }
		});
	}), i;
}
var ge = "max-w-0 overflow-hidden @max-[40rem]:max-w-none", _e = "line-clamp-2 whitespace-normal break-words";
function ve(e, t, n) {
	let r = t[e.key];
	return !e.render && r != null && typeof r != "object" ? String(r) : typeof n == "string" || typeof n == "number" ? String(n) : e.getFilterText ? e.getFilterText(t) : j(n).replace(/\s+/g, " ").trim();
}
function ye(e) {
	return e.label ?? (typeof e.header == "string" ? e.header : e.key);
}
function be(e, t, n) {
	if (!e) return "";
	if (e.getFilterText) return e.getFilterText(t);
	let r = t[e.key];
	return r != null && typeof r != "object" ? String(r) : e.render ? j(e.render(t, n)).replace(/\s+/g, " ").trim() : "";
}
function xe(e) {
	return e.map((e, t) => ({
		key: e.key,
		p: e.priority ?? 1,
		index: t
	})).filter((e) => e.p > 1).sort((e, t) => t.p - e.p || t.index - e.index).map((e) => e.key);
}
var Se = "hidden", Ce = "hidden @max-[40rem]:flex", we = "@max-[40rem]:hidden", Te = "block [--ui-table-layout:cards]", Ee = "sr-only", De = "block", Oe = "block px-3 py-2", ke = "flex h-auto max-w-none items-baseline justify-between gap-4 whitespace-normal px-0 py-1 text-right before:shrink-0 before:text-left before:text-xs before:font-semibold before:uppercase before:tracking-wide before:text-text-secondary before:content-[attr(data-label)]";
function Ae(e, t, n, r, i) {
	let a = Math.min(t, Math.floor(n / 2)), [o, s] = T(0), [c, l] = T(0), u = w(!1), d = w(i);
	if (te(() => {
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
	}, [e, r]), ne(() => {
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
function je({ columns: e, onChoose: r, onStack: i }) {
	let [a, o] = T(!1), s = w(null), c = S(() => o(!1), []), l = e.length;
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
		children: [`+${l} ${l === 1 ? "column" : "columns"}`, /* @__PURE__ */ D(p, { dir: "down" })]
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
function Me({ count: e, items: n, rowLabel: r, testId: i, variant: a = "link" }) {
	let [o, s] = T(!1), c = w(null), u = S(() => s(!1), []);
	return /* @__PURE__ */ O(E, { children: [a === "chevron" ? /* @__PURE__ */ D(l, {
		ref: c,
		size: "sm",
		variant: "ghost",
		"aria-expanded": o,
		"aria-haspopup": "dialog",
		"aria-label": `${e} more ${e === 1 ? "value" : "values"} for ${r}`,
		icon: /* @__PURE__ */ D(p, { dir: o ? "up" : "down" }),
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
		children: /* @__PURE__ */ D(b, {
			items: n,
			layout: "row",
			"data-testid": `${i}-values`
		})
	})] });
}
var Ne = "a[href], button, input, select, textarea, label, summary, [role=\"button\"], [role=\"checkbox\"], [role=\"link\"], [role=\"menuitem\"], [role=\"switch\"], [contenteditable=\"true\"]";
function Pe(e, t) {
	if (!(e instanceof Element)) return !1;
	let n = e.closest(Ne);
	return !!n && n !== t && t.contains(n);
}
function Fe(e, t) {
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
function j(e) {
	if (e == null || typeof e == "boolean") return "";
	if (typeof e == "string") return e;
	if (typeof e == "number") return String(e);
	if (Array.isArray(e)) return e.map(j).join(" ");
	if (x(e)) {
		let t = e.props?.children;
		return t === void 0 ? "" : j(t);
	}
	return "";
}
var M = /* @__PURE__ */ new Set();
function Ie(e, t, n) {
	if (e.getFilterText) return e.getFilterText(t);
	let r = t[e.key];
	return r != null && typeof r != "object" && typeof r != "function" ? String(r) : e.render ? j(e.render(t, n)) : (process.env.NODE_ENV !== "production" && !M.has(e.key) && (M.add(e.key), console.warn(`[DataTable] Column "${e.key}" is searchable but its value lives in neither a primitive row value nor getFilterText, and it has no render function to fall back on — it will never match a search query. Add getFilterText, add render, or set filterable={false}.`)), String(r ?? ""));
}
function Le(e) {
	if (e === "right") return "text-right [&>*]:justify-end";
	if (e === "center") return "text-center [&>*]:justify-center";
}
function N({ rowHeight: t = "fixed", columnGroups: n, stickyFirstColumn: u = !1, data: d, columns: f, keyField: m, onRowClick: g, rowActions: _, rowActionsHeader: v = "Actions", rowActionsHeaderHidden: ee = !1, searchable: y = !1, searchPlaceholder: b = "Search…", pageSize: x, emptyMessage: S = "No records.", loading: E = !1, loadingRows: k = 5, frameless: Ne = !1, size: j, striped: M = !0, narrow: N = !1, "aria-label": Re, "aria-labelledby": ze, selectedKey: P, revealSelection: Be = !1, isRowSelected: Ve, headerCase: He = "upper", responsiveColumns: F = !1, hiddenColumnsControl: Ue = "row", className: We, "data-testid": Ge, staticRows: Ke, rowChildren: qe, expandedKeys: Je, onExpandedChange: Ye, defaultExpanded: Xe, childColumns: Ze }) {
	let I = !!qe, [Qe, $e] = T(() => Xe ?? []), L = Je ?? Qe, et = (e) => {
		let t = L.includes(e) ? L.filter((t) => t !== e) : [...L, e];
		Je === void 0 && $e(t), Ye?.(t);
	}, R = He === "sentence", tt = P !== void 0 || !!Ve, nt = (e) => P === void 0 ? !!Ve?.(e) : P !== null && m(e) === P, rt = Array.isArray(d) ? d : [], z = Array.isArray(f) ? f : [], [B, it] = T(null), [at, ot] = T("asc"), [st, ct] = T(""), [lt, ut] = T(0), dt = w(null), [V, ft] = T(null), [pt, mt] = T(!1), H = C(() => {
		if (!F) return [];
		let e = xe(z);
		return V ? e.filter((e) => e !== V) : e;
	}, [
		F,
		z,
		V
	]), ht = z.map((e) => e.key).join("|"), gt = (e) => {
		B === e ? ot((e) => e === "asc" ? "desc" : "asc") : (it(e), ot("asc"));
	}, _t = C(() => {
		if (!y || st.trim() === "") return rt;
		let e = st.trim().toLowerCase();
		return rt.filter((t, n) => z.some((r) => r.filterable !== !1 && Ie(r, t, n).toLowerCase().includes(e)));
	}, [
		rt,
		z,
		st,
		y
	]), U = C(() => {
		if (!B) return _t;
		let e = z.find((e) => e.key === B);
		if (!e || !e.sortable) return _t;
		let t = e.compare ?? ((t, n) => Fe(t[e.key], n[e.key])), n = [..._t];
		return n.sort((e, n) => at === "asc" ? t(e, n) : -t(e, n)), n;
	}, [
		_t,
		z,
		B,
		at
	]), vt = x && x > 0 ? Math.max(1, Math.ceil(U.length / x)) : 1, yt = Be && P != null ? U.findIndex((e) => m(e) === P) : -1, W = yt < 0 ? -1 : x && x > 0 ? Math.floor(yt / x) : 0;
	ne(() => {
		!E && W >= 0 && ut(W);
	}, [
		P,
		W,
		E
	]);
	let G = Math.min(lt, vt - 1), K = C(() => {
		if (!x || x <= 0) return U;
		let e = G * x;
		return U.slice(e, e + x);
	}, [
		U,
		x,
		G
	]), bt = C(() => {
		let e = [];
		return K.forEach((t, n) => {
			let r = qe?.(t), i = Array.isArray(r) && r.length > 0;
			e.push({
				row: t,
				rowIndex: n,
				stripe: e.length,
				...i ? { kids: r } : {}
			}), i && L.includes(m(t)) && r.forEach((n, r) => e.push({
				row: n,
				rowIndex: r,
				stripe: e.length,
				parent: t
			}));
		}), e;
	}, [
		K,
		qe,
		L,
		m
	]), xt = C(() => ({
		paged: K,
		columnKeys: ht,
		shownByChoice: V
	}), [
		K,
		ht,
		V
	]), q = Ae(F, H.length, z.length, dt, xt), J = q.stacked || F && pt, Y = C(() => new Set(J ? [] : H.slice(0, q.hidden)), [
		H,
		q.hidden,
		J
	]), St = Ue === "header", Ct = (e) => {
		H.length > q.hidden ? ft(e) : mt(!0);
	}, X = z.filter((e) => Y.has(e.key)), wt = N ? Ce : Se, Z = X.length > 0, Tt = N || J, Et = t === "content", Q = u && !J, $ = z.filter((e) => !Y.has(e.key)), Dt = $[0]?.key, Ot = (t, n = !1) => Q && t === Dt ? e(n ? pe : fe, N && me) : void 0, kt = (e) => Q && e === Dt ? { "data-sticky-column": "" } : {}, At = z.some((e) => e.group != null), jt = !J && z.some((e) => e.minWidth != null), Mt = (e) => e.width || e.minWidth ? {
		...e.width ? { width: e.width } : {},
		...e.minWidth && !J ? { minWidth: e.minWidth } : {}
	} : void 0;
	return te(() => {
		let e = dt.current;
		if (!Be || P == null || W < 0 || E || !e) return;
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
		Be,
		P,
		W,
		E,
		G,
		N,
		F,
		pt
	]), /* @__PURE__ */ O("div", {
		ref: dt,
		className: e("flex min-w-0 flex-col gap-3", N && "@container", We),
		"data-testid": Ge,
		"data-responsive-columns": F ? "" : void 0,
		"data-hidden-columns": F ? X.map((e) => e.key).join(" ") : void 0,
		"data-stacked": J ? "" : void 0,
		"data-reveal-selection": Be ? "" : void 0,
		"data-collection-table": "",
		"data-collection-rows": g ? "activatable" : Ke ? "static" : void 0,
		"data-collection-rows-reason": !g && Ke ? Ke : void 0,
		children: [
			y && /* @__PURE__ */ D(re, {
				label: "Table controls",
				search: {
					value: st,
					onChange: (e) => {
						ct(e), ut(0);
					},
					placeholder: b,
					"aria-label": "Search",
					"data-testid": "datatable-search"
				}
			}),
			/* @__PURE__ */ O(c, {
				"data-ui-table-rows": t,
				"data-ui-table-cards": N || J ? "" : void 0,
				...j ? { size: j } : {},
				"data-sticky-first-column": Q ? "" : void 0,
				"data-min-width-columns": jt ? "" : void 0,
				className: e(!Ne && "border border-border rounded-lg", !Ne && !Q && "overflow-hidden", N && ae, J && Te),
				...Re ? { "aria-label": Re } : {},
				...ze ? { "aria-labelledby": ze } : {},
				children: [/* @__PURE__ */ O(s, {
					className: e(N && oe, J && Ee),
					"data-header-case": He,
					children: [At && /* @__PURE__ */ O("tr", {
						"data-column-groups": "",
						children: [
							I && /* @__PURE__ */ D(o, {
								"aria-hidden": "true",
								className: e("w-px", R && A)
							}),
							he($, n, Q).map((t, n) => t.group ? /* @__PURE__ */ D(o, {
								colSpan: t.span,
								scope: "colgroup",
								"data-column-group": t.key ?? void 0,
								className: e(R && A, Le(t.group.align ?? "center"), !t.first && "border-l border-border", t.first && Q && e(pe, N && me), t.group.className),
								children: t.group.header
							}, `group-${t.key}-${n}`) : /* @__PURE__ */ D(o, {
								colSpan: t.span,
								"aria-hidden": "true",
								"data-column-group": "",
								className: e(t.first && Q && e(pe, N && me))
							}, `group-none-${n}`)),
							(Z || _) && /* @__PURE__ */ D(o, {
								"aria-hidden": "true",
								colSpan: +!!Z + +!!_
							})
						]
					}), /* @__PURE__ */ O("tr", { children: [
						I && /* @__PURE__ */ D(o, {
							className: e("w-px pr-0", R && A),
							"data-column-expand": "",
							children: /* @__PURE__ */ D("span", {
								className: "sr-only",
								children: "Expand"
							})
						}),
						z.map((t) => {
							let n = t.sortable && B === t.key;
							return /* @__PURE__ */ D(o, {
								sortable: t.sortable,
								sortDirection: n ? at : null,
								style: Mt(t),
								...t.minWidth && !J ? { "data-min-width": t.minWidth } : {},
								numeric: t.numeric,
								className: e(R && A, Le(t.align), t.className, Y.has(t.key) && Se, Ot(t.key, !0)),
								...kt(t.key),
								onClick: t.sortable ? () => gt(t.key) : void 0,
								"data-testid": t.sortable ? `datatable-header-${t.key}` : void 0,
								"data-column": F ? t.key : void 0,
								...Y.has(t.key) ? { "data-column-hidden": "" } : {},
								children: t.header
							}, t.key);
						}),
						Z && /* @__PURE__ */ D(o, {
							className: e(R && A, "w-px whitespace-nowrap text-right"),
							"data-testid": "datatable-more-header",
							"data-column-more": "",
							"data-hidden-columns-control": Ue,
							children: St ? /* @__PURE__ */ D(je, {
								columns: X.map((e) => ({
									key: e.key,
									label: ye(e)
								})),
								onChoose: Ct,
								onStack: H.length > q.hidden ? void 0 : () => mt(!0)
							}) : "More"
						}),
						_ && /* @__PURE__ */ D(o, {
							className: e(R && A, "text-right"),
							"data-testid": "datatable-actions-header",
							"data-row-actions-header": ee ? "hidden" : "visible",
							children: ee ? /* @__PURE__ */ D("span", {
								className: "sr-only",
								children: v
							}) : v
						})
					] })]
				}), /* @__PURE__ */ D(a, {
					striped: !1,
					className: e(N && se, J && De),
					"data-ui-table-striped": M ? "" : void 0,
					children: E ? Array.from({ length: k }).map((t, n) => /* @__PURE__ */ O(i, {
						"data-testid": "datatable-loading-row",
						className: Q ? "bg-surface" : void 0,
						children: [
							I && /* @__PURE__ */ D(r, { className: "w-px pr-0" }),
							z.map((t) => /* @__PURE__ */ D(r, {
								numeric: t.numeric,
								className: e(Le(t.align), Y.has(t.key) && Se, Ot(t.key)),
								children: /* @__PURE__ */ D("div", { className: "h-4 w-3/4 animate-pulse rounded bg-surface-hover" })
							}, t.key)),
							Z && /* @__PURE__ */ D(r, { "data-column-more": "" }),
							_ && /* @__PURE__ */ D(r, {
								className: "text-right",
								children: /* @__PURE__ */ D("div", { className: "ml-auto h-4 w-16 animate-pulse rounded bg-surface-hover" })
							})
						]
					}, `skeleton-${n}`)) : K.length === 0 ? /* @__PURE__ */ D(i, { children: /* @__PURE__ */ D(r, {
						colSpan: z.length - X.length + +!!Z + +!!_ + +!!I,
						className: "text-center text-text-secondary py-8",
						children: S
					}) }) : bt.map(({ row: t, rowIndex: n, stripe: a, parent: o, kids: s }) => {
						let c = tt && nt(t), u = m(t), d = !!s && L.includes(u), f = o ? $[0]?.key : void 0, v = 0;
						return /* @__PURE__ */ O(i, {
							clickable: !!g,
							...I ? {
								"aria-level": o ? 2 : 1,
								"data-row-level": o ? 2 : 1
							} : {},
							...s ? { "aria-expanded": d } : {},
							...tt ? { "aria-selected": c } : {},
							...c ? { "data-selected": "" } : {},
							className: e(N && ce, J && Oe, c ? "bg-primary-bg hover:bg-primary-bg" : M && a % 2 == 1 ? "bg-surface-inset" : Q ? "bg-surface" : void 0, g && "focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"),
							tabIndex: g ? 0 : void 0,
							"aria-rowindex": g ? a + 2 : void 0,
							onClick: g ? (e) => {
								Pe(e.target, e.currentTarget) || g(t);
							} : void 0,
							onKeyDown: g ? (e) => {
								e.target === e.currentTarget && (e.key === "Enter" || e.key === " ") && (e.preventDefault(), g(t));
							} : void 0,
							children: [
								I && /* @__PURE__ */ D(r, {
									className: "w-px pr-0",
									"data-column-expand": "",
									onClick: (e) => e.stopPropagation(),
									children: s && /* @__PURE__ */ D(l, {
										size: "sm",
										variant: "ghost",
										"aria-label": `${d ? "Hide" : "Show"} the rows under ${be($[0], t, n) || u}`,
										"aria-expanded": d,
										icon: /* @__PURE__ */ D(p, { dir: d ? "down" : "right" }),
										onClick: () => et(u),
										"data-testid": `datatable-expand-${u}`
									})
								}),
								z.map((i) => {
									if (v > 0 && !Y.has(i.key)) return --v, null;
									let a = o ? Ze?.[i.key] : void 0, s = a?.colSpan && a.colSpan > 1 && !Y.has(i.key) ? a.colSpan : void 0;
									s && (v = s - 1);
									let c = a?.render && o ? a.render(t, o, n) : i.render ? i.render(t, n) : String(t[i.key] ?? ""), l = i.truncate ? ve(i, t, c) : "", u = i.key === f, d = i.truncate ? /* @__PURE__ */ D(h, {
										content: l,
										disabled: !l,
										onlyWhenTruncated: !0,
										triggerClassName: "block min-w-0",
										"data-testid": "datatable-cell-tooltip",
										children: /* @__PURE__ */ D("span", {
											className: e("block min-w-0", i.wrap === "two-lines" ? _e : "truncate"),
											children: c
										})
									}) : c;
									return /* @__PURE__ */ D(r, {
										colSpan: s,
										numeric: i.numeric,
										className: e(Le(i.align), Et && de, i.truncate && (i.wrap === "two-lines" ? ge : ue), N && le, i.className, J && ke, Y.has(i.key) && wt, i.hideInCards && N && "@max-[40rem]:hidden!", i.hideInCards && J && "hidden!", Ot(i.key)),
										...kt(i.key),
										...Tt ? { "data-label": i.cardLabel?.(t) || ye(i) } : {},
										...i.truncate ? { "data-truncate": i.wrap === "two-lines" ? "two-lines" : "" } : {},
										...l ? { "data-full-text": l } : {},
										children: u ? /* @__PURE__ */ D("span", {
											className: ie,
											"data-row-indent": "",
											children: d
										}) : d
									}, i.key);
								}),
								Z && /* @__PURE__ */ D(r, {
									"data-column-more": "",
									className: e("w-px whitespace-nowrap text-right", N && we),
									onClick: (e) => e.stopPropagation(),
									onKeyDown: (e) => e.stopPropagation(),
									children: /* @__PURE__ */ D(Me, {
										count: X.length,
										rowLabel: be(z.find((e) => !Y.has(e.key)), t, n) || m(t),
										testId: `datatable-more-${m(t)}`,
										variant: St ? "chevron" : "link",
										items: X.map((e) => ({
											label: ye(e),
											value: e.render ? e.render(t, n) : String(t[e.key] ?? "")
										}))
									})
								}),
								_ && /* @__PURE__ */ D(r, {
									className: "text-right",
									onClick: (e) => e.stopPropagation(),
									children: /* @__PURE__ */ D("div", {
										className: "flex items-center justify-end gap-2",
										children: _(t)
									})
								})
							]
						}, u);
					})
				})]
			}),
			x && x > 0 && U.length > x && /* @__PURE__ */ O("div", {
				className: "flex items-center justify-between text-xs text-text-secondary",
				"data-collection-pager": !0,
				children: [/* @__PURE__ */ O("span", {
					"data-testid": "datatable-page-summary",
					children: [
						"Page ",
						G + 1,
						" of ",
						vt,
						" · ",
						U.length,
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
							icon: /* @__PURE__ */ D(p, { dir: "left" }),
							onClick: () => ut(Math.max(0, G - 1)),
							disabled: G === 0,
							"data-testid": "datatable-prev"
						})
					}), /* @__PURE__ */ D(h, {
						content: "Next page",
						children: /* @__PURE__ */ D(l, {
							size: "sm",
							"aria-label": "Next page",
							icon: /* @__PURE__ */ D(p, { dir: "right" }),
							onClick: () => ut(Math.min(vt - 1, G + 1)),
							disabled: G >= vt - 1,
							"data-testid": "datatable-next"
						})
					})]
				})]
			})
		]
	});
}
//#endregion
export { re as n, k as r, N as t };
