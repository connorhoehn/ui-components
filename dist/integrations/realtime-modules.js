import { t as e } from "../cn-DhjIN-s0.js";
import { t } from "../Button-wU9TwJvB.js";
import { t as n } from "../IconButton-C3DMtvSx.js";
import { t as r } from "../Modal-CyoyiNKN.js";
import { t as i } from "../EmptyState-ClmWoqCb.js";
import { t as a } from "../SkeletonCard-CGe8XFPB.js";
import { n as o, t as s } from "../FileUploadDrop-DMLKYoZL.js";
import { t as c } from "../Avatar-BzicCOft.js";
import { n as l, r as u, t as d } from "../Badge-B_L-ZBbN.js";
import { t as f } from "../PresenceAvatars-BkzMACtv.js";
import { t as p } from "../ActivityFeed-BvBfBfGZ.js";
import { n as m, r as h, t as g } from "../ReactionsOverlay-Ob1ecsgg.js";
import { l as _, n as v, t as y, u as b } from "../ConversationSurface-BSpS1200.js";
import { a as x, c as S, d as C, o as ee, r as te, s as ne, t as re } from "../StreamStage-BgmuCwtp.js";
import { t as ie } from "../CanvasDocumentView-DTYctfKG.js";
import { Component as ae, createContext as oe, useCallback as se, useContext as ce, useEffect as w, useMemo as T, useRef as E, useState as D } from "react";
import { Fragment as O, jsx as k, jsxs as A } from "react/jsx-runtime";
import { useRoomOccupancy as le } from "@connorhoehn/realtime-modules/client/hangout-rooms";
import { useLVSHangout as ue, useLVSLiveHls as de, useLVSSubscriber as fe, useLVSViewerCount as j } from "@connorhoehn/realtime-modules/client/video";
import { useCapabilities as pe } from "@connorhoehn/realtime-modules/client";
import { lobbyForChannel as me } from "@connorhoehn/realtime-modules/call";
//#region src/integrations/realtime-modules/adapters.ts
function M(e) {
	let t = e.metadata?.attachments, n = Array.isArray(t) ? t.filter((e) => !!e && typeof e == "object" && typeof e.url == "string") : void 0;
	return {
		id: e.id,
		clientId: e.clientId,
		...e.userId ? { userId: e.userId } : {},
		content: e.message,
		timestamp: e.timestamp,
		displayName: e.metadata?.displayName ?? void 0,
		avatarUrl: e.metadata?.avatarUrl ?? void 0,
		...n && n.length > 0 ? { attachments: n } : {},
		...e.metadata ? { metadata: e.metadata } : {}
	};
}
function N(e) {
	return e.map(M);
}
function P(e) {
	let t = e.metadata?.userId;
	return {
		id: typeof t == "string" && t ? t : e.clientId,
		name: e.metadata?.displayName ?? e.clientId.slice(0, 12),
		avatarUrl: e.metadata?.avatarUrl ?? void 0,
		online: e.status !== "offline"
	};
}
function he(e) {
	let t = /* @__PURE__ */ new Map();
	for (let n of e) {
		let e = P(n), r = t.get(e.id);
		if (!r) {
			t.set(e.id, e);
			continue;
		}
		e.online && !r.online && t.set(e.id, {
			...r,
			online: !0
		});
	}
	return [...t.values()];
}
var F = [
	15,
	25,
	35,
	45,
	55,
	65,
	75,
	85
], I = [
	20,
	35,
	50,
	65,
	80
];
function L(e, t) {
	let n = F[t % F.length] ?? 50, r = I[Math.floor(t / F.length) % I.length] ?? 50, i = e.position != null && typeof e.position == "object" ? e.position : null;
	return {
		id: e.id,
		emoji: e.emoji,
		x: i?.x ?? n,
		y: i?.y ?? r,
		timestamp: e.timestamp
	};
}
function ge(e) {
	return e.map(L);
}
function _e(e) {
	try {
		let t = Date.now() - new Date(e).getTime(), n = Math.floor(t / 1e3);
		return n < 60 ? "just now" : n < 3600 ? `${Math.floor(n / 60)}m ago` : n < 86400 ? `${Math.floor(n / 3600)}h ago` : e.slice(0, 10);
	} catch {
		return "";
	}
}
var ve = {
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
function R(e) {
	let t = e.detail;
	return typeof t.subject == "string" ? t.subject : typeof t.contentId == "string" ? t.contentId.slice(0, 12) : typeof t.roomId == "string" ? `room:${t.roomId.slice(0, 8)}` : typeof t.pipelineId == "string" ? `pipeline:${t.pipelineId}` : e.eventType;
}
function ye(e, t) {
	return [
		e.eventType,
		e.timestamp,
		e.userId ?? e.displayName,
		t
	].join("|");
}
function z(e) {
	return {
		id: ye(e, R(e)),
		actor: e.displayName,
		action: ve[e.eventType] ?? e.eventType.split(".").pop() ?? "did",
		subject: R(e),
		ticketId: typeof e.detail.ticketId == "string" ? e.detail.ticketId : void 0,
		timeLabel: _e(e.timestamp),
		kind: e.eventType.split(".")[0]
	};
}
function B(e) {
	let t = /* @__PURE__ */ new Map();
	return e.map((e) => {
		let n = z(e), r = t.get(n.id) ?? 0;
		return t.set(n.id, r + 1), r === 0 ? n : {
			...n,
			id: `${n.id}#${r}`
		};
	});
}
function V(e) {
	return {
		id: e.id,
		filename: e.filename,
		progress: e.progress ?? 0,
		status: e.status,
		downloadUrl: e.downloadUrl,
		error: e.error
	};
}
function H(e) {
	return e.map(V);
}
function U(e, t) {
	return {
		id: e.clientId,
		displayName: e.displayName ?? e.clientId.slice(0, 12),
		isMuted: !e.audioOn,
		isLocal: t == null ? void 0 : e.clientId === t
	};
}
function W(e, t) {
	return e.map((e) => U(e, t));
}
function G(e) {
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
function K(e) {
	return e.map(G);
}
//#endregion
//#region src/integrations/realtime-modules/NetworkErrorBoundary.tsx
var q = class extends ae {
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
		let { fallback: t, title: n = "Something went wrong", description: r, retryLabel: a = "Retry" } = this.props;
		return t ? t(e, this.reset) : /* @__PURE__ */ k("div", {
			"data-testid": "network-error-boundary-fallback",
			children: /* @__PURE__ */ k(i, {
				icon: "⚠️",
				title: n,
				description: r ?? e.message,
				actionLabel: a,
				onAction: this.reset
			})
		});
	}
};
//#endregion
//#region src/integrations/realtime-modules/ReconnectingShim.tsx
function J({ connectionState: t, children: n, onRetry: r, reconnectingLabel: o, disconnectedTitle: s = "Disconnected", disconnectedDescription: c = "The connection to the server was lost. Check your network and try again.", retryLabel: l = "Try again", connectingPlaceholder: u, disconnectedFallback: d, className: f }) {
	return t === "connecting" ? /* @__PURE__ */ k("div", {
		"data-testid": "reconnecting-shim-connecting",
		className: f,
		children: u ?? /* @__PURE__ */ k(a, { height: 120 })
	}) : t === "disconnected" ? /* @__PURE__ */ k("div", {
		"data-testid": "reconnecting-shim-disconnected",
		className: f,
		children: d ?? /* @__PURE__ */ k(i, {
			icon: "📡",
			title: s,
			description: c,
			actionLabel: r ? l : void 0,
			onAction: r
		})
	}) : t === "reconnecting" ? /* @__PURE__ */ A("div", {
		"data-testid": "reconnecting-shim-reconnecting",
		className: e("relative", f),
		children: [/* @__PURE__ */ k("div", {
			className: "opacity-60 pointer-events-none",
			children: n
		}), /* @__PURE__ */ k(ee, {
			show: !0,
			label: o
		})]
	}) : /* @__PURE__ */ k("div", {
		"data-testid": "reconnecting-shim-connected",
		className: f,
		children: n
	});
}
//#endregion
//#region src/integrations/realtime-modules/networkShim.tsx
function Y(e, t) {
	return t ? /* @__PURE__ */ k(q, {
		title: t.errorTitle,
		description: t.errorDescription,
		retryLabel: t.retryLabel,
		onRetry: t.onRetry,
		onError: t.onError,
		fallback: t.errorFallback,
		children: /* @__PURE__ */ k(J, {
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
function be({ chat: e, presence: t, upload: n, currentActor: r, currentUserId: i, attachmentSrc: a, onOpenAttachment: o, acceptFiles: s, maxFileSize: c, onFileError: l, disabled: u, typingUsers: d, tone: f, fill: p, wrapWithNetworkShim: m }) {
	let h = N(e.messages), g = d ?? t?.roster.filter((e) => e.metadata?.isTyping === !0).map((e) => e.metadata?.displayName ?? e.clientId.slice(0, 8)) ?? [], _ = /* @__PURE__ */ k(b, {
		messages: h,
		onSend: e.sendMessage,
		disabled: u,
		typingUsers: g,
		tone: f,
		fill: p,
		...n ? {
			onSendFiles: (e) => {
				for (let t of e) n.upload(t);
			},
			transfers: n.transfers,
			onCancelTransfer: n.cancelTransfer
		} : {},
		currentActor: r,
		currentUserId: i,
		attachmentSrc: a,
		onOpenAttachment: o,
		acceptFiles: s,
		maxFileSize: c,
		onFileError: l
	});
	return /* @__PURE__ */ k(O, { children: Y(_, m) });
}
//#endregion
//#region src/integrations/realtime-modules/WrappedPresencePanel.tsx
function xe({ presence: e, currentClientId: t, wrapWithNetworkShim: n }) {
	let r = e.roster.map((e) => ({
		clientId: e.clientId,
		status: e.status,
		metadata: e.metadata
	}));
	return /* @__PURE__ */ k(O, { children: Y(/* @__PURE__ */ k(_, {
		users: r,
		currentClientId: t
	}), n) });
}
//#endregion
//#region src/integrations/realtime-modules/WrappedActivityPanel.tsx
function Se({ activity: e, visibleCount: t, rotateMs: n, staggerMs: r, kindColors: i, className: a }) {
	let o = T(() => B(e.events), [e.events]);
	return /* @__PURE__ */ k(p, {
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
function Ce({ reactions: e, ttlMs: t = 2500 }) {
	let [n, r] = D([]), i = e.reactions, a = E(/* @__PURE__ */ new Map());
	return w(() => {
		if (i.length === 0) return;
		let e = i[i.length - 1], n = L(e, i.length - 1), o = a.current;
		o.has(n.id) || (r((e) => e.some((e) => e.id === n.id) ? e : [...e, n]), o.set(n.id, setTimeout(() => {
			o.delete(n.id), r((e) => e.filter((e) => e.id !== n.id));
		}, t)));
	}, [i, t]), w(() => {
		let e = a.current;
		return () => {
			e.forEach((e) => clearTimeout(e)), e.clear();
		};
	}, []), /* @__PURE__ */ k(g, { reactions: n });
}
//#endregion
//#region src/integrations/realtime-modules/WrappedFileUploadDrop.tsx
function we({ fileUpload: e, accept: t, maxSize: n, multiple: r, disabled: i, label: a, className: o, uploadMetadata: c, onError: l }) {
	let u = H(e.uploads);
	function d(t) {
		for (let n of t) e.upload(n, c ? { metadata: c } : void 0).catch((e) => {
			let t = e instanceof Error ? e.message : "Upload failed";
			l?.(t);
		});
	}
	return /* @__PURE__ */ A("div", { children: [/* @__PURE__ */ k(s, {
		accept: t,
		maxSize: n,
		multiple: r,
		disabled: i,
		label: a,
		className: o,
		onFiles: d,
		onError: l
	}), u.length > 0 && /* @__PURE__ */ k(Te, {
		summaries: u,
		onDismiss: () => e.removeCompleted()
	})] });
}
function Te({ summaries: e, onDismiss: t }) {
	return /* @__PURE__ */ k("ul", {
		className: "mt-2 p-0 list-none text-[13px]",
		children: e.map((e) => /* @__PURE__ */ A("li", {
			className: "flex items-center gap-2 py-1 border-b border-border",
			children: [
				/* @__PURE__ */ k("span", {
					className: "flex-1 overflow-hidden text-ellipsis whitespace-nowrap",
					children: e.filename
				}),
				/* @__PURE__ */ k("span", {
					className: `text-xs font-semibold ${Ee(e.status)}`,
					children: e.status === "uploading" ? `${e.progress}%` : e.status
				}),
				(e.status === "completed" || e.status === "clean") && e.downloadUrl && /* @__PURE__ */ k("a", {
					href: e.downloadUrl,
					target: "_blank",
					rel: "noreferrer",
					className: "text-xs text-info",
					children: "Download"
				}),
				(e.status === "failed" || e.status === "infected") && /* @__PURE__ */ k("button", {
					type: "button",
					onClick: t,
					className: "text-xs text-danger bg-transparent border-0 cursor-pointer p-0",
					children: "Dismiss"
				})
			]
		}, e.id))
	});
}
function Ee(e) {
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
function De({ hangout: e, localClientId: t, videoElements: n, mode: r, spotlightContent: i, activeSpeakerId: a, speakerHysteresisMs: o, onParticipantClick: s, className: c }) {
	let l = W(e.participants, t), u = t == null ? null : l.find((e) => e.id === t) ?? null, d = t == null ? l : l.filter((e) => e.id !== t);
	function f(e) {
		return n ? e.map((e) => ({
			...e,
			videoElement: n[e.id] ?? e.videoElement
		})) : e;
	}
	return /* @__PURE__ */ k(C, {
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
function Oe({ notifications: e, onItemClick: t, ...n }) {
	let r = K(e.notifications);
	return /* @__PURE__ */ k(l, {
		items: r,
		onItemClick: (n) => {
			t ? t(n) : e.markAsRead(n.id);
		},
		onMarkAllRead: e.markAllRead,
		onClearAll: e.clearAll,
		...n
	});
}
//#endregion
//#region src/integrations/realtime-modules/WrappedConnectionPill.tsx
function ke({ socket: e, ...t }) {
	return /* @__PURE__ */ k(u, {
		state: e.connectionState,
		...t
	});
}
//#endregion
//#region src/integrations/realtime-modules/CapabilityBoundary.tsx
function Ae({ capability: e, loading: t, fallback: n, children: r }) {
	return e.isLoading ? /* @__PURE__ */ k(O, { children: t ?? null }) : e.enabled ? /* @__PURE__ */ k(O, { children: r }) : /* @__PURE__ */ k(O, { children: n ?? null });
}
//#endregion
//#region src/integrations/realtime-modules/HangoutRoomRow.tsx
function je({ slug: e, name: t, participantId: n, occupancy: r, subscribeRoomsIndex: i, onClick: a, onContextMenu: o, onOpenConversation: s, kebab: c, className: l, "data-testid": u = "room-row" }) {
	let p = le(i ? e : null, { subscribeRoomsIndex: i }), h = i ? p.occupancy ?? null : r ?? null, g = h?.count ?? 0, _ = h?.members ?? [], v = T(() => n ? _.some((e) => e.participantId === n) : !1, [_, n]), y = v, b = T(() => _.slice(0, 3).map((e) => ({
		id: e.participantId,
		name: e.displayName ?? e.userId,
		online: !0
	})), [_]), x = null;
	g > 1 ? x = /* @__PURE__ */ A(O, { children: [/* @__PURE__ */ k(f, {
		users: b,
		maxVisible: 3,
		size: 18
	}), /* @__PURE__ */ k(d, {
		variant: "count",
		value: g,
		color: "muted"
	})] }) : g === 1 && v ? x = /* @__PURE__ */ k(d, {
		variant: "pulse",
		color: "accent",
		"aria-label": "Just you in this room",
		"data-testid": `${u}-self-pulse`
	}) : g === 1 && (x = /* @__PURE__ */ A(O, { children: [/* @__PURE__ */ k(f, {
		users: b,
		maxVisible: 1,
		size: 18
	}), /* @__PURE__ */ k(d, {
		variant: "count",
		value: 1,
		color: "muted"
	})] }));
	let S = s ? /* @__PURE__ */ k("button", {
		type: "button",
		"aria-label": `Open the ${t} conversation`,
		title: "Open conversation",
		"data-testid": `${u}-open-conversation`,
		onClick: (e) => {
			e.stopPropagation(), s();
		},
		className: "grid h-5 w-5 place-items-center rounded bg-transparent text-[11px] text-text-tertiary opacity-0 transition-opacity hover:bg-surface-hover hover:text-text-primary focus:opacity-100 group-hover:opacity-100",
		children: "💬"
	}) : null;
	return /* @__PURE__ */ k(m, {
		"data-testid": u,
		icon: /* @__PURE__ */ k("span", {
			"aria-hidden": "true",
			className: "font-semibold text-text-tertiary",
			children: "#"
		}),
		label: t,
		trailing: x,
		active: y,
		onClick: a,
		onContextMenu: o,
		kebab: c ?? S,
		"aria-label": `${t} room`,
		className: l,
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
var Me = 3, X = 48;
function Ne(e) {
	return e.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 48);
}
function Pe(e) {
	let t = e.trim();
	return t.length === 0 ? "Name is required." : t.length < Me ? `Name must be at least ${Me} characters.` : t.length > X ? `Name must be at most ${X} characters.` : null;
}
function Fe({ open: e, onClose: n, onCreate: i, onCreated: a, defaultVisibility: s }) {
	let [c, l] = D(""), [u, d] = D(""), [f, p] = D(!1), [m, h] = D(!1), [g, _] = D(!1), [v, y] = D(null);
	w(() => {
		e && (l(""), d(""), p(!1), h(!1), _(!1), y(null));
	}, [e]);
	let b = T(() => Pe(c), [c]), x = T(() => Ne(c), [c]), S = !b && !g;
	async function C(e) {
		if (e.preventDefault(), S) {
			_(!0), y(null);
			try {
				let e = await i({
					name: c.trim(),
					description: u.trim() || void 0,
					visibility: s,
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
	return /* @__PURE__ */ k(r, {
		open: e,
		onClose: g ? () => {} : n,
		title: "New room",
		maxWidth: 440,
		rawChildren: !0,
		backdropTestId: "new-hangout-room-dialog",
		footer: null,
		children: /* @__PURE__ */ A("form", {
			onSubmit: C,
			className: "flex flex-col gap-4",
			children: [
				/* @__PURE__ */ A("label", {
					className: "flex flex-col gap-1",
					children: [
						/* @__PURE__ */ k("span", {
							className: "text-[12px] font-semibold text-text-primary",
							children: "Name"
						}),
						/* @__PURE__ */ k("input", {
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
						/* @__PURE__ */ A("div", {
							className: "flex items-center justify-between text-[11px] text-text-tertiary",
							children: [/* @__PURE__ */ k("span", {
								"data-testid": "new-hangout-room-slug-preview",
								children: x ? `#${x}` : "Slug preview appears here"
							}), /* @__PURE__ */ k("span", { children: `${c.trim().length}/${X}` })]
						}),
						b && c.length > 0 && /* @__PURE__ */ k("span", {
							"data-testid": "new-hangout-room-name-error",
							className: "text-[11px] text-danger-fg",
							children: b
						})
					]
				}),
				/* @__PURE__ */ A("label", {
					className: "flex flex-col gap-1",
					children: [/* @__PURE__ */ A("span", {
						className: "text-[12px] font-semibold text-text-primary",
						children: ["Description ", /* @__PURE__ */ k("span", {
							className: "font-normal text-text-tertiary",
							children: "(optional)"
						})]
					}), /* @__PURE__ */ k("textarea", {
						"data-testid": "new-hangout-room-description",
						value: u,
						onChange: (e) => d(e.target.value),
						placeholder: "What's this room for?",
						rows: 2,
						disabled: g,
						className: "w-full px-3 py-2 text-sm border border-border-emphasis rounded-md focus:outline-none focus:ring-2 focus:ring-info resize-none"
					})]
				}),
				/* @__PURE__ */ A("div", {
					className: "flex flex-col gap-3",
					children: [/* @__PURE__ */ A("label", {
						className: "flex items-center justify-between gap-3",
						children: [/* @__PURE__ */ A("span", {
							className: "flex flex-col",
							children: [/* @__PURE__ */ k("span", {
								className: "text-[13px] font-semibold text-text-primary",
								children: "Audio only"
							}), /* @__PURE__ */ k("span", {
								className: "text-[11px] text-text-tertiary",
								children: "Skip video tracks — voice-only room."
							})]
						}), /* @__PURE__ */ k(o, {
							checked: f,
							onChange: p,
							disabled: g,
							"aria-label": "Audio only",
							"data-testid": "new-hangout-room-audio-only"
						})]
					}), /* @__PURE__ */ A("label", {
						className: "flex items-center justify-between gap-3",
						children: [/* @__PURE__ */ A("span", {
							className: "flex flex-col",
							children: [/* @__PURE__ */ k("span", {
								className: "text-[13px] font-semibold text-text-primary",
								children: "Recording enabled"
							}), /* @__PURE__ */ k("span", {
								className: "text-[11px] text-text-tertiary",
								children: "Allow server-side recording of sessions."
							})]
						}), /* @__PURE__ */ k(o, {
							checked: m,
							onChange: h,
							disabled: g,
							"aria-label": "Recording enabled",
							"data-testid": "new-hangout-room-recording"
						})]
					})]
				}),
				v && /* @__PURE__ */ k("div", {
					"data-testid": "new-hangout-room-error",
					role: "alert",
					className: "text-[12px] text-danger-fg bg-danger-bg border border-danger-border rounded-md px-3 py-2",
					children: v
				}),
				/* @__PURE__ */ A("div", {
					className: "flex justify-end gap-2 pt-1",
					children: [/* @__PURE__ */ k(t, {
						type: "button",
						variant: "ghost",
						onClick: n,
						disabled: g,
						children: "Cancel"
					}), /* @__PURE__ */ k(t, {
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
function Ie({ rooms: e, occupancyFor: r, occupancyAdapter: a, participantId: o, onJoinRoom: s, onOpenConversation: c, onContextMenu: l, onBrowseAll: u, maxVisible: d = 10, title: f = "Rooms", storageKey: p, renderCreateDialog: g }) {
	let [_, v] = D(!1), y = () => v(!0), b = () => v(!1), x = T(() => e.rooms.filter((e) => e.state === "active"), [e.rooms]), S = T(() => x.slice(0, d), [x, d]), C = x.length - S.length;
	return /* @__PURE__ */ A(O, { children: [/* @__PURE__ */ A(h, {
		title: f,
		storageKey: p,
		actions: /* @__PURE__ */ k(n, {
			"aria-label": "New room",
			size: "sm",
			onClick: y,
			icon: /* @__PURE__ */ k("span", {
				"aria-hidden": "true",
				className: "text-[14px] leading-none font-bold",
				children: "+"
			}),
			"data-testid": "new-room-button"
		}),
		"data-testid": "rooms-section",
		children: [
			e.isLoading && /* @__PURE__ */ k("div", {
				className: "flex flex-col gap-1 px-1 py-1",
				"data-testid": "hangout-rooms-loading",
				children: [
					0,
					1,
					2
				].map((e) => /* @__PURE__ */ k("div", {
					"aria-hidden": "true",
					className: "h-7 rounded-md bg-surface-hover animate-pulse"
				}, e))
			}),
			!e.isLoading && e.error && /* @__PURE__ */ A("div", {
				role: "alert",
				"data-testid": "hangout-rooms-error",
				className: "mx-1 my-1 px-3 py-2 text-[12px] text-danger-fg bg-danger-bg border border-danger-border rounded-md flex items-center justify-between gap-2",
				children: [/* @__PURE__ */ k("span", {
					className: "truncate",
					children: "Couldn't load rooms."
				}), /* @__PURE__ */ k("button", {
					type: "button",
					onClick: () => void e.refetch(),
					className: "text-danger-fg underline hover:text-danger-fg cursor-pointer",
					children: "Retry"
				})]
			}),
			!e.isLoading && !e.error && x.length === 0 && /* @__PURE__ */ k(i, {
				testId: "hangout-rooms-empty",
				title: "No rooms yet",
				description: "Create one to start an ongoing hangout.",
				action: /* @__PURE__ */ k(t, {
					onClick: y,
					variant: "primary",
					size: "sm",
					children: "Create room"
				})
			}),
			!e.isLoading && !e.error && x.length > 0 && /* @__PURE__ */ A("div", {
				className: "flex flex-col gap-0.5",
				children: [S.map((e) => /* @__PURE__ */ k(je, {
					slug: e.slug,
					name: e.name,
					participantId: o,
					subscribeRoomsIndex: a,
					occupancy: a ? null : r?.(e.slug) ?? null,
					onClick: s ? () => s(e) : void 0,
					onOpenConversation: c ? () => c(e) : void 0,
					onContextMenu: l ? (t) => l(e, t) : void 0
				}, e.slug)), C > 0 && u && /* @__PURE__ */ k(m, {
					"data-testid": "hangout-rooms-browse-all",
					label: /* @__PURE__ */ A("span", {
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
	}) : /* @__PURE__ */ k(Fe, {
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
function Le({ stream: e, displayName: t }) {
	return e ? /* @__PURE__ */ k("video", {
		autoPlay: !0,
		playsInline: !0,
		muted: !0,
		ref: (t) => {
			t && t.srcObject !== e && (t.srcObject = e);
		},
		className: "w-full h-full object-cover scale-x-[-1]"
	}) : /* @__PURE__ */ k("div", {
		className: "w-full h-full grid place-items-center bg-surface-emphasis",
		"data-testid": "local-camera-avatar",
		children: /* @__PURE__ */ k(c, {
			name: t,
			size: 64
		})
	});
}
function Re(e, t) {
	let n = e.isLocal, r = n ? t ?? e.displayName ?? "You" : e.displayName || e.participantId.slice(0, 8), i = e.streams[0], a = e.screenStream, o = n ? /* @__PURE__ */ k(Le, {
		stream: i,
		displayName: r
	}) : /* @__PURE__ */ k(ne, {
		stream: i,
		displayName: r,
		cameraOn: e.hasVideo
	}), s = a ? /* @__PURE__ */ k(S, {
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
function ze({ stageToken: e, participantId: t, userId: n, localClientId: r, getStageToken: i, overlay: a, spotlightContent: o, onParticipantClick: s, mode: c = "auto", activeSpeakerStrategy: l = "audio-level", localTileLabel: u, showLocalAsTile: d = !0, className: f, "data-testid": p }) {
	let m = ue({
		stageToken: e,
		participantId: t,
		userId: n ?? t.slice(0, 8),
		getAuthToken: i
	}), h = T(() => m.participants.filter((e) => d || !e.isLocal).map((e) => Re(e, u)), [
		m.participants,
		d,
		u
	]), g = m.participants.filter((e) => !e.isLocal).length, _ = {
		connectionState: m.connectionState,
		error: m.error,
		participantCount: m.participants.length,
		remoteCount: g
	};
	return /* @__PURE__ */ A("div", {
		"data-testid": p,
		className: `relative flex-1 min-h-0 ${f ?? ""}`,
		children: [/* @__PURE__ */ k(C, {
			participants: h,
			localParticipant: null,
			mode: c,
			spotlightContent: o,
			onParticipantClick: s,
			className: "h-full"
		}), a && /* @__PURE__ */ k("div", {
			className: "absolute inset-0 pointer-events-none z-10",
			"data-testid": "wrapped-overlay-slot",
			children: /* @__PURE__ */ k("div", {
				className: "pointer-events-auto",
				children: a(_)
			})
		})]
	});
}
//#endregion
//#region src/integrations/realtime-modules/WrappedHangoutRoomsList.tsx
function Be({ hangoutRooms: e, subscribeRoomsIndex: t, occupancyFor: n, participantId: r, onJoin: i, onContextMenu: a, onBrowseAll: o, maxVisible: s, title: c, storageKey: l, renderEmpty: u, renderCreateDialog: d, wrapWithNetworkShim: f }) {
	return e.rooms.filter((e) => e.state === "active").length === 0 && !e.isLoading && !e.error && u ? /* @__PURE__ */ k("div", {
		"data-testid": "wrapped-hangout-rooms-empty-slot",
		children: u
	}) : /* @__PURE__ */ k(O, { children: Y(/* @__PURE__ */ k(Ie, {
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
function Ve({ controller: e, ...t }) {
	return /* @__PURE__ */ k(x, {
		filters: e.filters.map(({ id: e, label: t }) => ({
			id: e,
			label: t
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
function He({ open: e, controller: t, onClose: n, onApplied: r, ...i }) {
	let a = E(t);
	a.current = t;
	let o = E(!1);
	w(() => {
		if (e) return a.current.beginPreview(), o.current = !0, () => {
			o.current && (o.current = !1, a.current.cancelPreview());
		};
	}, [e]);
	let s = T(() => {
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
	return /* @__PURE__ */ k(te, {
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
		filters: t.filters.map(({ id: e, label: t }) => ({
			id: e,
			label: t
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
//#endregion
//#region src/integrations/realtime-modules/WrappedCanvasDocument.tsx
function Ue({ canvas: e, schema: t, legacyModel: n, ...r }) {
	let [i, a] = D([]), o = se(async () => {
		if (!t) return "The editor is still loading — try again in a moment.";
		let r = e.materialize(t, n ?? {
			frontMatter: {},
			content: []
		});
		return a(r.unsupported ?? []), r.ok ? null : r.reason ?? "Conversion was refused.";
	}, [
		e,
		t,
		n
	]);
	return /* @__PURE__ */ k(ie, {
		...r,
		isCanvas: e.isCanvas,
		body: e.body,
		onConvert: o,
		unsupported: i
	});
}
//#endregion
//#region src/integrations/realtime-modules/capabilities.tsx
var Z = [
	"chat",
	"presence",
	"video",
	"audio",
	"files",
	"reactions",
	"recordings"
], We = {
	chat: !0,
	presence: !0
}, Ge = oe(null);
function Ke({ capabilities: e = We, channel: t, children: n }) {
	let r = T(() => Z.filter((t) => e[t] === !0), [e]), { enabled: i, isLoading: a } = pe(r, t), o = T(() => {
		let t = {}, n = {}, r = {};
		for (let a of Z) t[a] = e[a] === !0, n[a] = i[a] ?? !1, r[a] = t[a] && n[a];
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
	return /* @__PURE__ */ k(Ge.Provider, {
		value: o,
		children: n
	});
}
function Q() {
	return ce(Ge) ?? {
		can: Object.fromEntries(Z.map((e) => [e, !1])),
		declared: Object.fromEntries(Z.map((e) => [e, !1])),
		provisioned: Object.fromEntries(Z.map((e) => [e, !1])),
		isLoading: !1
	};
}
function qe({ need: e, children: t, fallback: n = null }) {
	let { can: r } = Q(), i = (Array.isArray(e) ? e : [e]).every((e) => r[e]);
	return /* @__PURE__ */ k(O, { children: i ? t : n });
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
function Je(e = y, t = {}) {
	return e.filter((e) => e !== "chat").map((e) => t[e] ?? $[e]);
}
function Ye(e) {
	let { channel: t = null, hasDocuments: n = !0, from: r = y } = e;
	return r.filter((e) => e === "mentions" ? !1 : e === "documents" ? n : e !== "calls" || !!me(t));
}
function Xe({ declare: e = y, capabilities: t, capabilitiesError: n, capabilityNames: r = {}, children: i, ...a }) {
	let o = T(() => {
		let i = r;
		return e.filter((e) => e === "chat" || !t || n ? !0 : t[i[e] ?? $[e]] === !0);
	}, [
		e,
		t,
		n,
		r
	]);
	return /* @__PURE__ */ k(v, {
		...a,
		features: o,
		children: i
	});
}
//#endregion
//#region src/integrations/realtime-modules/WrappedStreamStage.tsx
function Ze({ channelArn: e, excludeParticipantId: t, getAuthToken: n, baseUrl: r, onStatusChange: i, ...a }) {
	let o = fe({
		channelArn: e ?? "",
		autoStart: !!e,
		excludeParticipantId: t,
		baseUrl: r,
		getAuthToken: n
	}), s = o.phase === "live", { viewerCount: c } = j({
		channelArn: e,
		baseUrl: r
	});
	return w(() => {
		i?.({
			mode: "realtime",
			live: s,
			error: o.error
		});
	}, [
		s,
		o.error,
		i
	]), /* @__PURE__ */ k(re, {
		...a,
		live: s,
		stream: o.stream,
		...c === null ? {} : { viewerCount: c }
	});
}
function Qe({ channelArn: e, playbackToken: t, baseUrl: n, onStatusChange: r, ...i }) {
	let a = de({
		channelArn: e,
		playbackToken: t,
		baseUrl: n
	}), { viewerCount: o } = j({
		channelArn: e,
		baseUrl: n,
		playbackToken: t
	});
	return w(() => {
		r?.({
			mode: "near-realtime",
			live: a.ready,
			error: null
		});
	}, [a.ready, r]), /* @__PURE__ */ k(re, {
		...i,
		live: a.ready,
		playlistUrl: a.playlistUrl,
		...o === null ? {} : { viewerCount: o }
	});
}
function $e({ mode: e = "near-realtime", ...t }) {
	return k(e === "realtime" ? Ze : Qe, { ...t });
}
//#endregion
export { Z as ALL_REALTIME_CAPABILITIES, $ as CONVERSATION_CAPABILITY_NAMES, Ae as CapabilityBoundary, qe as CapabilityGate, We as DEFAULT_REALTIME_CAPABILITIES, je as HangoutRoomRow, Ie as HangoutRoomsSection, q as NetworkErrorBoundary, Fe as NewHangoutRoomDialog, Ke as RealtimeCapabilityProvider, J as ReconnectingShim, Se as WrappedActivityPanel, Ue as WrappedCanvasDocument, be as WrappedChatPanel, ke as WrappedConnectionPill, Xe as WrappedConversationSurface, we as WrappedFileUploadDrop, De as WrappedHangoutLayout, Be as WrappedHangoutRoomsList, ze as WrappedLVSHangoutLayout, He as WrappedMediaEffectsPreviewPanel, Ve as WrappedMediaEffectsTray, Oe as WrappedNotificationCenter, xe as WrappedPresencePanel, Ce as WrappedReactionsOverlay, $e as WrappedStreamStage, z as adaptActivityEvent, B as adaptActivityEvents, M as adaptChatMessage, N as adaptChatMessages, V as adaptFileUploadState, H as adaptFileUploads, U as adaptHangoutParticipant, W as adaptHangoutParticipants, G as adaptNotification, K as adaptNotifications, P as adaptPresenceEntry, he as adaptPresenceRoster, L as adaptReaction, ge as adaptReactions, Y as applyNetworkShim, Je as capabilityNamesFor, Ye as conversationFeaturesFor, Ne as slugifyRoomName, Q as useRealtimeCapabilities };
