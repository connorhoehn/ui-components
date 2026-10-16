import { t as e } from "./cn-D4QmbyEy.js";
import { n as t } from "./Button-uREUOWUk.js";
import { t as n } from "./IconButton-IE5g44md.js";
import { Q as r } from "./Icons-GSE-QGuJ.js";
import { c as i, l as a } from "./Text-4BIlhd_-.js";
import { t as o } from "./Badge-B51Hl2wN.js";
import { t as s } from "./Banner-CU6GChN-.js";
import { t as c } from "./Modal-CEiWhFnj.js";
import { t as l } from "./ConfirmDialog-CKsotSAg.js";
import { t as u } from "./EmptyState-CpS13Gy4.js";
import { n as d } from "./ThinkingDots-mZ3dq0w9.js";
import { n as f } from "./StatusPill-CLkB5jFS.js";
import { t as p } from "./SkeletonCard-D3FL0TB7.js";
import { n as m } from "./Slider-DEbQCKD1.js";
import { t as h } from "./Avatar-CpUrJRJP.js";
import { t as g } from "./InlineAlert-CBtteaVZ.js";
import { n as _, r as v, t as y } from "./NotificationBell-BfnDXG_9.js";
import { t as b } from "./PresenceAvatars-CxgG8QFo.js";
import { t as x } from "./FileUploadDrop-DrckU_7j.js";
import { t as S } from "./ActivityFeed-Cp6MhNab.js";
import { a as C, i as w, n as T, o as E } from "./DockedAside-BDA5tJ1T.js";
import { d as ee, dt as D, lt as O, n as k, t as A, u as j, ut as M } from "./ConversationSurface-Cj3TMoE4.js";
import { E as N, G as P, R as te, T as ne, Y as re, _ as ie, i as F, k as ae, n as I, q as L, s as oe, t as se, w as ce, x as le, y as R } from "./BreakoutRoomsPanel-t-XNlFku.js";
import { t as ue } from "./useActiveSpeaker-BGKJU3Lb.js";
import { c as de, o as fe, s as z } from "./useDocumentImageUpload-3W74XPh6.js";
import { Component as pe, createContext as me, createElement as he, useCallback as B, useContext as V, useEffect as H, useMemo as U, useRef as W, useState as G } from "react";
import { Fragment as K, jsx as q, jsxs as J } from "react/jsx-runtime";
import * as Y from "yjs";
//#region src/integrations/realtime/HangoutRoomRow.tsx
function ge(e) {
	function t(t) {
		return _e(e, t);
	}
	return t;
}
function _e(e, { slug: t, name: n, participantId: r, occupancy: i, subscribeRoomsIndex: a, onClick: s, onContextMenu: c, onOpenConversation: l, kebab: u, className: d, "data-testid": f = "room-row" }) {
	let p = e.useRoomOccupancy(a ? t : null, { subscribeRoomsIndex: a }), m = a ? p.occupancy ?? null : i ?? null, h = m?.count ?? 0, g = m?.members ?? [], _ = U(() => r ? g.some((e) => e.participantId === r) : !1, [g, r]), v = _, y = U(() => g.slice(0, 3).map((e) => ({
		id: e.participantId,
		name: e.displayName || e.userId,
		online: !0
	})), [g]), x = null;
	h > 1 ? x = /* @__PURE__ */ J(K, { children: [/* @__PURE__ */ q(b, {
		users: y,
		maxVisible: 3,
		size: 18
	}), /* @__PURE__ */ q(o, {
		variant: "count",
		value: h,
		color: "muted"
	})] }) : h === 1 && _ ? x = /* @__PURE__ */ q(o, {
		variant: "pulse",
		color: "accent",
		"aria-label": "Just you in this room",
		"data-testid": `${f}-self-pulse`
	}) : h === 1 && (x = /* @__PURE__ */ J(K, { children: [/* @__PURE__ */ q(b, {
		users: y,
		maxVisible: 1,
		size: 18
	}), /* @__PURE__ */ q(o, {
		variant: "count",
		value: 1,
		color: "muted"
	})] }));
	let S = l ? /* @__PURE__ */ q("button", {
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
	return /* @__PURE__ */ q(C, {
		"data-testid": f,
		icon: /* @__PURE__ */ q("span", {
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
var ve = 3, X = 48;
function ye(e) {
	return e.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 48);
}
function be(e) {
	let t = e.trim();
	return t.length === 0 ? "Name is required." : t.length < ve ? `Name must be at least ${ve} characters.` : t.length > X ? `Name must be at most ${X} characters.` : null;
}
function xe({ open: e, onClose: n, onCreate: r, onCreated: i, defaultVisibility: a }) {
	let [o, s] = G(""), [l, u] = G(""), [d, f] = G(!1), [p, h] = G(!1), [g, _] = G(!1), [v, y] = G(null);
	H(() => {
		e && (s(""), u(""), f(!1), h(!1), _(!1), y(null));
	}, [e]);
	let b = U(() => be(o), [o]), x = U(() => ye(o), [o]), S = !b && !g;
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
	return /* @__PURE__ */ q(c, {
		open: e,
		onClose: g ? () => {} : n,
		title: "New room",
		maxWidth: 440,
		rawChildren: !0,
		backdropTestId: "new-hangout-room-dialog",
		footer: null,
		children: /* @__PURE__ */ J("form", {
			onSubmit: C,
			className: "flex flex-col gap-4",
			children: [
				/* @__PURE__ */ J("label", {
					className: "flex flex-col gap-1",
					children: [
						/* @__PURE__ */ q("span", {
							className: "text-[12px] font-semibold text-text-primary",
							children: "Name"
						}),
						/* @__PURE__ */ q("input", {
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
						/* @__PURE__ */ J("div", {
							className: "flex items-center justify-between text-[11px] text-text-tertiary",
							children: [/* @__PURE__ */ q("span", {
								"data-testid": "new-hangout-room-slug-preview",
								children: x ? `#${x}` : "Slug preview appears here"
							}), /* @__PURE__ */ q("span", { children: `${o.trim().length}/${X}` })]
						}),
						b && o.length > 0 && /* @__PURE__ */ q("span", {
							"data-testid": "new-hangout-room-name-error",
							className: "text-[11px] text-danger-fg",
							children: b
						})
					]
				}),
				/* @__PURE__ */ J("label", {
					className: "flex flex-col gap-1",
					children: [/* @__PURE__ */ J("span", {
						className: "text-[12px] font-semibold text-text-primary",
						children: ["Description ", /* @__PURE__ */ q("span", {
							className: "font-normal text-text-tertiary",
							children: "(optional)"
						})]
					}), /* @__PURE__ */ q("textarea", {
						"data-testid": "new-hangout-room-description",
						value: l,
						onChange: (e) => u(e.target.value),
						placeholder: "What's this room for?",
						rows: 2,
						disabled: g,
						className: "w-full px-3 py-2 text-sm border border-border-emphasis rounded-md focus:outline-none focus:ring-2 focus:ring-info resize-none"
					})]
				}),
				/* @__PURE__ */ J("div", {
					className: "flex flex-col gap-3",
					children: [/* @__PURE__ */ J("label", {
						className: "flex items-center justify-between gap-3",
						children: [/* @__PURE__ */ J("span", {
							className: "flex flex-col",
							children: [/* @__PURE__ */ q("span", {
								className: "text-[13px] font-semibold text-text-primary",
								children: "Audio only"
							}), /* @__PURE__ */ q("span", {
								className: "text-[11px] text-text-tertiary",
								children: "Skip video tracks — voice-only room."
							})]
						}), /* @__PURE__ */ q(m, {
							checked: d,
							onChange: f,
							disabled: g,
							"aria-label": "Audio only",
							"data-testid": "new-hangout-room-audio-only"
						})]
					}), /* @__PURE__ */ J("label", {
						className: "flex items-center justify-between gap-3",
						children: [/* @__PURE__ */ J("span", {
							className: "flex flex-col",
							children: [/* @__PURE__ */ q("span", {
								className: "text-[13px] font-semibold text-text-primary",
								children: "Recording enabled"
							}), /* @__PURE__ */ q("span", {
								className: "text-[11px] text-text-tertiary",
								children: "Allow server-side recording of sessions."
							})]
						}), /* @__PURE__ */ q(m, {
							checked: p,
							onChange: h,
							disabled: g,
							"aria-label": "Recording enabled",
							"data-testid": "new-hangout-room-recording"
						})]
					})]
				}),
				v && /* @__PURE__ */ q("div", {
					"data-testid": "new-hangout-room-error",
					role: "alert",
					className: "text-[12px] text-danger-fg bg-danger-bg border border-danger-border rounded-md px-3 py-2",
					children: v
				}),
				/* @__PURE__ */ J("div", {
					className: "flex justify-end gap-2 pt-1",
					children: [/* @__PURE__ */ q(t, {
						type: "button",
						variant: "ghost",
						onClick: n,
						disabled: g,
						children: "Cancel"
					}), /* @__PURE__ */ q(t, {
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
		return Se(e, t);
	}
	return t;
}
function Se(e, { rooms: r, occupancyFor: i, occupancyAdapter: a, participantId: o, onJoinRoom: s, onOpenConversation: c, onContextMenu: l, onBrowseAll: d, maxVisible: f = 10, title: p = "Rooms", storageKey: m, collapsed: h = !1, onToggleCollapse: g, renderCreateDialog: _ }) {
	let [v, y] = G(!1), b = () => y(!0), x = () => y(!1), S = U(() => {
		let e = /* @__PURE__ */ new Set(), t = [];
		for (let n of r.rooms) n.state === "active" && (e.has(n.slug) || (e.add(n.slug), t.push(n)));
		return t;
	}, [r.rooms]), w = U(() => S.slice(0, f), [S, f]), T = S.length - w.length, ee = /* @__PURE__ */ q(n, {
		"aria-label": "New room",
		size: "sm",
		onClick: b,
		icon: /* @__PURE__ */ q("span", {
			"aria-hidden": "true",
			className: "text-[14px] leading-none font-bold",
			children: "+"
		}),
		"data-testid": "new-room-button"
	}), D = g !== void 0, k = /* @__PURE__ */ J(K, { children: [
		r.isLoading && /* @__PURE__ */ q("div", {
			className: "flex flex-col gap-1 px-1 py-1",
			"data-testid": "hangout-rooms-loading",
			children: [
				0,
				1,
				2
			].map((e) => /* @__PURE__ */ q("div", {
				"aria-hidden": "true",
				className: "h-7 rounded-md bg-surface-hover animate-pulse"
			}, e))
		}),
		!r.isLoading && r.error && /* @__PURE__ */ J("div", {
			role: "alert",
			"data-testid": "hangout-rooms-error",
			className: "mx-1 my-1 px-3 py-2 text-[12px] text-danger-fg bg-danger-bg border border-danger-border rounded-md flex items-center justify-between gap-2",
			children: [/* @__PURE__ */ q("span", {
				className: "truncate",
				children: "Couldn't load rooms."
			}), /* @__PURE__ */ q("button", {
				type: "button",
				onClick: () => void r.refetch(),
				className: "text-danger-fg underline hover:text-danger-fg cursor-pointer",
				children: "Retry"
			})]
		}),
		!r.isLoading && !r.error && S.length === 0 && /* @__PURE__ */ q(u, {
			testId: "hangout-rooms-empty",
			title: "No rooms yet",
			description: "Create one to start an ongoing hangout.",
			action: /* @__PURE__ */ q(t, {
				onClick: b,
				variant: "primary",
				size: "sm",
				children: "Create room"
			})
		}),
		!r.isLoading && !r.error && S.length > 0 && /* @__PURE__ */ J("div", {
			className: "flex flex-col gap-0.5",
			children: [w.map((t) => /* @__PURE__ */ q(e, {
				slug: t.slug,
				name: t.name,
				participantId: o,
				subscribeRoomsIndex: a,
				occupancy: a ? null : i?.(t.slug) ?? null,
				onClick: s ? () => s(t) : void 0,
				onOpenConversation: c ? () => c(t) : void 0,
				onContextMenu: l ? (e) => l(t, e) : void 0
			}, t.slug)), T > 0 && d && /* @__PURE__ */ q(C, {
				"data-testid": "hangout-rooms-browse-all",
				label: /* @__PURE__ */ J("span", {
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
	] });
	return /* @__PURE__ */ J(K, { children: [D ? /* @__PURE__ */ J("div", {
		"data-testid": "rooms-section",
		"data-collapsed": h ? "true" : "false",
		className: "flex flex-col",
		children: [/* @__PURE__ */ q(O, {
			label: p,
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
		}), !h && k]
	}) : /* @__PURE__ */ q(E, {
		title: p,
		storageKey: m,
		actions: ee,
		"data-testid": "rooms-section",
		children: k
	}), _ ? _({
		open: v,
		onClose: x
	}) : /* @__PURE__ */ q(xe, {
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
var Ce = class extends pe {
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
		return t ? t(e, this.reset) : /* @__PURE__ */ q("div", {
			"data-testid": "network-error-boundary-fallback",
			children: /* @__PURE__ */ q(u, {
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
function we({ connectionState: t, children: n, onRetry: r, reconnectingLabel: i, disconnectedTitle: a = "Disconnected", disconnectedDescription: o = "The connection to the server was lost. Check your network and try again.", retryLabel: s = "Try again", connectingPlaceholder: c, disconnectedFallback: l, className: d }) {
	return t === "connecting" ? /* @__PURE__ */ q("div", {
		"data-testid": "reconnecting-shim-connecting",
		className: d,
		children: c ?? /* @__PURE__ */ q(p, { height: 120 })
	}) : t === "disconnected" ? /* @__PURE__ */ q("div", {
		"data-testid": "reconnecting-shim-disconnected",
		className: d,
		children: l ?? /* @__PURE__ */ q(u, {
			icon: "📡",
			title: a,
			description: o,
			actionLabel: r ? s : void 0,
			onAction: r
		})
	}) : t === "reconnecting" ? /* @__PURE__ */ J("div", {
		"data-testid": "reconnecting-shim-reconnecting",
		className: e("relative", d),
		children: [/* @__PURE__ */ q("div", {
			className: "opacity-60 pointer-events-none",
			children: n
		}), /* @__PURE__ */ q(ce, {
			show: !0,
			label: i
		})]
	}) : /* @__PURE__ */ q("div", {
		"data-testid": "reconnecting-shim-connected",
		className: d,
		children: n
	});
}
//#endregion
//#region src/integrations/realtime-modules/networkShim.tsx
function Te(e, t) {
	return t ? /* @__PURE__ */ q(Ce, {
		title: t.errorTitle,
		description: t.errorDescription,
		retryLabel: t.retryLabel,
		onRetry: t.onRetry,
		onError: t.onError,
		fallback: t.errorFallback,
		children: /* @__PURE__ */ q(we, {
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
function Ee(e) {
	function t(t) {
		return De(e, t);
	}
	return t;
}
function De(e, { hangoutRooms: t, subscribeRoomsIndex: n, occupancyFor: r, participantId: i, onJoin: a, onContextMenu: o, onBrowseAll: s, maxVisible: c, title: l, storageKey: u, renderEmpty: d, collapsed: f, onToggleCollapse: p, renderCreateDialog: m, wrapWithNetworkShim: h }) {
	return t.rooms.filter((e) => e.state === "active").length === 0 && !t.isLoading && !t.error && d ? /* @__PURE__ */ q("div", {
		"data-testid": "wrapped-hangout-rooms-empty-slot",
		children: d
	}) : /* @__PURE__ */ q(K, { children: Te(/* @__PURE__ */ q(e, {
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
], Oe = {
	chat: !0,
	presence: !0
}, ke = me(null);
function Ae(e) {
	function t(t) {
		return je(e, t);
	}
	return t;
}
function je(e, { capabilities: t = Oe, channel: n, children: r }) {
	let i = U(() => Q.filter((e) => t[e] === !0), [t]), { enabled: a, isLoading: o } = e.useCapabilities(i, n), s = U(() => {
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
	return /* @__PURE__ */ q(ke.Provider, {
		value: s,
		children: r
	});
}
function Me() {
	return V(ke) ?? {
		can: Object.fromEntries(Q.map((e) => [e, !1])),
		declared: Object.fromEntries(Q.map((e) => [e, !1])),
		provisioned: Object.fromEntries(Q.map((e) => [e, !1])),
		isLoading: !1
	};
}
function Ne({ need: e, children: t, fallback: n = null }) {
	let { can: r } = Me(), i = (Array.isArray(e) ? e : [e]).every((e) => r[e]);
	return /* @__PURE__ */ q(K, { children: i ? t : n });
}
//#endregion
//#region src/integrations/realtime/WrappedConversationSurface.tsx
var Pe = {
	files: "conversation.files",
	documents: "conversation.documents",
	pins: "conversation.pins",
	mentions: "conversation.mentions",
	calls: "conversation.calls"
};
function Fe(e = A, t = {}) {
	return e.filter((e) => e !== "chat" && e !== "members").map((e) => t[e] ?? Pe[e]);
}
function Ie(e) {
	return (t) => Le(e, t);
}
function Le(e, t) {
	let { channel: n = null, hasDocuments: r = !0, from: i = A } = t;
	return i.filter((t) => t === "mentions" ? !1 : t === "documents" ? r : t !== "calls" || !!e.lobbyForChannel(n));
}
function Re({ declare: e = A, capabilities: t, capabilitiesError: n, capabilityNames: r = {}, children: i, ...a }) {
	let o = U(() => {
		let i = r;
		return e.filter((e) => e === "chat" || e === "members" || !t || n ? !0 : t[i[e] ?? Pe[e]] === !0);
	}, [
		e,
		t,
		n,
		r
	]);
	return /* @__PURE__ */ q(k, {
		...a,
		features: o,
		children: i
	});
}
//#endregion
//#region src/integrations/realtime/WrappedStreamStage.tsx
function ze(e, { channelArn: t, excludeParticipantId: n, getAuthToken: r, baseUrl: i, onStatusChange: a, ...o }) {
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
	return H(() => {
		a?.({
			mode: "realtime",
			live: c,
			error: s.error
		});
	}, [
		c,
		s.error,
		a
	]), /* @__PURE__ */ q(oe, {
		...o,
		live: c,
		stream: s.stream,
		...l === null ? {} : { viewerCount: l }
	});
}
function Be(e, { channelArn: t, playbackToken: n, baseUrl: r, onStatusChange: i, ...a }) {
	let o = e.useLVSLiveHls({
		channelArn: t,
		playbackToken: n,
		baseUrl: r
	}), { viewerCount: s } = e.useLVSViewerCount({
		channelArn: t,
		baseUrl: r,
		playbackToken: n
	});
	return H(() => {
		i?.({
			mode: "near-realtime",
			live: o.ready,
			error: null
		});
	}, [o.ready, i]), /* @__PURE__ */ q(oe, {
		...a,
		live: o.ready,
		playlistUrl: o.playlistUrl,
		...s === null ? {} : { viewerCount: s }
	});
}
function Ve(e) {
	function t(t) {
		return ze(e, t);
	}
	function n(t) {
		return Be(e, t);
	}
	function r({ mode: e = "near-realtime", ...r }) {
		return q(e === "realtime" ? t : n, { ...r });
	}
	return r;
}
//#endregion
//#region src/integrations/realtime/WrappedLVSHangoutLayout.tsx
function He({ stream: e, displayName: t }) {
	return e ? /* @__PURE__ */ q("video", {
		autoPlay: !0,
		playsInline: !0,
		muted: !0,
		ref: (t) => {
			t && t.srcObject !== e && (t.srcObject = e);
		},
		className: "w-full h-full object-cover scale-x-[-1]"
	}) : /* @__PURE__ */ q("div", {
		className: "w-full h-full grid place-items-center bg-surface-emphasis",
		"data-testid": "local-camera-avatar",
		children: /* @__PURE__ */ q(h, {
			name: t,
			size: 64
		})
	});
}
function Ue(e, t) {
	let n = e.isLocal, r = n ? t ?? e.displayName ?? "You" : e.displayName || e.participantId.slice(0, 8), i = e.streams[0], a = e.screenStream, o = n ? /* @__PURE__ */ q(He, {
		stream: i,
		displayName: r
	}) : /* @__PURE__ */ q(ne, {
		stream: i,
		displayName: r,
		cameraOn: e.hasVideo
	}), s = a ? /* @__PURE__ */ q(N, {
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
function We(e) {
	function t(t) {
		return Ge(e, t);
	}
	return t;
}
function Ge(e, { stageToken: t, participantId: n, userId: r, localClientId: i, getStageToken: a, overlay: o, spotlightContent: s, onParticipantClick: c, mode: l = "auto", activeSpeakerStrategy: u = "audio-level", localTileLabel: d, showLocalAsTile: f = !0, handFor: p, className: m, "data-testid": h }) {
	let g = e.useLVSHangout({
		stageToken: t,
		participantId: n,
		userId: r ?? n.slice(0, 8),
		getAuthToken: a
	}), _ = U(() => g.participants.filter((e) => f || !e.isLocal).map((e) => {
		let t = Ue(e, d), n = p?.(e.appUserId ?? e.userId);
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
	return /* @__PURE__ */ J("div", {
		"data-testid": h,
		className: `relative flex-1 min-h-0 ${m ?? ""}`,
		children: [/* @__PURE__ */ q(ae, {
			participants: _,
			localParticipant: null,
			mode: l,
			spotlightContent: s,
			onParticipantClick: c,
			className: "h-full"
		}), o && /* @__PURE__ */ q("div", {
			className: "absolute inset-0 pointer-events-none z-10",
			"data-testid": "wrapped-overlay-slot",
			children: /* @__PURE__ */ q("div", {
				className: "pointer-events-auto",
				children: o(y)
			})
		})]
	});
}
//#endregion
//#region src/integrations/realtime/createRealtimeIntegrations.tsx
function Ke(e) {
	let t = ge(e), n = Z(t);
	return {
		HangoutRoomRow: t,
		HangoutRoomsSection: n,
		WrappedHangoutRoomsList: Ee(n),
		RealtimeCapabilityProvider: Ae(e),
		conversationFeaturesFor: Ie(e),
		WrappedStreamStage: Ve(e),
		WrappedLVSHangoutLayout: We(e)
	};
}
var qe = me(null), Je = /* @__PURE__ */ new WeakMap();
function Ye(e) {
	let t = Je.get(e);
	return t || (t = Ke(e), Je.set(e, t)), t;
}
function Xe({ modules: e, children: t }) {
	let n = U(() => Ye(e), [e]);
	return /* @__PURE__ */ q(qe.Provider, {
		value: n,
		children: t
	});
}
function Ze() {
	let e = V(qe);
	if (!e) throw Error("useRealtimeIntegrations() needs a <RealtimeIntegrationsProvider modules={…}> above it.");
	return e;
}
//#endregion
//#region src/integrations/realtime/canvasRecovery.ts
function Qe(e, t, n, r = "canvasRecovery") {
	return `${r}:${JSON.stringify([
		e,
		t,
		n
	])}`;
}
function $e(e) {
	let t = "";
	for (let n = 0; n < e.length; n += 8192) t += String.fromCharCode(...e.subarray(n, n + 8192));
	return {
		version: 1,
		savedAt: (/* @__PURE__ */ new Date()).toISOString(),
		snapshot: btoa(t)
	};
}
function et(e) {
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
function tt(e, t, n, r) {
	let i = Qe(e, t, n, r), [a, o] = G(() => {
		try {
			let e = JSON.parse(sessionStorage.getItem(i) ?? "null");
			return et(e?.recovered ?? e?.pending) ? e.recovered ?? e.pending : null;
		} catch {
			return null;
		}
	}), s = W(a), c = W(null), [l, u] = G(!1), d = B(() => {
		try {
			!s.current && !c.current ? sessionStorage.removeItem(i) : sessionStorage.setItem(i, JSON.stringify({
				recovered: s.current,
				pending: c.current
			})), u(!1);
		} catch {
			u(!0);
		}
	}, [i]), f = B((e) => {
		s.current = $e(e), o(s.current), d();
	}, [d]), p = B(() => {
		s.current = null, o(null), d();
	}, [d]), m = B((e, t) => {
		if (!e || !t) return () => {};
		let n = () => {
			t.pendingUpdateCount && (c.current = $e(Y.encodeStateAsUpdate(e)), d());
		};
		return e.on("update", n), n(), () => e.off("update", n);
	}, [d]), h = B(() => {
		c.current = null, d();
	}, [d]);
	return H(() => {
		d();
	}, [d]), {
		recovered: a,
		storageError: l,
		retain: f,
		clear: p,
		track: m,
		acknowledged: h,
		download: B(() => {
			let e = et(s.current ?? c.current);
			if (!e) return;
			let t = URL.createObjectURL(new Blob([Uint8Array.from(e)], { type: "application/octet-stream" })), r = document.createElement("a");
			r.href = t, r.download = `document-${n}-recovery.yjs`, r.click(), window.setTimeout(() => URL.revokeObjectURL(t), 1e3);
		}, [n]),
		restore: B((e) => {
			let t = et(s.current);
			t && (Y.applyUpdate(e, t, "explicit-recovery"), p());
		}, [p])
	};
}
//#endregion
//#region src/integrations/realtime/canvasDocumentState.ts
function nt(e, t, n, r) {
	if (e !== "idle") return {
		status: !n && t > 0 ? "offline" : e,
		...e === "error" || !n ? { onRetry: r } : {}
	};
}
function rt(e, t, n = Date.now()) {
	return t && e.canEdit && e.expiresAt > n;
}
//#endregion
//#region src/integrations/realtime/CanvasDocumentPane.tsx
var it = {
	showRuler: !0,
	showStatusBar: !1,
	toolbarStyle: "card",
	pageMargin: "narrow",
	fitHeight: "parent",
	paginate: !0
};
function at(e) {
	return function(n) {
		let { documentId: r, tenant: o, userId: s, userName: u, userColor: p = "teal", canEdit: m, editing: h = !0, extensions: _, loadImage: v, isProtectedImage: y, uploadImage: b, onPendingChange: S, notices: C, children: w, viewProps: T, onEditorReady: E, loadingLabel: ee = "Loading collaborative document…", layout: D, keyPrefix: O } = n, k = e.useGateway(), A = tt(o, s, r, O), j = e.useYjsDoc({
			documentId: r,
			ws: k,
			onMessage: k.onMessage,
			onUnpersistedChanges: A.retain
		}), M = e.useCanvasDocument({ ydoc: j.ydoc }), N = k.connectionState === "connected", P = m && h && j.synced && N, te = W(P);
		te.current = P;
		let [ne, re] = G(!1), [ie, F] = G(null), [ae, I] = G(!1), [L, oe] = G(!1), [se, ce] = G(null), le = W(null), R = U(() => ({
			name: u,
			color: p
		}), [u, p]);
		H(() => A.track(j.ydoc, j.provider), [
			j.ydoc,
			j.provider,
			A.track
		]), H(() => {
			j.persistenceState === "saved" && j.pendingUpdateCount === 0 && A.acknowledged();
		}, [
			j.persistenceState,
			j.pendingUpdateCount,
			A.acknowledged
		]), H(() => {
			S?.(j.pendingUpdateCount);
		}, [j.pendingUpdateCount, S]), H(() => {
			j.provider?.awareness.setLocalStateField("user", {
				...R,
				id: s
			});
		}, [
			j.provider,
			R,
			s
		]), H(() => {
			if (j.pendingUpdateCount === 0) return;
			let e = (e) => {
				e.preventDefault(), e.returnValue = "";
			};
			return window.addEventListener("beforeunload", e), () => window.removeEventListener("beforeunload", e);
		}, [j.pendingUpdateCount]), H(() => k.onMessage((e) => {
			e.channel === `doc:${r}` && (e.type === "crdt:error" && F(typeof e.error == "string" ? e.error : "The document operation was refused."), e.type === "crdt:snapshot" && F(null));
		}), [k.onMessage, r]);
		let ue = async (e) => {
			let t = le.current;
			if (!(!b || !t || t.isDestroyed || !te.current || L)) {
				oe(!0), ce(null);
				try {
					let n = await b(e);
					if (le.current !== t || t.isDestroyed || !te.current) throw Error("The document is no longer editable. The image was not inserted.");
					t.chain().focus().setImage({
						src: n,
						alt: e.name
					}).run(), I(!1);
				} catch (e) {
					ce(e instanceof Error ? e.message : "The image could not be uploaded.");
				} finally {
					oe(!1);
				}
			}
		}, z = nt(j.persistenceState, j.pendingUpdateCount, N, j.retryPersistence), pe = {
			editable: P,
			online: N,
			synced: j.synced,
			pendingUpdateCount: j.pendingUpdateCount,
			persistenceState: j.persistenceState,
			docVersion: j.docVersion,
			ydoc: j.ydoc,
			exportMarkdown: M.exportMarkdown
		}, me = /* @__PURE__ */ J(K, { children: [
			C,
			A.recovered && /* @__PURE__ */ q(g, {
				tone: "warning",
				children: /* @__PURE__ */ J(a, {
					gap: "xs",
					children: ["Changes from an earlier editing session are available for recovery. They have not been applied to this document.", /* @__PURE__ */ J(i, {
						gap: "sm",
						wrap: !0,
						children: [
							/* @__PURE__ */ q(t, {
								size: "sm",
								variant: "secondary",
								onClick: A.download,
								children: "Download recovery"
							}),
							m && /* @__PURE__ */ q(t, {
								size: "sm",
								variant: "secondary",
								disabled: !j.synced || !N || j.pendingUpdateCount > 0,
								onClick: () => re(!0),
								children: "Recover changes…"
							}),
							/* @__PURE__ */ q(t, {
								size: "sm",
								variant: "ghost",
								onClick: A.clear,
								children: "Discard recovery"
							})
						]
					})]
				})
			}),
			A.storageError && /* @__PURE__ */ q(g, {
				tone: "warning",
				children: /* @__PURE__ */ J(i, {
					gap: "sm",
					wrap: !0,
					children: ["This browser could not keep a recovery copy. Keep this page open until saving finishes.", /* @__PURE__ */ q(t, {
						size: "sm",
						variant: "secondary",
						onClick: A.download,
						children: "Download recovery"
					})]
				})
			}),
			ie && /* @__PURE__ */ q(g, {
				tone: "error",
				children: ie
			})
		] }), B = j.synced && !!j.ydoc && !!M.body, V = /* @__PURE__ */ J(K, { children: [
			w,
			/* @__PURE__ */ q(l, {
				open: ne,
				onCancel: () => re(!1),
				title: "Recover earlier changes?",
				tone: "caution",
				body: "This explicitly merges the recovered document with the current version. It can bring back content removed by a version restore. Download the recovery first if you want to keep a separate copy.",
				confirmLabel: "Recover changes",
				onConfirm: () => {
					j.ydoc && m && N && j.pendingUpdateCount === 0 && A.restore(j.ydoc), re(!1);
				}
			}),
			b && /* @__PURE__ */ q(c, {
				open: ae,
				onClose: () => {
					L || I(!1);
				},
				title: "Insert image",
				children: /* @__PURE__ */ J(a, {
					gap: "sm",
					children: [se && /* @__PURE__ */ q(g, {
						tone: "error",
						children: se
					}), /* @__PURE__ */ q(x, {
						accept: "image/*",
						maxSize: 10485760,
						disabled: L || !P,
						label: L ? "Uploading image…" : "Choose an image or drop it here",
						onFiles: (e) => {
							e[0] && ue(e[0]);
						}
					})]
				})
			})
		] }), Y = (e, t = null, n = null) => D ? D({
			notices: me,
			canvas: e,
			toolbar: t,
			ruler: n,
			saveState: z,
			state: pe
		}) : /* @__PURE__ */ J(K, { children: [me, e] });
		if (!B) return Y(/* @__PURE__ */ q(f, { label: ee }));
		if (!M.isCanvas) return Y(/* @__PURE__ */ q(d, {
			title: "Document migration is incomplete",
			body: "The server has not supplied a rich document snapshot. No changes have been made."
		}));
		let ge = (e) => /* @__PURE__ */ J(fe, {
			loadImage: v,
			...y ? { requiresAuthentication: y } : {},
			children: [/* @__PURE__ */ he(de, {
				...it,
				...T,
				key: j.docVersion,
				isCanvas: !0,
				body: M.body,
				ydoc: j.ydoc,
				provider: j.provider,
				user: R,
				editable: P,
				extensions: _,
				...b && P ? { onInsertImage: () => {
					ce(null), I(!0);
				} } : {},
				...e ? { renderFrame: ({ toolbar: t, ruler: n, surface: r }) => e(t, n, r) } : {},
				onEditorReady: (e) => {
					le.current = e, E?.(e);
				}
			}), V]
		});
		return D ? ge((e, t, n) => Y(/* @__PURE__ */ q(a, {
			gap: "none",
			className: "min-h-0 flex-1",
			"data-testid": "document-canvas-slot",
			children: n
		}), e, t)) : Y(/* @__PURE__ */ q(a, {
			gap: "none",
			className: "min-h-0 flex-1",
			"data-testid": "document-canvas-slot",
			children: ge()
		}));
	};
}
//#endregion
//#region src/integrations/realtime/canvasDocumentExtensions.ts
function ot(e, t) {
	return e({
		...t,
		Image: z(t.Image)
	});
}
//#endregion
//#region src/integrations/realtime/ConversationCallDock.tsx
var st = (e) => e.stream ? /* @__PURE__ */ q(N, {
	stream: e.stream,
	muted: e.isLocal
}) : void 0, ct = () => typeof HTMLMediaElement < "u" && "setSinkId" in HTMLMediaElement.prototype;
function lt(e, t, n) {
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
function ut(e, t) {
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
function dt(e) {
	let t = (e?.participants ?? []).filter((e) => !e.isLocal && e.stream && (e.state === "in-call" || e.state === "reconnecting")), n = t.map((e) => `${e.id}=${e.stream.id}`).join("|");
	return U(() => t.map((e) => ({
		participantId: e.id,
		streams: [e.stream]
	})), [n]);
}
function ft(e, { call: t, title: n, onOpenPeople: r, peopleOpen: i, onOpenSettings: a, onPopOut: o, extras: s, cameraMenuItems: l, tile: u = st, notice: d, handFor: f, selfName: p, compact: m = !1, tileSize: h, documents: _, onOpenDocuments: v, documentsOpen: y, onDocumentClick: b, layout: x = "shelf", className: S, "data-testid": C = "conversation-call-dock" }) {
	let [w, T] = G(!1), E = t.media?.captureError ?? null, [ee, D] = G(null);
	H(() => {
		E || D(null);
	}, [E]);
	let O = e.useAudioVideoSettings({ preview: w }), { activeSpeakerId: k } = ue({ participants: dt(t.call) }), A = e.conversationCallDockProps(t, {
		title: n,
		onOpenPeople: r,
		...i === void 0 ? {} : { peopleOpen: i },
		onOpenSettings: a ?? (() => T(!0)),
		...o ? { onPopOut: o } : {},
		...s === void 0 ? {} : { extras: s },
		...l ? { cameraMenuItems: l } : {},
		tile: u,
		activeSpeakerId: k ?? t.activeSpeakerId,
		compact: m,
		"data-testid": C
	});
	if (!A) return null;
	let j = {
		...A,
		participants: ut(lt(A.participants, t.call?.participants ?? [], A.phase), f),
		layout: x,
		...h ? { tileSize: h } : {},
		..._ ? { documents: _ } : {},
		...v ? { onOpenDocuments: v } : {},
		...y === void 0 ? {} : { documentsOpen: y },
		...b ? { onDocumentClick: b } : {},
		...S ? { className: S } : {}
	};
	return /* @__PURE__ */ J(K, { children: [
		d ? /* @__PURE__ */ q(g, {
			tone: "info",
			"data-testid": `${C}-notice`,
			children: d
		}) : null,
		E && E !== ee ? /* @__PURE__ */ J(g, {
			tone: "warning",
			"data-testid": `${C}-capture-error`,
			onDismiss: () => D(E),
			children: [E, " You can keep listening. Check browser device access, then turn the device on to retry."]
		}) : null,
		/* @__PURE__ */ q(le, { ...j }),
		!a && /* @__PURE__ */ q(c, {
			open: w,
			onClose: () => T(!1),
			title: "Call devices",
			children: /* @__PURE__ */ q(F, {
				"data-testid": `${C}-settings`,
				value: O.settings,
				onChange: (e) => {
					O.update(e), t.devices.set({
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
				micLevel: O.micLevel,
				previewStream: O.previewStream,
				cameraOn: t.self.cameraOn,
				speakerSelectionSupported: ct(),
				onTestMic: O.testMic,
				onTestSound: O.testSound,
				testMicState: O.testMicState,
				...p === void 0 ? {} : { selfName: p }
			})
		})
	] });
}
function pt(e) {
	function t(t) {
		return ft(e, t);
	}
	return t;
}
//#endregion
//#region src/integrations/realtime/IncomingCallToast.tsx
function mt(e) {
	return e.kind === "knock" ? `${e.callerName} asks to join` : `${e.callerName} is calling`;
}
function ht({ ring: e, onAccept: n, onDecline: a, corner: o = "top-right", width: c = 360, className: l, "data-testid": u = "incoming-call-toast" }) {
	let d = e.kind === "knock";
	return /* @__PURE__ */ q(T, {
		corner: o,
		width: c,
		"data-testid": u,
		...l ? { className: l } : {},
		children: /* @__PURE__ */ q(s, {
			variant: "info",
			layout: "stacked",
			icon: /* @__PURE__ */ q(r, { size: 16 }),
			title: mt(e),
			action: /* @__PURE__ */ J(i, {
				gap: "sm",
				children: [/* @__PURE__ */ q(t, {
					size: "sm",
					variant: "secondary",
					onClick: a,
					"data-testid": "incoming-call-decline",
					children: "Decline"
				}), /* @__PURE__ */ q(t, {
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
function gt(e) {
	if (!e || typeof e != "object") return null;
	let t = e;
	return typeof t.messageId != "string" || !t.messageId ? null : {
		messageId: t.messageId,
		author: $(t.author) ?? "Unknown",
		text: $(t.text) ?? "",
		...$(t.timestamp) ? { timestamp: t.timestamp } : {}
	};
}
function _t(e) {
	let t = e.metadata?.attachments, n = Array.isArray(t) ? t.filter((e) => !!e && typeof e == "object" && typeof e.url == "string" && typeof e.id == "string") : void 0, r;
	if (e.metadata) {
		let { replyTo: t, ...n } = e.metadata, i = { ...n }, a = gt(t);
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
function vt(e) {
	let t = /* @__PURE__ */ new Map();
	for (let n of e) {
		let e = $(n.metadata?.displayName);
		n.userId && e && !n.deletedAt && t.set(n.userId, e);
	}
	return e.map((e) => {
		let n = _t(e);
		return n.displayName || !e.deletedAt ? n : {
			...n,
			displayName: e.userId && t.get(e.userId) || "a removed member"
		};
	});
}
function yt(e) {
	return {
		id: $(e.metadata?.userId) || e.clientId,
		name: $(e.metadata?.displayName) ?? e.clientId.slice(0, 12),
		avatarUrl: $(e.metadata?.avatarUrl),
		online: e.status !== "offline",
		...e.status === "away" || e.status === "busy" ? { idle: !0 } : {}
	};
}
function bt(e) {
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
var xt = [
	15,
	25,
	35,
	45,
	55,
	65,
	75,
	85
], St = [
	20,
	35,
	50,
	65,
	80
];
function Ct(e, t) {
	let n = xt[t % xt.length] ?? 50, r = St[Math.floor(t / xt.length) % St.length] ?? 50, i = e.position != null && typeof e.position == "object" ? e.position : null;
	return {
		id: e.id,
		emoji: e.emoji,
		x: i?.x ?? n,
		y: i?.y ?? r,
		timestamp: e.timestamp
	};
}
function wt(e) {
	return e.map(Ct);
}
function Tt(e, t) {
	return (e.reactionsFor ? e.reactionsFor(t) : e.reactions.filter((e) => e.targetId === t)).map((e) => ({
		emoji: e.emoji,
		userId: e.userId ?? e.clientId,
		displayName: e.displayName
	}));
}
function Et(e) {
	try {
		let t = Date.now() - new Date(e).getTime(), n = Math.floor(t / 1e3);
		return n < 60 ? "just now" : n < 3600 ? `${Math.floor(n / 60)}m ago` : n < 86400 ? `${Math.floor(n / 3600)}h ago` : e.slice(0, 10);
	} catch {
		return "";
	}
}
var Dt = {
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
function Ot(e) {
	let t = e.detail;
	return typeof t.subject == "string" ? t.subject : typeof t.contentId == "string" ? t.contentId.slice(0, 12) : typeof t.roomId == "string" ? `room:${t.roomId.slice(0, 8)}` : typeof t.pipelineId == "string" ? `pipeline:${t.pipelineId}` : e.eventType;
}
function kt(e, t) {
	return [
		e.eventType,
		e.timestamp,
		e.userId ?? e.displayName,
		t
	].join("|");
}
function At(e) {
	return {
		id: kt(e, Ot(e)),
		actor: e.displayName,
		action: Dt[e.eventType] ?? e.eventType.split(".").pop() ?? "did",
		subject: Ot(e),
		ticketId: typeof e.detail.ticketId == "string" ? e.detail.ticketId : void 0,
		timeLabel: Et(e.timestamp),
		kind: e.eventType.split(".")[0]
	};
}
function jt(e) {
	let t = /* @__PURE__ */ new Map();
	return e.map((e) => {
		let n = At(e), r = t.get(n.id) ?? 0;
		return t.set(n.id, r + 1), r === 0 ? n : {
			...n,
			id: `${n.id}#${r}`
		};
	});
}
function Mt(e) {
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
function Nt(e) {
	return e.map(Mt);
}
function Pt(e, t, n) {
	return {
		id: e.clientId,
		displayName: e.displayName || e.clientId.slice(0, 12),
		isMuted: !e.audioOn,
		isLocal: t == null ? void 0 : e.clientId === t,
		...n ? { avatarUrl: n } : {}
	};
}
function Ft(e, t, n) {
	return e.map((e) => Pt(e, t, n?.[e.clientId]));
}
function It(e) {
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
function Lt(e) {
	return e.map(It);
}
function Rt(e) {
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
function zt({ chat: e, localMessages: t, presence: n, upload: r, reactions: i, pins: a, currentActor: o, currentUserId: s, displayName: c, avatarUrl: l, sendMetadata: u, publishTyping: d, attachmentSrc: f, onOpenAttachment: p, acceptFiles: m, maxFileSize: h, onFileError: g, disabled: _, typingUsers: v, tone: y, fill: b, flushComposer: x, contentAlign: S, showHeader: C, loadMoreHistory: w = !1, joinHistoryLimit: T = 20, historyPageSize: E = 50, onLoadMore: D, hasMore: O, loadingMore: k, composer: A, renderMessageReferences: j, emojis: M, onReply: N, reply: P, onCancelReply: te, readReceipts: ne, readReceiptsEnabled: re, unreadFrom: ie, threaded: F, onJumpToMessage: ae, highlightedMessageId: I, documentEditors: L, callParticipants: oe, onJoinCall: se, onOpenDocument: ce, wrapWithNetworkShim: le, editable: R = !0, canEdit: ue, canDelete: de, onForwardMessage: fe }) {
	let z = U(() => vt(e.messages), [e.messages]), pe = U(() => {
		if (!t?.length) return [];
		let e = new Set(z.flatMap((e) => e.id ? [e.id] : [])), n = /* @__PURE__ */ new Set(), r = [];
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
	}, [z, t]), me = U(() => {
		let e = z;
		if (!t?.length) return e;
		let n = new Set(e.flatMap((e) => e.id ? [e.id] : [])), r = t.filter((e) => e.body === void 0 && (!e.id || !n.has(e.id)));
		return r.length === 0 ? e : [...e, ...r].map((e, t) => ({
			m: e,
			i: t
		})).sort((e, t) => Date.parse(e.m.timestamp) - Date.parse(t.m.timestamp) || e.i - t.i).map(({ m: e }) => e);
	}, [z, t]), he = v ?? n?.roster.filter((e) => {
		if (e.metadata?.isTyping !== !0) return !1;
		let t = e.metadata?.userId;
		return s && typeof t == "string" ? t !== s : !o || e.clientId !== o;
	}).map((e) => e.metadata?.displayName ?? e.clientId.slice(0, 8)) ?? [], V = e.sendMessage, J = B((e) => {
		let t = { ...u ?? {} };
		c && (t.displayName = c), l && (t.avatarUrl = l), Object.keys(t).length > 0 ? V(e, t) : V(e);
	}, [
		V,
		u,
		c,
		l
	]), Y = n?.updateMetadata, ge = (d ?? !0) && !!Y, _e = B((e) => Y?.({ isTyping: e }), [Y]), ve = e.loadHistory, [X, ye] = G(T), [be, xe] = G(!1), Z = e.messages.length, Se = W(Z);
	H(() => {
		Z !== Se.current && (Se.current = Z, xe(!1));
	}, [Z]);
	let Ce = W(X);
	Ce.current = X;
	let we = B(() => {
		let e = Ce.current + E;
		Ce.current = e, ye(e), xe(!0), ve(e);
	}, [ve, E]), Ee = D ? {
		onLoadMore: D,
		hasMore: O,
		loadingMore: k
	} : w ? {
		onLoadMore: we,
		hasMore: O ?? Z >= X,
		loadingMore: k ?? be
	} : {}, De = U(() => i ? (e) => Tt(i, e) : void 0, [i]), Q = U(() => {
		if (!i || !s) return;
		let { toggle: e, react: t, unreact: n } = i;
		return e ? (t, n) => e(n, {
			targetId: t,
			userId: s
		}) : (e, r) => {
			Tt(i, e).some((e) => e.emoji === r && e.userId === s) && n ? n(r, { targetId: e }) : t(r, { targetId: e });
		};
	}, [i, s]), Oe = B((e) => {
		if (!a) return;
		let t = e.id ?? "";
		t && (a.pinnedIds.has(t) ? a.unpin(t) : a.pin({
			messageId: t,
			text: e.content,
			author: e.displayName ?? "Unknown"
		}));
	}, [a]), ke = e.editMessage, Ae = e.deleteMessage, je = B((e, t) => {
		let n = t.trim();
		if (!e.id || !n) return;
		let r = `<p>${n.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br>")}</p>`;
		ke?.(e.id, n, { html: r });
	}, [ke]), Me = B((e) => {
		e.id && Ae?.(e.id);
	}, [Ae]), Ne = /* @__PURE__ */ q(ee, {
		messages: me,
		...pe.length ? { localMessages: pe } : {},
		onSend: J,
		disabled: _,
		typingUsers: he,
		tone: y,
		fill: b,
		flushComposer: x,
		contentAlign: S,
		showHeader: C,
		composer: A,
		emojis: M,
		...Ee,
		...ge ? { onTyping: _e } : {},
		...r ? {
			onSendFiles: (e) => {
				for (let t of e) r.upload(t);
			},
			transfers: r.transfers,
			onCancelTransfer: r.cancelTransfer
		} : {},
		currentActor: o,
		currentUserId: s,
		reactionsFor: De,
		onToggleReaction: Q,
		...a ? {
			pinnedMessageIds: a.pinnedIds,
			onTogglePin: Oe
		} : {},
		...R && ke ? {
			onEditMessage: je,
			...ue ? { canEditMessage: ue } : {}
		} : {},
		...R && Ae ? {
			onDeleteMessage: Me,
			...de ? { canDeleteMessage: de } : {}
		} : {},
		onForwardMessage: fe,
		onReply: N,
		reply: P,
		onCancelReply: te,
		readReceipts: ne,
		readReceiptsEnabled: re,
		unreadFrom: ie,
		threaded: F,
		onJumpToMessage: ae,
		highlightedMessageId: I,
		documentEditors: L,
		callParticipants: oe,
		onJoinCall: se,
		onOpenDocument: ce,
		renderMessageReferences: j,
		attachmentSrc: f,
		onOpenAttachment: p,
		acceptFiles: m,
		maxFileSize: h,
		onFileError: g
	});
	return /* @__PURE__ */ q(K, { children: Te(Ne, le) });
}
//#endregion
//#region src/integrations/realtime-modules/WrappedPresencePanel.tsx
var Bt = {
	typing: 4,
	online: 3,
	away: 2,
	busy: 1,
	offline: 0
};
function Vt(e) {
	return Bt[e] ?? 2.5;
}
function Ht(e, t) {
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
			let n = Vt(t.status) - Vt(e.status);
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
function Ut({ presence: e, currentClientId: t, perConnection: n = !1, wrapWithNetworkShim: r }) {
	let i = U(() => n ? e.roster.map((e) => ({
		clientId: e.clientId,
		status: e.status,
		metadata: e.metadata
	})) : Ht(e.roster, t), [
		e.roster,
		t,
		n
	]);
	return /* @__PURE__ */ q(K, { children: Te(/* @__PURE__ */ q(j, {
		users: i,
		currentClientId: t
	}), r) });
}
//#endregion
//#region src/integrations/realtime-modules/WrappedActivityPanel.tsx
function Wt({ activity: e, visibleCount: t, rotateMs: n, staggerMs: r, kindColors: i, className: a }) {
	let o = U(() => jt(e.events), [e.events]);
	return /* @__PURE__ */ q(S, {
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
function Gt({ cursors: t, coordinates: n = "pixels", onMove: r, children: i, className: a }) {
	let o = n === "fraction";
	function s(e) {
		if (!r) return;
		let t = e.currentTarget.getBoundingClientRect(), n = e.clientX - t.left, i = e.clientY - t.top;
		if (!o) return r(n, i);
		if (t.width <= 0 || t.height <= 0) return;
		let a = (e) => Math.min(1, Math.max(0, e));
		r(a(n / t.width), a(i / t.height));
	}
	return /* @__PURE__ */ J("div", {
		"data-testid": "cursor-overlay",
		className: e("relative", a),
		onPointerMove: r ? s : void 0,
		children: [i, /* @__PURE__ */ q("div", {
			className: "pointer-events-none absolute inset-0 overflow-hidden",
			"aria-hidden": "true",
			"data-testid": "cursor-overlay-layer",
			children: t.map((e) => {
				if (!Number.isFinite(e.x) || !Number.isFinite(e.y)) return null;
				let t = e.label ?? e.clientId, n = e.color ?? M(t);
				return /* @__PURE__ */ J("div", {
					"data-testid": "cursor-overlay-pointer",
					"data-client-id": e.clientId,
					className: "absolute select-none",
					style: {
						left: o ? `${e.x * 100}%` : e.x,
						top: o ? `${e.y * 100}%` : e.y
					},
					children: [/* @__PURE__ */ q("svg", {
						width: "16",
						height: "16",
						viewBox: "0 0 16 16",
						fill: n,
						className: "drop-shadow",
						children: /* @__PURE__ */ q("path", {
							d: "M1 1l5.5 14 2-5.5L14 7.5z",
							stroke: "white",
							strokeWidth: "1",
							strokeLinejoin: "round"
						})
					}), /* @__PURE__ */ q("span", {
						"data-testid": "cursor-overlay-label",
						title: t,
						className: "ml-3 -mt-1 inline-block max-w-[10rem] truncate rounded px-1.5 py-0.5 text-[10px] font-medium text-white shadow",
						style: { background: n },
						children: e.label ? e.label : D(e.clientId)
					})]
				}, e.clientId);
			})
		})]
	});
}
//#endregion
//#region src/integrations/realtime-modules/WrappedCursorOverlay.tsx
function Kt({ cursor: e, coordinates: t = "fraction", publish: n = !0, selfClientId: r, children: i, className: a }) {
	let o = U(() => Rt(e.cursors).filter((e) => e.clientId !== r), [e.cursors, r]), s = e.move;
	return /* @__PURE__ */ q(Gt, {
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
function qt({ reactions: e, ttlMs: t = 2500 }) {
	let [n, r] = G([]), i = e.reactions, a = W(/* @__PURE__ */ new Map());
	return H(() => {
		if (i.length === 0) return;
		let e = i[i.length - 1], n = Ct(e, i.length - 1), o = a.current;
		o.has(n.id) || (r((e) => e.some((e) => e.id === n.id) ? e : [...e, n]), o.set(n.id, setTimeout(() => {
			o.delete(n.id), r((e) => e.filter((e) => e.id !== n.id));
		}, t)));
	}, [i, t]), H(() => {
		let e = a.current;
		return () => {
			e.forEach((e) => clearTimeout(e)), e.clear();
		};
	}, []), /* @__PURE__ */ q(w, { reactions: n });
}
//#endregion
//#region src/integrations/realtime-modules/WrappedFileUploadDrop.tsx
function Jt({ fileUpload: e, accept: t, maxSize: n, multiple: r, disabled: i, label: a, className: o, uploadMetadata: s, onError: c }) {
	let l = Nt(e.uploads);
	function u(t) {
		for (let n of t) e.upload(n, s ? { metadata: s } : void 0).catch((e) => {
			let t = e instanceof Error ? e.message : "Upload failed";
			c?.(t);
		});
	}
	return /* @__PURE__ */ J("div", { children: [/* @__PURE__ */ q(x, {
		accept: t,
		maxSize: n,
		multiple: r,
		disabled: i,
		label: a,
		className: o,
		onFiles: u,
		onError: c
	}), l.length > 0 && /* @__PURE__ */ q(Yt, {
		summaries: l,
		onDismiss: () => e.removeCompleted()
	})] });
}
function Yt({ summaries: e, onDismiss: t }) {
	return /* @__PURE__ */ q("ul", {
		className: "mt-2 p-0 list-none text-[13px]",
		children: e.map((e) => /* @__PURE__ */ J("li", {
			className: "flex items-center gap-2 py-1 border-b border-border",
			children: [
				/* @__PURE__ */ q("span", {
					className: "flex-1 overflow-hidden text-ellipsis whitespace-nowrap",
					children: e.filename
				}),
				/* @__PURE__ */ q("span", {
					className: `text-xs font-semibold ${Xt(e.status)}`,
					children: e.status === "uploading" ? `${e.progress}%` : e.status
				}),
				(e.status === "completed" || e.status === "clean") && e.downloadUrl && /* @__PURE__ */ q("a", {
					href: e.downloadUrl,
					target: "_blank",
					rel: "noreferrer",
					className: "text-xs text-info",
					children: "Download"
				}),
				(e.status === "failed" || e.status === "infected") && /* @__PURE__ */ q("button", {
					type: "button",
					onClick: t,
					className: "text-xs text-danger bg-transparent border-0 cursor-pointer p-0",
					children: "Dismiss"
				})
			]
		}, e.id))
	});
}
function Xt(e) {
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
function Zt({ hangout: e, localClientId: t, videoElements: n, mode: r, spotlightContent: i, activeSpeakerId: a, speakerHysteresisMs: o, onParticipantClick: s, className: c }) {
	let l = Ft(e.participants, t), u = t == null ? null : l.find((e) => e.id === t) ?? null, d = t == null ? l : l.filter((e) => e.id !== t);
	function f(e) {
		return n ? e.map((e) => ({
			...e,
			videoElement: n[e.id] ?? e.videoElement
		})) : e;
	}
	return /* @__PURE__ */ q(ae, {
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
function Qt({ notifications: e, onItemClick: t, ...n }) {
	let r = Lt(e.notifications);
	return /* @__PURE__ */ q(_, {
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
function $t({ notifications: e, onItemClick: t, unreadCount: n, ...r }) {
	let i = Lt(e.notifications);
	return /* @__PURE__ */ q(y, {
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
function en({ socket: e, ...t }) {
	return /* @__PURE__ */ q(v, {
		state: e.connectionState,
		...t
	});
}
//#endregion
//#region src/integrations/realtime-modules/CapabilityBoundary.tsx
function tn({ capability: e, loading: t, fallback: n, children: r }) {
	return e.isLoading ? /* @__PURE__ */ q(K, { children: t ?? null }) : e.enabled ? /* @__PURE__ */ q(K, { children: r }) : /* @__PURE__ */ q(K, { children: n ?? null });
}
//#endregion
//#region src/integrations/realtime-modules/WrappedMediaEffectsTray.tsx
function nn({ controller: e, ...t }) {
	return /* @__PURE__ */ q(R, {
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
function rn({ open: e, controller: t, onClose: n, onApplied: r, ...i }) {
	let a = W(t);
	a.current = t;
	let o = W(!1);
	H(() => {
		if (e) return a.current.beginPreview(), o.current = !0, () => {
			o.current && (o.current = !1, a.current.cancelPreview());
		};
	}, [e]);
	let s = U(() => {
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
	return /* @__PURE__ */ q(ie, {
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
function an(e) {
	let t = e.draft;
	if (!t) return 0;
	let n = 0;
	return t.filterId !== e.filterId && n++, (t.backgroundMode !== e.backgroundMode || t.backgroundMode === "image" && t.backgroundImageUrl !== e.backgroundImageUrl) && n++, t.faceSpriteId !== e.faceSpriteId && n++, n;
}
//#endregion
//#region src/integrations/realtime-modules/WrappedCanvasDocument.tsx
function on({ canvas: e, schema: t, legacyModel: n, beforeConvert: r, ...i }) {
	let [a, o] = G([]), s = B(async () => {
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
	return /* @__PURE__ */ q(de, {
		...i,
		isCanvas: e.isCanvas,
		body: e.body,
		onConvert: s,
		unsupported: a
	});
}
//#endregion
//#region src/integrations/realtime-modules/WrappedAudioVideoSettingsForm.tsx
function sn({ devices: e, settings: t, cameraOn: n, ...r }) {
	return /* @__PURE__ */ q(F, {
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
function cn(e) {
	return new Map(e.map((e, t) => [e.userId, t + 1]));
}
function ln(e, t) {
	let n = cn(e.hands);
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
function un(e, t, n = []) {
	let r = new Map(t.map((e) => [e.userId, e])), i = cn(n), a = (e) => {
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
function dn(e) {
	return Array.from({ length: e }, (e, t) => ({ name: `Room ${t + 1}` }));
}
function fn({ meeting: e, people: t, roomNames: n, renderError: r, ...i }) {
	let { rooms: a, unassigned: o } = un(e.breakout, t, e.hands), c = e.breakout;
	return /* @__PURE__ */ q(se, {
		...i,
		rooms: a,
		phase: c.phase,
		mode: c.mode,
		myRoomId: e.myRoom?.id ?? null,
		isOrganizer: e.isOrganizer,
		unassigned: o,
		endsAt: c.endsAt,
		closing: c.closing === !0,
		allowReturnToMain: c.settings.allowReturnToMain,
		onJoin: e.joinRoom,
		onReturnToMain: e.returnToMain,
		onCreateRooms: (t, r) => {
			let i = n?.(t) ?? dn(t).map((e) => e.name);
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
		notice: e.error ? r?.(e.error) ?? /* @__PURE__ */ q(s, {
			variant: "error",
			className: "mx-4 mt-3",
			"data-testid": "breakout-error",
			children: e.error.message
		}) : null
	});
}
function pn({ meeting: e, className: t }) {
	if (!e.myRoom) return null;
	let n = e.breakout;
	return /* @__PURE__ */ q(I, {
		roomName: e.myRoom.name,
		endsAt: n.endsAt,
		closing: n.closing === !0,
		announcement: e.state.announcement,
		onDismissAnnouncement: e.dismissAnnouncement,
		onReturnToMain: n.settings.allowReturnToMain || e.isOrganizer ? e.returnToMain : void 0,
		className: t
	});
}
function mn(e, t) {
	let n = e.myHandPosition !== null, r = t.onReact;
	return {
		...r ? { react: {
			id: "react",
			label: "React",
			icon: /* @__PURE__ */ q(L, {}),
			popoverLabel: "Send a reaction",
			popover: (e) => /* @__PURE__ */ q(te, {
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
			icon: /* @__PURE__ */ q(P, {}),
			pressed: n,
			onClick: e.toggleHand,
			disabled: !e.ready
		},
		rooms: {
			id: "rooms",
			label: "Rooms",
			icon: /* @__PURE__ */ q(re, {}),
			active: t.roomsOpen,
			onClick: t.onToggleRooms,
			disabled: !e.ready,
			badge: e.breakout.phase === "open" && !e.myRoom && e.breakout.mode === "self-select" ? e.breakout.rooms.filter((e) => e.state === "open").length : void 0
		}
	};
}
//#endregion
export { We as $, Pt as A, mt as B, zt as C, vt as D, _t as E, yt as F, nt as G, ot as H, bt as I, et as J, tt as K, Ct as L, Tt as M, It as N, Mt as O, Lt as P, Ze as Q, wt as R, Ut as S, jt as T, at as U, pt as V, rt as W, Xe as X, $e as Y, Ke as Z, Zt as _, ge as _t, cn as a, Q as at, Kt as b, sn as c, Ae as ct, an as d, Te as dt, Ve as et, nn as f, we as ft, Qt as g, ye as gt, $t as h, xe as ht, dn as i, Ie as it, Ft as j, Nt as k, on as l, Me as lt, en as m, Z as mt, fn as n, Re as nt, ln as o, Ne as ot, tn as p, Ce as pt, Qe as q, un as r, Fe as rt, mn as s, Oe as st, pn as t, Pe as tt, rn as u, Ee as ut, Jt as v, At as w, Wt as x, qt as y, ht as z };
