import { jsxs as n, jsx as o, Fragment as x } from "react/jsx-runtime";
import { M as f } from "./Modal-X8tdpRKs.js";
import { c as i } from "./cn-B6yFEsav.js";
const b = {
  destructive: "bg-danger hover:bg-danger",
  caution: "bg-warning hover:bg-warning",
  info: "bg-info hover:bg-info"
};
function y({
  open: a,
  onConfirm: d,
  onCancel: t,
  title: c,
  body: r,
  confirmLabel: s = "Confirm",
  cancelLabel: l = "Cancel",
  confirmDisabled: e = !1,
  tone: p = "info",
  children: m
}) {
  return /* @__PURE__ */ n(
    f,
    {
      open: a,
      onClose: t,
      title: c,
      maxWidth: 420,
      footer: /* @__PURE__ */ n(x, { children: [
        /* @__PURE__ */ o(
          "button",
          {
            type: "button",
            "data-testid": "confirm-dialog-cancel",
            onClick: t,
            className: i(
              "px-4 py-[7px] text-[13px] font-[inherit]",
              "border border-border bg-white text-text-secondary",
              "rounded-md cursor-pointer hover:bg-surface-panel"
            ),
            children: l
          }
        ),
        /* @__PURE__ */ o(
          "button",
          {
            type: "button",
            "data-testid": "confirm-dialog-confirm",
            onClick: d,
            disabled: e,
            className: i(
              "px-4 py-[7px] text-[13px] font-semibold font-[inherit]",
              "border-none text-white rounded-md transition-colors duration-150",
              b[p],
              e ? "cursor-not-allowed opacity-70" : "cursor-pointer opacity-100"
            ),
            children: s
          }
        )
      ] }),
      children: [
        r && /* @__PURE__ */ o("p", { className: "m-0 mb-3 text-[13px] text-text-secondary", children: r }),
        m
      ]
    }
  );
}
export {
  y as C
};
