import { jsxs as l, jsx as a } from "react/jsx-runtime";
import { c as d } from "./cn-B6yFEsav.js";
import { useState as C, useMemo as $, useId as O } from "react";
function R({
  title: s,
  description: t,
  actions: r,
  children: m,
  className: i
}) {
  return /* @__PURE__ */ l("section", { className: d("flex flex-col gap-6", i), children: [
    /* @__PURE__ */ l("div", { className: "flex items-start justify-between gap-4", children: [
      /* @__PURE__ */ l("div", { children: [
        /* @__PURE__ */ a("h1", { className: "text-xl font-semibold text-text-primary m-0", children: s }),
        t && /* @__PURE__ */ a("p", { className: "text-sm text-neutral mt-1 mb-0", children: t })
      ] }),
      r && /* @__PURE__ */ a("div", { className: "flex items-center gap-2 shrink-0", children: r })
    ] }),
    m
  ] });
}
function U({ children: s, className: t, ...r }) {
  return /* @__PURE__ */ a("table", { className: d("w-full text-sm", t), ...r, children: s });
}
function V({ children: s, className: t, ...r }) {
  return /* @__PURE__ */ a("thead", { className: d("border-b border-border bg-surface-panel", t), ...r, children: s });
}
function W({ children: s, className: t, ...r }) {
  return /* @__PURE__ */ a("tbody", { className: d("", t), ...r, children: s });
}
function I({ children: s, clickable: t, className: r, ...m }) {
  return /* @__PURE__ */ a(
    "tr",
    {
      className: d(
        "border-b border-border-subtle last:border-b-0 transition-colors",
        t && "cursor-pointer hover:bg-surface-panel",
        r
      ),
      ...m,
      children: s
    }
  );
}
function K({ children: s, sortable: t, sortDirection: r, className: m, ...i }) {
  return /* @__PURE__ */ l(
    "th",
    {
      className: d(
        "text-left px-4 py-2.5 text-neutral font-semibold text-[11px] uppercase tracking-wide select-none",
        t && "cursor-pointer hover:text-text-primary transition-colors",
        m
      ),
      ...i,
      children: [
        s,
        t && r && /* @__PURE__ */ a("span", { className: "ml-1 text-text-tertiary", children: r === "asc" ? "↑" : "↓" })
      ]
    }
  );
}
function g({ children: s, className: t, ...r }) {
  return /* @__PURE__ */ a("td", { className: d("px-4 py-3 text-sm text-text-primary align-middle", t), ...r, children: s });
}
function S(s) {
  if (s === "right") return "text-right";
  if (s === "center") return "text-center";
}
function A({
  data: s,
  columns: t,
  keyField: r,
  onRowClick: m,
  rowActions: i,
  searchable: f = !1,
  searchPlaceholder: P = "Search…",
  pageSize: c,
  emptyMessage: F = "No records.",
  loading: u = !1,
  loadingRows: y = 5,
  frameless: N = !1,
  className: M,
  "data-testid": L
}) {
  const [h, H] = C(null), [j, q] = C("asc"), [v, Q] = C(""), [_, D] = C(0), E = (e) => {
    h === e ? q((o) => o === "asc" ? "desc" : "asc") : (H(e), q("asc"));
  }, k = $(() => {
    if (!f || v.trim() === "") return s;
    const e = v.trim().toLowerCase();
    return s.filter(
      (o) => t.some((n) => n.filterable === !1 ? !1 : (n.getFilterText ? n.getFilterText(o) : String(o[n.key] ?? "")).toLowerCase().includes(e))
    );
  }, [s, t, v, f]), b = $(() => {
    if (!h) return k;
    const e = t.find((x) => x.key === h);
    if (!e || !e.sortable) return k;
    const o = e.compare ?? ((x, w) => {
      const G = String(x[e.key] ?? ""), J = String(w[e.key] ?? "");
      return G.localeCompare(J);
    }), n = [...k];
    return n.sort((x, w) => j === "asc" ? o(x, w) : -o(x, w)), n;
  }, [k, t, h, j]), T = c && c > 0 ? Math.max(1, Math.ceil(b.length / c)) : 1, p = Math.min(_, T - 1), B = $(() => {
    if (!c || c <= 0) return b;
    const e = p * c;
    return b.slice(e, e + c);
  }, [b, c, p]);
  return /* @__PURE__ */ l("div", { className: d("flex flex-col gap-3", M), "data-testid": L, children: [
    f && /* @__PURE__ */ a(
      "input",
      {
        type: "text",
        value: v,
        onChange: (e) => {
          Q(e.target.value), D(0);
        },
        placeholder: P,
        "aria-label": "Search",
        "data-testid": "datatable-search",
        className: "w-full max-w-xs rounded-md border border-border-field bg-surface px-3 py-1.5 text-sm text-text-primary placeholder:text-text-tertiary focus:border-primary focus:outline-none"
      }
    ),
    /* @__PURE__ */ l(U, { className: N ? void 0 : "border border-border rounded-lg overflow-hidden", children: [
      /* @__PURE__ */ a(V, { children: /* @__PURE__ */ l("tr", { children: [
        t.map((e) => {
          const o = e.sortable && h === e.key;
          return /* @__PURE__ */ a(
            K,
            {
              sortable: e.sortable,
              sortDirection: o ? j : null,
              style: e.width ? { width: e.width } : void 0,
              className: d(S(e.align), e.className),
              onClick: e.sortable ? () => E(e.key) : void 0,
              "data-testid": e.sortable ? `datatable-header-${e.key}` : void 0,
              children: e.header
            },
            e.key
          );
        }),
        i && /* @__PURE__ */ a(K, { className: "text-right", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ a(W, { children: u ? Array.from({ length: y }).map((e, o) => /* @__PURE__ */ l(I, { "data-testid": "datatable-loading-row", children: [
        t.map((n) => /* @__PURE__ */ a(g, { className: S(n.align), children: /* @__PURE__ */ a("div", { className: "h-4 w-3/4 animate-pulse rounded bg-surface-hover" }) }, n.key)),
        i && /* @__PURE__ */ a(g, { className: "text-right", children: /* @__PURE__ */ a("div", { className: "ml-auto h-4 w-16 animate-pulse rounded bg-surface-hover" }) })
      ] }, `skeleton-${o}`)) : B.length === 0 ? /* @__PURE__ */ a(I, { children: /* @__PURE__ */ a(
        g,
        {
          colSpan: t.length + (i ? 1 : 0),
          className: "text-center text-text-secondary py-8",
          children: F
        }
      ) }) : B.map((e, o) => /* @__PURE__ */ l(
        I,
        {
          clickable: !!m,
          onClick: m ? () => m(e) : void 0,
          children: [
            t.map((n) => /* @__PURE__ */ a(
              g,
              {
                className: d(S(n.align), n.className),
                children: n.render ? n.render(e, o) : String(e[n.key] ?? "")
              },
              n.key
            )),
            i && /* @__PURE__ */ a(g, { className: "text-right", onClick: (n) => n.stopPropagation(), children: /* @__PURE__ */ a("div", { className: "flex items-center justify-end gap-2", children: i(e) }) })
          ]
        },
        r(e)
      )) })
    ] }),
    c && c > 0 && b.length > c && /* @__PURE__ */ l("div", { className: "flex items-center justify-between text-xs text-text-secondary", children: [
      /* @__PURE__ */ l("span", { "data-testid": "datatable-page-summary", children: [
        "Page ",
        p + 1,
        " of ",
        T,
        " · ",
        b.length,
        " total"
      ] }),
      /* @__PURE__ */ l("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ a(
          "button",
          {
            type: "button",
            onClick: () => D((e) => Math.max(0, e - 1)),
            disabled: p === 0,
            "data-testid": "datatable-prev",
            className: "rounded border border-border bg-surface px-2 py-1 text-xs text-text-primary disabled:cursor-not-allowed disabled:opacity-50 hover:bg-surface-panel",
            children: "Prev"
          }
        ),
        /* @__PURE__ */ a(
          "button",
          {
            type: "button",
            onClick: () => D((e) => Math.min(T - 1, e + 1)),
            disabled: p >= T - 1,
            "data-testid": "datatable-next",
            className: "rounded border border-border bg-surface px-2 py-1 text-xs text-text-primary disabled:cursor-not-allowed disabled:opacity-50 hover:bg-surface-panel",
            children: "Next"
          }
        )
      ] })
    ] })
  ] });
}
function z({
  label: s,
  hint: t,
  error: r,
  required: m = !1,
  layout: i = "stacked",
  children: f,
  className: P,
  style: c,
  "data-testid": F
}) {
  const u = O(), y = `${u}-label`, N = t || r ? `${u}-desc` : void 0, M = {
    id: u,
    labelId: y,
    "aria-describedby": N,
    "aria-invalid": r ? !0 : void 0
  };
  return /* @__PURE__ */ l(
    "div",
    {
      "data-testid": F,
      className: d(
        i === "inline" ? "flex items-center gap-3" : "flex flex-col gap-1",
        P
      ),
      style: c,
      children: [
        /* @__PURE__ */ l(
          "label",
          {
            id: y,
            htmlFor: u,
            className: d(
              "text-[12px] font-medium",
              i === "inline" ? "min-w-[140px]" : "",
              r ? "text-danger-fg" : "text-text-primary"
            ),
            children: [
              s,
              m && /* @__PURE__ */ a("span", { className: "ml-0.5 text-danger-fg", children: "*" })
            ]
          }
        ),
        /* @__PURE__ */ l("div", { className: d(i === "inline" ? "flex-1" : ""), children: [
          f(M),
          (t || r) && /* @__PURE__ */ a(
            "div",
            {
              id: N,
              className: d(
                "mt-1 text-[11px]",
                r ? "text-danger-fg" : "text-neutral"
              ),
              children: r ?? t
            }
          )
        ] })
      ]
    }
  );
}
export {
  A as D,
  z as F,
  R as P,
  U as T,
  W as a,
  V as b,
  I as c,
  g as d,
  K as e
};
