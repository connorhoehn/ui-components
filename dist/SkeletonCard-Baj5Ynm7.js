import { jsx as t } from "react/jsx-runtime";
import { c as a } from "./cn-B6yFEsav.js";
function i({ width: e = "100%", height: r = 64 }) {
  return /* @__PURE__ */ t(
    "div",
    {
      "data-testid": "skeleton-card",
      className: a(
        "rounded-lg bg-gradient-to-r from-surface-hover via-surface-emphasis to-surface-hover",
        "bg-[length:400px_100%] animate-[skeleton-shimmer_1.4s_ease-in-out_infinite]"
      ),
      style: { width: e, height: r }
    }
  );
}
export {
  i as S
};
