import { jsx as a } from "react/jsx-runtime";
import { c as s } from "./cn-B6yFEsav.js";
function r({ width: e = "100%", height: t = 64 }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-testid": "skeleton-card",
      className: s(
        "rounded-lg bg-gradient-to-r from-slate-100 via-slate-200 to-slate-100",
        "bg-[length:400px_100%] animate-[skeleton-shimmer_1.4s_ease-in-out_infinite]"
      ),
      style: { width: e, height: t }
    }
  );
}
export {
  r as S
};
