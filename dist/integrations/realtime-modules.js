import { t as e } from "../cn-DhjIN-s0.js";
import { t } from "../Button-CTpms90-.js";
import { n, r, t as i } from "../FileUploadDrop-CpLUJEjW.js";
import { t as a } from "../Modal-BcTT8crX.js";
import { t as o } from "../EmptyState-CUHf5NYN.js";
import { t as s } from "../SkeletonCard-CGe8XFPB.js";
import { t as c } from "../Avatar-BzicCOft.js";
import { a as l, i as u, n as d, r as f, t as p } from "../Badge-Dokf1Hkq.js";
import { n as m, r as h, t as g } from "../ReactionsOverlay-Ob1ecsgg.js";
import { n as _, t as v } from "../PresencePanel-D_-C0sP7.js";
import { i as y, n as b, r as x, s as S, t as C } from "../MediaEffectsTray-DjQfomQI.js";
import { Component as ee, useEffect as w, useMemo as T, useRef as te, useState as E } from "react";
import { Fragment as D, jsx as O, jsxs as k } from "react/jsx-runtime";
import { useRoomOccupancy as ne } from "@connorhoehn/realtime-modules/client/hangout-rooms";
import { useLVSHangout as re } from "@connorhoehn/realtime-modules/client/video";
//#region src/integrations/realtime-modules/adapters.ts
function A(e) {
	return {
		id: e.id,
		clientId: e.clientId,
		content: e.message,
		timestamp: e.timestamp,
		displayName: e.metadata?.displayName ?? void 0,
		avatarUrl: e.metadata?.avatarUrl ?? void 0
	};
}
function j(e) {
	return e.map(A);
}
function M(e) {
	return {
		id: e.clientId,
		name: e.metadata?.displayName ?? e.clientId.slice(0, 12),
		avatarUrl: e.metadata?.avatarUrl ?? void 0,
		online: e.status !== "offline"
	};
}
function ie(e) {
	return e.map(M);
}
var N = [
	15,
	25,
	35,
	45,
	55,
	65,
	75,
	85
], P = [
	20,
	35,
	50,
	65,
	80
];
function F(e, t) {
	let n = N[t % N.length] ?? 50, r = P[Math.floor(t / N.length) % P.length] ?? 50, i = e.position != null && typeof e.position == "object" ? e.position : null;
	return {
		id: e.id,
		emoji: e.emoji,
		x: i?.x ?? n,
		y: i?.y ?? r,
		timestamp: e.timestamp
	};
}
function ae(e) {
	return e.map(F);
}
function oe(e) {
	try {
		let t = Date.now() - new Date(e).getTime(), n = Math.floor(t / 1e3);
		return n < 60 ? "just now" : n < 3600 ? `${Math.floor(n / 60)}m ago` : n < 86400 ? `${Math.floor(n / 3600)}h ago` : e.slice(0, 10);
	} catch {
		return "";
	}
}
var se = {
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
function ce(e) {
	let t = e.detail;
	return typeof t.subject == "string" ? t.subject : typeof t.contentId == "string" ? t.contentId.slice(0, 12) : typeof t.roomId == "string" ? `room:${t.roomId.slice(0, 8)}` : typeof t.pipelineId == "string" ? `pipeline:${t.pipelineId}` : e.eventType;
}
var I = 0;
function L(e) {
	return {
		id: `${e.eventType}-${e.timestamp}-${I++}`,
		actor: e.displayName,
		action: se[e.eventType] ?? e.eventType.split(".").pop() ?? "did",
		subject: ce(e),
		ticketId: typeof e.detail.ticketId == "string" ? e.detail.ticketId : void 0,
		timeLabel: oe(e.timestamp),
		kind: e.eventType.split(".")[0]
	};
}
function R(e) {
	return e.map(L);
}
function z(e) {
	return {
		id: e.id,
		filename: e.filename,
		progress: e.progress ?? 0,
		status: e.status,
		downloadUrl: e.downloadUrl,
		error: e.error
	};
}
function B(e) {
	return e.map(z);
}
function V(e, t) {
	return {
		id: e.clientId,
		displayName: e.displayName ?? e.clientId.slice(0, 12),
		isMuted: !e.audioOn,
		isLocal: t == null ? void 0 : e.clientId === t
	};
}
function H(e, t) {
	return e.map((e) => V(e, t));
}
function U(e) {
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
function W(e) {
	return e.map(U);
}
//#endregion
//#region src/integrations/realtime-modules/NetworkErrorBoundary.tsx
var G = class extends ee {
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
		return t ? t(e, this.reset) : /* @__PURE__ */ O("div", {
			"data-testid": "network-error-boundary-fallback",
			children: /* @__PURE__ */ O(o, {
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
function K({ connectionState: t, children: n, onRetry: r, reconnectingLabel: i, disconnectedTitle: a = "Disconnected", disconnectedDescription: c = "The connection to the server was lost. Check your network and try again.", retryLabel: l = "Try again", connectingPlaceholder: u, disconnectedFallback: d, className: f }) {
	return t === "connecting" ? /* @__PURE__ */ O("div", {
		"data-testid": "reconnecting-shim-connecting",
		className: f,
		children: u ?? /* @__PURE__ */ O(s, { height: 120 })
	}) : t === "disconnected" ? /* @__PURE__ */ O("div", {
		"data-testid": "reconnecting-shim-disconnected",
		className: f,
		children: d ?? /* @__PURE__ */ O(o, {
			icon: "📡",
			title: a,
			description: c,
			actionLabel: r ? l : void 0,
			onAction: r
		})
	}) : t === "reconnecting" ? /* @__PURE__ */ k("div", {
		"data-testid": "reconnecting-shim-reconnecting",
		className: e("relative", f),
		children: [/* @__PURE__ */ O("div", {
			className: "opacity-60 pointer-events-none",
			children: n
		}), /* @__PURE__ */ O(b, {
			show: !0,
			label: i
		})]
	}) : /* @__PURE__ */ O("div", {
		"data-testid": "reconnecting-shim-connected",
		className: f,
		children: n
	});
}
//#endregion
//#region src/integrations/realtime-modules/networkShim.tsx
function q(e, t) {
	return t ? /* @__PURE__ */ O(G, {
		title: t.errorTitle,
		description: t.errorDescription,
		retryLabel: t.retryLabel,
		onRetry: t.onRetry,
		onError: t.onError,
		fallback: t.errorFallback,
		children: /* @__PURE__ */ O(K, {
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
function le({ chat: e, presence: t, disabled: n, typingUsers: r, tone: i, wrapWithNetworkShim: a }) {
	let o = j(e.messages), s = r ?? t?.roster.filter((e) => e.metadata?.isTyping === !0).map((e) => e.metadata?.displayName ?? e.clientId.slice(0, 8)) ?? [], c = /* @__PURE__ */ O(_, {
		messages: o,
		onSend: e.sendMessage,
		disabled: n,
		typingUsers: s,
		tone: i
	});
	return /* @__PURE__ */ O(D, { children: q(c, a) });
}
//#endregion
//#region src/integrations/realtime-modules/WrappedPresencePanel.tsx
function ue({ presence: e, currentClientId: t, wrapWithNetworkShim: n }) {
	let r = e.roster.map((e) => ({
		clientId: e.clientId,
		status: e.status,
		metadata: e.metadata
	}));
	return /* @__PURE__ */ O(D, { children: q(/* @__PURE__ */ O(v, {
		users: r,
		currentClientId: t
	}), n) });
}
//#endregion
//#region src/integrations/realtime-modules/WrappedActivityPanel.tsx
function de({ activity: e, visibleCount: t, rotateMs: n, staggerMs: r, kindColors: i, className: a }) {
	let o = T(() => R(e.events), [e.events]);
	return /* @__PURE__ */ O(d, {
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
function fe({ reactions: e, ttlMs: t = 2500 }) {
	let [n, r] = E([]), i = e.reactions, a = te(/* @__PURE__ */ new Map());
	return w(() => {
		if (i.length === 0) return;
		let e = i[i.length - 1], n = F(e, i.length - 1), o = a.current;
		o.has(n.id) || (r((e) => e.some((e) => e.id === n.id) ? e : [...e, n]), o.set(n.id, setTimeout(() => {
			o.delete(n.id), r((e) => e.filter((e) => e.id !== n.id));
		}, t)));
	}, [i, t]), w(() => {
		let e = a.current;
		return () => {
			e.forEach((e) => clearTimeout(e)), e.clear();
		};
	}, []), /* @__PURE__ */ O(g, { reactions: n });
}
//#endregion
//#region src/integrations/realtime-modules/WrappedFileUploadDrop.tsx
function pe({ fileUpload: e, accept: t, maxSize: n, multiple: r, disabled: a, label: o, className: s, uploadMetadata: c, onError: l }) {
	let u = B(e.uploads);
	function d(t) {
		for (let n of t) e.upload(n, c ? { metadata: c } : void 0).catch((e) => {
			let t = e instanceof Error ? e.message : "Upload failed";
			l?.(t);
		});
	}
	return /* @__PURE__ */ k("div", { children: [/* @__PURE__ */ O(i, {
		accept: t,
		maxSize: n,
		multiple: r,
		disabled: a,
		label: o,
		className: s,
		onFiles: d,
		onError: l
	}), u.length > 0 && /* @__PURE__ */ O(me, {
		summaries: u,
		onDismiss: () => e.removeCompleted()
	})] });
}
function me({ summaries: e, onDismiss: t }) {
	return /* @__PURE__ */ O("ul", {
		className: "mt-2 p-0 list-none text-[13px]",
		children: e.map((e) => /* @__PURE__ */ k("li", {
			className: "flex items-center gap-2 py-1 border-b border-border",
			children: [
				/* @__PURE__ */ O("span", {
					className: "flex-1 overflow-hidden text-ellipsis whitespace-nowrap",
					children: e.filename
				}),
				/* @__PURE__ */ O("span", {
					className: `text-xs font-semibold ${he(e.status)}`,
					children: e.status === "uploading" ? `${e.progress}%` : e.status
				}),
				(e.status === "completed" || e.status === "clean") && e.downloadUrl && /* @__PURE__ */ O("a", {
					href: e.downloadUrl,
					target: "_blank",
					rel: "noreferrer",
					className: "text-xs text-info",
					children: "Download"
				}),
				(e.status === "failed" || e.status === "infected") && /* @__PURE__ */ O("button", {
					type: "button",
					onClick: t,
					className: "text-xs text-danger bg-transparent border-0 cursor-pointer p-0",
					children: "Dismiss"
				})
			]
		}, e.id))
	});
}
function he(e) {
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
function ge({ hangout: e, localClientId: t, videoElements: n, mode: r, spotlightContent: i, activeSpeakerId: a, speakerHysteresisMs: o, onParticipantClick: s, className: c }) {
	let l = H(e.participants, t), u = t == null ? null : l.find((e) => e.id === t) ?? null, d = t == null ? l : l.filter((e) => e.id !== t);
	function f(e) {
		return n ? e.map((e) => ({
			...e,
			videoElement: n[e.id] ?? e.videoElement
		})) : e;
	}
	return /* @__PURE__ */ O(S, {
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
function _e({ notifications: e, onItemClick: t, ...n }) {
	let r = W(e.notifications);
	return /* @__PURE__ */ O(f, {
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
function ve({ socket: e, ...t }) {
	return /* @__PURE__ */ O(l, {
		state: e.connectionState,
		...t
	});
}
//#endregion
//#region src/integrations/realtime-modules/CapabilityBoundary.tsx
function ye({ capability: e, loading: t, fallback: n, children: r }) {
	return e.isLoading ? /* @__PURE__ */ O(D, { children: t ?? null }) : e.enabled ? /* @__PURE__ */ O(D, { children: r }) : /* @__PURE__ */ O(D, { children: n ?? null });
}
//#endregion
//#region src/integrations/realtime-modules/HangoutRoomRow.tsx
function J({ slug: e, name: t, participantId: n, occupancy: r, subscribeRoomsIndex: i, onClick: a, onContextMenu: o, kebab: s, className: c, "data-testid": l = "room-row" }) {
	let d = ne(i ? e : null, { subscribeRoomsIndex: i }), f = i ? d.occupancy ?? null : r ?? null, h = f?.count ?? 0, g = f?.members ?? [], _ = T(() => n ? g.some((e) => e.participantId === n) : !1, [g, n]), v = _, y = T(() => g.slice(0, 3).map((e) => ({
		id: e.participantId,
		name: e.displayName ?? e.userId,
		online: !0
	})), [g]), b = null;
	return h > 1 ? b = /* @__PURE__ */ k(D, { children: [/* @__PURE__ */ O(u, {
		users: y,
		maxVisible: 3,
		size: 18
	}), /* @__PURE__ */ O(p, {
		variant: "count",
		value: h,
		color: "muted"
	})] }) : h === 1 && _ ? b = /* @__PURE__ */ O(p, {
		variant: "pulse",
		color: "accent",
		"aria-label": "Just you in this room",
		"data-testid": `${l}-self-pulse`
	}) : h === 1 && (b = /* @__PURE__ */ k(D, { children: [/* @__PURE__ */ O(u, {
		users: y,
		maxVisible: 1,
		size: 18
	}), /* @__PURE__ */ O(p, {
		variant: "count",
		value: 1,
		color: "muted"
	})] })), /* @__PURE__ */ O(m, {
		"data-testid": l,
		icon: /* @__PURE__ */ O("span", {
			"aria-hidden": "true",
			className: "font-semibold text-text-tertiary",
			children: "#"
		}),
		label: t,
		trailing: b,
		active: v,
		onClick: a,
		onContextMenu: o,
		kebab: s,
		"aria-label": `${t} room`,
		className: c,
		dataAttrs: {
			"data-room-slug": e,
			"data-room-name": t,
			"data-room-active-count": h,
			"data-joined": v ? "true" : "false"
		}
	});
}
//#endregion
//#region src/integrations/realtime-modules/NewHangoutRoomDialog.tsx
var Y = 3, X = 48;
function Z(e) {
	return e.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 48);
}
function be(e) {
	let t = e.trim();
	return t.length === 0 ? "Name is required." : t.length < Y ? `Name must be at least ${Y} characters.` : t.length > X ? `Name must be at most ${X} characters.` : null;
}
function Q({ open: e, onClose: r, onCreate: i, onCreated: o, defaultVisibility: s }) {
	let [c, l] = E(""), [u, d] = E(""), [f, p] = E(!1), [m, h] = E(!1), [g, _] = E(!1), [v, y] = E(null);
	w(() => {
		e && (l(""), d(""), p(!1), h(!1), _(!1), y(null));
	}, [e]);
	let b = T(() => be(c), [c]), x = T(() => Z(c), [c]), S = !b && !g;
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
				o?.(e), r();
			} catch (e) {
				y(e instanceof Error ? e.message : "Failed to create room."), _(!1);
			}
		}
	}
	return /* @__PURE__ */ O(a, {
		open: e,
		onClose: g ? () => {} : r,
		title: "New room",
		maxWidth: 440,
		rawChildren: !0,
		backdropTestId: "new-hangout-room-dialog",
		footer: null,
		children: /* @__PURE__ */ k("form", {
			onSubmit: C,
			className: "flex flex-col gap-4",
			children: [
				/* @__PURE__ */ k("label", {
					className: "flex flex-col gap-1",
					children: [
						/* @__PURE__ */ O("span", {
							className: "text-[12px] font-semibold text-text-primary",
							children: "Name"
						}),
						/* @__PURE__ */ O("input", {
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
						/* @__PURE__ */ k("div", {
							className: "flex items-center justify-between text-[11px] text-text-tertiary",
							children: [/* @__PURE__ */ O("span", {
								"data-testid": "new-hangout-room-slug-preview",
								children: x ? `#${x}` : "Slug preview appears here"
							}), /* @__PURE__ */ O("span", { children: `${c.trim().length}/${X}` })]
						}),
						b && c.length > 0 && /* @__PURE__ */ O("span", {
							"data-testid": "new-hangout-room-name-error",
							className: "text-[11px] text-danger-fg",
							children: b
						})
					]
				}),
				/* @__PURE__ */ k("label", {
					className: "flex flex-col gap-1",
					children: [/* @__PURE__ */ k("span", {
						className: "text-[12px] font-semibold text-text-primary",
						children: ["Description ", /* @__PURE__ */ O("span", {
							className: "font-normal text-text-tertiary",
							children: "(optional)"
						})]
					}), /* @__PURE__ */ O("textarea", {
						"data-testid": "new-hangout-room-description",
						value: u,
						onChange: (e) => d(e.target.value),
						placeholder: "What's this room for?",
						rows: 2,
						disabled: g,
						className: "w-full px-3 py-2 text-sm border border-border-emphasis rounded-md focus:outline-none focus:ring-2 focus:ring-info resize-none"
					})]
				}),
				/* @__PURE__ */ k("div", {
					className: "flex flex-col gap-3",
					children: [/* @__PURE__ */ k("label", {
						className: "flex items-center justify-between gap-3",
						children: [/* @__PURE__ */ k("span", {
							className: "flex flex-col",
							children: [/* @__PURE__ */ O("span", {
								className: "text-[13px] font-semibold text-text-primary",
								children: "Audio only"
							}), /* @__PURE__ */ O("span", {
								className: "text-[11px] text-text-tertiary",
								children: "Skip video tracks — voice-only room."
							})]
						}), /* @__PURE__ */ O(n, {
							checked: f,
							onChange: p,
							disabled: g,
							"aria-label": "Audio only",
							"data-testid": "new-hangout-room-audio-only"
						})]
					}), /* @__PURE__ */ k("label", {
						className: "flex items-center justify-between gap-3",
						children: [/* @__PURE__ */ k("span", {
							className: "flex flex-col",
							children: [/* @__PURE__ */ O("span", {
								className: "text-[13px] font-semibold text-text-primary",
								children: "Recording enabled"
							}), /* @__PURE__ */ O("span", {
								className: "text-[11px] text-text-tertiary",
								children: "Allow server-side recording of sessions."
							})]
						}), /* @__PURE__ */ O(n, {
							checked: m,
							onChange: h,
							disabled: g,
							"aria-label": "Recording enabled",
							"data-testid": "new-hangout-room-recording"
						})]
					})]
				}),
				v && /* @__PURE__ */ O("div", {
					"data-testid": "new-hangout-room-error",
					role: "alert",
					className: "text-[12px] text-danger-fg bg-danger-bg border border-danger-border rounded-md px-3 py-2",
					children: v
				}),
				/* @__PURE__ */ k("div", {
					className: "flex justify-end gap-2 pt-1",
					children: [/* @__PURE__ */ O(t, {
						type: "button",
						variant: "ghost",
						onClick: r,
						disabled: g,
						children: "Cancel"
					}), /* @__PURE__ */ O(t, {
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
function $({ rooms: e, occupancyFor: n, occupancyAdapter: i, participantId: a, onJoinRoom: s, onContextMenu: c, onBrowseAll: l, maxVisible: u = 10, title: d = "Rooms", storageKey: f, renderCreateDialog: p }) {
	let [g, _] = E(!1), v = () => _(!0), y = () => _(!1), b = T(() => e.rooms.filter((e) => e.state === "active"), [e.rooms]), x = T(() => b.slice(0, u), [b, u]), S = b.length - x.length;
	return /* @__PURE__ */ k(D, { children: [/* @__PURE__ */ k(h, {
		title: d,
		storageKey: f,
		actions: /* @__PURE__ */ O(r, {
			"aria-label": "New room",
			size: "sm",
			onClick: v,
			icon: /* @__PURE__ */ O("span", {
				"aria-hidden": "true",
				className: "text-[14px] leading-none font-bold",
				children: "+"
			}),
			"data-testid": "new-room-button"
		}),
		"data-testid": "rooms-section",
		children: [
			e.isLoading && /* @__PURE__ */ O("div", {
				className: "flex flex-col gap-1 px-1 py-1",
				"data-testid": "hangout-rooms-loading",
				children: [
					0,
					1,
					2
				].map((e) => /* @__PURE__ */ O("div", {
					"aria-hidden": "true",
					className: "h-7 rounded-md bg-surface-hover animate-pulse"
				}, e))
			}),
			!e.isLoading && e.error && /* @__PURE__ */ k("div", {
				role: "alert",
				"data-testid": "hangout-rooms-error",
				className: "mx-1 my-1 px-3 py-2 text-[12px] text-danger-fg bg-danger-bg border border-danger-border rounded-md flex items-center justify-between gap-2",
				children: [/* @__PURE__ */ O("span", {
					className: "truncate",
					children: "Couldn't load rooms."
				}), /* @__PURE__ */ O("button", {
					type: "button",
					onClick: () => void e.refetch(),
					className: "text-danger-fg underline hover:text-danger-fg cursor-pointer",
					children: "Retry"
				})]
			}),
			!e.isLoading && !e.error && b.length === 0 && /* @__PURE__ */ O(o, {
				testId: "hangout-rooms-empty",
				title: "No rooms yet",
				description: "Create one to start an ongoing hangout.",
				action: /* @__PURE__ */ O(t, {
					onClick: v,
					variant: "primary",
					size: "sm",
					children: "Create room"
				})
			}),
			!e.isLoading && !e.error && b.length > 0 && /* @__PURE__ */ k("div", {
				className: "flex flex-col gap-0.5",
				children: [x.map((e) => /* @__PURE__ */ O(J, {
					slug: e.slug,
					name: e.name,
					participantId: a,
					subscribeRoomsIndex: i,
					occupancy: i ? null : n?.(e.slug) ?? null,
					onClick: s ? () => s(e) : void 0,
					onContextMenu: c ? (t) => c(e, t) : void 0
				}, e.slug)), S > 0 && l && /* @__PURE__ */ O(m, {
					"data-testid": "hangout-rooms-browse-all",
					label: /* @__PURE__ */ k("span", {
						className: "text-[12px] text-neutral",
						children: [
							"Browse all (",
							b.length,
							")"
						]
					}),
					onClick: l
				})]
			})
		]
	}), p ? p({
		open: g,
		onClose: y
	}) : /* @__PURE__ */ O(Q, {
		open: g,
		onClose: y,
		onCreate: e.createRoom,
		onCreated: (e) => {
			s?.(e);
		}
	})] });
}
//#endregion
//#region src/integrations/realtime-modules/WrappedLVSHangoutLayout.tsx
function xe({ stream: e, displayName: t }) {
	return e ? /* @__PURE__ */ O("video", {
		autoPlay: !0,
		playsInline: !0,
		muted: !0,
		ref: (t) => {
			t && t.srcObject !== e && (t.srcObject = e);
		},
		className: "w-full h-full object-cover scale-x-[-1]"
	}) : /* @__PURE__ */ O("div", {
		className: "w-full h-full grid place-items-center bg-surface-emphasis",
		"data-testid": "local-camera-avatar",
		children: /* @__PURE__ */ O(c, {
			name: t,
			size: 64
		})
	});
}
function Se(e, t) {
	let n = e.isLocal, r = n ? t ?? e.displayName ?? "You" : e.displayName || e.participantId.slice(0, 8), i = e.streams[0], a = e.screenStream, o = n ? /* @__PURE__ */ O(xe, {
		stream: i,
		displayName: r
	}) : /* @__PURE__ */ O(x, {
		stream: i,
		displayName: r,
		cameraOn: e.hasVideo
	}), s = a ? /* @__PURE__ */ O(y, {
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
function Ce({ stageToken: e, participantId: t, userId: n, localClientId: r, getStageToken: i, overlay: a, spotlightContent: o, onParticipantClick: s, mode: c = "auto", activeSpeakerStrategy: l = "audio-level", localTileLabel: u, showLocalAsTile: d = !0, className: f, "data-testid": p }) {
	let m = re({
		stageToken: e,
		participantId: t,
		userId: n ?? t.slice(0, 8),
		getAuthToken: i
	}), h = T(() => m.participants.filter((e) => d || !e.isLocal).map((e) => Se(e, u)), [
		m.participants,
		d,
		u
	]), g = m.participants.filter((e) => !e.isLocal).length, _ = {
		connectionState: m.connectionState,
		error: m.error,
		participantCount: m.participants.length,
		remoteCount: g
	};
	return /* @__PURE__ */ k("div", {
		"data-testid": p,
		className: `relative flex-1 min-h-0 ${f ?? ""}`,
		children: [/* @__PURE__ */ O(S, {
			participants: h,
			localParticipant: null,
			mode: c,
			spotlightContent: o,
			onParticipantClick: s,
			className: "h-full"
		}), a && /* @__PURE__ */ O("div", {
			className: "absolute inset-0 pointer-events-none z-10",
			"data-testid": "wrapped-overlay-slot",
			children: /* @__PURE__ */ O("div", {
				className: "pointer-events-auto",
				children: a(_)
			})
		})]
	});
}
//#endregion
//#region src/integrations/realtime-modules/WrappedHangoutRoomsList.tsx
function we({ hangoutRooms: e, subscribeRoomsIndex: t, occupancyFor: n, participantId: r, onJoin: i, onContextMenu: a, onBrowseAll: o, maxVisible: s, title: c, storageKey: l, renderEmpty: u, renderCreateDialog: d, wrapWithNetworkShim: f }) {
	return e.rooms.filter((e) => e.state === "active").length === 0 && !e.isLoading && !e.error && u ? /* @__PURE__ */ O("div", {
		"data-testid": "wrapped-hangout-rooms-empty-slot",
		children: u
	}) : /* @__PURE__ */ O(D, { children: q(/* @__PURE__ */ O($, {
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
function Te({ controller: e, ...t }) {
	return /* @__PURE__ */ O(C, {
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
export { ye as CapabilityBoundary, J as HangoutRoomRow, $ as HangoutRoomsSection, G as NetworkErrorBoundary, Q as NewHangoutRoomDialog, K as ReconnectingShim, de as WrappedActivityPanel, le as WrappedChatPanel, ve as WrappedConnectionPill, pe as WrappedFileUploadDrop, ge as WrappedHangoutLayout, we as WrappedHangoutRoomsList, Ce as WrappedLVSHangoutLayout, Te as WrappedMediaEffectsTray, _e as WrappedNotificationCenter, ue as WrappedPresencePanel, fe as WrappedReactionsOverlay, L as adaptActivityEvent, R as adaptActivityEvents, A as adaptChatMessage, j as adaptChatMessages, z as adaptFileUploadState, B as adaptFileUploads, V as adaptHangoutParticipant, H as adaptHangoutParticipants, U as adaptNotification, W as adaptNotifications, M as adaptPresenceEntry, ie as adaptPresenceRoster, F as adaptReaction, ae as adaptReactions, q as applyNetworkShim, Z as slugifyRoomName };
