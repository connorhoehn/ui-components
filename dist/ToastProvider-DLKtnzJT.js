import { jsxs as b, jsx as c } from "react/jsx-runtime";
import { useState as w, useEffect as C, createContext as _, useContext as E, useRef as M, useCallback as f, useMemo as N } from "react";
import { c as g } from "./cn-B6yFEsav.js";
function A() {
  const [o, d] = w(
    () => typeof window < "u" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  return C(() => {
    if (typeof window > "u") return;
    const t = window.matchMedia("(prefers-reduced-motion: reduce)"), r = () => d(t.matches);
    return t.addEventListener("change", r), () => t.removeEventListener("change", r);
  }, []), o;
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
function P({ id: o, message: d, type: t, exiting: r, actionLabel: s, onAction: l, onDismiss: a }) {
  const u = A(), p = u ? "animate-none" : r ? "animate-[toast-fade-out_160ms_ease-in_forwards]" : "animate-[toast-slide-in_200ms_ease-out]";
  return /* @__PURE__ */ b(
    "div",
    {
      role: "alert",
      "aria-live": t === "error" || t === "warning" ? "assertive" : "polite",
      className: g(
        "bg-white border border-border border-l-[3px] rounded-lg",
        "px-4 py-3 flex items-center justify-between gap-3",
        "font-[system-ui,-apple-system,sans-serif] shadow-md",
        "min-w-[260px] max-w-[360px]",
        D[t],
        p,
        u && r && "opacity-0"
      ),
      children: [
        /* @__PURE__ */ c("span", { className: "text-sm text-gray-700 font-normal flex-1 leading-[1.35]", children: d }),
        /* @__PURE__ */ b("div", { className: "flex items-center gap-1 shrink-0", children: [
          s && l && /* @__PURE__ */ c(
            "button",
            {
              onClick: () => {
                l(), a(o);
              },
              className: g("bg-transparent border-none text-[13px] font-semibold cursor-pointer px-1.5 py-0.5 font-[inherit]", L[t]),
              children: s
            }
          ),
          /* @__PURE__ */ c(
            "button",
            {
              onClick: () => a(o),
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
const h = _(null), R = {
  info: 3e3,
  success: 3e3,
  warning: 5e3,
  error: 6e3
}, S = 160;
function U({ children: o }) {
  const [d, t] = w([]), r = M(/* @__PURE__ */ new Map()), s = f((e) => {
    const n = r.current.get(e);
    n && (clearTimeout(n), r.current.delete(e));
  }, []), l = f((e) => {
    s(e), t((n) => n.filter((i) => i.id !== e));
  }, [s]), a = f((e) => {
    t((i) => i.map((m) => m.id === e ? { ...m, exiting: !0 } : m)), s(e);
    const n = setTimeout(() => l(e), S);
    r.current.set(e, n);
  }, [l, s]), u = f((e, n = {}) => {
    const i = n.type ?? "info", m = n.durationMs ?? R[i], x = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, T = {
      id: x,
      message: e,
      type: i,
      actionLabel: n.actionLabel,
      onAction: n.onAction
    };
    t((y) => [...y, T]);
    const v = setTimeout(() => a(x), m);
    r.current.set(x, v);
  }, [a]), p = N(() => ({ toast: u }), [u]);
  return /* @__PURE__ */ b(h.Provider, { value: p, children: [
    o,
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
  const o = E(h);
  if (!o)
    throw new Error("useToast must be used within a <ToastProvider>");
  return o;
}
export {
  U as T,
  A as a,
  F as u
};
