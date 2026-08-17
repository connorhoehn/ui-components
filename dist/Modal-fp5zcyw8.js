import { jsx as a, jsxs as A } from "react/jsx-runtime";
import { useRef as y, useEffect as p } from "react";
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
  const u = y(null), l = y(null);
  return p(() => {
    if (!n) return;
    const s = typeof document < "u" ? document.activeElement : null;
    l.current = s;
    const e = u.current;
    if (e) {
      const t = e.querySelector("[data-autofocus]");
      if (t)
        t.focus();
      else {
        const i = x(e);
        i.length > 0 ? i[0].focus() : (e.setAttribute("tabindex", "-1"), e.focus());
      }
    }
    return () => {
      const t = l.current;
      t && typeof t.focus == "function" && document.contains(t) && t.focus(), l.current = null;
    };
  }, [n]), p(() => {
    if (!n) return;
    const s = (e) => {
      if (e.key === "Escape") {
        r();
        return;
      }
      if (e.key !== "Tab") return;
      const t = u.current;
      if (!t) return;
      const i = x(t);
      if (i.length === 0) {
        e.preventDefault();
        return;
      }
      const f = i[0], b = i[i.length - 1], o = document.activeElement;
      if (!o || !t.contains(o)) {
        e.preventDefault(), f.focus();
        return;
      }
      e.shiftKey && o === f ? (e.preventDefault(), b.focus()) : !e.shiftKey && o === b && (e.preventDefault(), f.focus());
    };
    return window.addEventListener("keydown", s), () => window.removeEventListener("keydown", s);
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
            onClick: (s) => s.stopPropagation(),
            children: [
              c && /* @__PURE__ */ a("div", { className: "text-base font-semibold text-text-primary mb-2.5", children: c }),
              j ? d : /* @__PURE__ */ a("div", { className: "text-[13px] text-[#475569]", children: d }),
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
