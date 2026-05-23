import { jsxs as c, jsx as t } from "react/jsx-runtime";
import { c as l } from "./cn-B6yFEsav.js";
function h({
  icon: e,
  title: m,
  body: n,
  description: d,
  actionLabel: s,
  onAction: r,
  action: i,
  testId: x = "empty-state",
  actionTestId: p = "empty-state-action"
}) {
  const a = d ?? n;
  return /* @__PURE__ */ c(
    "div",
    {
      "data-testid": x,
      className: l(
        "flex flex-col items-center justify-center min-h-[220px]",
        "text-slate-400 gap-2 p-8 font-[inherit]"
      ),
      children: [
        e && (typeof e == "string" ? /* @__PURE__ */ t("div", { className: "text-[52px] mb-2", children: e }) : /* @__PURE__ */ t("div", { className: "mb-2", children: e })),
        /* @__PURE__ */ t("div", { className: "text-[17px] font-semibold text-slate-500", children: m }),
        a && /* @__PURE__ */ t("div", { className: "text-[13px] text-center max-w-[340px] text-slate-400 leading-normal", children: a }),
        i ? /* @__PURE__ */ t("div", { className: "mt-2.5", children: i }) : s && r && /* @__PURE__ */ t(
          "button",
          {
            "data-testid": p,
            onClick: r,
            className: l(
              "mt-2.5 px-[22px] py-[9px] text-sm font-semibold",
              "bg-primary text-white border-none rounded-lg cursor-pointer font-[inherit]"
            ),
            children: s
          }
        )
      ]
    }
  );
}
export {
  h as E
};
