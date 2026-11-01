import { n as e } from "../Button-C-I3BxWI.js";
import { c as t, l as n, n as r } from "../Text-DqNdYJ7p.js";
import { t as i } from "../Modal-PO0F6rAp.js";
import { n as a } from "../Slider-DEbQCKD1.js";
import { n as o, r as s } from "../RecordingConsentNotice-D7FRgOCP.js";
import { i as c, n as l, r as u, t as d } from "../useDocumentImageUpload-CmMHKE9G.js";
import { $ as f, A as p, B as m, C as h, D as g, E as _, F as v, G as y, H as b, I as x, J as S, K as C, L as w, M as T, N as E, O as D, P as O, Q as k, R as A, S as ee, St as te, T as ne, U as re, V as j, W as ie, X as M, Y as N, Z as P, _ as ae, _t as oe, a as F, at as se, b as ce, bt as le, c as I, ct as ue, d as L, dt as R, et as de, f as z, ft as fe, g as pe, gt as B, h as me, ht as he, i as ge, it as V, j as _e, k as ve, l as H, lt as U, m as ye, mt as be, n as xe, nt as Se, o as W, ot as Ce, p as we, pt as Te, q as Ee, r as De, rt as Oe, s as ke, st as Ae, t as je, tt as Me, u as Ne, ut as Pe, v as Fe, vt as Ie, w as Le, x as Re, xt as ze, y as Be, yt as Ve, z as He } from "../meeting-DMD4-G4G.js";
import { createContext as Ue, useCallback as G, useContext as K, useEffect as q, useLayoutEffect as We, useMemo as J, useRef as Y, useState as X, useSyncExternalStore as Ge } from "react";
import { jsx as Z, jsxs as Q } from "react/jsx-runtime";
import { createPortal as Ke } from "react-dom";
//#region src/integrations/realtime/callBlockModel.ts
var qe = [], Je = [
	"stage",
	"composer",
	"page",
	"block",
	"pane"
], Ye = class {
	claims = [];
	listeners = /* @__PURE__ */ new Set();
	claim(e, t = "page", n = {}) {
		let r = Symbol("call-block-claim");
		return this.claims = [...this.claims, {
			token: r,
			target: e,
			placement: t,
			compact: !!n.compact,
			documents: n.documents ?? qe
		}], this.emit(), () => {
			let e = this.claims.length;
			this.claims = this.claims.filter((e) => e.token !== r), this.claims.length !== e && this.emit();
		};
	}
	top() {
		for (let e of Je) for (let t = this.claims.length - 1; t >= 0; --t) if (this.claims[t].placement === e) return this.claims[t];
		return null;
	}
	current = () => this.top()?.target ?? null;
	placement = () => this.top()?.placement ?? "footer";
	compact = () => this.top()?.compact ?? !1;
	documents = () => this.top()?.documents ?? qe;
	pageClaimed = () => this.claims.some((e) => e.placement !== "pane");
	subscribe = (e) => (this.listeners.add(e), () => {
		this.listeners.delete(e);
	});
	emit() {
		for (let e of this.listeners) e();
	}
};
function Xe(e, t = !1) {
	return e === "stage" ? "stage" : e === "composer" ? t ? "stack" : "shelf" : e === "pane" ? "grid" : "shelf";
}
function Ze(e) {
	return e > 0 && e < 640;
}
function $(e, t) {
	return t && e !== "idle" && e !== "ringing";
}
function Qe(e, t) {
	return $(e, t) && e !== "ended" && e !== "failed";
}
function $e(e, t, n) {
	return !e || !$(t, !0) ? !1 : n.some((t) => !!t && (t === e.lobbyName || t === e.channel));
}
function et(e) {
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
function tt(e) {
	return e.phase === "idle" && e.call ? (e.rejoin(), "rejoin") : e.phase === "idle" || e.phase === "ended" || e.phase === "failed" ? (e.start([]), "start") : null;
}
var nt = {
	micOn: !0,
	cameraOn: !0,
	remember: !1
}, rt = 1e4;
function it(e) {
	if (!e) return nt;
	try {
		let t = JSON.parse(e);
		return !t || typeof t != "object" ? nt : {
			micOn: typeof t.micOn == "boolean" ? t.micOn : nt.micOn,
			cameraOn: typeof t.cameraOn == "boolean" ? t.cameraOn : nt.cameraOn,
			remember: t.remember === !0
		};
	} catch {
		return nt;
	}
}
function at(e, t, n) {
	return e === "accept" ? "accept" : e === "start" ? t === "idle" || t === "ended" || t === "failed" ? "start" : null : t === "idle" && n ? "join" : null;
}
function ot(e, t) {
	return t === "check" || !e.remember;
}
function st(e) {
	return {
		...e,
		remember: !1
	};
}
function ct(e) {
	return e === "accept" ? rt : null;
}
function lt(e) {
	return {
		micOn: e.micOn,
		cameraOn: e.cameraOn,
		remember: e.remember
	};
}
function ut(e) {
	return Math.max(0, Math.ceil(e / 1e3));
}
//#endregion
//#region src/integrations/realtime/CallBlockHost.tsx
var dt = {
	start: "Start a huddle",
	join: "Join the huddle",
	accept: "Join the huddle",
	check: "Check your devices"
}, ft = "__unbound__", pt = () => "", mt = () => () => {}, ht = () => null, gt = () => "footer", _t = () => !1, vt = [], yt = () => vt, bt = "ui.call-prejoin.v1";
function xt(e) {
	return e.gatewayConfigured ? e.platformApiUrl ? e.signedIn ? e.connectionState === "connected" ? null : "Connecting to the realtime gateway…" : "Sign in to start a call" : "Calls need platform-api — the middleware returned no platformApiUrl (REALTIME_PLATFORM_PUBLIC_URL) and VITE_PLATFORM_API_URL is not set" : "Calls need the realtime gateway — the middleware returned no gatewayUrl and VITE_GATEWAY_URL is not set";
}
function St(e) {
	let [t, n] = X(0);
	return We(() => {
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
function Ct(e) {
	try {
		return it(window.localStorage.getItem(e));
	} catch {
		return it(null);
	}
}
function wt(e, t) {
	try {
		window.localStorage.setItem(e, JSON.stringify(lt(t)));
	} catch {}
}
function Tt(c) {
	let l = Ue(null), u = Ue(null), d = Ue(null), f = C(c), { LVSProvider: p } = c;
	function m({ kind: o, title: s, selfName: l, selfAvatarUrl: u, initial: d, onJoin: f, onCancel: p }) {
		let [m, h] = X(d), g = c.useMediaDevices({ requestOnMount: !1 }), _ = c.useAudioVideoSettings({
			preview: m.micOn || m.cameraOn,
			previewAudio: m.micOn,
			previewVideo: m.cameraOn
		}), v = ct(o), [y, b] = X(v), x = Y(!1), S = Y({
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
		}, w = Y(C);
		w.current = C;
		let T = Y(!0);
		return q(() => {
			if (T.current) {
				T.current = !1;
				return;
			}
			x.current = !0, b(null);
		}, [m, _.settings]), q(() => {
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
		}, [v]), /* @__PURE__ */ Z(i, {
			open: !0,
			onClose: p,
			title: dt[o],
			maxWidth: 900,
			rawChildren: !0,
			cardClassName: "flex max-h-[88vh] flex-col overflow-hidden border border-border border-t-4 border-t-primary",
			backdropTestId: "prejoin-backdrop",
			footer: /* @__PURE__ */ Q(t, {
				gap: "sm",
				justify: "end",
				children: [/* @__PURE__ */ Z(e, {
					variant: "secondary",
					onClick: p,
					"data-testid": "prejoin-cancel",
					children: o === "accept" ? "Decline" : "Cancel"
				}), /* @__PURE__ */ Z(e, {
					onClick: C,
					"data-testid": "prejoin-join",
					children: y === null ? o === "check" ? "Save" : "Join" : `Join as last time (${ut(y)})`
				})]
			}),
			children: /* @__PURE__ */ Q(n, {
				gap: "md",
				className: "min-h-0 overflow-y-auto",
				"data-testid": "prejoin-dialog",
				children: [
					/* @__PURE__ */ Q(t, {
						justify: "between",
						align: "center",
						gap: "md",
						className: "rounded-md border border-border bg-surface-panel px-3 py-2",
						children: [/* @__PURE__ */ Z(r, {
							size: "sm",
							weight: "semibold",
							children: s
						}), /* @__PURE__ */ Q(r, {
							size: "xs",
							tone: "secondary",
							children: ["Joining as ", l]
						})]
					}),
					/* @__PURE__ */ Z(we, {
						devices: g,
						settings: _,
						cameraOn: m.cameraOn,
						selfName: l,
						selfAvatarUrl: u,
						layout: "prejoin",
						"data-testid": "prejoin-devices"
					}),
					/* @__PURE__ */ Q(t, {
						gap: "md",
						align: "center",
						children: [
							/* @__PURE__ */ Z(a, {
								checked: m.micOn,
								onChange: (e) => h((t) => ({
									...t,
									micOn: e
								})),
								"aria-label": "Join with microphone on",
								"data-testid": "prejoin-mic"
							}),
							/* @__PURE__ */ Z(r, {
								size: "sm",
								children: m.micOn ? "Microphone on" : "Microphone off"
							}),
							/* @__PURE__ */ Z(a, {
								checked: m.cameraOn,
								onChange: (e) => h((t) => ({
									...t,
									cameraOn: e
								})),
								"aria-label": "Join with camera on",
								"data-testid": "prejoin-camera"
							}),
							/* @__PURE__ */ Z(r, {
								size: "sm",
								children: m.cameraOn ? "Camera on" : "Camera off"
							})
						]
					}),
					/* @__PURE__ */ Q(t, {
						gap: "sm",
						align: "center",
						children: [/* @__PURE__ */ Z(a, {
							checked: m.remember,
							onChange: (e) => h((t) => ({
								...t,
								remember: e
							})),
							"aria-label": "Remember and skip this check next time",
							"data-testid": "prejoin-remember"
						}), /* @__PURE__ */ Z(r, {
							size: "sm",
							children: "Skip device setup next time"
						})]
					})
				]
			})
		});
	}
	function h({ self: e, tenant: t, platformApiUrl: n, getIdToken: r, gateway: i, gatewayConfigured: a, connectionState: u, onAccept: d, onCallEvent: f, nameFor: p, recordingConsent: h, meeting: g, preJoinStorageKey: _ = bt, children: v }) {
		let [y, b] = X(null), x = Y(null), S = Y(null), C = Y(f);
		C.current = f;
		let w = (t, n) => {
			C.current?.(t, n, {
				host: S.current,
				selfId: e?.userId ?? ""
			});
		}, [T, E] = X(() => Ct(_)), [D, O] = X(null), k = g && c.useMeeting && D && (!g.enabledFor || g.enabledFor(D.lobbyName)) ? D.lobbyName : null, A = i, ee = J(() => A?.onMessage ? {
			send: (e) => (A.send ?? A.sendMessage)?.call(A, e),
			onMessage: (e) => A.onMessage(e)
		} : void 0, [A]), te = k && g && g.chatChannelFor ? g.chatChannelFor(k, D?.callId ?? null) ?? void 0 : void 0, ne = c.useMeeting ? c.useMeeting(k, {
			enabled: !!k,
			socket: ee,
			roleKey: D ? `${D.callId ?? ""}:${D.phase}` : null,
			...te ? { chatChannel: te } : {}
		}) : null, re = k && ne ? ne : null, j = c.useConversationCall({
			lobbyName: y?.lobbyName ?? ft,
			...re?.activeLobby ? { mediaLobby: re.activeLobby } : {},
			channel: y?.channel ?? null,
			self: e ?? {
				userId: "",
				displayName: ""
			},
			platformApi: {
				baseUrl: n ?? "",
				getIdToken: r
			},
			gateway: i,
			discover: !!y && a,
			initialMedia: {
				micOn: T.micOn,
				cameraOn: T.cameraOn
			},
			...p ? { nameFor: p } : {},
			...f ? {
				onCallStarted: (e) => w("started", e),
				onCallEnded: (e) => w("ended", e),
				onCallMissed: (e) => w("missed", e)
			} : {}
		}), M = Y(j);
		M.current = j;
		let [N, P] = X(null), [ae, oe] = X(null), F = G((e, t, n) => {
			let r = Ct(_);
			if (!ot(r, e)) {
				E(r), oe({ run: t });
				return;
			}
			P((i) => i ?? {
				kind: e,
				run: t,
				...n ? { cancel: n } : {},
				initial: r
			});
		}, [_]), se = G((e, t) => at("start", M.current.phase, !!M.current.call) ? (F("start", (n) => {
			n.start(e, t);
		}), Promise.resolve()) : M.current.start(e, t), [F]), ce = G((e) => {
			let t = M.current;
			return at("rejoin", t.phase, !!t.call) ? (F("join", (t) => {
				t.rejoin(e);
			}), Promise.resolve()) : t.rejoin(e);
		}, [F]), le = G(() => {
			P((e) => e ?? {
				kind: "check",
				run: () => {},
				initial: st(Ct(_))
			});
		}, [_]), I = J(() => ({
			...j,
			start: se,
			rejoin: ce
		}), [
			j,
			se,
			ce
		]);
		q(() => {
			ae && (ae.run(M.current), oe(null));
		}, [ae]), S.current = I.call?.host ?? S.current, I.phase === "idle" && (S.current = null);
		let ue = Y(I.phase);
		ue.current = I.phase;
		let L = Y(null), R = Y(null), de = G((e, t) => {
			if (x.current) return;
			let n = ue.current;
			(n === "idle" || n === "ringing") && (L.current = t ?? null, R.current = e.lobbyName, b((t) => t && t.lobbyName === e.lobbyName && t.title === e.title && t.channel === e.channel && t.startBlockedReason === e.startBlockedReason ? t : e));
		}, []), z = G((e) => {
			if (x.current) return;
			let t = ue.current;
			(t === "idle" || t === "ringing") && R.current === e && (R.current = null, L.current = null, b((t) => t && t.lobbyName === e ? null : t));
		}, []), fe = G(() => {
			L.current?.start();
		}, []), pe = Y(d);
		pe.current = d;
		let B = c.useIncomingConversationCalls({
			gateway: i,
			self: {
				userId: e?.userId ?? null,
				...e ? { displayName: e.displayName } : {}
			},
			onAccept: ((e) => {
				x.current = e, R.current = e.lobbyName, L.current = null, b({
					lobbyName: e.lobbyName,
					title: e.callerName,
					channel: e.channel
				}), pe.current?.(e);
			})
		}), me = Y(null);
		q(() => {
			let e = x.current;
			!e || y?.lobbyName !== e.lobbyName || me.current !== e.callId && (me.current = e.callId, F("accept", (t) => {
				x.current = null, t.accept(e);
			}, () => {
				x.current = null, B.decline(e), z(e.lobbyName);
			}));
		}, [
			y,
			F,
			B,
			z
		]);
		let he = xt({
			gatewayConfigured: a,
			platformApiUrl: n,
			signedIn: !!e,
			connectionState: u
		}), ge = J(() => e ? {
			userId: e.userId,
			displayName: e.displayName
		} : null, [e?.userId, e?.displayName]), V = y && Qe(j.phase, !0) && j.call ? y.lobbyName : null, _e = j.call?.callId ?? null, ve = V ? String(j.phase) : "";
		q(() => {
			O((e) => V ? e && e.lobbyName === V && e.callId === _e && e.phase === ve ? e : {
				lobbyName: V,
				callId: _e,
				phase: ve
			} : null);
		}, [
			V,
			_e,
			ve
		]);
		let H = h !== !1 && $(I.phase, !0) ? I.recording ?? null : null, U = s(H?.enabled ? `call-recording:${H.sessionId}` : null), ye = h ? h.privacyHref : void 0, be = h ? h.privacyLabel : void 0, xe = J(() => H?.enabled && !U.dismissed ? /* @__PURE__ */ Z(o, {
			open: !0,
			kind: "recording",
			placement: "line",
			onDismiss: U.dismiss,
			...ye ? { privacyHref: ye } : {},
			...be ? { privacyLabel: be } : {}
		}) : null, [
			H?.enabled,
			U.dismissed,
			U.dismiss,
			ye,
			be
		]), Se = J(() => ({
			call: I,
			recordingNote: xe,
			lobby: y,
			bind: de,
			unbind: z,
			startBound: y && L.current ? fe : null,
			self: ge,
			tenant: t,
			gatewayConfigured: a,
			connectionState: u,
			platformApiUrl: n,
			unavailableReason: he,
			checkDevices: le,
			meeting: re
		}), [
			I,
			xe,
			y,
			de,
			z,
			fe,
			ge,
			t,
			a,
			u,
			n,
			he,
			le,
			re
		]), W = B.rings[0] ?? null;
		return /* @__PURE__ */ Q(l.Provider, {
			value: Se,
			children: [
				v,
				N && /* @__PURE__ */ Z(m, {
					kind: N.kind,
					title: y?.title ?? "this huddle",
					selfName: e?.displayName ?? "",
					selfAvatarUrl: e?.avatarUrl,
					initial: N.initial,
					onCancel: () => {
						let e = N;
						P(null), e.cancel?.();
					},
					onJoin: (e, t) => {
						let n = N;
						wt(_, e), M.current.devices.set({
							...M.current.devices.prefs,
							...t
						}), P(null), n.kind !== "check" && (E(e), oe({ run: n.run }));
					}
				}),
				W && /* @__PURE__ */ Z(ie, {
					ring: W,
					onAccept: () => B.accept(W),
					onDecline: () => B.decline(W)
				})
			]
		});
	}
	function g({ children: e }) {
		let t = K(l), [n, r] = X(!1), i = !!t?.lobby && Qe(t.call.phase, !0);
		q(() => {
			r(i);
		}, [i]);
		let a = J(() => ({
			open: i && n,
			setOpen: r,
			toggle: () => r((e) => !e)
		}), [i, n]);
		return /* @__PURE__ */ Z(d.Provider, {
			value: a,
			children: e
		});
	}
	function _({ scopeKey: e, videoUrl: t, children: n, ...r }) {
		return /* @__PURE__ */ Z(v, {
			videoUrl: t,
			...r,
			children: n
		}, e);
	}
	function v({ videoUrl: e, children: t, ...n }) {
		let r = Y(null);
		e && !r.current && (r.current = e);
		let [i] = X(() => new Ye());
		return /* @__PURE__ */ Z(p, {
			baseUrl: r.current ?? "",
			getAuthToken: pt,
			children: /* @__PURE__ */ Z(h, {
				...n,
				children: /* @__PURE__ */ Z(u.Provider, {
					value: i,
					children: /* @__PURE__ */ Z(g, { children: t })
				})
			})
		});
	}
	function y() {
		return K(l);
	}
	function b() {
		return K(d);
	}
	function x(e, t) {
		let n = K(u), r = n ? e(n) : t;
		return Ge(n?.subscribe ?? mt, r, r);
	}
	function S() {
		return x((e) => e.placement, gt);
	}
	function w() {
		return x((e) => e.pageClaimed, _t);
	}
	function T(e, t, n = !0, r = {}) {
		let i = K(u), a = !!r.compact, o = JSON.stringify(r.documents ?? []), s = J(() => JSON.parse(o), [o]);
		We(() => i && e && n ? i.claim(e, t, {
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
		let c = x((e) => e.current, ht);
		return !!e && c === e;
	}
	function E({ placement: e, compact: t = !1, documents: r, className: i }) {
		let a = K(l), o = K(d), [s, c] = X(null), u = St(s), f = !!a?.lobby && $(a.call.phase, !0), p = e === "stage" ? f && u > 0 : e === "composer" ? u > 0 : e === "pane" || f && !!o?.open && u > 0, m = e === "composer" || e === "stage", h = m && (t || Ze(u)), g = T(s, e, p, {
			compact: h,
			...r ? { documents: r } : {}
		});
		return /* @__PURE__ */ Z(n, {
			ref: c,
			gap: "none",
			className: i ?? (e === "composer" ? "min-w-0" : "shrink-0 min-w-0"),
			"aria-label": "Huddle",
			"data-testid": e === "stage" ? "call-stage" : e === "composer" ? "composer-call-dock" : e === "page" ? "page-call-block" : e === "block" ? "shell-call-block" : "call-block-pane",
			"data-holds-media": g ? "true" : "false",
			...m ? { "data-compact": h ? "true" : "false" } : {}
		});
	}
	function D(e, t) {
		let n = K(l), r = n?.bind, i = n?.unbind, a = Y(() => {});
		a.current = t ?? (() => {});
		let o = J(() => ({ start: () => a.current() }), []), s = e?.lobbyName ?? null, c = e?.title ?? "", u = e?.channel ?? null, d = e?.startBlockedReason;
		q(() => {
			r && s && r({
				lobbyName: s,
				title: c,
				channel: u,
				...d ? { startBlockedReason: d } : {}
			}, o);
		}, [
			r,
			s,
			c,
			u,
			d,
			o
		]), q(() => {
			if (!(!i || !s)) return () => i(s);
		}, [i, s]);
		let f = !!n && !!s && n.lobby?.lobbyName === s;
		return {
			here: f,
			live: f && !!n && n.call.phase === "idle" && !!n.call.call
		};
	}
	function O(e, t = {}) {
		let n = K(l), r = typeof e == "string" || e === null ? [e] : e, i = r.find((e) => !!e) ?? null, a = t.bind ?? null, o = a ? a.lobbyName === void 0 ? i : a.lobbyName : null, s = a ? a.blockedReason ?? n?.unavailableReason ?? void 0 : void 0, c = D(a && o ? {
			lobbyName: o,
			title: a.title,
			channel: a.channel === void 0 ? o : a.channel,
			...s ? { startBlockedReason: s } : {}
		} : null, () => {
			if (!(s || !n)) {
				if (a?.start) {
					a.start();
					return;
				}
				n.lobby?.lobbyName === o && tt(n.call);
			}
		}), u = t.enabled !== !1 && $e(n?.lobby ?? null, n?.call.phase ?? "idle", r);
		return {
			block: u ? /* @__PURE__ */ Z(E, {
				placement: "composer",
				compact: !!t.compact,
				...t.documents ? { documents: t.documents } : {}
			}) : void 0,
			holds: u,
			...c
		};
	}
	function k({ id: e, onOpenPeople: t, onOpenDocument: r, overlay: i, header: a, extras: o, notice: s, recordingConsent: c, dockTestId: u }) {
		let d = K(l), p = x((e) => e.current, ht), m = x((e) => e.placement, gt), h = x((e) => e.compact, _t), g = x((e) => e.documents, yt), _ = !!d?.lobby && $(d.call.phase, !0), v = !!p && m === "composer", y = !!p && m !== "pane", b = Xe(p ? m : "footer", h), S = d?.lobby ?? null, C = d?.meeting?.hands, w = J(() => {
			if (!C || C.length === 0) return;
			let e = new Map(C.map((e, t) => [e.userId, t + 1]));
			return (t) => e.get(t);
		}, [C]), T = !!p && a != null && !!d?.meeting, E = c === !1 || T ? null : d?.recordingNote ?? null, D = E && s !== void 0 ? /* @__PURE__ */ Q(n, {
			gap: "xs",
			children: [E, s]
		}) : E ?? s, O = _ && S && d ? /* @__PURE__ */ Z(f, {
			call: d.call,
			title: S.title,
			onOpenPeople: () => t?.(S, d.tenant),
			selfName: d.self?.displayName ?? "",
			compact: !y || h,
			...y && !h ? { tileSize: "lg" } : {},
			...v && g.length ? {
				documents: g.map((e) => ({
					id: e.id,
					title: e.title
				})),
				onDocumentClick: (e) => {
					let t = g.find((t) => t.id === e);
					t && r?.(t);
				}
			} : {},
			layout: b,
			...w ? { handFor: w } : {},
			...o === void 0 ? {} : { extras: o },
			...D == null ? {} : { notice: D },
			"data-testid": u ? u(S, d.tenant) : "conversation-call-dock"
		}) : null;
		return O ? p ? Ke(/* @__PURE__ */ Q(n, {
			gap: "none",
			className: "relative",
			"data-testid": "shell-call-media",
			"data-placement": m,
			"data-layout": b,
			"data-expanded": "true",
			children: [
				a,
				O,
				i
			]
		}), p) : /* @__PURE__ */ Z(n, {
			id: e,
			gap: "none",
			className: "hidden",
			"data-testid": "shell-call-media",
			"data-placement": "footer",
			"data-layout": b,
			"data-expanded": "false",
			children: O
		}) : null;
	}
	return {
		CallHostProvider: _,
		CallMediaOutlet: k,
		CallBlock: E,
		PreJoinDialog: m,
		ConversationCallDock: f,
		useCallHost: y,
		useCallBlock: O,
		useCallLobby: D,
		useCallMediaPanel: b,
		useCallBlockPlacement: S,
		useCallBlockPageClaimed: w,
		useClaimCallBlock: T
	};
}
//#endregion
export { Pe as ALL_REALTIME_CAPABILITIES, Ce as CONVERSATION_CAPABILITY_NAMES, Fe as CapabilityBoundary, R as CapabilityGate, fe as DEFAULT_REALTIME_CAPABILITIES, ie as IncomingCallToast, d as MAX_ATTACHMENT_BYTES, l as MAX_IMAGE_BYTES, je as MeetingChatContext, xe as MeetingChatTargetSwitch, Ie as NetworkErrorBoundary, le as NewHangoutRoomDialog, Me as RealtimeIntegrationsProvider, oe as ReconnectingShim, _ as WrappedActivityPanel, we as WrappedAudioVideoSettingsForm, De as WrappedBreakoutRoomBanner, ge as WrappedBreakoutRoomsPanel, ye as WrappedCanvasDocument, D as WrappedChatPanel, Be as WrappedConnectionPill, Ae as WrappedConversationSurface, ne as WrappedCursorOverlay, h as WrappedFileUploadDrop, ee as WrappedHangoutLayout, me as WrappedMediaEffectsPreviewPanel, ae as WrappedMediaEffectsTray, ce as WrappedNotificationBell, Re as WrappedNotificationCenter, g as WrappedPresencePanel, Le as WrappedReactionsOverlay, u as acceptsDocumentImage, ve as adaptActivityEvent, p as adaptActivityEvents, F as adaptBreakoutRooms, _e as adaptChatMessage, T as adaptChatMessages, E as adaptFileUploadState, O as adaptFileUploads, v as adaptHangoutParticipant, x as adaptHangoutParticipants, w as adaptMessageReactions, A as adaptNotification, He as adaptNotifications, m as adaptPresenceEntry, j as adaptPresenceRoster, b as adaptReaction, re as adaptReactions, B as applyNetworkShim, Ee as buildCanvasDocumentExtensions, et as callCounts, $ as callDrawn, N as canEditCanvasGrant, M as canvasDocumentSaveState, k as canvasRecoveryKey, ue as capabilityNamesFor, Tt as createCallBlockHost, S as createCanvasDocumentPane, C as createConversationCallDock, U as createConversationFeaturesFor, te as createHangoutRoomRow, Ve as createHangoutRoomsSection, Te as createRealtimeCapabilityProvider, Se as createRealtimeIntegrations, he as createWrappedHangoutRoomsList, V as createWrappedLVSHangoutLayout, se as createWrappedStreamStage, f as decodeCanvasRecovery, W as defaultRoomDrafts, de as encodeCanvasRecovery, y as incomingCallTitle, pe as mediaEffectsChangeCount, ke as meetingChatTitle, I as meetingHandPositions, H as meetingRosterProps, Ne as meetingToolbarItems, tt as pageHuddleStart, ze as slugifyRoomName, P as useCanvasRecovery, c as useDocumentImageUpload, L as useMeetingChat, be as useRealtimeCapabilities, Oe as useRealtimeIntegrations, z as withMeetingHands };
