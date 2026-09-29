import { t as e } from "./cn-DhjIN-s0.js";
import { _ as t } from "./overlayStack-DHAs60_m.js";
import { t as n } from "./IconButton-DDeXW3mZ.js";
import { t as r } from "./Badge-t9rXTGOV.js";
import { t as i } from "./Modal-2CidNxzH.js";
import { t as a } from "./EmptyState-DtHxzyCi.js";
import { t as o } from "./SkeletonCard-CGe8XFPB.js";
import { n as s } from "./Slider-izEq1bGO.js";
import { t as c } from "./Avatar-Chz9yWlo.js";
import { n as l, t as u } from "./NotificationCenter-CdO8wbwB.js";
import { t as d } from "./PresenceAvatars-D8NI7a-T.js";
import { t as f } from "./FileUploadDrop-Drndcvb1.js";
import { t as p } from "./ActivityFeed-BC0RoWoK.js";
import { n as m, r as h, t as g } from "./ReactionsOverlay-Ob1ecsgg.js";
import { d as _, n as v, t as y, u as b } from "./ConversationSurface-CrWOKwFx.js";
import { C as x, b as S, g as C, i as w, m as T, t as E, v as D, y as ee } from "./AudioVideoSettingsForm-DFdlJ2vD.js";
import { a as te } from "./useDocumentImageUpload-z4XSDbOv.js";
import { Component as ne, createContext as O, useCallback as k, useContext as re, useEffect as A, useMemo as j, useRef as M, useState as N } from "react";
import { Fragment as P, jsx as F, jsxs as I } from "react/jsx-runtime";
//#region src/integrations/realtime/HangoutRoomRow.tsx
function ie(e) {
	function t(t) {
		return ae(e, t);
	}
	return t;
}
function ae(e, { slug: t, name: n, participantId: i, occupancy: a, subscribeRoomsIndex: o, onClick: s, onContextMenu: c, onOpenConversation: l, kebab: u, className: f, "data-testid": p = "room-row" }) {
	let h = e.useRoomOccupancy(o ? t : null, { subscribeRoomsIndex: o }), g = o ? h.occupancy ?? null : a ?? null, _ = g?.count ?? 0, v = g?.members ?? [], y = j(() => i ? v.some((e) => e.participantId === i) : !1, [v, i]), b = y, x = j(() => v.slice(0, 3).map((e) => ({
		id: e.participantId,
		name: e.displayName || e.userId,
		online: !0
	})), [v]), S = null;
	_ > 1 ? S = /* @__PURE__ */ I(P, { children: [/* @__PURE__ */ F(d, {
		users: x,
		maxVisible: 3,
		size: 18
	}), /* @__PURE__ */ F(r, {
		variant: "count",
		value: _,
		color: "muted"
	})] }) : _ === 1 && y ? S = /* @__PURE__ */ F(r, {
		variant: "pulse",
		color: "accent",
		"aria-label": "Just you in this room",
		"data-testid": `${p}-self-pulse`
	}) : _ === 1 && (S = /* @__PURE__ */ I(P, { children: [/* @__PURE__ */ F(d, {
		users: x,
		maxVisible: 1,
		size: 18
	}), /* @__PURE__ */ F(r, {
		variant: "count",
		value: 1,
		color: "muted"
	})] }));
	let C = l ? /* @__PURE__ */ F("button", {
		type: "button",
		"aria-label": `Open the ${n} conversation`,
		title: "Open conversation",
		"data-testid": `${p}-open-conversation`,
		onClick: (e) => {
			e.stopPropagation(), l();
		},
		className: "grid h-5 w-5 place-items-center rounded bg-transparent text-[11px] text-text-tertiary opacity-0 transition-opacity hover:bg-surface-hover hover:text-text-primary focus:opacity-100 group-hover:opacity-100",
		children: "💬"
	}) : null;
	return /* @__PURE__ */ F(m, {
		"data-testid": p,
		icon: /* @__PURE__ */ F("span", {
			"aria-hidden": "true",
			className: "font-semibold text-text-tertiary",
			children: "#"
		}),
		label: n,
		trailing: S,
		active: b,
		onClick: s,
		onContextMenu: c,
		kebab: u ?? C,
		"aria-label": `${n} room`,
		className: f,
		dataAttrs: {
			"data-room-slug": t,
			"data-room-name": n,
			"data-room-active-count": _,
			"data-joined": b ? "true" : "false"
		}
	});
}
//#endregion
//#region src/integrations/realtime-modules/NewHangoutRoomDialog.tsx
var oe = 3, L = 48;
function se(e) {
	return e.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 48);
}
function ce(e) {
	let t = e.trim();
	return t.length === 0 ? "Name is required." : t.length < oe ? `Name must be at least ${oe} characters.` : t.length > L ? `Name must be at most ${L} characters.` : null;
}
function R({ open: e, onClose: n, onCreate: r, onCreated: a, defaultVisibility: o }) {
	let [c, l] = N(""), [u, d] = N(""), [f, p] = N(!1), [m, h] = N(!1), [g, _] = N(!1), [v, y] = N(null);
	A(() => {
		e && (l(""), d(""), p(!1), h(!1), _(!1), y(null));
	}, [e]);
	let b = j(() => ce(c), [c]), x = j(() => se(c), [c]), S = !b && !g;
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
	return /* @__PURE__ */ F(i, {
		open: e,
		onClose: g ? () => {} : n,
		title: "New room",
		maxWidth: 440,
		rawChildren: !0,
		backdropTestId: "new-hangout-room-dialog",
		footer: null,
		children: /* @__PURE__ */ I("form", {
			onSubmit: C,
			className: "flex flex-col gap-4",
			children: [
				/* @__PURE__ */ I("label", {
					className: "flex flex-col gap-1",
					children: [
						/* @__PURE__ */ F("span", {
							className: "text-[12px] font-semibold text-text-primary",
							children: "Name"
						}),
						/* @__PURE__ */ F("input", {
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
						/* @__PURE__ */ I("div", {
							className: "flex items-center justify-between text-[11px] text-text-tertiary",
							children: [/* @__PURE__ */ F("span", {
								"data-testid": "new-hangout-room-slug-preview",
								children: x ? `#${x}` : "Slug preview appears here"
							}), /* @__PURE__ */ F("span", { children: `${c.trim().length}/${L}` })]
						}),
						b && c.length > 0 && /* @__PURE__ */ F("span", {
							"data-testid": "new-hangout-room-name-error",
							className: "text-[11px] text-danger-fg",
							children: b
						})
					]
				}),
				/* @__PURE__ */ I("label", {
					className: "flex flex-col gap-1",
					children: [/* @__PURE__ */ I("span", {
						className: "text-[12px] font-semibold text-text-primary",
						children: ["Description ", /* @__PURE__ */ F("span", {
							className: "font-normal text-text-tertiary",
							children: "(optional)"
						})]
					}), /* @__PURE__ */ F("textarea", {
						"data-testid": "new-hangout-room-description",
						value: u,
						onChange: (e) => d(e.target.value),
						placeholder: "What's this room for?",
						rows: 2,
						disabled: g,
						className: "w-full px-3 py-2 text-sm border border-border-emphasis rounded-md focus:outline-none focus:ring-2 focus:ring-info resize-none"
					})]
				}),
				/* @__PURE__ */ I("div", {
					className: "flex flex-col gap-3",
					children: [/* @__PURE__ */ I("label", {
						className: "flex items-center justify-between gap-3",
						children: [/* @__PURE__ */ I("span", {
							className: "flex flex-col",
							children: [/* @__PURE__ */ F("span", {
								className: "text-[13px] font-semibold text-text-primary",
								children: "Audio only"
							}), /* @__PURE__ */ F("span", {
								className: "text-[11px] text-text-tertiary",
								children: "Skip video tracks — voice-only room."
							})]
						}), /* @__PURE__ */ F(s, {
							checked: f,
							onChange: p,
							disabled: g,
							"aria-label": "Audio only",
							"data-testid": "new-hangout-room-audio-only"
						})]
					}), /* @__PURE__ */ I("label", {
						className: "flex items-center justify-between gap-3",
						children: [/* @__PURE__ */ I("span", {
							className: "flex flex-col",
							children: [/* @__PURE__ */ F("span", {
								className: "text-[13px] font-semibold text-text-primary",
								children: "Recording enabled"
							}), /* @__PURE__ */ F("span", {
								className: "text-[11px] text-text-tertiary",
								children: "Allow server-side recording of sessions."
							})]
						}), /* @__PURE__ */ F(s, {
							checked: m,
							onChange: h,
							disabled: g,
							"aria-label": "Recording enabled",
							"data-testid": "new-hangout-room-recording"
						})]
					})]
				}),
				v && /* @__PURE__ */ F("div", {
					"data-testid": "new-hangout-room-error",
					role: "alert",
					className: "text-[12px] text-danger-fg bg-danger-bg border border-danger-border rounded-md px-3 py-2",
					children: v
				}),
				/* @__PURE__ */ I("div", {
					className: "flex justify-end gap-2 pt-1",
					children: [/* @__PURE__ */ F(t, {
						type: "button",
						variant: "ghost",
						onClick: n,
						disabled: g,
						children: "Cancel"
					}), /* @__PURE__ */ F(t, {
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
function z(e) {
	function t(t) {
		return B(e, t);
	}
	return t;
}
function B(e, { rooms: r, occupancyFor: i, occupancyAdapter: o, participantId: s, onJoinRoom: c, onOpenConversation: l, onContextMenu: u, onBrowseAll: d, maxVisible: f = 10, title: p = "Rooms", storageKey: g, renderCreateDialog: _ }) {
	let [v, y] = N(!1), b = () => y(!0), x = () => y(!1), S = j(() => {
		let e = /* @__PURE__ */ new Set(), t = [];
		for (let n of r.rooms) n.state === "active" && (e.has(n.slug) || (e.add(n.slug), t.push(n)));
		return t;
	}, [r.rooms]), C = j(() => S.slice(0, f), [S, f]), w = S.length - C.length;
	return /* @__PURE__ */ I(P, { children: [/* @__PURE__ */ I(h, {
		title: p,
		storageKey: g,
		actions: /* @__PURE__ */ F(n, {
			"aria-label": "New room",
			size: "sm",
			onClick: b,
			icon: /* @__PURE__ */ F("span", {
				"aria-hidden": "true",
				className: "text-[14px] leading-none font-bold",
				children: "+"
			}),
			"data-testid": "new-room-button"
		}),
		"data-testid": "rooms-section",
		children: [
			r.isLoading && /* @__PURE__ */ F("div", {
				className: "flex flex-col gap-1 px-1 py-1",
				"data-testid": "hangout-rooms-loading",
				children: [
					0,
					1,
					2
				].map((e) => /* @__PURE__ */ F("div", {
					"aria-hidden": "true",
					className: "h-7 rounded-md bg-surface-hover animate-pulse"
				}, e))
			}),
			!r.isLoading && r.error && /* @__PURE__ */ I("div", {
				role: "alert",
				"data-testid": "hangout-rooms-error",
				className: "mx-1 my-1 px-3 py-2 text-[12px] text-danger-fg bg-danger-bg border border-danger-border rounded-md flex items-center justify-between gap-2",
				children: [/* @__PURE__ */ F("span", {
					className: "truncate",
					children: "Couldn't load rooms."
				}), /* @__PURE__ */ F("button", {
					type: "button",
					onClick: () => void r.refetch(),
					className: "text-danger-fg underline hover:text-danger-fg cursor-pointer",
					children: "Retry"
				})]
			}),
			!r.isLoading && !r.error && S.length === 0 && /* @__PURE__ */ F(a, {
				testId: "hangout-rooms-empty",
				title: "No rooms yet",
				description: "Create one to start an ongoing hangout.",
				action: /* @__PURE__ */ F(t, {
					onClick: b,
					variant: "primary",
					size: "sm",
					children: "Create room"
				})
			}),
			!r.isLoading && !r.error && S.length > 0 && /* @__PURE__ */ I("div", {
				className: "flex flex-col gap-0.5",
				children: [C.map((t) => /* @__PURE__ */ F(e, {
					slug: t.slug,
					name: t.name,
					participantId: s,
					subscribeRoomsIndex: o,
					occupancy: o ? null : i?.(t.slug) ?? null,
					onClick: c ? () => c(t) : void 0,
					onOpenConversation: l ? () => l(t) : void 0,
					onContextMenu: u ? (e) => u(t, e) : void 0
				}, t.slug)), w > 0 && d && /* @__PURE__ */ F(m, {
					"data-testid": "hangout-rooms-browse-all",
					label: /* @__PURE__ */ I("span", {
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
	}), _ ? _({
		open: v,
		onClose: x
	}) : /* @__PURE__ */ F(R, {
		open: v,
		onClose: x,
		onCreate: r.createRoom,
		onCreated: (e) => {
			c?.(e);
		}
	})] });
}
//#endregion
//#region src/integrations/realtime-modules/NetworkErrorBoundary.tsx
var V = class extends ne {
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
		return t ? t(e, this.reset) : /* @__PURE__ */ F("div", {
			"data-testid": "network-error-boundary-fallback",
			children: /* @__PURE__ */ F(a, {
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
function H({ connectionState: t, children: n, onRetry: r, reconnectingLabel: i, disconnectedTitle: s = "Disconnected", disconnectedDescription: c = "The connection to the server was lost. Check your network and try again.", retryLabel: l = "Try again", connectingPlaceholder: u, disconnectedFallback: d, className: f }) {
	return t === "connecting" ? /* @__PURE__ */ F("div", {
		"data-testid": "reconnecting-shim-connecting",
		className: f,
		children: u ?? /* @__PURE__ */ F(o, { height: 120 })
	}) : t === "disconnected" ? /* @__PURE__ */ F("div", {
		"data-testid": "reconnecting-shim-disconnected",
		className: f,
		children: d ?? /* @__PURE__ */ F(a, {
			icon: "📡",
			title: s,
			description: c,
			actionLabel: r ? l : void 0,
			onAction: r
		})
	}) : t === "reconnecting" ? /* @__PURE__ */ I("div", {
		"data-testid": "reconnecting-shim-reconnecting",
		className: e("relative", f),
		children: [/* @__PURE__ */ F("div", {
			className: "opacity-60 pointer-events-none",
			children: n
		}), /* @__PURE__ */ F(D, {
			show: !0,
			label: i
		})]
	}) : /* @__PURE__ */ F("div", {
		"data-testid": "reconnecting-shim-connected",
		className: f,
		children: n
	});
}
//#endregion
//#region src/integrations/realtime-modules/networkShim.tsx
function U(e, t) {
	return t ? /* @__PURE__ */ F(V, {
		title: t.errorTitle,
		description: t.errorDescription,
		retryLabel: t.retryLabel,
		onRetry: t.onRetry,
		onError: t.onError,
		fallback: t.errorFallback,
		children: /* @__PURE__ */ F(H, {
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
function W(e) {
	function t(t) {
		return G(e, t);
	}
	return t;
}
function G(e, { hangoutRooms: t, subscribeRoomsIndex: n, occupancyFor: r, participantId: i, onJoin: a, onContextMenu: o, onBrowseAll: s, maxVisible: c, title: l, storageKey: u, renderEmpty: d, renderCreateDialog: f, wrapWithNetworkShim: p }) {
	return t.rooms.filter((e) => e.state === "active").length === 0 && !t.isLoading && !t.error && d ? /* @__PURE__ */ F("div", {
		"data-testid": "wrapped-hangout-rooms-empty-slot",
		children: d
	}) : /* @__PURE__ */ F(P, { children: U(/* @__PURE__ */ F(e, {
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
var K = [
	"chat",
	"presence",
	"video",
	"audio",
	"files",
	"reactions",
	"recordings"
], q = {
	chat: !0,
	presence: !0
}, J = O(null);
function Y(e) {
	function t(t) {
		return le(e, t);
	}
	return t;
}
function le(e, { capabilities: t = q, channel: n, children: r }) {
	let i = j(() => K.filter((e) => t[e] === !0), [t]), { enabled: a, isLoading: o } = e.useCapabilities(i, n), s = j(() => {
		let e = {}, n = {}, r = {};
		for (let i of K) e[i] = t[i] === !0, n[i] = a[i] ?? !1, r[i] = e[i] && n[i];
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
	return /* @__PURE__ */ F(J.Provider, {
		value: s,
		children: r
	});
}
function X() {
	return re(J) ?? {
		can: Object.fromEntries(K.map((e) => [e, !1])),
		declared: Object.fromEntries(K.map((e) => [e, !1])),
		provisioned: Object.fromEntries(K.map((e) => [e, !1])),
		isLoading: !1
	};
}
function ue({ need: e, children: t, fallback: n = null }) {
	let { can: r } = X(), i = (Array.isArray(e) ? e : [e]).every((e) => r[e]);
	return /* @__PURE__ */ F(P, { children: i ? t : n });
}
//#endregion
//#region src/integrations/realtime/WrappedConversationSurface.tsx
var Z = {
	files: "conversation.files",
	documents: "conversation.documents",
	pins: "conversation.pins",
	mentions: "conversation.mentions",
	calls: "conversation.calls"
};
function de(e = y, t = {}) {
	return e.filter((e) => e !== "chat" && e !== "members").map((e) => t[e] ?? Z[e]);
}
function Q(e) {
	return (t) => fe(e, t);
}
function fe(e, t) {
	let { channel: n = null, hasDocuments: r = !0, from: i = y } = t;
	return i.filter((t) => t === "mentions" ? !1 : t === "documents" ? r : t !== "calls" || !!e.lobbyForChannel(n));
}
function pe({ declare: e = y, capabilities: t, capabilitiesError: n, capabilityNames: r = {}, children: i, ...a }) {
	let o = j(() => {
		let i = r;
		return e.filter((e) => e === "chat" || e === "members" || !t || n ? !0 : t[i[e] ?? Z[e]] === !0);
	}, [
		e,
		t,
		n,
		r
	]);
	return /* @__PURE__ */ F(v, {
		...a,
		features: o,
		children: i
	});
}
//#endregion
//#region src/integrations/realtime/WrappedStreamStage.tsx
function me(e, { channelArn: t, excludeParticipantId: n, getAuthToken: r, baseUrl: i, onStatusChange: a, ...o }) {
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
	return A(() => {
		a?.({
			mode: "realtime",
			live: c,
			error: s.error
		});
	}, [
		c,
		s.error,
		a
	]), /* @__PURE__ */ F(w, {
		...o,
		live: c,
		stream: s.stream,
		...l === null ? {} : { viewerCount: l }
	});
}
function he(e, { channelArn: t, playbackToken: n, baseUrl: r, onStatusChange: i, ...a }) {
	let o = e.useLVSLiveHls({
		channelArn: t,
		playbackToken: n,
		baseUrl: r
	}), { viewerCount: s } = e.useLVSViewerCount({
		channelArn: t,
		baseUrl: r,
		playbackToken: n
	});
	return A(() => {
		i?.({
			mode: "near-realtime",
			live: o.ready,
			error: null
		});
	}, [o.ready, i]), /* @__PURE__ */ F(w, {
		...a,
		live: o.ready,
		playlistUrl: o.playlistUrl,
		...s === null ? {} : { viewerCount: s }
	});
}
function ge(e) {
	function t(t) {
		return me(e, t);
	}
	function n(t) {
		return he(e, t);
	}
	function r({ mode: e = "near-realtime", ...r }) {
		return F(e === "realtime" ? t : n, { ...r });
	}
	return r;
}
//#endregion
//#region src/integrations/realtime/WrappedLVSHangoutLayout.tsx
function _e({ stream: e, displayName: t }) {
	return e ? /* @__PURE__ */ F("video", {
		autoPlay: !0,
		playsInline: !0,
		muted: !0,
		ref: (t) => {
			t && t.srcObject !== e && (t.srcObject = e);
		},
		className: "w-full h-full object-cover scale-x-[-1]"
	}) : /* @__PURE__ */ F("div", {
		className: "w-full h-full grid place-items-center bg-surface-emphasis",
		"data-testid": "local-camera-avatar",
		children: /* @__PURE__ */ F(c, {
			name: t,
			size: 64
		})
	});
}
function ve(e, t) {
	let n = e.isLocal, r = n ? t ?? e.displayName ?? "You" : e.displayName || e.participantId.slice(0, 8), i = e.streams[0], a = e.screenStream, o = n ? /* @__PURE__ */ F(_e, {
		stream: i,
		displayName: r
	}) : /* @__PURE__ */ F(ee, {
		stream: i,
		displayName: r,
		cameraOn: e.hasVideo
	}), s = a ? /* @__PURE__ */ F(S, {
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
function ye(e) {
	function t(t) {
		return be(e, t);
	}
	return t;
}
function be(e, { stageToken: t, participantId: n, userId: r, localClientId: i, getStageToken: a, overlay: o, spotlightContent: s, onParticipantClick: c, mode: l = "auto", activeSpeakerStrategy: u = "audio-level", localTileLabel: d, showLocalAsTile: f = !0, className: p, "data-testid": m }) {
	let h = e.useLVSHangout({
		stageToken: t,
		participantId: n,
		userId: r ?? n.slice(0, 8),
		getAuthToken: a
	}), g = j(() => h.participants.filter((e) => f || !e.isLocal).map((e) => ve(e, d)), [
		h.participants,
		f,
		d
	]), _ = h.participants.filter((e) => !e.isLocal).length, v = {
		connectionState: h.connectionState,
		error: h.error,
		participantCount: h.participants.length,
		remoteCount: _
	};
	return /* @__PURE__ */ I("div", {
		"data-testid": m,
		className: `relative flex-1 min-h-0 ${p ?? ""}`,
		children: [/* @__PURE__ */ F(x, {
			participants: g,
			localParticipant: null,
			mode: l,
			spotlightContent: s,
			onParticipantClick: c,
			className: "h-full"
		}), o && /* @__PURE__ */ F("div", {
			className: "absolute inset-0 pointer-events-none z-10",
			"data-testid": "wrapped-overlay-slot",
			children: /* @__PURE__ */ F("div", {
				className: "pointer-events-auto",
				children: o(v)
			})
		})]
	});
}
//#endregion
//#region src/integrations/realtime/createRealtimeIntegrations.tsx
function xe(e) {
	let t = ie(e), n = z(t);
	return {
		HangoutRoomRow: t,
		HangoutRoomsSection: n,
		WrappedHangoutRoomsList: W(n),
		RealtimeCapabilityProvider: Y(e),
		conversationFeaturesFor: Q(e),
		WrappedStreamStage: ge(e),
		WrappedLVSHangoutLayout: ye(e)
	};
}
var Se = O(null), Ce = /* @__PURE__ */ new WeakMap();
function we(e) {
	let t = Ce.get(e);
	return t || (t = xe(e), Ce.set(e, t)), t;
}
function Te({ modules: e, children: t }) {
	let n = j(() => we(e), [e]);
	return /* @__PURE__ */ F(Se.Provider, {
		value: n,
		children: t
	});
}
function Ee() {
	let e = re(Se);
	if (!e) throw Error("useRealtimeIntegrations() needs a <RealtimeIntegrationsProvider modules={…}> above it.");
	return e;
}
//#endregion
//#region src/integrations/realtime-modules/adapters.ts
function $(e) {
	return typeof e == "string" ? e : void 0;
}
function De(e) {
	if (!e || typeof e != "object") return null;
	let t = e;
	return typeof t.messageId != "string" || !t.messageId ? null : {
		messageId: t.messageId,
		author: $(t.author) ?? "Unknown",
		text: $(t.text) ?? "",
		...$(t.timestamp) ? { timestamp: t.timestamp } : {}
	};
}
function Oe(e) {
	let t = e.metadata?.attachments, n = Array.isArray(t) ? t.filter((e) => !!e && typeof e == "object" && typeof e.url == "string" && typeof e.id == "string") : void 0, r;
	if (e.metadata) {
		let { replyTo: t, ...n } = e.metadata, i = { ...n }, a = De(t);
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
function ke(e) {
	return e.map(Oe);
}
function Ae(e) {
	return {
		id: $(e.metadata?.userId) || e.clientId,
		name: $(e.metadata?.displayName) ?? e.clientId.slice(0, 12),
		avatarUrl: $(e.metadata?.avatarUrl),
		online: e.status !== "offline",
		...e.status === "away" || e.status === "busy" ? { idle: !0 } : {}
	};
}
function je(e) {
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
var Me = [
	15,
	25,
	35,
	45,
	55,
	65,
	75,
	85
], Ne = [
	20,
	35,
	50,
	65,
	80
];
function Pe(e, t) {
	let n = Me[t % Me.length] ?? 50, r = Ne[Math.floor(t / Me.length) % Ne.length] ?? 50, i = e.position != null && typeof e.position == "object" ? e.position : null;
	return {
		id: e.id,
		emoji: e.emoji,
		x: i?.x ?? n,
		y: i?.y ?? r,
		timestamp: e.timestamp
	};
}
function Fe(e) {
	return e.map(Pe);
}
function Ie(e, t) {
	return (e.reactionsFor ? e.reactionsFor(t) : e.reactions.filter((e) => e.targetId === t)).map((e) => ({
		emoji: e.emoji,
		userId: e.userId ?? e.clientId,
		displayName: e.displayName
	}));
}
function Le(e) {
	try {
		let t = Date.now() - new Date(e).getTime(), n = Math.floor(t / 1e3);
		return n < 60 ? "just now" : n < 3600 ? `${Math.floor(n / 60)}m ago` : n < 86400 ? `${Math.floor(n / 3600)}h ago` : e.slice(0, 10);
	} catch {
		return "";
	}
}
var Re = {
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
function ze(e) {
	let t = e.detail;
	return typeof t.subject == "string" ? t.subject : typeof t.contentId == "string" ? t.contentId.slice(0, 12) : typeof t.roomId == "string" ? `room:${t.roomId.slice(0, 8)}` : typeof t.pipelineId == "string" ? `pipeline:${t.pipelineId}` : e.eventType;
}
function Be(e, t) {
	return [
		e.eventType,
		e.timestamp,
		e.userId ?? e.displayName,
		t
	].join("|");
}
function Ve(e) {
	return {
		id: Be(e, ze(e)),
		actor: e.displayName,
		action: Re[e.eventType] ?? e.eventType.split(".").pop() ?? "did",
		subject: ze(e),
		ticketId: typeof e.detail.ticketId == "string" ? e.detail.ticketId : void 0,
		timeLabel: Le(e.timestamp),
		kind: e.eventType.split(".")[0]
	};
}
function He(e) {
	let t = /* @__PURE__ */ new Map();
	return e.map((e) => {
		let n = Ve(e), r = t.get(n.id) ?? 0;
		return t.set(n.id, r + 1), r === 0 ? n : {
			...n,
			id: `${n.id}#${r}`
		};
	});
}
function Ue(e) {
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
function We(e) {
	return e.map(Ue);
}
function Ge(e, t, n) {
	return {
		id: e.clientId,
		displayName: e.displayName || e.clientId.slice(0, 12),
		isMuted: !e.audioOn,
		isLocal: t == null ? void 0 : e.clientId === t,
		...n ? { avatarUrl: n } : {}
	};
}
function Ke(e, t, n) {
	return e.map((e) => Ge(e, t, n?.[e.clientId]));
}
function qe(e) {
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
function Je(e) {
	return e.map(qe);
}
//#endregion
//#region src/integrations/realtime-modules/WrappedChatPanel.tsx
function Ye({ chat: e, presence: t, upload: n, reactions: r, pins: i, currentActor: a, currentUserId: o, displayName: s, avatarUrl: c, sendMetadata: l, publishTyping: u, attachmentSrc: d, onOpenAttachment: f, acceptFiles: p, maxFileSize: m, onFileError: h, disabled: g, typingUsers: v, tone: y, fill: b, showHeader: x, loadMoreHistory: S = !1, joinHistoryLimit: C = 20, historyPageSize: w = 50, onLoadMore: T, hasMore: E, loadingMore: D, composer: ee, emojis: te, onReply: ne, onJumpToMessage: O, highlightedMessageId: re, documentEditors: I, callParticipants: ie, onJoinCall: ae, onOpenDocument: oe, wrapWithNetworkShim: L }) {
	let se = j(() => ke(e.messages), [e.messages]), ce = v ?? t?.roster.filter((e) => {
		if (e.metadata?.isTyping !== !0) return !1;
		let t = e.metadata?.userId;
		return o && typeof t == "string" ? t !== o : !a || e.clientId !== a;
	}).map((e) => e.metadata?.displayName ?? e.clientId.slice(0, 8)) ?? [], R = e.sendMessage, z = k((e) => {
		let t = { ...l ?? {} };
		s && (t.displayName = s), c && (t.avatarUrl = c), Object.keys(t).length > 0 ? R(e, t) : R(e);
	}, [
		R,
		l,
		s,
		c
	]), B = t?.updateMetadata, V = (u ?? !0) && !!B, H = k((e) => B?.({ isTyping: e }), [B]), W = e.loadHistory, [G, K] = N(C), [q, J] = N(!1), Y = e.messages.length, le = M(Y);
	A(() => {
		Y !== le.current && (le.current = Y, J(!1));
	}, [Y]);
	let X = M(G);
	X.current = G;
	let ue = k(() => {
		let e = X.current + w;
		X.current = e, K(e), J(!0), W(e);
	}, [W, w]), Z = T ? {
		onLoadMore: T,
		hasMore: E,
		loadingMore: D
	} : S ? {
		onLoadMore: ue,
		hasMore: E ?? Y >= G,
		loadingMore: D ?? q
	} : {}, de = j(() => r ? (e) => Ie(r, e) : void 0, [r]), Q = j(() => {
		if (!r || !o) return;
		let { toggle: e, react: t, unreact: n } = r;
		return e ? (t, n) => e(n, {
			targetId: t,
			userId: o
		}) : (e, i) => {
			Ie(r, e).some((e) => e.emoji === i && e.userId === o) && n ? n(i, { targetId: e }) : t(i, { targetId: e });
		};
	}, [r, o]), fe = k((e) => {
		if (!i) return;
		let t = e.id ?? "";
		t && (i.pinnedIds.has(t) ? i.unpin(t) : i.pin({
			messageId: t,
			text: e.content,
			author: e.displayName ?? "Unknown"
		}));
	}, [i]), pe = /* @__PURE__ */ F(_, {
		messages: se,
		onSend: z,
		disabled: g,
		typingUsers: ce,
		tone: y,
		fill: b,
		showHeader: x,
		composer: ee,
		emojis: te,
		...Z,
		...V ? { onTyping: H } : {},
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
		onToggleReaction: Q,
		...i ? {
			pinnedMessageIds: i.pinnedIds,
			onTogglePin: fe
		} : {},
		onReply: ne,
		onJumpToMessage: O,
		highlightedMessageId: re,
		documentEditors: I,
		callParticipants: ie,
		onJoinCall: ae,
		onOpenDocument: oe,
		attachmentSrc: d,
		onOpenAttachment: f,
		acceptFiles: p,
		maxFileSize: m,
		onFileError: h
	});
	return /* @__PURE__ */ F(P, { children: U(pe, L) });
}
//#endregion
//#region src/integrations/realtime-modules/WrappedPresencePanel.tsx
var Xe = {
	typing: 4,
	online: 3,
	away: 2,
	busy: 1,
	offline: 0
};
function Ze(e) {
	return Xe[e] ?? 2.5;
}
function Qe(e, t) {
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
			let n = Ze(t.status) - Ze(e.status);
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
function $e({ presence: e, currentClientId: t, perConnection: n = !1, wrapWithNetworkShim: r }) {
	let i = j(() => n ? e.roster.map((e) => ({
		clientId: e.clientId,
		status: e.status,
		metadata: e.metadata
	})) : Qe(e.roster, t), [
		e.roster,
		t,
		n
	]);
	return /* @__PURE__ */ F(P, { children: U(/* @__PURE__ */ F(b, {
		users: i,
		currentClientId: t
	}), r) });
}
//#endregion
//#region src/integrations/realtime-modules/WrappedActivityPanel.tsx
function et({ activity: e, visibleCount: t, rotateMs: n, staggerMs: r, kindColors: i, className: a }) {
	let o = j(() => He(e.events), [e.events]);
	return /* @__PURE__ */ F(p, {
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
function tt({ reactions: e, ttlMs: t = 2500 }) {
	let [n, r] = N([]), i = e.reactions, a = M(/* @__PURE__ */ new Map());
	return A(() => {
		if (i.length === 0) return;
		let e = i[i.length - 1], n = Pe(e, i.length - 1), o = a.current;
		o.has(n.id) || (r((e) => e.some((e) => e.id === n.id) ? e : [...e, n]), o.set(n.id, setTimeout(() => {
			o.delete(n.id), r((e) => e.filter((e) => e.id !== n.id));
		}, t)));
	}, [i, t]), A(() => {
		let e = a.current;
		return () => {
			e.forEach((e) => clearTimeout(e)), e.clear();
		};
	}, []), /* @__PURE__ */ F(g, { reactions: n });
}
//#endregion
//#region src/integrations/realtime-modules/WrappedFileUploadDrop.tsx
function nt({ fileUpload: e, accept: t, maxSize: n, multiple: r, disabled: i, label: a, className: o, uploadMetadata: s, onError: c }) {
	let l = We(e.uploads);
	function u(t) {
		for (let n of t) e.upload(n, s ? { metadata: s } : void 0).catch((e) => {
			let t = e instanceof Error ? e.message : "Upload failed";
			c?.(t);
		});
	}
	return /* @__PURE__ */ I("div", { children: [/* @__PURE__ */ F(f, {
		accept: t,
		maxSize: n,
		multiple: r,
		disabled: i,
		label: a,
		className: o,
		onFiles: u,
		onError: c
	}), l.length > 0 && /* @__PURE__ */ F(rt, {
		summaries: l,
		onDismiss: () => e.removeCompleted()
	})] });
}
function rt({ summaries: e, onDismiss: t }) {
	return /* @__PURE__ */ F("ul", {
		className: "mt-2 p-0 list-none text-[13px]",
		children: e.map((e) => /* @__PURE__ */ I("li", {
			className: "flex items-center gap-2 py-1 border-b border-border",
			children: [
				/* @__PURE__ */ F("span", {
					className: "flex-1 overflow-hidden text-ellipsis whitespace-nowrap",
					children: e.filename
				}),
				/* @__PURE__ */ F("span", {
					className: `text-xs font-semibold ${it(e.status)}`,
					children: e.status === "uploading" ? `${e.progress}%` : e.status
				}),
				(e.status === "completed" || e.status === "clean") && e.downloadUrl && /* @__PURE__ */ F("a", {
					href: e.downloadUrl,
					target: "_blank",
					rel: "noreferrer",
					className: "text-xs text-info",
					children: "Download"
				}),
				(e.status === "failed" || e.status === "infected") && /* @__PURE__ */ F("button", {
					type: "button",
					onClick: t,
					className: "text-xs text-danger bg-transparent border-0 cursor-pointer p-0",
					children: "Dismiss"
				})
			]
		}, e.id))
	});
}
function it(e) {
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
function at({ hangout: e, localClientId: t, videoElements: n, mode: r, spotlightContent: i, activeSpeakerId: a, speakerHysteresisMs: o, onParticipantClick: s, className: c }) {
	let l = Ke(e.participants, t), u = t == null ? null : l.find((e) => e.id === t) ?? null, d = t == null ? l : l.filter((e) => e.id !== t);
	function f(e) {
		return n ? e.map((e) => ({
			...e,
			videoElement: n[e.id] ?? e.videoElement
		})) : e;
	}
	return /* @__PURE__ */ F(x, {
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
function ot({ notifications: e, onItemClick: t, ...n }) {
	let r = Je(e.notifications);
	return /* @__PURE__ */ F(u, {
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
function st({ socket: e, ...t }) {
	return /* @__PURE__ */ F(l, {
		state: e.connectionState,
		...t
	});
}
//#endregion
//#region src/integrations/realtime-modules/CapabilityBoundary.tsx
function ct({ capability: e, loading: t, fallback: n, children: r }) {
	return e.isLoading ? /* @__PURE__ */ F(P, { children: t ?? null }) : e.enabled ? /* @__PURE__ */ F(P, { children: r }) : /* @__PURE__ */ F(P, { children: n ?? null });
}
//#endregion
//#region src/integrations/realtime-modules/WrappedMediaEffectsTray.tsx
function lt({ controller: e, ...t }) {
	return /* @__PURE__ */ F(C, {
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
function ut({ open: e, controller: t, onClose: n, onApplied: r, ...i }) {
	let a = M(t);
	a.current = t;
	let o = M(!1);
	A(() => {
		if (e) return a.current.beginPreview(), o.current = !0, () => {
			o.current && (o.current = !1, a.current.cancelPreview());
		};
	}, [e]);
	let s = j(() => {
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
	return /* @__PURE__ */ F(T, {
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
function dt(e) {
	let t = e.draft;
	if (!t) return 0;
	let n = 0;
	return t.filterId !== e.filterId && n++, (t.backgroundMode !== e.backgroundMode || t.backgroundMode === "image" && t.backgroundImageUrl !== e.backgroundImageUrl) && n++, t.faceSpriteId !== e.faceSpriteId && n++, n;
}
//#endregion
//#region src/integrations/realtime-modules/WrappedCanvasDocument.tsx
function ft({ canvas: e, schema: t, legacyModel: n, beforeConvert: r, ...i }) {
	let [a, o] = N([]), s = k(async () => {
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
	return /* @__PURE__ */ F(te, {
		...i,
		isCanvas: e.isCanvas,
		body: e.body,
		onConvert: s,
		unsupported: a
	});
}
//#endregion
//#region src/integrations/realtime-modules/WrappedAudioVideoSettingsForm.tsx
function pt({ devices: e, settings: t, cameraOn: n, ...r }) {
	return /* @__PURE__ */ F(E, {
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
export { Te as A, ue as B, Ie as C, je as D, Ae as E, Z as F, U as G, Y as H, pe as I, z as J, H as K, de as L, Ee as M, ye as N, Pe as O, ge as P, Q as R, Ke as S, Je as T, X as U, q as V, W, se as X, R as Y, ie as Z, Oe as _, lt as a, We as b, ot as c, tt as d, et as f, He as g, Ve as h, dt as i, xe as j, Fe as k, at as l, Ye as m, ft as n, ct as o, $e as p, V as q, ut as r, st as s, pt as t, nt as u, ke as v, qe as w, Ge as x, Ue as y, K as z };
