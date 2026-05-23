import { jsxs as y, jsx as n, Fragment as S } from "react/jsx-runtime";
import { useId as D, useState as k, useEffect as I, useRef as K, useCallback as N } from "react";
import { c as p } from "./cn-B6yFEsav.js";
function j(i, a) {
  if (typeof window > "u") return a;
  try {
    const t = window.localStorage.getItem(i);
    return t === null ? a : t === "true";
  } catch {
    return a;
  }
}
function E({
  title: i,
  actions: a,
  collapsible: t = !0,
  defaultCollapsed: s = !1,
  storageKey: o,
  children: l,
  className: m,
  "data-testid": x = "sidebar-section"
}) {
  const e = D(), f = `${e}-label`, h = `${e}-body`, u = o ?? `sidebar-section:${i}`, [c, v] = k(
    () => t ? j(u, s) : !1
  );
  I(() => {
    if (t && !(typeof window > "u"))
      try {
        window.localStorage.setItem(u, String(c));
      } catch {
      }
  }, [c, t, u]);
  const d = !c, g = () => {
    t && v((w) => !w);
  };
  return /* @__PURE__ */ y(
    "section",
    {
      "aria-labelledby": f,
      "data-testid": x,
      "data-collapsed": c ? "true" : "false",
      className: p("flex flex-col", m),
      children: [
        /* @__PURE__ */ y("div", { className: "flex items-center justify-between gap-1 py-2 pr-1", children: [
          /* @__PURE__ */ y(
            "button",
            {
              type: "button",
              id: f,
              "aria-expanded": t ? d : void 0,
              "aria-controls": h,
              onClick: g,
              disabled: !t,
              className: p(
                "flex items-center gap-1.5 min-w-0 flex-1",
                "text-[11px] font-bold uppercase tracking-[0.5px]",
                "text-slate-500 select-none text-left",
                t && "cursor-pointer hover:text-slate-700",
                !t && "cursor-default",
                "bg-transparent border-0 p-0 m-0"
              ),
              children: [
                t && /* @__PURE__ */ n(
                  "span",
                  {
                    "aria-hidden": "true",
                    className: p(
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
            id: h,
            hidden: !d,
            className: p("flex flex-col gap-0.5", d && "pb-1"),
            children: l
          }
        )
      ]
    }
  );
}
function P({
  icon: i,
  label: a,
  trailing: t,
  active: s = !1,
  onClick: o,
  onContextMenu: l,
  href: m,
  kebab: x,
  disabled: e = !1,
  "aria-label": f,
  className: h,
  "data-testid": u = "sidebar-row"
}) {
  const c = K(null), v = N(() => {
    e || o?.();
  }, [e, o]), d = N(
    (r) => {
      if (!e) {
        if (r.key === "Enter" || r.key === " ") {
          r.preventDefault(), o?.();
          return;
        }
        r.key === "ContextMenu" && l && (r.preventDefault(), l(r));
      }
    },
    [e, o, l]
  ), g = N(
    (r) => {
      e || l?.(r);
    },
    [e, l]
  ), w = p(
    "group relative flex items-center gap-2 w-full",
    "px-2 py-1.5 rounded-md text-sm leading-tight select-none",
    "transition-colors duration-100",
    !e && "cursor-pointer hover:bg-slate-100",
    s && !e && "bg-blue-50 text-blue-900 hover:bg-blue-100",
    !s && !e && "text-slate-700",
    e && "opacity-50 cursor-not-allowed text-slate-500",
    "no-underline",
    h
  ), b = /* @__PURE__ */ y(S, { children: [
    i && /* @__PURE__ */ n("span", { className: "inline-flex items-center justify-center w-4 h-4 shrink-0 text-slate-400 group-hover:text-slate-500", children: i }),
    /* @__PURE__ */ n("span", { className: "flex-1 min-w-0 truncate", children: a }),
    t && /* @__PURE__ */ n("span", { className: "flex items-center gap-1 shrink-0", children: t }),
    x && /* @__PURE__ */ n(
      "span",
      {
        className: "shrink-0",
        onClick: (r) => r.stopPropagation(),
        onKeyDown: (r) => r.stopPropagation(),
        children: x
      }
    )
  ] });
  return m ? /* @__PURE__ */ n(
    "a",
    {
      ref: c,
      href: m,
      "aria-current": s ? "page" : void 0,
      "aria-disabled": e || void 0,
      "aria-label": f,
      "data-testid": u,
      "data-active": s ? "true" : "false",
      className: w,
      onClick: (r) => {
        if (e) {
          r.preventDefault();
          return;
        }
        o && (r.preventDefault(), o());
      },
      onContextMenu: g,
      onKeyDown: d,
      children: b
    }
  ) : /* @__PURE__ */ n(
    "div",
    {
      ref: c,
      role: "button",
      tabIndex: e ? -1 : 0,
      "aria-pressed": s,
      "aria-disabled": e || void 0,
      "aria-label": f,
      "data-testid": u,
      "data-active": s ? "true" : "false",
      className: w,
      onClick: v,
      onContextMenu: g,
      onKeyDown: d,
      children: b
    }
  );
}
export {
  P as S,
  E as a
};
