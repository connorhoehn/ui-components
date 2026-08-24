import { useCallback as e, useEffect as t, useMemo as n, useRef as r, useState as i } from "react";
import * as a from "yjs";
//#region src/hooks/useIdleDetector.ts
var o = 12e4, s = 500;
function c(n = {}) {
	let { timeoutMs: a = o } = n, [c, l] = i(!1), u = r(null), d = r(null), f = r(!1), p = e(() => {
		u.current !== null && clearTimeout(u.current), f.current && (f.current = !1, l(!1)), u.current = setTimeout(() => {
			f.current = !0, l(!0);
		}, a);
	}, [a]), m = e(() => {
		d.current === null && (d.current = setTimeout(() => {
			d.current = null;
		}, s), p());
	}, [p]);
	return t(() => {
		let e = [
			"mousemove",
			"keydown",
			"click",
			"touchstart",
			"scroll"
		];
		for (let t of e) window.addEventListener(t, m, { passive: !0 });
		return p(), () => {
			for (let t of e) window.removeEventListener(t, m);
			u.current !== null && clearTimeout(u.current), d.current !== null && clearTimeout(d.current);
		};
	}, [m, p]), { isIdle: c };
}
//#endregion
//#region src/hooks/useAwarenessState.ts
function l(n, i) {
	let a = r({
		...i,
		name: i.displayName,
		lastSeen: Date.now(),
		idle: !1
	}), o = r(n);
	o.current = n;
	let s = e(() => {
		let e = o.current;
		e?.awareness && (a.current.lastSeen = Date.now(), e.awareness.setLocalStateField("user", { ...a.current }));
	}, []);
	t(() => {
		n?.awareness && (a.current = {
			...a.current,
			...i,
			name: i.displayName,
			lastSeen: Date.now()
		}, s());
	}, [
		n,
		i.userId,
		i.displayName,
		i.color,
		i.mode,
		s
	]);
	let { isIdle: l } = c();
	return t(() => {
		a.current.idle = l, s();
	}, [l, s]), {
		updateSection: e((e) => {
			a.current.currentSectionId = e, s();
		}, [s]),
		updateMode: e((e) => {
			a.current.mode = e, s();
		}, [s]),
		updateIdle: e((e) => {
			a.current.idle = e, s();
		}, [s]),
		updateCursorInfo: e((e, t) => {
			a.current.name = e, a.current.color = t, s();
		}, [s])
	};
}
//#endregion
//#region src/hooks/useAwareness.ts
function u(e, n) {
	let [r, a] = i([]), o = l(e, {
		userId: n.userId,
		displayName: n.displayName,
		color: n.color,
		mode: n.mode,
		currentSectionId: null
	});
	return t(() => {
		if (!e) {
			a([]);
			return;
		}
		let t = "", n = () => {
			let n = e.awareness.getStates(), r = [];
			n.forEach((t, n) => {
				if (n === e.awareness.clientID) return;
				let i = t.user;
				i && r.push({
					clientId: String(n),
					userId: i.userId ?? "",
					displayName: i.displayName ?? "Anonymous",
					color: i.color ?? "#3b82f6",
					mode: i.mode === "ack" ? "reviewer" : i.mode === "reader" ? "reader" : "editor",
					currentSectionId: i.currentSectionId ?? null,
					lastSeen: i.lastSeen ?? Date.now(),
					idle: i.idle ?? !1
				});
			});
			let i = /* @__PURE__ */ new Map();
			for (let e of r) {
				let t = e.userId || e.displayName || e.clientId, n = i.get(t);
				(!n || (e.lastSeen ?? 0) > (n.lastSeen ?? 0)) && i.set(t, e);
			}
			let o = Array.from(i.values()), s = o.map((e) => `${e.clientId}:${e.currentSectionId}:${e.mode}:${e.idle}`).join("|");
			s !== t && (t = s, queueMicrotask(() => a(o)));
		};
		return e.awareness.on("change", n), n(), () => {
			e.awareness.off("change", n);
		};
	}, [e]), {
		awareness: o,
		participants: r
	};
}
//#endregion
//#region ../../../node_modules/lib0/map.js
var d = () => /* @__PURE__ */ new Map(), f = (e, t, n) => {
	let r = e.get(t);
	return r === void 0 && e.set(t, r = n()), r;
}, p = () => /* @__PURE__ */ new Set(), m = Array.from;
Array.isArray;
//#endregion
//#region ../../../node_modules/lib0/observable.js
/* c8 ignore start */
var h = class {
	constructor() {
		this._observers = d();
	}
	on(e, t) {
		f(this._observers, e, p).add(t);
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
		return m((this._observers.get(e) || d()).values()).forEach((e) => e(...t));
	}
	destroy() {
		this._observers = d();
	}
}, g = Math.floor, _ = (e, t) => e < t ? e : t, v = (e, t) => e > t ? e : t;
Number.isNaN;
//#endregion
//#region ../../../node_modules/lib0/number.js
var y = 2 ** 53 - 1;
Number.isInteger, Number.isNaN, Number.parseInt;
//#endregion
//#region ../../../node_modules/lib0/string.js
var b = String.fromCharCode;
String.fromCodePoint, b(65535);
var x = (e) => e.toLowerCase(), S = /^\s*/g, C = (e) => e.replace(S, ""), w = /([A-Z])/g, T = (e, t) => C(e.replace(w, (e) => `${t}${x(e)}`)), E = (e) => {
	let t = unescape(encodeURIComponent(e)), n = t.length, r = new Uint8Array(n);
	for (let e = 0; e < n; e++) r[e] = t.codePointAt(e);
	return r;
}, D = typeof TextEncoder < "u" ? new TextEncoder() : null, ee = D ? (e) => D.encode(e) : E, O = typeof TextDecoder > "u" ? null : new TextDecoder("utf-8", {
	fatal: !0,
	ignoreBOM: !0
});
/* c8 ignore start */
O && O.decode(/* @__PURE__ */ new Uint8Array()).length === 1 && 
/* c8 ignore next */
(O = null);
//#endregion
//#region ../../../node_modules/lib0/encoding.js
var te = class {
	constructor() {
		this.cpos = 0, this.cbuf = /* @__PURE__ */ new Uint8Array(100), this.bufs = [];
	}
}, ne = () => new te(), re = (e) => {
	let t = e.cpos;
	for (let n = 0; n < e.bufs.length; n++) t += e.bufs[n].length;
	return t;
}, ie = (e) => {
	let t = new Uint8Array(re(e)), n = 0;
	for (let r = 0; r < e.bufs.length; r++) {
		let i = e.bufs[r];
		t.set(i, n), n += i.length;
	}
	return t.set(new Uint8Array(e.cbuf.buffer, 0, e.cpos), n), t;
}, k = (e, t) => {
	let n = e.cbuf.length;
	e.cpos === n && (e.bufs.push(e.cbuf), e.cbuf = new Uint8Array(n * 2), e.cpos = 0), e.cbuf[e.cpos++] = t;
}, A = (e, t) => {
	for (; t > 127;) k(e, 128 | 127 & t), t = g(t / 128);
	k(e, 127 & t);
}, j = /* @__PURE__ */ new Uint8Array(3e4), ae = j.length / 3, oe = D && D.encodeInto ? (e, t) => {
	if (t.length < ae) {
		/* c8 ignore next */
		let n = D.encodeInto(t, j).written || 0;
		A(e, n);
		for (let t = 0; t < n; t++) k(e, j[t]);
	} else ce(e, ee(t));
} : (e, t) => {
	let n = unescape(encodeURIComponent(t)), r = n.length;
	A(e, r);
	for (let t = 0; t < r; t++) k(e, n.codePointAt(t));
}, se = (e, t) => {
	let n = e.cbuf.length, r = e.cpos, i = _(n - r, t.length), a = t.length - i;
	e.cbuf.set(t.subarray(0, i), r), e.cpos += i, a > 0 && (e.bufs.push(e.cbuf), e.cbuf = new Uint8Array(v(n * 2, a)), e.cbuf.set(t.subarray(i)), e.cpos = a);
}, ce = (e, t) => {
	A(e, t.byteLength), se(e, t);
}, le = (e) => Error(e), ue = le("Unexpected end of array"), de = le("Integer out of Range"), fe = class {
	constructor(e) {
		this.arr = e, this.pos = 0;
	}
}, pe = (e) => new fe(e), me = (e, t) => {
	let n = new Uint8Array(e.arr.buffer, e.pos + e.arr.byteOffset, t);
	return e.pos += t, n;
}, he = (e) => me(e, N(e)), M = (e) => e.arr[e.pos++], N = (e) => {
	let t = 0, n = 1, r = e.arr.length;
	for (; e.pos < r;) {
		let r = e.arr[e.pos++];
		if (t += (r & 127) * n, n *= 128, r < 128) return t;
		/* c8 ignore start */
		if (t > y) throw de;
	}
	throw ue;
}, ge = O ? (e) => O.decode(he(e)) : (e) => {
	let t = N(e);
	if (t === 0) return "";
	{
		let n = String.fromCodePoint(M(e));
		if (--t < 100) for (; t--;) n += String.fromCodePoint(M(e));
		else for (; t > 0;) {
			let r = t < 1e4 ? t : 1e4, i = e.arr.subarray(e.pos, e.pos + r);
			e.pos += r, n += String.fromCodePoint.apply(null, i), t -= r;
		}
		return decodeURIComponent(escape(n));
	}
}, P = Date.now, F = Symbol("Equality"), _e = Object.keys, I = (e) => _e(e).length, ve = (e, t) => Object.prototype.hasOwnProperty.call(e, t), L = (e, t) => {
	if (e === t) return !0;
	if (e == null || t == null || e.constructor !== t.constructor && (e.constructor || Object) !== (t.constructor || Object)) return !1;
	if (e[F] != null) return e[F](t);
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
			for (let n of e.keys()) if (!t.has(n) || !L(e.get(n), t.get(n))) return !1;
			break;
		case void 0:
		case Object:
			if (I(e) !== I(t)) return !1;
			for (let n in e) if (!ve(e, n) || !L(e[n], t[n])) return !1;
			break;
		case Array:
			if (e.length !== t.length) return !1;
			for (let n = 0; n < e.length; n++) if (!L(e[n], t[n])) return !1;
			break;
		default: return !1;
	}
	return !0;
}, ye = (e, t) => t.includes(e), be = 3e4, xe = class extends h {
	constructor(e) {
		super(), this.doc = e, this.clientID = e.clientID, this.states = /* @__PURE__ */ new Map(), this.meta = /* @__PURE__ */ new Map(), this._checkInterval = setInterval(() => {
			let e = P();
			this.getLocalState() !== null && 15e3 <= e - this.meta.get(this.clientID).lastUpdated && this.setLocalState(this.getLocalState());
			let t = [];
			this.meta.forEach((n, r) => {
				r !== this.clientID && 3e4 <= e - n.lastUpdated && this.states.has(r) && t.push(r);
			}), t.length > 0 && Se(this, t, "timeout");
		}, g(be / 10)), e.on("destroy", () => {
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
			lastUpdated: P()
		});
		let a = [], o = [], s = [], c = [];
		e === null ? c.push(t) : i == null ? e != null && a.push(t) : (o.push(t), L(i, e) || s.push(t)), (a.length > 0 || s.length > 0 || c.length > 0) && this.emit("change", [{
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
}, Se = (e, t, n) => {
	let r = [];
	for (let n = 0; n < t.length; n++) {
		let i = t[n];
		if (e.states.has(i)) {
			if (e.states.delete(i), i === e.clientID) {
				let t = e.meta.get(i);
				e.meta.set(i, {
					clock: t.clock + 1,
					lastUpdated: P()
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
}, Ce = (e, t, n = e.states) => {
	let r = t.length, i = ne();
	A(i, r);
	for (let a = 0; a < r; a++) {
		let r = t[a], o = n.get(r) || null, s = e.meta.get(r).clock;
		A(i, r), A(i, s), oe(i, JSON.stringify(o));
	}
	return ie(i);
}, we = (e, t, n) => {
	let r = pe(t), i = P(), a = [], o = [], s = [], c = [], l = N(r);
	for (let t = 0; t < l; t++) {
		let t = N(r), n = N(r), l = JSON.parse(ge(r)), u = e.meta.get(t), d = e.states.get(t), f = u === void 0 ? 0 : u.clock;
		(f < n || f === n && l === null && e.states.has(t)) && (l === null ? t === e.clientID && e.getLocalState() != null ? n++ : e.states.delete(t) : e.states.set(t, l), e.meta.set(t, {
			clock: n,
			lastUpdated: i
		}), u === void 0 && l !== null ? a.push(t) : u !== void 0 && l === null ? c.push(t) : l !== null && (L(l, d) || s.push(t), o.push(t)));
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
}, Te = (e) => e === void 0 ? null : e, R = new class {
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
	typeof localStorage < "u" && localStorage && (R = localStorage);
} catch {}
/* c8 ignore stop */
/* c8 ignore next */
var Ee = R, z = typeof process < "u" && process.release && /node|io\.js/.test(process.release.name) && Object.prototype.toString.call(typeof process < "u" ? process : 0) === "[object process]", B = typeof window < "u" && typeof document < "u" && !z;
typeof navigator < "u" && /Mac/.test(navigator.platform);
var V, De = [], Oe = () => {
	if (V === void 0) {
		if (z) {
			V = d();
			let e = process.argv, t = null;
			for (let n = 0; n < e.length; n++) {
				let r = e[n];
				r[0] === "-" ? (t !== null && V.set(t, ""), t = r) : t === null ? De.push(r) : (V.set(t, r), t = null);
			}
			t !== null && V.set(t, "");
		} else typeof location == "object" ? (V = d(), (location.search || "?").slice(1).split("&").forEach((e) => {
			if (e.length !== 0) {
				let [t, n] = e.split("=");
				V.set(`--${T(t, "-")}`, n), V.set(`-${T(t, "-")}`, n);
			}
		})) : V = d();
	}
	return V;
}, H = (e) => Oe().has(e), U = (e) => Te(z ? process.env[e.toUpperCase().replaceAll("-", "_")] : Ee.getItem(e)), W = (e) => H("--" + e) || U(e) !== null;
W("production"), z && ye(process.env.FORCE_COLOR, [
	"true",
	"1",
	"2"
]) || !H("--no-colors") && !W("no-color") && (!z || process.stdout.isTTY) && (!z || H("--color") || U("COLORTERM") !== null || (U("TERM") || "").includes("color"));
/* c8 ignore stop */
//#endregion
//#region ../../../node_modules/lib0/buffer.js
var ke = (e) => new Uint8Array(e), Ae = (e, t, n) => new Uint8Array(e, t, n), je = (e) => {
	let t = "";
	for (let n = 0; n < e.byteLength; n++) t += b(e[n]);
	return btoa(t);
}, Me = (e) => Buffer.from(e.buffer, e.byteOffset, e.byteLength).toString("base64"), Ne = (e) => {
	let t = atob(e), n = ke(t.length);
	for (let e = 0; e < t.length; e++) n[e] = t.charCodeAt(e);
	return n;
}, Pe = (e) => {
	let t = Buffer.from(e, "base64");
	return Ae(t.buffer, t.byteOffset, t.byteLength);
}, G = B ? je : Me, K = B ? Ne : Pe, Fe = class extends h {
	doc;
	channel;
	awareness;
	_sendMessage;
	_synced = !1;
	_awarenessTimer = null;
	_updateHandler;
	constructor(e, t, n) {
		super(), this.doc = e, this.channel = t, this._sendMessage = n, this.awareness = new xe(e), this._updateHandler = (e, t) => {
			if (t === this) return;
			let n = G(e);
			this._sendMessage({
				service: "crdt",
				action: "update",
				channel: this.channel,
				update: n
			});
		}, this.doc.on("update", this._updateHandler), this.awareness.on("update", ({ added: e, updated: t, removed: n }, r) => {
			r !== this && e.concat(t, n).includes(this.awareness.clientID) && (this._awarenessTimer && clearTimeout(this._awarenessTimer), this._awarenessTimer = setTimeout(() => {
				let e = G(Ce(this.awareness, [this.awareness.clientID]));
				this._sendMessage({
					service: "crdt",
					action: "awareness",
					channel: this.channel,
					update: e
				});
			}, 50));
		});
	}
	get synced() {
		return this._synced;
	}
	applyRemoteUpdate(e) {
		let t = K(e);
		a.applyUpdate(this.doc, t, this);
	}
	applySnapshot(e) {
		let t = K(e);
		a.applyUpdate(this.doc, t, this), this._synced = !0, this.emit("synced", [!0]);
	}
	applyAwarenessUpdate(e) {
		let t = K(e);
		we(this.awareness, t, this);
	}
	destroy() {
		this.doc.off("update", this._updateHandler), this._awarenessTimer && clearTimeout(this._awarenessTimer), this.awareness.destroy(), super.destroy();
	}
};
//#endregion
//#region src/hooks/useYjsDoc.ts
function Ie(n) {
	let { documentId: o, ws: s, onMessage: c, onDocReplaced: l } = n, [u, d] = i(!1), [f, p] = i(0), m = r(null), h = r(null), g = r(l);
	g.current = l;
	let _ = `doc:${o}`, v = e(() => d(!0), []);
	return t(() => {
		let e = new a.Doc({ gc: !1 });
		m.current = e;
		let t = new Fe(e, _, s.sendMessage);
		h.current = t, p((e) => e + 1);
		let n = () => {
			s.sendMessage({
				service: "crdt",
				action: "subscribe",
				channel: _
			});
		};
		n();
		let r = setTimeout(n, 500), i = setTimeout(n, 1500);
		return t.on("synced", v), () => {
			clearTimeout(r), clearTimeout(i), s.sendMessage({
				service: "crdt",
				action: "unsubscribe",
				channel: _
			});
			let e = h.current, t = m.current;
			e && (e.off("synced", v), e.destroy()), t && t.destroy(), m.current = null, h.current = null, d(!1);
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
				let i = new a.Doc({ gc: !1 });
				m.current = i;
				let o = new Fe(i, _, s.sendMessage);
				h.current = o, o.applySnapshot(t), o.on("synced", v), g.current?.(i, o), d(!0), p((e) => e + 1);
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
//#region src/hooks/useDocumentMetadata.ts
function Le(e) {
	let t = {};
	return e.forEach((e, n) => {
		t[n] = e;
	}), t;
}
function Re(n) {
	let [r, a] = i(null);
	return t(() => {
		if (!n) {
			a(null);
			return;
		}
		let e = n.getMap("meta"), t = () => {
			e.size > 0 && a(Le(e));
		};
		return e.observe(t), t(), () => {
			e.unobserve(t);
		};
	}, [n]), {
		meta: r,
		updateMeta: e((e) => {
			if (!n) return;
			let t = n.getMap("meta");
			n.transact(() => {
				for (let [n, r] of Object.entries(e)) t.set(n, r);
			});
		}, [n])
	};
}
//#endregion
//#region src/hooks/useSectionList.ts
function q(e) {
	let t = {};
	return e.forEach((e, n) => {
		t[n] = e;
	}), t;
}
function ze(e) {
	let t = [];
	return e.forEach((e) => {
		t.push(q(e));
	}), t;
}
function Be(e) {
	let t = [];
	return e.forEach((e) => {
		let n = q(e), r = e.get("items");
		n.items = r instanceof a.Array ? ze(r) : [], t.push(n);
	}), t;
}
function J(e, t) {
	for (let [n, r] of Object.entries(t)) e.set(n, r);
}
function Ve(e) {
	let t = [];
	return e.forEach((e) => {
		t.push(q(e));
	}), t;
}
function He(e) {
	let t = /* @__PURE__ */ new Map(), n = [];
	for (let n of e) t.set(n.id, {
		...n,
		replies: []
	});
	for (let r of e) {
		let e = t.get(r.id);
		r.parentCommentId && t.has(r.parentCommentId) ? t.get(r.parentCommentId).replies.push(e) : n.push(e);
	}
	return n;
}
function Ue(n) {
	let [r, o] = i([]), [s, c] = i({});
	t(() => {
		if (!n) {
			o([]), c({});
			return;
		}
		let e = n.getArray("sections"), t = null, r = () => {
			t && clearTimeout(t), t = setTimeout(() => {
				let t = Be(e);
				o(t);
				let n = {};
				for (let t = 0; t < e.length; t++) {
					let r = e.get(t), i = r.get("id"), o = r.get("comments");
					o instanceof a.Array && (n[i] = He(Ve(o)));
				}
				c(n);
			}, 16);
		};
		return e.observeDeep(r), r(), () => {
			t && clearTimeout(t), e.unobserveDeep(r);
		};
	}, [n]);
	let l = e((e) => {
		if (!n) return null;
		let t = n.getArray("sections");
		for (let n = 0; n < t.length; n++) {
			let r = t.get(n);
			if (r.get("id") === e) return {
				ySection: r,
				index: n
			};
		}
		return null;
	}, [n]), u = e((e, t) => {
		let n = l(e);
		if (!n) return null;
		let r = n.ySection.get("items");
		if (!(r instanceof a.Array)) return null;
		for (let e = 0; e < r.length; e++) {
			let n = r.get(e);
			if (n.get("id") === t) return n;
		}
		return null;
	}, [l]), d = e((e) => {
		if (!n) return null;
		let t = l(e);
		if (!t) return null;
		let r = t.ySection.get("comments");
		return r instanceof a.Array || (r = new a.Array(), t.ySection.set("comments", r)), r;
	}, [n, l]), f = e((e) => {
		if (!n) return;
		let t = n.getArray("sections");
		n.transact(() => {
			let n = new a.Map(), { items: r, ...i } = e;
			J(n, i);
			let o = new a.Array();
			for (let e of r) {
				let t = new a.Map();
				J(t, e), o.push([t]);
			}
			n.set("items", o), t.push([n]);
		});
	}, [n]), p = e((e, t) => {
		if (!n) return;
		let r = l(e);
		r && n.transact(() => {
			let { items: e, ...n } = t;
			for (let [e, t] of Object.entries(n)) r.ySection.set(e, t);
		});
	}, [n, l]), m = e((e) => {
		if (!n) return;
		let t = l(e);
		if (!t) return;
		let r = n.getArray("sections");
		n.transact(() => {
			r.delete(t.index, 1);
		});
	}, [n, l]), h = e((e, t) => {
		if (!n) return;
		let r = l(e);
		r && n.transact(() => {
			let e = r.ySection.get("items");
			e instanceof a.Array || (e = new a.Array(), r.ySection.set("items", e));
			let n = new a.Map();
			J(n, t), e.push([n]);
		});
	}, [n, l]), g = e((e, t, r) => {
		if (!n) return;
		let i = u(e, t);
		i && n.transact(() => {
			for (let [e, t] of Object.entries(r)) i.set(e, t);
		});
	}, [n, u]);
	return {
		sections: r,
		comments: s,
		addSection: f,
		updateSection: p,
		removeSection: m,
		addItem: h,
		updateItem: g,
		removeItem: e((e, t) => {
			if (!n) return;
			let r = l(e);
			if (!r) return;
			let i = r.ySection.get("items");
			if (i instanceof a.Array) {
				for (let e = 0; e < i.length; e++) if (i.get(e).get("id") === t) {
					n.transact(() => {
						i.delete(e, 1);
					});
					return;
				}
			}
		}, [n, l]),
		ackItem: e((e, t, n) => {
			g(e, t, {
				status: "acked",
				ackedBy: n,
				ackedAt: (/* @__PURE__ */ new Date()).toISOString()
			});
		}, [g]),
		rejectItem: e((e, t, n) => {
			g(e, t, {
				status: "rejected",
				ackedBy: n,
				ackedAt: (/* @__PURE__ */ new Date()).toISOString()
			});
		}, [g]),
		getSectionFragment: e((e) => {
			let t = l(e);
			if (!t) return null;
			let r = t.ySection.get("content");
			return r instanceof a.XmlFragment ? r : (queueMicrotask(() => {
				n && (t.ySection.get("content") instanceof a.XmlFragment || n.transact(() => {
					t.ySection.set("content", new a.XmlFragment());
				}));
			}), null);
		}, [n, l]),
		addComment: e((e, t) => {
			n && n.transact(() => {
				let n = d(e);
				if (!n) return;
				let r = new a.Map();
				r.set("id", crypto.randomUUID()), r.set("text", t.text), r.set("userId", t.userId), r.set("displayName", t.displayName), r.set("color", t.color), r.set("timestamp", (/* @__PURE__ */ new Date()).toISOString()), r.set("parentCommentId", t.parentCommentId ?? null), n.push([r]);
			});
		}, [n, d]),
		resolveThread: e((e, t, r) => {
			if (!n) return;
			let i = d(e);
			if (!i) return;
			let a = !1;
			n.transact(() => {
				for (let e = 0; e < i.length; e++) {
					let n = i.get(e);
					if (n.get("id") === t) {
						n.set("resolved", !0), n.set("resolvedBy", r), n.set("resolvedAt", (/* @__PURE__ */ new Date()).toISOString()), a = !0;
						break;
					}
				}
			}), a || console.warn(`resolveThread: comment ${t} not found in section ${e}`);
		}, [n, d]),
		unresolveThread: e((e, t) => {
			if (!n) return;
			let r = d(e);
			if (!r) return;
			let i = !1;
			n.transact(() => {
				for (let e = 0; e < r.length; e++) {
					let n = r.get(e);
					if (n.get("id") === t) {
						n.set("resolved", !1), n.delete("resolvedBy"), n.delete("resolvedAt"), i = !0;
						break;
					}
				}
			}), i || console.warn(`unresolveThread: comment ${t} not found in section ${e}`);
		}, [n, d])
	};
}
//#endregion
//#region src/hooks/useDocumentExport.ts
function Y(e) {
	let t = {};
	return e.forEach((e, n) => {
		t[n] = e;
	}), t;
}
function We(e) {
	let t = [];
	return e.forEach((e) => {
		t.push(Y(e));
	}), t;
}
function Ge(e) {
	let t = [];
	return e.forEach((e) => {
		let n = Y(e), r = e.get("items");
		n.items = r instanceof a.Array ? We(r) : [], t.push(n);
	}), t;
}
function Ke(t) {
	return { exportJSON: e(() => {
		if (!t) return null;
		let e = t.getMap("meta");
		if (e.size === 0) return null;
		let n = t.getArray("sections");
		return {
			meta: Y(e),
			sections: Ge(n)
		};
	}, [t]) };
}
//#endregion
//#region src/hooks/useCollaborativeDoc.ts
function qe(e) {
	let t = {};
	return e.forEach((e, n) => {
		t[n] = e;
	}), t;
}
function Je(n) {
	let { documentId: r, mode: o, ws: s, userId: c, displayName: l, color: d, onMessage: f } = n, { ydoc: p, provider: m, synced: h } = Ie({
		documentId: r,
		ws: s,
		onMessage: f
	}), { meta: g, updateMeta: _ } = Re(p), v = Ue(p), { awareness: y, participants: b } = u(m, {
		userId: c,
		displayName: l,
		color: d,
		mode: o
	}), { exportJSON: x } = Ke(p), [S, C] = i({});
	t(() => {
		if (!p) {
			C({});
			return;
		}
		let e = p.getMap("sectionReviews"), t = () => {
			let t = {};
			e.forEach((e, n) => {
				if (!(e instanceof a.Map)) return;
				let r = qe(e), i = n.split(":")[0];
				t[i] || (t[i] = []), t[i].push(r);
			}), C(t);
		};
		return e.observeDeep(t), t(), () => {
			e.unobserveDeep(t);
		};
	}, [p]);
	let w = e((e, t, n) => {
		if (!p) return;
		let r = p.getMap("sectionReviews"), i = `${e}:${c}`;
		p.transact(() => {
			let e = new a.Map();
			e.set("userId", c), e.set("displayName", l), e.set("status", t), e.set("timestamp", (/* @__PURE__ */ new Date()).toISOString()), n && e.set("comment", n), r.set(i, e);
		});
	}, [
		p,
		c,
		l
	]), T = e((e) => {
		console.warn("[useCollaborativeDoc] loadFromMarkdown is not implemented and does nothing.");
	}, []);
	return {
		meta: g,
		sections: v.sections,
		synced: h,
		updateMeta: _,
		addSection: v.addSection,
		updateSection: v.updateSection,
		removeSection: v.removeSection,
		addItem: v.addItem,
		updateItem: v.updateItem,
		removeItem: v.removeItem,
		ackItem: v.ackItem,
		rejectItem: v.rejectItem,
		getSectionFragment: v.getSectionFragment,
		ydoc: p,
		provider: m,
		loadFromMarkdown: T,
		exportJSON: x,
		participants: b,
		comments: v.comments,
		addComment: v.addComment,
		resolveThread: v.resolveThread,
		unresolveThread: v.unresolveThread,
		sectionReviews: S,
		reviewSection: w,
		awareness: y
	};
}
//#endregion
//#region src/hooks/useDocumentComments.ts
function Ye(e) {
	let t = /* @__PURE__ */ new Map(), n = [];
	for (let n of e) t.set(n.id, {
		...n,
		replies: []
	});
	for (let r of e) {
		let e = t.get(r.id);
		r.parentCommentId && t.has(r.parentCommentId) ? t.get(r.parentCommentId).replies.push(e) : n.push(e);
	}
	return n;
}
function X(e) {
	return {
		...e,
		id: e.id ?? e.commentId ?? ""
	};
}
function Xe(e) {
	let t = /* @__PURE__ */ new Map();
	for (let n of e) {
		let e = n.sectionId ?? "__unknown";
		t.has(e) || t.set(e, []), t.get(e).push(n);
	}
	let n = {};
	for (let [e, r] of t) n[e] = Ye(r);
	return n;
}
function Ze(a) {
	let { documentId: o, idToken: s, sendMessage: c, onMessage: l } = a, [u, d] = i([]), [f, p] = i(!1), m = r(c);
	t(() => {
		m.current = c;
	}, [c]);
	let h = r(o);
	t(() => {
		h.current = o;
	}, [o]);
	let g = n(() => {
		let e = { "Content-Type": "application/json" };
		return s && (e.Authorization = `Bearer ${s}`), e;
	}, [s]);
	return t(() => {
		!o || !s || (p(!0), fetch(`/api/documents/${o}/comments`, { headers: { Authorization: `Bearer ${s}` } }).then(async (e) => {
			if (!e.ok) throw Error(`Failed to load comments (${e.status})`);
			return e.json();
		}).then((e) => {
			d((e.comments ?? []).map((e) => X(e)));
		}).catch((e) => {
			console.warn("[useDocumentComments] fetch error:", e.message);
		}).finally(() => {
			p(!1);
		}));
	}, [o, s]), t(() => l((e) => {
		let t = e.type, n = e.payload;
		if (!n) return;
		let r = n.documentId;
		if (!(r && r !== h.current)) {
			if (t === "doc:comment_added") {
				let e = n.comment;
				if (!e) return;
				let t = X(e);
				d((e) => e.some((e) => e.id === t.id) ? e : [...e, t]);
				return;
			}
			if (t === "doc:comment_resolved") {
				let e = n.commentId, t = n.resolved;
				if (!e) return;
				d((r) => r.map((r) => r.id === e ? {
					...r,
					resolved: t,
					...t ? {
						resolvedBy: n.resolvedBy,
						resolvedAt: n.resolvedAt
					} : {
						resolvedBy: void 0,
						resolvedAt: void 0
					}
				} : r));
				return;
			}
			if (t === "doc:comment_deleted") {
				let e = n.commentId;
				if (!e) return;
				d((t) => t.filter((t) => t.id !== e));
				return;
			}
		}
	}), [l]), {
		comments: n(() => Xe(u), [u]),
		addComment: e(async (e, t, n) => {
			if (!s) return;
			let r = await fetch(`/api/documents/${h.current}/comments`, {
				method: "POST",
				headers: g,
				body: JSON.stringify({
					sectionId: e,
					text: t,
					...n ? { parentCommentId: n } : {}
				})
			});
			if (!r.ok) throw Error(`Failed to add comment (${r.status})`);
			let i = X((await r.json()).comment);
			d((e) => e.some((e) => e.id === i.id) ? e : [...e, i]);
		}, [s, g]),
		resolveThread: e(async (e, t) => {
			if (!s) return;
			let n = await fetch(`/api/documents/${h.current}/comments/${t}`, {
				method: "PATCH",
				headers: g,
				body: JSON.stringify({ resolved: !0 })
			});
			if (!n.ok) throw Error(`Failed to resolve thread (${n.status})`);
			let r = await n.json();
			d((e) => e.map((e) => e.id === t ? {
				...e,
				resolved: !0,
				resolvedBy: r.comment.resolvedBy,
				resolvedAt: r.comment.resolvedAt
			} : e));
		}, [s, g]),
		unresolveThread: e(async (e, t) => {
			if (!s) return;
			let n = await fetch(`/api/documents/${h.current}/comments/${t}`, {
				method: "PATCH",
				headers: g,
				body: JSON.stringify({ resolved: !1 })
			});
			if (!n.ok) throw Error(`Failed to unresolve thread (${n.status})`);
			d((e) => e.map((e) => e.id === t ? {
				...e,
				resolved: !1,
				resolvedBy: void 0,
				resolvedAt: void 0
			} : e));
		}, [s, g]),
		loading: f
	};
}
//#endregion
//#region src/hooks/useDocumentItems.ts
function Z(e) {
	return {
		id: e.id ?? e.itemId,
		text: e.text ?? "",
		status: {
			open: "pending",
			pending: "pending",
			acked: "acked",
			done: "done",
			rejected: "rejected"
		}[e.status ?? "open"] ?? "pending",
		assignee: e.assignee ?? "",
		ackedBy: e.ackedBy ?? "",
		ackedAt: e.ackedAt ?? "",
		priority: e.priority ?? "medium",
		notes: e.notes ?? "",
		dueDate: e.dueDate,
		category: e.category
	};
}
function Qe(a) {
	let { documentId: o, sectionIds: s, idToken: c, sendMessage: l, onMessage: u } = a, [d, f] = i({}), [p, m] = i(!1), h = r(l);
	t(() => {
		h.current = l;
	}, [l]);
	let g = r(o);
	t(() => {
		g.current = o;
	}, [o]);
	let _ = n(() => {
		let e = { "Content-Type": "application/json" };
		return c && (e.Authorization = `Bearer ${c}`), e;
	}, [c]), v = s.join(",");
	return t(() => {
		if (!o || !c || s.length === 0) return;
		m(!0);
		let e = !1, t = s.map(async (e) => {
			try {
				let t = await fetch(`/api/documents/${o}/sections/${e}/items`, { headers: { Authorization: `Bearer ${c}` } });
				if (!t.ok) throw Error(`Failed to load items for section ${e} (${t.status})`);
				return {
					sectionId: e,
					items: ((await t.json()).items ?? []).map(Z)
				};
			} catch (t) {
				return console.warn(`[useDocumentItems] fetch error for section ${e}:`, t.message), {
					sectionId: e,
					items: []
				};
			}
		});
		return Promise.all(t).then((t) => {
			if (e) return;
			let n = {};
			for (let { sectionId: e, items: r } of t) n[e] = r;
			f(n);
		}).finally(() => {
			e || m(!1);
		}), () => {
			e = !0;
		};
	}, [
		o,
		c,
		v
	]), t(() => u((e) => {
		let t = e.type, n = e.payload;
		if (!n) return;
		let r = n.documentId;
		if (!(r && r !== g.current)) {
			if (t === "social:post" && n.type === "section:item:created") {
				let e = n.sectionId, t = n.item;
				if (!e || !t) return;
				let r = Z(t);
				f((t) => {
					let n = t[e] ?? [];
					return n.some((e) => e.id === r.id) ? t : {
						...t,
						[e]: [...n, r]
					};
				});
				return;
			}
			if (t === "social:post" && n.type === "section:item:updated") {
				let e = n.sectionId, t = n.itemId, r = n.updates;
				if (!e || !t || !r) return;
				f((n) => {
					let i = n[e];
					return i ? {
						...n,
						[e]: i.map((e) => e.id === t ? {
							...e,
							...r
						} : e)
					} : n;
				});
				return;
			}
			if (t === "social:post" && n.type === "section:item:deleted") {
				let e = n.sectionId, t = n.itemId;
				if (!e || !t) return;
				f((n) => {
					let r = n[e];
					return r ? {
						...n,
						[e]: r.filter((e) => e.id !== t)
					} : n;
				});
				return;
			}
			if (t === "social:post" && n.type === "section:item:acked") {
				let e = n.sectionId, t = n.itemId, r = n.ackedBy;
				if (!e || !t) return;
				f((n) => {
					let i = n[e];
					return i ? {
						...n,
						[e]: i.map((e) => e.id === t ? {
							...e,
							status: "acked",
							ackedBy: r ?? e.ackedBy,
							ackedAt: (/* @__PURE__ */ new Date()).toISOString()
						} : e)
					} : n;
				});
				return;
			}
		}
	}), [u]), {
		items: d,
		addItem: e(async (e, t) => {
			if (!c) return;
			let n = await fetch(`/api/documents/${g.current}/sections/${e}/items`, {
				method: "POST",
				headers: _,
				body: JSON.stringify(t)
			});
			if (!n.ok) throw Error(`Failed to add item (${n.status})`);
			let r = Z((await n.json()).item);
			f((t) => {
				let n = t[e] ?? [];
				return n.some((e) => e.id === r.id) ? t : {
					...t,
					[e]: [...n, r]
				};
			});
		}, [c, _]),
		updateItem: e(async (e, t, n) => {
			if (!c) return;
			let r = await fetch(`/api/documents/${g.current}/sections/${e}/items/${t}`, {
				method: "PATCH",
				headers: _,
				body: JSON.stringify(n)
			});
			if (!r.ok) throw Error(`Failed to update item (${r.status})`);
			let i = Z((await r.json()).item);
			f((n) => {
				let r = n[e];
				return r ? {
					...n,
					[e]: r.map((e) => e.id === t ? i : e)
				} : n;
			});
		}, [c, _]),
		removeItem: e(async (e, t) => {
			if (!c) return;
			let n = await fetch(`/api/documents/${g.current}/sections/${e}/items/${t}`, {
				method: "DELETE",
				headers: _
			});
			if (!n.ok) throw Error(`Failed to remove item (${n.status})`);
			f((n) => {
				let r = n[e];
				return r ? {
					...n,
					[e]: r.filter((e) => e.id !== t)
				} : n;
			});
		}, [c, _]),
		ackItem: e(async (e, t) => {
			if (!c) return;
			let n = await fetch(`/api/documents/${g.current}/sections/${e}/items/${t}/ack`, {
				method: "POST",
				headers: _
			});
			if (!n.ok) throw Error(`Failed to acknowledge item (${n.status})`);
			let r = Z((await n.json()).item);
			f((n) => {
				let i = n[e];
				return i ? {
					...n,
					[e]: i.map((e) => e.id === t ? r : e)
				} : n;
			});
		}, [c, _]),
		loading: p
	};
}
//#endregion
//#region src/hooks/useDocumentReviews.ts
function $e(e) {
	let t = {};
	for (let n of e) {
		let e = n.sectionId ?? "__unknown";
		t[e] || (t[e] = []);
		let { sectionId: r, ...i } = n;
		t[e].push(i);
	}
	return t;
}
function et(a) {
	let { documentId: o, idToken: s, sendMessage: c, onMessage: l } = a, [u, d] = i({}), [f, p] = i(!1), m = r(c);
	t(() => {
		m.current = c;
	}, [c]);
	let h = r(o);
	t(() => {
		h.current = o;
	}, [o]);
	let g = n(() => {
		let e = { "Content-Type": "application/json" };
		return s && (e.Authorization = `Bearer ${s}`), e;
	}, [s]);
	return t(() => {
		!o || !s || (p(!0), fetch(`/api/documents/${o}/reviews`, { headers: { Authorization: `Bearer ${s}` } }).then(async (e) => {
			if (!e.ok) throw Error(`Failed to load reviews (${e.status})`);
			return e.json();
		}).then((e) => {
			d($e(e.reviews ?? []));
		}).catch((e) => {
			console.warn("[useDocumentReviews] fetch error:", e.message);
		}).finally(() => {
			p(!1);
		}));
	}, [o, s]), t(() => l((e) => {
		let t = e.type, n = e.payload;
		if (!n) return;
		let r = n.documentId;
		if (!(r && r !== h.current) && t === "social:post" && n.type === "section:review") {
			let e = n.sectionId, t = n.review;
			if (!e || !t) return;
			d((n) => {
				let r = n[e] ?? [], i = r.findIndex((e) => e.userId === t.userId), a = [...r];
				return i >= 0 ? a[i] = t : a.push(t), {
					...n,
					[e]: a
				};
			});
			return;
		}
	}), [l]), {
		sectionReviews: u,
		reviewSection: e(async (e, t, n) => {
			if (!s) return;
			let r = await fetch(`/api/documents/${h.current}/sections/${e}/reviews`, {
				method: "POST",
				headers: g,
				body: JSON.stringify({
					status: t,
					...n === void 0 ? {} : { comment: n }
				})
			});
			if (!r.ok) throw Error(`Failed to submit review (${r.status})`);
			let i = await r.json();
			d((t) => {
				let n = t[e] ?? [], r = n.findIndex((e) => e.userId === i.review.userId), a = [...n];
				return r >= 0 ? a[r] = i.review : a.push(i.review), {
					...t,
					[e]: a
				};
			});
		}, [s, g]),
		loading: f
	};
}
//#endregion
//#region src/data/userDirectory.ts
var Q = [
	{
		userId: "alice",
		displayName: "Alice Chen",
		email: "alice.chen@local.dev",
		color: "#3b82f6"
	},
	{
		userId: "bob",
		displayName: "Bob Martinez",
		email: "bob.martinez@local.dev",
		color: "#ef4444"
	},
	{
		userId: "carol",
		displayName: "Carol Johnson",
		email: "carol.johnson@local.dev",
		color: "#8b5cf6"
	},
	{
		userId: "dave",
		displayName: "Dave Williams",
		email: "dave.williams@local.dev",
		color: "#f59e0b"
	},
	{
		userId: "eve",
		displayName: "Eve Thompson",
		email: "eve.thompson@local.dev",
		color: "#10b981"
	},
	{
		userId: "frank",
		displayName: "Frank Davis",
		email: "frank.davis@local.dev",
		color: "#ec4899"
	},
	{
		userId: "grace",
		displayName: "Grace Wilson",
		email: "grace.wilson@local.dev",
		color: "#6366f1"
	},
	{
		userId: "hank",
		displayName: "Hank Anderson",
		email: "hank.anderson@local.dev",
		color: "#14b8a6"
	}
], tt = [
	{
		id: "grp-engineering",
		name: "Engineering",
		handle: "engineering",
		memberIds: [
			"alice",
			"bob",
			"dave",
			"frank"
		],
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
		memberIds: [
			"alice",
			"carol",
			"grace"
		],
		color: "#f59e0b"
	},
	{
		id: "grp-everyone",
		name: "Everyone",
		handle: "everyone",
		memberIds: [
			"alice",
			"bob",
			"carol",
			"dave",
			"eve",
			"frank",
			"grace",
			"hank"
		],
		color: "#6b7280"
	}
];
function nt(e) {
	let t = e.toLowerCase();
	return Q.filter((e) => e.displayName.toLowerCase().includes(t) || e.email.toLowerCase().includes(t));
}
//#endregion
//#region src/hooks/useMentionUsers.ts
function rt(e) {
	return n(() => {
		let t = /* @__PURE__ */ new Set(), n = [];
		for (let r of e) {
			let e = r.userId || r.clientId;
			if (t.has(e)) continue;
			t.add(e);
			let i = Q.find((e) => e.displayName.toLowerCase() === r.displayName.toLowerCase() || e.displayName.split(" ")[0].toLowerCase() === r.displayName.split(" ")[0].toLowerCase());
			n.push({
				userId: r.userId || r.clientId,
				displayName: i?.displayName || r.displayName,
				color: i?.color || r.color,
				online: !0,
				mode: r.mode,
				type: "user"
			});
		}
		for (let e of Q) t.has(e.userId) || n.some((t) => t.displayName === e.displayName) || n.push({
			userId: e.userId,
			displayName: e.displayName,
			color: e.color,
			online: !1,
			type: "user"
		});
		for (let e of tt) n.push({
			userId: e.id,
			displayName: e.name,
			color: e.color,
			online: !1,
			type: "group",
			memberCount: e.memberIds.length
		});
		return n;
	}, [e]);
}
//#endregion
//#region src/hooks/useMyMentionsAndTasks.ts
function it(e) {
	let t = [];
	for (let n of e) t.push(n), n.replies && n.replies.length > 0 && t.push(...it(n.replies));
	return t;
}
function at(e, t) {
	let n = t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
	return RegExp(`@${n}(?=\\s|$|[.!?,;:])`, "i").test(e);
}
function ot({ sections: e, comments: t, displayName: r, userId: i }) {
	return n(() => {
		let n = [], a = [];
		for (let a of e) {
			let e = t[a.id];
			if (!e) continue;
			let o = it(e);
			for (let e of o) e.userId !== i && at(e.text, r) && n.push({
				kind: "mention",
				sectionId: a.id,
				sectionTitle: a.title,
				commentId: e.id,
				authorName: e.displayName,
				authorColor: e.color,
				commentText: e.text,
				timestamp: e.timestamp
			});
		}
		for (let t of e) for (let e of t.items) {
			let n = (e.assignee ?? "").toLowerCase();
			(n === r.toLowerCase() || n === i.toLowerCase()) && a.push({
				kind: "task",
				sectionId: t.id,
				sectionTitle: t.title,
				itemId: e.id,
				taskText: e.text,
				status: e.status,
				priority: e.priority
			});
		}
		return n.sort((e, t) => new Date(t.timestamp).getTime() - new Date(e.timestamp).getTime()), [...n, ...a];
	}, [
		e,
		t,
		r,
		i
	]);
}
//#endregion
//#region src/hooks/useVersionHistory.ts
function st(e) {
	let t = e.getArray("sections"), n = [];
	for (let e = 0; e < t.length; e++) {
		let r = t.get(e);
		if (!r || typeof r.get != "function") continue;
		let i = r.get("id") ?? "", a = r.get("type") ?? "tasks", o = r.get("title") ?? "", s = r.get("items"), c = [];
		if (s && typeof s.toArray == "function") for (let e of s.toArray()) {
			if (!e || typeof e.get != "function") continue;
			let t = e;
			c.push({
				id: t.get("id") ?? "",
				text: t.get("text") ?? "",
				status: t.get("status") ?? "pending",
				assignee: t.get("assignee") ?? "",
				priority: t.get("priority") ?? "medium"
			});
		}
		let l = "", u = r.get("content");
		u && typeof u.toString == "function" && (l = u.toString().replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()), n.push({
			id: i,
			type: a,
			title: o,
			textContent: l,
			items: c
		});
	}
	return n;
}
function ct(n) {
	let { channel: o, sendMessage: s, onMessage: c } = n, [l, u] = i([]), [d, f] = i(!1), [p, m] = i(null), [h, g] = i(null), [_, v] = i(null), [y, b] = i(null), x = r(null), S = r(null), C = r(!1);
	return t(() => c((e) => {
		if (e.type === "error" && e.service === "crdt") {
			f(!1);
			return;
		}
		if (e.type === "crdt" && e.channel === o) switch (e.action) {
			case "snapshotList": {
				let t = e.snapshots;
				u(t ?? []), f(!1);
				break;
			}
			case "snapshot": {
				if (!e.version) break;
				let t = e.update;
				if (!t) break;
				let n = new a.Doc({ gc: !1 }), r = K(t);
				a.applyUpdate(n, r), C.current ? (C.current = !1, S.current && S.current.destroy(), S.current = n, v(st(n))) : (x.current && x.current.destroy(), x.current = n, m(n));
				break;
			}
			case "versionSaved":
				f(!0), s({
					service: "crdt",
					action: "listSnapshots",
					channel: o,
					limit: 20
				});
				break;
			case "snapshotRestored": f(!0), s({
				service: "crdt",
				action: "listSnapshots",
				channel: o,
				limit: 20
			});
		}
	}), [
		o,
		c,
		s
	]), t(() => () => {
		x.current &&= (x.current.destroy(), null), S.current &&= (S.current.destroy(), null);
	}, []), {
		versions: l,
		loading: d,
		fetchVersions: e(() => {
			f(!0), s({
				service: "crdt",
				action: "listSnapshots",
				channel: o,
				limit: 20
			});
		}, [o, s]),
		previewVersion: e((e) => {
			g(e), s({
				service: "crdt",
				action: "getSnapshotAtVersion",
				channel: o,
				timestamp: e
			});
		}, [o, s]),
		restoreVersion: e((e) => {
			s({
				service: "crdt",
				action: "restoreSnapshot",
				channel: o,
				timestamp: e
			});
		}, [o, s]),
		previewDoc: p,
		previewTimestamp: h,
		clearPreview: e(() => {
			x.current &&= (x.current.destroy(), null), m(null), g(null);
		}, []),
		saveVersion: e((e) => {
			s({
				service: "crdt",
				action: "saveVersion",
				channel: o,
				name: e
			});
		}, [o, s]),
		extractSections: e((e) => st(e), []),
		compareSections: _,
		compareTimestamp: y,
		compareVersion: e((e) => {
			C.current = !0, b(e), s({
				service: "crdt",
				action: "getSnapshotAtVersion",
				channel: o,
				timestamp: e
			});
		}, [o, s]),
		clearCompare: e(() => {
			S.current &&= (S.current.destroy(), null), v(null), b(null);
		}, [])
	};
}
//#endregion
//#region src/hooks/useVideoCall.ts
function lt(n) {
	let { documentId: a, idToken: o, meta: s, updateMeta: c, sendMessage: l, displayName: u } = n, [d, f] = i("idle"), [p, m] = i(null), [h, g] = i(null), [_, v] = i(null), [y, b] = i(null), [x, S] = i(null), C = r(p);
	t(() => {
		C.current = p;
	}, [p]), t(() => {
		let e = () => {
			let e = C.current;
			e && navigator.sendBeacon(`/api/video/sessions/${e}/end`, new Blob([JSON.stringify({ documentId: a })], { type: "application/json" }));
		};
		return window.addEventListener("beforeunload", e), () => window.removeEventListener("beforeunload", e);
	}, []);
	let w = !!s?.activeCallSessionId && !p, T = r(o);
	t(() => {
		T.current = o;
	}, [o]);
	let E = e(() => {
		let e = T.current, t = { "Content-Type": "application/json" };
		return e && (t.Authorization = `Bearer ${e}`), t;
	}, []), D = e(async (e) => {
		f("joining"), S(null);
		try {
			let t = await fetch(`/api/video/sessions/${e}/join`, {
				method: "POST",
				headers: E(),
				body: JSON.stringify({
					documentId: a,
					displayName: u
				})
			});
			if (!t.ok) {
				let n = await t.json().catch(() => ({ error: "Join failed" })), r = t.status;
				throw r === 404 || r === 410 ? (console.warn("[useVideoCall] Session", e, "no longer exists, clearing stale meta"), c({ activeCallSessionId: "" }), l({
					service: "crdt",
					action: "updateDocumentMeta",
					documentId: a,
					meta: { activeCallSessionId: "" }
				}), Error("This call has ended. The page has been updated.")) : Error(n.error);
			}
			let n = await t.json();
			return m(e), g(n.token), v(n.participantId), b(n.userId), f("active"), !0;
		} catch (e) {
			return S(e.message), f("error"), !1;
		}
	}, [
		a,
		u,
		E,
		c,
		l
	]);
	return {
		callState: d,
		sessionId: p,
		stageToken: h,
		participantId: _,
		userId: y,
		error: x,
		hasActiveCall: w,
		startCall: e(async () => {
			f("creating"), S(null);
			try {
				let e = await fetch("/api/video/sessions", {
					method: "POST",
					headers: E(),
					body: JSON.stringify({
						documentId: a,
						displayName: u
					})
				});
				if (!e.ok) {
					let t = await e.json().catch(() => ({ error: "Create failed" }));
					throw Error(t.error);
				}
				let t = (await e.json()).sessionId;
				if (!await D(t)) return;
				c({ activeCallSessionId: t }), l({
					service: "crdt",
					action: "updateDocumentMeta",
					documentId: a,
					meta: { activeCallSessionId: t }
				});
			} catch (e) {
				S(e.message), f("error");
			}
		}, [
			a,
			u,
			E,
			c,
			l,
			D
		]),
		joinCall: e(async (e) => {
			await D(e);
		}, [D]),
		endCall: e(async () => {
			let e = C.current;
			e && fetch(`/api/video/sessions/${e}/end`, {
				method: "POST",
				headers: E(),
				body: JSON.stringify({ documentId: a })
			}).catch((e) => {
				console.error("[useVideoCall] Failed to end session on server:", e);
			}), c({ activeCallSessionId: "" }), l({
				service: "crdt",
				action: "updateDocumentMeta",
				documentId: a,
				meta: { activeCallSessionId: "" }
			}), m(null), g(null), v(null), b(null), f("idle"), S(null);
		}, [
			a,
			E,
			c,
			l
		])
	};
}
//#endregion
//#region src/hooks/useVideoSessions.ts
function ut(t, n) {
	let [r, a] = i([]), [o, s] = i(!1);
	return {
		sessions: r,
		loading: o,
		fetchSessions: e(async () => {
			s(!0);
			try {
				let e = { "Content-Type": "application/json" };
				n && (e.Authorization = `Bearer ${n}`);
				let r = await fetch(`/api/video/sessions/document/${t}`, { headers: e });
				if (!r.ok) return;
				let i = await r.json();
				a(i.sessions);
			} catch {} finally {
				s(!1);
			}
		}, [t, n])
	};
}
//#endregion
//#region src/hooks/useWebSocket.ts
var $ = 5, dt = 1e3;
function ft(e, t) {
	let n = new URL(e.wsUrl);
	return t && n.searchParams.set("sessionToken", t), n.toString();
}
var pt = "bearer-token-v1";
function mt(n) {
	let { config: a, onMessage: o } = n, [s, c] = i("idle"), [l, u] = i(null), [d, f] = i(() => sessionStorage.getItem("ws_session_token")), [p, m] = i(() => sessionStorage.getItem("ws_client_id")), [h, g] = i(a.defaultChannel), _ = r(null), v = r(0), y = r(null), b = r(!1), x = r(o);
	t(() => {
		x.current = o;
	}, [o]);
	let S = r(sessionStorage.getItem("ws_session_token"));
	t(() => {
		S.current = d;
	}, [d]);
	let C = r(() => {}), w = e(() => {
		if (_.current && (_.current.readyState === WebSocket.OPEN || _.current.readyState === WebSocket.CONNECTING)) return;
		c("connecting");
		let e = ft(a, S.current), t = new WebSocket(e, [pt, a.cognitoToken]);
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
					let e = dt * 2 ** v.current;
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
export { u as _, ot as a, nt as c, Ze as d, Je as f, Ie as g, Re as h, ct as i, et as l, Ue as m, ut as n, rt as o, Ke as p, lt as r, Q as s, mt as t, Qe as u, l as v, c as y };
