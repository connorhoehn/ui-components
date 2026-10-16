import { n as e } from "../Button-uREUOWUk.js";
import { c as t, l as n, n as r } from "../Text-4BIlhd_-.js";
import { t as i } from "../Modal-CEiWhFnj.js";
import { n as a } from "../Slider-DEbQCKD1.js";
import { i as o, n as s, r as c, t as l } from "../useDocumentImageUpload-3W74XPh6.js";
import { $ as u, A as d, B as f, C as p, D as m, E as h, F as g, G as _, H as v, I as y, J as b, K as x, L as S, M as C, N as w, O as T, P as E, Q as ee, R as te, S as ne, St as D, T as O, U as k, V as A, W as re, X as j, Y as M, Z as N, _ as P, _t as ie, a as ae, at as oe, b as F, bt as I, c as L, ct as R, d as se, dt as z, et as ce, f as le, ft as B, g as ue, gt as de, h as fe, ht as V, i as H, it as pe, j as U, k as me, l as he, lt as ge, m as _e, mt as ve, n as ye, nt as be, o as xe, ot as Se, p as Ce, pt as we, q as Te, r as Ee, rt as De, s as Oe, st as ke, t as Ae, tt as je, u as Me, ut as Ne, v as Pe, vt as Fe, w as Ie, x as Le, xt as Re, y as ze, yt as Be, z as Ve } from "../meeting-uhne3kX_.js";
import { createContext as He, useCallback as W, useContext as G, useEffect as K, useLayoutEffect as Ue, useMemo as q, useRef as J, useState as Y, useSyncExternalStore as We } from "react";
import { jsx as X, jsxs as Z } from "react/jsx-runtime";
import { createPortal as Ge } from "react-dom";
//#region src/integrations/realtime/callBlockModel.ts
var Ke = [], qe = [
	"composer",
	"page",
	"block",
	"pane"
], Je = class {
	claims = [];
	listeners = /* @__PURE__ */ new Set();
	claim(e, t = "page", n = {}) {
		let r = Symbol("call-block-claim");
		return this.claims = [...this.claims, {
			token: r,
			target: e,
			placement: t,
			compact: !!n.compact,
			documents: n.documents ?? Ke
		}], this.emit(), () => {
			let e = this.claims.length;
			this.claims = this.claims.filter((e) => e.token !== r), this.claims.length !== e && this.emit();
		};
	}
	top() {
		for (let e of qe) for (let t = this.claims.length - 1; t >= 0; --t) if (this.claims[t].placement === e) return this.claims[t];
		return null;
	}
	current = () => this.top()?.target ?? null;
	placement = () => this.top()?.placement ?? "footer";
	compact = () => this.top()?.compact ?? !1;
	documents = () => this.top()?.documents ?? Ke;
	pageClaimed = () => this.claims.some((e) => e.placement !== "pane");
	subscribe = (e) => (this.listeners.add(e), () => {
		this.listeners.delete(e);
	});
	emit() {
		for (let e of this.listeners) e();
	}
};
function Ye(e, t = !1) {
	return e === "composer" ? t ? "stack" : "shelf" : e === "pane" ? "grid" : "shelf";
}
function Xe(e) {
	return e > 0 && e < 640;
}
function Q(e, t) {
	return t && e !== "idle" && e !== "ringing";
}
function Ze(e, t) {
	return Q(e, t) && e !== "ended" && e !== "failed";
}
function Qe(e, t, n) {
	return !e || !Q(t, !0) ? !1 : n.some((t) => !!t && (t === e.lobbyName || t === e.channel));
}
function $e(e) {
	if (!e) return {
		joined: 0,
		ringing: 0
	};
	let t = e.participants.filter((e) => e.state === "in-call" || e.state === "reconnecting").length;
	return {
		joined: Math.max(e.participantCount, t),
		ringing: e.participants.filter((e) => e.state === "ringing").length
	};
}
function et(e) {
	return e.phase === "idle" && e.call ? (e.rejoin(), "rejoin") : e.phase === "idle" || e.phase === "ended" || e.phase === "failed" ? (e.start([]), "start") : null;
}
var $ = {
	micOn: !0,
	cameraOn: !0,
	remember: !1
}, tt = 1e4;
function nt(e) {
	if (!e) return $;
	try {
		let t = JSON.parse(e);
		return !t || typeof t != "object" ? $ : {
			micOn: typeof t.micOn == "boolean" ? t.micOn : $.micOn,
			cameraOn: typeof t.cameraOn == "boolean" ? t.cameraOn : $.cameraOn,
			remember: t.remember === !0
		};
	} catch {
		return $;
	}
}
function rt(e, t, n) {
	return e === "accept" ? "accept" : e === "start" ? t === "idle" || t === "ended" || t === "failed" ? "start" : null : t === "idle" && n ? "join" : null;
}
function it(e, t) {
	return t === "check" || !e.remember;
}
function at(e) {
	return {
		...e,
		remember: !1
	};
}
function ot(e) {
	return e === "accept" ? tt : null;
}
function st(e) {
	return {
		micOn: e.micOn,
		cameraOn: e.cameraOn,
		remember: e.remember
	};
}
function ct(e) {
	return Math.max(0, Math.ceil(e / 1e3));
}
//#endregion
//#region src/integrations/realtime/CallBlockHost.tsx
var lt = {
	start: "Start a huddle",
	join: "Join the huddle",
	accept: "Join the huddle",
	check: "Check your devices"
}, ut = "__unbound__", dt = () => "", ft = () => () => {}, pt = () => null, mt = () => "footer", ht = () => !1, gt = [], _t = () => gt, vt = "ui.call-prejoin.v1";
function yt(e) {
	return e.gatewayConfigured ? e.platformApiUrl ? e.signedIn ? e.connectionState === "connected" ? null : "Connecting to the realtime gateway…" : "Sign in to start a call" : "Calls need platform-api — the middleware returned no platformApiUrl (REALTIME_PLATFORM_PUBLIC_URL) and VITE_PLATFORM_API_URL is not set" : "Calls need the realtime gateway — the middleware returned no gatewayUrl and VITE_GATEWAY_URL is not set";
}
function bt(e) {
	let [t, n] = Y(0);
	return Ue(() => {
		if (!e) {
			n(0);
			return;
		}
		let t = () => n(e.isConnected ? Math.round(e.getBoundingClientRect().width) : 0);
		if (t(), typeof ResizeObserver > "u") return;
		let r = new ResizeObserver(t);
		return r.observe(e), () => r.disconnect();
	}, [e]), t;
}
function xt(e) {
	try {
		return nt(window.localStorage.getItem(e));
	} catch {
		return nt(null);
	}
}
function St(e, t) {
	try {
		window.localStorage.setItem(e, JSON.stringify(st(t)));
	} catch {}
}
function Ct(o) {
	let s = He(null), c = He(null), l = He(null), u = x(o), { LVSProvider: d } = o;
	function f({ kind: s, title: c, selfName: l, selfAvatarUrl: u, initial: d, onJoin: f, onCancel: p }) {
		let [m, h] = Y(d), g = o.useMediaDevices({ requestOnMount: !1 }), _ = o.useAudioVideoSettings({
			preview: m.micOn || m.cameraOn,
			previewAudio: m.micOn,
			previewVideo: m.cameraOn
		}), v = ot(s), [y, b] = Y(v), x = J(!1), S = J({
			choice: m,
			settings: _.settings
		});
		S.current = {
			choice: m,
			settings: _.settings
		};
		let C = () => {
			let { choice: e, settings: t } = S.current;
			f(e, {
				...t.microphoneId ? { microphoneId: t.microphoneId } : {},
				...t.cameraId ? { cameraId: t.cameraId } : {},
				...t.speakerId ? { speakerId: t.speakerId } : {}
			});
		}, w = J(C);
		w.current = C;
		let T = J(!0);
		return K(() => {
			if (T.current) {
				T.current = !1;
				return;
			}
			x.current = !0, b(null);
		}, [m, _.settings]), K(() => {
			if (v === null) return;
			let e = Date.now(), t = window.setInterval(() => {
				if (x.current) {
					window.clearInterval(t);
					return;
				}
				let n = v - (Date.now() - e);
				if (n <= 0) {
					window.clearInterval(t), w.current();
					return;
				}
				b(n);
			}, 250);
			return () => window.clearInterval(t);
		}, [v]), /* @__PURE__ */ X(i, {
			open: !0,
			onClose: p,
			title: lt[s],
			maxWidth: 900,
			rawChildren: !0,
			cardClassName: "flex max-h-[88vh] flex-col overflow-hidden border border-border border-t-4 border-t-primary",
			backdropTestId: "prejoin-backdrop",
			footer: /* @__PURE__ */ Z(t, {
				gap: "sm",
				justify: "end",
				children: [/* @__PURE__ */ X(e, {
					variant: "secondary",
					onClick: p,
					"data-testid": "prejoin-cancel",
					children: s === "accept" ? "Decline" : "Cancel"
				}), /* @__PURE__ */ X(e, {
					onClick: C,
					"data-testid": "prejoin-join",
					children: y === null ? s === "check" ? "Save" : "Join" : `Join as last time (${ct(y)})`
				})]
			}),
			children: /* @__PURE__ */ Z(n, {
				gap: "md",
				className: "min-h-0 overflow-y-auto",
				"data-testid": "prejoin-dialog",
				children: [
					/* @__PURE__ */ Z(t, {
						justify: "between",
						align: "center",
						gap: "md",
						className: "rounded-md border border-border bg-surface-panel px-3 py-2",
						children: [/* @__PURE__ */ X(r, {
							size: "sm",
							weight: "semibold",
							children: c
						}), /* @__PURE__ */ Z(r, {
							size: "xs",
							tone: "secondary",
							children: ["Joining as ", l]
						})]
					}),
					/* @__PURE__ */ X(Ce, {
						devices: g,
						settings: _,
						cameraOn: m.cameraOn,
						selfName: l,
						selfAvatarUrl: u,
						layout: "prejoin",
						"data-testid": "prejoin-devices"
					}),
					/* @__PURE__ */ Z(t, {
						gap: "md",
						align: "center",
						children: [
							/* @__PURE__ */ X(a, {
								checked: m.micOn,
								onChange: (e) => h((t) => ({
									...t,
									micOn: e
								})),
								"aria-label": "Join with microphone on",
								"data-testid": "prejoin-mic"
							}),
							/* @__PURE__ */ X(r, {
								size: "sm",
								children: m.micOn ? "Microphone on" : "Microphone off"
							}),
							/* @__PURE__ */ X(a, {
								checked: m.cameraOn,
								onChange: (e) => h((t) => ({
									...t,
									cameraOn: e
								})),
								"aria-label": "Join with camera on",
								"data-testid": "prejoin-camera"
							}),
							/* @__PURE__ */ X(r, {
								size: "sm",
								children: m.cameraOn ? "Camera on" : "Camera off"
							})
						]
					}),
					/* @__PURE__ */ Z(t, {
						gap: "sm",
						align: "center",
						children: [/* @__PURE__ */ X(a, {
							checked: m.remember,
							onChange: (e) => h((t) => ({
								...t,
								remember: e
							})),
							"aria-label": "Remember and skip this check next time",
							"data-testid": "prejoin-remember"
						}), /* @__PURE__ */ X(r, {
							size: "sm",
							children: "Skip device setup next time"
						})]
					})
				]
			})
		});
	}
	function p({ self: e, tenant: t, platformApiUrl: n, getIdToken: r, gateway: i, gatewayConfigured: a, connectionState: c, onAccept: l, onCallEvent: u, meeting: d, preJoinStorageKey: p = vt, children: m }) {
		let [h, g] = Y(null), _ = J(null), v = J(null), y = J(u);
		y.current = u;
		let b = (t, n) => {
			y.current?.(t, n, {
				host: v.current,
				selfId: e?.userId ?? ""
			});
		}, [x, S] = Y(() => xt(p)), [C, w] = Y(null), T = d && o.useMeeting && C ? C.lobbyName : null, E = i, ee = q(() => E?.onMessage ? {
			send: (e) => (E.send ?? E.sendMessage)?.call(E, e),
			onMessage: (e) => E.onMessage(e)
		} : void 0, [E]), te = T && d && d.chatChannelFor ? d.chatChannelFor(T, C?.callId ?? null) ?? void 0 : void 0, ne = o.useMeeting ? o.useMeeting(T, {
			enabled: !!T,
			socket: ee,
			...te ? { chatChannel: te } : {}
		}) : null, D = T && ne ? ne : null, O = o.useConversationCall({
			lobbyName: h?.lobbyName ?? ut,
			...D?.activeLobby ? { mediaLobby: D.activeLobby } : {},
			channel: h?.channel ?? null,
			self: e ?? {
				userId: "",
				displayName: ""
			},
			platformApi: {
				baseUrl: n ?? "",
				getIdToken: r
			},
			gateway: i,
			discover: !!h && a,
			initialMedia: {
				micOn: x.micOn,
				cameraOn: x.cameraOn
			},
			...u ? {
				onCallStarted: (e) => b("started", e),
				onCallEnded: (e) => b("ended", e),
				onCallMissed: (e) => b("missed", e)
			} : {}
		}), k = J(O);
		k.current = O;
		let [A, j] = Y(null), [M, N] = Y(null), P = W((e, t, n) => {
			let r = xt(p);
			if (!it(r, e)) {
				S(r), N({ run: t });
				return;
			}
			j((i) => i ?? {
				kind: e,
				run: t,
				...n ? { cancel: n } : {},
				initial: r
			});
		}, [p]), ie = W((e, t) => rt("start", k.current.phase, !!k.current.call) ? (P("start", (n) => {
			n.start(e, t);
		}), Promise.resolve()) : k.current.start(e, t), [P]), ae = W(() => {
			let e = k.current;
			return rt("rejoin", e.phase, !!e.call) ? (P("join", (e) => {
				e.rejoin();
			}), Promise.resolve()) : e.rejoin();
		}, [P]), oe = W(() => {
			j((e) => e ?? {
				kind: "check",
				run: () => {},
				initial: at(xt(p))
			});
		}, [p]), F = q(() => ({
			...O,
			start: ie,
			rejoin: ae
		}), [
			O,
			ie,
			ae
		]);
		K(() => {
			M && (M.run(k.current), N(null));
		}, [M]), v.current = F.call?.host ?? v.current, F.phase === "idle" && (v.current = null);
		let I = J(F.phase);
		I.current = F.phase;
		let L = J(null), R = J(null), se = W((e, t) => {
			if (_.current) return;
			let n = I.current;
			(n === "idle" || n === "ringing") && (L.current = t ?? null, R.current = e.lobbyName, g((t) => t && t.lobbyName === e.lobbyName && t.title === e.title && t.channel === e.channel && t.startBlockedReason === e.startBlockedReason ? t : e));
		}, []), z = W((e) => {
			if (_.current) return;
			let t = I.current;
			(t === "idle" || t === "ringing") && R.current === e && (R.current = null, L.current = null, g((t) => t && t.lobbyName === e ? null : t));
		}, []), ce = W(() => {
			L.current?.start();
		}, []), le = J(l);
		le.current = l;
		let B = o.useIncomingConversationCalls({
			gateway: i,
			self: {
				userId: e?.userId ?? null,
				...e ? { displayName: e.displayName } : {}
			},
			onAccept: ((e) => {
				_.current = e, R.current = e.lobbyName, L.current = null, g({
					lobbyName: e.lobbyName,
					title: e.callerName,
					channel: e.channel
				}), le.current?.(e);
			})
		}), ue = J(null);
		K(() => {
			let e = _.current;
			!e || h?.lobbyName !== e.lobbyName || ue.current !== e.callId && (ue.current = e.callId, P("accept", (t) => {
				_.current = null, t.accept(e);
			}, () => {
				_.current = null, B.decline(e), z(e.lobbyName);
			}));
		}, [
			h,
			P,
			B,
			z
		]);
		let de = yt({
			gatewayConfigured: a,
			platformApiUrl: n,
			signedIn: !!e,
			connectionState: c
		}), fe = q(() => e ? {
			userId: e.userId,
			displayName: e.displayName
		} : null, [e?.userId, e?.displayName]), V = h && Ze(O.phase, !0) && O.call ? h.lobbyName : null, H = O.call?.callId ?? null;
		K(() => {
			w((e) => V ? e && e.lobbyName === V && e.callId === H ? e : {
				lobbyName: V,
				callId: H
			} : null);
		}, [V, H]);
		let pe = q(() => ({
			call: F,
			lobby: h,
			bind: se,
			unbind: z,
			startBound: h && L.current ? ce : null,
			self: fe,
			tenant: t,
			gatewayConfigured: a,
			connectionState: c,
			platformApiUrl: n,
			unavailableReason: de,
			checkDevices: oe,
			meeting: D
		}), [
			F,
			h,
			se,
			z,
			ce,
			fe,
			t,
			a,
			c,
			n,
			de,
			oe,
			D
		]), U = B.rings[0] ?? null;
		return /* @__PURE__ */ Z(s.Provider, {
			value: pe,
			children: [
				m,
				A && /* @__PURE__ */ X(f, {
					kind: A.kind,
					title: h?.title ?? "this huddle",
					selfName: e?.displayName ?? "",
					selfAvatarUrl: e?.avatarUrl,
					initial: A.initial,
					onCancel: () => {
						let e = A;
						j(null), e.cancel?.();
					},
					onJoin: (e, t) => {
						let n = A;
						St(p, e), k.current.devices.set({
							...k.current.devices.prefs,
							...t
						}), j(null), n.kind !== "check" && (S(e), N({ run: n.run }));
					}
				}),
				U && /* @__PURE__ */ X(re, {
					ring: U,
					onAccept: () => B.accept(U),
					onDecline: () => B.decline(U)
				})
			]
		});
	}
	function m({ children: e }) {
		let t = G(s), [n, r] = Y(!1), i = !!t?.lobby && Ze(t.call.phase, !0);
		K(() => {
			r(i);
		}, [i]);
		let a = q(() => ({
			open: i && n,
			setOpen: r,
			toggle: () => r((e) => !e)
		}), [i, n]);
		return /* @__PURE__ */ X(l.Provider, {
			value: a,
			children: e
		});
	}
	function h({ scopeKey: e, videoUrl: t, children: n, ...r }) {
		return /* @__PURE__ */ X(g, {
			videoUrl: t,
			...r,
			children: n
		}, e);
	}
	function g({ videoUrl: e, children: t, ...n }) {
		let r = J(null);
		e && !r.current && (r.current = e);
		let [i] = Y(() => new Je());
		return /* @__PURE__ */ X(d, {
			baseUrl: r.current ?? "",
			getAuthToken: dt,
			children: /* @__PURE__ */ X(p, {
				...n,
				children: /* @__PURE__ */ X(c.Provider, {
					value: i,
					children: /* @__PURE__ */ X(m, { children: t })
				})
			})
		});
	}
	function _() {
		return G(s);
	}
	function v() {
		return G(l);
	}
	function y(e, t) {
		let n = G(c), r = n ? e(n) : t;
		return We(n?.subscribe ?? ft, r, r);
	}
	function b() {
		return y((e) => e.placement, mt);
	}
	function S() {
		return y((e) => e.pageClaimed, ht);
	}
	function C(e, t, n = !0, r = {}) {
		let i = G(c), a = !!r.compact, o = JSON.stringify(r.documents ?? []), s = q(() => JSON.parse(o), [o]);
		Ue(() => i && e && n ? i.claim(e, t, {
			compact: a,
			documents: s
		}) : void 0, [
			i,
			e,
			n,
			t,
			a,
			s
		]);
		let l = y((e) => e.current, pt);
		return !!e && l === e;
	}
	function w({ placement: e, compact: t = !1, documents: r, className: i }) {
		let a = G(s), o = G(l), [c, u] = Y(null), d = bt(c), f = !!a?.lobby && Q(a.call.phase, !0), p = e === "composer" ? d > 0 : e === "pane" || f && !!o?.open && d > 0, m = e === "composer" && (t || Xe(d)), h = C(c, e, p, {
			compact: m,
			...r ? { documents: r } : {}
		});
		return /* @__PURE__ */ X(n, {
			ref: u,
			gap: "none",
			className: i ?? (e === "composer" ? "min-w-0" : "shrink-0 min-w-0"),
			"aria-label": "Huddle",
			"data-testid": e === "composer" ? "composer-call-dock" : e === "page" ? "page-call-block" : e === "block" ? "shell-call-block" : "call-block-pane",
			"data-holds-media": h ? "true" : "false",
			...e === "composer" ? { "data-compact": m ? "true" : "false" } : {}
		});
	}
	function T(e, t) {
		let n = G(s), r = n?.bind, i = n?.unbind, a = J(() => {});
		a.current = t ?? (() => {});
		let o = q(() => ({ start: () => a.current() }), []), c = e?.lobbyName ?? null, l = e?.title ?? "", u = e?.channel ?? null, d = e?.startBlockedReason;
		K(() => {
			r && c && r({
				lobbyName: c,
				title: l,
				channel: u,
				...d ? { startBlockedReason: d } : {}
			}, o);
		}, [
			r,
			c,
			l,
			u,
			d,
			o
		]), K(() => {
			if (!(!i || !c)) return () => i(c);
		}, [i, c]);
		let f = !!n && !!c && n.lobby?.lobbyName === c;
		return {
			here: f,
			live: f && !!n && n.call.phase === "idle" && !!n.call.call
		};
	}
	function E(e, t = {}) {
		let n = G(s), r = typeof e == "string" || e === null ? [e] : e, i = r.find((e) => !!e) ?? null, a = t.bind ?? null, o = a ? a.lobbyName === void 0 ? i : a.lobbyName : null, c = a ? a.blockedReason ?? n?.unavailableReason ?? void 0 : void 0, l = T(a && o ? {
			lobbyName: o,
			title: a.title,
			channel: a.channel === void 0 ? o : a.channel,
			...c ? { startBlockedReason: c } : {}
		} : null, () => {
			if (!(c || !n)) {
				if (a?.start) {
					a.start();
					return;
				}
				n.lobby?.lobbyName === o && et(n.call);
			}
		}), u = t.enabled !== !1 && Qe(n?.lobby ?? null, n?.call.phase ?? "idle", r);
		return {
			block: u ? /* @__PURE__ */ X(w, {
				placement: "composer",
				compact: !!t.compact,
				...t.documents ? { documents: t.documents } : {}
			}) : void 0,
			holds: u,
			...l
		};
	}
	function ee({ id: e, onOpenPeople: t, onOpenDocument: r, overlay: i, dockTestId: a }) {
		let o = G(s), c = y((e) => e.current, pt), l = y((e) => e.placement, mt), d = y((e) => e.compact, ht), f = y((e) => e.documents, _t), p = !!o?.lobby && Q(o.call.phase, !0), m = !!c && l === "composer", h = !!c && l !== "pane", g = Ye(c ? l : "footer", d), _ = o?.lobby ?? null, v = p && _ && o ? /* @__PURE__ */ X(u, {
			call: o.call,
			title: _.title,
			onOpenPeople: () => t?.(_, o.tenant),
			selfName: o.self?.displayName ?? "",
			compact: !h || d,
			...h && !d ? { tileSize: "lg" } : {},
			...m && f.length ? {
				documents: f.map((e) => ({
					id: e.id,
					title: e.title
				})),
				onDocumentClick: (e) => {
					let t = f.find((t) => t.id === e);
					t && r?.(t);
				}
			} : {},
			layout: g,
			"data-testid": a ? a(_, o.tenant) : "conversation-call-dock"
		}) : null;
		return v ? c ? Ge(/* @__PURE__ */ Z(n, {
			gap: "none",
			className: "relative",
			"data-testid": "shell-call-media",
			"data-placement": l,
			"data-layout": g,
			"data-expanded": "true",
			children: [v, i]
		}), c) : /* @__PURE__ */ X(n, {
			id: e,
			gap: "none",
			className: "hidden",
			"data-testid": "shell-call-media",
			"data-placement": "footer",
			"data-layout": g,
			"data-expanded": "false",
			children: v
		}) : null;
	}
	return {
		CallHostProvider: h,
		CallMediaOutlet: ee,
		CallBlock: w,
		PreJoinDialog: f,
		ConversationCallDock: u,
		useCallHost: _,
		useCallBlock: E,
		useCallLobby: T,
		useCallMediaPanel: v,
		useCallBlockPlacement: b,
		useCallBlockPageClaimed: S,
		useClaimCallBlock: C
	};
}
//#endregion
export { Ne as ALL_REALTIME_CAPABILITIES, Se as CONVERSATION_CAPABILITY_NAMES, Pe as CapabilityBoundary, z as CapabilityGate, B as DEFAULT_REALTIME_CAPABILITIES, re as IncomingCallToast, l as MAX_ATTACHMENT_BYTES, s as MAX_IMAGE_BYTES, Ae as MeetingChatContext, ye as MeetingChatTargetSwitch, Fe as NetworkErrorBoundary, I as NewHangoutRoomDialog, je as RealtimeIntegrationsProvider, ie as ReconnectingShim, h as WrappedActivityPanel, Ce as WrappedAudioVideoSettingsForm, Ee as WrappedBreakoutRoomBanner, H as WrappedBreakoutRoomsPanel, _e as WrappedCanvasDocument, T as WrappedChatPanel, ze as WrappedConnectionPill, ke as WrappedConversationSurface, O as WrappedCursorOverlay, p as WrappedFileUploadDrop, ne as WrappedHangoutLayout, fe as WrappedMediaEffectsPreviewPanel, P as WrappedMediaEffectsTray, F as WrappedNotificationBell, Le as WrappedNotificationCenter, m as WrappedPresencePanel, Ie as WrappedReactionsOverlay, c as acceptsDocumentImage, me as adaptActivityEvent, d as adaptActivityEvents, ae as adaptBreakoutRooms, U as adaptChatMessage, C as adaptChatMessages, w as adaptFileUploadState, E as adaptFileUploads, g as adaptHangoutParticipant, y as adaptHangoutParticipants, S as adaptMessageReactions, te as adaptNotification, Ve as adaptNotifications, f as adaptPresenceEntry, A as adaptPresenceRoster, v as adaptReaction, k as adaptReactions, de as applyNetworkShim, Te as buildCanvasDocumentExtensions, $e as callCounts, Q as callDrawn, M as canEditCanvasGrant, j as canvasDocumentSaveState, ee as canvasRecoveryKey, R as capabilityNamesFor, Ct as createCallBlockHost, b as createCanvasDocumentPane, x as createConversationCallDock, ge as createConversationFeaturesFor, D as createHangoutRoomRow, Be as createHangoutRoomsSection, we as createRealtimeCapabilityProvider, be as createRealtimeIntegrations, V as createWrappedHangoutRoomsList, pe as createWrappedLVSHangoutLayout, oe as createWrappedStreamStage, u as decodeCanvasRecovery, xe as defaultRoomDrafts, ce as encodeCanvasRecovery, _ as incomingCallTitle, ue as mediaEffectsChangeCount, Oe as meetingChatTitle, L as meetingHandPositions, he as meetingRosterProps, Me as meetingToolbarItems, et as pageHuddleStart, Re as slugifyRoomName, N as useCanvasRecovery, o as useDocumentImageUpload, se as useMeetingChat, ve as useRealtimeCapabilities, De as useRealtimeIntegrations, le as withMeetingHands };
