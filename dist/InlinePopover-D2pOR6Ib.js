import { jsxs as h, jsx as l, Fragment as Q } from "react/jsx-runtime";
import * as c from "react";
import { useState as U, useCallback as Y, createContext as yr, useMemo as re, useEffect as K, useContext as wr, useId as Ot, useRef as pe, useLayoutEffect as Nr } from "react";
import { c as x } from "./cn-B6yFEsav.js";
import * as Er from "react-dom";
import Cr, { createPortal as Lt } from "react-dom";
import { M as Sr } from "./Modal-2jg4229_.js";
import { T as kr, b as Rr, e as dt, a as Pr, c as Fe, d as he } from "./PageSection-Dj8r4YIt.js";
import { S as Ar, C as Dr } from "./CardHeader-DuyI9Sk3.js";
import { A as et, a as Tr } from "./Avatar-BvKIaNVE.js";
import { S as $t } from "./StatusDot-BC7B1tTr.js";
import { C as Or } from "./Card-B2uO9v1w.js";
import { C as Lr } from "./Chip-BXdhqVFm.js";
import { A as $r } from "./Badge-tH4NRy5U.js";
import "clsx";
import "tailwind-merge";
const Ir = [
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
], Mr = [
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
], _r = [
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
function Fr(e) {
  return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function Br(e, t) {
  let r = e.replace(/(\/\/.*?)(\n|$)/g, `<span style="color:${t.comment}">$1</span>$2`);
  r = r.replace(/(\/\*[\s\S]*?\*\/)/g, `<span style="color:${t.comment}">$1</span>`), r = r.replace(
    /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/g,
    `<span style="color:${t.string}">$1</span>`
  );
  const n = new RegExp(`\\b(${Ir.join("|")})\\b`, "g");
  return r = r.replace(n, `<span style="color:${t.keyword}">$1</span>`), r = r.replace(/\b(\d+(?:\.\d+)?)\b/g, `<span style="color:${t.number}">$1</span>`), r;
}
function Wr(e, t) {
  let r = e.replace(
    /("(?:[^"\\]|\\.)*")(\s*:)/g,
    `<span style="color:${t.property}">$1</span>$2`
  );
  return r = r.replace(/("(?:[^"\\]|\\.)*")/g, `<span style="color:${t.string}">$1</span>`), r = r.replace(/\b(true|false|null)\b/g, `<span style="color:${t.keyword}">$1</span>`), r = r.replace(/\b(-?\d+(?:\.\d+)?)\b/g, `<span style="color:${t.number}">$1</span>`), r;
}
function jr(e, t) {
  let r = e.replace(/(#.*?)(\n|$)/g, `<span style="color:${t.comment}">$1</span>$2`);
  r = r.replace(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g, `<span style="color:${t.string}">$1</span>`);
  const n = new RegExp(`\\b(${Mr.join("|")})\\b`, "g");
  r = r.replace(n, `<span style="color:${t.keyword}">$1</span>`);
  const o = new RegExp(`\\b(${_r.join("|")})\\b`, "g");
  return r = r.replace(o, `<span style="color:${t.builtin}">$1</span>`), r = r.replace(/(\$\w+|\$\{[^}]+\})/g, `<span style="color:${t.variable}">$1</span>`), r;
}
const Ur = {
  comment: "#6b7280",
  string: "#4ade80",
  keyword: "#93c5fd",
  number: "#fbbf24",
  property: "#7dd3fc",
  builtin: "#c4b5fd",
  variable: "#fbbf24"
}, Hr = {
  comment: "#64748b",
  string: "#15803d",
  keyword: "#1d4ed8",
  number: "#a16207",
  property: "#0369a1",
  builtin: "#7c3aed",
  variable: "#a16207"
};
function ut(e, t, r) {
  const n = r === "dark" ? Ur : Hr, o = Fr(e);
  switch (t) {
    case "json":
      return Wr(o, n);
    case "bash":
    case "sh":
      return jr(o, n);
    case "text":
      return o;
    default:
      return Br(o, n);
  }
}
function xi({
  code: e,
  language: t = "tsx",
  theme: r = "dark",
  copyButton: n = !0,
  showLineNumbers: o = !1,
  className: a,
  style: s,
  "data-testid": i,
  ariaLabel: u
}) {
  const [d, p] = U(!1), v = Y(() => {
    typeof navigator > "u" || !navigator.clipboard || navigator.clipboard.writeText(e).then(() => {
      p(!0), setTimeout(() => p(!1), 1500);
    }).catch(() => {
    });
  }, [e]), m = r === "dark", b = e.split(`
`);
  return /* @__PURE__ */ h(
    "div",
    {
      "data-testid": i,
      "data-language": t,
      "data-theme": r,
      className: x(
        "relative rounded-lg border font-mono text-[13px] leading-relaxed overflow-hidden",
        m ? "bg-slate-800 text-slate-100 border-slate-700" : "bg-slate-50 text-slate-900 border-slate-200",
        a
      ),
      style: s,
      "aria-label": u ?? `Code (${t})`,
      children: [
        n && /* @__PURE__ */ l(
          "button",
          {
            type: "button",
            onClick: v,
            "aria-label": d ? "Copied" : "Copy code",
            className: x(
              "absolute top-2 right-2 text-[11px] px-2 py-1 rounded border transition-opacity",
              m ? "bg-slate-700 text-slate-100 border-slate-600 hover:bg-slate-600" : "bg-white text-slate-700 border-slate-300 hover:bg-slate-100"
            ),
            "data-copied": d ? "true" : "false",
            children: d ? "Copied" : "Copy"
          }
        ),
        /* @__PURE__ */ l("pre", { className: "m-0 px-4 py-3 overflow-x-auto", children: o ? /* @__PURE__ */ h("div", { className: "flex", children: [
          /* @__PURE__ */ l(
            "div",
            {
              className: x(
                "select-none pr-3 text-right",
                m ? "text-slate-500" : "text-slate-400"
              ),
              "aria-hidden": "true",
              children: b.map((w, f) => /* @__PURE__ */ l("div", { children: f + 1 }, f))
            }
          ),
          /* @__PURE__ */ l(
            "code",
            {
              className: "flex-1 block",
              dangerouslySetInnerHTML: { __html: ut(e, t, r) }
            }
          )
        ] }) : /* @__PURE__ */ l(
          "code",
          {
            className: "block",
            dangerouslySetInnerHTML: { __html: ut(e, t, r) }
          }
        ) })
      ]
    }
  );
}
var ft = 1, Kr = 0.9, Vr = 0.8, Gr = 0.17, Be = 0.1, We = 0.999, zr = 0.9999, Yr = 0.99, qr = /[\\\/_+.#"@\[\(\{&]/, Zr = /[\\\/_+.#"@\[\(\{&]/g, Xr = /[\s-]/, It = /[\s-]/g;
function Ze(e, t, r, n, o, a, s) {
  if (a === t.length) return o === e.length ? ft : Yr;
  var i = `${o},${a}`;
  if (s[i] !== void 0) return s[i];
  for (var u = n.charAt(a), d = r.indexOf(u, o), p = 0, v, m, b, w; d >= 0; ) v = Ze(e, t, r, n, d + 1, a + 1, s), v > p && (d === o ? v *= ft : qr.test(e.charAt(d - 1)) ? (v *= Vr, b = e.slice(o, d - 1).match(Zr), b && o > 0 && (v *= Math.pow(We, b.length))) : Xr.test(e.charAt(d - 1)) ? (v *= Kr, w = e.slice(o, d - 1).match(It), w && o > 0 && (v *= Math.pow(We, w.length))) : (v *= Gr, o > 0 && (v *= Math.pow(We, d - o))), e.charAt(d) !== t.charAt(a) && (v *= zr)), (v < Be && r.charAt(d - 1) === n.charAt(a + 1) || n.charAt(a + 1) === n.charAt(a) && r.charAt(d - 1) !== n.charAt(a)) && (m = Ze(e, t, r, n, d + 1, a + 2, s), m * Be > v && (v = m * Be)), v > p && (p = v), d = r.indexOf(u, d + 1);
  return s[i] = p, p;
}
function pt(e) {
  return e.toLowerCase().replace(It, " ");
}
function Qr(e, t, r) {
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
function J(...e) {
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
  return c.useCallback(J(...e), e);
}
function Jr(e, t) {
  const r = c.createContext(t), n = (a) => {
    const { children: s, ...i } = a, u = c.useMemo(() => i, Object.values(i));
    return /* @__PURE__ */ l(r.Provider, { value: u, children: s });
  };
  n.displayName = e + "Provider";
  function o(a) {
    const s = c.useContext(r);
    if (s) return s;
    if (t !== void 0) return t;
    throw new Error(`\`${a}\` must be used within \`${e}\``);
  }
  return [n, o];
}
function en(e, t = []) {
  let r = [];
  function n(a, s) {
    const i = c.createContext(s), u = r.length;
    r = [...r, s];
    const d = (v) => {
      const { scope: m, children: b, ...w } = v, f = m?.[e]?.[u] || i, y = c.useMemo(() => w, Object.values(w));
      return /* @__PURE__ */ l(f.Provider, { value: y, children: b });
    };
    d.displayName = a + "Provider";
    function p(v, m) {
      const b = m?.[e]?.[u] || i, w = c.useContext(b);
      if (w) return w;
      if (s !== void 0) return s;
      throw new Error(`\`${v}\` must be used within \`${a}\``);
    }
    return [d, p];
  }
  const o = () => {
    const a = r.map((s) => c.createContext(s));
    return function(i) {
      const u = i?.[e] || a;
      return c.useMemo(
        () => ({ [`__scope${e}`]: { ...i, [e]: u } }),
        [i, u]
      );
    };
  };
  return o.scopeName = e, [n, tn(o, ...t)];
}
function tn(...e) {
  const t = e[0];
  if (e.length === 1) return t;
  const r = () => {
    const n = e.map((o) => ({
      useScope: o(),
      scopeName: o.scopeName
    }));
    return function(a) {
      const s = n.reduce((i, { useScope: u, scopeName: d }) => {
        const v = u(a)[`__scope${d}`];
        return { ...i, ...v };
      }, {});
      return c.useMemo(() => ({ [`__scope${t.scopeName}`]: s }), [s]);
    };
  };
  return r.scopeName = t.scopeName, r;
}
var ge = globalThis?.document ? c.useLayoutEffect : () => {
}, rn = c[" useId ".trim().toString()] || (() => {
}), nn = 0;
function q(e) {
  const [t, r] = c.useState(rn());
  return ge(() => {
    r((n) => n ?? String(nn++));
  }, [e]), t ? `radix-${t}` : "";
}
var on = c[" useInsertionEffect ".trim().toString()] || ge;
function an({
  prop: e,
  defaultProp: t,
  onChange: r = () => {
  },
  caller: n
}) {
  const [o, a, s] = ln({
    defaultProp: t,
    onChange: r
  }), i = e !== void 0, u = i ? e : o;
  {
    const p = c.useRef(e !== void 0);
    c.useEffect(() => {
      const v = p.current;
      v !== i && console.warn(
        `${n} is changing from ${v ? "controlled" : "uncontrolled"} to ${i ? "controlled" : "uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`
      ), p.current = i;
    }, [i, n]);
  }
  const d = c.useCallback(
    (p) => {
      if (i) {
        const v = sn(p) ? p(e) : p;
        v !== e && s.current?.(v);
      } else
        a(p);
    },
    [i, e, a, s]
  );
  return [u, d];
}
function ln({
  defaultProp: e,
  onChange: t
}) {
  const [r, n] = c.useState(e), o = c.useRef(r), a = c.useRef(t);
  return on(() => {
    a.current = t;
  }, [t]), c.useEffect(() => {
    o.current !== r && (a.current?.(r), o.current = r);
  }, [r, o]), [r, n, a];
}
function sn(e) {
  return typeof e == "function";
}
// @__NO_SIDE_EFFECTS__
function ye(e) {
  const t = /* @__PURE__ */ cn(e), r = c.forwardRef((n, o) => {
    const { children: a, ...s } = n, i = c.Children.toArray(a), u = i.find(un);
    if (u) {
      const d = u.props.children, p = i.map((v) => v === u ? c.Children.count(d) > 1 ? c.Children.only(null) : c.isValidElement(d) ? d.props.children : null : v);
      return /* @__PURE__ */ l(t, { ...s, ref: o, children: c.isValidElement(d) ? c.cloneElement(d, void 0, p) : null });
    }
    return /* @__PURE__ */ l(t, { ...s, ref: o, children: a });
  });
  return r.displayName = `${e}.Slot`, r;
}
// @__NO_SIDE_EFFECTS__
function cn(e) {
  const t = c.forwardRef((r, n) => {
    const { children: o, ...a } = r;
    if (c.isValidElement(o)) {
      const s = pn(o), i = fn(a, o.props);
      return o.type !== c.Fragment && (i.ref = n ? J(n, s) : s), c.cloneElement(o, i);
    }
    return c.Children.count(o) > 1 ? c.Children.only(null) : null;
  });
  return t.displayName = `${e}.SlotClone`, t;
}
var dn = /* @__PURE__ */ Symbol("radix.slottable");
function un(e) {
  return c.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === dn;
}
function fn(e, t) {
  const r = { ...t };
  for (const n in t) {
    const o = e[n], a = t[n];
    /^on[A-Z]/.test(n) ? o && a ? r[n] = (...i) => {
      const u = a(...i);
      return o(...i), u;
    } : o && (r[n] = o) : n === "style" ? r[n] = { ...o, ...a } : n === "className" && (r[n] = [o, a].filter(Boolean).join(" "));
  }
  return { ...e, ...r };
}
function pn(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, r = t && "isReactWarning" in t && t.isReactWarning;
  return r ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, r = t && "isReactWarning" in t && t.isReactWarning, r ? e.props.ref : e.props.ref || e.ref);
}
var mn = [
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
], Mt = mn.reduce((e, t) => {
  const r = /* @__PURE__ */ ye(`Primitive.${t}`), n = c.forwardRef((o, a) => {
    const { asChild: s, ...i } = o, u = s ? r : t;
    return typeof window < "u" && (window[/* @__PURE__ */ Symbol.for("radix-ui")] = !0), /* @__PURE__ */ l(u, { ...i, ref: a });
  });
  return n.displayName = `Primitive.${t}`, { ...e, [t]: n };
}, {});
function vn(e, t) {
  e && Er.flushSync(() => e.dispatchEvent(t));
}
function xe(e) {
  const t = c.useRef(e);
  return c.useEffect(() => {
    t.current = e;
  }), c.useMemo(() => (...r) => t.current?.(...r), []);
}
function hn(e, t = globalThis?.document) {
  const r = xe(e);
  c.useEffect(() => {
    const n = (o) => {
      o.key === "Escape" && r(o);
    };
    return t.addEventListener("keydown", n, { capture: !0 }), () => t.removeEventListener("keydown", n, { capture: !0 });
  }, [r, t]);
}
var bn = "DismissableLayer", Xe = "dismissableLayer.update", gn = "dismissableLayer.pointerDownOutside", xn = "dismissableLayer.focusOutside", vt, _t = c.createContext({
  layers: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
}), Ft = c.forwardRef(
  (e, t) => {
    const {
      disableOutsidePointerEvents: r = !1,
      onEscapeKeyDown: n,
      onPointerDownOutside: o,
      onFocusOutside: a,
      onInteractOutside: s,
      onDismiss: i,
      ...u
    } = e, d = c.useContext(_t), [p, v] = c.useState(null), m = p?.ownerDocument ?? globalThis?.document, [, b] = c.useState({}), w = ae(t, (S) => v(S)), f = Array.from(d.layers), [y] = [...d.layersWithOutsidePointerEventsDisabled].slice(-1), N = f.indexOf(y), P = p ? f.indexOf(p) : -1, E = d.layersWithOutsidePointerEventsDisabled.size > 0, C = P >= N, T = Nn((S) => {
      const _ = S.target, F = [...d.branches].some((H) => H.contains(_));
      !C || F || (o?.(S), s?.(S), S.defaultPrevented || i?.());
    }, m), D = En((S) => {
      const _ = S.target;
      [...d.branches].some((H) => H.contains(_)) || (a?.(S), s?.(S), S.defaultPrevented || i?.());
    }, m);
    return hn((S) => {
      P === d.layers.size - 1 && (n?.(S), !S.defaultPrevented && i && (S.preventDefault(), i()));
    }, m), c.useEffect(() => {
      if (p)
        return r && (d.layersWithOutsidePointerEventsDisabled.size === 0 && (vt = m.body.style.pointerEvents, m.body.style.pointerEvents = "none"), d.layersWithOutsidePointerEventsDisabled.add(p)), d.layers.add(p), ht(), () => {
          r && d.layersWithOutsidePointerEventsDisabled.size === 1 && (m.body.style.pointerEvents = vt);
        };
    }, [p, m, r, d]), c.useEffect(() => () => {
      p && (d.layers.delete(p), d.layersWithOutsidePointerEventsDisabled.delete(p), ht());
    }, [p, d]), c.useEffect(() => {
      const S = () => b({});
      return document.addEventListener(Xe, S), () => document.removeEventListener(Xe, S);
    }, []), /* @__PURE__ */ l(
      Mt.div,
      {
        ...u,
        ref: w,
        style: {
          pointerEvents: E ? C ? "auto" : "none" : void 0,
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
Ft.displayName = bn;
var yn = "DismissableLayerBranch", wn = c.forwardRef((e, t) => {
  const r = c.useContext(_t), n = c.useRef(null), o = ae(t, n);
  return c.useEffect(() => {
    const a = n.current;
    if (a)
      return r.branches.add(a), () => {
        r.branches.delete(a);
      };
  }, [r.branches]), /* @__PURE__ */ l(Mt.div, { ...e, ref: o });
});
wn.displayName = yn;
function Nn(e, t = globalThis?.document) {
  const r = xe(e), n = c.useRef(!1), o = c.useRef(() => {
  });
  return c.useEffect(() => {
    const a = (i) => {
      if (i.target && !n.current) {
        let u = function() {
          Bt(
            gn,
            r,
            d,
            { discrete: !0 }
          );
        };
        const d = { originalEvent: i };
        i.pointerType === "touch" ? (t.removeEventListener("click", o.current), o.current = u, t.addEventListener("click", o.current, { once: !0 })) : u();
      } else
        t.removeEventListener("click", o.current);
      n.current = !1;
    }, s = window.setTimeout(() => {
      t.addEventListener("pointerdown", a);
    }, 0);
    return () => {
      window.clearTimeout(s), t.removeEventListener("pointerdown", a), t.removeEventListener("click", o.current);
    };
  }, [t, r]), {
    // ensures we check React component tree (not just DOM tree)
    onPointerDownCapture: () => n.current = !0
  };
}
function En(e, t = globalThis?.document) {
  const r = xe(e), n = c.useRef(!1);
  return c.useEffect(() => {
    const o = (a) => {
      a.target && !n.current && Bt(xn, r, { originalEvent: a }, {
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
function Bt(e, t, r, { discrete: n }) {
  const o = r.originalEvent.target, a = new CustomEvent(e, { bubbles: !1, cancelable: !0, detail: r });
  t && o.addEventListener(e, t, { once: !0 }), n ? vn(o, a) : o.dispatchEvent(a);
}
var Cn = [
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
], Sn = Cn.reduce((e, t) => {
  const r = /* @__PURE__ */ ye(`Primitive.${t}`), n = c.forwardRef((o, a) => {
    const { asChild: s, ...i } = o, u = s ? r : t;
    return typeof window < "u" && (window[/* @__PURE__ */ Symbol.for("radix-ui")] = !0), /* @__PURE__ */ l(u, { ...i, ref: a });
  });
  return n.displayName = `Primitive.${t}`, { ...e, [t]: n };
}, {}), je = "focusScope.autoFocusOnMount", Ue = "focusScope.autoFocusOnUnmount", bt = { bubbles: !1, cancelable: !0 }, kn = "FocusScope", Wt = c.forwardRef((e, t) => {
  const {
    loop: r = !1,
    trapped: n = !1,
    onMountAutoFocus: o,
    onUnmountAutoFocus: a,
    ...s
  } = e, [i, u] = c.useState(null), d = xe(o), p = xe(a), v = c.useRef(null), m = ae(t, (f) => u(f)), b = c.useRef({
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
      let f = function(E) {
        if (b.paused || !i) return;
        const C = E.target;
        i.contains(C) ? v.current = C : Z(v.current, { select: !0 });
      }, y = function(E) {
        if (b.paused || !i) return;
        const C = E.relatedTarget;
        C !== null && (i.contains(C) || Z(v.current, { select: !0 }));
      }, N = function(E) {
        if (document.activeElement === document.body)
          for (const T of E)
            T.removedNodes.length > 0 && Z(i);
      };
      document.addEventListener("focusin", f), document.addEventListener("focusout", y);
      const P = new MutationObserver(N);
      return i && P.observe(i, { childList: !0, subtree: !0 }), () => {
        document.removeEventListener("focusin", f), document.removeEventListener("focusout", y), P.disconnect();
      };
    }
  }, [n, i, b.paused]), c.useEffect(() => {
    if (i) {
      xt.add(b);
      const f = document.activeElement;
      if (!i.contains(f)) {
        const N = new CustomEvent(je, bt);
        i.addEventListener(je, d), i.dispatchEvent(N), N.defaultPrevented || (Rn(On(jt(i)), { select: !0 }), document.activeElement === f && Z(i));
      }
      return () => {
        i.removeEventListener(je, d), setTimeout(() => {
          const N = new CustomEvent(Ue, bt);
          i.addEventListener(Ue, p), i.dispatchEvent(N), N.defaultPrevented || Z(f ?? document.body, { select: !0 }), i.removeEventListener(Ue, p), xt.remove(b);
        }, 0);
      };
    }
  }, [i, d, p, b]);
  const w = c.useCallback(
    (f) => {
      if (!r && !n || b.paused) return;
      const y = f.key === "Tab" && !f.altKey && !f.ctrlKey && !f.metaKey, N = document.activeElement;
      if (y && N) {
        const P = f.currentTarget, [E, C] = Pn(P);
        E && C ? !f.shiftKey && N === C ? (f.preventDefault(), r && Z(E, { select: !0 })) : f.shiftKey && N === E && (f.preventDefault(), r && Z(C, { select: !0 })) : N === P && f.preventDefault();
      }
    },
    [r, n, b.paused]
  );
  return /* @__PURE__ */ l(Sn.div, { tabIndex: -1, ...s, ref: m, onKeyDown: w });
});
Wt.displayName = kn;
function Rn(e, { select: t = !1 } = {}) {
  const r = document.activeElement;
  for (const n of e)
    if (Z(n, { select: t }), document.activeElement !== r) return;
}
function Pn(e) {
  const t = jt(e), r = gt(t, e), n = gt(t.reverse(), e);
  return [r, n];
}
function jt(e) {
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
    if (!An(r, { upTo: t })) return r;
}
function An(e, { upTo: t }) {
  if (getComputedStyle(e).visibility === "hidden") return !0;
  for (; e; ) {
    if (t !== void 0 && e === t) return !1;
    if (getComputedStyle(e).display === "none") return !0;
    e = e.parentElement;
  }
  return !1;
}
function Dn(e) {
  return e instanceof HTMLInputElement && "select" in e;
}
function Z(e, { select: t = !1 } = {}) {
  if (e && e.focus) {
    const r = document.activeElement;
    e.focus({ preventScroll: !0 }), e !== r && Dn(e) && t && e.select();
  }
}
var xt = Tn();
function Tn() {
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
function On(e) {
  return e.filter((t) => t.tagName !== "A");
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
], $n = Ln.reduce((e, t) => {
  const r = /* @__PURE__ */ ye(`Primitive.${t}`), n = c.forwardRef((o, a) => {
    const { asChild: s, ...i } = o, u = s ? r : t;
    return typeof window < "u" && (window[/* @__PURE__ */ Symbol.for("radix-ui")] = !0), /* @__PURE__ */ l(u, { ...i, ref: a });
  });
  return n.displayName = `Primitive.${t}`, { ...e, [t]: n };
}, {}), In = "Portal", Ut = c.forwardRef((e, t) => {
  const { container: r, ...n } = e, [o, a] = c.useState(!1);
  ge(() => a(!0), []);
  const s = r || o && globalThis?.document?.body;
  return s ? Cr.createPortal(/* @__PURE__ */ l($n.div, { ...n, ref: t }), s) : null;
});
Ut.displayName = In;
function Mn(e, t) {
  return c.useReducer((r, n) => t[r][n] ?? r, e);
}
var $e = (e) => {
  const { present: t, children: r } = e, n = _n(t), o = typeof r == "function" ? r({ present: n.isPresent }) : c.Children.only(r), a = ae(n.ref, Fn(o));
  return typeof r == "function" || n.isPresent ? c.cloneElement(o, { ref: a }) : null;
};
$e.displayName = "Presence";
function _n(e) {
  const [t, r] = c.useState(), n = c.useRef(null), o = c.useRef(e), a = c.useRef("none"), s = e ? "mounted" : "unmounted", [i, u] = Mn(s, {
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
    const d = Ce(n.current);
    a.current = i === "mounted" ? d : "none";
  }, [i]), ge(() => {
    const d = n.current, p = o.current;
    if (p !== e) {
      const m = a.current, b = Ce(d);
      e ? u("MOUNT") : b === "none" || d?.display === "none" ? u("UNMOUNT") : u(p && m !== b ? "ANIMATION_OUT" : "UNMOUNT"), o.current = e;
    }
  }, [e, u]), ge(() => {
    if (t) {
      let d;
      const p = t.ownerDocument.defaultView ?? window, v = (b) => {
        const f = Ce(n.current).includes(CSS.escape(b.animationName));
        if (b.target === t && f && (u("ANIMATION_END"), !o.current)) {
          const y = t.style.animationFillMode;
          t.style.animationFillMode = "forwards", d = p.setTimeout(() => {
            t.style.animationFillMode === "forwards" && (t.style.animationFillMode = y);
          });
        }
      }, m = (b) => {
        b.target === t && (a.current = Ce(n.current));
      };
      return t.addEventListener("animationstart", m), t.addEventListener("animationcancel", v), t.addEventListener("animationend", v), () => {
        p.clearTimeout(d), t.removeEventListener("animationstart", m), t.removeEventListener("animationcancel", v), t.removeEventListener("animationend", v);
      };
    } else
      u("ANIMATION_END");
  }, [t, u]), {
    isPresent: ["mounted", "unmountSuspended"].includes(i),
    ref: c.useCallback((d) => {
      n.current = d ? getComputedStyle(d) : null, r(d);
    }, [])
  };
}
function Ce(e) {
  return e?.animationName || "none";
}
function Fn(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, r = t && "isReactWarning" in t && t.isReactWarning;
  return r ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, r = t && "isReactWarning" in t && t.isReactWarning, r ? e.props.ref : e.props.ref || e.ref);
}
var Bn = [
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
], we = Bn.reduce((e, t) => {
  const r = /* @__PURE__ */ ye(`Primitive.${t}`), n = c.forwardRef((o, a) => {
    const { asChild: s, ...i } = o, u = s ? r : t;
    return typeof window < "u" && (window[/* @__PURE__ */ Symbol.for("radix-ui")] = !0), /* @__PURE__ */ l(u, { ...i, ref: a });
  });
  return n.displayName = `Primitive.${t}`, { ...e, [t]: n };
}, {}), He = 0;
function Wn() {
  c.useEffect(() => {
    const e = document.querySelectorAll("[data-radix-focus-guard]");
    return document.body.insertAdjacentElement("afterbegin", e[0] ?? wt()), document.body.insertAdjacentElement("beforeend", e[1] ?? wt()), He++, () => {
      He === 1 && document.querySelectorAll("[data-radix-focus-guard]").forEach((t) => t.remove()), He--;
    };
  }, []);
}
function wt() {
  const e = document.createElement("span");
  return e.setAttribute("data-radix-focus-guard", ""), e.tabIndex = 0, e.style.outline = "none", e.style.opacity = "0", e.style.position = "fixed", e.style.pointerEvents = "none", e;
}
var z = function() {
  return z = Object.assign || function(t) {
    for (var r, n = 1, o = arguments.length; n < o; n++) {
      r = arguments[n];
      for (var a in r) Object.prototype.hasOwnProperty.call(r, a) && (t[a] = r[a]);
    }
    return t;
  }, z.apply(this, arguments);
};
function Ht(e, t) {
  var r = {};
  for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && t.indexOf(n) < 0 && (r[n] = e[n]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var o = 0, n = Object.getOwnPropertySymbols(e); o < n.length; o++)
      t.indexOf(n[o]) < 0 && Object.prototype.propertyIsEnumerable.call(e, n[o]) && (r[n[o]] = e[n[o]]);
  return r;
}
function jn(e, t, r) {
  if (r || arguments.length === 2) for (var n = 0, o = t.length, a; n < o; n++)
    (a || !(n in t)) && (a || (a = Array.prototype.slice.call(t, 0, n)), a[n] = t[n]);
  return e.concat(a || Array.prototype.slice.call(t));
}
var Ae = "right-scroll-bar-position", De = "width-before-scroll-bar", Un = "with-scroll-bars-hidden", Hn = "--removed-body-scroll-bar-size";
function Ke(e, t) {
  return typeof e == "function" ? e(t) : e && (e.current = t), e;
}
function Kn(e, t) {
  var r = U(function() {
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
var Vn = typeof window < "u" ? c.useLayoutEffect : c.useEffect, Nt = /* @__PURE__ */ new WeakMap();
function Gn(e, t) {
  var r = Kn(null, function(n) {
    return e.forEach(function(o) {
      return Ke(o, n);
    });
  });
  return Vn(function() {
    var n = Nt.get(r);
    if (n) {
      var o = new Set(n), a = new Set(e), s = r.current;
      o.forEach(function(i) {
        a.has(i) || Ke(i, null);
      }), a.forEach(function(i) {
        o.has(i) || Ke(i, s);
      });
    }
    Nt.set(r, e);
  }, [e]), r;
}
function zn(e) {
  return e;
}
function Yn(e, t) {
  t === void 0 && (t = zn);
  var r = [], n = !1, o = {
    read: function() {
      if (n)
        throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");
      return r.length ? r[r.length - 1] : e;
    },
    useMedium: function(a) {
      var s = t(a, n);
      return r.push(s), function() {
        r = r.filter(function(i) {
          return i !== s;
        });
      };
    },
    assignSyncMedium: function(a) {
      for (n = !0; r.length; ) {
        var s = r;
        r = [], s.forEach(a);
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
      var s = [];
      if (r.length) {
        var i = r;
        r = [], i.forEach(a), s = r;
      }
      var u = function() {
        var p = s;
        s = [], p.forEach(a);
      }, d = function() {
        return Promise.resolve().then(u);
      };
      d(), r = {
        push: function(p) {
          s.push(p), d();
        },
        filter: function(p) {
          return s = s.filter(p), r;
        }
      };
    }
  };
  return o;
}
function qn(e) {
  e === void 0 && (e = {});
  var t = Yn(null);
  return t.options = z({ async: !0, ssr: !1 }, e), t;
}
var Kt = function(e) {
  var t = e.sideCar, r = Ht(e, ["sideCar"]);
  if (!t)
    throw new Error("Sidecar: please provide `sideCar` property to import the right car");
  var n = t.read();
  if (!n)
    throw new Error("Sidecar medium not found");
  return c.createElement(n, z({}, r));
};
Kt.isSideCarExport = !0;
function Zn(e, t) {
  return e.useMedium(t), Kt;
}
var Vt = qn(), Ve = function() {
}, Ie = c.forwardRef(function(e, t) {
  var r = c.useRef(null), n = c.useState({
    onScrollCapture: Ve,
    onWheelCapture: Ve,
    onTouchMoveCapture: Ve
  }), o = n[0], a = n[1], s = e.forwardProps, i = e.children, u = e.className, d = e.removeScrollBar, p = e.enabled, v = e.shards, m = e.sideCar, b = e.noRelative, w = e.noIsolation, f = e.inert, y = e.allowPinchZoom, N = e.as, P = N === void 0 ? "div" : N, E = e.gapMode, C = Ht(e, ["forwardProps", "children", "className", "removeScrollBar", "enabled", "shards", "sideCar", "noRelative", "noIsolation", "inert", "allowPinchZoom", "as", "gapMode"]), T = m, D = Gn([r, t]), S = z(z({}, C), o);
  return c.createElement(
    c.Fragment,
    null,
    p && c.createElement(T, { sideCar: Vt, removeScrollBar: d, shards: v, noRelative: b, noIsolation: w, inert: f, setCallbacks: a, allowPinchZoom: !!y, lockRef: r, gapMode: E }),
    s ? c.cloneElement(c.Children.only(i), z(z({}, S), { ref: D })) : c.createElement(P, z({}, S, { className: u, ref: D }), i)
  );
});
Ie.defaultProps = {
  enabled: !0,
  removeScrollBar: !0,
  inert: !1
};
Ie.classNames = {
  fullWidth: De,
  zeroRight: Ae
};
var Xn = function() {
  if (typeof __webpack_nonce__ < "u")
    return __webpack_nonce__;
};
function Qn() {
  if (!document)
    return null;
  var e = document.createElement("style");
  e.type = "text/css";
  var t = Xn();
  return t && e.setAttribute("nonce", t), e;
}
function Jn(e, t) {
  e.styleSheet ? e.styleSheet.cssText = t : e.appendChild(document.createTextNode(t));
}
function eo(e) {
  var t = document.head || document.getElementsByTagName("head")[0];
  t.appendChild(e);
}
var to = function() {
  var e = 0, t = null;
  return {
    add: function(r) {
      e == 0 && (t = Qn()) && (Jn(t, r), eo(t)), e++;
    },
    remove: function() {
      e--, !e && t && (t.parentNode && t.parentNode.removeChild(t), t = null);
    }
  };
}, ro = function() {
  var e = to();
  return function(t, r) {
    c.useEffect(function() {
      return e.add(t), function() {
        e.remove();
      };
    }, [t && r]);
  };
}, Gt = function() {
  var e = ro(), t = function(r) {
    var n = r.styles, o = r.dynamic;
    return e(n, o), null;
  };
  return t;
}, no = {
  left: 0,
  top: 0,
  right: 0,
  gap: 0
}, Ge = function(e) {
  return parseInt(e || "", 10) || 0;
}, oo = function(e) {
  var t = window.getComputedStyle(document.body), r = t[e === "padding" ? "paddingLeft" : "marginLeft"], n = t[e === "padding" ? "paddingTop" : "marginTop"], o = t[e === "padding" ? "paddingRight" : "marginRight"];
  return [Ge(r), Ge(n), Ge(o)];
}, ao = function(e) {
  if (e === void 0 && (e = "margin"), typeof window > "u")
    return no;
  var t = oo(e), r = document.documentElement.clientWidth, n = window.innerWidth;
  return {
    left: t[0],
    top: t[1],
    right: t[2],
    gap: Math.max(0, n - r + t[2] - t[0])
  };
}, io = Gt(), fe = "data-scroll-locked", lo = function(e, t, r, n) {
  var o = e.left, a = e.top, s = e.right, i = e.gap;
  return r === void 0 && (r = "margin"), `
  .`.concat(Un, ` {
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
    padding-right: `).concat(s, `px;
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
    `).concat(Hn, ": ").concat(i, `px;
  }
`);
}, Et = function() {
  var e = parseInt(document.body.getAttribute(fe) || "0", 10);
  return isFinite(e) ? e : 0;
}, so = function() {
  c.useEffect(function() {
    return document.body.setAttribute(fe, (Et() + 1).toString()), function() {
      var e = Et() - 1;
      e <= 0 ? document.body.removeAttribute(fe) : document.body.setAttribute(fe, e.toString());
    };
  }, []);
}, co = function(e) {
  var t = e.noRelative, r = e.noImportant, n = e.gapMode, o = n === void 0 ? "margin" : n;
  so();
  var a = c.useMemo(function() {
    return ao(o);
  }, [o]);
  return c.createElement(io, { styles: lo(a, !t, o, r ? "" : "!important") });
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
var ie = Qe ? { passive: !1 } : !1, uo = function(e) {
  return e.tagName === "TEXTAREA";
}, zt = function(e, t) {
  if (!(e instanceof Element))
    return !1;
  var r = window.getComputedStyle(e);
  return (
    // not-not-scrollable
    r[t] !== "hidden" && // contains scroll inside self
    !(r.overflowY === r.overflowX && !uo(e) && r[t] === "visible")
  );
}, fo = function(e) {
  return zt(e, "overflowY");
}, po = function(e) {
  return zt(e, "overflowX");
}, Ct = function(e, t) {
  var r = t.ownerDocument, n = t;
  do {
    typeof ShadowRoot < "u" && n instanceof ShadowRoot && (n = n.host);
    var o = Yt(e, n);
    if (o) {
      var a = qt(e, n), s = a[1], i = a[2];
      if (s > i)
        return !0;
    }
    n = n.parentNode;
  } while (n && n !== r.body);
  return !1;
}, mo = function(e) {
  var t = e.scrollTop, r = e.scrollHeight, n = e.clientHeight;
  return [
    t,
    r,
    n
  ];
}, vo = function(e) {
  var t = e.scrollLeft, r = e.scrollWidth, n = e.clientWidth;
  return [
    t,
    r,
    n
  ];
}, Yt = function(e, t) {
  return e === "v" ? fo(t) : po(t);
}, qt = function(e, t) {
  return e === "v" ? mo(t) : vo(t);
}, ho = function(e, t) {
  return e === "h" && t === "rtl" ? -1 : 1;
}, bo = function(e, t, r, n, o) {
  var a = ho(e, window.getComputedStyle(t).direction), s = a * n, i = r.target, u = t.contains(i), d = !1, p = s > 0, v = 0, m = 0;
  do {
    if (!i)
      break;
    var b = qt(e, i), w = b[0], f = b[1], y = b[2], N = f - y - a * w;
    (w || N) && Yt(e, i) && (v += N, m += w);
    var P = i.parentNode;
    i = P && P.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? P.host : P;
  } while (
    // portaled content
    !u && i !== document.body || // self content
    u && (t.contains(i) || t === i)
  );
  return (p && Math.abs(v) < 1 || !p && Math.abs(m) < 1) && (d = !0), d;
}, ke = function(e) {
  return "changedTouches" in e ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY] : [0, 0];
}, St = function(e) {
  return [e.deltaX, e.deltaY];
}, kt = function(e) {
  return e && "current" in e ? e.current : e;
}, go = function(e, t) {
  return e[0] === t[0] && e[1] === t[1];
}, xo = function(e) {
  return `
  .block-interactivity-`.concat(e, ` {pointer-events: none;}
  .allow-interactivity-`).concat(e, ` {pointer-events: all;}
`);
}, yo = 0, le = [];
function wo(e) {
  var t = c.useRef([]), r = c.useRef([0, 0]), n = c.useRef(), o = c.useState(yo++)[0], a = c.useState(Gt)[0], s = c.useRef(e);
  c.useEffect(function() {
    s.current = e;
  }, [e]), c.useEffect(function() {
    if (e.inert) {
      document.body.classList.add("block-interactivity-".concat(o));
      var f = jn([e.lockRef.current], (e.shards || []).map(kt), !0).filter(Boolean);
      return f.forEach(function(y) {
        return y.classList.add("allow-interactivity-".concat(o));
      }), function() {
        document.body.classList.remove("block-interactivity-".concat(o)), f.forEach(function(y) {
          return y.classList.remove("allow-interactivity-".concat(o));
        });
      };
    }
  }, [e.inert, e.lockRef.current, e.shards]);
  var i = c.useCallback(function(f, y) {
    if ("touches" in f && f.touches.length === 2 || f.type === "wheel" && f.ctrlKey)
      return !s.current.allowPinchZoom;
    var N = ke(f), P = r.current, E = "deltaX" in f ? f.deltaX : P[0] - N[0], C = "deltaY" in f ? f.deltaY : P[1] - N[1], T, D = f.target, S = Math.abs(E) > Math.abs(C) ? "h" : "v";
    if ("touches" in f && S === "h" && D.type === "range")
      return !1;
    var _ = window.getSelection(), F = _ && _.anchorNode, H = F ? F === D || F.contains(D) : !1;
    if (H)
      return !1;
    var R = Ct(S, D);
    if (!R)
      return !0;
    if (R ? T = S : (T = S === "v" ? "h" : "v", R = Ct(S, D)), !R)
      return !1;
    if (!n.current && "changedTouches" in f && (E || C) && (n.current = T), !T)
      return !0;
    var M = n.current || T;
    return bo(M, y, f, M === "h" ? E : C);
  }, []), u = c.useCallback(function(f) {
    var y = f;
    if (!(!le.length || le[le.length - 1] !== a)) {
      var N = "deltaY" in y ? St(y) : ke(y), P = t.current.filter(function(T) {
        return T.name === y.type && (T.target === y.target || y.target === T.shadowParent) && go(T.delta, N);
      })[0];
      if (P && P.should) {
        y.cancelable && y.preventDefault();
        return;
      }
      if (!P) {
        var E = (s.current.shards || []).map(kt).filter(Boolean).filter(function(T) {
          return T.contains(y.target);
        }), C = E.length > 0 ? i(y, E[0]) : !s.current.noIsolation;
        C && y.cancelable && y.preventDefault();
      }
    }
  }, []), d = c.useCallback(function(f, y, N, P) {
    var E = { name: f, delta: y, target: N, should: P, shadowParent: No(N) };
    t.current.push(E), setTimeout(function() {
      t.current = t.current.filter(function(C) {
        return C !== E;
      });
    }, 1);
  }, []), p = c.useCallback(function(f) {
    r.current = ke(f), n.current = void 0;
  }, []), v = c.useCallback(function(f) {
    d(f.type, St(f), f.target, i(f, e.lockRef.current));
  }, []), m = c.useCallback(function(f) {
    d(f.type, ke(f), f.target, i(f, e.lockRef.current));
  }, []);
  c.useEffect(function() {
    return le.push(a), e.setCallbacks({
      onScrollCapture: v,
      onWheelCapture: v,
      onTouchMoveCapture: m
    }), document.addEventListener("wheel", u, ie), document.addEventListener("touchmove", u, ie), document.addEventListener("touchstart", p, ie), function() {
      le = le.filter(function(f) {
        return f !== a;
      }), document.removeEventListener("wheel", u, ie), document.removeEventListener("touchmove", u, ie), document.removeEventListener("touchstart", p, ie);
    };
  }, []);
  var b = e.removeScrollBar, w = e.inert;
  return c.createElement(
    c.Fragment,
    null,
    w ? c.createElement(a, { styles: xo(o) }) : null,
    b ? c.createElement(co, { noRelative: e.noRelative, gapMode: e.gapMode }) : null
  );
}
function No(e) {
  for (var t = null; e !== null; )
    e instanceof ShadowRoot && (t = e.host, e = e.host), e = e.parentNode;
  return t;
}
const Eo = Zn(Vt, wo);
var Zt = c.forwardRef(function(e, t) {
  return c.createElement(Ie, z({}, e, { ref: t, sideCar: Eo }));
});
Zt.classNames = Ie.classNames;
var Co = function(e) {
  if (typeof document > "u")
    return null;
  var t = Array.isArray(e) ? e[0] : e;
  return t.ownerDocument.body;
}, se = /* @__PURE__ */ new WeakMap(), Re = /* @__PURE__ */ new WeakMap(), Pe = {}, ze = 0, Xt = function(e) {
  return e && (e.host || Xt(e.parentNode));
}, So = function(e, t) {
  return t.map(function(r) {
    if (e.contains(r))
      return r;
    var n = Xt(r);
    return n && e.contains(n) ? n : (console.error("aria-hidden", r, "in not contained inside", e, ". Doing nothing"), null);
  }).filter(function(r) {
    return !!r;
  });
}, ko = function(e, t, r, n) {
  var o = So(t, Array.isArray(e) ? e : [e]);
  Pe[r] || (Pe[r] = /* @__PURE__ */ new WeakMap());
  var a = Pe[r], s = [], i = /* @__PURE__ */ new Set(), u = new Set(o), d = function(v) {
    !v || i.has(v) || (i.add(v), d(v.parentNode));
  };
  o.forEach(d);
  var p = function(v) {
    !v || u.has(v) || Array.prototype.forEach.call(v.children, function(m) {
      if (i.has(m))
        p(m);
      else
        try {
          var b = m.getAttribute(n), w = b !== null && b !== "false", f = (se.get(m) || 0) + 1, y = (a.get(m) || 0) + 1;
          se.set(m, f), a.set(m, y), s.push(m), f === 1 && w && Re.set(m, !0), y === 1 && m.setAttribute(r, "true"), w || m.setAttribute(n, "true");
        } catch (N) {
          console.error("aria-hidden: cannot operate on ", m, N);
        }
    });
  };
  return p(t), i.clear(), ze++, function() {
    s.forEach(function(v) {
      var m = se.get(v) - 1, b = a.get(v) - 1;
      se.set(v, m), a.set(v, b), m || (Re.has(v) || v.removeAttribute(n), Re.delete(v)), b || v.removeAttribute(r);
    }), ze--, ze || (se = /* @__PURE__ */ new WeakMap(), se = /* @__PURE__ */ new WeakMap(), Re = /* @__PURE__ */ new WeakMap(), Pe = {});
  };
}, Ro = function(e, t, r) {
  r === void 0 && (r = "data-aria-hidden");
  var n = Array.from(Array.isArray(e) ? e : [e]), o = Co(e);
  return o ? (n.push.apply(n, Array.from(o.querySelectorAll("[aria-live], script"))), ko(n, o, r, "aria-hidden")) : function() {
    return null;
  };
}, Me = "Dialog", [Qt] = en(Me), [Po, V] = Qt(Me), Jt = (e) => {
  const {
    __scopeDialog: t,
    children: r,
    open: n,
    defaultOpen: o,
    onOpenChange: a,
    modal: s = !0
  } = e, i = c.useRef(null), u = c.useRef(null), [d, p] = an({
    prop: n,
    defaultProp: o ?? !1,
    onChange: a,
    caller: Me
  });
  return /* @__PURE__ */ l(
    Po,
    {
      scope: t,
      triggerRef: i,
      contentRef: u,
      contentId: q(),
      titleId: q(),
      descriptionId: q(),
      open: d,
      onOpenChange: p,
      onOpenToggle: c.useCallback(() => p((v) => !v), [p]),
      modal: s,
      children: r
    }
  );
};
Jt.displayName = Me;
var er = "DialogTrigger", Ao = c.forwardRef(
  (e, t) => {
    const { __scopeDialog: r, ...n } = e, o = V(er, r), a = ae(t, o.triggerRef);
    return /* @__PURE__ */ l(
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
Ao.displayName = er;
var tt = "DialogPortal", [Do, tr] = Qt(tt, {
  forceMount: void 0
}), rr = (e) => {
  const { __scopeDialog: t, forceMount: r, children: n, container: o } = e, a = V(tt, t);
  return /* @__PURE__ */ l(Do, { scope: t, forceMount: r, children: c.Children.map(n, (s) => /* @__PURE__ */ l($e, { present: r || a.open, children: /* @__PURE__ */ l(Ut, { asChild: !0, container: o, children: s }) })) });
};
rr.displayName = tt;
var Te = "DialogOverlay", nr = c.forwardRef(
  (e, t) => {
    const r = tr(Te, e.__scopeDialog), { forceMount: n = r.forceMount, ...o } = e, a = V(Te, e.__scopeDialog);
    return a.modal ? /* @__PURE__ */ l($e, { present: n || a.open, children: /* @__PURE__ */ l(Oo, { ...o, ref: t }) }) : null;
  }
);
nr.displayName = Te;
var To = /* @__PURE__ */ ye("DialogOverlay.RemoveScroll"), Oo = c.forwardRef(
  (e, t) => {
    const { __scopeDialog: r, ...n } = e, o = V(Te, r);
    return (
      // Make sure `Content` is scrollable even when it doesn't live inside `RemoveScroll`
      // ie. when `Overlay` and `Content` are siblings
      /* @__PURE__ */ l(Zt, { as: To, allowPinchZoom: !0, shards: [o.contentRef], children: /* @__PURE__ */ l(
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
), ne = "DialogContent", or = c.forwardRef(
  (e, t) => {
    const r = tr(ne, e.__scopeDialog), { forceMount: n = r.forceMount, ...o } = e, a = V(ne, e.__scopeDialog);
    return /* @__PURE__ */ l($e, { present: n || a.open, children: a.modal ? /* @__PURE__ */ l(Lo, { ...o, ref: t }) : /* @__PURE__ */ l($o, { ...o, ref: t }) });
  }
);
or.displayName = ne;
var Lo = c.forwardRef(
  (e, t) => {
    const r = V(ne, e.__scopeDialog), n = c.useRef(null), o = ae(t, r.contentRef, n);
    return c.useEffect(() => {
      const a = n.current;
      if (a) return Ro(a);
    }, []), /* @__PURE__ */ l(
      ar,
      {
        ...e,
        ref: o,
        trapFocus: r.open,
        disableOutsidePointerEvents: !0,
        onCloseAutoFocus: X(e.onCloseAutoFocus, (a) => {
          a.preventDefault(), r.triggerRef.current?.focus();
        }),
        onPointerDownOutside: X(e.onPointerDownOutside, (a) => {
          const s = a.detail.originalEvent, i = s.button === 0 && s.ctrlKey === !0;
          (s.button === 2 || i) && a.preventDefault();
        }),
        onFocusOutside: X(
          e.onFocusOutside,
          (a) => a.preventDefault()
        )
      }
    );
  }
), $o = c.forwardRef(
  (e, t) => {
    const r = V(ne, e.__scopeDialog), n = c.useRef(!1), o = c.useRef(!1);
    return /* @__PURE__ */ l(
      ar,
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
          const s = a.target;
          r.triggerRef.current?.contains(s) && a.preventDefault(), a.detail.originalEvent.type === "focusin" && o.current && a.preventDefault();
        }
      }
    );
  }
), ar = c.forwardRef(
  (e, t) => {
    const { __scopeDialog: r, trapFocus: n, onOpenAutoFocus: o, onCloseAutoFocus: a, ...s } = e, i = V(ne, r), u = c.useRef(null), d = ae(t, u);
    return Wn(), /* @__PURE__ */ h(Q, { children: [
      /* @__PURE__ */ l(
        Wt,
        {
          asChild: !0,
          loop: !0,
          trapped: n,
          onMountAutoFocus: o,
          onUnmountAutoFocus: a,
          children: /* @__PURE__ */ l(
            Ft,
            {
              role: "dialog",
              id: i.contentId,
              "aria-describedby": i.descriptionId,
              "aria-labelledby": i.titleId,
              "data-state": nt(i.open),
              ...s,
              ref: d,
              onDismiss: () => i.onOpenChange(!1)
            }
          )
        }
      ),
      /* @__PURE__ */ h(Q, { children: [
        /* @__PURE__ */ l(Fo, { titleId: i.titleId }),
        /* @__PURE__ */ l(Wo, { contentRef: u, descriptionId: i.descriptionId })
      ] })
    ] });
  }
), rt = "DialogTitle", Io = c.forwardRef(
  (e, t) => {
    const { __scopeDialog: r, ...n } = e, o = V(rt, r);
    return /* @__PURE__ */ l(we.h2, { id: o.titleId, ...n, ref: t });
  }
);
Io.displayName = rt;
var ir = "DialogDescription", Mo = c.forwardRef(
  (e, t) => {
    const { __scopeDialog: r, ...n } = e, o = V(ir, r);
    return /* @__PURE__ */ l(we.p, { id: o.descriptionId, ...n, ref: t });
  }
);
Mo.displayName = ir;
var lr = "DialogClose", _o = c.forwardRef(
  (e, t) => {
    const { __scopeDialog: r, ...n } = e, o = V(lr, r);
    return /* @__PURE__ */ l(
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
_o.displayName = lr;
function nt(e) {
  return e ? "open" : "closed";
}
var sr = "DialogTitleWarning", [yi, cr] = Jr(sr, {
  contentName: ne,
  titleName: rt,
  docsSlug: "dialog"
}), Fo = ({ titleId: e }) => {
  const t = cr(sr), r = `\`${t.contentName}\` requires a \`${t.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${t.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${t.docsSlug}`;
  return c.useEffect(() => {
    e && (document.getElementById(e) || console.error(r));
  }, [r, e]), null;
}, Bo = "DialogDescriptionWarning", Wo = ({ contentRef: e, descriptionId: t }) => {
  const n = `Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${cr(Bo).contentName}}.`;
  return c.useEffect(() => {
    const o = e.current?.getAttribute("aria-describedby");
    t && o && (document.getElementById(t) || console.warn(n));
  }, [n, e, t]), null;
}, jo = Jt, Uo = rr, Ho = nr, Ko = or, Vo = /* @__PURE__ */ Symbol.for("react.lazy"), Oe = c[" use ".trim().toString()];
function Go(e) {
  return typeof e == "object" && e !== null && "then" in e;
}
function dr(e) {
  return e != null && typeof e == "object" && "$$typeof" in e && e.$$typeof === Vo && "_payload" in e && Go(e._payload);
}
// @__NO_SIDE_EFFECTS__
function zo(e) {
  const t = /* @__PURE__ */ Yo(e), r = c.forwardRef((n, o) => {
    let { children: a, ...s } = n;
    dr(a) && typeof Oe == "function" && (a = Oe(a._payload));
    const i = c.Children.toArray(a), u = i.find(Zo);
    if (u) {
      const d = u.props.children, p = i.map((v) => v === u ? c.Children.count(d) > 1 ? c.Children.only(null) : c.isValidElement(d) ? d.props.children : null : v);
      return /* @__PURE__ */ l(t, { ...s, ref: o, children: c.isValidElement(d) ? c.cloneElement(d, void 0, p) : null });
    }
    return /* @__PURE__ */ l(t, { ...s, ref: o, children: a });
  });
  return r.displayName = `${e}.Slot`, r;
}
// @__NO_SIDE_EFFECTS__
function Yo(e) {
  const t = c.forwardRef((r, n) => {
    let { children: o, ...a } = r;
    if (dr(o) && typeof Oe == "function" && (o = Oe(o._payload)), c.isValidElement(o)) {
      const s = Qo(o), i = Xo(a, o.props);
      return o.type !== c.Fragment && (i.ref = n ? J(n, s) : s), c.cloneElement(o, i);
    }
    return c.Children.count(o) > 1 ? c.Children.only(null) : null;
  });
  return t.displayName = `${e}.SlotClone`, t;
}
var qo = /* @__PURE__ */ Symbol("radix.slottable");
function Zo(e) {
  return c.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === qo;
}
function Xo(e, t) {
  const r = { ...t };
  for (const n in t) {
    const o = e[n], a = t[n];
    /^on[A-Z]/.test(n) ? o && a ? r[n] = (...i) => {
      const u = a(...i);
      return o(...i), u;
    } : o && (r[n] = o) : n === "style" ? r[n] = { ...o, ...a } : n === "className" && (r[n] = [o, a].filter(Boolean).join(" "));
  }
  return { ...e, ...r };
}
function Qo(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, r = t && "isReactWarning" in t && t.isReactWarning;
  return r ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, r = t && "isReactWarning" in t && t.isReactWarning, r ? e.props.ref : e.props.ref || e.ref);
}
var Jo = [
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
], te = Jo.reduce((e, t) => {
  const r = /* @__PURE__ */ zo(`Primitive.${t}`), n = c.forwardRef((o, a) => {
    const { asChild: s, ...i } = o, u = s ? r : t;
    return typeof window < "u" && (window[/* @__PURE__ */ Symbol.for("radix-ui")] = !0), /* @__PURE__ */ l(u, { ...i, ref: a });
  });
  return n.displayName = `Primitive.${t}`, { ...e, [t]: n };
}, {}), be = '[cmdk-group=""]', Ye = '[cmdk-group-items=""]', ea = '[cmdk-group-heading=""]', ur = '[cmdk-item=""]', Rt = `${ur}:not([aria-disabled="true"])`, Je = "cmdk-item-select", de = "data-value", ta = (e, t, r) => Qr(e, t, r), fr = c.createContext(void 0), Ne = () => c.useContext(fr), pr = c.createContext(void 0), ot = () => c.useContext(pr), mr = c.createContext(void 0), vr = c.forwardRef((e, t) => {
  let r = ue(() => {
    var g, A;
    return { search: "", value: (A = (g = e.value) != null ? g : e.defaultValue) != null ? A : "", selectedItemId: void 0, filtered: { count: 0, items: /* @__PURE__ */ new Map(), groups: /* @__PURE__ */ new Set() } };
  }), n = ue(() => /* @__PURE__ */ new Set()), o = ue(() => /* @__PURE__ */ new Map()), a = ue(() => /* @__PURE__ */ new Map()), s = ue(() => /* @__PURE__ */ new Set()), i = hr(e), { label: u, children: d, value: p, onValueChange: v, filter: m, shouldFilter: b, loop: w, disablePointerSelection: f = !1, vimBindings: y = !0, ...N } = e, P = q(), E = q(), C = q(), T = c.useRef(null), D = fa();
  oe(() => {
    if (p !== void 0) {
      let g = p.trim();
      r.current.value = g, S.emit();
    }
  }, [p]), oe(() => {
    D(6, I);
  }, []);
  let S = c.useMemo(() => ({ subscribe: (g) => (s.current.add(g), () => s.current.delete(g)), snapshot: () => r.current, setState: (g, A, O) => {
    var k, L, $, j;
    if (!Object.is(r.current[g], A)) {
      if (r.current[g] = A, g === "search") M(), H(), D(1, R);
      else if (g === "value") {
        if (document.activeElement.hasAttribute("cmdk-input") || document.activeElement.hasAttribute("cmdk-root")) {
          let B = document.getElementById(C);
          B ? B.focus() : (k = document.getElementById(P)) == null || k.focus();
        }
        if (D(7, () => {
          var B;
          r.current.selectedItemId = (B = W()) == null ? void 0 : B.id, S.emit();
        }), O || D(5, I), ((L = i.current) == null ? void 0 : L.value) !== void 0) {
          let B = A ?? "";
          (j = ($ = i.current).onValueChange) == null || j.call($, B);
          return;
        }
      }
      S.emit();
    }
  }, emit: () => {
    s.current.forEach((g) => g());
  } }), []), _ = c.useMemo(() => ({ value: (g, A, O) => {
    var k;
    A !== ((k = a.current.get(g)) == null ? void 0 : k.value) && (a.current.set(g, { value: A, keywords: O }), r.current.filtered.items.set(g, F(A, O)), D(2, () => {
      H(), S.emit();
    }));
  }, item: (g, A) => (n.current.add(g), A && (o.current.has(A) ? o.current.get(A).add(g) : o.current.set(A, /* @__PURE__ */ new Set([g]))), D(3, () => {
    M(), H(), r.current.value || R(), S.emit();
  }), () => {
    a.current.delete(g), n.current.delete(g), r.current.filtered.items.delete(g);
    let O = W();
    D(4, () => {
      M(), O?.getAttribute("id") === g && R(), S.emit();
    });
  }), group: (g) => (o.current.has(g) || o.current.set(g, /* @__PURE__ */ new Set()), () => {
    a.current.delete(g), o.current.delete(g);
  }), filter: () => i.current.shouldFilter, label: u || e["aria-label"], getDisablePointerSelection: () => i.current.disablePointerSelection, listId: P, inputId: C, labelId: E, listInnerRef: T }), []);
  function F(g, A) {
    var O, k;
    let L = (k = (O = i.current) == null ? void 0 : O.filter) != null ? k : ta;
    return g ? L(g, r.current.search, A) : 0;
  }
  function H() {
    if (!r.current.search || i.current.shouldFilter === !1) return;
    let g = r.current.filtered.items, A = [];
    r.current.filtered.groups.forEach((k) => {
      let L = o.current.get(k), $ = 0;
      L.forEach((j) => {
        let B = g.get(j);
        $ = Math.max(B, $);
      }), A.push([k, $]);
    });
    let O = T.current;
    G().sort((k, L) => {
      var $, j;
      let B = k.getAttribute("id"), Ee = L.getAttribute("id");
      return (($ = g.get(Ee)) != null ? $ : 0) - ((j = g.get(B)) != null ? j : 0);
    }).forEach((k) => {
      let L = k.closest(Ye);
      L ? L.appendChild(k.parentElement === L ? k : k.closest(`${Ye} > *`)) : O.appendChild(k.parentElement === O ? k : k.closest(`${Ye} > *`));
    }), A.sort((k, L) => L[1] - k[1]).forEach((k) => {
      var L;
      let $ = (L = T.current) == null ? void 0 : L.querySelector(`${be}[${de}="${encodeURIComponent(k[0])}"]`);
      $?.parentElement.appendChild($);
    });
  }
  function R() {
    let g = G().find((O) => O.getAttribute("aria-disabled") !== "true"), A = g?.getAttribute(de);
    S.setState("value", A || void 0);
  }
  function M() {
    var g, A, O, k;
    if (!r.current.search || i.current.shouldFilter === !1) {
      r.current.filtered.count = n.current.size;
      return;
    }
    r.current.filtered.groups = /* @__PURE__ */ new Set();
    let L = 0;
    for (let $ of n.current) {
      let j = (A = (g = a.current.get($)) == null ? void 0 : g.value) != null ? A : "", B = (k = (O = a.current.get($)) == null ? void 0 : O.keywords) != null ? k : [], Ee = F(j, B);
      r.current.filtered.items.set($, Ee), Ee > 0 && L++;
    }
    for (let [$, j] of o.current) for (let B of j) if (r.current.filtered.items.get(B) > 0) {
      r.current.filtered.groups.add($);
      break;
    }
    r.current.filtered.count = L;
  }
  function I() {
    var g, A, O;
    let k = W();
    k && (((g = k.parentElement) == null ? void 0 : g.firstChild) === k && ((O = (A = k.closest(be)) == null ? void 0 : A.querySelector(ea)) == null || O.scrollIntoView({ block: "nearest" })), k.scrollIntoView({ block: "nearest" }));
  }
  function W() {
    var g;
    return (g = T.current) == null ? void 0 : g.querySelector(`${ur}[aria-selected="true"]`);
  }
  function G() {
    var g;
    return Array.from(((g = T.current) == null ? void 0 : g.querySelectorAll(Rt)) || []);
  }
  function me(g) {
    let A = G()[g];
    A && S.setState("value", A.getAttribute(de));
  }
  function ve(g) {
    var A;
    let O = W(), k = G(), L = k.findIndex((j) => j === O), $ = k[L + g];
    (A = i.current) != null && A.loop && ($ = L + g < 0 ? k[k.length - 1] : L + g === k.length ? k[0] : k[L + g]), $ && S.setState("value", $.getAttribute(de));
  }
  function it(g) {
    let A = W(), O = A?.closest(be), k;
    for (; O && !k; ) O = g > 0 ? da(O, be) : ua(O, be), k = O?.querySelector(Rt);
    k ? S.setState("value", k.getAttribute(de)) : ve(g);
  }
  let lt = () => me(G().length - 1), st = (g) => {
    g.preventDefault(), g.metaKey ? lt() : g.altKey ? it(1) : ve(1);
  }, ct = (g) => {
    g.preventDefault(), g.metaKey ? me(0) : g.altKey ? it(-1) : ve(-1);
  };
  return c.createElement(te.div, { ref: t, tabIndex: -1, ...N, "cmdk-root": "", onKeyDown: (g) => {
    var A;
    (A = N.onKeyDown) == null || A.call(N, g);
    let O = g.nativeEvent.isComposing || g.keyCode === 229;
    if (!(g.defaultPrevented || O)) switch (g.key) {
      case "n":
      case "j": {
        y && g.ctrlKey && st(g);
        break;
      }
      case "ArrowDown": {
        st(g);
        break;
      }
      case "p":
      case "k": {
        y && g.ctrlKey && ct(g);
        break;
      }
      case "ArrowUp": {
        ct(g);
        break;
      }
      case "Home": {
        g.preventDefault(), me(0);
        break;
      }
      case "End": {
        g.preventDefault(), lt();
        break;
      }
      case "Enter": {
        g.preventDefault();
        let k = W();
        if (k) {
          let L = new Event(Je);
          k.dispatchEvent(L);
        }
      }
    }
  } }, c.createElement("label", { "cmdk-label": "", htmlFor: _.inputId, id: _.labelId, style: ma }, u), _e(e, (g) => c.createElement(pr.Provider, { value: S }, c.createElement(fr.Provider, { value: _ }, g))));
}), ra = c.forwardRef((e, t) => {
  var r, n;
  let o = q(), a = c.useRef(null), s = c.useContext(mr), i = Ne(), u = hr(e), d = (n = (r = u.current) == null ? void 0 : r.forceMount) != null ? n : s?.forceMount;
  oe(() => {
    if (!d) return i.item(o, s?.id);
  }, [d]);
  let p = br(o, a, [e.value, e.children, a], e.keywords), v = ot(), m = ee((D) => D.value && D.value === p.current), b = ee((D) => d || i.filter() === !1 ? !0 : D.search ? D.filtered.items.get(o) > 0 : !0);
  c.useEffect(() => {
    let D = a.current;
    if (!(!D || e.disabled)) return D.addEventListener(Je, w), () => D.removeEventListener(Je, w);
  }, [b, e.onSelect, e.disabled]);
  function w() {
    var D, S;
    f(), (S = (D = u.current).onSelect) == null || S.call(D, p.current);
  }
  function f() {
    v.setState("value", p.current, !0);
  }
  if (!b) return null;
  let { disabled: y, value: N, onSelect: P, forceMount: E, keywords: C, ...T } = e;
  return c.createElement(te.div, { ref: J(a, t), ...T, id: o, "cmdk-item": "", role: "option", "aria-disabled": !!y, "aria-selected": !!m, "data-disabled": !!y, "data-selected": !!m, onPointerMove: y || i.getDisablePointerSelection() ? void 0 : f, onClick: y ? void 0 : w }, e.children);
}), na = c.forwardRef((e, t) => {
  let { heading: r, children: n, forceMount: o, ...a } = e, s = q(), i = c.useRef(null), u = c.useRef(null), d = q(), p = Ne(), v = ee((b) => o || p.filter() === !1 ? !0 : b.search ? b.filtered.groups.has(s) : !0);
  oe(() => p.group(s), []), br(s, i, [e.value, e.heading, u]);
  let m = c.useMemo(() => ({ id: s, forceMount: o }), [o]);
  return c.createElement(te.div, { ref: J(i, t), ...a, "cmdk-group": "", role: "presentation", hidden: v ? void 0 : !0 }, r && c.createElement("div", { ref: u, "cmdk-group-heading": "", "aria-hidden": !0, id: d }, r), _e(e, (b) => c.createElement("div", { "cmdk-group-items": "", role: "group", "aria-labelledby": r ? d : void 0 }, c.createElement(mr.Provider, { value: m }, b))));
}), oa = c.forwardRef((e, t) => {
  let { alwaysRender: r, ...n } = e, o = c.useRef(null), a = ee((s) => !s.search);
  return !r && !a ? null : c.createElement(te.div, { ref: J(o, t), ...n, "cmdk-separator": "", role: "separator" });
}), aa = c.forwardRef((e, t) => {
  let { onValueChange: r, ...n } = e, o = e.value != null, a = ot(), s = ee((d) => d.search), i = ee((d) => d.selectedItemId), u = Ne();
  return c.useEffect(() => {
    e.value != null && a.setState("search", e.value);
  }, [e.value]), c.createElement(te.input, { ref: t, ...n, "cmdk-input": "", autoComplete: "off", autoCorrect: "off", spellCheck: !1, "aria-autocomplete": "list", role: "combobox", "aria-expanded": !0, "aria-controls": u.listId, "aria-labelledby": u.labelId, "aria-activedescendant": i, id: u.inputId, type: "text", value: o ? e.value : s, onChange: (d) => {
    o || a.setState("search", d.target.value), r?.(d.target.value);
  } });
}), ia = c.forwardRef((e, t) => {
  let { children: r, label: n = "Suggestions", ...o } = e, a = c.useRef(null), s = c.useRef(null), i = ee((d) => d.selectedItemId), u = Ne();
  return c.useEffect(() => {
    if (s.current && a.current) {
      let d = s.current, p = a.current, v, m = new ResizeObserver(() => {
        v = requestAnimationFrame(() => {
          let b = d.offsetHeight;
          p.style.setProperty("--cmdk-list-height", b.toFixed(1) + "px");
        });
      });
      return m.observe(d), () => {
        cancelAnimationFrame(v), m.unobserve(d);
      };
    }
  }, []), c.createElement(te.div, { ref: J(a, t), ...o, "cmdk-list": "", role: "listbox", tabIndex: -1, "aria-activedescendant": i, "aria-label": n, id: u.listId }, _e(e, (d) => c.createElement("div", { ref: J(s, u.listInnerRef), "cmdk-list-sizer": "" }, d)));
}), la = c.forwardRef((e, t) => {
  let { open: r, onOpenChange: n, overlayClassName: o, contentClassName: a, container: s, ...i } = e;
  return c.createElement(jo, { open: r, onOpenChange: n }, c.createElement(Uo, { container: s }, c.createElement(Ho, { "cmdk-overlay": "", className: o }), c.createElement(Ko, { "aria-label": e.label, "cmdk-dialog": "", className: a }, c.createElement(vr, { ref: t, ...i }))));
}), sa = c.forwardRef((e, t) => ee((r) => r.filtered.count === 0) ? c.createElement(te.div, { ref: t, ...e, "cmdk-empty": "", role: "presentation" }) : null), ca = c.forwardRef((e, t) => {
  let { progress: r, children: n, label: o = "Loading...", ...a } = e;
  return c.createElement(te.div, { ref: t, ...a, "cmdk-loading": "", role: "progressbar", "aria-valuenow": r, "aria-valuemin": 0, "aria-valuemax": 100, "aria-label": o }, _e(e, (s) => c.createElement("div", { "aria-hidden": !0 }, s)));
}), ce = Object.assign(vr, { List: ia, Item: ra, Input: aa, Group: na, Separator: oa, Dialog: la, Empty: sa, Loading: ca });
function da(e, t) {
  let r = e.nextElementSibling;
  for (; r; ) {
    if (r.matches(t)) return r;
    r = r.nextElementSibling;
  }
}
function ua(e, t) {
  let r = e.previousElementSibling;
  for (; r; ) {
    if (r.matches(t)) return r;
    r = r.previousElementSibling;
  }
}
function hr(e) {
  let t = c.useRef(e);
  return oe(() => {
    t.current = e;
  }), t;
}
var oe = typeof window > "u" ? c.useEffect : c.useLayoutEffect;
function ue(e) {
  let t = c.useRef();
  return t.current === void 0 && (t.current = e()), t;
}
function ee(e) {
  let t = ot(), r = () => e(t.snapshot());
  return c.useSyncExternalStore(t.subscribe, r, r);
}
function br(e, t, r, n = []) {
  let o = c.useRef(), a = Ne();
  return oe(() => {
    var s;
    let i = (() => {
      var d;
      for (let p of r) {
        if (typeof p == "string") return p.trim();
        if (typeof p == "object" && "current" in p) return p.current ? (d = p.current.textContent) == null ? void 0 : d.trim() : o.current;
      }
    })(), u = n.map((d) => d.trim());
    a.value(e, i, u), (s = t.current) == null || s.setAttribute(de, i), o.current = i;
  }), o;
}
var fa = () => {
  let [e, t] = c.useState(), r = ue(() => /* @__PURE__ */ new Map());
  return oe(() => {
    r.current.forEach((n) => n()), r.current = /* @__PURE__ */ new Map();
  }, [e]), (n, o) => {
    r.current.set(n, o), t({});
  };
};
function pa(e) {
  let t = e.type;
  return typeof t == "function" ? t(e.props) : "render" in t ? t.render(e.props) : e;
}
function _e({ asChild: e, children: t }, r) {
  return e && c.isValidElement(t) ? c.cloneElement(pa(t), { ref: t.ref }, r(t.props.children)) : r(t);
}
var ma = { position: "absolute", width: "1px", height: "1px", padding: "0", margin: "-1px", overflow: "hidden", clip: "rect(0, 0, 0, 0)", whiteSpace: "nowrap", borderWidth: "0" };
const gr = yr(null);
function at() {
  const e = wr(gr);
  if (!e)
    throw new Error(
      "useCommandPalette must be used inside a <CommandPaletteProvider>."
    );
  return e;
}
function wi() {
  const { open: e, close: t, toggle: r, isOpen: n, query: o } = at();
  return { open: e, close: t, toggle: r, isOpen: n, query: o };
}
function Ni({
  commands: e,
  getDynamicCommands: t,
  children: r
}) {
  const [n, o] = U(!1), [a, s] = U(""), i = Y(() => o(!0), []), u = Y(() => {
    o(!1), s("");
  }, []), d = Y(() => o((m) => !m), []);
  K(() => {
    const m = (b) => {
      (b.metaKey || b.ctrlKey) && b.key.toLowerCase() === "k" && (b.preventDefault(), o((w) => !w));
    };
    return window.addEventListener("keydown", m, !0), () => window.removeEventListener("keydown", m, !0);
  }, []);
  const p = re(() => {
    const m = t ? t(a) : [];
    return [...e, ...m].filter((w) => w.when ? w.when() : !0);
  }, [e, t, a]), v = {
    open: i,
    close: u,
    toggle: d,
    isOpen: n,
    query: a,
    setQuery: s,
    mergedCommands: p
  };
  return /* @__PURE__ */ l(gr.Provider, { value: v, children: r });
}
function va(e) {
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
function Ei({
  placeholder: e = "Type a command or search…",
  emptyState: t,
  className: r
} = {}) {
  const { isOpen: n, close: o, query: a, setQuery: s, mergedCommands: i } = at(), u = re(() => va(i), [i]), d = Y(
    (p) => {
      o(), Promise.resolve().then(() => p.run());
    },
    [o]
  );
  return /* @__PURE__ */ l(
    Sr,
    {
      open: n,
      onClose: o,
      maxWidth: 640,
      rawChildren: !0,
      backdropTestId: "command-palette-backdrop",
      children: /* @__PURE__ */ h(
        ce,
        {
          label: "Command palette",
          value: void 0,
          className: x("flex flex-col gap-0 w-full", r),
          "data-testid": "command-palette",
          children: [
            /* @__PURE__ */ l(
              ce.Input,
              {
                value: a,
                onValueChange: s,
                placeholder: e,
                "data-autofocus": !0,
                className: x(
                  "w-full px-3 py-2.5 text-sm border-0 border-b border-border",
                  "outline-none bg-transparent text-text-primary placeholder:text-text-tertiary"
                ),
                "data-testid": "command-palette-input"
              }
            ),
            /* @__PURE__ */ h(ce.List, { className: "max-h-[360px] overflow-y-auto py-2", children: [
              /* @__PURE__ */ l(ce.Empty, { className: "px-3 py-6 text-center text-sm text-text-tertiary", children: t ?? "No results." }),
              u.map(({ groupName: p, items: v }) => /* @__PURE__ */ l(
                ce.Group,
                {
                  heading: p ?? void 0,
                  children: v.map((m) => /* @__PURE__ */ h(
                    ce.Item,
                    {
                      value: `${m.id} ${m.label} ${(m.keywords ?? []).join(" ")}`,
                      keywords: m.keywords,
                      onSelect: () => d(m),
                      "data-testid": `command-palette-item-${m.id}`,
                      className: x(
                        "flex items-center gap-2 px-3 py-2 mx-1 rounded-md cursor-pointer text-sm",
                        "text-text-primary aria-selected:bg-surface-hover"
                      ),
                      children: [
                        m.icon && /* @__PURE__ */ l("span", { className: "shrink-0 text-text-secondary", children: m.icon }),
                        /* @__PURE__ */ l("span", { className: "flex-1 truncate", children: m.label }),
                        m.hint && /* @__PURE__ */ l("span", { className: "text-xs text-text-tertiary truncate", children: m.hint }),
                        m.shortcut && m.shortcut.length > 0 && /* @__PURE__ */ l("span", { className: "flex items-center gap-1 shrink-0", children: m.shortcut.map((b, w) => /* @__PURE__ */ l(
                          "kbd",
                          {
                            className: x(
                              "inline-flex items-center justify-center min-w-[18px] h-[18px] px-1",
                              "text-[10px] font-mono font-medium",
                              "bg-surface-hover text-text-secondary",
                              "border border-border rounded"
                            ),
                            children: b
                          },
                          `${m.id}-kbd-${w}`
                        )) })
                      ]
                    },
                    m.id
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
function Ci({ className: e } = {}) {
  const { toggle: t } = at();
  return /* @__PURE__ */ h(
    "button",
    {
      type: "button",
      onClick: t,
      "data-testid": "command-palette-hint",
      className: x(
        "inline-flex items-center gap-1.5 px-2 py-1 rounded-md",
        "text-xs text-text-secondary bg-surface-hover",
        "border border-border hover:bg-surface-panel",
        "cursor-pointer transition-colors",
        e
      ),
      "aria-label": "Open command palette",
      children: [
        /* @__PURE__ */ l("kbd", { className: "font-mono text-[11px]", children: "⌘K" }),
        /* @__PURE__ */ l("span", { children: "Search" })
      ]
    }
  );
}
function qe(e) {
  if (e === "right") return "text-right";
  if (e === "center") return "text-center";
}
function Si({
  data: e,
  columns: t,
  keyField: r,
  onRowClick: n,
  rowActions: o,
  searchable: a = !1,
  searchPlaceholder: s = "Search…",
  pageSize: i,
  emptyMessage: u = "No records.",
  loading: d = !1,
  loadingRows: p = 5,
  className: v,
  "data-testid": m
}) {
  const [b, w] = U(null), [f, y] = U("asc"), [N, P] = U(""), [E, C] = U(0), T = (R) => {
    b === R ? y((M) => M === "asc" ? "desc" : "asc") : (w(R), y("asc"));
  }, D = re(() => {
    if (!a || N.trim() === "") return e;
    const R = N.trim().toLowerCase();
    return e.filter(
      (M) => t.some((I) => I.filterable === !1 ? !1 : (I.getFilterText ? I.getFilterText(M) : String(M[I.key] ?? "")).toLowerCase().includes(R))
    );
  }, [e, t, N, a]), S = re(() => {
    if (!b) return D;
    const R = t.find((W) => W.key === b);
    if (!R || !R.sortable) return D;
    const M = R.compare ?? ((W, G) => {
      const me = String(W[R.key] ?? ""), ve = String(G[R.key] ?? "");
      return me.localeCompare(ve);
    }), I = [...D];
    return I.sort((W, G) => f === "asc" ? M(W, G) : -M(W, G)), I;
  }, [D, t, b, f]), _ = i && i > 0 ? Math.max(1, Math.ceil(S.length / i)) : 1, F = Math.min(E, _ - 1), H = re(() => {
    if (!i || i <= 0) return S;
    const R = F * i;
    return S.slice(R, R + i);
  }, [S, i, F]);
  return /* @__PURE__ */ h("div", { className: x("flex flex-col gap-3", v), "data-testid": m, children: [
    a && /* @__PURE__ */ l(
      "input",
      {
        type: "text",
        value: N,
        onChange: (R) => {
          P(R.target.value), C(0);
        },
        placeholder: s,
        "aria-label": "Search",
        "data-testid": "datatable-search",
        className: "w-full max-w-xs rounded-md border border-border-field bg-surface px-3 py-1.5 text-sm text-text-primary placeholder:text-text-tertiary focus:border-primary focus:outline-none"
      }
    ),
    /* @__PURE__ */ h(kr, { className: "border border-border rounded-lg overflow-hidden", children: [
      /* @__PURE__ */ l(Rr, { children: /* @__PURE__ */ h("tr", { children: [
        t.map((R) => {
          const M = R.sortable && b === R.key;
          return /* @__PURE__ */ l(
            dt,
            {
              sortable: R.sortable,
              sortDirection: M ? f : null,
              style: R.width ? { width: R.width } : void 0,
              className: x(qe(R.align), R.className),
              onClick: R.sortable ? () => T(R.key) : void 0,
              "data-testid": R.sortable ? `datatable-header-${R.key}` : void 0,
              children: R.header
            },
            R.key
          );
        }),
        o && /* @__PURE__ */ l(dt, { className: "text-right", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ l(Pr, { children: d ? Array.from({ length: p }).map((R, M) => /* @__PURE__ */ h(Fe, { "data-testid": "datatable-loading-row", children: [
        t.map((I) => /* @__PURE__ */ l(he, { className: qe(I.align), children: /* @__PURE__ */ l("div", { className: "h-4 w-3/4 animate-pulse rounded bg-slate-100" }) }, I.key)),
        o && /* @__PURE__ */ l(he, { className: "text-right", children: /* @__PURE__ */ l("div", { className: "ml-auto h-4 w-16 animate-pulse rounded bg-slate-100" }) })
      ] }, `skeleton-${M}`)) : H.length === 0 ? /* @__PURE__ */ l(Fe, { children: /* @__PURE__ */ l(
        he,
        {
          colSpan: t.length + (o ? 1 : 0),
          className: "text-center text-text-secondary py-8",
          children: u
        }
      ) }) : H.map((R, M) => /* @__PURE__ */ h(
        Fe,
        {
          clickable: !!n,
          onClick: n ? () => n(R) : void 0,
          children: [
            t.map((I) => /* @__PURE__ */ l(
              he,
              {
                className: x(qe(I.align), I.className),
                children: I.render ? I.render(R, M) : String(R[I.key] ?? "")
              },
              I.key
            )),
            o && /* @__PURE__ */ l(he, { className: "text-right", onClick: (I) => I.stopPropagation(), children: /* @__PURE__ */ l("div", { className: "flex items-center justify-end gap-2", children: o(R) }) })
          ]
        },
        r(R)
      )) })
    ] }),
    i && i > 0 && S.length > i && /* @__PURE__ */ h("div", { className: "flex items-center justify-between text-xs text-text-secondary", children: [
      /* @__PURE__ */ h("span", { "data-testid": "datatable-page-summary", children: [
        "Page ",
        F + 1,
        " of ",
        _,
        " · ",
        S.length,
        " total"
      ] }),
      /* @__PURE__ */ h("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ l(
          "button",
          {
            type: "button",
            onClick: () => C((R) => Math.max(0, R - 1)),
            disabled: F === 0,
            "data-testid": "datatable-prev",
            className: "rounded border border-border bg-surface px-2 py-1 text-xs text-text-primary disabled:cursor-not-allowed disabled:opacity-50 hover:bg-slate-50",
            children: "Prev"
          }
        ),
        /* @__PURE__ */ l(
          "button",
          {
            type: "button",
            onClick: () => C((R) => Math.min(_ - 1, R + 1)),
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
function ki({
  icon: e = "⚠️",
  title: t,
  body: r,
  description: n,
  actionLabel: o,
  onAction: a,
  action: s,
  testId: i = "error-state",
  actionTestId: u = "error-state-action"
}) {
  const d = n ?? r;
  return /* @__PURE__ */ h(
    "div",
    {
      role: "alert",
      "data-testid": i,
      className: x(
        "flex flex-col items-center justify-center min-h-[220px]",
        "text-text-secondary gap-2 p-8 font-[inherit]"
      ),
      children: [
        e && (typeof e == "string" ? /* @__PURE__ */ l("div", { className: "text-[52px] mb-2", "aria-hidden": !0, children: e }) : /* @__PURE__ */ l("div", { className: "mb-2", children: e })),
        /* @__PURE__ */ l("div", { className: "text-[17px] font-semibold text-[var(--color-state-error,#dc2626)]", children: t }),
        d && /* @__PURE__ */ l("div", { className: "text-[13px] text-center max-w-[340px] text-text-secondary leading-normal", children: d }),
        s ? /* @__PURE__ */ l("div", { className: "mt-2.5", children: s }) : o && a && /* @__PURE__ */ l(
          "button",
          {
            "data-testid": u,
            onClick: a,
            type: "button",
            className: x(
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
const ha = {
  sm: "w-[14px] h-[14px]",
  md: "w-[20px] h-[20px]",
  lg: "w-[28px] h-[28px]"
};
function ba({
  size: e = "md",
  color: t,
  className: r,
  style: n,
  "aria-label": o = "Loading",
  "data-testid": a
}) {
  const s = t ?? "var(--color-primary)";
  return /* @__PURE__ */ l(
    "div",
    {
      role: "status",
      "aria-label": o,
      "data-testid": a,
      className: x(
        "inline-block rounded-full border-2 border-transparent animate-spin",
        ha[e],
        r
      ),
      style: { borderTopColor: s, ...n }
    }
  );
}
function Ri({
  label: e = "Loading…",
  description: t,
  spinnerSize: r = "lg",
  spinnerColor: n,
  testId: o = "loading-state"
}) {
  return /* @__PURE__ */ h(
    "div",
    {
      role: "status",
      "aria-live": "polite",
      "data-testid": o,
      className: x(
        "flex flex-col items-center justify-center min-h-[220px]",
        "text-text-secondary gap-3 p-8 font-[inherit]"
      ),
      children: [
        /* @__PURE__ */ l(ba, { size: r, color: n, "aria-label": e }),
        /* @__PURE__ */ l("div", { className: "text-[15px] font-medium text-text-primary", children: e }),
        t && /* @__PURE__ */ l("div", { className: "text-[13px] text-center max-w-[340px] text-text-secondary leading-normal", children: t })
      ]
    }
  );
}
function Pi({
  label: e,
  hint: t,
  error: r,
  required: n = !1,
  layout: o = "stacked",
  children: a,
  className: s,
  style: i,
  "data-testid": u
}) {
  const d = Ot(), p = `${d}-label`, v = t || r ? `${d}-desc` : void 0, m = {
    id: d,
    labelId: p,
    "aria-describedby": v,
    "aria-invalid": r ? !0 : void 0
  };
  return /* @__PURE__ */ h(
    "div",
    {
      "data-testid": u,
      className: x(
        o === "inline" ? "flex items-center gap-3" : "flex flex-col gap-1",
        s
      ),
      style: i,
      children: [
        /* @__PURE__ */ h(
          "label",
          {
            id: p,
            htmlFor: d,
            className: x(
              "text-[12px] font-medium",
              o === "inline" ? "min-w-[140px]" : "",
              r ? "text-[#991b1b]" : "text-gray-700"
            ),
            children: [
              e,
              n && /* @__PURE__ */ l("span", { className: "ml-0.5 text-[#991b1b]", children: "*" })
            ]
          }
        ),
        /* @__PURE__ */ h("div", { className: x(o === "inline" ? "flex-1" : ""), children: [
          a(m),
          (t || r) && /* @__PURE__ */ l(
            "div",
            {
              id: v,
              className: x(
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
const ga = {
  sm: "px-2.5 py-1 text-xs",
  md: "px-3 py-1.5 text-sm"
};
function xa(e) {
  switch (e) {
    case "underline":
      return "inline-flex items-center gap-1 border-b border-[var(--color-border)]";
    case "pill":
      return "inline-flex items-center gap-1";
    case "segmented":
      return "inline-flex items-center rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-inset,#f8fafc)] p-0.5 gap-0.5";
  }
}
function ya(e, t, r) {
  return e === "underline" ? x(
    "-mb-px border-b-2 rounded-none",
    t ? "border-[var(--color-primary)] text-[var(--color-text-primary)]" : "border-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]",
    r && "opacity-50 cursor-not-allowed hover:text-[var(--color-text-secondary)]"
  ) : e === "pill" ? x(
    "rounded-full",
    t ? "bg-[var(--color-primary)] text-white" : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text-primary)]",
    r && "opacity-50 cursor-not-allowed hover:bg-transparent"
  ) : x(
    "rounded-md",
    t ? "bg-white shadow-sm text-[var(--color-text-primary)] border border-[var(--color-border)]" : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]",
    r && "opacity-50 cursor-not-allowed hover:bg-transparent"
  );
}
function Ai({
  items: e,
  value: t,
  onValueChange: r,
  variant: n = "underline",
  size: o = "md",
  className: a,
  style: s,
  "aria-label": i,
  idPrefix: u
}) {
  const d = Ot(), p = u ?? d, v = pe(/* @__PURE__ */ new Map()), m = re(() => e.filter((f) => !f.disabled).map((f) => f.id), [e]), b = Y((f) => {
    v.current.get(f)?.focus();
  }, []), w = Y(
    (f, y) => {
      if (m.length === 0) return;
      const N = m.indexOf(y);
      let P = null;
      switch (f.key) {
        case "ArrowRight":
        case "ArrowDown":
          P = N === -1 ? 0 : (N + 1) % m.length;
          break;
        case "ArrowLeft":
        case "ArrowUp":
          P = N === -1 ? m.length - 1 : (N - 1 + m.length) % m.length;
          break;
        case "Home":
          P = 0;
          break;
        case "End":
          P = m.length - 1;
          break;
        case "Enter":
        case " ":
          f.preventDefault(), r(y);
          return;
        default:
          return;
      }
      if (P !== null) {
        f.preventDefault();
        const E = m[P];
        r(E), b(E);
      }
    },
    [m, r, b]
  );
  return /* @__PURE__ */ l(
    "div",
    {
      role: "tablist",
      "aria-label": i,
      className: x(xa(n), a),
      style: s,
      children: e.map((f) => {
        const y = f.id === t;
        return /* @__PURE__ */ h(
          "button",
          {
            ref: (N) => {
              N ? v.current.set(f.id, N) : v.current.delete(f.id);
            },
            type: "button",
            role: "tab",
            id: `${p}-tab-${f.id}`,
            "aria-controls": `${p}-panel-${f.id}`,
            "aria-selected": y,
            "aria-disabled": f.disabled || void 0,
            tabIndex: y ? 0 : -1,
            disabled: f.disabled,
            onClick: () => !f.disabled && r(f.id),
            onKeyDown: (N) => w(N, f.id),
            className: x(
              "inline-flex items-center gap-1.5 font-medium transition-colors cursor-pointer",
              ga[o],
              ya(n, y, !!f.disabled)
            ),
            children: [
              f.icon,
              /* @__PURE__ */ l("span", { children: f.label }),
              f.badge !== void 0 && f.badge !== null && /* @__PURE__ */ l(
                "span",
                {
                  className: x(
                    "ml-1 inline-flex items-center justify-center rounded-full px-1.5 min-w-[20px] text-[10px] font-semibold",
                    y && n === "pill" ? "bg-white/20 text-white" : "bg-[var(--color-surface-hover)] text-[var(--color-text-secondary)]"
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
function Di({ id: e, when: t, idPrefix: r, className: n, style: o, children: a }) {
  return e !== t ? null : /* @__PURE__ */ l(
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
const wa = {
  positive: "text-[var(--color-success)]",
  negative: "text-[var(--color-danger)]",
  neutral: "text-[var(--color-text-secondary)]"
};
function Na(e) {
  return e.tone ?? (e.direction === "up" ? "positive" : "negative");
}
function Ti({
  label: e,
  value: t,
  accent: r = !1,
  danger: n = !1,
  hint: o,
  delta: a,
  sparklineData: s,
  to: i,
  as: u,
  onClick: d,
  mono: p = !1,
  className: v,
  style: m,
  "data-testid": b
}) {
  const w = x(
    "block rounded-lg border p-3 no-underline transition-colors",
    !r && !n && "bg-[var(--color-surface)] border-[var(--color-border)]",
    r && "bg-[var(--color-primary-soft)] border-l-[3px] border-l-[var(--color-primary)] border-[var(--color-border)]",
    n && "bg-[var(--color-danger-bg)] border-l-[3px] border-l-[var(--color-danger)] border-[var(--color-border)]",
    (i || d) && "hover:bg-[var(--color-surface-hover)] cursor-pointer",
    v
  ), f = s && s.length > 0 ? s : null;
  let y = null;
  if (a) {
    const P = Na(a), E = a.direction === "up" ? "▲" : "▼", C = a.direction === "up" ? "+" : "-", T = a.suffix ?? "%", D = Math.abs(a.value), S = a["aria-label"] ?? `${a.direction} ${D}${T}`;
    y = /* @__PURE__ */ h(
      "div",
      {
        "data-testid": "stat-card-delta",
        "data-direction": a.direction,
        "data-tone": P,
        "aria-label": S,
        className: x("mt-1 text-[12px] font-medium leading-tight", wa[P]),
        children: [
          /* @__PURE__ */ h("span", { "aria-hidden": "true", children: [
            E,
            " "
          ] }),
          C,
          D,
          T
        ]
      }
    );
  }
  const N = /* @__PURE__ */ h(Q, { children: [
    /* @__PURE__ */ l("div", { className: "text-[12px] uppercase tracking-wide text-[var(--color-text-tertiary)]", children: e }),
    /* @__PURE__ */ h("div", { className: "mt-1 flex items-center gap-2", children: [
      /* @__PURE__ */ l(
        "div",
        {
          className: x(
            "text-[24px] font-bold leading-tight text-[var(--color-text-primary)]",
            p && "font-mono"
          ),
          children: t
        }
      ),
      f && /* @__PURE__ */ l(Ar, { data: f, width: 80, height: 20 })
    ] }),
    y,
    o != null && /* @__PURE__ */ l("div", { className: "mt-1 text-[11px] italic text-[var(--color-text-tertiary)]", children: o })
  ] });
  return i ? u ? /* @__PURE__ */ l(u, { to: i, "data-testid": b, className: w, style: m, children: N }) : /* @__PURE__ */ l("a", { href: i, "data-testid": b, className: w, style: m, children: N }) : d ? /* @__PURE__ */ l(
    "button",
    {
      type: "button",
      onClick: d,
      "data-testid": b,
      className: x(w, "w-full text-left"),
      style: m,
      children: N
    }
  ) : /* @__PURE__ */ l("div", { "data-testid": b, className: w, style: m, children: N });
}
const Ea = {
  1: "sm:grid-cols-1",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-4"
};
function Oi({
  children: e,
  columns: t = 4,
  dense: r = !1,
  className: n,
  style: o,
  "data-testid": a = "kpi-grid"
}) {
  return /* @__PURE__ */ l(
    "div",
    {
      "data-testid": a,
      className: x(
        "grid grid-cols-1",
        Ea[t],
        r ? "gap-2" : "gap-4",
        n
      ),
      style: o,
      children: e
    }
  );
}
const Ca = {
  sm: "h-1.5",
  md: "h-2"
};
function Li({
  value: e,
  max: t = 100,
  color: r,
  size: n = "md",
  label: o,
  showRatio: a = !0,
  className: s,
  style: i,
  "data-testid": u,
  "aria-label": d
}) {
  const p = t > 0 ? t : 100, v = Math.max(0, Math.min(e, p)), m = Math.min(100, v / p * 100), b = r ?? "var(--color-primary)";
  return /* @__PURE__ */ h("div", { "data-testid": u, className: x("w-full", s), style: i, children: [
    o != null && /* @__PURE__ */ h("div", { className: "flex items-center justify-between mb-1 text-[12px] text-[var(--color-text-secondary)]", children: [
      /* @__PURE__ */ l("span", { children: o }),
      /* @__PURE__ */ l("span", { className: "text-[var(--color-text-tertiary)] tabular-nums", children: a ? `${v}/${p}` : `${Math.round(m)}%` })
    ] }),
    /* @__PURE__ */ l(
      "div",
      {
        role: "progressbar",
        "aria-valuenow": v,
        "aria-valuemin": 0,
        "aria-valuemax": p,
        "aria-label": d,
        className: x(
          "w-full rounded-full overflow-hidden bg-[var(--color-surface-hover)]",
          Ca[n]
        ),
        children: /* @__PURE__ */ l(
          "div",
          {
            className: "h-full rounded-full transition-all duration-300",
            style: { width: `${m}%`, background: b }
          }
        )
      }
    )
  ] });
}
const Sa = {
  online: "var(--color-success, #22c55e)",
  away: "var(--color-state-pending, #f59e0b)",
  busy: "var(--color-state-error, #ef4444)",
  offline: "var(--color-text-tertiary, #94a3b8)",
  unknown: "var(--color-text-tertiary, #94a3b8)"
}, ka = {
  online: "Online",
  away: "Away",
  busy: "Busy",
  offline: "Offline",
  unknown: "Unknown presence"
};
function Ra({
  state: e,
  ariaLabel: t,
  label: r,
  pulse: n,
  size: o = "sm",
  className: a,
  style: s,
  title: i,
  "data-testid": u
}) {
  const d = n ?? e === "online", p = t ?? ka[e];
  return /* @__PURE__ */ l(
    $t,
    {
      color: Sa[e],
      pulse: d,
      size: o,
      label: r,
      className: a,
      style: s,
      title: i,
      "data-testid": u ?? `presence-${e}`,
      "aria-label": p
    }
  );
}
function $i({
  name: e,
  label: t,
  avatarSize: r = 20,
  avatarColor: n,
  presence: o,
  onClick: a,
  className: s,
  style: i,
  title: u,
  "data-testid": d = "user-chip"
}) {
  return /* @__PURE__ */ h(
    a ? "button" : "span",
    {
      type: a ? "button" : void 0,
      onClick: a,
      title: u ?? e,
      "data-testid": d,
      className: x(
        "inline-flex items-center gap-1.5 rounded-full px-1.5 py-0.5 text-[12px] text-text-primary",
        a && "hover:bg-slate-100 cursor-pointer transition-colors",
        !a && "cursor-default",
        s
      ),
      style: i,
      children: [
        /* @__PURE__ */ l(et, { name: e, size: r, color: n }),
        /* @__PURE__ */ l("span", { className: "font-medium leading-none", children: t ?? e }),
        o && /* @__PURE__ */ l(Ra, { state: o, size: "xs" })
      ]
    }
  );
}
const Pa = {
  sm: "px-2.5 py-0.5 text-[11px]",
  xs: "px-2 py-px text-[10px]"
}, Aa = "bg-[var(--color-surface)] border-[var(--color-border)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] hover:border-[var(--color-border-emphasis)]", Da = "bg-[var(--color-primary)] border-[var(--color-primary)] text-white hover:opacity-90", Ta = "border-[var(--color-border-emphasis)] text-[var(--color-text-primary)]";
function Ii({
  active: e,
  onClick: t,
  color: r,
  dot: n = !1,
  size: o = "sm",
  children: a,
  className: s,
  disabled: i = !1
}) {
  const u = e && !!r, d = u ? { background: `${r}22`, borderColor: `${r}66`, color: r } : void 0;
  return /* @__PURE__ */ h(
    "button",
    {
      type: "button",
      onClick: t,
      disabled: i,
      "aria-pressed": e,
      className: x(
        "inline-flex items-center gap-1.5 rounded-full font-semibold border transition-colors cursor-pointer select-none",
        Pa[o],
        e ? u ? Ta : Da : Aa,
        i && "opacity-50 cursor-not-allowed",
        s
      ),
      style: d,
      children: [
        n && /* @__PURE__ */ l(
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
const Oa = {
  sm: "px-2.5 py-1 text-xs",
  md: "px-3 py-1.5 text-sm"
}, La = "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]", $a = "bg-white shadow-sm text-[var(--color-text-primary)] border border-[var(--color-border)]";
function Mi({
  options: e,
  value: t,
  onChange: r,
  size: n = "md",
  className: o
}) {
  return /* @__PURE__ */ l(
    "div",
    {
      role: "group",
      className: x(
        "inline-flex items-center rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-inset,#f8fafc)] p-0.5 gap-0.5",
        o
      ),
      children: e.map((a) => {
        const s = a.value === t;
        return /* @__PURE__ */ h(
          "button",
          {
            type: "button",
            onClick: () => r(a.value),
            "aria-pressed": s,
            className: x(
              "inline-flex items-center gap-1.5 rounded-md font-medium transition-all cursor-pointer",
              Oa[n],
              s ? $a : La
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
function _i({
  label: e,
  id: t,
  href: r,
  mono: n = !1,
  className: o,
  labelClassName: a
}) {
  const s = /* @__PURE__ */ l("span", { className: "truncate", children: e });
  return /* @__PURE__ */ h("div", { className: x("flex flex-col min-w-0", o), children: [
    /* @__PURE__ */ l(
      "div",
      {
        className: x(
          "font-medium text-[var(--color-text-primary)] truncate text-sm",
          a
        ),
        children: r ? /* @__PURE__ */ l(
          "a",
          {
            href: r,
            className: "hover:text-[var(--color-primary)] hover:underline",
            children: s
          }
        ) : s
      }
    ),
    t && /* @__PURE__ */ l(
      "div",
      {
        className: x(
          "text-[10px] font-mono text-[var(--color-text-tertiary)] truncate mt-0.5",
          n && "tracking-tight"
        ),
        children: t
      }
    )
  ] });
}
const Ia = [
  "a[href]",
  "button:not([disabled])",
  'input:not([disabled]):not([type="hidden"])',
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
  '[contenteditable="true"]'
].join(",");
function Fi({
  open: e,
  onClose: t,
  title: r,
  subtitle: n,
  width: o = 460,
  children: a,
  footer: s,
  "data-testid": i
}) {
  const u = pe(null);
  return K(() => {
    if (!e) return;
    const d = (p) => {
      p.key === "Escape" && t();
    };
    return window.addEventListener("keydown", d), () => window.removeEventListener("keydown", d);
  }, [e, t]), K(() => {
    if (!e) return;
    const d = u.current;
    if (!d) return;
    const p = d.querySelector(Ia);
    p ? p.focus() : (d.setAttribute("tabindex", "-1"), d.focus());
  }, [e]), e ? Lt(
    /* @__PURE__ */ h("div", { className: "fixed inset-0 z-[9000]", "data-testid": i, children: [
      /* @__PURE__ */ l(
        "div",
        {
          className: "absolute inset-0 bg-black/30 backdrop-blur-[1px]",
          onClick: t,
          "aria-hidden": "true"
        }
      ),
      /* @__PURE__ */ h(
        "aside",
        {
          ref: u,
          role: "dialog",
          "aria-modal": "true",
          "aria-label": r,
          className: x(
            "absolute right-0 top-0 h-full bg-white shadow-xl flex flex-col",
            "transition-transform duration-200",
            e ? "translate-x-0" : "translate-x-full"
          ),
          style: { width: o },
          children: [
            /* @__PURE__ */ h("div", { className: "flex items-start justify-between p-5 border-b border-[var(--color-border)] flex-shrink-0", children: [
              /* @__PURE__ */ h("div", { className: "min-w-0", children: [
                r && /* @__PURE__ */ l("h2", { className: "text-base font-semibold text-[var(--color-text-primary)]", children: r }),
                n && /* @__PURE__ */ l("p", { className: "text-sm text-[var(--color-text-secondary)] mt-0.5", children: n })
              ] }),
              /* @__PURE__ */ l(
                "button",
                {
                  type: "button",
                  onClick: t,
                  className: "ml-4 flex-shrink-0 p-1 rounded hover:bg-[var(--color-surface-hover)] text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition-colors",
                  "aria-label": "Close",
                  children: /* @__PURE__ */ l("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", children: /* @__PURE__ */ l(
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
            /* @__PURE__ */ l("div", { className: "flex-1 overflow-y-auto p-5", children: a }),
            s && /* @__PURE__ */ l("div", { className: "flex-shrink-0 border-t border-[var(--color-border)] p-4 bg-[var(--color-surface-inset,#f8fafc)]", children: s })
          ]
        }
      )
    ] }),
    document.body
  ) : null;
}
function Ma(e, t) {
  if (!e || typeof window > "u") return t;
  try {
    const r = window.localStorage.getItem(e);
    return r === null ? t : r === "true";
  } catch {
    return t;
  }
}
function Bi({
  title: e,
  defaultOpen: t = !1,
  badge: r,
  children: n,
  className: o,
  storageKey: a
}) {
  const [s, i] = U(
    () => Ma(a, t)
  );
  return K(() => {
    if (a && !(typeof window > "u"))
      try {
        window.localStorage.setItem(a, String(s));
      } catch {
      }
  }, [s, a]), /* @__PURE__ */ h(
    "div",
    {
      className: x(
        "border border-[var(--color-border)] rounded-lg overflow-hidden",
        o
      ),
      children: [
        /* @__PURE__ */ h(
          "button",
          {
            type: "button",
            className: "w-full flex items-center justify-between px-4 py-3 bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] transition-colors text-left",
            onClick: () => i((u) => !u),
            "aria-expanded": s,
            children: [
              /* @__PURE__ */ l("span", { className: "text-sm font-semibold text-[var(--color-text-primary)]", children: e }),
              /* @__PURE__ */ h("div", { className: "flex items-center gap-2", children: [
                r,
                /* @__PURE__ */ l(
                  "svg",
                  {
                    className: x(
                      "w-4 h-4 text-[var(--color-text-tertiary)] transition-transform",
                      s && "rotate-180"
                    ),
                    viewBox: "0 0 16 16",
                    fill: "none",
                    "aria-hidden": "true",
                    children: /* @__PURE__ */ l(
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
        s && /* @__PURE__ */ l("div", { className: "border-t border-[var(--color-border)] bg-white", children: n })
      ]
    }
  );
}
function Wi({
  value: e,
  onChange: t,
  placeholder: r,
  onClear: n,
  className: o,
  style: a,
  autoFocus: s,
  "aria-label": i
}) {
  return /* @__PURE__ */ h(
    "div",
    {
      className: x("relative inline-flex items-center", o),
      style: a,
      children: [
        /* @__PURE__ */ h(
          "svg",
          {
            className: "absolute left-3 w-3.5 h-3.5 text-[var(--color-text-tertiary)] pointer-events-none",
            viewBox: "0 0 16 16",
            fill: "none",
            "aria-hidden": "true",
            children: [
              /* @__PURE__ */ l(
                "circle",
                {
                  cx: "7",
                  cy: "7",
                  r: "4.5",
                  stroke: "currentColor",
                  strokeWidth: "1.5"
                }
              ),
              /* @__PURE__ */ l(
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
        /* @__PURE__ */ l(
          "input",
          {
            type: "text",
            value: e,
            onChange: (u) => t(u.target.value),
            placeholder: r ?? "Search…",
            autoFocus: s,
            "aria-label": i,
            className: "w-full pl-8 pr-7 py-1.5 text-sm rounded-md border border-[var(--color-border-field,#d1d5db)] bg-white text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] transition-colors"
          }
        ),
        e && /* @__PURE__ */ l(
          "button",
          {
            type: "button",
            onClick: () => {
              t(""), n?.();
            },
            className: "absolute right-2 p-0.5 rounded text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]",
            "aria-label": "Clear search",
            children: /* @__PURE__ */ l("svg", { width: "12", height: "12", viewBox: "0 0 12 12", fill: "none", children: /* @__PURE__ */ l(
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
const _a = {
  error: "bg-[var(--color-danger-bg,#fef2f2)] border-[var(--color-danger,#dc2626)] text-[var(--color-danger,#dc2626)]",
  success: "bg-[var(--color-success-bg,#f0fdf4)] border-[var(--color-success,#16a34a)] text-[var(--color-success,#16a34a)]",
  info: "bg-[var(--color-info-bg,#eff6ff)] border-[var(--color-info,#2563eb)] text-[var(--color-info,#2563eb)]",
  warning: "bg-[var(--color-warning-bg,#fffbeb)] border-[var(--color-warning,#f59e0b)] text-[var(--color-warning,#f59e0b)]"
};
function ji({ tone: e, children: t, onDismiss: r, className: n }) {
  return /* @__PURE__ */ h(
    "div",
    {
      role: e === "error" || e === "warning" ? "alert" : "status",
      "aria-live": e === "error" || e === "warning" ? "assertive" : "polite",
      className: x(
        "flex items-start gap-2 px-3 py-2 rounded-md border-l-[3px] text-sm",
        _a[e],
        n
      ),
      children: [
        /* @__PURE__ */ l("span", { className: "flex-1", children: t }),
        r && /* @__PURE__ */ l(
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
function Ui({
  title: e,
  description: t,
  actions: r,
  back: n,
  badge: o,
  className: a
}) {
  return /* @__PURE__ */ h("div", { className: x("flex flex-col gap-1.5", a), children: [
    n && /* @__PURE__ */ h(
      "a",
      {
        href: n.to,
        onClick: n.onClick,
        className: "inline-flex items-center gap-1 text-xs text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] mb-1 w-fit",
        children: [
          /* @__PURE__ */ l(
            "svg",
            {
              width: "12",
              height: "12",
              viewBox: "0 0 12 12",
              fill: "none",
              "aria-hidden": "true",
              children: /* @__PURE__ */ l(
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
    /* @__PURE__ */ h("div", { className: "flex items-center justify-between gap-4", children: [
      /* @__PURE__ */ h("div", { className: "min-w-0 flex items-center gap-2.5", children: [
        /* @__PURE__ */ l("h1", { className: "text-xl font-semibold text-[var(--color-text-primary)] leading-tight", children: e }),
        o
      ] }),
      r && /* @__PURE__ */ l("div", { className: "flex-shrink-0 flex items-center gap-2", children: r })
    ] }),
    t && /* @__PURE__ */ l("p", { className: "text-sm text-[var(--color-text-secondary)]", children: t })
  ] });
}
function Le({ size: e = "md", color: t, className: r }) {
  const n = e === "sm" ? 4 : 6, o = t || "var(--color-text-tertiary, #94a3b8)";
  return /* @__PURE__ */ h(Q, { children: [
    /* @__PURE__ */ l("style", { children: `
        @keyframes thinkDot {
          0%, 80%, 100% { transform: scale(1); opacity: 0.4; }
          40% { transform: scale(1.3); opacity: 1; }
        }
      ` }),
    /* @__PURE__ */ l("span", { className: x("inline-flex items-center gap-1", r), children: [0, 1, 2].map((a) => /* @__PURE__ */ l(
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
function Fa(e) {
  if (e.length === 0) return "";
  if (e.length === 1) return `${e[0]} is typing…`;
  if (e.length === 2) return `${e[0]} and ${e[1]} are typing…`;
  const t = e.length - 2;
  return `${e[0]}, ${e[1]} and ${t} other${t > 1 ? "s" : ""} are typing…`;
}
function Hi({
  names: e,
  compact: t = !1,
  color: r,
  size: n = "sm",
  className: o,
  "data-testid": a = "typing-indicator"
}) {
  return e.length === 0 ? null : /* @__PURE__ */ h(
    "span",
    {
      role: "status",
      "aria-live": "polite",
      "data-testid": a,
      className: x(
        "inline-flex items-center gap-1.5 text-[12px] text-text-tertiary",
        o
      ),
      children: [
        /* @__PURE__ */ l(Le, { size: n, color: r }),
        !t && /* @__PURE__ */ l("span", { children: Fa(e) })
      ]
    }
  );
}
const Ba = {
  idle: { label: "Idle", colorClass: "text-[#6b7280]" },
  connecting: { label: "Connecting…", colorClass: "text-[#f59e0b]" },
  connected: { label: "Connected", colorClass: "text-[#10b981]" },
  reconnecting: { label: "Reconnecting…", colorClass: "text-[#f59e0b]" },
  disconnected: { label: "Disconnected", colorClass: "text-[#ef4444]" }
};
function Ki({
  state: e,
  compact: t = !1,
  withLabel: r = !0,
  labels: n,
  className: o,
  "data-testid": a = "connection-pill"
}) {
  const s = Ba[e], i = n?.[e] ?? s.label, u = r && !t;
  return /* @__PURE__ */ h(
    "span",
    {
      role: "status",
      "aria-live": "polite",
      "aria-label": u ? void 0 : i,
      "data-testid": a,
      "data-state": e,
      className: x("inline-flex items-center gap-1.5 font-mono", o),
      children: [
        /* @__PURE__ */ l("span", { "aria-hidden": "true", className: s.colorClass, children: "⬤" }),
        u && /* @__PURE__ */ l("span", { className: x(s.colorClass, "font-semibold"), children: i })
      ]
    }
  );
}
const Pt = {
  debug: "DEBUG",
  info: "INFO",
  warn: "WARN",
  error: "ERROR"
}, Wa = {
  debug: "text-[var(--color-text-tertiary)]",
  info: "text-[var(--color-info,#3b82f6)]",
  warn: "text-[var(--color-warning,#d97706)]",
  error: "text-[var(--color-danger,#dc2626)]"
};
function ja({
  lines: e,
  follow: t = !0,
  showTimestamp: r = !0,
  showLevel: n = !0,
  showSource: o = !0,
  title: a = "Log stream",
  headerSlot: s,
  emptyMessage: i = "No log lines yet.",
  maxHeight: u,
  onClear: d,
  className: p,
  style: v,
  "data-testid": m = "log-stream"
}) {
  const b = pe(null), [w, f] = U(!1);
  K(() => {
    if (!t || w) return;
    const E = b.current;
    E && (E.scrollTop = E.scrollHeight);
  }, [e, t, w]);
  const y = () => {
    const E = b.current;
    if (!E) return;
    const C = E.scrollHeight - E.scrollTop - E.clientHeight < 24;
    f(!C);
  }, N = () => {
    const E = b.current;
    E && (E.scrollTop = E.scrollHeight, f(!1));
  }, P = /* @__PURE__ */ h("div", { className: "flex items-center gap-2", children: [
    /* @__PURE__ */ h(
      "span",
      {
        className: "text-[10px] text-[var(--color-text-tertiary)]",
        "data-testid": `${m}-count`,
        children: [
          e.length,
          " ",
          e.length === 1 ? "line" : "lines"
        ]
      }
    ),
    d && /* @__PURE__ */ l(
      "button",
      {
        type: "button",
        onClick: d,
        "data-testid": `${m}-clear`,
        className: x(
          "text-[10px] uppercase tracking-wide",
          "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]",
          "border border-[var(--color-border)] rounded px-1.5 py-0.5",
          "cursor-pointer bg-transparent"
        ),
        children: "Clear"
      }
    )
  ] });
  return /* @__PURE__ */ h(
    Or,
    {
      "data-testid": m,
      className: x("flex flex-col", p),
      style: v,
      children: [
        a !== null && /* @__PURE__ */ l("div", { className: "px-4 py-3 border-b border-[var(--color-border)]", children: /* @__PURE__ */ l(Dr, { title: a, meta: s ?? P }) }),
        /* @__PURE__ */ h("div", { className: "relative flex-1 min-h-0 flex", children: [
          /* @__PURE__ */ l(
            "div",
            {
              ref: b,
              onScroll: y,
              role: "log",
              "aria-live": t ? "polite" : "off",
              "data-testid": `${m}-scroll`,
              className: x(
                "flex-1 overflow-y-auto",
                "font-mono text-[12px] leading-[1.55]",
                "bg-[var(--color-surface-subtle,#0b1020)] text-[var(--color-text-primary,#e5e7eb)]",
                "py-2"
              ),
              style: { maxHeight: u },
              children: e.length === 0 ? /* @__PURE__ */ l(
                "div",
                {
                  "data-testid": `${m}-empty`,
                  className: "px-3 py-6 text-center text-[11px] text-[var(--color-text-tertiary)]",
                  children: i
                }
              ) : e.map((E) => {
                const C = E.level ?? "info";
                return /* @__PURE__ */ h(
                  "div",
                  {
                    role: "listitem",
                    "data-testid": `${m}-line`,
                    "data-level": E.level || void 0,
                    className: "flex items-baseline gap-2 px-3 hover:bg-[var(--color-surface,rgba(255,255,255,0.04))]",
                    children: [
                      r && E.timestamp && /* @__PURE__ */ l("span", { className: "shrink-0 text-[var(--color-text-tertiary)] tabular-nums", children: E.timestamp }),
                      n && E.level && /* @__PURE__ */ l(
                        "span",
                        {
                          className: x(
                            "shrink-0 font-semibold uppercase text-[10px] w-[44px]",
                            Wa[C]
                          ),
                          "aria-label": `level ${Pt[C].toLowerCase()}`,
                          children: Pt[C]
                        }
                      ),
                      o && E.source && /* @__PURE__ */ h("span", { className: "shrink-0 text-[var(--color-text-secondary)]", children: [
                        "[",
                        E.source,
                        "]"
                      ] }),
                      /* @__PURE__ */ l("span", { className: "flex-1 whitespace-pre-wrap break-words", children: E.message })
                    ]
                  },
                  E.id
                );
              })
            }
          ),
          t && w && /* @__PURE__ */ l(
            "button",
            {
              type: "button",
              "data-testid": `${m}-jump`,
              onClick: N,
              className: x(
                "absolute bottom-3 left-1/2 -translate-x-1/2",
                "px-3 py-1 text-[10px] font-semibold uppercase tracking-wide",
                "bg-primary text-white rounded-full border-none cursor-pointer",
                "shadow-[0_2px_8px_rgba(0,0,0,0.25)]"
              ),
              children: "Jump to live ↓"
            }
          )
        ] })
      ]
    }
  );
}
const Vi = ja;
function Gi({
  title: e,
  description: t,
  category: r,
  categoryTone: n = "neutral",
  thumbnail: o,
  icon: a = "🧩",
  thumbnailHeight: s = 160,
  href: i,
  onClick: u,
  badge: d,
  meta: p,
  className: v,
  style: m,
  "data-testid": b = "thumbnail-card"
}) {
  const f = x(
    "group block w-full text-left bg-[var(--color-surface,#fff)]",
    "rounded-xl border border-[var(--color-border)] overflow-hidden",
    "transition-[box-shadow,transform] duration-150",
    (i || u) && "cursor-pointer hover:shadow-[0_8px_25px_rgba(0,0,0,0.08)] hover:-translate-y-0.5",
    v
  ), y = /* @__PURE__ */ h(Q, { children: [
    /* @__PURE__ */ h(
      "div",
      {
        "data-testid": `${b}-thumb`,
        className: x(
          "relative flex items-center justify-center",
          "bg-gradient-to-br from-[var(--color-primary-bg,#eef2ff)] to-[var(--color-surface,#ffffff)]",
          "border-b border-[var(--color-border)]"
        ),
        style: { height: s },
        children: [
          o ? /* @__PURE__ */ l(
            "img",
            {
              src: o,
              alt: "",
              className: "w-full h-full object-cover"
            }
          ) : /* @__PURE__ */ l("span", { className: "text-5xl opacity-50", "aria-hidden": !0, children: a }),
          d && /* @__PURE__ */ l(
            "span",
            {
              "data-testid": `${b}-badge`,
              className: "absolute top-2 right-2",
              children: d
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ h("div", { className: "px-4 py-3", children: [
      /* @__PURE__ */ h("div", { className: "flex items-center gap-2 mb-1.5", children: [
        r && /* @__PURE__ */ l(Lr, { tone: n, size: "xs", "data-testid": `${b}-category`, children: r }),
        p && /* @__PURE__ */ l("span", { className: "ml-auto", children: p })
      ] }),
      /* @__PURE__ */ l("div", { className: "text-[14px] font-semibold text-[var(--color-text-primary)] leading-snug", children: e }),
      t && /* @__PURE__ */ l("div", { className: "mt-1 text-[12px] text-[var(--color-text-secondary)] leading-snug", children: t })
    ] })
  ] });
  return i ? /* @__PURE__ */ l(
    "a",
    {
      href: i,
      onClick: u,
      "data-testid": b,
      className: x(f, "no-underline text-inherit"),
      style: m,
      children: y
    }
  ) : u ? /* @__PURE__ */ l(
    "button",
    {
      type: "button",
      onClick: u,
      "data-testid": b,
      className: x(f, "font-inherit"),
      style: m,
      children: y
    }
  ) : /* @__PURE__ */ l("div", { "data-testid": b, className: f, style: m, children: y });
}
const Ua = {
  1: "sm:grid-cols-1",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
  5: "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
};
function zi({
  children: e,
  columns: t = 3,
  dense: r = !1,
  className: n,
  style: o,
  "data-testid": a = "catalog-grid"
}) {
  return /* @__PURE__ */ l(
    "div",
    {
      "data-testid": a,
      "data-columns": t,
      className: x(
        "grid grid-cols-1",
        Ua[t],
        r ? "gap-3" : "gap-5",
        n
      ),
      style: o,
      children: e
    }
  );
}
const Ha = {
  neutral: "bg-slate-50",
  success: "bg-green-50",
  warning: "bg-amber-50",
  danger: "bg-red-50",
  info: "bg-blue-50",
  caution: "bg-orange-50",
  purple: "bg-purple-50"
}, Ka = {
  neutral: "border-slate-200",
  success: "border-green-300",
  warning: "border-amber-300",
  danger: "border-red-300",
  info: "border-blue-300",
  caution: "border-orange-300",
  purple: "border-purple-300"
}, Va = {
  neutral: "text-slate-800",
  success: "text-green-800",
  warning: "text-amber-800",
  danger: "text-red-800",
  info: "text-blue-800",
  caution: "text-orange-800",
  purple: "text-purple-800"
};
function Ga({
  orientation: e,
  variant: t
}) {
  if (t === "none") return null;
  const r = e === "vertical", n = t === "arrow" ? r ? "↓" : "→" : r ? "│" : "─";
  return /* @__PURE__ */ l(
    "div",
    {
      "data-testid": "stack-diagram-connector",
      "aria-hidden": !0,
      className: x(
        "flex items-center justify-center text-[var(--color-text-tertiary)]",
        r ? "h-5 text-base" : "w-5 text-base"
      ),
      children: n
    }
  );
}
function za({
  layers: e,
  orientation: t = "vertical",
  connector: r = "arrow",
  className: n,
  style: o,
  "data-testid": a = "stack-diagram"
}) {
  const s = t === "vertical";
  return /* @__PURE__ */ l(
    "div",
    {
      "data-testid": a,
      "data-orientation": t,
      "data-connector": r,
      className: x(
        "flex",
        s ? "flex-col items-stretch" : "flex-row items-stretch flex-wrap",
        n
      ),
      style: o,
      children: e.map((i, u) => {
        const d = i.tone ?? "neutral";
        return /* @__PURE__ */ h("div", { className: x("flex", "flex-col"), children: [
          /* @__PURE__ */ h(
            "div",
            {
              "data-testid": "stack-diagram-layer",
              "data-tone": d,
              className: x(
                "rounded-md border px-3 py-2",
                Ha[d],
                Ka[d],
                !s && "min-w-[140px]"
              ),
              children: [
                /* @__PURE__ */ h("div", { className: "flex items-center gap-2", children: [
                  i.icon != null && /* @__PURE__ */ l("span", { className: "shrink-0 text-[14px] leading-none", "aria-hidden": !0, children: i.icon }),
                  /* @__PURE__ */ l("span", { className: x("text-[12px] font-semibold", Va[d]), children: i.label }),
                  i.meta != null && /* @__PURE__ */ l("span", { className: "ml-auto text-[10px] text-[var(--color-text-tertiary)] shrink-0", children: i.meta })
                ] }),
                i.description != null && /* @__PURE__ */ l("div", { className: "mt-0.5 text-[11px] leading-snug text-[var(--color-text-secondary)]", children: i.description })
              ]
            }
          ),
          u < e.length - 1 && /* @__PURE__ */ l(Ga, { orientation: t, variant: r })
        ] }, i.id);
      })
    }
  );
}
const Yi = za;
function qi({
  value: e,
  onChange: t,
  onSubmit: r,
  disabled: n = !1,
  multiline: o = !1,
  placeholder: a,
  submitLabel: s = "→",
  className: i,
  style: u,
  autoFocus: d,
  maxRows: p = 4
}) {
  const v = !n && e.trim().length > 0, m = () => {
    v && r();
  }, b = (f) => {
    if (f.key === "Enter") {
      if (o && f.shiftKey) return;
      f.preventDefault(), m();
    }
  }, w = x(
    "flex-1 px-3 py-2 text-sm rounded-lg border border-[var(--color-border-field,#d1d5db)] bg-white text-[var(--color-text-primary)]",
    "placeholder:text-[var(--color-text-tertiary)]",
    "focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent",
    "resize-none",
    n && "opacity-50 cursor-not-allowed bg-[var(--color-surface-hover)]"
  );
  return /* @__PURE__ */ h(
    "div",
    {
      className: x(
        "flex items-end gap-2 p-3 border-t border-[var(--color-border)] bg-[var(--color-surface)]",
        i
      ),
      style: u,
      children: [
        o ? /* @__PURE__ */ l(
          "textarea",
          {
            className: w,
            value: e,
            onChange: (f) => t(f.target.value),
            onKeyDown: b,
            disabled: n,
            placeholder: a,
            autoFocus: d,
            rows: 2,
            style: { maxHeight: `${p * 1.5 + 1}rem`, overflowY: "auto" }
          }
        ) : /* @__PURE__ */ l(
          "input",
          {
            type: "text",
            className: w,
            value: e,
            onChange: (f) => t(f.target.value),
            onKeyDown: b,
            disabled: n,
            placeholder: a,
            autoFocus: d
          }
        ),
        /* @__PURE__ */ l(
          "button",
          {
            type: "button",
            onClick: m,
            disabled: !v,
            className: x(
              "px-3 py-2 rounded-lg text-sm font-semibold transition-colors flex-shrink-0",
              v ? "bg-[var(--color-primary)] text-white hover:opacity-90" : "bg-[var(--color-surface-hover)] text-[var(--color-text-tertiary)] cursor-not-allowed"
            ),
            children: s
          }
        )
      ]
    }
  );
}
function Ya({ name: e, done: t, className: r }) {
  return /* @__PURE__ */ h(
    "span",
    {
      className: x(
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
function qa({ toolCalls: e, className: t }) {
  return /* @__PURE__ */ l("div", { className: x("flex flex-wrap gap-1.5 py-1", t), children: e.map((r) => /* @__PURE__ */ l(Ya, { name: r.name, done: r.done }, r.id)) });
}
function Zi({
  role: e,
  content: t,
  toolCalls: r,
  streaming: n = !1,
  agentName: o,
  userName: a,
  renderMarkdown: s,
  className: i
}) {
  const u = e === "user" ? a || "You" : o || "Assistant";
  return /* @__PURE__ */ h("div", { className: x("flex flex-col gap-1.5 py-3", i), children: [
    /* @__PURE__ */ l("div", { className: "text-[11px] font-semibold uppercase tracking-wide text-[var(--color-text-tertiary)]", children: u }),
    r && r.length > 0 && /* @__PURE__ */ l(qa, { toolCalls: r }),
    e === "user" ? /* @__PURE__ */ l("div", { className: "text-sm text-[var(--color-text-primary)] whitespace-pre-wrap", children: t }) : /* @__PURE__ */ l("div", { className: "text-sm text-[var(--color-text-primary)] prose-sm max-w-none", children: t ? s ? s(t) : /* @__PURE__ */ l("span", { className: "whitespace-pre-wrap", children: t }) : n ? /* @__PURE__ */ l(Le, {}) : null })
  ] });
}
function Xi({
  content: e,
  streaming: t = !1,
  defaultOpen: r = !1,
  className: n
}) {
  const a = t || !e ? "Thinking" : "Thought";
  return /* @__PURE__ */ h(
    "details",
    {
      open: r,
      className: x(
        "rounded-md border border-[var(--color-border)] overflow-hidden text-sm group",
        n
      ),
      children: [
        /* @__PURE__ */ h("summary", { className: "flex items-center gap-2 px-3 py-2 cursor-pointer select-none bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] text-[var(--color-text-tertiary)] list-none", children: [
          /* @__PURE__ */ l(
            "svg",
            {
              className: "w-3.5 h-3.5 transition-transform group-open:rotate-90",
              xmlns: "http://www.w3.org/2000/svg",
              viewBox: "0 0 20 20",
              fill: "currentColor",
              "aria-hidden": "true",
              children: /* @__PURE__ */ l(
                "path",
                {
                  fillRule: "evenodd",
                  d: "M7.21 14.77a.75.75 0 010-1.06L10.94 10 7.21 6.29a.75.75 0 011.08-1.04l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.08-.04z",
                  clipRule: "evenodd"
                }
              )
            }
          ),
          /* @__PURE__ */ l("span", { className: "text-[11px] font-semibold uppercase tracking-wide", children: a }),
          t && !e && /* @__PURE__ */ l(Le, { size: "sm" })
        ] }),
        /* @__PURE__ */ l("div", { className: "px-3 py-2 text-xs text-[var(--color-text-secondary)] italic border-t border-[var(--color-border)] bg-white whitespace-pre-wrap leading-relaxed", children: e || /* @__PURE__ */ l(Le, {}) })
      ]
    }
  );
}
function Qi({
  prompts: e,
  onSelect: t,
  columns: r,
  title: n,
  className: o
}) {
  const a = r ? `repeat(${r}, minmax(0, 1fr))` : "repeat(auto-fit, minmax(220px, 1fr))";
  return /* @__PURE__ */ h("div", { className: x("flex flex-col gap-3", o), children: [
    n && /* @__PURE__ */ l("p", { className: "text-xs font-semibold uppercase tracking-wide text-[var(--color-text-tertiary)] text-center", children: n }),
    /* @__PURE__ */ l("div", { style: { display: "grid", gridTemplateColumns: a, gap: 10 }, children: e.map((s, i) => /* @__PURE__ */ h(
      "button",
      {
        type: "button",
        onClick: () => t(s.label),
        className: "flex flex-col gap-1 px-4 py-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] hover:border-[var(--color-border-emphasis,#cbd5e1)] text-left transition-colors",
        children: [
          /* @__PURE__ */ l("span", { className: "text-sm font-medium text-[var(--color-text-primary)]", children: s.label }),
          s.hint && /* @__PURE__ */ l("span", { className: "text-xs text-[var(--color-text-tertiary)]", children: s.hint })
        ]
      },
      i
    )) })
  ] });
}
function Ji({
  suggestions: e,
  onSelect: t,
  onRefresh: r,
  label: n,
  className: o
}) {
  return /* @__PURE__ */ h("div", { className: x("flex items-center flex-wrap gap-1.5 py-2", o), children: [
    n && /* @__PURE__ */ l("span", { className: "text-xs text-[var(--color-text-tertiary)] mr-1", children: n }),
    e.map((a, s) => /* @__PURE__ */ l(
      "button",
      {
        type: "button",
        onClick: () => t(a),
        className: "inline-flex items-center px-3 py-1 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-xs text-[var(--color-text-secondary)] hover:bg-[var(--color-primary)] hover:text-white hover:border-[var(--color-primary)] transition-colors",
        children: a
      },
      s
    )),
    r && /* @__PURE__ */ l(
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
function el({
  name: e,
  memberCount: t,
  description: r,
  actions: n,
  avatarUrl: o,
  online: a,
  onMembersClick: s,
  className: i
}) {
  return /* @__PURE__ */ h(
    "div",
    {
      className: x(
        "flex items-center justify-between gap-4 px-6 py-3",
        "border-b border-[var(--color-border)] bg-[var(--color-surface)]",
        i
      ),
      children: [
        /* @__PURE__ */ h("div", { className: "flex items-center gap-3 min-w-0", children: [
          /* @__PURE__ */ h("div", { className: "relative shrink-0", children: [
            o ? /* @__PURE__ */ l(
              "img",
              {
                src: o,
                alt: e,
                className: "w-9 h-9 rounded-full object-cover"
              }
            ) : /* @__PURE__ */ l(et, { name: e, size: 36 }),
            a !== void 0 && /* @__PURE__ */ l("span", { className: "absolute -bottom-0.5 -right-0.5", children: /* @__PURE__ */ l(
              $t,
              {
                color: a ? "#22c55e" : "#94a3b8",
                size: "sm",
                "aria-label": a ? "Online" : "Offline"
              }
            ) })
          ] }),
          /* @__PURE__ */ h("div", { className: "min-w-0 flex flex-col gap-0.5", children: [
            /* @__PURE__ */ h("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ l("h2", { className: "text-[15px] font-semibold text-[var(--color-text-primary)] leading-tight truncate", children: e }),
              t !== void 0 && /* @__PURE__ */ h(
                "button",
                {
                  type: "button",
                  onClick: s,
                  disabled: !s,
                  className: x(
                    "text-[11px] font-medium text-[var(--color-text-tertiary)]",
                    "bg-transparent border-none p-0 leading-none",
                    s && "cursor-pointer hover:text-[var(--color-text-secondary)]",
                    !s && "cursor-default"
                  ),
                  children: [
                    t,
                    " ",
                    t === 1 ? "member" : "members"
                  ]
                }
              )
            ] }),
            r && /* @__PURE__ */ l("p", { className: "text-[12px] text-[var(--color-text-tertiary)] truncate leading-tight", children: r })
          ] })
        ] }),
        n && /* @__PURE__ */ l("div", { className: "flex items-center gap-2 shrink-0", children: n })
      ]
    }
  );
}
function tl({ user: e, items: t, className: r, "data-testid": n }) {
  const [o, a] = U(!1), s = pe(null), i = Y(() => a(!1), []);
  return K(() => {
    if (!o) return;
    const u = (d) => {
      s.current && !s.current.contains(d.target) && i();
    };
    return document.addEventListener("mousedown", u), () => document.removeEventListener("mousedown", u);
  }, [o, i]), K(() => {
    if (!o) return;
    const u = (d) => {
      d.key === "Escape" && i();
    };
    return document.addEventListener("keydown", u), () => document.removeEventListener("keydown", u);
  }, [o, i]), /* @__PURE__ */ h(
    "div",
    {
      ref: s,
      "data-testid": n,
      className: x("relative inline-block", r),
      children: [
        /* @__PURE__ */ h(
          "button",
          {
            type: "button",
            "aria-label": `User menu for ${e.name}`,
            "aria-expanded": o,
            "aria-haspopup": "menu",
            onClick: () => a((u) => !u),
            className: x(
              "flex items-center gap-2 bg-transparent border-none cursor-pointer p-1 rounded-lg",
              "hover:bg-[var(--color-surface-hover)] transition-colors duration-100",
              o && "bg-[var(--color-surface-hover)]"
            ),
            children: [
              e.avatarUrl ? /* @__PURE__ */ l(
                "img",
                {
                  src: e.avatarUrl,
                  alt: e.name,
                  className: "w-8 h-8 rounded-full object-cover"
                }
              ) : /* @__PURE__ */ l(et, { name: e.name, size: 32 }),
              /* @__PURE__ */ h("div", { className: "flex flex-col items-start text-left min-w-0 hidden sm:flex", children: [
                /* @__PURE__ */ l("span", { className: "text-sm font-medium text-[var(--color-text-primary)] leading-tight truncate max-w-[120px]", children: e.name }),
                /* @__PURE__ */ l("span", { className: "text-xs text-[var(--color-text-tertiary)] leading-tight truncate max-w-[120px]", children: e.email })
              ] }),
              /* @__PURE__ */ l(
                "svg",
                {
                  width: "12",
                  height: "12",
                  viewBox: "0 0 12 12",
                  fill: "none",
                  "aria-hidden": "true",
                  className: x(
                    "text-[var(--color-text-tertiary)] transition-transform duration-150",
                    o ? "rotate-180" : "rotate-0"
                  ),
                  children: /* @__PURE__ */ l("path", { d: "M2 4l4 4 4-4", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" })
                }
              )
            ]
          }
        ),
        o && /* @__PURE__ */ h(
          "div",
          {
            role: "menu",
            "aria-label": "User menu",
            className: x(
              "absolute right-0 top-[calc(100%+6px)] min-w-[200px] z-[200]",
              "bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl shadow-md overflow-hidden"
            ),
            children: [
              /* @__PURE__ */ h("div", { className: "px-3 py-2.5 border-b border-[var(--color-border)]", children: [
                /* @__PURE__ */ l("p", { className: "text-sm font-semibold text-[var(--color-text-primary)] truncate", children: e.name }),
                /* @__PURE__ */ l("p", { className: "text-xs text-[var(--color-text-tertiary)] truncate", children: e.email })
              ] }),
              /* @__PURE__ */ l("div", { className: "py-1", children: t.map((u, d) => /* @__PURE__ */ h("div", { children: [
                u.separator && d > 0 && /* @__PURE__ */ l("div", { className: "my-1 border-t border-[var(--color-border)]" }),
                /* @__PURE__ */ h(
                  "button",
                  {
                    type: "button",
                    role: "menuitem",
                    onClick: () => {
                      u.onClick(), i();
                    },
                    className: x(
                      "flex items-center gap-2.5 w-full text-left px-3 py-2",
                      "text-sm border-none cursor-pointer font-[inherit] transition-colors duration-100",
                      u.danger ? "text-[#dc2626] bg-transparent hover:bg-[#fef2f2]" : "text-[var(--color-text-primary)] bg-transparent hover:bg-[var(--color-surface-hover)]"
                    ),
                    children: [
                      u.icon && /* @__PURE__ */ l("span", { className: "shrink-0 text-base leading-none", "aria-hidden": "true", children: u.icon }),
                      u.label
                    ]
                  }
                )
              ] }, d)) })
            ]
          }
        )
      ]
    }
  );
}
function Za({ item: e, isLast: t }) {
  const r = x(
    "text-sm leading-snug transition-colors duration-100",
    t ? "text-[var(--color-text-primary)] font-medium cursor-default" : "text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] font-normal"
  );
  return t || !e.href && !e.onClick ? /* @__PURE__ */ l("span", { className: r, "aria-current": t ? "page" : void 0, children: e.label }) : e.href ? /* @__PURE__ */ l("a", { href: e.href, onClick: e.onClick, className: x(r, "no-underline"), children: e.label }) : /* @__PURE__ */ l(
    "button",
    {
      type: "button",
      onClick: e.onClick,
      className: x(r, "border-none bg-transparent cursor-pointer font-[inherit] p-0"),
      children: e.label
    }
  );
}
function Xa(e, t) {
  if (e.length <= t) return e;
  const r = e.slice(0, 1), n = e.slice(-(t - 2 > 0 ? t - 2 : 1));
  return [...r, null, ...n];
}
function rl({
  items: e,
  separator: t = "/",
  maxItems: r,
  className: n,
  "data-testid": o
}) {
  if (e.length === 0) return null;
  const a = r != null ? Xa(e, r) : e;
  return /* @__PURE__ */ l("nav", { "aria-label": "Breadcrumb", "data-testid": o, className: x("flex items-center", n), children: /* @__PURE__ */ l("ol", { className: "flex items-center gap-1 flex-wrap list-none m-0 p-0", children: a.map((s, i) => {
    const u = i === a.length - 1;
    return /* @__PURE__ */ h("li", { className: "flex items-center gap-1", children: [
      s === null ? /* @__PURE__ */ l(
        "span",
        {
          className: "text-sm text-[var(--color-text-tertiary)] select-none",
          "aria-label": "More items",
          title: "Some items are hidden",
          children: "…"
        }
      ) : /* @__PURE__ */ l(Za, { item: s, isLast: u }),
      !u && /* @__PURE__ */ l(
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
const Qa = {
  active: { bg: "#f0fdf4", border: "#86efac", text: "#166534", accent: "#16a34a" },
  in_progress: { bg: "#eff6ff", border: "#93c5fd", text: "#1e40af", accent: "#3b82f6" },
  completed: { bg: "#f0fdf4", border: "#86efac", text: "#166534", accent: "#16a34a" },
  archived: { bg: "#f9fafb", border: "#d1d5db", text: "#6b7280", accent: "#9ca3af" },
  planning: { bg: "#fefce8", border: "#fde047", text: "#713f12", accent: "#eab308" },
  paused: { bg: "#fff7ed", border: "#fdba74", text: "#9a3412", accent: "#f97316" }
}, Ja = {
  bg: "#f3f4f6",
  border: "#d1d5db",
  text: "#374151",
  accent: "#6b7280"
};
function ei({ status: e, colors: t }) {
  return /* @__PURE__ */ h(
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
        /* @__PURE__ */ l("span", { style: { width: 5, height: 5, borderRadius: "50%", background: t.accent } }),
        e.replace(/_/g, " ")
      ]
    }
  );
}
function nl({
  name: e,
  id: t,
  status: r,
  statusColors: n,
  contributorNames: o = [],
  contributorCount: a,
  activityItems: s = [],
  presenceDotColor: i = "#d1d5db",
  activityLabel: u = "",
  cardIndex: d = 0,
  onClick: p,
  className: v,
  style: m,
  minHeight: b = 190
}) {
  const w = { ...Qa, ...n }, f = (r ?? "unknown").toLowerCase().replace(/ /g, "_"), y = w[f] ?? Ja, N = a !== void 0 ? Math.max(0, a - o.length) : 0, P = d % 8 * 525;
  return /* @__PURE__ */ h(
    "button",
    {
      type: "button",
      onClick: p,
      className: v,
      style: {
        background: "#fff",
        border: "1.5px solid #e5e7eb",
        borderTop: `3px solid ${y.accent}`,
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
        ...m
      },
      onMouseEnter: (E) => {
        const C = E.currentTarget;
        C.style.boxShadow = "0 4px 16px rgba(0,0,0,0.08)", C.style.transform = "translateY(-1px)", C.style.borderColor = y.border;
      },
      onMouseLeave: (E) => {
        const C = E.currentTarget;
        C.style.boxShadow = "none", C.style.transform = "none", C.style.borderColor = "#e5e7eb";
      },
      children: [
        /* @__PURE__ */ h(
          "div",
          {
            style: {
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: 8
            },
            children: [
              /* @__PURE__ */ h("div", { style: { flex: 1, minWidth: 0 }, children: [
                /* @__PURE__ */ l(
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
                t && /* @__PURE__ */ l(
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
              r && /* @__PURE__ */ l(ei, { status: r, colors: y })
            ]
          }
        ),
        /* @__PURE__ */ l($r, { items: s, staggerMs: P }),
        /* @__PURE__ */ h(
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
              /* @__PURE__ */ h("div", { style: { display: "flex", alignItems: "center", gap: 8, minWidth: 0 }, children: [
                o.length > 0 ? /* @__PURE__ */ l(Tr, { names: o, maxVisible: 5, size: 24 }) : /* @__PURE__ */ h("span", { style: { fontSize: 12, color: "#9ca3af" }, children: [
                  /* @__PURE__ */ l("strong", { style: { color: "#374151" }, children: a ?? 0 }),
                  " contributors"
                ] }),
                o.length > 0 && N > 0 && /* @__PURE__ */ h("span", { style: { fontSize: 11, color: "#9ca3af" }, children: [
                  "+",
                  N,
                  " more"
                ] })
              ] }),
              u && /* @__PURE__ */ h("div", { style: { display: "flex", alignItems: "center", gap: 5, flexShrink: 0 }, children: [
                /* @__PURE__ */ l(
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
                /* @__PURE__ */ l("span", { style: { fontSize: 11, color: "#9ca3af", whiteSpace: "nowrap" }, children: u })
              ] })
            ]
          }
        )
      ]
    }
  );
}
function ti(e) {
  const t = [], r = /* @__PURE__ */ new Map();
  for (const n of e) {
    const o = n.group ?? null;
    if (o === null) {
      (t.length === 0 || t[0].name !== null) && (t.unshift({ name: null, items: [] }), r.forEach((s, i) => r.set(i, s + 1))), t[0].items.push(n);
      continue;
    }
    let a = r.get(o);
    a === void 0 && (a = t.length, r.set(o, a), t.push({ name: o, items: [] })), t[a].items.push(n);
  }
  return t;
}
function At({
  items: e,
  storageKey: t,
  title: r,
  renderNavItem: n
}) {
  const o = re(() => ti(e), [e]), a = o.some((s) => s.name !== null);
  return /* @__PURE__ */ l("nav", { className: "flex-1 overflow-y-auto py-1", children: a ? o.map(
    (s) => s.name === null ? /* @__PURE__ */ l(Dt, { items: s.items, renderNavItem: n }, "__ungrouped") : /* @__PURE__ */ l(
      ri,
      {
        name: s.name,
        items: s.items,
        storageKey: `${t}.${r}.${s.name}`,
        renderNavItem: n
      },
      s.name
    )
  ) : /* @__PURE__ */ l(Dt, { items: e, renderNavItem: n }) });
}
function ol({
  title: e,
  items: t,
  titleAction: r,
  railHeader: n,
  railWidth: o = 220,
  storageKey: a = "subnav",
  secondaryTitle: s,
  secondaryItems: i,
  secondaryStorageKey: u,
  secondaryRailWidth: d = 200,
  renderNavItem: p,
  children: v
}) {
  const m = i && i.length > 0;
  return /* @__PURE__ */ h("div", { className: "flex h-full min-h-0", children: [
    /* @__PURE__ */ h(
      "aside",
      {
        className: "flex-none border-r border-[var(--color-border)] bg-[var(--color-surface)] flex flex-col overflow-hidden",
        style: { width: o },
        children: [
          /* @__PURE__ */ h("div", { className: "flex items-center justify-between px-4 py-[14px] border-b border-[var(--color-border)]", children: [
            /* @__PURE__ */ l("span", { className: "text-[11px] font-semibold text-[var(--color-text-tertiary)] uppercase tracking-[0.05em]", children: e }),
            r
          ] }),
          n && /* @__PURE__ */ l("div", { className: "px-3 py-2 border-b border-[var(--color-border)]", children: n }),
          /* @__PURE__ */ l(At, { items: t, storageKey: a, title: e, renderNavItem: p })
        ]
      }
    ),
    m && /* @__PURE__ */ h(
      "aside",
      {
        className: "flex-none border-r border-[var(--color-border)] bg-[var(--color-surface)] flex flex-col overflow-hidden",
        style: { width: d },
        children: [
          /* @__PURE__ */ l("div", { className: "flex items-center justify-between px-4 py-[14px] border-b border-[var(--color-border)]", children: /* @__PURE__ */ l("span", { className: "text-[11px] font-semibold text-[var(--color-text-tertiary)] uppercase tracking-[0.05em]", children: s ?? "" }) }),
          /* @__PURE__ */ l(
            At,
            {
              items: i,
              storageKey: u ?? `${a}.secondary`,
              title: s ?? "secondary",
              renderNavItem: p
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ l("main", { className: "flex-1 min-w-0 overflow-auto p-6", children: v })
  ] });
}
function Dt({
  items: e,
  renderNavItem: t
}) {
  return /* @__PURE__ */ l(Q, { children: e.map((r) => /* @__PURE__ */ l(xr, { item: r, renderNavItem: t }, r.path)) });
}
function ri({
  name: e,
  items: t,
  storageKey: r,
  renderNavItem: n
}) {
  const [o, a] = U(() => typeof window > "u" ? !1 : window.localStorage?.getItem(r) === "1");
  K(() => {
    typeof window > "u" || (o ? window.localStorage?.setItem(r, "1") : window.localStorage?.removeItem(r));
  }, [o, r]);
  const s = t.find((u) => u.groupScrollAfter)?.groupScrollAfter, i = s ? { maxHeight: s * 38, overflowY: "auto" } : void 0;
  return /* @__PURE__ */ h("section", { className: "border-b border-[var(--color-border)]", children: [
    /* @__PURE__ */ h(
      "button",
      {
        type: "button",
        onClick: () => a((u) => !u),
        className: "flex items-center gap-1.5 w-full px-3 py-2 bg-transparent border-none cursor-pointer text-[var(--color-text-tertiary)] text-[10px] font-bold tracking-[0.05em] uppercase text-left",
        "aria-expanded": !o,
        children: [
          /* @__PURE__ */ l("span", { className: "text-[10px] w-[10px] inline-block", "aria-hidden": "true", children: o ? "▸" : "▾" }),
          /* @__PURE__ */ l("span", { className: "flex-1", children: e }),
          /* @__PURE__ */ l("span", { className: "text-[9px] font-medium text-[var(--color-text-tertiary)] bg-[var(--color-bg)] px-[5px] py-px rounded-[6px] border border-[var(--color-border)]", children: t.length })
        ]
      }
    ),
    !o && /* @__PURE__ */ l("div", { style: i, children: t.map((u) => /* @__PURE__ */ l(xr, { item: u, renderNavItem: n }, u.path)) })
  ] });
}
function xr({
  item: e,
  renderNavItem: t
}) {
  const r = e.accent === "danger" ? "#dc2626" : e.accent === "warning" ? "#d97706" : e.accent === "success" ? "#16a34a" : void 0, n = /* @__PURE__ */ h(Q, { children: [
    /* @__PURE__ */ h("div", { className: "flex items-center justify-between gap-2", children: [
      /* @__PURE__ */ l(
        "span",
        {
          className: "text-[13px] font-medium text-[var(--color-text-secondary)]",
          style: r ? { color: r } : void 0,
          children: e.label
        }
      ),
      e.count !== void 0 && /* @__PURE__ */ l("span", { className: "text-[10px] font-medium text-[var(--color-text-tertiary)] bg-[var(--color-surface)] px-[6px] py-px rounded-[8px] border border-[var(--color-border)]", children: e.count })
    ] }),
    e.hint && /* @__PURE__ */ l("div", { className: "text-[10px] text-[var(--color-text-tertiary)] mt-0.5", children: e.hint })
  ] }), o = {
    display: "block",
    padding: "8px 14px",
    borderLeft: "3px solid transparent",
    color: "var(--color-text-secondary)",
    textDecoration: "none",
    cursor: "pointer"
  };
  return e.onClick ? /* @__PURE__ */ l(
    "button",
    {
      type: "button",
      onClick: e.onClick,
      className: "block w-full px-[14px] py-2 border-l-[3px] border-transparent border-t-0 border-r-0 border-b-0 bg-transparent text-[var(--color-text-secondary)] text-left cursor-pointer font-[inherit]",
      children: n
    }
  ) : t ? /* @__PURE__ */ l(Q, { children: t(e, n, o) }) : /* @__PURE__ */ l(
    "a",
    {
      href: e.path,
      className: "block px-[14px] py-2 border-l-[3px] border-transparent text-[var(--color-text-secondary)] no-underline cursor-pointer",
      children: n
    }
  );
}
const ni = [
  "a[href]",
  "button:not([disabled])",
  'input:not([disabled]):not([type="hidden"])',
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
  '[contenteditable="true"]'
].join(",");
function Tt(e) {
  return Array.from(e.querySelectorAll(ni)).filter(
    (t) => t.getAttribute("aria-hidden") !== "true"
  );
}
function oi(e, t, r) {
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
function al({
  trigger: e,
  open: t,
  onClose: r,
  placement: n = "bottom-start",
  offset: o = 6,
  className: a,
  zIndex: s = 9500,
  "data-testid": i = "inline-popover",
  children: u
}) {
  const d = pe(null), [p, v] = U(null), m = pe(null), b = Y(() => {
    const w = e.current;
    if (!w) return;
    const f = w.getBoundingClientRect();
    v(oi(f, n, o));
  }, [e, n, o]);
  return Nr(() => {
    if (!t) {
      v(null);
      return;
    }
    b();
  }, [t, b]), K(() => {
    if (!t) return;
    const w = () => b();
    return window.addEventListener("scroll", w, !0), window.addEventListener("resize", w), () => {
      window.removeEventListener("scroll", w, !0), window.removeEventListener("resize", w);
    };
  }, [t, b]), K(() => {
    if (!t) return;
    const w = typeof document < "u" ? document.activeElement : null;
    return m.current = w, queueMicrotask(() => {
      const f = d.current;
      if (!f) return;
      const y = Tt(f);
      y.length > 0 ? y[0].focus() : (f.setAttribute("tabindex", "-1"), f.focus());
    }), () => {
      const f = m.current;
      f && typeof f.focus == "function" && document.contains(f) && f.focus(), m.current = null;
    };
  }, [t]), K(() => {
    if (!t) return;
    const w = (f) => {
      if (f.key === "Escape") {
        f.stopPropagation(), r();
        return;
      }
      if (f.key !== "Tab") return;
      const y = d.current;
      if (!y) return;
      const N = Tt(y);
      if (N.length === 0) {
        f.preventDefault();
        return;
      }
      const P = N[0], E = N[N.length - 1], C = document.activeElement;
      if (!C || !y.contains(C)) {
        f.preventDefault(), P.focus();
        return;
      }
      f.shiftKey && C === P ? (f.preventDefault(), E.focus()) : !f.shiftKey && C === E && (f.preventDefault(), P.focus());
    };
    return window.addEventListener("keydown", w), () => window.removeEventListener("keydown", w);
  }, [t, r]), K(() => {
    if (!t) return;
    const w = (f) => {
      const y = f.target;
      y && (d.current?.contains(y) || e.current?.contains(y) || r());
    };
    return document.addEventListener("mousedown", w), () => document.removeEventListener("mousedown", w);
  }, [t, r, e]), !t || !p || typeof document > "u" ? null : Lt(
    /* @__PURE__ */ l(
      "div",
      {
        ref: d,
        role: "dialog",
        "data-testid": i,
        "data-placement": n,
        className: x(
          "min-w-[160px] rounded-lg border border-slate-200 bg-white",
          "shadow-lg p-1 text-sm text-slate-700",
          a
        ),
        style: { ...p, zIndex: s },
        children: u
      }
    ),
    document.body
  );
}
export {
  Le as A,
  rl as B,
  zi as C,
  Si as D,
  _i as E,
  Ii as F,
  Gi as G,
  Ya as H,
  ji as I,
  qa as J,
  Oi as K,
  Yi as L,
  Zi as M,
  Hi as N,
  tl as O,
  Ui as P,
  Qi as Q,
  Fa as R,
  Wi as S,
  Di as T,
  $i as U,
  wi as V,
  el as a,
  qi as b,
  xi as c,
  Bi as d,
  Ei as e,
  Ci as f,
  Ni as g,
  Ki as h,
  Fi as i,
  ki as j,
  Ji as k,
  Pi as l,
  al as m,
  Ri as n,
  ja as o,
  Ra as p,
  Li as q,
  nl as r,
  Mi as s,
  ba as t,
  za as u,
  Ti as v,
  ol as w,
  Ai as x,
  Vi as y,
  Xi as z
};
