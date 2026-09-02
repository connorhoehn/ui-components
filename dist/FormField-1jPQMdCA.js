import { t as e } from "./cn-DhjIN-s0.js";
import { useId as t, useMemo as n, useState as r } from "react";
import { jsx as i, jsxs as a } from "react/jsx-runtime";
//#region src/components/ui/Table.tsx
function o({ children: t, className: n, ...r }) {
	return /* @__PURE__ */ i("table", {
		className: e("w-full text-sm", n),
		...r,
		children: t
	});
}
function s({ children: t, className: n, ...r }) {
	return /* @__PURE__ */ i("thead", {
		className: e("border-b border-border bg-surface-panel", n),
		...r,
		children: t
	});
}
function c({ children: t, className: n, ...r }) {
	return /* @__PURE__ */ i("tbody", {
		className: e("", n),
		...r,
		children: t
	});
}
function l({ children: t, clickable: n, className: r, ...a }) {
	return /* @__PURE__ */ i("tr", {
		className: e("border-b border-border-subtle last:border-b-0 transition-colors", n && "cursor-pointer hover:bg-surface-panel", r),
		...a,
		children: t
	});
}
function u({ children: t, sortable: n, sortDirection: r, className: o, ...s }) {
	return /* @__PURE__ */ a("th", {
		className: e("text-left px-4 py-2.5 text-neutral font-semibold text-[11px] uppercase tracking-wide select-none", n && "cursor-pointer hover:text-text-primary transition-colors", o),
		...s,
		children: [t, n && r && /* @__PURE__ */ i("span", {
			className: "ml-1 text-text-tertiary",
			children: r === "asc" ? "↑" : "↓"
		})]
	});
}
function d({ children: t, className: n, ...r }) {
	return /* @__PURE__ */ i("td", {
		className: e("px-4 py-3 text-sm text-text-primary align-middle", n),
		...r,
		children: t
	});
}
//#endregion
//#region src/components/ui/PageSection.tsx
function f({ title: t, description: n, actions: r, children: o, className: s }) {
	return /* @__PURE__ */ a("section", {
		className: e("flex flex-col gap-6", s),
		children: [/* @__PURE__ */ a("div", {
			className: "flex items-start justify-between gap-4",
			children: [/* @__PURE__ */ a("div", { children: [/* @__PURE__ */ i("h1", {
				className: "text-xl font-semibold text-text-primary m-0",
				children: t
			}), n && /* @__PURE__ */ i("p", {
				className: "text-sm text-neutral mt-1 mb-0",
				children: n
			})] }), r && /* @__PURE__ */ i("div", {
				className: "flex items-center gap-2 shrink-0",
				children: r
			})]
		}), o]
	});
}
//#endregion
//#region src/components/shared/DataTable.tsx
function p(e, t) {
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
function m(e) {
	if (e === "right") return "text-right";
	if (e === "center") return "text-center";
}
function h({ data: t, columns: f, keyField: h, onRowClick: g, rowActions: _, searchable: v = !1, searchPlaceholder: y = "Search…", pageSize: b, emptyMessage: x = "No records.", loading: S = !1, loadingRows: C = 5, frameless: w = !1, striped: T = !1, className: E, "data-testid": D }) {
	let O = Array.isArray(t) ? t : [], k = Array.isArray(f) ? f : [], [A, j] = r(null), [M, N] = r("asc"), [P, F] = r(""), [I, L] = r(0), R = (e) => {
		A === e ? N((e) => e === "asc" ? "desc" : "asc") : (j(e), N("asc"));
	}, z = n(() => {
		if (!v || P.trim() === "") return O;
		let e = P.trim().toLowerCase();
		return O.filter((t) => k.some((n) => n.filterable !== !1 && (n.getFilterText ? n.getFilterText(t) : String(t[n.key] ?? "")).toLowerCase().includes(e)));
	}, [
		O,
		k,
		P,
		v
	]), B = n(() => {
		if (!A) return z;
		let e = k.find((e) => e.key === A);
		if (!e || !e.sortable) return z;
		let t = e.compare ?? ((t, n) => p(t[e.key], n[e.key])), n = [...z];
		return n.sort((e, n) => M === "asc" ? t(e, n) : -t(e, n)), n;
	}, [
		z,
		k,
		A,
		M
	]), V = b && b > 0 ? Math.max(1, Math.ceil(B.length / b)) : 1, H = Math.min(I, V - 1), U = n(() => {
		if (!b || b <= 0) return B;
		let e = H * b;
		return B.slice(e, e + b);
	}, [
		B,
		b,
		H
	]);
	return /* @__PURE__ */ a("div", {
		className: e("flex flex-col gap-3", E),
		"data-testid": D,
		children: [
			v && /* @__PURE__ */ i("input", {
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
			/* @__PURE__ */ i("div", {
				className: "w-full max-w-full overflow-x-auto",
				children: /* @__PURE__ */ a(o, {
					className: w ? void 0 : "border border-border rounded-lg overflow-hidden",
					children: [/* @__PURE__ */ i(s, { children: /* @__PURE__ */ a("tr", { children: [k.map((t) => {
						let n = t.sortable && A === t.key;
						return /* @__PURE__ */ i(u, {
							sortable: t.sortable,
							sortDirection: n ? M : null,
							style: t.width ? { width: t.width } : void 0,
							className: e(m(t.align), t.className),
							onClick: t.sortable ? () => R(t.key) : void 0,
							"data-testid": t.sortable ? `datatable-header-${t.key}` : void 0,
							children: t.header
						}, t.key);
					}), _ && /* @__PURE__ */ i(u, {
						className: "text-right",
						children: "Actions"
					})] }) }), /* @__PURE__ */ i(c, { children: S ? Array.from({ length: C }).map((e, t) => /* @__PURE__ */ a(l, {
						"data-testid": "datatable-loading-row",
						children: [k.map((e) => /* @__PURE__ */ i(d, {
							className: m(e.align),
							children: /* @__PURE__ */ i("div", { className: "h-4 w-3/4 animate-pulse rounded bg-surface-hover" })
						}, e.key)), _ && /* @__PURE__ */ i(d, {
							className: "text-right",
							children: /* @__PURE__ */ i("div", { className: "ml-auto h-4 w-16 animate-pulse rounded bg-surface-hover" })
						})]
					}, `skeleton-${t}`)) : U.length === 0 ? /* @__PURE__ */ i(l, { children: /* @__PURE__ */ i(d, {
						colSpan: k.length + +!!_,
						className: "text-center text-text-secondary py-8",
						children: x
					}) }) : U.map((t, n) => /* @__PURE__ */ a(l, {
						clickable: !!g,
						className: T && n % 2 == 1 ? "bg-surface-inset/50" : void 0,
						onClick: g ? () => g(t) : void 0,
						children: [k.map((r) => /* @__PURE__ */ i(d, {
							className: e(m(r.align), r.className),
							children: r.render ? r.render(t, n) : String(t[r.key] ?? "")
						}, r.key)), _ && /* @__PURE__ */ i(d, {
							className: "text-right",
							onClick: (e) => e.stopPropagation(),
							children: /* @__PURE__ */ i("div", {
								className: "flex items-center justify-end gap-2",
								children: _(t)
							})
						})]
					}, h(t))) })]
				})
			}),
			b && b > 0 && B.length > b && /* @__PURE__ */ a("div", {
				className: "flex items-center justify-between text-xs text-text-secondary",
				children: [/* @__PURE__ */ a("span", {
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
				}), /* @__PURE__ */ a("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ i("button", {
						type: "button",
						onClick: () => L(Math.max(0, H - 1)),
						disabled: H === 0,
						"data-testid": "datatable-prev",
						className: "rounded border border-border bg-surface px-2 py-1 text-xs text-text-primary disabled:cursor-not-allowed disabled:opacity-50 hover:bg-surface-panel",
						children: "Prev"
					}), /* @__PURE__ */ i("button", {
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
//#region src/components/shared/FormField.tsx
function g({ label: n, hint: r, error: o, required: s = !1, layout: c = "stacked", children: l, className: u, labelClassName: d, style: f, "data-testid": p }) {
	let m = t(), h = `${m}-label`, g = r || o ? `${m}-desc` : void 0, _ = {
		id: m,
		labelId: h,
		"aria-describedby": g,
		"aria-invalid": o ? !0 : void 0,
		"aria-required": s || void 0
	};
	return /* @__PURE__ */ a("div", {
		"data-testid": p,
		className: e(c === "inline" ? "flex items-center gap-3" : "flex flex-col gap-1", u),
		style: f,
		children: [/* @__PURE__ */ a("label", {
			id: h,
			htmlFor: m,
			className: e("text-[12px] font-medium", c === "inline" ? "min-w-[140px]" : "", o ? "text-danger-fg" : "text-text-primary", d),
			children: [n, s && /* @__PURE__ */ i("span", {
				"aria-hidden": "true",
				className: "ml-0.5 text-danger-fg",
				children: "*"
			})]
		}), /* @__PURE__ */ a("div", {
			className: e(c === "inline" ? "flex-1" : ""),
			children: [l(_), (r || o) && /* @__PURE__ */ i("div", {
				id: g,
				className: e("mt-1 text-[11px]", o ? "text-danger-fg" : "text-neutral"),
				children: o ?? r
			})]
		})]
	});
}
//#endregion
export { c as a, d as c, o as i, u as l, h as n, s as o, f as r, l as s, g as t };
