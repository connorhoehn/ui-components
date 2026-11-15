import { n as e } from "../Button-DQoeE5dN.js";
import { n as t, t as n } from "../Stack-CE1FjEn8.js";
import { n as r } from "../Text-XdCzxWMv.js";
import { g as i } from "../MediaIcons-_ai5Til2.js";
import { t as a } from "../Modal-C88cabjQ.js";
import { t as o } from "../DropdownMenu-LFtIWj5Y.js";
import { t as s } from "../Switch-CRiY_kzy.js";
import { C as c } from "../BreakoutRoomsPanel-C7i_9DZb.js";
import { n as l, r as u } from "../RecordingConsentNotice-CQQxSHA6.js";
import { i as d, n as f, r as p, t as m } from "../useDocumentImageUpload-CzkKVL2u.js";
import { $ as h, A as g, B as ee, C as _, Ct as v, D as y, E as b, F as x, G as S, H as C, I as w, J as T, K as E, L as D, M as O, N as k, O as A, P as j, Q as M, R as N, S as P, St as F, T as I, U as L, V as te, W as ne, X as re, Y as R, Z as ie, _ as ae, _t as oe, a as z, at as se, b as B, bt as ce, c as le, ct as ue, d as de, dt as fe, et as V, f as pe, ft as me, g as he, gt as H, h as ge, ht as _e, i as U, it as ve, j as ye, k as be, l as xe, lt as Se, m as Ce, mt as we, n as Te, nt as Ee, o as De, ot as Oe, p as ke, pt as Ae, q as je, r as Me, rt as Ne, s as Pe, st as Fe, t as Ie, tt as Le, u as Re, ut as ze, v as Be, vt as Ve, w as He, wt as Ue, x as We, xt as Ge, y as Ke, yt as qe, z as Je } from "../meeting-CK4rLPkI.js";
import { createContext as Ye, useCallback as W, useContext as G, useEffect as K, useLayoutEffect as Xe, useMemo as q, useRef as J, useState as Y, useSyncExternalStore as Ze } from "react";
import { Fragment as Qe, jsx as X, jsxs as Z } from "react/jsx-runtime";
import { createPortal as $e } from "react-dom";
//#region src/integrations/realtime/callBlockModel.ts
var et = [], tt = [
	"stage",
	"composer",
	"page",
	"block",
	"pane"
], nt = class {
	claims = [];
	listeners = /* @__PURE__ */ new Set();
	claim(e, t = "page", n = {}) {
		let r = Symbol("call-block-claim");
		return this.claims = [...this.claims, {
			token: r,
			target: e,
			placement: t,
			compact: !!n.compact,
			documents: n.documents ?? et
		}], this.emit(), () => {
			let e = this.claims.length;
			this.claims = this.claims.filter((e) => e.token !== r), this.claims.length !== e && this.emit();
		};
	}
	top() {
		for (let e of tt) for (let t = this.claims.length - 1; t >= 0; --t) if (this.claims[t].placement === e) return this.claims[t];
		return null;
	}
	current = () => this.top()?.target ?? null;
	placement = () => this.top()?.placement ?? "footer";
	compact = () => this.top()?.compact ?? !1;
	documents = () => this.top()?.documents ?? et;
	pageClaimed = () => this.claims.some((e) => e.placement !== "pane");
	subscribe = (e) => (this.listeners.add(e), () => {
		this.listeners.delete(e);
	});
	emit() {
		for (let e of this.listeners) e();
	}
};
function rt(e, t = !1) {
	return e === "stage" ? "stage" : e === "composer" || e === "block" ? "compact" : e === "pane" ? "grid" : "shelf";
}
function it(e) {
	return e > 0 && e < 640;
}
function Q(e, t) {
	return t && e !== "idle" && e !== "ringing";
}
function at(e, t) {
	return Q(e, t) && e !== "ended" && e !== "failed";
}
function ot(e, t, n) {
	return !e || !Q(t, !0) ? !1 : n.some((t) => !!t && (t === e.lobbyName || t === e.channel));
}
function st(e) {
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
function ct(e) {
	return e.phase === "idle" && e.call ? (e.rejoin(), "rejoin") : e.phase === "idle" || e.phase === "ended" || e.phase === "failed" ? (e.start([]), "start") : null;
}
var $ = {
	micOn: !0,
	cameraOn: !0,
	remember: !1
}, lt = 1e4;
function ut(e) {
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
var _t = {
	start: "Start a huddle",
	join: "Join the huddle",
	accept: "Join the huddle",
	check: "Check your devices"
}, vt = "__unbound__", yt = () => "", bt = () => () => {}, xt = () => null, St = () => "footer", Ct = () => !1, wt = [], Tt = () => wt, Et = "ui.call-prejoin.v1";
function Dt(e) {
	return e.gatewayConfigured ? e.platformApiUrl ? e.signedIn ? e.connectionState === "connected" ? null : "Connecting to the realtime gateway…" : "Sign in to start a call" : "Calls need platform-api — the middleware returned no platformApiUrl (REALTIME_PLATFORM_PUBLIC_URL) and VITE_PLATFORM_API_URL is not set" : "Calls need the realtime gateway — the middleware returned no gatewayUrl and VITE_GATEWAY_URL is not set";
}
function Ot(e) {
	let [t, n] = Y(0);
	return Xe(() => {
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
function kt(e) {
	try {
		return ut(window.localStorage.getItem(e));
	} catch {
		return ut(null);
	}
}
function At(e, t) {
	try {
		window.localStorage.setItem(e, JSON.stringify(ht(t)));
	} catch {}
}
function jt(d) {
	let f = Ye(null), p = Ye(null), m = Ye(null), h = T(d), { LVSProvider: g } = d, ee = d.useCallMediaEffects ?? (() => null);
	function _({ kind: l, title: u, selfName: f, selfAvatarUrl: p, initial: m, onJoin: h, onCancel: g }) {
		let [_, v] = Y(m), y = d.useMediaDevices({ requestOnMount: !1 }), b = d.useAudioVideoSettings({
			preview: _.micOn || _.cameraOn,
			previewAudio: _.micOn,
			previewVideo: _.cameraOn
		}), x = ee(), [S, C] = Y(null), w = x?.processStream, T = x?.detach;
		K(() => {
			if (!b.previewStream) {
				T?.(), C(null);
				return;
			}
			C(w?.(b.previewStream) ?? b.previewStream);
		}, [
			b.previewStream,
			w,
			T,
			x?.outputTrack
		]);
		let E = mt(l), [D, O] = Y(E), k = J(!1), A = J({
			choice: _,
			settings: b.settings
		});
		A.current = {
			choice: _,
			settings: b.settings
		};
		let j = () => {
			let { choice: e, settings: t } = A.current;
			h(e, {
				...t.microphoneId ? { microphoneId: t.microphoneId } : {},
				...t.cameraId ? { cameraId: t.cameraId } : {},
				...t.speakerId ? { speakerId: t.speakerId } : {}
			});
		}, M = J(j);
		M.current = j;
		let N = J(!0);
		return K(() => {
			if (N.current) {
				N.current = !1;
				return;
			}
			k.current = !0, O(null);
		}, [_, b.settings]), K(() => {
			if (E === null) return;
			let e = Date.now(), t = window.setInterval(() => {
				if (k.current) {
					window.clearInterval(t);
					return;
				}
				let n = E - (Date.now() - e);
				if (n <= 0) {
					window.clearInterval(t), M.current();
					return;
				}
				O(n);
			}, 250);
			return () => window.clearInterval(t);
		}, [E]), /* @__PURE__ */ Z(a, {
			open: !0,
			onClose: g,
			ariaLabel: _t[l],
			maxWidth: 1e3,
			rawChildren: !0,
			cardClassName: "flex max-h-[90dvh] flex-col gap-5 overflow-hidden border border-border p-5 sm:p-6",
			backdropTestId: "prejoin-backdrop",
			children: [
				/* @__PURE__ */ Z(n, {
					justify: "between",
					align: "baseline",
					gap: "md",
					wrap: !1,
					className: "min-w-0 shrink-0 border-b border-border pb-4",
					"data-testid": "prejoin-header",
					children: [/* @__PURE__ */ X("h2", {
						className: "m-0 shrink-0 text-lg font-semibold text-text-primary",
						children: _t[l]
					}), /* @__PURE__ */ X(r, {
						size: "sm",
						weight: "medium",
						className: "min-w-0 truncate text-right",
						title: u,
						"data-testid": "prejoin-title",
						children: u
					})]
				}),
				/* @__PURE__ */ Z(t, {
					gap: "md",
					className: "min-h-0 overflow-y-auto",
					"data-testid": "prejoin-dialog",
					onPointerDownCapture: () => {
						k.current = !0, O(null);
					},
					onKeyDownCapture: () => {
						k.current = !0, O(null);
					},
					children: [/* @__PURE__ */ Z(r, {
						size: "xs",
						tone: "secondary",
						children: ["Joining as ", f]
					}), /* @__PURE__ */ X(ke, {
						devices: y,
						settings: {
							...b,
							previewStream: S
						},
						cameraOn: _.cameraOn,
						selfName: f,
						selfAvatarUrl: p,
						layout: "prejoin",
						"data-testid": "prejoin-devices",
						previewControls: /* @__PURE__ */ Z(Qe, { children: [
							/* @__PURE__ */ X(c, {
								kind: "microphone",
								on: _.micOn,
								onToggle: () => v((e) => ({
									...e,
									micOn: !e.micOn
								})),
								devices: y.microphones,
								selectedDeviceId: b.settings.microphoneId,
								onSelectDevice: (e) => b.update({ microphoneId: e }),
								permission: y.permission.microphone,
								level: b.micLevel,
								showLabel: !0,
								"data-testid": "prejoin-mic"
							}),
							/* @__PURE__ */ X(c, {
								kind: "camera",
								on: _.cameraOn,
								onToggle: () => v((e) => ({
									...e,
									cameraOn: !e.cameraOn
								})),
								devices: y.cameras,
								selectedDeviceId: b.settings.cameraId,
								onSelectDevice: (e) => b.update({ cameraId: e }),
								permission: y.permission.camera,
								showLabel: !0,
								"data-testid": "prejoin-camera"
							}),
							x && /* @__PURE__ */ Z(Qe, { children: [/* @__PURE__ */ Z(e, {
								size: "sm",
								variant: "secondary",
								"aria-pressed": x.backgroundMode === "blur",
								onClick: () => x.setBackgroundMode(x.backgroundMode === "blur" ? "none" : "blur"),
								"data-testid": "prejoin-blur",
								children: [/* @__PURE__ */ X(i, { size: 16 }), "Blur"]
							}), /* @__PURE__ */ X(o, {
								trigger: "Effects",
								triggerLabel: "Camera effects",
								triggerVariant: "secondary",
								triggerTestId: "prejoin-effects",
								sections: [{
									label: "Background",
									items: [
										{
											label: "None",
											checked: x.backgroundMode === "none",
											onSelect: () => x.setBackgroundMode("none")
										},
										{
											label: "Blur background",
											checked: x.backgroundMode === "blur",
											onSelect: () => x.setBackgroundMode("blur")
										},
										...x.backgrounds.map((e) => ({
											label: e.label,
											checked: x.backgroundMode === "image" && x.backgroundImageUrl === e.url,
											onSelect: () => {
												x.setBackgroundImageUrl(e.url), x.setBackgroundMode("image");
											}
										}))
									]
								}, {
									label: "Appearance",
									items: x.filters.map((e) => ({
										label: e.label,
										checked: x.filterId === e.id,
										onSelect: () => x.setFilter(e.id)
									}))
								}]
							})] })
						] })
					})]
				}),
				/* @__PURE__ */ Z(n, {
					justify: "between",
					align: "center",
					gap: "md",
					wrap: !0,
					className: "shrink-0 border-t border-border pt-4",
					"data-testid": "prejoin-footer",
					children: [/* @__PURE__ */ Z(n, {
						gap: "sm",
						align: "center",
						wrap: !1,
						children: [/* @__PURE__ */ X(s, {
							checked: _.remember,
							onChange: (e) => v((t) => ({
								...t,
								remember: e
							})),
							"aria-label": "Remember and skip this check next time",
							"data-testid": "prejoin-remember"
						}), /* @__PURE__ */ X(r, {
							size: "xs",
							tone: "secondary",
							children: "Skip device setup next time"
						})]
					}), /* @__PURE__ */ Z(n, {
						gap: "sm",
						justify: "end",
						className: "ml-auto",
						children: [/* @__PURE__ */ X(e, {
							variant: "secondary",
							onClick: g,
							"data-testid": "prejoin-cancel",
							children: l === "accept" ? "Decline" : "Cancel"
						}), /* @__PURE__ */ X(e, {
							onClick: j,
							"data-testid": "prejoin-join",
							children: D === null ? l === "check" ? "Save" : "Join now" : `Join as last time (${gt(D)})`
						})]
					})]
				})
			]
		});
	}
	function v({ self: e, tenant: t, platformApiUrl: n, getIdToken: r, gateway: i, gatewayConfigured: a, connectionState: o, onAccept: s, onCallEvent: c, nameFor: p, recordingConsent: m, meeting: h, preJoinStorageKey: g = Et, children: ee }) {
		let [v, y] = Y(null), b = J(null), x = J(null), S = J(c);
		S.current = c;
		let C = (t, n) => {
			S.current?.(t, n, {
				host: x.current,
				selfId: e?.userId ?? ""
			});
		}, [w, T] = Y(() => kt(g)), [D, O] = Y(null), k = h && d.useMeeting && D && (!h.enabledFor || h.enabledFor(D.lobbyName)) ? D.lobbyName : null, A = i, j = q(() => A?.onMessage ? {
			send: (e) => (A.send ?? A.sendMessage)?.call(A, e),
			onMessage: (e) => A.onMessage(e)
		} : void 0, [A]), M = k && h && h.chatChannelFor ? h.chatChannelFor(k, D?.callId ?? null) ?? void 0 : void 0, N = d.useMeeting ? d.useMeeting(k, {
			enabled: !!k,
			socket: j,
			roleKey: D ? `${D.callId ?? ""}:${D.phase}` : null,
			...M ? { chatChannel: M } : {}
		}) : null, P = k && N ? N : null, F = d.useConversationCall({
			lobbyName: v?.lobbyName ?? vt,
			...P?.activeLobby ? { mediaLobby: P.activeLobby } : {},
			channel: v?.channel ?? null,
			self: e ?? {
				userId: "",
				displayName: ""
			},
			platformApi: {
				baseUrl: n ?? "",
				getIdToken: r
			},
			gateway: i,
			discover: !!v && a,
			initialMedia: {
				micOn: w.micOn,
				cameraOn: w.cameraOn
			},
			...p ? { nameFor: p } : {},
			...c ? {
				onCallStarted: (e) => C("started", e),
				onCallEnded: (e) => C("ended", e),
				onCallMissed: (e) => C("missed", e)
			} : {}
		}), I = J(F);
		I.current = F;
		let [L, te] = Y(null), [ne, re] = Y(null), R = W((e, t, n) => {
			let r = kt(g);
			if (!ft(r, e)) {
				T(r), re({ run: t });
				return;
			}
			te((i) => i ?? {
				kind: e,
				run: t,
				...n ? { cancel: n } : {},
				initial: r
			});
		}, [g]), ie = W((e, t) => dt("start", I.current.phase, !!I.current.call) ? (R("start", (n) => {
			n.start(e, t);
		}), Promise.resolve()) : I.current.start(e, t), [R]), ae = W((e) => {
			let t = I.current;
			return dt("rejoin", t.phase, !!t.call) ? (R("join", (t) => {
				t.rejoin(e);
			}), Promise.resolve()) : t.rejoin(e);
		}, [R]), oe = W(() => {
			te((e) => e ?? {
				kind: "check",
				run: () => {},
				initial: pt(kt(g))
			});
		}, [g]), z = q(() => ({
			...F,
			start: ie,
			rejoin: ae
		}), [
			F,
			ie,
			ae
		]);
		K(() => {
			ne && (ne.run(I.current), re(null));
		}, [ne]), x.current = z.call?.host ?? x.current, z.phase === "idle" && (x.current = null);
		let se = J(z.phase);
		se.current = z.phase;
		let B = J(null), ce = J(null), le = W((e, t) => {
			if (b.current) return;
			let n = se.current;
			(n === "idle" || n === "ringing") && (B.current = t ?? null, ce.current = e.lobbyName, y((t) => t && t.lobbyName === e.lobbyName && t.title === e.title && t.channel === e.channel && t.startBlockedReason === e.startBlockedReason ? t : e));
		}, []), ue = W((e) => {
			if (b.current) return;
			let t = se.current;
			(t === "idle" || t === "ringing") && ce.current === e && (ce.current = null, B.current = null, y((t) => t && t.lobbyName === e ? null : t));
		}, []), de = W(() => {
			B.current?.start();
		}, []), fe = J(s);
		fe.current = s;
		let V = d.useIncomingConversationCalls({
			gateway: i,
			self: {
				userId: e?.userId ?? null,
				...e ? { displayName: e.displayName } : {}
			},
			onAccept: ((e) => {
				b.current = e, ce.current = e.lobbyName, B.current = null, y({
					lobbyName: e.lobbyName,
					title: e.callerName,
					channel: e.channel
				}), fe.current?.(e);
			})
		}), pe = J(null);
		K(() => {
			let e = b.current;
			!e || v?.lobbyName !== e.lobbyName || pe.current !== e.callId && (pe.current = e.callId, R("accept", (t) => {
				b.current = null, t.accept(e);
			}, () => {
				b.current = null, V.decline(e), ue(e.lobbyName);
			}));
		}, [
			v,
			R,
			V,
			ue
		]);
		let me = Dt({
			gatewayConfigured: a,
			platformApiUrl: n,
			signedIn: !!e,
			connectionState: o
		}), he = q(() => e ? {
			userId: e.userId,
			displayName: e.displayName
		} : null, [e?.userId, e?.displayName]), H = v && at(F.phase, !0) && F.call ? v.lobbyName : null, ge = F.call?.callId ?? null, _e = H ? String(F.phase) : "";
		K(() => {
			O((e) => H ? e && e.lobbyName === H && e.callId === ge && e.phase === _e ? e : {
				lobbyName: H,
				callId: ge,
				phase: _e
			} : null);
		}, [
			H,
			ge,
			_e
		]);
		let U = m !== !1 && Q(z.phase, !0) ? z.recording ?? null : null, ve = u(U?.enabled ? `call-recording:${U.sessionId}` : null), ye = m ? m.privacyHref : void 0, be = m ? m.privacyLabel : void 0, xe = q(() => U?.enabled && !ve.dismissed ? /* @__PURE__ */ X(l, {
			open: !0,
			kind: "recording",
			placement: "line",
			onDismiss: ve.dismiss,
			...ye ? { privacyHref: ye } : {},
			...be ? { privacyLabel: be } : {}
		}) : null, [
			U?.enabled,
			ve.dismissed,
			ve.dismiss,
			ye,
			be
		]), Se = q(() => U?.enabled ? /* @__PURE__ */ X(l, {
			open: !0,
			kind: "recording",
			placement: "indicator",
			"data-testid": "call-recording-indicator"
		}) : null, [U?.enabled]), Ce = q(() => ({
			call: z,
			recordingNote: xe,
			recordingIndicator: Se,
			lobby: v,
			bind: le,
			unbind: ue,
			startBound: v && B.current ? de : null,
			self: he,
			tenant: t,
			gatewayConfigured: a,
			connectionState: o,
			platformApiUrl: n,
			unavailableReason: me,
			checkDevices: oe,
			meeting: P
		}), [
			z,
			xe,
			Se,
			v,
			le,
			ue,
			de,
			he,
			t,
			a,
			o,
			n,
			me,
			oe,
			P
		]), we = V.rings[0] ?? null;
		return /* @__PURE__ */ Z(f.Provider, {
			value: Ce,
			children: [
				ee,
				L && /* @__PURE__ */ X(_, {
					kind: L.kind,
					title: v?.title ?? "this huddle",
					selfName: e?.displayName ?? "",
					selfAvatarUrl: e?.avatarUrl,
					initial: L.initial,
					onCancel: () => {
						let e = L;
						te(null), e.cancel?.();
					},
					onJoin: (e, t) => {
						let n = L;
						At(g, e), I.current.devices.set({
							...I.current.devices.prefs,
							...t
						}), te(null), n.kind !== "check" && (T(e), re({ run: n.run }));
					}
				}),
				we && /* @__PURE__ */ X(E, {
					ring: we,
					onAccept: () => V.accept(we),
					onDecline: () => V.decline(we)
				})
			]
		});
	}
	function y({ children: e }) {
		let t = G(f), [n, r] = Y(!1), i = !!t?.lobby && at(t.call.phase, !0);
		K(() => {
			r(i);
		}, [i]);
		let a = q(() => ({
			open: i && n,
			setOpen: r,
			toggle: () => r((e) => !e)
		}), [i, n]);
		return /* @__PURE__ */ X(m.Provider, {
			value: a,
			children: e
		});
	}
	function b({ scopeKey: e, videoUrl: t, children: n, ...r }) {
		return /* @__PURE__ */ X(x, {
			videoUrl: t,
			...r,
			children: n
		}, e);
	}
	function x({ videoUrl: e, children: t, ...n }) {
		let r = J(null);
		e && !r.current && (r.current = e);
		let [i] = Y(() => new nt());
		return /* @__PURE__ */ X(g, {
			baseUrl: r.current ?? "",
			getAuthToken: yt,
			children: /* @__PURE__ */ X(v, {
				...n,
				children: /* @__PURE__ */ X(p.Provider, {
					value: i,
					children: /* @__PURE__ */ X(y, { children: t })
				})
			})
		});
	}
	function S() {
		return G(f);
	}
	function C() {
		return G(m);
	}
	function w(e, t) {
		let n = G(p), r = n ? e(n) : t;
		return Ze(n?.subscribe ?? bt, r, r);
	}
	function D() {
		return w((e) => e.placement, St);
	}
	function O() {
		return w((e) => e.pageClaimed, Ct);
	}
	function k(e, t, n = !0, r = {}) {
		let i = G(p), a = !!r.compact, o = JSON.stringify(r.documents ?? []), s = q(() => JSON.parse(o), [o]);
		Xe(() => i && e && n ? i.claim(e, t, {
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
		let c = w((e) => e.current, xt);
		return !!e && c === e;
	}
	function A({ placement: e, compact: n = !1, documents: r, className: i }) {
		let a = G(f), o = G(m), [s, c] = Y(null), l = Ot(s), u = !!a?.lobby && Q(a.call.phase, !0), d = e === "stage" ? u && l > 0 : e === "composer" ? l > 0 : e === "pane" || u && !!o?.open && l > 0, p = e === "composer" || e === "stage", h = p && (n || it(l)), g = k(s, e, d, {
			compact: h,
			...r ? { documents: r } : {}
		});
		return /* @__PURE__ */ X(t, {
			ref: c,
			gap: "none",
			className: i ?? (e === "composer" ? "min-w-0" : "shrink-0 min-w-0"),
			"aria-label": "Huddle",
			"data-testid": e === "stage" ? "call-stage" : e === "composer" ? "composer-call-dock" : e === "page" ? "page-call-block" : e === "block" ? "shell-call-block" : "call-block-pane",
			"data-holds-media": g ? "true" : "false",
			...p ? { "data-compact": h ? "true" : "false" } : {}
		});
	}
	function j(e, t) {
		let n = G(f), r = n?.bind, i = n?.unbind, a = J(() => {});
		a.current = t ?? (() => {});
		let o = q(() => ({ start: () => a.current() }), []), s = e?.lobbyName ?? null, c = e?.title ?? "", l = e?.channel ?? null, u = e?.startBlockedReason;
		K(() => {
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
		]), K(() => {
			if (!(!i || !s)) return () => i(s);
		}, [i, s]);
		let d = !!n && !!s && n.lobby?.lobbyName === s;
		return {
			here: d,
			live: d && !!n && n.call.phase === "idle" && !!n.call.call
		};
	}
	function M(e, t = {}) {
		let n = G(f), r = typeof e == "string" || e === null ? [e] : e, i = r.find((e) => !!e) ?? null, a = t.bind ?? null, o = a ? a.lobbyName === void 0 ? i : a.lobbyName : null, s = a ? a.blockedReason ?? n?.unavailableReason ?? void 0 : void 0, c = j(a && o ? {
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
				n.lobby?.lobbyName === o && ct(n.call);
			}
		}), l = t.enabled !== !1 && ot(n?.lobby ?? null, n?.call.phase ?? "idle", r);
		return {
			block: l ? /* @__PURE__ */ X(A, {
				placement: "composer",
				compact: !!t.compact,
				...t.documents ? { documents: t.documents } : {}
			}) : void 0,
			holds: l,
			...c
		};
	}
	function N({ id: e, onOpenPeople: n, onOpenDocument: r, overlay: i, header: a, extras: o, notice: s, recordingConsent: c, dockTestId: l }) {
		let u = G(f), d = w((e) => e.current, xt), p = w((e) => e.placement, St), m = w((e) => e.compact, Ct), g = w((e) => e.documents, Tt), ee = !!u?.lobby && Q(u.call.phase, !0), _ = !!d && p === "composer", v = !!d && p !== "pane", y = rt(d ? p : "footer", m), b = u?.lobby ?? null, x = u?.meeting?.hands, S = q(() => {
			if (!x || x.length === 0) return;
			let e = new Map(x.map((e, t) => [e.userId, t + 1]));
			return (t) => e.get(t);
		}, [x]), C = !!d && a != null && !!u?.meeting, T = y !== "grid" && y !== "stage", E = c === !1 || C || T ? null : u?.recordingNote ?? null, D = c === !1 || !T ? null : u?.recordingIndicator ?? null, O = E && s !== void 0 ? /* @__PURE__ */ Z(t, {
			gap: "xs",
			children: [E, s]
		}) : E ?? s, k = ee && b && u ? /* @__PURE__ */ X(h, {
			call: u.call,
			title: b.title,
			onOpenPeople: () => n?.(b, u.tenant),
			selfName: u.self?.displayName ?? "",
			compact: !v || m,
			...v && !m ? { tileSize: "lg" } : {},
			..._ && g.length ? {
				documents: g.map((e) => ({
					id: e.id,
					title: e.title
				})),
				onDocumentClick: (e) => {
					let t = g.find((t) => t.id === e);
					t && r?.(t);
				}
			} : {},
			layout: y,
			...S ? { handFor: S } : {},
			...o === void 0 ? {} : { extras: o },
			...O == null ? {} : { notice: O },
			...D ? { metaAside: D } : {},
			"data-testid": l ? l(b, u.tenant) : "conversation-call-dock"
		}) : null;
		return k ? d ? $e(/* @__PURE__ */ Z(t, {
			gap: "none",
			className: p === "stage" ? "relative h-full min-h-0" : "relative",
			"data-testid": "shell-call-media",
			"data-placement": p,
			"data-layout": y,
			"data-expanded": "true",
			children: [
				a,
				k,
				i
			]
		}), d) : /* @__PURE__ */ X(t, {
			id: e,
			gap: "none",
			className: "hidden",
			"data-testid": "shell-call-media",
			"data-placement": "footer",
			"data-layout": y,
			"data-expanded": "false",
			children: k
		}) : null;
	}
	return {
		CallHostProvider: b,
		CallMediaOutlet: N,
		CallBlock: A,
		PreJoinDialog: _,
		ConversationCallDock: h,
		useCallHost: S,
		useCallBlock: M,
		useCallLobby: j,
		useCallMediaPanel: C,
		useCallBlockPlacement: D,
		useCallBlockPageClaimed: O,
		useClaimCallBlock: k
	};
}
//#endregion
export { b as ACTIVITY_HISTORY_LINES, me as ALL_REALTIME_CAPABILITIES, ue as CONVERSATION_CAPABILITY_NAMES, Be as CapabilityBoundary, Ae as CapabilityGate, we as DEFAULT_REALTIME_CAPABILITIES, E as IncomingCallToast, m as MAX_ATTACHMENT_BYTES, f as MAX_IMAGE_BYTES, Ie as MeetingChatContext, Te as MeetingChatTargetSwitch, ce as NetworkErrorBoundary, F as NewHangoutRoomDialog, Ne as RealtimeIntegrationsProvider, qe as ReconnectingShim, y as WrappedActivityPanel, ke as WrappedAudioVideoSettingsForm, Me as WrappedBreakoutRoomBanner, U as WrappedBreakoutRoomsPanel, Ce as WrappedCanvasDocument, be as WrappedChatPanel, Ke as WrappedConnectionPill, Se as WrappedConversationSurface, I as WrappedCursorOverlay, _ as WrappedFileUploadDrop, P as WrappedHangoutLayout, ge as WrappedMediaEffectsPreviewPanel, ae as WrappedMediaEffectsTray, B as WrappedNotificationBell, We as WrappedNotificationCenter, A as WrappedPresencePanel, He as WrappedReactionsOverlay, p as acceptsDocumentImage, g as adaptActivityEvent, ye as adaptActivityEvents, z as adaptBreakoutRooms, O as adaptChatMessage, k as adaptChatMessages, j as adaptFileUploadState, x as adaptFileUploads, w as adaptHangoutParticipant, D as adaptHangoutParticipants, N as adaptMessageReactions, Je as adaptNotification, ee as adaptNotifications, te as adaptPresenceEntry, C as adaptPresenceRoster, L as adaptReaction, ne as adaptReactions, Ve as applyNetworkShim, R as buildCanvasDocumentExtensions, st as callCounts, Q as callDrawn, ie as canEditCanvasGrant, M as canvasDocumentSaveState, V as canvasRecoveryKey, ze as capabilityNamesFor, jt as createCallBlockHost, re as createCanvasDocumentPane, T as createConversationCallDock, fe as createConversationFeaturesFor, Ue as createHangoutRoomRow, Ge as createHangoutRoomsSection, _e as createRealtimeCapabilityProvider, ve as createRealtimeIntegrations, oe as createWrappedHangoutRoomsList, Oe as createWrappedLVSHangoutLayout, Fe as createWrappedStreamStage, Le as decodeCanvasRecovery, De as defaultRoomDrafts, Ee as encodeCanvasRecovery, je as incomingCallTitle, he as mediaEffectsChangeCount, Pe as meetingChatTitle, le as meetingHandPositions, xe as meetingRosterProps, Re as meetingToolbarItems, S as newestActivityFirst, ct as pageHuddleStart, v as slugifyRoomName, h as useCanvasRecovery, d as useDocumentImageUpload, de as useMeetingChat, H as useRealtimeCapabilities, se as useRealtimeIntegrations, pe as withMeetingHands };
