import { jsxs as g, jsx as s, Fragment as re } from "react/jsx-runtime";
import * as c from "react";
import { useState as K, useCallback as Y, createContext as xr, useMemo as te, useEffect as H, useContext as yr, useId as Ot, useRef as be, useLayoutEffect as wr } from "react";
import { c as y } from "./cn-B6yFEsav.js";
import * as Er from "react-dom";
import Nr, { createPortal as Tt } from "react-dom";
import { M as Cr } from "./Modal-2jg4229_.js";
import { T as Sr, b as kr, e as ut, a as Rr, c as Fe, d as ve } from "./PageSection-B_nBFSjK.js";
import { A as et, a as Pr } from "./Avatar-Q-j4vnWn.js";
import { S as It, A as Ar } from "./Badge-FT03wujO.js";
import "clsx";
import "tailwind-merge";
const Dr = [
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
], Or = [
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
], Tr = [
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
function Ir(e) {
  return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function Lr(e, t) {
  let r = e.replace(/(\/\/.*?)(\n|$)/g, `<span style="color:${t.comment}">$1</span>$2`);
  r = r.replace(/(\/\*[\s\S]*?\*\/)/g, `<span style="color:${t.comment}">$1</span>`), r = r.replace(
    /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/g,
    `<span style="color:${t.string}">$1</span>`
  );
  const n = new RegExp(`\\b(${Dr.join("|")})\\b`, "g");
  return r = r.replace(n, `<span style="color:${t.keyword}">$1</span>`), r = r.replace(/\b(\d+(?:\.\d+)?)\b/g, `<span style="color:${t.number}">$1</span>`), r;
}
function $r(e, t) {
  let r = e.replace(
    /("(?:[^"\\]|\\.)*")(\s*:)/g,
    `<span style="color:${t.property}">$1</span>$2`
  );
  return r = r.replace(/("(?:[^"\\]|\\.)*")/g, `<span style="color:${t.string}">$1</span>`), r = r.replace(/\b(true|false|null)\b/g, `<span style="color:${t.keyword}">$1</span>`), r = r.replace(/\b(-?\d+(?:\.\d+)?)\b/g, `<span style="color:${t.number}">$1</span>`), r;
}
function Mr(e, t) {
  let r = e.replace(/(#.*?)(\n|$)/g, `<span style="color:${t.comment}">$1</span>$2`);
  r = r.replace(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g, `<span style="color:${t.string}">$1</span>`);
  const n = new RegExp(`\\b(${Or.join("|")})\\b`, "g");
  r = r.replace(n, `<span style="color:${t.keyword}">$1</span>`);
  const o = new RegExp(`\\b(${Tr.join("|")})\\b`, "g");
  return r = r.replace(o, `<span style="color:${t.builtin}">$1</span>`), r = r.replace(/(\$\w+|\$\{[^}]+\})/g, `<span style="color:${t.variable}">$1</span>`), r;
}
const _r = {
  comment: "#6b7280",
  string: "#4ade80",
  keyword: "#93c5fd",
  number: "#fbbf24",
  property: "#7dd3fc",
  builtin: "#c4b5fd",
  variable: "#fbbf24"
}, Fr = {
  comment: "#64748b",
  string: "#15803d",
  keyword: "#1d4ed8",
  number: "#a16207",
  property: "#0369a1",
  builtin: "#7c3aed",
  variable: "#a16207"
};
function dt(e, t, r) {
  const n = r === "dark" ? _r : Fr, o = Ir(e);
  switch (t) {
    case "json":
      return $r(o, n);
    case "bash":
    case "sh":
      return Mr(o, n);
    case "text":
      return o;
    default:
      return Lr(o, n);
  }
}
function Qa({
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
  const [u, p] = K(!1), m = Y(() => {
    typeof navigator > "u" || !navigator.clipboard || navigator.clipboard.writeText(e).then(() => {
      p(!0), setTimeout(() => p(!1), 1500);
    }).catch(() => {
    });
  }, [e]), v = r === "dark", h = e.split(`
`);
  return /* @__PURE__ */ g(
    "div",
    {
      "data-testid": i,
      "data-language": t,
      "data-theme": r,
      className: y(
        "relative rounded-lg border font-mono text-[13px] leading-relaxed overflow-hidden",
        v ? "bg-slate-800 text-slate-100 border-slate-700" : "bg-slate-50 text-slate-900 border-slate-200",
        a
      ),
      style: l,
      "aria-label": d ?? `Code (${t})`,
      children: [
        n && /* @__PURE__ */ s(
          "button",
          {
            type: "button",
            onClick: m,
            "aria-label": u ? "Copied" : "Copy code",
            className: y(
              "absolute top-2 right-2 text-[11px] px-2 py-1 rounded border transition-opacity",
              v ? "bg-slate-700 text-slate-100 border-slate-600 hover:bg-slate-600" : "bg-white text-slate-700 border-slate-300 hover:bg-slate-100"
            ),
            "data-copied": u ? "true" : "false",
            children: u ? "Copied" : "Copy"
          }
        ),
        /* @__PURE__ */ s("pre", { className: "m-0 px-4 py-3 overflow-x-auto", children: o ? /* @__PURE__ */ g("div", { className: "flex", children: [
          /* @__PURE__ */ s(
            "div",
            {
              className: y(
                "select-none pr-3 text-right",
                v ? "text-slate-500" : "text-slate-400"
              ),
              "aria-hidden": "true",
              children: h.map((w, f) => /* @__PURE__ */ s("div", { children: f + 1 }, f))
            }
          ),
          /* @__PURE__ */ s(
            "code",
            {
              className: "flex-1 block",
              dangerouslySetInnerHTML: { __html: dt(e, t, r) }
            }
          )
        ] }) : /* @__PURE__ */ s(
          "code",
          {
            className: "block",
            dangerouslySetInnerHTML: { __html: dt(e, t, r) }
          }
        ) })
      ]
    }
  );
}
var ft = 1, Wr = 0.9, Br = 0.8, jr = 0.17, We = 0.1, Be = 0.999, Ur = 0.9999, Kr = 0.99, Hr = /[\\\/_+.#"@\[\(\{&]/, Vr = /[\\\/_+.#"@\[\(\{&]/g, zr = /[\s-]/, Lt = /[\s-]/g;
function Ze(e, t, r, n, o, a, l) {
  if (a === t.length) return o === e.length ? ft : Kr;
  var i = `${o},${a}`;
  if (l[i] !== void 0) return l[i];
  for (var d = n.charAt(a), u = r.indexOf(d, o), p = 0, m, v, h, w; u >= 0; ) m = Ze(e, t, r, n, u + 1, a + 1, l), m > p && (u === o ? m *= ft : Hr.test(e.charAt(u - 1)) ? (m *= Br, h = e.slice(o, u - 1).match(Vr), h && o > 0 && (m *= Math.pow(Be, h.length))) : zr.test(e.charAt(u - 1)) ? (m *= Wr, w = e.slice(o, u - 1).match(Lt), w && o > 0 && (m *= Math.pow(Be, w.length))) : (m *= jr, o > 0 && (m *= Math.pow(Be, u - o))), e.charAt(u) !== t.charAt(a) && (m *= Ur)), (m < We && r.charAt(u - 1) === n.charAt(a + 1) || n.charAt(a + 1) === n.charAt(a) && r.charAt(u - 1) !== n.charAt(a)) && (v = Ze(e, t, r, n, u + 1, a + 2, l), v * We > m && (m = v * We)), m > p && (p = m), u = r.indexOf(d, u + 1);
  return l[i] = p, p;
}
function pt(e) {
  return e.toLowerCase().replace(Lt, " ");
}
function Gr(e, t, r) {
  return e = r && r.length > 0 ? `${e + " " + r.join(" ")}` : e, Ze(e, t, pt(e), pt(t), 0, 0, {});
}
function X(e, t, { checkForDefaultPrevented: r = !0 } = {}) {
  return function(o) {
    if (e?.(o), r === !1 || !o.defaultPrevented)
      return t?.(o);
  };
}
function mt(e, t) {
  if (typeof e == "function")
    return e(t);
  e != null && (e.current = t);
}
function Q(...e) {
  return (t) => {
    let r = !1;
    const n = e.map((o) => {
      const a = mt(o, t);
      return !r && typeof a == "function" && (r = !0), a;
    });
    if (r)
      return () => {
        for (let o = 0; o < n.length; o++) {
          const a = n[o];
          typeof a == "function" ? a() : mt(e[o], null);
        }
      };
  };
}
function ae(...e) {
  return c.useCallback(Q(...e), e);
}
function Yr(e, t) {
  const r = c.createContext(t), n = (a) => {
    const { children: l, ...i } = a, d = c.useMemo(() => i, Object.values(i));
    return /* @__PURE__ */ s(r.Provider, { value: d, children: l });
  };
  n.displayName = e + "Provider";
  function o(a) {
    const l = c.useContext(r);
    if (l) return l;
    if (t !== void 0) return t;
    throw new Error(`\`${a}\` must be used within \`${e}\``);
  }
  return [n, o];
}
function qr(e, t = []) {
  let r = [];
  function n(a, l) {
    const i = c.createContext(l), d = r.length;
    r = [...r, l];
    const u = (m) => {
      const { scope: v, children: h, ...w } = m, f = v?.[e]?.[d] || i, x = c.useMemo(() => w, Object.values(w));
      return /* @__PURE__ */ s(f.Provider, { value: x, children: h });
    };
    u.displayName = a + "Provider";
    function p(m, v) {
      const h = v?.[e]?.[d] || i, w = c.useContext(h);
      if (w) return w;
      if (l !== void 0) return l;
      throw new Error(`\`${m}\` must be used within \`${a}\``);
    }
    return [u, p];
  }
  const o = () => {
    const a = r.map((l) => c.createContext(l));
    return function(i) {
      const d = i?.[e] || a;
      return c.useMemo(
        () => ({ [`__scope${e}`]: { ...i, [e]: d } }),
        [i, d]
      );
    };
  };
  return o.scopeName = e, [n, Zr(o, ...t)];
}
function Zr(...e) {
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
      return c.useMemo(() => ({ [`__scope${t.scopeName}`]: l }), [l]);
    };
  };
  return r.scopeName = t.scopeName, r;
}
var ge = globalThis?.document ? c.useLayoutEffect : () => {
}, Xr = c[" useId ".trim().toString()] || (() => {
}), Qr = 0;
function q(e) {
  const [t, r] = c.useState(Xr());
  return ge(() => {
    r((n) => n ?? String(Qr++));
  }, [e]), t ? `radix-${t}` : "";
}
var Jr = c[" useInsertionEffect ".trim().toString()] || ge;
function en({
  prop: e,
  defaultProp: t,
  onChange: r = () => {
  },
  caller: n
}) {
  const [o, a, l] = tn({
    defaultProp: t,
    onChange: r
  }), i = e !== void 0, d = i ? e : o;
  {
    const p = c.useRef(e !== void 0);
    c.useEffect(() => {
      const m = p.current;
      m !== i && console.warn(
        `${n} is changing from ${m ? "controlled" : "uncontrolled"} to ${i ? "controlled" : "uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`
      ), p.current = i;
    }, [i, n]);
  }
  const u = c.useCallback(
    (p) => {
      if (i) {
        const m = rn(p) ? p(e) : p;
        m !== e && l.current?.(m);
      } else
        a(p);
    },
    [i, e, a, l]
  );
  return [d, u];
}
function tn({
  defaultProp: e,
  onChange: t
}) {
  const [r, n] = c.useState(e), o = c.useRef(r), a = c.useRef(t);
  return Jr(() => {
    a.current = t;
  }, [t]), c.useEffect(() => {
    o.current !== r && (a.current?.(r), o.current = r);
  }, [r, o]), [r, n, a];
}
function rn(e) {
  return typeof e == "function";
}
// @__NO_SIDE_EFFECTS__
function ye(e) {
  const t = /* @__PURE__ */ nn(e), r = c.forwardRef((n, o) => {
    const { children: a, ...l } = n, i = c.Children.toArray(a), d = i.find(an);
    if (d) {
      const u = d.props.children, p = i.map((m) => m === d ? c.Children.count(u) > 1 ? c.Children.only(null) : c.isValidElement(u) ? u.props.children : null : m);
      return /* @__PURE__ */ s(t, { ...l, ref: o, children: c.isValidElement(u) ? c.cloneElement(u, void 0, p) : null });
    }
    return /* @__PURE__ */ s(t, { ...l, ref: o, children: a });
  });
  return r.displayName = `${e}.Slot`, r;
}
// @__NO_SIDE_EFFECTS__
function nn(e) {
  const t = c.forwardRef((r, n) => {
    const { children: o, ...a } = r;
    if (c.isValidElement(o)) {
      const l = sn(o), i = ln(a, o.props);
      return o.type !== c.Fragment && (i.ref = n ? Q(n, l) : l), c.cloneElement(o, i);
    }
    return c.Children.count(o) > 1 ? c.Children.only(null) : null;
  });
  return t.displayName = `${e}.SlotClone`, t;
}
var on = /* @__PURE__ */ Symbol("radix.slottable");
function an(e) {
  return c.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === on;
}
function ln(e, t) {
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
function sn(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, r = t && "isReactWarning" in t && t.isReactWarning;
  return r ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, r = t && "isReactWarning" in t && t.isReactWarning, r ? e.props.ref : e.props.ref || e.ref);
}
var cn = [
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
], $t = cn.reduce((e, t) => {
  const r = /* @__PURE__ */ ye(`Primitive.${t}`), n = c.forwardRef((o, a) => {
    const { asChild: l, ...i } = o, d = l ? r : t;
    return typeof window < "u" && (window[/* @__PURE__ */ Symbol.for("radix-ui")] = !0), /* @__PURE__ */ s(d, { ...i, ref: a });
  });
  return n.displayName = `Primitive.${t}`, { ...e, [t]: n };
}, {});
function un(e, t) {
  e && Er.flushSync(() => e.dispatchEvent(t));
}
function xe(e) {
  const t = c.useRef(e);
  return c.useEffect(() => {
    t.current = e;
  }), c.useMemo(() => (...r) => t.current?.(...r), []);
}
function dn(e, t = globalThis?.document) {
  const r = xe(e);
  c.useEffect(() => {
    const n = (o) => {
      o.key === "Escape" && r(o);
    };
    return t.addEventListener("keydown", n, { capture: !0 }), () => t.removeEventListener("keydown", n, { capture: !0 });
  }, [r, t]);
}
var fn = "DismissableLayer", Xe = "dismissableLayer.update", pn = "dismissableLayer.pointerDownOutside", mn = "dismissableLayer.focusOutside", vt, Mt = c.createContext({
  layers: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
}), _t = c.forwardRef(
  (e, t) => {
    const {
      disableOutsidePointerEvents: r = !1,
      onEscapeKeyDown: n,
      onPointerDownOutside: o,
      onFocusOutside: a,
      onInteractOutside: l,
      onDismiss: i,
      ...d
    } = e, u = c.useContext(Mt), [p, m] = c.useState(null), v = p?.ownerDocument ?? globalThis?.document, [, h] = c.useState({}), w = ae(t, (C) => m(C)), f = Array.from(u.layers), [x] = [...u.layersWithOutsidePointerEventsDisabled].slice(-1), E = f.indexOf(x), R = p ? f.indexOf(p) : -1, A = u.layersWithOutsidePointerEventsDisabled.size > 0, k = R >= E, T = bn((C) => {
      const _ = C.target, F = [...u.branches].some((U) => U.contains(_));
      !k || F || (o?.(C), l?.(C), C.defaultPrevented || i?.());
    }, v), D = gn((C) => {
      const _ = C.target;
      [...u.branches].some((U) => U.contains(_)) || (a?.(C), l?.(C), C.defaultPrevented || i?.());
    }, v);
    return dn((C) => {
      R === u.layers.size - 1 && (n?.(C), !C.defaultPrevented && i && (C.preventDefault(), i()));
    }, v), c.useEffect(() => {
      if (p)
        return r && (u.layersWithOutsidePointerEventsDisabled.size === 0 && (vt = v.body.style.pointerEvents, v.body.style.pointerEvents = "none"), u.layersWithOutsidePointerEventsDisabled.add(p)), u.layers.add(p), ht(), () => {
          r && u.layersWithOutsidePointerEventsDisabled.size === 1 && (v.body.style.pointerEvents = vt);
        };
    }, [p, v, r, u]), c.useEffect(() => () => {
      p && (u.layers.delete(p), u.layersWithOutsidePointerEventsDisabled.delete(p), ht());
    }, [p, u]), c.useEffect(() => {
      const C = () => h({});
      return document.addEventListener(Xe, C), () => document.removeEventListener(Xe, C);
    }, []), /* @__PURE__ */ s(
      $t.div,
      {
        ...d,
        ref: w,
        style: {
          pointerEvents: A ? k ? "auto" : "none" : void 0,
          ...e.style
        },
        onFocusCapture: X(e.onFocusCapture, D.onFocusCapture),
        onBlurCapture: X(e.onBlurCapture, D.onBlurCapture),
        onPointerDownCapture: X(
          e.onPointerDownCapture,
          T.onPointerDownCapture
        )
      }
    );
  }
);
_t.displayName = fn;
var vn = "DismissableLayerBranch", hn = c.forwardRef((e, t) => {
  const r = c.useContext(Mt), n = c.useRef(null), o = ae(t, n);
  return c.useEffect(() => {
    const a = n.current;
    if (a)
      return r.branches.add(a), () => {
        r.branches.delete(a);
      };
  }, [r.branches]), /* @__PURE__ */ s($t.div, { ...e, ref: o });
});
hn.displayName = vn;
function bn(e, t = globalThis?.document) {
  const r = xe(e), n = c.useRef(!1), o = c.useRef(() => {
  });
  return c.useEffect(() => {
    const a = (i) => {
      if (i.target && !n.current) {
        let d = function() {
          Ft(
            pn,
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
function gn(e, t = globalThis?.document) {
  const r = xe(e), n = c.useRef(!1);
  return c.useEffect(() => {
    const o = (a) => {
      a.target && !n.current && Ft(mn, r, { originalEvent: a }, {
        discrete: !1
      });
    };
    return t.addEventListener("focusin", o), () => t.removeEventListener("focusin", o);
  }, [t, r]), {
    onFocusCapture: () => n.current = !0,
    onBlurCapture: () => n.current = !1
  };
}
function ht() {
  const e = new CustomEvent(Xe);
  document.dispatchEvent(e);
}
function Ft(e, t, r, { discrete: n }) {
  const o = r.originalEvent.target, a = new CustomEvent(e, { bubbles: !1, cancelable: !0, detail: r });
  t && o.addEventListener(e, t, { once: !0 }), n ? un(o, a) : o.dispatchEvent(a);
}
var xn = [
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
], yn = xn.reduce((e, t) => {
  const r = /* @__PURE__ */ ye(`Primitive.${t}`), n = c.forwardRef((o, a) => {
    const { asChild: l, ...i } = o, d = l ? r : t;
    return typeof window < "u" && (window[/* @__PURE__ */ Symbol.for("radix-ui")] = !0), /* @__PURE__ */ s(d, { ...i, ref: a });
  });
  return n.displayName = `Primitive.${t}`, { ...e, [t]: n };
}, {}), je = "focusScope.autoFocusOnMount", Ue = "focusScope.autoFocusOnUnmount", bt = { bubbles: !1, cancelable: !0 }, wn = "FocusScope", Wt = c.forwardRef((e, t) => {
  const {
    loop: r = !1,
    trapped: n = !1,
    onMountAutoFocus: o,
    onUnmountAutoFocus: a,
    ...l
  } = e, [i, d] = c.useState(null), u = xe(o), p = xe(a), m = c.useRef(null), v = ae(t, (f) => d(f)), h = c.useRef({
    paused: !1,
    pause() {
      this.paused = !0;
    },
    resume() {
      this.paused = !1;
    }
  }).current;
  c.useEffect(() => {
    if (n) {
      let f = function(A) {
        if (h.paused || !i) return;
        const k = A.target;
        i.contains(k) ? m.current = k : Z(m.current, { select: !0 });
      }, x = function(A) {
        if (h.paused || !i) return;
        const k = A.relatedTarget;
        k !== null && (i.contains(k) || Z(m.current, { select: !0 }));
      }, E = function(A) {
        if (document.activeElement === document.body)
          for (const T of A)
            T.removedNodes.length > 0 && Z(i);
      };
      document.addEventListener("focusin", f), document.addEventListener("focusout", x);
      const R = new MutationObserver(E);
      return i && R.observe(i, { childList: !0, subtree: !0 }), () => {
        document.removeEventListener("focusin", f), document.removeEventListener("focusout", x), R.disconnect();
      };
    }
  }, [n, i, h.paused]), c.useEffect(() => {
    if (i) {
      xt.add(h);
      const f = document.activeElement;
      if (!i.contains(f)) {
        const E = new CustomEvent(je, bt);
        i.addEventListener(je, u), i.dispatchEvent(E), E.defaultPrevented || (En(Rn(Bt(i)), { select: !0 }), document.activeElement === f && Z(i));
      }
      return () => {
        i.removeEventListener(je, u), setTimeout(() => {
          const E = new CustomEvent(Ue, bt);
          i.addEventListener(Ue, p), i.dispatchEvent(E), E.defaultPrevented || Z(f ?? document.body, { select: !0 }), i.removeEventListener(Ue, p), xt.remove(h);
        }, 0);
      };
    }
  }, [i, u, p, h]);
  const w = c.useCallback(
    (f) => {
      if (!r && !n || h.paused) return;
      const x = f.key === "Tab" && !f.altKey && !f.ctrlKey && !f.metaKey, E = document.activeElement;
      if (x && E) {
        const R = f.currentTarget, [A, k] = Nn(R);
        A && k ? !f.shiftKey && E === k ? (f.preventDefault(), r && Z(A, { select: !0 })) : f.shiftKey && E === A && (f.preventDefault(), r && Z(k, { select: !0 })) : E === R && f.preventDefault();
      }
    },
    [r, n, h.paused]
  );
  return /* @__PURE__ */ s(yn.div, { tabIndex: -1, ...l, ref: v, onKeyDown: w });
});
Wt.displayName = wn;
function En(e, { select: t = !1 } = {}) {
  const r = document.activeElement;
  for (const n of e)
    if (Z(n, { select: t }), document.activeElement !== r) return;
}
function Nn(e) {
  const t = Bt(e), r = gt(t, e), n = gt(t.reverse(), e);
  return [r, n];
}
function Bt(e) {
  const t = [], r = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (n) => {
      const o = n.tagName === "INPUT" && n.type === "hidden";
      return n.disabled || n.hidden || o ? NodeFilter.FILTER_SKIP : n.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  for (; r.nextNode(); ) t.push(r.currentNode);
  return t;
}
function gt(e, t) {
  for (const r of e)
    if (!Cn(r, { upTo: t })) return r;
}
function Cn(e, { upTo: t }) {
  if (getComputedStyle(e).visibility === "hidden") return !0;
  for (; e; ) {
    if (t !== void 0 && e === t) return !1;
    if (getComputedStyle(e).display === "none") return !0;
    e = e.parentElement;
  }
  return !1;
}
function Sn(e) {
  return e instanceof HTMLInputElement && "select" in e;
}
function Z(e, { select: t = !1 } = {}) {
  if (e && e.focus) {
    const r = document.activeElement;
    e.focus({ preventScroll: !0 }), e !== r && Sn(e) && t && e.select();
  }
}
var xt = kn();
function kn() {
  let e = [];
  return {
    add(t) {
      const r = e[0];
      t !== r && r?.pause(), e = yt(e, t), e.unshift(t);
    },
    remove(t) {
      e = yt(e, t), e[0]?.resume();
    }
  };
}
function yt(e, t) {
  const r = [...e], n = r.indexOf(t);
  return n !== -1 && r.splice(n, 1), r;
}
function Rn(e) {
  return e.filter((t) => t.tagName !== "A");
}
var Pn = [
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
], An = Pn.reduce((e, t) => {
  const r = /* @__PURE__ */ ye(`Primitive.${t}`), n = c.forwardRef((o, a) => {
    const { asChild: l, ...i } = o, d = l ? r : t;
    return typeof window < "u" && (window[/* @__PURE__ */ Symbol.for("radix-ui")] = !0), /* @__PURE__ */ s(d, { ...i, ref: a });
  });
  return n.displayName = `Primitive.${t}`, { ...e, [t]: n };
}, {}), Dn = "Portal", jt = c.forwardRef((e, t) => {
  const { container: r, ...n } = e, [o, a] = c.useState(!1);
  ge(() => a(!0), []);
  const l = r || o && globalThis?.document?.body;
  return l ? Nr.createPortal(/* @__PURE__ */ s(An.div, { ...n, ref: t }), l) : null;
});
jt.displayName = Dn;
function On(e, t) {
  return c.useReducer((r, n) => t[r][n] ?? r, e);
}
var Le = (e) => {
  const { present: t, children: r } = e, n = Tn(t), o = typeof r == "function" ? r({ present: n.isPresent }) : c.Children.only(r), a = ae(n.ref, In(o));
  return typeof r == "function" || n.isPresent ? c.cloneElement(o, { ref: a }) : null;
};
Le.displayName = "Presence";
function Tn(e) {
  const [t, r] = c.useState(), n = c.useRef(null), o = c.useRef(e), a = c.useRef("none"), l = e ? "mounted" : "unmounted", [i, d] = On(l, {
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
  return c.useEffect(() => {
    const u = Ce(n.current);
    a.current = i === "mounted" ? u : "none";
  }, [i]), ge(() => {
    const u = n.current, p = o.current;
    if (p !== e) {
      const v = a.current, h = Ce(u);
      e ? d("MOUNT") : h === "none" || u?.display === "none" ? d("UNMOUNT") : d(p && v !== h ? "ANIMATION_OUT" : "UNMOUNT"), o.current = e;
    }
  }, [e, d]), ge(() => {
    if (t) {
      let u;
      const p = t.ownerDocument.defaultView ?? window, m = (h) => {
        const f = Ce(n.current).includes(CSS.escape(h.animationName));
        if (h.target === t && f && (d("ANIMATION_END"), !o.current)) {
          const x = t.style.animationFillMode;
          t.style.animationFillMode = "forwards", u = p.setTimeout(() => {
            t.style.animationFillMode === "forwards" && (t.style.animationFillMode = x);
          });
        }
      }, v = (h) => {
        h.target === t && (a.current = Ce(n.current));
      };
      return t.addEventListener("animationstart", v), t.addEventListener("animationcancel", m), t.addEventListener("animationend", m), () => {
        p.clearTimeout(u), t.removeEventListener("animationstart", v), t.removeEventListener("animationcancel", m), t.removeEventListener("animationend", m);
      };
    } else
      d("ANIMATION_END");
  }, [t, d]), {
    isPresent: ["mounted", "unmountSuspended"].includes(i),
    ref: c.useCallback((u) => {
      n.current = u ? getComputedStyle(u) : null, r(u);
    }, [])
  };
}
function Ce(e) {
  return e?.animationName || "none";
}
function In(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, r = t && "isReactWarning" in t && t.isReactWarning;
  return r ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, r = t && "isReactWarning" in t && t.isReactWarning, r ? e.props.ref : e.props.ref || e.ref);
}
var Ln = [
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
], we = Ln.reduce((e, t) => {
  const r = /* @__PURE__ */ ye(`Primitive.${t}`), n = c.forwardRef((o, a) => {
    const { asChild: l, ...i } = o, d = l ? r : t;
    return typeof window < "u" && (window[/* @__PURE__ */ Symbol.for("radix-ui")] = !0), /* @__PURE__ */ s(d, { ...i, ref: a });
  });
  return n.displayName = `Primitive.${t}`, { ...e, [t]: n };
}, {}), Ke = 0;
function $n() {
  c.useEffect(() => {
    const e = document.querySelectorAll("[data-radix-focus-guard]");
    return document.body.insertAdjacentElement("afterbegin", e[0] ?? wt()), document.body.insertAdjacentElement("beforeend", e[1] ?? wt()), Ke++, () => {
      Ke === 1 && document.querySelectorAll("[data-radix-focus-guard]").forEach((t) => t.remove()), Ke--;
    };
  }, []);
}
function wt() {
  const e = document.createElement("span");
  return e.setAttribute("data-radix-focus-guard", ""), e.tabIndex = 0, e.style.outline = "none", e.style.opacity = "0", e.style.position = "fixed", e.style.pointerEvents = "none", e;
}
var G = function() {
  return G = Object.assign || function(t) {
    for (var r, n = 1, o = arguments.length; n < o; n++) {
      r = arguments[n];
      for (var a in r) Object.prototype.hasOwnProperty.call(r, a) && (t[a] = r[a]);
    }
    return t;
  }, G.apply(this, arguments);
};
function Ut(e, t) {
  var r = {};
  for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && t.indexOf(n) < 0 && (r[n] = e[n]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var o = 0, n = Object.getOwnPropertySymbols(e); o < n.length; o++)
      t.indexOf(n[o]) < 0 && Object.prototype.propertyIsEnumerable.call(e, n[o]) && (r[n[o]] = e[n[o]]);
  return r;
}
function Mn(e, t, r) {
  if (r || arguments.length === 2) for (var n = 0, o = t.length, a; n < o; n++)
    (a || !(n in t)) && (a || (a = Array.prototype.slice.call(t, 0, n)), a[n] = t[n]);
  return e.concat(a || Array.prototype.slice.call(t));
}
var Ae = "right-scroll-bar-position", De = "width-before-scroll-bar", _n = "with-scroll-bars-hidden", Fn = "--removed-body-scroll-bar-size";
function He(e, t) {
  return typeof e == "function" ? e(t) : e && (e.current = t), e;
}
function Wn(e, t) {
  var r = K(function() {
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
var Bn = typeof window < "u" ? c.useLayoutEffect : c.useEffect, Et = /* @__PURE__ */ new WeakMap();
function jn(e, t) {
  var r = Wn(null, function(n) {
    return e.forEach(function(o) {
      return He(o, n);
    });
  });
  return Bn(function() {
    var n = Et.get(r);
    if (n) {
      var o = new Set(n), a = new Set(e), l = r.current;
      o.forEach(function(i) {
        a.has(i) || He(i, null);
      }), a.forEach(function(i) {
        o.has(i) || He(i, l);
      });
    }
    Et.set(r, e);
  }, [e]), r;
}
function Un(e) {
  return e;
}
function Kn(e, t) {
  t === void 0 && (t = Un);
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
function Hn(e) {
  e === void 0 && (e = {});
  var t = Kn(null);
  return t.options = G({ async: !0, ssr: !1 }, e), t;
}
var Kt = function(e) {
  var t = e.sideCar, r = Ut(e, ["sideCar"]);
  if (!t)
    throw new Error("Sidecar: please provide `sideCar` property to import the right car");
  var n = t.read();
  if (!n)
    throw new Error("Sidecar medium not found");
  return c.createElement(n, G({}, r));
};
Kt.isSideCarExport = !0;
function Vn(e, t) {
  return e.useMedium(t), Kt;
}
var Ht = Hn(), Ve = function() {
}, $e = c.forwardRef(function(e, t) {
  var r = c.useRef(null), n = c.useState({
    onScrollCapture: Ve,
    onWheelCapture: Ve,
    onTouchMoveCapture: Ve
  }), o = n[0], a = n[1], l = e.forwardProps, i = e.children, d = e.className, u = e.removeScrollBar, p = e.enabled, m = e.shards, v = e.sideCar, h = e.noRelative, w = e.noIsolation, f = e.inert, x = e.allowPinchZoom, E = e.as, R = E === void 0 ? "div" : E, A = e.gapMode, k = Ut(e, ["forwardProps", "children", "className", "removeScrollBar", "enabled", "shards", "sideCar", "noRelative", "noIsolation", "inert", "allowPinchZoom", "as", "gapMode"]), T = v, D = jn([r, t]), C = G(G({}, k), o);
  return c.createElement(
    c.Fragment,
    null,
    p && c.createElement(T, { sideCar: Ht, removeScrollBar: u, shards: m, noRelative: h, noIsolation: w, inert: f, setCallbacks: a, allowPinchZoom: !!x, lockRef: r, gapMode: A }),
    l ? c.cloneElement(c.Children.only(i), G(G({}, C), { ref: D })) : c.createElement(R, G({}, C, { className: d, ref: D }), i)
  );
});
$e.defaultProps = {
  enabled: !0,
  removeScrollBar: !0,
  inert: !1
};
$e.classNames = {
  fullWidth: De,
  zeroRight: Ae
};
var zn = function() {
  if (typeof __webpack_nonce__ < "u")
    return __webpack_nonce__;
};
function Gn() {
  if (!document)
    return null;
  var e = document.createElement("style");
  e.type = "text/css";
  var t = zn();
  return t && e.setAttribute("nonce", t), e;
}
function Yn(e, t) {
  e.styleSheet ? e.styleSheet.cssText = t : e.appendChild(document.createTextNode(t));
}
function qn(e) {
  var t = document.head || document.getElementsByTagName("head")[0];
  t.appendChild(e);
}
var Zn = function() {
  var e = 0, t = null;
  return {
    add: function(r) {
      e == 0 && (t = Gn()) && (Yn(t, r), qn(t)), e++;
    },
    remove: function() {
      e--, !e && t && (t.parentNode && t.parentNode.removeChild(t), t = null);
    }
  };
}, Xn = function() {
  var e = Zn();
  return function(t, r) {
    c.useEffect(function() {
      return e.add(t), function() {
        e.remove();
      };
    }, [t && r]);
  };
}, Vt = function() {
  var e = Xn(), t = function(r) {
    var n = r.styles, o = r.dynamic;
    return e(n, o), null;
  };
  return t;
}, Qn = {
  left: 0,
  top: 0,
  right: 0,
  gap: 0
}, ze = function(e) {
  return parseInt(e || "", 10) || 0;
}, Jn = function(e) {
  var t = window.getComputedStyle(document.body), r = t[e === "padding" ? "paddingLeft" : "marginLeft"], n = t[e === "padding" ? "paddingTop" : "marginTop"], o = t[e === "padding" ? "paddingRight" : "marginRight"];
  return [ze(r), ze(n), ze(o)];
}, eo = function(e) {
  if (e === void 0 && (e = "margin"), typeof window > "u")
    return Qn;
  var t = Jn(e), r = document.documentElement.clientWidth, n = window.innerWidth;
  return {
    left: t[0],
    top: t[1],
    right: t[2],
    gap: Math.max(0, n - r + t[2] - t[0])
  };
}, to = Vt(), fe = "data-scroll-locked", ro = function(e, t, r, n) {
  var o = e.left, a = e.top, l = e.right, i = e.gap;
  return r === void 0 && (r = "margin"), `
  .`.concat(_n, ` {
   overflow: hidden `).concat(n, `;
   padding-right: `).concat(i, "px ").concat(n, `;
  }
  body[`).concat(fe, `] {
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
  
  .`).concat(Ae, ` {
    right: `).concat(i, "px ").concat(n, `;
  }
  
  .`).concat(De, ` {
    margin-right: `).concat(i, "px ").concat(n, `;
  }
  
  .`).concat(Ae, " .").concat(Ae, ` {
    right: 0 `).concat(n, `;
  }
  
  .`).concat(De, " .").concat(De, ` {
    margin-right: 0 `).concat(n, `;
  }
  
  body[`).concat(fe, `] {
    `).concat(Fn, ": ").concat(i, `px;
  }
`);
}, Nt = function() {
  var e = parseInt(document.body.getAttribute(fe) || "0", 10);
  return isFinite(e) ? e : 0;
}, no = function() {
  c.useEffect(function() {
    return document.body.setAttribute(fe, (Nt() + 1).toString()), function() {
      var e = Nt() - 1;
      e <= 0 ? document.body.removeAttribute(fe) : document.body.setAttribute(fe, e.toString());
    };
  }, []);
}, oo = function(e) {
  var t = e.noRelative, r = e.noImportant, n = e.gapMode, o = n === void 0 ? "margin" : n;
  no();
  var a = c.useMemo(function() {
    return eo(o);
  }, [o]);
  return c.createElement(to, { styles: ro(a, !t, o, r ? "" : "!important") });
}, Qe = !1;
if (typeof window < "u")
  try {
    var Se = Object.defineProperty({}, "passive", {
      get: function() {
        return Qe = !0, !0;
      }
    });
    window.addEventListener("test", Se, Se), window.removeEventListener("test", Se, Se);
  } catch {
    Qe = !1;
  }
var ie = Qe ? { passive: !1 } : !1, ao = function(e) {
  return e.tagName === "TEXTAREA";
}, zt = function(e, t) {
  if (!(e instanceof Element))
    return !1;
  var r = window.getComputedStyle(e);
  return (
    // not-not-scrollable
    r[t] !== "hidden" && // contains scroll inside self
    !(r.overflowY === r.overflowX && !ao(e) && r[t] === "visible")
  );
}, io = function(e) {
  return zt(e, "overflowY");
}, lo = function(e) {
  return zt(e, "overflowX");
}, Ct = function(e, t) {
  var r = t.ownerDocument, n = t;
  do {
    typeof ShadowRoot < "u" && n instanceof ShadowRoot && (n = n.host);
    var o = Gt(e, n);
    if (o) {
      var a = Yt(e, n), l = a[1], i = a[2];
      if (l > i)
        return !0;
    }
    n = n.parentNode;
  } while (n && n !== r.body);
  return !1;
}, so = function(e) {
  var t = e.scrollTop, r = e.scrollHeight, n = e.clientHeight;
  return [
    t,
    r,
    n
  ];
}, co = function(e) {
  var t = e.scrollLeft, r = e.scrollWidth, n = e.clientWidth;
  return [
    t,
    r,
    n
  ];
}, Gt = function(e, t) {
  return e === "v" ? io(t) : lo(t);
}, Yt = function(e, t) {
  return e === "v" ? so(t) : co(t);
}, uo = function(e, t) {
  return e === "h" && t === "rtl" ? -1 : 1;
}, fo = function(e, t, r, n, o) {
  var a = uo(e, window.getComputedStyle(t).direction), l = a * n, i = r.target, d = t.contains(i), u = !1, p = l > 0, m = 0, v = 0;
  do {
    if (!i)
      break;
    var h = Yt(e, i), w = h[0], f = h[1], x = h[2], E = f - x - a * w;
    (w || E) && Gt(e, i) && (m += E, v += w);
    var R = i.parentNode;
    i = R && R.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? R.host : R;
  } while (
    // portaled content
    !d && i !== document.body || // self content
    d && (t.contains(i) || t === i)
  );
  return (p && Math.abs(m) < 1 || !p && Math.abs(v) < 1) && (u = !0), u;
}, ke = function(e) {
  return "changedTouches" in e ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY] : [0, 0];
}, St = function(e) {
  return [e.deltaX, e.deltaY];
}, kt = function(e) {
  return e && "current" in e ? e.current : e;
}, po = function(e, t) {
  return e[0] === t[0] && e[1] === t[1];
}, mo = function(e) {
  return `
  .block-interactivity-`.concat(e, ` {pointer-events: none;}
  .allow-interactivity-`).concat(e, ` {pointer-events: all;}
`);
}, vo = 0, le = [];
function ho(e) {
  var t = c.useRef([]), r = c.useRef([0, 0]), n = c.useRef(), o = c.useState(vo++)[0], a = c.useState(Vt)[0], l = c.useRef(e);
  c.useEffect(function() {
    l.current = e;
  }, [e]), c.useEffect(function() {
    if (e.inert) {
      document.body.classList.add("block-interactivity-".concat(o));
      var f = Mn([e.lockRef.current], (e.shards || []).map(kt), !0).filter(Boolean);
      return f.forEach(function(x) {
        return x.classList.add("allow-interactivity-".concat(o));
      }), function() {
        document.body.classList.remove("block-interactivity-".concat(o)), f.forEach(function(x) {
          return x.classList.remove("allow-interactivity-".concat(o));
        });
      };
    }
  }, [e.inert, e.lockRef.current, e.shards]);
  var i = c.useCallback(function(f, x) {
    if ("touches" in f && f.touches.length === 2 || f.type === "wheel" && f.ctrlKey)
      return !l.current.allowPinchZoom;
    var E = ke(f), R = r.current, A = "deltaX" in f ? f.deltaX : R[0] - E[0], k = "deltaY" in f ? f.deltaY : R[1] - E[1], T, D = f.target, C = Math.abs(A) > Math.abs(k) ? "h" : "v";
    if ("touches" in f && C === "h" && D.type === "range")
      return !1;
    var _ = window.getSelection(), F = _ && _.anchorNode, U = F ? F === D || F.contains(D) : !1;
    if (U)
      return !1;
    var S = Ct(C, D);
    if (!S)
      return !0;
    if (S ? T = C : (T = C === "v" ? "h" : "v", S = Ct(C, D)), !S)
      return !1;
    if (!n.current && "changedTouches" in f && (A || k) && (n.current = T), !T)
      return !0;
    var M = n.current || T;
    return fo(M, x, f, M === "h" ? A : k);
  }, []), d = c.useCallback(function(f) {
    var x = f;
    if (!(!le.length || le[le.length - 1] !== a)) {
      var E = "deltaY" in x ? St(x) : ke(x), R = t.current.filter(function(T) {
        return T.name === x.type && (T.target === x.target || x.target === T.shadowParent) && po(T.delta, E);
      })[0];
      if (R && R.should) {
        x.cancelable && x.preventDefault();
        return;
      }
      if (!R) {
        var A = (l.current.shards || []).map(kt).filter(Boolean).filter(function(T) {
          return T.contains(x.target);
        }), k = A.length > 0 ? i(x, A[0]) : !l.current.noIsolation;
        k && x.cancelable && x.preventDefault();
      }
    }
  }, []), u = c.useCallback(function(f, x, E, R) {
    var A = { name: f, delta: x, target: E, should: R, shadowParent: bo(E) };
    t.current.push(A), setTimeout(function() {
      t.current = t.current.filter(function(k) {
        return k !== A;
      });
    }, 1);
  }, []), p = c.useCallback(function(f) {
    r.current = ke(f), n.current = void 0;
  }, []), m = c.useCallback(function(f) {
    u(f.type, St(f), f.target, i(f, e.lockRef.current));
  }, []), v = c.useCallback(function(f) {
    u(f.type, ke(f), f.target, i(f, e.lockRef.current));
  }, []);
  c.useEffect(function() {
    return le.push(a), e.setCallbacks({
      onScrollCapture: m,
      onWheelCapture: m,
      onTouchMoveCapture: v
    }), document.addEventListener("wheel", d, ie), document.addEventListener("touchmove", d, ie), document.addEventListener("touchstart", p, ie), function() {
      le = le.filter(function(f) {
        return f !== a;
      }), document.removeEventListener("wheel", d, ie), document.removeEventListener("touchmove", d, ie), document.removeEventListener("touchstart", p, ie);
    };
  }, []);
  var h = e.removeScrollBar, w = e.inert;
  return c.createElement(
    c.Fragment,
    null,
    w ? c.createElement(a, { styles: mo(o) }) : null,
    h ? c.createElement(oo, { noRelative: e.noRelative, gapMode: e.gapMode }) : null
  );
}
function bo(e) {
  for (var t = null; e !== null; )
    e instanceof ShadowRoot && (t = e.host, e = e.host), e = e.parentNode;
  return t;
}
const go = Vn(Ht, ho);
var qt = c.forwardRef(function(e, t) {
  return c.createElement($e, G({}, e, { ref: t, sideCar: go }));
});
qt.classNames = $e.classNames;
var xo = function(e) {
  if (typeof document > "u")
    return null;
  var t = Array.isArray(e) ? e[0] : e;
  return t.ownerDocument.body;
}, se = /* @__PURE__ */ new WeakMap(), Re = /* @__PURE__ */ new WeakMap(), Pe = {}, Ge = 0, Zt = function(e) {
  return e && (e.host || Zt(e.parentNode));
}, yo = function(e, t) {
  return t.map(function(r) {
    if (e.contains(r))
      return r;
    var n = Zt(r);
    return n && e.contains(n) ? n : (console.error("aria-hidden", r, "in not contained inside", e, ". Doing nothing"), null);
  }).filter(function(r) {
    return !!r;
  });
}, wo = function(e, t, r, n) {
  var o = yo(t, Array.isArray(e) ? e : [e]);
  Pe[r] || (Pe[r] = /* @__PURE__ */ new WeakMap());
  var a = Pe[r], l = [], i = /* @__PURE__ */ new Set(), d = new Set(o), u = function(m) {
    !m || i.has(m) || (i.add(m), u(m.parentNode));
  };
  o.forEach(u);
  var p = function(m) {
    !m || d.has(m) || Array.prototype.forEach.call(m.children, function(v) {
      if (i.has(v))
        p(v);
      else
        try {
          var h = v.getAttribute(n), w = h !== null && h !== "false", f = (se.get(v) || 0) + 1, x = (a.get(v) || 0) + 1;
          se.set(v, f), a.set(v, x), l.push(v), f === 1 && w && Re.set(v, !0), x === 1 && v.setAttribute(r, "true"), w || v.setAttribute(n, "true");
        } catch (E) {
          console.error("aria-hidden: cannot operate on ", v, E);
        }
    });
  };
  return p(t), i.clear(), Ge++, function() {
    l.forEach(function(m) {
      var v = se.get(m) - 1, h = a.get(m) - 1;
      se.set(m, v), a.set(m, h), v || (Re.has(m) || m.removeAttribute(n), Re.delete(m)), h || m.removeAttribute(r);
    }), Ge--, Ge || (se = /* @__PURE__ */ new WeakMap(), se = /* @__PURE__ */ new WeakMap(), Re = /* @__PURE__ */ new WeakMap(), Pe = {});
  };
}, Eo = function(e, t, r) {
  r === void 0 && (r = "data-aria-hidden");
  var n = Array.from(Array.isArray(e) ? e : [e]), o = xo(e);
  return o ? (n.push.apply(n, Array.from(o.querySelectorAll("[aria-live], script"))), wo(n, o, r, "aria-hidden")) : function() {
    return null;
  };
}, Me = "Dialog", [Xt] = qr(Me), [No, V] = Xt(Me), Qt = (e) => {
  const {
    __scopeDialog: t,
    children: r,
    open: n,
    defaultOpen: o,
    onOpenChange: a,
    modal: l = !0
  } = e, i = c.useRef(null), d = c.useRef(null), [u, p] = en({
    prop: n,
    defaultProp: o ?? !1,
    onChange: a,
    caller: Me
  });
  return /* @__PURE__ */ s(
    No,
    {
      scope: t,
      triggerRef: i,
      contentRef: d,
      contentId: q(),
      titleId: q(),
      descriptionId: q(),
      open: u,
      onOpenChange: p,
      onOpenToggle: c.useCallback(() => p((m) => !m), [p]),
      modal: l,
      children: r
    }
  );
};
Qt.displayName = Me;
var Jt = "DialogTrigger", Co = c.forwardRef(
  (e, t) => {
    const { __scopeDialog: r, ...n } = e, o = V(Jt, r), a = ae(t, o.triggerRef);
    return /* @__PURE__ */ s(
      we.button,
      {
        type: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": o.open,
        "aria-controls": o.contentId,
        "data-state": nt(o.open),
        ...n,
        ref: a,
        onClick: X(e.onClick, o.onOpenToggle)
      }
    );
  }
);
Co.displayName = Jt;
var tt = "DialogPortal", [So, er] = Xt(tt, {
  forceMount: void 0
}), tr = (e) => {
  const { __scopeDialog: t, forceMount: r, children: n, container: o } = e, a = V(tt, t);
  return /* @__PURE__ */ s(So, { scope: t, forceMount: r, children: c.Children.map(n, (l) => /* @__PURE__ */ s(Le, { present: r || a.open, children: /* @__PURE__ */ s(jt, { asChild: !0, container: o, children: l }) })) });
};
tr.displayName = tt;
var Oe = "DialogOverlay", rr = c.forwardRef(
  (e, t) => {
    const r = er(Oe, e.__scopeDialog), { forceMount: n = r.forceMount, ...o } = e, a = V(Oe, e.__scopeDialog);
    return a.modal ? /* @__PURE__ */ s(Le, { present: n || a.open, children: /* @__PURE__ */ s(Ro, { ...o, ref: t }) }) : null;
  }
);
rr.displayName = Oe;
var ko = /* @__PURE__ */ ye("DialogOverlay.RemoveScroll"), Ro = c.forwardRef(
  (e, t) => {
    const { __scopeDialog: r, ...n } = e, o = V(Oe, r);
    return (
      // Make sure `Content` is scrollable even when it doesn't live inside `RemoveScroll`
      // ie. when `Overlay` and `Content` are siblings
      /* @__PURE__ */ s(qt, { as: ko, allowPinchZoom: !0, shards: [o.contentRef], children: /* @__PURE__ */ s(
        we.div,
        {
          "data-state": nt(o.open),
          ...n,
          ref: t,
          style: { pointerEvents: "auto", ...n.style }
        }
      ) })
    );
  }
), ne = "DialogContent", nr = c.forwardRef(
  (e, t) => {
    const r = er(ne, e.__scopeDialog), { forceMount: n = r.forceMount, ...o } = e, a = V(ne, e.__scopeDialog);
    return /* @__PURE__ */ s(Le, { present: n || a.open, children: a.modal ? /* @__PURE__ */ s(Po, { ...o, ref: t }) : /* @__PURE__ */ s(Ao, { ...o, ref: t }) });
  }
);
nr.displayName = ne;
var Po = c.forwardRef(
  (e, t) => {
    const r = V(ne, e.__scopeDialog), n = c.useRef(null), o = ae(t, r.contentRef, n);
    return c.useEffect(() => {
      const a = n.current;
      if (a) return Eo(a);
    }, []), /* @__PURE__ */ s(
      or,
      {
        ...e,
        ref: o,
        trapFocus: r.open,
        disableOutsidePointerEvents: !0,
        onCloseAutoFocus: X(e.onCloseAutoFocus, (a) => {
          a.preventDefault(), r.triggerRef.current?.focus();
        }),
        onPointerDownOutside: X(e.onPointerDownOutside, (a) => {
          const l = a.detail.originalEvent, i = l.button === 0 && l.ctrlKey === !0;
          (l.button === 2 || i) && a.preventDefault();
        }),
        onFocusOutside: X(
          e.onFocusOutside,
          (a) => a.preventDefault()
        )
      }
    );
  }
), Ao = c.forwardRef(
  (e, t) => {
    const r = V(ne, e.__scopeDialog), n = c.useRef(!1), o = c.useRef(!1);
    return /* @__PURE__ */ s(
      or,
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
), or = c.forwardRef(
  (e, t) => {
    const { __scopeDialog: r, trapFocus: n, onOpenAutoFocus: o, onCloseAutoFocus: a, ...l } = e, i = V(ne, r), d = c.useRef(null), u = ae(t, d);
    return $n(), /* @__PURE__ */ g(re, { children: [
      /* @__PURE__ */ s(
        Wt,
        {
          asChild: !0,
          loop: !0,
          trapped: n,
          onMountAutoFocus: o,
          onUnmountAutoFocus: a,
          children: /* @__PURE__ */ s(
            _t,
            {
              role: "dialog",
              id: i.contentId,
              "aria-describedby": i.descriptionId,
              "aria-labelledby": i.titleId,
              "data-state": nt(i.open),
              ...l,
              ref: u,
              onDismiss: () => i.onOpenChange(!1)
            }
          )
        }
      ),
      /* @__PURE__ */ g(re, { children: [
        /* @__PURE__ */ s(Io, { titleId: i.titleId }),
        /* @__PURE__ */ s($o, { contentRef: d, descriptionId: i.descriptionId })
      ] })
    ] });
  }
), rt = "DialogTitle", Do = c.forwardRef(
  (e, t) => {
    const { __scopeDialog: r, ...n } = e, o = V(rt, r);
    return /* @__PURE__ */ s(we.h2, { id: o.titleId, ...n, ref: t });
  }
);
Do.displayName = rt;
var ar = "DialogDescription", Oo = c.forwardRef(
  (e, t) => {
    const { __scopeDialog: r, ...n } = e, o = V(ar, r);
    return /* @__PURE__ */ s(we.p, { id: o.descriptionId, ...n, ref: t });
  }
);
Oo.displayName = ar;
var ir = "DialogClose", To = c.forwardRef(
  (e, t) => {
    const { __scopeDialog: r, ...n } = e, o = V(ir, r);
    return /* @__PURE__ */ s(
      we.button,
      {
        type: "button",
        ...n,
        ref: t,
        onClick: X(e.onClick, () => o.onOpenChange(!1))
      }
    );
  }
);
To.displayName = ir;
function nt(e) {
  return e ? "open" : "closed";
}
var lr = "DialogTitleWarning", [Ja, sr] = Yr(lr, {
  contentName: ne,
  titleName: rt,
  docsSlug: "dialog"
}), Io = ({ titleId: e }) => {
  const t = sr(lr), r = `\`${t.contentName}\` requires a \`${t.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${t.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${t.docsSlug}`;
  return c.useEffect(() => {
    e && (document.getElementById(e) || console.error(r));
  }, [r, e]), null;
}, Lo = "DialogDescriptionWarning", $o = ({ contentRef: e, descriptionId: t }) => {
  const n = `Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${sr(Lo).contentName}}.`;
  return c.useEffect(() => {
    const o = e.current?.getAttribute("aria-describedby");
    t && o && (document.getElementById(t) || console.warn(n));
  }, [n, e, t]), null;
}, Mo = Qt, _o = tr, Fo = rr, Wo = nr, Bo = /* @__PURE__ */ Symbol.for("react.lazy"), Te = c[" use ".trim().toString()];
function jo(e) {
  return typeof e == "object" && e !== null && "then" in e;
}
function cr(e) {
  return e != null && typeof e == "object" && "$$typeof" in e && e.$$typeof === Bo && "_payload" in e && jo(e._payload);
}
// @__NO_SIDE_EFFECTS__
function Uo(e) {
  const t = /* @__PURE__ */ Ko(e), r = c.forwardRef((n, o) => {
    let { children: a, ...l } = n;
    cr(a) && typeof Te == "function" && (a = Te(a._payload));
    const i = c.Children.toArray(a), d = i.find(Vo);
    if (d) {
      const u = d.props.children, p = i.map((m) => m === d ? c.Children.count(u) > 1 ? c.Children.only(null) : c.isValidElement(u) ? u.props.children : null : m);
      return /* @__PURE__ */ s(t, { ...l, ref: o, children: c.isValidElement(u) ? c.cloneElement(u, void 0, p) : null });
    }
    return /* @__PURE__ */ s(t, { ...l, ref: o, children: a });
  });
  return r.displayName = `${e}.Slot`, r;
}
// @__NO_SIDE_EFFECTS__
function Ko(e) {
  const t = c.forwardRef((r, n) => {
    let { children: o, ...a } = r;
    if (cr(o) && typeof Te == "function" && (o = Te(o._payload)), c.isValidElement(o)) {
      const l = Go(o), i = zo(a, o.props);
      return o.type !== c.Fragment && (i.ref = n ? Q(n, l) : l), c.cloneElement(o, i);
    }
    return c.Children.count(o) > 1 ? c.Children.only(null) : null;
  });
  return t.displayName = `${e}.SlotClone`, t;
}
var Ho = /* @__PURE__ */ Symbol("radix.slottable");
function Vo(e) {
  return c.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === Ho;
}
function zo(e, t) {
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
function Go(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, r = t && "isReactWarning" in t && t.isReactWarning;
  return r ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, r = t && "isReactWarning" in t && t.isReactWarning, r ? e.props.ref : e.props.ref || e.ref);
}
var Yo = [
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
], ee = Yo.reduce((e, t) => {
  const r = /* @__PURE__ */ Uo(`Primitive.${t}`), n = c.forwardRef((o, a) => {
    const { asChild: l, ...i } = o, d = l ? r : t;
    return typeof window < "u" && (window[/* @__PURE__ */ Symbol.for("radix-ui")] = !0), /* @__PURE__ */ s(d, { ...i, ref: a });
  });
  return n.displayName = `Primitive.${t}`, { ...e, [t]: n };
}, {}), he = '[cmdk-group=""]', Ye = '[cmdk-group-items=""]', qo = '[cmdk-group-heading=""]', ur = '[cmdk-item=""]', Rt = `${ur}:not([aria-disabled="true"])`, Je = "cmdk-item-select", ue = "data-value", Zo = (e, t, r) => Gr(e, t, r), dr = c.createContext(void 0), Ee = () => c.useContext(dr), fr = c.createContext(void 0), ot = () => c.useContext(fr), pr = c.createContext(void 0), mr = c.forwardRef((e, t) => {
  let r = de(() => {
    var b, P;
    return { search: "", value: (P = (b = e.value) != null ? b : e.defaultValue) != null ? P : "", selectedItemId: void 0, filtered: { count: 0, items: /* @__PURE__ */ new Map(), groups: /* @__PURE__ */ new Set() } };
  }), n = de(() => /* @__PURE__ */ new Set()), o = de(() => /* @__PURE__ */ new Map()), a = de(() => /* @__PURE__ */ new Map()), l = de(() => /* @__PURE__ */ new Set()), i = vr(e), { label: d, children: u, value: p, onValueChange: m, filter: v, shouldFilter: h, loop: w, disablePointerSelection: f = !1, vimBindings: x = !0, ...E } = e, R = q(), A = q(), k = q(), T = c.useRef(null), D = la();
  oe(() => {
    if (p !== void 0) {
      let b = p.trim();
      r.current.value = b, C.emit();
    }
  }, [p]), oe(() => {
    D(6, $);
  }, []);
  let C = c.useMemo(() => ({ subscribe: (b) => (l.current.add(b), () => l.current.delete(b)), snapshot: () => r.current, setState: (b, P, O) => {
    var N, I, L, j;
    if (!Object.is(r.current[b], P)) {
      if (r.current[b] = P, b === "search") M(), U(), D(1, S);
      else if (b === "value") {
        if (document.activeElement.hasAttribute("cmdk-input") || document.activeElement.hasAttribute("cmdk-root")) {
          let W = document.getElementById(k);
          W ? W.focus() : (N = document.getElementById(R)) == null || N.focus();
        }
        if (D(7, () => {
          var W;
          r.current.selectedItemId = (W = B()) == null ? void 0 : W.id, C.emit();
        }), O || D(5, $), ((I = i.current) == null ? void 0 : I.value) !== void 0) {
          let W = P ?? "";
          (j = (L = i.current).onValueChange) == null || j.call(L, W);
          return;
        }
      }
      C.emit();
    }
  }, emit: () => {
    l.current.forEach((b) => b());
  } }), []), _ = c.useMemo(() => ({ value: (b, P, O) => {
    var N;
    P !== ((N = a.current.get(b)) == null ? void 0 : N.value) && (a.current.set(b, { value: P, keywords: O }), r.current.filtered.items.set(b, F(P, O)), D(2, () => {
      U(), C.emit();
    }));
  }, item: (b, P) => (n.current.add(b), P && (o.current.has(P) ? o.current.get(P).add(b) : o.current.set(P, /* @__PURE__ */ new Set([b]))), D(3, () => {
    M(), U(), r.current.value || S(), C.emit();
  }), () => {
    a.current.delete(b), n.current.delete(b), r.current.filtered.items.delete(b);
    let O = B();
    D(4, () => {
      M(), O?.getAttribute("id") === b && S(), C.emit();
    });
  }), group: (b) => (o.current.has(b) || o.current.set(b, /* @__PURE__ */ new Set()), () => {
    a.current.delete(b), o.current.delete(b);
  }), filter: () => i.current.shouldFilter, label: d || e["aria-label"], getDisablePointerSelection: () => i.current.disablePointerSelection, listId: R, inputId: k, labelId: A, listInnerRef: T }), []);
  function F(b, P) {
    var O, N;
    let I = (N = (O = i.current) == null ? void 0 : O.filter) != null ? N : Zo;
    return b ? I(b, r.current.search, P) : 0;
  }
  function U() {
    if (!r.current.search || i.current.shouldFilter === !1) return;
    let b = r.current.filtered.items, P = [];
    r.current.filtered.groups.forEach((N) => {
      let I = o.current.get(N), L = 0;
      I.forEach((j) => {
        let W = b.get(j);
        L = Math.max(W, L);
      }), P.push([N, L]);
    });
    let O = T.current;
    z().sort((N, I) => {
      var L, j;
      let W = N.getAttribute("id"), Ne = I.getAttribute("id");
      return ((L = b.get(Ne)) != null ? L : 0) - ((j = b.get(W)) != null ? j : 0);
    }).forEach((N) => {
      let I = N.closest(Ye);
      I ? I.appendChild(N.parentElement === I ? N : N.closest(`${Ye} > *`)) : O.appendChild(N.parentElement === O ? N : N.closest(`${Ye} > *`));
    }), P.sort((N, I) => I[1] - N[1]).forEach((N) => {
      var I;
      let L = (I = T.current) == null ? void 0 : I.querySelector(`${he}[${ue}="${encodeURIComponent(N[0])}"]`);
      L?.parentElement.appendChild(L);
    });
  }
  function S() {
    let b = z().find((O) => O.getAttribute("aria-disabled") !== "true"), P = b?.getAttribute(ue);
    C.setState("value", P || void 0);
  }
  function M() {
    var b, P, O, N;
    if (!r.current.search || i.current.shouldFilter === !1) {
      r.current.filtered.count = n.current.size;
      return;
    }
    r.current.filtered.groups = /* @__PURE__ */ new Set();
    let I = 0;
    for (let L of n.current) {
      let j = (P = (b = a.current.get(L)) == null ? void 0 : b.value) != null ? P : "", W = (N = (O = a.current.get(L)) == null ? void 0 : O.keywords) != null ? N : [], Ne = F(j, W);
      r.current.filtered.items.set(L, Ne), Ne > 0 && I++;
    }
    for (let [L, j] of o.current) for (let W of j) if (r.current.filtered.items.get(W) > 0) {
      r.current.filtered.groups.add(L);
      break;
    }
    r.current.filtered.count = I;
  }
  function $() {
    var b, P, O;
    let N = B();
    N && (((b = N.parentElement) == null ? void 0 : b.firstChild) === N && ((O = (P = N.closest(he)) == null ? void 0 : P.querySelector(qo)) == null || O.scrollIntoView({ block: "nearest" })), N.scrollIntoView({ block: "nearest" }));
  }
  function B() {
    var b;
    return (b = T.current) == null ? void 0 : b.querySelector(`${ur}[aria-selected="true"]`);
  }
  function z() {
    var b;
    return Array.from(((b = T.current) == null ? void 0 : b.querySelectorAll(Rt)) || []);
  }
  function pe(b) {
    let P = z()[b];
    P && C.setState("value", P.getAttribute(ue));
  }
  function me(b) {
    var P;
    let O = B(), N = z(), I = N.findIndex((j) => j === O), L = N[I + b];
    (P = i.current) != null && P.loop && (L = I + b < 0 ? N[N.length - 1] : I + b === N.length ? N[0] : N[I + b]), L && C.setState("value", L.getAttribute(ue));
  }
  function it(b) {
    let P = B(), O = P?.closest(he), N;
    for (; O && !N; ) O = b > 0 ? aa(O, he) : ia(O, he), N = O?.querySelector(Rt);
    N ? C.setState("value", N.getAttribute(ue)) : me(b);
  }
  let lt = () => pe(z().length - 1), st = (b) => {
    b.preventDefault(), b.metaKey ? lt() : b.altKey ? it(1) : me(1);
  }, ct = (b) => {
    b.preventDefault(), b.metaKey ? pe(0) : b.altKey ? it(-1) : me(-1);
  };
  return c.createElement(ee.div, { ref: t, tabIndex: -1, ...E, "cmdk-root": "", onKeyDown: (b) => {
    var P;
    (P = E.onKeyDown) == null || P.call(E, b);
    let O = b.nativeEvent.isComposing || b.keyCode === 229;
    if (!(b.defaultPrevented || O)) switch (b.key) {
      case "n":
      case "j": {
        x && b.ctrlKey && st(b);
        break;
      }
      case "ArrowDown": {
        st(b);
        break;
      }
      case "p":
      case "k": {
        x && b.ctrlKey && ct(b);
        break;
      }
      case "ArrowUp": {
        ct(b);
        break;
      }
      case "Home": {
        b.preventDefault(), pe(0);
        break;
      }
      case "End": {
        b.preventDefault(), lt();
        break;
      }
      case "Enter": {
        b.preventDefault();
        let N = B();
        if (N) {
          let I = new Event(Je);
          N.dispatchEvent(I);
        }
      }
    }
  } }, c.createElement("label", { "cmdk-label": "", htmlFor: _.inputId, id: _.labelId, style: ca }, d), _e(e, (b) => c.createElement(fr.Provider, { value: C }, c.createElement(dr.Provider, { value: _ }, b))));
}), Xo = c.forwardRef((e, t) => {
  var r, n;
  let o = q(), a = c.useRef(null), l = c.useContext(pr), i = Ee(), d = vr(e), u = (n = (r = d.current) == null ? void 0 : r.forceMount) != null ? n : l?.forceMount;
  oe(() => {
    if (!u) return i.item(o, l?.id);
  }, [u]);
  let p = hr(o, a, [e.value, e.children, a], e.keywords), m = ot(), v = J((D) => D.value && D.value === p.current), h = J((D) => u || i.filter() === !1 ? !0 : D.search ? D.filtered.items.get(o) > 0 : !0);
  c.useEffect(() => {
    let D = a.current;
    if (!(!D || e.disabled)) return D.addEventListener(Je, w), () => D.removeEventListener(Je, w);
  }, [h, e.onSelect, e.disabled]);
  function w() {
    var D, C;
    f(), (C = (D = d.current).onSelect) == null || C.call(D, p.current);
  }
  function f() {
    m.setState("value", p.current, !0);
  }
  if (!h) return null;
  let { disabled: x, value: E, onSelect: R, forceMount: A, keywords: k, ...T } = e;
  return c.createElement(ee.div, { ref: Q(a, t), ...T, id: o, "cmdk-item": "", role: "option", "aria-disabled": !!x, "aria-selected": !!v, "data-disabled": !!x, "data-selected": !!v, onPointerMove: x || i.getDisablePointerSelection() ? void 0 : f, onClick: x ? void 0 : w }, e.children);
}), Qo = c.forwardRef((e, t) => {
  let { heading: r, children: n, forceMount: o, ...a } = e, l = q(), i = c.useRef(null), d = c.useRef(null), u = q(), p = Ee(), m = J((h) => o || p.filter() === !1 ? !0 : h.search ? h.filtered.groups.has(l) : !0);
  oe(() => p.group(l), []), hr(l, i, [e.value, e.heading, d]);
  let v = c.useMemo(() => ({ id: l, forceMount: o }), [o]);
  return c.createElement(ee.div, { ref: Q(i, t), ...a, "cmdk-group": "", role: "presentation", hidden: m ? void 0 : !0 }, r && c.createElement("div", { ref: d, "cmdk-group-heading": "", "aria-hidden": !0, id: u }, r), _e(e, (h) => c.createElement("div", { "cmdk-group-items": "", role: "group", "aria-labelledby": r ? u : void 0 }, c.createElement(pr.Provider, { value: v }, h))));
}), Jo = c.forwardRef((e, t) => {
  let { alwaysRender: r, ...n } = e, o = c.useRef(null), a = J((l) => !l.search);
  return !r && !a ? null : c.createElement(ee.div, { ref: Q(o, t), ...n, "cmdk-separator": "", role: "separator" });
}), ea = c.forwardRef((e, t) => {
  let { onValueChange: r, ...n } = e, o = e.value != null, a = ot(), l = J((u) => u.search), i = J((u) => u.selectedItemId), d = Ee();
  return c.useEffect(() => {
    e.value != null && a.setState("search", e.value);
  }, [e.value]), c.createElement(ee.input, { ref: t, ...n, "cmdk-input": "", autoComplete: "off", autoCorrect: "off", spellCheck: !1, "aria-autocomplete": "list", role: "combobox", "aria-expanded": !0, "aria-controls": d.listId, "aria-labelledby": d.labelId, "aria-activedescendant": i, id: d.inputId, type: "text", value: o ? e.value : l, onChange: (u) => {
    o || a.setState("search", u.target.value), r?.(u.target.value);
  } });
}), ta = c.forwardRef((e, t) => {
  let { children: r, label: n = "Suggestions", ...o } = e, a = c.useRef(null), l = c.useRef(null), i = J((u) => u.selectedItemId), d = Ee();
  return c.useEffect(() => {
    if (l.current && a.current) {
      let u = l.current, p = a.current, m, v = new ResizeObserver(() => {
        m = requestAnimationFrame(() => {
          let h = u.offsetHeight;
          p.style.setProperty("--cmdk-list-height", h.toFixed(1) + "px");
        });
      });
      return v.observe(u), () => {
        cancelAnimationFrame(m), v.unobserve(u);
      };
    }
  }, []), c.createElement(ee.div, { ref: Q(a, t), ...o, "cmdk-list": "", role: "listbox", tabIndex: -1, "aria-activedescendant": i, "aria-label": n, id: d.listId }, _e(e, (u) => c.createElement("div", { ref: Q(l, d.listInnerRef), "cmdk-list-sizer": "" }, u)));
}), ra = c.forwardRef((e, t) => {
  let { open: r, onOpenChange: n, overlayClassName: o, contentClassName: a, container: l, ...i } = e;
  return c.createElement(Mo, { open: r, onOpenChange: n }, c.createElement(_o, { container: l }, c.createElement(Fo, { "cmdk-overlay": "", className: o }), c.createElement(Wo, { "aria-label": e.label, "cmdk-dialog": "", className: a }, c.createElement(mr, { ref: t, ...i }))));
}), na = c.forwardRef((e, t) => J((r) => r.filtered.count === 0) ? c.createElement(ee.div, { ref: t, ...e, "cmdk-empty": "", role: "presentation" }) : null), oa = c.forwardRef((e, t) => {
  let { progress: r, children: n, label: o = "Loading...", ...a } = e;
  return c.createElement(ee.div, { ref: t, ...a, "cmdk-loading": "", role: "progressbar", "aria-valuenow": r, "aria-valuemin": 0, "aria-valuemax": 100, "aria-label": o }, _e(e, (l) => c.createElement("div", { "aria-hidden": !0 }, l)));
}), ce = Object.assign(mr, { List: ta, Item: Xo, Input: ea, Group: Qo, Separator: Jo, Dialog: ra, Empty: na, Loading: oa });
function aa(e, t) {
  let r = e.nextElementSibling;
  for (; r; ) {
    if (r.matches(t)) return r;
    r = r.nextElementSibling;
  }
}
function ia(e, t) {
  let r = e.previousElementSibling;
  for (; r; ) {
    if (r.matches(t)) return r;
    r = r.previousElementSibling;
  }
}
function vr(e) {
  let t = c.useRef(e);
  return oe(() => {
    t.current = e;
  }), t;
}
var oe = typeof window > "u" ? c.useEffect : c.useLayoutEffect;
function de(e) {
  let t = c.useRef();
  return t.current === void 0 && (t.current = e()), t;
}
function J(e) {
  let t = ot(), r = () => e(t.snapshot());
  return c.useSyncExternalStore(t.subscribe, r, r);
}
function hr(e, t, r, n = []) {
  let o = c.useRef(), a = Ee();
  return oe(() => {
    var l;
    let i = (() => {
      var u;
      for (let p of r) {
        if (typeof p == "string") return p.trim();
        if (typeof p == "object" && "current" in p) return p.current ? (u = p.current.textContent) == null ? void 0 : u.trim() : o.current;
      }
    })(), d = n.map((u) => u.trim());
    a.value(e, i, d), (l = t.current) == null || l.setAttribute(ue, i), o.current = i;
  }), o;
}
var la = () => {
  let [e, t] = c.useState(), r = de(() => /* @__PURE__ */ new Map());
  return oe(() => {
    r.current.forEach((n) => n()), r.current = /* @__PURE__ */ new Map();
  }, [e]), (n, o) => {
    r.current.set(n, o), t({});
  };
};
function sa(e) {
  let t = e.type;
  return typeof t == "function" ? t(e.props) : "render" in t ? t.render(e.props) : e;
}
function _e({ asChild: e, children: t }, r) {
  return e && c.isValidElement(t) ? c.cloneElement(sa(t), { ref: t.ref }, r(t.props.children)) : r(t);
}
var ca = { position: "absolute", width: "1px", height: "1px", padding: "0", margin: "-1px", overflow: "hidden", clip: "rect(0, 0, 0, 0)", whiteSpace: "nowrap", borderWidth: "0" };
const br = xr(null);
function at() {
  const e = yr(br);
  if (!e)
    throw new Error(
      "useCommandPalette must be used inside a <CommandPaletteProvider>."
    );
  return e;
}
function ei() {
  const { open: e, close: t, toggle: r, isOpen: n, query: o } = at();
  return { open: e, close: t, toggle: r, isOpen: n, query: o };
}
function ti({
  commands: e,
  getDynamicCommands: t,
  children: r
}) {
  const [n, o] = K(!1), [a, l] = K(""), i = Y(() => o(!0), []), d = Y(() => {
    o(!1), l("");
  }, []), u = Y(() => o((v) => !v), []);
  H(() => {
    const v = (h) => {
      (h.metaKey || h.ctrlKey) && h.key.toLowerCase() === "k" && (h.preventDefault(), o((w) => !w));
    };
    return window.addEventListener("keydown", v, !0), () => window.removeEventListener("keydown", v, !0);
  }, []);
  const p = te(() => {
    const v = t ? t(a) : [];
    return [...e, ...v].filter((w) => w.when ? w.when() : !0);
  }, [e, t, a]), m = {
    open: i,
    close: d,
    toggle: u,
    isOpen: n,
    query: a,
    setQuery: l,
    mergedCommands: p
  };
  return /* @__PURE__ */ s(br.Provider, { value: m, children: r });
}
function ua(e) {
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
function ri({
  placeholder: e = "Type a command or search…",
  emptyState: t,
  className: r
} = {}) {
  const { isOpen: n, close: o, query: a, setQuery: l, mergedCommands: i } = at(), d = te(() => ua(i), [i]), u = Y(
    (p) => {
      o(), Promise.resolve().then(() => p.run());
    },
    [o]
  );
  return /* @__PURE__ */ s(
    Cr,
    {
      open: n,
      onClose: o,
      maxWidth: 640,
      rawChildren: !0,
      backdropTestId: "command-palette-backdrop",
      children: /* @__PURE__ */ g(
        ce,
        {
          label: "Command palette",
          value: void 0,
          className: y("flex flex-col gap-0 w-full", r),
          "data-testid": "command-palette",
          children: [
            /* @__PURE__ */ s(
              ce.Input,
              {
                value: a,
                onValueChange: l,
                placeholder: e,
                "data-autofocus": !0,
                className: y(
                  "w-full px-3 py-2.5 text-sm border-0 border-b border-border",
                  "outline-none bg-transparent text-text-primary placeholder:text-text-tertiary"
                ),
                "data-testid": "command-palette-input"
              }
            ),
            /* @__PURE__ */ g(ce.List, { className: "max-h-[360px] overflow-y-auto py-2", children: [
              /* @__PURE__ */ s(ce.Empty, { className: "px-3 py-6 text-center text-sm text-text-tertiary", children: t ?? "No results." }),
              d.map(({ groupName: p, items: m }) => /* @__PURE__ */ s(
                ce.Group,
                {
                  heading: p ?? void 0,
                  children: m.map((v) => /* @__PURE__ */ g(
                    ce.Item,
                    {
                      value: `${v.id} ${v.label} ${(v.keywords ?? []).join(" ")}`,
                      keywords: v.keywords,
                      onSelect: () => u(v),
                      "data-testid": `command-palette-item-${v.id}`,
                      className: y(
                        "flex items-center gap-2 px-3 py-2 mx-1 rounded-md cursor-pointer text-sm",
                        "text-text-primary aria-selected:bg-surface-hover"
                      ),
                      children: [
                        v.icon && /* @__PURE__ */ s("span", { className: "shrink-0 text-text-secondary", children: v.icon }),
                        /* @__PURE__ */ s("span", { className: "flex-1 truncate", children: v.label }),
                        v.hint && /* @__PURE__ */ s("span", { className: "text-xs text-text-tertiary truncate", children: v.hint }),
                        v.shortcut && v.shortcut.length > 0 && /* @__PURE__ */ s("span", { className: "flex items-center gap-1 shrink-0", children: v.shortcut.map((h, w) => /* @__PURE__ */ s(
                          "kbd",
                          {
                            className: y(
                              "inline-flex items-center justify-center min-w-[18px] h-[18px] px-1",
                              "text-[10px] font-mono font-medium",
                              "bg-surface-hover text-text-secondary",
                              "border border-border rounded"
                            ),
                            children: h
                          },
                          `${v.id}-kbd-${w}`
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
function ni({ className: e } = {}) {
  const { toggle: t } = at();
  return /* @__PURE__ */ g(
    "button",
    {
      type: "button",
      onClick: t,
      "data-testid": "command-palette-hint",
      className: y(
        "inline-flex items-center gap-1.5 px-2 py-1 rounded-md",
        "text-xs text-text-secondary bg-surface-hover",
        "border border-border hover:bg-surface-panel",
        "cursor-pointer transition-colors",
        e
      ),
      "aria-label": "Open command palette",
      children: [
        /* @__PURE__ */ s("kbd", { className: "font-mono text-[11px]", children: "⌘K" }),
        /* @__PURE__ */ s("span", { children: "Search" })
      ]
    }
  );
}
function qe(e) {
  if (e === "right") return "text-right";
  if (e === "center") return "text-center";
}
function oi({
  data: e,
  columns: t,
  keyField: r,
  onRowClick: n,
  rowActions: o,
  searchable: a = !1,
  searchPlaceholder: l = "Search…",
  pageSize: i,
  emptyMessage: d = "No records.",
  loading: u = !1,
  loadingRows: p = 5,
  className: m,
  "data-testid": v
}) {
  const [h, w] = K(null), [f, x] = K("asc"), [E, R] = K(""), [A, k] = K(0), T = (S) => {
    h === S ? x((M) => M === "asc" ? "desc" : "asc") : (w(S), x("asc"));
  }, D = te(() => {
    if (!a || E.trim() === "") return e;
    const S = E.trim().toLowerCase();
    return e.filter(
      (M) => t.some(($) => $.filterable === !1 ? !1 : ($.getFilterText ? $.getFilterText(M) : String(M[$.key] ?? "")).toLowerCase().includes(S))
    );
  }, [e, t, E, a]), C = te(() => {
    if (!h) return D;
    const S = t.find((B) => B.key === h);
    if (!S || !S.sortable) return D;
    const M = S.compare ?? ((B, z) => {
      const pe = String(B[S.key] ?? ""), me = String(z[S.key] ?? "");
      return pe.localeCompare(me);
    }), $ = [...D];
    return $.sort((B, z) => f === "asc" ? M(B, z) : -M(B, z)), $;
  }, [D, t, h, f]), _ = i && i > 0 ? Math.max(1, Math.ceil(C.length / i)) : 1, F = Math.min(A, _ - 1), U = te(() => {
    if (!i || i <= 0) return C;
    const S = F * i;
    return C.slice(S, S + i);
  }, [C, i, F]);
  return /* @__PURE__ */ g("div", { className: y("flex flex-col gap-3", m), "data-testid": v, children: [
    a && /* @__PURE__ */ s(
      "input",
      {
        type: "text",
        value: E,
        onChange: (S) => {
          R(S.target.value), k(0);
        },
        placeholder: l,
        "aria-label": "Search",
        "data-testid": "datatable-search",
        className: "w-full max-w-xs rounded-md border border-border-field bg-surface px-3 py-1.5 text-sm text-text-primary placeholder:text-text-tertiary focus:border-primary focus:outline-none"
      }
    ),
    /* @__PURE__ */ g(Sr, { className: "border border-border rounded-lg overflow-hidden", children: [
      /* @__PURE__ */ s(kr, { children: /* @__PURE__ */ g("tr", { children: [
        t.map((S) => {
          const M = S.sortable && h === S.key;
          return /* @__PURE__ */ s(
            ut,
            {
              sortable: S.sortable,
              sortDirection: M ? f : null,
              style: S.width ? { width: S.width } : void 0,
              className: y(qe(S.align), S.className),
              onClick: S.sortable ? () => T(S.key) : void 0,
              "data-testid": S.sortable ? `datatable-header-${S.key}` : void 0,
              children: S.header
            },
            S.key
          );
        }),
        o && /* @__PURE__ */ s(ut, { className: "text-right", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ s(Rr, { children: u ? Array.from({ length: p }).map((S, M) => /* @__PURE__ */ g(Fe, { "data-testid": "datatable-loading-row", children: [
        t.map(($) => /* @__PURE__ */ s(ve, { className: qe($.align), children: /* @__PURE__ */ s("div", { className: "h-4 w-3/4 animate-pulse rounded bg-slate-100" }) }, $.key)),
        o && /* @__PURE__ */ s(ve, { className: "text-right", children: /* @__PURE__ */ s("div", { className: "ml-auto h-4 w-16 animate-pulse rounded bg-slate-100" }) })
      ] }, `skeleton-${M}`)) : U.length === 0 ? /* @__PURE__ */ s(Fe, { children: /* @__PURE__ */ s(
        ve,
        {
          colSpan: t.length + (o ? 1 : 0),
          className: "text-center text-text-secondary py-8",
          children: d
        }
      ) }) : U.map((S, M) => /* @__PURE__ */ g(
        Fe,
        {
          clickable: !!n,
          onClick: n ? () => n(S) : void 0,
          children: [
            t.map(($) => /* @__PURE__ */ s(
              ve,
              {
                className: y(qe($.align), $.className),
                children: $.render ? $.render(S, M) : String(S[$.key] ?? "")
              },
              $.key
            )),
            o && /* @__PURE__ */ s(ve, { className: "text-right", onClick: ($) => $.stopPropagation(), children: /* @__PURE__ */ s("div", { className: "flex items-center justify-end gap-2", children: o(S) }) })
          ]
        },
        r(S)
      )) })
    ] }),
    i && i > 0 && C.length > i && /* @__PURE__ */ g("div", { className: "flex items-center justify-between text-xs text-text-secondary", children: [
      /* @__PURE__ */ g("span", { "data-testid": "datatable-page-summary", children: [
        "Page ",
        F + 1,
        " of ",
        _,
        " · ",
        C.length,
        " total"
      ] }),
      /* @__PURE__ */ g("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ s(
          "button",
          {
            type: "button",
            onClick: () => k((S) => Math.max(0, S - 1)),
            disabled: F === 0,
            "data-testid": "datatable-prev",
            className: "rounded border border-border bg-surface px-2 py-1 text-xs text-text-primary disabled:cursor-not-allowed disabled:opacity-50 hover:bg-slate-50",
            children: "Prev"
          }
        ),
        /* @__PURE__ */ s(
          "button",
          {
            type: "button",
            onClick: () => k((S) => Math.min(_ - 1, S + 1)),
            disabled: F >= _ - 1,
            "data-testid": "datatable-next",
            className: "rounded border border-border bg-surface px-2 py-1 text-xs text-text-primary disabled:cursor-not-allowed disabled:opacity-50 hover:bg-slate-50",
            children: "Next"
          }
        )
      ] })
    ] })
  ] });
}
function ai({
  icon: e = "⚠️",
  title: t,
  body: r,
  description: n,
  actionLabel: o,
  onAction: a,
  action: l,
  testId: i = "error-state",
  actionTestId: d = "error-state-action"
}) {
  const u = n ?? r;
  return /* @__PURE__ */ g(
    "div",
    {
      role: "alert",
      "data-testid": i,
      className: y(
        "flex flex-col items-center justify-center min-h-[220px]",
        "text-text-secondary gap-2 p-8 font-[inherit]"
      ),
      children: [
        e && (typeof e == "string" ? /* @__PURE__ */ s("div", { className: "text-[52px] mb-2", "aria-hidden": !0, children: e }) : /* @__PURE__ */ s("div", { className: "mb-2", children: e })),
        /* @__PURE__ */ s("div", { className: "text-[17px] font-semibold text-[var(--color-state-error,#dc2626)]", children: t }),
        u && /* @__PURE__ */ s("div", { className: "text-[13px] text-center max-w-[340px] text-text-secondary leading-normal", children: u }),
        l ? /* @__PURE__ */ s("div", { className: "mt-2.5", children: l }) : o && a && /* @__PURE__ */ s(
          "button",
          {
            "data-testid": d,
            onClick: a,
            type: "button",
            className: y(
              "mt-2.5 px-[22px] py-[9px] text-sm font-semibold",
              "bg-surface text-text-primary border border-border rounded-lg cursor-pointer font-[inherit]",
              "hover:bg-slate-50"
            ),
            children: o
          }
        )
      ]
    }
  );
}
const da = {
  sm: "w-[14px] h-[14px]",
  md: "w-[20px] h-[20px]",
  lg: "w-[28px] h-[28px]"
};
function fa({
  size: e = "md",
  color: t,
  className: r,
  style: n,
  "aria-label": o = "Loading",
  "data-testid": a
}) {
  const l = t ?? "var(--color-primary)";
  return /* @__PURE__ */ s(
    "div",
    {
      role: "status",
      "aria-label": o,
      "data-testid": a,
      className: y(
        "inline-block rounded-full border-2 border-transparent animate-spin",
        da[e],
        r
      ),
      style: { borderTopColor: l, ...n }
    }
  );
}
function ii({
  label: e = "Loading…",
  description: t,
  spinnerSize: r = "lg",
  spinnerColor: n,
  testId: o = "loading-state"
}) {
  return /* @__PURE__ */ g(
    "div",
    {
      role: "status",
      "aria-live": "polite",
      "data-testid": o,
      className: y(
        "flex flex-col items-center justify-center min-h-[220px]",
        "text-text-secondary gap-3 p-8 font-[inherit]"
      ),
      children: [
        /* @__PURE__ */ s(fa, { size: r, color: n, "aria-label": e }),
        /* @__PURE__ */ s("div", { className: "text-[15px] font-medium text-text-primary", children: e }),
        t && /* @__PURE__ */ s("div", { className: "text-[13px] text-center max-w-[340px] text-text-secondary leading-normal", children: t })
      ]
    }
  );
}
function li({
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
  const u = Ot(), p = `${u}-label`, m = t || r ? `${u}-desc` : void 0, v = {
    id: u,
    labelId: p,
    "aria-describedby": m,
    "aria-invalid": r ? !0 : void 0
  };
  return /* @__PURE__ */ g(
    "div",
    {
      "data-testid": d,
      className: y(
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
            className: y(
              "text-[12px] font-medium",
              o === "inline" ? "min-w-[140px]" : "",
              r ? "text-[#991b1b]" : "text-gray-700"
            ),
            children: [
              e,
              n && /* @__PURE__ */ s("span", { className: "ml-0.5 text-[#991b1b]", children: "*" })
            ]
          }
        ),
        /* @__PURE__ */ g("div", { className: y(o === "inline" ? "flex-1" : ""), children: [
          a(v),
          (t || r) && /* @__PURE__ */ s(
            "div",
            {
              id: m,
              className: y(
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
const pa = {
  sm: "px-2.5 py-1 text-xs",
  md: "px-3 py-1.5 text-sm"
};
function ma(e) {
  switch (e) {
    case "underline":
      return "inline-flex items-center gap-1 border-b border-[var(--color-border)]";
    case "pill":
      return "inline-flex items-center gap-1";
    case "segmented":
      return "inline-flex items-center rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-inset,#f8fafc)] p-0.5 gap-0.5";
  }
}
function va(e, t, r) {
  return e === "underline" ? y(
    "-mb-px border-b-2 rounded-none",
    t ? "border-[var(--color-primary)] text-[var(--color-text-primary)]" : "border-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]",
    r && "opacity-50 cursor-not-allowed hover:text-[var(--color-text-secondary)]"
  ) : e === "pill" ? y(
    "rounded-full",
    t ? "bg-[var(--color-primary)] text-white" : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text-primary)]",
    r && "opacity-50 cursor-not-allowed hover:bg-transparent"
  ) : y(
    "rounded-md",
    t ? "bg-white shadow-sm text-[var(--color-text-primary)] border border-[var(--color-border)]" : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]",
    r && "opacity-50 cursor-not-allowed hover:bg-transparent"
  );
}
function si({
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
  const u = Ot(), p = d ?? u, m = be(/* @__PURE__ */ new Map()), v = te(() => e.filter((f) => !f.disabled).map((f) => f.id), [e]), h = Y((f) => {
    m.current.get(f)?.focus();
  }, []), w = Y(
    (f, x) => {
      if (v.length === 0) return;
      const E = v.indexOf(x);
      let R = null;
      switch (f.key) {
        case "ArrowRight":
        case "ArrowDown":
          R = E === -1 ? 0 : (E + 1) % v.length;
          break;
        case "ArrowLeft":
        case "ArrowUp":
          R = E === -1 ? v.length - 1 : (E - 1 + v.length) % v.length;
          break;
        case "Home":
          R = 0;
          break;
        case "End":
          R = v.length - 1;
          break;
        case "Enter":
        case " ":
          f.preventDefault(), r(x);
          return;
        default:
          return;
      }
      if (R !== null) {
        f.preventDefault();
        const A = v[R];
        r(A), h(A);
      }
    },
    [v, r, h]
  );
  return /* @__PURE__ */ s(
    "div",
    {
      role: "tablist",
      "aria-label": i,
      className: y(ma(n), a),
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
            onKeyDown: (E) => w(E, f.id),
            className: y(
              "inline-flex items-center gap-1.5 font-medium transition-colors cursor-pointer",
              pa[o],
              va(n, x, !!f.disabled)
            ),
            children: [
              f.icon,
              /* @__PURE__ */ s("span", { children: f.label }),
              f.badge !== void 0 && f.badge !== null && /* @__PURE__ */ s(
                "span",
                {
                  className: y(
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
function ci({ id: e, when: t, idPrefix: r, className: n, style: o, children: a }) {
  return e !== t ? null : /* @__PURE__ */ s(
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
function ui({
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
  const v = y(
    "block rounded-lg border p-3 no-underline transition-colors",
    !r && !n && "bg-[var(--color-surface)] border-[var(--color-border)]",
    r && "bg-[var(--color-primary-soft)] border-l-[3px] border-l-[var(--color-primary)] border-[var(--color-border)]",
    n && "bg-[var(--color-danger-bg)] border-l-[3px] border-l-[var(--color-danger)] border-[var(--color-border)]",
    (a || i) && "hover:bg-[var(--color-surface-hover)] cursor-pointer",
    u
  ), h = /* @__PURE__ */ g(re, { children: [
    /* @__PURE__ */ s("div", { className: "text-[12px] uppercase tracking-wide text-[var(--color-text-tertiary)]", children: e }),
    /* @__PURE__ */ s(
      "div",
      {
        className: y(
          "mt-1 text-[24px] font-bold leading-tight text-[var(--color-text-primary)]",
          d && "font-mono"
        ),
        children: t
      }
    ),
    o != null && /* @__PURE__ */ s("div", { className: "mt-1 text-[11px] italic text-[var(--color-text-tertiary)]", children: o })
  ] });
  return a ? l ? /* @__PURE__ */ s(l, { to: a, "data-testid": m, className: v, style: p, children: h }) : /* @__PURE__ */ s("a", { href: a, "data-testid": m, className: v, style: p, children: h }) : i ? /* @__PURE__ */ s(
    "button",
    {
      type: "button",
      onClick: i,
      "data-testid": m,
      className: y(v, "w-full text-left"),
      style: p,
      children: h
    }
  ) : /* @__PURE__ */ s("div", { "data-testid": m, className: v, style: p, children: h });
}
const ha = {
  sm: "h-1.5",
  md: "h-2"
};
function di({
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
  const p = t > 0 ? t : 100, m = Math.max(0, Math.min(e, p)), v = Math.min(100, m / p * 100), h = r ?? "var(--color-primary)";
  return /* @__PURE__ */ g("div", { "data-testid": d, className: y("w-full", l), style: i, children: [
    o != null && /* @__PURE__ */ g("div", { className: "flex items-center justify-between mb-1 text-[12px] text-[var(--color-text-secondary)]", children: [
      /* @__PURE__ */ s("span", { children: o }),
      /* @__PURE__ */ s("span", { className: "text-[var(--color-text-tertiary)] tabular-nums", children: a ? `${m}/${p}` : `${Math.round(v)}%` })
    ] }),
    /* @__PURE__ */ s(
      "div",
      {
        role: "progressbar",
        "aria-valuenow": m,
        "aria-valuemin": 0,
        "aria-valuemax": p,
        "aria-label": u,
        className: y(
          "w-full rounded-full overflow-hidden bg-[var(--color-surface-hover)]",
          ha[n]
        ),
        children: /* @__PURE__ */ s(
          "div",
          {
            className: "h-full rounded-full transition-all duration-300",
            style: { width: `${v}%`, background: h }
          }
        )
      }
    )
  ] });
}
const ba = {
  online: "var(--color-success, #22c55e)",
  away: "var(--color-state-pending, #f59e0b)",
  busy: "var(--color-state-error, #ef4444)",
  offline: "var(--color-text-tertiary, #94a3b8)",
  unknown: "var(--color-text-tertiary, #94a3b8)"
}, ga = {
  online: "Online",
  away: "Away",
  busy: "Busy",
  offline: "Offline",
  unknown: "Unknown presence"
};
function xa({
  state: e,
  ariaLabel: t,
  label: r,
  pulse: n,
  size: o = "sm",
  className: a,
  style: l,
  title: i,
  "data-testid": d
}) {
  const u = n ?? e === "online", p = t ?? ga[e];
  return /* @__PURE__ */ s(
    It,
    {
      color: ba[e],
      pulse: u,
      size: o,
      label: r,
      className: a,
      style: l,
      title: i,
      "data-testid": d ?? `presence-${e}`,
      "aria-label": p
    }
  );
}
function fi({
  name: e,
  label: t,
  avatarSize: r = 20,
  avatarColor: n,
  presence: o,
  onClick: a,
  className: l,
  style: i,
  title: d,
  "data-testid": u = "user-chip"
}) {
  return /* @__PURE__ */ g(
    a ? "button" : "span",
    {
      type: a ? "button" : void 0,
      onClick: a,
      title: d ?? e,
      "data-testid": u,
      className: y(
        "inline-flex items-center gap-1.5 rounded-full px-1.5 py-0.5 text-[12px] text-text-primary",
        a && "hover:bg-slate-100 cursor-pointer transition-colors",
        !a && "cursor-default",
        l
      ),
      style: i,
      children: [
        /* @__PURE__ */ s(et, { name: e, size: r, color: n }),
        /* @__PURE__ */ s("span", { className: "font-medium leading-none", children: t ?? e }),
        o && /* @__PURE__ */ s(xa, { state: o, size: "xs" })
      ]
    }
  );
}
const ya = {
  sm: "px-2.5 py-0.5 text-[11px]",
  xs: "px-2 py-px text-[10px]"
}, wa = "bg-[var(--color-surface)] border-[var(--color-border)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] hover:border-[var(--color-border-emphasis)]", Ea = "bg-[var(--color-primary)] border-[var(--color-primary)] text-white hover:opacity-90", Na = "border-[var(--color-border-emphasis)] text-[var(--color-text-primary)]";
function pi({
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
      className: y(
        "inline-flex items-center gap-1.5 rounded-full font-semibold border transition-colors cursor-pointer select-none",
        ya[o],
        e ? d ? Na : Ea : wa,
        i && "opacity-50 cursor-not-allowed",
        l
      ),
      style: u,
      children: [
        n && /* @__PURE__ */ s(
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
const Ca = {
  sm: "px-2.5 py-1 text-xs",
  md: "px-3 py-1.5 text-sm"
}, Sa = "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]", ka = "bg-white shadow-sm text-[var(--color-text-primary)] border border-[var(--color-border)]";
function mi({
  options: e,
  value: t,
  onChange: r,
  size: n = "md",
  className: o
}) {
  return /* @__PURE__ */ s(
    "div",
    {
      role: "group",
      className: y(
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
            className: y(
              "inline-flex items-center gap-1.5 rounded-md font-medium transition-all cursor-pointer",
              Ca[n],
              l ? ka : Sa
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
function vi({
  label: e,
  id: t,
  href: r,
  mono: n = !1,
  className: o,
  labelClassName: a
}) {
  const l = /* @__PURE__ */ s("span", { className: "truncate", children: e });
  return /* @__PURE__ */ g("div", { className: y("flex flex-col min-w-0", o), children: [
    /* @__PURE__ */ s(
      "div",
      {
        className: y(
          "font-medium text-[var(--color-text-primary)] truncate text-sm",
          a
        ),
        children: r ? /* @__PURE__ */ s(
          "a",
          {
            href: r,
            className: "hover:text-[var(--color-primary)] hover:underline",
            children: l
          }
        ) : l
      }
    ),
    t && /* @__PURE__ */ s(
      "div",
      {
        className: y(
          "text-[10px] font-mono text-[var(--color-text-tertiary)] truncate mt-0.5",
          n && "tracking-tight"
        ),
        children: t
      }
    )
  ] });
}
const Ra = [
  "a[href]",
  "button:not([disabled])",
  'input:not([disabled]):not([type="hidden"])',
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
  '[contenteditable="true"]'
].join(",");
function hi({
  open: e,
  onClose: t,
  title: r,
  subtitle: n,
  width: o = 460,
  children: a,
  footer: l,
  "data-testid": i
}) {
  const d = be(null);
  return H(() => {
    if (!e) return;
    const u = (p) => {
      p.key === "Escape" && t();
    };
    return window.addEventListener("keydown", u), () => window.removeEventListener("keydown", u);
  }, [e, t]), H(() => {
    if (!e) return;
    const u = d.current;
    if (!u) return;
    const p = u.querySelector(Ra);
    p ? p.focus() : (u.setAttribute("tabindex", "-1"), u.focus());
  }, [e]), e ? Tt(
    /* @__PURE__ */ g("div", { className: "fixed inset-0 z-[9000]", "data-testid": i, children: [
      /* @__PURE__ */ s(
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
          className: y(
            "absolute right-0 top-0 h-full bg-white shadow-xl flex flex-col",
            "transition-transform duration-200",
            e ? "translate-x-0" : "translate-x-full"
          ),
          style: { width: o },
          children: [
            /* @__PURE__ */ g("div", { className: "flex items-start justify-between p-5 border-b border-[var(--color-border)] flex-shrink-0", children: [
              /* @__PURE__ */ g("div", { className: "min-w-0", children: [
                r && /* @__PURE__ */ s("h2", { className: "text-base font-semibold text-[var(--color-text-primary)]", children: r }),
                n && /* @__PURE__ */ s("p", { className: "text-sm text-[var(--color-text-secondary)] mt-0.5", children: n })
              ] }),
              /* @__PURE__ */ s(
                "button",
                {
                  type: "button",
                  onClick: t,
                  className: "ml-4 flex-shrink-0 p-1 rounded hover:bg-[var(--color-surface-hover)] text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition-colors",
                  "aria-label": "Close",
                  children: /* @__PURE__ */ s("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", children: /* @__PURE__ */ s(
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
            /* @__PURE__ */ s("div", { className: "flex-1 overflow-y-auto p-5", children: a }),
            l && /* @__PURE__ */ s("div", { className: "flex-shrink-0 border-t border-[var(--color-border)] p-4 bg-[var(--color-surface-inset,#f8fafc)]", children: l })
          ]
        }
      )
    ] }),
    document.body
  ) : null;
}
function Pa(e, t) {
  if (!e || typeof window > "u") return t;
  try {
    const r = window.localStorage.getItem(e);
    return r === null ? t : r === "true";
  } catch {
    return t;
  }
}
function bi({
  title: e,
  defaultOpen: t = !1,
  badge: r,
  children: n,
  className: o,
  storageKey: a
}) {
  const [l, i] = K(
    () => Pa(a, t)
  );
  return H(() => {
    if (a && !(typeof window > "u"))
      try {
        window.localStorage.setItem(a, String(l));
      } catch {
      }
  }, [l, a]), /* @__PURE__ */ g(
    "div",
    {
      className: y(
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
              /* @__PURE__ */ s("span", { className: "text-sm font-semibold text-[var(--color-text-primary)]", children: e }),
              /* @__PURE__ */ g("div", { className: "flex items-center gap-2", children: [
                r,
                /* @__PURE__ */ s(
                  "svg",
                  {
                    className: y(
                      "w-4 h-4 text-[var(--color-text-tertiary)] transition-transform",
                      l && "rotate-180"
                    ),
                    viewBox: "0 0 16 16",
                    fill: "none",
                    "aria-hidden": "true",
                    children: /* @__PURE__ */ s(
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
        l && /* @__PURE__ */ s("div", { className: "border-t border-[var(--color-border)] bg-white", children: n })
      ]
    }
  );
}
function gi({
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
      className: y("relative inline-flex items-center", o),
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
              /* @__PURE__ */ s(
                "circle",
                {
                  cx: "7",
                  cy: "7",
                  r: "4.5",
                  stroke: "currentColor",
                  strokeWidth: "1.5"
                }
              ),
              /* @__PURE__ */ s(
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
        /* @__PURE__ */ s(
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
        e && /* @__PURE__ */ s(
          "button",
          {
            type: "button",
            onClick: () => {
              t(""), n?.();
            },
            className: "absolute right-2 p-0.5 rounded text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]",
            "aria-label": "Clear search",
            children: /* @__PURE__ */ s("svg", { width: "12", height: "12", viewBox: "0 0 12 12", fill: "none", children: /* @__PURE__ */ s(
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
const Aa = {
  error: "bg-[var(--color-danger-bg,#fef2f2)] border-[var(--color-danger,#dc2626)] text-[var(--color-danger,#dc2626)]",
  success: "bg-[var(--color-success-bg,#f0fdf4)] border-[var(--color-success,#16a34a)] text-[var(--color-success,#16a34a)]",
  info: "bg-[var(--color-info-bg,#eff6ff)] border-[var(--color-info,#2563eb)] text-[var(--color-info,#2563eb)]",
  warning: "bg-[var(--color-warning-bg,#fffbeb)] border-[var(--color-warning,#f59e0b)] text-[var(--color-warning,#f59e0b)]"
};
function xi({ tone: e, children: t, onDismiss: r, className: n }) {
  return /* @__PURE__ */ g(
    "div",
    {
      role: e === "error" || e === "warning" ? "alert" : "status",
      "aria-live": e === "error" || e === "warning" ? "assertive" : "polite",
      className: y(
        "flex items-start gap-2 px-3 py-2 rounded-md border-l-[3px] text-sm",
        Aa[e],
        n
      ),
      children: [
        /* @__PURE__ */ s("span", { className: "flex-1", children: t }),
        r && /* @__PURE__ */ s(
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
function yi({ title: e, subtitle: t, meta: r, action: n, className: o }) {
  return /* @__PURE__ */ g("div", { className: y("flex items-center justify-between gap-4", o), children: [
    /* @__PURE__ */ g("div", { className: "min-w-0", children: [
      /* @__PURE__ */ g("div", { className: "flex items-center gap-2 min-w-0", children: [
        /* @__PURE__ */ s("h3", { className: "text-sm font-semibold text-[var(--color-text-primary)] truncate", children: e }),
        r
      ] }),
      t && /* @__PURE__ */ s("p", { className: "text-xs text-[var(--color-text-tertiary)] mt-0.5", children: t })
    ] }),
    n && /* @__PURE__ */ s("div", { className: "flex-shrink-0", children: n })
  ] });
}
function wi({
  title: e,
  description: t,
  actions: r,
  back: n,
  badge: o,
  className: a
}) {
  return /* @__PURE__ */ g("div", { className: y("flex flex-col gap-1.5", a), children: [
    n && /* @__PURE__ */ g(
      "a",
      {
        href: n.to,
        onClick: n.onClick,
        className: "inline-flex items-center gap-1 text-xs text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] mb-1 w-fit",
        children: [
          /* @__PURE__ */ s(
            "svg",
            {
              width: "12",
              height: "12",
              viewBox: "0 0 12 12",
              fill: "none",
              "aria-hidden": "true",
              children: /* @__PURE__ */ s(
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
        /* @__PURE__ */ s("h1", { className: "text-xl font-semibold text-[var(--color-text-primary)] leading-tight", children: e }),
        o
      ] }),
      r && /* @__PURE__ */ s("div", { className: "flex-shrink-0 flex items-center gap-2", children: r })
    ] }),
    t && /* @__PURE__ */ s("p", { className: "text-sm text-[var(--color-text-secondary)]", children: t })
  ] });
}
function Ie({ size: e = "md", color: t, className: r }) {
  const n = e === "sm" ? 4 : 6, o = t || "var(--color-text-tertiary, #94a3b8)";
  return /* @__PURE__ */ g(re, { children: [
    /* @__PURE__ */ s("style", { children: `
        @keyframes thinkDot {
          0%, 80%, 100% { transform: scale(1); opacity: 0.4; }
          40% { transform: scale(1.3); opacity: 1; }
        }
      ` }),
    /* @__PURE__ */ s("span", { className: y("inline-flex items-center gap-1", r), children: [0, 1, 2].map((a) => /* @__PURE__ */ s(
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
function Da(e) {
  if (e.length === 0) return "";
  if (e.length === 1) return `${e[0]} is typing…`;
  if (e.length === 2) return `${e[0]} and ${e[1]} are typing…`;
  const t = e.length - 2;
  return `${e[0]}, ${e[1]} and ${t} other${t > 1 ? "s" : ""} are typing…`;
}
function Ei({
  names: e,
  compact: t = !1,
  color: r,
  size: n = "sm",
  className: o,
  "data-testid": a = "typing-indicator"
}) {
  return e.length === 0 ? null : /* @__PURE__ */ g(
    "span",
    {
      role: "status",
      "aria-live": "polite",
      "data-testid": a,
      className: y(
        "inline-flex items-center gap-1.5 text-[12px] text-text-tertiary",
        o
      ),
      children: [
        /* @__PURE__ */ s(Ie, { size: n, color: r }),
        !t && /* @__PURE__ */ s("span", { children: Da(e) })
      ]
    }
  );
}
function Ni({
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
  }, h = (f) => {
    if (f.key === "Enter") {
      if (o && f.shiftKey) return;
      f.preventDefault(), v();
    }
  }, w = y(
    "flex-1 px-3 py-2 text-sm rounded-lg border border-[var(--color-border-field,#d1d5db)] bg-white text-[var(--color-text-primary)]",
    "placeholder:text-[var(--color-text-tertiary)]",
    "focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent",
    "resize-none",
    n && "opacity-50 cursor-not-allowed bg-[var(--color-surface-hover)]"
  );
  return /* @__PURE__ */ g(
    "div",
    {
      className: y(
        "flex items-end gap-2 p-3 border-t border-[var(--color-border)] bg-[var(--color-surface)]",
        i
      ),
      style: d,
      children: [
        o ? /* @__PURE__ */ s(
          "textarea",
          {
            className: w,
            value: e,
            onChange: (f) => t(f.target.value),
            onKeyDown: h,
            disabled: n,
            placeholder: a,
            autoFocus: u,
            rows: 2,
            style: { maxHeight: `${p * 1.5 + 1}rem`, overflowY: "auto" }
          }
        ) : /* @__PURE__ */ s(
          "input",
          {
            type: "text",
            className: w,
            value: e,
            onChange: (f) => t(f.target.value),
            onKeyDown: h,
            disabled: n,
            placeholder: a,
            autoFocus: u
          }
        ),
        /* @__PURE__ */ s(
          "button",
          {
            type: "button",
            onClick: v,
            disabled: !m,
            className: y(
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
function Oa({ name: e, done: t, className: r }) {
  return /* @__PURE__ */ g(
    "span",
    {
      className: y(
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
function Ta({ toolCalls: e, className: t }) {
  return /* @__PURE__ */ s("div", { className: y("flex flex-wrap gap-1.5 py-1", t), children: e.map((r) => /* @__PURE__ */ s(Oa, { name: r.name, done: r.done }, r.id)) });
}
function Ci({
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
  return /* @__PURE__ */ g("div", { className: y("flex flex-col gap-1.5 py-3", i), children: [
    /* @__PURE__ */ s("div", { className: "text-[11px] font-semibold uppercase tracking-wide text-[var(--color-text-tertiary)]", children: d }),
    r && r.length > 0 && /* @__PURE__ */ s(Ta, { toolCalls: r }),
    e === "user" ? /* @__PURE__ */ s("div", { className: "text-sm text-[var(--color-text-primary)] whitespace-pre-wrap", children: t }) : /* @__PURE__ */ s("div", { className: "text-sm text-[var(--color-text-primary)] prose-sm max-w-none", children: t ? l ? l(t) : /* @__PURE__ */ s("span", { className: "whitespace-pre-wrap", children: t }) : n ? /* @__PURE__ */ s(Ie, {}) : null })
  ] });
}
function Si({
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
      className: y(
        "rounded-md border border-[var(--color-border)] overflow-hidden text-sm group",
        n
      ),
      children: [
        /* @__PURE__ */ g("summary", { className: "flex items-center gap-2 px-3 py-2 cursor-pointer select-none bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] text-[var(--color-text-tertiary)] list-none", children: [
          /* @__PURE__ */ s(
            "svg",
            {
              className: "w-3.5 h-3.5 transition-transform group-open:rotate-90",
              xmlns: "http://www.w3.org/2000/svg",
              viewBox: "0 0 20 20",
              fill: "currentColor",
              "aria-hidden": "true",
              children: /* @__PURE__ */ s(
                "path",
                {
                  fillRule: "evenodd",
                  d: "M7.21 14.77a.75.75 0 010-1.06L10.94 10 7.21 6.29a.75.75 0 011.08-1.04l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.08-.04z",
                  clipRule: "evenodd"
                }
              )
            }
          ),
          /* @__PURE__ */ s("span", { className: "text-[11px] font-semibold uppercase tracking-wide", children: a }),
          t && !e && /* @__PURE__ */ s(Ie, { size: "sm" })
        ] }),
        /* @__PURE__ */ s("div", { className: "px-3 py-2 text-xs text-[var(--color-text-secondary)] italic border-t border-[var(--color-border)] bg-white whitespace-pre-wrap leading-relaxed", children: e || /* @__PURE__ */ s(Ie, {}) })
      ]
    }
  );
}
function ki({
  prompts: e,
  onSelect: t,
  columns: r,
  title: n,
  className: o
}) {
  const a = r ? `repeat(${r}, minmax(0, 1fr))` : "repeat(auto-fit, minmax(220px, 1fr))";
  return /* @__PURE__ */ g("div", { className: y("flex flex-col gap-3", o), children: [
    n && /* @__PURE__ */ s("p", { className: "text-xs font-semibold uppercase tracking-wide text-[var(--color-text-tertiary)] text-center", children: n }),
    /* @__PURE__ */ s("div", { style: { display: "grid", gridTemplateColumns: a, gap: 10 }, children: e.map((l, i) => /* @__PURE__ */ g(
      "button",
      {
        type: "button",
        onClick: () => t(l.label),
        className: "flex flex-col gap-1 px-4 py-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] hover:border-[var(--color-border-emphasis,#cbd5e1)] text-left transition-colors",
        children: [
          /* @__PURE__ */ s("span", { className: "text-sm font-medium text-[var(--color-text-primary)]", children: l.label }),
          l.hint && /* @__PURE__ */ s("span", { className: "text-xs text-[var(--color-text-tertiary)]", children: l.hint })
        ]
      },
      i
    )) })
  ] });
}
function Ri({
  suggestions: e,
  onSelect: t,
  onRefresh: r,
  label: n,
  className: o
}) {
  return /* @__PURE__ */ g("div", { className: y("flex items-center flex-wrap gap-1.5 py-2", o), children: [
    n && /* @__PURE__ */ s("span", { className: "text-xs text-[var(--color-text-tertiary)] mr-1", children: n }),
    e.map((a, l) => /* @__PURE__ */ s(
      "button",
      {
        type: "button",
        onClick: () => t(a),
        className: "inline-flex items-center px-3 py-1 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-xs text-[var(--color-text-secondary)] hover:bg-[var(--color-primary)] hover:text-white hover:border-[var(--color-primary)] transition-colors",
        children: a
      },
      l
    )),
    r && /* @__PURE__ */ s(
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
function Pi({
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
      className: y(
        "flex items-center justify-between gap-4 px-6 py-3",
        "border-b border-[var(--color-border)] bg-[var(--color-surface)]",
        i
      ),
      children: [
        /* @__PURE__ */ g("div", { className: "flex items-center gap-3 min-w-0", children: [
          /* @__PURE__ */ g("div", { className: "relative shrink-0", children: [
            o ? /* @__PURE__ */ s(
              "img",
              {
                src: o,
                alt: e,
                className: "w-9 h-9 rounded-full object-cover"
              }
            ) : /* @__PURE__ */ s(et, { name: e, size: 36 }),
            a !== void 0 && /* @__PURE__ */ s("span", { className: "absolute -bottom-0.5 -right-0.5", children: /* @__PURE__ */ s(
              It,
              {
                color: a ? "#22c55e" : "#94a3b8",
                size: "sm",
                "aria-label": a ? "Online" : "Offline"
              }
            ) })
          ] }),
          /* @__PURE__ */ g("div", { className: "min-w-0 flex flex-col gap-0.5", children: [
            /* @__PURE__ */ g("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ s("h2", { className: "text-[15px] font-semibold text-[var(--color-text-primary)] leading-tight truncate", children: e }),
              t !== void 0 && /* @__PURE__ */ g(
                "button",
                {
                  type: "button",
                  onClick: l,
                  disabled: !l,
                  className: y(
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
            r && /* @__PURE__ */ s("p", { className: "text-[12px] text-[var(--color-text-tertiary)] truncate leading-tight", children: r })
          ] })
        ] }),
        n && /* @__PURE__ */ s("div", { className: "flex items-center gap-2 shrink-0", children: n })
      ]
    }
  );
}
function Ai({ user: e, items: t, className: r, "data-testid": n }) {
  const [o, a] = K(!1), l = be(null), i = Y(() => a(!1), []);
  return H(() => {
    if (!o) return;
    const d = (u) => {
      l.current && !l.current.contains(u.target) && i();
    };
    return document.addEventListener("mousedown", d), () => document.removeEventListener("mousedown", d);
  }, [o, i]), H(() => {
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
      className: y("relative inline-block", r),
      children: [
        /* @__PURE__ */ g(
          "button",
          {
            type: "button",
            "aria-label": `User menu for ${e.name}`,
            "aria-expanded": o,
            "aria-haspopup": "menu",
            onClick: () => a((d) => !d),
            className: y(
              "flex items-center gap-2 bg-transparent border-none cursor-pointer p-1 rounded-lg",
              "hover:bg-[var(--color-surface-hover)] transition-colors duration-100",
              o && "bg-[var(--color-surface-hover)]"
            ),
            children: [
              e.avatarUrl ? /* @__PURE__ */ s(
                "img",
                {
                  src: e.avatarUrl,
                  alt: e.name,
                  className: "w-8 h-8 rounded-full object-cover"
                }
              ) : /* @__PURE__ */ s(et, { name: e.name, size: 32 }),
              /* @__PURE__ */ g("div", { className: "flex flex-col items-start text-left min-w-0 hidden sm:flex", children: [
                /* @__PURE__ */ s("span", { className: "text-sm font-medium text-[var(--color-text-primary)] leading-tight truncate max-w-[120px]", children: e.name }),
                /* @__PURE__ */ s("span", { className: "text-xs text-[var(--color-text-tertiary)] leading-tight truncate max-w-[120px]", children: e.email })
              ] }),
              /* @__PURE__ */ s(
                "svg",
                {
                  width: "12",
                  height: "12",
                  viewBox: "0 0 12 12",
                  fill: "none",
                  "aria-hidden": "true",
                  className: y(
                    "text-[var(--color-text-tertiary)] transition-transform duration-150",
                    o ? "rotate-180" : "rotate-0"
                  ),
                  children: /* @__PURE__ */ s("path", { d: "M2 4l4 4 4-4", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" })
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
            className: y(
              "absolute right-0 top-[calc(100%+6px)] min-w-[200px] z-[200]",
              "bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl shadow-md overflow-hidden"
            ),
            children: [
              /* @__PURE__ */ g("div", { className: "px-3 py-2.5 border-b border-[var(--color-border)]", children: [
                /* @__PURE__ */ s("p", { className: "text-sm font-semibold text-[var(--color-text-primary)] truncate", children: e.name }),
                /* @__PURE__ */ s("p", { className: "text-xs text-[var(--color-text-tertiary)] truncate", children: e.email })
              ] }),
              /* @__PURE__ */ s("div", { className: "py-1", children: t.map((d, u) => /* @__PURE__ */ g("div", { children: [
                d.separator && u > 0 && /* @__PURE__ */ s("div", { className: "my-1 border-t border-[var(--color-border)]" }),
                /* @__PURE__ */ g(
                  "button",
                  {
                    type: "button",
                    role: "menuitem",
                    onClick: () => {
                      d.onClick(), i();
                    },
                    className: y(
                      "flex items-center gap-2.5 w-full text-left px-3 py-2",
                      "text-sm border-none cursor-pointer font-[inherit] transition-colors duration-100",
                      d.danger ? "text-[#dc2626] bg-transparent hover:bg-[#fef2f2]" : "text-[var(--color-text-primary)] bg-transparent hover:bg-[var(--color-surface-hover)]"
                    ),
                    children: [
                      d.icon && /* @__PURE__ */ s("span", { className: "shrink-0 text-base leading-none", "aria-hidden": "true", children: d.icon }),
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
function Ia({ item: e, isLast: t }) {
  const r = y(
    "text-sm leading-snug transition-colors duration-100",
    t ? "text-[var(--color-text-primary)] font-medium cursor-default" : "text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] font-normal"
  );
  return t || !e.href && !e.onClick ? /* @__PURE__ */ s("span", { className: r, "aria-current": t ? "page" : void 0, children: e.label }) : e.href ? /* @__PURE__ */ s("a", { href: e.href, onClick: e.onClick, className: y(r, "no-underline"), children: e.label }) : /* @__PURE__ */ s(
    "button",
    {
      type: "button",
      onClick: e.onClick,
      className: y(r, "border-none bg-transparent cursor-pointer font-[inherit] p-0"),
      children: e.label
    }
  );
}
function La(e, t) {
  if (e.length <= t) return e;
  const r = e.slice(0, 1), n = e.slice(-(t - 2 > 0 ? t - 2 : 1));
  return [...r, null, ...n];
}
function Di({
  items: e,
  separator: t = "/",
  maxItems: r,
  className: n,
  "data-testid": o
}) {
  if (e.length === 0) return null;
  const a = r != null ? La(e, r) : e;
  return /* @__PURE__ */ s("nav", { "aria-label": "Breadcrumb", "data-testid": o, className: y("flex items-center", n), children: /* @__PURE__ */ s("ol", { className: "flex items-center gap-1 flex-wrap list-none m-0 p-0", children: a.map((l, i) => {
    const d = i === a.length - 1;
    return /* @__PURE__ */ g("li", { className: "flex items-center gap-1", children: [
      l === null ? /* @__PURE__ */ s(
        "span",
        {
          className: "text-sm text-[var(--color-text-tertiary)] select-none",
          "aria-label": "More items",
          title: "Some items are hidden",
          children: "…"
        }
      ) : /* @__PURE__ */ s(Ia, { item: l, isLast: d }),
      !d && /* @__PURE__ */ s(
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
const $a = {
  active: { bg: "#f0fdf4", border: "#86efac", text: "#166534", accent: "#16a34a" },
  in_progress: { bg: "#eff6ff", border: "#93c5fd", text: "#1e40af", accent: "#3b82f6" },
  completed: { bg: "#f0fdf4", border: "#86efac", text: "#166534", accent: "#16a34a" },
  archived: { bg: "#f9fafb", border: "#d1d5db", text: "#6b7280", accent: "#9ca3af" },
  planning: { bg: "#fefce8", border: "#fde047", text: "#713f12", accent: "#eab308" },
  paused: { bg: "#fff7ed", border: "#fdba74", text: "#9a3412", accent: "#f97316" }
}, Ma = {
  bg: "#f3f4f6",
  border: "#d1d5db",
  text: "#374151",
  accent: "#6b7280"
};
function _a({ status: e, colors: t }) {
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
        /* @__PURE__ */ s("span", { style: { width: 5, height: 5, borderRadius: "50%", background: t.accent } }),
        e.replace(/_/g, " ")
      ]
    }
  );
}
function Oi({
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
  minHeight: h = 190
}) {
  const w = { ...$a, ...n }, f = (r ?? "unknown").toLowerCase().replace(/ /g, "_"), x = w[f] ?? Ma, E = a !== void 0 ? Math.max(0, a - o.length) : 0, R = u % 8 * 525;
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
        minHeight: h,
        width: "100%",
        textAlign: "left",
        font: "inherit",
        color: "inherit",
        ...v
      },
      onMouseEnter: (A) => {
        const k = A.currentTarget;
        k.style.boxShadow = "0 4px 16px rgba(0,0,0,0.08)", k.style.transform = "translateY(-1px)", k.style.borderColor = x.border;
      },
      onMouseLeave: (A) => {
        const k = A.currentTarget;
        k.style.boxShadow = "none", k.style.transform = "none", k.style.borderColor = "#e5e7eb";
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
                /* @__PURE__ */ s(
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
                t && /* @__PURE__ */ s(
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
              r && /* @__PURE__ */ s(_a, { status: r, colors: x })
            ]
          }
        ),
        /* @__PURE__ */ s(Ar, { items: l, staggerMs: R }),
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
                o.length > 0 ? /* @__PURE__ */ s(Pr, { names: o, maxVisible: 5, size: 24 }) : /* @__PURE__ */ g("span", { style: { fontSize: 12, color: "#9ca3af" }, children: [
                  /* @__PURE__ */ s("strong", { style: { color: "#374151" }, children: a ?? 0 }),
                  " contributors"
                ] }),
                o.length > 0 && E > 0 && /* @__PURE__ */ g("span", { style: { fontSize: 11, color: "#9ca3af" }, children: [
                  "+",
                  E,
                  " more"
                ] })
              ] }),
              d && /* @__PURE__ */ g("div", { style: { display: "flex", alignItems: "center", gap: 5, flexShrink: 0 }, children: [
                /* @__PURE__ */ s(
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
                /* @__PURE__ */ s("span", { style: { fontSize: 11, color: "#9ca3af", whiteSpace: "nowrap" }, children: d })
              ] })
            ]
          }
        )
      ]
    }
  );
}
function Fa(e) {
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
function Pt({
  items: e,
  storageKey: t,
  title: r,
  renderNavItem: n
}) {
  const o = te(() => Fa(e), [e]), a = o.some((l) => l.name !== null);
  return /* @__PURE__ */ s("nav", { className: "flex-1 overflow-y-auto py-1", children: a ? o.map(
    (l) => l.name === null ? /* @__PURE__ */ s(At, { items: l.items, renderNavItem: n }, "__ungrouped") : /* @__PURE__ */ s(
      Wa,
      {
        name: l.name,
        items: l.items,
        storageKey: `${t}.${r}.${l.name}`,
        renderNavItem: n
      },
      l.name
    )
  ) : /* @__PURE__ */ s(At, { items: e, renderNavItem: n }) });
}
function Ti({
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
            /* @__PURE__ */ s("span", { className: "text-[11px] font-semibold text-[var(--color-text-tertiary)] uppercase tracking-[0.05em]", children: e }),
            r
          ] }),
          n && /* @__PURE__ */ s("div", { className: "px-3 py-2 border-b border-[var(--color-border)]", children: n }),
          /* @__PURE__ */ s(Pt, { items: t, storageKey: a, title: e, renderNavItem: p })
        ]
      }
    ),
    v && /* @__PURE__ */ g(
      "aside",
      {
        className: "flex-none border-r border-[var(--color-border)] bg-[var(--color-surface)] flex flex-col overflow-hidden",
        style: { width: u },
        children: [
          /* @__PURE__ */ s("div", { className: "flex items-center justify-between px-4 py-[14px] border-b border-[var(--color-border)]", children: /* @__PURE__ */ s("span", { className: "text-[11px] font-semibold text-[var(--color-text-tertiary)] uppercase tracking-[0.05em]", children: l ?? "" }) }),
          /* @__PURE__ */ s(
            Pt,
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
    /* @__PURE__ */ s("main", { className: "flex-1 min-w-0 overflow-auto p-6", children: m })
  ] });
}
function At({
  items: e,
  renderNavItem: t
}) {
  return /* @__PURE__ */ s(re, { children: e.map((r) => /* @__PURE__ */ s(gr, { item: r, renderNavItem: t }, r.path)) });
}
function Wa({
  name: e,
  items: t,
  storageKey: r,
  renderNavItem: n
}) {
  const [o, a] = K(() => typeof window > "u" ? !1 : window.localStorage?.getItem(r) === "1");
  H(() => {
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
          /* @__PURE__ */ s("span", { className: "text-[10px] w-[10px] inline-block", "aria-hidden": "true", children: o ? "▸" : "▾" }),
          /* @__PURE__ */ s("span", { className: "flex-1", children: e }),
          /* @__PURE__ */ s("span", { className: "text-[9px] font-medium text-[var(--color-text-tertiary)] bg-[var(--color-bg)] px-[5px] py-px rounded-[6px] border border-[var(--color-border)]", children: t.length })
        ]
      }
    ),
    !o && /* @__PURE__ */ s("div", { style: i, children: t.map((d) => /* @__PURE__ */ s(gr, { item: d, renderNavItem: n }, d.path)) })
  ] });
}
function gr({
  item: e,
  renderNavItem: t
}) {
  const r = e.accent === "danger" ? "#dc2626" : e.accent === "warning" ? "#d97706" : e.accent === "success" ? "#16a34a" : void 0, n = /* @__PURE__ */ g(re, { children: [
    /* @__PURE__ */ g("div", { className: "flex items-center justify-between gap-2", children: [
      /* @__PURE__ */ s(
        "span",
        {
          className: "text-[13px] font-medium text-[var(--color-text-secondary)]",
          style: r ? { color: r } : void 0,
          children: e.label
        }
      ),
      e.count !== void 0 && /* @__PURE__ */ s("span", { className: "text-[10px] font-medium text-[var(--color-text-tertiary)] bg-[var(--color-surface)] px-[6px] py-px rounded-[8px] border border-[var(--color-border)]", children: e.count })
    ] }),
    e.hint && /* @__PURE__ */ s("div", { className: "text-[10px] text-[var(--color-text-tertiary)] mt-0.5", children: e.hint })
  ] }), o = {
    display: "block",
    padding: "8px 14px",
    borderLeft: "3px solid transparent",
    color: "var(--color-text-secondary)",
    textDecoration: "none",
    cursor: "pointer"
  };
  return e.onClick ? /* @__PURE__ */ s(
    "button",
    {
      type: "button",
      onClick: e.onClick,
      className: "block w-full px-[14px] py-2 border-l-[3px] border-transparent border-t-0 border-r-0 border-b-0 bg-transparent text-[var(--color-text-secondary)] text-left cursor-pointer font-[inherit]",
      children: n
    }
  ) : t ? /* @__PURE__ */ s(re, { children: t(e, n, o) }) : /* @__PURE__ */ s(
    "a",
    {
      href: e.path,
      className: "block px-[14px] py-2 border-l-[3px] border-transparent text-[var(--color-text-secondary)] no-underline cursor-pointer",
      children: n
    }
  );
}
const Ba = [
  "a[href]",
  "button:not([disabled])",
  'input:not([disabled]):not([type="hidden"])',
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
  '[contenteditable="true"]'
].join(",");
function Dt(e) {
  return Array.from(e.querySelectorAll(Ba)).filter(
    (t) => t.getAttribute("aria-hidden") !== "true"
  );
}
function ja(e, t, r) {
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
function Ii({
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
  const u = be(null), [p, m] = K(null), v = be(null), h = Y(() => {
    const w = e.current;
    if (!w) return;
    const f = w.getBoundingClientRect();
    m(ja(f, n, o));
  }, [e, n, o]);
  return wr(() => {
    if (!t) {
      m(null);
      return;
    }
    h();
  }, [t, h]), H(() => {
    if (!t) return;
    const w = () => h();
    return window.addEventListener("scroll", w, !0), window.addEventListener("resize", w), () => {
      window.removeEventListener("scroll", w, !0), window.removeEventListener("resize", w);
    };
  }, [t, h]), H(() => {
    if (!t) return;
    const w = typeof document < "u" ? document.activeElement : null;
    return v.current = w, queueMicrotask(() => {
      const f = u.current;
      if (!f) return;
      const x = Dt(f);
      x.length > 0 ? x[0].focus() : (f.setAttribute("tabindex", "-1"), f.focus());
    }), () => {
      const f = v.current;
      f && typeof f.focus == "function" && document.contains(f) && f.focus(), v.current = null;
    };
  }, [t]), H(() => {
    if (!t) return;
    const w = (f) => {
      if (f.key === "Escape") {
        f.stopPropagation(), r();
        return;
      }
      if (f.key !== "Tab") return;
      const x = u.current;
      if (!x) return;
      const E = Dt(x);
      if (E.length === 0) {
        f.preventDefault();
        return;
      }
      const R = E[0], A = E[E.length - 1], k = document.activeElement;
      if (!k || !x.contains(k)) {
        f.preventDefault(), R.focus();
        return;
      }
      f.shiftKey && k === R ? (f.preventDefault(), A.focus()) : !f.shiftKey && k === A && (f.preventDefault(), R.focus());
    };
    return window.addEventListener("keydown", w), () => window.removeEventListener("keydown", w);
  }, [t, r]), H(() => {
    if (!t) return;
    const w = (f) => {
      const x = f.target;
      x && (u.current?.contains(x) || e.current?.contains(x) || r());
    };
    return document.addEventListener("mousedown", w), () => document.removeEventListener("mousedown", w);
  }, [t, r, e]), !t || !p || typeof document > "u" ? null : Tt(
    /* @__PURE__ */ s(
      "div",
      {
        ref: u,
        role: "dialog",
        "data-testid": i,
        "data-placement": n,
        className: y(
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
  Da as A,
  Di as B,
  yi as C,
  oi as D,
  vi as E,
  pi as F,
  ei as G,
  xi as I,
  ii as L,
  Ci as M,
  wi as P,
  ki as Q,
  gi as S,
  ci as T,
  fi as U,
  Pi as a,
  Ni as b,
  Qa as c,
  bi as d,
  ri as e,
  ni as f,
  ti as g,
  hi as h,
  ai as i,
  Ri as j,
  li as k,
  Ii as l,
  xa as m,
  di as n,
  Oi as o,
  mi as p,
  fa as q,
  ui as r,
  Ti as s,
  si as t,
  Si as u,
  Ie as v,
  Oa as w,
  Ta as x,
  Ei as y,
  Ai as z
};
