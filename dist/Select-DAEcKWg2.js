import { jsxs as p, jsx as r } from "react/jsx-runtime";
import { forwardRef as m } from "react";
import { c as x } from "./cn-B6yFEsav.js";
const h = {
  sm: "h-7 px-2 text-[12px]",
  md: "h-9 px-2.5 text-[13px]"
}, j = m(function({
  options: l,
  groups: s,
  placeholder: o,
  size: d = "md",
  invalid: i = !1,
  disabled: n = !1,
  className: t,
  "data-testid": c,
  value: u,
  ...b
}, f) {
  return /* @__PURE__ */ p(
    "select",
    {
      ref: f,
      disabled: n,
      "data-testid": c,
      value: u,
      className: x(
        "w-full appearance-none rounded-md border bg-surface-panel font-inherit text-text-primary",
        "outline-none transition-colors duration-150 cursor-pointer",
        // Custom chevron via background-image is banned (inline style). Instead
        // rely on the native OS chevron — appearance: none removes it but is
        // only needed to remove the native outline; here we let native appearance
        // show through via a Tailwind `select` reset that keeps the arrow.
        // We use `appearance-auto` to restore the native arrow on modern browsers.
        "appearance-auto",
        "focus:bg-white focus:border-info focus:ring-1 focus:ring-info/40",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-surface-hover",
        i ? "border-danger focus:border-danger focus:ring-danger/40" : "border-border-emphasis",
        h[d],
        t
      ),
      ...b,
      children: [
        o && /* @__PURE__ */ r("option", { value: "", disabled: !0, children: o }),
        l.map((e) => /* @__PURE__ */ r("option", { value: e.value, disabled: e.disabled, children: e.label }, e.value)),
        s?.map((e) => /* @__PURE__ */ r("optgroup", { label: e.label, children: e.options.map((a) => /* @__PURE__ */ r("option", { value: a.value, disabled: a.disabled, children: a.label }, a.value)) }, e.label))
      ]
    }
  );
});
export {
  j as S
};
