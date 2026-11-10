import { d as e, n as t } from "./Button-DQoeE5dN.js";
import { t as n } from "./safeHref-BL4Z8n8E.js";
import { i as r, r as i, t as a } from "./Text-fqIvcZp2.js";
import { t as o } from "./IconButton-BgM9MvwA.js";
import { et as s } from "./Icons-CqVFbuiZ.js";
import { n as c, y as l } from "./MediaIcons-_ai5Til2.js";
import { t as u } from "./Badge-BArozXCv.js";
import { t as d } from "./Banner-DPR4sIxI.js";
import { t as f } from "./Modal-C88cabjQ.js";
import { t as p } from "./ConfirmDialog-DaIkb8ho.js";
import { t as m } from "./Input-DiOEvL5h.js";
import { t as h } from "./FormField-BDZIVA7n.js";
import { t as g } from "./EmptyState-D0-FmU2J.js";
import { n as _ } from "./ThinkingDots-mwuPsKFX.js";
import { t as v } from "./LoadingState-BQlqtSB5.js";
import { t as y } from "./SegmentedControl-DMudc23g.js";
import { n as b } from "./Avatar-D5tIRFXD.js";
import { t as x } from "./SkeletonCard-BryltcC7.js";
import { $ as S, Q as C, t as w } from "./ChatPanel-CysJoHFp.js";
import { t as T } from "./Switch-CRiY_kzy.js";
import { t as E } from "./Textarea-Cf4WFXAs.js";
import { t as D } from "./InlineAlert-BjAoVrZW.js";
import { c as O, i as k, n as A, o as j, s as M, t as N } from "./SidebarRow-CfVl-Jiq.js";
import { t as P } from "./PresenceAvatars-BoCqGmHF.js";
import { t as ee } from "./FileUploadDrop-Da3teuhw.js";
import { t as F } from "./ActivityFeed-eOZ_nGef.js";
import { t as te } from "./ReactionsOverlay-XR_TNH6f.js";
import { d as ne, n as re, t as I, u as ie } from "./ConversationSurface-D3FMpf9_.js";
import { E as L, G as R, R as ae, T as oe, Y as z, _ as se, i as B, k as ce, n as le, q as ue, s as V, t as de, w as fe, x as H, y as pe } from "./BreakoutRoomsPanel-Dz8UCTUg.js";
import { t as me } from "./useActiveSpeaker-BGKJU3Lb.js";
import { c as he, o as ge, s as _e } from "./useDocumentImageUpload-C1GEICFK.js";
import { Component as ve, createContext as ye, createElement as be, useCallback as U, useContext as xe, useEffect as W, useId as Se, useMemo as G, useRef as K, useState as q } from "react";
import { Fragment as J, jsx as Y, jsxs as X } from "react/jsx-runtime";
import * as Ce from "yjs";
//#region src/integrations/realtime/HangoutRoomRow.tsx
function we(e) {
	function t(t) {
		return Z(e, t);
	}
	return t;
}
function Z(e, { slug: t, name: n, participantId: r, occupancy: i, subscribeRoomsIndex: a, onClick: o, onContextMenu: s, onOpenConversation: c, kebab: l, className: d, "data-testid": f = "room-row" }) {
	let p = e.useRoomOccupancy(a ? t : null, { subscribeRoomsIndex: a }), m = a ? p.occupancy ?? null : i ?? null, h = m?.count ?? 0, g = m?.members ?? [], _ = G(() => r ? g.some((e) => e.participantId === r) : !1, [g, r]), v = _, y = G(() => g.slice(0, 3).map((e) => ({
		id: e.participantId,
		name: e.displayName || e.userId,
		online: !0
	})), [g]), b = null;
	h > 1 ? b = /* @__PURE__ */ X(J, { children: [/* @__PURE__ */ Y(P, {
		users: y,
		maxVisible: 3,
		size: 18
	}), /* @__PURE__ */ Y(u, {
		variant: "count",
		value: h,
		color: "muted"
	})] }) : h === 1 && _ ? b = /* @__PURE__ */ Y(u, {
		variant: "pulse",
		color: "accent",
		"aria-label": "Just you in this room",
		"data-testid": `${f}-self-pulse`
	}) : h === 1 && (b = /* @__PURE__ */ X(J, { children: [/* @__PURE__ */ Y(P, {
		users: y,
		maxVisible: 1,
		size: 18
	}), /* @__PURE__ */ Y(u, {
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
	return /* @__PURE__ */ Y(N, {
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
		kebab: l ?? x,
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
var Te = 3, Ee = 48;
function De(e) {
	return e.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 48);
}
function Oe(e) {
	let t = e.trim();
	return t.length === 0 ? "Name is required." : t.length < Te ? `Name must be at least ${Te} characters.` : t.length > Ee ? `Name must be at most ${Ee} characters.` : null;
}
function ke({ open: e, onClose: n, onCreate: r, onCreated: i, defaultVisibility: a, title: o = "New room", submitLabel: s = "Create room" }) {
	let c = Se(), [l, u] = q(""), [d, p] = q(""), [g, _] = q(!1), [v, y] = q(!1), [b, x] = q(!1), [S, C] = q(null);
	W(() => {
		e && (u(""), p(""), _(!1), y(!1), x(!1), C(null));
	}, [e]);
	let w = G(() => Oe(l), [l]), O = G(() => De(l), [l]), k = !w && !b;
	async function A(e) {
		if (e.preventDefault(), k) {
			x(!0), C(null);
			try {
				let e = await r({
					name: l.trim(),
					description: d.trim() || void 0,
					visibility: a,
					settings: {
						audioOnly: g,
						recordingEnabled: v
					}
				});
				i?.(e), n();
			} catch (e) {
				C(e instanceof Error ? e.message : "Failed to create room."), x(!1);
			}
		}
	}
	return /* @__PURE__ */ Y(f, {
		open: e,
		onClose: b ? () => {} : n,
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
				disabled: b,
				children: "Cancel"
			}), /* @__PURE__ */ Y(t, {
				type: "submit",
				form: c,
				variant: "primary",
				size: "sm",
				disabled: !k,
				"data-testid": "new-hangout-room-submit",
				children: b ? "Creating…" : s
			})]
		}),
		children: /* @__PURE__ */ X("form", {
			id: c,
			onSubmit: A,
			className: "flex flex-col gap-4",
			children: [
				/* @__PURE__ */ Y(h, {
					label: "Name",
					required: !0,
					error: l.length > 0 ? w ?? void 0 : void 0,
					hint: O ? `Room address: #${O}` : "Choose a clear name people will recognize.",
					hintTestId: l.length > 0 && w ? "new-hangout-room-name-error" : "new-hangout-room-slug-preview",
					children: (e) => /* @__PURE__ */ Y(m, {
						...e,
						"data-autofocus": !0,
						"data-testid": "new-hangout-room-name",
						value: l,
						onChange: (e) => u(e.target.value),
						placeholder: "Team standup",
						maxLength: 58,
						disabled: b,
						size: "sm"
					})
				}),
				/* @__PURE__ */ Y(h, {
					label: "Description",
					hint: "Optional. Explain what people will use this space for.",
					children: (e) => /* @__PURE__ */ Y(E, {
						...e,
						"data-testid": "new-hangout-room-description",
						value: d,
						onChange: (e) => p(e.target.value),
						placeholder: "Purpose of this space",
						rows: 2,
						disabled: b
					})
				}),
				/* @__PURE__ */ Y(h, {
					label: "Start with audio only",
					layout: "inline",
					hint: "People join with their cameras off.",
					children: (e) => /* @__PURE__ */ Y(T, {
						"aria-labelledby": e.labelId,
						checked: g,
						onChange: _,
						disabled: b,
						size: "sm",
						"data-testid": "new-hangout-room-audio-only"
					})
				}),
				/* @__PURE__ */ Y(h, {
					label: "Record calls",
					layout: "inline",
					hint: "Record new calls in this hangout. People see a recording notice when they join.",
					children: (e) => /* @__PURE__ */ Y(T, {
						"aria-labelledby": e.labelId,
						checked: v,
						onChange: y,
						disabled: b,
						size: "sm",
						"data-testid": "new-hangout-room-recording"
					})
				}),
				S && /* @__PURE__ */ Y(D, {
					tone: "error",
					"data-testid": "new-hangout-room-error",
					children: S
				})
			]
		})
	});
}
//#endregion
//#region src/integrations/realtime/HangoutRoomsSection.tsx
function Ae(e) {
	function t(t) {
		return je(e, t);
	}
	return t;
}
function je(e, { rooms: n, occupancyFor: r, occupancyAdapter: i, participantId: a, onJoinRoom: s, onOpenConversation: c, onContextMenu: l, onBrowseAll: u, maxVisible: d = 10, title: f = "Rooms", storageKey: p, collapsed: m = !1, onToggleCollapse: h, renderCreateDialog: _ }) {
	let [v, y] = q(!1), b = () => y(!0), x = () => y(!1), S = G(() => {
		let e = /* @__PURE__ */ new Set(), t = [];
		for (let r of n.rooms) r.state === "active" && (e.has(r.slug) || (e.add(r.slug), t.push(r)));
		return t;
	}, [n.rooms]), C = G(() => S.slice(0, d), [S, d]), w = S.length - C.length, T = /* @__PURE__ */ Y(o, {
		"aria-label": "New room",
		size: "sm",
		onClick: b,
		icon: /* @__PURE__ */ Y("span", {
			"aria-hidden": "true",
			className: "text-[14px] leading-none font-bold",
			children: "+"
		}),
		"data-testid": "new-room-button"
	}), E = h !== void 0, D = /* @__PURE__ */ X(J, { children: [
		n.isLoading && /* @__PURE__ */ Y("div", {
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
		!n.isLoading && n.error && /* @__PURE__ */ X("div", {
			role: "alert",
			"data-testid": "hangout-rooms-error",
			className: "mx-1 my-1 px-3 py-2 text-[12px] text-danger-fg bg-danger-bg border border-danger-border rounded-md flex items-center justify-between gap-2",
			children: [/* @__PURE__ */ Y("span", {
				className: "truncate",
				children: "Couldn't load rooms."
			}), /* @__PURE__ */ Y("button", {
				"data-ui-part": "",
				type: "button",
				onClick: () => void n.refetch(),
				className: "text-danger-fg underline hover:text-danger-fg cursor-pointer",
				children: "Retry"
			})]
		}),
		!n.isLoading && !n.error && S.length === 0 && /* @__PURE__ */ Y(g, {
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
		!n.isLoading && !n.error && S.length > 0 && /* @__PURE__ */ X("div", {
			className: "flex flex-col gap-0.5",
			children: [C.map((t) => /* @__PURE__ */ Y(e, {
				slug: t.slug,
				name: t.name,
				participantId: a,
				subscribeRoomsIndex: i,
				occupancy: i ? null : r?.(t.slug) ?? null,
				onClick: s ? () => s(t) : void 0,
				onOpenConversation: c ? () => c(t) : void 0,
				onContextMenu: l ? (e) => l(t, e) : void 0
			}, t.slug)), w > 0 && u && /* @__PURE__ */ Y(N, {
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
		children: [/* @__PURE__ */ Y(ne, {
			label: f,
			presentational: !1,
			collapsed: m,
			onToggleCollapse: h,
			count: S.length,
			actions: [{
				label: "New room",
				onClick: b,
				"data-testid": "new-room-button"
			}],
			"data-testid": "rooms-section-header"
		}), !m && D]
	}) : /* @__PURE__ */ Y(A, {
		title: f,
		storageKey: p,
		actions: T,
		"data-testid": "rooms-section",
		children: D
	}), _ ? _({
		open: v,
		onClose: x
	}) : /* @__PURE__ */ Y(ke, {
		open: v,
		onClose: x,
		onCreate: n.createRoom,
		onCreated: (e) => {
			s?.(e);
		}
	})] });
}
//#endregion
//#region src/integrations/realtime-modules/NetworkErrorBoundary.tsx
var Me = class extends ve {
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
			children: /* @__PURE__ */ Y(g, {
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
function Ne({ connectionState: t, children: n, onRetry: r, reconnectingLabel: i, disconnectedTitle: a = "Disconnected", disconnectedDescription: o = "The connection to the server was lost. Check your network and try again.", retryLabel: s = "Try again", connectingPlaceholder: c, disconnectedFallback: l, className: u }) {
	return t === "connecting" ? /* @__PURE__ */ Y("div", {
		"data-testid": "reconnecting-shim-connecting",
		className: u,
		children: c ?? /* @__PURE__ */ Y(x, { height: 120 })
	}) : t === "disconnected" ? /* @__PURE__ */ Y("div", {
		"data-testid": "reconnecting-shim-disconnected",
		className: u,
		children: l ?? /* @__PURE__ */ Y(g, {
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
function Pe(e, t) {
	return t ? /* @__PURE__ */ Y(Me, {
		title: t.errorTitle,
		description: t.errorDescription,
		retryLabel: t.retryLabel,
		onRetry: t.onRetry,
		onError: t.onError,
		fallback: t.errorFallback,
		children: /* @__PURE__ */ Y(Ne, {
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
function Fe(e) {
	function t(t) {
		return Ie(e, t);
	}
	return t;
}
function Ie(e, { hangoutRooms: t, subscribeRoomsIndex: n, occupancyFor: r, participantId: i, onJoin: a, onContextMenu: o, onBrowseAll: s, maxVisible: c, title: l, storageKey: u, renderEmpty: d, collapsed: f, onToggleCollapse: p, renderCreateDialog: m, wrapWithNetworkShim: h }) {
	return t.rooms.filter((e) => e.state === "active").length === 0 && !t.isLoading && !t.error && d ? /* @__PURE__ */ Y("div", {
		"data-testid": "wrapped-hangout-rooms-empty-slot",
		children: d
	}) : /* @__PURE__ */ Y(J, { children: Pe(/* @__PURE__ */ Y(e, {
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
], Le = {
	chat: !0,
	presence: !0
}, Re = ye(null);
function ze(e) {
	function t(t) {
		return Be(e, t);
	}
	return t;
}
function Be(e, { capabilities: t = Le, channel: n, children: r }) {
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
	return /* @__PURE__ */ Y(Re.Provider, {
		value: s,
		children: r
	});
}
function Ve() {
	return xe(Re) ?? {
		can: Object.fromEntries(Q.map((e) => [e, !1])),
		declared: Object.fromEntries(Q.map((e) => [e, !1])),
		provisioned: Object.fromEntries(Q.map((e) => [e, !1])),
		isLoading: !1
	};
}
function He({ need: e, children: t, fallback: n = null }) {
	let { can: r } = Ve(), i = (Array.isArray(e) ? e : [e]).every((e) => r[e]);
	return /* @__PURE__ */ Y(J, { children: i ? t : n });
}
//#endregion
//#region src/integrations/realtime/WrappedConversationSurface.tsx
var Ue = {
	files: "conversation.files",
	documents: "conversation.documents",
	pins: "conversation.pins",
	mentions: "conversation.mentions",
	calls: "conversation.calls"
};
function We(e = I, t = {}) {
	return e.filter((e) => e !== "chat" && e !== "members").map((e) => t[e] ?? Ue[e]);
}
function Ge(e) {
	return (t) => Ke(e, t);
}
function Ke(e, t) {
	let { channel: n = null, hasDocuments: r = !0, from: i = I } = t;
	return i.filter((t) => t === "mentions" ? !1 : t === "documents" ? r : t !== "calls" || !!e.lobbyForChannel(n));
}
function qe({ declare: e = I, capabilities: t, capabilitiesError: n, capabilityNames: r = {}, children: i, ...a }) {
	let o = G(() => {
		let i = r;
		return e.filter((e) => e === "chat" || e === "members" || !t || n ? !0 : t[i[e] ?? Ue[e]] === !0);
	}, [
		e,
		t,
		n,
		r
	]);
	return /* @__PURE__ */ Y(re, {
		...a,
		features: o,
		children: i
	});
}
//#endregion
//#region src/integrations/realtime/WrappedStreamStage.tsx
function Je(e, { channelArn: t, excludeParticipantId: n, getAuthToken: r, baseUrl: i, onStatusChange: a, ...o }) {
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
	]), /* @__PURE__ */ Y(V, {
		...o,
		live: c,
		stream: s.stream,
		...l === null ? {} : { viewerCount: l }
	});
}
function Ye(e, { channelArn: t, playbackToken: n, baseUrl: r, onStatusChange: i, ...a }) {
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
	}, [o.ready, i]), /* @__PURE__ */ Y(V, {
		...a,
		live: o.ready,
		playlistUrl: o.playlistUrl,
		...s === null ? {} : { viewerCount: s }
	});
}
function Xe(e) {
	function t(t) {
		return Je(e, t);
	}
	function n(t) {
		return Ye(e, t);
	}
	function r({ mode: e = "near-realtime", ...r }) {
		return Y(e === "realtime" ? t : n, { ...r });
	}
	return r;
}
//#endregion
//#region src/integrations/realtime/WrappedLVSHangoutLayout.tsx
function Ze({ stream: e, displayName: t }) {
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
		children: /* @__PURE__ */ Y(b, {
			name: t,
			size: 64
		})
	});
}
function Qe(e, t) {
	let n = e.isLocal, r = n ? t ?? e.displayName ?? "You" : e.displayName || e.participantId.slice(0, 8), i = e.streams[0], a = e.screenStream, o = n ? /* @__PURE__ */ Y(Ze, {
		stream: i,
		displayName: r
	}) : /* @__PURE__ */ Y(oe, {
		stream: i,
		displayName: r,
		cameraOn: e.hasVideo
	}), s = a ? /* @__PURE__ */ Y(L, {
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
function $e(e) {
	function t(t) {
		return et(e, t);
	}
	return t;
}
function et(e, { stageToken: t, participantId: n, userId: r, localClientId: i, getStageToken: a, overlay: o, spotlightContent: s, onParticipantClick: c, mode: l = "auto", activeSpeakerStrategy: u = "audio-level", localTileLabel: d, showLocalAsTile: f = !0, handFor: p, className: m, "data-testid": h }) {
	let g = e.useLVSHangout({
		stageToken: t,
		participantId: n,
		userId: r ?? n.slice(0, 8),
		getAuthToken: a
	}), _ = G(() => g.participants.filter((e) => f || !e.isLocal).map((e) => {
		let t = Qe(e, d), n = p?.(e.appUserId ?? e.userId);
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
		children: [/* @__PURE__ */ Y(ce, {
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
function tt(e) {
	let t = we(e), n = Ae(t);
	return {
		HangoutRoomRow: t,
		HangoutRoomsSection: n,
		WrappedHangoutRoomsList: Fe(n),
		RealtimeCapabilityProvider: ze(e),
		conversationFeaturesFor: Ge(e),
		WrappedStreamStage: Xe(e),
		WrappedLVSHangoutLayout: $e(e)
	};
}
var nt = ye(null), rt = /* @__PURE__ */ new WeakMap();
function it(e) {
	let t = rt.get(e);
	return t || (t = tt(e), rt.set(e, t)), t;
}
function at({ modules: e, children: t }) {
	let n = G(() => it(e), [e]);
	return /* @__PURE__ */ Y(nt.Provider, {
		value: n,
		children: t
	});
}
function ot() {
	let e = xe(nt);
	if (!e) throw Error("useRealtimeIntegrations() needs a <RealtimeIntegrationsProvider modules={…}> above it.");
	return e;
}
//#endregion
//#region src/integrations/realtime/canvasRecovery.ts
function st(e, t, n, r = "canvasRecovery") {
	return `${r}:${JSON.stringify([
		e,
		t,
		n
	])}`;
}
function ct(e) {
	let t = "";
	for (let n = 0; n < e.length; n += 8192) t += String.fromCharCode(...e.subarray(n, n + 8192));
	return {
		version: 1,
		savedAt: (/* @__PURE__ */ new Date()).toISOString(),
		snapshot: btoa(t)
	};
}
function lt(e) {
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
function ut(e, t, n, r) {
	let i = st(e, t, n, r), [a, o] = q(() => {
		try {
			let e = JSON.parse(sessionStorage.getItem(i) ?? "null");
			return lt(e?.recovered ?? e?.pending) ? e.recovered ?? e.pending : null;
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
		s.current = ct(e), o(s.current), d();
	}, [d]), p = U(() => {
		s.current = null, o(null), d();
	}, [d]), m = U((e, t) => {
		if (!e || !t) return () => {};
		let n = () => {
			t.pendingUpdateCount && (c.current = ct(Ce.encodeStateAsUpdate(e)), d());
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
			let e = lt(s.current ?? c.current);
			if (!e) return;
			let t = URL.createObjectURL(new Blob([Uint8Array.from(e)], { type: "application/octet-stream" })), r = document.createElement("a");
			r.href = t, r.download = `document-${n}-recovery.yjs`, r.click(), window.setTimeout(() => URL.revokeObjectURL(t), 1e3);
		}, [n]),
		restore: U((e) => {
			let t = lt(s.current);
			t && (Ce.applyUpdate(e, t, "explicit-recovery"), p());
		}, [p])
	};
}
//#endregion
//#region src/integrations/realtime/canvasDocumentState.ts
function dt(e, t, n, r) {
	if (e !== "idle") return {
		status: !n && t > 0 ? "offline" : e,
		...e === "error" || !n ? { onRetry: r } : {}
	};
}
function ft(e, t, n = Date.now()) {
	return t && e.canEdit && e.expiresAt > n;
}
//#endregion
//#region src/integrations/realtime/CanvasDocumentPane.tsx
var pt = {
	showRuler: !0,
	showStatusBar: !1,
	toolbarStyle: "card",
	pageMargin: "narrow",
	fitHeight: "parent",
	paginate: !0
};
function mt(e) {
	return function(n) {
		let { documentId: a, tenant: o, userId: s, userName: c, userColor: l = "teal", canEdit: u, editing: d = !0, extensions: m, loadImage: h, isProtectedImage: g, uploadImage: y, onPendingChange: b, notices: x, children: S, viewProps: C, onEditorReady: w, loadingLabel: T = "Loading collaborative document…", layout: E, keyPrefix: O } = n, k = e.useGateway(), A = ut(o, s, a, O), j = e.useYjsDoc({
			documentId: a,
			ws: k,
			onMessage: k.onMessage,
			onUnpersistedChanges: A.retain
		}), M = e.useCanvasDocument({ ydoc: j.ydoc }), N = k.connectionState === "connected", P = u && d && j.synced && N, F = K(P);
		F.current = P;
		let [te, ne] = q(!1), [re, I] = q(null), [ie, L] = q(!1), [R, ae] = q(!1), [oe, z] = q(null), se = K(null), B = G(() => ({
			name: c,
			color: l
		}), [c, l]);
		W(() => A.track(j.ydoc, j.provider), [
			j.ydoc,
			j.provider,
			A.track
		]), W(() => {
			j.persistenceState === "saved" && j.pendingUpdateCount === 0 && A.acknowledged();
		}, [
			j.persistenceState,
			j.pendingUpdateCount,
			A.acknowledged
		]), W(() => {
			b?.(j.pendingUpdateCount);
		}, [j.pendingUpdateCount, b]), W(() => {
			j.provider?.awareness.setLocalStateField("user", {
				...B,
				id: s
			});
		}, [
			j.provider,
			B,
			s
		]), W(() => {
			if (j.pendingUpdateCount === 0) return;
			let e = (e) => {
				e.preventDefault(), e.returnValue = "";
			};
			return window.addEventListener("beforeunload", e), () => window.removeEventListener("beforeunload", e);
		}, [j.pendingUpdateCount]), W(() => k.onMessage((e) => {
			e.channel === `doc:${a}` && (e.type === "crdt:error" && I(typeof e.error == "string" ? e.error : "The document operation was refused."), e.type === "crdt:snapshot" && I(null));
		}), [k.onMessage, a]);
		let ce = async (e) => {
			let t = se.current;
			if (!(!y || !t || t.isDestroyed || !F.current || R)) {
				ae(!0), z(null);
				try {
					let n = await y(e);
					if (se.current !== t || t.isDestroyed || !F.current) throw Error("The document is no longer editable. The image was not inserted.");
					t.chain().focus().setImage({
						src: n,
						alt: e.name
					}).run(), L(!1);
				} catch (e) {
					z(e instanceof Error ? e.message : "The image could not be uploaded.");
				} finally {
					ae(!1);
				}
			}
		}, le = dt(j.persistenceState, j.pendingUpdateCount, N, j.retryPersistence), ue = {
			editable: P,
			online: N,
			synced: j.synced,
			pendingUpdateCount: j.pendingUpdateCount,
			persistenceState: j.persistenceState,
			docVersion: j.docVersion,
			ydoc: j.ydoc,
			exportMarkdown: M.exportMarkdown
		}, V = /* @__PURE__ */ X(J, { children: [
			x,
			A.recovered && /* @__PURE__ */ Y(D, {
				tone: "warning",
				children: /* @__PURE__ */ X(r, {
					gap: "xs",
					children: ["Changes from an earlier editing session are available for recovery. They have not been applied to this document.", /* @__PURE__ */ X(i, {
						gap: "sm",
						wrap: !0,
						children: [
							/* @__PURE__ */ Y(t, {
								size: "sm",
								variant: "secondary",
								onClick: A.download,
								children: "Download recovery"
							}),
							u && /* @__PURE__ */ Y(t, {
								size: "sm",
								variant: "secondary",
								disabled: !j.synced || !N || j.pendingUpdateCount > 0,
								onClick: () => ne(!0),
								children: "Recover changes…"
							}),
							/* @__PURE__ */ Y(t, {
								size: "sm",
								variant: "ghost",
								onClick: A.clear,
								children: "Discard recovery"
							})
						]
					})]
				})
			}),
			A.storageError && /* @__PURE__ */ Y(D, {
				tone: "warning",
				children: /* @__PURE__ */ X(i, {
					gap: "sm",
					wrap: !0,
					children: ["This browser could not keep a recovery copy. Keep this page open until saving finishes.", /* @__PURE__ */ Y(t, {
						size: "sm",
						variant: "secondary",
						onClick: A.download,
						children: "Download recovery"
					})]
				})
			}),
			re && /* @__PURE__ */ Y(D, {
				tone: "error",
				children: re
			})
		] }), de = j.synced && !!j.ydoc && !!M.body, fe = /* @__PURE__ */ X(J, { children: [
			S,
			/* @__PURE__ */ Y(p, {
				open: te,
				onCancel: () => ne(!1),
				title: "Recover earlier changes?",
				tone: "caution",
				body: "This explicitly merges the recovered document with the current version. It can bring back content removed by a version restore. Download the recovery first if you want to keep a separate copy.",
				confirmLabel: "Recover changes",
				onConfirm: () => {
					j.ydoc && u && N && j.pendingUpdateCount === 0 && A.restore(j.ydoc), ne(!1);
				}
			}),
			y && /* @__PURE__ */ Y(f, {
				open: ie,
				onClose: () => {
					R || L(!1);
				},
				title: "Insert image",
				children: /* @__PURE__ */ X(r, {
					gap: "sm",
					children: [oe && /* @__PURE__ */ Y(D, {
						tone: "error",
						children: oe
					}), /* @__PURE__ */ Y(ee, {
						accept: "image/*",
						maxSize: 10485760,
						disabled: R || !P,
						label: R ? "Uploading image…" : "Choose an image or drop it here",
						onFiles: (e) => {
							e[0] && ce(e[0]);
						}
					})]
				})
			})
		] }), H = (e, t = null, n = null) => E ? E({
			notices: V,
			canvas: e,
			toolbar: t,
			ruler: n,
			saveState: le,
			state: ue
		}) : /* @__PURE__ */ X(J, { children: [V, e] });
		if (!de) return H(/* @__PURE__ */ Y(v, { label: T }));
		if (!M.isCanvas) return H(/* @__PURE__ */ Y(_, {
			title: "Document migration is incomplete",
			body: "The server has not supplied a rich document snapshot. No changes have been made."
		}));
		let pe = (e) => /* @__PURE__ */ X(ge, {
			loadImage: h,
			...g ? { requiresAuthentication: g } : {},
			children: [/* @__PURE__ */ be(he, {
				...pt,
				...C,
				key: j.docVersion,
				isCanvas: !0,
				body: M.body,
				ydoc: j.ydoc,
				provider: j.provider,
				user: B,
				editable: P,
				extensions: m,
				...y && P ? { onInsertImage: () => {
					z(null), L(!0);
				} } : {},
				...e ? { renderFrame: ({ toolbar: t, ruler: n, surface: r }) => e(t, n, r) } : {},
				onEditorReady: (e) => {
					se.current = e, w?.(e);
				}
			}), fe]
		});
		return E ? pe((e, t, n) => H(/* @__PURE__ */ Y(r, {
			gap: "none",
			className: "min-h-0 flex-1",
			"data-testid": "document-canvas-slot",
			children: n
		}), e, t)) : H(/* @__PURE__ */ Y(r, {
			gap: "none",
			className: "min-h-0 flex-1",
			"data-testid": "document-canvas-slot",
			children: pe()
		}));
	};
}
//#endregion
//#region src/integrations/realtime/canvasDocumentExtensions.ts
function ht(e, t) {
	return e({
		...t,
		Image: _e(t.Image)
	});
}
//#endregion
//#region src/integrations/realtime/ConversationCallDock.tsx
var gt = (e) => e.stream ? /* @__PURE__ */ Y(L, {
	stream: e.stream,
	muted: e.isLocal
}) : void 0, _t = () => typeof HTMLMediaElement < "u" && "setSinkId" in HTMLMediaElement.prototype;
function vt(e, t, n) {
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
function yt(e, t) {
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
function bt(e) {
	let t = (e?.participants ?? []).filter((e) => !e.isLocal && e.stream && (e.state === "in-call" || e.state === "reconnecting")), n = t.map((e) => `${e.id}=${e.stream.id}`).join("|");
	return G(() => t.map((e) => ({
		participantId: e.id,
		streams: [e.stream]
	})), [n]);
}
function xt(e, { call: t, title: n, onOpenPeople: r, peopleOpen: i, onOpenSettings: a, onPopOut: o, extras: s, cameraMenuItems: c, tile: l = gt, notice: u, handFor: d, selfName: p, compact: m = !1, tileSize: h, documents: g, onOpenDocuments: _, documentsOpen: v, onDocumentClick: y, layout: b = "shelf", className: x, "data-testid": S = "conversation-call-dock" }) {
	let [C, w] = q(!1), T = t.media?.captureError ?? null, [E, O] = q(null);
	W(() => {
		T || O(null);
	}, [T]);
	let k = e.useAudioVideoSettings({ preview: C }), { activeSpeakerId: A } = me({ participants: bt(t.call) }), j = e.conversationCallDockProps(t, {
		title: n,
		onOpenPeople: r,
		...i === void 0 ? {} : { peopleOpen: i },
		onOpenSettings: a ?? (() => w(!0)),
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
		participants: yt(vt(j.participants, t.call?.participants ?? [], j.phase), d),
		layout: b,
		...h ? { tileSize: h } : {},
		...g ? { documents: g } : {},
		..._ ? { onOpenDocuments: _ } : {},
		...v === void 0 ? {} : { documentsOpen: v },
		...y ? { onDocumentClick: y } : {},
		...x ? { className: x } : {}
	};
	return /* @__PURE__ */ X(J, { children: [
		u ? /* @__PURE__ */ Y(D, {
			tone: "info",
			"data-testid": `${S}-notice`,
			children: u
		}) : null,
		T && T !== E ? /* @__PURE__ */ X(D, {
			tone: "warning",
			"data-testid": `${S}-capture-error`,
			onDismiss: () => O(T),
			children: [T, " You can keep listening. Check browser device access, then turn the device on to retry."]
		}) : null,
		/* @__PURE__ */ Y(H, { ...M }),
		!a && /* @__PURE__ */ Y(f, {
			open: C,
			onClose: () => w(!1),
			title: "Call devices",
			children: /* @__PURE__ */ Y(B, {
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
				speakerSelectionSupported: _t(),
				onTestMic: k.testMic,
				onTestSound: k.testSound,
				testMicState: k.testMicState,
				...p === void 0 ? {} : { selfName: p }
			})
		})
	] });
}
function St(e) {
	function t(t) {
		return xt(e, t);
	}
	return t;
}
//#endregion
//#region src/integrations/realtime/IncomingCallToast.tsx
function Ct(e) {
	return e.kind === "knock" ? `${e.callerName} asks to join` : `${e.callerName} is calling`;
}
function wt({ ring: e, onAccept: n, onDecline: r, corner: a = "top-right", width: o = 360, className: c, "data-testid": l = "incoming-call-toast" }) {
	let u = e.kind === "knock";
	return /* @__PURE__ */ Y(k, {
		corner: a,
		width: o,
		"data-testid": l,
		...c ? { className: c } : {},
		children: /* @__PURE__ */ Y(d, {
			variant: "info",
			layout: "stacked",
			icon: /* @__PURE__ */ Y(s, { size: 16 }),
			title: Ct(e),
			action: /* @__PURE__ */ X(i, {
				gap: "sm",
				children: [/* @__PURE__ */ Y(t, {
					size: "sm",
					variant: "secondary",
					onClick: r,
					"data-testid": "incoming-call-decline",
					children: "Decline"
				}), /* @__PURE__ */ Y(t, {
					size: "sm",
					variant: "success",
					onClick: n,
					"data-testid": "incoming-call-accept",
					children: u ? "Let in" : "Accept"
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
function Tt(e) {
	if (!e || typeof e != "object") return null;
	let t = e;
	return typeof t.messageId != "string" || !t.messageId ? null : {
		messageId: t.messageId,
		author: $(t.author) ?? "Unknown",
		text: $(t.text) ?? "",
		...$(t.timestamp) ? { timestamp: t.timestamp } : {}
	};
}
function Et(e) {
	let t = e.metadata?.attachments, n = Array.isArray(t) ? t.filter((e) => !!e && typeof e == "object" && typeof e.url == "string" && typeof e.id == "string") : void 0, r;
	if (e.metadata) {
		let { replyTo: t, ...n } = e.metadata, i = { ...n }, a = Tt(t);
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
function Dt(e) {
	let t = /* @__PURE__ */ new Map();
	for (let n of e) {
		let e = $(n.metadata?.displayName);
		n.userId && e && !n.deletedAt && t.set(n.userId, e);
	}
	return e.map((e) => {
		let n = Et(e);
		return n.displayName || !e.deletedAt ? n : {
			...n,
			displayName: e.userId && t.get(e.userId) || "a removed member"
		};
	});
}
var Ot = (e) => $(e.detail);
function kt(e) {
	return e === "away" ? { idle: !0 } : e === "busy" ? { busy: !0 } : {};
}
function At(e, t = {}) {
	let n = e.metadata ?? {}, r = $(n.userId), i = (t.detail ?? Ot)(n, e.status);
	return {
		id: r || e.clientId,
		name: $(n.displayName) ?? e.clientId.slice(0, 12),
		avatarUrl: $(n.avatarUrl),
		online: e.status !== "offline",
		...kt(e.status),
		...i ? { detail: i } : {},
		status: e.status,
		metadata: n
	};
}
var jt = {
	busy: 3,
	online: 2,
	away: 1,
	offline: 0
};
function Mt(e, t = {}) {
	let n = /* @__PURE__ */ new Map(), r = t.keepOffline ? e : e.filter((e) => e.status !== "offline");
	for (let e of r) {
		let t = e.metadata ?? {}, r = $(t.userId) || e.clientId, i = Number.isFinite(e.lastHeartbeat) ? e.lastHeartbeat : 0, a = n.get(r);
		if (!a) {
			n.set(r, {
				id: r,
				name: $(t.displayName),
				avatarUrl: $(t.avatarUrl),
				fallbackName: e.clientId.slice(0, 12),
				status: e.status,
				metadata: { ...t },
				heartbeat: i
			});
			continue;
		}
		a.name ??= $(t.displayName), a.avatarUrl ??= $(t.avatarUrl), jt[e.status] > jt[a.status] && (a.status = e.status);
		let o = i >= a.heartbeat;
		for (let [e, n] of Object.entries(t)) n != null && n !== "" && (o || !(e in a.metadata)) && (a.metadata[e] = n);
		a.heartbeat = Math.max(a.heartbeat, i);
	}
	let i = t.detail ?? Ot;
	return [...n.values()].map((e) => {
		let t = i(e.metadata, e.status);
		return {
			id: e.id,
			name: e.name ?? e.fallbackName,
			avatarUrl: e.avatarUrl,
			online: e.status !== "offline",
			...kt(e.status),
			...t ? { detail: t } : {},
			status: e.status,
			metadata: e.metadata
		};
	});
}
var Nt = [
	15,
	25,
	35,
	45,
	55,
	65,
	75,
	85
], Pt = [
	20,
	35,
	50,
	65,
	80
];
function Ft(e, t) {
	let n = Nt[t % Nt.length] ?? 50, r = Pt[Math.floor(t / Nt.length) % Pt.length] ?? 50, i = e.position != null && typeof e.position == "object" ? e.position : null;
	return {
		id: e.id,
		emoji: e.emoji,
		x: i?.x ?? n,
		y: i?.y ?? r,
		timestamp: e.timestamp
	};
}
function It(e) {
	return e.map(Ft);
}
function Lt(e, t) {
	return (e.reactionsFor ? e.reactionsFor(t) : e.reactions.filter((e) => e.targetId === t)).map((e) => ({
		emoji: e.emoji,
		userId: e.userId ?? e.clientId,
		displayName: e.displayName
	}));
}
function Rt(e) {
	try {
		let t = Date.now() - new Date(e).getTime(), n = Math.floor(t / 1e3);
		return n < 60 ? "just now" : n < 3600 ? `${Math.floor(n / 60)}m ago` : n < 86400 ? `${Math.floor(n / 3600)}h ago` : e.slice(0, 10);
	} catch {
		return "";
	}
}
var zt = {
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
function Bt(e) {
	let t = e.detail;
	return typeof t.subject == "string" ? t.subject : typeof t.contentId == "string" ? t.contentId.slice(0, 12) : typeof t.roomId == "string" ? `room:${t.roomId.slice(0, 8)}` : typeof t.pipelineId == "string" ? `pipeline:${t.pipelineId}` : e.eventType;
}
function Vt(e, t) {
	return [
		e.eventType,
		e.timestamp,
		e.userId ?? e.displayName,
		t
	].join("|");
}
function Ht(e) {
	let t = e.detail?.text;
	return typeof t == "string" && t.trim() ? t.trim() : void 0;
}
function Ut(e) {
	let t = Ht(e);
	return t ? {
		id: Vt(e, t),
		actor: e.displayName,
		action: "",
		subject: t,
		ticketId: typeof e.detail.ticketId == "string" ? e.detail.ticketId : void 0,
		timeLabel: Rt(e.timestamp),
		kind: typeof e.detail.kind == "string" ? e.detail.kind : e.eventType.split(".")[0]
	} : {
		id: Vt(e, Bt(e)),
		actor: e.displayName,
		action: zt[e.eventType] ?? e.eventType.split(".").pop() ?? "did",
		subject: Bt(e),
		ticketId: typeof e.detail.ticketId == "string" ? e.detail.ticketId : void 0,
		timeLabel: Rt(e.timestamp),
		kind: e.eventType.split(".")[0]
	};
}
function Wt(e) {
	let t = (e) => typeof e.detail?.seq == "number" ? e.detail.seq : 0;
	return e.map((e, t) => ({
		event: e,
		index: t,
		at: Date.parse(e.timestamp)
	})).sort((e, n) => (Number.isNaN(n.at) ? 0 : n.at) - (Number.isNaN(e.at) ? 0 : e.at) || t(n.event) - t(e.event) || e.index - n.index).map(({ event: e }) => e);
}
function Gt(e) {
	let t = /* @__PURE__ */ new Map();
	return e.map((e) => {
		let n = Ut(e), r = t.get(n.id) ?? 0;
		return t.set(n.id, r + 1), r === 0 ? n : {
			...n,
			id: `${n.id}#${r}`
		};
	});
}
function Kt(e) {
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
function qt(e) {
	return e.map(Kt);
}
function Jt(e, t, n) {
	return {
		id: e.clientId,
		displayName: e.displayName || e.clientId.slice(0, 12),
		isMuted: !e.audioOn,
		isLocal: t == null ? void 0 : e.clientId === t,
		...n ? { avatarUrl: n } : {}
	};
}
function Yt(e, t, n) {
	return e.map((e) => Jt(e, t, n?.[e.clientId]));
}
function Xt(e) {
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
function Zt(e) {
	return e.map(Xt);
}
function Qt(e) {
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
function $t({ chat: e, localMessages: t, presence: n, upload: r, reactions: i, pins: a, currentActor: o, currentUserId: s, displayName: c, avatarUrl: l, sendMetadata: u, publishTyping: d, attachmentSrc: f, onOpenAttachment: p, acceptFiles: m, maxFileSize: h, onFileError: g, disabled: _, typingUsers: v, tone: y, fill: b, flushComposer: x, contentAlign: S, showHeader: C, loadMoreHistory: T = !1, joinHistoryLimit: E = 20, historyPageSize: D = 50, onLoadMore: O, hasMore: k, loadingMore: A, composer: j, renderMessageReferences: M, transformMessages: N, dock: P, emojis: ee, onReply: F, reply: te, onCancelReply: ne, readReceipts: re, readReceiptsEnabled: I, unreadFrom: ie, threaded: L, postRhythm: R, onJumpToMessage: ae, highlightedMessageId: oe, documentEditors: z, callParticipants: se, onJoinCall: B, onOpenDocument: ce, wrapWithNetworkShim: le, editable: ue = !0, canEdit: V, canDelete: de, onForwardMessage: fe }) {
	let H = G(() => Dt(e.messages), [e.messages]), pe = G(() => {
		if (!t?.length) return [];
		let e = new Set(H.flatMap((e) => e.id ? [e.id] : [])), n = /* @__PURE__ */ new Set(), r = [];
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
	}, [H, t]), me = G(() => {
		let e = H;
		if (!t?.length) return e;
		let n = new Set(e.flatMap((e) => e.id ? [e.id] : [])), r = t.filter((e) => e.body === void 0 && (!e.id || !n.has(e.id)));
		return r.length === 0 ? e : [...e, ...r].map((e, t) => ({
			m: e,
			i: t
		})).sort((e, t) => Date.parse(e.m.timestamp) - Date.parse(t.m.timestamp) || e.i - t.i).map(({ m: e }) => e);
	}, [H, t]), he = v ?? n?.roster.filter((e) => {
		if (e.metadata?.isTyping !== !0) return !1;
		let t = e.metadata?.userId;
		return s && typeof t == "string" ? t !== s : !o || e.clientId !== o;
	}).map((e) => e.metadata?.displayName ?? e.clientId.slice(0, 8)) ?? [], ge = e.sendMessage, _e = U((e) => {
		let t = { ...u ?? {} };
		c && (t.displayName = c), l && (t.avatarUrl = l), Object.keys(t).length > 0 ? ge(e, t) : ge(e);
	}, [
		ge,
		u,
		c,
		l
	]), ve = n?.updateMetadata, ye = (d ?? !0) && !!ve, be = U((e) => ve?.({ isTyping: e }), [ve]), xe = e.loadHistory, [Se, X] = q(E), [Ce, we] = q(!1), Z = e.messages.length, Te = K(Z);
	W(() => {
		Z !== Te.current && (Te.current = Z, we(!1));
	}, [Z]);
	let Ee = K(Se);
	Ee.current = Se;
	let De = U(() => {
		let e = Ee.current + D;
		Ee.current = e, X(e), we(!0), xe(e);
	}, [xe, D]), Oe = O ? {
		onLoadMore: O,
		hasMore: k,
		loadingMore: A
	} : T ? {
		onLoadMore: De,
		hasMore: k ?? Z >= Se,
		loadingMore: A ?? Ce
	} : {}, ke = G(() => i ? (e) => Lt(i, e) : void 0, [i]), Ae = G(() => {
		if (!i || !s) return;
		let { toggle: e, react: t, unreact: n } = i;
		return e ? (t, n) => e(n, {
			targetId: t,
			userId: s
		}) : (e, r) => {
			Lt(i, e).some((e) => e.emoji === r && e.userId === s) && n ? n(r, { targetId: e }) : t(r, { targetId: e });
		};
	}, [i, s]), je = U((e) => {
		if (!a) return;
		let t = e.id ?? "";
		t && (a.pinnedIds.has(t) ? a.unpin(t) : a.pin({
			messageId: t,
			text: e.content,
			author: e.displayName ?? "Unknown"
		}));
	}, [a]), Me = e.editMessage, Ne = e.deleteMessage, Fe = U((e, t) => {
		let n = t.trim();
		if (!e.id || !n) return;
		let r = `<p>${n.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br>")}</p>`;
		Me?.(e.id, n, { html: r });
	}, [Me]), Ie = U((e) => {
		e.id && Ne?.(e.id);
	}, [Ne]), Q = /* @__PURE__ */ Y(w, {
		messages: N ? N(me) : me,
		...pe.length ? { localMessages: pe } : {},
		...P === void 0 ? {} : { dock: P },
		onSend: _e,
		disabled: _,
		typingUsers: he,
		tone: y,
		fill: b,
		flushComposer: x,
		contentAlign: S,
		showHeader: C,
		composer: j,
		emojis: ee,
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
			...V ? { canEditMessage: V } : {}
		} : {},
		...ue && Ne ? {
			onDeleteMessage: Ie,
			...de ? { canDeleteMessage: de } : {}
		} : {},
		onForwardMessage: fe,
		onReply: F,
		reply: te,
		onCancelReply: ne,
		readReceipts: re,
		readReceiptsEnabled: I,
		unreadFrom: ie,
		threaded: L,
		...R ? { postRhythm: R } : {},
		onJumpToMessage: ae,
		highlightedMessageId: oe,
		documentEditors: z,
		callParticipants: se,
		onJoinCall: B,
		onOpenDocument: ce,
		renderMessageReferences: M,
		attachmentSrc: f,
		onOpenAttachment: p,
		acceptFiles: m,
		maxFileSize: h,
		onFileError: g
	});
	return /* @__PURE__ */ Y(J, { children: Pe(Q, le) });
}
//#endregion
//#region src/integrations/realtime-modules/WrappedPresencePanel.tsx
var en = {
	typing: 4,
	online: 3,
	away: 2,
	busy: 1,
	offline: 0
};
function tn(e) {
	return en[e] ?? 2.5;
}
function nn(e, t) {
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
			let n = tn(t.status) - tn(e.status);
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
function rn({ presence: e, currentClientId: t, perConnection: n = !1, wrapWithNetworkShim: r }) {
	let i = G(() => n ? e.roster.map((e) => ({
		clientId: e.clientId,
		status: e.status,
		metadata: e.metadata
	})) : nn(e.roster, t), [
		e.roster,
		t,
		n
	]);
	return /* @__PURE__ */ Y(J, { children: Pe(/* @__PURE__ */ Y(ie, {
		users: i,
		currentClientId: t
	}), r) });
}
//#endregion
//#region src/integrations/realtime-modules/WrappedActivityPanel.tsx
var an = 50;
function on({ activity: e, mode: t = "ticker", lines: n = 50, visibleCount: r, rotateMs: i, staggerMs: a, kindColors: o, className: s, "data-testid": c }) {
	let l = t === "history", u = Math.max(0, Math.floor(n)), d = G(() => Gt(l ? Wt(e.events).slice(0, u) : e.events), [
		e.events,
		l,
		u
	]);
	return /* @__PURE__ */ Y(F, {
		items: d,
		visibleCount: l ? Math.max(1, d.length) : r,
		rotateMs: l ? 0 : i,
		staggerMs: l ? 0 : a,
		kindColors: o,
		className: s,
		"data-activity-mode": t,
		...c ? { "data-testid": c } : {}
	});
}
//#endregion
//#region src/components/collaboration/CursorOverlay.tsx
function sn({ cursors: t, coordinates: n = "pixels", onMove: r, children: i, className: a }) {
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
				let t = e.label ?? e.clientId, n = e.color ?? C(t);
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
						children: e.label ? e.label : S(e.clientId)
					})]
				}, e.clientId);
			})
		})]
	});
}
//#endregion
//#region src/integrations/realtime-modules/WrappedCursorOverlay.tsx
function cn({ cursor: e, coordinates: t = "fraction", publish: n = !0, selfClientId: r, children: i, className: a }) {
	let o = G(() => Qt(e.cursors).filter((e) => e.clientId !== r), [e.cursors, r]), s = e.move;
	return /* @__PURE__ */ Y(sn, {
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
function ln({ reactions: e, ttlMs: t = 2500 }) {
	let [n, r] = q([]), i = e.reactions, a = K(/* @__PURE__ */ new Map());
	return W(() => {
		if (i.length === 0) return;
		let e = i[i.length - 1], n = Ft(e, i.length - 1), o = a.current;
		o.has(n.id) || (r((e) => e.some((e) => e.id === n.id) ? e : [...e, n]), o.set(n.id, setTimeout(() => {
			o.delete(n.id), r((e) => e.filter((e) => e.id !== n.id));
		}, t)));
	}, [i, t]), W(() => {
		let e = a.current;
		return () => {
			e.forEach((e) => clearTimeout(e)), e.clear();
		};
	}, []), /* @__PURE__ */ Y(te, { reactions: n });
}
//#endregion
//#region src/integrations/realtime-modules/WrappedFileUploadDrop.tsx
function un({ fileUpload: e, accept: t, maxSize: n, multiple: r, disabled: i, label: a, className: o, uploadMetadata: s, onError: c }) {
	let l = qt(e.uploads);
	function u(t) {
		for (let n of t) e.upload(n, s ? { metadata: s } : void 0).catch((e) => {
			let t = e instanceof Error ? e.message : "Upload failed";
			c?.(t);
		});
	}
	return /* @__PURE__ */ X("div", { children: [/* @__PURE__ */ Y(ee, {
		accept: t,
		maxSize: n,
		multiple: r,
		disabled: i,
		label: a,
		className: o,
		onFiles: u,
		onError: c
	}), l.length > 0 && /* @__PURE__ */ Y(dn, {
		summaries: l,
		onDismiss: () => e.removeCompleted()
	})] });
}
function dn({ summaries: e, onDismiss: t }) {
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
					className: `text-xs font-semibold ${fn(e.status)}`,
					children: e.status === "uploading" ? `${e.progress}%` : e.status
				}),
				(e.status === "completed" || e.status === "clean") && e.downloadUrl && /* @__PURE__ */ Y("a", {
					href: n(e.downloadUrl) ?? void 0,
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
function fn(e) {
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
function pn({ hangout: e, localClientId: t, videoElements: n, mode: r, spotlightContent: i, activeSpeakerId: a, speakerHysteresisMs: o, onParticipantClick: s, className: c }) {
	let l = Yt(e.participants, t), u = t == null ? null : l.find((e) => e.id === t) ?? null, d = t == null ? l : l.filter((e) => e.id !== t);
	function f(e) {
		return n ? e.map((e) => ({
			...e,
			videoElement: n[e.id] ?? e.videoElement
		})) : e;
	}
	return /* @__PURE__ */ Y(ce, {
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
function mn({ notifications: e, onItemClick: t, ...n }) {
	let r = Zt(e.notifications);
	return /* @__PURE__ */ Y(M, {
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
function hn({ notifications: e, onItemClick: t, unreadCount: n, ...r }) {
	let i = Zt(e.notifications);
	return /* @__PURE__ */ Y(j, {
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
function gn({ socket: e, ...t }) {
	return /* @__PURE__ */ Y(O, {
		state: e.connectionState,
		...t
	});
}
//#endregion
//#region src/integrations/realtime-modules/CapabilityBoundary.tsx
function _n({ capability: e, loading: t, fallback: n, children: r }) {
	return e.isLoading ? /* @__PURE__ */ Y(J, { children: t ?? null }) : e.enabled ? /* @__PURE__ */ Y(J, { children: r }) : /* @__PURE__ */ Y(J, { children: n ?? null });
}
//#endregion
//#region src/integrations/realtime-modules/WrappedMediaEffectsTray.tsx
function vn({ controller: e, ...t }) {
	return /* @__PURE__ */ Y(pe, {
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
function yn({ open: e, controller: t, onClose: n, onApplied: r, ...i }) {
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
	return /* @__PURE__ */ Y(se, {
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
function bn(e) {
	let t = e.draft;
	if (!t) return 0;
	let n = 0;
	return t.filterId !== e.filterId && n++, (t.backgroundMode !== e.backgroundMode || t.backgroundMode === "image" && t.backgroundImageUrl !== e.backgroundImageUrl) && n++, t.faceSpriteId !== e.faceSpriteId && n++, n;
}
//#endregion
//#region src/integrations/realtime-modules/WrappedCanvasDocument.tsx
function xn({ canvas: e, schema: t, legacyModel: n, beforeConvert: r, ...i }) {
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
function Sn({ devices: e, settings: t, cameraOn: n, ...r }) {
	return /* @__PURE__ */ Y(B, {
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
function Cn(e) {
	return new Map(e.map((e, t) => [e.userId, t + 1]));
}
function wn(e, t) {
	let n = Cn(t.hands);
	return e.map((e) => ({
		...e,
		handRaised: n.get(e.id)
	}));
}
function Tn(e, t) {
	let n = Cn(e.hands);
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
function En(e, t, n = []) {
	let r = new Map(t.map((e) => [e.userId, e])), i = Cn(n), a = (e) => {
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
function Dn(e) {
	return Array.from({ length: e }, (e, t) => ({ name: `Room ${t + 1}` }));
}
function On({ meeting: e, people: t, roomNames: n, renderError: r, ...i }) {
	let { rooms: a, unassigned: o } = En(e.breakout, t, e.hands), s = e.breakout;
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
			let i = n?.(t) ?? Dn(t).map((e) => e.name);
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
		notice: e.error ? r?.(e.error) ?? /* @__PURE__ */ Y(d, {
			variant: "error",
			className: "mx-3 mt-2",
			"data-testid": "breakout-error",
			children: e.error.message
		}) : null
	});
}
function kn({ meeting: e, className: t }) {
	if (!e.myRoom) return null;
	let n = e.breakout;
	return /* @__PURE__ */ Y(le, {
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
function An(e, t) {
	let n = e.myHandPosition !== null, r = t.onReact, { people: i, chat: a } = t;
	return {
		...a ? { chat: {
			id: "chat",
			label: "Chat",
			icon: /* @__PURE__ */ Y(c, {}),
			active: a.open,
			onClick: a.onToggle,
			badge: a.unread || void 0
		} } : {},
		...i ? { people: {
			id: "people",
			label: "People",
			icon: /* @__PURE__ */ Y(l, {}),
			count: i.count,
			active: i.open,
			onClick: i.onToggle,
			badge: e.isOrganizer && e.hands.length > 0 ? e.hands.length : void 0
		} } : {},
		...r ? { react: {
			id: "react",
			label: "React",
			icon: /* @__PURE__ */ Y(ue, {}),
			popoverLabel: "Send a reaction",
			popover: (e) => /* @__PURE__ */ Y(ae, {
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
			icon: /* @__PURE__ */ Y(R, {}),
			...e.myHandPosition === null ? {} : { count: e.myHandPosition },
			pressed: n,
			onClick: e.toggleHand,
			disabled: !e.ready
		},
		rooms: {
			id: "rooms",
			label: "Rooms",
			icon: /* @__PURE__ */ Y(z, {}),
			active: t.roomsOpen,
			onClick: t.onToggleRooms,
			disabled: !e.ready,
			badge: e.breakout.phase === "open" && !e.myRoom && e.breakout.mode === "self-select" ? e.breakout.rooms.filter((e) => e.state === "open").length : void 0
		}
	};
}
function jn(e) {
	return e.myRoom ? `${e.myRoom.name} chat` : "Meeting chat";
}
function Mn({ roomName: e }) {
	return /* @__PURE__ */ X("div", {
		className: "flex items-center gap-2 border-t border-border px-3 py-1.5",
		role: "status",
		"aria-live": "polite",
		"data-testid": "meeting-chat-context",
		children: [
			/* @__PURE__ */ Y(z, {
				size: 14,
				"aria-hidden": !0,
				className: "shrink-0 text-text-secondary"
			}),
			/* @__PURE__ */ X(a, {
				size: "xs",
				weight: "semibold",
				className: "shrink-0 whitespace-nowrap",
				children: [e, " chat"]
			}),
			/* @__PURE__ */ X(a, {
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
function Nn({ value: e, onChange: t }) {
	return /* @__PURE__ */ X("div", {
		className: "flex items-center gap-2 border-t border-border px-3 py-1.5",
		"data-testid": "meeting-chat-target",
		children: [
			/* @__PURE__ */ Y(a, {
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
			e === "rooms" && /* @__PURE__ */ Y(a, {
				size: "xs",
				tone: "tertiary",
				children: "Every room sees this as an announcement."
			})
		]
	});
}
var Pn = "meeting-announcement:";
function Fn(e, t) {
	let [n, r] = q("chat"), [i, o] = q([]), s = e.breakout.announcement, c = e.breakout.announcements, l = (e) => `${e.at}|${e.fromUserId}`, u = [s ? l(s) : "", ...(c ?? []).map(l)].join(",");
	W(() => {
		let e = [...c ?? [], ...s ? [s] : []];
		e.length !== 0 && o((t) => {
			let n = new Set(t.map(l)), r = e.filter((e) => !n.has(l(e)) && n.add(l(e)));
			return r.length === 0 ? t : [...t, ...r].sort((e, t) => Date.parse(e.at) - Date.parse(t.at)).slice(-50);
		});
	}, [u]);
	let d = e.ready && e.isOrganizer && e.breakout.phase === "open", f = d ? n : "chat", p = t.announcementNote ?? "Announcement to every room", m = G(() => i.map((e) => ({
		id: `${Pn}${e.at}:${e.fromUserId}`,
		clientId: "meeting",
		userId: e.fromUserId,
		displayName: e.fromDisplayName,
		content: e.message,
		timestamp: e.at
	})), [i]), h = t.renderMessageReferences, g = G(() => i.map((e) => ({
		id: `${Pn}${e.at}:${e.fromUserId}`,
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
		renderMessageReferences: (e) => e.id?.startsWith(Pn) ? /* @__PURE__ */ Y(a, {
			as: "p",
			size: "xs",
			tone: "secondary",
			"data-testid": "meeting-chat-announcement-note",
			children: p
		}) : h?.(e) ?? null,
		title: jn(e),
		dock: e.myRoom || d ? /* @__PURE__ */ X(J, { children: [e.myRoom && /* @__PURE__ */ Y(Mn, { roomName: e.myRoom.name }), d && /* @__PURE__ */ Y(Nn, {
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
export { ut as $, Ut as A, Zt as B, un as C, De as Ct, on as D, an as E, qt as F, Wt as G, Mt as H, Jt as I, St as J, wt as K, Yt as L, Et as M, Dt as N, rn as O, Kt as P, dt as Q, Lt as R, pn as S, ke as St, cn as T, Ft as U, At as V, It as W, mt as X, ht as Y, ft as Z, vn as _, Fe as _t, En as a, ot as at, hn as b, Me as bt, Cn as c, Ue as ct, Fn as d, Ge as dt, st as et, wn as f, Q as ft, bn as g, Ve as gt, yn as h, ze as ht, On as i, tt as it, Gt as j, $t as k, Tn as l, qe as lt, xn as m, Le as mt, Nn as n, ct as nt, Dn as o, $e as ot, Sn as p, He as pt, Ct as q, kn as r, at as rt, jn as s, Xe as st, Mn as t, lt as tt, An as u, We as ut, _n as v, Pe as vt, ln as w, we as wt, mn as x, Ae as xt, gn as y, Ne as yt, Xt as z };
