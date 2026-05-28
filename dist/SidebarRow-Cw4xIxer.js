import { jsxs as v, jsx as n, Fragment as I } from "react/jsx-runtime";
import { useId as j, useState as K, useEffect as C, useRef as R, useCallback as b } from "react";
import { c as m } from "./cn-B6yFEsav.js";
function $(i, a) {
  if (typeof window > "u") return a;
  try {
    const r = window.localStorage.getItem(i);
    return r === null ? a : r === "true";
  } catch {
    return a;
  }
}
function O({
  title: i,
  actions: a,
  collapsible: r = !0,
  defaultCollapsed: s = !1,
  storageKey: o,
  children: l,
  className: x,
  "data-testid": h = "sidebar-section"
}) {
  const e = j(), u = `${e}-label`, g = `${e}-body`, f = o ?? `sidebar-section:${i}`, [c, p] = K(
    () => r ? $(f, s) : !1
  );
  C(() => {
    if (r && !(typeof window > "u"))
      try {
        window.localStorage.setItem(f, String(c));
      } catch {
      }
  }, [c, r, f]);
  const d = !c, N = () => {
    r && p((w) => !w);
  };
  return /* @__PURE__ */ v(
    "section",
    {
      "aria-labelledby": u,
      "data-testid": h,
      "data-collapsed": c ? "true" : "false",
      className: m("flex flex-col", x),
      children: [
        /* @__PURE__ */ v("div", { className: "flex items-center justify-between gap-1 py-2 pr-1", children: [
          /* @__PURE__ */ v(
            "button",
            {
              type: "button",
              id: u,
              "aria-expanded": r ? d : void 0,
              "aria-controls": g,
              onClick: N,
              disabled: !r,
              className: m(
                "flex items-center gap-1.5 min-w-0 flex-1",
                "text-[11px] font-bold uppercase tracking-[0.5px]",
                "text-slate-500 select-none text-left",
                r && "cursor-pointer hover:text-slate-700",
                !r && "cursor-default",
                "bg-transparent border-0 p-0 m-0"
              ),
              children: [
                r && /* @__PURE__ */ n(
                  "span",
                  {
                    "aria-hidden": "true",
                    className: m(
                      "inline-block text-[10px] leading-none transition-transform duration-150",
                      d ? "rotate-90" : "rotate-0"
                    ),
                    children: "▸"
                  }
                ),
                /* @__PURE__ */ n("span", { className: "truncate", children: i })
              ]
            }
          ),
          a && /* @__PURE__ */ n("div", { className: "flex items-center gap-1 shrink-0", children: a })
        ] }),
        /* @__PURE__ */ n(
          "div",
          {
            id: g,
            hidden: !d,
            className: m("flex flex-col gap-0.5", d && "pb-1"),
            children: l
          }
        )
      ]
    }
  );
}
function q({
  icon: i,
  label: a,
  trailing: r,
  active: s = !1,
  onClick: o,
  onContextMenu: l,
  href: x,
  kebab: h,
  disabled: e = !1,
  "aria-label": u,
  className: g,
  "data-testid": f = "sidebar-row",
  dataAttrs: c
}) {
  const p = {};
  if (c)
    for (const [t, y] of Object.entries(c))
      y != null && y !== "" && (p[t] = y);
  const d = R(null), N = b(() => {
    e || o?.();
  }, [e, o]), w = b(
    (t) => {
      if (!e) {
        if (t.key === "Enter" || t.key === " ") {
          t.preventDefault(), o?.();
          return;
        }
        t.key === "ContextMenu" && l && (t.preventDefault(), l(t));
      }
    },
    [e, o, l]
  ), D = b(
    (t) => {
      e || l?.(t);
    },
    [e, l]
  ), S = m(
    "group relative flex items-center gap-2 w-full",
    "px-2 py-1.5 rounded-md text-sm leading-tight select-none",
    "transition-colors duration-100",
    !e && "cursor-pointer hover:bg-slate-100",
    s && !e && "bg-blue-50 text-blue-900 hover:bg-blue-100",
    !s && !e && "text-slate-700",
    e && "opacity-50 cursor-not-allowed text-slate-500",
    "no-underline",
    g
  ), k = /* @__PURE__ */ v(I, { children: [
    i && /* @__PURE__ */ n("span", { className: "inline-flex items-center justify-center w-4 h-4 shrink-0 text-slate-400 group-hover:text-slate-500", children: i }),
    /* @__PURE__ */ n("span", { className: "flex-1 min-w-0 truncate", children: a }),
    r && /* @__PURE__ */ n("span", { className: "flex items-center gap-1 shrink-0", children: r }),
    h && /* @__PURE__ */ n(
      "span",
      {
        className: "shrink-0",
        onClick: (t) => t.stopPropagation(),
        onKeyDown: (t) => t.stopPropagation(),
        children: h
      }
    )
  ] });
  return x ? /* @__PURE__ */ n(
    "a",
    {
      ref: d,
      href: x,
      "aria-current": s ? "page" : void 0,
      "aria-disabled": e || void 0,
      "aria-label": u,
      "data-testid": f,
      "data-active": s ? "true" : "false",
      ...p,
      className: S,
      onClick: (t) => {
        if (e) {
          t.preventDefault();
          return;
        }
        o && (t.preventDefault(), o());
      },
      onContextMenu: D,
      onKeyDown: w,
      children: k
    }
  ) : /* @__PURE__ */ n(
    "div",
    {
      ref: d,
      role: "button",
      tabIndex: e ? -1 : 0,
      "aria-pressed": s,
      "aria-disabled": e || void 0,
      "aria-label": u,
      "data-testid": f,
      "data-active": s ? "true" : "false",
      ...p,
      className: S,
      onClick: N,
      onContextMenu: D,
      onKeyDown: w,
      children: k
    }
  );
}
export {
  q as S,
  O as a
};
