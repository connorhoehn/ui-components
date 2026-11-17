import { n as e } from "../Button-DQoeE5dN.js";
import { n as t, t as n } from "../Stack-CE1FjEn8.js";
import { n as r } from "../Text-XdCzxWMv.js";
import { g as i } from "../MediaIcons-_ai5Til2.js";
import { t as a } from "../Modal-C88cabjQ.js";
import { t as o } from "../DropdownMenu-8X91cU7p.js";
import { t as s } from "../Switch-CRiY_kzy.js";
import { C as c } from "../BreakoutRoomsPanel-Zol4p3wp.js";
import { n as l, r as u } from "../RecordingConsentNotice-Bqd_7yvw.js";
import { i as d, n as f, r as p, t as m } from "../useDocumentImageUpload-DEzbGyfz.js";
import { $ as h, A as g, B as _, C as v, Ct as y, D as b, E as x, F as S, G as C, H as w, I as T, J as E, K as D, L as O, M as k, N as A, O as j, P as M, Q as N, R as P, S as ee, St as te, T as F, U as I, V as L, W as ne, X as re, Y as ie, Z as R, _ as ae, _t as oe, a as se, at as z, b as ce, bt as B, c as le, ct as ue, d as V, dt as de, et as fe, f as H, ft as pe, g as me, gt as he, h as U, ht as ge, i as _e, it as W, j as ve, k as ye, l as be, lt as xe, m as Se, mt as Ce, n as we, nt as Te, o as Ee, ot as De, p as Oe, pt as ke, q as Ae, r as je, rt as Me, s as Ne, st as Pe, t as Fe, tt as Ie, u as Le, ut as Re, v as ze, vt as Be, w as Ve, wt as He, x as Ue, xt as We, y as Ge, yt as Ke, z as qe } from "../meeting-CLfRPhDN.js";
import { createContext as Je, useCallback as G, useContext as K, useEffect as q, useLayoutEffect as Ye, useMemo as J, useRef as Y, useState as X, useSyncExternalStore as Xe } from "react";
import { Fragment as Ze, jsx as Z, jsxs as Q } from "react/jsx-runtime";
import { createPortal as Qe } from "react-dom";
//#region src/integrations/realtime/callBlockModel.ts
var $e = [], et = [
	"stage",
	"composer",
	"page",
	"block",
	"pane"
], tt = class {
	claims = [];
	listeners = /* @__PURE__ */ new Set();
	claim(e, t = "page", n = {}) {
		let r = Symbol("call-block-claim");
		return this.claims = [...this.claims, {
			token: r,
			target: e,
			placement: t,
			compact: !!n.compact,
			documents: n.documents ?? $e,
			fit: n.fit ?? "width"
		}], this.emit(), () => {
			let e = this.claims.length;
			this.claims = this.claims.filter((e) => e.token !== r), this.claims.length !== e && this.emit();
		};
	}
	top() {
		for (let e of et) for (let t = this.claims.length - 1; t >= 0; --t) if (this.claims[t].placement === e) return this.claims[t];
		return null;
	}
	current = () => this.top()?.target ?? null;
	placement = () => this.top()?.placement ?? "footer";
	compact = () => this.top()?.compact ?? !1;
	fit = () => this.top()?.fit ?? "width";
	documents = () => this.top()?.documents ?? $e;
	pageClaimed = () => this.claims.some((e) => e.placement !== "pane");
	subscribe = (e) => (this.listeners.add(e), () => {
		this.listeners.delete(e);
	});
	emit() {
		for (let e of this.listeners) e();
	}
};
function nt(e, t = !1) {
	return e === "stage" ? "stage" : e === "composer" || e === "block" ? "compact" : e === "pane" ? "grid" : "shelf";
}
function rt(e) {
	return e > 0 && e < 640;
}
function $(e, t) {
	return t && e !== "idle" && e !== "ringing";
}
function it(e, t) {
	return $(e, t) && e !== "ended" && e !== "failed";
}
function at(e, t, n) {
	return !e || !$(t, !0) ? !1 : n.some((t) => !!t && (t === e.lobbyName || t === e.channel));
}
function ot(e) {
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
function st(e) {
	return e.phase === "idle" && e.call ? (e.rejoin(), "rejoin") : e.phase === "idle" || e.phase === "ended" || e.phase === "failed" ? (e.start([]), "start") : null;
}
var ct = {
	micOn: !0,
	cameraOn: !0,
	remember: !1
}, lt = 1e4;
function ut(e) {
	if (!e) return ct;
	try {
		let t = JSON.parse(e);
		return !t || typeof t != "object" ? ct : {
			micOn: typeof t.micOn == "boolean" ? t.micOn : ct.micOn,
			cameraOn: typeof t.cameraOn == "boolean" ? t.cameraOn : ct.cameraOn,
			remember: t.remember === !0
		};
	} catch {
		return ct;
	}
}
function dt(e, t, n) {
	return e === "accept" ? "accept" : e === "start" ? t === "idle" || t === "ended" || t === "failed" ? "start" : null : t === "idle" && n ? "join" : null;
}
function ft(e, t) {
	return t === "check" || !e.remember;
}
function pt(e) {
	return {
		...e,
		remember: !1
	};
}
function mt(e) {
	return e === "accept" ? lt : null;
}
function ht(e) {
	return {
		micOn: e.micOn,
		cameraOn: e.cameraOn,
		remember: e.remember
	};
}
function gt(e) {
	return Math.max(0, Math.ceil(e / 1e3));
}
//#endregion
//#region src/integrations/realtime/CallBlockHost.tsx
var _t = (e, t) => e === "start" ? `Start a ${t}` : e === "check" ? "Check your devices" : `Join the ${t}`, vt = (e) => e.charAt(0).toUpperCase() + e.slice(1), yt = "__unbound__", bt = () => "", xt = () => () => {}, St = () => null, Ct = () => "footer", wt = () => !1, Tt = [], Et = () => Tt, Dt = () => "width", Ot = "ui.call-prejoin.v1";
function kt(e) {
	return e.gatewayConfigured ? e.platformApiUrl ? e.signedIn ? e.connectionState === "connected" ? null : "Connecting to the realtime gateway…" : "Sign in to start a call" : "Calls need platform-api — the middleware returned no platformApiUrl (REALTIME_PLATFORM_PUBLIC_URL) and VITE_PLATFORM_API_URL is not set" : "Calls need the realtime gateway — the middleware returned no gatewayUrl and VITE_GATEWAY_URL is not set";
}
function At(e) {
	let [t, n] = X(0);
	return Ye(() => {
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
function jt(e) {
	try {
		return ut(window.localStorage.getItem(e));
	} catch {
		return ut(null);
	}
}
function Mt(e, t) {
	try {
		window.localStorage.setItem(e, JSON.stringify(ht(t)));
	} catch {}
}
function Nt(d) {
	let f = Je(null), p = Je(null), m = Je(null), h = E(d), { LVSProvider: g } = d, _ = d.useCallMediaEffects ?? (() => null);
	function v({ kind: l, title: u, selfName: f, selfAvatarUrl: p, initial: m, onJoin: h, onCancel: g, callNoun: v = "huddle" }) {
		let [y, b] = X(m), x = d.useMediaDevices({ requestOnMount: !1 }), S = d.useAudioVideoSettings({
			preview: y.micOn || y.cameraOn,
			previewAudio: y.micOn,
			previewVideo: y.cameraOn
		}), C = _(), [w, T] = X(null), E = C?.processStream, D = C?.detach;
		q(() => {
			if (!S.previewStream) {
				D?.(), T(null);
				return;
			}
			T(E?.(S.previewStream) ?? S.previewStream);
		}, [
			S.previewStream,
			E,
			D,
			C?.outputTrack
		]);
		let O = mt(l), [k, A] = X(O), j = Y(!1), M = Y({
			choice: y,
			settings: S.settings
		});
		M.current = {
			choice: y,
			settings: S.settings
		};
		let N = () => {
			let { choice: e, settings: t } = M.current;
			h(e, {
				...t.microphoneId ? { microphoneId: t.microphoneId } : {},
				...t.cameraId ? { cameraId: t.cameraId } : {},
				...t.speakerId ? { speakerId: t.speakerId } : {}
			});
		}, P = Y(N);
		P.current = N;
		let ee = Y(!0);
		return q(() => {
			if (ee.current) {
				ee.current = !1;
				return;
			}
			j.current = !0, A(null);
		}, [y, S.settings]), q(() => {
			if (O === null) return;
			let e = Date.now(), t = window.setInterval(() => {
				if (j.current) {
					window.clearInterval(t);
					return;
				}
				let n = O - (Date.now() - e);
				if (n <= 0) {
					window.clearInterval(t), P.current();
					return;
				}
				A(n);
			}, 250);
			return () => window.clearInterval(t);
		}, [O]), /* @__PURE__ */ Q(a, {
			open: !0,
			onClose: g,
			ariaLabel: _t(l, v),
			maxWidth: 1e3,
			rawChildren: !0,
			cardClassName: "flex max-h-[90dvh] flex-col gap-5 overflow-hidden border border-border p-5 sm:p-6",
			backdropTestId: "prejoin-backdrop",
			children: [
				/* @__PURE__ */ Q(n, {
					justify: "between",
					align: "baseline",
					gap: "md",
					wrap: !1,
					className: "min-w-0 shrink-0 border-b border-border pb-4",
					"data-testid": "prejoin-header",
					children: [/* @__PURE__ */ Z("h2", {
						className: "m-0 shrink-0 text-lg font-semibold text-text-primary",
						children: _t(l, v)
					}), /* @__PURE__ */ Z(r, {
						size: "sm",
						weight: "medium",
						className: "min-w-0 truncate text-right",
						title: u,
						"data-testid": "prejoin-title",
						children: u
					})]
				}),
				/* @__PURE__ */ Q(t, {
					gap: "md",
					className: "min-h-0 overflow-y-auto",
					"data-testid": "prejoin-dialog",
					onPointerDownCapture: () => {
						j.current = !0, A(null);
					},
					onKeyDownCapture: () => {
						j.current = !0, A(null);
					},
					children: [/* @__PURE__ */ Q(r, {
						size: "xs",
						tone: "secondary",
						children: ["Joining as ", f]
					}), /* @__PURE__ */ Z(Oe, {
						devices: x,
						settings: {
							...S,
							previewStream: w
						},
						cameraOn: y.cameraOn,
						selfName: f,
						selfAvatarUrl: p,
						layout: "prejoin",
						callNoun: v,
						"data-testid": "prejoin-devices",
						previewControls: /* @__PURE__ */ Q(Ze, { children: [
							/* @__PURE__ */ Z(c, {
								kind: "microphone",
								on: y.micOn,
								onToggle: () => b((e) => ({
									...e,
									micOn: !e.micOn
								})),
								devices: x.microphones,
								selectedDeviceId: S.settings.microphoneId,
								onSelectDevice: (e) => S.update({ microphoneId: e }),
								permission: x.permission.microphone,
								level: S.micLevel,
								showLabel: !0,
								"data-testid": "prejoin-mic"
							}),
							/* @__PURE__ */ Z(c, {
								kind: "camera",
								on: y.cameraOn,
								onToggle: () => b((e) => ({
									...e,
									cameraOn: !e.cameraOn
								})),
								devices: x.cameras,
								selectedDeviceId: S.settings.cameraId,
								onSelectDevice: (e) => S.update({ cameraId: e }),
								permission: x.permission.camera,
								showLabel: !0,
								"data-testid": "prejoin-camera"
							}),
							C && /* @__PURE__ */ Q(Ze, { children: [/* @__PURE__ */ Q(e, {
								size: "sm",
								variant: "secondary",
								"aria-pressed": C.backgroundMode === "blur",
								onClick: () => C.setBackgroundMode(C.backgroundMode === "blur" ? "none" : "blur"),
								"data-testid": "prejoin-blur",
								children: [/* @__PURE__ */ Z(i, { size: 16 }), "Blur"]
							}), /* @__PURE__ */ Z(o, {
								trigger: "Effects",
								triggerLabel: "Camera effects",
								triggerVariant: "secondary",
								triggerTestId: "prejoin-effects",
								sections: [{
									label: "Background",
									items: [
										{
											label: "None",
											checked: C.backgroundMode === "none",
											onSelect: () => C.setBackgroundMode("none")
										},
										{
											label: "Blur background",
											checked: C.backgroundMode === "blur",
											onSelect: () => C.setBackgroundMode("blur")
										},
										...C.backgrounds.map((e) => ({
											label: e.label,
											checked: C.backgroundMode === "image" && C.backgroundImageUrl === e.url,
											onSelect: () => {
												C.setBackgroundImageUrl(e.url), C.setBackgroundMode("image");
											}
										}))
									]
								}, {
									label: "Appearance",
									items: C.filters.map((e) => ({
										label: e.label,
										checked: C.filterId === e.id,
										onSelect: () => C.setFilter(e.id)
									}))
								}]
							})] })
						] })
					})]
				}),
				/* @__PURE__ */ Q(n, {
					justify: "between",
					align: "center",
					gap: "md",
					wrap: !0,
					className: "shrink-0 border-t border-border pt-4",
					"data-testid": "prejoin-footer",
					children: [/* @__PURE__ */ Q(n, {
						gap: "sm",
						align: "center",
						wrap: !1,
						children: [/* @__PURE__ */ Z(s, {
							checked: y.remember,
							onChange: (e) => b((t) => ({
								...t,
								remember: e
							})),
							"aria-label": "Remember and skip this check next time",
							"data-testid": "prejoin-remember"
						}), /* @__PURE__ */ Z(r, {
							size: "xs",
							tone: "secondary",
							children: "Skip device setup next time"
						})]
					}), /* @__PURE__ */ Q(n, {
						gap: "sm",
						justify: "end",
						className: "ml-auto",
						children: [/* @__PURE__ */ Z(e, {
							variant: "secondary",
							onClick: g,
							"data-testid": "prejoin-cancel",
							children: l === "accept" ? "Decline" : "Cancel"
						}), /* @__PURE__ */ Z(e, {
							onClick: N,
							"data-testid": "prejoin-join",
							children: k === null ? l === "check" ? "Save" : "Join now" : `Join as last time (${gt(k)})`
						})]
					})]
				})
			]
		});
	}
	function y({ self: e, tenant: t, platformApiUrl: n, getIdToken: r, gateway: i, gatewayConfigured: a, connectionState: o, onAccept: s, onCallEvent: c, nameFor: p, recordingConsent: m, callNoun: h = "huddle", meeting: g, preJoinStorageKey: _ = Ot, children: y }) {
		let [b, x] = X(null), S = Y(null), C = Y(null), w = Y(c);
		w.current = c;
		let T = (t, n) => {
			w.current?.(t, n, {
				host: C.current,
				selfId: e?.userId ?? ""
			});
		}, [E, O] = X(() => jt(_)), [k, A] = X(null), j = g && d.useMeeting && k && (!g.enabledFor || g.enabledFor(k.lobbyName)) ? k.lobbyName : null, M = i, N = J(() => M?.onMessage ? {
			send: (e) => (M.send ?? M.sendMessage)?.call(M, e),
			onMessage: (e) => M.onMessage(e)
		} : void 0, [M]), P = j && g && g.chatChannelFor ? g.chatChannelFor(j, k?.callId ?? null) ?? void 0 : void 0, ee = d.useMeeting ? d.useMeeting(j, {
			enabled: !!j,
			socket: N,
			roleKey: k ? `${k.callId ?? ""}:${k.phase}` : null,
			...P ? { chatChannel: P } : {}
		}) : null, te = j && ee ? ee : null, F = d.useConversationCall({
			lobbyName: b?.lobbyName ?? yt,
			...te?.activeLobby ? { mediaLobby: te.activeLobby } : {},
			channel: b?.channel ?? null,
			self: e ?? {
				userId: "",
				displayName: ""
			},
			platformApi: {
				baseUrl: n ?? "",
				getIdToken: r
			},
			gateway: i,
			discover: !!b && a,
			initialMedia: {
				micOn: E.micOn,
				cameraOn: E.cameraOn
			},
			...p ? { nameFor: p } : {},
			...c ? {
				onCallStarted: (e) => T("started", e),
				onCallEnded: (e) => T("ended", e),
				onCallMissed: (e) => T("missed", e)
			} : {}
		}), I = Y(F);
		I.current = F;
		let [L, ne] = X(null), [re, ie] = X(null), R = G((e, t, n) => {
			let r = jt(_);
			if (!ft(r, e)) {
				O(r), ie({ run: t });
				return;
			}
			ne((i) => i ?? {
				kind: e,
				run: t,
				...n ? { cancel: n } : {},
				initial: r
			});
		}, [_]), ae = G((e, t) => dt("start", I.current.phase, !!I.current.call) ? (R("start", (n) => {
			n.start(e, t);
		}), Promise.resolve()) : I.current.start(e, t), [R]), oe = G((e) => {
			let t = I.current;
			return dt("rejoin", t.phase, !!t.call) ? (R("join", (t) => {
				t.rejoin(e);
			}), Promise.resolve()) : t.rejoin(e);
		}, [R]), se = G(() => {
			ne((e) => e ?? {
				kind: "check",
				run: () => {},
				initial: pt(jt(_))
			});
		}, [_]), z = J(() => ({
			...F,
			start: ae,
			rejoin: oe
		}), [
			F,
			ae,
			oe
		]);
		q(() => {
			re && (re.run(I.current), ie(null));
		}, [re]), C.current = z.call?.host ?? C.current, z.phase === "idle" && (C.current = null);
		let ce = Y(z.phase);
		ce.current = z.phase;
		let B = Y(null), le = Y(null), ue = G((e, t) => {
			if (S.current) return;
			let n = ce.current;
			(n === "idle" || n === "ringing") && (B.current = t ?? null, le.current = e.lobbyName, x((t) => t && t.lobbyName === e.lobbyName && t.title === e.title && t.channel === e.channel && t.startBlockedReason === e.startBlockedReason ? t : e));
		}, []), V = G((e) => {
			if (S.current) return;
			let t = ce.current;
			(t === "idle" || t === "ringing") && le.current === e && (le.current = null, B.current = null, x((t) => t && t.lobbyName === e ? null : t));
		}, []), de = G(() => {
			B.current?.start();
		}, []), fe = Y(s);
		fe.current = s;
		let H = d.useIncomingConversationCalls({
			gateway: i,
			self: {
				userId: e?.userId ?? null,
				...e ? { displayName: e.displayName } : {}
			},
			onAccept: ((e) => {
				S.current = e, le.current = e.lobbyName, B.current = null, x({
					lobbyName: e.lobbyName,
					title: e.callerName,
					channel: e.channel
				}), fe.current?.(e);
			})
		}), pe = Y(null);
		q(() => {
			let e = S.current;
			!e || b?.lobbyName !== e.lobbyName || pe.current !== e.callId && (pe.current = e.callId, R("accept", (t) => {
				S.current = null, t.accept(e);
			}, () => {
				S.current = null, H.decline(e), V(e.lobbyName);
			}));
		}, [
			b,
			R,
			H,
			V
		]);
		let me = kt({
			gatewayConfigured: a,
			platformApiUrl: n,
			signedIn: !!e,
			connectionState: o
		}), he = J(() => e ? {
			userId: e.userId,
			displayName: e.displayName
		} : null, [e?.userId, e?.displayName]), U = b && it(F.phase, !0) && F.call ? b.lobbyName : null, ge = F.call?.callId ?? null, _e = U ? String(F.phase) : "";
		q(() => {
			A((e) => U ? e && e.lobbyName === U && e.callId === ge && e.phase === _e ? e : {
				lobbyName: U,
				callId: ge,
				phase: _e
			} : null);
		}, [
			U,
			ge,
			_e
		]);
		let W = m !== !1 && $(z.phase, !0) ? z.recording ?? null : null, ve = u(W?.enabled ? `call-recording:${W.sessionId}` : null), ye = m ? m.privacyHref : void 0, be = m ? m.privacyLabel : void 0, xe = J(() => W?.enabled && !ve.dismissed ? /* @__PURE__ */ Z(l, {
			open: !0,
			kind: "recording",
			placement: "line",
			onDismiss: ve.dismiss,
			...ye ? { privacyHref: ye } : {},
			...be ? { privacyLabel: be } : {}
		}) : null, [
			W?.enabled,
			ve.dismissed,
			ve.dismiss,
			ye,
			be
		]), Se = J(() => W?.enabled ? /* @__PURE__ */ Z(l, {
			open: !0,
			kind: "recording",
			placement: "indicator",
			"data-testid": "call-recording-indicator"
		}) : null, [W?.enabled]), Ce = J(() => ({
			call: z,
			recordingNote: xe,
			recordingIndicator: Se,
			callNoun: h,
			lobby: b,
			bind: ue,
			unbind: V,
			startBound: b && B.current ? de : null,
			self: he,
			tenant: t,
			gatewayConfigured: a,
			connectionState: o,
			platformApiUrl: n,
			unavailableReason: me,
			checkDevices: se,
			meeting: te
		}), [
			z,
			xe,
			Se,
			h,
			b,
			ue,
			V,
			de,
			he,
			t,
			a,
			o,
			n,
			me,
			se,
			te
		]), we = H.rings[0] ?? null;
		return /* @__PURE__ */ Q(f.Provider, {
			value: Ce,
			children: [
				y,
				L && /* @__PURE__ */ Z(v, {
					kind: L.kind,
					title: b?.title ?? `this ${h}`,
					callNoun: h,
					selfName: e?.displayName ?? "",
					selfAvatarUrl: e?.avatarUrl,
					initial: L.initial,
					onCancel: () => {
						let e = L;
						ne(null), e.cancel?.();
					},
					onJoin: (e, t) => {
						let n = L;
						Mt(_, e), I.current.devices.set({
							...I.current.devices.prefs,
							...t
						}), ne(null), n.kind !== "check" && (O(e), ie({ run: n.run }));
					}
				}),
				we && /* @__PURE__ */ Z(D, {
					ring: we,
					onAccept: () => H.accept(we),
					onDecline: () => H.decline(we)
				})
			]
		});
	}
	function b({ children: e }) {
		let t = K(f), [n, r] = X(!1), i = !!t?.lobby && it(t.call.phase, !0);
		q(() => {
			r(i);
		}, [i]);
		let a = J(() => ({
			open: i && n,
			setOpen: r,
			toggle: () => r((e) => !e)
		}), [i, n]);
		return /* @__PURE__ */ Z(m.Provider, {
			value: a,
			children: e
		});
	}
	function x({ scopeKey: e, videoUrl: t, children: n, ...r }) {
		return /* @__PURE__ */ Z(S, {
			videoUrl: t,
			...r,
			children: n
		}, e);
	}
	function S({ videoUrl: e, children: t, ...n }) {
		let r = Y(null);
		e && !r.current && (r.current = e);
		let [i] = X(() => new tt());
		return /* @__PURE__ */ Z(g, {
			baseUrl: r.current ?? "",
			getAuthToken: bt,
			children: /* @__PURE__ */ Z(y, {
				...n,
				children: /* @__PURE__ */ Z(p.Provider, {
					value: i,
					children: /* @__PURE__ */ Z(b, { children: t })
				})
			})
		});
	}
	function C() {
		return K(f);
	}
	function w() {
		return K(m);
	}
	function T(e, t) {
		let n = K(p), r = n ? e(n) : t;
		return Xe(n?.subscribe ?? xt, r, r);
	}
	function O() {
		return T((e) => e.placement, Ct);
	}
	function k() {
		return T((e) => e.pageClaimed, wt);
	}
	function A(e, t, n = !0, r = {}) {
		let i = K(p), a = !!r.compact, o = r.fit ?? "width", s = JSON.stringify(r.documents ?? []), c = J(() => JSON.parse(s), [s]);
		Ye(() => i && e && n ? i.claim(e, t, {
			compact: a,
			documents: c,
			fit: o
		}) : void 0, [
			i,
			e,
			n,
			t,
			a,
			c,
			o
		]);
		let l = T((e) => e.current, St);
		return !!e && l === e;
	}
	function j({ placement: e, compact: n = !1, documents: r, fit: i, className: a }) {
		let o = K(f), s = K(m), [c, l] = X(null), u = At(c), d = !!o?.lobby && $(o.call.phase, !0), p = e === "stage" ? d && u > 0 : e === "composer" ? u > 0 : e === "pane" || d && !!s?.open && u > 0, h = e === "composer" || e === "stage", g = h && (n || rt(u)), _ = A(c, e, p, {
			compact: g,
			...r ? { documents: r } : {},
			...i ? { fit: i } : {}
		}), v = e === "stage" ? "call-stage" : e === "composer" ? "composer-call-dock" : e === "page" ? "page-call-block" : e === "block" ? "shell-call-block" : "call-block-pane";
		return /* @__PURE__ */ Z(t, {
			ref: l,
			gap: "none",
			className: a ?? (e === "composer" ? "min-w-0" : "shrink-0 min-w-0"),
			"aria-label": vt(o?.callNoun ?? "huddle"),
			"data-testid": v,
			"data-holds-media": _ ? "true" : "false",
			...h ? { "data-compact": g ? "true" : "false" } : {}
		});
	}
	function M(e, t) {
		let n = K(f), r = n?.bind, i = n?.unbind, a = Y(() => {});
		a.current = t ?? (() => {});
		let o = J(() => ({ start: () => a.current() }), []), s = e?.lobbyName ?? null, c = e?.title ?? "", l = e?.channel ?? null, u = e?.startBlockedReason;
		q(() => {
			r && s && r({
				lobbyName: s,
				title: c,
				channel: l,
				...u ? { startBlockedReason: u } : {}
			}, o);
		}, [
			r,
			s,
			c,
			l,
			u,
			o
		]), q(() => {
			if (!(!i || !s)) return () => i(s);
		}, [i, s]);
		let d = !!n && !!s && n.lobby?.lobbyName === s;
		return {
			here: d,
			live: d && !!n && n.call.phase === "idle" && !!n.call.call
		};
	}
	function N(e, t = {}) {
		let n = K(f), r = typeof e == "string" || e === null ? [e] : e, i = r.find((e) => !!e) ?? null, a = t.bind ?? null, o = a ? a.lobbyName === void 0 ? i : a.lobbyName : null, s = a ? a.blockedReason ?? n?.unavailableReason ?? void 0 : void 0, c = M(a && o ? {
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
				n.lobby?.lobbyName === o && st(n.call);
			}
		}), l = t.enabled !== !1 && at(n?.lobby ?? null, n?.call.phase ?? "idle", r);
		return {
			block: l ? /* @__PURE__ */ Z(j, {
				placement: "composer",
				compact: !!t.compact,
				...t.documents ? { documents: t.documents } : {}
			}) : void 0,
			holds: l,
			...c
		};
	}
	function P({ id: e, onOpenPeople: n, onOpenDocument: r, overlay: i, header: a, extras: o, notice: s, recordingConsent: c, dockTestId: l }) {
		let u = K(f), d = T((e) => e.current, St), p = T((e) => e.placement, Ct), m = T((e) => e.compact, wt), g = T((e) => e.documents, Et), _ = T((e) => e.fit, Dt), v = !!u?.lobby && $(u.call.phase, !0), y = !!d && p === "composer", b = !!d && p !== "pane", x = nt(d ? p : "footer", m), S = !!d && x === "grid" && _ === "contain", C = u?.lobby ?? null, w = u?.meeting?.hands, E = J(() => {
			if (!w || w.length === 0) return;
			let e = new Map(w.map((e, t) => [e.userId, t + 1]));
			return (t) => e.get(t);
		}, [w]), D = !!d && a != null && !!u?.meeting, O = x !== "grid" && x !== "stage", k = c === !1 || D || O ? null : u?.recordingNote ?? null, A = c === !1 || !O ? null : u?.recordingIndicator ?? null, j = k && s !== void 0 ? /* @__PURE__ */ Q(t, {
			gap: "xs",
			children: [k, s]
		}) : k ?? s, M = v && C && u ? /* @__PURE__ */ Z(h, {
			call: u.call,
			title: C.title,
			onOpenPeople: () => n?.(C, u.tenant),
			selfName: u.self?.displayName ?? "",
			compact: !b || m,
			...b && !m ? { tileSize: "lg" } : {},
			...y && g.length ? {
				documents: g.map((e) => ({
					id: e.id,
					title: e.title
				})),
				onDocumentClick: (e) => {
					let t = g.find((t) => t.id === e);
					t && r?.(t);
				}
			} : {},
			layout: x,
			...S ? { fit: "contain" } : {},
			...E ? { handFor: E } : {},
			...o === void 0 ? {} : { extras: o },
			...j == null ? {} : { notice: j },
			...A ? { metaAside: A } : {},
			"data-testid": l ? l(C, u.tenant) : "conversation-call-dock"
		}) : null;
		return M ? d ? Qe(/* @__PURE__ */ Q(t, {
			gap: "none",
			className: p === "stage" ? "relative h-full min-h-0" : S ? "relative min-h-0 flex-1" : "relative",
			"data-testid": "shell-call-media",
			"data-placement": p,
			"data-layout": x,
			"data-expanded": "true",
			children: [
				a,
				M,
				i
			]
		}), d) : /* @__PURE__ */ Z(t, {
			id: e,
			gap: "none",
			className: "hidden",
			"data-testid": "shell-call-media",
			"data-placement": "footer",
			"data-layout": x,
			"data-expanded": "false",
			children: M
		}) : null;
	}
	return {
		CallHostProvider: x,
		CallMediaOutlet: P,
		CallBlock: j,
		PreJoinDialog: v,
		ConversationCallDock: h,
		useCallHost: C,
		useCallBlock: N,
		useCallLobby: M,
		useCallMediaPanel: w,
		useCallBlockPlacement: O,
		useCallBlockPageClaimed: k,
		useClaimCallBlock: A
	};
}
//#endregion
export { x as ACTIVITY_HISTORY_LINES, pe as ALL_REALTIME_CAPABILITIES, ue as CONVERSATION_CAPABILITY_NAMES, ze as CapabilityBoundary, ke as CapabilityGate, Ce as DEFAULT_REALTIME_CAPABILITIES, D as IncomingCallToast, m as MAX_ATTACHMENT_BYTES, f as MAX_IMAGE_BYTES, Fe as MeetingChatContext, we as MeetingChatTargetSwitch, B as NetworkErrorBoundary, te as NewHangoutRoomDialog, Me as RealtimeIntegrationsProvider, Ke as ReconnectingShim, b as WrappedActivityPanel, Oe as WrappedAudioVideoSettingsForm, je as WrappedBreakoutRoomBanner, _e as WrappedBreakoutRoomsPanel, Se as WrappedCanvasDocument, ye as WrappedChatPanel, Ge as WrappedConnectionPill, xe as WrappedConversationSurface, F as WrappedCursorOverlay, v as WrappedFileUploadDrop, ee as WrappedHangoutLayout, U as WrappedMediaEffectsPreviewPanel, ae as WrappedMediaEffectsTray, ce as WrappedNotificationBell, Ue as WrappedNotificationCenter, j as WrappedPresencePanel, Ve as WrappedReactionsOverlay, p as acceptsDocumentImage, g as adaptActivityEvent, ve as adaptActivityEvents, se as adaptBreakoutRooms, k as adaptChatMessage, A as adaptChatMessages, M as adaptFileUploadState, S as adaptFileUploads, T as adaptHangoutParticipant, O as adaptHangoutParticipants, P as adaptMessageReactions, qe as adaptNotification, _ as adaptNotifications, L as adaptPresenceEntry, w as adaptPresenceRoster, I as adaptReaction, ne as adaptReactions, Be as applyNetworkShim, ie as buildCanvasDocumentExtensions, ot as callCounts, $ as callDrawn, R as canEditCanvasGrant, N as canvasDocumentSaveState, fe as canvasRecoveryKey, Re as capabilityNamesFor, Nt as createCallBlockHost, re as createCanvasDocumentPane, E as createConversationCallDock, de as createConversationFeaturesFor, He as createHangoutRoomRow, We as createHangoutRoomsSection, ge as createRealtimeCapabilityProvider, W as createRealtimeIntegrations, oe as createWrappedHangoutRoomsList, De as createWrappedLVSHangoutLayout, Pe as createWrappedStreamStage, Ie as decodeCanvasRecovery, Ee as defaultRoomDrafts, Te as encodeCanvasRecovery, Ae as incomingCallTitle, me as mediaEffectsChangeCount, Ne as meetingChatTitle, le as meetingHandPositions, be as meetingRosterProps, Le as meetingToolbarItems, C as newestActivityFirst, st as pageHuddleStart, y as slugifyRoomName, h as useCanvasRecovery, d as useDocumentImageUpload, V as useMeetingChat, he as useRealtimeCapabilities, z as useRealtimeIntegrations, H as withMeetingHands };
