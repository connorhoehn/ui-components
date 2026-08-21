import { jsx as b } from "react/jsx-runtime";
import { c as i } from "./cn-B6yFEsav.js";
const g = {
  primary: "bg-primary text-white border-none hover:bg-primary-hover",
  secondary: "bg-surface-inset text-text-primary border border-border hover:bg-surface-hover",
  ghost: "bg-transparent text-text-primary border border-border hover:bg-surface-hover",
  danger: "bg-transparent text-danger-fg border border-danger-border hover:bg-danger-bg",
  "danger-solid": "bg-danger text-white border-none hover:bg-danger/90"
}, p = {
  sm: "px-2.5 py-1 text-xs",
  md: "px-4 py-2 text-sm",
  lg: "px-5 py-2.5 text-sm"
};
function c({
  variant: e = "primary",
  size: t = "md",
  disabled: r = !1,
  fullWidth: o = !1,
  children: n,
  type: a = "button",
  className: s,
  ...d
}) {
  return /* @__PURE__ */ b(
    "button",
    {
      type: a,
      disabled: r,
      className: i(
        "font-semibold rounded-md font-[inherit] transition-colors duration-150 ease-in-out",
        g[e],
        p[t],
        r && "opacity-50 cursor-not-allowed",
        !r && "cursor-pointer",
        o && "w-full",
        s
      ),
      ...d,
      children: n
    }
  );
}
export {
  c as B
};
