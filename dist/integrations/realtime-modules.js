import { n as e } from "../Button-DQoeE5dN.js";
import { i as t, n, r } from "../Text-DYn7PTcU.js";
import { t as i } from "../Card-D4k-Buoz.js";
import { a, i as o, n as s, t as c } from "../WorkflowStepper-Co2nPHFt.js";
import { t as l } from "../EmptyState-dTW3J44n.js";
import { t as u } from "../LoadingState-BQlqtSB5.js";
import { t as d } from "../StatusPill-CiOnb5N4.js";
import { t as f } from "../InlineAlert-BgM4PLN-.js";
import { t as p } from "../CardHeader-DDkwr0A5.js";
import { n as m, t as h } from "../WorkInspector-BT4Mx_Ul.js";
import { i as g, n as _, r as v, t as y } from "../useDocumentImageUpload-C5apJ_Mt.js";
import { $ as b, A as x, B as S, C, D as w, E as T, F as E, G as D, H as O, I as k, J as A, K as j, L as M, M as N, N as P, O as F, P as I, Q as L, R, S as ee, St as te, T as ne, U as re, V as ie, W as ae, X as oe, Y as se, Z as ce, _ as le, _t as z, a as B, at as V, b as H, bt as U, c as W, ct as ue, d as de, dt as fe, et as pe, f as me, ft as he, g as ge, gt as _e, h as ve, ht as ye, i as be, it as xe, j as Se, k as Ce, l as we, lt as Te, m as Ee, mt as De, n as Oe, nt as ke, o as Ae, ot as je, p as Me, pt as Ne, q as Pe, r as Fe, rt as Ie, s as Le, st as Re, t as ze, tt as Be, u as Ve, ut as He, v as Ue, vt as We, w as Ge, x as Ke, xt as qe, y as Je, yt as Ye, z as Xe } from "../meeting-DpGLyqNE.js";
import { useMemo as Ze, useState as G } from "react";
import { jsx as K, jsxs as q } from "react/jsx-runtime";
import * as Qe from "@connorhoehn/realtime-modules/client/hangout-rooms";
import * as J from "@connorhoehn/realtime-modules/client/video";
import * as $e from "@connorhoehn/realtime-modules/client";
import { useCanvasDocument as et, useGateway as tt, useYjsDoc as nt } from "@connorhoehn/realtime-modules/client";
import * as rt from "@connorhoehn/realtime-modules/call";
//#region src/integrations/realtime-modules/WrappedWorkGraph.tsx
var it = {
	"snapshot-unavailable": "The work graph could not be loaded.",
	"invalid-snapshot": "The work graph came back in a shape this page cannot read.",
	"invalid-query": "This view asked for work it is not allowed to see.",
	"stream-unavailable": "Live updates are unavailable; the graph may be out of date."
};
function Y(e) {
	let t = Object.values(e.graph?.nodes ?? {}).map((e) => ({ ...e })), n = new Set(t.map((e) => e.id)), r = Object.values(e.graph?.edges ?? {}).filter((e) => n.has(e.fromId) && n.has(e.toId)).map((e) => ({ ...e })), i = Object.values(e.graph?.sources ?? {}).map((e) => ({ ...e })), a = e.status;
	return {
		nodes: t,
		edges: r,
		sources: i,
		state: a === "error" || e.error === "snapshot-unavailable" || e.error === "invalid-snapshot" || e.error === "invalid-query" ? "error" : a === "idle" || a === "loading" || a === "invalidated" || a === "refetch-required" ? "loading" : a === "partial" || e.error === "stream-unavailable" ? "partial" : t.length === 0 ? "empty" : "ready",
		...e.error ? { errorMessage: it[e.error] } : {}
	};
}
function X({ workGraph: n, canvas: r, selection: i, onSelectionChange: a, onOpen: o, onReference: s, onRequestCollaboration: c, heading: d = "Work", statusLabelOf: p, className: g, "data-testid": _ = "wrapped-work-graph" }) {
	let v = Ze(() => Y(n), [n]), [y, b] = G(null), [x, S] = G({
		x: 0,
		y: 0,
		zoom: 1
	}), C = i === void 0 ? y : i, w = (e) => {
		i === void 0 && b(e), a?.(e);
	}, T = () => n.retry();
	if (r) return /* @__PURE__ */ K("div", {
		"data-wrapped-work-graph": "canvas",
		"data-state": v.state,
		"data-testid": _,
		className: g,
		children: /* @__PURE__ */ K(r, {
			nodes: v.nodes,
			edges: v.edges,
			sources: v.sources,
			state: v.state,
			errorMessage: v.errorMessage,
			selection: C,
			viewport: x,
			day: n.graph?.scope?.day,
			timezone: n.graph?.scope?.timezone,
			onSelectionChange: w,
			onViewportChange: S,
			onRetry: T,
			onOpen: o,
			onReference: s,
			onRequestCollaboration: c
		})
	});
	let E;
	if (v.state === "loading") E = /* @__PURE__ */ K(u, {
		label: "Loading work…",
		testId: `${_}-loading`
	});
	else if (v.state === "error") E = /* @__PURE__ */ K(f, {
		tone: "error",
		"data-testid": `${_}-error`,
		children: /* @__PURE__ */ q(t, {
			gap: "sm",
			align: "start",
			children: [/* @__PURE__ */ K("span", { children: v.errorMessage ?? "The work graph is unavailable." }), /* @__PURE__ */ K(e, {
				variant: "secondary",
				size: "sm",
				onClick: T,
				children: "Retry"
			})]
		})
	});
	else if (v.state === "empty") E = /* @__PURE__ */ K(l, {
		title: "No work yet",
		description: "Work you can see appears here as it starts."
	});
	else {
		let e = v.sources.filter((e) => e.health !== "available");
		E = /* @__PURE__ */ q(t, {
			gap: "lg",
			children: [
				v.state === "partial" && /* @__PURE__ */ K(f, {
					tone: "warning",
					"data-testid": `${_}-partial`,
					children: v.errorMessage ?? (e.length ? e.map((e) => e.message || `${e.source} is ${e.health}.`).join(" ") : "Some work sources are unavailable or delayed.")
				}),
				/* @__PURE__ */ K(h, {
					nodes: v.nodes,
					edges: v.edges,
					selection: C,
					onSelectionChange: w,
					onOpen: o,
					onReference: s,
					onRequestCollaboration: c
				}),
				/* @__PURE__ */ K(m, {
					nodes: v.nodes,
					edges: v.edges,
					selection: C,
					onSelectionChange: w,
					onOpen: o,
					onReference: s,
					onRequestCollaboration: c,
					heading: d,
					statusLabelOf: p
				})
			]
		});
	}
	return /* @__PURE__ */ K("section", {
		"aria-label": d,
		"data-wrapped-work-graph": "list",
		"data-state": v.state,
		"data-testid": _,
		className: g,
		children: E
	});
}
//#endregion
//#region src/integrations/realtime-modules/WrappedPipelineRun.tsx
var at = {
	received: {
		label: "Queued",
		tone: "pending"
	},
	running: {
		label: "Processing",
		tone: "info"
	},
	awaiting_approval: {
		label: "Ready for review",
		tone: "warning"
	},
	completed: {
		label: "Done",
		tone: "success"
	},
	failed: {
		label: "Failed",
		tone: "error"
	},
	rejected: {
		label: "Rejected",
		tone: "neutral"
	}
};
function Z(e, t = {}) {
	return e.map((e, n) => ({
		step: n + 1,
		label: e.label,
		done: e.status === "completed" || e.status === "skipped",
		active: e.status === "running" || e.status === "awaiting",
		...t[e.id] ? { description: t[e.id] } : {},
		...e.status === "failed" ? { outcome: "failed" } : {}
	}));
}
function ot({ status: l, title: m, subtitle: h, facts: g = [], stepTimes: _, steps: v, progressTitle: y, progressDescription: b, progress: x, remainingMs: S, onRefresh: C, onCancel: w, headerAction: T, onOpenRun: E, picture: D, log: O, compact: k = !1, subject: A, className: j, "data-testid": M = "wrapped-pipeline-run" }) {
	let N = l?.phase, P = l?.details?.steps?.length ? l.details.steps : v ?? [], F = N === "received" || N === "running", I = N ? at[N] : {
		label: "Loading",
		tone: "pending"
	}, L = P.findIndex((e) => e.status === "running" || e.status === "awaiting"), R = L >= 0 ? `step ${L + 1} of ${P.length}` : void 0;
	return k ? /* @__PURE__ */ q(r, {
		gap: "sm",
		align: "center",
		justify: "between",
		"data-pipeline-run": "compact",
		"data-run-phase": N ?? "loading",
		"data-testid": M,
		className: j,
		children: [/* @__PURE__ */ q(r, {
			gap: "xs",
			align: "center",
			wrap: !1,
			className: "min-w-0",
			children: [/* @__PURE__ */ K(d, {
				size: "sm",
				tone: I.tone,
				label: I.label
			}), /* @__PURE__ */ K(n, {
				as: "span",
				size: "sm",
				tone: "primary",
				className: "truncate",
				children: [A ?? m, R].filter(Boolean).join(" · ")
			})]
		}), /* @__PURE__ */ q(r, {
			gap: "xs",
			align: "center",
			wrap: !1,
			children: [w && F && /* @__PURE__ */ K(a, {
				label: "Cancel",
				question: "Cancel this job?",
				confirmLabel: "Cancel job",
				cancelLabel: "Keep running",
				tone: "destructive",
				actionKind: "cancel",
				onConfirm: w,
				"data-testid": `${M}-cancel`
			}), E && /* @__PURE__ */ K(e, {
				variant: "secondary",
				size: "sm",
				onClick: E,
				"data-testid": `${M}-open`,
				children: "Open run"
			})]
		})]
	}) : /* @__PURE__ */ q(i, {
		padding: "none",
		"data-pipeline-run": "",
		"data-run-phase": N ?? "loading",
		"data-testid": M,
		className: j,
		children: [/* @__PURE__ */ K(p, {
			title: m,
			subtitle: h,
			inset: !0,
			meta: /* @__PURE__ */ K(d, {
				size: "sm",
				tone: I.tone,
				label: I.label
			}),
			action: T
		}), /* @__PURE__ */ q(t, {
			gap: "lg",
			className: "p-4",
			children: [
				!l && /* @__PURE__ */ K(u, {
					label: "Reading the run…",
					testId: `${M}-loading`
				}),
				g.length > 0 && /* @__PURE__ */ K(o, {
					items: g,
					layout: "grid",
					responsive: !0,
					"data-testid": `${M}-facts`
				}),
				P.length > 0 && /* @__PURE__ */ K(c, {
					steps: Z(P, _),
					orientation: "horizontal",
					size: "sm",
					wrap: !0,
					"aria-label": `${m} steps`,
					"data-testid": `${M}-steps`
				}),
				D,
				l && F && /* @__PURE__ */ K(s, {
					title: y ?? l.stepLabel ?? m,
					description: b,
					state: N === "received" ? "queued" : "running",
					progress: x,
					startedAt: l.details?.startedAt,
					remainingMs: S,
					onRefresh: C,
					onCancel: w,
					framed: !1,
					"data-testid": `${M}-progress`
				}),
				l && !F && l.detail && /* @__PURE__ */ K(f, {
					tone: N === "failed" ? "error" : N === "completed" ? "success" : "info",
					"data-testid": `${M}-detail`,
					children: l.detail
				}),
				l?.phase === "failed" && !l.detail && l.details?.error && /* @__PURE__ */ K(f, {
					tone: "error",
					"data-testid": `${M}-detail`,
					children: l.details.error
				}),
				O
			]
		})]
	});
}
//#endregion
//#region src/integrations/realtime-modules/HangoutRoomRow.tsx
var Q = te(Qe), $ = Ye(Q), st = xe(J), ct = ye($), lt = Ne($e), ut = Te(rt), dt = V(J), ft = A({
	useGateway: tt,
	useYjsDoc: nt,
	useCanvasDocument: et
}), pt = j(J);
//#endregion
export { He as ALL_REALTIME_CAPABILITIES, je as CONVERSATION_CAPABILITY_NAMES, ft as CanvasDocumentPane, Ue as CapabilityBoundary, fe as CapabilityGate, pt as ConversationCallDock, he as DEFAULT_REALTIME_CAPABILITIES, Q as HangoutRoomRow, $ as HangoutRoomsSection, ae as IncomingCallToast, y as MAX_ATTACHMENT_BYTES, _ as MAX_IMAGE_BYTES, ze as MeetingChatContext, Oe as MeetingChatTargetSwitch, We as NetworkErrorBoundary, U as NewHangoutRoomDialog, lt as RealtimeCapabilityProvider, Be as RealtimeIntegrationsProvider, z as ReconnectingShim, T as WrappedActivityPanel, Me as WrappedAudioVideoSettingsForm, Fe as WrappedBreakoutRoomBanner, be as WrappedBreakoutRoomsPanel, Ee as WrappedCanvasDocument, F as WrappedChatPanel, Je as WrappedConnectionPill, Re as WrappedConversationSurface, ne as WrappedCursorOverlay, C as WrappedFileUploadDrop, ee as WrappedHangoutLayout, ct as WrappedHangoutRoomsList, st as WrappedLVSHangoutLayout, ve as WrappedMediaEffectsPreviewPanel, le as WrappedMediaEffectsTray, H as WrappedNotificationBell, Ke as WrappedNotificationCenter, ot as WrappedPipelineRun, w as WrappedPresencePanel, Ge as WrappedReactionsOverlay, dt as WrappedStreamStage, X as WrappedWorkGraph, v as acceptsDocumentImage, Ce as adaptActivityEvent, x as adaptActivityEvents, B as adaptBreakoutRooms, Se as adaptChatMessage, N as adaptChatMessages, P as adaptFileUploadState, I as adaptFileUploads, E as adaptHangoutParticipant, k as adaptHangoutParticipants, M as adaptMessageReactions, R as adaptNotification, Xe as adaptNotifications, S as adaptPresenceEntry, ie as adaptPresenceRoster, O as adaptReaction, re as adaptReactions, Y as adaptWorkGraphState, _e as applyNetworkShim, Pe as buildCanvasDocumentExtensions, se as canEditCanvasGrant, oe as canvasDocumentSaveState, L as canvasRecoveryKey, ue as capabilityNamesFor, ut as conversationFeaturesFor, A as createCanvasDocumentPane, j as createConversationCallDock, ke as createRealtimeIntegrations, b as decodeCanvasRecovery, Ae as defaultRoomDrafts, pe as encodeCanvasRecovery, D as incomingCallTitle, ge as mediaEffectsChangeCount, Le as meetingChatTitle, W as meetingHandPositions, we as meetingRosterProps, Ve as meetingToolbarItems, Z as pipelineRunSteps, qe as slugifyRoomName, ce as useCanvasRecovery, g as useDocumentImageUpload, de as useMeetingChat, De as useRealtimeCapabilities, Ie as useRealtimeIntegrations, me as withMeetingHands };
