import { jsx as T } from "react/jsx-runtime";
import { forwardRef as C, useRef as M, useCallback as c, useEffect as $ } from "react";
import { c as j } from "./cn-B6yFEsav.js";
const q = C(
  function({
    rows: p,
    minRows: n = 2,
    maxRows: s,
    autoResize: t = !1,
    invalid: g = !1,
    disabled: x = !1,
    onChange: l,
    value: d,
    className: b,
    "data-testid": y,
    ...m
  }, r) {
    const f = M(null), H = c(
      (e) => {
        f.current = e, typeof r == "function" ? r(e) : r && (r.current = e);
      },
      [r]
    ), i = 20, a = 12, o = c(() => {
      const e = f.current;
      if (!e || !t) return;
      e.style.height = "auto";
      const P = n * i + a, u = e.scrollHeight, h = s ? s * i + a : 1 / 0;
      e.style.height = `${Math.min(Math.max(u, P), h)}px`, e.style.overflowY = u > h ? "auto" : "hidden";
    }, [t, n, s]);
    $(() => {
      o();
    }, [d, o]);
    const v = c(
      (e) => {
        o(), l?.(e);
      },
      [l, o]
    );
    return /* @__PURE__ */ T(
      "textarea",
      {
        ref: H,
        rows: t ? void 0 : p ?? n,
        disabled: x,
        "data-testid": y,
        value: d,
        onChange: v,
        className: j(
          "w-full rounded-md border bg-surface-panel font-inherit text-text-primary",
          "outline-none transition-colors duration-150 px-2.5 py-1.5 text-[13px] leading-5",
          "placeholder:text-text-tertiary",
          "focus:bg-white focus:border-info focus:ring-1 focus:ring-info/40",
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-surface-hover",
          !t && "resize-y",
          t && "resize-none overflow-hidden",
          g ? "border-danger focus:border-danger focus:ring-danger/40" : "border-border-emphasis",
          b
        ),
        style: t ? { minHeight: `${n * i + a}px` } : void 0,
        ...m
      }
    );
  }
);
export {
  q as T
};
