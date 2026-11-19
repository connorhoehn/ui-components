import { f as e, n as t } from "./Button-DwPf_9pb.js";
import { n } from "./Stack-BPtkNzDm.js";
import { a as r, i, n as a, o, r as s, t as c } from "./Table-CkcH-myV.js";
import { t as l } from "./IconButton-BmDqeC-b.js";
import { I as u, dt as d, h as f, m as p } from "./Icons-CNCMF52q.js";
import { t as m } from "./Select-nxx_K9gv.js";
import { t as h } from "./Tooltip-BaCci7O5.js";
import { t as g } from "./InlinePopover-C-Dtxban.js";
import { t as _ } from "./FilterPopover-D_DE8ZnC.js";
import { t as ee } from "./FormField-BwK2AS6I.js";
import { t as te } from "./SearchInput-CF4qs4mx.js";
import { t as v } from "./Toolbar-CAQic0jU.js";
import { t as y } from "./KeyValue-BnfGD3-K.js";
import { isValidElement as b, useCallback as x, useEffect as S, useLayoutEffect as C, useMemo as w, useRef as T, useState as E } from "react";
import { Fragment as D, jsx as O, jsxs as k } from "react/jsx-runtime";
//#region src/components/shared/CollectionToolbar.tsx
function A({ label: e, layout: t = "table", search: n, filters: r = [], filterPanel: i, summary: a, resultCount: o, placement: s = "band", notices: c = [], actions: p = [], onRefresh: y, refreshing: b = !1, selection: x, children: S }) {
	let C = T(null), [w, A] = E(!1), j = r.filter((e) => e.value !== (e.emptyValue ?? ""));
	if (x && x.count > 0) return /* @__PURE__ */ k(v, {
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
				icon: /* @__PURE__ */ O(f, {}),
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
			n && /* @__PURE__ */ O(te, {
				...re,
				collapsible: ne,
				className: ne ? "min-w-0 w-56 max-w-full" : "min-w-0 w-full max-w-64"
			}),
			(r.length > 0 || i) && /* @__PURE__ */ k(_, {
				label: "Filters",
				trigger: "icon",
				placement: "bottom-end",
				activeCount: j.length + (i?.activeCount ?? 0),
				panelLabel: e,
				onClear: () => {
					r.forEach((e) => e.onChange(e.emptyValue ?? "")), i?.onClear?.();
				},
				children: [r.map((e) => /* @__PURE__ */ O(ee, {
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
					icon: /* @__PURE__ */ O(d, {}),
					onClick: y,
					disabled: b
				})
			})
		]
	}), p.map((e) => /* @__PURE__ */ O(h, {
		content: e.label,
		children: /* @__PURE__ */ O(l, {
			"aria-label": e.label,
			icon: e.icon,
			onClick: e.onClick,
			disabled: e.disabled,
			"data-testid": e["data-testid"]
		})
	}, e.id))] }), M = j.length > 0 || ie || c.length > 0 || S != null;
	return /* @__PURE__ */ O(v, {
		"aria-label": e,
		wrap: s === "band",
		variant: "collection",
		bordered: !1,
		"data-collection-layout": t,
		"data-collection-placement": s,
		className: s === "header" ? "min-h-0 px-0 py-0" : t === "cards" ? "px-0" : void 0,
		"data-collection-selection": x ? "idle" : void 0,
		end: ae || p.length ? oe : void 0,
		children: M && /* @__PURE__ */ k(D, { children: [
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
var ne = "[--ui-table-layout:table] @max-[40rem]:block @max-[40rem]:[--ui-table-layout:cards]", re = "@max-[40rem]:sr-only", ie = "@max-[40rem]:block", ae = "@max-[40rem]:block @max-[40rem]:px-3 @max-[40rem]:py-2", oe = "@max-[40rem]:flex @max-[40rem]:h-auto @max-[40rem]:items-baseline @max-[40rem]:justify-between @max-[40rem]:gap-4 @max-[40rem]:whitespace-normal @max-[40rem]:px-0 @max-[40rem]:py-1 @max-[40rem]:text-right @max-[40rem]:before:shrink-0 @max-[40rem]:before:text-left @max-[40rem]:before:text-xs @max-[40rem]:before:font-semibold @max-[40rem]:before:uppercase @max-[40rem]:before:tracking-wide @max-[40rem]:before:text-text-secondary @max-[40rem]:before:content-[attr(data-label)]", M = "normal-case tracking-normal", se = "max-w-0 overflow-hidden whitespace-nowrap @max-[40rem]:max-w-none", ce = "h-auto whitespace-normal break-words align-top [[data-size=sm]_&]:py-2", le = "sticky left-0 z-[1] bg-inherit shadow-[inset_-1px_0_0_var(--color-border)]", ue = "sticky left-0 z-[2] bg-surface-panel shadow-[inset_-1px_0_0_var(--color-border)]", de = "@max-[40rem]:static @max-[40rem]:shadow-none";
function fe(e, t, n = !1) {
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
var pe = "max-w-0 overflow-hidden @max-[40rem]:max-w-none", me = "line-clamp-2 whitespace-normal break-words";
function he(e, t, n) {
	let r = t[e.key];
	return !e.render && r != null && typeof r != "object" ? String(r) : typeof n == "string" || typeof n == "number" ? String(n) : e.getFilterText ? e.getFilterText(t) : N(n).replace(/\s+/g, " ").trim();
}
function ge(e) {
	return e.label ?? (typeof e.header == "string" ? e.header : e.key);
}
function _e(e, t, n) {
	if (!e) return "";
	if (e.getFilterText) return e.getFilterText(t);
	let r = t[e.key];
	return r != null && typeof r != "object" ? String(r) : e.render ? N(e.render(t, n)).replace(/\s+/g, " ").trim() : "";
}
function ve(e) {
	return e.map((e, t) => ({
		key: e.key,
		p: e.priority ?? 1,
		index: t
	})).filter((e) => e.p > 1).sort((e, t) => t.p - e.p || t.index - e.index).map((e) => e.key);
}
var ye = "hidden", be = "hidden @max-[40rem]:flex", xe = "@max-[40rem]:hidden", Se = "block [--ui-table-layout:cards]", Ce = "sr-only", we = "block", Te = "block px-3 py-2", Ee = "flex h-auto max-w-none items-baseline justify-between gap-4 whitespace-normal px-0 py-1 text-right before:shrink-0 before:text-left before:text-xs before:font-semibold before:uppercase before:tracking-wide before:text-text-secondary before:content-[attr(data-label)]";
function De(e, t, n, r, i) {
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
function Oe({ columns: e, onChoose: r, onStack: i }) {
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
		children: [`+${l} ${l === 1 ? "column" : "columns"}`, /* @__PURE__ */ O(p, { dir: "down" })]
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
function ke({ count: e, items: n, rowLabel: r, testId: i, variant: a = "link" }) {
	let [o, s] = E(!1), c = T(null), u = x(() => s(!1), []);
	return /* @__PURE__ */ k(D, { children: [a === "chevron" ? /* @__PURE__ */ O(l, {
		ref: c,
		size: "sm",
		variant: "ghost",
		"aria-expanded": o,
		"aria-haspopup": "dialog",
		"aria-label": `${e} more ${e === 1 ? "value" : "values"} for ${r}`,
		icon: /* @__PURE__ */ O(p, { dir: o ? "up" : "down" }),
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
var Ae = "a[href], button, input, select, textarea, label, summary, [role=\"button\"], [role=\"checkbox\"], [role=\"link\"], [role=\"menuitem\"], [role=\"switch\"], [contenteditable=\"true\"]";
function je(e, t) {
	if (!(e instanceof Element)) return !1;
	let n = e.closest(Ae);
	return !!n && n !== t && t.contains(n);
}
function Me(e, t) {
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
	if (b(e)) {
		let t = e.props?.children;
		return t === void 0 ? "" : N(t);
	}
	return "";
}
var P = /* @__PURE__ */ new Set();
function Ne(e, t, n) {
	if (e.getFilterText) return e.getFilterText(t);
	let r = t[e.key];
	return r != null && typeof r != "object" && typeof r != "function" ? String(r) : e.render ? N(e.render(t, n)) : (process.env.NODE_ENV !== "production" && !P.has(e.key) && (P.add(e.key), console.warn(`[DataTable] Column "${e.key}" is searchable but its value lives in neither a primitive row value nor getFilterText, and it has no render function to fall back on — it will never match a search query. Add getFilterText, add render, or set filterable={false}.`)), String(r ?? ""));
}
function F(e) {
	if (e === "right") return "text-right [&>*]:justify-end";
	if (e === "center") return "text-center [&>*]:justify-center";
}
function I({ rowHeight: t = "fixed", columnGroups: n, stickyFirstColumn: u = !1, data: d, columns: f, keyField: m, onRowClick: g, rowActions: _, rowActionsHeader: ee = "Actions", rowActionsHeaderHidden: te = !1, searchable: v = !1, searchPlaceholder: y = "Search…", pageSize: b, emptyMessage: x = "No records.", loading: D = !1, loadingRows: j = 5, frameless: Ae = !1, size: N, striped: P = !0, narrow: I = !1, "aria-label": Pe, "aria-labelledby": Fe, selectedKey: L, revealSelection: R = !1, isRowSelected: Ie, headerCase: Le = "upper", responsiveColumns: z = !1, hiddenColumnsControl: Re = "row", className: ze, "data-testid": Be, staticRows: Ve }) {
	let B = Le === "sentence", He = L !== void 0 || !!Ie, Ue = (e) => L === void 0 ? !!Ie?.(e) : L !== null && m(e) === L, We = Array.isArray(d) ? d : [], V = Array.isArray(f) ? f : [], [H, Ge] = E(null), [Ke, qe] = E("asc"), [Je, Ye] = E(""), [Xe, Ze] = E(0), Qe = T(null), [U, $e] = E(null), [et, tt] = E(!1), W = w(() => {
		if (!z) return [];
		let e = ve(V);
		return U ? e.filter((e) => e !== U) : e;
	}, [
		z,
		V,
		U
	]), nt = V.map((e) => e.key).join("|"), rt = (e) => {
		H === e ? qe((e) => e === "asc" ? "desc" : "asc") : (Ge(e), qe("asc"));
	}, it = w(() => {
		if (!v || Je.trim() === "") return We;
		let e = Je.trim().toLowerCase();
		return We.filter((t, n) => V.some((r) => r.filterable !== !1 && Ne(r, t, n).toLowerCase().includes(e)));
	}, [
		We,
		V,
		Je,
		v
	]), G = w(() => {
		if (!H) return it;
		let e = V.find((e) => e.key === H);
		if (!e || !e.sortable) return it;
		let t = e.compare ?? ((t, n) => Me(t[e.key], n[e.key])), n = [...it];
		return n.sort((e, n) => Ke === "asc" ? t(e, n) : -t(e, n)), n;
	}, [
		it,
		V,
		H,
		Ke
	]), at = b && b > 0 ? Math.max(1, Math.ceil(G.length / b)) : 1, ot = R && L != null ? G.findIndex((e) => m(e) === L) : -1, K = ot < 0 ? -1 : b && b > 0 ? Math.floor(ot / b) : 0;
	C(() => {
		!D && K >= 0 && Ze(K);
	}, [
		L,
		K,
		D
	]);
	let q = Math.min(Xe, at - 1), st = w(() => {
		if (!b || b <= 0) return G;
		let e = q * b;
		return G.slice(e, e + b);
	}, [
		G,
		b,
		q
	]), ct = w(() => ({
		paged: st,
		columnKeys: nt,
		shownByChoice: U
	}), [
		st,
		nt,
		U
	]), J = De(z, W.length, V.length, Qe, ct), Y = J.stacked || z && et, X = w(() => new Set(Y ? [] : W.slice(0, J.hidden)), [
		W,
		J.hidden,
		Y
	]), lt = Re === "header", ut = (e) => {
		W.length > J.hidden ? $e(e) : tt(!0);
	}, Z = V.filter((e) => X.has(e.key)), dt = I ? be : ye, Q = Z.length > 0, ft = I || Y, pt = t === "content", $ = u && !Y, mt = V.filter((e) => !X.has(e.key)), ht = mt[0]?.key, gt = (t, n = !1) => $ && t === ht ? e(n ? ue : le, I && de) : void 0, _t = (e) => $ && e === ht ? { "data-sticky-column": "" } : {}, vt = V.some((e) => e.group != null), yt = !Y && V.some((e) => e.minWidth != null), bt = (e) => e.width || e.minWidth ? {
		...e.width ? { width: e.width } : {},
		...e.minWidth && !Y ? { minWidth: e.minWidth } : {}
	} : void 0;
	return S(() => {
		let e = Qe.current;
		if (!R || L == null || K < 0 || D || !e) return;
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
		R,
		L,
		K,
		D,
		q,
		I,
		z,
		et
	]), /* @__PURE__ */ k("div", {
		ref: Qe,
		className: e("flex min-w-0 flex-col gap-3", I && "@container", ze),
		"data-testid": Be,
		"data-responsive-columns": z ? "" : void 0,
		"data-hidden-columns": z ? Z.map((e) => e.key).join(" ") : void 0,
		"data-stacked": Y ? "" : void 0,
		"data-reveal-selection": R ? "" : void 0,
		"data-collection-table": "",
		"data-collection-rows": g ? "activatable" : Ve ? "static" : void 0,
		"data-collection-rows-reason": !g && Ve ? Ve : void 0,
		children: [
			v && /* @__PURE__ */ O(A, {
				label: "Table controls",
				search: {
					value: Je,
					onChange: (e) => {
						Ye(e), Ze(0);
					},
					placeholder: y,
					"aria-label": "Search",
					"data-testid": "datatable-search"
				}
			}),
			/* @__PURE__ */ k(c, {
				"data-ui-table-rows": t,
				"data-ui-table-cards": I || Y ? "" : void 0,
				...N ? { size: N } : {},
				"data-sticky-first-column": $ ? "" : void 0,
				"data-min-width-columns": yt ? "" : void 0,
				className: e(!Ae && "border border-border rounded-lg", !Ae && !$ && "overflow-hidden", I && ne, Y && Se),
				...Pe ? { "aria-label": Pe } : {},
				...Fe ? { "aria-labelledby": Fe } : {},
				children: [/* @__PURE__ */ k(s, {
					className: e(I && re, Y && Ce),
					"data-header-case": Le,
					children: [vt && /* @__PURE__ */ k("tr", {
						"data-column-groups": "",
						children: [fe(mt, n, $).map((t, n) => t.group ? /* @__PURE__ */ O(o, {
							colSpan: t.span,
							scope: "colgroup",
							"data-column-group": t.key ?? void 0,
							className: e(B && M, F(t.group.align ?? "center"), !t.first && "border-l border-border", t.first && $ && e(ue, I && de), t.group.className),
							children: t.group.header
						}, `group-${t.key}-${n}`) : /* @__PURE__ */ O(o, {
							colSpan: t.span,
							"aria-hidden": "true",
							"data-column-group": "",
							className: e(t.first && $ && e(ue, I && de))
						}, `group-none-${n}`)), (Q || _) && /* @__PURE__ */ O(o, {
							"aria-hidden": "true",
							colSpan: +!!Q + +!!_
						})]
					}), /* @__PURE__ */ k("tr", { children: [
						V.map((t) => {
							let n = t.sortable && H === t.key;
							return /* @__PURE__ */ O(o, {
								sortable: t.sortable,
								sortDirection: n ? Ke : null,
								style: bt(t),
								...t.minWidth && !Y ? { "data-min-width": t.minWidth } : {},
								numeric: t.numeric,
								className: e(B && M, F(t.align), t.className, X.has(t.key) && ye, gt(t.key, !0)),
								..._t(t.key),
								onClick: t.sortable ? () => rt(t.key) : void 0,
								"data-testid": t.sortable ? `datatable-header-${t.key}` : void 0,
								"data-column": z ? t.key : void 0,
								...X.has(t.key) ? { "data-column-hidden": "" } : {},
								children: t.header
							}, t.key);
						}),
						Q && /* @__PURE__ */ O(o, {
							className: e(B && M, "w-px whitespace-nowrap text-right"),
							"data-testid": "datatable-more-header",
							"data-column-more": "",
							"data-hidden-columns-control": Re,
							children: lt ? /* @__PURE__ */ O(Oe, {
								columns: Z.map((e) => ({
									key: e.key,
									label: ge(e)
								})),
								onChoose: ut,
								onStack: W.length > J.hidden ? void 0 : () => tt(!0)
							}) : "More"
						}),
						_ && /* @__PURE__ */ O(o, {
							className: e(B && M, "text-right"),
							"data-testid": "datatable-actions-header",
							"data-row-actions-header": te ? "hidden" : "visible",
							children: te ? /* @__PURE__ */ O("span", {
								className: "sr-only",
								children: ee
							}) : ee
						})
					] })]
				}), /* @__PURE__ */ O(a, {
					striped: !1,
					className: e(I && ie, Y && we),
					"data-ui-table-striped": P ? "" : void 0,
					children: D ? Array.from({ length: j }).map((t, n) => /* @__PURE__ */ k(i, {
						"data-testid": "datatable-loading-row",
						className: $ ? "bg-surface" : void 0,
						children: [
							V.map((t) => /* @__PURE__ */ O(r, {
								numeric: t.numeric,
								className: e(F(t.align), X.has(t.key) && ye, gt(t.key)),
								children: /* @__PURE__ */ O("div", { className: "h-4 w-3/4 animate-pulse rounded bg-surface-hover" })
							}, t.key)),
							Q && /* @__PURE__ */ O(r, { "data-column-more": "" }),
							_ && /* @__PURE__ */ O(r, {
								className: "text-right",
								children: /* @__PURE__ */ O("div", { className: "ml-auto h-4 w-16 animate-pulse rounded bg-surface-hover" })
							})
						]
					}, `skeleton-${n}`)) : st.length === 0 ? /* @__PURE__ */ O(i, { children: /* @__PURE__ */ O(r, {
						colSpan: V.length - Z.length + +!!Q + +!!_,
						className: "text-center text-text-secondary py-8",
						children: x
					}) }) : st.map((t, n) => {
						let a = He && Ue(t);
						return /* @__PURE__ */ k(i, {
							clickable: !!g,
							...He ? { "aria-selected": a } : {},
							...a ? { "data-selected": "" } : {},
							className: e(I && ae, Y && Te, a ? "bg-primary-bg hover:bg-primary-bg" : P && n % 2 == 1 ? "bg-surface-inset" : $ ? "bg-surface" : void 0, g && "focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"),
							tabIndex: g ? 0 : void 0,
							"aria-rowindex": g ? n + 2 : void 0,
							onClick: g ? (e) => {
								je(e.target, e.currentTarget) || g(t);
							} : void 0,
							onKeyDown: g ? (e) => {
								e.target === e.currentTarget && (e.key === "Enter" || e.key === " ") && (e.preventDefault(), g(t));
							} : void 0,
							children: [
								V.map((i) => {
									let a = i.render ? i.render(t, n) : String(t[i.key] ?? ""), o = i.truncate ? he(i, t, a) : "";
									return /* @__PURE__ */ O(r, {
										numeric: i.numeric,
										className: e(F(i.align), pt && ce, i.truncate && (i.wrap === "two-lines" ? pe : se), I && oe, i.className, Y && Ee, X.has(i.key) && dt, i.hideInCards && I && "@max-[40rem]:hidden!", i.hideInCards && Y && "hidden!", gt(i.key)),
										..._t(i.key),
										...ft ? { "data-label": i.cardLabel?.(t) || ge(i) } : {},
										...i.truncate ? { "data-truncate": i.wrap === "two-lines" ? "two-lines" : "" } : {},
										...o ? { "data-full-text": o } : {},
										children: i.truncate ? /* @__PURE__ */ O(h, {
											content: o,
											disabled: !o,
											onlyWhenTruncated: !0,
											triggerClassName: "block min-w-0",
											"data-testid": "datatable-cell-tooltip",
											children: /* @__PURE__ */ O("span", {
												className: e("block min-w-0", i.wrap === "two-lines" ? me : "truncate"),
												children: a
											})
										}) : a
									}, i.key);
								}),
								Q && /* @__PURE__ */ O(r, {
									"data-column-more": "",
									className: e("w-px whitespace-nowrap text-right", I && xe),
									onClick: (e) => e.stopPropagation(),
									onKeyDown: (e) => e.stopPropagation(),
									children: /* @__PURE__ */ O(ke, {
										count: Z.length,
										rowLabel: _e(V.find((e) => !X.has(e.key)), t, n) || m(t),
										testId: `datatable-more-${m(t)}`,
										variant: lt ? "chevron" : "link",
										items: Z.map((e) => ({
											label: ge(e),
											value: e.render ? e.render(t, n) : String(t[e.key] ?? "")
										}))
									})
								}),
								_ && /* @__PURE__ */ O(r, {
									className: "text-right",
									onClick: (e) => e.stopPropagation(),
									children: /* @__PURE__ */ O("div", {
										className: "flex items-center justify-end gap-2",
										children: _(t)
									})
								})
							]
						}, m(t));
					})
				})]
			}),
			b && b > 0 && G.length > b && /* @__PURE__ */ k("div", {
				className: "flex items-center justify-between text-xs text-text-secondary",
				"data-collection-pager": !0,
				children: [/* @__PURE__ */ k("span", {
					"data-testid": "datatable-page-summary",
					children: [
						"Page ",
						q + 1,
						" of ",
						at,
						" · ",
						G.length,
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
							icon: /* @__PURE__ */ O(p, { dir: "left" }),
							onClick: () => Ze(Math.max(0, q - 1)),
							disabled: q === 0,
							"data-testid": "datatable-prev"
						})
					}), /* @__PURE__ */ O(h, {
						content: "Next page",
						children: /* @__PURE__ */ O(l, {
							size: "sm",
							"aria-label": "Next page",
							icon: /* @__PURE__ */ O(p, { dir: "right" }),
							onClick: () => Ze(Math.min(at - 1, q + 1)),
							disabled: q >= at - 1,
							"data-testid": "datatable-next"
						})
					})]
				})]
			})
		]
	});
}
//#endregion
export { A as n, j as r, I as t };
