import * as a from "react";
import { useState as zt } from "react";
import { jsx as A, Fragment as Xt } from "react/jsx-runtime";
import * as ft from "react-dom";
var Xe = 1, Gt = 0.9, qt = 0.8, Zt = 0.17, Pe = 0.1, Oe = 0.999, Qt = 0.9999, Jt = 0.99, en = /[\\\/_+.#"@\[\(\{&]/, tn = /[\\\/_+.#"@\[\(\{&]/g, nn = /[\s-]/, vt = /[\s-]/g;
function Le(e, t, n, r, o, i, u) {
  if (i === t.length) return o === e.length ? Xe : Jt;
  var c = `${o},${i}`;
  if (u[c] !== void 0) return u[c];
  for (var v = r.charAt(i), l = n.indexOf(v, o), s = 0, d, h, p, w; l >= 0; ) d = Le(e, t, n, r, l + 1, i + 1, u), d > s && (l === o ? d *= Xe : en.test(e.charAt(l - 1)) ? (d *= qt, p = e.slice(o, l - 1).match(tn), p && o > 0 && (d *= Math.pow(Oe, p.length))) : nn.test(e.charAt(l - 1)) ? (d *= Gt, w = e.slice(o, l - 1).match(vt), w && o > 0 && (d *= Math.pow(Oe, w.length))) : (d *= Zt, o > 0 && (d *= Math.pow(Oe, l - o))), e.charAt(l) !== t.charAt(i) && (d *= Qt)), (d < Pe && n.charAt(l - 1) === r.charAt(i + 1) || r.charAt(i + 1) === r.charAt(i) && n.charAt(l - 1) !== r.charAt(i)) && (h = Le(e, t, n, r, l + 1, i + 2, u), h * Pe > d && (d = h * Pe)), d > s && (s = d), l = n.indexOf(v, l + 1);
  return u[c] = s, s;
}
function Ge(e) {
  return e.toLowerCase().replace(vt, " ");
}
function rn(e, t, n) {
  return e = n && n.length > 0 ? `${e + " " + n.join(" ")}` : e, Le(e, t, Ge(e), Ge(t), 0, 0, {});
}
function V(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
  return function(o) {
    if (e?.(o), n === !1 || !o.defaultPrevented)
      return t?.(o);
  };
}
function qe(e, t) {
  if (typeof e == "function")
    return e(t);
  e != null && (e.current = t);
}
function ne(...e) {
  return (t) => {
    let n = !1;
    const r = e.map((o) => {
      const i = qe(o, t);
      return !n && typeof i == "function" && (n = !0), i;
    });
    if (n)
      return () => {
        for (let o = 0; o < r.length; o++) {
          const i = r[o];
          typeof i == "function" ? i() : qe(e[o], null);
        }
      };
  };
}
function z(...e) {
  return a.useCallback(ne(...e), e);
}
function on(e, t = []) {
  let n = [];
  function r(i, u) {
    const c = a.createContext(u);
    c.displayName = i + "Context";
    const v = n.length;
    n = [...n, u];
    const l = (d) => {
      const { scope: h, children: p, ...w } = d, m = h?.[e]?.[v] || c, g = a.useMemo(() => w, Object.values(w));
      return /* @__PURE__ */ A(m.Provider, { value: g, children: p });
    };
    l.displayName = i + "Provider";
    function s(d, h) {
      const p = h?.[e]?.[v] || c, w = a.useContext(p);
      if (w) return w;
      if (u !== void 0) return u;
      throw new Error(`\`${d}\` must be used within \`${i}\``);
    }
    return [l, s];
  }
  const o = () => {
    const i = n.map((u) => a.createContext(u));
    return function(c) {
      const v = c?.[e] || i;
      return a.useMemo(
        () => ({ [`__scope${e}`]: { ...c, [e]: v } }),
        [c, v]
      );
    };
  };
  return o.scopeName = e, [r, an(o, ...t)];
}
function an(...e) {
  const t = e[0];
  if (e.length === 1) return t;
  const n = () => {
    const r = e.map((o) => ({
      useScope: o(),
      scopeName: o.scopeName
    }));
    return function(i) {
      const u = r.reduce((c, { useScope: v, scopeName: l }) => {
        const d = v(i)[`__scope${l}`];
        return { ...c, ...d };
      }, {});
      return a.useMemo(() => ({ [`__scope${t.scopeName}`]: u }), [u]);
    };
  };
  return n.scopeName = t.scopeName, n;
}
var ie = globalThis?.document ? a.useLayoutEffect : () => {
}, cn = a[" useId ".trim().toString()] || (() => {
}), un = 0;
function j(e) {
  const [t, n] = a.useState(cn());
  return ie(() => {
    n((r) => r ?? String(un++));
  }, [e]), t ? `radix-${t}` : "";
}
var sn = a[" useInsertionEffect ".trim().toString()] || ie;
function ln({
  prop: e,
  defaultProp: t,
  onChange: n = () => {
  },
  caller: r
}) {
  const [o, i, u] = dn({
    defaultProp: t,
    onChange: n
  }), c = e !== void 0, v = c ? e : o;
  {
    const s = a.useRef(e !== void 0);
    a.useEffect(() => {
      const d = s.current;
      d !== c && console.warn(
        `${r} is changing from ${d ? "controlled" : "uncontrolled"} to ${c ? "controlled" : "uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`
      ), s.current = c;
    }, [c, r]);
  }
  const l = a.useCallback(
    (s) => {
      if (c) {
        const d = fn(s) ? s(e) : s;
        d !== e && u.current?.(d);
      } else
        i(s);
    },
    [c, e, i, u]
  );
  return [v, l];
}
function dn({
  defaultProp: e,
  onChange: t
}) {
  const [n, r] = a.useState(e), o = a.useRef(n), i = a.useRef(t);
  return sn(() => {
    i.current = t;
  }, [t]), a.useEffect(() => {
    o.current !== n && (i.current?.(n), o.current = n);
  }, [n, o]), [n, r, i];
}
function fn(e) {
  return typeof e == "function";
}
// @__NO_SIDE_EFFECTS__
function mt(e) {
  const t = a.forwardRef((n, r) => {
    let { children: o, ...i } = n, u = null, c = !1;
    const v = [];
    Ze(o) && typeof le == "function" && (o = le(o._payload)), a.Children.forEach(o, (h) => {
      if (gn(h)) {
        c = !0;
        const p = h;
        let w = "child" in p.props ? p.props.child : p.props.children;
        Ze(w) && typeof le == "function" && (w = le(w._payload)), u = mn(p, w), v.push(u?.props?.children);
      } else
        v.push(h);
    }), u ? u = a.cloneElement(u, void 0, v) : (
      // A `Slottable` was found but it didn't resolve to a single element (e.g.
      // it wrapped multiple elements, text, or a render-prop `child` that
      // wasn't an element). Don't fall back to treating the `Slottable` wrapper
      // itself as the slot target — throw a descriptive error below instead.
      !c && a.Children.count(o) === 1 && a.isValidElement(o) && (u = o)
    );
    const l = u ? hn(u) : void 0, s = z(r, l);
    if (!u) {
      if (o || o === 0)
        throw new Error(
          c ? wn(e) : En(e)
        );
      return o;
    }
    const d = pn(i, u.props ?? {});
    return u.type !== a.Fragment && (d.ref = r ? s : l), a.cloneElement(u, d);
  });
  return t.displayName = `${e}.Slot`, t;
}
var vn = /* @__PURE__ */ Symbol.for("radix.slottable"), mn = (e, t) => {
  if ("child" in e.props) {
    const n = e.props.child;
    return a.isValidElement(n) ? a.cloneElement(n, void 0, e.props.children(n.props.children)) : null;
  }
  return a.isValidElement(t) ? t : null;
};
function pn(e, t) {
  const n = { ...t };
  for (const r in t) {
    const o = e[r], i = t[r];
    /^on[A-Z]/.test(r) ? o && i ? n[r] = (...c) => {
      const v = i(...c);
      return o(...c), v;
    } : o && (n[r] = o) : r === "style" ? n[r] = { ...o, ...i } : r === "className" && (n[r] = [o, i].filter(Boolean).join(" "));
  }
  return { ...e, ...n };
}
function hn(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
function gn(e) {
  return a.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === vn;
}
var yn = /* @__PURE__ */ Symbol.for("react.lazy");
function Ze(e) {
  return e != null && typeof e == "object" && "$$typeof" in e && e.$$typeof === yn && "_payload" in e && bn(e._payload);
}
function bn(e) {
  return typeof e == "object" && e !== null && "then" in e;
}
var En = (e) => `${e} failed to slot onto its children. Expected a single React element child or \`Slottable\`.`, wn = (e) => `${e} failed to slot onto its \`Slottable\`. Expected \`Slottable\` to receive a single React element child.`, le = a[" use ".trim().toString()], Sn = [
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
], M = Sn.reduce((e, t) => {
  const n = /* @__PURE__ */ mt(`Primitive.${t}`), r = a.forwardRef((o, i) => {
    const { asChild: u, ...c } = o, v = u ? n : t;
    return typeof window < "u" && (window[/* @__PURE__ */ Symbol.for("radix-ui")] = !0), /* @__PURE__ */ A(v, { ...c, ref: i });
  });
  return r.displayName = `Primitive.${t}`, { ...e, [t]: r };
}, {});
function Cn(e, t) {
  e && ft.flushSync(() => e.dispatchEvent(t));
}
function ce(e) {
  const t = a.useRef(e);
  return a.useEffect(() => {
    t.current = e;
  }), a.useMemo(() => ((...n) => t.current?.(...n)), []);
}
function Rn(e, t = globalThis?.document) {
  const n = ce(e);
  a.useEffect(() => {
    const r = (o) => {
      o.key === "Escape" && n(o);
    };
    return t.addEventListener("keydown", r, { capture: !0 }), () => t.removeEventListener("keydown", r, { capture: !0 });
  }, [n, t]);
}
var Dn = "DismissableLayer", Fe = "dismissableLayer.update", Pn = "dismissableLayer.pointerDownOutside", On = "dismissableLayer.focusOutside", Qe, Be = a.createContext({
  layers: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set(),
  // Outside elements that belong to a layer's own dismiss affordance (eg, a
  // dialog overlay). Pressing them should dismiss the layer regardless of
  // whether or not they stop propagation.
  //
  // See https://github.com/radix-ui/primitives/issues/3346
  dismissableSurfaces: /* @__PURE__ */ new Set()
}), pt = a.forwardRef(
  (e, t) => {
    const {
      disableOutsidePointerEvents: n = !1,
      deferPointerDownOutside: r = !1,
      onEscapeKeyDown: o,
      onPointerDownOutside: i,
      onFocusOutside: u,
      onInteractOutside: c,
      onDismiss: v,
      ...l
    } = e, s = a.useContext(Be), [d, h] = a.useState(null), p = d?.ownerDocument ?? globalThis?.document, [, w] = a.useState({}), m = z(t, (k) => h(k)), g = Array.from(s.layers), [S] = [...s.layersWithOutsidePointerEventsDisabled].slice(-1), b = g.indexOf(S), C = d ? g.indexOf(d) : -1, O = s.layersWithOutsidePointerEventsDisabled.size > 0, R = C >= b, D = a.useRef(!1), N = kn(
      (k) => {
        const F = k.target;
        if (!(F instanceof Node))
          return;
        const _ = [...s.branches].some(
          (B) => B.contains(F)
        );
        !R || _ || (i?.(k), c?.(k), k.defaultPrevented || v?.());
      },
      {
        ownerDocument: p,
        deferPointerDownOutside: r,
        isDeferredPointerDownOutsideRef: D,
        dismissableSurfaces: s.dismissableSurfaces
      }
    ), U = xn((k) => {
      if (r && D.current)
        return;
      const F = k.target;
      [...s.branches].some((B) => B.contains(F)) || (u?.(k), c?.(k), k.defaultPrevented || v?.());
    }, p);
    return Rn((k) => {
      C === s.layers.size - 1 && (o?.(k), !k.defaultPrevented && v && (k.preventDefault(), v()));
    }, p), a.useEffect(() => {
      if (d)
        return n && (s.layersWithOutsidePointerEventsDisabled.size === 0 && (Qe = p.body.style.pointerEvents, p.body.style.pointerEvents = "none"), s.layersWithOutsidePointerEventsDisabled.add(d)), s.layers.add(d), Je(), () => {
          n && (s.layersWithOutsidePointerEventsDisabled.delete(d), s.layersWithOutsidePointerEventsDisabled.size === 0 && (p.body.style.pointerEvents = Qe));
        };
    }, [d, p, n, s]), a.useEffect(() => () => {
      d && (s.layers.delete(d), s.layersWithOutsidePointerEventsDisabled.delete(d), Je());
    }, [d, s]), a.useEffect(() => {
      const k = () => w({});
      return document.addEventListener(Fe, k), () => document.removeEventListener(Fe, k);
    }, []), /* @__PURE__ */ A(
      M.div,
      {
        ...l,
        ref: m,
        style: {
          pointerEvents: O ? R ? "auto" : "none" : void 0,
          ...e.style
        },
        onFocusCapture: V(e.onFocusCapture, U.onFocusCapture),
        onBlurCapture: V(e.onBlurCapture, U.onBlurCapture),
        onPointerDownCapture: V(
          e.onPointerDownCapture,
          N.onPointerDownCapture
        )
      }
    );
  }
);
pt.displayName = Dn;
var In = "DismissableLayerBranch", An = a.forwardRef((e, t) => {
  const n = a.useContext(Be), r = a.useRef(null), o = z(t, r);
  return a.useEffect(() => {
    const i = r.current;
    if (i)
      return n.branches.add(i), () => {
        n.branches.delete(i);
      };
  }, [n.branches]), /* @__PURE__ */ A(M.div, { ...e, ref: o });
});
An.displayName = In;
function Nn() {
  const e = a.useContext(Be), [t, n] = a.useState(null);
  return a.useEffect(() => {
    if (t)
      return e.dismissableSurfaces.add(t), () => {
        e.dismissableSurfaces.delete(t);
      };
  }, [t, e.dismissableSurfaces]), n;
}
function kn(e, t) {
  const {
    ownerDocument: n = globalThis?.document,
    deferPointerDownOutside: r = !1,
    isDeferredPointerDownOutsideRef: o,
    dismissableSurfaces: i
  } = t, u = ce(e), c = a.useRef(!1), v = a.useRef(!1), l = a.useRef(/* @__PURE__ */ new Map()), s = a.useRef(() => {
  });
  return a.useEffect(() => {
    function d() {
      v.current = !1, o.current = !1, l.current.clear();
    }
    function h() {
      return Array.from(l.current.values()).some(Boolean);
    }
    function p(b) {
      if (!v.current)
        return;
      const C = b.target;
      C instanceof Node && [...i].some((R) => R.contains(C)) || l.current.set(b.type, !0), b.type === "click" && window.setTimeout(() => {
        v.current && s.current();
      }, 0);
    }
    function w(b) {
      v.current && l.current.set(b.type, !1);
    }
    const m = (b) => {
      if (b.target && !c.current) {
        let C = function() {
          n.removeEventListener("click", s.current);
          const R = h();
          d(), R || ht(
            Pn,
            u,
            O,
            { discrete: !0 }
          );
        };
        const O = { originalEvent: b };
        v.current = !0, o.current = r && b.button === 0, l.current.clear(), !r || b.button !== 0 ? C() : (n.removeEventListener("click", s.current), s.current = C, n.addEventListener("click", s.current, { once: !0 }));
      } else
        n.removeEventListener("click", s.current), d();
      c.current = !1;
    }, g = [
      "pointerup",
      "mousedown",
      "mouseup",
      "touchstart",
      "touchend",
      "click"
    ];
    for (const b of g)
      n.addEventListener(b, p, !0), n.addEventListener(b, w);
    const S = window.setTimeout(() => {
      n.addEventListener("pointerdown", m);
    }, 0);
    return () => {
      window.clearTimeout(S), n.removeEventListener("pointerdown", m), n.removeEventListener("click", s.current);
      for (const b of g)
        n.removeEventListener(b, p, !0), n.removeEventListener(b, w);
    };
  }, [
    n,
    u,
    r,
    o,
    i
  ]), {
    // ensures we check React component tree (not just DOM tree)
    onPointerDownCapture: () => c.current = !0
  };
}
function xn(e, t = globalThis?.document) {
  const n = ce(e), r = a.useRef(!1);
  return a.useEffect(() => {
    const o = (i) => {
      i.target && !r.current && ht(On, n, { originalEvent: i }, {
        discrete: !1
      });
    };
    return t.addEventListener("focusin", o), () => t.removeEventListener("focusin", o);
  }, [t, n]), {
    onFocusCapture: () => r.current = !0,
    onBlurCapture: () => r.current = !1
  };
}
function Je() {
  const e = new CustomEvent(Fe);
  document.dispatchEvent(e);
}
function ht(e, t, n, { discrete: r }) {
  const o = n.originalEvent.target, i = new CustomEvent(e, { bubbles: !1, cancelable: !0, detail: n });
  t && o.addEventListener(e, t, { once: !0 }), r ? Cn(o, i) : o.dispatchEvent(i);
}
var Ie = "focusScope.autoFocusOnMount", Ae = "focusScope.autoFocusOnUnmount", et = { bubbles: !1, cancelable: !0 }, Mn = "FocusScope", gt = a.forwardRef((e, t) => {
  const {
    loop: n = !1,
    trapped: r = !1,
    onMountAutoFocus: o,
    onUnmountAutoFocus: i,
    ...u
  } = e, [c, v] = a.useState(null), l = ce(o), s = ce(i), d = a.useRef(null), h = z(t, (m) => v(m)), p = a.useRef({
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
      let m = function(C) {
        if (p.paused || !c) return;
        const O = C.target;
        c.contains(O) ? d.current = O : K(d.current, { select: !0 });
      }, g = function(C) {
        if (p.paused || !c) return;
        const O = C.relatedTarget;
        O !== null && (c.contains(O) || K(d.current, { select: !0 }));
      }, S = function(C) {
        if (document.activeElement === document.body)
          for (const R of C)
            R.removedNodes.length > 0 && K(c);
      };
      document.addEventListener("focusin", m), document.addEventListener("focusout", g);
      const b = new MutationObserver(S);
      return c && b.observe(c, { childList: !0, subtree: !0 }), () => {
        document.removeEventListener("focusin", m), document.removeEventListener("focusout", g), b.disconnect();
      };
    }
  }, [r, c, p.paused]), a.useEffect(() => {
    if (c) {
      nt.add(p);
      const m = document.activeElement;
      if (!c.contains(m)) {
        const S = new CustomEvent(Ie, et);
        c.addEventListener(Ie, l), c.dispatchEvent(S), S.defaultPrevented || (Tn(Bn(yt(c)), { select: !0 }), document.activeElement === m && K(c));
      }
      return () => {
        c.removeEventListener(Ie, l), setTimeout(() => {
          const S = new CustomEvent(Ae, et);
          c.addEventListener(Ae, s), c.dispatchEvent(S), S.defaultPrevented || K(m ?? document.body, { select: !0 }), c.removeEventListener(Ae, s), nt.remove(p);
        }, 0);
      };
    }
  }, [c, l, s, p]);
  const w = a.useCallback(
    (m) => {
      if (!n && !r || p.paused) return;
      const g = m.key === "Tab" && !m.altKey && !m.ctrlKey && !m.metaKey, S = document.activeElement;
      if (g && S) {
        const b = m.currentTarget, [C, O] = Ln(b);
        C && O ? !m.shiftKey && S === O ? (m.preventDefault(), n && K(C, { select: !0 })) : m.shiftKey && S === C && (m.preventDefault(), n && K(O, { select: !0 })) : S === b && m.preventDefault();
      }
    },
    [n, r, p.paused]
  );
  return /* @__PURE__ */ A(M.div, { tabIndex: -1, ...u, ref: h, onKeyDown: w });
});
gt.displayName = Mn;
function Tn(e, { select: t = !1 } = {}) {
  const n = document.activeElement;
  for (const r of e)
    if (K(r, { select: t }), document.activeElement !== n) return;
}
function Ln(e) {
  const t = yt(e), n = tt(t, e), r = tt(t.reverse(), e);
  return [n, r];
}
function yt(e) {
  const t = [], n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (r) => {
      const o = r.tagName === "INPUT" && r.type === "hidden";
      return r.disabled || r.hidden || o ? NodeFilter.FILTER_SKIP : r.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  for (; n.nextNode(); ) t.push(n.currentNode);
  return t;
}
function tt(e, t) {
  for (const n of e)
    if (!Fn(n, { upTo: t })) return n;
}
function Fn(e, { upTo: t }) {
  if (getComputedStyle(e).visibility === "hidden") return !0;
  for (; e; ) {
    if (t !== void 0 && e === t) return !1;
    if (getComputedStyle(e).display === "none") return !0;
    e = e.parentElement;
  }
  return !1;
}
function _n(e) {
  return e instanceof HTMLInputElement && "select" in e;
}
function K(e, { select: t = !1 } = {}) {
  if (e && e.focus) {
    const n = document.activeElement;
    e.focus({ preventScroll: !0 }), e !== n && _n(e) && t && e.select();
  }
}
var nt = Wn();
function Wn() {
  let e = [];
  return {
    add(t) {
      const n = e[0];
      t !== n && n?.pause(), e = rt(e, t), e.unshift(t);
    },
    remove(t) {
      e = rt(e, t), e[0]?.resume();
    }
  };
}
function rt(e, t) {
  const n = [...e], r = n.indexOf(t);
  return r !== -1 && n.splice(r, 1), n;
}
function Bn(e) {
  return e.filter((t) => t.tagName !== "A");
}
var $n = "Portal", bt = a.forwardRef((e, t) => {
  const { container: n, ...r } = e, [o, i] = a.useState(!1);
  ie(() => i(!0), []);
  const u = n || o && globalThis?.document?.body;
  return u ? ft.createPortal(/* @__PURE__ */ A(M.div, { ...r, ref: t }), u) : null;
});
bt.displayName = $n;
function Un(e, t) {
  return a.useReducer((n, r) => t[n][r] ?? n, e);
}
var Ee = (e) => {
  const { present: t, children: n } = e, r = jn(t), o = typeof n == "function" ? n({ present: r.isPresent }) : a.Children.only(n), i = Kn(r.ref, Vn(o));
  return typeof n == "function" || r.isPresent ? a.cloneElement(o, { ref: i }) : null;
};
Ee.displayName = "Presence";
function jn(e) {
  const [t, n] = a.useState(), r = a.useRef(null), o = a.useRef(e), i = a.useRef("none"), u = e ? "mounted" : "unmounted", [c, v] = Un(u, {
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
    const l = de(r.current);
    i.current = c === "mounted" ? l : "none";
  }, [c]), ie(() => {
    const l = r.current, s = o.current;
    if (s !== e) {
      const h = i.current, p = de(l);
      e ? v("MOUNT") : p === "none" || l?.display === "none" ? v("UNMOUNT") : v(s && h !== p ? "ANIMATION_OUT" : "UNMOUNT"), o.current = e;
    }
  }, [e, v]), ie(() => {
    if (t) {
      let l;
      const s = t.ownerDocument.defaultView ?? window, d = (p) => {
        const m = de(r.current).includes(CSS.escape(p.animationName));
        if (p.target === t && m && (v("ANIMATION_END"), !o.current)) {
          const g = t.style.animationFillMode;
          t.style.animationFillMode = "forwards", l = s.setTimeout(() => {
            t.style.animationFillMode === "forwards" && (t.style.animationFillMode = g);
          });
        }
      }, h = (p) => {
        p.target === t && (i.current = de(r.current));
      };
      return t.addEventListener("animationstart", h), t.addEventListener("animationcancel", d), t.addEventListener("animationend", d), () => {
        s.clearTimeout(l), t.removeEventListener("animationstart", h), t.removeEventListener("animationcancel", d), t.removeEventListener("animationend", d);
      };
    } else
      v("ANIMATION_END");
  }, [t, v]), {
    isPresent: ["mounted", "unmountSuspended"].includes(c),
    ref: a.useCallback((l) => {
      r.current = l ? getComputedStyle(l) : null, n(l);
    }, [])
  };
}
function ot(e, t) {
  if (typeof e == "function")
    return e(t);
  e != null && (e.current = t);
}
function Kn(...e) {
  const t = a.useRef(e);
  return t.current = e, a.useCallback((n) => {
    const r = t.current;
    let o = !1;
    const i = r.map((u) => {
      const c = ot(u, n);
      return !o && typeof c == "function" && (o = !0), c;
    });
    if (o)
      return () => {
        for (let u = 0; u < i.length; u++) {
          const c = i[u];
          typeof c == "function" ? c() : ot(r[u], null);
        }
      };
  }, []);
}
function de(e) {
  return e?.animationName || "none";
}
function Vn(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var fe = 0, G = null;
function Hn() {
  a.useEffect(() => {
    G || (G = { start: at(), end: at() });
    const { start: e, end: t } = G;
    return document.body.firstElementChild !== e && document.body.insertAdjacentElement("afterbegin", e), document.body.lastElementChild !== t && document.body.insertAdjacentElement("beforeend", t), fe++, () => {
      fe === 1 && (G?.start.remove(), G?.end.remove(), G = null), fe = Math.max(0, fe - 1);
    };
  }, []);
}
function at() {
  const e = document.createElement("span");
  return e.setAttribute("data-radix-focus-guard", ""), e.tabIndex = 0, e.style.outline = "none", e.style.opacity = "0", e.style.position = "fixed", e.style.pointerEvents = "none", e;
}
var $ = function() {
  return $ = Object.assign || function(t) {
    for (var n, r = 1, o = arguments.length; r < o; r++) {
      n = arguments[r];
      for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i]);
    }
    return t;
  }, $.apply(this, arguments);
};
function Et(e, t) {
  var n = {};
  for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var o = 0, r = Object.getOwnPropertySymbols(e); o < r.length; o++)
      t.indexOf(r[o]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[o]) && (n[r[o]] = e[r[o]]);
  return n;
}
function Yn(e, t, n) {
  if (n || arguments.length === 2) for (var r = 0, o = t.length, i; r < o; r++)
    (i || !(r in t)) && (i || (i = Array.prototype.slice.call(t, 0, r)), i[r] = t[r]);
  return e.concat(i || Array.prototype.slice.call(t));
}
var ge = "right-scroll-bar-position", ye = "width-before-scroll-bar", zn = "with-scroll-bars-hidden", Xn = "--removed-body-scroll-bar-size";
function Ne(e, t) {
  return typeof e == "function" ? e(t) : e && (e.current = t), e;
}
function Gn(e, t) {
  var n = zt(function() {
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
var qn = typeof window < "u" ? a.useLayoutEffect : a.useEffect, it = /* @__PURE__ */ new WeakMap();
function Zn(e, t) {
  var n = Gn(null, function(r) {
    return e.forEach(function(o) {
      return Ne(o, r);
    });
  });
  return qn(function() {
    var r = it.get(n);
    if (r) {
      var o = new Set(r), i = new Set(e), u = n.current;
      o.forEach(function(c) {
        i.has(c) || Ne(c, null);
      }), i.forEach(function(c) {
        o.has(c) || Ne(c, u);
      });
    }
    it.set(n, e);
  }, [e]), n;
}
function Qn(e) {
  return e;
}
function Jn(e, t) {
  t === void 0 && (t = Qn);
  var n = [], r = !1, o = {
    read: function() {
      if (r)
        throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");
      return n.length ? n[n.length - 1] : e;
    },
    useMedium: function(i) {
      var u = t(i, r);
      return n.push(u), function() {
        n = n.filter(function(c) {
          return c !== u;
        });
      };
    },
    assignSyncMedium: function(i) {
      for (r = !0; n.length; ) {
        var u = n;
        n = [], u.forEach(i);
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
      var u = [];
      if (n.length) {
        var c = n;
        n = [], c.forEach(i), u = n;
      }
      var v = function() {
        var s = u;
        u = [], s.forEach(i);
      }, l = function() {
        return Promise.resolve().then(v);
      };
      l(), n = {
        push: function(s) {
          u.push(s), l();
        },
        filter: function(s) {
          return u = u.filter(s), n;
        }
      };
    }
  };
  return o;
}
function er(e) {
  e === void 0 && (e = {});
  var t = Jn(null);
  return t.options = $({ async: !0, ssr: !1 }, e), t;
}
var wt = function(e) {
  var t = e.sideCar, n = Et(e, ["sideCar"]);
  if (!t)
    throw new Error("Sidecar: please provide `sideCar` property to import the right car");
  var r = t.read();
  if (!r)
    throw new Error("Sidecar medium not found");
  return a.createElement(r, $({}, n));
};
wt.isSideCarExport = !0;
function tr(e, t) {
  return e.useMedium(t), wt;
}
var St = er(), ke = function() {
}, we = a.forwardRef(function(e, t) {
  var n = a.useRef(null), r = a.useState({
    onScrollCapture: ke,
    onWheelCapture: ke,
    onTouchMoveCapture: ke
  }), o = r[0], i = r[1], u = e.forwardProps, c = e.children, v = e.className, l = e.removeScrollBar, s = e.enabled, d = e.shards, h = e.sideCar, p = e.noRelative, w = e.noIsolation, m = e.inert, g = e.allowPinchZoom, S = e.as, b = S === void 0 ? "div" : S, C = e.gapMode, O = Et(e, ["forwardProps", "children", "className", "removeScrollBar", "enabled", "shards", "sideCar", "noRelative", "noIsolation", "inert", "allowPinchZoom", "as", "gapMode"]), R = h, D = Zn([n, t]), N = $($({}, O), o);
  return a.createElement(
    a.Fragment,
    null,
    s && a.createElement(R, { sideCar: St, removeScrollBar: l, shards: d, noRelative: p, noIsolation: w, inert: m, setCallbacks: i, allowPinchZoom: !!g, lockRef: n, gapMode: C }),
    u ? a.cloneElement(a.Children.only(c), $($({}, N), { ref: D })) : a.createElement(b, $({}, N, { className: v, ref: D }), c)
  );
});
we.defaultProps = {
  enabled: !0,
  removeScrollBar: !0,
  inert: !1
};
we.classNames = {
  fullWidth: ye,
  zeroRight: ge
};
var nr = function() {
  if (typeof __webpack_nonce__ < "u")
    return __webpack_nonce__;
};
function rr() {
  if (!document)
    return null;
  var e = document.createElement("style");
  e.type = "text/css";
  var t = nr();
  return t && e.setAttribute("nonce", t), e;
}
function or(e, t) {
  e.styleSheet ? e.styleSheet.cssText = t : e.appendChild(document.createTextNode(t));
}
function ar(e) {
  var t = document.head || document.getElementsByTagName("head")[0];
  t.appendChild(e);
}
var ir = function() {
  var e = 0, t = null;
  return {
    add: function(n) {
      e == 0 && (t = rr()) && (or(t, n), ar(t)), e++;
    },
    remove: function() {
      e--, !e && t && (t.parentNode && t.parentNode.removeChild(t), t = null);
    }
  };
}, cr = function() {
  var e = ir();
  return function(t, n) {
    a.useEffect(function() {
      return e.add(t), function() {
        e.remove();
      };
    }, [t && n]);
  };
}, Ct = function() {
  var e = cr(), t = function(n) {
    var r = n.styles, o = n.dynamic;
    return e(r, o), null;
  };
  return t;
}, ur = {
  left: 0,
  top: 0,
  right: 0,
  gap: 0
}, xe = function(e) {
  return parseInt(e || "", 10) || 0;
}, sr = function(e) {
  var t = window.getComputedStyle(document.body), n = t[e === "padding" ? "paddingLeft" : "marginLeft"], r = t[e === "padding" ? "paddingTop" : "marginTop"], o = t[e === "padding" ? "paddingRight" : "marginRight"];
  return [xe(n), xe(r), xe(o)];
}, lr = function(e) {
  if (e === void 0 && (e = "margin"), typeof window > "u")
    return ur;
  var t = sr(e), n = document.documentElement.clientWidth, r = window.innerWidth;
  return {
    left: t[0],
    top: t[1],
    right: t[2],
    gap: Math.max(0, r - n + t[2] - t[0])
  };
}, dr = Ct(), te = "data-scroll-locked", fr = function(e, t, n, r) {
  var o = e.left, i = e.top, u = e.right, c = e.gap;
  return n === void 0 && (n = "margin"), `
  .`.concat(zn, ` {
   overflow: hidden `).concat(r, `;
   padding-right: `).concat(c, "px ").concat(r, `;
  }
  body[`).concat(te, `] {
    overflow: hidden `).concat(r, `;
    overscroll-behavior: contain;
    `).concat([
    t && "position: relative ".concat(r, ";"),
    n === "margin" && `
    padding-left: `.concat(o, `px;
    padding-top: `).concat(i, `px;
    padding-right: `).concat(u, `px;
    margin-left:0;
    margin-top:0;
    margin-right: `).concat(c, "px ").concat(r, `;
    `),
    n === "padding" && "padding-right: ".concat(c, "px ").concat(r, ";")
  ].filter(Boolean).join(""), `
  }
  
  .`).concat(ge, ` {
    right: `).concat(c, "px ").concat(r, `;
  }
  
  .`).concat(ye, ` {
    margin-right: `).concat(c, "px ").concat(r, `;
  }
  
  .`).concat(ge, " .").concat(ge, ` {
    right: 0 `).concat(r, `;
  }
  
  .`).concat(ye, " .").concat(ye, ` {
    margin-right: 0 `).concat(r, `;
  }
  
  body[`).concat(te, `] {
    `).concat(Xn, ": ").concat(c, `px;
  }
`);
}, ct = function() {
  var e = parseInt(document.body.getAttribute(te) || "0", 10);
  return isFinite(e) ? e : 0;
}, vr = function() {
  a.useEffect(function() {
    return document.body.setAttribute(te, (ct() + 1).toString()), function() {
      var e = ct() - 1;
      e <= 0 ? document.body.removeAttribute(te) : document.body.setAttribute(te, e.toString());
    };
  }, []);
}, mr = function(e) {
  var t = e.noRelative, n = e.noImportant, r = e.gapMode, o = r === void 0 ? "margin" : r;
  vr();
  var i = a.useMemo(function() {
    return lr(o);
  }, [o]);
  return a.createElement(dr, { styles: fr(i, !t, o, n ? "" : "!important") });
}, _e = !1;
if (typeof window < "u")
  try {
    var ve = Object.defineProperty({}, "passive", {
      get: function() {
        return _e = !0, !0;
      }
    });
    window.addEventListener("test", ve, ve), window.removeEventListener("test", ve, ve);
  } catch {
    _e = !1;
  }
var q = _e ? { passive: !1 } : !1, pr = function(e) {
  return e.tagName === "TEXTAREA";
}, Rt = function(e, t) {
  if (!(e instanceof Element))
    return !1;
  var n = window.getComputedStyle(e);
  return (
    // not-not-scrollable
    n[t] !== "hidden" && // contains scroll inside self
    !(n.overflowY === n.overflowX && !pr(e) && n[t] === "visible")
  );
}, hr = function(e) {
  return Rt(e, "overflowY");
}, gr = function(e) {
  return Rt(e, "overflowX");
}, ut = function(e, t) {
  var n = t.ownerDocument, r = t;
  do {
    typeof ShadowRoot < "u" && r instanceof ShadowRoot && (r = r.host);
    var o = Dt(e, r);
    if (o) {
      var i = Pt(e, r), u = i[1], c = i[2];
      if (u > c)
        return !0;
    }
    r = r.parentNode;
  } while (r && r !== n.body);
  return !1;
}, yr = function(e) {
  var t = e.scrollTop, n = e.scrollHeight, r = e.clientHeight;
  return [
    t,
    n,
    r
  ];
}, br = function(e) {
  var t = e.scrollLeft, n = e.scrollWidth, r = e.clientWidth;
  return [
    t,
    n,
    r
  ];
}, Dt = function(e, t) {
  return e === "v" ? hr(t) : gr(t);
}, Pt = function(e, t) {
  return e === "v" ? yr(t) : br(t);
}, Er = function(e, t) {
  return e === "h" && t === "rtl" ? -1 : 1;
}, wr = function(e, t, n, r, o) {
  var i = Er(e, window.getComputedStyle(t).direction), u = i * r, c = n.target, v = t.contains(c), l = !1, s = u > 0, d = 0, h = 0;
  do {
    if (!c)
      break;
    var p = Pt(e, c), w = p[0], m = p[1], g = p[2], S = m - g - i * w;
    (w || S) && Dt(e, c) && (d += S, h += w);
    var b = c.parentNode;
    c = b && b.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? b.host : b;
  } while (
    // portaled content
    !v && c !== document.body || // self content
    v && (t.contains(c) || t === c)
  );
  return (s && Math.abs(d) < 1 || !s && Math.abs(h) < 1) && (l = !0), l;
}, me = function(e) {
  return "changedTouches" in e ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY] : [0, 0];
}, st = function(e) {
  return [e.deltaX, e.deltaY];
}, lt = function(e) {
  return e && "current" in e ? e.current : e;
}, Sr = function(e, t) {
  return e[0] === t[0] && e[1] === t[1];
}, Cr = function(e) {
  return `
  .block-interactivity-`.concat(e, ` {pointer-events: none;}
  .allow-interactivity-`).concat(e, ` {pointer-events: all;}
`);
}, Rr = 0, Z = [];
function Dr(e) {
  var t = a.useRef([]), n = a.useRef([0, 0]), r = a.useRef(), o = a.useState(Rr++)[0], i = a.useState(Ct)[0], u = a.useRef(e);
  a.useEffect(function() {
    u.current = e;
  }, [e]), a.useEffect(function() {
    if (e.inert) {
      document.body.classList.add("block-interactivity-".concat(o));
      var m = Yn([e.lockRef.current], (e.shards || []).map(lt), !0).filter(Boolean);
      return m.forEach(function(g) {
        return g.classList.add("allow-interactivity-".concat(o));
      }), function() {
        document.body.classList.remove("block-interactivity-".concat(o)), m.forEach(function(g) {
          return g.classList.remove("allow-interactivity-".concat(o));
        });
      };
    }
  }, [e.inert, e.lockRef.current, e.shards]);
  var c = a.useCallback(function(m, g) {
    if ("touches" in m && m.touches.length === 2 || m.type === "wheel" && m.ctrlKey)
      return !u.current.allowPinchZoom;
    var S = me(m), b = n.current, C = "deltaX" in m ? m.deltaX : b[0] - S[0], O = "deltaY" in m ? m.deltaY : b[1] - S[1], R, D = m.target, N = Math.abs(C) > Math.abs(O) ? "h" : "v";
    if ("touches" in m && N === "h" && D.type === "range")
      return !1;
    var U = window.getSelection(), k = U && U.anchorNode, F = k ? k === D || k.contains(D) : !1;
    if (F)
      return !1;
    var _ = ut(N, D);
    if (!_)
      return !0;
    if (_ ? R = N : (R = N === "v" ? "h" : "v", _ = ut(N, D)), !_)
      return !1;
    if (!r.current && "changedTouches" in m && (C || O) && (r.current = R), !R)
      return !0;
    var B = r.current || R;
    return wr(B, g, m, B === "h" ? C : O);
  }, []), v = a.useCallback(function(m) {
    var g = m;
    if (!(!Z.length || Z[Z.length - 1] !== i)) {
      var S = "deltaY" in g ? st(g) : me(g), b = t.current.filter(function(R) {
        return R.name === g.type && (R.target === g.target || g.target === R.shadowParent) && Sr(R.delta, S);
      })[0];
      if (b && b.should) {
        g.cancelable && g.preventDefault();
        return;
      }
      if (!b) {
        var C = (u.current.shards || []).map(lt).filter(Boolean).filter(function(R) {
          return R.contains(g.target);
        }), O = C.length > 0 ? c(g, C[0]) : !u.current.noIsolation;
        O && g.cancelable && g.preventDefault();
      }
    }
  }, []), l = a.useCallback(function(m, g, S, b) {
    var C = { name: m, delta: g, target: S, should: b, shadowParent: Pr(S) };
    t.current.push(C), setTimeout(function() {
      t.current = t.current.filter(function(O) {
        return O !== C;
      });
    }, 1);
  }, []), s = a.useCallback(function(m) {
    n.current = me(m), r.current = void 0;
  }, []), d = a.useCallback(function(m) {
    l(m.type, st(m), m.target, c(m, e.lockRef.current));
  }, []), h = a.useCallback(function(m) {
    l(m.type, me(m), m.target, c(m, e.lockRef.current));
  }, []);
  a.useEffect(function() {
    return Z.push(i), e.setCallbacks({
      onScrollCapture: d,
      onWheelCapture: d,
      onTouchMoveCapture: h
    }), document.addEventListener("wheel", v, q), document.addEventListener("touchmove", v, q), document.addEventListener("touchstart", s, q), function() {
      Z = Z.filter(function(m) {
        return m !== i;
      }), document.removeEventListener("wheel", v, q), document.removeEventListener("touchmove", v, q), document.removeEventListener("touchstart", s, q);
    };
  }, []);
  var p = e.removeScrollBar, w = e.inert;
  return a.createElement(
    a.Fragment,
    null,
    w ? a.createElement(i, { styles: Cr(o) }) : null,
    p ? a.createElement(mr, { noRelative: e.noRelative, gapMode: e.gapMode }) : null
  );
}
function Pr(e) {
  for (var t = null; e !== null; )
    e instanceof ShadowRoot && (t = e.host, e = e.host), e = e.parentNode;
  return t;
}
const Or = tr(St, Dr);
var Ot = a.forwardRef(function(e, t) {
  return a.createElement(we, $({}, e, { ref: t, sideCar: Or }));
});
Ot.classNames = we.classNames;
var Ir = function(e) {
  if (typeof document > "u")
    return null;
  var t = Array.isArray(e) ? e[0] : e;
  return t.ownerDocument.body;
}, Q = /* @__PURE__ */ new WeakMap(), pe = /* @__PURE__ */ new WeakMap(), he = {}, Me = 0, It = function(e) {
  return e && (e.host || It(e.parentNode));
}, Ar = function(e, t) {
  return t.map(function(n) {
    if (e.contains(n))
      return n;
    var r = It(n);
    return r && e.contains(r) ? r : (console.error("aria-hidden", n, "in not contained inside", e, ". Doing nothing"), null);
  }).filter(function(n) {
    return !!n;
  });
}, Nr = function(e, t, n, r) {
  var o = Ar(t, Array.isArray(e) ? e : [e]);
  he[n] || (he[n] = /* @__PURE__ */ new WeakMap());
  var i = he[n], u = [], c = /* @__PURE__ */ new Set(), v = new Set(o), l = function(d) {
    !d || c.has(d) || (c.add(d), l(d.parentNode));
  };
  o.forEach(l);
  var s = function(d) {
    !d || v.has(d) || Array.prototype.forEach.call(d.children, function(h) {
      if (c.has(h))
        s(h);
      else
        try {
          var p = h.getAttribute(r), w = p !== null && p !== "false", m = (Q.get(h) || 0) + 1, g = (i.get(h) || 0) + 1;
          Q.set(h, m), i.set(h, g), u.push(h), m === 1 && w && pe.set(h, !0), g === 1 && h.setAttribute(n, "true"), w || h.setAttribute(r, "true");
        } catch (S) {
          console.error("aria-hidden: cannot operate on ", h, S);
        }
    });
  };
  return s(t), c.clear(), Me++, function() {
    u.forEach(function(d) {
      var h = Q.get(d) - 1, p = i.get(d) - 1;
      Q.set(d, h), i.set(d, p), h || (pe.has(d) || d.removeAttribute(r), pe.delete(d)), p || d.removeAttribute(n);
    }), Me--, Me || (Q = /* @__PURE__ */ new WeakMap(), Q = /* @__PURE__ */ new WeakMap(), pe = /* @__PURE__ */ new WeakMap(), he = {});
  };
}, kr = function(e, t, n) {
  n === void 0 && (n = "data-aria-hidden");
  var r = Array.from(Array.isArray(e) ? e : [e]), o = Ir(e);
  return o ? (r.push.apply(r, Array.from(o.querySelectorAll("[aria-live], script"))), Nr(r, o, n, "aria-hidden")) : function() {
    return null;
  };
}, Se = "Dialog", [At] = on(Se), [xr, W] = At(Se), Nt = (e) => {
  const {
    __scopeDialog: t,
    children: n,
    open: r,
    defaultOpen: o,
    onOpenChange: i,
    modal: u = !0
  } = e, c = a.useRef(null), v = a.useRef(null), [l, s] = ln({
    prop: r,
    defaultProp: o ?? !1,
    onChange: i,
    caller: Se
  });
  return /* @__PURE__ */ A(
    xr,
    {
      scope: t,
      triggerRef: c,
      contentRef: v,
      contentId: j(),
      titleId: j(),
      descriptionId: j(),
      open: l,
      onOpenChange: s,
      onOpenToggle: a.useCallback(() => s((d) => !d), [s]),
      modal: u,
      children: n
    }
  );
};
Nt.displayName = Se;
var kt = "DialogTrigger", Mr = a.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...r } = e, o = W(kt, n), i = z(t, o.triggerRef);
    return /* @__PURE__ */ A(
      M.button,
      {
        type: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": o.open,
        "aria-controls": o.open ? o.contentId : void 0,
        "data-state": Ue(o.open),
        ...r,
        ref: i,
        onClick: V(e.onClick, o.onOpenToggle)
      }
    );
  }
);
Mr.displayName = kt;
var $e = "DialogPortal", [Tr, xt] = At($e, {
  forceMount: void 0
}), Mt = (e) => {
  const { __scopeDialog: t, forceMount: n, children: r, container: o } = e, i = W($e, t);
  return /* @__PURE__ */ A(Tr, { scope: t, forceMount: n, children: a.Children.map(r, (u) => /* @__PURE__ */ A(Ee, { present: n || i.open, children: /* @__PURE__ */ A(bt, { asChild: !0, container: o, children: u }) })) });
};
Mt.displayName = $e;
var be = "DialogOverlay", Tt = a.forwardRef(
  (e, t) => {
    const n = xt(be, e.__scopeDialog), { forceMount: r = n.forceMount, ...o } = e, i = W(be, e.__scopeDialog);
    return i.modal ? /* @__PURE__ */ A(Ee, { present: r || i.open, children: /* @__PURE__ */ A(Fr, { ...o, ref: t }) }) : null;
  }
);
Tt.displayName = be;
var Lr = /* @__PURE__ */ mt("DialogOverlay.RemoveScroll"), Fr = a.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...r } = e, o = W(be, n), i = Nn(), u = z(t, i);
    return (
      // Make sure `Content` is scrollable even when it doesn't live inside `RemoveScroll`
      // ie. when `Overlay` and `Content` are siblings
      /* @__PURE__ */ A(Ot, { as: Lr, allowPinchZoom: !0, shards: [o.contentRef], children: /* @__PURE__ */ A(
        M.div,
        {
          "data-state": Ue(o.open),
          ...r,
          ref: u,
          style: { pointerEvents: "auto", ...r.style }
        }
      ) })
    );
  }
), re = "DialogContent", Lt = a.forwardRef(
  (e, t) => {
    const n = xt(re, e.__scopeDialog), { forceMount: r = n.forceMount, ...o } = e, i = W(re, e.__scopeDialog);
    return /* @__PURE__ */ A(Ee, { present: r || i.open, children: i.modal ? /* @__PURE__ */ A(_r, { ...o, ref: t }) : /* @__PURE__ */ A(Wr, { ...o, ref: t }) });
  }
);
Lt.displayName = re;
var _r = a.forwardRef(
  (e, t) => {
    const n = W(re, e.__scopeDialog), r = a.useRef(null), o = z(t, n.contentRef, r);
    return a.useEffect(() => {
      const i = r.current;
      if (i) return kr(i);
    }, []), /* @__PURE__ */ A(
      Ft,
      {
        ...e,
        ref: o,
        trapFocus: n.open,
        disableOutsidePointerEvents: n.open,
        onCloseAutoFocus: V(e.onCloseAutoFocus, (i) => {
          i.preventDefault(), n.triggerRef.current?.focus();
        }),
        onPointerDownOutside: V(e.onPointerDownOutside, (i) => {
          const u = i.detail.originalEvent, c = u.button === 0 && u.ctrlKey === !0;
          (u.button === 2 || c) && i.preventDefault();
        }),
        onFocusOutside: V(
          e.onFocusOutside,
          (i) => i.preventDefault()
        )
      }
    );
  }
), Wr = a.forwardRef(
  (e, t) => {
    const n = W(re, e.__scopeDialog), r = a.useRef(!1), o = a.useRef(!1);
    return /* @__PURE__ */ A(
      Ft,
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
          const u = i.target;
          n.triggerRef.current?.contains(u) && i.preventDefault(), i.detail.originalEvent.type === "focusin" && o.current && i.preventDefault();
        }
      }
    );
  }
), Ft = a.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, trapFocus: r, onOpenAutoFocus: o, onCloseAutoFocus: i, ...u } = e, c = W(re, n);
    return Hn(), /* @__PURE__ */ A(Xt, { children: /* @__PURE__ */ A(
      gt,
      {
        asChild: !0,
        loop: !0,
        trapped: r,
        onMountAutoFocus: o,
        onUnmountAutoFocus: i,
        children: /* @__PURE__ */ A(
          pt,
          {
            role: "dialog",
            id: c.contentId,
            "aria-describedby": c.descriptionId,
            "aria-labelledby": c.titleId,
            "data-state": Ue(c.open),
            ...u,
            ref: t,
            deferPointerDownOutside: !0,
            onDismiss: () => c.onOpenChange(!1)
          }
        )
      }
    ) });
  }
), _t = "DialogTitle", Br = a.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...r } = e, o = W(_t, n);
    return /* @__PURE__ */ A(M.h2, { id: o.titleId, ...r, ref: t });
  }
);
Br.displayName = _t;
var Wt = "DialogDescription", $r = a.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...r } = e, o = W(Wt, n);
    return /* @__PURE__ */ A(M.p, { id: o.descriptionId, ...r, ref: t });
  }
);
$r.displayName = Wt;
var Bt = "DialogClose", Ur = a.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...r } = e, o = W(Bt, n);
    return /* @__PURE__ */ A(
      M.button,
      {
        type: "button",
        ...r,
        ref: t,
        onClick: V(e.onClick, () => o.onOpenChange(!1))
      }
    );
  }
);
Ur.displayName = Bt;
function Ue(e) {
  return e ? "open" : "closed";
}
var ae = '[cmdk-group=""]', Te = '[cmdk-group-items=""]', jr = '[cmdk-group-heading=""]', $t = '[cmdk-item=""]', dt = `${$t}:not([aria-disabled="true"])`, We = "cmdk-item-select", J = "data-value", Kr = (e, t, n) => rn(e, t, n), Ut = a.createContext(void 0), ue = () => a.useContext(Ut), jt = a.createContext(void 0), je = () => a.useContext(jt), Kt = a.createContext(void 0), Vt = a.forwardRef((e, t) => {
  let n = ee(() => {
    var f, E;
    return { search: "", value: (E = (f = e.value) != null ? f : e.defaultValue) != null ? E : "", selectedItemId: void 0, filtered: { count: 0, items: /* @__PURE__ */ new Map(), groups: /* @__PURE__ */ new Set() } };
  }), r = ee(() => /* @__PURE__ */ new Set()), o = ee(() => /* @__PURE__ */ new Map()), i = ee(() => /* @__PURE__ */ new Map()), u = ee(() => /* @__PURE__ */ new Set()), c = Ht(e), { label: v, children: l, value: s, onValueChange: d, filter: h, shouldFilter: p, loop: w, disablePointerSelection: m = !1, vimBindings: g = !0, ...S } = e, b = j(), C = j(), O = j(), R = a.useRef(null), D = eo();
  Y(() => {
    if (s !== void 0) {
      let f = s.trim();
      n.current.value = f, N.emit();
    }
  }, [s]), Y(() => {
    D(6, Ke);
  }, []);
  let N = a.useMemo(() => ({ subscribe: (f) => (u.current.add(f), () => u.current.delete(f)), snapshot: () => n.current, setState: (f, E, P) => {
    var y, I, x, L;
    if (!Object.is(n.current[f], E)) {
      if (n.current[f] = E, f === "search") B(), F(), D(1, _);
      else if (f === "value") {
        if (document.activeElement.hasAttribute("cmdk-input") || document.activeElement.hasAttribute("cmdk-root")) {
          let T = document.getElementById(O);
          T ? T.focus() : (y = document.getElementById(b)) == null || y.focus();
        }
        if (D(7, () => {
          var T;
          n.current.selectedItemId = (T = X()) == null ? void 0 : T.id, N.emit();
        }), P || D(5, Ke), ((I = c.current) == null ? void 0 : I.value) !== void 0) {
          let T = E ?? "";
          (L = (x = c.current).onValueChange) == null || L.call(x, T);
          return;
        }
      }
      N.emit();
    }
  }, emit: () => {
    u.current.forEach((f) => f());
  } }), []), U = a.useMemo(() => ({ value: (f, E, P) => {
    var y;
    E !== ((y = i.current.get(f)) == null ? void 0 : y.value) && (i.current.set(f, { value: E, keywords: P }), n.current.filtered.items.set(f, k(E, P)), D(2, () => {
      F(), N.emit();
    }));
  }, item: (f, E) => (r.current.add(f), E && (o.current.has(E) ? o.current.get(E).add(f) : o.current.set(E, /* @__PURE__ */ new Set([f]))), D(3, () => {
    B(), F(), n.current.value || _(), N.emit();
  }), () => {
    i.current.delete(f), r.current.delete(f), n.current.filtered.items.delete(f);
    let P = X();
    D(4, () => {
      B(), P?.getAttribute("id") === f && _(), N.emit();
    });
  }), group: (f) => (o.current.has(f) || o.current.set(f, /* @__PURE__ */ new Set()), () => {
    i.current.delete(f), o.current.delete(f);
  }), filter: () => c.current.shouldFilter, label: v || e["aria-label"], getDisablePointerSelection: () => c.current.disablePointerSelection, listId: b, inputId: O, labelId: C, listInnerRef: R }), []);
  function k(f, E) {
    var P, y;
    let I = (y = (P = c.current) == null ? void 0 : P.filter) != null ? y : Kr;
    return f ? I(f, n.current.search, E) : 0;
  }
  function F() {
    if (!n.current.search || c.current.shouldFilter === !1) return;
    let f = n.current.filtered.items, E = [];
    n.current.filtered.groups.forEach((y) => {
      let I = o.current.get(y), x = 0;
      I.forEach((L) => {
        let T = f.get(L);
        x = Math.max(T, x);
      }), E.push([y, x]);
    });
    let P = R.current;
    oe().sort((y, I) => {
      var x, L;
      let T = y.getAttribute("id"), se = I.getAttribute("id");
      return ((x = f.get(se)) != null ? x : 0) - ((L = f.get(T)) != null ? L : 0);
    }).forEach((y) => {
      let I = y.closest(Te);
      I ? I.appendChild(y.parentElement === I ? y : y.closest(`${Te} > *`)) : P.appendChild(y.parentElement === P ? y : y.closest(`${Te} > *`));
    }), E.sort((y, I) => I[1] - y[1]).forEach((y) => {
      var I;
      let x = (I = R.current) == null ? void 0 : I.querySelector(`${ae}[${J}="${encodeURIComponent(y[0])}"]`);
      x?.parentElement.appendChild(x);
    });
  }
  function _() {
    let f = oe().find((P) => P.getAttribute("aria-disabled") !== "true"), E = f?.getAttribute(J);
    N.setState("value", E || void 0);
  }
  function B() {
    var f, E, P, y;
    if (!n.current.search || c.current.shouldFilter === !1) {
      n.current.filtered.count = r.current.size;
      return;
    }
    n.current.filtered.groups = /* @__PURE__ */ new Set();
    let I = 0;
    for (let x of r.current) {
      let L = (E = (f = i.current.get(x)) == null ? void 0 : f.value) != null ? E : "", T = (y = (P = i.current.get(x)) == null ? void 0 : P.keywords) != null ? y : [], se = k(L, T);
      n.current.filtered.items.set(x, se), se > 0 && I++;
    }
    for (let [x, L] of o.current) for (let T of L) if (n.current.filtered.items.get(T) > 0) {
      n.current.filtered.groups.add(x);
      break;
    }
    n.current.filtered.count = I;
  }
  function Ke() {
    var f, E, P;
    let y = X();
    y && (((f = y.parentElement) == null ? void 0 : f.firstChild) === y && ((P = (E = y.closest(ae)) == null ? void 0 : E.querySelector(jr)) == null || P.scrollIntoView({ block: "nearest" })), y.scrollIntoView({ block: "nearest" }));
  }
  function X() {
    var f;
    return (f = R.current) == null ? void 0 : f.querySelector(`${$t}[aria-selected="true"]`);
  }
  function oe() {
    var f;
    return Array.from(((f = R.current) == null ? void 0 : f.querySelectorAll(dt)) || []);
  }
  function Re(f) {
    let E = oe()[f];
    E && N.setState("value", E.getAttribute(J));
  }
  function De(f) {
    var E;
    let P = X(), y = oe(), I = y.findIndex((L) => L === P), x = y[I + f];
    (E = c.current) != null && E.loop && (x = I + f < 0 ? y[y.length - 1] : I + f === y.length ? y[0] : y[I + f]), x && N.setState("value", x.getAttribute(J));
  }
  function Ve(f) {
    let E = X(), P = E?.closest(ae), y;
    for (; P && !y; ) P = f > 0 ? Qr(P, ae) : Jr(P, ae), y = P?.querySelector(dt);
    y ? N.setState("value", y.getAttribute(J)) : De(f);
  }
  let He = () => Re(oe().length - 1), Ye = (f) => {
    f.preventDefault(), f.metaKey ? He() : f.altKey ? Ve(1) : De(1);
  }, ze = (f) => {
    f.preventDefault(), f.metaKey ? Re(0) : f.altKey ? Ve(-1) : De(-1);
  };
  return a.createElement(M.div, { ref: t, tabIndex: -1, ...S, "cmdk-root": "", onKeyDown: (f) => {
    var E;
    (E = S.onKeyDown) == null || E.call(S, f);
    let P = f.nativeEvent.isComposing || f.keyCode === 229;
    if (!(f.defaultPrevented || P)) switch (f.key) {
      case "n":
      case "j": {
        g && f.ctrlKey && Ye(f);
        break;
      }
      case "ArrowDown": {
        Ye(f);
        break;
      }
      case "p":
      case "k": {
        g && f.ctrlKey && ze(f);
        break;
      }
      case "ArrowUp": {
        ze(f);
        break;
      }
      case "Home": {
        f.preventDefault(), Re(0);
        break;
      }
      case "End": {
        f.preventDefault(), He();
        break;
      }
      case "Enter": {
        f.preventDefault();
        let y = X();
        if (y) {
          let I = new Event(We);
          y.dispatchEvent(I);
        }
      }
    }
  } }, a.createElement("label", { "cmdk-label": "", htmlFor: U.inputId, id: U.labelId, style: no }, v), Ce(e, (f) => a.createElement(jt.Provider, { value: N }, a.createElement(Ut.Provider, { value: U }, f))));
}), Vr = a.forwardRef((e, t) => {
  var n, r;
  let o = j(), i = a.useRef(null), u = a.useContext(Kt), c = ue(), v = Ht(e), l = (r = (n = v.current) == null ? void 0 : n.forceMount) != null ? r : u?.forceMount;
  Y(() => {
    if (!l) return c.item(o, u?.id);
  }, [l]);
  let s = Yt(o, i, [e.value, e.children, i], e.keywords), d = je(), h = H((D) => D.value && D.value === s.current), p = H((D) => l || c.filter() === !1 ? !0 : D.search ? D.filtered.items.get(o) > 0 : !0);
  a.useEffect(() => {
    let D = i.current;
    if (!(!D || e.disabled)) return D.addEventListener(We, w), () => D.removeEventListener(We, w);
  }, [p, e.onSelect, e.disabled]);
  function w() {
    var D, N;
    m(), (N = (D = v.current).onSelect) == null || N.call(D, s.current);
  }
  function m() {
    d.setState("value", s.current, !0);
  }
  if (!p) return null;
  let { disabled: g, value: S, onSelect: b, forceMount: C, keywords: O, ...R } = e;
  return a.createElement(M.div, { ref: ne(i, t), ...R, id: o, "cmdk-item": "", role: "option", "aria-disabled": !!g, "aria-selected": !!h, "data-disabled": !!g, "data-selected": !!h, onPointerMove: g || c.getDisablePointerSelection() ? void 0 : m, onClick: g ? void 0 : w }, e.children);
}), Hr = a.forwardRef((e, t) => {
  let { heading: n, children: r, forceMount: o, ...i } = e, u = j(), c = a.useRef(null), v = a.useRef(null), l = j(), s = ue(), d = H((p) => o || s.filter() === !1 ? !0 : p.search ? p.filtered.groups.has(u) : !0);
  Y(() => s.group(u), []), Yt(u, c, [e.value, e.heading, v]);
  let h = a.useMemo(() => ({ id: u, forceMount: o }), [o]);
  return a.createElement(M.div, { ref: ne(c, t), ...i, "cmdk-group": "", role: "presentation", hidden: d ? void 0 : !0 }, n && a.createElement("div", { ref: v, "cmdk-group-heading": "", "aria-hidden": !0, id: l }, n), Ce(e, (p) => a.createElement("div", { "cmdk-group-items": "", role: "group", "aria-labelledby": n ? l : void 0 }, a.createElement(Kt.Provider, { value: h }, p))));
}), Yr = a.forwardRef((e, t) => {
  let { alwaysRender: n, ...r } = e, o = a.useRef(null), i = H((u) => !u.search);
  return !n && !i ? null : a.createElement(M.div, { ref: ne(o, t), ...r, "cmdk-separator": "", role: "separator" });
}), zr = a.forwardRef((e, t) => {
  let { onValueChange: n, ...r } = e, o = e.value != null, i = je(), u = H((l) => l.search), c = H((l) => l.selectedItemId), v = ue();
  return a.useEffect(() => {
    e.value != null && i.setState("search", e.value);
  }, [e.value]), a.createElement(M.input, { ref: t, ...r, "cmdk-input": "", autoComplete: "off", autoCorrect: "off", spellCheck: !1, "aria-autocomplete": "list", role: "combobox", "aria-expanded": !0, "aria-controls": v.listId, "aria-labelledby": v.labelId, "aria-activedescendant": c, id: v.inputId, type: "text", value: o ? e.value : u, onChange: (l) => {
    o || i.setState("search", l.target.value), n?.(l.target.value);
  } });
}), Xr = a.forwardRef((e, t) => {
  let { children: n, label: r = "Suggestions", ...o } = e, i = a.useRef(null), u = a.useRef(null), c = H((l) => l.selectedItemId), v = ue();
  return a.useEffect(() => {
    if (u.current && i.current) {
      let l = u.current, s = i.current, d, h = new ResizeObserver(() => {
        d = requestAnimationFrame(() => {
          let p = l.offsetHeight;
          s.style.setProperty("--cmdk-list-height", p.toFixed(1) + "px");
        });
      });
      return h.observe(l), () => {
        cancelAnimationFrame(d), h.unobserve(l);
      };
    }
  }, []), a.createElement(M.div, { ref: ne(i, t), ...o, "cmdk-list": "", role: "listbox", tabIndex: -1, "aria-activedescendant": c, "aria-label": r, id: v.listId }, Ce(e, (l) => a.createElement("div", { ref: ne(u, v.listInnerRef), "cmdk-list-sizer": "" }, l)));
}), Gr = a.forwardRef((e, t) => {
  let { open: n, onOpenChange: r, overlayClassName: o, contentClassName: i, container: u, ...c } = e;
  return a.createElement(Nt, { open: n, onOpenChange: r }, a.createElement(Mt, { container: u }, a.createElement(Tt, { "cmdk-overlay": "", className: o }), a.createElement(Lt, { "aria-label": e.label, "cmdk-dialog": "", className: i }, a.createElement(Vt, { ref: t, ...c }))));
}), qr = a.forwardRef((e, t) => H((n) => n.filtered.count === 0) ? a.createElement(M.div, { ref: t, ...e, "cmdk-empty": "", role: "presentation" }) : null), Zr = a.forwardRef((e, t) => {
  let { progress: n, children: r, label: o = "Loading...", ...i } = e;
  return a.createElement(M.div, { ref: t, ...i, "cmdk-loading": "", role: "progressbar", "aria-valuenow": n, "aria-valuemin": 0, "aria-valuemax": 100, "aria-label": o }, Ce(e, (u) => a.createElement("div", { "aria-hidden": !0 }, u)));
}), ao = Object.assign(Vt, { List: Xr, Item: Vr, Input: zr, Group: Hr, Separator: Yr, Dialog: Gr, Empty: qr, Loading: Zr });
function Qr(e, t) {
  let n = e.nextElementSibling;
  for (; n; ) {
    if (n.matches(t)) return n;
    n = n.nextElementSibling;
  }
}
function Jr(e, t) {
  let n = e.previousElementSibling;
  for (; n; ) {
    if (n.matches(t)) return n;
    n = n.previousElementSibling;
  }
}
function Ht(e) {
  let t = a.useRef(e);
  return Y(() => {
    t.current = e;
  }), t;
}
var Y = typeof window > "u" ? a.useEffect : a.useLayoutEffect;
function ee(e) {
  let t = a.useRef();
  return t.current === void 0 && (t.current = e()), t;
}
function H(e) {
  let t = je(), n = () => e(t.snapshot());
  return a.useSyncExternalStore(t.subscribe, n, n);
}
function Yt(e, t, n, r = []) {
  let o = a.useRef(), i = ue();
  return Y(() => {
    var u;
    let c = (() => {
      var l;
      for (let s of n) {
        if (typeof s == "string") return s.trim();
        if (typeof s == "object" && "current" in s) return s.current ? (l = s.current.textContent) == null ? void 0 : l.trim() : o.current;
      }
    })(), v = r.map((l) => l.trim());
    i.value(e, c, v), (u = t.current) == null || u.setAttribute(J, c), o.current = c;
  }), o;
}
var eo = () => {
  let [e, t] = a.useState(), n = ee(() => /* @__PURE__ */ new Map());
  return Y(() => {
    n.current.forEach((r) => r()), n.current = /* @__PURE__ */ new Map();
  }, [e]), (r, o) => {
    n.current.set(r, o), t({});
  };
};
function to(e) {
  let t = e.type;
  return typeof t == "function" ? t(e.props) : "render" in t ? t.render(e.props) : e;
}
function Ce({ asChild: e, children: t }, n) {
  return e && a.isValidElement(t) ? a.cloneElement(to(t), { ref: t.ref }, n(t.props.children)) : n(t);
}
var no = { position: "absolute", width: "1px", height: "1px", padding: "0", margin: "-1px", overflow: "hidden", clip: "rect(0, 0, 0, 0)", whiteSpace: "nowrap", borderWidth: "0" };
export {
  ao as _
};
