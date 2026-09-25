import { t as e } from "../cn-DhjIN-s0.js";
import { _ as t } from "../overlayStack-CHdlnODN.js";
import { t as n } from "../IconButton-DDeXW3mZ.js";
import { t as r } from "../Badge-BGDepkwI.js";
import { t as i } from "../Modal-DMFNRUDx.js";
import { t as a } from "../EmptyState-zKbpAhFD.js";
import { t as o } from "../SkeletonCard-CGe8XFPB.js";
import { n as s } from "../Slider-izEq1bGO.js";
import { t as c } from "../Avatar-DeJWic2B.js";
import { n as l, t as u } from "../NotificationCenter-B__ZOx5D.js";
import { t as d } from "../PresenceAvatars-Dmtv09Kg.js";
import { t as f } from "../FileUploadDrop-Ds6LsAtK.js";
import { t as p } from "../ActivityFeed-ay5wcWka.js";
import { n as m, r as h, t as g } from "../ReactionsOverlay-Ob1ecsgg.js";
import { d as _, n as v, t as y, u as b } from "../ConversationSurface-CnS9IFb1.js";
import { S as x, _ as S, g as C, i as w, m as T, t as E, v as D, y as ee } from "../AudioVideoSettingsForm-DGangHI6.js";
import { a as te, i as ne, n as re, r as ie, t as ae } from "../useDocumentImageUpload-DNlEqVqt.js";
import { Component as oe, createContext as se, useCallback as O, useContext as ce, useEffect as k, useMemo as A, useRef as j, useState as M } from "react";
import { Fragment as N, jsx as P, jsxs as F } from "react/jsx-runtime";
import { useRoomOccupancy as le } from "@connorhoehn/realtime-modules/client/hangout-rooms";
import { useLVSHangout as ue, useLVSLiveHls as I, useLVSSubscriber as de, useLVSViewerCount as L } from "@connorhoehn/realtime-modules/client/video";
import { useCapabilities as fe } from "@connorhoehn/realtime-modules/client";
import { lobbyForChannel as pe } from "@connorhoehn/realtime-modules/call";
//#region src/integrations/realtime-modules/adapters.ts
function R(e) {
	return typeof e == "string" ? e : void 0;
}
function z(e) {
	if (!e || typeof e != "object") return null;
	let t = e;
	return typeof t.messageId != "string" || !t.messageId ? null : {
		messageId: t.messageId,
		author: R(t.author) ?? "Unknown",
		text: R(t.text) ?? "",
		...R(t.timestamp) ? { timestamp: t.timestamp } : {}
	};
}
function B(e) {
	let t = e.metadata?.attachments, n = Array.isArray(t) ? t.filter((e) => !!e && typeof e == "object" && typeof e.url == "string" && typeof e.id == "string") : void 0, r;
	if (e.metadata) {
		let { replyTo: t, ...n } = e.metadata, i = { ...n }, a = z(t);
		a && (i.replyTo = a), r = Object.keys(i).length > 0 ? i : void 0;
	}
	return {
		id: e.id,
		clientId: e.clientId,
		...e.userId ? { userId: e.userId } : {},
		content: e.message,
		timestamp: e.timestamp,
		displayName: R(e.metadata?.displayName),
		avatarUrl: R(e.metadata?.avatarUrl),
		...n && n.length > 0 ? { attachments: n } : {},
		...r ? { metadata: r } : {}
	};
}
function V(e) {
	return e.map(B);
}
function me(e) {
	return {
		id: R(e.metadata?.userId) || e.clientId,
		name: R(e.metadata?.displayName) ?? e.clientId.slice(0, 12),
		avatarUrl: R(e.metadata?.avatarUrl),
		online: e.status !== "offline",
		...e.status === "away" || e.status === "busy" ? { idle: !0 } : {}
	};
}
function H(e) {
	let t = /* @__PURE__ */ new Map();
	for (let n of e) {
		let e = R(n.metadata?.userId) || n.clientId, r = n.status !== "offline", i = n.status === "away" || n.status === "busy", a = t.get(e);
		if (!a) {
			t.set(e, {
				id: e,
				name: R(n.metadata?.displayName),
				avatarUrl: R(n.metadata?.avatarUrl),
				fallbackName: n.clientId.slice(0, 12),
				online: r,
				idle: i
			});
			continue;
		}
		a.name ??= R(n.metadata?.displayName), a.avatarUrl ??= R(n.metadata?.avatarUrl), a.online = a.online || r, a.idle = a.idle && i;
	}
	return [...t.values()].map((e) => ({
		id: e.id,
		name: e.name ?? e.fallbackName,
		avatarUrl: e.avatarUrl,
		online: e.online,
		...e.online && e.idle ? { idle: !0 } : {}
	}));
}
var U = [
	15,
	25,
	35,
	45,
	55,
	65,
	75,
	85
], W = [
	20,
	35,
	50,
	65,
	80
];
function G(e, t) {
	let n = U[t % U.length] ?? 50, r = W[Math.floor(t / U.length) % W.length] ?? 50, i = e.position != null && typeof e.position == "object" ? e.position : null;
	return {
		id: e.id,
		emoji: e.emoji,
		x: i?.x ?? n,
		y: i?.y ?? r,
		timestamp: e.timestamp
	};
}
function he(e) {
	return e.map(G);
}
function K(e, t) {
	return (e.reactionsFor ? e.reactionsFor(t) : e.reactions.filter((e) => e.targetId === t)).map((e) => ({
		emoji: e.emoji,
		userId: e.userId ?? e.clientId,
		displayName: e.displayName
	}));
}
function ge(e) {
	try {
		let t = Date.now() - new Date(e).getTime(), n = Math.floor(t / 1e3);
		return n < 60 ? "just now" : n < 3600 ? `${Math.floor(n / 60)}m ago` : n < 86400 ? `${Math.floor(n / 3600)}h ago` : e.slice(0, 10);
	} catch {
		return "";
	}
}
var q = {
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
function J(e) {
	let t = e.detail;
	return typeof t.subject == "string" ? t.subject : typeof t.contentId == "string" ? t.contentId.slice(0, 12) : typeof t.roomId == "string" ? `room:${t.roomId.slice(0, 8)}` : typeof t.pipelineId == "string" ? `pipeline:${t.pipelineId}` : e.eventType;
}
function _e(e, t) {
	return [
		e.eventType,
		e.timestamp,
		e.userId ?? e.displayName,
		t
	].join("|");
}
function Y(e) {
	return {
		id: _e(e, J(e)),
		actor: e.displayName,
		action: q[e.eventType] ?? e.eventType.split(".").pop() ?? "did",
		subject: J(e),
		ticketId: typeof e.detail.ticketId == "string" ? e.detail.ticketId : void 0,
		timeLabel: ge(e.timestamp),
		kind: e.eventType.split(".")[0]
	};
}
function ve(e) {
	let t = /* @__PURE__ */ new Map();
	return e.map((e) => {
		let n = Y(e), r = t.get(n.id) ?? 0;
		return t.set(n.id, r + 1), r === 0 ? n : {
			...n,
			id: `${n.id}#${r}`
		};
	});
}
function ye(e) {
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
function be(e) {
	return e.map(ye);
}
function xe(e, t, n) {
	return {
		id: e.clientId,
		displayName: e.displayName || e.clientId.slice(0, 12),
		isMuted: !e.audioOn,
		isLocal: t == null ? void 0 : e.clientId === t,
		...n ? { avatarUrl: n } : {}
	};
}
function Se(e, t, n) {
	return e.map((e) => xe(e, t, n?.[e.clientId]));
}
function Ce(e) {
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
function we(e) {
	return e.map(Ce);
}
//#endregion
//#region src/integrations/realtime-modules/NetworkErrorBoundary.tsx
var Te = class extends oe {
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
		return t ? t(e, this.reset) : /* @__PURE__ */ P("div", {
			"data-testid": "network-error-boundary-fallback",
			children: /* @__PURE__ */ P(a, {
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
function Ee({ connectionState: t, children: n, onRetry: r, reconnectingLabel: i, disconnectedTitle: s = "Disconnected", disconnectedDescription: c = "The connection to the server was lost. Check your network and try again.", retryLabel: l = "Try again", connectingPlaceholder: u, disconnectedFallback: d, className: f }) {
	return t === "connecting" ? /* @__PURE__ */ P("div", {
		"data-testid": "reconnecting-shim-connecting",
		className: f,
		children: u ?? /* @__PURE__ */ P(o, { height: 120 })
	}) : t === "disconnected" ? /* @__PURE__ */ P("div", {
		"data-testid": "reconnecting-shim-disconnected",
		className: f,
		children: d ?? /* @__PURE__ */ P(a, {
			icon: "📡",
			title: s,
			description: c,
			actionLabel: r ? l : void 0,
			onAction: r
		})
	}) : t === "reconnecting" ? /* @__PURE__ */ F("div", {
		"data-testid": "reconnecting-shim-reconnecting",
		className: e("relative", f),
		children: [/* @__PURE__ */ P("div", {
			className: "opacity-60 pointer-events-none",
			children: n
		}), /* @__PURE__ */ P(S, {
			show: !0,
			label: i
		})]
	}) : /* @__PURE__ */ P("div", {
		"data-testid": "reconnecting-shim-connected",
		className: f,
		children: n
	});
}
//#endregion
//#region src/integrations/realtime-modules/networkShim.tsx
function X(e, t) {
	return t ? /* @__PURE__ */ P(Te, {
		title: t.errorTitle,
		description: t.errorDescription,
		retryLabel: t.retryLabel,
		onRetry: t.onRetry,
		onError: t.onError,
		fallback: t.errorFallback,
		children: /* @__PURE__ */ P(Ee, {
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
//#region src/integrations/realtime-modules/WrappedChatPanel.tsx
function De({ chat: e, presence: t, upload: n, reactions: r, pins: i, currentActor: a, currentUserId: o, displayName: s, avatarUrl: c, sendMetadata: l, publishTyping: u, attachmentSrc: d, onOpenAttachment: f, acceptFiles: p, maxFileSize: m, onFileError: h, disabled: g, typingUsers: v, tone: y, fill: b, showHeader: x, loadMoreHistory: S = !1, joinHistoryLimit: C = 20, historyPageSize: w = 50, onLoadMore: T, hasMore: E, loadingMore: D, composer: ee, emojis: te, onReply: ne, onJumpToMessage: re, highlightedMessageId: ie, documentEditors: ae, callParticipants: oe, onJoinCall: se, onOpenDocument: ce, wrapWithNetworkShim: F }) {
	let le = A(() => V(e.messages), [e.messages]), ue = v ?? t?.roster.filter((e) => {
		if (e.metadata?.isTyping !== !0) return !1;
		let t = e.metadata?.userId;
		return o && typeof t == "string" ? t !== o : !a || e.clientId !== a;
	}).map((e) => e.metadata?.displayName ?? e.clientId.slice(0, 8)) ?? [], I = e.sendMessage, de = O((e) => {
		let t = { ...l ?? {} };
		s && (t.displayName = s), c && (t.avatarUrl = c), Object.keys(t).length > 0 ? I(e, t) : I(e);
	}, [
		I,
		l,
		s,
		c
	]), L = t?.updateMetadata, fe = (u ?? !0) && !!L, pe = O((e) => L?.({ isTyping: e }), [L]), R = e.loadHistory, [z, B] = M(C), [me, H] = M(!1), U = e.messages.length, W = j(U);
	k(() => {
		U !== W.current && (W.current = U, H(!1));
	}, [U]);
	let G = j(z);
	G.current = z;
	let he = O(() => {
		let e = G.current + w;
		G.current = e, B(e), H(!0), R(e);
	}, [R, w]), ge = T ? {
		onLoadMore: T,
		hasMore: E,
		loadingMore: D
	} : S ? {
		onLoadMore: he,
		hasMore: E ?? U >= z,
		loadingMore: D ?? me
	} : {}, q = A(() => r ? (e) => K(r, e) : void 0, [r]), J = A(() => {
		if (!r || !o) return;
		let { toggle: e, react: t, unreact: n } = r;
		return e ? (t, n) => e(n, {
			targetId: t,
			userId: o
		}) : (e, i) => {
			K(r, e).some((e) => e.emoji === i && e.userId === o) && n ? n(i, { targetId: e }) : t(i, { targetId: e });
		};
	}, [r, o]), _e = O((e) => {
		if (!i) return;
		let t = e.id ?? "";
		t && (i.pinnedIds.has(t) ? i.unpin(t) : i.pin({
			messageId: t,
			text: e.content,
			author: e.displayName ?? "Unknown"
		}));
	}, [i]), Y = /* @__PURE__ */ P(_, {
		messages: le,
		onSend: de,
		disabled: g,
		typingUsers: ue,
		tone: y,
		fill: b,
		showHeader: x,
		composer: ee,
		emojis: te,
		...ge,
		...fe ? { onTyping: pe } : {},
		...n ? {
			onSendFiles: (e) => {
				for (let t of e) n.upload(t);
			},
			transfers: n.transfers,
			onCancelTransfer: n.cancelTransfer
		} : {},
		currentActor: a,
		currentUserId: o,
		reactionsFor: q,
		onToggleReaction: J,
		...i ? {
			pinnedMessageIds: i.pinnedIds,
			onTogglePin: _e
		} : {},
		onReply: ne,
		onJumpToMessage: re,
		highlightedMessageId: ie,
		documentEditors: ae,
		callParticipants: oe,
		onJoinCall: se,
		onOpenDocument: ce,
		attachmentSrc: d,
		onOpenAttachment: f,
		acceptFiles: p,
		maxFileSize: m,
		onFileError: h
	});
	return /* @__PURE__ */ P(N, { children: X(Y, F) });
}
//#endregion
//#region src/integrations/realtime-modules/WrappedPresencePanel.tsx
var Oe = {
	typing: 4,
	online: 3,
	away: 2,
	busy: 1,
	offline: 0
};
function ke(e) {
	return Oe[e] ?? 2.5;
}
function Ae(e, t) {
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
			let n = ke(t.status) - ke(e.status);
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
function je({ presence: e, currentClientId: t, perConnection: n = !1, wrapWithNetworkShim: r }) {
	let i = A(() => n ? e.roster.map((e) => ({
		clientId: e.clientId,
		status: e.status,
		metadata: e.metadata
	})) : Ae(e.roster, t), [
		e.roster,
		t,
		n
	]);
	return /* @__PURE__ */ P(N, { children: X(/* @__PURE__ */ P(b, {
		users: i,
		currentClientId: t
	}), r) });
}
//#endregion
//#region src/integrations/realtime-modules/WrappedActivityPanel.tsx
function Me({ activity: e, visibleCount: t, rotateMs: n, staggerMs: r, kindColors: i, className: a }) {
	let o = A(() => ve(e.events), [e.events]);
	return /* @__PURE__ */ P(p, {
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
function Ne({ reactions: e, ttlMs: t = 2500 }) {
	let [n, r] = M([]), i = e.reactions, a = j(/* @__PURE__ */ new Map());
	return k(() => {
		if (i.length === 0) return;
		let e = i[i.length - 1], n = G(e, i.length - 1), o = a.current;
		o.has(n.id) || (r((e) => e.some((e) => e.id === n.id) ? e : [...e, n]), o.set(n.id, setTimeout(() => {
			o.delete(n.id), r((e) => e.filter((e) => e.id !== n.id));
		}, t)));
	}, [i, t]), k(() => {
		let e = a.current;
		return () => {
			e.forEach((e) => clearTimeout(e)), e.clear();
		};
	}, []), /* @__PURE__ */ P(g, { reactions: n });
}
//#endregion
//#region src/integrations/realtime-modules/WrappedFileUploadDrop.tsx
function Pe({ fileUpload: e, accept: t, maxSize: n, multiple: r, disabled: i, label: a, className: o, uploadMetadata: s, onError: c }) {
	let l = be(e.uploads);
	function u(t) {
		for (let n of t) e.upload(n, s ? { metadata: s } : void 0).catch((e) => {
			let t = e instanceof Error ? e.message : "Upload failed";
			c?.(t);
		});
	}
	return /* @__PURE__ */ F("div", { children: [/* @__PURE__ */ P(f, {
		accept: t,
		maxSize: n,
		multiple: r,
		disabled: i,
		label: a,
		className: o,
		onFiles: u,
		onError: c
	}), l.length > 0 && /* @__PURE__ */ P(Fe, {
		summaries: l,
		onDismiss: () => e.removeCompleted()
	})] });
}
function Fe({ summaries: e, onDismiss: t }) {
	return /* @__PURE__ */ P("ul", {
		className: "mt-2 p-0 list-none text-[13px]",
		children: e.map((e) => /* @__PURE__ */ F("li", {
			className: "flex items-center gap-2 py-1 border-b border-border",
			children: [
				/* @__PURE__ */ P("span", {
					className: "flex-1 overflow-hidden text-ellipsis whitespace-nowrap",
					children: e.filename
				}),
				/* @__PURE__ */ P("span", {
					className: `text-xs font-semibold ${Ie(e.status)}`,
					children: e.status === "uploading" ? `${e.progress}%` : e.status
				}),
				(e.status === "completed" || e.status === "clean") && e.downloadUrl && /* @__PURE__ */ P("a", {
					href: e.downloadUrl,
					target: "_blank",
					rel: "noreferrer",
					className: "text-xs text-info",
					children: "Download"
				}),
				(e.status === "failed" || e.status === "infected") && /* @__PURE__ */ P("button", {
					type: "button",
					onClick: t,
					className: "text-xs text-danger bg-transparent border-0 cursor-pointer p-0",
					children: "Dismiss"
				})
			]
		}, e.id))
	});
}
function Ie(e) {
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
function Le({ hangout: e, localClientId: t, videoElements: n, mode: r, spotlightContent: i, activeSpeakerId: a, speakerHysteresisMs: o, onParticipantClick: s, className: c }) {
	let l = Se(e.participants, t), u = t == null ? null : l.find((e) => e.id === t) ?? null, d = t == null ? l : l.filter((e) => e.id !== t);
	function f(e) {
		return n ? e.map((e) => ({
			...e,
			videoElement: n[e.id] ?? e.videoElement
		})) : e;
	}
	return /* @__PURE__ */ P(x, {
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
function Re({ notifications: e, onItemClick: t, ...n }) {
	let r = we(e.notifications);
	return /* @__PURE__ */ P(u, {
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
function ze({ socket: e, ...t }) {
	return /* @__PURE__ */ P(l, {
		state: e.connectionState,
		...t
	});
}
//#endregion
//#region src/integrations/realtime-modules/CapabilityBoundary.tsx
function Be({ capability: e, loading: t, fallback: n, children: r }) {
	return e.isLoading ? /* @__PURE__ */ P(N, { children: t ?? null }) : e.enabled ? /* @__PURE__ */ P(N, { children: r }) : /* @__PURE__ */ P(N, { children: n ?? null });
}
//#endregion
//#region src/integrations/realtime-modules/HangoutRoomRow.tsx
function Ve({ slug: e, name: t, participantId: n, occupancy: i, subscribeRoomsIndex: a, onClick: o, onContextMenu: s, onOpenConversation: c, kebab: l, className: u, "data-testid": f = "room-row" }) {
	let p = le(a ? e : null, { subscribeRoomsIndex: a }), h = a ? p.occupancy ?? null : i ?? null, g = h?.count ?? 0, _ = h?.members ?? [], v = A(() => n ? _.some((e) => e.participantId === n) : !1, [_, n]), y = v, b = A(() => _.slice(0, 3).map((e) => ({
		id: e.participantId,
		name: e.displayName || e.userId,
		online: !0
	})), [_]), x = null;
	g > 1 ? x = /* @__PURE__ */ F(N, { children: [/* @__PURE__ */ P(d, {
		users: b,
		maxVisible: 3,
		size: 18
	}), /* @__PURE__ */ P(r, {
		variant: "count",
		value: g,
		color: "muted"
	})] }) : g === 1 && v ? x = /* @__PURE__ */ P(r, {
		variant: "pulse",
		color: "accent",
		"aria-label": "Just you in this room",
		"data-testid": `${f}-self-pulse`
	}) : g === 1 && (x = /* @__PURE__ */ F(N, { children: [/* @__PURE__ */ P(d, {
		users: b,
		maxVisible: 1,
		size: 18
	}), /* @__PURE__ */ P(r, {
		variant: "count",
		value: 1,
		color: "muted"
	})] }));
	let S = c ? /* @__PURE__ */ P("button", {
		type: "button",
		"aria-label": `Open the ${t} conversation`,
		title: "Open conversation",
		"data-testid": `${f}-open-conversation`,
		onClick: (e) => {
			e.stopPropagation(), c();
		},
		className: "grid h-5 w-5 place-items-center rounded bg-transparent text-[11px] text-text-tertiary opacity-0 transition-opacity hover:bg-surface-hover hover:text-text-primary focus:opacity-100 group-hover:opacity-100",
		children: "💬"
	}) : null;
	return /* @__PURE__ */ P(m, {
		"data-testid": f,
		icon: /* @__PURE__ */ P("span", {
			"aria-hidden": "true",
			className: "font-semibold text-text-tertiary",
			children: "#"
		}),
		label: t,
		trailing: x,
		active: y,
		onClick: o,
		onContextMenu: s,
		kebab: l ?? S,
		"aria-label": `${t} room`,
		className: u,
		dataAttrs: {
			"data-room-slug": e,
			"data-room-name": t,
			"data-room-active-count": g,
			"data-joined": y ? "true" : "false"
		}
	});
}
//#endregion
//#region src/integrations/realtime-modules/NewHangoutRoomDialog.tsx
var He = 3, Z = 48;
function Ue(e) {
	return e.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 48);
}
function We(e) {
	let t = e.trim();
	return t.length === 0 ? "Name is required." : t.length < He ? `Name must be at least ${He} characters.` : t.length > Z ? `Name must be at most ${Z} characters.` : null;
}
function Ge({ open: e, onClose: n, onCreate: r, onCreated: a, defaultVisibility: o }) {
	let [c, l] = M(""), [u, d] = M(""), [f, p] = M(!1), [m, h] = M(!1), [g, _] = M(!1), [v, y] = M(null);
	k(() => {
		e && (l(""), d(""), p(!1), h(!1), _(!1), y(null));
	}, [e]);
	let b = A(() => We(c), [c]), x = A(() => Ue(c), [c]), S = !b && !g;
	async function C(e) {
		if (e.preventDefault(), S) {
			_(!0), y(null);
			try {
				let e = await r({
					name: c.trim(),
					description: u.trim() || void 0,
					visibility: o,
					settings: {
						audioOnly: f,
						recordingEnabled: m
					}
				});
				a?.(e), n();
			} catch (e) {
				y(e instanceof Error ? e.message : "Failed to create room."), _(!1);
			}
		}
	}
	return /* @__PURE__ */ P(i, {
		open: e,
		onClose: g ? () => {} : n,
		title: "New room",
		maxWidth: 440,
		rawChildren: !0,
		backdropTestId: "new-hangout-room-dialog",
		footer: null,
		children: /* @__PURE__ */ F("form", {
			onSubmit: C,
			className: "flex flex-col gap-4",
			children: [
				/* @__PURE__ */ F("label", {
					className: "flex flex-col gap-1",
					children: [
						/* @__PURE__ */ P("span", {
							className: "text-[12px] font-semibold text-text-primary",
							children: "Name"
						}),
						/* @__PURE__ */ P("input", {
							"data-autofocus": !0,
							"data-testid": "new-hangout-room-name",
							type: "text",
							value: c,
							onChange: (e) => l(e.target.value),
							placeholder: "Team standup",
							maxLength: 58,
							disabled: g,
							className: "w-full px-3 py-2 text-sm border border-border-emphasis rounded-md focus:outline-none focus:ring-2 focus:ring-info"
						}),
						/* @__PURE__ */ F("div", {
							className: "flex items-center justify-between text-[11px] text-text-tertiary",
							children: [/* @__PURE__ */ P("span", {
								"data-testid": "new-hangout-room-slug-preview",
								children: x ? `#${x}` : "Slug preview appears here"
							}), /* @__PURE__ */ P("span", { children: `${c.trim().length}/${Z}` })]
						}),
						b && c.length > 0 && /* @__PURE__ */ P("span", {
							"data-testid": "new-hangout-room-name-error",
							className: "text-[11px] text-danger-fg",
							children: b
						})
					]
				}),
				/* @__PURE__ */ F("label", {
					className: "flex flex-col gap-1",
					children: [/* @__PURE__ */ F("span", {
						className: "text-[12px] font-semibold text-text-primary",
						children: ["Description ", /* @__PURE__ */ P("span", {
							className: "font-normal text-text-tertiary",
							children: "(optional)"
						})]
					}), /* @__PURE__ */ P("textarea", {
						"data-testid": "new-hangout-room-description",
						value: u,
						onChange: (e) => d(e.target.value),
						placeholder: "What's this room for?",
						rows: 2,
						disabled: g,
						className: "w-full px-3 py-2 text-sm border border-border-emphasis rounded-md focus:outline-none focus:ring-2 focus:ring-info resize-none"
					})]
				}),
				/* @__PURE__ */ F("div", {
					className: "flex flex-col gap-3",
					children: [/* @__PURE__ */ F("label", {
						className: "flex items-center justify-between gap-3",
						children: [/* @__PURE__ */ F("span", {
							className: "flex flex-col",
							children: [/* @__PURE__ */ P("span", {
								className: "text-[13px] font-semibold text-text-primary",
								children: "Audio only"
							}), /* @__PURE__ */ P("span", {
								className: "text-[11px] text-text-tertiary",
								children: "Skip video tracks — voice-only room."
							})]
						}), /* @__PURE__ */ P(s, {
							checked: f,
							onChange: p,
							disabled: g,
							"aria-label": "Audio only",
							"data-testid": "new-hangout-room-audio-only"
						})]
					}), /* @__PURE__ */ F("label", {
						className: "flex items-center justify-between gap-3",
						children: [/* @__PURE__ */ F("span", {
							className: "flex flex-col",
							children: [/* @__PURE__ */ P("span", {
								className: "text-[13px] font-semibold text-text-primary",
								children: "Recording enabled"
							}), /* @__PURE__ */ P("span", {
								className: "text-[11px] text-text-tertiary",
								children: "Allow server-side recording of sessions."
							})]
						}), /* @__PURE__ */ P(s, {
							checked: m,
							onChange: h,
							disabled: g,
							"aria-label": "Recording enabled",
							"data-testid": "new-hangout-room-recording"
						})]
					})]
				}),
				v && /* @__PURE__ */ P("div", {
					"data-testid": "new-hangout-room-error",
					role: "alert",
					className: "text-[12px] text-danger-fg bg-danger-bg border border-danger-border rounded-md px-3 py-2",
					children: v
				}),
				/* @__PURE__ */ F("div", {
					className: "flex justify-end gap-2 pt-1",
					children: [/* @__PURE__ */ P(t, {
						type: "button",
						variant: "ghost",
						onClick: n,
						disabled: g,
						children: "Cancel"
					}), /* @__PURE__ */ P(t, {
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
//#region src/integrations/realtime-modules/HangoutRoomsSection.tsx
function Ke({ rooms: e, occupancyFor: r, occupancyAdapter: i, participantId: o, onJoinRoom: s, onOpenConversation: c, onContextMenu: l, onBrowseAll: u, maxVisible: d = 10, title: f = "Rooms", storageKey: p, renderCreateDialog: g }) {
	let [_, v] = M(!1), y = () => v(!0), b = () => v(!1), x = A(() => {
		let t = /* @__PURE__ */ new Set(), n = [];
		for (let r of e.rooms) r.state === "active" && (t.has(r.slug) || (t.add(r.slug), n.push(r)));
		return n;
	}, [e.rooms]), S = A(() => x.slice(0, d), [x, d]), C = x.length - S.length;
	return /* @__PURE__ */ F(N, { children: [/* @__PURE__ */ F(h, {
		title: f,
		storageKey: p,
		actions: /* @__PURE__ */ P(n, {
			"aria-label": "New room",
			size: "sm",
			onClick: y,
			icon: /* @__PURE__ */ P("span", {
				"aria-hidden": "true",
				className: "text-[14px] leading-none font-bold",
				children: "+"
			}),
			"data-testid": "new-room-button"
		}),
		"data-testid": "rooms-section",
		children: [
			e.isLoading && /* @__PURE__ */ P("div", {
				className: "flex flex-col gap-1 px-1 py-1",
				"data-testid": "hangout-rooms-loading",
				children: [
					0,
					1,
					2
				].map((e) => /* @__PURE__ */ P("div", {
					"aria-hidden": "true",
					className: "h-7 rounded-md bg-surface-hover animate-pulse"
				}, e))
			}),
			!e.isLoading && e.error && /* @__PURE__ */ F("div", {
				role: "alert",
				"data-testid": "hangout-rooms-error",
				className: "mx-1 my-1 px-3 py-2 text-[12px] text-danger-fg bg-danger-bg border border-danger-border rounded-md flex items-center justify-between gap-2",
				children: [/* @__PURE__ */ P("span", {
					className: "truncate",
					children: "Couldn't load rooms."
				}), /* @__PURE__ */ P("button", {
					type: "button",
					onClick: () => void e.refetch(),
					className: "text-danger-fg underline hover:text-danger-fg cursor-pointer",
					children: "Retry"
				})]
			}),
			!e.isLoading && !e.error && x.length === 0 && /* @__PURE__ */ P(a, {
				testId: "hangout-rooms-empty",
				title: "No rooms yet",
				description: "Create one to start an ongoing hangout.",
				action: /* @__PURE__ */ P(t, {
					onClick: y,
					variant: "primary",
					size: "sm",
					children: "Create room"
				})
			}),
			!e.isLoading && !e.error && x.length > 0 && /* @__PURE__ */ F("div", {
				className: "flex flex-col gap-0.5",
				children: [S.map((e) => /* @__PURE__ */ P(Ve, {
					slug: e.slug,
					name: e.name,
					participantId: o,
					subscribeRoomsIndex: i,
					occupancy: i ? null : r?.(e.slug) ?? null,
					onClick: s ? () => s(e) : void 0,
					onOpenConversation: c ? () => c(e) : void 0,
					onContextMenu: l ? (t) => l(e, t) : void 0
				}, e.slug)), C > 0 && u && /* @__PURE__ */ P(m, {
					"data-testid": "hangout-rooms-browse-all",
					label: /* @__PURE__ */ F("span", {
						className: "text-[12px] text-neutral",
						children: [
							"Browse all (",
							x.length,
							")"
						]
					}),
					onClick: u
				})]
			})
		]
	}), g ? g({
		open: _,
		onClose: b
	}) : /* @__PURE__ */ P(Ge, {
		open: _,
		onClose: b,
		onCreate: e.createRoom,
		onCreated: (e) => {
			s?.(e);
		}
	})] });
}
//#endregion
//#region src/integrations/realtime-modules/WrappedLVSHangoutLayout.tsx
function qe({ stream: e, displayName: t }) {
	return e ? /* @__PURE__ */ P("video", {
		autoPlay: !0,
		playsInline: !0,
		muted: !0,
		ref: (t) => {
			t && t.srcObject !== e && (t.srcObject = e);
		},
		className: "w-full h-full object-cover scale-x-[-1]"
	}) : /* @__PURE__ */ P("div", {
		className: "w-full h-full grid place-items-center bg-surface-emphasis",
		"data-testid": "local-camera-avatar",
		children: /* @__PURE__ */ P(c, {
			name: t,
			size: 64
		})
	});
}
function Je(e, t) {
	let n = e.isLocal, r = n ? t ?? e.displayName ?? "You" : e.displayName || e.participantId.slice(0, 8), i = e.streams[0], a = e.screenStream, o = n ? /* @__PURE__ */ P(qe, {
		stream: i,
		displayName: r
	}) : /* @__PURE__ */ P(D, {
		stream: i,
		displayName: r,
		cameraOn: e.hasVideo
	}), s = a ? /* @__PURE__ */ P(ee, {
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
function Ye({ stageToken: e, participantId: t, userId: n, localClientId: r, getStageToken: i, overlay: a, spotlightContent: o, onParticipantClick: s, mode: c = "auto", activeSpeakerStrategy: l = "audio-level", localTileLabel: u, showLocalAsTile: d = !0, className: f, "data-testid": p }) {
	let m = ue({
		stageToken: e,
		participantId: t,
		userId: n ?? t.slice(0, 8),
		getAuthToken: i
	}), h = A(() => m.participants.filter((e) => d || !e.isLocal).map((e) => Je(e, u)), [
		m.participants,
		d,
		u
	]), g = m.participants.filter((e) => !e.isLocal).length, _ = {
		connectionState: m.connectionState,
		error: m.error,
		participantCount: m.participants.length,
		remoteCount: g
	};
	return /* @__PURE__ */ F("div", {
		"data-testid": p,
		className: `relative flex-1 min-h-0 ${f ?? ""}`,
		children: [/* @__PURE__ */ P(x, {
			participants: h,
			localParticipant: null,
			mode: c,
			spotlightContent: o,
			onParticipantClick: s,
			className: "h-full"
		}), a && /* @__PURE__ */ P("div", {
			className: "absolute inset-0 pointer-events-none z-10",
			"data-testid": "wrapped-overlay-slot",
			children: /* @__PURE__ */ P("div", {
				className: "pointer-events-auto",
				children: a(_)
			})
		})]
	});
}
//#endregion
//#region src/integrations/realtime-modules/WrappedHangoutRoomsList.tsx
function Xe({ hangoutRooms: e, subscribeRoomsIndex: t, occupancyFor: n, participantId: r, onJoin: i, onContextMenu: a, onBrowseAll: o, maxVisible: s, title: c, storageKey: l, renderEmpty: u, renderCreateDialog: d, wrapWithNetworkShim: f }) {
	return e.rooms.filter((e) => e.state === "active").length === 0 && !e.isLoading && !e.error && u ? /* @__PURE__ */ P("div", {
		"data-testid": "wrapped-hangout-rooms-empty-slot",
		children: u
	}) : /* @__PURE__ */ P(N, { children: X(/* @__PURE__ */ P(Ke, {
		rooms: e,
		occupancyAdapter: t,
		occupancyFor: n,
		participantId: r,
		onJoinRoom: i ? (e) => i(e.slug) : void 0,
		onContextMenu: a,
		onBrowseAll: o,
		maxVisible: s,
		title: c,
		storageKey: l,
		renderCreateDialog: d
	}), f) });
}
//#endregion
//#region src/integrations/realtime-modules/WrappedMediaEffectsTray.tsx
function Ze({ controller: e, ...t }) {
	return /* @__PURE__ */ P(C, {
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
		faceSprites: e.faceSprites.map(({ id: e, label: t }) => ({
			id: e,
			label: t
		})),
		activeFaceSpriteId: e.faceSpriteId,
		onSelectFaceSprite: (t) => e.setFaceSpriteId(t),
		...t
	});
}
//#endregion
//#region src/integrations/realtime-modules/WrappedMediaEffectsPreviewPanel.tsx
function Qe({ open: e, controller: t, onClose: n, onApplied: r, ...i }) {
	let a = j(t);
	a.current = t;
	let o = j(!1);
	k(() => {
		if (e) return a.current.beginPreview(), o.current = !0, () => {
			o.current && (o.current = !1, a.current.cancelPreview());
		};
	}, [e]);
	let s = A(() => {
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
	return /* @__PURE__ */ P(T, {
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
		faceSprites: t.faceSprites.map(({ id: e, label: t }) => ({
			id: e,
			label: t
		})),
		activeFaceSpriteId: l.faceSpriteId,
		onSelectFaceSprite: (e) => t.setFaceSpriteId(e)
	});
}
function $e(e) {
	let t = e.draft;
	if (!t) return 0;
	let n = 0;
	return t.filterId !== e.filterId && n++, (t.backgroundMode !== e.backgroundMode || t.backgroundMode === "image" && t.backgroundImageUrl !== e.backgroundImageUrl) && n++, t.faceSpriteId !== e.faceSpriteId && n++, n;
}
//#endregion
//#region src/integrations/realtime-modules/WrappedCanvasDocument.tsx
function et({ canvas: e, schema: t, legacyModel: n, beforeConvert: r, ...i }) {
	let [a, o] = M([]), s = O(async () => {
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
	return /* @__PURE__ */ P(te, {
		...i,
		isCanvas: e.isCanvas,
		body: e.body,
		onConvert: s,
		unsupported: a
	});
}
//#endregion
//#region src/integrations/realtime-modules/capabilities.tsx
var Q = [
	"chat",
	"presence",
	"video",
	"audio",
	"files",
	"reactions",
	"recordings"
], tt = {
	chat: !0,
	presence: !0
}, nt = se(null);
function rt({ capabilities: e = tt, channel: t, children: n }) {
	let r = A(() => Q.filter((t) => e[t] === !0), [e]), { enabled: i, isLoading: a } = fe(r, t), o = A(() => {
		let t = {}, n = {}, r = {};
		for (let a of Q) t[a] = e[a] === !0, n[a] = i[a] ?? !1, r[a] = t[a] && n[a];
		return {
			can: r,
			declared: t,
			provisioned: n,
			isLoading: a
		};
	}, [
		e,
		i,
		a
	]);
	return /* @__PURE__ */ P(nt.Provider, {
		value: o,
		children: n
	});
}
function it() {
	return ce(nt) ?? {
		can: Object.fromEntries(Q.map((e) => [e, !1])),
		declared: Object.fromEntries(Q.map((e) => [e, !1])),
		provisioned: Object.fromEntries(Q.map((e) => [e, !1])),
		isLoading: !1
	};
}
function at({ need: e, children: t, fallback: n = null }) {
	let { can: r } = it(), i = (Array.isArray(e) ? e : [e]).every((e) => r[e]);
	return /* @__PURE__ */ P(N, { children: i ? t : n });
}
//#endregion
//#region src/integrations/realtime-modules/WrappedConversationSurface.tsx
var $ = {
	files: "conversation.files",
	documents: "conversation.documents",
	pins: "conversation.pins",
	mentions: "conversation.mentions",
	calls: "conversation.calls"
};
function ot(e = y, t = {}) {
	return e.filter((e) => e !== "chat" && e !== "members").map((e) => t[e] ?? $[e]);
}
function st(e) {
	let { channel: t = null, hasDocuments: n = !0, from: r = y } = e;
	return r.filter((e) => e === "mentions" ? !1 : e === "documents" ? n : e !== "calls" || !!pe(t));
}
function ct({ declare: e = y, capabilities: t, capabilitiesError: n, capabilityNames: r = {}, children: i, ...a }) {
	let o = A(() => {
		let i = r;
		return e.filter((e) => e === "chat" || e === "members" || !t || n ? !0 : t[i[e] ?? $[e]] === !0);
	}, [
		e,
		t,
		n,
		r
	]);
	return /* @__PURE__ */ P(v, {
		...a,
		features: o,
		children: i
	});
}
//#endregion
//#region src/integrations/realtime-modules/WrappedStreamStage.tsx
function lt({ channelArn: e, excludeParticipantId: t, getAuthToken: n, baseUrl: r, onStatusChange: i, ...a }) {
	let o = de({
		channelArn: e ?? "",
		autoStart: !!e,
		excludeParticipantId: t,
		baseUrl: r,
		getAuthToken: n
	}), s = o.phase === "live", { viewerCount: c } = L({
		channelArn: e,
		baseUrl: r
	});
	return k(() => {
		i?.({
			mode: "realtime",
			live: s,
			error: o.error
		});
	}, [
		s,
		o.error,
		i
	]), /* @__PURE__ */ P(w, {
		...a,
		live: s,
		stream: o.stream,
		...c === null ? {} : { viewerCount: c }
	});
}
function ut({ channelArn: e, playbackToken: t, baseUrl: n, onStatusChange: r, ...i }) {
	let a = I({
		channelArn: e,
		playbackToken: t,
		baseUrl: n
	}), { viewerCount: o } = L({
		channelArn: e,
		baseUrl: n,
		playbackToken: t
	});
	return k(() => {
		r?.({
			mode: "near-realtime",
			live: a.ready,
			error: null
		});
	}, [a.ready, r]), /* @__PURE__ */ P(w, {
		...i,
		live: a.ready,
		playlistUrl: a.playlistUrl,
		...o === null ? {} : { viewerCount: o }
	});
}
function dt({ mode: e = "near-realtime", ...t }) {
	return P(e === "realtime" ? lt : ut, { ...t });
}
//#endregion
//#region src/integrations/realtime-modules/WrappedAudioVideoSettingsForm.tsx
function ft({ devices: e, settings: t, cameraOn: n, ...r }) {
	return /* @__PURE__ */ P(E, {
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
export { Q as ALL_REALTIME_CAPABILITIES, $ as CONVERSATION_CAPABILITY_NAMES, Be as CapabilityBoundary, at as CapabilityGate, tt as DEFAULT_REALTIME_CAPABILITIES, Ve as HangoutRoomRow, Ke as HangoutRoomsSection, ae as MAX_ATTACHMENT_BYTES, re as MAX_IMAGE_BYTES, Te as NetworkErrorBoundary, Ge as NewHangoutRoomDialog, rt as RealtimeCapabilityProvider, Ee as ReconnectingShim, Me as WrappedActivityPanel, ft as WrappedAudioVideoSettingsForm, et as WrappedCanvasDocument, De as WrappedChatPanel, ze as WrappedConnectionPill, ct as WrappedConversationSurface, Pe as WrappedFileUploadDrop, Le as WrappedHangoutLayout, Xe as WrappedHangoutRoomsList, Ye as WrappedLVSHangoutLayout, Qe as WrappedMediaEffectsPreviewPanel, Ze as WrappedMediaEffectsTray, Re as WrappedNotificationCenter, je as WrappedPresencePanel, Ne as WrappedReactionsOverlay, dt as WrappedStreamStage, ie as acceptsDocumentImage, Y as adaptActivityEvent, ve as adaptActivityEvents, B as adaptChatMessage, V as adaptChatMessages, ye as adaptFileUploadState, be as adaptFileUploads, xe as adaptHangoutParticipant, Se as adaptHangoutParticipants, K as adaptMessageReactions, Ce as adaptNotification, we as adaptNotifications, me as adaptPresenceEntry, H as adaptPresenceRoster, G as adaptReaction, he as adaptReactions, X as applyNetworkShim, ot as capabilityNamesFor, st as conversationFeaturesFor, $e as mediaEffectsChangeCount, Ue as slugifyRoomName, ne as useDocumentImageUpload, it as useRealtimeCapabilities };
