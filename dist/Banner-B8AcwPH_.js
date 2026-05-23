import { jsx as o, jsxs as c } from "react/jsx-runtime";
import { c as d } from "./cn-B6yFEsav.js";
const g = {
  primary: "bg-[#2563eb] text-white border-none hover:bg-[#1d4ed8]",
  secondary: "bg-[#f1f5f9] text-[#334155] border border-[#e2e8f0] hover:bg-[#e2e8f0]",
  ghost: "bg-transparent text-[#334155] border border-[#d1d5db] hover:bg-[#f1f5f9]",
  danger: "bg-transparent text-[#dc2626] border border-[#fecaca] hover:bg-[#fef2f2]",
  "danger-solid": "bg-[#dc2626] text-white border-none hover:bg-[#b91c1c]"
}, f = {
  sm: "px-2.5 py-1 text-xs",
  md: "px-4 py-2 text-sm",
  lg: "px-5 py-2.5 text-sm"
};
function u({
  variant: e = "primary",
  size: t = "md",
  disabled: r = !1,
  fullWidth: n = !1,
  children: s,
  type: a = "button",
  className: b,
  ...i
}) {
  return /* @__PURE__ */ o(
    "button",
    {
      type: a,
      disabled: r,
      className: d(
        "font-semibold rounded-md font-[inherit] transition-colors duration-150 ease-in-out",
        g[e],
        f[t],
        r && "opacity-50 cursor-not-allowed",
        !r && "cursor-pointer",
        n && "w-full",
        b
      ),
      ...i,
      children: s
    }
  );
}
const l = {
  error: "bg-danger-bg border-danger-border text-[#991b1b]",
  warning: "bg-warning-bg border-warning-border text-[#92400e]",
  info: "bg-info-bg border-info-border text-[#1e40af]",
  success: "bg-success-bg border-success-border text-[#166534]"
};
function m({
  variant: e = "error",
  title: t,
  onDismiss: r,
  children: n,
  className: s,
  style: a,
  "data-testid": b
}) {
  return /* @__PURE__ */ c(
    "div",
    {
      role: e === "error" || e === "warning" ? "alert" : "status",
      "aria-live": e === "error" || e === "warning" ? "assertive" : "polite",
      "data-testid": b,
      className: d(
        "px-3.5 py-2.5 rounded-lg text-[13px] flex items-center gap-2 border",
        l[e],
        s
      ),
      style: a,
      children: [
        t && /* @__PURE__ */ o("strong", { children: t }),
        /* @__PURE__ */ o("span", { className: "flex-1", children: n }),
        r && /* @__PURE__ */ o(
          "button",
          {
            type: "button",
            onClick: r,
            "aria-label": "Dismiss",
            className: "bg-transparent border-none text-current cursor-pointer text-base p-0 leading-none",
            children: "×"
          }
        )
      ]
    }
  );
}
export {
  m as B,
  u as a
};
