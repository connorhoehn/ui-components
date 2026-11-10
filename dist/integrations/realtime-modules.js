import { n as e } from "../Button-DQoeE5dN.js";
import { i as t, n, r } from "../Text-fqIvcZp2.js";
import { t as i } from "../Card-D4k-Buoz.js";
import { a, i as o, n as s, t as c } from "../WorkflowStepper-BXpQTau5.js";
import { t as l } from "../EmptyState-BTnHHhgg.js";
import { t as u } from "../LoadingState-BQlqtSB5.js";
import { t as d } from "../StatusPill-CiOnb5N4.js";
import { t as f } from "../InlineAlert-0kPDntLq.js";
import { t as p } from "../CardHeader-DDkwr0A5.js";
import { n as m, t as h } from "../WorkInspector-BT4Mx_Ul.js";
import { i as g, n as _, r as v, t as y } from "../useDocumentImageUpload-dLD3ij2c.js";
import { $ as b, A as x, B as S, C, Ct as w, D as T, E, F as D, G as O, H as k, I as A, J as j, K as M, L as N, M as P, N as F, O as I, P as L, Q as R, R as ee, S as te, St as ne, T as re, U as ie, V as ae, W as oe, X as z, Y as se, Z as ce, _ as le, _t as B, a as V, at as H, b as U, bt as W, c as ue, ct as de, d as fe, dt as pe, et as me, f as he, ft as ge, g as _e, gt as ve, h as ye, ht as be, i as xe, it as Se, j as Ce, k as we, l as Te, lt as Ee, m as De, mt as Oe, n as ke, nt as Ae, o as je, ot as Me, p as Ne, pt as Pe, q as Fe, r as Ie, rt as Le, s as Re, st as ze, t as Be, tt as Ve, u as He, ut as Ue, v as We, vt as Ge, w as Ke, wt as qe, x as Je, xt as Ye, y as Xe, yt as Ze, z as Qe } from "../meeting-BE63MA2W.js";
import { useMemo as $e, useState as G } from "react";
import { jsx as K, jsxs as q } from "react/jsx-runtime";
import * as et from "@connorhoehn/realtime-modules/client/hangout-rooms";
import * as J from "@connorhoehn/realtime-modules/client/video";
import * as tt from "@connorhoehn/realtime-modules/client";
import { useCanvasDocument as nt, useGateway as rt, useYjsDoc as it } from "@connorhoehn/realtime-modules/client";
import * as at from "@connorhoehn/realtime-modules/call";
//#region src/integrations/realtime-modules/WrappedWorkGraph.tsx
var Y = {
	"snapshot-unavailable": "The work graph could not be loaded.",
	"invalid-snapshot": "The work graph came back in a shape this page cannot read.",
	"invalid-query": "This view asked for work it is not allowed to see.",
	"stream-unavailable": "Live updates are unavailable; the graph may be out of date."
};
function X(e) {
	let t = Object.values(e.graph?.nodes ?? {}).map((e) => ({ ...e })), n = new Set(t.map((e) => e.id)), r = Object.values(e.graph?.edges ?? {}).filter((e) => n.has(e.fromId) && n.has(e.toId)).map((e) => ({ ...e })), i = Object.values(e.graph?.sources ?? {}).map((e) => ({ ...e })), a = e.status;
	return {
		nodes: t,
		edges: r,
		sources: i,
		state: a === "error" || e.error === "snapshot-unavailable" || e.error === "invalid-snapshot" || e.error === "invalid-query" ? "error" : a === "idle" || a === "loading" || a === "invalidated" || a === "refetch-required" ? "loading" : a === "partial" || e.error === "stream-unavailable" ? "partial" : t.length === 0 ? "empty" : "ready",
		...e.error ? { errorMessage: Y[e.error] } : {}
	};
}
function ot({ workGraph: n, canvas: r, selection: i, onSelectionChange: a, onOpen: o, onReference: s, onRequestCollaboration: c, heading: d = "Work", statusLabelOf: p, className: g, "data-testid": _ = "wrapped-work-graph" }) {
	let v = $e(() => X(n), [n]), [y, b] = G(null), [x, S] = G({
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
var st = {
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
function ct({ status: l, title: m, subtitle: h, facts: g = [], stepTimes: _, steps: v, progressTitle: y, progressDescription: b, progress: x, remainingMs: S, onRefresh: C, onCancel: w, headerAction: T, onOpenRun: E, picture: D, log: O, compact: k = !1, subject: A, className: j, "data-testid": M = "wrapped-pipeline-run" }) {
	let N = l?.phase, P = l?.details?.steps?.length ? l.details.steps : v ?? [], F = N === "received" || N === "running", I = N ? st[N] : {
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
var Q = qe(et), $ = Ye(Q), lt = Me(J), ut = B($), dt = be(tt), ft = pe(at), pt = ze(J), mt = z({
	useGateway: rt,
	useYjsDoc: it,
	useCanvasDocument: nt
}), ht = j(J);
//#endregion
export { E as ACTIVITY_HISTORY_LINES, ge as ALL_REALTIME_CAPABILITIES, de as CONVERSATION_CAPABILITY_NAMES, mt as CanvasDocumentPane, We as CapabilityBoundary, Pe as CapabilityGate, ht as ConversationCallDock, Oe as DEFAULT_REALTIME_CAPABILITIES, Q as HangoutRoomRow, $ as HangoutRoomsSection, M as IncomingCallToast, y as MAX_ATTACHMENT_BYTES, _ as MAX_IMAGE_BYTES, Be as MeetingChatContext, ke as MeetingChatTargetSwitch, W as NetworkErrorBoundary, ne as NewHangoutRoomDialog, dt as RealtimeCapabilityProvider, Le as RealtimeIntegrationsProvider, Ze as ReconnectingShim, T as WrappedActivityPanel, Ne as WrappedAudioVideoSettingsForm, Ie as WrappedBreakoutRoomBanner, xe as WrappedBreakoutRoomsPanel, De as WrappedCanvasDocument, we as WrappedChatPanel, Xe as WrappedConnectionPill, Ee as WrappedConversationSurface, re as WrappedCursorOverlay, C as WrappedFileUploadDrop, te as WrappedHangoutLayout, ut as WrappedHangoutRoomsList, lt as WrappedLVSHangoutLayout, ye as WrappedMediaEffectsPreviewPanel, le as WrappedMediaEffectsTray, U as WrappedNotificationBell, Je as WrappedNotificationCenter, ct as WrappedPipelineRun, I as WrappedPresencePanel, Ke as WrappedReactionsOverlay, pt as WrappedStreamStage, ot as WrappedWorkGraph, v as acceptsDocumentImage, x as adaptActivityEvent, Ce as adaptActivityEvents, V as adaptBreakoutRooms, P as adaptChatMessage, F as adaptChatMessages, L as adaptFileUploadState, D as adaptFileUploads, A as adaptHangoutParticipant, N as adaptHangoutParticipants, ee as adaptMessageReactions, Qe as adaptNotification, S as adaptNotifications, ae as adaptPresenceEntry, k as adaptPresenceRoster, ie as adaptReaction, oe as adaptReactions, X as adaptWorkGraphState, Ge as applyNetworkShim, se as buildCanvasDocumentExtensions, ce as canEditCanvasGrant, R as canvasDocumentSaveState, me as canvasRecoveryKey, Ue as capabilityNamesFor, ft as conversationFeaturesFor, z as createCanvasDocumentPane, j as createConversationCallDock, Se as createRealtimeIntegrations, Ve as decodeCanvasRecovery, je as defaultRoomDrafts, Ae as encodeCanvasRecovery, Fe as incomingCallTitle, _e as mediaEffectsChangeCount, Re as meetingChatTitle, ue as meetingHandPositions, Te as meetingRosterProps, He as meetingToolbarItems, O as newestActivityFirst, Z as pipelineRunSteps, w as slugifyRoomName, b as useCanvasRecovery, g as useDocumentImageUpload, fe as useMeetingChat, ve as useRealtimeCapabilities, H as useRealtimeIntegrations, he as withMeetingHands };
