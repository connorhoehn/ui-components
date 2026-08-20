import { jsx as i, jsxs as v } from "react/jsx-runtime";
import { c as p } from "./cn-B6yFEsav.js";
import { useState as N, useRef as I, useCallback as m } from "react";
import { B as W } from "./Banner-DKb3JiLs.js";
const A = {
  ghost: "bg-transparent text-[#374151] hover:bg-[#f3f4f6]",
  primary: "bg-[#3b82f6] text-white hover:bg-[#2563eb]",
  danger: "bg-[#ef4444] text-white hover:bg-[#dc2626]"
}, K = {
  sm: "w-6 h-6 text-sm",
  md: "w-8 h-8 text-base",
  lg: "w-10 h-10 text-lg"
};
function U({
  "aria-label": r,
  icon: n,
  children: a,
  disabled: t = !1,
  variant: l = "ghost",
  size: o = "md",
  className: u,
  ...f
}) {
  return /* @__PURE__ */ i(
    "button",
    {
      type: "button",
      "aria-label": r,
      disabled: t,
      className: p(
        "inline-flex items-center justify-center border-none rounded-md",
        "transition-colors duration-150 ease-in-out",
        A[l],
        K[o],
        t && "opacity-50 cursor-not-allowed",
        !t && "cursor-pointer",
        u
      ),
      ...f,
      children: n ?? a
    }
  );
}
const R = {
  sm: "w-7 h-4",
  md: "w-9 h-5"
}, T = {
  sm: "w-3 h-3",
  md: "w-4 h-4"
}, S = {
  sm: "translate-x-3",
  md: "translate-x-4"
};
function Z({
  checked: r,
  onChange: n,
  disabled: a = !1,
  size: t = "md",
  "aria-label": l,
  "aria-labelledby": o,
  className: u,
  style: f,
  "data-testid": b
}) {
  return /* @__PURE__ */ i(
    "button",
    {
      type: "button",
      role: "switch",
      "aria-checked": r,
      "aria-label": l,
      "aria-labelledby": o,
      disabled: a,
      "data-testid": b,
      onClick: () => {
        a || n(!r);
      },
      className: p(
        "relative inline-flex items-center rounded-full border border-transparent transition-colors",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-info",
        R[t],
        r ? "bg-info" : "bg-surface-emphasis",
        a ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
        u
      ),
      style: f,
      children: /* @__PURE__ */ i(
        "span",
        {
          className: p(
            "inline-block rounded-full bg-white shadow transform transition-transform",
            T[t],
            r ? S[t] : "translate-x-0.5"
          )
        }
      )
    }
  );
}
function B(r) {
  return r < 1024 ? `${r} B` : r < 1024 * 1024 ? `${(r / 1024).toFixed(1)} KB` : `${(r / (1024 * 1024)).toFixed(1)} MB`;
}
function _(r, n) {
  return n.split(",").map((t) => t.trim().toLowerCase()).some((t) => t.startsWith(".") ? r.name.toLowerCase().endsWith(t) : t.endsWith("/*") ? r.type.startsWith(t.slice(0, -1)) : r.type === t);
}
function V({
  accept: r,
  maxSize: n,
  multiple: a = !1,
  onFiles: t,
  onError: l,
  disabled: o = !1,
  label: u,
  className: f,
  "data-testid": b
}) {
  const [w, x] = N(!1), [D, d] = N(null), y = I(null), g = m((e) => {
    const s = Array.from(e);
    if (!a && s.length > 1) {
      const c = "Only one file is allowed.";
      return d(c), l?.(c), null;
    }
    for (const c of s) {
      if (r && !_(c, r)) {
        const h = `"${c.name}" has an unsupported file type.`;
        return d(h), l?.(h), null;
      }
      if (n && c.size > n) {
        const h = `"${c.name}" exceeds the ${B(n)} size limit.`;
        return d(h), l?.(h), null;
      }
    }
    return d(null), s;
  }, [r, n, a, l]), L = m((e) => {
    if (e.preventDefault(), x(!1), o) return;
    const s = g(e.dataTransfer.files);
    s && t(s);
  }, [o, g, t]), O = m((e) => {
    e.preventDefault(), o || x(!0);
  }, [o]), $ = m(() => {
    x(!1);
  }, []), j = m((e) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const s = g(e.target.files);
    s && t(s), e.target.value = "";
  }, [g, t]), k = n ? `Up to ${B(n)}` : void 0, C = r ?? void 0;
  return /* @__PURE__ */ v("div", { className: p("flex flex-col gap-2", f), "data-testid": b, children: [
    /* @__PURE__ */ v(
      "div",
      {
        role: "button",
        tabIndex: o ? -1 : 0,
        "aria-label": u ?? "File upload drop zone",
        "aria-disabled": o,
        onDrop: L,
        onDragOver: O,
        onDragLeave: $,
        onClick: () => !o && y.current?.click(),
        onKeyDown: (e) => {
          !o && (e.key === "Enter" || e.key === " ") && (e.preventDefault(), y.current?.click());
        },
        className: p(
          "flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed",
          "px-6 py-10 text-center transition-colors duration-150",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]",
          w ? "border-[var(--color-primary)] bg-[rgba(59,130,246,0.06)]" : "border-[var(--color-border)] bg-[var(--color-surface-hover)]",
          o ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:border-[var(--color-primary)] hover:bg-[rgba(59,130,246,0.04)]"
        ),
        children: [
          /* @__PURE__ */ v(
            "svg",
            {
              width: "32",
              height: "32",
              viewBox: "0 0 32 32",
              fill: "none",
              "aria-hidden": "true",
              className: "text-[var(--color-text-tertiary)]",
              children: [
                /* @__PURE__ */ i(
                  "path",
                  {
                    d: "M10 20a6 6 0 1 1 7-5.917V22m0-7.917 3 3m-3-3-3 3",
                    stroke: "currentColor",
                    strokeWidth: "1.75",
                    strokeLinecap: "round",
                    strokeLinejoin: "round"
                  }
                ),
                /* @__PURE__ */ i("rect", { x: "2", y: "2", width: "28", height: "28", rx: "6", stroke: "currentColor", strokeWidth: "1.5", opacity: ".2" })
              ]
            }
          ),
          /* @__PURE__ */ v("div", { children: [
            /* @__PURE__ */ i("p", { className: "text-sm font-semibold text-[var(--color-text-primary)]", children: u ?? (w ? "Drop to upload" : "Drag & drop or click to upload") }),
            (C || k) && /* @__PURE__ */ i("p", { className: "text-xs text-[var(--color-text-tertiary)] mt-0.5", children: [C, k].filter(Boolean).join(" · ") })
          ] })
        ]
      }
    ),
    D && /* @__PURE__ */ i(W, { variant: "error", onDismiss: () => d(null), children: D }),
    /* @__PURE__ */ i(
      "input",
      {
        ref: y,
        type: "file",
        accept: r,
        multiple: a,
        disabled: o,
        "aria-hidden": "true",
        tabIndex: -1,
        className: "hidden",
        onChange: j
      }
    )
  ] });
}
export {
  V as F,
  U as I,
  Z as S
};
