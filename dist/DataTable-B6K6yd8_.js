import { t as e } from "./cn-DhjIN-s0.js";
import { useMemo as t, useState as n } from "react";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
//#region src/components/ui/Table.tsx
function a({ children: t, className: n, ...i }) {
	return /* @__PURE__ */ r("table", {
		className: e("w-full text-sm", n),
		...i,
		children: t
	});
}
function o({ children: t, className: n, ...i }) {
	return /* @__PURE__ */ r("thead", {
		className: e("border-b border-border bg-surface-panel", n),
		...i,
		children: t
	});
}
function s({ children: t, className: n, ...i }) {
	return /* @__PURE__ */ r("tbody", {
		className: e("", n),
		...i,
		children: t
	});
}
function c({ children: t, clickable: n, className: i, ...a }) {
	return /* @__PURE__ */ r("tr", {
		className: e("border-b border-border-subtle last:border-b-0 transition-colors", n && "cursor-pointer hover:bg-surface-panel", i),
		...a,
		children: t
	});
}
function l({ children: t, sortable: n, sortDirection: a, className: o, ...s }) {
	return /* @__PURE__ */ i("th", {
		className: e("text-left px-4 py-2.5 text-neutral font-semibold text-[11px] uppercase tracking-wide select-none", n && "cursor-pointer hover:text-text-primary transition-colors", o),
		...s,
		children: [t, n && a && /* @__PURE__ */ r("span", {
			className: "ml-1 text-text-tertiary",
			children: a === "asc" ? "↑" : "↓"
		})]
	});
}
function u({ children: t, className: n, ...i }) {
	return /* @__PURE__ */ r("td", {
		className: e("px-4 py-3 text-sm text-text-primary align-middle", n),
		...i,
		children: t
	});
}
//#endregion
//#region src/components/ui/PageSection.tsx
function d({ title: t, description: n, actions: a, children: o, className: s }) {
	return /* @__PURE__ */ i("section", {
		className: e("flex flex-col gap-6", s),
		children: [/* @__PURE__ */ i("div", {
			className: "flex items-start justify-between gap-4",
			children: [/* @__PURE__ */ i("div", { children: [/* @__PURE__ */ r("h1", {
				className: "text-xl font-semibold text-text-primary m-0",
				children: t
			}), n && /* @__PURE__ */ r("p", {
				className: "text-sm text-neutral mt-1 mb-0",
				children: n
			})] }), a && /* @__PURE__ */ r("div", {
				className: "flex items-center gap-2 shrink-0",
				children: a
			})]
		}), o]
	});
}
//#endregion
//#region src/components/shared/DataTable.tsx
function f(e, t) {
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
function p(e) {
	if (e === "right") return "text-right";
	if (e === "center") return "text-center";
}
function m({ data: d, columns: m, keyField: h, onRowClick: g, rowActions: _, searchable: v = !1, searchPlaceholder: y = "Search…", pageSize: b, emptyMessage: x = "No records.", loading: S = !1, loadingRows: C = 5, frameless: w = !1, striped: T = !1, className: E, "data-testid": D }) {
	let O = Array.isArray(d) ? d : [], k = Array.isArray(m) ? m : [], [A, j] = n(null), [M, N] = n("asc"), [P, F] = n(""), [I, L] = n(0), R = (e) => {
		A === e ? N((e) => e === "asc" ? "desc" : "asc") : (j(e), N("asc"));
	}, z = t(() => {
		if (!v || P.trim() === "") return O;
		let e = P.trim().toLowerCase();
		return O.filter((t) => k.some((n) => n.filterable !== !1 && (n.getFilterText ? n.getFilterText(t) : String(t[n.key] ?? "")).toLowerCase().includes(e)));
	}, [
		O,
		k,
		P,
		v
	]), B = t(() => {
		if (!A) return z;
		let e = k.find((e) => e.key === A);
		if (!e || !e.sortable) return z;
		let t = e.compare ?? ((t, n) => f(t[e.key], n[e.key])), n = [...z];
		return n.sort((e, n) => M === "asc" ? t(e, n) : -t(e, n)), n;
	}, [
		z,
		k,
		A,
		M
	]), V = b && b > 0 ? Math.max(1, Math.ceil(B.length / b)) : 1, H = Math.min(I, V - 1), U = t(() => {
		if (!b || b <= 0) return B;
		let e = H * b;
		return B.slice(e, e + b);
	}, [
		B,
		b,
		H
	]);
	return /* @__PURE__ */ i("div", {
		className: e("flex flex-col gap-3", E),
		"data-testid": D,
		children: [
			v && /* @__PURE__ */ r("input", {
				type: "text",
				value: P,
				onChange: (e) => {
					F(e.target.value), L(0);
				},
				placeholder: y,
				"aria-label": "Search",
				"data-testid": "datatable-search",
				className: "w-full max-w-xs rounded-md border border-border-field bg-surface px-3 py-1.5 text-sm text-text-primary placeholder:text-text-tertiary focus:border-primary focus:outline-none"
			}),
			/* @__PURE__ */ r("div", {
				className: "w-full max-w-full overflow-x-auto",
				children: /* @__PURE__ */ i(a, {
					className: w ? void 0 : "border border-border rounded-lg overflow-hidden",
					children: [/* @__PURE__ */ r(o, { children: /* @__PURE__ */ i("tr", { children: [k.map((t) => {
						let n = t.sortable && A === t.key;
						return /* @__PURE__ */ r(l, {
							sortable: t.sortable,
							sortDirection: n ? M : null,
							style: t.width ? { width: t.width } : void 0,
							className: e(p(t.align), t.className),
							onClick: t.sortable ? () => R(t.key) : void 0,
							"data-testid": t.sortable ? `datatable-header-${t.key}` : void 0,
							children: t.header
						}, t.key);
					}), _ && /* @__PURE__ */ r(l, {
						className: "text-right",
						children: "Actions"
					})] }) }), /* @__PURE__ */ r(s, { children: S ? Array.from({ length: C }).map((e, t) => /* @__PURE__ */ i(c, {
						"data-testid": "datatable-loading-row",
						children: [k.map((e) => /* @__PURE__ */ r(u, {
							className: p(e.align),
							children: /* @__PURE__ */ r("div", { className: "h-4 w-3/4 animate-pulse rounded bg-surface-hover" })
						}, e.key)), _ && /* @__PURE__ */ r(u, {
							className: "text-right",
							children: /* @__PURE__ */ r("div", { className: "ml-auto h-4 w-16 animate-pulse rounded bg-surface-hover" })
						})]
					}, `skeleton-${t}`)) : U.length === 0 ? /* @__PURE__ */ r(c, { children: /* @__PURE__ */ r(u, {
						colSpan: k.length + +!!_,
						className: "text-center text-text-secondary py-8",
						children: x
					}) }) : U.map((t, n) => /* @__PURE__ */ i(c, {
						clickable: !!g,
						className: T && n % 2 == 1 ? "bg-surface-inset" : void 0,
						onClick: g ? () => g(t) : void 0,
						children: [k.map((i) => /* @__PURE__ */ r(u, {
							className: e(p(i.align), i.className),
							children: i.render ? i.render(t, n) : String(t[i.key] ?? "")
						}, i.key)), _ && /* @__PURE__ */ r(u, {
							className: "text-right",
							onClick: (e) => e.stopPropagation(),
							children: /* @__PURE__ */ r("div", {
								className: "flex items-center justify-end gap-2",
								children: _(t)
							})
						})]
					}, h(t))) })]
				})
			}),
			b && b > 0 && B.length > b && /* @__PURE__ */ i("div", {
				className: "flex items-center justify-between text-xs text-text-secondary",
				children: [/* @__PURE__ */ i("span", {
					"data-testid": "datatable-page-summary",
					children: [
						"Page ",
						H + 1,
						" of ",
						V,
						" · ",
						B.length,
						" total"
					]
				}), /* @__PURE__ */ i("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ r("button", {
						type: "button",
						onClick: () => L(Math.max(0, H - 1)),
						disabled: H === 0,
						"data-testid": "datatable-prev",
						className: "rounded border border-border bg-surface px-2 py-1 text-xs text-text-primary disabled:cursor-not-allowed disabled:opacity-50 hover:bg-surface-panel",
						children: "Prev"
					}), /* @__PURE__ */ r("button", {
						type: "button",
						onClick: () => L(Math.min(V - 1, H + 1)),
						disabled: H >= V - 1,
						"data-testid": "datatable-next",
						className: "rounded border border-border bg-surface px-2 py-1 text-xs text-text-primary disabled:cursor-not-allowed disabled:opacity-50 hover:bg-surface-panel",
						children: "Next"
					})]
				})]
			})
		]
	});
}
//#endregion
export { o as a, l as c, s as i, d as n, c as o, a as r, u as s, m as t };
