import { n as e } from "../Button-C-I3BxWI.js";
import { g as t } from "../MediaIcons-_ai5Til2.js";
import { c as n, l as r, n as i } from "../Text-BAAQrepu.js";
import { t as a } from "../Modal-PO0F6rAp.js";
import { n as o } from "../Slider-DCKY5jPg.js";
import { t as s } from "../DropdownMenu-DP3rRjEd.js";
import { C as c } from "../BreakoutRoomsPanel-WejdbFuq.js";
import { n as l, r as u } from "../RecordingConsentNotice-xcasITdM.js";
import { i as d, n as f, r as p, t as m } from "../useDocumentImageUpload-Cd_KXczH.js";
import { $ as h, A as g, B as ee, C as _, D as v, E as y, F as b, G as x, H as S, I as C, J as w, K as T, L as E, M as D, N as O, O as k, P as A, Q as j, R as M, S as N, St as P, T as F, U as I, V as te, W as ne, X as re, Y as ie, Z as L, _ as ae, _t as oe, a as se, at as R, b as ce, bt as z, c as B, ct as le, d as V, dt as ue, et as de, f as H, ft as fe, g as pe, gt as me, h as U, ht as he, i as ge, it as W, j as _e, k as ve, l as ye, lt as be, m as xe, mt as Se, n as Ce, nt as we, o as Te, ot as Ee, p as De, pt as Oe, q as ke, r as Ae, rt as je, s as Me, st as Ne, t as Pe, tt as Fe, u as Ie, ut as Le, v as Re, vt as ze, w as Be, x as Ve, xt as He, y as Ue, yt as We, z as Ge } from "../meeting-D1T7rOkZ.js";
import { createContext as Ke, useCallback as G, useContext as K, useEffect as q, useLayoutEffect as qe, useMemo as J, useRef as Y, useState as X, useSyncExternalStore as Je } from "react";
import { Fragment as Ye, jsx as Z, jsxs as Q } from "react/jsx-runtime";
import { createPortal as Xe } from "react-dom";
//#region src/integrations/realtime/callBlockModel.ts
var Ze = [], Qe = [
	"stage",
	"composer",
	"page",
	"block",
	"pane"
], $e = class {
	claims = [];
	listeners = /* @__PURE__ */ new Set();
	claim(e, t = "page", n = {}) {
		let r = Symbol("call-block-claim");
		return this.claims = [...this.claims, {
			token: r,
			target: e,
			placement: t,
			compact: !!n.compact,
			documents: n.documents ?? Ze
		}], this.emit(), () => {
			let e = this.claims.length;
			this.claims = this.claims.filter((e) => e.token !== r), this.claims.length !== e && this.emit();
		};
	}
	top() {
		for (let e of Qe) for (let t = this.claims.length - 1; t >= 0; --t) if (this.claims[t].placement === e) return this.claims[t];
		return null;
	}
	current = () => this.top()?.target ?? null;
	placement = () => this.top()?.placement ?? "footer";
	compact = () => this.top()?.compact ?? !1;
	documents = () => this.top()?.documents ?? Ze;
	pageClaimed = () => this.claims.some((e) => e.placement !== "pane");
	subscribe = (e) => (this.listeners.add(e), () => {
		this.listeners.delete(e);
	});
	emit() {
		for (let e of this.listeners) e();
	}
};
function et(e, t = !1) {
	return e === "stage" ? "stage" : e === "composer" || e === "block" ? "compact" : e === "pane" ? "grid" : "shelf";
}
function tt(e) {
	return e > 0 && e < 640;
}
function $(e, t) {
	return t && e !== "idle" && e !== "ringing";
}
function nt(e, t) {
	return $(e, t) && e !== "ended" && e !== "failed";
}
function rt(e, t, n) {
	return !e || !$(t, !0) ? !1 : n.some((t) => !!t && (t === e.lobbyName || t === e.channel));
}
function it(e) {
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
function at(e) {
	return e.phase === "idle" && e.call ? (e.rejoin(), "rejoin") : e.phase === "idle" || e.phase === "ended" || e.phase === "failed" ? (e.start([]), "start") : null;
}
var ot = {
	micOn: !0,
	cameraOn: !0,
	remember: !1
}, st = 1e4;
function ct(e) {
	if (!e) return ot;
	try {
		let t = JSON.parse(e);
		return !t || typeof t != "object" ? ot : {
			micOn: typeof t.micOn == "boolean" ? t.micOn : ot.micOn,
			cameraOn: typeof t.cameraOn == "boolean" ? t.cameraOn : ot.cameraOn,
			remember: t.remember === !0
		};
	} catch {
		return ot;
	}
}
function lt(e, t, n) {
	return e === "accept" ? "accept" : e === "start" ? t === "idle" || t === "ended" || t === "failed" ? "start" : null : t === "idle" && n ? "join" : null;
}
function ut(e, t) {
	return t === "check" || !e.remember;
}
function dt(e) {
	return {
		...e,
		remember: !1
	};
}
function ft(e) {
	return e === "accept" ? st : null;
}
function pt(e) {
	return {
		micOn: e.micOn,
		cameraOn: e.cameraOn,
		remember: e.remember
	};
}
function mt(e) {
	return Math.max(0, Math.ceil(e / 1e3));
}
//#endregion
//#region src/integrations/realtime/CallBlockHost.tsx
var ht = {
	start: "Start a huddle",
	join: "Join the huddle",
	accept: "Join the huddle",
	check: "Check your devices"
}, gt = "__unbound__", _t = () => "", vt = () => () => {}, yt = () => null, bt = () => "footer", xt = () => !1, St = [], Ct = () => St, wt = "ui.call-prejoin.v1";
function Tt(e) {
	return e.gatewayConfigured ? e.platformApiUrl ? e.signedIn ? e.connectionState === "connected" ? null : "Connecting to the realtime gateway…" : "Sign in to start a call" : "Calls need platform-api — the middleware returned no platformApiUrl (REALTIME_PLATFORM_PUBLIC_URL) and VITE_PLATFORM_API_URL is not set" : "Calls need the realtime gateway — the middleware returned no gatewayUrl and VITE_GATEWAY_URL is not set";
}
function Et(e) {
	let [t, n] = X(0);
	return qe(() => {
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
function Dt(e) {
	try {
		return ct(window.localStorage.getItem(e));
	} catch {
		return ct(null);
	}
}
function Ot(e, t) {
	try {
		window.localStorage.setItem(e, JSON.stringify(pt(t)));
	} catch {}
}
function kt(d) {
	let f = Ke(null), p = Ke(null), m = Ke(null), h = T(d), { LVSProvider: g } = d, ee = d.useCallMediaEffects ?? (() => null);
	function _({ kind: l, title: u, selfName: f, selfAvatarUrl: p, initial: m, onJoin: h, onCancel: g }) {
		let [_, v] = X(m), y = d.useMediaDevices({ requestOnMount: !1 }), b = d.useAudioVideoSettings({
			preview: _.micOn || _.cameraOn,
			previewAudio: _.micOn,
			previewVideo: _.cameraOn
		}), x = ee(), [S, C] = X(null), w = x?.processStream, T = x?.detach;
		q(() => {
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
		let E = ft(l), [D, O] = X(E), k = Y(!1), A = Y({
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
		}, M = Y(j);
		M.current = j;
		let N = Y(!0);
		return q(() => {
			if (N.current) {
				N.current = !1;
				return;
			}
			k.current = !0, O(null);
		}, [_, b.settings]), q(() => {
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
		}, [E]), /* @__PURE__ */ Q(a, {
			open: !0,
			onClose: g,
			ariaLabel: ht[l],
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
						children: ht[l]
					}), /* @__PURE__ */ Z(i, {
						size: "sm",
						weight: "medium",
						className: "min-w-0 truncate text-right",
						title: u,
						"data-testid": "prejoin-title",
						children: u
					})]
				}),
				/* @__PURE__ */ Q(r, {
					gap: "md",
					className: "min-h-0 overflow-y-auto",
					"data-testid": "prejoin-dialog",
					onPointerDownCapture: () => {
						k.current = !0, O(null);
					},
					onKeyDownCapture: () => {
						k.current = !0, O(null);
					},
					children: [/* @__PURE__ */ Q(i, {
						size: "xs",
						tone: "secondary",
						children: ["Joining as ", f]
					}), /* @__PURE__ */ Z(De, {
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
						previewControls: /* @__PURE__ */ Q(Ye, { children: [
							/* @__PURE__ */ Z(c, {
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
							/* @__PURE__ */ Z(c, {
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
							x && /* @__PURE__ */ Q(Ye, { children: [/* @__PURE__ */ Q(e, {
								size: "sm",
								variant: "secondary",
								"aria-pressed": x.backgroundMode === "blur",
								onClick: () => x.setBackgroundMode(x.backgroundMode === "blur" ? "none" : "blur"),
								"data-testid": "prejoin-blur",
								children: [/* @__PURE__ */ Z(t, { size: 16 }), "Blur"]
							}), /* @__PURE__ */ Z(s, {
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
						children: [/* @__PURE__ */ Z(o, {
							checked: _.remember,
							onChange: (e) => v((t) => ({
								...t,
								remember: e
							})),
							"aria-label": "Remember and skip this check next time",
							"data-testid": "prejoin-remember"
						}), /* @__PURE__ */ Z(i, {
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
							onClick: j,
							"data-testid": "prejoin-join",
							children: D === null ? l === "check" ? "Save" : "Join now" : `Join as last time (${mt(D)})`
						})]
					})]
				})
			]
		});
	}
	function v({ self: e, tenant: t, platformApiUrl: n, getIdToken: r, gateway: i, gatewayConfigured: a, connectionState: o, onAccept: s, onCallEvent: c, nameFor: p, recordingConsent: m, meeting: h, preJoinStorageKey: g = wt, children: ee }) {
		let [v, y] = X(null), b = Y(null), x = Y(null), S = Y(c);
		S.current = c;
		let C = (t, n) => {
			S.current?.(t, n, {
				host: x.current,
				selfId: e?.userId ?? ""
			});
		}, [w, T] = X(() => Dt(g)), [E, D] = X(null), O = h && d.useMeeting && E && (!h.enabledFor || h.enabledFor(E.lobbyName)) ? E.lobbyName : null, k = i, A = J(() => k?.onMessage ? {
			send: (e) => (k.send ?? k.sendMessage)?.call(k, e),
			onMessage: (e) => k.onMessage(e)
		} : void 0, [k]), j = O && h && h.chatChannelFor ? h.chatChannelFor(O, E?.callId ?? null) ?? void 0 : void 0, M = d.useMeeting ? d.useMeeting(O, {
			enabled: !!O,
			socket: A,
			roleKey: E ? `${E.callId ?? ""}:${E.phase}` : null,
			...j ? { chatChannel: j } : {}
		}) : null, N = O && M ? M : null, P = d.useConversationCall({
			lobbyName: v?.lobbyName ?? gt,
			...N?.activeLobby ? { mediaLobby: N.activeLobby } : {},
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
		}), F = Y(P);
		F.current = P;
		let [I, te] = X(null), [re, ie] = X(null), L = G((e, t, n) => {
			let r = Dt(g);
			if (!ut(r, e)) {
				T(r), ie({ run: t });
				return;
			}
			te((i) => i ?? {
				kind: e,
				run: t,
				...n ? { cancel: n } : {},
				initial: r
			});
		}, [g]), ae = G((e, t) => lt("start", F.current.phase, !!F.current.call) ? (L("start", (n) => {
			n.start(e, t);
		}), Promise.resolve()) : F.current.start(e, t), [L]), oe = G((e) => {
			let t = F.current;
			return lt("rejoin", t.phase, !!t.call) ? (L("join", (t) => {
				t.rejoin(e);
			}), Promise.resolve()) : t.rejoin(e);
		}, [L]), se = G(() => {
			te((e) => e ?? {
				kind: "check",
				run: () => {},
				initial: dt(Dt(g))
			});
		}, [g]), R = J(() => ({
			...P,
			start: ae,
			rejoin: oe
		}), [
			P,
			ae,
			oe
		]);
		q(() => {
			re && (re.run(F.current), ie(null));
		}, [re]), x.current = R.call?.host ?? x.current, R.phase === "idle" && (x.current = null);
		let ce = Y(R.phase);
		ce.current = R.phase;
		let z = Y(null), B = Y(null), le = G((e, t) => {
			if (b.current) return;
			let n = ce.current;
			(n === "idle" || n === "ringing") && (z.current = t ?? null, B.current = e.lobbyName, y((t) => t && t.lobbyName === e.lobbyName && t.title === e.title && t.channel === e.channel && t.startBlockedReason === e.startBlockedReason ? t : e));
		}, []), V = G((e) => {
			if (b.current) return;
			let t = ce.current;
			(t === "idle" || t === "ringing") && B.current === e && (B.current = null, z.current = null, y((t) => t && t.lobbyName === e ? null : t));
		}, []), ue = G(() => {
			z.current?.start();
		}, []), de = Y(s);
		de.current = s;
		let H = d.useIncomingConversationCalls({
			gateway: i,
			self: {
				userId: e?.userId ?? null,
				...e ? { displayName: e.displayName } : {}
			},
			onAccept: ((e) => {
				b.current = e, B.current = e.lobbyName, z.current = null, y({
					lobbyName: e.lobbyName,
					title: e.callerName,
					channel: e.channel
				}), de.current?.(e);
			})
		}), fe = Y(null);
		q(() => {
			let e = b.current;
			!e || v?.lobbyName !== e.lobbyName || fe.current !== e.callId && (fe.current = e.callId, L("accept", (t) => {
				b.current = null, t.accept(e);
			}, () => {
				b.current = null, H.decline(e), V(e.lobbyName);
			}));
		}, [
			v,
			L,
			H,
			V
		]);
		let pe = Tt({
			gatewayConfigured: a,
			platformApiUrl: n,
			signedIn: !!e,
			connectionState: o
		}), me = J(() => e ? {
			userId: e.userId,
			displayName: e.displayName
		} : null, [e?.userId, e?.displayName]), U = v && nt(P.phase, !0) && P.call ? v.lobbyName : null, he = P.call?.callId ?? null, ge = U ? String(P.phase) : "";
		q(() => {
			D((e) => U ? e && e.lobbyName === U && e.callId === he && e.phase === ge ? e : {
				lobbyName: U,
				callId: he,
				phase: ge
			} : null);
		}, [
			U,
			he,
			ge
		]);
		let W = m !== !1 && $(R.phase, !0) ? R.recording ?? null : null, _e = u(W?.enabled ? `call-recording:${W.sessionId}` : null), ve = m ? m.privacyHref : void 0, ye = m ? m.privacyLabel : void 0, be = J(() => W?.enabled && !_e.dismissed ? /* @__PURE__ */ Z(l, {
			open: !0,
			kind: "recording",
			placement: "line",
			onDismiss: _e.dismiss,
			...ve ? { privacyHref: ve } : {},
			...ye ? { privacyLabel: ye } : {}
		}) : null, [
			W?.enabled,
			_e.dismissed,
			_e.dismiss,
			ve,
			ye
		]), xe = J(() => ({
			call: R,
			recordingNote: be,
			lobby: v,
			bind: le,
			unbind: V,
			startBound: v && z.current ? ue : null,
			self: me,
			tenant: t,
			gatewayConfigured: a,
			connectionState: o,
			platformApiUrl: n,
			unavailableReason: pe,
			checkDevices: se,
			meeting: N
		}), [
			R,
			be,
			v,
			le,
			V,
			ue,
			me,
			t,
			a,
			o,
			n,
			pe,
			se,
			N
		]), Se = H.rings[0] ?? null;
		return /* @__PURE__ */ Q(f.Provider, {
			value: xe,
			children: [
				ee,
				I && /* @__PURE__ */ Z(_, {
					kind: I.kind,
					title: v?.title ?? "this huddle",
					selfName: e?.displayName ?? "",
					selfAvatarUrl: e?.avatarUrl,
					initial: I.initial,
					onCancel: () => {
						let e = I;
						te(null), e.cancel?.();
					},
					onJoin: (e, t) => {
						let n = I;
						Ot(g, e), F.current.devices.set({
							...F.current.devices.prefs,
							...t
						}), te(null), n.kind !== "check" && (T(e), ie({ run: n.run }));
					}
				}),
				Se && /* @__PURE__ */ Z(ne, {
					ring: Se,
					onAccept: () => H.accept(Se),
					onDecline: () => H.decline(Se)
				})
			]
		});
	}
	function y({ children: e }) {
		let t = K(f), [n, r] = X(!1), i = !!t?.lobby && nt(t.call.phase, !0);
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
	function b({ scopeKey: e, videoUrl: t, children: n, ...r }) {
		return /* @__PURE__ */ Z(x, {
			videoUrl: t,
			...r,
			children: n
		}, e);
	}
	function x({ videoUrl: e, children: t, ...n }) {
		let r = Y(null);
		e && !r.current && (r.current = e);
		let [i] = X(() => new $e());
		return /* @__PURE__ */ Z(g, {
			baseUrl: r.current ?? "",
			getAuthToken: _t,
			children: /* @__PURE__ */ Z(v, {
				...n,
				children: /* @__PURE__ */ Z(p.Provider, {
					value: i,
					children: /* @__PURE__ */ Z(y, { children: t })
				})
			})
		});
	}
	function S() {
		return K(f);
	}
	function C() {
		return K(m);
	}
	function w(e, t) {
		let n = K(p), r = n ? e(n) : t;
		return Je(n?.subscribe ?? vt, r, r);
	}
	function E() {
		return w((e) => e.placement, bt);
	}
	function D() {
		return w((e) => e.pageClaimed, xt);
	}
	function O(e, t, n = !0, r = {}) {
		let i = K(p), a = !!r.compact, o = JSON.stringify(r.documents ?? []), s = J(() => JSON.parse(o), [o]);
		qe(() => i && e && n ? i.claim(e, t, {
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
		let c = w((e) => e.current, yt);
		return !!e && c === e;
	}
	function k({ placement: e, compact: t = !1, documents: n, className: i }) {
		let a = K(f), o = K(m), [s, c] = X(null), l = Et(s), u = !!a?.lobby && $(a.call.phase, !0), d = e === "stage" ? u && l > 0 : e === "composer" ? l > 0 : e === "pane" || u && !!o?.open && l > 0, p = e === "composer" || e === "stage", h = p && (t || tt(l)), g = O(s, e, d, {
			compact: h,
			...n ? { documents: n } : {}
		});
		return /* @__PURE__ */ Z(r, {
			ref: c,
			gap: "none",
			className: i ?? (e === "composer" ? "min-w-0" : "shrink-0 min-w-0"),
			"aria-label": "Huddle",
			"data-testid": e === "stage" ? "call-stage" : e === "composer" ? "composer-call-dock" : e === "page" ? "page-call-block" : e === "block" ? "shell-call-block" : "call-block-pane",
			"data-holds-media": g ? "true" : "false",
			...p ? { "data-compact": h ? "true" : "false" } : {}
		});
	}
	function A(e, t) {
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
	function j(e, t = {}) {
		let n = K(f), r = typeof e == "string" || e === null ? [e] : e, i = r.find((e) => !!e) ?? null, a = t.bind ?? null, o = a ? a.lobbyName === void 0 ? i : a.lobbyName : null, s = a ? a.blockedReason ?? n?.unavailableReason ?? void 0 : void 0, c = A(a && o ? {
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
				n.lobby?.lobbyName === o && at(n.call);
			}
		}), l = t.enabled !== !1 && rt(n?.lobby ?? null, n?.call.phase ?? "idle", r);
		return {
			block: l ? /* @__PURE__ */ Z(k, {
				placement: "composer",
				compact: !!t.compact,
				...t.documents ? { documents: t.documents } : {}
			}) : void 0,
			holds: l,
			...c
		};
	}
	function M({ id: e, onOpenPeople: t, onOpenDocument: n, overlay: i, header: a, extras: o, notice: s, recordingConsent: c, dockTestId: l }) {
		let u = K(f), d = w((e) => e.current, yt), p = w((e) => e.placement, bt), m = w((e) => e.compact, xt), g = w((e) => e.documents, Ct), ee = !!u?.lobby && $(u.call.phase, !0), _ = !!d && p === "composer", v = !!d && p !== "pane", y = et(d ? p : "footer", m), b = u?.lobby ?? null, x = u?.meeting?.hands, S = J(() => {
			if (!x || x.length === 0) return;
			let e = new Map(x.map((e, t) => [e.userId, t + 1]));
			return (t) => e.get(t);
		}, [x]), C = !!d && a != null && !!u?.meeting, T = c === !1 || C ? null : u?.recordingNote ?? null, E = T && s !== void 0 ? /* @__PURE__ */ Q(r, {
			gap: "xs",
			children: [T, s]
		}) : T ?? s, D = ee && b && u ? /* @__PURE__ */ Z(h, {
			call: u.call,
			title: b.title,
			onOpenPeople: () => t?.(b, u.tenant),
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
					t && n?.(t);
				}
			} : {},
			layout: y,
			...S ? { handFor: S } : {},
			...o === void 0 ? {} : { extras: o },
			...E == null ? {} : { notice: E },
			"data-testid": l ? l(b, u.tenant) : "conversation-call-dock"
		}) : null;
		return D ? d ? Xe(/* @__PURE__ */ Q(r, {
			gap: "none",
			className: p === "stage" ? "relative h-full min-h-0" : "relative",
			"data-testid": "shell-call-media",
			"data-placement": p,
			"data-layout": y,
			"data-expanded": "true",
			children: [
				a,
				D,
				i
			]
		}), d) : /* @__PURE__ */ Z(r, {
			id: e,
			gap: "none",
			className: "hidden",
			"data-testid": "shell-call-media",
			"data-placement": "footer",
			"data-layout": y,
			"data-expanded": "false",
			children: D
		}) : null;
	}
	return {
		CallHostProvider: b,
		CallMediaOutlet: M,
		CallBlock: k,
		PreJoinDialog: _,
		ConversationCallDock: h,
		useCallHost: S,
		useCallBlock: j,
		useCallLobby: A,
		useCallMediaPanel: C,
		useCallBlockPlacement: E,
		useCallBlockPageClaimed: D,
		useClaimCallBlock: O
	};
}
//#endregion
export { Le as ALL_REALTIME_CAPABILITIES, Ee as CONVERSATION_CAPABILITY_NAMES, Re as CapabilityBoundary, ue as CapabilityGate, fe as DEFAULT_REALTIME_CAPABILITIES, ne as IncomingCallToast, m as MAX_ATTACHMENT_BYTES, f as MAX_IMAGE_BYTES, Pe as MeetingChatContext, Ce as MeetingChatTargetSwitch, ze as NetworkErrorBoundary, z as NewHangoutRoomDialog, Fe as RealtimeIntegrationsProvider, oe as ReconnectingShim, y as WrappedActivityPanel, De as WrappedAudioVideoSettingsForm, Ae as WrappedBreakoutRoomBanner, ge as WrappedBreakoutRoomsPanel, xe as WrappedCanvasDocument, k as WrappedChatPanel, Ue as WrappedConnectionPill, Ne as WrappedConversationSurface, F as WrappedCursorOverlay, _ as WrappedFileUploadDrop, N as WrappedHangoutLayout, U as WrappedMediaEffectsPreviewPanel, ae as WrappedMediaEffectsTray, ce as WrappedNotificationBell, Ve as WrappedNotificationCenter, v as WrappedPresencePanel, Be as WrappedReactionsOverlay, p as acceptsDocumentImage, ve as adaptActivityEvent, g as adaptActivityEvents, se as adaptBreakoutRooms, _e as adaptChatMessage, D as adaptChatMessages, O as adaptFileUploadState, A as adaptFileUploads, b as adaptHangoutParticipant, C as adaptHangoutParticipants, E as adaptMessageReactions, M as adaptNotification, Ge as adaptNotifications, ee as adaptPresenceEntry, te as adaptPresenceRoster, S as adaptReaction, I as adaptReactions, me as applyNetworkShim, ke as buildCanvasDocumentExtensions, it as callCounts, $ as callDrawn, ie as canEditCanvasGrant, re as canvasDocumentSaveState, j as canvasRecoveryKey, le as capabilityNamesFor, kt as createCallBlockHost, w as createCanvasDocumentPane, T as createConversationCallDock, be as createConversationFeaturesFor, P as createHangoutRoomRow, We as createHangoutRoomsSection, Oe as createRealtimeCapabilityProvider, we as createRealtimeIntegrations, he as createWrappedHangoutRoomsList, W as createWrappedLVSHangoutLayout, R as createWrappedStreamStage, h as decodeCanvasRecovery, Te as defaultRoomDrafts, de as encodeCanvasRecovery, x as incomingCallTitle, pe as mediaEffectsChangeCount, Me as meetingChatTitle, B as meetingHandPositions, ye as meetingRosterProps, Ie as meetingToolbarItems, at as pageHuddleStart, He as slugifyRoomName, L as useCanvasRecovery, d as useDocumentImageUpload, V as useMeetingChat, Se as useRealtimeCapabilities, je as useRealtimeIntegrations, H as withMeetingHands };
