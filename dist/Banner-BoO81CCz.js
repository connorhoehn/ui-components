import { jsxs as d, jsx as e } from "react/jsx-runtime";
import { c as b } from "./cn-B6yFEsav.js";
const i = {
  error: "bg-danger-bg border-danger-border text-danger-fg",
  warning: "bg-warning-bg border-warning-border text-warning-fg",
  info: "bg-info-bg border-info-border text-info-fg",
  success: "bg-success-bg border-success-border text-success-fg"
};
function x({
  variant: r = "error",
  title: n,
  onDismiss: t,
  children: s,
  className: o,
  style: a,
  "data-testid": g
}) {
  return /* @__PURE__ */ d(
    "div",
    {
      role: r === "error" || r === "warning" ? "alert" : "status",
      "aria-live": r === "error" || r === "warning" ? "assertive" : "polite",
      "data-testid": g,
      className: b(
        "px-3.5 py-2.5 rounded-lg text-[13px] flex items-center gap-2 border",
        i[r],
        o
      ),
      style: a,
      children: [
        n && /* @__PURE__ */ e("strong", { children: n }),
        /* @__PURE__ */ e("span", { className: "flex-1", children: s }),
        t && /* @__PURE__ */ e(
          "button",
          {
            type: "button",
            onClick: t,
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
