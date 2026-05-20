import { jsxs as l, jsx as t } from "react/jsx-runtime";
import { c as r } from "./cn-B6yFEsav.js";
function c({
  icon: e,
  title: n,
  body: s,
  actionLabel: a,
  onAction: i,
  testId: x = "empty-state",
  actionTestId: m = "empty-state-action"
}) {
  return /* @__PURE__ */ l(
    "div",
    {
      "data-testid": x,
      className: r(
        "flex flex-col items-center justify-center min-h-[220px]",
        "text-slate-400 gap-2 p-8 font-[inherit]"
      ),
      children: [
        e && /* @__PURE__ */ t("div", { className: "text-[52px] mb-2", children: e }),
        /* @__PURE__ */ t("div", { className: "text-[17px] font-semibold text-slate-500", children: n }),
        s && /* @__PURE__ */ t("div", { className: "text-[13px] text-center max-w-[340px] text-slate-400 leading-normal", children: s }),
        a && i && /* @__PURE__ */ t(
          "button",
          {
            "data-testid": m,
            onClick: i,
            className: r(
              "mt-2.5 px-[22px] py-[9px] text-sm font-semibold",
              "bg-primary text-white border-none rounded-lg cursor-pointer font-[inherit]"
            ),
            children: a
          }
        )
      ]
    }
  );
}
export {
  c as E
};
