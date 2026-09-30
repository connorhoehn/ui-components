import { t as e } from "./cn-D4QmbyEy.js";
import { v as t } from "./overlayStack-DWxp7Rsz.js";
import { t as n } from "./IconButton-VqtspsS5.js";
import { W as r } from "./Icons-CCn6EnUZ.js";
import { n as i, t as a } from "./Stack-DNMA-_4L.js";
import { t as o } from "./Badge-BCM8nNmE.js";
import { t as s } from "./Banner-CMmGmL5f.js";
import { t as c } from "./Modal-R-ipbeZi.js";
import { t as l } from "./ConfirmDialog-DmA3u0Oq.js";
import { t as u } from "./EmptyState-DnbFBYDA.js";
import { n as d } from "./ThinkingDots-BZOWJ3Fp.js";
import { n as f } from "./StatusPill-c89IbU1L.js";
import { t as p } from "./SkeletonCard-D3FL0TB7.js";
import { n as m } from "./Slider-DEbQCKD1.js";
import { t as h } from "./Avatar-k-lopdn-.js";
import { t as g } from "./InlineAlert-CBtteaVZ.js";
import { n as _, t as v } from "./NotificationCenter-DVViXcE-.js";
import { t as y } from "./PresenceAvatars-DlmKqodq.js";
import { t as b } from "./FileUploadDrop-DfM1Ek0w.js";
import { t as x } from "./ActivityFeed-CHYjJy8q.js";
import { a as S, i as C, n as ee, o as te } from "./DockedAside-CqcAfLWq.js";
import { d as ne, n as re, t as w, u as ie } from "./ConversationSurface-B-i_gjrH.js";
import { C as T, E, S as D, _ as O, r as k, s as A, t as j, x as ae, y as M } from "./CallDock-BGjSvuM-.js";
import { t as oe } from "./useActiveSpeaker-BGKJU3Lb.js";
import { c as N, o as se, s as P } from "./useDocumentImageUpload-Bdl9jMDt.js";
import { Component as ce, createContext as F, createElement as le, useCallback as I, useContext as L, useEffect as R, useMemo as z, useRef as B, useState as V } from "react";
import { Fragment as H, jsx as U, jsxs as W } from "react/jsx-runtime";
import * as G from "yjs";
//#region src/integrations/realtime/HangoutRoomRow.tsx
function K(e) {
	function t(t) {
		return q(e, t);
	}
	return t;
}
function q(e, { slug: t, name: n, participantId: r, occupancy: i, subscribeRoomsIndex: a, onClick: s, onContextMenu: c, onOpenConversation: l, kebab: u, className: d, "data-testid": f = "room-row" }) {
	let p = e.useRoomOccupancy(a ? t : null, { subscribeRoomsIndex: a }), m = a ? p.occupancy ?? null : i ?? null, h = m?.count ?? 0, g = m?.members ?? [], _ = z(() => r ? g.some((e) => e.participantId === r) : !1, [g, r]), v = _, b = z(() => g.slice(0, 3).map((e) => ({
		id: e.participantId,
		name: e.displayName || e.userId,
		online: !0
	})), [g]), x = null;
	h > 1 ? x = /* @__PURE__ */ W(H, { children: [/* @__PURE__ */ U(y, {
		users: b,
		maxVisible: 3,
		size: 18
	}), /* @__PURE__ */ U(o, {
		variant: "count",
		value: h,
		color: "muted"
	})] }) : h === 1 && _ ? x = /* @__PURE__ */ U(o, {
		variant: "pulse",
		color: "accent",
		"aria-label": "Just you in this room",
		"data-testid": `${f}-self-pulse`
	}) : h === 1 && (x = /* @__PURE__ */ W(H, { children: [/* @__PURE__ */ U(y, {
		users: b,
		maxVisible: 1,
		size: 18
	}), /* @__PURE__ */ U(o, {
		variant: "count",
		value: 1,
		color: "muted"
	})] }));
	let C = l ? /* @__PURE__ */ U("button", {
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
	return /* @__PURE__ */ U(S, {
		"data-testid": f,
		icon: /* @__PURE__ */ U("span", {
			"aria-hidden": "true",
			className: "font-semibold text-text-tertiary",
			children: "#"
		}),
		label: n,
		trailing: x,
		active: v,
		onClick: s,
		onContextMenu: c,
		kebab: u ?? C,
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
var J = 3, Y = 48;
function ue(e) {
	return e.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 48);
}
function de(e) {
	let t = e.trim();
	return t.length === 0 ? "Name is required." : t.length < J ? `Name must be at least ${J} characters.` : t.length > Y ? `Name must be at most ${Y} characters.` : null;
}
function X({ open: e, onClose: n, onCreate: r, onCreated: i, defaultVisibility: a }) {
	let [o, s] = V(""), [l, u] = V(""), [d, f] = V(!1), [p, h] = V(!1), [g, _] = V(!1), [v, y] = V(null);
	R(() => {
		e && (s(""), u(""), f(!1), h(!1), _(!1), y(null));
	}, [e]);
	let b = z(() => de(o), [o]), x = z(() => ue(o), [o]), S = !b && !g;
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
	return /* @__PURE__ */ U(c, {
		open: e,
		onClose: g ? () => {} : n,
		title: "New room",
		maxWidth: 440,
		rawChildren: !0,
		backdropTestId: "new-hangout-room-dialog",
		footer: null,
		children: /* @__PURE__ */ W("form", {
			onSubmit: C,
			className: "flex flex-col gap-4",
			children: [
				/* @__PURE__ */ W("label", {
					className: "flex flex-col gap-1",
					children: [
						/* @__PURE__ */ U("span", {
							className: "text-[12px] font-semibold text-text-primary",
							children: "Name"
						}),
						/* @__PURE__ */ U("input", {
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
						/* @__PURE__ */ W("div", {
							className: "flex items-center justify-between text-[11px] text-text-tertiary",
							children: [/* @__PURE__ */ U("span", {
								"data-testid": "new-hangout-room-slug-preview",
								children: x ? `#${x}` : "Slug preview appears here"
							}), /* @__PURE__ */ U("span", { children: `${o.trim().length}/${Y}` })]
						}),
						b && o.length > 0 && /* @__PURE__ */ U("span", {
							"data-testid": "new-hangout-room-name-error",
							className: "text-[11px] text-danger-fg",
							children: b
						})
					]
				}),
				/* @__PURE__ */ W("label", {
					className: "flex flex-col gap-1",
					children: [/* @__PURE__ */ W("span", {
						className: "text-[12px] font-semibold text-text-primary",
						children: ["Description ", /* @__PURE__ */ U("span", {
							className: "font-normal text-text-tertiary",
							children: "(optional)"
						})]
					}), /* @__PURE__ */ U("textarea", {
						"data-testid": "new-hangout-room-description",
						value: l,
						onChange: (e) => u(e.target.value),
						placeholder: "What's this room for?",
						rows: 2,
						disabled: g,
						className: "w-full px-3 py-2 text-sm border border-border-emphasis rounded-md focus:outline-none focus:ring-2 focus:ring-info resize-none"
					})]
				}),
				/* @__PURE__ */ W("div", {
					className: "flex flex-col gap-3",
					children: [/* @__PURE__ */ W("label", {
						className: "flex items-center justify-between gap-3",
						children: [/* @__PURE__ */ W("span", {
							className: "flex flex-col",
							children: [/* @__PURE__ */ U("span", {
								className: "text-[13px] font-semibold text-text-primary",
								children: "Audio only"
							}), /* @__PURE__ */ U("span", {
								className: "text-[11px] text-text-tertiary",
								children: "Skip video tracks — voice-only room."
							})]
						}), /* @__PURE__ */ U(m, {
							checked: d,
							onChange: f,
							disabled: g,
							"aria-label": "Audio only",
							"data-testid": "new-hangout-room-audio-only"
						})]
					}), /* @__PURE__ */ W("label", {
						className: "flex items-center justify-between gap-3",
						children: [/* @__PURE__ */ W("span", {
							className: "flex flex-col",
							children: [/* @__PURE__ */ U("span", {
								className: "text-[13px] font-semibold text-text-primary",
								children: "Recording enabled"
							}), /* @__PURE__ */ U("span", {
								className: "text-[11px] text-text-tertiary",
								children: "Allow server-side recording of sessions."
							})]
						}), /* @__PURE__ */ U(m, {
							checked: p,
							onChange: h,
							disabled: g,
							"aria-label": "Recording enabled",
							"data-testid": "new-hangout-room-recording"
						})]
					})]
				}),
				v && /* @__PURE__ */ U("div", {
					"data-testid": "new-hangout-room-error",
					role: "alert",
					className: "text-[12px] text-danger-fg bg-danger-bg border border-danger-border rounded-md px-3 py-2",
					children: v
				}),
				/* @__PURE__ */ W("div", {
					className: "flex justify-end gap-2 pt-1",
					children: [/* @__PURE__ */ U(t, {
						type: "button",
						variant: "ghost",
						onClick: n,
						disabled: g,
						children: "Cancel"
					}), /* @__PURE__ */ U(t, {
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
function fe(e) {
	function t(t) {
		return pe(e, t);
	}
	return t;
}
function pe(e, { rooms: r, occupancyFor: i, occupancyAdapter: a, participantId: o, onJoinRoom: s, onOpenConversation: c, onContextMenu: l, onBrowseAll: d, maxVisible: f = 10, title: p = "Rooms", storageKey: m, renderCreateDialog: h }) {
	let [g, _] = V(!1), v = () => _(!0), y = () => _(!1), b = z(() => {
		let e = /* @__PURE__ */ new Set(), t = [];
		for (let n of r.rooms) n.state === "active" && (e.has(n.slug) || (e.add(n.slug), t.push(n)));
		return t;
	}, [r.rooms]), x = z(() => b.slice(0, f), [b, f]), C = b.length - x.length;
	return /* @__PURE__ */ W(H, { children: [/* @__PURE__ */ W(te, {
		title: p,
		storageKey: m,
		actions: /* @__PURE__ */ U(n, {
			"aria-label": "New room",
			size: "sm",
			onClick: v,
			icon: /* @__PURE__ */ U("span", {
				"aria-hidden": "true",
				className: "text-[14px] leading-none font-bold",
				children: "+"
			}),
			"data-testid": "new-room-button"
		}),
		"data-testid": "rooms-section",
		children: [
			r.isLoading && /* @__PURE__ */ U("div", {
				className: "flex flex-col gap-1 px-1 py-1",
				"data-testid": "hangout-rooms-loading",
				children: [
					0,
					1,
					2
				].map((e) => /* @__PURE__ */ U("div", {
					"aria-hidden": "true",
					className: "h-7 rounded-md bg-surface-hover animate-pulse"
				}, e))
			}),
			!r.isLoading && r.error && /* @__PURE__ */ W("div", {
				role: "alert",
				"data-testid": "hangout-rooms-error",
				className: "mx-1 my-1 px-3 py-2 text-[12px] text-danger-fg bg-danger-bg border border-danger-border rounded-md flex items-center justify-between gap-2",
				children: [/* @__PURE__ */ U("span", {
					className: "truncate",
					children: "Couldn't load rooms."
				}), /* @__PURE__ */ U("button", {
					type: "button",
					onClick: () => void r.refetch(),
					className: "text-danger-fg underline hover:text-danger-fg cursor-pointer",
					children: "Retry"
				})]
			}),
			!r.isLoading && !r.error && b.length === 0 && /* @__PURE__ */ U(u, {
				testId: "hangout-rooms-empty",
				title: "No rooms yet",
				description: "Create one to start an ongoing hangout.",
				action: /* @__PURE__ */ U(t, {
					onClick: v,
					variant: "primary",
					size: "sm",
					children: "Create room"
				})
			}),
			!r.isLoading && !r.error && b.length > 0 && /* @__PURE__ */ W("div", {
				className: "flex flex-col gap-0.5",
				children: [x.map((t) => /* @__PURE__ */ U(e, {
					slug: t.slug,
					name: t.name,
					participantId: o,
					subscribeRoomsIndex: a,
					occupancy: a ? null : i?.(t.slug) ?? null,
					onClick: s ? () => s(t) : void 0,
					onOpenConversation: c ? () => c(t) : void 0,
					onContextMenu: l ? (e) => l(t, e) : void 0
				}, t.slug)), C > 0 && d && /* @__PURE__ */ U(S, {
					"data-testid": "hangout-rooms-browse-all",
					label: /* @__PURE__ */ W("span", {
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
	}) : /* @__PURE__ */ U(X, {
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
var Z = class extends ce {
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
		return t ? t(e, this.reset) : /* @__PURE__ */ U("div", {
			"data-testid": "network-error-boundary-fallback",
			children: /* @__PURE__ */ U(u, {
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
function me({ connectionState: t, children: n, onRetry: r, reconnectingLabel: i, disconnectedTitle: a = "Disconnected", disconnectedDescription: o = "The connection to the server was lost. Check your network and try again.", retryLabel: s = "Try again", connectingPlaceholder: c, disconnectedFallback: l, className: d }) {
	return t === "connecting" ? /* @__PURE__ */ U("div", {
		"data-testid": "reconnecting-shim-connecting",
		className: d,
		children: c ?? /* @__PURE__ */ U(p, { height: 120 })
	}) : t === "disconnected" ? /* @__PURE__ */ U("div", {
		"data-testid": "reconnecting-shim-disconnected",
		className: d,
		children: l ?? /* @__PURE__ */ U(u, {
			icon: "📡",
			title: a,
			description: o,
			actionLabel: r ? s : void 0,
			onAction: r
		})
	}) : t === "reconnecting" ? /* @__PURE__ */ W("div", {
		"data-testid": "reconnecting-shim-reconnecting",
		className: e("relative", d),
		children: [/* @__PURE__ */ U("div", {
			className: "opacity-60 pointer-events-none",
			children: n
		}), /* @__PURE__ */ U(ae, {
			show: !0,
			label: i
		})]
	}) : /* @__PURE__ */ U("div", {
		"data-testid": "reconnecting-shim-connected",
		className: d,
		children: n
	});
}
//#endregion
//#region src/integrations/realtime-modules/networkShim.tsx
function he(e, t) {
	return t ? /* @__PURE__ */ U(Z, {
		title: t.errorTitle,
		description: t.errorDescription,
		retryLabel: t.retryLabel,
		onRetry: t.onRetry,
		onError: t.onError,
		fallback: t.errorFallback,
		children: /* @__PURE__ */ U(me, {
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
function ge(e) {
	function t(t) {
		return _e(e, t);
	}
	return t;
}
function _e(e, { hangoutRooms: t, subscribeRoomsIndex: n, occupancyFor: r, participantId: i, onJoin: a, onContextMenu: o, onBrowseAll: s, maxVisible: c, title: l, storageKey: u, renderEmpty: d, renderCreateDialog: f, wrapWithNetworkShim: p }) {
	return t.rooms.filter((e) => e.state === "active").length === 0 && !t.isLoading && !t.error && d ? /* @__PURE__ */ U("div", {
		"data-testid": "wrapped-hangout-rooms-empty-slot",
		children: d
	}) : /* @__PURE__ */ U(H, { children: he(/* @__PURE__ */ U(e, {
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
], ve = {
	chat: !0,
	presence: !0
}, ye = F(null);
function be(e) {
	function t(t) {
		return xe(e, t);
	}
	return t;
}
function xe(e, { capabilities: t = ve, channel: n, children: r }) {
	let i = z(() => Q.filter((e) => t[e] === !0), [t]), { enabled: a, isLoading: o } = e.useCapabilities(i, n), s = z(() => {
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
	return /* @__PURE__ */ U(ye.Provider, {
		value: s,
		children: r
	});
}
function Se() {
	return L(ye) ?? {
		can: Object.fromEntries(Q.map((e) => [e, !1])),
		declared: Object.fromEntries(Q.map((e) => [e, !1])),
		provisioned: Object.fromEntries(Q.map((e) => [e, !1])),
		isLoading: !1
	};
}
function Ce({ need: e, children: t, fallback: n = null }) {
	let { can: r } = Se(), i = (Array.isArray(e) ? e : [e]).every((e) => r[e]);
	return /* @__PURE__ */ U(H, { children: i ? t : n });
}
//#endregion
//#region src/integrations/realtime/WrappedConversationSurface.tsx
var we = {
	files: "conversation.files",
	documents: "conversation.documents",
	pins: "conversation.pins",
	mentions: "conversation.mentions",
	calls: "conversation.calls"
};
function Te(e = w, t = {}) {
	return e.filter((e) => e !== "chat" && e !== "members").map((e) => t[e] ?? we[e]);
}
function Ee(e) {
	return (t) => De(e, t);
}
function De(e, t) {
	let { channel: n = null, hasDocuments: r = !0, from: i = w } = t;
	return i.filter((t) => t === "mentions" ? !1 : t === "documents" ? r : t !== "calls" || !!e.lobbyForChannel(n));
}
function Oe({ declare: e = w, capabilities: t, capabilitiesError: n, capabilityNames: r = {}, children: i, ...a }) {
	let o = z(() => {
		let i = r;
		return e.filter((e) => e === "chat" || e === "members" || !t || n ? !0 : t[i[e] ?? we[e]] === !0);
	}, [
		e,
		t,
		n,
		r
	]);
	return /* @__PURE__ */ U(re, {
		...a,
		features: o,
		children: i
	});
}
//#endregion
//#region src/integrations/realtime/WrappedStreamStage.tsx
function ke(e, { channelArn: t, excludeParticipantId: n, getAuthToken: r, baseUrl: i, onStatusChange: a, ...o }) {
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
	return R(() => {
		a?.({
			mode: "realtime",
			live: c,
			error: s.error
		});
	}, [
		c,
		s.error,
		a
	]), /* @__PURE__ */ U(A, {
		...o,
		live: c,
		stream: s.stream,
		...l === null ? {} : { viewerCount: l }
	});
}
function Ae(e, { channelArn: t, playbackToken: n, baseUrl: r, onStatusChange: i, ...a }) {
	let o = e.useLVSLiveHls({
		channelArn: t,
		playbackToken: n,
		baseUrl: r
	}), { viewerCount: s } = e.useLVSViewerCount({
		channelArn: t,
		baseUrl: r,
		playbackToken: n
	});
	return R(() => {
		i?.({
			mode: "near-realtime",
			live: o.ready,
			error: null
		});
	}, [o.ready, i]), /* @__PURE__ */ U(A, {
		...a,
		live: o.ready,
		playlistUrl: o.playlistUrl,
		...s === null ? {} : { viewerCount: s }
	});
}
function je(e) {
	function t(t) {
		return ke(e, t);
	}
	function n(t) {
		return Ae(e, t);
	}
	function r({ mode: e = "near-realtime", ...r }) {
		return U(e === "realtime" ? t : n, { ...r });
	}
	return r;
}
//#endregion
//#region src/integrations/realtime/WrappedLVSHangoutLayout.tsx
function Me({ stream: e, displayName: t }) {
	return e ? /* @__PURE__ */ U("video", {
		autoPlay: !0,
		playsInline: !0,
		muted: !0,
		ref: (t) => {
			t && t.srcObject !== e && (t.srcObject = e);
		},
		className: "w-full h-full object-cover scale-x-[-1]"
	}) : /* @__PURE__ */ U("div", {
		className: "w-full h-full grid place-items-center bg-surface-emphasis",
		"data-testid": "local-camera-avatar",
		children: /* @__PURE__ */ U(h, {
			name: t,
			size: 64
		})
	});
}
function Ne(e, t) {
	let n = e.isLocal, r = n ? t ?? e.displayName ?? "You" : e.displayName || e.participantId.slice(0, 8), i = e.streams[0], a = e.screenStream, o = n ? /* @__PURE__ */ U(Me, {
		stream: i,
		displayName: r
	}) : /* @__PURE__ */ U(D, {
		stream: i,
		displayName: r,
		cameraOn: e.hasVideo
	}), s = a ? /* @__PURE__ */ U(T, {
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
function Pe(e) {
	function t(t) {
		return Fe(e, t);
	}
	return t;
}
function Fe(e, { stageToken: t, participantId: n, userId: r, localClientId: i, getStageToken: a, overlay: o, spotlightContent: s, onParticipantClick: c, mode: l = "auto", activeSpeakerStrategy: u = "audio-level", localTileLabel: d, showLocalAsTile: f = !0, className: p, "data-testid": m }) {
	let h = e.useLVSHangout({
		stageToken: t,
		participantId: n,
		userId: r ?? n.slice(0, 8),
		getAuthToken: a
	}), g = z(() => h.participants.filter((e) => f || !e.isLocal).map((e) => Ne(e, d)), [
		h.participants,
		f,
		d
	]), _ = h.participants.filter((e) => !e.isLocal).length, v = {
		connectionState: h.connectionState,
		error: h.error,
		participantCount: h.participants.length,
		remoteCount: _
	};
	return /* @__PURE__ */ W("div", {
		"data-testid": m,
		className: `relative flex-1 min-h-0 ${p ?? ""}`,
		children: [/* @__PURE__ */ U(E, {
			participants: g,
			localParticipant: null,
			mode: l,
			spotlightContent: s,
			onParticipantClick: c,
			className: "h-full"
		}), o && /* @__PURE__ */ U("div", {
			className: "absolute inset-0 pointer-events-none z-10",
			"data-testid": "wrapped-overlay-slot",
			children: /* @__PURE__ */ U("div", {
				className: "pointer-events-auto",
				children: o(v)
			})
		})]
	});
}
//#endregion
//#region src/integrations/realtime/createRealtimeIntegrations.tsx
function Ie(e) {
	let t = K(e), n = fe(t);
	return {
		HangoutRoomRow: t,
		HangoutRoomsSection: n,
		WrappedHangoutRoomsList: ge(n),
		RealtimeCapabilityProvider: be(e),
		conversationFeaturesFor: Ee(e),
		WrappedStreamStage: je(e),
		WrappedLVSHangoutLayout: Pe(e)
	};
}
var Le = F(null), Re = /* @__PURE__ */ new WeakMap();
function ze(e) {
	let t = Re.get(e);
	return t || (t = Ie(e), Re.set(e, t)), t;
}
function Be({ modules: e, children: t }) {
	let n = z(() => ze(e), [e]);
	return /* @__PURE__ */ U(Le.Provider, {
		value: n,
		children: t
	});
}
function Ve() {
	let e = L(Le);
	if (!e) throw Error("useRealtimeIntegrations() needs a <RealtimeIntegrationsProvider modules={…}> above it.");
	return e;
}
//#endregion
//#region src/integrations/realtime/canvasRecovery.ts
function He(e, t, n, r = "canvasRecovery") {
	return `${r}:${JSON.stringify([
		e,
		t,
		n
	])}`;
}
function Ue(e) {
	let t = "";
	for (let n = 0; n < e.length; n += 8192) t += String.fromCharCode(...e.subarray(n, n + 8192));
	return {
		version: 1,
		savedAt: (/* @__PURE__ */ new Date()).toISOString(),
		snapshot: btoa(t)
	};
}
function We(e) {
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
function Ge(e, t, n, r) {
	let i = He(e, t, n, r), [a, o] = V(() => {
		try {
			let e = JSON.parse(sessionStorage.getItem(i) ?? "null");
			return We(e?.recovered ?? e?.pending) ? e.recovered ?? e.pending : null;
		} catch {
			return null;
		}
	}), s = B(a), c = B(null), [l, u] = V(!1), d = I(() => {
		try {
			!s.current && !c.current ? sessionStorage.removeItem(i) : sessionStorage.setItem(i, JSON.stringify({
				recovered: s.current,
				pending: c.current
			})), u(!1);
		} catch {
			u(!0);
		}
	}, [i]), f = I((e) => {
		s.current = Ue(e), o(s.current), d();
	}, [d]), p = I(() => {
		s.current = null, o(null), d();
	}, [d]), m = I((e, t) => {
		if (!e || !t) return () => {};
		let n = () => {
			t.pendingUpdateCount && (c.current = Ue(G.encodeStateAsUpdate(e)), d());
		};
		return e.on("update", n), n(), () => e.off("update", n);
	}, [d]), h = I(() => {
		c.current = null, d();
	}, [d]);
	return R(() => {
		d();
	}, [d]), {
		recovered: a,
		storageError: l,
		retain: f,
		clear: p,
		track: m,
		acknowledged: h,
		download: I(() => {
			let e = We(s.current ?? c.current);
			if (!e) return;
			let t = URL.createObjectURL(new Blob([Uint8Array.from(e)], { type: "application/octet-stream" })), r = document.createElement("a");
			r.href = t, r.download = `document-${n}-recovery.yjs`, r.click(), window.setTimeout(() => URL.revokeObjectURL(t), 1e3);
		}, [n]),
		restore: I((e) => {
			let t = We(s.current);
			t && (G.applyUpdate(e, t, "explicit-recovery"), p());
		}, [p])
	};
}
//#endregion
//#region src/integrations/realtime/canvasDocumentState.ts
function Ke(e, t, n, r) {
	if (e !== "idle") return {
		status: !n && t > 0 ? "offline" : e,
		...e === "error" || !n ? { onRetry: r } : {}
	};
}
function qe(e, t, n = Date.now()) {
	return t && e.canEdit && e.expiresAt > n;
}
//#endregion
//#region src/integrations/realtime/CanvasDocumentPane.tsx
var Je = {
	showRuler: !0,
	showStatusBar: !1,
	toolbarStyle: "card",
	pageMargin: "narrow",
	fitHeight: "parent",
	paginate: !0
};
function Ye(e) {
	return function(n) {
		let { documentId: r, tenant: o, userId: s, userName: u, userColor: p = "teal", canEdit: m, editing: h = !0, extensions: _, loadImage: v, isProtectedImage: y, uploadImage: x, onPendingChange: S, notices: C, children: ee, viewProps: te, onEditorReady: ne, loadingLabel: re = "Loading collaborative document…", layout: w, keyPrefix: ie } = n, T = e.useGateway(), E = Ge(o, s, r, ie), D = e.useYjsDoc({
			documentId: r,
			ws: T,
			onMessage: T.onMessage,
			onUnpersistedChanges: E.retain
		}), O = e.useCanvasDocument({ ydoc: D.ydoc }), k = T.connectionState === "connected", A = m && h && D.synced && k, j = B(A);
		j.current = A;
		let [ae, M] = V(!1), [oe, P] = V(null), [ce, F] = V(!1), [I, L] = V(!1), [G, K] = V(null), q = B(null), J = z(() => ({
			name: u,
			color: p
		}), [u, p]);
		R(() => E.track(D.ydoc, D.provider), [
			D.ydoc,
			D.provider,
			E.track
		]), R(() => {
			D.persistenceState === "saved" && D.pendingUpdateCount === 0 && E.acknowledged();
		}, [
			D.persistenceState,
			D.pendingUpdateCount,
			E.acknowledged
		]), R(() => {
			S?.(D.pendingUpdateCount);
		}, [D.pendingUpdateCount, S]), R(() => {
			D.provider?.awareness.setLocalStateField("user", {
				...J,
				id: s
			});
		}, [
			D.provider,
			J,
			s
		]), R(() => {
			if (D.pendingUpdateCount === 0) return;
			let e = (e) => {
				e.preventDefault(), e.returnValue = "";
			};
			return window.addEventListener("beforeunload", e), () => window.removeEventListener("beforeunload", e);
		}, [D.pendingUpdateCount]), R(() => T.onMessage((e) => {
			e.channel === `doc:${r}` && (e.type === "crdt:error" && P(typeof e.error == "string" ? e.error : "The document operation was refused."), e.type === "crdt:snapshot" && P(null));
		}), [T.onMessage, r]);
		let Y = async (e) => {
			let t = q.current;
			if (!(!x || !t || t.isDestroyed || !j.current || I)) {
				L(!0), K(null);
				try {
					let n = await x(e);
					if (q.current !== t || t.isDestroyed || !j.current) throw Error("The document is no longer editable. The image was not inserted.");
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
		}, ue = Ke(D.persistenceState, D.pendingUpdateCount, k, D.retryPersistence), de = {
			editable: A,
			online: k,
			synced: D.synced,
			pendingUpdateCount: D.pendingUpdateCount,
			persistenceState: D.persistenceState,
			docVersion: D.docVersion,
			ydoc: D.ydoc,
			exportMarkdown: O.exportMarkdown
		}, X = /* @__PURE__ */ W(H, { children: [
			C,
			E.recovered && /* @__PURE__ */ U(g, {
				tone: "warning",
				children: /* @__PURE__ */ W(i, {
					gap: "xs",
					children: ["Changes from an earlier editing session are available for recovery. They have not been applied to this document.", /* @__PURE__ */ W(a, {
						gap: "sm",
						wrap: !0,
						children: [
							/* @__PURE__ */ U(t, {
								size: "sm",
								variant: "secondary",
								onClick: E.download,
								children: "Download recovery"
							}),
							m && /* @__PURE__ */ U(t, {
								size: "sm",
								variant: "secondary",
								disabled: !D.synced || !k || D.pendingUpdateCount > 0,
								onClick: () => M(!0),
								children: "Recover changes…"
							}),
							/* @__PURE__ */ U(t, {
								size: "sm",
								variant: "ghost",
								onClick: E.clear,
								children: "Discard recovery"
							})
						]
					})]
				})
			}),
			E.storageError && /* @__PURE__ */ U(g, {
				tone: "warning",
				children: /* @__PURE__ */ W(a, {
					gap: "sm",
					wrap: !0,
					children: ["This browser could not keep a recovery copy. Keep this page open until saving finishes.", /* @__PURE__ */ U(t, {
						size: "sm",
						variant: "secondary",
						onClick: E.download,
						children: "Download recovery"
					})]
				})
			}),
			oe && /* @__PURE__ */ U(g, {
				tone: "error",
				children: oe
			})
		] }), fe = D.synced && !!D.ydoc && !!O.body, pe = /* @__PURE__ */ W(H, { children: [
			ee,
			/* @__PURE__ */ U(l, {
				open: ae,
				onCancel: () => M(!1),
				title: "Recover earlier changes?",
				tone: "caution",
				body: "This explicitly merges the recovered document with the current version. It can bring back content removed by a version restore. Download the recovery first if you want to keep a separate copy.",
				confirmLabel: "Recover changes",
				onConfirm: () => {
					D.ydoc && m && k && D.pendingUpdateCount === 0 && E.restore(D.ydoc), M(!1);
				}
			}),
			x && /* @__PURE__ */ U(c, {
				open: ce,
				onClose: () => {
					I || F(!1);
				},
				title: "Insert image",
				children: /* @__PURE__ */ W(i, {
					gap: "sm",
					children: [G && /* @__PURE__ */ U(g, {
						tone: "error",
						children: G
					}), /* @__PURE__ */ U(b, {
						accept: "image/*",
						maxSize: 10485760,
						disabled: I || !A,
						label: I ? "Uploading image…" : "Choose an image or drop it here",
						onFiles: (e) => {
							e[0] && Y(e[0]);
						}
					})]
				})
			})
		] }), Z = (e, t = null, n = null) => w ? w({
			notices: X,
			canvas: e,
			toolbar: t,
			ruler: n,
			saveState: ue,
			state: de
		}) : /* @__PURE__ */ W(H, { children: [X, e] });
		if (!fe) return Z(/* @__PURE__ */ U(f, { label: re }));
		if (!O.isCanvas) return Z(/* @__PURE__ */ U(d, {
			title: "Document migration is incomplete",
			body: "The server has not supplied a rich document snapshot. No changes have been made."
		}));
		let me = (e) => /* @__PURE__ */ W(se, {
			loadImage: v,
			...y ? { requiresAuthentication: y } : {},
			children: [/* @__PURE__ */ le(N, {
				...Je,
				...te,
				key: D.docVersion,
				isCanvas: !0,
				body: O.body,
				ydoc: D.ydoc,
				provider: D.provider,
				user: J,
				editable: A,
				extensions: _,
				...x && A ? { onInsertImage: () => {
					K(null), F(!0);
				} } : {},
				...e ? { renderFrame: ({ toolbar: t, ruler: n, surface: r }) => e(t, n, r) } : {},
				onEditorReady: (e) => {
					q.current = e, ne?.(e);
				}
			}), pe]
		});
		return w ? me((e, t, n) => Z(/* @__PURE__ */ U(i, {
			gap: "none",
			className: "min-h-0 flex-1",
			"data-testid": "document-canvas-slot",
			children: n
		}), e, t)) : Z(/* @__PURE__ */ U(i, {
			gap: "none",
			className: "min-h-0 flex-1",
			"data-testid": "document-canvas-slot",
			children: me()
		}));
	};
}
//#endregion
//#region src/integrations/realtime/canvasDocumentExtensions.ts
function Xe(e, t) {
	return e({
		...t,
		Image: P(t.Image)
	});
}
//#endregion
//#region src/integrations/realtime/ConversationCallDock.tsx
var Ze = (e) => e.stream ? /* @__PURE__ */ U(T, {
	stream: e.stream,
	muted: e.isLocal
}) : void 0, Qe = () => typeof HTMLMediaElement < "u" && "setSinkId" in HTMLMediaElement.prototype;
function $e(e) {
	let t = (e?.participants ?? []).filter((e) => !e.isLocal && e.stream && (e.state === "in-call" || e.state === "reconnecting")), n = t.map((e) => `${e.id}=${e.stream.id}`).join("|");
	return z(() => t.map((e) => ({
		participantId: e.id,
		streams: [e.stream]
	})), [n]);
}
function et(e, { call: t, title: n, onOpenPeople: r, peopleOpen: i, onOpenSettings: a, onPopOut: o, extras: s, cameraMenuItems: l, tile: u = Ze, notice: d, selfName: f, compact: p = !1, className: m, "data-testid": h = "conversation-call-dock" }) {
	let [_, v] = V(!1), y = e.useAudioVideoSettings({ preview: _ }), { activeSpeakerId: b } = oe({ participants: $e(t.call) }), x = e.conversationCallDockProps(t, {
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
	return /* @__PURE__ */ W(H, { children: [
		d ? /* @__PURE__ */ U(g, {
			tone: "info",
			"data-testid": `${h}-notice`,
			children: d
		}) : null,
		/* @__PURE__ */ U(j, { ...S }),
		!a && /* @__PURE__ */ U(c, {
			open: _,
			onClose: () => v(!1),
			title: "Call devices",
			children: /* @__PURE__ */ U(k, {
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
				speakerSelectionSupported: Qe(),
				onTestMic: y.testMic,
				onTestSound: y.testSound,
				testMicState: y.testMicState,
				...f === void 0 ? {} : { selfName: f }
			})
		})
	] });
}
function tt(e) {
	function t(t) {
		return et(e, t);
	}
	return t;
}
//#endregion
//#region src/integrations/realtime/IncomingCallToast.tsx
function nt(e) {
	return e.kind === "knock" ? `${e.callerName} asks to join` : `${e.callerName} is calling`;
}
function rt({ ring: e, onAccept: n, onDecline: i, corner: o = "top-right", width: c = 360, className: l, "data-testid": u = "incoming-call-toast" }) {
	let d = e.kind === "knock";
	return /* @__PURE__ */ U(ee, {
		corner: o,
		width: c,
		"data-testid": u,
		...l ? { className: l } : {},
		children: /* @__PURE__ */ U(s, {
			variant: "info",
			layout: "stacked",
			icon: /* @__PURE__ */ U(r, { size: 16 }),
			title: nt(e),
			action: /* @__PURE__ */ W(a, {
				gap: "sm",
				children: [/* @__PURE__ */ U(t, {
					size: "sm",
					variant: "secondary",
					onClick: i,
					"data-testid": "incoming-call-decline",
					children: "Decline"
				}), /* @__PURE__ */ U(t, {
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
function it(e) {
	if (!e || typeof e != "object") return null;
	let t = e;
	return typeof t.messageId != "string" || !t.messageId ? null : {
		messageId: t.messageId,
		author: $(t.author) ?? "Unknown",
		text: $(t.text) ?? "",
		...$(t.timestamp) ? { timestamp: t.timestamp } : {}
	};
}
function at(e) {
	let t = e.metadata?.attachments, n = Array.isArray(t) ? t.filter((e) => !!e && typeof e == "object" && typeof e.url == "string" && typeof e.id == "string") : void 0, r;
	if (e.metadata) {
		let { replyTo: t, ...n } = e.metadata, i = { ...n }, a = it(t);
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
function ot(e) {
	return e.map(at);
}
function st(e) {
	return {
		id: $(e.metadata?.userId) || e.clientId,
		name: $(e.metadata?.displayName) ?? e.clientId.slice(0, 12),
		avatarUrl: $(e.metadata?.avatarUrl),
		online: e.status !== "offline",
		...e.status === "away" || e.status === "busy" ? { idle: !0 } : {}
	};
}
function ct(e) {
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
var lt = [
	15,
	25,
	35,
	45,
	55,
	65,
	75,
	85
], ut = [
	20,
	35,
	50,
	65,
	80
];
function dt(e, t) {
	let n = lt[t % lt.length] ?? 50, r = ut[Math.floor(t / lt.length) % ut.length] ?? 50, i = e.position != null && typeof e.position == "object" ? e.position : null;
	return {
		id: e.id,
		emoji: e.emoji,
		x: i?.x ?? n,
		y: i?.y ?? r,
		timestamp: e.timestamp
	};
}
function ft(e) {
	return e.map(dt);
}
function pt(e, t) {
	return (e.reactionsFor ? e.reactionsFor(t) : e.reactions.filter((e) => e.targetId === t)).map((e) => ({
		emoji: e.emoji,
		userId: e.userId ?? e.clientId,
		displayName: e.displayName
	}));
}
function mt(e) {
	try {
		let t = Date.now() - new Date(e).getTime(), n = Math.floor(t / 1e3);
		return n < 60 ? "just now" : n < 3600 ? `${Math.floor(n / 60)}m ago` : n < 86400 ? `${Math.floor(n / 3600)}h ago` : e.slice(0, 10);
	} catch {
		return "";
	}
}
var ht = {
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
function gt(e) {
	let t = e.detail;
	return typeof t.subject == "string" ? t.subject : typeof t.contentId == "string" ? t.contentId.slice(0, 12) : typeof t.roomId == "string" ? `room:${t.roomId.slice(0, 8)}` : typeof t.pipelineId == "string" ? `pipeline:${t.pipelineId}` : e.eventType;
}
function _t(e, t) {
	return [
		e.eventType,
		e.timestamp,
		e.userId ?? e.displayName,
		t
	].join("|");
}
function vt(e) {
	return {
		id: _t(e, gt(e)),
		actor: e.displayName,
		action: ht[e.eventType] ?? e.eventType.split(".").pop() ?? "did",
		subject: gt(e),
		ticketId: typeof e.detail.ticketId == "string" ? e.detail.ticketId : void 0,
		timeLabel: mt(e.timestamp),
		kind: e.eventType.split(".")[0]
	};
}
function yt(e) {
	let t = /* @__PURE__ */ new Map();
	return e.map((e) => {
		let n = vt(e), r = t.get(n.id) ?? 0;
		return t.set(n.id, r + 1), r === 0 ? n : {
			...n,
			id: `${n.id}#${r}`
		};
	});
}
function bt(e) {
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
function xt(e) {
	return e.map(bt);
}
function St(e, t, n) {
	return {
		id: e.clientId,
		displayName: e.displayName || e.clientId.slice(0, 12),
		isMuted: !e.audioOn,
		isLocal: t == null ? void 0 : e.clientId === t,
		...n ? { avatarUrl: n } : {}
	};
}
function Ct(e, t, n) {
	return e.map((e) => St(e, t, n?.[e.clientId]));
}
function wt(e) {
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
function Tt(e) {
	return e.map(wt);
}
//#endregion
//#region src/integrations/realtime-modules/WrappedChatPanel.tsx
function Et({ chat: e, presence: t, upload: n, reactions: r, pins: i, currentActor: a, currentUserId: o, displayName: s, avatarUrl: c, sendMetadata: l, publishTyping: u, attachmentSrc: d, onOpenAttachment: f, acceptFiles: p, maxFileSize: m, onFileError: h, disabled: g, typingUsers: _, tone: v, fill: y, showHeader: b, loadMoreHistory: x = !1, joinHistoryLimit: S = 20, historyPageSize: C = 50, onLoadMore: ee, hasMore: te, loadingMore: re, composer: w, emojis: ie, onReply: T, onJumpToMessage: E, highlightedMessageId: D, documentEditors: O, callParticipants: k, onJoinCall: A, onOpenDocument: j, wrapWithNetworkShim: ae }) {
	let M = z(() => ot(e.messages), [e.messages]), oe = _ ?? t?.roster.filter((e) => {
		if (e.metadata?.isTyping !== !0) return !1;
		let t = e.metadata?.userId;
		return o && typeof t == "string" ? t !== o : !a || e.clientId !== a;
	}).map((e) => e.metadata?.displayName ?? e.clientId.slice(0, 8)) ?? [], N = e.sendMessage, se = I((e) => {
		let t = { ...l ?? {} };
		s && (t.displayName = s), c && (t.avatarUrl = c), Object.keys(t).length > 0 ? N(e, t) : N(e);
	}, [
		N,
		l,
		s,
		c
	]), P = t?.updateMetadata, ce = (u ?? !0) && !!P, F = I((e) => P?.({ isTyping: e }), [P]), le = e.loadHistory, [L, W] = V(S), [G, K] = V(!1), q = e.messages.length, J = B(q);
	R(() => {
		q !== J.current && (J.current = q, K(!1));
	}, [q]);
	let Y = B(L);
	Y.current = L;
	let ue = I(() => {
		let e = Y.current + C;
		Y.current = e, W(e), K(!0), le(e);
	}, [le, C]), de = ee ? {
		onLoadMore: ee,
		hasMore: te,
		loadingMore: re
	} : x ? {
		onLoadMore: ue,
		hasMore: te ?? q >= L,
		loadingMore: re ?? G
	} : {}, X = z(() => r ? (e) => pt(r, e) : void 0, [r]), fe = z(() => {
		if (!r || !o) return;
		let { toggle: e, react: t, unreact: n } = r;
		return e ? (t, n) => e(n, {
			targetId: t,
			userId: o
		}) : (e, i) => {
			pt(r, e).some((e) => e.emoji === i && e.userId === o) && n ? n(i, { targetId: e }) : t(i, { targetId: e });
		};
	}, [r, o]), pe = I((e) => {
		if (!i) return;
		let t = e.id ?? "";
		t && (i.pinnedIds.has(t) ? i.unpin(t) : i.pin({
			messageId: t,
			text: e.content,
			author: e.displayName ?? "Unknown"
		}));
	}, [i]), Z = /* @__PURE__ */ U(ne, {
		messages: M,
		onSend: se,
		disabled: g,
		typingUsers: oe,
		tone: v,
		fill: y,
		showHeader: b,
		composer: w,
		emojis: ie,
		...de,
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
		reactionsFor: X,
		onToggleReaction: fe,
		...i ? {
			pinnedMessageIds: i.pinnedIds,
			onTogglePin: pe
		} : {},
		onReply: T,
		onJumpToMessage: E,
		highlightedMessageId: D,
		documentEditors: O,
		callParticipants: k,
		onJoinCall: A,
		onOpenDocument: j,
		attachmentSrc: d,
		onOpenAttachment: f,
		acceptFiles: p,
		maxFileSize: m,
		onFileError: h
	});
	return /* @__PURE__ */ U(H, { children: he(Z, ae) });
}
//#endregion
//#region src/integrations/realtime-modules/WrappedPresencePanel.tsx
var Dt = {
	typing: 4,
	online: 3,
	away: 2,
	busy: 1,
	offline: 0
};
function Ot(e) {
	return Dt[e] ?? 2.5;
}
function kt(e, t) {
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
			let n = Ot(t.status) - Ot(e.status);
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
function At({ presence: e, currentClientId: t, perConnection: n = !1, wrapWithNetworkShim: r }) {
	let i = z(() => n ? e.roster.map((e) => ({
		clientId: e.clientId,
		status: e.status,
		metadata: e.metadata
	})) : kt(e.roster, t), [
		e.roster,
		t,
		n
	]);
	return /* @__PURE__ */ U(H, { children: he(/* @__PURE__ */ U(ie, {
		users: i,
		currentClientId: t
	}), r) });
}
//#endregion
//#region src/integrations/realtime-modules/WrappedActivityPanel.tsx
function jt({ activity: e, visibleCount: t, rotateMs: n, staggerMs: r, kindColors: i, className: a }) {
	let o = z(() => yt(e.events), [e.events]);
	return /* @__PURE__ */ U(x, {
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
function Mt({ reactions: e, ttlMs: t = 2500 }) {
	let [n, r] = V([]), i = e.reactions, a = B(/* @__PURE__ */ new Map());
	return R(() => {
		if (i.length === 0) return;
		let e = i[i.length - 1], n = dt(e, i.length - 1), o = a.current;
		o.has(n.id) || (r((e) => e.some((e) => e.id === n.id) ? e : [...e, n]), o.set(n.id, setTimeout(() => {
			o.delete(n.id), r((e) => e.filter((e) => e.id !== n.id));
		}, t)));
	}, [i, t]), R(() => {
		let e = a.current;
		return () => {
			e.forEach((e) => clearTimeout(e)), e.clear();
		};
	}, []), /* @__PURE__ */ U(C, { reactions: n });
}
//#endregion
//#region src/integrations/realtime-modules/WrappedFileUploadDrop.tsx
function Nt({ fileUpload: e, accept: t, maxSize: n, multiple: r, disabled: i, label: a, className: o, uploadMetadata: s, onError: c }) {
	let l = xt(e.uploads);
	function u(t) {
		for (let n of t) e.upload(n, s ? { metadata: s } : void 0).catch((e) => {
			let t = e instanceof Error ? e.message : "Upload failed";
			c?.(t);
		});
	}
	return /* @__PURE__ */ W("div", { children: [/* @__PURE__ */ U(b, {
		accept: t,
		maxSize: n,
		multiple: r,
		disabled: i,
		label: a,
		className: o,
		onFiles: u,
		onError: c
	}), l.length > 0 && /* @__PURE__ */ U(Pt, {
		summaries: l,
		onDismiss: () => e.removeCompleted()
	})] });
}
function Pt({ summaries: e, onDismiss: t }) {
	return /* @__PURE__ */ U("ul", {
		className: "mt-2 p-0 list-none text-[13px]",
		children: e.map((e) => /* @__PURE__ */ W("li", {
			className: "flex items-center gap-2 py-1 border-b border-border",
			children: [
				/* @__PURE__ */ U("span", {
					className: "flex-1 overflow-hidden text-ellipsis whitespace-nowrap",
					children: e.filename
				}),
				/* @__PURE__ */ U("span", {
					className: `text-xs font-semibold ${Ft(e.status)}`,
					children: e.status === "uploading" ? `${e.progress}%` : e.status
				}),
				(e.status === "completed" || e.status === "clean") && e.downloadUrl && /* @__PURE__ */ U("a", {
					href: e.downloadUrl,
					target: "_blank",
					rel: "noreferrer",
					className: "text-xs text-info",
					children: "Download"
				}),
				(e.status === "failed" || e.status === "infected") && /* @__PURE__ */ U("button", {
					type: "button",
					onClick: t,
					className: "text-xs text-danger bg-transparent border-0 cursor-pointer p-0",
					children: "Dismiss"
				})
			]
		}, e.id))
	});
}
function Ft(e) {
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
function It({ hangout: e, localClientId: t, videoElements: n, mode: r, spotlightContent: i, activeSpeakerId: a, speakerHysteresisMs: o, onParticipantClick: s, className: c }) {
	let l = Ct(e.participants, t), u = t == null ? null : l.find((e) => e.id === t) ?? null, d = t == null ? l : l.filter((e) => e.id !== t);
	function f(e) {
		return n ? e.map((e) => ({
			...e,
			videoElement: n[e.id] ?? e.videoElement
		})) : e;
	}
	return /* @__PURE__ */ U(E, {
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
function Lt({ notifications: e, onItemClick: t, ...n }) {
	let r = Tt(e.notifications);
	return /* @__PURE__ */ U(v, {
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
function Rt({ socket: e, ...t }) {
	return /* @__PURE__ */ U(_, {
		state: e.connectionState,
		...t
	});
}
//#endregion
//#region src/integrations/realtime-modules/CapabilityBoundary.tsx
function zt({ capability: e, loading: t, fallback: n, children: r }) {
	return e.isLoading ? /* @__PURE__ */ U(H, { children: t ?? null }) : e.enabled ? /* @__PURE__ */ U(H, { children: r }) : /* @__PURE__ */ U(H, { children: n ?? null });
}
//#endregion
//#region src/integrations/realtime-modules/WrappedMediaEffectsTray.tsx
function Bt({ controller: e, ...t }) {
	return /* @__PURE__ */ U(M, {
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
function Vt({ open: e, controller: t, onClose: n, onApplied: r, ...i }) {
	let a = B(t);
	a.current = t;
	let o = B(!1);
	R(() => {
		if (e) return a.current.beginPreview(), o.current = !0, () => {
			o.current && (o.current = !1, a.current.cancelPreview());
		};
	}, [e]);
	let s = z(() => {
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
	return /* @__PURE__ */ U(O, {
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
function Ht(e) {
	let t = e.draft;
	if (!t) return 0;
	let n = 0;
	return t.filterId !== e.filterId && n++, (t.backgroundMode !== e.backgroundMode || t.backgroundMode === "image" && t.backgroundImageUrl !== e.backgroundImageUrl) && n++, t.faceSpriteId !== e.faceSpriteId && n++, n;
}
//#endregion
//#region src/integrations/realtime-modules/WrappedCanvasDocument.tsx
function Ut({ canvas: e, schema: t, legacyModel: n, beforeConvert: r, ...i }) {
	let [a, o] = V([]), s = I(async () => {
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
	return /* @__PURE__ */ U(N, {
		...i,
		isCanvas: e.isCanvas,
		body: e.body,
		onConvert: s,
		unsupported: a
	});
}
//#endregion
//#region src/integrations/realtime-modules/WrappedAudioVideoSettingsForm.tsx
function Wt({ devices: e, settings: t, cameraOn: n, ...r }) {
	return /* @__PURE__ */ U(k, {
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
export { be as $, rt as A, Ue as B, pt as C, ct as D, st as E, qe as F, je as G, Ie as H, Ke as I, Te as J, we as K, Ge as L, tt as M, Xe as N, dt as O, Ye as P, ve as Q, He as R, Ct as S, Tt as T, Ve as U, Be as V, Pe as W, Q as X, Ee as Y, Ce as Z, at as _, Bt as a, fe as at, xt as b, Lt as c, K as ct, Mt as d, Se as et, jt as f, yt as g, vt as h, Ht as i, Z as it, nt as j, ft as k, It as l, Et as m, Ut as n, he as nt, zt as o, X as ot, At as p, Oe as q, Vt as r, me as rt, Rt as s, ue as st, Wt as t, ge as tt, Nt as u, ot as v, wt as w, St as x, bt as y, We as z };
