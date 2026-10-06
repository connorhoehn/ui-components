import { t as e } from "./cn-D4QmbyEy.js";
import { n as t } from "./Button-C2OEUpX-.js";
import { t as n } from "./IconButton-VqtspsS5.js";
import { Z as r } from "./Icons-B_xESAH3.js";
import { n as i, t as a } from "./Stack-DNMA-_4L.js";
import { t as o } from "./Badge-POenI45X.js";
import { t as s } from "./Banner-8ngXUtJu.js";
import { t as c } from "./Modal-CjgKqXl7.js";
import { t as l } from "./ConfirmDialog-D5LLBfII.js";
import { t as u } from "./EmptyState-DnbFBYDA.js";
import { n as d } from "./ThinkingDots-BZOWJ3Fp.js";
import { n as f } from "./StatusPill-c89IbU1L.js";
import { t as p } from "./SkeletonCard-D3FL0TB7.js";
import { n as m } from "./Slider-DEbQCKD1.js";
import { t as h } from "./Avatar-CmYYkk9C.js";
import { t as g } from "./InlineAlert-CBtteaVZ.js";
import { n as _, r as v, t as y } from "./NotificationBell-CSVIavoZ.js";
import { t as b } from "./PresenceAvatars-DAgxQ3PF.js";
import { t as x } from "./FileUploadDrop-D3wVrrzM.js";
import { t as S } from "./ActivityFeed-CkPp9rsm.js";
import { a as C, i as w, n as ee, o as te } from "./DockedAside-Cp8f4XKs.js";
import { d as ne, lt as T, n as re, t as E, u as D, ut as O } from "./ConversationSurface-XsuP6_T6.js";
import { C as k, E as A, S as j, g as M, i as ie, m as N, t as P, v as ae, x as oe } from "./AudioVideoSettingsForm-BhfipLo8.js";
import { t as F } from "./useActiveSpeaker-BGKJU3Lb.js";
import { c as se, o as ce, s as I } from "./useDocumentImageUpload-DySteVsb.js";
import { Component as le, createContext as L, createElement as ue, useCallback as R, useContext as z, useEffect as B, useMemo as V, useRef as H, useState as U } from "react";
import { Fragment as W, jsx as G, jsxs as K } from "react/jsx-runtime";
import * as q from "yjs";
//#region src/integrations/realtime/HangoutRoomRow.tsx
function de(e) {
	function t(t) {
		return fe(e, t);
	}
	return t;
}
function fe(e, { slug: t, name: n, participantId: r, occupancy: i, subscribeRoomsIndex: a, onClick: s, onContextMenu: c, onOpenConversation: l, kebab: u, className: d, "data-testid": f = "room-row" }) {
	let p = e.useRoomOccupancy(a ? t : null, { subscribeRoomsIndex: a }), m = a ? p.occupancy ?? null : i ?? null, h = m?.count ?? 0, g = m?.members ?? [], _ = V(() => r ? g.some((e) => e.participantId === r) : !1, [g, r]), v = _, y = V(() => g.slice(0, 3).map((e) => ({
		id: e.participantId,
		name: e.displayName || e.userId,
		online: !0
	})), [g]), x = null;
	h > 1 ? x = /* @__PURE__ */ K(W, { children: [/* @__PURE__ */ G(b, {
		users: y,
		maxVisible: 3,
		size: 18
	}), /* @__PURE__ */ G(o, {
		variant: "count",
		value: h,
		color: "muted"
	})] }) : h === 1 && _ ? x = /* @__PURE__ */ G(o, {
		variant: "pulse",
		color: "accent",
		"aria-label": "Just you in this room",
		"data-testid": `${f}-self-pulse`
	}) : h === 1 && (x = /* @__PURE__ */ K(W, { children: [/* @__PURE__ */ G(b, {
		users: y,
		maxVisible: 1,
		size: 18
	}), /* @__PURE__ */ G(o, {
		variant: "count",
		value: 1,
		color: "muted"
	})] }));
	let S = l ? /* @__PURE__ */ G("button", {
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
	return /* @__PURE__ */ G(C, {
		"data-testid": f,
		icon: /* @__PURE__ */ G("span", {
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
var J = 3, Y = 48;
function pe(e) {
	return e.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 48);
}
function me(e) {
	let t = e.trim();
	return t.length === 0 ? "Name is required." : t.length < J ? `Name must be at least ${J} characters.` : t.length > Y ? `Name must be at most ${Y} characters.` : null;
}
function X({ open: e, onClose: n, onCreate: r, onCreated: i, defaultVisibility: a }) {
	let [o, s] = U(""), [l, u] = U(""), [d, f] = U(!1), [p, h] = U(!1), [g, _] = U(!1), [v, y] = U(null);
	B(() => {
		e && (s(""), u(""), f(!1), h(!1), _(!1), y(null));
	}, [e]);
	let b = V(() => me(o), [o]), x = V(() => pe(o), [o]), S = !b && !g;
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
	return /* @__PURE__ */ G(c, {
		open: e,
		onClose: g ? () => {} : n,
		title: "New room",
		maxWidth: 440,
		rawChildren: !0,
		backdropTestId: "new-hangout-room-dialog",
		footer: null,
		children: /* @__PURE__ */ K("form", {
			onSubmit: C,
			className: "flex flex-col gap-4",
			children: [
				/* @__PURE__ */ K("label", {
					className: "flex flex-col gap-1",
					children: [
						/* @__PURE__ */ G("span", {
							className: "text-[12px] font-semibold text-text-primary",
							children: "Name"
						}),
						/* @__PURE__ */ G("input", {
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
						/* @__PURE__ */ K("div", {
							className: "flex items-center justify-between text-[11px] text-text-tertiary",
							children: [/* @__PURE__ */ G("span", {
								"data-testid": "new-hangout-room-slug-preview",
								children: x ? `#${x}` : "Slug preview appears here"
							}), /* @__PURE__ */ G("span", { children: `${o.trim().length}/${Y}` })]
						}),
						b && o.length > 0 && /* @__PURE__ */ G("span", {
							"data-testid": "new-hangout-room-name-error",
							className: "text-[11px] text-danger-fg",
							children: b
						})
					]
				}),
				/* @__PURE__ */ K("label", {
					className: "flex flex-col gap-1",
					children: [/* @__PURE__ */ K("span", {
						className: "text-[12px] font-semibold text-text-primary",
						children: ["Description ", /* @__PURE__ */ G("span", {
							className: "font-normal text-text-tertiary",
							children: "(optional)"
						})]
					}), /* @__PURE__ */ G("textarea", {
						"data-testid": "new-hangout-room-description",
						value: l,
						onChange: (e) => u(e.target.value),
						placeholder: "What's this room for?",
						rows: 2,
						disabled: g,
						className: "w-full px-3 py-2 text-sm border border-border-emphasis rounded-md focus:outline-none focus:ring-2 focus:ring-info resize-none"
					})]
				}),
				/* @__PURE__ */ K("div", {
					className: "flex flex-col gap-3",
					children: [/* @__PURE__ */ K("label", {
						className: "flex items-center justify-between gap-3",
						children: [/* @__PURE__ */ K("span", {
							className: "flex flex-col",
							children: [/* @__PURE__ */ G("span", {
								className: "text-[13px] font-semibold text-text-primary",
								children: "Audio only"
							}), /* @__PURE__ */ G("span", {
								className: "text-[11px] text-text-tertiary",
								children: "Skip video tracks — voice-only room."
							})]
						}), /* @__PURE__ */ G(m, {
							checked: d,
							onChange: f,
							disabled: g,
							"aria-label": "Audio only",
							"data-testid": "new-hangout-room-audio-only"
						})]
					}), /* @__PURE__ */ K("label", {
						className: "flex items-center justify-between gap-3",
						children: [/* @__PURE__ */ K("span", {
							className: "flex flex-col",
							children: [/* @__PURE__ */ G("span", {
								className: "text-[13px] font-semibold text-text-primary",
								children: "Recording enabled"
							}), /* @__PURE__ */ G("span", {
								className: "text-[11px] text-text-tertiary",
								children: "Allow server-side recording of sessions."
							})]
						}), /* @__PURE__ */ G(m, {
							checked: p,
							onChange: h,
							disabled: g,
							"aria-label": "Recording enabled",
							"data-testid": "new-hangout-room-recording"
						})]
					})]
				}),
				v && /* @__PURE__ */ G("div", {
					"data-testid": "new-hangout-room-error",
					role: "alert",
					className: "text-[12px] text-danger-fg bg-danger-bg border border-danger-border rounded-md px-3 py-2",
					children: v
				}),
				/* @__PURE__ */ K("div", {
					className: "flex justify-end gap-2 pt-1",
					children: [/* @__PURE__ */ G(t, {
						type: "button",
						variant: "ghost",
						onClick: n,
						disabled: g,
						children: "Cancel"
					}), /* @__PURE__ */ G(t, {
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
function Z(e) {
	function t(t) {
		return he(e, t);
	}
	return t;
}
function he(e, { rooms: r, occupancyFor: i, occupancyAdapter: a, participantId: o, onJoinRoom: s, onOpenConversation: c, onContextMenu: l, onBrowseAll: d, maxVisible: f = 10, title: p = "Rooms", storageKey: m, renderCreateDialog: h }) {
	let [g, _] = U(!1), v = () => _(!0), y = () => _(!1), b = V(() => {
		let e = /* @__PURE__ */ new Set(), t = [];
		for (let n of r.rooms) n.state === "active" && (e.has(n.slug) || (e.add(n.slug), t.push(n)));
		return t;
	}, [r.rooms]), x = V(() => b.slice(0, f), [b, f]), S = b.length - x.length;
	return /* @__PURE__ */ K(W, { children: [/* @__PURE__ */ K(te, {
		title: p,
		storageKey: m,
		actions: /* @__PURE__ */ G(n, {
			"aria-label": "New room",
			size: "sm",
			onClick: v,
			icon: /* @__PURE__ */ G("span", {
				"aria-hidden": "true",
				className: "text-[14px] leading-none font-bold",
				children: "+"
			}),
			"data-testid": "new-room-button"
		}),
		"data-testid": "rooms-section",
		children: [
			r.isLoading && /* @__PURE__ */ G("div", {
				className: "flex flex-col gap-1 px-1 py-1",
				"data-testid": "hangout-rooms-loading",
				children: [
					0,
					1,
					2
				].map((e) => /* @__PURE__ */ G("div", {
					"aria-hidden": "true",
					className: "h-7 rounded-md bg-surface-hover animate-pulse"
				}, e))
			}),
			!r.isLoading && r.error && /* @__PURE__ */ K("div", {
				role: "alert",
				"data-testid": "hangout-rooms-error",
				className: "mx-1 my-1 px-3 py-2 text-[12px] text-danger-fg bg-danger-bg border border-danger-border rounded-md flex items-center justify-between gap-2",
				children: [/* @__PURE__ */ G("span", {
					className: "truncate",
					children: "Couldn't load rooms."
				}), /* @__PURE__ */ G("button", {
					type: "button",
					onClick: () => void r.refetch(),
					className: "text-danger-fg underline hover:text-danger-fg cursor-pointer",
					children: "Retry"
				})]
			}),
			!r.isLoading && !r.error && b.length === 0 && /* @__PURE__ */ G(u, {
				testId: "hangout-rooms-empty",
				title: "No rooms yet",
				description: "Create one to start an ongoing hangout.",
				action: /* @__PURE__ */ G(t, {
					onClick: v,
					variant: "primary",
					size: "sm",
					children: "Create room"
				})
			}),
			!r.isLoading && !r.error && b.length > 0 && /* @__PURE__ */ K("div", {
				className: "flex flex-col gap-0.5",
				children: [x.map((t) => /* @__PURE__ */ G(e, {
					slug: t.slug,
					name: t.name,
					participantId: o,
					subscribeRoomsIndex: a,
					occupancy: a ? null : i?.(t.slug) ?? null,
					onClick: s ? () => s(t) : void 0,
					onOpenConversation: c ? () => c(t) : void 0,
					onContextMenu: l ? (e) => l(t, e) : void 0
				}, t.slug)), S > 0 && d && /* @__PURE__ */ G(C, {
					"data-testid": "hangout-rooms-browse-all",
					label: /* @__PURE__ */ K("span", {
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
	}) : /* @__PURE__ */ G(X, {
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
var ge = class extends le {
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
		return t ? t(e, this.reset) : /* @__PURE__ */ G("div", {
			"data-testid": "network-error-boundary-fallback",
			children: /* @__PURE__ */ G(u, {
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
function _e({ connectionState: t, children: n, onRetry: r, reconnectingLabel: i, disconnectedTitle: a = "Disconnected", disconnectedDescription: o = "The connection to the server was lost. Check your network and try again.", retryLabel: s = "Try again", connectingPlaceholder: c, disconnectedFallback: l, className: d }) {
	return t === "connecting" ? /* @__PURE__ */ G("div", {
		"data-testid": "reconnecting-shim-connecting",
		className: d,
		children: c ?? /* @__PURE__ */ G(p, { height: 120 })
	}) : t === "disconnected" ? /* @__PURE__ */ G("div", {
		"data-testid": "reconnecting-shim-disconnected",
		className: d,
		children: l ?? /* @__PURE__ */ G(u, {
			icon: "📡",
			title: a,
			description: o,
			actionLabel: r ? s : void 0,
			onAction: r
		})
	}) : t === "reconnecting" ? /* @__PURE__ */ K("div", {
		"data-testid": "reconnecting-shim-reconnecting",
		className: e("relative", d),
		children: [/* @__PURE__ */ G("div", {
			className: "opacity-60 pointer-events-none",
			children: n
		}), /* @__PURE__ */ G(oe, {
			show: !0,
			label: i
		})]
	}) : /* @__PURE__ */ G("div", {
		"data-testid": "reconnecting-shim-connected",
		className: d,
		children: n
	});
}
//#endregion
//#region src/integrations/realtime-modules/networkShim.tsx
function ve(e, t) {
	return t ? /* @__PURE__ */ G(ge, {
		title: t.errorTitle,
		description: t.errorDescription,
		retryLabel: t.retryLabel,
		onRetry: t.onRetry,
		onError: t.onError,
		fallback: t.errorFallback,
		children: /* @__PURE__ */ G(_e, {
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
function ye(e) {
	function t(t) {
		return be(e, t);
	}
	return t;
}
function be(e, { hangoutRooms: t, subscribeRoomsIndex: n, occupancyFor: r, participantId: i, onJoin: a, onContextMenu: o, onBrowseAll: s, maxVisible: c, title: l, storageKey: u, renderEmpty: d, renderCreateDialog: f, wrapWithNetworkShim: p }) {
	return t.rooms.filter((e) => e.state === "active").length === 0 && !t.isLoading && !t.error && d ? /* @__PURE__ */ G("div", {
		"data-testid": "wrapped-hangout-rooms-empty-slot",
		children: d
	}) : /* @__PURE__ */ G(W, { children: ve(/* @__PURE__ */ G(e, {
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
], xe = {
	chat: !0,
	presence: !0
}, Se = L(null);
function Ce(e) {
	function t(t) {
		return we(e, t);
	}
	return t;
}
function we(e, { capabilities: t = xe, channel: n, children: r }) {
	let i = V(() => Q.filter((e) => t[e] === !0), [t]), { enabled: a, isLoading: o } = e.useCapabilities(i, n), s = V(() => {
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
	return /* @__PURE__ */ G(Se.Provider, {
		value: s,
		children: r
	});
}
function Te() {
	return z(Se) ?? {
		can: Object.fromEntries(Q.map((e) => [e, !1])),
		declared: Object.fromEntries(Q.map((e) => [e, !1])),
		provisioned: Object.fromEntries(Q.map((e) => [e, !1])),
		isLoading: !1
	};
}
function Ee({ need: e, children: t, fallback: n = null }) {
	let { can: r } = Te(), i = (Array.isArray(e) ? e : [e]).every((e) => r[e]);
	return /* @__PURE__ */ G(W, { children: i ? t : n });
}
//#endregion
//#region src/integrations/realtime/WrappedConversationSurface.tsx
var De = {
	files: "conversation.files",
	documents: "conversation.documents",
	pins: "conversation.pins",
	mentions: "conversation.mentions",
	calls: "conversation.calls"
};
function Oe(e = E, t = {}) {
	return e.filter((e) => e !== "chat" && e !== "members").map((e) => t[e] ?? De[e]);
}
function ke(e) {
	return (t) => Ae(e, t);
}
function Ae(e, t) {
	let { channel: n = null, hasDocuments: r = !0, from: i = E } = t;
	return i.filter((t) => t === "mentions" ? !1 : t === "documents" ? r : t !== "calls" || !!e.lobbyForChannel(n));
}
function je({ declare: e = E, capabilities: t, capabilitiesError: n, capabilityNames: r = {}, children: i, ...a }) {
	let o = V(() => {
		let i = r;
		return e.filter((e) => e === "chat" || e === "members" || !t || n ? !0 : t[i[e] ?? De[e]] === !0);
	}, [
		e,
		t,
		n,
		r
	]);
	return /* @__PURE__ */ G(re, {
		...a,
		features: o,
		children: i
	});
}
//#endregion
//#region src/integrations/realtime/WrappedStreamStage.tsx
function Me(e, { channelArn: t, excludeParticipantId: n, getAuthToken: r, baseUrl: i, onStatusChange: a, ...o }) {
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
	return B(() => {
		a?.({
			mode: "realtime",
			live: c,
			error: s.error
		});
	}, [
		c,
		s.error,
		a
	]), /* @__PURE__ */ G(ie, {
		...o,
		live: c,
		stream: s.stream,
		...l === null ? {} : { viewerCount: l }
	});
}
function Ne(e, { channelArn: t, playbackToken: n, baseUrl: r, onStatusChange: i, ...a }) {
	let o = e.useLVSLiveHls({
		channelArn: t,
		playbackToken: n,
		baseUrl: r
	}), { viewerCount: s } = e.useLVSViewerCount({
		channelArn: t,
		baseUrl: r,
		playbackToken: n
	});
	return B(() => {
		i?.({
			mode: "near-realtime",
			live: o.ready,
			error: null
		});
	}, [o.ready, i]), /* @__PURE__ */ G(ie, {
		...a,
		live: o.ready,
		playlistUrl: o.playlistUrl,
		...s === null ? {} : { viewerCount: s }
	});
}
function Pe(e) {
	function t(t) {
		return Me(e, t);
	}
	function n(t) {
		return Ne(e, t);
	}
	function r({ mode: e = "near-realtime", ...r }) {
		return G(e === "realtime" ? t : n, { ...r });
	}
	return r;
}
//#endregion
//#region src/integrations/realtime/WrappedLVSHangoutLayout.tsx
function Fe({ stream: e, displayName: t }) {
	return e ? /* @__PURE__ */ G("video", {
		autoPlay: !0,
		playsInline: !0,
		muted: !0,
		ref: (t) => {
			t && t.srcObject !== e && (t.srcObject = e);
		},
		className: "w-full h-full object-cover scale-x-[-1]"
	}) : /* @__PURE__ */ G("div", {
		className: "w-full h-full grid place-items-center bg-surface-emphasis",
		"data-testid": "local-camera-avatar",
		children: /* @__PURE__ */ G(h, {
			name: t,
			size: 64
		})
	});
}
function Ie(e, t) {
	let n = e.isLocal, r = n ? t ?? e.displayName ?? "You" : e.displayName || e.participantId.slice(0, 8), i = e.streams[0], a = e.screenStream, o = n ? /* @__PURE__ */ G(Fe, {
		stream: i,
		displayName: r
	}) : /* @__PURE__ */ G(j, {
		stream: i,
		displayName: r,
		cameraOn: e.hasVideo
	}), s = a ? /* @__PURE__ */ G(k, {
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
function Le(e) {
	function t(t) {
		return Re(e, t);
	}
	return t;
}
function Re(e, { stageToken: t, participantId: n, userId: r, localClientId: i, getStageToken: a, overlay: o, spotlightContent: s, onParticipantClick: c, mode: l = "auto", activeSpeakerStrategy: u = "audio-level", localTileLabel: d, showLocalAsTile: f = !0, className: p, "data-testid": m }) {
	let h = e.useLVSHangout({
		stageToken: t,
		participantId: n,
		userId: r ?? n.slice(0, 8),
		getAuthToken: a
	}), g = V(() => h.participants.filter((e) => f || !e.isLocal).map((e) => Ie(e, d)), [
		h.participants,
		f,
		d
	]), _ = h.participants.filter((e) => !e.isLocal).length, v = {
		connectionState: h.connectionState,
		error: h.error,
		participantCount: h.participants.length,
		remoteCount: _
	};
	return /* @__PURE__ */ K("div", {
		"data-testid": m,
		className: `relative flex-1 min-h-0 ${p ?? ""}`,
		children: [/* @__PURE__ */ G(A, {
			participants: g,
			localParticipant: null,
			mode: l,
			spotlightContent: s,
			onParticipantClick: c,
			className: "h-full"
		}), o && /* @__PURE__ */ G("div", {
			className: "absolute inset-0 pointer-events-none z-10",
			"data-testid": "wrapped-overlay-slot",
			children: /* @__PURE__ */ G("div", {
				className: "pointer-events-auto",
				children: o(v)
			})
		})]
	});
}
//#endregion
//#region src/integrations/realtime/createRealtimeIntegrations.tsx
function ze(e) {
	let t = de(e), n = Z(t);
	return {
		HangoutRoomRow: t,
		HangoutRoomsSection: n,
		WrappedHangoutRoomsList: ye(n),
		RealtimeCapabilityProvider: Ce(e),
		conversationFeaturesFor: ke(e),
		WrappedStreamStage: Pe(e),
		WrappedLVSHangoutLayout: Le(e)
	};
}
var Be = L(null), Ve = /* @__PURE__ */ new WeakMap();
function He(e) {
	let t = Ve.get(e);
	return t || (t = ze(e), Ve.set(e, t)), t;
}
function Ue({ modules: e, children: t }) {
	let n = V(() => He(e), [e]);
	return /* @__PURE__ */ G(Be.Provider, {
		value: n,
		children: t
	});
}
function We() {
	let e = z(Be);
	if (!e) throw Error("useRealtimeIntegrations() needs a <RealtimeIntegrationsProvider modules={…}> above it.");
	return e;
}
//#endregion
//#region src/integrations/realtime/canvasRecovery.ts
function Ge(e, t, n, r = "canvasRecovery") {
	return `${r}:${JSON.stringify([
		e,
		t,
		n
	])}`;
}
function Ke(e) {
	let t = "";
	for (let n = 0; n < e.length; n += 8192) t += String.fromCharCode(...e.subarray(n, n + 8192));
	return {
		version: 1,
		savedAt: (/* @__PURE__ */ new Date()).toISOString(),
		snapshot: btoa(t)
	};
}
function qe(e) {
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
function Je(e, t, n, r) {
	let i = Ge(e, t, n, r), [a, o] = U(() => {
		try {
			let e = JSON.parse(sessionStorage.getItem(i) ?? "null");
			return qe(e?.recovered ?? e?.pending) ? e.recovered ?? e.pending : null;
		} catch {
			return null;
		}
	}), s = H(a), c = H(null), [l, u] = U(!1), d = R(() => {
		try {
			!s.current && !c.current ? sessionStorage.removeItem(i) : sessionStorage.setItem(i, JSON.stringify({
				recovered: s.current,
				pending: c.current
			})), u(!1);
		} catch {
			u(!0);
		}
	}, [i]), f = R((e) => {
		s.current = Ke(e), o(s.current), d();
	}, [d]), p = R(() => {
		s.current = null, o(null), d();
	}, [d]), m = R((e, t) => {
		if (!e || !t) return () => {};
		let n = () => {
			t.pendingUpdateCount && (c.current = Ke(q.encodeStateAsUpdate(e)), d());
		};
		return e.on("update", n), n(), () => e.off("update", n);
	}, [d]), h = R(() => {
		c.current = null, d();
	}, [d]);
	return B(() => {
		d();
	}, [d]), {
		recovered: a,
		storageError: l,
		retain: f,
		clear: p,
		track: m,
		acknowledged: h,
		download: R(() => {
			let e = qe(s.current ?? c.current);
			if (!e) return;
			let t = URL.createObjectURL(new Blob([Uint8Array.from(e)], { type: "application/octet-stream" })), r = document.createElement("a");
			r.href = t, r.download = `document-${n}-recovery.yjs`, r.click(), window.setTimeout(() => URL.revokeObjectURL(t), 1e3);
		}, [n]),
		restore: R((e) => {
			let t = qe(s.current);
			t && (q.applyUpdate(e, t, "explicit-recovery"), p());
		}, [p])
	};
}
//#endregion
//#region src/integrations/realtime/canvasDocumentState.ts
function Ye(e, t, n, r) {
	if (e !== "idle") return {
		status: !n && t > 0 ? "offline" : e,
		...e === "error" || !n ? { onRetry: r } : {}
	};
}
function Xe(e, t, n = Date.now()) {
	return t && e.canEdit && e.expiresAt > n;
}
//#endregion
//#region src/integrations/realtime/CanvasDocumentPane.tsx
var Ze = {
	showRuler: !0,
	showStatusBar: !1,
	toolbarStyle: "card",
	pageMargin: "narrow",
	fitHeight: "parent",
	paginate: !0
};
function Qe(e) {
	return function(n) {
		let { documentId: r, tenant: o, userId: s, userName: u, userColor: p = "teal", canEdit: m, editing: h = !0, extensions: _, loadImage: v, isProtectedImage: y, uploadImage: b, onPendingChange: S, notices: C, children: w, viewProps: ee, onEditorReady: te, loadingLabel: ne = "Loading collaborative document…", layout: T, keyPrefix: re } = n, E = e.useGateway(), D = Je(o, s, r, re), O = e.useYjsDoc({
			documentId: r,
			ws: E,
			onMessage: E.onMessage,
			onUnpersistedChanges: D.retain
		}), k = e.useCanvasDocument({ ydoc: O.ydoc }), A = E.connectionState === "connected", j = m && h && O.synced && A, M = H(j);
		M.current = j;
		let [ie, N] = U(!1), [P, ae] = U(null), [oe, F] = U(!1), [I, le] = U(!1), [L, R] = U(null), z = H(null), q = V(() => ({
			name: u,
			color: p
		}), [u, p]);
		B(() => D.track(O.ydoc, O.provider), [
			O.ydoc,
			O.provider,
			D.track
		]), B(() => {
			O.persistenceState === "saved" && O.pendingUpdateCount === 0 && D.acknowledged();
		}, [
			O.persistenceState,
			O.pendingUpdateCount,
			D.acknowledged
		]), B(() => {
			S?.(O.pendingUpdateCount);
		}, [O.pendingUpdateCount, S]), B(() => {
			O.provider?.awareness.setLocalStateField("user", {
				...q,
				id: s
			});
		}, [
			O.provider,
			q,
			s
		]), B(() => {
			if (O.pendingUpdateCount === 0) return;
			let e = (e) => {
				e.preventDefault(), e.returnValue = "";
			};
			return window.addEventListener("beforeunload", e), () => window.removeEventListener("beforeunload", e);
		}, [O.pendingUpdateCount]), B(() => E.onMessage((e) => {
			e.channel === `doc:${r}` && (e.type === "crdt:error" && ae(typeof e.error == "string" ? e.error : "The document operation was refused."), e.type === "crdt:snapshot" && ae(null));
		}), [E.onMessage, r]);
		let de = async (e) => {
			let t = z.current;
			if (!(!b || !t || t.isDestroyed || !M.current || I)) {
				le(!0), R(null);
				try {
					let n = await b(e);
					if (z.current !== t || t.isDestroyed || !M.current) throw Error("The document is no longer editable. The image was not inserted.");
					t.chain().focus().setImage({
						src: n,
						alt: e.name
					}).run(), F(!1);
				} catch (e) {
					R(e instanceof Error ? e.message : "The image could not be uploaded.");
				} finally {
					le(!1);
				}
			}
		}, fe = Ye(O.persistenceState, O.pendingUpdateCount, A, O.retryPersistence), J = {
			editable: j,
			online: A,
			synced: O.synced,
			pendingUpdateCount: O.pendingUpdateCount,
			persistenceState: O.persistenceState,
			docVersion: O.docVersion,
			ydoc: O.ydoc,
			exportMarkdown: k.exportMarkdown
		}, Y = /* @__PURE__ */ K(W, { children: [
			C,
			D.recovered && /* @__PURE__ */ G(g, {
				tone: "warning",
				children: /* @__PURE__ */ K(i, {
					gap: "xs",
					children: ["Changes from an earlier editing session are available for recovery. They have not been applied to this document.", /* @__PURE__ */ K(a, {
						gap: "sm",
						wrap: !0,
						children: [
							/* @__PURE__ */ G(t, {
								size: "sm",
								variant: "secondary",
								onClick: D.download,
								children: "Download recovery"
							}),
							m && /* @__PURE__ */ G(t, {
								size: "sm",
								variant: "secondary",
								disabled: !O.synced || !A || O.pendingUpdateCount > 0,
								onClick: () => N(!0),
								children: "Recover changes…"
							}),
							/* @__PURE__ */ G(t, {
								size: "sm",
								variant: "ghost",
								onClick: D.clear,
								children: "Discard recovery"
							})
						]
					})]
				})
			}),
			D.storageError && /* @__PURE__ */ G(g, {
				tone: "warning",
				children: /* @__PURE__ */ K(a, {
					gap: "sm",
					wrap: !0,
					children: ["This browser could not keep a recovery copy. Keep this page open until saving finishes.", /* @__PURE__ */ G(t, {
						size: "sm",
						variant: "secondary",
						onClick: D.download,
						children: "Download recovery"
					})]
				})
			}),
			P && /* @__PURE__ */ G(g, {
				tone: "error",
				children: P
			})
		] }), pe = O.synced && !!O.ydoc && !!k.body, me = /* @__PURE__ */ K(W, { children: [
			w,
			/* @__PURE__ */ G(l, {
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
			b && /* @__PURE__ */ G(c, {
				open: oe,
				onClose: () => {
					I || F(!1);
				},
				title: "Insert image",
				children: /* @__PURE__ */ K(i, {
					gap: "sm",
					children: [L && /* @__PURE__ */ G(g, {
						tone: "error",
						children: L
					}), /* @__PURE__ */ G(x, {
						accept: "image/*",
						maxSize: 10485760,
						disabled: I || !j,
						label: I ? "Uploading image…" : "Choose an image or drop it here",
						onFiles: (e) => {
							e[0] && de(e[0]);
						}
					})]
				})
			})
		] }), X = (e, t = null, n = null) => T ? T({
			notices: Y,
			canvas: e,
			toolbar: t,
			ruler: n,
			saveState: fe,
			state: J
		}) : /* @__PURE__ */ K(W, { children: [Y, e] });
		if (!pe) return X(/* @__PURE__ */ G(f, { label: ne }));
		if (!k.isCanvas) return X(/* @__PURE__ */ G(d, {
			title: "Document migration is incomplete",
			body: "The server has not supplied a rich document snapshot. No changes have been made."
		}));
		let Z = (e) => /* @__PURE__ */ K(ce, {
			loadImage: v,
			...y ? { requiresAuthentication: y } : {},
			children: [/* @__PURE__ */ ue(se, {
				...Ze,
				...ee,
				key: O.docVersion,
				isCanvas: !0,
				body: k.body,
				ydoc: O.ydoc,
				provider: O.provider,
				user: q,
				editable: j,
				extensions: _,
				...b && j ? { onInsertImage: () => {
					R(null), F(!0);
				} } : {},
				...e ? { renderFrame: ({ toolbar: t, ruler: n, surface: r }) => e(t, n, r) } : {},
				onEditorReady: (e) => {
					z.current = e, te?.(e);
				}
			}), me]
		});
		return T ? Z((e, t, n) => X(/* @__PURE__ */ G(i, {
			gap: "none",
			className: "min-h-0 flex-1",
			"data-testid": "document-canvas-slot",
			children: n
		}), e, t)) : X(/* @__PURE__ */ G(i, {
			gap: "none",
			className: "min-h-0 flex-1",
			"data-testid": "document-canvas-slot",
			children: Z()
		}));
	};
}
//#endregion
//#region src/integrations/realtime/canvasDocumentExtensions.ts
function $e(e, t) {
	return e({
		...t,
		Image: I(t.Image)
	});
}
//#endregion
//#region src/integrations/realtime/ConversationCallDock.tsx
var et = (e) => e.stream ? /* @__PURE__ */ G(k, {
	stream: e.stream,
	muted: e.isLocal
}) : void 0, tt = () => typeof HTMLMediaElement < "u" && "setSinkId" in HTMLMediaElement.prototype;
function nt(e) {
	let t = (e?.participants ?? []).filter((e) => !e.isLocal && e.stream && (e.state === "in-call" || e.state === "reconnecting")), n = t.map((e) => `${e.id}=${e.stream.id}`).join("|");
	return V(() => t.map((e) => ({
		participantId: e.id,
		streams: [e.stream]
	})), [n]);
}
function rt(e, { call: t, title: n, onOpenPeople: r, peopleOpen: i, onOpenSettings: a, onPopOut: o, extras: s, cameraMenuItems: l, tile: u = et, notice: d, selfName: f, compact: p = !1, className: m, "data-testid": h = "conversation-call-dock" }) {
	let [_, v] = U(!1), y = e.useAudioVideoSettings({ preview: _ }), { activeSpeakerId: b } = F({ participants: nt(t.call) }), x = e.conversationCallDockProps(t, {
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
	return /* @__PURE__ */ K(W, { children: [
		d ? /* @__PURE__ */ G(g, {
			tone: "info",
			"data-testid": `${h}-notice`,
			children: d
		}) : null,
		/* @__PURE__ */ G(ae, { ...S }),
		!a && /* @__PURE__ */ G(c, {
			open: _,
			onClose: () => v(!1),
			title: "Call devices",
			children: /* @__PURE__ */ G(P, {
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
				speakerSelectionSupported: tt(),
				onTestMic: y.testMic,
				onTestSound: y.testSound,
				testMicState: y.testMicState,
				...f === void 0 ? {} : { selfName: f }
			})
		})
	] });
}
function it(e) {
	function t(t) {
		return rt(e, t);
	}
	return t;
}
//#endregion
//#region src/integrations/realtime/IncomingCallToast.tsx
function at(e) {
	return e.kind === "knock" ? `${e.callerName} asks to join` : `${e.callerName} is calling`;
}
function ot({ ring: e, onAccept: n, onDecline: i, corner: o = "top-right", width: c = 360, className: l, "data-testid": u = "incoming-call-toast" }) {
	let d = e.kind === "knock";
	return /* @__PURE__ */ G(ee, {
		corner: o,
		width: c,
		"data-testid": u,
		...l ? { className: l } : {},
		children: /* @__PURE__ */ G(s, {
			variant: "info",
			layout: "stacked",
			icon: /* @__PURE__ */ G(r, { size: 16 }),
			title: at(e),
			action: /* @__PURE__ */ K(a, {
				gap: "sm",
				children: [/* @__PURE__ */ G(t, {
					size: "sm",
					variant: "secondary",
					onClick: i,
					"data-testid": "incoming-call-decline",
					children: "Decline"
				}), /* @__PURE__ */ G(t, {
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
function st(e) {
	if (!e || typeof e != "object") return null;
	let t = e;
	return typeof t.messageId != "string" || !t.messageId ? null : {
		messageId: t.messageId,
		author: $(t.author) ?? "Unknown",
		text: $(t.text) ?? "",
		...$(t.timestamp) ? { timestamp: t.timestamp } : {}
	};
}
function ct(e) {
	let t = e.metadata?.attachments, n = Array.isArray(t) ? t.filter((e) => !!e && typeof e == "object" && typeof e.url == "string" && typeof e.id == "string") : void 0, r;
	if (e.metadata) {
		let { replyTo: t, ...n } = e.metadata, i = { ...n }, a = st(t);
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
function lt(e) {
	return e.map(ct);
}
function ut(e) {
	return {
		id: $(e.metadata?.userId) || e.clientId,
		name: $(e.metadata?.displayName) ?? e.clientId.slice(0, 12),
		avatarUrl: $(e.metadata?.avatarUrl),
		online: e.status !== "offline",
		...e.status === "away" || e.status === "busy" ? { idle: !0 } : {}
	};
}
function dt(e) {
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
var ft = [
	15,
	25,
	35,
	45,
	55,
	65,
	75,
	85
], pt = [
	20,
	35,
	50,
	65,
	80
];
function mt(e, t) {
	let n = ft[t % ft.length] ?? 50, r = pt[Math.floor(t / ft.length) % pt.length] ?? 50, i = e.position != null && typeof e.position == "object" ? e.position : null;
	return {
		id: e.id,
		emoji: e.emoji,
		x: i?.x ?? n,
		y: i?.y ?? r,
		timestamp: e.timestamp
	};
}
function ht(e) {
	return e.map(mt);
}
function gt(e, t) {
	return (e.reactionsFor ? e.reactionsFor(t) : e.reactions.filter((e) => e.targetId === t)).map((e) => ({
		emoji: e.emoji,
		userId: e.userId ?? e.clientId,
		displayName: e.displayName
	}));
}
function _t(e) {
	try {
		let t = Date.now() - new Date(e).getTime(), n = Math.floor(t / 1e3);
		return n < 60 ? "just now" : n < 3600 ? `${Math.floor(n / 60)}m ago` : n < 86400 ? `${Math.floor(n / 3600)}h ago` : e.slice(0, 10);
	} catch {
		return "";
	}
}
var vt = {
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
function yt(e) {
	let t = e.detail;
	return typeof t.subject == "string" ? t.subject : typeof t.contentId == "string" ? t.contentId.slice(0, 12) : typeof t.roomId == "string" ? `room:${t.roomId.slice(0, 8)}` : typeof t.pipelineId == "string" ? `pipeline:${t.pipelineId}` : e.eventType;
}
function bt(e, t) {
	return [
		e.eventType,
		e.timestamp,
		e.userId ?? e.displayName,
		t
	].join("|");
}
function xt(e) {
	return {
		id: bt(e, yt(e)),
		actor: e.displayName,
		action: vt[e.eventType] ?? e.eventType.split(".").pop() ?? "did",
		subject: yt(e),
		ticketId: typeof e.detail.ticketId == "string" ? e.detail.ticketId : void 0,
		timeLabel: _t(e.timestamp),
		kind: e.eventType.split(".")[0]
	};
}
function St(e) {
	let t = /* @__PURE__ */ new Map();
	return e.map((e) => {
		let n = xt(e), r = t.get(n.id) ?? 0;
		return t.set(n.id, r + 1), r === 0 ? n : {
			...n,
			id: `${n.id}#${r}`
		};
	});
}
function Ct(e) {
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
function wt(e) {
	return e.map(Ct);
}
function Tt(e, t, n) {
	return {
		id: e.clientId,
		displayName: e.displayName || e.clientId.slice(0, 12),
		isMuted: !e.audioOn,
		isLocal: t == null ? void 0 : e.clientId === t,
		...n ? { avatarUrl: n } : {}
	};
}
function Et(e, t, n) {
	return e.map((e) => Tt(e, t, n?.[e.clientId]));
}
function Dt(e) {
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
function Ot(e) {
	return e.map(Dt);
}
function kt(e) {
	let t = [];
	for (let n of e) {
		let { x: e, y: r } = n.position;
		if (typeof e != "number" || typeof r != "number") continue;
		let i = n.metadata ?? {}, a = typeof i.displayName == "string" ? i.displayName : void 0;
		t.push({
			clientId: n.clientId,
			x: e,
			y: r,
			label: a ?? (typeof i.userInitials == "string" ? i.userInitials : void 0),
			color: typeof i.userColor == "string" ? i.userColor : void 0
		});
	}
	return t;
}
//#endregion
//#region src/integrations/realtime-modules/WrappedChatPanel.tsx
function At({ chat: e, localMessages: t, presence: n, upload: r, reactions: i, pins: a, currentActor: o, currentUserId: s, displayName: c, avatarUrl: l, sendMetadata: u, publishTyping: d, attachmentSrc: f, onOpenAttachment: p, acceptFiles: m, maxFileSize: h, onFileError: g, disabled: _, typingUsers: v, tone: y, fill: b, showHeader: x, loadMoreHistory: S = !1, joinHistoryLimit: C = 20, historyPageSize: w = 50, onLoadMore: ee, hasMore: te, loadingMore: T, composer: re, renderMessageReferences: E, emojis: D, onReply: O, reply: k, onCancelReply: A, readReceipts: j, readReceiptsEnabled: M, unreadFrom: ie, threaded: N, onJumpToMessage: P, highlightedMessageId: ae, documentEditors: oe, callParticipants: F, onJoinCall: se, onOpenDocument: ce, wrapWithNetworkShim: I }) {
	let le = V(() => {
		let n = lt(e.messages);
		if (!t?.length) return n;
		let r = new Set(n.flatMap((e) => e.id ? [e.id] : [])), i = t.filter((e) => !e.id || !r.has(e.id));
		return i.length === 0 ? n : [...n, ...i].map((e, t) => ({
			m: e,
			i: t
		})).sort((e, t) => Date.parse(e.m.timestamp) - Date.parse(t.m.timestamp) || e.i - t.i).map(({ m: e }) => e);
	}, [e.messages, t]), L = v ?? n?.roster.filter((e) => {
		if (e.metadata?.isTyping !== !0) return !1;
		let t = e.metadata?.userId;
		return s && typeof t == "string" ? t !== s : !o || e.clientId !== o;
	}).map((e) => e.metadata?.displayName ?? e.clientId.slice(0, 8)) ?? [], ue = e.sendMessage, z = R((e) => {
		let t = { ...u ?? {} };
		c && (t.displayName = c), l && (t.avatarUrl = l), Object.keys(t).length > 0 ? ue(e, t) : ue(e);
	}, [
		ue,
		u,
		c,
		l
	]), K = n?.updateMetadata, q = (d ?? !0) && !!K, de = R((e) => K?.({ isTyping: e }), [K]), fe = e.loadHistory, [J, Y] = U(C), [pe, me] = U(!1), X = e.messages.length, Z = H(X);
	B(() => {
		X !== Z.current && (Z.current = X, me(!1));
	}, [X]);
	let he = H(J);
	he.current = J;
	let ge = R(() => {
		let e = he.current + w;
		he.current = e, Y(e), me(!0), fe(e);
	}, [fe, w]), _e = ee ? {
		onLoadMore: ee,
		hasMore: te,
		loadingMore: T
	} : S ? {
		onLoadMore: ge,
		hasMore: te ?? X >= J,
		loadingMore: T ?? pe
	} : {}, ye = V(() => i ? (e) => gt(i, e) : void 0, [i]), be = V(() => {
		if (!i || !s) return;
		let { toggle: e, react: t, unreact: n } = i;
		return e ? (t, n) => e(n, {
			targetId: t,
			userId: s
		}) : (e, r) => {
			gt(i, e).some((e) => e.emoji === r && e.userId === s) && n ? n(r, { targetId: e }) : t(r, { targetId: e });
		};
	}, [i, s]), Q = R((e) => {
		if (!a) return;
		let t = e.id ?? "";
		t && (a.pinnedIds.has(t) ? a.unpin(t) : a.pin({
			messageId: t,
			text: e.content,
			author: e.displayName ?? "Unknown"
		}));
	}, [a]), xe = /* @__PURE__ */ G(ne, {
		messages: le,
		onSend: z,
		disabled: _,
		typingUsers: L,
		tone: y,
		fill: b,
		showHeader: x,
		composer: re,
		emojis: D,
		..._e,
		...q ? { onTyping: de } : {},
		...r ? {
			onSendFiles: (e) => {
				for (let t of e) r.upload(t);
			},
			transfers: r.transfers,
			onCancelTransfer: r.cancelTransfer
		} : {},
		currentActor: o,
		currentUserId: s,
		reactionsFor: ye,
		onToggleReaction: be,
		...a ? {
			pinnedMessageIds: a.pinnedIds,
			onTogglePin: Q
		} : {},
		onReply: O,
		reply: k,
		onCancelReply: A,
		readReceipts: j,
		readReceiptsEnabled: M,
		unreadFrom: ie,
		threaded: N,
		onJumpToMessage: P,
		highlightedMessageId: ae,
		documentEditors: oe,
		callParticipants: F,
		onJoinCall: se,
		onOpenDocument: ce,
		renderMessageReferences: E,
		attachmentSrc: f,
		onOpenAttachment: p,
		acceptFiles: m,
		maxFileSize: h,
		onFileError: g
	});
	return /* @__PURE__ */ G(W, { children: ve(xe, I) });
}
//#endregion
//#region src/integrations/realtime-modules/WrappedPresencePanel.tsx
var jt = {
	typing: 4,
	online: 3,
	away: 2,
	busy: 1,
	offline: 0
};
function Mt(e) {
	return jt[e] ?? 2.5;
}
function Nt(e, t) {
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
			let n = Mt(t.status) - Mt(e.status);
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
function Pt({ presence: e, currentClientId: t, perConnection: n = !1, wrapWithNetworkShim: r }) {
	let i = V(() => n ? e.roster.map((e) => ({
		clientId: e.clientId,
		status: e.status,
		metadata: e.metadata
	})) : Nt(e.roster, t), [
		e.roster,
		t,
		n
	]);
	return /* @__PURE__ */ G(W, { children: ve(/* @__PURE__ */ G(D, {
		users: i,
		currentClientId: t
	}), r) });
}
//#endregion
//#region src/integrations/realtime-modules/WrappedActivityPanel.tsx
function Ft({ activity: e, visibleCount: t, rotateMs: n, staggerMs: r, kindColors: i, className: a }) {
	let o = V(() => St(e.events), [e.events]);
	return /* @__PURE__ */ G(S, {
		items: o,
		visibleCount: t,
		rotateMs: n,
		staggerMs: r,
		kindColors: i,
		className: a
	});
}
//#endregion
//#region src/components/collaboration/CursorOverlay.tsx
function It({ cursors: t, coordinates: n = "pixels", onMove: r, children: i, className: a }) {
	let o = n === "fraction";
	function s(e) {
		if (!r) return;
		let t = e.currentTarget.getBoundingClientRect(), n = e.clientX - t.left, i = e.clientY - t.top;
		if (!o) return r(n, i);
		if (t.width <= 0 || t.height <= 0) return;
		let a = (e) => Math.min(1, Math.max(0, e));
		r(a(n / t.width), a(i / t.height));
	}
	return /* @__PURE__ */ K("div", {
		"data-testid": "cursor-overlay",
		className: e("relative", a),
		onPointerMove: r ? s : void 0,
		children: [i, /* @__PURE__ */ G("div", {
			className: "pointer-events-none absolute inset-0 overflow-hidden",
			"aria-hidden": "true",
			"data-testid": "cursor-overlay-layer",
			children: t.map((e) => {
				if (!Number.isFinite(e.x) || !Number.isFinite(e.y)) return null;
				let t = e.label ?? e.clientId, n = e.color ?? T(t);
				return /* @__PURE__ */ K("div", {
					"data-testid": "cursor-overlay-pointer",
					"data-client-id": e.clientId,
					className: "absolute select-none",
					style: {
						left: o ? `${e.x * 100}%` : e.x,
						top: o ? `${e.y * 100}%` : e.y
					},
					children: [/* @__PURE__ */ G("svg", {
						width: "16",
						height: "16",
						viewBox: "0 0 16 16",
						fill: n,
						className: "drop-shadow",
						children: /* @__PURE__ */ G("path", {
							d: "M1 1l5.5 14 2-5.5L14 7.5z",
							stroke: "white",
							strokeWidth: "1",
							strokeLinejoin: "round"
						})
					}), /* @__PURE__ */ G("span", {
						"data-testid": "cursor-overlay-label",
						title: t,
						className: "ml-3 -mt-1 inline-block max-w-[10rem] truncate rounded px-1.5 py-0.5 text-[10px] font-medium text-white shadow",
						style: { background: n },
						children: e.label ? e.label : O(e.clientId)
					})]
				}, e.clientId);
			})
		})]
	});
}
//#endregion
//#region src/integrations/realtime-modules/WrappedCursorOverlay.tsx
function Lt({ cursor: e, coordinates: t = "fraction", publish: n = !0, selfClientId: r, children: i, className: a }) {
	let o = V(() => kt(e.cursors).filter((e) => e.clientId !== r), [e.cursors, r]), s = e.move;
	return /* @__PURE__ */ G(It, {
		cursors: o,
		coordinates: t,
		onMove: n ? (e, t) => s({
			x: e,
			y: t
		}) : void 0,
		className: a,
		children: i
	});
}
//#endregion
//#region src/integrations/realtime-modules/WrappedReactionsOverlay.tsx
function Rt({ reactions: e, ttlMs: t = 2500 }) {
	let [n, r] = U([]), i = e.reactions, a = H(/* @__PURE__ */ new Map());
	return B(() => {
		if (i.length === 0) return;
		let e = i[i.length - 1], n = mt(e, i.length - 1), o = a.current;
		o.has(n.id) || (r((e) => e.some((e) => e.id === n.id) ? e : [...e, n]), o.set(n.id, setTimeout(() => {
			o.delete(n.id), r((e) => e.filter((e) => e.id !== n.id));
		}, t)));
	}, [i, t]), B(() => {
		let e = a.current;
		return () => {
			e.forEach((e) => clearTimeout(e)), e.clear();
		};
	}, []), /* @__PURE__ */ G(w, { reactions: n });
}
//#endregion
//#region src/integrations/realtime-modules/WrappedFileUploadDrop.tsx
function zt({ fileUpload: e, accept: t, maxSize: n, multiple: r, disabled: i, label: a, className: o, uploadMetadata: s, onError: c }) {
	let l = wt(e.uploads);
	function u(t) {
		for (let n of t) e.upload(n, s ? { metadata: s } : void 0).catch((e) => {
			let t = e instanceof Error ? e.message : "Upload failed";
			c?.(t);
		});
	}
	return /* @__PURE__ */ K("div", { children: [/* @__PURE__ */ G(x, {
		accept: t,
		maxSize: n,
		multiple: r,
		disabled: i,
		label: a,
		className: o,
		onFiles: u,
		onError: c
	}), l.length > 0 && /* @__PURE__ */ G(Bt, {
		summaries: l,
		onDismiss: () => e.removeCompleted()
	})] });
}
function Bt({ summaries: e, onDismiss: t }) {
	return /* @__PURE__ */ G("ul", {
		className: "mt-2 p-0 list-none text-[13px]",
		children: e.map((e) => /* @__PURE__ */ K("li", {
			className: "flex items-center gap-2 py-1 border-b border-border",
			children: [
				/* @__PURE__ */ G("span", {
					className: "flex-1 overflow-hidden text-ellipsis whitespace-nowrap",
					children: e.filename
				}),
				/* @__PURE__ */ G("span", {
					className: `text-xs font-semibold ${Vt(e.status)}`,
					children: e.status === "uploading" ? `${e.progress}%` : e.status
				}),
				(e.status === "completed" || e.status === "clean") && e.downloadUrl && /* @__PURE__ */ G("a", {
					href: e.downloadUrl,
					target: "_blank",
					rel: "noreferrer",
					className: "text-xs text-info",
					children: "Download"
				}),
				(e.status === "failed" || e.status === "infected") && /* @__PURE__ */ G("button", {
					type: "button",
					onClick: t,
					className: "text-xs text-danger bg-transparent border-0 cursor-pointer p-0",
					children: "Dismiss"
				})
			]
		}, e.id))
	});
}
function Vt(e) {
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
function Ht({ hangout: e, localClientId: t, videoElements: n, mode: r, spotlightContent: i, activeSpeakerId: a, speakerHysteresisMs: o, onParticipantClick: s, className: c }) {
	let l = Et(e.participants, t), u = t == null ? null : l.find((e) => e.id === t) ?? null, d = t == null ? l : l.filter((e) => e.id !== t);
	function f(e) {
		return n ? e.map((e) => ({
			...e,
			videoElement: n[e.id] ?? e.videoElement
		})) : e;
	}
	return /* @__PURE__ */ G(A, {
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
function Ut({ notifications: e, onItemClick: t, ...n }) {
	let r = Ot(e.notifications);
	return /* @__PURE__ */ G(_, {
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
function Wt({ notifications: e, onItemClick: t, unreadCount: n, ...r }) {
	let i = Ot(e.notifications);
	return /* @__PURE__ */ G(y, {
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
function Gt({ socket: e, ...t }) {
	return /* @__PURE__ */ G(v, {
		state: e.connectionState,
		...t
	});
}
//#endregion
//#region src/integrations/realtime-modules/CapabilityBoundary.tsx
function Kt({ capability: e, loading: t, fallback: n, children: r }) {
	return e.isLoading ? /* @__PURE__ */ G(W, { children: t ?? null }) : e.enabled ? /* @__PURE__ */ G(W, { children: r }) : /* @__PURE__ */ G(W, { children: n ?? null });
}
//#endregion
//#region src/integrations/realtime-modules/WrappedMediaEffectsTray.tsx
function qt({ controller: e, ...t }) {
	return /* @__PURE__ */ G(M, {
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
function Jt({ open: e, controller: t, onClose: n, onApplied: r, ...i }) {
	let a = H(t);
	a.current = t;
	let o = H(!1);
	B(() => {
		if (e) return a.current.beginPreview(), o.current = !0, () => {
			o.current && (o.current = !1, a.current.cancelPreview());
		};
	}, [e]);
	let s = V(() => {
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
	return /* @__PURE__ */ G(N, {
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
function Yt(e) {
	let t = e.draft;
	if (!t) return 0;
	let n = 0;
	return t.filterId !== e.filterId && n++, (t.backgroundMode !== e.backgroundMode || t.backgroundMode === "image" && t.backgroundImageUrl !== e.backgroundImageUrl) && n++, t.faceSpriteId !== e.faceSpriteId && n++, n;
}
//#endregion
//#region src/integrations/realtime-modules/WrappedCanvasDocument.tsx
function Xt({ canvas: e, schema: t, legacyModel: n, beforeConvert: r, ...i }) {
	let [a, o] = U([]), s = R(async () => {
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
	return /* @__PURE__ */ G(se, {
		...i,
		isCanvas: e.isCanvas,
		body: e.body,
		onConvert: s,
		unsupported: a
	});
}
//#endregion
//#region src/integrations/realtime-modules/WrappedAudioVideoSettingsForm.tsx
function Zt({ devices: e, settings: t, cameraOn: n, ...r }) {
	return /* @__PURE__ */ G(P, {
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
export { Ee as $, mt as A, Ge as B, Tt as C, Ot as D, Dt as E, $e as F, We as G, Ke as H, Qe as I, De as J, Le as K, Xe as L, ot as M, at as N, ut as O, it as P, Q, Ye as R, wt as S, gt as T, Ue as U, qe as V, ze as W, Oe as X, je as Y, ke as Z, xt as _, qt as a, _e as at, lt as b, Wt as c, X as ct, zt as d, xe as et, Rt as f, At as g, Pt as h, Yt as i, ve as it, ht as j, dt as k, Ut as l, pe as lt, Ft as m, Xt as n, Te as nt, Kt as o, ge as ot, Lt as p, Pe as q, Jt as r, ye as rt, Gt as s, Z as st, Zt as t, Ce as tt, Ht as u, de as ut, St as v, Et as w, Ct as x, ct as y, Je as z };
