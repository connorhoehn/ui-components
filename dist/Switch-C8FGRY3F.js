import { jsx as g, jsxs as B, Fragment as tt } from "react/jsx-runtime";
import * as i from "react";
import { useState as Be, createContext as rn, useMemo as yt, useCallback as be, useEffect as on, useContext as an, useId as ln } from "react";
import * as sn from "react-dom";
import cn from "react-dom";
import { c as L } from "./cn-B6yFEsav.js";
import { M as un } from "./Modal-2jg4229_.js";
var nt = 1, dn = 0.9, fn = 0.8, vn = 0.17, Ie = 0.1, Ae = 0.999, mn = 0.9999, pn = 0.99, hn = /[\\\/_+.#"@\[\(\{&]/, gn = /[\\\/_+.#"@\[\(\{&]/g, yn = /[\s-]/, bt = /[\s-]/g;
function Ue(e, t, n, r, o, a, s) {
  if (a === t.length) return o === e.length ? nt : pn;
  var l = `${o},${a}`;
  if (s[l] !== void 0) return s[l];
  for (var u = r.charAt(a), c = n.indexOf(u, o), d = 0, f, m, h, C; c >= 0; ) f = Ue(e, t, n, r, c + 1, a + 1, s), f > d && (c === o ? f *= nt : hn.test(e.charAt(c - 1)) ? (f *= fn, h = e.slice(o, c - 1).match(gn), h && o > 0 && (f *= Math.pow(Ae, h.length))) : yn.test(e.charAt(c - 1)) ? (f *= dn, C = e.slice(o, c - 1).match(bt), C && o > 0 && (f *= Math.pow(Ae, C.length))) : (f *= vn, o > 0 && (f *= Math.pow(Ae, c - o))), e.charAt(c) !== t.charAt(a) && (f *= mn)), (f < Ie && n.charAt(c - 1) === r.charAt(a + 1) || r.charAt(a + 1) === r.charAt(a) && n.charAt(c - 1) !== r.charAt(a)) && (m = Ue(e, t, n, r, c + 1, a + 2, s), m * Ie > f && (f = m * Ie)), f > d && (d = f), c = n.indexOf(u, c + 1);
  return s[l] = d, d;
}
function rt(e) {
  return e.toLowerCase().replace(bt, " ");
}
function bn(e, t, n) {
  return e = n && n.length > 0 ? `${e + " " + n.join(" ")}` : e, Ue(e, t, rt(e), rt(t), 0, 0, {});
}
function K(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
  return function(o) {
    if (e?.(o), n === !1 || !o.defaultPrevented)
      return t?.(o);
  };
}
function ot(e, t) {
  if (typeof e == "function")
    return e(t);
  e != null && (e.current = t);
}
function H(...e) {
  return (t) => {
    let n = !1;
    const r = e.map((o) => {
      const a = ot(o, t);
      return !n && typeof a == "function" && (n = !0), a;
    });
    if (n)
      return () => {
        for (let o = 0; o < r.length; o++) {
          const a = r[o];
          typeof a == "function" ? a() : ot(e[o], null);
        }
      };
  };
}
function X(...e) {
  return i.useCallback(H(...e), e);
}
function En(e, t) {
  const n = i.createContext(t), r = (a) => {
    const { children: s, ...l } = a, u = i.useMemo(() => l, Object.values(l));
    return /* @__PURE__ */ g(n.Provider, { value: u, children: s });
  };
  r.displayName = e + "Provider";
  function o(a) {
    const s = i.useContext(n);
    if (s) return s;
    if (t !== void 0) return t;
    throw new Error(`\`${a}\` must be used within \`${e}\``);
  }
  return [r, o];
}
function wn(e, t = []) {
  let n = [];
  function r(a, s) {
    const l = i.createContext(s), u = n.length;
    n = [...n, s];
    const c = (f) => {
      const { scope: m, children: h, ...C } = f, p = m?.[e]?.[u] || l, b = i.useMemo(() => C, Object.values(C));
      return /* @__PURE__ */ g(p.Provider, { value: b, children: h });
    };
    c.displayName = a + "Provider";
    function d(f, m) {
      const h = m?.[e]?.[u] || l, C = i.useContext(h);
      if (C) return C;
      if (s !== void 0) return s;
      throw new Error(`\`${f}\` must be used within \`${a}\``);
    }
    return [c, d];
  }
  const o = () => {
    const a = n.map((s) => i.createContext(s));
    return function(l) {
      const u = l?.[e] || a;
      return i.useMemo(
        () => ({ [`__scope${e}`]: { ...l, [e]: u } }),
        [l, u]
      );
    };
  };
  return o.scopeName = e, [r, Cn(o, ...t)];
}
function Cn(...e) {
  const t = e[0];
  if (e.length === 1) return t;
  const n = () => {
    const r = e.map((o) => ({
      useScope: o(),
      scopeName: o.scopeName
    }));
    return function(a) {
      const s = r.reduce((l, { useScope: u, scopeName: c }) => {
        const f = u(a)[`__scope${c}`];
        return { ...l, ...f };
      }, {});
      return i.useMemo(() => ({ [`__scope${t.scopeName}`]: s }), [s]);
    };
  };
  return n.scopeName = t.scopeName, n;
}
var se = globalThis?.document ? i.useLayoutEffect : () => {
}, Sn = i[" useId ".trim().toString()] || (() => {
}), xn = 0;
function U(e) {
  const [t, n] = i.useState(Sn());
  return se(() => {
    n((r) => r ?? String(xn++));
  }, [e]), t ? `radix-${t}` : "";
}
var Rn = i[" useInsertionEffect ".trim().toString()] || se;
function Pn({
  prop: e,
  defaultProp: t,
  onChange: n = () => {
  },
  caller: r
}) {
  const [o, a, s] = Nn({
    defaultProp: t,
    onChange: n
  }), l = e !== void 0, u = l ? e : o;
  {
    const d = i.useRef(e !== void 0);
    i.useEffect(() => {
      const f = d.current;
      f !== l && console.warn(
        `${r} is changing from ${f ? "controlled" : "uncontrolled"} to ${l ? "controlled" : "uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`
      ), d.current = l;
    }, [l, r]);
  }
  const c = i.useCallback(
    (d) => {
      if (l) {
        const f = On(d) ? d(e) : d;
        f !== e && s.current?.(f);
      } else
        a(d);
    },
    [l, e, a, s]
  );
  return [u, c];
}
function Nn({
  defaultProp: e,
  onChange: t
}) {
  const [n, r] = i.useState(e), o = i.useRef(n), a = i.useRef(t);
  return Rn(() => {
    a.current = t;
  }, [t]), i.useEffect(() => {
    o.current !== n && (a.current?.(n), o.current = n);
  }, [n, o]), [n, r, a];
}
function On(e) {
  return typeof e == "function";
}
// @__NO_SIDE_EFFECTS__
function ue(e) {
  const t = /* @__PURE__ */ Dn(e), n = i.forwardRef((r, o) => {
    const { children: a, ...s } = r, l = i.Children.toArray(a), u = l.find(An);
    if (u) {
      const c = u.props.children, d = l.map((f) => f === u ? i.Children.count(c) > 1 ? i.Children.only(null) : i.isValidElement(c) ? c.props.children : null : f);
      return /* @__PURE__ */ g(t, { ...s, ref: o, children: i.isValidElement(c) ? i.cloneElement(c, void 0, d) : null });
    }
    return /* @__PURE__ */ g(t, { ...s, ref: o, children: a });
  });
  return n.displayName = `${e}.Slot`, n;
}
// @__NO_SIDE_EFFECTS__
function Dn(e) {
  const t = i.forwardRef((n, r) => {
    const { children: o, ...a } = n;
    if (i.isValidElement(o)) {
      const s = Tn(o), l = kn(a, o.props);
      return o.type !== i.Fragment && (l.ref = r ? H(r, s) : s), i.cloneElement(o, l);
    }
    return i.Children.count(o) > 1 ? i.Children.only(null) : null;
  });
  return t.displayName = `${e}.SlotClone`, t;
}
var In = /* @__PURE__ */ Symbol("radix.slottable");
function An(e) {
  return i.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === In;
}
function kn(e, t) {
  const n = { ...t };
  for (const r in t) {
    const o = e[r], a = t[r];
    /^on[A-Z]/.test(r) ? o && a ? n[r] = (...l) => {
      const u = a(...l);
      return o(...l), u;
    } : o && (n[r] = o) : r === "style" ? n[r] = { ...o, ...a } : r === "className" && (n[r] = [o, a].filter(Boolean).join(" "));
  }
  return { ...e, ...n };
}
function Tn(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var Mn = [
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
], Et = Mn.reduce((e, t) => {
  const n = /* @__PURE__ */ ue(`Primitive.${t}`), r = i.forwardRef((o, a) => {
    const { asChild: s, ...l } = o, u = s ? n : t;
    return typeof window < "u" && (window[/* @__PURE__ */ Symbol.for("radix-ui")] = !0), /* @__PURE__ */ g(u, { ...l, ref: a });
  });
  return r.displayName = `Primitive.${t}`, { ...e, [t]: r };
}, {});
function Ln(e, t) {
  e && sn.flushSync(() => e.dispatchEvent(t));
}
function ce(e) {
  const t = i.useRef(e);
  return i.useEffect(() => {
    t.current = e;
  }), i.useMemo(() => (...n) => t.current?.(...n), []);
}
function _n(e, t = globalThis?.document) {
  const n = ce(e);
  i.useEffect(() => {
    const r = (o) => {
      o.key === "Escape" && n(o);
    };
    return t.addEventListener("keydown", r, { capture: !0 }), () => t.removeEventListener("keydown", r, { capture: !0 });
  }, [n, t]);
}
var Fn = "DismissableLayer", Ve = "dismissableLayer.update", $n = "dismissableLayer.pointerDownOutside", Wn = "dismissableLayer.focusOutside", at, wt = i.createContext({
  layers: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
}), Ct = i.forwardRef(
  (e, t) => {
    const {
      disableOutsidePointerEvents: n = !1,
      onEscapeKeyDown: r,
      onPointerDownOutside: o,
      onFocusOutside: a,
      onInteractOutside: s,
      onDismiss: l,
      ...u
    } = e, c = i.useContext(wt), [d, f] = i.useState(null), m = d?.ownerDocument ?? globalThis?.document, [, h] = i.useState({}), C = X(t, (E) => f(E)), p = Array.from(c.layers), [b] = [...c.layersWithOutsidePointerEventsDisabled].slice(-1), S = p.indexOf(b), P = d ? p.indexOf(d) : -1, I = c.layersWithOutsidePointerEventsDisabled.size > 0, N = P >= S, O = Vn((E) => {
      const M = E.target, $ = [...c.branches].some((W) => W.contains(M));
      !N || $ || (o?.(E), s?.(E), E.defaultPrevented || l?.());
    }, m), x = jn((E) => {
      const M = E.target;
      [...c.branches].some((W) => W.contains(M)) || (a?.(E), s?.(E), E.defaultPrevented || l?.());
    }, m);
    return _n((E) => {
      P === c.layers.size - 1 && (r?.(E), !E.defaultPrevented && l && (E.preventDefault(), l()));
    }, m), i.useEffect(() => {
      if (d)
        return n && (c.layersWithOutsidePointerEventsDisabled.size === 0 && (at = m.body.style.pointerEvents, m.body.style.pointerEvents = "none"), c.layersWithOutsidePointerEventsDisabled.add(d)), c.layers.add(d), it(), () => {
          n && c.layersWithOutsidePointerEventsDisabled.size === 1 && (m.body.style.pointerEvents = at);
        };
    }, [d, m, n, c]), i.useEffect(() => () => {
      d && (c.layers.delete(d), c.layersWithOutsidePointerEventsDisabled.delete(d), it());
    }, [d, c]), i.useEffect(() => {
      const E = () => h({});
      return document.addEventListener(Ve, E), () => document.removeEventListener(Ve, E);
    }, []), /* @__PURE__ */ g(
      Et.div,
      {
        ...u,
        ref: C,
        style: {
          pointerEvents: I ? N ? "auto" : "none" : void 0,
          ...e.style
        },
        onFocusCapture: K(e.onFocusCapture, x.onFocusCapture),
        onBlurCapture: K(e.onBlurCapture, x.onBlurCapture),
        onPointerDownCapture: K(
          e.onPointerDownCapture,
          O.onPointerDownCapture
        )
      }
    );
  }
);
Ct.displayName = Fn;
var Bn = "DismissableLayerBranch", Un = i.forwardRef((e, t) => {
  const n = i.useContext(wt), r = i.useRef(null), o = X(t, r);
  return i.useEffect(() => {
    const a = r.current;
    if (a)
      return n.branches.add(a), () => {
        n.branches.delete(a);
      };
  }, [n.branches]), /* @__PURE__ */ g(Et.div, { ...e, ref: o });
});
Un.displayName = Bn;
function Vn(e, t = globalThis?.document) {
  const n = ce(e), r = i.useRef(!1), o = i.useRef(() => {
  });
  return i.useEffect(() => {
    const a = (l) => {
      if (l.target && !r.current) {
        let u = function() {
          St(
            $n,
            n,
            c,
            { discrete: !0 }
          );
        };
        const c = { originalEvent: l };
        l.pointerType === "touch" ? (t.removeEventListener("click", o.current), o.current = u, t.addEventListener("click", o.current, { once: !0 })) : u();
      } else
        t.removeEventListener("click", o.current);
      r.current = !1;
    }, s = window.setTimeout(() => {
      t.addEventListener("pointerdown", a);
    }, 0);
    return () => {
      window.clearTimeout(s), t.removeEventListener("pointerdown", a), t.removeEventListener("click", o.current);
    };
  }, [t, n]), {
    // ensures we check React component tree (not just DOM tree)
    onPointerDownCapture: () => r.current = !0
  };
}
function jn(e, t = globalThis?.document) {
  const n = ce(e), r = i.useRef(!1);
  return i.useEffect(() => {
    const o = (a) => {
      a.target && !r.current && St(Wn, n, { originalEvent: a }, {
        discrete: !1
      });
    };
    return t.addEventListener("focusin", o), () => t.removeEventListener("focusin", o);
  }, [t, n]), {
    onFocusCapture: () => r.current = !0,
    onBlurCapture: () => r.current = !1
  };
}
function it() {
  const e = new CustomEvent(Ve);
  document.dispatchEvent(e);
}
function St(e, t, n, { discrete: r }) {
  const o = n.originalEvent.target, a = new CustomEvent(e, { bubbles: !1, cancelable: !0, detail: n });
  t && o.addEventListener(e, t, { once: !0 }), r ? Ln(o, a) : o.dispatchEvent(a);
}
var Kn = [
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
], Hn = Kn.reduce((e, t) => {
  const n = /* @__PURE__ */ ue(`Primitive.${t}`), r = i.forwardRef((o, a) => {
    const { asChild: s, ...l } = o, u = s ? n : t;
    return typeof window < "u" && (window[/* @__PURE__ */ Symbol.for("radix-ui")] = !0), /* @__PURE__ */ g(u, { ...l, ref: a });
  });
  return r.displayName = `Primitive.${t}`, { ...e, [t]: r };
}, {}), ke = "focusScope.autoFocusOnMount", Te = "focusScope.autoFocusOnUnmount", lt = { bubbles: !1, cancelable: !0 }, Gn = "FocusScope", xt = i.forwardRef((e, t) => {
  const {
    loop: n = !1,
    trapped: r = !1,
    onMountAutoFocus: o,
    onUnmountAutoFocus: a,
    ...s
  } = e, [l, u] = i.useState(null), c = ce(o), d = ce(a), f = i.useRef(null), m = X(t, (p) => u(p)), h = i.useRef({
    paused: !1,
    pause() {
      this.paused = !0;
    },
    resume() {
      this.paused = !1;
    }
  }).current;
  i.useEffect(() => {
    if (r) {
      let p = function(I) {
        if (h.paused || !l) return;
        const N = I.target;
        l.contains(N) ? f.current = N : j(f.current, { select: !0 });
      }, b = function(I) {
        if (h.paused || !l) return;
        const N = I.relatedTarget;
        N !== null && (l.contains(N) || j(f.current, { select: !0 }));
      }, S = function(I) {
        if (document.activeElement === document.body)
          for (const O of I)
            O.removedNodes.length > 0 && j(l);
      };
      document.addEventListener("focusin", p), document.addEventListener("focusout", b);
      const P = new MutationObserver(S);
      return l && P.observe(l, { childList: !0, subtree: !0 }), () => {
        document.removeEventListener("focusin", p), document.removeEventListener("focusout", b), P.disconnect();
      };
    }
  }, [r, l, h.paused]), i.useEffect(() => {
    if (l) {
      ct.add(h);
      const p = document.activeElement;
      if (!l.contains(p)) {
        const S = new CustomEvent(ke, lt);
        l.addEventListener(ke, c), l.dispatchEvent(S), S.defaultPrevented || (Yn(Qn(Rt(l)), { select: !0 }), document.activeElement === p && j(l));
      }
      return () => {
        l.removeEventListener(ke, c), setTimeout(() => {
          const S = new CustomEvent(Te, lt);
          l.addEventListener(Te, d), l.dispatchEvent(S), S.defaultPrevented || j(p ?? document.body, { select: !0 }), l.removeEventListener(Te, d), ct.remove(h);
        }, 0);
      };
    }
  }, [l, c, d, h]);
  const C = i.useCallback(
    (p) => {
      if (!n && !r || h.paused) return;
      const b = p.key === "Tab" && !p.altKey && !p.ctrlKey && !p.metaKey, S = document.activeElement;
      if (b && S) {
        const P = p.currentTarget, [I, N] = qn(P);
        I && N ? !p.shiftKey && S === N ? (p.preventDefault(), n && j(I, { select: !0 })) : p.shiftKey && S === I && (p.preventDefault(), n && j(N, { select: !0 })) : S === P && p.preventDefault();
      }
    },
    [n, r, h.paused]
  );
  return /* @__PURE__ */ g(Hn.div, { tabIndex: -1, ...s, ref: m, onKeyDown: C });
});
xt.displayName = Gn;
function Yn(e, { select: t = !1 } = {}) {
  const n = document.activeElement;
  for (const r of e)
    if (j(r, { select: t }), document.activeElement !== n) return;
}
function qn(e) {
  const t = Rt(e), n = st(t, e), r = st(t.reverse(), e);
  return [n, r];
}
function Rt(e) {
  const t = [], n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (r) => {
      const o = r.tagName === "INPUT" && r.type === "hidden";
      return r.disabled || r.hidden || o ? NodeFilter.FILTER_SKIP : r.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  for (; n.nextNode(); ) t.push(n.currentNode);
  return t;
}
function st(e, t) {
  for (const n of e)
    if (!zn(n, { upTo: t })) return n;
}
function zn(e, { upTo: t }) {
  if (getComputedStyle(e).visibility === "hidden") return !0;
  for (; e; ) {
    if (t !== void 0 && e === t) return !1;
    if (getComputedStyle(e).display === "none") return !0;
    e = e.parentElement;
  }
  return !1;
}
function Xn(e) {
  return e instanceof HTMLInputElement && "select" in e;
}
function j(e, { select: t = !1 } = {}) {
  if (e && e.focus) {
    const n = document.activeElement;
    e.focus({ preventScroll: !0 }), e !== n && Xn(e) && t && e.select();
  }
}
var ct = Zn();
function Zn() {
  let e = [];
  return {
    add(t) {
      const n = e[0];
      t !== n && n?.pause(), e = ut(e, t), e.unshift(t);
    },
    remove(t) {
      e = ut(e, t), e[0]?.resume();
    }
  };
}
function ut(e, t) {
  const n = [...e], r = n.indexOf(t);
  return r !== -1 && n.splice(r, 1), n;
}
function Qn(e) {
  return e.filter((t) => t.tagName !== "A");
}
var Jn = [
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
], er = Jn.reduce((e, t) => {
  const n = /* @__PURE__ */ ue(`Primitive.${t}`), r = i.forwardRef((o, a) => {
    const { asChild: s, ...l } = o, u = s ? n : t;
    return typeof window < "u" && (window[/* @__PURE__ */ Symbol.for("radix-ui")] = !0), /* @__PURE__ */ g(u, { ...l, ref: a });
  });
  return r.displayName = `Primitive.${t}`, { ...e, [t]: r };
}, {}), tr = "Portal", Pt = i.forwardRef((e, t) => {
  const { container: n, ...r } = e, [o, a] = i.useState(!1);
  se(() => a(!0), []);
  const s = n || o && globalThis?.document?.body;
  return s ? cn.createPortal(/* @__PURE__ */ g(er.div, { ...r, ref: t }), s) : null;
});
Pt.displayName = tr;
function nr(e, t) {
  return i.useReducer((n, r) => t[n][r] ?? n, e);
}
var xe = (e) => {
  const { present: t, children: n } = e, r = rr(t), o = typeof n == "function" ? n({ present: r.isPresent }) : i.Children.only(n), a = X(r.ref, or(o));
  return typeof n == "function" || r.isPresent ? i.cloneElement(o, { ref: a }) : null;
};
xe.displayName = "Presence";
function rr(e) {
  const [t, n] = i.useState(), r = i.useRef(null), o = i.useRef(e), a = i.useRef("none"), s = e ? "mounted" : "unmounted", [l, u] = nr(s, {
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
  return i.useEffect(() => {
    const c = me(r.current);
    a.current = l === "mounted" ? c : "none";
  }, [l]), se(() => {
    const c = r.current, d = o.current;
    if (d !== e) {
      const m = a.current, h = me(c);
      e ? u("MOUNT") : h === "none" || c?.display === "none" ? u("UNMOUNT") : u(d && m !== h ? "ANIMATION_OUT" : "UNMOUNT"), o.current = e;
    }
  }, [e, u]), se(() => {
    if (t) {
      let c;
      const d = t.ownerDocument.defaultView ?? window, f = (h) => {
        const p = me(r.current).includes(CSS.escape(h.animationName));
        if (h.target === t && p && (u("ANIMATION_END"), !o.current)) {
          const b = t.style.animationFillMode;
          t.style.animationFillMode = "forwards", c = d.setTimeout(() => {
            t.style.animationFillMode === "forwards" && (t.style.animationFillMode = b);
          });
        }
      }, m = (h) => {
        h.target === t && (a.current = me(r.current));
      };
      return t.addEventListener("animationstart", m), t.addEventListener("animationcancel", f), t.addEventListener("animationend", f), () => {
        d.clearTimeout(c), t.removeEventListener("animationstart", m), t.removeEventListener("animationcancel", f), t.removeEventListener("animationend", f);
      };
    } else
      u("ANIMATION_END");
  }, [t, u]), {
    isPresent: ["mounted", "unmountSuspended"].includes(l),
    ref: i.useCallback((c) => {
      r.current = c ? getComputedStyle(c) : null, n(c);
    }, [])
  };
}
function me(e) {
  return e?.animationName || "none";
}
function or(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var ar = [
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
], de = ar.reduce((e, t) => {
  const n = /* @__PURE__ */ ue(`Primitive.${t}`), r = i.forwardRef((o, a) => {
    const { asChild: s, ...l } = o, u = s ? n : t;
    return typeof window < "u" && (window[/* @__PURE__ */ Symbol.for("radix-ui")] = !0), /* @__PURE__ */ g(u, { ...l, ref: a });
  });
  return r.displayName = `Primitive.${t}`, { ...e, [t]: r };
}, {}), Me = 0;
function ir() {
  i.useEffect(() => {
    const e = document.querySelectorAll("[data-radix-focus-guard]");
    return document.body.insertAdjacentElement("afterbegin", e[0] ?? dt()), document.body.insertAdjacentElement("beforeend", e[1] ?? dt()), Me++, () => {
      Me === 1 && document.querySelectorAll("[data-radix-focus-guard]").forEach((t) => t.remove()), Me--;
    };
  }, []);
}
function dt() {
  const e = document.createElement("span");
  return e.setAttribute("data-radix-focus-guard", ""), e.tabIndex = 0, e.style.outline = "none", e.style.opacity = "0", e.style.position = "fixed", e.style.pointerEvents = "none", e;
}
var F = function() {
  return F = Object.assign || function(t) {
    for (var n, r = 1, o = arguments.length; r < o; r++) {
      n = arguments[r];
      for (var a in n) Object.prototype.hasOwnProperty.call(n, a) && (t[a] = n[a]);
    }
    return t;
  }, F.apply(this, arguments);
};
function Nt(e, t) {
  var n = {};
  for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var o = 0, r = Object.getOwnPropertySymbols(e); o < r.length; o++)
      t.indexOf(r[o]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[o]) && (n[r[o]] = e[r[o]]);
  return n;
}
function lr(e, t, n) {
  if (n || arguments.length === 2) for (var r = 0, o = t.length, a; r < o; r++)
    (a || !(r in t)) && (a || (a = Array.prototype.slice.call(t, 0, r)), a[r] = t[r]);
  return e.concat(a || Array.prototype.slice.call(t));
}
var Ee = "right-scroll-bar-position", we = "width-before-scroll-bar", sr = "with-scroll-bars-hidden", cr = "--removed-body-scroll-bar-size";
function Le(e, t) {
  return typeof e == "function" ? e(t) : e && (e.current = t), e;
}
function ur(e, t) {
  var n = Be(function() {
    return {
      // value
      value: e,
      // last callback
      callback: t,
      // "memoized" public interface
      facade: {
        get current() {
          return n.value;
        },
        set current(r) {
          var o = n.value;
          o !== r && (n.value = r, n.callback(r, o));
        }
      }
    };
  })[0];
  return n.callback = t, n.facade;
}
var dr = typeof window < "u" ? i.useLayoutEffect : i.useEffect, ft = /* @__PURE__ */ new WeakMap();
function fr(e, t) {
  var n = ur(null, function(r) {
    return e.forEach(function(o) {
      return Le(o, r);
    });
  });
  return dr(function() {
    var r = ft.get(n);
    if (r) {
      var o = new Set(r), a = new Set(e), s = n.current;
      o.forEach(function(l) {
        a.has(l) || Le(l, null);
      }), a.forEach(function(l) {
        o.has(l) || Le(l, s);
      });
    }
    ft.set(n, e);
  }, [e]), n;
}
function vr(e) {
  return e;
}
function mr(e, t) {
  t === void 0 && (t = vr);
  var n = [], r = !1, o = {
    read: function() {
      if (r)
        throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");
      return n.length ? n[n.length - 1] : e;
    },
    useMedium: function(a) {
      var s = t(a, r);
      return n.push(s), function() {
        n = n.filter(function(l) {
          return l !== s;
        });
      };
    },
    assignSyncMedium: function(a) {
      for (r = !0; n.length; ) {
        var s = n;
        n = [], s.forEach(a);
      }
      n = {
        push: function(l) {
          return a(l);
        },
        filter: function() {
          return n;
        }
      };
    },
    assignMedium: function(a) {
      r = !0;
      var s = [];
      if (n.length) {
        var l = n;
        n = [], l.forEach(a), s = n;
      }
      var u = function() {
        var d = s;
        s = [], d.forEach(a);
      }, c = function() {
        return Promise.resolve().then(u);
      };
      c(), n = {
        push: function(d) {
          s.push(d), c();
        },
        filter: function(d) {
          return s = s.filter(d), n;
        }
      };
    }
  };
  return o;
}
function pr(e) {
  e === void 0 && (e = {});
  var t = mr(null);
  return t.options = F({ async: !0, ssr: !1 }, e), t;
}
var Ot = function(e) {
  var t = e.sideCar, n = Nt(e, ["sideCar"]);
  if (!t)
    throw new Error("Sidecar: please provide `sideCar` property to import the right car");
  var r = t.read();
  if (!r)
    throw new Error("Sidecar medium not found");
  return i.createElement(r, F({}, n));
};
Ot.isSideCarExport = !0;
function hr(e, t) {
  return e.useMedium(t), Ot;
}
var Dt = pr(), _e = function() {
}, Re = i.forwardRef(function(e, t) {
  var n = i.useRef(null), r = i.useState({
    onScrollCapture: _e,
    onWheelCapture: _e,
    onTouchMoveCapture: _e
  }), o = r[0], a = r[1], s = e.forwardProps, l = e.children, u = e.className, c = e.removeScrollBar, d = e.enabled, f = e.shards, m = e.sideCar, h = e.noRelative, C = e.noIsolation, p = e.inert, b = e.allowPinchZoom, S = e.as, P = S === void 0 ? "div" : S, I = e.gapMode, N = Nt(e, ["forwardProps", "children", "className", "removeScrollBar", "enabled", "shards", "sideCar", "noRelative", "noIsolation", "inert", "allowPinchZoom", "as", "gapMode"]), O = m, x = fr([n, t]), E = F(F({}, N), o);
  return i.createElement(
    i.Fragment,
    null,
    d && i.createElement(O, { sideCar: Dt, removeScrollBar: c, shards: f, noRelative: h, noIsolation: C, inert: p, setCallbacks: a, allowPinchZoom: !!b, lockRef: n, gapMode: I }),
    s ? i.cloneElement(i.Children.only(l), F(F({}, E), { ref: x })) : i.createElement(P, F({}, E, { className: u, ref: x }), l)
  );
});
Re.defaultProps = {
  enabled: !0,
  removeScrollBar: !0,
  inert: !1
};
Re.classNames = {
  fullWidth: we,
  zeroRight: Ee
};
var gr = function() {
  if (typeof __webpack_nonce__ < "u")
    return __webpack_nonce__;
};
function yr() {
  if (!document)
    return null;
  var e = document.createElement("style");
  e.type = "text/css";
  var t = gr();
  return t && e.setAttribute("nonce", t), e;
}
function br(e, t) {
  e.styleSheet ? e.styleSheet.cssText = t : e.appendChild(document.createTextNode(t));
}
function Er(e) {
  var t = document.head || document.getElementsByTagName("head")[0];
  t.appendChild(e);
}
var wr = function() {
  var e = 0, t = null;
  return {
    add: function(n) {
      e == 0 && (t = yr()) && (br(t, n), Er(t)), e++;
    },
    remove: function() {
      e--, !e && t && (t.parentNode && t.parentNode.removeChild(t), t = null);
    }
  };
}, Cr = function() {
  var e = wr();
  return function(t, n) {
    i.useEffect(function() {
      return e.add(t), function() {
        e.remove();
      };
    }, [t && n]);
  };
}, It = function() {
  var e = Cr(), t = function(n) {
    var r = n.styles, o = n.dynamic;
    return e(r, o), null;
  };
  return t;
}, Sr = {
  left: 0,
  top: 0,
  right: 0,
  gap: 0
}, Fe = function(e) {
  return parseInt(e || "", 10) || 0;
}, xr = function(e) {
  var t = window.getComputedStyle(document.body), n = t[e === "padding" ? "paddingLeft" : "marginLeft"], r = t[e === "padding" ? "paddingTop" : "marginTop"], o = t[e === "padding" ? "paddingRight" : "marginRight"];
  return [Fe(n), Fe(r), Fe(o)];
}, Rr = function(e) {
  if (e === void 0 && (e = "margin"), typeof window > "u")
    return Sr;
  var t = xr(e), n = document.documentElement.clientWidth, r = window.innerWidth;
  return {
    left: t[0],
    top: t[1],
    right: t[2],
    gap: Math.max(0, r - n + t[2] - t[0])
  };
}, Pr = It(), ae = "data-scroll-locked", Nr = function(e, t, n, r) {
  var o = e.left, a = e.top, s = e.right, l = e.gap;
  return n === void 0 && (n = "margin"), `
  .`.concat(sr, ` {
   overflow: hidden `).concat(r, `;
   padding-right: `).concat(l, "px ").concat(r, `;
  }
  body[`).concat(ae, `] {
    overflow: hidden `).concat(r, `;
    overscroll-behavior: contain;
    `).concat([
    t && "position: relative ".concat(r, ";"),
    n === "margin" && `
    padding-left: `.concat(o, `px;
    padding-top: `).concat(a, `px;
    padding-right: `).concat(s, `px;
    margin-left:0;
    margin-top:0;
    margin-right: `).concat(l, "px ").concat(r, `;
    `),
    n === "padding" && "padding-right: ".concat(l, "px ").concat(r, ";")
  ].filter(Boolean).join(""), `
  }
  
  .`).concat(Ee, ` {
    right: `).concat(l, "px ").concat(r, `;
  }
  
  .`).concat(we, ` {
    margin-right: `).concat(l, "px ").concat(r, `;
  }
  
  .`).concat(Ee, " .").concat(Ee, ` {
    right: 0 `).concat(r, `;
  }
  
  .`).concat(we, " .").concat(we, ` {
    margin-right: 0 `).concat(r, `;
  }
  
  body[`).concat(ae, `] {
    `).concat(cr, ": ").concat(l, `px;
  }
`);
}, vt = function() {
  var e = parseInt(document.body.getAttribute(ae) || "0", 10);
  return isFinite(e) ? e : 0;
}, Or = function() {
  i.useEffect(function() {
    return document.body.setAttribute(ae, (vt() + 1).toString()), function() {
      var e = vt() - 1;
      e <= 0 ? document.body.removeAttribute(ae) : document.body.setAttribute(ae, e.toString());
    };
  }, []);
}, Dr = function(e) {
  var t = e.noRelative, n = e.noImportant, r = e.gapMode, o = r === void 0 ? "margin" : r;
  Or();
  var a = i.useMemo(function() {
    return Rr(o);
  }, [o]);
  return i.createElement(Pr, { styles: Nr(a, !t, o, n ? "" : "!important") });
}, je = !1;
if (typeof window < "u")
  try {
    var pe = Object.defineProperty({}, "passive", {
      get: function() {
        return je = !0, !0;
      }
    });
    window.addEventListener("test", pe, pe), window.removeEventListener("test", pe, pe);
  } catch {
    je = !1;
  }
var J = je ? { passive: !1 } : !1, Ir = function(e) {
  return e.tagName === "TEXTAREA";
}, At = function(e, t) {
  if (!(e instanceof Element))
    return !1;
  var n = window.getComputedStyle(e);
  return (
    // not-not-scrollable
    n[t] !== "hidden" && // contains scroll inside self
    !(n.overflowY === n.overflowX && !Ir(e) && n[t] === "visible")
  );
}, Ar = function(e) {
  return At(e, "overflowY");
}, kr = function(e) {
  return At(e, "overflowX");
}, mt = function(e, t) {
  var n = t.ownerDocument, r = t;
  do {
    typeof ShadowRoot < "u" && r instanceof ShadowRoot && (r = r.host);
    var o = kt(e, r);
    if (o) {
      var a = Tt(e, r), s = a[1], l = a[2];
      if (s > l)
        return !0;
    }
    r = r.parentNode;
  } while (r && r !== n.body);
  return !1;
}, Tr = function(e) {
  var t = e.scrollTop, n = e.scrollHeight, r = e.clientHeight;
  return [
    t,
    n,
    r
  ];
}, Mr = function(e) {
  var t = e.scrollLeft, n = e.scrollWidth, r = e.clientWidth;
  return [
    t,
    n,
    r
  ];
}, kt = function(e, t) {
  return e === "v" ? Ar(t) : kr(t);
}, Tt = function(e, t) {
  return e === "v" ? Tr(t) : Mr(t);
}, Lr = function(e, t) {
  return e === "h" && t === "rtl" ? -1 : 1;
}, _r = function(e, t, n, r, o) {
  var a = Lr(e, window.getComputedStyle(t).direction), s = a * r, l = n.target, u = t.contains(l), c = !1, d = s > 0, f = 0, m = 0;
  do {
    if (!l)
      break;
    var h = Tt(e, l), C = h[0], p = h[1], b = h[2], S = p - b - a * C;
    (C || S) && kt(e, l) && (f += S, m += C);
    var P = l.parentNode;
    l = P && P.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? P.host : P;
  } while (
    // portaled content
    !u && l !== document.body || // self content
    u && (t.contains(l) || t === l)
  );
  return (d && Math.abs(f) < 1 || !d && Math.abs(m) < 1) && (c = !0), c;
}, he = function(e) {
  return "changedTouches" in e ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY] : [0, 0];
}, pt = function(e) {
  return [e.deltaX, e.deltaY];
}, ht = function(e) {
  return e && "current" in e ? e.current : e;
}, Fr = function(e, t) {
  return e[0] === t[0] && e[1] === t[1];
}, $r = function(e) {
  return `
  .block-interactivity-`.concat(e, ` {pointer-events: none;}
  .allow-interactivity-`).concat(e, ` {pointer-events: all;}
`);
}, Wr = 0, ee = [];
function Br(e) {
  var t = i.useRef([]), n = i.useRef([0, 0]), r = i.useRef(), o = i.useState(Wr++)[0], a = i.useState(It)[0], s = i.useRef(e);
  i.useEffect(function() {
    s.current = e;
  }, [e]), i.useEffect(function() {
    if (e.inert) {
      document.body.classList.add("block-interactivity-".concat(o));
      var p = lr([e.lockRef.current], (e.shards || []).map(ht), !0).filter(Boolean);
      return p.forEach(function(b) {
        return b.classList.add("allow-interactivity-".concat(o));
      }), function() {
        document.body.classList.remove("block-interactivity-".concat(o)), p.forEach(function(b) {
          return b.classList.remove("allow-interactivity-".concat(o));
        });
      };
    }
  }, [e.inert, e.lockRef.current, e.shards]);
  var l = i.useCallback(function(p, b) {
    if ("touches" in p && p.touches.length === 2 || p.type === "wheel" && p.ctrlKey)
      return !s.current.allowPinchZoom;
    var S = he(p), P = n.current, I = "deltaX" in p ? p.deltaX : P[0] - S[0], N = "deltaY" in p ? p.deltaY : P[1] - S[1], O, x = p.target, E = Math.abs(I) > Math.abs(N) ? "h" : "v";
    if ("touches" in p && E === "h" && x.type === "range")
      return !1;
    var M = window.getSelection(), $ = M && M.anchorNode, W = $ ? $ === x || $.contains(x) : !1;
    if (W)
      return !1;
    var V = mt(E, x);
    if (!V)
      return !0;
    if (V ? O = E : (O = E === "v" ? "h" : "v", V = mt(E, x)), !V)
      return !1;
    if (!r.current && "changedTouches" in p && (I || N) && (r.current = O), !O)
      return !0;
    var Z = r.current || O;
    return _r(Z, b, p, Z === "h" ? I : N);
  }, []), u = i.useCallback(function(p) {
    var b = p;
    if (!(!ee.length || ee[ee.length - 1] !== a)) {
      var S = "deltaY" in b ? pt(b) : he(b), P = t.current.filter(function(O) {
        return O.name === b.type && (O.target === b.target || b.target === O.shadowParent) && Fr(O.delta, S);
      })[0];
      if (P && P.should) {
        b.cancelable && b.preventDefault();
        return;
      }
      if (!P) {
        var I = (s.current.shards || []).map(ht).filter(Boolean).filter(function(O) {
          return O.contains(b.target);
        }), N = I.length > 0 ? l(b, I[0]) : !s.current.noIsolation;
        N && b.cancelable && b.preventDefault();
      }
    }
  }, []), c = i.useCallback(function(p, b, S, P) {
    var I = { name: p, delta: b, target: S, should: P, shadowParent: Ur(S) };
    t.current.push(I), setTimeout(function() {
      t.current = t.current.filter(function(N) {
        return N !== I;
      });
    }, 1);
  }, []), d = i.useCallback(function(p) {
    n.current = he(p), r.current = void 0;
  }, []), f = i.useCallback(function(p) {
    c(p.type, pt(p), p.target, l(p, e.lockRef.current));
  }, []), m = i.useCallback(function(p) {
    c(p.type, he(p), p.target, l(p, e.lockRef.current));
  }, []);
  i.useEffect(function() {
    return ee.push(a), e.setCallbacks({
      onScrollCapture: f,
      onWheelCapture: f,
      onTouchMoveCapture: m
    }), document.addEventListener("wheel", u, J), document.addEventListener("touchmove", u, J), document.addEventListener("touchstart", d, J), function() {
      ee = ee.filter(function(p) {
        return p !== a;
      }), document.removeEventListener("wheel", u, J), document.removeEventListener("touchmove", u, J), document.removeEventListener("touchstart", d, J);
    };
  }, []);
  var h = e.removeScrollBar, C = e.inert;
  return i.createElement(
    i.Fragment,
    null,
    C ? i.createElement(a, { styles: $r(o) }) : null,
    h ? i.createElement(Dr, { noRelative: e.noRelative, gapMode: e.gapMode }) : null
  );
}
function Ur(e) {
  for (var t = null; e !== null; )
    e instanceof ShadowRoot && (t = e.host, e = e.host), e = e.parentNode;
  return t;
}
const Vr = hr(Dt, Br);
var Mt = i.forwardRef(function(e, t) {
  return i.createElement(Re, F({}, e, { ref: t, sideCar: Vr }));
});
Mt.classNames = Re.classNames;
var jr = function(e) {
  if (typeof document > "u")
    return null;
  var t = Array.isArray(e) ? e[0] : e;
  return t.ownerDocument.body;
}, te = /* @__PURE__ */ new WeakMap(), ge = /* @__PURE__ */ new WeakMap(), ye = {}, $e = 0, Lt = function(e) {
  return e && (e.host || Lt(e.parentNode));
}, Kr = function(e, t) {
  return t.map(function(n) {
    if (e.contains(n))
      return n;
    var r = Lt(n);
    return r && e.contains(r) ? r : (console.error("aria-hidden", n, "in not contained inside", e, ". Doing nothing"), null);
  }).filter(function(n) {
    return !!n;
  });
}, Hr = function(e, t, n, r) {
  var o = Kr(t, Array.isArray(e) ? e : [e]);
  ye[n] || (ye[n] = /* @__PURE__ */ new WeakMap());
  var a = ye[n], s = [], l = /* @__PURE__ */ new Set(), u = new Set(o), c = function(f) {
    !f || l.has(f) || (l.add(f), c(f.parentNode));
  };
  o.forEach(c);
  var d = function(f) {
    !f || u.has(f) || Array.prototype.forEach.call(f.children, function(m) {
      if (l.has(m))
        d(m);
      else
        try {
          var h = m.getAttribute(r), C = h !== null && h !== "false", p = (te.get(m) || 0) + 1, b = (a.get(m) || 0) + 1;
          te.set(m, p), a.set(m, b), s.push(m), p === 1 && C && ge.set(m, !0), b === 1 && m.setAttribute(n, "true"), C || m.setAttribute(r, "true");
        } catch (S) {
          console.error("aria-hidden: cannot operate on ", m, S);
        }
    });
  };
  return d(t), l.clear(), $e++, function() {
    s.forEach(function(f) {
      var m = te.get(f) - 1, h = a.get(f) - 1;
      te.set(f, m), a.set(f, h), m || (ge.has(f) || f.removeAttribute(r), ge.delete(f)), h || f.removeAttribute(n);
    }), $e--, $e || (te = /* @__PURE__ */ new WeakMap(), te = /* @__PURE__ */ new WeakMap(), ge = /* @__PURE__ */ new WeakMap(), ye = {});
  };
}, Gr = function(e, t, n) {
  n === void 0 && (n = "data-aria-hidden");
  var r = Array.from(Array.isArray(e) ? e : [e]), o = jr(e);
  return o ? (r.push.apply(r, Array.from(o.querySelectorAll("[aria-live], script"))), Hr(r, o, n, "aria-hidden")) : function() {
    return null;
  };
}, Pe = "Dialog", [_t] = wn(Pe), [Yr, _] = _t(Pe), Ft = (e) => {
  const {
    __scopeDialog: t,
    children: n,
    open: r,
    defaultOpen: o,
    onOpenChange: a,
    modal: s = !0
  } = e, l = i.useRef(null), u = i.useRef(null), [c, d] = Pn({
    prop: r,
    defaultProp: o ?? !1,
    onChange: a,
    caller: Pe
  });
  return /* @__PURE__ */ g(
    Yr,
    {
      scope: t,
      triggerRef: l,
      contentRef: u,
      contentId: U(),
      titleId: U(),
      descriptionId: U(),
      open: c,
      onOpenChange: d,
      onOpenToggle: i.useCallback(() => d((f) => !f), [d]),
      modal: s,
      children: n
    }
  );
};
Ft.displayName = Pe;
var $t = "DialogTrigger", qr = i.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...r } = e, o = _($t, n), a = X(t, o.triggerRef);
    return /* @__PURE__ */ g(
      de.button,
      {
        type: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": o.open,
        "aria-controls": o.contentId,
        "data-state": Ye(o.open),
        ...r,
        ref: a,
        onClick: K(e.onClick, o.onOpenToggle)
      }
    );
  }
);
qr.displayName = $t;
var He = "DialogPortal", [zr, Wt] = _t(He, {
  forceMount: void 0
}), Bt = (e) => {
  const { __scopeDialog: t, forceMount: n, children: r, container: o } = e, a = _(He, t);
  return /* @__PURE__ */ g(zr, { scope: t, forceMount: n, children: i.Children.map(r, (s) => /* @__PURE__ */ g(xe, { present: n || a.open, children: /* @__PURE__ */ g(Pt, { asChild: !0, container: o, children: s }) })) });
};
Bt.displayName = He;
var Ce = "DialogOverlay", Ut = i.forwardRef(
  (e, t) => {
    const n = Wt(Ce, e.__scopeDialog), { forceMount: r = n.forceMount, ...o } = e, a = _(Ce, e.__scopeDialog);
    return a.modal ? /* @__PURE__ */ g(xe, { present: r || a.open, children: /* @__PURE__ */ g(Zr, { ...o, ref: t }) }) : null;
  }
);
Ut.displayName = Ce;
var Xr = /* @__PURE__ */ ue("DialogOverlay.RemoveScroll"), Zr = i.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...r } = e, o = _(Ce, n);
    return (
      // Make sure `Content` is scrollable even when it doesn't live inside `RemoveScroll`
      // ie. when `Overlay` and `Content` are siblings
      /* @__PURE__ */ g(Mt, { as: Xr, allowPinchZoom: !0, shards: [o.contentRef], children: /* @__PURE__ */ g(
        de.div,
        {
          "data-state": Ye(o.open),
          ...r,
          ref: t,
          style: { pointerEvents: "auto", ...r.style }
        }
      ) })
    );
  }
), q = "DialogContent", Vt = i.forwardRef(
  (e, t) => {
    const n = Wt(q, e.__scopeDialog), { forceMount: r = n.forceMount, ...o } = e, a = _(q, e.__scopeDialog);
    return /* @__PURE__ */ g(xe, { present: r || a.open, children: a.modal ? /* @__PURE__ */ g(Qr, { ...o, ref: t }) : /* @__PURE__ */ g(Jr, { ...o, ref: t }) });
  }
);
Vt.displayName = q;
var Qr = i.forwardRef(
  (e, t) => {
    const n = _(q, e.__scopeDialog), r = i.useRef(null), o = X(t, n.contentRef, r);
    return i.useEffect(() => {
      const a = r.current;
      if (a) return Gr(a);
    }, []), /* @__PURE__ */ g(
      jt,
      {
        ...e,
        ref: o,
        trapFocus: n.open,
        disableOutsidePointerEvents: !0,
        onCloseAutoFocus: K(e.onCloseAutoFocus, (a) => {
          a.preventDefault(), n.triggerRef.current?.focus();
        }),
        onPointerDownOutside: K(e.onPointerDownOutside, (a) => {
          const s = a.detail.originalEvent, l = s.button === 0 && s.ctrlKey === !0;
          (s.button === 2 || l) && a.preventDefault();
        }),
        onFocusOutside: K(
          e.onFocusOutside,
          (a) => a.preventDefault()
        )
      }
    );
  }
), Jr = i.forwardRef(
  (e, t) => {
    const n = _(q, e.__scopeDialog), r = i.useRef(!1), o = i.useRef(!1);
    return /* @__PURE__ */ g(
      jt,
      {
        ...e,
        ref: t,
        trapFocus: !1,
        disableOutsidePointerEvents: !1,
        onCloseAutoFocus: (a) => {
          e.onCloseAutoFocus?.(a), a.defaultPrevented || (r.current || n.triggerRef.current?.focus(), a.preventDefault()), r.current = !1, o.current = !1;
        },
        onInteractOutside: (a) => {
          e.onInteractOutside?.(a), a.defaultPrevented || (r.current = !0, a.detail.originalEvent.type === "pointerdown" && (o.current = !0));
          const s = a.target;
          n.triggerRef.current?.contains(s) && a.preventDefault(), a.detail.originalEvent.type === "focusin" && o.current && a.preventDefault();
        }
      }
    );
  }
), jt = i.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, trapFocus: r, onOpenAutoFocus: o, onCloseAutoFocus: a, ...s } = e, l = _(q, n), u = i.useRef(null), c = X(t, u);
    return ir(), /* @__PURE__ */ B(tt, { children: [
      /* @__PURE__ */ g(
        xt,
        {
          asChild: !0,
          loop: !0,
          trapped: r,
          onMountAutoFocus: o,
          onUnmountAutoFocus: a,
          children: /* @__PURE__ */ g(
            Ct,
            {
              role: "dialog",
              id: l.contentId,
              "aria-describedby": l.descriptionId,
              "aria-labelledby": l.titleId,
              "data-state": Ye(l.open),
              ...s,
              ref: c,
              onDismiss: () => l.onOpenChange(!1)
            }
          )
        }
      ),
      /* @__PURE__ */ B(tt, { children: [
        /* @__PURE__ */ g(ro, { titleId: l.titleId }),
        /* @__PURE__ */ g(ao, { contentRef: u, descriptionId: l.descriptionId })
      ] })
    ] });
  }
), Ge = "DialogTitle", eo = i.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...r } = e, o = _(Ge, n);
    return /* @__PURE__ */ g(de.h2, { id: o.titleId, ...r, ref: t });
  }
);
eo.displayName = Ge;
var Kt = "DialogDescription", to = i.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...r } = e, o = _(Kt, n);
    return /* @__PURE__ */ g(de.p, { id: o.descriptionId, ...r, ref: t });
  }
);
to.displayName = Kt;
var Ht = "DialogClose", no = i.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...r } = e, o = _(Ht, n);
    return /* @__PURE__ */ g(
      de.button,
      {
        type: "button",
        ...r,
        ref: t,
        onClick: K(e.onClick, () => o.onOpenChange(!1))
      }
    );
  }
);
no.displayName = Ht;
function Ye(e) {
  return e ? "open" : "closed";
}
var Gt = "DialogTitleWarning", [Ko, Yt] = En(Gt, {
  contentName: q,
  titleName: Ge,
  docsSlug: "dialog"
}), ro = ({ titleId: e }) => {
  const t = Yt(Gt), n = `\`${t.contentName}\` requires a \`${t.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${t.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${t.docsSlug}`;
  return i.useEffect(() => {
    e && (document.getElementById(e) || console.error(n));
  }, [n, e]), null;
}, oo = "DialogDescriptionWarning", ao = ({ contentRef: e, descriptionId: t }) => {
  const r = `Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${Yt(oo).contentName}}.`;
  return i.useEffect(() => {
    const o = e.current?.getAttribute("aria-describedby");
    t && o && (document.getElementById(t) || console.warn(r));
  }, [r, e, t]), null;
}, io = Ft, lo = Bt, so = Ut, co = Vt, uo = /* @__PURE__ */ Symbol.for("react.lazy"), Se = i[" use ".trim().toString()];
function fo(e) {
  return typeof e == "object" && e !== null && "then" in e;
}
function qt(e) {
  return e != null && typeof e == "object" && "$$typeof" in e && e.$$typeof === uo && "_payload" in e && fo(e._payload);
}
// @__NO_SIDE_EFFECTS__
function vo(e) {
  const t = /* @__PURE__ */ mo(e), n = i.forwardRef((r, o) => {
    let { children: a, ...s } = r;
    qt(a) && typeof Se == "function" && (a = Se(a._payload));
    const l = i.Children.toArray(a), u = l.find(ho);
    if (u) {
      const c = u.props.children, d = l.map((f) => f === u ? i.Children.count(c) > 1 ? i.Children.only(null) : i.isValidElement(c) ? c.props.children : null : f);
      return /* @__PURE__ */ g(t, { ...s, ref: o, children: i.isValidElement(c) ? i.cloneElement(c, void 0, d) : null });
    }
    return /* @__PURE__ */ g(t, { ...s, ref: o, children: a });
  });
  return n.displayName = `${e}.Slot`, n;
}
// @__NO_SIDE_EFFECTS__
function mo(e) {
  const t = i.forwardRef((n, r) => {
    let { children: o, ...a } = n;
    if (qt(o) && typeof Se == "function" && (o = Se(o._payload)), i.isValidElement(o)) {
      const s = yo(o), l = go(a, o.props);
      return o.type !== i.Fragment && (l.ref = r ? H(r, s) : s), i.cloneElement(o, l);
    }
    return i.Children.count(o) > 1 ? i.Children.only(null) : null;
  });
  return t.displayName = `${e}.SlotClone`, t;
}
var po = /* @__PURE__ */ Symbol("radix.slottable");
function ho(e) {
  return i.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === po;
}
function go(e, t) {
  const n = { ...t };
  for (const r in t) {
    const o = e[r], a = t[r];
    /^on[A-Z]/.test(r) ? o && a ? n[r] = (...l) => {
      const u = a(...l);
      return o(...l), u;
    } : o && (n[r] = o) : r === "style" ? n[r] = { ...o, ...a } : r === "className" && (n[r] = [o, a].filter(Boolean).join(" "));
  }
  return { ...e, ...n };
}
function yo(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var bo = [
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
], Y = bo.reduce((e, t) => {
  const n = /* @__PURE__ */ vo(`Primitive.${t}`), r = i.forwardRef((o, a) => {
    const { asChild: s, ...l } = o, u = s ? n : t;
    return typeof window < "u" && (window[/* @__PURE__ */ Symbol.for("radix-ui")] = !0), /* @__PURE__ */ g(u, { ...l, ref: a });
  });
  return r.displayName = `Primitive.${t}`, { ...e, [t]: r };
}, {}), le = '[cmdk-group=""]', We = '[cmdk-group-items=""]', Eo = '[cmdk-group-heading=""]', zt = '[cmdk-item=""]', gt = `${zt}:not([aria-disabled="true"])`, Ke = "cmdk-item-select", re = "data-value", wo = (e, t, n) => bn(e, t, n), Xt = i.createContext(void 0), fe = () => i.useContext(Xt), Zt = i.createContext(void 0), qe = () => i.useContext(Zt), Qt = i.createContext(void 0), Jt = i.forwardRef((e, t) => {
  let n = oe(() => {
    var v, w;
    return { search: "", value: (w = (v = e.value) != null ? v : e.defaultValue) != null ? w : "", selectedItemId: void 0, filtered: { count: 0, items: /* @__PURE__ */ new Map(), groups: /* @__PURE__ */ new Set() } };
  }), r = oe(() => /* @__PURE__ */ new Set()), o = oe(() => /* @__PURE__ */ new Map()), a = oe(() => /* @__PURE__ */ new Map()), s = oe(() => /* @__PURE__ */ new Set()), l = en(e), { label: u, children: c, value: d, onValueChange: f, filter: m, shouldFilter: h, loop: C, disablePointerSelection: p = !1, vimBindings: b = !0, ...S } = e, P = U(), I = U(), N = U(), O = i.useRef(null), x = ko();
  z(() => {
    if (d !== void 0) {
      let v = d.trim();
      n.current.value = v, E.emit();
    }
  }, [d]), z(() => {
    x(6, Xe);
  }, []);
  let E = i.useMemo(() => ({ subscribe: (v) => (s.current.add(v), () => s.current.delete(v)), snapshot: () => n.current, setState: (v, w, R) => {
    var y, D, A, T;
    if (!Object.is(n.current[v], w)) {
      if (n.current[v] = w, v === "search") Z(), W(), x(1, V);
      else if (v === "value") {
        if (document.activeElement.hasAttribute("cmdk-input") || document.activeElement.hasAttribute("cmdk-root")) {
          let k = document.getElementById(N);
          k ? k.focus() : (y = document.getElementById(P)) == null || y.focus();
        }
        if (x(7, () => {
          var k;
          n.current.selectedItemId = (k = Q()) == null ? void 0 : k.id, E.emit();
        }), R || x(5, Xe), ((D = l.current) == null ? void 0 : D.value) !== void 0) {
          let k = w ?? "";
          (T = (A = l.current).onValueChange) == null || T.call(A, k);
          return;
        }
      }
      E.emit();
    }
  }, emit: () => {
    s.current.forEach((v) => v());
  } }), []), M = i.useMemo(() => ({ value: (v, w, R) => {
    var y;
    w !== ((y = a.current.get(v)) == null ? void 0 : y.value) && (a.current.set(v, { value: w, keywords: R }), n.current.filtered.items.set(v, $(w, R)), x(2, () => {
      W(), E.emit();
    }));
  }, item: (v, w) => (r.current.add(v), w && (o.current.has(w) ? o.current.get(w).add(v) : o.current.set(w, /* @__PURE__ */ new Set([v]))), x(3, () => {
    Z(), W(), n.current.value || V(), E.emit();
  }), () => {
    a.current.delete(v), r.current.delete(v), n.current.filtered.items.delete(v);
    let R = Q();
    x(4, () => {
      Z(), R?.getAttribute("id") === v && V(), E.emit();
    });
  }), group: (v) => (o.current.has(v) || o.current.set(v, /* @__PURE__ */ new Set()), () => {
    a.current.delete(v), o.current.delete(v);
  }), filter: () => l.current.shouldFilter, label: u || e["aria-label"], getDisablePointerSelection: () => l.current.disablePointerSelection, listId: P, inputId: N, labelId: I, listInnerRef: O }), []);
  function $(v, w) {
    var R, y;
    let D = (y = (R = l.current) == null ? void 0 : R.filter) != null ? y : wo;
    return v ? D(v, n.current.search, w) : 0;
  }
  function W() {
    if (!n.current.search || l.current.shouldFilter === !1) return;
    let v = n.current.filtered.items, w = [];
    n.current.filtered.groups.forEach((y) => {
      let D = o.current.get(y), A = 0;
      D.forEach((T) => {
        let k = v.get(T);
        A = Math.max(k, A);
      }), w.push([y, A]);
    });
    let R = O.current;
    ie().sort((y, D) => {
      var A, T;
      let k = y.getAttribute("id"), ve = D.getAttribute("id");
      return ((A = v.get(ve)) != null ? A : 0) - ((T = v.get(k)) != null ? T : 0);
    }).forEach((y) => {
      let D = y.closest(We);
      D ? D.appendChild(y.parentElement === D ? y : y.closest(`${We} > *`)) : R.appendChild(y.parentElement === R ? y : y.closest(`${We} > *`));
    }), w.sort((y, D) => D[1] - y[1]).forEach((y) => {
      var D;
      let A = (D = O.current) == null ? void 0 : D.querySelector(`${le}[${re}="${encodeURIComponent(y[0])}"]`);
      A?.parentElement.appendChild(A);
    });
  }
  function V() {
    let v = ie().find((R) => R.getAttribute("aria-disabled") !== "true"), w = v?.getAttribute(re);
    E.setState("value", w || void 0);
  }
  function Z() {
    var v, w, R, y;
    if (!n.current.search || l.current.shouldFilter === !1) {
      n.current.filtered.count = r.current.size;
      return;
    }
    n.current.filtered.groups = /* @__PURE__ */ new Set();
    let D = 0;
    for (let A of r.current) {
      let T = (w = (v = a.current.get(A)) == null ? void 0 : v.value) != null ? w : "", k = (y = (R = a.current.get(A)) == null ? void 0 : R.keywords) != null ? y : [], ve = $(T, k);
      n.current.filtered.items.set(A, ve), ve > 0 && D++;
    }
    for (let [A, T] of o.current) for (let k of T) if (n.current.filtered.items.get(k) > 0) {
      n.current.filtered.groups.add(A);
      break;
    }
    n.current.filtered.count = D;
  }
  function Xe() {
    var v, w, R;
    let y = Q();
    y && (((v = y.parentElement) == null ? void 0 : v.firstChild) === y && ((R = (w = y.closest(le)) == null ? void 0 : w.querySelector(Eo)) == null || R.scrollIntoView({ block: "nearest" })), y.scrollIntoView({ block: "nearest" }));
  }
  function Q() {
    var v;
    return (v = O.current) == null ? void 0 : v.querySelector(`${zt}[aria-selected="true"]`);
  }
  function ie() {
    var v;
    return Array.from(((v = O.current) == null ? void 0 : v.querySelectorAll(gt)) || []);
  }
  function Oe(v) {
    let w = ie()[v];
    w && E.setState("value", w.getAttribute(re));
  }
  function De(v) {
    var w;
    let R = Q(), y = ie(), D = y.findIndex((T) => T === R), A = y[D + v];
    (w = l.current) != null && w.loop && (A = D + v < 0 ? y[y.length - 1] : D + v === y.length ? y[0] : y[D + v]), A && E.setState("value", A.getAttribute(re));
  }
  function Ze(v) {
    let w = Q(), R = w?.closest(le), y;
    for (; R && !y; ) R = v > 0 ? Io(R, le) : Ao(R, le), y = R?.querySelector(gt);
    y ? E.setState("value", y.getAttribute(re)) : De(v);
  }
  let Qe = () => Oe(ie().length - 1), Je = (v) => {
    v.preventDefault(), v.metaKey ? Qe() : v.altKey ? Ze(1) : De(1);
  }, et = (v) => {
    v.preventDefault(), v.metaKey ? Oe(0) : v.altKey ? Ze(-1) : De(-1);
  };
  return i.createElement(Y.div, { ref: t, tabIndex: -1, ...S, "cmdk-root": "", onKeyDown: (v) => {
    var w;
    (w = S.onKeyDown) == null || w.call(S, v);
    let R = v.nativeEvent.isComposing || v.keyCode === 229;
    if (!(v.defaultPrevented || R)) switch (v.key) {
      case "n":
      case "j": {
        b && v.ctrlKey && Je(v);
        break;
      }
      case "ArrowDown": {
        Je(v);
        break;
      }
      case "p":
      case "k": {
        b && v.ctrlKey && et(v);
        break;
      }
      case "ArrowUp": {
        et(v);
        break;
      }
      case "Home": {
        v.preventDefault(), Oe(0);
        break;
      }
      case "End": {
        v.preventDefault(), Qe();
        break;
      }
      case "Enter": {
        v.preventDefault();
        let y = Q();
        if (y) {
          let D = new Event(Ke);
          y.dispatchEvent(D);
        }
      }
    }
  } }, i.createElement("label", { "cmdk-label": "", htmlFor: M.inputId, id: M.labelId, style: Mo }, u), Ne(e, (v) => i.createElement(Zt.Provider, { value: E }, i.createElement(Xt.Provider, { value: M }, v))));
}), Co = i.forwardRef((e, t) => {
  var n, r;
  let o = U(), a = i.useRef(null), s = i.useContext(Qt), l = fe(), u = en(e), c = (r = (n = u.current) == null ? void 0 : n.forceMount) != null ? r : s?.forceMount;
  z(() => {
    if (!c) return l.item(o, s?.id);
  }, [c]);
  let d = tn(o, a, [e.value, e.children, a], e.keywords), f = qe(), m = G((x) => x.value && x.value === d.current), h = G((x) => c || l.filter() === !1 ? !0 : x.search ? x.filtered.items.get(o) > 0 : !0);
  i.useEffect(() => {
    let x = a.current;
    if (!(!x || e.disabled)) return x.addEventListener(Ke, C), () => x.removeEventListener(Ke, C);
  }, [h, e.onSelect, e.disabled]);
  function C() {
    var x, E;
    p(), (E = (x = u.current).onSelect) == null || E.call(x, d.current);
  }
  function p() {
    f.setState("value", d.current, !0);
  }
  if (!h) return null;
  let { disabled: b, value: S, onSelect: P, forceMount: I, keywords: N, ...O } = e;
  return i.createElement(Y.div, { ref: H(a, t), ...O, id: o, "cmdk-item": "", role: "option", "aria-disabled": !!b, "aria-selected": !!m, "data-disabled": !!b, "data-selected": !!m, onPointerMove: b || l.getDisablePointerSelection() ? void 0 : p, onClick: b ? void 0 : C }, e.children);
}), So = i.forwardRef((e, t) => {
  let { heading: n, children: r, forceMount: o, ...a } = e, s = U(), l = i.useRef(null), u = i.useRef(null), c = U(), d = fe(), f = G((h) => o || d.filter() === !1 ? !0 : h.search ? h.filtered.groups.has(s) : !0);
  z(() => d.group(s), []), tn(s, l, [e.value, e.heading, u]);
  let m = i.useMemo(() => ({ id: s, forceMount: o }), [o]);
  return i.createElement(Y.div, { ref: H(l, t), ...a, "cmdk-group": "", role: "presentation", hidden: f ? void 0 : !0 }, n && i.createElement("div", { ref: u, "cmdk-group-heading": "", "aria-hidden": !0, id: c }, n), Ne(e, (h) => i.createElement("div", { "cmdk-group-items": "", role: "group", "aria-labelledby": n ? c : void 0 }, i.createElement(Qt.Provider, { value: m }, h))));
}), xo = i.forwardRef((e, t) => {
  let { alwaysRender: n, ...r } = e, o = i.useRef(null), a = G((s) => !s.search);
  return !n && !a ? null : i.createElement(Y.div, { ref: H(o, t), ...r, "cmdk-separator": "", role: "separator" });
}), Ro = i.forwardRef((e, t) => {
  let { onValueChange: n, ...r } = e, o = e.value != null, a = qe(), s = G((c) => c.search), l = G((c) => c.selectedItemId), u = fe();
  return i.useEffect(() => {
    e.value != null && a.setState("search", e.value);
  }, [e.value]), i.createElement(Y.input, { ref: t, ...r, "cmdk-input": "", autoComplete: "off", autoCorrect: "off", spellCheck: !1, "aria-autocomplete": "list", role: "combobox", "aria-expanded": !0, "aria-controls": u.listId, "aria-labelledby": u.labelId, "aria-activedescendant": l, id: u.inputId, type: "text", value: o ? e.value : s, onChange: (c) => {
    o || a.setState("search", c.target.value), n?.(c.target.value);
  } });
}), Po = i.forwardRef((e, t) => {
  let { children: n, label: r = "Suggestions", ...o } = e, a = i.useRef(null), s = i.useRef(null), l = G((c) => c.selectedItemId), u = fe();
  return i.useEffect(() => {
    if (s.current && a.current) {
      let c = s.current, d = a.current, f, m = new ResizeObserver(() => {
        f = requestAnimationFrame(() => {
          let h = c.offsetHeight;
          d.style.setProperty("--cmdk-list-height", h.toFixed(1) + "px");
        });
      });
      return m.observe(c), () => {
        cancelAnimationFrame(f), m.unobserve(c);
      };
    }
  }, []), i.createElement(Y.div, { ref: H(a, t), ...o, "cmdk-list": "", role: "listbox", tabIndex: -1, "aria-activedescendant": l, "aria-label": r, id: u.listId }, Ne(e, (c) => i.createElement("div", { ref: H(s, u.listInnerRef), "cmdk-list-sizer": "" }, c)));
}), No = i.forwardRef((e, t) => {
  let { open: n, onOpenChange: r, overlayClassName: o, contentClassName: a, container: s, ...l } = e;
  return i.createElement(io, { open: n, onOpenChange: r }, i.createElement(lo, { container: s }, i.createElement(so, { "cmdk-overlay": "", className: o }), i.createElement(co, { "aria-label": e.label, "cmdk-dialog": "", className: a }, i.createElement(Jt, { ref: t, ...l }))));
}), Oo = i.forwardRef((e, t) => G((n) => n.filtered.count === 0) ? i.createElement(Y.div, { ref: t, ...e, "cmdk-empty": "", role: "presentation" }) : null), Do = i.forwardRef((e, t) => {
  let { progress: n, children: r, label: o = "Loading...", ...a } = e;
  return i.createElement(Y.div, { ref: t, ...a, "cmdk-loading": "", role: "progressbar", "aria-valuenow": n, "aria-valuemin": 0, "aria-valuemax": 100, "aria-label": o }, Ne(e, (s) => i.createElement("div", { "aria-hidden": !0 }, s)));
}), ne = Object.assign(Jt, { List: Po, Item: Co, Input: Ro, Group: So, Separator: xo, Dialog: No, Empty: Oo, Loading: Do });
function Io(e, t) {
  let n = e.nextElementSibling;
  for (; n; ) {
    if (n.matches(t)) return n;
    n = n.nextElementSibling;
  }
}
function Ao(e, t) {
  let n = e.previousElementSibling;
  for (; n; ) {
    if (n.matches(t)) return n;
    n = n.previousElementSibling;
  }
}
function en(e) {
  let t = i.useRef(e);
  return z(() => {
    t.current = e;
  }), t;
}
var z = typeof window > "u" ? i.useEffect : i.useLayoutEffect;
function oe(e) {
  let t = i.useRef();
  return t.current === void 0 && (t.current = e()), t;
}
function G(e) {
  let t = qe(), n = () => e(t.snapshot());
  return i.useSyncExternalStore(t.subscribe, n, n);
}
function tn(e, t, n, r = []) {
  let o = i.useRef(), a = fe();
  return z(() => {
    var s;
    let l = (() => {
      var c;
      for (let d of n) {
        if (typeof d == "string") return d.trim();
        if (typeof d == "object" && "current" in d) return d.current ? (c = d.current.textContent) == null ? void 0 : c.trim() : o.current;
      }
    })(), u = r.map((c) => c.trim());
    a.value(e, l, u), (s = t.current) == null || s.setAttribute(re, l), o.current = l;
  }), o;
}
var ko = () => {
  let [e, t] = i.useState(), n = oe(() => /* @__PURE__ */ new Map());
  return z(() => {
    n.current.forEach((r) => r()), n.current = /* @__PURE__ */ new Map();
  }, [e]), (r, o) => {
    n.current.set(r, o), t({});
  };
};
function To(e) {
  let t = e.type;
  return typeof t == "function" ? t(e.props) : "render" in t ? t.render(e.props) : e;
}
function Ne({ asChild: e, children: t }, n) {
  return e && i.isValidElement(t) ? i.cloneElement(To(t), { ref: t.ref }, n(t.props.children)) : n(t);
}
var Mo = { position: "absolute", width: "1px", height: "1px", padding: "0", margin: "-1px", overflow: "hidden", clip: "rect(0, 0, 0, 0)", whiteSpace: "nowrap", borderWidth: "0" };
const nn = rn(null);
function ze() {
  const e = an(nn);
  if (!e)
    throw new Error(
      "useCommandPalette must be used inside a <CommandPaletteProvider>."
    );
  return e;
}
function Ho() {
  const { open: e, close: t, toggle: n, isOpen: r, query: o } = ze();
  return { open: e, close: t, toggle: n, isOpen: r, query: o };
}
function Go({
  commands: e,
  getDynamicCommands: t,
  children: n
}) {
  const [r, o] = Be(!1), [a, s] = Be(""), l = be(() => o(!0), []), u = be(() => {
    o(!1), s("");
  }, []), c = be(() => o((m) => !m), []);
  on(() => {
    const m = (h) => {
      (h.metaKey || h.ctrlKey) && h.key.toLowerCase() === "k" && (h.preventDefault(), o((C) => !C));
    };
    return window.addEventListener("keydown", m, !0), () => window.removeEventListener("keydown", m, !0);
  }, []);
  const d = yt(() => {
    const m = t ? t(a) : [];
    return [...e, ...m].filter((C) => C.when ? C.when() : !0);
  }, [e, t, a]), f = {
    open: l,
    close: u,
    toggle: c,
    isOpen: r,
    query: a,
    setQuery: s,
    mergedCommands: d
  };
  return /* @__PURE__ */ g(nn.Provider, { value: f, children: n });
}
function Lo(e) {
  const t = /* @__PURE__ */ new Map();
  for (const n of e) {
    const r = n.group ?? null, o = t.get(r);
    o ? o.push(n) : t.set(r, [n]);
  }
  return Array.from(t.entries()).map(([n, r]) => ({
    groupName: n,
    items: r
  }));
}
function Yo({
  placeholder: e = "Type a command or search…",
  emptyState: t,
  className: n
} = {}) {
  const { isOpen: r, close: o, query: a, setQuery: s, mergedCommands: l } = ze(), u = yt(() => Lo(l), [l]), c = be(
    (d) => {
      o(), Promise.resolve().then(() => d.run());
    },
    [o]
  );
  return /* @__PURE__ */ g(
    un,
    {
      open: r,
      onClose: o,
      maxWidth: 640,
      rawChildren: !0,
      backdropTestId: "command-palette-backdrop",
      children: /* @__PURE__ */ B(
        ne,
        {
          label: "Command palette",
          value: void 0,
          className: L("flex flex-col gap-0 w-full", n),
          "data-testid": "command-palette",
          children: [
            /* @__PURE__ */ g(
              ne.Input,
              {
                value: a,
                onValueChange: s,
                placeholder: e,
                "data-autofocus": !0,
                className: L(
                  "w-full px-3 py-2.5 text-sm border-0 border-b border-border",
                  "outline-none bg-transparent text-text-primary placeholder:text-text-tertiary"
                ),
                "data-testid": "command-palette-input"
              }
            ),
            /* @__PURE__ */ B(ne.List, { className: "max-h-[360px] overflow-y-auto py-2", children: [
              /* @__PURE__ */ g(ne.Empty, { className: "px-3 py-6 text-center text-sm text-text-tertiary", children: t ?? "No results." }),
              u.map(({ groupName: d, items: f }) => /* @__PURE__ */ g(
                ne.Group,
                {
                  heading: d ?? void 0,
                  children: f.map((m) => /* @__PURE__ */ B(
                    ne.Item,
                    {
                      value: `${m.id} ${m.label} ${(m.keywords ?? []).join(" ")}`,
                      keywords: m.keywords,
                      onSelect: () => c(m),
                      "data-testid": `command-palette-item-${m.id}`,
                      className: L(
                        "flex items-center gap-2 px-3 py-2 mx-1 rounded-md cursor-pointer text-sm",
                        "text-text-primary aria-selected:bg-surface-hover"
                      ),
                      children: [
                        m.icon && /* @__PURE__ */ g("span", { className: "shrink-0 text-text-secondary", children: m.icon }),
                        /* @__PURE__ */ g("span", { className: "flex-1 truncate", children: m.label }),
                        m.hint && /* @__PURE__ */ g("span", { className: "text-xs text-text-tertiary truncate", children: m.hint }),
                        m.shortcut && m.shortcut.length > 0 && /* @__PURE__ */ g("span", { className: "flex items-center gap-1 shrink-0", children: m.shortcut.map((h, C) => /* @__PURE__ */ g(
                          "kbd",
                          {
                            className: L(
                              "inline-flex items-center justify-center min-w-[18px] h-[18px] px-1",
                              "text-[10px] font-mono font-medium",
                              "bg-surface-hover text-text-secondary",
                              "border border-border rounded"
                            ),
                            children: h
                          },
                          `${m.id}-kbd-${C}`
                        )) })
                      ]
                    },
                    m.id
                  ))
                },
                d ?? "__ungrouped__"
              ))
            ] })
          ]
        }
      )
    }
  );
}
function qo({ className: e } = {}) {
  const { toggle: t } = ze();
  return /* @__PURE__ */ B(
    "button",
    {
      type: "button",
      onClick: t,
      "data-testid": "command-palette-hint",
      className: L(
        "inline-flex items-center gap-1.5 px-2 py-1 rounded-md",
        "text-xs text-text-secondary bg-surface-hover",
        "border border-border hover:bg-surface-panel",
        "cursor-pointer transition-colors",
        e
      ),
      "aria-label": "Open command palette",
      children: [
        /* @__PURE__ */ g("kbd", { className: "font-mono text-[11px]", children: "⌘K" }),
        /* @__PURE__ */ g("span", { children: "Search" })
      ]
    }
  );
}
function zo({
  label: e,
  hint: t,
  error: n,
  required: r = !1,
  layout: o = "stacked",
  children: a,
  className: s,
  style: l,
  "data-testid": u
}) {
  const c = ln(), d = `${c}-label`, f = t || n ? `${c}-desc` : void 0, m = {
    id: c,
    labelId: d,
    "aria-describedby": f,
    "aria-invalid": n ? !0 : void 0
  };
  return /* @__PURE__ */ B(
    "div",
    {
      "data-testid": u,
      className: L(
        o === "inline" ? "flex items-center gap-3" : "flex flex-col gap-1",
        s
      ),
      style: l,
      children: [
        /* @__PURE__ */ B(
          "label",
          {
            id: d,
            htmlFor: c,
            className: L(
              "text-[12px] font-medium",
              o === "inline" ? "min-w-[140px]" : "",
              n ? "text-[#991b1b]" : "text-gray-700"
            ),
            children: [
              e,
              r && /* @__PURE__ */ g("span", { className: "ml-0.5 text-[#991b1b]", children: "*" })
            ]
          }
        ),
        /* @__PURE__ */ B("div", { className: L(o === "inline" ? "flex-1" : ""), children: [
          a(m),
          (t || n) && /* @__PURE__ */ g(
            "div",
            {
              id: f,
              className: L(
                "mt-1 text-[11px]",
                n ? "text-[#991b1b]" : "text-gray-500"
              ),
              children: n ?? t
            }
          )
        ] })
      ]
    }
  );
}
const _o = {
  sm: "w-7 h-4",
  md: "w-9 h-5"
}, Fo = {
  sm: "w-3 h-3",
  md: "w-4 h-4"
}, $o = {
  sm: "translate-x-3",
  md: "translate-x-4"
};
function Xo({
  checked: e,
  onChange: t,
  disabled: n = !1,
  size: r = "md",
  "aria-label": o,
  "aria-labelledby": a,
  className: s,
  style: l,
  "data-testid": u
}) {
  return /* @__PURE__ */ g(
    "button",
    {
      type: "button",
      role: "switch",
      "aria-checked": e,
      "aria-label": o,
      "aria-labelledby": a,
      disabled: n,
      "data-testid": u,
      onClick: () => {
        n || t(!e);
      },
      className: L(
        "relative inline-flex items-center rounded-full border border-transparent transition-colors",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
        _o[r],
        e ? "bg-blue-600" : "bg-gray-300",
        n ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
        s
      ),
      style: l,
      children: /* @__PURE__ */ g(
        "span",
        {
          className: L(
            "inline-block rounded-full bg-white shadow transform transition-transform",
            Fo[r],
            e ? $o[r] : "translate-x-0.5"
          )
        }
      )
    }
  );
}
export {
  Yo as C,
  zo as F,
  Xo as S,
  qo as a,
  Go as b,
  Ho as u
};
