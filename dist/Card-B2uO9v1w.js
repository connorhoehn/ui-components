import { jsx as d } from "react/jsx-runtime";
import { c as s } from "./cn-B6yFEsav.js";
const a = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8"
};
function m({
  children: o,
  padding: r = "none",
  className: e,
  ...n
}) {
  return /* @__PURE__ */ d(
    "div",
    {
      className: s(
        "border border-slate-200 rounded-lg bg-white overflow-hidden",
        a[r],
        e
      ),
      ...n,
      children: o
    }
  );
}
export {
  m as C
};
