import { n as e } from "../Button-uREUOWUk.js";
import { c as t, l as n, n as r } from "../Text-KEOV-uPA.js";
import { t as i } from "../Modal-CEiWhFnj.js";
import { n as a } from "../Slider-DEbQCKD1.js";
import { n as o, r as s } from "../RecordingConsentNotice-BlFf60VC.js";
import { i as c, n as l, r as u, t as d } from "../useDocumentImageUpload-DBdEslx6.js";
import { $ as f, A as p, B as m, C as h, D as g, E as _, F as v, G as y, H as b, I as x, J as S, K as C, L as w, M as T, N as E, O as D, P as O, Q as k, R as A, S as j, St as M, T as N, U as P, V as F, W as ee, X as te, Y as ne, Z as I, _ as re, _t as ie, a as ae, at as L, b as oe, bt as R, c as z, ct as se, d as B, dt as ce, et as le, f as V, ft as ue, g as de, gt as fe, h as H, ht as pe, i as me, it as he, j as U, k as ge, l as _e, lt as ve, m as ye, mt as be, n as xe, nt as Se, o as Ce, ot as we, p as Te, pt as Ee, q as De, r as Oe, rt as ke, s as Ae, st as je, t as Me, tt as Ne, u as Pe, ut as Fe, v as Ie, vt as Le, w as Re, x as ze, xt as Be, y as Ve, yt as He, z as Ue } from "../meeting-DaQSNJ_R.js";
import { createContext as We, useCallback as W, useContext as G, useEffect as K, useLayoutEffect as Ge, useMemo as q, useRef as J, useState as Y, useSyncExternalStore as Ke } from "react";
import { jsx as X, jsxs as Z } from "react/jsx-runtime";
import { createPortal as qe } from "react-dom";
//#region src/integrations/realtime/callBlockModel.ts
var Je = [], Ye = [
	"composer",
	"page",
	"block",
	"pane"
], Xe = class {
	claims = [];
	listeners = /* @__PURE__ */ new Set();
	claim(e, t = "page", n = {}) {
		let r = Symbol("call-block-claim");
		return this.claims = [...this.claims, {
			token: r,
			target: e,
			placement: t,
			compact: !!n.compact,
			documents: n.documents ?? Je
		}], this.emit(), () => {
			let e = this.claims.length;
			this.claims = this.claims.filter((e) => e.token !== r), this.claims.length !== e && this.emit();
		};
	}
	top() {
		for (let e of Ye) for (let t = this.claims.length - 1; t >= 0; --t) if (this.claims[t].placement === e) return this.claims[t];
		return null;
	}
	current = () => this.top()?.target ?? null;
	placement = () => this.top()?.placement ?? "footer";
	compact = () => this.top()?.compact ?? !1;
	documents = () => this.top()?.documents ?? Je;
	pageClaimed = () => this.claims.some((e) => e.placement !== "pane");
	subscribe = (e) => (this.listeners.add(e), () => {
		this.listeners.delete(e);
	});
	emit() {
		for (let e of this.listeners) e();
	}
};
function Ze(e, t = !1) {
	return e === "composer" ? t ? "stack" : "shelf" : e === "pane" ? "grid" : "shelf";
}
function Qe(e) {
	return e > 0 && e < 640;
}
function Q(e, t) {
	return t && e !== "idle" && e !== "ringing";
}
function $e(e, t) {
	return Q(e, t) && e !== "ended" && e !== "failed";
}
function et(e, t, n) {
	return !e || !Q(t, !0) ? !1 : n.some((t) => !!t && (t === e.lobbyName || t === e.channel));
}
function tt(e) {
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
function nt(e) {
	return e.phase === "idle" && e.call ? (e.rejoin(), "rejoin") : e.phase === "idle" || e.phase === "ended" || e.phase === "failed" ? (e.start([]), "start") : null;
}
var $ = {
	micOn: !0,
	cameraOn: !0,
	remember: !1
}, rt = 1e4;
function it(e) {
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
	let [t, n] = Y(0);
	return Ge(() => {
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
	let l = We(null), u = We(null), d = We(null), f = C(c), { LVSProvider: p } = c;
	function m({ kind: o, title: s, selfName: l, selfAvatarUrl: u, initial: d, onJoin: f, onCancel: p }) {
		let [m, h] = Y(d), g = c.useMediaDevices({ requestOnMount: !1 }), _ = c.useAudioVideoSettings({
			preview: m.micOn || m.cameraOn,
			previewAudio: m.micOn,
			previewVideo: m.cameraOn
		}), v = ct(o), [y, b] = Y(v), x = J(!1), S = J({
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
			title: dt[o],
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
					children: o === "accept" ? "Decline" : "Cancel"
				}), /* @__PURE__ */ X(e, {
					onClick: C,
					"data-testid": "prejoin-join",
					children: y === null ? o === "check" ? "Save" : "Join" : `Join as last time (${ut(y)})`
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
							children: s
						}), /* @__PURE__ */ Z(r, {
							size: "xs",
							tone: "secondary",
							children: ["Joining as ", l]
						})]
					}),
					/* @__PURE__ */ X(Te, {
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
	function h({ self: e, tenant: t, platformApiUrl: n, getIdToken: r, gateway: i, gatewayConfigured: a, connectionState: o, onAccept: s, onCallEvent: u, nameFor: d, meeting: f, preJoinStorageKey: p = bt, children: h }) {
		let [g, _] = Y(null), v = J(null), y = J(null), b = J(u);
		b.current = u;
		let x = (t, n) => {
			b.current?.(t, n, {
				host: y.current,
				selfId: e?.userId ?? ""
			});
		}, [S, C] = Y(() => Ct(p)), [w, T] = Y(null), E = f && c.useMeeting && w && (!f.enabledFor || f.enabledFor(w.lobbyName)) ? w.lobbyName : null, D = i, O = q(() => D?.onMessage ? {
			send: (e) => (D.send ?? D.sendMessage)?.call(D, e),
			onMessage: (e) => D.onMessage(e)
		} : void 0, [D]), k = E && f && f.chatChannelFor ? f.chatChannelFor(E, w?.callId ?? null) ?? void 0 : void 0, A = c.useMeeting ? c.useMeeting(E, {
			enabled: !!E,
			socket: O,
			roleKey: w ? `${w.callId ?? ""}:${w.phase}` : null,
			...k ? { chatChannel: k } : {}
		}) : null, j = E && A ? A : null, M = c.useConversationCall({
			lobbyName: g?.lobbyName ?? ft,
			...j?.activeLobby ? { mediaLobby: j.activeLobby } : {},
			channel: g?.channel ?? null,
			self: e ?? {
				userId: "",
				displayName: ""
			},
			platformApi: {
				baseUrl: n ?? "",
				getIdToken: r
			},
			gateway: i,
			discover: !!g && a,
			initialMedia: {
				micOn: S.micOn,
				cameraOn: S.cameraOn
			},
			...d ? { nameFor: d } : {},
			...u ? {
				onCallStarted: (e) => x("started", e),
				onCallEnded: (e) => x("ended", e),
				onCallMissed: (e) => x("missed", e)
			} : {}
		}), N = J(M);
		N.current = M;
		let [P, F] = Y(null), [te, ne] = Y(null), I = W((e, t, n) => {
			let r = Ct(p);
			if (!ot(r, e)) {
				C(r), ne({ run: t });
				return;
			}
			F((i) => i ?? {
				kind: e,
				run: t,
				...n ? { cancel: n } : {},
				initial: r
			});
		}, [p]), re = W((e, t) => at("start", N.current.phase, !!N.current.call) ? (I("start", (n) => {
			n.start(e, t);
		}), Promise.resolve()) : N.current.start(e, t), [I]), ie = W(() => {
			let e = N.current;
			return at("rejoin", e.phase, !!e.call) ? (I("join", (e) => {
				e.rejoin();
			}), Promise.resolve()) : e.rejoin();
		}, [I]), ae = W(() => {
			F((e) => e ?? {
				kind: "check",
				run: () => {},
				initial: st(Ct(p))
			});
		}, [p]), L = q(() => ({
			...M,
			start: re,
			rejoin: ie
		}), [
			M,
			re,
			ie
		]);
		K(() => {
			te && (te.run(N.current), ne(null));
		}, [te]), y.current = L.call?.host ?? y.current, L.phase === "idle" && (y.current = null);
		let oe = J(L.phase);
		oe.current = L.phase;
		let R = J(null), z = J(null), se = W((e, t) => {
			if (v.current) return;
			let n = oe.current;
			(n === "idle" || n === "ringing") && (R.current = t ?? null, z.current = e.lobbyName, _((t) => t && t.lobbyName === e.lobbyName && t.title === e.title && t.channel === e.channel && t.startBlockedReason === e.startBlockedReason ? t : e));
		}, []), B = W((e) => {
			if (v.current) return;
			let t = oe.current;
			(t === "idle" || t === "ringing") && z.current === e && (z.current = null, R.current = null, _((t) => t && t.lobbyName === e ? null : t));
		}, []), ce = W(() => {
			R.current?.start();
		}, []), le = J(s);
		le.current = s;
		let V = c.useIncomingConversationCalls({
			gateway: i,
			self: {
				userId: e?.userId ?? null,
				...e ? { displayName: e.displayName } : {}
			},
			onAccept: ((e) => {
				v.current = e, z.current = e.lobbyName, R.current = null, _({
					lobbyName: e.lobbyName,
					title: e.callerName,
					channel: e.channel
				}), le.current?.(e);
			})
		}), ue = J(null);
		K(() => {
			let e = v.current;
			!e || g?.lobbyName !== e.lobbyName || ue.current !== e.callId && (ue.current = e.callId, I("accept", (t) => {
				v.current = null, t.accept(e);
			}, () => {
				v.current = null, V.decline(e), B(e.lobbyName);
			}));
		}, [
			g,
			I,
			V,
			B
		]);
		let de = xt({
			gatewayConfigured: a,
			platformApiUrl: n,
			signedIn: !!e,
			connectionState: o
		}), fe = q(() => e ? {
			userId: e.userId,
			displayName: e.displayName
		} : null, [e?.userId, e?.displayName]), H = g && $e(M.phase, !0) && M.call ? g.lobbyName : null, pe = M.call?.callId ?? null, me = H ? String(M.phase) : "";
		K(() => {
			T((e) => H ? e && e.lobbyName === H && e.callId === pe && e.phase === me ? e : {
				lobbyName: H,
				callId: pe,
				phase: me
			} : null);
		}, [
			H,
			pe,
			me
		]);
		let he = q(() => ({
			call: L,
			lobby: g,
			bind: se,
			unbind: B,
			startBound: g && R.current ? ce : null,
			self: fe,
			tenant: t,
			gatewayConfigured: a,
			connectionState: o,
			platformApiUrl: n,
			unavailableReason: de,
			checkDevices: ae,
			meeting: j
		}), [
			L,
			g,
			se,
			B,
			ce,
			fe,
			t,
			a,
			o,
			n,
			de,
			ae,
			j
		]), U = V.rings[0] ?? null;
		return /* @__PURE__ */ Z(l.Provider, {
			value: he,
			children: [
				h,
				P && /* @__PURE__ */ X(m, {
					kind: P.kind,
					title: g?.title ?? "this huddle",
					selfName: e?.displayName ?? "",
					selfAvatarUrl: e?.avatarUrl,
					initial: P.initial,
					onCancel: () => {
						let e = P;
						F(null), e.cancel?.();
					},
					onJoin: (e, t) => {
						let n = P;
						wt(p, e), N.current.devices.set({
							...N.current.devices.prefs,
							...t
						}), F(null), n.kind !== "check" && (C(e), ne({ run: n.run }));
					}
				}),
				U && /* @__PURE__ */ X(ee, {
					ring: U,
					onAccept: () => V.accept(U),
					onDecline: () => V.decline(U)
				})
			]
		});
	}
	function g({ children: e }) {
		let t = G(l), [n, r] = Y(!1), i = !!t?.lobby && $e(t.call.phase, !0);
		K(() => {
			r(i);
		}, [i]);
		let a = q(() => ({
			open: i && n,
			setOpen: r,
			toggle: () => r((e) => !e)
		}), [i, n]);
		return /* @__PURE__ */ X(d.Provider, {
			value: a,
			children: e
		});
	}
	function _({ scopeKey: e, videoUrl: t, children: n, ...r }) {
		return /* @__PURE__ */ X(v, {
			videoUrl: t,
			...r,
			children: n
		}, e);
	}
	function v({ videoUrl: e, children: t, ...n }) {
		let r = J(null);
		e && !r.current && (r.current = e);
		let [i] = Y(() => new Xe());
		return /* @__PURE__ */ X(p, {
			baseUrl: r.current ?? "",
			getAuthToken: pt,
			children: /* @__PURE__ */ X(h, {
				...n,
				children: /* @__PURE__ */ X(u.Provider, {
					value: i,
					children: /* @__PURE__ */ X(g, { children: t })
				})
			})
		});
	}
	function y() {
		return G(l);
	}
	function b() {
		return G(d);
	}
	function x(e, t) {
		let n = G(u), r = n ? e(n) : t;
		return Ke(n?.subscribe ?? mt, r, r);
	}
	function S() {
		return x((e) => e.placement, gt);
	}
	function w() {
		return x((e) => e.pageClaimed, _t);
	}
	function T(e, t, n = !0, r = {}) {
		let i = G(u), a = !!r.compact, o = JSON.stringify(r.documents ?? []), s = q(() => JSON.parse(o), [o]);
		Ge(() => i && e && n ? i.claim(e, t, {
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
		let a = G(l), o = G(d), [s, c] = Y(null), u = St(s), f = !!a?.lobby && Q(a.call.phase, !0), p = e === "composer" ? u > 0 : e === "pane" || f && !!o?.open && u > 0, m = e === "composer" && (t || Qe(u)), h = T(s, e, p, {
			compact: m,
			...r ? { documents: r } : {}
		});
		return /* @__PURE__ */ X(n, {
			ref: c,
			gap: "none",
			className: i ?? (e === "composer" ? "min-w-0" : "shrink-0 min-w-0"),
			"aria-label": "Huddle",
			"data-testid": e === "composer" ? "composer-call-dock" : e === "page" ? "page-call-block" : e === "block" ? "shell-call-block" : "call-block-pane",
			"data-holds-media": h ? "true" : "false",
			...e === "composer" ? { "data-compact": m ? "true" : "false" } : {}
		});
	}
	function D(e, t) {
		let n = G(l), r = n?.bind, i = n?.unbind, a = J(() => {});
		a.current = t ?? (() => {});
		let o = q(() => ({ start: () => a.current() }), []), s = e?.lobbyName ?? null, c = e?.title ?? "", u = e?.channel ?? null, d = e?.startBlockedReason;
		K(() => {
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
		]), K(() => {
			if (!(!i || !s)) return () => i(s);
		}, [i, s]);
		let f = !!n && !!s && n.lobby?.lobbyName === s;
		return {
			here: f,
			live: f && !!n && n.call.phase === "idle" && !!n.call.call
		};
	}
	function O(e, t = {}) {
		let n = G(l), r = typeof e == "string" || e === null ? [e] : e, i = r.find((e) => !!e) ?? null, a = t.bind ?? null, o = a ? a.lobbyName === void 0 ? i : a.lobbyName : null, s = a ? a.blockedReason ?? n?.unavailableReason ?? void 0 : void 0, c = D(a && o ? {
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
				n.lobby?.lobbyName === o && nt(n.call);
			}
		}), u = t.enabled !== !1 && et(n?.lobby ?? null, n?.call.phase ?? "idle", r);
		return {
			block: u ? /* @__PURE__ */ X(E, {
				placement: "composer",
				compact: !!t.compact,
				...t.documents ? { documents: t.documents } : {}
			}) : void 0,
			holds: u,
			...c
		};
	}
	function k({ id: e, onOpenPeople: t, onOpenDocument: r, overlay: i, header: a, extras: c, notice: u, recordingConsent: d, dockTestId: p }) {
		let m = G(l), h = x((e) => e.current, ht), g = x((e) => e.placement, gt), _ = x((e) => e.compact, _t), v = x((e) => e.documents, yt), y = !!m?.lobby && Q(m.call.phase, !0), b = !!h && g === "composer", S = !!h && g !== "pane", C = Ze(h ? g : "footer", _), w = m?.lobby ?? null, T = m?.meeting?.hands, E = q(() => {
			if (!T || T.length === 0) return;
			let e = new Map(T.map((e, t) => [e.userId, t + 1]));
			return (t) => e.get(t);
		}, [T]), D = y && d !== !1 ? m?.call.recording ?? null : null, O = s(D?.enabled ? `call-recording:${D.sessionId}` : null), k = D?.enabled && !O.dismissed ? /* @__PURE__ */ X(o, {
			open: !0,
			kind: "recording",
			placement: "inline",
			onDismiss: O.dismiss,
			...d && d.privacyHref ? { privacyHref: d.privacyHref } : {},
			...d && d.privacyLabel ? { privacyLabel: d.privacyLabel } : {}
		}) : null, A = k && u !== void 0 ? /* @__PURE__ */ Z(n, {
			gap: "xs",
			children: [k, u]
		}) : k ?? u, j = y && w && m ? /* @__PURE__ */ X(f, {
			call: m.call,
			title: w.title,
			onOpenPeople: () => t?.(w, m.tenant),
			selfName: m.self?.displayName ?? "",
			compact: !S || _,
			...S && !_ ? { tileSize: "lg" } : {},
			...b && v.length ? {
				documents: v.map((e) => ({
					id: e.id,
					title: e.title
				})),
				onDocumentClick: (e) => {
					let t = v.find((t) => t.id === e);
					t && r?.(t);
				}
			} : {},
			layout: C,
			...E ? { handFor: E } : {},
			...c === void 0 ? {} : { extras: c },
			...A == null ? {} : { notice: A },
			"data-testid": p ? p(w, m.tenant) : "conversation-call-dock"
		}) : null;
		return j ? h ? qe(/* @__PURE__ */ Z(n, {
			gap: "none",
			className: "relative",
			"data-testid": "shell-call-media",
			"data-placement": g,
			"data-layout": C,
			"data-expanded": "true",
			children: [
				a,
				j,
				i
			]
		}), h) : /* @__PURE__ */ X(n, {
			id: e,
			gap: "none",
			className: "hidden",
			"data-testid": "shell-call-media",
			"data-placement": "footer",
			"data-layout": C,
			"data-expanded": "false",
			children: j
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
export { Fe as ALL_REALTIME_CAPABILITIES, we as CONVERSATION_CAPABILITY_NAMES, Ie as CapabilityBoundary, ce as CapabilityGate, ue as DEFAULT_REALTIME_CAPABILITIES, ee as IncomingCallToast, d as MAX_ATTACHMENT_BYTES, l as MAX_IMAGE_BYTES, Me as MeetingChatContext, xe as MeetingChatTargetSwitch, Le as NetworkErrorBoundary, R as NewHangoutRoomDialog, Ne as RealtimeIntegrationsProvider, ie as ReconnectingShim, _ as WrappedActivityPanel, Te as WrappedAudioVideoSettingsForm, Oe as WrappedBreakoutRoomBanner, me as WrappedBreakoutRoomsPanel, ye as WrappedCanvasDocument, D as WrappedChatPanel, Ve as WrappedConnectionPill, je as WrappedConversationSurface, N as WrappedCursorOverlay, h as WrappedFileUploadDrop, j as WrappedHangoutLayout, H as WrappedMediaEffectsPreviewPanel, re as WrappedMediaEffectsTray, oe as WrappedNotificationBell, ze as WrappedNotificationCenter, g as WrappedPresencePanel, Re as WrappedReactionsOverlay, u as acceptsDocumentImage, ge as adaptActivityEvent, p as adaptActivityEvents, ae as adaptBreakoutRooms, U as adaptChatMessage, T as adaptChatMessages, E as adaptFileUploadState, O as adaptFileUploads, v as adaptHangoutParticipant, x as adaptHangoutParticipants, w as adaptMessageReactions, A as adaptNotification, Ue as adaptNotifications, m as adaptPresenceEntry, F as adaptPresenceRoster, b as adaptReaction, P as adaptReactions, fe as applyNetworkShim, De as buildCanvasDocumentExtensions, tt as callCounts, Q as callDrawn, ne as canEditCanvasGrant, te as canvasDocumentSaveState, k as canvasRecoveryKey, se as capabilityNamesFor, Tt as createCallBlockHost, S as createCanvasDocumentPane, C as createConversationCallDock, ve as createConversationFeaturesFor, M as createHangoutRoomRow, He as createHangoutRoomsSection, Ee as createRealtimeCapabilityProvider, Se as createRealtimeIntegrations, pe as createWrappedHangoutRoomsList, he as createWrappedLVSHangoutLayout, L as createWrappedStreamStage, f as decodeCanvasRecovery, Ce as defaultRoomDrafts, le as encodeCanvasRecovery, y as incomingCallTitle, de as mediaEffectsChangeCount, Ae as meetingChatTitle, z as meetingHandPositions, _e as meetingRosterProps, Pe as meetingToolbarItems, nt as pageHuddleStart, Be as slugifyRoomName, I as useCanvasRecovery, c as useDocumentImageUpload, B as useMeetingChat, be as useRealtimeCapabilities, ke as useRealtimeIntegrations, V as withMeetingHands };
