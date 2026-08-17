import { jsx as n } from "react/jsx-runtime";
import { c as s } from "./cn-B6yFEsav.js";
const a = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8"
};
function p({
  children: r,
  padding: o = "none",
  className: e,
  ...d
}) {
  return /* @__PURE__ */ n(
    "div",
    {
      className: s(
        "border border-border rounded-lg bg-white overflow-hidden",
        a[o],
        e
      ),
      ...d,
      children: r
    }
  );
}
export {
  p as C
};
