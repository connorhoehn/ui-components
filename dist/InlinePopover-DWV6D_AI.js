import { jsx as c, jsxs as g, Fragment as q } from "react/jsx-runtime";
import * as s from "react";
import { useState as X, createContext as fr, useMemo as qe, useCallback as se, useEffect as F, useContext as pr, useId as mr, useRef as Ne, useLayoutEffect as vr } from "react";
import * as hr from "react-dom";
import br, { createPortal as Nt } from "react-dom";
import { c as E } from "./cn-B6yFEsav.js";
import { M as gr } from "./Modal-2jg4229_.js";
import { a as kt, S as xr, A as yr, b as wr } from "./Badge-CCsRykoK.js";
import "clsx";
import "tailwind-merge";
var it = 1, Er = 0.9, Cr = 0.8, Sr = 0.17, Te = 0.1, Me = 0.999, Nr = 0.9999, kr = 0.99, Rr = /[\\\/_+.#"@\[\(\{&]/, Pr = /[\\\/_+.#"@\[\(\{&]/g, Ar = /[\s-]/, Rt = /[\s-]/g;
function Ke(e, t, r, n, o, a, l) {
  if (a === t.length) return o === e.length ? it : kr;
  var i = `${o},${a}`;
  if (l[i] !== void 0) return l[i];
  for (var d = n.charAt(a), u = r.indexOf(d, o), f = 0, p, v, b, y; u >= 0; ) p = Ke(e, t, r, n, u + 1, a + 1, l), p > f && (u === o ? p *= it : Rr.test(e.charAt(u - 1)) ? (p *= Cr, b = e.slice(o, u - 1).match(Pr), b && o > 0 && (p *= Math.pow(Me, b.length))) : Ar.test(e.charAt(u - 1)) ? (p *= Er, y = e.slice(o, u - 1).match(Rt), y && o > 0 && (p *= Math.pow(Me, y.length))) : (p *= Sr, o > 0 && (p *= Math.pow(Me, u - o))), e.charAt(u) !== t.charAt(a) && (p *= Nr)), (p < Te && r.charAt(u - 1) === n.charAt(a + 1) || n.charAt(a + 1) === n.charAt(a) && r.charAt(u - 1) !== n.charAt(a)) && (v = Ke(e, t, r, n, u + 1, a + 2, l), v * Te > p && (p = v * Te)), p > f && (f = p), u = r.indexOf(d, u + 1);
  return l[i] = f, f;
}
function lt(e) {
  return e.toLowerCase().replace(Rt, " ");
}
function Dr(e, t, r) {
  return e = r && r.length > 0 ? `${e + " " + r.join(" ")}` : e, Ke(e, t, lt(e), lt(t), 0, 0, {});
}
function z(e, t, { checkForDefaultPrevented: r = !0 } = {}) {
  return function(o) {
    if (e?.(o), r === !1 || !o.defaultPrevented)
      return t?.(o);
  };
}
function st(e, t) {
  if (typeof e == "function")
    return e(t);
  e != null && (e.current = t);
}
function H(...e) {
  return (t) => {
    let r = !1;
    const n = e.map((o) => {
      const a = st(o, t);
      return !r && typeof a == "function" && (r = !0), a;
    });
    if (r)
      return () => {
        for (let o = 0; o < n.length; o++) {
          const a = n[o];
          typeof a == "function" ? a() : st(e[o], null);
        }
      };
  };
}
function J(...e) {
  return s.useCallback(H(...e), e);
}
function Or(e, t) {
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
function Ir(e, t = []) {
  let r = [];
  function n(a, l) {
    const i = s.createContext(l), d = r.length;
    r = [...r, l];
    const u = (p) => {
      const { scope: v, children: b, ...y } = p, m = v?.[e]?.[d] || i, x = s.useMemo(() => y, Object.values(y));
      return /* @__PURE__ */ c(m.Provider, { value: x, children: b });
    };
    u.displayName = a + "Provider";
    function f(p, v) {
      const b = v?.[e]?.[d] || i, y = s.useContext(b);
      if (y) return y;
      if (l !== void 0) return l;
      throw new Error(`\`${p}\` must be used within \`${a}\``);
    }
    return [u, f];
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
  return o.scopeName = e, [n, Lr(o, ...t)];
}
function Lr(...e) {
  const t = e[0];
  if (e.length === 1) return t;
  const r = () => {
    const n = e.map((o) => ({
      useScope: o(),
      scopeName: o.scopeName
    }));
    return function(a) {
      const l = n.reduce((i, { useScope: d, scopeName: u }) => {
        const p = d(a)[`__scope${u}`];
        return { ...i, ...p };
      }, {});
      return s.useMemo(() => ({ [`__scope${t.scopeName}`]: l }), [l]);
    };
  };
  return r.scopeName = t.scopeName, r;
}
var fe = globalThis?.document ? s.useLayoutEffect : () => {
}, Tr = s[" useId ".trim().toString()] || (() => {
}), Mr = 0;
function U(e) {
  const [t, r] = s.useState(Tr());
  return fe(() => {
    r((n) => n ?? String(Mr++));
  }, [e]), t ? `radix-${t}` : "";
}
var _r = s[" useInsertionEffect ".trim().toString()] || fe;
function Fr({
  prop: e,
  defaultProp: t,
  onChange: r = () => {
  },
  caller: n
}) {
  const [o, a, l] = $r({
    defaultProp: t,
    onChange: r
  }), i = e !== void 0, d = i ? e : o;
  {
    const f = s.useRef(e !== void 0);
    s.useEffect(() => {
      const p = f.current;
      p !== i && console.warn(
        `${n} is changing from ${p ? "controlled" : "uncontrolled"} to ${i ? "controlled" : "uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`
      ), f.current = i;
    }, [i, n]);
  }
  const u = s.useCallback(
    (f) => {
      if (i) {
        const p = Wr(f) ? f(e) : f;
        p !== e && l.current?.(p);
      } else
        a(f);
    },
    [i, e, a, l]
  );
  return [d, u];
}
function $r({
  defaultProp: e,
  onChange: t
}) {
  const [r, n] = s.useState(e), o = s.useRef(r), a = s.useRef(t);
  return _r(() => {
    a.current = t;
  }, [t]), s.useEffect(() => {
    o.current !== r && (a.current?.(r), o.current = r);
  }, [r, o]), [r, n, a];
}
function Wr(e) {
  return typeof e == "function";
}
// @__NO_SIDE_EFFECTS__
function me(e) {
  const t = /* @__PURE__ */ Br(e), r = s.forwardRef((n, o) => {
    const { children: a, ...l } = n, i = s.Children.toArray(a), d = i.find(Ur);
    if (d) {
      const u = d.props.children, f = i.map((p) => p === d ? s.Children.count(u) > 1 ? s.Children.only(null) : s.isValidElement(u) ? u.props.children : null : p);
      return /* @__PURE__ */ c(t, { ...l, ref: o, children: s.isValidElement(u) ? s.cloneElement(u, void 0, f) : null });
    }
    return /* @__PURE__ */ c(t, { ...l, ref: o, children: a });
  });
  return r.displayName = `${e}.Slot`, r;
}
// @__NO_SIDE_EFFECTS__
function Br(e) {
  const t = s.forwardRef((r, n) => {
    const { children: o, ...a } = r;
    if (s.isValidElement(o)) {
      const l = Kr(o), i = Vr(a, o.props);
      return o.type !== s.Fragment && (i.ref = n ? H(n, l) : l), s.cloneElement(o, i);
    }
    return s.Children.count(o) > 1 ? s.Children.only(null) : null;
  });
  return t.displayName = `${e}.SlotClone`, t;
}
var jr = /* @__PURE__ */ Symbol("radix.slottable");
function Ur(e) {
  return s.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === jr;
}
function Vr(e, t) {
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
function Kr(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, r = t && "isReactWarning" in t && t.isReactWarning;
  return r ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, r = t && "isReactWarning" in t && t.isReactWarning, r ? e.props.ref : e.props.ref || e.ref);
}
var zr = [
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
], Pt = zr.reduce((e, t) => {
  const r = /* @__PURE__ */ me(`Primitive.${t}`), n = s.forwardRef((o, a) => {
    const { asChild: l, ...i } = o, d = l ? r : t;
    return typeof window < "u" && (window[/* @__PURE__ */ Symbol.for("radix-ui")] = !0), /* @__PURE__ */ c(d, { ...i, ref: a });
  });
  return n.displayName = `Primitive.${t}`, { ...e, [t]: n };
}, {});
function Hr(e, t) {
  e && hr.flushSync(() => e.dispatchEvent(t));
}
function pe(e) {
  const t = s.useRef(e);
  return s.useEffect(() => {
    t.current = e;
  }), s.useMemo(() => (...r) => t.current?.(...r), []);
}
function Gr(e, t = globalThis?.document) {
  const r = pe(e);
  s.useEffect(() => {
    const n = (o) => {
      o.key === "Escape" && r(o);
    };
    return t.addEventListener("keydown", n, { capture: !0 }), () => t.removeEventListener("keydown", n, { capture: !0 });
  }, [r, t]);
}
var Yr = "DismissableLayer", ze = "dismissableLayer.update", qr = "dismissableLayer.pointerDownOutside", Xr = "dismissableLayer.focusOutside", ct, At = s.createContext({
  layers: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
}), Dt = s.forwardRef(
  (e, t) => {
    const {
      disableOutsidePointerEvents: r = !1,
      onEscapeKeyDown: n,
      onPointerDownOutside: o,
      onFocusOutside: a,
      onInteractOutside: l,
      onDismiss: i,
      ...d
    } = e, u = s.useContext(At), [f, p] = s.useState(null), v = f?.ownerDocument ?? globalThis?.document, [, b] = s.useState({}), y = J(t, (S) => p(S)), m = Array.from(u.layers), [x] = [...u.layersWithOutsidePointerEventsDisabled].slice(-1), C = m.indexOf(x), R = f ? m.indexOf(f) : -1, P = u.layersWithOutsidePointerEventsDisabled.size > 0, k = R >= C, O = Jr((S) => {
      const _ = S.target, B = [...u.branches].some((j) => j.contains(_));
      !k || B || (o?.(S), l?.(S), S.defaultPrevented || i?.());
    }, v), A = en((S) => {
      const _ = S.target;
      [...u.branches].some((j) => j.contains(_)) || (a?.(S), l?.(S), S.defaultPrevented || i?.());
    }, v);
    return Gr((S) => {
      R === u.layers.size - 1 && (n?.(S), !S.defaultPrevented && i && (S.preventDefault(), i()));
    }, v), s.useEffect(() => {
      if (f)
        return r && (u.layersWithOutsidePointerEventsDisabled.size === 0 && (ct = v.body.style.pointerEvents, v.body.style.pointerEvents = "none"), u.layersWithOutsidePointerEventsDisabled.add(f)), u.layers.add(f), ut(), () => {
          r && u.layersWithOutsidePointerEventsDisabled.size === 1 && (v.body.style.pointerEvents = ct);
        };
    }, [f, v, r, u]), s.useEffect(() => () => {
      f && (u.layers.delete(f), u.layersWithOutsidePointerEventsDisabled.delete(f), ut());
    }, [f, u]), s.useEffect(() => {
      const S = () => b({});
      return document.addEventListener(ze, S), () => document.removeEventListener(ze, S);
    }, []), /* @__PURE__ */ c(
      Pt.div,
      {
        ...d,
        ref: y,
        style: {
          pointerEvents: P ? k ? "auto" : "none" : void 0,
          ...e.style
        },
        onFocusCapture: z(e.onFocusCapture, A.onFocusCapture),
        onBlurCapture: z(e.onBlurCapture, A.onBlurCapture),
        onPointerDownCapture: z(
          e.onPointerDownCapture,
          O.onPointerDownCapture
        )
      }
    );
  }
);
Dt.displayName = Yr;
var Zr = "DismissableLayerBranch", Qr = s.forwardRef((e, t) => {
  const r = s.useContext(At), n = s.useRef(null), o = J(t, n);
  return s.useEffect(() => {
    const a = n.current;
    if (a)
      return r.branches.add(a), () => {
        r.branches.delete(a);
      };
  }, [r.branches]), /* @__PURE__ */ c(Pt.div, { ...e, ref: o });
});
Qr.displayName = Zr;
function Jr(e, t = globalThis?.document) {
  const r = pe(e), n = s.useRef(!1), o = s.useRef(() => {
  });
  return s.useEffect(() => {
    const a = (i) => {
      if (i.target && !n.current) {
        let d = function() {
          Ot(
            qr,
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
function en(e, t = globalThis?.document) {
  const r = pe(e), n = s.useRef(!1);
  return s.useEffect(() => {
    const o = (a) => {
      a.target && !n.current && Ot(Xr, r, { originalEvent: a }, {
        discrete: !1
      });
    };
    return t.addEventListener("focusin", o), () => t.removeEventListener("focusin", o);
  }, [t, r]), {
    onFocusCapture: () => n.current = !0,
    onBlurCapture: () => n.current = !1
  };
}
function ut() {
  const e = new CustomEvent(ze);
  document.dispatchEvent(e);
}
function Ot(e, t, r, { discrete: n }) {
  const o = r.originalEvent.target, a = new CustomEvent(e, { bubbles: !1, cancelable: !0, detail: r });
  t && o.addEventListener(e, t, { once: !0 }), n ? Hr(o, a) : o.dispatchEvent(a);
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
], rn = tn.reduce((e, t) => {
  const r = /* @__PURE__ */ me(`Primitive.${t}`), n = s.forwardRef((o, a) => {
    const { asChild: l, ...i } = o, d = l ? r : t;
    return typeof window < "u" && (window[/* @__PURE__ */ Symbol.for("radix-ui")] = !0), /* @__PURE__ */ c(d, { ...i, ref: a });
  });
  return n.displayName = `Primitive.${t}`, { ...e, [t]: n };
}, {}), _e = "focusScope.autoFocusOnMount", Fe = "focusScope.autoFocusOnUnmount", dt = { bubbles: !1, cancelable: !0 }, nn = "FocusScope", It = s.forwardRef((e, t) => {
  const {
    loop: r = !1,
    trapped: n = !1,
    onMountAutoFocus: o,
    onUnmountAutoFocus: a,
    ...l
  } = e, [i, d] = s.useState(null), u = pe(o), f = pe(a), p = s.useRef(null), v = J(t, (m) => d(m)), b = s.useRef({
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
      let m = function(P) {
        if (b.paused || !i) return;
        const k = P.target;
        i.contains(k) ? p.current = k : K(p.current, { select: !0 });
      }, x = function(P) {
        if (b.paused || !i) return;
        const k = P.relatedTarget;
        k !== null && (i.contains(k) || K(p.current, { select: !0 }));
      }, C = function(P) {
        if (document.activeElement === document.body)
          for (const O of P)
            O.removedNodes.length > 0 && K(i);
      };
      document.addEventListener("focusin", m), document.addEventListener("focusout", x);
      const R = new MutationObserver(C);
      return i && R.observe(i, { childList: !0, subtree: !0 }), () => {
        document.removeEventListener("focusin", m), document.removeEventListener("focusout", x), R.disconnect();
      };
    }
  }, [n, i, b.paused]), s.useEffect(() => {
    if (i) {
      pt.add(b);
      const m = document.activeElement;
      if (!i.contains(m)) {
        const C = new CustomEvent(_e, dt);
        i.addEventListener(_e, u), i.dispatchEvent(C), C.defaultPrevented || (on(un(Lt(i)), { select: !0 }), document.activeElement === m && K(i));
      }
      return () => {
        i.removeEventListener(_e, u), setTimeout(() => {
          const C = new CustomEvent(Fe, dt);
          i.addEventListener(Fe, f), i.dispatchEvent(C), C.defaultPrevented || K(m ?? document.body, { select: !0 }), i.removeEventListener(Fe, f), pt.remove(b);
        }, 0);
      };
    }
  }, [i, u, f, b]);
  const y = s.useCallback(
    (m) => {
      if (!r && !n || b.paused) return;
      const x = m.key === "Tab" && !m.altKey && !m.ctrlKey && !m.metaKey, C = document.activeElement;
      if (x && C) {
        const R = m.currentTarget, [P, k] = an(R);
        P && k ? !m.shiftKey && C === k ? (m.preventDefault(), r && K(P, { select: !0 })) : m.shiftKey && C === P && (m.preventDefault(), r && K(k, { select: !0 })) : C === R && m.preventDefault();
      }
    },
    [r, n, b.paused]
  );
  return /* @__PURE__ */ c(rn.div, { tabIndex: -1, ...l, ref: v, onKeyDown: y });
});
It.displayName = nn;
function on(e, { select: t = !1 } = {}) {
  const r = document.activeElement;
  for (const n of e)
    if (K(n, { select: t }), document.activeElement !== r) return;
}
function an(e) {
  const t = Lt(e), r = ft(t, e), n = ft(t.reverse(), e);
  return [r, n];
}
function Lt(e) {
  const t = [], r = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (n) => {
      const o = n.tagName === "INPUT" && n.type === "hidden";
      return n.disabled || n.hidden || o ? NodeFilter.FILTER_SKIP : n.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  for (; r.nextNode(); ) t.push(r.currentNode);
  return t;
}
function ft(e, t) {
  for (const r of e)
    if (!ln(r, { upTo: t })) return r;
}
function ln(e, { upTo: t }) {
  if (getComputedStyle(e).visibility === "hidden") return !0;
  for (; e; ) {
    if (t !== void 0 && e === t) return !1;
    if (getComputedStyle(e).display === "none") return !0;
    e = e.parentElement;
  }
  return !1;
}
function sn(e) {
  return e instanceof HTMLInputElement && "select" in e;
}
function K(e, { select: t = !1 } = {}) {
  if (e && e.focus) {
    const r = document.activeElement;
    e.focus({ preventScroll: !0 }), e !== r && sn(e) && t && e.select();
  }
}
var pt = cn();
function cn() {
  let e = [];
  return {
    add(t) {
      const r = e[0];
      t !== r && r?.pause(), e = mt(e, t), e.unshift(t);
    },
    remove(t) {
      e = mt(e, t), e[0]?.resume();
    }
  };
}
function mt(e, t) {
  const r = [...e], n = r.indexOf(t);
  return n !== -1 && r.splice(n, 1), r;
}
function un(e) {
  return e.filter((t) => t.tagName !== "A");
}
var dn = [
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
], fn = dn.reduce((e, t) => {
  const r = /* @__PURE__ */ me(`Primitive.${t}`), n = s.forwardRef((o, a) => {
    const { asChild: l, ...i } = o, d = l ? r : t;
    return typeof window < "u" && (window[/* @__PURE__ */ Symbol.for("radix-ui")] = !0), /* @__PURE__ */ c(d, { ...i, ref: a });
  });
  return n.displayName = `Primitive.${t}`, { ...e, [t]: n };
}, {}), pn = "Portal", Tt = s.forwardRef((e, t) => {
  const { container: r, ...n } = e, [o, a] = s.useState(!1);
  fe(() => a(!0), []);
  const l = r || o && globalThis?.document?.body;
  return l ? br.createPortal(/* @__PURE__ */ c(fn.div, { ...n, ref: t }), l) : null;
});
Tt.displayName = pn;
function mn(e, t) {
  return s.useReducer((r, n) => t[r][n] ?? r, e);
}
var Pe = (e) => {
  const { present: t, children: r } = e, n = vn(t), o = typeof r == "function" ? r({ present: n.isPresent }) : s.Children.only(r), a = J(n.ref, hn(o));
  return typeof r == "function" || n.isPresent ? s.cloneElement(o, { ref: a }) : null;
};
Pe.displayName = "Presence";
function vn(e) {
  const [t, r] = s.useState(), n = s.useRef(null), o = s.useRef(e), a = s.useRef("none"), l = e ? "mounted" : "unmounted", [i, d] = mn(l, {
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
    const u = ge(n.current);
    a.current = i === "mounted" ? u : "none";
  }, [i]), fe(() => {
    const u = n.current, f = o.current;
    if (f !== e) {
      const v = a.current, b = ge(u);
      e ? d("MOUNT") : b === "none" || u?.display === "none" ? d("UNMOUNT") : d(f && v !== b ? "ANIMATION_OUT" : "UNMOUNT"), o.current = e;
    }
  }, [e, d]), fe(() => {
    if (t) {
      let u;
      const f = t.ownerDocument.defaultView ?? window, p = (b) => {
        const m = ge(n.current).includes(CSS.escape(b.animationName));
        if (b.target === t && m && (d("ANIMATION_END"), !o.current)) {
          const x = t.style.animationFillMode;
          t.style.animationFillMode = "forwards", u = f.setTimeout(() => {
            t.style.animationFillMode === "forwards" && (t.style.animationFillMode = x);
          });
        }
      }, v = (b) => {
        b.target === t && (a.current = ge(n.current));
      };
      return t.addEventListener("animationstart", v), t.addEventListener("animationcancel", p), t.addEventListener("animationend", p), () => {
        f.clearTimeout(u), t.removeEventListener("animationstart", v), t.removeEventListener("animationcancel", p), t.removeEventListener("animationend", p);
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
function ge(e) {
  return e?.animationName || "none";
}
function hn(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, r = t && "isReactWarning" in t && t.isReactWarning;
  return r ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, r = t && "isReactWarning" in t && t.isReactWarning, r ? e.props.ref : e.props.ref || e.ref);
}
var bn = [
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
], ve = bn.reduce((e, t) => {
  const r = /* @__PURE__ */ me(`Primitive.${t}`), n = s.forwardRef((o, a) => {
    const { asChild: l, ...i } = o, d = l ? r : t;
    return typeof window < "u" && (window[/* @__PURE__ */ Symbol.for("radix-ui")] = !0), /* @__PURE__ */ c(d, { ...i, ref: a });
  });
  return n.displayName = `Primitive.${t}`, { ...e, [t]: n };
}, {}), $e = 0;
function gn() {
  s.useEffect(() => {
    const e = document.querySelectorAll("[data-radix-focus-guard]");
    return document.body.insertAdjacentElement("afterbegin", e[0] ?? vt()), document.body.insertAdjacentElement("beforeend", e[1] ?? vt()), $e++, () => {
      $e === 1 && document.querySelectorAll("[data-radix-focus-guard]").forEach((t) => t.remove()), $e--;
    };
  }, []);
}
function vt() {
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
function Mt(e, t) {
  var r = {};
  for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && t.indexOf(n) < 0 && (r[n] = e[n]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var o = 0, n = Object.getOwnPropertySymbols(e); o < n.length; o++)
      t.indexOf(n[o]) < 0 && Object.prototype.propertyIsEnumerable.call(e, n[o]) && (r[n[o]] = e[n[o]]);
  return r;
}
function xn(e, t, r) {
  if (r || arguments.length === 2) for (var n = 0, o = t.length, a; n < o; n++)
    (a || !(n in t)) && (a || (a = Array.prototype.slice.call(t, 0, n)), a[n] = t[n]);
  return e.concat(a || Array.prototype.slice.call(t));
}
var Ce = "right-scroll-bar-position", Se = "width-before-scroll-bar", yn = "with-scroll-bars-hidden", wn = "--removed-body-scroll-bar-size";
function We(e, t) {
  return typeof e == "function" ? e(t) : e && (e.current = t), e;
}
function En(e, t) {
  var r = X(function() {
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
var Cn = typeof window < "u" ? s.useLayoutEffect : s.useEffect, ht = /* @__PURE__ */ new WeakMap();
function Sn(e, t) {
  var r = En(null, function(n) {
    return e.forEach(function(o) {
      return We(o, n);
    });
  });
  return Cn(function() {
    var n = ht.get(r);
    if (n) {
      var o = new Set(n), a = new Set(e), l = r.current;
      o.forEach(function(i) {
        a.has(i) || We(i, null);
      }), a.forEach(function(i) {
        o.has(i) || We(i, l);
      });
    }
    ht.set(r, e);
  }, [e]), r;
}
function Nn(e) {
  return e;
}
function kn(e, t) {
  t === void 0 && (t = Nn);
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
        var f = l;
        l = [], f.forEach(a);
      }, u = function() {
        return Promise.resolve().then(d);
      };
      u(), r = {
        push: function(f) {
          l.push(f), u();
        },
        filter: function(f) {
          return l = l.filter(f), r;
        }
      };
    }
  };
  return o;
}
function Rn(e) {
  e === void 0 && (e = {});
  var t = kn(null);
  return t.options = W({ async: !0, ssr: !1 }, e), t;
}
var _t = function(e) {
  var t = e.sideCar, r = Mt(e, ["sideCar"]);
  if (!t)
    throw new Error("Sidecar: please provide `sideCar` property to import the right car");
  var n = t.read();
  if (!n)
    throw new Error("Sidecar medium not found");
  return s.createElement(n, W({}, r));
};
_t.isSideCarExport = !0;
function Pn(e, t) {
  return e.useMedium(t), _t;
}
var Ft = Rn(), Be = function() {
}, Ae = s.forwardRef(function(e, t) {
  var r = s.useRef(null), n = s.useState({
    onScrollCapture: Be,
    onWheelCapture: Be,
    onTouchMoveCapture: Be
  }), o = n[0], a = n[1], l = e.forwardProps, i = e.children, d = e.className, u = e.removeScrollBar, f = e.enabled, p = e.shards, v = e.sideCar, b = e.noRelative, y = e.noIsolation, m = e.inert, x = e.allowPinchZoom, C = e.as, R = C === void 0 ? "div" : C, P = e.gapMode, k = Mt(e, ["forwardProps", "children", "className", "removeScrollBar", "enabled", "shards", "sideCar", "noRelative", "noIsolation", "inert", "allowPinchZoom", "as", "gapMode"]), O = v, A = Sn([r, t]), S = W(W({}, k), o);
  return s.createElement(
    s.Fragment,
    null,
    f && s.createElement(O, { sideCar: Ft, removeScrollBar: u, shards: p, noRelative: b, noIsolation: y, inert: m, setCallbacks: a, allowPinchZoom: !!x, lockRef: r, gapMode: P }),
    l ? s.cloneElement(s.Children.only(i), W(W({}, S), { ref: A })) : s.createElement(R, W({}, S, { className: d, ref: A }), i)
  );
});
Ae.defaultProps = {
  enabled: !0,
  removeScrollBar: !0,
  inert: !1
};
Ae.classNames = {
  fullWidth: Se,
  zeroRight: Ce
};
var An = function() {
  if (typeof __webpack_nonce__ < "u")
    return __webpack_nonce__;
};
function Dn() {
  if (!document)
    return null;
  var e = document.createElement("style");
  e.type = "text/css";
  var t = An();
  return t && e.setAttribute("nonce", t), e;
}
function On(e, t) {
  e.styleSheet ? e.styleSheet.cssText = t : e.appendChild(document.createTextNode(t));
}
function In(e) {
  var t = document.head || document.getElementsByTagName("head")[0];
  t.appendChild(e);
}
var Ln = function() {
  var e = 0, t = null;
  return {
    add: function(r) {
      e == 0 && (t = Dn()) && (On(t, r), In(t)), e++;
    },
    remove: function() {
      e--, !e && t && (t.parentNode && t.parentNode.removeChild(t), t = null);
    }
  };
}, Tn = function() {
  var e = Ln();
  return function(t, r) {
    s.useEffect(function() {
      return e.add(t), function() {
        e.remove();
      };
    }, [t && r]);
  };
}, $t = function() {
  var e = Tn(), t = function(r) {
    var n = r.styles, o = r.dynamic;
    return e(n, o), null;
  };
  return t;
}, Mn = {
  left: 0,
  top: 0,
  right: 0,
  gap: 0
}, je = function(e) {
  return parseInt(e || "", 10) || 0;
}, _n = function(e) {
  var t = window.getComputedStyle(document.body), r = t[e === "padding" ? "paddingLeft" : "marginLeft"], n = t[e === "padding" ? "paddingTop" : "marginTop"], o = t[e === "padding" ? "paddingRight" : "marginRight"];
  return [je(r), je(n), je(o)];
}, Fn = function(e) {
  if (e === void 0 && (e = "margin"), typeof window > "u")
    return Mn;
  var t = _n(e), r = document.documentElement.clientWidth, n = window.innerWidth;
  return {
    left: t[0],
    top: t[1],
    right: t[2],
    gap: Math.max(0, n - r + t[2] - t[0])
  };
}, $n = $t(), ce = "data-scroll-locked", Wn = function(e, t, r, n) {
  var o = e.left, a = e.top, l = e.right, i = e.gap;
  return r === void 0 && (r = "margin"), `
  .`.concat(yn, ` {
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
  
  .`).concat(Ce, ` {
    right: `).concat(i, "px ").concat(n, `;
  }
  
  .`).concat(Se, ` {
    margin-right: `).concat(i, "px ").concat(n, `;
  }
  
  .`).concat(Ce, " .").concat(Ce, ` {
    right: 0 `).concat(n, `;
  }
  
  .`).concat(Se, " .").concat(Se, ` {
    margin-right: 0 `).concat(n, `;
  }
  
  body[`).concat(ce, `] {
    `).concat(wn, ": ").concat(i, `px;
  }
`);
}, bt = function() {
  var e = parseInt(document.body.getAttribute(ce) || "0", 10);
  return isFinite(e) ? e : 0;
}, Bn = function() {
  s.useEffect(function() {
    return document.body.setAttribute(ce, (bt() + 1).toString()), function() {
      var e = bt() - 1;
      e <= 0 ? document.body.removeAttribute(ce) : document.body.setAttribute(ce, e.toString());
    };
  }, []);
}, jn = function(e) {
  var t = e.noRelative, r = e.noImportant, n = e.gapMode, o = n === void 0 ? "margin" : n;
  Bn();
  var a = s.useMemo(function() {
    return Fn(o);
  }, [o]);
  return s.createElement($n, { styles: Wn(a, !t, o, r ? "" : "!important") });
}, He = !1;
if (typeof window < "u")
  try {
    var xe = Object.defineProperty({}, "passive", {
      get: function() {
        return He = !0, !0;
      }
    });
    window.addEventListener("test", xe, xe), window.removeEventListener("test", xe, xe);
  } catch {
    He = !1;
  }
var re = He ? { passive: !1 } : !1, Un = function(e) {
  return e.tagName === "TEXTAREA";
}, Wt = function(e, t) {
  if (!(e instanceof Element))
    return !1;
  var r = window.getComputedStyle(e);
  return (
    // not-not-scrollable
    r[t] !== "hidden" && // contains scroll inside self
    !(r.overflowY === r.overflowX && !Un(e) && r[t] === "visible")
  );
}, Vn = function(e) {
  return Wt(e, "overflowY");
}, Kn = function(e) {
  return Wt(e, "overflowX");
}, gt = function(e, t) {
  var r = t.ownerDocument, n = t;
  do {
    typeof ShadowRoot < "u" && n instanceof ShadowRoot && (n = n.host);
    var o = Bt(e, n);
    if (o) {
      var a = jt(e, n), l = a[1], i = a[2];
      if (l > i)
        return !0;
    }
    n = n.parentNode;
  } while (n && n !== r.body);
  return !1;
}, zn = function(e) {
  var t = e.scrollTop, r = e.scrollHeight, n = e.clientHeight;
  return [
    t,
    r,
    n
  ];
}, Hn = function(e) {
  var t = e.scrollLeft, r = e.scrollWidth, n = e.clientWidth;
  return [
    t,
    r,
    n
  ];
}, Bt = function(e, t) {
  return e === "v" ? Vn(t) : Kn(t);
}, jt = function(e, t) {
  return e === "v" ? zn(t) : Hn(t);
}, Gn = function(e, t) {
  return e === "h" && t === "rtl" ? -1 : 1;
}, Yn = function(e, t, r, n, o) {
  var a = Gn(e, window.getComputedStyle(t).direction), l = a * n, i = r.target, d = t.contains(i), u = !1, f = l > 0, p = 0, v = 0;
  do {
    if (!i)
      break;
    var b = jt(e, i), y = b[0], m = b[1], x = b[2], C = m - x - a * y;
    (y || C) && Bt(e, i) && (p += C, v += y);
    var R = i.parentNode;
    i = R && R.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? R.host : R;
  } while (
    // portaled content
    !d && i !== document.body || // self content
    d && (t.contains(i) || t === i)
  );
  return (f && Math.abs(p) < 1 || !f && Math.abs(v) < 1) && (u = !0), u;
}, ye = function(e) {
  return "changedTouches" in e ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY] : [0, 0];
}, xt = function(e) {
  return [e.deltaX, e.deltaY];
}, yt = function(e) {
  return e && "current" in e ? e.current : e;
}, qn = function(e, t) {
  return e[0] === t[0] && e[1] === t[1];
}, Xn = function(e) {
  return `
  .block-interactivity-`.concat(e, ` {pointer-events: none;}
  .allow-interactivity-`).concat(e, ` {pointer-events: all;}
`);
}, Zn = 0, ne = [];
function Qn(e) {
  var t = s.useRef([]), r = s.useRef([0, 0]), n = s.useRef(), o = s.useState(Zn++)[0], a = s.useState($t)[0], l = s.useRef(e);
  s.useEffect(function() {
    l.current = e;
  }, [e]), s.useEffect(function() {
    if (e.inert) {
      document.body.classList.add("block-interactivity-".concat(o));
      var m = xn([e.lockRef.current], (e.shards || []).map(yt), !0).filter(Boolean);
      return m.forEach(function(x) {
        return x.classList.add("allow-interactivity-".concat(o));
      }), function() {
        document.body.classList.remove("block-interactivity-".concat(o)), m.forEach(function(x) {
          return x.classList.remove("allow-interactivity-".concat(o));
        });
      };
    }
  }, [e.inert, e.lockRef.current, e.shards]);
  var i = s.useCallback(function(m, x) {
    if ("touches" in m && m.touches.length === 2 || m.type === "wheel" && m.ctrlKey)
      return !l.current.allowPinchZoom;
    var C = ye(m), R = r.current, P = "deltaX" in m ? m.deltaX : R[0] - C[0], k = "deltaY" in m ? m.deltaY : R[1] - C[1], O, A = m.target, S = Math.abs(P) > Math.abs(k) ? "h" : "v";
    if ("touches" in m && S === "h" && A.type === "range")
      return !1;
    var _ = window.getSelection(), B = _ && _.anchorNode, j = B ? B === A || B.contains(A) : !1;
    if (j)
      return !1;
    var V = gt(S, A);
    if (!V)
      return !0;
    if (V ? O = S : (O = S === "v" ? "h" : "v", V = gt(S, A)), !V)
      return !1;
    if (!n.current && "changedTouches" in m && (P || k) && (n.current = O), !O)
      return !0;
    var ee = n.current || O;
    return Yn(ee, x, m, ee === "h" ? P : k);
  }, []), d = s.useCallback(function(m) {
    var x = m;
    if (!(!ne.length || ne[ne.length - 1] !== a)) {
      var C = "deltaY" in x ? xt(x) : ye(x), R = t.current.filter(function(O) {
        return O.name === x.type && (O.target === x.target || x.target === O.shadowParent) && qn(O.delta, C);
      })[0];
      if (R && R.should) {
        x.cancelable && x.preventDefault();
        return;
      }
      if (!R) {
        var P = (l.current.shards || []).map(yt).filter(Boolean).filter(function(O) {
          return O.contains(x.target);
        }), k = P.length > 0 ? i(x, P[0]) : !l.current.noIsolation;
        k && x.cancelable && x.preventDefault();
      }
    }
  }, []), u = s.useCallback(function(m, x, C, R) {
    var P = { name: m, delta: x, target: C, should: R, shadowParent: Jn(C) };
    t.current.push(P), setTimeout(function() {
      t.current = t.current.filter(function(k) {
        return k !== P;
      });
    }, 1);
  }, []), f = s.useCallback(function(m) {
    r.current = ye(m), n.current = void 0;
  }, []), p = s.useCallback(function(m) {
    u(m.type, xt(m), m.target, i(m, e.lockRef.current));
  }, []), v = s.useCallback(function(m) {
    u(m.type, ye(m), m.target, i(m, e.lockRef.current));
  }, []);
  s.useEffect(function() {
    return ne.push(a), e.setCallbacks({
      onScrollCapture: p,
      onWheelCapture: p,
      onTouchMoveCapture: v
    }), document.addEventListener("wheel", d, re), document.addEventListener("touchmove", d, re), document.addEventListener("touchstart", f, re), function() {
      ne = ne.filter(function(m) {
        return m !== a;
      }), document.removeEventListener("wheel", d, re), document.removeEventListener("touchmove", d, re), document.removeEventListener("touchstart", f, re);
    };
  }, []);
  var b = e.removeScrollBar, y = e.inert;
  return s.createElement(
    s.Fragment,
    null,
    y ? s.createElement(a, { styles: Xn(o) }) : null,
    b ? s.createElement(jn, { noRelative: e.noRelative, gapMode: e.gapMode }) : null
  );
}
function Jn(e) {
  for (var t = null; e !== null; )
    e instanceof ShadowRoot && (t = e.host, e = e.host), e = e.parentNode;
  return t;
}
const eo = Pn(Ft, Qn);
var Ut = s.forwardRef(function(e, t) {
  return s.createElement(Ae, W({}, e, { ref: t, sideCar: eo }));
});
Ut.classNames = Ae.classNames;
var to = function(e) {
  if (typeof document > "u")
    return null;
  var t = Array.isArray(e) ? e[0] : e;
  return t.ownerDocument.body;
}, oe = /* @__PURE__ */ new WeakMap(), we = /* @__PURE__ */ new WeakMap(), Ee = {}, Ue = 0, Vt = function(e) {
  return e && (e.host || Vt(e.parentNode));
}, ro = function(e, t) {
  return t.map(function(r) {
    if (e.contains(r))
      return r;
    var n = Vt(r);
    return n && e.contains(n) ? n : (console.error("aria-hidden", r, "in not contained inside", e, ". Doing nothing"), null);
  }).filter(function(r) {
    return !!r;
  });
}, no = function(e, t, r, n) {
  var o = ro(t, Array.isArray(e) ? e : [e]);
  Ee[r] || (Ee[r] = /* @__PURE__ */ new WeakMap());
  var a = Ee[r], l = [], i = /* @__PURE__ */ new Set(), d = new Set(o), u = function(p) {
    !p || i.has(p) || (i.add(p), u(p.parentNode));
  };
  o.forEach(u);
  var f = function(p) {
    !p || d.has(p) || Array.prototype.forEach.call(p.children, function(v) {
      if (i.has(v))
        f(v);
      else
        try {
          var b = v.getAttribute(n), y = b !== null && b !== "false", m = (oe.get(v) || 0) + 1, x = (a.get(v) || 0) + 1;
          oe.set(v, m), a.set(v, x), l.push(v), m === 1 && y && we.set(v, !0), x === 1 && v.setAttribute(r, "true"), y || v.setAttribute(n, "true");
        } catch (C) {
          console.error("aria-hidden: cannot operate on ", v, C);
        }
    });
  };
  return f(t), i.clear(), Ue++, function() {
    l.forEach(function(p) {
      var v = oe.get(p) - 1, b = a.get(p) - 1;
      oe.set(p, v), a.set(p, b), v || (we.has(p) || p.removeAttribute(n), we.delete(p)), b || p.removeAttribute(r);
    }), Ue--, Ue || (oe = /* @__PURE__ */ new WeakMap(), oe = /* @__PURE__ */ new WeakMap(), we = /* @__PURE__ */ new WeakMap(), Ee = {});
  };
}, oo = function(e, t, r) {
  r === void 0 && (r = "data-aria-hidden");
  var n = Array.from(Array.isArray(e) ? e : [e]), o = to(e);
  return o ? (n.push.apply(n, Array.from(o.querySelectorAll("[aria-live], script"))), no(n, o, r, "aria-hidden")) : function() {
    return null;
  };
}, De = "Dialog", [Kt] = Ir(De), [ao, $] = Kt(De), zt = (e) => {
  const {
    __scopeDialog: t,
    children: r,
    open: n,
    defaultOpen: o,
    onOpenChange: a,
    modal: l = !0
  } = e, i = s.useRef(null), d = s.useRef(null), [u, f] = Fr({
    prop: n,
    defaultProp: o ?? !1,
    onChange: a,
    caller: De
  });
  return /* @__PURE__ */ c(
    ao,
    {
      scope: t,
      triggerRef: i,
      contentRef: d,
      contentId: U(),
      titleId: U(),
      descriptionId: U(),
      open: u,
      onOpenChange: f,
      onOpenToggle: s.useCallback(() => f((p) => !p), [f]),
      modal: l,
      children: r
    }
  );
};
zt.displayName = De;
var Ht = "DialogTrigger", io = s.forwardRef(
  (e, t) => {
    const { __scopeDialog: r, ...n } = e, o = $(Ht, r), a = J(t, o.triggerRef);
    return /* @__PURE__ */ c(
      ve.button,
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
io.displayName = Ht;
var Xe = "DialogPortal", [lo, Gt] = Kt(Xe, {
  forceMount: void 0
}), Yt = (e) => {
  const { __scopeDialog: t, forceMount: r, children: n, container: o } = e, a = $(Xe, t);
  return /* @__PURE__ */ c(lo, { scope: t, forceMount: r, children: s.Children.map(n, (l) => /* @__PURE__ */ c(Pe, { present: r || a.open, children: /* @__PURE__ */ c(Tt, { asChild: !0, container: o, children: l }) })) });
};
Yt.displayName = Xe;
var ke = "DialogOverlay", qt = s.forwardRef(
  (e, t) => {
    const r = Gt(ke, e.__scopeDialog), { forceMount: n = r.forceMount, ...o } = e, a = $(ke, e.__scopeDialog);
    return a.modal ? /* @__PURE__ */ c(Pe, { present: n || a.open, children: /* @__PURE__ */ c(co, { ...o, ref: t }) }) : null;
  }
);
qt.displayName = ke;
var so = /* @__PURE__ */ me("DialogOverlay.RemoveScroll"), co = s.forwardRef(
  (e, t) => {
    const { __scopeDialog: r, ...n } = e, o = $(ke, r);
    return (
      // Make sure `Content` is scrollable even when it doesn't live inside `RemoveScroll`
      // ie. when `Overlay` and `Content` are siblings
      /* @__PURE__ */ c(Ut, { as: so, allowPinchZoom: !0, shards: [o.contentRef], children: /* @__PURE__ */ c(
        ve.div,
        {
          "data-state": Qe(o.open),
          ...n,
          ref: t,
          style: { pointerEvents: "auto", ...n.style }
        }
      ) })
    );
  }
), Z = "DialogContent", Xt = s.forwardRef(
  (e, t) => {
    const r = Gt(Z, e.__scopeDialog), { forceMount: n = r.forceMount, ...o } = e, a = $(Z, e.__scopeDialog);
    return /* @__PURE__ */ c(Pe, { present: n || a.open, children: a.modal ? /* @__PURE__ */ c(uo, { ...o, ref: t }) : /* @__PURE__ */ c(fo, { ...o, ref: t }) });
  }
);
Xt.displayName = Z;
var uo = s.forwardRef(
  (e, t) => {
    const r = $(Z, e.__scopeDialog), n = s.useRef(null), o = J(t, r.contentRef, n);
    return s.useEffect(() => {
      const a = n.current;
      if (a) return oo(a);
    }, []), /* @__PURE__ */ c(
      Zt,
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
), fo = s.forwardRef(
  (e, t) => {
    const r = $(Z, e.__scopeDialog), n = s.useRef(!1), o = s.useRef(!1);
    return /* @__PURE__ */ c(
      Zt,
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
), Zt = s.forwardRef(
  (e, t) => {
    const { __scopeDialog: r, trapFocus: n, onOpenAutoFocus: o, onCloseAutoFocus: a, ...l } = e, i = $(Z, r), d = s.useRef(null), u = J(t, d);
    return gn(), /* @__PURE__ */ g(q, { children: [
      /* @__PURE__ */ c(
        It,
        {
          asChild: !0,
          loop: !0,
          trapped: n,
          onMountAutoFocus: o,
          onUnmountAutoFocus: a,
          children: /* @__PURE__ */ c(
            Dt,
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
      /* @__PURE__ */ g(q, { children: [
        /* @__PURE__ */ c(ho, { titleId: i.titleId }),
        /* @__PURE__ */ c(go, { contentRef: d, descriptionId: i.descriptionId })
      ] })
    ] });
  }
), Ze = "DialogTitle", po = s.forwardRef(
  (e, t) => {
    const { __scopeDialog: r, ...n } = e, o = $(Ze, r);
    return /* @__PURE__ */ c(ve.h2, { id: o.titleId, ...n, ref: t });
  }
);
po.displayName = Ze;
var Qt = "DialogDescription", mo = s.forwardRef(
  (e, t) => {
    const { __scopeDialog: r, ...n } = e, o = $(Qt, r);
    return /* @__PURE__ */ c(ve.p, { id: o.descriptionId, ...n, ref: t });
  }
);
mo.displayName = Qt;
var Jt = "DialogClose", vo = s.forwardRef(
  (e, t) => {
    const { __scopeDialog: r, ...n } = e, o = $(Jt, r);
    return /* @__PURE__ */ c(
      ve.button,
      {
        type: "button",
        ...n,
        ref: t,
        onClick: z(e.onClick, () => o.onOpenChange(!1))
      }
    );
  }
);
vo.displayName = Jt;
function Qe(e) {
  return e ? "open" : "closed";
}
var er = "DialogTitleWarning", [Na, tr] = Or(er, {
  contentName: Z,
  titleName: Ze,
  docsSlug: "dialog"
}), ho = ({ titleId: e }) => {
  const t = tr(er), r = `\`${t.contentName}\` requires a \`${t.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${t.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${t.docsSlug}`;
  return s.useEffect(() => {
    e && (document.getElementById(e) || console.error(r));
  }, [r, e]), null;
}, bo = "DialogDescriptionWarning", go = ({ contentRef: e, descriptionId: t }) => {
  const n = `Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${tr(bo).contentName}}.`;
  return s.useEffect(() => {
    const o = e.current?.getAttribute("aria-describedby");
    t && o && (document.getElementById(t) || console.warn(n));
  }, [n, e, t]), null;
}, xo = zt, yo = Yt, wo = qt, Eo = Xt, Co = /* @__PURE__ */ Symbol.for("react.lazy"), Re = s[" use ".trim().toString()];
function So(e) {
  return typeof e == "object" && e !== null && "then" in e;
}
function rr(e) {
  return e != null && typeof e == "object" && "$$typeof" in e && e.$$typeof === Co && "_payload" in e && So(e._payload);
}
// @__NO_SIDE_EFFECTS__
function No(e) {
  const t = /* @__PURE__ */ ko(e), r = s.forwardRef((n, o) => {
    let { children: a, ...l } = n;
    rr(a) && typeof Re == "function" && (a = Re(a._payload));
    const i = s.Children.toArray(a), d = i.find(Po);
    if (d) {
      const u = d.props.children, f = i.map((p) => p === d ? s.Children.count(u) > 1 ? s.Children.only(null) : s.isValidElement(u) ? u.props.children : null : p);
      return /* @__PURE__ */ c(t, { ...l, ref: o, children: s.isValidElement(u) ? s.cloneElement(u, void 0, f) : null });
    }
    return /* @__PURE__ */ c(t, { ...l, ref: o, children: a });
  });
  return r.displayName = `${e}.Slot`, r;
}
// @__NO_SIDE_EFFECTS__
function ko(e) {
  const t = s.forwardRef((r, n) => {
    let { children: o, ...a } = r;
    if (rr(o) && typeof Re == "function" && (o = Re(o._payload)), s.isValidElement(o)) {
      const l = Do(o), i = Ao(a, o.props);
      return o.type !== s.Fragment && (i.ref = n ? H(n, l) : l), s.cloneElement(o, i);
    }
    return s.Children.count(o) > 1 ? s.Children.only(null) : null;
  });
  return t.displayName = `${e}.SlotClone`, t;
}
var Ro = /* @__PURE__ */ Symbol("radix.slottable");
function Po(e) {
  return s.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === Ro;
}
function Ao(e, t) {
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
function Do(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, r = t && "isReactWarning" in t && t.isReactWarning;
  return r ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, r = t && "isReactWarning" in t && t.isReactWarning, r ? e.props.ref : e.props.ref || e.ref);
}
var Oo = [
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
], Y = Oo.reduce((e, t) => {
  const r = /* @__PURE__ */ No(`Primitive.${t}`), n = s.forwardRef((o, a) => {
    const { asChild: l, ...i } = o, d = l ? r : t;
    return typeof window < "u" && (window[/* @__PURE__ */ Symbol.for("radix-ui")] = !0), /* @__PURE__ */ c(d, { ...i, ref: a });
  });
  return n.displayName = `Primitive.${t}`, { ...e, [t]: n };
}, {}), de = '[cmdk-group=""]', Ve = '[cmdk-group-items=""]', Io = '[cmdk-group-heading=""]', nr = '[cmdk-item=""]', wt = `${nr}:not([aria-disabled="true"])`, Ge = "cmdk-item-select", ie = "data-value", Lo = (e, t, r) => Dr(e, t, r), or = s.createContext(void 0), he = () => s.useContext(or), ar = s.createContext(void 0), Je = () => s.useContext(ar), ir = s.createContext(void 0), lr = s.forwardRef((e, t) => {
  let r = le(() => {
    var h, N;
    return { search: "", value: (N = (h = e.value) != null ? h : e.defaultValue) != null ? N : "", selectedItemId: void 0, filtered: { count: 0, items: /* @__PURE__ */ new Map(), groups: /* @__PURE__ */ new Set() } };
  }), n = le(() => /* @__PURE__ */ new Set()), o = le(() => /* @__PURE__ */ new Map()), a = le(() => /* @__PURE__ */ new Map()), l = le(() => /* @__PURE__ */ new Set()), i = sr(e), { label: d, children: u, value: f, onValueChange: p, filter: v, shouldFilter: b, loop: y, disablePointerSelection: m = !1, vimBindings: x = !0, ...C } = e, R = U(), P = U(), k = U(), O = s.useRef(null), A = Ko();
  Q(() => {
    if (f !== void 0) {
      let h = f.trim();
      r.current.value = h, S.emit();
    }
  }, [f]), Q(() => {
    A(6, tt);
  }, []);
  let S = s.useMemo(() => ({ subscribe: (h) => (l.current.add(h), () => l.current.delete(h)), snapshot: () => r.current, setState: (h, N, D) => {
    var w, I, L, M;
    if (!Object.is(r.current[h], N)) {
      if (r.current[h] = N, h === "search") ee(), j(), A(1, V);
      else if (h === "value") {
        if (document.activeElement.hasAttribute("cmdk-input") || document.activeElement.hasAttribute("cmdk-root")) {
          let T = document.getElementById(k);
          T ? T.focus() : (w = document.getElementById(R)) == null || w.focus();
        }
        if (A(7, () => {
          var T;
          r.current.selectedItemId = (T = te()) == null ? void 0 : T.id, S.emit();
        }), D || A(5, tt), ((I = i.current) == null ? void 0 : I.value) !== void 0) {
          let T = N ?? "";
          (M = (L = i.current).onValueChange) == null || M.call(L, T);
          return;
        }
      }
      S.emit();
    }
  }, emit: () => {
    l.current.forEach((h) => h());
  } }), []), _ = s.useMemo(() => ({ value: (h, N, D) => {
    var w;
    N !== ((w = a.current.get(h)) == null ? void 0 : w.value) && (a.current.set(h, { value: N, keywords: D }), r.current.filtered.items.set(h, B(N, D)), A(2, () => {
      j(), S.emit();
    }));
  }, item: (h, N) => (n.current.add(h), N && (o.current.has(N) ? o.current.get(N).add(h) : o.current.set(N, /* @__PURE__ */ new Set([h]))), A(3, () => {
    ee(), j(), r.current.value || V(), S.emit();
  }), () => {
    a.current.delete(h), n.current.delete(h), r.current.filtered.items.delete(h);
    let D = te();
    A(4, () => {
      ee(), D?.getAttribute("id") === h && V(), S.emit();
    });
  }), group: (h) => (o.current.has(h) || o.current.set(h, /* @__PURE__ */ new Set()), () => {
    a.current.delete(h), o.current.delete(h);
  }), filter: () => i.current.shouldFilter, label: d || e["aria-label"], getDisablePointerSelection: () => i.current.disablePointerSelection, listId: R, inputId: k, labelId: P, listInnerRef: O }), []);
  function B(h, N) {
    var D, w;
    let I = (w = (D = i.current) == null ? void 0 : D.filter) != null ? w : Lo;
    return h ? I(h, r.current.search, N) : 0;
  }
  function j() {
    if (!r.current.search || i.current.shouldFilter === !1) return;
    let h = r.current.filtered.items, N = [];
    r.current.filtered.groups.forEach((w) => {
      let I = o.current.get(w), L = 0;
      I.forEach((M) => {
        let T = h.get(M);
        L = Math.max(T, L);
      }), N.push([w, L]);
    });
    let D = O.current;
    ue().sort((w, I) => {
      var L, M;
      let T = w.getAttribute("id"), be = I.getAttribute("id");
      return ((L = h.get(be)) != null ? L : 0) - ((M = h.get(T)) != null ? M : 0);
    }).forEach((w) => {
      let I = w.closest(Ve);
      I ? I.appendChild(w.parentElement === I ? w : w.closest(`${Ve} > *`)) : D.appendChild(w.parentElement === D ? w : w.closest(`${Ve} > *`));
    }), N.sort((w, I) => I[1] - w[1]).forEach((w) => {
      var I;
      let L = (I = O.current) == null ? void 0 : I.querySelector(`${de}[${ie}="${encodeURIComponent(w[0])}"]`);
      L?.parentElement.appendChild(L);
    });
  }
  function V() {
    let h = ue().find((D) => D.getAttribute("aria-disabled") !== "true"), N = h?.getAttribute(ie);
    S.setState("value", N || void 0);
  }
  function ee() {
    var h, N, D, w;
    if (!r.current.search || i.current.shouldFilter === !1) {
      r.current.filtered.count = n.current.size;
      return;
    }
    r.current.filtered.groups = /* @__PURE__ */ new Set();
    let I = 0;
    for (let L of n.current) {
      let M = (N = (h = a.current.get(L)) == null ? void 0 : h.value) != null ? N : "", T = (w = (D = a.current.get(L)) == null ? void 0 : D.keywords) != null ? w : [], be = B(M, T);
      r.current.filtered.items.set(L, be), be > 0 && I++;
    }
    for (let [L, M] of o.current) for (let T of M) if (r.current.filtered.items.get(T) > 0) {
      r.current.filtered.groups.add(L);
      break;
    }
    r.current.filtered.count = I;
  }
  function tt() {
    var h, N, D;
    let w = te();
    w && (((h = w.parentElement) == null ? void 0 : h.firstChild) === w && ((D = (N = w.closest(de)) == null ? void 0 : N.querySelector(Io)) == null || D.scrollIntoView({ block: "nearest" })), w.scrollIntoView({ block: "nearest" }));
  }
  function te() {
    var h;
    return (h = O.current) == null ? void 0 : h.querySelector(`${nr}[aria-selected="true"]`);
  }
  function ue() {
    var h;
    return Array.from(((h = O.current) == null ? void 0 : h.querySelectorAll(wt)) || []);
  }
  function Ie(h) {
    let N = ue()[h];
    N && S.setState("value", N.getAttribute(ie));
  }
  function Le(h) {
    var N;
    let D = te(), w = ue(), I = w.findIndex((M) => M === D), L = w[I + h];
    (N = i.current) != null && N.loop && (L = I + h < 0 ? w[w.length - 1] : I + h === w.length ? w[0] : w[I + h]), L && S.setState("value", L.getAttribute(ie));
  }
  function rt(h) {
    let N = te(), D = N?.closest(de), w;
    for (; D && !w; ) D = h > 0 ? Uo(D, de) : Vo(D, de), w = D?.querySelector(wt);
    w ? S.setState("value", w.getAttribute(ie)) : Le(h);
  }
  let nt = () => Ie(ue().length - 1), ot = (h) => {
    h.preventDefault(), h.metaKey ? nt() : h.altKey ? rt(1) : Le(1);
  }, at = (h) => {
    h.preventDefault(), h.metaKey ? Ie(0) : h.altKey ? rt(-1) : Le(-1);
  };
  return s.createElement(Y.div, { ref: t, tabIndex: -1, ...C, "cmdk-root": "", onKeyDown: (h) => {
    var N;
    (N = C.onKeyDown) == null || N.call(C, h);
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
        h.preventDefault(), Ie(0);
        break;
      }
      case "End": {
        h.preventDefault(), nt();
        break;
      }
      case "Enter": {
        h.preventDefault();
        let w = te();
        if (w) {
          let I = new Event(Ge);
          w.dispatchEvent(I);
        }
      }
    }
  } }, s.createElement("label", { "cmdk-label": "", htmlFor: _.inputId, id: _.labelId, style: Ho }, d), Oe(e, (h) => s.createElement(ar.Provider, { value: S }, s.createElement(or.Provider, { value: _ }, h))));
}), To = s.forwardRef((e, t) => {
  var r, n;
  let o = U(), a = s.useRef(null), l = s.useContext(ir), i = he(), d = sr(e), u = (n = (r = d.current) == null ? void 0 : r.forceMount) != null ? n : l?.forceMount;
  Q(() => {
    if (!u) return i.item(o, l?.id);
  }, [u]);
  let f = cr(o, a, [e.value, e.children, a], e.keywords), p = Je(), v = G((A) => A.value && A.value === f.current), b = G((A) => u || i.filter() === !1 ? !0 : A.search ? A.filtered.items.get(o) > 0 : !0);
  s.useEffect(() => {
    let A = a.current;
    if (!(!A || e.disabled)) return A.addEventListener(Ge, y), () => A.removeEventListener(Ge, y);
  }, [b, e.onSelect, e.disabled]);
  function y() {
    var A, S;
    m(), (S = (A = d.current).onSelect) == null || S.call(A, f.current);
  }
  function m() {
    p.setState("value", f.current, !0);
  }
  if (!b) return null;
  let { disabled: x, value: C, onSelect: R, forceMount: P, keywords: k, ...O } = e;
  return s.createElement(Y.div, { ref: H(a, t), ...O, id: o, "cmdk-item": "", role: "option", "aria-disabled": !!x, "aria-selected": !!v, "data-disabled": !!x, "data-selected": !!v, onPointerMove: x || i.getDisablePointerSelection() ? void 0 : m, onClick: x ? void 0 : y }, e.children);
}), Mo = s.forwardRef((e, t) => {
  let { heading: r, children: n, forceMount: o, ...a } = e, l = U(), i = s.useRef(null), d = s.useRef(null), u = U(), f = he(), p = G((b) => o || f.filter() === !1 ? !0 : b.search ? b.filtered.groups.has(l) : !0);
  Q(() => f.group(l), []), cr(l, i, [e.value, e.heading, d]);
  let v = s.useMemo(() => ({ id: l, forceMount: o }), [o]);
  return s.createElement(Y.div, { ref: H(i, t), ...a, "cmdk-group": "", role: "presentation", hidden: p ? void 0 : !0 }, r && s.createElement("div", { ref: d, "cmdk-group-heading": "", "aria-hidden": !0, id: u }, r), Oe(e, (b) => s.createElement("div", { "cmdk-group-items": "", role: "group", "aria-labelledby": r ? u : void 0 }, s.createElement(ir.Provider, { value: v }, b))));
}), _o = s.forwardRef((e, t) => {
  let { alwaysRender: r, ...n } = e, o = s.useRef(null), a = G((l) => !l.search);
  return !r && !a ? null : s.createElement(Y.div, { ref: H(o, t), ...n, "cmdk-separator": "", role: "separator" });
}), Fo = s.forwardRef((e, t) => {
  let { onValueChange: r, ...n } = e, o = e.value != null, a = Je(), l = G((u) => u.search), i = G((u) => u.selectedItemId), d = he();
  return s.useEffect(() => {
    e.value != null && a.setState("search", e.value);
  }, [e.value]), s.createElement(Y.input, { ref: t, ...n, "cmdk-input": "", autoComplete: "off", autoCorrect: "off", spellCheck: !1, "aria-autocomplete": "list", role: "combobox", "aria-expanded": !0, "aria-controls": d.listId, "aria-labelledby": d.labelId, "aria-activedescendant": i, id: d.inputId, type: "text", value: o ? e.value : l, onChange: (u) => {
    o || a.setState("search", u.target.value), r?.(u.target.value);
  } });
}), $o = s.forwardRef((e, t) => {
  let { children: r, label: n = "Suggestions", ...o } = e, a = s.useRef(null), l = s.useRef(null), i = G((u) => u.selectedItemId), d = he();
  return s.useEffect(() => {
    if (l.current && a.current) {
      let u = l.current, f = a.current, p, v = new ResizeObserver(() => {
        p = requestAnimationFrame(() => {
          let b = u.offsetHeight;
          f.style.setProperty("--cmdk-list-height", b.toFixed(1) + "px");
        });
      });
      return v.observe(u), () => {
        cancelAnimationFrame(p), v.unobserve(u);
      };
    }
  }, []), s.createElement(Y.div, { ref: H(a, t), ...o, "cmdk-list": "", role: "listbox", tabIndex: -1, "aria-activedescendant": i, "aria-label": n, id: d.listId }, Oe(e, (u) => s.createElement("div", { ref: H(l, d.listInnerRef), "cmdk-list-sizer": "" }, u)));
}), Wo = s.forwardRef((e, t) => {
  let { open: r, onOpenChange: n, overlayClassName: o, contentClassName: a, container: l, ...i } = e;
  return s.createElement(xo, { open: r, onOpenChange: n }, s.createElement(yo, { container: l }, s.createElement(wo, { "cmdk-overlay": "", className: o }), s.createElement(Eo, { "aria-label": e.label, "cmdk-dialog": "", className: a }, s.createElement(lr, { ref: t, ...i }))));
}), Bo = s.forwardRef((e, t) => G((r) => r.filtered.count === 0) ? s.createElement(Y.div, { ref: t, ...e, "cmdk-empty": "", role: "presentation" }) : null), jo = s.forwardRef((e, t) => {
  let { progress: r, children: n, label: o = "Loading...", ...a } = e;
  return s.createElement(Y.div, { ref: t, ...a, "cmdk-loading": "", role: "progressbar", "aria-valuenow": r, "aria-valuemin": 0, "aria-valuemax": 100, "aria-label": o }, Oe(e, (l) => s.createElement("div", { "aria-hidden": !0 }, l)));
}), ae = Object.assign(lr, { List: $o, Item: To, Input: Fo, Group: Mo, Separator: _o, Dialog: Wo, Empty: Bo, Loading: jo });
function Uo(e, t) {
  let r = e.nextElementSibling;
  for (; r; ) {
    if (r.matches(t)) return r;
    r = r.nextElementSibling;
  }
}
function Vo(e, t) {
  let r = e.previousElementSibling;
  for (; r; ) {
    if (r.matches(t)) return r;
    r = r.previousElementSibling;
  }
}
function sr(e) {
  let t = s.useRef(e);
  return Q(() => {
    t.current = e;
  }), t;
}
var Q = typeof window > "u" ? s.useEffect : s.useLayoutEffect;
function le(e) {
  let t = s.useRef();
  return t.current === void 0 && (t.current = e()), t;
}
function G(e) {
  let t = Je(), r = () => e(t.snapshot());
  return s.useSyncExternalStore(t.subscribe, r, r);
}
function cr(e, t, r, n = []) {
  let o = s.useRef(), a = he();
  return Q(() => {
    var l;
    let i = (() => {
      var u;
      for (let f of r) {
        if (typeof f == "string") return f.trim();
        if (typeof f == "object" && "current" in f) return f.current ? (u = f.current.textContent) == null ? void 0 : u.trim() : o.current;
      }
    })(), d = n.map((u) => u.trim());
    a.value(e, i, d), (l = t.current) == null || l.setAttribute(ie, i), o.current = i;
  }), o;
}
var Ko = () => {
  let [e, t] = s.useState(), r = le(() => /* @__PURE__ */ new Map());
  return Q(() => {
    r.current.forEach((n) => n()), r.current = /* @__PURE__ */ new Map();
  }, [e]), (n, o) => {
    r.current.set(n, o), t({});
  };
};
function zo(e) {
  let t = e.type;
  return typeof t == "function" ? t(e.props) : "render" in t ? t.render(e.props) : e;
}
function Oe({ asChild: e, children: t }, r) {
  return e && s.isValidElement(t) ? s.cloneElement(zo(t), { ref: t.ref }, r(t.props.children)) : r(t);
}
var Ho = { position: "absolute", width: "1px", height: "1px", padding: "0", margin: "-1px", overflow: "hidden", clip: "rect(0, 0, 0, 0)", whiteSpace: "nowrap", borderWidth: "0" };
const ur = fr(null);
function et() {
  const e = pr(ur);
  if (!e)
    throw new Error(
      "useCommandPalette must be used inside a <CommandPaletteProvider>."
    );
  return e;
}
function ka() {
  const { open: e, close: t, toggle: r, isOpen: n, query: o } = et();
  return { open: e, close: t, toggle: r, isOpen: n, query: o };
}
function Ra({
  commands: e,
  getDynamicCommands: t,
  children: r
}) {
  const [n, o] = X(!1), [a, l] = X(""), i = se(() => o(!0), []), d = se(() => {
    o(!1), l("");
  }, []), u = se(() => o((v) => !v), []);
  F(() => {
    const v = (b) => {
      (b.metaKey || b.ctrlKey) && b.key.toLowerCase() === "k" && (b.preventDefault(), o((y) => !y));
    };
    return window.addEventListener("keydown", v, !0), () => window.removeEventListener("keydown", v, !0);
  }, []);
  const f = qe(() => {
    const v = t ? t(a) : [];
    return [...e, ...v].filter((y) => y.when ? y.when() : !0);
  }, [e, t, a]), p = {
    open: i,
    close: d,
    toggle: u,
    isOpen: n,
    query: a,
    setQuery: l,
    mergedCommands: f
  };
  return /* @__PURE__ */ c(ur.Provider, { value: p, children: r });
}
function Go(e) {
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
function Pa({
  placeholder: e = "Type a command or search…",
  emptyState: t,
  className: r
} = {}) {
  const { isOpen: n, close: o, query: a, setQuery: l, mergedCommands: i } = et(), d = qe(() => Go(i), [i]), u = se(
    (f) => {
      o(), Promise.resolve().then(() => f.run());
    },
    [o]
  );
  return /* @__PURE__ */ c(
    gr,
    {
      open: n,
      onClose: o,
      maxWidth: 640,
      rawChildren: !0,
      backdropTestId: "command-palette-backdrop",
      children: /* @__PURE__ */ g(
        ae,
        {
          label: "Command palette",
          value: void 0,
          className: E("flex flex-col gap-0 w-full", r),
          "data-testid": "command-palette",
          children: [
            /* @__PURE__ */ c(
              ae.Input,
              {
                value: a,
                onValueChange: l,
                placeholder: e,
                "data-autofocus": !0,
                className: E(
                  "w-full px-3 py-2.5 text-sm border-0 border-b border-border",
                  "outline-none bg-transparent text-text-primary placeholder:text-text-tertiary"
                ),
                "data-testid": "command-palette-input"
              }
            ),
            /* @__PURE__ */ g(ae.List, { className: "max-h-[360px] overflow-y-auto py-2", children: [
              /* @__PURE__ */ c(ae.Empty, { className: "px-3 py-6 text-center text-sm text-text-tertiary", children: t ?? "No results." }),
              d.map(({ groupName: f, items: p }) => /* @__PURE__ */ c(
                ae.Group,
                {
                  heading: f ?? void 0,
                  children: p.map((v) => /* @__PURE__ */ g(
                    ae.Item,
                    {
                      value: `${v.id} ${v.label} ${(v.keywords ?? []).join(" ")}`,
                      keywords: v.keywords,
                      onSelect: () => u(v),
                      "data-testid": `command-palette-item-${v.id}`,
                      className: E(
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
                            className: E(
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
                f ?? "__ungrouped__"
              ))
            ] })
          ]
        }
      )
    }
  );
}
function Aa({ className: e } = {}) {
  const { toggle: t } = et();
  return /* @__PURE__ */ g(
    "button",
    {
      type: "button",
      onClick: t,
      "data-testid": "command-palette-hint",
      className: E(
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
function Da({
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
  const u = mr(), f = `${u}-label`, p = t || r ? `${u}-desc` : void 0, v = {
    id: u,
    labelId: f,
    "aria-describedby": p,
    "aria-invalid": r ? !0 : void 0
  };
  return /* @__PURE__ */ g(
    "div",
    {
      "data-testid": d,
      className: E(
        o === "inline" ? "flex items-center gap-3" : "flex flex-col gap-1",
        l
      ),
      style: i,
      children: [
        /* @__PURE__ */ g(
          "label",
          {
            id: f,
            htmlFor: u,
            className: E(
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
        /* @__PURE__ */ g("div", { className: E(o === "inline" ? "flex-1" : ""), children: [
          a(v),
          (t || r) && /* @__PURE__ */ c(
            "div",
            {
              id: p,
              className: E(
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
function Oa({
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
  style: f,
  "data-testid": p
}) {
  const v = E(
    "block rounded-lg border p-3 no-underline transition-colors",
    !r && !n && "bg-[var(--color-surface)] border-[var(--color-border)]",
    r && "bg-[var(--color-primary-soft)] border-l-[3px] border-l-[var(--color-primary)] border-[var(--color-border)]",
    n && "bg-[var(--color-danger-bg)] border-l-[3px] border-l-[var(--color-danger)] border-[var(--color-border)]",
    (a || i) && "hover:bg-[var(--color-surface-hover)] cursor-pointer",
    u
  ), b = /* @__PURE__ */ g(q, { children: [
    /* @__PURE__ */ c("div", { className: "text-[12px] uppercase tracking-wide text-[var(--color-text-tertiary)]", children: e }),
    /* @__PURE__ */ c(
      "div",
      {
        className: E(
          "mt-1 text-[24px] font-bold leading-tight text-[var(--color-text-primary)]",
          d && "font-mono"
        ),
        children: t
      }
    ),
    o != null && /* @__PURE__ */ c("div", { className: "mt-1 text-[11px] italic text-[var(--color-text-tertiary)]", children: o })
  ] });
  return a ? l ? /* @__PURE__ */ c(l, { to: a, "data-testid": p, className: v, style: f, children: b }) : /* @__PURE__ */ c("a", { href: a, "data-testid": p, className: v, style: f, children: b }) : i ? /* @__PURE__ */ c(
    "button",
    {
      type: "button",
      onClick: i,
      "data-testid": p,
      className: E(v, "w-full text-left"),
      style: f,
      children: b
    }
  ) : /* @__PURE__ */ c("div", { "data-testid": p, className: v, style: f, children: b });
}
const Yo = {
  sm: "w-[14px] h-[14px]",
  md: "w-[20px] h-[20px]",
  lg: "w-[28px] h-[28px]"
};
function Ia({
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
      className: E(
        "inline-block rounded-full border-2 border-transparent animate-spin",
        Yo[e],
        r
      ),
      style: { borderTopColor: l, ...n }
    }
  );
}
const qo = {
  sm: "h-1.5",
  md: "h-2"
};
function La({
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
  const f = t > 0 ? t : 100, p = Math.max(0, Math.min(e, f)), v = Math.min(100, p / f * 100), b = r ?? "var(--color-primary)";
  return /* @__PURE__ */ g("div", { "data-testid": d, className: E("w-full", l), style: i, children: [
    o != null && /* @__PURE__ */ g("div", { className: "flex items-center justify-between mb-1 text-[12px] text-[var(--color-text-secondary)]", children: [
      /* @__PURE__ */ c("span", { children: o }),
      /* @__PURE__ */ c("span", { className: "text-[var(--color-text-tertiary)] tabular-nums", children: a ? `${p}/${f}` : `${Math.round(v)}%` })
    ] }),
    /* @__PURE__ */ c(
      "div",
      {
        role: "progressbar",
        "aria-valuenow": p,
        "aria-valuemin": 0,
        "aria-valuemax": f,
        "aria-label": u,
        className: E(
          "w-full rounded-full overflow-hidden bg-[var(--color-surface-hover)]",
          qo[n]
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
const Xo = {
  sm: "px-2.5 py-0.5 text-[11px]",
  xs: "px-2 py-px text-[10px]"
}, Zo = "bg-[var(--color-surface)] border-[var(--color-border)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] hover:border-[var(--color-border-emphasis)]", Qo = "bg-[var(--color-primary)] border-[var(--color-primary)] text-white hover:opacity-90", Jo = "border-[var(--color-border-emphasis)] text-[var(--color-text-primary)]";
function Ta({
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
      className: E(
        "inline-flex items-center gap-1.5 rounded-full font-semibold border transition-colors cursor-pointer select-none",
        Xo[o],
        e ? d ? Jo : Qo : Zo,
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
const ea = {
  sm: "px-2.5 py-1 text-xs",
  md: "px-3 py-1.5 text-sm"
}, ta = "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]", ra = "bg-white shadow-sm text-[var(--color-text-primary)] border border-[var(--color-border)]";
function Ma({
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
      className: E(
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
            className: E(
              "inline-flex items-center gap-1.5 rounded-md font-medium transition-all cursor-pointer",
              ea[n],
              l ? ra : ta
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
function _a({
  label: e,
  id: t,
  href: r,
  mono: n = !1,
  className: o,
  labelClassName: a
}) {
  const l = /* @__PURE__ */ c("span", { className: "truncate", children: e });
  return /* @__PURE__ */ g("div", { className: E("flex flex-col min-w-0", o), children: [
    /* @__PURE__ */ c(
      "div",
      {
        className: E(
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
        className: E(
          "text-[10px] font-mono text-[var(--color-text-tertiary)] truncate mt-0.5",
          n && "tracking-tight"
        ),
        children: t
      }
    )
  ] });
}
const na = [
  "a[href]",
  "button:not([disabled])",
  'input:not([disabled]):not([type="hidden"])',
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
  '[contenteditable="true"]'
].join(",");
function Fa({
  open: e,
  onClose: t,
  title: r,
  subtitle: n,
  width: o = 460,
  children: a,
  footer: l,
  "data-testid": i
}) {
  const d = Ne(null);
  return F(() => {
    if (!e) return;
    const u = (f) => {
      f.key === "Escape" && t();
    };
    return window.addEventListener("keydown", u), () => window.removeEventListener("keydown", u);
  }, [e, t]), F(() => {
    if (!e) return;
    const u = d.current;
    if (!u) return;
    const f = u.querySelector(na);
    f ? f.focus() : (u.setAttribute("tabindex", "-1"), u.focus());
  }, [e]), e ? Nt(
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
          className: E(
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
function oa(e, t) {
  if (!e || typeof window > "u") return t;
  try {
    const r = window.localStorage.getItem(e);
    return r === null ? t : r === "true";
  } catch {
    return t;
  }
}
function $a({
  title: e,
  defaultOpen: t = !1,
  badge: r,
  children: n,
  className: o,
  storageKey: a
}) {
  const [l, i] = X(
    () => oa(a, t)
  );
  return F(() => {
    if (a && !(typeof window > "u"))
      try {
        window.localStorage.setItem(a, String(l));
      } catch {
      }
  }, [l, a]), /* @__PURE__ */ g(
    "div",
    {
      className: E(
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
                    className: E(
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
function Wa({
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
      className: E("relative inline-flex items-center", o),
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
const aa = {
  error: "bg-[var(--color-danger-bg,#fef2f2)] border-[var(--color-danger,#dc2626)] text-[var(--color-danger,#dc2626)]",
  success: "bg-[var(--color-success-bg,#f0fdf4)] border-[var(--color-success,#16a34a)] text-[var(--color-success,#16a34a)]",
  info: "bg-[var(--color-info-bg,#eff6ff)] border-[var(--color-info,#2563eb)] text-[var(--color-info,#2563eb)]",
  warning: "bg-[var(--color-warning-bg,#fffbeb)] border-[var(--color-warning,#f59e0b)] text-[var(--color-warning,#f59e0b)]"
};
function Ba({ tone: e, children: t, onDismiss: r, className: n }) {
  return /* @__PURE__ */ g(
    "div",
    {
      role: e === "error" || e === "warning" ? "alert" : "status",
      "aria-live": e === "error" || e === "warning" ? "assertive" : "polite",
      className: E(
        "flex items-start gap-2 px-3 py-2 rounded-md border-l-[3px] text-sm",
        aa[e],
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
function ja({ title: e, subtitle: t, meta: r, action: n, className: o }) {
  return /* @__PURE__ */ g("div", { className: E("flex items-center justify-between gap-4", o), children: [
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
function Ua({
  title: e,
  description: t,
  actions: r,
  back: n,
  badge: o,
  className: a
}) {
  return /* @__PURE__ */ g("div", { className: E("flex flex-col gap-1.5", a), children: [
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
function Ye({ size: e = "md", color: t, className: r }) {
  const n = e === "sm" ? 4 : 6, o = t || "var(--color-text-tertiary, #94a3b8)";
  return /* @__PURE__ */ g(q, { children: [
    /* @__PURE__ */ c("style", { children: `
        @keyframes thinkDot {
          0%, 80%, 100% { transform: scale(1); opacity: 0.4; }
          40% { transform: scale(1.3); opacity: 1; }
        }
      ` }),
    /* @__PURE__ */ c("span", { className: E("inline-flex items-center gap-1", r), children: [0, 1, 2].map((a) => /* @__PURE__ */ c(
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
function Va({
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
  maxRows: f = 4
}) {
  const p = !n && e.trim().length > 0, v = () => {
    p && r();
  }, b = (m) => {
    if (m.key === "Enter") {
      if (o && m.shiftKey) return;
      m.preventDefault(), v();
    }
  }, y = E(
    "flex-1 px-3 py-2 text-sm rounded-lg border border-[var(--color-border-field,#d1d5db)] bg-white text-[var(--color-text-primary)]",
    "placeholder:text-[var(--color-text-tertiary)]",
    "focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent",
    "resize-none",
    n && "opacity-50 cursor-not-allowed bg-[var(--color-surface-hover)]"
  );
  return /* @__PURE__ */ g(
    "div",
    {
      className: E(
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
            onChange: (m) => t(m.target.value),
            onKeyDown: b,
            disabled: n,
            placeholder: a,
            autoFocus: u,
            rows: 2,
            style: { maxHeight: `${f * 1.5 + 1}rem`, overflowY: "auto" }
          }
        ) : /* @__PURE__ */ c(
          "input",
          {
            type: "text",
            className: y,
            value: e,
            onChange: (m) => t(m.target.value),
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
            disabled: !p,
            className: E(
              "px-3 py-2 rounded-lg text-sm font-semibold transition-colors flex-shrink-0",
              p ? "bg-[var(--color-primary)] text-white hover:opacity-90" : "bg-[var(--color-surface-hover)] text-[var(--color-text-tertiary)] cursor-not-allowed"
            ),
            children: l
          }
        )
      ]
    }
  );
}
function ia({ name: e, done: t, className: r }) {
  return /* @__PURE__ */ g(
    "span",
    {
      className: E(
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
function la({ toolCalls: e, className: t }) {
  return /* @__PURE__ */ c("div", { className: E("flex flex-wrap gap-1.5 py-1", t), children: e.map((r) => /* @__PURE__ */ c(ia, { name: r.name, done: r.done }, r.id)) });
}
function Ka({
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
  return /* @__PURE__ */ g("div", { className: E("flex flex-col gap-1.5 py-3", i), children: [
    /* @__PURE__ */ c("div", { className: "text-[11px] font-semibold uppercase tracking-wide text-[var(--color-text-tertiary)]", children: d }),
    r && r.length > 0 && /* @__PURE__ */ c(la, { toolCalls: r }),
    e === "user" ? /* @__PURE__ */ c("div", { className: "text-sm text-[var(--color-text-primary)] whitespace-pre-wrap", children: t }) : /* @__PURE__ */ c("div", { className: "text-sm text-[var(--color-text-primary)] prose-sm max-w-none", children: t ? l ? l(t) : /* @__PURE__ */ c("span", { className: "whitespace-pre-wrap", children: t }) : n ? /* @__PURE__ */ c(Ye, {}) : null })
  ] });
}
function za({
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
      className: E(
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
          t && !e && /* @__PURE__ */ c(Ye, { size: "sm" })
        ] }),
        /* @__PURE__ */ c("div", { className: "px-3 py-2 text-xs text-[var(--color-text-secondary)] italic border-t border-[var(--color-border)] bg-white whitespace-pre-wrap leading-relaxed", children: e || /* @__PURE__ */ c(Ye, {}) })
      ]
    }
  );
}
function Ha({
  prompts: e,
  onSelect: t,
  columns: r,
  title: n,
  className: o
}) {
  const a = r ? `repeat(${r}, minmax(0, 1fr))` : "repeat(auto-fit, minmax(220px, 1fr))";
  return /* @__PURE__ */ g("div", { className: E("flex flex-col gap-3", o), children: [
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
function Ga({
  suggestions: e,
  onSelect: t,
  onRefresh: r,
  label: n,
  className: o
}) {
  return /* @__PURE__ */ g("div", { className: E("flex items-center flex-wrap gap-1.5 py-2", o), children: [
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
function Ya({
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
      className: E(
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
            ) : /* @__PURE__ */ c(kt, { name: e, size: 36 }),
            a !== void 0 && /* @__PURE__ */ c("span", { className: "absolute -bottom-0.5 -right-0.5", children: /* @__PURE__ */ c(
              xr,
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
                  className: E(
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
function qa({ user: e, items: t, className: r, "data-testid": n }) {
  const [o, a] = X(!1), l = Ne(null), i = se(() => a(!1), []);
  return F(() => {
    if (!o) return;
    const d = (u) => {
      l.current && !l.current.contains(u.target) && i();
    };
    return document.addEventListener("mousedown", d), () => document.removeEventListener("mousedown", d);
  }, [o, i]), F(() => {
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
      className: E("relative inline-block", r),
      children: [
        /* @__PURE__ */ g(
          "button",
          {
            type: "button",
            "aria-label": `User menu for ${e.name}`,
            "aria-expanded": o,
            "aria-haspopup": "menu",
            onClick: () => a((d) => !d),
            className: E(
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
              ) : /* @__PURE__ */ c(kt, { name: e.name, size: 32 }),
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
                  className: E(
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
            className: E(
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
                    className: E(
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
function sa({ item: e, isLast: t }) {
  const r = E(
    "text-sm leading-snug transition-colors duration-100",
    t ? "text-[var(--color-text-primary)] font-medium cursor-default" : "text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] font-normal"
  );
  return t || !e.href && !e.onClick ? /* @__PURE__ */ c("span", { className: r, "aria-current": t ? "page" : void 0, children: e.label }) : e.href ? /* @__PURE__ */ c("a", { href: e.href, onClick: e.onClick, className: E(r, "no-underline"), children: e.label }) : /* @__PURE__ */ c(
    "button",
    {
      type: "button",
      onClick: e.onClick,
      className: E(r, "border-none bg-transparent cursor-pointer font-[inherit] p-0"),
      children: e.label
    }
  );
}
function ca(e, t) {
  if (e.length <= t) return e;
  const r = e.slice(0, 1), n = e.slice(-(t - 2 > 0 ? t - 2 : 1));
  return [...r, null, ...n];
}
function Xa({
  items: e,
  separator: t = "/",
  maxItems: r,
  className: n,
  "data-testid": o
}) {
  if (e.length === 0) return null;
  const a = r != null ? ca(e, r) : e;
  return /* @__PURE__ */ c("nav", { "aria-label": "Breadcrumb", "data-testid": o, className: E("flex items-center", n), children: /* @__PURE__ */ c("ol", { className: "flex items-center gap-1 flex-wrap list-none m-0 p-0", children: a.map((l, i) => {
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
      ) : /* @__PURE__ */ c(sa, { item: l, isLast: d }),
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
const ua = {
  active: { bg: "#f0fdf4", border: "#86efac", text: "#166534", accent: "#16a34a" },
  in_progress: { bg: "#eff6ff", border: "#93c5fd", text: "#1e40af", accent: "#3b82f6" },
  completed: { bg: "#f0fdf4", border: "#86efac", text: "#166534", accent: "#16a34a" },
  archived: { bg: "#f9fafb", border: "#d1d5db", text: "#6b7280", accent: "#9ca3af" },
  planning: { bg: "#fefce8", border: "#fde047", text: "#713f12", accent: "#eab308" },
  paused: { bg: "#fff7ed", border: "#fdba74", text: "#9a3412", accent: "#f97316" }
}, da = {
  bg: "#f3f4f6",
  border: "#d1d5db",
  text: "#374151",
  accent: "#6b7280"
};
function fa({ status: e, colors: t }) {
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
function Za({
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
  onClick: f,
  className: p,
  style: v,
  minHeight: b = 190
}) {
  const y = { ...ua, ...n }, m = (r ?? "unknown").toLowerCase().replace(/ /g, "_"), x = y[m] ?? da, C = a !== void 0 ? Math.max(0, a - o.length) : 0, R = u % 8 * 525;
  return /* @__PURE__ */ g(
    "button",
    {
      type: "button",
      onClick: f,
      className: p,
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
        const k = P.currentTarget;
        k.style.boxShadow = "0 4px 16px rgba(0,0,0,0.08)", k.style.transform = "translateY(-1px)", k.style.borderColor = x.border;
      },
      onMouseLeave: (P) => {
        const k = P.currentTarget;
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
              r && /* @__PURE__ */ c(fa, { status: r, colors: x })
            ]
          }
        ),
        /* @__PURE__ */ c(yr, { items: l, staggerMs: R }),
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
                o.length > 0 ? /* @__PURE__ */ c(wr, { names: o, maxVisible: 5, size: 24 }) : /* @__PURE__ */ g("span", { style: { fontSize: 12, color: "#9ca3af" }, children: [
                  /* @__PURE__ */ c("strong", { style: { color: "#374151" }, children: a ?? 0 }),
                  " contributors"
                ] }),
                o.length > 0 && C > 0 && /* @__PURE__ */ g("span", { style: { fontSize: 11, color: "#9ca3af" }, children: [
                  "+",
                  C,
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
function pa(e) {
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
function Et({
  items: e,
  storageKey: t,
  title: r,
  renderNavItem: n
}) {
  const o = qe(() => pa(e), [e]), a = o.some((l) => l.name !== null);
  return /* @__PURE__ */ c("nav", { className: "flex-1 overflow-y-auto py-1", children: a ? o.map(
    (l) => l.name === null ? /* @__PURE__ */ c(Ct, { items: l.items, renderNavItem: n }, "__ungrouped") : /* @__PURE__ */ c(
      ma,
      {
        name: l.name,
        items: l.items,
        storageKey: `${t}.${r}.${l.name}`,
        renderNavItem: n
      },
      l.name
    )
  ) : /* @__PURE__ */ c(Ct, { items: e, renderNavItem: n }) });
}
function Qa({
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
  renderNavItem: f,
  children: p
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
          /* @__PURE__ */ c(Et, { items: t, storageKey: a, title: e, renderNavItem: f })
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
            Et,
            {
              items: i,
              storageKey: d ?? `${a}.secondary`,
              title: l ?? "secondary",
              renderNavItem: f
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ c("main", { className: "flex-1 min-w-0 overflow-auto p-6", children: p })
  ] });
}
function Ct({
  items: e,
  renderNavItem: t
}) {
  return /* @__PURE__ */ c(q, { children: e.map((r) => /* @__PURE__ */ c(dr, { item: r, renderNavItem: t }, r.path)) });
}
function ma({
  name: e,
  items: t,
  storageKey: r,
  renderNavItem: n
}) {
  const [o, a] = X(() => typeof window > "u" ? !1 : window.localStorage?.getItem(r) === "1");
  F(() => {
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
    !o && /* @__PURE__ */ c("div", { style: i, children: t.map((d) => /* @__PURE__ */ c(dr, { item: d, renderNavItem: n }, d.path)) })
  ] });
}
function dr({
  item: e,
  renderNavItem: t
}) {
  const r = e.accent === "danger" ? "#dc2626" : e.accent === "warning" ? "#d97706" : e.accent === "success" ? "#16a34a" : void 0, n = /* @__PURE__ */ g(q, { children: [
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
  ) : t ? /* @__PURE__ */ c(q, { children: t(e, n, o) }) : /* @__PURE__ */ c(
    "a",
    {
      href: e.path,
      className: "block px-[14px] py-2 border-l-[3px] border-transparent text-[var(--color-text-secondary)] no-underline cursor-pointer",
      children: n
    }
  );
}
const va = [
  "a[href]",
  "button:not([disabled])",
  'input:not([disabled]):not([type="hidden"])',
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
  '[contenteditable="true"]'
].join(",");
function St(e) {
  return Array.from(e.querySelectorAll(va)).filter(
    (t) => t.getAttribute("aria-hidden") !== "true"
  );
}
function ha(e, t, r) {
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
function Ja({
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
  const u = Ne(null), [f, p] = X(null), v = Ne(null), b = se(() => {
    const y = e.current;
    if (!y) return;
    const m = y.getBoundingClientRect();
    p(ha(m, n, o));
  }, [e, n, o]);
  return vr(() => {
    if (!t) {
      p(null);
      return;
    }
    b();
  }, [t, b]), F(() => {
    if (!t) return;
    const y = () => b();
    return window.addEventListener("scroll", y, !0), window.addEventListener("resize", y), () => {
      window.removeEventListener("scroll", y, !0), window.removeEventListener("resize", y);
    };
  }, [t, b]), F(() => {
    if (!t) return;
    const y = typeof document < "u" ? document.activeElement : null;
    return v.current = y, queueMicrotask(() => {
      const m = u.current;
      if (!m) return;
      const x = St(m);
      x.length > 0 ? x[0].focus() : (m.setAttribute("tabindex", "-1"), m.focus());
    }), () => {
      const m = v.current;
      m && typeof m.focus == "function" && document.contains(m) && m.focus(), v.current = null;
    };
  }, [t]), F(() => {
    if (!t) return;
    const y = (m) => {
      if (m.key === "Escape") {
        m.stopPropagation(), r();
        return;
      }
      if (m.key !== "Tab") return;
      const x = u.current;
      if (!x) return;
      const C = St(x);
      if (C.length === 0) {
        m.preventDefault();
        return;
      }
      const R = C[0], P = C[C.length - 1], k = document.activeElement;
      if (!k || !x.contains(k)) {
        m.preventDefault(), R.focus();
        return;
      }
      m.shiftKey && k === R ? (m.preventDefault(), P.focus()) : !m.shiftKey && k === P && (m.preventDefault(), R.focus());
    };
    return window.addEventListener("keydown", y), () => window.removeEventListener("keydown", y);
  }, [t, r]), F(() => {
    if (!t) return;
    const y = (m) => {
      const x = m.target;
      x && (u.current?.contains(x) || e.current?.contains(x) || r());
    };
    return document.addEventListener("mousedown", y), () => document.removeEventListener("mousedown", y);
  }, [t, r, e]), !t || !f || typeof document > "u" ? null : Nt(
    /* @__PURE__ */ c(
      "div",
      {
        ref: u,
        role: "dialog",
        "data-testid": i,
        "data-placement": n,
        className: E(
          "min-w-[160px] rounded-lg border border-slate-200 bg-white",
          "shadow-lg p-1 text-sm text-slate-700",
          a
        ),
        style: { ...f, zIndex: l },
        children: d
      }
    ),
    document.body
  );
}
export {
  Xa as B,
  ja as C,
  Fa as D,
  _a as E,
  Ta as F,
  Ba as I,
  Ka as M,
  Ua as P,
  Ha as Q,
  Wa as S,
  za as T,
  qa as U,
  Ya as a,
  Va as b,
  $a as c,
  Pa as d,
  Aa as e,
  Ra as f,
  Ga as g,
  Da as h,
  Ja as i,
  La as j,
  Za as k,
  Ma as l,
  Ia as m,
  Oa as n,
  Qa as o,
  Ye as p,
  ia as q,
  la as r,
  ka as u
};
