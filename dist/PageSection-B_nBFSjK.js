import { jsx as a, jsxs as n } from "react/jsx-runtime";
import { c as l } from "./cn-B6yFEsav.js";
const c = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8"
};
function m({
  children: s,
  padding: e = "none",
  className: t,
  ...r
}) {
  return /* @__PURE__ */ a(
    "div",
    {
      className: l(
        "border border-slate-200 rounded-lg bg-white overflow-hidden",
        c[e],
        t
      ),
      ...r,
      children: s
    }
  );
}
function b({ children: s, className: e, ...t }) {
  return /* @__PURE__ */ a("table", { className: l("w-full text-sm", e), ...t, children: s });
}
function x({ children: s, className: e, ...t }) {
  return /* @__PURE__ */ a("thead", { className: l("border-b border-slate-200 bg-slate-50", e), ...t, children: s });
}
function u({ children: s, className: e, ...t }) {
  return /* @__PURE__ */ a("tbody", { className: l("", e), ...t, children: s });
}
function f({ children: s, clickable: e, className: t, ...r }) {
  return /* @__PURE__ */ a(
    "tr",
    {
      className: l(
        "border-b border-slate-100 last:border-b-0 transition-colors",
        e && "cursor-pointer hover:bg-slate-50",
        t
      ),
      ...r,
      children: s
    }
  );
}
function p({ children: s, sortable: e, sortDirection: t, className: r, ...o }) {
  return /* @__PURE__ */ n(
    "th",
    {
      className: l(
        "text-left px-4 py-2.5 text-slate-500 font-semibold text-[11px] uppercase tracking-wide select-none",
        e && "cursor-pointer hover:text-slate-700 transition-colors",
        r
      ),
      ...o,
      children: [
        s,
        e && t && /* @__PURE__ */ a("span", { className: "ml-1 text-slate-400", children: t === "asc" ? "↑" : "↓" })
      ]
    }
  );
}
function h({ children: s, className: e, ...t }) {
  return /* @__PURE__ */ a("td", { className: l("px-4 py-3 text-sm text-slate-700 align-middle", e), ...t, children: s });
}
function N({
  title: s,
  description: e,
  actions: t,
  children: r,
  className: o
}) {
  return /* @__PURE__ */ n("section", { className: l("flex flex-col gap-6", o), children: [
    /* @__PURE__ */ n("div", { className: "flex items-start justify-between gap-4", children: [
      /* @__PURE__ */ n("div", { children: [
        /* @__PURE__ */ a("h1", { className: "text-xl font-semibold text-slate-900 m-0", children: s }),
        e && /* @__PURE__ */ a("p", { className: "text-sm text-slate-500 mt-1 mb-0", children: e })
      ] }),
      t && /* @__PURE__ */ a("div", { className: "flex items-center gap-2 shrink-0", children: t })
    ] }),
    r
  ] });
}
export {
  m as C,
  N as P,
  b as T,
  u as a,
  x as b,
  f as c,
  h as d,
  p as e
};
