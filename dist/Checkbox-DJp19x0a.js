import { jsx as x, jsxs as S } from "react/jsx-runtime";
import { forwardRef as m, useRef as I, useCallback as C, useEffect as T } from "react";
import { c as p } from "./cn-B6yFEsav.js";
const k = {
  sm: "h-7 px-2 text-[12px]",
  md: "h-9 px-2.5 text-[13px]"
}, P = {
  sm: "px-1.5",
  md: "px-2"
}, B = m(function({
  type: u = "text",
  size: e = "md",
  prefix: s,
  suffix: r,
  invalid: a = !1,
  disabled: c = !1,
  mono: l = !1,
  className: d,
  "data-testid": f,
  ...h
}, n) {
  const t = s != null, i = r != null;
  return !t && !i ? /* @__PURE__ */ x(
    "input",
    {
      ref: n,
      type: u,
      disabled: c,
      "data-testid": f,
      className: p(
        "w-full rounded-md border bg-surface-panel font-inherit text-text-primary",
        "outline-none transition-colors duration-150",
        "placeholder:text-text-tertiary",
        "focus:bg-white focus:border-info focus:ring-1 focus:ring-info/40",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-surface-hover",
        a ? "border-danger focus:border-danger focus:ring-danger/40" : "border-border-emphasis",
        l && "font-mono",
        k[e],
        d
      ),
      ...h
    }
  ) : /* @__PURE__ */ S(
    "div",
    {
      className: p(
        "relative flex w-full items-center rounded-md border bg-surface-panel",
        "transition-colors duration-150",
        "focus-within:bg-white focus-within:border-info focus-within:ring-1 focus-within:ring-info/40",
        a ? "border-danger focus-within:border-danger focus-within:ring-danger/40" : "border-border-emphasis",
        c && "opacity-50 cursor-not-allowed bg-surface-hover"
      ),
      children: [
        t && /* @__PURE__ */ x(
          "span",
          {
            "aria-hidden": "true",
            className: p(
              "flex shrink-0 items-center text-text-tertiary",
              P[e]
            ),
            children: s
          }
        ),
        /* @__PURE__ */ x(
          "input",
          {
            ref: n,
            type: u,
            disabled: c,
            "data-testid": f,
            className: p(
              "flex-1 min-w-0 bg-transparent font-inherit text-text-primary outline-none",
              "placeholder:text-text-tertiary",
              "disabled:cursor-not-allowed",
              t ? "pl-0" : k[e].split(" ")[1],
              i ? "pr-0" : k[e].split(" ")[2],
              e === "sm" ? "h-7 text-[12px]" : "h-9 text-[13px]",
              l && "font-mono",
              d
            ),
            ...h
          }
        ),
        i && /* @__PURE__ */ x(
          "span",
          {
            "aria-hidden": "true",
            className: p(
              "flex shrink-0 items-center text-text-tertiary",
              P[e]
            ),
            children: r
          }
        )
      ]
    }
  );
}), D = m(
  function({
    rows: u,
    minRows: e = 2,
    maxRows: s,
    autoResize: r = !1,
    invalid: a = !1,
    disabled: c = !1,
    onChange: l,
    value: d,
    className: f,
    "data-testid": h,
    ...n
  }, t) {
    const i = I(null), b = C(
      (o) => {
        i.current = o, typeof t == "function" ? t(o) : t && (t.current = o);
      },
      [t]
    ), w = 20, v = 12, g = C(() => {
      const o = i.current;
      if (!o || !r) return;
      o.style.height = "auto";
      const j = e * w + v, N = o.scrollHeight, H = s ? s * w + v : 1 / 0;
      o.style.height = `${Math.min(Math.max(N, j), H)}px`, o.style.overflowY = N > H ? "auto" : "hidden";
    }, [r, e, s]);
    T(() => {
      g();
    }, [d, g]);
    const $ = C(
      (o) => {
        g(), l?.(o);
      },
      [l, g]
    );
    return /* @__PURE__ */ x(
      "textarea",
      {
        ref: b,
        rows: r ? void 0 : u ?? e,
        disabled: c,
        "data-testid": h,
        value: d,
        onChange: $,
        className: p(
          "w-full rounded-md border bg-surface-panel font-inherit text-text-primary",
          "outline-none transition-colors duration-150 px-2.5 py-1.5 text-[13px] leading-5",
          "placeholder:text-text-tertiary",
          "focus:bg-white focus:border-info focus:ring-1 focus:ring-info/40",
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-surface-hover",
          !r && "resize-y",
          r && "resize-none overflow-hidden",
          a ? "border-danger focus:border-danger focus:ring-danger/40" : "border-border-emphasis",
          f
        ),
        style: r ? { minHeight: `${e * w + v}px` } : void 0,
        ...n
      }
    );
  }
), M = {
  sm: "h-7 px-2 text-[12px]",
  md: "h-9 px-2.5 text-[13px]"
}, F = m(function({
  options: u,
  placeholder: e,
  size: s = "md",
  invalid: r = !1,
  disabled: a = !1,
  className: c,
  "data-testid": l,
  value: d,
  ...f
}, h) {
  return /* @__PURE__ */ S(
    "select",
    {
      ref: h,
      disabled: a,
      "data-testid": l,
      value: d,
      className: p(
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
        r ? "border-danger focus:border-danger focus:ring-danger/40" : "border-border-emphasis",
        M[s],
        c
      ),
      ...f,
      children: [
        e && /* @__PURE__ */ x("option", { value: "", disabled: !0, children: e }),
        u.map((n) => /* @__PURE__ */ x("option", { value: n.value, disabled: n.disabled, children: n.label }, n.value))
      ]
    }
  );
}), G = m(
  function({
    id: u,
    name: e,
    checked: s,
    onChange: r,
    indeterminate: a = !1,
    disabled: c = !1,
    "aria-label": l,
    onClick: d,
    onKeyDown: f,
    className: h,
    "data-testid": n
  }, t) {
    const i = I(null);
    return T(() => {
      i.current && (i.current.indeterminate = a);
    }, [a]), /* @__PURE__ */ x(
      "input",
      {
        ref: (b) => {
          i.current = b, typeof t == "function" ? t(b) : t && (t.current = b);
        },
        type: "checkbox",
        id: u,
        name: e,
        checked: s,
        disabled: c,
        "aria-label": l,
        "aria-checked": a ? "mixed" : void 0,
        onChange: (b) => r(b.target.checked),
        onClick: d,
        onKeyDown: f,
        className: p(
          "w-3.5 h-3.5 accent-primary cursor-pointer disabled:cursor-not-allowed",
          h
        ),
        "data-testid": n
      }
    );
  }
);
export {
  G as C,
  B as I,
  F as S,
  D as T
};
