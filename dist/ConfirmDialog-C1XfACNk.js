import { jsx as r, jsxs as c, Fragment as g } from "react/jsx-runtime";
import { c as b } from "./cn-B6yFEsav.js";
import { M as p } from "./Modal-2jg4229_.js";
const x = {
  primary: "bg-[#2563eb] text-white border-none hover:bg-[#1d4ed8]",
  secondary: "bg-[#f1f5f9] text-[#334155] border border-[#e2e8f0] hover:bg-[#e2e8f0]",
  ghost: "bg-transparent text-[#334155] border border-[#d1d5db] hover:bg-[#f1f5f9]",
  danger: "bg-transparent text-[#dc2626] border border-[#fecaca] hover:bg-[#fef2f2]",
  "danger-solid": "bg-[#dc2626] text-white border-none hover:bg-[#b91c1c]"
}, m = {
  sm: "px-2.5 py-1 text-xs",
  md: "px-4 py-2 text-sm",
  lg: "px-5 py-2.5 text-sm"
};
function w({
  variant: n = "primary",
  size: t = "md",
  disabled: e = !1,
  fullWidth: a = !1,
  children: o,
  type: s = "button",
  className: d,
  ...i
}) {
  return /* @__PURE__ */ r(
    "button",
    {
      type: s,
      disabled: e,
      className: b(
        "font-semibold rounded-md font-[inherit] transition-colors duration-150 ease-in-out",
        x[n],
        m[t],
        e && "opacity-50 cursor-not-allowed",
        !e && "cursor-pointer",
        a && "w-full",
        d
      ),
      ...i,
      children: o
    }
  );
}
const u = {
  error: "bg-danger-bg border-danger-border text-[#991b1b]",
  warning: "bg-warning-bg border-warning-border text-[#92400e]",
  info: "bg-info-bg border-info-border text-[#1e40af]",
  success: "bg-success-bg border-success-border text-[#166534]"
};
function N({
  variant: n = "error",
  title: t,
  onDismiss: e,
  children: a,
  className: o,
  style: s,
  "data-testid": d
}) {
  return /* @__PURE__ */ c(
    "div",
    {
      role: "alert",
      "data-testid": d,
      className: b(
        "px-3.5 py-2.5 rounded-lg text-[13px] flex items-center gap-2 border",
        u[n],
        o
      ),
      style: s,
      children: [
        t && /* @__PURE__ */ r("strong", { children: t }),
        /* @__PURE__ */ r("span", { className: "flex-1", children: a }),
        e && /* @__PURE__ */ r(
          "button",
          {
            type: "button",
            onClick: e,
            "aria-label": "Dismiss",
            className: "bg-transparent border-none text-current cursor-pointer text-base p-0 leading-none",
            children: "×"
          }
        )
      ]
    }
  );
}
const h = {
  destructive: "bg-[#ef4444] hover:bg-[#dc2626]",
  caution: "bg-amber-600 hover:bg-amber-700",
  info: "bg-[#3b82f6] hover:bg-[#2563eb]"
};
function B({
  open: n,
  onConfirm: t,
  onCancel: e,
  title: a,
  body: o,
  confirmLabel: s = "Confirm",
  cancelLabel: d = "Cancel",
  confirmDisabled: i = !1,
  tone: f = "info",
  children: l
}) {
  return /* @__PURE__ */ c(
    p,
    {
      open: n,
      onClose: e,
      title: a,
      maxWidth: 420,
      footer: /* @__PURE__ */ c(g, { children: [
        /* @__PURE__ */ r(
          "button",
          {
            type: "button",
            "data-testid": "confirm-dialog-cancel",
            onClick: e,
            className: b(
              "px-4 py-[7px] text-[13px] font-[inherit]",
              "border border-[#e2e8f0] bg-white text-[#475569]",
              "rounded-md cursor-pointer hover:bg-[#f8fafc]"
            ),
            children: d
          }
        ),
        /* @__PURE__ */ r(
          "button",
          {
            type: "button",
            "data-testid": "confirm-dialog-confirm",
            onClick: t,
            disabled: i,
            className: b(
              "px-4 py-[7px] text-[13px] font-semibold font-[inherit]",
              "border-none text-white rounded-md transition-colors duration-150",
              h[f],
              i ? "cursor-not-allowed opacity-70" : "cursor-pointer opacity-100"
            ),
            children: s
          }
        )
      ] }),
      children: [
        o && /* @__PURE__ */ r("p", { className: "m-0 mb-3 text-[13px] text-[#475569]", children: o }),
        l
      ]
    }
  );
}
export {
  N as B,
  B as C,
  w as a
};
