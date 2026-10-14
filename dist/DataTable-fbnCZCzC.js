import { t as e } from "./cn-D4QmbyEy.js";
import { a as t, i as n, n as r, o as i, r as a, t as o } from "./Table-zDkkvs-k.js";
import { t as s } from "./IconButton-IE5g44md.js";
import { I as c, h as l, m as u, st as d } from "./Icons-B_xESAH3.js";
import { t as f } from "./Select-BKKYeBOc.js";
import { t as p } from "./Tooltip-DWyAb81m.js";
import { t as m } from "./InlinePopover-BZsW3pcE.js";
import { a as h, t as g } from "./Toolbar-CaH6fiwi.js";
import { t as _ } from "./FormField-CQ27qxWt.js";
import { t as v } from "./SearchInput-HK4TcIG4.js";
import { isValidElement as y, useMemo as b, useRef as x, useState as S } from "react";
import { Fragment as C, jsx as w, jsxs as T } from "react/jsx-runtime";
//#region src/components/shared/CollectionToolbar.tsx
function E({ label: e, search: t, filters: n = [], summary: r, notices: i = [], actions: a = [], onRefresh: o, refreshing: u = !1, selection: y, children: b }) {
	let E = x(null), [D, O] = S(!1), k = n.filter((e) => e.value !== (e.emptyValue ?? ""));
	return y && y.count > 0 ? /* @__PURE__ */ T(g, {
		"aria-label": `${e}: selection`,
		wrap: !0,
		variant: "collection",
		"data-collection-selection": "active",
		end: y.actions,
		children: [/* @__PURE__ */ w(p, {
			content: "Clear selection",
			children: /* @__PURE__ */ w(s, {
				"aria-label": "Clear selection",
				icon: /* @__PURE__ */ w(l, {}),
				onClick: y.onClear
			})
		}), /* @__PURE__ */ w("span", {
			className: "min-w-0 truncate text-xs font-medium text-text-primary",
			role: "status",
			"data-collection-selection-count": !0,
			children: y.label ?? `${y.count} selected`
		})]
	}) : /* @__PURE__ */ T(g, {
		"aria-label": e,
		wrap: !0,
		variant: "collection",
		"data-collection-selection": y ? "idle" : void 0,
		end: /* @__PURE__ */ T(C, { children: [a.map((e) => /* @__PURE__ */ w(p, {
			content: e.label,
			children: /* @__PURE__ */ w(s, {
				"aria-label": e.label,
				icon: e.icon,
				onClick: e.onClick,
				disabled: e.disabled,
				"data-testid": e["data-testid"]
			})
		}, e.id)), o && /* @__PURE__ */ w(p, {
			content: "Refresh",
			children: /* @__PURE__ */ w(s, {
				"aria-label": "Refresh",
				icon: /* @__PURE__ */ w(d, {}),
				onClick: o,
				disabled: u
			})
		})] }),
		children: [
			t && /* @__PURE__ */ w(v, {
				...t,
				className: "min-w-0 w-full max-w-64"
			}),
			n.length > 0 && /* @__PURE__ */ w(h, {
				label: "Filters",
				trigger: "icon",
				activeCount: k.length,
				panelLabel: e,
				onClear: () => n.forEach((e) => e.onChange(e.emptyValue ?? "")),
				children: n.map((e) => /* @__PURE__ */ w(_, {
					label: e.label,
					children: (t) => /* @__PURE__ */ w(f, {
						...t,
						"aria-label": e.label,
						value: e.value,
						options: e.options,
						onChange: (t) => e.onChange(t.target.value),
						chevron: "custom"
					})
				}, e.id))
			}),
			k.length > 0 && /* @__PURE__ */ w("span", {
				className: "min-w-0 truncate text-xs text-text-primary",
				title: k.map((e) => `${e.label}: ${e.options.find((t) => t.value === e.value)?.label ?? e.value}`).join(" · "),
				children: k.map((e) => e.options.find((t) => t.value === e.value)?.label ?? e.value).join(" · ")
			}),
			r && /* @__PURE__ */ w("span", {
				className: "min-w-0 text-xs text-text-secondary",
				"data-collection-summary": !0,
				children: r
			}),
			i.length > 0 && /* @__PURE__ */ T(C, { children: [/* @__PURE__ */ w(p, {
				content: "About these results",
				children: /* @__PURE__ */ w(s, {
					ref: E,
					"aria-label": "About these results",
					"aria-haspopup": "dialog",
					"aria-expanded": D,
					icon: /* @__PURE__ */ w(c, {}),
					onClick: () => O(!D)
				})
			}), /* @__PURE__ */ w(m, {
				open: D,
				onClose: () => O(!1),
				trigger: E,
				"aria-label": "About these results",
				className: "max-w-sm p-3 text-sm text-text-secondary",
				children: /* @__PURE__ */ w("ul", {
					className: "flex flex-col gap-2",
					children: i.map((e, t) => /* @__PURE__ */ w("li", { children: e }, t))
				})
			})] }),
			b
		]
	});
}
//#endregion
//#region src/components/shared/DataTable.tsx
var D = "a[href], button, input, select, textarea, label, summary, [role=\"button\"], [role=\"checkbox\"], [role=\"link\"], [role=\"menuitem\"], [role=\"switch\"], [contenteditable=\"true\"]";
function O(e, t) {
	if (!(e instanceof Element)) return !1;
	let n = e.closest(D);
	return !!n && n !== t && t.contains(n);
}
function k(e, t) {
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
function A(e) {
	if (e == null || typeof e == "boolean") return "";
	if (typeof e == "string") return e;
	if (typeof e == "number") return String(e);
	if (Array.isArray(e)) return e.map(A).join(" ");
	if (y(e)) {
		let t = e.props?.children;
		return t === void 0 ? "" : A(t);
	}
	return "";
}
var j = /* @__PURE__ */ new Set();
function M(e, t, n) {
	if (e.getFilterText) return e.getFilterText(t);
	let r = t[e.key];
	return r != null && typeof r != "object" && typeof r != "function" ? String(r) : e.render ? A(e.render(t, n)) : (process.env.NODE_ENV !== "production" && !j.has(e.key) && (j.add(e.key), console.warn(`[DataTable] Column "${e.key}" is searchable but its value lives in neither a primitive row value nor getFilterText, and it has no render function to fall back on — it will never match a search query. Add getFilterText, add render, or set filterable={false}.`)), String(r ?? ""));
}
function N(e) {
	if (e === "right") return "text-right";
	if (e === "center") return "text-center";
}
function P({ data: c, columns: l, keyField: d, onRowClick: f, rowActions: m, searchable: h = !1, searchPlaceholder: g = "Search…", pageSize: _, emptyMessage: v = "No records.", loading: y = !1, loadingRows: x = 5, frameless: C = !1, size: D, striped: A = !1, className: j, "data-testid": P, staticRows: F }) {
	let I = Array.isArray(c) ? c : [], L = Array.isArray(l) ? l : [], [R, z] = S(null), [B, V] = S("asc"), [H, U] = S(""), [W, G] = S(0), K = (e) => {
		R === e ? V((e) => e === "asc" ? "desc" : "asc") : (z(e), V("asc"));
	}, q = b(() => {
		if (!h || H.trim() === "") return I;
		let e = H.trim().toLowerCase();
		return I.filter((t, n) => L.some((r) => r.filterable !== !1 && M(r, t, n).toLowerCase().includes(e)));
	}, [
		I,
		L,
		H,
		h
	]), J = b(() => {
		if (!R) return q;
		let e = L.find((e) => e.key === R);
		if (!e || !e.sortable) return q;
		let t = e.compare ?? ((t, n) => k(t[e.key], n[e.key])), n = [...q];
		return n.sort((e, n) => B === "asc" ? t(e, n) : -t(e, n)), n;
	}, [
		q,
		L,
		R,
		B
	]), Y = _ && _ > 0 ? Math.max(1, Math.ceil(J.length / _)) : 1, X = Math.min(W, Y - 1), Z = b(() => {
		if (!_ || _ <= 0) return J;
		let e = X * _;
		return J.slice(e, e + _);
	}, [
		J,
		_,
		X
	]);
	return /* @__PURE__ */ T("div", {
		className: e("flex min-w-0 flex-col gap-3", j),
		"data-testid": P,
		"data-collection-table": "",
		"data-collection-rows": f ? "activatable" : F ? "static" : void 0,
		"data-collection-rows-reason": !f && F ? F : void 0,
		children: [
			h && /* @__PURE__ */ w(E, {
				label: "Table controls",
				search: {
					value: H,
					onChange: (e) => {
						U(e), G(0);
					},
					placeholder: g,
					"aria-label": "Search",
					"data-testid": "datatable-search"
				}
			}),
			/* @__PURE__ */ w("div", {
				className: "w-full max-w-full overflow-x-auto",
				children: /* @__PURE__ */ T(o, {
					...D ? { size: D } : {},
					className: C ? void 0 : "border border-border rounded-lg overflow-hidden",
					children: [/* @__PURE__ */ w(a, { children: /* @__PURE__ */ T("tr", { children: [L.map((t) => {
						let n = t.sortable && R === t.key;
						return /* @__PURE__ */ w(i, {
							sortable: t.sortable,
							sortDirection: n ? B : null,
							style: t.width ? { width: t.width } : void 0,
							numeric: t.numeric,
							className: e(N(t.align), t.className),
							onClick: t.sortable ? () => K(t.key) : void 0,
							"data-testid": t.sortable ? `datatable-header-${t.key}` : void 0,
							children: t.header
						}, t.key);
					}), m && /* @__PURE__ */ w(i, {
						className: "text-right",
						children: "Actions"
					})] }) }), /* @__PURE__ */ w(r, { children: y ? Array.from({ length: x }).map((e, r) => /* @__PURE__ */ T(n, {
						"data-testid": "datatable-loading-row",
						children: [L.map((e) => /* @__PURE__ */ w(t, {
							numeric: e.numeric,
							className: N(e.align),
							children: /* @__PURE__ */ w("div", { className: "h-4 w-3/4 animate-pulse rounded bg-surface-hover" })
						}, e.key)), m && /* @__PURE__ */ w(t, {
							className: "text-right",
							children: /* @__PURE__ */ w("div", { className: "ml-auto h-4 w-16 animate-pulse rounded bg-surface-hover" })
						})]
					}, `skeleton-${r}`)) : Z.length === 0 ? /* @__PURE__ */ w(n, { children: /* @__PURE__ */ w(t, {
						colSpan: L.length + +!!m,
						className: "text-center text-text-secondary py-8",
						children: v
					}) }) : Z.map((r, i) => /* @__PURE__ */ T(n, {
						clickable: !!f,
						className: e(A && i % 2 == 1 ? "bg-surface-inset" : void 0, f && "focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"),
						tabIndex: f ? 0 : void 0,
						"aria-rowindex": f ? i + 2 : void 0,
						onClick: f ? (e) => {
							O(e.target, e.currentTarget) || f(r);
						} : void 0,
						onKeyDown: f ? (e) => {
							e.target === e.currentTarget && (e.key === "Enter" || e.key === " ") && (e.preventDefault(), f(r));
						} : void 0,
						children: [L.map((n) => /* @__PURE__ */ w(t, {
							numeric: n.numeric,
							className: e(N(n.align), n.className),
							children: n.render ? n.render(r, i) : String(r[n.key] ?? "")
						}, n.key)), m && /* @__PURE__ */ w(t, {
							className: "text-right",
							onClick: (e) => e.stopPropagation(),
							children: /* @__PURE__ */ w("div", {
								className: "flex items-center justify-end gap-2",
								children: m(r)
							})
						})]
					}, d(r))) })]
				})
			}),
			_ && _ > 0 && J.length > _ && /* @__PURE__ */ T("div", {
				className: "flex items-center justify-between text-xs text-text-secondary",
				children: [/* @__PURE__ */ T("span", {
					"data-testid": "datatable-page-summary",
					children: [
						"Page ",
						X + 1,
						" of ",
						Y,
						" · ",
						J.length,
						" total"
					]
				}), /* @__PURE__ */ T("div", {
					className: "flex gap-1",
					role: "group",
					"aria-label": "Pagination",
					children: [/* @__PURE__ */ w(p, {
						content: "Previous page",
						children: /* @__PURE__ */ w(s, {
							size: "sm",
							"aria-label": "Previous page",
							icon: /* @__PURE__ */ w(u, { dir: "left" }),
							onClick: () => G(Math.max(0, X - 1)),
							disabled: X === 0,
							"data-testid": "datatable-prev"
						})
					}), /* @__PURE__ */ w(p, {
						content: "Next page",
						children: /* @__PURE__ */ w(s, {
							size: "sm",
							"aria-label": "Next page",
							icon: /* @__PURE__ */ w(u, { dir: "right" }),
							onClick: () => G(Math.min(Y - 1, X + 1)),
							disabled: X >= Y - 1,
							"data-testid": "datatable-next"
						})
					})]
				})]
			})
		]
	});
}
//#endregion
export { E as n, P as t };
