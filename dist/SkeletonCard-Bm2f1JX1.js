import { jsx as o } from "react/jsx-runtime";
import { c as s } from "./cn-B6yFEsav.js";
const a = {
  md: "rounded-md",
  lg: "rounded-lg",
  full: "rounded-full"
};
function i({ width: e = "100%", height: r = 64, rounded: t = "lg" }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-testid": "skeleton-card",
      className: s(
        a[t],
        "bg-gradient-to-r from-surface-hover via-surface-emphasis to-surface-hover",
        "bg-[length:400px_100%] animate-[skeleton-shimmer_1.4s_ease-in-out_infinite]"
      ),
      style: { width: e, height: r }
    }
  );
}
export {
  i as S
};
