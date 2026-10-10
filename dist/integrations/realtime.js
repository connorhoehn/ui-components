import { n as e } from "../Button-C2OEUpX-.js";
import { i as t, r as n } from "../Tabs-DqkWBCTi.js";
import { t as r } from "../Modal-CjgKqXl7.js";
import { n as i } from "../Slider-DEbQCKD1.js";
import { n as a } from "../Text-BA4t3u5l.js";
import { i as o, n as s, r as c, t as l } from "../useDocumentImageUpload-k2Cs0Dzj.js";
import { $ as u, A as d, B as f, C as p, D as m, E as h, F as g, G as _, H as v, I as y, J as b, K as x, L as S, M as C, N as w, O as T, P as E, Q as D, R as O, S as k, T as A, U as j, V as ee, W as M, X as N, Y as P, Z as F, _ as te, a as I, at as ne, b as L, c as R, ct as z, d as B, et as V, f as re, g as H, h as ie, i as ae, it as oe, j as se, k as ce, l as le, lt as ue, m as de, n as fe, nt as pe, o as me, ot as he, p as ge, q as _e, r as ve, rt as ye, s as be, st as xe, t as Se, tt as Ce, u as we, ut as Te, v as Ee, w as De, x as Oe, y as ke, z as Ae } from "../WrappedAudioVideoSettingsForm-C4S5E6YQ.js";
import { createContext as U, useCallback as W, useContext as G, useEffect as K, useLayoutEffect as je, useMemo as q, useRef as J, useState as Y, useSyncExternalStore as Me } from "react";
import { jsx as X, jsxs as Z } from "react/jsx-runtime";
import { createPortal as Ne } from "react-dom";
//#region src/integrations/realtime/callBlockModel.ts
var Pe = [], Fe = [
	"composer",
	"page",
	"block",
	"pane"
], Ie = class {
	claims = [];
	listeners = /* @__PURE__ */ new Set();
	claim(e, t = "page", n = {}) {
		let r = Symbol("call-block-claim");
		return this.claims = [...this.claims, {
			token: r,
			target: e,
			placement: t,
			compact: !!n.compact,
			documents: n.documents ?? Pe
		}], this.emit(), () => {
			let e = this.claims.length;
			this.claims = this.claims.filter((e) => e.token !== r), this.claims.length !== e && this.emit();
		};
	}
	top() {
		for (let e of Fe) for (let t = this.claims.length - 1; t >= 0; --t) if (this.claims[t].placement === e) return this.claims[t];
		return null;
	}
	current = () => this.top()?.target ?? null;
	placement = () => this.top()?.placement ?? "footer";
	compact = () => this.top()?.compact ?? !1;
	documents = () => this.top()?.documents ?? Pe;
	pageClaimed = () => this.claims.some((e) => e.placement !== "pane");
	subscribe = (e) => (this.listeners.add(e), () => {
		this.listeners.delete(e);
	});
	emit() {
		for (let e of this.listeners) e();
	}
};
function Le(e, t = !1) {
	return e === "composer" ? t ? "stack" : "shelf" : e === "pane" ? "grid" : "shelf";
}
function Re(e) {
	return e > 0 && e < 640;
}
function Q(e, t) {
	return t && e !== "idle" && e !== "ringing";
}
function ze(e, t) {
	return Q(e, t) && e !== "ended" && e !== "failed";
}
function Be(e, t, n) {
	return !e || !Q(t, !0) ? !1 : n.some((t) => !!t && (t === e.lobbyName || t === e.channel));
}
function Ve(e) {
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
function He(e) {
	return e.phase === "idle" && e.call ? (e.rejoin(), "rejoin") : e.phase === "idle" || e.phase === "ended" || e.phase === "failed" ? (e.start([]), "start") : null;
}
var $ = {
	micOn: !0,
	cameraOn: !0,
	remember: !1
}, Ue = 1e4;
function We(e) {
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
function Ge(e, t, n) {
	return e === "accept" ? "accept" : e === "start" ? t === "idle" || t === "ended" || t === "failed" ? "start" : null : t === "idle" && n ? "join" : null;
}
function Ke(e, t) {
	return t === "check" || !e.remember;
}
function qe(e) {
	return {
		...e,
		remember: !1
	};
}
function Je(e) {
	return e === "accept" ? Ue : null;
}
function Ye(e) {
	return {
		micOn: e.micOn,
		cameraOn: e.cameraOn,
		remember: e.remember
	};
}
function Xe(e) {
	return Math.max(0, Math.ceil(e / 1e3));
}
//#endregion
//#region src/integrations/realtime/CallBlockHost.tsx
var Ze = {
	start: "Start the huddle",
	join: "Join the huddle",
	accept: "Answer the call",
	check: "Check devices"
}, Qe = "__unbound__", $e = () => "", et = () => () => {}, tt = () => null, nt = () => "footer", rt = () => !1, it = [], at = () => it, ot = "ui.call-prejoin.v1";
function st(e) {
	return e.gatewayConfigured ? e.platformApiUrl ? e.signedIn ? e.connectionState === "connected" ? null : "Connecting to the realtime gateway…" : "Sign in to start a call" : "Calls need platform-api — the middleware returned no platformApiUrl (REALTIME_PLATFORM_PUBLIC_URL) and VITE_PLATFORM_API_URL is not set" : "Calls need the realtime gateway — the middleware returned no gatewayUrl and VITE_GATEWAY_URL is not set";
}
function ct(e) {
	let [t, n] = Y(0);
	return je(() => {
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
function lt(e) {
	try {
		return We(window.localStorage.getItem(e));
	} catch {
		return We(null);
	}
}
function ut(e, t) {
	try {
		window.localStorage.setItem(e, JSON.stringify(Ye(t)));
	} catch {}
}
function dt(o) {
	let s = U(null), c = U(null), l = U(null), u = E(o), { LVSProvider: d } = o;
	function f({ kind: s, title: c, selfName: l, initial: u, onJoin: d, onCancel: f }) {
		let [p, m] = Y(u), h = o.useMediaDevices({ requestOnMount: !1 }), g = o.useAudioVideoSettings({
			preview: p.micOn || p.cameraOn,
			previewAudio: p.micOn,
			previewVideo: p.cameraOn
		}), _ = Je(s), [v, y] = Y(_), b = J(!1), x = J({
			choice: p,
			settings: g.settings
		});
		x.current = {
			choice: p,
			settings: g.settings
		};
		let S = () => {
			let { choice: e, settings: t } = x.current;
			d(e, {
				...t.microphoneId ? { microphoneId: t.microphoneId } : {},
				...t.cameraId ? { cameraId: t.cameraId } : {},
				...t.speakerId ? { speakerId: t.speakerId } : {}
			});
		}, C = J(S);
		C.current = S;
		let w = J(!0);
		return K(() => {
			if (w.current) {
				w.current = !1;
				return;
			}
			b.current = !0, y(null);
		}, [p, g.settings]), K(() => {
			if (_ === null) return;
			let e = Date.now(), t = window.setInterval(() => {
				if (b.current) {
					window.clearInterval(t);
					return;
				}
				let n = _ - (Date.now() - e);
				if (n <= 0) {
					window.clearInterval(t), C.current();
					return;
				}
				y(n);
			}, 250);
			return () => window.clearInterval(t);
		}, [_]), /* @__PURE__ */ X(r, {
			open: !0,
			onClose: f,
			title: `${Ze[s]} — ${c}`,
			maxWidth: 560,
			backdropTestId: "prejoin-backdrop",
			footer: /* @__PURE__ */ Z(n, {
				gap: "sm",
				justify: "end",
				children: [/* @__PURE__ */ X(e, {
					variant: "secondary",
					onClick: f,
					"data-testid": "prejoin-cancel",
					children: s === "accept" ? "Decline" : "Cancel"
				}), /* @__PURE__ */ X(e, {
					onClick: S,
					"data-testid": "prejoin-join",
					children: v === null ? s === "check" ? "Save" : "Join" : `Join as last time (${Xe(v)})`
				})]
			}),
			children: /* @__PURE__ */ Z(t, {
				gap: "md",
				"data-testid": "prejoin-dialog",
				children: [
					/* @__PURE__ */ X(Se, {
						devices: h,
						settings: g,
						cameraOn: p.cameraOn,
						selfName: l,
						"data-testid": "prejoin-devices"
					}),
					/* @__PURE__ */ Z(n, {
						gap: "md",
						align: "center",
						children: [
							/* @__PURE__ */ X(i, {
								checked: p.micOn,
								onChange: (e) => m((t) => ({
									...t,
									micOn: e
								})),
								"aria-label": "Join with microphone on",
								"data-testid": "prejoin-mic"
							}),
							/* @__PURE__ */ X(a, {
								size: "sm",
								children: "Microphone on"
							}),
							/* @__PURE__ */ X(i, {
								checked: p.cameraOn,
								onChange: (e) => m((t) => ({
									...t,
									cameraOn: e
								})),
								"aria-label": "Join with camera on",
								"data-testid": "prejoin-camera"
							}),
							/* @__PURE__ */ X(a, {
								size: "sm",
								children: "Camera on"
							})
						]
					}),
					/* @__PURE__ */ Z(n, {
						gap: "sm",
						align: "center",
						children: [/* @__PURE__ */ X(i, {
							checked: p.remember,
							onChange: (e) => m((t) => ({
								...t,
								remember: e
							})),
							"aria-label": "Remember and skip this check next time",
							"data-testid": "prejoin-remember"
						}), /* @__PURE__ */ X(a, {
							size: "sm",
							children: "Remember these choices and skip this check next time"
						})]
					})
				]
			})
		});
	}
	function p({ self: e, tenant: t, platformApiUrl: n, getIdToken: r, gateway: i, gatewayConfigured: a, connectionState: c, onAccept: l, onCallEvent: u, preJoinStorageKey: d = ot, children: p }) {
		let [m, h] = Y(null), g = J(null), _ = J(null), v = J(u);
		v.current = u;
		let y = (t, n) => {
			v.current?.(t, n, {
				host: _.current,
				selfId: e?.userId ?? ""
			});
		}, [b, x] = Y(() => lt(d)), S = o.useConversationCall({
			lobbyName: m?.lobbyName ?? Qe,
			channel: m?.channel ?? null,
			self: e ?? {
				userId: "",
				displayName: ""
			},
			platformApi: {
				baseUrl: n ?? "",
				getIdToken: r
			},
			gateway: i,
			discover: !!m && a,
			initialMedia: {
				micOn: b.micOn,
				cameraOn: b.cameraOn
			},
			...u ? {
				onCallStarted: (e) => y("started", e),
				onCallEnded: (e) => y("ended", e),
				onCallMissed: (e) => y("missed", e)
			} : {}
		}), w = J(S);
		w.current = S;
		let [T, E] = Y(null), [D, O] = Y(null), k = W((e, t, n) => {
			let r = lt(d);
			if (!Ke(r, e)) {
				x(r), O({ run: t });
				return;
			}
			E((i) => i ?? {
				kind: e,
				run: t,
				...n ? { cancel: n } : {},
				initial: r
			});
		}, [d]), A = W((e, t) => Ge("start", w.current.phase, !!w.current.call) ? (k("start", (n) => {
			n.start(e, t);
		}), Promise.resolve()) : w.current.start(e, t), [k]), j = W(() => {
			let e = w.current;
			return Ge("rejoin", e.phase, !!e.call) ? (k("join", (e) => {
				e.rejoin();
			}), Promise.resolve()) : e.rejoin();
		}, [k]), ee = W(() => {
			E((e) => e ?? {
				kind: "check",
				run: () => {},
				initial: qe(lt(d))
			});
		}, [d]), M = q(() => ({
			...S,
			start: A,
			rejoin: j
		}), [
			S,
			A,
			j
		]);
		K(() => {
			D && (D.run(w.current), O(null));
		}, [D]), _.current = M.call?.host ?? _.current, M.phase === "idle" && (_.current = null);
		let N = J(M.phase);
		N.current = M.phase;
		let P = J(null), F = J(null), te = W((e, t) => {
			if (g.current) return;
			let n = N.current;
			(n === "idle" || n === "ringing") && (P.current = t ?? null, F.current = e.lobbyName, h((t) => t && t.lobbyName === e.lobbyName && t.title === e.title && t.channel === e.channel && t.startBlockedReason === e.startBlockedReason ? t : e));
		}, []), I = W((e) => {
			if (g.current) return;
			let t = N.current;
			(t === "idle" || t === "ringing") && F.current === e && (F.current = null, P.current = null, h((t) => t && t.lobbyName === e ? null : t));
		}, []), ne = W(() => {
			P.current?.start();
		}, []), L = J(l);
		L.current = l;
		let R = o.useIncomingConversationCalls({
			gateway: i,
			self: {
				userId: e?.userId ?? null,
				...e ? { displayName: e.displayName } : {}
			},
			onAccept: ((e) => {
				g.current = e, F.current = e.lobbyName, P.current = null, h({
					lobbyName: e.lobbyName,
					title: e.callerName,
					channel: e.channel
				}), L.current?.(e);
			})
		}), z = J(null);
		K(() => {
			let e = g.current;
			!e || m?.lobbyName !== e.lobbyName || z.current !== e.callId && (z.current = e.callId, k("accept", (t) => {
				g.current = null, t.accept(e);
			}, () => {
				g.current = null, R.decline(e), I(e.lobbyName);
			}));
		}, [
			m,
			k,
			R,
			I
		]);
		let B = st({
			gatewayConfigured: a,
			platformApiUrl: n,
			signedIn: !!e,
			connectionState: c
		}), V = q(() => e ? {
			userId: e.userId,
			displayName: e.displayName
		} : null, [e?.userId, e?.displayName]), re = q(() => ({
			call: M,
			lobby: m,
			bind: te,
			unbind: I,
			startBound: m && P.current ? ne : null,
			self: V,
			tenant: t,
			gatewayConfigured: a,
			connectionState: c,
			platformApiUrl: n,
			unavailableReason: B,
			checkDevices: ee
		}), [
			M,
			m,
			te,
			I,
			ne,
			V,
			t,
			a,
			c,
			n,
			B,
			ee
		]), H = R.rings[0] ?? null;
		return /* @__PURE__ */ Z(s.Provider, {
			value: re,
			children: [
				p,
				T && /* @__PURE__ */ X(f, {
					kind: T.kind,
					title: m?.title ?? "this huddle",
					selfName: e?.displayName ?? "",
					initial: T.initial,
					onCancel: () => {
						let e = T;
						E(null), e.cancel?.();
					},
					onJoin: (e, t) => {
						let n = T;
						ut(d, e), w.current.devices.set({
							...w.current.devices.prefs,
							...t
						}), E(null), n.kind !== "check" && (x(e), O({ run: n.run }));
					}
				}),
				H && /* @__PURE__ */ X(C, {
					ring: H,
					onAccept: () => R.accept(H),
					onDecline: () => R.decline(H)
				})
			]
		});
	}
	function m({ children: e }) {
		let t = G(s), [n, r] = Y(!1), i = !!t?.lobby && ze(t.call.phase, !0);
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
		let [i] = Y(() => new Ie());
		return /* @__PURE__ */ X(d, {
			baseUrl: r.current ?? "",
			getAuthToken: $e,
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
		return Me(n?.subscribe ?? et, r, r);
	}
	function b() {
		return y((e) => e.placement, nt);
	}
	function x() {
		return y((e) => e.pageClaimed, rt);
	}
	function S(e, t, n = !0, r = {}) {
		let i = G(c), a = !!r.compact, o = JSON.stringify(r.documents ?? []), s = q(() => JSON.parse(o), [o]);
		je(() => i && e && n ? i.claim(e, t, {
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
		let l = y((e) => e.current, tt);
		return !!e && l === e;
	}
	function w({ placement: e, compact: n = !1, documents: r, className: i }) {
		let a = G(s), o = G(l), [c, u] = Y(null), d = ct(c), f = !!a?.lobby && Q(a.call.phase, !0), p = e === "composer" ? d > 0 : e === "pane" || f && !!o?.open && d > 0, m = e === "composer" && (n || Re(d)), h = S(c, e, p, {
			compact: m,
			...r ? { documents: r } : {}
		});
		return /* @__PURE__ */ X(t, {
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
	function D(e, t = {}) {
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
				n.lobby?.lobbyName === o && He(n.call);
			}
		}), u = t.enabled !== !1 && Be(n?.lobby ?? null, n?.call.phase ?? "idle", r);
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
	function O({ id: e, onOpenPeople: n, onOpenDocument: r, overlay: i, dockTestId: a }) {
		let o = G(s), c = y((e) => e.current, tt), l = y((e) => e.placement, nt), d = y((e) => e.compact, rt), f = y((e) => e.documents, at), p = !!o?.lobby && Q(o.call.phase, !0), m = !!c && l === "composer", h = !!c && l !== "pane", g = Le(c ? l : "footer", d), _ = o?.lobby ?? null, v = p && _ && o ? /* @__PURE__ */ X(u, {
			call: o.call,
			title: _.title,
			onOpenPeople: () => n?.(_, o.tenant),
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
		return v ? c ? Ne(/* @__PURE__ */ Z(t, {
			gap: "none",
			className: "relative",
			"data-testid": "shell-call-media",
			"data-placement": l,
			"data-layout": g,
			"data-expanded": "true",
			children: [v, i]
		}), c) : /* @__PURE__ */ X(t, {
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
		CallMediaOutlet: O,
		CallBlock: w,
		PreJoinDialog: f,
		ConversationCallDock: u,
		useCallHost: _,
		useCallBlock: D,
		useCallLobby: T,
		useCallMediaPanel: v,
		useCallBlockPlacement: b,
		useCallBlockPageClaimed: x,
		useClaimCallBlock: S
	};
}
//#endregion
export { D as ALL_REALTIME_CAPABILITIES, b as CONVERSATION_CAPABILITY_NAMES, me as CapabilityBoundary, u as CapabilityGate, V as DEFAULT_REALTIME_CAPABILITIES, C as IncomingCallToast, l as MAX_ATTACHMENT_BYTES, s as MAX_IMAGE_BYTES, he as NetworkErrorBoundary, z as NewHangoutRoomDialog, j as RealtimeIntegrationsProvider, ne as ReconnectingShim, de as WrappedActivityPanel, Se as WrappedAudioVideoSettingsForm, fe as WrappedCanvasDocument, H as WrappedChatPanel, be as WrappedConnectionPill, P as WrappedConversationSurface, ge as WrappedCursorOverlay, B as WrappedFileUploadDrop, we as WrappedHangoutLayout, ve as WrappedMediaEffectsPreviewPanel, I as WrappedMediaEffectsTray, R as WrappedNotificationBell, le as WrappedNotificationCenter, ie as WrappedPresencePanel, re as WrappedReactionsOverlay, c as acceptsDocumentImage, te as adaptActivityEvent, Ee as adaptActivityEvents, ke as adaptChatMessage, L as adaptChatMessages, Oe as adaptFileUploadState, k as adaptFileUploads, p as adaptHangoutParticipant, De as adaptHangoutParticipants, A as adaptMessageReactions, h as adaptNotification, m as adaptNotifications, T as adaptPresenceEntry, ce as adaptPresenceRoster, d as adaptReaction, se as adaptReactions, oe as applyNetworkShim, g as buildCanvasDocumentExtensions, Ve as callCounts, Q as callDrawn, S as canEditCanvasGrant, O as canvasDocumentSaveState, f as canvasRecoveryKey, N as capabilityNamesFor, dt as createCallBlockHost, y as createCanvasDocumentPane, E as createConversationCallDock, F as createConversationFeaturesFor, Te as createHangoutRoomRow, xe as createHangoutRoomsSection, Ce as createRealtimeCapabilityProvider, M as createRealtimeIntegrations, ye as createWrappedHangoutRoomsList, x as createWrappedLVSHangoutLayout, _e as createWrappedStreamStage, ee as decodeCanvasRecovery, v as encodeCanvasRecovery, w as incomingCallTitle, ae as mediaEffectsChangeCount, He as pageHuddleStart, ue as slugifyRoomName, Ae as useCanvasRecovery, o as useDocumentImageUpload, pe as useRealtimeCapabilities, _ as useRealtimeIntegrations };
