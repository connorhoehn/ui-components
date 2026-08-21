import { jsxs as n, jsx as t, Fragment as f } from "react/jsx-runtime";
import { M as x } from "./Modal-X8tdpRKs.js";
import { c as i } from "./cn-B6yFEsav.js";
const b = {
  destructive: "bg-[#ef4444] hover:bg-danger",
  caution: "bg-warning hover:bg-warning",
  info: "bg-[#3b82f6] hover:bg-info"
};
function y({
  open: a,
  onConfirm: d,
  onCancel: o,
  title: c,
  body: e,
  confirmLabel: s = "Confirm",
  cancelLabel: l = "Cancel",
  confirmDisabled: r = !1,
  tone: p = "info",
  children: m
}) {
  return /* @__PURE__ */ n(
    x,
    {
      open: a,
      onClose: o,
      title: c,
      maxWidth: 420,
      footer: /* @__PURE__ */ n(f, { children: [
        /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            "data-testid": "confirm-dialog-cancel",
            onClick: o,
            className: i(
              "px-4 py-[7px] text-[13px] font-[inherit]",
              "border border-border bg-white text-text-secondary",
              "rounded-md cursor-pointer hover:bg-surface-panel"
            ),
            children: l
          }
        ),
        /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            "data-testid": "confirm-dialog-confirm",
            onClick: d,
            disabled: r,
            className: i(
              "px-4 py-[7px] text-[13px] font-semibold font-[inherit]",
              "border-none text-white rounded-md transition-colors duration-150",
              b[p],
              r ? "cursor-not-allowed opacity-70" : "cursor-pointer opacity-100"
            ),
            children: s
          }
        )
      ] }),
      children: [
        e && /* @__PURE__ */ t("p", { className: "m-0 mb-3 text-[13px] text-text-secondary", children: e }),
        m
      ]
    }
  );
}
export {
  y as C
};
