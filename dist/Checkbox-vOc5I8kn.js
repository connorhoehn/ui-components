import { jsx as h } from "react/jsx-runtime";
import { forwardRef as b, useRef as x, useEffect as d } from "react";
import { c as k } from "./cn-B6yFEsav.js";
const v = b(
  function({
    id: a,
    name: o,
    checked: n,
    onChange: i,
    indeterminate: r = !1,
    disabled: s = !1,
    "aria-label": u,
    onClick: f,
    onKeyDown: l,
    className: p,
    "data-testid": m
  }, t) {
    const c = x(null);
    return d(() => {
      c.current && (c.current.indeterminate = r);
    }, [r]), /* @__PURE__ */ h(
      "input",
      {
        ref: (e) => {
          c.current = e, typeof t == "function" ? t(e) : t && (t.current = e);
        },
        type: "checkbox",
        id: a,
        name: o,
        checked: n,
        disabled: s,
        "aria-label": u,
        "aria-checked": r ? "mixed" : void 0,
        onChange: (e) => i(e.target.checked),
        onClick: f,
        onKeyDown: l,
        className: k(
          "w-3.5 h-3.5 accent-primary cursor-pointer disabled:cursor-not-allowed",
          p
        ),
        "data-testid": m
      }
    );
  }
);
export {
  v as C
};
