import { n as e } from "../Button-DQoeE5dN.js";
import { n as t, t as n } from "../Stack-CE1FjEn8.js";
import { n as r } from "../Text-XdCzxWMv.js";
import { t as i } from "../Card-D4k-Buoz.js";
import { i as a, n as o, t as s } from "../WorkflowStepper-Bp0A1oaL.js";
import { t as c } from "../KeyValue-Cas8iY09.js";
import { t as l } from "../EmptyState-DqWgLbIq.js";
import { t as u } from "../LoadingState-BQlqtSB5.js";
import { t as d } from "../StatusPill-AqmSksrZ.js";
import { t as f } from "../InlineAlert-Cpf1ooBU.js";
import { t as p } from "../CardHeader-DDkwr0A5.js";
import { n as m, t as h } from "../WorkInspector-BT4Mx_Ul.js";
import { i as g, n as _, r as v, t as y } from "../useDocumentImageUpload-SM3LMrpU.js";
import { $ as b, A as x, B as S, C, Ct as w, D as T, E, F as D, G as O, H as k, I as A, J as j, K as M, L as N, M as P, N as F, O as I, P as L, Q as R, R as z, S as ee, St as te, T as ne, U as re, V as ie, W as ae, X as B, Y as oe, Z as se, _ as ce, _t as le, a as ue, at as V, b as H, bt as U, c as de, ct as fe, d as pe, dt as me, et as he, f as ge, ft as _e, g as ve, gt as ye, h as be, ht as xe, i as Se, it as Ce, j as we, k as Te, l as Ee, lt as De, m as Oe, mt as ke, n as Ae, nt as je, o as Me, ot as Ne, p as Pe, pt as Fe, q as Ie, r as Le, rt as Re, s as ze, st as Be, t as Ve, tt as He, u as Ue, ut as We, v as Ge, vt as Ke, w as qe, wt as Je, x as Ye, xt as Xe, y as Ze, yt as Qe, z as $e } from "../meeting-O8iHTZdh.js";
import { useMemo as et, useState as W } from "react";
import { jsx as G, jsxs as K } from "react/jsx-runtime";
import * as tt from "@connorhoehn/realtime-modules/client/hangout-rooms";
import * as q from "@connorhoehn/realtime-modules/client/video";
import * as nt from "@connorhoehn/realtime-modules/client";
import { useCanvasDocument as rt, useGateway as it, useYjsDoc as at } from "@connorhoehn/realtime-modules/client";
import * as ot from "@connorhoehn/realtime-modules/call";
//#region src/integrations/realtime-modules/WrappedWorkGraph.tsx
var J = {
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
		...e.error ? { errorMessage: J[e.error] } : {}
	};
}
function st({ workGraph: n, canvas: r, selection: i, onSelectionChange: a, onOpen: o, onReference: s, onRequestCollaboration: c, heading: d = "Work", statusLabelOf: p, className: g, "data-testid": _ = "wrapped-work-graph" }) {
	let v = et(() => Y(n), [n]), [y, b] = W(null), [x, S] = W({
		x: 0,
		y: 0,
		zoom: 1
	}), C = i === void 0 ? y : i, w = (e) => {
		i === void 0 && b(e), a?.(e);
	}, T = () => n.retry();
	if (r) return /* @__PURE__ */ G("div", {
		"data-wrapped-work-graph": "canvas",
		"data-state": v.state,
		"data-testid": _,
		className: g,
		children: /* @__PURE__ */ G(r, {
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
	if (v.state === "loading") E = /* @__PURE__ */ G(u, {
		label: "Loading work…",
		testId: `${_}-loading`
	});
	else if (v.state === "error") E = /* @__PURE__ */ G(f, {
		tone: "error",
		"data-testid": `${_}-error`,
		children: /* @__PURE__ */ K(t, {
			gap: "sm",
			align: "start",
			children: [/* @__PURE__ */ G("span", { children: v.errorMessage ?? "The work graph is unavailable." }), /* @__PURE__ */ G(e, {
				variant: "secondary",
				size: "sm",
				onClick: T,
				children: "Retry"
			})]
		})
	});
	else if (v.state === "empty") E = /* @__PURE__ */ G(l, {
		title: "No work yet",
		description: "Work you can see appears here as it starts."
	});
	else {
		let e = v.sources.filter((e) => e.health !== "available");
		E = /* @__PURE__ */ K(t, {
			gap: "lg",
			children: [
				v.state === "partial" && /* @__PURE__ */ G(f, {
					tone: "warning",
					"data-testid": `${_}-partial`,
					children: v.errorMessage ?? (e.length ? e.map((e) => e.message || `${e.source} is ${e.health}.`).join(" ") : "Some work sources are unavailable or delayed.")
				}),
				/* @__PURE__ */ G(h, {
					nodes: v.nodes,
					edges: v.edges,
					selection: C,
					onSelectionChange: w,
					onOpen: o,
					onReference: s,
					onRequestCollaboration: c
				}),
				/* @__PURE__ */ G(m, {
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
	return /* @__PURE__ */ G("section", {
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
var ct = "px-4 pt-3 pb-3 [&_p]:mt-1", X = "text-[11px]", lt = {
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
function ut({ status: l, title: m, titleAs: h = "h3", subtitle: g, facts: _ = [], stepTimes: v, steps: y, progressTitle: b, progressDescription: x, progress: S, remainingMs: C, onRefresh: w, onCancel: T, headerAction: E, onOpenRun: D, picture: O, log: k, compact: A = !1, subject: j, className: M, "data-testid": N = "wrapped-pipeline-run" }) {
	let P = l?.phase, F = l?.details?.steps?.length ? l.details.steps : y ?? [], I = P === "received" || P === "running", L = P ? lt[P] : {
		label: "Loading",
		tone: "pending"
	}, R = F.findIndex((e) => e.status === "running" || e.status === "awaiting"), z = R >= 0 ? `step ${R + 1} of ${F.length}` : void 0;
	return A ? /* @__PURE__ */ K(n, {
		gap: "sm",
		align: "center",
		justify: "between",
		"data-pipeline-run": "compact",
		"data-run-phase": P ?? "loading",
		"data-testid": N,
		className: M,
		children: [/* @__PURE__ */ K(n, {
			gap: "xs",
			align: "center",
			wrap: !1,
			className: "min-w-0",
			children: [/* @__PURE__ */ G(d, {
				size: "sm",
				tone: L.tone,
				label: L.label,
				className: X
			}), /* @__PURE__ */ G(r, {
				as: "span",
				size: "sm",
				tone: "primary",
				className: "truncate",
				children: [j ?? m, z].filter(Boolean).join(" · ")
			})]
		}), /* @__PURE__ */ K(n, {
			gap: "xs",
			align: "center",
			wrap: !1,
			children: [T && I && /* @__PURE__ */ G(a, {
				label: "Cancel",
				question: "Cancel this job?",
				confirmLabel: "Cancel job",
				cancelLabel: "Keep running",
				tone: "destructive",
				actionKind: "cancel",
				onConfirm: T,
				"data-testid": `${N}-cancel`
			}), D && /* @__PURE__ */ G(e, {
				variant: "secondary",
				size: "sm",
				onClick: D,
				"data-testid": `${N}-open`,
				children: "Open run"
			})]
		})]
	}) : /* @__PURE__ */ K(i, {
		padding: "none",
		"data-pipeline-run": "",
		"data-run-phase": P ?? "loading",
		"data-testid": N,
		className: M,
		children: [/* @__PURE__ */ G(p, {
			title: m,
			as: h,
			subtitle: g,
			inset: !0,
			className: ct,
			meta: /* @__PURE__ */ G(d, {
				size: "sm",
				tone: L.tone,
				label: L.label,
				className: X,
				"data-testid": `${N}-state`
			}),
			action: E
		}), /* @__PURE__ */ K(t, {
			gap: "lg",
			className: "p-4",
			children: [
				!l && /* @__PURE__ */ G(u, {
					label: "Reading the run…",
					testId: `${N}-loading`
				}),
				_.length > 0 && /* @__PURE__ */ G(c, {
					items: _,
					layout: "grid",
					responsive: !0,
					"data-testid": `${N}-facts`
				}),
				F.length > 0 && /* @__PURE__ */ G(s, {
					steps: Z(F, v),
					orientation: "horizontal",
					size: "compact",
					wrap: !0,
					"aria-label": `${m} steps`,
					"data-testid": `${N}-steps`
				}),
				O,
				l && I && /* @__PURE__ */ G(o, {
					title: b ?? l.stepLabel ?? m,
					description: x,
					state: P === "received" ? "queued" : "running",
					progress: S,
					startedAt: l.details?.startedAt,
					remainingMs: C,
					onRefresh: w,
					onCancel: T,
					framed: !1,
					"data-testid": `${N}-progress`
				}),
				l && !I && l.detail && /* @__PURE__ */ G(f, {
					tone: P === "failed" ? "error" : P === "completed" ? "success" : "info",
					"data-testid": `${N}-detail`,
					children: l.detail
				}),
				l?.phase === "failed" && !l.detail && l.details?.error && /* @__PURE__ */ G(f, {
					tone: "error",
					"data-testid": `${N}-detail`,
					children: l.details.error
				}),
				k
			]
		})]
	});
}
//#endregion
//#region src/integrations/realtime-modules/HangoutRoomRow.tsx
var Q = Je(tt), $ = Xe(Q), dt = Ne(q), ft = le($), pt = xe(nt), mt = me(ot), ht = Be(q), gt = B({
	useGateway: it,
	useYjsDoc: at,
	useCanvasDocument: rt
}), _t = j(q);
//#endregion
export { E as ACTIVITY_HISTORY_LINES, _e as ALL_REALTIME_CAPABILITIES, fe as CONVERSATION_CAPABILITY_NAMES, gt as CanvasDocumentPane, Ge as CapabilityBoundary, Fe as CapabilityGate, _t as ConversationCallDock, ke as DEFAULT_REALTIME_CAPABILITIES, Q as HangoutRoomRow, $ as HangoutRoomsSection, M as IncomingCallToast, y as MAX_ATTACHMENT_BYTES, _ as MAX_IMAGE_BYTES, Ve as MeetingChatContext, Ae as MeetingChatTargetSwitch, U as NetworkErrorBoundary, te as NewHangoutRoomDialog, pt as RealtimeCapabilityProvider, Re as RealtimeIntegrationsProvider, Qe as ReconnectingShim, T as WrappedActivityPanel, Pe as WrappedAudioVideoSettingsForm, Le as WrappedBreakoutRoomBanner, Se as WrappedBreakoutRoomsPanel, Oe as WrappedCanvasDocument, Te as WrappedChatPanel, Ze as WrappedConnectionPill, De as WrappedConversationSurface, ne as WrappedCursorOverlay, C as WrappedFileUploadDrop, ee as WrappedHangoutLayout, ft as WrappedHangoutRoomsList, dt as WrappedLVSHangoutLayout, be as WrappedMediaEffectsPreviewPanel, ce as WrappedMediaEffectsTray, H as WrappedNotificationBell, Ye as WrappedNotificationCenter, ut as WrappedPipelineRun, I as WrappedPresencePanel, qe as WrappedReactionsOverlay, ht as WrappedStreamStage, st as WrappedWorkGraph, v as acceptsDocumentImage, x as adaptActivityEvent, we as adaptActivityEvents, ue as adaptBreakoutRooms, P as adaptChatMessage, F as adaptChatMessages, L as adaptFileUploadState, D as adaptFileUploads, A as adaptHangoutParticipant, N as adaptHangoutParticipants, z as adaptMessageReactions, $e as adaptNotification, S as adaptNotifications, ie as adaptPresenceEntry, k as adaptPresenceRoster, re as adaptReaction, ae as adaptReactions, Y as adaptWorkGraphState, Ke as applyNetworkShim, oe as buildCanvasDocumentExtensions, se as canEditCanvasGrant, R as canvasDocumentSaveState, he as canvasRecoveryKey, We as capabilityNamesFor, mt as conversationFeaturesFor, B as createCanvasDocumentPane, j as createConversationCallDock, Ce as createRealtimeIntegrations, He as decodeCanvasRecovery, Me as defaultRoomDrafts, je as encodeCanvasRecovery, Ie as incomingCallTitle, ve as mediaEffectsChangeCount, ze as meetingChatTitle, de as meetingHandPositions, Ee as meetingRosterProps, Ue as meetingToolbarItems, O as newestActivityFirst, Z as pipelineRunSteps, w as slugifyRoomName, b as useCanvasRecovery, g as useDocumentImageUpload, pe as useMeetingChat, ye as useRealtimeCapabilities, V as useRealtimeIntegrations, ge as withMeetingHands };
