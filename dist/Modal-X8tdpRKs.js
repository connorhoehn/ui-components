import { jsx as a, jsxs as A } from "react/jsx-runtime";
import { useRef as b, useEffect as p } from "react";
import { createPortal as N } from "react-dom";
import { c as v } from "./cn-B6yFEsav.js";
const D = [
  "a[href]",
  "button:not([disabled])",
  'input:not([disabled]):not([type="hidden"])',
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
  '[contenteditable="true"]'
].join(",");
function x(n) {
  return Array.from(n.querySelectorAll(D)).filter(
    (r) => !(r.getAttribute("aria-hidden") === "true" || r.style.display === "none" || r.style.visibility === "hidden")
  );
}
function K({
  open: n,
  onClose: r,
  title: c,
  maxWidth: h = 380,
  children: d,
  footer: m,
  backdropTestId: g = "modal-backdrop",
  backdropStyle: E,
  cardStyle: w,
  zIndex: k = 1e4,
  rawChildren: j = !1
}) {
  const u = b(null), l = b(null);
  return p(() => {
    if (!n) return;
    const i = typeof document < "u" ? document.activeElement : null;
    l.current = i;
    const e = u.current;
    if (e) {
      const t = e.querySelector("[data-autofocus]");
      if (t)
        t.focus();
      else {
        const s = x(e);
        s.length > 0 ? s[0].focus() : (e.setAttribute("tabindex", "-1"), e.focus());
      }
    }
    return () => {
      const t = l.current;
      t && typeof t.focus == "function" && document.contains(t) && t.focus(), l.current = null;
    };
  }, [n]), p(() => {
    if (!n) return;
    const i = (e) => {
      if (e.key === "Escape") {
        r();
        return;
      }
      if (e.key !== "Tab") return;
      const t = u.current;
      if (!t) return;
      const s = x(t);
      if (s.length === 0) {
        e.preventDefault();
        return;
      }
      const f = s[0], y = s[s.length - 1], o = document.activeElement;
      if (!o || !t.contains(o)) {
        e.preventDefault(), f.focus();
        return;
      }
      e.shiftKey && o === f ? (e.preventDefault(), y.focus()) : !e.shiftKey && o === y && (e.preventDefault(), f.focus());
    };
    return window.addEventListener("keydown", i), () => window.removeEventListener("keydown", i);
  }, [n, r]), n ? N(
    /* @__PURE__ */ a(
      "div",
      {
        "data-testid": g,
        className: v(
          "fixed inset-0 flex items-center justify-center bg-black/45"
        ),
        style: { zIndex: k, ...E },
        onClick: r,
        children: /* @__PURE__ */ A(
          "div",
          {
            ref: u,
            role: "dialog",
            "aria-modal": "true",
            "aria-label": c,
            className: v(
              "bg-white rounded-xl px-6 py-7 w-[90%] shadow-lg font-[inherit]"
            ),
            style: { maxWidth: h, ...w },
            onClick: (i) => i.stopPropagation(),
            children: [
              c && /* @__PURE__ */ a("div", { className: "text-base font-semibold text-text-primary mb-2.5", children: c }),
              j ? d : /* @__PURE__ */ a("div", { className: "text-[13px] text-text-secondary", children: d }),
              m && /* @__PURE__ */ a("div", { className: "flex gap-2 justify-end mt-5", children: m })
            ]
          }
        )
      }
    ),
    document.body
  ) : null;
}
export {
  K as M
};
