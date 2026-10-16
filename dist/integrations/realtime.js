import { n as e } from "../Button-uREUOWUk.js";
import { c as t, l as n, n as r } from "../Text-4BIlhd_-.js";
import { t as i } from "../Modal-CEiWhFnj.js";
import { n as a } from "../Slider-DEbQCKD1.js";
import { i as o, n as s, r as c, t as l } from "../useDocumentImageUpload-3W74XPh6.js";
import { $ as u, A as d, B as f, C as p, D as m, E as h, F as g, G as _, H as v, I as y, J as b, K as x, L as S, M as C, N as w, O as T, P as E, Q as D, R as ee, S as O, T as k, U as A, V as j, W as M, X as N, Y as P, Z as F, _ as I, a as L, at as R, b as z, c as B, ct as V, d as H, dt as te, et as ne, f as U, ft as re, g as ie, gt as ae, h as oe, ht as se, i as ce, it as le, j as ue, k as de, l as fe, lt as pe, m as me, mt as he, n as ge, nt as _e, o as ve, ot as ye, p as be, pt as xe, q as Se, r as Ce, rt as we, s as Te, st as Ee, t as De, tt as Oe, u as ke, ut as Ae, v as je, w as Me, x as Ne, y as Pe, z as Fe } from "../meeting-BpynZC4e.js";
import { createContext as Ie, useCallback as W, useContext as G, useEffect as K, useLayoutEffect as Le, useMemo as q, useRef as J, useState as Y, useSyncExternalStore as Re } from "react";
import { jsx as X, jsxs as Z } from "react/jsx-runtime";
import { createPortal as ze } from "react-dom";
//#region src/integrations/realtime/callBlockModel.ts
var Be = [], Ve = [
	"composer",
	"page",
	"block",
	"pane"
], He = class {
	claims = [];
	listeners = /* @__PURE__ */ new Set();
	claim(e, t = "page", n = {}) {
		let r = Symbol("call-block-claim");
		return this.claims = [...this.claims, {
			token: r,
			target: e,
			placement: t,
			compact: !!n.compact,
			documents: n.documents ?? Be
		}], this.emit(), () => {
			let e = this.claims.length;
			this.claims = this.claims.filter((e) => e.token !== r), this.claims.length !== e && this.emit();
		};
	}
	top() {
		for (let e of Ve) for (let t = this.claims.length - 1; t >= 0; --t) if (this.claims[t].placement === e) return this.claims[t];
		return null;
	}
	current = () => this.top()?.target ?? null;
	placement = () => this.top()?.placement ?? "footer";
	compact = () => this.top()?.compact ?? !1;
	documents = () => this.top()?.documents ?? Be;
	pageClaimed = () => this.claims.some((e) => e.placement !== "pane");
	subscribe = (e) => (this.listeners.add(e), () => {
		this.listeners.delete(e);
	});
	emit() {
		for (let e of this.listeners) e();
	}
};
function Ue(e, t = !1) {
	return e === "composer" ? t ? "stack" : "shelf" : e === "pane" ? "grid" : "shelf";
}
function We(e) {
	return e > 0 && e < 640;
}
function Q(e, t) {
	return t && e !== "idle" && e !== "ringing";
}
function Ge(e, t) {
	return Q(e, t) && e !== "ended" && e !== "failed";
}
function Ke(e, t, n) {
	return !e || !Q(t, !0) ? !1 : n.some((t) => !!t && (t === e.lobbyName || t === e.channel));
}
function qe(e) {
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
function Je(e) {
	return e.phase === "idle" && e.call ? (e.rejoin(), "rejoin") : e.phase === "idle" || e.phase === "ended" || e.phase === "failed" ? (e.start([]), "start") : null;
}
var $ = {
	micOn: !0,
	cameraOn: !0,
	remember: !1
}, Ye = 1e4;
function Xe(e) {
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
function Ze(e, t, n) {
	return e === "accept" ? "accept" : e === "start" ? t === "idle" || t === "ended" || t === "failed" ? "start" : null : t === "idle" && n ? "join" : null;
}
function Qe(e, t) {
	return t === "check" || !e.remember;
}
function $e(e) {
	return {
		...e,
		remember: !1
	};
}
function et(e) {
	return e === "accept" ? Ye : null;
}
function tt(e) {
	return {
		micOn: e.micOn,
		cameraOn: e.cameraOn,
		remember: e.remember
	};
}
function nt(e) {
	return Math.max(0, Math.ceil(e / 1e3));
}
//#endregion
//#region src/integrations/realtime/CallBlockHost.tsx
var rt = {
	start: "Start a huddle",
	join: "Join the huddle",
	accept: "Join the huddle",
	check: "Check your devices"
}, it = "__unbound__", at = () => "", ot = () => () => {}, st = () => null, ct = () => "footer", lt = () => !1, ut = [], dt = () => ut, ft = "ui.call-prejoin.v1";
function pt(e) {
	return e.gatewayConfigured ? e.platformApiUrl ? e.signedIn ? e.connectionState === "connected" ? null : "Connecting to the realtime gateway…" : "Sign in to start a call" : "Calls need platform-api — the middleware returned no platformApiUrl (REALTIME_PLATFORM_PUBLIC_URL) and VITE_PLATFORM_API_URL is not set" : "Calls need the realtime gateway — the middleware returned no gatewayUrl and VITE_GATEWAY_URL is not set";
}
function mt(e) {
	let [t, n] = Y(0);
	return Le(() => {
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
function ht(e) {
	try {
		return Xe(window.localStorage.getItem(e));
	} catch {
		return Xe(null);
	}
}
function gt(e, t) {
	try {
		window.localStorage.setItem(e, JSON.stringify(tt(t)));
	} catch {}
}
function _t(o) {
	let s = Ie(null), c = Ie(null), l = Ie(null), u = f(o), { LVSProvider: d } = o;
	function p({ kind: s, title: c, selfName: l, selfAvatarUrl: u, initial: d, onJoin: f, onCancel: p }) {
		let [m, h] = Y(d), g = o.useMediaDevices({ requestOnMount: !1 }), _ = o.useAudioVideoSettings({
			preview: m.micOn || m.cameraOn,
			previewAudio: m.micOn,
			previewVideo: m.cameraOn
		}), v = et(s), [y, b] = Y(v), x = J(!1), S = J({
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
			title: rt[s],
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
					children: y === null ? s === "check" ? "Save" : "Join" : `Join as last time (${nt(y)})`
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
	function m({ self: e, tenant: t, platformApiUrl: n, getIdToken: r, gateway: i, gatewayConfigured: a, connectionState: c, onAccept: l, onCallEvent: u, preJoinStorageKey: d = ft, children: f }) {
		let [m, h] = Y(null), g = J(null), _ = J(null), v = J(u);
		v.current = u;
		let y = (t, n) => {
			v.current?.(t, n, {
				host: _.current,
				selfId: e?.userId ?? ""
			});
		}, [b, x] = Y(() => ht(d)), S = o.useConversationCall({
			lobbyName: m?.lobbyName ?? it,
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
			let r = ht(d);
			if (!Qe(r, e)) {
				x(r), D({ run: t });
				return;
			}
			T((i) => i ?? {
				kind: e,
				run: t,
				...n ? { cancel: n } : {},
				initial: r
			});
		}, [d]), k = W((e, t) => Ze("start", C.current.phase, !!C.current.call) ? (O("start", (n) => {
			n.start(e, t);
		}), Promise.resolve()) : C.current.start(e, t), [O]), A = W(() => {
			let e = C.current;
			return Ze("rejoin", e.phase, !!e.call) ? (O("join", (e) => {
				e.rejoin();
			}), Promise.resolve()) : e.rejoin();
		}, [O]), j = W(() => {
			T((e) => e ?? {
				kind: "check",
				run: () => {},
				initial: $e(ht(d))
			});
		}, [d]), M = q(() => ({
			...S,
			start: k,
			rejoin: A
		}), [
			S,
			k,
			A
		]);
		K(() => {
			E && (E.run(C.current), D(null));
		}, [E]), _.current = M.call?.host ?? _.current, M.phase === "idle" && (_.current = null);
		let N = J(M.phase);
		N.current = M.phase;
		let P = J(null), F = J(null), I = W((e, t) => {
			if (g.current) return;
			let n = N.current;
			(n === "idle" || n === "ringing") && (P.current = t ?? null, F.current = e.lobbyName, h((t) => t && t.lobbyName === e.lobbyName && t.title === e.title && t.channel === e.channel && t.startBlockedReason === e.startBlockedReason ? t : e));
		}, []), L = W((e) => {
			if (g.current) return;
			let t = N.current;
			(t === "idle" || t === "ringing") && F.current === e && (F.current = null, P.current = null, h((t) => t && t.lobbyName === e ? null : t));
		}, []), R = W(() => {
			P.current?.start();
		}, []), z = J(l);
		z.current = l;
		let B = o.useIncomingConversationCalls({
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
				}), z.current?.(e);
			})
		}), V = J(null);
		K(() => {
			let e = g.current;
			!e || m?.lobbyName !== e.lobbyName || V.current !== e.callId && (V.current = e.callId, O("accept", (t) => {
				g.current = null, t.accept(e);
			}, () => {
				g.current = null, B.decline(e), L(e.lobbyName);
			}));
		}, [
			m,
			O,
			B,
			L
		]);
		let H = pt({
			gatewayConfigured: a,
			platformApiUrl: n,
			signedIn: !!e,
			connectionState: c
		}), te = q(() => e ? {
			userId: e.userId,
			displayName: e.displayName
		} : null, [e?.userId, e?.displayName]), ne = q(() => ({
			call: M,
			lobby: m,
			bind: I,
			unbind: L,
			startBound: m && P.current ? R : null,
			self: te,
			tenant: t,
			gatewayConfigured: a,
			connectionState: c,
			platformApiUrl: n,
			unavailableReason: H,
			checkDevices: j
		}), [
			M,
			m,
			I,
			L,
			R,
			te,
			t,
			a,
			c,
			n,
			H,
			j
		]), U = B.rings[0] ?? null;
		return /* @__PURE__ */ Z(s.Provider, {
			value: ne,
			children: [
				f,
				w && /* @__PURE__ */ X(p, {
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
						gt(d, e), C.current.devices.set({
							...C.current.devices.prefs,
							...t
						}), T(null), n.kind !== "check" && (x(e), D({ run: n.run }));
					}
				}),
				U && /* @__PURE__ */ X(ee, {
					ring: U,
					onAccept: () => B.accept(U),
					onDecline: () => B.decline(U)
				})
			]
		});
	}
	function h({ children: e }) {
		let t = G(s), [n, r] = Y(!1), i = !!t?.lobby && Ge(t.call.phase, !0);
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
	function g({ scopeKey: e, videoUrl: t, children: n, ...r }) {
		return /* @__PURE__ */ X(_, {
			videoUrl: t,
			...r,
			children: n
		}, e);
	}
	function _({ videoUrl: e, children: t, ...n }) {
		let r = J(null);
		e && !r.current && (r.current = e);
		let [i] = Y(() => new He());
		return /* @__PURE__ */ X(d, {
			baseUrl: r.current ?? "",
			getAuthToken: at,
			children: /* @__PURE__ */ X(m, {
				...n,
				children: /* @__PURE__ */ X(c.Provider, {
					value: i,
					children: /* @__PURE__ */ X(h, { children: t })
				})
			})
		});
	}
	function v() {
		return G(s);
	}
	function y() {
		return G(l);
	}
	function b(e, t) {
		let n = G(c), r = n ? e(n) : t;
		return Re(n?.subscribe ?? ot, r, r);
	}
	function x() {
		return b((e) => e.placement, ct);
	}
	function S() {
		return b((e) => e.pageClaimed, lt);
	}
	function C(e, t, n = !0, r = {}) {
		let i = G(c), a = !!r.compact, o = JSON.stringify(r.documents ?? []), s = q(() => JSON.parse(o), [o]);
		Le(() => i && e && n ? i.claim(e, t, {
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
		let l = b((e) => e.current, st);
		return !!e && l === e;
	}
	function w({ placement: e, compact: t = !1, documents: r, className: i }) {
		let a = G(s), o = G(l), [c, u] = Y(null), d = mt(c), f = !!a?.lobby && Q(a.call.phase, !0), p = e === "composer" ? d > 0 : e === "pane" || f && !!o?.open && d > 0, m = e === "composer" && (t || We(d)), h = C(c, e, p, {
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
				n.lobby?.lobbyName === o && Je(n.call);
			}
		}), u = t.enabled !== !1 && Ke(n?.lobby ?? null, n?.call.phase ?? "idle", r);
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
	function D({ id: e, onOpenPeople: t, onOpenDocument: r, overlay: i, dockTestId: a }) {
		let o = G(s), c = b((e) => e.current, st), l = b((e) => e.placement, ct), d = b((e) => e.compact, lt), f = b((e) => e.documents, dt), p = !!o?.lobby && Q(o.call.phase, !0), m = !!c && l === "composer", h = !!c && l !== "pane", g = Ue(c ? l : "footer", d), _ = o?.lobby ?? null, v = p && _ && o ? /* @__PURE__ */ X(u, {
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
		return v ? c ? ze(/* @__PURE__ */ Z(n, {
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
		CallHostProvider: g,
		CallMediaOutlet: D,
		CallBlock: w,
		PreJoinDialog: p,
		ConversationCallDock: u,
		useCallHost: v,
		useCallBlock: E,
		useCallLobby: T,
		useCallMediaPanel: y,
		useCallBlockPlacement: x,
		useCallBlockPageClaimed: S,
		useClaimCallBlock: C
	};
}
//#endregion
export { le as ALL_REALTIME_CAPABILITIES, ne as CONVERSATION_CAPABILITY_NAMES, U as CapabilityBoundary, R as CapabilityGate, ye as DEFAULT_REALTIME_CAPABILITIES, ee as IncomingCallToast, l as MAX_ATTACHMENT_BYTES, s as MAX_IMAGE_BYTES, re as NetworkErrorBoundary, he as NewHangoutRoomDialog, P as RealtimeIntegrationsProvider, te as ReconnectingShim, z as WrappedActivityPanel, Te as WrappedAudioVideoSettingsForm, De as WrappedBreakoutRoomBanner, ge as WrappedBreakoutRoomsPanel, B as WrappedCanvasDocument, O as WrappedChatPanel, be as WrappedConnectionPill, Oe as WrappedConversationSurface, Pe as WrappedCursorOverlay, I as WrappedFileUploadDrop, ie as WrappedHangoutLayout, fe as WrappedMediaEffectsPreviewPanel, H as WrappedMediaEffectsTray, me as WrappedNotificationBell, oe as WrappedNotificationCenter, Ne as WrappedPresencePanel, je as WrappedReactionsOverlay, c as acceptsDocumentImage, p as adaptActivityEvent, Me as adaptActivityEvents, Ce as adaptBreakoutRooms, k as adaptChatMessage, h as adaptChatMessages, m as adaptFileUploadState, T as adaptFileUploads, de as adaptHangoutParticipant, d as adaptHangoutParticipants, ue as adaptMessageReactions, C as adaptNotification, w as adaptNotifications, E as adaptPresenceEntry, g as adaptPresenceRoster, y as adaptReaction, S as adaptReactions, Ae as applyNetworkShim, j as buildCanvasDocumentExtensions, qe as callCounts, Q as callDrawn, A as canEditCanvasGrant, M as canvasDocumentSaveState, x as canvasRecoveryKey, _e as capabilityNamesFor, _t as createCallBlockHost, v as createCanvasDocumentPane, f as createConversationCallDock, we as createConversationFeaturesFor, ae as createHangoutRoomRow, xe as createHangoutRoomsSection, Ee as createRealtimeCapabilityProvider, N as createRealtimeIntegrations, pe as createWrappedHangoutRoomsList, D as createWrappedLVSHangoutLayout, u as createWrappedStreamStage, Se as decodeCanvasRecovery, ce as defaultRoomDrafts, b as encodeCanvasRecovery, Fe as incomingCallTitle, ke as mediaEffectsChangeCount, L as meetingHandPositions, ve as meetingToolbarItems, Je as pageHuddleStart, se as slugifyRoomName, _ as useCanvasRecovery, o as useDocumentImageUpload, V as useRealtimeCapabilities, F as useRealtimeIntegrations };
