import { jsx as b } from "react/jsx-runtime";
import { c as f } from "./cn-B6yFEsav.js";
const c = {
  primary: "bg-[#2563eb] text-white border-none hover:bg-[#1d4ed8]",
  secondary: "bg-[#f1f5f9] text-[#334155] border border-[#e2e8f0] hover:bg-[#e2e8f0]",
  ghost: "bg-transparent text-[#334155] border border-[#d1d5db] hover:bg-[#f1f5f9]",
  danger: "bg-transparent text-[#dc2626] border border-[#fecaca] hover:bg-[#fef2f2]",
  "danger-solid": "bg-[#dc2626] text-white border-none hover:bg-[#b91c1c]"
}, i = {
  sm: "px-2.5 py-1 text-xs",
  md: "px-4 py-2 text-sm",
  lg: "px-5 py-2.5 text-sm"
};
function m({
  variant: r = "primary",
  size: t = "md",
  disabled: e = !1,
  fullWidth: o = !1,
  children: n,
  type: s = "button",
  className: a,
  ...d
}) {
  return /* @__PURE__ */ b(
    "button",
    {
      type: s,
      disabled: e,
      className: f(
        "font-semibold rounded-md font-[inherit] transition-colors duration-150 ease-in-out",
        c[r],
        i[t],
        e && "opacity-50 cursor-not-allowed",
        !e && "cursor-pointer",
        o && "w-full",
        a
      ),
      ...d,
      children: n
    }
  );
}
export {
  m as B
};
