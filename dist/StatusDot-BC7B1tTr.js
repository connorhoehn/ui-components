import { jsx as a, jsxs as x } from "react/jsx-runtime";
import { c as e } from "./cn-B6yFEsav.js";
const p = {
  xs: "w-1.5 h-1.5",
  sm: "w-2 h-2",
  md: "w-2.5 h-2.5"
};
function v({
  color: c,
  pulse: d = !1,
  size: m = "sm",
  label: t,
  className: n,
  style: s,
  title: r,
  "data-testid": i,
  "aria-label": l
}) {
  const u = c ?? "var(--color-text-tertiary)", o = /* @__PURE__ */ a(
    "span",
    {
      "aria-hidden": t != null ? !0 : void 0,
      "aria-label": t == null ? l : void 0,
      className: e(
        "inline-block rounded-full shrink-0",
        p[m],
        d && "animate-pulse"
      ),
      style: { background: u }
    }
  );
  return t == null ? /* @__PURE__ */ a(
    "span",
    {
      "data-testid": i,
      title: r,
      className: e("inline-flex items-center", n),
      style: s,
      children: o
    }
  ) : /* @__PURE__ */ x(
    "span",
    {
      "data-testid": i,
      title: r,
      "aria-label": l,
      className: e("inline-flex items-center", n),
      style: s,
      children: [
        o,
        /* @__PURE__ */ a("span", { className: "ml-1.5 text-[11px] text-[var(--color-text-secondary)]", children: t })
      ]
    }
  );
}
export {
  v as S
};
