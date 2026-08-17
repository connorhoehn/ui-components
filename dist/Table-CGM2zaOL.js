import { jsxs as n, jsx as r } from "react/jsx-runtime";
import { c as s } from "./cn-B6yFEsav.js";
function m({
  title: a,
  description: e,
  actions: t,
  children: l,
  className: c
}) {
  return /* @__PURE__ */ n("section", { className: s("flex flex-col gap-6", c), children: [
    /* @__PURE__ */ n("div", { className: "flex items-start justify-between gap-4", children: [
      /* @__PURE__ */ n("div", { children: [
        /* @__PURE__ */ r("h1", { className: "text-xl font-semibold text-text-primary m-0", children: a }),
        e && /* @__PURE__ */ r("p", { className: "text-sm text-neutral mt-1 mb-0", children: e })
      ] }),
      t && /* @__PURE__ */ r("div", { className: "flex items-center gap-2 shrink-0", children: t })
    ] }),
    l
  ] });
}
function d({ children: a, className: e, ...t }) {
  return /* @__PURE__ */ r("table", { className: s("w-full text-sm", e), ...t, children: a });
}
function x({ children: a, className: e, ...t }) {
  return /* @__PURE__ */ r("thead", { className: s("border-b border-border bg-surface-panel", e), ...t, children: a });
}
function b({ children: a, className: e, ...t }) {
  return /* @__PURE__ */ r("tbody", { className: s("", e), ...t, children: a });
}
function u({ children: a, clickable: e, className: t, ...l }) {
  return /* @__PURE__ */ r(
    "tr",
    {
      className: s(
        "border-b border-slate-100 last:border-b-0 transition-colors",
        e && "cursor-pointer hover:bg-surface-panel",
        t
      ),
      ...l,
      children: a
    }
  );
}
function f({ children: a, sortable: e, sortDirection: t, className: l, ...c }) {
  return /* @__PURE__ */ n(
    "th",
    {
      className: s(
        "text-left px-4 py-2.5 text-neutral font-semibold text-[11px] uppercase tracking-wide select-none",
        e && "cursor-pointer hover:text-slate-700 transition-colors",
        l
      ),
      ...c,
      children: [
        a,
        e && t && /* @__PURE__ */ r("span", { className: "ml-1 text-text-tertiary", children: t === "asc" ? "↑" : "↓" })
      ]
    }
  );
}
function p({ children: a, className: e, ...t }) {
  return /* @__PURE__ */ r("td", { className: s("px-4 py-3 text-sm text-slate-700 align-middle", e), ...t, children: a });
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
