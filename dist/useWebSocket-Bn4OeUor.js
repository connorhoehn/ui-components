import { useState as E, useRef as N, useEffect as O, useCallback as C, useMemo as F } from "react";
import * as U from "yjs";
const B = () => /* @__PURE__ */ new Map(), Ce = (e, t, n) => {
  let s = e.get(t);
  return s === void 0 && e.set(t, s = n()), s;
}, Ae = () => /* @__PURE__ */ new Set(), Me = Array.from;
class ge {
  constructor() {
    this._observers = B();
  }
  /**
   * @param {N} name
   * @param {function} f
   */
  on(t, n) {
    Ce(this._observers, t, Ae).add(n);
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
    return Me((this._observers.get(t) || B()).values()).forEach((s) => s(...n));
  }
  destroy() {
    this._observers = B();
  }
}
const we = Math.floor, $e = (e, t) => e < t ? e : t, De = (e, t) => e > t ? e : t, Se = 128, K = 127, Ee = Number.MAX_SAFE_INTEGER, _e = String.fromCharCode, Oe = (e) => e.toLowerCase(), Ne = /^\s*/g, Ue = (e) => e.replace(Ne, ""), Re = /([A-Z])/g, ue = (e, t) => Ue(e.replace(Re, (n) => `${t}${Oe(n)}`)), Le = (e) => {
  const t = unescape(encodeURIComponent(e)), n = t.length, s = new Uint8Array(n);
  for (let r = 0; r < n; r++)
    s[r] = /** @type {number} */
    t.codePointAt(r);
  return s;
}, q = (
  /** @type {TextEncoder} */
  typeof TextEncoder < "u" ? new TextEncoder() : null
), xe = (e) => q.encode(e), je = q ? xe : Le;
let J = typeof TextDecoder > "u" ? null : new TextDecoder("utf-8", { fatal: !0, ignoreBOM: !0 });
J && J.decode(new Uint8Array()).length === 1 && (J = null);
class Be {
  constructor() {
    this.cpos = 0, this.cbuf = new Uint8Array(100), this.bufs = [];
  }
}
const Pe = () => new Be(), Fe = (e) => {
  let t = e.cpos;
  for (let n = 0; n < e.bufs.length; n++)
    t += e.bufs[n].length;
  return t;
}, Ve = (e) => {
  const t = new Uint8Array(Fe(e));
  let n = 0;
  for (let s = 0; s < e.bufs.length; s++) {
    const r = e.bufs[s];
    t.set(r, n), n += r.length;
  }
  return t.set(new Uint8Array(e.cbuf.buffer, 0, e.cpos), n), t;
}, Z = (e, t) => {
  const n = e.cbuf.length;
  e.cpos === n && (e.bufs.push(e.cbuf), e.cbuf = new Uint8Array(n * 2), e.cpos = 0), e.cbuf[e.cpos++] = t;
}, P = (e, t) => {
  for (; t > K; )
    Z(e, Se | K & t), t = we(t / 128);
  Z(e, K & t);
}, se = new Uint8Array(3e4), ze = se.length / 3, Je = (e, t) => {
  if (t.length < ze) {
    const n = q.encodeInto(t, se).written || 0;
    P(e, n);
    for (let s = 0; s < n; s++)
      Z(e, se[s]);
  } else
    Xe(e, je(t));
}, He = (e, t) => {
  const n = unescape(encodeURIComponent(t)), s = n.length;
  P(e, s);
  for (let r = 0; r < s; r++)
    Z(
      e,
      /** @type {number} */
      n.codePointAt(r)
    );
}, We = q && /** @type {any} */
q.encodeInto ? Je : He, qe = (e, t) => {
  const n = e.cbuf.length, s = e.cpos, r = $e(n - s, t.length), c = t.length - r;
  e.cbuf.set(t.subarray(0, r), s), e.cpos += r, c > 0 && (e.bufs.push(e.cbuf), e.cbuf = new Uint8Array(De(n * 2, c)), e.cbuf.set(t.subarray(r)), e.cpos = c);
}, Xe = (e, t) => {
  P(e, t.byteLength), qe(e, t);
}, Ie = (e) => new Error(e), Ge = Ie("Unexpected end of array"), Ke = Ie("Integer out of Range");
class Ye {
  /**
   * @param {Uint8Array<Buf>} uint8Array Binary data to decode
   */
  constructor(t) {
    this.arr = t, this.pos = 0;
  }
}
const Ze = (e) => new Ye(e), Qe = (e, t) => {
  const n = new Uint8Array(e.arr.buffer, e.pos + e.arr.byteOffset, t);
  return e.pos += t, n;
}, et = (e) => Qe(e, H(e)), le = (e) => e.arr[e.pos++], H = (e) => {
  let t = 0, n = 1;
  const s = e.arr.length;
  for (; e.pos < s; ) {
    const r = e.arr[e.pos++];
    if (t = t + (r & K) * n, n *= 128, r < Se)
      return t;
    if (t > Ee)
      throw Ke;
  }
  throw Ge;
}, tt = (e) => {
  let t = H(e);
  if (t === 0)
    return "";
  {
    let n = String.fromCodePoint(le(e));
    if (--t < 100)
      for (; t--; )
        n += String.fromCodePoint(le(e));
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
}, nt = (e) => (
  /** @type any */
  J.decode(et(e))
), st = J ? nt : tt, Q = Date.now, de = /* @__PURE__ */ Symbol("Equality"), rt = Object.keys, fe = (e) => rt(e).length, ot = (e, t) => Object.prototype.hasOwnProperty.call(e, t), W = (e, t) => {
  if (e === t)
    return !0;
  if (e == null || t == null || e.constructor !== t.constructor && (e.constructor || Object) !== (t.constructor || Object))
    return !1;
  if (e[de] != null)
    return e[de](t);
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
        if (!t.has(n) || !W(e.get(n), t.get(n)))
          return !1;
      break;
    }
    case void 0:
    case Object:
      if (fe(e) !== fe(t))
        return !1;
      for (const n in e)
        if (!ot(e, n) || !W(e[n], t[n]))
          return !1;
      break;
    case Array:
      if (e.length !== t.length)
        return !1;
      for (let n = 0; n < e.length; n++)
        if (!W(e[n], t[n]))
          return !1;
      break;
    default:
      return !1;
  }
  return !0;
}, ct = (e, t) => t.includes(e), ee = 3e4;
class it extends ge {
  /**
   * @param {Y.Doc} doc
   */
  constructor(t) {
    super(), this.doc = t, this.clientID = t.clientID, this.states = /* @__PURE__ */ new Map(), this.meta = /* @__PURE__ */ new Map(), this._checkInterval = /** @type {any} */
    setInterval(() => {
      const n = Q();
      this.getLocalState() !== null && ee / 2 <= n - /** @type {{lastUpdated:number}} */
      this.meta.get(this.clientID).lastUpdated && this.setLocalState(this.getLocalState());
      const s = [];
      this.meta.forEach((r, c) => {
        c !== this.clientID && ee <= n - r.lastUpdated && this.states.has(c) && s.push(c);
      }), s.length > 0 && at(this, s, "timeout");
    }, we(ee / 10)), t.on("destroy", () => {
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
      lastUpdated: Q()
    });
    const d = [], f = [], y = [], S = [];
    t === null ? S.push(n) : c == null ? t != null && d.push(n) : (f.push(n), W(c, t) || y.push(n)), (d.length > 0 || y.length > 0 || S.length > 0) && this.emit("change", [{ added: d, updated: y, removed: S }, "local"]), this.emit("update", [{ added: d, updated: f, removed: S }, "local"]);
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
const at = (e, t, n) => {
  const s = [];
  for (let r = 0; r < t.length; r++) {
    const c = t[r];
    if (e.states.has(c)) {
      if (e.states.delete(c), c === e.clientID) {
        const d = (
          /** @type {MetaClientState} */
          e.meta.get(c)
        );
        e.meta.set(c, {
          clock: d.clock + 1,
          lastUpdated: Q()
        });
      }
      s.push(c);
    }
  }
  s.length > 0 && (e.emit("change", [{ added: [], updated: [], removed: s }, n]), e.emit("update", [{ added: [], updated: [], removed: s }, n]));
}, ut = (e, t, n = e.states) => {
  const s = t.length, r = Pe();
  P(r, s);
  for (let c = 0; c < s; c++) {
    const d = t[c], f = n.get(d) || null, y = (
      /** @type {MetaClientState} */
      e.meta.get(d).clock
    );
    P(r, d), P(r, y), We(r, JSON.stringify(f));
  }
  return Ve(r);
}, lt = (e, t, n) => {
  const s = Ze(t), r = Q(), c = [], d = [], f = [], y = [], S = H(s);
  for (let b = 0; b < S; b++) {
    const M = H(s);
    let w = H(s);
    const l = JSON.parse(st(s)), T = e.meta.get(M), v = e.states.get(M), g = T === void 0 ? 0 : T.clock;
    (g < w || g === w && l === null && e.states.has(M)) && (l === null ? M === e.clientID && e.getLocalState() != null ? w++ : e.states.delete(M) : e.states.set(M, l), e.meta.set(M, {
      clock: w,
      lastUpdated: r
    }), T === void 0 && l !== null ? c.push(M) : T !== void 0 && l === null ? y.push(M) : l !== null && (W(l, v) || f.push(M), d.push(M)));
  }
  (c.length > 0 || f.length > 0 || y.length > 0) && e.emit("change", [{
    added: c,
    updated: f,
    removed: y
  }, n]), (c.length > 0 || d.length > 0 || y.length > 0) && e.emit("update", [{
    added: c,
    updated: d,
    removed: y
  }, n]);
}, me = (e) => e === void 0 ? null : e;
class dt {
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
let ve = new dt(), ft = !0;
try {
  typeof localStorage < "u" && localStorage && (ve = localStorage, ft = !1);
} catch {
}
const mt = ve, V = typeof process < "u" && process.release && /node|io\.js/.test(process.release.name) && Object.prototype.toString.call(typeof process < "u" ? process : 0) === "[object process]", be = typeof window < "u" && typeof document < "u" && !V;
let x;
const pt = () => {
  if (x === void 0)
    if (V) {
      x = B();
      const e = process.argv;
      let t = null;
      for (let n = 0; n < e.length; n++) {
        const s = e[n];
        s[0] === "-" ? (t !== null && x.set(t, ""), t = s) : t !== null && (x.set(t, s), t = null);
      }
      t !== null && x.set(t, "");
    } else typeof location == "object" ? (x = B(), (location.search || "?").slice(1).split("&").forEach((e) => {
      if (e.length !== 0) {
        const [t, n] = e.split("=");
        x.set(`--${ue(t, "-")}`, n), x.set(`-${ue(t, "-")}`, n);
      }
    })) : x = B();
  return x;
}, re = (e) => pt().has(e), oe = (e) => me(V ? process.env[e.toUpperCase().replaceAll("-", "_")] : mt.getItem(e)), ke = (e) => re("--" + e) || oe(e) !== null;
ke("production");
const ht = V && ct(process.env.FORCE_COLOR, ["true", "1", "2"]);
ht || !re("--no-colors") && // @todo deprecate --no-colors
!ke("no-color") && (!V || process.stdout.isTTY) && (!V || re("--color") || oe("COLORTERM") !== null || (oe("TERM") || "").includes("color"));
const yt = (e) => new Uint8Array(e), gt = (e, t, n) => new Uint8Array(e, t, n), wt = (e) => {
  let t = "";
  for (let n = 0; n < e.byteLength; n++)
    t += _e(e[n]);
  return btoa(t);
}, St = (e) => Buffer.from(e.buffer, e.byteOffset, e.byteLength).toString("base64"), It = (e) => {
  const t = atob(e), n = yt(t.length);
  for (let s = 0; s < t.length; s++)
    n[s] = t.charCodeAt(s);
  return n;
}, vt = (e) => {
  const t = Buffer.from(e, "base64");
  return gt(t.buffer, t.byteOffset, t.byteLength);
}, pe = be ? wt : St, Y = be ? It : vt;
class he extends ge {
  doc;
  channel;
  awareness;
  _sendMessage;
  _synced = !1;
  _awarenessTimer = null;
  _updateHandler;
  constructor(t, n, s) {
    super(), this.doc = t, this.channel = n, this._sendMessage = s, this.awareness = new it(t), this._updateHandler = (r, c) => {
      if (c === this) return;
      const d = pe(r);
      this._sendMessage({
        service: "crdt",
        action: "update",
        channel: this.channel,
        update: d
      });
    }, this.doc.on("update", this._updateHandler), this.awareness.on("update", ({ added: r, updated: c, removed: d }, f) => {
      f === this || !r.concat(c, d).includes(this.awareness.clientID) || (this._awarenessTimer && clearTimeout(this._awarenessTimer), this._awarenessTimer = setTimeout(() => {
        const S = ut(this.awareness, [this.awareness.clientID]), b = pe(S);
        this._sendMessage({
          service: "crdt",
          action: "awareness",
          channel: this.channel,
          update: b
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
    const n = Y(t);
    U.applyUpdate(this.doc, n, this);
  }
  /**
   * Apply the initial document snapshot from the server.
   * Functionally identical to applyRemoteUpdate but marks the provider as synced.
   */
  applySnapshot(t) {
    const n = Y(t);
    U.applyUpdate(this.doc, n, this), this._synced = !0, this.emit("synced", [!0]);
  }
  /**
   * Apply a remote awareness update received from the gateway.
   */
  applyAwarenessUpdate(t) {
    const n = Y(t);
    lt(this.awareness, n, this);
  }
  destroy() {
    this.doc.off("update", this._updateHandler), this._awarenessTimer && clearTimeout(this._awarenessTimer), this.awareness.destroy(), super.destroy();
  }
}
function bt(e) {
  const { documentId: t, ws: n, onMessage: s, onDocReplaced: r } = e, [c, d] = E(!1), [f, y] = E(0), S = N(null), b = N(null), M = N(r);
  M.current = r;
  const w = `doc:${t}`;
  return O(() => {
    const l = new U.Doc({ gc: !1 });
    S.current = l;
    const T = new he(l, w, n.sendMessage);
    b.current = T, y((m) => m + 1);
    const v = () => {
      n.sendMessage({ service: "crdt", action: "subscribe", channel: w });
    };
    v();
    const g = setTimeout(v, 500), k = setTimeout(v, 1500), p = () => d(!0);
    return T.on("synced", p), () => {
      clearTimeout(g), clearTimeout(k), n.sendMessage({ service: "crdt", action: "unsubscribe", channel: w });
      const m = b.current, i = S.current;
      m && (m.off("synced", p), m.destroy()), i && i.destroy(), S.current = null, b.current = null, d(!1);
    };
  }, [t]), O(() => s((T) => {
    T.type === "session" && n.sendMessage({ service: "crdt", action: "subscribe", channel: w });
  }), [t, n.sendMessage, s, w]), O(() => {
    const l = s((v) => {
      const g = b.current;
      if (g) {
        if (v.type === "crdt:doc-replaced") {
          if (v.channel !== w) return;
          const k = v.snapshot;
          if (!k) return;
          const p = S.current, m = b.current;
          m && (m.off("synced", T), m.destroy()), p && p.destroy();
          const i = new U.Doc({ gc: !1 });
          S.current = i;
          const o = new he(i, w, n.sendMessage);
          b.current = o, o.applySnapshot(k), o.on("synced", T), M.current?.(i, o), d(!0), y((u) => u + 1);
          return;
        }
        if (v.type === "crdt:snapshot") {
          if (v.channel !== w) return;
          const k = v.snapshot;
          k && g.applySnapshot(k);
          return;
        }
        if (v.type === "crdt:update") {
          if (v.channel !== w) return;
          const k = v.update;
          k && g.applyRemoteUpdate(k);
          return;
        }
        if (v.type === "crdt:awareness") {
          if (v.channel !== w) return;
          const k = v, p = k.updates;
          if (p && Array.isArray(p)) {
            for (const i of p)
              i.update && g.applyAwarenessUpdate(i.update);
            return;
          }
          const m = k.update;
          m && g.applyAwarenessUpdate(m);
          return;
        }
        if (v.type === "crdt") {
          if (v.channel !== w) return;
          switch (v.action) {
            case "snapshot":
              if (v.version) break;
              v.update && g.applySnapshot(v.update);
              break;
            case "update":
              v.update && g.applyRemoteUpdate(v.update);
              break;
            case "awareness":
              v.update && g.applyAwarenessUpdate(v.update);
              break;
          }
        }
      }
    });
    function T() {
      d(!0);
    }
    return l;
  }, [t, s]), {
    ydoc: S.current,
    provider: b.current,
    synced: c,
    docVersion: f
  };
}
function kt(e) {
  const t = {};
  return e.forEach((n, s) => {
    t[s] = n;
  }), t;
}
function Tt(e) {
  const [t, n] = E(null);
  O(() => {
    if (!e) {
      n(null);
      return;
    }
    const r = e.getMap("meta"), c = () => {
      r.size > 0 && n(kt(r));
    };
    return r.observe(c), c(), () => {
      r.unobserve(c);
    };
  }, [e]);
  const s = C(
    (r) => {
      if (!e) return;
      const c = e.getMap("meta");
      e.transact(() => {
        for (const [d, f] of Object.entries(r))
          c.set(d, f);
      });
    },
    [e]
  );
  return { meta: t, updateMeta: s };
}
function ie(e) {
  const t = {};
  return e.forEach((n, s) => {
    t[s] = n;
  }), t;
}
function Ct(e) {
  const t = [];
  return e.forEach((n) => {
    t.push(ie(n));
  }), t;
}
function At(e) {
  const t = [];
  return e.forEach((n) => {
    const s = ie(n), r = n.get("items");
    r instanceof U.Array ? s.items = Ct(r) : s.items = [], t.push(s);
  }), t;
}
function te(e, t) {
  for (const [n, s] of Object.entries(t))
    e.set(n, s);
}
function Mt(e) {
  const t = [];
  return e.forEach((n) => {
    t.push(ie(n));
  }), t;
}
function $t(e) {
  const t = /* @__PURE__ */ new Map(), n = [];
  for (const s of e)
    t.set(s.id, { ...s, replies: [] });
  for (const s of e) {
    const r = t.get(s.id);
    s.parentCommentId && t.has(s.parentCommentId) ? t.get(s.parentCommentId).replies.push(r) : n.push(r);
  }
  return n;
}
function Dt(e) {
  const [t, n] = E([]), [s, r] = E(
    {}
  );
  O(() => {
    if (!e) {
      n([]), r({});
      return;
    }
    const i = e.getArray("sections");
    let o = null;
    const u = () => {
      o && clearTimeout(o), o = setTimeout(() => {
        const a = At(i);
        n(a);
        const h = {};
        for (let I = 0; I < i.length; I++) {
          const A = i.get(I), D = A.get("id"), $ = A.get("comments");
          if ($ instanceof U.Array) {
            const _ = Mt(
              $
            );
            h[D] = $t(_);
          }
        }
        r(h);
      }, 16);
    };
    return i.observeDeep(u), u(), () => {
      o && clearTimeout(o), i.unobserveDeep(u);
    };
  }, [e]);
  const c = C(
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
  ), d = C(
    (i, o) => {
      const u = c(i);
      if (!u) return null;
      const a = u.ySection.get("items");
      if (!(a instanceof U.Array)) return null;
      for (let h = 0; h < a.length; h++) {
        const I = a.get(h);
        if (I.get("id") === o) return I;
      }
      return null;
    },
    [c]
  ), f = C(
    (i) => {
      if (!e) return null;
      const o = c(i);
      if (!o) return null;
      let u = o.ySection.get("comments");
      return u instanceof U.Array || (u = new U.Array(), o.ySection.set("comments", u)), u;
    },
    [e, c]
  ), y = C(
    (i) => {
      if (!e) return;
      const o = e.getArray("sections");
      e.transact(() => {
        const u = new U.Map(), { items: a, ...h } = i;
        te(u, h);
        const I = new U.Array();
        for (const A of a) {
          const D = new U.Map();
          te(D, A), I.push([D]);
        }
        u.set("items", I), o.push([u]);
      });
    },
    [e]
  ), S = C(
    (i, o) => {
      if (!e) return;
      const u = c(i);
      u && e.transact(() => {
        const { items: a, ...h } = o;
        for (const [I, A] of Object.entries(h))
          u.ySection.set(I, A);
      });
    },
    [e, c]
  ), b = C(
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
  ), M = C(
    (i, o) => {
      if (!e) return;
      const u = c(i);
      u && e.transact(() => {
        let a = u.ySection.get("items");
        a instanceof U.Array || (a = new U.Array(), u.ySection.set("items", a));
        const h = new U.Map();
        te(h, o), a.push([h]);
      });
    },
    [e, c]
  ), w = C(
    (i, o, u) => {
      if (!e) return;
      const a = d(i, o);
      a && e.transact(() => {
        for (const [h, I] of Object.entries(u))
          a.set(h, I);
      });
    },
    [e, d]
  ), l = C(
    (i, o) => {
      if (!e) return;
      const u = c(i);
      if (!u) return;
      const a = u.ySection.get("items");
      if (a instanceof U.Array) {
        for (let h = 0; h < a.length; h++)
          if (a.get(h).get("id") === o) {
            e.transact(() => {
              a.delete(h, 1);
            });
            return;
          }
      }
    },
    [e, c]
  ), T = C(
    (i, o, u) => {
      w(i, o, {
        status: "acked",
        ackedBy: u,
        ackedAt: (/* @__PURE__ */ new Date()).toISOString()
      });
    },
    [w]
  ), v = C(
    (i, o, u) => {
      w(i, o, {
        status: "rejected",
        ackedBy: u,
        ackedAt: (/* @__PURE__ */ new Date()).toISOString()
      });
    },
    [w]
  ), g = C(
    (i) => {
      const o = c(i);
      if (!o) return null;
      const u = o.ySection.get("content");
      return u instanceof U.XmlFragment ? u : (queueMicrotask(() => {
        !e || o.ySection.get("content") instanceof U.XmlFragment || e.transact(() => {
          o.ySection.set("content", new U.XmlFragment());
        });
      }), null);
    },
    [e, c]
  ), k = C(
    (i, o) => {
      e && e.transact(() => {
        const u = f(i);
        if (!u) return;
        const a = new U.Map();
        a.set("id", crypto.randomUUID()), a.set("text", o.text), a.set("userId", o.userId), a.set("displayName", o.displayName), a.set("color", o.color), a.set("timestamp", (/* @__PURE__ */ new Date()).toISOString()), a.set("parentCommentId", o.parentCommentId ?? null), u.push([a]);
      });
    },
    [e, f]
  ), p = C(
    (i, o, u) => {
      if (!e) return;
      const a = f(i);
      if (!a) return;
      let h = !1;
      e.transact(() => {
        for (let I = 0; I < a.length; I++) {
          const A = a.get(I);
          if (A.get("id") === o) {
            A.set("resolved", !0), A.set("resolvedBy", u), A.set("resolvedAt", (/* @__PURE__ */ new Date()).toISOString()), h = !0;
            break;
          }
        }
      }), h || console.warn(
        `resolveThread: comment ${o} not found in section ${i}`
      );
    },
    [e, f]
  ), m = C(
    (i, o) => {
      if (!e) return;
      const u = f(i);
      if (!u) return;
      let a = !1;
      e.transact(() => {
        for (let h = 0; h < u.length; h++) {
          const I = u.get(h);
          if (I.get("id") === o) {
            I.set("resolved", !1), I.delete("resolvedBy"), I.delete("resolvedAt"), a = !0;
            break;
          }
        }
      }), a || console.warn(
        `unresolveThread: comment ${o} not found in section ${i}`
      );
    },
    [e, f]
  );
  return {
    sections: t,
    comments: s,
    addSection: y,
    updateSection: S,
    removeSection: b,
    addItem: M,
    updateItem: w,
    removeItem: l,
    ackItem: T,
    rejectItem: v,
    getSectionFragment: g,
    addComment: k,
    resolveThread: p,
    unresolveThread: m
  };
}
const Et = 120 * 1e3, _t = 500;
function Ot(e = {}) {
  const { timeoutMs: t = Et } = e, [n, s] = E(!1), r = N(null), c = N(null), d = N(!1), f = C(() => {
    r.current !== null && clearTimeout(r.current), d.current && (d.current = !1, s(!1)), r.current = setTimeout(() => {
      d.current = !0, s(!0);
    }, t);
  }, [t]), y = C(() => {
    c.current === null && (c.current = setTimeout(() => {
      c.current = null;
    }, _t), f());
  }, [f]);
  return O(() => {
    const S = [
      "mousemove",
      "keydown",
      "click",
      "touchstart",
      "scroll"
    ];
    for (const b of S)
      window.addEventListener(b, y, { passive: !0 });
    return f(), () => {
      for (const b of S)
        window.removeEventListener(b, y);
      r.current !== null && clearTimeout(r.current), c.current !== null && clearTimeout(c.current);
    };
  }, [y, f]), { isIdle: n };
}
function Nt(e, t) {
  const n = N({
    ...t,
    name: t.displayName,
    lastSeen: Date.now(),
    idle: !1
  }), s = N(e);
  s.current = e;
  const r = C(() => {
    const b = s.current;
    b?.awareness && (n.current.lastSeen = Date.now(), b.awareness.setLocalStateField("user", { ...n.current }));
  }, []);
  O(() => {
    e?.awareness && (n.current = {
      ...n.current,
      ...t,
      name: t.displayName,
      lastSeen: Date.now()
    }, r());
  }, [e, t.userId, t.displayName, t.color, t.mode, r]);
  const { isIdle: c } = Ot();
  O(() => {
    n.current.idle = c, r();
  }, [c, r]);
  const d = C((b) => {
    n.current.currentSectionId = b, r();
  }, [r]), f = C((b) => {
    n.current.mode = b, r();
  }, [r]), y = C((b) => {
    n.current.idle = b, r();
  }, [r]), S = C((b, M) => {
    n.current.name = b, n.current.color = M, r();
  }, [r]);
  return { updateSection: d, updateMode: f, updateIdle: y, updateCursorInfo: S };
}
function Ut(e, t) {
  const [n, s] = E([]), r = Nt(e, {
    userId: t.userId,
    displayName: t.displayName,
    color: t.color,
    mode: t.mode,
    currentSectionId: null
  });
  return O(() => {
    if (!e) {
      s([]);
      return;
    }
    let c = "";
    const d = () => {
      const f = e.awareness.getStates(), y = [];
      f.forEach((w, l) => {
        if (l === e.awareness.clientID) return;
        const T = w.user;
        T && y.push({
          clientId: String(l),
          userId: T.userId ?? "",
          displayName: T.displayName ?? "Anonymous",
          color: T.color ?? "#3b82f6",
          mode: T.mode === "ack" ? "reviewer" : T.mode === "reader" ? "reader" : "editor",
          currentSectionId: T.currentSectionId ?? null,
          lastSeen: T.lastSeen ?? Date.now(),
          idle: T.idle ?? !1
        });
      });
      const S = /* @__PURE__ */ new Map();
      for (const w of y) {
        const l = w.userId || w.displayName || w.clientId, T = S.get(l);
        (!T || (w.lastSeen ?? 0) > (T.lastSeen ?? 0)) && S.set(l, w);
      }
      const b = Array.from(S.values()), M = b.map(
        (w) => `${w.clientId}:${w.currentSectionId}:${w.mode}:${w.idle}`
      ).join("|");
      M !== c && (c = M, queueMicrotask(() => s(b)));
    };
    return e.awareness.on("change", d), d(), () => {
      e.awareness.off("change", d);
    };
  }, [e]), { awareness: r, participants: n };
}
function ae(e) {
  const t = {};
  return e.forEach((n, s) => {
    t[s] = n;
  }), t;
}
function Rt(e) {
  const t = [];
  return e.forEach((n) => {
    t.push(ae(n));
  }), t;
}
function Lt(e) {
  const t = [];
  return e.forEach((n) => {
    const s = ae(n), r = n.get("items");
    r instanceof U.Array ? s.items = Rt(r) : s.items = [], t.push(s);
  }), t;
}
function xt(e) {
  return { exportJSON: C(() => {
    if (!e) return null;
    const n = e.getMap("meta");
    if (n.size === 0) return null;
    const s = e.getArray("sections");
    return {
      meta: ae(n),
      sections: Lt(s)
    };
  }, [e]) };
}
function jt(e) {
  const t = {};
  return e.forEach((n, s) => {
    t[s] = n;
  }), t;
}
function Gt(e) {
  const { documentId: t, mode: n, ws: s, userId: r, displayName: c, color: d, onMessage: f } = e, { ydoc: y, provider: S, synced: b } = bt({
    documentId: t,
    ws: s,
    onMessage: f
  }), { meta: M, updateMeta: w } = Tt(y), l = Dt(y), { awareness: T, participants: v } = Ut(S, {
    userId: r,
    displayName: c,
    color: d,
    mode: n
  }), { exportJSON: g } = xt(y), [k, p] = E({});
  O(() => {
    if (!y) {
      p({});
      return;
    }
    const o = y.getMap("sectionReviews"), u = () => {
      const a = {};
      o.forEach((h, I) => {
        if (!(h instanceof U.Map)) return;
        const A = jt(h), D = I.split(":")[0];
        a[D] || (a[D] = []), a[D].push(A);
      }), p(a);
    };
    return o.observeDeep(u), u(), () => {
      o.unobserveDeep(u);
    };
  }, [y]);
  const m = C(
    (o, u, a) => {
      if (!y) return;
      const h = y.getMap("sectionReviews"), I = `${o}:${r}`;
      y.transact(() => {
        const A = new U.Map();
        A.set("userId", r), A.set("displayName", c), A.set("status", u), A.set("timestamp", (/* @__PURE__ */ new Date()).toISOString()), a && A.set("comment", a), h.set(I, A);
      });
    },
    [y, r, c]
  ), i = C((o) => {
    console.warn("loadFromMarkdown is not yet implemented");
  }, []);
  return {
    meta: M,
    sections: l.sections,
    synced: b,
    updateMeta: w,
    addSection: l.addSection,
    updateSection: l.updateSection,
    removeSection: l.removeSection,
    addItem: l.addItem,
    updateItem: l.updateItem,
    removeItem: l.removeItem,
    ackItem: l.ackItem,
    rejectItem: l.rejectItem,
    getSectionFragment: l.getSectionFragment,
    ydoc: y,
    provider: S,
    loadFromMarkdown: i,
    exportJSON: g,
    participants: v,
    comments: l.comments,
    addComment: l.addComment,
    resolveThread: l.resolveThread,
    unresolveThread: l.unresolveThread,
    sectionReviews: k,
    reviewSection: m,
    awareness: T
  };
}
const Bt = "", R = Bt;
function Pt(e) {
  const t = /* @__PURE__ */ new Map(), n = [];
  for (const s of e)
    t.set(s.id, { ...s, replies: [] });
  for (const s of e) {
    const r = t.get(s.id);
    s.parentCommentId && t.has(s.parentCommentId) ? t.get(s.parentCommentId).replies.push(r) : n.push(r);
  }
  return n;
}
function ne(e) {
  return {
    ...e,
    id: e.id ?? e.commentId ?? ""
  };
}
function Ft(e) {
  const t = /* @__PURE__ */ new Map();
  for (const s of e) {
    const r = s.sectionId ?? "__unknown";
    t.has(r) || t.set(r, []), t.get(r).push(s);
  }
  const n = {};
  for (const [s, r] of t)
    n[s] = Pt(r);
  return n;
}
function Kt(e) {
  const { documentId: t, idToken: n, sendMessage: s, onMessage: r } = e, [c, d] = E([]), [f, y] = E(!1), S = N(s);
  O(() => {
    S.current = s;
  }, [s]);
  const b = N(t);
  O(() => {
    b.current = t;
  }, [t]);
  const M = F(() => {
    const g = { "Content-Type": "application/json" };
    return n && (g.Authorization = `Bearer ${n}`), g;
  }, [n]);
  O(() => {
    !t || !n || (y(!0), fetch(`${R}/api/documents/${t}/comments`, {
      headers: { Authorization: `Bearer ${n}` }
    }).then(async (g) => {
      if (!g.ok) throw new Error(`Failed to load comments (${g.status})`);
      return g.json();
    }).then((g) => {
      d((g.comments ?? []).map((k) => ne(k)));
    }).catch((g) => {
      console.warn("[useDocumentComments] fetch error:", g.message);
    }).finally(() => {
      y(!1);
    }));
  }, [t, n]), O(() => r((k) => {
    const p = k.type, m = k.payload;
    if (!m) return;
    const i = m.documentId;
    if (!(i && i !== b.current)) {
      if (p === "doc:comment_added") {
        const o = m.comment;
        if (!o) return;
        const u = ne(o);
        d((a) => a.some((h) => h.id === u.id) ? a : [...a, u]);
        return;
      }
      if (p === "doc:comment_resolved") {
        const o = m.commentId, u = m.resolved;
        if (!o) return;
        d(
          (a) => a.map(
            (h) => h.id === o ? {
              ...h,
              resolved: u,
              ...u ? {
                resolvedBy: m.resolvedBy,
                resolvedAt: m.resolvedAt
              } : { resolvedBy: void 0, resolvedAt: void 0 }
            } : h
          )
        );
        return;
      }
      if (p === "doc:comment_deleted") {
        const o = m.commentId;
        if (!o) return;
        d((u) => u.filter((a) => a.id !== o));
        return;
      }
    }
  }), [r]);
  const w = F(
    () => Ft(c),
    [c]
  ), l = C(
    async (g, k, p) => {
      if (!n) return;
      const m = await fetch(
        `${R}/api/documents/${b.current}/comments`,
        {
          method: "POST",
          headers: M,
          body: JSON.stringify({
            sectionId: g,
            text: k,
            ...p ? { parentCommentId: p } : {}
          })
        }
      );
      if (!m.ok)
        throw new Error(`Failed to add comment (${m.status})`);
      const i = await m.json(), o = ne(i.comment);
      d((u) => u.some((a) => a.id === o.id) ? u : [...u, o]);
    },
    [n, M]
  ), T = C(
    async (g, k) => {
      if (!n) return;
      const p = await fetch(
        `${R}/api/documents/${b.current}/comments/${k}`,
        {
          method: "PATCH",
          headers: M,
          body: JSON.stringify({ resolved: !0 })
        }
      );
      if (!p.ok)
        throw new Error(`Failed to resolve thread (${p.status})`);
      const m = await p.json();
      d(
        (i) => i.map(
          (o) => o.id === k ? {
            ...o,
            resolved: !0,
            resolvedBy: m.comment.resolvedBy,
            resolvedAt: m.comment.resolvedAt
          } : o
        )
      );
    },
    [n, M]
  ), v = C(
    async (g, k) => {
      if (!n) return;
      const p = await fetch(
        `${R}/api/documents/${b.current}/comments/${k}`,
        {
          method: "PATCH",
          headers: M,
          body: JSON.stringify({ resolved: !1 })
        }
      );
      if (!p.ok)
        throw new Error(`Failed to unresolve thread (${p.status})`);
      d(
        (m) => m.map(
          (i) => i.id === k ? { ...i, resolved: !1, resolvedBy: void 0, resolvedAt: void 0 } : i
        )
      );
    },
    [n, M]
  );
  return { comments: w, addComment: l, resolveThread: T, unresolveThread: v, loading: f };
}
function Vt(e) {
  const t = {};
  for (const n of e) {
    const s = n.sectionId ?? "__unknown";
    t[s] || (t[s] = []);
    const { sectionId: r, ...c } = n;
    t[s].push(c);
  }
  return t;
}
function Yt(e) {
  const { documentId: t, idToken: n, sendMessage: s, onMessage: r } = e, [c, d] = E({}), [f, y] = E(!1), S = N(s);
  O(() => {
    S.current = s;
  }, [s]);
  const b = N(t);
  O(() => {
    b.current = t;
  }, [t]);
  const M = F(() => {
    const l = { "Content-Type": "application/json" };
    return n && (l.Authorization = `Bearer ${n}`), l;
  }, [n]);
  O(() => {
    !t || !n || (y(!0), fetch(`${R}/api/documents/${t}/reviews`, {
      headers: { Authorization: `Bearer ${n}` }
    }).then(async (l) => {
      if (!l.ok) throw new Error(`Failed to load reviews (${l.status})`);
      return l.json();
    }).then((l) => {
      d(Vt(l.reviews ?? []));
    }).catch((l) => {
      console.warn("[useDocumentReviews] fetch error:", l.message);
    }).finally(() => {
      y(!1);
    }));
  }, [t, n]), O(() => r((T) => {
    const v = T.type, g = T.payload;
    if (!g) return;
    const k = g.documentId;
    if (!(k && k !== b.current) && v === "social:post" && g.type === "section:review") {
      const p = g.sectionId, m = g.review;
      if (!p || !m) return;
      d((i) => {
        const o = i[p] ?? [], u = o.findIndex((h) => h.userId === m.userId), a = [...o];
        return u >= 0 ? a[u] = m : a.push(m), { ...i, [p]: a };
      });
      return;
    }
  }), [r]);
  const w = C(
    async (l, T, v) => {
      if (!n) return;
      const g = await fetch(
        `${R}/api/documents/${b.current}/sections/${l}/reviews`,
        {
          method: "POST",
          headers: M,
          body: JSON.stringify({
            status: T,
            ...v !== void 0 ? { comment: v } : {}
          })
        }
      );
      if (!g.ok)
        throw new Error(`Failed to submit review (${g.status})`);
      const k = await g.json();
      d((p) => {
        const m = p[l] ?? [], i = m.findIndex((u) => u.userId === k.review.userId), o = [...m];
        return i >= 0 ? o[i] = k.review : o.push(k.review), { ...p, [l]: o };
      });
    },
    [n, M]
  );
  return { sectionReviews: c, reviewSection: w, loading: f };
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
function Zt(e) {
  const { documentId: t, sectionIds: n, idToken: s, sendMessage: r, onMessage: c } = e, [d, f] = E({}), [y, S] = E(!1), b = N(r);
  O(() => {
    b.current = r;
  }, [r]);
  const M = N(t);
  O(() => {
    M.current = t;
  }, [t]);
  const w = F(() => {
    const p = { "Content-Type": "application/json" };
    return s && (p.Authorization = `Bearer ${s}`), p;
  }, [s]), l = n.join(",");
  O(() => {
    if (!t || !s || n.length === 0) return;
    S(!0);
    const p = n.map(async (m) => {
      try {
        const i = await fetch(
          `${R}/api/documents/${t}/sections/${m}/items`,
          { headers: { Authorization: `Bearer ${s}` } }
        );
        if (!i.ok) throw new Error(`Failed to load items for section ${m} (${i.status})`);
        const o = await i.json();
        return { sectionId: m, items: (o.items ?? []).map(z) };
      } catch (i) {
        return console.warn(`[useDocumentItems] fetch error for section ${m}:`, i.message), { sectionId: m, items: [] };
      }
    });
    Promise.all(p).then((m) => {
      const i = {};
      for (const { sectionId: o, items: u } of m)
        i[o] = u;
      f(i);
    }).finally(() => {
      S(!1);
    });
  }, [t, s, l]), O(() => c((m) => {
    const i = m.type, o = m.payload;
    if (!o) return;
    const u = o.documentId;
    if (!(u && u !== M.current)) {
      if (i === "social:post" && o.type === "section:item:created") {
        const a = o.sectionId, h = o.item;
        if (!a || !h) return;
        const I = z(h);
        f((A) => {
          const D = A[a] ?? [];
          return D.some(($) => $.id === I.id) ? A : { ...A, [a]: [...D, I] };
        });
        return;
      }
      if (i === "social:post" && o.type === "section:item:updated") {
        const a = o.sectionId, h = o.itemId, I = o.updates;
        if (!a || !h || !I) return;
        f((A) => {
          const D = A[a];
          return D ? {
            ...A,
            [a]: D.map(
              ($) => $.id === h ? { ...$, ...I } : $
            )
          } : A;
        });
        return;
      }
      if (i === "social:post" && o.type === "section:item:deleted") {
        const a = o.sectionId, h = o.itemId;
        if (!a || !h) return;
        f((I) => {
          const A = I[a];
          return A ? {
            ...I,
            [a]: A.filter((D) => D.id !== h)
          } : I;
        });
        return;
      }
      if (i === "social:post" && o.type === "section:item:acked") {
        const a = o.sectionId, h = o.itemId, I = o.ackedBy;
        if (!a || !h) return;
        f((A) => {
          const D = A[a];
          return D ? {
            ...A,
            [a]: D.map(
              ($) => $.id === h ? { ...$, status: "acked", ackedBy: I ?? $.ackedBy, ackedAt: (/* @__PURE__ */ new Date()).toISOString() } : $
            )
          } : A;
        });
        return;
      }
    }
  }), [c]);
  const T = C(
    async (p, m) => {
      if (!s) return;
      const i = await fetch(
        `${R}/api/documents/${M.current}/sections/${p}/items`,
        {
          method: "POST",
          headers: w,
          body: JSON.stringify(m)
        }
      );
      if (!i.ok)
        throw new Error(`Failed to add item (${i.status})`);
      const o = await i.json(), u = z(o.item);
      f((a) => {
        const h = a[p] ?? [];
        return h.some((I) => I.id === u.id) ? a : { ...a, [p]: [...h, u] };
      });
    },
    [s, w]
  ), v = C(
    async (p, m, i) => {
      if (!s) return;
      const o = await fetch(
        `${R}/api/documents/${M.current}/sections/${p}/items/${m}`,
        {
          method: "PATCH",
          headers: w,
          body: JSON.stringify(i)
        }
      );
      if (!o.ok)
        throw new Error(`Failed to update item (${o.status})`);
      const u = await o.json(), a = z(u.item);
      f((h) => {
        const I = h[p];
        return I ? {
          ...h,
          [p]: I.map((A) => A.id === m ? a : A)
        } : h;
      });
    },
    [s, w]
  ), g = C(
    async (p, m) => {
      if (!s) return;
      const i = await fetch(
        `${R}/api/documents/${M.current}/sections/${p}/items/${m}`,
        {
          method: "DELETE",
          headers: w
        }
      );
      if (!i.ok)
        throw new Error(`Failed to remove item (${i.status})`);
      f((o) => {
        const u = o[p];
        return u ? {
          ...o,
          [p]: u.filter((a) => a.id !== m)
        } : o;
      });
    },
    [s, w]
  ), k = C(
    async (p, m) => {
      if (!s) return;
      const i = await fetch(
        `${R}/api/documents/${M.current}/sections/${p}/items/${m}/ack`,
        {
          method: "POST",
          headers: w
        }
      );
      if (!i.ok)
        throw new Error(`Failed to acknowledge item (${i.status})`);
      const o = await i.json(), u = z(o.item);
      f((a) => {
        const h = a[p];
        return h ? {
          ...a,
          [p]: h.map((I) => I.id === m ? u : I)
        } : a;
      });
    },
    [s, w]
  );
  return { items: d, addItem: T, updateItem: v, removeItem: g, ackItem: k, loading: y };
}
function ye(e) {
  const t = e.getArray("sections"), n = [];
  for (let s = 0; s < t.length; s++) {
    const r = t.get(s);
    if (!r || typeof r.get != "function") continue;
    const c = r.get("id") ?? "", d = r.get("type") ?? "tasks", f = r.get("title") ?? "", y = r.get("items"), S = [];
    if (y && typeof y.toArray == "function")
      for (const w of y.toArray()) {
        if (!w || typeof w.get != "function") continue;
        const l = w;
        S.push({
          id: l.get("id") ?? "",
          text: l.get("text") ?? "",
          status: l.get("status") ?? "pending",
          assignee: l.get("assignee") ?? "",
          priority: l.get("priority") ?? "medium"
        });
      }
    let b = "";
    const M = r.get("content");
    M && typeof M.toString == "function" && (b = M.toString().replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()), n.push({ id: c, type: d, title: f, textContent: b, items: S });
  }
  return n;
}
function Qt(e) {
  const { channel: t, sendMessage: n, onMessage: s } = e, [r, c] = E([]), [d, f] = E(!1), [y, S] = E(null), [b, M] = E(null), [w, l] = E(null), [T, v] = E(null), g = N(null), k = N(null), p = N(!1);
  O(() => s((_) => {
    if (_.type === "error" && _.service === "crdt") {
      f(!1);
      return;
    }
    if (_.type === "crdt" && _.channel === t)
      switch (_.action) {
        case "snapshotList": {
          const L = _.snapshots;
          c(L ?? []), f(!1);
          break;
        }
        case "snapshot": {
          if (!_.version) break;
          const L = _.update;
          if (!L) break;
          const j = new U.Doc({ gc: !1 }), X = Y(L);
          U.applyUpdate(j, X), p.current ? (p.current = !1, k.current && k.current.destroy(), k.current = j, l(ye(j))) : (g.current && g.current.destroy(), g.current = j, S(j));
          break;
        }
        case "versionSaved": {
          f(!0), n({
            service: "crdt",
            action: "listSnapshots",
            channel: t,
            limit: 20
          });
          break;
        }
        case "snapshotRestored": {
          f(!0), n({
            service: "crdt",
            action: "listSnapshots",
            channel: t,
            limit: 20
          });
          break;
        }
      }
  }), [t, s, n]), O(() => () => {
    g.current && (g.current.destroy(), g.current = null), k.current && (k.current.destroy(), k.current = null);
  }, []);
  const m = C(() => {
    f(!0), n({
      service: "crdt",
      action: "listSnapshots",
      channel: t,
      limit: 20
    });
  }, [t, n]), i = C((D) => {
    M(D), n({
      service: "crdt",
      action: "getSnapshotAtVersion",
      channel: t,
      timestamp: D
    });
  }, [t, n]), o = C((D) => {
    n({
      service: "crdt",
      action: "restoreSnapshot",
      channel: t,
      timestamp: D
    });
  }, [t, n]), u = C(() => {
    g.current && (g.current.destroy(), g.current = null), S(null), M(null);
  }, []), a = C((D) => {
    n({
      service: "crdt",
      action: "saveVersion",
      channel: t,
      name: D
    });
  }, [t, n]), h = C((D) => ye(D), []), I = C((D) => {
    p.current = !0, v(D), n({
      service: "crdt",
      action: "getSnapshotAtVersion",
      channel: t,
      timestamp: D
    });
  }, [t, n]), A = C(() => {
    k.current && (k.current.destroy(), k.current = null), l(null), v(null);
  }, []);
  return {
    versions: r,
    loading: d,
    fetchVersions: m,
    previewVersion: i,
    restoreVersion: o,
    previewDoc: y,
    previewTimestamp: b,
    clearPreview: u,
    saveVersion: a,
    extractSections: h,
    compareSections: w,
    compareTimestamp: T,
    compareVersion: I,
    clearCompare: A
  };
}
function Te(e) {
  const t = [];
  for (const n of e)
    t.push(n), n.replies && n.replies.length > 0 && t.push(...Te(n.replies));
  return t;
}
function zt(e, t) {
  const n = t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`@${n}(?=\\s|$|[.!?,;:])`, "i").test(e);
}
function en({
  sections: e,
  comments: t,
  displayName: n,
  userId: s
}) {
  return F(() => {
    const r = [], c = [];
    for (const d of e) {
      const f = t[d.id];
      if (!f) continue;
      const y = Te(f);
      for (const S of y)
        S.userId !== s && zt(S.text, n) && r.push({
          kind: "mention",
          sectionId: d.id,
          sectionTitle: d.title,
          commentId: S.id,
          authorName: S.displayName,
          authorColor: S.color,
          commentText: S.text,
          timestamp: S.timestamp
        });
    }
    for (const d of e)
      for (const f of d.items) {
        const y = (f.assignee ?? "").toLowerCase();
        (y === n.toLowerCase() || y === s.toLowerCase()) && c.push({
          kind: "task",
          sectionId: d.id,
          sectionTitle: d.title,
          itemId: f.id,
          taskText: f.text,
          status: f.status,
          priority: f.priority
        });
      }
    return r.sort((d, f) => new Date(f.timestamp).getTime() - new Date(d.timestamp).getTime()), [...r, ...c];
  }, [e, t, n, s]);
}
function tn(e, t) {
  const [n, s] = E([]), [r, c] = E(!1), d = C(async () => {
    c(!0);
    try {
      const f = { "Content-Type": "application/json" };
      t && (f.Authorization = `Bearer ${t}`);
      const y = await fetch(
        `${R}/api/video/sessions/document/${e}`,
        { headers: f }
      );
      if (!y.ok) return;
      const S = await y.json();
      s(S.sessions);
    } catch {
    } finally {
      c(!1);
    }
  }, [e, t]);
  return { sessions: n, loading: r, fetchSessions: d };
}
function nn(e) {
  const { documentId: t, idToken: n, meta: s, updateMeta: r, sendMessage: c, displayName: d } = e, [f, y] = E("idle"), [S, b] = E(null), [M, w] = E(null), [l, T] = E(null), [v, g] = E(null), [k, p] = E(null), m = N(S);
  O(() => {
    m.current = S;
  }, [S]), O(() => {
    const $ = () => {
      const _ = m.current;
      _ && navigator.sendBeacon(
        `${R}/api/video/sessions/${_}/end`,
        new Blob([JSON.stringify({ documentId: t })], { type: "application/json" })
      );
    };
    return window.addEventListener("beforeunload", $), () => window.removeEventListener("beforeunload", $);
  }, []);
  const o = !!(s?.activeCallSessionId || null) && !S, u = N(n);
  O(() => {
    u.current = n;
  }, [n]);
  const a = C(() => {
    const $ = u.current, _ = { "Content-Type": "application/json" };
    return $ && (_.Authorization = `Bearer ${$}`), _;
  }, []), h = C(async ($) => {
    y("joining"), p(null);
    try {
      const _ = await fetch(
        `${R}/api/video/sessions/${$}/join`,
        { method: "POST", headers: a(), body: JSON.stringify({ documentId: t, displayName: d }) }
      );
      if (!_.ok) {
        const j = await _.json().catch(() => ({ error: "Join failed" })), X = _.status;
        throw X === 404 || X === 410 ? (console.warn("[useVideoCall] Session", $, "no longer exists, clearing stale meta"), r({ activeCallSessionId: "" }), c({
          service: "crdt",
          action: "updateDocumentMeta",
          documentId: t,
          meta: { activeCallSessionId: "" }
        }), new Error("This call has ended. The page has been updated.")) : new Error(j.error);
      }
      const L = await _.json();
      b($), w(L.token), T(L.participantId), g(L.userId), y("active");
    } catch (_) {
      p(_.message), y("error");
    }
  }, [t, d, a, r, c]), I = C(async () => {
    y("creating"), p(null);
    try {
      const $ = await fetch(
        `${R}/api/video/sessions`,
        { method: "POST", headers: a(), body: JSON.stringify({ documentId: t, displayName: d }) }
      );
      if (!$.ok) {
        const j = await $.json().catch(() => ({ error: "Create failed" }));
        throw new Error(j.error);
      }
      const L = (await $.json()).sessionId;
      await h(L), r({ activeCallSessionId: L }), c({
        service: "crdt",
        action: "updateDocumentMeta",
        documentId: t,
        meta: { activeCallSessionId: L }
      });
    } catch ($) {
      p($.message), y("error");
    }
  }, [t, d, a, r, c, h]), A = C(async ($) => {
    await h($);
  }, [h]), D = C(async () => {
    const $ = m.current;
    $ && fetch(`${R}/api/video/sessions/${$}/end`, {
      method: "POST",
      headers: a(),
      body: JSON.stringify({ documentId: t })
    }).catch((_) => {
      console.error("[useVideoCall] Failed to end session on server:", _);
    }), r({ activeCallSessionId: "" }), c({
      service: "crdt",
      action: "updateDocumentMeta",
      documentId: t,
      meta: { activeCallSessionId: "" }
    }), b(null), w(null), T(null), g(null), y("idle"), p(null);
  }, [t, a, r, c]);
  return {
    callState: f,
    sessionId: S,
    stageToken: M,
    participantId: l,
    userId: v,
    error: k,
    hasActiveCall: o,
    startCall: I,
    joinCall: A,
    endCall: D
  };
}
const ce = [
  { userId: "alice", displayName: "Alice Chen", email: "alice.chen@local.dev", color: "#3b82f6" },
  { userId: "bob", displayName: "Bob Martinez", email: "bob.martinez@local.dev", color: "#ef4444" },
  { userId: "carol", displayName: "Carol Johnson", email: "carol.johnson@local.dev", color: "#8b5cf6" },
  { userId: "dave", displayName: "Dave Williams", email: "dave.williams@local.dev", color: "#f59e0b" },
  { userId: "eve", displayName: "Eve Thompson", email: "eve.thompson@local.dev", color: "#10b981" },
  { userId: "frank", displayName: "Frank Davis", email: "frank.davis@local.dev", color: "#ec4899" },
  { userId: "grace", displayName: "Grace Wilson", email: "grace.wilson@local.dev", color: "#6366f1" },
  { userId: "hank", displayName: "Hank Anderson", email: "hank.anderson@local.dev", color: "#14b8a6" }
], Jt = [
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
function sn(e) {
  const t = e.toLowerCase();
  return ce.filter(
    (n) => n.displayName.toLowerCase().includes(t) || n.email.toLowerCase().includes(t)
  );
}
function rn(e) {
  return F(() => {
    const t = /* @__PURE__ */ new Set(), n = [];
    for (const s of e) {
      const r = s.userId || s.clientId;
      if (t.has(r)) continue;
      t.add(r);
      const c = ce.find(
        (d) => d.displayName.toLowerCase() === s.displayName.toLowerCase() || d.displayName.split(" ")[0].toLowerCase() === s.displayName.split(" ")[0].toLowerCase()
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
    for (const s of ce)
      t.has(s.userId) || n.some((r) => r.displayName === s.displayName) || n.push({
        userId: s.userId,
        displayName: s.displayName,
        color: s.color,
        online: !1,
        type: "user"
      });
    for (const s of Jt)
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
const G = 5, Ht = 1e3;
function Wt(e, t) {
  const n = new URL(e.wsUrl);
  return t && n.searchParams.set("sessionToken", t), n.toString();
}
const qt = "bearer-token-v1";
function on(e) {
  const { config: t, onMessage: n } = e, [s, r] = E("idle"), [c, d] = E(null), [f, y] = E(
    () => sessionStorage.getItem("ws_session_token")
  ), [S, b] = E(
    () => sessionStorage.getItem("ws_client_id")
  ), [M, w] = E(t.defaultChannel), l = N(null), T = N(0), v = N(null), g = N(!1), k = N(n);
  O(() => {
    k.current = n;
  }, [n]);
  const p = N(
    sessionStorage.getItem("ws_session_token")
  );
  O(() => {
    p.current = f;
  }, [f]);
  const m = N(() => {
  }), i = C(() => {
    if (l.current && (l.current.readyState === WebSocket.OPEN || l.current.readyState === WebSocket.CONNECTING))
      return;
    r("connecting");
    const I = Wt(t, p.current), A = new WebSocket(I, [qt, t.cognitoToken]);
    l.current = A, A.onopen = () => {
      l.current === A && (T.current = 0, r("connected"));
    }, A.onmessage = (D) => {
      if (l.current !== A) return;
      let $;
      try {
        $ = JSON.parse(D.data);
      } catch {
        return;
      }
      if ($.type === "session") {
        const _ = $;
        y(_.sessionToken), b(_.clientId), p.current = _.sessionToken, sessionStorage.setItem("ws_session_token", _.sessionToken), sessionStorage.setItem("ws_client_id", _.clientId);
      }
      $.type === "error" && $.error && d($.error), k.current?.($);
    }, A.onclose = () => {
      if (l.current === A)
        if (T.current < G) {
          T.current === 0 ? console.warn("[useWebSocket] connection lost, retrying with backoff") : console.debug("[useWebSocket] reconnect attempt", T.current + 1, "of", G), r("reconnecting");
          const D = Ht * Math.pow(2, T.current);
          T.current += 1, v.current = setTimeout(() => {
            m.current();
          }, D);
        } else
          r("disconnected"), g.current || d({
            code: "RECONNECT_EXHAUSTED",
            message: `Lost connection to gateway after ${G} retries`,
            timestamp: (/* @__PURE__ */ new Date()).toISOString()
          });
    }, A.onerror = (D) => {
      if (l.current !== A) return;
      const $ = D;
      $.message && d({
        code: "CONNECTION_ERROR",
        message: $.message,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      });
    };
  }, [t]);
  O(() => {
    m.current = i;
  }, [i]), O(() => (i(), () => {
    v.current !== null && (clearTimeout(v.current), v.current = null), l.current?.close(), l.current = null;
  }), []);
  const o = C((I) => {
    w(I);
  }, []), u = C((I) => {
    l.current?.readyState === WebSocket.OPEN && l.current.send(JSON.stringify(I));
  }, []), a = C(() => {
    v.current !== null && (clearTimeout(v.current), v.current = null), g.current = !0, T.current = G, l.current?.close(), l.current = null, r("disconnected"), sessionStorage.removeItem("ws_session_token"), sessionStorage.removeItem("ws_client_id");
  }, []), h = C(() => {
    T.current = 0, g.current = !1, v.current !== null && (clearTimeout(v.current), v.current = null);
    const I = l.current;
    l.current = null, I?.close(), T.current = 0, i();
  }, [i]);
  return {
    connectionState: s,
    lastError: c,
    sessionToken: f,
    clientId: S,
    currentChannel: M,
    switchChannel: o,
    sendMessage: u,
    disconnect: a,
    reconnect: h
  };
}
export {
  ce as D,
  Nt as a,
  Gt as b,
  Kt as c,
  xt as d,
  Zt as e,
  Tt as f,
  Yt as g,
  Ot as h,
  rn as i,
  en as j,
  Dt as k,
  Qt as l,
  nn as m,
  tn as n,
  on as o,
  bt as p,
  sn as q,
  Ut as u
};
