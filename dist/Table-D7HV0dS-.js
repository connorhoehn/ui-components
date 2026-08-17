import { jsxs as n, jsx as a } from "react/jsx-runtime";
import { c as s } from "./cn-B6yFEsav.js";
function m({
  title: r,
  description: e,
  actions: t,
  children: l,
  className: c
}) {
  return /* @__PURE__ */ n("section", { className: s("flex flex-col gap-6", c), children: [
    /* @__PURE__ */ n("div", { className: "flex items-start justify-between gap-4", children: [
      /* @__PURE__ */ n("div", { children: [
        /* @__PURE__ */ a("h1", { className: "text-xl font-semibold text-text-primary m-0", children: r }),
        e && /* @__PURE__ */ a("p", { className: "text-sm text-neutral mt-1 mb-0", children: e })
      ] }),
      t && /* @__PURE__ */ a("div", { className: "flex items-center gap-2 shrink-0", children: t })
    ] }),
    l
  ] });
}
function d({ children: r, className: e, ...t }) {
  return /* @__PURE__ */ a("table", { className: s("w-full text-sm", e), ...t, children: r });
}
function x({ children: r, className: e, ...t }) {
  return /* @__PURE__ */ a("thead", { className: s("border-b border-border bg-surface-panel", e), ...t, children: r });
}
function b({ children: r, className: e, ...t }) {
  return /* @__PURE__ */ a("tbody", { className: s("", e), ...t, children: r });
}
function u({ children: r, clickable: e, className: t, ...l }) {
  return /* @__PURE__ */ a(
    "tr",
    {
      className: s(
        "border-b border-border-subtle last:border-b-0 transition-colors",
        e && "cursor-pointer hover:bg-surface-panel",
        t
      ),
      ...l,
      children: r
    }
  );
}
function p({ children: r, sortable: e, sortDirection: t, className: l, ...c }) {
  return /* @__PURE__ */ n(
    "th",
    {
      className: s(
        "text-left px-4 py-2.5 text-neutral font-semibold text-[11px] uppercase tracking-wide select-none",
        e && "cursor-pointer hover:text-text-primary transition-colors",
        l
      ),
      ...c,
      children: [
        r,
        e && t && /* @__PURE__ */ a("span", { className: "ml-1 text-text-tertiary", children: t === "asc" ? "↑" : "↓" })
      ]
    }
  );
}
function f({ children: r, className: e, ...t }) {
  return /* @__PURE__ */ a("td", { className: s("px-4 py-3 text-sm text-text-primary align-middle", e), ...t, children: r });
}
export {
  m as P,
  d as T,
  b as a,
  x as b,
  u as c,
  f as d,
  p as e
};
