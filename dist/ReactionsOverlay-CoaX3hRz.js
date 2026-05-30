import { jsxs as y, jsx as r, Fragment as D } from "react/jsx-runtime";
import { useId as I, useState as j, useEffect as C, useRef as K, useCallback as N } from "react";
import { c as f } from "./cn-B6yFEsav.js";
function R(o, n) {
  if (typeof window > "u") return n;
  try {
    const a = window.localStorage.getItem(o);
    return a === null ? n : a === "true";
  } catch {
    return n;
  }
}
function M({
  title: o,
  actions: n,
  collapsible: a = !0,
  defaultCollapsed: s = !1,
  storageKey: i,
  children: c,
  className: _,
  "data-testid": w = "sidebar-section"
}) {
  const e = I(), m = `${e}-label`, h = `${e}-body`, u = i ?? `sidebar-section:${o}`, [l, p] = j(
    () => a ? R(u, s) : !1
  );
  C(() => {
    if (a && !(typeof window > "u"))
      try {
        window.localStorage.setItem(u, String(l));
      } catch {
      }
  }, [l, a, u]);
  const d = !l, v = () => {
    a && p((x) => !x);
  };
  return /* @__PURE__ */ y(
    "section",
    {
      "aria-labelledby": m,
      "data-testid": w,
      "data-collapsed": l ? "true" : "false",
      className: f("flex flex-col", _),
      children: [
        /* @__PURE__ */ y("div", { className: "flex items-center justify-between gap-1 py-2 pr-1", children: [
          /* @__PURE__ */ y(
            "button",
            {
              type: "button",
              id: m,
              "aria-expanded": a ? d : void 0,
              "aria-controls": h,
              onClick: v,
              disabled: !a,
              className: f(
                "flex items-center gap-1.5 min-w-0 flex-1",
                "text-[11px] font-bold uppercase tracking-[0.5px]",
                "text-slate-500 select-none text-left",
                a && "cursor-pointer hover:text-slate-700",
                !a && "cursor-default",
                "bg-transparent border-0 p-0 m-0"
              ),
              children: [
                a && /* @__PURE__ */ r(
                  "span",
                  {
                    "aria-hidden": "true",
                    className: f(
                      "inline-block text-[10px] leading-none transition-transform duration-150",
                      d ? "rotate-90" : "rotate-0"
                    ),
                    children: "▸"
                  }
                ),
                /* @__PURE__ */ r("span", { className: "truncate", children: o })
              ]
            }
          ),
          n && /* @__PURE__ */ r("div", { className: "flex items-center gap-1 shrink-0", children: n })
        ] }),
        /* @__PURE__ */ r(
          "div",
          {
            id: h,
            hidden: !d,
            className: f("flex flex-col gap-0.5", d && "pb-1"),
            children: c
          }
        )
      ]
    }
  );
}
function P({
  icon: o,
  label: n,
  trailing: a,
  active: s = !1,
  onClick: i,
  onContextMenu: c,
  href: _,
  kebab: w,
  disabled: e = !1,
  "aria-label": m,
  className: h,
  "data-testid": u = "sidebar-row",
  dataAttrs: l
}) {
  const p = {};
  if (l)
    for (const [t, g] of Object.entries(l))
      g != null && g !== "" && (p[t] = g);
  const d = K(null), v = N(() => {
    e || i?.();
  }, [e, i]), x = N(
    (t) => {
      if (!e) {
        if (t.key === "Enter" || t.key === " ") {
          t.preventDefault(), i?.();
          return;
        }
        t.key === "ContextMenu" && c && (t.preventDefault(), c(t));
      }
    },
    [e, i, c]
  ), b = N(
    (t) => {
      e || c?.(t);
    },
    [e, c]
  ), S = f(
    "group relative flex items-center gap-2 w-full",
    "px-2 py-1.5 rounded-md text-sm leading-tight select-none",
    "transition-colors duration-100",
    !e && "cursor-pointer hover:bg-slate-100",
    s && !e && "bg-blue-50 text-blue-900 hover:bg-blue-100",
    !s && !e && "text-slate-700",
    e && "opacity-50 cursor-not-allowed text-slate-500",
    "no-underline",
    h
  ), k = /* @__PURE__ */ y(D, { children: [
    o && /* @__PURE__ */ r("span", { className: "inline-flex items-center justify-center w-4 h-4 shrink-0 text-slate-400 group-hover:text-slate-500", children: o }),
    /* @__PURE__ */ r("span", { className: "flex-1 min-w-0 truncate", children: n }),
    a && /* @__PURE__ */ r("span", { className: "flex items-center gap-1 shrink-0", children: a }),
    w && /* @__PURE__ */ r(
      "span",
      {
        className: "shrink-0",
        onClick: (t) => t.stopPropagation(),
        onKeyDown: (t) => t.stopPropagation(),
        children: w
      }
    )
  ] });
  return _ ? /* @__PURE__ */ r(
    "a",
    {
      ref: d,
      href: _,
      "aria-current": s ? "page" : void 0,
      "aria-disabled": e || void 0,
      "aria-label": m,
      "data-testid": u,
      "data-active": s ? "true" : "false",
      ...p,
      className: S,
      onClick: (t) => {
        if (e) {
          t.preventDefault();
          return;
        }
        i && (t.preventDefault(), i());
      },
      onContextMenu: b,
      onKeyDown: x,
      children: k
    }
  ) : /* @__PURE__ */ r(
    "div",
    {
      ref: d,
      role: "button",
      tabIndex: e ? -1 : 0,
      "aria-pressed": s,
      "aria-disabled": e || void 0,
      "aria-label": m,
      "data-testid": u,
      "data-active": s ? "true" : "false",
      ...p,
      className: S,
      onClick: v,
      onContextMenu: b,
      onKeyDown: x,
      children: k
    }
  );
}
const $ = {
  "❤️": "[animation:reaction-heart_2.5s_ease-out_forwards]",
  "😂": "[animation:reaction-laugh_2.5s_ease-out_forwards]",
  "👍": "[animation:reaction-thumbsup_2.5s_ease-out_forwards]",
  "👎": "[animation:reaction-thumbsdown_2.5s_ease-out_forwards]",
  "😮": "[animation:reaction-wow_2.5s_ease-out_forwards]",
  "😢": "[animation:reaction-cry_2.5s_ease-out_forwards]",
  "😡": "[animation:reaction-angry_1.8s_ease-out_forwards]",
  "🎉": "[animation:reaction-party_2.5s_ease-out_forwards]",
  "🔥": "[animation:reaction-fire_2.5s_ease-out_forwards]",
  "⚡": "[animation:reaction-lightning_1.5s_ease-out_forwards]",
  "💯": "[animation:reaction-hundred_2.0s_ease-out_forwards]",
  "🚀": "[animation:reaction-rocket_2.0s_ease-out_forwards]"
};
function z({ reactions: o }) {
  return /* @__PURE__ */ r("div", { className: "fixed inset-0 w-full h-full pointer-events-none z-[9999]", children: o.map((n) => /* @__PURE__ */ r(
    "span",
    {
      className: f(
        "absolute text-[2rem] select-none",
        $[n.emoji] ?? "[animation:reaction-fade-up_2.5s_ease-out_forwards]"
      ),
      style: { left: `${n.x}%`, top: `${n.y}%` },
      children: n.emoji
    },
    n.id
  )) });
}
export {
  z as R,
  P as S,
  M as a
};
