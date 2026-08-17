import { jsxs as n, jsx as t, Fragment as p } from "react/jsx-runtime";
import { M as b } from "./Modal-fp5zcyw8.js";
import { c as i } from "./cn-B6yFEsav.js";
const x = {
  destructive: "bg-[#ef4444] hover:bg-[#dc2626]",
  caution: "bg-warning hover:bg-warning",
  info: "bg-[#3b82f6] hover:bg-[#2563eb]"
};
function C({
  open: a,
  onConfirm: c,
  onCancel: o,
  title: d,
  body: e,
  confirmLabel: s = "Confirm",
  cancelLabel: f = "Cancel",
  confirmDisabled: r = !1,
  tone: l = "info",
  children: m
}) {
  return /* @__PURE__ */ n(
    b,
    {
      open: a,
      onClose: o,
      title: d,
      maxWidth: 420,
      footer: /* @__PURE__ */ n(p, { children: [
        /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            "data-testid": "confirm-dialog-cancel",
            onClick: o,
            className: i(
              "px-4 py-[7px] text-[13px] font-[inherit]",
              "border border-[#e2e8f0] bg-white text-[#475569]",
              "rounded-md cursor-pointer hover:bg-[#f8fafc]"
            ),
            children: f
          }
        ),
        /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            "data-testid": "confirm-dialog-confirm",
            onClick: c,
            disabled: r,
            className: i(
              "px-4 py-[7px] text-[13px] font-semibold font-[inherit]",
              "border-none text-white rounded-md transition-colors duration-150",
              x[l],
              r ? "cursor-not-allowed opacity-70" : "cursor-pointer opacity-100"
            ),
            children: s
          }
        )
      ] }),
      children: [
        e && /* @__PURE__ */ t("p", { className: "m-0 mb-3 text-[13px] text-[#475569]", children: e }),
        m
      ]
    }
  );
}
export {
  C
};
