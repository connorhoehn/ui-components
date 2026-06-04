import { jsxs as w, jsx as n } from "react/jsx-runtime";
import { c as r } from "./cn-B6yFEsav.js";
const S = {
  neutral: "bg-slate-100 text-slate-600",
  success: "bg-green-50 text-green-600",
  warning: "bg-amber-50 text-amber-600",
  danger: "bg-red-50 text-red-600",
  info: "bg-blue-50 text-blue-600",
  caution: "bg-orange-50 text-orange-600",
  purple: "bg-purple-50 text-purple-600"
}, f = {
  neutral: "bg-slate-500 text-white",
  success: "bg-green-600 text-white",
  warning: "bg-amber-600 text-white",
  danger: "bg-red-600 text-white",
  info: "bg-blue-600 text-white",
  caution: "bg-orange-600 text-white",
  purple: "bg-purple-600 text-white"
}, l = {
  neutral: "bg-slate-400",
  success: "bg-green-500",
  warning: "bg-amber-500",
  danger: "bg-red-500",
  info: "bg-blue-500",
  caution: "bg-orange-500",
  purple: "bg-purple-500"
}, C = {
  sm: "px-2 py-0.5 text-[11px]",
  xs: "px-1.5 py-px text-[10px]"
}, _ = {
  sm: "h-1.5 w-1.5",
  xs: "h-1 w-1"
};
function L({
  tone: e = "neutral",
  size: s = "sm",
  solid: i = !1,
  mono: g = !1,
  dot: t,
  uppercase: p = !1,
  icon: a,
  children: b,
  title: u,
  className: c,
  style: o,
  "data-testid": d,
  "aria-label": x
}) {
  const h = i ? f[e] : S[e], m = !!(t || a);
  return /* @__PURE__ */ w(
    "span",
    {
      "data-testid": d,
      "aria-label": x,
      title: u,
      className: r(
        "inline-flex items-center rounded-sm font-semibold leading-[1.4] whitespace-nowrap",
        C[s],
        h,
        g && "font-mono",
        p && "uppercase tracking-wide",
        m && "gap-1",
        c
      ),
      style: o,
      children: [
        t && /* @__PURE__ */ n(
          "span",
          {
            "aria-hidden": !0,
            className: r(
              "relative inline-block rounded-full shrink-0",
              _[s],
              l[e]
            ),
            children: t === "pulse" && /* @__PURE__ */ n(
              "span",
              {
                "aria-hidden": !0,
                className: r(
                  "absolute inset-0 rounded-full animate-ping opacity-70",
                  l[e]
                )
              }
            )
          }
        ),
        a && /* @__PURE__ */ n("span", { "aria-hidden": !0, className: "inline-flex shrink-0 [&_svg]:h-3 [&_svg]:w-3", children: a }),
        b
      ]
    }
  );
}
export {
  L as C
};
