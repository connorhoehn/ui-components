import { useCallback as e, useEffect as t, useRef as n, useState as r } from "react";
import * as i from "yjs";
//#region ../../../../Users/connorhoehn/Projects/ui-components/node_modules/lib0/map.js
var a = () => /* @__PURE__ */ new Map(), o = (e, t, n) => {
	let r = e.get(t);
	return r === void 0 && e.set(t, r = n()), r;
}, s = () => /* @__PURE__ */ new Set(), c = Array.from;
Array.isArray;
//#endregion
//#region ../../../../Users/connorhoehn/Projects/ui-components/node_modules/lib0/observable.js
/* c8 ignore start */
var l = class {
	constructor() {
		this._observers = a();
	}
	on(e, t) {
		o(this._observers, e, s).add(t);
	}
	once(e, t) {
		let n = (...r) => {
			this.off(e, n), t(...r);
		};
		this.on(e, n);
	}
	off(e, t) {
		let n = this._observers.get(e);
		n !== void 0 && (n.delete(t), n.size === 0 && this._observers.delete(e));
	}
	emit(e, t) {
		return c((this._observers.get(e) || a()).values()).forEach((e) => e(...t));
	}
	destroy() {
		this._observers = a();
	}
}, u = Math.floor, d = (e, t) => e < t ? e : t, f = (e, t) => e > t ? e : t;
Number.isNaN;
//#endregion
//#region ../../../../Users/connorhoehn/Projects/ui-components/node_modules/lib0/number.js
var p = 2 ** 53 - 1;
Number.isInteger, Number.isNaN, Number.parseInt;
//#endregion
//#region ../../../../Users/connorhoehn/Projects/ui-components/node_modules/lib0/string.js
var m = String.fromCharCode;
String.fromCodePoint, m(65535);
var h = (e) => e.toLowerCase(), g = /^\s*/g, _ = (e) => e.replace(g, ""), v = /([A-Z])/g, y = (e, t) => _(e.replace(v, (e) => `${t}${h(e)}`)), b = (e) => {
	let t = unescape(encodeURIComponent(e)), n = t.length, r = new Uint8Array(n);
	for (let e = 0; e < n; e++) r[e] = t.codePointAt(e);
	return r;
}, x = typeof TextEncoder < "u" ? new TextEncoder() : null, S = x ? (e) => x.encode(e) : b, C = typeof TextDecoder > "u" ? null : new TextDecoder("utf-8", {
	fatal: !0,
	ignoreBOM: !0
});
/* c8 ignore start */
C && C.decode(/* @__PURE__ */ new Uint8Array()).length === 1 && 
/* c8 ignore next */
(C = null);
//#endregion
//#region ../../../../Users/connorhoehn/Projects/ui-components/node_modules/lib0/encoding.js
var w = class {
	constructor() {
		this.cpos = 0, this.cbuf = /* @__PURE__ */ new Uint8Array(100), this.bufs = [];
	}
}, T = () => new w(), ee = (e) => {
	let t = e.cpos;
	for (let n = 0; n < e.bufs.length; n++) t += e.bufs[n].length;
	return t;
}, te = (e) => {
	let t = new Uint8Array(ee(e)), n = 0;
	for (let r = 0; r < e.bufs.length; r++) {
		let i = e.bufs[r];
		t.set(i, n), n += i.length;
	}
	return t.set(new Uint8Array(e.cbuf.buffer, 0, e.cpos), n), t;
}, E = (e, t) => {
	let n = e.cbuf.length;
	e.cpos === n && (e.bufs.push(e.cbuf), e.cbuf = new Uint8Array(n * 2), e.cpos = 0), e.cbuf[e.cpos++] = t;
}, D = (e, t) => {
	for (; t > 127;) E(e, 128 | 127 & t), t = u(t / 128);
	E(e, 127 & t);
}, O = /* @__PURE__ */ new Uint8Array(3e4), ne = O.length / 3, re = x && x.encodeInto ? (e, t) => {
	if (t.length < ne) {
		/* c8 ignore next */
		let n = x.encodeInto(t, O).written || 0;
		D(e, n);
		for (let t = 0; t < n; t++) E(e, O[t]);
	} else k(e, S(t));
} : (e, t) => {
	let n = unescape(encodeURIComponent(t)), r = n.length;
	D(e, r);
	for (let t = 0; t < r; t++) E(e, n.codePointAt(t));
}, ie = (e, t) => {
	let n = e.cbuf.length, r = e.cpos, i = d(n - r, t.length), a = t.length - i;
	e.cbuf.set(t.subarray(0, i), r), e.cpos += i, a > 0 && (e.bufs.push(e.cbuf), e.cbuf = new Uint8Array(f(n * 2, a)), e.cbuf.set(t.subarray(i)), e.cpos = a);
}, k = (e, t) => {
	D(e, t.byteLength), ie(e, t);
}, A = (e) => Error(e), ae = A("Unexpected end of array"), oe = A("Integer out of Range"), se = class {
	constructor(e) {
		this.arr = e, this.pos = 0;
	}
}, ce = (e) => new se(e), le = (e, t) => {
	let n = new Uint8Array(e.arr.buffer, e.pos + e.arr.byteOffset, t);
	return e.pos += t, n;
}, ue = (e) => le(e, M(e)), j = (e) => e.arr[e.pos++], M = (e) => {
	let t = 0, n = 1, r = e.arr.length;
	for (; e.pos < r;) {
		let r = e.arr[e.pos++];
		if (t += (r & 127) * n, n *= 128, r < 128) return t;
		/* c8 ignore start */
		if (t > p) throw oe;
	}
	throw ae;
}, de = C ? (e) => C.decode(ue(e)) : (e) => {
	let t = M(e);
	if (t === 0) return "";
	{
		let n = String.fromCodePoint(j(e));
		if (--t < 100) for (; t--;) n += String.fromCodePoint(j(e));
		else for (; t > 0;) {
			let r = t < 1e4 ? t : 1e4, i = e.arr.subarray(e.pos, e.pos + r);
			e.pos += r, n += String.fromCodePoint.apply(null, i), t -= r;
		}
		return decodeURIComponent(escape(n));
	}
}, N = Date.now, P = Symbol("Equality"), fe = Object.keys, F = (e) => fe(e).length, pe = (e, t) => Object.prototype.hasOwnProperty.call(e, t), I = (e, t) => {
	if (e === t) return !0;
	if (e == null || t == null || e.constructor !== t.constructor && (e.constructor || Object) !== (t.constructor || Object)) return !1;
	if (e[P] != null) return e[P](t);
	switch (e.constructor) {
		case ArrayBuffer: e = new Uint8Array(e), t = new Uint8Array(t);
		case Uint8Array:
			if (e.byteLength !== t.byteLength) return !1;
			for (let n = 0; n < e.length; n++) if (e[n] !== t[n]) return !1;
			break;
		case Set:
			if (e.size !== t.size) return !1;
			for (let n of e) if (!t.has(n)) return !1;
			break;
		case Map:
			if (e.size !== t.size) return !1;
			for (let n of e.keys()) if (!t.has(n) || !I(e.get(n), t.get(n))) return !1;
			break;
		case void 0:
		case Object:
			if (F(e) !== F(t)) return !1;
			for (let n in e) if (!pe(e, n) || !I(e[n], t[n])) return !1;
			break;
		case Array:
			if (e.length !== t.length) return !1;
			for (let n = 0; n < e.length; n++) if (!I(e[n], t[n])) return !1;
			break;
		default: return !1;
	}
	return !0;
}, L = (e, t) => t.includes(e), R = 3e4, z = class extends l {
	constructor(e) {
		super(), this.doc = e, this.clientID = e.clientID, this.states = /* @__PURE__ */ new Map(), this.meta = /* @__PURE__ */ new Map(), this._checkInterval = setInterval(() => {
			let e = N();
			this.getLocalState() !== null && 15e3 <= e - this.meta.get(this.clientID).lastUpdated && this.setLocalState(this.getLocalState());
			let t = [];
			this.meta.forEach((n, r) => {
				r !== this.clientID && 3e4 <= e - n.lastUpdated && this.states.has(r) && t.push(r);
			}), t.length > 0 && B(this, t, "timeout");
		}, u(R / 10)), e.on("destroy", () => {
			this.destroy();
		}), this.setLocalState({});
	}
	destroy() {
		this.emit("destroy", [this]), this.setLocalState(null), super.destroy(), clearInterval(this._checkInterval);
	}
	getLocalState() {
		return this.states.get(this.clientID) || null;
	}
	setLocalState(e) {
		let t = this.clientID, n = this.meta.get(t), r = n === void 0 ? 0 : n.clock + 1, i = this.states.get(t);
		e === null ? this.states.delete(t) : this.states.set(t, e), this.meta.set(t, {
			clock: r,
			lastUpdated: N()
		});
		let a = [], o = [], s = [], c = [];
		e === null ? c.push(t) : i == null ? e != null && a.push(t) : (o.push(t), I(i, e) || s.push(t)), (a.length > 0 || s.length > 0 || c.length > 0) && this.emit("change", [{
			added: a,
			updated: s,
			removed: c
		}, "local"]), this.emit("update", [{
			added: a,
			updated: o,
			removed: c
		}, "local"]);
	}
	setLocalStateField(e, t) {
		let n = this.getLocalState();
		n !== null && this.setLocalState({
			...n,
			[e]: t
		});
	}
	getStates() {
		return this.states;
	}
}, B = (e, t, n) => {
	let r = [];
	for (let n = 0; n < t.length; n++) {
		let i = t[n];
		if (e.states.has(i)) {
			if (e.states.delete(i), i === e.clientID) {
				let t = e.meta.get(i);
				e.meta.set(i, {
					clock: t.clock + 1,
					lastUpdated: N()
				});
			}
			r.push(i);
		}
	}
	r.length > 0 && (e.emit("change", [{
		added: [],
		updated: [],
		removed: r
	}, n]), e.emit("update", [{
		added: [],
		updated: [],
		removed: r
	}, n]));
}, V = (e, t, n = e.states) => {
	let r = t.length, i = T();
	D(i, r);
	for (let a = 0; a < r; a++) {
		let r = t[a], o = n.get(r) || null, s = e.meta.get(r).clock;
		D(i, r), D(i, s), re(i, JSON.stringify(o));
	}
	return te(i);
}, me = (e, t, n) => {
	let r = ce(t), i = N(), a = [], o = [], s = [], c = [], l = M(r);
	for (let t = 0; t < l; t++) {
		let t = M(r), n = M(r), l = JSON.parse(de(r)), u = e.meta.get(t), d = e.states.get(t), f = u === void 0 ? 0 : u.clock;
		(f < n || f === n && l === null && e.states.has(t)) && (l === null ? t === e.clientID && e.getLocalState() != null ? n++ : e.states.delete(t) : e.states.set(t, l), e.meta.set(t, {
			clock: n,
			lastUpdated: i
		}), u === void 0 && l !== null ? a.push(t) : u !== void 0 && l === null ? c.push(t) : l !== null && (I(l, d) || s.push(t), o.push(t)));
	}
	(a.length > 0 || s.length > 0 || c.length > 0) && e.emit("change", [{
		added: a,
		updated: s,
		removed: c
	}, n]), (a.length > 0 || o.length > 0 || c.length > 0) && e.emit("update", [{
		added: a,
		updated: o,
		removed: c
	}, n]);
}, he = (e) => e === void 0 ? null : e, H = new class {
	constructor() {
		this.map = /* @__PURE__ */ new Map();
	}
	setItem(e, t) {
		this.map.set(e, t);
	}
	getItem(e) {
		return this.map.get(e);
	}
}();
/* c8 ignore start */
try {
	typeof localStorage < "u" && localStorage && (H = localStorage);
} catch {}
/* c8 ignore stop */
/* c8 ignore next */
var ge = H, U = typeof process < "u" && process.release && /node|io\.js/.test(process.release.name) && Object.prototype.toString.call(typeof process < "u" ? process : 0) === "[object process]", W = typeof window < "u" && typeof document < "u" && !U;
typeof navigator < "u" && /Mac/.test(navigator.platform);
var G, _e = [], ve = () => {
	if (G === void 0) {
		if (U) {
			G = a();
			let e = process.argv, t = null;
			for (let n = 0; n < e.length; n++) {
				let r = e[n];
				r[0] === "-" ? (t !== null && G.set(t, ""), t = r) : t === null ? _e.push(r) : (G.set(t, r), t = null);
			}
			t !== null && G.set(t, "");
		} else typeof location == "object" ? (G = a(), (location.search || "?").slice(1).split("&").forEach((e) => {
			if (e.length !== 0) {
				let [t, n] = e.split("=");
				G.set(`--${y(t, "-")}`, n), G.set(`-${y(t, "-")}`, n);
			}
		})) : G = a();
	}
	return G;
}, K = (e) => ve().has(e), q = (e) => he(U ? process.env[e.toUpperCase().replaceAll("-", "_")] : ge.getItem(e)), J = (e) => K("--" + e) || q(e) !== null;
J("production"), U && L(process.env.FORCE_COLOR, [
	"true",
	"1",
	"2"
]) || !K("--no-colors") && !J("no-color") && (!U || process.stdout.isTTY) && (!U || K("--color") || q("COLORTERM") !== null || (q("TERM") || "").includes("color"));
/* c8 ignore stop */
//#endregion
//#region ../../../../Users/connorhoehn/Projects/ui-components/node_modules/lib0/buffer.js
var ye = (e) => new Uint8Array(e), be = (e, t, n) => new Uint8Array(e, t, n), xe = (e) => {
	let t = "";
	for (let n = 0; n < e.byteLength; n++) t += m(e[n]);
	return btoa(t);
}, Se = (e) => Buffer.from(e.buffer, e.byteOffset, e.byteLength).toString("base64"), Ce = (e) => {
	let t = atob(e), n = ye(t.length);
	for (let e = 0; e < t.length; e++) n[e] = t.charCodeAt(e);
	return n;
}, we = (e) => {
	let t = Buffer.from(e, "base64");
	return be(t.buffer, t.byteOffset, t.byteLength);
}, Y = W ? xe : Se, X = W ? Ce : we, Z = class extends l {
	doc;
	channel;
	awareness;
	_sendMessage;
	_synced = !1;
	_destroyed = !1;
	_awarenessTimer = null;
	_updateHandler;
	constructor(e, t, n) {
		super(), this.doc = e, this.channel = t, this._sendMessage = n, this.awareness = new z(e), this._updateHandler = (e, t) => {
			if (t === this) return;
			let n = Y(e);
			this._sendMessage({
				service: "crdt",
				action: "update",
				channel: this.channel,
				update: n
			});
		}, this.doc.on("update", this._updateHandler), this.awareness.on("update", ({ added: e, updated: t, removed: n }, r) => {
			r !== this && (this._destroyed || e.concat(t, n).includes(this.awareness.clientID) && (this._awarenessTimer && clearTimeout(this._awarenessTimer), this._awarenessTimer = setTimeout(() => {
				let e = Y(V(this.awareness, [this.awareness.clientID]));
				this._sendMessage({
					service: "crdt",
					action: "awareness",
					channel: this.channel,
					update: e
				});
			}, 50)));
		});
	}
	get synced() {
		return this._synced;
	}
	applyRemoteUpdate(e) {
		let t = X(e);
		i.applyUpdate(this.doc, t, this);
	}
	applySnapshot(e) {
		let t = X(e);
		i.applyUpdate(this.doc, t, this), this._synced = !0, this.emit("synced", [!0]);
	}
	applyAwarenessUpdate(e) {
		let t = X(e);
		me(this.awareness, t, this);
	}
	_broadcastDeparture() {
		let e = this.awareness.clientID;
		if (!this.awareness.getStates().has(e)) return;
		B(this.awareness, [e], "provider-destroy");
		let t = V(this.awareness, [e]);
		this._sendMessage({
			service: "crdt",
			action: "awareness",
			channel: this.channel,
			update: Y(t)
		});
	}
	destroy() {
		this._destroyed || (this._destroyed = !0, this.doc.off("update", this._updateHandler), this._awarenessTimer &&= (clearTimeout(this._awarenessTimer), null), this._broadcastDeparture(), this.awareness.destroy(), super.destroy());
	}
};
//#endregion
//#region src/hooks/useYjsDoc.ts
function Q(a) {
	let { documentId: o, ws: s, onMessage: c, onDocReplaced: l } = a, [u, d] = r(!1), [f, p] = r(0), m = n(null), h = n(null), g = n(l);
	g.current = l;
	let _ = `doc:${o}`, v = e(() => d(!0), []);
	return t(() => {
		let e = new i.Doc({ gc: !1 });
		m.current = e;
		let t = new Z(e, _, s.sendMessage);
		h.current = t, p((e) => e + 1);
		let n = () => {
			s.sendMessage({
				service: "crdt",
				action: "subscribe",
				channel: _
			});
		};
		n();
		let r = setTimeout(n, 500), a = setTimeout(n, 1500);
		return t.on("synced", v), () => {
			clearTimeout(r), clearTimeout(a);
			let e = h.current, t = m.current;
			e && (e.off("synced", v), e.destroy()), t && t.destroy(), s.sendMessage({
				service: "crdt",
				action: "unsubscribe",
				channel: _
			}), m.current = null, h.current = null, d(!1);
		};
	}, [o]), t(() => c((e) => {
		e.type === "session" && s.sendMessage({
			service: "crdt",
			action: "subscribe",
			channel: _
		});
	}), [
		o,
		s.sendMessage,
		c,
		_
	]), t(() => c((e) => {
		let t = h.current;
		if (t) {
			if (e.type === "crdt:doc-replaced") {
				if (e.channel !== _) return;
				let t = e.snapshot;
				if (!t) return;
				let n = m.current, r = h.current;
				r && (r.off("synced", v), r.destroy()), n && n.destroy();
				let a = new i.Doc({ gc: !1 });
				m.current = a;
				let o = new Z(a, _, s.sendMessage);
				h.current = o, o.applySnapshot(t), o.on("synced", v), g.current?.(a, o), d(!0), p((e) => e + 1);
				return;
			}
			if (e.type === "crdt:snapshot") {
				if (e.channel !== _) return;
				let n = e.snapshot;
				n && t.applySnapshot(n);
				return;
			}
			if (e.type === "crdt:update") {
				if (e.channel !== _) return;
				let n = e.update;
				n && t.applyRemoteUpdate(n);
				return;
			}
			if (e.type === "crdt:awareness") {
				if (e.channel !== _) return;
				let n = e, r = n.updates;
				if (r && Array.isArray(r)) {
					for (let e of r) e.update && t.applyAwarenessUpdate(e.update);
					return;
				}
				let i = n.update;
				i && t.applyAwarenessUpdate(i);
				return;
			}
			if (e.type === "crdt") {
				if (e.channel !== _) return;
				switch (e.action) {
					case "snapshot":
						if (e.version) break;
						e.update && t.applySnapshot(e.update);
						break;
					case "update":
						e.update && t.applyRemoteUpdate(e.update);
						break;
					case "awareness": e.update && t.applyAwarenessUpdate(e.update);
				}
			}
		}
	}), [o, c]), {
		ydoc: m.current,
		provider: h.current,
		synced: u,
		docVersion: f
	};
}
//#endregion
//#region src/hooks/useWebSocket.ts
var $ = 5, Te = 1e3;
function Ee(e, t) {
	let n = new URL(e.wsUrl);
	return t && n.searchParams.set("sessionToken", t), n.toString();
}
var De = "bearer-token-v1";
function Oe(i) {
	let { config: a, onMessage: o } = i, [s, c] = r("idle"), [l, u] = r(null), [d, f] = r(() => sessionStorage.getItem("ws_session_token")), [p, m] = r(() => sessionStorage.getItem("ws_client_id")), [h, g] = r(a.defaultChannel), _ = n(null), v = n(0), y = n(null), b = n(!1), x = n(o);
	t(() => {
		x.current = o;
	}, [o]);
	let S = n(sessionStorage.getItem("ws_session_token"));
	t(() => {
		S.current = d;
	}, [d]);
	let C = n(() => {}), w = e(() => {
		if (_.current && (_.current.readyState === WebSocket.OPEN || _.current.readyState === WebSocket.CONNECTING)) return;
		c("connecting");
		let e = Ee(a, S.current), t = new WebSocket(e, [De, a.cognitoToken]);
		_.current = t, t.onopen = () => {
			_.current === t && (v.current = 0, c("connected"));
		}, t.onmessage = (e) => {
			if (_.current !== t) return;
			let n;
			try {
				n = JSON.parse(e.data);
			} catch {
				return;
			}
			if (n.type === "session") {
				let e = n;
				f(e.sessionToken), m(e.clientId), S.current = e.sessionToken, sessionStorage.setItem("ws_session_token", e.sessionToken), sessionStorage.setItem("ws_client_id", e.clientId);
			}
			n.type === "error" && n.error && u(n.error), x.current?.(n);
		}, t.onclose = () => {
			if (_.current === t) {
				if (v.current < $) {
					v.current === 0 ? console.warn("[useWebSocket] connection lost, retrying with backoff") : console.debug("[useWebSocket] reconnect attempt", v.current + 1, "of", $), c("reconnecting");
					let e = Te * 2 ** v.current;
					v.current += 1, y.current = setTimeout(() => {
						C.current();
					}, e);
				} else c("disconnected"), b.current || u({
					code: "RECONNECT_EXHAUSTED",
					message: `Lost connection to gateway after ${$} retries`,
					timestamp: (/* @__PURE__ */ new Date()).toISOString()
				});
			}
		}, t.onerror = (e) => {
			if (_.current !== t) return;
			let n = e;
			n.message && u({
				code: "CONNECTION_ERROR",
				message: n.message,
				timestamp: (/* @__PURE__ */ new Date()).toISOString()
			});
		};
	}, [a]);
	return t(() => {
		C.current = w;
	}, [w]), t(() => (w(), () => {
		y.current !== null && (clearTimeout(y.current), y.current = null), _.current?.close(), _.current = null;
	}), []), {
		connectionState: s,
		lastError: l,
		sessionToken: d,
		clientId: p,
		currentChannel: h,
		switchChannel: e((e) => {
			g(e);
		}, []),
		sendMessage: e((e) => {
			_.current?.readyState === WebSocket.OPEN && _.current.send(JSON.stringify(e));
		}, []),
		disconnect: e(() => {
			y.current !== null && (clearTimeout(y.current), y.current = null), b.current = !0, v.current = $, _.current?.close(), _.current = null, c("disconnected"), sessionStorage.removeItem("ws_session_token"), sessionStorage.removeItem("ws_client_id");
		}, []),
		reconnect: e(() => {
			v.current = 0, b.current = !1, y.current !== null && (clearTimeout(y.current), y.current = null);
			let e = _.current;
			_.current = null, e?.close(), v.current = 0, w();
		}, [w])
	};
}
//#endregion
export { Q as n, X as r, Oe as t };
