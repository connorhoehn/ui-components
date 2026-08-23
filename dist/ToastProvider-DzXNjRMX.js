import { jsxs as b, jsx as c } from "react/jsx-runtime";
import { useState as h, useEffect as _, createContext as E, useContext as T, useRef as M, useCallback as f, useMemo as N } from "react";
import { c as w } from "./cn-B6yFEsav.js";
function A() {
  const [s, d] = h(
    () => typeof window < "u" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  return _(() => {
    if (typeof window > "u") return;
    const t = window.matchMedia("(prefers-reduced-motion: reduce)"), r = () => d(t.matches);
    return t.addEventListener("change", r), () => t.removeEventListener("change", r);
  }, []), s;
}
const L = {
  info: "text-info",
  success: "text-success",
  warning: "text-warning",
  error: "text-danger"
}, D = {
  info: "border-l-[#2563eb]",
  success: "border-l-[#16a34a]",
  warning: "border-l-[#d97706]",
  error: "border-l-[#dc2626]"
};
function P({ id: s, message: d, type: t, exiting: r, actionLabel: o, onAction: u, onDismiss: a }) {
  const l = A(), p = l ? "animate-none" : r ? "animate-[toast-fade-out_160ms_ease-in_forwards]" : "animate-[toast-slide-in_200ms_ease-out]";
  return /* @__PURE__ */ b(
    "div",
    {
      role: "alert",
      "aria-live": t === "error" || t === "warning" ? "assertive" : "polite",
      className: w(
        "bg-white border border-border border-l-[3px] rounded-lg",
        "px-4 py-3 flex items-center justify-between gap-3",
        "font-[system-ui,-apple-system,sans-serif] shadow-md",
        "min-w-[260px] max-w-[360px]",
        D[t],
        p,
        l && r && "opacity-0"
      ),
      children: [
        /* @__PURE__ */ c("span", { className: "text-sm text-text-primary font-normal flex-1 leading-[1.35]", children: d }),
        /* @__PURE__ */ b("div", { className: "flex items-center gap-1 shrink-0", children: [
          o && u && /* @__PURE__ */ c(
            "button",
            {
              onClick: () => {
                u(), a(s);
              },
              className: w("bg-transparent border-none text-[13px] font-semibold cursor-pointer px-1.5 py-0.5 font-[inherit]", L[t]),
              children: o
            }
          ),
          /* @__PURE__ */ c(
            "button",
            {
              onClick: () => a(s),
              "aria-label": "Dismiss notification",
              className: "text-base text-text-tertiary bg-transparent border-none cursor-pointer px-1 py-0 leading-none",
              children: "×"
            }
          )
        ] })
      ]
    }
  );
}
const g = E(null), R = {
  info: 3e3,
  success: 3e3,
  warning: 5e3,
  error: 6e3
}, S = 160;
function U({ children: s }) {
  const [d, t] = h([]), r = M(/* @__PURE__ */ new Map()), o = f((e) => {
    const n = r.current.get(e);
    n && (clearTimeout(n), r.current.delete(e));
  }, []), u = f((e) => {
    o(e), t((n) => n.filter((i) => i.id !== e));
  }, [o]), a = f((e) => {
    t((i) => i.map((m) => m.id === e ? { ...m, exiting: !0 } : m)), o(e);
    const n = setTimeout(() => u(e), S);
    r.current.set(e, n);
  }, [u, o]), l = f((e, n = {}) => {
    const i = n.type ?? "info", m = n.durationMs ?? R[i], x = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, v = {
      id: x,
      message: e,
      type: i,
      actionLabel: n.actionLabel,
      onAction: n.onAction
    };
    t((C) => [...C, v]);
    const y = setTimeout(() => a(x), m);
    r.current.set(x, y);
  }, [a]), p = N(() => ({ toast: l }), [l]);
  return /* @__PURE__ */ b(g.Provider, { value: p, children: [
    s,
    /* @__PURE__ */ c("div", { className: "fixed top-16 right-4 z-[2000] flex flex-col gap-2 pointer-events-none", children: d.map((e) => /* @__PURE__ */ c("div", { className: "pointer-events-auto", children: /* @__PURE__ */ c(
      P,
      {
        id: e.id,
        message: e.message,
        type: e.type,
        exiting: e.exiting,
        actionLabel: e.actionLabel,
        onAction: e.onAction,
        onDismiss: a
      }
    ) }, e.id)) })
  ] });
}
function F() {
  const s = T(g);
  if (!s)
    throw new Error("useToast must be used within a <ToastProvider>");
  return s;
}
function $() {
  return T(g);
}
export {
  P as T,
  U as a,
  $ as b,
  A as c,
  F as u
};
