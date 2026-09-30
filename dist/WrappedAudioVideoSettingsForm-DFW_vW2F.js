import { t as e } from "./cn-D4QmbyEy.js";
import { v as t } from "./overlayStack-DWxp7Rsz.js";
import { t as n } from "./IconButton-VqtspsS5.js";
import { G as r } from "./Icons-_hcrQmPz.js";
import { n as i, t as a } from "./Stack-DNMA-_4L.js";
import { t as o } from "./Badge-BV6tPLgZ.js";
import { t as s } from "./Banner-CmrqvKtx.js";
import { t as c } from "./Modal-R-ipbeZi.js";
import { t as l } from "./ConfirmDialog-DmA3u0Oq.js";
import { t as u } from "./EmptyState-DnbFBYDA.js";
import { n as d } from "./ThinkingDots-BZOWJ3Fp.js";
import { n as f } from "./StatusPill-c89IbU1L.js";
import { t as p } from "./SkeletonCard-D3FL0TB7.js";
import { n as m } from "./Slider-DEbQCKD1.js";
import { t as h } from "./Avatar-k-lopdn-.js";
import { t as g } from "./InlineAlert-CBtteaVZ.js";
import { n as _, r as v, t as y } from "./NotificationBell-Dedv0Eov.js";
import { t as b } from "./PresenceAvatars-DlmKqodq.js";
import { t as x } from "./FileUploadDrop-o7W15kEh.js";
import { t as S } from "./ActivityFeed-CHYjJy8q.js";
import { a as C, i as ee, n as te, o as ne } from "./DockedAside-C1MsqwIK.js";
import { d as re, n as w, t as T, u as E } from "./ConversationSurface-0ux6abDE.js";
import { C as D, E as O, S as k, _ as A, r as j, s as M, t as ie, x as N, y as ae } from "./CallDock-D1O9CmnZ.js";
import { t as P } from "./useActiveSpeaker-BGKJU3Lb.js";
import { c as oe, o as se, s as ce } from "./useDocumentImageUpload-Dvbsr3Mh.js";
import { Component as F, createContext as I, createElement as le, useCallback as L, useContext as R, useEffect as z, useMemo as B, useRef as V, useState as H } from "react";
import { Fragment as U, jsx as W, jsxs as G } from "react/jsx-runtime";
import * as K from "yjs";
//#region src/integrations/realtime/HangoutRoomRow.tsx
function q(e) {
	function t(t) {
		return J(e, t);
	}
	return t;
}
function J(e, { slug: t, name: n, participantId: r, occupancy: i, subscribeRoomsIndex: a, onClick: s, onContextMenu: c, onOpenConversation: l, kebab: u, className: d, "data-testid": f = "room-row" }) {
	let p = e.useRoomOccupancy(a ? t : null, { subscribeRoomsIndex: a }), m = a ? p.occupancy ?? null : i ?? null, h = m?.count ?? 0, g = m?.members ?? [], _ = B(() => r ? g.some((e) => e.participantId === r) : !1, [g, r]), v = _, y = B(() => g.slice(0, 3).map((e) => ({
		id: e.participantId,
		name: e.displayName || e.userId,
		online: !0
	})), [g]), x = null;
	h > 1 ? x = /* @__PURE__ */ G(U, { children: [/* @__PURE__ */ W(b, {
		users: y,
		maxVisible: 3,
		size: 18
	}), /* @__PURE__ */ W(o, {
		variant: "count",
		value: h,
		color: "muted"
	})] }) : h === 1 && _ ? x = /* @__PURE__ */ W(o, {
		variant: "pulse",
		color: "accent",
		"aria-label": "Just you in this room",
		"data-testid": `${f}-self-pulse`
	}) : h === 1 && (x = /* @__PURE__ */ G(U, { children: [/* @__PURE__ */ W(b, {
		users: y,
		maxVisible: 1,
		size: 18
	}), /* @__PURE__ */ W(o, {
		variant: "count",
		value: 1,
		color: "muted"
	})] }));
	let S = l ? /* @__PURE__ */ W("button", {
		type: "button",
		"aria-label": `Open the ${n} conversation`,
		title: "Open conversation",
		"data-testid": `${f}-open-conversation`,
		onClick: (e) => {
			e.stopPropagation(), l();
		},
		className: "grid h-5 w-5 place-items-center rounded bg-transparent text-[11px] text-text-tertiary opacity-0 transition-opacity hover:bg-surface-hover hover:text-text-primary focus:opacity-100 group-hover:opacity-100",
		children: "💬"
	}) : null;
	return /* @__PURE__ */ W(C, {
		"data-testid": f,
		icon: /* @__PURE__ */ W("span", {
			"aria-hidden": "true",
			className: "font-semibold text-text-tertiary",
			children: "#"
		}),
		label: n,
		trailing: x,
		active: v,
		onClick: s,
		onContextMenu: c,
		kebab: u ?? S,
		"aria-label": `${n} room`,
		className: d,
		dataAttrs: {
			"data-room-slug": t,
			"data-room-name": n,
			"data-room-active-count": h,
			"data-joined": v ? "true" : "false"
		}
	});
}
//#endregion
//#region src/integrations/realtime-modules/NewHangoutRoomDialog.tsx
var Y = 3, X = 48;
function ue(e) {
	return e.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 48);
}
function de(e) {
	let t = e.trim();
	return t.length === 0 ? "Name is required." : t.length < Y ? `Name must be at least ${Y} characters.` : t.length > X ? `Name must be at most ${X} characters.` : null;
}
function fe({ open: e, onClose: n, onCreate: r, onCreated: i, defaultVisibility: a }) {
	let [o, s] = H(""), [l, u] = H(""), [d, f] = H(!1), [p, h] = H(!1), [g, _] = H(!1), [v, y] = H(null);
	z(() => {
		e && (s(""), u(""), f(!1), h(!1), _(!1), y(null));
	}, [e]);
	let b = B(() => de(o), [o]), x = B(() => ue(o), [o]), S = !b && !g;
	async function C(e) {
		if (e.preventDefault(), S) {
			_(!0), y(null);
			try {
				let e = await r({
					name: o.trim(),
					description: l.trim() || void 0,
					visibility: a,
					settings: {
						audioOnly: d,
						recordingEnabled: p
					}
				});
				i?.(e), n();
			} catch (e) {
				y(e instanceof Error ? e.message : "Failed to create room."), _(!1);
			}
		}
	}
	return /* @__PURE__ */ W(c, {
		open: e,
		onClose: g ? () => {} : n,
		title: "New room",
		maxWidth: 440,
		rawChildren: !0,
		backdropTestId: "new-hangout-room-dialog",
		footer: null,
		children: /* @__PURE__ */ G("form", {
			onSubmit: C,
			className: "flex flex-col gap-4",
			children: [
				/* @__PURE__ */ G("label", {
					className: "flex flex-col gap-1",
					children: [
						/* @__PURE__ */ W("span", {
							className: "text-[12px] font-semibold text-text-primary",
							children: "Name"
						}),
						/* @__PURE__ */ W("input", {
							"data-autofocus": !0,
							"data-testid": "new-hangout-room-name",
							type: "text",
							value: o,
							onChange: (e) => s(e.target.value),
							placeholder: "Team standup",
							maxLength: 58,
							disabled: g,
							className: "w-full px-3 py-2 text-sm border border-border-emphasis rounded-md focus:outline-none focus:ring-2 focus:ring-info"
						}),
						/* @__PURE__ */ G("div", {
							className: "flex items-center justify-between text-[11px] text-text-tertiary",
							children: [/* @__PURE__ */ W("span", {
								"data-testid": "new-hangout-room-slug-preview",
								children: x ? `#${x}` : "Slug preview appears here"
							}), /* @__PURE__ */ W("span", { children: `${o.trim().length}/${X}` })]
						}),
						b && o.length > 0 && /* @__PURE__ */ W("span", {
							"data-testid": "new-hangout-room-name-error",
							className: "text-[11px] text-danger-fg",
							children: b
						})
					]
				}),
				/* @__PURE__ */ G("label", {
					className: "flex flex-col gap-1",
					children: [/* @__PURE__ */ G("span", {
						className: "text-[12px] font-semibold text-text-primary",
						children: ["Description ", /* @__PURE__ */ W("span", {
							className: "font-normal text-text-tertiary",
							children: "(optional)"
						})]
					}), /* @__PURE__ */ W("textarea", {
						"data-testid": "new-hangout-room-description",
						value: l,
						onChange: (e) => u(e.target.value),
						placeholder: "What's this room for?",
						rows: 2,
						disabled: g,
						className: "w-full px-3 py-2 text-sm border border-border-emphasis rounded-md focus:outline-none focus:ring-2 focus:ring-info resize-none"
					})]
				}),
				/* @__PURE__ */ G("div", {
					className: "flex flex-col gap-3",
					children: [/* @__PURE__ */ G("label", {
						className: "flex items-center justify-between gap-3",
						children: [/* @__PURE__ */ G("span", {
							className: "flex flex-col",
							children: [/* @__PURE__ */ W("span", {
								className: "text-[13px] font-semibold text-text-primary",
								children: "Audio only"
							}), /* @__PURE__ */ W("span", {
								className: "text-[11px] text-text-tertiary",
								children: "Skip video tracks — voice-only room."
							})]
						}), /* @__PURE__ */ W(m, {
							checked: d,
							onChange: f,
							disabled: g,
							"aria-label": "Audio only",
							"data-testid": "new-hangout-room-audio-only"
						})]
					}), /* @__PURE__ */ G("label", {
						className: "flex items-center justify-between gap-3",
						children: [/* @__PURE__ */ G("span", {
							className: "flex flex-col",
							children: [/* @__PURE__ */ W("span", {
								className: "text-[13px] font-semibold text-text-primary",
								children: "Recording enabled"
							}), /* @__PURE__ */ W("span", {
								className: "text-[11px] text-text-tertiary",
								children: "Allow server-side recording of sessions."
							})]
						}), /* @__PURE__ */ W(m, {
							checked: p,
							onChange: h,
							disabled: g,
							"aria-label": "Recording enabled",
							"data-testid": "new-hangout-room-recording"
						})]
					})]
				}),
				v && /* @__PURE__ */ W("div", {
					"data-testid": "new-hangout-room-error",
					role: "alert",
					className: "text-[12px] text-danger-fg bg-danger-bg border border-danger-border rounded-md px-3 py-2",
					children: v
				}),
				/* @__PURE__ */ G("div", {
					className: "flex justify-end gap-2 pt-1",
					children: [/* @__PURE__ */ W(t, {
						type: "button",
						variant: "ghost",
						onClick: n,
						disabled: g,
						children: "Cancel"
					}), /* @__PURE__ */ W(t, {
						type: "submit",
						variant: "primary",
						disabled: !S,
						"data-testid": "new-hangout-room-submit",
						children: g ? "Creating…" : "Create room"
					})]
				})
			]
		})
	});
}
//#endregion
//#region src/integrations/realtime/HangoutRoomsSection.tsx
function pe(e) {
	function t(t) {
		return Z(e, t);
	}
	return t;
}
function Z(e, { rooms: r, occupancyFor: i, occupancyAdapter: a, participantId: o, onJoinRoom: s, onOpenConversation: c, onContextMenu: l, onBrowseAll: d, maxVisible: f = 10, title: p = "Rooms", storageKey: m, renderCreateDialog: h }) {
	let [g, _] = H(!1), v = () => _(!0), y = () => _(!1), b = B(() => {
		let e = /* @__PURE__ */ new Set(), t = [];
		for (let n of r.rooms) n.state === "active" && (e.has(n.slug) || (e.add(n.slug), t.push(n)));
		return t;
	}, [r.rooms]), x = B(() => b.slice(0, f), [b, f]), S = b.length - x.length;
	return /* @__PURE__ */ G(U, { children: [/* @__PURE__ */ G(ne, {
		title: p,
		storageKey: m,
		actions: /* @__PURE__ */ W(n, {
			"aria-label": "New room",
			size: "sm",
			onClick: v,
			icon: /* @__PURE__ */ W("span", {
				"aria-hidden": "true",
				className: "text-[14px] leading-none font-bold",
				children: "+"
			}),
			"data-testid": "new-room-button"
		}),
		"data-testid": "rooms-section",
		children: [
			r.isLoading && /* @__PURE__ */ W("div", {
				className: "flex flex-col gap-1 px-1 py-1",
				"data-testid": "hangout-rooms-loading",
				children: [
					0,
					1,
					2
				].map((e) => /* @__PURE__ */ W("div", {
					"aria-hidden": "true",
					className: "h-7 rounded-md bg-surface-hover animate-pulse"
				}, e))
			}),
			!r.isLoading && r.error && /* @__PURE__ */ G("div", {
				role: "alert",
				"data-testid": "hangout-rooms-error",
				className: "mx-1 my-1 px-3 py-2 text-[12px] text-danger-fg bg-danger-bg border border-danger-border rounded-md flex items-center justify-between gap-2",
				children: [/* @__PURE__ */ W("span", {
					className: "truncate",
					children: "Couldn't load rooms."
				}), /* @__PURE__ */ W("button", {
					type: "button",
					onClick: () => void r.refetch(),
					className: "text-danger-fg underline hover:text-danger-fg cursor-pointer",
					children: "Retry"
				})]
			}),
			!r.isLoading && !r.error && b.length === 0 && /* @__PURE__ */ W(u, {
				testId: "hangout-rooms-empty",
				title: "No rooms yet",
				description: "Create one to start an ongoing hangout.",
				action: /* @__PURE__ */ W(t, {
					onClick: v,
					variant: "primary",
					size: "sm",
					children: "Create room"
				})
			}),
			!r.isLoading && !r.error && b.length > 0 && /* @__PURE__ */ G("div", {
				className: "flex flex-col gap-0.5",
				children: [x.map((t) => /* @__PURE__ */ W(e, {
					slug: t.slug,
					name: t.name,
					participantId: o,
					subscribeRoomsIndex: a,
					occupancy: a ? null : i?.(t.slug) ?? null,
					onClick: s ? () => s(t) : void 0,
					onOpenConversation: c ? () => c(t) : void 0,
					onContextMenu: l ? (e) => l(t, e) : void 0
				}, t.slug)), S > 0 && d && /* @__PURE__ */ W(C, {
					"data-testid": "hangout-rooms-browse-all",
					label: /* @__PURE__ */ G("span", {
						className: "text-[12px] text-neutral",
						children: [
							"Browse all (",
							b.length,
							")"
						]
					}),
					onClick: d
				})]
			})
		]
	}), h ? h({
		open: g,
		onClose: y
	}) : /* @__PURE__ */ W(fe, {
		open: g,
		onClose: y,
		onCreate: r.createRoom,
		onCreated: (e) => {
			s?.(e);
		}
	})] });
}
//#endregion
//#region src/integrations/realtime-modules/NetworkErrorBoundary.tsx
var me = class extends F {
	state = { error: null };
	static getDerivedStateFromError(e) {
		return { error: e };
	}
	componentDidCatch(e, t) {
		let { onError: n } = this.props;
		n ? n(e, t) : console.error("[NetworkErrorBoundary]", e, t.componentStack);
	}
	reset = () => {
		this.props.onRetry?.(), this.setState({ error: null });
	};
	render() {
		let { error: e } = this.state;
		if (e == null) return this.props.children;
		let { fallback: t, title: n = "Something went wrong", description: r, retryLabel: i = "Retry" } = this.props;
		return t ? t(e, this.reset) : /* @__PURE__ */ W("div", {
			"data-testid": "network-error-boundary-fallback",
			children: /* @__PURE__ */ W(u, {
				icon: "⚠️",
				title: n,
				description: r ?? e.message,
				actionLabel: i,
				onAction: this.reset
			})
		});
	}
};
//#endregion
//#region src/integrations/realtime-modules/ReconnectingShim.tsx
function he({ connectionState: t, children: n, onRetry: r, reconnectingLabel: i, disconnectedTitle: a = "Disconnected", disconnectedDescription: o = "The connection to the server was lost. Check your network and try again.", retryLabel: s = "Try again", connectingPlaceholder: c, disconnectedFallback: l, className: d }) {
	return t === "connecting" ? /* @__PURE__ */ W("div", {
		"data-testid": "reconnecting-shim-connecting",
		className: d,
		children: c ?? /* @__PURE__ */ W(p, { height: 120 })
	}) : t === "disconnected" ? /* @__PURE__ */ W("div", {
		"data-testid": "reconnecting-shim-disconnected",
		className: d,
		children: l ?? /* @__PURE__ */ W(u, {
			icon: "📡",
			title: a,
			description: o,
			actionLabel: r ? s : void 0,
			onAction: r
		})
	}) : t === "reconnecting" ? /* @__PURE__ */ G("div", {
		"data-testid": "reconnecting-shim-reconnecting",
		className: e("relative", d),
		children: [/* @__PURE__ */ W("div", {
			className: "opacity-60 pointer-events-none",
			children: n
		}), /* @__PURE__ */ W(N, {
			show: !0,
			label: i
		})]
	}) : /* @__PURE__ */ W("div", {
		"data-testid": "reconnecting-shim-connected",
		className: d,
		children: n
	});
}
//#endregion
//#region src/integrations/realtime-modules/networkShim.tsx
function ge(e, t) {
	return t ? /* @__PURE__ */ W(me, {
		title: t.errorTitle,
		description: t.errorDescription,
		retryLabel: t.retryLabel,
		onRetry: t.onRetry,
		onError: t.onError,
		fallback: t.errorFallback,
		children: /* @__PURE__ */ W(he, {
			connectionState: t.connectionState,
			onRetry: t.onRetry,
			reconnectingLabel: t.reconnectingLabel,
			disconnectedTitle: t.disconnectedTitle,
			disconnectedDescription: t.disconnectedDescription,
			retryLabel: t.retryLabel,
			connectingPlaceholder: t.connectingPlaceholder,
			disconnectedFallback: t.disconnectedFallback,
			className: t.className,
			children: e
		})
	}) : e;
}
//#endregion
//#region src/integrations/realtime/WrappedHangoutRoomsList.tsx
function _e(e) {
	function t(t) {
		return ve(e, t);
	}
	return t;
}
function ve(e, { hangoutRooms: t, subscribeRoomsIndex: n, occupancyFor: r, participantId: i, onJoin: a, onContextMenu: o, onBrowseAll: s, maxVisible: c, title: l, storageKey: u, renderEmpty: d, renderCreateDialog: f, wrapWithNetworkShim: p }) {
	return t.rooms.filter((e) => e.state === "active").length === 0 && !t.isLoading && !t.error && d ? /* @__PURE__ */ W("div", {
		"data-testid": "wrapped-hangout-rooms-empty-slot",
		children: d
	}) : /* @__PURE__ */ W(U, { children: ge(/* @__PURE__ */ W(e, {
		rooms: t,
		occupancyAdapter: n,
		occupancyFor: r,
		participantId: i,
		onJoinRoom: a ? (e) => a(e.slug) : void 0,
		onContextMenu: o,
		onBrowseAll: s,
		maxVisible: c,
		title: l,
		storageKey: u,
		renderCreateDialog: f
	}), p) });
}
//#endregion
//#region src/integrations/realtime/capabilities.tsx
var Q = [
	"chat",
	"presence",
	"video",
	"audio",
	"files",
	"reactions",
	"recordings"
], ye = {
	chat: !0,
	presence: !0
}, be = I(null);
function xe(e) {
	function t(t) {
		return Se(e, t);
	}
	return t;
}
function Se(e, { capabilities: t = ye, channel: n, children: r }) {
	let i = B(() => Q.filter((e) => t[e] === !0), [t]), { enabled: a, isLoading: o } = e.useCapabilities(i, n), s = B(() => {
		let e = {}, n = {}, r = {};
		for (let i of Q) e[i] = t[i] === !0, n[i] = a[i] ?? !1, r[i] = e[i] && n[i];
		return {
			can: r,
			declared: e,
			provisioned: n,
			isLoading: o
		};
	}, [
		t,
		a,
		o
	]);
	return /* @__PURE__ */ W(be.Provider, {
		value: s,
		children: r
	});
}
function Ce() {
	return R(be) ?? {
		can: Object.fromEntries(Q.map((e) => [e, !1])),
		declared: Object.fromEntries(Q.map((e) => [e, !1])),
		provisioned: Object.fromEntries(Q.map((e) => [e, !1])),
		isLoading: !1
	};
}
function we({ need: e, children: t, fallback: n = null }) {
	let { can: r } = Ce(), i = (Array.isArray(e) ? e : [e]).every((e) => r[e]);
	return /* @__PURE__ */ W(U, { children: i ? t : n });
}
//#endregion
//#region src/integrations/realtime/WrappedConversationSurface.tsx
var Te = {
	files: "conversation.files",
	documents: "conversation.documents",
	pins: "conversation.pins",
	mentions: "conversation.mentions",
	calls: "conversation.calls"
};
function Ee(e = T, t = {}) {
	return e.filter((e) => e !== "chat" && e !== "members").map((e) => t[e] ?? Te[e]);
}
function De(e) {
	return (t) => Oe(e, t);
}
function Oe(e, t) {
	let { channel: n = null, hasDocuments: r = !0, from: i = T } = t;
	return i.filter((t) => t === "mentions" ? !1 : t === "documents" ? r : t !== "calls" || !!e.lobbyForChannel(n));
}
function ke({ declare: e = T, capabilities: t, capabilitiesError: n, capabilityNames: r = {}, children: i, ...a }) {
	let o = B(() => {
		let i = r;
		return e.filter((e) => e === "chat" || e === "members" || !t || n ? !0 : t[i[e] ?? Te[e]] === !0);
	}, [
		e,
		t,
		n,
		r
	]);
	return /* @__PURE__ */ W(w, {
		...a,
		features: o,
		children: i
	});
}
//#endregion
//#region src/integrations/realtime/WrappedStreamStage.tsx
function Ae(e, { channelArn: t, excludeParticipantId: n, getAuthToken: r, baseUrl: i, onStatusChange: a, ...o }) {
	let s = e.useLVSSubscriber({
		channelArn: t ?? "",
		autoStart: !!t,
		excludeParticipantId: n,
		baseUrl: i,
		getAuthToken: r
	}), c = s.phase === "live", { viewerCount: l } = e.useLVSViewerCount({
		channelArn: t,
		baseUrl: i
	});
	return z(() => {
		a?.({
			mode: "realtime",
			live: c,
			error: s.error
		});
	}, [
		c,
		s.error,
		a
	]), /* @__PURE__ */ W(M, {
		...o,
		live: c,
		stream: s.stream,
		...l === null ? {} : { viewerCount: l }
	});
}
function je(e, { channelArn: t, playbackToken: n, baseUrl: r, onStatusChange: i, ...a }) {
	let o = e.useLVSLiveHls({
		channelArn: t,
		playbackToken: n,
		baseUrl: r
	}), { viewerCount: s } = e.useLVSViewerCount({
		channelArn: t,
		baseUrl: r,
		playbackToken: n
	});
	return z(() => {
		i?.({
			mode: "near-realtime",
			live: o.ready,
			error: null
		});
	}, [o.ready, i]), /* @__PURE__ */ W(M, {
		...a,
		live: o.ready,
		playlistUrl: o.playlistUrl,
		...s === null ? {} : { viewerCount: s }
	});
}
function Me(e) {
	function t(t) {
		return Ae(e, t);
	}
	function n(t) {
		return je(e, t);
	}
	function r({ mode: e = "near-realtime", ...r }) {
		return W(e === "realtime" ? t : n, { ...r });
	}
	return r;
}
//#endregion
//#region src/integrations/realtime/WrappedLVSHangoutLayout.tsx
function Ne({ stream: e, displayName: t }) {
	return e ? /* @__PURE__ */ W("video", {
		autoPlay: !0,
		playsInline: !0,
		muted: !0,
		ref: (t) => {
			t && t.srcObject !== e && (t.srcObject = e);
		},
		className: "w-full h-full object-cover scale-x-[-1]"
	}) : /* @__PURE__ */ W("div", {
		className: "w-full h-full grid place-items-center bg-surface-emphasis",
		"data-testid": "local-camera-avatar",
		children: /* @__PURE__ */ W(h, {
			name: t,
			size: 64
		})
	});
}
function Pe(e, t) {
	let n = e.isLocal, r = n ? t ?? e.displayName ?? "You" : e.displayName || e.participantId.slice(0, 8), i = e.streams[0], a = e.screenStream, o = n ? /* @__PURE__ */ W(Ne, {
		stream: i,
		displayName: r
	}) : /* @__PURE__ */ W(k, {
		stream: i,
		displayName: r,
		cameraOn: e.hasVideo
	}), s = a ? /* @__PURE__ */ W(D, {
		stream: a,
		muted: n,
		className: "w-full h-full object-contain bg-black"
	}) : void 0;
	return {
		id: e.participantId,
		displayName: r,
		isLocal: n,
		isMuted: !e.hasAudio,
		videoElement: o,
		screenElement: s
	};
}
function Fe(e) {
	function t(t) {
		return Ie(e, t);
	}
	return t;
}
function Ie(e, { stageToken: t, participantId: n, userId: r, localClientId: i, getStageToken: a, overlay: o, spotlightContent: s, onParticipantClick: c, mode: l = "auto", activeSpeakerStrategy: u = "audio-level", localTileLabel: d, showLocalAsTile: f = !0, className: p, "data-testid": m }) {
	let h = e.useLVSHangout({
		stageToken: t,
		participantId: n,
		userId: r ?? n.slice(0, 8),
		getAuthToken: a
	}), g = B(() => h.participants.filter((e) => f || !e.isLocal).map((e) => Pe(e, d)), [
		h.participants,
		f,
		d
	]), _ = h.participants.filter((e) => !e.isLocal).length, v = {
		connectionState: h.connectionState,
		error: h.error,
		participantCount: h.participants.length,
		remoteCount: _
	};
	return /* @__PURE__ */ G("div", {
		"data-testid": m,
		className: `relative flex-1 min-h-0 ${p ?? ""}`,
		children: [/* @__PURE__ */ W(O, {
			participants: g,
			localParticipant: null,
			mode: l,
			spotlightContent: s,
			onParticipantClick: c,
			className: "h-full"
		}), o && /* @__PURE__ */ W("div", {
			className: "absolute inset-0 pointer-events-none z-10",
			"data-testid": "wrapped-overlay-slot",
			children: /* @__PURE__ */ W("div", {
				className: "pointer-events-auto",
				children: o(v)
			})
		})]
	});
}
//#endregion
//#region src/integrations/realtime/createRealtimeIntegrations.tsx
function Le(e) {
	let t = q(e), n = pe(t);
	return {
		HangoutRoomRow: t,
		HangoutRoomsSection: n,
		WrappedHangoutRoomsList: _e(n),
		RealtimeCapabilityProvider: xe(e),
		conversationFeaturesFor: De(e),
		WrappedStreamStage: Me(e),
		WrappedLVSHangoutLayout: Fe(e)
	};
}
var Re = I(null), ze = /* @__PURE__ */ new WeakMap();
function Be(e) {
	let t = ze.get(e);
	return t || (t = Le(e), ze.set(e, t)), t;
}
function Ve({ modules: e, children: t }) {
	let n = B(() => Be(e), [e]);
	return /* @__PURE__ */ W(Re.Provider, {
		value: n,
		children: t
	});
}
function He() {
	let e = R(Re);
	if (!e) throw Error("useRealtimeIntegrations() needs a <RealtimeIntegrationsProvider modules={…}> above it.");
	return e;
}
//#endregion
//#region src/integrations/realtime/canvasRecovery.ts
function Ue(e, t, n, r = "canvasRecovery") {
	return `${r}:${JSON.stringify([
		e,
		t,
		n
	])}`;
}
function We(e) {
	let t = "";
	for (let n = 0; n < e.length; n += 8192) t += String.fromCharCode(...e.subarray(n, n + 8192));
	return {
		version: 1,
		savedAt: (/* @__PURE__ */ new Date()).toISOString(),
		snapshot: btoa(t)
	};
}
function Ge(e) {
	if (!e || typeof e != "object") return null;
	let t = e;
	if (t.version !== 1 || typeof t.snapshot != "string" || !t.snapshot || typeof t.savedAt != "string") return null;
	try {
		return Uint8Array.from(atob(t.snapshot), (e) => e.charCodeAt(0));
	} catch {
		return null;
	}
}
//#endregion
//#region src/integrations/realtime/useCanvasRecovery.ts
function Ke(e, t, n, r) {
	let i = Ue(e, t, n, r), [a, o] = H(() => {
		try {
			let e = JSON.parse(sessionStorage.getItem(i) ?? "null");
			return Ge(e?.recovered ?? e?.pending) ? e.recovered ?? e.pending : null;
		} catch {
			return null;
		}
	}), s = V(a), c = V(null), [l, u] = H(!1), d = L(() => {
		try {
			!s.current && !c.current ? sessionStorage.removeItem(i) : sessionStorage.setItem(i, JSON.stringify({
				recovered: s.current,
				pending: c.current
			})), u(!1);
		} catch {
			u(!0);
		}
	}, [i]), f = L((e) => {
		s.current = We(e), o(s.current), d();
	}, [d]), p = L(() => {
		s.current = null, o(null), d();
	}, [d]), m = L((e, t) => {
		if (!e || !t) return () => {};
		let n = () => {
			t.pendingUpdateCount && (c.current = We(K.encodeStateAsUpdate(e)), d());
		};
		return e.on("update", n), n(), () => e.off("update", n);
	}, [d]), h = L(() => {
		c.current = null, d();
	}, [d]);
	return z(() => {
		d();
	}, [d]), {
		recovered: a,
		storageError: l,
		retain: f,
		clear: p,
		track: m,
		acknowledged: h,
		download: L(() => {
			let e = Ge(s.current ?? c.current);
			if (!e) return;
			let t = URL.createObjectURL(new Blob([Uint8Array.from(e)], { type: "application/octet-stream" })), r = document.createElement("a");
			r.href = t, r.download = `document-${n}-recovery.yjs`, r.click(), window.setTimeout(() => URL.revokeObjectURL(t), 1e3);
		}, [n]),
		restore: L((e) => {
			let t = Ge(s.current);
			t && (K.applyUpdate(e, t, "explicit-recovery"), p());
		}, [p])
	};
}
//#endregion
//#region src/integrations/realtime/canvasDocumentState.ts
function qe(e, t, n, r) {
	if (e !== "idle") return {
		status: !n && t > 0 ? "offline" : e,
		...e === "error" || !n ? { onRetry: r } : {}
	};
}
function Je(e, t, n = Date.now()) {
	return t && e.canEdit && e.expiresAt > n;
}
//#endregion
//#region src/integrations/realtime/CanvasDocumentPane.tsx
var Ye = {
	showRuler: !0,
	showStatusBar: !1,
	toolbarStyle: "card",
	pageMargin: "narrow",
	fitHeight: "parent",
	paginate: !0
};
function Xe(e) {
	return function(n) {
		let { documentId: r, tenant: o, userId: s, userName: u, userColor: p = "teal", canEdit: m, editing: h = !0, extensions: _, loadImage: v, isProtectedImage: y, uploadImage: b, onPendingChange: S, notices: C, children: ee, viewProps: te, onEditorReady: ne, loadingLabel: re = "Loading collaborative document…", layout: w, keyPrefix: T } = n, E = e.useGateway(), D = Ke(o, s, r, T), O = e.useYjsDoc({
			documentId: r,
			ws: E,
			onMessage: E.onMessage,
			onUnpersistedChanges: D.retain
		}), k = e.useCanvasDocument({ ydoc: O.ydoc }), A = E.connectionState === "connected", j = m && h && O.synced && A, M = V(j);
		M.current = j;
		let [ie, N] = H(!1), [ae, P] = H(null), [ce, F] = H(!1), [I, L] = H(!1), [R, K] = H(null), q = V(null), J = B(() => ({
			name: u,
			color: p
		}), [u, p]);
		z(() => D.track(O.ydoc, O.provider), [
			O.ydoc,
			O.provider,
			D.track
		]), z(() => {
			O.persistenceState === "saved" && O.pendingUpdateCount === 0 && D.acknowledged();
		}, [
			O.persistenceState,
			O.pendingUpdateCount,
			D.acknowledged
		]), z(() => {
			S?.(O.pendingUpdateCount);
		}, [O.pendingUpdateCount, S]), z(() => {
			O.provider?.awareness.setLocalStateField("user", {
				...J,
				id: s
			});
		}, [
			O.provider,
			J,
			s
		]), z(() => {
			if (O.pendingUpdateCount === 0) return;
			let e = (e) => {
				e.preventDefault(), e.returnValue = "";
			};
			return window.addEventListener("beforeunload", e), () => window.removeEventListener("beforeunload", e);
		}, [O.pendingUpdateCount]), z(() => E.onMessage((e) => {
			e.channel === `doc:${r}` && (e.type === "crdt:error" && P(typeof e.error == "string" ? e.error : "The document operation was refused."), e.type === "crdt:snapshot" && P(null));
		}), [E.onMessage, r]);
		let Y = async (e) => {
			let t = q.current;
			if (!(!b || !t || t.isDestroyed || !M.current || I)) {
				L(!0), K(null);
				try {
					let n = await b(e);
					if (q.current !== t || t.isDestroyed || !M.current) throw Error("The document is no longer editable. The image was not inserted.");
					t.chain().focus().setImage({
						src: n,
						alt: e.name
					}).run(), F(!1);
				} catch (e) {
					K(e instanceof Error ? e.message : "The image could not be uploaded.");
				} finally {
					L(!1);
				}
			}
		}, X = qe(O.persistenceState, O.pendingUpdateCount, A, O.retryPersistence), ue = {
			editable: j,
			online: A,
			synced: O.synced,
			pendingUpdateCount: O.pendingUpdateCount,
			persistenceState: O.persistenceState,
			docVersion: O.docVersion,
			ydoc: O.ydoc,
			exportMarkdown: k.exportMarkdown
		}, de = /* @__PURE__ */ G(U, { children: [
			C,
			D.recovered && /* @__PURE__ */ W(g, {
				tone: "warning",
				children: /* @__PURE__ */ G(i, {
					gap: "xs",
					children: ["Changes from an earlier editing session are available for recovery. They have not been applied to this document.", /* @__PURE__ */ G(a, {
						gap: "sm",
						wrap: !0,
						children: [
							/* @__PURE__ */ W(t, {
								size: "sm",
								variant: "secondary",
								onClick: D.download,
								children: "Download recovery"
							}),
							m && /* @__PURE__ */ W(t, {
								size: "sm",
								variant: "secondary",
								disabled: !O.synced || !A || O.pendingUpdateCount > 0,
								onClick: () => N(!0),
								children: "Recover changes…"
							}),
							/* @__PURE__ */ W(t, {
								size: "sm",
								variant: "ghost",
								onClick: D.clear,
								children: "Discard recovery"
							})
						]
					})]
				})
			}),
			D.storageError && /* @__PURE__ */ W(g, {
				tone: "warning",
				children: /* @__PURE__ */ G(a, {
					gap: "sm",
					wrap: !0,
					children: ["This browser could not keep a recovery copy. Keep this page open until saving finishes.", /* @__PURE__ */ W(t, {
						size: "sm",
						variant: "secondary",
						onClick: D.download,
						children: "Download recovery"
					})]
				})
			}),
			ae && /* @__PURE__ */ W(g, {
				tone: "error",
				children: ae
			})
		] }), fe = O.synced && !!O.ydoc && !!k.body, pe = /* @__PURE__ */ G(U, { children: [
			ee,
			/* @__PURE__ */ W(l, {
				open: ie,
				onCancel: () => N(!1),
				title: "Recover earlier changes?",
				tone: "caution",
				body: "This explicitly merges the recovered document with the current version. It can bring back content removed by a version restore. Download the recovery first if you want to keep a separate copy.",
				confirmLabel: "Recover changes",
				onConfirm: () => {
					O.ydoc && m && A && O.pendingUpdateCount === 0 && D.restore(O.ydoc), N(!1);
				}
			}),
			b && /* @__PURE__ */ W(c, {
				open: ce,
				onClose: () => {
					I || F(!1);
				},
				title: "Insert image",
				children: /* @__PURE__ */ G(i, {
					gap: "sm",
					children: [R && /* @__PURE__ */ W(g, {
						tone: "error",
						children: R
					}), /* @__PURE__ */ W(x, {
						accept: "image/*",
						maxSize: 10485760,
						disabled: I || !j,
						label: I ? "Uploading image…" : "Choose an image or drop it here",
						onFiles: (e) => {
							e[0] && Y(e[0]);
						}
					})]
				})
			})
		] }), Z = (e, t = null, n = null) => w ? w({
			notices: de,
			canvas: e,
			toolbar: t,
			ruler: n,
			saveState: X,
			state: ue
		}) : /* @__PURE__ */ G(U, { children: [de, e] });
		if (!fe) return Z(/* @__PURE__ */ W(f, { label: re }));
		if (!k.isCanvas) return Z(/* @__PURE__ */ W(d, {
			title: "Document migration is incomplete",
			body: "The server has not supplied a rich document snapshot. No changes have been made."
		}));
		let me = (e) => /* @__PURE__ */ G(se, {
			loadImage: v,
			...y ? { requiresAuthentication: y } : {},
			children: [/* @__PURE__ */ le(oe, {
				...Ye,
				...te,
				key: O.docVersion,
				isCanvas: !0,
				body: k.body,
				ydoc: O.ydoc,
				provider: O.provider,
				user: J,
				editable: j,
				extensions: _,
				...b && j ? { onInsertImage: () => {
					K(null), F(!0);
				} } : {},
				...e ? { renderFrame: ({ toolbar: t, ruler: n, surface: r }) => e(t, n, r) } : {},
				onEditorReady: (e) => {
					q.current = e, ne?.(e);
				}
			}), pe]
		});
		return w ? me((e, t, n) => Z(/* @__PURE__ */ W(i, {
			gap: "none",
			className: "min-h-0 flex-1",
			"data-testid": "document-canvas-slot",
			children: n
		}), e, t)) : Z(/* @__PURE__ */ W(i, {
			gap: "none",
			className: "min-h-0 flex-1",
			"data-testid": "document-canvas-slot",
			children: me()
		}));
	};
}
//#endregion
//#region src/integrations/realtime/canvasDocumentExtensions.ts
function Ze(e, t) {
	return e({
		...t,
		Image: ce(t.Image)
	});
}
//#endregion
//#region src/integrations/realtime/ConversationCallDock.tsx
var Qe = (e) => e.stream ? /* @__PURE__ */ W(D, {
	stream: e.stream,
	muted: e.isLocal
}) : void 0, $e = () => typeof HTMLMediaElement < "u" && "setSinkId" in HTMLMediaElement.prototype;
function et(e) {
	let t = (e?.participants ?? []).filter((e) => !e.isLocal && e.stream && (e.state === "in-call" || e.state === "reconnecting")), n = t.map((e) => `${e.id}=${e.stream.id}`).join("|");
	return B(() => t.map((e) => ({
		participantId: e.id,
		streams: [e.stream]
	})), [n]);
}
function tt(e, { call: t, title: n, onOpenPeople: r, peopleOpen: i, onOpenSettings: a, onPopOut: o, extras: s, cameraMenuItems: l, tile: u = Qe, notice: d, selfName: f, compact: p = !1, className: m, "data-testid": h = "conversation-call-dock" }) {
	let [_, v] = H(!1), y = e.useAudioVideoSettings({ preview: _ }), { activeSpeakerId: b } = P({ participants: et(t.call) }), x = e.conversationCallDockProps(t, {
		title: n,
		onOpenPeople: r,
		...i === void 0 ? {} : { peopleOpen: i },
		onOpenSettings: a ?? (() => v(!0)),
		...o ? { onPopOut: o } : {},
		...s === void 0 ? {} : { extras: s },
		...l ? { cameraMenuItems: l } : {},
		tile: u,
		activeSpeakerId: b ?? t.activeSpeakerId,
		compact: p,
		"data-testid": h
	});
	if (!x) return null;
	let S = {
		...x,
		...m ? { className: m } : {}
	};
	return /* @__PURE__ */ G(U, { children: [
		d ? /* @__PURE__ */ W(g, {
			tone: "info",
			"data-testid": `${h}-notice`,
			children: d
		}) : null,
		/* @__PURE__ */ W(ie, { ...S }),
		!a && /* @__PURE__ */ W(c, {
			open: _,
			onClose: () => v(!1),
			title: "Call devices",
			children: /* @__PURE__ */ W(j, {
				"data-testid": `${h}-settings`,
				value: y.settings,
				onChange: (e) => {
					y.update(e), t.devices.set({
						...t.devices.prefs,
						...e.microphoneId ? { microphoneId: e.microphoneId } : {},
						...e.cameraId ? { cameraId: e.cameraId } : {},
						...e.speakerId ? { speakerId: e.speakerId } : {}
					});
				},
				devices: {
					microphones: t.devices.list.microphones,
					cameras: t.devices.list.cameras,
					speakers: t.devices.list.speakers
				},
				permission: t.devices.list.permission,
				micLevel: y.micLevel,
				previewStream: y.previewStream,
				cameraOn: t.self.cameraOn,
				speakerSelectionSupported: $e(),
				onTestMic: y.testMic,
				onTestSound: y.testSound,
				testMicState: y.testMicState,
				...f === void 0 ? {} : { selfName: f }
			})
		})
	] });
}
function nt(e) {
	function t(t) {
		return tt(e, t);
	}
	return t;
}
//#endregion
//#region src/integrations/realtime/IncomingCallToast.tsx
function rt(e) {
	return e.kind === "knock" ? `${e.callerName} asks to join` : `${e.callerName} is calling`;
}
function it({ ring: e, onAccept: n, onDecline: i, corner: o = "top-right", width: c = 360, className: l, "data-testid": u = "incoming-call-toast" }) {
	let d = e.kind === "knock";
	return /* @__PURE__ */ W(te, {
		corner: o,
		width: c,
		"data-testid": u,
		...l ? { className: l } : {},
		children: /* @__PURE__ */ W(s, {
			variant: "info",
			layout: "stacked",
			icon: /* @__PURE__ */ W(r, { size: 16 }),
			title: rt(e),
			action: /* @__PURE__ */ G(a, {
				gap: "sm",
				children: [/* @__PURE__ */ W(t, {
					size: "sm",
					variant: "secondary",
					onClick: i,
					"data-testid": "incoming-call-decline",
					children: "Decline"
				}), /* @__PURE__ */ W(t, {
					size: "sm",
					variant: "success",
					onClick: n,
					"data-testid": "incoming-call-accept",
					children: d ? "Let in" : "Accept"
				})]
			}),
			children: e.audioOnly ? "Audio call" : "Video call"
		})
	});
}
//#endregion
//#region src/integrations/realtime-modules/adapters.ts
function $(e) {
	return typeof e == "string" ? e : void 0;
}
function at(e) {
	if (!e || typeof e != "object") return null;
	let t = e;
	return typeof t.messageId != "string" || !t.messageId ? null : {
		messageId: t.messageId,
		author: $(t.author) ?? "Unknown",
		text: $(t.text) ?? "",
		...$(t.timestamp) ? { timestamp: t.timestamp } : {}
	};
}
function ot(e) {
	let t = e.metadata?.attachments, n = Array.isArray(t) ? t.filter((e) => !!e && typeof e == "object" && typeof e.url == "string" && typeof e.id == "string") : void 0, r;
	if (e.metadata) {
		let { replyTo: t, ...n } = e.metadata, i = { ...n }, a = at(t);
		a && (i.replyTo = a), r = Object.keys(i).length > 0 ? i : void 0;
	}
	return {
		id: e.id,
		clientId: e.clientId,
		...e.userId ? { userId: e.userId } : {},
		content: e.message,
		timestamp: e.timestamp,
		displayName: $(e.metadata?.displayName),
		avatarUrl: $(e.metadata?.avatarUrl),
		...n && n.length > 0 ? { attachments: n } : {},
		...r ? { metadata: r } : {}
	};
}
function st(e) {
	return e.map(ot);
}
function ct(e) {
	return {
		id: $(e.metadata?.userId) || e.clientId,
		name: $(e.metadata?.displayName) ?? e.clientId.slice(0, 12),
		avatarUrl: $(e.metadata?.avatarUrl),
		online: e.status !== "offline",
		...e.status === "away" || e.status === "busy" ? { idle: !0 } : {}
	};
}
function lt(e) {
	let t = /* @__PURE__ */ new Map();
	for (let n of e) {
		let e = $(n.metadata?.userId) || n.clientId, r = n.status !== "offline", i = n.status === "away" || n.status === "busy", a = t.get(e);
		if (!a) {
			t.set(e, {
				id: e,
				name: $(n.metadata?.displayName),
				avatarUrl: $(n.metadata?.avatarUrl),
				fallbackName: n.clientId.slice(0, 12),
				online: r,
				idle: i
			});
			continue;
		}
		a.name ??= $(n.metadata?.displayName), a.avatarUrl ??= $(n.metadata?.avatarUrl), a.online = a.online || r, a.idle = a.idle && i;
	}
	return [...t.values()].map((e) => ({
		id: e.id,
		name: e.name ?? e.fallbackName,
		avatarUrl: e.avatarUrl,
		online: e.online,
		...e.online && e.idle ? { idle: !0 } : {}
	}));
}
var ut = [
	15,
	25,
	35,
	45,
	55,
	65,
	75,
	85
], dt = [
	20,
	35,
	50,
	65,
	80
];
function ft(e, t) {
	let n = ut[t % ut.length] ?? 50, r = dt[Math.floor(t / ut.length) % dt.length] ?? 50, i = e.position != null && typeof e.position == "object" ? e.position : null;
	return {
		id: e.id,
		emoji: e.emoji,
		x: i?.x ?? n,
		y: i?.y ?? r,
		timestamp: e.timestamp
	};
}
function pt(e) {
	return e.map(ft);
}
function mt(e, t) {
	return (e.reactionsFor ? e.reactionsFor(t) : e.reactions.filter((e) => e.targetId === t)).map((e) => ({
		emoji: e.emoji,
		userId: e.userId ?? e.clientId,
		displayName: e.displayName
	}));
}
function ht(e) {
	try {
		let t = Date.now() - new Date(e).getTime(), n = Math.floor(t / 1e3);
		return n < 60 ? "just now" : n < 3600 ? `${Math.floor(n / 60)}m ago` : n < 86400 ? `${Math.floor(n / 3600)}h ago` : e.slice(0, 10);
	} catch {
		return "";
	}
}
var gt = {
	"social.room.join": "joined",
	"social.room.leave": "left",
	"social.follow": "followed",
	"social.unfollow": "unfollowed",
	"social.like": "liked",
	"social.reaction": "reacted",
	"social.post.created": "posted",
	"social.comment.created": "commented",
	"pipeline.run.started": "triggered",
	"pipeline.run.completed": "completed",
	"pipeline.run.failed": "failed",
	"pipeline.approval.requested": "requested approval"
};
function _t(e) {
	let t = e.detail;
	return typeof t.subject == "string" ? t.subject : typeof t.contentId == "string" ? t.contentId.slice(0, 12) : typeof t.roomId == "string" ? `room:${t.roomId.slice(0, 8)}` : typeof t.pipelineId == "string" ? `pipeline:${t.pipelineId}` : e.eventType;
}
function vt(e, t) {
	return [
		e.eventType,
		e.timestamp,
		e.userId ?? e.displayName,
		t
	].join("|");
}
function yt(e) {
	return {
		id: vt(e, _t(e)),
		actor: e.displayName,
		action: gt[e.eventType] ?? e.eventType.split(".").pop() ?? "did",
		subject: _t(e),
		ticketId: typeof e.detail.ticketId == "string" ? e.detail.ticketId : void 0,
		timeLabel: ht(e.timestamp),
		kind: e.eventType.split(".")[0]
	};
}
function bt(e) {
	let t = /* @__PURE__ */ new Map();
	return e.map((e) => {
		let n = yt(e), r = t.get(n.id) ?? 0;
		return t.set(n.id, r + 1), r === 0 ? n : {
			...n,
			id: `${n.id}#${r}`
		};
	});
}
function xt(e) {
	return {
		id: e.id,
		filename: e.filename,
		progress: e.progress ?? 0,
		status: e.status,
		downloadUrl: e.downloadUrl,
		error: e.error,
		transferId: e.transferId,
		size: e.size
	};
}
function St(e) {
	return e.map(xt);
}
function Ct(e, t, n) {
	return {
		id: e.clientId,
		displayName: e.displayName || e.clientId.slice(0, 12),
		isMuted: !e.audioOn,
		isLocal: t == null ? void 0 : e.clientId === t,
		...n ? { avatarUrl: n } : {}
	};
}
function wt(e, t, n) {
	return e.map((e) => Ct(e, t, n?.[e.clientId]));
}
function Tt(e) {
	return {
		id: e.id,
		title: e.title,
		body: e.body,
		timestamp: e.timestamp,
		read: e.read ?? !1,
		category: e.type,
		icon: typeof e.payload?.icon == "string" ? e.payload.icon : void 0
	};
}
function Et(e) {
	return e.map(Tt);
}
//#endregion
//#region src/integrations/realtime-modules/WrappedChatPanel.tsx
function Dt({ chat: e, presence: t, upload: n, reactions: r, pins: i, currentActor: a, currentUserId: o, displayName: s, avatarUrl: c, sendMetadata: l, publishTyping: u, attachmentSrc: d, onOpenAttachment: f, acceptFiles: p, maxFileSize: m, onFileError: h, disabled: g, typingUsers: _, tone: v, fill: y, showHeader: b, loadMoreHistory: x = !1, joinHistoryLimit: S = 20, historyPageSize: C = 50, onLoadMore: ee, hasMore: te, loadingMore: ne, composer: w, emojis: T, onReply: E, onJumpToMessage: D, highlightedMessageId: O, documentEditors: k, callParticipants: A, onJoinCall: j, onOpenDocument: M, wrapWithNetworkShim: ie }) {
	let N = B(() => st(e.messages), [e.messages]), ae = _ ?? t?.roster.filter((e) => {
		if (e.metadata?.isTyping !== !0) return !1;
		let t = e.metadata?.userId;
		return o && typeof t == "string" ? t !== o : !a || e.clientId !== a;
	}).map((e) => e.metadata?.displayName ?? e.clientId.slice(0, 8)) ?? [], P = e.sendMessage, oe = L((e) => {
		let t = { ...l ?? {} };
		s && (t.displayName = s), c && (t.avatarUrl = c), Object.keys(t).length > 0 ? P(e, t) : P(e);
	}, [
		P,
		l,
		s,
		c
	]), se = t?.updateMetadata, ce = (u ?? !0) && !!se, F = L((e) => se?.({ isTyping: e }), [se]), I = e.loadHistory, [le, R] = H(S), [G, K] = H(!1), q = e.messages.length, J = V(q);
	z(() => {
		q !== J.current && (J.current = q, K(!1));
	}, [q]);
	let Y = V(le);
	Y.current = le;
	let X = L(() => {
		let e = Y.current + C;
		Y.current = e, R(e), K(!0), I(e);
	}, [I, C]), ue = ee ? {
		onLoadMore: ee,
		hasMore: te,
		loadingMore: ne
	} : x ? {
		onLoadMore: X,
		hasMore: te ?? q >= le,
		loadingMore: ne ?? G
	} : {}, de = B(() => r ? (e) => mt(r, e) : void 0, [r]), fe = B(() => {
		if (!r || !o) return;
		let { toggle: e, react: t, unreact: n } = r;
		return e ? (t, n) => e(n, {
			targetId: t,
			userId: o
		}) : (e, i) => {
			mt(r, e).some((e) => e.emoji === i && e.userId === o) && n ? n(i, { targetId: e }) : t(i, { targetId: e });
		};
	}, [r, o]), pe = L((e) => {
		if (!i) return;
		let t = e.id ?? "";
		t && (i.pinnedIds.has(t) ? i.unpin(t) : i.pin({
			messageId: t,
			text: e.content,
			author: e.displayName ?? "Unknown"
		}));
	}, [i]), Z = /* @__PURE__ */ W(re, {
		messages: N,
		onSend: oe,
		disabled: g,
		typingUsers: ae,
		tone: v,
		fill: y,
		showHeader: b,
		composer: w,
		emojis: T,
		...ue,
		...ce ? { onTyping: F } : {},
		...n ? {
			onSendFiles: (e) => {
				for (let t of e) n.upload(t);
			},
			transfers: n.transfers,
			onCancelTransfer: n.cancelTransfer
		} : {},
		currentActor: a,
		currentUserId: o,
		reactionsFor: de,
		onToggleReaction: fe,
		...i ? {
			pinnedMessageIds: i.pinnedIds,
			onTogglePin: pe
		} : {},
		onReply: E,
		onJumpToMessage: D,
		highlightedMessageId: O,
		documentEditors: k,
		callParticipants: A,
		onJoinCall: j,
		onOpenDocument: M,
		attachmentSrc: d,
		onOpenAttachment: f,
		acceptFiles: p,
		maxFileSize: m,
		onFileError: h
	});
	return /* @__PURE__ */ W(U, { children: ge(Z, ie) });
}
//#endregion
//#region src/integrations/realtime-modules/WrappedPresencePanel.tsx
var Ot = {
	typing: 4,
	online: 3,
	away: 2,
	busy: 1,
	offline: 0
};
function kt(e) {
	return Ot[e] ?? 2.5;
}
function At(e, t) {
	let n = /* @__PURE__ */ new Map();
	for (let t of e) {
		let e = typeof t.metadata?.userId == "string" ? t.metadata.userId : void 0, r = e ? `u:${e}` : `c:${t.clientId}`, i = n.get(r);
		i ? i.push(t) : n.set(r, [t]);
	}
	let r = [];
	for (let e of n.values()) {
		let n = [...e].sort((e, t) => e.lastHeartbeat - t.lastHeartbeat), i = {};
		for (let e of n) for (let [t, n] of Object.entries(e.metadata ?? {})) n != null && n !== "" && (i[t] = n);
		i.isTyping = e.some((e) => e.metadata?.isTyping === !0);
		let a = e.find((e) => e.clientId === t) ?? e.reduce((e, t) => {
			let n = kt(t.status) - kt(e.status);
			return n === 0 ? t.lastHeartbeat > e.lastHeartbeat ? t : e : n > 0 ? t : e;
		});
		r.push({
			clientId: a.clientId,
			status: a.status,
			metadata: i
		});
	}
	return r;
}
function jt({ presence: e, currentClientId: t, perConnection: n = !1, wrapWithNetworkShim: r }) {
	let i = B(() => n ? e.roster.map((e) => ({
		clientId: e.clientId,
		status: e.status,
		metadata: e.metadata
	})) : At(e.roster, t), [
		e.roster,
		t,
		n
	]);
	return /* @__PURE__ */ W(U, { children: ge(/* @__PURE__ */ W(E, {
		users: i,
		currentClientId: t
	}), r) });
}
//#endregion
//#region src/integrations/realtime-modules/WrappedActivityPanel.tsx
function Mt({ activity: e, visibleCount: t, rotateMs: n, staggerMs: r, kindColors: i, className: a }) {
	let o = B(() => bt(e.events), [e.events]);
	return /* @__PURE__ */ W(S, {
		items: o,
		visibleCount: t,
		rotateMs: n,
		staggerMs: r,
		kindColors: i,
		className: a
	});
}
//#endregion
//#region src/integrations/realtime-modules/WrappedReactionsOverlay.tsx
function Nt({ reactions: e, ttlMs: t = 2500 }) {
	let [n, r] = H([]), i = e.reactions, a = V(/* @__PURE__ */ new Map());
	return z(() => {
		if (i.length === 0) return;
		let e = i[i.length - 1], n = ft(e, i.length - 1), o = a.current;
		o.has(n.id) || (r((e) => e.some((e) => e.id === n.id) ? e : [...e, n]), o.set(n.id, setTimeout(() => {
			o.delete(n.id), r((e) => e.filter((e) => e.id !== n.id));
		}, t)));
	}, [i, t]), z(() => {
		let e = a.current;
		return () => {
			e.forEach((e) => clearTimeout(e)), e.clear();
		};
	}, []), /* @__PURE__ */ W(ee, { reactions: n });
}
//#endregion
//#region src/integrations/realtime-modules/WrappedFileUploadDrop.tsx
function Pt({ fileUpload: e, accept: t, maxSize: n, multiple: r, disabled: i, label: a, className: o, uploadMetadata: s, onError: c }) {
	let l = St(e.uploads);
	function u(t) {
		for (let n of t) e.upload(n, s ? { metadata: s } : void 0).catch((e) => {
			let t = e instanceof Error ? e.message : "Upload failed";
			c?.(t);
		});
	}
	return /* @__PURE__ */ G("div", { children: [/* @__PURE__ */ W(x, {
		accept: t,
		maxSize: n,
		multiple: r,
		disabled: i,
		label: a,
		className: o,
		onFiles: u,
		onError: c
	}), l.length > 0 && /* @__PURE__ */ W(Ft, {
		summaries: l,
		onDismiss: () => e.removeCompleted()
	})] });
}
function Ft({ summaries: e, onDismiss: t }) {
	return /* @__PURE__ */ W("ul", {
		className: "mt-2 p-0 list-none text-[13px]",
		children: e.map((e) => /* @__PURE__ */ G("li", {
			className: "flex items-center gap-2 py-1 border-b border-border",
			children: [
				/* @__PURE__ */ W("span", {
					className: "flex-1 overflow-hidden text-ellipsis whitespace-nowrap",
					children: e.filename
				}),
				/* @__PURE__ */ W("span", {
					className: `text-xs font-semibold ${It(e.status)}`,
					children: e.status === "uploading" ? `${e.progress}%` : e.status
				}),
				(e.status === "completed" || e.status === "clean") && e.downloadUrl && /* @__PURE__ */ W("a", {
					href: e.downloadUrl,
					target: "_blank",
					rel: "noreferrer",
					className: "text-xs text-info",
					children: "Download"
				}),
				(e.status === "failed" || e.status === "infected") && /* @__PURE__ */ W("button", {
					type: "button",
					onClick: t,
					className: "text-xs text-danger bg-transparent border-0 cursor-pointer p-0",
					children: "Dismiss"
				})
			]
		}, e.id))
	});
}
function It(e) {
	switch (e) {
		case "completed":
		case "clean": return "text-state-completed";
		case "failed":
		case "infected": return "text-state-failed";
		case "scanning": return "text-state-awaiting";
		case "uploading": return "text-state-running";
		default: return "text-text-tertiary";
	}
}
//#endregion
//#region src/integrations/realtime-modules/WrappedHangoutLayout.tsx
function Lt({ hangout: e, localClientId: t, videoElements: n, mode: r, spotlightContent: i, activeSpeakerId: a, speakerHysteresisMs: o, onParticipantClick: s, className: c }) {
	let l = wt(e.participants, t), u = t == null ? null : l.find((e) => e.id === t) ?? null, d = t == null ? l : l.filter((e) => e.id !== t);
	function f(e) {
		return n ? e.map((e) => ({
			...e,
			videoElement: n[e.id] ?? e.videoElement
		})) : e;
	}
	return /* @__PURE__ */ W(O, {
		participants: f(d),
		localParticipant: u ? f([u])[0] : null,
		mode: r,
		spotlightContent: i,
		activeSpeakerId: a,
		speakerHysteresisMs: o,
		onParticipantClick: s,
		className: c
	});
}
//#endregion
//#region src/integrations/realtime-modules/WrappedNotificationCenter.tsx
function Rt({ notifications: e, onItemClick: t, ...n }) {
	let r = Et(e.notifications);
	return /* @__PURE__ */ W(_, {
		items: r,
		onItemClick: (n) => {
			t ? t(n, e.notifications.find((e) => e.id === n.id)) : e.markAsRead(n.id);
		},
		onMarkAllRead: e.markAllRead,
		onClearAll: e.clearAll,
		...n
	});
}
//#endregion
//#region src/integrations/realtime-modules/WrappedNotificationBell.tsx
function zt({ notifications: e, onItemClick: t, unreadCount: n, ...r }) {
	let i = Et(e.notifications);
	return /* @__PURE__ */ W(y, {
		items: i,
		unreadCount: n ?? e.unreadCount,
		onItemClick: (n) => {
			t ? t(n, e.notifications.find((e) => e.id === n.id)) : e.markAsRead(n.id);
		},
		onMarkAllRead: e.markAllRead,
		onClearAll: e.clearAll,
		...r
	});
}
//#endregion
//#region src/integrations/realtime-modules/WrappedConnectionPill.tsx
function Bt({ socket: e, ...t }) {
	return /* @__PURE__ */ W(v, {
		state: e.connectionState,
		...t
	});
}
//#endregion
//#region src/integrations/realtime-modules/CapabilityBoundary.tsx
function Vt({ capability: e, loading: t, fallback: n, children: r }) {
	return e.isLoading ? /* @__PURE__ */ W(U, { children: t ?? null }) : e.enabled ? /* @__PURE__ */ W(U, { children: r }) : /* @__PURE__ */ W(U, { children: n ?? null });
}
//#endregion
//#region src/integrations/realtime-modules/WrappedMediaEffectsTray.tsx
function Ht({ controller: e, ...t }) {
	return /* @__PURE__ */ W(ae, {
		filters: e.filters.map(({ id: e, label: t, cssFilter: n }) => ({
			id: e,
			label: t,
			...n ? { cssFilter: n } : {}
		})),
		activeFilterId: e.filterId,
		onSelectFilter: (t) => e.setFilter(t),
		backgrounds: e.backgrounds.map(({ id: e, label: t, url: n }) => ({
			id: e,
			label: t,
			url: n
		})),
		backgroundMode: e.backgroundMode,
		activeBackgroundUrl: e.backgroundImageUrl,
		onSelectBackground: (t, n) => {
			e.setBackgroundImageUrl(n), e.setBackgroundMode(t);
		},
		faceSprites: e.faceSprites.map(({ id: e, label: t, icon: n }) => ({
			id: e,
			label: t,
			...n ? { icon: n } : {}
		})),
		activeFaceSpriteId: e.faceSpriteId,
		onSelectFaceSprite: (t) => e.setFaceSpriteId(t),
		...t
	});
}
//#endregion
//#region src/integrations/realtime-modules/WrappedMediaEffectsPreviewPanel.tsx
function Ut({ open: e, controller: t, onClose: n, onApplied: r, ...i }) {
	let a = V(t);
	a.current = t;
	let o = V(!1);
	z(() => {
		if (e) return a.current.beginPreview(), o.current = !0, () => {
			o.current && (o.current = !1, a.current.cancelPreview());
		};
	}, [e]);
	let s = B(() => {
		let e = t.previewTrack;
		if (!e || typeof MediaStream > "u") return null;
		try {
			return new MediaStream([e]);
		} catch {
			return null;
		}
	}, [t.previewTrack]);
	if (!e) return null;
	let c = t.draft, l = c ?? {
		filterId: t.filterId,
		backgroundMode: t.backgroundMode,
		backgroundImageUrl: t.backgroundImageUrl,
		faceSpriteId: t.faceSpriteId
	}, u = () => {
		o.current = !1;
	};
	return /* @__PURE__ */ W(A, {
		...i,
		previewActive: c !== null,
		previewStream: s,
		isDirty: t.isDirty,
		onApply: () => {
			t.applyPreview(), u(), r?.(), n();
		},
		onCancel: () => {
			t.cancelPreview(), u(), n();
		},
		filters: t.filters.map(({ id: e, label: t, cssFilter: n }) => ({
			id: e,
			label: t,
			...n ? { cssFilter: n } : {}
		})),
		activeFilterId: l.filterId,
		onSelectFilter: (e) => t.setFilter(e),
		backgrounds: t.backgrounds.map(({ id: e, label: t, url: n }) => ({
			id: e,
			label: t,
			url: n
		})),
		backgroundMode: l.backgroundMode,
		activeBackgroundUrl: l.backgroundImageUrl,
		onSelectBackground: (e, n) => {
			t.setBackgroundImageUrl(n), t.setBackgroundMode(e);
		},
		faceSprites: t.faceSprites.map(({ id: e, label: t, icon: n }) => ({
			id: e,
			label: t,
			...n ? { icon: n } : {}
		})),
		activeFaceSpriteId: l.faceSpriteId,
		onSelectFaceSprite: (e) => t.setFaceSpriteId(e)
	});
}
function Wt(e) {
	let t = e.draft;
	if (!t) return 0;
	let n = 0;
	return t.filterId !== e.filterId && n++, (t.backgroundMode !== e.backgroundMode || t.backgroundMode === "image" && t.backgroundImageUrl !== e.backgroundImageUrl) && n++, t.faceSpriteId !== e.faceSpriteId && n++, n;
}
//#endregion
//#region src/integrations/realtime-modules/WrappedCanvasDocument.tsx
function Gt({ canvas: e, schema: t, legacyModel: n, beforeConvert: r, ...i }) {
	let [a, o] = H([]), s = L(async () => {
		if (!t) return "The editor is still loading — try again in a moment.";
		try {
			await r?.();
		} catch (e) {
			return e instanceof Error ? e.message : "Conversion was refused.";
		}
		let i = e.materialize(t, n ?? {
			frontMatter: {},
			content: []
		});
		return o(i.unsupported ?? []), i.ok ? null : i.reason ?? "Conversion was refused.";
	}, [
		e,
		t,
		n,
		r
	]);
	return /* @__PURE__ */ W(oe, {
		...i,
		isCanvas: e.isCanvas,
		body: e.body,
		onConvert: s,
		unsupported: a
	});
}
//#endregion
//#region src/integrations/realtime-modules/WrappedAudioVideoSettingsForm.tsx
function Kt({ devices: e, settings: t, cameraOn: n, ...r }) {
	return /* @__PURE__ */ W(j, {
		...r,
		value: t.settings,
		onChange: (e) => t.update(e),
		devices: {
			microphones: e.microphones,
			speakers: e.speakers,
			cameras: e.cameras
		},
		permission: e.permission,
		micLevel: t.micLevel,
		previewStream: t.previewStream,
		cameraOn: n,
		speakerSelectionSupported: e.speakerSelectionSupported,
		onTestMic: () => t.testMic(),
		onTestSound: () => t.testSound(),
		testMicState: t.testMicState
	});
}
//#endregion
export { ye as $, pt as A, Ge as B, wt as C, ct as D, Et as E, Xe as F, Fe as G, Ve as H, Je as I, ke as J, Me as K, qe as L, rt as M, nt as N, lt as O, Ze as P, we as Q, Ke as R, Ct as S, Tt as T, Le as U, We as V, He as W, De as X, Ee as Y, Q as Z, bt as _, Ht as a, me as at, xt as b, zt as c, ue as ct, Pt as d, xe as et, Nt as f, yt as g, Dt as h, Wt as i, he as it, it as j, ft as k, Rt as l, q as lt, jt as m, Gt as n, _e as nt, Vt as o, pe as ot, Mt as p, Te as q, Ut as r, ge as rt, Bt as s, fe as st, Kt as t, Ce as tt, Lt as u, ot as v, mt as w, St as x, st as y, Ue as z };
