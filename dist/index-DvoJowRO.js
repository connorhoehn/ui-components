import * as a from "react";
import { useState as qt } from "react";
import { jsx as w, jsxs as Xe, Fragment as qe } from "react/jsx-runtime";
import * as Zt from "react-dom";
import Qt from "react-dom";
var Ze = 1, Jt = 0.9, en = 0.8, tn = 0.17, Ne = 0.1, De = 0.999, nn = 0.9999, rn = 0.99, on = /[\\\/_+.#"@\[\(\{&]/, an = /[\\\/_+.#"@\[\(\{&]/g, cn = /[\s-]/, vt = /[\s-]/g;
function Fe(e, t, n, r, o, i, l) {
  if (i === t.length) return o === e.length ? Ze : rn;
  var c = `${o},${i}`;
  if (l[c] !== void 0) return l[c];
  for (var s = r.charAt(i), u = n.indexOf(s, o), f = 0, v, p, h, P; u >= 0; ) v = Fe(e, t, n, r, u + 1, i + 1, l), v > f && (u === o ? v *= Ze : on.test(e.charAt(u - 1)) ? (v *= en, h = e.slice(o, u - 1).match(an), h && o > 0 && (v *= Math.pow(De, h.length))) : cn.test(e.charAt(u - 1)) ? (v *= Jt, P = e.slice(o, u - 1).match(vt), P && o > 0 && (v *= Math.pow(De, P.length))) : (v *= tn, o > 0 && (v *= Math.pow(De, u - o))), e.charAt(u) !== t.charAt(i) && (v *= nn)), (v < Ne && n.charAt(u - 1) === r.charAt(i + 1) || r.charAt(i + 1) === r.charAt(i) && n.charAt(u - 1) !== r.charAt(i)) && (p = Fe(e, t, n, r, u + 1, i + 2, l), p * Ne > v && (v = p * Ne)), v > f && (f = v), u = n.indexOf(s, u + 1);
  return l[c] = f, f;
}
function Qe(e) {
  return e.toLowerCase().replace(vt, " ");
}
function ln(e, t, n) {
  return e = n && n.length > 0 ? `${e + " " + n.join(" ")}` : e, Fe(e, t, Qe(e), Qe(t), 0, 0, {});
}
function V(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
  return function(o) {
    if (e?.(o), n === !1 || !o.defaultPrevented)
      return t?.(o);
  };
}
function Je(e, t) {
  if (typeof e == "function")
    return e(t);
  e != null && (e.current = t);
}
function j(...e) {
  return (t) => {
    let n = !1;
    const r = e.map((o) => {
      const i = Je(o, t);
      return !n && typeof i == "function" && (n = !0), i;
    });
    if (n)
      return () => {
        for (let o = 0; o < r.length; o++) {
          const i = r[o];
          typeof i == "function" ? i() : Je(e[o], null);
        }
      };
  };
}
function G(...e) {
  return a.useCallback(j(...e), e);
}
function un(e, t) {
  const n = a.createContext(t), r = (i) => {
    const { children: l, ...c } = i, s = a.useMemo(() => c, Object.values(c));
    return /* @__PURE__ */ w(n.Provider, { value: s, children: l });
  };
  r.displayName = e + "Provider";
  function o(i) {
    const l = a.useContext(n);
    if (l) return l;
    if (t !== void 0) return t;
    throw new Error(`\`${i}\` must be used within \`${e}\``);
  }
  return [r, o];
}
function sn(e, t = []) {
  let n = [];
  function r(i, l) {
    const c = a.createContext(l), s = n.length;
    n = [...n, l];
    const u = (v) => {
      const { scope: p, children: h, ...P } = v, m = p?.[e]?.[s] || c, y = a.useMemo(() => P, Object.values(P));
      return /* @__PURE__ */ w(m.Provider, { value: y, children: h });
    };
    u.displayName = i + "Provider";
    function f(v, p) {
      const h = p?.[e]?.[s] || c, P = a.useContext(h);
      if (P) return P;
      if (l !== void 0) return l;
      throw new Error(`\`${v}\` must be used within \`${i}\``);
    }
    return [u, f];
  }
  const o = () => {
    const i = n.map((l) => a.createContext(l));
    return function(c) {
      const s = c?.[e] || i;
      return a.useMemo(
        () => ({ [`__scope${e}`]: { ...c, [e]: s } }),
        [c, s]
      );
    };
  };
  return o.scopeName = e, [r, dn(o, ...t)];
}
function dn(...e) {
  const t = e[0];
  if (e.length === 1) return t;
  const n = () => {
    const r = e.map((o) => ({
      useScope: o(),
      scopeName: o.scopeName
    }));
    return function(i) {
      const l = r.reduce((c, { useScope: s, scopeName: u }) => {
        const v = s(i)[`__scope${u}`];
        return { ...c, ...v };
      }, {});
      return a.useMemo(() => ({ [`__scope${t.scopeName}`]: l }), [l]);
    };
  };
  return n.scopeName = t.scopeName, n;
}
var ae = globalThis?.document ? a.useLayoutEffect : () => {
}, fn = a[" useId ".trim().toString()] || (() => {
}), vn = 0;
function W(e) {
  const [t, n] = a.useState(fn());
  return ae(() => {
    n((r) => r ?? String(vn++));
  }, [e]), t ? `radix-${t}` : "";
}
var mn = a[" useInsertionEffect ".trim().toString()] || ae;
function pn({
  prop: e,
  defaultProp: t,
  onChange: n = () => {
  },
  caller: r
}) {
  const [o, i, l] = hn({
    defaultProp: t,
    onChange: n
  }), c = e !== void 0, s = c ? e : o;
  {
    const f = a.useRef(e !== void 0);
    a.useEffect(() => {
      const v = f.current;
      v !== c && console.warn(
        `${r} is changing from ${v ? "controlled" : "uncontrolled"} to ${c ? "controlled" : "uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`
      ), f.current = c;
    }, [c, r]);
  }
  const u = a.useCallback(
    (f) => {
      if (c) {
        const v = gn(f) ? f(e) : f;
        v !== e && l.current?.(v);
      } else
        i(f);
    },
    [c, e, i, l]
  );
  return [s, u];
}
function hn({
  defaultProp: e,
  onChange: t
}) {
  const [n, r] = a.useState(e), o = a.useRef(n), i = a.useRef(t);
  return mn(() => {
    i.current = t;
  }, [t]), a.useEffect(() => {
    o.current !== n && (i.current?.(n), o.current = n);
  }, [n, o]), [n, r, i];
}
function gn(e) {
  return typeof e == "function";
}
// @__NO_SIDE_EFFECTS__
function ce(e) {
  const t = /* @__PURE__ */ yn(e), n = a.forwardRef((r, o) => {
    const { children: i, ...l } = r, c = a.Children.toArray(i), s = c.find(bn);
    if (s) {
      const u = s.props.children, f = c.map((v) => v === s ? a.Children.count(u) > 1 ? a.Children.only(null) : a.isValidElement(u) ? u.props.children : null : v);
      return /* @__PURE__ */ w(t, { ...l, ref: o, children: a.isValidElement(u) ? a.cloneElement(u, void 0, f) : null });
    }
    return /* @__PURE__ */ w(t, { ...l, ref: o, children: i });
  });
  return n.displayName = `${e}.Slot`, n;
}
// @__NO_SIDE_EFFECTS__
function yn(e) {
  const t = a.forwardRef((n, r) => {
    const { children: o, ...i } = n;
    if (a.isValidElement(o)) {
      const l = Sn(o), c = wn(i, o.props);
      return o.type !== a.Fragment && (c.ref = r ? j(r, l) : l), a.cloneElement(o, c);
    }
    return a.Children.count(o) > 1 ? a.Children.only(null) : null;
  });
  return t.displayName = `${e}.SlotClone`, t;
}
var En = /* @__PURE__ */ Symbol("radix.slottable");
function bn(e) {
  return a.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === En;
}
function wn(e, t) {
  const n = { ...t };
  for (const r in t) {
    const o = e[r], i = t[r];
    /^on[A-Z]/.test(r) ? o && i ? n[r] = (...c) => {
      const s = i(...c);
      return o(...c), s;
    } : o && (n[r] = o) : r === "style" ? n[r] = { ...o, ...i } : r === "className" && (n[r] = [o, i].filter(Boolean).join(" "));
  }
  return { ...e, ...n };
}
function Sn(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
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
], mt = Cn.reduce((e, t) => {
  const n = /* @__PURE__ */ ce(`Primitive.${t}`), r = a.forwardRef((o, i) => {
    const { asChild: l, ...c } = o, s = l ? n : t;
    return typeof window < "u" && (window[/* @__PURE__ */ Symbol.for("radix-ui")] = !0), /* @__PURE__ */ w(s, { ...c, ref: i });
  });
  return r.displayName = `Primitive.${t}`, { ...e, [t]: r };
}, {});
function Rn(e, t) {
  e && Zt.flushSync(() => e.dispatchEvent(t));
}
function ie(e) {
  const t = a.useRef(e);
  return a.useEffect(() => {
    t.current = e;
  }), a.useMemo(() => (...n) => t.current?.(...n), []);
}
function Pn(e, t = globalThis?.document) {
  const n = ie(e);
  a.useEffect(() => {
    const r = (o) => {
      o.key === "Escape" && n(o);
    };
    return t.addEventListener("keydown", r, { capture: !0 }), () => t.removeEventListener("keydown", r, { capture: !0 });
  }, [n, t]);
}
var Nn = "DismissableLayer", _e = "dismissableLayer.update", Dn = "dismissableLayer.pointerDownOutside", On = "dismissableLayer.focusOutside", et, pt = a.createContext({
  layers: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
}), ht = a.forwardRef(
  (e, t) => {
    const {
      disableOutsidePointerEvents: n = !1,
      onEscapeKeyDown: r,
      onPointerDownOutside: o,
      onFocusOutside: i,
      onInteractOutside: l,
      onDismiss: c,
      ...s
    } = e, u = a.useContext(pt), [f, v] = a.useState(null), p = f?.ownerDocument ?? globalThis?.document, [, h] = a.useState({}), P = G(t, (E) => v(E)), m = Array.from(u.layers), [y] = [...u.layersWithOutsidePointerEventsDisabled].slice(-1), S = m.indexOf(y), N = f ? m.indexOf(f) : -1, I = u.layersWithOutsidePointerEventsDisabled.size > 0, D = N >= S, O = xn((E) => {
      const k = E.target, _ = [...u.branches].some(($) => $.contains(k));
      !D || _ || (o?.(E), l?.(E), E.defaultPrevented || c?.());
    }, p), C = Tn((E) => {
      const k = E.target;
      [...u.branches].some(($) => $.contains(k)) || (i?.(E), l?.(E), E.defaultPrevented || c?.());
    }, p);
    return Pn((E) => {
      N === u.layers.size - 1 && (r?.(E), !E.defaultPrevented && c && (E.preventDefault(), c()));
    }, p), a.useEffect(() => {
      if (f)
        return n && (u.layersWithOutsidePointerEventsDisabled.size === 0 && (et = p.body.style.pointerEvents, p.body.style.pointerEvents = "none"), u.layersWithOutsidePointerEventsDisabled.add(f)), u.layers.add(f), tt(), () => {
          n && u.layersWithOutsidePointerEventsDisabled.size === 1 && (p.body.style.pointerEvents = et);
        };
    }, [f, p, n, u]), a.useEffect(() => () => {
      f && (u.layers.delete(f), u.layersWithOutsidePointerEventsDisabled.delete(f), tt());
    }, [f, u]), a.useEffect(() => {
      const E = () => h({});
      return document.addEventListener(_e, E), () => document.removeEventListener(_e, E);
    }, []), /* @__PURE__ */ w(
      mt.div,
      {
        ...s,
        ref: P,
        style: {
          pointerEvents: I ? D ? "auto" : "none" : void 0,
          ...e.style
        },
        onFocusCapture: V(e.onFocusCapture, C.onFocusCapture),
        onBlurCapture: V(e.onBlurCapture, C.onBlurCapture),
        onPointerDownCapture: V(
          e.onPointerDownCapture,
          O.onPointerDownCapture
        )
      }
    );
  }
);
ht.displayName = Nn;
var An = "DismissableLayerBranch", In = a.forwardRef((e, t) => {
  const n = a.useContext(pt), r = a.useRef(null), o = G(t, r);
  return a.useEffect(() => {
    const i = r.current;
    if (i)
      return n.branches.add(i), () => {
        n.branches.delete(i);
      };
  }, [n.branches]), /* @__PURE__ */ w(mt.div, { ...e, ref: o });
});
In.displayName = An;
function xn(e, t = globalThis?.document) {
  const n = ie(e), r = a.useRef(!1), o = a.useRef(() => {
  });
  return a.useEffect(() => {
    const i = (c) => {
      if (c.target && !r.current) {
        let s = function() {
          gt(
            Dn,
            n,
            u,
            { discrete: !0 }
          );
        };
        const u = { originalEvent: c };
        c.pointerType === "touch" ? (t.removeEventListener("click", o.current), o.current = s, t.addEventListener("click", o.current, { once: !0 })) : s();
      } else
        t.removeEventListener("click", o.current);
      r.current = !1;
    }, l = window.setTimeout(() => {
      t.addEventListener("pointerdown", i);
    }, 0);
    return () => {
      window.clearTimeout(l), t.removeEventListener("pointerdown", i), t.removeEventListener("click", o.current);
    };
  }, [t, n]), {
    // ensures we check React component tree (not just DOM tree)
    onPointerDownCapture: () => r.current = !0
  };
}
function Tn(e, t = globalThis?.document) {
  const n = ie(e), r = a.useRef(!1);
  return a.useEffect(() => {
    const o = (i) => {
      i.target && !r.current && gt(On, n, { originalEvent: i }, {
        discrete: !1
      });
    };
    return t.addEventListener("focusin", o), () => t.removeEventListener("focusin", o);
  }, [t, n]), {
    onFocusCapture: () => r.current = !0,
    onBlurCapture: () => r.current = !1
  };
}
function tt() {
  const e = new CustomEvent(_e);
  document.dispatchEvent(e);
}
function gt(e, t, n, { discrete: r }) {
  const o = n.originalEvent.target, i = new CustomEvent(e, { bubbles: !1, cancelable: !0, detail: n });
  t && o.addEventListener(e, t, { once: !0 }), r ? Rn(o, i) : o.dispatchEvent(i);
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
], kn = Mn.reduce((e, t) => {
  const n = /* @__PURE__ */ ce(`Primitive.${t}`), r = a.forwardRef((o, i) => {
    const { asChild: l, ...c } = o, s = l ? n : t;
    return typeof window < "u" && (window[/* @__PURE__ */ Symbol.for("radix-ui")] = !0), /* @__PURE__ */ w(s, { ...c, ref: i });
  });
  return r.displayName = `Primitive.${t}`, { ...e, [t]: r };
}, {}), Oe = "focusScope.autoFocusOnMount", Ae = "focusScope.autoFocusOnUnmount", nt = { bubbles: !1, cancelable: !0 }, Ln = "FocusScope", yt = a.forwardRef((e, t) => {
  const {
    loop: n = !1,
    trapped: r = !1,
    onMountAutoFocus: o,
    onUnmountAutoFocus: i,
    ...l
  } = e, [c, s] = a.useState(null), u = ie(o), f = ie(i), v = a.useRef(null), p = G(t, (m) => s(m)), h = a.useRef({
    paused: !1,
    pause() {
      this.paused = !0;
    },
    resume() {
      this.paused = !1;
    }
  }).current;
  a.useEffect(() => {
    if (r) {
      let m = function(I) {
        if (h.paused || !c) return;
        const D = I.target;
        c.contains(D) ? v.current = D : U(v.current, { select: !0 });
      }, y = function(I) {
        if (h.paused || !c) return;
        const D = I.relatedTarget;
        D !== null && (c.contains(D) || U(v.current, { select: !0 }));
      }, S = function(I) {
        if (document.activeElement === document.body)
          for (const O of I)
            O.removedNodes.length > 0 && U(c);
      };
      document.addEventListener("focusin", m), document.addEventListener("focusout", y);
      const N = new MutationObserver(S);
      return c && N.observe(c, { childList: !0, subtree: !0 }), () => {
        document.removeEventListener("focusin", m), document.removeEventListener("focusout", y), N.disconnect();
      };
    }
  }, [r, c, h.paused]), a.useEffect(() => {
    if (c) {
      ot.add(h);
      const m = document.activeElement;
      if (!c.contains(m)) {
        const S = new CustomEvent(Oe, nt);
        c.addEventListener(Oe, u), c.dispatchEvent(S), S.defaultPrevented || (Fn(Un(Et(c)), { select: !0 }), document.activeElement === m && U(c));
      }
      return () => {
        c.removeEventListener(Oe, u), setTimeout(() => {
          const S = new CustomEvent(Ae, nt);
          c.addEventListener(Ae, f), c.dispatchEvent(S), S.defaultPrevented || U(m ?? document.body, { select: !0 }), c.removeEventListener(Ae, f), ot.remove(h);
        }, 0);
      };
    }
  }, [c, u, f, h]);
  const P = a.useCallback(
    (m) => {
      if (!n && !r || h.paused) return;
      const y = m.key === "Tab" && !m.altKey && !m.ctrlKey && !m.metaKey, S = document.activeElement;
      if (y && S) {
        const N = m.currentTarget, [I, D] = _n(N);
        I && D ? !m.shiftKey && S === D ? (m.preventDefault(), n && U(I, { select: !0 })) : m.shiftKey && S === I && (m.preventDefault(), n && U(D, { select: !0 })) : S === N && m.preventDefault();
      }
    },
    [n, r, h.paused]
  );
  return /* @__PURE__ */ w(kn.div, { tabIndex: -1, ...l, ref: p, onKeyDown: P });
});
yt.displayName = Ln;
function Fn(e, { select: t = !1 } = {}) {
  const n = document.activeElement;
  for (const r of e)
    if (U(r, { select: t }), document.activeElement !== n) return;
}
function _n(e) {
  const t = Et(e), n = rt(t, e), r = rt(t.reverse(), e);
  return [n, r];
}
function Et(e) {
  const t = [], n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (r) => {
      const o = r.tagName === "INPUT" && r.type === "hidden";
      return r.disabled || r.hidden || o ? NodeFilter.FILTER_SKIP : r.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  for (; n.nextNode(); ) t.push(n.currentNode);
  return t;
}
function rt(e, t) {
  for (const n of e)
    if (!$n(n, { upTo: t })) return n;
}
function $n(e, { upTo: t }) {
  if (getComputedStyle(e).visibility === "hidden") return !0;
  for (; e; ) {
    if (t !== void 0 && e === t) return !1;
    if (getComputedStyle(e).display === "none") return !0;
    e = e.parentElement;
  }
  return !1;
}
function Wn(e) {
  return e instanceof HTMLInputElement && "select" in e;
}
function U(e, { select: t = !1 } = {}) {
  if (e && e.focus) {
    const n = document.activeElement;
    e.focus({ preventScroll: !0 }), e !== n && Wn(e) && t && e.select();
  }
}
var ot = Bn();
function Bn() {
  let e = [];
  return {
    add(t) {
      const n = e[0];
      t !== n && n?.pause(), e = at(e, t), e.unshift(t);
    },
    remove(t) {
      e = at(e, t), e[0]?.resume();
    }
  };
}
function at(e, t) {
  const n = [...e], r = n.indexOf(t);
  return r !== -1 && n.splice(r, 1), n;
}
function Un(e) {
  return e.filter((t) => t.tagName !== "A");
}
var Vn = [
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
], jn = Vn.reduce((e, t) => {
  const n = /* @__PURE__ */ ce(`Primitive.${t}`), r = a.forwardRef((o, i) => {
    const { asChild: l, ...c } = o, s = l ? n : t;
    return typeof window < "u" && (window[/* @__PURE__ */ Symbol.for("radix-ui")] = !0), /* @__PURE__ */ w(s, { ...c, ref: i });
  });
  return r.displayName = `Primitive.${t}`, { ...e, [t]: r };
}, {}), Kn = "Portal", bt = a.forwardRef((e, t) => {
  const { container: n, ...r } = e, [o, i] = a.useState(!1);
  ae(() => i(!0), []);
  const l = n || o && globalThis?.document?.body;
  return l ? Qt.createPortal(/* @__PURE__ */ w(jn.div, { ...r, ref: t }), l) : null;
});
bt.displayName = Kn;
function Hn(e, t) {
  return a.useReducer((n, r) => t[n][r] ?? n, e);
}
var be = (e) => {
  const { present: t, children: n } = e, r = Yn(t), o = typeof n == "function" ? n({ present: r.isPresent }) : a.Children.only(n), i = G(r.ref, zn(o));
  return typeof n == "function" || r.isPresent ? a.cloneElement(o, { ref: i }) : null;
};
be.displayName = "Presence";
function Yn(e) {
  const [t, n] = a.useState(), r = a.useRef(null), o = a.useRef(e), i = a.useRef("none"), l = e ? "mounted" : "unmounted", [c, s] = Hn(l, {
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
  return a.useEffect(() => {
    const u = de(r.current);
    i.current = c === "mounted" ? u : "none";
  }, [c]), ae(() => {
    const u = r.current, f = o.current;
    if (f !== e) {
      const p = i.current, h = de(u);
      e ? s("MOUNT") : h === "none" || u?.display === "none" ? s("UNMOUNT") : s(f && p !== h ? "ANIMATION_OUT" : "UNMOUNT"), o.current = e;
    }
  }, [e, s]), ae(() => {
    if (t) {
      let u;
      const f = t.ownerDocument.defaultView ?? window, v = (h) => {
        const m = de(r.current).includes(CSS.escape(h.animationName));
        if (h.target === t && m && (s("ANIMATION_END"), !o.current)) {
          const y = t.style.animationFillMode;
          t.style.animationFillMode = "forwards", u = f.setTimeout(() => {
            t.style.animationFillMode === "forwards" && (t.style.animationFillMode = y);
          });
        }
      }, p = (h) => {
        h.target === t && (i.current = de(r.current));
      };
      return t.addEventListener("animationstart", p), t.addEventListener("animationcancel", v), t.addEventListener("animationend", v), () => {
        f.clearTimeout(u), t.removeEventListener("animationstart", p), t.removeEventListener("animationcancel", v), t.removeEventListener("animationend", v);
      };
    } else
      s("ANIMATION_END");
  }, [t, s]), {
    isPresent: ["mounted", "unmountSuspended"].includes(c),
    ref: a.useCallback((u) => {
      r.current = u ? getComputedStyle(u) : null, n(u);
    }, [])
  };
}
function de(e) {
  return e?.animationName || "none";
}
function zn(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var Gn = [
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
], le = Gn.reduce((e, t) => {
  const n = /* @__PURE__ */ ce(`Primitive.${t}`), r = a.forwardRef((o, i) => {
    const { asChild: l, ...c } = o, s = l ? n : t;
    return typeof window < "u" && (window[/* @__PURE__ */ Symbol.for("radix-ui")] = !0), /* @__PURE__ */ w(s, { ...c, ref: i });
  });
  return r.displayName = `Primitive.${t}`, { ...e, [t]: r };
}, {}), Ie = 0;
function Xn() {
  a.useEffect(() => {
    const e = document.querySelectorAll("[data-radix-focus-guard]");
    return document.body.insertAdjacentElement("afterbegin", e[0] ?? it()), document.body.insertAdjacentElement("beforeend", e[1] ?? it()), Ie++, () => {
      Ie === 1 && document.querySelectorAll("[data-radix-focus-guard]").forEach((t) => t.remove()), Ie--;
    };
  }, []);
}
function it() {
  const e = document.createElement("span");
  return e.setAttribute("data-radix-focus-guard", ""), e.tabIndex = 0, e.style.outline = "none", e.style.opacity = "0", e.style.position = "fixed", e.style.pointerEvents = "none", e;
}
var F = function() {
  return F = Object.assign || function(t) {
    for (var n, r = 1, o = arguments.length; r < o; r++) {
      n = arguments[r];
      for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i]);
    }
    return t;
  }, F.apply(this, arguments);
};
function wt(e, t) {
  var n = {};
  for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var o = 0, r = Object.getOwnPropertySymbols(e); o < r.length; o++)
      t.indexOf(r[o]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[o]) && (n[r[o]] = e[r[o]]);
  return n;
}
function qn(e, t, n) {
  if (n || arguments.length === 2) for (var r = 0, o = t.length, i; r < o; r++)
    (i || !(r in t)) && (i || (i = Array.prototype.slice.call(t, 0, r)), i[r] = t[r]);
  return e.concat(i || Array.prototype.slice.call(t));
}
var he = "right-scroll-bar-position", ge = "width-before-scroll-bar", Zn = "with-scroll-bars-hidden", Qn = "--removed-body-scroll-bar-size";
function xe(e, t) {
  return typeof e == "function" ? e(t) : e && (e.current = t), e;
}
function Jn(e, t) {
  var n = qt(function() {
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
var er = typeof window < "u" ? a.useLayoutEffect : a.useEffect, ct = /* @__PURE__ */ new WeakMap();
function tr(e, t) {
  var n = Jn(null, function(r) {
    return e.forEach(function(o) {
      return xe(o, r);
    });
  });
  return er(function() {
    var r = ct.get(n);
    if (r) {
      var o = new Set(r), i = new Set(e), l = n.current;
      o.forEach(function(c) {
        i.has(c) || xe(c, null);
      }), i.forEach(function(c) {
        o.has(c) || xe(c, l);
      });
    }
    ct.set(n, e);
  }, [e]), n;
}
function nr(e) {
  return e;
}
function rr(e, t) {
  t === void 0 && (t = nr);
  var n = [], r = !1, o = {
    read: function() {
      if (r)
        throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");
      return n.length ? n[n.length - 1] : e;
    },
    useMedium: function(i) {
      var l = t(i, r);
      return n.push(l), function() {
        n = n.filter(function(c) {
          return c !== l;
        });
      };
    },
    assignSyncMedium: function(i) {
      for (r = !0; n.length; ) {
        var l = n;
        n = [], l.forEach(i);
      }
      n = {
        push: function(c) {
          return i(c);
        },
        filter: function() {
          return n;
        }
      };
    },
    assignMedium: function(i) {
      r = !0;
      var l = [];
      if (n.length) {
        var c = n;
        n = [], c.forEach(i), l = n;
      }
      var s = function() {
        var f = l;
        l = [], f.forEach(i);
      }, u = function() {
        return Promise.resolve().then(s);
      };
      u(), n = {
        push: function(f) {
          l.push(f), u();
        },
        filter: function(f) {
          return l = l.filter(f), n;
        }
      };
    }
  };
  return o;
}
function or(e) {
  e === void 0 && (e = {});
  var t = rr(null);
  return t.options = F({ async: !0, ssr: !1 }, e), t;
}
var St = function(e) {
  var t = e.sideCar, n = wt(e, ["sideCar"]);
  if (!t)
    throw new Error("Sidecar: please provide `sideCar` property to import the right car");
  var r = t.read();
  if (!r)
    throw new Error("Sidecar medium not found");
  return a.createElement(r, F({}, n));
};
St.isSideCarExport = !0;
function ar(e, t) {
  return e.useMedium(t), St;
}
var Ct = or(), Te = function() {
}, we = a.forwardRef(function(e, t) {
  var n = a.useRef(null), r = a.useState({
    onScrollCapture: Te,
    onWheelCapture: Te,
    onTouchMoveCapture: Te
  }), o = r[0], i = r[1], l = e.forwardProps, c = e.children, s = e.className, u = e.removeScrollBar, f = e.enabled, v = e.shards, p = e.sideCar, h = e.noRelative, P = e.noIsolation, m = e.inert, y = e.allowPinchZoom, S = e.as, N = S === void 0 ? "div" : S, I = e.gapMode, D = wt(e, ["forwardProps", "children", "className", "removeScrollBar", "enabled", "shards", "sideCar", "noRelative", "noIsolation", "inert", "allowPinchZoom", "as", "gapMode"]), O = p, C = tr([n, t]), E = F(F({}, D), o);
  return a.createElement(
    a.Fragment,
    null,
    f && a.createElement(O, { sideCar: Ct, removeScrollBar: u, shards: v, noRelative: h, noIsolation: P, inert: m, setCallbacks: i, allowPinchZoom: !!y, lockRef: n, gapMode: I }),
    l ? a.cloneElement(a.Children.only(c), F(F({}, E), { ref: C })) : a.createElement(N, F({}, E, { className: s, ref: C }), c)
  );
});
we.defaultProps = {
  enabled: !0,
  removeScrollBar: !0,
  inert: !1
};
we.classNames = {
  fullWidth: ge,
  zeroRight: he
};
var ir = function() {
  if (typeof __webpack_nonce__ < "u")
    return __webpack_nonce__;
};
function cr() {
  if (!document)
    return null;
  var e = document.createElement("style");
  e.type = "text/css";
  var t = ir();
  return t && e.setAttribute("nonce", t), e;
}
function lr(e, t) {
  e.styleSheet ? e.styleSheet.cssText = t : e.appendChild(document.createTextNode(t));
}
function ur(e) {
  var t = document.head || document.getElementsByTagName("head")[0];
  t.appendChild(e);
}
var sr = function() {
  var e = 0, t = null;
  return {
    add: function(n) {
      e == 0 && (t = cr()) && (lr(t, n), ur(t)), e++;
    },
    remove: function() {
      e--, !e && t && (t.parentNode && t.parentNode.removeChild(t), t = null);
    }
  };
}, dr = function() {
  var e = sr();
  return function(t, n) {
    a.useEffect(function() {
      return e.add(t), function() {
        e.remove();
      };
    }, [t && n]);
  };
}, Rt = function() {
  var e = dr(), t = function(n) {
    var r = n.styles, o = n.dynamic;
    return e(r, o), null;
  };
  return t;
}, fr = {
  left: 0,
  top: 0,
  right: 0,
  gap: 0
}, Me = function(e) {
  return parseInt(e || "", 10) || 0;
}, vr = function(e) {
  var t = window.getComputedStyle(document.body), n = t[e === "padding" ? "paddingLeft" : "marginLeft"], r = t[e === "padding" ? "paddingTop" : "marginTop"], o = t[e === "padding" ? "paddingRight" : "marginRight"];
  return [Me(n), Me(r), Me(o)];
}, mr = function(e) {
  if (e === void 0 && (e = "margin"), typeof window > "u")
    return fr;
  var t = vr(e), n = document.documentElement.clientWidth, r = window.innerWidth;
  return {
    left: t[0],
    top: t[1],
    right: t[2],
    gap: Math.max(0, r - n + t[2] - t[0])
  };
}, pr = Rt(), ne = "data-scroll-locked", hr = function(e, t, n, r) {
  var o = e.left, i = e.top, l = e.right, c = e.gap;
  return n === void 0 && (n = "margin"), `
  .`.concat(Zn, ` {
   overflow: hidden `).concat(r, `;
   padding-right: `).concat(c, "px ").concat(r, `;
  }
  body[`).concat(ne, `] {
    overflow: hidden `).concat(r, `;
    overscroll-behavior: contain;
    `).concat([
    t && "position: relative ".concat(r, ";"),
    n === "margin" && `
    padding-left: `.concat(o, `px;
    padding-top: `).concat(i, `px;
    padding-right: `).concat(l, `px;
    margin-left:0;
    margin-top:0;
    margin-right: `).concat(c, "px ").concat(r, `;
    `),
    n === "padding" && "padding-right: ".concat(c, "px ").concat(r, ";")
  ].filter(Boolean).join(""), `
  }
  
  .`).concat(he, ` {
    right: `).concat(c, "px ").concat(r, `;
  }
  
  .`).concat(ge, ` {
    margin-right: `).concat(c, "px ").concat(r, `;
  }
  
  .`).concat(he, " .").concat(he, ` {
    right: 0 `).concat(r, `;
  }
  
  .`).concat(ge, " .").concat(ge, ` {
    margin-right: 0 `).concat(r, `;
  }
  
  body[`).concat(ne, `] {
    `).concat(Qn, ": ").concat(c, `px;
  }
`);
}, lt = function() {
  var e = parseInt(document.body.getAttribute(ne) || "0", 10);
  return isFinite(e) ? e : 0;
}, gr = function() {
  a.useEffect(function() {
    return document.body.setAttribute(ne, (lt() + 1).toString()), function() {
      var e = lt() - 1;
      e <= 0 ? document.body.removeAttribute(ne) : document.body.setAttribute(ne, e.toString());
    };
  }, []);
}, yr = function(e) {
  var t = e.noRelative, n = e.noImportant, r = e.gapMode, o = r === void 0 ? "margin" : r;
  gr();
  var i = a.useMemo(function() {
    return mr(o);
  }, [o]);
  return a.createElement(pr, { styles: hr(i, !t, o, n ? "" : "!important") });
}, $e = !1;
if (typeof window < "u")
  try {
    var fe = Object.defineProperty({}, "passive", {
      get: function() {
        return $e = !0, !0;
      }
    });
    window.addEventListener("test", fe, fe), window.removeEventListener("test", fe, fe);
  } catch {
    $e = !1;
  }
var Z = $e ? { passive: !1 } : !1, Er = function(e) {
  return e.tagName === "TEXTAREA";
}, Pt = function(e, t) {
  if (!(e instanceof Element))
    return !1;
  var n = window.getComputedStyle(e);
  return (
    // not-not-scrollable
    n[t] !== "hidden" && // contains scroll inside self
    !(n.overflowY === n.overflowX && !Er(e) && n[t] === "visible")
  );
}, br = function(e) {
  return Pt(e, "overflowY");
}, wr = function(e) {
  return Pt(e, "overflowX");
}, ut = function(e, t) {
  var n = t.ownerDocument, r = t;
  do {
    typeof ShadowRoot < "u" && r instanceof ShadowRoot && (r = r.host);
    var o = Nt(e, r);
    if (o) {
      var i = Dt(e, r), l = i[1], c = i[2];
      if (l > c)
        return !0;
    }
    r = r.parentNode;
  } while (r && r !== n.body);
  return !1;
}, Sr = function(e) {
  var t = e.scrollTop, n = e.scrollHeight, r = e.clientHeight;
  return [
    t,
    n,
    r
  ];
}, Cr = function(e) {
  var t = e.scrollLeft, n = e.scrollWidth, r = e.clientWidth;
  return [
    t,
    n,
    r
  ];
}, Nt = function(e, t) {
  return e === "v" ? br(t) : wr(t);
}, Dt = function(e, t) {
  return e === "v" ? Sr(t) : Cr(t);
}, Rr = function(e, t) {
  return e === "h" && t === "rtl" ? -1 : 1;
}, Pr = function(e, t, n, r, o) {
  var i = Rr(e, window.getComputedStyle(t).direction), l = i * r, c = n.target, s = t.contains(c), u = !1, f = l > 0, v = 0, p = 0;
  do {
    if (!c)
      break;
    var h = Dt(e, c), P = h[0], m = h[1], y = h[2], S = m - y - i * P;
    (P || S) && Nt(e, c) && (v += S, p += P);
    var N = c.parentNode;
    c = N && N.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? N.host : N;
  } while (
    // portaled content
    !s && c !== document.body || // self content
    s && (t.contains(c) || t === c)
  );
  return (f && Math.abs(v) < 1 || !f && Math.abs(p) < 1) && (u = !0), u;
}, ve = function(e) {
  return "changedTouches" in e ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY] : [0, 0];
}, st = function(e) {
  return [e.deltaX, e.deltaY];
}, dt = function(e) {
  return e && "current" in e ? e.current : e;
}, Nr = function(e, t) {
  return e[0] === t[0] && e[1] === t[1];
}, Dr = function(e) {
  return `
  .block-interactivity-`.concat(e, ` {pointer-events: none;}
  .allow-interactivity-`).concat(e, ` {pointer-events: all;}
`);
}, Or = 0, Q = [];
function Ar(e) {
  var t = a.useRef([]), n = a.useRef([0, 0]), r = a.useRef(), o = a.useState(Or++)[0], i = a.useState(Rt)[0], l = a.useRef(e);
  a.useEffect(function() {
    l.current = e;
  }, [e]), a.useEffect(function() {
    if (e.inert) {
      document.body.classList.add("block-interactivity-".concat(o));
      var m = qn([e.lockRef.current], (e.shards || []).map(dt), !0).filter(Boolean);
      return m.forEach(function(y) {
        return y.classList.add("allow-interactivity-".concat(o));
      }), function() {
        document.body.classList.remove("block-interactivity-".concat(o)), m.forEach(function(y) {
          return y.classList.remove("allow-interactivity-".concat(o));
        });
      };
    }
  }, [e.inert, e.lockRef.current, e.shards]);
  var c = a.useCallback(function(m, y) {
    if ("touches" in m && m.touches.length === 2 || m.type === "wheel" && m.ctrlKey)
      return !l.current.allowPinchZoom;
    var S = ve(m), N = n.current, I = "deltaX" in m ? m.deltaX : N[0] - S[0], D = "deltaY" in m ? m.deltaY : N[1] - S[1], O, C = m.target, E = Math.abs(I) > Math.abs(D) ? "h" : "v";
    if ("touches" in m && E === "h" && C.type === "range")
      return !1;
    var k = window.getSelection(), _ = k && k.anchorNode, $ = _ ? _ === C || _.contains(C) : !1;
    if ($)
      return !1;
    var B = ut(E, C);
    if (!B)
      return !0;
    if (B ? O = E : (O = E === "v" ? "h" : "v", B = ut(E, C)), !B)
      return !1;
    if (!r.current && "changedTouches" in m && (I || D) && (r.current = O), !O)
      return !0;
    var X = r.current || O;
    return Pr(X, y, m, X === "h" ? I : D);
  }, []), s = a.useCallback(function(m) {
    var y = m;
    if (!(!Q.length || Q[Q.length - 1] !== i)) {
      var S = "deltaY" in y ? st(y) : ve(y), N = t.current.filter(function(O) {
        return O.name === y.type && (O.target === y.target || y.target === O.shadowParent) && Nr(O.delta, S);
      })[0];
      if (N && N.should) {
        y.cancelable && y.preventDefault();
        return;
      }
      if (!N) {
        var I = (l.current.shards || []).map(dt).filter(Boolean).filter(function(O) {
          return O.contains(y.target);
        }), D = I.length > 0 ? c(y, I[0]) : !l.current.noIsolation;
        D && y.cancelable && y.preventDefault();
      }
    }
  }, []), u = a.useCallback(function(m, y, S, N) {
    var I = { name: m, delta: y, target: S, should: N, shadowParent: Ir(S) };
    t.current.push(I), setTimeout(function() {
      t.current = t.current.filter(function(D) {
        return D !== I;
      });
    }, 1);
  }, []), f = a.useCallback(function(m) {
    n.current = ve(m), r.current = void 0;
  }, []), v = a.useCallback(function(m) {
    u(m.type, st(m), m.target, c(m, e.lockRef.current));
  }, []), p = a.useCallback(function(m) {
    u(m.type, ve(m), m.target, c(m, e.lockRef.current));
  }, []);
  a.useEffect(function() {
    return Q.push(i), e.setCallbacks({
      onScrollCapture: v,
      onWheelCapture: v,
      onTouchMoveCapture: p
    }), document.addEventListener("wheel", s, Z), document.addEventListener("touchmove", s, Z), document.addEventListener("touchstart", f, Z), function() {
      Q = Q.filter(function(m) {
        return m !== i;
      }), document.removeEventListener("wheel", s, Z), document.removeEventListener("touchmove", s, Z), document.removeEventListener("touchstart", f, Z);
    };
  }, []);
  var h = e.removeScrollBar, P = e.inert;
  return a.createElement(
    a.Fragment,
    null,
    P ? a.createElement(i, { styles: Dr(o) }) : null,
    h ? a.createElement(yr, { noRelative: e.noRelative, gapMode: e.gapMode }) : null
  );
}
function Ir(e) {
  for (var t = null; e !== null; )
    e instanceof ShadowRoot && (t = e.host, e = e.host), e = e.parentNode;
  return t;
}
const xr = ar(Ct, Ar);
var Ot = a.forwardRef(function(e, t) {
  return a.createElement(we, F({}, e, { ref: t, sideCar: xr }));
});
Ot.classNames = we.classNames;
var Tr = function(e) {
  if (typeof document > "u")
    return null;
  var t = Array.isArray(e) ? e[0] : e;
  return t.ownerDocument.body;
}, J = /* @__PURE__ */ new WeakMap(), me = /* @__PURE__ */ new WeakMap(), pe = {}, ke = 0, At = function(e) {
  return e && (e.host || At(e.parentNode));
}, Mr = function(e, t) {
  return t.map(function(n) {
    if (e.contains(n))
      return n;
    var r = At(n);
    return r && e.contains(r) ? r : (console.error("aria-hidden", n, "in not contained inside", e, ". Doing nothing"), null);
  }).filter(function(n) {
    return !!n;
  });
}, kr = function(e, t, n, r) {
  var o = Mr(t, Array.isArray(e) ? e : [e]);
  pe[n] || (pe[n] = /* @__PURE__ */ new WeakMap());
  var i = pe[n], l = [], c = /* @__PURE__ */ new Set(), s = new Set(o), u = function(v) {
    !v || c.has(v) || (c.add(v), u(v.parentNode));
  };
  o.forEach(u);
  var f = function(v) {
    !v || s.has(v) || Array.prototype.forEach.call(v.children, function(p) {
      if (c.has(p))
        f(p);
      else
        try {
          var h = p.getAttribute(r), P = h !== null && h !== "false", m = (J.get(p) || 0) + 1, y = (i.get(p) || 0) + 1;
          J.set(p, m), i.set(p, y), l.push(p), m === 1 && P && me.set(p, !0), y === 1 && p.setAttribute(n, "true"), P || p.setAttribute(r, "true");
        } catch (S) {
          console.error("aria-hidden: cannot operate on ", p, S);
        }
    });
  };
  return f(t), c.clear(), ke++, function() {
    l.forEach(function(v) {
      var p = J.get(v) - 1, h = i.get(v) - 1;
      J.set(v, p), i.set(v, h), p || (me.has(v) || v.removeAttribute(r), me.delete(v)), h || v.removeAttribute(n);
    }), ke--, ke || (J = /* @__PURE__ */ new WeakMap(), J = /* @__PURE__ */ new WeakMap(), me = /* @__PURE__ */ new WeakMap(), pe = {});
  };
}, Lr = function(e, t, n) {
  n === void 0 && (n = "data-aria-hidden");
  var r = Array.from(Array.isArray(e) ? e : [e]), o = Tr(e);
  return o ? (r.push.apply(r, Array.from(o.querySelectorAll("[aria-live], script"))), kr(r, o, n, "aria-hidden")) : function() {
    return null;
  };
}, Se = "Dialog", [It] = sn(Se), [Fr, L] = It(Se), xt = (e) => {
  const {
    __scopeDialog: t,
    children: n,
    open: r,
    defaultOpen: o,
    onOpenChange: i,
    modal: l = !0
  } = e, c = a.useRef(null), s = a.useRef(null), [u, f] = pn({
    prop: r,
    defaultProp: o ?? !1,
    onChange: i,
    caller: Se
  });
  return /* @__PURE__ */ w(
    Fr,
    {
      scope: t,
      triggerRef: c,
      contentRef: s,
      contentId: W(),
      titleId: W(),
      descriptionId: W(),
      open: u,
      onOpenChange: f,
      onOpenToggle: a.useCallback(() => f((v) => !v), [f]),
      modal: l,
      children: n
    }
  );
};
xt.displayName = Se;
var Tt = "DialogTrigger", _r = a.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...r } = e, o = L(Tt, n), i = G(t, o.triggerRef);
    return /* @__PURE__ */ w(
      le.button,
      {
        type: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": o.open,
        "aria-controls": o.contentId,
        "data-state": Ve(o.open),
        ...r,
        ref: i,
        onClick: V(e.onClick, o.onOpenToggle)
      }
    );
  }
);
_r.displayName = Tt;
var Be = "DialogPortal", [$r, Mt] = It(Be, {
  forceMount: void 0
}), kt = (e) => {
  const { __scopeDialog: t, forceMount: n, children: r, container: o } = e, i = L(Be, t);
  return /* @__PURE__ */ w($r, { scope: t, forceMount: n, children: a.Children.map(r, (l) => /* @__PURE__ */ w(be, { present: n || i.open, children: /* @__PURE__ */ w(bt, { asChild: !0, container: o, children: l }) })) });
};
kt.displayName = Be;
var ye = "DialogOverlay", Lt = a.forwardRef(
  (e, t) => {
    const n = Mt(ye, e.__scopeDialog), { forceMount: r = n.forceMount, ...o } = e, i = L(ye, e.__scopeDialog);
    return i.modal ? /* @__PURE__ */ w(be, { present: r || i.open, children: /* @__PURE__ */ w(Br, { ...o, ref: t }) }) : null;
  }
);
Lt.displayName = ye;
var Wr = /* @__PURE__ */ ce("DialogOverlay.RemoveScroll"), Br = a.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...r } = e, o = L(ye, n);
    return (
      // Make sure `Content` is scrollable even when it doesn't live inside `RemoveScroll`
      // ie. when `Overlay` and `Content` are siblings
      /* @__PURE__ */ w(Ot, { as: Wr, allowPinchZoom: !0, shards: [o.contentRef], children: /* @__PURE__ */ w(
        le.div,
        {
          "data-state": Ve(o.open),
          ...r,
          ref: t,
          style: { pointerEvents: "auto", ...r.style }
        }
      ) })
    );
  }
), Y = "DialogContent", Ft = a.forwardRef(
  (e, t) => {
    const n = Mt(Y, e.__scopeDialog), { forceMount: r = n.forceMount, ...o } = e, i = L(Y, e.__scopeDialog);
    return /* @__PURE__ */ w(be, { present: r || i.open, children: i.modal ? /* @__PURE__ */ w(Ur, { ...o, ref: t }) : /* @__PURE__ */ w(Vr, { ...o, ref: t }) });
  }
);
Ft.displayName = Y;
var Ur = a.forwardRef(
  (e, t) => {
    const n = L(Y, e.__scopeDialog), r = a.useRef(null), o = G(t, n.contentRef, r);
    return a.useEffect(() => {
      const i = r.current;
      if (i) return Lr(i);
    }, []), /* @__PURE__ */ w(
      _t,
      {
        ...e,
        ref: o,
        trapFocus: n.open,
        disableOutsidePointerEvents: !0,
        onCloseAutoFocus: V(e.onCloseAutoFocus, (i) => {
          i.preventDefault(), n.triggerRef.current?.focus();
        }),
        onPointerDownOutside: V(e.onPointerDownOutside, (i) => {
          const l = i.detail.originalEvent, c = l.button === 0 && l.ctrlKey === !0;
          (l.button === 2 || c) && i.preventDefault();
        }),
        onFocusOutside: V(
          e.onFocusOutside,
          (i) => i.preventDefault()
        )
      }
    );
  }
), Vr = a.forwardRef(
  (e, t) => {
    const n = L(Y, e.__scopeDialog), r = a.useRef(!1), o = a.useRef(!1);
    return /* @__PURE__ */ w(
      _t,
      {
        ...e,
        ref: t,
        trapFocus: !1,
        disableOutsidePointerEvents: !1,
        onCloseAutoFocus: (i) => {
          e.onCloseAutoFocus?.(i), i.defaultPrevented || (r.current || n.triggerRef.current?.focus(), i.preventDefault()), r.current = !1, o.current = !1;
        },
        onInteractOutside: (i) => {
          e.onInteractOutside?.(i), i.defaultPrevented || (r.current = !0, i.detail.originalEvent.type === "pointerdown" && (o.current = !0));
          const l = i.target;
          n.triggerRef.current?.contains(l) && i.preventDefault(), i.detail.originalEvent.type === "focusin" && o.current && i.preventDefault();
        }
      }
    );
  }
), _t = a.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, trapFocus: r, onOpenAutoFocus: o, onCloseAutoFocus: i, ...l } = e, c = L(Y, n), s = a.useRef(null), u = G(t, s);
    return Xn(), /* @__PURE__ */ Xe(qe, { children: [
      /* @__PURE__ */ w(
        yt,
        {
          asChild: !0,
          loop: !0,
          trapped: r,
          onMountAutoFocus: o,
          onUnmountAutoFocus: i,
          children: /* @__PURE__ */ w(
            ht,
            {
              role: "dialog",
              id: c.contentId,
              "aria-describedby": c.descriptionId,
              "aria-labelledby": c.titleId,
              "data-state": Ve(c.open),
              ...l,
              ref: u,
              onDismiss: () => c.onOpenChange(!1)
            }
          )
        }
      ),
      /* @__PURE__ */ Xe(qe, { children: [
        /* @__PURE__ */ w(Yr, { titleId: c.titleId }),
        /* @__PURE__ */ w(Gr, { contentRef: s, descriptionId: c.descriptionId })
      ] })
    ] });
  }
), Ue = "DialogTitle", jr = a.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...r } = e, o = L(Ue, n);
    return /* @__PURE__ */ w(le.h2, { id: o.titleId, ...r, ref: t });
  }
);
jr.displayName = Ue;
var $t = "DialogDescription", Kr = a.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...r } = e, o = L($t, n);
    return /* @__PURE__ */ w(le.p, { id: o.descriptionId, ...r, ref: t });
  }
);
Kr.displayName = $t;
var Wt = "DialogClose", Hr = a.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...r } = e, o = L(Wt, n);
    return /* @__PURE__ */ w(
      le.button,
      {
        type: "button",
        ...r,
        ref: t,
        onClick: V(e.onClick, () => o.onOpenChange(!1))
      }
    );
  }
);
Hr.displayName = Wt;
function Ve(e) {
  return e ? "open" : "closed";
}
var Bt = "DialogTitleWarning", [Do, Ut] = un(Bt, {
  contentName: Y,
  titleName: Ue,
  docsSlug: "dialog"
}), Yr = ({ titleId: e }) => {
  const t = Ut(Bt), n = `\`${t.contentName}\` requires a \`${t.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${t.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${t.docsSlug}`;
  return a.useEffect(() => {
    e && (document.getElementById(e) || console.error(n));
  }, [n, e]), null;
}, zr = "DialogDescriptionWarning", Gr = ({ contentRef: e, descriptionId: t }) => {
  const r = `Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${Ut(zr).contentName}}.`;
  return a.useEffect(() => {
    const o = e.current?.getAttribute("aria-describedby");
    t && o && (document.getElementById(t) || console.warn(r));
  }, [r, e, t]), null;
}, Xr = xt, qr = kt, Zr = Lt, Qr = Ft, Jr = /* @__PURE__ */ Symbol.for("react.lazy"), Ee = a[" use ".trim().toString()];
function eo(e) {
  return typeof e == "object" && e !== null && "then" in e;
}
function Vt(e) {
  return e != null && typeof e == "object" && "$$typeof" in e && e.$$typeof === Jr && "_payload" in e && eo(e._payload);
}
// @__NO_SIDE_EFFECTS__
function to(e) {
  const t = /* @__PURE__ */ no(e), n = a.forwardRef((r, o) => {
    let { children: i, ...l } = r;
    Vt(i) && typeof Ee == "function" && (i = Ee(i._payload));
    const c = a.Children.toArray(i), s = c.find(oo);
    if (s) {
      const u = s.props.children, f = c.map((v) => v === s ? a.Children.count(u) > 1 ? a.Children.only(null) : a.isValidElement(u) ? u.props.children : null : v);
      return /* @__PURE__ */ w(t, { ...l, ref: o, children: a.isValidElement(u) ? a.cloneElement(u, void 0, f) : null });
    }
    return /* @__PURE__ */ w(t, { ...l, ref: o, children: i });
  });
  return n.displayName = `${e}.Slot`, n;
}
// @__NO_SIDE_EFFECTS__
function no(e) {
  const t = a.forwardRef((n, r) => {
    let { children: o, ...i } = n;
    if (Vt(o) && typeof Ee == "function" && (o = Ee(o._payload)), a.isValidElement(o)) {
      const l = io(o), c = ao(i, o.props);
      return o.type !== a.Fragment && (c.ref = r ? j(r, l) : l), a.cloneElement(o, c);
    }
    return a.Children.count(o) > 1 ? a.Children.only(null) : null;
  });
  return t.displayName = `${e}.SlotClone`, t;
}
var ro = /* @__PURE__ */ Symbol("radix.slottable");
function oo(e) {
  return a.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === ro;
}
function ao(e, t) {
  const n = { ...t };
  for (const r in t) {
    const o = e[r], i = t[r];
    /^on[A-Z]/.test(r) ? o && i ? n[r] = (...c) => {
      const s = i(...c);
      return o(...c), s;
    } : o && (n[r] = o) : r === "style" ? n[r] = { ...o, ...i } : r === "className" && (n[r] = [o, i].filter(Boolean).join(" "));
  }
  return { ...e, ...n };
}
function io(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var co = [
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
], H = co.reduce((e, t) => {
  const n = /* @__PURE__ */ to(`Primitive.${t}`), r = a.forwardRef((o, i) => {
    const { asChild: l, ...c } = o, s = l ? n : t;
    return typeof window < "u" && (window[/* @__PURE__ */ Symbol.for("radix-ui")] = !0), /* @__PURE__ */ w(s, { ...c, ref: i });
  });
  return r.displayName = `Primitive.${t}`, { ...e, [t]: r };
}, {}), oe = '[cmdk-group=""]', Le = '[cmdk-group-items=""]', lo = '[cmdk-group-heading=""]', jt = '[cmdk-item=""]', ft = `${jt}:not([aria-disabled="true"])`, We = "cmdk-item-select", ee = "data-value", uo = (e, t, n) => ln(e, t, n), Kt = a.createContext(void 0), ue = () => a.useContext(Kt), Ht = a.createContext(void 0), je = () => a.useContext(Ht), Yt = a.createContext(void 0), zt = a.forwardRef((e, t) => {
  let n = te(() => {
    var d, b;
    return { search: "", value: (b = (d = e.value) != null ? d : e.defaultValue) != null ? b : "", selectedItemId: void 0, filtered: { count: 0, items: /* @__PURE__ */ new Map(), groups: /* @__PURE__ */ new Set() } };
  }), r = te(() => /* @__PURE__ */ new Set()), o = te(() => /* @__PURE__ */ new Map()), i = te(() => /* @__PURE__ */ new Map()), l = te(() => /* @__PURE__ */ new Set()), c = Gt(e), { label: s, children: u, value: f, onValueChange: v, filter: p, shouldFilter: h, loop: P, disablePointerSelection: m = !1, vimBindings: y = !0, ...S } = e, N = W(), I = W(), D = W(), O = a.useRef(null), C = wo();
  z(() => {
    if (f !== void 0) {
      let d = f.trim();
      n.current.value = d, E.emit();
    }
  }, [f]), z(() => {
    C(6, Ke);
  }, []);
  let E = a.useMemo(() => ({ subscribe: (d) => (l.current.add(d), () => l.current.delete(d)), snapshot: () => n.current, setState: (d, b, R) => {
    var g, A, x, M;
    if (!Object.is(n.current[d], b)) {
      if (n.current[d] = b, d === "search") X(), $(), C(1, B);
      else if (d === "value") {
        if (document.activeElement.hasAttribute("cmdk-input") || document.activeElement.hasAttribute("cmdk-root")) {
          let T = document.getElementById(D);
          T ? T.focus() : (g = document.getElementById(N)) == null || g.focus();
        }
        if (C(7, () => {
          var T;
          n.current.selectedItemId = (T = q()) == null ? void 0 : T.id, E.emit();
        }), R || C(5, Ke), ((A = c.current) == null ? void 0 : A.value) !== void 0) {
          let T = b ?? "";
          (M = (x = c.current).onValueChange) == null || M.call(x, T);
          return;
        }
      }
      E.emit();
    }
  }, emit: () => {
    l.current.forEach((d) => d());
  } }), []), k = a.useMemo(() => ({ value: (d, b, R) => {
    var g;
    b !== ((g = i.current.get(d)) == null ? void 0 : g.value) && (i.current.set(d, { value: b, keywords: R }), n.current.filtered.items.set(d, _(b, R)), C(2, () => {
      $(), E.emit();
    }));
  }, item: (d, b) => (r.current.add(d), b && (o.current.has(b) ? o.current.get(b).add(d) : o.current.set(b, /* @__PURE__ */ new Set([d]))), C(3, () => {
    X(), $(), n.current.value || B(), E.emit();
  }), () => {
    i.current.delete(d), r.current.delete(d), n.current.filtered.items.delete(d);
    let R = q();
    C(4, () => {
      X(), R?.getAttribute("id") === d && B(), E.emit();
    });
  }), group: (d) => (o.current.has(d) || o.current.set(d, /* @__PURE__ */ new Set()), () => {
    i.current.delete(d), o.current.delete(d);
  }), filter: () => c.current.shouldFilter, label: s || e["aria-label"], getDisablePointerSelection: () => c.current.disablePointerSelection, listId: N, inputId: D, labelId: I, listInnerRef: O }), []);
  function _(d, b) {
    var R, g;
    let A = (g = (R = c.current) == null ? void 0 : R.filter) != null ? g : uo;
    return d ? A(d, n.current.search, b) : 0;
  }
  function $() {
    if (!n.current.search || c.current.shouldFilter === !1) return;
    let d = n.current.filtered.items, b = [];
    n.current.filtered.groups.forEach((g) => {
      let A = o.current.get(g), x = 0;
      A.forEach((M) => {
        let T = d.get(M);
        x = Math.max(T, x);
      }), b.push([g, x]);
    });
    let R = O.current;
    re().sort((g, A) => {
      var x, M;
      let T = g.getAttribute("id"), se = A.getAttribute("id");
      return ((x = d.get(se)) != null ? x : 0) - ((M = d.get(T)) != null ? M : 0);
    }).forEach((g) => {
      let A = g.closest(Le);
      A ? A.appendChild(g.parentElement === A ? g : g.closest(`${Le} > *`)) : R.appendChild(g.parentElement === R ? g : g.closest(`${Le} > *`));
    }), b.sort((g, A) => A[1] - g[1]).forEach((g) => {
      var A;
      let x = (A = O.current) == null ? void 0 : A.querySelector(`${oe}[${ee}="${encodeURIComponent(g[0])}"]`);
      x?.parentElement.appendChild(x);
    });
  }
  function B() {
    let d = re().find((R) => R.getAttribute("aria-disabled") !== "true"), b = d?.getAttribute(ee);
    E.setState("value", b || void 0);
  }
  function X() {
    var d, b, R, g;
    if (!n.current.search || c.current.shouldFilter === !1) {
      n.current.filtered.count = r.current.size;
      return;
    }
    n.current.filtered.groups = /* @__PURE__ */ new Set();
    let A = 0;
    for (let x of r.current) {
      let M = (b = (d = i.current.get(x)) == null ? void 0 : d.value) != null ? b : "", T = (g = (R = i.current.get(x)) == null ? void 0 : R.keywords) != null ? g : [], se = _(M, T);
      n.current.filtered.items.set(x, se), se > 0 && A++;
    }
    for (let [x, M] of o.current) for (let T of M) if (n.current.filtered.items.get(T) > 0) {
      n.current.filtered.groups.add(x);
      break;
    }
    n.current.filtered.count = A;
  }
  function Ke() {
    var d, b, R;
    let g = q();
    g && (((d = g.parentElement) == null ? void 0 : d.firstChild) === g && ((R = (b = g.closest(oe)) == null ? void 0 : b.querySelector(lo)) == null || R.scrollIntoView({ block: "nearest" })), g.scrollIntoView({ block: "nearest" }));
  }
  function q() {
    var d;
    return (d = O.current) == null ? void 0 : d.querySelector(`${jt}[aria-selected="true"]`);
  }
  function re() {
    var d;
    return Array.from(((d = O.current) == null ? void 0 : d.querySelectorAll(ft)) || []);
  }
  function Re(d) {
    let b = re()[d];
    b && E.setState("value", b.getAttribute(ee));
  }
  function Pe(d) {
    var b;
    let R = q(), g = re(), A = g.findIndex((M) => M === R), x = g[A + d];
    (b = c.current) != null && b.loop && (x = A + d < 0 ? g[g.length - 1] : A + d === g.length ? g[0] : g[A + d]), x && E.setState("value", x.getAttribute(ee));
  }
  function He(d) {
    let b = q(), R = b?.closest(oe), g;
    for (; R && !g; ) R = d > 0 ? Eo(R, oe) : bo(R, oe), g = R?.querySelector(ft);
    g ? E.setState("value", g.getAttribute(ee)) : Pe(d);
  }
  let Ye = () => Re(re().length - 1), ze = (d) => {
    d.preventDefault(), d.metaKey ? Ye() : d.altKey ? He(1) : Pe(1);
  }, Ge = (d) => {
    d.preventDefault(), d.metaKey ? Re(0) : d.altKey ? He(-1) : Pe(-1);
  };
  return a.createElement(H.div, { ref: t, tabIndex: -1, ...S, "cmdk-root": "", onKeyDown: (d) => {
    var b;
    (b = S.onKeyDown) == null || b.call(S, d);
    let R = d.nativeEvent.isComposing || d.keyCode === 229;
    if (!(d.defaultPrevented || R)) switch (d.key) {
      case "n":
      case "j": {
        y && d.ctrlKey && ze(d);
        break;
      }
      case "ArrowDown": {
        ze(d);
        break;
      }
      case "p":
      case "k": {
        y && d.ctrlKey && Ge(d);
        break;
      }
      case "ArrowUp": {
        Ge(d);
        break;
      }
      case "Home": {
        d.preventDefault(), Re(0);
        break;
      }
      case "End": {
        d.preventDefault(), Ye();
        break;
      }
      case "Enter": {
        d.preventDefault();
        let g = q();
        if (g) {
          let A = new Event(We);
          g.dispatchEvent(A);
        }
      }
    }
  } }, a.createElement("label", { "cmdk-label": "", htmlFor: k.inputId, id: k.labelId, style: Co }, s), Ce(e, (d) => a.createElement(Ht.Provider, { value: E }, a.createElement(Kt.Provider, { value: k }, d))));
}), so = a.forwardRef((e, t) => {
  var n, r;
  let o = W(), i = a.useRef(null), l = a.useContext(Yt), c = ue(), s = Gt(e), u = (r = (n = s.current) == null ? void 0 : n.forceMount) != null ? r : l?.forceMount;
  z(() => {
    if (!u) return c.item(o, l?.id);
  }, [u]);
  let f = Xt(o, i, [e.value, e.children, i], e.keywords), v = je(), p = K((C) => C.value && C.value === f.current), h = K((C) => u || c.filter() === !1 ? !0 : C.search ? C.filtered.items.get(o) > 0 : !0);
  a.useEffect(() => {
    let C = i.current;
    if (!(!C || e.disabled)) return C.addEventListener(We, P), () => C.removeEventListener(We, P);
  }, [h, e.onSelect, e.disabled]);
  function P() {
    var C, E;
    m(), (E = (C = s.current).onSelect) == null || E.call(C, f.current);
  }
  function m() {
    v.setState("value", f.current, !0);
  }
  if (!h) return null;
  let { disabled: y, value: S, onSelect: N, forceMount: I, keywords: D, ...O } = e;
  return a.createElement(H.div, { ref: j(i, t), ...O, id: o, "cmdk-item": "", role: "option", "aria-disabled": !!y, "aria-selected": !!p, "data-disabled": !!y, "data-selected": !!p, onPointerMove: y || c.getDisablePointerSelection() ? void 0 : m, onClick: y ? void 0 : P }, e.children);
}), fo = a.forwardRef((e, t) => {
  let { heading: n, children: r, forceMount: o, ...i } = e, l = W(), c = a.useRef(null), s = a.useRef(null), u = W(), f = ue(), v = K((h) => o || f.filter() === !1 ? !0 : h.search ? h.filtered.groups.has(l) : !0);
  z(() => f.group(l), []), Xt(l, c, [e.value, e.heading, s]);
  let p = a.useMemo(() => ({ id: l, forceMount: o }), [o]);
  return a.createElement(H.div, { ref: j(c, t), ...i, "cmdk-group": "", role: "presentation", hidden: v ? void 0 : !0 }, n && a.createElement("div", { ref: s, "cmdk-group-heading": "", "aria-hidden": !0, id: u }, n), Ce(e, (h) => a.createElement("div", { "cmdk-group-items": "", role: "group", "aria-labelledby": n ? u : void 0 }, a.createElement(Yt.Provider, { value: p }, h))));
}), vo = a.forwardRef((e, t) => {
  let { alwaysRender: n, ...r } = e, o = a.useRef(null), i = K((l) => !l.search);
  return !n && !i ? null : a.createElement(H.div, { ref: j(o, t), ...r, "cmdk-separator": "", role: "separator" });
}), mo = a.forwardRef((e, t) => {
  let { onValueChange: n, ...r } = e, o = e.value != null, i = je(), l = K((u) => u.search), c = K((u) => u.selectedItemId), s = ue();
  return a.useEffect(() => {
    e.value != null && i.setState("search", e.value);
  }, [e.value]), a.createElement(H.input, { ref: t, ...r, "cmdk-input": "", autoComplete: "off", autoCorrect: "off", spellCheck: !1, "aria-autocomplete": "list", role: "combobox", "aria-expanded": !0, "aria-controls": s.listId, "aria-labelledby": s.labelId, "aria-activedescendant": c, id: s.inputId, type: "text", value: o ? e.value : l, onChange: (u) => {
    o || i.setState("search", u.target.value), n?.(u.target.value);
  } });
}), po = a.forwardRef((e, t) => {
  let { children: n, label: r = "Suggestions", ...o } = e, i = a.useRef(null), l = a.useRef(null), c = K((u) => u.selectedItemId), s = ue();
  return a.useEffect(() => {
    if (l.current && i.current) {
      let u = l.current, f = i.current, v, p = new ResizeObserver(() => {
        v = requestAnimationFrame(() => {
          let h = u.offsetHeight;
          f.style.setProperty("--cmdk-list-height", h.toFixed(1) + "px");
        });
      });
      return p.observe(u), () => {
        cancelAnimationFrame(v), p.unobserve(u);
      };
    }
  }, []), a.createElement(H.div, { ref: j(i, t), ...o, "cmdk-list": "", role: "listbox", tabIndex: -1, "aria-activedescendant": c, "aria-label": r, id: s.listId }, Ce(e, (u) => a.createElement("div", { ref: j(l, s.listInnerRef), "cmdk-list-sizer": "" }, u)));
}), ho = a.forwardRef((e, t) => {
  let { open: n, onOpenChange: r, overlayClassName: o, contentClassName: i, container: l, ...c } = e;
  return a.createElement(Xr, { open: n, onOpenChange: r }, a.createElement(qr, { container: l }, a.createElement(Zr, { "cmdk-overlay": "", className: o }), a.createElement(Qr, { "aria-label": e.label, "cmdk-dialog": "", className: i }, a.createElement(zt, { ref: t, ...c }))));
}), go = a.forwardRef((e, t) => K((n) => n.filtered.count === 0) ? a.createElement(H.div, { ref: t, ...e, "cmdk-empty": "", role: "presentation" }) : null), yo = a.forwardRef((e, t) => {
  let { progress: n, children: r, label: o = "Loading...", ...i } = e;
  return a.createElement(H.div, { ref: t, ...i, "cmdk-loading": "", role: "progressbar", "aria-valuenow": n, "aria-valuemin": 0, "aria-valuemax": 100, "aria-label": o }, Ce(e, (l) => a.createElement("div", { "aria-hidden": !0 }, l)));
}), Oo = Object.assign(zt, { List: po, Item: so, Input: mo, Group: fo, Separator: vo, Dialog: ho, Empty: go, Loading: yo });
function Eo(e, t) {
  let n = e.nextElementSibling;
  for (; n; ) {
    if (n.matches(t)) return n;
    n = n.nextElementSibling;
  }
}
function bo(e, t) {
  let n = e.previousElementSibling;
  for (; n; ) {
    if (n.matches(t)) return n;
    n = n.previousElementSibling;
  }
}
function Gt(e) {
  let t = a.useRef(e);
  return z(() => {
    t.current = e;
  }), t;
}
var z = typeof window > "u" ? a.useEffect : a.useLayoutEffect;
function te(e) {
  let t = a.useRef();
  return t.current === void 0 && (t.current = e()), t;
}
function K(e) {
  let t = je(), n = () => e(t.snapshot());
  return a.useSyncExternalStore(t.subscribe, n, n);
}
function Xt(e, t, n, r = []) {
  let o = a.useRef(), i = ue();
  return z(() => {
    var l;
    let c = (() => {
      var u;
      for (let f of n) {
        if (typeof f == "string") return f.trim();
        if (typeof f == "object" && "current" in f) return f.current ? (u = f.current.textContent) == null ? void 0 : u.trim() : o.current;
      }
    })(), s = r.map((u) => u.trim());
    i.value(e, c, s), (l = t.current) == null || l.setAttribute(ee, c), o.current = c;
  }), o;
}
var wo = () => {
  let [e, t] = a.useState(), n = te(() => /* @__PURE__ */ new Map());
  return z(() => {
    n.current.forEach((r) => r()), n.current = /* @__PURE__ */ new Map();
  }, [e]), (r, o) => {
    n.current.set(r, o), t({});
  };
};
function So(e) {
  let t = e.type;
  return typeof t == "function" ? t(e.props) : "render" in t ? t.render(e.props) : e;
}
function Ce({ asChild: e, children: t }, n) {
  return e && a.isValidElement(t) ? a.cloneElement(So(t), { ref: t.ref }, n(t.props.children)) : n(t);
}
var Co = { position: "absolute", width: "1px", height: "1px", padding: "0", margin: "-1px", overflow: "hidden", clip: "rect(0, 0, 0, 0)", whiteSpace: "nowrap", borderWidth: "0" };
export {
  Oo as _
};
