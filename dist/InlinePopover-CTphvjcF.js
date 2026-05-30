import { jsxs as g, jsx as c, Fragment as X } from "react/jsx-runtime";
import * as s from "react";
import { useState as G, useCallback as U, createContext as mr, useMemo as Pe, useEffect as _, useContext as vr, useId as kt, useRef as fe, useLayoutEffect as hr } from "react";
import { c as w } from "./cn-B6yFEsav.js";
import * as br from "react-dom";
import gr, { createPortal as Rt } from "react-dom";
import { M as xr } from "./Modal-2jg4229_.js";
import { A as Pt, a as yr } from "./Avatar-Q-j4vnWn.js";
import { S as wr, A as Er } from "./Badge-FT03wujO.js";
import "clsx";
import "tailwind-merge";
const Cr = [
  "import",
  "export",
  "from",
  "as",
  "const",
  "let",
  "var",
  "function",
  "return",
  "default",
  "if",
  "else",
  "switch",
  "case",
  "break",
  "new",
  "typeof",
  "instanceof",
  "in",
  "of",
  "interface",
  "type",
  "extends",
  "implements",
  "class",
  "async",
  "await",
  "true",
  "false",
  "null",
  "undefined",
  "this",
  "super",
  "try",
  "catch",
  "finally",
  "throw",
  "for",
  "while",
  "do",
  "continue",
  "public",
  "private",
  "protected",
  "readonly",
  "static",
  "enum"
], Sr = [
  "if",
  "then",
  "else",
  "fi",
  "for",
  "do",
  "done",
  "while",
  "case",
  "esac",
  "function",
  "return",
  "export",
  "local",
  "in"
], Nr = [
  "cd",
  "ls",
  "echo",
  "cat",
  "grep",
  "sed",
  "awk",
  "find",
  "cp",
  "mv",
  "rm",
  "mkdir",
  "rmdir",
  "touch",
  "chmod",
  "chown",
  "pwd",
  "which",
  "npm",
  "yarn",
  "pnpm",
  "npx",
  "git",
  "node",
  "curl",
  "wget"
];
function kr(e) {
  return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function Rr(e, t) {
  let r = e.replace(/(\/\/.*?)(\n|$)/g, `<span style="color:${t.comment}">$1</span>$2`);
  r = r.replace(/(\/\*[\s\S]*?\*\/)/g, `<span style="color:${t.comment}">$1</span>`), r = r.replace(
    /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/g,
    `<span style="color:${t.string}">$1</span>`
  );
  const n = new RegExp(`\\b(${Cr.join("|")})\\b`, "g");
  return r = r.replace(n, `<span style="color:${t.keyword}">$1</span>`), r = r.replace(/\b(\d+(?:\.\d+)?)\b/g, `<span style="color:${t.number}">$1</span>`), r;
}
function Pr(e, t) {
  let r = e.replace(
    /("(?:[^"\\]|\\.)*")(\s*:)/g,
    `<span style="color:${t.property}">$1</span>$2`
  );
  return r = r.replace(/("(?:[^"\\]|\\.)*")/g, `<span style="color:${t.string}">$1</span>`), r = r.replace(/\b(true|false|null)\b/g, `<span style="color:${t.keyword}">$1</span>`), r = r.replace(/\b(-?\d+(?:\.\d+)?)\b/g, `<span style="color:${t.number}">$1</span>`), r;
}
function Ar(e, t) {
  let r = e.replace(/(#.*?)(\n|$)/g, `<span style="color:${t.comment}">$1</span>$2`);
  r = r.replace(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g, `<span style="color:${t.string}">$1</span>`);
  const n = new RegExp(`\\b(${Sr.join("|")})\\b`, "g");
  r = r.replace(n, `<span style="color:${t.keyword}">$1</span>`);
  const o = new RegExp(`\\b(${Nr.join("|")})\\b`, "g");
  return r = r.replace(o, `<span style="color:${t.builtin}">$1</span>`), r = r.replace(/(\$\w+|\$\{[^}]+\})/g, `<span style="color:${t.variable}">$1</span>`), r;
}
const Dr = {
  comment: "#6b7280",
  string: "#4ade80",
  keyword: "#93c5fd",
  number: "#fbbf24",
  property: "#7dd3fc",
  builtin: "#c4b5fd",
  variable: "#fbbf24"
}, Ir = {
  comment: "#64748b",
  string: "#15803d",
  keyword: "#1d4ed8",
  number: "#a16207",
  property: "#0369a1",
  builtin: "#7c3aed",
  variable: "#a16207"
};
function it(e, t, r) {
  const n = r === "dark" ? Dr : Ir, o = kr(e);
  switch (t) {
    case "json":
      return Pr(o, n);
    case "bash":
    case "sh":
      return Ar(o, n);
    case "text":
      return o;
    default:
      return Rr(o, n);
  }
}
function Wa({
  code: e,
  language: t = "tsx",
  theme: r = "dark",
  copyButton: n = !0,
  showLineNumbers: o = !1,
  className: a,
  style: l,
  "data-testid": i,
  ariaLabel: d
}) {
  const [u, p] = G(!1), m = U(() => {
    typeof navigator > "u" || !navigator.clipboard || navigator.clipboard.writeText(e).then(() => {
      p(!0), setTimeout(() => p(!1), 1500);
    }).catch(() => {
    });
  }, [e]), v = r === "dark", b = e.split(`
`);
  return /* @__PURE__ */ g(
    "div",
    {
      "data-testid": i,
      "data-language": t,
      "data-theme": r,
      className: w(
        "relative rounded-lg border font-mono text-[13px] leading-relaxed overflow-hidden",
        v ? "bg-slate-800 text-slate-100 border-slate-700" : "bg-slate-50 text-slate-900 border-slate-200",
        a
      ),
      style: l,
      "aria-label": d ?? `Code (${t})`,
      children: [
        n && /* @__PURE__ */ c(
          "button",
          {
            type: "button",
            onClick: m,
            "aria-label": u ? "Copied" : "Copy code",
            className: w(
              "absolute top-2 right-2 text-[11px] px-2 py-1 rounded border transition-opacity",
              v ? "bg-slate-700 text-slate-100 border-slate-600 hover:bg-slate-600" : "bg-white text-slate-700 border-slate-300 hover:bg-slate-100"
            ),
            "data-copied": u ? "true" : "false",
            children: u ? "Copied" : "Copy"
          }
        ),
        /* @__PURE__ */ c("pre", { className: "m-0 px-4 py-3 overflow-x-auto", children: o ? /* @__PURE__ */ g("div", { className: "flex", children: [
          /* @__PURE__ */ c(
            "div",
            {
              className: w(
                "select-none pr-3 text-right",
                v ? "text-slate-500" : "text-slate-400"
              ),
              "aria-hidden": "true",
              children: b.map((y, f) => /* @__PURE__ */ c("div", { children: f + 1 }, f))
            }
          ),
          /* @__PURE__ */ c(
            "code",
            {
              className: "flex-1 block",
              dangerouslySetInnerHTML: { __html: it(e, t, r) }
            }
          )
        ] }) : /* @__PURE__ */ c(
          "code",
          {
            className: "block",
            dangerouslySetInnerHTML: { __html: it(e, t, r) }
          }
        ) })
      ]
    }
  );
}
var lt = 1, Or = 0.9, Tr = 0.8, Lr = 0.17, $e = 0.1, Me = 0.999, $r = 0.9999, Mr = 0.99, _r = /[\\\/_+.#"@\[\(\{&]/, Fr = /[\\\/_+.#"@\[\(\{&]/g, Wr = /[\s-]/, At = /[\s-]/g;
function Ve(e, t, r, n, o, a, l) {
  if (a === t.length) return o === e.length ? lt : Mr;
  var i = `${o},${a}`;
  if (l[i] !== void 0) return l[i];
  for (var d = n.charAt(a), u = r.indexOf(d, o), p = 0, m, v, b, y; u >= 0; ) m = Ve(e, t, r, n, u + 1, a + 1, l), m > p && (u === o ? m *= lt : _r.test(e.charAt(u - 1)) ? (m *= Tr, b = e.slice(o, u - 1).match(Fr), b && o > 0 && (m *= Math.pow(Me, b.length))) : Wr.test(e.charAt(u - 1)) ? (m *= Or, y = e.slice(o, u - 1).match(At), y && o > 0 && (m *= Math.pow(Me, y.length))) : (m *= Lr, o > 0 && (m *= Math.pow(Me, u - o))), e.charAt(u) !== t.charAt(a) && (m *= $r)), (m < $e && r.charAt(u - 1) === n.charAt(a + 1) || n.charAt(a + 1) === n.charAt(a) && r.charAt(u - 1) !== n.charAt(a)) && (v = Ve(e, t, r, n, u + 1, a + 2, l), v * $e > m && (m = v * $e)), m > p && (p = m), u = r.indexOf(d, u + 1);
  return l[i] = p, p;
}
function st(e) {
  return e.toLowerCase().replace(At, " ");
}
function Br(e, t, r) {
  return e = r && r.length > 0 ? `${e + " " + r.join(" ")}` : e, Ve(e, t, st(e), st(t), 0, 0, {});
}
function z(e, t, { checkForDefaultPrevented: r = !0 } = {}) {
  return function(o) {
    if (e?.(o), r === !1 || !o.defaultPrevented)
      return t?.(o);
  };
}
function ct(e, t) {
  if (typeof e == "function")
    return e(t);
  e != null && (e.current = t);
}
function Y(...e) {
  return (t) => {
    let r = !1;
    const n = e.map((o) => {
      const a = ct(o, t);
      return !r && typeof a == "function" && (r = !0), a;
    });
    if (r)
      return () => {
        for (let o = 0; o < n.length; o++) {
          const a = n[o];
          typeof a == "function" ? a() : ct(e[o], null);
        }
      };
  };
}
function ee(...e) {
  return s.useCallback(Y(...e), e);
}
function jr(e, t) {
  const r = s.createContext(t), n = (a) => {
    const { children: l, ...i } = a, d = s.useMemo(() => i, Object.values(i));
    return /* @__PURE__ */ c(r.Provider, { value: d, children: l });
  };
  n.displayName = e + "Provider";
  function o(a) {
    const l = s.useContext(r);
    if (l) return l;
    if (t !== void 0) return t;
    throw new Error(`\`${a}\` must be used within \`${e}\``);
  }
  return [n, o];
}
function Ur(e, t = []) {
  let r = [];
  function n(a, l) {
    const i = s.createContext(l), d = r.length;
    r = [...r, l];
    const u = (m) => {
      const { scope: v, children: b, ...y } = m, f = v?.[e]?.[d] || i, x = s.useMemo(() => y, Object.values(y));
      return /* @__PURE__ */ c(f.Provider, { value: x, children: b });
    };
    u.displayName = a + "Provider";
    function p(m, v) {
      const b = v?.[e]?.[d] || i, y = s.useContext(b);
      if (y) return y;
      if (l !== void 0) return l;
      throw new Error(`\`${m}\` must be used within \`${a}\``);
    }
    return [u, p];
  }
  const o = () => {
    const a = r.map((l) => s.createContext(l));
    return function(i) {
      const d = i?.[e] || a;
      return s.useMemo(
        () => ({ [`__scope${e}`]: { ...i, [e]: d } }),
        [i, d]
      );
    };
  };
  return o.scopeName = e, [n, Kr(o, ...t)];
}
function Kr(...e) {
  const t = e[0];
  if (e.length === 1) return t;
  const r = () => {
    const n = e.map((o) => ({
      useScope: o(),
      scopeName: o.scopeName
    }));
    return function(a) {
      const l = n.reduce((i, { useScope: d, scopeName: u }) => {
        const m = d(a)[`__scope${u}`];
        return { ...i, ...m };
      }, {});
      return s.useMemo(() => ({ [`__scope${t.scopeName}`]: l }), [l]);
    };
  };
  return r.scopeName = t.scopeName, r;
}
var pe = globalThis?.document ? s.useLayoutEffect : () => {
}, Hr = s[" useId ".trim().toString()] || (() => {
}), Vr = 0;
function K(e) {
  const [t, r] = s.useState(Hr());
  return pe(() => {
    r((n) => n ?? String(Vr++));
  }, [e]), t ? `radix-${t}` : "";
}
var zr = s[" useInsertionEffect ".trim().toString()] || pe;
function Gr({
  prop: e,
  defaultProp: t,
  onChange: r = () => {
  },
  caller: n
}) {
  const [o, a, l] = Yr({
    defaultProp: t,
    onChange: r
  }), i = e !== void 0, d = i ? e : o;
  {
    const p = s.useRef(e !== void 0);
    s.useEffect(() => {
      const m = p.current;
      m !== i && console.warn(
        `${n} is changing from ${m ? "controlled" : "uncontrolled"} to ${i ? "controlled" : "uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`
      ), p.current = i;
    }, [i, n]);
  }
  const u = s.useCallback(
    (p) => {
      if (i) {
        const m = qr(p) ? p(e) : p;
        m !== e && l.current?.(m);
      } else
        a(p);
    },
    [i, e, a, l]
  );
  return [d, u];
}
function Yr({
  defaultProp: e,
  onChange: t
}) {
  const [r, n] = s.useState(e), o = s.useRef(r), a = s.useRef(t);
  return zr(() => {
    a.current = t;
  }, [t]), s.useEffect(() => {
    o.current !== r && (a.current?.(r), o.current = r);
  }, [r, o]), [r, n, a];
}
function qr(e) {
  return typeof e == "function";
}
// @__NO_SIDE_EFFECTS__
function ve(e) {
  const t = /* @__PURE__ */ Zr(e), r = s.forwardRef((n, o) => {
    const { children: a, ...l } = n, i = s.Children.toArray(a), d = i.find(Qr);
    if (d) {
      const u = d.props.children, p = i.map((m) => m === d ? s.Children.count(u) > 1 ? s.Children.only(null) : s.isValidElement(u) ? u.props.children : null : m);
      return /* @__PURE__ */ c(t, { ...l, ref: o, children: s.isValidElement(u) ? s.cloneElement(u, void 0, p) : null });
    }
    return /* @__PURE__ */ c(t, { ...l, ref: o, children: a });
  });
  return r.displayName = `${e}.Slot`, r;
}
// @__NO_SIDE_EFFECTS__
function Zr(e) {
  const t = s.forwardRef((r, n) => {
    const { children: o, ...a } = r;
    if (s.isValidElement(o)) {
      const l = en(o), i = Jr(a, o.props);
      return o.type !== s.Fragment && (i.ref = n ? Y(n, l) : l), s.cloneElement(o, i);
    }
    return s.Children.count(o) > 1 ? s.Children.only(null) : null;
  });
  return t.displayName = `${e}.SlotClone`, t;
}
var Xr = /* @__PURE__ */ Symbol("radix.slottable");
function Qr(e) {
  return s.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === Xr;
}
function Jr(e, t) {
  const r = { ...t };
  for (const n in t) {
    const o = e[n], a = t[n];
    /^on[A-Z]/.test(n) ? o && a ? r[n] = (...i) => {
      const d = a(...i);
      return o(...i), d;
    } : o && (r[n] = o) : n === "style" ? r[n] = { ...o, ...a } : n === "className" && (r[n] = [o, a].filter(Boolean).join(" "));
  }
  return { ...e, ...r };
}
function en(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, r = t && "isReactWarning" in t && t.isReactWarning;
  return r ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, r = t && "isReactWarning" in t && t.isReactWarning, r ? e.props.ref : e.props.ref || e.ref);
}
var tn = [
  "a",
  "button",
  "div",
  "form",
  "h2",
  "h3",
  "img",
  "input",
  "label",
  "li",
  "nav",
  "ol",
  "p",
  "select",
  "span",
  "svg",
  "ul"
], Dt = tn.reduce((e, t) => {
  const r = /* @__PURE__ */ ve(`Primitive.${t}`), n = s.forwardRef((o, a) => {
    const { asChild: l, ...i } = o, d = l ? r : t;
    return typeof window < "u" && (window[/* @__PURE__ */ Symbol.for("radix-ui")] = !0), /* @__PURE__ */ c(d, { ...i, ref: a });
  });
  return n.displayName = `Primitive.${t}`, { ...e, [t]: n };
}, {});
function rn(e, t) {
  e && br.flushSync(() => e.dispatchEvent(t));
}
function me(e) {
  const t = s.useRef(e);
  return s.useEffect(() => {
    t.current = e;
  }), s.useMemo(() => (...r) => t.current?.(...r), []);
}
function nn(e, t = globalThis?.document) {
  const r = me(e);
  s.useEffect(() => {
    const n = (o) => {
      o.key === "Escape" && r(o);
    };
    return t.addEventListener("keydown", n, { capture: !0 }), () => t.removeEventListener("keydown", n, { capture: !0 });
  }, [r, t]);
}
var on = "DismissableLayer", ze = "dismissableLayer.update", an = "dismissableLayer.pointerDownOutside", ln = "dismissableLayer.focusOutside", ut, It = s.createContext({
  layers: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
}), Ot = s.forwardRef(
  (e, t) => {
    const {
      disableOutsidePointerEvents: r = !1,
      onEscapeKeyDown: n,
      onPointerDownOutside: o,
      onFocusOutside: a,
      onInteractOutside: l,
      onDismiss: i,
      ...d
    } = e, u = s.useContext(It), [p, m] = s.useState(null), v = p?.ownerDocument ?? globalThis?.document, [, b] = s.useState({}), y = ee(t, (S) => m(S)), f = Array.from(u.layers), [x] = [...u.layersWithOutsidePointerEventsDisabled].slice(-1), E = f.indexOf(x), N = p ? f.indexOf(p) : -1, P = u.layersWithOutsidePointerEventsDisabled.size > 0, R = N >= E, I = un((S) => {
      const M = S.target, B = [...u.branches].some((j) => j.contains(M));
      !R || B || (o?.(S), l?.(S), S.defaultPrevented || i?.());
    }, v), A = dn((S) => {
      const M = S.target;
      [...u.branches].some((j) => j.contains(M)) || (a?.(S), l?.(S), S.defaultPrevented || i?.());
    }, v);
    return nn((S) => {
      N === u.layers.size - 1 && (n?.(S), !S.defaultPrevented && i && (S.preventDefault(), i()));
    }, v), s.useEffect(() => {
      if (p)
        return r && (u.layersWithOutsidePointerEventsDisabled.size === 0 && (ut = v.body.style.pointerEvents, v.body.style.pointerEvents = "none"), u.layersWithOutsidePointerEventsDisabled.add(p)), u.layers.add(p), dt(), () => {
          r && u.layersWithOutsidePointerEventsDisabled.size === 1 && (v.body.style.pointerEvents = ut);
        };
    }, [p, v, r, u]), s.useEffect(() => () => {
      p && (u.layers.delete(p), u.layersWithOutsidePointerEventsDisabled.delete(p), dt());
    }, [p, u]), s.useEffect(() => {
      const S = () => b({});
      return document.addEventListener(ze, S), () => document.removeEventListener(ze, S);
    }, []), /* @__PURE__ */ c(
      Dt.div,
      {
        ...d,
        ref: y,
        style: {
          pointerEvents: P ? R ? "auto" : "none" : void 0,
          ...e.style
        },
        onFocusCapture: z(e.onFocusCapture, A.onFocusCapture),
        onBlurCapture: z(e.onBlurCapture, A.onBlurCapture),
        onPointerDownCapture: z(
          e.onPointerDownCapture,
          I.onPointerDownCapture
        )
      }
    );
  }
);
Ot.displayName = on;
var sn = "DismissableLayerBranch", cn = s.forwardRef((e, t) => {
  const r = s.useContext(It), n = s.useRef(null), o = ee(t, n);
  return s.useEffect(() => {
    const a = n.current;
    if (a)
      return r.branches.add(a), () => {
        r.branches.delete(a);
      };
  }, [r.branches]), /* @__PURE__ */ c(Dt.div, { ...e, ref: o });
});
cn.displayName = sn;
function un(e, t = globalThis?.document) {
  const r = me(e), n = s.useRef(!1), o = s.useRef(() => {
  });
  return s.useEffect(() => {
    const a = (i) => {
      if (i.target && !n.current) {
        let d = function() {
          Tt(
            an,
            r,
            u,
            { discrete: !0 }
          );
        };
        const u = { originalEvent: i };
        i.pointerType === "touch" ? (t.removeEventListener("click", o.current), o.current = d, t.addEventListener("click", o.current, { once: !0 })) : d();
      } else
        t.removeEventListener("click", o.current);
      n.current = !1;
    }, l = window.setTimeout(() => {
      t.addEventListener("pointerdown", a);
    }, 0);
    return () => {
      window.clearTimeout(l), t.removeEventListener("pointerdown", a), t.removeEventListener("click", o.current);
    };
  }, [t, r]), {
    // ensures we check React component tree (not just DOM tree)
    onPointerDownCapture: () => n.current = !0
  };
}
function dn(e, t = globalThis?.document) {
  const r = me(e), n = s.useRef(!1);
  return s.useEffect(() => {
    const o = (a) => {
      a.target && !n.current && Tt(ln, r, { originalEvent: a }, {
        discrete: !1
      });
    };
    return t.addEventListener("focusin", o), () => t.removeEventListener("focusin", o);
  }, [t, r]), {
    onFocusCapture: () => n.current = !0,
    onBlurCapture: () => n.current = !1
  };
}
function dt() {
  const e = new CustomEvent(ze);
  document.dispatchEvent(e);
}
function Tt(e, t, r, { discrete: n }) {
  const o = r.originalEvent.target, a = new CustomEvent(e, { bubbles: !1, cancelable: !0, detail: r });
  t && o.addEventListener(e, t, { once: !0 }), n ? rn(o, a) : o.dispatchEvent(a);
}
var fn = [
  "a",
  "button",
  "div",
  "form",
  "h2",
  "h3",
  "img",
  "input",
  "label",
  "li",
  "nav",
  "ol",
  "p",
  "select",
  "span",
  "svg",
  "ul"
], pn = fn.reduce((e, t) => {
  const r = /* @__PURE__ */ ve(`Primitive.${t}`), n = s.forwardRef((o, a) => {
    const { asChild: l, ...i } = o, d = l ? r : t;
    return typeof window < "u" && (window[/* @__PURE__ */ Symbol.for("radix-ui")] = !0), /* @__PURE__ */ c(d, { ...i, ref: a });
  });
  return n.displayName = `Primitive.${t}`, { ...e, [t]: n };
}, {}), _e = "focusScope.autoFocusOnMount", Fe = "focusScope.autoFocusOnUnmount", ft = { bubbles: !1, cancelable: !0 }, mn = "FocusScope", Lt = s.forwardRef((e, t) => {
  const {
    loop: r = !1,
    trapped: n = !1,
    onMountAutoFocus: o,
    onUnmountAutoFocus: a,
    ...l
  } = e, [i, d] = s.useState(null), u = me(o), p = me(a), m = s.useRef(null), v = ee(t, (f) => d(f)), b = s.useRef({
    paused: !1,
    pause() {
      this.paused = !0;
    },
    resume() {
      this.paused = !1;
    }
  }).current;
  s.useEffect(() => {
    if (n) {
      let f = function(P) {
        if (b.paused || !i) return;
        const R = P.target;
        i.contains(R) ? m.current = R : V(m.current, { select: !0 });
      }, x = function(P) {
        if (b.paused || !i) return;
        const R = P.relatedTarget;
        R !== null && (i.contains(R) || V(m.current, { select: !0 }));
      }, E = function(P) {
        if (document.activeElement === document.body)
          for (const I of P)
            I.removedNodes.length > 0 && V(i);
      };
      document.addEventListener("focusin", f), document.addEventListener("focusout", x);
      const N = new MutationObserver(E);
      return i && N.observe(i, { childList: !0, subtree: !0 }), () => {
        document.removeEventListener("focusin", f), document.removeEventListener("focusout", x), N.disconnect();
      };
    }
  }, [n, i, b.paused]), s.useEffect(() => {
    if (i) {
      mt.add(b);
      const f = document.activeElement;
      if (!i.contains(f)) {
        const E = new CustomEvent(_e, ft);
        i.addEventListener(_e, u), i.dispatchEvent(E), E.defaultPrevented || (vn(yn($t(i)), { select: !0 }), document.activeElement === f && V(i));
      }
      return () => {
        i.removeEventListener(_e, u), setTimeout(() => {
          const E = new CustomEvent(Fe, ft);
          i.addEventListener(Fe, p), i.dispatchEvent(E), E.defaultPrevented || V(f ?? document.body, { select: !0 }), i.removeEventListener(Fe, p), mt.remove(b);
        }, 0);
      };
    }
  }, [i, u, p, b]);
  const y = s.useCallback(
    (f) => {
      if (!r && !n || b.paused) return;
      const x = f.key === "Tab" && !f.altKey && !f.ctrlKey && !f.metaKey, E = document.activeElement;
      if (x && E) {
        const N = f.currentTarget, [P, R] = hn(N);
        P && R ? !f.shiftKey && E === R ? (f.preventDefault(), r && V(P, { select: !0 })) : f.shiftKey && E === P && (f.preventDefault(), r && V(R, { select: !0 })) : E === N && f.preventDefault();
      }
    },
    [r, n, b.paused]
  );
  return /* @__PURE__ */ c(pn.div, { tabIndex: -1, ...l, ref: v, onKeyDown: y });
});
Lt.displayName = mn;
function vn(e, { select: t = !1 } = {}) {
  const r = document.activeElement;
  for (const n of e)
    if (V(n, { select: t }), document.activeElement !== r) return;
}
function hn(e) {
  const t = $t(e), r = pt(t, e), n = pt(t.reverse(), e);
  return [r, n];
}
function $t(e) {
  const t = [], r = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (n) => {
      const o = n.tagName === "INPUT" && n.type === "hidden";
      return n.disabled || n.hidden || o ? NodeFilter.FILTER_SKIP : n.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  for (; r.nextNode(); ) t.push(r.currentNode);
  return t;
}
function pt(e, t) {
  for (const r of e)
    if (!bn(r, { upTo: t })) return r;
}
function bn(e, { upTo: t }) {
  if (getComputedStyle(e).visibility === "hidden") return !0;
  for (; e; ) {
    if (t !== void 0 && e === t) return !1;
    if (getComputedStyle(e).display === "none") return !0;
    e = e.parentElement;
  }
  return !1;
}
function gn(e) {
  return e instanceof HTMLInputElement && "select" in e;
}
function V(e, { select: t = !1 } = {}) {
  if (e && e.focus) {
    const r = document.activeElement;
    e.focus({ preventScroll: !0 }), e !== r && gn(e) && t && e.select();
  }
}
var mt = xn();
function xn() {
  let e = [];
  return {
    add(t) {
      const r = e[0];
      t !== r && r?.pause(), e = vt(e, t), e.unshift(t);
    },
    remove(t) {
      e = vt(e, t), e[0]?.resume();
    }
  };
}
function vt(e, t) {
  const r = [...e], n = r.indexOf(t);
  return n !== -1 && r.splice(n, 1), r;
}
function yn(e) {
  return e.filter((t) => t.tagName !== "A");
}
var wn = [
  "a",
  "button",
  "div",
  "form",
  "h2",
  "h3",
  "img",
  "input",
  "label",
  "li",
  "nav",
  "ol",
  "p",
  "select",
  "span",
  "svg",
  "ul"
], En = wn.reduce((e, t) => {
  const r = /* @__PURE__ */ ve(`Primitive.${t}`), n = s.forwardRef((o, a) => {
    const { asChild: l, ...i } = o, d = l ? r : t;
    return typeof window < "u" && (window[/* @__PURE__ */ Symbol.for("radix-ui")] = !0), /* @__PURE__ */ c(d, { ...i, ref: a });
  });
  return n.displayName = `Primitive.${t}`, { ...e, [t]: n };
}, {}), Cn = "Portal", Mt = s.forwardRef((e, t) => {
  const { container: r, ...n } = e, [o, a] = s.useState(!1);
  pe(() => a(!0), []);
  const l = r || o && globalThis?.document?.body;
  return l ? gr.createPortal(/* @__PURE__ */ c(En.div, { ...n, ref: t }), l) : null;
});
Mt.displayName = Cn;
function Sn(e, t) {
  return s.useReducer((r, n) => t[r][n] ?? r, e);
}
var Ae = (e) => {
  const { present: t, children: r } = e, n = Nn(t), o = typeof r == "function" ? r({ present: n.isPresent }) : s.Children.only(r), a = ee(n.ref, kn(o));
  return typeof r == "function" || n.isPresent ? s.cloneElement(o, { ref: a }) : null;
};
Ae.displayName = "Presence";
function Nn(e) {
  const [t, r] = s.useState(), n = s.useRef(null), o = s.useRef(e), a = s.useRef("none"), l = e ? "mounted" : "unmounted", [i, d] = Sn(l, {
    mounted: {
      UNMOUNT: "unmounted",
      ANIMATION_OUT: "unmountSuspended"
    },
    unmountSuspended: {
      MOUNT: "mounted",
      ANIMATION_END: "unmounted"
    },
    unmounted: {
      MOUNT: "mounted"
    }
  });
  return s.useEffect(() => {
    const u = xe(n.current);
    a.current = i === "mounted" ? u : "none";
  }, [i]), pe(() => {
    const u = n.current, p = o.current;
    if (p !== e) {
      const v = a.current, b = xe(u);
      e ? d("MOUNT") : b === "none" || u?.display === "none" ? d("UNMOUNT") : d(p && v !== b ? "ANIMATION_OUT" : "UNMOUNT"), o.current = e;
    }
  }, [e, d]), pe(() => {
    if (t) {
      let u;
      const p = t.ownerDocument.defaultView ?? window, m = (b) => {
        const f = xe(n.current).includes(CSS.escape(b.animationName));
        if (b.target === t && f && (d("ANIMATION_END"), !o.current)) {
          const x = t.style.animationFillMode;
          t.style.animationFillMode = "forwards", u = p.setTimeout(() => {
            t.style.animationFillMode === "forwards" && (t.style.animationFillMode = x);
          });
        }
      }, v = (b) => {
        b.target === t && (a.current = xe(n.current));
      };
      return t.addEventListener("animationstart", v), t.addEventListener("animationcancel", m), t.addEventListener("animationend", m), () => {
        p.clearTimeout(u), t.removeEventListener("animationstart", v), t.removeEventListener("animationcancel", m), t.removeEventListener("animationend", m);
      };
    } else
      d("ANIMATION_END");
  }, [t, d]), {
    isPresent: ["mounted", "unmountSuspended"].includes(i),
    ref: s.useCallback((u) => {
      n.current = u ? getComputedStyle(u) : null, r(u);
    }, [])
  };
}
function xe(e) {
  return e?.animationName || "none";
}
function kn(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, r = t && "isReactWarning" in t && t.isReactWarning;
  return r ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, r = t && "isReactWarning" in t && t.isReactWarning, r ? e.props.ref : e.props.ref || e.ref);
}
var Rn = [
  "a",
  "button",
  "div",
  "form",
  "h2",
  "h3",
  "img",
  "input",
  "label",
  "li",
  "nav",
  "ol",
  "p",
  "select",
  "span",
  "svg",
  "ul"
], he = Rn.reduce((e, t) => {
  const r = /* @__PURE__ */ ve(`Primitive.${t}`), n = s.forwardRef((o, a) => {
    const { asChild: l, ...i } = o, d = l ? r : t;
    return typeof window < "u" && (window[/* @__PURE__ */ Symbol.for("radix-ui")] = !0), /* @__PURE__ */ c(d, { ...i, ref: a });
  });
  return n.displayName = `Primitive.${t}`, { ...e, [t]: n };
}, {}), We = 0;
function Pn() {
  s.useEffect(() => {
    const e = document.querySelectorAll("[data-radix-focus-guard]");
    return document.body.insertAdjacentElement("afterbegin", e[0] ?? ht()), document.body.insertAdjacentElement("beforeend", e[1] ?? ht()), We++, () => {
      We === 1 && document.querySelectorAll("[data-radix-focus-guard]").forEach((t) => t.remove()), We--;
    };
  }, []);
}
function ht() {
  const e = document.createElement("span");
  return e.setAttribute("data-radix-focus-guard", ""), e.tabIndex = 0, e.style.outline = "none", e.style.opacity = "0", e.style.position = "fixed", e.style.pointerEvents = "none", e;
}
var W = function() {
  return W = Object.assign || function(t) {
    for (var r, n = 1, o = arguments.length; n < o; n++) {
      r = arguments[n];
      for (var a in r) Object.prototype.hasOwnProperty.call(r, a) && (t[a] = r[a]);
    }
    return t;
  }, W.apply(this, arguments);
};
function _t(e, t) {
  var r = {};
  for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && t.indexOf(n) < 0 && (r[n] = e[n]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var o = 0, n = Object.getOwnPropertySymbols(e); o < n.length; o++)
      t.indexOf(n[o]) < 0 && Object.prototype.propertyIsEnumerable.call(e, n[o]) && (r[n[o]] = e[n[o]]);
  return r;
}
function An(e, t, r) {
  if (r || arguments.length === 2) for (var n = 0, o = t.length, a; n < o; n++)
    (a || !(n in t)) && (a || (a = Array.prototype.slice.call(t, 0, n)), a[n] = t[n]);
  return e.concat(a || Array.prototype.slice.call(t));
}
var Se = "right-scroll-bar-position", Ne = "width-before-scroll-bar", Dn = "with-scroll-bars-hidden", In = "--removed-body-scroll-bar-size";
function Be(e, t) {
  return typeof e == "function" ? e(t) : e && (e.current = t), e;
}
function On(e, t) {
  var r = G(function() {
    return {
      // value
      value: e,
      // last callback
      callback: t,
      // "memoized" public interface
      facade: {
        get current() {
          return r.value;
        },
        set current(n) {
          var o = r.value;
          o !== n && (r.value = n, r.callback(n, o));
        }
      }
    };
  })[0];
  return r.callback = t, r.facade;
}
var Tn = typeof window < "u" ? s.useLayoutEffect : s.useEffect, bt = /* @__PURE__ */ new WeakMap();
function Ln(e, t) {
  var r = On(null, function(n) {
    return e.forEach(function(o) {
      return Be(o, n);
    });
  });
  return Tn(function() {
    var n = bt.get(r);
    if (n) {
      var o = new Set(n), a = new Set(e), l = r.current;
      o.forEach(function(i) {
        a.has(i) || Be(i, null);
      }), a.forEach(function(i) {
        o.has(i) || Be(i, l);
      });
    }
    bt.set(r, e);
  }, [e]), r;
}
function $n(e) {
  return e;
}
function Mn(e, t) {
  t === void 0 && (t = $n);
  var r = [], n = !1, o = {
    read: function() {
      if (n)
        throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");
      return r.length ? r[r.length - 1] : e;
    },
    useMedium: function(a) {
      var l = t(a, n);
      return r.push(l), function() {
        r = r.filter(function(i) {
          return i !== l;
        });
      };
    },
    assignSyncMedium: function(a) {
      for (n = !0; r.length; ) {
        var l = r;
        r = [], l.forEach(a);
      }
      r = {
        push: function(i) {
          return a(i);
        },
        filter: function() {
          return r;
        }
      };
    },
    assignMedium: function(a) {
      n = !0;
      var l = [];
      if (r.length) {
        var i = r;
        r = [], i.forEach(a), l = r;
      }
      var d = function() {
        var p = l;
        l = [], p.forEach(a);
      }, u = function() {
        return Promise.resolve().then(d);
      };
      u(), r = {
        push: function(p) {
          l.push(p), u();
        },
        filter: function(p) {
          return l = l.filter(p), r;
        }
      };
    }
  };
  return o;
}
function _n(e) {
  e === void 0 && (e = {});
  var t = Mn(null);
  return t.options = W({ async: !0, ssr: !1 }, e), t;
}
var Ft = function(e) {
  var t = e.sideCar, r = _t(e, ["sideCar"]);
  if (!t)
    throw new Error("Sidecar: please provide `sideCar` property to import the right car");
  var n = t.read();
  if (!n)
    throw new Error("Sidecar medium not found");
  return s.createElement(n, W({}, r));
};
Ft.isSideCarExport = !0;
function Fn(e, t) {
  return e.useMedium(t), Ft;
}
var Wt = _n(), je = function() {
}, De = s.forwardRef(function(e, t) {
  var r = s.useRef(null), n = s.useState({
    onScrollCapture: je,
    onWheelCapture: je,
    onTouchMoveCapture: je
  }), o = n[0], a = n[1], l = e.forwardProps, i = e.children, d = e.className, u = e.removeScrollBar, p = e.enabled, m = e.shards, v = e.sideCar, b = e.noRelative, y = e.noIsolation, f = e.inert, x = e.allowPinchZoom, E = e.as, N = E === void 0 ? "div" : E, P = e.gapMode, R = _t(e, ["forwardProps", "children", "className", "removeScrollBar", "enabled", "shards", "sideCar", "noRelative", "noIsolation", "inert", "allowPinchZoom", "as", "gapMode"]), I = v, A = Ln([r, t]), S = W(W({}, R), o);
  return s.createElement(
    s.Fragment,
    null,
    p && s.createElement(I, { sideCar: Wt, removeScrollBar: u, shards: m, noRelative: b, noIsolation: y, inert: f, setCallbacks: a, allowPinchZoom: !!x, lockRef: r, gapMode: P }),
    l ? s.cloneElement(s.Children.only(i), W(W({}, S), { ref: A })) : s.createElement(N, W({}, S, { className: d, ref: A }), i)
  );
});
De.defaultProps = {
  enabled: !0,
  removeScrollBar: !0,
  inert: !1
};
De.classNames = {
  fullWidth: Ne,
  zeroRight: Se
};
var Wn = function() {
  if (typeof __webpack_nonce__ < "u")
    return __webpack_nonce__;
};
function Bn() {
  if (!document)
    return null;
  var e = document.createElement("style");
  e.type = "text/css";
  var t = Wn();
  return t && e.setAttribute("nonce", t), e;
}
function jn(e, t) {
  e.styleSheet ? e.styleSheet.cssText = t : e.appendChild(document.createTextNode(t));
}
function Un(e) {
  var t = document.head || document.getElementsByTagName("head")[0];
  t.appendChild(e);
}
var Kn = function() {
  var e = 0, t = null;
  return {
    add: function(r) {
      e == 0 && (t = Bn()) && (jn(t, r), Un(t)), e++;
    },
    remove: function() {
      e--, !e && t && (t.parentNode && t.parentNode.removeChild(t), t = null);
    }
  };
}, Hn = function() {
  var e = Kn();
  return function(t, r) {
    s.useEffect(function() {
      return e.add(t), function() {
        e.remove();
      };
    }, [t && r]);
  };
}, Bt = function() {
  var e = Hn(), t = function(r) {
    var n = r.styles, o = r.dynamic;
    return e(n, o), null;
  };
  return t;
}, Vn = {
  left: 0,
  top: 0,
  right: 0,
  gap: 0
}, Ue = function(e) {
  return parseInt(e || "", 10) || 0;
}, zn = function(e) {
  var t = window.getComputedStyle(document.body), r = t[e === "padding" ? "paddingLeft" : "marginLeft"], n = t[e === "padding" ? "paddingTop" : "marginTop"], o = t[e === "padding" ? "paddingRight" : "marginRight"];
  return [Ue(r), Ue(n), Ue(o)];
}, Gn = function(e) {
  if (e === void 0 && (e = "margin"), typeof window > "u")
    return Vn;
  var t = zn(e), r = document.documentElement.clientWidth, n = window.innerWidth;
  return {
    left: t[0],
    top: t[1],
    right: t[2],
    gap: Math.max(0, n - r + t[2] - t[0])
  };
}, Yn = Bt(), ce = "data-scroll-locked", qn = function(e, t, r, n) {
  var o = e.left, a = e.top, l = e.right, i = e.gap;
  return r === void 0 && (r = "margin"), `
  .`.concat(Dn, ` {
   overflow: hidden `).concat(n, `;
   padding-right: `).concat(i, "px ").concat(n, `;
  }
  body[`).concat(ce, `] {
    overflow: hidden `).concat(n, `;
    overscroll-behavior: contain;
    `).concat([
    t && "position: relative ".concat(n, ";"),
    r === "margin" && `
    padding-left: `.concat(o, `px;
    padding-top: `).concat(a, `px;
    padding-right: `).concat(l, `px;
    margin-left:0;
    margin-top:0;
    margin-right: `).concat(i, "px ").concat(n, `;
    `),
    r === "padding" && "padding-right: ".concat(i, "px ").concat(n, ";")
  ].filter(Boolean).join(""), `
  }
  
  .`).concat(Se, ` {
    right: `).concat(i, "px ").concat(n, `;
  }
  
  .`).concat(Ne, ` {
    margin-right: `).concat(i, "px ").concat(n, `;
  }
  
  .`).concat(Se, " .").concat(Se, ` {
    right: 0 `).concat(n, `;
  }
  
  .`).concat(Ne, " .").concat(Ne, ` {
    margin-right: 0 `).concat(n, `;
  }
  
  body[`).concat(ce, `] {
    `).concat(In, ": ").concat(i, `px;
  }
`);
}, gt = function() {
  var e = parseInt(document.body.getAttribute(ce) || "0", 10);
  return isFinite(e) ? e : 0;
}, Zn = function() {
  s.useEffect(function() {
    return document.body.setAttribute(ce, (gt() + 1).toString()), function() {
      var e = gt() - 1;
      e <= 0 ? document.body.removeAttribute(ce) : document.body.setAttribute(ce, e.toString());
    };
  }, []);
}, Xn = function(e) {
  var t = e.noRelative, r = e.noImportant, n = e.gapMode, o = n === void 0 ? "margin" : n;
  Zn();
  var a = s.useMemo(function() {
    return Gn(o);
  }, [o]);
  return s.createElement(Yn, { styles: qn(a, !t, o, r ? "" : "!important") });
}, Ge = !1;
if (typeof window < "u")
  try {
    var ye = Object.defineProperty({}, "passive", {
      get: function() {
        return Ge = !0, !0;
      }
    });
    window.addEventListener("test", ye, ye), window.removeEventListener("test", ye, ye);
  } catch {
    Ge = !1;
  }
var ne = Ge ? { passive: !1 } : !1, Qn = function(e) {
  return e.tagName === "TEXTAREA";
}, jt = function(e, t) {
  if (!(e instanceof Element))
    return !1;
  var r = window.getComputedStyle(e);
  return (
    // not-not-scrollable
    r[t] !== "hidden" && // contains scroll inside self
    !(r.overflowY === r.overflowX && !Qn(e) && r[t] === "visible")
  );
}, Jn = function(e) {
  return jt(e, "overflowY");
}, eo = function(e) {
  return jt(e, "overflowX");
}, xt = function(e, t) {
  var r = t.ownerDocument, n = t;
  do {
    typeof ShadowRoot < "u" && n instanceof ShadowRoot && (n = n.host);
    var o = Ut(e, n);
    if (o) {
      var a = Kt(e, n), l = a[1], i = a[2];
      if (l > i)
        return !0;
    }
    n = n.parentNode;
  } while (n && n !== r.body);
  return !1;
}, to = function(e) {
  var t = e.scrollTop, r = e.scrollHeight, n = e.clientHeight;
  return [
    t,
    r,
    n
  ];
}, ro = function(e) {
  var t = e.scrollLeft, r = e.scrollWidth, n = e.clientWidth;
  return [
    t,
    r,
    n
  ];
}, Ut = function(e, t) {
  return e === "v" ? Jn(t) : eo(t);
}, Kt = function(e, t) {
  return e === "v" ? to(t) : ro(t);
}, no = function(e, t) {
  return e === "h" && t === "rtl" ? -1 : 1;
}, oo = function(e, t, r, n, o) {
  var a = no(e, window.getComputedStyle(t).direction), l = a * n, i = r.target, d = t.contains(i), u = !1, p = l > 0, m = 0, v = 0;
  do {
    if (!i)
      break;
    var b = Kt(e, i), y = b[0], f = b[1], x = b[2], E = f - x - a * y;
    (y || E) && Ut(e, i) && (m += E, v += y);
    var N = i.parentNode;
    i = N && N.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? N.host : N;
  } while (
    // portaled content
    !d && i !== document.body || // self content
    d && (t.contains(i) || t === i)
  );
  return (p && Math.abs(m) < 1 || !p && Math.abs(v) < 1) && (u = !0), u;
}, we = function(e) {
  return "changedTouches" in e ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY] : [0, 0];
}, yt = function(e) {
  return [e.deltaX, e.deltaY];
}, wt = function(e) {
  return e && "current" in e ? e.current : e;
}, ao = function(e, t) {
  return e[0] === t[0] && e[1] === t[1];
}, io = function(e) {
  return `
  .block-interactivity-`.concat(e, ` {pointer-events: none;}
  .allow-interactivity-`).concat(e, ` {pointer-events: all;}
`);
}, lo = 0, oe = [];
function so(e) {
  var t = s.useRef([]), r = s.useRef([0, 0]), n = s.useRef(), o = s.useState(lo++)[0], a = s.useState(Bt)[0], l = s.useRef(e);
  s.useEffect(function() {
    l.current = e;
  }, [e]), s.useEffect(function() {
    if (e.inert) {
      document.body.classList.add("block-interactivity-".concat(o));
      var f = An([e.lockRef.current], (e.shards || []).map(wt), !0).filter(Boolean);
      return f.forEach(function(x) {
        return x.classList.add("allow-interactivity-".concat(o));
      }), function() {
        document.body.classList.remove("block-interactivity-".concat(o)), f.forEach(function(x) {
          return x.classList.remove("allow-interactivity-".concat(o));
        });
      };
    }
  }, [e.inert, e.lockRef.current, e.shards]);
  var i = s.useCallback(function(f, x) {
    if ("touches" in f && f.touches.length === 2 || f.type === "wheel" && f.ctrlKey)
      return !l.current.allowPinchZoom;
    var E = we(f), N = r.current, P = "deltaX" in f ? f.deltaX : N[0] - E[0], R = "deltaY" in f ? f.deltaY : N[1] - E[1], I, A = f.target, S = Math.abs(P) > Math.abs(R) ? "h" : "v";
    if ("touches" in f && S === "h" && A.type === "range")
      return !1;
    var M = window.getSelection(), B = M && M.anchorNode, j = B ? B === A || B.contains(A) : !1;
    if (j)
      return !1;
    var H = xt(S, A);
    if (!H)
      return !0;
    if (H ? I = S : (I = S === "v" ? "h" : "v", H = xt(S, A)), !H)
      return !1;
    if (!n.current && "changedTouches" in f && (P || R) && (n.current = I), !I)
      return !0;
    var te = n.current || I;
    return oo(te, x, f, te === "h" ? P : R);
  }, []), d = s.useCallback(function(f) {
    var x = f;
    if (!(!oe.length || oe[oe.length - 1] !== a)) {
      var E = "deltaY" in x ? yt(x) : we(x), N = t.current.filter(function(I) {
        return I.name === x.type && (I.target === x.target || x.target === I.shadowParent) && ao(I.delta, E);
      })[0];
      if (N && N.should) {
        x.cancelable && x.preventDefault();
        return;
      }
      if (!N) {
        var P = (l.current.shards || []).map(wt).filter(Boolean).filter(function(I) {
          return I.contains(x.target);
        }), R = P.length > 0 ? i(x, P[0]) : !l.current.noIsolation;
        R && x.cancelable && x.preventDefault();
      }
    }
  }, []), u = s.useCallback(function(f, x, E, N) {
    var P = { name: f, delta: x, target: E, should: N, shadowParent: co(E) };
    t.current.push(P), setTimeout(function() {
      t.current = t.current.filter(function(R) {
        return R !== P;
      });
    }, 1);
  }, []), p = s.useCallback(function(f) {
    r.current = we(f), n.current = void 0;
  }, []), m = s.useCallback(function(f) {
    u(f.type, yt(f), f.target, i(f, e.lockRef.current));
  }, []), v = s.useCallback(function(f) {
    u(f.type, we(f), f.target, i(f, e.lockRef.current));
  }, []);
  s.useEffect(function() {
    return oe.push(a), e.setCallbacks({
      onScrollCapture: m,
      onWheelCapture: m,
      onTouchMoveCapture: v
    }), document.addEventListener("wheel", d, ne), document.addEventListener("touchmove", d, ne), document.addEventListener("touchstart", p, ne), function() {
      oe = oe.filter(function(f) {
        return f !== a;
      }), document.removeEventListener("wheel", d, ne), document.removeEventListener("touchmove", d, ne), document.removeEventListener("touchstart", p, ne);
    };
  }, []);
  var b = e.removeScrollBar, y = e.inert;
  return s.createElement(
    s.Fragment,
    null,
    y ? s.createElement(a, { styles: io(o) }) : null,
    b ? s.createElement(Xn, { noRelative: e.noRelative, gapMode: e.gapMode }) : null
  );
}
function co(e) {
  for (var t = null; e !== null; )
    e instanceof ShadowRoot && (t = e.host, e = e.host), e = e.parentNode;
  return t;
}
const uo = Fn(Wt, so);
var Ht = s.forwardRef(function(e, t) {
  return s.createElement(De, W({}, e, { ref: t, sideCar: uo }));
});
Ht.classNames = De.classNames;
var fo = function(e) {
  if (typeof document > "u")
    return null;
  var t = Array.isArray(e) ? e[0] : e;
  return t.ownerDocument.body;
}, ae = /* @__PURE__ */ new WeakMap(), Ee = /* @__PURE__ */ new WeakMap(), Ce = {}, Ke = 0, Vt = function(e) {
  return e && (e.host || Vt(e.parentNode));
}, po = function(e, t) {
  return t.map(function(r) {
    if (e.contains(r))
      return r;
    var n = Vt(r);
    return n && e.contains(n) ? n : (console.error("aria-hidden", r, "in not contained inside", e, ". Doing nothing"), null);
  }).filter(function(r) {
    return !!r;
  });
}, mo = function(e, t, r, n) {
  var o = po(t, Array.isArray(e) ? e : [e]);
  Ce[r] || (Ce[r] = /* @__PURE__ */ new WeakMap());
  var a = Ce[r], l = [], i = /* @__PURE__ */ new Set(), d = new Set(o), u = function(m) {
    !m || i.has(m) || (i.add(m), u(m.parentNode));
  };
  o.forEach(u);
  var p = function(m) {
    !m || d.has(m) || Array.prototype.forEach.call(m.children, function(v) {
      if (i.has(v))
        p(v);
      else
        try {
          var b = v.getAttribute(n), y = b !== null && b !== "false", f = (ae.get(v) || 0) + 1, x = (a.get(v) || 0) + 1;
          ae.set(v, f), a.set(v, x), l.push(v), f === 1 && y && Ee.set(v, !0), x === 1 && v.setAttribute(r, "true"), y || v.setAttribute(n, "true");
        } catch (E) {
          console.error("aria-hidden: cannot operate on ", v, E);
        }
    });
  };
  return p(t), i.clear(), Ke++, function() {
    l.forEach(function(m) {
      var v = ae.get(m) - 1, b = a.get(m) - 1;
      ae.set(m, v), a.set(m, b), v || (Ee.has(m) || m.removeAttribute(n), Ee.delete(m)), b || m.removeAttribute(r);
    }), Ke--, Ke || (ae = /* @__PURE__ */ new WeakMap(), ae = /* @__PURE__ */ new WeakMap(), Ee = /* @__PURE__ */ new WeakMap(), Ce = {});
  };
}, vo = function(e, t, r) {
  r === void 0 && (r = "data-aria-hidden");
  var n = Array.from(Array.isArray(e) ? e : [e]), o = fo(e);
  return o ? (n.push.apply(n, Array.from(o.querySelectorAll("[aria-live], script"))), mo(n, o, r, "aria-hidden")) : function() {
    return null;
  };
}, Ie = "Dialog", [zt] = Ur(Ie), [ho, F] = zt(Ie), Gt = (e) => {
  const {
    __scopeDialog: t,
    children: r,
    open: n,
    defaultOpen: o,
    onOpenChange: a,
    modal: l = !0
  } = e, i = s.useRef(null), d = s.useRef(null), [u, p] = Gr({
    prop: n,
    defaultProp: o ?? !1,
    onChange: a,
    caller: Ie
  });
  return /* @__PURE__ */ c(
    ho,
    {
      scope: t,
      triggerRef: i,
      contentRef: d,
      contentId: K(),
      titleId: K(),
      descriptionId: K(),
      open: u,
      onOpenChange: p,
      onOpenToggle: s.useCallback(() => p((m) => !m), [p]),
      modal: l,
      children: r
    }
  );
};
Gt.displayName = Ie;
var Yt = "DialogTrigger", bo = s.forwardRef(
  (e, t) => {
    const { __scopeDialog: r, ...n } = e, o = F(Yt, r), a = ee(t, o.triggerRef);
    return /* @__PURE__ */ c(
      he.button,
      {
        type: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": o.open,
        "aria-controls": o.contentId,
        "data-state": Qe(o.open),
        ...n,
        ref: a,
        onClick: z(e.onClick, o.onOpenToggle)
      }
    );
  }
);
bo.displayName = Yt;
var Ze = "DialogPortal", [go, qt] = zt(Ze, {
  forceMount: void 0
}), Zt = (e) => {
  const { __scopeDialog: t, forceMount: r, children: n, container: o } = e, a = F(Ze, t);
  return /* @__PURE__ */ c(go, { scope: t, forceMount: r, children: s.Children.map(n, (l) => /* @__PURE__ */ c(Ae, { present: r || a.open, children: /* @__PURE__ */ c(Mt, { asChild: !0, container: o, children: l }) })) });
};
Zt.displayName = Ze;
var ke = "DialogOverlay", Xt = s.forwardRef(
  (e, t) => {
    const r = qt(ke, e.__scopeDialog), { forceMount: n = r.forceMount, ...o } = e, a = F(ke, e.__scopeDialog);
    return a.modal ? /* @__PURE__ */ c(Ae, { present: n || a.open, children: /* @__PURE__ */ c(yo, { ...o, ref: t }) }) : null;
  }
);
Xt.displayName = ke;
var xo = /* @__PURE__ */ ve("DialogOverlay.RemoveScroll"), yo = s.forwardRef(
  (e, t) => {
    const { __scopeDialog: r, ...n } = e, o = F(ke, r);
    return (
      // Make sure `Content` is scrollable even when it doesn't live inside `RemoveScroll`
      // ie. when `Overlay` and `Content` are siblings
      /* @__PURE__ */ c(Ht, { as: xo, allowPinchZoom: !0, shards: [o.contentRef], children: /* @__PURE__ */ c(
        he.div,
        {
          "data-state": Qe(o.open),
          ...n,
          ref: t,
          style: { pointerEvents: "auto", ...n.style }
        }
      ) })
    );
  }
), Q = "DialogContent", Qt = s.forwardRef(
  (e, t) => {
    const r = qt(Q, e.__scopeDialog), { forceMount: n = r.forceMount, ...o } = e, a = F(Q, e.__scopeDialog);
    return /* @__PURE__ */ c(Ae, { present: n || a.open, children: a.modal ? /* @__PURE__ */ c(wo, { ...o, ref: t }) : /* @__PURE__ */ c(Eo, { ...o, ref: t }) });
  }
);
Qt.displayName = Q;
var wo = s.forwardRef(
  (e, t) => {
    const r = F(Q, e.__scopeDialog), n = s.useRef(null), o = ee(t, r.contentRef, n);
    return s.useEffect(() => {
      const a = n.current;
      if (a) return vo(a);
    }, []), /* @__PURE__ */ c(
      Jt,
      {
        ...e,
        ref: o,
        trapFocus: r.open,
        disableOutsidePointerEvents: !0,
        onCloseAutoFocus: z(e.onCloseAutoFocus, (a) => {
          a.preventDefault(), r.triggerRef.current?.focus();
        }),
        onPointerDownOutside: z(e.onPointerDownOutside, (a) => {
          const l = a.detail.originalEvent, i = l.button === 0 && l.ctrlKey === !0;
          (l.button === 2 || i) && a.preventDefault();
        }),
        onFocusOutside: z(
          e.onFocusOutside,
          (a) => a.preventDefault()
        )
      }
    );
  }
), Eo = s.forwardRef(
  (e, t) => {
    const r = F(Q, e.__scopeDialog), n = s.useRef(!1), o = s.useRef(!1);
    return /* @__PURE__ */ c(
      Jt,
      {
        ...e,
        ref: t,
        trapFocus: !1,
        disableOutsidePointerEvents: !1,
        onCloseAutoFocus: (a) => {
          e.onCloseAutoFocus?.(a), a.defaultPrevented || (n.current || r.triggerRef.current?.focus(), a.preventDefault()), n.current = !1, o.current = !1;
        },
        onInteractOutside: (a) => {
          e.onInteractOutside?.(a), a.defaultPrevented || (n.current = !0, a.detail.originalEvent.type === "pointerdown" && (o.current = !0));
          const l = a.target;
          r.triggerRef.current?.contains(l) && a.preventDefault(), a.detail.originalEvent.type === "focusin" && o.current && a.preventDefault();
        }
      }
    );
  }
), Jt = s.forwardRef(
  (e, t) => {
    const { __scopeDialog: r, trapFocus: n, onOpenAutoFocus: o, onCloseAutoFocus: a, ...l } = e, i = F(Q, r), d = s.useRef(null), u = ee(t, d);
    return Pn(), /* @__PURE__ */ g(X, { children: [
      /* @__PURE__ */ c(
        Lt,
        {
          asChild: !0,
          loop: !0,
          trapped: n,
          onMountAutoFocus: o,
          onUnmountAutoFocus: a,
          children: /* @__PURE__ */ c(
            Ot,
            {
              role: "dialog",
              id: i.contentId,
              "aria-describedby": i.descriptionId,
              "aria-labelledby": i.titleId,
              "data-state": Qe(i.open),
              ...l,
              ref: u,
              onDismiss: () => i.onOpenChange(!1)
            }
          )
        }
      ),
      /* @__PURE__ */ g(X, { children: [
        /* @__PURE__ */ c(ko, { titleId: i.titleId }),
        /* @__PURE__ */ c(Po, { contentRef: d, descriptionId: i.descriptionId })
      ] })
    ] });
  }
), Xe = "DialogTitle", Co = s.forwardRef(
  (e, t) => {
    const { __scopeDialog: r, ...n } = e, o = F(Xe, r);
    return /* @__PURE__ */ c(he.h2, { id: o.titleId, ...n, ref: t });
  }
);
Co.displayName = Xe;
var er = "DialogDescription", So = s.forwardRef(
  (e, t) => {
    const { __scopeDialog: r, ...n } = e, o = F(er, r);
    return /* @__PURE__ */ c(he.p, { id: o.descriptionId, ...n, ref: t });
  }
);
So.displayName = er;
var tr = "DialogClose", No = s.forwardRef(
  (e, t) => {
    const { __scopeDialog: r, ...n } = e, o = F(tr, r);
    return /* @__PURE__ */ c(
      he.button,
      {
        type: "button",
        ...n,
        ref: t,
        onClick: z(e.onClick, () => o.onOpenChange(!1))
      }
    );
  }
);
No.displayName = tr;
function Qe(e) {
  return e ? "open" : "closed";
}
var rr = "DialogTitleWarning", [Ba, nr] = jr(rr, {
  contentName: Q,
  titleName: Xe,
  docsSlug: "dialog"
}), ko = ({ titleId: e }) => {
  const t = nr(rr), r = `\`${t.contentName}\` requires a \`${t.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${t.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${t.docsSlug}`;
  return s.useEffect(() => {
    e && (document.getElementById(e) || console.error(r));
  }, [r, e]), null;
}, Ro = "DialogDescriptionWarning", Po = ({ contentRef: e, descriptionId: t }) => {
  const n = `Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${nr(Ro).contentName}}.`;
  return s.useEffect(() => {
    const o = e.current?.getAttribute("aria-describedby");
    t && o && (document.getElementById(t) || console.warn(n));
  }, [n, e, t]), null;
}, Ao = Gt, Do = Zt, Io = Xt, Oo = Qt, To = /* @__PURE__ */ Symbol.for("react.lazy"), Re = s[" use ".trim().toString()];
function Lo(e) {
  return typeof e == "object" && e !== null && "then" in e;
}
function or(e) {
  return e != null && typeof e == "object" && "$$typeof" in e && e.$$typeof === To && "_payload" in e && Lo(e._payload);
}
// @__NO_SIDE_EFFECTS__
function $o(e) {
  const t = /* @__PURE__ */ Mo(e), r = s.forwardRef((n, o) => {
    let { children: a, ...l } = n;
    or(a) && typeof Re == "function" && (a = Re(a._payload));
    const i = s.Children.toArray(a), d = i.find(Fo);
    if (d) {
      const u = d.props.children, p = i.map((m) => m === d ? s.Children.count(u) > 1 ? s.Children.only(null) : s.isValidElement(u) ? u.props.children : null : m);
      return /* @__PURE__ */ c(t, { ...l, ref: o, children: s.isValidElement(u) ? s.cloneElement(u, void 0, p) : null });
    }
    return /* @__PURE__ */ c(t, { ...l, ref: o, children: a });
  });
  return r.displayName = `${e}.Slot`, r;
}
// @__NO_SIDE_EFFECTS__
function Mo(e) {
  const t = s.forwardRef((r, n) => {
    let { children: o, ...a } = r;
    if (or(o) && typeof Re == "function" && (o = Re(o._payload)), s.isValidElement(o)) {
      const l = Bo(o), i = Wo(a, o.props);
      return o.type !== s.Fragment && (i.ref = n ? Y(n, l) : l), s.cloneElement(o, i);
    }
    return s.Children.count(o) > 1 ? s.Children.only(null) : null;
  });
  return t.displayName = `${e}.SlotClone`, t;
}
var _o = /* @__PURE__ */ Symbol("radix.slottable");
function Fo(e) {
  return s.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === _o;
}
function Wo(e, t) {
  const r = { ...t };
  for (const n in t) {
    const o = e[n], a = t[n];
    /^on[A-Z]/.test(n) ? o && a ? r[n] = (...i) => {
      const d = a(...i);
      return o(...i), d;
    } : o && (r[n] = o) : n === "style" ? r[n] = { ...o, ...a } : n === "className" && (r[n] = [o, a].filter(Boolean).join(" "));
  }
  return { ...e, ...r };
}
function Bo(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, r = t && "isReactWarning" in t && t.isReactWarning;
  return r ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, r = t && "isReactWarning" in t && t.isReactWarning, r ? e.props.ref : e.props.ref || e.ref);
}
var jo = [
  "a",
  "button",
  "div",
  "form",
  "h2",
  "h3",
  "img",
  "input",
  "label",
  "li",
  "nav",
  "ol",
  "p",
  "select",
  "span",
  "svg",
  "ul"
], Z = jo.reduce((e, t) => {
  const r = /* @__PURE__ */ $o(`Primitive.${t}`), n = s.forwardRef((o, a) => {
    const { asChild: l, ...i } = o, d = l ? r : t;
    return typeof window < "u" && (window[/* @__PURE__ */ Symbol.for("radix-ui")] = !0), /* @__PURE__ */ c(d, { ...i, ref: a });
  });
  return n.displayName = `Primitive.${t}`, { ...e, [t]: n };
}, {}), de = '[cmdk-group=""]', He = '[cmdk-group-items=""]', Uo = '[cmdk-group-heading=""]', ar = '[cmdk-item=""]', Et = `${ar}:not([aria-disabled="true"])`, Ye = "cmdk-item-select", le = "data-value", Ko = (e, t, r) => Br(e, t, r), ir = s.createContext(void 0), be = () => s.useContext(ir), lr = s.createContext(void 0), Je = () => s.useContext(lr), sr = s.createContext(void 0), cr = s.forwardRef((e, t) => {
  let r = se(() => {
    var h, k;
    return { search: "", value: (k = (h = e.value) != null ? h : e.defaultValue) != null ? k : "", selectedItemId: void 0, filtered: { count: 0, items: /* @__PURE__ */ new Map(), groups: /* @__PURE__ */ new Set() } };
  }), n = se(() => /* @__PURE__ */ new Set()), o = se(() => /* @__PURE__ */ new Map()), a = se(() => /* @__PURE__ */ new Map()), l = se(() => /* @__PURE__ */ new Set()), i = ur(e), { label: d, children: u, value: p, onValueChange: m, filter: v, shouldFilter: b, loop: y, disablePointerSelection: f = !1, vimBindings: x = !0, ...E } = e, N = K(), P = K(), R = K(), I = s.useRef(null), A = ea();
  J(() => {
    if (p !== void 0) {
      let h = p.trim();
      r.current.value = h, S.emit();
    }
  }, [p]), J(() => {
    A(6, tt);
  }, []);
  let S = s.useMemo(() => ({ subscribe: (h) => (l.current.add(h), () => l.current.delete(h)), snapshot: () => r.current, setState: (h, k, D) => {
    var C, O, T, $;
    if (!Object.is(r.current[h], k)) {
      if (r.current[h] = k, h === "search") te(), j(), A(1, H);
      else if (h === "value") {
        if (document.activeElement.hasAttribute("cmdk-input") || document.activeElement.hasAttribute("cmdk-root")) {
          let L = document.getElementById(R);
          L ? L.focus() : (C = document.getElementById(N)) == null || C.focus();
        }
        if (A(7, () => {
          var L;
          r.current.selectedItemId = (L = re()) == null ? void 0 : L.id, S.emit();
        }), D || A(5, tt), ((O = i.current) == null ? void 0 : O.value) !== void 0) {
          let L = k ?? "";
          ($ = (T = i.current).onValueChange) == null || $.call(T, L);
          return;
        }
      }
      S.emit();
    }
  }, emit: () => {
    l.current.forEach((h) => h());
  } }), []), M = s.useMemo(() => ({ value: (h, k, D) => {
    var C;
    k !== ((C = a.current.get(h)) == null ? void 0 : C.value) && (a.current.set(h, { value: k, keywords: D }), r.current.filtered.items.set(h, B(k, D)), A(2, () => {
      j(), S.emit();
    }));
  }, item: (h, k) => (n.current.add(h), k && (o.current.has(k) ? o.current.get(k).add(h) : o.current.set(k, /* @__PURE__ */ new Set([h]))), A(3, () => {
    te(), j(), r.current.value || H(), S.emit();
  }), () => {
    a.current.delete(h), n.current.delete(h), r.current.filtered.items.delete(h);
    let D = re();
    A(4, () => {
      te(), D?.getAttribute("id") === h && H(), S.emit();
    });
  }), group: (h) => (o.current.has(h) || o.current.set(h, /* @__PURE__ */ new Set()), () => {
    a.current.delete(h), o.current.delete(h);
  }), filter: () => i.current.shouldFilter, label: d || e["aria-label"], getDisablePointerSelection: () => i.current.disablePointerSelection, listId: N, inputId: R, labelId: P, listInnerRef: I }), []);
  function B(h, k) {
    var D, C;
    let O = (C = (D = i.current) == null ? void 0 : D.filter) != null ? C : Ko;
    return h ? O(h, r.current.search, k) : 0;
  }
  function j() {
    if (!r.current.search || i.current.shouldFilter === !1) return;
    let h = r.current.filtered.items, k = [];
    r.current.filtered.groups.forEach((C) => {
      let O = o.current.get(C), T = 0;
      O.forEach(($) => {
        let L = h.get($);
        T = Math.max(L, T);
      }), k.push([C, T]);
    });
    let D = I.current;
    ue().sort((C, O) => {
      var T, $;
      let L = C.getAttribute("id"), ge = O.getAttribute("id");
      return ((T = h.get(ge)) != null ? T : 0) - (($ = h.get(L)) != null ? $ : 0);
    }).forEach((C) => {
      let O = C.closest(He);
      O ? O.appendChild(C.parentElement === O ? C : C.closest(`${He} > *`)) : D.appendChild(C.parentElement === D ? C : C.closest(`${He} > *`));
    }), k.sort((C, O) => O[1] - C[1]).forEach((C) => {
      var O;
      let T = (O = I.current) == null ? void 0 : O.querySelector(`${de}[${le}="${encodeURIComponent(C[0])}"]`);
      T?.parentElement.appendChild(T);
    });
  }
  function H() {
    let h = ue().find((D) => D.getAttribute("aria-disabled") !== "true"), k = h?.getAttribute(le);
    S.setState("value", k || void 0);
  }
  function te() {
    var h, k, D, C;
    if (!r.current.search || i.current.shouldFilter === !1) {
      r.current.filtered.count = n.current.size;
      return;
    }
    r.current.filtered.groups = /* @__PURE__ */ new Set();
    let O = 0;
    for (let T of n.current) {
      let $ = (k = (h = a.current.get(T)) == null ? void 0 : h.value) != null ? k : "", L = (C = (D = a.current.get(T)) == null ? void 0 : D.keywords) != null ? C : [], ge = B($, L);
      r.current.filtered.items.set(T, ge), ge > 0 && O++;
    }
    for (let [T, $] of o.current) for (let L of $) if (r.current.filtered.items.get(L) > 0) {
      r.current.filtered.groups.add(T);
      break;
    }
    r.current.filtered.count = O;
  }
  function tt() {
    var h, k, D;
    let C = re();
    C && (((h = C.parentElement) == null ? void 0 : h.firstChild) === C && ((D = (k = C.closest(de)) == null ? void 0 : k.querySelector(Uo)) == null || D.scrollIntoView({ block: "nearest" })), C.scrollIntoView({ block: "nearest" }));
  }
  function re() {
    var h;
    return (h = I.current) == null ? void 0 : h.querySelector(`${ar}[aria-selected="true"]`);
  }
  function ue() {
    var h;
    return Array.from(((h = I.current) == null ? void 0 : h.querySelectorAll(Et)) || []);
  }
  function Te(h) {
    let k = ue()[h];
    k && S.setState("value", k.getAttribute(le));
  }
  function Le(h) {
    var k;
    let D = re(), C = ue(), O = C.findIndex(($) => $ === D), T = C[O + h];
    (k = i.current) != null && k.loop && (T = O + h < 0 ? C[C.length - 1] : O + h === C.length ? C[0] : C[O + h]), T && S.setState("value", T.getAttribute(le));
  }
  function rt(h) {
    let k = re(), D = k?.closest(de), C;
    for (; D && !C; ) D = h > 0 ? Qo(D, de) : Jo(D, de), C = D?.querySelector(Et);
    C ? S.setState("value", C.getAttribute(le)) : Le(h);
  }
  let nt = () => Te(ue().length - 1), ot = (h) => {
    h.preventDefault(), h.metaKey ? nt() : h.altKey ? rt(1) : Le(1);
  }, at = (h) => {
    h.preventDefault(), h.metaKey ? Te(0) : h.altKey ? rt(-1) : Le(-1);
  };
  return s.createElement(Z.div, { ref: t, tabIndex: -1, ...E, "cmdk-root": "", onKeyDown: (h) => {
    var k;
    (k = E.onKeyDown) == null || k.call(E, h);
    let D = h.nativeEvent.isComposing || h.keyCode === 229;
    if (!(h.defaultPrevented || D)) switch (h.key) {
      case "n":
      case "j": {
        x && h.ctrlKey && ot(h);
        break;
      }
      case "ArrowDown": {
        ot(h);
        break;
      }
      case "p":
      case "k": {
        x && h.ctrlKey && at(h);
        break;
      }
      case "ArrowUp": {
        at(h);
        break;
      }
      case "Home": {
        h.preventDefault(), Te(0);
        break;
      }
      case "End": {
        h.preventDefault(), nt();
        break;
      }
      case "Enter": {
        h.preventDefault();
        let C = re();
        if (C) {
          let O = new Event(Ye);
          C.dispatchEvent(O);
        }
      }
    }
  } }, s.createElement("label", { "cmdk-label": "", htmlFor: M.inputId, id: M.labelId, style: ra }, d), Oe(e, (h) => s.createElement(lr.Provider, { value: S }, s.createElement(ir.Provider, { value: M }, h))));
}), Ho = s.forwardRef((e, t) => {
  var r, n;
  let o = K(), a = s.useRef(null), l = s.useContext(sr), i = be(), d = ur(e), u = (n = (r = d.current) == null ? void 0 : r.forceMount) != null ? n : l?.forceMount;
  J(() => {
    if (!u) return i.item(o, l?.id);
  }, [u]);
  let p = dr(o, a, [e.value, e.children, a], e.keywords), m = Je(), v = q((A) => A.value && A.value === p.current), b = q((A) => u || i.filter() === !1 ? !0 : A.search ? A.filtered.items.get(o) > 0 : !0);
  s.useEffect(() => {
    let A = a.current;
    if (!(!A || e.disabled)) return A.addEventListener(Ye, y), () => A.removeEventListener(Ye, y);
  }, [b, e.onSelect, e.disabled]);
  function y() {
    var A, S;
    f(), (S = (A = d.current).onSelect) == null || S.call(A, p.current);
  }
  function f() {
    m.setState("value", p.current, !0);
  }
  if (!b) return null;
  let { disabled: x, value: E, onSelect: N, forceMount: P, keywords: R, ...I } = e;
  return s.createElement(Z.div, { ref: Y(a, t), ...I, id: o, "cmdk-item": "", role: "option", "aria-disabled": !!x, "aria-selected": !!v, "data-disabled": !!x, "data-selected": !!v, onPointerMove: x || i.getDisablePointerSelection() ? void 0 : f, onClick: x ? void 0 : y }, e.children);
}), Vo = s.forwardRef((e, t) => {
  let { heading: r, children: n, forceMount: o, ...a } = e, l = K(), i = s.useRef(null), d = s.useRef(null), u = K(), p = be(), m = q((b) => o || p.filter() === !1 ? !0 : b.search ? b.filtered.groups.has(l) : !0);
  J(() => p.group(l), []), dr(l, i, [e.value, e.heading, d]);
  let v = s.useMemo(() => ({ id: l, forceMount: o }), [o]);
  return s.createElement(Z.div, { ref: Y(i, t), ...a, "cmdk-group": "", role: "presentation", hidden: m ? void 0 : !0 }, r && s.createElement("div", { ref: d, "cmdk-group-heading": "", "aria-hidden": !0, id: u }, r), Oe(e, (b) => s.createElement("div", { "cmdk-group-items": "", role: "group", "aria-labelledby": r ? u : void 0 }, s.createElement(sr.Provider, { value: v }, b))));
}), zo = s.forwardRef((e, t) => {
  let { alwaysRender: r, ...n } = e, o = s.useRef(null), a = q((l) => !l.search);
  return !r && !a ? null : s.createElement(Z.div, { ref: Y(o, t), ...n, "cmdk-separator": "", role: "separator" });
}), Go = s.forwardRef((e, t) => {
  let { onValueChange: r, ...n } = e, o = e.value != null, a = Je(), l = q((u) => u.search), i = q((u) => u.selectedItemId), d = be();
  return s.useEffect(() => {
    e.value != null && a.setState("search", e.value);
  }, [e.value]), s.createElement(Z.input, { ref: t, ...n, "cmdk-input": "", autoComplete: "off", autoCorrect: "off", spellCheck: !1, "aria-autocomplete": "list", role: "combobox", "aria-expanded": !0, "aria-controls": d.listId, "aria-labelledby": d.labelId, "aria-activedescendant": i, id: d.inputId, type: "text", value: o ? e.value : l, onChange: (u) => {
    o || a.setState("search", u.target.value), r?.(u.target.value);
  } });
}), Yo = s.forwardRef((e, t) => {
  let { children: r, label: n = "Suggestions", ...o } = e, a = s.useRef(null), l = s.useRef(null), i = q((u) => u.selectedItemId), d = be();
  return s.useEffect(() => {
    if (l.current && a.current) {
      let u = l.current, p = a.current, m, v = new ResizeObserver(() => {
        m = requestAnimationFrame(() => {
          let b = u.offsetHeight;
          p.style.setProperty("--cmdk-list-height", b.toFixed(1) + "px");
        });
      });
      return v.observe(u), () => {
        cancelAnimationFrame(m), v.unobserve(u);
      };
    }
  }, []), s.createElement(Z.div, { ref: Y(a, t), ...o, "cmdk-list": "", role: "listbox", tabIndex: -1, "aria-activedescendant": i, "aria-label": n, id: d.listId }, Oe(e, (u) => s.createElement("div", { ref: Y(l, d.listInnerRef), "cmdk-list-sizer": "" }, u)));
}), qo = s.forwardRef((e, t) => {
  let { open: r, onOpenChange: n, overlayClassName: o, contentClassName: a, container: l, ...i } = e;
  return s.createElement(Ao, { open: r, onOpenChange: n }, s.createElement(Do, { container: l }, s.createElement(Io, { "cmdk-overlay": "", className: o }), s.createElement(Oo, { "aria-label": e.label, "cmdk-dialog": "", className: a }, s.createElement(cr, { ref: t, ...i }))));
}), Zo = s.forwardRef((e, t) => q((r) => r.filtered.count === 0) ? s.createElement(Z.div, { ref: t, ...e, "cmdk-empty": "", role: "presentation" }) : null), Xo = s.forwardRef((e, t) => {
  let { progress: r, children: n, label: o = "Loading...", ...a } = e;
  return s.createElement(Z.div, { ref: t, ...a, "cmdk-loading": "", role: "progressbar", "aria-valuenow": r, "aria-valuemin": 0, "aria-valuemax": 100, "aria-label": o }, Oe(e, (l) => s.createElement("div", { "aria-hidden": !0 }, l)));
}), ie = Object.assign(cr, { List: Yo, Item: Ho, Input: Go, Group: Vo, Separator: zo, Dialog: qo, Empty: Zo, Loading: Xo });
function Qo(e, t) {
  let r = e.nextElementSibling;
  for (; r; ) {
    if (r.matches(t)) return r;
    r = r.nextElementSibling;
  }
}
function Jo(e, t) {
  let r = e.previousElementSibling;
  for (; r; ) {
    if (r.matches(t)) return r;
    r = r.previousElementSibling;
  }
}
function ur(e) {
  let t = s.useRef(e);
  return J(() => {
    t.current = e;
  }), t;
}
var J = typeof window > "u" ? s.useEffect : s.useLayoutEffect;
function se(e) {
  let t = s.useRef();
  return t.current === void 0 && (t.current = e()), t;
}
function q(e) {
  let t = Je(), r = () => e(t.snapshot());
  return s.useSyncExternalStore(t.subscribe, r, r);
}
function dr(e, t, r, n = []) {
  let o = s.useRef(), a = be();
  return J(() => {
    var l;
    let i = (() => {
      var u;
      for (let p of r) {
        if (typeof p == "string") return p.trim();
        if (typeof p == "object" && "current" in p) return p.current ? (u = p.current.textContent) == null ? void 0 : u.trim() : o.current;
      }
    })(), d = n.map((u) => u.trim());
    a.value(e, i, d), (l = t.current) == null || l.setAttribute(le, i), o.current = i;
  }), o;
}
var ea = () => {
  let [e, t] = s.useState(), r = se(() => /* @__PURE__ */ new Map());
  return J(() => {
    r.current.forEach((n) => n()), r.current = /* @__PURE__ */ new Map();
  }, [e]), (n, o) => {
    r.current.set(n, o), t({});
  };
};
function ta(e) {
  let t = e.type;
  return typeof t == "function" ? t(e.props) : "render" in t ? t.render(e.props) : e;
}
function Oe({ asChild: e, children: t }, r) {
  return e && s.isValidElement(t) ? s.cloneElement(ta(t), { ref: t.ref }, r(t.props.children)) : r(t);
}
var ra = { position: "absolute", width: "1px", height: "1px", padding: "0", margin: "-1px", overflow: "hidden", clip: "rect(0, 0, 0, 0)", whiteSpace: "nowrap", borderWidth: "0" };
const fr = mr(null);
function et() {
  const e = vr(fr);
  if (!e)
    throw new Error(
      "useCommandPalette must be used inside a <CommandPaletteProvider>."
    );
  return e;
}
function ja() {
  const { open: e, close: t, toggle: r, isOpen: n, query: o } = et();
  return { open: e, close: t, toggle: r, isOpen: n, query: o };
}
function Ua({
  commands: e,
  getDynamicCommands: t,
  children: r
}) {
  const [n, o] = G(!1), [a, l] = G(""), i = U(() => o(!0), []), d = U(() => {
    o(!1), l("");
  }, []), u = U(() => o((v) => !v), []);
  _(() => {
    const v = (b) => {
      (b.metaKey || b.ctrlKey) && b.key.toLowerCase() === "k" && (b.preventDefault(), o((y) => !y));
    };
    return window.addEventListener("keydown", v, !0), () => window.removeEventListener("keydown", v, !0);
  }, []);
  const p = Pe(() => {
    const v = t ? t(a) : [];
    return [...e, ...v].filter((y) => y.when ? y.when() : !0);
  }, [e, t, a]), m = {
    open: i,
    close: d,
    toggle: u,
    isOpen: n,
    query: a,
    setQuery: l,
    mergedCommands: p
  };
  return /* @__PURE__ */ c(fr.Provider, { value: m, children: r });
}
function na(e) {
  const t = /* @__PURE__ */ new Map();
  for (const r of e) {
    const n = r.group ?? null, o = t.get(n);
    o ? o.push(r) : t.set(n, [r]);
  }
  return Array.from(t.entries()).map(([r, n]) => ({
    groupName: r,
    items: n
  }));
}
function Ka({
  placeholder: e = "Type a command or search…",
  emptyState: t,
  className: r
} = {}) {
  const { isOpen: n, close: o, query: a, setQuery: l, mergedCommands: i } = et(), d = Pe(() => na(i), [i]), u = U(
    (p) => {
      o(), Promise.resolve().then(() => p.run());
    },
    [o]
  );
  return /* @__PURE__ */ c(
    xr,
    {
      open: n,
      onClose: o,
      maxWidth: 640,
      rawChildren: !0,
      backdropTestId: "command-palette-backdrop",
      children: /* @__PURE__ */ g(
        ie,
        {
          label: "Command palette",
          value: void 0,
          className: w("flex flex-col gap-0 w-full", r),
          "data-testid": "command-palette",
          children: [
            /* @__PURE__ */ c(
              ie.Input,
              {
                value: a,
                onValueChange: l,
                placeholder: e,
                "data-autofocus": !0,
                className: w(
                  "w-full px-3 py-2.5 text-sm border-0 border-b border-border",
                  "outline-none bg-transparent text-text-primary placeholder:text-text-tertiary"
                ),
                "data-testid": "command-palette-input"
              }
            ),
            /* @__PURE__ */ g(ie.List, { className: "max-h-[360px] overflow-y-auto py-2", children: [
              /* @__PURE__ */ c(ie.Empty, { className: "px-3 py-6 text-center text-sm text-text-tertiary", children: t ?? "No results." }),
              d.map(({ groupName: p, items: m }) => /* @__PURE__ */ c(
                ie.Group,
                {
                  heading: p ?? void 0,
                  children: m.map((v) => /* @__PURE__ */ g(
                    ie.Item,
                    {
                      value: `${v.id} ${v.label} ${(v.keywords ?? []).join(" ")}`,
                      keywords: v.keywords,
                      onSelect: () => u(v),
                      "data-testid": `command-palette-item-${v.id}`,
                      className: w(
                        "flex items-center gap-2 px-3 py-2 mx-1 rounded-md cursor-pointer text-sm",
                        "text-text-primary aria-selected:bg-surface-hover"
                      ),
                      children: [
                        v.icon && /* @__PURE__ */ c("span", { className: "shrink-0 text-text-secondary", children: v.icon }),
                        /* @__PURE__ */ c("span", { className: "flex-1 truncate", children: v.label }),
                        v.hint && /* @__PURE__ */ c("span", { className: "text-xs text-text-tertiary truncate", children: v.hint }),
                        v.shortcut && v.shortcut.length > 0 && /* @__PURE__ */ c("span", { className: "flex items-center gap-1 shrink-0", children: v.shortcut.map((b, y) => /* @__PURE__ */ c(
                          "kbd",
                          {
                            className: w(
                              "inline-flex items-center justify-center min-w-[18px] h-[18px] px-1",
                              "text-[10px] font-mono font-medium",
                              "bg-surface-hover text-text-secondary",
                              "border border-border rounded"
                            ),
                            children: b
                          },
                          `${v.id}-kbd-${y}`
                        )) })
                      ]
                    },
                    v.id
                  ))
                },
                p ?? "__ungrouped__"
              ))
            ] })
          ]
        }
      )
    }
  );
}
function Ha({ className: e } = {}) {
  const { toggle: t } = et();
  return /* @__PURE__ */ g(
    "button",
    {
      type: "button",
      onClick: t,
      "data-testid": "command-palette-hint",
      className: w(
        "inline-flex items-center gap-1.5 px-2 py-1 rounded-md",
        "text-xs text-text-secondary bg-surface-hover",
        "border border-border hover:bg-surface-panel",
        "cursor-pointer transition-colors",
        e
      ),
      "aria-label": "Open command palette",
      children: [
        /* @__PURE__ */ c("kbd", { className: "font-mono text-[11px]", children: "⌘K" }),
        /* @__PURE__ */ c("span", { children: "Search" })
      ]
    }
  );
}
function Va({
  label: e,
  hint: t,
  error: r,
  required: n = !1,
  layout: o = "stacked",
  children: a,
  className: l,
  style: i,
  "data-testid": d
}) {
  const u = kt(), p = `${u}-label`, m = t || r ? `${u}-desc` : void 0, v = {
    id: u,
    labelId: p,
    "aria-describedby": m,
    "aria-invalid": r ? !0 : void 0
  };
  return /* @__PURE__ */ g(
    "div",
    {
      "data-testid": d,
      className: w(
        o === "inline" ? "flex items-center gap-3" : "flex flex-col gap-1",
        l
      ),
      style: i,
      children: [
        /* @__PURE__ */ g(
          "label",
          {
            id: p,
            htmlFor: u,
            className: w(
              "text-[12px] font-medium",
              o === "inline" ? "min-w-[140px]" : "",
              r ? "text-[#991b1b]" : "text-gray-700"
            ),
            children: [
              e,
              n && /* @__PURE__ */ c("span", { className: "ml-0.5 text-[#991b1b]", children: "*" })
            ]
          }
        ),
        /* @__PURE__ */ g("div", { className: w(o === "inline" ? "flex-1" : ""), children: [
          a(v),
          (t || r) && /* @__PURE__ */ c(
            "div",
            {
              id: m,
              className: w(
                "mt-1 text-[11px]",
                r ? "text-[#991b1b]" : "text-gray-500"
              ),
              children: r ?? t
            }
          )
        ] })
      ]
    }
  );
}
const oa = {
  sm: "px-2.5 py-1 text-xs",
  md: "px-3 py-1.5 text-sm"
};
function aa(e) {
  switch (e) {
    case "underline":
      return "inline-flex items-center gap-1 border-b border-[var(--color-border)]";
    case "pill":
      return "inline-flex items-center gap-1";
    case "segmented":
      return "inline-flex items-center rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-inset,#f8fafc)] p-0.5 gap-0.5";
  }
}
function ia(e, t, r) {
  return e === "underline" ? w(
    "-mb-px border-b-2 rounded-none",
    t ? "border-[var(--color-primary)] text-[var(--color-text-primary)]" : "border-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]",
    r && "opacity-50 cursor-not-allowed hover:text-[var(--color-text-secondary)]"
  ) : e === "pill" ? w(
    "rounded-full",
    t ? "bg-[var(--color-primary)] text-white" : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text-primary)]",
    r && "opacity-50 cursor-not-allowed hover:bg-transparent"
  ) : w(
    "rounded-md",
    t ? "bg-white shadow-sm text-[var(--color-text-primary)] border border-[var(--color-border)]" : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]",
    r && "opacity-50 cursor-not-allowed hover:bg-transparent"
  );
}
function za({
  items: e,
  value: t,
  onValueChange: r,
  variant: n = "underline",
  size: o = "md",
  className: a,
  style: l,
  "aria-label": i,
  idPrefix: d
}) {
  const u = kt(), p = d ?? u, m = fe(/* @__PURE__ */ new Map()), v = Pe(() => e.filter((f) => !f.disabled).map((f) => f.id), [e]), b = U((f) => {
    m.current.get(f)?.focus();
  }, []), y = U(
    (f, x) => {
      if (v.length === 0) return;
      const E = v.indexOf(x);
      let N = null;
      switch (f.key) {
        case "ArrowRight":
        case "ArrowDown":
          N = E === -1 ? 0 : (E + 1) % v.length;
          break;
        case "ArrowLeft":
        case "ArrowUp":
          N = E === -1 ? v.length - 1 : (E - 1 + v.length) % v.length;
          break;
        case "Home":
          N = 0;
          break;
        case "End":
          N = v.length - 1;
          break;
        case "Enter":
        case " ":
          f.preventDefault(), r(x);
          return;
        default:
          return;
      }
      if (N !== null) {
        f.preventDefault();
        const P = v[N];
        r(P), b(P);
      }
    },
    [v, r, b]
  );
  return /* @__PURE__ */ c(
    "div",
    {
      role: "tablist",
      "aria-label": i,
      className: w(aa(n), a),
      style: l,
      children: e.map((f) => {
        const x = f.id === t;
        return /* @__PURE__ */ g(
          "button",
          {
            ref: (E) => {
              E ? m.current.set(f.id, E) : m.current.delete(f.id);
            },
            type: "button",
            role: "tab",
            id: `${p}-tab-${f.id}`,
            "aria-controls": `${p}-panel-${f.id}`,
            "aria-selected": x,
            "aria-disabled": f.disabled || void 0,
            tabIndex: x ? 0 : -1,
            disabled: f.disabled,
            onClick: () => !f.disabled && r(f.id),
            onKeyDown: (E) => y(E, f.id),
            className: w(
              "inline-flex items-center gap-1.5 font-medium transition-colors cursor-pointer",
              oa[o],
              ia(n, x, !!f.disabled)
            ),
            children: [
              f.icon,
              /* @__PURE__ */ c("span", { children: f.label }),
              f.badge !== void 0 && f.badge !== null && /* @__PURE__ */ c(
                "span",
                {
                  className: w(
                    "ml-1 inline-flex items-center justify-center rounded-full px-1.5 min-w-[20px] text-[10px] font-semibold",
                    x && n === "pill" ? "bg-white/20 text-white" : "bg-[var(--color-surface-hover)] text-[var(--color-text-secondary)]"
                  ),
                  children: f.badge
                }
              )
            ]
          },
          f.id
        );
      })
    }
  );
}
function Ga({ id: e, when: t, idPrefix: r, className: n, style: o, children: a }) {
  return e !== t ? null : /* @__PURE__ */ c(
    "div",
    {
      role: "tabpanel",
      id: r ? `${r}-panel-${e}` : void 0,
      "aria-labelledby": r ? `${r}-tab-${e}` : void 0,
      tabIndex: 0,
      className: n,
      style: o,
      children: a
    }
  );
}
function Ya({
  label: e,
  value: t,
  accent: r = !1,
  danger: n = !1,
  hint: o,
  to: a,
  as: l,
  onClick: i,
  mono: d = !1,
  className: u,
  style: p,
  "data-testid": m
}) {
  const v = w(
    "block rounded-lg border p-3 no-underline transition-colors",
    !r && !n && "bg-[var(--color-surface)] border-[var(--color-border)]",
    r && "bg-[var(--color-primary-soft)] border-l-[3px] border-l-[var(--color-primary)] border-[var(--color-border)]",
    n && "bg-[var(--color-danger-bg)] border-l-[3px] border-l-[var(--color-danger)] border-[var(--color-border)]",
    (a || i) && "hover:bg-[var(--color-surface-hover)] cursor-pointer",
    u
  ), b = /* @__PURE__ */ g(X, { children: [
    /* @__PURE__ */ c("div", { className: "text-[12px] uppercase tracking-wide text-[var(--color-text-tertiary)]", children: e }),
    /* @__PURE__ */ c(
      "div",
      {
        className: w(
          "mt-1 text-[24px] font-bold leading-tight text-[var(--color-text-primary)]",
          d && "font-mono"
        ),
        children: t
      }
    ),
    o != null && /* @__PURE__ */ c("div", { className: "mt-1 text-[11px] italic text-[var(--color-text-tertiary)]", children: o })
  ] });
  return a ? l ? /* @__PURE__ */ c(l, { to: a, "data-testid": m, className: v, style: p, children: b }) : /* @__PURE__ */ c("a", { href: a, "data-testid": m, className: v, style: p, children: b }) : i ? /* @__PURE__ */ c(
    "button",
    {
      type: "button",
      onClick: i,
      "data-testid": m,
      className: w(v, "w-full text-left"),
      style: p,
      children: b
    }
  ) : /* @__PURE__ */ c("div", { "data-testid": m, className: v, style: p, children: b });
}
const la = {
  sm: "w-[14px] h-[14px]",
  md: "w-[20px] h-[20px]",
  lg: "w-[28px] h-[28px]"
};
function qa({
  size: e = "md",
  color: t,
  className: r,
  style: n,
  "aria-label": o = "Loading",
  "data-testid": a
}) {
  const l = t ?? "var(--color-primary)";
  return /* @__PURE__ */ c(
    "div",
    {
      role: "status",
      "aria-label": o,
      "data-testid": a,
      className: w(
        "inline-block rounded-full border-2 border-transparent animate-spin",
        la[e],
        r
      ),
      style: { borderTopColor: l, ...n }
    }
  );
}
const sa = {
  sm: "h-1.5",
  md: "h-2"
};
function Za({
  value: e,
  max: t = 100,
  color: r,
  size: n = "md",
  label: o,
  showRatio: a = !0,
  className: l,
  style: i,
  "data-testid": d,
  "aria-label": u
}) {
  const p = t > 0 ? t : 100, m = Math.max(0, Math.min(e, p)), v = Math.min(100, m / p * 100), b = r ?? "var(--color-primary)";
  return /* @__PURE__ */ g("div", { "data-testid": d, className: w("w-full", l), style: i, children: [
    o != null && /* @__PURE__ */ g("div", { className: "flex items-center justify-between mb-1 text-[12px] text-[var(--color-text-secondary)]", children: [
      /* @__PURE__ */ c("span", { children: o }),
      /* @__PURE__ */ c("span", { className: "text-[var(--color-text-tertiary)] tabular-nums", children: a ? `${m}/${p}` : `${Math.round(v)}%` })
    ] }),
    /* @__PURE__ */ c(
      "div",
      {
        role: "progressbar",
        "aria-valuenow": m,
        "aria-valuemin": 0,
        "aria-valuemax": p,
        "aria-label": u,
        className: w(
          "w-full rounded-full overflow-hidden bg-[var(--color-surface-hover)]",
          sa[n]
        ),
        children: /* @__PURE__ */ c(
          "div",
          {
            className: "h-full rounded-full transition-all duration-300",
            style: { width: `${v}%`, background: b }
          }
        )
      }
    )
  ] });
}
const ca = {
  sm: "px-2.5 py-0.5 text-[11px]",
  xs: "px-2 py-px text-[10px]"
}, ua = "bg-[var(--color-surface)] border-[var(--color-border)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] hover:border-[var(--color-border-emphasis)]", da = "bg-[var(--color-primary)] border-[var(--color-primary)] text-white hover:opacity-90", fa = "border-[var(--color-border-emphasis)] text-[var(--color-text-primary)]";
function Xa({
  active: e,
  onClick: t,
  color: r,
  dot: n = !1,
  size: o = "sm",
  children: a,
  className: l,
  disabled: i = !1
}) {
  const d = e && !!r, u = d ? { background: `${r}22`, borderColor: `${r}66`, color: r } : void 0;
  return /* @__PURE__ */ g(
    "button",
    {
      type: "button",
      onClick: t,
      disabled: i,
      "aria-pressed": e,
      className: w(
        "inline-flex items-center gap-1.5 rounded-full font-semibold border transition-colors cursor-pointer select-none",
        ca[o],
        e ? d ? fa : da : ua,
        i && "opacity-50 cursor-not-allowed",
        l
      ),
      style: u,
      children: [
        n && /* @__PURE__ */ c(
          "span",
          {
            className: "w-1.5 h-1.5 rounded-full flex-shrink-0",
            style: { background: r || "currentColor" }
          }
        ),
        a
      ]
    }
  );
}
const pa = {
  sm: "px-2.5 py-1 text-xs",
  md: "px-3 py-1.5 text-sm"
}, ma = "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]", va = "bg-white shadow-sm text-[var(--color-text-primary)] border border-[var(--color-border)]";
function Qa({
  options: e,
  value: t,
  onChange: r,
  size: n = "md",
  className: o
}) {
  return /* @__PURE__ */ c(
    "div",
    {
      role: "group",
      className: w(
        "inline-flex items-center rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-inset,#f8fafc)] p-0.5 gap-0.5",
        o
      ),
      children: e.map((a) => {
        const l = a.value === t;
        return /* @__PURE__ */ g(
          "button",
          {
            type: "button",
            onClick: () => r(a.value),
            "aria-pressed": l,
            className: w(
              "inline-flex items-center gap-1.5 rounded-md font-medium transition-all cursor-pointer",
              pa[n],
              l ? va : ma
            ),
            children: [
              a.icon,
              a.label
            ]
          },
          a.value
        );
      })
    }
  );
}
function Ja({
  label: e,
  id: t,
  href: r,
  mono: n = !1,
  className: o,
  labelClassName: a
}) {
  const l = /* @__PURE__ */ c("span", { className: "truncate", children: e });
  return /* @__PURE__ */ g("div", { className: w("flex flex-col min-w-0", o), children: [
    /* @__PURE__ */ c(
      "div",
      {
        className: w(
          "font-medium text-[var(--color-text-primary)] truncate text-sm",
          a
        ),
        children: r ? /* @__PURE__ */ c(
          "a",
          {
            href: r,
            className: "hover:text-[var(--color-primary)] hover:underline",
            children: l
          }
        ) : l
      }
    ),
    t && /* @__PURE__ */ c(
      "div",
      {
        className: w(
          "text-[10px] font-mono text-[var(--color-text-tertiary)] truncate mt-0.5",
          n && "tracking-tight"
        ),
        children: t
      }
    )
  ] });
}
const ha = [
  "a[href]",
  "button:not([disabled])",
  'input:not([disabled]):not([type="hidden"])',
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
  '[contenteditable="true"]'
].join(",");
function ei({
  open: e,
  onClose: t,
  title: r,
  subtitle: n,
  width: o = 460,
  children: a,
  footer: l,
  "data-testid": i
}) {
  const d = fe(null);
  return _(() => {
    if (!e) return;
    const u = (p) => {
      p.key === "Escape" && t();
    };
    return window.addEventListener("keydown", u), () => window.removeEventListener("keydown", u);
  }, [e, t]), _(() => {
    if (!e) return;
    const u = d.current;
    if (!u) return;
    const p = u.querySelector(ha);
    p ? p.focus() : (u.setAttribute("tabindex", "-1"), u.focus());
  }, [e]), e ? Rt(
    /* @__PURE__ */ g("div", { className: "fixed inset-0 z-[9000]", "data-testid": i, children: [
      /* @__PURE__ */ c(
        "div",
        {
          className: "absolute inset-0 bg-black/30 backdrop-blur-[1px]",
          onClick: t,
          "aria-hidden": "true"
        }
      ),
      /* @__PURE__ */ g(
        "aside",
        {
          ref: d,
          role: "dialog",
          "aria-modal": "true",
          "aria-label": r,
          className: w(
            "absolute right-0 top-0 h-full bg-white shadow-xl flex flex-col",
            "transition-transform duration-200",
            e ? "translate-x-0" : "translate-x-full"
          ),
          style: { width: o },
          children: [
            /* @__PURE__ */ g("div", { className: "flex items-start justify-between p-5 border-b border-[var(--color-border)] flex-shrink-0", children: [
              /* @__PURE__ */ g("div", { className: "min-w-0", children: [
                r && /* @__PURE__ */ c("h2", { className: "text-base font-semibold text-[var(--color-text-primary)]", children: r }),
                n && /* @__PURE__ */ c("p", { className: "text-sm text-[var(--color-text-secondary)] mt-0.5", children: n })
              ] }),
              /* @__PURE__ */ c(
                "button",
                {
                  type: "button",
                  onClick: t,
                  className: "ml-4 flex-shrink-0 p-1 rounded hover:bg-[var(--color-surface-hover)] text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition-colors",
                  "aria-label": "Close",
                  children: /* @__PURE__ */ c("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", children: /* @__PURE__ */ c(
                    "path",
                    {
                      d: "M4 4l8 8M12 4l-8 8",
                      stroke: "currentColor",
                      strokeWidth: "1.5",
                      strokeLinecap: "round"
                    }
                  ) })
                }
              )
            ] }),
            /* @__PURE__ */ c("div", { className: "flex-1 overflow-y-auto p-5", children: a }),
            l && /* @__PURE__ */ c("div", { className: "flex-shrink-0 border-t border-[var(--color-border)] p-4 bg-[var(--color-surface-inset,#f8fafc)]", children: l })
          ]
        }
      )
    ] }),
    document.body
  ) : null;
}
function ba(e, t) {
  if (!e || typeof window > "u") return t;
  try {
    const r = window.localStorage.getItem(e);
    return r === null ? t : r === "true";
  } catch {
    return t;
  }
}
function ti({
  title: e,
  defaultOpen: t = !1,
  badge: r,
  children: n,
  className: o,
  storageKey: a
}) {
  const [l, i] = G(
    () => ba(a, t)
  );
  return _(() => {
    if (a && !(typeof window > "u"))
      try {
        window.localStorage.setItem(a, String(l));
      } catch {
      }
  }, [l, a]), /* @__PURE__ */ g(
    "div",
    {
      className: w(
        "border border-[var(--color-border)] rounded-lg overflow-hidden",
        o
      ),
      children: [
        /* @__PURE__ */ g(
          "button",
          {
            type: "button",
            className: "w-full flex items-center justify-between px-4 py-3 bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] transition-colors text-left",
            onClick: () => i((d) => !d),
            "aria-expanded": l,
            children: [
              /* @__PURE__ */ c("span", { className: "text-sm font-semibold text-[var(--color-text-primary)]", children: e }),
              /* @__PURE__ */ g("div", { className: "flex items-center gap-2", children: [
                r,
                /* @__PURE__ */ c(
                  "svg",
                  {
                    className: w(
                      "w-4 h-4 text-[var(--color-text-tertiary)] transition-transform",
                      l && "rotate-180"
                    ),
                    viewBox: "0 0 16 16",
                    fill: "none",
                    "aria-hidden": "true",
                    children: /* @__PURE__ */ c(
                      "path",
                      {
                        d: "M4 6l4 4 4-4",
                        stroke: "currentColor",
                        strokeWidth: "1.5",
                        strokeLinecap: "round",
                        strokeLinejoin: "round"
                      }
                    )
                  }
                )
              ] })
            ]
          }
        ),
        l && /* @__PURE__ */ c("div", { className: "border-t border-[var(--color-border)] bg-white", children: n })
      ]
    }
  );
}
function ri({
  value: e,
  onChange: t,
  placeholder: r,
  onClear: n,
  className: o,
  style: a,
  autoFocus: l,
  "aria-label": i
}) {
  return /* @__PURE__ */ g(
    "div",
    {
      className: w("relative inline-flex items-center", o),
      style: a,
      children: [
        /* @__PURE__ */ g(
          "svg",
          {
            className: "absolute left-3 w-3.5 h-3.5 text-[var(--color-text-tertiary)] pointer-events-none",
            viewBox: "0 0 16 16",
            fill: "none",
            "aria-hidden": "true",
            children: [
              /* @__PURE__ */ c(
                "circle",
                {
                  cx: "7",
                  cy: "7",
                  r: "4.5",
                  stroke: "currentColor",
                  strokeWidth: "1.5"
                }
              ),
              /* @__PURE__ */ c(
                "path",
                {
                  d: "M10.5 10.5L14 14",
                  stroke: "currentColor",
                  strokeWidth: "1.5",
                  strokeLinecap: "round"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ c(
          "input",
          {
            type: "text",
            value: e,
            onChange: (d) => t(d.target.value),
            placeholder: r ?? "Search…",
            autoFocus: l,
            "aria-label": i,
            className: "w-full pl-8 pr-7 py-1.5 text-sm rounded-md border border-[var(--color-border-field,#d1d5db)] bg-white text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] transition-colors"
          }
        ),
        e && /* @__PURE__ */ c(
          "button",
          {
            type: "button",
            onClick: () => {
              t(""), n?.();
            },
            className: "absolute right-2 p-0.5 rounded text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]",
            "aria-label": "Clear search",
            children: /* @__PURE__ */ c("svg", { width: "12", height: "12", viewBox: "0 0 12 12", fill: "none", children: /* @__PURE__ */ c(
              "path",
              {
                d: "M2 2l8 8M10 2l-8 8",
                stroke: "currentColor",
                strokeWidth: "1.5",
                strokeLinecap: "round"
              }
            ) })
          }
        )
      ]
    }
  );
}
const ga = {
  error: "bg-[var(--color-danger-bg,#fef2f2)] border-[var(--color-danger,#dc2626)] text-[var(--color-danger,#dc2626)]",
  success: "bg-[var(--color-success-bg,#f0fdf4)] border-[var(--color-success,#16a34a)] text-[var(--color-success,#16a34a)]",
  info: "bg-[var(--color-info-bg,#eff6ff)] border-[var(--color-info,#2563eb)] text-[var(--color-info,#2563eb)]",
  warning: "bg-[var(--color-warning-bg,#fffbeb)] border-[var(--color-warning,#f59e0b)] text-[var(--color-warning,#f59e0b)]"
};
function ni({ tone: e, children: t, onDismiss: r, className: n }) {
  return /* @__PURE__ */ g(
    "div",
    {
      role: e === "error" || e === "warning" ? "alert" : "status",
      "aria-live": e === "error" || e === "warning" ? "assertive" : "polite",
      className: w(
        "flex items-start gap-2 px-3 py-2 rounded-md border-l-[3px] text-sm",
        ga[e],
        n
      ),
      children: [
        /* @__PURE__ */ c("span", { className: "flex-1", children: t }),
        r && /* @__PURE__ */ c(
          "button",
          {
            type: "button",
            onClick: r,
            "aria-label": "Dismiss",
            className: "flex-shrink-0 opacity-70 hover:opacity-100",
            children: "✕"
          }
        )
      ]
    }
  );
}
function oi({ title: e, subtitle: t, meta: r, action: n, className: o }) {
  return /* @__PURE__ */ g("div", { className: w("flex items-center justify-between gap-4", o), children: [
    /* @__PURE__ */ g("div", { className: "min-w-0", children: [
      /* @__PURE__ */ g("div", { className: "flex items-center gap-2 min-w-0", children: [
        /* @__PURE__ */ c("h3", { className: "text-sm font-semibold text-[var(--color-text-primary)] truncate", children: e }),
        r
      ] }),
      t && /* @__PURE__ */ c("p", { className: "text-xs text-[var(--color-text-tertiary)] mt-0.5", children: t })
    ] }),
    n && /* @__PURE__ */ c("div", { className: "flex-shrink-0", children: n })
  ] });
}
function ai({
  title: e,
  description: t,
  actions: r,
  back: n,
  badge: o,
  className: a
}) {
  return /* @__PURE__ */ g("div", { className: w("flex flex-col gap-1.5", a), children: [
    n && /* @__PURE__ */ g(
      "a",
      {
        href: n.to,
        onClick: n.onClick,
        className: "inline-flex items-center gap-1 text-xs text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] mb-1 w-fit",
        children: [
          /* @__PURE__ */ c(
            "svg",
            {
              width: "12",
              height: "12",
              viewBox: "0 0 12 12",
              fill: "none",
              "aria-hidden": "true",
              children: /* @__PURE__ */ c(
                "path",
                {
                  d: "M7 2L3 6l4 4",
                  stroke: "currentColor",
                  strokeWidth: "1.5",
                  strokeLinecap: "round",
                  strokeLinejoin: "round"
                }
              )
            }
          ),
          n.label
        ]
      }
    ),
    /* @__PURE__ */ g("div", { className: "flex items-center justify-between gap-4", children: [
      /* @__PURE__ */ g("div", { className: "min-w-0 flex items-center gap-2.5", children: [
        /* @__PURE__ */ c("h1", { className: "text-xl font-semibold text-[var(--color-text-primary)] leading-tight", children: e }),
        o
      ] }),
      r && /* @__PURE__ */ c("div", { className: "flex-shrink-0 flex items-center gap-2", children: r })
    ] }),
    t && /* @__PURE__ */ c("p", { className: "text-sm text-[var(--color-text-secondary)]", children: t })
  ] });
}
function qe({ size: e = "md", color: t, className: r }) {
  const n = e === "sm" ? 4 : 6, o = t || "var(--color-text-tertiary, #94a3b8)";
  return /* @__PURE__ */ g(X, { children: [
    /* @__PURE__ */ c("style", { children: `
        @keyframes thinkDot {
          0%, 80%, 100% { transform: scale(1); opacity: 0.4; }
          40% { transform: scale(1.3); opacity: 1; }
        }
      ` }),
    /* @__PURE__ */ c("span", { className: w("inline-flex items-center gap-1", r), children: [0, 1, 2].map((a) => /* @__PURE__ */ c(
      "span",
      {
        style: {
          width: n,
          height: n,
          borderRadius: "50%",
          background: o,
          display: "inline-block",
          animation: `thinkDot 1.2s ease-in-out ${a * 0.2}s infinite`
        }
      },
      a
    )) })
  ] });
}
function ii({
  value: e,
  onChange: t,
  onSubmit: r,
  disabled: n = !1,
  multiline: o = !1,
  placeholder: a,
  submitLabel: l = "→",
  className: i,
  style: d,
  autoFocus: u,
  maxRows: p = 4
}) {
  const m = !n && e.trim().length > 0, v = () => {
    m && r();
  }, b = (f) => {
    if (f.key === "Enter") {
      if (o && f.shiftKey) return;
      f.preventDefault(), v();
    }
  }, y = w(
    "flex-1 px-3 py-2 text-sm rounded-lg border border-[var(--color-border-field,#d1d5db)] bg-white text-[var(--color-text-primary)]",
    "placeholder:text-[var(--color-text-tertiary)]",
    "focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent",
    "resize-none",
    n && "opacity-50 cursor-not-allowed bg-[var(--color-surface-hover)]"
  );
  return /* @__PURE__ */ g(
    "div",
    {
      className: w(
        "flex items-end gap-2 p-3 border-t border-[var(--color-border)] bg-[var(--color-surface)]",
        i
      ),
      style: d,
      children: [
        o ? /* @__PURE__ */ c(
          "textarea",
          {
            className: y,
            value: e,
            onChange: (f) => t(f.target.value),
            onKeyDown: b,
            disabled: n,
            placeholder: a,
            autoFocus: u,
            rows: 2,
            style: { maxHeight: `${p * 1.5 + 1}rem`, overflowY: "auto" }
          }
        ) : /* @__PURE__ */ c(
          "input",
          {
            type: "text",
            className: y,
            value: e,
            onChange: (f) => t(f.target.value),
            onKeyDown: b,
            disabled: n,
            placeholder: a,
            autoFocus: u
          }
        ),
        /* @__PURE__ */ c(
          "button",
          {
            type: "button",
            onClick: v,
            disabled: !m,
            className: w(
              "px-3 py-2 rounded-lg text-sm font-semibold transition-colors flex-shrink-0",
              m ? "bg-[var(--color-primary)] text-white hover:opacity-90" : "bg-[var(--color-surface-hover)] text-[var(--color-text-tertiary)] cursor-not-allowed"
            ),
            children: l
          }
        )
      ]
    }
  );
}
function xa({ name: e, done: t, className: r }) {
  return /* @__PURE__ */ g(
    "span",
    {
      className: w(
        "inline-flex items-center gap-1 text-[10.5px] font-mono px-2 py-0.5 rounded-full",
        t ? "bg-[var(--color-success-bg,#f0fdf4)] text-[var(--color-success,#16a34a)]" : "bg-[var(--color-info-bg,#eff6ff)] text-[var(--color-info,#1d4ed8)]",
        r
      ),
      children: [
        e,
        t ? " ✓" : "…"
      ]
    }
  );
}
function ya({ toolCalls: e, className: t }) {
  return /* @__PURE__ */ c("div", { className: w("flex flex-wrap gap-1.5 py-1", t), children: e.map((r) => /* @__PURE__ */ c(xa, { name: r.name, done: r.done }, r.id)) });
}
function li({
  role: e,
  content: t,
  toolCalls: r,
  streaming: n = !1,
  agentName: o,
  userName: a,
  renderMarkdown: l,
  className: i
}) {
  const d = e === "user" ? a || "You" : o || "Assistant";
  return /* @__PURE__ */ g("div", { className: w("flex flex-col gap-1.5 py-3", i), children: [
    /* @__PURE__ */ c("div", { className: "text-[11px] font-semibold uppercase tracking-wide text-[var(--color-text-tertiary)]", children: d }),
    r && r.length > 0 && /* @__PURE__ */ c(ya, { toolCalls: r }),
    e === "user" ? /* @__PURE__ */ c("div", { className: "text-sm text-[var(--color-text-primary)] whitespace-pre-wrap", children: t }) : /* @__PURE__ */ c("div", { className: "text-sm text-[var(--color-text-primary)] prose-sm max-w-none", children: t ? l ? l(t) : /* @__PURE__ */ c("span", { className: "whitespace-pre-wrap", children: t }) : n ? /* @__PURE__ */ c(qe, {}) : null })
  ] });
}
function si({
  content: e,
  streaming: t = !1,
  defaultOpen: r = !1,
  className: n
}) {
  const a = t || !e ? "Thinking" : "Thought";
  return /* @__PURE__ */ g(
    "details",
    {
      open: r,
      className: w(
        "rounded-md border border-[var(--color-border)] overflow-hidden text-sm group",
        n
      ),
      children: [
        /* @__PURE__ */ g("summary", { className: "flex items-center gap-2 px-3 py-2 cursor-pointer select-none bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] text-[var(--color-text-tertiary)] list-none", children: [
          /* @__PURE__ */ c(
            "svg",
            {
              className: "w-3.5 h-3.5 transition-transform group-open:rotate-90",
              xmlns: "http://www.w3.org/2000/svg",
              viewBox: "0 0 20 20",
              fill: "currentColor",
              "aria-hidden": "true",
              children: /* @__PURE__ */ c(
                "path",
                {
                  fillRule: "evenodd",
                  d: "M7.21 14.77a.75.75 0 010-1.06L10.94 10 7.21 6.29a.75.75 0 011.08-1.04l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.08-.04z",
                  clipRule: "evenodd"
                }
              )
            }
          ),
          /* @__PURE__ */ c("span", { className: "text-[11px] font-semibold uppercase tracking-wide", children: a }),
          t && !e && /* @__PURE__ */ c(qe, { size: "sm" })
        ] }),
        /* @__PURE__ */ c("div", { className: "px-3 py-2 text-xs text-[var(--color-text-secondary)] italic border-t border-[var(--color-border)] bg-white whitespace-pre-wrap leading-relaxed", children: e || /* @__PURE__ */ c(qe, {}) })
      ]
    }
  );
}
function ci({
  prompts: e,
  onSelect: t,
  columns: r,
  title: n,
  className: o
}) {
  const a = r ? `repeat(${r}, minmax(0, 1fr))` : "repeat(auto-fit, minmax(220px, 1fr))";
  return /* @__PURE__ */ g("div", { className: w("flex flex-col gap-3", o), children: [
    n && /* @__PURE__ */ c("p", { className: "text-xs font-semibold uppercase tracking-wide text-[var(--color-text-tertiary)] text-center", children: n }),
    /* @__PURE__ */ c("div", { style: { display: "grid", gridTemplateColumns: a, gap: 10 }, children: e.map((l, i) => /* @__PURE__ */ g(
      "button",
      {
        type: "button",
        onClick: () => t(l.label),
        className: "flex flex-col gap-1 px-4 py-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] hover:border-[var(--color-border-emphasis,#cbd5e1)] text-left transition-colors",
        children: [
          /* @__PURE__ */ c("span", { className: "text-sm font-medium text-[var(--color-text-primary)]", children: l.label }),
          l.hint && /* @__PURE__ */ c("span", { className: "text-xs text-[var(--color-text-tertiary)]", children: l.hint })
        ]
      },
      i
    )) })
  ] });
}
function ui({
  suggestions: e,
  onSelect: t,
  onRefresh: r,
  label: n,
  className: o
}) {
  return /* @__PURE__ */ g("div", { className: w("flex items-center flex-wrap gap-1.5 py-2", o), children: [
    n && /* @__PURE__ */ c("span", { className: "text-xs text-[var(--color-text-tertiary)] mr-1", children: n }),
    e.map((a, l) => /* @__PURE__ */ c(
      "button",
      {
        type: "button",
        onClick: () => t(a),
        className: "inline-flex items-center px-3 py-1 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-xs text-[var(--color-text-secondary)] hover:bg-[var(--color-primary)] hover:text-white hover:border-[var(--color-primary)] transition-colors",
        children: a
      },
      l
    )),
    r && /* @__PURE__ */ c(
      "button",
      {
        type: "button",
        onClick: r,
        className: "inline-flex items-center justify-center w-7 h-7 rounded-full border border-[var(--color-border)] text-[var(--color-text-tertiary)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text-primary)] transition-colors text-base",
        title: "Refresh suggestions",
        children: "↻"
      }
    )
  ] });
}
function di({
  name: e,
  memberCount: t,
  description: r,
  actions: n,
  avatarUrl: o,
  online: a,
  onMembersClick: l,
  className: i
}) {
  return /* @__PURE__ */ g(
    "div",
    {
      className: w(
        "flex items-center justify-between gap-4 px-6 py-3",
        "border-b border-[var(--color-border)] bg-[var(--color-surface)]",
        i
      ),
      children: [
        /* @__PURE__ */ g("div", { className: "flex items-center gap-3 min-w-0", children: [
          /* @__PURE__ */ g("div", { className: "relative shrink-0", children: [
            o ? /* @__PURE__ */ c(
              "img",
              {
                src: o,
                alt: e,
                className: "w-9 h-9 rounded-full object-cover"
              }
            ) : /* @__PURE__ */ c(Pt, { name: e, size: 36 }),
            a !== void 0 && /* @__PURE__ */ c("span", { className: "absolute -bottom-0.5 -right-0.5", children: /* @__PURE__ */ c(
              wr,
              {
                color: a ? "#22c55e" : "#94a3b8",
                size: "sm",
                "aria-label": a ? "Online" : "Offline"
              }
            ) })
          ] }),
          /* @__PURE__ */ g("div", { className: "min-w-0 flex flex-col gap-0.5", children: [
            /* @__PURE__ */ g("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ c("h2", { className: "text-[15px] font-semibold text-[var(--color-text-primary)] leading-tight truncate", children: e }),
              t !== void 0 && /* @__PURE__ */ g(
                "button",
                {
                  type: "button",
                  onClick: l,
                  disabled: !l,
                  className: w(
                    "text-[11px] font-medium text-[var(--color-text-tertiary)]",
                    "bg-transparent border-none p-0 leading-none",
                    l && "cursor-pointer hover:text-[var(--color-text-secondary)]",
                    !l && "cursor-default"
                  ),
                  children: [
                    t,
                    " ",
                    t === 1 ? "member" : "members"
                  ]
                }
              )
            ] }),
            r && /* @__PURE__ */ c("p", { className: "text-[12px] text-[var(--color-text-tertiary)] truncate leading-tight", children: r })
          ] })
        ] }),
        n && /* @__PURE__ */ c("div", { className: "flex items-center gap-2 shrink-0", children: n })
      ]
    }
  );
}
function fi({ user: e, items: t, className: r, "data-testid": n }) {
  const [o, a] = G(!1), l = fe(null), i = U(() => a(!1), []);
  return _(() => {
    if (!o) return;
    const d = (u) => {
      l.current && !l.current.contains(u.target) && i();
    };
    return document.addEventListener("mousedown", d), () => document.removeEventListener("mousedown", d);
  }, [o, i]), _(() => {
    if (!o) return;
    const d = (u) => {
      u.key === "Escape" && i();
    };
    return document.addEventListener("keydown", d), () => document.removeEventListener("keydown", d);
  }, [o, i]), /* @__PURE__ */ g(
    "div",
    {
      ref: l,
      "data-testid": n,
      className: w("relative inline-block", r),
      children: [
        /* @__PURE__ */ g(
          "button",
          {
            type: "button",
            "aria-label": `User menu for ${e.name}`,
            "aria-expanded": o,
            "aria-haspopup": "menu",
            onClick: () => a((d) => !d),
            className: w(
              "flex items-center gap-2 bg-transparent border-none cursor-pointer p-1 rounded-lg",
              "hover:bg-[var(--color-surface-hover)] transition-colors duration-100",
              o && "bg-[var(--color-surface-hover)]"
            ),
            children: [
              e.avatarUrl ? /* @__PURE__ */ c(
                "img",
                {
                  src: e.avatarUrl,
                  alt: e.name,
                  className: "w-8 h-8 rounded-full object-cover"
                }
              ) : /* @__PURE__ */ c(Pt, { name: e.name, size: 32 }),
              /* @__PURE__ */ g("div", { className: "flex flex-col items-start text-left min-w-0 hidden sm:flex", children: [
                /* @__PURE__ */ c("span", { className: "text-sm font-medium text-[var(--color-text-primary)] leading-tight truncate max-w-[120px]", children: e.name }),
                /* @__PURE__ */ c("span", { className: "text-xs text-[var(--color-text-tertiary)] leading-tight truncate max-w-[120px]", children: e.email })
              ] }),
              /* @__PURE__ */ c(
                "svg",
                {
                  width: "12",
                  height: "12",
                  viewBox: "0 0 12 12",
                  fill: "none",
                  "aria-hidden": "true",
                  className: w(
                    "text-[var(--color-text-tertiary)] transition-transform duration-150",
                    o ? "rotate-180" : "rotate-0"
                  ),
                  children: /* @__PURE__ */ c("path", { d: "M2 4l4 4 4-4", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" })
                }
              )
            ]
          }
        ),
        o && /* @__PURE__ */ g(
          "div",
          {
            role: "menu",
            "aria-label": "User menu",
            className: w(
              "absolute right-0 top-[calc(100%+6px)] min-w-[200px] z-[200]",
              "bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl shadow-md overflow-hidden"
            ),
            children: [
              /* @__PURE__ */ g("div", { className: "px-3 py-2.5 border-b border-[var(--color-border)]", children: [
                /* @__PURE__ */ c("p", { className: "text-sm font-semibold text-[var(--color-text-primary)] truncate", children: e.name }),
                /* @__PURE__ */ c("p", { className: "text-xs text-[var(--color-text-tertiary)] truncate", children: e.email })
              ] }),
              /* @__PURE__ */ c("div", { className: "py-1", children: t.map((d, u) => /* @__PURE__ */ g("div", { children: [
                d.separator && u > 0 && /* @__PURE__ */ c("div", { className: "my-1 border-t border-[var(--color-border)]" }),
                /* @__PURE__ */ g(
                  "button",
                  {
                    type: "button",
                    role: "menuitem",
                    onClick: () => {
                      d.onClick(), i();
                    },
                    className: w(
                      "flex items-center gap-2.5 w-full text-left px-3 py-2",
                      "text-sm border-none cursor-pointer font-[inherit] transition-colors duration-100",
                      d.danger ? "text-[#dc2626] bg-transparent hover:bg-[#fef2f2]" : "text-[var(--color-text-primary)] bg-transparent hover:bg-[var(--color-surface-hover)]"
                    ),
                    children: [
                      d.icon && /* @__PURE__ */ c("span", { className: "shrink-0 text-base leading-none", "aria-hidden": "true", children: d.icon }),
                      d.label
                    ]
                  }
                )
              ] }, u)) })
            ]
          }
        )
      ]
    }
  );
}
function wa({ item: e, isLast: t }) {
  const r = w(
    "text-sm leading-snug transition-colors duration-100",
    t ? "text-[var(--color-text-primary)] font-medium cursor-default" : "text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] font-normal"
  );
  return t || !e.href && !e.onClick ? /* @__PURE__ */ c("span", { className: r, "aria-current": t ? "page" : void 0, children: e.label }) : e.href ? /* @__PURE__ */ c("a", { href: e.href, onClick: e.onClick, className: w(r, "no-underline"), children: e.label }) : /* @__PURE__ */ c(
    "button",
    {
      type: "button",
      onClick: e.onClick,
      className: w(r, "border-none bg-transparent cursor-pointer font-[inherit] p-0"),
      children: e.label
    }
  );
}
function Ea(e, t) {
  if (e.length <= t) return e;
  const r = e.slice(0, 1), n = e.slice(-(t - 2 > 0 ? t - 2 : 1));
  return [...r, null, ...n];
}
function pi({
  items: e,
  separator: t = "/",
  maxItems: r,
  className: n,
  "data-testid": o
}) {
  if (e.length === 0) return null;
  const a = r != null ? Ea(e, r) : e;
  return /* @__PURE__ */ c("nav", { "aria-label": "Breadcrumb", "data-testid": o, className: w("flex items-center", n), children: /* @__PURE__ */ c("ol", { className: "flex items-center gap-1 flex-wrap list-none m-0 p-0", children: a.map((l, i) => {
    const d = i === a.length - 1;
    return /* @__PURE__ */ g("li", { className: "flex items-center gap-1", children: [
      l === null ? /* @__PURE__ */ c(
        "span",
        {
          className: "text-sm text-[var(--color-text-tertiary)] select-none",
          "aria-label": "More items",
          title: "Some items are hidden",
          children: "…"
        }
      ) : /* @__PURE__ */ c(wa, { item: l, isLast: d }),
      !d && /* @__PURE__ */ c(
        "span",
        {
          className: "text-[var(--color-text-tertiary)] text-sm select-none",
          "aria-hidden": "true",
          children: t
        }
      )
    ] }, i);
  }) }) });
}
const Ca = {
  active: { bg: "#f0fdf4", border: "#86efac", text: "#166534", accent: "#16a34a" },
  in_progress: { bg: "#eff6ff", border: "#93c5fd", text: "#1e40af", accent: "#3b82f6" },
  completed: { bg: "#f0fdf4", border: "#86efac", text: "#166534", accent: "#16a34a" },
  archived: { bg: "#f9fafb", border: "#d1d5db", text: "#6b7280", accent: "#9ca3af" },
  planning: { bg: "#fefce8", border: "#fde047", text: "#713f12", accent: "#eab308" },
  paused: { bg: "#fff7ed", border: "#fdba74", text: "#9a3412", accent: "#f97316" }
}, Sa = {
  bg: "#f3f4f6",
  border: "#d1d5db",
  text: "#374151",
  accent: "#6b7280"
};
function Na({ status: e, colors: t }) {
  return /* @__PURE__ */ g(
    "span",
    {
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        padding: "2px 9px",
        borderRadius: 9999,
        fontSize: 10,
        fontWeight: 700,
        background: t.bg,
        color: t.text,
        border: `1px solid ${t.border}`,
        textTransform: "uppercase",
        letterSpacing: "0.04em",
        whiteSpace: "nowrap",
        flexShrink: 0
      },
      children: [
        /* @__PURE__ */ c("span", { style: { width: 5, height: 5, borderRadius: "50%", background: t.accent } }),
        e.replace(/_/g, " ")
      ]
    }
  );
}
function mi({
  name: e,
  id: t,
  status: r,
  statusColors: n,
  contributorNames: o = [],
  contributorCount: a,
  activityItems: l = [],
  presenceDotColor: i = "#d1d5db",
  activityLabel: d = "",
  cardIndex: u = 0,
  onClick: p,
  className: m,
  style: v,
  minHeight: b = 190
}) {
  const y = { ...Ca, ...n }, f = (r ?? "unknown").toLowerCase().replace(/ /g, "_"), x = y[f] ?? Sa, E = a !== void 0 ? Math.max(0, a - o.length) : 0, N = u % 8 * 525;
  return /* @__PURE__ */ g(
    "button",
    {
      type: "button",
      onClick: p,
      className: m,
      style: {
        background: "#fff",
        border: "1.5px solid #e5e7eb",
        borderTop: `3px solid ${x.accent}`,
        borderRadius: 10,
        padding: "14px 16px 12px",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        gap: 10,
        transition: "box-shadow 0.15s, transform 0.1s",
        minHeight: b,
        width: "100%",
        textAlign: "left",
        font: "inherit",
        color: "inherit",
        ...v
      },
      onMouseEnter: (P) => {
        const R = P.currentTarget;
        R.style.boxShadow = "0 4px 16px rgba(0,0,0,0.08)", R.style.transform = "translateY(-1px)", R.style.borderColor = x.border;
      },
      onMouseLeave: (P) => {
        const R = P.currentTarget;
        R.style.boxShadow = "none", R.style.transform = "none", R.style.borderColor = "#e5e7eb";
      },
      children: [
        /* @__PURE__ */ g(
          "div",
          {
            style: {
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: 8
            },
            children: [
              /* @__PURE__ */ g("div", { style: { flex: 1, minWidth: 0 }, children: [
                /* @__PURE__ */ c(
                  "h3",
                  {
                    style: {
                      margin: "0 0 3px",
                      fontSize: 13.5,
                      fontWeight: 700,
                      color: "#111827",
                      lineHeight: 1.35
                    },
                    children: e
                  }
                ),
                t && /* @__PURE__ */ c(
                  "span",
                  {
                    style: {
                      fontSize: 10,
                      fontFamily: 'ui-monospace, "SFMono-Regular", Menlo, monospace',
                      color: "#9ca3af",
                      letterSpacing: "0.02em"
                    },
                    children: t
                  }
                )
              ] }),
              r && /* @__PURE__ */ c(Na, { status: r, colors: x })
            ]
          }
        ),
        /* @__PURE__ */ c(Er, { items: l, staggerMs: N }),
        /* @__PURE__ */ g(
          "div",
          {
            style: {
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingTop: 8,
              borderTop: "1px solid #f3f4f6",
              gap: 8
            },
            children: [
              /* @__PURE__ */ g("div", { style: { display: "flex", alignItems: "center", gap: 8, minWidth: 0 }, children: [
                o.length > 0 ? /* @__PURE__ */ c(yr, { names: o, maxVisible: 5, size: 24 }) : /* @__PURE__ */ g("span", { style: { fontSize: 12, color: "#9ca3af" }, children: [
                  /* @__PURE__ */ c("strong", { style: { color: "#374151" }, children: a ?? 0 }),
                  " contributors"
                ] }),
                o.length > 0 && E > 0 && /* @__PURE__ */ g("span", { style: { fontSize: 11, color: "#9ca3af" }, children: [
                  "+",
                  E,
                  " more"
                ] })
              ] }),
              d && /* @__PURE__ */ g("div", { style: { display: "flex", alignItems: "center", gap: 5, flexShrink: 0 }, children: [
                /* @__PURE__ */ c(
                  "span",
                  {
                    style: {
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: i,
                      flexShrink: 0
                    }
                  }
                ),
                /* @__PURE__ */ c("span", { style: { fontSize: 11, color: "#9ca3af", whiteSpace: "nowrap" }, children: d })
              ] })
            ]
          }
        )
      ]
    }
  );
}
function ka(e) {
  const t = [], r = /* @__PURE__ */ new Map();
  for (const n of e) {
    const o = n.group ?? null;
    if (o === null) {
      (t.length === 0 || t[0].name !== null) && (t.unshift({ name: null, items: [] }), r.forEach((l, i) => r.set(i, l + 1))), t[0].items.push(n);
      continue;
    }
    let a = r.get(o);
    a === void 0 && (a = t.length, r.set(o, a), t.push({ name: o, items: [] })), t[a].items.push(n);
  }
  return t;
}
function Ct({
  items: e,
  storageKey: t,
  title: r,
  renderNavItem: n
}) {
  const o = Pe(() => ka(e), [e]), a = o.some((l) => l.name !== null);
  return /* @__PURE__ */ c("nav", { className: "flex-1 overflow-y-auto py-1", children: a ? o.map(
    (l) => l.name === null ? /* @__PURE__ */ c(St, { items: l.items, renderNavItem: n }, "__ungrouped") : /* @__PURE__ */ c(
      Ra,
      {
        name: l.name,
        items: l.items,
        storageKey: `${t}.${r}.${l.name}`,
        renderNavItem: n
      },
      l.name
    )
  ) : /* @__PURE__ */ c(St, { items: e, renderNavItem: n }) });
}
function vi({
  title: e,
  items: t,
  titleAction: r,
  railHeader: n,
  railWidth: o = 220,
  storageKey: a = "subnav",
  secondaryTitle: l,
  secondaryItems: i,
  secondaryStorageKey: d,
  secondaryRailWidth: u = 200,
  renderNavItem: p,
  children: m
}) {
  const v = i && i.length > 0;
  return /* @__PURE__ */ g("div", { className: "flex h-full min-h-0", children: [
    /* @__PURE__ */ g(
      "aside",
      {
        className: "flex-none border-r border-[var(--color-border)] bg-[var(--color-surface)] flex flex-col overflow-hidden",
        style: { width: o },
        children: [
          /* @__PURE__ */ g("div", { className: "flex items-center justify-between px-4 py-[14px] border-b border-[var(--color-border)]", children: [
            /* @__PURE__ */ c("span", { className: "text-[11px] font-semibold text-[var(--color-text-tertiary)] uppercase tracking-[0.05em]", children: e }),
            r
          ] }),
          n && /* @__PURE__ */ c("div", { className: "px-3 py-2 border-b border-[var(--color-border)]", children: n }),
          /* @__PURE__ */ c(Ct, { items: t, storageKey: a, title: e, renderNavItem: p })
        ]
      }
    ),
    v && /* @__PURE__ */ g(
      "aside",
      {
        className: "flex-none border-r border-[var(--color-border)] bg-[var(--color-surface)] flex flex-col overflow-hidden",
        style: { width: u },
        children: [
          /* @__PURE__ */ c("div", { className: "flex items-center justify-between px-4 py-[14px] border-b border-[var(--color-border)]", children: /* @__PURE__ */ c("span", { className: "text-[11px] font-semibold text-[var(--color-text-tertiary)] uppercase tracking-[0.05em]", children: l ?? "" }) }),
          /* @__PURE__ */ c(
            Ct,
            {
              items: i,
              storageKey: d ?? `${a}.secondary`,
              title: l ?? "secondary",
              renderNavItem: p
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ c("main", { className: "flex-1 min-w-0 overflow-auto p-6", children: m })
  ] });
}
function St({
  items: e,
  renderNavItem: t
}) {
  return /* @__PURE__ */ c(X, { children: e.map((r) => /* @__PURE__ */ c(pr, { item: r, renderNavItem: t }, r.path)) });
}
function Ra({
  name: e,
  items: t,
  storageKey: r,
  renderNavItem: n
}) {
  const [o, a] = G(() => typeof window > "u" ? !1 : window.localStorage?.getItem(r) === "1");
  _(() => {
    typeof window > "u" || (o ? window.localStorage?.setItem(r, "1") : window.localStorage?.removeItem(r));
  }, [o, r]);
  const l = t.find((d) => d.groupScrollAfter)?.groupScrollAfter, i = l ? { maxHeight: l * 38, overflowY: "auto" } : void 0;
  return /* @__PURE__ */ g("section", { className: "border-b border-[var(--color-border)]", children: [
    /* @__PURE__ */ g(
      "button",
      {
        type: "button",
        onClick: () => a((d) => !d),
        className: "flex items-center gap-1.5 w-full px-3 py-2 bg-transparent border-none cursor-pointer text-[var(--color-text-tertiary)] text-[10px] font-bold tracking-[0.05em] uppercase text-left",
        "aria-expanded": !o,
        children: [
          /* @__PURE__ */ c("span", { className: "text-[10px] w-[10px] inline-block", "aria-hidden": "true", children: o ? "▸" : "▾" }),
          /* @__PURE__ */ c("span", { className: "flex-1", children: e }),
          /* @__PURE__ */ c("span", { className: "text-[9px] font-medium text-[var(--color-text-tertiary)] bg-[var(--color-bg)] px-[5px] py-px rounded-[6px] border border-[var(--color-border)]", children: t.length })
        ]
      }
    ),
    !o && /* @__PURE__ */ c("div", { style: i, children: t.map((d) => /* @__PURE__ */ c(pr, { item: d, renderNavItem: n }, d.path)) })
  ] });
}
function pr({
  item: e,
  renderNavItem: t
}) {
  const r = e.accent === "danger" ? "#dc2626" : e.accent === "warning" ? "#d97706" : e.accent === "success" ? "#16a34a" : void 0, n = /* @__PURE__ */ g(X, { children: [
    /* @__PURE__ */ g("div", { className: "flex items-center justify-between gap-2", children: [
      /* @__PURE__ */ c(
        "span",
        {
          className: "text-[13px] font-medium text-[var(--color-text-secondary)]",
          style: r ? { color: r } : void 0,
          children: e.label
        }
      ),
      e.count !== void 0 && /* @__PURE__ */ c("span", { className: "text-[10px] font-medium text-[var(--color-text-tertiary)] bg-[var(--color-surface)] px-[6px] py-px rounded-[8px] border border-[var(--color-border)]", children: e.count })
    ] }),
    e.hint && /* @__PURE__ */ c("div", { className: "text-[10px] text-[var(--color-text-tertiary)] mt-0.5", children: e.hint })
  ] }), o = {
    display: "block",
    padding: "8px 14px",
    borderLeft: "3px solid transparent",
    color: "var(--color-text-secondary)",
    textDecoration: "none",
    cursor: "pointer"
  };
  return e.onClick ? /* @__PURE__ */ c(
    "button",
    {
      type: "button",
      onClick: e.onClick,
      className: "block w-full px-[14px] py-2 border-l-[3px] border-transparent border-t-0 border-r-0 border-b-0 bg-transparent text-[var(--color-text-secondary)] text-left cursor-pointer font-[inherit]",
      children: n
    }
  ) : t ? /* @__PURE__ */ c(X, { children: t(e, n, o) }) : /* @__PURE__ */ c(
    "a",
    {
      href: e.path,
      className: "block px-[14px] py-2 border-l-[3px] border-transparent text-[var(--color-text-secondary)] no-underline cursor-pointer",
      children: n
    }
  );
}
const Pa = [
  "a[href]",
  "button:not([disabled])",
  'input:not([disabled]):not([type="hidden"])',
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
  '[contenteditable="true"]'
].join(",");
function Nt(e) {
  return Array.from(e.querySelectorAll(Pa)).filter(
    (t) => t.getAttribute("aria-hidden") !== "true"
  );
}
function Aa(e, t, r) {
  return t === "right" ? {
    position: "fixed",
    top: e.top,
    left: e.right + r
  } : {
    position: "fixed",
    top: e.bottom + r,
    left: e.left
  };
}
function hi({
  trigger: e,
  open: t,
  onClose: r,
  placement: n = "bottom-start",
  offset: o = 6,
  className: a,
  zIndex: l = 9500,
  "data-testid": i = "inline-popover",
  children: d
}) {
  const u = fe(null), [p, m] = G(null), v = fe(null), b = U(() => {
    const y = e.current;
    if (!y) return;
    const f = y.getBoundingClientRect();
    m(Aa(f, n, o));
  }, [e, n, o]);
  return hr(() => {
    if (!t) {
      m(null);
      return;
    }
    b();
  }, [t, b]), _(() => {
    if (!t) return;
    const y = () => b();
    return window.addEventListener("scroll", y, !0), window.addEventListener("resize", y), () => {
      window.removeEventListener("scroll", y, !0), window.removeEventListener("resize", y);
    };
  }, [t, b]), _(() => {
    if (!t) return;
    const y = typeof document < "u" ? document.activeElement : null;
    return v.current = y, queueMicrotask(() => {
      const f = u.current;
      if (!f) return;
      const x = Nt(f);
      x.length > 0 ? x[0].focus() : (f.setAttribute("tabindex", "-1"), f.focus());
    }), () => {
      const f = v.current;
      f && typeof f.focus == "function" && document.contains(f) && f.focus(), v.current = null;
    };
  }, [t]), _(() => {
    if (!t) return;
    const y = (f) => {
      if (f.key === "Escape") {
        f.stopPropagation(), r();
        return;
      }
      if (f.key !== "Tab") return;
      const x = u.current;
      if (!x) return;
      const E = Nt(x);
      if (E.length === 0) {
        f.preventDefault();
        return;
      }
      const N = E[0], P = E[E.length - 1], R = document.activeElement;
      if (!R || !x.contains(R)) {
        f.preventDefault(), N.focus();
        return;
      }
      f.shiftKey && R === N ? (f.preventDefault(), P.focus()) : !f.shiftKey && R === P && (f.preventDefault(), N.focus());
    };
    return window.addEventListener("keydown", y), () => window.removeEventListener("keydown", y);
  }, [t, r]), _(() => {
    if (!t) return;
    const y = (f) => {
      const x = f.target;
      x && (u.current?.contains(x) || e.current?.contains(x) || r());
    };
    return document.addEventListener("mousedown", y), () => document.removeEventListener("mousedown", y);
  }, [t, r, e]), !t || !p || typeof document > "u" ? null : Rt(
    /* @__PURE__ */ c(
      "div",
      {
        ref: u,
        role: "dialog",
        "data-testid": i,
        "data-placement": n,
        className: w(
          "min-w-[160px] rounded-lg border border-slate-200 bg-white",
          "shadow-lg p-1 text-sm text-slate-700",
          a
        ),
        style: { ...p, zIndex: l },
        children: d
      }
    ),
    document.body
  );
}
export {
  pi as B,
  oi as C,
  ei as D,
  Ja as E,
  Xa as F,
  ni as I,
  li as M,
  ai as P,
  ci as Q,
  ri as S,
  Ga as T,
  fi as U,
  di as a,
  ii as b,
  Wa as c,
  ti as d,
  Ka as e,
  Ha as f,
  Ua as g,
  ui as h,
  Va as i,
  hi as j,
  Za as k,
  mi as l,
  Qa as m,
  qa as n,
  Ya as o,
  vi as p,
  za as q,
  si as r,
  qe as s,
  xa as t,
  ya as u,
  ja as v
};
