import { n as e } from "../Button-DwPf_9pb.js";
import { n as t, t as n } from "../Stack-BPtkNzDm.js";
import { n as r } from "../Text-DyujO08i.js";
import { g as i } from "../MediaIcons-_ai5Til2.js";
import { t as a } from "../Modal-CEcJQMxG.js";
import { t as o } from "../DropdownMenu-Bu9IMVKk.js";
import { t as s } from "../Switch-DolksIFk.js";
import { C as c, E as l, w as u } from "../BreakoutRoomsPanel-riRiQX7i.js";
import { n as d, r as f } from "../RecordingConsentNotice-CjFSG2H_.js";
import { i as p, n as m, r as h, t as g } from "../useDocumentImageUpload-CfggAJc8.js";
import { $ as _, A as v, B as y, C as b, Ct as x, D as S, E as C, F as w, G as T, H as E, I as D, J as O, K as k, L as A, M as j, N as M, O as N, P, Q as F, R as ee, S as te, St as ne, T as re, U as I, V as L, W as R, X as ie, Y as ae, Z as oe, _ as z, _t as se, a as ce, at as le, b as B, bt as ue, c as V, ct as de, d as fe, dt as pe, et as me, f as he, ft as H, g as ge, gt as _e, h as ve, ht as U, i as ye, it as be, j as W, k as xe, l as Se, lt as Ce, m as we, mt as Te, n as Ee, nt as De, o as Oe, ot as ke, p as Ae, pt as je, q as Me, r as Ne, rt as Pe, s as Fe, st as Ie, t as Le, tt as Re, u as ze, ut as Be, v as Ve, vt as He, w as Ue, wt as We, x as Ge, xt as Ke, y as qe, yt as Je, z as Ye } from "../meeting-B2WBakCI.js";
import { createContext as Xe, useCallback as G, useContext as K, useEffect as q, useLayoutEffect as Ze, useMemo as J, useRef as Y, useState as X, useSyncExternalStore as Qe } from "react";
import { Fragment as $e, jsx as Z, jsxs as Q } from "react/jsx-runtime";
import { createPortal as et } from "react-dom";
//#region src/integrations/realtime/callBlockModel.ts
var tt = [], nt = [
	"stage",
	"composer",
	"page",
	"block",
	"pane"
], rt = class {
	claims = [];
	listeners = /* @__PURE__ */ new Set();
	claim(e, t = "page", n = {}) {
		let r = Symbol("call-block-claim");
		return this.claims = [...this.claims, {
			token: r,
			target: e,
			placement: t,
			compact: !!n.compact,
			documents: n.documents ?? tt,
			fit: n.fit ?? "width"
		}], this.emit(), () => {
			let e = this.claims.length;
			this.claims = this.claims.filter((e) => e.token !== r), this.claims.length !== e && this.emit();
		};
	}
	top() {
		for (let e of nt) for (let t = this.claims.length - 1; t >= 0; --t) if (this.claims[t].placement === e) return this.claims[t];
		return null;
	}
	current = () => this.top()?.target ?? null;
	placement = () => this.top()?.placement ?? "footer";
	compact = () => this.top()?.compact ?? !1;
	fit = () => this.top()?.fit ?? "width";
	documents = () => this.top()?.documents ?? tt;
	pageClaimed = () => this.claims.some((e) => e.placement !== "pane");
	subscribe = (e) => (this.listeners.add(e), () => {
		this.listeners.delete(e);
	});
	emit() {
		for (let e of this.listeners) e();
	}
};
function it(e, t = !1) {
	return e === "stage" ? "stage" : e === "composer" || e === "block" ? "compact" : e === "pane" ? "grid" : "shelf";
}
function at(e) {
	return e > 0 && e < 640;
}
function $(e, t) {
	return t && e !== "idle" && e !== "ringing";
}
function ot(e, t) {
	return $(e, t) && e !== "ended" && e !== "failed";
}
function st(e, t, n) {
	return !e || !$(t, !0) ? !1 : n.some((t) => !!t && (t === e.lobbyName || t === e.channel));
}
function ct(e) {
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
function lt(e) {
	return e.phase === "idle" && e.call ? (e.rejoin(), "rejoin") : e.phase === "idle" || e.phase === "ended" || e.phase === "failed" ? (e.start([]), "start") : null;
}
var ut = {
	micOn: !0,
	cameraOn: !0,
	remember: !1
}, dt = 1e4;
function ft(e) {
	if (!e) return ut;
	try {
		let t = JSON.parse(e);
		return !t || typeof t != "object" ? ut : {
			micOn: typeof t.micOn == "boolean" ? t.micOn : ut.micOn,
			cameraOn: typeof t.cameraOn == "boolean" ? t.cameraOn : ut.cameraOn,
			remember: t.remember === !0
		};
	} catch {
		return ut;
	}
}
function pt(e, t, n) {
	return e === "accept" ? "accept" : e === "start" ? t === "idle" || t === "ended" || t === "failed" ? "start" : null : t === "idle" && n ? "join" : null;
}
function mt(e, t) {
	return t === "check" || !e.remember;
}
function ht(e) {
	return {
		...e,
		remember: !1
	};
}
function gt(e) {
	return e === "accept" ? dt : null;
}
function _t(e) {
	return {
		micOn: e.micOn,
		cameraOn: e.cameraOn,
		remember: e.remember
	};
}
function vt(e) {
	return Math.max(0, Math.ceil(e / 1e3));
}
//#endregion
//#region src/integrations/realtime/CallBlockHost.tsx
var yt = (e, t) => e === "start" ? `Start a ${t}` : e === "check" ? "Check your devices" : `Join the ${t}`, bt = (e) => e.charAt(0).toUpperCase() + e.slice(1), xt = "__unbound__", St = () => "", Ct = () => () => {}, wt = () => null, Tt = () => "footer", Et = () => !1, Dt = [], Ot = () => Dt, kt = () => "width", At = "ui.call-prejoin.v1";
function jt(e) {
	return e.gatewayConfigured ? e.platformApiUrl ? e.signedIn ? e.connectionState === "connected" ? null : "Connecting to the realtime gateway…" : "Sign in to start a call" : "Calls need platform-api — the middleware returned no platformApiUrl (REALTIME_PLATFORM_PUBLIC_URL) and VITE_PLATFORM_API_URL is not set" : "Calls need the realtime gateway — the middleware returned no gatewayUrl and VITE_GATEWAY_URL is not set";
}
function Mt(e) {
	let [t, n] = X(0);
	return Ze(() => {
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
function Nt(e) {
	try {
		return ft(window.localStorage.getItem(e));
	} catch {
		return ft(null);
	}
}
function Pt(e, t) {
	try {
		window.localStorage.setItem(e, JSON.stringify(_t(t)));
	} catch {}
}
function Ft(p) {
	let m = Xe(null), h = Xe(null), g = Xe(null), _ = O(p), { LVSProvider: v } = p, y = p.useCallMediaEffects ?? (() => null);
	function b({ kind: u, title: d, selfName: f, selfAvatarUrl: m, initial: h, onJoin: g, onCancel: _, callNoun: v }) {
		let b = l(v), [x, S] = X(h), C = p.useMediaDevices({ requestOnMount: !1 }), w = p.useAudioVideoSettings({
			preview: x.micOn || x.cameraOn,
			previewAudio: x.micOn,
			previewVideo: x.cameraOn
		}), T = y(), [E, D] = X(null), O = T?.processStream, k = T?.detach;
		q(() => {
			if (!w.previewStream) {
				k?.(), D(null);
				return;
			}
			D(O?.(w.previewStream) ?? w.previewStream);
		}, [
			w.previewStream,
			O,
			k,
			T?.outputTrack
		]);
		let A = gt(u), [j, M] = X(A), N = Y(!1), P = Y({
			choice: x,
			settings: w.settings
		});
		P.current = {
			choice: x,
			settings: w.settings
		};
		let F = () => {
			let { choice: e, settings: t } = P.current;
			g(e, {
				...t.microphoneId ? { microphoneId: t.microphoneId } : {},
				...t.cameraId ? { cameraId: t.cameraId } : {},
				...t.speakerId ? { speakerId: t.speakerId } : {}
			});
		}, ee = Y(F);
		ee.current = F;
		let te = Y(!0);
		return q(() => {
			if (te.current) {
				te.current = !1;
				return;
			}
			N.current = !0, M(null);
		}, [x, w.settings]), q(() => {
			if (A === null) return;
			let e = Date.now(), t = window.setInterval(() => {
				if (N.current) {
					window.clearInterval(t);
					return;
				}
				let n = A - (Date.now() - e);
				if (n <= 0) {
					window.clearInterval(t), ee.current();
					return;
				}
				M(n);
			}, 250);
			return () => window.clearInterval(t);
		}, [A]), /* @__PURE__ */ Q(a, {
			open: !0,
			onClose: _,
			ariaLabel: yt(u, b),
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
						children: yt(u, b)
					}), /* @__PURE__ */ Z(r, {
						size: "sm",
						weight: "medium",
						className: "min-w-0 truncate text-right",
						title: d,
						"data-testid": "prejoin-title",
						children: d
					})]
				}),
				/* @__PURE__ */ Q(t, {
					gap: "md",
					className: "min-h-0 overflow-y-auto",
					"data-testid": "prejoin-dialog",
					onPointerDownCapture: () => {
						N.current = !0, M(null);
					},
					onKeyDownCapture: () => {
						N.current = !0, M(null);
					},
					children: [/* @__PURE__ */ Q(r, {
						size: "xs",
						tone: "secondary",
						children: ["Joining as ", f]
					}), /* @__PURE__ */ Z(Ae, {
						devices: C,
						settings: {
							...w,
							previewStream: E
						},
						cameraOn: x.cameraOn,
						selfName: f,
						selfAvatarUrl: m,
						layout: "prejoin",
						callNoun: b,
						"data-testid": "prejoin-devices",
						previewControls: /* @__PURE__ */ Q($e, { children: [
							/* @__PURE__ */ Z(c, {
								kind: "microphone",
								on: x.micOn,
								onToggle: () => S((e) => ({
									...e,
									micOn: !e.micOn
								})),
								devices: C.microphones,
								selectedDeviceId: w.settings.microphoneId,
								onSelectDevice: (e) => w.update({ microphoneId: e }),
								permission: C.permission.microphone,
								level: w.micLevel,
								showLabel: !0,
								"data-testid": "prejoin-mic"
							}),
							/* @__PURE__ */ Z(c, {
								kind: "camera",
								on: x.cameraOn,
								onToggle: () => S((e) => ({
									...e,
									cameraOn: !e.cameraOn
								})),
								devices: C.cameras,
								selectedDeviceId: w.settings.cameraId,
								onSelectDevice: (e) => w.update({ cameraId: e }),
								permission: C.permission.camera,
								showLabel: !0,
								"data-testid": "prejoin-camera"
							}),
							T && /* @__PURE__ */ Q($e, { children: [/* @__PURE__ */ Q(e, {
								size: "sm",
								variant: "secondary",
								"aria-pressed": T.backgroundMode === "blur",
								onClick: () => T.setBackgroundMode(T.backgroundMode === "blur" ? "none" : "blur"),
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
											checked: T.backgroundMode === "none",
											onSelect: () => T.setBackgroundMode("none")
										},
										{
											label: "Blur background",
											checked: T.backgroundMode === "blur",
											onSelect: () => T.setBackgroundMode("blur")
										},
										...T.backgrounds.map((e) => ({
											label: e.label,
											checked: T.backgroundMode === "image" && T.backgroundImageUrl === e.url,
											onSelect: () => {
												T.setBackgroundImageUrl(e.url), T.setBackgroundMode("image");
											}
										}))
									]
								}, {
									label: "Appearance",
									items: T.filters.map((e) => ({
										label: e.label,
										checked: T.filterId === e.id,
										onSelect: () => T.setFilter(e.id)
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
							checked: x.remember,
							onChange: (e) => S((t) => ({
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
							onClick: _,
							"data-testid": "prejoin-cancel",
							children: u === "accept" ? "Decline" : "Cancel"
						}), /* @__PURE__ */ Z(e, {
							onClick: F,
							"data-testid": "prejoin-join",
							children: j === null ? u === "check" ? "Save" : "Join now" : `Join as last time (${vt(j)})`
						})]
					})]
				})
			]
		});
	}
	function x({ self: e, tenant: t, platformApiUrl: n, getIdToken: r, gateway: i, gatewayConfigured: a, connectionState: o, onAccept: s, onCallEvent: c, nameFor: h, recordingConsent: g, callNoun: _, meeting: v, preJoinStorageKey: y = At, children: x }) {
		let S = l(_), [C, w] = X(null), T = Y(null), E = Y(null), D = Y(c);
		D.current = c;
		let O = (t, n) => {
			D.current?.(t, n, {
				host: E.current,
				selfId: e?.userId ?? ""
			});
		}, [A, j] = X(() => Nt(y)), [M, N] = X(null), P = v && p.useMeeting && M && (!v.enabledFor || v.enabledFor(M.lobbyName)) ? M.lobbyName : null, F = i, ee = J(() => F?.onMessage ? {
			send: (e) => (F.send ?? F.sendMessage)?.call(F, e),
			onMessage: (e) => F.onMessage(e)
		} : void 0, [F]), te = P && v && v.chatChannelFor ? v.chatChannelFor(P, M?.callId ?? null) ?? void 0 : void 0, ne = p.useMeeting ? p.useMeeting(P, {
			enabled: !!P,
			socket: ee,
			roleKey: M ? `${M.callId ?? ""}:${M.phase}` : null,
			...te ? { chatChannel: te } : {}
		}) : null, re = P && ne ? ne : null, I = p.useConversationCall({
			lobbyName: C?.lobbyName ?? xt,
			...re?.activeLobby ? { mediaLobby: re.activeLobby } : {},
			channel: C?.channel ?? null,
			self: e ?? {
				userId: "",
				displayName: ""
			},
			platformApi: {
				baseUrl: n ?? "",
				getIdToken: r
			},
			gateway: i,
			discover: !!C && a,
			initialMedia: {
				micOn: A.micOn,
				cameraOn: A.cameraOn
			},
			...h ? { nameFor: h } : {},
			...c ? {
				onCallStarted: (e) => O("started", e),
				onCallEnded: (e) => O("ended", e),
				onCallMissed: (e) => O("missed", e)
			} : {}
		}), L = Y(I);
		L.current = I;
		let [R, ie] = X(null), [ae, oe] = X(null), z = G((e, t, n) => {
			let r = Nt(y);
			if (!mt(r, e)) {
				j(r), oe({ run: t });
				return;
			}
			ie((i) => i ?? {
				kind: e,
				run: t,
				...n ? { cancel: n } : {},
				initial: r
			});
		}, [y]), se = G((e, t) => pt("start", L.current.phase, !!L.current.call) ? (z("start", (n) => {
			n.start(e, t);
		}), Promise.resolve()) : L.current.start(e, t), [z]), ce = G((e) => {
			let t = L.current;
			return pt("rejoin", t.phase, !!t.call) ? (z("join", (t) => {
				t.rejoin(e);
			}), Promise.resolve()) : t.rejoin(e);
		}, [z]), le = G(() => {
			ie((e) => e ?? {
				kind: "check",
				run: () => {},
				initial: ht(Nt(y))
			});
		}, [y]), B = J(() => ({
			...I,
			start: se,
			rejoin: ce
		}), [
			I,
			se,
			ce
		]);
		q(() => {
			ae && (ae.run(L.current), oe(null));
		}, [ae]), E.current = B.call?.host ?? E.current, B.phase === "idle" && (E.current = null);
		let ue = Y(B.phase);
		ue.current = B.phase;
		let V = Y(null), de = Y(null), fe = G((e, t) => {
			if (T.current) return;
			let n = ue.current;
			(n === "idle" || n === "ringing") && (V.current = t ?? null, de.current = e.lobbyName, w((t) => t && t.lobbyName === e.lobbyName && t.title === e.title && t.channel === e.channel && t.startBlockedReason === e.startBlockedReason ? t : e));
		}, []), pe = G((e) => {
			if (T.current) return;
			let t = ue.current;
			(t === "idle" || t === "ringing") && de.current === e && (de.current = null, V.current = null, w((t) => t && t.lobbyName === e ? null : t));
		}, []), me = G(() => {
			V.current?.start();
		}, []), he = Y(s);
		he.current = s;
		let H = p.useIncomingConversationCalls({
			gateway: i,
			self: {
				userId: e?.userId ?? null,
				...e ? { displayName: e.displayName } : {}
			},
			onAccept: ((e) => {
				T.current = e, de.current = e.lobbyName, V.current = null, w({
					lobbyName: e.lobbyName,
					title: e.callerName,
					channel: e.channel
				}), he.current?.(e);
			})
		}), ge = Y(null);
		q(() => {
			let e = T.current;
			!e || C?.lobbyName !== e.lobbyName || ge.current !== e.callId && (ge.current = e.callId, z("accept", (t) => {
				T.current = null, t.accept(e);
			}, () => {
				T.current = null, H.decline(e), pe(e.lobbyName);
			}));
		}, [
			C,
			z,
			H,
			pe
		]);
		let _e = jt({
			gatewayConfigured: a,
			platformApiUrl: n,
			signedIn: !!e,
			connectionState: o
		}), ve = J(() => e ? {
			userId: e.userId,
			displayName: e.displayName
		} : null, [e?.userId, e?.displayName]), U = C && ot(I.phase, !0) && I.call ? C.lobbyName : null, ye = I.call?.callId ?? null, be = U ? String(I.phase) : "";
		q(() => {
			N((e) => U ? e && e.lobbyName === U && e.callId === ye && e.phase === be ? e : {
				lobbyName: U,
				callId: ye,
				phase: be
			} : null);
		}, [
			U,
			ye,
			be
		]);
		let W = g !== !1 && $(B.phase, !0) ? B.recording ?? null : null, xe = f(W?.enabled ? `call-recording:${W.sessionId}` : null), Se = g ? g.privacyHref : void 0, Ce = g ? g.privacyLabel : void 0, we = J(() => W?.enabled && !xe.dismissed ? /* @__PURE__ */ Z(d, {
			open: !0,
			kind: "recording",
			placement: "line",
			onDismiss: xe.dismiss,
			...Se ? { privacyHref: Se } : {},
			...Ce ? { privacyLabel: Ce } : {}
		}) : null, [
			W?.enabled,
			xe.dismissed,
			xe.dismiss,
			Se,
			Ce
		]), Te = J(() => W?.enabled ? /* @__PURE__ */ Z(d, {
			open: !0,
			kind: "recording",
			placement: "indicator",
			"data-testid": "call-recording-indicator"
		}) : null, [W?.enabled]), Ee = J(() => ({
			call: B,
			recordingNote: we,
			recordingIndicator: Te,
			callNoun: S,
			lobby: C,
			bind: fe,
			unbind: pe,
			startBound: C && V.current ? me : null,
			self: ve,
			tenant: t,
			gatewayConfigured: a,
			connectionState: o,
			platformApiUrl: n,
			unavailableReason: _e,
			checkDevices: le,
			meeting: re
		}), [
			B,
			we,
			Te,
			S,
			C,
			fe,
			pe,
			me,
			ve,
			t,
			a,
			o,
			n,
			_e,
			le,
			re
		]), De = H.rings[0] ?? null;
		return /* @__PURE__ */ Q(m.Provider, {
			value: Ee,
			children: [
				/* @__PURE__ */ Z(u, {
					noun: S,
					children: x
				}),
				R && /* @__PURE__ */ Z(b, {
					kind: R.kind,
					title: C?.title ?? `this ${S}`,
					callNoun: S,
					selfName: e?.displayName ?? "",
					selfAvatarUrl: e?.avatarUrl,
					initial: R.initial,
					onCancel: () => {
						let e = R;
						ie(null), e.cancel?.();
					},
					onJoin: (e, t) => {
						let n = R;
						Pt(y, e), L.current.devices.set({
							...L.current.devices.prefs,
							...t
						}), ie(null), n.kind !== "check" && (j(e), oe({ run: n.run }));
					}
				}),
				De && /* @__PURE__ */ Z(k, {
					ring: De,
					onAccept: () => H.accept(De),
					onDecline: () => H.decline(De)
				})
			]
		});
	}
	function S({ children: e }) {
		let t = K(m), [n, r] = X(!1), i = !!t?.lobby && ot(t.call.phase, !0);
		q(() => {
			r(i);
		}, [i]);
		let a = J(() => ({
			open: i && n,
			setOpen: r,
			toggle: () => r((e) => !e)
		}), [i, n]);
		return /* @__PURE__ */ Z(g.Provider, {
			value: a,
			children: e
		});
	}
	function C({ scopeKey: e, videoUrl: t, children: n, ...r }) {
		return /* @__PURE__ */ Z(w, {
			videoUrl: t,
			...r,
			children: n
		}, e);
	}
	function w({ videoUrl: e, children: t, ...n }) {
		let r = Y(null);
		e && !r.current && (r.current = e);
		let [i] = X(() => new rt());
		return /* @__PURE__ */ Z(v, {
			baseUrl: r.current ?? "",
			getAuthToken: St,
			children: /* @__PURE__ */ Z(x, {
				...n,
				children: /* @__PURE__ */ Z(h.Provider, {
					value: i,
					children: /* @__PURE__ */ Z(S, { children: t })
				})
			})
		});
	}
	function T() {
		return K(m);
	}
	function E() {
		return K(g);
	}
	function D(e, t) {
		let n = K(h), r = n ? e(n) : t;
		return Qe(n?.subscribe ?? Ct, r, r);
	}
	function A() {
		return D((e) => e.placement, Tt);
	}
	function j() {
		return D((e) => e.pageClaimed, Et);
	}
	function M(e, t, n = !0, r = {}) {
		let i = K(h), a = !!r.compact, o = r.fit ?? "width", s = JSON.stringify(r.documents ?? []), c = J(() => JSON.parse(s), [s]);
		Ze(() => i && e && n ? i.claim(e, t, {
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
		let l = D((e) => e.current, wt);
		return !!e && l === e;
	}
	function N({ placement: e, compact: n = !1, documents: r, fit: i, className: a }) {
		let o = K(m), s = K(g), [c, l] = X(null), u = Mt(c), d = !!o?.lobby && $(o.call.phase, !0), f = e === "stage" ? d && u > 0 : e === "composer" ? u > 0 : e === "pane" || d && !!s?.open && u > 0, p = e === "composer" || e === "stage", h = p && (n || at(u)), _ = M(c, e, f, {
			compact: h,
			...r ? { documents: r } : {},
			...i ? { fit: i } : {}
		}), v = e === "stage" ? "call-stage" : e === "composer" ? "composer-call-dock" : e === "page" ? "page-call-block" : e === "block" ? "shell-call-block" : "call-block-pane";
		return /* @__PURE__ */ Z(t, {
			ref: l,
			gap: "none",
			className: a ?? (e === "composer" ? "min-w-0" : "shrink-0 min-w-0"),
			"aria-label": bt(o?.callNoun ?? "huddle"),
			"data-testid": v,
			"data-holds-media": _ ? "true" : "false",
			...p ? { "data-compact": h ? "true" : "false" } : {}
		});
	}
	function P(e, t) {
		let n = K(m), r = n?.bind, i = n?.unbind, a = Y(() => {});
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
	function F(e, t = {}) {
		let n = K(m), r = typeof e == "string" || e === null ? [e] : e, i = r.find((e) => !!e) ?? null, a = t.bind ?? null, o = a ? a.lobbyName === void 0 ? i : a.lobbyName : null, s = a ? a.blockedReason ?? n?.unavailableReason ?? void 0 : void 0, c = P(a && o ? {
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
				n.lobby?.lobbyName === o && lt(n.call);
			}
		}), l = t.enabled !== !1 && st(n?.lobby ?? null, n?.call.phase ?? "idle", r);
		return {
			block: l ? /* @__PURE__ */ Z(N, {
				placement: "composer",
				compact: !!t.compact,
				...t.documents ? { documents: t.documents } : {}
			}) : void 0,
			holds: l,
			...c
		};
	}
	function ee({ id: e, onOpenPeople: n, onOpenDocument: r, overlay: i, header: a, extras: o, notice: s, recordingConsent: c, dockTestId: l, highlightFor: u }) {
		let d = K(m), f = D((e) => e.current, wt), p = D((e) => e.placement, Tt), h = D((e) => e.compact, Et), g = D((e) => e.documents, Ot), v = D((e) => e.fit, kt), y = !!d?.lobby && $(d.call.phase, !0), b = !!f && p === "composer", x = !!f && p !== "pane", S = it(f ? p : "footer", h), C = !!f && S === "grid" && v === "contain", w = d?.lobby ?? null, T = d?.meeting?.hands, E = J(() => {
			if (!T || T.length === 0) return;
			let e = new Map(T.map((e, t) => [e.userId, t + 1]));
			return (t) => e.get(t);
		}, [T]), O = !!f && a != null && !!d?.meeting, k = S !== "grid" && S !== "stage", A = c === !1 || O || k ? null : d?.recordingNote ?? null, j = c === !1 || !k ? null : d?.recordingIndicator ?? null, M = A && s !== void 0 ? /* @__PURE__ */ Q(t, {
			gap: "xs",
			children: [A, s]
		}) : A ?? s, N = y && w && d ? /* @__PURE__ */ Z(_, {
			call: d.call,
			title: w.title,
			onOpenPeople: () => n?.(w, d.tenant),
			selfName: d.self?.displayName ?? "",
			compact: !x || h,
			...x && !h ? { tileSize: "lg" } : {},
			...b && g.length ? {
				documents: g.map((e) => ({
					id: e.id,
					title: e.title
				})),
				onDocumentClick: (e) => {
					let t = g.find((t) => t.id === e);
					t && r?.(t);
				}
			} : {},
			layout: S,
			...C ? { fit: "contain" } : {},
			...E ? { handFor: E } : {},
			...u ? { highlightFor: u } : {},
			...o === void 0 ? {} : { extras: o },
			...M == null ? {} : { notice: M },
			...j ? { metaAside: j } : {},
			"data-testid": l ? l(w, d.tenant) : "conversation-call-dock"
		}) : null;
		return N ? f ? et(/* @__PURE__ */ Q(t, {
			gap: "none",
			className: p === "stage" ? "relative h-full min-h-0" : C ? "relative min-h-0 flex-1" : "relative",
			"data-testid": "shell-call-media",
			"data-placement": p,
			"data-layout": S,
			"data-expanded": "true",
			children: [
				a,
				N,
				i
			]
		}), f) : /* @__PURE__ */ Z(t, {
			id: e,
			gap: "none",
			className: "hidden",
			"data-testid": "shell-call-media",
			"data-placement": "footer",
			"data-layout": S,
			"data-expanded": "false",
			children: N
		}) : null;
	}
	return {
		CallHostProvider: C,
		CallMediaOutlet: ee,
		CallBlock: N,
		PreJoinDialog: b,
		ConversationCallDock: _,
		useCallHost: T,
		useCallBlock: F,
		useCallLobby: P,
		useCallMediaPanel: E,
		useCallBlockPlacement: A,
		useCallBlockPageClaimed: j,
		useClaimCallBlock: M
	};
}
//#endregion
export { C as ACTIVITY_HISTORY_LINES, H as ALL_REALTIME_CAPABILITIES, de as CONVERSATION_CAPABILITY_NAMES, Ve as CapabilityBoundary, je as CapabilityGate, Te as DEFAULT_REALTIME_CAPABILITIES, k as IncomingCallToast, g as MAX_ATTACHMENT_BYTES, m as MAX_IMAGE_BYTES, Le as MeetingChatContext, Ee as MeetingChatTargetSwitch, ue as NetworkErrorBoundary, ne as NewHangoutRoomDialog, Pe as RealtimeIntegrationsProvider, Je as ReconnectingShim, S as WrappedActivityPanel, Ae as WrappedAudioVideoSettingsForm, Ne as WrappedBreakoutRoomBanner, ye as WrappedBreakoutRoomsPanel, we as WrappedCanvasDocument, xe as WrappedChatPanel, qe as WrappedConnectionPill, Ce as WrappedConversationSurface, re as WrappedCursorOverlay, b as WrappedFileUploadDrop, te as WrappedHangoutLayout, ve as WrappedMediaEffectsPreviewPanel, z as WrappedMediaEffectsTray, B as WrappedNotificationBell, Ge as WrappedNotificationCenter, N as WrappedPresencePanel, Ue as WrappedReactionsOverlay, h as acceptsDocumentImage, v as adaptActivityEvent, W as adaptActivityEvents, ce as adaptBreakoutRooms, j as adaptChatMessage, M as adaptChatMessages, P as adaptFileUploadState, w as adaptFileUploads, D as adaptHangoutParticipant, A as adaptHangoutParticipants, ee as adaptMessageReactions, Ye as adaptNotification, y as adaptNotifications, L as adaptPresenceEntry, E as adaptPresenceRoster, I as adaptReaction, R as adaptReactions, He as applyNetworkShim, ae as buildCanvasDocumentExtensions, ct as callCounts, $ as callDrawn, oe as canEditCanvasGrant, F as canvasDocumentSaveState, me as canvasRecoveryKey, Be as capabilityNamesFor, Ft as createCallBlockHost, ie as createCanvasDocumentPane, O as createConversationCallDock, pe as createConversationFeaturesFor, We as createHangoutRoomRow, Ke as createHangoutRoomsSection, U as createRealtimeCapabilityProvider, be as createRealtimeIntegrations, se as createWrappedHangoutRoomsList, ke as createWrappedLVSHangoutLayout, Ie as createWrappedStreamStage, Re as decodeCanvasRecovery, Oe as defaultRoomDrafts, De as encodeCanvasRecovery, Me as incomingCallTitle, ge as mediaEffectsChangeCount, Fe as meetingChatTitle, V as meetingHandPositions, Se as meetingRosterProps, ze as meetingToolbarItems, T as newestActivityFirst, lt as pageHuddleStart, x as slugifyRoomName, _ as useCanvasRecovery, p as useDocumentImageUpload, fe as useMeetingChat, _e as useRealtimeCapabilities, le as useRealtimeIntegrations, he as withMeetingHands };
