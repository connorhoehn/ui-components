import { n as e } from "../Button-uREUOWUk.js";
import { c as t, l as n, n as r } from "../Text-4BIlhd_-.js";
import { t as i } from "../Modal-CEiWhFnj.js";
import { n as a } from "../Slider-DEbQCKD1.js";
import { i as o, n as s, r as c, t as l } from "../useDocumentImageUpload-3W74XPh6.js";
import { $ as u, A as d, B as f, C as p, D as m, E as h, F as g, G as _, H as v, I as y, J as b, K as x, L as S, M as C, N as w, O as T, P as E, Q as D, R as O, S as ee, T as te, U as k, V as ne, W as A, X as j, Y as M, Z as N, _ as P, _t as F, a as I, at as L, b as R, c as z, ct as B, d as V, dt as re, et as H, f as ie, ft as ae, g as oe, gt as se, h as ce, ht as le, i as ue, it as de, j as fe, k as pe, l as me, lt as he, m as ge, mt as _e, n as ve, nt as ye, o as be, ot as xe, p as Se, pt as Ce, q as we, r as Te, rt as Ee, s as De, st as Oe, t as ke, tt as Ae, u as je, ut as Me, v as Ne, vt as Pe, w as Fe, x as Ie, y as Le, yt as Re, z as ze } from "../meeting-CaW6WetP.js";
import { createContext as U, useCallback as W, useContext as G, useEffect as K, useLayoutEffect as Be, useMemo as q, useRef as J, useState as Y, useSyncExternalStore as Ve } from "react";
import { jsx as X, jsxs as Z } from "react/jsx-runtime";
import { createPortal as He } from "react-dom";
//#region src/integrations/realtime/callBlockModel.ts
var Ue = [], We = [
	"composer",
	"page",
	"block",
	"pane"
], Ge = class {
	claims = [];
	listeners = /* @__PURE__ */ new Set();
	claim(e, t = "page", n = {}) {
		let r = Symbol("call-block-claim");
		return this.claims = [...this.claims, {
			token: r,
			target: e,
			placement: t,
			compact: !!n.compact,
			documents: n.documents ?? Ue
		}], this.emit(), () => {
			let e = this.claims.length;
			this.claims = this.claims.filter((e) => e.token !== r), this.claims.length !== e && this.emit();
		};
	}
	top() {
		for (let e of We) for (let t = this.claims.length - 1; t >= 0; --t) if (this.claims[t].placement === e) return this.claims[t];
		return null;
	}
	current = () => this.top()?.target ?? null;
	placement = () => this.top()?.placement ?? "footer";
	compact = () => this.top()?.compact ?? !1;
	documents = () => this.top()?.documents ?? Ue;
	pageClaimed = () => this.claims.some((e) => e.placement !== "pane");
	subscribe = (e) => (this.listeners.add(e), () => {
		this.listeners.delete(e);
	});
	emit() {
		for (let e of this.listeners) e();
	}
};
function Ke(e, t = !1) {
	return e === "composer" ? t ? "stack" : "shelf" : e === "pane" ? "grid" : "shelf";
}
function qe(e) {
	return e > 0 && e < 640;
}
function Q(e, t) {
	return t && e !== "idle" && e !== "ringing";
}
function Je(e, t) {
	return Q(e, t) && e !== "ended" && e !== "failed";
}
function Ye(e, t, n) {
	return !e || !Q(t, !0) ? !1 : n.some((t) => !!t && (t === e.lobbyName || t === e.channel));
}
function Xe(e) {
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
function Ze(e) {
	return e.phase === "idle" && e.call ? (e.rejoin(), "rejoin") : e.phase === "idle" || e.phase === "ended" || e.phase === "failed" ? (e.start([]), "start") : null;
}
var $ = {
	micOn: !0,
	cameraOn: !0,
	remember: !1
}, Qe = 1e4;
function $e(e) {
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
function et(e, t, n) {
	return e === "accept" ? "accept" : e === "start" ? t === "idle" || t === "ended" || t === "failed" ? "start" : null : t === "idle" && n ? "join" : null;
}
function tt(e, t) {
	return t === "check" || !e.remember;
}
function nt(e) {
	return {
		...e,
		remember: !1
	};
}
function rt(e) {
	return e === "accept" ? Qe : null;
}
function it(e) {
	return {
		micOn: e.micOn,
		cameraOn: e.cameraOn,
		remember: e.remember
	};
}
function at(e) {
	return Math.max(0, Math.ceil(e / 1e3));
}
//#endregion
//#region src/integrations/realtime/CallBlockHost.tsx
var ot = {
	start: "Start a huddle",
	join: "Join the huddle",
	accept: "Join the huddle",
	check: "Check your devices"
}, st = "__unbound__", ct = () => "", lt = () => () => {}, ut = () => null, dt = () => "footer", ft = () => !1, pt = [], mt = () => pt, ht = "ui.call-prejoin.v1";
function gt(e) {
	return e.gatewayConfigured ? e.platformApiUrl ? e.signedIn ? e.connectionState === "connected" ? null : "Connecting to the realtime gateway…" : "Sign in to start a call" : "Calls need platform-api — the middleware returned no platformApiUrl (REALTIME_PLATFORM_PUBLIC_URL) and VITE_PLATFORM_API_URL is not set" : "Calls need the realtime gateway — the middleware returned no gatewayUrl and VITE_GATEWAY_URL is not set";
}
function _t(e) {
	let [t, n] = Y(0);
	return Be(() => {
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
function vt(e) {
	try {
		return $e(window.localStorage.getItem(e));
	} catch {
		return $e(null);
	}
}
function yt(e, t) {
	try {
		window.localStorage.setItem(e, JSON.stringify(it(t)));
	} catch {}
}
function bt(o) {
	let s = U(null), c = U(null), l = U(null), u = k(o), { LVSProvider: d } = o;
	function f({ kind: s, title: c, selfName: l, selfAvatarUrl: u, initial: d, onJoin: f, onCancel: p }) {
		let [m, h] = Y(d), g = o.useMediaDevices({ requestOnMount: !1 }), _ = o.useAudioVideoSettings({
			preview: m.micOn || m.cameraOn,
			previewAudio: m.micOn,
			previewVideo: m.cameraOn
		}), v = rt(s), [y, b] = Y(v), x = J(!1), S = J({
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
			title: ot[s],
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
					children: y === null ? s === "check" ? "Save" : "Join" : `Join as last time (${at(y)})`
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
					/* @__PURE__ */ X(je, {
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
	function p({ self: e, tenant: t, platformApiUrl: n, getIdToken: r, gateway: i, gatewayConfigured: a, connectionState: c, onAccept: l, onCallEvent: u, preJoinStorageKey: d = ht, children: p }) {
		let [m, h] = Y(null), g = J(null), _ = J(null), v = J(u);
		v.current = u;
		let y = (t, n) => {
			v.current?.(t, n, {
				host: _.current,
				selfId: e?.userId ?? ""
			});
		}, [b, x] = Y(() => vt(d)), S = o.useConversationCall({
			lobbyName: m?.lobbyName ?? st,
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
		}), C = J(S);
		C.current = S;
		let [w, T] = Y(null), [E, D] = Y(null), O = W((e, t, n) => {
			let r = vt(d);
			if (!tt(r, e)) {
				x(r), D({ run: t });
				return;
			}
			T((i) => i ?? {
				kind: e,
				run: t,
				...n ? { cancel: n } : {},
				initial: r
			});
		}, [d]), ee = W((e, t) => et("start", C.current.phase, !!C.current.call) ? (O("start", (n) => {
			n.start(e, t);
		}), Promise.resolve()) : C.current.start(e, t), [O]), te = W(() => {
			let e = C.current;
			return et("rejoin", e.phase, !!e.call) ? (O("join", (e) => {
				e.rejoin();
			}), Promise.resolve()) : e.rejoin();
		}, [O]), k = W(() => {
			T((e) => e ?? {
				kind: "check",
				run: () => {},
				initial: nt(vt(d))
			});
		}, [d]), A = q(() => ({
			...S,
			start: ee,
			rejoin: te
		}), [
			S,
			ee,
			te
		]);
		K(() => {
			E && (E.run(C.current), D(null));
		}, [E]), _.current = A.call?.host ?? _.current, A.phase === "idle" && (_.current = null);
		let j = J(A.phase);
		j.current = A.phase;
		let M = J(null), N = J(null), P = W((e, t) => {
			if (g.current) return;
			let n = j.current;
			(n === "idle" || n === "ringing") && (M.current = t ?? null, N.current = e.lobbyName, h((t) => t && t.lobbyName === e.lobbyName && t.title === e.title && t.channel === e.channel && t.startBlockedReason === e.startBlockedReason ? t : e));
		}, []), F = W((e) => {
			if (g.current) return;
			let t = j.current;
			(t === "idle" || t === "ringing") && N.current === e && (N.current = null, M.current = null, h((t) => t && t.lobbyName === e ? null : t));
		}, []), I = W(() => {
			M.current?.start();
		}, []), L = J(l);
		L.current = l;
		let R = o.useIncomingConversationCalls({
			gateway: i,
			self: {
				userId: e?.userId ?? null,
				...e ? { displayName: e.displayName } : {}
			},
			onAccept: ((e) => {
				g.current = e, N.current = e.lobbyName, M.current = null, h({
					lobbyName: e.lobbyName,
					title: e.callerName,
					channel: e.channel
				}), L.current?.(e);
			})
		}), z = J(null);
		K(() => {
			let e = g.current;
			!e || m?.lobbyName !== e.lobbyName || z.current !== e.callId && (z.current = e.callId, O("accept", (t) => {
				g.current = null, t.accept(e);
			}, () => {
				g.current = null, R.decline(e), F(e.lobbyName);
			}));
		}, [
			m,
			O,
			R,
			F
		]);
		let B = gt({
			gatewayConfigured: a,
			platformApiUrl: n,
			signedIn: !!e,
			connectionState: c
		}), V = q(() => e ? {
			userId: e.userId,
			displayName: e.displayName
		} : null, [e?.userId, e?.displayName]), re = q(() => ({
			call: A,
			lobby: m,
			bind: P,
			unbind: F,
			startBound: m && M.current ? I : null,
			self: V,
			tenant: t,
			gatewayConfigured: a,
			connectionState: c,
			platformApiUrl: n,
			unavailableReason: B,
			checkDevices: k
		}), [
			A,
			m,
			P,
			F,
			I,
			V,
			t,
			a,
			c,
			n,
			B,
			k
		]), H = R.rings[0] ?? null;
		return /* @__PURE__ */ Z(s.Provider, {
			value: re,
			children: [
				p,
				w && /* @__PURE__ */ X(f, {
					kind: w.kind,
					title: m?.title ?? "this huddle",
					selfName: e?.displayName ?? "",
					selfAvatarUrl: e?.avatarUrl,
					initial: w.initial,
					onCancel: () => {
						let e = w;
						T(null), e.cancel?.();
					},
					onJoin: (e, t) => {
						let n = w;
						yt(d, e), C.current.devices.set({
							...C.current.devices.prefs,
							...t
						}), T(null), n.kind !== "check" && (x(e), D({ run: n.run }));
					}
				}),
				H && /* @__PURE__ */ X(ne, {
					ring: H,
					onAccept: () => R.accept(H),
					onDecline: () => R.decline(H)
				})
			]
		});
	}
	function m({ children: e }) {
		let t = G(s), [n, r] = Y(!1), i = !!t?.lobby && Je(t.call.phase, !0);
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
		let [i] = Y(() => new Ge());
		return /* @__PURE__ */ X(d, {
			baseUrl: r.current ?? "",
			getAuthToken: ct,
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
		return Ve(n?.subscribe ?? lt, r, r);
	}
	function b() {
		return y((e) => e.placement, dt);
	}
	function x() {
		return y((e) => e.pageClaimed, ft);
	}
	function S(e, t, n = !0, r = {}) {
		let i = G(c), a = !!r.compact, o = JSON.stringify(r.documents ?? []), s = q(() => JSON.parse(o), [o]);
		Be(() => i && e && n ? i.claim(e, t, {
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
		let l = y((e) => e.current, ut);
		return !!e && l === e;
	}
	function C({ placement: e, compact: t = !1, documents: r, className: i }) {
		let a = G(s), o = G(l), [c, u] = Y(null), d = _t(c), f = !!a?.lobby && Q(a.call.phase, !0), p = e === "composer" ? d > 0 : e === "pane" || f && !!o?.open && d > 0, m = e === "composer" && (t || qe(d)), h = S(c, e, p, {
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
	function w(e, t) {
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
	function T(e, t = {}) {
		let n = G(s), r = typeof e == "string" || e === null ? [e] : e, i = r.find((e) => !!e) ?? null, a = t.bind ?? null, o = a ? a.lobbyName === void 0 ? i : a.lobbyName : null, c = a ? a.blockedReason ?? n?.unavailableReason ?? void 0 : void 0, l = w(a && o ? {
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
				n.lobby?.lobbyName === o && Ze(n.call);
			}
		}), u = t.enabled !== !1 && Ye(n?.lobby ?? null, n?.call.phase ?? "idle", r);
		return {
			block: u ? /* @__PURE__ */ X(C, {
				placement: "composer",
				compact: !!t.compact,
				...t.documents ? { documents: t.documents } : {}
			}) : void 0,
			holds: u,
			...l
		};
	}
	function E({ id: e, onOpenPeople: t, onOpenDocument: r, overlay: i, dockTestId: a }) {
		let o = G(s), c = y((e) => e.current, ut), l = y((e) => e.placement, dt), d = y((e) => e.compact, ft), f = y((e) => e.documents, mt), p = !!o?.lobby && Q(o.call.phase, !0), m = !!c && l === "composer", h = !!c && l !== "pane", g = Ke(c ? l : "footer", d), _ = o?.lobby ?? null, v = p && _ && o ? /* @__PURE__ */ X(u, {
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
		return v ? c ? He(/* @__PURE__ */ Z(n, {
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
		CallMediaOutlet: E,
		CallBlock: C,
		PreJoinDialog: f,
		ConversationCallDock: u,
		useCallHost: _,
		useCallBlock: T,
		useCallLobby: w,
		useCallMediaPanel: v,
		useCallBlockPlacement: b,
		useCallBlockPageClaimed: x,
		useClaimCallBlock: S
	};
}
//#endregion
export { Oe as ALL_REALTIME_CAPABILITIES, Ee as CONVERSATION_CAPABILITY_NAMES, ce as CapabilityBoundary, B as CapabilityGate, he as DEFAULT_REALTIME_CAPABILITIES, ne as IncomingCallToast, l as MAX_ATTACHMENT_BYTES, s as MAX_IMAGE_BYTES, ke as MeetingChatTargetSwitch, le as NetworkErrorBoundary, F as NewHangoutRoomDialog, D as RealtimeIntegrationsProvider, _e as ReconnectingShim, p as WrappedActivityPanel, je as WrappedAudioVideoSettingsForm, ve as WrappedBreakoutRoomBanner, Te as WrappedBreakoutRoomsPanel, V as WrappedCanvasDocument, te as WrappedChatPanel, oe as WrappedConnectionPill, de as WrappedConversationSurface, ee as WrappedCursorOverlay, R as WrappedFileUploadDrop, Le as WrappedHangoutLayout, ie as WrappedMediaEffectsPreviewPanel, ge as WrappedMediaEffectsTray, P as WrappedNotificationBell, Ne as WrappedNotificationCenter, Fe as WrappedPresencePanel, Ie as WrappedReactionsOverlay, c as acceptsDocumentImage, h as adaptActivityEvent, m as adaptActivityEvents, ue as adaptBreakoutRooms, T as adaptChatMessage, pe as adaptChatMessages, d as adaptFileUploadState, fe as adaptFileUploads, C as adaptHangoutParticipant, w as adaptHangoutParticipants, E as adaptMessageReactions, g as adaptNotification, y as adaptNotifications, S as adaptPresenceEntry, O as adaptPresenceRoster, ze as adaptReaction, f as adaptReactions, Ce as applyNetworkShim, A as buildCanvasDocumentExtensions, Xe as callCounts, Q as callDrawn, x as canEditCanvasGrant, we as canvasDocumentSaveState, M as canvasRecoveryKey, L as capabilityNamesFor, bt as createCallBlockHost, _ as createCanvasDocumentPane, k as createConversationCallDock, xe as createConversationFeaturesFor, Re as createHangoutRoomRow, se as createHangoutRoomsSection, Me as createRealtimeCapabilityProvider, u as createRealtimeIntegrations, ae as createWrappedHangoutRoomsList, Ae as createWrappedLVSHangoutLayout, ye as createWrappedStreamStage, j as decodeCanvasRecovery, I as defaultRoomDrafts, N as encodeCanvasRecovery, v as incomingCallTitle, Se as mediaEffectsChangeCount, be as meetingHandPositions, De as meetingRosterProps, z as meetingToolbarItems, Ze as pageHuddleStart, Pe as slugifyRoomName, b as useCanvasRecovery, o as useDocumentImageUpload, me as useMeetingChat, re as useRealtimeCapabilities, H as useRealtimeIntegrations };
