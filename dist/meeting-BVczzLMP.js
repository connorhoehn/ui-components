import { t as e } from "./cn-D4QmbyEy.js";
import { n as t } from "./Button-C-I3BxWI.js";
import { t as n } from "./IconButton-Bf5Wy0tS.js";
import { et as r } from "./Icons-CqVFbuiZ.js";
import { n as i, y as a } from "./MediaIcons-_ai5Til2.js";
import { c as o, l as s, t as c } from "./Text-BAAQrepu.js";
import { t as l } from "./Badge-D58pEJIm.js";
import { t as u } from "./Banner-400g6E1q.js";
import { t as d } from "./Modal-PO0F6rAp.js";
import { t as f } from "./ConfirmDialog-DrXzW1zj.js";
import { t as p } from "./Input-Brvp1kPv.js";
import { t as m } from "./FormField-CQ27qxWt.js";
import { t as h } from "./EmptyState-pOG782nO.js";
import { n as g } from "./ThinkingDots-BHtlGy_Q.js";
import { n as _ } from "./StatusPill-CLkB5jFS.js";
import { t as v } from "./SkeletonCard-D3FL0TB7.js";
import { n as y } from "./Slider-DCKY5jPg.js";
import { t as b } from "./Textarea-CvdLeuO_.js";
import { t as x } from "./Avatar-DkkMISPQ.js";
import { t as S } from "./SegmentedControl-DAjnOtF4.js";
import { t as C } from "./InlineAlert-CnWUBrte.js";
import { n as w, r as T, t as E } from "./NotificationBell-C_8HFWNk.js";
import { t as D } from "./PresenceAvatars-DqCOZ057.js";
import { t as O } from "./FileUploadDrop-CF2-g14E.js";
import { t as k } from "./ActivityFeed-BU9LDJNO.js";
import { a as A, i as j, n as M, o as N } from "./DockedAside-5l7ZdCu9.js";
import { ct as P, d as F, lt as ee, n as te, t as I, u as ne, ut as re } from "./ConversationSurface-CoTJn5A-.js";
import { E as ie, G as ae, R as L, T as oe, Y as se, _ as R, i as z, k as B, n as ce, q as le, s as ue, t as de, w as fe, x as pe, y as V } from "./BreakoutRoomsPanel-WejdbFuq.js";
import { t as me } from "./useActiveSpeaker-BGKJU3Lb.js";
import { c as he, o as ge, s as _e } from "./useDocumentImageUpload-Cd_KXczH.js";
import { Component as ve, createContext as H, createElement as ye, useCallback as U, useContext as be, useEffect as W, useId as xe, useMemo as G, useRef as K, useState as q } from "react";
import { Fragment as J, jsx as Y, jsxs as X } from "react/jsx-runtime";
import * as Se from "yjs";
//#region src/integrations/realtime/HangoutRoomRow.tsx
function Ce(e) {
	function t(t) {
		return we(e, t);
	}
	return t;
}
function we(e, { slug: t, name: n, participantId: r, occupancy: i, subscribeRoomsIndex: a, onClick: o, onContextMenu: s, onOpenConversation: c, kebab: u, className: d, "data-testid": f = "room-row" }) {
	let p = e.useRoomOccupancy(a ? t : null, { subscribeRoomsIndex: a }), m = a ? p.occupancy ?? null : i ?? null, h = m?.count ?? 0, g = m?.members ?? [], _ = G(() => r ? g.some((e) => e.participantId === r) : !1, [g, r]), v = _, y = G(() => g.slice(0, 3).map((e) => ({
		id: e.participantId,
		name: e.displayName || e.userId,
		online: !0
	})), [g]), b = null;
	h > 1 ? b = /* @__PURE__ */ X(J, { children: [/* @__PURE__ */ Y(D, {
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
	}) : h === 1 && (b = /* @__PURE__ */ X(J, { children: [/* @__PURE__ */ Y(D, {
		users: y,
		maxVisible: 1,
		size: 18
	}), /* @__PURE__ */ Y(l, {
		variant: "count",
		value: 1,
		color: "muted"
	})] }));
	let x = c ? /* @__PURE__ */ Y("button", {
		"data-ui-part": "",
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
	return /* @__PURE__ */ Y(A, {
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
var Z = 3, Te = 48;
function Ee(e) {
	return e.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 48);
}
function De(e) {
	let t = e.trim();
	return t.length === 0 ? "Name is required." : t.length < Z ? `Name must be at least ${Z} characters.` : t.length > Te ? `Name must be at most ${Te} characters.` : null;
}
function Oe({ open: e, onClose: n, onCreate: r, onCreated: i, defaultVisibility: a, title: o = "New room", submitLabel: s = "Create room" }) {
	let c = xe(), [l, u] = q(""), [f, h] = q(""), [g, _] = q(!1), [v, x] = q(!1), [S, w] = q(!1), [T, E] = q(null);
	W(() => {
		e && (u(""), h(""), _(!1), x(!1), w(!1), E(null));
	}, [e]);
	let D = G(() => De(l), [l]), O = G(() => Ee(l), [l]), k = !D && !S;
	async function A(e) {
		if (e.preventDefault(), k) {
			w(!0), E(null);
			try {
				let e = await r({
					name: l.trim(),
					description: f.trim() || void 0,
					visibility: a,
					settings: {
						audioOnly: g,
						recordingEnabled: v
					}
				});
				i?.(e), n();
			} catch (e) {
				E(e instanceof Error ? e.message : "Failed to create room."), w(!1);
			}
		}
	}
	return /* @__PURE__ */ Y(d, {
		open: e,
		onClose: S ? () => {} : n,
		title: o,
		maxWidth: 440,
		backdropTestId: "new-hangout-room-dialog",
		dialogKind: "form",
		footer: /* @__PURE__ */ X("div", {
			className: "flex justify-end gap-2",
			children: [/* @__PURE__ */ Y(t, {
				type: "button",
				variant: "secondary",
				size: "sm",
				onClick: n,
				disabled: S,
				children: "Cancel"
			}), /* @__PURE__ */ Y(t, {
				type: "submit",
				form: c,
				variant: "primary",
				size: "sm",
				disabled: !k,
				"data-testid": "new-hangout-room-submit",
				children: S ? "Creating…" : s
			})]
		}),
		children: /* @__PURE__ */ X("form", {
			id: c,
			onSubmit: A,
			className: "flex flex-col gap-4",
			children: [
				/* @__PURE__ */ Y(m, {
					label: "Name",
					required: !0,
					error: l.length > 0 ? D ?? void 0 : void 0,
					hint: O ? `Room address: #${O}` : "Choose a clear name people will recognize.",
					hintTestId: l.length > 0 && D ? "new-hangout-room-name-error" : "new-hangout-room-slug-preview",
					children: (e) => /* @__PURE__ */ Y(p, {
						...e,
						"data-autofocus": !0,
						"data-testid": "new-hangout-room-name",
						value: l,
						onChange: (e) => u(e.target.value),
						placeholder: "Team standup",
						maxLength: 58,
						disabled: S,
						size: "sm"
					})
				}),
				/* @__PURE__ */ Y(m, {
					label: "Description",
					hint: "Optional. Explain what people will use this space for.",
					children: (e) => /* @__PURE__ */ Y(b, {
						...e,
						"data-testid": "new-hangout-room-description",
						value: f,
						onChange: (e) => h(e.target.value),
						placeholder: "Purpose of this space",
						rows: 2,
						disabled: S
					})
				}),
				/* @__PURE__ */ Y(m, {
					label: "Start with audio only",
					layout: "inline",
					hint: "People join with their cameras off.",
					children: (e) => /* @__PURE__ */ Y(y, {
						"aria-labelledby": e.labelId,
						checked: g,
						onChange: _,
						disabled: S,
						size: "sm",
						"data-testid": "new-hangout-room-audio-only"
					})
				}),
				/* @__PURE__ */ Y(m, {
					label: "Record calls",
					layout: "inline",
					hint: "Record new calls in this hangout. People see a recording notice when they join.",
					children: (e) => /* @__PURE__ */ Y(y, {
						"aria-labelledby": e.labelId,
						checked: v,
						onChange: x,
						disabled: S,
						size: "sm",
						"data-testid": "new-hangout-room-recording"
					})
				}),
				T && /* @__PURE__ */ Y(C, {
					tone: "error",
					"data-testid": "new-hangout-room-error",
					children: T
				})
			]
		})
	});
}
//#endregion
//#region src/integrations/realtime/HangoutRoomsSection.tsx
function ke(e) {
	function t(t) {
		return Ae(e, t);
	}
	return t;
}
function Ae(e, { rooms: r, occupancyFor: i, occupancyAdapter: a, participantId: o, onJoinRoom: s, onOpenConversation: c, onContextMenu: l, onBrowseAll: u, maxVisible: d = 10, title: f = "Rooms", storageKey: p, collapsed: m = !1, onToggleCollapse: g, renderCreateDialog: _ }) {
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
	}), E = g !== void 0, D = /* @__PURE__ */ X(J, { children: [
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
				"data-ui-part": "",
				type: "button",
				onClick: () => void r.refetch(),
				className: "text-danger-fg underline hover:text-danger-fg cursor-pointer",
				children: "Retry"
			})]
		}),
		!r.isLoading && !r.error && S.length === 0 && /* @__PURE__ */ Y(h, {
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
			}, t.slug)), w > 0 && u && /* @__PURE__ */ Y(A, {
				"data-testid": "hangout-rooms-browse-all",
				label: /* @__PURE__ */ X("span", {
					className: "text-xs text-text-secondary",
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
		"data-collapsed": m ? "true" : "false",
		className: "flex flex-col",
		children: [/* @__PURE__ */ Y(P, {
			label: f,
			presentational: !1,
			collapsed: m,
			onToggleCollapse: g,
			count: S.length,
			actions: [{
				label: "New room",
				onClick: b,
				"data-testid": "new-room-button"
			}],
			"data-testid": "rooms-section-header"
		}), !m && D]
	}) : /* @__PURE__ */ Y(N, {
		title: f,
		storageKey: p,
		actions: T,
		"data-testid": "rooms-section",
		children: D
	}), _ ? _({
		open: v,
		onClose: x
	}) : /* @__PURE__ */ Y(Oe, {
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
var je = class extends ve {
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
			children: /* @__PURE__ */ Y(h, {
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
function Me({ connectionState: t, children: n, onRetry: r, reconnectingLabel: i, disconnectedTitle: a = "Disconnected", disconnectedDescription: o = "The connection to the server was lost. Check your network and try again.", retryLabel: s = "Try again", connectingPlaceholder: c, disconnectedFallback: l, className: u }) {
	return t === "connecting" ? /* @__PURE__ */ Y("div", {
		"data-testid": "reconnecting-shim-connecting",
		className: u,
		children: c ?? /* @__PURE__ */ Y(v, { height: 120 })
	}) : t === "disconnected" ? /* @__PURE__ */ Y("div", {
		"data-testid": "reconnecting-shim-disconnected",
		className: u,
		children: l ?? /* @__PURE__ */ Y(h, {
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
		}), /* @__PURE__ */ Y(fe, {
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
function Ne(e, t) {
	return t ? /* @__PURE__ */ Y(je, {
		title: t.errorTitle,
		description: t.errorDescription,
		retryLabel: t.retryLabel,
		onRetry: t.onRetry,
		onError: t.onError,
		fallback: t.errorFallback,
		children: /* @__PURE__ */ Y(Me, {
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
function Pe(e) {
	function t(t) {
		return Fe(e, t);
	}
	return t;
}
function Fe(e, { hangoutRooms: t, subscribeRoomsIndex: n, occupancyFor: r, participantId: i, onJoin: a, onContextMenu: o, onBrowseAll: s, maxVisible: c, title: l, storageKey: u, renderEmpty: d, collapsed: f, onToggleCollapse: p, renderCreateDialog: m, wrapWithNetworkShim: h }) {
	return t.rooms.filter((e) => e.state === "active").length === 0 && !t.isLoading && !t.error && d ? /* @__PURE__ */ Y("div", {
		"data-testid": "wrapped-hangout-rooms-empty-slot",
		children: d
	}) : /* @__PURE__ */ Y(J, { children: Ne(/* @__PURE__ */ Y(e, {
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
], Ie = {
	chat: !0,
	presence: !0
}, Le = H(null);
function Re(e) {
	function t(t) {
		return ze(e, t);
	}
	return t;
}
function ze(e, { capabilities: t = Ie, channel: n, children: r }) {
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
	return /* @__PURE__ */ Y(Le.Provider, {
		value: s,
		children: r
	});
}
function Be() {
	return be(Le) ?? {
		can: Object.fromEntries(Q.map((e) => [e, !1])),
		declared: Object.fromEntries(Q.map((e) => [e, !1])),
		provisioned: Object.fromEntries(Q.map((e) => [e, !1])),
		isLoading: !1
	};
}
function Ve({ need: e, children: t, fallback: n = null }) {
	let { can: r } = Be(), i = (Array.isArray(e) ? e : [e]).every((e) => r[e]);
	return /* @__PURE__ */ Y(J, { children: i ? t : n });
}
//#endregion
//#region src/integrations/realtime/WrappedConversationSurface.tsx
var He = {
	files: "conversation.files",
	documents: "conversation.documents",
	pins: "conversation.pins",
	mentions: "conversation.mentions",
	calls: "conversation.calls"
};
function Ue(e = I, t = {}) {
	return e.filter((e) => e !== "chat" && e !== "members").map((e) => t[e] ?? He[e]);
}
function We(e) {
	return (t) => Ge(e, t);
}
function Ge(e, t) {
	let { channel: n = null, hasDocuments: r = !0, from: i = I } = t;
	return i.filter((t) => t === "mentions" ? !1 : t === "documents" ? r : t !== "calls" || !!e.lobbyForChannel(n));
}
function Ke({ declare: e = I, capabilities: t, capabilitiesError: n, capabilityNames: r = {}, children: i, ...a }) {
	let o = G(() => {
		let i = r;
		return e.filter((e) => e === "chat" || e === "members" || !t || n ? !0 : t[i[e] ?? He[e]] === !0);
	}, [
		e,
		t,
		n,
		r
	]);
	return /* @__PURE__ */ Y(te, {
		...a,
		features: o,
		children: i
	});
}
//#endregion
//#region src/integrations/realtime/WrappedStreamStage.tsx
function qe(e, { channelArn: t, excludeParticipantId: n, getAuthToken: r, baseUrl: i, onStatusChange: a, ...o }) {
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
	]), /* @__PURE__ */ Y(ue, {
		...o,
		live: c,
		stream: s.stream,
		...l === null ? {} : { viewerCount: l }
	});
}
function Je(e, { channelArn: t, playbackToken: n, baseUrl: r, onStatusChange: i, ...a }) {
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
	}, [o.ready, i]), /* @__PURE__ */ Y(ue, {
		...a,
		live: o.ready,
		playlistUrl: o.playlistUrl,
		...s === null ? {} : { viewerCount: s }
	});
}
function Ye(e) {
	function t(t) {
		return qe(e, t);
	}
	function n(t) {
		return Je(e, t);
	}
	function r({ mode: e = "near-realtime", ...r }) {
		return Y(e === "realtime" ? t : n, { ...r });
	}
	return r;
}
//#endregion
//#region src/integrations/realtime/WrappedLVSHangoutLayout.tsx
function Xe({ stream: e, displayName: t }) {
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
		children: /* @__PURE__ */ Y(x, {
			name: t,
			size: 64
		})
	});
}
function Ze(e, t) {
	let n = e.isLocal, r = n ? t ?? e.displayName ?? "You" : e.displayName || e.participantId.slice(0, 8), i = e.streams[0], a = e.screenStream, o = n ? /* @__PURE__ */ Y(Xe, {
		stream: i,
		displayName: r
	}) : /* @__PURE__ */ Y(oe, {
		stream: i,
		displayName: r,
		cameraOn: e.hasVideo
	}), s = a ? /* @__PURE__ */ Y(ie, {
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
function Qe(e) {
	function t(t) {
		return $e(e, t);
	}
	return t;
}
function $e(e, { stageToken: t, participantId: n, userId: r, localClientId: i, getStageToken: a, overlay: o, spotlightContent: s, onParticipantClick: c, mode: l = "auto", activeSpeakerStrategy: u = "audio-level", localTileLabel: d, showLocalAsTile: f = !0, handFor: p, className: m, "data-testid": h }) {
	let g = e.useLVSHangout({
		stageToken: t,
		participantId: n,
		userId: r ?? n.slice(0, 8),
		getAuthToken: a
	}), _ = G(() => g.participants.filter((e) => f || !e.isLocal).map((e) => {
		let t = Ze(e, d), n = p?.(e.appUserId ?? e.userId);
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
		children: [/* @__PURE__ */ Y(B, {
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
function et(e) {
	let t = Ce(e), n = ke(t);
	return {
		HangoutRoomRow: t,
		HangoutRoomsSection: n,
		WrappedHangoutRoomsList: Pe(n),
		RealtimeCapabilityProvider: Re(e),
		conversationFeaturesFor: We(e),
		WrappedStreamStage: Ye(e),
		WrappedLVSHangoutLayout: Qe(e)
	};
}
var tt = H(null), nt = /* @__PURE__ */ new WeakMap();
function rt(e) {
	let t = nt.get(e);
	return t || (t = et(e), nt.set(e, t)), t;
}
function it({ modules: e, children: t }) {
	let n = G(() => rt(e), [e]);
	return /* @__PURE__ */ Y(tt.Provider, {
		value: n,
		children: t
	});
}
function at() {
	let e = be(tt);
	if (!e) throw Error("useRealtimeIntegrations() needs a <RealtimeIntegrationsProvider modules={…}> above it.");
	return e;
}
//#endregion
//#region src/integrations/realtime/canvasRecovery.ts
function ot(e, t, n, r = "canvasRecovery") {
	return `${r}:${JSON.stringify([
		e,
		t,
		n
	])}`;
}
function st(e) {
	let t = "";
	for (let n = 0; n < e.length; n += 8192) t += String.fromCharCode(...e.subarray(n, n + 8192));
	return {
		version: 1,
		savedAt: (/* @__PURE__ */ new Date()).toISOString(),
		snapshot: btoa(t)
	};
}
function ct(e) {
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
function lt(e, t, n, r) {
	let i = ot(e, t, n, r), [a, o] = q(() => {
		try {
			let e = JSON.parse(sessionStorage.getItem(i) ?? "null");
			return ct(e?.recovered ?? e?.pending) ? e.recovered ?? e.pending : null;
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
		s.current = st(e), o(s.current), d();
	}, [d]), p = U(() => {
		s.current = null, o(null), d();
	}, [d]), m = U((e, t) => {
		if (!e || !t) return () => {};
		let n = () => {
			t.pendingUpdateCount && (c.current = st(Se.encodeStateAsUpdate(e)), d());
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
			let e = ct(s.current ?? c.current);
			if (!e) return;
			let t = URL.createObjectURL(new Blob([Uint8Array.from(e)], { type: "application/octet-stream" })), r = document.createElement("a");
			r.href = t, r.download = `document-${n}-recovery.yjs`, r.click(), window.setTimeout(() => URL.revokeObjectURL(t), 1e3);
		}, [n]),
		restore: U((e) => {
			let t = ct(s.current);
			t && (Se.applyUpdate(e, t, "explicit-recovery"), p());
		}, [p])
	};
}
//#endregion
//#region src/integrations/realtime/canvasDocumentState.ts
function ut(e, t, n, r) {
	if (e !== "idle") return {
		status: !n && t > 0 ? "offline" : e,
		...e === "error" || !n ? { onRetry: r } : {}
	};
}
function dt(e, t, n = Date.now()) {
	return t && e.canEdit && e.expiresAt > n;
}
//#endregion
//#region src/integrations/realtime/CanvasDocumentPane.tsx
var ft = {
	showRuler: !0,
	showStatusBar: !1,
	toolbarStyle: "card",
	pageMargin: "narrow",
	fitHeight: "parent",
	paginate: !0
};
function pt(e) {
	return function(n) {
		let { documentId: r, tenant: i, userId: a, userName: c, userColor: l = "teal", canEdit: u, editing: p = !0, extensions: m, loadImage: h, isProtectedImage: v, uploadImage: y, onPendingChange: b, notices: x, children: S, viewProps: w, onEditorReady: T, loadingLabel: E = "Loading collaborative document…", layout: D, keyPrefix: k } = n, A = e.useGateway(), j = lt(i, a, r, k), M = e.useYjsDoc({
			documentId: r,
			ws: A,
			onMessage: A.onMessage,
			onUnpersistedChanges: j.retain
		}), N = e.useCanvasDocument({ ydoc: M.ydoc }), P = A.connectionState === "connected", F = u && p && M.synced && P, ee = K(F);
		ee.current = F;
		let [te, I] = q(!1), [ne, re] = q(null), [ie, ae] = q(!1), [L, oe] = q(!1), [se, R] = q(null), z = K(null), B = G(() => ({
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
			b?.(M.pendingUpdateCount);
		}, [M.pendingUpdateCount, b]), W(() => {
			M.provider?.awareness.setLocalStateField("user", {
				...B,
				id: a
			});
		}, [
			M.provider,
			B,
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
		let ce = async (e) => {
			let t = z.current;
			if (!(!y || !t || t.isDestroyed || !ee.current || L)) {
				oe(!0), R(null);
				try {
					let n = await y(e);
					if (z.current !== t || t.isDestroyed || !ee.current) throw Error("The document is no longer editable. The image was not inserted.");
					t.chain().focus().setImage({
						src: n,
						alt: e.name
					}).run(), ae(!1);
				} catch (e) {
					R(e instanceof Error ? e.message : "The image could not be uploaded.");
				} finally {
					oe(!1);
				}
			}
		}, le = ut(M.persistenceState, M.pendingUpdateCount, P, M.retryPersistence), ue = {
			editable: F,
			online: P,
			synced: M.synced,
			pendingUpdateCount: M.pendingUpdateCount,
			persistenceState: M.persistenceState,
			docVersion: M.docVersion,
			ydoc: M.ydoc,
			exportMarkdown: N.exportMarkdown
		}, de = /* @__PURE__ */ X(J, { children: [
			x,
			j.recovered && /* @__PURE__ */ Y(C, {
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
			j.storageError && /* @__PURE__ */ Y(C, {
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
			ne && /* @__PURE__ */ Y(C, {
				tone: "error",
				children: ne
			})
		] }), fe = M.synced && !!M.ydoc && !!N.body, pe = /* @__PURE__ */ X(J, { children: [
			S,
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
					L || ae(!1);
				},
				title: "Insert image",
				children: /* @__PURE__ */ X(s, {
					gap: "sm",
					children: [se && /* @__PURE__ */ Y(C, {
						tone: "error",
						children: se
					}), /* @__PURE__ */ Y(O, {
						accept: "image/*",
						maxSize: 10485760,
						disabled: L || !F,
						label: L ? "Uploading image…" : "Choose an image or drop it here",
						onFiles: (e) => {
							e[0] && ce(e[0]);
						}
					})]
				})
			})
		] }), V = (e, t = null, n = null) => D ? D({
			notices: de,
			canvas: e,
			toolbar: t,
			ruler: n,
			saveState: le,
			state: ue
		}) : /* @__PURE__ */ X(J, { children: [de, e] });
		if (!fe) return V(/* @__PURE__ */ Y(_, { label: E }));
		if (!N.isCanvas) return V(/* @__PURE__ */ Y(g, {
			title: "Document migration is incomplete",
			body: "The server has not supplied a rich document snapshot. No changes have been made."
		}));
		let me = (e) => /* @__PURE__ */ X(ge, {
			loadImage: h,
			...v ? { requiresAuthentication: v } : {},
			children: [/* @__PURE__ */ ye(he, {
				...ft,
				...w,
				key: M.docVersion,
				isCanvas: !0,
				body: N.body,
				ydoc: M.ydoc,
				provider: M.provider,
				user: B,
				editable: F,
				extensions: m,
				...y && F ? { onInsertImage: () => {
					R(null), ae(!0);
				} } : {},
				...e ? { renderFrame: ({ toolbar: t, ruler: n, surface: r }) => e(t, n, r) } : {},
				onEditorReady: (e) => {
					z.current = e, T?.(e);
				}
			}), pe]
		});
		return D ? me((e, t, n) => V(/* @__PURE__ */ Y(s, {
			gap: "none",
			className: "min-h-0 flex-1",
			"data-testid": "document-canvas-slot",
			children: n
		}), e, t)) : V(/* @__PURE__ */ Y(s, {
			gap: "none",
			className: "min-h-0 flex-1",
			"data-testid": "document-canvas-slot",
			children: me()
		}));
	};
}
//#endregion
//#region src/integrations/realtime/canvasDocumentExtensions.ts
function mt(e, t) {
	return e({
		...t,
		Image: _e(t.Image)
	});
}
//#endregion
//#region src/integrations/realtime/ConversationCallDock.tsx
var ht = (e) => e.stream ? /* @__PURE__ */ Y(ie, {
	stream: e.stream,
	muted: e.isLocal
}) : void 0, gt = () => typeof HTMLMediaElement < "u" && "setSinkId" in HTMLMediaElement.prototype;
function _t(e, t, n) {
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
function vt(e, t) {
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
function yt(e) {
	let t = (e?.participants ?? []).filter((e) => !e.isLocal && e.stream && (e.state === "in-call" || e.state === "reconnecting")), n = t.map((e) => `${e.id}=${e.stream.id}`).join("|");
	return G(() => t.map((e) => ({
		participantId: e.id,
		streams: [e.stream]
	})), [n]);
}
function bt(e, { call: t, title: n, onOpenPeople: r, peopleOpen: i, onOpenSettings: a, onPopOut: o, extras: s, cameraMenuItems: c, tile: l = ht, notice: u, handFor: f, selfName: p, compact: m = !1, tileSize: h, documents: g, onOpenDocuments: _, documentsOpen: v, onDocumentClick: y, layout: b = "shelf", className: x, "data-testid": S = "conversation-call-dock" }) {
	let [w, T] = q(!1), E = t.media?.captureError ?? null, [D, O] = q(null);
	W(() => {
		E || O(null);
	}, [E]);
	let k = e.useAudioVideoSettings({ preview: w }), { activeSpeakerId: A } = me({ participants: yt(t.call) }), j = e.conversationCallDockProps(t, {
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
		"data-testid": S
	});
	if (!j) return null;
	let M = {
		...j,
		participants: vt(_t(j.participants, t.call?.participants ?? [], j.phase), f),
		layout: b,
		...h ? { tileSize: h } : {},
		...g ? { documents: g } : {},
		..._ ? { onOpenDocuments: _ } : {},
		...v === void 0 ? {} : { documentsOpen: v },
		...y ? { onDocumentClick: y } : {},
		...x ? { className: x } : {}
	};
	return /* @__PURE__ */ X(J, { children: [
		u ? /* @__PURE__ */ Y(C, {
			tone: "info",
			"data-testid": `${S}-notice`,
			children: u
		}) : null,
		E && E !== D ? /* @__PURE__ */ X(C, {
			tone: "warning",
			"data-testid": `${S}-capture-error`,
			onDismiss: () => O(E),
			children: [E, " You can keep listening. Check browser device access, then turn the device on to retry."]
		}) : null,
		/* @__PURE__ */ Y(pe, { ...M }),
		!a && /* @__PURE__ */ Y(d, {
			open: w,
			onClose: () => T(!1),
			title: "Call devices",
			children: /* @__PURE__ */ Y(z, {
				"data-testid": `${S}-settings`,
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
				speakerSelectionSupported: gt(),
				onTestMic: k.testMic,
				onTestSound: k.testSound,
				testMicState: k.testMicState,
				...p === void 0 ? {} : { selfName: p }
			})
		})
	] });
}
function xt(e) {
	function t(t) {
		return bt(e, t);
	}
	return t;
}
//#endregion
//#region src/integrations/realtime/IncomingCallToast.tsx
function St(e) {
	return e.kind === "knock" ? `${e.callerName} asks to join` : `${e.callerName} is calling`;
}
function Ct({ ring: e, onAccept: n, onDecline: i, corner: a = "top-right", width: s = 360, className: c, "data-testid": l = "incoming-call-toast" }) {
	let d = e.kind === "knock";
	return /* @__PURE__ */ Y(M, {
		corner: a,
		width: s,
		"data-testid": l,
		...c ? { className: c } : {},
		children: /* @__PURE__ */ Y(u, {
			variant: "info",
			layout: "stacked",
			icon: /* @__PURE__ */ Y(r, { size: 16 }),
			title: St(e),
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
function wt(e) {
	if (!e || typeof e != "object") return null;
	let t = e;
	return typeof t.messageId != "string" || !t.messageId ? null : {
		messageId: t.messageId,
		author: $(t.author) ?? "Unknown",
		text: $(t.text) ?? "",
		...$(t.timestamp) ? { timestamp: t.timestamp } : {}
	};
}
function Tt(e) {
	let t = e.metadata?.attachments, n = Array.isArray(t) ? t.filter((e) => !!e && typeof e == "object" && typeof e.url == "string" && typeof e.id == "string") : void 0, r;
	if (e.metadata) {
		let { replyTo: t, ...n } = e.metadata, i = { ...n }, a = wt(t);
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
function Et(e) {
	let t = /* @__PURE__ */ new Map();
	for (let n of e) {
		let e = $(n.metadata?.displayName);
		n.userId && e && !n.deletedAt && t.set(n.userId, e);
	}
	return e.map((e) => {
		let n = Tt(e);
		return n.displayName || !e.deletedAt ? n : {
			...n,
			displayName: e.userId && t.get(e.userId) || "a removed member"
		};
	});
}
function Dt(e) {
	return {
		id: $(e.metadata?.userId) || e.clientId,
		name: $(e.metadata?.displayName) ?? e.clientId.slice(0, 12),
		avatarUrl: $(e.metadata?.avatarUrl),
		online: e.status !== "offline",
		...e.status === "away" || e.status === "busy" ? { idle: !0 } : {}
	};
}
function Ot(e) {
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
var kt = [
	15,
	25,
	35,
	45,
	55,
	65,
	75,
	85
], At = [
	20,
	35,
	50,
	65,
	80
];
function jt(e, t) {
	let n = kt[t % kt.length] ?? 50, r = At[Math.floor(t / kt.length) % At.length] ?? 50, i = e.position != null && typeof e.position == "object" ? e.position : null;
	return {
		id: e.id,
		emoji: e.emoji,
		x: i?.x ?? n,
		y: i?.y ?? r,
		timestamp: e.timestamp
	};
}
function Mt(e) {
	return e.map(jt);
}
function Nt(e, t) {
	return (e.reactionsFor ? e.reactionsFor(t) : e.reactions.filter((e) => e.targetId === t)).map((e) => ({
		emoji: e.emoji,
		userId: e.userId ?? e.clientId,
		displayName: e.displayName
	}));
}
function Pt(e) {
	try {
		let t = Date.now() - new Date(e).getTime(), n = Math.floor(t / 1e3);
		return n < 60 ? "just now" : n < 3600 ? `${Math.floor(n / 60)}m ago` : n < 86400 ? `${Math.floor(n / 3600)}h ago` : e.slice(0, 10);
	} catch {
		return "";
	}
}
var Ft = {
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
function It(e) {
	let t = e.detail;
	return typeof t.subject == "string" ? t.subject : typeof t.contentId == "string" ? t.contentId.slice(0, 12) : typeof t.roomId == "string" ? `room:${t.roomId.slice(0, 8)}` : typeof t.pipelineId == "string" ? `pipeline:${t.pipelineId}` : e.eventType;
}
function Lt(e, t) {
	return [
		e.eventType,
		e.timestamp,
		e.userId ?? e.displayName,
		t
	].join("|");
}
function Rt(e) {
	return {
		id: Lt(e, It(e)),
		actor: e.displayName,
		action: Ft[e.eventType] ?? e.eventType.split(".").pop() ?? "did",
		subject: It(e),
		ticketId: typeof e.detail.ticketId == "string" ? e.detail.ticketId : void 0,
		timeLabel: Pt(e.timestamp),
		kind: e.eventType.split(".")[0]
	};
}
function zt(e) {
	let t = /* @__PURE__ */ new Map();
	return e.map((e) => {
		let n = Rt(e), r = t.get(n.id) ?? 0;
		return t.set(n.id, r + 1), r === 0 ? n : {
			...n,
			id: `${n.id}#${r}`
		};
	});
}
function Bt(e) {
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
function Vt(e) {
	return e.map(Bt);
}
function Ht(e, t, n) {
	return {
		id: e.clientId,
		displayName: e.displayName || e.clientId.slice(0, 12),
		isMuted: !e.audioOn,
		isLocal: t == null ? void 0 : e.clientId === t,
		...n ? { avatarUrl: n } : {}
	};
}
function Ut(e, t, n) {
	return e.map((e) => Ht(e, t, n?.[e.clientId]));
}
function Wt(e) {
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
function Gt(e) {
	return e.map(Wt);
}
function Kt(e) {
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
function qt({ chat: e, localMessages: t, presence: n, upload: r, reactions: i, pins: a, currentActor: o, currentUserId: s, displayName: c, avatarUrl: l, sendMetadata: u, publishTyping: d, attachmentSrc: f, onOpenAttachment: p, acceptFiles: m, maxFileSize: h, onFileError: g, disabled: _, typingUsers: v, tone: y, fill: b, flushComposer: x, contentAlign: S, showHeader: C, loadMoreHistory: w = !1, joinHistoryLimit: T = 20, historyPageSize: E = 50, onLoadMore: D, hasMore: O, loadingMore: k, composer: A, renderMessageReferences: j, transformMessages: M, dock: N, emojis: P, onReply: ee, reply: te, onCancelReply: I, readReceipts: ne, readReceiptsEnabled: re, unreadFrom: ie, threaded: ae, postRhythm: L, onJumpToMessage: oe, highlightedMessageId: se, documentEditors: R, callParticipants: z, onJoinCall: B, onOpenDocument: ce, wrapWithNetworkShim: le, editable: ue = !0, canEdit: de, canDelete: fe, onForwardMessage: pe }) {
	let V = G(() => Et(e.messages), [e.messages]), me = G(() => {
		if (!t?.length) return [];
		let e = new Set(V.flatMap((e) => e.id ? [e.id] : [])), n = /* @__PURE__ */ new Set(), r = [];
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
	}, [V, t]), he = G(() => {
		let e = V;
		if (!t?.length) return e;
		let n = new Set(e.flatMap((e) => e.id ? [e.id] : [])), r = t.filter((e) => e.body === void 0 && (!e.id || !n.has(e.id)));
		return r.length === 0 ? e : [...e, ...r].map((e, t) => ({
			m: e,
			i: t
		})).sort((e, t) => Date.parse(e.m.timestamp) - Date.parse(t.m.timestamp) || e.i - t.i).map(({ m: e }) => e);
	}, [V, t]), ge = v ?? n?.roster.filter((e) => {
		if (e.metadata?.isTyping !== !0) return !1;
		let t = e.metadata?.userId;
		return s && typeof t == "string" ? t !== s : !o || e.clientId !== o;
	}).map((e) => e.metadata?.displayName ?? e.clientId.slice(0, 8)) ?? [], _e = e.sendMessage, ve = U((e) => {
		let t = { ...u ?? {} };
		c && (t.displayName = c), l && (t.avatarUrl = l), Object.keys(t).length > 0 ? _e(e, t) : _e(e);
	}, [
		_e,
		u,
		c,
		l
	]), H = n?.updateMetadata, ye = (d ?? !0) && !!H, be = U((e) => H?.({ isTyping: e }), [H]), xe = e.loadHistory, [X, Se] = q(T), [Ce, we] = q(!1), Z = e.messages.length, Te = K(Z);
	W(() => {
		Z !== Te.current && (Te.current = Z, we(!1));
	}, [Z]);
	let Ee = K(X);
	Ee.current = X;
	let De = U(() => {
		let e = Ee.current + E;
		Ee.current = e, Se(e), we(!0), xe(e);
	}, [xe, E]), Oe = D ? {
		onLoadMore: D,
		hasMore: O,
		loadingMore: k
	} : w ? {
		onLoadMore: De,
		hasMore: O ?? Z >= X,
		loadingMore: k ?? Ce
	} : {}, ke = G(() => i ? (e) => Nt(i, e) : void 0, [i]), Ae = G(() => {
		if (!i || !s) return;
		let { toggle: e, react: t, unreact: n } = i;
		return e ? (t, n) => e(n, {
			targetId: t,
			userId: s
		}) : (e, r) => {
			Nt(i, e).some((e) => e.emoji === r && e.userId === s) && n ? n(r, { targetId: e }) : t(r, { targetId: e });
		};
	}, [i, s]), je = U((e) => {
		if (!a) return;
		let t = e.id ?? "";
		t && (a.pinnedIds.has(t) ? a.unpin(t) : a.pin({
			messageId: t,
			text: e.content,
			author: e.displayName ?? "Unknown"
		}));
	}, [a]), Me = e.editMessage, Pe = e.deleteMessage, Fe = U((e, t) => {
		let n = t.trim();
		if (!e.id || !n) return;
		let r = `<p>${n.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br>")}</p>`;
		Me?.(e.id, n, { html: r });
	}, [Me]), Q = U((e) => {
		e.id && Pe?.(e.id);
	}, [Pe]), Ie = /* @__PURE__ */ Y(F, {
		messages: M ? M(he) : he,
		...me.length ? { localMessages: me } : {},
		...N === void 0 ? {} : { dock: N },
		onSend: ve,
		disabled: _,
		typingUsers: ge,
		tone: y,
		fill: b,
		flushComposer: x,
		contentAlign: S,
		showHeader: C,
		composer: A,
		emojis: P,
		...Oe,
		...ye ? { onTyping: be } : {},
		...r ? {
			onSendFiles: (e) => {
				for (let t of e) r.upload(t);
			},
			transfers: r.transfers,
			onCancelTransfer: r.cancelTransfer
		} : {},
		currentActor: o,
		currentUserId: s,
		reactionsFor: ke,
		onToggleReaction: Ae,
		...a ? {
			pinnedMessageIds: a.pinnedIds,
			onTogglePin: je
		} : {},
		...ue && Me ? {
			onEditMessage: Fe,
			...de ? { canEditMessage: de } : {}
		} : {},
		...ue && Pe ? {
			onDeleteMessage: Q,
			...fe ? { canDeleteMessage: fe } : {}
		} : {},
		onForwardMessage: pe,
		onReply: ee,
		reply: te,
		onCancelReply: I,
		readReceipts: ne,
		readReceiptsEnabled: re,
		unreadFrom: ie,
		threaded: ae,
		...L ? { postRhythm: L } : {},
		onJumpToMessage: oe,
		highlightedMessageId: se,
		documentEditors: R,
		callParticipants: z,
		onJoinCall: B,
		onOpenDocument: ce,
		renderMessageReferences: j,
		attachmentSrc: f,
		onOpenAttachment: p,
		acceptFiles: m,
		maxFileSize: h,
		onFileError: g
	});
	return /* @__PURE__ */ Y(J, { children: Ne(Ie, le) });
}
//#endregion
//#region src/integrations/realtime-modules/WrappedPresencePanel.tsx
var Jt = {
	typing: 4,
	online: 3,
	away: 2,
	busy: 1,
	offline: 0
};
function Yt(e) {
	return Jt[e] ?? 2.5;
}
function Xt(e, t) {
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
			let n = Yt(t.status) - Yt(e.status);
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
function Zt({ presence: e, currentClientId: t, perConnection: n = !1, wrapWithNetworkShim: r }) {
	let i = G(() => n ? e.roster.map((e) => ({
		clientId: e.clientId,
		status: e.status,
		metadata: e.metadata
	})) : Xt(e.roster, t), [
		e.roster,
		t,
		n
	]);
	return /* @__PURE__ */ Y(J, { children: Ne(/* @__PURE__ */ Y(ne, {
		users: i,
		currentClientId: t
	}), r) });
}
//#endregion
//#region src/integrations/realtime-modules/WrappedActivityPanel.tsx
function Qt({ activity: e, visibleCount: t, rotateMs: n, staggerMs: r, kindColors: i, className: a }) {
	let o = G(() => zt(e.events), [e.events]);
	return /* @__PURE__ */ Y(k, {
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
function $t({ cursors: t, coordinates: n = "pixels", onMove: r, children: i, className: a }) {
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
				let t = e.label ?? e.clientId, n = e.color ?? ee(t);
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
						children: e.label ? e.label : re(e.clientId)
					})]
				}, e.clientId);
			})
		})]
	});
}
//#endregion
//#region src/integrations/realtime-modules/WrappedCursorOverlay.tsx
function en({ cursor: e, coordinates: t = "fraction", publish: n = !0, selfClientId: r, children: i, className: a }) {
	let o = G(() => Kt(e.cursors).filter((e) => e.clientId !== r), [e.cursors, r]), s = e.move;
	return /* @__PURE__ */ Y($t, {
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
function tn({ reactions: e, ttlMs: t = 2500 }) {
	let [n, r] = q([]), i = e.reactions, a = K(/* @__PURE__ */ new Map());
	return W(() => {
		if (i.length === 0) return;
		let e = i[i.length - 1], n = jt(e, i.length - 1), o = a.current;
		o.has(n.id) || (r((e) => e.some((e) => e.id === n.id) ? e : [...e, n]), o.set(n.id, setTimeout(() => {
			o.delete(n.id), r((e) => e.filter((e) => e.id !== n.id));
		}, t)));
	}, [i, t]), W(() => {
		let e = a.current;
		return () => {
			e.forEach((e) => clearTimeout(e)), e.clear();
		};
	}, []), /* @__PURE__ */ Y(j, { reactions: n });
}
//#endregion
//#region src/integrations/realtime-modules/WrappedFileUploadDrop.tsx
function nn({ fileUpload: e, accept: t, maxSize: n, multiple: r, disabled: i, label: a, className: o, uploadMetadata: s, onError: c }) {
	let l = Vt(e.uploads);
	function u(t) {
		for (let n of t) e.upload(n, s ? { metadata: s } : void 0).catch((e) => {
			let t = e instanceof Error ? e.message : "Upload failed";
			c?.(t);
		});
	}
	return /* @__PURE__ */ X("div", { children: [/* @__PURE__ */ Y(O, {
		accept: t,
		maxSize: n,
		multiple: r,
		disabled: i,
		label: a,
		className: o,
		onFiles: u,
		onError: c
	}), l.length > 0 && /* @__PURE__ */ Y(rn, {
		summaries: l,
		onDismiss: () => e.removeCompleted()
	})] });
}
function rn({ summaries: e, onDismiss: t }) {
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
					className: `text-xs font-semibold ${an(e.status)}`,
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
					"data-ui-part": "",
					type: "button",
					onClick: t,
					className: "text-xs text-danger bg-transparent border-0 cursor-pointer p-0",
					children: "Dismiss"
				})
			]
		}, e.id))
	});
}
function an(e) {
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
function on({ hangout: e, localClientId: t, videoElements: n, mode: r, spotlightContent: i, activeSpeakerId: a, speakerHysteresisMs: o, onParticipantClick: s, className: c }) {
	let l = Ut(e.participants, t), u = t == null ? null : l.find((e) => e.id === t) ?? null, d = t == null ? l : l.filter((e) => e.id !== t);
	function f(e) {
		return n ? e.map((e) => ({
			...e,
			videoElement: n[e.id] ?? e.videoElement
		})) : e;
	}
	return /* @__PURE__ */ Y(B, {
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
function sn({ notifications: e, onItemClick: t, ...n }) {
	let r = Gt(e.notifications);
	return /* @__PURE__ */ Y(w, {
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
function cn({ notifications: e, onItemClick: t, unreadCount: n, ...r }) {
	let i = Gt(e.notifications);
	return /* @__PURE__ */ Y(E, {
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
function ln({ socket: e, ...t }) {
	return /* @__PURE__ */ Y(T, {
		state: e.connectionState,
		...t
	});
}
//#endregion
//#region src/integrations/realtime-modules/CapabilityBoundary.tsx
function un({ capability: e, loading: t, fallback: n, children: r }) {
	return e.isLoading ? /* @__PURE__ */ Y(J, { children: t ?? null }) : e.enabled ? /* @__PURE__ */ Y(J, { children: r }) : /* @__PURE__ */ Y(J, { children: n ?? null });
}
//#endregion
//#region src/integrations/realtime-modules/WrappedMediaEffectsTray.tsx
function dn({ controller: e, ...t }) {
	return /* @__PURE__ */ Y(V, {
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
function fn({ open: e, controller: t, onClose: n, onApplied: r, ...i }) {
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
function pn(e) {
	let t = e.draft;
	if (!t) return 0;
	let n = 0;
	return t.filterId !== e.filterId && n++, (t.backgroundMode !== e.backgroundMode || t.backgroundMode === "image" && t.backgroundImageUrl !== e.backgroundImageUrl) && n++, t.faceSpriteId !== e.faceSpriteId && n++, n;
}
//#endregion
//#region src/integrations/realtime-modules/WrappedCanvasDocument.tsx
function mn({ canvas: e, schema: t, legacyModel: n, beforeConvert: r, ...i }) {
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
	return /* @__PURE__ */ Y(he, {
		...i,
		isCanvas: e.isCanvas,
		body: e.body,
		onConvert: s,
		unsupported: a
	});
}
//#endregion
//#region src/integrations/realtime-modules/WrappedAudioVideoSettingsForm.tsx
function hn({ devices: e, settings: t, cameraOn: n, ...r }) {
	return /* @__PURE__ */ Y(z, {
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
function gn(e) {
	return new Map(e.map((e, t) => [e.userId, t + 1]));
}
function _n(e, t) {
	let n = gn(t.hands);
	return e.map((e) => ({
		...e,
		handRaised: n.get(e.id)
	}));
}
function vn(e, t) {
	let n = gn(e.hands);
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
function yn(e, t, n = []) {
	let r = new Map(t.map((e) => [e.userId, e])), i = gn(n), a = (e) => {
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
function bn(e) {
	return Array.from({ length: e }, (e, t) => ({ name: `Room ${t + 1}` }));
}
function xn({ meeting: e, people: t, roomNames: n, renderError: r, ...i }) {
	let { rooms: a, unassigned: o } = yn(e.breakout, t, e.hands), s = e.breakout;
	return /* @__PURE__ */ Y(de, {
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
			let i = n?.(t) ?? bn(t).map((e) => e.name);
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
			className: "mx-3 mt-2",
			"data-testid": "breakout-error",
			children: e.error.message
		}) : null
	});
}
function Sn({ meeting: e, className: t }) {
	if (!e.myRoom) return null;
	let n = e.breakout;
	return /* @__PURE__ */ Y(ce, {
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
function Cn(e, t) {
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
			icon: /* @__PURE__ */ Y(le, {}),
			popoverLabel: "Send a reaction",
			popover: (e) => /* @__PURE__ */ Y(L, {
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
			icon: /* @__PURE__ */ Y(ae, {}),
			...e.myHandPosition === null ? {} : { count: e.myHandPosition },
			pressed: n,
			onClick: e.toggleHand,
			disabled: !e.ready
		},
		rooms: {
			id: "rooms",
			label: "Rooms",
			icon: /* @__PURE__ */ Y(se, {}),
			active: t.roomsOpen,
			onClick: t.onToggleRooms,
			disabled: !e.ready,
			badge: e.breakout.phase === "open" && !e.myRoom && e.breakout.mode === "self-select" ? e.breakout.rooms.filter((e) => e.state === "open").length : void 0
		}
	};
}
function wn(e) {
	return e.myRoom ? `${e.myRoom.name} chat` : "Meeting chat";
}
function Tn({ roomName: e }) {
	return /* @__PURE__ */ X("div", {
		className: "flex items-center gap-2 border-t border-border px-3 py-1.5",
		role: "status",
		"aria-live": "polite",
		"data-testid": "meeting-chat-context",
		children: [
			/* @__PURE__ */ Y(se, {
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
function En({ value: e, onChange: t }) {
	return /* @__PURE__ */ X("div", {
		className: "flex items-center gap-2 border-t border-border px-3 py-1.5",
		"data-testid": "meeting-chat-target",
		children: [
			/* @__PURE__ */ Y(c, {
				size: "xs",
				tone: "secondary",
				children: "To"
			}),
			/* @__PURE__ */ Y(S, {
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
var Dn = "meeting-announcement:";
function On(e, t) {
	let [n, r] = q("chat"), [i, a] = q([]), o = e.breakout.announcement, s = e.breakout.announcements, l = (e) => `${e.at}|${e.fromUserId}`, u = [o ? l(o) : "", ...(s ?? []).map(l)].join(",");
	W(() => {
		let e = [...s ?? [], ...o ? [o] : []];
		e.length !== 0 && a((t) => {
			let n = new Set(t.map(l)), r = e.filter((e) => !n.has(l(e)) && n.add(l(e)));
			return r.length === 0 ? t : [...t, ...r].sort((e, t) => Date.parse(e.at) - Date.parse(t.at)).slice(-50);
		});
	}, [u]);
	let d = e.ready && e.isOrganizer && e.breakout.phase === "open", f = d ? n : "chat", p = t.announcementNote ?? "Announcement to every room", m = G(() => i.map((e) => ({
		id: `${Dn}${e.at}:${e.fromUserId}`,
		clientId: "meeting",
		userId: e.fromUserId,
		displayName: e.fromDisplayName,
		content: e.message,
		timestamp: e.at
	})), [i]), h = t.renderMessageReferences, g = G(() => i.map((e) => ({
		id: `${Dn}${e.at}:${e.fromUserId}`,
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
		renderMessageReferences: (e) => e.id?.startsWith(Dn) ? /* @__PURE__ */ Y(c, {
			as: "p",
			size: "xs",
			tone: "secondary",
			"data-testid": "meeting-chat-announcement-note",
			children: p
		}) : h?.(e) ?? null,
		title: wn(e),
		dock: e.myRoom || d ? /* @__PURE__ */ X(J, { children: [e.myRoom && /* @__PURE__ */ Y(Tn, { roomName: e.myRoom.name }), d && /* @__PURE__ */ Y(En, {
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
export { ct as $, zt as A, Dt as B, nn as C, Zt as D, Qt as E, Ht as F, St as G, jt as H, Ut as I, pt as J, xt as K, Nt as L, Et as M, Bt as N, qt as O, Vt as P, ot as Q, Wt as R, on as S, Ce as St, en as T, Mt as U, Ot as V, Ct as W, ut as X, dt as Y, lt as Z, dn as _, Me as _t, yn as a, Ye as at, cn as b, Oe as bt, gn as c, Ue as ct, On as d, Ve as dt, st as et, _n as f, Ie as ft, pn as g, Ne as gt, fn as h, Pe as ht, xn as i, Qe as it, Tt as j, Rt as k, vn as l, We as lt, mn as m, Be as mt, En as n, et as nt, bn as o, He as ot, hn as p, Re as pt, mt as q, Sn as r, at as rt, wn as s, Ke as st, Tn as t, it as tt, Cn as u, Q as ut, un as v, je as vt, tn as w, sn as x, Ee as xt, ln as y, ke as yt, Gt as z };
