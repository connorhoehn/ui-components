import { jsx as i, jsxs as g } from "react/jsx-runtime";
import { c as y } from "./cn-B6yFEsav.js";
import { useState as C, useRef as O, useCallback as d } from "react";
import { B as I } from "./Banner-DKb3JiLs.js";
const A = {
  ghost: "bg-transparent text-[#374151] hover:bg-[#f3f4f6]",
  primary: "bg-[#3b82f6] text-white hover:bg-[#2563eb]",
  danger: "bg-[#ef4444] text-white hover:bg-[#dc2626]"
}, F = {
  sm: "w-6 h-6 text-sm",
  md: "w-8 h-8 text-base",
  lg: "w-10 h-10 text-lg"
};
function T({
  "aria-label": r,
  icon: n,
  children: l,
  disabled: e = !1,
  variant: c = "ghost",
  size: o = "md",
  className: h,
  ...m
}) {
  return /* @__PURE__ */ i(
    "button",
    {
      type: "button",
      "aria-label": r,
      disabled: e,
      className: y(
        "inline-flex items-center justify-center border-none rounded-md",
        "transition-colors duration-150 ease-in-out",
        A[c],
        F[o],
        e && "opacity-50 cursor-not-allowed",
        !e && "cursor-pointer",
        h
      ),
      ...m,
      children: n ?? l
    }
  );
}
function B(r) {
  return r < 1024 ? `${r} B` : r < 1024 * 1024 ? `${(r / 1024).toFixed(1)} KB` : `${(r / (1024 * 1024)).toFixed(1)} MB`;
}
function H(r, n) {
  return n.split(",").map((e) => e.trim().toLowerCase()).some((e) => e.startsWith(".") ? r.name.toLowerCase().endsWith(e) : e.endsWith("/*") ? r.type.startsWith(e.slice(0, -1)) : r.type === e);
}
function V({
  accept: r,
  maxSize: n,
  multiple: l = !1,
  onFiles: e,
  onError: c,
  disabled: o = !1,
  label: h,
  className: m,
  "data-testid": N
}) {
  const [b, v] = C(!1), [D, u] = C(null), x = O(null), p = d((t) => {
    const a = Array.from(t);
    if (!l && a.length > 1) {
      const s = "Only one file is allowed.";
      return u(s), c?.(s), null;
    }
    for (const s of a) {
      if (r && !H(s, r)) {
        const f = `"${s.name}" has an unsupported file type.`;
        return u(f), c?.(f), null;
      }
      if (n && s.size > n) {
        const f = `"${s.name}" exceeds the ${B(n)} size limit.`;
        return u(f), c?.(f), null;
      }
    }
    return u(null), a;
  }, [r, n, l, c]), $ = d((t) => {
    if (t.preventDefault(), v(!1), o) return;
    const a = p(t.dataTransfer.files);
    a && e(a);
  }, [o, p, e]), j = d((t) => {
    t.preventDefault(), o || v(!0);
  }, [o]), L = d(() => {
    v(!1);
  }, []), W = d((t) => {
    if (!t.target.files || t.target.files.length === 0) return;
    const a = p(t.target.files);
    a && e(a), t.target.value = "";
  }, [p, e]), w = n ? `Up to ${B(n)}` : void 0, k = r ?? void 0;
  return /* @__PURE__ */ g("div", { className: y("flex flex-col gap-2", m), "data-testid": N, children: [
    /* @__PURE__ */ g(
      "div",
      {
        role: "button",
        tabIndex: o ? -1 : 0,
        "aria-label": h ?? "File upload drop zone",
        "aria-disabled": o,
        onDrop: $,
        onDragOver: j,
        onDragLeave: L,
        onClick: () => !o && x.current?.click(),
        onKeyDown: (t) => {
          !o && (t.key === "Enter" || t.key === " ") && (t.preventDefault(), x.current?.click());
        },
        className: y(
          "flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed",
          "px-6 py-10 text-center transition-colors duration-150",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]",
          b ? "border-[var(--color-primary)] bg-[rgba(59,130,246,0.06)]" : "border-[var(--color-border)] bg-[var(--color-surface-hover)]",
          o ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:border-[var(--color-primary)] hover:bg-[rgba(59,130,246,0.04)]"
        ),
        children: [
          /* @__PURE__ */ g(
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
          /* @__PURE__ */ g("div", { children: [
            /* @__PURE__ */ i("p", { className: "text-sm font-semibold text-[var(--color-text-primary)]", children: h ?? (b ? "Drop to upload" : "Drag & drop or click to upload") }),
            (k || w) && /* @__PURE__ */ i("p", { className: "text-xs text-[var(--color-text-tertiary)] mt-0.5", children: [k, w].filter(Boolean).join(" · ") })
          ] })
        ]
      }
    ),
    D && /* @__PURE__ */ i(I, { variant: "error", onDismiss: () => u(null), children: D }),
    /* @__PURE__ */ i(
      "input",
      {
        ref: x,
        type: "file",
        accept: r,
        multiple: l,
        disabled: o,
        "aria-hidden": "true",
        tabIndex: -1,
        className: "hidden",
        onChange: W
      }
    )
  ] });
}
export {
  V as F,
  T as I
};
