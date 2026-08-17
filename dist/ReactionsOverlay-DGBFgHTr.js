import { jsxs as y, jsx as n, Fragment as D } from "react/jsx-runtime";
import { useId as I, useState as j, useEffect as C, useRef as K, useCallback as N } from "react";
import { c as l } from "./cn-B6yFEsav.js";
function R(o, r) {
  if (typeof window > "u") return r;
  try {
    const a = window.localStorage.getItem(o);
    return a === null ? r : a === "true";
  } catch {
    return r;
  }
}
function M({
  title: o,
  actions: r,
  collapsible: a = !0,
  defaultCollapsed: s = !1,
  storageKey: i,
  children: c,
  className: _,
  "data-testid": x = "sidebar-section"
}) {
  const e = I(), m = `${e}-label`, h = `${e}-body`, u = i ?? `sidebar-section:${o}`, [d, p] = j(
    () => a ? R(u, s) : !1
  );
  C(() => {
    if (a && !(typeof window > "u"))
      try {
        window.localStorage.setItem(u, String(d));
      } catch {
      }
  }, [d, a, u]);
  const f = !d, v = () => {
    a && p((w) => !w);
  };
  return /* @__PURE__ */ y(
    "section",
    {
      "aria-labelledby": m,
      "data-testid": x,
      "data-collapsed": d ? "true" : "false",
      className: l("flex flex-col", _),
      children: [
        /* @__PURE__ */ y("div", { className: "flex items-center justify-between gap-1 py-2 pr-1", children: [
          /* @__PURE__ */ y(
            "button",
            {
              type: "button",
              id: m,
              "aria-expanded": a ? f : void 0,
              "aria-controls": h,
              onClick: v,
              disabled: !a,
              className: l(
                "flex items-center gap-1.5 min-w-0 flex-1",
                "text-[11px] font-bold uppercase tracking-[0.5px]",
                "text-neutral select-none text-left",
                a && "cursor-pointer hover:text-text-primary",
                !a && "cursor-default",
                "bg-transparent border-0 p-0 m-0"
              ),
              children: [
                a && /* @__PURE__ */ n(
                  "span",
                  {
                    "aria-hidden": "true",
                    className: l(
                      "inline-block text-[10px] leading-none transition-transform duration-150",
                      f ? "rotate-90" : "rotate-0"
                    ),
                    children: "▸"
                  }
                ),
                /* @__PURE__ */ n("span", { className: "truncate", children: o })
              ]
            }
          ),
          r && /* @__PURE__ */ n("div", { className: "flex items-center gap-1 shrink-0", children: r })
        ] }),
        /* @__PURE__ */ n(
          "div",
          {
            id: h,
            hidden: !f,
            className: l("flex flex-col gap-0.5", f && "pb-1"),
            children: c
          }
        )
      ]
    }
  );
}
function P({
  icon: o,
  label: r,
  trailing: a,
  active: s = !1,
  onClick: i,
  onContextMenu: c,
  href: _,
  kebab: x,
  disabled: e = !1,
  "aria-label": m,
  className: h,
  "data-testid": u = "sidebar-row",
  dataAttrs: d
}) {
  const p = {};
  if (d)
    for (const [t, g] of Object.entries(d))
      g != null && g !== "" && (p[t] = g);
  const f = K(null), v = N(() => {
    e || i?.();
  }, [e, i]), w = N(
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
  ), S = l(
    "group relative flex items-center gap-2 w-full",
    "px-2 py-1.5 rounded-md text-sm leading-tight select-none",
    "transition-colors duration-100",
    !e && "cursor-pointer hover:bg-surface-hover",
    s && !e && "bg-info-bg text-info-fg hover:bg-info-bg",
    !s && !e && "text-text-primary",
    e && "opacity-50 cursor-not-allowed text-neutral",
    "no-underline",
    h
  ), k = /* @__PURE__ */ y(D, { children: [
    o && /* @__PURE__ */ n("span", { className: "inline-flex items-center justify-center w-4 h-4 shrink-0 text-text-tertiary group-hover:text-neutral", children: o }),
    /* @__PURE__ */ n("span", { className: "flex-1 min-w-0 truncate", children: r }),
    a && /* @__PURE__ */ n("span", { className: "flex items-center gap-1 shrink-0", children: a }),
    x && /* @__PURE__ */ n(
      "span",
      {
        className: "shrink-0",
        onClick: (t) => t.stopPropagation(),
        onKeyDown: (t) => t.stopPropagation(),
        children: x
      }
    )
  ] });
  return _ ? /* @__PURE__ */ n(
    "a",
    {
      ref: f,
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
      onKeyDown: w,
      children: k
    }
  ) : /* @__PURE__ */ n(
    "div",
    {
      ref: f,
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
      onKeyDown: w,
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
  return /* @__PURE__ */ n("div", { className: "fixed inset-0 w-full h-full pointer-events-none z-[9999]", children: o.map((r) => /* @__PURE__ */ n(
    "span",
    {
      className: l(
        "absolute text-[2rem] select-none",
        $[r.emoji] ?? "[animation:reaction-fade-up_2.5s_ease-out_forwards]"
      ),
      style: { left: `${r.x}%`, top: `${r.y}%` },
      children: r.emoji
    },
    r.id
  )) });
}
export {
  z as R,
  P as S,
  M as a
};
