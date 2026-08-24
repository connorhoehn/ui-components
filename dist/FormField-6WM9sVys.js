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
function p(e) {
	if (e === "right") return "text-right";
	if (e === "center") return "text-center";
}
function m({ data: t, columns: f, keyField: m, onRowClick: h, rowActions: g, searchable: _ = !1, searchPlaceholder: v = "Search…", pageSize: y, emptyMessage: b = "No records.", loading: x = !1, loadingRows: S = 5, frameless: C = !1, className: w, "data-testid": T }) {
	let [E, D] = r(null), [O, k] = r("asc"), [A, j] = r(""), [M, N] = r(0), P = (e) => {
		E === e ? k((e) => e === "asc" ? "desc" : "asc") : (D(e), k("asc"));
	}, F = n(() => {
		if (!_ || A.trim() === "") return t;
		let e = A.trim().toLowerCase();
		return t.filter((t) => f.some((n) => n.filterable !== !1 && (n.getFilterText ? n.getFilterText(t) : String(t[n.key] ?? "")).toLowerCase().includes(e)));
	}, [
		t,
		f,
		A,
		_
	]), I = n(() => {
		if (!E) return F;
		let e = f.find((e) => e.key === E);
		if (!e || !e.sortable) return F;
		let t = e.compare ?? ((t, n) => {
			let r = String(t[e.key] ?? ""), i = String(n[e.key] ?? "");
			return r.localeCompare(i);
		}), n = [...F];
		return n.sort((e, n) => O === "asc" ? t(e, n) : -t(e, n)), n;
	}, [
		F,
		f,
		E,
		O
	]), L = y && y > 0 ? Math.max(1, Math.ceil(I.length / y)) : 1, R = Math.min(M, L - 1), z = n(() => {
		if (!y || y <= 0) return I;
		let e = R * y;
		return I.slice(e, e + y);
	}, [
		I,
		y,
		R
	]);
	return /* @__PURE__ */ a("div", {
		className: e("flex flex-col gap-3", w),
		"data-testid": T,
		children: [
			_ && /* @__PURE__ */ i("input", {
				type: "text",
				value: A,
				onChange: (e) => {
					j(e.target.value), N(0);
				},
				placeholder: v,
				"aria-label": "Search",
				"data-testid": "datatable-search",
				className: "w-full max-w-xs rounded-md border border-border-field bg-surface px-3 py-1.5 text-sm text-text-primary placeholder:text-text-tertiary focus:border-primary focus:outline-none"
			}),
			/* @__PURE__ */ a(o, {
				className: C ? void 0 : "border border-border rounded-lg overflow-hidden",
				children: [/* @__PURE__ */ i(s, { children: /* @__PURE__ */ a("tr", { children: [f.map((t) => {
					let n = t.sortable && E === t.key;
					return /* @__PURE__ */ i(u, {
						sortable: t.sortable,
						sortDirection: n ? O : null,
						style: t.width ? { width: t.width } : void 0,
						className: e(p(t.align), t.className),
						onClick: t.sortable ? () => P(t.key) : void 0,
						"data-testid": t.sortable ? `datatable-header-${t.key}` : void 0,
						children: t.header
					}, t.key);
				}), g && /* @__PURE__ */ i(u, {
					className: "text-right",
					children: "Actions"
				})] }) }), /* @__PURE__ */ i(c, { children: x ? Array.from({ length: S }).map((e, t) => /* @__PURE__ */ a(l, {
					"data-testid": "datatable-loading-row",
					children: [f.map((e) => /* @__PURE__ */ i(d, {
						className: p(e.align),
						children: /* @__PURE__ */ i("div", { className: "h-4 w-3/4 animate-pulse rounded bg-surface-hover" })
					}, e.key)), g && /* @__PURE__ */ i(d, {
						className: "text-right",
						children: /* @__PURE__ */ i("div", { className: "ml-auto h-4 w-16 animate-pulse rounded bg-surface-hover" })
					})]
				}, `skeleton-${t}`)) : z.length === 0 ? /* @__PURE__ */ i(l, { children: /* @__PURE__ */ i(d, {
					colSpan: f.length + +!!g,
					className: "text-center text-text-secondary py-8",
					children: b
				}) }) : z.map((t, n) => /* @__PURE__ */ a(l, {
					clickable: !!h,
					onClick: h ? () => h(t) : void 0,
					children: [f.map((r) => /* @__PURE__ */ i(d, {
						className: e(p(r.align), r.className),
						children: r.render ? r.render(t, n) : String(t[r.key] ?? "")
					}, r.key)), g && /* @__PURE__ */ i(d, {
						className: "text-right",
						onClick: (e) => e.stopPropagation(),
						children: /* @__PURE__ */ i("div", {
							className: "flex items-center justify-end gap-2",
							children: g(t)
						})
					})]
				}, m(t))) })]
			}),
			y && y > 0 && I.length > y && /* @__PURE__ */ a("div", {
				className: "flex items-center justify-between text-xs text-text-secondary",
				children: [/* @__PURE__ */ a("span", {
					"data-testid": "datatable-page-summary",
					children: [
						"Page ",
						R + 1,
						" of ",
						L,
						" · ",
						I.length,
						" total"
					]
				}), /* @__PURE__ */ a("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ i("button", {
						type: "button",
						onClick: () => N((e) => Math.max(0, e - 1)),
						disabled: R === 0,
						"data-testid": "datatable-prev",
						className: "rounded border border-border bg-surface px-2 py-1 text-xs text-text-primary disabled:cursor-not-allowed disabled:opacity-50 hover:bg-surface-panel",
						children: "Prev"
					}), /* @__PURE__ */ i("button", {
						type: "button",
						onClick: () => N((e) => Math.min(L - 1, e + 1)),
						disabled: R >= L - 1,
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
function h({ label: n, hint: r, error: o, required: s = !1, layout: c = "stacked", children: l, className: u, style: d, "data-testid": f }) {
	let p = t(), m = `${p}-label`, h = r || o ? `${p}-desc` : void 0, g = {
		id: p,
		labelId: m,
		"aria-describedby": h,
		"aria-invalid": o ? !0 : void 0,
		"aria-required": s || void 0
	};
	return /* @__PURE__ */ a("div", {
		"data-testid": f,
		className: e(c === "inline" ? "flex items-center gap-3" : "flex flex-col gap-1", u),
		style: d,
		children: [/* @__PURE__ */ a("label", {
			id: m,
			htmlFor: p,
			className: e("text-[12px] font-medium", c === "inline" ? "min-w-[140px]" : "", o ? "text-danger-fg" : "text-text-primary"),
			children: [n, s && /* @__PURE__ */ i("span", {
				"aria-hidden": "true",
				className: "ml-0.5 text-danger-fg",
				children: "*"
			})]
		}), /* @__PURE__ */ a("div", {
			className: e(c === "inline" ? "flex-1" : ""),
			children: [l(g), (r || o) && /* @__PURE__ */ i("div", {
				id: h,
				className: e("mt-1 text-[11px]", o ? "text-danger-fg" : "text-neutral"),
				children: o ?? r
			})]
		})]
	});
}
//#endregion
export { c as a, d as c, o as i, u as l, m as n, s as o, f as r, l as s, h as t };
