import { t as e } from "./cn-D4QmbyEy.js";
import { n as t } from "./Button-uREUOWUk.js";
import { t as n } from "./IconButton-IE5g44md.js";
import { Q as r } from "./Icons-GSE-QGuJ.js";
import { n as i, y as a } from "./MediaIcons-_ai5Til2.js";
import { c as o, l as s, t as c } from "./Text-4BIlhd_-.js";
import { t as l } from "./Badge-B51Hl2wN.js";
import { t as u } from "./Banner-CU6GChN-.js";
import { t as d } from "./Modal-CEiWhFnj.js";
import { t as f } from "./ConfirmDialog-CKsotSAg.js";
import { t as p } from "./EmptyState-CpS13Gy4.js";
import { n as m } from "./ThinkingDots-mZ3dq0w9.js";
import { n as h } from "./StatusPill-CLkB5jFS.js";
import { t as g } from "./SkeletonCard-D3FL0TB7.js";
import { n as _ } from "./Slider-DEbQCKD1.js";
import { t as v } from "./Avatar-CpUrJRJP.js";
import { t as y } from "./SegmentedControl-CSn7GyT9.js";
import { t as b } from "./InlineAlert-CBtteaVZ.js";
import { n as x, r as S, t as C } from "./NotificationBell-BfnDXG_9.js";
import { t as w } from "./PresenceAvatars-CxgG8QFo.js";
import { t as T } from "./FileUploadDrop-DrckU_7j.js";
import { t as E } from "./ActivityFeed-Cp6MhNab.js";
import { a as D, i as O, n as k, o as A } from "./DockedAside-BDA5tJ1T.js";
import { d as j, dt as M, lt as N, n as P, t as F, u as ee, ut as te } from "./ConversationSurface-Cj3TMoE4.js";
import { E as I, G as ne, R as re, T as ie, Y as L, _ as R, i as ae, k as oe, n as se, q as ce, s as z, t as le, w as ue, x as de, y as fe } from "./BreakoutRoomsPanel-Cv8bxfze.js";
import { t as pe } from "./useActiveSpeaker-BGKJU3Lb.js";
import { c as B, o as me, s as he } from "./useDocumentImageUpload-3W74XPh6.js";
import { Component as V, createContext as H, createElement as ge, useCallback as U, useContext as _e, useEffect as W, useMemo as G, useRef as K, useState as q } from "react";
import { Fragment as J, jsx as Y, jsxs as X } from "react/jsx-runtime";
import * as ve from "yjs";
//#region src/integrations/realtime/HangoutRoomRow.tsx
function ye(e) {
	function t(t) {
		return be(e, t);
	}
	return t;
}
function be(e, { slug: t, name: n, participantId: r, occupancy: i, subscribeRoomsIndex: a, onClick: o, onContextMenu: s, onOpenConversation: c, kebab: u, className: d, "data-testid": f = "room-row" }) {
	let p = e.useRoomOccupancy(a ? t : null, { subscribeRoomsIndex: a }), m = a ? p.occupancy ?? null : i ?? null, h = m?.count ?? 0, g = m?.members ?? [], _ = G(() => r ? g.some((e) => e.participantId === r) : !1, [g, r]), v = _, y = G(() => g.slice(0, 3).map((e) => ({
		id: e.participantId,
		name: e.displayName || e.userId,
		online: !0
	})), [g]), b = null;
	h > 1 ? b = /* @__PURE__ */ X(J, { children: [/* @__PURE__ */ Y(w, {
		users: y,
		maxVisible: 3,
		size: 18
	}), /* @__PURE__ */ Y(l, {
		variant: "count",
		value: h,
		color: "muted"
	})] }) : h === 1 && _ ? b = /* @__PURE__ */ Y(l, {
		variant: "pulse",
		color: "accent",
		"aria-label": "Just you in this room",
		"data-testid": `${f}-self-pulse`
	}) : h === 1 && (b = /* @__PURE__ */ X(J, { children: [/* @__PURE__ */ Y(w, {
		users: y,
		maxVisible: 1,
		size: 18
	}), /* @__PURE__ */ Y(l, {
		variant: "count",
		value: 1,
		color: "muted"
	})] }));
	let x = c ? /* @__PURE__ */ Y("button", {
		type: "button",
		"aria-label": `Open the ${n} conversation`,
		title: "Open conversation",
		"data-testid": `${f}-open-conversation`,
		onClick: (e) => {
			e.stopPropagation(), c();
		},
		className: "grid h-5 w-5 place-items-center rounded bg-transparent text-[11px] text-text-tertiary opacity-0 transition-opacity hover:bg-surface-hover hover:text-text-primary focus:opacity-100 group-hover:opacity-100",
		children: "💬"
	}) : null;
	return /* @__PURE__ */ Y(D, {
		"data-testid": f,
		icon: /* @__PURE__ */ Y("span", {
			"aria-hidden": "true",
			className: "font-semibold text-text-tertiary",
			children: "#"
		}),
		label: n,
		trailing: b,
		active: v,
		onClick: o,
		onContextMenu: s,
		kebab: u ?? x,
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
var xe = 3, Se = 48;
function Ce(e) {
	return e.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 48);
}
function Z(e) {
	let t = e.trim();
	return t.length === 0 ? "Name is required." : t.length < xe ? `Name must be at least ${xe} characters.` : t.length > Se ? `Name must be at most ${Se} characters.` : null;
}
function we({ open: e, onClose: n, onCreate: r, onCreated: i, defaultVisibility: a }) {
	let [o, s] = q(""), [c, l] = q(""), [u, f] = q(!1), [p, m] = q(!1), [h, g] = q(!1), [v, y] = q(null);
	W(() => {
		e && (s(""), l(""), f(!1), m(!1), g(!1), y(null));
	}, [e]);
	let b = G(() => Z(o), [o]), x = G(() => Ce(o), [o]), S = !b && !h;
	async function C(e) {
		if (e.preventDefault(), S) {
			g(!0), y(null);
			try {
				let e = await r({
					name: o.trim(),
					description: c.trim() || void 0,
					visibility: a,
					settings: {
						audioOnly: u,
						recordingEnabled: p
					}
				});
				i?.(e), n();
			} catch (e) {
				y(e instanceof Error ? e.message : "Failed to create room."), g(!1);
			}
		}
	}
	return /* @__PURE__ */ Y(d, {
		open: e,
		onClose: h ? () => {} : n,
		title: "New room",
		maxWidth: 440,
		rawChildren: !0,
		backdropTestId: "new-hangout-room-dialog",
		footer: null,
		children: /* @__PURE__ */ X("form", {
			onSubmit: C,
			className: "flex flex-col gap-4",
			children: [
				/* @__PURE__ */ X("label", {
					className: "flex flex-col gap-1",
					children: [
						/* @__PURE__ */ Y("span", {
							className: "text-[12px] font-semibold text-text-primary",
							children: "Name"
						}),
						/* @__PURE__ */ Y("input", {
							"data-autofocus": !0,
							"data-testid": "new-hangout-room-name",
							type: "text",
							value: o,
							onChange: (e) => s(e.target.value),
							placeholder: "Team standup",
							maxLength: 58,
							disabled: h,
							className: "w-full px-3 py-2 text-sm border border-border-emphasis rounded-md focus:outline-none focus:ring-2 focus:ring-info"
						}),
						/* @__PURE__ */ X("div", {
							className: "flex items-center justify-between text-[11px] text-text-tertiary",
							children: [/* @__PURE__ */ Y("span", {
								"data-testid": "new-hangout-room-slug-preview",
								children: x ? `#${x}` : "Slug preview appears here"
							}), /* @__PURE__ */ Y("span", { children: `${o.trim().length}/${Se}` })]
						}),
						b && o.length > 0 && /* @__PURE__ */ Y("span", {
							"data-testid": "new-hangout-room-name-error",
							className: "text-[11px] text-danger-fg",
							children: b
						})
					]
				}),
				/* @__PURE__ */ X("label", {
					className: "flex flex-col gap-1",
					children: [/* @__PURE__ */ X("span", {
						className: "text-[12px] font-semibold text-text-primary",
						children: ["Description ", /* @__PURE__ */ Y("span", {
							className: "font-normal text-text-tertiary",
							children: "(optional)"
						})]
					}), /* @__PURE__ */ Y("textarea", {
						"data-testid": "new-hangout-room-description",
						value: c,
						onChange: (e) => l(e.target.value),
						placeholder: "What's this room for?",
						rows: 2,
						disabled: h,
						className: "w-full px-3 py-2 text-sm border border-border-emphasis rounded-md focus:outline-none focus:ring-2 focus:ring-info resize-none"
					})]
				}),
				/* @__PURE__ */ X("div", {
					className: "flex flex-col gap-3",
					children: [/* @__PURE__ */ X("label", {
						className: "flex items-center justify-between gap-3",
						children: [/* @__PURE__ */ X("span", {
							className: "flex flex-col",
							children: [/* @__PURE__ */ Y("span", {
								className: "text-[13px] font-semibold text-text-primary",
								children: "Audio only"
							}), /* @__PURE__ */ Y("span", {
								className: "text-[11px] text-text-tertiary",
								children: "Skip video tracks — voice-only room."
							})]
						}), /* @__PURE__ */ Y(_, {
							checked: u,
							onChange: f,
							disabled: h,
							"aria-label": "Audio only",
							"data-testid": "new-hangout-room-audio-only"
						})]
					}), /* @__PURE__ */ X("label", {
						className: "flex items-center justify-between gap-3",
						children: [/* @__PURE__ */ X("span", {
							className: "flex flex-col",
							children: [/* @__PURE__ */ Y("span", {
								className: "text-[13px] font-semibold text-text-primary",
								children: "Recording enabled"
							}), /* @__PURE__ */ Y("span", {
								className: "text-[11px] text-text-tertiary",
								children: "Allow server-side recording of sessions."
							})]
						}), /* @__PURE__ */ Y(_, {
							checked: p,
							onChange: m,
							disabled: h,
							"aria-label": "Recording enabled",
							"data-testid": "new-hangout-room-recording"
						})]
					})]
				}),
				v && /* @__PURE__ */ Y("div", {
					"data-testid": "new-hangout-room-error",
					role: "alert",
					className: "text-[12px] text-danger-fg bg-danger-bg border border-danger-border rounded-md px-3 py-2",
					children: v
				}),
				/* @__PURE__ */ X("div", {
					className: "flex justify-end gap-2 pt-1",
					children: [/* @__PURE__ */ Y(t, {
						type: "button",
						variant: "ghost",
						onClick: n,
						disabled: h,
						children: "Cancel"
					}), /* @__PURE__ */ Y(t, {
						type: "submit",
						variant: "primary",
						disabled: !S,
						"data-testid": "new-hangout-room-submit",
						children: h ? "Creating…" : "Create room"
					})]
				})
			]
		})
	});
}
//#endregion
//#region src/integrations/realtime/HangoutRoomsSection.tsx
function Te(e) {
	function t(t) {
		return Ee(e, t);
	}
	return t;
}
function Ee(e, { rooms: r, occupancyFor: i, occupancyAdapter: a, participantId: o, onJoinRoom: s, onOpenConversation: c, onContextMenu: l, onBrowseAll: u, maxVisible: d = 10, title: f = "Rooms", storageKey: m, collapsed: h = !1, onToggleCollapse: g, renderCreateDialog: _ }) {
	let [v, y] = q(!1), b = () => y(!0), x = () => y(!1), S = G(() => {
		let e = /* @__PURE__ */ new Set(), t = [];
		for (let n of r.rooms) n.state === "active" && (e.has(n.slug) || (e.add(n.slug), t.push(n)));
		return t;
	}, [r.rooms]), C = G(() => S.slice(0, d), [S, d]), w = S.length - C.length, T = /* @__PURE__ */ Y(n, {
		"aria-label": "New room",
		size: "sm",
		onClick: b,
		icon: /* @__PURE__ */ Y("span", {
			"aria-hidden": "true",
			className: "text-[14px] leading-none font-bold",
			children: "+"
		}),
		"data-testid": "new-room-button"
	}), E = g !== void 0, O = /* @__PURE__ */ X(J, { children: [
		r.isLoading && /* @__PURE__ */ Y("div", {
			className: "flex flex-col gap-1 px-1 py-1",
			"data-testid": "hangout-rooms-loading",
			children: [
				0,
				1,
				2
			].map((e) => /* @__PURE__ */ Y("div", {
				"aria-hidden": "true",
				className: "h-7 rounded-md bg-surface-hover animate-pulse"
			}, e))
		}),
		!r.isLoading && r.error && /* @__PURE__ */ X("div", {
			role: "alert",
			"data-testid": "hangout-rooms-error",
			className: "mx-1 my-1 px-3 py-2 text-[12px] text-danger-fg bg-danger-bg border border-danger-border rounded-md flex items-center justify-between gap-2",
			children: [/* @__PURE__ */ Y("span", {
				className: "truncate",
				children: "Couldn't load rooms."
			}), /* @__PURE__ */ Y("button", {
				type: "button",
				onClick: () => void r.refetch(),
				className: "text-danger-fg underline hover:text-danger-fg cursor-pointer",
				children: "Retry"
			})]
		}),
		!r.isLoading && !r.error && S.length === 0 && /* @__PURE__ */ Y(p, {
			testId: "hangout-rooms-empty",
			title: "No rooms yet",
			description: "Create one to start an ongoing hangout.",
			action: /* @__PURE__ */ Y(t, {
				onClick: b,
				variant: "primary",
				size: "sm",
				children: "Create room"
			})
		}),
		!r.isLoading && !r.error && S.length > 0 && /* @__PURE__ */ X("div", {
			className: "flex flex-col gap-0.5",
			children: [C.map((t) => /* @__PURE__ */ Y(e, {
				slug: t.slug,
				name: t.name,
				participantId: o,
				subscribeRoomsIndex: a,
				occupancy: a ? null : i?.(t.slug) ?? null,
				onClick: s ? () => s(t) : void 0,
				onOpenConversation: c ? () => c(t) : void 0,
				onContextMenu: l ? (e) => l(t, e) : void 0
			}, t.slug)), w > 0 && u && /* @__PURE__ */ Y(D, {
				"data-testid": "hangout-rooms-browse-all",
				label: /* @__PURE__ */ X("span", {
					className: "text-[12px] text-neutral",
					children: [
						"Browse all (",
						S.length,
						")"
					]
				}),
				onClick: u
			})]
		})
	] });
	return /* @__PURE__ */ X(J, { children: [E ? /* @__PURE__ */ X("div", {
		"data-testid": "rooms-section",
		"data-collapsed": h ? "true" : "false",
		className: "flex flex-col",
		children: [/* @__PURE__ */ Y(N, {
			label: f,
			presentational: !1,
			collapsed: h,
			onToggleCollapse: g,
			count: S.length,
			actions: [{
				label: "New room",
				onClick: b,
				"data-testid": "new-room-button"
			}],
			"data-testid": "rooms-section-header"
		}), !h && O]
	}) : /* @__PURE__ */ Y(A, {
		title: f,
		storageKey: m,
		actions: T,
		"data-testid": "rooms-section",
		children: O
	}), _ ? _({
		open: v,
		onClose: x
	}) : /* @__PURE__ */ Y(we, {
		open: v,
		onClose: x,
		onCreate: r.createRoom,
		onCreated: (e) => {
			s?.(e);
		}
	})] });
}
//#endregion
//#region src/integrations/realtime-modules/NetworkErrorBoundary.tsx
var De = class extends V {
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
		return t ? t(e, this.reset) : /* @__PURE__ */ Y("div", {
			"data-testid": "network-error-boundary-fallback",
			children: /* @__PURE__ */ Y(p, {
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
function Oe({ connectionState: t, children: n, onRetry: r, reconnectingLabel: i, disconnectedTitle: a = "Disconnected", disconnectedDescription: o = "The connection to the server was lost. Check your network and try again.", retryLabel: s = "Try again", connectingPlaceholder: c, disconnectedFallback: l, className: u }) {
	return t === "connecting" ? /* @__PURE__ */ Y("div", {
		"data-testid": "reconnecting-shim-connecting",
		className: u,
		children: c ?? /* @__PURE__ */ Y(g, { height: 120 })
	}) : t === "disconnected" ? /* @__PURE__ */ Y("div", {
		"data-testid": "reconnecting-shim-disconnected",
		className: u,
		children: l ?? /* @__PURE__ */ Y(p, {
			icon: "📡",
			title: a,
			description: o,
			actionLabel: r ? s : void 0,
			onAction: r
		})
	}) : t === "reconnecting" ? /* @__PURE__ */ X("div", {
		"data-testid": "reconnecting-shim-reconnecting",
		className: e("relative", u),
		children: [/* @__PURE__ */ Y("div", {
			className: "opacity-60 pointer-events-none",
			children: n
		}), /* @__PURE__ */ Y(ue, {
			show: !0,
			label: i
		})]
	}) : /* @__PURE__ */ Y("div", {
		"data-testid": "reconnecting-shim-connected",
		className: u,
		children: n
	});
}
//#endregion
//#region src/integrations/realtime-modules/networkShim.tsx
function ke(e, t) {
	return t ? /* @__PURE__ */ Y(De, {
		title: t.errorTitle,
		description: t.errorDescription,
		retryLabel: t.retryLabel,
		onRetry: t.onRetry,
		onError: t.onError,
		fallback: t.errorFallback,
		children: /* @__PURE__ */ Y(Oe, {
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
function Ae(e) {
	function t(t) {
		return je(e, t);
	}
	return t;
}
function je(e, { hangoutRooms: t, subscribeRoomsIndex: n, occupancyFor: r, participantId: i, onJoin: a, onContextMenu: o, onBrowseAll: s, maxVisible: c, title: l, storageKey: u, renderEmpty: d, collapsed: f, onToggleCollapse: p, renderCreateDialog: m, wrapWithNetworkShim: h }) {
	return t.rooms.filter((e) => e.state === "active").length === 0 && !t.isLoading && !t.error && d ? /* @__PURE__ */ Y("div", {
		"data-testid": "wrapped-hangout-rooms-empty-slot",
		children: d
	}) : /* @__PURE__ */ Y(J, { children: ke(/* @__PURE__ */ Y(e, {
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
		collapsed: f,
		onToggleCollapse: p,
		renderCreateDialog: m
	}), h) });
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
], Me = {
	chat: !0,
	presence: !0
}, Ne = H(null);
function Pe(e) {
	function t(t) {
		return Fe(e, t);
	}
	return t;
}
function Fe(e, { capabilities: t = Me, channel: n, children: r }) {
	let i = G(() => Q.filter((e) => t[e] === !0), [t]), { enabled: a, isLoading: o } = e.useCapabilities(i, n), s = G(() => {
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
	return /* @__PURE__ */ Y(Ne.Provider, {
		value: s,
		children: r
	});
}
function Ie() {
	return _e(Ne) ?? {
		can: Object.fromEntries(Q.map((e) => [e, !1])),
		declared: Object.fromEntries(Q.map((e) => [e, !1])),
		provisioned: Object.fromEntries(Q.map((e) => [e, !1])),
		isLoading: !1
	};
}
function Le({ need: e, children: t, fallback: n = null }) {
	let { can: r } = Ie(), i = (Array.isArray(e) ? e : [e]).every((e) => r[e]);
	return /* @__PURE__ */ Y(J, { children: i ? t : n });
}
//#endregion
//#region src/integrations/realtime/WrappedConversationSurface.tsx
var Re = {
	files: "conversation.files",
	documents: "conversation.documents",
	pins: "conversation.pins",
	mentions: "conversation.mentions",
	calls: "conversation.calls"
};
function ze(e = F, t = {}) {
	return e.filter((e) => e !== "chat" && e !== "members").map((e) => t[e] ?? Re[e]);
}
function Be(e) {
	return (t) => Ve(e, t);
}
function Ve(e, t) {
	let { channel: n = null, hasDocuments: r = !0, from: i = F } = t;
	return i.filter((t) => t === "mentions" ? !1 : t === "documents" ? r : t !== "calls" || !!e.lobbyForChannel(n));
}
function He({ declare: e = F, capabilities: t, capabilitiesError: n, capabilityNames: r = {}, children: i, ...a }) {
	let o = G(() => {
		let i = r;
		return e.filter((e) => e === "chat" || e === "members" || !t || n ? !0 : t[i[e] ?? Re[e]] === !0);
	}, [
		e,
		t,
		n,
		r
	]);
	return /* @__PURE__ */ Y(P, {
		...a,
		features: o,
		children: i
	});
}
//#endregion
//#region src/integrations/realtime/WrappedStreamStage.tsx
function Ue(e, { channelArn: t, excludeParticipantId: n, getAuthToken: r, baseUrl: i, onStatusChange: a, ...o }) {
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
	return W(() => {
		a?.({
			mode: "realtime",
			live: c,
			error: s.error
		});
	}, [
		c,
		s.error,
		a
	]), /* @__PURE__ */ Y(z, {
		...o,
		live: c,
		stream: s.stream,
		...l === null ? {} : { viewerCount: l }
	});
}
function We(e, { channelArn: t, playbackToken: n, baseUrl: r, onStatusChange: i, ...a }) {
	let o = e.useLVSLiveHls({
		channelArn: t,
		playbackToken: n,
		baseUrl: r
	}), { viewerCount: s } = e.useLVSViewerCount({
		channelArn: t,
		baseUrl: r,
		playbackToken: n
	});
	return W(() => {
		i?.({
			mode: "near-realtime",
			live: o.ready,
			error: null
		});
	}, [o.ready, i]), /* @__PURE__ */ Y(z, {
		...a,
		live: o.ready,
		playlistUrl: o.playlistUrl,
		...s === null ? {} : { viewerCount: s }
	});
}
function Ge(e) {
	function t(t) {
		return Ue(e, t);
	}
	function n(t) {
		return We(e, t);
	}
	function r({ mode: e = "near-realtime", ...r }) {
		return Y(e === "realtime" ? t : n, { ...r });
	}
	return r;
}
//#endregion
//#region src/integrations/realtime/WrappedLVSHangoutLayout.tsx
function Ke({ stream: e, displayName: t }) {
	return e ? /* @__PURE__ */ Y("video", {
		autoPlay: !0,
		playsInline: !0,
		muted: !0,
		ref: (t) => {
			t && t.srcObject !== e && (t.srcObject = e);
		},
		className: "w-full h-full object-cover scale-x-[-1]"
	}) : /* @__PURE__ */ Y("div", {
		className: "w-full h-full grid place-items-center bg-surface-emphasis",
		"data-testid": "local-camera-avatar",
		children: /* @__PURE__ */ Y(v, {
			name: t,
			size: 64
		})
	});
}
function qe(e, t) {
	let n = e.isLocal, r = n ? t ?? e.displayName ?? "You" : e.displayName || e.participantId.slice(0, 8), i = e.streams[0], a = e.screenStream, o = n ? /* @__PURE__ */ Y(Ke, {
		stream: i,
		displayName: r
	}) : /* @__PURE__ */ Y(ie, {
		stream: i,
		displayName: r,
		cameraOn: e.hasVideo
	}), s = a ? /* @__PURE__ */ Y(I, {
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
function Je(e) {
	function t(t) {
		return Ye(e, t);
	}
	return t;
}
function Ye(e, { stageToken: t, participantId: n, userId: r, localClientId: i, getStageToken: a, overlay: o, spotlightContent: s, onParticipantClick: c, mode: l = "auto", activeSpeakerStrategy: u = "audio-level", localTileLabel: d, showLocalAsTile: f = !0, handFor: p, className: m, "data-testid": h }) {
	let g = e.useLVSHangout({
		stageToken: t,
		participantId: n,
		userId: r ?? n.slice(0, 8),
		getAuthToken: a
	}), _ = G(() => g.participants.filter((e) => f || !e.isLocal).map((e) => {
		let t = qe(e, d), n = p?.(e.appUserId ?? e.userId);
		return n ? {
			...t,
			handRaised: n
		} : t;
	}), [
		g.participants,
		f,
		d,
		p
	]), v = g.participants.filter((e) => !e.isLocal).length, y = {
		connectionState: g.connectionState,
		error: g.error,
		participantCount: g.participants.length,
		remoteCount: v
	};
	return /* @__PURE__ */ X("div", {
		"data-testid": h,
		className: `relative flex-1 min-h-0 ${m ?? ""}`,
		children: [/* @__PURE__ */ Y(oe, {
			participants: _,
			localParticipant: null,
			mode: l,
			spotlightContent: s,
			onParticipantClick: c,
			className: "h-full"
		}), o && /* @__PURE__ */ Y("div", {
			className: "absolute inset-0 pointer-events-none z-10",
			"data-testid": "wrapped-overlay-slot",
			children: /* @__PURE__ */ Y("div", {
				className: "pointer-events-auto",
				children: o(y)
			})
		})]
	});
}
//#endregion
//#region src/integrations/realtime/createRealtimeIntegrations.tsx
function Xe(e) {
	let t = ye(e), n = Te(t);
	return {
		HangoutRoomRow: t,
		HangoutRoomsSection: n,
		WrappedHangoutRoomsList: Ae(n),
		RealtimeCapabilityProvider: Pe(e),
		conversationFeaturesFor: Be(e),
		WrappedStreamStage: Ge(e),
		WrappedLVSHangoutLayout: Je(e)
	};
}
var Ze = H(null), Qe = /* @__PURE__ */ new WeakMap();
function $e(e) {
	let t = Qe.get(e);
	return t || (t = Xe(e), Qe.set(e, t)), t;
}
function et({ modules: e, children: t }) {
	let n = G(() => $e(e), [e]);
	return /* @__PURE__ */ Y(Ze.Provider, {
		value: n,
		children: t
	});
}
function tt() {
	let e = _e(Ze);
	if (!e) throw Error("useRealtimeIntegrations() needs a <RealtimeIntegrationsProvider modules={…}> above it.");
	return e;
}
//#endregion
//#region src/integrations/realtime/canvasRecovery.ts
function nt(e, t, n, r = "canvasRecovery") {
	return `${r}:${JSON.stringify([
		e,
		t,
		n
	])}`;
}
function rt(e) {
	let t = "";
	for (let n = 0; n < e.length; n += 8192) t += String.fromCharCode(...e.subarray(n, n + 8192));
	return {
		version: 1,
		savedAt: (/* @__PURE__ */ new Date()).toISOString(),
		snapshot: btoa(t)
	};
}
function it(e) {
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
function at(e, t, n, r) {
	let i = nt(e, t, n, r), [a, o] = q(() => {
		try {
			let e = JSON.parse(sessionStorage.getItem(i) ?? "null");
			return it(e?.recovered ?? e?.pending) ? e.recovered ?? e.pending : null;
		} catch {
			return null;
		}
	}), s = K(a), c = K(null), [l, u] = q(!1), d = U(() => {
		try {
			!s.current && !c.current ? sessionStorage.removeItem(i) : sessionStorage.setItem(i, JSON.stringify({
				recovered: s.current,
				pending: c.current
			})), u(!1);
		} catch {
			u(!0);
		}
	}, [i]), f = U((e) => {
		s.current = rt(e), o(s.current), d();
	}, [d]), p = U(() => {
		s.current = null, o(null), d();
	}, [d]), m = U((e, t) => {
		if (!e || !t) return () => {};
		let n = () => {
			t.pendingUpdateCount && (c.current = rt(ve.encodeStateAsUpdate(e)), d());
		};
		return e.on("update", n), n(), () => e.off("update", n);
	}, [d]), h = U(() => {
		c.current = null, d();
	}, [d]);
	return W(() => {
		d();
	}, [d]), {
		recovered: a,
		storageError: l,
		retain: f,
		clear: p,
		track: m,
		acknowledged: h,
		download: U(() => {
			let e = it(s.current ?? c.current);
			if (!e) return;
			let t = URL.createObjectURL(new Blob([Uint8Array.from(e)], { type: "application/octet-stream" })), r = document.createElement("a");
			r.href = t, r.download = `document-${n}-recovery.yjs`, r.click(), window.setTimeout(() => URL.revokeObjectURL(t), 1e3);
		}, [n]),
		restore: U((e) => {
			let t = it(s.current);
			t && (ve.applyUpdate(e, t, "explicit-recovery"), p());
		}, [p])
	};
}
//#endregion
//#region src/integrations/realtime/canvasDocumentState.ts
function ot(e, t, n, r) {
	if (e !== "idle") return {
		status: !n && t > 0 ? "offline" : e,
		...e === "error" || !n ? { onRetry: r } : {}
	};
}
function st(e, t, n = Date.now()) {
	return t && e.canEdit && e.expiresAt > n;
}
//#endregion
//#region src/integrations/realtime/CanvasDocumentPane.tsx
var ct = {
	showRuler: !0,
	showStatusBar: !1,
	toolbarStyle: "card",
	pageMargin: "narrow",
	fitHeight: "parent",
	paginate: !0
};
function lt(e) {
	return function(n) {
		let { documentId: r, tenant: i, userId: a, userName: c, userColor: l = "teal", canEdit: u, editing: p = !0, extensions: g, loadImage: _, isProtectedImage: v, uploadImage: y, onPendingChange: x, notices: S, children: C, viewProps: w, onEditorReady: E, loadingLabel: D = "Loading collaborative document…", layout: O, keyPrefix: k } = n, A = e.useGateway(), j = at(i, a, r, k), M = e.useYjsDoc({
			documentId: r,
			ws: A,
			onMessage: A.onMessage,
			onUnpersistedChanges: j.retain
		}), N = e.useCanvasDocument({ ydoc: M.ydoc }), P = A.connectionState === "connected", F = u && p && M.synced && P, ee = K(F);
		ee.current = F;
		let [te, I] = q(!1), [ne, re] = q(null), [ie, L] = q(!1), [R, ae] = q(!1), [oe, se] = q(null), ce = K(null), z = G(() => ({
			name: c,
			color: l
		}), [c, l]);
		W(() => j.track(M.ydoc, M.provider), [
			M.ydoc,
			M.provider,
			j.track
		]), W(() => {
			M.persistenceState === "saved" && M.pendingUpdateCount === 0 && j.acknowledged();
		}, [
			M.persistenceState,
			M.pendingUpdateCount,
			j.acknowledged
		]), W(() => {
			x?.(M.pendingUpdateCount);
		}, [M.pendingUpdateCount, x]), W(() => {
			M.provider?.awareness.setLocalStateField("user", {
				...z,
				id: a
			});
		}, [
			M.provider,
			z,
			a
		]), W(() => {
			if (M.pendingUpdateCount === 0) return;
			let e = (e) => {
				e.preventDefault(), e.returnValue = "";
			};
			return window.addEventListener("beforeunload", e), () => window.removeEventListener("beforeunload", e);
		}, [M.pendingUpdateCount]), W(() => A.onMessage((e) => {
			e.channel === `doc:${r}` && (e.type === "crdt:error" && re(typeof e.error == "string" ? e.error : "The document operation was refused."), e.type === "crdt:snapshot" && re(null));
		}), [A.onMessage, r]);
		let le = async (e) => {
			let t = ce.current;
			if (!(!y || !t || t.isDestroyed || !ee.current || R)) {
				ae(!0), se(null);
				try {
					let n = await y(e);
					if (ce.current !== t || t.isDestroyed || !ee.current) throw Error("The document is no longer editable. The image was not inserted.");
					t.chain().focus().setImage({
						src: n,
						alt: e.name
					}).run(), L(!1);
				} catch (e) {
					se(e instanceof Error ? e.message : "The image could not be uploaded.");
				} finally {
					ae(!1);
				}
			}
		}, ue = ot(M.persistenceState, M.pendingUpdateCount, P, M.retryPersistence), de = {
			editable: F,
			online: P,
			synced: M.synced,
			pendingUpdateCount: M.pendingUpdateCount,
			persistenceState: M.persistenceState,
			docVersion: M.docVersion,
			ydoc: M.ydoc,
			exportMarkdown: N.exportMarkdown
		}, fe = /* @__PURE__ */ X(J, { children: [
			S,
			j.recovered && /* @__PURE__ */ Y(b, {
				tone: "warning",
				children: /* @__PURE__ */ X(s, {
					gap: "xs",
					children: ["Changes from an earlier editing session are available for recovery. They have not been applied to this document.", /* @__PURE__ */ X(o, {
						gap: "sm",
						wrap: !0,
						children: [
							/* @__PURE__ */ Y(t, {
								size: "sm",
								variant: "secondary",
								onClick: j.download,
								children: "Download recovery"
							}),
							u && /* @__PURE__ */ Y(t, {
								size: "sm",
								variant: "secondary",
								disabled: !M.synced || !P || M.pendingUpdateCount > 0,
								onClick: () => I(!0),
								children: "Recover changes…"
							}),
							/* @__PURE__ */ Y(t, {
								size: "sm",
								variant: "ghost",
								onClick: j.clear,
								children: "Discard recovery"
							})
						]
					})]
				})
			}),
			j.storageError && /* @__PURE__ */ Y(b, {
				tone: "warning",
				children: /* @__PURE__ */ X(o, {
					gap: "sm",
					wrap: !0,
					children: ["This browser could not keep a recovery copy. Keep this page open until saving finishes.", /* @__PURE__ */ Y(t, {
						size: "sm",
						variant: "secondary",
						onClick: j.download,
						children: "Download recovery"
					})]
				})
			}),
			ne && /* @__PURE__ */ Y(b, {
				tone: "error",
				children: ne
			})
		] }), pe = M.synced && !!M.ydoc && !!N.body, he = /* @__PURE__ */ X(J, { children: [
			C,
			/* @__PURE__ */ Y(f, {
				open: te,
				onCancel: () => I(!1),
				title: "Recover earlier changes?",
				tone: "caution",
				body: "This explicitly merges the recovered document with the current version. It can bring back content removed by a version restore. Download the recovery first if you want to keep a separate copy.",
				confirmLabel: "Recover changes",
				onConfirm: () => {
					M.ydoc && u && P && M.pendingUpdateCount === 0 && j.restore(M.ydoc), I(!1);
				}
			}),
			y && /* @__PURE__ */ Y(d, {
				open: ie,
				onClose: () => {
					R || L(!1);
				},
				title: "Insert image",
				children: /* @__PURE__ */ X(s, {
					gap: "sm",
					children: [oe && /* @__PURE__ */ Y(b, {
						tone: "error",
						children: oe
					}), /* @__PURE__ */ Y(T, {
						accept: "image/*",
						maxSize: 10485760,
						disabled: R || !F,
						label: R ? "Uploading image…" : "Choose an image or drop it here",
						onFiles: (e) => {
							e[0] && le(e[0]);
						}
					})]
				})
			})
		] }), V = (e, t = null, n = null) => O ? O({
			notices: fe,
			canvas: e,
			toolbar: t,
			ruler: n,
			saveState: ue,
			state: de
		}) : /* @__PURE__ */ X(J, { children: [fe, e] });
		if (!pe) return V(/* @__PURE__ */ Y(h, { label: D }));
		if (!N.isCanvas) return V(/* @__PURE__ */ Y(m, {
			title: "Document migration is incomplete",
			body: "The server has not supplied a rich document snapshot. No changes have been made."
		}));
		let H = (e) => /* @__PURE__ */ X(me, {
			loadImage: _,
			...v ? { requiresAuthentication: v } : {},
			children: [/* @__PURE__ */ ge(B, {
				...ct,
				...w,
				key: M.docVersion,
				isCanvas: !0,
				body: N.body,
				ydoc: M.ydoc,
				provider: M.provider,
				user: z,
				editable: F,
				extensions: g,
				...y && F ? { onInsertImage: () => {
					se(null), L(!0);
				} } : {},
				...e ? { renderFrame: ({ toolbar: t, ruler: n, surface: r }) => e(t, n, r) } : {},
				onEditorReady: (e) => {
					ce.current = e, E?.(e);
				}
			}), he]
		});
		return O ? H((e, t, n) => V(/* @__PURE__ */ Y(s, {
			gap: "none",
			className: "min-h-0 flex-1",
			"data-testid": "document-canvas-slot",
			children: n
		}), e, t)) : V(/* @__PURE__ */ Y(s, {
			gap: "none",
			className: "min-h-0 flex-1",
			"data-testid": "document-canvas-slot",
			children: H()
		}));
	};
}
//#endregion
//#region src/integrations/realtime/canvasDocumentExtensions.ts
function ut(e, t) {
	return e({
		...t,
		Image: he(t.Image)
	});
}
//#endregion
//#region src/integrations/realtime/ConversationCallDock.tsx
var dt = (e) => e.stream ? /* @__PURE__ */ Y(I, {
	stream: e.stream,
	muted: e.isLocal
}) : void 0, ft = () => typeof HTMLMediaElement < "u" && "setSinkId" in HTMLMediaElement.prototype;
function pt(e, t, n) {
	if (n !== "calling" && n !== "connecting" && n !== "active" && n !== "reconnecting") return e;
	let r = new Set(e.map((e) => e.userId)), i = t.filter((e) => !e.isLocal && e.state === "ringing" && !r.has(e.id)).map((e) => ({
		id: e.id,
		userId: e.id,
		displayName: e.displayName,
		...e.avatarUrl ? { avatarUrl: e.avatarUrl } : {},
		isLocal: !1,
		isMuted: !1,
		cameraOn: !1,
		audioOn: !0,
		screenSharing: !1,
		presenting: !1,
		connection: "ringing"
	}));
	return i.length ? [...e, ...i] : e;
}
function mt(e, t) {
	if (!t) return e;
	let n = !1, r = e.map((e) => {
		let r = t(e.userId);
		return r ? (n = !0, {
			...e,
			handRaised: r
		}) : e;
	});
	return n ? r : e;
}
function ht(e) {
	let t = (e?.participants ?? []).filter((e) => !e.isLocal && e.stream && (e.state === "in-call" || e.state === "reconnecting")), n = t.map((e) => `${e.id}=${e.stream.id}`).join("|");
	return G(() => t.map((e) => ({
		participantId: e.id,
		streams: [e.stream]
	})), [n]);
}
function gt(e, { call: t, title: n, onOpenPeople: r, peopleOpen: i, onOpenSettings: a, onPopOut: o, extras: s, cameraMenuItems: c, tile: l = dt, notice: u, handFor: f, selfName: p, compact: m = !1, tileSize: h, documents: g, onOpenDocuments: _, documentsOpen: v, onDocumentClick: y, layout: x = "shelf", className: S, "data-testid": C = "conversation-call-dock" }) {
	let [w, T] = q(!1), E = t.media?.captureError ?? null, [D, O] = q(null);
	W(() => {
		E || O(null);
	}, [E]);
	let k = e.useAudioVideoSettings({ preview: w }), { activeSpeakerId: A } = pe({ participants: ht(t.call) }), j = e.conversationCallDockProps(t, {
		title: n,
		onOpenPeople: r,
		...i === void 0 ? {} : { peopleOpen: i },
		onOpenSettings: a ?? (() => T(!0)),
		...o ? { onPopOut: o } : {},
		...s === void 0 ? {} : { extras: s },
		...c ? { cameraMenuItems: c } : {},
		tile: l,
		activeSpeakerId: A ?? t.activeSpeakerId,
		compact: m,
		"data-testid": C
	});
	if (!j) return null;
	let M = {
		...j,
		participants: mt(pt(j.participants, t.call?.participants ?? [], j.phase), f),
		layout: x,
		...h ? { tileSize: h } : {},
		...g ? { documents: g } : {},
		..._ ? { onOpenDocuments: _ } : {},
		...v === void 0 ? {} : { documentsOpen: v },
		...y ? { onDocumentClick: y } : {},
		...S ? { className: S } : {}
	};
	return /* @__PURE__ */ X(J, { children: [
		u ? /* @__PURE__ */ Y(b, {
			tone: "info",
			"data-testid": `${C}-notice`,
			children: u
		}) : null,
		E && E !== D ? /* @__PURE__ */ X(b, {
			tone: "warning",
			"data-testid": `${C}-capture-error`,
			onDismiss: () => O(E),
			children: [E, " You can keep listening. Check browser device access, then turn the device on to retry."]
		}) : null,
		/* @__PURE__ */ Y(de, { ...M }),
		!a && /* @__PURE__ */ Y(d, {
			open: w,
			onClose: () => T(!1),
			title: "Call devices",
			children: /* @__PURE__ */ Y(ae, {
				"data-testid": `${C}-settings`,
				value: k.settings,
				onChange: (e) => {
					k.update(e), t.devices.set({
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
				micLevel: k.micLevel,
				previewStream: k.previewStream,
				cameraOn: t.self.cameraOn,
				speakerSelectionSupported: ft(),
				onTestMic: k.testMic,
				onTestSound: k.testSound,
				testMicState: k.testMicState,
				...p === void 0 ? {} : { selfName: p }
			})
		})
	] });
}
function _t(e) {
	function t(t) {
		return gt(e, t);
	}
	return t;
}
//#endregion
//#region src/integrations/realtime/IncomingCallToast.tsx
function vt(e) {
	return e.kind === "knock" ? `${e.callerName} asks to join` : `${e.callerName} is calling`;
}
function yt({ ring: e, onAccept: n, onDecline: i, corner: a = "top-right", width: s = 360, className: c, "data-testid": l = "incoming-call-toast" }) {
	let d = e.kind === "knock";
	return /* @__PURE__ */ Y(k, {
		corner: a,
		width: s,
		"data-testid": l,
		...c ? { className: c } : {},
		children: /* @__PURE__ */ Y(u, {
			variant: "info",
			layout: "stacked",
			icon: /* @__PURE__ */ Y(r, { size: 16 }),
			title: vt(e),
			action: /* @__PURE__ */ X(o, {
				gap: "sm",
				children: [/* @__PURE__ */ Y(t, {
					size: "sm",
					variant: "secondary",
					onClick: i,
					"data-testid": "incoming-call-decline",
					children: "Decline"
				}), /* @__PURE__ */ Y(t, {
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
function bt(e) {
	if (!e || typeof e != "object") return null;
	let t = e;
	return typeof t.messageId != "string" || !t.messageId ? null : {
		messageId: t.messageId,
		author: $(t.author) ?? "Unknown",
		text: $(t.text) ?? "",
		...$(t.timestamp) ? { timestamp: t.timestamp } : {}
	};
}
function xt(e) {
	let t = e.metadata?.attachments, n = Array.isArray(t) ? t.filter((e) => !!e && typeof e == "object" && typeof e.url == "string" && typeof e.id == "string") : void 0, r;
	if (e.metadata) {
		let { replyTo: t, ...n } = e.metadata, i = { ...n }, a = bt(t);
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
		...r ? { metadata: r } : {},
		...e.editedAt ? { editedAt: e.editedAt } : {},
		...e.deletedAt ? { deletedAt: e.deletedAt } : {}
	};
}
function St(e) {
	let t = /* @__PURE__ */ new Map();
	for (let n of e) {
		let e = $(n.metadata?.displayName);
		n.userId && e && !n.deletedAt && t.set(n.userId, e);
	}
	return e.map((e) => {
		let n = xt(e);
		return n.displayName || !e.deletedAt ? n : {
			...n,
			displayName: e.userId && t.get(e.userId) || "a removed member"
		};
	});
}
function Ct(e) {
	return {
		id: $(e.metadata?.userId) || e.clientId,
		name: $(e.metadata?.displayName) ?? e.clientId.slice(0, 12),
		avatarUrl: $(e.metadata?.avatarUrl),
		online: e.status !== "offline",
		...e.status === "away" || e.status === "busy" ? { idle: !0 } : {}
	};
}
function wt(e) {
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
var Tt = [
	15,
	25,
	35,
	45,
	55,
	65,
	75,
	85
], Et = [
	20,
	35,
	50,
	65,
	80
];
function Dt(e, t) {
	let n = Tt[t % Tt.length] ?? 50, r = Et[Math.floor(t / Tt.length) % Et.length] ?? 50, i = e.position != null && typeof e.position == "object" ? e.position : null;
	return {
		id: e.id,
		emoji: e.emoji,
		x: i?.x ?? n,
		y: i?.y ?? r,
		timestamp: e.timestamp
	};
}
function Ot(e) {
	return e.map(Dt);
}
function kt(e, t) {
	return (e.reactionsFor ? e.reactionsFor(t) : e.reactions.filter((e) => e.targetId === t)).map((e) => ({
		emoji: e.emoji,
		userId: e.userId ?? e.clientId,
		displayName: e.displayName
	}));
}
function At(e) {
	try {
		let t = Date.now() - new Date(e).getTime(), n = Math.floor(t / 1e3);
		return n < 60 ? "just now" : n < 3600 ? `${Math.floor(n / 60)}m ago` : n < 86400 ? `${Math.floor(n / 3600)}h ago` : e.slice(0, 10);
	} catch {
		return "";
	}
}
var jt = {
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
function Mt(e) {
	let t = e.detail;
	return typeof t.subject == "string" ? t.subject : typeof t.contentId == "string" ? t.contentId.slice(0, 12) : typeof t.roomId == "string" ? `room:${t.roomId.slice(0, 8)}` : typeof t.pipelineId == "string" ? `pipeline:${t.pipelineId}` : e.eventType;
}
function Nt(e, t) {
	return [
		e.eventType,
		e.timestamp,
		e.userId ?? e.displayName,
		t
	].join("|");
}
function Pt(e) {
	return {
		id: Nt(e, Mt(e)),
		actor: e.displayName,
		action: jt[e.eventType] ?? e.eventType.split(".").pop() ?? "did",
		subject: Mt(e),
		ticketId: typeof e.detail.ticketId == "string" ? e.detail.ticketId : void 0,
		timeLabel: At(e.timestamp),
		kind: e.eventType.split(".")[0]
	};
}
function Ft(e) {
	let t = /* @__PURE__ */ new Map();
	return e.map((e) => {
		let n = Pt(e), r = t.get(n.id) ?? 0;
		return t.set(n.id, r + 1), r === 0 ? n : {
			...n,
			id: `${n.id}#${r}`
		};
	});
}
function It(e) {
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
function Lt(e) {
	return e.map(It);
}
function Rt(e, t, n) {
	return {
		id: e.clientId,
		displayName: e.displayName || e.clientId.slice(0, 12),
		isMuted: !e.audioOn,
		isLocal: t == null ? void 0 : e.clientId === t,
		...n ? { avatarUrl: n } : {}
	};
}
function zt(e, t, n) {
	return e.map((e) => Rt(e, t, n?.[e.clientId]));
}
function Bt(e) {
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
function Vt(e) {
	return e.map(Bt);
}
function Ht(e) {
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
function Ut({ chat: e, localMessages: t, presence: n, upload: r, reactions: i, pins: a, currentActor: o, currentUserId: s, displayName: c, avatarUrl: l, sendMetadata: u, publishTyping: d, attachmentSrc: f, onOpenAttachment: p, acceptFiles: m, maxFileSize: h, onFileError: g, disabled: _, typingUsers: v, tone: y, fill: b, flushComposer: x, contentAlign: S, showHeader: C, loadMoreHistory: w = !1, joinHistoryLimit: T = 20, historyPageSize: E = 50, onLoadMore: D, hasMore: O, loadingMore: k, composer: A, renderMessageReferences: M, transformMessages: N, dock: P, emojis: F, onReply: ee, reply: te, onCancelReply: I, readReceipts: ne, readReceiptsEnabled: re, unreadFrom: ie, threaded: L, onJumpToMessage: R, highlightedMessageId: ae, documentEditors: oe, callParticipants: se, onJoinCall: ce, onOpenDocument: z, wrapWithNetworkShim: le, editable: ue = !0, canEdit: de, canDelete: fe, onForwardMessage: pe }) {
	let B = G(() => St(e.messages), [e.messages]), me = G(() => {
		if (!t?.length) return [];
		let e = new Set(B.flatMap((e) => e.id ? [e.id] : [])), n = /* @__PURE__ */ new Set(), r = [];
		for (let i of t) if (i.body !== void 0) {
			if (i.id) {
				if (e.has(i.id) || n.has(i.id)) continue;
				n.add(i.id);
			}
			r.push({
				id: i.id ?? "",
				timestamp: i.timestamp,
				displayName: i.displayName ?? "You",
				content: i.content,
				body: i.body,
				metadata: {},
				...i.actions ? { actions: i.actions } : {},
				...i.note === void 0 ? {} : { note: i.note }
			});
		}
		return r;
	}, [B, t]), he = G(() => {
		let e = B;
		if (!t?.length) return e;
		let n = new Set(e.flatMap((e) => e.id ? [e.id] : [])), r = t.filter((e) => e.body === void 0 && (!e.id || !n.has(e.id)));
		return r.length === 0 ? e : [...e, ...r].map((e, t) => ({
			m: e,
			i: t
		})).sort((e, t) => Date.parse(e.m.timestamp) - Date.parse(t.m.timestamp) || e.i - t.i).map(({ m: e }) => e);
	}, [B, t]), V = v ?? n?.roster.filter((e) => {
		if (e.metadata?.isTyping !== !0) return !1;
		let t = e.metadata?.userId;
		return s && typeof t == "string" ? t !== s : !o || e.clientId !== o;
	}).map((e) => e.metadata?.displayName ?? e.clientId.slice(0, 8)) ?? [], H = e.sendMessage, ge = U((e) => {
		let t = { ...u ?? {} };
		c && (t.displayName = c), l && (t.avatarUrl = l), Object.keys(t).length > 0 ? H(e, t) : H(e);
	}, [
		H,
		u,
		c,
		l
	]), _e = n?.updateMetadata, X = (d ?? !0) && !!_e, ve = U((e) => _e?.({ isTyping: e }), [_e]), ye = e.loadHistory, [be, xe] = q(T), [Se, Ce] = q(!1), Z = e.messages.length, we = K(Z);
	W(() => {
		Z !== we.current && (we.current = Z, Ce(!1));
	}, [Z]);
	let Te = K(be);
	Te.current = be;
	let Ee = U(() => {
		let e = Te.current + E;
		Te.current = e, xe(e), Ce(!0), ye(e);
	}, [ye, E]), De = D ? {
		onLoadMore: D,
		hasMore: O,
		loadingMore: k
	} : w ? {
		onLoadMore: Ee,
		hasMore: O ?? Z >= be,
		loadingMore: k ?? Se
	} : {}, Oe = G(() => i ? (e) => kt(i, e) : void 0, [i]), Ae = G(() => {
		if (!i || !s) return;
		let { toggle: e, react: t, unreact: n } = i;
		return e ? (t, n) => e(n, {
			targetId: t,
			userId: s
		}) : (e, r) => {
			kt(i, e).some((e) => e.emoji === r && e.userId === s) && n ? n(r, { targetId: e }) : t(r, { targetId: e });
		};
	}, [i, s]), je = U((e) => {
		if (!a) return;
		let t = e.id ?? "";
		t && (a.pinnedIds.has(t) ? a.unpin(t) : a.pin({
			messageId: t,
			text: e.content,
			author: e.displayName ?? "Unknown"
		}));
	}, [a]), Q = e.editMessage, Me = e.deleteMessage, Ne = U((e, t) => {
		let n = t.trim();
		if (!e.id || !n) return;
		let r = `<p>${n.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br>")}</p>`;
		Q?.(e.id, n, { html: r });
	}, [Q]), Pe = U((e) => {
		e.id && Me?.(e.id);
	}, [Me]), Fe = /* @__PURE__ */ Y(j, {
		messages: N ? N(he) : he,
		...me.length ? { localMessages: me } : {},
		...P === void 0 ? {} : { dock: P },
		onSend: ge,
		disabled: _,
		typingUsers: V,
		tone: y,
		fill: b,
		flushComposer: x,
		contentAlign: S,
		showHeader: C,
		composer: A,
		emojis: F,
		...De,
		...X ? { onTyping: ve } : {},
		...r ? {
			onSendFiles: (e) => {
				for (let t of e) r.upload(t);
			},
			transfers: r.transfers,
			onCancelTransfer: r.cancelTransfer
		} : {},
		currentActor: o,
		currentUserId: s,
		reactionsFor: Oe,
		onToggleReaction: Ae,
		...a ? {
			pinnedMessageIds: a.pinnedIds,
			onTogglePin: je
		} : {},
		...ue && Q ? {
			onEditMessage: Ne,
			...de ? { canEditMessage: de } : {}
		} : {},
		...ue && Me ? {
			onDeleteMessage: Pe,
			...fe ? { canDeleteMessage: fe } : {}
		} : {},
		onForwardMessage: pe,
		onReply: ee,
		reply: te,
		onCancelReply: I,
		readReceipts: ne,
		readReceiptsEnabled: re,
		unreadFrom: ie,
		threaded: L,
		onJumpToMessage: R,
		highlightedMessageId: ae,
		documentEditors: oe,
		callParticipants: se,
		onJoinCall: ce,
		onOpenDocument: z,
		renderMessageReferences: M,
		attachmentSrc: f,
		onOpenAttachment: p,
		acceptFiles: m,
		maxFileSize: h,
		onFileError: g
	});
	return /* @__PURE__ */ Y(J, { children: ke(Fe, le) });
}
//#endregion
//#region src/integrations/realtime-modules/WrappedPresencePanel.tsx
var Wt = {
	typing: 4,
	online: 3,
	away: 2,
	busy: 1,
	offline: 0
};
function Gt(e) {
	return Wt[e] ?? 2.5;
}
function Kt(e, t) {
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
			let n = Gt(t.status) - Gt(e.status);
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
function qt({ presence: e, currentClientId: t, perConnection: n = !1, wrapWithNetworkShim: r }) {
	let i = G(() => n ? e.roster.map((e) => ({
		clientId: e.clientId,
		status: e.status,
		metadata: e.metadata
	})) : Kt(e.roster, t), [
		e.roster,
		t,
		n
	]);
	return /* @__PURE__ */ Y(J, { children: ke(/* @__PURE__ */ Y(ee, {
		users: i,
		currentClientId: t
	}), r) });
}
//#endregion
//#region src/integrations/realtime-modules/WrappedActivityPanel.tsx
function Jt({ activity: e, visibleCount: t, rotateMs: n, staggerMs: r, kindColors: i, className: a }) {
	let o = G(() => Ft(e.events), [e.events]);
	return /* @__PURE__ */ Y(E, {
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
function Yt({ cursors: t, coordinates: n = "pixels", onMove: r, children: i, className: a }) {
	let o = n === "fraction";
	function s(e) {
		if (!r) return;
		let t = e.currentTarget.getBoundingClientRect(), n = e.clientX - t.left, i = e.clientY - t.top;
		if (!o) return r(n, i);
		if (t.width <= 0 || t.height <= 0) return;
		let a = (e) => Math.min(1, Math.max(0, e));
		r(a(n / t.width), a(i / t.height));
	}
	return /* @__PURE__ */ X("div", {
		"data-testid": "cursor-overlay",
		className: e("relative", a),
		onPointerMove: r ? s : void 0,
		children: [i, /* @__PURE__ */ Y("div", {
			className: "pointer-events-none absolute inset-0 overflow-hidden",
			"aria-hidden": "true",
			"data-testid": "cursor-overlay-layer",
			children: t.map((e) => {
				if (!Number.isFinite(e.x) || !Number.isFinite(e.y)) return null;
				let t = e.label ?? e.clientId, n = e.color ?? te(t);
				return /* @__PURE__ */ X("div", {
					"data-testid": "cursor-overlay-pointer",
					"data-client-id": e.clientId,
					className: "absolute select-none",
					style: {
						left: o ? `${e.x * 100}%` : e.x,
						top: o ? `${e.y * 100}%` : e.y
					},
					children: [/* @__PURE__ */ Y("svg", {
						width: "16",
						height: "16",
						viewBox: "0 0 16 16",
						fill: n,
						className: "drop-shadow",
						children: /* @__PURE__ */ Y("path", {
							d: "M1 1l5.5 14 2-5.5L14 7.5z",
							stroke: "white",
							strokeWidth: "1",
							strokeLinejoin: "round"
						})
					}), /* @__PURE__ */ Y("span", {
						"data-testid": "cursor-overlay-label",
						title: t,
						className: "ml-3 -mt-1 inline-block max-w-[10rem] truncate rounded px-1.5 py-0.5 text-[10px] font-medium text-white shadow",
						style: { background: n },
						children: e.label ? e.label : M(e.clientId)
					})]
				}, e.clientId);
			})
		})]
	});
}
//#endregion
//#region src/integrations/realtime-modules/WrappedCursorOverlay.tsx
function Xt({ cursor: e, coordinates: t = "fraction", publish: n = !0, selfClientId: r, children: i, className: a }) {
	let o = G(() => Ht(e.cursors).filter((e) => e.clientId !== r), [e.cursors, r]), s = e.move;
	return /* @__PURE__ */ Y(Yt, {
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
function Zt({ reactions: e, ttlMs: t = 2500 }) {
	let [n, r] = q([]), i = e.reactions, a = K(/* @__PURE__ */ new Map());
	return W(() => {
		if (i.length === 0) return;
		let e = i[i.length - 1], n = Dt(e, i.length - 1), o = a.current;
		o.has(n.id) || (r((e) => e.some((e) => e.id === n.id) ? e : [...e, n]), o.set(n.id, setTimeout(() => {
			o.delete(n.id), r((e) => e.filter((e) => e.id !== n.id));
		}, t)));
	}, [i, t]), W(() => {
		let e = a.current;
		return () => {
			e.forEach((e) => clearTimeout(e)), e.clear();
		};
	}, []), /* @__PURE__ */ Y(O, { reactions: n });
}
//#endregion
//#region src/integrations/realtime-modules/WrappedFileUploadDrop.tsx
function Qt({ fileUpload: e, accept: t, maxSize: n, multiple: r, disabled: i, label: a, className: o, uploadMetadata: s, onError: c }) {
	let l = Lt(e.uploads);
	function u(t) {
		for (let n of t) e.upload(n, s ? { metadata: s } : void 0).catch((e) => {
			let t = e instanceof Error ? e.message : "Upload failed";
			c?.(t);
		});
	}
	return /* @__PURE__ */ X("div", { children: [/* @__PURE__ */ Y(T, {
		accept: t,
		maxSize: n,
		multiple: r,
		disabled: i,
		label: a,
		className: o,
		onFiles: u,
		onError: c
	}), l.length > 0 && /* @__PURE__ */ Y($t, {
		summaries: l,
		onDismiss: () => e.removeCompleted()
	})] });
}
function $t({ summaries: e, onDismiss: t }) {
	return /* @__PURE__ */ Y("ul", {
		className: "mt-2 p-0 list-none text-[13px]",
		children: e.map((e) => /* @__PURE__ */ X("li", {
			className: "flex items-center gap-2 py-1 border-b border-border",
			children: [
				/* @__PURE__ */ Y("span", {
					className: "flex-1 overflow-hidden text-ellipsis whitespace-nowrap",
					children: e.filename
				}),
				/* @__PURE__ */ Y("span", {
					className: `text-xs font-semibold ${en(e.status)}`,
					children: e.status === "uploading" ? `${e.progress}%` : e.status
				}),
				(e.status === "completed" || e.status === "clean") && e.downloadUrl && /* @__PURE__ */ Y("a", {
					href: e.downloadUrl,
					target: "_blank",
					rel: "noreferrer",
					className: "text-xs text-info",
					children: "Download"
				}),
				(e.status === "failed" || e.status === "infected") && /* @__PURE__ */ Y("button", {
					type: "button",
					onClick: t,
					className: "text-xs text-danger bg-transparent border-0 cursor-pointer p-0",
					children: "Dismiss"
				})
			]
		}, e.id))
	});
}
function en(e) {
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
function tn({ hangout: e, localClientId: t, videoElements: n, mode: r, spotlightContent: i, activeSpeakerId: a, speakerHysteresisMs: o, onParticipantClick: s, className: c }) {
	let l = zt(e.participants, t), u = t == null ? null : l.find((e) => e.id === t) ?? null, d = t == null ? l : l.filter((e) => e.id !== t);
	function f(e) {
		return n ? e.map((e) => ({
			...e,
			videoElement: n[e.id] ?? e.videoElement
		})) : e;
	}
	return /* @__PURE__ */ Y(oe, {
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
function nn({ notifications: e, onItemClick: t, ...n }) {
	let r = Vt(e.notifications);
	return /* @__PURE__ */ Y(x, {
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
function rn({ notifications: e, onItemClick: t, unreadCount: n, ...r }) {
	let i = Vt(e.notifications);
	return /* @__PURE__ */ Y(C, {
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
function an({ socket: e, ...t }) {
	return /* @__PURE__ */ Y(S, {
		state: e.connectionState,
		...t
	});
}
//#endregion
//#region src/integrations/realtime-modules/CapabilityBoundary.tsx
function on({ capability: e, loading: t, fallback: n, children: r }) {
	return e.isLoading ? /* @__PURE__ */ Y(J, { children: t ?? null }) : e.enabled ? /* @__PURE__ */ Y(J, { children: r }) : /* @__PURE__ */ Y(J, { children: n ?? null });
}
//#endregion
//#region src/integrations/realtime-modules/WrappedMediaEffectsTray.tsx
function sn({ controller: e, ...t }) {
	return /* @__PURE__ */ Y(fe, {
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
function cn({ open: e, controller: t, onClose: n, onApplied: r, ...i }) {
	let a = K(t);
	a.current = t;
	let o = K(!1);
	W(() => {
		if (e) return a.current.beginPreview(), o.current = !0, () => {
			o.current && (o.current = !1, a.current.cancelPreview());
		};
	}, [e]);
	let s = G(() => {
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
	return /* @__PURE__ */ Y(R, {
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
function ln(e) {
	let t = e.draft;
	if (!t) return 0;
	let n = 0;
	return t.filterId !== e.filterId && n++, (t.backgroundMode !== e.backgroundMode || t.backgroundMode === "image" && t.backgroundImageUrl !== e.backgroundImageUrl) && n++, t.faceSpriteId !== e.faceSpriteId && n++, n;
}
//#endregion
//#region src/integrations/realtime-modules/WrappedCanvasDocument.tsx
function un({ canvas: e, schema: t, legacyModel: n, beforeConvert: r, ...i }) {
	let [a, o] = q([]), s = U(async () => {
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
	return /* @__PURE__ */ Y(B, {
		...i,
		isCanvas: e.isCanvas,
		body: e.body,
		onConvert: s,
		unsupported: a
	});
}
//#endregion
//#region src/integrations/realtime-modules/WrappedAudioVideoSettingsForm.tsx
function dn({ devices: e, settings: t, cameraOn: n, ...r }) {
	return /* @__PURE__ */ Y(ae, {
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
//#region src/integrations/realtime/meeting.tsx
function fn(e) {
	return new Map(e.map((e, t) => [e.userId, t + 1]));
}
function pn(e, t) {
	let n = fn(t.hands);
	return e.map((e) => ({
		...e,
		handRaised: n.get(e.id)
	}));
}
function mn(e, t) {
	let n = fn(e.hands);
	return {
		participants: t.map((e) => ({
			...e,
			handRaised: n.get(e.id)
		})),
		raisedHandsFirst: !0,
		onLowerHand: e.isOrganizer ? (t) => e.lowerHand(t) : void 0,
		onLowerAllHands: e.isOrganizer ? () => e.lowerAllHands() : void 0
	};
}
function hn(e, t, n = []) {
	let r = new Map(t.map((e) => [e.userId, e])), i = fn(n), a = (e) => {
		let t = r.get(e);
		return {
			id: e,
			name: t?.displayName ?? e,
			avatarUrl: t?.avatarUrl,
			handRaised: i.get(e)
		};
	}, o = /* @__PURE__ */ new Set();
	return {
		rooms: e.rooms.map((e) => (e.members.forEach((e) => o.add(e)), {
			id: e.id,
			name: e.name,
			state: e.state,
			members: e.members.map(a)
		})),
		unassigned: t.filter((e) => !o.has(e.userId)).map((e) => a(e.userId))
	};
}
function gn(e) {
	return Array.from({ length: e }, (e, t) => ({ name: `Room ${t + 1}` }));
}
function _n({ meeting: e, people: t, roomNames: n, renderError: r, ...i }) {
	let { rooms: a, unassigned: o } = hn(e.breakout, t, e.hands), s = e.breakout;
	return /* @__PURE__ */ Y(le, {
		...i,
		rooms: a,
		phase: s.phase,
		mode: s.mode,
		myRoomId: e.myRoom?.id ?? null,
		isOrganizer: e.isOrganizer,
		unassigned: o,
		endsAt: s.endsAt,
		clockOffsetMs: e.clockOffsetMs,
		closing: s.closing === !0,
		allowReturnToMain: s.settings.allowReturnToMain,
		onJoin: e.joinRoom,
		onReturnToMain: e.returnToMain,
		onCreateRooms: (t, r) => {
			let i = n?.(t) ?? gn(t).map((e) => e.name);
			e.configureBreakouts(i.map((e) => ({ name: e })), { mode: r });
		},
		onAutoAssign: () => {
			let n = e.state.you?.userId ?? null;
			e.autoAssign(t.map((e) => e.userId).filter((e) => e !== n));
		},
		onAssign: (t, n) => e.assign({ [t]: n }),
		onOpenRooms: e.openRooms,
		onCloseRooms: e.closeRooms,
		onSetTimer: e.setTimer,
		onBroadcast: e.broadcast,
		onEnd: e.endBreakouts,
		onDeleteRooms: () => e.configureBreakouts([]),
		onAddRoom: e.addRoom ? () => e.addRoom?.() : void 0,
		onRenameRoom: e.renameRoom,
		notice: e.error ? r?.(e.error) ?? /* @__PURE__ */ Y(u, {
			variant: "error",
			className: "mx-4 mt-3",
			"data-testid": "breakout-error",
			children: e.error.message
		}) : null
	});
}
function vn({ meeting: e, className: t }) {
	if (!e.myRoom) return null;
	let n = e.breakout;
	return /* @__PURE__ */ Y(se, {
		roomName: e.myRoom.name,
		endsAt: n.endsAt,
		clockOffsetMs: e.clockOffsetMs,
		closing: n.closing === !0,
		announcement: e.state.announcement,
		onDismissAnnouncement: e.dismissAnnouncement,
		onReturnToMain: n.settings.allowReturnToMain || e.isOrganizer ? e.returnToMain : void 0,
		className: t
	});
}
function yn(e, t) {
	let n = e.myHandPosition !== null, r = t.onReact, { people: o, chat: s } = t;
	return {
		...s ? { chat: {
			id: "chat",
			label: "Chat",
			icon: /* @__PURE__ */ Y(i, {}),
			active: s.open,
			onClick: s.onToggle,
			badge: s.unread || void 0
		} } : {},
		...o ? { people: {
			id: "people",
			label: "People",
			icon: /* @__PURE__ */ Y(a, {}),
			count: o.count,
			active: o.open,
			onClick: o.onToggle,
			badge: e.isOrganizer && e.hands.length > 0 ? e.hands.length : void 0
		} } : {},
		...r ? { react: {
			id: "react",
			label: "React",
			icon: /* @__PURE__ */ Y(ce, {}),
			popoverLabel: "Send a reaction",
			popover: (e) => /* @__PURE__ */ Y(re, {
				tone: "surface",
				emojis: t.reactions,
				onReact: (t) => {
					r(t), e();
				}
			})
		} } : {},
		raise: {
			id: "raise",
			label: n ? "Lower" : "Raise",
			title: n ? `Lower your hand (${e.myHandPosition} in line)` : "Raise your hand",
			icon: /* @__PURE__ */ Y(ne, {}),
			pressed: n,
			onClick: e.toggleHand,
			disabled: !e.ready
		},
		rooms: {
			id: "rooms",
			label: "Rooms",
			icon: /* @__PURE__ */ Y(L, {}),
			active: t.roomsOpen,
			onClick: t.onToggleRooms,
			disabled: !e.ready,
			badge: e.breakout.phase === "open" && !e.myRoom && e.breakout.mode === "self-select" ? e.breakout.rooms.filter((e) => e.state === "open").length : void 0
		}
	};
}
function bn(e) {
	return e.myRoom ? `${e.myRoom.name} chat` : "Meeting chat";
}
function xn({ roomName: e }) {
	return /* @__PURE__ */ X("div", {
		className: "flex items-center gap-2 border-t border-border px-3 py-1.5",
		role: "status",
		"aria-live": "polite",
		"data-testid": "meeting-chat-context",
		children: [
			/* @__PURE__ */ Y(L, {
				size: 14,
				"aria-hidden": !0,
				className: "shrink-0 text-text-secondary"
			}),
			/* @__PURE__ */ X(c, {
				size: "xs",
				weight: "semibold",
				className: "shrink-0 whitespace-nowrap",
				children: [e, " chat"]
			}),
			/* @__PURE__ */ X(c, {
				size: "xs",
				tone: "tertiary",
				className: "min-w-0",
				children: [
					"Only people in ",
					e,
					" see these messages."
				]
			})
		]
	});
}
function Sn({ value: e, onChange: t }) {
	return /* @__PURE__ */ X("div", {
		className: "flex items-center gap-2 border-t border-border px-3 py-1.5",
		"data-testid": "meeting-chat-target",
		children: [
			/* @__PURE__ */ Y(c, {
				size: "xs",
				tone: "secondary",
				children: "To"
			}),
			/* @__PURE__ */ Y(y, {
				size: "sm",
				"aria-label": "Send to",
				value: e,
				onChange: (e) => t(e === "rooms" ? "rooms" : "chat"),
				options: [{
					value: "chat",
					label: "This chat"
				}, {
					value: "rooms",
					label: "All rooms"
				}]
			}),
			e === "rooms" && /* @__PURE__ */ Y(c, {
				size: "xs",
				tone: "tertiary",
				children: "Every room sees this as an announcement."
			})
		]
	});
}
var Cn = "meeting-announcement:";
function wn(e, t) {
	let [n, r] = q("chat"), [i, a] = q([]), o = e.breakout.announcement, s = e.breakout.announcements, l = (e) => `${e.at}|${e.fromUserId}`, u = [o ? l(o) : "", ...(s ?? []).map(l)].join(",");
	W(() => {
		let e = [...s ?? [], ...o ? [o] : []];
		e.length !== 0 && a((t) => {
			let n = new Set(t.map(l)), r = e.filter((e) => !n.has(l(e)) && n.add(l(e)));
			return r.length === 0 ? t : [...t, ...r].sort((e, t) => Date.parse(e.at) - Date.parse(t.at)).slice(-50);
		});
	}, [u]);
	let d = e.ready && e.isOrganizer && e.breakout.phase === "open", f = d ? n : "chat", p = t.announcementNote ?? "Announcement to every room", m = G(() => i.map((e) => ({
		id: `${Cn}${e.at}:${e.fromUserId}`,
		clientId: "meeting",
		userId: e.fromUserId,
		displayName: e.fromDisplayName,
		content: e.message,
		timestamp: e.at
	})), [i]), h = t.renderMessageReferences, g = G(() => i.map((e) => ({
		id: `${Cn}${e.at}:${e.fromUserId}`,
		timestamp: e.at,
		displayName: e.fromDisplayName,
		content: e.message,
		metadata: {
			kind: "meeting-announcement",
			fromUserId: e.fromUserId
		},
		note: p
	})), [i, p]), { send: _ } = t;
	return {
		target: f,
		setTarget: r,
		localMessages: g,
		withAnnouncements: (e) => m.length === 0 ? [...e] : [...e, ...m].sort((e, t) => Date.parse(e.timestamp) - Date.parse(t.timestamp)),
		renderMessageReferences: (e) => e.id?.startsWith(Cn) ? /* @__PURE__ */ Y(c, {
			as: "p",
			size: "xs",
			tone: "secondary",
			"data-testid": "meeting-chat-announcement-note",
			children: p
		}) : h?.(e) ?? null,
		title: bn(e),
		dock: e.myRoom || d ? /* @__PURE__ */ X(J, { children: [e.myRoom && /* @__PURE__ */ Y(xn, { roomName: e.myRoom.name }), d && /* @__PURE__ */ Y(Sn, {
			value: f,
			onChange: r
		})] }) : null,
		onSend: (t) => {
			let n = t.trim();
			if (n) {
				if (f === "rooms") {
					e.broadcast(n.slice(0, 500)), r("chat");
					return;
				}
				_(t);
			}
		}
	};
}
//#endregion
export { it as $, Ft as A, Ct as B, Qt as C, qt as D, Jt as E, Rt as F, vt as G, Dt as H, zt as I, lt as J, _t as K, kt as L, St as M, It as N, Ut as O, Lt as P, nt as Q, Bt as R, tn as S, ye as St, Xt as T, Ot as U, wt as V, yt as W, ot as X, st as Y, at as Z, sn as _, Oe as _t, hn as a, Ge as at, rn as b, we as bt, fn as c, ze as ct, wn as d, Le as dt, rt as et, pn as f, Me as ft, ln as g, ke as gt, cn as h, Ae as ht, _n as i, Je as it, xt as j, Pt as k, mn as l, Be as lt, un as m, Ie as mt, Sn as n, Xe as nt, gn as o, Re as ot, dn as p, Pe as pt, ut as q, vn as r, tt as rt, bn as s, He as st, xn as t, et as tt, yn as u, Q as ut, on as v, De as vt, Zt as w, nn as x, Ce as xt, an as y, Te as yt, Vt as z };
