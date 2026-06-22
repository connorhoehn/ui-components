import { jsxs as n, jsx as s } from "react/jsx-runtime";
import { c as l } from "./cn-B6yFEsav.js";
function m({
  title: a,
  description: e,
  actions: t,
  children: r,
  className: c
}) {
  return /* @__PURE__ */ n("section", { className: l("flex flex-col gap-6", c), children: [
    /* @__PURE__ */ n("div", { className: "flex items-start justify-between gap-4", children: [
      /* @__PURE__ */ n("div", { children: [
        /* @__PURE__ */ s("h1", { className: "text-xl font-semibold text-slate-900 m-0", children: a }),
        e && /* @__PURE__ */ s("p", { className: "text-sm text-slate-500 mt-1 mb-0", children: e })
      ] }),
      t && /* @__PURE__ */ s("div", { className: "flex items-center gap-2 shrink-0", children: t })
    ] }),
    r
  ] });
}
function d({ children: a, className: e, ...t }) {
  return /* @__PURE__ */ s("table", { className: l("w-full text-sm", e), ...t, children: a });
}
function x({ children: a, className: e, ...t }) {
  return /* @__PURE__ */ s("thead", { className: l("border-b border-slate-200 bg-slate-50", e), ...t, children: a });
}
function b({ children: a, className: e, ...t }) {
  return /* @__PURE__ */ s("tbody", { className: l("", e), ...t, children: a });
}
function u({ children: a, clickable: e, className: t, ...r }) {
  return /* @__PURE__ */ s(
    "tr",
    {
      className: l(
        "border-b border-slate-100 last:border-b-0 transition-colors",
        e && "cursor-pointer hover:bg-slate-50",
        t
      ),
      ...r,
      children: a
    }
  );
}
function f({ children: a, sortable: e, sortDirection: t, className: r, ...c }) {
  return /* @__PURE__ */ n(
    "th",
    {
      className: l(
        "text-left px-4 py-2.5 text-slate-500 font-semibold text-[11px] uppercase tracking-wide select-none",
        e && "cursor-pointer hover:text-slate-700 transition-colors",
        r
      ),
      ...c,
      children: [
        a,
        e && t && /* @__PURE__ */ s("span", { className: "ml-1 text-slate-400", children: t === "asc" ? "↑" : "↓" })
      ]
    }
  );
}
function p({ children: a, className: e, ...t }) {
  return /* @__PURE__ */ s("td", { className: l("px-4 py-3 text-sm text-slate-700 align-middle", e), ...t, children: a });
}
export {
  m as P,
  d as T,
  b as a,
  x as b,
  u as c,
  p as d,
  f as e
};
