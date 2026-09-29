import { t as e } from "./cn-DhjIN-s0.js";
import { _ as t } from "./overlayStack-DHAs60_m.js";
import { t as n } from "./IconButton-DDeXW3mZ.js";
import { n as r, t as i } from "./Stack-CkiMw5K0.js";
import { t as a } from "./Badge-t9rXTGOV.js";
import { t as o } from "./Modal-2CidNxzH.js";
import { t as s } from "./ConfirmDialog-B-f4kYP-.js";
import { t as c } from "./EmptyState-DtHxzyCi.js";
import { t as l } from "./ErrorState-Czna8rFK.js";
import { n as u } from "./StatusPill-DFLlm8C9.js";
import { t as d } from "./SkeletonCard-CGe8XFPB.js";
import { n as f } from "./Slider-izEq1bGO.js";
import { t as p } from "./Avatar-Chz9yWlo.js";
import { t as m } from "./InlineAlert-CRnIKeAF.js";
import { n as h, t as g } from "./NotificationCenter-CdO8wbwB.js";
import { t as _ } from "./PresenceAvatars-D8NI7a-T.js";
import { t as v } from "./FileUploadDrop-Drndcvb1.js";
import { t as y } from "./ActivityFeed-BC0RoWoK.js";
import { n as b, r as x, t as S } from "./ReactionsOverlay-Ob1ecsgg.js";
import { d as C, n as w, t as T, u as ee } from "./ConversationSurface-CdZEbreA.js";
import { C as E, b as D, g as te, i as O, m as k, t as A, v as j, y as M } from "./AudioVideoSettingsForm-DFdlJ2vD.js";
import { c as ne, o as re, s as N } from "./useDocumentImageUpload-iJOtHw_h.js";
import { Component as ie, createContext as ae, createElement as oe, useCallback as P, useContext as F, useEffect as I, useMemo as L, useRef as R, useState as z } from "react";
import { Fragment as B, jsx as V, jsxs as H } from "react/jsx-runtime";
import * as se from "yjs";
//#region src/integrations/realtime/HangoutRoomRow.tsx
function ce(e) {
	function t(t) {
		return U(e, t);
	}
	return t;
}
function U(e, { slug: t, name: n, participantId: r, occupancy: i, subscribeRoomsIndex: o, onClick: s, onContextMenu: c, onOpenConversation: l, kebab: u, className: d, "data-testid": f = "room-row" }) {
	let p = e.useRoomOccupancy(o ? t : null, { subscribeRoomsIndex: o }), m = o ? p.occupancy ?? null : i ?? null, h = m?.count ?? 0, g = m?.members ?? [], v = L(() => r ? g.some((e) => e.participantId === r) : !1, [g, r]), y = v, x = L(() => g.slice(0, 3).map((e) => ({
		id: e.participantId,
		name: e.displayName || e.userId,
		online: !0
	})), [g]), S = null;
	h > 1 ? S = /* @__PURE__ */ H(B, { children: [/* @__PURE__ */ V(_, {
		users: x,
		maxVisible: 3,
		size: 18
	}), /* @__PURE__ */ V(a, {
		variant: "count",
		value: h,
		color: "muted"
	})] }) : h === 1 && v ? S = /* @__PURE__ */ V(a, {
		variant: "pulse",
		color: "accent",
		"aria-label": "Just you in this room",
		"data-testid": `${f}-self-pulse`
	}) : h === 1 && (S = /* @__PURE__ */ H(B, { children: [/* @__PURE__ */ V(_, {
		users: x,
		maxVisible: 1,
		size: 18
	}), /* @__PURE__ */ V(a, {
		variant: "count",
		value: 1,
		color: "muted"
	})] }));
	let C = l ? /* @__PURE__ */ V("button", {
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
	return /* @__PURE__ */ V(b, {
		"data-testid": f,
		icon: /* @__PURE__ */ V("span", {
			"aria-hidden": "true",
			className: "font-semibold text-text-tertiary",
			children: "#"
		}),
		label: n,
		trailing: S,
		active: y,
		onClick: s,
		onContextMenu: c,
		kebab: u ?? C,
		"aria-label": `${n} room`,
		className: d,
		dataAttrs: {
			"data-room-slug": t,
			"data-room-name": n,
			"data-room-active-count": h,
			"data-joined": y ? "true" : "false"
		}
	});
}
//#endregion
//#region src/integrations/realtime-modules/NewHangoutRoomDialog.tsx
var W = 3, G = 48;
function K(e) {
	return e.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 48);
}
function q(e) {
	let t = e.trim();
	return t.length === 0 ? "Name is required." : t.length < W ? `Name must be at least ${W} characters.` : t.length > G ? `Name must be at most ${G} characters.` : null;
}
function J({ open: e, onClose: n, onCreate: r, onCreated: i, defaultVisibility: a }) {
	let [s, c] = z(""), [l, u] = z(""), [d, p] = z(!1), [m, h] = z(!1), [g, _] = z(!1), [v, y] = z(null);
	I(() => {
		e && (c(""), u(""), p(!1), h(!1), _(!1), y(null));
	}, [e]);
	let b = L(() => q(s), [s]), x = L(() => K(s), [s]), S = !b && !g;
	async function C(e) {
		if (e.preventDefault(), S) {
			_(!0), y(null);
			try {
				let e = await r({
					name: s.trim(),
					description: l.trim() || void 0,
					visibility: a,
					settings: {
						audioOnly: d,
						recordingEnabled: m
					}
				});
				i?.(e), n();
			} catch (e) {
				y(e instanceof Error ? e.message : "Failed to create room."), _(!1);
			}
		}
	}
	return /* @__PURE__ */ V(o, {
		open: e,
		onClose: g ? () => {} : n,
		title: "New room",
		maxWidth: 440,
		rawChildren: !0,
		backdropTestId: "new-hangout-room-dialog",
		footer: null,
		children: /* @__PURE__ */ H("form", {
			onSubmit: C,
			className: "flex flex-col gap-4",
			children: [
				/* @__PURE__ */ H("label", {
					className: "flex flex-col gap-1",
					children: [
						/* @__PURE__ */ V("span", {
							className: "text-[12px] font-semibold text-text-primary",
							children: "Name"
						}),
						/* @__PURE__ */ V("input", {
							"data-autofocus": !0,
							"data-testid": "new-hangout-room-name",
							type: "text",
							value: s,
							onChange: (e) => c(e.target.value),
							placeholder: "Team standup",
							maxLength: 58,
							disabled: g,
							className: "w-full px-3 py-2 text-sm border border-border-emphasis rounded-md focus:outline-none focus:ring-2 focus:ring-info"
						}),
						/* @__PURE__ */ H("div", {
							className: "flex items-center justify-between text-[11px] text-text-tertiary",
							children: [/* @__PURE__ */ V("span", {
								"data-testid": "new-hangout-room-slug-preview",
								children: x ? `#${x}` : "Slug preview appears here"
							}), /* @__PURE__ */ V("span", { children: `${s.trim().length}/${G}` })]
						}),
						b && s.length > 0 && /* @__PURE__ */ V("span", {
							"data-testid": "new-hangout-room-name-error",
							className: "text-[11px] text-danger-fg",
							children: b
						})
					]
				}),
				/* @__PURE__ */ H("label", {
					className: "flex flex-col gap-1",
					children: [/* @__PURE__ */ H("span", {
						className: "text-[12px] font-semibold text-text-primary",
						children: ["Description ", /* @__PURE__ */ V("span", {
							className: "font-normal text-text-tertiary",
							children: "(optional)"
						})]
					}), /* @__PURE__ */ V("textarea", {
						"data-testid": "new-hangout-room-description",
						value: l,
						onChange: (e) => u(e.target.value),
						placeholder: "What's this room for?",
						rows: 2,
						disabled: g,
						className: "w-full px-3 py-2 text-sm border border-border-emphasis rounded-md focus:outline-none focus:ring-2 focus:ring-info resize-none"
					})]
				}),
				/* @__PURE__ */ H("div", {
					className: "flex flex-col gap-3",
					children: [/* @__PURE__ */ H("label", {
						className: "flex items-center justify-between gap-3",
						children: [/* @__PURE__ */ H("span", {
							className: "flex flex-col",
							children: [/* @__PURE__ */ V("span", {
								className: "text-[13px] font-semibold text-text-primary",
								children: "Audio only"
							}), /* @__PURE__ */ V("span", {
								className: "text-[11px] text-text-tertiary",
								children: "Skip video tracks — voice-only room."
							})]
						}), /* @__PURE__ */ V(f, {
							checked: d,
							onChange: p,
							disabled: g,
							"aria-label": "Audio only",
							"data-testid": "new-hangout-room-audio-only"
						})]
					}), /* @__PURE__ */ H("label", {
						className: "flex items-center justify-between gap-3",
						children: [/* @__PURE__ */ H("span", {
							className: "flex flex-col",
							children: [/* @__PURE__ */ V("span", {
								className: "text-[13px] font-semibold text-text-primary",
								children: "Recording enabled"
							}), /* @__PURE__ */ V("span", {
								className: "text-[11px] text-text-tertiary",
								children: "Allow server-side recording of sessions."
							})]
						}), /* @__PURE__ */ V(f, {
							checked: m,
							onChange: h,
							disabled: g,
							"aria-label": "Recording enabled",
							"data-testid": "new-hangout-room-recording"
						})]
					})]
				}),
				v && /* @__PURE__ */ V("div", {
					"data-testid": "new-hangout-room-error",
					role: "alert",
					className: "text-[12px] text-danger-fg bg-danger-bg border border-danger-border rounded-md px-3 py-2",
					children: v
				}),
				/* @__PURE__ */ H("div", {
					className: "flex justify-end gap-2 pt-1",
					children: [/* @__PURE__ */ V(t, {
						type: "button",
						variant: "ghost",
						onClick: n,
						disabled: g,
						children: "Cancel"
					}), /* @__PURE__ */ V(t, {
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
function Y(e) {
	function t(t) {
		return X(e, t);
	}
	return t;
}
function X(e, { rooms: r, occupancyFor: i, occupancyAdapter: a, participantId: o, onJoinRoom: s, onOpenConversation: l, onContextMenu: u, onBrowseAll: d, maxVisible: f = 10, title: p = "Rooms", storageKey: m, renderCreateDialog: h }) {
	let [g, _] = z(!1), v = () => _(!0), y = () => _(!1), S = L(() => {
		let e = /* @__PURE__ */ new Set(), t = [];
		for (let n of r.rooms) n.state === "active" && (e.has(n.slug) || (e.add(n.slug), t.push(n)));
		return t;
	}, [r.rooms]), C = L(() => S.slice(0, f), [S, f]), w = S.length - C.length;
	return /* @__PURE__ */ H(B, { children: [/* @__PURE__ */ H(x, {
		title: p,
		storageKey: m,
		actions: /* @__PURE__ */ V(n, {
			"aria-label": "New room",
			size: "sm",
			onClick: v,
			icon: /* @__PURE__ */ V("span", {
				"aria-hidden": "true",
				className: "text-[14px] leading-none font-bold",
				children: "+"
			}),
			"data-testid": "new-room-button"
		}),
		"data-testid": "rooms-section",
		children: [
			r.isLoading && /* @__PURE__ */ V("div", {
				className: "flex flex-col gap-1 px-1 py-1",
				"data-testid": "hangout-rooms-loading",
				children: [
					0,
					1,
					2
				].map((e) => /* @__PURE__ */ V("div", {
					"aria-hidden": "true",
					className: "h-7 rounded-md bg-surface-hover animate-pulse"
				}, e))
			}),
			!r.isLoading && r.error && /* @__PURE__ */ H("div", {
				role: "alert",
				"data-testid": "hangout-rooms-error",
				className: "mx-1 my-1 px-3 py-2 text-[12px] text-danger-fg bg-danger-bg border border-danger-border rounded-md flex items-center justify-between gap-2",
				children: [/* @__PURE__ */ V("span", {
					className: "truncate",
					children: "Couldn't load rooms."
				}), /* @__PURE__ */ V("button", {
					type: "button",
					onClick: () => void r.refetch(),
					className: "text-danger-fg underline hover:text-danger-fg cursor-pointer",
					children: "Retry"
				})]
			}),
			!r.isLoading && !r.error && S.length === 0 && /* @__PURE__ */ V(c, {
				testId: "hangout-rooms-empty",
				title: "No rooms yet",
				description: "Create one to start an ongoing hangout.",
				action: /* @__PURE__ */ V(t, {
					onClick: v,
					variant: "primary",
					size: "sm",
					children: "Create room"
				})
			}),
			!r.isLoading && !r.error && S.length > 0 && /* @__PURE__ */ H("div", {
				className: "flex flex-col gap-0.5",
				children: [C.map((t) => /* @__PURE__ */ V(e, {
					slug: t.slug,
					name: t.name,
					participantId: o,
					subscribeRoomsIndex: a,
					occupancy: a ? null : i?.(t.slug) ?? null,
					onClick: s ? () => s(t) : void 0,
					onOpenConversation: l ? () => l(t) : void 0,
					onContextMenu: u ? (e) => u(t, e) : void 0
				}, t.slug)), w > 0 && d && /* @__PURE__ */ V(b, {
					"data-testid": "hangout-rooms-browse-all",
					label: /* @__PURE__ */ H("span", {
						className: "text-[12px] text-neutral",
						children: [
							"Browse all (",
							S.length,
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
	}) : /* @__PURE__ */ V(J, {
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
var le = class extends ie {
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
		return t ? t(e, this.reset) : /* @__PURE__ */ V("div", {
			"data-testid": "network-error-boundary-fallback",
			children: /* @__PURE__ */ V(c, {
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
function ue({ connectionState: t, children: n, onRetry: r, reconnectingLabel: i, disconnectedTitle: a = "Disconnected", disconnectedDescription: o = "The connection to the server was lost. Check your network and try again.", retryLabel: s = "Try again", connectingPlaceholder: l, disconnectedFallback: u, className: f }) {
	return t === "connecting" ? /* @__PURE__ */ V("div", {
		"data-testid": "reconnecting-shim-connecting",
		className: f,
		children: l ?? /* @__PURE__ */ V(d, { height: 120 })
	}) : t === "disconnected" ? /* @__PURE__ */ V("div", {
		"data-testid": "reconnecting-shim-disconnected",
		className: f,
		children: u ?? /* @__PURE__ */ V(c, {
			icon: "📡",
			title: a,
			description: o,
			actionLabel: r ? s : void 0,
			onAction: r
		})
	}) : t === "reconnecting" ? /* @__PURE__ */ H("div", {
		"data-testid": "reconnecting-shim-reconnecting",
		className: e("relative", f),
		children: [/* @__PURE__ */ V("div", {
			className: "opacity-60 pointer-events-none",
			children: n
		}), /* @__PURE__ */ V(j, {
			show: !0,
			label: i
		})]
	}) : /* @__PURE__ */ V("div", {
		"data-testid": "reconnecting-shim-connected",
		className: f,
		children: n
	});
}
//#endregion
//#region src/integrations/realtime-modules/networkShim.tsx
function Z(e, t) {
	return t ? /* @__PURE__ */ V(le, {
		title: t.errorTitle,
		description: t.errorDescription,
		retryLabel: t.retryLabel,
		onRetry: t.onRetry,
		onError: t.onError,
		fallback: t.errorFallback,
		children: /* @__PURE__ */ V(ue, {
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
function de(e) {
	function t(t) {
		return fe(e, t);
	}
	return t;
}
function fe(e, { hangoutRooms: t, subscribeRoomsIndex: n, occupancyFor: r, participantId: i, onJoin: a, onContextMenu: o, onBrowseAll: s, maxVisible: c, title: l, storageKey: u, renderEmpty: d, renderCreateDialog: f, wrapWithNetworkShim: p }) {
	return t.rooms.filter((e) => e.state === "active").length === 0 && !t.isLoading && !t.error && d ? /* @__PURE__ */ V("div", {
		"data-testid": "wrapped-hangout-rooms-empty-slot",
		children: d
	}) : /* @__PURE__ */ V(B, { children: Z(/* @__PURE__ */ V(e, {
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
], pe = {
	chat: !0,
	presence: !0
}, me = ae(null);
function he(e) {
	function t(t) {
		return ge(e, t);
	}
	return t;
}
function ge(e, { capabilities: t = pe, channel: n, children: r }) {
	let i = L(() => Q.filter((e) => t[e] === !0), [t]), { enabled: a, isLoading: o } = e.useCapabilities(i, n), s = L(() => {
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
	return /* @__PURE__ */ V(me.Provider, {
		value: s,
		children: r
	});
}
function _e() {
	return F(me) ?? {
		can: Object.fromEntries(Q.map((e) => [e, !1])),
		declared: Object.fromEntries(Q.map((e) => [e, !1])),
		provisioned: Object.fromEntries(Q.map((e) => [e, !1])),
		isLoading: !1
	};
}
function ve({ need: e, children: t, fallback: n = null }) {
	let { can: r } = _e(), i = (Array.isArray(e) ? e : [e]).every((e) => r[e]);
	return /* @__PURE__ */ V(B, { children: i ? t : n });
}
//#endregion
//#region src/integrations/realtime/WrappedConversationSurface.tsx
var ye = {
	files: "conversation.files",
	documents: "conversation.documents",
	pins: "conversation.pins",
	mentions: "conversation.mentions",
	calls: "conversation.calls"
};
function be(e = T, t = {}) {
	return e.filter((e) => e !== "chat" && e !== "members").map((e) => t[e] ?? ye[e]);
}
function xe(e) {
	return (t) => Se(e, t);
}
function Se(e, t) {
	let { channel: n = null, hasDocuments: r = !0, from: i = T } = t;
	return i.filter((t) => t === "mentions" ? !1 : t === "documents" ? r : t !== "calls" || !!e.lobbyForChannel(n));
}
function Ce({ declare: e = T, capabilities: t, capabilitiesError: n, capabilityNames: r = {}, children: i, ...a }) {
	let o = L(() => {
		let i = r;
		return e.filter((e) => e === "chat" || e === "members" || !t || n ? !0 : t[i[e] ?? ye[e]] === !0);
	}, [
		e,
		t,
		n,
		r
	]);
	return /* @__PURE__ */ V(w, {
		...a,
		features: o,
		children: i
	});
}
//#endregion
//#region src/integrations/realtime/WrappedStreamStage.tsx
function we(e, { channelArn: t, excludeParticipantId: n, getAuthToken: r, baseUrl: i, onStatusChange: a, ...o }) {
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
	return I(() => {
		a?.({
			mode: "realtime",
			live: c,
			error: s.error
		});
	}, [
		c,
		s.error,
		a
	]), /* @__PURE__ */ V(O, {
		...o,
		live: c,
		stream: s.stream,
		...l === null ? {} : { viewerCount: l }
	});
}
function Te(e, { channelArn: t, playbackToken: n, baseUrl: r, onStatusChange: i, ...a }) {
	let o = e.useLVSLiveHls({
		channelArn: t,
		playbackToken: n,
		baseUrl: r
	}), { viewerCount: s } = e.useLVSViewerCount({
		channelArn: t,
		baseUrl: r,
		playbackToken: n
	});
	return I(() => {
		i?.({
			mode: "near-realtime",
			live: o.ready,
			error: null
		});
	}, [o.ready, i]), /* @__PURE__ */ V(O, {
		...a,
		live: o.ready,
		playlistUrl: o.playlistUrl,
		...s === null ? {} : { viewerCount: s }
	});
}
function Ee(e) {
	function t(t) {
		return we(e, t);
	}
	function n(t) {
		return Te(e, t);
	}
	function r({ mode: e = "near-realtime", ...r }) {
		return V(e === "realtime" ? t : n, { ...r });
	}
	return r;
}
//#endregion
//#region src/integrations/realtime/WrappedLVSHangoutLayout.tsx
function De({ stream: e, displayName: t }) {
	return e ? /* @__PURE__ */ V("video", {
		autoPlay: !0,
		playsInline: !0,
		muted: !0,
		ref: (t) => {
			t && t.srcObject !== e && (t.srcObject = e);
		},
		className: "w-full h-full object-cover scale-x-[-1]"
	}) : /* @__PURE__ */ V("div", {
		className: "w-full h-full grid place-items-center bg-surface-emphasis",
		"data-testid": "local-camera-avatar",
		children: /* @__PURE__ */ V(p, {
			name: t,
			size: 64
		})
	});
}
function Oe(e, t) {
	let n = e.isLocal, r = n ? t ?? e.displayName ?? "You" : e.displayName || e.participantId.slice(0, 8), i = e.streams[0], a = e.screenStream, o = n ? /* @__PURE__ */ V(De, {
		stream: i,
		displayName: r
	}) : /* @__PURE__ */ V(M, {
		stream: i,
		displayName: r,
		cameraOn: e.hasVideo
	}), s = a ? /* @__PURE__ */ V(D, {
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
function ke(e) {
	function t(t) {
		return Ae(e, t);
	}
	return t;
}
function Ae(e, { stageToken: t, participantId: n, userId: r, localClientId: i, getStageToken: a, overlay: o, spotlightContent: s, onParticipantClick: c, mode: l = "auto", activeSpeakerStrategy: u = "audio-level", localTileLabel: d, showLocalAsTile: f = !0, className: p, "data-testid": m }) {
	let h = e.useLVSHangout({
		stageToken: t,
		participantId: n,
		userId: r ?? n.slice(0, 8),
		getAuthToken: a
	}), g = L(() => h.participants.filter((e) => f || !e.isLocal).map((e) => Oe(e, d)), [
		h.participants,
		f,
		d
	]), _ = h.participants.filter((e) => !e.isLocal).length, v = {
		connectionState: h.connectionState,
		error: h.error,
		participantCount: h.participants.length,
		remoteCount: _
	};
	return /* @__PURE__ */ H("div", {
		"data-testid": m,
		className: `relative flex-1 min-h-0 ${p ?? ""}`,
		children: [/* @__PURE__ */ V(E, {
			participants: g,
			localParticipant: null,
			mode: l,
			spotlightContent: s,
			onParticipantClick: c,
			className: "h-full"
		}), o && /* @__PURE__ */ V("div", {
			className: "absolute inset-0 pointer-events-none z-10",
			"data-testid": "wrapped-overlay-slot",
			children: /* @__PURE__ */ V("div", {
				className: "pointer-events-auto",
				children: o(v)
			})
		})]
	});
}
//#endregion
//#region src/integrations/realtime/createRealtimeIntegrations.tsx
function je(e) {
	let t = ce(e), n = Y(t);
	return {
		HangoutRoomRow: t,
		HangoutRoomsSection: n,
		WrappedHangoutRoomsList: de(n),
		RealtimeCapabilityProvider: he(e),
		conversationFeaturesFor: xe(e),
		WrappedStreamStage: Ee(e),
		WrappedLVSHangoutLayout: ke(e)
	};
}
var Me = ae(null), Ne = /* @__PURE__ */ new WeakMap();
function Pe(e) {
	let t = Ne.get(e);
	return t || (t = je(e), Ne.set(e, t)), t;
}
function Fe({ modules: e, children: t }) {
	let n = L(() => Pe(e), [e]);
	return /* @__PURE__ */ V(Me.Provider, {
		value: n,
		children: t
	});
}
function Ie() {
	let e = F(Me);
	if (!e) throw Error("useRealtimeIntegrations() needs a <RealtimeIntegrationsProvider modules={…}> above it.");
	return e;
}
//#endregion
//#region src/integrations/realtime/canvasRecovery.ts
function Le(e, t, n, r = "canvasRecovery") {
	return `${r}:${JSON.stringify([
		e,
		t,
		n
	])}`;
}
function Re(e) {
	let t = "";
	for (let n = 0; n < e.length; n += 8192) t += String.fromCharCode(...e.subarray(n, n + 8192));
	return {
		version: 1,
		savedAt: (/* @__PURE__ */ new Date()).toISOString(),
		snapshot: btoa(t)
	};
}
function ze(e) {
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
function Be(e, t, n, r) {
	let i = Le(e, t, n, r), [a, o] = z(() => {
		try {
			let e = JSON.parse(sessionStorage.getItem(i) ?? "null");
			return ze(e?.recovered ?? e?.pending) ? e.recovered ?? e.pending : null;
		} catch {
			return null;
		}
	}), s = R(a), c = R(null), [l, u] = z(!1), d = P(() => {
		try {
			!s.current && !c.current ? sessionStorage.removeItem(i) : sessionStorage.setItem(i, JSON.stringify({
				recovered: s.current,
				pending: c.current
			})), u(!1);
		} catch {
			u(!0);
		}
	}, [i]), f = P((e) => {
		s.current = Re(e), o(s.current), d();
	}, [d]), p = P(() => {
		s.current = null, o(null), d();
	}, [d]), m = P((e, t) => {
		if (!e || !t) return () => {};
		let n = () => {
			t.pendingUpdateCount && (c.current = Re(se.encodeStateAsUpdate(e)), d());
		};
		return e.on("update", n), n(), () => e.off("update", n);
	}, [d]), h = P(() => {
		c.current = null, d();
	}, [d]);
	return I(() => {
		d();
	}, [d]), {
		recovered: a,
		storageError: l,
		retain: f,
		clear: p,
		track: m,
		acknowledged: h,
		download: P(() => {
			let e = ze(s.current ?? c.current);
			if (!e) return;
			let t = URL.createObjectURL(new Blob([Uint8Array.from(e)], { type: "application/octet-stream" })), r = document.createElement("a");
			r.href = t, r.download = `document-${n}-recovery.yjs`, r.click(), window.setTimeout(() => URL.revokeObjectURL(t), 1e3);
		}, [n]),
		restore: P((e) => {
			let t = ze(s.current);
			t && (se.applyUpdate(e, t, "explicit-recovery"), p());
		}, [p])
	};
}
//#endregion
//#region src/integrations/realtime/canvasDocumentState.ts
function Ve(e, t, n, r) {
	if (e !== "idle") return {
		status: !n && t > 0 ? "offline" : e,
		...e === "error" || !n ? { onRetry: r } : {}
	};
}
function He(e, t, n = Date.now()) {
	return t && e.canEdit && e.expiresAt > n;
}
//#endregion
//#region src/integrations/realtime/CanvasDocumentPane.tsx
var Ue = {
	showRuler: !0,
	showStatusBar: !1,
	toolbarStyle: "card",
	pageMargin: "narrow",
	fitHeight: "parent",
	paginate: !0
};
function We(e) {
	return function(n) {
		let { documentId: a, tenant: c, userId: d, userName: f, userColor: p = "teal", canEdit: h, editing: g = !0, extensions: _, loadImage: y, isProtectedImage: b, uploadImage: x, onPendingChange: S, notices: C, children: w, viewProps: T, onEditorReady: ee, loadingLabel: E = "Loading collaborative document…", layout: D, keyPrefix: te } = n, O = e.useGateway(), k = Be(c, d, a, te), A = e.useYjsDoc({
			documentId: a,
			ws: O,
			onMessage: O.onMessage,
			onUnpersistedChanges: k.retain
		}), j = e.useCanvasDocument({ ydoc: A.ydoc }), M = O.connectionState === "connected", N = h && g && A.synced && M, ie = R(N);
		ie.current = N;
		let [ae, P] = z(!1), [F, se] = z(null), [ce, U] = z(!1), [W, G] = z(!1), [K, q] = z(null), J = R(null), Y = L(() => ({
			name: f,
			color: p
		}), [f, p]);
		I(() => k.track(A.ydoc, A.provider), [
			A.ydoc,
			A.provider,
			k.track
		]), I(() => {
			A.persistenceState === "saved" && A.pendingUpdateCount === 0 && k.acknowledged();
		}, [
			A.persistenceState,
			A.pendingUpdateCount,
			k.acknowledged
		]), I(() => {
			S?.(A.pendingUpdateCount);
		}, [A.pendingUpdateCount, S]), I(() => {
			A.provider?.awareness.setLocalStateField("user", {
				...Y,
				id: d
			});
		}, [
			A.provider,
			Y,
			d
		]), I(() => {
			if (A.pendingUpdateCount === 0) return;
			let e = (e) => {
				e.preventDefault(), e.returnValue = "";
			};
			return window.addEventListener("beforeunload", e), () => window.removeEventListener("beforeunload", e);
		}, [A.pendingUpdateCount]), I(() => O.onMessage((e) => {
			e.channel === `doc:${a}` && (e.type === "crdt:error" && se(typeof e.error == "string" ? e.error : "The document operation was refused."), e.type === "crdt:snapshot" && se(null));
		}), [O.onMessage, a]);
		let X = async (e) => {
			let t = J.current;
			if (!(!x || !t || t.isDestroyed || !ie.current || W)) {
				G(!0), q(null);
				try {
					let n = await x(e);
					if (J.current !== t || t.isDestroyed || !ie.current) throw Error("The document is no longer editable. The image was not inserted.");
					t.chain().focus().setImage({
						src: n,
						alt: e.name
					}).run(), U(!1);
				} catch (e) {
					q(e instanceof Error ? e.message : "The image could not be uploaded.");
				} finally {
					G(!1);
				}
			}
		}, le = Ve(A.persistenceState, A.pendingUpdateCount, M, A.retryPersistence), ue = {
			editable: N,
			online: M,
			synced: A.synced,
			pendingUpdateCount: A.pendingUpdateCount,
			persistenceState: A.persistenceState,
			docVersion: A.docVersion,
			ydoc: A.ydoc,
			exportMarkdown: j.exportMarkdown
		}, Z = /* @__PURE__ */ H(B, { children: [
			C,
			k.recovered && /* @__PURE__ */ V(m, {
				tone: "warning",
				children: /* @__PURE__ */ H(r, {
					gap: "xs",
					children: ["Changes from an earlier editing session are available for recovery. They have not been applied to this document.", /* @__PURE__ */ H(i, {
						gap: "sm",
						wrap: !0,
						children: [
							/* @__PURE__ */ V(t, {
								size: "sm",
								variant: "secondary",
								onClick: k.download,
								children: "Download recovery"
							}),
							h && /* @__PURE__ */ V(t, {
								size: "sm",
								variant: "secondary",
								disabled: !A.synced || !M || A.pendingUpdateCount > 0,
								onClick: () => P(!0),
								children: "Recover changes…"
							}),
							/* @__PURE__ */ V(t, {
								size: "sm",
								variant: "ghost",
								onClick: k.clear,
								children: "Discard recovery"
							})
						]
					})]
				})
			}),
			k.storageError && /* @__PURE__ */ V(m, {
				tone: "warning",
				children: /* @__PURE__ */ H(i, {
					gap: "sm",
					wrap: !0,
					children: ["This browser could not keep a recovery copy. Keep this page open until saving finishes.", /* @__PURE__ */ V(t, {
						size: "sm",
						variant: "secondary",
						onClick: k.download,
						children: "Download recovery"
					})]
				})
			}),
			F && /* @__PURE__ */ V(m, {
				tone: "error",
				children: F
			})
		] }), de = A.synced && !!A.ydoc && !!j.body, fe = /* @__PURE__ */ H(B, { children: [
			w,
			/* @__PURE__ */ V(s, {
				open: ae,
				onCancel: () => P(!1),
				title: "Recover earlier changes?",
				tone: "caution",
				body: "This explicitly merges the recovered document with the current version. It can bring back content removed by a version restore. Download the recovery first if you want to keep a separate copy.",
				confirmLabel: "Recover changes",
				onConfirm: () => {
					A.ydoc && h && M && A.pendingUpdateCount === 0 && k.restore(A.ydoc), P(!1);
				}
			}),
			x && /* @__PURE__ */ V(o, {
				open: ce,
				onClose: () => {
					W || U(!1);
				},
				title: "Insert image",
				children: /* @__PURE__ */ H(r, {
					gap: "sm",
					children: [K && /* @__PURE__ */ V(m, {
						tone: "error",
						children: K
					}), /* @__PURE__ */ V(v, {
						accept: "image/*",
						maxSize: 10485760,
						disabled: W || !N,
						label: W ? "Uploading image…" : "Choose an image or drop it here",
						onFiles: (e) => {
							e[0] && X(e[0]);
						}
					})]
				})
			})
		] }), Q = (e, t = null, n = null) => D ? D({
			notices: Z,
			canvas: e,
			toolbar: t,
			ruler: n,
			saveState: le,
			state: ue
		}) : /* @__PURE__ */ H(B, { children: [Z, e] });
		if (!de) return Q(/* @__PURE__ */ V(u, { label: E }));
		if (!j.isCanvas) return Q(/* @__PURE__ */ V(l, {
			title: "Document migration is incomplete",
			body: "The server has not supplied a rich document snapshot. No changes have been made."
		}));
		let pe = (e) => /* @__PURE__ */ H(re, {
			loadImage: y,
			...b ? { requiresAuthentication: b } : {},
			children: [/* @__PURE__ */ oe(ne, {
				...Ue,
				...T,
				key: A.docVersion,
				isCanvas: !0,
				body: j.body,
				ydoc: A.ydoc,
				provider: A.provider,
				user: Y,
				editable: N,
				extensions: _,
				...x && N ? { onInsertImage: () => {
					q(null), U(!0);
				} } : {},
				...e ? { renderFrame: ({ toolbar: t, ruler: n, surface: r }) => e(t, n, r) } : {},
				onEditorReady: (e) => {
					J.current = e, ee?.(e);
				}
			}), fe]
		});
		return D ? pe((e, t, n) => Q(/* @__PURE__ */ V(r, {
			gap: "none",
			className: "min-h-0 flex-1",
			"data-testid": "document-canvas-slot",
			children: n
		}), e, t)) : Q(/* @__PURE__ */ V(r, {
			gap: "none",
			className: "min-h-0 flex-1",
			"data-testid": "document-canvas-slot",
			children: pe()
		}));
	};
}
//#endregion
//#region src/integrations/realtime/canvasDocumentExtensions.ts
function Ge(e, t) {
	return e({
		...t,
		Image: N(t.Image)
	});
}
//#endregion
//#region src/integrations/realtime-modules/adapters.ts
function $(e) {
	return typeof e == "string" ? e : void 0;
}
function Ke(e) {
	if (!e || typeof e != "object") return null;
	let t = e;
	return typeof t.messageId != "string" || !t.messageId ? null : {
		messageId: t.messageId,
		author: $(t.author) ?? "Unknown",
		text: $(t.text) ?? "",
		...$(t.timestamp) ? { timestamp: t.timestamp } : {}
	};
}
function qe(e) {
	let t = e.metadata?.attachments, n = Array.isArray(t) ? t.filter((e) => !!e && typeof e == "object" && typeof e.url == "string" && typeof e.id == "string") : void 0, r;
	if (e.metadata) {
		let { replyTo: t, ...n } = e.metadata, i = { ...n }, a = Ke(t);
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
function Je(e) {
	return e.map(qe);
}
function Ye(e) {
	return {
		id: $(e.metadata?.userId) || e.clientId,
		name: $(e.metadata?.displayName) ?? e.clientId.slice(0, 12),
		avatarUrl: $(e.metadata?.avatarUrl),
		online: e.status !== "offline",
		...e.status === "away" || e.status === "busy" ? { idle: !0 } : {}
	};
}
function Xe(e) {
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
var Ze = [
	15,
	25,
	35,
	45,
	55,
	65,
	75,
	85
], Qe = [
	20,
	35,
	50,
	65,
	80
];
function $e(e, t) {
	let n = Ze[t % Ze.length] ?? 50, r = Qe[Math.floor(t / Ze.length) % Qe.length] ?? 50, i = e.position != null && typeof e.position == "object" ? e.position : null;
	return {
		id: e.id,
		emoji: e.emoji,
		x: i?.x ?? n,
		y: i?.y ?? r,
		timestamp: e.timestamp
	};
}
function et(e) {
	return e.map($e);
}
function tt(e, t) {
	return (e.reactionsFor ? e.reactionsFor(t) : e.reactions.filter((e) => e.targetId === t)).map((e) => ({
		emoji: e.emoji,
		userId: e.userId ?? e.clientId,
		displayName: e.displayName
	}));
}
function nt(e) {
	try {
		let t = Date.now() - new Date(e).getTime(), n = Math.floor(t / 1e3);
		return n < 60 ? "just now" : n < 3600 ? `${Math.floor(n / 60)}m ago` : n < 86400 ? `${Math.floor(n / 3600)}h ago` : e.slice(0, 10);
	} catch {
		return "";
	}
}
var rt = {
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
function it(e) {
	let t = e.detail;
	return typeof t.subject == "string" ? t.subject : typeof t.contentId == "string" ? t.contentId.slice(0, 12) : typeof t.roomId == "string" ? `room:${t.roomId.slice(0, 8)}` : typeof t.pipelineId == "string" ? `pipeline:${t.pipelineId}` : e.eventType;
}
function at(e, t) {
	return [
		e.eventType,
		e.timestamp,
		e.userId ?? e.displayName,
		t
	].join("|");
}
function ot(e) {
	return {
		id: at(e, it(e)),
		actor: e.displayName,
		action: rt[e.eventType] ?? e.eventType.split(".").pop() ?? "did",
		subject: it(e),
		ticketId: typeof e.detail.ticketId == "string" ? e.detail.ticketId : void 0,
		timeLabel: nt(e.timestamp),
		kind: e.eventType.split(".")[0]
	};
}
function st(e) {
	let t = /* @__PURE__ */ new Map();
	return e.map((e) => {
		let n = ot(e), r = t.get(n.id) ?? 0;
		return t.set(n.id, r + 1), r === 0 ? n : {
			...n,
			id: `${n.id}#${r}`
		};
	});
}
function ct(e) {
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
function lt(e) {
	return e.map(ct);
}
function ut(e, t, n) {
	return {
		id: e.clientId,
		displayName: e.displayName || e.clientId.slice(0, 12),
		isMuted: !e.audioOn,
		isLocal: t == null ? void 0 : e.clientId === t,
		...n ? { avatarUrl: n } : {}
	};
}
function dt(e, t, n) {
	return e.map((e) => ut(e, t, n?.[e.clientId]));
}
function ft(e) {
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
function pt(e) {
	return e.map(ft);
}
//#endregion
//#region src/integrations/realtime-modules/WrappedChatPanel.tsx
function mt({ chat: e, presence: t, upload: n, reactions: r, pins: i, currentActor: a, currentUserId: o, displayName: s, avatarUrl: c, sendMetadata: l, publishTyping: u, attachmentSrc: d, onOpenAttachment: f, acceptFiles: p, maxFileSize: m, onFileError: h, disabled: g, typingUsers: _, tone: v, fill: y, showHeader: b, loadMoreHistory: x = !1, joinHistoryLimit: S = 20, historyPageSize: w = 50, onLoadMore: T, hasMore: ee, loadingMore: E, composer: D, emojis: te, onReply: O, onJumpToMessage: k, highlightedMessageId: A, documentEditors: j, callParticipants: M, onJoinCall: ne, onOpenDocument: re, wrapWithNetworkShim: N }) {
	let ie = L(() => Je(e.messages), [e.messages]), ae = _ ?? t?.roster.filter((e) => {
		if (e.metadata?.isTyping !== !0) return !1;
		let t = e.metadata?.userId;
		return o && typeof t == "string" ? t !== o : !a || e.clientId !== a;
	}).map((e) => e.metadata?.displayName ?? e.clientId.slice(0, 8)) ?? [], oe = e.sendMessage, F = P((e) => {
		let t = { ...l ?? {} };
		s && (t.displayName = s), c && (t.avatarUrl = c), Object.keys(t).length > 0 ? oe(e, t) : oe(e);
	}, [
		oe,
		l,
		s,
		c
	]), H = t?.updateMetadata, se = (u ?? !0) && !!H, ce = P((e) => H?.({ isTyping: e }), [H]), U = e.loadHistory, [W, G] = z(S), [K, q] = z(!1), J = e.messages.length, Y = R(J);
	I(() => {
		J !== Y.current && (Y.current = J, q(!1));
	}, [J]);
	let X = R(W);
	X.current = W;
	let le = P(() => {
		let e = X.current + w;
		X.current = e, G(e), q(!0), U(e);
	}, [U, w]), ue = T ? {
		onLoadMore: T,
		hasMore: ee,
		loadingMore: E
	} : x ? {
		onLoadMore: le,
		hasMore: ee ?? J >= W,
		loadingMore: E ?? K
	} : {}, de = L(() => r ? (e) => tt(r, e) : void 0, [r]), fe = L(() => {
		if (!r || !o) return;
		let { toggle: e, react: t, unreact: n } = r;
		return e ? (t, n) => e(n, {
			targetId: t,
			userId: o
		}) : (e, i) => {
			tt(r, e).some((e) => e.emoji === i && e.userId === o) && n ? n(i, { targetId: e }) : t(i, { targetId: e });
		};
	}, [r, o]), Q = P((e) => {
		if (!i) return;
		let t = e.id ?? "";
		t && (i.pinnedIds.has(t) ? i.unpin(t) : i.pin({
			messageId: t,
			text: e.content,
			author: e.displayName ?? "Unknown"
		}));
	}, [i]), pe = /* @__PURE__ */ V(C, {
		messages: ie,
		onSend: F,
		disabled: g,
		typingUsers: ae,
		tone: v,
		fill: y,
		showHeader: b,
		composer: D,
		emojis: te,
		...ue,
		...se ? { onTyping: ce } : {},
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
			onTogglePin: Q
		} : {},
		onReply: O,
		onJumpToMessage: k,
		highlightedMessageId: A,
		documentEditors: j,
		callParticipants: M,
		onJoinCall: ne,
		onOpenDocument: re,
		attachmentSrc: d,
		onOpenAttachment: f,
		acceptFiles: p,
		maxFileSize: m,
		onFileError: h
	});
	return /* @__PURE__ */ V(B, { children: Z(pe, N) });
}
//#endregion
//#region src/integrations/realtime-modules/WrappedPresencePanel.tsx
var ht = {
	typing: 4,
	online: 3,
	away: 2,
	busy: 1,
	offline: 0
};
function gt(e) {
	return ht[e] ?? 2.5;
}
function _t(e, t) {
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
			let n = gt(t.status) - gt(e.status);
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
function vt({ presence: e, currentClientId: t, perConnection: n = !1, wrapWithNetworkShim: r }) {
	let i = L(() => n ? e.roster.map((e) => ({
		clientId: e.clientId,
		status: e.status,
		metadata: e.metadata
	})) : _t(e.roster, t), [
		e.roster,
		t,
		n
	]);
	return /* @__PURE__ */ V(B, { children: Z(/* @__PURE__ */ V(ee, {
		users: i,
		currentClientId: t
	}), r) });
}
//#endregion
//#region src/integrations/realtime-modules/WrappedActivityPanel.tsx
function yt({ activity: e, visibleCount: t, rotateMs: n, staggerMs: r, kindColors: i, className: a }) {
	let o = L(() => st(e.events), [e.events]);
	return /* @__PURE__ */ V(y, {
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
function bt({ reactions: e, ttlMs: t = 2500 }) {
	let [n, r] = z([]), i = e.reactions, a = R(/* @__PURE__ */ new Map());
	return I(() => {
		if (i.length === 0) return;
		let e = i[i.length - 1], n = $e(e, i.length - 1), o = a.current;
		o.has(n.id) || (r((e) => e.some((e) => e.id === n.id) ? e : [...e, n]), o.set(n.id, setTimeout(() => {
			o.delete(n.id), r((e) => e.filter((e) => e.id !== n.id));
		}, t)));
	}, [i, t]), I(() => {
		let e = a.current;
		return () => {
			e.forEach((e) => clearTimeout(e)), e.clear();
		};
	}, []), /* @__PURE__ */ V(S, { reactions: n });
}
//#endregion
//#region src/integrations/realtime-modules/WrappedFileUploadDrop.tsx
function xt({ fileUpload: e, accept: t, maxSize: n, multiple: r, disabled: i, label: a, className: o, uploadMetadata: s, onError: c }) {
	let l = lt(e.uploads);
	function u(t) {
		for (let n of t) e.upload(n, s ? { metadata: s } : void 0).catch((e) => {
			let t = e instanceof Error ? e.message : "Upload failed";
			c?.(t);
		});
	}
	return /* @__PURE__ */ H("div", { children: [/* @__PURE__ */ V(v, {
		accept: t,
		maxSize: n,
		multiple: r,
		disabled: i,
		label: a,
		className: o,
		onFiles: u,
		onError: c
	}), l.length > 0 && /* @__PURE__ */ V(St, {
		summaries: l,
		onDismiss: () => e.removeCompleted()
	})] });
}
function St({ summaries: e, onDismiss: t }) {
	return /* @__PURE__ */ V("ul", {
		className: "mt-2 p-0 list-none text-[13px]",
		children: e.map((e) => /* @__PURE__ */ H("li", {
			className: "flex items-center gap-2 py-1 border-b border-border",
			children: [
				/* @__PURE__ */ V("span", {
					className: "flex-1 overflow-hidden text-ellipsis whitespace-nowrap",
					children: e.filename
				}),
				/* @__PURE__ */ V("span", {
					className: `text-xs font-semibold ${Ct(e.status)}`,
					children: e.status === "uploading" ? `${e.progress}%` : e.status
				}),
				(e.status === "completed" || e.status === "clean") && e.downloadUrl && /* @__PURE__ */ V("a", {
					href: e.downloadUrl,
					target: "_blank",
					rel: "noreferrer",
					className: "text-xs text-info",
					children: "Download"
				}),
				(e.status === "failed" || e.status === "infected") && /* @__PURE__ */ V("button", {
					type: "button",
					onClick: t,
					className: "text-xs text-danger bg-transparent border-0 cursor-pointer p-0",
					children: "Dismiss"
				})
			]
		}, e.id))
	});
}
function Ct(e) {
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
function wt({ hangout: e, localClientId: t, videoElements: n, mode: r, spotlightContent: i, activeSpeakerId: a, speakerHysteresisMs: o, onParticipantClick: s, className: c }) {
	let l = dt(e.participants, t), u = t == null ? null : l.find((e) => e.id === t) ?? null, d = t == null ? l : l.filter((e) => e.id !== t);
	function f(e) {
		return n ? e.map((e) => ({
			...e,
			videoElement: n[e.id] ?? e.videoElement
		})) : e;
	}
	return /* @__PURE__ */ V(E, {
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
function Tt({ notifications: e, onItemClick: t, ...n }) {
	let r = pt(e.notifications);
	return /* @__PURE__ */ V(g, {
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
//#region src/integrations/realtime-modules/WrappedConnectionPill.tsx
function Et({ socket: e, ...t }) {
	return /* @__PURE__ */ V(h, {
		state: e.connectionState,
		...t
	});
}
//#endregion
//#region src/integrations/realtime-modules/CapabilityBoundary.tsx
function Dt({ capability: e, loading: t, fallback: n, children: r }) {
	return e.isLoading ? /* @__PURE__ */ V(B, { children: t ?? null }) : e.enabled ? /* @__PURE__ */ V(B, { children: r }) : /* @__PURE__ */ V(B, { children: n ?? null });
}
//#endregion
//#region src/integrations/realtime-modules/WrappedMediaEffectsTray.tsx
function Ot({ controller: e, ...t }) {
	return /* @__PURE__ */ V(te, {
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
function kt({ open: e, controller: t, onClose: n, onApplied: r, ...i }) {
	let a = R(t);
	a.current = t;
	let o = R(!1);
	I(() => {
		if (e) return a.current.beginPreview(), o.current = !0, () => {
			o.current && (o.current = !1, a.current.cancelPreview());
		};
	}, [e]);
	let s = L(() => {
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
	return /* @__PURE__ */ V(k, {
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
function At(e) {
	let t = e.draft;
	if (!t) return 0;
	let n = 0;
	return t.filterId !== e.filterId && n++, (t.backgroundMode !== e.backgroundMode || t.backgroundMode === "image" && t.backgroundImageUrl !== e.backgroundImageUrl) && n++, t.faceSpriteId !== e.faceSpriteId && n++, n;
}
//#endregion
//#region src/integrations/realtime-modules/WrappedCanvasDocument.tsx
function jt({ canvas: e, schema: t, legacyModel: n, beforeConvert: r, ...i }) {
	let [a, o] = z([]), s = P(async () => {
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
	return /* @__PURE__ */ V(ne, {
		...i,
		isCanvas: e.isCanvas,
		body: e.body,
		onConvert: s,
		unsupported: a
	});
}
//#endregion
//#region src/integrations/realtime-modules/WrappedAudioVideoSettingsForm.tsx
function Mt({ devices: e, settings: t, cameraOn: n, ...r }) {
	return /* @__PURE__ */ V(A, {
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
export { Z as $, Ge as A, Ie as B, tt as C, Xe as D, Ye as E, Le as F, be as G, Ee as H, ze as I, ve as J, xe as K, Re as L, He as M, Ve as N, $e as O, Be as P, de as Q, Fe as R, dt as S, pt as T, ye as U, ke as V, Ce as W, he as X, pe as Y, _e as Z, qe as _, Ot as a, ce as at, lt as b, Tt as c, bt as d, ue as et, yt as f, st as g, ot as h, At as i, K as it, We as j, et as k, wt as l, mt as m, jt as n, Y as nt, Dt as o, vt as p, Q as q, kt as r, J as rt, Et as s, Mt as t, le as tt, xt as u, Je as v, ft as w, ut as x, ct as y, je as z };
