import { jsxs as N, jsx as n } from "react/jsx-runtime";
import { c as t } from "./cn-B6yFEsav.js";
import { e as l, d as O, c as g, t as w } from "./tones-DknNcB3q.js";
const E = {
  sm: "px-2 py-0.5 text-[11px]",
  xs: "px-1.5 py-px text-[10px]"
}, b = {
  sm: "h-1.5 w-1.5",
  xs: "h-1 w-1"
};
function C({
  tone: r = "neutral",
  size: i = "sm",
  solid: p = !1,
  mono: o = !1,
  dot: a,
  uppercase: d = !1,
  icon: s,
  children: c,
  title: m,
  className: h,
  style: u,
  "data-testid": x,
  "aria-label": f
}) {
  const e = w(r), S = p ? O[e] : g[e], _ = !!(a || s);
  return /* @__PURE__ */ N(
    "span",
    {
      "data-testid": x,
      "aria-label": f,
      title: m,
      className: t(
        "inline-flex items-center rounded-sm font-semibold leading-[1.4] whitespace-nowrap",
        E[i],
        S,
        o && "font-mono",
        d && "uppercase tracking-wide",
        _ && "gap-1",
        h
      ),
      style: u,
      children: [
        a && /* @__PURE__ */ n(
          "span",
          {
            "aria-hidden": !0,
            className: t(
              "relative inline-block rounded-full shrink-0",
              b[i],
              l[e]
            ),
            children: a === "pulse" && /* @__PURE__ */ n(
              "span",
              {
                "aria-hidden": !0,
                className: t(
                  "absolute inset-0 rounded-full animate-ping opacity-70",
                  l[e]
                )
              }
            )
          }
        ),
        s && /* @__PURE__ */ n("span", { "aria-hidden": !0, className: "inline-flex shrink-0 [&_svg]:h-3 [&_svg]:w-3", children: s }),
        c
      ]
    }
  );
}
export {
  C
};
