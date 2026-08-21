import { jsx as r, jsxs as b } from "react/jsx-runtime";
import { forwardRef as g } from "react";
import { c as e } from "./cn-B6yFEsav.js";
const s = {
  sm: "h-7 px-2 text-[12px]",
  md: "h-9 px-2.5 text-[13px]"
}, m = {
  sm: "px-1.5",
  md: "px-2"
}, j = g(function({
  type: a = "text",
  size: t = "md",
  prefix: d,
  suffix: l,
  invalid: c = !1,
  disabled: n = !1,
  mono: f = !1,
  className: u,
  "data-testid": x,
  ...p
}, h) {
  const o = d != null, i = l != null;
  return !o && !i ? /* @__PURE__ */ r(
    "input",
    {
      ref: h,
      type: a,
      disabled: n,
      "data-testid": x,
      className: e(
        "w-full rounded-md border bg-surface-panel font-inherit text-text-primary",
        "outline-none transition-colors duration-150",
        "placeholder:text-text-tertiary",
        "focus:bg-white focus:border-info focus:ring-1 focus:ring-info/40",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-surface-hover",
        c ? "border-danger focus:border-danger focus:ring-danger/40" : "border-border-emphasis",
        f && "font-mono",
        s[t],
        u
      ),
      ...p
    }
  ) : /* @__PURE__ */ b(
    "div",
    {
      className: e(
        "relative flex w-full items-center rounded-md border bg-surface-panel",
        "transition-colors duration-150",
        "focus-within:bg-white focus-within:border-info focus-within:ring-1 focus-within:ring-info/40",
        c ? "border-danger focus-within:border-danger focus-within:ring-danger/40" : "border-border-emphasis",
        n && "opacity-50 cursor-not-allowed bg-surface-hover"
      ),
      children: [
        o && /* @__PURE__ */ r(
          "span",
          {
            "aria-hidden": "true",
            className: e(
              "flex shrink-0 items-center text-text-tertiary",
              m[t]
            ),
            children: d
          }
        ),
        /* @__PURE__ */ r(
          "input",
          {
            ref: h,
            type: a,
            disabled: n,
            "data-testid": x,
            className: e(
              "flex-1 min-w-0 bg-transparent font-inherit text-text-primary outline-none",
              "placeholder:text-text-tertiary",
              "disabled:cursor-not-allowed",
              o ? "pl-0" : s[t].split(" ")[1],
              i ? "pr-0" : s[t].split(" ")[2],
              t === "sm" ? "h-7 text-[12px]" : "h-9 text-[13px]",
              f && "font-mono",
              u
            ),
            ...p
          }
        ),
        i && /* @__PURE__ */ r(
          "span",
          {
            "aria-hidden": "true",
            className: e(
              "flex shrink-0 items-center text-text-tertiary",
              m[t]
            ),
            children: l
          }
        )
      ]
    }
  );
});
export {
  j as I
};
