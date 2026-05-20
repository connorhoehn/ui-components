import { useState as E, useRef as _, useCallback as A, useEffect as U, useMemo as F } from "react";
import * as N from "yjs";
const Ae = 120 * 1e3, Te = 500;
function Ce(e = {}) {
  const { timeoutMs: t = Ae } = e, [n, s] = E(!1), r = _(null), c = _(null), l = _(!1), d = A(() => {
    r.current !== null && clearTimeout(r.current), l.current && (l.current = !1, s(!1)), r.current = setTimeout(() => {
      l.current = !0, s(!0);
    }, t);
  }, [t]), p = A(() => {
    c.current === null && (c.current = setTimeout(() => {
      c.current = null;
    }, Te), d());
  }, [d]);
  return U(() => {
    const w = [
      "mousemove",
      "keydown",
      "click",
      "touchstart",
      "scroll"
    ];
    for (const v of w)
      window.addEventListener(v, p, { passive: !0 });
    return d(), () => {
      for (const v of w)
        window.removeEventListener(v, p);
      r.current !== null && clearTimeout(r.current), c.current !== null && clearTimeout(c.current);
    };
  }, [p, d]), { isIdle: n };
}
function $e(e, t) {
  const n = _({
    ...t,
    name: t.displayName,
    lastSeen: Date.now(),
    idle: !1
  }), s = _(e);
  s.current = e;
  const r = A(() => {
    const v = s.current;
    v?.awareness && (n.current.lastSeen = Date.now(), v.awareness.setLocalStateField("user", { ...n.current }));
  }, []);
  U(() => {
    e?.awareness && (n.current = {
      ...n.current,
      ...t,
      name: t.displayName,
      lastSeen: Date.now()
    }, r());
  }, [e, t.userId, t.displayName, t.color, t.mode, r]);
  const { isIdle: c } = Ce();
  U(() => {
    n.current.idle = c, r();
  }, [c, r]);
  const l = A((v) => {
    n.current.currentSectionId = v, r();
  }, [r]), d = A((v) => {
    n.current.mode = v, r();
  }, [r]), p = A((v) => {
    n.current.idle = v, r();
  }, [r]), w = A((v, k) => {
    n.current.name = v, n.current.color = k, r();
  }, [r]);
  return { updateSection: l, updateMode: d, updateIdle: p, updateCursorInfo: w };
}
function Me(e, t) {
  const [n, s] = E([]), r = $e(e, {
    userId: t.userId,
    displayName: t.displayName,
    color: t.color,
    mode: t.mode,
    currentSectionId: null
  });
  return U(() => {
    if (!e) {
      s([]);
      return;
    }
    let c = "";
    const l = () => {
      const d = e.awareness.getStates(), p = [];
      d.forEach((g, h) => {
        if (h === e.awareness.clientID) return;
        const C = g.user;
        C && p.push({
          clientId: String(h),
          userId: C.userId ?? "",
          displayName: C.displayName ?? "Anonymous",
          color: C.color ?? "#3b82f6",
          mode: C.mode === "ack" ? "reviewer" : C.mode === "reader" ? "reader" : "editor",
          currentSectionId: C.currentSectionId ?? null,
          lastSeen: C.lastSeen ?? Date.now(),
          idle: C.idle ?? !1
        });
      });
      const w = /* @__PURE__ */ new Map();
      for (const g of p) {
        const h = g.userId || g.displayName || g.clientId, C = w.get(h);
        (!C || (g.lastSeen ?? 0) > (C.lastSeen ?? 0)) && w.set(h, g);
      }
      const v = Array.from(w.values()), k = v.map(
        (g) => `${g.clientId}:${g.currentSectionId}:${g.mode}:${g.idle}`
      ).join("|");
      k !== c && (c = k, queueMicrotask(() => s(v)));
    };
    return e.awareness.on("change", l), l(), () => {
      e.awareness.off("change", l);
    };
  }, [e]), { awareness: r, participants: n };
}
const B = () => /* @__PURE__ */ new Map(), De = (e, t, n) => {
  let s = e.get(t);
  return s === void 0 && e.set(t, s = n()), s;
}, Ee = () => /* @__PURE__ */ new Set(), Ue = Array.from;
class ye {
  constructor() {
    this._observers = B();
  }
  /**
   * @param {N} name
   * @param {function} f
   */
  on(t, n) {
    De(this._observers, t, Ee).add(n);
  }
  /**
   * @param {N} name
   * @param {function} f
   */
  once(t, n) {
    const s = (...r) => {
      this.off(t, s), n(...r);
    };
    this.on(t, s);
  }
  /**
   * @param {N} name
   * @param {function} f
   */
  off(t, n) {
    const s = this._observers.get(t);
    s !== void 0 && (s.delete(n), s.size === 0 && this._observers.delete(t));
  }
  /**
   * Emit a named event. All registered event listeners that listen to the
   * specified name will receive the event.
   *
   * @todo This should catch exceptions
   *
   * @param {N} name The event name.
   * @param {Array<any>} args The arguments that are applied to the event listener.
   */
  emit(t, n) {
    return Ue((this._observers.get(t) || B()).values()).forEach((s) => s(...n));
  }
  destroy() {
    this._observers = B();
  }
}
const ge = Math.floor, Oe = (e, t) => e < t ? e : t, Ne = (e, t) => e > t ? e : t, we = 128, Y = 127, _e = Number.MAX_SAFE_INTEGER, xe = String.fromCharCode, Le = (e) => e.toLowerCase(), je = /^\s*/g, Re = (e) => e.replace(je, ""), Be = /([A-Z])/g, ie = (e, t) => Re(e.replace(Be, (n) => `${t}${Le(n)}`)), Pe = (e) => {
  const t = unescape(encodeURIComponent(e)), n = t.length, s = new Uint8Array(n);
  for (let r = 0; r < n; r++)
    s[r] = /** @type {number} */
    t.codePointAt(r);
  return s;
}, G = (
  /** @type {TextEncoder} */
  typeof TextEncoder < "u" ? new TextEncoder() : null
), Fe = (e) => G.encode(e), Ve = G ? Fe : Pe;
let J = typeof TextDecoder > "u" ? null : new TextDecoder("utf-8", { fatal: !0, ignoreBOM: !0 });
J && J.decode(new Uint8Array()).length === 1 && (J = null);
class ze {
  constructor() {
    this.cpos = 0, this.cbuf = new Uint8Array(100), this.bufs = [];
  }
}
const Je = () => new ze(), He = (e) => {
  let t = e.cpos;
  for (let n = 0; n < e.bufs.length; n++)
    t += e.bufs[n].length;
  return t;
}, qe = (e) => {
  const t = new Uint8Array(He(e));
  let n = 0;
  for (let s = 0; s < e.bufs.length; s++) {
    const r = e.bufs[s];
    t.set(r, n), n += r.length;
  }
  return t.set(new Uint8Array(e.cbuf.buffer, 0, e.cpos), n), t;
}, W = (e, t) => {
  const n = e.cbuf.length;
  e.cpos === n && (e.bufs.push(e.cbuf), e.cbuf = new Uint8Array(n * 2), e.cpos = 0), e.cbuf[e.cpos++] = t;
}, P = (e, t) => {
  for (; t > Y; )
    W(e, we | Y & t), t = ge(t / 128);
  W(e, Y & t);
}, ne = new Uint8Array(3e4), Ge = ne.length / 3, Xe = (e, t) => {
  if (t.length < Ge) {
    const n = G.encodeInto(t, ne).written || 0;
    P(e, n);
    for (let s = 0; s < n; s++)
      W(e, ne[s]);
  } else
    Ze(e, Ve(t));
}, Ye = (e, t) => {
  const n = unescape(encodeURIComponent(t)), s = n.length;
  P(e, s);
  for (let r = 0; r < s; r++)
    W(
      e,
      /** @type {number} */
      n.codePointAt(r)
    );
}, Ke = G && /** @type {any} */
G.encodeInto ? Xe : Ye, We = (e, t) => {
  const n = e.cbuf.length, s = e.cpos, r = Oe(n - s, t.length), c = t.length - r;
  e.cbuf.set(t.subarray(0, r), s), e.cpos += r, c > 0 && (e.bufs.push(e.cbuf), e.cbuf = new Uint8Array(Ne(n * 2, c)), e.cbuf.set(t.subarray(r)), e.cpos = c);
}, Ze = (e, t) => {
  P(e, t.byteLength), We(e, t);
}, Ie = (e) => new Error(e), Qe = Ie("Unexpected end of array"), et = Ie("Integer out of Range");
class tt {
  /**
   * @param {Uint8Array<Buf>} uint8Array Binary data to decode
   */
  constructor(t) {
    this.arr = t, this.pos = 0;
  }
}
const nt = (e) => new tt(e), st = (e, t) => {
  const n = new Uint8Array(e.arr.buffer, e.pos + e.arr.byteOffset, t);
  return e.pos += t, n;
}, rt = (e) => st(e, H(e)), ue = (e) => e.arr[e.pos++], H = (e) => {
  let t = 0, n = 1;
  const s = e.arr.length;
  for (; e.pos < s; ) {
    const r = e.arr[e.pos++];
    if (t = t + (r & Y) * n, n *= 128, r < we)
      return t;
    if (t > _e)
      throw et;
  }
  throw Qe;
}, ot = (e) => {
  let t = H(e);
  if (t === 0)
    return "";
  {
    let n = String.fromCodePoint(ue(e));
    if (--t < 100)
      for (; t--; )
        n += String.fromCodePoint(ue(e));
    else
      for (; t > 0; ) {
        const s = t < 1e4 ? t : 1e4, r = e.arr.subarray(e.pos, e.pos + s);
        e.pos += s, n += String.fromCodePoint.apply(
          null,
          /** @type {any} */
          r
        ), t -= s;
      }
    return decodeURIComponent(escape(n));
  }
}, ct = (e) => (
  /** @type any */
  J.decode(rt(e))
), at = J ? ct : ot, Z = Date.now, le = /* @__PURE__ */ Symbol("Equality"), it = Object.keys, de = (e) => it(e).length, ut = (e, t) => Object.prototype.hasOwnProperty.call(e, t), q = (e, t) => {
  if (e === t)
    return !0;
  if (e == null || t == null || e.constructor !== t.constructor && (e.constructor || Object) !== (t.constructor || Object))
    return !1;
  if (e[le] != null)
    return e[le](t);
  switch (e.constructor) {
    case ArrayBuffer:
      e = new Uint8Array(e), t = new Uint8Array(t);
    // eslint-disable-next-line no-fallthrough
    case Uint8Array: {
      if (e.byteLength !== t.byteLength)
        return !1;
      for (let n = 0; n < e.length; n++)
        if (e[n] !== t[n])
          return !1;
      break;
    }
    case Set: {
      if (e.size !== t.size)
        return !1;
      for (const n of e)
        if (!t.has(n))
          return !1;
      break;
    }
    case Map: {
      if (e.size !== t.size)
        return !1;
      for (const n of e.keys())
        if (!t.has(n) || !q(e.get(n), t.get(n)))
          return !1;
      break;
    }
    case void 0:
    case Object:
      if (de(e) !== de(t))
        return !1;
      for (const n in e)
        if (!ut(e, n) || !q(e[n], t[n]))
          return !1;
      break;
    case Array:
      if (e.length !== t.length)
        return !1;
      for (let n = 0; n < e.length; n++)
        if (!q(e[n], t[n]))
          return !1;
      break;
    default:
      return !1;
  }
  return !0;
}, lt = (e, t) => t.includes(e), Q = 3e4;
class dt extends ye {
  /**
   * @param {Y.Doc} doc
   */
  constructor(t) {
    super(), this.doc = t, this.clientID = t.clientID, this.states = /* @__PURE__ */ new Map(), this.meta = /* @__PURE__ */ new Map(), this._checkInterval = /** @type {any} */
    setInterval(() => {
      const n = Z();
      this.getLocalState() !== null && Q / 2 <= n - /** @type {{lastUpdated:number}} */
      this.meta.get(this.clientID).lastUpdated && this.setLocalState(this.getLocalState());
      const s = [];
      this.meta.forEach((r, c) => {
        c !== this.clientID && Q <= n - r.lastUpdated && this.states.has(c) && s.push(c);
      }), s.length > 0 && ft(this, s, "timeout");
    }, ge(Q / 10)), t.on("destroy", () => {
      this.destroy();
    }), this.setLocalState({});
  }
  destroy() {
    this.emit("destroy", [this]), this.setLocalState(null), super.destroy(), clearInterval(this._checkInterval);
  }
  /**
   * @return {Object<string,any>|null}
   */
  getLocalState() {
    return this.states.get(this.clientID) || null;
  }
  /**
   * @param {Object<string,any>|null} state
   */
  setLocalState(t) {
    const n = this.clientID, s = this.meta.get(n), r = s === void 0 ? 0 : s.clock + 1, c = this.states.get(n);
    t === null ? this.states.delete(n) : this.states.set(n, t), this.meta.set(n, {
      clock: r,
      lastUpdated: Z()
    });
    const l = [], d = [], p = [], w = [];
    t === null ? w.push(n) : c == null ? t != null && l.push(n) : (d.push(n), q(c, t) || p.push(n)), (l.length > 0 || p.length > 0 || w.length > 0) && this.emit("change", [{ added: l, updated: p, removed: w }, "local"]), this.emit("update", [{ added: l, updated: d, removed: w }, "local"]);
  }
  /**
   * @param {string} field
   * @param {any} value
   */
  setLocalStateField(t, n) {
    const s = this.getLocalState();
    s !== null && this.setLocalState({
      ...s,
      [t]: n
    });
  }
  /**
   * @return {Map<number,Object<string,any>>}
   */
  getStates() {
    return this.states;
  }
}
const ft = (e, t, n) => {
  const s = [];
  for (let r = 0; r < t.length; r++) {
    const c = t[r];
    if (e.states.has(c)) {
      if (e.states.delete(c), c === e.clientID) {
        const l = (
          /** @type {MetaClientState} */
          e.meta.get(c)
        );
        e.meta.set(c, {
          clock: l.clock + 1,
          lastUpdated: Z()
        });
      }
      s.push(c);
    }
  }
  s.length > 0 && (e.emit("change", [{ added: [], updated: [], removed: s }, n]), e.emit("update", [{ added: [], updated: [], removed: s }, n]));
}, mt = (e, t, n = e.states) => {
  const s = t.length, r = Je();
  P(r, s);
  for (let c = 0; c < s; c++) {
    const l = t[c], d = n.get(l) || null, p = (
      /** @type {MetaClientState} */
      e.meta.get(l).clock
    );
    P(r, l), P(r, p), Ke(r, JSON.stringify(d));
  }
  return qe(r);
}, pt = (e, t, n) => {
  const s = nt(t), r = Z(), c = [], l = [], d = [], p = [], w = H(s);
  for (let v = 0; v < w; v++) {
    const k = H(s);
    let g = H(s);
    const h = JSON.parse(at(s)), C = e.meta.get(k), T = e.states.get(k), I = C === void 0 ? 0 : C.clock;
    (I < g || I === g && h === null && e.states.has(k)) && (h === null ? k === e.clientID && e.getLocalState() != null ? g++ : e.states.delete(k) : e.states.set(k, h), e.meta.set(k, {
      clock: g,
      lastUpdated: r
    }), C === void 0 && h !== null ? c.push(k) : C !== void 0 && h === null ? p.push(k) : h !== null && (q(h, T) || d.push(k), l.push(k)));
  }
  (c.length > 0 || d.length > 0 || p.length > 0) && e.emit("change", [{
    added: c,
    updated: d,
    removed: p
  }, n]), (c.length > 0 || l.length > 0 || p.length > 0) && e.emit("update", [{
    added: c,
    updated: l,
    removed: p
  }, n]);
}, fe = (e) => e === void 0 ? null : e;
class ht {
  constructor() {
    this.map = /* @__PURE__ */ new Map();
  }
  /**
   * @param {string} key
   * @param {any} newValue
   */
  setItem(t, n) {
    this.map.set(t, n);
  }
  /**
   * @param {string} key
   */
  getItem(t) {
    return this.map.get(t);
  }
}
let ve = new ht(), yt = !0;
try {
  typeof localStorage < "u" && localStorage && (ve = localStorage, yt = !1);
} catch {
}
const gt = ve, V = typeof process < "u" && process.release && /node|io\.js/.test(process.release.name) && Object.prototype.toString.call(typeof process < "u" ? process : 0) === "[object process]", Se = typeof window < "u" && typeof document < "u" && !V;
let j;
const wt = () => {
  if (j === void 0)
    if (V) {
      j = B();
      const e = process.argv;
      let t = null;
      for (let n = 0; n < e.length; n++) {
        const s = e[n];
        s[0] === "-" ? (t !== null && j.set(t, ""), t = s) : t !== null && (j.set(t, s), t = null);
      }
      t !== null && j.set(t, "");
    } else typeof location == "object" ? (j = B(), (location.search || "?").slice(1).split("&").forEach((e) => {
      if (e.length !== 0) {
        const [t, n] = e.split("=");
        j.set(`--${ie(t, "-")}`, n), j.set(`-${ie(t, "-")}`, n);
      }
    })) : j = B();
  return j;
}, se = (e) => wt().has(e), re = (e) => fe(V ? process.env[e.toUpperCase().replaceAll("-", "_")] : gt.getItem(e)), be = (e) => se("--" + e) || re(e) !== null;
be("production");
const It = V && lt(process.env.FORCE_COLOR, ["true", "1", "2"]);
It || !se("--no-colors") && // @todo deprecate --no-colors
!be("no-color") && (!V || process.stdout.isTTY) && (!V || se("--color") || re("COLORTERM") !== null || (re("TERM") || "").includes("color"));
const vt = (e) => new Uint8Array(e), St = (e, t, n) => new Uint8Array(e, t, n), bt = (e) => {
  let t = "";
  for (let n = 0; n < e.byteLength; n++)
    t += xe(e[n]);
  return btoa(t);
}, kt = (e) => Buffer.from(e.buffer, e.byteOffset, e.byteLength).toString("base64"), At = (e) => {
  const t = atob(e), n = vt(t.length);
  for (let s = 0; s < t.length; s++)
    n[s] = t.charCodeAt(s);
  return n;
}, Tt = (e) => {
  const t = Buffer.from(e, "base64");
  return St(t.buffer, t.byteOffset, t.byteLength);
}, me = Se ? bt : kt, K = Se ? At : Tt;
class pe extends ye {
  doc;
  channel;
  awareness;
  _sendMessage;
  _synced = !1;
  _awarenessTimer = null;
  _updateHandler;
  constructor(t, n, s) {
    super(), this.doc = t, this.channel = n, this._sendMessage = s, this.awareness = new dt(t), this._updateHandler = (r, c) => {
      if (c === this) return;
      const l = me(r);
      this._sendMessage({
        service: "crdt",
        action: "update",
        channel: this.channel,
        update: l
      });
    }, this.doc.on("update", this._updateHandler), this.awareness.on("update", ({ added: r, updated: c, removed: l }, d) => {
      d === this || !r.concat(c, l).includes(this.awareness.clientID) || (this._awarenessTimer && clearTimeout(this._awarenessTimer), this._awarenessTimer = setTimeout(() => {
        const w = mt(this.awareness, [this.awareness.clientID]), v = me(w);
        this._sendMessage({
          service: "crdt",
          action: "awareness",
          channel: this.channel,
          update: v
        });
      }, 50));
    });
  }
  /** Whether we have received at least one snapshot from the server. */
  get synced() {
    return this._synced;
  }
  /**
   * Apply a remote Y.js document update received from the gateway.
   * Uses `this` as origin so the update handler above skips re-sending it.
   */
  applyRemoteUpdate(t) {
    const n = K(t);
    N.applyUpdate(this.doc, n, this);
  }
  /**
   * Apply the initial document snapshot from the server.
   * Functionally identical to applyRemoteUpdate but marks the provider as synced.
   */
  applySnapshot(t) {
    const n = K(t);
    N.applyUpdate(this.doc, n, this), this._synced = !0, this.emit("synced", [!0]);
  }
  /**
   * Apply a remote awareness update received from the gateway.
   */
  applyAwarenessUpdate(t) {
    const n = K(t);
    pt(this.awareness, n, this);
  }
  destroy() {
    this.doc.off("update", this._updateHandler), this._awarenessTimer && clearTimeout(this._awarenessTimer), this.awareness.destroy(), super.destroy();
  }
}
function Ct(e) {
  const { documentId: t, ws: n, onMessage: s, onDocReplaced: r } = e, [c, l] = E(!1), [d, p] = E(0), w = _(null), v = _(null), k = _(r);
  k.current = r;
  const g = `doc:${t}`;
  return U(() => {
    const h = new N.Doc({ gc: !1 });
    w.current = h;
    const C = new pe(h, g, n.sendMessage);
    v.current = C, p((f) => f + 1);
    const T = () => {
      n.sendMessage({ service: "crdt", action: "subscribe", channel: g });
    };
    T();
    const I = setTimeout(T, 500), S = setTimeout(T, 1500), y = () => l(!0);
    return C.on("synced", y), () => {
      clearTimeout(I), clearTimeout(S), n.sendMessage({ service: "crdt", action: "unsubscribe", channel: g });
      const f = v.current, i = w.current;
      f && (f.off("synced", y), f.destroy()), i && i.destroy(), w.current = null, v.current = null, l(!1);
    };
  }, [t]), U(() => s((C) => {
    C.type === "session" && n.sendMessage({ service: "crdt", action: "subscribe", channel: g });
  }), [t, n.sendMessage, s, g]), U(() => {
    const h = s((T) => {
      const I = v.current;
      if (I) {
        if (T.type === "crdt:doc-replaced") {
          if (T.channel !== g) return;
          const S = T.snapshot;
          if (!S) return;
          const y = w.current, f = v.current;
          f && (f.off("synced", C), f.destroy()), y && y.destroy();
          const i = new N.Doc({ gc: !1 });
          w.current = i;
          const o = new pe(i, g, n.sendMessage);
          v.current = o, o.applySnapshot(S), o.on("synced", C), k.current?.(i, o), l(!0), p((u) => u + 1);
          return;
        }
        if (T.type === "crdt:snapshot") {
          if (T.channel !== g) return;
          const S = T.snapshot;
          S && I.applySnapshot(S);
          return;
        }
        if (T.type === "crdt:update") {
          if (T.channel !== g) return;
          const S = T.update;
          S && I.applyRemoteUpdate(S);
          return;
        }
        if (T.type === "crdt:awareness") {
          if (T.channel !== g) return;
          const S = T, y = S.updates;
          if (y && Array.isArray(y)) {
            for (const i of y)
              i.update && I.applyAwarenessUpdate(i.update);
            return;
          }
          const f = S.update;
          f && I.applyAwarenessUpdate(f);
          return;
        }
        if (T.type === "crdt") {
          if (T.channel !== g) return;
          switch (T.action) {
            case "snapshot":
              if (T.version) break;
              T.update && I.applySnapshot(T.update);
              break;
            case "update":
              T.update && I.applyRemoteUpdate(T.update);
              break;
            case "awareness":
              T.update && I.applyAwarenessUpdate(T.update);
              break;
          }
        }
      }
    });
    function C() {
      l(!0);
    }
    return h;
  }, [t, s]), {
    ydoc: w.current,
    provider: v.current,
    synced: c,
    docVersion: d
  };
}
function $t(e) {
  const t = {};
  return e.forEach((n, s) => {
    t[s] = n;
  }), t;
}
function Mt(e) {
  const [t, n] = E(null);
  U(() => {
    if (!e) {
      n(null);
      return;
    }
    const r = e.getMap("meta"), c = () => {
      r.size > 0 && n($t(r));
    };
    return r.observe(c), c(), () => {
      r.unobserve(c);
    };
  }, [e]);
  const s = A(
    (r) => {
      if (!e) return;
      const c = e.getMap("meta");
      e.transact(() => {
        for (const [l, d] of Object.entries(r))
          c.set(l, d);
      });
    },
    [e]
  );
  return { meta: t, updateMeta: s };
}
function ce(e) {
  const t = {};
  return e.forEach((n, s) => {
    t[s] = n;
  }), t;
}
function Dt(e) {
  const t = [];
  return e.forEach((n) => {
    t.push(ce(n));
  }), t;
}
function Et(e) {
  const t = [];
  return e.forEach((n) => {
    const s = ce(n), r = n.get("items");
    r instanceof N.Array ? s.items = Dt(r) : s.items = [], t.push(s);
  }), t;
}
function ee(e, t) {
  for (const [n, s] of Object.entries(t))
    e.set(n, s);
}
function Ut(e) {
  const t = [];
  return e.forEach((n) => {
    t.push(ce(n));
  }), t;
}
function Ot(e) {
  const t = /* @__PURE__ */ new Map(), n = [];
  for (const s of e)
    t.set(s.id, { ...s, replies: [] });
  for (const s of e) {
    const r = t.get(s.id);
    s.parentCommentId && t.has(s.parentCommentId) ? t.get(s.parentCommentId).replies.push(r) : n.push(r);
  }
  return n;
}
function Nt(e) {
  const [t, n] = E([]), [s, r] = E(
    {}
  );
  U(() => {
    if (!e) {
      n([]), r({});
      return;
    }
    const i = e.getArray("sections");
    let o = null;
    const u = () => {
      o && clearTimeout(o), o = setTimeout(() => {
        const a = Et(i);
        n(a);
        const m = {};
        for (let b = 0; b < i.length; b++) {
          const $ = i.get(b), D = $.get("id"), M = $.get("comments");
          if (M instanceof N.Array) {
            const O = Ut(
              M
            );
            m[D] = Ot(O);
          }
        }
        r(m);
      }, 16);
    };
    return i.observeDeep(u), u(), () => {
      o && clearTimeout(o), i.unobserveDeep(u);
    };
  }, [e]);
  const c = A(
    (i) => {
      if (!e) return null;
      const o = e.getArray("sections");
      for (let u = 0; u < o.length; u++) {
        const a = o.get(u);
        if (a.get("id") === i)
          return { ySection: a, index: u };
      }
      return null;
    },
    [e]
  ), l = A(
    (i, o) => {
      const u = c(i);
      if (!u) return null;
      const a = u.ySection.get("items");
      if (!(a instanceof N.Array)) return null;
      for (let m = 0; m < a.length; m++) {
        const b = a.get(m);
        if (b.get("id") === o) return b;
      }
      return null;
    },
    [c]
  ), d = A(
    (i) => {
      if (!e) return null;
      const o = c(i);
      if (!o) return null;
      let u = o.ySection.get("comments");
      return u instanceof N.Array || (u = new N.Array(), o.ySection.set("comments", u)), u;
    },
    [e, c]
  ), p = A(
    (i) => {
      if (!e) return;
      const o = e.getArray("sections");
      e.transact(() => {
        const u = new N.Map(), { items: a, ...m } = i;
        ee(u, m);
        const b = new N.Array();
        for (const $ of a) {
          const D = new N.Map();
          ee(D, $), b.push([D]);
        }
        u.set("items", b), o.push([u]);
      });
    },
    [e]
  ), w = A(
    (i, o) => {
      if (!e) return;
      const u = c(i);
      u && e.transact(() => {
        const { items: a, ...m } = o;
        for (const [b, $] of Object.entries(m))
          u.ySection.set(b, $);
      });
    },
    [e, c]
  ), v = A(
    (i) => {
      if (!e) return;
      const o = c(i);
      if (!o) return;
      const u = e.getArray("sections");
      e.transact(() => {
        u.delete(o.index, 1);
      });
    },
    [e, c]
  ), k = A(
    (i, o) => {
      if (!e) return;
      const u = c(i);
      u && e.transact(() => {
        let a = u.ySection.get("items");
        a instanceof N.Array || (a = new N.Array(), u.ySection.set("items", a));
        const m = new N.Map();
        ee(m, o), a.push([m]);
      });
    },
    [e, c]
  ), g = A(
    (i, o, u) => {
      if (!e) return;
      const a = l(i, o);
      a && e.transact(() => {
        for (const [m, b] of Object.entries(u))
          a.set(m, b);
      });
    },
    [e, l]
  ), h = A(
    (i, o) => {
      if (!e) return;
      const u = c(i);
      if (!u) return;
      const a = u.ySection.get("items");
      if (a instanceof N.Array) {
        for (let m = 0; m < a.length; m++)
          if (a.get(m).get("id") === o) {
            e.transact(() => {
              a.delete(m, 1);
            });
            return;
          }
      }
    },
    [e, c]
  ), C = A(
    (i, o, u) => {
      g(i, o, {
        status: "acked",
        ackedBy: u,
        ackedAt: (/* @__PURE__ */ new Date()).toISOString()
      });
    },
    [g]
  ), T = A(
    (i, o, u) => {
      g(i, o, {
        status: "rejected",
        ackedBy: u,
        ackedAt: (/* @__PURE__ */ new Date()).toISOString()
      });
    },
    [g]
  ), I = A(
    (i) => {
      const o = c(i);
      if (!o) return null;
      const u = o.ySection.get("content");
      return u instanceof N.XmlFragment ? u : (queueMicrotask(() => {
        !e || o.ySection.get("content") instanceof N.XmlFragment || e.transact(() => {
          o.ySection.set("content", new N.XmlFragment());
        });
      }), null);
    },
    [e, c]
  ), S = A(
    (i, o) => {
      e && e.transact(() => {
        const u = d(i);
        if (!u) return;
        const a = new N.Map();
        a.set("id", crypto.randomUUID()), a.set("text", o.text), a.set("userId", o.userId), a.set("displayName", o.displayName), a.set("color", o.color), a.set("timestamp", (/* @__PURE__ */ new Date()).toISOString()), a.set("parentCommentId", o.parentCommentId ?? null), u.push([a]);
      });
    },
    [e, d]
  ), y = A(
    (i, o, u) => {
      if (!e) return;
      const a = d(i);
      if (!a) return;
      let m = !1;
      e.transact(() => {
        for (let b = 0; b < a.length; b++) {
          const $ = a.get(b);
          if ($.get("id") === o) {
            $.set("resolved", !0), $.set("resolvedBy", u), $.set("resolvedAt", (/* @__PURE__ */ new Date()).toISOString()), m = !0;
            break;
          }
        }
      }), m || console.warn(
        `resolveThread: comment ${o} not found in section ${i}`
      );
    },
    [e, d]
  ), f = A(
    (i, o) => {
      if (!e) return;
      const u = d(i);
      if (!u) return;
      let a = !1;
      e.transact(() => {
        for (let m = 0; m < u.length; m++) {
          const b = u.get(m);
          if (b.get("id") === o) {
            b.set("resolved", !1), b.delete("resolvedBy"), b.delete("resolvedAt"), a = !0;
            break;
          }
        }
      }), a || console.warn(
        `unresolveThread: comment ${o} not found in section ${i}`
      );
    },
    [e, d]
  );
  return {
    sections: t,
    comments: s,
    addSection: p,
    updateSection: w,
    removeSection: v,
    addItem: k,
    updateItem: g,
    removeItem: h,
    ackItem: C,
    rejectItem: T,
    getSectionFragment: I,
    addComment: S,
    resolveThread: y,
    unresolveThread: f
  };
}
function ae(e) {
  const t = {};
  return e.forEach((n, s) => {
    t[s] = n;
  }), t;
}
function _t(e) {
  const t = [];
  return e.forEach((n) => {
    t.push(ae(n));
  }), t;
}
function xt(e) {
  const t = [];
  return e.forEach((n) => {
    const s = ae(n), r = n.get("items");
    r instanceof N.Array ? s.items = _t(r) : s.items = [], t.push(s);
  }), t;
}
function Lt(e) {
  return { exportJSON: A(() => {
    if (!e) return null;
    const n = e.getMap("meta");
    if (n.size === 0) return null;
    const s = e.getArray("sections");
    return {
      meta: ae(n),
      sections: xt(s)
    };
  }, [e]) };
}
function jt(e) {
  const t = {};
  return e.forEach((n, s) => {
    t[s] = n;
  }), t;
}
function Ht(e) {
  const { documentId: t, mode: n, ws: s, userId: r, displayName: c, color: l, onMessage: d } = e, { ydoc: p, provider: w, synced: v } = Ct({
    documentId: t,
    ws: s,
    onMessage: d
  }), { meta: k, updateMeta: g } = Mt(p), h = Nt(p), { awareness: C, participants: T } = Me(w, {
    userId: r,
    displayName: c,
    color: l,
    mode: n
  }), { exportJSON: I } = Lt(p), [S, y] = E({});
  U(() => {
    if (!p) {
      y({});
      return;
    }
    const o = p.getMap("sectionReviews"), u = () => {
      const a = {};
      o.forEach((m, b) => {
        if (!(m instanceof N.Map)) return;
        const $ = jt(m), D = b.split(":")[0];
        a[D] || (a[D] = []), a[D].push($);
      }), y(a);
    };
    return o.observeDeep(u), u(), () => {
      o.unobserveDeep(u);
    };
  }, [p]);
  const f = A(
    (o, u, a) => {
      if (!p) return;
      const m = p.getMap("sectionReviews"), b = `${o}:${r}`;
      p.transact(() => {
        const $ = new N.Map();
        $.set("userId", r), $.set("displayName", c), $.set("status", u), $.set("timestamp", (/* @__PURE__ */ new Date()).toISOString()), a && $.set("comment", a), m.set(b, $);
      });
    },
    [p, r, c]
  ), i = A((o) => {
    console.warn("loadFromMarkdown is not yet implemented");
  }, []);
  return {
    meta: k,
    sections: h.sections,
    synced: v,
    updateMeta: g,
    addSection: h.addSection,
    updateSection: h.updateSection,
    removeSection: h.removeSection,
    addItem: h.addItem,
    updateItem: h.updateItem,
    removeItem: h.removeItem,
    ackItem: h.ackItem,
    rejectItem: h.rejectItem,
    getSectionFragment: h.getSectionFragment,
    ydoc: p,
    provider: w,
    loadFromMarkdown: i,
    exportJSON: I,
    participants: T,
    comments: h.comments,
    addComment: h.addComment,
    resolveThread: h.resolveThread,
    unresolveThread: h.unresolveThread,
    sectionReviews: S,
    reviewSection: f,
    awareness: C
  };
}
const Rt = "", x = Rt;
function Bt(e) {
  const t = /* @__PURE__ */ new Map(), n = [];
  for (const s of e)
    t.set(s.id, { ...s, replies: [] });
  for (const s of e) {
    const r = t.get(s.id);
    s.parentCommentId && t.has(s.parentCommentId) ? t.get(s.parentCommentId).replies.push(r) : n.push(r);
  }
  return n;
}
function te(e) {
  return {
    ...e,
    id: e.id ?? e.commentId ?? ""
  };
}
function Pt(e) {
  const t = /* @__PURE__ */ new Map();
  for (const s of e) {
    const r = s.sectionId ?? "__unknown";
    t.has(r) || t.set(r, []), t.get(r).push(s);
  }
  const n = {};
  for (const [s, r] of t)
    n[s] = Bt(r);
  return n;
}
function qt(e) {
  const { documentId: t, idToken: n, sendMessage: s, onMessage: r } = e, [c, l] = E([]), [d, p] = E(!1), w = _(s);
  U(() => {
    w.current = s;
  }, [s]);
  const v = _(t);
  U(() => {
    v.current = t;
  }, [t]);
  const k = F(() => {
    const I = { "Content-Type": "application/json" };
    return n && (I.Authorization = `Bearer ${n}`), I;
  }, [n]);
  U(() => {
    !t || !n || (p(!0), fetch(`${x}/api/documents/${t}/comments`, {
      headers: { Authorization: `Bearer ${n}` }
    }).then(async (I) => {
      if (!I.ok) throw new Error(`Failed to load comments (${I.status})`);
      return I.json();
    }).then((I) => {
      l((I.comments ?? []).map((S) => te(S)));
    }).catch((I) => {
      console.warn("[useDocumentComments] fetch error:", I.message);
    }).finally(() => {
      p(!1);
    }));
  }, [t, n]), U(() => r((S) => {
    const y = S.type, f = S.payload;
    if (!f) return;
    const i = f.documentId;
    if (!(i && i !== v.current)) {
      if (y === "doc:comment_added") {
        const o = f.comment;
        if (!o) return;
        const u = te(o);
        l((a) => a.some((m) => m.id === u.id) ? a : [...a, u]);
        return;
      }
      if (y === "doc:comment_resolved") {
        const o = f.commentId, u = f.resolved;
        if (!o) return;
        l(
          (a) => a.map(
            (m) => m.id === o ? {
              ...m,
              resolved: u,
              ...u ? {
                resolvedBy: f.resolvedBy,
                resolvedAt: f.resolvedAt
              } : { resolvedBy: void 0, resolvedAt: void 0 }
            } : m
          )
        );
        return;
      }
      if (y === "doc:comment_deleted") {
        const o = f.commentId;
        if (!o) return;
        l((u) => u.filter((a) => a.id !== o));
        return;
      }
    }
  }), [r]);
  const g = F(
    () => Pt(c),
    [c]
  ), h = A(
    async (I, S, y) => {
      if (!n) return;
      const f = await fetch(
        `${x}/api/documents/${v.current}/comments`,
        {
          method: "POST",
          headers: k,
          body: JSON.stringify({
            sectionId: I,
            text: S,
            ...y ? { parentCommentId: y } : {}
          })
        }
      );
      if (!f.ok)
        throw new Error(`Failed to add comment (${f.status})`);
      const i = await f.json(), o = te(i.comment);
      l((u) => u.some((a) => a.id === o.id) ? u : [...u, o]);
    },
    [n, k]
  ), C = A(
    async (I, S) => {
      if (!n) return;
      const y = await fetch(
        `${x}/api/documents/${v.current}/comments/${S}`,
        {
          method: "PATCH",
          headers: k,
          body: JSON.stringify({ resolved: !0 })
        }
      );
      if (!y.ok)
        throw new Error(`Failed to resolve thread (${y.status})`);
      const f = await y.json();
      l(
        (i) => i.map(
          (o) => o.id === S ? {
            ...o,
            resolved: !0,
            resolvedBy: f.comment.resolvedBy,
            resolvedAt: f.comment.resolvedAt
          } : o
        )
      );
    },
    [n, k]
  ), T = A(
    async (I, S) => {
      if (!n) return;
      const y = await fetch(
        `${x}/api/documents/${v.current}/comments/${S}`,
        {
          method: "PATCH",
          headers: k,
          body: JSON.stringify({ resolved: !1 })
        }
      );
      if (!y.ok)
        throw new Error(`Failed to unresolve thread (${y.status})`);
      l(
        (f) => f.map(
          (i) => i.id === S ? { ...i, resolved: !1, resolvedBy: void 0, resolvedAt: void 0 } : i
        )
      );
    },
    [n, k]
  );
  return { comments: g, addComment: h, resolveThread: C, unresolveThread: T, loading: d };
}
function z(e) {
  const t = {
    open: "pending",
    pending: "pending",
    acked: "acked",
    done: "done",
    rejected: "rejected"
  };
  return {
    id: e.id ?? e.itemId,
    text: e.text ?? "",
    status: t[e.status ?? "open"] ?? "pending",
    assignee: e.assignee ?? "",
    ackedBy: e.ackedBy ?? "",
    ackedAt: e.ackedAt ?? "",
    priority: e.priority ?? "medium",
    notes: e.notes ?? "",
    dueDate: e.dueDate,
    category: e.category
  };
}
function Gt(e) {
  const { documentId: t, sectionIds: n, idToken: s, sendMessage: r, onMessage: c } = e, [l, d] = E({}), [p, w] = E(!1), v = _(r);
  U(() => {
    v.current = r;
  }, [r]);
  const k = _(t);
  U(() => {
    k.current = t;
  }, [t]);
  const g = F(() => {
    const y = { "Content-Type": "application/json" };
    return s && (y.Authorization = `Bearer ${s}`), y;
  }, [s]), h = n.join(",");
  U(() => {
    if (!t || !s || n.length === 0) return;
    w(!0);
    const y = n.map(async (f) => {
      try {
        const i = await fetch(
          `${x}/api/documents/${t}/sections/${f}/items`,
          { headers: { Authorization: `Bearer ${s}` } }
        );
        if (!i.ok) throw new Error(`Failed to load items for section ${f} (${i.status})`);
        const o = await i.json();
        return { sectionId: f, items: (o.items ?? []).map(z) };
      } catch (i) {
        return console.warn(`[useDocumentItems] fetch error for section ${f}:`, i.message), { sectionId: f, items: [] };
      }
    });
    Promise.all(y).then((f) => {
      const i = {};
      for (const { sectionId: o, items: u } of f)
        i[o] = u;
      d(i);
    }).finally(() => {
      w(!1);
    });
  }, [t, s, h]), U(() => c((f) => {
    const i = f.type, o = f.payload;
    if (!o) return;
    const u = o.documentId;
    if (!(u && u !== k.current)) {
      if (i === "social:post" && o.type === "section:item:created") {
        const a = o.sectionId, m = o.item;
        if (!a || !m) return;
        const b = z(m);
        d(($) => {
          const D = $[a] ?? [];
          return D.some((M) => M.id === b.id) ? $ : { ...$, [a]: [...D, b] };
        });
        return;
      }
      if (i === "social:post" && o.type === "section:item:updated") {
        const a = o.sectionId, m = o.itemId, b = o.updates;
        if (!a || !m || !b) return;
        d(($) => {
          const D = $[a];
          return D ? {
            ...$,
            [a]: D.map(
              (M) => M.id === m ? { ...M, ...b } : M
            )
          } : $;
        });
        return;
      }
      if (i === "social:post" && o.type === "section:item:deleted") {
        const a = o.sectionId, m = o.itemId;
        if (!a || !m) return;
        d((b) => {
          const $ = b[a];
          return $ ? {
            ...b,
            [a]: $.filter((D) => D.id !== m)
          } : b;
        });
        return;
      }
      if (i === "social:post" && o.type === "section:item:acked") {
        const a = o.sectionId, m = o.itemId, b = o.ackedBy;
        if (!a || !m) return;
        d(($) => {
          const D = $[a];
          return D ? {
            ...$,
            [a]: D.map(
              (M) => M.id === m ? { ...M, status: "acked", ackedBy: b ?? M.ackedBy, ackedAt: (/* @__PURE__ */ new Date()).toISOString() } : M
            )
          } : $;
        });
        return;
      }
    }
  }), [c]);
  const C = A(
    async (y, f) => {
      if (!s) return;
      const i = await fetch(
        `${x}/api/documents/${k.current}/sections/${y}/items`,
        {
          method: "POST",
          headers: g,
          body: JSON.stringify(f)
        }
      );
      if (!i.ok)
        throw new Error(`Failed to add item (${i.status})`);
      const o = await i.json(), u = z(o.item);
      d((a) => {
        const m = a[y] ?? [];
        return m.some((b) => b.id === u.id) ? a : { ...a, [y]: [...m, u] };
      });
    },
    [s, g]
  ), T = A(
    async (y, f, i) => {
      if (!s) return;
      const o = await fetch(
        `${x}/api/documents/${k.current}/sections/${y}/items/${f}`,
        {
          method: "PATCH",
          headers: g,
          body: JSON.stringify(i)
        }
      );
      if (!o.ok)
        throw new Error(`Failed to update item (${o.status})`);
      const u = await o.json(), a = z(u.item);
      d((m) => {
        const b = m[y];
        return b ? {
          ...m,
          [y]: b.map(($) => $.id === f ? a : $)
        } : m;
      });
    },
    [s, g]
  ), I = A(
    async (y, f) => {
      if (!s) return;
      const i = await fetch(
        `${x}/api/documents/${k.current}/sections/${y}/items/${f}`,
        {
          method: "DELETE",
          headers: g
        }
      );
      if (!i.ok)
        throw new Error(`Failed to remove item (${i.status})`);
      d((o) => {
        const u = o[y];
        return u ? {
          ...o,
          [y]: u.filter((a) => a.id !== f)
        } : o;
      });
    },
    [s, g]
  ), S = A(
    async (y, f) => {
      if (!s) return;
      const i = await fetch(
        `${x}/api/documents/${k.current}/sections/${y}/items/${f}/ack`,
        {
          method: "POST",
          headers: g
        }
      );
      if (!i.ok)
        throw new Error(`Failed to acknowledge item (${i.status})`);
      const o = await i.json(), u = z(o.item);
      d((a) => {
        const m = a[y];
        return m ? {
          ...a,
          [y]: m.map((b) => b.id === f ? u : b)
        } : a;
      });
    },
    [s, g]
  );
  return { items: l, addItem: C, updateItem: T, removeItem: I, ackItem: S, loading: p };
}
function Ft(e) {
  const t = {};
  for (const n of e) {
    const s = n.sectionId ?? "__unknown";
    t[s] || (t[s] = []);
    const { sectionId: r, ...c } = n;
    t[s].push(c);
  }
  return t;
}
function Xt(e) {
  const { documentId: t, idToken: n, sendMessage: s, onMessage: r } = e, [c, l] = E({}), [d, p] = E(!1), w = _(s);
  U(() => {
    w.current = s;
  }, [s]);
  const v = _(t);
  U(() => {
    v.current = t;
  }, [t]);
  const k = F(() => {
    const h = { "Content-Type": "application/json" };
    return n && (h.Authorization = `Bearer ${n}`), h;
  }, [n]);
  U(() => {
    !t || !n || (p(!0), fetch(`${x}/api/documents/${t}/reviews`, {
      headers: { Authorization: `Bearer ${n}` }
    }).then(async (h) => {
      if (!h.ok) throw new Error(`Failed to load reviews (${h.status})`);
      return h.json();
    }).then((h) => {
      l(Ft(h.reviews ?? []));
    }).catch((h) => {
      console.warn("[useDocumentReviews] fetch error:", h.message);
    }).finally(() => {
      p(!1);
    }));
  }, [t, n]), U(() => r((C) => {
    const T = C.type, I = C.payload;
    if (!I) return;
    const S = I.documentId;
    if (!(S && S !== v.current) && T === "social:post" && I.type === "section:review") {
      const y = I.sectionId, f = I.review;
      if (!y || !f) return;
      l((i) => {
        const o = i[y] ?? [], u = o.findIndex((m) => m.userId === f.userId), a = [...o];
        return u >= 0 ? a[u] = f : a.push(f), { ...i, [y]: a };
      });
      return;
    }
  }), [r]);
  const g = A(
    async (h, C, T) => {
      if (!n) return;
      const I = await fetch(
        `${x}/api/documents/${v.current}/sections/${h}/reviews`,
        {
          method: "POST",
          headers: k,
          body: JSON.stringify({
            status: C,
            ...T !== void 0 ? { comment: T } : {}
          })
        }
      );
      if (!I.ok)
        throw new Error(`Failed to submit review (${I.status})`);
      const S = await I.json();
      l((y) => {
        const f = y[h] ?? [], i = f.findIndex((u) => u.userId === S.review.userId), o = [...f];
        return i >= 0 ? o[i] = S.review : o.push(S.review), { ...y, [h]: o };
      });
    },
    [n, k]
  );
  return { sectionReviews: c, reviewSection: g, loading: d };
}
const oe = [
  { userId: "alice", displayName: "Alice Chen", email: "alice.chen@local.dev", color: "#3b82f6" },
  { userId: "bob", displayName: "Bob Martinez", email: "bob.martinez@local.dev", color: "#ef4444" },
  { userId: "carol", displayName: "Carol Johnson", email: "carol.johnson@local.dev", color: "#8b5cf6" },
  { userId: "dave", displayName: "Dave Williams", email: "dave.williams@local.dev", color: "#f59e0b" },
  { userId: "eve", displayName: "Eve Thompson", email: "eve.thompson@local.dev", color: "#10b981" },
  { userId: "frank", displayName: "Frank Davis", email: "frank.davis@local.dev", color: "#ec4899" },
  { userId: "grace", displayName: "Grace Wilson", email: "grace.wilson@local.dev", color: "#6366f1" },
  { userId: "hank", displayName: "Hank Anderson", email: "hank.anderson@local.dev", color: "#14b8a6" }
], Vt = [
  {
    id: "grp-engineering",
    name: "Engineering",
    handle: "engineering",
    memberIds: ["alice", "bob", "dave", "frank"],
    color: "#3b82f6"
  },
  {
    id: "grp-design",
    name: "Design",
    handle: "design",
    memberIds: ["carol", "eve"],
    color: "#8b5cf6"
  },
  {
    id: "grp-reviewers",
    name: "Reviewers",
    handle: "reviewers",
    memberIds: ["alice", "carol", "grace"],
    color: "#f59e0b"
  },
  {
    id: "grp-everyone",
    name: "Everyone",
    handle: "everyone",
    memberIds: ["alice", "bob", "carol", "dave", "eve", "frank", "grace", "hank"],
    color: "#6b7280"
  }
];
function Yt(e) {
  const t = e.toLowerCase();
  return oe.filter(
    (n) => n.displayName.toLowerCase().includes(t) || n.email.toLowerCase().includes(t)
  );
}
function Kt(e) {
  return F(() => {
    const t = /* @__PURE__ */ new Set(), n = [];
    for (const s of e) {
      const r = s.userId || s.clientId;
      if (t.has(r)) continue;
      t.add(r);
      const c = oe.find(
        (l) => l.displayName.toLowerCase() === s.displayName.toLowerCase() || l.displayName.split(" ")[0].toLowerCase() === s.displayName.split(" ")[0].toLowerCase()
      );
      n.push({
        userId: s.userId || s.clientId,
        displayName: c?.displayName || s.displayName,
        color: c?.color || s.color,
        online: !0,
        mode: s.mode,
        type: "user"
      });
    }
    for (const s of oe)
      t.has(s.userId) || n.some((r) => r.displayName === s.displayName) || n.push({
        userId: s.userId,
        displayName: s.displayName,
        color: s.color,
        online: !1,
        type: "user"
      });
    for (const s of Vt)
      n.push({
        userId: s.id,
        displayName: s.name,
        color: s.color,
        online: !1,
        type: "group",
        memberCount: s.memberIds.length
      });
    return n;
  }, [e]);
}
function ke(e) {
  const t = [];
  for (const n of e)
    t.push(n), n.replies && n.replies.length > 0 && t.push(...ke(n.replies));
  return t;
}
function zt(e, t) {
  const n = t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`@${n}(?=\\s|$|[.!?,;:])`, "i").test(e);
}
function Wt({
  sections: e,
  comments: t,
  displayName: n,
  userId: s
}) {
  return F(() => {
    const r = [], c = [];
    for (const l of e) {
      const d = t[l.id];
      if (!d) continue;
      const p = ke(d);
      for (const w of p)
        w.userId !== s && zt(w.text, n) && r.push({
          kind: "mention",
          sectionId: l.id,
          sectionTitle: l.title,
          commentId: w.id,
          authorName: w.displayName,
          authorColor: w.color,
          commentText: w.text,
          timestamp: w.timestamp
        });
    }
    for (const l of e)
      for (const d of l.items) {
        const p = (d.assignee ?? "").toLowerCase();
        (p === n.toLowerCase() || p === s.toLowerCase()) && c.push({
          kind: "task",
          sectionId: l.id,
          sectionTitle: l.title,
          itemId: d.id,
          taskText: d.text,
          status: d.status,
          priority: d.priority
        });
      }
    return r.sort((l, d) => new Date(d.timestamp).getTime() - new Date(l.timestamp).getTime()), [...r, ...c];
  }, [e, t, n, s]);
}
function he(e) {
  const t = e.getArray("sections"), n = [];
  for (let s = 0; s < t.length; s++) {
    const r = t.get(s);
    if (!r || typeof r.get != "function") continue;
    const c = r.get("id") ?? "", l = r.get("type") ?? "tasks", d = r.get("title") ?? "", p = r.get("items"), w = [];
    if (p && typeof p.toArray == "function")
      for (const g of p.toArray()) {
        if (!g || typeof g.get != "function") continue;
        const h = g;
        w.push({
          id: h.get("id") ?? "",
          text: h.get("text") ?? "",
          status: h.get("status") ?? "pending",
          assignee: h.get("assignee") ?? "",
          priority: h.get("priority") ?? "medium"
        });
      }
    let v = "";
    const k = r.get("content");
    k && typeof k.toString == "function" && (v = k.toString().replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()), n.push({ id: c, type: l, title: d, textContent: v, items: w });
  }
  return n;
}
function Zt(e) {
  const { channel: t, sendMessage: n, onMessage: s } = e, [r, c] = E([]), [l, d] = E(!1), [p, w] = E(null), [v, k] = E(null), [g, h] = E(null), [C, T] = E(null), I = _(null), S = _(null), y = _(!1);
  U(() => s((O) => {
    if (O.type === "error" && O.service === "crdt") {
      d(!1);
      return;
    }
    if (O.type === "crdt" && O.channel === t)
      switch (O.action) {
        case "snapshotList": {
          const L = O.snapshots;
          c(L ?? []), d(!1);
          break;
        }
        case "snapshot": {
          if (!O.version) break;
          const L = O.update;
          if (!L) break;
          const R = new N.Doc({ gc: !1 }), X = K(L);
          N.applyUpdate(R, X), y.current ? (y.current = !1, S.current && S.current.destroy(), S.current = R, h(he(R))) : (I.current && I.current.destroy(), I.current = R, w(R));
          break;
        }
        case "versionSaved": {
          d(!0), n({
            service: "crdt",
            action: "listSnapshots",
            channel: t,
            limit: 20
          });
          break;
        }
        case "snapshotRestored": {
          d(!0), n({
            service: "crdt",
            action: "listSnapshots",
            channel: t,
            limit: 20
          });
          break;
        }
      }
  }), [t, s, n]), U(() => () => {
    I.current && (I.current.destroy(), I.current = null), S.current && (S.current.destroy(), S.current = null);
  }, []);
  const f = A(() => {
    d(!0), n({
      service: "crdt",
      action: "listSnapshots",
      channel: t,
      limit: 20
    });
  }, [t, n]), i = A((D) => {
    k(D), n({
      service: "crdt",
      action: "getSnapshotAtVersion",
      channel: t,
      timestamp: D
    });
  }, [t, n]), o = A((D) => {
    n({
      service: "crdt",
      action: "restoreSnapshot",
      channel: t,
      timestamp: D
    });
  }, [t, n]), u = A(() => {
    I.current && (I.current.destroy(), I.current = null), w(null), k(null);
  }, []), a = A((D) => {
    n({
      service: "crdt",
      action: "saveVersion",
      channel: t,
      name: D
    });
  }, [t, n]), m = A((D) => he(D), []), b = A((D) => {
    y.current = !0, T(D), n({
      service: "crdt",
      action: "getSnapshotAtVersion",
      channel: t,
      timestamp: D
    });
  }, [t, n]), $ = A(() => {
    S.current && (S.current.destroy(), S.current = null), h(null), T(null);
  }, []);
  return {
    versions: r,
    loading: l,
    fetchVersions: f,
    previewVersion: i,
    restoreVersion: o,
    previewDoc: p,
    previewTimestamp: v,
    clearPreview: u,
    saveVersion: a,
    extractSections: m,
    compareSections: g,
    compareTimestamp: C,
    compareVersion: b,
    clearCompare: $
  };
}
function Qt(e) {
  const { documentId: t, idToken: n, meta: s, updateMeta: r, sendMessage: c, displayName: l } = e, [d, p] = E("idle"), [w, v] = E(null), [k, g] = E(null), [h, C] = E(null), [T, I] = E(null), [S, y] = E(null), f = _(w);
  U(() => {
    f.current = w;
  }, [w]), U(() => {
    const M = () => {
      const O = f.current;
      O && navigator.sendBeacon(
        `${x}/api/video/sessions/${O}/end`,
        new Blob([JSON.stringify({ documentId: t })], { type: "application/json" })
      );
    };
    return window.addEventListener("beforeunload", M), () => window.removeEventListener("beforeunload", M);
  }, []);
  const o = !!(s?.activeCallSessionId || null) && !w, u = _(n);
  U(() => {
    u.current = n;
  }, [n]);
  const a = A(() => {
    const M = u.current, O = { "Content-Type": "application/json" };
    return M && (O.Authorization = `Bearer ${M}`), O;
  }, []), m = A(async (M) => {
    p("joining"), y(null);
    try {
      const O = await fetch(
        `${x}/api/video/sessions/${M}/join`,
        { method: "POST", headers: a(), body: JSON.stringify({ documentId: t, displayName: l }) }
      );
      if (!O.ok) {
        const R = await O.json().catch(() => ({ error: "Join failed" })), X = O.status;
        throw X === 404 || X === 410 ? (console.warn("[useVideoCall] Session", M, "no longer exists, clearing stale meta"), r({ activeCallSessionId: "" }), c({
          service: "crdt",
          action: "updateDocumentMeta",
          documentId: t,
          meta: { activeCallSessionId: "" }
        }), new Error("This call has ended. The page has been updated.")) : new Error(R.error);
      }
      const L = await O.json();
      v(M), g(L.token), C(L.participantId), I(L.userId), p("active");
    } catch (O) {
      y(O.message), p("error");
    }
  }, [t, l, a, r, c]), b = A(async () => {
    p("creating"), y(null);
    try {
      const M = await fetch(
        `${x}/api/video/sessions`,
        { method: "POST", headers: a(), body: JSON.stringify({ documentId: t, displayName: l }) }
      );
      if (!M.ok) {
        const R = await M.json().catch(() => ({ error: "Create failed" }));
        throw new Error(R.error);
      }
      const L = (await M.json()).sessionId;
      await m(L), r({ activeCallSessionId: L }), c({
        service: "crdt",
        action: "updateDocumentMeta",
        documentId: t,
        meta: { activeCallSessionId: L }
      });
    } catch (M) {
      y(M.message), p("error");
    }
  }, [t, l, a, r, c, m]), $ = A(async (M) => {
    await m(M);
  }, [m]), D = A(async () => {
    const M = f.current;
    M && fetch(`${x}/api/video/sessions/${M}/end`, {
      method: "POST",
      headers: a(),
      body: JSON.stringify({ documentId: t })
    }).catch((O) => {
      console.error("[useVideoCall] Failed to end session on server:", O);
    }), r({ activeCallSessionId: "" }), c({
      service: "crdt",
      action: "updateDocumentMeta",
      documentId: t,
      meta: { activeCallSessionId: "" }
    }), v(null), g(null), C(null), I(null), p("idle"), y(null);
  }, [t, a, r, c]);
  return {
    callState: d,
    sessionId: w,
    stageToken: k,
    participantId: h,
    userId: T,
    error: S,
    hasActiveCall: o,
    startCall: b,
    joinCall: $,
    endCall: D
  };
}
function en(e, t) {
  const [n, s] = E([]), [r, c] = E(!1), l = A(async () => {
    c(!0);
    try {
      const d = { "Content-Type": "application/json" };
      t && (d.Authorization = `Bearer ${t}`);
      const p = await fetch(
        `${x}/api/video/sessions/document/${e}`,
        { headers: d }
      );
      if (!p.ok) return;
      const w = await p.json();
      s(w.sessions);
    } catch {
    } finally {
      c(!1);
    }
  }, [e, t]);
  return { sessions: n, loading: r, fetchSessions: l };
}
export {
  oe as D,
  $e as a,
  Ht as b,
  qt as c,
  Lt as d,
  Gt as e,
  Mt as f,
  Xt as g,
  Ce as h,
  Kt as i,
  Wt as j,
  Nt as k,
  Zt as l,
  Qt as m,
  en as n,
  Ct as o,
  Yt as p,
  Me as u
};
