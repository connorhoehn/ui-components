import { jsx as c } from "react/jsx-runtime";
import { c as l } from "./cn-B6yFEsav.js";
const b = {
  ghost: "bg-transparent text-[#374151] hover:bg-[#f3f4f6]",
  primary: "bg-[#3b82f6] text-white hover:bg-[#2563eb]",
  danger: "bg-[#ef4444] text-white hover:bg-[#dc2626]"
}, m = {
  sm: "w-6 h-6 text-sm",
  md: "w-8 h-8 text-base",
  lg: "w-10 h-10 text-lg"
};
function h({
  "aria-label": e,
  icon: r,
  children: o,
  disabled: t = !1,
  variant: n = "ghost",
  size: s = "md",
  className: a,
  ...i
}) {
  return /* @__PURE__ */ c(
    "button",
    {
      type: "button",
      "aria-label": e,
      disabled: t,
      className: l(
        "inline-flex items-center justify-center border-none rounded-md",
        "transition-colors duration-150 ease-in-out",
        b[n],
        m[s],
        t && "opacity-50 cursor-not-allowed",
        !t && "cursor-pointer",
        a
      ),
      ...i,
      children: r ?? o
    }
  );
}
export {
  h as I
};
