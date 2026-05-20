import { jsx as o } from "react/jsx-runtime";
import { c as x } from "./cn-B6yFEsav.js";
const u = {
  neutral: "bg-slate-100 text-slate-600",
  success: "bg-green-50 text-green-600",
  warning: "bg-amber-50 text-amber-600",
  danger: "bg-red-50 text-red-600",
  info: "bg-blue-50 text-blue-600",
  caution: "bg-orange-50 text-orange-600",
  purple: "bg-purple-50 text-purple-600"
}, c = {
  neutral: "bg-slate-500 text-white",
  success: "bg-green-600 text-white",
  warning: "bg-amber-600 text-white",
  danger: "bg-red-600 text-white",
  info: "bg-blue-600 text-white",
  caution: "bg-orange-600 text-white",
  purple: "bg-purple-600 text-white"
}, d = {
  sm: "px-2 py-0.5 text-[11px]",
  xs: "px-1.5 py-px text-[10px]"
};
function w({
  tone: e = "neutral",
  size: t = "sm",
  solid: a = !1,
  mono: n = !1,
  children: r,
  title: s,
  className: l,
  style: i,
  "data-testid": g,
  "aria-label": p
}) {
  const b = a ? c[e] : u[e];
  return /* @__PURE__ */ o(
    "span",
    {
      "data-testid": g,
      "aria-label": p,
      title: s,
      className: x(
        "inline-block rounded-sm font-semibold leading-[1.4] whitespace-nowrap",
        d[t],
        b,
        n && "font-mono",
        l
      ),
      style: i,
      children: r
    }
  );
}
export {
  w as C
};
