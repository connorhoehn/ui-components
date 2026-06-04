import { jsxs as d, jsx as e } from "react/jsx-runtime";
import { c as i } from "./cn-B6yFEsav.js";
const c = {
  error: "bg-danger-bg border-danger-border text-[#991b1b]",
  warning: "bg-warning-bg border-warning-border text-[#92400e]",
  info: "bg-info-bg border-info-border text-[#1e40af]",
  success: "bg-success-bg border-success-border text-[#166534]"
};
function x({
  variant: r = "error",
  title: t,
  onDismiss: n,
  children: o,
  className: s,
  style: a,
  "data-testid": b
}) {
  return /* @__PURE__ */ d(
    "div",
    {
      role: r === "error" || r === "warning" ? "alert" : "status",
      "aria-live": r === "error" || r === "warning" ? "assertive" : "polite",
      "data-testid": b,
      className: i(
        "px-3.5 py-2.5 rounded-lg text-[13px] flex items-center gap-2 border",
        c[r],
        s
      ),
      style: a,
      children: [
        t && /* @__PURE__ */ e("strong", { children: t }),
        /* @__PURE__ */ e("span", { className: "flex-1", children: o }),
        n && /* @__PURE__ */ e(
          "button",
          {
            type: "button",
            onClick: n,
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
  x as B
};
