import { t as e } from "./cn-D4QmbyEy.js";
import { a as t, i as n, n as r, o as i, r as a, t as o } from "./Table-zDkkvs-k.js";
import { t as s } from "./IconButton-IE5g44md.js";
import { I as c, m as l, st as u } from "./Icons-B_xESAH3.js";
import { t as d } from "./Select-DcKBWGgP.js";
import { t as f } from "./Tooltip-DWyAb81m.js";
import { t as p } from "./InlinePopover-Cc7F7MZm.js";
import { a as m, t as h } from "./Toolbar-B1OGpLSU.js";
import { t as g } from "./FormField-BQhFpmZJ.js";
import { t as _ } from "./SearchInput-HK4TcIG4.js";
import { isValidElement as v, useMemo as y, useRef as b, useState as x } from "react";
import { Fragment as S, jsx as C, jsxs as w } from "react/jsx-runtime";
//#region src/components/shared/CollectionToolbar.tsx
function T({ label: e, search: t, filters: n = [], summary: r, notices: i = [], actions: a = [], onRefresh: o, refreshing: l = !1, children: v }) {
	let y = b(null), [T, E] = x(!1), D = n.filter((e) => e.value !== (e.emptyValue ?? ""));
	return /* @__PURE__ */ w(h, {
		"aria-label": e,
		wrap: !0,
		variant: "collection",
		end: /* @__PURE__ */ w(S, { children: [a.map((e) => /* @__PURE__ */ C(f, {
			content: e.label,
			children: /* @__PURE__ */ C(s, {
				"aria-label": e.label,
				icon: e.icon,
				onClick: e.onClick,
				disabled: e.disabled,
				"data-testid": e["data-testid"]
			})
		}, e.id)), o && /* @__PURE__ */ C(f, {
			content: "Refresh",
			children: /* @__PURE__ */ C(s, {
				"aria-label": "Refresh",
				icon: /* @__PURE__ */ C(u, {}),
				onClick: o,
				disabled: l
			})
		})] }),
		children: [
			t && /* @__PURE__ */ C(_, {
				...t,
				className: "min-w-0 w-full max-w-64"
			}),
			n.length > 0 && /* @__PURE__ */ C(m, {
				label: "Filters",
				trigger: "icon",
				activeCount: D.length,
				panelLabel: e,
				onClear: () => n.forEach((e) => e.onChange(e.emptyValue ?? "")),
				children: n.map((e) => /* @__PURE__ */ C(g, {
					label: e.label,
					children: (t) => /* @__PURE__ */ C(d, {
						...t,
						"aria-label": e.label,
						value: e.value,
						options: e.options,
						onChange: (t) => e.onChange(t.target.value),
						chevron: "custom"
					})
				}, e.id))
			}),
			D.length > 0 && /* @__PURE__ */ C("span", {
				className: "min-w-0 truncate text-xs text-text-primary",
				title: D.map((e) => `${e.label}: ${e.options.find((t) => t.value === e.value)?.label ?? e.value}`).join(" · "),
				children: D.map((e) => e.options.find((t) => t.value === e.value)?.label ?? e.value).join(" · ")
			}),
			r && /* @__PURE__ */ C("span", {
				className: "min-w-0 text-xs text-text-secondary",
				"data-collection-summary": !0,
				children: r
			}),
			i.length > 0 && /* @__PURE__ */ w(S, { children: [/* @__PURE__ */ C(f, {
				content: "About these results",
				children: /* @__PURE__ */ C(s, {
					ref: y,
					"aria-label": "About these results",
					"aria-haspopup": "dialog",
					"aria-expanded": T,
					icon: /* @__PURE__ */ C(c, {}),
					onClick: () => E(!T)
				})
			}), /* @__PURE__ */ C(p, {
				open: T,
				onClose: () => E(!1),
				trigger: y,
				"aria-label": "About these results",
				className: "max-w-sm p-3 text-sm text-text-secondary",
				children: /* @__PURE__ */ C("ul", {
					className: "flex flex-col gap-2",
					children: i.map((e, t) => /* @__PURE__ */ C("li", { children: e }, t))
				})
			})] }),
			v
		]
	});
}
//#endregion
//#region src/components/shared/DataTable.tsx
function E(e, t) {
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
function D(e) {
	if (e == null || typeof e == "boolean") return "";
	if (typeof e == "string") return e;
	if (typeof e == "number") return String(e);
	if (Array.isArray(e)) return e.map(D).join(" ");
	if (v(e)) {
		let t = e.props?.children;
		return t === void 0 ? "" : D(t);
	}
	return "";
}
var O = /* @__PURE__ */ new Set();
function k(e, t, n) {
	if (e.getFilterText) return e.getFilterText(t);
	let r = t[e.key];
	return r != null && typeof r != "object" && typeof r != "function" ? String(r) : e.render ? D(e.render(t, n)) : (process.env.NODE_ENV !== "production" && !O.has(e.key) && (O.add(e.key), console.warn(`[DataTable] Column "${e.key}" is searchable but its value lives in neither a primitive row value nor getFilterText, and it has no render function to fall back on — it will never match a search query. Add getFilterText, add render, or set filterable={false}.`)), String(r ?? ""));
}
function A(e) {
	if (e === "right") return "text-right";
	if (e === "center") return "text-center";
}
function j({ data: c, columns: u, keyField: d, onRowClick: p, rowActions: m, searchable: h = !1, searchPlaceholder: g = "Search…", pageSize: _, emptyMessage: v = "No records.", loading: b = !1, loadingRows: S = 5, frameless: D = !1, size: O, striped: j = !1, className: M, "data-testid": N }) {
	let P = Array.isArray(c) ? c : [], F = Array.isArray(u) ? u : [], [I, L] = x(null), [R, z] = x("asc"), [B, V] = x(""), [H, U] = x(0), W = (e) => {
		I === e ? z((e) => e === "asc" ? "desc" : "asc") : (L(e), z("asc"));
	}, G = y(() => {
		if (!h || B.trim() === "") return P;
		let e = B.trim().toLowerCase();
		return P.filter((t, n) => F.some((r) => r.filterable !== !1 && k(r, t, n).toLowerCase().includes(e)));
	}, [
		P,
		F,
		B,
		h
	]), K = y(() => {
		if (!I) return G;
		let e = F.find((e) => e.key === I);
		if (!e || !e.sortable) return G;
		let t = e.compare ?? ((t, n) => E(t[e.key], n[e.key])), n = [...G];
		return n.sort((e, n) => R === "asc" ? t(e, n) : -t(e, n)), n;
	}, [
		G,
		F,
		I,
		R
	]), q = _ && _ > 0 ? Math.max(1, Math.ceil(K.length / _)) : 1, J = Math.min(H, q - 1), Y = y(() => {
		if (!_ || _ <= 0) return K;
		let e = J * _;
		return K.slice(e, e + _);
	}, [
		K,
		_,
		J
	]);
	return /* @__PURE__ */ w("div", {
		className: e("flex min-w-0 flex-col gap-3", M),
		"data-testid": N,
		children: [
			h && /* @__PURE__ */ C(T, {
				label: "Table controls",
				search: {
					value: B,
					onChange: (e) => {
						V(e), U(0);
					},
					placeholder: g,
					"aria-label": "Search",
					"data-testid": "datatable-search"
				}
			}),
			/* @__PURE__ */ C("div", {
				className: "w-full max-w-full overflow-x-auto",
				children: /* @__PURE__ */ w(o, {
					...O ? { size: O } : {},
					className: D ? void 0 : "border border-border rounded-lg overflow-hidden",
					children: [/* @__PURE__ */ C(a, { children: /* @__PURE__ */ w("tr", { children: [F.map((t) => {
						let n = t.sortable && I === t.key;
						return /* @__PURE__ */ C(i, {
							sortable: t.sortable,
							sortDirection: n ? R : null,
							style: t.width ? { width: t.width } : void 0,
							numeric: t.numeric,
							className: e(A(t.align), t.className),
							onClick: t.sortable ? () => W(t.key) : void 0,
							"data-testid": t.sortable ? `datatable-header-${t.key}` : void 0,
							children: t.header
						}, t.key);
					}), m && /* @__PURE__ */ C(i, {
						className: "text-right",
						children: "Actions"
					})] }) }), /* @__PURE__ */ C(r, { children: b ? Array.from({ length: S }).map((e, r) => /* @__PURE__ */ w(n, {
						"data-testid": "datatable-loading-row",
						children: [F.map((e) => /* @__PURE__ */ C(t, {
							numeric: e.numeric,
							className: A(e.align),
							children: /* @__PURE__ */ C("div", { className: "h-4 w-3/4 animate-pulse rounded bg-surface-hover" })
						}, e.key)), m && /* @__PURE__ */ C(t, {
							className: "text-right",
							children: /* @__PURE__ */ C("div", { className: "ml-auto h-4 w-16 animate-pulse rounded bg-surface-hover" })
						})]
					}, `skeleton-${r}`)) : Y.length === 0 ? /* @__PURE__ */ C(n, { children: /* @__PURE__ */ C(t, {
						colSpan: F.length + +!!m,
						className: "text-center text-text-secondary py-8",
						children: v
					}) }) : Y.map((r, i) => /* @__PURE__ */ w(n, {
						clickable: !!p,
						className: e(j && i % 2 == 1 ? "bg-surface-inset" : void 0, p && "focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"),
						tabIndex: p ? 0 : void 0,
						"aria-rowindex": p ? i + 2 : void 0,
						onClick: p ? () => p(r) : void 0,
						onKeyDown: p ? (e) => {
							(e.key === "Enter" || e.key === " ") && (e.preventDefault(), p(r));
						} : void 0,
						children: [F.map((n) => /* @__PURE__ */ C(t, {
							numeric: n.numeric,
							className: e(A(n.align), n.className),
							children: n.render ? n.render(r, i) : String(r[n.key] ?? "")
						}, n.key)), m && /* @__PURE__ */ C(t, {
							className: "text-right",
							onClick: (e) => e.stopPropagation(),
							children: /* @__PURE__ */ C("div", {
								className: "flex items-center justify-end gap-2",
								children: m(r)
							})
						})]
					}, d(r))) })]
				})
			}),
			_ && _ > 0 && K.length > _ && /* @__PURE__ */ w("div", {
				className: "flex items-center justify-between text-xs text-text-secondary",
				children: [/* @__PURE__ */ w("span", {
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
				}), /* @__PURE__ */ w("div", {
					className: "flex gap-1",
					role: "group",
					"aria-label": "Pagination",
					children: [/* @__PURE__ */ C(f, {
						content: "Previous page",
						children: /* @__PURE__ */ C(s, {
							size: "sm",
							"aria-label": "Previous page",
							icon: /* @__PURE__ */ C(l, { dir: "left" }),
							onClick: () => U(Math.max(0, J - 1)),
							disabled: J === 0,
							"data-testid": "datatable-prev"
						})
					}), /* @__PURE__ */ C(f, {
						content: "Next page",
						children: /* @__PURE__ */ C(s, {
							size: "sm",
							"aria-label": "Next page",
							icon: /* @__PURE__ */ C(l, { dir: "right" }),
							onClick: () => U(Math.min(q - 1, J + 1)),
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
export { T as n, j as t };
