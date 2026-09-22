import { n as e } from "./IdentityContext-CQM1qwH6.js";
import "./WebSocketContext-DUvjGLFq.js";
import { t } from "./usePrefersReducedMotion-Cllucr7i.js";
import { t as n } from "./cn-DhjIN-s0.js";
import { n as r } from "./ToastProvider-B0D0SLKU.js";
import { t as i } from "./useEventCallback-Cwx9QVSi.js";
import { a, c as o, d as s, f as c, i as l, l as u, o as d, r as f, s as p, t as m } from "./DetailSection-dz1rNnHD.js";
import { _ as h, a as g, n as _ } from "./overlayStack-BDlo8PJg.js";
import { t as v } from "./IconButton-C3DMtvSx.js";
import { t as y } from "./Banner-C3Wgh62A.js";
import { n as b, t as x } from "./Chart-BbfaF2-B.js";
import { t as S } from "./Chip-DYqbAD3L.js";
import { t as C } from "./Modal-D2qxMX2_.js";
import { t as w } from "./ConfirmDialog-DFxz7N7P.js";
import { t as T } from "./EmptyState-DQYx5Oyy.js";
import { i as E, t as D } from "./focusTrap-w9Uk7DPx.js";
import { t as ee } from "./SkeletonCard-CGe8XFPB.js";
import { n as O, t as te } from "./FileUploadDrop-DZswnZqa.js";
import { t as k } from "./Input-DLknWXri.js";
import { t as A } from "./Textarea-Dz4doxTv.js";
import { t as ne } from "./StatusPill-Db42eiME.js";
import { t as j } from "./Select-CD8ixtYi.js";
import { t as M } from "./NumberInput-PlADgrip.js";
import { t as N } from "./Slider-CUwLSARC.js";
import { t as re } from "./Checkbox-Db43XgBJ.js";
import { t as ie } from "./activationKey-CjbL3LUv.js";
import { n as P, r as F, t as ae } from "./EventStreamContext-CLzG8O5_.js";
import { $ as oe, A as se, B as ce, C as I, D as le, E as ue, F as de, G as fe, H as pe, I as me, J as he, K as ge, L as _e, M as ve, N as ye, O as be, P as xe, R as Se, S as Ce, T as we, U as Te, V as Ee, W as De, X as Oe, Y as ke, Z as Ae, _ as je, a as Me, c as Ne, d as Pe, et as Fe, f as Ie, g as Le, h as Re, i as ze, l as Be, n as Ve, nt as He, o as Ue, p as We, q as Ge, r as Ke, rt as qe, s as Je, t as Ye, tt as Xe, u as Ze, v as Qe, w as $e, x as et, y as tt, z as nt } from "./services-CwJ5tpy0.js";
import { t as rt } from "./rovingFocus-Bj5Y6kwY.js";
/* empty css               */
import { t as it } from "./AnimatedEdge-OTHCEYJd.js";
import { t as at } from "./TraceTimeline-2C-0_L3C.js";
import ot, { createContext as st, memo as ct, useCallback as L, useContext as lt, useEffect as R, useId as ut, useMemo as z, useRef as B, useState as V } from "react";
import { Fragment as H, jsx as U, jsxs as W } from "react/jsx-runtime";
import { Navigate as dt, useNavigate as ft, useParams as pt, useSearchParams as mt } from "react-router";
import { Background as ht, BackgroundVariant as gt, Controls as _t, Handle as G, MiniMap as vt, Position as K, ReactFlow as yt, ReactFlowProvider as bt, useEdgesState as xt, useNodeConnections as St, useNodesState as Ct, useReactFlow as wt } from "@xyflow/react";
//#region src/components/pipelines/validation/handleCompatibility.ts
var Tt = {
	trigger: ["out"],
	llm: ["out", "error"],
	transform: ["out"],
	condition: ["true", "false"],
	action: ["out", "error"],
	fork: "fork",
	join: ["out"],
	approval: ["approved", "rejected"],
	agent: ["out", "error"],
	"mcp-tool": ["out", "error"],
	"knowledge-base": ["out", "error"],
	"graph-query": ["out", "error"],
	memory: ["out", "error"],
	guardrail: ["pass", "block"],
	policy: ["allow", "deny"],
	"ag-ui-output": [],
	"image-source": ["out"],
	"image:save": ["out", "error"],
	scatter: ["out"],
	"image:resize": ["out", "error"],
	"image:transform": ["out", "error"],
	"image:format-convert": ["out", "error"],
	"image:sharpen": ["out", "error"],
	"image:watermark": ["out", "error"],
	"image:crop": ["out"],
	"image:adjust-bw": ["out", "error"],
	"image:adjust-layer": ["out", "error"],
	"image:dimensions": ["out", "error"],
	"image:upscale": ["out", "error"],
	"image:vision-analyze": ["out"],
	"image:vision-classify": ["out", "error"],
	"image:vision-describe": ["out", "error"],
	"image:vision-tag": ["out", "error"],
	"image:vision-extract-text": ["out", "error"],
	"image:generate": ["out", "error"],
	"image:variation": ["out", "error"],
	"image:edit-prompt": ["out", "error"]
}, Et = {
	trigger: null,
	llm: ["in"],
	transform: ["in"],
	condition: ["in"],
	action: ["in"],
	fork: ["in"],
	join: "join",
	approval: ["in"],
	agent: ["in"],
	"mcp-tool": ["in"],
	"knowledge-base": ["in"],
	"graph-query": ["in"],
	memory: ["in"],
	guardrail: ["in"],
	policy: ["in"],
	"ag-ui-output": ["in"],
	"image-source": ["in"],
	"image:save": ["in"],
	scatter: ["in"],
	"image:resize": ["in"],
	"image:transform": ["in"],
	"image:format-convert": ["in"],
	"image:sharpen": ["in"],
	"image:watermark": ["in"],
	"image:crop": ["in"],
	"image:adjust-bw": ["in"],
	"image:adjust-layer": ["in"],
	"image:dimensions": ["in"],
	"image:upscale": ["in"],
	"image:vision-analyze": ["in"],
	"image:vision-classify": ["in"],
	"image:vision-describe": ["in"],
	"image:vision-tag": ["in"],
	"image:vision-extract-text": ["in"],
	"image:generate": ["in"],
	"image:variation": ["in"],
	"image:edit-prompt": ["in"]
};
function Dt(e, t, n, r) {
	return !(!Ot(e, t) || !kt(n, r));
}
function Ot(e, t) {
	let n = Tt[e];
	return n === void 0 ? !1 : n === "fork" ? At(t) : n.includes(t);
}
function kt(e, t) {
	let n = Et[e];
	return n == null ? !1 : n === "join" ? jt(t) : n.includes(t);
}
function At(e) {
	return /^branch-(\d+)$/.exec(e) !== null;
}
function jt(e) {
	return /^in-(\d+)$/.exec(e) !== null;
}
//#endregion
//#region src/components/pipelines/nodes/BaseNode.tsx
var Mt = {
	idle: {
		card: "border border-border-field bg-surface",
		dot: "bg-state-idle"
	},
	pending: {
		card: "border border-dashed border-info-border bg-info-bg",
		dot: "bg-state-pending"
	},
	running: {
		card: "border-2 border-info bg-info-bg",
		dot: "bg-info"
	},
	awaiting: {
		card: "border-2 border-warning bg-warning-bg",
		dot: "bg-warning"
	},
	completed: {
		card: "border border-success bg-success-bg",
		dot: "bg-success"
	},
	failed: {
		card: "border-2 border-danger bg-danger-bg",
		dot: "bg-danger"
	},
	skipped: {
		card: "border border-dashed border-border-field bg-surface-inset opacity-50",
		dot: "bg-state-idle"
	}
}, Nt = {
	source: {
		bar: "bg-cat-source",
		chip: "w-5 h-5 rounded-full bg-cat-source/15"
	},
	transform: {
		bar: "bg-cat-transform",
		chip: "w-5 h-5 rounded-md bg-cat-transform/15"
	},
	ai: {
		bar: "bg-cat-ai",
		chip: "w-5 h-5 rounded-md bg-gradient-to-br from-cat-ai/25 to-cat-ai/5"
	},
	control: {
		bar: "bg-cat-control",
		chip: "w-5 h-5 rounded-[4px] bg-cat-control/15 rotate-45",
		glyph: "-rotate-45"
	},
	sink: {
		bar: "bg-cat-sink",
		chip: "w-5 h-5 rounded-md bg-cat-sink/15"
	},
	human: {
		bar: "bg-cat-human",
		chip: "w-7 h-5 rounded-full bg-cat-human/15"
	}
};
function q(e) {
	let r = ze(), i = e.nodeType ? !r(e.nodeType) : !1, { icon: a, subtitle: o, state: s, body: c, footer: l, selected: u, onRetry: d, hasBreakpoint: f, pausedAtBreakpoint: p, ariaLabel: m, category: h, children: g } = e, _ = Mt[s] ?? Mt.idle, v = h ? Nt[h] : void 0, y = t(), [b, x] = V(!1), S = s === "failed" && typeof d == "function", C = (e) => {
		e.preventDefault(), e.stopPropagation(), d?.();
	}, w = !y && s === "pending" ? "animate-[basenode-pulse_2000ms_cubic-bezier(0.25,0.1,0.25,1)_infinite]" : !y && s === "running" ? "animate-[basenode-pulse_1500ms_linear_infinite]" : "", T = !!(c || l || S), E = !!(c || l), D = o ? `${o}, state: ${s}` : `Node, state: ${s}`;
	return /* @__PURE__ */ W("div", {
		className: n("w-[200px] rounded-lg relative font-inherit text-text-primary box-border outline-none transition-[border-color,background-color] duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2", p ? "border-2 border-warning bg-warning-bg shadow-[0_0_0_3px_rgba(217,119,6,0.25),0_1px_2px_rgba(15,23,42,0.06)]" : _.card, !p && u && "shadow-[0_0_0_4px_rgba(100,108,255,0.18),0_1px_2px_rgba(15,23,42,0.06)]", !p && !u && "shadow-[0_1px_2px_rgba(15,23,42,0.06)]", y && "transition-none"),
		role: "button",
		tabIndex: 0,
		"aria-label": m ?? D,
		"aria-selected": !!u,
		"data-state": s,
		"data-node-state": s,
		"data-node-category": h,
		"data-pipeline-node": "true",
		children: [
			v && /* @__PURE__ */ U("span", {
				"aria-hidden": "true",
				"data-testid": "category-accent",
				className: n("absolute left-0 top-0 bottom-0 w-[3px] rounded-l-[7px] pointer-events-none", v.bar)
			}),
			f && /* @__PURE__ */ U("span", {
				"aria-label": "breakpoint",
				"data-testid": "breakpoint-dot",
				className: "absolute -top-1 -left-1 w-2.5 h-2.5 rounded-full bg-danger border-[1.5px] border-white z-[1]"
			}),
			/* @__PURE__ */ W("div", {
				className: n("flex items-center gap-2 h-7 px-2.5", T && "border-b border-border"),
				children: [
					v ? /* @__PURE__ */ U("span", {
						"aria-hidden": "true",
						"data-testid": "category-chip",
						className: n("flex items-center justify-center shrink-0", v.chip),
						children: /* @__PURE__ */ U("span", {
							className: n("text-xs leading-none", v.glyph),
							children: a
						})
					}) : /* @__PURE__ */ U("span", {
						className: "text-sm leading-none shrink-0",
						"aria-hidden": "true",
						children: a
					}),
					/* @__PURE__ */ U("span", {
						className: "flex-1 min-w-0 text-xs font-semibold text-text-primary overflow-hidden text-ellipsis whitespace-nowrap",
						children: o
					}),
					i && /* @__PURE__ */ U("span", {
						"data-testid": "node-preview-badge",
						title: "This deployment has no executor for this node type — the step will not run.",
						className: "shrink-0 rounded-full border border-warning-border bg-warning-bg px-1.5 text-[8px] font-semibold uppercase tracking-wide text-warning-fg",
						children: "preview"
					}),
					/* @__PURE__ */ U("span", {
						className: n("w-2 h-2 rounded-full shrink-0", _.dot, w),
						"aria-label": `state: ${s}`
					})
				]
			}),
			S && /* @__PURE__ */ U("div", {
				className: n("flex px-2.5 py-1.5", E && "border-b border-border"),
				children: /* @__PURE__ */ U("button", {
					type: "button",
					className: n("cursor-pointer appearance-none font-inherit text-[11px] font-medium leading-tight px-2 py-0.5 rounded-full border border-danger text-danger-fg transition-colors duration-[120ms] ease-[cubic-bezier(0.4,0,0.2,1)]", b ? "bg-danger-bg" : "bg-transparent", y && "transition-none"),
					onClick: C,
					onMouseDown: (e) => e.stopPropagation(),
					onMouseEnter: () => x(!0),
					onMouseLeave: () => x(!1),
					"aria-label": "Retry from here",
					children: "⟳ Retry from here"
				})
			}),
			c != null && /* @__PURE__ */ U("div", {
				className: "px-2.5 py-2 text-[13px] leading-[1.4] text-text-secondary",
				children: c
			}),
			l != null && /* @__PURE__ */ U("div", {
				className: "border-t border-border px-2.5 py-1.5 text-xs text-text-secondary",
				children: l
			}),
			g
		]
	});
}
//#endregion
//#region src/components/pipelines/nodes/categories.ts
var Pt = {
	trigger: "source",
	"image-source": "source",
	"knowledge-base": "source",
	"graph-query": "source",
	transform: "transform",
	memory: "transform",
	"image:resize": "transform",
	"image:transform": "transform",
	"image:format-convert": "transform",
	"image:sharpen": "transform",
	"image:watermark": "transform",
	"image:crop": "transform",
	"image:adjust-bw": "transform",
	"image:adjust-layer": "transform",
	"image:dimensions": "transform",
	llm: "ai",
	agent: "ai",
	"mcp-tool": "ai",
	"image:vision-analyze": "ai",
	"image:vision-classify": "ai",
	"image:vision-describe": "ai",
	"image:vision-tag": "ai",
	"image:vision-extract-text": "ai",
	"image:generate": "ai",
	"image:variation": "ai",
	"image:edit-prompt": "ai",
	"image:upscale": "ai",
	condition: "control",
	fork: "control",
	join: "control",
	scatter: "control",
	guardrail: "control",
	policy: "control",
	action: "sink",
	"ag-ui-output": "sink",
	"image:save": "sink",
	approval: "human"
};
function J(e) {
	return Pt[e];
}
//#endregion
//#region src/components/pipelines/nodes/shared/ports.ts
var Ft = {
	image: "!w-2.5 !h-2.5 !rounded-sm !bg-accent !border-accent",
	text: "!w-2.5 !h-2.5 !bg-surface-emphasis",
	data: "!w-2.5 !h-2.5 !bg-neutral",
	control: "!w-2 !h-2 !bg-warning",
	error: "!w-2 !h-2 !bg-danger"
};
function Y(e) {
	return Ft[e];
}
//#endregion
//#region src/components/pipelines/nodes/trigger/TriggerNode.tsx
function It(e) {
	switch (e.triggerType) {
		case "manual": return "Manual";
		case "document.finalize": return "On doc.finalize";
		case "document.comment": return "On doc.comment";
		case "document.submit": return "On doc.submit";
		case "schedule": return `Schedule: ${e.schedule ?? "—"}`;
		case "webhook": return `Webhook: ${e.webhookPath ?? "/—"}`;
		default: return "Trigger";
	}
}
function Lt(e) {
	return e.triggerType === "schedule" ? e.schedule ? `cron: ${e.schedule}` : "No schedule set" : e.triggerType === "webhook" ? e.webhookPath ? `POST ${e.webhookPath}` : "No path set" : e.triggerType.startsWith("document.") ? e.documentTypeId ? `Doc type: ${e.documentTypeId}` : "Any document" : "Fires on user click";
}
function Rt(e) {
	let { id: t, data: n, selected: r } = e, i = I(t), a = i?.status === "cancelled" ? "failed" : i?.status, o = (n._state && n._state !== "idle" ? n._state : void 0) ?? a ?? n._state ?? "idle", s = ue(), c = o === "failed" && s ? () => s(t) : void 0, l = `Trigger node, ${It(n)}, state: ${o}`;
	return /* @__PURE__ */ U(q, {
		icon: "▶",
		subtitle: It(n),
		state: o,
		category: J("trigger"),
		body: /* @__PURE__ */ U("span", {
			className: "italic",
			children: Lt(n)
		}),
		selected: r,
		onRetry: c,
		ariaLabel: l,
		hasBreakpoint: n._hasBreakpoint,
		pausedAtBreakpoint: n._pausedAtBreakpoint,
		children: /* @__PURE__ */ U(G, {
			type: "source",
			position: K.Right,
			id: "out",
			className: Y("data")
		})
	});
}
//#endregion
//#region src/components/pipelines/nodes/llm/LLMNode.tsx
function zt(e) {
	if (!e || e.trim().length === 0) return "Not configured";
	let t = e.split("\n").slice(0, 2).join(" ").trim();
	return t.length > 120 ? `${t.slice(0, 117)}…` : t;
}
function Bt({ info: e }) {
	let [t, n] = V(!1), r = t ? e.response : e.response.length > 60 ? `${e.response.slice(0, 60)}…` : e.response, i = e.tokensIn != null || e.tokensOut != null;
	return /* @__PURE__ */ W("div", { children: [/* @__PURE__ */ W("button", {
		type: "button",
		onClick: () => n((e) => !e),
		className: "bg-transparent border-none p-0 cursor-pointer font-inherit text-xs text-text-secondary font-medium text-left",
		children: [
			t ? "▾" : "▸",
			" Response",
			i && /* @__PURE__ */ W("span", {
				className: "ml-1.5 text-[11px] text-text-tertiary",
				children: [
					e.tokensIn ?? 0,
					" → ",
					e.tokensOut ?? 0,
					" tokens"
				]
			}),
			e.streamOpening && /* @__PURE__ */ U("span", {
				className: "ml-1.5 text-[11px] text-info-fg",
				"data-testid": "llm-stream-opening",
				title: "LLM stream is open — waiting for the first token",
				children: "· stream open — waiting…"
			}),
			!e.streamOpening && e.streaming && /* @__PURE__ */ U("span", {
				className: "ml-1.5 text-[11px] text-text-tertiary",
				children: "· streaming…"
			})
		]
	}), /* @__PURE__ */ U("div", {
		className: t ? "mt-1 font-mono text-[11px] leading-[1.4] text-text-primary whitespace-pre-wrap break-words line-clamp-6" : "mt-1 font-mono text-[11px] leading-[1.4] text-text-primary whitespace-pre-wrap break-words max-h-[1.4em] overflow-hidden",
		children: r
	})] });
}
function Vt(e) {
	let { id: t, data: n, selected: r } = e, i = I(t), a = i?.status === "cancelled" ? "failed" : i?.status, o = (n._state && n._state !== "idle" ? n._state : void 0) ?? a ?? n._state ?? "idle", s = i?.llm, c = o === "running" && s?.streamOpened === !0 && (s?.tokensOut ?? 0) === 0, l = o === "running" && s !== void 0 && (s.tokensOut ?? 0) > 0, u = ue(), d = o === "failed" && u ? () => u(t) : void 0, f = /* @__PURE__ */ U("span", {
		className: "italic",
		children: zt(n.userPromptTemplate)
	}), p = (s ? {
		response: s.response ?? "",
		tokensIn: s.tokensIn,
		tokensOut: s.tokensOut,
		streaming: l,
		streamOpening: c
	} : void 0) ?? n._llmResponse, m = p ? /* @__PURE__ */ U(Bt, { info: p }) : void 0, h = (n.systemPrompt ?? "").replace(/\s+/g, " ").trim(), g = h.length === 0 ? "no system prompt" : `system prompt: ${h.length > 60 ? `${h.slice(0, 60)}…` : h}`, _ = `LLM node, ${n.model || n.provider}, ${g}, state: ${o}`;
	return /* @__PURE__ */ W(q, {
		icon: "🧠",
		subtitle: n.model || n.provider,
		state: o,
		category: J("llm"),
		body: f,
		footer: m,
		selected: r,
		onRetry: d,
		ariaLabel: _,
		hasBreakpoint: n._hasBreakpoint,
		pausedAtBreakpoint: n._pausedAtBreakpoint,
		children: [
			/* @__PURE__ */ U(G, {
				type: "target",
				position: K.Left,
				id: "in",
				className: Y("data")
			}),
			/* @__PURE__ */ U(G, {
				type: "source",
				position: K.Right,
				id: "out",
				className: `${Y("text")} !top-[40%]`
			}),
			/* @__PURE__ */ U(G, {
				type: "source",
				position: K.Right,
				id: "error",
				className: `${Y("error")} !top-[60%]`
			})
		]
	});
}
//#endregion
//#region src/components/pipelines/nodes/transform/TransformNode.tsx
function Ht(e) {
	if (!e) return "—";
	let t = e.replace(/\s+/g, " ").trim();
	return t.length > 60 ? `${t.slice(0, 60)}…` : t;
}
function Ut(e) {
	let { id: t, data: n, selected: r } = e, i = I(t), a = i?.status === "cancelled" ? "failed" : i?.status, o = (n._state && n._state !== "idle" ? n._state : void 0) ?? a ?? n._state ?? "idle", s = ue(), c = o === "failed" && s ? () => s(t) : void 0;
	return /* @__PURE__ */ W(q, {
		icon: "✨",
		subtitle: n.transformType,
		state: o,
		category: J("transform"),
		body: /* @__PURE__ */ U("span", {
			className: "font-mono text-xs text-text-primary bg-surface-inset px-1.5 py-0.5 rounded inline-block max-w-full overflow-hidden text-ellipsis whitespace-nowrap",
			children: Ht(n.expression)
		}),
		selected: r,
		onRetry: c,
		hasBreakpoint: n._hasBreakpoint,
		pausedAtBreakpoint: n._pausedAtBreakpoint,
		children: [/* @__PURE__ */ U(G, {
			type: "target",
			position: K.Left,
			id: "in",
			className: Y("data")
		}), /* @__PURE__ */ U(G, {
			type: "source",
			position: K.Right,
			id: "out",
			className: Y("data")
		})]
	});
}
//#endregion
//#region src/components/pipelines/nodes/condition/ConditionNode.tsx
function Wt(e) {
	if (!e) return "—";
	let t = e.replace(/\s+/g, " ").trim();
	return t.length > 60 ? `${t.slice(0, 60)}…` : t;
}
function Gt(e) {
	let { id: t, data: n, selected: r } = e, i = I(t), a = i?.status === "cancelled" ? "failed" : i?.status, o = (n._state && n._state !== "idle" ? n._state : void 0) ?? a ?? n._state ?? "idle", s = ue(), c = o === "failed" && s ? () => s(t) : void 0;
	return /* @__PURE__ */ W(q, {
		icon: "❓",
		subtitle: n.label || "condition",
		state: o,
		category: J("condition"),
		body: /* @__PURE__ */ U("span", {
			className: "font-mono text-xs text-text-primary bg-surface-inset px-1.5 py-0.5 rounded inline-block max-w-full overflow-hidden text-ellipsis whitespace-nowrap",
			children: Wt(n.expression)
		}),
		selected: r,
		onRetry: c,
		hasBreakpoint: n._hasBreakpoint,
		pausedAtBreakpoint: n._pausedAtBreakpoint,
		children: [
			/* @__PURE__ */ U(G, {
				type: "target",
				position: K.Left,
				id: "in",
				className: Y("data")
			}),
			/* @__PURE__ */ U(G, {
				type: "source",
				position: K.Right,
				id: "true",
				className: `${Y("control")} !top-[40%]`
			}),
			/* @__PURE__ */ U(G, {
				type: "source",
				position: K.Right,
				id: "false",
				className: `${Y("control")} !top-[60%]`
			})
		]
	});
}
//#endregion
//#region src/components/pipelines/nodes/action/ActionNode.tsx
function Kt(e) {
	let t = e.config ?? {};
	switch (e.actionType) {
		case "update-document": return `Update ${typeof t.documentId == "string" ? t.documentId : "(current)"}`;
		case "post-comment": return `Comment on ${typeof t.target == "string" ? t.target : "(current doc)"}`;
		case "notify": return `Notify ${typeof t.channel == "string" ? t.channel : "recipients"}`;
		case "webhook": return `POST → ${typeof t.url == "string" ? t.url : "(no URL)"}`;
		case "mcp-tool": return `Invoke ${typeof t.tool == "string" ? t.tool : "(no tool)"}`;
		default: return "Action";
	}
}
function qt(e) {
	let { id: t, data: n, selected: r } = e, i = I(t), a = i?.status === "cancelled" ? "failed" : i?.status, o = (n._state && n._state !== "idle" ? n._state : void 0) ?? a ?? n._state ?? "idle", s = ue(), c = o === "failed" && s ? () => s(t) : void 0;
	return /* @__PURE__ */ W(q, {
		icon: "⚡",
		subtitle: n.actionType,
		state: o,
		category: J("action"),
		body: /* @__PURE__ */ U("span", {
			className: "italic",
			children: Kt(n)
		}),
		selected: r,
		onRetry: c,
		hasBreakpoint: n._hasBreakpoint,
		pausedAtBreakpoint: n._pausedAtBreakpoint,
		children: [
			/* @__PURE__ */ U(G, {
				type: "target",
				position: K.Left,
				id: "in",
				className: Y("data")
			}),
			/* @__PURE__ */ U(G, {
				type: "source",
				position: K.Right,
				id: "out",
				className: `${Y("data")} !top-[40%]`
			}),
			/* @__PURE__ */ U(G, {
				type: "source",
				position: K.Right,
				id: "error",
				className: `${Y("error")} !top-[60%]`
			})
		]
	});
}
//#endregion
//#region src/components/pipelines/nodes/server-step/ServerStepNode.tsx
function Jt(e) {
	let { id: t, data: n, selected: r } = e, i = n.type ?? n.nodeType ?? "step", a = I(t), o = a?.status === "cancelled" ? "failed" : a?.status, s = (n._state && n._state !== "idle" ? n._state : void 0) ?? o ?? n._state ?? "idle", c = ue(), l = s === "failed" && c ? () => c(t) : void 0;
	return /* @__PURE__ */ W(q, {
		icon: "⚙",
		subtitle: i,
		state: s,
		body: /* @__PURE__ */ W("span", {
			"data-testid": "server-step-label",
			children: [n.label ?? i, n.optional ? /* @__PURE__ */ U("span", {
				className: "ml-1 text-text-tertiary",
				children: "(optional)"
			}) : null]
		}),
		ariaLabel: `${i} step${n.label ? `, ${n.label}` : ""}, ${s}`,
		selected: r,
		onRetry: l,
		hasBreakpoint: n._hasBreakpoint,
		pausedAtBreakpoint: n._pausedAtBreakpoint,
		children: [
			/* @__PURE__ */ U(G, {
				type: "target",
				position: K.Left,
				id: "in",
				className: Y("data")
			}),
			/* @__PURE__ */ U(G, {
				type: "source",
				position: K.Right,
				id: "out",
				className: `${Y("data")} !top-[40%]`
			}),
			/* @__PURE__ */ U(G, {
				type: "source",
				position: K.Right,
				id: "error",
				className: `${Y("error")} !top-[60%]`
			})
		]
	});
}
//#endregion
//#region src/components/pipelines/nodes/fork/ForkNode.tsx
function Yt(e) {
	let { id: t, data: n, selected: r } = e, i = I(t), a = i?.status === "cancelled" ? "failed" : i?.status, o = (n._state && n._state !== "idle" ? n._state : void 0) ?? a ?? n._state ?? "idle", s = ue(), c = o === "failed" && s ? () => s(t) : void 0, l = Math.max(2, Math.min(8, n.branchCount ?? 2)), u = Array.from({ length: l }, (e, t) => {
		let r = n.branchLabels?.[t];
		return r && r.trim().length > 0 ? r : `branch ${t}`;
	});
	return /* @__PURE__ */ W(q, {
		icon: "⑂",
		subtitle: `${l} branches`,
		state: o,
		category: J("fork"),
		body: /* @__PURE__ */ U("ul", {
			className: "m-0 p-0 list-none flex flex-col gap-0.5 text-xs text-text-secondary",
			children: u.map((e, t) => /* @__PURE__ */ W("li", {
				className: "overflow-hidden text-ellipsis whitespace-nowrap",
				children: ["• ", e]
			}, t))
		}),
		selected: r,
		onRetry: c,
		hasBreakpoint: n._hasBreakpoint,
		pausedAtBreakpoint: n._pausedAtBreakpoint,
		children: [/* @__PURE__ */ U(G, {
			type: "target",
			position: K.Left,
			id: "in",
			className: Y("data")
		}), u.map((e, t) => {
			let n = (t + 1) / (l + 1) * 100;
			return /* @__PURE__ */ U(G, {
				type: "source",
				position: K.Right,
				id: `branch-${t}`,
				className: Y("control"),
				style: { top: `${n}%` }
			}, t);
		})]
	});
}
//#endregion
//#region src/components/pipelines/nodes/join/JoinNode.tsx
function Xt(e) {
	return e.mode === "all" ? "all" : e.mode === "any" ? "any" : `${e.n ?? 1} of many`;
}
function Zt(e) {
	switch (e) {
		case "deep-merge": return "Deep merge";
		case "array-collect": return "Array collect";
		case "last-writer-wins": return "Last writer wins";
		default: return String(e);
	}
}
function Qt(e) {
	let { id: t, data: n, selected: r } = e, i = I(t), a = i?.status === "cancelled" ? "failed" : i?.status, o = (n._state && n._state !== "idle" ? n._state : void 0) ?? a ?? n._state ?? "idle", s = ue(), c = o === "failed" && s ? () => s(t) : void 0, l = St({ handleType: "target" }), u = Math.max(2, l.length + 1);
	return /* @__PURE__ */ W(q, {
		icon: "⑃",
		subtitle: Xt(n),
		state: o,
		category: J("join"),
		body: /* @__PURE__ */ U("span", {
			className: "italic",
			children: Zt(n.mergeStrategy)
		}),
		selected: r,
		onRetry: c,
		hasBreakpoint: n._hasBreakpoint,
		pausedAtBreakpoint: n._pausedAtBreakpoint,
		children: [Array.from({ length: u }, (e, t) => {
			let n = (t + 1) / (u + 1) * 100;
			return /* @__PURE__ */ U(G, {
				type: "target",
				position: K.Left,
				id: `in-${t}`,
				className: Y("control"),
				style: { top: `${n}%` }
			}, `in-${t}`);
		}), /* @__PURE__ */ U(G, {
			type: "source",
			position: K.Right,
			id: "out",
			className: Y("data")
		})]
	});
}
//#endregion
//#region src/components/pipelines/nodes/approval/ApprovalNode.tsx
function $t(e) {
	return e.type === "role" ? `@${e.value}` : e.value;
}
function en(e) {
	let { id: t, data: n, selected: r } = e, i = I(t), a = i?.status === "cancelled" ? "failed" : i?.status, o = (n._state && n._state !== "idle" ? n._state : void 0) ?? a ?? n._state ?? "idle", s = ue(), c = o === "failed" && s ? () => s(t) : void 0, l = n.approvers ?? [], u = l.length, d = n.requiredCount ?? 0, f = `${u} approver${u === 1 ? "" : "s"}, ${d}/${u} required`, p = l.slice(0, 2), m = Math.max(0, l.length - 2), h = l.length === 0 ? /* @__PURE__ */ U("span", {
		className: "italic text-text-tertiary",
		children: "No approvers"
	}) : /* @__PURE__ */ W("div", {
		className: "flex flex-wrap gap-1",
		children: [p.map((e, t) => /* @__PURE__ */ U("span", {
			className: "inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-surface-panel text-text-secondary border border-border max-w-[120px] overflow-hidden text-ellipsis whitespace-nowrap",
			children: $t(e)
		}, t)), m > 0 && /* @__PURE__ */ W("span", {
			className: "inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-surface-inset text-text-tertiary border border-border max-w-[120px] overflow-hidden text-ellipsis whitespace-nowrap",
			children: [
				"+",
				m,
				" more"
			]
		})]
	});
	return /* @__PURE__ */ W(q, {
		icon: "✋",
		subtitle: f,
		state: o,
		category: J("approval"),
		body: h,
		selected: r,
		onRetry: c,
		hasBreakpoint: n._hasBreakpoint,
		pausedAtBreakpoint: n._pausedAtBreakpoint,
		children: [
			/* @__PURE__ */ U(G, {
				type: "target",
				position: K.Left,
				id: "in",
				className: Y("data")
			}),
			/* @__PURE__ */ U(G, {
				type: "source",
				position: K.Right,
				id: "approved",
				className: `${Y("data")} !top-[40%]`
			}),
			/* @__PURE__ */ U(G, {
				type: "source",
				position: K.Right,
				id: "rejected",
				className: `${Y("data")} !top-[60%]`
			})
		]
	});
}
//#endregion
//#region src/components/pipelines/nodes/agent/AgentNode.tsx
function tn({ id: e, data: t, selected: n }) {
	let r = I(e), i = r?.status === "cancelled" ? "failed" : r?.status, a = t._state ?? i ?? "idle", o = ue(), s = t.allowedTools?.length ?? 0, c = t.prompt?.trim() ? t.prompt.trim().split("\n")[0].slice(0, 48) : "No prompt", l = s === 0 ? `${t.model ?? "sonnet"} · no tools` : `${t.model ?? "sonnet"} · ${s} tool${s === 1 ? "" : "s"}`;
	return /* @__PURE__ */ W(q, {
		icon: "🤖",
		subtitle: c,
		state: a,
		category: J("agent"),
		body: /* @__PURE__ */ U("span", {
			className: s === 0 ? "text-[11px] text-warning-fg" : "text-[11px]",
			children: l
		}),
		selected: n,
		onRetry: a === "failed" && r && o ? () => o(e) : void 0,
		hasBreakpoint: t._hasBreakpoint,
		pausedAtBreakpoint: t._pausedAtBreakpoint,
		children: [
			/* @__PURE__ */ U(G, {
				type: "target",
				position: K.Left,
				id: "in",
				className: Y("data")
			}),
			/* @__PURE__ */ U(G, {
				type: "source",
				position: K.Right,
				id: "out",
				className: `${Y("data")} !top-[40%]`
			}),
			/* @__PURE__ */ U(G, {
				type: "source",
				position: K.Right,
				id: "error",
				className: `${Y("error")} !top-[60%]`
			})
		]
	});
}
//#endregion
//#region src/components/pipelines/nodes/mcp-tool/McpToolNode.tsx
function nn({ id: e, data: t, selected: n }) {
	let r = I(e), i = r?.status === "cancelled" ? "failed" : r?.status, a = t._state ?? i ?? "idle", o = ue(), s = t.toolName || "Not configured";
	return /* @__PURE__ */ W(q, {
		icon: "🔌",
		subtitle: s,
		state: a,
		category: J("mcp-tool"),
		body: t.gatewayUrl ? /* @__PURE__ */ U("span", {
			className: "text-[11px]",
			children: t.gatewayUrl
		}) : void 0,
		selected: n,
		onRetry: a === "failed" && r && o ? () => o(e) : void 0,
		hasBreakpoint: t._hasBreakpoint,
		pausedAtBreakpoint: t._pausedAtBreakpoint,
		children: [
			/* @__PURE__ */ U(G, {
				type: "target",
				position: K.Left,
				id: "in",
				className: Y("data")
			}),
			/* @__PURE__ */ U(G, {
				type: "source",
				position: K.Right,
				id: "out",
				className: `${Y("data")} !top-[40%]`
			}),
			/* @__PURE__ */ U(G, {
				type: "source",
				position: K.Right,
				id: "error",
				className: `${Y("error")} !top-[60%]`
			})
		]
	});
}
//#endregion
//#region src/components/pipelines/nodes/knowledge-base/KnowledgeBaseNode.tsx
function rn({ id: e, data: t, selected: n }) {
	let r = I(e), i = r?.status === "cancelled" ? "failed" : r?.status, a = t._state ?? i ?? "idle", o = ue(), s = t.knowledgeBaseId || "Not configured", c = `Top ${t.topK} chunks${t.scoreThreshold ? ` (≥${t.scoreThreshold})` : ""}`;
	return /* @__PURE__ */ W(q, {
		icon: "📚",
		subtitle: s,
		state: a,
		category: J("knowledge-base"),
		body: /* @__PURE__ */ U("span", {
			className: "text-[11px]",
			children: c
		}),
		selected: n,
		onRetry: a === "failed" && r && o ? () => o(e) : void 0,
		hasBreakpoint: t._hasBreakpoint,
		pausedAtBreakpoint: t._pausedAtBreakpoint,
		children: [
			/* @__PURE__ */ U(G, {
				type: "target",
				position: K.Left,
				id: "in",
				className: Y("data")
			}),
			/* @__PURE__ */ U(G, {
				type: "source",
				position: K.Right,
				id: "out",
				className: `${Y("data")} !top-[40%]`
			}),
			/* @__PURE__ */ U(G, {
				type: "source",
				position: K.Right,
				id: "error",
				className: `${Y("error")} !top-[60%]`
			})
		]
	});
}
//#endregion
//#region src/components/pipelines/nodes/graph-query/GraphQueryNode.tsx
function an({ id: e, data: t, selected: n }) {
	let r = I(e), i = r?.status === "cancelled" ? "failed" : r?.status, a = t._state ?? i ?? "idle", o = ue(), s = t.graphId || "Not configured", c = t.query.length > 40 ? `${t.query.slice(0, 37)}...` : t.query;
	return /* @__PURE__ */ W(q, {
		icon: "🕸️",
		subtitle: s,
		state: a,
		category: J("graph-query"),
		body: /* @__PURE__ */ U("span", {
			className: "text-[11px] font-mono",
			children: c
		}),
		selected: n,
		onRetry: a === "failed" && r && o ? () => o(e) : void 0,
		hasBreakpoint: t._hasBreakpoint,
		pausedAtBreakpoint: t._pausedAtBreakpoint,
		children: [
			/* @__PURE__ */ U(G, {
				type: "target",
				position: K.Left,
				id: "in",
				className: Y("data")
			}),
			/* @__PURE__ */ U(G, {
				type: "source",
				position: K.Right,
				id: "out",
				className: `${Y("data")} !top-[40%]`
			}),
			/* @__PURE__ */ U(G, {
				type: "source",
				position: K.Right,
				id: "error",
				className: `${Y("error")} !top-[60%]`
			})
		]
	});
}
//#endregion
//#region src/components/pipelines/nodes/memory/MemoryNode.tsx
function on({ id: e, data: t, selected: n }) {
	let r = I(e), i = r?.status === "cancelled" ? "failed" : r?.status, a = t._state ?? i ?? "idle", o = ue(), s = `${t.mode} ${t.scope}`, c = t.namespace ? `ns: ${t.namespace}` : "No namespace";
	return /* @__PURE__ */ W(q, {
		icon: "💾",
		subtitle: s,
		state: a,
		category: J("memory"),
		body: /* @__PURE__ */ U("span", {
			className: "text-[11px]",
			children: c
		}),
		selected: n,
		onRetry: a === "failed" && r && o ? () => o(e) : void 0,
		hasBreakpoint: t._hasBreakpoint,
		pausedAtBreakpoint: t._pausedAtBreakpoint,
		children: [
			/* @__PURE__ */ U(G, {
				type: "target",
				position: K.Left,
				id: "in",
				className: Y("data")
			}),
			/* @__PURE__ */ U(G, {
				type: "source",
				position: K.Right,
				id: "out",
				className: `${Y("data")} !top-[40%]`
			}),
			/* @__PURE__ */ U(G, {
				type: "source",
				position: K.Right,
				id: "error",
				className: `${Y("error")} !top-[60%]`
			})
		]
	});
}
//#endregion
//#region src/components/pipelines/nodes/guardrail/GuardrailNode.tsx
function sn({ id: e, data: t, selected: n }) {
	let r = I(e), i = r?.status === "cancelled" ? "failed" : r?.status, a = t._state ?? i ?? "idle", o = ue(), s = t.label || t.guardrailId || "Not configured";
	return /* @__PURE__ */ W(q, {
		icon: "🛡️",
		subtitle: s,
		state: a,
		category: J("guardrail"),
		body: /* @__PURE__ */ W("span", {
			className: "text-[11px]",
			children: ["Action: ", t.action]
		}),
		selected: n,
		onRetry: a === "failed" && r && o ? () => o(e) : void 0,
		hasBreakpoint: t._hasBreakpoint,
		pausedAtBreakpoint: t._pausedAtBreakpoint,
		children: [
			/* @__PURE__ */ U(G, {
				type: "target",
				position: K.Left,
				id: "in",
				className: Y("data")
			}),
			/* @__PURE__ */ U(G, {
				type: "source",
				position: K.Right,
				id: "pass",
				className: `${Y("control")} !top-[40%]`
			}),
			/* @__PURE__ */ U(G, {
				type: "source",
				position: K.Right,
				id: "block",
				className: `${Y("control")} !top-[60%]`
			})
		]
	});
}
//#endregion
//#region src/components/pipelines/nodes/policy/PolicyNode.tsx
function cn({ id: e, data: t, selected: n }) {
	let r = I(e), i = r?.status === "cancelled" ? "failed" : r?.status, a = t._state ?? i ?? "idle", o = ue(), s = t.label || t.action || "Not configured";
	return /* @__PURE__ */ W(q, {
		icon: "📜",
		subtitle: s,
		state: a,
		category: J("policy"),
		body: /* @__PURE__ */ W("span", {
			className: "text-[11px]",
			children: [
				t.principal,
				" → ",
				t.resource
			]
		}),
		selected: n,
		onRetry: a === "failed" && r && o ? () => o(e) : void 0,
		hasBreakpoint: t._hasBreakpoint,
		pausedAtBreakpoint: t._pausedAtBreakpoint,
		children: [
			/* @__PURE__ */ U(G, {
				type: "target",
				position: K.Left,
				id: "in",
				className: Y("data")
			}),
			/* @__PURE__ */ U(G, {
				type: "source",
				position: K.Right,
				id: "allow",
				className: `${Y("control")} !top-[40%]`
			}),
			/* @__PURE__ */ U(G, {
				type: "source",
				position: K.Right,
				id: "deny",
				className: `${Y("control")} !top-[60%]`
			})
		]
	});
}
//#endregion
//#region src/components/pipelines/nodes/ag-ui-output/AgUiOutputNode.tsx
function ln({ id: e, data: t, selected: n }) {
	let r = I(e), i = r?.status === "cancelled" ? "failed" : r?.status, a = t._state ?? i ?? "idle", o = t.eventType === "CUSTOM" ? t.customEventName || "Custom" : t.eventType;
	return /* @__PURE__ */ U(q, {
		icon: "📡",
		subtitle: o,
		state: a,
		category: J("ag-ui-output"),
		body: /* @__PURE__ */ W("span", {
			className: "text-[11px]",
			children: ["Source: ", t.sourceField]
		}),
		footer: /* @__PURE__ */ U("span", {
			className: "text-[10px] text-primary",
			children: "Terminal — streams to AG-UI frontend"
		}),
		selected: n,
		hasBreakpoint: t._hasBreakpoint,
		pausedAtBreakpoint: t._pausedAtBreakpoint,
		children: /* @__PURE__ */ U(G, {
			type: "target",
			position: K.Left,
			id: "in",
			className: Y("data")
		})
	});
}
//#endregion
//#region src/components/pipelines/nodes/image-source/ImageSourceNode.tsx
var un = (e) => e.stopPropagation();
function dn(e) {
	let { id: t, data: r, selected: i } = e, [a, o] = V(!1), s = I(t), c = s?.status === "cancelled" ? "failed" : s?.status, l = (r._state && r._state !== "idle" ? r._state : void 0) ?? c ?? r._state ?? "idle", d = Ve(), f = s?.images?.[0]?.imageId ?? s?.output?.imageId ?? r.imageId, p = f ? /* @__PURE__ */ W(H, { children: [/* @__PURE__ */ U("button", {
		type: "button",
		"aria-label": "View source image",
		className: n("block w-full rounded border-none bg-transparent p-0 cursor-zoom-in", "focus:outline-none focus-visible:ring-2 focus-visible:ring-info"),
		onMouseDown: un,
		onClick: (e) => {
			e.stopPropagation(), o(!0);
		},
		children: /* @__PURE__ */ U("img", {
			src: d(f),
			alt: "Source image",
			className: n("w-full h-20 object-cover rounded block", "border border-border-field bg-surface-hover"),
			"data-testid": "image-source-thumb"
		})
	}), /* @__PURE__ */ U(u, {
		images: [{
			src: d(f),
			alt: "Source image"
		}],
		openIndex: a ? 0 : null,
		onClose: () => o(!1)
	})] }) : /* @__PURE__ */ U("div", {
		className: n("w-full h-20 rounded flex items-center justify-center", "border border-dashed border-border-field bg-surface-hover", "text-[11px] text-text-secondary"),
		"data-testid": "image-source-placeholder",
		children: "No image configured"
	}), m = f ? /* @__PURE__ */ W("span", {
		className: "font-mono text-[11px] text-text-secondary",
		children: [f.slice(0, 16), "…"]
	}) : void 0;
	return /* @__PURE__ */ W(q, {
		icon: "🖼",
		subtitle: "image-source",
		state: l,
		category: J("image-source"),
		body: p,
		footer: m,
		selected: i,
		ariaLabel: `Image Source node, state: ${l}`,
		hasBreakpoint: r._hasBreakpoint,
		pausedAtBreakpoint: r._pausedAtBreakpoint,
		children: [/* @__PURE__ */ U(G, {
			type: "target",
			position: K.Left,
			id: "in",
			className: Y("control")
		}), /* @__PURE__ */ U(G, {
			type: "source",
			position: K.Right,
			id: "out",
			className: Y("image")
		})]
	});
}
//#endregion
//#region src/components/pipelines/nodes/shared/NodeThumbStrip.tsx
var fn = (e) => e.stopPropagation(), pn = n("h-[38px] w-[38px] shrink-0 overflow-hidden rounded border border-border bg-surface-inset", "p-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-info");
function mn({ images: e, max: t = 4, "data-testid": r = "node-thumb-strip" }) {
	let i = Ve(), [a, o] = V(null);
	if (e.length === 0) return null;
	let s = e.length > t, c = s ? e.slice(0, t - 1) : e, l = e.length - c.length, d = (e) => (t) => {
		t.stopPropagation(), o(e);
	};
	return /* @__PURE__ */ W(H, { children: [/* @__PURE__ */ W("div", {
		"data-testid": r,
		className: "flex flex-row items-center gap-1",
		children: [c.map((t, n) => /* @__PURE__ */ U("button", {
			type: "button",
			"data-testid": `${r}-thumb-${n}`,
			"aria-label": t.alt ?? `Result image ${n + 1} of ${e.length}`,
			className: pn,
			onMouseDown: fn,
			onClick: d(n),
			children: /* @__PURE__ */ U("img", {
				src: i(t.imageId),
				alt: t.alt ?? "",
				loading: "lazy",
				className: "h-full w-full object-cover"
			})
		}, `${t.imageId}-${n}`)), s && /* @__PURE__ */ W("button", {
			type: "button",
			"data-testid": `${r}-overflow`,
			"aria-label": `Show all ${e.length} images`,
			className: n(pn, "flex items-center justify-center font-mono text-[11px] font-medium text-text-secondary"),
			onMouseDown: fn,
			onClick: d(c.length),
			children: ["+", l]
		})]
	}), /* @__PURE__ */ U(u, {
		images: e.map((e) => ({
			src: i(e.imageId),
			alt: e.alt,
			caption: e.alt
		})),
		openIndex: a,
		onClose: () => o(null),
		onNavigate: o
	})] });
}
//#endregion
//#region src/components/pipelines/nodes/save/SaveNode.tsx
function hn(e) {
	let { id: t, data: r, selected: i } = e, a = I(t), o = a?.status === "cancelled" ? "failed" : a?.status, s = (r._state && r._state !== "idle" ? r._state : void 0) ?? o ?? r._state ?? "idle", c = a?.images ?? [], l = a?.output?.filename ?? null, u = c.length > 0 ? /* @__PURE__ */ W("div", { children: [/* @__PURE__ */ U(mn, {
		images: c,
		"data-testid": "save-thumb-strip"
	}), l && /* @__PURE__ */ U("div", {
		className: "mt-1 text-[10px] font-mono text-text-secondary overflow-hidden text-ellipsis whitespace-nowrap",
		"data-testid": "save-filename-badge",
		title: l,
		children: l
	})] }) : /* @__PURE__ */ U("div", {
		className: n("w-full h-20 rounded flex items-center justify-center", "border border-dashed border-border-field bg-surface-hover", "text-[11px] text-text-secondary"),
		"data-testid": "save-placeholder",
		children: "Awaiting input"
	}), d = r.filenameTemplate ?? "crop-{{scatter.index}}.png", f = d.length > 28 ? `${d.slice(0, 25)}…` : d, p = /* @__PURE__ */ U("span", {
		className: "font-mono text-[11px] text-text-secondary",
		"data-testid": "save-footer",
		title: d,
		children: f
	}), m = `Save node, template: ${d}, state: ${s}`;
	return /* @__PURE__ */ W(q, {
		icon: "⬇",
		subtitle: "image:save",
		state: s,
		category: J("image:save"),
		body: u,
		footer: p,
		selected: i,
		ariaLabel: m,
		hasBreakpoint: r._hasBreakpoint,
		pausedAtBreakpoint: r._pausedAtBreakpoint,
		children: [
			/* @__PURE__ */ U(G, {
				type: "target",
				position: K.Left,
				id: "in",
				className: Y("image")
			}),
			/* @__PURE__ */ U(G, {
				type: "source",
				position: K.Right,
				id: "out",
				className: Y("image")
			}),
			/* @__PURE__ */ U(G, {
				type: "source",
				position: K.Right,
				id: "error",
				className: `${Y("error")} !top-[75%]`
			})
		]
	});
}
//#endregion
//#region src/components/pipelines/nodes/scatter/ScatterNode.tsx
function gn(e) {
	return e ? e.length > 40 ? `${e.slice(0, 37)}…` : e : "Not configured";
}
function _n(e) {
	let { id: t, data: n, selected: r } = e, i = I(t), a = i?.status === "cancelled" ? "failed" : i?.status, o = (n._state && n._state !== "idle" ? n._state : void 0) ?? a ?? n._state ?? "idle", s = i?.output, c = Array.isArray(s?.items) ? s.items.length : null, l = /* @__PURE__ */ W("div", {
		className: "flex flex-col gap-1",
		children: [/* @__PURE__ */ U("span", {
			className: "font-mono text-[11px] text-text-secondary break-all",
			children: gn(n.itemsPath ?? "")
		}), c !== null && /* @__PURE__ */ W("span", {
			className: "text-[11px] text-text-tertiary",
			children: [
				c,
				" item",
				c === 1 ? "" : "s",
				" resolved"
			]
		})]
	}), u = c, d = u !== null && o !== "idle" ? /* @__PURE__ */ W("span", {
		className: "inline-block text-[11px] font-semibold text-info-fg bg-info-bg border border-info rounded-full px-2 py-0.5",
		children: [
			"Dispatched ",
			u,
			" arm",
			u === 1 ? "" : "s"
		]
	}) : void 0, f = `scatter${n.itemAlias ? ` · alias: ${n.itemAlias}` : ""}${n.maxConcurrency ? ` · max ${n.maxConcurrency}` : ""}`, p = `Scatter node, path: ${n.itemsPath ?? "not set"}, state: ${o}`;
	return /* @__PURE__ */ W(q, {
		icon: "⑂",
		subtitle: f,
		state: o,
		category: J("scatter"),
		body: l,
		footer: d,
		selected: r,
		ariaLabel: p,
		hasBreakpoint: n._hasBreakpoint,
		pausedAtBreakpoint: n._pausedAtBreakpoint,
		children: [/* @__PURE__ */ U(G, {
			type: "target",
			position: K.Left,
			id: "in",
			className: Y("data")
		}), /* @__PURE__ */ U(G, {
			type: "source",
			position: K.Right,
			id: "out",
			className: Y("control")
		})]
	});
}
//#endregion
//#region src/components/pipelines/nodes/resize/ResizeNode.tsx
function vn(e) {
	let { id: t, data: n, selected: r } = e, i = Ve(), a = I(t), o = a?.status === "cancelled" ? "failed" : a?.status, s = (n._state && n._state !== "idle" ? n._state : void 0) ?? o ?? n._state ?? "idle", c = a?.images?.[0] ?? null, l = n.width != null && n.height != null ? `→ ${n.width}×${n.height}` : n.width == null ? n.height == null ? null : `→ ${n.height}h` : `→ ${n.width}w`, u = c ? /* @__PURE__ */ U("img", {
		src: i(c.imageId),
		alt: "Resize output",
		className: "w-full h-20 object-cover rounded border border-border bg-surface-inset block",
		"data-testid": "resize-output-thumb"
	}) : /* @__PURE__ */ U("div", {
		className: "w-full h-20 rounded border border-dashed border-border bg-surface-inset flex items-center justify-center text-[11px] text-text-tertiary",
		"data-testid": "resize-placeholder",
		children: l ?? "No image yet"
	}), d = l ? /* @__PURE__ */ W("span", {
		className: "font-mono text-[11px] text-text-tertiary",
		children: [l, n.fit ? ` · ${n.fit}` : ""]
	}) : void 0;
	return /* @__PURE__ */ W(q, {
		icon: "⥂",
		subtitle: "image:resize",
		state: s,
		category: J("image:resize"),
		body: u,
		footer: d,
		selected: r,
		ariaLabel: `Resize node, state: ${s}`,
		hasBreakpoint: n._hasBreakpoint,
		pausedAtBreakpoint: n._pausedAtBreakpoint,
		children: [
			/* @__PURE__ */ U(G, {
				type: "target",
				position: K.Left,
				id: "in",
				className: Y("image")
			}),
			/* @__PURE__ */ U(G, {
				type: "source",
				position: K.Right,
				id: "out",
				className: Y("image")
			}),
			/* @__PURE__ */ U(G, {
				type: "source",
				position: K.Right,
				id: "error",
				className: `${Y("error")} !bottom-2 !top-auto`
			})
		]
	});
}
//#endregion
//#region src/components/pipelines/nodes/transform-geo/TransformGeoNode.tsx
function yn(e) {
	switch (e.op) {
		case "rotate": return `rotate ${e.degrees}°`;
		case "flip": return "flip ↕";
		case "flop": return "flop ↔";
	}
}
function bn(e) {
	let { id: t, data: n, selected: r } = e, i = Ve(), a = I(t), o = a?.status === "cancelled" ? "failed" : a?.status, s = (n._state && n._state !== "idle" ? n._state : void 0) ?? o ?? n._state ?? "idle", c = a?.images?.[0] ?? null, l = n.operations ?? [], u = l.length > 0 ? l.map(yn).join("  ›  ") : null, d = c ? /* @__PURE__ */ U("img", {
		src: i(c.imageId),
		alt: "Transform output",
		className: "w-full h-20 object-cover rounded border border-border bg-surface-inset block",
		"data-testid": "transform-geo-output-thumb"
	}) : /* @__PURE__ */ U("div", {
		className: "w-full h-20 rounded border border-dashed border-border bg-surface-inset flex items-center justify-center text-[11px] text-text-tertiary",
		"data-testid": "transform-geo-placeholder",
		children: u ?? "No ops configured"
	}), f = u ? /* @__PURE__ */ U("span", {
		className: "font-mono text-[11px] text-text-tertiary",
		children: u
	}) : void 0;
	return /* @__PURE__ */ W(q, {
		icon: "↻",
		subtitle: "image:transform",
		state: s,
		category: J("image:transform"),
		body: d,
		footer: f,
		selected: r,
		ariaLabel: `Transform node, ops: ${l.length}, state: ${s}`,
		hasBreakpoint: n._hasBreakpoint,
		pausedAtBreakpoint: n._pausedAtBreakpoint,
		children: [
			/* @__PURE__ */ U(G, {
				type: "target",
				position: K.Left,
				id: "in",
				className: Y("image")
			}),
			/* @__PURE__ */ U(G, {
				type: "source",
				position: K.Right,
				id: "out",
				className: Y("image")
			}),
			/* @__PURE__ */ U(G, {
				type: "source",
				position: K.Right,
				id: "error",
				className: `${Y("error")} !bottom-2 !top-auto`
			})
		]
	});
}
//#endregion
//#region src/components/pipelines/nodes/format-convert/FormatConvertNode.tsx
function xn(e) {
	let t = e.format?.toUpperCase() ?? "?", n = e.lossless ? "lossless" : e.quality == null ? "" : `q${e.quality}`;
	return n ? `${t} ${n}` : t;
}
function Sn(e) {
	let { id: t, data: n, selected: r } = e, i = Ve(), a = I(t), o = a?.status === "cancelled" ? "failed" : a?.status, s = (n._state && n._state !== "idle" ? n._state : void 0) ?? o ?? n._state ?? "idle", c = a?.images?.[0] ?? null, l = n.format ? xn(n) : null, u = c ? /* @__PURE__ */ U("img", {
		src: i(c.imageId),
		alt: "Format convert output",
		className: "w-full h-20 object-cover rounded border border-border bg-surface-inset block",
		"data-testid": "format-convert-output-thumb"
	}) : /* @__PURE__ */ U("div", {
		className: "w-full h-20 rounded border border-dashed border-border bg-surface-inset flex items-center justify-center text-[11px] text-text-tertiary",
		"data-testid": "format-convert-placeholder",
		children: l ?? "No format set"
	}), d = l ? /* @__PURE__ */ U("span", {
		className: "font-mono text-[11px] bg-surface-inset border border-border rounded px-1.5 py-0.5 text-text-secondary",
		children: l
	}) : void 0;
	return /* @__PURE__ */ W(q, {
		icon: "⇌",
		subtitle: "image:format-convert",
		state: s,
		category: J("image:format-convert"),
		body: u,
		footer: d,
		selected: r,
		ariaLabel: `Format Convert node, format: ${n.format ?? "unset"}, state: ${s}`,
		hasBreakpoint: n._hasBreakpoint,
		pausedAtBreakpoint: n._pausedAtBreakpoint,
		children: [
			/* @__PURE__ */ U(G, {
				type: "target",
				position: K.Left,
				id: "in",
				className: Y("image")
			}),
			/* @__PURE__ */ U(G, {
				type: "source",
				position: K.Right,
				id: "out",
				className: Y("image")
			}),
			/* @__PURE__ */ U(G, {
				type: "source",
				position: K.Right,
				id: "error",
				className: `${Y("error")} !bottom-2 !top-auto`
			})
		]
	});
}
//#endregion
//#region src/components/pipelines/nodes/sharpen/SharpenNode.tsx
function Cn(e) {
	let { id: t, data: n, selected: r } = e, i = Ve(), a = I(t), o = a?.status === "cancelled" ? "failed" : a?.status, s = (n._state && n._state !== "idle" ? n._state : void 0) ?? o ?? n._state ?? "idle", c = a?.images?.[0] ?? null, l = n.sigma == null ? null : `σ ${n.sigma}`, u = c ? /* @__PURE__ */ U("img", {
		src: i(c.imageId),
		alt: "Sharpen output",
		className: "w-full h-20 object-cover rounded border border-border bg-surface-inset block",
		"data-testid": "sharpen-output-thumb"
	}) : /* @__PURE__ */ U("div", {
		className: "w-full h-20 rounded border border-dashed border-border bg-surface-inset flex items-center justify-center text-[11px] text-text-tertiary",
		"data-testid": "sharpen-placeholder",
		children: l ?? "Sharpen (default σ)"
	}), d = l ? /* @__PURE__ */ U("span", {
		className: "font-mono text-[11px] bg-surface-inset border border-border rounded px-1.5 py-0.5 text-text-secondary",
		children: l
	}) : void 0;
	return /* @__PURE__ */ W(q, {
		icon: "◈",
		subtitle: "image:sharpen",
		state: s,
		category: J("image:sharpen"),
		body: u,
		footer: d,
		selected: r,
		ariaLabel: `Sharpen node, sigma: ${n.sigma ?? "default"}, state: ${s}`,
		hasBreakpoint: n._hasBreakpoint,
		pausedAtBreakpoint: n._pausedAtBreakpoint,
		children: [
			/* @__PURE__ */ U(G, {
				type: "target",
				position: K.Left,
				id: "in",
				className: Y("image")
			}),
			/* @__PURE__ */ U(G, {
				type: "source",
				position: K.Right,
				id: "out",
				className: Y("image")
			}),
			/* @__PURE__ */ U(G, {
				type: "source",
				position: K.Right,
				id: "error",
				className: `${Y("error")} !bottom-2 !top-auto`
			})
		]
	});
}
//#endregion
//#region src/components/pipelines/nodes/watermark/WatermarkNode.tsx
function wn(e) {
	let { id: t, data: n, selected: r } = e, i = Ve(), a = I(t), o = a?.status === "cancelled" ? "failed" : a?.status, s = (n._state && n._state !== "idle" ? n._state : void 0) ?? o ?? n._state ?? "idle", c = a?.images?.[0] ?? null, l = n.gravity ?? "southeast", u = n.opacity == null ? "100%" : `${Math.round(n.opacity * 100)}%`, d = c ? /* @__PURE__ */ U("img", {
		src: i(c.imageId),
		alt: "Watermark output",
		className: "w-full h-20 object-cover rounded border border-border bg-surface-inset block",
		"data-testid": "watermark-output-thumb"
	}) : /* @__PURE__ */ U("div", {
		className: "w-full h-20 rounded border border-dashed border-border bg-surface-inset flex items-center justify-center text-[11px] text-text-tertiary",
		"data-testid": "watermark-placeholder",
		children: n.overlayImageId ? `${l} · ${u}` : "No overlay image set"
	}), f = n.overlayImageId ? /* @__PURE__ */ W("span", {
		className: "font-mono text-[11px] text-text-tertiary",
		children: [
			l,
			" · ",
			u
		]
	}) : void 0;
	return /* @__PURE__ */ W(q, {
		icon: "⊕",
		subtitle: "image:watermark",
		state: s,
		category: J("image:watermark"),
		body: d,
		footer: f,
		selected: r,
		ariaLabel: `Watermark node, gravity: ${l}, state: ${s}`,
		hasBreakpoint: n._hasBreakpoint,
		pausedAtBreakpoint: n._pausedAtBreakpoint,
		children: [
			/* @__PURE__ */ U(G, {
				type: "target",
				position: K.Left,
				id: "in",
				className: Y("image")
			}),
			/* @__PURE__ */ U(G, {
				type: "source",
				position: K.Right,
				id: "out",
				className: Y("image")
			}),
			/* @__PURE__ */ U(G, {
				type: "source",
				position: K.Right,
				id: "error",
				className: `${Y("error")} !bottom-2 !top-auto`
			})
		]
	});
}
//#endregion
//#region src/components/pipelines/nodes/crop/CropNode.tsx
function Tn(e) {
	if (!e) return null;
	let t = e.x + e.width, n = e.y + e.height;
	return `[${e.x},${e.y} → ${t},${n}]`;
}
function En(e) {
	let { id: t, data: n, selected: r } = e, i = Ve(), a = I(t), o = a?.status === "cancelled" ? "failed" : a?.status, s = (n._state && n._state !== "idle" ? n._state : void 0) ?? o ?? n._state ?? "idle", c = a?.images?.[0] ?? null, l = a?.output, u = Tn(c?.bbox ?? l?.bbox), d = c ? /* @__PURE__ */ U("img", {
		src: i(c.imageId),
		alt: "Crop output",
		className: "w-full h-20 object-cover rounded border border-border bg-surface-inset block",
		"data-testid": "crop-output-thumb"
	}) : /* @__PURE__ */ U("div", {
		className: "w-full h-20 rounded border border-dashed border-border bg-surface-inset flex items-center justify-center text-[11px] text-text-tertiary",
		"data-testid": "crop-placeholder",
		children: "No crop yet"
	}), f = u ? /* @__PURE__ */ U("span", {
		className: "font-mono text-[11px] text-text-tertiary",
		"data-testid": "crop-bbox-coords",
		children: u
	}) : void 0, p = `Crop node, source: ${n.sourceImagePath ?? "default"}, state: ${s}`;
	return /* @__PURE__ */ W(q, {
		icon: "✂",
		subtitle: "image:crop",
		state: s,
		category: J("image:crop"),
		body: d,
		footer: f,
		selected: r,
		ariaLabel: p,
		hasBreakpoint: n._hasBreakpoint,
		pausedAtBreakpoint: n._pausedAtBreakpoint,
		children: [/* @__PURE__ */ U(G, {
			type: "target",
			position: K.Left,
			id: "in",
			className: Y("image")
		}), /* @__PURE__ */ U(G, {
			type: "source",
			position: K.Right,
			id: "out",
			className: Y("image")
		})]
	});
}
//#endregion
//#region src/components/pipelines/nodes/adjust-bw/AdjustBwNode.tsx
function Dn(e) {
	let { id: t, data: n, selected: r } = e, i = Ve(), a = I(t), o = a?.status === "cancelled" ? "failed" : a?.status, s = (n._state && n._state !== "idle" ? n._state : void 0) ?? o ?? n._state ?? "idle", c = a?.images?.[0] ?? null, l = c ? /* @__PURE__ */ U("div", {
		className: "flex gap-1 w-full",
		children: /* @__PURE__ */ W("div", {
			className: "flex-1 min-w-0",
			children: [/* @__PURE__ */ U("img", {
				src: i(c.imageId),
				alt: "B/W output",
				className: "flex-1 h-16 object-cover rounded border border-border bg-surface-inset block",
				"data-testid": "adjust-bw-output-thumb"
			}), /* @__PURE__ */ U("div", {
				className: "text-[9px] text-text-tertiary text-center mt-0.5",
				children: "output"
			})]
		})
	}) : /* @__PURE__ */ U("div", {
		className: "w-full h-16 rounded border border-dashed border-border bg-surface-inset flex items-center justify-center text-[11px] text-text-tertiary",
		"data-testid": "adjust-bw-placeholder",
		children: "Awaiting input"
	}), u = n.algorithm ?? "luminosity", d = n.contrast ?? 1, f = /* @__PURE__ */ W("span", {
		className: "font-mono text-[11px] text-text-tertiary",
		"data-testid": "adjust-bw-footer",
		children: [
			u,
			" · contrast ",
			d
		]
	}), p = `Adjust B/W node, algorithm: ${u}, state: ${s}`;
	return /* @__PURE__ */ W(q, {
		icon: "◐",
		subtitle: "image:adjust-bw",
		state: s,
		category: J("image:adjust-bw"),
		body: l,
		footer: f,
		selected: r,
		ariaLabel: p,
		hasBreakpoint: n._hasBreakpoint,
		pausedAtBreakpoint: n._pausedAtBreakpoint,
		children: [
			/* @__PURE__ */ U(G, {
				type: "target",
				position: K.Left,
				id: "in",
				className: Y("image")
			}),
			/* @__PURE__ */ U(G, {
				type: "source",
				position: K.Right,
				id: "out",
				className: Y("image")
			}),
			/* @__PURE__ */ U(G, {
				type: "source",
				position: K.Right,
				id: "error",
				className: `${Y("error")} !top-[75%]`
			})
		]
	});
}
//#endregion
//#region src/components/pipelines/nodes/adjust-layer/AdjustLayerNode.tsx
function On(e) {
	switch (e.kind) {
		case "brightness": return `brightness ${e.value}`;
		case "contrast": return `contrast ${e.value}`;
		case "saturation": return `sat ${e.value}`;
		case "hue": return `hue ${e.degrees}°`;
		case "blur": return `blur ${e.radiusPx}px`;
	}
}
function kn(e) {
	let { id: t, data: n, selected: r } = e, i = Ve(), a = I(t), o = a?.status === "cancelled" ? "failed" : a?.status, s = (n._state && n._state !== "idle" ? n._state : void 0) ?? o ?? n._state ?? "idle", c = a?.images?.[0] ?? null, l = n.layers ?? [], u = c ? /* @__PURE__ */ U("img", {
		src: i(c.imageId),
		alt: "Adjust output",
		className: "w-full h-20 object-cover rounded border border-border bg-surface-inset block",
		"data-testid": "adjust-layer-output-thumb"
	}) : l.length > 0 ? /* @__PURE__ */ U("div", {
		className: "w-full rounded border border-dashed border-border bg-surface-inset p-1.5 flex flex-wrap gap-1 min-h-8",
		"data-testid": "adjust-layer-chips",
		children: l.map((e, t) => /* @__PURE__ */ U("span", {
			className: "text-[10px] font-mono bg-surface-hover border border-border text-text-secondary rounded px-1 py-0.5",
			children: On(e)
		}, t))
	}) : /* @__PURE__ */ U("div", {
		className: "w-full rounded border border-dashed border-border bg-surface-inset flex items-center justify-center text-[11px] text-text-tertiary min-h-8",
		"data-testid": "adjust-layer-placeholder",
		children: "Awaiting input"
	}), d = /* @__PURE__ */ W("span", {
		className: "text-[11px] text-text-tertiary",
		"data-testid": "adjust-layer-footer",
		children: [
			l.length,
			" layer",
			l.length === 1 ? "" : "s"
		]
	}), f = `Adjust Layer node, ${l.length} layer${l.length === 1 ? "" : "s"}, state: ${s}`;
	return /* @__PURE__ */ W(q, {
		icon: "𝍩",
		subtitle: "image:adjust-layer",
		state: s,
		category: J("image:adjust-layer"),
		body: u,
		footer: d,
		selected: r,
		ariaLabel: f,
		hasBreakpoint: n._hasBreakpoint,
		pausedAtBreakpoint: n._pausedAtBreakpoint,
		children: [
			/* @__PURE__ */ U(G, {
				type: "target",
				position: K.Left,
				id: "in",
				className: Y("image")
			}),
			/* @__PURE__ */ U(G, {
				type: "source",
				position: K.Right,
				id: "out",
				className: Y("image")
			}),
			/* @__PURE__ */ U(G, {
				type: "source",
				position: K.Right,
				id: "error",
				className: `${Y("error")} !top-[75%]`
			})
		]
	});
}
//#endregion
//#region src/components/pipelines/nodes/dimensions/DimensionsNode.tsx
function An(e) {
	let { id: t, data: n, selected: r } = e, i = I(t), a = i?.status === "cancelled" ? "failed" : i?.status, o = (n._state && n._state !== "idle" ? n._state : void 0) ?? a ?? n._state ?? "idle", s = i?.output ?? void 0, c = s?.genWidth != null && s?.genHeight != null ? `${s.genWidth}×${s.genHeight}` : null, l = c ? /* @__PURE__ */ W("div", {
		className: "w-full h-20 rounded border border-border bg-surface-inset flex flex-col items-center justify-center gap-0.5 text-text-secondary",
		"data-testid": "dimensions-output",
		children: [/* @__PURE__ */ U("span", {
			className: "font-mono text-[13px]",
			children: c
		}), s?.width != null && s?.height != null && /* @__PURE__ */ W("span", {
			className: "font-mono text-[11px] text-text-tertiary",
			children: [
				"src ",
				s.width,
				"×",
				s.height
			]
		})]
	}) : /* @__PURE__ */ U("div", {
		className: "w-full h-20 rounded border border-dashed border-border bg-surface-inset flex items-center justify-center text-[11px] text-text-tertiary",
		"data-testid": "dimensions-placeholder",
		children: "reads image size"
	}), u = /* @__PURE__ */ W("span", {
		className: "font-mono text-[11px] text-text-tertiary",
		children: ["maxEdge ", n.maxEdge ?? 1024]
	});
	return /* @__PURE__ */ W(q, {
		icon: "📐",
		subtitle: "image:dimensions",
		state: o,
		category: J("image:dimensions"),
		body: l,
		footer: u,
		selected: r,
		ariaLabel: `Dimensions node, state: ${o}`,
		hasBreakpoint: n._hasBreakpoint,
		pausedAtBreakpoint: n._pausedAtBreakpoint,
		children: [
			/* @__PURE__ */ U(G, {
				type: "target",
				position: K.Left,
				id: "in",
				className: Y("image")
			}),
			/* @__PURE__ */ U(G, {
				type: "source",
				position: K.Right,
				id: "out",
				className: Y("data")
			}),
			/* @__PURE__ */ U(G, {
				type: "source",
				position: K.Right,
				id: "error",
				className: `${Y("error")} !bottom-2 !top-auto`
			})
		]
	});
}
//#endregion
//#region src/components/pipelines/nodes/upscale/UpscaleNode.tsx
function jn(e) {
	let { id: t, data: n, selected: r } = e, i = Ve(), a = I(t), o = a?.status === "cancelled" ? "failed" : a?.status, s = (n._state && n._state !== "idle" ? n._state : void 0) ?? o ?? n._state ?? "idle", c = a?.images?.[0] ?? null, l = `≤ ${n.maxEdge ?? 1024}px → 4×`, u = c ? /* @__PURE__ */ U("img", {
		src: i(c.imageId),
		alt: "Upscale output",
		className: "w-full h-20 object-cover rounded border border-border bg-surface-inset block",
		"data-testid": "upscale-output-thumb"
	}) : /* @__PURE__ */ U("div", {
		className: "w-full h-20 rounded border border-dashed border-border bg-surface-inset flex items-center justify-center text-[11px] text-text-tertiary",
		"data-testid": "upscale-placeholder",
		children: l
	}), d = /* @__PURE__ */ U("span", {
		className: "font-mono text-[11px] text-text-tertiary",
		children: l
	});
	return /* @__PURE__ */ W(q, {
		icon: "⤢",
		subtitle: "image:upscale",
		state: s,
		category: J("image:upscale"),
		body: u,
		footer: d,
		selected: r,
		ariaLabel: `Upscale node, state: ${s}`,
		hasBreakpoint: n._hasBreakpoint,
		pausedAtBreakpoint: n._pausedAtBreakpoint,
		children: [
			/* @__PURE__ */ U(G, {
				type: "target",
				position: K.Left,
				id: "in",
				className: Y("image")
			}),
			/* @__PURE__ */ U(G, {
				type: "source",
				position: K.Right,
				id: "out",
				className: Y("image")
			}),
			/* @__PURE__ */ U(G, {
				type: "source",
				position: K.Right,
				id: "error",
				className: `${Y("error")} !bottom-2 !top-auto`
			})
		]
	});
}
//#endregion
//#region src/components/pipelines/nodes/vision/VisionNode.tsx
function Mn(e) {
	return e === 0 ? "$0" : e < .001 ? "<$0.001" : e < 1 ? `$${e.toFixed(3)}` : `$${e.toFixed(2)}`;
}
function Nn(e) {
	if (!e || e.trim().length === 0) return "Not configured";
	let t = e.split("\n").slice(0, 2).join(" ").trim();
	return t.length > 120 ? `${t.slice(0, 117)}…` : t;
}
var Pn = (e) => e.stopPropagation(), Fn = ct(function({ info: e }) {
	let [t, r] = V(!1), [i, a] = V(!1);
	if (e.failure) {
		let t = e.failure.reason === "refusal";
		return /* @__PURE__ */ W("div", { children: [
			/* @__PURE__ */ U("output", {
				"aria-live": "polite",
				className: "sr-only",
				children: t ? "Content policy refusal" : `Failure: ${e.failure.reason}`
			}),
			/* @__PURE__ */ W("div", {
				className: "flex items-start gap-1",
				children: [/* @__PURE__ */ U("span", {
					className: "bg-transparent border-none p-0 text-[12px] text-danger-fg font-medium text-left",
					children: t ? "✕ Content policy refusal" : `✕ ${e.failure.reason}`
				}), e.onRetry && /* @__PURE__ */ U("button", {
					type: "button",
					onClick: e.onRetry,
					className: "ml-2 bg-transparent border border-border-emphasis rounded px-1.5 py-0.5 text-[11px] cursor-pointer text-text-secondary",
					title: "Retry this step",
					children: "Retry ↺"
				})]
			}),
			/* @__PURE__ */ U("div", {
				className: "mt-1 font-mono text-[11px] leading-snug text-text-secondary",
				children: e.failure.error
			})
		] });
	}
	let o = e.tokensIn != null || e.tokensOut != null, s = !e.streaming && !e.awaiting && e.response.length > 0, c = t ? e.response : e.response.length > 60 ? `${e.response.slice(0, 60)}…` : e.response, l = e.awaiting ? "Vision: waiting for first token" : e.streaming ? "Vision: streaming response" : s ? "Vision: completed" : "";
	return /* @__PURE__ */ W("div", { children: [
		/* @__PURE__ */ U("output", {
			"aria-live": "polite",
			className: "sr-only",
			children: l
		}),
		/* @__PURE__ */ W("button", {
			type: "button",
			onClick: () => r((e) => !e),
			className: "bg-transparent border-none p-0 cursor-pointer font-inherit text-[12px] text-text-secondary font-medium text-left",
			children: [
				t ? "▾" : "▸",
				" ",
				e.streaming ? "Streaming" : "Response",
				typeof e.costUsd == "number" && /* @__PURE__ */ W("span", {
					className: "ml-1.5 text-[11px] text-text-tertiary",
					"data-testid": "vision-cost",
					title: "Cost based on model usage rate",
					children: ["· ", Mn(e.costUsd)]
				}),
				o && /* @__PURE__ */ W("span", {
					className: "ml-1.5 text-[11px] text-text-tertiary",
					children: [
						"· ",
						e.tokensIn ?? 0,
						" → ",
						e.tokensOut ?? 0,
						" tokens"
					]
				}),
				e.awaiting && /* @__PURE__ */ U("span", {
					className: "ml-1.5 text-[11px] text-info-fg",
					"data-testid": "vision-awaiting",
					children: "· waiting…"
				}),
				e.streaming && !e.awaiting && /* @__PURE__ */ U("span", {
					className: "ml-1.5 text-[11px] text-text-tertiary",
					children: "· streaming…"
				})
			]
		}),
		s && e.imageId && /* @__PURE__ */ U("button", {
			type: "button",
			onClick: () => window.dispatchEvent(new CustomEvent("pipeline:open-run-modal")),
			className: "mt-1 block bg-transparent border-none p-0 cursor-pointer text-[11px] text-primary underline font-inherit",
			children: "Run with new image →"
		}),
		e.imageId && /* @__PURE__ */ W(H, { children: [/* @__PURE__ */ U("button", {
			type: "button",
			"aria-label": "View vision input image",
			className: n("mt-1.5 block h-14 w-14 overflow-hidden rounded border border-border bg-surface-inset", "p-0 cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-info"),
			onMouseDown: Pn,
			onClick: (e) => {
				e.stopPropagation(), a(!0);
			},
			children: /* @__PURE__ */ U("img", {
				src: e.getImageUrl(e.imageId),
				alt: "Vision input",
				className: "h-full w-full object-cover",
				"data-testid": "vision-input-thumb"
			})
		}), /* @__PURE__ */ U(u, {
			images: [{
				src: e.getImageUrl(e.imageId),
				alt: "Vision input",
				caption: "Vision input"
			}],
			openIndex: i ? 0 : null,
			onClose: () => a(!1)
		})] }),
		/* @__PURE__ */ U("div", {
			className: n("mt-1 overflow-hidden font-mono text-[11px] leading-snug text-text-primary whitespace-pre-wrap break-words", t ? "max-h-none" : "max-h-[1.4em]"),
			children: c
		})
	] });
});
function In(e) {
	let { id: t, data: n, selected: r } = e, i = Ve(), a = I(t), o = a?.status === "cancelled" ? "failed" : a?.status, s = (n._state && n._state !== "idle" ? n._state : void 0) ?? o ?? n._state ?? "idle", c = ue(), l = L(() => c?.(t), [c, t]), u = s === "failed" && c ? l : void 0, d = /* @__PURE__ */ U("span", {
		className: "italic text-text-secondary text-[13px]",
		children: Nn(n.userPrompt)
	}), f = a?.vision, p = s === "running" && f !== void 0 && f.tokensSeen > 0 && !f.analyzed, m = s === "running" && f !== void 0 && f.tokensSeen === 0 && !f.failure, h = z(() => f ? {
		response: f.response,
		tokensIn: f.tokensIn,
		tokensOut: f.tokensOut,
		streaming: p,
		awaiting: m,
		...f.failure ? { failure: f.failure } : {},
		...f.imageId ? { imageId: f.imageId } : {},
		...typeof f.costUsd == "number" ? { costUsd: f.costUsd } : {},
		...u ? { onRetry: u } : {},
		getImageUrl: i
	} : void 0, [
		f,
		p,
		m,
		u,
		i
	]), g = h ? /* @__PURE__ */ U(Fn, { info: h }) : void 0, _ = n.model || "claude-sonnet-4-6", v = n.outputSchema ? "extract" : "caption", y = `Vision node, model ${_}, mode ${v}, state: ${s}`;
	return /* @__PURE__ */ W(q, {
		icon: "📷",
		subtitle: `${_} · ${v}`,
		state: s,
		category: J("image:vision-analyze"),
		body: d,
		footer: g,
		selected: r,
		onRetry: u,
		ariaLabel: y,
		hasBreakpoint: n._hasBreakpoint,
		pausedAtBreakpoint: n._pausedAtBreakpoint,
		children: [/* @__PURE__ */ U(G, {
			type: "target",
			position: K.Left,
			id: "in",
			className: Y("image")
		}), /* @__PURE__ */ U(G, {
			type: "source",
			position: K.Right,
			id: "out",
			className: Y("data")
		})]
	});
}
//#endregion
//#region src/components/pipelines/nodes/vision-classify/VisionClassifyNode.tsx
function Ln(e) {
	let { id: t, data: n, selected: r } = e, i = I(t), a = i?.status === "cancelled" ? "failed" : i?.status, o = (n._state && n._state !== "idle" ? n._state : void 0) ?? a ?? n._state ?? "idle", s = i?.output, c = s?.extracted?.label, l = s?.extracted?.confidence, u = (n.labels ?? []).slice(0, 4).join(", "), d = c ? /* @__PURE__ */ W("div", {
		className: "flex items-center gap-1.5 py-0.5",
		children: [/* @__PURE__ */ U("span", {
			className: "text-[12px] font-semibold text-text-primary bg-surface-inset border border-border rounded px-2 py-0.5",
			"data-testid": "classify-label",
			children: c
		}), l != null && /* @__PURE__ */ W("span", {
			className: "text-[11px] font-mono text-text-tertiary",
			"data-testid": "classify-confidence",
			children: [(l * 100).toFixed(0), "%"]
		})]
	}) : /* @__PURE__ */ U("span", {
		className: "text-[11px] text-text-tertiary italic",
		children: u ? `Labels: ${u}` : "No labels configured"
	}), f = n.model ?? "claude-haiku-4-5";
	return /* @__PURE__ */ W(q, {
		icon: "🏷",
		subtitle: f,
		state: o,
		category: J("image:vision-classify"),
		body: d,
		selected: r,
		ariaLabel: `Vision Classify node, model: ${f}, state: ${o}`,
		hasBreakpoint: n._hasBreakpoint,
		pausedAtBreakpoint: n._pausedAtBreakpoint,
		children: [
			/* @__PURE__ */ U(G, {
				type: "target",
				position: K.Left,
				id: "in",
				className: Y("image")
			}),
			/* @__PURE__ */ U(G, {
				type: "source",
				position: K.Right,
				id: "out",
				className: Y("data")
			}),
			/* @__PURE__ */ U(G, {
				type: "source",
				position: K.Right,
				id: "error",
				className: `${Y("error")} !bottom-2 !top-auto`
			})
		]
	});
}
//#endregion
//#region src/components/pipelines/nodes/vision-describe/VisionDescribeNode.tsx
function Rn(e) {
	let { id: t, data: n, selected: r } = e, i = I(t), a = i?.status === "cancelled" ? "failed" : i?.status, o = (n._state && n._state !== "idle" ? n._state : void 0) ?? a ?? n._state ?? "idle", s = (i?.output)?.extracted?.caption, c = s ? s.length > 80 ? `${s.slice(0, 77)}…` : s : null, l = n.userPrompt ? n.userPrompt.length > 60 ? `${n.userPrompt.slice(0, 57)}…` : n.userPrompt : "No prompt set", u = c ? /* @__PURE__ */ U("span", {
		className: "text-[11px] text-text-primary leading-snug",
		"data-testid": "describe-caption",
		children: c
	}) : /* @__PURE__ */ U("span", {
		className: "text-[11px] text-text-tertiary italic",
		children: l
	}), d = n.model ?? "claude-haiku-4-5";
	return /* @__PURE__ */ W(q, {
		icon: "💬",
		subtitle: d,
		state: o,
		category: J("image:vision-describe"),
		body: u,
		selected: r,
		ariaLabel: `Vision Describe node, model: ${d}, state: ${o}`,
		hasBreakpoint: n._hasBreakpoint,
		pausedAtBreakpoint: n._pausedAtBreakpoint,
		children: [
			/* @__PURE__ */ U(G, {
				type: "target",
				position: K.Left,
				id: "in",
				className: Y("image")
			}),
			/* @__PURE__ */ U(G, {
				type: "source",
				position: K.Right,
				id: "out",
				className: Y("data")
			}),
			/* @__PURE__ */ U(G, {
				type: "source",
				position: K.Right,
				id: "error",
				className: `${Y("error")} !bottom-2 !top-auto`
			})
		]
	});
}
//#endregion
//#region src/components/pipelines/nodes/vision-tag/VisionTagNode.tsx
function zn(e) {
	let { id: t, data: n, selected: r } = e, i = I(t), a = i?.status === "cancelled" ? "failed" : i?.status, o = (n._state && n._state !== "idle" ? n._state : void 0) ?? a ?? n._state ?? "idle", s = ((i?.output)?.extracted?.tags ?? []).slice(0, 5), c = (n.candidateTags ?? []).slice(0, 3).join(", "), l = s.length > 0 ? /* @__PURE__ */ U("div", {
		className: "flex flex-wrap gap-1",
		"data-testid": "tag-pills",
		children: s.map((e) => /* @__PURE__ */ U("span", {
			className: "inline-block text-[10px] font-semibold bg-surface-inset border border-border rounded-full px-1.5 py-0.5 text-text-secondary whitespace-nowrap",
			children: e
		}, e))
	}) : /* @__PURE__ */ U("span", {
		className: "text-[11px] text-text-tertiary italic",
		children: c ? `Candidates: ${c}…` : "Open-vocabulary tagging"
	}), u = n.model ?? "claude-haiku-4-5";
	return /* @__PURE__ */ W(q, {
		icon: "🔖",
		subtitle: u,
		state: o,
		category: J("image:vision-tag"),
		body: l,
		selected: r,
		ariaLabel: `Vision Tag node, model: ${u}, state: ${o}`,
		hasBreakpoint: n._hasBreakpoint,
		pausedAtBreakpoint: n._pausedAtBreakpoint,
		children: [
			/* @__PURE__ */ U(G, {
				type: "target",
				position: K.Left,
				id: "in",
				className: Y("image")
			}),
			/* @__PURE__ */ U(G, {
				type: "source",
				position: K.Right,
				id: "out",
				className: Y("data")
			}),
			/* @__PURE__ */ U(G, {
				type: "source",
				position: K.Right,
				id: "error",
				className: `${Y("error")} !bottom-2 !top-auto`
			})
		]
	});
}
//#endregion
//#region src/components/pipelines/nodes/vision-extract-text/VisionExtractTextNode.tsx
function Bn(e) {
	let { id: t, data: n, selected: r } = e, i = I(t), a = i?.status === "cancelled" ? "failed" : i?.status, o = (n._state && n._state !== "idle" ? n._state : void 0) ?? a ?? n._state ?? "idle", s = (i?.output)?.extracted?.lines ?? [], c = s[0], l = s.length > 0 ? /* @__PURE__ */ W("div", {
		"data-testid": "extract-text-result",
		children: [/* @__PURE__ */ W("div", {
			className: "text-[11px] text-text-tertiary mb-0.5",
			children: [
				s.length,
				" line",
				s.length === 1 ? "" : "s"
			]
		}), /* @__PURE__ */ U("div", {
			className: "font-mono text-[11px] text-text-primary whitespace-nowrap overflow-hidden text-ellipsis",
			"data-testid": "extract-text-first-line",
			children: c
		})]
	}) : /* @__PURE__ */ U("span", {
		className: "text-[11px] text-text-tertiary italic",
		children: "Awaiting OCR"
	}), u = n.model ?? "claude-sonnet-4-6";
	return /* @__PURE__ */ W(q, {
		icon: "📝",
		subtitle: u,
		state: o,
		category: J("image:vision-extract-text"),
		body: l,
		selected: r,
		ariaLabel: `Vision Extract Text node, model: ${u}, state: ${o}`,
		hasBreakpoint: n._hasBreakpoint,
		pausedAtBreakpoint: n._pausedAtBreakpoint,
		children: [
			/* @__PURE__ */ U(G, {
				type: "target",
				position: K.Left,
				id: "in",
				className: Y("image")
			}),
			/* @__PURE__ */ U(G, {
				type: "source",
				position: K.Right,
				id: "out",
				className: Y("data")
			}),
			/* @__PURE__ */ U(G, {
				type: "source",
				position: K.Right,
				id: "error",
				className: `${Y("error")} !bottom-2 !top-auto`
			})
		]
	});
}
//#endregion
//#region src/components/pipelines/nodes/generate/GenerateNode.tsx
function Vn(e) {
	return !e || !e.trim() ? "No prompt set" : e.length > 80 ? `${e.slice(0, 77)}…` : e;
}
var Hn = (e) => e.stopPropagation();
function Un(e) {
	let { id: t, data: r, selected: i } = e, a = Ve(), [o, s] = V(!1), c = I(t), l = c?.status === "cancelled" ? "failed" : c?.status, d = (r._state && r._state !== "idle" ? r._state : void 0) ?? l ?? r._state ?? "idle", f = c?.images ?? [], p = c?.startedAt ? Date.parse(c.startedAt) : NaN, m = d === "running" && f.length === 0, h = (r.numImages ?? 1) > 1 || f.length > 1, g;
	if (f.length > 0 && h) g = /* @__PURE__ */ U(mn, {
		images: f,
		"data-testid": "generate-thumb-strip"
	});
	else if (m || f.length === 1) {
		let e = f[0] ? a(f[0].imageId) : void 0;
		g = /* @__PURE__ */ W(H, { children: [/* @__PURE__ */ U("button", {
			type: "button",
			"data-testid": "generate-output-preview",
			"aria-label": e ? "View generated image" : "Image synthesizing",
			className: n("block w-full rounded-md border-none bg-transparent p-0", "focus:outline-none focus-visible:ring-2 focus-visible:ring-info", e ? "cursor-zoom-in" : "cursor-default"),
			onMouseDown: Hn,
			onClick: (t) => {
				t.stopPropagation(), e && s(!0);
			},
			children: /* @__PURE__ */ U(Ze, {
				status: m ? "synthesizing" : "done",
				...e ? { src: e } : {},
				alt: "Generate output",
				...m && Number.isFinite(p) ? { startedAt: p } : {},
				className: "w-full h-20"
			})
		}), e && /* @__PURE__ */ U(u, {
			images: [{
				src: e,
				alt: "Generate output"
			}],
			openIndex: o ? 0 : null,
			onClose: () => s(!1)
		})] });
	} else g = /* @__PURE__ */ U("div", {
		className: "w-24 h-16 rounded border border-dashed border-border bg-surface-inset flex items-center justify-center px-2 text-center text-[11px] text-text-tertiary",
		"data-testid": "generate-placeholder",
		children: Vn(r.prompt)
	});
	let _ = (r.numImages ?? 1) > 1 ? `×${r.numImages}` : null, v = r.width && r.height ? `${r.width}×${r.height}` : null, y = _ || v ? /* @__PURE__ */ U("span", {
		className: "font-mono text-[11px] text-text-tertiary",
		children: [v, _].filter(Boolean).join(" · ")
	}) : void 0;
	return /* @__PURE__ */ W(q, {
		icon: "✦",
		subtitle: "image:generate",
		state: d,
		category: J("image:generate"),
		body: g,
		footer: y,
		selected: i,
		ariaLabel: `Generate node, state: ${d}`,
		hasBreakpoint: r._hasBreakpoint,
		pausedAtBreakpoint: r._pausedAtBreakpoint,
		children: [
			/* @__PURE__ */ U(G, {
				type: "target",
				position: K.Left,
				id: "in",
				className: Y("data")
			}),
			/* @__PURE__ */ U(G, {
				type: "source",
				position: K.Right,
				id: "out",
				className: Y("image")
			}),
			/* @__PURE__ */ U(G, {
				type: "source",
				position: K.Right,
				id: "error",
				className: `${Y("error")} !bottom-2 !top-auto`
			})
		]
	});
}
//#endregion
//#region src/components/pipelines/nodes/variation/VariationNode.tsx
var Wn = (e) => e.stopPropagation();
function Gn(e) {
	let { id: t, data: r, selected: i } = e, a = Ve(), [o, s] = V(!1), c = I(t), l = c?.status === "cancelled" ? "failed" : c?.status, d = (r._state && r._state !== "idle" ? r._state : void 0) ?? l ?? r._state ?? "idle", f = c?.images ?? [], p = c?.startedAt ? Date.parse(c.startedAt) : NaN, m = d === "running" && f.length === 0, h = r.numVariations ?? 1, g = h > 1 || f.length > 1, _ = /* @__PURE__ */ W("span", {
		className: "inline-block text-[10px] font-semibold bg-surface-inset border border-border rounded px-1.5 py-0.5 text-text-secondary mb-1",
		children: [
			"×",
			h,
			" variation",
			h === 1 ? "" : "s"
		]
	}), v;
	if (f.length > 0 && g) v = /* @__PURE__ */ U(mn, {
		images: f,
		"data-testid": "variation-thumb-strip"
	});
	else if (m || f.length === 1) {
		let e = f[0] ? a(f[0].imageId) : void 0;
		v = /* @__PURE__ */ W(H, { children: [/* @__PURE__ */ U("button", {
			type: "button",
			"data-testid": "variation-output-preview",
			"aria-label": e ? "View variation image" : "Image synthesizing",
			className: n("block w-full rounded-md border-none bg-transparent p-0", "focus:outline-none focus-visible:ring-2 focus-visible:ring-info", e ? "cursor-zoom-in" : "cursor-default"),
			onMouseDown: Wn,
			onClick: (t) => {
				t.stopPropagation(), e && s(!0);
			},
			children: /* @__PURE__ */ U(Ze, {
				status: m ? "synthesizing" : "done",
				...e ? { src: e } : {},
				alt: "Variation output",
				...m && Number.isFinite(p) ? { startedAt: p } : {},
				className: "w-full h-20"
			})
		}), e && /* @__PURE__ */ U(u, {
			images: [{
				src: e,
				alt: "Variation output"
			}],
			openIndex: o ? 0 : null,
			onClose: () => s(!1)
		})] });
	} else v = /* @__PURE__ */ U("div", {
		className: "w-24 h-16 rounded border border-dashed border-border bg-surface-inset flex items-center justify-center text-[11px] text-text-tertiary",
		"data-testid": "variation-placeholder",
		children: "Awaiting input"
	});
	let y = /* @__PURE__ */ W("div", { children: [_, v] }), b = r.similarity == null ? void 0 : /* @__PURE__ */ W("span", {
		className: "font-mono text-[11px] text-text-tertiary",
		children: ["similarity ", r.similarity]
	});
	return /* @__PURE__ */ W(q, {
		icon: "⊞",
		subtitle: "image:variation",
		state: d,
		category: J("image:variation"),
		body: y,
		footer: b,
		selected: i,
		ariaLabel: `Variation node, ${h} variations, state: ${d}`,
		hasBreakpoint: r._hasBreakpoint,
		pausedAtBreakpoint: r._pausedAtBreakpoint,
		children: [
			/* @__PURE__ */ U(G, {
				type: "target",
				position: K.Left,
				id: "in",
				className: Y("image")
			}),
			/* @__PURE__ */ U(G, {
				type: "source",
				position: K.Right,
				id: "out",
				className: Y("image")
			}),
			/* @__PURE__ */ U(G, {
				type: "source",
				position: K.Right,
				id: "error",
				className: `${Y("error")} !bottom-2 !top-auto`
			})
		]
	});
}
//#endregion
//#region src/components/pipelines/nodes/edit-prompt/EditPromptNode.tsx
function Kn(e) {
	return !e || !e.trim() ? "No prompt set" : e.length > 80 ? `${e.slice(0, 77)}…` : e;
}
var qn = (e) => e.stopPropagation();
function Jn(e) {
	let { id: t, data: r, selected: i } = e, a = Ve(), [o, s] = V(!1), c = I(t), l = c?.status === "cancelled" ? "failed" : c?.status, d = (r._state && r._state !== "idle" ? r._state : void 0) ?? l ?? r._state ?? "idle", f = c?.images ?? [], p = c?.startedAt ? Date.parse(c.startedAt) : NaN, m = d === "running" && f.length === 0, h = f.length > 1, g;
	if (h) g = /* @__PURE__ */ U(mn, {
		images: f,
		"data-testid": "edit-prompt-thumb-strip"
	});
	else if (m || f.length === 1) {
		let e = f[0] ? a(f[0].imageId) : void 0;
		g = /* @__PURE__ */ W(H, { children: [/* @__PURE__ */ U("button", {
			type: "button",
			"data-testid": "edit-prompt-output-preview",
			"aria-label": e ? "View edited image" : "Image synthesizing",
			className: n("block w-full rounded-md border-none bg-transparent p-0", "focus:outline-none focus-visible:ring-2 focus-visible:ring-info", e ? "cursor-zoom-in" : "cursor-default"),
			onMouseDown: qn,
			onClick: (t) => {
				t.stopPropagation(), e && s(!0);
			},
			children: /* @__PURE__ */ U(Ze, {
				status: m ? "synthesizing" : "done",
				...e ? { src: e } : {},
				alt: "Edit output",
				...m && Number.isFinite(p) ? { startedAt: p } : {},
				className: "w-full h-20"
			})
		}), e && /* @__PURE__ */ U(u, {
			images: [{
				src: e,
				alt: "Edit output"
			}],
			openIndex: o ? 0 : null,
			onClose: () => s(!1)
		})] });
	} else g = /* @__PURE__ */ U("div", {
		className: "w-24 h-16 rounded border border-dashed border-border bg-surface-inset flex items-center justify-center px-2 text-center text-[11px] text-text-tertiary",
		"data-testid": "edit-prompt-placeholder",
		children: Kn(r.prompt)
	});
	let _ = r.maskImagePath ? /* @__PURE__ */ W("span", {
		className: "font-mono text-[11px] text-text-tertiary",
		children: ["mask: ", r.maskImagePath]
	}) : void 0;
	return /* @__PURE__ */ W(q, {
		icon: "✎",
		subtitle: "image:edit-prompt",
		state: d,
		category: J("image:edit-prompt"),
		body: g,
		footer: _,
		selected: i,
		ariaLabel: `Edit Prompt node, state: ${d}`,
		hasBreakpoint: r._hasBreakpoint,
		pausedAtBreakpoint: r._pausedAtBreakpoint,
		children: [
			/* @__PURE__ */ U(G, {
				type: "target",
				position: K.Left,
				id: "in",
				className: Y("image")
			}),
			/* @__PURE__ */ U(G, {
				type: "source",
				position: K.Right,
				id: "out",
				className: Y("image")
			}),
			/* @__PURE__ */ U(G, {
				type: "source",
				position: K.Right,
				id: "error",
				className: `${Y("error")} !bottom-2 !top-auto`
			})
		]
	});
}
//#endregion
//#region src/components/pipelines/nodes/index.ts
var Yn = {
	trigger: Rt,
	llm: Vt,
	transform: Ut,
	condition: Gt,
	action: qt,
	fork: Yt,
	join: Qt,
	approval: en,
	agent: tn,
	"mcp-tool": nn,
	"knowledge-base": rn,
	"graph-query": an,
	memory: on,
	guardrail: sn,
	policy: cn,
	"ag-ui-output": ln,
	"image-source": dn,
	"image:save": hn,
	scatter: _n,
	"image:resize": vn,
	"image:transform": bn,
	"image:format-convert": Sn,
	"image:sharpen": Cn,
	"image:watermark": wn,
	"image:crop": En,
	"image:adjust-bw": Dn,
	"image:adjust-layer": kn,
	"image:dimensions": An,
	"image:upscale": jn,
	"image:vision-analyze": In,
	"image:vision-classify": Ln,
	"image:vision-describe": Rn,
	"image:vision-tag": zn,
	"image:vision-extract-text": Bn,
	"image:generate": Un,
	"image:variation": Gn,
	"image:edit-prompt": Jn
};
//#endregion
//#region src/components/pipelines/hooks/useClickOutside.ts
function Xn(e, t, n) {
	let r = B(t);
	r.current = t, R(() => {
		if (n === !1) return;
		let t = (t) => {
			e.current && !e.current.contains(t.target) && r.current();
		};
		return document.addEventListener("mousedown", t), () => document.removeEventListener("mousedown", t);
	}, [e, n]);
}
//#endregion
//#region src/components/pipelines/canvas/QuickInsertPopover.tsx
var Zn = "quick-insert-listbox", Qn = (e) => e ? `quick-insert-option-${e}` : void 0, $n = [
	{
		type: "trigger",
		icon: "⚡",
		name: "Trigger",
		description: "Starts the pipeline"
	},
	{
		type: "llm",
		icon: "🧠",
		name: "LLM",
		description: "Call an LLM model"
	},
	{
		type: "agent",
		icon: "🤖",
		name: "Agent",
		description: "Invoke a Strands agent via A2A"
	},
	{
		type: "mcp-tool",
		icon: "🔌",
		name: "MCP Tool",
		description: "Invoke an MCP Gateway tool"
	},
	{
		type: "knowledge-base",
		icon: "📚",
		name: "Knowledge Base",
		description: "RAG retrieval from Bedrock KB"
	},
	{
		type: "graph-query",
		icon: "🕸️",
		name: "Graph Query",
		description: "Neptune openCypher query"
	},
	{
		type: "memory",
		icon: "💾",
		name: "Memory",
		description: "AgentCore Memory read/write"
	},
	{
		type: "guardrail",
		icon: "🛡️",
		name: "Guardrail",
		description: "Bedrock Guardrails content filter"
	},
	{
		type: "policy",
		icon: "📜",
		name: "Policy",
		description: "Cedar authorization policy"
	},
	{
		type: "transform",
		icon: "🔧",
		name: "Transform",
		description: "Reshape the context"
	},
	{
		type: "condition",
		icon: "🔀",
		name: "Condition",
		description: "Branch on an expression"
	},
	{
		type: "fork",
		icon: "🍴",
		name: "Fork",
		description: "Split into parallel branches"
	},
	{
		type: "join",
		icon: "🔗",
		name: "Join",
		description: "Combine parallel branches"
	},
	{
		type: "action",
		icon: "🎯",
		name: "Action",
		description: "Produce a side effect"
	},
	{
		type: "ag-ui-output",
		icon: "📡",
		name: "AG-UI Output",
		description: "Stream to AG-UI frontend"
	},
	{
		type: "approval",
		icon: "✅",
		name: "Approval",
		description: "Wait for a human decision"
	}
];
function er(e, t) {
	if (!t) return !0;
	let n = t.toLowerCase();
	return e.type.toLowerCase().includes(n) || e.name.toLowerCase().includes(n) || e.description.toLowerCase().includes(n);
}
function tr({ anchor: e, flowPosition: t, disabledTypes: r = [], onClose: i, onInsert: a }) {
	let [o, s] = V(""), [c, l] = V(0), u = B(null), d = B(null), f = z(() => new Set(r), [r]), p = z(() => $n.filter((e) => !f.has(e.type) && er(e, o)), [f, o]);
	if (R(() => {
		l((e) => e >= p.length ? 0 : e);
	}, [p.length]), R(() => {
		if (e) {
			let e = setTimeout(() => d.current?.focus(), 0);
			return () => clearTimeout(e);
		}
	}, [e]), Xn(u, i, !!e), !e) return null;
	let m = (e) => {
		let n = p[e];
		!n || !t || (a(n.type, t), i());
	};
	return /* @__PURE__ */ W("div", {
		ref: u,
		className: "fixed w-[260px] bg-surface border border-border rounded-lg shadow-[0_12px_28px_rgba(15,23,42,0.14)] z-50 flex flex-col overflow-hidden font-inherit",
		style: {
			top: e.y,
			left: e.x
		},
		role: "dialog",
		"aria-label": "Quick insert node",
		"data-testid": "quick-insert-popover",
		children: [/* @__PURE__ */ U("div", {
			className: "p-2 border-b border-border",
			children: /* @__PURE__ */ U("input", {
				ref: d,
				type: "text",
				value: o,
				onChange: (e) => s(e.target.value),
				onKeyDown: (e) => {
					if (e.key === "ArrowDown") {
						if (e.preventDefault(), p.length === 0) return;
						l((e) => (e + 1) % p.length);
					} else if (e.key === "ArrowUp") {
						if (e.preventDefault(), p.length === 0) return;
						l((e) => (e - 1 + p.length) % p.length);
					} else e.key === "Enter" ? (e.preventDefault(), m(c)) : e.key === "Escape" && (e.preventDefault(), i());
				},
				placeholder: "Search nodes…",
				className: "w-full box-border border border-border-field rounded-md px-2.5 py-1.5 text-[13px] font-inherit bg-surface-inset text-text-primary outline-none",
				"aria-label": "Search node types",
				role: "combobox",
				"aria-expanded": !0,
				"aria-autocomplete": "list",
				"aria-controls": Zn,
				"aria-activedescendant": p.length > 0 ? Qn(p[c]?.type) : void 0,
				"data-testid": "quick-insert-search"
			})
		}), /* @__PURE__ */ U("div", {
			id: Zn,
			className: "max-h-[260px] overflow-y-auto py-1",
			role: "listbox",
			"aria-label": "Node types",
			children: p.length === 0 ? /* @__PURE__ */ W("div", {
				className: "px-3 py-3.5 text-xs text-text-tertiary font-inherit",
				children: [
					"No nodes match \"",
					o,
					"\""
				]
			}) : p.map((e, t) => {
				let r = t === c;
				return /* @__PURE__ */ W("div", {
					id: Qn(e.type),
					role: "option",
					"aria-selected": r,
					onMouseEnter: () => l(t),
					onMouseDown: (e) => {
						e.preventDefault(), m(t);
					},
					className: n("flex items-center gap-2.5 px-3 py-2 cursor-pointer font-inherit", r ? "bg-surface-hover" : "bg-transparent"),
					"data-node-type": e.type,
					"data-testid": `quick-insert-row-${e.type}`,
					children: [/* @__PURE__ */ U("span", {
						className: "text-lg leading-none w-[22px] text-center shrink-0",
						"aria-hidden": !0,
						children: e.icon
					}), /* @__PURE__ */ W("div", {
						className: "flex-1 min-w-0",
						children: [/* @__PURE__ */ U("div", {
							className: "text-[13px] font-semibold text-text-primary",
							children: e.name
						}), /* @__PURE__ */ U("div", {
							className: "text-[11px] text-text-secondary whitespace-nowrap overflow-hidden text-ellipsis",
							children: e.description
						})]
					})]
				}, e.type);
			})
		})]
	});
}
//#endregion
//#region src/components/pipelines/dev/useDevEditorBridge.ts
function nr({ addNode: e, addEdge: t, updateNodeData: n, getDefinition: r }) {
	R(() => {}, [
		e,
		t,
		n,
		r
	]);
}
//#endregion
//#region src/components/pipelines/canvas/useCanvasKeyboard.ts
function rr({ definition: e, selectedNodeId: t, setSelectedNodeId: n, removeNode: r, removeDefEdge: i, nodes: a, edges: o, setNodes: s, setEdges: c, setPositions: l, duplicateNodes: u, clipboardRef: d, containerRef: f }) {
	let p = B(a);
	p.current = a;
	let m = B(o);
	m.current = o, R(() => {
		let a = f.current;
		if (!a) return;
		let o = (e) => {
			let t = a.querySelector(`.react-flow__node[data-id="${CSS.escape(e)}"]`);
			return t ? ((t.querySelector("[data-pipeline-node=\"true\"]") ?? t).focus(), !0) : !1;
		}, h = (f) => {
			if (Lr(f.target)) return;
			let h = document.activeElement, g = !!h && a.contains(h);
			if (f.key === "Tab") {
				if (!g || !e || e.nodes.length === 0) return;
				let t = Rr(e);
				if (t.length === 0) return;
				let n = (h?.closest(".react-flow__node"))?.getAttribute("data-id") ?? null, r = n === null ? -1 : t.indexOf(n), i = f.shiftKey ? -1 : 1, a = t[r === -1 ? f.shiftKey ? t.length - 1 : 0 : (r + i + t.length) % t.length];
				o(a) && f.preventDefault();
				return;
			}
			if (g && !f.altKey) {
				if (f.key === "Enter" || f.key === " " || f.key === "Spacebar") {
					let e = (h?.closest(".react-flow__node"))?.getAttribute("data-id");
					e && (f.preventDefault(), n(e));
					return;
				}
				if (f.key === "Delete" || f.key === "Backspace") {
					if (t) {
						f.preventDefault(), r(t);
						return;
					}
					let e = m.current.filter((e) => e.selected);
					if (e.length > 0) {
						for (let t of e) i(t.id);
						c((e) => e.filter((e) => !e.selected));
					}
					f.preventDefault();
					return;
				}
				if (f.key === "Escape") {
					f.preventDefault(), n(null);
					return;
				}
				if ((f.metaKey || f.ctrlKey) && f.key === "c" && t) {
					f.preventDefault(), d.current = t;
					return;
				}
				if ((f.metaKey || f.ctrlKey) && f.key === "v" && d.current) {
					f.preventDefault();
					let e = u([d.current]);
					e.length > 0 && n(e[0]);
					return;
				}
				if ((f.metaKey || f.ctrlKey) && f.key === "d" && t) {
					f.preventDefault();
					let e = u([t]);
					e.length > 0 && n(e[0]);
					return;
				}
				if (f.key === "ArrowUp" || f.key === "ArrowDown" || f.key === "ArrowLeft" || f.key === "ArrowRight") {
					if (f.preventDefault(), f.stopPropagation(), !f.shiftKey || !t) return;
					let e = f.key === "ArrowLeft" ? -8 : f.key === "ArrowRight" ? 8 : 0, n = f.key === "ArrowUp" ? -8 : f.key === "ArrowDown" ? 8 : 0, r = p.current.find((e) => e.id === t);
					if (!r) return;
					let i = {
						x: r.position.x + e,
						y: r.position.y + n
					};
					s((e) => e.map((e) => e.id === t ? {
						...e,
						position: i
					} : e)), l([{
						id: t,
						position: i
					}]);
				}
			}
		};
		return a.addEventListener("keydown", h), () => a.removeEventListener("keydown", h);
	}, [
		e,
		t,
		n,
		r,
		i,
		s,
		c,
		l,
		u,
		d,
		f
	]);
}
//#endregion
//#region src/components/pipelines/canvas/useCanvasDragDrop.ts
function ir({ addNode: e, screenToFlowPosition: t }) {
	return {
		handleDragOver: L((e) => {
			e.preventDefault(), e.dataTransfer.dropEffect = "move";
		}, []),
		handleDrop: L((n) => {
			n.preventDefault();
			let r = n.dataTransfer.getData("application/reactflow");
			if (!r) return;
			let i = null;
			try {
				i = JSON.parse(r);
			} catch {
				return;
			}
			let a = i?.nodeType;
			a && e(a, t({
				x: n.clientX,
				y: n.clientY
			}));
		}, [e, t])
	};
}
//#endregion
//#region src/components/pipelines/canvas/CanvasContextMenu.tsx
function ar({ nodeMenu: e, breakpoints: t, showBreakpointOption: r, onFilterLog: i, onCopyNodeId: a, onDuplicate: o, onToggleBreakpoint: s, onDismiss: c }) {
	R(() => {
		let e = (e) => {
			e.target?.closest("[data-testid=\"canvas-node-context-menu\"]") || c();
		}, t = (e) => {
			e.key === "Escape" && c();
		};
		return document.addEventListener("mousedown", e), window.addEventListener("keydown", t), () => {
			document.removeEventListener("mousedown", e), window.removeEventListener("keydown", t);
		};
	}, [c]);
	let l = "block w-full text-left px-3 py-2 border-none bg-transparent text-[13px] cursor-pointer rounded font-inherit";
	return /* @__PURE__ */ W("div", {
		"data-testid": "canvas-node-context-menu",
		role: "menu",
		"aria-label": "Node actions",
		onKeyDown: (e) => rt(e, {
			itemSelector: "[role=\"menuitem\"]",
			orientation: "vertical"
		}),
		className: "fixed bg-surface border border-border rounded-md shadow-[0_8px_20px_rgba(15,23,42,0.16)] min-w-[220px] z-50 p-1 font-inherit",
		style: {
			top: e.y,
			left: e.x
		},
		children: [
			/* @__PURE__ */ U("button", {
				type: "button",
				role: "menuitem",
				onClick: i,
				"data-testid": "ctx-filter-log",
				className: n(l, "text-text-primary"),
				children: "🎯 Filter log to this node"
			}),
			/* @__PURE__ */ U("button", {
				type: "button",
				role: "menuitem",
				onClick: a,
				"data-testid": "ctx-copy-id",
				className: n(l, "text-text-primary"),
				children: "📋 Copy node id"
			}),
			/* @__PURE__ */ U("button", {
				type: "button",
				role: "menuitem",
				onClick: o,
				"data-testid": "ctx-duplicate",
				className: n(l, "text-text-primary"),
				children: "📑 Duplicate node"
			}),
			r ? /* @__PURE__ */ U("button", {
				type: "button",
				role: "menuitem",
				onClick: s,
				"data-testid": "ctx-toggle-breakpoint",
				className: n(l, t?.has(e.nodeId) ? "text-danger-fg" : "text-text-primary"),
				children: t?.has(e.nodeId) ? "🔴 Remove Breakpoint" : "🔴 Toggle Breakpoint"
			}) : null
		]
	});
}
//#endregion
//#region src/components/pipelines/canvas/paletteRelevance.ts
function or(e) {
	let t = e.indexOf(":");
	return t > 0 ? e.slice(0, t) : null;
}
function sr(e, t, n = {}) {
	let r = n.limit ?? 6;
	if (r <= 0) return [];
	let i = new Set(n.unavailable ?? []), a = new Set(e), o = /* @__PURE__ */ new Set();
	for (let t of e) {
		let e = or(t);
		e && o.add(e);
	}
	let s = [], c = /* @__PURE__ */ new Set();
	for (let e of t) c.has(e) || i.has(e) || a.has(e) && (s.push({
		kind: e,
		reason: "in-pipeline"
	}), c.add(e));
	for (let e of t) {
		if (c.has(e) || i.has(e)) continue;
		let t = or(e);
		t && o.has(t) && (s.push({
			kind: e,
			reason: "same-namespace"
		}), c.add(e));
	}
	return s.slice(0, r);
}
//#endregion
//#region src/components/pipelines/canvas/NodePalette.tsx
var cr = [
	{
		type: "trigger",
		icon: "⚡",
		name: "Trigger",
		description: "Starts the pipeline"
	},
	{
		type: "image-source",
		icon: "🖼",
		name: "Image Source",
		description: "Inject an image into the pipeline context"
	},
	{
		type: "knowledge-base",
		icon: "📚",
		name: "Knowledge Base",
		description: "RAG retrieval from Bedrock KB"
	},
	{
		type: "graph-query",
		icon: "🕸️",
		name: "Graph Query",
		description: "Neptune openCypher query"
	},
	{
		type: "llm",
		icon: "🧠",
		name: "LLM",
		description: "Call an LLM model"
	},
	{
		type: "agent",
		icon: "🤖",
		name: "Agent",
		description: "Run a Claude agent loop — multi-turn, tool use"
	},
	{
		type: "mcp-tool",
		icon: "🔌",
		name: "MCP Tool",
		description: "Invoke an MCP Gateway tool"
	},
	{
		type: "image:vision-analyze",
		icon: "📷",
		name: "Vision Analyze",
		description: "Analyze an image with a multimodal LLM"
	},
	{
		type: "image:vision-classify",
		icon: "🏷",
		name: "Vision Classify",
		description: "Classify image into a label set"
	},
	{
		type: "image:vision-describe",
		icon: "💬",
		name: "Vision Describe",
		description: "Generate a natural-language caption of an image"
	},
	{
		type: "image:vision-tag",
		icon: "🔖",
		name: "Vision Tag",
		description: "Extract ranked tags from an image"
	},
	{
		type: "image:vision-extract-text",
		icon: "📝",
		name: "Vision Extract Text",
		description: "OCR / text extraction from an image"
	},
	{
		type: "image:generate",
		icon: "✦",
		name: "Generate",
		description: "Generate an image from a text prompt via Bedrock"
	},
	{
		type: "image:variation",
		icon: "⊞",
		name: "Variation",
		description: "Generate variations of a source image via Nova Canvas"
	},
	{
		type: "image:edit-prompt",
		icon: "✎",
		name: "Edit Prompt",
		description: "Inpaint or outpaint a region via Nova Canvas"
	},
	{
		type: "transform",
		icon: "🔧",
		name: "Transform",
		description: "Reshape the context"
	},
	{
		type: "memory",
		icon: "💾",
		name: "Memory",
		description: "AgentCore Memory read/write"
	},
	{
		type: "image:crop",
		icon: "✂",
		name: "Crop",
		description: "Crop a region from an image using a bbox"
	},
	{
		type: "image:resize",
		icon: "⤢",
		name: "Resize",
		description: "Resize an image to target dimensions"
	},
	{
		type: "image:transform",
		icon: "↻",
		name: "Transform Image",
		description: "Rotate, flip or flop an image"
	},
	{
		type: "image:format-convert",
		icon: "⇌",
		name: "Format Convert",
		description: "Convert image to JPEG, PNG, WebP or AVIF"
	},
	{
		type: "image:sharpen",
		icon: "◈",
		name: "Sharpen",
		description: "Apply unsharp-mask sharpening"
	},
	{
		type: "image:watermark",
		icon: "⊕",
		name: "Watermark",
		description: "Composite an overlay image onto the source"
	},
	{
		type: "image:adjust-bw",
		icon: "◐",
		name: "Adjust B/W",
		description: "Convert image to black and white"
	},
	{
		type: "image:adjust-layer",
		icon: "𝍩",
		name: "Adjust Layers",
		description: "Apply stacked colour/filter adjustments"
	},
	{
		type: "image:dimensions",
		icon: "📐",
		name: "Dimensions",
		description: "Read an image's size → feed generate"
	},
	{
		type: "image:upscale",
		icon: "⤢",
		name: "Upscale",
		description: "4× super-resolution (self-hosted)"
	},
	{
		type: "condition",
		icon: "🔀",
		name: "Condition",
		description: "Branch on an expression"
	},
	{
		type: "fork",
		icon: "🍴",
		name: "Fork",
		description: "Split into parallel branches"
	},
	{
		type: "join",
		icon: "🔗",
		name: "Join",
		description: "Combine parallel branches"
	},
	{
		type: "scatter",
		icon: "⑂",
		name: "Scatter",
		description: "Fan out over an array — one arm per item"
	},
	{
		type: "guardrail",
		icon: "🛡️",
		name: "Guardrail",
		description: "Bedrock Guardrails content filter"
	},
	{
		type: "policy",
		icon: "📜",
		name: "Policy",
		description: "Cedar authorization policy"
	},
	{
		type: "action",
		icon: "🎯",
		name: "Action",
		description: "Produce a side effect"
	},
	{
		type: "ag-ui-output",
		icon: "📡",
		name: "AG-UI Output",
		description: "Stream to AG-UI frontend"
	},
	{
		type: "image:save",
		icon: "⬇",
		name: "Save Image",
		description: "Write produced image to artifact store"
	},
	{
		type: "approval",
		icon: "✅",
		name: "Approval",
		description: "Wait for a human decision"
	}
], lr = [
	{
		key: "source",
		name: "Sources"
	},
	{
		key: "transform",
		name: "Transform"
	},
	{
		key: "ai",
		name: "AI"
	},
	{
		key: "control",
		name: "Control"
	},
	{
		key: "sink",
		name: "Sinks"
	},
	{
		key: "human",
		name: "Human"
	}
], ur = {
	source: "bg-cat-source",
	transform: "bg-cat-transform",
	ai: "bg-cat-ai",
	control: "bg-cat-control",
	sink: "bg-cat-sink",
	human: "bg-cat-human"
}, dr = new Set(cr.map((e) => e.type));
function fr(e) {
	if (e === "image-source") return "image";
	let t = e.indexOf(":");
	if (t <= 0) return null;
	let n = e.slice(0, t);
	return dr.has(n) ? null : n;
}
var pr = lr.map(({ key: e, name: t }) => ({
	key: e,
	name: t,
	items: cr.filter((t) => J(t.type) === e).map((n) => ({
		...n,
		category: t,
		nodeCategory: e
	}))
})).filter((e) => e.items.length > 0), mr = pr.flatMap((e) => e.items.map((e) => ({
	type: e.type,
	name: e.name
})));
pr.map((e) => e.name);
var hr = "pipeline.palette.recents", gr = 5, _r = "pipeline.palette.compact";
function vr() {
	if (typeof window > "u") return [];
	try {
		let e = window.localStorage.getItem(hr);
		if (!e) return [];
		let t = JSON.parse(e);
		return Array.isArray(t) ? t : [];
	} catch {
		return [];
	}
}
function yr(e) {
	if (!(typeof window > "u")) try {
		window.localStorage.setItem(hr, JSON.stringify(e));
	} catch {}
}
function br(e) {
	yr([e, ...vr().filter((t) => t !== e)].slice(0, gr));
}
var xr = "pipeline.palette.collapsed.";
function Sr(e, t = !1) {
	if (typeof window > "u") return t;
	try {
		let n = window.localStorage.getItem(xr + e);
		return n === null ? t : n === "true";
	} catch {
		return t;
	}
}
function Cr(e, t) {
	if (!(typeof window > "u")) try {
		window.localStorage.setItem(xr + e, String(t));
	} catch {}
}
function wr(e, t) {
	if (!t) return !0;
	let n = t.toLowerCase();
	return e.name.toLowerCase().includes(n) || e.type.toLowerCase().includes(n) || e.description.toLowerCase().includes(n);
}
function Tr({ expanded: e }) {
	return /* @__PURE__ */ U("svg", {
		width: "12",
		height: "12",
		viewBox: "0 0 12 12",
		fill: "none",
		"aria-hidden": "true",
		className: n("shrink-0 transition-transform duration-150", e ? "rotate-90" : "rotate-0"),
		children: /* @__PURE__ */ U("path", {
			d: "M4 2.5l3.5 3.5L4 9.5",
			stroke: "currentColor",
			strokeWidth: "1.5",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
}
function Er({ disabledTypes: e = [], contextTypes: t, serverKinds: r }) {
	let [i, a] = V(""), [o, s] = V(/* @__PURE__ */ new Set()), [c, u] = V(null), [d, f] = V(() => vr()), [p, m] = V(() => {
		if (typeof window > "u") return !1;
		try {
			return window.localStorage.getItem(_r) === "true";
		} catch {
			return !1;
		}
	}), [h, g] = V(() => {
		let e = {};
		for (let t of pr) e[t.name] = Sr(t.name);
		return e;
	}), _ = z(() => new Set(e), [e]), v = z(() => {
		if (!r || r.length === 0) return [];
		let e = new Set(cr.map((e) => e.type)), t = /* @__PURE__ */ new Map();
		for (let n of r) {
			if (e.has(n)) continue;
			let r = or(n);
			if (!r || e.has(r)) continue;
			let i = t.get(r);
			i ? i.push(n) : t.set(r, [n]);
		}
		return [...t.entries()].sort(([e], [t]) => e < t ? -1 : 1).map(([e, t]) => {
			let n = e.charAt(0).toUpperCase() + e.slice(1);
			return {
				key: e,
				name: n,
				serverTail: !0,
				items: t.sort().map((t) => ({
					type: t,
					icon: "⚙",
					name: t,
					description: `Server step · ${e}`,
					category: n
				}))
			};
		});
	}, [r]), y = z(() => {
		let e = /* @__PURE__ */ new Map();
		if (!r) return e;
		let t = new Set(cr.map((e) => e.type));
		for (let n of r) {
			if (t.has(n)) continue;
			let r = or(n);
			if (!r || !t.has(r)) continue;
			let i = J(r);
			if (!i) continue;
			let a = {
				type: n,
				icon: "⚙",
				name: n,
				description: `Server step · extends ${r}`,
				category: i,
				nodeCategory: i
			}, o = e.get(i);
			o ? o.push(a) : e.set(i, [a]);
		}
		return e;
	}, [r]), b = z(() => {
		let e = /* @__PURE__ */ new Map(), t = pr.map((t) => {
			let n = y.get(t.key), r = n ? [...t.items, ...n] : t.items, i = [];
			for (let t of r) {
				let n = fr(t.type);
				if (!n) {
					i.push(t);
					continue;
				}
				let r = e.get(n);
				r ? r.push(t) : e.set(n, [t]);
			}
			return {
				...t,
				items: i
			};
		}).filter((e) => e.items.length > 0), n = [...e.entries()].sort(([e], [t]) => e < t ? -1 : 1).map(([e, t]) => ({
			key: e,
			name: e.charAt(0).toUpperCase() + e.slice(1),
			domain: e,
			items: t
		}));
		return [
			...t,
			...n,
			...v
		];
	}, [v, y]), x = z(() => {
		let e = /* @__PURE__ */ new Set();
		for (let n of t ?? []) {
			let t = fr(n);
			t && e.add(t);
		}
		return e;
	}, [t]), S = L((e) => {
		let t = e.domain ?? (e.serverTail ? e.key : null);
		return t ? !x.has(t) : !1;
	}, [x]), C = z(() => b.map((e) => e.name), [b]);
	R(() => {
		let e = (e) => {
			e.key === hr && f(vr());
		};
		return window.addEventListener("storage", e), () => window.removeEventListener("storage", e);
	}, []), R(() => {
		if (!(typeof window > "u")) try {
			window.localStorage.setItem(_r, String(p));
		} catch {}
	}, [p]);
	let w = L((e) => {
		s((t) => {
			let n = new Set(t);
			return n.has(e) ? n.delete(e) : n.add(e), n;
		});
	}, []), T = L(() => {
		a(""), s(/* @__PURE__ */ new Set());
	}, []), E = L((e, t) => {
		g((n) => {
			let r = {
				...n,
				[e]: !t
			};
			return Cr(e, r[e]), r;
		});
	}, []), D = z(() => {
		let e = /* @__PURE__ */ new Map();
		for (let t of b) for (let n of t.items) e.set(n.type, n);
		return e;
	}, [b]), ee = ze(), O = z(() => {
		if (!t || t.length === 0) return [];
		let e = [...D.keys()];
		return sr(t, e, { unavailable: e.filter((e) => !ee(e) || _.has(e)) }).map((e) => D.get(e.kind)).filter(Boolean);
	}, [
		t,
		D,
		ee,
		_
	]), te = z(() => d.map((e) => D.get(e)).filter(Boolean), [d, D]), A = O.length > 0 ? O : te, ne = O.length > 0 ? "Relevant here" : "Recently used", j = z(() => {
		let e = !i && o.size === 0, t = new Set(e ? A.map((e) => e.type) : []);
		return b.map((e) => {
			let n = o.size > 0 && !o.has(e.name) ? [] : e.items.filter((e) => !t.has(e.type) && wr(e, i));
			return {
				...e,
				items: n
			};
		}).filter((e) => e.items.length > 0);
	}, [
		i,
		o,
		b,
		A
	]), M = i.length > 0 || o.size > 0, N = z(() => {
		let e = /* @__PURE__ */ new Set(), t = [];
		if (!i && o.size === 0) for (let n of A) t.push(n), e.add(n.type);
		for (let n of j) if (!(!M && (h[n.name] ?? S(n)))) for (let r of n.items) e.has(r.type) || (t.push(r), e.add(r.type));
		return t;
	}, [
		A,
		j,
		i,
		o,
		h,
		M,
		S
	]), re = B(N);
	R(() => {
		re.current = N;
	}, [N]);
	let ie = j.length === 0 && (i !== "" || o.size > 0), P = (e) => (t) => {
		if (_.has(e.type)) {
			t.preventDefault();
			return;
		}
		t.dataTransfer.setData("application/reactflow", JSON.stringify({ nodeType: e.type })), t.dataTransfer.effectAllowed = "move";
	}, F = (e, t) => {
		let r = _.has(e.type), i = !ee(e.type), a = c === e.type && !r, o = t !== null && t < 9 ? t + 1 : null;
		return p ? /* @__PURE__ */ W("div", {
			draggable: !r,
			onDragStart: P(e),
			onMouseEnter: () => u(e.type),
			onMouseLeave: () => u(null),
			className: n("h-8 box-border my-px mx-2 px-2 flex items-center gap-2 rounded font-[inherit]", r ? "cursor-not-allowed opacity-45" : "cursor-grab", a ? "bg-surface-hover" : "bg-transparent"),
			title: r ? `${e.name} is already placed` : i ? `${e.name} — preview: this deployment has no executor for it yet, so the step will not run.` : o ? `${e.description} — press ${o}` : e.description,
			"data-preview": i || void 0,
			"data-node-type": e.type,
			"data-disabled": r || void 0,
			"data-testid": `palette-item-${e.type}`,
			children: [
				/* @__PURE__ */ U("span", {
					"aria-hidden": !0,
					"data-testid": `palette-accent-${e.type}`,
					className: n("w-1.5 h-1.5 rounded-full shrink-0", e.nodeCategory && ur[e.nodeCategory])
				}),
				/* @__PURE__ */ U("span", {
					className: "text-base leading-none w-5 text-center shrink-0",
					"aria-hidden": !0,
					children: e.icon
				}),
				/* @__PURE__ */ U("span", {
					className: n("text-[12px] font-medium text-text-primary truncate", r && "line-through"),
					children: e.name
				}),
				o !== null && /* @__PURE__ */ U("kbd", {
					"data-testid": `palette-shortcut-${e.type}`,
					className: n("ml-auto text-[10px] font-semibold font-mono text-neutral bg-surface-hover border border-border rounded px-1 leading-[14px] min-w-[14px] text-center shrink-0", r && "opacity-50"),
					children: o
				})
			]
		}, e.type) : /* @__PURE__ */ W("div", {
			draggable: !r,
			onDragStart: P(e),
			onMouseEnter: () => u(e.type),
			onMouseLeave: () => u(null),
			className: n("h-11 box-border my-0.5 mx-2 py-1.5 px-2.5 flex items-center gap-2.5 rounded-md border border-transparent font-[inherit]", r ? "cursor-not-allowed opacity-45" : "cursor-grab", a ? "bg-surface-panel" : "bg-transparent"),
			title: r ? `${e.name} is already placed` : i ? `${e.name} — preview: this deployment has no executor for it yet, so the step will not run.` : o ? `${e.description} — press ${o}` : e.description,
			"data-preview": i || void 0,
			"data-node-type": e.type,
			"data-disabled": r || void 0,
			"data-testid": `palette-item-${e.type}`,
			children: [
				/* @__PURE__ */ U("span", {
					"aria-hidden": !0,
					"data-testid": `palette-accent-${e.type}`,
					className: n("w-1.5 h-1.5 rounded-full shrink-0", e.nodeCategory && ur[e.nodeCategory])
				}),
				/* @__PURE__ */ U("span", {
					className: "text-lg leading-none w-[22px] text-center shrink-0",
					"aria-hidden": !0,
					children: e.icon
				}),
				/* @__PURE__ */ W("div", {
					className: "flex-1 min-w-0",
					children: [/* @__PURE__ */ W("div", {
						className: n("text-[13px] font-semibold text-text-primary flex items-center gap-1.5", r && "line-through"),
						children: [
							/* @__PURE__ */ U("span", {
								className: "truncate",
								children: e.name
							}),
							i && /* @__PURE__ */ U("span", {
								"data-testid": `palette-preview-${e.type}`,
								className: "shrink-0 rounded-full border border-warning-border bg-warning-bg px-1.5 text-[9px] font-semibold uppercase tracking-wide text-warning-fg",
								title: "No executor handler in this deployment",
								children: "preview"
							}),
							o !== null && /* @__PURE__ */ U("kbd", {
								"data-testid": `palette-shortcut-${e.type}`,
								className: n("text-[10px] font-semibold font-mono text-neutral bg-surface-hover border border-border rounded px-1 leading-[14px] min-w-[14px] text-center shrink-0", r && "opacity-50"),
								children: o
							})
						]
					}), /* @__PURE__ */ U("div", {
						className: "text-[11px] text-neutral truncate",
						children: r ? "Placed" : i ? "Preview — no executor" : e.description
					})]
				})
			]
		}, e.type);
	}, ae = A.length > 0 && !i && o.size === 0, oe = 0;
	return /* @__PURE__ */ W("div", {
		className: "w-[220px] shrink-0 h-full border-r border-border bg-surface flex flex-col",
		"data-testid": "node-palette",
		children: [
			/* @__PURE__ */ W("div", {
				className: "shrink-0 border-b border-border",
				children: [/* @__PURE__ */ W("div", {
					className: "flex items-center gap-1.5 py-2.5 px-3",
					children: [/* @__PURE__ */ U(k, {
						type: "text",
						value: i,
						onChange: (e) => a(e.target.value),
						placeholder: "Search nodes...",
						"aria-label": "Search nodes",
						"data-testid": "palette-search",
						className: "flex-1 min-w-0"
					}), /* @__PURE__ */ U("button", {
						type: "button",
						onClick: () => m((e) => !e),
						title: p ? "Switch to card view" : "Switch to compact view",
						"data-testid": "palette-compact-toggle",
						"aria-pressed": p,
						className: n("shrink-0 w-7 h-7 flex items-center justify-center rounded border text-[11px] transition-colors", p ? "bg-info border-info text-white" : "bg-surface border-border-emphasis text-neutral hover:bg-surface-panel"),
						children: p ? /* @__PURE__ */ W("svg", {
							width: "14",
							height: "14",
							viewBox: "0 0 14 14",
							fill: "none",
							"aria-hidden": "true",
							children: [
								/* @__PURE__ */ U("rect", {
									x: "1",
									y: "2",
									width: "12",
									height: "2",
									rx: "1",
									fill: "currentColor"
								}),
								/* @__PURE__ */ U("rect", {
									x: "1",
									y: "6",
									width: "12",
									height: "2",
									rx: "1",
									fill: "currentColor"
								}),
								/* @__PURE__ */ U("rect", {
									x: "1",
									y: "10",
									width: "12",
									height: "2",
									rx: "1",
									fill: "currentColor"
								})
							]
						}) : /* @__PURE__ */ W("svg", {
							width: "14",
							height: "14",
							viewBox: "0 0 14 14",
							fill: "none",
							"aria-hidden": "true",
							children: [
								/* @__PURE__ */ U("rect", {
									x: "1",
									y: "1",
									width: "5",
									height: "5",
									rx: "1",
									fill: "currentColor"
								}),
								/* @__PURE__ */ U("rect", {
									x: "8",
									y: "1",
									width: "5",
									height: "5",
									rx: "1",
									fill: "currentColor"
								}),
								/* @__PURE__ */ U("rect", {
									x: "1",
									y: "8",
									width: "5",
									height: "5",
									rx: "1",
									fill: "currentColor"
								}),
								/* @__PURE__ */ U("rect", {
									x: "8",
									y: "8",
									width: "5",
									height: "5",
									rx: "1",
									fill: "currentColor"
								})
							]
						})
					})]
				}), /* @__PURE__ */ U("div", {
					className: "flex flex-wrap gap-1 px-3 pb-2.5",
					"data-testid": "palette-category-chips",
					children: C.map((e) => /* @__PURE__ */ U(l, {
						size: "xs",
						active: o.has(e),
						onClick: () => w(e),
						"data-testid": `palette-chip-${e}`,
						children: e
					}, e))
				})]
			}),
			/* @__PURE__ */ W("div", {
				className: "flex-1 overflow-y-auto py-1",
				"data-testid": "palette-scroll",
				children: [ae && /* @__PURE__ */ W("div", {
					"data-testid": "palette-recents",
					children: [/* @__PURE__ */ W("button", {
						type: "button",
						onClick: () => E("__recents__", !!h.__recents__),
						className: "w-full flex items-center gap-1 pt-2 pb-1 px-3.5 text-[10px] font-bold tracking-[0.6px] uppercase text-text-tertiary hover:text-text-secondary transition-colors font-[inherit]",
						"aria-expanded": !h.__recents__,
						children: [/* @__PURE__ */ U(Tr, { expanded: !h.__recents__ }), ne]
					}), !h.__recents__ && /* @__PURE__ */ U("div", { children: A.map((e) => {
						let t = oe++;
						return F(e, t);
					}) })]
				}), ie ? /* @__PURE__ */ W("div", {
					className: "flex flex-col items-center gap-3 px-4 py-8 text-center",
					"data-testid": "palette-empty",
					children: [/* @__PURE__ */ U("span", {
						className: "text-xs text-text-tertiary",
						children: "No nodes match"
					}), /* @__PURE__ */ U("button", {
						type: "button",
						onClick: T,
						"data-testid": "palette-clear-filters",
						className: "text-[11px] font-semibold text-info-fg hover:underline",
						children: "Clear filters"
					})]
				}) : j.map((e) => {
					let t = M ? !1 : h[e.name] ?? S(e);
					return /* @__PURE__ */ W("div", {
						"data-testid": `palette-category-${e.name}`,
						children: [/* @__PURE__ */ W("button", {
							type: "button",
							onClick: () => E(e.name, t),
							className: "w-full flex items-center gap-1 pt-2 pb-1 px-3.5 text-[10px] font-bold tracking-[0.6px] uppercase text-text-tertiary hover:text-text-secondary transition-colors font-[inherit]",
							"aria-expanded": !t,
							children: [
								/* @__PURE__ */ U(Tr, { expanded: !t }),
								/* @__PURE__ */ U("span", {
									"aria-hidden": !0,
									"data-testid": `palette-section-accent-${e.key}`,
									className: n("w-1.5 h-1.5 rounded-full shrink-0", ur[e.key])
								}),
								e.name
							]
						}), !t && /* @__PURE__ */ U("div", { children: e.items.map((e) => {
							let t = oe++;
							return F(e, t);
						}) })]
					}, e.name);
				})]
			}),
			/* @__PURE__ */ U("div", {
				className: "py-2 px-3 border-t border-border text-[10px] text-text-tertiary font-[inherit] shrink-0",
				children: "Press 1–9 to insert at center"
			})
		]
	});
}
//#endregion
//#region src/components/pipelines/canvas/QuickInsertLayer.tsx
function Dr({ definition: e, addNode: t, screenToFlowPosition: n, containerRef: r }) {
	return R(() => {
		let i = (i) => {
			if (!Lr(i.target) && !(i.metaKey || i.ctrlKey || i.altKey) && /^[1-8]$/.test(i.key)) {
				let a = mr[Number(i.key) - 1];
				if (!a || a.type === "trigger" && e?.nodes.some((e) => e.type === "trigger")) return;
				let o = r.current?.getBoundingClientRect(), { x: s, y: c } = o ? n({
					x: o.left + o.width / 2,
					y: o.top + o.height / 2
				}) : {
					x: 0,
					y: 0
				};
				if (e) for (let t of e.nodes) Math.abs(t.position.x - s) < 16 && Math.abs(t.position.y - c) < 16 && (s += 24, c += 24);
				t(a.type, {
					x: s,
					y: c
				}), i.preventDefault();
			}
		};
		return window.addEventListener("keydown", i), () => window.removeEventListener("keydown", i);
	}, [
		t,
		e,
		n,
		r
	]), null;
}
//#endregion
//#region src/components/pipelines/canvas/autoArrange.ts
var Or = 280, kr = 120, Ar = 40, jr = 40;
function Mr(e, t) {
	let n = t?.layerSpacingX ?? Or, r = t?.nodeSpacingY ?? kr, i = t?.startX ?? Ar, a = t?.startY ?? jr;
	if (e.nodes.length === 0) return [];
	let o = /* @__PURE__ */ new Map();
	for (let t of e.nodes) o.set(t.id, []);
	for (let t of e.edges) {
		let e = o.get(t.source);
		e && o.has(t.target) && e.push(t.target);
	}
	let s = e.nodes.filter((e) => e.type === "trigger").map((e) => e.id).sort()[0], c = /* @__PURE__ */ new Map();
	if (s !== void 0) {
		let e = [s];
		for (c.set(s, 0); e.length > 0;) {
			let t = e.shift(), n = c.get(t), r = o.get(t) ?? [];
			for (let t of r) c.has(t) || (c.set(t, n + 1), e.push(t));
		}
	}
	let l = /* @__PURE__ */ new Map(), u = -1;
	for (let t of e.nodes) {
		let e = c.get(t.id);
		e !== void 0 && (l.has(e) || l.set(e, []), l.get(e).push(t.id), e > u && (u = e));
	}
	for (let e of l.values()) e.sort();
	let d = e.nodes.filter((e) => !c.has(e.id)).map((e) => e.id).sort(), f = u >= 0 ? u + 1 : 0;
	d.length > 0 && l.set(f, d);
	let p = [], m = [...l.keys()].sort((e, t) => e - t);
	for (let e of m) {
		let t = l.get(e), o = t.length, s = i + e * n;
		for (let e = 0; e < o; e++) {
			let n = a + (e - o / 2) * r;
			p.push({
				id: t[e],
				position: {
					x: s,
					y: n
				}
			});
		}
	}
	return p;
}
//#endregion
//#region src/components/pipelines/canvas/useCanvasLayout.ts
function Nr({ definition: e, setPositions: t, fitView: n }) {
	return {
		handleFitView: L(() => {
			n({
				padding: .15,
				duration: 500
			});
		}, [n]),
		handleAutoArrange: L(() => {
			if (!e) return;
			let r = Mr(e);
			r.length !== 0 && (t(r), typeof requestAnimationFrame == "function" ? requestAnimationFrame(() => n({
				padding: .15,
				duration: 500
			})) : n({
				padding: .15,
				duration: 500
			}));
		}, [
			e,
			t,
			n
		])
	};
}
//#endregion
//#region src/components/pipelines/canvas/CanvasToolbar.tsx
function Pr({ definition: e, setPositions: t, fitView: n }) {
	let { handleFitView: r, handleAutoArrange: i } = Nr({
		definition: e,
		setPositions: t,
		fitView: n
	});
	return R(() => {
		let e = (e) => {
			let t = e.target;
			if (!(t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) && e.shiftKey && (e.key === "A" || e.key === "a")) {
				if (e.metaKey || e.ctrlKey || e.altKey) return;
				e.preventDefault(), i();
			}
		};
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, [i]), /* @__PURE__ */ W(H, { children: [/* @__PURE__ */ U("button", {
		type: "button",
		onClick: i,
		className: "absolute top-3 right-[50px] z-[5] w-8 h-8 inline-flex items-center justify-center bg-surface border border-border rounded-md shadow-sm text-text-secondary cursor-pointer p-0 font-inherit text-sm leading-none",
		title: "Auto-arrange (Shift+A)",
		"aria-label": "Auto-arrange",
		"data-testid": "auto-arrange-btn",
		children: /* @__PURE__ */ U("svg", {
			width: "14",
			height: "14",
			viewBox: "0 0 16 16",
			fill: "none",
			"aria-hidden": "true",
			children: /* @__PURE__ */ U("path", {
				d: "M2 4h8M2 8h12M2 12h6",
				stroke: "currentColor",
				strokeWidth: "1.5",
				strokeLinecap: "round"
			})
		})
	}), /* @__PURE__ */ U("button", {
		type: "button",
		onClick: r,
		className: "absolute top-3 right-3 z-[5] w-8 h-8 inline-flex items-center justify-center bg-surface border border-border rounded-md shadow-sm text-text-secondary cursor-pointer p-0 font-inherit text-sm leading-none",
		title: "Fit view",
		"aria-label": "Fit view",
		children: /* @__PURE__ */ U("svg", {
			width: "14",
			height: "14",
			viewBox: "0 0 16 16",
			fill: "none",
			"aria-hidden": "true",
			children: /* @__PURE__ */ U("path", {
				d: "M2 6V2h4M14 6V2h-4M2 10v4h4M14 10v4h-4",
				stroke: "currentColor",
				strokeWidth: "1.5",
				strokeLinecap: "round",
				strokeLinejoin: "round"
			})
		})
	})] });
}
//#endregion
//#region src/components/pipelines/canvas/PipelineCanvas.tsx
var Fr = .1, Ir = {
	padding: .15,
	minZoom: Fr,
	maxZoom: 1
};
function Lr(e) {
	if (!e || !(e instanceof HTMLElement)) return !1;
	let t = e.tagName;
	return !!(t === "INPUT" || t === "TEXTAREA" || t === "SELECT" || e.isContentEditable);
}
function Rr(e) {
	if (e.nodes.length === 0) return [];
	let t = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map();
	for (let r of e.nodes) t.set(r.id, []), n.set(r.id, 0);
	for (let r of e.edges) !t.has(r.source) || !n.has(r.target) || (t.get(r.source).push(r.target), n.set(r.target, (n.get(r.target) ?? 0) + 1));
	let r = [], i = e.nodes.filter((e) => (n.get(e.id) ?? 0) === 0).map((e) => e.id).sort();
	for (; i.length > 0;) {
		let e = i.shift();
		r.push(e);
		let a = (t.get(e) ?? []).slice().sort();
		for (let e of a) {
			let t = (n.get(e) ?? 0) - 1;
			n.set(e, t), t === 0 && i.push(e);
		}
	}
	if (r.length < e.nodes.length) {
		let t = new Set(r), n = e.nodes.filter((e) => !t.has(e.id)).map((e) => e.id).sort();
		r.push(...n);
	}
	return r;
}
var zr = { animated: it }, Br = Yn;
function Vr(e) {
	return {
		id: e.id,
		type: e.type,
		position: e.position,
		data: {
			...e.data,
			nodeType: e.type
		}
	};
}
function Hr(e) {
	let t = e.sourceHandle === "true" || e.sourceHandle === "false" || e.sourceHandle === "approved" || e.sourceHandle === "rejected" || e.sourceHandle === "error" || /^branch-\d+$/.test(e.sourceHandle) ? e.sourceHandle : void 0;
	return {
		id: e.id,
		source: e.source,
		sourceHandle: e.sourceHandle,
		target: e.target,
		targetHandle: e.targetHandle,
		type: "animated",
		data: {
			state: "default",
			label: t
		}
	};
}
function Ur({ onFilterLog: e, errorNodeId: t, onErrorNodePosition: n, replayEdgeStates: r, replayNodeClasses: i, breakpoints: a, onToggleBreakpoint: o, pausedAtNodeId: s }) {
	let { definition: c, addNode: l, setPositions: u, addEdge: d, removeEdge: f, removeNode: p, duplicateNodes: m, selectedNodeId: h, setSelectedNodeId: g, updateNodeData: _ } = de(), { screenToFlowPosition: v, fitView: y } = wt(), b = B(!1), x = L((e) => {
		e && (b.current = !0);
	}, []);
	R(() => {
		let e = A.current;
		if (!e || typeof ResizeObserver > "u") return;
		let t = {
			w: e.clientWidth,
			h: e.clientHeight
		}, n = new ResizeObserver(() => {
			let n = e.clientWidth, r = e.clientHeight;
			n !== 0 && r !== 0 && (Math.abs(n - t.w) < 2 && Math.abs(r - t.h) < 2 || (t = {
				w: n,
				h: r
			}, !b.current && y(Ir)));
		});
		return n.observe(e), () => n.disconnect();
	}, [y]), nr({
		addNode: l,
		addEdge: d,
		updateNodeData: _,
		getDefinition: () => c
	});
	let [S, C, w] = Ct([]), [T, E, D] = xt([]), [ee, O] = V(!0), [te, k] = V(!0), A = B(null), ne = B(null), [j, M] = V(null), [N, re] = V(null), ie = L((e, t) => {
		e.preventDefault(), re({
			nodeId: t.id,
			x: e.clientX,
			y: e.clientY
		});
	}, []), P = L(() => {
		N && (e?.(N.nodeId), re(null));
	}, [N, e]), F = L(() => {
		if (!N) return;
		let e = N.nodeId;
		typeof navigator < "u" && navigator.clipboard?.writeText && navigator.clipboard.writeText(e).catch(() => {}), re(null);
	}, [N]), ae = L(() => {
		N && (o?.(N.nodeId), re(null));
	}, [N, o]), oe = L(() => {
		if (!N) return;
		let e = m([N.nodeId]);
		e.length > 0 && g(e[0]), re(null);
	}, [
		N,
		m,
		g
	]), se = L(() => re(null), []);
	R(() => {
		if (!c) {
			C([]), E([]);
			return;
		}
		C((e) => {
			let t = new Map(e.map((e) => [e.id, e]));
			return c.nodes.map((e) => {
				let n = t.get(e.id), r = Vr(e);
				return a && a.size > 0 && (r.data._hasBreakpoint = a.has(e.id)), s && (r.data._pausedAtBreakpoint = e.id === s), n ? {
					...n,
					...r,
					selected: n.selected
				} : r;
			});
		}), E(() => c.edges.map(Hr));
	}, [
		c,
		a,
		s,
		C,
		E
	]), R(() => {
		if (!t) {
			n?.(null);
			return;
		}
		C((e) => {
			let n = !1, r = e.map((e) => {
				let r = e.id === t ? "node-error" : e.className?.replace("node-error", "").trim() || void 0;
				return e.className === r ? e : (n = !0, {
					...e,
					className: r
				});
			});
			return n ? r : e;
		}), requestAnimationFrame(() => {
			let e = A.current;
			if (!e) return;
			let r = e.querySelector(`.react-flow__node[data-id="${CSS.escape(t)}"]`);
			if (!r) {
				n?.(null);
				return;
			}
			let i = r.getBoundingClientRect();
			n?.({
				x: i.right,
				y: i.top + i.height / 2
			});
		});
	}, [
		t,
		C,
		n
	]), R(() => {
		i && C((e) => {
			let n = !1, r = e.map((e) => {
				let r = i[e.id] ?? "", a = [e.id === t ? "node-error" : "", r].filter(Boolean).join(" ") || void 0, o;
				r === "node-replay-active" ? o = "running" : r === "node-replay-completed" ? o = "completed" : r === "node-replay-failed" && (o = "failed");
				let s = e.data, c = o ?? "idle";
				return e.className === a && s._state === c ? e : (n = !0, {
					...e,
					className: a,
					data: {
						...s,
						_state: c
					}
				});
			});
			return n ? r : e;
		});
	}, [
		i,
		t,
		C
	]), R(() => {
		r && E((e) => e.map((e) => {
			let t = r[e.id];
			if (!t) return e;
			let n = e.data ?? {};
			return n.state === t ? e : {
				...e,
				data: {
					...n,
					state: t
				}
			};
		}));
	}, [r, E]);
	let ce = L((e) => {
		w(e);
		let t = [], n = [];
		for (let r of e) r.type === "position" && r.position && r.dragging === !1 ? t.push({
			id: r.id,
			position: r.position
		}) : r.type === "remove" && n.push(r.id);
		t.length && u(t);
		for (let e of n) p(e);
	}, [
		w,
		u,
		p
	]), I = L((e) => {
		D(e);
		for (let t of e) t.type === "remove" && f(t.id);
	}, [D, f]), le = L((e) => {
		if (!c || !e.source || !e.target) return;
		let t = c.nodes.find((t) => t.id === e.source), n = c.nodes.find((t) => t.id === e.target);
		if (!t || !n) return;
		let r = e.sourceHandle ?? "out", i = e.targetHandle ?? "in";
		Dt(t.type, r, n.type, i) && d({
			source: e.source,
			sourceHandle: r,
			target: e.target,
			targetHandle: i
		});
	}, [c, d]), ue = L((e) => {
		if (!c || !e.source || !e.target) return !1;
		let t = c.nodes.find((t) => t.id === e.source), n = c.nodes.find((t) => t.id === e.target);
		return !t || !n ? !1 : Dt(t.type, e.sourceHandle ?? "out", n.type, e.targetHandle ?? "in");
	}, [c]), fe = L((e, t) => {
		g(t.id);
	}, [g]), pe = L(() => {
		g(null);
	}, [g]), me = L((e) => {
		let t = e.target;
		if (!t || !(t.classList.contains("react-flow__pane") || t.classList.contains("react-flow__renderer") || t.classList.contains("react-flow__viewport") || t.classList.contains("react-flow"))) return;
		e.preventDefault();
		let n = v({
			x: e.clientX,
			y: e.clientY
		});
		M({
			anchor: {
				x: e.clientX,
				y: e.clientY
			},
			flowPosition: n
		});
	}, [v]), he = L(() => M(null), []), ge = L((e, t) => {
		l(e, t);
	}, [l]), _e = z(() => c && c.nodes.some((e) => e.type === "trigger") ? ["trigger"] : [], [c]), { handleDragOver: ve, handleDrop: ye } = ir({
		addNode: l,
		screenToFlowPosition: v
	});
	R(() => {
		let e = (e) => {
			if (!Lr(e.target) && !(e.metaKey || e.ctrlKey || e.altKey)) {
				if (e.key === "m" || e.key === "M") {
					O((e) => !e);
					return;
				}
				if (e.key === "c" || e.key === "C") {
					k((e) => !e);
					return;
				}
			}
		};
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, []), rr({
		definition: c,
		selectedNodeId: h,
		setSelectedNodeId: g,
		removeNode: p,
		removeDefEdge: f,
		nodes: S,
		edges: T,
		setNodes: C,
		setEdges: E,
		setPositions: u,
		duplicateNodes: m,
		clipboardRef: ne,
		containerRef: A
	});
	let be = L((e) => {
		switch (e.data?._state) {
			case "running":
			case "pending": return "var(--color-info)";
			case "completed": return "var(--color-success)";
			case "failed": return "var(--color-danger)";
			case "awaiting": return "var(--color-warning)";
			default: return "var(--color-text-tertiary)";
		}
	}, []);
	return /* @__PURE__ */ W("div", {
		ref: A,
		className: "flex-1 min-w-0 min-h-[520px] relative bg-surface-inset",
		role: "application",
		"aria-label": "Pipeline editor canvas",
		tabIndex: 0,
		"data-testid": "pipeline-canvas",
		onDragOver: ve,
		onDrop: ye,
		onDoubleClick: me,
		children: [
			/* @__PURE__ */ W(yt, {
				nodes: S,
				edges: T,
				nodeTypes: Br,
				edgeTypes: zr,
				onNodesChange: ce,
				onEdgesChange: I,
				onConnect: le,
				isValidConnection: ue,
				onNodeClick: fe,
				onNodeContextMenu: ie,
				onPaneClick: pe,
				onMoveStart: x,
				fitView: !0,
				fitViewOptions: Ir,
				minZoom: Fr,
				snapToGrid: !0,
				snapGrid: [16, 16],
				edgesFocusable: !0,
				defaultEdgeOptions: { type: "smoothstep" },
				proOptions: { hideAttribution: !0 },
				children: [
					/* @__PURE__ */ U(ht, {
						variant: gt.Dots,
						gap: 16,
						size: 1,
						color: "var(--color-border)",
						bgColor: "var(--color-surface-inset)"
					}),
					te ? /* @__PURE__ */ U(_t, {
						position: "bottom-left",
						showZoom: !0,
						showFitView: !0,
						showInteractive: !0,
						className: "!bg-surface !border !border-border !rounded-md !shadow-[0_1px_3px_rgba(0,0,0,0.06)]"
					}) : null,
					ee ? /* @__PURE__ */ U(vt, {
						position: "bottom-right",
						pannable: !0,
						zoomable: !0,
						className: "!bg-surface !border !border-border !rounded-md !w-[180px] !h-[120px]",
						maskColor: "rgba(15, 23, 42, 0.04)",
						nodeColor: be,
						nodeStrokeColor: "var(--color-border)"
					}) : null
				]
			}),
			j ? /* @__PURE__ */ U(tr, {
				anchor: j.anchor,
				flowPosition: j.flowPosition,
				disabledTypes: _e,
				onClose: he,
				onInsert: ge
			}) : null,
			/* @__PURE__ */ U(Dr, {
				definition: c,
				addNode: l,
				screenToFlowPosition: v,
				containerRef: A
			}),
			/* @__PURE__ */ U(Pr, {
				definition: c,
				setPositions: u,
				fitView: y
			}),
			N ? /* @__PURE__ */ U(ar, {
				nodeMenu: N,
				breakpoints: a,
				showBreakpointOption: !!o,
				onFilterLog: P,
				onCopyNodeId: F,
				onDuplicate: oe,
				onToggleBreakpoint: ae,
				onDismiss: se
			}) : null
		]
	});
}
function Wr({ onFilterLog: e, errorNodeId: t, onErrorNodePosition: n, replayEdgeStates: r, replayNodeClasses: i, breakpoints: a, onToggleBreakpoint: o, pausedAtNodeId: s } = {}) {
	return /* @__PURE__ */ U(bt, { children: /* @__PURE__ */ U(Ur, {
		onFilterLog: e,
		errorNodeId: t,
		onErrorNodePosition: n,
		replayEdgeStates: r,
		replayNodeClasses: i,
		breakpoints: a,
		onToggleBreakpoint: o,
		pausedAtNodeId: s
	}) });
}
//#endregion
//#region src/components/pipelines/canvas/ErrorOverlay.tsx
var Gr = {
	LLMError: {
		bg: "var(--color-danger-bg)",
		fg: "var(--color-danger)"
	},
	TimeoutError: {
		bg: "var(--color-caution-bg)",
		fg: "var(--color-caution)"
	},
	NetworkError: {
		bg: "var(--color-warning-bg)",
		fg: "var(--color-warning)"
	},
	ValidationError: {
		bg: "var(--color-warning-bg)",
		fg: "var(--color-warning)"
	},
	RegistryConflict: {
		bg: "var(--color-accent-bg)",
		fg: "var(--color-accent)"
	},
	UnknownError: {
		bg: "var(--color-surface-hover)",
		fg: "var(--color-text-secondary)"
	}
};
function Kr(e) {
	switch (e) {
		case "LLMError": return "LLM Error";
		case "TimeoutError": return "Timeout";
		case "NetworkError": return "Network Error";
		case "ValidationError": return "Validation Error";
		case "RegistryConflict": return "Registry Conflict";
		case "UnknownError": return "Unknown Error";
		default: return String(e);
	}
}
function qr({ error: e, anchor: t, onDismiss: n, onRetry: r }) {
	let i = B(null), [a, o] = V(!1), [s, c] = V(!1), l = B(null);
	R(() => () => {
		l.current && clearTimeout(l.current);
	}, []);
	let u = e.errorCategory ?? "UnknownError", d = Gr[u] ?? Gr.UnknownError, f = L(async () => {
		let t = [
			`Error Category: ${u}`,
			`Node ID: ${e.nodeId}`,
			`Message: ${e.message}`,
			e.stack ? `\nStack Trace:\n${e.stack}` : ""
		].filter(Boolean).join("\n");
		try {
			typeof navigator < "u" && navigator.clipboard?.writeText && (await navigator.clipboard.writeText(t), c(!0), l.current && clearTimeout(l.current), l.current = setTimeout(() => c(!1), 2e3));
		} catch {}
	}, [e, u]), p = L(() => {
		r?.();
	}, [r]);
	E(!0, n), R(() => {
		D(i.current);
	}, []);
	let m = Math.min(t.y + 8, window.innerHeight - 440), h = Math.min(t.x + 12, window.innerWidth - 360);
	return /* @__PURE__ */ W("div", {
		ref: i,
		className: "fixed z-[100] bg-surface border border-border rounded-[10px] shadow-[0_12px_32px_rgba(15,23,42,0.18),0_2px_6px_rgba(15,23,42,0.08)] p-0 w-[340px] max-h-[420px] overflow-y-auto font-inherit text-text-primary",
		style: {
			top: Math.max(8, m),
			left: Math.max(8, h)
		},
		"data-testid": "error-overlay",
		role: "dialog",
		"aria-label": `Error details for node ${e.nodeId}`,
		children: [
			/* @__PURE__ */ W("div", {
				className: "flex items-center gap-2 px-3.5 pt-3 pb-2.5 border-b border-border",
				children: [
					/* @__PURE__ */ U("span", {
						className: "inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold leading-snug",
						style: {
							background: d.bg,
							color: d.fg
						},
						"data-testid": "error-category-badge",
						children: Kr(u)
					}),
					/* @__PURE__ */ U("span", { className: "flex-1" }),
					/* @__PURE__ */ U("button", {
						type: "button",
						onClick: n,
						"aria-label": "Dismiss error overlay",
						className: "bg-transparent border-none text-text-tertiary cursor-pointer text-base leading-none px-1 py-0.5",
						children: "×"
					})
				]
			}),
			/* @__PURE__ */ W("div", {
				className: "px-3.5 py-3 flex flex-col gap-2.5",
				children: [
					/* @__PURE__ */ U("div", {
						className: "text-[13px] leading-normal text-text-primary",
						children: e.message
					}),
					/* @__PURE__ */ W("div", {
						className: "text-[11px] text-text-tertiary",
						children: [
							"Failed node:",
							" ",
							/* @__PURE__ */ U("code", {
								className: "bg-surface-hover px-[5px] py-px rounded-[3px] font-mono text-[11px] text-text-secondary",
								children: e.nodeId
							})
						]
					}),
					e.stack && /* @__PURE__ */ W("div", { children: [/* @__PURE__ */ W("button", {
						type: "button",
						onClick: () => o((e) => !e),
						className: "bg-transparent border-none p-0 cursor-pointer text-xs font-medium text-text-secondary font-inherit",
						"data-testid": "error-stack-toggle",
						children: [a ? "▾" : "▸", " Stack trace"]
					}), a && /* @__PURE__ */ U("pre", {
						className: "mt-1.5 p-2.5 bg-surface-panel border border-border rounded-md text-[10px] leading-normal font-mono text-text-secondary whitespace-pre-wrap break-all max-h-40 overflow-y-auto m-0",
						"data-testid": "error-stack-content",
						children: e.stack
					})] })
				]
			}),
			/* @__PURE__ */ W("div", {
				className: "flex gap-2 px-3.5 pt-2.5 pb-3 border-t border-border",
				children: [/* @__PURE__ */ U("button", {
					type: "button",
					onClick: f,
					className: "px-3 py-1.5 text-xs font-semibold border-none rounded-md cursor-pointer font-inherit leading-snug bg-surface-hover text-text-secondary",
					"data-testid": "error-copy-btn",
					children: s ? "Copied!" : "Copy error details"
				}), r && /* @__PURE__ */ U("button", {
					type: "button",
					onClick: p,
					className: "px-3 py-1.5 text-xs font-semibold border-none rounded-md cursor-pointer font-inherit leading-snug bg-primary text-white",
					"data-testid": "error-retry-btn",
					children: "Retry from here"
				})]
			})
		]
	});
}
//#endregion
//#region src/components/pipelines/validation/detectCycles.ts
function Jr(e, t) {
	let n = /* @__PURE__ */ new Map();
	for (let t of e) n.set(t.id, []);
	for (let e of t) {
		let t = n.get(e.source);
		t && t.push({
			target: e.target,
			edgeId: e.id
		});
	}
	let r = /* @__PURE__ */ new Map();
	for (let t of e) r.set(t.id, 0);
	for (let t of e) {
		if (r.get(t.id) !== 0) continue;
		let e = [{
			nodeId: t.id,
			index: 0
		}];
		for (r.set(t.id, 1); e.length > 0;) {
			let t = e[e.length - 1], i = n.get(t.nodeId) ?? [];
			if (t.index >= i.length) {
				r.set(t.nodeId, 2), e.pop();
				continue;
			}
			let a = i[t.index];
			t.index += 1;
			let o = r.get(a.target);
			if (o === 1) return a.edgeId;
			o === 0 && (r.set(a.target, 1), e.push({
				nodeId: a.target,
				index: 0
			}));
		}
	}
	return null;
}
//#endregion
//#region src/components/pipelines/validation/validatePipeline.ts
function Yr(e) {
	let t = [], n = [], { nodes: r, edges: i } = e, a = /* @__PURE__ */ new Map();
	for (let e of r) a.set(e.id, e);
	return Xr(r, t), Zr(r, i, t), Qr(i, a, t), $r(r, t), si(r, i, t), li(r, i, n), ui(r, i, n), di(r, i, n), fi(r, i, n), n.push(...mi(e)), n.push(...hi(e)), n.push(...gi(e)), n.push(..._i(e)), n.push(...vi(e)), n.push(...yi(e)), n.push(...bi(e)), n.push(...xi(e)), n.push(...Si(e)), n.push(...Ci(e)), {
		errors: t,
		warnings: n,
		isValid: t.length === 0,
		canPublish: t.length === 0
	};
}
function Xr(e, t) {
	let n = e.filter((e) => e.type === "trigger");
	if (n.length === 0) {
		t.push({
			code: "NO_TRIGGER",
			severity: "error",
			message: "Pipeline must have exactly one Trigger node."
		});
		return;
	}
	if (n.length > 1) for (let e of n) t.push({
		code: "MULTIPLE_TRIGGERS",
		severity: "error",
		message: "Pipeline must have exactly one Trigger node.",
		nodeId: e.id
	});
}
function Zr(e, t, n) {
	let r = Jr(e, t);
	r !== null && n.push({
		code: "CYCLE_DETECTED",
		severity: "error",
		message: "Pipeline contains a cycle.",
		edgeId: r
	});
}
function Qr(e, t, n) {
	for (let r of e) {
		let e = t.get(r.source), i = t.get(r.target);
		if (!e || !i) {
			n.push({
				code: "INVALID_HANDLE",
				severity: "error",
				message: "Edge references a node that does not exist.",
				edgeId: r.id
			});
			continue;
		}
		Dt(e.type, r.sourceHandle, i.type, r.targetHandle) || n.push({
			code: "INVALID_HANDLE",
			severity: "error",
			message: `Invalid connection: ${e.type}.${r.sourceHandle} → ${i.type}.${r.targetHandle}.`,
			edgeId: r.id
		});
	}
}
function $r(e, t) {
	for (let n of e) switch (n.data.type) {
		case "llm":
			ei(n.id, n.data, t);
			break;
		case "transform":
			ti(n.id, n.data, t);
			break;
		case "condition":
			ni(n.id, n.data, t);
			break;
		case "action":
			ri(n.id, n.data, t);
			break;
		case "fork":
			ii(n.id, n.data, t);
			break;
		case "join":
			ai(n.id, n.data, t);
			break;
		case "approval": oi(n.id, n.data, t);
	}
}
function ei(e, t, n) {
	t.provider || ci(n, e, "provider"), (!t.model || !t.model.trim()) && ci(n, e, "model"), (!t.systemPrompt || !t.systemPrompt.trim()) && ci(n, e, "systemPrompt"), (!t.userPromptTemplate || !t.userPromptTemplate.trim()) && ci(n, e, "userPromptTemplate");
}
function ti(e, t, n) {
	t.transformType || ci(n, e, "transformType"), (!t.expression || !t.expression.trim()) && ci(n, e, "expression");
}
function ni(e, t, n) {
	(!t.expression || !t.expression.trim()) && ci(n, e, "expression");
}
function ri(e, t, n) {
	t.actionType || ci(n, e, "actionType");
}
function ii(e, t, n) {
	(typeof t.branchCount != "number" || t.branchCount < 2) && n.push({
		code: "MISSING_CONFIG",
		severity: "error",
		message: "Fork requires branchCount ≥ 2.",
		nodeId: e,
		field: "branchCount"
	});
}
function ai(e, t, n) {
	t.mode || ci(n, e, "mode"), t.mergeStrategy || ci(n, e, "mergeStrategy"), t.mode === "n_of_m" && (typeof t.n != "number" || t.n < 1) && n.push({
		code: "MISSING_CONFIG",
		severity: "error",
		message: "Join mode 'n_of_m' requires a numeric n ≥ 1.",
		nodeId: e,
		field: "n"
	});
}
function oi(e, t, n) {
	(!t.approvers || t.approvers.length === 0) && n.push({
		code: "APPROVAL_NO_APPROVERS",
		severity: "error",
		message: "Approval node must have at least one approver.",
		nodeId: e,
		field: "approvers"
	}), (typeof t.requiredCount != "number" || t.requiredCount < 1) && n.push({
		code: "MISSING_CONFIG",
		severity: "error",
		message: "Approval requires requiredCount ≥ 1.",
		nodeId: e,
		field: "requiredCount"
	});
}
function si(e, t, n) {
	let r = /* @__PURE__ */ new Map();
	for (let e of t) r.set(e.target, (r.get(e.target) ?? 0) + 1);
	for (let t of e) t.type === "join" && (r.get(t.id) ?? 0) < 2 && n.push({
		code: "JOIN_INSUFFICIENT_INPUTS",
		severity: "error",
		message: "Join node requires at least 2 incoming edges.",
		nodeId: t.id
	});
}
function ci(e, t, n) {
	e.push({
		code: "MISSING_CONFIG",
		severity: "error",
		message: `Missing required field '${n}'.`,
		nodeId: t,
		field: n
	});
}
function li(e, t, n) {
	let r = e.filter((e) => e.type === "trigger");
	if (r.length !== 1) return;
	let i = /* @__PURE__ */ new Map();
	for (let t of e) i.set(t.id, []);
	for (let e of t) i.get(e.source)?.push(e.target);
	let a = /* @__PURE__ */ new Set(), o = [r[0].id];
	for (a.add(r[0].id); o.length > 0;) {
		let e = o.shift();
		for (let t of i.get(e) ?? []) a.has(t) || (a.add(t), o.push(t));
	}
	for (let t of e) a.has(t.id) || n.push({
		code: "ORPHAN_NODE",
		severity: "warning",
		message: "Node is unreachable from the Trigger.",
		nodeId: t.id
	});
}
function ui(e, t, n) {
	let r = /* @__PURE__ */ new Set();
	for (let e of t) r.add(e.source);
	for (let t of e) r.has(t.id) || t.data.terminal !== !0 && n.push({
		code: "DEAD_END",
		severity: "warning",
		message: "Node has no outgoing edges.",
		nodeId: t.id
	});
}
function di(e, t, n) {
	let r = /* @__PURE__ */ new Map();
	for (let e of t) {
		let t = r.get(e.source) ?? /* @__PURE__ */ new Set();
		t.add(e.sourceHandle), r.set(e.source, t);
	}
	for (let t of e) {
		if (t.data.type !== "fork") continue;
		let e = t.data.branchCount, i = r.get(t.id) ?? /* @__PURE__ */ new Set();
		for (let r = 0; r < e; r += 1) {
			let e = `branch-${r}`;
			i.has(e) || n.push({
				code: "UNUSED_FORK_BRANCH",
				severity: "warning",
				message: `Fork branch '${e}' has no connected edge.`,
				nodeId: t.id,
				field: e
			});
		}
	}
}
function fi(e, t, n) {
	let r = /* @__PURE__ */ new Map();
	for (let e of t) {
		let t = r.get(e.source) ?? /* @__PURE__ */ new Set();
		t.add(e.sourceHandle), r.set(e.source, t);
	}
	for (let t of e) {
		if (t.type !== "condition") continue;
		let e = r.get(t.id) ?? /* @__PURE__ */ new Set();
		for (let r of ["true", "false"]) e.has(r) || n.push({
			code: "UNUSED_CONDITION_BRANCH",
			severity: "warning",
			message: `Condition branch '${r}' has no connected edge.`,
			nodeId: t.id,
			field: r
		});
	}
}
function pi(e) {
	let t = e.data.label;
	if (typeof t == "string" && t.trim()) return t.trim();
	switch (e.data.type) {
		case "llm": return e.data.model || "llm";
		case "trigger": return e.data.triggerType || "trigger";
		case "action": return e.data.actionType || "action";
		case "transform": return e.data.transformType || "transform";
		case "join": return e.data.mode ? `join:${e.data.mode}` : "join";
		default: return e.type;
	}
}
function mi(e) {
	let t = [], n = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
	for (let t of e.nodes) n.set(t.id, []), r.set(t.id, []);
	for (let t of e.edges) t.sourceHandle !== "error" && n.get(t.source)?.push(t.target), r.get(t.target)?.push(t.source);
	let i = /* @__PURE__ */ new Map();
	for (let t of e.nodes) i.set(t.id, t);
	function a(e) {
		let t = /* @__PURE__ */ new Set([e]), r = [];
		for (let i of n.get(e) ?? []) t.has(i) || (t.add(i), r.push(i));
		for (; r.length > 0;) {
			let e = r.shift();
			if (i.get(e)?.type === "join") return !0;
			for (let i of n.get(e) ?? []) t.has(i) || (t.add(i), r.push(i));
		}
		return !1;
	}
	function o(e) {
		let t = /* @__PURE__ */ new Set([e]), n = [];
		for (let i of r.get(e) ?? []) t.has(i) || (t.add(i), n.push(i));
		for (; n.length > 0;) {
			let e = n.shift();
			if (i.get(e)?.type === "fork") return !0;
			for (let i of r.get(e) ?? []) t.has(i) || (t.add(i), n.push(i));
		}
		return !1;
	}
	for (let n of e.nodes) (n.data.type === "llm" || n.data.type === "action") && (e.edges.some((e) => e.source === n.id && e.sourceHandle === "error") || o(n.id) && a(n.id) || t.push({
		code: "NO_ERROR_HANDLER",
		severity: "warning",
		message: `${n.data.type} node '${pi(n)}' has no error handler — failures will terminate the run.`,
		nodeId: n.id
	}));
	return t;
}
function hi(e) {
	let t = [];
	for (let n of e.nodes) n.data.type === "llm" && (typeof n.data.maxTokens != "number" || n.data.maxTokens <= 0) && t.push({
		code: "LLM_NO_MAX_TOKENS",
		severity: "warning",
		message: `LLM node '${pi(n)}' has no maxTokens — responses could run long / expensive.`,
		nodeId: n.id,
		field: "maxTokens"
	});
	return t;
}
function gi(e) {
	let t = [];
	for (let n of e.nodes) n.data.type === "approval" && (typeof n.data.timeoutMs != "number" || n.data.timeoutMs <= 0) && t.push({
		code: "UNGUARDED_APPROVAL_TIMEOUT",
		severity: "warning",
		message: `Approval '${pi(n)}' has no timeout — the run could block indefinitely.`,
		nodeId: n.id,
		field: "timeoutMs"
	});
	return t;
}
function _i(e) {
	let t = [];
	for (let n of e.nodes) n.data.type === "fork" && typeof n.data.branchCount == "number" && n.data.branchCount > 5 && t.push({
		code: "LARGE_FORK",
		severity: "warning",
		message: `Fork with ${n.data.branchCount} branches; consider splitting into multiple joins for readability.`,
		nodeId: n.id,
		field: "branchCount"
	});
	return t;
}
function vi(e) {
	let t = e.nodes.filter((e) => e.type === "trigger");
	if (t.length !== 1) return [];
	let n = /* @__PURE__ */ new Map();
	for (let t of e.nodes) n.set(t.id, []);
	for (let t of e.edges) n.get(t.source)?.push(t.target);
	let r = /* @__PURE__ */ new Map(), i = [t[0].id];
	r.set(t[0].id, 1);
	let a = e.nodes.length * e.nodes.length + 1, o = 0;
	for (; i.length > 0;) {
		if (o++ > a) return [];
		let e = i.shift(), t = r.get(e);
		for (let a of n.get(e) ?? []) {
			let e = r.get(a);
			(e === void 0 || t + 1 > e) && (r.set(a, t + 1), i.push(a));
		}
	}
	let s = 0;
	for (let e of r.values()) e > s && (s = e);
	return s > 12 ? [{
		code: "DEEP_CHAIN",
		severity: "warning",
		message: `Pipeline is very deep (${s} levels); consider modularizing.`
	}] : [];
}
function yi(e) {
	let t = [], n = /* @__PURE__ */ new Map();
	for (let t of e.nodes) {
		let e = pi(t), r = n.get(e) ?? [];
		r.push(t), n.set(e, r);
	}
	for (let [e, r] of n) if (!(r.length < 2)) for (let n of r) t.push({
		code: "DUPLICATE_NODE_NAME",
		severity: "warning",
		message: `Multiple nodes named '${e}'; consider disambiguating.`,
		nodeId: n.id
	});
	return t;
}
function bi(e) {
	let t = [], n = /\{\{[^}]+\}\}/;
	for (let r of e.nodes) {
		if (r.data.type !== "llm") continue;
		let { temperature: e, userPromptTemplate: i } = r.data;
		typeof e != "number" || e <= .8 || !i || !n.test(i) || t.push({
			code: "LOW_TEMPERATURE_NON_DETERMINISTIC_PROMPT",
			severity: "warning",
			message: `LLM '${pi(r)}' uses high temperature with templated inputs — outputs will be non-deterministic, pair with a retry or validation downstream.`,
			nodeId: r.id
		});
	}
	return t;
}
function xi(e) {
	return e.triggerBinding?.event !== "schedule" || e.status !== "draft" ? [] : [{
		code: "NO_PUBLISHED_VERSION_BUT_TRIGGER_SCHEDULED",
		severity: "warning",
		message: "Scheduled trigger on a draft pipeline — schedules won't fire until published."
	}];
}
function Si(e) {
	let t = [], n = /* @__PURE__ */ new Map();
	for (let t of e.edges) {
		let e = n.get(t.source) ?? /* @__PURE__ */ new Set();
		e.add(t.sourceHandle), n.set(t.source, e);
	}
	for (let r of e.nodes) {
		if (r.type !== "condition") continue;
		let e = n.get(r.id) ?? /* @__PURE__ */ new Set(), i = e.has("true"), a = e.has("false");
		i && !a && t.push({
			code: "UNREACHABLE_AFTER_CONDITION_FALSE",
			severity: "warning",
			message: `Condition '${pi(r)}' has no edge from its 'false' handle — any node intended for the false branch is unreachable.`,
			nodeId: r.id,
			field: "false"
		});
	}
	return t;
}
function Ci(e) {
	let t = [], n = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
	for (let t of e.nodes) n.set(t.id, []), r.set(t.id, []);
	for (let t of e.edges) n.get(t.source)?.push({
		target: t.target,
		sourceHandle: t.sourceHandle
	}), r.get(t.target)?.push(t.source);
	let i = /* @__PURE__ */ new Map();
	for (let t of e.nodes) i.set(t.id, t);
	function a(e) {
		let t = /* @__PURE__ */ new Set([e]), r = [e];
		for (; r.length > 0;) {
			let a = r.shift(), o = i.get(a);
			if (o && o.type === "join" && a !== e) return a;
			for (let { target: e } of n.get(a) ?? []) t.has(e) || (t.add(e), r.push(e));
		}
		return null;
	}
	function o(e) {
		let t = /* @__PURE__ */ new Set([e]), n = [e];
		for (; n.length > 0;) {
			let a = n.shift(), o = i.get(a);
			if (o && o.type === "fork" && a !== e) return a;
			for (let e of r.get(a) ?? []) t.has(e) || (t.add(e), n.push(e));
		}
		return null;
	}
	for (let r of e.nodes) {
		if (r.data.type !== "fork") continue;
		let e = n.get(r.id) ?? [];
		if (e.length === 0) continue;
		let i = /* @__PURE__ */ new Set();
		for (let { target: t } of e) i.add(a(t));
		let o = i.has(null), s = [...i].filter((e) => e !== null);
		(o || s.length !== 1) && t.push({
			code: "FORK_WITHOUT_MATCHING_JOIN",
			severity: "warning",
			message: `Fork '${pi(r)}' branches do not converge in a single Join — parallel branches may diverge or terminate without merging.`,
			nodeId: r.id
		});
	}
	for (let n of e.nodes) {
		if (n.data.type !== "join") continue;
		let e = r.get(n.id) ?? [];
		if (e.length === 0) continue;
		let i = /* @__PURE__ */ new Set();
		for (let t of e) i.add(o(t));
		let a = i.has(null), s = [...i].filter((e) => e !== null);
		(a || s.length !== 1) && t.push({
			code: "FORK_WITHOUT_MATCHING_JOIN",
			severity: "warning",
			message: `Join '${pi(n)}' has no matching upstream Fork — its incoming branches don't share a common Fork ancestor.`,
			nodeId: n.id
		});
	}
	return t;
}
//#endregion
//#region src/components/pipelines/export/toMermaid.ts
function wi(e, t) {
	return `${e}${t}`;
}
var Ti = {
	trigger: "t",
	llm: "llm",
	transform: "x",
	condition: "c",
	action: "a",
	fork: "f",
	join: "j",
	approval: "ap"
}, Ei = {
	trigger: "▶",
	llm: "🧠",
	transform: "⚙",
	condition: "❓",
	action: "⚡",
	fork: "🔀",
	join: "🔗",
	approval: "✋"
};
function Di(e) {
	return e.replace(/"/g, "&quot;").replace(/#/g, "&#35;").replace(/\n/g, "<br/>");
}
var Oi = {
	trigger: "Trigger",
	llm: "LLM",
	transform: "Transform",
	condition: "Condition",
	action: "Action",
	fork: "Fork",
	join: "Join",
	approval: "Approval"
};
function ki(e) {
	let t = Ei[e.type] ?? "■", n = Oi[e.type] ?? e.type.charAt(0).toUpperCase() + e.type.slice(1), r = null;
	switch (e.data.type) {
		case "llm":
			r = e.data.model || null;
			break;
		case "condition": {
			let t = e.data;
			r = t.label || t.expression || null;
			break;
		}
		case "approval": {
			let t = e.data.approvers?.length ?? 0;
			r = `${t} approver${t === 1 ? "" : "s"}`;
			break;
		}
		case "fork": {
			let t = e.data;
			r = `${t.branchCount} branch${t.branchCount === 1 ? "" : "es"}`;
			break;
		}
		case "action":
			r = e.data.actionType;
			break;
		case "transform":
			r = e.data.transformType;
			break;
		case "trigger":
			r = e.data.triggerType;
			break;
		case "join": r = e.data.mode;
	}
	let i = `${t} ${n}`;
	return Di(r ? `${i}<br/>${r}` : i);
}
function Ai(e, t) {
	let n = `"${t}"`;
	switch (e) {
		case "condition": return `{${n}}`;
		case "fork": return `{{${n}}}`;
		case "approval": return `[/${n}\\]`;
		case "llm": return `(${n})`;
		default: return `[${n}]`;
	}
}
function ji(e) {
	return !e || e === "out" ? null : e;
}
function Mi(e) {
	let t = ["flowchart TD"], n = {}, r = /* @__PURE__ */ new Map();
	for (let t of e.nodes) {
		let e = Ti[t.type] ?? "n", i = n[e] = (n[e] ?? 0) + 1;
		r.set(t.id, wi(e, i));
	}
	for (let n of e.nodes) {
		let e = r.get(n.id);
		if (!e) continue;
		let i = Ai(n.type, ki(n));
		t.push(`  ${e}${i}`);
	}
	for (let n of e.edges) {
		let e = r.get(n.source), i = r.get(n.target);
		if (!e || !i) continue;
		let a = ji(n.sourceHandle);
		a ? t.push(`  ${e} --"${Di(a)}"--> ${i}`) : t.push(`  ${e} --> ${i}`);
	}
	return t.join("\n");
}
//#endregion
//#region src/components/pipelines/versions/diffDefinitions.ts
function Ni(e) {
	return JSON.stringify(e, (e, t) => {
		if (t && typeof t == "object" && !Array.isArray(t)) {
			let e = Object.keys(t).sort(), n = {};
			for (let r of e) n[r] = t[r];
			return n;
		}
		return t;
	});
}
function Pi(e) {
	let t = /* @__PURE__ */ new Map();
	for (let n of e) t.set(n.id, n);
	return t;
}
function Fi(e) {
	return new Set(e.edges.map((e) => e.id));
}
function Ii(e, t) {
	if (!t) return {
		addedNodes: e.nodes.map((e) => ({
			node: e,
			dataChanged: !0,
			positionChanged: !1
		})),
		removedNodes: [],
		modifiedNodes: [],
		addedEdges: e.edges.length,
		removedEdges: 0,
		nameChanged: !1,
		iconChanged: !1,
		tagsChanged: !1,
		tagsAdded: [],
		tagsRemoved: []
	};
	let n = Pi(e.nodes), r = Pi(t.nodes), i = [], a = [], o = [];
	for (let [e, t] of n) {
		let n = r.get(e);
		if (!n) {
			i.push({
				node: t,
				dataChanged: !0,
				positionChanged: !1
			});
			continue;
		}
		let a = Ni(t.data) !== Ni(n.data), s = t.position.x !== n.position.x || t.position.y !== n.position.y;
		(a || s) && o.push({
			node: t,
			dataChanged: a,
			positionChanged: s
		});
	}
	for (let [e, t] of r) n.has(e) || a.push({
		node: t,
		dataChanged: !0,
		positionChanged: !1
	});
	let s = Fi(e), c = Fi(t), l = 0, u = 0;
	for (let e of s) c.has(e) || l++;
	for (let e of c) s.has(e) || u++;
	let d = e.name !== t.name, f = (e.icon ?? "") !== (t.icon ?? ""), p = new Set(e.tags ?? []), m = new Set(t.tags ?? []), h = [], g = [];
	for (let e of p) m.has(e) || h.push(e);
	for (let e of m) p.has(e) || g.push(e);
	let _ = h.length > 0 || g.length > 0;
	return {
		addedNodes: i,
		removedNodes: a,
		modifiedNodes: o,
		addedEdges: l,
		removedEdges: u,
		nameChanged: d,
		previousName: d ? t.name : void 0,
		iconChanged: f,
		previousIcon: f ? t.icon : void 0,
		tagsChanged: _,
		tagsAdded: h,
		tagsRemoved: g
	};
}
//#endregion
//#region src/components/pipelines/versions/VersionDiffModal.tsx
var Li = {
	trigger: "▶",
	llm: "🧠",
	transform: "⚙",
	condition: "❓",
	action: "⚡",
	fork: "🔀",
	join: "🔗",
	approval: "✋"
};
function Ri(e) {
	return e.data.type === "condition" && e.data.label ? e.data.label : e.data.type === "llm" ? e.data.model : e.data.type === "action" ? e.data.actionType : e.data.type === "trigger" ? e.data.triggerType : e.type.charAt(0).toUpperCase() + e.type.slice(1);
}
function zi(e, t, r) {
	let i = e.node, a = Li[i.type] ?? "■", o = t !== "removed" && !!r;
	return /* @__PURE__ */ W("button", {
		type: "button",
		disabled: !o,
		onClick: o ? () => r(e.node.id) : void 0,
		className: n("flex items-center gap-1.5 px-2 py-1.5 rounded-md text-xs font-[inherit] bg-surface-panel border border-border text-left w-full text-text-primary", o ? "cursor-pointer" : "cursor-default", t === "removed" && "opacity-85"),
		"data-testid": `diff-row-${t}`,
		children: [
			/* @__PURE__ */ U("span", {
				className: "text-sm",
				children: a
			}),
			/* @__PURE__ */ U("span", {
				className: "font-semibold",
				children: i.type
			}),
			/* @__PURE__ */ U("span", {
				className: "text-text-secondary flex-1 overflow-hidden text-ellipsis whitespace-nowrap",
				children: Ri(i)
			}),
			t === "modified" && e.positionChanged ? /* @__PURE__ */ U("span", {
				className: "inline-flex items-center px-1.5 py-px rounded text-[10px] font-semibold bg-warning-bg text-warning-fg",
				children: "moved"
			}) : null
		]
	}, `${t}-${e.node.id}`);
}
function Bi({ open: e, onClose: t, currentDef: n, publishedDef: r, onJumpToNode: i }) {
	let a = z(() => Ii(n, r), [n, r]), o = (e) => {
		i && i(e), t();
	}, s = r !== null, c = n.version, l = n.publishedVersion;
	return /* @__PURE__ */ W(C, {
		open: e,
		onClose: t,
		title: "Changes since publish",
		maxWidth: 820,
		footer: /* @__PURE__ */ U("button", {
			onClick: t,
			className: "px-4 py-[7px] text-[13px] font-semibold bg-primary text-white border-none rounded-[7px] cursor-pointer font-[inherit]",
			children: "Close"
		}),
		children: [/* @__PURE__ */ W("div", {
			className: "text-[13px] text-text-primary mb-3 flex items-center gap-2 flex-wrap",
			children: [
				/* @__PURE__ */ W("strong", { children: ["v", c] }),
				/* @__PURE__ */ U("span", {
					className: "text-text-tertiary",
					children: "vs"
				}),
				typeof l == "number" ? /* @__PURE__ */ W("strong", { children: ["published v", l] }) : /* @__PURE__ */ U("strong", {
					className: "text-text-secondary",
					children: "never published"
				})
			]
		}), n.publishedVersion === void 0 ? /* @__PURE__ */ U("p", {
			className: "m-0 text-[13px] text-text-secondary",
			children: "This pipeline has never been published."
		}) : s ? /* @__PURE__ */ W(H, { children: [/* @__PURE__ */ W("div", {
			className: "flex gap-3 flex-wrap",
			children: [
				/* @__PURE__ */ W("div", {
					className: "flex-1 min-w-0 flex flex-col gap-1.5",
					children: [/* @__PURE__ */ W("div", {
						className: "text-[11px] font-bold tracking-[0.5px] uppercase text-text-secondary mb-0.5",
						children: [
							"Added (",
							a.addedNodes.length,
							")"
						]
					}), a.addedNodes.length === 0 ? /* @__PURE__ */ U("div", {
						className: "text-xs text-text-tertiary",
						children: "None"
					}) : a.addedNodes.map((e) => zi(e, "added", o))]
				}),
				/* @__PURE__ */ W("div", {
					className: "flex-1 min-w-0 flex flex-col gap-1.5",
					children: [/* @__PURE__ */ W("div", {
						className: "text-[11px] font-bold tracking-[0.5px] uppercase text-text-secondary mb-0.5",
						children: [
							"Removed (",
							a.removedNodes.length,
							")"
						]
					}), a.removedNodes.length === 0 ? /* @__PURE__ */ U("div", {
						className: "text-xs text-text-tertiary",
						children: "None"
					}) : a.removedNodes.map((e) => zi(e, "removed", void 0))]
				}),
				/* @__PURE__ */ W("div", {
					className: "flex-1 min-w-0 flex flex-col gap-1.5",
					children: [/* @__PURE__ */ W("div", {
						className: "text-[11px] font-bold tracking-[0.5px] uppercase text-text-secondary mb-0.5",
						children: [
							"Modified (",
							a.modifiedNodes.length,
							")"
						]
					}), a.modifiedNodes.length === 0 ? /* @__PURE__ */ U("div", {
						className: "text-xs text-text-tertiary",
						children: "None"
					}) : a.modifiedNodes.map((e) => zi(e, "modified", o))]
				})
			]
		}), /* @__PURE__ */ W("div", {
			className: "mt-4 pt-3 border-t border-border",
			children: [
				/* @__PURE__ */ W("div", {
					className: "text-xs text-text-secondary mt-1",
					children: [
						/* @__PURE__ */ U("strong", { children: a.addedEdges }),
						" edge",
						a.addedEdges === 1 ? "" : "s",
						" added ·",
						" ",
						/* @__PURE__ */ U("strong", { children: a.removedEdges }),
						" edge",
						a.removedEdges === 1 ? "" : "s",
						" removed"
					]
				}),
				a.nameChanged ? /* @__PURE__ */ W("div", {
					className: "text-xs text-text-secondary mt-1",
					children: [
						"Name: ",
						/* @__PURE__ */ W("em", { children: [
							"\"",
							a.previousName ?? "",
							"\""
						] }),
						" →",
						" ",
						/* @__PURE__ */ W("strong", { children: [
							"\"",
							n.name,
							"\""
						] })
					]
				}) : null,
				a.iconChanged ? /* @__PURE__ */ W("div", {
					className: "text-xs text-text-secondary mt-1",
					children: [
						"Icon: ",
						a.previousIcon ?? "—",
						" → ",
						n.icon ?? "—"
					]
				}) : null,
				a.tagsChanged ? /* @__PURE__ */ W("div", {
					className: "text-xs text-text-secondary mt-1",
					children: [
						"Tags changed: added [",
						a.tagsAdded.join(", ") || "—",
						"], removed [",
						a.tagsRemoved.join(", ") || "—",
						"]"
					]
				}) : null
			]
		})] }) : /* @__PURE__ */ W("p", {
			className: "m-0 text-[13px] text-text-secondary",
			children: [
				"v",
				n.version,
				" · Published v",
				n.publishedVersion,
				" · No snapshot stored — diff will be available after the next publish (Phase\xA02 once archived snapshots back-fill)."
			]
		})]
	});
}
//#endregion
//#region src/components/pipelines/dev/SimulatorPanel.tsx
function Vi({ open: e, onClose: t }) {
	return null;
}
//#endregion
//#region src/components/pipelines/EditorModals.tsx
var Hi = "px-3 py-1.5 text-[13px] bg-transparent border-none text-text-secondary cursor-pointer font-[inherit]", Ui = "px-4 py-[7px] text-[13px] font-semibold bg-danger text-white border-none rounded-[7px] cursor-pointer font-[inherit]";
function Wi(e) {
	let { publishConfirmOpen: t, onPublishClose: r, onPublishConfirm: i, hasErrors: a, validationErrorCount: o, definitionName: s, definitionVersion: c, deleteConfirmOpen: l, onDeleteClose: u, onDeleteConfirm: d, clearRunsConfirmOpen: f, onClearRunsClose: p, onClearRunsConfirm: m, versionDiffOpen: h, onVersionDiffClose: g, currentDef: _, publishedDef: v, onJumpToNode: y, simPanelOpen: b, onSimPanelClose: x } = e;
	return /* @__PURE__ */ W(H, { children: [
		/* @__PURE__ */ U(C, {
			open: t,
			onClose: r,
			title: "Publish pipeline?",
			maxWidth: 420,
			footer: /* @__PURE__ */ W(H, { children: [/* @__PURE__ */ U("button", {
				onClick: r,
				className: Hi,
				children: "Cancel"
			}), /* @__PURE__ */ U("button", {
				onClick: i,
				disabled: a,
				className: n("px-4 py-[7px] text-[13px] font-semibold text-white border-none rounded-[7px] font-[inherit]", a ? "bg-border-emphasis cursor-not-allowed" : "bg-primary cursor-pointer"),
				children: "Publish"
			})] }),
			children: /* @__PURE__ */ W("p", {
				className: "m-0",
				children: [
					"Publishing will make ",
					/* @__PURE__ */ W("strong", { children: [
						"\"",
						s,
						"\""
					] }),
					" available for runs and set the published version to",
					/* @__PURE__ */ W("strong", { children: [" v", c + 1] }),
					".",
					a ? /* @__PURE__ */ W(H, { children: [
						/* @__PURE__ */ U("br", {}),
						/* @__PURE__ */ U("br", {}),
						/* @__PURE__ */ W("span", {
							className: "text-danger-fg",
							children: [
								"Pipeline has ",
								o,
								" validation error",
								o === 1 ? "" : "s",
								". Fix them before publishing."
							]
						})
					] }) : null
				]
			})
		}),
		/* @__PURE__ */ U(C, {
			open: l,
			onClose: u,
			title: "Delete pipeline?",
			maxWidth: 400,
			footer: /* @__PURE__ */ W(H, { children: [/* @__PURE__ */ U("button", {
				onClick: u,
				className: Hi,
				children: "Cancel"
			}), /* @__PURE__ */ U("button", {
				onClick: d,
				className: Ui,
				children: "Delete"
			})] }),
			children: /* @__PURE__ */ W("p", {
				className: "m-0",
				children: [/* @__PURE__ */ W("strong", { children: [
					"\"",
					s,
					"\""
				] }), " will be permanently removed. Run history for this pipeline will also be lost."]
			})
		}),
		/* @__PURE__ */ U(C, {
			open: f,
			onClose: p,
			title: "Clear run history?",
			maxWidth: 400,
			footer: /* @__PURE__ */ W(H, { children: [/* @__PURE__ */ U("button", {
				onClick: p,
				className: Hi,
				children: "Cancel"
			}), /* @__PURE__ */ U("button", {
				onClick: m,
				className: Ui,
				children: "Clear history"
			})] }),
			children: /* @__PURE__ */ W("p", {
				className: "m-0",
				children: [
					"All stored run history for ",
					/* @__PURE__ */ W("strong", { children: [
						"\"",
						s,
						"\""
					] }),
					" will be permanently removed. This cannot be undone."
				]
			})
		}),
		/* @__PURE__ */ U(Bi, {
			open: h,
			onClose: g,
			currentDef: _,
			publishedDef: v,
			onJumpToNode: y
		}),
		/* @__PURE__ */ U(Vi, {
			open: b,
			onClose: x
		})
	] });
}
//#endregion
//#region src/components/pipelines/LiveOutputPanel.tsx
function Gi({ runId: e, visible: t }) {
	let [r, i] = V(/* @__PURE__ */ new Map()), a = B(null), o = B(!0), s = B(null);
	R(() => {
		e !== s.current && (s.current = e, i(/* @__PURE__ */ new Map()), o.current = !0);
	}, [e]);
	let c = L(() => {
		let e = a.current;
		if (!e) return;
		let t = e.scrollHeight - e.scrollTop - e.clientHeight < 30;
		o.current = t;
	}, []), l = L(() => {
		if (!o.current) return;
		let e = a.current;
		e && (e.scrollTop = e.scrollHeight);
	}, []), u = L((t) => {
		if (!("eventType" in t)) return;
		let { eventType: n, payload: r } = t;
		if (!n.startsWith("pipeline.llm.")) return;
		let a = r?.runId;
		if (!e || a !== e) return;
		let o = r?.stepId;
		if (o) {
			if (n === "pipeline.llm.stream.opened") i((e) => {
				let t = new Map(e);
				return t.has(o) || t.set(o, {
					stepId: o,
					tokens: [],
					text: "",
					active: !0,
					summary: null,
					collapsed: !1,
					startedAt: Date.now()
				}), t;
			});
			else if (n === "pipeline.llm.token") {
				let e = r?.token;
				if (e === void 0) return;
				i((t) => {
					let n = new Map(t), r = n.get(o);
					if (r) {
						let t = {
							...r,
							tokens: [...r.tokens, e],
							text: r.text + e,
							active: !0
						};
						n.set(o, t);
					} else n.set(o, {
						stepId: o,
						tokens: [e],
						text: e,
						active: !0,
						summary: null,
						collapsed: !1,
						startedAt: Date.now()
					});
					return n;
				});
			} else if (n === "pipeline.llm.response") {
				let e = r?.tokensIn, t = r?.tokensOut;
				i((n) => {
					let r = new Map(n), i = r.get(o), a = i ? Date.now() - i.startedAt : 0, s = a > 1e3 ? `${(a / 1e3).toFixed(1)}s` : `${a}ms`, c = `${o}: ${e ?? "?"} tokens in, ${t ?? "?"} tokens out (${s})`;
					return i ? r.set(o, {
						...i,
						active: !1,
						summary: c
					}) : r.set(o, {
						stepId: o,
						tokens: [],
						text: "",
						active: !1,
						summary: c,
						collapsed: !1,
						startedAt: Date.now()
					}), r;
				});
			}
		}
	}, [e]);
	P("*", u), R(() => {
		l();
	}, [r, l]);
	let d = L((e) => {
		i((t) => {
			let n = new Map(t), r = n.get(e);
			return r && n.set(e, {
				...r,
				collapsed: !r.collapsed
			}), n;
		});
	}, []), f = z(() => {
		for (let e of r.values()) if (e.active) return !0;
		return !1;
	}, [r]), p = z(() => Array.from(r.values()), [r]);
	return t ? /* @__PURE__ */ W("div", {
		className: "flex flex-col bg-code-surface border-t border-code-border max-h-[320px] min-h-[160px] overflow-hidden relative",
		"data-testid": "live-output-panel",
		children: [/* @__PURE__ */ U("div", {
			className: "flex items-center justify-between py-2 px-[14px] bg-code-panel border-b border-code-border shrink-0",
			children: /* @__PURE__ */ W("div", {
				className: "text-xs font-bold text-code-text tracking-[0.04em] uppercase flex items-center gap-2",
				children: [
					/* @__PURE__ */ U("span", { children: "Live Output" }),
					f && /* @__PURE__ */ U("span", { className: "w-1.5 h-1.5 rounded-full bg-code-green [animation:live-output-blink_1.2s_ease-in-out_infinite]" }),
					e && /* @__PURE__ */ W("span", {
						className: "text-[10px] text-code-muted font-normal normal-case",
						children: [e.slice(0, 8), "..."]
					})
				]
			})
		}), /* @__PURE__ */ U("div", {
			ref: a,
			className: "flex-1 overflow-y-auto py-[10px] px-[14px] text-[13px] leading-[1.6] text-code-text font-code",
			onScroll: c,
			children: p.length === 0 ? /* @__PURE__ */ U("div", {
				className: "flex items-center justify-center h-full text-code-muted text-[13px] italic",
				children: e ? "Waiting for LLM output..." : "No active run"
			}) : p.map((e) => /* @__PURE__ */ W("div", { children: [/* @__PURE__ */ W("div", {
				className: n("flex items-center gap-2 py-1.5 cursor-pointer select-none text-[11px] font-semibold border-b border-code-border mb-1.5", e.active ? g.info : g.neutral),
				onClick: () => d(e.stepId),
				role: "button",
				tabIndex: 0,
				onKeyDown: ie(() => d(e.stepId)),
				children: [
					/* @__PURE__ */ U("span", {
						className: "text-[10px]",
						children: e.collapsed ? "▶" : "▼"
					}),
					/* @__PURE__ */ U("span", { children: e.stepId }),
					e.active && /* @__PURE__ */ U("span", {
						className: n(g.success, "text-[10px]"),
						children: "streaming"
					})
				]
			}), !e.collapsed && /* @__PURE__ */ W(H, { children: [e.text.length > 0 && /* @__PURE__ */ W("div", {
				className: "whitespace-pre-wrap break-words m-0 mb-3 p-0 text-code-text",
				children: [e.text, e.active && /* @__PURE__ */ U("span", { className: "inline-block w-0.5 h-[14px] bg-code-blue ml-px align-text-bottom [animation:live-output-blink_1s_step-end_infinite]" })]
			}), e.summary && /* @__PURE__ */ W("div", {
				className: n(g.success, "text-[11px] font-semibold pt-1 pb-2 border-b border-code-border mb-2"),
				children: [
					"✓",
					" ",
					e.summary
				]
			})] })] }, e.stepId))
		})]
	}) : null;
}
//#endregion
//#region src/components/pipelines/utils/fileUtils.ts
function Ki(e, t) {
	let n = new Blob([t], { type: "application/json" }), r = URL.createObjectURL(n), i = document.createElement("a");
	i.href = r, i.download = e, document.body.appendChild(i), i.click(), document.body.removeChild(i), URL.revokeObjectURL(r);
}
//#endregion
//#region src/components/pipelines/editor/useEditorRunLifecycle.ts
function qi(e, t) {
	if (!t) return "step";
	let n = e?.nodes.find((e) => e.id === t);
	return n ? n.data.type === "condition" && n.data.label ? n.data.label : n.type.charAt(0).toUpperCase() + n.type.slice(1) : t;
}
function Ji(e) {
	let t = $e(), { toast: n } = r(), { definition: i, selectedNodeId: a, setSelectedNodeId: o } = de(), s = B(t.runs);
	R(() => {
		s.current = t.runs;
	}, [t.runs]);
	let c = B(i);
	R(() => {
		c.current = i;
	}, [i]);
	let l = L((t) => t ? s.current[t]?.pipelineId === e : !1, [e]), [u, d] = V(null), [f, p] = V(null), m = L(() => {
		d(null), p(null);
	}, []), h = L((e) => {
		p(e);
	}, []), g = L((t) => {
		"eventType" in t || t.pipelineId === e && (n("Run started", { type: "info" }), d(null), p(null));
	}, [e, n]), _ = L((e) => {
		if ("eventType" in e || !l(e.runId)) return;
		let t = Math.round(e.durationMs / 100) / 10;
		n(`Run completed in ${t}s`, { type: "success" });
	}, [l, n]), v = L((e) => {
		if ("eventType" in e || !l(e.runId)) return;
		let t = e.error.nodeId, r = qi(c.current, t);
		n(`Run failed at ${r}`, {
			type: "error",
			durationMs: 8e3,
			actionLabel: "View",
			onAction: () => o(t)
		}), d(e.error);
	}, [
		l,
		o,
		n
	]), y = L((e) => {
		"eventType" in e || l(e.runId) && n("Run cancelled", { type: "warning" });
	}, [l, n]), b = L((e) => {
		if ("eventType" in e || !l(e.runId)) return;
		let t = e.stepId, r = qi(c.current, t);
		n(`Approval requested on "${r}"`, {
			type: "warning",
			durationMs: 6e3,
			actionLabel: "Resolve",
			onAction: () => o(t)
		});
	}, [
		l,
		o,
		n
	]);
	P("pipeline.run.started", g), P("pipeline.run.completed", _), P("pipeline.run.failed", v), P("pipeline.run.cancelled", y), P("pipeline.approval.requested", b);
	let [x, S] = V(null);
	R(() => {
		if (t.activeRunIds.length > 0) {
			let e = t.activeRunIds[t.activeRunIds.length - 1];
			e !== x && S(e);
			return;
		}
		if (!x) {
			let e = Object.values(t.runs).sort((e, t) => t.startedAt.localeCompare(e.startedAt));
			e.length > 0 && S(e[0].id);
		}
	}, [
		t.activeRunIds,
		t.runs,
		x
	]);
	let C = x ? t.runs[x] : void 0, w = !!C && (C.status === "running" || C.status === "pending" || C.status === "awaiting_approval"), [T, E] = V(/* @__PURE__ */ new Set()), [D, ee] = V(null), [O, te] = V(null), [k, A] = V(null), [ne, j] = V(0), [M, N] = V(!1), [re, ie] = V(null), F = L((e, t) => {
		t === null ? (te(null), A(null)) : (te(t), A(e));
	}, []), ae = L((e) => {
		E((t) => {
			let n = new Set(t);
			return n.has(e) ? n.delete(e) : n.add(e), n;
		});
	}, []), oe = L(async () => {
		if (T.size !== 0) try {
			let n = await t.triggerDebugRun(e, Array.from(T));
			S(n);
		} catch (e) {
			console.error("[PipelineEditor] triggerDebugRun failed", e);
		}
	}, [
		T,
		t,
		e
	]), se = L(() => {
		D && (t.resolveBreakpoint(D.runId, D.stepId, "continue"), ee(null));
	}, [D, t]), ce = L(() => {
		D && (t.resolveBreakpoint(D.runId, D.stepId, "step_over"), ee(null));
	}, [D, t]), I = L(() => {
		D && (t.resolveBreakpoint(D.runId, D.stepId, "resume_all"), ee(null));
	}, [D, t]), le = L(async () => {
		if (!(!D || !O || k !== D.stepId) && Object.keys(O).length !== 0) {
			N(!0);
			try {
				await Qe(e, D.runId, D.stepId, {
					mode: "merge",
					values: O
				}), te(null), A(null), j((e) => e + 1), t.resolveBreakpoint(D.runId, D.stepId, "continue"), ee(null);
			} catch (e) {
				if (e instanceof je) n(`Patch rejected: ${e.reason}`, {
					type: "error",
					durationMs: 8e3
				});
				else if (e instanceof Le) n(`Apply failed (HTTP ${e.status})`, {
					type: "error",
					durationMs: 6e3
				});
				else {
					let t = e instanceof Error ? e.message : String(e);
					n(`Apply failed: ${t}`, {
						type: "error",
						durationMs: 6e3
					});
				}
			} finally {
				N(!1);
			}
		}
	}, [
		D,
		O,
		k,
		e,
		t,
		n
	]), ue = L(async (t) => {
		if (D) {
			ie(t);
			try {
				await tt(e, D.runId, D.stepId, t), n("Patch reverted", {
					type: "success",
					durationMs: 3e3
				});
			} catch (e) {
				if (e instanceof Le) n(`Revert failed (HTTP ${e.status})`, {
					type: "error",
					durationMs: 6e3
				});
				else {
					let t = e instanceof Error ? e.message : String(e);
					n(`Revert failed: ${t}`, {
						type: "error",
						durationMs: 6e3
					});
				}
			} finally {
				ie(null);
			}
		}
	}, [
		D,
		e,
		n
	]), fe = L((e) => {
		if ("eventType" in e || !l(e.runId)) return;
		ee({
			runId: e.runId,
			stepId: e.stepId
		});
		let t = qi(c.current, e.stepId);
		n(`Paused at breakpoint: ${t}`, {
			type: "warning",
			durationMs: 6e3
		});
	}, [l, n]);
	P("pipeline.step.breakpoint", fe);
	let pe = L((e) => {
		"eventType" in e || D && D.runId === e.runId && ee(null);
	}, [D]);
	P("pipeline.run.completed", pe), P("pipeline.run.failed", pe), P("pipeline.run.cancelled", pe);
	let me = L(() => {
		u?.nodeId && (t.retryFromStep(u.nodeId), m());
	}, [
		u,
		t,
		m
	]), he = i?.status === "published", ge = !w && !he, _e = w ? "Cancel the active run" : he ? "Start a new run" : "Publish the pipeline to enable runs", [ve, ye] = V(!1), [be, xe] = V({}), [Se, Ce] = V(!1), [we, Te] = V("config");
	R(() => {
		a !== null && Te("config");
	}, [a]);
	let Ee = L(async (r) => {
		Ce(!0);
		try {
			let i = await t.triggerRun(e, r);
			S(i), Te("runs"), n(`Pipeline triggered — run ${i.slice(0, 8)}…`, { type: "success" });
		} catch (e) {
			console.error("[PipelineEditor] triggerRun failed", e), n(`Trigger failed: ${e.message}`, { type: "error" });
		} finally {
			Ce(!1);
		}
	}, [
		t,
		e,
		n
	]);
	return {
		currentRunId: x,
		setCurrentRunId: S,
		activeError: u,
		setActiveError: d,
		errorNodeAnchor: f,
		handleDismissError: m,
		handleErrorNodePosition: h,
		handleRetryFromError: me,
		handleRunClick: L(async () => {
			if (w && x) {
				t.cancelRun(x);
				return;
			}
			ge || Ee();
		}, [
			w,
			x,
			ge,
			t,
			Ee
		]),
		handleTriggerInputSubmit: L(() => {
			ye(!1), Ee(be);
		}, [Ee, be]),
		isRunActive: w,
		runDisabled: ge,
		runTitle: _e,
		isTriggering: Se,
		triggerInputOpen: ve,
		setTriggerInputOpen: ye,
		triggerInputValues: be,
		setTriggerInputValues: xe,
		breakpoints: T,
		handleToggleBreakpoint: ae,
		handleDebugRunClick: oe,
		pausedBreakpoint: D,
		handleBreakpointContinue: se,
		handleBreakpointStepOver: ce,
		handleBreakpointResumeAll: I,
		handleApplyAndContinue: le,
		handleRevertPatch: ue,
		applyingPatch: M,
		revertingPatchId: re,
		dirtyPatch: O,
		dirtyPatchStepId: k,
		handleContextEditBufferChange: F,
		resetEditBufferKey: ne,
		sidebarTab: we,
		setSidebarTab: Te
	};
}
//#endregion
//#region src/components/pipelines/editor/EditorOverflowMenu.tsx
function Yi({ isPublished: e, showTags: t, hasPublishedVersion: r, onDuplicate: i, onCopyMermaid: a, onViewVersions: o, onRevert: s, onToggleShowTags: c, onViewRunHistory: l, onClearRunHistory: u, onSimPanelOpen: d, onDelete: f }) {
	let p = n("block w-full text-left px-3.5 py-2 text-[13px]", "border-none bg-transparent cursor-pointer font-inherit text-text-primary", "hover:bg-surface-hover"), m = n("block w-full text-left px-3.5 py-2 text-[13px]", "border-none bg-transparent cursor-pointer font-inherit text-danger-fg", "hover:bg-surface-hover");
	return /* @__PURE__ */ W("div", {
		className: n("absolute top-full right-0 mt-1.5 bg-surface border border-border rounded-lg", "shadow-lg p-0 min-w-[200px] max-h-[320px] overflow-y-auto z-20"),
		role: "menu",
		"aria-label": "Editor actions",
		onKeyDown: (e) => rt(e, {
			itemSelector: "[role=\"menuitem\"]",
			orientation: "vertical"
		}),
		children: [
			/* @__PURE__ */ U("button", {
				className: p,
				role: "menuitem",
				onClick: i,
				children: "Duplicate"
			}),
			/* @__PURE__ */ U("button", {
				className: p,
				role: "menuitem",
				onClick: a,
				"data-testid": "copy-mermaid-btn",
				children: "Copy Mermaid"
			}),
			/* @__PURE__ */ U("button", {
				className: p,
				role: "menuitem",
				onClick: o,
				"data-testid": "view-versions-btn",
				children: "View changes since publish"
			}),
			/* @__PURE__ */ U("button", {
				className: p,
				role: "menuitem",
				onClick: s,
				disabled: !r,
				children: "Revert to published"
			}),
			/* @__PURE__ */ U("div", { className: "border-t border-border-subtle my-1" }),
			/* @__PURE__ */ U("button", {
				className: p,
				role: "menuitem",
				onClick: c,
				"data-testid": "toggle-tags-row",
				children: t ? "Hide tags" : "Show tags"
			}),
			/* @__PURE__ */ U("button", {
				className: p,
				role: "menuitem",
				onClick: l,
				children: "View run history"
			}),
			/* @__PURE__ */ U("button", {
				className: m,
				role: "menuitem",
				onClick: u,
				children: "Clear run history"
			}),
			!1,
			/* @__PURE__ */ U("div", { className: "border-t border-border-subtle my-1" }),
			/* @__PURE__ */ U("button", {
				className: m,
				role: "menuitem",
				onClick: f,
				children: "Delete"
			})
		]
	});
}
//#endregion
//#region src/components/pipelines/editor/EditorTopBar.tsx
var Xi = {
	neutral: "bg-surface-hover text-text-secondary",
	success: "bg-success-bg text-success-fg",
	warning: "bg-warning-bg text-warning-fg",
	danger: "bg-danger-bg text-danger-fg",
	info: "bg-info-bg text-info-fg"
};
function Zi({ pipelineId: e, definition: t, dirty: r, savingFlash: i, isRunActive: a, isTriggering: o, runDisabled: c, runTitle: l, currentRun: u, breakpoints: d, onRunClick: f, onDebugRunClick: p, onExport: m, onPublishClick: g, onDuplicate: _, onCopyMermaid: y, onViewVersions: b, onRevert: x, onToggleShowTags: S, showTags: C, onViewRunHistory: w, onClearRunHistory: T, onSimPanelOpen: E, onDelete: D }) {
	let ee = ft(), { rename: O, setIcon: te, setSelectedNodeId: A } = de(), [ne, j] = V(!1), [M, N] = V(""), re = B(null);
	R(() => {
		ne && (N(t.name ?? ""), setTimeout(() => re.current?.focus(), 0));
	}, [ne, t.name]);
	let ie = () => {
		let e = M.trim();
		e && e !== t.name && O(e), j(!1);
	}, P = z(() => t ? Yr(t) : null, [t]);
	P?.errors.length;
	let F = t.status === "published", ae = r ? {
		label: "Saving…",
		variant: "info"
	} : i ? {
		label: "✓ Saved",
		variant: "success"
	} : {
		label: "✓ Saved",
		variant: "neutral"
	}, oe = t.status === "published" ? {
		label: `v${t.version} · Published`,
		variant: "success"
	} : typeof t.publishedVersion == "number" ? {
		label: `v${t.version} · Draft (pub v${t.publishedVersion})`,
		variant: "warning"
	} : {
		label: `v${t.version} · Draft`,
		variant: "neutral"
	}, se = P ? P.errors.length > 0 ? {
		label: `✗ ${P.errors.length} error${P.errors.length === 1 ? "" : "s"}`,
		variant: "danger"
	} : P.warnings.length > 0 ? {
		label: `⚠ ${P.warnings.length} warning${P.warnings.length === 1 ? "" : "s"}`,
		variant: "warning"
	} : {
		label: "✓ Valid",
		variant: "success"
	} : {
		label: "…",
		variant: "neutral"
	}, [ce, I] = V(!1), le = B(null);
	Xn(le, () => I(!1), ce);
	let ue = P ? [...P.errors, ...P.warnings] : [], fe = (e) => {
		e && (A(e), I(!1));
	}, pe = t.nodes.filter((e) => e.type !== "trigger").length, me = u ? Object.values(u.steps).filter((e) => e.status === "completed" || e.status === "skipped").length : 0, he = ((u?.startedAt ? Date.now() - new Date(u.startedAt).getTime() : 0) / 1e3).toFixed(1), ge = a && u ? {
		text: `Running (${me}/${pe} steps) · ${he}s`,
		variant: "running"
	} : u?.status === "completed" ? {
		text: `Completed in ${u.durationMs == null ? "?" : (u.durationMs / 1e3).toFixed(1)}s`,
		variant: "success"
	} : u?.status === "failed" ? {
		text: `Failed at ${qi(t, u.error?.nodeId)}`,
		variant: "error"
	} : {
		text: "",
		variant: "none"
	}, _e = {
		running: "bg-info-bg text-info-fg",
		success: "bg-success-bg text-success-fg",
		error: "bg-danger-bg text-danger-fg"
	}, ve = a ? "⏹ Stop" : u && u.status !== "running" ? "↻ Re-run" : "▶ Run", [ye, be] = V(!1), xe = B(null);
	return Xn(xe, () => be(!1), ye), /* @__PURE__ */ W("div", {
		className: n("h-11 shrink-0 flex items-center gap-2.5 px-3", "border-b border-border bg-surface", "sticky top-0 z-5"),
		children: [
			/* @__PURE__ */ U(v, {
				onClick: () => ee("/pipelines"),
				"aria-label": "Back to pipelines",
				title: "Back to pipelines",
				children: "←"
			}),
			/* @__PURE__ */ U(s, {
				value: t.icon ?? "🔀",
				onChange: te
			}),
			ne ? /* @__PURE__ */ U(k, {
				ref: re,
				value: M,
				onChange: (e) => N(e.target.value),
				onBlur: ie,
				onKeyDown: (e) => {
					e.key === "Enter" && ie(), e.key === "Escape" && (N(t.name), j(!1));
				},
				"aria-label": "Pipeline name",
				className: "w-[260px] text-sm font-bold",
				"data-testid": "pipeline-name-input"
			}) : /* @__PURE__ */ U("button", {
				type: "button",
				onClick: () => j(!0),
				className: n("px-2 py-1 text-sm font-bold text-text-primary", "bg-transparent border border-transparent rounded-md", "cursor-text font-inherit max-w-[280px]", "overflow-hidden text-ellipsis whitespace-nowrap text-left"),
				title: t.name,
				"data-testid": "pipeline-name",
				children: t.name
			}),
			/* @__PURE__ */ U("span", {
				className: n("inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold font-inherit leading-snug whitespace-nowrap", Xi[ae.variant]),
				"data-testid": "save-status",
				children: ae.label
			}),
			/* @__PURE__ */ U("span", {
				className: n("inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold font-inherit leading-snug whitespace-nowrap", Xi[oe.variant]),
				"data-testid": "version-badge",
				children: oe.label
			}),
			/* @__PURE__ */ W("div", {
				className: "relative",
				ref: le,
				children: [/* @__PURE__ */ U("button", {
					type: "button",
					onClick: () => I((e) => !e),
					className: n("inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold font-inherit leading-snug whitespace-nowrap", "cursor-pointer border-none", Xi[se.variant]),
					"data-testid": "validation-indicator",
					children: se.label
				}), ce && ue.length > 0 && /* @__PURE__ */ U("div", {
					className: n("absolute top-full mt-1.5 bg-surface border border-border rounded-lg", "shadow-lg p-0 min-w-[260px] max-w-[360px] max-h-[320px] overflow-y-auto z-20"),
					children: ue.map((e, t) => /* @__PURE__ */ W("button", {
						type: "button",
						onClick: () => fe(e.nodeId),
						className: n("block w-full text-left px-3.5 py-2 text-[13px]", "border-none bg-transparent font-inherit text-text-primary", "flex gap-2 items-start leading-snug", e.nodeId ? "cursor-pointer" : "cursor-default", t < ue.length - 1 && "border-b border-border"),
						children: [/* @__PURE__ */ U("span", {
							className: n("font-bold text-xs", e.severity === "error" ? "text-danger-fg" : "text-warning-fg"),
							children: e.severity === "error" ? "✗" : "⚠"
						}), /* @__PURE__ */ W("span", {
							className: "flex-1 text-xs",
							children: [
								/* @__PURE__ */ U("div", {
									className: "font-semibold",
									children: e.code
								}),
								/* @__PURE__ */ U("div", {
									className: "text-text-secondary",
									children: e.message
								}),
								e.nodeId && /* @__PURE__ */ U("div", {
									className: "mt-0.5 text-[11px] text-primary",
									children: "Jump to node →"
								})
							]
						})]
					}, `${e.code}-${t}`))
				})]
			}),
			ge.variant !== "none" && /* @__PURE__ */ W("span", {
				className: n("inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-semibold font-inherit leading-snug whitespace-nowrap", _e[ge.variant]),
				"data-testid": "run-status-indicator",
				children: [
					ge.variant === "running" && /* @__PURE__ */ U("span", { className: "inline-block w-3 h-3 border-2 border-border border-t-primary rounded-full animate-spin" }),
					ge.variant === "success" && "✓ ",
					ge.variant === "error" && "✗ ",
					ge.text
				]
			}),
			/* @__PURE__ */ U("div", { className: "flex-1" }),
			/* @__PURE__ */ U(h, {
				variant: "secondary",
				onClick: () => ee("/pipelines/metrics"),
				title: "View pipeline metrics dashboard",
				"data-testid": "metrics-button",
				children: "Metrics"
			}),
			/* @__PURE__ */ U(h, {
				variant: "secondary",
				onClick: m,
				title: "Export pipeline as JSON",
				"data-testid": "export-button",
				children: "Export"
			}),
			/* @__PURE__ */ U("button", {
				type: "button",
				onClick: g,
				title: F ? "Already published at this version" : "Publish pipeline to enable runs",
				disabled: F,
				className: n("px-3 py-1.5 text-[13px] font-semibold border-none rounded-md font-inherit shrink-0", F ? "bg-surface-hover text-text-tertiary cursor-default opacity-70" : "bg-success text-white cursor-pointer"),
				"data-testid": "publish-button",
				children: F ? "Published" : "Publish"
			}),
			/* @__PURE__ */ U("button", {
				type: "button",
				onClick: f,
				disabled: c || o,
				title: l,
				className: n("px-3.5 py-1.5 text-[13px] font-semibold text-white border-none rounded-md font-inherit shrink-0", a ? "bg-danger" : "bg-primary", c || o ? "cursor-not-allowed opacity-50" : "cursor-pointer"),
				"data-testid": "run-button",
				children: o ? /* @__PURE__ */ W("span", {
					className: "inline-flex items-center gap-1.5",
					children: [/* @__PURE__ */ U("span", { className: "inline-block w-3 h-3 border-2 border-border border-t-white rounded-full animate-spin" }), "Triggering…"]
				}) : ve
			}),
			d.size > 0 && /* @__PURE__ */ W("button", {
				type: "button",
				onClick: p,
				disabled: c || a,
				title: `Debug run (${d.size} breakpoint${d.size > 1 ? "s" : ""})`,
				className: n("px-3.5 py-1.5 text-[13px] font-semibold bg-warning text-white", "border-none rounded-md font-inherit shrink-0", c || a ? "cursor-not-allowed opacity-50" : "cursor-pointer"),
				"data-testid": "debug-run-button",
				children: [
					"Debug (",
					d.size,
					")"
				]
			}),
			/* @__PURE__ */ W("div", {
				className: "relative",
				ref: xe,
				children: [/* @__PURE__ */ U(v, {
					onClick: () => be((e) => !e),
					"aria-label": "More actions",
					"data-testid": "overflow-menu-btn",
					children: "⋯"
				}), ye && /* @__PURE__ */ U(Yi, {
					isPublished: F,
					showTags: C,
					onDuplicate: () => {
						_(), be(!1);
					},
					onCopyMermaid: () => {
						y(), be(!1);
					},
					onViewVersions: () => {
						b(), be(!1);
					},
					onRevert: () => {
						x(), be(!1);
					},
					onToggleShowTags: () => {
						S(), be(!1);
					},
					onViewRunHistory: () => {
						w(), be(!1);
					},
					onClearRunHistory: () => {
						T(), be(!1);
					},
					onSimPanelOpen: () => {
						E(), be(!1);
					},
					onDelete: () => {
						D(), be(!1);
					},
					hasPublishedVersion: typeof t.publishedVersion == "number"
				})]
			})
		]
	});
}
//#endregion
//#region src/components/pipelines/context-inspector/ContextJsonTree.tsx
var Qi = 12;
function $i(e) {
	return n("text-xs", {
		string: "text-code-green",
		number: "text-code-peach",
		boolean: "text-code-mauve",
		null: "text-code-muted",
		bracket: "text-code-comment"
	}[e]);
}
var ea = "bg-[rgba(166,227,161,0.08)] rounded-sm px-0.5", ta = "text-code-green font-bold bg-[rgba(166,227,161,0.1)] rounded-sm px-0.5";
function na({ data: e, depth: t = 0, highlightKeys: r, keyName: i, isHighlighted: a = !1 }) {
	let [o, s] = V(t > 2);
	if (t > Qi) return /* @__PURE__ */ U("span", {
		className: $i("string"),
		children: "[max depth]"
	});
	let c = a || i != null && r?.has(i);
	if (e === null) return /* @__PURE__ */ U("span", {
		className: n($i("null"), c && ea),
		children: "null"
	});
	if (e === void 0) return /* @__PURE__ */ U("span", {
		className: n($i("null"), c && ea),
		children: "undefined"
	});
	if (typeof e == "boolean") return /* @__PURE__ */ U("span", {
		className: n($i("boolean"), c && ea),
		children: String(e)
	});
	if (typeof e == "number") return /* @__PURE__ */ U("span", {
		className: n($i("number"), c && ea),
		children: String(e)
	});
	if (typeof e == "string") {
		let t = e.length > 120 ? e.slice(0, 120) + "..." : e;
		return /* @__PURE__ */ W("span", {
			className: n($i("string"), c && ea),
			children: [
				"\"",
				t,
				"\""
			]
		});
	}
	if (Array.isArray(e)) return e.length === 0 ? /* @__PURE__ */ U("span", {
		className: $i("bracket"),
		children: "[]"
	}) : /* @__PURE__ */ W("span", { children: [
		/* @__PURE__ */ U("span", {
			className: "cursor-pointer select-none text-[9px] mr-1 text-code-muted inline-block w-3 text-center",
			onClick: () => s((e) => !e),
			role: "button",
			tabIndex: 0,
			onKeyDown: ie(() => s((e) => !e)),
			children: o ? "▶" : "▼"
		}),
		/* @__PURE__ */ U("span", {
			className: $i("bracket"),
			children: "["
		}),
		o ? /* @__PURE__ */ W("span", {
			className: "text-code-muted italic text-[11px] ml-1",
			children: [e.length, " items"]
		}) : /* @__PURE__ */ U("div", {
			className: "pl-4",
			children: e.map((n, i) => /* @__PURE__ */ W("div", {
				className: "leading-relaxed whitespace-nowrap",
				children: [
					/* @__PURE__ */ W("span", {
						className: "text-code-muted text-[11px]",
						children: [i, ": "]
					}),
					/* @__PURE__ */ U(na, {
						data: n,
						depth: t + 1,
						highlightKeys: r
					}),
					i < e.length - 1 && /* @__PURE__ */ U("span", {
						className: $i("bracket"),
						children: ","
					})
				]
			}, i))
		}),
		/* @__PURE__ */ U("span", {
			className: $i("bracket"),
			children: "]"
		})
	] });
	if (typeof e == "object") {
		let i = Object.entries(e);
		return i.length === 0 ? /* @__PURE__ */ U("span", {
			className: $i("bracket"),
			children: "{}"
		}) : /* @__PURE__ */ W("span", { children: [
			/* @__PURE__ */ U("span", {
				className: "cursor-pointer select-none text-[9px] mr-1 text-code-muted inline-block w-3 text-center",
				onClick: () => s((e) => !e),
				role: "button",
				tabIndex: 0,
				onKeyDown: ie(() => s((e) => !e)),
				children: o ? "▶" : "▼"
			}),
			/* @__PURE__ */ U("span", {
				className: $i("bracket"),
				children: "{"
			}),
			o ? /* @__PURE__ */ W("span", {
				className: "text-code-muted italic text-[11px] ml-1",
				children: [i.length, " keys"]
			}) : /* @__PURE__ */ U("div", {
				className: "pl-4",
				children: i.map(([e, o], s) => {
					let c = r?.has(e) || a;
					return /* @__PURE__ */ W("div", {
						className: "leading-relaxed whitespace-nowrap",
						children: [
							/* @__PURE__ */ U("span", {
								className: n("text-xs font-medium text-code-blue", c && ta),
								children: e
							}),
							/* @__PURE__ */ U("span", {
								className: $i("bracket"),
								children: ": "
							}),
							/* @__PURE__ */ U(na, {
								data: o,
								depth: t + 1,
								highlightKeys: t === 0 ? r : void 0,
								keyName: e,
								isHighlighted: c
							}),
							s < i.length - 1 && /* @__PURE__ */ U("span", {
								className: $i("bracket"),
								children: ","
							})
						]
					}, e);
				})
			}),
			/* @__PURE__ */ U("span", {
				className: $i("bracket"),
				children: "}"
			})
		] });
	}
	return /* @__PURE__ */ U("span", {
		className: $i("string"),
		children: String(e)
	});
}
//#endregion
//#region src/components/pipelines/context-inspector/ContextStepList.tsx
function ra({ snapshots: e, activeStepId: t, fallbackActiveStepId: r, onStepSelect: i }) {
	let a = t ?? r;
	return /* @__PURE__ */ U("div", {
		className: "w-[140px] shrink-0 border-r border-border overflow-y-auto",
		children: e.map((e, t) => {
			let r = e.stepId === a;
			return /* @__PURE__ */ W("div", {
				className: n("px-2.5 py-1.5 text-[11px] font-mono border-b border-border overflow-hidden text-ellipsis whitespace-nowrap", i && "cursor-pointer", r ? "text-text-primary bg-surface-inset font-semibold" : "text-text-tertiary font-normal"),
				onClick: i ? () => i(e.stepId) : void 0,
				role: i ? "button" : void 0,
				tabIndex: i ? 0 : void 0,
				onKeyDown: i ? ie(() => i(e.stepId)) : void 0,
				title: e.stepId,
				children: [
					e.newKeys.length > 0 && /* @__PURE__ */ U("span", {
						className: "text-code-green mr-1 text-[9px]",
						children: "+"
					}),
					/* @__PURE__ */ W("span", {
						className: "text-[10px] text-code-comment mr-1",
						children: [t + 1, "."]
					}),
					e.stepId ? e.stepId.slice(0, 8) : `step-${t + 1}`
				]
			}, e.stepId || t);
		})
	});
}
//#endregion
//#region src/components/pipelines/context-inspector/ContextEditBuffer.tsx
function ia(e) {
	return typeof e == "string" ? "string" : typeof e == "number" ? "number" : typeof e == "boolean" ? "boolean" : "object";
}
function aa({ k: e, initial: t, onCommit: n, onError: r, onFocus: i }) {
	let [a, o] = V(() => {
		try {
			return JSON.stringify(t, null, 2);
		} catch {
			return "";
		}
	});
	return /* @__PURE__ */ U("textarea", {
		"data-testid": `context-edit-input-${e}`,
		value: a,
		onChange: (e) => o(e.target.value),
		onFocus: i,
		onBlur: () => {
			try {
				n(JSON.parse(a));
			} catch (e) {
				r(`Invalid JSON: ${e instanceof Error ? e.message : String(e)}`);
			}
		},
		className: "w-full px-1.5 py-1 text-xs bg-code-bg text-code-text border border-code-border rounded-sm font-mono min-h-[60px] resize-y"
	});
}
function oa({ inputContext: e, buffer: t, parseErrors: r, newKeyDraft: i, setNewKeyDraft: a, onCommitNewKey: o, onBeginEditKey: s, onSetValue: c, onRemoveKey: l, onParseError: u }) {
	let d = z(() => {
		let n = /* @__PURE__ */ new Set([...Object.keys(e), ...Object.keys(t)]);
		return Array.from(n);
	}, [e, t]), f = "w-full px-1.5 py-1 text-xs bg-code-bg text-code-text border border-code-border rounded-sm font-mono";
	return /* @__PURE__ */ W("div", {
		"data-testid": "context-edit-table",
		children: [d.map((i) => {
			let a = i in t, o = a ? t[i] : e[i], d = ia(o), p = a;
			return /* @__PURE__ */ W("div", {
				className: "grid grid-cols-[120px_1fr_auto] gap-2 items-start py-1.5 border-b border-code-border",
				"data-testid": `context-edit-row-${i}`,
				children: [
					/* @__PURE__ */ W("span", {
						className: n("text-xs font-medium text-code-blue pt-1 overflow-hidden text-ellipsis whitespace-nowrap", p && "text-code-green font-bold"),
						title: i,
						children: [i, p && /* @__PURE__ */ U("span", {
							className: "ml-1 text-[9px]",
							children: "●"
						})]
					}),
					/* @__PURE__ */ W("div", {
						className: "min-w-0",
						children: [d === "boolean" ? /* @__PURE__ */ W("select", {
							"data-testid": `context-edit-input-${i}`,
							value: String(o),
							onChange: (e) => c(i, e.target.value === "true"),
							onFocus: () => s(i, o),
							className: f,
							children: [/* @__PURE__ */ U("option", {
								value: "true",
								children: "true"
							}), /* @__PURE__ */ U("option", {
								value: "false",
								children: "false"
							})]
						}) : d === "number" ? /* @__PURE__ */ U("input", {
							"data-testid": `context-edit-input-${i}`,
							type: "number",
							value: String(o),
							onChange: (e) => {
								let t = e.target.value === "" ? 0 : Number(e.target.value);
								c(i, Number.isNaN(t) ? 0 : t);
							},
							onFocus: () => s(i, o),
							className: f
						}) : d === "string" ? /* @__PURE__ */ U("input", {
							"data-testid": `context-edit-input-${i}`,
							type: "text",
							value: o ?? "",
							onChange: (e) => c(i, e.target.value),
							onFocus: () => s(i, o),
							className: f
						}) : /* @__PURE__ */ U(aa, {
							k: i,
							initial: o,
							onCommit: (e) => c(i, e),
							onError: (e) => u(i, e),
							onFocus: () => s(i, o)
						}), r[i] && /* @__PURE__ */ U("div", {
							"data-testid": `context-edit-parse-error-${i}`,
							className: "text-code-red text-[11px] mt-1",
							children: r[i]
						})]
					}),
					/* @__PURE__ */ U("div", {
						className: "flex gap-1",
						children: p && /* @__PURE__ */ U("button", {
							type: "button",
							"data-testid": `context-edit-revert-${i}`,
							onClick: () => l(i),
							title: "Drop change",
							className: "px-1.5 py-0.5 text-[10px] bg-transparent text-code-comment border border-code-border rounded-sm cursor-pointer font-mono",
							children: "↺"
						})
					})
				]
			}, i);
		}), /* @__PURE__ */ W("div", {
			className: "grid grid-cols-[120px_1fr_auto] gap-2 items-start py-1.5 mt-2",
			"data-testid": "context-edit-add-row",
			children: [
				/* @__PURE__ */ U("input", {
					"data-testid": "context-edit-new-key",
					type: "text",
					placeholder: "key",
					value: i.key,
					onChange: (e) => a({
						...i,
						key: e.target.value
					}),
					className: f
				}),
				/* @__PURE__ */ U("input", {
					"data-testid": "context-edit-new-value",
					type: "text",
					placeholder: "value (string or JSON)",
					value: i.value,
					onChange: (e) => a({
						...i,
						value: e.target.value
					}),
					onKeyDown: (e) => {
						e.key === "Enter" && (e.preventDefault(), o());
					},
					className: f
				}),
				/* @__PURE__ */ U("button", {
					type: "button",
					"data-testid": "context-edit-add-btn",
					onClick: o,
					disabled: !i.key.trim(),
					className: n("px-2.5 py-0.5 text-[11px] font-semibold border rounded-sm cursor-pointer font-mono", i.key.trim() ? "bg-code-green text-code-surface border-code-green" : "bg-transparent text-code-raised border-code-border cursor-not-allowed"),
					children: "+ Add field"
				})
			]
		})]
	});
}
//#endregion
//#region src/components/pipelines/context-inspector/useContextSnapshots.ts
function sa(e, t, n) {
	let r = { ...e }, i = { ...r.steps ?? {} };
	return i[t] = n, r.steps = i, n && typeof n == "object" && !Array.isArray(n) && Object.assign(r, n), r;
}
function ca(e, t) {
	let n = [];
	for (let r of Object.keys(t)) r in e || n.push(r);
	return n;
}
function la(e) {
	let t = Object.values(e.steps).filter((e) => e != null).sort((e, t) => (e.startedAt ? Date.parse(e.startedAt) : 0) - (t.startedAt ? Date.parse(t.startedAt) : 0)), n = [], r = {};
	e.triggeredBy?.payload && typeof e.triggeredBy.payload == "object" && (r = { ...e.triggeredBy.payload });
	for (let e of t) {
		let t = { ...r }, i = e.output, a = e.llm?.prompt, o;
		if (i !== void 0) o = sa(r, e.nodeId, i);
		else {
			o = { ...r };
			let t = { ...o.steps ?? {} };
			t[e.nodeId] = i, o.steps = t;
		}
		let s = ca(t, o);
		n.push({
			stepId: e.nodeId,
			inputContext: t,
			output: i,
			outputContext: o,
			resolvedPrompt: a || void 0,
			newKeys: s,
			stepExecution: e
		}), r = o;
	}
	return n;
}
function ua(e, t) {
	let [n, r] = V(/* @__PURE__ */ new Map()), [i, a] = V(/* @__PURE__ */ new Map()), o = B(null);
	R(() => {
		let t = e?.id ?? null;
		t !== o.current && (o.current = t, r(/* @__PURE__ */ new Map()), a(/* @__PURE__ */ new Map()));
	}, [e?.id]);
	let s = L((t) => {
		if (!t || typeof t != "object") return;
		let { eventType: n, payload: i } = t;
		if (!i || typeof i != "object") return;
		let o = i, s = o.runId;
		if (!(!e?.id || s !== e.id)) {
			if (n === "pipeline.llm.prompt") {
				let e = o.stepId, t = o.prompt;
				e && t && r((n) => {
					let r = new Map(n);
					return r.set(e, t), r;
				});
			}
			if (n === "pipeline.run.checkpoint" || n === "pipeline.run.checkpointed" || n === "pipeline:run:checkpoint" || n === "pipeline:run:checkpointed") {
				let e = o.context, t = o.stepId;
				e && t && a((n) => {
					let r = new Map(n);
					return r.set(t, e), r;
				});
			}
		}
	}, [e?.id]);
	P("*", s);
	let c = z(() => e ? la(e) : [], [e]), l = z(() => c.map((e) => {
		let t = n.get(e.stepId), r = i.get(e.stepId);
		return {
			...e,
			resolvedPrompt: e.resolvedPrompt || t,
			outputContext: r ?? e.outputContext
		};
	}), [
		c,
		n,
		i
	]), u = z(() => t ? l.find((e) => e.stepId === t) ?? null : l[l.length - 1] ?? null, [l, t]);
	return {
		enrichedSnapshots: l,
		activeSnapshot: u,
		newKeysSet: z(() => u ? new Set(u.newKeys) : /* @__PURE__ */ new Set(), [u])
	};
}
//#endregion
//#region src/components/pipelines/ContextInspector.tsx
function da({ attempt: e, label: t }) {
	let r = !e.error;
	return /* @__PURE__ */ W("div", {
		className: "bg-code-bg rounded-md border border-code-border p-2.5 overflow-auto",
		children: [
			/* @__PURE__ */ U("div", {
				className: "text-[11px] font-bold text-code-text mb-2",
				children: t
			}),
			/* @__PURE__ */ W("div", {
				className: "flex gap-1.5 mb-1.5 items-center",
				children: [/* @__PURE__ */ U(S, {
					palette: "code",
					tone: r ? "success" : "danger",
					size: "xs",
					children: r ? "OK" : "FAIL"
				}), e.durationMs != null && /* @__PURE__ */ W("span", {
					className: "text-[10px] text-code-muted",
					children: [e.durationMs, "ms"]
				})]
			}),
			e.error && /* @__PURE__ */ U("div", {
				className: n("text-[11px] font-mono mb-1.5 px-2 py-1.5 rounded whitespace-pre-wrap break-words", _.danger),
				children: e.error
			}),
			e.output !== void 0 && /* @__PURE__ */ W("div", { children: [/* @__PURE__ */ U("div", {
				className: "text-[10px] text-code-muted font-semibold mb-1 uppercase",
				children: "Output"
			}), /* @__PURE__ */ U(na, {
				data: e.output,
				depth: 0
			})] })
		]
	});
}
function fa({ run: e, activeStepId: t, onStepSelect: r, editable: i = !1, onEditBufferChange: a, resetEditBufferKey: o }) {
	let [s, c] = V("input"), [l, u] = V(0), [d, f] = V(!1), [p, m] = V({}), [h, g] = V(null), [_, v] = V({}), [y, b] = V({
		key: "",
		value: ""
	}), { enrichedSnapshots: x, activeSnapshot: C, newKeysSet: w } = ua(e, t), T = C?.resolvedPrompt != null, E = C?.stepExecution.attempts, D = (E?.length ?? 0) >= 2;
	R(() => {
		s === "prompt" && !T && c("input"), s === "attempts" && !D && c("input");
	}, [
		s,
		T,
		D
	]), R(() => {
		u(0);
	}, [t]);
	let ee = !!(e && e.status === "paused_at_breakpoint" && t && (e.currentStepIds?.includes(t) || C?.stepExecution.status === "running" || C?.stepExecution.status === "awaiting" || C?.stepExecution.status === "pending")), O = !!i && !!ee;
	R(() => {
		O ? h && h !== t && (m({}), g(null), v({})) : (d && f(!1), Object.keys(p).length > 0 && m({}), h && g(null), Object.keys(_).length > 0 && v({}));
	}, [O, t]), R(() => {
		o !== void 0 && (m({}), g(null), v({}), b({
			key: "",
			value: ""
		}));
	}, [o]), R(() => {
		!O || !t || a && (Object.keys(p).length === 0 ? a(t, null) : a(t, p));
	}, [
		p,
		O,
		t
	]);
	let te = L((e, n) => {
		g(t), m((t) => e in t ? t : {
			...t,
			[e]: n
		});
	}, [t]), k = L((e, n) => {
		g(t), m((t) => ({
			...t,
			[e]: n
		})), v((t) => {
			if (!(e in t)) return t;
			let n = { ...t };
			return delete n[e], n;
		});
	}, [t]), A = L((e) => {
		m((t) => {
			if (!(e in t)) return t;
			let n = { ...t };
			return delete n[e], n;
		}), v((t) => {
			if (!(e in t)) return t;
			let n = { ...t };
			return delete n[e], n;
		});
	}, []), ne = L((e, t) => {
		v((n) => ({
			...n,
			[e]: t
		}));
	}, []), j = L(() => {
		m({}), g(null), v({}), b({
			key: "",
			value: ""
		});
	}, []), M = L(() => {
		let e = y.key.trim();
		if (!e) return;
		let t = y.value, n = y.value;
		if (n.trim().length > 0) try {
			t = JSON.parse(n);
		} catch {
			t = n;
		}
		k(e, t), b({
			key: "",
			value: ""
		});
	}, [y, k]);
	return !e || x.length === 0 ? /* @__PURE__ */ W("div", {
		className: "flex flex-col overflow-hidden h-full",
		"data-testid": "context-inspector",
		children: [/* @__PURE__ */ U("div", {
			className: "flex items-center justify-between px-3.5 py-2 border-b border-border shrink-0",
			children: /* @__PURE__ */ U("span", {
				className: "text-xs font-bold text-text-primary tracking-wide uppercase",
				children: "Context Inspector"
			})
		}), /* @__PURE__ */ W("div", {
			className: "flex-1 overflow-auto px-3.5 py-2.5 font-mono text-xs flex items-center justify-center flex-col gap-2",
			children: [/* @__PURE__ */ U("span", {
				className: "text-[13px] text-code-muted",
				children: e ? "Waiting for step execution data..." : "Run a pipeline to inspect context flow"
			}), /* @__PURE__ */ U("span", {
				className: "text-[11px] text-code-raised",
				children: e ? "Context data will appear as steps complete." : "Trigger a run to see inputs, outputs, and context at each step."
			})]
		})]
	}) : /* @__PURE__ */ W("div", {
		className: "flex flex-col overflow-hidden h-full",
		"data-testid": "context-inspector",
		children: [
			/* @__PURE__ */ W("div", {
				className: "flex items-center justify-between px-3.5 py-2 border-b border-border shrink-0",
				children: [/* @__PURE__ */ U("span", {
					className: "text-xs font-bold text-text-primary tracking-wide uppercase",
					children: "Context Inspector"
				}), C && C.stepId && /* @__PURE__ */ W("span", {
					className: "text-[10px] text-code-muted",
					children: ["Step: ", C.stepId.slice(0, 8)]
				})]
			}),
			/* @__PURE__ */ U("div", {
				className: "flex gap-0 border-b border-border shrink-0",
				children: [
					{
						id: "input",
						label: "Input Context",
						show: !0
					},
					{
						id: "output",
						label: "Output",
						show: !0
					},
					{
						id: "prompt",
						label: "Resolved Prompt",
						show: T
					},
					{
						id: "details",
						label: "Details",
						show: !0
					},
					{
						id: "attempts",
						label: `Attempts (${E?.length})`,
						show: D
					}
				].filter((e) => e.show).map((e) => /* @__PURE__ */ U("button", {
					type: "button",
					"data-testid": e.id === "attempts" ? "attempts-tab" : void 0,
					className: n("px-3.5 py-1.5 text-[11px] font-semibold bg-transparent border-none cursor-pointer font-inherit uppercase tracking-wide border-b-2", s === e.id ? "text-primary border-b-primary" : "text-text-tertiary border-b-transparent"),
					onClick: () => c(e.id),
					children: e.label
				}, e.id))
			}),
			/* @__PURE__ */ W("div", {
				className: "flex flex-1 min-h-0 overflow-hidden",
				children: [/* @__PURE__ */ U(ra, {
					snapshots: x,
					activeStepId: t,
					fallbackActiveStepId: C?.stepId,
					onStepSelect: r
				}), /* @__PURE__ */ U("div", {
					className: "flex-1 overflow-auto px-3.5 py-2.5 font-mono text-xs",
					children: C ? s === "input" ? /* @__PURE__ */ W("div", { children: [/* @__PURE__ */ W("div", {
						className: "flex items-center justify-between mb-2",
						children: [/* @__PURE__ */ W("div", {
							className: "text-[10px] text-code-muted font-semibold uppercase",
							children: ["Input context", C.stepId ? ` — step ${C.stepId.slice(0, 8)}` : ""]
						}), O && /* @__PURE__ */ W("div", {
							className: "flex gap-1.5 items-center",
							children: [d && Object.keys(p).length > 0 && /* @__PURE__ */ U("button", {
								type: "button",
								onClick: j,
								"data-testid": "context-inspector-discard",
								className: "px-2 py-0.5 text-[10px] font-semibold bg-transparent text-code-red border border-code-border rounded-sm cursor-pointer font-mono",
								children: "Discard changes"
							}), /* @__PURE__ */ U("button", {
								type: "button",
								onClick: () => {
									let e = !d;
									f(e), e || j();
								},
								"data-testid": "context-inspector-edit-toggle",
								className: n("px-2 py-0.5 text-[10px] font-semibold border rounded-sm cursor-pointer font-mono uppercase tracking-wide", d ? "bg-warning text-white border-warning" : "bg-transparent text-warning-fg border-warning"),
								children: d ? "Editing" : "Edit"
							})]
						})]
					}), Object.keys(C.inputContext).length === 0 && !(O && d) ? /* @__PURE__ */ U("div", {
						className: "text-code-muted text-xs italic",
						children: "No input context (first step or no upstream output)"
					}) : O && d ? /* @__PURE__ */ U(oa, {
						inputContext: C.inputContext,
						buffer: p,
						parseErrors: _,
						newKeyDraft: y,
						setNewKeyDraft: b,
						onCommitNewKey: M,
						onBeginEditKey: te,
						onSetValue: k,
						onRemoveKey: A,
						onParseError: ne
					}) : /* @__PURE__ */ U(na, {
						data: C.inputContext,
						highlightKeys: w
					})] }) : s === "output" ? /* @__PURE__ */ W("div", { children: [
						/* @__PURE__ */ W("div", {
							className: "mb-2 text-[10px] text-code-muted font-semibold uppercase",
							children: ["Output", C.stepId ? ` — step ${C.stepId.slice(0, 8)}` : ""]
						}),
						/* @__PURE__ */ U(na, { data: C.output }),
						C.newKeys.length > 0 && /* @__PURE__ */ W("div", {
							className: "mt-3",
							children: [/* @__PURE__ */ U("div", {
								className: "text-[10px] text-code-green font-semibold uppercase mb-1",
								children: "New context keys added"
							}), /* @__PURE__ */ U("div", {
								className: "flex flex-wrap gap-1",
								children: C.newKeys.map((e) => /* @__PURE__ */ U(S, {
									palette: "code",
									tone: "success",
									size: "sm",
									mono: !0,
									children: e
								}, e))
							})]
						})
					] }) : s === "prompt" ? /* @__PURE__ */ W("div", { children: [/* @__PURE__ */ U("div", {
						className: "mb-2 text-[10px] text-code-muted font-semibold uppercase",
						children: "Resolved prompt template"
					}), /* @__PURE__ */ U("div", {
						className: "px-3 py-2.5 bg-surface-inset border border-border rounded-md text-xs text-text-primary whitespace-pre-wrap break-words leading-relaxed max-h-60 overflow-y-auto",
						children: C.resolvedPrompt
					})] }) : s === "details" ? /* @__PURE__ */ W("div", { children: [/* @__PURE__ */ U("div", {
						className: "mb-2 text-[10px] text-code-muted font-semibold uppercase",
						children: "Step execution details"
					}), /* @__PURE__ */ W("div", {
						className: "flex flex-col gap-3",
						children: [
							C.stepExecution.startedAt && /* @__PURE__ */ W("div", { children: [/* @__PURE__ */ U("div", {
								className: "text-[11px] text-code-blue font-semibold mb-1",
								children: "Duration"
							}), /* @__PURE__ */ W("div", {
								className: "text-[11px] text-code-text",
								children: [
									"Started: ",
									C.stepExecution.startedAt,
									C.stepExecution.completedAt && /* @__PURE__ */ W(H, { children: [
										/* @__PURE__ */ U("br", {}),
										"Completed: ",
										C.stepExecution.completedAt,
										C.stepExecution.durationMs != null && /* @__PURE__ */ W(H, { children: [
											/* @__PURE__ */ U("br", {}),
											"Duration: ",
											C.stepExecution.durationMs,
											"ms"
										] })
									] })
								]
							})] }),
							C.stepExecution.llm && /* @__PURE__ */ W("div", { children: [
								/* @__PURE__ */ U("div", {
									className: "text-[11px] text-code-blue font-semibold mb-1",
									children: "LLM Metrics"
								}),
								/* @__PURE__ */ W("div", {
									className: "text-[11px] text-code-text",
									children: [
										"Tokens in: ",
										C.stepExecution.llm.tokensIn,
										/* @__PURE__ */ U("br", {}),
										"Tokens out: ",
										C.stepExecution.llm.tokensOut,
										C.stepExecution.llm.firstTokenLatencyMs != null && /* @__PURE__ */ W(H, { children: [
											/* @__PURE__ */ U("br", {}),
											"First token latency: ",
											C.stepExecution.llm.firstTokenLatencyMs,
											"ms"
										] })
									]
								}),
								C.stepExecution.llm.response && /* @__PURE__ */ W(H, { children: [/* @__PURE__ */ U("div", {
									className: "text-[11px] text-code-blue font-semibold mt-2 mb-1",
									children: "Response Text"
								}), /* @__PURE__ */ U("div", {
									className: "px-3 py-2.5 bg-surface-inset border border-border rounded-md text-xs text-text-primary whitespace-pre-wrap break-words leading-relaxed max-h-60 overflow-y-auto",
									children: C.stepExecution.llm.response
								})] })
							] }),
							C.stepExecution.error && /* @__PURE__ */ W("div", { children: [/* @__PURE__ */ U("div", {
								className: "text-[11px] text-code-red font-semibold mb-1",
								children: "Error"
							}), /* @__PURE__ */ U("div", {
								className: "px-3 py-2.5 bg-code-surface border border-code-red rounded-md text-xs text-text-primary whitespace-pre-wrap break-words leading-relaxed max-h-60 overflow-y-auto",
								children: /* @__PURE__ */ U("div", {
									className: "text-code-red font-semibold mb-1",
									children: C.stepExecution.error
								})
							})] }),
							C.stepExecution.approvals && C.stepExecution.approvals.length > 0 && /* @__PURE__ */ W("div", { children: [/* @__PURE__ */ W("div", {
								className: "text-[11px] text-code-blue font-semibold mb-1",
								children: [
									"Approvals (",
									C.stepExecution.approvals.length,
									")"
								]
							}), C.stepExecution.approvals.map((e, t) => /* @__PURE__ */ W("div", {
								className: "px-3 py-2.5 bg-surface-inset border border-border rounded-md text-xs text-text-primary whitespace-pre-wrap break-words leading-relaxed max-h-60 overflow-y-auto mb-2",
								children: [
									/* @__PURE__ */ W("div", {
										className: "flex gap-2 mb-1",
										children: [/* @__PURE__ */ U(S, {
											palette: "code",
											tone: e.decision === "approve" ? "success" : "danger",
											size: "xs",
											children: e.decision.toUpperCase()
										}), /* @__PURE__ */ U("span", {
											className: "text-[11px] text-code-text",
											children: e.userId
										})]
									}),
									e.comment && /* @__PURE__ */ W("div", {
										className: "text-[11px] text-code-comment italic",
										children: [
											"\"",
											e.comment,
											"\""
										]
									}),
									/* @__PURE__ */ U("div", {
										className: "text-[10px] text-code-muted mt-1",
										children: e.at
									})
								]
							}, t))] }),
							/* @__PURE__ */ W("div", { children: [/* @__PURE__ */ U("div", {
								className: "text-[11px] text-code-blue font-semibold mb-1",
								children: "Status"
							}), /* @__PURE__ */ U("div", {
								className: "text-[11px] text-code-text",
								children: C.stepExecution.status
							})] })
						]
					})] }) : s === "attempts" && E && E.length >= 2 ? /* @__PURE__ */ W("div", { children: [/* @__PURE__ */ W("div", {
						className: "flex items-center gap-2 mb-3",
						children: [
							/* @__PURE__ */ U("button", {
								type: "button",
								"data-testid": "attempts-prev",
								disabled: l === 0,
								onClick: () => u((e) => e - 1),
								className: n("px-2 py-0.5 text-[11px] bg-transparent border border-code-border rounded-sm font-mono", l === 0 ? "text-code-raised cursor-not-allowed" : "text-code-text cursor-pointer"),
								children: "←"
							}),
							/* @__PURE__ */ W("span", {
								"data-testid": "attempts-label",
								className: "text-[11px] text-code-comment flex-1 text-center",
								children: [
									"Attempt ",
									l + 1,
									" vs ",
									l + 2,
									" of ",
									E.length
								]
							}),
							/* @__PURE__ */ U("button", {
								type: "button",
								"data-testid": "attempts-next",
								disabled: l >= E.length - 2,
								onClick: () => u((e) => e + 1),
								className: n("px-2 py-0.5 text-[11px] bg-transparent border border-code-border rounded-sm font-mono", l >= E.length - 2 ? "text-code-raised cursor-not-allowed" : "text-code-text cursor-pointer"),
								children: "→"
							})
						]
					}), /* @__PURE__ */ W("div", {
						className: "grid grid-cols-2 gap-2.5",
						children: [/* @__PURE__ */ U(da, {
							attempt: E[l],
							label: `Attempt ${l + 1}`
						}), /* @__PURE__ */ U(da, {
							attempt: E[l + 1],
							label: `Attempt ${l + 2}`
						})]
					})] }) : null : /* @__PURE__ */ U("div", {
						className: "flex items-center justify-center h-full text-text-tertiary text-xs italic",
						children: "Select a step to inspect"
					})
				})]
			})
		]
	});
}
//#endregion
//#region src/components/pipelines/editor/BreakpointPauseOverlay.tsx
function pa({ definition: e, pausedBreakpoint: t, applyingPatch: r, revertingPatchId: i, dirtyPatch: a, dirtyPatchStepId: o, resetEditBufferKey: s, onContinue: c, onStepOver: l, onResumeAll: u, onApplyAndContinue: d, onRevertPatch: f, onEditBufferChange: p }) {
	let m = $e().runs[t.runId] ?? null, h = m?.steps?.[t.stepId]?.patches ?? [], g = !!a && o === t.stepId && Object.keys(a).length > 0, _ = m?.status === "paused_at_breakpoint";
	return /* @__PURE__ */ W("div", {
		"data-testid": "breakpoint-pause-overlay",
		className: n("absolute top-14 left-1/2 -translate-x-1/2 z-30", "bg-surface border-2 border-warning rounded-lg", "px-4 py-3 shadow-[0_8px_24px_rgba(217,119,6,0.2)]", "flex flex-col gap-3 font-inherit", "w-[min(900px,92vw)] max-h-[calc(100vh-120px)]"),
		children: [/* @__PURE__ */ W("div", {
			className: "flex items-center gap-3 flex-wrap",
			children: [
				/* @__PURE__ */ W("span", {
					className: "text-[13px] font-semibold text-warning-fg",
					children: ["Paused at: ", qi(e, t.stepId)]
				}),
				g && /* @__PURE__ */ U("button", {
					type: "button",
					onClick: d,
					disabled: r,
					"data-testid": "breakpoint-apply-continue-btn",
					className: n("px-3 py-1 text-xs font-semibold bg-success-bg text-text-primary", "border-none rounded cursor-pointer font-inherit", r && "cursor-wait opacity-70"),
					children: r ? "Applying…" : "Apply & Continue"
				}),
				/* @__PURE__ */ U("button", {
					type: "button",
					onClick: c,
					disabled: r,
					className: n("px-3 py-1 text-xs font-semibold bg-warning text-white", "border-none rounded font-inherit", r ? "cursor-not-allowed opacity-60" : "cursor-pointer"),
					"data-testid": "breakpoint-continue-btn",
					children: "Continue"
				}),
				/* @__PURE__ */ U("button", {
					type: "button",
					onClick: l,
					disabled: r,
					className: n("px-3 py-1 text-xs font-semibold bg-transparent text-warning-fg", "border border-warning rounded font-inherit", r ? "cursor-not-allowed opacity-60" : "cursor-pointer"),
					"data-testid": "breakpoint-step-over-btn",
					children: "Step Over"
				}),
				/* @__PURE__ */ U("button", {
					type: "button",
					onClick: u,
					disabled: r,
					className: n("px-3 py-1 text-xs font-semibold bg-transparent text-warning-fg", "border border-warning rounded font-inherit", r ? "cursor-not-allowed opacity-60" : "cursor-pointer"),
					"data-testid": "breakpoint-resume-all-btn",
					children: "Resume All"
				})
			]
		}), /* @__PURE__ */ W("div", {
			className: "grid [grid-template-columns:minmax(0,1fr)_240px] gap-3 min-h-[280px] max-h-[calc(100vh-220px)]",
			children: [/* @__PURE__ */ U("div", {
				className: "border border-border rounded-md bg-surface-inset overflow-hidden min-h-0",
				children: m ? /* @__PURE__ */ U(fa, {
					run: m,
					activeStepId: t.stepId,
					editable: !0,
					onEditBufferChange: p,
					resetEditBufferKey: s
				}) : /* @__PURE__ */ U("div", {
					className: "p-3 text-xs text-text-tertiary",
					children: "Loading run…"
				})
			}), /* @__PURE__ */ W("div", {
				"data-testid": "breakpoint-patch-history",
				className: "border border-border rounded-md bg-surface-inset p-2.5 overflow-auto min-h-0",
				children: [/* @__PURE__ */ W("div", {
					className: "text-[10px] font-bold text-text-primary tracking-wide uppercase mb-2",
					children: [
						"Patch history (",
						h.length,
						")"
					]
				}), h.length === 0 ? /* @__PURE__ */ U("div", {
					className: "text-[11px] text-text-tertiary italic",
					"data-testid": "breakpoint-patch-history-empty",
					children: "No patches applied yet."
				}) : /* @__PURE__ */ U("div", {
					className: "flex flex-col gap-2",
					children: h.map((e) => {
						let t = !!e.revertedAt;
						return /* @__PURE__ */ W("div", {
							"data-testid": `breakpoint-patch-row-${e.patchId}`,
							className: n("border border-border rounded p-1.5", t ? "bg-neutral/10 opacity-60" : "bg-code-bg"),
							children: [
								/* @__PURE__ */ W("div", {
									className: "flex items-center gap-1 text-[10px] text-code-text mb-0.5",
									children: [
										/* @__PURE__ */ U("span", {
											className: "font-mono",
											children: e.patchId.slice(0, 8)
										}),
										e.unvalidated && /* @__PURE__ */ U("span", {
											"data-testid": `breakpoint-patch-unvalidated-${e.patchId}`,
											title: "No validator was registered for this step's node type",
											className: "px-1 text-[9px] font-bold bg-caution-bg/15 text-caution-fg rounded-sm",
											children: "⚠ Unvalidated"
										}),
										t && /* @__PURE__ */ U("span", {
											className: "px-1 text-[9px] font-bold bg-neutral/20 text-text-tertiary rounded-sm",
											children: "Reverted"
										})
									]
								}),
								/* @__PURE__ */ W("div", {
									className: "text-[10px] text-code-comment",
									children: [e.appliedAt, e.appliedBy && /* @__PURE__ */ W(H, { children: [" · ", /* @__PURE__ */ U("span", {
										className: "text-code-text",
										children: e.appliedBy
									})] })]
								}),
								!t && /* @__PURE__ */ U("button", {
									type: "button",
									"data-testid": `breakpoint-patch-revert-${e.patchId}`,
									onClick: () => f(e.patchId),
									disabled: !_ || i === e.patchId,
									title: _ ? "Revert this patch" : "Run has progressed past this breakpoint — revert no longer allowed",
									className: n("mt-1 px-2 py-0.5 text-[10px] font-semibold bg-transparent rounded-sm font-inherit", _ ? "text-danger-fg border border-danger cursor-pointer" : "text-text-primary border border-border-emphasis cursor-not-allowed", i === e.patchId && "cursor-not-allowed"),
									children: i === e.patchId ? "Reverting…" : "Revert"
								})
							]
						}, e.patchId);
					})
				})]
			})]
		})]
	});
}
//#endregion
//#region src/components/pipelines/utils/formatTime.ts
function ma(e) {
	return e == null ? "--" : e < 1e3 ? `${Math.round(e)}ms` : e < 6e4 ? `${(e / 1e3).toFixed(1)}s` : `${Math.floor(e / 6e4)}m ${Math.floor(e % 6e4 / 1e3)}s`;
}
function ha(e) {
	if (!e) return "--";
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? "--" : new Intl.DateTimeFormat(void 0, {
		month: "short",
		day: "numeric",
		hour: "numeric",
		minute: "2-digit"
	}).format(t);
}
function ga(e) {
	let t = Date.now() - new Date(e).getTime();
	return t < 6e4 ? "just now" : t < 36e5 ? `${Math.floor(t / 6e4)}m ago` : t < 864e5 ? `${Math.floor(t / 36e5)}h ago` : t < 2592e5 ? `${Math.floor(t / 864e5)}d ago` : new Date(e).toLocaleDateString();
}
//#endregion
//#region src/components/pipelines/nodes/shared/ConfigField.tsx
function X({ label: e, required: t, help: r, error: i, controlId: a, render: o, children: s, className: c }) {
	let l = ut(), u = `${l}-label`, d = i || r ? `${l}-desc` : void 0;
	return /* @__PURE__ */ W("div", {
		className: n("flex flex-col", c),
		children: [
			/* @__PURE__ */ W("label", {
				id: u,
				htmlFor: a,
				className: "text-xs font-semibold text-text-secondary",
				children: [e, t && /* @__PURE__ */ U("span", {
					className: "text-danger-fg ml-1",
					"aria-hidden": "true",
					children: "●"
				})]
			}),
			/* @__PURE__ */ U("div", {
				className: "mt-1",
				children: o ? o({
					describedById: d,
					controlId: a,
					labelId: u
				}) : s
			}),
			i && /* @__PURE__ */ U("div", {
				id: d,
				role: "alert",
				className: "text-[11px] text-danger-fg mt-0.5",
				children: i
			}),
			!i && r && /* @__PURE__ */ U("div", {
				id: d,
				className: "text-[11px] text-text-tertiary mt-0.5",
				children: r
			})
		]
	});
}
//#endregion
//#region src/components/pipelines/nodes/shared/ConfigSection.tsx
function _a({ title: e, defaultCollapsed: t = !1, children: r, className: i }) {
	let [a, o] = V(t);
	return /* @__PURE__ */ W("div", {
		className: n("flex flex-col", i),
		children: [/* @__PURE__ */ W("button", {
			type: "button",
			onClick: () => o((e) => !e),
			className: "flex items-center gap-1 bg-transparent border-none p-0 cursor-pointer font-inherit text-xs font-semibold text-text-secondary",
			children: [
				/* @__PURE__ */ U("span", { children: a ? "▸" : "▾" }),
				" ",
				e
			]
		}), !a && /* @__PURE__ */ U("div", {
			className: "flex flex-col gap-3 mt-2",
			children: r
		})]
	});
}
//#endregion
//#region src/components/pipelines/nodes/shared/NodeConfigShell.tsx
function va({ children: e, className: t }) {
	return /* @__PURE__ */ U("div", {
		className: n("flex flex-col gap-3 px-4 py-3", t),
		children: e
	});
}
//#endregion
//#region src/components/pipelines/nodes/shared/SamplePills.tsx
function ya({ samples: e, onSelect: t, "aria-label": r = "Suggestions", className: i }) {
	return e.length === 0 ? null : /* @__PURE__ */ U("div", {
		className: n("mt-1.5 flex flex-wrap gap-1", i),
		role: "group",
		"aria-label": r,
		"data-testid": "sample-pills",
		children: e.map((e) => /* @__PURE__ */ U("button", {
			type: "button",
			onClick: () => t(e),
			className: "text-[10px] font-mono bg-surface-inset border border-border text-text-secondary rounded px-1.5 py-0.5 cursor-pointer hover:bg-surface-hover",
			children: e
		}, e))
	});
}
//#endregion
//#region src/components/pipelines/context/upstreamContext.ts
function ba(e) {
	let t = e.data ?? {}, n = `${typeof t.label == "string" && t.label ? t.label : e.type} (${e.type})`, r = (t, r, i) => ({
		path: t,
		source: n,
		sourceNodeId: e.id,
		description: r,
		kind: i
	}), i = typeof t.outputKey == "string" && t.outputKey ? t.outputKey : null, a = i ? `context.${i}` : `context.steps.${e.id}.output`;
	switch (e.type) {
		case "trigger": return [
			r("context.trigger", "The full trigger payload.", "object"),
			r("context.trigger.userId", "Who initiated the run.", "string"),
			r("context.trigger.imageRef", "Image supplied with the trigger, if any.", "image")
		];
		case "llm": return [r(a, "Model completion text.", "string"), r(`context.steps.${e.id}.usage`, "Token usage for this call.", "object")];
		case "transform": return [r(a, "Result of the transform expression.", "object")];
		case "action": return [r(a, "Response returned by the action.", "object")];
		case "memory": return t.mode === "write" ? [
			r(a, "Result of the memory write.", "object"),
			r(`${a}.written`, "Whether the value was persisted.", "boolean"),
			r(`${a}.key`, "The resolved key that was written.", "string")
		] : [
			r(a, "Result of the memory read.", "object"),
			r(`${a}.value`, "The recalled value, or null on a miss.", "object"),
			r(`${a}.found`, "Whether a record existed for the key.", "boolean"),
			r(`${a}.key`, "The resolved key that was read.", "string")
		];
		case "scatter": return [r(`context.steps.${e.id}.items`, "The fanned-out items.", "array"), r(`context.steps.${e.id}.index`, "Index of the current item.", "number")];
		case "condition": return [r(`context.steps.${e.id}.matched`, "Whether the condition passed.", "boolean")];
		case "image-source":
		case "image:generate":
		case "image:variation":
		case "image:edit-prompt":
		case "image:resize":
		case "image:transform":
		case "image:format-convert":
		case "image:sharpen":
		case "image:watermark":
		case "image:crop":
		case "image:adjust-bw":
		case "image:adjust-layer":
		case "image:upscale":
		case "image:save": return [r(`context.steps.${e.id}.imageRef`, "Image produced by this step.", "image")];
		case "image:dimensions": return [r(`context.steps.${e.id}.width`, "Image width in pixels.", "number"), r(`context.steps.${e.id}.height`, "Image height in pixels.", "number")];
		case "image:vision-analyze":
		case "image:vision-classify":
		case "image:vision-describe":
		case "image:vision-tag":
		case "image:vision-extract-text": return [r(a, "Structured vision result, shaped by the output schema.", "object"), r(`context.steps.${e.id}.usage`, "Token usage for the vision call.", "object")];
		default: return [r(a, "Output of this step.", "object")];
	}
}
function xa(e, t) {
	let n = /* @__PURE__ */ new Map();
	for (let t of e) {
		let e = n.get(t.target);
		e ? e.push(t.source) : n.set(t.target, [t.source]);
	}
	let r = [], i = /* @__PURE__ */ new Set([t]), a = n.get(t) ?? [];
	for (; a.length;) {
		let e = [];
		for (let t of a) i.has(t) || (i.add(t), r.push(t), e.push(...n.get(t) ?? []));
		a = e;
	}
	return r;
}
function Sa(e, t, n) {
	let r = new Map(e.map((e) => [e.id, e])), i = [], a = /* @__PURE__ */ new Set(), o = (e) => {
		a.has(e.path) || (a.add(e.path), i.push(e));
	};
	for (let e of xa(t, n)) {
		let t = r.get(e);
		t && ba(t).forEach(o);
	}
	if (!a.has("context.trigger")) {
		let t = e.find((e) => e.type === "trigger");
		t && ba(t).forEach(o);
	}
	return i;
}
function Ca(e, t) {
	let n = new Set(t.map((e) => e.path)), r = /* @__PURE__ */ new Set();
	for (let t of e.matchAll(/\{\{\s*([\w.[\]-]+)\s*\}\}/g)) r.add(t[1]);
	return [...r].filter((e) => !n.has(e) && ![...n].some((t) => e.startsWith(`${t}.`)));
}
var wa = /* @__PURE__ */ new Set([
	"image-source",
	"image:generate",
	"image:variation",
	"image:edit-prompt",
	"image:resize",
	"image:transform",
	"image:format-convert",
	"image:sharpen",
	"image:watermark",
	"image:crop",
	"image:adjust-bw",
	"image:adjust-layer",
	"image:upscale",
	"image:save"
]);
function Ta(e, t, n) {
	let r = new Map(e.map((e) => [e.id, e])), i = [], a = /* @__PURE__ */ new Set(), o = (e) => {
		a.has(e.path) || (a.add(e.path), i.push(e));
	};
	for (let e of xa(t, n)) {
		let t = r.get(e);
		if (!t || !wa.has(t.type)) continue;
		let n = t.data ?? {}, i = typeof n.label == "string" && n.label ? n.label : t.type;
		o({
			path: `$.steps.${t.id}.output.imageId`,
			source: `${i} (${t.type})`,
			sourceNodeId: t.id
		});
	}
	let s = e.find((e) => e.type === "trigger");
	o({
		path: "$.trigger.imageRef",
		source: s ? "Trigger payload" : "Trigger payload (no trigger node yet)",
		sourceNodeId: s?.id ?? ""
	});
	for (let e of xa(t, n)) if (r.get(e)?.type === "scatter") {
		o({
			path: "$.scatter.parentImageId",
			source: "Scatter (parent image)",
			sourceNodeId: e
		});
		break;
	}
	return i;
}
//#endregion
//#region src/components/pipelines/context/useUpstreamContext.ts
function Ea(e) {
	let t = lt(ye)?.definition ?? null, n = t?.nodes ?? [], r = t?.edges ?? [], i = z(() => e ? Sa(n, r, e) : [], [
		n,
		r,
		e
	]);
	return z(() => ({
		paths: i,
		unresolved: (e) => Ca(e, i)
	}), [i]);
}
function Da(e) {
	let t = lt(ye)?.definition ?? null, n = t?.nodes ?? [], r = t?.edges ?? [];
	return z(() => e ? Ta(n, r, e) : [], [
		n,
		r,
		e
	]);
}
//#endregion
//#region src/components/pipelines/nodes/shared/SourceImagePathField.tsx
function Oa({ value: e, onChange: t, nodeId: n, label: r = "Source image path", help: i = "Optional. Defaults to the image produced upstream.", placeholder: a = "$.trigger.imageRef" }) {
	let o = Da(n ?? null), s = ut();
	return /* @__PURE__ */ U(X, {
		label: r,
		help: i,
		controlId: s,
		render: ({ describedById: n, controlId: r }) => /* @__PURE__ */ W(H, { children: [/* @__PURE__ */ U(k, {
			id: r,
			"aria-describedby": n,
			size: "sm",
			mono: !0,
			spellCheck: !1,
			value: e ?? "",
			onChange: (e) => t(e.target.value.trim() || void 0),
			placeholder: a
		}), /* @__PURE__ */ U(ya, {
			samples: o.map((e) => e.path),
			onSelect: t,
			"aria-label": "Upstream image refs"
		})] })
	});
}
//#endregion
//#region src/components/pipelines/nodes/shared/ToggleField.tsx
function ka({ label: e, checked: t, onChange: n, help: r, disabled: i, "data-testid": a }) {
	return /* @__PURE__ */ W("div", {
		className: "flex flex-col",
		children: [/* @__PURE__ */ W("div", {
			className: "flex items-center gap-2",
			children: [/* @__PURE__ */ U(O, {
				size: "sm",
				checked: t,
				onChange: n,
				disabled: i,
				"aria-label": e,
				"data-testid": a
			}), /* @__PURE__ */ U("span", {
				className: "text-xs font-semibold text-text-secondary",
				children: e
			})]
		}), r && /* @__PURE__ */ U("div", {
			className: "text-[11px] text-text-tertiary mt-0.5",
			children: r
		})]
	});
}
//#endregion
//#region src/components/pipelines/cron/cronUtils.ts
var Aa = [
	{
		name: "minute",
		min: 0,
		max: 59
	},
	{
		name: "hour",
		min: 0,
		max: 23
	},
	{
		name: "dayOfMonth",
		min: 1,
		max: 31
	},
	{
		name: "month",
		min: 1,
		max: 12
	},
	{
		name: "dayOfWeek",
		min: 0,
		max: 6
	}
];
function ja(e, t, n) {
	let r = e.trim();
	if (r === "") return null;
	let i = /^\*\/(\d+)$/.exec(r);
	if (i) {
		let e = Number(i[1]);
		return !Number.isFinite(e) || e <= 0 ? null : {
			match: "*",
			step: e
		};
	}
	if (r === "*") return { match: "*" };
	let a = /^(\d+)-(\d+)$/.exec(r);
	if (a) {
		let e = Number(a[1]), r = Number(a[2]);
		if (!Number.isFinite(e) || !Number.isFinite(r) || e < t || r > n || e > r) return null;
		let i = [];
		for (let t = e; t <= r; t++) i.push(t);
		return { match: i };
	}
	if (r.includes(",")) {
		let e = r.split(","), i = /* @__PURE__ */ new Set(), a = [];
		for (let r of e) {
			let e = Number(r.trim());
			if (!Number.isFinite(e) || !Number.isInteger(e) || e < t || e > n) return null;
			i.has(e) || (i.add(e), a.push(e));
		}
		return a.length === 0 ? null : { match: a };
	}
	let o = Number(r);
	return !Number.isFinite(o) || !Number.isInteger(o) || o < t || o > n ? null : { match: [o] };
}
function Ma(e) {
	if (typeof e != "string") return null;
	let t = e.trim().split(/\s+/);
	if (t.length !== 5) return null;
	let n = {};
	for (let e = 0; e < 5; e++) {
		let r = Aa[e], i = ja(t[e], r.min, r.max);
		if (!i) return null;
		n[r.name] = i;
	}
	return n;
}
function Na(e, t, n) {
	return e.match === "*" ? !e.step || e.step === 1 || (t - n) % e.step === 0 : e.match.includes(t);
}
function Pa(e, t) {
	return Na(e.minute, t.getMinutes(), 0) && Na(e.hour, t.getHours(), 0) && Na(e.dayOfMonth, t.getDate(), 1) && Na(e.month, t.getMonth() + 1, 1) && Na(e.dayOfWeek, t.getDay(), 0);
}
function Fa(e, t, n) {
	if (n <= 0) return [];
	let r = [], i = new Date(t.getTime());
	i.setSeconds(0, 0), i.setMinutes(i.getMinutes() + 1);
	let a = new Date(i.getTime());
	for (let t = 0; t < 527040 && r.length < n; t++) Pa(e, a) && r.push(new Date(a.getTime())), a.setMinutes(a.getMinutes() + 1);
	return r;
}
//#endregion
//#region src/components/pipelines/nodes/trigger/TriggerConfig.tsx
var Ia = /^[a-zA-Z0-9_-]{1,64}$/, La = "http://localhost:13001";
function Ra() {
	try {
		let e = localStorage.getItem("ws_document_types_v1");
		if (!e) return [];
		let t = JSON.parse(e);
		return Array.isArray(t) ? t.filter((e) => typeof e == "object" && !!e).filter((e) => typeof e.id == "string" && typeof e.name == "string").map((e) => ({
			id: e.id,
			name: e.name
		})) : [];
	} catch {
		return [];
	}
}
var za = [
	{
		value: "manual",
		label: "Manual"
	},
	{
		value: "document.finalize",
		label: "Document finalize"
	},
	{
		value: "document.submit",
		label: "Document submit"
	},
	{
		value: "document.comment",
		label: "Document comment"
	},
	{
		value: "schedule",
		label: "Schedule"
	},
	{
		value: "webhook",
		label: "Webhook"
	}
];
function Ba({ data: e, onChange: t }) {
	let n = ut(), { toast: i } = r(), a = lt(ye)?.definition?.triggerBinding?.webhookSecret, [o, s] = V(!1), c = Be(), l = c.enabled, u = c.publicUrlBase ?? La, d = e.triggerType.startsWith("document."), f = z(() => d ? Ra() : [], [d]), p = d && !e.documentTypeId, m = e.triggerType === "schedule" && !e.schedule, h = e.triggerType === "webhook" && !e.webhookPath, g = e.webhookPath ?? "", _ = e.triggerType === "webhook" && g.length > 0 && !Ia.test(g), v = e.triggerType === "webhook" && Ia.test(g) ? `${u}/hooks/pipeline/${g}` : null, b = () => {
		v && navigator.clipboard.writeText(v).then(() => i("Webhook URL copied", { type: "success" })).catch(() => i("Could not copy webhook URL", { type: "error" }));
	}, x = () => {
		a && navigator.clipboard.writeText(a).then(() => i("Webhook secret copied", { type: "success" })).catch(() => i("Could not copy webhook secret", { type: "error" }));
	}, S = e.triggerType === "schedule" ? e.schedule ?? "" : "", C = z(() => S ? Ma(S) : null, [S]), w = z(() => C ? Fa(C, /* @__PURE__ */ new Date(), 3) : [], [C]), T = e.triggerType === "schedule" && !!S && !C, E = e.triggerType === "document.finalize" ? "On finalize" : e.triggerType === "document.submit" ? "On submit for review" : e.triggerType === "document.comment" ? "On comment added" : "";
	return /* @__PURE__ */ W(va, { children: [
		/* @__PURE__ */ U(X, {
			label: "Trigger type",
			required: !0,
			controlId: `${n}-trigger-type`,
			render: ({ controlId: n, describedById: r }) => /* @__PURE__ */ U(j, {
				size: "sm",
				id: n,
				"aria-describedby": r,
				value: e.triggerType,
				onChange: (e) => t({ triggerType: e.target.value }),
				options: za
			})
		}),
		d && /* @__PURE__ */ U(X, {
			label: "Document type",
			required: !0,
			error: p ? "Select a document type." : void 0,
			help: p ? void 0 : "Which document type should trigger this pipeline.",
			controlId: `${n}-document-type`,
			render: ({ controlId: n, describedById: r }) => /* @__PURE__ */ W(H, { children: [/* @__PURE__ */ U(j, {
				size: "sm",
				invalid: p,
				id: n,
				"aria-describedby": r,
				value: e.documentTypeId ?? "",
				onChange: (e) => t({ documentTypeId: e.target.value || void 0 }),
				options: [{
					value: "",
					label: "— select a document type —"
				}, ...f.map((e) => ({
					value: e.id,
					label: e.name
				}))]
			}), E && /* @__PURE__ */ W("div", {
				className: "text-[11px] text-text-tertiary mt-1.5",
				children: ["Event: ", /* @__PURE__ */ U("span", {
					className: "font-semibold text-text-secondary",
					children: E
				})]
			})] })
		}),
		e.triggerType === "schedule" && /* @__PURE__ */ U(X, {
			label: "Schedule (cron)",
			required: !0,
			error: m ? "Cron expression is required." : T ? "Invalid cron expression — supports *, */N, N,M, A-B, exact values." : void 0,
			help: !m && !T ? "5-field cron: minute hour day month weekday." : void 0,
			controlId: `${n}-schedule`,
			render: ({ controlId: n, describedById: r }) => /* @__PURE__ */ W(H, { children: [/* @__PURE__ */ U(k, {
				size: "sm",
				mono: !0,
				spellCheck: !1,
				invalid: m || T,
				placeholder: "*/15 * * * *",
				id: n,
				"aria-describedby": r,
				value: e.schedule ?? "",
				onChange: (e) => t({ schedule: e.target.value })
			}), /* @__PURE__ */ U("div", {
				className: "mt-2 p-2 bg-surface-inset border border-dashed border-border rounded-md text-[11px] text-text-tertiary font-mono",
				children: w.length > 0 ? /* @__PURE__ */ W(H, { children: [/* @__PURE__ */ U("div", {
					className: "text-text-secondary mb-1",
					children: "Next 3 fires:"
				}), w.map((e, t) => /* @__PURE__ */ U("div", { children: e.toLocaleString() }, t))] }) : /* @__PURE__ */ U("span", { children: "Next fires: enter a valid cron expression to preview." })
			})] })
		}),
		e.triggerType === "webhook" && /* @__PURE__ */ W("div", {
			className: "flex flex-col gap-3",
			children: [
				/* @__PURE__ */ U(X, {
					label: "Path",
					required: !0,
					error: h ? "Webhook path is required." : _ ? "Path must be alphanumeric (plus _, -)" : void 0,
					help: !h && !_ ? "Alphanumeric, _, or - (max 64 chars). No leading slash." : void 0,
					controlId: `${n}-webhook-path`,
					render: ({ controlId: e, describedById: n }) => /* @__PURE__ */ U(k, {
						size: "sm",
						mono: !0,
						spellCheck: !1,
						invalid: h || _,
						placeholder: "weekly-digest",
						id: e,
						"aria-describedby": n,
						value: g,
						onChange: (e) => t({ webhookPath: e.target.value })
					})
				}),
				!l && /* @__PURE__ */ U(y, {
					variant: "warning",
					title: "Endpoint not active.",
					"data-testid": "webhook-relay-inactive",
					children: "This deployment has not declared an inbound webhook relay, so a POST to this path is accepted and starts no run. The path is still saved with the pipeline; the delivery URL and signing secret appear once the host wires the relay."
				}),
				l && /* @__PURE__ */ U("div", {
					className: "p-2 bg-surface-inset border border-dashed border-border rounded-md text-[11px] text-text-secondary font-mono break-all flex items-center gap-2",
					children: v ? /* @__PURE__ */ W(H, { children: [/* @__PURE__ */ W("span", {
						className: "flex-1",
						children: [/* @__PURE__ */ U("span", {
							className: "font-sans text-text-tertiary mr-1",
							children: "Full URL:"
						}), v]
					}), /* @__PURE__ */ U("button", {
						type: "button",
						onClick: b,
						className: "text-[11px] px-2 py-0.5 border border-border rounded bg-transparent text-text-secondary cursor-pointer font-sans",
						children: "Copy"
					})] }) : /* @__PURE__ */ U("span", {
						className: "font-sans text-text-tertiary",
						children: "Set a path above to see the URL"
					})
				}),
				l && /* @__PURE__ */ W("div", { children: [
					/* @__PURE__ */ U("label", {
						className: "text-xs font-semibold text-text-secondary",
						children: "Signing secret"
					}),
					/* @__PURE__ */ U("div", {
						className: "mt-1 p-2 bg-surface-inset border border-dashed border-border rounded-md text-[11px] text-text-secondary font-mono break-all flex items-center gap-2",
						children: a ? /* @__PURE__ */ W(H, { children: [
							/* @__PURE__ */ U("span", {
								className: "flex-1",
								"aria-label": "webhook secret",
								children: o ? a : "•".repeat(32)
							}),
							/* @__PURE__ */ U("button", {
								type: "button",
								onClick: () => s((e) => !e),
								className: "text-[11px] px-2 py-0.5 border border-border rounded bg-transparent text-text-secondary cursor-pointer font-sans",
								children: o ? "Hide" : "Reveal"
							}),
							/* @__PURE__ */ U("button", {
								type: "button",
								onClick: x,
								className: "text-[11px] px-2 py-0.5 border border-border rounded bg-transparent text-text-secondary cursor-pointer font-sans",
								children: "Copy"
							})
						] }) : /* @__PURE__ */ W("span", {
							className: "font-sans text-text-tertiary",
							children: [
								"Save the pipeline to mint a signing secret. External callers must send ",
								/* @__PURE__ */ U("code", { children: "X-Pipeline-Signature-256: sha256=<hmac>" }),
								"."
							]
						})
					}),
					/* @__PURE__ */ W("div", {
						className: "text-[11px] text-text-tertiary mt-0.5",
						children: [
							"HMAC-SHA256 of the raw request body. Send as",
							" ",
							/* @__PURE__ */ U("code", { children: "X-Pipeline-Signature-256: sha256=<hex>" }),
							"."
						]
					})
				] })
			]
		})
	] });
}
//#endregion
//#region src/components/pipelines/nodes/RetryPolicyEditor.tsx
var Va = {
	maxAttempts: 3,
	backoffMs: 1e3,
	backoffMultiplier: 2
}, Ha = 3e4;
function Ua(e) {
	return e < 1e3 ? `${Math.round(e)}ms` : e < 6e4 ? `${(e / 1e3).toFixed(+(e < 1e4))}s` : `${Math.round(e / 6e4)}m`;
}
function Wa(e) {
	let t = [];
	for (let n = 1; n < e.maxAttempts; n++) {
		let r = e.backoffMs * e.backoffMultiplier ** (n - 1);
		t.push(Math.min(r, Ha));
	}
	return t;
}
function Ga({ value: e, onChange: t }) {
	let n = e !== void 0, r = e ?? Va, i = n ? Wa(r) : [], a = i.reduce((e, t) => e + t, 0) > 3e5;
	return /* @__PURE__ */ W("div", {
		"data-testid": "retry-policy-editor",
		className: "flex flex-col gap-1.5",
		children: [/* @__PURE__ */ U(ka, {
			label: "Retry policy",
			checked: n,
			onChange: (e) => t(e ? Va : void 0),
			help: n ? void 0 : "No retries — failure is terminal on first attempt.",
			"data-testid": "retry-policy-enabled"
		}), n && /* @__PURE__ */ W(H, { children: [
			/* @__PURE__ */ W("div", {
				className: "grid grid-cols-3 gap-2 mt-1",
				children: [
					/* @__PURE__ */ W("div", { children: [/* @__PURE__ */ U("label", {
						className: "text-[11px] font-semibold text-text-secondary",
						children: "Max attempts"
					}), /* @__PURE__ */ U(M, {
						size: "sm",
						min: 1,
						max: 10,
						step: 1,
						value: r.maxAttempts,
						onChange: (e) => t({
							...r,
							maxAttempts: e
						}),
						"aria-label": "Max attempts"
					})] }),
					/* @__PURE__ */ W("div", { children: [/* @__PURE__ */ U("label", {
						className: "text-[11px] font-semibold text-text-secondary",
						children: "Initial backoff (ms)"
					}), /* @__PURE__ */ U(M, {
						size: "sm",
						min: 0,
						step: 100,
						unit: "ms",
						value: r.backoffMs,
						onChange: (e) => t({
							...r,
							backoffMs: e
						}),
						"aria-label": "Initial backoff in milliseconds"
					})] }),
					/* @__PURE__ */ W("div", { children: [/* @__PURE__ */ U("label", {
						className: "text-[11px] font-semibold text-text-secondary",
						children: "Backoff multiplier"
					}), /* @__PURE__ */ U(M, {
						size: "sm",
						min: 1,
						max: 4,
						step: .5,
						value: r.backoffMultiplier,
						onChange: (e) => t({
							...r,
							backoffMultiplier: e
						}),
						"aria-label": "Backoff multiplier"
					})] })
				]
			}),
			/* @__PURE__ */ U("div", {
				className: "text-[11px] text-text-tertiary mt-1",
				"data-testid": "retry-policy-preview",
				children: r.maxAttempts === 1 ? "Effectively no retry (1 attempt)." : i.length === 0 ? `Retries up to ${r.maxAttempts}× with no delay.` : `Retries up to ${r.maxAttempts}× with delays: ${i.map(Ua).join(", ")}.`
			}),
			a && /* @__PURE__ */ U("div", {
				className: "text-[11px] text-warning-fg mt-1",
				"data-testid": "retry-policy-tail-warning",
				children: "⚠ Total backoff >5min — long-tail latency risk on persistent failures."
			})
		] })]
	});
}
//#endregion
//#region src/components/pipelines/context/ContextVariablePicker.tsx
var Ka = {
	string: "bg-info-bg text-info-fg border-info-border",
	number: "bg-accent-bg text-accent-fg border-accent-border",
	boolean: "bg-warning-bg text-warning-fg border-warning-border",
	object: "bg-neutral-bg text-neutral-fg border-neutral-border",
	array: "bg-neutral-bg text-neutral-fg border-neutral-border",
	image: "bg-success-bg text-success-fg border-success-border"
};
function qa({ paths: e, unresolved: t = [], onInsert: r, onRevealNode: i, className: a }) {
	return /* @__PURE__ */ W("div", {
		className: n("flex flex-col gap-1.5", a),
		"data-testid": "context-variable-picker",
		children: [
			e.length === 0 ? /* @__PURE__ */ U("p", {
				className: "m-0 text-[11px] text-text-tertiary",
				"data-testid": "context-picker-empty",
				children: "No upstream context yet — connect this node to a trigger or an earlier step and its outputs will appear here."
			}) : /* @__PURE__ */ W(H, { children: [/* @__PURE__ */ U("div", {
				className: "flex flex-wrap gap-1",
				children: e.map((e) => /* @__PURE__ */ U("button", {
					type: "button",
					onClick: () => r(`{{${e.path}}}`),
					title: `${e.description}\nfrom ${e.source}`,
					className: n("rounded-full border px-2 py-0.5 font-mono text-[10px] cursor-pointer", "hover:brightness-95 transition-[filter]", Ka[e.kind]),
					"data-testid": `context-pill-${e.path}`,
					children: e.path.replace(/^context\./, "")
				}, e.path))
			}), /* @__PURE__ */ U("p", {
				className: "m-0 text-[11px] text-text-tertiary",
				children: "Click to insert. Derived from what is actually upstream of this node."
			})] }),
			t.length > 0 && /* @__PURE__ */ W("div", {
				className: "rounded-md border border-warning-border bg-warning-bg px-2 py-1.5",
				"data-testid": "context-unresolved",
				children: [
					/* @__PURE__ */ U("p", {
						className: "m-0 text-[11px] font-semibold text-warning-fg",
						children: t.length === 1 ? "This path is not provided by anything upstream:" : `${t.length} paths are not provided by anything upstream:`
					}),
					/* @__PURE__ */ U("ul", {
						className: "m-0 mt-1 list-none p-0",
						children: t.map((e) => /* @__PURE__ */ U("li", {
							className: "font-mono text-[11px] text-warning-fg",
							children: `{{${e}}}`
						}, e))
					}),
					/* @__PURE__ */ U("p", {
						className: "m-0 mt-1 text-[10px] text-warning-fg",
						children: "It will resolve to nothing at run time. Wire in the step that produces it, or fix the path."
					})
				]
			}),
			i && e.length > 0 && /* @__PURE__ */ W("details", {
				className: "text-[11px] text-text-secondary",
				children: [/* @__PURE__ */ U("summary", {
					className: "cursor-pointer select-none",
					children: "Where each value comes from"
				}), /* @__PURE__ */ U("ul", {
					className: "m-0 mt-1 list-none p-0",
					children: e.map((e) => /* @__PURE__ */ W("li", {
						className: "flex items-baseline gap-1.5 py-0.5",
						children: [/* @__PURE__ */ U("button", {
							type: "button",
							onClick: () => i(e.sourceNodeId),
							className: "bg-transparent border-none p-0 cursor-pointer text-primary underline font-inherit text-[11px]",
							children: e.source
						}), /* @__PURE__ */ U("span", {
							className: "font-mono text-[10px] text-text-tertiary",
							children: e.path
						})]
					}, e.path))
				})]
			})
		]
	});
}
//#endregion
//#region src/components/pipelines/nodes/llm/LLMConfig.tsx
var Ja = [
	{
		value: "anthropic",
		label: "Anthropic"
	},
	{
		value: "bedrock",
		label: "Bedrock"
	},
	{
		value: "claude-code",
		label: "Claude Code (subprocess)"
	}
], Ya = {
	anthropic: [
		"claude-opus-4-7",
		"claude-sonnet-4-6",
		"claude-haiku-4-5-20251001"
	],
	bedrock: [
		"claude-opus-4-7",
		"claude-sonnet-4-6",
		"claude-haiku-4-5-20251001"
	],
	"claude-code": [
		"opus",
		"sonnet",
		"haiku"
	]
};
function Xa(e, t) {
	switch (t) {
		case "image": return `<image from ${e}>`;
		case "number": return "123";
		case "boolean": return "true";
		case "array": return "[ … ]";
		case "object": return "{ … }";
		default: return `<${e}>`;
	}
}
function Za(e, t) {
	return e.replace(/\{\{\s*([\w.[\]-]+)\s*\}\}/g, (e, n) => {
		let r = t.get(n);
		return r ? Xa(n, r) : `{{${n}}}`;
	});
}
function Qa({ data: e, onChange: t, nodeId: n }) {
	let r = ut(), [i, a] = V(!1), { paths: o, unresolved: s } = Ea(n ?? null), l = new Map(o.map((e) => [e.path, e.kind])), u = s(`${e.systemPrompt ?? ""}\n${e.userPromptTemplate ?? ""}`), d = !e.systemPrompt?.trim(), f = !e.userPromptTemplate?.trim(), p = Ue(), m = (e) => p(`llm:${e}`, (Ya[e] ?? []).map((e) => ({ value: e }))), h = m(e.provider), g = e.model && !h.some((t) => t.value === e.model) ? [{ value: e.model }, ...h] : h, _ = Ja.some((t) => t.value === e.provider) ? Ja : [...Ja, {
		value: String(e.provider ?? ""),
		label: `${String(e.provider ?? "")} (unrecognised)`
	}], v = (n) => {
		let r = m(n).map((e) => e.value);
		t({
			provider: n,
			model: r.includes(e.model) ? e.model : r[0] ?? e.model
		});
	};
	return /* @__PURE__ */ W(va, { children: [
		/* @__PURE__ */ U(X, {
			label: "Provider",
			required: !0,
			controlId: `${r}-provider`,
			render: ({ controlId: t, describedById: n }) => /* @__PURE__ */ U(j, {
				size: "sm",
				id: t,
				"aria-describedby": n,
				value: e.provider,
				onChange: (e) => v(e.target.value),
				options: _
			})
		}),
		/* @__PURE__ */ U(X, {
			label: "Model",
			required: !0,
			controlId: `${r}-model`,
			render: ({ controlId: n, describedById: r }) => /* @__PURE__ */ U(j, {
				size: "sm",
				id: n,
				"aria-describedby": r,
				value: e.model,
				onChange: (e) => t({ model: e.target.value }),
				options: g.map((e) => ({
					value: e.value,
					label: e.label ?? e.value
				}))
			})
		}),
		/* @__PURE__ */ U(X, {
			label: "Available context",
			render: ({ labelId: n }) => /* @__PURE__ */ U("div", {
				role: "group",
				"aria-labelledby": n,
				children: /* @__PURE__ */ U(qa, {
					paths: o,
					unresolved: u,
					onInsert: (n) => t({ userPromptTemplate: `${e.userPromptTemplate ?? ""}${n}` })
				})
			})
		}),
		/* @__PURE__ */ U(X, {
			label: "System prompt",
			required: !0,
			error: d ? "System prompt is required." : void 0,
			help: d ? void 0 : "Sets the model's role and constraints.",
			controlId: `${r}-system-prompt`,
			render: ({ controlId: n, describedById: r }) => /* @__PURE__ */ U(A, {
				rows: 4,
				invalid: d,
				id: n,
				"aria-describedby": r,
				value: e.systemPrompt,
				onChange: (e) => t({ systemPrompt: e.target.value })
			})
		}),
		/* @__PURE__ */ U(X, {
			label: "User prompt template",
			required: !0,
			error: f ? "User prompt template is required." : void 0,
			help: f ? void 0 : "Supports {{ context.* }} substitution — click a pill above to append.",
			children: /* @__PURE__ */ U(c, {
				value: e.userPromptTemplate,
				onChange: (e) => t({ userPromptTemplate: e }),
				language: "template",
				variables: o.map((e) => e.path),
				minLines: 6,
				"aria-label": "User prompt template"
			})
		}),
		/* @__PURE__ */ W(_a, {
			title: "Advanced",
			defaultCollapsed: !0,
			children: [
				/* @__PURE__ */ U(X, {
					label: "Temperature",
					help: "0 = deterministic, 1 = creative.",
					children: /* @__PURE__ */ U(N, {
						min: 0,
						max: 1,
						step: .1,
						value: e.temperature ?? .7,
						onChange: (e) => t({ temperature: e }),
						readout: (e) => e.toFixed(1),
						"aria-label": "Temperature",
						"data-testid": "llm-temperature"
					})
				}),
				/* @__PURE__ */ U(X, {
					label: "Max tokens",
					help: "Upper bound on response length.",
					controlId: `${r}-max-tokens`,
					render: ({ controlId: n, describedById: r }) => /* @__PURE__ */ U(M, {
						size: "sm",
						min: 1,
						value: e.maxTokens,
						onChange: (e) => t({ maxTokens: e }),
						onClear: () => t({ maxTokens: void 0 }),
						id: n,
						"aria-describedby": r,
						"data-testid": "llm-max-tokens"
					})
				}),
				/* @__PURE__ */ U("div", { children: /* @__PURE__ */ U(ka, {
					label: "Streaming",
					checked: e.streaming,
					onChange: (e) => t({ streaming: e }),
					help: "Stream tokens as they are generated.",
					"data-testid": "llm-streaming"
				}) }),
				/* @__PURE__ */ U(Ga, {
					value: e.retryPolicy,
					onChange: (e) => t({ retryPolicy: e })
				})
			]
		}),
		/* @__PURE__ */ W("button", {
			type: "button",
			onClick: () => a((e) => !e),
			className: "px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-white border-none rounded-md cursor-pointer font-inherit shrink-0",
			children: [i ? "▾" : "▶", " Preview with sample context"]
		}),
		i && /* @__PURE__ */ W("div", {
			className: "bg-surface-inset border border-border rounded-lg p-3 flex flex-col gap-2.5",
			children: [
				/* @__PURE__ */ W("div", { children: [/* @__PURE__ */ U("div", {
					className: "text-[11px] font-semibold text-text-secondary mb-1",
					children: "Resolved system prompt"
				}), /* @__PURE__ */ U("pre", {
					className: "text-xs whitespace-pre-wrap break-words m-0 text-text-primary bg-surface p-2 rounded-md border border-border max-h-[120px] overflow-auto",
					children: Za(e.systemPrompt || "(empty)", l)
				})] }),
				/* @__PURE__ */ W("div", { children: [/* @__PURE__ */ U("div", {
					className: "text-[11px] font-semibold text-text-secondary mb-1",
					children: "Resolved user prompt"
				}), /* @__PURE__ */ U("pre", {
					className: "text-xs whitespace-pre-wrap break-words m-0 text-text-primary bg-surface p-2 rounded-md border border-border max-h-[200px] overflow-auto",
					children: Za(e.userPromptTemplate || "(empty)", l)
				})] }),
				/* @__PURE__ */ U("div", {
					className: "text-[11px] text-text-tertiary",
					children: o.length > 0 ? "Placeholders describe the shape of each upstream value; unresolved paths stay in braces." : "No upstream context — connect this node to see what it can reference."
				})
			]
		})
	] });
}
//#endregion
//#region src/components/pipelines/nodes/transform/TransformConfig.tsx
var $a = [
	"context",
	"context.steps",
	"context.trigger"
], eo = [
	{
		value: "jsonpath",
		label: "JSONPath"
	},
	{
		value: "template",
		label: "Template"
	},
	{
		value: "javascript",
		label: "JavaScript"
	}
];
function to({ data: e, onChange: t }) {
	let n = ut(), r = !e.expression?.trim();
	return /* @__PURE__ */ W(va, { children: [
		/* @__PURE__ */ U(X, {
			label: "Type",
			required: !0,
			render: ({ labelId: n }) => /* @__PURE__ */ U("div", {
				role: "group",
				"aria-labelledby": n,
				children: /* @__PURE__ */ U(f, {
					name: "transform-type",
					value: e.transformType,
					onChange: (e) => t({ transformType: e }),
					options: eo.map((e) => ({
						value: e.value,
						label: e.label
					})),
					"data-testid": "transform-type"
				})
			})
		}),
		/* @__PURE__ */ U(X, {
			label: "Expression",
			required: !0,
			error: r ? "Expression is required." : void 0,
			help: r ? void 0 : e.transformType === "jsonpath" ? "e.g. $.items[?(@.status == \"active\")]" : e.transformType === "template" ? "Mustache-style: {{ context.doc.title }}" : e.transformType === "javascript" ? "return ctx.items.filter(x => x.active)" : void 0,
			children: /* @__PURE__ */ U(c, {
				value: e.expression,
				onChange: (e) => t({ expression: e }),
				language: e.transformType === "javascript" ? "javascript" : "jsonpath",
				variables: $a,
				"aria-label": "Expression"
			})
		}),
		/* @__PURE__ */ U(X, {
			label: "Output key (optional)",
			help: `If set, writes to context.${e.outputKey || "outputKey"}. Otherwise merges into root context.`,
			controlId: `${n}-output-key`,
			render: ({ controlId: n, describedById: r }) => /* @__PURE__ */ U(k, {
				size: "sm",
				mono: !0,
				spellCheck: !1,
				id: n,
				"aria-describedby": r,
				value: e.outputKey ?? "",
				onChange: (e) => t({ outputKey: e.target.value || void 0 }),
				placeholder: "activeItems"
			})
		}),
		/* @__PURE__ */ U(Ga, {
			value: e.retryPolicy,
			onChange: (e) => t({ retryPolicy: e })
		}),
		/* @__PURE__ */ U(X, {
			label: "Preview",
			children: /* @__PURE__ */ U(T, {
				title: "Preview not available yet",
				body: "Sample input and output for a transform will render here once the preview runner ships."
			})
		})
	] });
}
//#endregion
//#region src/components/pipelines/nodes/condition/ConditionConfig.tsx
var no = ["context.trigger", "context.steps"];
function ro({ data: e, onChange: t }) {
	let n = ut(), r = !e.expression?.trim();
	return /* @__PURE__ */ W(va, { children: [/* @__PURE__ */ U(X, {
		label: "Expression",
		required: !0,
		error: r ? "Expression is required." : void 0,
		help: r ? void 0 : "e.g. context.llm.response.length > 500",
		children: /* @__PURE__ */ U(c, {
			value: e.expression,
			onChange: (e) => t({ expression: e }),
			language: "javascript",
			variables: no,
			"aria-label": "Expression"
		})
	}), /* @__PURE__ */ U(X, {
		label: "Label (optional — shown on node face)",
		help: "A short name so this branch is easy to spot.",
		controlId: `${n}-label`,
		render: ({ controlId: n, describedById: r }) => /* @__PURE__ */ U(k, {
			size: "sm",
			id: n,
			"aria-describedby": r,
			value: e.label ?? "",
			onChange: (e) => t({ label: e.target.value || void 0 }),
			placeholder: "Long summary?"
		})
	})] });
}
//#endregion
//#region src/components/pipelines/nodes/action/ActionConfig.tsx
var io = [
	{
		value: "update-document",
		label: "Update document"
	},
	{
		value: "post-comment",
		label: "Post comment"
	},
	{
		value: "notify",
		label: "Notify user"
	},
	{
		value: "webhook",
		label: "Webhook"
	},
	{
		value: "mcp-tool",
		label: "MCP tool"
	},
	{
		value: "sync-back",
		label: "Sync back to source"
	}
], ao = {
	"update-document": [
		{
			key: "documentId",
			label: "Document ID",
			placeholder: "{{current}}",
			help: "Use {{current}} for the triggering document"
		},
		{
			key: "field",
			label: "Field name",
			placeholder: "e.g. status, tags"
		},
		{
			key: "value",
			label: "New value",
			placeholder: "{{context.steps.<id>.response}}",
			help: "Supports {{context.*}} template variables"
		}
	],
	"post-comment": [{
		key: "documentId",
		label: "Document ID",
		placeholder: "{{current}}",
		help: "Use {{current}} for the triggering document"
	}, {
		key: "body",
		label: "Comment body",
		placeholder: "{{context.steps.<id>.response}}",
		multiline: !0,
		help: "Supports {{context.*}} template variables"
	}],
	notify: [{
		key: "channel",
		label: "Channel / Room",
		placeholder: "e.g. general, moderation",
		help: "Room ID where the notification is posted"
	}, {
		key: "message",
		label: "Message",
		placeholder: "Flagged: {{context.steps.<id>.output.reason}}",
		multiline: !0,
		help: "Supports {{context.*}} template variables"
	}],
	webhook: [
		{
			key: "url",
			label: "URL",
			placeholder: "https://..."
		},
		{
			key: "method",
			label: "Method",
			placeholder: "POST"
		},
		{
			key: "body",
			label: "Body (JSON)",
			placeholder: "{\"key\": \"{{context.value}}\"}",
			multiline: !0
		}
	],
	"mcp-tool": [{
		key: "toolName",
		label: "Tool name",
		placeholder: "e.g. search, summarize"
	}, {
		key: "input",
		label: "Input (JSON)",
		placeholder: "{}",
		multiline: !0
	}],
	"sync-back": [{
		key: "sourceId",
		label: "Source ID",
		placeholder: "{{document.metadata.sourceId}}",
		help: "Ingest source to sync back to"
	}, {
		key: "documentId",
		label: "Document ID",
		placeholder: "{{document.id}}",
		help: "Document to push back to source"
	}]
}, oo = [
	{
		value: "route-error",
		label: "Route to error handle"
	},
	{
		value: "halt",
		label: "Halt pipeline"
	},
	{
		value: "retry",
		label: "Retry a fixed number of times"
	}
], so = [{
	value: "per-step",
	label: "Per step — fire once regardless of retries"
}, {
	value: "per-attempt",
	label: "Per attempt — fire once per retry window"
}];
function co({ data: e, onChange: t }) {
	let n = ut(), r = ao[e.actionType] ?? [], i = e.config ?? {}, a = typeof i.retryCount == "number" ? i.retryCount : 3, o = e.onError === "route-error" ? "route-error" : typeof i.retryCount == "number" ? "retry" : "halt", s = (e, n) => {
		t({ config: {
			...i,
			[e]: n
		} });
	}, c = (e) => {
		if (e === "route-error") {
			let { retryCount: e, ...n } = i;
			t({
				onError: "route-error",
				config: n
			});
		} else if (e === "halt") {
			let { retryCount: e, ...n } = i;
			t({
				onError: "fail-run",
				config: n
			});
		} else t({
			onError: "fail-run",
			config: {
				...i,
				retryCount: a
			}
		});
	};
	return /* @__PURE__ */ W(va, { children: [
		/* @__PURE__ */ U(X, {
			label: "Action type",
			required: !0,
			controlId: `${n}-action-type`,
			render: ({ controlId: n, describedById: r }) => /* @__PURE__ */ U(j, {
				size: "sm",
				id: n,
				"aria-describedby": r,
				value: e.actionType,
				onChange: (e) => t({
					actionType: e.target.value,
					config: {}
				}),
				options: io
			})
		}),
		/* @__PURE__ */ U(X, {
			label: "Configuration",
			render: ({ labelId: e }) => /* @__PURE__ */ U("div", {
				role: "group",
				"aria-labelledby": e,
				className: "flex flex-col gap-2.5",
				children: r.map((e) => {
					let t = `${n}-cfg-${e.key}`, r = e.help ? `${t}-help` : void 0, a = typeof i[e.key] == "string" ? i[e.key] : "";
					return /* @__PURE__ */ W("div", { children: [
						/* @__PURE__ */ U("label", {
							htmlFor: t,
							className: "text-[11px] font-semibold text-text-secondary",
							children: e.label
						}),
						e.multiline ? /* @__PURE__ */ U(A, {
							rows: 2,
							id: t,
							"aria-describedby": r,
							placeholder: e.placeholder,
							value: a,
							onChange: (t) => s(e.key, t.target.value)
						}) : /* @__PURE__ */ U(k, {
							size: "sm",
							id: t,
							"aria-describedby": r,
							placeholder: e.placeholder,
							value: a,
							onChange: (t) => s(e.key, t.target.value)
						}),
						e.help && /* @__PURE__ */ U("div", {
							id: r,
							className: "text-[11px] text-text-tertiary mt-0.5",
							children: e.help
						})
					] }, e.key);
				})
			})
		}),
		/* @__PURE__ */ U(ka, {
			label: "Idempotent",
			checked: !!e.idempotent,
			onChange: (e) => t({ idempotent: e }),
			help: "This action is safe to retry.",
			"data-testid": "action-idempotent"
		}),
		e.idempotent && /* @__PURE__ */ U(X, {
			label: "Dedup scope",
			controlId: `${n}-dedup-scope`,
			render: ({ controlId: r }) => /* @__PURE__ */ W(H, { children: [/* @__PURE__ */ U(j, {
				size: "sm",
				id: r,
				"aria-describedby": `${n}-dedup-help`,
				value: e.idempotencyMode ?? "per-step",
				onChange: (e) => t({ idempotencyMode: e.target.value }),
				options: so
			}), /* @__PURE__ */ U("div", {
				id: `${n}-dedup-help`,
				className: "text-[11px] text-text-tertiary mt-0.5",
				children: (e.idempotencyMode ?? "per-step") === "per-step" ? "Retries skip this action if it already succeeded. Best for post-comment, notify." : "Each retry attempt can execute the action. Best for idempotent PUTs/webhooks."
			})] })
		}),
		/* @__PURE__ */ U(Ga, {
			value: e.retryPolicy,
			onChange: (e) => t({ retryPolicy: e })
		}),
		/* @__PURE__ */ U(X, {
			label: "On error",
			render: ({ labelId: e }) => /* @__PURE__ */ W("div", {
				role: "group",
				"aria-labelledby": e,
				children: [/* @__PURE__ */ U(f, {
					name: "action-on-error",
					value: o,
					onChange: c,
					options: oo,
					"data-testid": "action-on-error"
				}), o === "retry" && /* @__PURE__ */ W("div", {
					className: "mt-2 flex items-center gap-2",
					children: [/* @__PURE__ */ U("span", {
						className: "text-[11px] font-semibold text-text-secondary",
						children: "Attempts"
					}), /* @__PURE__ */ U(M, {
						size: "sm",
						min: 1,
						value: a,
						onChange: (e) => t({
							onError: "fail-run",
							config: {
								...i,
								retryCount: e
							}
						}),
						"aria-label": "Attempts",
						"data-testid": "action-retry-count"
					})]
				})]
			})
		})
	] });
}
//#endregion
//#region src/components/pipelines/nodes/fork/ForkConfig.tsx
var lo = 2, uo = 8;
function fo(e, t) {
	let n = e ?? [];
	return n.length === t ? n : n.length > t ? n.slice(0, t) : [...n, ...Array(t - n.length).fill("")];
}
function po({ data: e, onChange: t }) {
	let n = ut(), r = Math.max(lo, Math.min(uo, e.branchCount || lo)), i = fo(e.branchLabels, r), a = (n) => {
		let r = Math.max(lo, Math.min(uo, n));
		t({
			branchCount: r,
			branchLabels: fo(e.branchLabels, r)
		});
	}, o = (e, n) => {
		let r = [...i];
		r[e] = n, t({ branchLabels: r });
	};
	return /* @__PURE__ */ W(va, { children: [/* @__PURE__ */ U(X, {
		label: "Branch count",
		required: !0,
		help: `Between ${lo} and ${uo} parallel branches.`,
		controlId: `${n}-branch-count`,
		render: ({ controlId: e, describedById: t }) => /* @__PURE__ */ W(H, { children: [/* @__PURE__ */ U(N, {
			min: lo,
			max: uo,
			step: 1,
			value: r,
			onChange: a,
			"aria-label": "Branch count",
			"data-testid": "fork-branch-slider"
		}), /* @__PURE__ */ U(M, {
			size: "sm",
			min: lo,
			max: uo,
			value: r,
			onChange: a,
			id: e,
			"aria-describedby": t,
			"data-testid": "fork-branch-count"
		})] })
	}), /* @__PURE__ */ U(X, {
		label: "Branch labels (optional)",
		render: ({ labelId: e }) => /* @__PURE__ */ U("div", {
			role: "group",
			"aria-labelledby": e,
			className: "flex flex-col gap-1.5",
			children: i.map((e, t) => /* @__PURE__ */ W("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ W("span", {
					className: "text-xs text-text-secondary min-w-[72px]",
					children: [
						"Branch ",
						t,
						":"
					]
				}), /* @__PURE__ */ U(k, {
					size: "sm",
					value: e,
					onChange: (e) => o(t, e.target.value),
					placeholder: t === 0 ? "primary" : `branch-${t}`,
					"aria-label": `Branch ${t} label`
				})]
			}, t))
		})
	})] });
}
//#endregion
//#region src/components/pipelines/nodes/join/JoinConfig.tsx
var mo = [
	{
		value: "all",
		label: "All",
		hint: "Wait for every input."
	},
	{
		value: "any",
		label: "Any",
		hint: "Fire on the first input."
	},
	{
		value: "n_of_m",
		label: "N of M",
		hint: "Fire after N inputs."
	}
], ho = [
	{
		value: "deep-merge",
		label: "Deep merge",
		hint: "Recursively merge input objects."
	},
	{
		value: "array-collect",
		label: "Array collect",
		hint: "Writes inputs to context.joinInputs[]."
	},
	{
		value: "last-writer-wins",
		label: "Last writer wins",
		hint: "Most recent input replaces prior."
	}
];
function go({ data: e, onChange: t }) {
	return /* @__PURE__ */ W(va, { children: [
		/* @__PURE__ */ U(X, {
			label: "Mode",
			required: !0,
			render: ({ labelId: n }) => /* @__PURE__ */ W("div", {
				role: "group",
				"aria-labelledby": n,
				children: [/* @__PURE__ */ U(f, {
					name: "join-mode",
					value: e.mode,
					onChange: (e) => t({ mode: e }),
					options: mo.map((e) => ({
						value: e.value,
						label: e.label,
						description: e.hint
					})),
					"data-testid": "join-mode"
				}), e.mode === "n_of_m" && /* @__PURE__ */ W("div", {
					className: "mt-2 flex items-center gap-2",
					children: [/* @__PURE__ */ U("span", {
						className: "text-[11px] font-semibold text-text-secondary",
						children: "N"
					}), /* @__PURE__ */ U(M, {
						size: "sm",
						min: 1,
						value: e.n ?? 1,
						onChange: (e) => t({ n: e }),
						"aria-label": "N",
						"data-testid": "join-n"
					})]
				})]
			})
		}),
		/* @__PURE__ */ U(X, {
			label: "Merge strategy",
			required: !0,
			render: ({ labelId: n }) => /* @__PURE__ */ U("div", {
				role: "group",
				"aria-labelledby": n,
				children: /* @__PURE__ */ U(f, {
					name: "join-merge",
					value: e.mergeStrategy,
					onChange: (e) => t({ mergeStrategy: e }),
					options: ho.map((e) => ({
						value: e.value,
						label: e.label,
						description: e.hint
					})),
					"data-testid": "join-merge"
				})
			})
		}),
		/* @__PURE__ */ W("div", {
			className: "p-2 bg-surface-inset border border-border rounded-md text-xs text-text-secondary",
			children: [
				"Current inputs: ",
				/* @__PURE__ */ U("strong", { children: "TBD" }),
				/* @__PURE__ */ U("div", {
					className: "text-[11px] text-text-tertiary mt-0.5",
					children: "Derived from incoming edges once the canvas is connected."
				})
			]
		})
	] });
}
//#endregion
//#region src/components/pipelines/nodes/approval/ApprovalConfig.tsx
var _o = [
	{
		value: "seconds",
		label: "seconds"
	},
	{
		value: "minutes",
		label: "minutes"
	},
	{
		value: "hours",
		label: "hours"
	}
], vo = [{
	value: "reject",
	label: "Reject"
}, {
	value: "approve",
	label: "Approve"
}], yo = {
	seconds: 1e3,
	minutes: 6e4,
	hours: 36e5
};
function bo(e) {
	return !e || e <= 0 ? "minutes" : e % yo.hours === 0 ? "hours" : e % yo.minutes === 0 ? "minutes" : "seconds";
}
function xo({ data: e, onChange: t }) {
	let r = ut(), i = e.approvers ?? [], o = i.length === 0, [s, c] = V(() => bo(e.timeoutMs)), l = e.timeoutMs === void 0 ? "" : Math.round(e.timeoutMs / yo[s]), u = i.filter((e) => e.type === "user").map((e) => e.value), d = (n) => {
		let r = i.filter((e) => e.type === "role"), a = [...n.map((e) => ({
			type: "user",
			value: e
		})), ...r];
		t({
			approvers: a,
			requiredCount: Math.max(1, Math.min(e.requiredCount || 1, a.length || 1))
		});
	}, p = (n) => {
		let r = i.filter((e, t) => t !== n);
		t({
			approvers: r,
			requiredCount: Math.max(1, Math.min(e.requiredCount || 1, r.length || 1))
		});
	}, m = (e) => {
		if (e === "") {
			t({ timeoutMs: void 0 });
			return;
		}
		t({ timeoutMs: Math.max(0, parseInt(e, 10) || 0) * yo[s] });
	}, h = (e) => {
		c(e), typeof l == "number" && !Number.isNaN(l) && t({ timeoutMs: l * yo[e] });
	}, g = Math.max(1, i.length);
	return /* @__PURE__ */ W(va, { children: [
		/* @__PURE__ */ U(X, {
			label: "Approvers",
			required: !0,
			error: o ? "At least one approver is required." : void 0,
			help: o ? void 0 : "Who can approve this step.",
			render: ({ describedById: e, labelId: t }) => /* @__PURE__ */ W("div", {
				role: "group",
				"aria-labelledby": t,
				"aria-describedby": e,
				children: [/* @__PURE__ */ U(a, {
					value: u,
					onChange: d,
					placeholder: "Add approver…"
				}), i.length > 0 && /* @__PURE__ */ U("div", {
					className: "flex flex-wrap gap-1.5 mt-2",
					children: i.map((e, t) => /* @__PURE__ */ W("span", {
						className: n("inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold font-inherit leading-[1.4] whitespace-nowrap", e.type === "role" ? "bg-warning-bg text-warning-fg" : "bg-info-bg text-info-fg"),
						children: [
							e.type === "role" ? "🎖" : "👤",
							" ",
							e.value,
							/* @__PURE__ */ U("button", {
								type: "button",
								onClick: () => p(t),
								"aria-label": `Remove ${e.value}`,
								className: "bg-transparent border-none p-0 ml-0.5 cursor-pointer text-current font-inherit text-xs leading-none",
								children: "×"
							})
						]
					}, `${e.type}:${e.value}:${t}`))
				})]
			})
		}),
		/* @__PURE__ */ U(X, {
			label: "Required count",
			required: !0,
			help: "How many approvers must say yes.",
			controlId: `${r}-required-count`,
			render: ({ controlId: n, describedById: r }) => /* @__PURE__ */ W("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ U(M, {
					size: "sm",
					min: 1,
					max: g,
					value: e.requiredCount || 1,
					onChange: (e) => t({ requiredCount: e }),
					id: n,
					"aria-describedby": r,
					"data-testid": "approval-required-count"
				}), /* @__PURE__ */ W("span", {
					className: "text-text-tertiary text-xs whitespace-nowrap",
					children: ["of ", g]
				})]
			})
		}),
		/* @__PURE__ */ U(X, {
			label: "Timeout",
			help: "Leave blank for no timeout.",
			render: ({ describedById: n, labelId: r }) => /* @__PURE__ */ W("div", {
				role: "group",
				"aria-labelledby": r,
				"aria-describedby": n,
				children: [/* @__PURE__ */ W("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ U(M, {
						size: "sm",
						min: 0,
						value: l === "" ? void 0 : Number(l),
						onChange: (e) => m(String(e)),
						onClear: () => m(""),
						placeholder: "24",
						"aria-label": "Timeout value",
						"data-testid": "approval-timeout-value"
					}), /* @__PURE__ */ U(j, {
						size: "sm",
						className: "w-[120px] flex-none",
						value: s,
						onChange: (e) => h(e.target.value),
						"aria-label": "Timeout unit",
						options: _o
					})]
				}), e.timeoutMs !== void 0 && e.timeoutMs > 0 && /* @__PURE__ */ W("div", {
					className: "mt-2",
					children: [/* @__PURE__ */ U("span", {
						className: "text-[11px] font-semibold text-text-secondary",
						children: "If timeout"
					}), /* @__PURE__ */ U("div", {
						className: "mt-1",
						children: /* @__PURE__ */ U(f, {
							name: "approval-timeout-action",
							orientation: "horizontal",
							value: e.timeoutAction ?? "reject",
							onChange: (e) => t({ timeoutAction: e }),
							options: vo,
							"data-testid": "approval-timeout-action"
						})
					})]
				})]
			})
		}),
		/* @__PURE__ */ U(X, {
			label: "Message for approver (optional)",
			help: "Shown to the approver when the request is sent.",
			controlId: `${r}-message`,
			render: ({ controlId: n, describedById: r }) => /* @__PURE__ */ U(A, {
				rows: 4,
				id: n,
				"aria-describedby": r,
				value: e.message ?? "",
				onChange: (e) => t({ message: e.target.value || void 0 }),
				placeholder: "Please review the summary before it's posted to the document."
			})
		})
	] });
}
//#endregion
//#region src/components/pipelines/lib/schemaToJsonPaths.ts
function So(e) {
	switch (Array.isArray(e.type) ? e.type[0] : e.type) {
		case "array": return "array";
		case "object": return "object";
		case "string": return "string";
		case "number":
		case "integer": return "number";
		case "boolean": return "boolean";
		default: return "unknown";
	}
}
function Co(e) {
	let t = Array.isArray(e.type) ? e.type[0] : e.type;
	if (t === "array") {
		let t = e.items ? Array.isArray(e.items.type) ? e.items.type[0] : e.items.type : void 0;
		return t ? `array of ${t}` : "array";
	}
	return t ?? "unknown";
}
function wo(e, t, n, r, i) {
	if (i.has(e)) return;
	i.add(e);
	let a = Array.isArray(e.type) ? e.type[0] : e.type, o = [
		e.anyOf,
		e.oneOf,
		e.allOf
	].filter(Boolean);
	for (let e of o) for (let a of e) wo(a, t, n, r, i);
	if (a === "object" && e.properties) {
		for (let [a, o] of Object.entries(e.properties)) {
			let e = `${t}.${a}`, s = So(o);
			r.push({
				path: e,
				label: `${a} (${Co(o)})`,
				depth: n,
				kind: s,
				isArrayItems: s === "array"
			}), wo(o, e, n + 1, r, i);
		}
		return;
	}
	if (a === "array") {
		let a = `${t}[*]`, o = e.items, s = o ? So(o) : "unknown";
		r.push({
			path: a,
			label: `${t.slice(t.lastIndexOf(".") + 1)}[*] (each item)`,
			depth: n,
			kind: s,
			isArrayItems: !0
		}), o && wo(o, a, n + 1, r, i);
	}
}
function To(e, t = "$") {
	if (!e || typeof e != "object") return [];
	let n = [], r = /* @__PURE__ */ new Set();
	if ((Array.isArray(e.type) ? e.type[0] : e.type) === "object" && e.properties) for (let [i, a] of Object.entries(e.properties)) {
		let e = `${t}.${i}`, o = So(a);
		n.push({
			path: e,
			label: `${i} (${Co(a)})`,
			depth: 0,
			kind: o,
			isArrayItems: o === "array"
		}), wo(a, e, 1, n, r);
	}
	else wo(e, t, 0, n, r);
	return n;
}
//#endregion
//#region src/components/pipelines/nodes/scatter/ScatterPathPicker.tsx
function Eo() {
	return "/api/pipeline/output-schemas";
}
var Do = null, Oo = null;
async function ko() {
	return Do || (Oo ||= fetch(Eo()).then((e) => {
		if (!e.ok) throw Error(`HTTP ${e.status}`);
		return e.json();
	}).then((e) => (Do = e, Oo = null, e)).catch((e) => {
		throw Oo = null, e;
	}), Oo);
}
var Ao = {
	array: "bg-primary-bg text-primary-fg border-primary-border",
	object: "bg-surface-panel text-text-secondary border-border",
	string: "bg-success-bg text-success-fg border-success-border",
	number: "bg-warning-bg text-warning-fg border-warning-border",
	boolean: "bg-pink-50 text-pink-700 border-pink-200",
	unknown: "bg-surface-panel text-text-tertiary border-border"
};
function jo({ kind: e }) {
	return /* @__PURE__ */ U("span", {
		className: n("inline-flex items-center px-1 py-0 rounded text-[10px] font-mono border leading-4", Ao[e]),
		children: e
	});
}
function Mo({ entry: e, isSelected: t, onPick: r }) {
	return /* @__PURE__ */ W("button", {
		type: "button",
		onClick: () => r(e.path),
		"aria-pressed": t,
		"data-testid": `path-row-${e.path}`,
		className: n("w-full flex items-center gap-2 px-2 py-1 rounded text-left transition-colors duration-100", "hover:bg-surface-panel focus:outline-none focus:ring-2 focus:ring-primary/50", t && "bg-primary-bg ring-1 ring-inset ring-primary", e.isArrayItems && !t && "hover:bg-primary-bg"),
		style: { paddingLeft: `${8 + e.depth * 12}px` },
		children: [/* @__PURE__ */ U("span", {
			className: n("flex-1 font-mono text-[12px] leading-5 truncate", e.isArrayItems ? "text-primary-fg font-semibold" : "text-text-primary"),
			children: e.path
		}), /* @__PURE__ */ U(jo, { kind: e.kind })]
	});
}
function No({ value: e, onChange: t, upstreamKind: n, upstreamSchema: r }) {
	let [i, a] = V("idle"), [o, s] = V(null), c = B(!0);
	R(() => (c.current = !0, () => {
		c.current = !1;
	}), []);
	let l = z(() => r === void 0 ? o : r, [r, o]);
	R(() => {
		!n || r !== void 0 || (a("loading"), ko().then((e) => {
			if (!c.current) return;
			let t = e.schemas[n] ?? null;
			s(t), a("done");
		}).catch(() => {
			c.current && a("error");
		}));
	}, [n, r]);
	let u = z(() => To(l), [l]), d = l !== null && u.length > 0, f = L((e) => {
		t(e);
	}, [t]);
	if (!n && r === void 0) return /* @__PURE__ */ U(Ie, {
		value: e,
		onChange: t,
		enforcePrefix: !0,
		"data-testid": "scatter-path-plain-input"
	});
	if (!d) return /* @__PURE__ */ W("div", {
		className: "flex flex-col gap-1.5",
		children: [
			i === "loading" && /* @__PURE__ */ W("p", {
				className: "text-[11px] text-text-tertiary leading-4",
				children: [
					"Loading schema for ",
					n,
					"…"
				]
			}),
			i === "error" && /* @__PURE__ */ U("p", {
				className: "text-[11px] text-warning-fg leading-4",
				children: "Could not load schema — enter path manually."
			}),
			(i === "done" || r === null) && /* @__PURE__ */ W("p", {
				className: "text-[11px] text-text-tertiary leading-4",
				children: [
					"Schema unavailable for ",
					/* @__PURE__ */ U("span", {
						className: "font-mono",
						children: n
					}),
					" — enter path manually."
				]
			}),
			/* @__PURE__ */ U(Ie, {
				value: e,
				onChange: t,
				enforcePrefix: !0,
				"data-testid": "scatter-path-fallback-input"
			})
		]
	});
	let p = u.filter((e) => e.isArrayItems).length < u.length;
	return /* @__PURE__ */ W("div", {
		className: "flex flex-col gap-1.5",
		children: [
			/* @__PURE__ */ W("p", {
				className: "text-[11px] text-neutral leading-4",
				children: ["Click a path to set itemsPath.", p && /* @__PURE__ */ W(H, { children: [
					" ",
					/* @__PURE__ */ U("span", {
						className: "text-primary-fg font-semibold",
						children: "Indigo"
					}),
					" ",
					"paths are arrays — valid scatter sources."
				] })]
			}),
			/* @__PURE__ */ U("div", {
				className: "flex flex-col gap-px border border-border rounded-md bg-surface max-h-48 overflow-y-auto",
				"data-testid": "scatter-path-tree",
				role: "group",
				"aria-label": "Available output paths",
				children: u.map((t) => /* @__PURE__ */ U(Mo, {
					entry: t,
					isSelected: e === t.path,
					onPick: f
				}, t.path))
			}),
			/* @__PURE__ */ U(Ie, {
				value: e,
				onChange: t,
				enforcePrefix: !0,
				"data-testid": "scatter-path-input",
				placeholder: "$.path selected above or type manually"
			})
		]
	});
}
//#endregion
//#region src/components/pipelines/nodes/scatter/ScatterConfig.tsx
function Po(e) {
	let { definition: t } = me() ?? { definition: null };
	return z(() => {
		if (!e || !t) return;
		let n = t.edges.find((t) => t.target === e);
		if (!n) return;
		let r = t.nodes.find((e) => e.id === n.source);
		if (r) return r.type;
	}, [e, t]);
}
function Fo({ data: e, onChange: t }) {
	let n = ut(), { selectedNodeId: r } = me() ?? { selectedNodeId: null }, i = Po(r);
	return e.maxConcurrency, /* @__PURE__ */ W(va, { children: [
		/* @__PURE__ */ U(X, {
			label: "Items path",
			required: !0,
			error: e.itemsPath?.trim() ? e.itemsPath.startsWith("$.") ? void 0 : "Path must start with $." : "Items path is required.",
			help: "JSONPath into context resolving to an array. Each element becomes one scatter arm.",
			render: ({ describedById: n, labelId: r }) => /* @__PURE__ */ U("div", {
				role: "group",
				"aria-labelledby": r,
				"aria-describedby": n,
				children: /* @__PURE__ */ U(No, {
					value: e.itemsPath ?? "",
					onChange: (e) => t({ itemsPath: e }),
					upstreamKind: i
				})
			})
		}),
		/* @__PURE__ */ U(X, {
			label: "Item alias",
			help: "Optional, default 'item'. The element is put at context.<alias> for each arm — context.item unless you change it. It is also always at context.scatter.item, alongside .index and .total.",
			controlId: `${n}-item-alias`,
			render: ({ controlId: n, describedById: r }) => /* @__PURE__ */ U(k, {
				size: "sm",
				mono: !0,
				spellCheck: !1,
				id: n,
				"aria-describedby": r,
				value: e.itemAlias ?? "",
				onChange: (e) => t({ itemAlias: e.target.value.trim() || void 0 }),
				placeholder: "item"
			})
		}),
		/* @__PURE__ */ U(X, {
			label: "Max concurrency",
			help: "Optional, default 4. Maximum number of arms executing concurrently.",
			controlId: `${n}-max-concurrency`,
			render: ({ controlId: n, describedById: r }) => /* @__PURE__ */ U(M, {
				size: "sm",
				min: 1,
				max: 64,
				value: e.maxConcurrency,
				onChange: (e) => t({ maxConcurrency: e }),
				onClear: () => t({ maxConcurrency: void 0 }),
				placeholder: "4",
				id: n,
				"aria-describedby": r,
				"data-testid": "scatter-max-concurrency"
			})
		})
	] });
}
//#endregion
//#region src/components/pipelines/nodes/resize/ResizeConfig.tsx
var Io = [
	{
		value: "cover",
		label: "cover"
	},
	{
		value: "contain",
		label: "contain"
	},
	{
		value: "fill",
		label: "fill"
	},
	{
		value: "inside",
		label: "inside"
	},
	{
		value: "outside",
		label: "outside"
	}
];
function Lo({ data: e, onChange: t, nodeId: n }) {
	let r = e.fit ?? "cover", i = r === "contain" || r === "fill";
	return /* @__PURE__ */ W(va, { children: [
		/* @__PURE__ */ U(Oa, {
			value: e.sourceImagePath,
			onChange: (e) => t({ sourceImagePath: e }),
			nodeId: n
		}),
		/* @__PURE__ */ W("div", {
			className: "flex gap-2",
			children: [/* @__PURE__ */ U("div", {
				className: "flex-1",
				children: /* @__PURE__ */ U(X, {
					label: "Width",
					controlId: "resize-width",
					render: ({ describedById: n, controlId: r }) => /* @__PURE__ */ U(M, {
						id: r,
						"aria-describedby": n,
						size: "sm",
						min: 1,
						step: 1,
						unit: "px",
						value: e.width,
						onChange: (e) => t({ width: e }),
						onClear: () => t({ width: void 0 }),
						placeholder: "e.g. 512",
						"data-testid": "resize-width"
					})
				})
			}), /* @__PURE__ */ U("div", {
				className: "flex-1",
				children: /* @__PURE__ */ U(X, {
					label: "Height",
					controlId: "resize-height",
					render: ({ describedById: n, controlId: r }) => /* @__PURE__ */ U(M, {
						id: r,
						"aria-describedby": n,
						size: "sm",
						min: 1,
						step: 1,
						unit: "px",
						value: e.height,
						onChange: (e) => t({ height: e }),
						onClear: () => t({ height: void 0 }),
						placeholder: "e.g. 512",
						"data-testid": "resize-height"
					})
				})
			})]
		}),
		/* @__PURE__ */ U(X, {
			label: "Fit mode",
			help: "How the image fits the target dimensions. cover (default) crops, contain letterboxes, fill stretches.",
			controlId: "resize-fit",
			render: ({ describedById: e, controlId: n }) => /* @__PURE__ */ U(j, {
				id: n,
				"aria-describedby": e,
				size: "sm",
				value: r,
				onChange: (e) => t({ fit: e.target.value }),
				options: Io
			})
		}),
		/* @__PURE__ */ U(ka, {
			label: "Do not enlarge if already smaller than target",
			checked: e.withoutEnlargement ?? !1,
			onChange: (e) => t({ withoutEnlargement: e }),
			"data-testid": "resize-without-enlargement"
		}),
		/* @__PURE__ */ U(X, {
			label: "Background colour",
			help: i ? "Hex colour used to fill letterbox padding." : "Only applies when fit is contain or fill.",
			controlId: "resize-background",
			render: ({ describedById: n, controlId: r }) => /* @__PURE__ */ U(k, {
				id: r,
				"aria-describedby": n,
				size: "sm",
				mono: !0,
				spellCheck: !1,
				value: e.background ?? "",
				onChange: (e) => t({ background: e.target.value.trim() || void 0 }),
				placeholder: "#ffffff"
			})
		})
	] });
}
//#endregion
//#region src/components/pipelines/nodes/transform-geo/TransformGeoConfig.tsx
var Ro = "Operations", zo = [
	{
		value: "rotate",
		label: "Rotate"
	},
	{
		value: "flip",
		label: "Flip (vertical)"
	},
	{
		value: "flop",
		label: "Flop (horizontal)"
	}
];
function Bo(e) {
	switch (e) {
		case "rotate": return {
			op: "rotate",
			degrees: 90
		};
		case "flip": return { op: "flip" };
		case "flop": return { op: "flop" };
		default: return {
			op: "rotate",
			degrees: 90
		};
	}
}
function Vo({ op: e, index: t, onUpdate: n, onRemove: r }) {
	let i = e;
	return /* @__PURE__ */ W("div", {
		className: "border border-border rounded-md p-2.5 bg-surface-inset flex flex-col gap-2",
		"data-testid": `geo-op-card-${t}`,
		children: [/* @__PURE__ */ W("div", {
			className: "flex items-center gap-2",
			children: [
				/* @__PURE__ */ W("span", {
					className: "text-[11px] text-text-tertiary font-semibold min-w-[20px]",
					children: [t + 1, "."]
				}),
				/* @__PURE__ */ U(j, {
					size: "sm",
					className: "flex-1",
					value: e.op,
					onChange: (e) => n(Bo(e.target.value)),
					"aria-label": `Op ${t + 1} type`,
					options: zo
				}),
				/* @__PURE__ */ U(h, {
					size: "sm",
					variant: "ghost",
					onClick: r,
					"aria-label": `Remove op ${t + 1}`,
					children: "✕"
				})
			]
		}), e.op === "rotate" && /* @__PURE__ */ W(H, { children: [
			/* @__PURE__ */ W("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ U("span", {
					className: "text-[11px] text-text-tertiary min-w-[60px]",
					children: "Degrees"
				}), /* @__PURE__ */ U(M, {
					size: "sm",
					min: -360,
					max: 360,
					step: 90,
					unit: "°",
					value: i.degrees,
					onChange: (t) => n({
						...e,
						degrees: t
					}),
					"data-testid": `geo-op-degrees-${t}`
				})]
			}),
			/* @__PURE__ */ W("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ U("span", {
					className: "text-[11px] text-text-tertiary min-w-[60px]",
					children: "Background"
				}), /* @__PURE__ */ U(k, {
					size: "sm",
					mono: !0,
					spellCheck: !1,
					value: i.background ?? "",
					onChange: (t) => n({
						...e,
						background: t.target.value.trim() || void 0
					}),
					placeholder: "#000000",
					"aria-label": `Op ${t + 1} background`
				})]
			}),
			/* @__PURE__ */ U(ka, {
				label: "Trim after rotate",
				checked: i.trimAfter ?? !1,
				onChange: (t) => n({
					...e,
					trimAfter: t
				}),
				"data-testid": `geo-op-trim-${t}`
			})
		] })]
	});
}
function Ho({ data: e, onChange: t, nodeId: n }) {
	let r = e.operations ?? [], i = (e, n) => {
		t({ operations: r.map((t, r) => r === e ? n : t) });
	}, a = (e) => {
		t({ operations: r.filter((t, n) => n !== e) });
	}, o = () => {
		t({ operations: [...r, {
			op: "rotate",
			degrees: 90
		}] });
	};
	return /* @__PURE__ */ W(va, { children: [/* @__PURE__ */ U(Oa, {
		value: e.sourceImagePath,
		onChange: (e) => t({ sourceImagePath: e }),
		nodeId: n
	}), /* @__PURE__ */ U(X, {
		label: Ro,
		error: r.length === 0 ? "Add at least one operation." : void 0,
		help: "Applied top-to-bottom. Rotate (any angle), Flip (top-to-bottom mirror), Flop (left-to-right mirror).",
		render: ({ describedById: e, labelId: t }) => /* @__PURE__ */ W("div", {
			role: "group",
			"aria-labelledby": t,
			"aria-describedby": e,
			children: [/* @__PURE__ */ U("div", {
				className: "flex flex-col gap-1.5",
				children: r.map((e, t) => /* @__PURE__ */ U(Vo, {
					op: e,
					index: t,
					onUpdate: (e) => i(t, e),
					onRemove: () => a(t)
				}, t))
			}), /* @__PURE__ */ U("div", {
				className: r.length > 0 ? "mt-2" : "",
				children: /* @__PURE__ */ U(h, {
					size: "sm",
					variant: "secondary",
					onClick: o,
					className: "w-full",
					"data-testid": "add-geo-op-btn",
					children: "+ Add operation"
				})
			})]
		})
	})] });
}
//#endregion
//#region src/components/pipelines/nodes/format-convert/FormatConvertConfig.tsx
var Uo = [
	{
		value: "jpeg",
		label: "JPEG"
	},
	{
		value: "png",
		label: "PNG"
	},
	{
		value: "webp",
		label: "WebP"
	},
	{
		value: "avif",
		label: "AVIF"
	}
], Wo = [
	"jpeg",
	"webp",
	"avif"
], Go = ["webp", "avif"];
function Ko({ data: e, onChange: t, nodeId: n }) {
	let r = e.format ?? "jpeg", i = Wo.includes(r), a = Go.includes(r), o = e.lossless ?? !1;
	return /* @__PURE__ */ W(va, { children: [
		/* @__PURE__ */ U(Oa, {
			value: e.sourceImagePath,
			onChange: (e) => t({ sourceImagePath: e }),
			nodeId: n
		}),
		/* @__PURE__ */ U(X, {
			label: "Output format",
			controlId: "format-convert-format",
			render: ({ describedById: e, controlId: n }) => /* @__PURE__ */ U(j, {
				id: n,
				"aria-describedby": e,
				size: "sm",
				value: r,
				onChange: (e) => t({ format: e.target.value }),
				options: Uo
			})
		}),
		i && /* @__PURE__ */ U(X, {
			label: "Quality",
			help: o ? "Ignored while lossless encoding is on." : "Higher is better quality and a larger file. 80 is a good default. Range 1–100.",
			controlId: "format-convert-quality",
			render: ({ describedById: n, controlId: r }) => /* @__PURE__ */ U(M, {
				id: r,
				"aria-describedby": n,
				size: "sm",
				min: 1,
				max: 100,
				step: 1,
				disabled: o,
				value: e.quality ?? 80,
				onChange: (e) => t({ quality: e }),
				"data-testid": "format-convert-quality"
			})
		}),
		a && /* @__PURE__ */ U(ka, {
			label: "Lossless encoding",
			checked: o,
			onChange: (e) => t({ lossless: e }),
			help: "Overrides quality when on. Larger files, no compression artefacts.",
			"data-testid": "format-convert-lossless"
		}),
		/* @__PURE__ */ U(ka, {
			label: "Strip EXIF and metadata",
			checked: e.stripMetadata ?? !1,
			onChange: (e) => t({ stripMetadata: e }),
			help: "Removes camera EXIF, GPS and copyright tags. Reduces file size; recommended for web delivery.",
			"data-testid": "format-convert-strip-metadata"
		})
	] });
}
//#endregion
//#region src/components/pipelines/nodes/sharpen/SharpenConfig.tsx
function qo({ data: e, onChange: t, nodeId: n }) {
	let r = Da(n ?? null);
	return /* @__PURE__ */ W(va, { children: [
		/* @__PURE__ */ U(X, {
			label: "Source image path",
			help: "Optional. Defaults to the image produced upstream.",
			controlId: "sharpen-source-image-path",
			render: ({ describedById: n, controlId: i }) => /* @__PURE__ */ W(H, { children: [/* @__PURE__ */ U(k, {
				id: i,
				"aria-describedby": n,
				size: "sm",
				mono: !0,
				spellCheck: !1,
				value: e.sourceImagePath ?? "",
				onChange: (e) => t({ sourceImagePath: e.target.value.trim() || void 0 }),
				placeholder: "$.trigger.imageRef"
			}), /* @__PURE__ */ U(ya, {
				samples: r.map((e) => e.path),
				onSelect: (e) => t({ sourceImagePath: e }),
				"aria-label": "Upstream image refs"
			})] })
		}),
		/* @__PURE__ */ U(X, {
			label: "Sigma",
			help: "Gaussian mask sigma. Higher is broader and stronger. Typical range 0.5–3.",
			controlId: "sharpen-sigma",
			render: ({ describedById: n, controlId: r }) => /* @__PURE__ */ U(M, {
				id: r,
				"aria-describedby": n,
				size: "sm",
				min: .01,
				max: 10,
				step: .1,
				value: e.sigma,
				onChange: (e) => t({ sigma: e }),
				onClear: () => t({ sigma: void 0 }),
				placeholder: "1",
				"data-testid": "sharpen-sigma"
			})
		}),
		/* @__PURE__ */ U(X, {
			label: "m1 — flat area level",
			help: "Sharpening applied to flat (smooth) areas of the image.",
			controlId: "sharpen-m1",
			render: ({ describedById: n, controlId: r }) => /* @__PURE__ */ U(M, {
				id: r,
				"aria-describedby": n,
				size: "sm",
				min: 0,
				step: .1,
				value: e.m1,
				onChange: (e) => t({ m1: e }),
				onClear: () => t({ m1: void 0 }),
				placeholder: "leave blank for default",
				"data-testid": "sharpen-m1"
			})
		}),
		/* @__PURE__ */ U(X, {
			label: "m2 — jagged area level",
			help: "Sharpening applied to jagged (edge) areas of the image.",
			controlId: "sharpen-m2",
			render: ({ describedById: n, controlId: r }) => /* @__PURE__ */ U(M, {
				id: r,
				"aria-describedby": n,
				size: "sm",
				min: 0,
				step: .1,
				value: e.m2,
				onChange: (e) => t({ m2: e }),
				onClear: () => t({ m2: void 0 }),
				placeholder: "leave blank for default",
				"data-testid": "sharpen-m2"
			})
		})
	] });
}
//#endregion
//#region src/components/pipelines/nodes/watermark/WatermarkConfig.tsx
var Jo = [
	"northwest",
	"north",
	"northeast",
	"west",
	"center",
	"east",
	"southwest",
	"south",
	"southeast"
].map((e) => ({
	value: e,
	label: e
}));
function Yo({ data: e, onChange: t, nodeId: n }) {
	let r = !e.overlayImageId?.trim();
	return /* @__PURE__ */ W(va, { children: [
		/* @__PURE__ */ U(Oa, {
			value: e.sourceImagePath,
			onChange: (e) => t({ sourceImagePath: e }),
			nodeId: n
		}),
		/* @__PURE__ */ U(X, {
			label: "Overlay image ID",
			required: !0,
			error: r ? "Overlay image ID is required." : void 0,
			help: "The imageId of the watermark image already stored in the blob store.",
			controlId: "watermark-overlay-image-id",
			render: ({ describedById: n, controlId: i }) => /* @__PURE__ */ U(k, {
				id: i,
				"aria-describedby": n,
				size: "sm",
				mono: !0,
				spellCheck: !1,
				invalid: r,
				value: e.overlayImageId ?? "",
				onChange: (e) => t({ overlayImageId: e.target.value.trim() }),
				placeholder: "img_xxxxxxxx"
			})
		}),
		/* @__PURE__ */ U(X, {
			label: "Gravity",
			help: "Where the overlay sits on the source image. Default southeast.",
			controlId: "watermark-gravity",
			render: ({ describedById: n, controlId: r }) => /* @__PURE__ */ U(j, {
				id: r,
				"aria-describedby": n,
				size: "sm",
				value: e.gravity ?? "southeast",
				onChange: (e) => t({ gravity: e.target.value }),
				options: Jo
			})
		}),
		/* @__PURE__ */ U(X, {
			label: "Opacity",
			help: "0 to 1. Default 1.",
			controlId: "watermark-opacity",
			render: ({ describedById: n, controlId: r }) => /* @__PURE__ */ U(M, {
				id: r,
				"aria-describedby": n,
				size: "sm",
				min: 0,
				max: 1,
				step: .05,
				value: e.opacity ?? 1,
				onChange: (e) => t({ opacity: e }),
				"data-testid": "watermark-opacity"
			})
		}),
		/* @__PURE__ */ W("div", {
			className: "flex gap-2",
			children: [/* @__PURE__ */ U("div", {
				className: "flex-1",
				children: /* @__PURE__ */ U(X, {
					label: "Offset X",
					controlId: "watermark-offset-x",
					render: ({ describedById: n, controlId: r }) => /* @__PURE__ */ U(M, {
						id: r,
						"aria-describedby": n,
						size: "sm",
						step: 1,
						unit: "px",
						value: e.offsetX,
						onChange: (e) => t({ offsetX: e }),
						onClear: () => t({ offsetX: void 0 }),
						placeholder: "0",
						"data-testid": "watermark-offset-x"
					})
				})
			}), /* @__PURE__ */ U("div", {
				className: "flex-1",
				children: /* @__PURE__ */ U(X, {
					label: "Offset Y",
					controlId: "watermark-offset-y",
					render: ({ describedById: n, controlId: r }) => /* @__PURE__ */ U(M, {
						id: r,
						"aria-describedby": n,
						size: "sm",
						step: 1,
						unit: "px",
						value: e.offsetY,
						onChange: (e) => t({ offsetY: e }),
						onClear: () => t({ offsetY: void 0 }),
						placeholder: "0",
						"data-testid": "watermark-offset-y"
					})
				})
			})]
		})
	] });
}
//#endregion
//#region src/components/pipelines/vision/useBBoxAuthoring.ts
var Xo = 50;
function Zo(e, t) {
	let [n, r] = V(e), [i, a] = V([]), [o, s] = V([]), c = B(n);
	c.current = n;
	let l = L((e) => {
		let n = c.current, i = e(n);
		c.current = i, a((e) => {
			let t = [...e, n];
			return t.length > Xo && t.shift(), t;
		}), s([]), r(i), t(i);
	}, [t]);
	return {
		boxes: n,
		addBox: L((e) => {
			l((t) => [...t, e]);
		}, [l]),
		moveBox: L((e, t, n) => {
			l((r) => r.map((r) => r.id === e ? {
				...r,
				x: t,
				y: n
			} : r));
		}, [l]),
		resizeBox: L((e, t, n, r, i) => {
			l((a) => a.map((a) => a.id === e ? {
				...a,
				x: t,
				y: n,
				width: r,
				height: i
			} : a));
		}, [l]),
		setLabel: L((e, t) => {
			l((n) => n.map((n) => n.id === e ? {
				...n,
				label: t
			} : n));
		}, [l]),
		deleteBox: L((e) => {
			l((t) => t.filter((t) => t.id !== e));
		}, [l]),
		undo: L(() => {
			if (i.length === 0) return;
			let e = i[i.length - 1], n = c.current;
			c.current = e, s((e) => [...e, n]), a((e) => e.slice(0, -1)), r(e), t(e);
		}, [t, i]),
		redo: L(() => {
			if (o.length === 0) return;
			let e = o[o.length - 1], n = c.current;
			c.current = e, a((e) => {
				let t = [...e, n];
				return t.length > Xo && t.shift(), t;
			}), s((e) => e.slice(0, -1)), r(e), t(e);
		}, [t, o]),
		canUndo: i.length > 0,
		canRedo: o.length > 0
	};
}
//#endregion
//#region src/components/pipelines/vision/BBoxAuthoringCanvas.tsx
function Qo() {
	return typeof crypto < "u" && "randomUUID" in crypto ? crypto.randomUUID() : `bbox-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
function $o(e, t, n) {
	return Math.max(t, Math.min(n, e));
}
function es(e, t) {
	let n = t.getBoundingClientRect();
	return {
		x: $o(e.clientX - n.left, 0, n.width),
		y: $o(e.clientY - n.top, 0, n.height)
	};
}
function ts(e, t, n, r, i, a) {
	let o = i / n, s = a / r;
	return {
		x: e * o,
		y: t * s
	};
}
function ns(e, t, n) {
	return {
		left: `${e.x / t * 100}%`,
		top: `${e.y / n * 100}%`,
		width: `${e.width / t * 100}%`,
		height: `${e.height / n * 100}%`
	};
}
function rs(e, t, n) {
	for (let r = n.length - 1; r >= 0; r--) {
		let i = n[r];
		if (e >= i.x && e <= i.x + i.width && t >= i.y && t <= i.y + i.height) return i;
	}
	return null;
}
function is({ imageUrl: e, imageWidth: t, imageHeight: r, boxes: i, onChange: a, readOnly: o = !1, className: s }) {
	let c = B(null), [l, u] = V({ kind: "idle" }), [d, f] = V(null), p = B(null), { addBox: m, moveBox: h, resizeBox: g, setLabel: _, deleteBox: v } = Zo(i, a);
	R(() => {
		d && p.current && (p.current.focus(), p.current.select());
	}, [d]);
	let y = L((e) => {
		if (o || e.button !== 0) return;
		let n = c.current;
		if (!n) return;
		e.preventDefault(), n.setPointerCapture(e.pointerId);
		let { x: a, y: s } = es(e, n), l = n.getBoundingClientRect(), { x: d, y: f } = ts(a, s, l.width, l.height, t, r), p = rs(d, f, i);
		u(p ? {
			kind: "move",
			id: p.id,
			offsetX: d - p.x,
			offsetY: f - p.y,
			currentX: d,
			currentY: f
		} : {
			kind: "create",
			startX: d,
			startY: f,
			currentX: d,
			currentY: f
		});
	}, [
		o,
		i,
		t,
		r
	]), b = L((e, n, i) => {
		if (o) return;
		e.stopPropagation(), e.preventDefault();
		let a = c.current;
		if (!a) return;
		a.setPointerCapture(e.pointerId);
		let { x: s, y: l } = es(e, a), d = a.getBoundingClientRect(), { x: f, y: p } = ts(s, l, d.width, d.height, t, r);
		u({
			kind: "resize",
			id: n.id,
			corner: i,
			origBox: { ...n },
			currentX: f,
			currentY: p
		});
	}, [
		o,
		t,
		r
	]), x = L((e) => {
		if (l.kind === "idle") return;
		let n = c.current;
		if (!n) return;
		let { x: i, y: a } = es(e, n), o = n.getBoundingClientRect(), { x: s, y: d } = ts(i, a, o.width, o.height, t, r);
		l.kind === "create" ? u((e) => e.kind === "create" ? {
			...e,
			currentX: s,
			currentY: d
		} : e) : l.kind === "move" ? u((e) => e.kind === "move" ? {
			...e,
			currentX: s,
			currentY: d
		} : e) : l.kind === "resize" && u((e) => e.kind === "resize" ? {
			...e,
			currentX: s,
			currentY: d
		} : e);
	}, [
		l.kind,
		t,
		r
	]), S = L((e) => {
		if (l.kind === "create") {
			let e = Math.min(l.startX, l.currentX), t = Math.min(l.startY, l.currentY), n = Math.max(l.startX, l.currentX), r = Math.max(l.startY, l.currentY), i = n - e, a = r - t;
			i >= 4 && a >= 4 && m({
				id: Qo(),
				x: e,
				y: t,
				width: i,
				height: a
			});
		} else if (l.kind === "move") {
			let e = i.find((e) => e.id === l.id);
			if (e) {
				let n = $o(l.currentX - l.offsetX, 0, t - e.width), i = $o(l.currentY - l.offsetY, 0, r - e.height);
				h(l.id, n, i);
			}
		} else if (l.kind === "resize") {
			let { id: e, corner: n, origBox: i, currentX: a, currentY: o } = l, { x: s, y: c, width: u, height: d } = i;
			if (n === "nw") {
				let e = $o(a, 0, s + u - 4), t = $o(o, 0, c + d - 4);
				u = s + u - e, d = c + d - t, s = e, c = t;
			} else if (n === "ne") {
				let e = $o(o, 0, c + d - 4);
				u = $o(a - s, 4, t - s), d = c + d - e, c = e;
			} else if (n === "sw") {
				let e = $o(a, 0, s + u - 4);
				u = s + u - e, d = $o(o - c, 4, r - c), s = e;
			} else u = $o(a - s, 4, t - s), d = $o(o - c, 4, r - c);
			g(e, s, c, u, d);
		}
		u({ kind: "idle" });
	}, [
		l,
		i,
		m,
		h,
		g,
		t,
		r
	]), C = L((e, t) => {
		o || (e.preventDefault(), v(t));
	}, [o, v]), w = L((e, t) => {
		o || (e.key === "Delete" || e.key === "Backspace") && (e.preventDefault(), v(t));
	}, [o, v]), T = L((e, t) => {
		o || (e.stopPropagation(), f({
			id: t.id,
			value: t.label ?? ""
		}));
	}, [o]), E = L(() => {
		d && (_(d.id, d.value), f(null));
	}, [d, _]), D = null;
	if (l.kind === "create") {
		let e = Math.min(l.startX, l.currentX), t = Math.min(l.startY, l.currentY), n = Math.max(l.startX, l.currentX), r = Math.max(l.startY, l.currentY);
		n - e >= 2 && r - t >= 2 && (D = {
			x: e,
			y: t,
			width: n - e,
			height: r - t
		});
	}
	let ee = null;
	if (l.kind === "move") {
		let e = i.find((e) => e.id === l.id);
		if (e) {
			let n = $o(l.currentX - l.offsetX, 0, t - e.width), i = $o(l.currentY - l.offsetY, 0, r - e.height);
			ee = {
				...e,
				x: n,
				y: i
			};
		}
	}
	let O = null;
	if (l.kind === "resize") {
		let { corner: e, origBox: n, currentX: i, currentY: a } = l, { x: o, y: s, width: c, height: u } = n;
		if (e === "nw") {
			let e = $o(i, 0, o + c - 4), t = $o(a, 0, s + u - 4);
			c = o + c - e, u = s + u - t, o = e, s = t;
		} else if (e === "ne") {
			let e = $o(a, 0, s + u - 4);
			c = $o(i - o, 4, t - o), u = s + u - e, s = e;
		} else if (e === "sw") {
			let e = $o(i, 0, o + c - 4);
			c = o + c - e, u = $o(a - s, 4, r - s), o = e;
		} else c = $o(i - o, 4, t - o), u = $o(a - s, 4, r - s);
		O = {
			...n,
			x: o,
			y: s,
			width: c,
			height: u
		};
	}
	let te = /* @__PURE__ */ new Set();
	l.kind === "move" && te.add(l.id), l.kind === "resize" && te.add(l.id);
	let A = (e, t) => /* @__PURE__ */ U("button", {
		type: "button",
		"aria-label": `Resize ${t}`,
		className: n("absolute h-3 w-3 rounded-sm border border-primary bg-white shadow", {
			nw: "-top-1.5 -left-1.5 cursor-nw-resize",
			ne: "-top-1.5 -right-1.5 cursor-ne-resize",
			sw: "-bottom-1.5 -left-1.5 cursor-sw-resize",
			se: "-bottom-1.5 -right-1.5 cursor-se-resize"
		}[t]),
		onPointerDown: (n) => b(n, e, t)
	}, t), ne = (e, i, a, s) => {
		let c = ns(e, t, r), l = d?.id === e.id;
		return /* @__PURE__ */ W("div", {
			role: "none",
			"aria-label": `Bounding box${e.label ? ": " + e.label : ""}`,
			className: n("absolute", i ? "opacity-60" : "opacity-100"),
			style: {
				left: c.left,
				top: c.top,
				width: c.width,
				height: c.height,
				border: "2px solid var(--color-primary)",
				background: "color-mix(in srgb, var(--color-primary) 10%, transparent)",
				borderRadius: 2,
				boxSizing: "border-box"
			},
			children: [l ? /* @__PURE__ */ U(k, {
				ref: p,
				type: "text",
				size: "sm",
				value: d.value,
				onChange: (e) => f((t) => t ? {
					...t,
					value: e.target.value
				} : null),
				onBlur: E,
				onKeyDown: (e) => {
					e.key === "Enter" && (e.preventDefault(), E()), e.key === "Escape" && (e.preventDefault(), f(null));
				},
				"aria-label": "Box label",
				className: "absolute -top-5 left-0 h-5 w-24 border-primary px-1 text-[10px] font-semibold text-primary shadow focus:border-primary focus:ring-primary/40",
				onClick: (e) => e.stopPropagation()
			}) : /* @__PURE__ */ U("button", {
				type: "button",
				tabIndex: 0,
				"aria-label": `Label: ${e.label || "Unlabeled"}. Double-click to edit.`,
				className: "absolute -top-5 left-0 rounded bg-primary px-1.5 py-0.5 text-[10px] font-semibold leading-none text-white shadow",
				style: { whiteSpace: "nowrap" },
				onDoubleClick: (t) => T(t, e),
				onContextMenu: (t) => C(t, e.id),
				onKeyDown: (t) => w(t, e.id),
				children: e.label || "Unlabeled"
			}), a && !o && /* @__PURE__ */ W(H, { children: [
				A(e, "nw"),
				A(e, "ne"),
				A(e, "sw"),
				A(e, "se")
			] })]
		}, s);
	};
	return /* @__PURE__ */ W("div", {
		className: n("relative w-full select-none overflow-hidden rounded-lg border border-border bg-black/5", s),
		"aria-label": "Bounding box authoring canvas",
		"data-testid": "bbox-authoring-canvas",
		children: [
			/* @__PURE__ */ U("img", {
				src: e,
				alt: "",
				className: "block h-auto w-full object-contain",
				draggable: !1
			}),
			/* @__PURE__ */ W("div", {
				ref: c,
				"data-testid": "bbox-authoring-overlay",
				className: n("absolute inset-0", o ? "pointer-events-none" : "cursor-crosshair"),
				onPointerDown: o ? void 0 : y,
				onPointerMove: o ? void 0 : x,
				onPointerUp: o ? void 0 : S,
				children: [
					i.map((e) => te.has(e.id) ? null : ne(e, !1, !0, `box-${e.id}`)),
					ee && ne(ee, !0, !1, "ghost-move"),
					O && ne(O, !0, !0, "ghost-resize"),
					(() => {
						if (!D) return null;
						let e = ns(D, t, r);
						return /* @__PURE__ */ U("div", {
							"aria-hidden": !0,
							className: "pointer-events-none absolute",
							style: {
								left: e.left,
								top: e.top,
								width: e.width,
								height: e.height,
								border: "2px dashed var(--color-primary)",
								background: "color-mix(in srgb, var(--color-primary) 8%, transparent)",
								borderRadius: 2,
								boxSizing: "border-box",
								opacity: .8
							}
						}, "ghost-create");
					})()
				]
			}),
			!o && /* @__PURE__ */ U("div", {
				className: "pointer-events-none absolute bottom-1.5 right-2 rounded bg-black/40 px-1.5 py-0.5 text-[10px] text-white/80",
				children: "Drag to add box"
			})
		]
	});
}
//#endregion
//#region src/components/pipelines/nodes/crop/CropConfig.tsx
var as = [
	"$.scatter.item.bbox",
	"$.steps.visionAnalyze.output.extracted.regions[0].bbox",
	"$.trigger.payload.bbox"
], os = "crop-region", ss = "crop", cs = "Crop region", ls = "text-[11px] text-text-tertiary mt-0.5";
function us(e) {
	let { definition: t } = me() ?? { definition: null }, n = z(() => !e || !t ? null : t.edges.find((t) => t.target === e)?.source ?? null, [t, e]), r = I(n ?? "")?.images?.[0];
	return r ? {
		imageId: r.imageId,
		width: r.width,
		height: r.height
	} : null;
}
function ds({ data: e, onChange: t, currentNodeId: r }) {
	Da(r ?? null);
	let i = e.materialize !== !1, a = us(r), o = Ve(), s = z(() => e.bbox ? [{
		id: os,
		x: e.bbox.x,
		y: e.bbox.y,
		width: e.bbox.width,
		height: e.bbox.height,
		label: ss
	}] : [], [e.bbox]), c = L((e) => {
		if (e.length === 0) {
			t({ bbox: void 0 });
			return;
		}
		let n = e[e.length - 1];
		t({ bbox: {
			x: Math.round(n.x),
			y: Math.round(n.y),
			width: Math.round(n.width),
			height: Math.round(n.height)
		} });
	}, [t]);
	return /* @__PURE__ */ W(va, { children: [
		/* @__PURE__ */ U(Oa, {
			value: e.sourceImagePath,
			onChange: (e) => t({ sourceImagePath: e }),
			nodeId: r ?? void 0,
			help: "JSONPath to the imageId of the source image. Defaults server-side to $.scatter.parentImageId.",
			placeholder: "$.scatter.parentImageId"
		}),
		/* @__PURE__ */ U(X, {
			label: "Bounding-box path",
			help: "Optional. JSONPath to a bbox object { x, y, width, height } in pixels. Overrides the manual crop region below when present at run time.",
			controlId: "crop-bbox-path",
			render: ({ describedById: n, controlId: r, labelId: i }) => /* @__PURE__ */ W(H, { children: [/* @__PURE__ */ U(k, {
				id: r,
				"aria-describedby": n,
				size: "sm",
				mono: !0,
				spellCheck: !1,
				value: e.bboxPath ?? "",
				onChange: (e) => t({ bboxPath: e.target.value.trim() || void 0 }),
				placeholder: "$.scatter.item.bbox"
			}), /* @__PURE__ */ U(ya, {
				samples: as,
				onSelect: (e) => t({ bboxPath: e }),
				"aria-label": "Common bbox paths"
			})] })
		}),
		/* @__PURE__ */ W("div", {
			"data-testid": "crop-region-section",
			role: "group",
			"aria-label": cs,
			children: [/* @__PURE__ */ U(X, {
				label: cs,
				help: "Optional. Drag on the source image to paint the crop box. Drawing a new box replaces the previous one.",
				children: /* @__PURE__ */ U(H, {})
			}), a ? /* @__PURE__ */ W(H, { children: [/* @__PURE__ */ U(is, {
				imageUrl: o(a.imageId),
				imageWidth: a.width,
				imageHeight: a.height,
				boxes: s,
				onChange: c,
				className: "mt-1.5"
			}), /* @__PURE__ */ U("div", {
				className: "mt-1.5 flex flex-wrap gap-1",
				"data-testid": "crop-region-chips",
				children: e.bbox ? /* @__PURE__ */ W(H, { children: [
					/* @__PURE__ */ W(S, {
						tone: "neutral",
						size: "xs",
						mono: !0,
						"data-testid": "crop-chip-x",
						children: ["x: ", e.bbox.x]
					}),
					/* @__PURE__ */ W(S, {
						tone: "neutral",
						size: "xs",
						mono: !0,
						"data-testid": "crop-chip-y",
						children: ["y: ", e.bbox.y]
					}),
					/* @__PURE__ */ W(S, {
						tone: "neutral",
						size: "xs",
						mono: !0,
						"data-testid": "crop-chip-width",
						children: ["w: ", e.bbox.width]
					}),
					/* @__PURE__ */ W(S, {
						tone: "neutral",
						size: "xs",
						mono: !0,
						"data-testid": "crop-chip-height",
						children: ["h: ", e.bbox.height]
					})
				] }) : /* @__PURE__ */ U("span", {
					className: n(ls, "italic"),
					children: "No crop region yet — drag on the image to add one."
				})
			})] }) : /* @__PURE__ */ U(y, {
				variant: "info",
				className: "mt-1.5",
				"data-testid": "crop-region-empty-banner",
				children: "Run the upstream node once to populate the source image, then drag here to paint a crop region."
			})]
		}),
		/* @__PURE__ */ U(ka, {
			label: "Persist crop to blob store",
			checked: i,
			onChange: (e) => t({ materialize: e }),
			help: "On by default. The cropped image is saved to the image blob store.",
			"data-testid": "crop-materialize"
		})
	] });
}
function fs(e) {
	let { selectedNodeId: t } = me() ?? { selectedNodeId: null };
	return /* @__PURE__ */ U(ds, {
		...e,
		currentNodeId: t
	});
}
//#endregion
//#region src/components/pipelines/nodes/adjust-bw/AdjustBwConfig.tsx
var ps = [
	{
		value: "luminosity",
		label: "Luminosity — 0.21R + 0.72G + 0.07B (perceptually accurate)"
	},
	{
		value: "average",
		label: "Average — (R+G+B)/3 (fast, flat)"
	},
	{
		value: "desaturate",
		label: "Desaturate — (max+min)/2 (Lightness channel)"
	}
];
function ms({ data: e, onChange: t, nodeId: n }) {
	let r = e.algorithm ?? "luminosity", i = e.contrast ?? 1;
	return /* @__PURE__ */ W(va, { children: [
		/* @__PURE__ */ U(Oa, {
			value: e.sourceImagePath,
			onChange: (e) => t({ sourceImagePath: e }),
			nodeId: n,
			help: "JSONPath to the imageId of the source image.",
			placeholder: "$.scatter.parentImageId"
		}),
		/* @__PURE__ */ U(X, {
			label: "Greyscale algorithm",
			help: "Controls how RGB channels are weighted when converting to greyscale.",
			controlId: "adjust-bw-algorithm",
			render: ({ describedById: e, controlId: n }) => /* @__PURE__ */ U(j, {
				id: n,
				"aria-describedby": e,
				size: "sm",
				value: r,
				onChange: (e) => t({ algorithm: e.target.value }),
				options: ps
			})
		}),
		/* @__PURE__ */ U(X, {
			label: "Contrast multiplier",
			help: "Applied after greyscale conversion. 1 is no change, below 1 lowers contrast, above 1 raises it. Range 0–4.",
			controlId: "adjust-bw-contrast",
			render: ({ describedById: e, controlId: n }) => /* @__PURE__ */ U(M, {
				id: n,
				"aria-describedby": e,
				size: "sm",
				min: 0,
				max: 4,
				step: .05,
				value: i,
				onChange: (e) => t({ contrast: e }),
				"data-testid": "adjust-bw-contrast"
			})
		})
	] });
}
//#endregion
//#region src/components/image/ImageUploader.tsx
function hs({ value: e, onChange: t, uploadImage: r, getImageUrl: i, maxSize: a = 8388608, accept: o = "image/*", fileOnly: s = !1, urlOnly: c = !1, className: l, "data-testid": u }) {
	let [d, f] = V(!1), [p, m] = V(null), [g, _] = V("");
	async function v(e) {
		f(!0), m(null);
		try {
			t(await r(e)), _("");
		} catch (e) {
			let t = e instanceof Error ? e.message : "Upload failed. Please try again.";
			m(t);
		} finally {
			f(!1);
		}
	}
	function y(e) {
		e.length > 0 && v(e[0]);
	}
	async function b() {
		let e = g.trim();
		e && await v({ url: e });
	}
	if (e) {
		let r = i(e.imageId);
		return /* @__PURE__ */ U("div", {
			className: n("flex flex-col gap-3", l),
			"data-testid": u,
			children: /* @__PURE__ */ W("div", {
				className: "flex items-start gap-3",
				children: [/* @__PURE__ */ U(Pe, {
					src: r,
					alt: "Uploaded image",
					size: "md",
					aspectRatio: "square",
					"data-testid": u ? `${u}-thumbnail` : void 0
				}), /* @__PURE__ */ U(h, {
					variant: "ghost",
					size: "sm",
					onClick: () => t(null),
					"data-testid": u ? `${u}-replace` : void 0,
					children: "Replace"
				})]
			})
		});
	}
	return /* @__PURE__ */ W("div", {
		className: n("flex flex-col gap-3", l),
		"data-testid": u,
		children: [
			d && /* @__PURE__ */ U("p", {
				className: "text-sm text-neutral",
				"data-testid": u ? `${u}-uploading` : void 0,
				children: "Uploading..."
			}),
			!c && /* @__PURE__ */ U(te, {
				accept: o,
				maxSize: a,
				onFiles: y,
				disabled: d,
				"data-testid": u ? `${u}-drop` : void 0
			}),
			!s && /* @__PURE__ */ W("div", {
				className: "flex items-center gap-2",
				"data-testid": u ? `${u}-url-row` : void 0,
				children: [/* @__PURE__ */ U(k, {
					type: "url",
					placeholder: "https://example.com/image.jpg",
					value: g,
					onChange: (e) => _(e.target.value),
					disabled: d,
					"data-testid": u ? `${u}-url-input` : void 0,
					onKeyDown: (e) => {
						e.key === "Enter" && b();
					}
				}), /* @__PURE__ */ U(h, {
					variant: "secondary",
					size: "sm",
					onClick: () => void b(),
					disabled: d || !g.trim(),
					"data-testid": u ? `${u}-fetch-btn` : void 0,
					children: "Fetch"
				})]
			}),
			p && /* @__PURE__ */ U("p", {
				role: "alert",
				className: "text-sm text-danger-fg",
				"data-testid": u ? `${u}-error` : void 0,
				children: p
			})
		]
	});
}
function gs(e) {
	let t = Ne(), n = t.uploadImage;
	return n ? /* @__PURE__ */ U(hs, {
		...e,
		uploadImage: n,
		getImageUrl: t.getImageUrl
	}) : /* @__PURE__ */ U("div", {
		className: "text-sm text-neutral",
		children: "This host has not wired uploadImage. Cannot accept new uploads."
	});
}
//#endregion
//#region src/components/pipelines/nodes/adjust-layer/AdjustLayerSliderPanel.tsx
var _s = {
	brightness: "Brightness",
	contrast: "Contrast",
	saturation: "Saturation",
	hue: "Hue",
	blur: "Blur"
}, vs = Object.keys(_s).map((e) => ({
	value: e,
	label: _s[e]
})), ys = {
	brightness: {
		min: 0,
		max: 2,
		step: .01,
		unit: "×",
		defaultValue: 1
	},
	contrast: {
		min: 0,
		max: 2,
		step: .01,
		unit: "×",
		defaultValue: 1
	},
	saturation: {
		min: 0,
		max: 2,
		step: .01,
		unit: "×",
		defaultValue: 1
	},
	hue: {
		min: -180,
		max: 180,
		step: 1,
		unit: "°",
		defaultValue: 0
	},
	blur: {
		min: 0,
		max: 50,
		step: .5,
		unit: "px",
		defaultValue: 1
	}
};
function bs(e) {
	switch (e) {
		case "brightness": return {
			kind: e,
			value: 1
		};
		case "contrast": return {
			kind: e,
			value: 1
		};
		case "saturation": return {
			kind: e,
			value: 1
		};
		case "hue": return {
			kind: e,
			degrees: 0
		};
		case "blur": return {
			kind: e,
			radiusPx: 1
		};
	}
}
function xs(e) {
	switch (e.kind) {
		case "hue": return e.degrees;
		case "blur": return e.radiusPx;
		default: return e.value;
	}
}
function Ss(e, t) {
	switch (e.kind) {
		case "hue": return {
			kind: "hue",
			degrees: t
		};
		case "blur": return {
			kind: "blur",
			radiusPx: t
		};
		default: return {
			kind: e.kind,
			value: t
		};
	}
}
var Cs = n("w-4 h-full flex items-center justify-center", "text-[14px] text-text-tertiary cursor-grab select-none shrink-0");
n("text-[11px] font-semibold px-2 py-0.5 rounded-full", "bg-surface-hover border border-border text-text-secondary", "whitespace-nowrap shrink-0");
function ws({ layer: e, index: t, onUpdate: r, onRemove: i }) {
	let a = ys[e.kind] ?? {
		min: 0,
		max: 100,
		step: 1
	}, o = xs(e), s = (e) => {
		r(bs(e.target.value));
	}, c = (t) => {
		r(Ss(e, t));
	};
	return /* @__PURE__ */ W("div", {
		className: "flex items-center gap-2 px-2 py-1.5 rounded-md border border-border bg-surface-inset",
		"data-testid": `layer-row-${t}`,
		children: [
			/* @__PURE__ */ U("span", {
				className: Cs,
				"aria-hidden": "true",
				title: "Drag handle",
				children: "⠿"
			}),
			/* @__PURE__ */ U(j, {
				value: e.kind,
				onChange: s,
				options: vs,
				size: "sm",
				"aria-label": `Layer ${t + 1} kind`,
				"data-testid": `layer-kind-select-${t}`,
				className: "shrink-0"
			}),
			/* @__PURE__ */ U(N, {
				min: a.min,
				max: a.max,
				step: a.step,
				value: o,
				onChange: c,
				readout: !1,
				className: "flex-1 min-w-0",
				"aria-label": `${_s[e.kind]} slider`,
				"data-testid": `layer-slider-${t}`
			}),
			/* @__PURE__ */ U(M, {
				value: o,
				onChange: c,
				min: a.min,
				max: a.max,
				step: a.step,
				unit: a.unit,
				size: "sm",
				"data-testid": `layer-number-${t}`
			}),
			/* @__PURE__ */ U("button", {
				type: "button",
				onClick: i,
				className: n("shrink-0 w-6 h-6 flex items-center justify-center rounded", "text-[12px] text-text-tertiary bg-transparent border-none", "cursor-pointer hover:text-danger-fg hover:bg-danger-bg"),
				"aria-label": `Remove layer ${t + 1}`,
				"data-testid": `layer-remove-${t}`,
				children: "✕"
			})
		]
	});
}
var Ts = 150;
function Es(e, t, n) {
	let [r, i] = V(null), [a, o] = V(!1), s = B(null), c = B(null), l = L(async (e, t) => {
		c.current?.abort();
		let r = new AbortController();
		c.current = r, o(!0);
		try {
			let a = await fetch(`${n}/api/pipeline/preview/adjust-layer`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					imageId: e,
					layers: t
				}),
				signal: r.signal
			});
			if (!a.ok) return;
			let o = await a.json();
			o.dataUrl && i(o.dataUrl);
		} catch {} finally {
			o(!1);
		}
	}, [n]);
	return R(() => {
		if (!e) {
			i(null);
			return;
		}
		return s.current && clearTimeout(s.current), s.current = setTimeout(() => {
			l(e, t);
		}, Ts), () => {
			s.current && clearTimeout(s.current);
		};
	}, [
		e,
		JSON.stringify(t),
		l
	]), R(() => () => c.current?.abort(), []), {
		previewSrc: r,
		loading: a
	};
}
function Ds(e) {
	return e.length <= 8 ? e : `${e.slice(0, 8)}…`;
}
function Os({ layers: e, onChange: t, autoSourceImageId: r, pinnedSourceImageId: i, onPinnedSourceImageIdChange: a, sourceImageId: o, apiBase: s = "" }) {
	let [c, l] = V("brightness"), [u, d] = V(!1), f = r ?? o, p = i ?? f, m = !!i, { previewSrc: g, loading: _ } = Es(p, e, s), v = () => {
		a?.(void 0);
	}, y = (e) => {
		e?.imageId && (a?.(e.imageId), d(!1));
	}, b = (n, r) => {
		t(e.map((e, t) => t === n ? r : e));
	}, x = (n) => {
		t(e.filter((e, t) => t !== n));
	};
	return /* @__PURE__ */ W("div", {
		className: "flex gap-3 p-3",
		"data-testid": "adjust-layer-slider-panel",
		children: [/* @__PURE__ */ W("div", {
			className: "flex-1 flex flex-col gap-2 min-w-0",
			children: [
				e.length === 0 && /* @__PURE__ */ U("div", {
					className: "text-[11px] text-text-tertiary italic",
					children: "No layers — add one below."
				}),
				e.map((e, t) => /* @__PURE__ */ U(ws, {
					layer: e,
					index: t,
					onUpdate: (e) => b(t, e),
					onRemove: () => x(t)
				}, t)),
				/* @__PURE__ */ W("div", {
					className: "flex items-center gap-2 mt-1",
					children: [/* @__PURE__ */ U(j, {
						value: c,
						onChange: (e) => {
							l(e.target.value);
						},
						options: vs,
						size: "sm",
						"aria-label": "New layer kind",
						"data-testid": "new-layer-kind-select"
					}), /* @__PURE__ */ U("button", {
						type: "button",
						onClick: () => {
							t([...e, bs(c)]);
						},
						className: n("text-[12px] font-semibold px-3 py-1 rounded-md cursor-pointer", "bg-primary text-white border-none hover:bg-primary/90"),
						"data-testid": "add-layer-btn",
						children: "+ Add layer"
					})]
				})
			]
		}), /* @__PURE__ */ W("div", {
			className: "shrink-0 flex flex-col items-stretch gap-1.5",
			children: [
				/* @__PURE__ */ U("div", {
					className: "text-[11px] font-semibold text-text-tertiary",
					children: "Preview"
				}),
				/* @__PURE__ */ W("div", {
					className: n("flex items-center gap-1.5 flex-wrap"),
					"data-testid": "adjust-layer-source-caption-row",
					children: [m && p ? /* @__PURE__ */ W(S, {
						tone: "neutral",
						size: "xs",
						"data-testid": "adjust-layer-source-chip-pinned",
						children: [/* @__PURE__ */ W("span", { children: [
							"Source: pinned (",
							Ds(p),
							")"
						] }), /* @__PURE__ */ U("button", {
							type: "button",
							onClick: v,
							"aria-label": "Clear pinned source image",
							"data-testid": "adjust-layer-source-clear-pin",
							className: n("ml-1 inline-flex items-center justify-center", "w-3 h-3 rounded-full text-[10px] leading-none", "bg-transparent border-none cursor-pointer text-current", "hover:bg-surface-emphasis"),
							children: "×"
						})]
					}) : f ? /* @__PURE__ */ W(S, {
						tone: "info",
						size: "xs",
						"data-testid": "adjust-layer-source-chip-auto",
						children: [
							"Source: ",
							Ds(f),
							" from upstream run"
						]
					}) : null, a && /* @__PURE__ */ U(h, {
						variant: "ghost",
						size: "sm",
						onClick: () => d((e) => !e),
						"data-testid": "adjust-layer-override-btn",
						children: "Override"
					})]
				}),
				u && a && /* @__PURE__ */ U("div", {
					className: "w-48",
					"data-testid": "adjust-layer-override-uploader-wrap",
					children: /* @__PURE__ */ U(gs, {
						value: null,
						onChange: y,
						"data-testid": "adjust-layer-override-uploader"
					})
				}),
				p ? /* @__PURE__ */ W("div", {
					className: "relative",
					children: [/* @__PURE__ */ U(Pe, {
						src: g ?? "",
						alt: "Adjust layer preview",
						size: "lg",
						aspectRatio: "auto",
						loading: "eager",
						"data-testid": "adjust-layer-preview-thumb"
					}), _ && /* @__PURE__ */ U("div", {
						className: "absolute inset-0 flex items-center justify-center bg-white/60 rounded-md",
						children: /* @__PURE__ */ U("span", {
							className: "text-[11px] text-text-secondary",
							children: "Loading…"
						})
					})]
				}) : /* @__PURE__ */ U("div", {
					className: n("w-48 h-32 rounded-md border border-dashed border-border", "flex items-center justify-center text-[11px] text-text-tertiary", "bg-surface-inset"),
					"data-testid": "adjust-layer-no-source",
					children: "No source image"
				})
			]
		})]
	});
}
//#endregion
//#region src/components/pipelines/nodes/adjust-layer/AdjustLayerConfig.tsx
var ks = "Adjustment layers";
function As(e) {
	let { definition: t } = me() ?? { definition: null }, n = z(() => !e || !t ? null : t.edges.find((t) => t.target === e)?.source ?? null, [t, e]);
	return I(n ?? "")?.images?.[0]?.imageId;
}
function js({ data: e, onChange: t, currentNodeId: n }) {
	Da(n ?? null);
	let r = As(n), i = e.previewSourceImageId, a = e.layers ?? [];
	return /* @__PURE__ */ W(va, { children: [/* @__PURE__ */ U(Oa, {
		value: e.sourceImagePath,
		onChange: (e) => t({ sourceImagePath: e }),
		nodeId: n ?? void 0,
		help: "JSONPath to the imageId of the source image.",
		placeholder: "$.scatter.parentImageId"
	}), /* @__PURE__ */ U(X, {
		label: ks,
		help: "Applied top-to-bottom.",
		render: ({ describedById: e, labelId: n }) => /* @__PURE__ */ U("div", {
			role: "group",
			"aria-labelledby": n,
			"aria-describedby": e,
			children: /* @__PURE__ */ U(Os, {
				layers: a,
				onChange: (e) => t({ layers: e }),
				autoSourceImageId: r,
				pinnedSourceImageId: i,
				onPinnedSourceImageIdChange: (e) => t({ previewSourceImageId: e })
			})
		})
	})] });
}
function Ms(e) {
	let { selectedNodeId: t } = me() ?? { selectedNodeId: null };
	return /* @__PURE__ */ U(js, {
		...e,
		currentNodeId: t
	});
}
//#endregion
//#region src/components/pipelines/nodes/dimensions/DimensionsConfig.tsx
var Ns = 1024;
function Ps({ data: e, onChange: t, nodeId: n }) {
	return /* @__PURE__ */ W(va, { children: [/* @__PURE__ */ U(Oa, {
		value: e.sourceImagePath,
		onChange: (e) => t({ sourceImagePath: e }),
		nodeId: n
	}), /* @__PURE__ */ U(X, {
		label: "Max edge",
		help: "Longest-edge cap. The derived genWidth/genHeight scale to fit within it while preserving aspect ratio — wire them into image:generate.",
		controlId: "dimensions-max-edge",
		render: ({ describedById: n, controlId: r }) => /* @__PURE__ */ U(M, {
			id: r,
			"aria-describedby": n,
			size: "sm",
			min: 1,
			step: 1,
			unit: "px",
			value: e.maxEdge ?? Ns,
			onChange: (e) => t({ maxEdge: e }),
			"data-testid": "dimensions-max-edge"
		})
	})] });
}
//#endregion
//#region src/components/pipelines/nodes/upscale/UpscaleConfig.tsx
var Fs = 1024;
function Is({ data: e, onChange: t, nodeId: n }) {
	return /* @__PURE__ */ W(va, { children: [
		/* @__PURE__ */ U(X, {
			label: "Prompt",
			help: "Optional text guidance forwarded to the upscaler.",
			controlId: "upscale-prompt",
			render: ({ describedById: n, controlId: r }) => /* @__PURE__ */ U(A, {
				id: r,
				"aria-describedby": n,
				rows: 3,
				spellCheck: !1,
				value: e.prompt ?? "",
				onChange: (e) => t({ prompt: e.target.value.trim() ? e.target.value : void 0 }),
				placeholder: "optional guidance forwarded to the upscaler"
			})
		}),
		/* @__PURE__ */ U(X, {
			label: "Max edge",
			help: "Longest-edge cap applied before the super-resolution pass.",
			controlId: "upscale-max-edge",
			render: ({ describedById: n, controlId: r }) => /* @__PURE__ */ U(M, {
				id: r,
				"aria-describedby": n,
				size: "sm",
				min: 1,
				step: 1,
				unit: "px",
				value: e.maxEdge ?? Fs,
				onChange: (e) => t({ maxEdge: e }),
				"data-testid": "upscale-max-edge"
			})
		}),
		/* @__PURE__ */ U(Oa, {
			value: e.sourceImagePath,
			onChange: (e) => t({ sourceImagePath: e }),
			nodeId: n
		})
	] });
}
//#endregion
//#region src/components/pipelines/nodes/vision/VisionConfig.tsx
var Ls = [
	{ value: "claude-opus-4-7" },
	{ value: "claude-sonnet-4-6" },
	{ value: "claude-haiku-4-5-20251001" }
];
function Rs(e) {
	if (!e) return !1;
	let t = e.properties;
	if (!t || typeof t != "object" || Array.isArray(t)) return !1;
	let n = t.regions;
	return typeof n == "object" && !!n;
}
function zs(e) {
	let t = e.trim();
	if (t.length === 0) return {
		ok: !0,
		value: void 0
	};
	try {
		let e = JSON.parse(t);
		return typeof e != "object" || !e || Array.isArray(e) ? {
			ok: !1,
			error: "Schema must be a JSON object"
		} : {
			ok: !0,
			value: e
		};
	} catch (e) {
		return {
			ok: !1,
			error: e.message
		};
	}
}
var Bs = "{\n  \"type\": \"object\",\n  \"properties\": {\n    \"caption\": { \"type\": \"string\" }\n  }\n}";
function Vs({ data: e, onChange: t, nodeId: n }) {
	let r = ut(), i = Da(n ?? null), a = Me("image:vision-analyze", Ls), [o, s] = V(!1), [c, l] = V(e.outputSchema ? JSON.stringify(e.outputSchema, null, 2) : ""), [u, d] = V(null), f = !e.userPrompt?.trim(), p = !e.imageRefPath?.trim(), m = !!e.imageRefPath && !e.imageRefPath.startsWith("$."), h = Rs(e.outputSchema), g = L((e) => {
		t({ seedRegions: e });
	}, [t]), _ = (e) => {
		l(e);
		let n = zs(e);
		if (!n.ok) {
			d(n.error);
			return;
		}
		d(null), t({ outputSchema: n.value });
	}, v = p ? "Image reference path is required." : m ? "Path must start with $." : void 0;
	return /* @__PURE__ */ W(va, { children: [
		/* @__PURE__ */ U(X, {
			label: "Model",
			help: "Requires the host's vision credentials on the executor.",
			controlId: `${r}-model`,
			render: ({ controlId: n, describedById: r }) => /* @__PURE__ */ U(j, {
				size: "sm",
				id: n,
				"aria-describedby": r,
				value: e.model ?? "claude-sonnet-4-6",
				onChange: (e) => t({ model: e.target.value }),
				options: a.map((e) => ({
					value: e.value,
					label: e.label ?? e.value
				}))
			})
		}),
		/* @__PURE__ */ U(X, {
			label: "Image reference path",
			required: !0,
			error: v,
			help: "JSONPath into context. The value must be a string imageId, or an object with one.",
			controlId: `${r}-image-ref-path`,
			render: ({ controlId: n, describedById: r }) => /* @__PURE__ */ W(H, { children: [/* @__PURE__ */ U(k, {
				size: "sm",
				mono: !0,
				spellCheck: !1,
				invalid: !!v,
				id: n,
				"aria-describedby": r,
				value: e.imageRefPath ?? "",
				onChange: (e) => t({ imageRefPath: e.target.value }),
				placeholder: "$.trigger.imageRef"
			}), /* @__PURE__ */ U(ya, {
				samples: i.map((e) => e.path),
				onSelect: (e) => t({ imageRefPath: e }),
				"aria-label": "Upstream image refs"
			})] })
		}),
		/* @__PURE__ */ U(X, {
			label: "User prompt",
			required: !0,
			error: f ? "User prompt is required." : void 0,
			help: "Supports {{ context.* }} substitution.",
			controlId: `${r}-user-prompt`,
			render: ({ controlId: n, describedById: r }) => /* @__PURE__ */ U(A, {
				rows: 4,
				invalid: f,
				id: n,
				"aria-describedby": r,
				value: e.userPrompt,
				onChange: (e) => t({ userPrompt: e.target.value })
			})
		}),
		h && /* @__PURE__ */ U(X, {
			label: "Focus regions",
			help: "Drag on the image to paint focus boxes. The next vision pass uses these as analysis hints.",
			render: ({ describedById: t, labelId: n }) => /* @__PURE__ */ W("div", {
				role: "group",
				"aria-labelledby": n,
				"aria-describedby": t,
				children: [/* @__PURE__ */ U(is, {
					imageUrl: "",
					imageWidth: 800,
					imageHeight: 600,
					boxes: e.seedRegions ?? [],
					onChange: g
				}), (e.seedRegions?.length ?? 0) > 0 && /* @__PURE__ */ W("div", {
					className: "text-[11px] text-text-tertiary mt-0.5",
					"data-testid": "bbox-region-count",
					children: [
						e.seedRegions.length,
						" region",
						e.seedRegions.length === 1 ? "" : "s",
						" defined."
					]
				})]
			})
		}),
		/* @__PURE__ */ U(X, {
			label: "Output schema",
			error: u ? `Invalid JSON: ${u}` : void 0,
			help: e.outputSchema ? "Extract mode — the model must return JSON matching this schema." : "Leave blank for caption mode (freeform analysis text).",
			controlId: `${r}-output-schema`,
			render: ({ controlId: e, describedById: t }) => /* @__PURE__ */ U(A, {
				rows: 6,
				invalid: !!u,
				className: "font-mono text-[11px]",
				id: e,
				"aria-describedby": t,
				value: c,
				onChange: (e) => _(e.target.value),
				placeholder: Bs
			})
		}),
		/* @__PURE__ */ W("div", { children: [/* @__PURE__ */ W("button", {
			type: "button",
			onClick: () => s((e) => !e),
			"aria-expanded": o,
			className: "bg-transparent border-none p-0 cursor-pointer font-inherit text-[12px] font-semibold text-text-secondary flex items-center gap-1",
			children: [/* @__PURE__ */ U("span", {
				"aria-hidden": "true",
				children: o ? "▾" : "▸"
			}), " Advanced"]
		}), o && /* @__PURE__ */ W("div", {
			className: "flex flex-col gap-3 mt-2",
			children: [/* @__PURE__ */ U(X, {
				label: "Max output tokens",
				help: "Caps the response length. Default 2048.",
				controlId: `${r}-max-output-tokens`,
				render: ({ controlId: n, describedById: r }) => /* @__PURE__ */ U(M, {
					size: "sm",
					min: 1,
					max: 8192,
					value: e.maxOutputTokens,
					onChange: (e) => t({ maxOutputTokens: e }),
					onClear: () => t({ maxOutputTokens: void 0 }),
					id: n,
					"aria-describedby": r,
					"data-testid": "vision-max-output-tokens"
				})
			}), /* @__PURE__ */ U(X, {
				label: "System prompt override",
				help: "Schema instructions are auto-appended when an output schema is set.",
				controlId: `${r}-system-prompt`,
				render: ({ controlId: n, describedById: r }) => /* @__PURE__ */ U(A, {
					rows: 2,
					id: n,
					"aria-describedby": r,
					value: e.systemPrompt ?? "",
					onChange: (e) => t({ systemPrompt: e.target.value || void 0 }),
					placeholder: "Leave blank to use the canned vision system prompt."
				})
			})]
		})] })
	] });
}
//#endregion
//#region src/components/pipelines/nodes/vision-tag/VisionTagConfig.tsx
var Hs = [{
	value: "claude-haiku-4-5",
	label: "Claude Haiku 4.5 (default — fast)"
}, {
	value: "claude-sonnet-4-6",
	label: "Claude Sonnet 4.6 (more accurate)"
}];
function Us({ data: e, onChange: t, nodeId: n }) {
	let r = Me("image:vision", Hs), i = !e.imageRefPath?.trim();
	return /* @__PURE__ */ W(va, { children: [
		/* @__PURE__ */ U(Oa, {
			value: e.imageRefPath,
			onChange: (e) => t({ imageRefPath: e ?? "" }),
			nodeId: n,
			label: "Image ref path",
			help: i ? "Required — JSONPath to the imageId to tag." : "JSONPath to the imageId to tag."
		}),
		/* @__PURE__ */ U(X, {
			label: "Candidate tags",
			help: "Restricts tagging to this vocabulary. Leave empty for open-ended tags.",
			children: /* @__PURE__ */ U(d, {
				value: e.candidateTags ?? [],
				onChange: (e) => t({ candidateTags: e }),
				placeholder: "Add candidate tag…",
				lowercase: !1
			})
		}),
		/* @__PURE__ */ U(X, {
			label: "Max tags",
			help: "Default 10.",
			controlId: "vision-tag-max-tags",
			render: ({ describedById: n, controlId: r }) => /* @__PURE__ */ U(M, {
				size: "sm",
				min: 1,
				max: 50,
				step: 1,
				id: r,
				"aria-describedby": n,
				value: e.maxTags ?? 10,
				onChange: (e) => t({ maxTags: e }),
				"data-testid": "vision-tag-max-tags"
			})
		}),
		/* @__PURE__ */ U(X, {
			label: "Model",
			children: /* @__PURE__ */ U(j, {
				size: "sm",
				value: e.model ?? r[0]?.value ?? "",
				onChange: (e) => t({ model: e.target.value }),
				"aria-label": "Model",
				options: r.map((e) => ({
					value: e.value,
					label: e.label ?? e.value
				}))
			})
		}),
		/* @__PURE__ */ U(X, {
			label: "System prompt override",
			help: "Optional. Sent verbatim — {{context.*}} is NOT substituted here.",
			children: /* @__PURE__ */ U(A, {
				rows: 3,
				spellCheck: !1,
				value: e.systemPrompt ?? "",
				onChange: (e) => t({ systemPrompt: e.target.value || void 0 }),
				placeholder: "Leave blank to use the default tagging system prompt.",
				"aria-label": "System prompt override"
			})
		}),
		/* @__PURE__ */ U(X, {
			label: "Max output tokens",
			help: "Default 256.",
			children: /* @__PURE__ */ U(M, {
				size: "sm",
				min: 64,
				max: 4096,
				step: 64,
				value: e.maxOutputTokens ?? 256,
				onChange: (e) => t({ maxOutputTokens: e }),
				"data-testid": "vision-tag-max-output-tokens"
			})
		})
	] });
}
//#endregion
//#region src/components/pipelines/nodes/vision-classify/VisionClassifyConfig.tsx
var Ws = 2;
function Gs({ data: e, onChange: t, nodeId: n }) {
	let r = ut(), i = Me("image:vision", Hs), a = e.labels ?? [], o = !e.imageRefPath?.trim();
	return /* @__PURE__ */ W(va, { children: [
		/* @__PURE__ */ U(Oa, {
			value: e.imageRefPath,
			onChange: (e) => t({ imageRefPath: e ?? "" }),
			nodeId: n,
			label: "Image ref path",
			help: o ? "Required — JSONPath to the imageId to classify." : "JSONPath to the imageId to classify."
		}),
		/* @__PURE__ */ U(X, {
			label: "Labels",
			required: !0,
			error: a.length < Ws ? `At least ${Ws} labels are required to classify between.` : void 0,
			help: "The model returns the single best-matching label.",
			render: ({ describedById: e, labelId: n }) => /* @__PURE__ */ U("div", {
				role: "group",
				"aria-labelledby": n,
				"aria-describedby": e,
				children: /* @__PURE__ */ U(d, {
					value: a,
					onChange: (e) => t({ labels: e }),
					placeholder: "Add label…",
					lowercase: !1
				})
			})
		}),
		/* @__PURE__ */ U(X, {
			label: "Model",
			controlId: `${r}-model`,
			render: ({ controlId: n, describedById: r }) => /* @__PURE__ */ U(j, {
				size: "sm",
				id: n,
				"aria-describedby": r,
				value: e.model ?? i[0]?.value ?? "",
				onChange: (e) => t({ model: e.target.value }),
				options: i.map((e) => ({
					value: e.value,
					label: e.label ?? e.value
				}))
			})
		}),
		/* @__PURE__ */ U(X, {
			label: "System prompt override",
			help: "Optional. Sent verbatim — {{context.*}} is NOT substituted here.",
			controlId: `${r}-system-prompt`,
			render: ({ controlId: n, describedById: r }) => /* @__PURE__ */ U(A, {
				rows: 3,
				spellCheck: !1,
				id: n,
				"aria-describedby": r,
				value: e.systemPrompt ?? "",
				onChange: (e) => t({ systemPrompt: e.target.value || void 0 }),
				placeholder: "Leave blank to use the default classification system prompt."
			})
		}),
		/* @__PURE__ */ U(X, {
			label: "Max output tokens",
			help: "Default 256.",
			controlId: `${r}-max-output-tokens`,
			render: ({ controlId: n, describedById: r }) => /* @__PURE__ */ U(M, {
				size: "sm",
				min: 64,
				max: 4096,
				step: 64,
				value: e.maxOutputTokens ?? 256,
				onChange: (e) => t({ maxOutputTokens: e }),
				id: n,
				"aria-describedby": r,
				"data-testid": "vision-classify-max-output-tokens"
			})
		})
	] });
}
//#endregion
//#region src/components/pipelines/nodes/vision-describe/VisionDescribeConfig.tsx
function Ks({ data: e, onChange: t, nodeId: n }) {
	let r = ut(), i = Me("image:vision", Hs), a = !e.imageRefPath?.trim(), o = !e.userPrompt?.trim();
	return /* @__PURE__ */ W(va, { children: [
		/* @__PURE__ */ U(Oa, {
			value: e.imageRefPath,
			onChange: (e) => t({ imageRefPath: e ?? "" }),
			nodeId: n,
			label: "Image ref path",
			help: a ? "Required — JSONPath to the imageId to describe." : "JSONPath to the imageId to describe."
		}),
		/* @__PURE__ */ U(X, {
			label: "User prompt",
			required: !0,
			error: o ? "User prompt is required." : void 0,
			help: "What to ask the model about the image.",
			controlId: `${r}-user-prompt`,
			render: ({ controlId: n, describedById: r }) => /* @__PURE__ */ U(A, {
				rows: 3,
				spellCheck: !1,
				invalid: o,
				id: n,
				"aria-describedby": r,
				value: e.userPrompt ?? "",
				onChange: (e) => t({ userPrompt: e.target.value }),
				placeholder: "Describe what you see in this image in one paragraph."
			})
		}),
		/* @__PURE__ */ U(X, {
			label: "Model",
			controlId: `${r}-model`,
			render: ({ controlId: n, describedById: r }) => /* @__PURE__ */ U(j, {
				size: "sm",
				id: n,
				"aria-describedby": r,
				value: e.model ?? i[0]?.value ?? "",
				onChange: (e) => t({ model: e.target.value }),
				options: i.map((e) => ({
					value: e.value,
					label: e.label ?? e.value
				}))
			})
		}),
		/* @__PURE__ */ U(X, {
			label: "System prompt override",
			help: "Optional. Sent verbatim — {{context.*}} is NOT substituted here.",
			controlId: `${r}-system-prompt`,
			render: ({ controlId: n, describedById: r }) => /* @__PURE__ */ U(A, {
				rows: 3,
				spellCheck: !1,
				id: n,
				"aria-describedby": r,
				value: e.systemPrompt ?? "",
				onChange: (e) => t({ systemPrompt: e.target.value || void 0 }),
				placeholder: "Leave blank to use the default describe system prompt."
			})
		}),
		/* @__PURE__ */ U(X, {
			label: "Max output tokens",
			help: "Default 512.",
			controlId: `${r}-max-output-tokens`,
			render: ({ controlId: n, describedById: r }) => /* @__PURE__ */ U(M, {
				size: "sm",
				min: 64,
				max: 4096,
				step: 64,
				value: e.maxOutputTokens ?? 512,
				onChange: (e) => t({ maxOutputTokens: e }),
				id: n,
				"aria-describedby": r,
				"data-testid": "vision-describe-max-output-tokens"
			})
		})
	] });
}
//#endregion
//#region src/components/pipelines/nodes/vision-extract-text/VisionExtractTextConfig.tsx
var qs = [{
	value: "claude-sonnet-4-6",
	label: "Claude Sonnet 4.6 (default — best OCR accuracy)"
}, {
	value: "claude-haiku-4-5",
	label: "Claude Haiku 4.5 (faster, lower accuracy)"
}];
function Js({ data: e, onChange: t, nodeId: n }) {
	let r = ut(), i = Me("image:vision-ocr", qs), a = !e.imageRefPath?.trim();
	return /* @__PURE__ */ W(va, { children: [
		/* @__PURE__ */ U(Oa, {
			value: e.imageRefPath,
			onChange: (e) => t({ imageRefPath: e ?? "" }),
			nodeId: n,
			label: "Image ref path",
			help: a ? "Required — JSONPath to the imageId to extract text from." : "JSONPath to the imageId to extract text from."
		}),
		/* @__PURE__ */ U(X, {
			label: "Model",
			help: "Defaults to the more accurate model for OCR.",
			controlId: `${r}-model`,
			render: ({ controlId: n, describedById: r }) => /* @__PURE__ */ U(j, {
				size: "sm",
				id: n,
				"aria-describedby": r,
				value: e.model ?? i[0]?.value ?? "",
				onChange: (e) => t({ model: e.target.value }),
				options: i.map((e) => ({
					value: e.value,
					label: e.label ?? e.value
				}))
			})
		}),
		/* @__PURE__ */ U(X, {
			label: "System prompt override",
			help: "Optional. Sent verbatim — {{context.*}} is NOT substituted here.",
			controlId: `${r}-system-prompt`,
			render: ({ controlId: n, describedById: r }) => /* @__PURE__ */ U(A, {
				rows: 3,
				spellCheck: !1,
				id: n,
				"aria-describedby": r,
				value: e.systemPrompt ?? "",
				onChange: (e) => t({ systemPrompt: e.target.value || void 0 }),
				placeholder: "Leave blank to use the default OCR system prompt."
			})
		}),
		/* @__PURE__ */ U(X, {
			label: "Max output tokens",
			help: "Default 1024. Increase for documents with large amounts of text.",
			controlId: `${r}-max-output-tokens`,
			render: ({ controlId: n, describedById: r }) => /* @__PURE__ */ U(M, {
				size: "sm",
				min: 64,
				max: 8192,
				step: 64,
				value: e.maxOutputTokens ?? 1024,
				onChange: (e) => t({ maxOutputTokens: e }),
				id: n,
				"aria-describedby": r,
				"data-testid": "vision-extract-text-max-output-tokens"
			})
		})
	] });
}
//#endregion
//#region src/components/pipelines/nodes/generate/GenerateConfig.tsx
var Ys = [{
	value: "amazon.titan-image-generator-v2:0",
	label: "Titan v2 (default)"
}, {
	value: "amazon.titan-image-generator-v1",
	label: "Titan v1"
}], Xs = 64, Zs = 2048, Qs = 8;
function $s({ data: e, onChange: t }) {
	let n = Me("image:generate", Ys), r = Je("image:generate"), i = !e.prompt?.trim(), a = e.model ?? n[0]?.value ?? "";
	return /* @__PURE__ */ W(va, { children: [
		/* @__PURE__ */ U(X, {
			label: r.label("prompt", "Prompt"),
			required: !0,
			error: i ? "Prompt is required." : void 0,
			help: i ? void 0 : r.help("prompt", "Text description of the image to generate."),
			controlId: "generate-prompt",
			render: ({ describedById: n, controlId: a }) => /* @__PURE__ */ U(A, {
				id: a,
				"aria-describedby": n,
				rows: 4,
				spellCheck: !1,
				invalid: i,
				value: e.prompt ?? "",
				onChange: (e) => t({ prompt: e.target.value }),
				placeholder: r.placeholder("prompt", "A photorealistic photograph of a golden retriever in a sunny meadow")
			})
		}),
		/* @__PURE__ */ U(X, {
			label: r.label("model", "Model"),
			help: n.length === 0 ? "This host declares no image models." : r.help("model"),
			controlId: "generate-model",
			render: ({ describedById: e, controlId: r }) => /* @__PURE__ */ U(j, {
				id: r,
				"aria-describedby": e,
				size: "sm",
				value: a,
				onChange: (e) => t({ model: e.target.value }),
				options: n.map((e) => ({
					value: e.value,
					label: e.label ?? e.value
				}))
			})
		}),
		/* @__PURE__ */ W("div", {
			className: "flex gap-2",
			children: [/* @__PURE__ */ U("div", {
				className: "flex-1",
				children: /* @__PURE__ */ U(X, {
					label: r.label("width", "Width"),
					controlId: "generate-width",
					render: ({ describedById: n, controlId: r }) => /* @__PURE__ */ U(M, {
						id: r,
						"aria-describedby": n,
						size: "sm",
						min: Xs,
						max: Zs,
						step: 64,
						unit: "px",
						value: e.width ?? 512,
						onChange: (e) => t({ width: e }),
						"data-testid": "generate-width"
					})
				})
			}), /* @__PURE__ */ U("div", {
				className: "flex-1",
				children: /* @__PURE__ */ U(X, {
					label: r.label("height", "Height"),
					controlId: "generate-height",
					render: ({ describedById: n, controlId: r }) => /* @__PURE__ */ U(M, {
						id: r,
						"aria-describedby": n,
						size: "sm",
						min: Xs,
						max: Zs,
						step: 64,
						unit: "px",
						value: e.height ?? 512,
						onChange: (e) => t({ height: e }),
						"data-testid": "generate-height"
					})
				})
			})]
		}),
		/* @__PURE__ */ U(X, {
			label: r.label("seed", "Seed"),
			help: "Optional — set for a reproducible result.",
			controlId: "generate-seed",
			render: ({ describedById: n, controlId: r }) => /* @__PURE__ */ U(M, {
				id: r,
				"aria-describedby": n,
				size: "sm",
				min: 0,
				step: 1,
				value: e.seed,
				onChange: (e) => t({ seed: e }),
				onClear: () => t({ seed: void 0 }),
				placeholder: "random",
				"data-testid": "generate-seed"
			})
		}),
		/* @__PURE__ */ U(X, {
			label: r.label("numImages", "Number of images"),
			help: "Above 1, the step fans out with one arm per image, each carrying one imageId.",
			controlId: "generate-num-images",
			render: ({ describedById: n, controlId: r }) => /* @__PURE__ */ U(M, {
				id: r,
				"aria-describedby": n,
				size: "sm",
				min: 1,
				max: Qs,
				step: 1,
				value: e.numImages ?? 1,
				onChange: (e) => t({ numImages: e }),
				"data-testid": "generate-num-images"
			})
		})
	] });
}
//#endregion
//#region src/components/pipelines/nodes/variation/VariationConfig.tsx
var ec = [{
	value: "amazon.nova-canvas-v1:0",
	label: "Nova Canvas v1 (default)"
}], tc = 8;
function nc({ data: e, onChange: t, nodeId: n }) {
	let r = Me("image:edit", ec);
	return /* @__PURE__ */ W(va, { children: [
		/* @__PURE__ */ U(Oa, {
			value: e.sourceImagePath,
			onChange: (e) => t({ sourceImagePath: e }),
			nodeId: n
		}),
		/* @__PURE__ */ U(X, {
			label: "Model",
			controlId: "variation-model",
			render: ({ describedById: n, controlId: i }) => /* @__PURE__ */ U(j, {
				id: i,
				"aria-describedby": n,
				size: "sm",
				value: e.model ?? r[0]?.value ?? "",
				onChange: (e) => t({ model: e.target.value }),
				options: r.map((e) => ({
					value: e.value,
					label: e.label ?? e.value
				}))
			})
		}),
		/* @__PURE__ */ U(X, {
			label: "Number of variations",
			help: "Always fans out — each variation becomes a separate arm downstream.",
			controlId: "variation-num-variations",
			render: ({ describedById: n, controlId: r }) => /* @__PURE__ */ U(M, {
				id: r,
				"aria-describedby": n,
				size: "sm",
				min: 1,
				max: tc,
				step: 1,
				value: e.numVariations ?? 1,
				onChange: (e) => t({ numVariations: e }),
				"data-testid": "variation-num-variations"
			})
		}),
		/* @__PURE__ */ U(X, {
			label: "Similarity",
			help: "0 is very different, 1 is nearly identical. 0.7 is a good starting point.",
			controlId: "variation-similarity",
			render: ({ describedById: n, controlId: r }) => /* @__PURE__ */ U(M, {
				id: r,
				"aria-describedby": n,
				size: "sm",
				min: 0,
				max: 1,
				step: .05,
				value: e.similarity ?? .7,
				onChange: (e) => t({ similarity: e }),
				"data-testid": "variation-similarity"
			})
		})
	] });
}
//#endregion
//#region src/components/pipelines/nodes/edit-prompt/EditPromptConfig.tsx
var rc = ["$.steps.mask.output.imageId", "$.trigger.maskRef"];
function ic({ data: e, onChange: t, nodeId: n }) {
	let r = Me("image:edit", ec), i = !e.prompt?.trim();
	return /* @__PURE__ */ W(va, { children: [
		/* @__PURE__ */ U(Oa, {
			value: e.sourceImagePath,
			onChange: (e) => t({ sourceImagePath: e }),
			nodeId: n
		}),
		/* @__PURE__ */ U(X, {
			label: "Mask image path",
			help: "Optional. White pixels are the edit region, black is preserved. Omit for outpainting.",
			controlId: "edit-prompt-mask-path",
			render: ({ describedById: n, controlId: r }) => /* @__PURE__ */ W(H, { children: [/* @__PURE__ */ U(k, {
				id: r,
				"aria-describedby": n,
				size: "sm",
				mono: !0,
				spellCheck: !1,
				value: e.maskImagePath ?? "",
				onChange: (e) => t({ maskImagePath: e.target.value.trim() || void 0 }),
				placeholder: "$.steps.mask.output.imageId"
			}), /* @__PURE__ */ U(ya, {
				samples: rc,
				onSelect: (e) => t({ maskImagePath: e }),
				"aria-label": "Common mask paths"
			})] })
		}),
		/* @__PURE__ */ U(X, {
			label: "Edit prompt",
			required: !0,
			error: i ? "Edit prompt is required." : void 0,
			help: "Describes what to generate in the masked region.",
			controlId: "edit-prompt-prompt",
			render: ({ describedById: n, controlId: r }) => /* @__PURE__ */ U(A, {
				id: r,
				"aria-describedby": n,
				rows: 4,
				spellCheck: !1,
				invalid: i,
				value: e.prompt ?? "",
				onChange: (e) => t({ prompt: e.target.value }),
				placeholder: "Replace the background with a sunny beach"
			})
		}),
		/* @__PURE__ */ U(X, {
			label: "Model",
			controlId: "edit-prompt-model",
			render: ({ describedById: n, controlId: i }) => /* @__PURE__ */ U(j, {
				id: i,
				"aria-describedby": n,
				size: "sm",
				value: e.model ?? r[0]?.value ?? "",
				onChange: (e) => t({ model: e.target.value }),
				options: r.map((e) => ({
					value: e.value,
					label: e.label ?? e.value
				}))
			})
		})
	] });
}
//#endregion
//#region src/components/pipelines/nodes/docsContent.tsx
var ac = {
	trigger: /* @__PURE__ */ W(H, { children: [
		/* @__PURE__ */ U("h4", { children: "What it does" }),
		/* @__PURE__ */ U("p", { children: "The entry point of every pipeline. Every pipeline has exactly one trigger." }),
		/* @__PURE__ */ U("h4", { children: "Trigger types" }),
		/* @__PURE__ */ W("ul", { children: [
			/* @__PURE__ */ W("li", { children: [/* @__PURE__ */ U("code", { children: "manual" }), " — started by clicking Run in the editor."] }),
			/* @__PURE__ */ W("li", { children: [
				/* @__PURE__ */ U("code", { children: "document.finalize" }),
				" / ",
				/* @__PURE__ */ U("code", { children: "document.submit" }),
				" / ",
				/* @__PURE__ */ U("code", { children: "document.comment" }),
				" — fires on doc lifecycle events for a given document type."
			] }),
			/* @__PURE__ */ W("li", { children: [
				/* @__PURE__ */ U("code", { children: "schedule" }),
				" — cron expression (e.g. ",
				/* @__PURE__ */ U("code", { children: "0 9 * * 1-5" }),
				")."
			] }),
			/* @__PURE__ */ W("li", { children: [/* @__PURE__ */ U("code", { children: "webhook" }), " — inbound HTTP POST at the configured path."] })
		] }),
		/* @__PURE__ */ U("h4", { children: "Fields" }),
		/* @__PURE__ */ W("ul", { children: [
			/* @__PURE__ */ W("li", { children: [/* @__PURE__ */ U("code", { children: "triggerType" }), " — one of the above."] }),
			/* @__PURE__ */ W("li", { children: [
				/* @__PURE__ */ U("code", { children: "documentTypeId" }),
				" — required for ",
				/* @__PURE__ */ U("code", { children: "document.*" }),
				"."
			] }),
			/* @__PURE__ */ W("li", { children: [
				/* @__PURE__ */ U("code", { children: "schedule" }),
				" / ",
				/* @__PURE__ */ U("code", { children: "webhookPath" }),
				" — per type."
			] })
		] }),
		/* @__PURE__ */ U("h4", { children: "Wiring" }),
		/* @__PURE__ */ W("p", { children: [
			"One output handle ",
			/* @__PURE__ */ U("code", { children: "out" }),
			" that fires downstream with ",
			/* @__PURE__ */ U("code", { children: "{ trigger, payload }" }),
			" as the initial context."
		] })
	] }),
	llm: /* @__PURE__ */ W(H, { children: [
		/* @__PURE__ */ U("h4", { children: "What it does" }),
		/* @__PURE__ */ U("p", { children: "Calls an LLM with a prompt template filled from pipeline context." }),
		/* @__PURE__ */ U("h4", { children: "Provider & model" }),
		/* @__PURE__ */ W("ul", { children: [/* @__PURE__ */ W("li", { children: [
			/* @__PURE__ */ U("code", { children: "anthropic" }),
			" — Claude models (e.g. ",
			/* @__PURE__ */ U("code", { children: "claude-sonnet-4-6" }),
			")."
		] }), /* @__PURE__ */ W("li", { children: [/* @__PURE__ */ U("code", { children: "bedrock" }), " — same models via AWS Bedrock."] })] }),
		/* @__PURE__ */ U("h4", { children: "Prompt templates" }),
		/* @__PURE__ */ W("p", { children: [
			"Interpolate with ",
			/* @__PURE__ */ U("code", { children: "{{ context.steps.X.output }}" }),
			" or any dotted path into the run context."
		] }),
		/* @__PURE__ */ U("h4", { children: "Streaming" }),
		/* @__PURE__ */ W("p", { children: [
			"Toggle on to emit ",
			/* @__PURE__ */ U("code", { children: "pipeline.llm.token" }),
			" events as text arrives; off for a single response."
		] }),
		/* @__PURE__ */ U("h4", { children: "Errors" }),
		/* @__PURE__ */ W("p", { children: [
			"The ",
			/* @__PURE__ */ U("code", { children: "error" }),
			" handle routes downstream on LLM failure — retried per ",
			/* @__PURE__ */ U("code", { children: "RetryManager" }),
			" policy before surfacing here."
		] })
	] }),
	transform: /* @__PURE__ */ W(H, { children: [
		/* @__PURE__ */ U("h4", { children: "What it does" }),
		/* @__PURE__ */ U("p", { children: "Pure data transform — JSONPath, template string, or sandboxed JavaScript. No side effects." }),
		/* @__PURE__ */ U("h4", { children: "When to use each" }),
		/* @__PURE__ */ W("ul", { children: [
			/* @__PURE__ */ W("li", { children: [
				/* @__PURE__ */ U("code", { children: "jsonpath" }),
				" — extract a value, e.g. ",
				/* @__PURE__ */ U("code", { children: "$.document.body.sections[0]" }),
				"."
			] }),
			/* @__PURE__ */ W("li", { children: [
				/* @__PURE__ */ U("code", { children: "template" }),
				" — shape a string from context, e.g. ",
				/* @__PURE__ */ U("code", { children: "Hi {{context.user.name}}" }),
				"."
			] }),
			/* @__PURE__ */ W("li", { children: [
				/* @__PURE__ */ U("code", { children: "javascript" }),
				" — arbitrary logic; runs in an isolated sandbox with ",
				/* @__PURE__ */ U("code", { children: "context" }),
				" as input."
			] })
		] }),
		/* @__PURE__ */ U("h4", { children: "Output" }),
		/* @__PURE__ */ W("p", { children: [
			/* @__PURE__ */ U("code", { children: "outputKey" }),
			" scopes the result into ",
			/* @__PURE__ */ W("code", { children: ["context.", "{outputKey}"] }),
			". Leave blank to merge into the root context."
		] })
	] }),
	condition: /* @__PURE__ */ W(H, { children: [
		/* @__PURE__ */ U("h4", { children: "What it does" }),
		/* @__PURE__ */ U("p", { children: "Branches the flow based on a boolean expression evaluated over context." }),
		/* @__PURE__ */ U("h4", { children: "Expression language" }),
		/* @__PURE__ */ W("p", { children: [
			"JSONPath lookups combined with booleans and comparisons, e.g. ",
			/* @__PURE__ */ U("code", { children: "$.llm.output.sentiment == \"positive\"" }),
			" or ",
			/* @__PURE__ */ U("code", { children: "$.score > 0.8 && $.reviewed" }),
			"."
		] }),
		/* @__PURE__ */ U("h4", { children: "Wiring" }),
		/* @__PURE__ */ W("p", { children: [
			"Two output handles: ",
			/* @__PURE__ */ U("code", { children: "true" }),
			" and ",
			/* @__PURE__ */ U("code", { children: "false" }),
			". Connected branches run; unconnected branches are skipped and their step is marked ",
			/* @__PURE__ */ U("code", { children: "skipped" }),
			"."
		] })
	] }),
	action: /* @__PURE__ */ W(H, { children: [
		/* @__PURE__ */ U("h4", { children: "What it does" }),
		/* @__PURE__ */ U("p", { children: "Performs a side-effect: updates a doc, posts a comment, notifies, calls a webhook, or invokes an MCP tool." }),
		/* @__PURE__ */ U("h4", { children: "Subtypes" }),
		/* @__PURE__ */ W("ul", { children: [
			/* @__PURE__ */ W("li", { children: [/* @__PURE__ */ U("code", { children: "update-document" }), " — patch a document's body."] }),
			/* @__PURE__ */ W("li", { children: [/* @__PURE__ */ U("code", { children: "post-comment" }), " — append a comment thread entry."] }),
			/* @__PURE__ */ W("li", { children: [/* @__PURE__ */ U("code", { children: "notify" }), " — push notification to users/roles."] }),
			/* @__PURE__ */ W("li", { children: [/* @__PURE__ */ U("code", { children: "webhook" }), " — outbound HTTP request."] }),
			/* @__PURE__ */ W("li", { children: [/* @__PURE__ */ U("code", { children: "mcp-tool" }), " — invoke a registered MCP tool by name."] })
		] }),
		/* @__PURE__ */ U("h4", { children: "Idempotent flag" }),
		/* @__PURE__ */ W("p", { children: [
			"If ",
			/* @__PURE__ */ U("code", { children: "idempotent" }),
			" is true, retries are safe after partial completion — the runtime may re-invoke the action without guarding against duplicates."
		] }),
		/* @__PURE__ */ U("h4", { children: "Errors" }),
		/* @__PURE__ */ W("p", { children: [
			"The ",
			/* @__PURE__ */ U("code", { children: "error" }),
			" handle routes on failure (after retries), or fails the run if ",
			/* @__PURE__ */ U("code", { children: "onError" }),
			" is ",
			/* @__PURE__ */ U("code", { children: "fail-run" }),
			"."
		] })
	] }),
	fork: /* @__PURE__ */ W(H, { children: [
		/* @__PURE__ */ U("h4", { children: "What it does" }),
		/* @__PURE__ */ U("p", { children: "Splits the flow into N parallel branches that all run concurrently against the same context snapshot." }),
		/* @__PURE__ */ U("h4", { children: "Branch count" }),
		/* @__PURE__ */ W("p", { children: [
			"2-8 branches. Each branch exposes a handle ",
			/* @__PURE__ */ U("code", { children: "branch-0" }),
			", ",
			/* @__PURE__ */ U("code", { children: "branch-1" }),
			", etc."
		] }),
		/* @__PURE__ */ U("h4", { children: "Downstream" }),
		/* @__PURE__ */ W("p", { children: [
			"Typically paired with a ",
			/* @__PURE__ */ U("code", { children: "Join" }),
			" to merge results. Without a Join, each branch terminates independently and the run completes when all tails finish."
		] })
	] }),
	join: /* @__PURE__ */ W(H, { children: [
		/* @__PURE__ */ U("h4", { children: "What it does" }),
		/* @__PURE__ */ U("p", { children: "Combines N parallel branches back into one flow." }),
		/* @__PURE__ */ U("h4", { children: "Modes" }),
		/* @__PURE__ */ W("ul", { children: [
			/* @__PURE__ */ W("li", { children: [/* @__PURE__ */ U("code", { children: "all" }), " — wait for every input."] }),
			/* @__PURE__ */ W("li", { children: [/* @__PURE__ */ U("code", { children: "any" }), " — fire as soon as the first input arrives; later inputs are ignored."] }),
			/* @__PURE__ */ W("li", { children: [
				/* @__PURE__ */ U("code", { children: "n_of_m" }),
				" — fire after ",
				/* @__PURE__ */ U("code", { children: "n" }),
				" of ",
				/* @__PURE__ */ U("code", { children: "m" }),
				" inputs complete."
			] })
		] }),
		/* @__PURE__ */ U("h4", { children: "Merge strategies" }),
		/* @__PURE__ */ W("ul", { children: [
			/* @__PURE__ */ W("li", { children: [/* @__PURE__ */ U("code", { children: "deep-merge" }), " — recursive object merge."] }),
			/* @__PURE__ */ W("li", { children: [/* @__PURE__ */ U("code", { children: "array-collect" }), " — collect each branch's output into an array."] }),
			/* @__PURE__ */ W("li", { children: [/* @__PURE__ */ U("code", { children: "last-writer-wins" }), " — final branch to arrive replaces prior values."] })
		] }),
		/* @__PURE__ */ U("h4", { children: "Partial failures (§17.2)" }),
		/* @__PURE__ */ W("p", { children: [
			"In ",
			/* @__PURE__ */ U("code", { children: "all" }),
			" mode a failed branch fails the run. In ",
			/* @__PURE__ */ U("code", { children: "any" }),
			"/",
			/* @__PURE__ */ U("code", { children: "n_of_m" }),
			" failed branches count against the required total — the Join fires as soon as enough successes arrive."
		] })
	] }),
	approval: /* @__PURE__ */ W(H, { children: [
		/* @__PURE__ */ U("h4", { children: "What it does" }),
		/* @__PURE__ */ W("p", { children: [
			"Blocks the pipeline waiting for human approval. The run enters ",
			/* @__PURE__ */ U("code", { children: "awaiting_approval" }),
			" until decisions are recorded."
		] }),
		/* @__PURE__ */ U("h4", { children: "Approvers" }),
		/* @__PURE__ */ W("p", { children: [
			"A list of users or roles. ",
			/* @__PURE__ */ U("code", { children: "requiredCount" }),
			" controls how many approvals are needed (n-of-m)."
		] }),
		/* @__PURE__ */ U("h4", { children: "Timeout" }),
		/* @__PURE__ */ W("p", { children: [
			"Optional ",
			/* @__PURE__ */ U("code", { children: "timeoutMs" }),
			" with ",
			/* @__PURE__ */ U("code", { children: "timeoutAction" }),
			" of ",
			/* @__PURE__ */ U("code", { children: "reject" }),
			" or ",
			/* @__PURE__ */ U("code", { children: "approve" }),
			" — decides the outcome if no one responds in time."
		] }),
		/* @__PURE__ */ U("h4", { children: "Wiring" }),
		/* @__PURE__ */ W("p", { children: [
			"Two output handles: ",
			/* @__PURE__ */ U("code", { children: "approved" }),
			" and ",
			/* @__PURE__ */ U("code", { children: "rejected" }),
			". The flow resumes down the matching branch."
		] })
	] }),
	agent: /* @__PURE__ */ W(H, { children: [
		/* @__PURE__ */ U("h4", { children: "What it does" }),
		/* @__PURE__ */ U("p", { children: "Invokes a Strands agent via A2A protocol. The agent processes the input and returns a structured response." }),
		/* @__PURE__ */ U("h4", { children: "Fields" }),
		/* @__PURE__ */ W("ul", { children: [
			/* @__PURE__ */ W("li", { children: [/* @__PURE__ */ U("code", { children: "agentId" }), " — agent identifier, in whatever form the host's agent runtime uses."] }),
			/* @__PURE__ */ W("li", { children: [
				/* @__PURE__ */ U("code", { children: "protocol" }),
				" — ",
				/* @__PURE__ */ U("code", { children: "a2a" }),
				" (recommended) or ",
				/* @__PURE__ */ U("code", { children: "direct" }),
				"."
			] }),
			/* @__PURE__ */ W("li", { children: [
				/* @__PURE__ */ U("code", { children: "inputTemplate" }),
				" — supports ",
				/* @__PURE__ */ U("code", { children: "{{context.*}}" }),
				" substitution."
			] }),
			/* @__PURE__ */ W("li", { children: [/* @__PURE__ */ U("code", { children: "streaming" }), " — whether to stream the agent's response tokens."] })
		] }),
		/* @__PURE__ */ U("h4", { children: "Wiring" }),
		/* @__PURE__ */ W("p", { children: [
			"Output handles: ",
			/* @__PURE__ */ U("code", { children: "out" }),
			" (success) and ",
			/* @__PURE__ */ U("code", { children: "error" }),
			" (invocation failure)."
		] })
	] }),
	"mcp-tool": /* @__PURE__ */ W(H, { children: [
		/* @__PURE__ */ U("h4", { children: "What it does" }),
		/* @__PURE__ */ U("p", { children: "Invokes an external tool through an MCP Gateway server." }),
		/* @__PURE__ */ U("h4", { children: "Fields" }),
		/* @__PURE__ */ W("ul", { children: [
			/* @__PURE__ */ W("li", { children: [/* @__PURE__ */ U("code", { children: "gatewayUrl" }), " — MCP Gateway endpoint."] }),
			/* @__PURE__ */ W("li", { children: [/* @__PURE__ */ U("code", { children: "toolName" }), " — registered tool to invoke."] }),
			/* @__PURE__ */ W("li", { children: [/* @__PURE__ */ U("code", { children: "inputTemplate" }), " — JSON input with substitution support."] })
		] }),
		/* @__PURE__ */ U("h4", { children: "Wiring" }),
		/* @__PURE__ */ W("p", { children: [
			"Output handles: ",
			/* @__PURE__ */ U("code", { children: "out" }),
			" and ",
			/* @__PURE__ */ U("code", { children: "error" }),
			"."
		] })
	] }),
	"knowledge-base": /* @__PURE__ */ W(H, { children: [
		/* @__PURE__ */ U("h4", { children: "What it does" }),
		/* @__PURE__ */ U("p", { children: "Queries a knowledge base for relevant document chunks (RAG retrieval). Which retrieval backend answers is configured by the host." }),
		/* @__PURE__ */ U("h4", { children: "Fields" }),
		/* @__PURE__ */ W("ul", { children: [
			/* @__PURE__ */ W("li", { children: [/* @__PURE__ */ U("code", { children: "knowledgeBaseId" }), " — knowledge base identifier."] }),
			/* @__PURE__ */ W("li", { children: [/* @__PURE__ */ U("code", { children: "queryTemplate" }), " — natural language query with substitution."] }),
			/* @__PURE__ */ W("li", { children: [/* @__PURE__ */ U("code", { children: "topK" }), " — number of chunks to retrieve (default 5)."] }),
			/* @__PURE__ */ W("li", { children: [/* @__PURE__ */ U("code", { children: "scoreThreshold" }), " — minimum relevance score (0–1)."] })
		] }),
		/* @__PURE__ */ U("h4", { children: "Wiring" }),
		/* @__PURE__ */ W("p", { children: [
			"Output handles: ",
			/* @__PURE__ */ U("code", { children: "out" }),
			" (retrieved chunks in context) and ",
			/* @__PURE__ */ U("code", { children: "error" }),
			"."
		] })
	] }),
	"graph-query": /* @__PURE__ */ W(H, { children: [
		/* @__PURE__ */ U("h4", { children: "What it does" }),
		/* @__PURE__ */ U("p", { children: "Runs a query against a graph database. The query dialect is whatever the host's graph engine accepts." }),
		/* @__PURE__ */ U("h4", { children: "Fields" }),
		/* @__PURE__ */ W("ul", { children: [
			/* @__PURE__ */ W("li", { children: [/* @__PURE__ */ U("code", { children: "graphId" }), " — graph identifier."] }),
			/* @__PURE__ */ W("li", { children: [/* @__PURE__ */ U("code", { children: "query" }), " — openCypher query (NOT Gremlin/SPARQL)."] }),
			/* @__PURE__ */ W("li", { children: [/* @__PURE__ */ U("code", { children: "parameters" }), " — named query parameters."] })
		] }),
		/* @__PURE__ */ U("h4", { children: "Wiring" }),
		/* @__PURE__ */ W("p", { children: [
			"Output handles: ",
			/* @__PURE__ */ U("code", { children: "out" }),
			" and ",
			/* @__PURE__ */ U("code", { children: "error" }),
			"."
		] })
	] }),
	memory: /* @__PURE__ */ W(H, { children: [
		/* @__PURE__ */ U("h4", { children: "What it does" }),
		/* @__PURE__ */ U("p", { children: "Reads from or writes to a scoped key/value memory (session or long-term). The backing store is supplied by the host." }),
		/* @__PURE__ */ U("h4", { children: "Fields" }),
		/* @__PURE__ */ W("ul", { children: [
			/* @__PURE__ */ W("li", { children: [
				/* @__PURE__ */ U("code", { children: "mode" }),
				" — ",
				/* @__PURE__ */ U("code", { children: "read" }),
				" or ",
				/* @__PURE__ */ U("code", { children: "write" }),
				"."
			] }),
			/* @__PURE__ */ W("li", { children: [
				/* @__PURE__ */ U("code", { children: "scope" }),
				" — ",
				/* @__PURE__ */ U("code", { children: "session" }),
				" (ephemeral) or ",
				/* @__PURE__ */ U("code", { children: "long-term" }),
				" (persistent)."
			] }),
			/* @__PURE__ */ W("li", { children: [/* @__PURE__ */ U("code", { children: "namespace" }), " — memory collection key."] }),
			/* @__PURE__ */ W("li", { children: [/* @__PURE__ */ U("code", { children: "keyExpression" }), " — lookup key (read) or storage key (write)."] })
		] }),
		/* @__PURE__ */ U("h4", { children: "Wiring" }),
		/* @__PURE__ */ W("p", { children: [
			"Output handles: ",
			/* @__PURE__ */ U("code", { children: "out" }),
			" and ",
			/* @__PURE__ */ U("code", { children: "error" }),
			"."
		] })
	] }),
	guardrail: /* @__PURE__ */ W(H, { children: [
		/* @__PURE__ */ U("h4", { children: "What it does" }),
		/* @__PURE__ */ U("p", { children: "Applies content filtering. Evaluates input against the host's configured policies and routes accordingly." }),
		/* @__PURE__ */ U("h4", { children: "Fields" }),
		/* @__PURE__ */ W("ul", { children: [
			/* @__PURE__ */ W("li", { children: [/* @__PURE__ */ U("code", { children: "guardrailId" }), " — guardrail identifier."] }),
			/* @__PURE__ */ W("li", { children: [/* @__PURE__ */ U("code", { children: "inputField" }), " — context path to evaluate."] }),
			/* @__PURE__ */ W("li", { children: [
				/* @__PURE__ */ U("code", { children: "action" }),
				" — ",
				/* @__PURE__ */ U("code", { children: "block" }),
				", ",
				/* @__PURE__ */ U("code", { children: "mask" }),
				", or ",
				/* @__PURE__ */ U("code", { children: "warn" }),
				"."
			] })
		] }),
		/* @__PURE__ */ U("h4", { children: "Wiring" }),
		/* @__PURE__ */ W("p", { children: [
			"Two output handles: ",
			/* @__PURE__ */ U("code", { children: "pass" }),
			" (content OK) and ",
			/* @__PURE__ */ U("code", { children: "block" }),
			" (content flagged)."
		] })
	] }),
	policy: /* @__PURE__ */ W(H, { children: [
		/* @__PURE__ */ U("h4", { children: "What it does" }),
		/* @__PURE__ */ U("p", { children: "Evaluates a Cedar authorization policy against principal/action/resource." }),
		/* @__PURE__ */ U("h4", { children: "Fields" }),
		/* @__PURE__ */ W("ul", { children: [
			/* @__PURE__ */ W("li", { children: [/* @__PURE__ */ U("code", { children: "policyStoreId" }), " — Cedar policy store identifier."] }),
			/* @__PURE__ */ W("li", { children: [/* @__PURE__ */ U("code", { children: "principal" }), " — who is requesting (supports substitution)."] }),
			/* @__PURE__ */ W("li", { children: [/* @__PURE__ */ U("code", { children: "action" }), " — what action is being performed."] }),
			/* @__PURE__ */ W("li", { children: [/* @__PURE__ */ U("code", { children: "resource" }), " — what resource is being accessed."] })
		] }),
		/* @__PURE__ */ U("h4", { children: "Wiring" }),
		/* @__PURE__ */ W("p", { children: [
			"Two output handles: ",
			/* @__PURE__ */ U("code", { children: "allow" }),
			" and ",
			/* @__PURE__ */ U("code", { children: "deny" }),
			"."
		] })
	] }),
	"ag-ui-output": /* @__PURE__ */ W(H, { children: [
		/* @__PURE__ */ U("h4", { children: "What it does" }),
		/* @__PURE__ */ U("p", { children: "Streams output to the AG-UI frontend via Server-Sent Events. This is a terminal node — no downstream flow." }),
		/* @__PURE__ */ U("h4", { children: "Fields" }),
		/* @__PURE__ */ W("ul", { children: [
			/* @__PURE__ */ W("li", { children: [/* @__PURE__ */ U("code", { children: "sourceField" }), " — context path to stream."] }),
			/* @__PURE__ */ W("li", { children: [/* @__PURE__ */ U("code", { children: "eventType" }), " — AG-UI event type to emit (TEXT_MESSAGE_CONTENT, STATE_DELTA, or CUSTOM)."] }),
			/* @__PURE__ */ W("li", { children: [/* @__PURE__ */ U("code", { children: "terminal" }), " — marks this as the pipeline endpoint."] })
		] }),
		/* @__PURE__ */ U("h4", { children: "Wiring" }),
		/* @__PURE__ */ W("p", { children: [
			"One input handle ",
			/* @__PURE__ */ U("code", { children: "in" }),
			". No output — this is the endpoint."
		] })
	] }),
	"image-source": /* @__PURE__ */ W(H, { children: [
		/* @__PURE__ */ U("h4", { children: "What it does" }),
		/* @__PURE__ */ U("p", { children: "Injects an existing image into the pipeline context. Use this as the entry point for image-processing pipelines when the image is already stored in the blob store." }),
		/* @__PURE__ */ U("h4", { children: "Fields" }),
		/* @__PURE__ */ W("ul", { children: [/* @__PURE__ */ W("li", { children: [/* @__PURE__ */ U("code", { children: "imageId" }), " — optional; can be set at run time by the trigger or a preceding step."] }), /* @__PURE__ */ W("li", { children: [
			/* @__PURE__ */ U("code", { children: "outputKey" }),
			" — the key written to pipeline context (default: ",
			/* @__PURE__ */ U("code", { children: "imageRef" }),
			")."
		] })] }),
		/* @__PURE__ */ U("h4", { children: "Wiring" }),
		/* @__PURE__ */ W("p", { children: [
			"One output handle ",
			/* @__PURE__ */ U("code", { children: "out" }),
			". No inputs — this is a source node."
		] })
	] }),
	"image:save": /* @__PURE__ */ W(H, { children: [
		/* @__PURE__ */ U("h4", { children: "What it does" }),
		/* @__PURE__ */ U("p", { children: "Writes a produced image to a named file in the artifact store. Dispatched server-side by the SaveStepHandler." }),
		/* @__PURE__ */ U("h4", { children: "Fields" }),
		/* @__PURE__ */ W("ul", { children: [/* @__PURE__ */ W("li", { children: [
			/* @__PURE__ */ U("code", { children: "sourceImagePath" }),
			" — JSONPath to the imageId to save (default: ",
			/* @__PURE__ */ U("code", { children: "$.scatter.parentImageId" }),
			")."
		] }), /* @__PURE__ */ W("li", { children: [
			/* @__PURE__ */ U("code", { children: "filenameTemplate" }),
			" — output filename; supports ",
			/* @__PURE__ */ U("code", { children: "{{scatter.item.label}}" }),
			", ",
			/* @__PURE__ */ U("code", { children: "{{scatter.index}}" }),
			", ",
			/* @__PURE__ */ U("code", { children: "{{scatter.parentImageId}}" }),
			"."
		] })] }),
		/* @__PURE__ */ U("h4", { children: "Wiring" }),
		/* @__PURE__ */ W("p", { children: [
			"One input ",
			/* @__PURE__ */ U("code", { children: "in" }),
			", one output ",
			/* @__PURE__ */ U("code", { children: "out" }),
			", one error handle ",
			/* @__PURE__ */ U("code", { children: "error" }),
			"."
		] })
	] }),
	scatter: /* @__PURE__ */ W(H, { children: [
		/* @__PURE__ */ U("h4", { children: "What it does" }),
		/* @__PURE__ */ U("p", { children: "Fans out over a collection — runs downstream nodes once per item in the scatter set. Results are collected by a downstream Join or Save node." }),
		/* @__PURE__ */ U("h4", { children: "Wiring" }),
		/* @__PURE__ */ W("p", { children: [
			"One input ",
			/* @__PURE__ */ U("code", { children: "in" }),
			". One output ",
			/* @__PURE__ */ U("code", { children: "out" }),
			" that fires once per item in the scatter collection."
		] })
	] }),
	"image:resize": /* @__PURE__ */ W(H, { children: [
		/* @__PURE__ */ U("h4", { children: "What it does" }),
		/* @__PURE__ */ U("p", { children: "Resizes an image to the target dimensions using sharp.resize()." }),
		/* @__PURE__ */ U("h4", { children: "Fields" }),
		/* @__PURE__ */ W("ul", { children: [
			/* @__PURE__ */ W("li", { children: [
				/* @__PURE__ */ U("code", { children: "width" }),
				" / ",
				/* @__PURE__ */ U("code", { children: "height" }),
				" — target dimensions in pixels."
			] }),
			/* @__PURE__ */ W("li", { children: [
				/* @__PURE__ */ U("code", { children: "fit" }),
				" — ",
				/* @__PURE__ */ U("code", { children: "cover" }),
				", ",
				/* @__PURE__ */ U("code", { children: "contain" }),
				", ",
				/* @__PURE__ */ U("code", { children: "fill" }),
				", ",
				/* @__PURE__ */ U("code", { children: "inside" }),
				", or ",
				/* @__PURE__ */ U("code", { children: "outside" }),
				" (default: ",
				/* @__PURE__ */ U("code", { children: "cover" }),
				")."
			] }),
			/* @__PURE__ */ W("li", { children: [
				/* @__PURE__ */ U("code", { children: "background" }),
				" — hex fill colour used by ",
				/* @__PURE__ */ U("code", { children: "contain" }),
				" / ",
				/* @__PURE__ */ U("code", { children: "inside" }),
				" when padding is needed."
			] }),
			/* @__PURE__ */ W("li", { children: [/* @__PURE__ */ U("code", { children: "withoutEnlargement" }), " — skip resize if image is already smaller than target."] })
		] }),
		/* @__PURE__ */ U("h4", { children: "Wiring" }),
		/* @__PURE__ */ W("p", { children: [
			"Input ",
			/* @__PURE__ */ U("code", { children: "in" }),
			", output ",
			/* @__PURE__ */ U("code", { children: "out" }),
			", error handle ",
			/* @__PURE__ */ U("code", { children: "error" }),
			"."
		] })
	] }),
	"image:transform": /* @__PURE__ */ W(H, { children: [
		/* @__PURE__ */ U("h4", { children: "What it does" }),
		/* @__PURE__ */ U("p", { children: "Applies a sequential chain of geometric operations to an image." }),
		/* @__PURE__ */ U("h4", { children: "Operations" }),
		/* @__PURE__ */ W("ul", { children: [
			/* @__PURE__ */ W("li", { children: [/* @__PURE__ */ U("code", { children: "rotate" }), " — rotate by degrees (e.g. 90, 180, 270)."] }),
			/* @__PURE__ */ W("li", { children: [/* @__PURE__ */ U("code", { children: "flip" }), " — mirror vertically."] }),
			/* @__PURE__ */ W("li", { children: [/* @__PURE__ */ U("code", { children: "flop" }), " — mirror horizontally."] })
		] }),
		/* @__PURE__ */ U("h4", { children: "Wiring" }),
		/* @__PURE__ */ W("p", { children: [
			"Input ",
			/* @__PURE__ */ U("code", { children: "in" }),
			", output ",
			/* @__PURE__ */ U("code", { children: "out" }),
			", error handle ",
			/* @__PURE__ */ U("code", { children: "error" }),
			"."
		] })
	] }),
	"image:format-convert": /* @__PURE__ */ W(H, { children: [
		/* @__PURE__ */ U("h4", { children: "What it does" }),
		/* @__PURE__ */ U("p", { children: "Converts the image to a new format using sharp." }),
		/* @__PURE__ */ U("h4", { children: "Fields" }),
		/* @__PURE__ */ W("ul", { children: [
			/* @__PURE__ */ W("li", { children: [
				/* @__PURE__ */ U("code", { children: "format" }),
				" — target format: ",
				/* @__PURE__ */ U("code", { children: "jpeg" }),
				", ",
				/* @__PURE__ */ U("code", { children: "png" }),
				", ",
				/* @__PURE__ */ U("code", { children: "webp" }),
				", ",
				/* @__PURE__ */ U("code", { children: "avif" }),
				", ",
				/* @__PURE__ */ U("code", { children: "tiff" }),
				", ",
				/* @__PURE__ */ U("code", { children: "gif" }),
				"."
			] }),
			/* @__PURE__ */ W("li", { children: [/* @__PURE__ */ U("code", { children: "quality" }), " — 1–100 for lossy formats."] }),
			/* @__PURE__ */ W("li", { children: [/* @__PURE__ */ U("code", { children: "lossless" }), " — force lossless for WebP/AVIF."] })
		] }),
		/* @__PURE__ */ U("h4", { children: "Wiring" }),
		/* @__PURE__ */ W("p", { children: [
			"Input ",
			/* @__PURE__ */ U("code", { children: "in" }),
			", output ",
			/* @__PURE__ */ U("code", { children: "out" }),
			", error handle ",
			/* @__PURE__ */ U("code", { children: "error" }),
			"."
		] })
	] }),
	"image:sharpen": /* @__PURE__ */ W(H, { children: [
		/* @__PURE__ */ U("h4", { children: "What it does" }),
		/* @__PURE__ */ U("p", { children: "Applies unsharp mask sharpening via sharp." }),
		/* @__PURE__ */ U("h4", { children: "Fields" }),
		/* @__PURE__ */ W("ul", { children: [
			/* @__PURE__ */ W("li", { children: [/* @__PURE__ */ U("code", { children: "sigma" }), " — Gaussian sigma (0.5–3). Controls radius of the blur before differencing."] }),
			/* @__PURE__ */ W("li", { children: [/* @__PURE__ */ U("code", { children: "m1" }), " — flat area threshold (default 1.0)."] }),
			/* @__PURE__ */ W("li", { children: [/* @__PURE__ */ U("code", { children: "m2" }), " — jagged area threshold (default 2.0)."] })
		] }),
		/* @__PURE__ */ U("h4", { children: "Wiring" }),
		/* @__PURE__ */ W("p", { children: [
			"Input ",
			/* @__PURE__ */ U("code", { children: "in" }),
			", output ",
			/* @__PURE__ */ U("code", { children: "out" }),
			", error handle ",
			/* @__PURE__ */ U("code", { children: "error" }),
			"."
		] })
	] }),
	"image:watermark": /* @__PURE__ */ W(H, { children: [
		/* @__PURE__ */ U("h4", { children: "What it does" }),
		/* @__PURE__ */ U("p", { children: "Composites an overlay image (watermark / logo) atop the source." }),
		/* @__PURE__ */ U("h4", { children: "Fields" }),
		/* @__PURE__ */ W("ul", { children: [
			/* @__PURE__ */ W("li", { children: [/* @__PURE__ */ U("code", { children: "overlayImageId" }), " — the watermark image stored in the blob store."] }),
			/* @__PURE__ */ W("li", { children: [
				/* @__PURE__ */ U("code", { children: "gravity" }),
				" — placement: ",
				/* @__PURE__ */ U("code", { children: "northwest" }),
				", ",
				/* @__PURE__ */ U("code", { children: "north" }),
				", ",
				/* @__PURE__ */ U("code", { children: "northeast" }),
				", ",
				/* @__PURE__ */ U("code", { children: "west" }),
				", ",
				/* @__PURE__ */ U("code", { children: "center" }),
				", ",
				/* @__PURE__ */ U("code", { children: "east" }),
				", ",
				/* @__PURE__ */ U("code", { children: "southwest" }),
				", ",
				/* @__PURE__ */ U("code", { children: "south" }),
				", ",
				/* @__PURE__ */ U("code", { children: "southeast" }),
				"."
			] }),
			/* @__PURE__ */ W("li", { children: [/* @__PURE__ */ U("code", { children: "opacity" }), " — 0.0–1.0 (default 1.0)."] }),
			/* @__PURE__ */ W("li", { children: [
				/* @__PURE__ */ U("code", { children: "offsetX" }),
				" / ",
				/* @__PURE__ */ U("code", { children: "offsetY" }),
				" — pixel nudge from gravity anchor."
			] })
		] }),
		/* @__PURE__ */ U("h4", { children: "Wiring" }),
		/* @__PURE__ */ W("p", { children: [
			"Input ",
			/* @__PURE__ */ U("code", { children: "in" }),
			", output ",
			/* @__PURE__ */ U("code", { children: "out" }),
			", error handle ",
			/* @__PURE__ */ U("code", { children: "error" }),
			"."
		] })
	] }),
	"image:crop": /* @__PURE__ */ W(H, { children: [
		/* @__PURE__ */ U("h4", { children: "What it does" }),
		/* @__PURE__ */ U("p", { children: "Crops a rectangular region from the source image using a bounding box resolved from pipeline context." }),
		/* @__PURE__ */ U("h4", { children: "Fields" }),
		/* @__PURE__ */ W("ul", { children: [
			/* @__PURE__ */ W("li", { children: [
				/* @__PURE__ */ U("code", { children: "sourceImagePath" }),
				" — JSONPath to the source imageId (default: ",
				/* @__PURE__ */ U("code", { children: "$.trigger.imageRef" }),
				")."
			] }),
			/* @__PURE__ */ W("li", { children: [
				/* @__PURE__ */ U("code", { children: "bboxPath" }),
				" — JSONPath to a ",
				/* @__PURE__ */ U("code", { children: "{ x, y, width, height }" }),
				" object in context."
			] }),
			/* @__PURE__ */ W("li", { children: [/* @__PURE__ */ U("code", { children: "materialize" }), " — if true, saves the cropped image to the blob store; otherwise returns inline."] })
		] }),
		/* @__PURE__ */ U("h4", { children: "Wiring" }),
		/* @__PURE__ */ W("p", { children: [
			"Input ",
			/* @__PURE__ */ U("code", { children: "in" }),
			", output ",
			/* @__PURE__ */ U("code", { children: "out" }),
			"."
		] })
	] }),
	"image:adjust-bw": /* @__PURE__ */ W(H, { children: [
		/* @__PURE__ */ U("h4", { children: "What it does" }),
		/* @__PURE__ */ U("p", { children: "Converts a colour image to greyscale with an adjustable contrast." }),
		/* @__PURE__ */ U("h4", { children: "Fields" }),
		/* @__PURE__ */ W("ul", { children: [/* @__PURE__ */ W("li", { children: [
			/* @__PURE__ */ U("code", { children: "algorithm" }),
			" — ",
			/* @__PURE__ */ U("code", { children: "luminosity" }),
			" (default), ",
			/* @__PURE__ */ U("code", { children: "average" }),
			", or ",
			/* @__PURE__ */ U("code", { children: "lightness" }),
			"."
		] }), /* @__PURE__ */ W("li", { children: [/* @__PURE__ */ U("code", { children: "contrast" }), " — multiplier applied after greyscale conversion (default 1.0)."] })] }),
		/* @__PURE__ */ U("h4", { children: "Wiring" }),
		/* @__PURE__ */ W("p", { children: [
			"Input ",
			/* @__PURE__ */ U("code", { children: "in" }),
			", output ",
			/* @__PURE__ */ U("code", { children: "out" }),
			", error handle ",
			/* @__PURE__ */ U("code", { children: "error" }),
			"."
		] })
	] }),
	"image:adjust-layer": /* @__PURE__ */ W(H, { children: [
		/* @__PURE__ */ U("h4", { children: "What it does" }),
		/* @__PURE__ */ U("p", { children: "Applies a composable stack of colour and filter adjustments in sequence." }),
		/* @__PURE__ */ U("h4", { children: "Layer kinds" }),
		/* @__PURE__ */ W("ul", { children: [
			/* @__PURE__ */ W("li", { children: [
				/* @__PURE__ */ U("code", { children: "brightness" }),
				" / ",
				/* @__PURE__ */ U("code", { children: "contrast" }),
				" / ",
				/* @__PURE__ */ U("code", { children: "saturation" }),
				" — multiplicative factor (1.0 = no change)."
			] }),
			/* @__PURE__ */ W("li", { children: [/* @__PURE__ */ U("code", { children: "hue" }), " — degrees to rotate the hue wheel."] }),
			/* @__PURE__ */ W("li", { children: [/* @__PURE__ */ U("code", { children: "blur" }), " — Gaussian blur radius in pixels."] })
		] }),
		/* @__PURE__ */ U("h4", { children: "Wiring" }),
		/* @__PURE__ */ W("p", { children: [
			"Input ",
			/* @__PURE__ */ U("code", { children: "in" }),
			", output ",
			/* @__PURE__ */ U("code", { children: "out" }),
			", error handle ",
			/* @__PURE__ */ U("code", { children: "error" }),
			"."
		] })
	] }),
	"image:dimensions": /* @__PURE__ */ W(H, { children: [
		/* @__PURE__ */ U("h4", { children: "What it does" }),
		/* @__PURE__ */ W("p", { children: [
			"Reads a source image's natural size and emits dimension data — ",
			/* @__PURE__ */ U("code", { children: "width" }),
			", ",
			/* @__PURE__ */ U("code", { children: "height" }),
			", ",
			/* @__PURE__ */ U("code", { children: "aspectRatio" }),
			", plus ",
			/* @__PURE__ */ U("code", { children: "genWidth" }),
			"/",
			/* @__PURE__ */ U("code", { children: "genHeight" }),
			" scaled to fit within ",
			/* @__PURE__ */ U("code", { children: "maxEdge" }),
			". It does ",
			/* @__PURE__ */ U("em", { children: "not" }),
			" output an image."
		] }),
		/* @__PURE__ */ U("h4", { children: "Fields" }),
		/* @__PURE__ */ W("ul", { children: [/* @__PURE__ */ W("li", { children: [/* @__PURE__ */ U("code", { children: "sourceImagePath" }), " — JSONPath to the source image (optional; defaults to the upstream image)."] }), /* @__PURE__ */ W("li", { children: [/* @__PURE__ */ U("code", { children: "maxEdge" }), " — longest-edge cap used to derive the generation dimensions (default 1024)."] })] }),
		/* @__PURE__ */ U("h4", { children: "Wiring" }),
		/* @__PURE__ */ W("p", { children: [
			"Image input ",
			/* @__PURE__ */ U("code", { children: "in" }),
			", data output ",
			/* @__PURE__ */ U("code", { children: "out" }),
			" (wire into Generate's width/height), error handle ",
			/* @__PURE__ */ U("code", { children: "error" }),
			"."
		] })
	] }),
	"image:upscale": /* @__PURE__ */ W(H, { children: [
		/* @__PURE__ */ U("h4", { children: "What it does" }),
		/* @__PURE__ */ U("p", { children: "Super-resolves a source image via a self-hosted x4 upscaler and outputs a new, higher-resolution image." }),
		/* @__PURE__ */ U("h4", { children: "Fields" }),
		/* @__PURE__ */ W("ul", { children: [
			/* @__PURE__ */ W("li", { children: [/* @__PURE__ */ U("code", { children: "sourceImagePath" }), " — JSONPath to the source image (optional; defaults to the upstream image)."] }),
			/* @__PURE__ */ W("li", { children: [/* @__PURE__ */ U("code", { children: "prompt" }), " — optional guidance forwarded to the upscaler."] }),
			/* @__PURE__ */ W("li", { children: [/* @__PURE__ */ U("code", { children: "maxEdge" }), " — longest-edge cap applied before the 4× pass (default 1024)."] })
		] }),
		/* @__PURE__ */ U("h4", { children: "Wiring" }),
		/* @__PURE__ */ W("p", { children: [
			"Image input ",
			/* @__PURE__ */ U("code", { children: "in" }),
			", image output ",
			/* @__PURE__ */ U("code", { children: "out" }),
			", error handle ",
			/* @__PURE__ */ U("code", { children: "error" }),
			"."
		] })
	] }),
	"image:vision-analyze": /* @__PURE__ */ W(H, { children: [
		/* @__PURE__ */ U("h4", { children: "What it does" }),
		/* @__PURE__ */ U("p", { children: "Analyzes an image with a Claude vision model. Supports free-form caption mode (leave schema blank) or structured JSON extraction (provide a JSON Schema)." }),
		/* @__PURE__ */ U("h4", { children: "Fields" }),
		/* @__PURE__ */ W("ul", { children: [
			/* @__PURE__ */ W("li", { children: [
				/* @__PURE__ */ U("code", { children: "imageRefPath" }),
				" — JSONPath to the imageId (default: ",
				/* @__PURE__ */ U("code", { children: "$.trigger.imageRef" }),
				")."
			] }),
			/* @__PURE__ */ W("li", { children: [/* @__PURE__ */ U("code", { children: "userPrompt" }), " — required. What to ask the model about the image."] }),
			/* @__PURE__ */ W("li", { children: [/* @__PURE__ */ U("code", { children: "outputSchema" }), " — optional JSON Schema; presence switches to structured extraction mode."] }),
			/* @__PURE__ */ W("li", { children: [
				/* @__PURE__ */ U("code", { children: "model" }),
				" — default ",
				/* @__PURE__ */ U("code", { children: "claude-sonnet-4-6" }),
				"."
			] })
		] }),
		/* @__PURE__ */ U("h4", { children: "Wiring" }),
		/* @__PURE__ */ W("p", { children: [
			"Input ",
			/* @__PURE__ */ U("code", { children: "in" }),
			", output ",
			/* @__PURE__ */ U("code", { children: "out" }),
			"."
		] })
	] }),
	"image:vision-classify": /* @__PURE__ */ W(H, { children: [
		/* @__PURE__ */ U("h4", { children: "What it does" }),
		/* @__PURE__ */ U("p", { children: "Classifies an image into one of a configured label set." }),
		/* @__PURE__ */ U("h4", { children: "Fields" }),
		/* @__PURE__ */ W("ul", { children: [/* @__PURE__ */ W("li", { children: [
			/* @__PURE__ */ U("code", { children: "labels" }),
			" — array of candidate labels (e.g. ",
			/* @__PURE__ */ U("code", { children: "['cat', 'dog', 'bird']" }),
			")."
		] }), /* @__PURE__ */ W("li", { children: [
			/* @__PURE__ */ U("code", { children: "model" }),
			" — default ",
			/* @__PURE__ */ U("code", { children: "claude-haiku-4-5" }),
			"."
		] })] }),
		/* @__PURE__ */ U("h4", { children: "Output" }),
		/* @__PURE__ */ W("p", { children: [
			"Produces ",
			/* @__PURE__ */ U("code", { children: "{ label, confidence }" }),
			" in context."
		] }),
		/* @__PURE__ */ U("h4", { children: "Wiring" }),
		/* @__PURE__ */ W("p", { children: [
			"Input ",
			/* @__PURE__ */ U("code", { children: "in" }),
			", output ",
			/* @__PURE__ */ U("code", { children: "out" }),
			", error handle ",
			/* @__PURE__ */ U("code", { children: "error" }),
			"."
		] })
	] }),
	"image:vision-describe": /* @__PURE__ */ W(H, { children: [
		/* @__PURE__ */ U("h4", { children: "What it does" }),
		/* @__PURE__ */ U("p", { children: "Generates a natural-language caption for an image via Claude Haiku." }),
		/* @__PURE__ */ U("h4", { children: "Fields" }),
		/* @__PURE__ */ W("ul", { children: [
			/* @__PURE__ */ W("li", { children: [/* @__PURE__ */ U("code", { children: "imageRefPath" }), " — JSONPath to the imageId."] }),
			/* @__PURE__ */ W("li", { children: [/* @__PURE__ */ U("code", { children: "userPrompt" }), " — optional override (default: describe the image)."] }),
			/* @__PURE__ */ W("li", { children: [/* @__PURE__ */ U("code", { children: "systemPrompt" }), " — optional system context."] }),
			/* @__PURE__ */ W("li", { children: [/* @__PURE__ */ U("code", { children: "maxOutputTokens" }), " — cap on response length."] })
		] }),
		/* @__PURE__ */ U("h4", { children: "Wiring" }),
		/* @__PURE__ */ W("p", { children: [
			"Input ",
			/* @__PURE__ */ U("code", { children: "in" }),
			", output ",
			/* @__PURE__ */ U("code", { children: "out" }),
			", error handle ",
			/* @__PURE__ */ U("code", { children: "error" }),
			"."
		] })
	] }),
	"image:vision-tag": /* @__PURE__ */ W(H, { children: [
		/* @__PURE__ */ U("h4", { children: "What it does" }),
		/* @__PURE__ */ U("p", { children: "Extracts ranked tags from an image. Open-vocabulary or guided by a candidate tag list." }),
		/* @__PURE__ */ U("h4", { children: "Fields" }),
		/* @__PURE__ */ W("ul", { children: [
			/* @__PURE__ */ W("li", { children: [/* @__PURE__ */ U("code", { children: "candidateTags" }), " — optional array to guide tagging. Leave blank for open-vocabulary."] }),
			/* @__PURE__ */ W("li", { children: [/* @__PURE__ */ U("code", { children: "maxTags" }), " — maximum number of tags to return (default 10)."] }),
			/* @__PURE__ */ W("li", { children: [
				/* @__PURE__ */ U("code", { children: "model" }),
				" — default ",
				/* @__PURE__ */ U("code", { children: "claude-haiku-4-5" }),
				"."
			] })
		] }),
		/* @__PURE__ */ U("h4", { children: "Wiring" }),
		/* @__PURE__ */ W("p", { children: [
			"Input ",
			/* @__PURE__ */ U("code", { children: "in" }),
			", output ",
			/* @__PURE__ */ U("code", { children: "out" }),
			", error handle ",
			/* @__PURE__ */ U("code", { children: "error" }),
			"."
		] })
	] }),
	"image:vision-extract-text": /* @__PURE__ */ W(H, { children: [
		/* @__PURE__ */ U("h4", { children: "What it does" }),
		/* @__PURE__ */ U("p", { children: "Extracts text from an image via Claude vision (OCR)." }),
		/* @__PURE__ */ U("h4", { children: "Fields" }),
		/* @__PURE__ */ W("ul", { children: [
			/* @__PURE__ */ W("li", { children: [/* @__PURE__ */ U("code", { children: "imageRefPath" }), " — JSONPath to the imageId."] }),
			/* @__PURE__ */ W("li", { children: [
				/* @__PURE__ */ U("code", { children: "model" }),
				" — default ",
				/* @__PURE__ */ U("code", { children: "claude-sonnet-4-6" }),
				"."
			] }),
			/* @__PURE__ */ W("li", { children: [/* @__PURE__ */ U("code", { children: "systemPrompt" }), " — optional instruction for the extraction task."] }),
			/* @__PURE__ */ W("li", { children: [/* @__PURE__ */ U("code", { children: "maxOutputTokens" }), " — response length cap."] })
		] }),
		/* @__PURE__ */ U("h4", { children: "Output" }),
		/* @__PURE__ */ W("p", { children: [
			"Produces ",
			/* @__PURE__ */ U("code", { children: "{ text, lines }" }),
			" in context."
		] }),
		/* @__PURE__ */ U("h4", { children: "Wiring" }),
		/* @__PURE__ */ W("p", { children: [
			"Input ",
			/* @__PURE__ */ U("code", { children: "in" }),
			", output ",
			/* @__PURE__ */ U("code", { children: "out" }),
			", error handle ",
			/* @__PURE__ */ U("code", { children: "error" }),
			"."
		] })
	] }),
	"image:generate": /* @__PURE__ */ W(H, { children: [
		/* @__PURE__ */ U("h4", { children: "What it does" }),
		/* @__PURE__ */ U("p", { children: "Generates images from a text prompt using the host's configured image model." }),
		/* @__PURE__ */ U("h4", { children: "Fields" }),
		/* @__PURE__ */ W("ul", { children: [
			/* @__PURE__ */ W("li", { children: [/* @__PURE__ */ U("code", { children: "prompt" }), " — required. Describes what to generate."] }),
			/* @__PURE__ */ W("li", { children: [
				/* @__PURE__ */ U("code", { children: "model" }),
				" — default ",
				/* @__PURE__ */ U("code", { children: "amazon.titan-image-generator-v1" }),
				"."
			] }),
			/* @__PURE__ */ W("li", { children: [
				/* @__PURE__ */ U("code", { children: "width" }),
				" / ",
				/* @__PURE__ */ U("code", { children: "height" }),
				" — output dimensions."
			] }),
			/* @__PURE__ */ W("li", { children: [/* @__PURE__ */ U("code", { children: "seed" }), " — optional for reproducible generation."] }),
			/* @__PURE__ */ W("li", { children: [/* @__PURE__ */ U("code", { children: "numImages" }), " — 1–4 images to produce."] })
		] }),
		/* @__PURE__ */ U("h4", { children: "Wiring" }),
		/* @__PURE__ */ W("p", { children: [
			"Input ",
			/* @__PURE__ */ U("code", { children: "in" }),
			", output ",
			/* @__PURE__ */ U("code", { children: "out" }),
			", error handle ",
			/* @__PURE__ */ U("code", { children: "error" }),
			"."
		] })
	] }),
	"image:variation": /* @__PURE__ */ W(H, { children: [
		/* @__PURE__ */ U("h4", { children: "What it does" }),
		/* @__PURE__ */ U("p", { children: "Generates variations of a source image using Nova Canvas. Always fans out — each variation becomes a separate downstream arm." }),
		/* @__PURE__ */ U("h4", { children: "Fields" }),
		/* @__PURE__ */ W("ul", { children: [
			/* @__PURE__ */ W("li", { children: [/* @__PURE__ */ U("code", { children: "sourceImagePath" }), " — JSONPath to the source imageId."] }),
			/* @__PURE__ */ W("li", { children: [/* @__PURE__ */ U("code", { children: "numVariations" }), " — 1–8 variations to generate (default 1)."] }),
			/* @__PURE__ */ W("li", { children: [/* @__PURE__ */ U("code", { children: "similarity" }), " — 0.0–1.0 how closely each variation resembles the source (default 0.7)."] }),
			/* @__PURE__ */ W("li", { children: [
				/* @__PURE__ */ U("code", { children: "model" }),
				" — default ",
				/* @__PURE__ */ U("code", { children: "amazon.nova-canvas-v1:0" }),
				"."
			] })
		] }),
		/* @__PURE__ */ U("h4", { children: "Wiring" }),
		/* @__PURE__ */ W("p", { children: [
			"Input ",
			/* @__PURE__ */ U("code", { children: "in" }),
			", output ",
			/* @__PURE__ */ U("code", { children: "out" }),
			" (fires once per variation), error handle ",
			/* @__PURE__ */ U("code", { children: "error" }),
			"."
		] })
	] }),
	"image:edit-prompt": /* @__PURE__ */ W(H, { children: [
		/* @__PURE__ */ U("h4", { children: "What it does" }),
		/* @__PURE__ */ U("p", { children: "Inpaints or outpaints a region of an image using Nova Canvas." }),
		/* @__PURE__ */ U("h4", { children: "Fields" }),
		/* @__PURE__ */ W("ul", { children: [
			/* @__PURE__ */ W("li", { children: [/* @__PURE__ */ U("code", { children: "prompt" }), " — required. Describes what to generate in the edited region."] }),
			/* @__PURE__ */ W("li", { children: [/* @__PURE__ */ U("code", { children: "sourceImagePath" }), " — JSONPath to the source imageId."] }),
			/* @__PURE__ */ W("li", { children: [/* @__PURE__ */ U("code", { children: "maskImagePath" }), " — optional JSONPath to a mask imageId (white = edit, black = preserve). Omit for outpainting."] }),
			/* @__PURE__ */ W("li", { children: [
				/* @__PURE__ */ U("code", { children: "model" }),
				" — default ",
				/* @__PURE__ */ U("code", { children: "amazon.nova-canvas-v1:0" }),
				"."
			] })
		] }),
		/* @__PURE__ */ U("h4", { children: "Wiring" }),
		/* @__PURE__ */ W("p", { children: [
			"Input ",
			/* @__PURE__ */ U("code", { children: "in" }),
			", output ",
			/* @__PURE__ */ U("code", { children: "out" }),
			", error handle ",
			/* @__PURE__ */ U("code", { children: "error" }),
			"."
		] })
	] })
};
//#endregion
//#region src/components/pipelines/nodes/image-source/ImageSourceConfig.tsx
function oc({ data: e, onChange: t }) {
	return /* @__PURE__ */ W(va, { children: [/* @__PURE__ */ W("div", { children: [
		/* @__PURE__ */ W("label", {
			htmlFor: "image-source-image-id",
			className: "block text-[12px] font-semibold text-text-primary",
			children: [
				"Image ID",
				" ",
				/* @__PURE__ */ U("span", {
					className: "text-text-secondary font-normal",
					children: "(optional — can be set at run time)"
				})
			]
		}),
		/* @__PURE__ */ U(k, {
			id: "image-source-image-id",
			type: "text",
			size: "sm",
			mono: !0,
			spellCheck: !1,
			className: "mt-1",
			value: e.imageId ?? "",
			onChange: (e) => t({ imageId: e.target.value.trim() || void 0 }),
			placeholder: "img_xxxxxxxx"
		}),
		/* @__PURE__ */ U("p", {
			className: "mt-0.5 text-[11px] text-text-secondary",
			children: "The imageId of an image already in the blob store. Leave blank to have the trigger or a preceding step supply the image at runtime."
		})
	] }), /* @__PURE__ */ W("div", { children: [
		/* @__PURE__ */ W("label", {
			htmlFor: "image-source-output-key",
			className: "block text-[12px] font-semibold text-text-primary",
			children: [
				"Output key",
				" ",
				/* @__PURE__ */ U("span", {
					className: "text-text-secondary font-normal",
					children: "(default: imageRef)"
				})
			]
		}),
		/* @__PURE__ */ U(k, {
			id: "image-source-output-key",
			type: "text",
			size: "sm",
			mono: !0,
			spellCheck: !1,
			className: "mt-1",
			value: e.outputKey ?? "",
			onChange: (e) => t({ outputKey: e.target.value.trim() || void 0 }),
			placeholder: "imageRef"
		}),
		/* @__PURE__ */ W("p", {
			className: "mt-0.5 text-[11px] text-text-secondary",
			children: [
				"The key written to pipeline context (accessible as",
				" ",
				/* @__PURE__ */ W("code", { children: ["$.trigger.", "<key>"] }),
				" by downstream steps)."
			]
		})
	] })] });
}
//#endregion
//#region src/components/pipelines/nodes/save/SaveConfig.tsx
var sc = [
	"{{scatter.item.label}}",
	"{{scatter.index}}",
	"{{scatter.parentImageId}}"
];
function cc({ data: e, onChange: t, nodeId: n }) {
	let r = Da(n ?? null);
	return /* @__PURE__ */ W(va, { children: [/* @__PURE__ */ W("div", { children: [
		/* @__PURE__ */ W("label", {
			htmlFor: "save-source-image-path",
			className: "block text-[12px] font-semibold text-text-primary",
			children: [
				"Source image path",
				" ",
				/* @__PURE__ */ U("span", {
					className: "text-text-secondary font-normal",
					children: "(optional)"
				})
			]
		}),
		/* @__PURE__ */ U(k, {
			id: "save-source-image-path",
			type: "text",
			size: "sm",
			mono: !0,
			spellCheck: !1,
			className: "mt-1",
			value: e.sourceImagePath ?? "",
			onChange: (e) => t({ sourceImagePath: e.target.value.trim() || void 0 }),
			placeholder: "$.scatter.parentImageId"
		}),
		/* @__PURE__ */ W("p", {
			className: "mt-0.5 text-[11px] text-text-secondary",
			children: [
				"JSONPath to the imageId to save. Defaults server-side to",
				" ",
				/* @__PURE__ */ U("code", { children: "$.scatter.parentImageId" }),
				"."
			]
		}),
		/* @__PURE__ */ U(ya, {
			samples: r.map((e) => e.path),
			onSelect: (e) => t({ sourceImagePath: e })
		})
	] }), /* @__PURE__ */ W("div", { children: [
		/* @__PURE__ */ W("label", {
			htmlFor: "save-filename-template",
			className: "block text-[12px] font-semibold text-text-primary",
			children: [
				"Filename template",
				" ",
				/* @__PURE__ */ U("span", {
					className: "text-text-secondary font-normal",
					children: "(optional)"
				})
			]
		}),
		/* @__PURE__ */ U(k, {
			id: "save-filename-template",
			type: "text",
			size: "sm",
			mono: !0,
			spellCheck: !1,
			className: "mt-1",
			value: e.filenameTemplate ?? "",
			onChange: (e) => t({ filenameTemplate: e.target.value.trim() || void 0 }),
			placeholder: "crop-{{scatter.index}}.png"
		}),
		/* @__PURE__ */ W("p", {
			className: "mt-0.5 text-[11px] text-text-secondary",
			children: [
				"Output filename. Supports",
				" ",
				/* @__PURE__ */ U("code", { children: "{{scatter.item.label}}" }),
				",",
				" ",
				/* @__PURE__ */ U("code", { children: "{{scatter.index}}" }),
				", and",
				" ",
				/* @__PURE__ */ U("code", { children: "{{scatter.parentImageId}}" }),
				" substitutions. Default:",
				" ",
				/* @__PURE__ */ W("code", { children: [
					"crop-",
					"{{scatter.index}}",
					".png"
				] }),
				"."
			]
		}),
		/* @__PURE__ */ W("div", {
			className: "mt-1.5",
			children: [/* @__PURE__ */ U("div", {
				className: "text-[10px] text-text-secondary mb-1",
				children: "Quick-fill variable:"
			}), /* @__PURE__ */ U(ya, {
				samples: sc,
				onSelect: (n) => {
					t({ filenameTemplate: (e.filenameTemplate ?? "") + n });
				}
			})]
		})
	] })] });
}
//#endregion
//#region src/components/pipelines/nodes/memory/MemoryConfig.tsx
var lc = [{
	value: "read",
	label: "Read",
	help: "Look records up and write them into context."
}, {
	value: "write",
	label: "Write",
	help: "Persist a value from context into memory."
}], uc = [{
	value: "session",
	label: "Session",
	help: "Scoped to this run; cleared when the session ends."
}, {
	value: "long-term",
	label: "Long-term",
	help: "Persists across runs for the namespace."
}];
function dc({ data: e, onChange: t, nodeId: n }) {
	let r = ut(), { paths: i, unresolved: a } = Ea(n ?? null), o = e.mode === "write", s = !e.namespace?.trim(), c = !e.keyExpression?.trim(), l = o && !e.valueField?.trim(), u = lc.find((t) => t.value === e.mode)?.help, d = uc.find((t) => t.value === e.scope)?.help;
	return /* @__PURE__ */ W(va, { children: [
		/* @__PURE__ */ U(X, {
			label: "Mode",
			required: !0,
			help: u,
			controlId: `${r}-mode`,
			render: ({ controlId: n, describedById: r }) => /* @__PURE__ */ U(j, {
				size: "sm",
				id: n,
				"aria-describedby": r,
				value: e.mode,
				onChange: (e) => t({ mode: e.target.value }),
				options: lc.map((e) => ({
					value: e.value,
					label: e.label
				}))
			})
		}),
		/* @__PURE__ */ U(X, {
			label: "Scope",
			required: !0,
			help: d,
			controlId: `${r}-scope`,
			render: ({ controlId: n, describedById: r }) => /* @__PURE__ */ U(j, {
				size: "sm",
				id: n,
				"aria-describedby": r,
				value: e.scope,
				onChange: (e) => t({ scope: e.target.value }),
				options: uc.map((e) => ({
					value: e.value,
					label: e.label
				}))
			})
		}),
		/* @__PURE__ */ U(X, {
			label: "Namespace",
			required: !0,
			error: s ? "Namespace is required." : void 0,
			help: s ? void 0 : "Groups related records. Reads only see their own namespace.",
			controlId: `${r}-namespace`,
			render: ({ controlId: n, describedById: r }) => /* @__PURE__ */ U(k, {
				size: "sm",
				mono: !0,
				spellCheck: !1,
				id: n,
				"aria-describedby": r,
				value: e.namespace ?? "",
				onChange: (e) => t({ namespace: e.target.value }),
				placeholder: "support-conversations"
			})
		}),
		/* @__PURE__ */ U(X, {
			label: "Key expression",
			required: !0,
			error: c ? "Key expression is required." : void 0,
			help: c ? void 0 : "Identifies the record. Supports {{ context.* }} substitution.",
			controlId: `${r}-key-expression`,
			render: ({ controlId: n, describedById: r }) => /* @__PURE__ */ U(k, {
				size: "sm",
				mono: !0,
				spellCheck: !1,
				id: n,
				"aria-describedby": r,
				value: e.keyExpression ?? "",
				onChange: (e) => t({ keyExpression: e.target.value }),
				placeholder: "{{context.trigger.userId}}"
			})
		}),
		/* @__PURE__ */ U(X, {
			label: "Available context",
			render: ({ labelId: n }) => /* @__PURE__ */ U("div", {
				role: "group",
				"aria-labelledby": n,
				children: /* @__PURE__ */ U(qa, {
					paths: i,
					unresolved: a(`${e.keyExpression ?? ""}\n${o ? e.valueField ?? "" : ""}`),
					onInsert: (n) => t({ keyExpression: `${e.keyExpression ?? ""}${n}` })
				})
			})
		}),
		o ? /* @__PURE__ */ U(X, {
			label: "Value field",
			required: !0,
			error: l ? "Value field is required for a write." : void 0,
			help: l ? void 0 : "Context path whose value is persisted.",
			controlId: `${r}-value-field`,
			render: ({ controlId: n, describedById: r }) => /* @__PURE__ */ U(k, {
				size: "sm",
				mono: !0,
				spellCheck: !1,
				id: n,
				"aria-describedby": r,
				value: e.valueField ?? "",
				onChange: (e) => t({ valueField: e.target.value || void 0 }),
				placeholder: "context.steps.llm-1.output"
			})
		}) : /* @__PURE__ */ U(X, {
			label: "Output key",
			help: "Where retrieved records land in context. Defaults to this step's output.",
			controlId: `${r}-output-key`,
			render: ({ controlId: n, describedById: r }) => /* @__PURE__ */ U(k, {
				size: "sm",
				mono: !0,
				spellCheck: !1,
				id: n,
				"aria-describedby": r,
				value: e.outputKey ?? "",
				onChange: (e) => t({ outputKey: e.target.value || void 0 }),
				placeholder: "recalled"
			})
		})
	] });
}
//#endregion
//#region src/components/pipelines/nodes/knowledge-base/KnowledgeBaseConfig.tsx
var fc = 100;
function pc({ data: e, onChange: t, nodeId: n }) {
	let r = ut(), { paths: i, unresolved: a } = Ea(n ?? null), o = Je("knowledge-base"), s = !e.knowledgeBaseId?.trim(), c = !e.queryTemplate?.trim(), l = e.topK ?? 0, u = !Number.isFinite(l) || l < 1 || l > fc, d = e.scoreThreshold, f = d !== void 0 && (d < 0 || d > 1);
	return /* @__PURE__ */ W(va, { children: [/* @__PURE__ */ W(_a, {
		title: "Knowledge base",
		children: [
			/* @__PURE__ */ U(X, {
				label: o.label("knowledgeBaseId", "Knowledge base ID"),
				required: !0,
				error: s ? "Knowledge base ID is required." : void 0,
				help: s ? void 0 : o.help("knowledgeBaseId", "The knowledge base to retrieve from."),
				controlId: `${r}-kb-id`,
				render: ({ controlId: n, describedById: r }) => /* @__PURE__ */ U(k, {
					size: "sm",
					mono: !0,
					spellCheck: !1,
					id: n,
					"aria-describedby": r,
					value: e.knowledgeBaseId ?? "",
					onChange: (e) => t({ knowledgeBaseId: e.target.value }),
					placeholder: o.placeholder("knowledgeBaseId", "my-knowledge-base")
				})
			}),
			/* @__PURE__ */ U(X, {
				label: o.label("queryTemplate", "Query template"),
				required: !0,
				error: c ? "Query template is required." : void 0,
				help: c ? void 0 : o.help("queryTemplate", "Text to embed and search. Supports {{ context.* }} substitution."),
				controlId: `${r}-query-template`,
				render: ({ controlId: n, describedById: r }) => /* @__PURE__ */ U(A, {
					rows: 4,
					invalid: c,
					spellCheck: !1,
					id: n,
					"aria-describedby": r,
					value: e.queryTemplate ?? "",
					onChange: (e) => t({ queryTemplate: e.target.value }),
					placeholder: "{{context.trigger.question}}"
				})
			}),
			/* @__PURE__ */ U(X, {
				label: "Available context",
				render: ({ labelId: n }) => /* @__PURE__ */ U("div", {
					role: "group",
					"aria-labelledby": n,
					children: /* @__PURE__ */ U(qa, {
						paths: i,
						unresolved: a(e.queryTemplate ?? ""),
						onInsert: (n) => t({ queryTemplate: `${e.queryTemplate ?? ""}${n}` })
					})
				})
			})
		]
	}), /* @__PURE__ */ W(_a, {
		title: "Retrieval",
		children: [
			/* @__PURE__ */ U(X, {
				label: o.label("topK", "Top K"),
				required: !0,
				error: u ? `Must be between 1 and ${fc}.` : void 0,
				help: u ? void 0 : o.help("topK", "How many passages to retrieve."),
				controlId: `${r}-top-k`,
				render: ({ controlId: e, describedById: n }) => /* @__PURE__ */ U(M, {
					size: "sm",
					min: 1,
					max: fc,
					step: 1,
					value: l,
					onChange: (e) => t({ topK: e }),
					invalid: u,
					id: e,
					"aria-describedby": n,
					"data-testid": "kb-top-k"
				})
			}),
			/* @__PURE__ */ U(X, {
				label: o.label("scoreThreshold", "Score threshold"),
				error: f ? "Must be between 0 and 1." : void 0,
				help: f ? void 0 : "Drop passages scoring below this. Leave empty for no filtering.",
				controlId: `${r}-score-threshold`,
				render: ({ controlId: e, describedById: n }) => /* @__PURE__ */ U(M, {
					size: "sm",
					min: 0,
					max: 1,
					step: .05,
					value: d ?? 0,
					onChange: (e) => t({ scoreThreshold: e }),
					invalid: f,
					id: e,
					"aria-describedby": n,
					"data-testid": "kb-score-threshold"
				})
			}),
			/* @__PURE__ */ U(X, {
				label: "Output key",
				help: "Where retrieved passages land in context. Defaults to this step's output.",
				controlId: `${r}-output-key`,
				render: ({ controlId: n, describedById: r }) => /* @__PURE__ */ U(k, {
					size: "sm",
					mono: !0,
					spellCheck: !1,
					id: n,
					"aria-describedby": r,
					value: e.outputKey ?? "",
					onChange: (e) => t({ outputKey: e.target.value || void 0 }),
					placeholder: "passages"
				})
			}),
			/* @__PURE__ */ U(Ga, {
				value: e.retryPolicy,
				onChange: (e) => t({ retryPolicy: e })
			})
		]
	})] });
}
//#endregion
//#region src/components/pipelines/nodes/graph-query/GraphQueryConfig.tsx
var mc = "MATCH (u:User {id: $userId})-[:AUTHORED]->(d:Doc)\nRETURN d.title LIMIT 10", hc = 100, gc = 3e5;
function _c({ data: e, onChange: t, nodeId: n }) {
	let r = ut(), { paths: i, unresolved: a } = Ea(n ?? null), o = Je("graph-query"), s = !e.graphId?.trim(), c = !e.query?.trim(), l = e.timeoutMs, u = l !== void 0 && (!Number.isFinite(l) || l < hc || l > gc), d = z(() => Object.entries(e.parameters ?? {}), [e.parameters]), f = (e) => t({ parameters: Object.keys(e).length > 0 ? e : void 0 }), [p, m] = V(null), g = (t, n) => {
		if (n !== t && n.trim() !== "" && n in (e.parameters ?? {})) {
			m(n);
			return;
		}
		m(null);
		let r = {};
		for (let [e, i] of d) r[e === t ? n : e] = i;
		f(r);
	}, _ = (t, n) => f({
		...e.parameters ?? {},
		[t]: n
	}), v = (t) => {
		let n = { ...e.parameters ?? {} };
		delete n[t], f(n);
	}, y = () => {
		let t = d.length + 1, n = `param${t}`;
		for (; n in (e.parameters ?? {});) n = `param${++t}`;
		f({
			...e.parameters ?? {},
			[n]: ""
		});
	};
	return /* @__PURE__ */ W(va, { children: [
		/* @__PURE__ */ W(_a, {
			title: "Graph",
			children: [/* @__PURE__ */ U(X, {
				label: o.label("graphId", "Graph ID"),
				required: !0,
				error: s ? "Graph ID is required." : void 0,
				help: s ? void 0 : o.help("graphId", "The graph to query."),
				controlId: `${r}-graph-id`,
				render: ({ controlId: n, describedById: r }) => /* @__PURE__ */ U(k, {
					size: "sm",
					mono: !0,
					spellCheck: !1,
					id: n,
					"aria-describedby": r,
					value: e.graphId ?? "",
					onChange: (e) => t({ graphId: e.target.value }),
					placeholder: o.placeholder("graphId", "my-graph")
				})
			}), /* @__PURE__ */ U(X, {
				label: o.label("query", "Graph query"),
				required: !0,
				error: c ? "Query is required." : void 0,
				help: c ? void 0 : "Bind values with $parameters below rather than interpolating them.",
				controlId: `${r}-query`,
				render: ({ controlId: n, describedById: r }) => /* @__PURE__ */ U(A, {
					rows: 6,
					invalid: c,
					spellCheck: !1,
					id: n,
					"aria-describedby": r,
					value: e.query ?? "",
					onChange: (e) => t({ query: e.target.value }),
					placeholder: o.placeholder("query", mc)
				})
			})]
		}),
		/* @__PURE__ */ W(_a, {
			title: "Parameters",
			children: [/* @__PURE__ */ U(X, {
				label: "Bind parameters",
				help: "Each row binds one $name in the query. Values support {{ context.* }}.",
				render: ({ describedById: e, labelId: t }) => /* @__PURE__ */ W("div", {
					role: "group",
					"aria-labelledby": t,
					"aria-describedby": e,
					className: "flex flex-col gap-2",
					"data-testid": "graph-query-params",
					children: [
						d.length === 0 ? /* @__PURE__ */ U("p", {
							className: "text-[12px] text-[var(--color-text-secondary)]",
							children: "No parameters. The query runs exactly as written."
						}) : null,
						d.map(([e, t], n) => /* @__PURE__ */ W("div", {
							className: "flex items-center gap-2",
							children: [
								/* @__PURE__ */ U(k, {
									size: "sm",
									mono: !0,
									spellCheck: !1,
									value: e,
									onChange: (t) => g(e, t.target.value),
									invalid: e.trim() === "",
									placeholder: "userId",
									"aria-label": `Parameter ${n + 1} name`
								}),
								/* @__PURE__ */ U(k, {
									size: "sm",
									mono: !0,
									spellCheck: !1,
									value: t,
									onChange: (t) => _(e, t.target.value),
									placeholder: "{{context.trigger.userId}}",
									"aria-label": `Parameter ${n + 1} value`
								}),
								/* @__PURE__ */ U(h, {
									size: "sm",
									variant: "ghost",
									onClick: () => v(e),
									"aria-label": `Remove parameter ${e || n + 1}`,
									children: "×"
								})
							]
						}, n)),
						p ? /* @__PURE__ */ W("p", {
							className: "text-[12px] text-[var(--color-danger)]",
							role: "alert",
							children: [
								"A parameter named “",
								p,
								"” already exists. Rename or remove it first — two rows cannot share a name."
							]
						}) : null,
						/* @__PURE__ */ U("div", { children: /* @__PURE__ */ U(h, {
							size: "sm",
							variant: "secondary",
							onClick: y,
							children: "+ Add parameter"
						}) })
					]
				})
			}), /* @__PURE__ */ U(X, {
				label: "Available context",
				render: ({ labelId: t }) => /* @__PURE__ */ U("div", {
					role: "group",
					"aria-labelledby": t,
					children: /* @__PURE__ */ U(qa, {
						paths: i,
						unresolved: a(d.map(([, e]) => e).join("\n")),
						onInsert: (t) => {
							let n = d[d.length - 1];
							if (!n) {
								f({
									...e.parameters ?? {},
									param1: t
								});
								return;
							}
							_(n[0], `${n[1]}${t}`);
						}
					})
				})
			})]
		}),
		/* @__PURE__ */ W(_a, {
			title: "Execution",
			children: [
				/* @__PURE__ */ U(X, {
					label: "Timeout",
					error: u ? `Must be between ${hc} and ${gc} ms.` : void 0,
					help: u ? void 0 : "Leave empty to use the executor default.",
					controlId: `${r}-timeout`,
					render: ({ controlId: e, describedById: n }) => /* @__PURE__ */ U(M, {
						size: "sm",
						min: hc,
						max: gc,
						step: 100,
						unit: "ms",
						value: l ?? 0,
						onChange: (e) => t({ timeoutMs: e }),
						invalid: u,
						id: e,
						"aria-describedby": n,
						"data-testid": "graph-query-timeout"
					})
				}),
				/* @__PURE__ */ U(X, {
					label: "Output key",
					help: "Where rows land in context. Defaults to this step's output.",
					controlId: `${r}-output-key`,
					render: ({ controlId: n, describedById: r }) => /* @__PURE__ */ U(k, {
						size: "sm",
						mono: !0,
						spellCheck: !1,
						id: n,
						"aria-describedby": r,
						value: e.outputKey ?? "",
						onChange: (e) => t({ outputKey: e.target.value || void 0 }),
						placeholder: "rows"
					})
				}),
				/* @__PURE__ */ U(Ga, {
					value: e.retryPolicy,
					onChange: (e) => t({ retryPolicy: e })
				})
			]
		})
	] });
}
//#endregion
//#region src/components/pipelines/vision/CaptionPanel.tsx
function vc({ result: e, className: t }) {
	let { caption: r, setting: i, location: a, timeOfDay: o, mood: s, colors: c } = e;
	return !r && !i && !a && !o && !s && (!c || c.length === 0) ? null : /* @__PURE__ */ W("section", {
		className: n("flex flex-col gap-2", t),
		children: [r ? /* @__PURE__ */ U("p", {
			className: "text-base leading-relaxed text-text-primary",
			children: r
		}) : null, /* @__PURE__ */ W("div", {
			className: "flex flex-wrap gap-1.5",
			children: [
				i ? /* @__PURE__ */ W(S, {
					tone: "neutral",
					size: "sm",
					title: "Scene setting",
					children: ["setting: ", i]
				}) : null,
				a ? /* @__PURE__ */ W(S, {
					tone: "neutral",
					size: "sm",
					title: "Location",
					children: ["loc: ", a]
				}) : null,
				o ? /* @__PURE__ */ W(S, {
					tone: "neutral",
					size: "sm",
					title: "Time of day",
					children: ["tod: ", o]
				}) : null,
				s ? /* @__PURE__ */ W(S, {
					tone: "info",
					size: "sm",
					title: "Mood",
					children: ["mood: ", s]
				}) : null,
				(c ?? []).map((e) => /* @__PURE__ */ W("span", {
					className: "inline-flex items-center gap-1 rounded-full border border-border bg-surface px-2 py-0.5 text-[11px] text-text-secondary",
					title: `Dominant color: ${e}`,
					children: [/* @__PURE__ */ U("span", {
						"aria-hidden": !0,
						className: "inline-block h-2.5 w-2.5 rounded-full border border-black/10",
						style: { background: e }
					}), e]
				}, e))
			]
		})]
	});
}
//#endregion
//#region src/components/pipelines/vision/ImageWithBBoxOverlay.tsx
var yc = {
	people: {
		stroke: "#4f46e5",
		fill: "rgba(79,70,229,0.10)",
		text: "bg-primary text-white"
	},
	object: {
		stroke: "var(--color-warning)",
		fill: "rgba(217,119,6,0.10)",
		text: "bg-warning text-white"
	}
};
function bc({ imageUrl: e, imageDataUrl: t, imageWidth: r, imageHeight: i, people: a, objects: o, show: s = "both", onSelectPerson: c, onSelectObject: l, className: u, alt: d }) {
	let f = t ?? e, [p, m] = V(null), h = B(null), g = L(() => {
		let e = h.current;
		e && (!r || !i) && m({
			w: e.naturalWidth,
			h: e.naturalHeight
		});
	}, [r, i]), _ = z(() => r && i && r > 0 && i > 0 ? {
		w: r,
		h: i
	} : p && p.w > 0 && p.h > 0 ? p : null, [
		r,
		i,
		p
	]), v = (e, t, r, i, a) => {
		if (!_) return null;
		let o = Math.max(0, Math.min(e.x1, _.w)), s = Math.max(0, Math.min(e.y1, _.h)), c = Math.max(0, Math.min(e.x2, _.w)), l = Math.max(0, Math.min(e.y2, _.h));
		if (!Number.isFinite(o) || !Number.isFinite(s) || !Number.isFinite(c) || !Number.isFinite(l) || c <= o || l <= s) return null;
		let u = o / _.w * 100, d = s / _.h * 100, f = (c - o) / _.w * 100, p = (l - s) / _.h * 100, m = yc[r];
		return /* @__PURE__ */ U("button", {
			type: "button",
			onClick: i,
			title: t,
			"aria-label": `${r === "people" ? "Person" : "Object"} bounding box: ${t}`,
			className: "group absolute m-0 cursor-pointer border-0 p-0 outline-none focus:ring-2 focus:ring-offset-1",
			style: {
				left: `${u}%`,
				top: `${d}%`,
				width: `${f}%`,
				height: `${p}%`,
				background: m.fill,
				border: `2px solid ${m.stroke}`,
				borderRadius: "2px"
			},
			children: /* @__PURE__ */ U("span", {
				className: n("pointer-events-none absolute -top-5 left-0 inline-block rounded px-1.5 py-0.5 text-[10px] font-semibold leading-none shadow", m.text),
				children: t
			})
		}, a);
	};
	return f ? /* @__PURE__ */ W("div", {
		className: n("relative w-full overflow-hidden rounded-lg border border-border bg-black/5", u),
		children: [/* @__PURE__ */ U("img", {
			ref: h,
			src: f,
			alt: d ?? "",
			onLoad: g,
			className: "block h-auto w-full object-contain",
			draggable: !1
		}), _ ? /* @__PURE__ */ U("div", {
			className: "pointer-events-none absolute inset-0",
			children: /* @__PURE__ */ W("div", {
				className: "pointer-events-auto absolute inset-0",
				children: [(s === "people" || s === "both") && (a ?? []).map((e) => v(e.bbox, `#${e.index}${e.activity ? " · " + e.activity.replace(/^::\s*/, "") : ""}`, "people", c ? () => c(e) : void 0, `p-${e.index}`)), (s === "objects" || s === "both") && (o ?? []).map((e, t) => v(e.bbox, e.label, "object", l ? () => l(e) : void 0, `o-${t}-${e.label}`))]
			})
		}) : null]
	}) : /* @__PURE__ */ U("div", {
		className: n("flex aspect-video w-full items-center justify-center rounded-lg border border-dashed border-border-emphasis bg-surface-panel text-xs text-text-tertiary", u),
		children: "(no image)"
	});
}
function xc(e) {
	return {
		imageUrl: e.imageUrl,
		imageDataUrl: e.imageDataUrl,
		imageWidth: e.imageWidth,
		imageHeight: e.imageHeight,
		people: e.people,
		objects: e.objects
	};
}
//#endregion
//#region src/components/pipelines/vision/PeoplePanel.tsx
function Sc({ people: e, highlightedIndex: t, onSelect: r, className: i }) {
	return !e || e.length === 0 ? null : /* @__PURE__ */ W("section", {
		className: n("flex flex-col gap-1.5", i),
		children: [/* @__PURE__ */ W("h4", {
			className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary",
			children: [
				"People (",
				e.length,
				")"
			]
		}), /* @__PURE__ */ U("ul", {
			className: "flex flex-col gap-1.5",
			children: e.map((e) => {
				let i = t === e.index, a = e.activity?.replace(/^::\s*/, ""), o = n("group flex w-full flex-col gap-1 rounded-lg border px-2.5 py-2 text-left text-sm transition-colors", i ? "border-primary bg-primary-bg/70 ring-1 ring-primary" : "border-border bg-surface hover:bg-surface-hover"), s = /* @__PURE__ */ W(H, { children: [
					/* @__PURE__ */ W("div", {
						className: "flex flex-wrap items-center gap-1.5",
						children: [
							/* @__PURE__ */ U("span", {
								"aria-hidden": !0,
								className: "inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold leading-none text-white",
								children: e.index
							}),
							e.ageBucket ? /* @__PURE__ */ U(S, {
								tone: "neutral",
								size: "sm",
								children: e.ageBucket.replace("_", " ")
							}) : null,
							e.gender ? /* @__PURE__ */ U(S, {
								tone: "neutral",
								size: "sm",
								children: e.gender
							}) : null,
							e.faceOrientation ? /* @__PURE__ */ U(S, {
								tone: "neutral",
								size: "sm",
								title: "Face orientation",
								children: e.faceOrientation
							}) : null,
							e.expression ? /* @__PURE__ */ U(S, {
								tone: "info",
								size: "sm",
								children: e.expression
							}) : null
						]
					}),
					a ? /* @__PURE__ */ W("div", {
						className: "text-[13px] text-text-primary",
						children: [
							/* @__PURE__ */ U("span", {
								className: "text-text-tertiary",
								children: "activity:"
							}),
							" ",
							a
						]
					}) : null,
					e.clothing ? /* @__PURE__ */ W("div", {
						className: "text-[12px] text-text-secondary",
						children: [
							/* @__PURE__ */ U("span", {
								className: "text-text-tertiary",
								children: "wearing:"
							}),
							" ",
							e.clothing
						]
					}) : null
				] });
				return r ? /* @__PURE__ */ U("li", { children: /* @__PURE__ */ U("button", {
					type: "button",
					onClick: () => r(e),
					className: n(o, "cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"),
					"aria-pressed": i,
					children: s
				}) }, e.index) : /* @__PURE__ */ U("li", {
					className: o,
					children: s
				}, e.index);
			})
		})]
	});
}
//#endregion
//#region src/components/pipelines/vision/ObjectsPanel.tsx
function Cc({ objects: e, onSelect: t, className: r }) {
	return !e || e.length === 0 ? null : /* @__PURE__ */ W("section", {
		className: n("flex flex-col gap-1.5", r),
		children: [/* @__PURE__ */ W("h4", {
			className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary",
			children: [
				"Objects (",
				e.length,
				")"
			]
		}), /* @__PURE__ */ U("ul", {
			className: "grid grid-cols-1 gap-1 sm:grid-cols-2",
			children: e.map((e, r) => {
				let i = n("flex w-full items-center justify-between gap-2 rounded-lg border border-border bg-surface px-2 py-1.5 text-left text-[13px]"), a = /* @__PURE__ */ W(H, { children: [/* @__PURE__ */ U("span", {
					className: "truncate font-medium text-text-primary",
					children: e.label
				}), /* @__PURE__ */ W("span", {
					className: "shrink-0 font-mono text-[10px] text-text-tertiary",
					children: [
						"[",
						e.bbox.x1,
						",",
						e.bbox.y1,
						",",
						e.bbox.x2,
						",",
						e.bbox.y2,
						"]"
					]
				})] });
				return t ? /* @__PURE__ */ U("li", { children: /* @__PURE__ */ U("button", {
					type: "button",
					onClick: () => t(e),
					className: n(i, "cursor-pointer hover:bg-surface-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"),
					children: a
				}) }, `${e.label}-${r}`) : /* @__PURE__ */ U("li", {
					className: i,
					children: a
				}, `${e.label}-${r}`);
			})
		})]
	});
}
//#endregion
//#region src/components/pipelines/vision/TagsPanel.tsx
function wc({ tags: e, onTagClick: t, className: r }) {
	return !e || e.length === 0 ? null : /* @__PURE__ */ W("section", {
		className: n("flex flex-col gap-1.5", r),
		children: [/* @__PURE__ */ U("h4", {
			className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary",
			children: "Tags"
		}), /* @__PURE__ */ U("div", {
			className: "flex flex-wrap gap-1.5",
			children: e.map((e) => t ? /* @__PURE__ */ U("button", {
				type: "button",
				onClick: () => t(e),
				title: `Filter by ${e}`,
				"aria-label": `Filter by ${e}`,
				className: "appearance-none border-0 bg-transparent p-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 rounded-full",
				children: /* @__PURE__ */ W(S, {
					tone: "info",
					size: "sm",
					children: ["#", e]
				})
			}, e) : /* @__PURE__ */ W(S, {
				tone: "info",
				size: "sm",
				children: ["#", e]
			}, e))
		})]
	});
}
//#endregion
//#region src/components/pipelines/vision/EditRecommendationsPanel.tsx
function Tc(e) {
	return e ? e === "correct" || e === "neutral" || e === "normal" ? "success" : "warning" : "neutral";
}
function Ec(e) {
	let t = Tc(e);
	return t === "success" ? `OK · ${e}` : t === "warning" ? `ADJUST · ${e}` : e ?? "";
}
function Dc({ exposure: e, whiteBalance: t, contrast: r, composition: i, edits: a, onApplyEdit: o, className: s }) {
	let c = e || t || r || i, l = (a ?? []).length > 0;
	return !c && !l ? null : /* @__PURE__ */ W("section", {
		className: n("flex flex-col gap-2", s),
		children: [
			/* @__PURE__ */ U("h4", {
				className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary",
				children: "Edits & Quality"
			}),
			c ? /* @__PURE__ */ W("div", {
				className: "grid grid-cols-1 gap-1.5 sm:grid-cols-2",
				children: [
					e ? /* @__PURE__ */ W("div", {
						className: "rounded-lg border border-border bg-surface p-2",
						children: [/* @__PURE__ */ W("div", {
							className: "flex items-center gap-1.5",
							children: [
								/* @__PURE__ */ U("span", {
									className: "text-[11px] font-medium text-text-tertiary",
									children: "EXPOSURE"
								}),
								/* @__PURE__ */ U(S, {
									tone: Tc(e.verdict),
									size: "sm",
									children: Ec(e.verdict)
								}),
								e.evAdjustment === 0 ? null : /* @__PURE__ */ W("span", {
									className: "font-mono text-[11px] text-text-tertiary",
									children: [
										e.evAdjustment > 0 ? "+" : "",
										e.evAdjustment.toFixed(1),
										" EV"
									]
								})
							]
						}), /* @__PURE__ */ U("p", {
							className: "mt-1 text-[12px] text-text-primary",
							children: e.rationale
						})]
					}) : null,
					t ? /* @__PURE__ */ W("div", {
						className: "rounded-lg border border-border bg-surface p-2",
						children: [/* @__PURE__ */ W("div", {
							className: "flex items-center gap-1.5",
							children: [
								/* @__PURE__ */ U("span", {
									className: "text-[11px] font-medium text-text-tertiary",
									children: "WB"
								}),
								/* @__PURE__ */ U(S, {
									tone: Tc(t.verdict),
									size: "sm",
									children: Ec(t.verdict)
								}),
								t.kelvinShift ? /* @__PURE__ */ W("span", {
									className: "font-mono text-[11px] text-text-tertiary",
									children: [
										t.kelvinShift > 0 ? "+" : "",
										t.kelvinShift,
										"K"
									]
								}) : null
							]
						}), /* @__PURE__ */ U("p", {
							className: "mt-1 text-[12px] text-text-primary",
							children: t.rationale
						})]
					}) : null,
					r ? /* @__PURE__ */ W("div", {
						className: "rounded-lg border border-border bg-surface p-2",
						children: [/* @__PURE__ */ U("span", {
							className: "text-[11px] font-medium text-text-tertiary",
							children: "CONTRAST"
						}), /* @__PURE__ */ U("span", {
							className: "ml-1.5",
							children: /* @__PURE__ */ U(S, {
								tone: Tc(r),
								size: "sm",
								children: Ec(r)
							})
						})]
					}) : null,
					i ? /* @__PURE__ */ W("div", {
						className: "rounded-lg border border-border bg-surface p-2",
						children: [/* @__PURE__ */ U("span", {
							className: "text-[11px] font-medium text-text-tertiary",
							children: "COMPOSITION"
						}), /* @__PURE__ */ U("p", {
							className: "mt-1 text-[12px] text-text-primary",
							children: i
						})]
					}) : null
				]
			}) : null,
			l ? /* @__PURE__ */ U("ul", {
				className: "flex flex-col gap-1",
				children: (a ?? []).map((e, t) => /* @__PURE__ */ W("li", {
					className: "flex items-start justify-between gap-2 rounded-lg border border-border bg-surface px-2.5 py-1.5 text-[13px]",
					children: [/* @__PURE__ */ U("span", {
						className: "flex-1 text-text-primary",
						children: e
					}), o ? /* @__PURE__ */ U("button", {
						type: "button",
						onClick: () => o(e),
						className: "shrink-0 rounded-md border border-border bg-surface-hover px-2 py-0.5 text-[11px] font-medium text-text-primary hover:bg-surface-panel focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
						children: "Apply"
					}) : null]
				}, `${t}-${e.slice(0, 20)}`))
			}) : null
		]
	});
}
//#endregion
//#region src/components/pipelines/vision/VisionResultViewer.tsx
function Oc({ result: e, showImage: t = !0, showCaption: r = !0, showPeople: i = !0, showObjects: a = !0, showTags: o = !0, showEdits: s = !0, showRawText: c = !1, onTagClick: l, onApplyEdit: u, className: d }) {
	let [f, p] = V(), [m, h] = V(!1), g = (e) => p(f === e.index ? void 0 : e.index), _ = xc(e);
	return /* @__PURE__ */ W("div", {
		className: n("flex w-full flex-col gap-4 text-text-primary", d),
		children: [
			/* @__PURE__ */ W("div", {
				className: "grid grid-cols-1 gap-4 md:grid-cols-12",
				children: [t ? /* @__PURE__ */ W("div", {
					className: "md:col-span-7",
					children: [/* @__PURE__ */ U(bc, {
						..._,
						onSelectPerson: g,
						alt: e.caption ?? "Vision result"
					}), e.model ? /* @__PURE__ */ W("div", {
						className: "mt-2 flex flex-wrap items-center gap-2 text-[11px] text-text-tertiary",
						children: [
							/* @__PURE__ */ U("span", {
								className: "font-medium text-text-primary",
								children: e.model.endpointId
							}),
							/* @__PURE__ */ U("span", { children: "·" }),
							/* @__PURE__ */ W("span", { children: [
								"latency ",
								e.model.latencyMs,
								"ms"
							] }),
							typeof e.model.tokensOut == "number" ? /* @__PURE__ */ W(H, { children: [/* @__PURE__ */ U("span", { children: "·" }), /* @__PURE__ */ W("span", { children: [e.model.tokensOut, " tok out"] })] }) : null
						]
					}) : null]
				}) : null, /* @__PURE__ */ W("div", {
					className: n("flex flex-col gap-4", t ? "md:col-span-5" : "md:col-span-12"),
					children: [r ? /* @__PURE__ */ U(vc, { result: e }) : null, i && e.people && e.people.length > 0 ? /* @__PURE__ */ U(Sc, {
						people: e.people,
						highlightedIndex: f,
						onSelect: g
					}) : null]
				})]
			}),
			a && e.objects && e.objects.length > 0 ? /* @__PURE__ */ U(Cc, { objects: e.objects }) : null,
			o && e.tags && e.tags.length > 0 ? /* @__PURE__ */ U(wc, {
				tags: e.tags,
				onTagClick: l
			}) : null,
			s ? /* @__PURE__ */ U(Dc, {
				exposure: e.exposure,
				whiteBalance: e.whiteBalance,
				contrast: e.contrast,
				composition: e.composition,
				edits: e.edits,
				onApplyEdit: u
			}) : null,
			e.text && e.text.length > 0 ? /* @__PURE__ */ W("section", {
				className: "flex flex-col gap-1.5",
				children: [/* @__PURE__ */ U("h4", {
					className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary",
					children: "Text (OCR)"
				}), /* @__PURE__ */ U("ul", {
					className: "flex flex-col gap-1",
					children: e.text.map((e, t) => /* @__PURE__ */ U("li", {
						className: "rounded border border-border bg-surface px-2 py-1 font-mono text-[12px]",
						children: e
					}, t))
				})]
			}) : null,
			c && e.rawText ? /* @__PURE__ */ W("section", {
				className: "flex flex-col gap-1.5",
				children: [/* @__PURE__ */ W("button", {
					type: "button",
					onClick: () => h((e) => !e),
					"aria-expanded": m,
					"aria-label": `${m ? "Hide" : "Show"} raw model output`,
					className: "self-start text-[11px] font-medium text-text-tertiary hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 rounded",
					children: [m ? "▾" : "▸", " Raw model output"]
				}), m ? /* @__PURE__ */ U("pre", {
					className: "overflow-x-auto rounded-lg border border-border bg-surface-panel p-2 font-mono text-[11px] leading-snug text-text-secondary",
					children: e.rawText
				}) : null]
			}) : null
		]
	});
}
//#endregion
//#region src/components/pipelines/vision/VisionPromptBench.tsx
var kc = [
	{
		value: "claude-haiku-4-5-20251001",
		label: "Haiku 4.5"
	},
	{
		value: "claude-sonnet-4-6",
		label: "Sonnet 4.6"
	},
	{
		value: "claude-opus-4-7",
		label: "Opus 4.7"
	}
], Ac = "claude-sonnet-4-6", jc = [
	{
		label: "— None —",
		value: void 0
	},
	{
		label: "Detection regions",
		value: {
			type: "object",
			properties: { regions: {
				type: "array",
				items: {
					type: "object",
					properties: {
						label: { type: "string" },
						x1: { type: "number" },
						y1: { type: "number" },
						x2: { type: "number" },
						y2: { type: "number" }
					},
					required: [
						"label",
						"x1",
						"y1",
						"x2",
						"y2"
					]
				}
			} },
			required: ["regions"]
		}
	},
	{
		label: "Multi-label tags",
		value: {
			type: "object",
			properties: { tags: {
				type: "array",
				items: { type: "string" }
			} },
			required: ["tags"]
		}
	},
	{
		label: "Caption + setting",
		value: {
			type: "object",
			properties: {
				caption: { type: "string" },
				setting: { type: "string" },
				mood: { type: "string" }
			},
			required: ["caption"]
		}
	},
	{
		label: "Classification (enum)",
		systemPrompt: "You are a precise image classification assistant. Return the single best label from the enum that describes the image. Edit the schema below to set your label set.",
		value: {
			type: "object",
			required: ["label"],
			properties: {
				label: {
					type: "string",
					enum: [
						"red",
						"green",
						"blue"
					]
				},
				confidence: {
					type: "number",
					minimum: 0,
					maximum: 1
				}
			}
		}
	},
	{
		label: "Face detection",
		systemPrompt: "You are a face detection vision model. Identify all human faces in the image and return their bounding boxes (normalized [0,1] coordinates) with optional age/expression/gaze attributes when clearly visible. Return JSON conforming to the schema. Do NOT detect non-human faces.",
		value: {
			type: "object",
			required: ["faces"],
			properties: { faces: {
				type: "array",
				items: {
					type: "object",
					required: ["bbox", "confidence"],
					properties: {
						bbox: {
							type: "object",
							required: [
								"x",
								"y",
								"width",
								"height"
							],
							properties: {
								x: {
									type: "number",
									minimum: 0,
									maximum: 1
								},
								y: {
									type: "number",
									minimum: 0,
									maximum: 1
								},
								width: {
									type: "number",
									minimum: 0,
									maximum: 1
								},
								height: {
									type: "number",
									minimum: 0,
									maximum: 1
								}
							}
						},
						confidence: {
							type: "number",
							minimum: 0,
							maximum: 1
						},
						age: { type: "string" },
						expression: { type: "string" },
						gaze: { type: "string" }
					}
				}
			} }
		}
	},
	{
		label: "Color palette",
		systemPrompt: "Analyze the dominant colors in this image. Return the top 5 colors as hex codes with their approximate percentage coverage. Classify the overall temperature as warm/cool/neutral.",
		value: {
			type: "object",
			required: ["dominant", "temperature"],
			properties: {
				dominant: {
					type: "array",
					maxItems: 5,
					items: {
						type: "object",
						required: ["hex", "percentage"],
						properties: {
							hex: { type: "string" },
							percentage: {
								type: "number",
								minimum: 0,
								maximum: 100
							}
						}
					}
				},
				temperature: {
					type: "string",
					enum: [
						"warm",
						"cool",
						"neutral"
					]
				}
			}
		}
	},
	{
		label: "Image quality rating",
		systemPrompt: "Rate this image's technical and aesthetic quality on focus (sharpness), exposure (lighting), composition (framing/balance) — each 0-10. Provide an overall score 0-10 weighted as 30/30/40. Add one sentence rationale.",
		value: {
			type: "object",
			required: [
				"focus",
				"exposure",
				"composition",
				"overallScore",
				"rationale"
			],
			properties: {
				focus: {
					type: "integer",
					minimum: 0,
					maximum: 10
				},
				exposure: {
					type: "integer",
					minimum: 0,
					maximum: 10
				},
				composition: {
					type: "integer",
					minimum: 0,
					maximum: 10
				},
				overallScore: {
					type: "integer",
					minimum: 0,
					maximum: 10
				},
				rationale: { type: "string" }
			}
		}
	}
];
function Mc(e) {
	let t = [`${e.inputTokens} in`, `${e.outputTokens} out`];
	return e.cacheReadTokens && t.push(`${e.cacheReadTokens} cached`), t.join(" / ");
}
function Nc({ systemPrompt: e, userPrompt: t, outputSchema: r, model: i, onSave: a, apiBase: o = "" }) {
	let s = Ne(), [c, l] = V(e), [u, d] = V(t), [f, p] = V(i ?? Ac), [m, h] = V(r ? JSON.stringify(r, null, 2) : ""), [g, _] = V("0"), [v, y] = V(null), [b, x] = V(!1), [S, C] = V(null), [w, T] = V(null), E = L(() => {
		let e = m.trim();
		if (e) try {
			let t = JSON.parse(e);
			if (t && typeof t == "object" && !Array.isArray(t)) return t;
		} catch {}
	}, [m]), D = L((e) => {
		_(e);
		let t = jc[Number(e)];
		t && (h(t.value ? JSON.stringify(t.value, null, 2) : ""), t.systemPrompt !== void 0 && l(t.systemPrompt));
	}, []), ee = v?.imageId ?? null, O = ee ? s.getImageUrl(ee) : null, te = L(async () => {
		if (!ee) {
			C("Upload or paste a sample image URL first.");
			return;
		}
		if (!u.trim()) {
			C("User prompt is required.");
			return;
		}
		x(!0), C(null), T(null);
		let e = E();
		try {
			let t = await fetch(`${o}/api/pipeline/preview/vision`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					imageId: ee,
					systemPrompt: c.trim() || void 0,
					userPrompt: u.trim(),
					outputSchema: e,
					model: f || Ac
				})
			}), n = await t.json();
			if (!t.ok) {
				C(n.error ?? `Request failed with status ${t.status}`);
				return;
			}
			if (n.failureReason) {
				C(`Model refused to answer (${n.failureReason}).`);
				return;
			}
			let r = {
				imageUrl: O ?? "",
				caption: n.caption ?? "",
				rawText: typeof n.extracted == "object" && n.extracted ? JSON.stringify(n.extracted, null, 2) : void 0,
				model: {
					endpointId: f,
					latencyMs: n.latencyMs ?? 0,
					tokensIn: n.usage?.inputTokens,
					tokensOut: n.usage?.outputTokens
				}
			};
			T({
				visionResult: r,
				rawExtracted: n.extracted,
				usage: n.usage ?? {
					inputTokens: 0,
					outputTokens: 0
				},
				latencyMs: n.latencyMs ?? 0,
				costUsd: n.costUsd ?? 0
			});
		} catch (e) {
			C(e instanceof Error ? e.message : "Network error");
		} finally {
			x(!1);
		}
	}, [
		ee,
		O,
		u,
		c,
		f,
		E,
		o
	]), k = () => {
		a({
			systemPrompt: c,
			userPrompt: u,
			outputSchema: E()
		});
	}, ne = "text-[12px] font-semibold text-text-secondary";
	return /* @__PURE__ */ W("div", {
		className: "flex flex-col gap-4 px-4 py-3",
		"data-testid": "vision-prompt-bench",
		children: [
			/* @__PURE__ */ W("div", { children: [/* @__PURE__ */ U("div", {
				className: n(ne, "mb-1"),
				children: "Sample image"
			}), /* @__PURE__ */ U(gs, {
				value: v,
				onChange: (e) => y(e),
				"data-testid": "bench-image-uploader"
			})] }),
			/* @__PURE__ */ W("div", {
				className: "flex flex-col gap-2",
				children: [
					/* @__PURE__ */ W("div", { children: [/* @__PURE__ */ U("label", {
						className: ne,
						children: "System prompt"
					}), /* @__PURE__ */ U(A, {
						value: c,
						onChange: (e) => l(e.target.value),
						rows: 3,
						placeholder: "Optional override of the default vision system prompt.",
						"data-testid": "bench-system-prompt",
						className: "mt-1 text-[12px] font-mono"
					})] }),
					/* @__PURE__ */ W("div", { children: [/* @__PURE__ */ W("label", {
						className: ne,
						children: ["User prompt ", /* @__PURE__ */ U("span", {
							className: "text-danger-fg",
							children: "*"
						})]
					}), /* @__PURE__ */ U(A, {
						value: u,
						onChange: (e) => d(e.target.value),
						rows: 3,
						placeholder: "Describe what you want the model to do with the image.",
						"data-testid": "bench-user-prompt",
						className: "mt-1 text-[12px]"
					})] }),
					/* @__PURE__ */ W("div", { children: [/* @__PURE__ */ W("div", {
						className: "flex items-center gap-2 mb-1",
						children: [/* @__PURE__ */ U("label", {
							className: ne,
							children: "Output schema"
						}), /* @__PURE__ */ U(j, {
							value: g,
							onChange: (e) => D(e.target.value),
							options: jc.map((e, t) => ({
								value: String(t),
								label: e.label
							})),
							size: "sm",
							"aria-label": "Schema preset",
							"data-testid": "bench-schema-preset"
						})]
					}), /* @__PURE__ */ U(A, {
						value: m,
						onChange: (e) => h(e.target.value),
						rows: 5,
						placeholder: "Optional JSON Schema for structured output. Leave empty for caption-only mode.",
						"data-testid": "bench-schema-textarea",
						className: "text-[11px] font-mono"
					})] })
				]
			}),
			/* @__PURE__ */ W("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ U(j, {
					value: f,
					onChange: (e) => p(e.target.value),
					options: kc,
					size: "sm",
					"aria-label": "Vision model",
					"data-testid": "bench-model-select"
				}), /* @__PURE__ */ U("button", {
					type: "button",
					onClick: () => void te(),
					disabled: b,
					className: n("flex-1 py-1.5 px-4 text-[13px] font-semibold rounded-md cursor-pointer", "bg-primary text-white border-none", b ? "opacity-60 cursor-not-allowed" : "hover:bg-primary/90"),
					"data-testid": "bench-try-btn",
					children: b ? "Running…" : "Try"
				})]
			}),
			S && /* @__PURE__ */ U("div", {
				role: "alert",
				className: "text-[12px] text-danger-fg bg-danger-bg border border-danger-border rounded px-3 py-2",
				"data-testid": "bench-error",
				children: S
			}),
			w && /* @__PURE__ */ W("div", {
				className: "flex flex-col gap-2 border-t border-border pt-3",
				"data-testid": "bench-result",
				children: [
					/* @__PURE__ */ W("div", {
						className: "flex flex-wrap gap-1.5",
						children: [
							/* @__PURE__ */ W("span", {
								className: "text-[11px] px-2 py-0.5 rounded-full bg-surface-inset border border-border text-text-secondary",
								children: [Mc(w.usage), " tokens"]
							}),
							/* @__PURE__ */ W("span", {
								className: "text-[11px] px-2 py-0.5 rounded-full bg-surface-inset border border-border text-text-secondary",
								children: [w.latencyMs, " ms"]
							}),
							/* @__PURE__ */ W("span", {
								className: "text-[11px] px-2 py-0.5 rounded-full bg-surface-inset border border-border text-text-secondary",
								children: ["$", w.costUsd.toFixed(4)]
							})
						]
					}),
					/* @__PURE__ */ U(Oc, {
						result: w.visionResult,
						showImage: !1,
						showRawText: !!w.rawExtracted,
						"data-testid": "bench-vision-viewer"
					}),
					w.rawExtracted !== null && w.rawExtracted !== void 0 && /* @__PURE__ */ W("div", {
						className: "flex flex-col gap-1",
						children: [/* @__PURE__ */ U("div", {
							className: "text-[11px] font-semibold text-text-secondary",
							children: "Extracted JSON"
						}), /* @__PURE__ */ U("pre", {
							className: "text-[10px] font-mono bg-surface-inset border border-border rounded p-2 overflow-x-auto",
							"data-testid": "bench-extracted-json",
							children: JSON.stringify(w.rawExtracted, null, 2)
						})]
					}),
					/* @__PURE__ */ U("button", {
						type: "button",
						onClick: k,
						className: n("mt-1 w-full py-1.5 text-[12px] font-semibold rounded-md cursor-pointer", "bg-surface-hover border border-border text-text-primary", "hover:bg-surface-inset"),
						"data-testid": "bench-save-btn",
						children: "Save to node"
					})
				]
			})
		]
	});
}
//#endregion
//#region src/components/pipelines/canvas/ConfigPanel.tsx
var Pc = {
	trigger: {
		icon: "⚡",
		name: "Trigger",
		docs: "The entry point of the pipeline. Configure how the pipeline is started — manually, on a document event, on a schedule, or via webhook."
	},
	llm: {
		icon: "🧠",
		name: "LLM",
		docs: "Calls an LLM model with a system + user prompt. Supports variable substitution from pipeline context (e.g. {{context.document.body}})."
	},
	transform: {
		icon: "🔧",
		name: "Transform",
		docs: "Reshape or extract data from pipeline context using JSONPath, template strings, or sandboxed JavaScript."
	},
	condition: {
		icon: "🔀",
		name: "Condition",
		docs: "Branch the pipeline on a boolean expression. The `true` output runs on match, the `false` output otherwise."
	},
	action: {
		icon: "🎯",
		name: "Action",
		docs: "Produce a side effect — update a document, post a comment, notify a user, hit a webhook, or invoke an MCP tool."
	},
	fork: {
		icon: "🍴",
		name: "Fork",
		docs: "Split execution into N parallel branches. Use with a Join to wait for all branches to complete."
	},
	join: {
		icon: "🔗",
		name: "Join",
		docs: "Wait for multiple parallel branches to complete and merge their outputs. Supports all / any / n-of-m modes."
	},
	approval: {
		icon: "✅",
		name: "Approval",
		docs: "Pause the pipeline and wait for a human to approve or reject. Supports n-of-m approvers and timeout fallbacks."
	},
	agent: {
		icon: "🤖",
		name: "Agent",
		docs: "Invoke a Strands agent via A2A protocol. Supports streaming output and configurable timeouts."
	},
	"mcp-tool": {
		icon: "🔌",
		name: "MCP Tool",
		docs: "Invoke an external tool through MCP Gateway. Supports arbitrary tool inputs and configurable timeouts."
	},
	"knowledge-base": {
		icon: "📚",
		name: "Knowledge Base",
		docs: "Query a Bedrock Knowledge Base for relevant document chunks via RAG retrieval."
	},
	"graph-query": {
		icon: "🕸️",
		name: "Graph Query",
		docs: "Run an openCypher query against Neptune Analytics. Returns graph traversal results into pipeline context."
	},
	memory: {
		icon: "💾",
		name: "Memory",
		docs: "Read from or write to AgentCore Memory. Supports session-scoped and long-term persistent storage."
	},
	guardrail: {
		icon: "🛡️",
		name: "Guardrail",
		docs: "Apply Bedrock Guardrails content filtering. Routes to pass or block based on content policy evaluation."
	},
	policy: {
		icon: "📜",
		name: "Policy",
		docs: "Evaluate a Cedar authorization policy. Routes to allow or deny based on principal/action/resource."
	},
	"ag-ui-output": {
		icon: "📡",
		name: "AG-UI Output",
		docs: "Stream output to the AG-UI frontend. Terminal node — emits AG-UI protocol events for real-time display."
	},
	"image-source": {
		icon: "🖼",
		name: "Image Source",
		docs: "Injects an existing image into the pipeline context. Provide an imageId or leave blank to receive the image from the trigger or a preceding step at runtime."
	},
	"image:save": {
		icon: "⬇",
		name: "Save Image",
		docs: "Writes a produced image to a named file in the artifact store. Configure the source image path and output filename template."
	},
	scatter: {
		icon: "🔀",
		name: "Scatter",
		docs: "Fans out over a collection — runs downstream nodes once per item in the scatter set."
	},
	"image:resize": {
		icon: "⥂",
		name: "Resize",
		docs: "Resize an image to target dimensions using sharp.resize(). Supports fit modes: cover, contain, fill, inside, outside."
	},
	"image:transform": {
		icon: "↻",
		name: "Transform (Geo)",
		docs: "Apply a chain of geometric operations — rotate, flip (vertical), flop (horizontal) — using sharp."
	},
	"image:format-convert": {
		icon: "⇌",
		name: "Format Convert",
		docs: "Convert image format (JPEG, PNG, WebP, AVIF, TIFF, GIF). Configure quality or lossless for supported formats."
	},
	"image:sharpen": {
		icon: "◈",
		name: "Sharpen",
		docs: "Sharpen an image using the unsharp mask algorithm. Configure sigma, m1, and m2 parameters."
	},
	"image:watermark": {
		icon: "⊕",
		name: "Watermark",
		docs: "Composite a watermark / overlay image atop the source. Configure gravity, opacity, and offset."
	},
	"image:crop": {
		icon: "✂",
		name: "Crop",
		docs: "Crop a region from the source image using a bounding box pulled from pipeline context via JSONPath."
	},
	"image:adjust-bw": {
		icon: "◐",
		name: "Adjust B/W",
		docs: "Convert an image to greyscale. Choose algorithm (luminosity, average, lightness) and contrast multiplier."
	},
	"image:adjust-layer": {
		icon: "𝍩",
		name: "Adjust Layers",
		docs: "Apply a composable stack of colour and filter adjustments — brightness, contrast, saturation, hue, blur."
	},
	"image:dimensions": {
		icon: "📐",
		name: "Dimensions",
		docs: "Read a source image's natural size and emit width/height/aspectRatio plus genWidth/genHeight scaled to fit maxEdge. Wire the derived dimensions into Generate."
	},
	"image:upscale": {
		icon: "⤢",
		name: "Upscale",
		docs: "4× super-resolution of a source image via a self-hosted upscaler. Outputs a new, higher-resolution image."
	},
	"image:vision-analyze": {
		icon: "📷",
		name: "Vision Analyze",
		docs: "Analyze an image with a Claude vision model. Supports free-form caption mode and structured JSON extraction."
	},
	"image:vision-classify": {
		icon: "🏷",
		name: "Vision Classify",
		docs: "Classify an image into one of a configured label set. Returns label + confidence score."
	},
	"image:vision-describe": {
		icon: "💬",
		name: "Vision Describe",
		docs: "Generate a natural-language caption for an image via Claude Haiku. Supports custom system and user prompts."
	},
	"image:vision-tag": {
		icon: "🔖",
		name: "Vision Tag",
		docs: "Extract ranked tags from an image. Supports open-vocabulary tagging or a guided candidate-tag list."
	},
	"image:vision-extract-text": {
		icon: "📝",
		name: "Vision Extract Text",
		docs: "OCR / text extraction from an image via a Claude vision model. Returns extracted text lines."
	},
	"image:generate": {
		icon: "✦",
		name: "Generate Image",
		docs: "Generate images from a text prompt using Bedrock Titan Image Generator. Configure dimensions and image count."
	},
	"image:variation": {
		icon: "⊞",
		name: "Variation",
		docs: "Generate variations of a source image using Nova Canvas. Always fans out — each variation becomes a separate pipeline arm."
	},
	"image:edit-prompt": {
		icon: "✎",
		name: "Edit Prompt",
		docs: "Inpaint or outpaint a region of an image using Nova Canvas. Provide an optional mask (white = edit, black = preserve)."
	}
}, Fc = {
	completed: "success",
	failed: "error",
	running: "info",
	pending: "pending",
	awaiting: "warning",
	skipped: "neutral",
	cancelled: "neutral"
}, Ic = /* @__PURE__ */ new Set([
	"image:vision-analyze",
	"image:vision-classify",
	"image:vision-describe",
	"image:vision-tag",
	"image:vision-extract-text"
]), Lc = ({ data: e }) => /* @__PURE__ */ U("div", {
	className: "p-4",
	"data-testid": "config-panel-no-settings",
	children: /* @__PURE__ */ U(T, {
		icon: "⚙️",
		title: "No settings for this node type yet",
		description: /* @__PURE__ */ W(H, { children: [/* @__PURE__ */ U("code", {
			className: "font-mono text-[12px]",
			children: String(e.type)
		}), " has no configurable options in this version. The node can sit on the canvas and connect to others, and it will run with its defaults wherever the executor supports it."] })
	})
}), Rc = [
	"agent",
	"mcp-tool",
	"guardrail",
	"policy",
	"ag-ui-output"
], zc = {
	trigger: Ba,
	llm: Qa,
	transform: to,
	condition: ro,
	action: co,
	fork: po,
	join: go,
	approval: xo,
	agent: Lc,
	"mcp-tool": Lc,
	"knowledge-base": pc,
	"graph-query": _c,
	memory: dc,
	guardrail: Lc,
	policy: Lc,
	"ag-ui-output": Lc,
	"image-source": oc,
	"image:save": cc,
	scatter: Fo,
	"image:resize": Lo,
	"image:transform": Ho,
	"image:format-convert": Ko,
	"image:sharpen": qo,
	"image:watermark": Yo,
	"image:crop": fs,
	"image:adjust-bw": ms,
	"image:adjust-layer": Ms,
	"image:dimensions": Ps,
	"image:upscale": Is,
	"image:vision-analyze": Vs,
	"image:vision-classify": Gs,
	"image:vision-describe": Ks,
	"image:vision-tag": Us,
	"image:vision-extract-text": Js,
	"image:generate": $s,
	"image:variation": nc,
	"image:edit-prompt": ic
};
function Bc(e, t) {
	let n = zc[e.type];
	return /* @__PURE__ */ U(n, {
		data: e.data,
		onChange: t,
		nodeId: e.id
	}, e.id);
}
function Vc({ selectedIds: e }) {
	let { definition: r, selectedNodeId: i, setSelectedNodeId: a, updateNodeData: o, removeNode: s, duplicateNodes: c } = de(), [l, u] = V("config"), d = B(null), f = B(null);
	t();
	let p = z(() => e && e.length > 1 ? e : i ? [i] : [], [e, i]), m = p.length > 1, h = p.length > 0, g = z(() => m || p.length === 0 || !r ? null : r.nodes.find((e) => e.id === p[0]) ?? null, [
		r,
		p,
		m
	]), _ = I(g?.id ?? ""), v = L(() => {
		a(null);
	}, [a]);
	R(() => {
		u("config");
	}, [p.join(",")]), R(() => {
		if (!h) return;
		let e = (e) => {
			e.key === "Escape" && (e.stopPropagation(), v());
		};
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, [h, v]), R(() => {
		if (!h) return;
		let e = (e) => {
			let t = d.current;
			t && (e.target instanceof Node && t.contains(e.target) || e.target instanceof Element && (e.target.closest("[data-node-type]") || v()));
		};
		return window.addEventListener("mousedown", e), () => window.removeEventListener("mousedown", e);
	}, [h, v]);
	let y = g ? Pc[g.type] : null, b = () => {
		if (m) for (let e of p) s(e);
		else g && s(g.id);
	}, x = () => {
		p.length !== 0 && c(p);
	}, S = (e) => {
		g && o(g.id, e);
	};
	return /* @__PURE__ */ U("div", {
		ref: d,
		className: "flex flex-col flex-1 min-h-0 bg-surface",
		"data-testid": "config-panel",
		children: m ? /* @__PURE__ */ W(H, { children: [/* @__PURE__ */ W("div", {
			className: "h-11 px-3 pl-3.5 flex items-center gap-2 border-b border-border shrink-0",
			children: [
				/* @__PURE__ */ U("span", {
					className: "text-base",
					"aria-hidden": !0,
					children: "⧉"
				}),
				/* @__PURE__ */ W("div", {
					className: "flex-1 text-[13px] font-semibold text-text-primary",
					children: [p.length, " nodes selected"]
				}),
				/* @__PURE__ */ U("button", {
					type: "button",
					onClick: v,
					className: "w-7 h-7 p-0 bg-transparent border-none text-neutral text-lg leading-none cursor-pointer rounded font-inherit",
					"aria-label": "Close",
					children: "×"
				})
			]
		}), /* @__PURE__ */ W("div", {
			className: "flex-1 overflow-y-auto p-4 flex flex-col gap-3",
			children: [/* @__PURE__ */ U("div", {
				className: "text-xs text-neutral leading-normal",
				children: "Bulk actions apply to every selected node. Individual node configuration is only shown for single selections."
			}), /* @__PURE__ */ W("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ U("button", {
					type: "button",
					onClick: b,
					className: "px-2.5 py-1.5 text-xs font-semibold bg-transparent text-danger-fg border border-danger-border rounded-md cursor-pointer font-inherit",
					children: "Delete all"
				}), /* @__PURE__ */ U("button", {
					type: "button",
					onClick: x,
					className: "px-2.5 py-1.5 text-xs font-semibold bg-surface-hover text-text-primary border border-border rounded-md cursor-pointer font-inherit",
					children: "Duplicate all"
				})]
			})]
		})] }) : g && y ? /* @__PURE__ */ W(H, { children: [
			/* @__PURE__ */ W("div", {
				className: "h-11 px-3 pl-3.5 flex items-center gap-2 border-b border-border shrink-0",
				children: [
					/* @__PURE__ */ U("span", {
						className: "text-lg leading-none",
						"aria-hidden": !0,
						children: y.icon
					}),
					/* @__PURE__ */ U("div", {
						className: "flex-1 text-[13px] font-semibold text-text-primary",
						children: y.name
					}),
					/* @__PURE__ */ U("button", {
						type: "button",
						onClick: v,
						className: "w-7 h-7 p-0 bg-transparent border-none text-neutral text-lg leading-none cursor-pointer rounded font-inherit",
						"aria-label": "Close",
						children: "×"
					})
				]
			}),
			/* @__PURE__ */ U("div", {
				ref: f,
				role: "tablist",
				"aria-label": "Node configuration tabs",
				className: "h-9 flex border-b border-border shrink-0",
				onKeyDown: (e) => {
					let t = g && Ic.has(g.type) ? [
						"config",
						"runs",
						"docs",
						"bench"
					] : [
						"config",
						"runs",
						"docs"
					], n = t.indexOf(l), r = null;
					e.key === "ArrowRight" ? r = t[(n + 1) % t.length] : e.key === "ArrowLeft" ? r = t[(n - 1 + t.length) % t.length] : e.key === "Home" ? r = t[0] : e.key === "End" && (r = t[t.length - 1]), r && (e.preventDefault(), u(r), (f.current?.querySelector(`[data-tab="${r}"]`))?.focus());
				},
				children: (g && Ic.has(g.type) ? [
					"config",
					"runs",
					"docs",
					"bench"
				] : [
					"config",
					"runs",
					"docs"
				]).map((e) => {
					let t = l === e, r = e === "config" ? "Config" : e === "runs" ? "Runs" : e === "docs" ? "Docs" : "Bench";
					return /* @__PURE__ */ U("button", {
						type: "button",
						role: "tab",
						"aria-selected": t,
						tabIndex: t ? 0 : -1,
						"data-tab": e,
						className: n("flex-1 border-none bg-transparent text-xs font-semibold cursor-pointer font-inherit", t ? "text-text-primary border-b-2 border-b-primary" : "text-neutral border-b-2 border-b-transparent"),
						onClick: () => u(e),
						children: r
					}, e);
				})
			}),
			/* @__PURE__ */ W("div", {
				className: "flex-1 overflow-y-auto",
				children: [
					l === "config" && Bc(g, S),
					l === "runs" && (_ ? /* @__PURE__ */ W("div", {
						className: "p-4 flex flex-col gap-3 text-[13px]",
						"data-testid": "config-runs-latest",
						children: [
							/* @__PURE__ */ W("div", {
								className: "flex items-center gap-2",
								children: [
									/* @__PURE__ */ U(ne, {
										state: Fc[_.status],
										label: _.status,
										size: "sm",
										"data-testid": "config-runs-status"
									}),
									_.durationMs != null && /* @__PURE__ */ U("span", {
										className: "text-text-secondary tabular-nums",
										children: ma(_.durationMs)
									}),
									_.startedAt && /* @__PURE__ */ U("span", {
										className: "text-text-tertiary ml-auto",
										children: ga(_.startedAt)
									})
								]
							}),
							_.error && /* @__PURE__ */ U("div", {
								role: "alert",
								className: "rounded-md border border-danger-border bg-danger-bg px-2.5 py-2 text-xs text-danger-fg whitespace-pre-wrap break-words",
								children: _.error
							}),
							_.output !== void 0 && /* @__PURE__ */ W("div", {
								className: "flex flex-col gap-1",
								children: [/* @__PURE__ */ U("span", {
									className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary",
									children: "Output"
								}), /* @__PURE__ */ U("pre", {
									className: "max-h-48 overflow-auto rounded-md bg-surface-panel border border-border p-2 font-mono text-[11px] text-text-primary whitespace-pre-wrap break-words m-0",
									children: typeof _.output == "string" ? _.output : JSON.stringify(_.output, null, 2)
								})]
							})
						]
					}) : /* @__PURE__ */ U("div", {
						className: "p-6 text-xs text-neutral",
						children: "No runs yet."
					})),
					l === "docs" && /* @__PURE__ */ U("div", {
						className: "pipeline-docs-pane p-4 text-[13px] text-text-primary leading-snug",
						children: ac[g.type] ?? /* @__PURE__ */ U("p", {
							className: "text-text-secondary",
							children: "No docs available for this node type."
						})
					}),
					l === "bench" && Ic.has(g.type) && (() => {
						let e = g.data;
						return /* @__PURE__ */ U(Nc, {
							systemPrompt: e.systemPrompt ?? "",
							userPrompt: e.userPrompt ?? "",
							outputSchema: e.outputSchema,
							model: e.model,
							onSave: (e) => {
								S(e);
							}
						});
					})()
				]
			}),
			/* @__PURE__ */ W("div", {
				className: "h-10 px-3 flex items-center justify-between gap-2 border-t border-border shrink-0",
				children: [/* @__PURE__ */ U("button", {
					type: "button",
					onClick: b,
					className: "px-2.5 py-1.5 text-xs font-semibold bg-transparent text-danger-fg border border-transparent rounded-md cursor-pointer font-inherit",
					children: "🗑 Delete node"
				}), /* @__PURE__ */ W("button", {
					type: "button",
					onClick: x,
					className: "px-2.5 py-1.5 text-xs font-semibold bg-surface-hover text-text-primary border border-border rounded-md cursor-pointer font-inherit",
					children: ["⧉", " Duplicate"]
				})]
			})
		] }) : null
	});
}
//#endregion
//#region src/components/pipelines/RunDetailDrawer.tsx
function Hc(e) {
	return e == null || e === 0 ? "--" : e < .001 ? "<$0.001" : e < .01 ? `$${e.toFixed(4)}` : e < 1 ? `$${e.toFixed(3)}` : `$${e.toFixed(2)}`;
}
function Uc(e) {
	return e == null || e === 0 ? "text-text-tertiary" : e < .01 ? "text-success-fg" : e < .1 ? "text-warning-fg" : e < 1 ? "text-caution-fg" : "text-danger-fg";
}
function Wc(e) {
	switch (e) {
		case "completed": return "success";
		case "rejected": return "danger";
		case "failed": return "danger";
		case "cancelled": return "neutral";
		case "running": return "info";
		case "pending": return "neutral";
		case "awaiting_approval": return "warning";
		case "stuck": return "warning";
		default: return "neutral";
	}
}
function Gc(e) {
	switch (e) {
		case "completed": return "Completed";
		case "rejected": return "Rejected";
		case "failed": return "Failed";
		case "cancelled": return "Cancelled";
		case "running": return "Running";
		case "pending": return "Pending";
		case "awaiting_approval": return "Awaiting";
		case "stuck": return "Stuck";
		default: return e;
	}
}
function Kc(e) {
	return e.triggeredBy.userId ? e.triggeredBy.userId : e.triggeredBy.triggerType || "manual";
}
function qc({ label: e, children: t }) {
	return /* @__PURE__ */ W("div", {
		className: "flex items-baseline gap-2",
		children: [/* @__PURE__ */ U("span", {
			className: "min-w-[80px] text-[11px] font-semibold uppercase text-text-tertiary",
			children: e
		}), /* @__PURE__ */ U("span", {
			className: "text-[13px] text-text-primary",
			children: t
		})]
	});
}
function Jc({ pipelineId: e, run: t, onBack: r }) {
	let i = ft();
	return /* @__PURE__ */ W("div", {
		className: "absolute inset-0 z-[2] flex flex-col overflow-hidden bg-surface",
		children: [/* @__PURE__ */ W("div", {
			className: "flex shrink-0 items-center gap-2 border-b border-border px-4 py-2.5",
			children: [/* @__PURE__ */ U("button", {
				type: "button",
				onClick: r,
				className: "cursor-pointer border-none bg-transparent p-0 font-inherit text-[13px] text-primary",
				children: "← Back"
			}), /* @__PURE__ */ U("span", {
				className: "font-mono text-xs text-text-tertiary",
				children: t.id.slice(0, 12)
			})]
		}), /* @__PURE__ */ U("div", {
			className: "flex-1 overflow-y-auto p-4",
			children: /* @__PURE__ */ W("div", {
				className: "flex flex-col gap-3",
				children: [
					/* @__PURE__ */ U(qc, {
						label: "Status",
						children: /* @__PURE__ */ U(S, {
							tone: Wc(t.status),
							"aria-label": `Status: ${Gc(t.status)}`,
							children: Gc(t.status)
						})
					}),
					/* @__PURE__ */ U(qc, {
						label: "Started",
						children: new Date(t.startedAt).toLocaleString()
					}),
					t.completedAt && /* @__PURE__ */ U(qc, {
						label: "Completed",
						children: new Date(t.completedAt).toLocaleString()
					}),
					/* @__PURE__ */ U(qc, {
						label: "Duration",
						children: ma(t.durationMs)
					}),
					/* @__PURE__ */ U(qc, {
						label: "Triggered by",
						children: Kc(t)
					}),
					/* @__PURE__ */ U(qc, {
						label: "Trigger type",
						children: t.triggeredBy.triggerType
					}),
					t.estimatedCostUsd != null && t.estimatedCostUsd > 0 && /* @__PURE__ */ W(qc, {
						label: "Est. Cost",
						children: [/* @__PURE__ */ U("span", {
							className: n("font-semibold", Uc(t.estimatedCostUsd)),
							children: Hc(t.estimatedCostUsd)
						}), t.estimatedCostUsd > 1 && /* @__PURE__ */ U("span", {
							className: "ml-1.5 rounded-sm bg-warning-bg px-1 py-px text-[9px] font-bold uppercase text-warning-fg",
							children: "Budget Warning"
						})]
					}),
					t.tokenUsage && Object.keys(t.tokenUsage).length > 0 && /* @__PURE__ */ W("div", {
						className: "mt-2",
						children: [/* @__PURE__ */ U("div", {
							className: "mb-1.5 text-[11px] font-semibold uppercase text-text-secondary",
							children: "Cost Breakdown"
						}), Object.entries(t.tokenUsage).map(([e, t]) => /* @__PURE__ */ W("div", {
							className: "flex items-center gap-2 py-0.5 text-[11px]",
							children: [/* @__PURE__ */ U("span", {
								className: "min-w-[100px] font-mono text-text-secondary",
								children: e
							}), /* @__PURE__ */ W("span", {
								className: "text-text-tertiary",
								children: [
									t.tokensIn.toLocaleString(),
									" in / ",
									t.tokensOut.toLocaleString(),
									" out"
								]
							})]
						}, e))]
					}),
					t.error && /* @__PURE__ */ W("div", {
						className: "mt-2",
						children: [/* @__PURE__ */ U("div", {
							className: "mb-1 text-[11px] font-semibold uppercase text-state-failed",
							children: "Error"
						}), /* @__PURE__ */ W("div", {
							className: "whitespace-pre-wrap break-words rounded-md bg-danger-bg px-2.5 py-2 font-mono text-xs text-danger-fg",
							children: [t.error.message, t.error.nodeId && /* @__PURE__ */ W("div", {
								className: "mt-1 text-[11px] text-danger-fg",
								children: ["at node: ", t.error.nodeId]
							})]
						})]
					}),
					/* @__PURE__ */ U("button", {
						type: "button",
						onClick: () => i(`/pipelines/${e}/runs/${t.id}`),
						"data-testid": "runs-panel-replay-btn",
						className: "mt-3 w-full cursor-pointer rounded-md border-none bg-primary px-3.5 py-2 font-inherit text-[13px] font-semibold text-white",
						children: "View Full Run"
					}),
					Object.keys(t.steps).length > 0 && /* @__PURE__ */ W("div", {
						className: "mt-2",
						children: [/* @__PURE__ */ W("div", {
							className: "mb-1.5 text-[11px] font-semibold uppercase text-text-secondary",
							children: [
								"Steps (",
								Object.keys(t.steps).length,
								")"
							]
						}), Object.entries(t.steps).map(([e, t]) => {
							let n = Wc(t.status), r = Gc(t.status), i = t.output, a = i?.response;
							return /* @__PURE__ */ W("div", {
								className: "mb-2",
								children: [
									/* @__PURE__ */ W("div", {
										className: "flex items-center gap-2 py-1 text-xs",
										children: [
											/* @__PURE__ */ U(S, {
												tone: n,
												"aria-label": `Status: ${r}`,
												children: r
											}),
											/* @__PURE__ */ U("span", {
												className: "font-mono text-[11px] text-text-secondary",
												children: e.slice(0, 10)
											}),
											t.durationMs != null && /* @__PURE__ */ U("span", {
												className: "ml-auto text-[11px] text-text-tertiary",
												children: ma(t.durationMs)
											})
										]
									}),
									a && /* @__PURE__ */ U("div", {
										className: "mt-1 max-h-40 overflow-y-auto whitespace-pre-wrap break-words rounded-md border border-border bg-surface-inset px-2.5 py-2 text-xs leading-relaxed text-text-primary",
										children: a
									}),
									i && !a && Object.keys(i).length > 0 && /* @__PURE__ */ U("div", {
										className: "mt-1 max-h-[120px] overflow-y-auto whitespace-pre-wrap break-words rounded-md border border-border bg-surface-inset px-2.5 py-1.5 font-mono text-[11px] text-text-secondary",
										children: JSON.stringify(i, null, 2)
									})
								]
							}, e);
						})]
					}),
					/* @__PURE__ */ U("div", {
						className: "mt-3",
						children: /* @__PURE__ */ W("details", { children: [/* @__PURE__ */ U("summary", {
							className: "cursor-pointer select-none text-[11px] text-text-tertiary",
							children: "Raw snapshot JSON"
						}), /* @__PURE__ */ U("pre", {
							className: "mt-1.5 max-h-[300px] overflow-auto whitespace-pre-wrap break-all rounded-md border border-border bg-surface-inset p-2.5 text-[10px]",
							children: JSON.stringify(t, null, 2)
						})] })
					})
				]
			})
		})]
	});
}
//#endregion
//#region src/components/pipelines/PipelineRunsPanel.tsx
function Yc(e) {
	return e == null || e === 0 ? "--" : e < .001 ? "<$0.001" : e < .01 ? `$${e.toFixed(4)}` : e < 1 ? `$${e.toFixed(3)}` : `$${e.toFixed(2)}`;
}
function Xc(e) {
	return e == null || e === 0 ? "text-text-tertiary" : e < .01 ? "text-success-fg" : e < .1 ? "text-warning-fg" : e < 1 ? "text-caution-fg" : "text-danger-fg";
}
function Zc(e) {
	let t = Date.now() - new Date(e).getTime();
	return t < 6e4 ? "just now" : t < 36e5 ? `${Math.floor(t / 6e4)}m ago` : t < 864e5 ? `${Math.floor(t / 36e5)}h ago` : t < 2592e5 ? `${Math.floor(t / 864e5)}d ago` : new Date(e).toLocaleDateString();
}
function Qc(e) {
	switch (e) {
		case "completed": return "success";
		case "rejected": return "danger";
		case "failed": return "danger";
		case "cancelled": return "neutral";
		case "running": return "info";
		case "pending": return "neutral";
		case "awaiting_approval": return "warning";
		case "stuck": return "warning";
		default: return "neutral";
	}
}
function $c(e) {
	switch (e) {
		case "completed": return "Completed";
		case "rejected": return "Rejected";
		case "failed": return "Failed";
		case "cancelled": return "Cancelled";
		case "running": return "Running";
		case "pending": return "Pending";
		case "awaiting_approval": return "Awaiting";
		case "stuck": return "Stuck";
		default: return e;
	}
}
function el(e) {
	return e.triggeredBy.userId ? e.triggeredBy.userId : e.triggeredBy.triggerType || "manual";
}
function tl({ pipelineId: e, onClose: t }) {
	let r = ft(), [i, a] = V([]), [o, s] = V(!0), [c, l] = V(null), [u, d] = V(null), [f, p] = V(!1), [m, h] = V([]), g = B(null), _ = L(async () => {
		s(!0), l(null);
		try {
			let t = await Ae(e, { limit: 50 });
			a(t.runs);
		} catch (e) {
			l(e instanceof Error ? e.message : "Failed to load runs");
		} finally {
			s(!1);
		}
	}, [e]);
	R(() => {
		g.current !== e && (g.current = e, _());
	}, [e, _]), P("*", L((t) => {
		let { eventType: n, payload: r } = t;
		if (!r || typeof r != "object") return;
		let i = r;
		if (!(i.pipelineId && i.pipelineId !== e)) switch (n) {
			case "pipeline.run.started": {
				let t = r;
				if (t.pipelineId !== e) return;
				let n = {
					id: t.runId,
					pipelineId: t.pipelineId,
					pipelineVersion: 0,
					status: "running",
					triggeredBy: t.triggeredBy,
					ownerNodeId: "local",
					startedAt: t.at,
					currentStepIds: [],
					steps: {},
					context: {}
				};
				a((e) => [n, ...e.filter((e) => e.id !== t.runId)]);
				break;
			}
			case "pipeline.run.completed": {
				let e = r;
				a((t) => t.map((t) => t.id === e.runId ? {
					...t,
					status: "completed",
					completedAt: e.at,
					durationMs: e.durationMs
				} : t));
				break;
			}
			case "pipeline.run.failed": {
				let e = r;
				a((t) => t.map((t) => t.id === e.runId ? {
					...t,
					status: "failed",
					completedAt: e.at,
					error: e.error
				} : t));
				break;
			}
			case "pipeline.run.cancelled": {
				let e = r;
				a((t) => t.map((t) => t.id === e.runId ? {
					...t,
					status: "cancelled",
					completedAt: e.at
				} : t));
				break;
			}
		}
	}, [e]));
	let v = z(() => i.find((e) => e.id === u) ?? null, [i, u]), y = L((e) => {
		h((t) => t.includes(e) ? t.filter((t) => t !== e) : t.length >= 2 ? [t[1], e] : [...t, e]);
	}, []), b = L((e) => {
		f ? y(e) : d(e);
	}, [f, y]), x = L(() => {
		if (m.length !== 2) return;
		let [t, n] = m;
		r(`/pipelines/${e}/compare?a=${t}&b=${n}`);
	}, [
		m,
		r,
		e
	]);
	return /* @__PURE__ */ W("div", {
		className: "relative flex min-h-0 flex-1 flex-col overflow-hidden bg-surface",
		"data-testid": "pipeline-runs-panel",
		children: [
			/* @__PURE__ */ W("div", {
				className: "flex shrink-0 items-center justify-between border-b border-border px-4 py-3",
				children: [/* @__PURE__ */ U("span", {
					className: "text-sm font-bold text-text-primary",
					children: "Run History"
				}), /* @__PURE__ */ W("div", {
					className: "ml-auto flex items-center gap-1.5",
					children: [/* @__PURE__ */ U("button", {
						type: "button",
						onClick: () => {
							p(!f), f && h([]);
						},
						"data-testid": "runs-panel-compare-toggle",
						className: n("cursor-pointer rounded px-2 py-0.5 font-inherit text-[11px] font-medium", f ? "border border-primary bg-primary text-white" : "border border-border bg-surface text-text-secondary"),
						children: "Compare"
					}), /* @__PURE__ */ U("button", {
						type: "button",
						onClick: t,
						"aria-label": "Close runs panel",
						className: "cursor-pointer rounded border-none bg-transparent px-1.5 py-0.5 text-base text-text-tertiary",
						children: "x"
					})]
				})]
			}),
			f && /* @__PURE__ */ W("div", {
				className: "flex shrink-0 items-center gap-2 border-b border-border bg-surface-inset px-4 py-2",
				"data-testid": "runs-panel-compare-bar",
				children: [/* @__PURE__ */ W("span", {
					className: "text-[11px] text-text-secondary",
					children: [m.length, "/2 selected"]
				}), /* @__PURE__ */ U("button", {
					type: "button",
					disabled: m.length !== 2,
					onClick: x,
					"data-testid": "runs-panel-compare-action",
					className: n("ml-auto rounded px-2.5 py-0.5 font-inherit text-[11px] font-semibold", m.length === 2 ? "cursor-pointer border border-primary bg-primary text-white" : "cursor-not-allowed border border-border bg-surface text-text-disabled"),
					children: "Compare"
				})]
			}),
			/* @__PURE__ */ W("div", {
				className: "relative min-h-0 flex-1",
				children: [
					v && /* @__PURE__ */ U(Jc, {
						pipelineId: e,
						run: v,
						onBack: () => d(null)
					}),
					o && i.length === 0 && /* @__PURE__ */ U("div", {
						role: "status",
						className: "p-6 text-center text-[13px] text-text-tertiary",
						children: "Loading runs..."
					}),
					c && /* @__PURE__ */ W("div", {
						role: "alert",
						className: "p-4 text-center text-xs text-state-failed",
						children: [c, /* @__PURE__ */ U("button", {
							type: "button",
							onClick: () => void _(),
							className: "mx-auto mt-2 block cursor-pointer border-none bg-transparent font-inherit text-xs text-primary underline",
							children: "Retry"
						})]
					}),
					!o && !c && i.length === 0 && /* @__PURE__ */ U("div", {
						className: "p-6 text-center text-[13px] text-text-tertiary",
						children: "No runs yet. Trigger this pipeline to see history here."
					}),
					i.length > 0 && /* @__PURE__ */ U("ul", {
						className: "m-0 flex-1 list-none overflow-y-auto p-0",
						children: i.map((e) => {
							let t = Qc(e.status), r = $c(e.status), i = m.includes(e.id);
							return /* @__PURE__ */ W("li", {
								"data-testid": `runs-panel-row-${e.id}`,
								role: "button",
								tabIndex: 0,
								"aria-label": f ? `Toggle run ${e.id.slice(0, 8)} for comparison` : `Open run ${e.id.slice(0, 8)}`,
								onClick: () => b(e.id),
								onKeyDown: ie(() => b(e.id)),
								className: n("cursor-pointer border-b border-border px-4 py-2.5 transition-colors duration-100 hover:bg-surface-hover", i && "bg-info-bg"),
								children: [
									/* @__PURE__ */ W("div", {
										className: "flex items-center gap-2",
										children: [
											f && /* @__PURE__ */ U(re, {
												checked: i,
												onChange: () => y(e.id),
												onClick: (e) => e.stopPropagation(),
												onKeyDown: (e) => e.stopPropagation(),
												"data-testid": `runs-panel-compare-check-${e.id}`,
												className: "m-0 shrink-0",
												"aria-label": `Select run ${e.id.slice(0, 8)} for comparison`
											}),
											/* @__PURE__ */ U(S, {
												tone: t,
												"aria-label": `Status: ${r}`,
												children: r
											}),
											/* @__PURE__ */ U("span", {
												className: "font-mono text-xs text-text-secondary",
												children: e.id.slice(0, 8)
											}),
											/* @__PURE__ */ U("span", {
												className: "ml-auto text-[11px] text-text-tertiary",
												children: Zc(e.startedAt)
											})
										]
									}),
									/* @__PURE__ */ W("div", {
										className: "mt-1 flex items-center gap-2 text-[11px] text-text-tertiary",
										children: [
											/* @__PURE__ */ U("span", { children: ma(e.durationMs) }),
											e.estimatedCostUsd != null && e.estimatedCostUsd > 0 && /* @__PURE__ */ U("span", {
												className: n("font-mono font-semibold", Xc(e.estimatedCostUsd)),
												title: `Estimated cost: ${Yc(e.estimatedCostUsd)}`,
												children: Yc(e.estimatedCostUsd)
											}),
											e.estimatedCostUsd != null && e.estimatedCostUsd > 1 && /* @__PURE__ */ U("span", {
												className: "rounded-sm bg-warning-bg px-1 py-px text-[9px] font-bold uppercase text-warning-fg",
												children: "High Cost"
											}),
											/* @__PURE__ */ U("span", {
												className: "ml-auto",
												children: el(e)
											})
										]
									}),
									e.error && /* @__PURE__ */ U("div", {
										className: "mt-1 truncate text-[11px] text-state-failed",
										children: e.error.message
									})
								]
							}, e.id);
						})
					})
				]
			})
		]
	});
}
//#endregion
//#region src/components/pipelines/editor/EditorRightSidebar.tsx
function nl({ pipelineId: e, selectedNodeId: t, sidebarTab: r, onTabChange: i }) {
	return /* @__PURE__ */ W("div", {
		className: n("w-[350px] shrink-0 border-l border-border bg-surface", "flex flex-col overflow-hidden"),
		"data-testid": "right-sidebar",
		children: [(t === null || r !== "config") && /* @__PURE__ */ W("div", {
			className: "h-[38px] flex border-b border-border shrink-0",
			children: [/* @__PURE__ */ U("button", {
				type: "button",
				className: n("flex-1 border-none bg-transparent text-xs font-semibold", "cursor-pointer font-inherit px-2", r === "config" ? "text-text-primary border-b-2 border-b-primary" : "text-text-secondary border-b-2 border-b-transparent"),
				onClick: () => i("config"),
				"data-testid": "sidebar-tab-config",
				children: "Config"
			}), /* @__PURE__ */ U("button", {
				type: "button",
				className: n("flex-1 border-none bg-transparent text-xs font-semibold", "cursor-pointer font-inherit px-2", r === "runs" ? "text-text-primary border-b-2 border-b-primary" : "text-text-secondary border-b-2 border-b-transparent"),
				onClick: () => i("runs"),
				"data-testid": "sidebar-tab-runs",
				children: "Runs"
			})]
		}), /* @__PURE__ */ W("div", {
			className: "flex-1 overflow-y-auto flex flex-col",
			children: [r === "config" && (t === null ? /* @__PURE__ */ U("div", {
				className: "flex-1 flex items-center justify-center text-text-tertiary text-[13px] p-5 text-center",
				children: "Select a node to configure"
			}) : /* @__PURE__ */ U(Vc, {})), r === "runs" && /* @__PURE__ */ U(tl, {
				pipelineId: e,
				onClose: () => i("config")
			})]
		})]
	});
}
//#endregion
//#region src/components/pipelines/PipelineEditorPage.tsx
function rl(e) {
	return e.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "pipeline";
}
function il(e) {
	if (!e) return [];
	let t = /* @__PURE__ */ new Set(), n = /\{\{\s*context\.([a-zA-Z0-9_.]+)\s*\}\}/g;
	for (let r of e.nodes) {
		let e = r.data;
		if (e.type === "llm") {
			for (let r of (e.userPromptTemplate || "").matchAll(n)) r[1].startsWith("steps.") || t.add(r[1]);
			for (let r of (e.systemPrompt || "").matchAll(n)) r[1].startsWith("steps.") || t.add(r[1]);
		} else if (e.type === "transform" && e.expression) for (let r of e.expression.matchAll(n)) r[1].startsWith("steps.") || t.add(r[1]);
	}
	return Array.from(t);
}
function al(e) {
	if (!(e instanceof HTMLElement)) return !1;
	let t = e.tagName;
	return !!(t === "INPUT" || t === "TEXTAREA" || t === "SELECT" || e.isContentEditable);
}
function ol() {
	let { pipelineId: e } = pt(), t = z(() => e ? he(e) !== null : !1, [e]);
	return !e || !t ? /* @__PURE__ */ U(dt, {
		to: "/pipelines",
		replace: !0
	}) : /* @__PURE__ */ U(xe, {
		pipelineId: e,
		children: /* @__PURE__ */ U(sl, { pipelineId: e })
	});
}
function sl({ pipelineId: e }) {
	let t = ft(), i = de(), a = $e(), { toast: o } = r(), { definition: s, dirty: c, selectedNodeId: l, setSelectedNodeId: u, save: f, publish: p, revert: m, undo: g, redo: _, setTags: v } = i, y = Ji(e), [b, x] = V(!1), S = B(null), w = B(c);
	R(() => (w.current && !c && (x(!0), S.current && clearTimeout(S.current), S.current = setTimeout(() => x(!1), 450)), w.current = c, () => {
		S.current &&= (clearTimeout(S.current), null);
	}), [c]);
	let T = z(() => s ? Yr(s) : null, [s]), E = (T?.errors.length ?? 0) > 0, D = z(() => il(s), [s]), ee = z(() => s ? s.nodes.some((e) => e.type === "trigger") : !1, [s]) ? ["trigger"] : [], [O, te] = V(!0), [k, ne] = V(() => {
		if (typeof window > "u") return !1;
		try {
			return window.localStorage.getItem("ws_pipelines_v1_show_tags") === "true";
		} catch {
			return !1;
		}
	}), j = L(() => {
		ne((e) => {
			let t = !e;
			try {
				window.localStorage.setItem("ws_pipelines_v1_show_tags", t ? "true" : "false");
			} catch {}
			return t;
		});
	}, []), [M, N] = V(!1), [re, ie] = V(!1), [P, F] = V(!1), [ae, oe] = V(!1), [se, ce] = V(!1), I = z(() => s?.publishedSnapshot ? s.publishedSnapshot : null, [s]), le = s?.status === "published", ue = !y.isRunActive && (!le || E), pe = y.isRunActive ? "Cancel the active run" : le ? E ? "Fix validation errors to enable runs" : "Start a new run" : "Publish the pipeline to enable runs", me = L(async () => {
		if (y.isRunActive && y.currentRunId) {
			a.cancelRun(y.currentRunId);
			return;
		}
		if (!ue) {
			if (D.length > 0) {
				y.setTriggerInputValues(Object.fromEntries(D.map((e) => [e, ""]))), y.setTriggerInputOpen(!0);
				return;
			}
			y.handleRunClick();
		}
	}, [
		y,
		a,
		ue,
		D
	]), { saveError: he, clearSaveError: _e } = i;
	R(() => {
		he && (o(`Could not save: ${he}`, { type: "error" }), _e());
	}, [
		he,
		_e,
		o
	]);
	let { publishError: ve, clearPublishError: ye, publishedAt: be } = i, xe = B(be);
	R(() => {
		be && be !== xe.current && o("Pipeline published", { type: "success" }), xe.current = be;
	}, [be, o]), R(() => {
		ve && (o(`Could not publish: ${ve}`, { type: "error" }), ye());
	}, [
		ve,
		ye,
		o
	]);
	let { retryError: Se, clearRetryError: Ce } = a;
	R(() => {
		Se && (o(`Retry failed: ${Se.message}`, { type: "error" }), Ce());
	}, [
		Se,
		Ce,
		o
	]), R(() => {
		let e = (e) => {
			if (al(e.target)) return;
			let t = e.metaKey || e.ctrlKey;
			if (t && e.key.toLowerCase() === "s") {
				e.preventDefault(), f(), o("Saved", {
					type: "success",
					durationMs: 1200
				});
				return;
			}
			if (t && e.key === "Enter") {
				e.preventDefault(), me();
				return;
			}
			if (t && e.key === ".") {
				e.preventDefault(), y.isRunActive && y.currentRunId && a.cancelRun(y.currentRunId);
				return;
			}
			if (t && e.shiftKey && e.key.toLowerCase() === "z") {
				e.preventDefault(), _();
				return;
			}
			if (t && e.key.toLowerCase() === "z") {
				e.preventDefault(), g();
				return;
			}
			if (e.key === "Escape") {
				u(null);
				return;
			}
		};
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, [
		f,
		o,
		me,
		y,
		a,
		g,
		_,
		u
	]);
	let we = () => {
		if (!s) return;
		let e = fe(s.id);
		e && t(`/pipelines/${e.id}`);
	}, Te = () => {
		if (!s) return;
		let e = ge(s.id);
		e && Ki(`${rl(s.name)}.pipeline.json`, e);
	}, Ee = async () => {
		if (!s) return;
		let e = Mi(s);
		try {
			if (typeof navigator < "u" && navigator.clipboard?.writeText) await navigator.clipboard.writeText(e), o("Mermaid diagram copied", { type: "success" });
			else throw Error("clipboard unavailable");
		} catch (e) {
			console.warn("[PipelineEditor] clipboard write failed", e), o("Could not copy Mermaid diagram", { type: "error" });
		}
	}, Oe = () => {
		oe(!0);
	}, ke = () => {
		N(!1), !E && p();
	}, Ae = () => {
		s && (De(s.id), ie(!1), t("/pipelines"));
	}, je = () => {
		Fe(e), F(!1), o("Run history cleared", { type: "success" });
	}, Me = y.currentRunId ? a.runs[y.currentRunId] : void 0;
	return s ? /* @__PURE__ */ W("div", {
		className: n("flex flex-col min-h-[calc(100vh-200px)]", "bg-surface-inset font-inherit text-text-primary", "rounded-lg border border-border overflow-hidden"),
		"data-testid": "pipeline-editor",
		children: [
			/* @__PURE__ */ U(Zi, {
				pipelineId: e,
				definition: s,
				dirty: c,
				savingFlash: b,
				isRunActive: y.isRunActive,
				isTriggering: y.isTriggering,
				runDisabled: ue,
				runTitle: pe,
				currentRun: Me,
				breakpoints: y.breakpoints,
				onRunClick: me,
				onDebugRunClick: y.handleDebugRunClick,
				onExport: Te,
				onPublishClick: () => N(!0),
				onDuplicate: we,
				onCopyMermaid: Ee,
				onViewVersions: Oe,
				onRevert: m,
				onToggleShowTags: j,
				showTags: k,
				onViewRunHistory: () => y.setSidebarTab("runs"),
				onClearRunHistory: () => F(!0),
				onSimPanelOpen: () => ce(!0),
				onDelete: () => ie(!0)
			}),
			k && /* @__PURE__ */ W("div", {
				"data-testid": "tags-row",
				className: n("flex items-center gap-2 px-4 py-1.5", "border-b border-border bg-surface-inset", "min-h-[34px] shrink-0 sticky top-11 z-[4]"),
				children: [/* @__PURE__ */ U("span", {
					className: "text-[11px] text-text-tertiary font-semibold",
					children: "TAGS"
				}), /* @__PURE__ */ U(d, {
					value: s.tags ?? [],
					onChange: v,
					placeholder: "add tag…"
				})]
			}),
			/* @__PURE__ */ W("div", {
				className: "flex-1 flex min-h-0 relative overflow-hidden",
				children: [
					/* @__PURE__ */ U(Er, { disabledTypes: ee }),
					/* @__PURE__ */ U("div", {
						className: "flex-1 min-w-0 min-h-[600px] relative flex flex-col",
						children: /* @__PURE__ */ U(Wr, {
							errorNodeId: y.activeError?.nodeId ?? null,
							onErrorNodePosition: y.handleErrorNodePosition,
							breakpoints: y.breakpoints,
							onToggleBreakpoint: y.handleToggleBreakpoint,
							pausedAtNodeId: y.pausedBreakpoint?.stepId ?? null
						})
					}),
					/* @__PURE__ */ U(nl, {
						pipelineId: e,
						selectedNodeId: l,
						sidebarTab: y.sidebarTab,
						onTabChange: y.setSidebarTab
					})
				]
			}),
			y.pausedBreakpoint && /* @__PURE__ */ U(pa, {
				definition: s,
				pausedBreakpoint: y.pausedBreakpoint,
				applyingPatch: y.applyingPatch,
				revertingPatchId: y.revertingPatchId,
				dirtyPatch: y.dirtyPatch,
				dirtyPatchStepId: y.dirtyPatchStepId,
				resetEditBufferKey: y.resetEditBufferKey,
				onContinue: y.handleBreakpointContinue,
				onStepOver: y.handleBreakpointStepOver,
				onResumeAll: y.handleBreakpointResumeAll,
				onApplyAndContinue: y.handleApplyAndContinue,
				onRevertPatch: y.handleRevertPatch,
				onEditBufferChange: y.handleContextEditBufferChange
			}),
			y.activeError && y.errorNodeAnchor && /* @__PURE__ */ U(qr, {
				error: y.activeError,
				anchor: y.errorNodeAnchor,
				onDismiss: y.handleDismissError,
				onRetry: y.handleRetryFromError
			}),
			/* @__PURE__ */ U(Gi, {
				runId: y.currentRunId,
				visible: y.isRunActive && O
			}),
			/* @__PURE__ */ U(Wi, {
				publishConfirmOpen: M,
				onPublishClose: () => N(!1),
				onPublishConfirm: ke,
				hasErrors: E,
				validationErrorCount: T?.errors.length ?? 0,
				definitionName: s.name,
				definitionVersion: s.version,
				deleteConfirmOpen: re,
				onDeleteClose: () => ie(!1),
				onDeleteConfirm: Ae,
				clearRunsConfirmOpen: P,
				onClearRunsClose: () => F(!1),
				onClearRunsConfirm: je,
				versionDiffOpen: ae,
				onVersionDiffClose: () => oe(!1),
				currentDef: s,
				publishedDef: I,
				onJumpToNode: u,
				simPanelOpen: se,
				onSimPanelClose: () => ce(!1)
			}),
			/* @__PURE__ */ U(C, {
				open: y.triggerInputOpen,
				onClose: () => y.setTriggerInputOpen(!1),
				title: "Trigger inputs",
				maxWidth: 480,
				footer: /* @__PURE__ */ W(H, { children: [/* @__PURE__ */ U(h, {
					variant: "ghost",
					onClick: () => y.setTriggerInputOpen(!1),
					children: "Cancel"
				}), /* @__PURE__ */ U(h, {
					variant: "primary",
					onClick: y.handleTriggerInputSubmit,
					disabled: D.some((e) => !y.triggerInputValues[e]?.trim()),
					children: "Run"
				})] }),
				children: /* @__PURE__ */ W("div", {
					className: "flex flex-col gap-3",
					children: [/* @__PURE__ */ U("p", {
						className: "m-0 text-xs text-text-secondary",
						children: "This pipeline expects input data. Provide values for the trigger context:"
					}), D.map((e) => /* @__PURE__ */ W("label", {
						className: "flex flex-col gap-1 text-xs",
						children: [/* @__PURE__ */ U("span", {
							className: "font-medium text-text-primary",
							children: e
						}), /* @__PURE__ */ U(A, {
							"data-autofocus": e === D[0] || void 0,
							rows: 3,
							value: y.triggerInputValues[e] ?? "",
							onChange: (t) => y.setTriggerInputValues((n) => ({
								...n,
								[e]: t.target.value
							})),
							"aria-label": `Trigger input ${e}`
						})]
					}, e))]
				})
			})
		]
	}) : /* @__PURE__ */ U("div", {
		className: n("flex flex-col min-h-[calc(100vh-200px)]", "bg-surface-inset font-inherit text-text-primary", "rounded-lg border border-border overflow-hidden"),
		children: /* @__PURE__ */ U("div", {
			className: "flex-1 flex items-center justify-center text-text-tertiary text-[13px]",
			children: "Loading pipeline…"
		})
	});
}
//#endregion
//#region src/components/pipelines/PipelineCard.tsx
function cl(e) {
	let t = e?.event;
	return !t || t === "manual" ? {
		icon: "▶",
		text: "Manual"
	} : t === "schedule" ? {
		icon: "⏱",
		text: e?.schedule ?? "Schedule"
	} : t === "webhook" ? {
		icon: "🔌",
		text: e?.webhookPath ?? "Webhook"
	} : {
		icon: "🗎",
		text: `On ${e?.event}`
	};
}
function ll({ row: e, onOpen: t, onRun: r, onDuplicate: i, onExport: a, onDelete: o, selectionMode: s, selected: c, anySelected: l, onToggleSelect: u }) {
	let [d, f] = V(!1), [p, m] = V(!1), h = B(null);
	Xn(h, () => f(!1), d), E(d, L(() => f(!1), []));
	let g = e.status === "published", _ = e.status === "archived", v = typeof e.publishedVersion == "number", y = cl(e.triggerBinding), b, x;
	_ ? (b = `Archived · v${e.version}`, x = "danger") : g ? (b = `Published · v${e.version}`, x = "success") : v ? (b = `Draft · v${e.version} (published v${e.publishedVersion})`, x = "warning") : (b = `Draft · v${e.version}`, x = "neutral");
	let C = !g, w = (e) => (t) => {
		t.stopPropagation(), e();
	}, T = s || c || p || l;
	return /* @__PURE__ */ W("div", {
		"data-testid": `pipeline-card-${e.id}`,
		"data-selected": c ? "true" : "false",
		onClick: (e) => {
			s ? u(e.shiftKey) : t();
		},
		onMouseEnter: () => m(!0),
		onMouseLeave: () => {
			m(!1), f(!1);
		},
		className: n("flex flex-col gap-2 w-full px-3.5 py-3 bg-surface rounded-lg cursor-pointer relative transition-[border-color,box-shadow] duration-100", c ? "border border-primary shadow-[0_0_0_4px_rgba(100,108,255,0.18)]" : p ? "border border-primary shadow-[0_2px_8px_rgba(15,23,42,0.06)]" : "border border-border shadow-none"),
		children: [
			T && /* @__PURE__ */ U("label", {
				onClick: (e) => e.stopPropagation(),
				className: "absolute top-2 right-2 flex items-center justify-center w-[22px] h-[22px] cursor-pointer z-[1]",
				children: /* @__PURE__ */ U(re, {
					"data-testid": `pipeline-select-${e.id}`,
					checked: c,
					"aria-label": `Select pipeline ${e.name}`,
					onClick: (e) => {
						e.stopPropagation(), u(e.shiftKey);
					},
					onKeyDown: (e) => {
						(e.key === " " || e.key === "Spacebar") && (e.preventDefault(), u(e.shiftKey));
					},
					onChange: () => {},
					className: "w-4 h-4"
				})
			}),
			/* @__PURE__ */ W("div", {
				className: n("flex items-center gap-2 min-w-0", T && "pr-7"),
				children: [/* @__PURE__ */ U("span", {
					className: "text-lg shrink-0",
					"aria-hidden": !0,
					children: e.icon
				}), /* @__PURE__ */ U("div", {
					className: "flex-1 min-w-0 text-[13px] font-semibold text-text-primary overflow-hidden text-ellipsis whitespace-nowrap",
					title: e.name,
					children: e.name
				})]
			}),
			/* @__PURE__ */ W("div", {
				className: "flex items-center gap-2 flex-wrap",
				children: [
					/* @__PURE__ */ U(S, {
						"aria-label": `Status: ${b}`,
						tone: x,
						size: "sm",
						children: b
					}),
					/* @__PURE__ */ W("span", {
						className: "text-[11px] text-text-secondary",
						children: [
							y.icon,
							" ",
							y.text
						]
					}),
					/* @__PURE__ */ W("span", {
						className: "text-[11px] text-text-tertiary",
						children: [
							"· ",
							e.nodeCount,
							" node",
							e.nodeCount === 1 ? "" : "s"
						]
					})
				]
			}),
			/* @__PURE__ */ W("div", {
				className: "flex items-center gap-1.5",
				children: [
					/* @__PURE__ */ U("button", {
						"data-testid": `run-pipeline-${e.id}`,
						onClick: w(r),
						disabled: C,
						title: C ? "Run requires published state" : "Run pipeline",
						className: "px-3 py-[5px] text-xs font-semibold bg-primary text-white border-none rounded-md font-[inherit] shrink-0 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer",
						children: "Run"
					}),
					/* @__PURE__ */ U("button", {
						"data-testid": `edit-pipeline-${e.id}`,
						onClick: w(t),
						className: "px-3 py-[5px] text-xs font-semibold bg-surface text-text-secondary border border-border-field rounded-md cursor-pointer font-[inherit]",
						children: "Edit"
					}),
					/* @__PURE__ */ W("div", {
						className: "relative ml-auto",
						ref: h,
						children: [/* @__PURE__ */ U("button", {
							"data-testid": `overflow-pipeline-${e.id}`,
							onClick: w(() => f((e) => !e)),
							"aria-label": "More actions",
							"aria-haspopup": "menu",
							"aria-expanded": d,
							className: "px-2 py-1 text-sm font-bold bg-transparent text-text-secondary border border-transparent rounded-md cursor-pointer font-[inherit] leading-none",
							children: "⋯"
						}), d && /* @__PURE__ */ W("div", {
							"data-testid": `overflow-menu-${e.id}`,
							role: "menu",
							"aria-label": "More actions",
							onClick: (e) => e.stopPropagation(),
							className: "absolute right-0 top-full mt-1 bg-surface border border-border rounded-lg shadow-[0_8px_24px_rgba(15,23,42,0.12)] min-w-[160px] z-10 overflow-hidden",
							children: [
								/* @__PURE__ */ U("button", {
									className: "block w-full text-left px-3.5 py-2 text-[13px] border-none bg-transparent cursor-pointer font-[inherit]",
									role: "menuitem",
									onClick: w(() => {
										f(!1), i();
									}),
									children: "Duplicate"
								}),
								/* @__PURE__ */ U("button", {
									className: "block w-full text-left px-3.5 py-2 text-[13px] border-none bg-transparent cursor-pointer font-[inherit]",
									role: "menuitem",
									onClick: w(() => {
										f(!1), a();
									}),
									children: "Export JSON"
								}),
								/* @__PURE__ */ U("button", {
									className: "block w-full text-left px-3.5 py-2 text-[13px] border-none bg-transparent cursor-pointer font-[inherit] text-danger-fg",
									role: "menuitem",
									onClick: w(() => {
										f(!1), o();
									}),
									children: "Delete"
								})
							]
						})]
					})
				]
			})
		]
	});
}
//#endregion
//#region src/components/pipelines/PipelinesFilterBar.tsx
var ul = {
	draft: "Draft",
	published: "Published",
	archived: "Archived"
}, dl = ["draft", "published"];
function fl({ search: e, onSearchChange: t, statusFilter: r, statusExplicit: i, onToggleStatusKey: a, triggerFilter: o, onTriggerFilterChange: s, sortKey: c, onSortKeyChange: l, allVisibleSelected: u, someVisibleSelected: d, onHeaderToggleAll: f }) {
	return /* @__PURE__ */ W("div", {
		className: n("min-h-[40px] shrink-0 flex items-center gap-3 px-6", "border-b border-border bg-surface"),
		children: [
			/* @__PURE__ */ W("label", {
				className: "flex items-center gap-1.5 cursor-pointer",
				title: "Select all visible pipelines",
				children: [/* @__PURE__ */ U(re, {
					"data-testid": "pipeline-select-all",
					"aria-label": "Select all visible pipelines",
					checked: u,
					indeterminate: d && !u,
					onChange: f
				}), /* @__PURE__ */ U("span", {
					className: "text-[11px] text-text-tertiary",
					children: "All"
				})]
			}),
			/* @__PURE__ */ U(k, {
				"data-testid": "pipeline-search",
				type: "search",
				size: "sm",
				placeholder: "Search...",
				value: e,
				onChange: (e) => t(e.target.value),
				className: "flex-[0_1_260px] min-w-45",
				"aria-label": "Search pipelines"
			}),
			/* @__PURE__ */ U("span", {
				id: "pipelines-status-label",
				className: "text-xs text-text-secondary font-medium",
				children: "Status:"
			}),
			/* @__PURE__ */ U("div", {
				role: "group",
				"aria-labelledby": "pipelines-status-label",
				className: "flex gap-1.5 flex-nowrap shrink-0",
				children: Ul.map((e) => {
					let t = i ? r.has(e) : dl.includes(e);
					return /* @__PURE__ */ U("button", {
						type: "button",
						role: "checkbox",
						"aria-checked": t,
						"data-testid": `status-chip-${e}`,
						onClick: () => a(e),
						onKeyDown: (t) => {
							(t.key === "Enter" || t.key === " ") && (t.preventDefault(), a(e));
						},
						className: n("px-3 py-1.5 text-xs font-medium rounded cursor-pointer font-inherit", t ? "border border-primary bg-primary text-white" : "border border-border bg-surface text-text-secondary"),
						children: ul[e]
					}, e);
				})
			}),
			/* @__PURE__ */ W("label", {
				className: "text-xs text-text-secondary flex items-center gap-1.5",
				children: ["Trigger:", /* @__PURE__ */ U(j, {
					"data-testid": "trigger-filter",
					size: "sm",
					value: o,
					onChange: (e) => s(e.target.value),
					"aria-label": "Trigger filter",
					options: [
						{
							value: "all",
							label: "All"
						},
						{
							value: "manual",
							label: "Manual"
						},
						{
							value: "document",
							label: "Document event"
						},
						{
							value: "schedule",
							label: "Schedule"
						},
						{
							value: "webhook",
							label: "Webhook"
						}
					]
				})]
			}),
			/* @__PURE__ */ W("label", {
				className: "text-xs text-text-secondary flex items-center gap-1.5 ml-auto",
				children: ["Sort:", /* @__PURE__ */ U(j, {
					"data-testid": "sort-key",
					size: "sm",
					value: c,
					onChange: (e) => l(e.target.value),
					"aria-label": "Sort pipelines",
					options: [
						{
							value: "updated",
							label: "Recently updated"
						},
						{
							value: "name",
							label: "Name A-Z"
						},
						{
							value: "created",
							label: "Recently created"
						}
					]
				})]
			})
		]
	});
}
//#endregion
//#region src/components/pipelines/PipelinesBulkActionBar.tsx
var pl = n("px-2.5 py-[5px] text-xs font-semibold", "bg-surface text-text-secondary", "border border-border-field rounded-md", "cursor-pointer font-inherit");
function ml({ count: e, onClear: t, onExport: r, onExportAsJSON: a, onPublish: o, onArchive: s, onAddTag: c, onRemoveTag: l, onDelete: u, onDeleteWithConfirm: d, addTagOpen: f, removeTagOpen: p, onSubmitAddTag: m, onSubmitRemoveTag: h, onCloseAddTag: g, onCloseRemoveTag: _, unionTags: v }) {
	let [y, b] = V(""), x = B(null), S = B(null), C = B(null);
	R(() => {
		f && (b(""), setTimeout(() => x.current?.focus(), 30));
	}, [f]);
	let w = i(g), T = i(_);
	R(() => {
		if (!f) return;
		let e = (e) => {
			S.current?.contains(e.target) || w();
		}, t = window.setTimeout(() => {
			document.addEventListener("mousedown", e);
		}, 0);
		return () => {
			window.clearTimeout(t), document.removeEventListener("mousedown", e);
		};
	}, [f, w]), R(() => {
		if (!p) return;
		let e = (e) => {
			C.current?.contains(e.target) || T();
		}, t = window.setTimeout(() => {
			document.addEventListener("mousedown", e);
		}, 0);
		return () => {
			window.clearTimeout(t), document.removeEventListener("mousedown", e);
		};
	}, [p, T]);
	let E = () => {
		let e = y.trim();
		e.length !== 0 && (m(e), b(""));
	};
	return /* @__PURE__ */ W("div", {
		"data-testid": "bulk-action-bar",
		className: n("min-h-[40px] shrink-0 flex items-center gap-3 px-6", "border-b border-border bg-primary-bg", "sticky top-[56px] z-[1]"),
		children: [
			/* @__PURE__ */ W("span", {
				"data-testid": "bulk-count",
				className: "text-[13px] font-semibold text-text-primary",
				children: [e, " selected"]
			}),
			/* @__PURE__ */ U("span", {
				className: "text-text-tertiary",
				children: "·"
			}),
			/* @__PURE__ */ U("button", {
				"data-testid": "bulk-clear",
				className: pl,
				onClick: t,
				children: "Clear"
			}),
			/* @__PURE__ */ U("button", {
				"data-testid": "bulk-publish",
				className: pl,
				onClick: o,
				children: "Publish selected"
			}),
			/* @__PURE__ */ U("button", {
				"data-testid": "bulk-archive",
				className: pl,
				onClick: s,
				children: "Archive selected"
			}),
			/* @__PURE__ */ U("button", {
				"data-testid": "bulk-export-json",
				className: pl,
				onClick: a,
				children: "Export selected as JSON"
			}),
			/* @__PURE__ */ U("button", {
				"data-testid": "bulk-export",
				className: pl,
				onClick: r,
				children: "Export all"
			}),
			/* @__PURE__ */ U("button", {
				"data-testid": "bulk-delete-confirm-prompt",
				className: pl,
				onClick: d,
				children: "Delete selected"
			}),
			/* @__PURE__ */ W("div", {
				className: "relative",
				children: [/* @__PURE__ */ U("button", {
					"data-testid": "bulk-add-tag-btn",
					className: pl,
					onClick: c,
					children: "Add tag..."
				}), f && /* @__PURE__ */ W("div", {
					ref: S,
					"data-testid": "bulk-add-tag-popover",
					onClick: (e) => e.stopPropagation(),
					className: n("absolute top-full left-0 mt-1.5", "bg-surface border border-border rounded-lg", "shadow-lg min-w-[220px] p-2.5 z-10", "flex flex-col gap-2"),
					children: [/* @__PURE__ */ U(k, {
						ref: x,
						size: "sm",
						"data-testid": "bulk-add-tag-input",
						placeholder: "Tag name",
						value: y,
						onChange: (e) => b(e.target.value),
						onKeyDown: (e) => {
							e.key === "Enter" ? (e.preventDefault(), E()) : e.key === "Escape" && (e.preventDefault(), g());
						},
						className: n("border border-border-field rounded-md px-2.5 py-1.5 text-[13px]", "bg-surface-inset text-text-primary outline-none w-full"),
						"aria-label": "Tag name"
					}), /* @__PURE__ */ U("button", {
						"data-testid": "bulk-add-tag-submit",
						disabled: y.trim().length === 0,
						onClick: E,
						className: n("px-2.5 py-[5px] text-xs font-semibold", "bg-primary text-white border-none rounded-md", "disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"),
						children: "Add"
					})]
				})]
			}),
			/* @__PURE__ */ W("div", {
				className: "relative",
				children: [/* @__PURE__ */ U("button", {
					"data-testid": "bulk-remove-tag-btn",
					className: n(pl, v.length === 0 && "opacity-50 cursor-not-allowed"),
					onClick: l,
					disabled: v.length === 0,
					title: v.length === 0 ? "No tags on selected pipelines" : "Remove tag from selected",
					children: "Remove tag..."
				}), p && /* @__PURE__ */ W("div", {
					ref: C,
					"data-testid": "bulk-remove-tag-popover",
					onClick: (e) => e.stopPropagation(),
					className: n("absolute top-full left-0 mt-1.5", "bg-surface border border-border rounded-lg", "shadow-lg min-w-[220px] max-w-[320px] p-2.5 z-10", "flex flex-col gap-2"),
					children: [/* @__PURE__ */ U("div", {
						className: "text-xs text-text-secondary",
						children: "Click a tag to remove it from all selected:"
					}), /* @__PURE__ */ U("div", {
						className: "flex flex-wrap gap-1.5",
						children: v.length === 0 ? /* @__PURE__ */ U("div", {
							className: "text-xs text-text-tertiary",
							children: "No tags to remove."
						}) : v.map((e) => /* @__PURE__ */ W("button", {
							"data-testid": `bulk-remove-tag-chip-${e}`,
							onClick: () => h(e),
							className: n("px-2 py-0.5 text-xs font-medium", "bg-danger-bg text-danger-fg", "border border-danger-border rounded-full", "cursor-pointer font-inherit"),
							children: [e, " ✕"]
						}, e))
					})]
				})]
			}),
			/* @__PURE__ */ U("button", {
				"data-testid": "bulk-delete",
				className: n("px-3 py-[5px] text-xs font-semibold", "bg-danger text-white border-none rounded-md", "cursor-pointer font-inherit ml-auto"),
				onClick: u,
				children: "Delete"
			})
		]
	});
}
//#endregion
//#region src/components/pipelines/usePipelinesSelection.ts
function hl({ visibleRows: e, filteredIds: t }) {
	let [n, r] = V(!1), [i, a] = V(/* @__PURE__ */ new Set()), o = B(null), s = B(null), c = L(() => {
		a(/* @__PURE__ */ new Set());
	}, []), l = L(() => {
		n ? (c(), r(!1)) : r(!0);
	}, [n, c]), u = L((t, n = !1) => {
		let r = e, i = r.findIndex((e) => e.id === t), s = o.current;
		i !== -1 && (o.current = i), a((e) => {
			let a = new Set(e), o = !a.has(t);
			if (n && s != null && i !== -1) {
				let e = Math.min(s, i), t = Math.max(s, i);
				for (let n = e; n <= t; n++) {
					let e = r[n];
					e && (o ? a.add(e.id) : a.delete(e.id));
				}
			} else o ? a.add(t) : a.delete(t);
			return a;
		});
	}, [e]), d = L(() => {
		a(new Set(t));
	}, [t]), f = e.length > 0 && e.every((e) => i.has(e.id)), p = !f && e.some((e) => i.has(e.id)), m = L(() => {
		a((t) => {
			let n = new Set(t);
			if (f) for (let t of e) n.delete(t.id);
			else for (let t of e) n.add(t.id);
			return n;
		}), n || r(!0);
	}, [
		f,
		e,
		n
	]);
	return R(() => {
		s.current && (s.current.indeterminate = p);
	}, [p]), {
		selectionMode: n,
		selected: i,
		allVisibleSelected: f,
		someVisibleSelected: p,
		selectAllRef: s,
		handleToggleSelectMode: l,
		handleToggleSelect: u,
		handleSelectAllFiltered: d,
		handleHeaderToggleAll: m,
		clearSelection: c,
		setSelectionMode: r
	};
}
//#endregion
//#region src/components/pipelines/templates/index.ts
var gl = 280, _l = 160, vl = 40, yl = 200;
function Z(e) {
	return vl + e * gl;
}
function Q(e) {
	return yl + e * _l;
}
function $(e, t, n, r = "in") {
	return {
		id: crypto.randomUUID(),
		source: e,
		sourceHandle: t,
		target: n,
		targetHandle: r
	};
}
function bl(e) {
	let t = (/* @__PURE__ */ new Date()).toISOString(), n = crypto.randomUUID(), r = crypto.randomUUID(), i = crypto.randomUUID(), a = {
		type: "trigger",
		triggerType: "document.finalize"
	}, o = {
		type: "llm",
		provider: "bedrock",
		model: "claude-sonnet-4-6",
		systemPrompt: "Summarize the following document in 2-3 concise sentences.",
		userPromptTemplate: "{{context.documentBody}}",
		temperature: .3,
		maxTokens: 512,
		streaming: !0
	}, s = {
		type: "action",
		actionType: "post-comment",
		config: { body: `{{context.steps.${r}.response}}` },
		idempotent: !0,
		onError: "fail-run"
	}, c = [
		{
			id: n,
			type: "trigger",
			position: {
				x: Z(0),
				y: Q(0)
			},
			data: a
		},
		{
			id: r,
			type: "llm",
			position: {
				x: Z(1),
				y: Q(0)
			},
			data: o
		},
		{
			id: i,
			type: "action",
			position: {
				x: Z(2),
				y: Q(0)
			},
			data: s
		}
	], l = [$(n, "out", r), $(r, "out", i)];
	return {
		id: crypto.randomUUID(),
		name: "Document Summary",
		description: "Summarize a finalized document and post the summary as a comment.",
		icon: "📄",
		version: 1,
		status: "published",
		publishedVersion: 1,
		triggerBinding: { event: "document.finalize" },
		nodes: c,
		edges: l,
		createdAt: t,
		updatedAt: t,
		createdBy: e
	};
}
function xl(e) {
	let t = (/* @__PURE__ */ new Date()).toISOString(), n = crypto.randomUUID(), r = crypto.randomUUID(), i = crypto.randomUUID(), a = crypto.randomUUID(), o = crypto.randomUUID(), s = crypto.randomUUID(), c = crypto.randomUUID(), l = {
		type: "trigger",
		triggerType: "document.finalize",
		documentTypeId: "meeting-notes"
	}, u = {
		type: "fork",
		branchCount: 2,
		branchLabels: ["action-items", "summary"]
	}, d = {
		type: "llm",
		provider: "bedrock",
		model: "claude-sonnet-4-6",
		systemPrompt: "Extract action items from these meeting notes. Respond as a JSON array of {assignee, task, dueDate?}.",
		userPromptTemplate: "{{context.documentBody}}",
		temperature: .2,
		maxTokens: 1024,
		streaming: !1
	}, f = {
		type: "action",
		actionType: "update-document",
		config: {
			field: "tasks",
			value: `{{context.steps.${i}.response}}`
		},
		idempotent: !0,
		onError: "route-error"
	}, p = {
		type: "llm",
		provider: "bedrock",
		model: "claude-sonnet-4-6",
		systemPrompt: "Write a short team-friendly summary of this meeting.",
		userPromptTemplate: "{{context.documentBody}}",
		temperature: .4,
		maxTokens: 512,
		streaming: !0
	}, m = {
		type: "action",
		actionType: "notify",
		config: {
			channel: "team",
			message: `Meeting summary: {{context.steps.${o}.response}}`
		},
		idempotent: !1,
		onError: "route-error"
	}, h = [
		{
			id: n,
			type: "trigger",
			position: {
				x: Z(0),
				y: Q(0)
			},
			data: l
		},
		{
			id: r,
			type: "fork",
			position: {
				x: Z(1),
				y: Q(0)
			},
			data: u
		},
		{
			id: i,
			type: "llm",
			position: {
				x: Z(2),
				y: Q(0) - _l / 2
			},
			data: d
		},
		{
			id: a,
			type: "action",
			position: {
				x: Z(3),
				y: Q(0) - _l / 2
			},
			data: f
		},
		{
			id: o,
			type: "llm",
			position: {
				x: Z(2),
				y: Q(0) + _l / 2
			},
			data: p
		},
		{
			id: s,
			type: "action",
			position: {
				x: Z(3),
				y: Q(0) + _l / 2
			},
			data: m
		},
		{
			id: c,
			type: "join",
			position: {
				x: Z(4),
				y: Q(0)
			},
			data: {
				type: "join",
				mode: "all",
				mergeStrategy: "deep-merge"
			}
		}
	], g = [
		$(n, "out", r),
		$(r, "branch-0", i),
		$(i, "out", a),
		$(a, "out", c, "in-0"),
		$(r, "branch-1", o),
		$(o, "out", s),
		$(s, "out", c, "in-1")
	];
	return {
		id: crypto.randomUUID(),
		name: "Meeting Notes Assistant",
		description: "Extract action items and send a summary in parallel when meeting notes are finalized.",
		icon: "📝",
		version: 1,
		status: "published",
		publishedVersion: 1,
		triggerBinding: {
			event: "document.finalize",
			documentTypeId: "meeting-notes"
		},
		nodes: h,
		edges: g,
		createdAt: t,
		updatedAt: t,
		createdBy: e
	};
}
function Sl(e) {
	let t = (/* @__PURE__ */ new Date()).toISOString(), n = crypto.randomUUID(), r = crypto.randomUUID(), i = crypto.randomUUID(), a = crypto.randomUUID(), o = crypto.randomUUID(), s = crypto.randomUUID(), c = crypto.randomUUID(), l = crypto.randomUUID(), u = crypto.randomUUID(), d = {
		type: "trigger",
		triggerType: "document.comment"
	}, f = {
		type: "llm",
		provider: "bedrock",
		model: "claude-sonnet-4-6",
		systemPrompt: "Classify the safety of this content. Respond with JSON {\"safe\": boolean, \"reason\": string}.",
		userPromptTemplate: "{{context.commentBody}}",
		temperature: 0,
		maxTokens: 128,
		streaming: !1
	}, p = {
		type: "condition",
		expression: `context.steps.${r}.output.safe === true`,
		label: "Safe?"
	}, m = {
		type: "action",
		actionType: "post-comment",
		config: { body: "{{context.commentBody}}" },
		idempotent: !0,
		onError: "fail-run"
	}, h = {
		type: "action",
		actionType: "notify",
		config: {
			channel: "moderation",
			message: `Flagged comment: {{context.steps.${r}.output.reason}}`
		},
		idempotent: !0,
		onError: "fail-run"
	}, g = {
		type: "approval",
		approvers: [{
			type: "role",
			value: "moderator"
		}],
		requiredCount: 1,
		timeoutMs: 864e5,
		timeoutAction: "reject",
		message: "This comment was flagged by the safety classifier. Approve to post, reject to delete."
	}, _ = {
		type: "condition",
		expression: `context.steps.${s}.output.decision === 'approve'`,
		label: "Approved?"
	}, v = [
		{
			id: n,
			type: "trigger",
			position: {
				x: Z(0),
				y: Q(0)
			},
			data: d
		},
		{
			id: r,
			type: "llm",
			position: {
				x: Z(1),
				y: Q(0)
			},
			data: f
		},
		{
			id: i,
			type: "condition",
			position: {
				x: Z(2),
				y: Q(0)
			},
			data: p
		},
		{
			id: a,
			type: "action",
			position: {
				x: Z(3),
				y: Q(0) - _l / 2
			},
			data: m
		},
		{
			id: o,
			type: "action",
			position: {
				x: Z(3),
				y: Q(0) + _l / 2
			},
			data: h
		},
		{
			id: s,
			type: "approval",
			position: {
				x: Z(4),
				y: Q(0) + _l / 2
			},
			data: g
		},
		{
			id: c,
			type: "condition",
			position: {
				x: Z(5),
				y: Q(0) + _l / 2
			},
			data: _
		},
		{
			id: l,
			type: "action",
			position: {
				x: Z(6),
				y: Q(0)
			},
			data: {
				type: "action",
				actionType: "post-comment",
				config: { body: "{{context.commentBody}}" },
				idempotent: !0,
				onError: "fail-run"
			}
		},
		{
			id: u,
			type: "action",
			position: {
				x: Z(6),
				y: Q(0) + _l
			},
			data: {
				type: "action",
				actionType: "update-document",
				config: {
					field: "commentStatus",
					value: "deleted"
				},
				idempotent: !0,
				onError: "fail-run"
			}
		}
	], y = [
		$(n, "out", r),
		$(r, "out", i),
		$(i, "true", a),
		$(i, "false", o),
		$(o, "out", s),
		$(s, "approved", c),
		$(s, "rejected", u),
		$(c, "true", l),
		$(c, "false", u)
	];
	return {
		id: crypto.randomUUID(),
		name: "Content Moderation",
		description: "Classify comments for safety; auto-post safe ones, flag risky ones for human review.",
		icon: "🛡️",
		version: 1,
		status: "published",
		publishedVersion: 1,
		triggerBinding: { event: "document.comment" },
		nodes: v,
		edges: y,
		createdAt: t,
		updatedAt: t,
		createdBy: e
	};
}
function Cl(e) {
	let t = (/* @__PURE__ */ new Date()).toISOString(), n = crypto.randomUUID(), r = crypto.randomUUID(), i = crypto.randomUUID(), a = crypto.randomUUID(), o = {
		type: "trigger",
		triggerType: "document.finalize"
	}, s = {
		type: "llm",
		provider: "bedrock",
		model: "claude-sonnet-4-6",
		systemPrompt: "Extract 3-8 relevant tags from this document. Respond with a JSON array of lowercase strings, no prose.",
		userPromptTemplate: "{{context.documentBody}}",
		temperature: .1,
		maxTokens: 256,
		streaming: !1
	}, c = {
		type: "transform",
		transformType: "jsonpath",
		expression: `$.steps.${r}.response`,
		outputKey: "tags"
	}, l = [
		{
			id: n,
			type: "trigger",
			position: {
				x: Z(0),
				y: Q(0)
			},
			data: o
		},
		{
			id: r,
			type: "llm",
			position: {
				x: Z(1),
				y: Q(0)
			},
			data: s
		},
		{
			id: i,
			type: "transform",
			position: {
				x: Z(2),
				y: Q(0)
			},
			data: c
		},
		{
			id: a,
			type: "action",
			position: {
				x: Z(3),
				y: Q(0)
			},
			data: {
				type: "action",
				actionType: "update-document",
				config: {
					field: "tags",
					value: "{{context.tags}}"
				},
				idempotent: !0,
				onError: "fail-run"
			}
		}
	], u = [
		$(n, "out", r),
		$(r, "out", i),
		$(i, "out", a)
	];
	return {
		id: crypto.randomUUID(),
		name: "Auto-tag Document",
		description: "Extract tags from a finalized document using an LLM and write them back to the document.",
		icon: "🏷️",
		version: 1,
		status: "published",
		publishedVersion: 1,
		triggerBinding: { event: "document.finalize" },
		nodes: l,
		edges: u,
		createdAt: t,
		updatedAt: t,
		createdBy: e
	};
}
function wl(e) {
	let t = (/* @__PURE__ */ new Date()).toISOString(), n = crypto.randomUUID(), r = crypto.randomUUID(), i = crypto.randomUUID(), a = crypto.randomUUID(), o = [
		{
			id: n,
			type: "trigger",
			position: {
				x: Z(0),
				y: Q(0)
			},
			data: {
				type: "trigger",
				triggerType: "document.finalize"
			}
		},
		{
			id: r,
			type: "approval",
			position: {
				x: Z(1),
				y: Q(0)
			},
			data: {
				type: "approval",
				approvers: [{
					type: "role",
					value: "team-lead"
				}],
				requiredCount: 1,
				timeoutMs: 1728e5,
				timeoutAction: "reject",
				message: "Team-lead approval required before this document can advance."
			}
		},
		{
			id: i,
			type: "approval",
			position: {
				x: Z(2),
				y: Q(0)
			},
			data: {
				type: "approval",
				approvers: [{
					type: "role",
					value: "director"
				}],
				requiredCount: 1,
				timeoutMs: 2592e5,
				timeoutAction: "reject",
				message: "Director approval required before publishing."
			}
		},
		{
			id: a,
			type: "action",
			position: {
				x: Z(3),
				y: Q(0)
			},
			data: {
				type: "action",
				actionType: "update-document",
				config: {
					field: "status",
					value: "published"
				},
				idempotent: !0,
				onError: "fail-run"
			}
		}
	], s = [
		$(n, "out", r),
		$(r, "approved", i),
		$(i, "approved", a)
	];
	return {
		id: crypto.randomUUID(),
		name: "Approval Chain",
		description: "Require team-lead then director approval before publishing a finalized document.",
		icon: "✅",
		version: 1,
		status: "published",
		publishedVersion: 1,
		triggerBinding: { event: "document.finalize" },
		nodes: o,
		edges: s,
		createdAt: t,
		updatedAt: t,
		createdBy: e
	};
}
function Tl(e) {
	let t = (/* @__PURE__ */ new Date()).toISOString(), n = crypto.randomUUID(), r = crypto.randomUUID(), i = crypto.randomUUID(), a = crypto.randomUUID(), o = {
		type: "trigger",
		triggerType: "webhook",
		webhookPath: "/pipelines/webhooks/translate"
	}, s = {
		type: "transform",
		transformType: "jsonpath",
		expression: "$.payload.text",
		outputKey: "sourceText"
	}, c = {
		type: "llm",
		provider: "bedrock",
		model: "claude-sonnet-4-6",
		systemPrompt: "Translate the provided text into English. Respond with the translation only, no prose.",
		userPromptTemplate: "{{context.sourceText}}",
		temperature: .2,
		maxTokens: 1024,
		streaming: !0
	}, l = {
		type: "action",
		actionType: "post-comment",
		config: { body: `{{context.steps.${i}.response}}` },
		idempotent: !0,
		onError: "route-error"
	}, u = [
		{
			id: n,
			type: "trigger",
			position: {
				x: Z(0),
				y: Q(0)
			},
			data: o
		},
		{
			id: r,
			type: "transform",
			position: {
				x: Z(1),
				y: Q(0)
			},
			data: s
		},
		{
			id: i,
			type: "llm",
			position: {
				x: Z(2),
				y: Q(0)
			},
			data: c
		},
		{
			id: a,
			type: "action",
			position: {
				x: Z(3),
				y: Q(0)
			},
			data: l
		}
	], d = [
		$(n, "out", r),
		$(r, "out", i),
		$(i, "out", a)
	];
	return {
		id: crypto.randomUUID(),
		name: "Webhook → Translate → Publish",
		description: "Receive a webhook payload, extract text, translate to English, and post it as a comment.",
		icon: "🌐",
		version: 1,
		status: "published",
		publishedVersion: 1,
		triggerBinding: {
			event: "webhook",
			webhookPath: "/pipelines/webhooks/translate"
		},
		nodes: u,
		edges: d,
		createdAt: t,
		updatedAt: t,
		createdBy: e
	};
}
function El(e) {
	let t = (/* @__PURE__ */ new Date()).toISOString(), n = crypto.randomUUID(), r = crypto.randomUUID(), i = crypto.randomUUID(), a = {
		type: "trigger",
		triggerType: "schedule",
		schedule: "0 9 * * *"
	}, o = {
		type: "llm",
		provider: "bedrock",
		model: "claude-sonnet-4-6",
		systemPrompt: "Summarize all documents updated in the last 24 hours into a concise daily digest with bullet points.",
		userPromptTemplate: "{{context.recentDocuments}}",
		temperature: .3,
		maxTokens: 1024,
		streaming: !1
	}, s = {
		type: "action",
		actionType: "post-comment",
		config: {
			documentId: "digest-doc",
			body: `{{context.steps.${r}.response}}`
		},
		idempotent: !0,
		onError: "route-error"
	}, c = [
		{
			id: n,
			type: "trigger",
			position: {
				x: Z(0),
				y: Q(0)
			},
			data: a
		},
		{
			id: r,
			type: "llm",
			position: {
				x: Z(1),
				y: Q(0)
			},
			data: o
		},
		{
			id: i,
			type: "action",
			position: {
				x: Z(2),
				y: Q(0)
			},
			data: s
		}
	], l = [$(n, "out", r), $(r, "out", i)];
	return {
		id: crypto.randomUUID(),
		name: "Daily Document Digest",
		description: "Every morning at 9am, summarize the last 24h of document activity and post it to a digest doc.",
		icon: "📰",
		version: 1,
		status: "published",
		publishedVersion: 1,
		triggerBinding: {
			event: "schedule",
			schedule: "0 9 * * *"
		},
		nodes: c,
		edges: l,
		createdAt: t,
		updatedAt: t,
		createdBy: e
	};
}
function Dl(e) {
	let t = (/* @__PURE__ */ new Date()).toISOString(), n = crypto.randomUUID(), r = crypto.randomUUID(), i = crypto.randomUUID(), a = {
		type: "trigger",
		triggerType: "document.submit"
	}, o = {
		type: "llm",
		provider: "bedrock",
		model: "claude-sonnet-4-6",
		systemPrompt: "Extract 3-6 relevant tags from this newly submitted document. Respond as a JSON array of lowercase strings, no prose.",
		userPromptTemplate: "{{context.documentBody}}",
		temperature: .2,
		maxTokens: 256,
		streaming: !1
	}, s = {
		type: "action",
		actionType: "update-document",
		config: {
			field: "tags",
			value: `{{context.steps.${r}.response}}`
		},
		idempotent: !0,
		onError: "fail-run"
	}, c = [
		{
			id: n,
			type: "trigger",
			position: {
				x: Z(0),
				y: Q(0)
			},
			data: a
		},
		{
			id: r,
			type: "llm",
			position: {
				x: Z(1),
				y: Q(0)
			},
			data: o
		},
		{
			id: i,
			type: "action",
			position: {
				x: Z(2),
				y: Q(0)
			},
			data: s
		}
	], l = [$(n, "out", r), $(r, "out", i)];
	return {
		id: crypto.randomUUID(),
		name: "Auto-tag on Creation",
		description: "When a new document is submitted, extract tags with an LLM and write them back to the document.",
		icon: "🏷️",
		version: 1,
		status: "published",
		publishedVersion: 1,
		triggerBinding: { event: "document.submit" },
		nodes: c,
		edges: l,
		createdAt: t,
		updatedAt: t,
		createdBy: e
	};
}
function Ol(e) {
	let t = (/* @__PURE__ */ new Date()).toISOString(), n = crypto.randomUUID(), r = crypto.randomUUID(), i = crypto.randomUUID(), a = crypto.randomUUID(), o = crypto.randomUUID(), s = crypto.randomUUID(), c = {
		type: "trigger",
		triggerType: "document.finalize"
	}, l = {
		type: "fork",
		branchCount: 2,
		branchLabels: ["llm-review", "human-review"]
	}, u = {
		type: "llm",
		provider: "bedrock",
		model: "claude-sonnet-4-6",
		systemPrompt: "You are a code/document reviewer. Provide a PR-style review with comments, suggestions, and an approval recommendation.",
		userPromptTemplate: "{{context.documentBody}}",
		temperature: .3,
		maxTokens: 1024,
		streaming: !1
	}, d = {
		type: "approval",
		approvers: [{
			type: "role",
			value: "reviewer"
		}],
		requiredCount: 1,
		timeoutMs: 1728e5,
		timeoutAction: "reject",
		message: "Please review this document PR-style and approve or reject."
	}, f = {
		type: "join",
		mode: "all",
		mergeStrategy: "deep-merge"
	}, p = {
		type: "action",
		actionType: "notify",
		config: {
			channel: "reviews",
			message: `Review complete: LLM said {{context.steps.${i}.response}}; reviewer decision: {{context.steps.${a}.output.decision}}`
		},
		idempotent: !1,
		onError: "route-error"
	}, m = [
		{
			id: n,
			type: "trigger",
			position: {
				x: Z(0),
				y: Q(0)
			},
			data: c
		},
		{
			id: r,
			type: "fork",
			position: {
				x: Z(1),
				y: Q(0)
			},
			data: l
		},
		{
			id: i,
			type: "llm",
			position: {
				x: Z(2),
				y: Q(0) - _l / 2
			},
			data: u
		},
		{
			id: a,
			type: "approval",
			position: {
				x: Z(2),
				y: Q(0) + _l / 2
			},
			data: d
		},
		{
			id: o,
			type: "join",
			position: {
				x: Z(3),
				y: Q(0)
			},
			data: f
		},
		{
			id: s,
			type: "action",
			position: {
				x: Z(4),
				y: Q(0)
			},
			data: p
		}
	], h = [
		$(n, "out", r),
		$(r, "branch-0", i),
		$(i, "out", o, "in-0"),
		$(r, "branch-1", a),
		$(a, "approved", o, "in-1"),
		$(o, "out", s)
	];
	return {
		id: crypto.randomUUID(),
		name: "PR-style Review",
		description: "Finalize a document, run an LLM review and human approval in parallel, then notify when both complete.",
		icon: "🔍",
		version: 1,
		status: "published",
		publishedVersion: 1,
		triggerBinding: { event: "document.finalize" },
		nodes: m,
		edges: h,
		createdAt: t,
		updatedAt: t,
		createdBy: e
	};
}
function kl(e) {
	let t = (/* @__PURE__ */ new Date()).toISOString(), n = crypto.randomUUID(), r = crypto.randomUUID(), i = crypto.randomUUID(), a = crypto.randomUUID(), o = crypto.randomUUID(), s = crypto.randomUUID(), c = {
		type: "trigger",
		triggerType: "webhook",
		webhookPath: "/pipelines/webhooks/incident"
	}, l = {
		type: "llm",
		provider: "bedrock",
		model: "claude-sonnet-4-6",
		systemPrompt: "You are an incident triage assistant. Read the alert payload (PagerDuty/Opsgenie shape) and respond with strict JSON {\"severity\": \"critical\"|\"high\"|\"medium\"|\"low\", \"summary\": string}. No prose.",
		userPromptTemplate: "{{context.payload}}",
		temperature: 0,
		maxTokens: 256,
		streaming: !1
	}, u = {
		type: "condition",
		expression: `context.steps.${r}.output.severity === 'critical'`,
		label: "Critical?"
	}, d = {
		type: "action",
		actionType: "notify",
		config: {
			channel: "on-call",
			message: `CRITICAL incident: {{context.steps.${r}.output.summary}}`
		},
		idempotent: !1,
		onError: "fail-run"
	}, f = {
		type: "approval",
		approvers: [{
			type: "role",
			value: "incident-commander"
		}],
		requiredCount: 1,
		timeoutMs: 864e5,
		timeoutAction: "escalate",
		message: "Critical incident paged. Please acknowledge and assign a post-mortem owner."
	}, p = {
		type: "action",
		actionType: "webhook",
		config: {
			url: "https://tickets.example.com/api/incidents",
			method: "POST",
			body: {
				severity: `{{context.steps.${r}.output.severity}}`,
				summary: `{{context.steps.${r}.output.summary}}`
			}
		},
		idempotent: !0,
		onError: "route-error"
	}, m = [
		{
			id: n,
			type: "trigger",
			position: {
				x: Z(0),
				y: Q(0)
			},
			data: c
		},
		{
			id: r,
			type: "llm",
			position: {
				x: Z(1),
				y: Q(0)
			},
			data: l
		},
		{
			id: i,
			type: "condition",
			position: {
				x: Z(2),
				y: Q(0)
			},
			data: u
		},
		{
			id: a,
			type: "action",
			position: {
				x: Z(3),
				y: Q(0) - _l / 2
			},
			data: d
		},
		{
			id: o,
			type: "approval",
			position: {
				x: Z(4),
				y: Q(0) - _l / 2
			},
			data: f
		},
		{
			id: s,
			type: "action",
			position: {
				x: Z(3),
				y: Q(0) + _l / 2
			},
			data: p
		}
	], h = [
		$(n, "out", r),
		$(r, "out", i),
		$(i, "true", a),
		$(a, "out", o),
		$(i, "false", s)
	];
	return {
		id: crypto.randomUUID(),
		name: "Incident Response",
		description: "Webhook from PagerDuty/Opsgenie triages severity; critical alerts page on-call and request a post-mortem owner, others file a ticket.",
		icon: "🚨",
		version: 1,
		status: "published",
		publishedVersion: 1,
		triggerBinding: {
			event: "webhook",
			webhookPath: "/pipelines/webhooks/incident"
		},
		nodes: m,
		edges: h,
		createdAt: t,
		updatedAt: t,
		createdBy: e
	};
}
function Al(e) {
	let t = (/* @__PURE__ */ new Date()).toISOString(), n = crypto.randomUUID(), r = crypto.randomUUID(), i = crypto.randomUUID(), a = crypto.randomUUID(), o = crypto.randomUUID(), s = crypto.randomUUID(), c = crypto.randomUUID(), l = crypto.randomUUID(), u = crypto.randomUUID(), d = {
		type: "trigger",
		triggerType: "webhook",
		webhookPath: "/pipelines/webhooks/github-pr"
	}, f = {
		type: "llm",
		provider: "bedrock",
		model: "claude-sonnet-4-6",
		systemPrompt: "You are a senior code reviewer. Read the GitHub pull-request payload and produce a brief, structured summary of the diff (files touched, scope, intent). No prose preface.",
		userPromptTemplate: "{{context.payload.pull_request}}",
		temperature: .2,
		maxTokens: 768,
		streaming: !1
	}, p = {
		type: "fork",
		branchCount: 3,
		branchLabels: [
			"security",
			"style",
			"tests"
		]
	}, m = {
		type: "llm",
		provider: "bedrock",
		model: "claude-sonnet-4-6",
		systemPrompt: "You are a security auditor. Review this diff for vulnerabilities (injection, secrets, authz, unsafe deserialization, SSRF). Output JSON {\"findings\": [{\"severity\": \"high\"|\"med\"|\"low\", \"file\": string, \"issue\": string}]}.",
		userPromptTemplate: `{{context.payload.pull_request.diff}}\n\nSummary: {{context.steps.${r}.response}}`,
		temperature: .1,
		maxTokens: 1024,
		streaming: !1
	}, h = {
		type: "llm",
		provider: "bedrock",
		model: "claude-sonnet-4-6",
		systemPrompt: "You are a code-style reviewer. Flag naming, structure, readability, and idiom issues. Output JSON {\"findings\": [{\"file\": string, \"line\": number?, \"issue\": string}]}.",
		userPromptTemplate: `{{context.payload.pull_request.diff}}\n\nSummary: {{context.steps.${r}.response}}`,
		temperature: .2,
		maxTokens: 1024,
		streaming: !1
	}, g = {
		type: "llm",
		provider: "bedrock",
		model: "claude-sonnet-4-6",
		systemPrompt: "You are a test-coverage reviewer. Identify untested branches, missing edge-case tests, and risky changes lacking tests. Output JSON {\"gaps\": [{\"file\": string, \"concern\": string}]}.",
		userPromptTemplate: `{{context.payload.pull_request.diff}}\n\nSummary: {{context.steps.${r}.response}}`,
		temperature: .1,
		maxTokens: 1024,
		streaming: !1
	}, _ = {
		type: "join",
		mode: "all",
		mergeStrategy: "array-collect"
	}, v = {
		type: "llm",
		provider: "bedrock",
		model: "claude-sonnet-4-6",
		systemPrompt: "You are a lead reviewer. Combine the security, style, and test-coverage findings into a single PR comment in markdown with sections, prioritized actions, and a final approve/request-changes recommendation.",
		userPromptTemplate: `Security: {{context.steps.${a}.response}}\n\nStyle: {{context.steps.${o}.response}}\n\nCoverage: {{context.steps.${s}.response}}`,
		temperature: .3,
		maxTokens: 1536,
		streaming: !0
	}, y = {
		type: "action",
		actionType: "webhook",
		config: {
			url: "{{context.payload.pull_request.comments_url}}",
			method: "POST",
			body: { body: `{{context.steps.${l}.response}}` }
		},
		idempotent: !1,
		onError: "route-error"
	}, b = [
		{
			id: n,
			type: "trigger",
			position: {
				x: Z(0),
				y: Q(0)
			},
			data: d
		},
		{
			id: r,
			type: "llm",
			position: {
				x: Z(1),
				y: Q(0)
			},
			data: f
		},
		{
			id: i,
			type: "fork",
			position: {
				x: Z(2),
				y: Q(0)
			},
			data: p
		},
		{
			id: a,
			type: "llm",
			position: {
				x: Z(3),
				y: Q(0) - _l
			},
			data: m
		},
		{
			id: o,
			type: "llm",
			position: {
				x: Z(3),
				y: Q(0)
			},
			data: h
		},
		{
			id: s,
			type: "llm",
			position: {
				x: Z(3),
				y: Q(0) + _l
			},
			data: g
		},
		{
			id: c,
			type: "join",
			position: {
				x: Z(4),
				y: Q(0)
			},
			data: _
		},
		{
			id: l,
			type: "llm",
			position: {
				x: Z(5),
				y: Q(0)
			},
			data: v
		},
		{
			id: u,
			type: "action",
			position: {
				x: Z(6),
				y: Q(0)
			},
			data: y
		}
	], x = [
		$(n, "out", r),
		$(r, "out", i),
		$(i, "branch-0", a),
		$(i, "branch-1", o),
		$(i, "branch-2", s),
		$(a, "out", c, "in-0"),
		$(o, "out", c, "in-1"),
		$(s, "out", c, "in-2"),
		$(c, "out", l),
		$(l, "out", u)
	];
	return {
		id: crypto.randomUUID(),
		name: "Code Review",
		description: "GitHub PR webhook fans out security, style, and test-coverage reviews in parallel, then synthesizes one PR comment.",
		icon: "🔍",
		version: 1,
		status: "published",
		publishedVersion: 1,
		triggerBinding: {
			event: "webhook",
			webhookPath: "/pipelines/webhooks/github-pr"
		},
		nodes: b,
		edges: x,
		createdAt: t,
		updatedAt: t,
		createdBy: e
	};
}
function jl(e) {
	let t = (/* @__PURE__ */ new Date()).toISOString(), n = crypto.randomUUID(), r = crypto.randomUUID(), i = crypto.randomUUID(), a = crypto.randomUUID(), o = crypto.randomUUID(), s = {
		type: "trigger",
		triggerType: "document.submit"
	}, c = {
		type: "llm",
		provider: "bedrock",
		model: "claude-sonnet-4-6",
		systemPrompt: "Classify this newly created document for safety. Output strict JSON {\"category\": \"clean\"|\"pii\"|\"policy_violation\", \"reason\": string}. No prose.",
		userPromptTemplate: "{{context.documentBody}}",
		temperature: 0,
		maxTokens: 192,
		streaming: !1
	}, l = {
		type: "condition",
		expression: `context.steps.${r}.output.category === 'clean'`,
		label: "Clean?"
	}, u = {
		type: "action",
		actionType: "update-document",
		config: {
			field: "status",
			value: "published"
		},
		idempotent: !0,
		onError: "fail-run"
	}, d = {
		type: "approval",
		approvers: [{
			type: "role",
			value: "moderator"
		}],
		requiredCount: 1,
		timeoutMs: 432e5,
		timeoutAction: "reject",
		message: `Document flagged as {{context.steps.${r}.output.category}} — please review before publishing.`
	}, f = [
		{
			id: n,
			type: "trigger",
			position: {
				x: Z(0),
				y: Q(0)
			},
			data: s
		},
		{
			id: r,
			type: "llm",
			position: {
				x: Z(1),
				y: Q(0)
			},
			data: c
		},
		{
			id: i,
			type: "condition",
			position: {
				x: Z(2),
				y: Q(0)
			},
			data: l
		},
		{
			id: a,
			type: "action",
			position: {
				x: Z(3),
				y: Q(0) - _l / 2
			},
			data: u
		},
		{
			id: o,
			type: "approval",
			position: {
				x: Z(3),
				y: Q(0) + _l / 2
			},
			data: d
		}
	], p = [
		$(n, "out", r),
		$(r, "out", i),
		$(i, "true", a),
		$(i, "false", o)
	];
	return {
		id: crypto.randomUUID(),
		name: "Content Moderation (Publish Gate)",
		description: "On document creation, classify safety (PII / policy / clean); auto-publish clean docs, route flagged ones to moderator approval.",
		icon: "🛡️",
		version: 1,
		status: "published",
		publishedVersion: 1,
		triggerBinding: { event: "document.submit" },
		nodes: f,
		edges: p,
		createdAt: t,
		updatedAt: t,
		createdBy: e
	};
}
function Ml(e) {
	let t = (/* @__PURE__ */ new Date()).toISOString(), n = crypto.randomUUID(), r = crypto.randomUUID(), i = crypto.randomUUID(), a = crypto.randomUUID(), o = crypto.randomUUID(), s = crypto.randomUUID(), c = crypto.randomUUID(), l = crypto.randomUUID(), u = {
		type: "trigger",
		triggerType: "webhook",
		webhookPath: "/pipelines/webhooks/helpdesk"
	}, d = {
		type: "llm",
		provider: "bedrock",
		model: "claude-sonnet-4-6",
		systemPrompt: "Read this helpdesk ticket. Extract intent and urgency. Output strict JSON {\"intent\": string, \"urgency\": \"high\"|\"medium\"|\"low\", \"tags\": string[]}. No prose.",
		userPromptTemplate: "{{context.payload.ticket}}",
		temperature: .1,
		maxTokens: 256,
		streaming: !1
	}, f = {
		type: "transform",
		transformType: "jsonpath",
		expression: `$.steps.${r}.output`,
		outputKey: "triage"
	}, p = {
		type: "condition",
		expression: "context.triage.urgency === 'high'",
		label: "High urgency?"
	}, m = {
		type: "action",
		actionType: "notify",
		config: {
			channel: "support-escalations",
			message: "High-urgency ticket: {{context.triage.intent}} (tags: {{context.triage.tags}})"
		},
		idempotent: !1,
		onError: "fail-run"
	}, h = {
		type: "llm",
		provider: "bedrock",
		model: "claude-sonnet-4-6",
		systemPrompt: "You are a customer-support agent. Draft a friendly, concise reply addressing the ticket intent. Sign off as \"The Support Team\". Plain text, no markdown.",
		userPromptTemplate: "Ticket: {{context.payload.ticket}}\n\nIntent: {{context.triage.intent}}\nTags: {{context.triage.tags}}",
		temperature: .4,
		maxTokens: 768,
		streaming: !0
	}, g = {
		type: "approval",
		approvers: [{
			type: "role",
			value: "support-agent"
		}],
		requiredCount: 1,
		timeoutMs: 144e5,
		timeoutAction: "reject",
		message: "Please review this drafted reply before it is sent to the customer."
	}, _ = {
		type: "action",
		actionType: "webhook",
		config: {
			url: "https://helpdesk.example.com/api/replies",
			method: "POST",
			body: {
				ticketId: "{{context.payload.ticket.id}}",
				body: `{{context.steps.${s}.response}}`
			}
		},
		idempotent: !0,
		onError: "route-error"
	}, v = [
		{
			id: n,
			type: "trigger",
			position: {
				x: Z(0),
				y: Q(0)
			},
			data: u
		},
		{
			id: r,
			type: "llm",
			position: {
				x: Z(1),
				y: Q(0)
			},
			data: d
		},
		{
			id: i,
			type: "transform",
			position: {
				x: Z(2),
				y: Q(0)
			},
			data: f
		},
		{
			id: a,
			type: "condition",
			position: {
				x: Z(3),
				y: Q(0)
			},
			data: p
		},
		{
			id: o,
			type: "action",
			position: {
				x: Z(4),
				y: Q(0) - _l / 2
			},
			data: m
		},
		{
			id: s,
			type: "llm",
			position: {
				x: Z(4),
				y: Q(0) + _l / 2
			},
			data: h
		},
		{
			id: c,
			type: "approval",
			position: {
				x: Z(5),
				y: Q(0) + _l / 2
			},
			data: g
		},
		{
			id: l,
			type: "action",
			position: {
				x: Z(6),
				y: Q(0) + _l / 2
			},
			data: _
		}
	], y = [
		$(n, "out", r),
		$(r, "out", i),
		$(i, "out", a),
		$(a, "true", o),
		$(a, "false", s),
		$(s, "out", c),
		$(c, "approved", l)
	];
	return {
		id: crypto.randomUUID(),
		name: "Customer Support Triage",
		description: "Helpdesk webhook classifies intent and urgency; high-urgency tickets escalate, others get an agent-reviewed draft reply auto-sent on approval.",
		icon: "🎧",
		version: 1,
		status: "published",
		publishedVersion: 1,
		triggerBinding: {
			event: "webhook",
			webhookPath: "/pipelines/webhooks/helpdesk"
		},
		nodes: v,
		edges: y,
		createdAt: t,
		updatedAt: t,
		createdBy: e
	};
}
var Nl = [
	{
		id: "document-summary",
		name: "Document Summary",
		description: "Summarize a finalized document and post the summary as a comment.",
		icon: "📄",
		tags: [
			"llm",
			"summary",
			"document"
		],
		build: bl
	},
	{
		id: "meeting-notes-assistant",
		name: "Meeting Notes Assistant",
		description: "Extract action items and send a team summary in parallel when meeting notes are finalized.",
		icon: "📝",
		tags: [
			"llm",
			"parallel",
			"meeting",
			"tasks"
		],
		build: xl
	},
	{
		id: "content-moderation",
		name: "Content Moderation",
		description: "Classify comments for safety; auto-post safe ones, flag risky ones for human review.",
		icon: "🛡️",
		tags: [
			"llm",
			"moderation",
			"approval",
			"condition"
		],
		build: Sl,
		prerequisites: { documentTypes: [{
			name: "Moderated Comment",
			icon: "💬",
			fields: [
				{
					name: "commentBody",
					fieldType: "long_text",
					required: !0
				},
				{
					name: "commentStatus",
					fieldType: "enum",
					options: [
						"pending",
						"approved",
						"rejected",
						"deleted"
					]
				},
				{
					name: "author",
					fieldType: "text"
				}
			]
		}] }
	},
	{
		id: "auto-tag-document",
		name: "Auto-tag Document",
		description: "Extract tags from a finalized document using an LLM and write them back.",
		icon: "🏷️",
		tags: [
			"llm",
			"tags",
			"transform"
		],
		build: Cl,
		prerequisites: { documentTypes: [{
			name: "Taggable Document",
			icon: "🏷️",
			fields: [
				{
					name: "title",
					fieldType: "text",
					required: !0
				},
				{
					name: "body",
					fieldType: "long_text",
					required: !0
				},
				{
					name: "tags",
					fieldType: "text"
				}
			]
		}] }
	},
	{
		id: "approval-chain",
		name: "Approval Chain",
		description: "Require team-lead then director approval before publishing a finalized document.",
		icon: "✅",
		tags: ["approval", "governance"],
		build: wl,
		prerequisites: { documentTypes: [{
			name: "Publishable Document",
			icon: "📄",
			fields: [
				{
					name: "title",
					fieldType: "text",
					required: !0
				},
				{
					name: "body",
					fieldType: "long_text",
					required: !0
				},
				{
					name: "status",
					fieldType: "enum",
					options: [
						"draft",
						"review",
						"published"
					]
				}
			]
		}] }
	},
	{
		id: "webhook-translate-publish",
		name: "Webhook → Translate → Publish",
		description: "Receive a webhook payload, extract text, translate to English, and post it as a comment.",
		icon: "🌐",
		tags: [
			"webhook",
			"llm",
			"translate"
		],
		build: Tl
	},
	{
		id: "daily-document-digest",
		name: "Daily Document Digest",
		description: "Every morning at 9am, summarize the last 24h of document activity and post it to a digest doc.",
		icon: "📰",
		tags: [
			"schedule",
			"llm",
			"digest",
			"cron"
		],
		build: El
	},
	{
		id: "auto-tag-on-creation",
		name: "Auto-tag on Creation",
		description: "When a new document is submitted, extract tags with an LLM and write them back to the document.",
		icon: "🏷️",
		tags: [
			"llm",
			"tags",
			"submit"
		],
		build: Dl
	},
	{
		id: "pr-style-review",
		name: "PR-style Review",
		description: "Finalize a document, run an LLM review and human approval in parallel, then notify when both complete.",
		icon: "🔍",
		tags: [
			"fork",
			"llm",
			"approval",
			"review",
			"join"
		],
		build: Ol
	},
	{
		id: "incident-response",
		name: "Incident Response",
		description: "Webhook from PagerDuty/Opsgenie triages severity; critical alerts page on-call and request a post-mortem owner, others file a ticket.",
		icon: "🚨",
		tags: [
			"webhook",
			"incident",
			"ops",
			"condition",
			"approval"
		],
		build: kl
	},
	{
		id: "code-review",
		name: "Code Review",
		description: "GitHub PR webhook fans out security, style, and test-coverage reviews in parallel, then synthesizes one PR comment.",
		icon: "🔍",
		tags: [
			"webhook",
			"fork",
			"llm",
			"review",
			"github",
			"join"
		],
		build: Al
	},
	{
		id: "content-moderation-publish-gate",
		name: "Content Moderation (Publish Gate)",
		description: "On document creation, classify safety (PII / policy / clean); auto-publish clean docs, route flagged ones to moderator approval.",
		icon: "🛡️",
		tags: [
			"moderation",
			"llm",
			"condition",
			"approval",
			"submit"
		],
		build: jl
	},
	{
		id: "support-triage",
		name: "Customer Support Triage",
		description: "Helpdesk webhook classifies intent and urgency; high-urgency tickets escalate, others get an agent-reviewed draft reply auto-sent on approval.",
		icon: "🎧",
		tags: [
			"webhook",
			"support",
			"llm",
			"condition",
			"approval",
			"transform"
		],
		build: Ml
	}
], Pl = "/api";
async function Fl(e) {
	let t = {
		createdTypes: [],
		errors: []
	};
	if (!e?.documentTypes?.length) return t;
	for (let n of e.documentTypes) try {
		let e = await Il(n.name);
		if (e) {
			t.createdTypes.push(e.typeId);
			continue;
		}
		let r = await Ll(n);
		t.createdTypes.push(r.typeId);
	} catch (e) {
		t.errors.push(`Failed to scaffold "${n.name}": ${e instanceof Error ? e.message : String(e)}`);
	}
	return t;
}
async function Il(e) {
	try {
		let t = await fetch(`${Pl}/document-types`, { credentials: "same-origin" });
		if (!t.ok) return null;
		let n = (await t.json()).items?.find((t) => t.name.toLowerCase() === e.toLowerCase());
		return n ? { typeId: n.typeId } : null;
	} catch {
		return null;
	}
}
async function Ll(e) {
	let t = e.fields.map((e, t) => ({
		fieldId: crypto.randomUUID(),
		name: e.name,
		fieldType: e.fieldType,
		widget: Rl(e.fieldType),
		cardinality: 1,
		required: e.required ?? !1,
		helpText: "",
		options: e.options,
		order: t
	})), n = await fetch(`${Pl}/document-types`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		credentials: "same-origin",
		body: JSON.stringify({
			name: e.name,
			description: "Auto-created for pipeline template",
			icon: e.icon,
			fields: t
		})
	});
	if (!n.ok) {
		let e = await n.text();
		throw Error(`HTTP ${n.status}: ${e}`);
	}
	return await n.json();
}
function Rl(e) {
	switch (e) {
		case "long_text": return "textarea";
		case "number": return "number_input";
		case "date": return "date_picker";
		case "boolean": return "checkbox";
		case "enum": return "select";
		default: return "text_field";
	}
}
//#endregion
//#region src/components/pipelines/TemplatesModal.tsx
function zl(e) {
	let t = /* @__PURE__ */ new Map(), n = e.nodes.map((e) => {
		let n = crypto.randomUUID();
		return t.set(e.id, n), {
			...e,
			id: n,
			data: JSON.parse(JSON.stringify(e.data)),
			position: { ...e.position }
		};
	}), r = e.edges.map((e) => ({
		...e,
		id: crypto.randomUUID(),
		source: t.get(e.source) ?? e.source,
		target: t.get(e.target) ?? e.target
	})), i = (/* @__PURE__ */ new Date()).toISOString();
	return {
		...e,
		id: crypto.randomUUID(),
		name: `${e.name} (copy)`,
		status: "draft",
		version: 1,
		publishedVersion: void 0,
		publishedSnapshot: void 0,
		nodes: n,
		edges: r,
		createdAt: i,
		updatedAt: i
	};
}
function Bl(e) {
	let t = e.triggerBinding?.event ?? "manual";
	return t === "schedule" ? "Schedule" : t === "webhook" ? "Webhook" : t === "manual" ? "Manual" : t.startsWith("document.") ? `On ${t}` : t;
}
function Vl({ template: e, meta: t, onPick: n }) {
	return /* @__PURE__ */ W("div", {
		"data-testid": `template-card-${e.id}`,
		className: "flex flex-col gap-2 w-[220px] min-h-[200px] p-3.5 bg-surface border border-border rounded-[10px] font-[inherit]",
		children: [
			/* @__PURE__ */ W("div", {
				className: "flex items-center gap-2.5",
				children: [/* @__PURE__ */ U("span", {
					className: "text-2xl",
					"aria-hidden": !0,
					children: e.icon
				}), /* @__PURE__ */ U("div", {
					className: "text-sm font-bold text-text-primary overflow-hidden text-ellipsis",
					children: e.name
				})]
			}),
			/* @__PURE__ */ W("div", {
				"data-testid": `template-meta-${e.id}`,
				className: "text-[11px] text-text-tertiary flex gap-2",
				children: [
					/* @__PURE__ */ W("span", { children: [
						t.nodeCount,
						" node",
						t.nodeCount === 1 ? "" : "s"
					] }),
					/* @__PURE__ */ U("span", {
						"aria-hidden": !0,
						children: "·"
					}),
					/* @__PURE__ */ U("span", { children: t.trigger })
				]
			}),
			/* @__PURE__ */ U("div", {
				className: "text-xs text-text-secondary leading-[1.4] flex-1",
				children: e.description
			}),
			e.tags.length > 0 && /* @__PURE__ */ U("div", {
				className: "flex flex-wrap gap-1",
				children: e.tags.map((e) => /* @__PURE__ */ U("span", {
					className: "text-[10px] font-semibold px-1.5 py-0.5 rounded bg-surface-hover text-text-secondary lowercase",
					children: e
				}, e))
			}),
			/* @__PURE__ */ U("button", {
				type: "button",
				"data-testid": `template-use-${e.id}`,
				onClick: () => n(e),
				className: "mt-auto px-2.5 py-1.5 text-xs font-semibold bg-primary text-white border-none rounded-md cursor-pointer font-[inherit]",
				children: "Use this template"
			})
		]
	});
}
function Hl({ open: t, onClose: n, onCreated: r, onSelect: i }) {
	let { userId: a } = e(), [o, s] = V(""), c = B(null);
	R(() => {
		t && (s(""), setTimeout(() => c.current?.focus(), 30));
	}, [t]);
	let l = z(() => {
		let e = /* @__PURE__ */ new Map();
		for (let t of Nl) {
			let n = t.build(a || "anonymous");
			e.set(t.id, {
				nodeCount: n.nodes.length,
				trigger: Bl(n)
			});
		}
		return e;
	}, [a, t]), u = z(() => {
		let e = o.trim().toLowerCase();
		return e ? Nl.filter((t) => t.name.toLowerCase().includes(e) || t.description.toLowerCase().includes(e) || t.tags.some((t) => t.toLowerCase().includes(e))) : Nl;
	}, [o]), d = (e) => {
		if (r) {
			let t = zl(e.build(a || "anonymous"));
			ke(t), n(), r(t.id), e.prerequisites && Fl(e.prerequisites).then((e) => {
				e.errors.length > 0 && console.warn("[TemplatesModal] scaffold errors:", e.errors);
			});
			return;
		}
		i && i(e);
	};
	return /* @__PURE__ */ W(C, {
		open: t,
		onClose: n,
		title: "Pipeline templates",
		maxWidth: 760,
		backdropTestId: "templates-modal",
		rawChildren: !0,
		children: [
			/* @__PURE__ */ U("div", {
				className: "text-[13px] text-text-secondary mb-3",
				children: "Pick a template to spawn a new pipeline with prebuilt nodes and edges."
			}),
			/* @__PURE__ */ U(k, {
				ref: c,
				type: "search",
				"data-testid": "templates-search",
				placeholder: "Search templates…",
				value: o,
				onChange: (e) => s(e.target.value),
				onKeyDown: (e) => {
					e.key === "Enter" && u.length > 0 && (e.preventDefault(), d(u[0]));
				},
				className: "w-full mb-3.5",
				"aria-label": "Search templates"
			}),
			u.length === 0 ? /* @__PURE__ */ W("div", {
				"data-testid": "templates-empty",
				className: "text-center p-8 text-[13px] text-text-tertiary",
				children: [
					"No templates match \"",
					o,
					"\"."
				]
			}) : /* @__PURE__ */ U("div", {
				"data-testid": "templates-grid",
				className: "grid grid-cols-[repeat(3,220px)] gap-4 justify-center max-h-[60vh] overflow-y-auto p-2",
				children: u.map((e) => /* @__PURE__ */ U(Vl, {
					template: e,
					meta: l.get(e.id) ?? {
						nodeCount: 0,
						trigger: "—"
					},
					onPick: d
				}, e.id))
			})
		]
	});
}
//#endregion
//#region src/components/pipelines/PipelinesPage.tsx
var Ul = [
	"draft",
	"published",
	"archived"
], Wl = ["draft", "published"];
function Gl(e) {
	if (e == null) return null;
	if (e.trim() === "") return /* @__PURE__ */ new Set();
	let t = new Set(Ul);
	return new Set(e.split(",").map((e) => e.trim()).filter((e) => t.has(e)));
}
function Kl(e, t) {
	return {
		id: e.id,
		name: e.name ?? "",
		status: e.status || "draft",
		updatedAt: e.updatedAt ?? "",
		version: e.version,
		publishedVersion: e.publishedVersion,
		nodeCount: (e.nodes ?? []).length,
		triggerBinding: e.triggerBinding,
		createdAt: e.createdAt ?? "",
		icon: e.icon ?? t ?? "🔀",
		tags: e.tags ?? []
	};
}
function ql(e) {
	let t = e?.event;
	return !t || t === "manual" ? "manual" : t === "schedule" ? "schedule" : t === "webhook" ? "webhook" : "document";
}
function Jl(e) {
	return e.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "pipeline";
}
function Yl() {
	let e = /* @__PURE__ */ new Date();
	return `${e.getFullYear()}-${String(e.getMonth() + 1).padStart(2, "0")}-${String(e.getDate()).padStart(2, "0")}`;
}
function Xl({ open: e, onClose: t, onCreate: r }) {
	let [i, a] = V(""), o = B(null);
	R(() => {
		e && (a(""), setTimeout(() => o.current?.focus(), 50));
	}, [e]);
	let s = i.trim().length > 0, c = () => {
		s && r(i.trim());
	};
	return /* @__PURE__ */ W(C, {
		open: e,
		onClose: t,
		title: "Create new pipeline",
		maxWidth: 440,
		footer: /* @__PURE__ */ W(H, { children: [/* @__PURE__ */ U("button", {
			"data-testid": "new-pipeline-cancel",
			className: "px-3 py-1.5 text-[13px] bg-transparent border-none text-text-secondary cursor-pointer",
			onClick: t,
			children: "Cancel"
		}), /* @__PURE__ */ U("button", {
			"data-testid": "new-pipeline-confirm",
			className: n("px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-white border-none rounded-md cursor-pointer", !s && "opacity-50 cursor-not-allowed"),
			disabled: !s,
			onClick: c,
			children: "Create pipeline"
		})] }),
		children: [/* @__PURE__ */ U("label", {
			className: "block text-[13px] font-semibold text-text-secondary mb-1.5",
			children: "Name"
		}), /* @__PURE__ */ U(k, {
			ref: o,
			"data-testid": "new-pipeline-name",
			value: i,
			onChange: (e) => a(e.target.value),
			onKeyDown: (e) => {
				e.key === "Enter" && c();
			},
			placeholder: "e.g. Invoice summarizer",
			"aria-label": "New pipeline name",
			className: "w-full"
		})]
	});
}
function Zl() {
	let t = ft(), { userId: i } = e(), { toast: a } = r(), { triggerRun: o, isTriggering: s } = ve(), [c, l] = mt(), [u, d] = V([]), [f, p] = V(""), [m, h] = V("all"), [g, _] = V("updated"), v = z(() => Gl(c.get("status")), [c]), y = z(() => v ?? new Set(Wl), [v]), b = v != null, x = (e) => {
		let t = new URLSearchParams(c);
		if (e.size === 0) t.set("status", "");
		else {
			let n = Ul.filter((t) => e.has(t)).join(",");
			t.set("status", n);
		}
		l(t, { replace: !0 });
	}, S = (e) => {
		let t = b ? new Set(y) : new Set(Wl);
		t.has(e) ? t.delete(e) : t.add(e), x(t);
	}, [w, E] = V(!1), [D, ee] = V(!1), [O, te] = V(null), [k, A] = V(!1), [ne, j] = V(!1), [M, N] = V(!1), re = L(async () => {
		let e = await nt(), t = [];
		for (let n of e) {
			let e = await ce(n.id);
			e && t.push(Kl(e, n.icon));
		}
		d(t);
	}, []);
	R(() => {
		re();
	}, [re]);
	let ie = z(() => {
		let e = f.trim().toLowerCase(), t = [...u.filter((t) => {
			if (e) {
				let n = t.name.toLowerCase().includes(e), r = t.tags.some((t) => t.toLowerCase().includes(e));
				if (!n && !r) return !1;
			}
			return !(!(b && y.size === 0) && !y.has(t.status) || m !== "all" && ql(t.triggerBinding) !== m);
		})];
		return g === "name" ? t.sort((e, t) => e.name.localeCompare(t.name)) : g === "created" ? t.sort((e, t) => t.createdAt.localeCompare(e.createdAt)) : t.sort((e, t) => t.updatedAt.localeCompare(e.updatedAt)), t;
	}, [
		u,
		f,
		y,
		b,
		m,
		g
	]), { selectionMode: P, selected: F, allVisibleSelected: ae, someVisibleSelected: oe, selectAllRef: se, handleToggleSelectMode: I, handleToggleSelect: le, handleSelectAllFiltered: ue, handleHeaderToggleAll: de, clearSelection: me, setSelectionMode: he } = hl({
		visibleRows: ie,
		filteredIds: z(() => ie.map((e) => e.id), [ie])
	}), ye = B(/* @__PURE__ */ new Set());
	R(() => {
		let e = ye.current;
		return () => {
			e.forEach((e) => window.clearTimeout(e)), e.clear();
		};
	}, []);
	let be = z(() => {
		let e = /* @__PURE__ */ new Set();
		for (let t of u) if (F.has(t.id)) for (let n of t.tags) e.add(n);
		return Array.from(e).sort((e, t) => e.localeCompare(t));
	}, [u, F]), xe = async (e) => {
		let n;
		try {
			n = await _e({
				name: e,
				createdBy: i
			});
		} catch {
			a("Could not create the pipeline — the server rejected the request", { type: "error" });
			return;
		}
		E(!1), t(`/pipelines/${n.id}`);
	}, Ce = () => {
		let e = Te(i);
		pe(e).then(() => re()), t(`/pipelines/${e.id}`);
	}, we = (e) => {
		let n = e.build(i);
		pe(n), ee(!1), t(`/pipelines/${n.id}`);
	}, De = (e) => t(`/pipelines/${e}`), Oe = async (e) => {
		if (e.status !== "published") {
			a("Run requires published state", { type: "warning" });
			return;
		}
		if (!s) try {
			await o(e.id, {}) ? a(`Run started for "${e.name}"`, { type: "success" }) : a("Could not start run", { type: "error" });
		} catch (e) {
			a(`Run failed: ${e.message}`, { type: "error" });
		} finally {
			t(`/pipelines/${e.id}`);
		}
	}, ke = (e) => {
		let t = fe(e);
		t && (pe(t).then(() => re()), a(`Duplicated as "${t.name}"`, { type: "success" }));
	}, Ae = (e) => {
		let t = ge(e.id);
		if (!t) {
			a("Export failed", { type: "error" });
			return;
		}
		Ki(`${Jl(e.name)}.pipeline.json`, t);
	}, je = async () => {
		if (O) {
			try {
				await Se(O);
			} catch {
				te(null), re(), a("Could not delete the pipeline — it is still on the server", { type: "error" });
				return;
			}
			te(null), re(), a("Pipeline deleted", { type: "success" });
		}
	}, Me = O ? u.find((e) => e.id === O) : null, Ne = () => {
		let e = Array.from(F);
		e.length !== 0 && (e.forEach((e, t) => {
			let n = window.setTimeout(() => {
				ye.current.delete(n);
				let t = u.find((t) => t.id === e), r = ge(e);
				!t || !r || Ki(`${Jl(t.name)}-${Yl()}.pipeline.json`, r);
			}, t * 100);
			ye.current.add(n);
		}), a(`Exported ${e.length} pipeline${e.length === 1 ? "" : "s"}`, { type: "success" }));
	}, Pe = async (e) => {
		let t = Array.from(F);
		for (let n of t) {
			let t = await ce(n);
			if (!t) continue;
			let r = t.tags ?? [];
			r.includes(e) || (t.tags = [...r, e], await pe(t));
		}
		j(!1), re(), a(`Added tag "${e}" to ${t.length} pipeline${t.length === 1 ? "" : "s"}`, { type: "success" });
	}, Fe = async (e) => {
		let t = Array.from(F);
		for (let n of t) {
			let t = await ce(n);
			if (!t) continue;
			let r = t.tags ?? [];
			r.includes(e) && (t.tags = r.filter((t) => t !== e), await pe(t));
		}
		re(), a(`Removed tag "${e}" from ${t.length} pipeline${t.length === 1 ? "" : "s"}`, { type: "success" });
	}, Ie = async () => {
		let e = Array.from(F), t = 0, n = 0;
		for (let r of e) try {
			await Se(r), t += 1;
		} catch {
			n += 1;
		}
		if (A(!1), me(), re(), n > 0) {
			a(`Deleted ${t} of ${e.length} pipeline${e.length === 1 ? "" : "s"} — ${n} still on the server`, { type: "error" });
			return;
		}
		a(`Deleted ${e.length} pipeline${e.length === 1 ? "" : "s"}`, { type: "success" });
	}, Le = async () => {
		let e = Array.from(F);
		if (e.length === 0) return;
		let t = 0, n = 0, r = 0;
		for (let i of e) {
			let e = await ce(i);
			if (e) {
				if (e.status === "published") {
					n += 1;
					continue;
				}
				try {
					await Ee(i) ? t += 1 : r += 1;
				} catch {
					r += 1;
				}
			}
		}
		re(), r > 0 ? a(`Published ${t}; ${r} failed${n > 0 ? `; skipped ${n} already published` : ""}`, { type: "error" }) : a(n > 0 ? `Published ${t}; skipped ${n} already published` : `Published ${t} pipeline${t === 1 ? "" : "s"}`, { type: "success" });
	}, Re = async () => {
		let e = Array.from(F);
		if (e.length === 0) return;
		let t = 0, n = 0;
		for (let r of e) {
			let e = await ce(r);
			e && (e.status === "archived" ? (e.status = "draft", n += 1) : (e.status = "archived", t += 1), await pe(e));
		}
		re();
		let r = [];
		t > 0 && r.push(`Archived ${t}`), n > 0 && r.push(`Unarchived ${n}`), a(r.join(" · ") || "No pipelines changed", { type: "success" });
	}, ze = async () => {
		let e = Array.from(F);
		if (e.length === 0) return;
		let t = [];
		for (let n of e) {
			let e = await ce(n);
			e && t.push(e);
		}
		if (t.length === 0) {
			a("Export failed", { type: "error" });
			return;
		}
		Ki(`pipelines-${(/* @__PURE__ */ new Date()).toISOString().replace(/[:.]/g, "-")}.json`, JSON.stringify(t, null, 2)), a(`Exported ${t.length} pipeline${t.length === 1 ? "" : "s"}`, { type: "success" });
	};
	R(() => {
		let e = (e) => {
			let t = e.target;
			if (t) {
				let e = t.tagName;
				if (e === "INPUT" || e === "TEXTAREA" || e === "SELECT" || t.isContentEditable) return;
			}
			if (e.key === "Escape") {
				(F.size > 0 || P || ne || M) && (j(!1), N(!1), me(), he(!1));
				return;
			}
			if ((e.metaKey || e.ctrlKey) && (e.key === "a" || e.key === "A")) {
				P && (e.preventDefault(), ue());
				return;
			}
			(e.key === "Delete" || e.key === "Backspace") && F.size > 0 && !k && !O && !w && !D && (e.preventDefault(), A(!0));
		};
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, [
		F,
		P,
		ne,
		M,
		k,
		O,
		w,
		D,
		me,
		ue,
		he
	]);
	let Be = u.length > 0, Ve = F.size > 0;
	return /* @__PURE__ */ W("div", {
		"data-testid": "pipelines-page",
		className: "flex flex-col h-full overflow-hidden bg-surface-inset font-inherit",
		children: [
			/* @__PURE__ */ W("div", {
				className: n("h-14 shrink-0 flex items-center justify-between px-6", "border-b border-border bg-surface", "sticky top-0 z-[2]"),
				children: [/* @__PURE__ */ U("div", {
					className: "text-lg font-bold text-text-primary",
					children: "Pipelines"
				}), /* @__PURE__ */ W("div", {
					className: "flex items-center gap-2",
					children: [
						/* @__PURE__ */ U("button", {
							"data-testid": "metrics-btn",
							onClick: () => t("/pipelines/metrics"),
							className: n("px-4 py-[7px] text-[13px] font-semibold", "bg-surface text-text-secondary", "border border-border-field rounded-[7px]", "cursor-pointer font-inherit"),
							children: "Metrics"
						}),
						/* @__PURE__ */ U("button", {
							"data-testid": "templates-btn",
							onClick: () => ee(!0),
							className: n("px-4 py-[7px] text-[13px] font-semibold", "bg-surface text-text-secondary", "border border-border-field rounded-[7px]", "cursor-pointer font-inherit"),
							children: "Templates"
						}),
						/* @__PURE__ */ U("button", {
							"data-testid": "new-pipeline-btn",
							onClick: () => E(!0),
							className: n("px-4 py-[7px] text-[13px] font-semibold", "bg-primary text-white border-none rounded-md", "cursor-pointer font-inherit"),
							children: "+ New Pipeline"
						})
					]
				})]
			}),
			Be && /* @__PURE__ */ U(fl, {
				search: f,
				onSearchChange: p,
				statusFilter: y,
				statusExplicit: b,
				onToggleStatusKey: S,
				triggerFilter: m,
				onTriggerFilterChange: h,
				sortKey: g,
				onSortKeyChange: _,
				allVisibleSelected: ae,
				someVisibleSelected: oe,
				onHeaderToggleAll: de
			}),
			Ve && /* @__PURE__ */ U(ml, {
				count: F.size,
				onClear: me,
				onExport: Ne,
				onExportAsJSON: ze,
				onPublish: Le,
				onArchive: Re,
				onAddTag: () => {
					j((e) => !e), N(!1);
				},
				onRemoveTag: () => {
					N((e) => !e), j(!1);
				},
				onDelete: () => A(!0),
				onDeleteWithConfirm: () => A(!0),
				addTagOpen: ne,
				removeTagOpen: M,
				onSubmitAddTag: Pe,
				onSubmitRemoveTag: Fe,
				onCloseAddTag: () => j(!1),
				onCloseRemoveTag: () => N(!1),
				unionTags: be
			}),
			/* @__PURE__ */ U("div", {
				className: n("flex-1 overflow-y-auto overflow-x-hidden min-w-0", Be ? "p-6" : "p-0"),
				children: Be ? ie.length === 0 ? /* @__PURE__ */ U("div", {
					"data-testid": "filtered-empty",
					className: "text-center p-12 text-[13px] text-text-tertiary",
					children: "No pipelines match the current filters."
				}) : /* @__PURE__ */ U("div", {
					"data-testid": "pipeline-grid",
					className: "grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-[50px]",
					children: ie.map((e) => /* @__PURE__ */ U(ll, {
						row: e,
						onOpen: () => De(e.id),
						onRun: () => {
							Oe(e);
						},
						onDuplicate: () => ke(e.id),
						onExport: () => Ae(e),
						onDelete: () => te(e.id),
						selectionMode: P,
						selected: F.has(e.id),
						anySelected: Ve,
						onToggleSelect: (t) => le(e.id, t)
					}, e.id))
				}) : /* @__PURE__ */ W("div", {
					className: "flex flex-col h-full",
					children: [/* @__PURE__ */ U("div", {
						className: "flex-1 min-h-0",
						children: /* @__PURE__ */ U(T, {
							icon: "🔀",
							title: "No pipelines yet",
							body: "Design your first one — from scratch or pick a template later.",
							actionLabel: "+ New Pipeline",
							onAction: () => E(!0)
						})
					}), /* @__PURE__ */ W("div", {
						className: "flex justify-center items-center gap-2.5 text-[13px] text-text-tertiary px-6 pb-8",
						children: [
							/* @__PURE__ */ U("button", {
								"data-testid": "empty-state-demo",
								onClick: Ce,
								className: "bg-transparent border-none p-1 px-2 text-[13px] text-primary cursor-pointer underline font-inherit",
								children: "or try the demo pipeline"
							}),
							/* @__PURE__ */ U("span", {
								"aria-hidden": !0,
								children: "·"
							}),
							/* @__PURE__ */ U("button", {
								"data-testid": "empty-state-templates",
								onClick: () => ee(!0),
								className: "bg-transparent border-none p-1 px-2 text-[13px] text-primary cursor-pointer underline font-inherit",
								children: "or browse templates"
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ U(Xl, {
				open: w,
				onClose: () => E(!1),
				onCreate: xe
			}),
			/* @__PURE__ */ U(Hl, {
				open: D,
				onClose: () => ee(!1),
				onSelect: we
			}),
			/* @__PURE__ */ U(C, {
				open: !!O,
				onClose: () => te(null),
				title: "Delete pipeline?",
				maxWidth: 400,
				footer: /* @__PURE__ */ W(H, { children: [/* @__PURE__ */ U("button", {
					"data-testid": "delete-pipeline-cancel",
					className: "px-3 py-1.5 text-[13px] bg-transparent border-none text-text-secondary cursor-pointer",
					onClick: () => te(null),
					children: "Cancel"
				}), /* @__PURE__ */ U("button", {
					"data-testid": "delete-pipeline-confirm",
					onClick: je,
					className: n("px-[18px] py-[7px] text-[13px] font-semibold", "bg-danger text-white border-none rounded-[7px]", "cursor-pointer font-inherit"),
					children: "Delete"
				})] }),
				children: Me && /* @__PURE__ */ W("p", {
					className: "m-0",
					children: [/* @__PURE__ */ W("strong", { children: [
						"“",
						Me.name,
						"”"
					] }), " will be permanently removed. Run history will also be lost."]
				})
			}),
			/* @__PURE__ */ U(C, {
				open: k,
				onClose: () => A(!1),
				title: `Delete ${F.size} pipeline${F.size === 1 ? "" : "s"}?`,
				maxWidth: 420,
				backdropTestId: "bulk-delete-modal",
				footer: /* @__PURE__ */ W(H, { children: [/* @__PURE__ */ U("button", {
					"data-testid": "bulk-delete-cancel",
					className: "px-3 py-1.5 text-[13px] bg-transparent border-none text-text-secondary cursor-pointer",
					onClick: () => A(!1),
					children: "Cancel"
				}), /* @__PURE__ */ W("button", {
					"data-testid": "bulk-delete-confirm",
					onClick: Ie,
					className: n("px-[18px] py-[7px] text-[13px] font-semibold", "bg-danger text-white border-none rounded-[7px]", "cursor-pointer font-inherit"),
					children: ["Delete ", F.size]
				})] }),
				children: /* @__PURE__ */ W("p", {
					className: "m-0",
					children: [
						/* @__PURE__ */ W("strong", { children: [
							F.size,
							" pipeline",
							F.size === 1 ? "" : "s"
						] }),
						" ",
						"will be permanently removed. Run history will also be lost."
					]
				})
			})
		]
	});
}
//#endregion
//#region src/components/pipelines/cost/llmPricing.ts
var Ql = {
	"claude-opus-4-7": {
		inputPerMillion: 15,
		outputPerMillion: 75
	},
	"claude-sonnet-4-6": {
		inputPerMillion: 3,
		outputPerMillion: 15
	},
	"claude-haiku-4-5-20251001": {
		inputPerMillion: .8,
		outputPerMillion: 4
	},
	"us.anthropic.claude-opus-4-7": {
		inputPerMillion: 15,
		outputPerMillion: 75
	},
	"us.anthropic.claude-sonnet-4-6": {
		inputPerMillion: 3,
		outputPerMillion: 15
	},
	"mock-model": {
		inputPerMillion: 1,
		outputPerMillion: 5
	}
};
function $l(e, t, n) {
	let r = Ql[e], i = Math.max(0, t | 0), a = Math.max(0, n | 0);
	if (!r) return {
		inputTokens: i,
		outputTokens: a,
		inputCostUsd: 0,
		outputCostUsd: 0,
		totalCostUsd: 0,
		model: e,
		modelFound: !1
	};
	let o = i / 1e6 * r.inputPerMillion, s = a / 1e6 * r.outputPerMillion;
	return {
		inputTokens: i,
		outputTokens: a,
		inputCostUsd: o,
		outputCostUsd: s,
		totalCostUsd: o + s,
		model: e,
		modelFound: !0
	};
}
function eu(e) {
	let t = {}, n = 0, r = 0, i = 0, a = 0, o = !1;
	for (let s of e) {
		if (!s.model) continue;
		let e = s.tokensIn ?? 0, c = s.tokensOut ?? 0, l = $l(s.model, e, c), u = t[s.model];
		u ? t[s.model] = {
			inputTokens: u.inputTokens + l.inputTokens,
			outputTokens: u.outputTokens + l.outputTokens,
			inputCostUsd: u.inputCostUsd + l.inputCostUsd,
			outputCostUsd: u.outputCostUsd + l.outputCostUsd,
			totalCostUsd: u.totalCostUsd + l.totalCostUsd,
			model: s.model,
			modelFound: u.modelFound || l.modelFound
		} : t[s.model] = l, n += l.inputTokens, r += l.outputTokens, i += l.inputCostUsd, a += l.outputCostUsd, l.modelFound && (o = !0);
	}
	return {
		total: {
			inputTokens: n,
			outputTokens: r,
			inputCostUsd: i,
			outputCostUsd: a,
			totalCostUsd: i + a,
			model: "aggregate",
			modelFound: o
		},
		perModel: t
	};
}
function tu(e) {
	return !e || !e.modelFound && e.totalCostUsd === 0 ? "—" : e.totalCostUsd >= .01 ? `$${e.totalCostUsd.toFixed(2)}` : e.totalCostUsd === 0 ? "$0.00" : `$${e.totalCostUsd.toFixed(4)}`;
}
function nu(e) {
	let t = e.data.label;
	if (typeof t == "string" && t.trim()) return t.trim();
	switch (e.data.type) {
		case "llm": return e.data.model || "llm";
		case "trigger": return e.data.triggerType || "trigger";
		case "action": return e.data.actionType || "action";
		case "transform": return e.data.transformType || "transform";
		case "join": return e.data.mode ? `join:${e.data.mode}` : "join";
		default: return e.type;
	}
}
function ru(e, t) {
	let n = 0;
	if (e.llm) {
		let r = t.get(e.nodeId);
		r && (n += $l(r, e.llm.tokensIn, e.llm.tokensOut).totalCostUsd);
	}
	let r = e.costUsd;
	return typeof r == "number" && Number.isFinite(r) && r > 0 && (n += r), n;
}
function iu(e, t) {
	if (!t) return [];
	let n = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
	for (let e of t.nodes) e.data.type === "llm" && n.set(e.id, e.data.model), r.set(e.id, nu(e)), i.set(e.id, e.data.type);
	let a = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map();
	for (let e of t.nodes) a.set(e.id, 0), o.set(e.id, 0);
	for (let t of e) for (let e of Object.values(t.steps ?? {})) {
		if (!r.has(e.nodeId)) continue;
		let t = ru(e, n);
		a.set(e.nodeId, (a.get(e.nodeId) ?? 0) + t), o.set(e.nodeId, (o.get(e.nodeId) ?? 0) + 1);
	}
	let s = t.nodes.map((e) => ({
		nodeId: e.id,
		label: r.get(e.id) ?? e.id,
		type: i.get(e.id) ?? e.type,
		totalCostUsd: a.get(e.id) ?? 0,
		stepCount: o.get(e.id) ?? 0
	}));
	return s.sort((e, t) => t.totalCostUsd - e.totalCostUsd), s;
}
function au(e) {
	return e.slice(0, 10);
}
function ou(e) {
	return Date.UTC(Number(e.slice(0, 4)), Number(e.slice(5, 7)) - 1, Number(e.slice(8, 10)));
}
function su(e, t, n = 30, r = /* @__PURE__ */ new Date()) {
	let i = /* @__PURE__ */ new Map();
	if (t) for (let e of t.nodes) e.data.type === "llm" && i.set(e.id, e.data.model);
	let a = Date.UTC(r.getUTCFullYear(), r.getUTCMonth(), r.getUTCDate()), o = a - (n - 1) * 864e5, s = /* @__PURE__ */ new Map(), c = /* @__PURE__ */ new Map();
	for (let e = o; e <= a; e += 864e5) {
		let t = new Date(e).toISOString().slice(0, 10);
		s.set(t, 0), c.set(t, 0);
	}
	for (let t of e) {
		let e = au(t.startedAt);
		if (!s.has(e)) continue;
		let n = 0;
		for (let e of Object.values(t.steps ?? {})) n += ru(e, i);
		s.set(e, (s.get(e) ?? 0) + n), c.set(e, (c.get(e) ?? 0) + 1);
	}
	let l = [];
	for (let e = o; e <= a; e += 864e5) {
		let t = new Date(e).toISOString().slice(0, 10);
		l.push({
			date: t,
			ts: ou(t),
			totalCostUsd: s.get(t) ?? 0,
			runCount: c.get(t) ?? 0
		});
	}
	return l;
}
//#endregion
//#region src/components/pipelines/runsUtils.ts
var cu = [
	"pending",
	"running",
	"stuck",
	"completed",
	"rejected",
	"failed",
	"cancelled"
], lu = [
	"manual",
	"scheduled",
	"webhook",
	"document"
], uu = [
	"24h",
	"7d",
	"30d",
	"all"
], du = {
	"24h": 864e5,
	"7d": 6048e5,
	"30d": 2592e6
};
function fu(e) {
	return e.startsWith("document.") || e === "document" ? "document" : e === "schedule" || e === "scheduled" ? "scheduled" : e === "webhook" ? "webhook" : "manual";
}
function pu(e) {
	let t = 0;
	for (let n of Object.values(e.steps ?? {})) {
		let e = n.attempts?.length ?? 0;
		e > 1 && (t += e - 1);
	}
	return t;
}
function mu(e, t) {
	let n = t.now ?? Date.now(), r = t.range === "all" ? null : n - du[t.range], i = t.query.trim().toLowerCase();
	return e.filter((e) => {
		if (t.statuses.size > 0 && !t.statuses.has(e.status)) return !1;
		if (t.triggerKinds.size > 0) {
			if (!e.triggeredBy) return !1;
			let n = fu(e.triggeredBy.triggerType);
			if (!t.triggerKinds.has(n)) return !1;
		}
		if (r != null) {
			let t = new Date(e.startedAt).getTime();
			if (Number.isFinite(t) && t < r) return !1;
		}
		if (i.length > 0) {
			let t = String(e.id ?? "").toLowerCase().includes(i), n = String(e.pipelineId ?? "").toLowerCase().includes(i);
			if (!t && !n) return !1;
		}
		return !0;
	});
}
function hu(e, t) {
	if (!e) return /* @__PURE__ */ new Set();
	let n = new Set(t);
	return new Set(e.split(",").map((e) => e.trim()).filter((e) => n.has(e)));
}
function gu(e) {
	let t = e.get("range") ?? "7d", n = uu.includes(t) ? t : "7d";
	return {
		query: e.get("q") ?? "",
		statuses: hu(e.get("status"), cu),
		triggerKinds: hu(e.get("trigger"), lu),
		range: n
	};
}
//#endregion
//#region src/components/pipelines/RunsFilterBar.tsx
var _u = {
	pending: "Pending",
	running: "Running",
	stuck: "Stuck",
	completed: "Completed",
	rejected: "Rejected",
	failed: "Failed",
	cancelled: "Cancelled"
}, vu = {
	manual: "Manual",
	scheduled: "Scheduled",
	webhook: "Webhook",
	document: "Document"
}, yu = {
	"24h": "Last 24h",
	"7d": "Last 7d",
	"30d": "Last 30d",
	all: "All time"
};
function bu({ label: e, options: t, selected: r, onToggle: i, labels: a, testIdPrefix: o }) {
	let [s, c] = V(!1), l = B(null);
	Xn(l, () => c(!1), s), E(s, L(() => c(!1), []));
	let u = r.size === 0 ? "All" : r.size <= 2 ? Array.from(r).map((e) => a[e]).join(", ") : `${r.size} selected`;
	return /* @__PURE__ */ W("div", {
		ref: l,
		className: "relative",
		children: [/* @__PURE__ */ W("button", {
			type: "button",
			onClick: () => c(!s),
			"data-testid": `${o}-dropdown`,
			"aria-haspopup": "true",
			"aria-expanded": s,
			className: n("flex items-center gap-1.5 px-2.5 py-[5px] text-xs font-medium rounded cursor-pointer font-[inherit] whitespace-nowrap bg-surface text-text-secondary border", r.size > 0 ? "border-primary" : "border-border"),
			children: [
				/* @__PURE__ */ U("span", {
					className: "text-text-tertiary font-semibold text-[11px]",
					children: e
				}),
				/* @__PURE__ */ U("span", {
					className: n(r.size > 0 ? "text-primary font-semibold" : "text-text-secondary font-medium"),
					children: u
				}),
				/* @__PURE__ */ U("span", {
					className: "text-[9px] ml-0.5 opacity-60",
					children: "▾"
				})
			]
		}), s && /* @__PURE__ */ U("div", {
			className: "absolute top-full left-0 mt-1 bg-surface border border-border rounded-md shadow-[0_4px_12px_rgba(0,0,0,0.1)] z-50 min-w-[160px] py-1",
			children: t.map((e) => /* @__PURE__ */ W("label", {
				"data-testid": `${o}-${e}`,
				className: "flex items-center gap-2 px-3 py-1.5 text-xs cursor-pointer text-text-primary hover:bg-surface-hover",
				children: [/* @__PURE__ */ U(re, {
					checked: r.has(e),
					onChange: () => i(e),
					className: "m-0",
					"aria-label": a[e]
				}), a[e]]
			}, e))
		})]
	});
}
function xu({ query: e, statuses: t, triggerKinds: r, range: i, onQueryChange: a, onStatusToggle: o, onTriggerToggle: s, onRangeChange: c, onClearFilters: l }) {
	let u = t.size > 0 || r.size > 0 || e.length > 0;
	return /* @__PURE__ */ W("div", {
		className: "flex items-center gap-2 px-3 py-2 bg-surface-inset border border-border rounded-md",
		children: [
			/* @__PURE__ */ U(k, {
				id: "runs-search",
				type: "search",
				size: "sm",
				"data-testid": "runs-search-input",
				placeholder: "Search…",
				value: e,
				onChange: (e) => a(e.target.value),
				className: "flex-[1_1_180px] max-w-60",
				"aria-label": "Search runs by run id or pipeline id"
			}),
			/* @__PURE__ */ U("div", { className: "w-px h-5 bg-border shrink-0" }),
			/* @__PURE__ */ U("div", {
				role: "radiogroup",
				"aria-label": "Date range",
				onKeyDown: (e) => rt(e, { itemSelector: "[role=\"radio\"]" }),
				className: "flex gap-0.5",
				children: uu.map((e) => /* @__PURE__ */ U("button", {
					type: "button",
					role: "radio",
					"aria-checked": i === e,
					tabIndex: i === e ? 0 : -1,
					"data-testid": `runs-range-${e}`,
					onClick: () => c(e),
					className: n("px-2 py-1 text-[11px] border-none rounded-[3px] cursor-pointer font-[inherit]", i === e ? "font-semibold bg-primary text-white" : "font-medium bg-transparent text-text-secondary"),
					children: yu[e]
				}, e))
			}),
			/* @__PURE__ */ U("div", { className: "w-px h-5 bg-border shrink-0" }),
			/* @__PURE__ */ U(bu, {
				label: "Status",
				options: cu,
				selected: t,
				onToggle: o,
				labels: _u,
				testIdPrefix: "runs-status-chip"
			}),
			/* @__PURE__ */ U(bu, {
				label: "Trigger",
				options: lu,
				selected: r,
				onToggle: s,
				labels: vu,
				testIdPrefix: "runs-trigger-chip"
			}),
			u && /* @__PURE__ */ U("button", {
				type: "button",
				onClick: l,
				className: "px-2 py-[3px] text-[11px] bg-none border-none text-text-tertiary cursor-pointer font-[inherit] underline",
				children: "Clear filters"
			})
		]
	});
}
//#endregion
//#region src/components/pipelines/RunsBulkActionBar.tsx
function Su({ selectionCount: e, onExport: t, onDelete: n, onClear: r }) {
	return /* @__PURE__ */ W("div", {
		"data-testid": "runs-bulk-toolbar",
		className: "flex items-center gap-2 px-3 py-2 bg-surface-inset border border-border rounded-md",
		children: [
			/* @__PURE__ */ W("span", {
				className: "text-xs text-text-secondary",
				children: [e, " selected"]
			}),
			/* @__PURE__ */ U("button", {
				type: "button",
				"data-testid": "runs-bulk-export",
				onClick: t,
				className: "px-2.5 py-1 text-xs font-medium border border-border bg-surface text-text-secondary rounded cursor-pointer font-[inherit]",
				children: "Export JSON"
			}),
			/* @__PURE__ */ U("button", {
				type: "button",
				"data-testid": "runs-bulk-delete",
				onClick: n,
				className: "px-2.5 py-1 text-xs font-medium border border-danger bg-surface text-danger-fg rounded cursor-pointer font-[inherit]",
				children: "Delete"
			}),
			/* @__PURE__ */ U("button", {
				type: "button",
				"data-testid": "runs-bulk-clear",
				onClick: r,
				className: "px-2.5 py-1 text-xs bg-none border-none text-text-secondary cursor-pointer font-[inherit] ml-auto",
				children: "Clear selection"
			})
		]
	});
}
//#endregion
//#region src/components/pipelines/utils/statusColors.ts
function Cu(e) {
	switch (e) {
		case "completed": return {
			label: "Completed",
			tone: "success"
		};
		case "rejected": return {
			label: "Rejected",
			tone: "danger"
		};
		case "failed": return {
			label: "Failed",
			tone: "danger"
		};
		case "cancelled": return {
			label: "Cancelled",
			tone: "neutral"
		};
		case "awaiting_approval": return {
			label: "Awaiting approval",
			tone: "warning"
		};
		case "running": return {
			label: "Running",
			tone: "info"
		};
		case "pending": return {
			label: "Pending",
			tone: "neutral"
		};
		case "paused_at_breakpoint": return {
			label: "Paused",
			tone: "warning"
		};
		case "stuck": return {
			label: "Stuck",
			tone: "warning"
		};
		default: return {
			label: e,
			tone: "neutral"
		};
	}
}
function wu(e) {
	switch (e) {
		case "LLMError": return "danger";
		case "TimeoutError": return "caution";
		case "NetworkError": return "warning";
		case "ValidationError": return "warning";
		case "RegistryConflict": return "purple";
		case "UnknownError": return "neutral";
		default: return "neutral";
	}
}
//#endregion
//#region src/components/pipelines/RunsTable.tsx
var Tu = {
	LLMError: "LLM",
	TimeoutError: "Timeout",
	NetworkError: "Network",
	ValidationError: "Validation",
	RegistryConflict: "Conflict",
	UnknownError: "Unknown"
};
function Eu(e) {
	let t = Date.now() - new Date(e).getTime();
	return t < 6e4 ? "just now" : t < 36e5 ? `${Math.floor(t / 6e4)}m ago` : t < 864e5 ? `${Math.floor(t / 36e5)}h ago` : t < 2592e5 ? `${Math.floor(t / 864e5)}d ago` : new Date(e).toLocaleDateString();
}
function Du({ filtered: e, selected: t, onSelectionChange: r, comparePair: i, onToggleComparePair: a, costByRunId: o, pipelineId: s, onNavigate: c, onOpenRetryModal: l }) {
	let u = B(!1), d = B(null), f = e.length > 0 && e.every((e) => t.has(e.id)), p = !f && e.some((e) => t.has(e.id)), m = () => {
		let n = new Set(t);
		if (f) for (let t of e) n.delete(t.id);
		else for (let t of e) n.add(t.id);
		r(n);
	}, h = (n, i, a) => {
		let o = new Set(t), s = !o.has(n);
		if (a && d.current != null) {
			let t = Math.min(d.current, i), n = Math.max(d.current, i);
			for (let r = t; r <= n; r++) {
				let t = e[r];
				t && (s ? o.add(t.id) : o.delete(t.id));
			}
		} else s ? o.add(n) : o.delete(n);
		d.current = i, r(o);
	};
	return /* @__PURE__ */ W("table", {
		className: "w-full border-collapse text-[13px] bg-surface border border-border rounded-lg overflow-hidden",
		children: [/* @__PURE__ */ U("thead", { children: /* @__PURE__ */ W("tr", {
			className: "bg-surface-inset text-left",
			children: [/* @__PURE__ */ U("th", {
				scope: "col",
				className: "px-3 py-2 w-6 border-b border-border",
				children: /* @__PURE__ */ U(re, {
					"data-testid": "runs-select-all",
					"aria-label": "Select all visible runs",
					checked: f,
					indeterminate: p,
					onChange: m
				})
			}), [
				"Started",
				"Status",
				"Duration",
				"Retries",
				"Cost",
				"Triggered by",
				"Run ID",
				""
			].map((e, t) => /* @__PURE__ */ U("th", {
				scope: "col",
				className: "px-3 py-2 text-[11px] font-semibold text-text-secondary uppercase tracking-[0.04em] border-b border-border",
				children: e
			}, `${e}-${t}`))]
		}) }), /* @__PURE__ */ U("tbody", { children: e.map((e, r) => {
			let { tone: d, label: f } = Cu(e.status), p = e.status === "stuck" || e.status === "running" && !!e.stuckAt, m = t.has(e.id), g = pu(e);
			return /* @__PURE__ */ W("tr", {
				"data-testid": `run-card-${e.id}`,
				className: n("border-b border-border cursor-pointer hover:bg-surface-hover", m && "bg-surface-hover"),
				onClick: () => c(`/pipelines/${s}/runs/${e.id}`),
				children: [
					/* @__PURE__ */ W("td", {
						className: "px-3 py-2.5 text-xs text-text-secondary w-6",
						onClick: (e) => e.stopPropagation(),
						children: [/* @__PURE__ */ U("span", {
							onMouseDown: (e) => {
								u.current = e.shiftKey;
							},
							onKeyDown: (e) => {
								u.current = e.shiftKey;
							},
							children: /* @__PURE__ */ U(re, {
								"data-testid": `run-select-${e.id}`,
								checked: m,
								onChange: () => {
									let t = u.current;
									u.current = !1, h(e.id, r, t);
								},
								"aria-label": `Select run ${e.id.slice(0, 8)}`
							})
						}), /* @__PURE__ */ U("input", {
							type: "checkbox",
							"data-testid": `run-compare-pick-${e.id}`,
							checked: i.includes(e.id),
							onChange: () => a(e.id),
							"aria-label": `Pick run ${e.id.slice(0, 8)} for comparison`,
							className: "absolute w-px h-px opacity-0 pointer-events-none",
							tabIndex: -1
						})]
					}),
					/* @__PURE__ */ U("td", {
						className: "px-3 py-2.5 text-xs text-text-primary",
						children: Eu(e.startedAt)
					}),
					/* @__PURE__ */ W("td", {
						className: "px-3 py-2.5 text-xs text-text-secondary",
						children: [
							/* @__PURE__ */ U(S, {
								tone: d,
								"aria-label": `Status: ${f}`,
								children: f
							}),
							p && e.status !== "stuck" && e.stuckAt && /* @__PURE__ */ U(S, {
								tone: "warning",
								size: "xs",
								"data-testid": `run-stuck-badge-${e.id}`,
								title: `No pipeline events since ${new Date(e.stuckAt).toLocaleTimeString()}`,
								className: "ml-1.5",
								children: "Stuck"
							}),
							e.status === "failed" && e.error?.errorCategory && /* @__PURE__ */ U(S, {
								tone: wu(e.error.errorCategory),
								size: "xs",
								"data-testid": `run-error-category-${e.id}`,
								title: e.error.message,
								className: "ml-1.5",
								children: Tu[e.error.errorCategory] ?? e.error.errorCategory
							})
						]
					}),
					/* @__PURE__ */ U("td", {
						className: "px-3 py-2.5 text-xs text-text-secondary font-mono",
						children: ma(e.durationMs)
					}),
					/* @__PURE__ */ U("td", {
						className: n("px-3 py-2.5 text-xs font-mono", g > 0 ? "text-text-primary" : "text-text-tertiary"),
						"data-testid": `run-retries-${e.id}`,
						title: g > 0 ? `${g} retry attempts across this run` : "No retries — every step succeeded on first attempt",
						children: g > 0 ? `×${g}` : "—"
					}),
					/* @__PURE__ */ U("td", {
						className: "px-3 py-2.5 text-xs text-text-secondary font-mono",
						"data-testid": `run-cost-${e.id}`,
						children: o[e.id] ?? "—"
					}),
					/* @__PURE__ */ U("td", {
						className: "px-3 py-2.5 text-xs text-text-secondary",
						children: e.triggeredBy.userId ?? e.triggeredBy.triggerType
					}),
					/* @__PURE__ */ U("td", {
						className: "px-3 py-2.5 text-[11px] font-mono text-text-tertiary",
						children: e.id.slice(0, 8)
					}),
					/* @__PURE__ */ W("td", {
						className: "px-3 py-2.5 text-xs text-text-secondary text-right",
						onClick: (e) => e.stopPropagation(),
						children: [
							p && /* @__PURE__ */ U("button", {
								type: "button",
								"data-testid": `force-fail-${e.id}`,
								onClick: async (t) => {
									if (t.stopPropagation(), confirm(`Force-fail stuck run ${e.id.slice(0, 8)}? The run will be interrupted and you can retry from the stuck step.`)) try {
										await He(e.pipelineId, e.id);
									} catch (e) {
										alert(`Force-fail failed: ${e instanceof Error ? e.message : String(e)}`);
									}
								},
								title: "Force-fail this stuck run so you can retry from the stuck step",
								className: "text-[11px] px-2 py-1 mr-2 bg-transparent text-warning-fg border border-warning-border rounded cursor-pointer font-[inherit]",
								children: "⚡ Force-fail"
							}),
							e.status === "failed" && e.error?.nodeId && e.error.nodeId !== "unknown" && /* @__PURE__ */ U("button", {
								type: "button",
								"data-testid": `retry-from-failed-step-${e.id}`,
								onClick: (t) => {
									t.stopPropagation(), l(e);
								},
								title: `Retry from "${e.error.nodeId}" with the original upstream context`,
								className: "text-[11px] px-2 py-1 mr-2 bg-transparent text-caution-fg border border-caution-border rounded cursor-pointer font-[inherit]",
								children: "↻ Retry from failed"
							}),
							/* @__PURE__ */ U("button", {
								type: "button",
								"data-testid": `run-view-${e.id}`,
								"aria-label": `View run ${e.id.slice(0, 8)}`,
								onClick: (t) => {
									t.stopPropagation(), c(`/pipelines/${s}/runs/${e.id}`);
								},
								className: "cursor-pointer border-none bg-transparent p-0 text-xs text-primary font-[inherit]",
								children: "View →"
							})
						]
					})
				]
			}, e.id);
		}) })]
	});
}
//#endregion
//#region src/components/pipelines/PipelineRunsPage.tsx
function Ou() {
	let { pipelineId: e } = pt(), t = ft(), [r, i] = mt(), [a, o] = V([]), [s, c] = V(null), [l, u] = V([]), [d, f] = V(() => /* @__PURE__ */ new Set()), [p, m] = V(null), [h, g] = V(!1), [_, v] = V(null), [b, x] = V(!1), S = L((e) => {
		let t = e.error?.nodeId;
		if (!t || t === "unknown") return;
		let n = Object.entries(e.steps).filter(([e, n]) => e !== t && n.status === "completed").map(([e]) => e);
		m({
			run: e,
			nodeId: t,
			skippedNodes: n,
			snapshotInput: !1
		}), v(null);
	}, []), C = L(async () => {
		if (p) {
			v(null), g(!0);
			try {
				let e = await qe(p.run.pipelineId, p.run.id, p.nodeId, void 0, p.snapshotInput || void 0);
				m(null), t(`/pipelines/${p.run.pipelineId}/runs/${e.newRunId}`);
			} catch (e) {
				v(e instanceof Error ? e.message : String(e)), g(!1);
			}
		}
	}, [p, t]), { query: E, statuses: D, triggerKinds: ee, range: O } = z(() => gu(r), [r]), te = (e, t) => {
		let n = new URLSearchParams(r);
		t ? n.set(e, t) : n.delete(e), i(n, { replace: !0 });
	}, k = (e) => {
		let t = new Set(D);
		t.has(e) ? t.delete(e) : t.add(e), te("status", t.size === 0 ? null : Array.from(t).join(","));
	}, A = (e) => {
		let t = new Set(ee);
		t.has(e) ? t.delete(e) : t.add(e), te("trigger", t.size === 0 ? null : Array.from(t).join(","));
	}, ne = (e) => {
		te("range", e === "7d" ? null : e);
	}, j = (e) => {
		te("q", e.length === 0 ? null : e);
	}, M = (e) => {
		u((t) => t.includes(e) ? t.filter((t) => t !== e) : t.length >= 2 ? [t[1], e] : [...t, e]);
	};
	R(() => {
		e && (c(he(e)), o(Xe(e)));
	}, [e]);
	let N = z(() => mu(a, {
		query: E,
		statuses: D,
		triggerKinds: ee,
		range: O
	}), [
		a,
		E,
		D,
		ee,
		O
	]), ie = z(() => {
		let e = /* @__PURE__ */ new Map();
		if (!s) return e;
		for (let t of s.nodes) t.data.type === "llm" && e.set(t.id, t.data.model);
		return e;
	}, [s]), P = z(() => {
		let e = {};
		for (let t of N) {
			let n = Object.values(t.steps).filter((e) => !!e.llm).map((e) => ({
				model: ie.get(e.nodeId),
				tokensIn: e.llm?.tokensIn ?? 0,
				tokensOut: e.llm?.tokensOut ?? 0
			}));
			e[t.id] = tu(eu(n).total);
		}
		return e;
	}, [N, ie]);
	return e ? s ? /* @__PURE__ */ W("div", {
		"data-testid": "pipeline-runs-page",
		className: "p-6 flex flex-col gap-3",
		children: [
			/* @__PURE__ */ U(w, {
				open: p !== null,
				onConfirm: C,
				onCancel: () => {
					h || m(null);
				},
				title: "Retry from failure",
				confirmLabel: h ? "Starting…" : "Confirm retry",
				confirmDisabled: h,
				children: p && /* @__PURE__ */ W("div", {
					className: "flex flex-col gap-2.5",
					children: [
						/* @__PURE__ */ W("div", {
							className: "text-[13px] text-text-secondary",
							children: [
								"Run ",
								/* @__PURE__ */ U("code", {
									className: "bg-surface-inset px-1 py-px rounded-[3px] text-xs",
									children: p.run.id.slice(0, 8)
								}),
								" will restart from step",
								" ",
								/* @__PURE__ */ W("code", {
									className: "bg-surface-inset px-1 py-px rounded-[3px] text-xs",
									children: [p.nodeId.slice(0, 12), p.nodeId.length > 12 ? "…" : ""]
								}),
								" ",
								"using the original upstream context."
							]
						}),
						p.skippedNodes.length > 0 && /* @__PURE__ */ W("div", { children: [/* @__PURE__ */ W("div", {
							className: "text-[11px] font-semibold text-text-tertiary uppercase mb-1.5",
							children: [
								"Steps skipped (",
								p.skippedNodes.length,
								")"
							]
						}), /* @__PURE__ */ U("div", {
							className: "max-h-20 overflow-y-auto flex flex-wrap gap-1",
							children: p.skippedNodes.map((e) => /* @__PURE__ */ U("span", {
								className: "bg-surface-inset border border-border rounded-[3px] px-1.5 py-px text-[11px] font-mono text-text-secondary",
								children: e.slice(0, 10)
							}, e))
						})] }),
						/* @__PURE__ */ W("label", {
							className: "flex items-center gap-2 text-[13px] text-text-secondary cursor-pointer",
							children: [/* @__PURE__ */ U(re, {
								checked: p.snapshotInput,
								onChange: (e) => m((t) => t && {
									...t,
									snapshotInput: e
								})
							}), "Use persisted input snapshot"]
						}),
						_ && /* @__PURE__ */ U("div", {
							role: "alert",
							"data-testid": "retry-modal-error",
							className: "px-3 py-2 bg-danger-bg border border-danger-border rounded-md text-xs text-danger-fg",
							children: _
						})
					]
				})
			}),
			/* @__PURE__ */ U(w, {
				open: b,
				onConfirm: () => {
					if (!e) return;
					x(!1);
					let t = Array.from(d), n = a.filter((e) => !d.has(e.id));
					Fe(e);
					for (let t of [...n].sort((e, t) => e.startedAt.localeCompare(t.startedAt))) oe(e, t);
					o(Xe(e)), f(/* @__PURE__ */ new Set()), u((e) => e.filter((e) => !t.includes(e)));
				},
				onCancel: () => x(!1),
				title: `Delete ${d.size} run${d.size === 1 ? "" : "s"}?`,
				body: "This cannot be undone.",
				confirmLabel: `Delete ${d.size}`,
				tone: "destructive"
			}),
			_ && /* @__PURE__ */ U(y, {
				title: "Retry failed:",
				onDismiss: () => v(null),
				children: _
			}),
			/* @__PURE__ */ W("div", {
				className: "flex items-center gap-3",
				children: [
					/* @__PURE__ */ W("button", {
						type: "button",
						onClick: () => t(`/pipelines/${e}`),
						className: "bg-none border-none text-primary cursor-pointer text-[13px] p-0",
						children: ["← ", s.name]
					}),
					/* @__PURE__ */ U("span", {
						className: "text-text-tertiary",
						children: "/"
					}),
					/* @__PURE__ */ U("span", {
						className: "text-lg font-bold text-text-primary",
						children: "Run history"
					}),
					/* @__PURE__ */ W("span", {
						className: "text-xs text-text-tertiary ml-auto",
						children: [
							a.length,
							" run",
							a.length === 1 ? "" : "s",
							" persisted"
						]
					}),
					/* @__PURE__ */ U("button", {
						type: "button",
						onClick: () => t(`/pipelines/${e}/stats`),
						"data-testid": "runs-stats-link",
						className: "px-2.5 py-1 text-xs font-medium border border-border bg-surface text-text-secondary rounded cursor-pointer font-[inherit]",
						children: "📊 Stats"
					}),
					/* @__PURE__ */ W("button", {
						type: "button",
						disabled: l.length !== 2,
						onClick: () => {
							if (l.length !== 2) return;
							let [n, r] = l;
							t(`/pipelines/${e}/runs/compare/${n}/${r}`);
						},
						"data-testid": "run-compare-btn",
						className: n("px-2.5 py-1 text-xs font-medium rounded font-[inherit]", l.length === 2 ? "border border-primary bg-primary text-white cursor-pointer opacity-100" : "border border-border bg-surface text-text-secondary cursor-not-allowed opacity-70"),
						children: [
							"⇄ Compare (",
							l.length,
							"/2)"
						]
					})
				]
			}),
			/* @__PURE__ */ U(xu, {
				query: E,
				statuses: D,
				triggerKinds: ee,
				range: O,
				onQueryChange: j,
				onStatusToggle: k,
				onTriggerToggle: A,
				onRangeChange: ne,
				onClearFilters: () => {
					j(""), te("status", null), te("trigger", null);
				}
			}),
			d.size > 0 && /* @__PURE__ */ U(Su, {
				selectionCount: d.size,
				onExport: () => {
					let e = a.filter((e) => d.has(e.id));
					if (e.length === 0) return;
					let t = new Blob([JSON.stringify(e, null, 2)], { type: "application/json" }), n = URL.createObjectURL(t), r = document.createElement("a"), i = (/* @__PURE__ */ new Date()).toISOString().replace(/[:.]/g, "-");
					r.href = n, r.download = `pipeline-runs-${i}.json`, document.body.appendChild(r), r.click(), document.body.removeChild(r), URL.revokeObjectURL(n);
				},
				onDelete: () => {
					d.size > 0 && e && x(!0);
				},
				onClear: () => f(/* @__PURE__ */ new Set())
			}),
			N.length === 0 ? /* @__PURE__ */ U(T, {
				icon: "📜",
				title: a.length === 0 ? "No runs yet" : "No runs match these filters",
				body: a.length === 0 ? "Trigger this pipeline and completed runs will appear here." : "Try clearing a filter or expanding the date range."
			}) : /* @__PURE__ */ U(Du, {
				filtered: N,
				selected: d,
				onSelectionChange: f,
				comparePair: l,
				onToggleComparePair: M,
				costByRunId: P,
				pipelineId: e,
				onNavigate: t,
				onOpenRetryModal: S
			})
		]
	}) : /* @__PURE__ */ U("div", {
		className: "p-8",
		children: /* @__PURE__ */ U(T, {
			icon: "🔍",
			title: "Pipeline not found",
			body: "It may have been deleted. Go back to the pipelines list.",
			actionLabel: "Back to pipelines",
			onAction: () => t("/pipelines")
		})
	}) : /* @__PURE__ */ U(dt, {
		to: "/pipelines",
		replace: !0
	});
}
//#endregion
//#region src/components/pipelines/cost/useRunCost.ts
function ku(e) {
	return z(() => {
		if (!e) return null;
		let t = he(e.pipelineId);
		if (!t) return null;
		let n = /* @__PURE__ */ new Map();
		for (let e of t.nodes) e.data.type === "llm" && n.set(e.id, e.data.model);
		return eu(Object.values(e.steps).filter((e) => !!e.llm).map((e) => ({
			model: n.get(e.nodeId),
			tokensIn: e.llm?.tokensIn ?? 0,
			tokensOut: e.llm?.tokensOut ?? 0
		}))).total;
	}, [e]);
}
//#endregion
//#region src/components/pipelines/steps/StepSection.tsx
function Au({ title: e, children: t }) {
	return /* @__PURE__ */ W("div", {
		className: "px-4 py-2.5 border-t border-border",
		children: [/* @__PURE__ */ U("div", {
			className: "text-[10px] font-bold text-text-tertiary uppercase tracking-[0.5px] mb-1.5",
			children: e
		}), t]
	});
}
//#endregion
//#region src/components/pipelines/steps/StepAttempts.tsx
function ju(e) {
	if (e < 1e3) return `${Math.round(e)}ms`;
	if (e < 6e4) return `${Number((e / 1e3).toFixed(1))}s`;
	let t = Math.floor(e / 6e4), n = Math.round(e % 6e4 / 1e3);
	return n === 0 ? `${t}m` : `${t}m ${n}s`;
}
var Mu = {
	NetworkError: "warning",
	TimeoutError: "warning",
	LLMError: "warning",
	ValidationError: "danger",
	RegistryConflict: "danger",
	UnknownError: "neutral"
};
function Nu(e) {
	return e.error != null;
}
function Pu({ attempt: e, isLast: t }) {
	let r = Nu(e), i = r ? "danger" : "success", a = e.errorCategory == null ? "neutral" : Mu[e.errorCategory] ?? "neutral";
	return /* @__PURE__ */ W("li", {
		"data-testid": `step-attempt-${e.attemptNumber}`,
		"data-final": t ? "true" : "false",
		className: n("rounded-md border px-3 py-2", t ? "border-border bg-surface" : "border-border bg-surface-inset opacity-90 hover:opacity-100 hover:bg-surface-hover"),
		children: [
			/* @__PURE__ */ W("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [
					/* @__PURE__ */ W("span", {
						className: n("text-[11px] font-semibold", t ? "text-text-primary" : "text-text-secondary"),
						children: ["Attempt ", e.attemptNumber]
					}),
					/* @__PURE__ */ U(S, {
						tone: i,
						size: "xs",
						uppercase: !0,
						children: r ? "failed" : "succeeded"
					}),
					t && /* @__PURE__ */ U(S, {
						tone: "info",
						size: "xs",
						uppercase: !0,
						children: "final"
					}),
					/* @__PURE__ */ U("span", {
						className: "ml-auto text-[11px] text-text-tertiary",
						children: e.durationMs == null ? "—" : ju(e.durationMs)
					})
				]
			}),
			r && /* @__PURE__ */ W("div", {
				className: "mt-1.5 flex flex-col gap-1.5",
				children: [e.errorCategory != null && /* @__PURE__ */ U("div", { children: /* @__PURE__ */ U(S, {
					tone: a,
					size: "xs",
					mono: !0,
					children: e.errorCategory
				}) }), /* @__PURE__ */ U("div", {
					className: "rounded-md border border-danger-border bg-danger-bg px-2.5 py-1.5 text-[11px] font-mono whitespace-pre-wrap break-words text-danger-fg",
					children: e.error || "Failed without a message"
				})]
			}),
			e.retryAfterMs != null && /* @__PURE__ */ W("div", {
				className: "mt-1.5 text-[11px] text-text-secondary",
				children: [
					"Waited ",
					ju(e.retryAfterMs),
					" before retrying"
				]
			}),
			/* @__PURE__ */ U("div", {
				className: "mt-1.5 truncate text-[10px] font-mono text-text-tertiary",
				title: e.idempotencyKey,
				children: e.idempotencyKey
			})
		]
	});
}
function Fu({ attempts: e, className: t }) {
	if (e.length === 0 || e.length === 1 && !Nu(e[0])) return null;
	let r = [...e].sort((e, t) => e.attemptNumber - t.attemptNumber), i = r[r.length - 1], a = r.filter(Nu).length, o = Nu(i) ? `${r.length} attempt${r.length === 1 ? "" : "s"}, all failed` : `succeeded on attempt ${i.attemptNumber} after ${a} failure${a === 1 ? "" : "s"}`;
	return /* @__PURE__ */ U(m, {
		first: !0,
		title: "Retry history",
		hint: o,
		className: n(t),
		"data-testid": "step-attempts",
		children: /* @__PURE__ */ U("ol", {
			className: "m-0 flex list-none flex-col gap-1.5 p-0",
			children: r.map((e, t) => /* @__PURE__ */ U(Pu, {
				attempt: e,
				isLast: t === r.length - 1
			}, `${e.attemptNumber}-${e.idempotencyKey}`))
		})
	});
}
var Iu = {
	"var(--color-info)": "bg-info/10 text-info-fg",
	"var(--color-cat-ai)": "bg-accent/10 text-accent-fg",
	"var(--color-success)": "bg-success/10 text-success-fg",
	"var(--color-danger)": "bg-danger/10 text-danger-fg"
};
function Lu(e) {
	return `inline-block px-1.5 py-px rounded-[3px] text-[10px] font-semibold ${Iu[e] ?? ""}`.trimEnd();
}
//#endregion
//#region src/components/pipelines/utils/classifyStepOutput.ts
function Ru(e) {
	return e ? Array.isArray(e.toolCalls) && typeof e.turns == "number" && typeof e.text == "string" ? "agent" : typeof e.judgmentId == "string" && Array.isArray(e.criteria) && typeof e.overallScore == "number" ? "judgment" : !("judgmentId" in e) && (typeof e.visionId == "string" || typeof e.caption == "string" || Array.isArray(e.tags) || typeof e.imageId == "string" && "rawModelText" in e) ? "vision" : "unknown" : "unknown";
}
//#endregion
//#region src/components/pipelines/steps/agentTrace.ts
function zu(e) {
	return e ? Array.isArray(e.toolCalls) && typeof e.turns == "number" && typeof e.text == "string" : !1;
}
function Bu(e, t = 160) {
	if (e == null) return "";
	let n = typeof e == "string" ? e : JSON.stringify(e);
	if (!n) return "";
	let r = n.replace(/\s+/g, " ").trim();
	return r.length > t ? `${r.slice(0, t - 1)}…` : r;
}
function Vu(e) {
	if (!e) return null;
	let t = new Date(e).getTime();
	return Number.isFinite(t) ? t : null;
}
function Hu(e) {
	return {
		text: "",
		turns: 0,
		toolCalls: e,
		model: "",
		tokensIn: 0,
		tokensOut: 0,
		stopReason: "cancelled",
		toolless: !1
	};
}
function Uu(e, t, n = {}) {
	let r = n.now ?? Date.now(), i = Array.isArray(t.toolCalls) ? t.toolCalls : [], a = i.map((e) => Vu(e.startedAt)).filter((e) => e != null), o = i.map((e) => Vu(e.endedAt) ?? (Vu(e.startedAt) == null ? null : r)).filter((e) => e != null), s = Vu(n.startedAt), c = Vu(n.completedAt), l = Math.min(...[s, ...a].filter((e) => e != null), r), u = Math.max(...[
		c,
		...o,
		n.live ? r : null
	].filter((e) => e != null), l), d = Math.max(u - l, 0), f = `agent-${e}`, p = `${f}-root`;
	return {
		traceId: f,
		rootSpanId: p,
		spans: [{
			traceId: f,
			spanId: p,
			name: n.live ? "agent loop · running" : `agent loop · ${t.turns} turn${t.turns === 1 ? "" : "s"}`,
			kind: "agent",
			startTime: new Date(l).toISOString(),
			endTime: new Date(u).toISOString(),
			durationMs: d,
			status: n.live ? "unset" : t.stopReason === "complete" ? "ok" : t.stopReason === "cancelled" ? "unset" : "error",
			attributes: {
				model: t.model,
				turns: t.turns,
				stopReason: t.stopReason,
				toolCalls: i.length,
				toolless: t.toolless,
				tokensIn: t.tokensIn,
				tokensOut: t.tokensOut
			}
		}, ...i.map((e, t) => {
			let n = Vu(e.startedAt) ?? l, i = Vu(e.endedAt) ?? r, a = {
				ok: e.ok,
				callIndex: t
			}, o = Bu(e.input);
			o && (a.input = o);
			let s = Bu(e.output);
			return s && (a.output = s), e.error && (a.error = e.error), e.endedAt || (a.inFlight = !0), {
				traceId: f,
				spanId: `${f}-tool-${t}`,
				parentSpanId: p,
				name: e.name,
				kind: "tool",
				startTime: new Date(n).toISOString(),
				endTime: new Date(i).toISOString(),
				durationMs: Math.max(i - n, 0),
				status: e.endedAt ? e.ok ? "ok" : "error" : "unset",
				attributes: a
			};
		})],
		totalDurationMs: d,
		agentId: t.model,
		startedAt: new Date(l).toISOString()
	};
}
//#endregion
//#region src/components/pipelines/steps/AgentTraceSection.tsx
var Wu = "text-[11px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap", Gu = {
	complete: {
		className: "bg-success-bg text-success-fg",
		label: "complete"
	},
	max_turns: {
		className: "bg-warning-bg text-warning-fg",
		label: "cut off: max turns"
	},
	timeout: {
		className: "bg-warning-bg text-warning-fg",
		label: "cut off: timeout"
	},
	error: {
		className: "bg-danger-bg text-danger-fg",
		label: "error"
	},
	cancelled: {
		className: "bg-surface-hover text-text-secondary",
		label: "cancelled"
	}
};
function Ku(e) {
	let [t, n] = V(() => Date.now());
	return R(() => {
		if (!e) return;
		let t = setInterval(() => n(Date.now()), 1e3);
		return () => clearInterval(t);
	}, [e]), t;
}
function qu({ stepId: e, output: t, startedAt: r, completedAt: i, live: a = !1 }) {
	let o = (t.toolCalls ?? []).some((e) => !e.endedAt), s = Uu(e, t, {
		startedAt: r,
		completedAt: i,
		now: Ku(a || o),
		live: a
	}), c = t.toolCalls?.length ?? 0, l = (t.toolCalls ?? []).filter((e) => e.endedAt && !e.ok).length, u = Gu[t.stopReason] ?? Gu.error;
	return /* @__PURE__ */ W(Au, {
		title: "Agent",
		children: [
			/* @__PURE__ */ W("div", {
				"data-testid": "agent-summary",
				className: "flex flex-wrap items-center gap-2 mb-2.5",
				children: [
					t.model && /* @__PURE__ */ U("span", {
						className: n(Wu, "bg-accent-bg text-accent-fg"),
						children: t.model
					}),
					(!a || t.turns > 0) && /* @__PURE__ */ W("span", {
						className: n(Wu, "bg-surface-hover text-text-secondary"),
						children: [
							t.turns,
							" turn",
							t.turns === 1 ? "" : "s"
						]
					}),
					t.toolless && !a ? /* @__PURE__ */ U("span", {
						"data-testid": "agent-toolless-badge",
						className: n(Wu, "bg-warning-bg text-warning-fg"),
						children: "no tools — ran as a plain completion (toolless)"
					}) : /* @__PURE__ */ W("span", {
						"data-testid": "agent-toolcall-count",
						className: n(Wu, "bg-surface-hover text-text-secondary"),
						children: [
							c,
							" tool call",
							c === 1 ? "" : "s"
						]
					}),
					l > 0 && /* @__PURE__ */ W("span", {
						"data-testid": "agent-failed-calls",
						className: n(Wu, "bg-danger-bg text-danger-fg"),
						children: [l, " failed"]
					}),
					a ? /* @__PURE__ */ U("span", {
						"data-testid": "agent-live-badge",
						className: n(Wu, "bg-info-bg text-info-fg"),
						children: "running — trace streaming"
					}) : /* @__PURE__ */ U("span", {
						"data-testid": "agent-stop-reason",
						className: n(Wu, u.className),
						children: u.label
					})
				]
			}),
			/* @__PURE__ */ U("div", {
				"data-testid": "agent-trace",
				children: c === 0 ? /* @__PURE__ */ U("div", {
					className: "px-3 py-2.5 border border-border rounded-lg text-[12px] text-text-secondary bg-surface-inset",
					children: a ? "No tool calls yet — the agent is thinking." : "No tool calls — nothing to trace. The agent produced its answer from the prompt alone."
				}) : /* @__PURE__ */ U(at, {
					trace: s,
					title: "Tool calls",
					legendKinds: ["agent", "tool"]
				})
			}),
			t.text && /* @__PURE__ */ W("div", {
				className: "mt-3",
				children: [/* @__PURE__ */ U("div", {
					className: "text-[11px] font-semibold text-text-secondary mb-1",
					children: t.stopReason === "complete" ? "Final response" : "Partial response"
				}), /* @__PURE__ */ U("div", {
					"data-testid": "agent-text",
					className: "px-3.5 py-2.5 bg-surface-inset border border-border rounded-md text-[13px] text-text-primary whitespace-pre-wrap break-words leading-[1.6] max-h-[400px] overflow-auto",
					children: t.text
				})]
			})
		]
	});
}
//#endregion
//#region src/components/pipelines/vision/VisionRunCard.tsx
function Ju({ status: e, result: t, runId: r, endpointLabel: i, error: a, latencyMs: o, onOpen: s, className: c }) {
	let l = i ?? t?.model?.endpointId ?? "vision-model", u = o ?? t?.model?.latencyMs, d = t?.caption, f = (t?.tags ?? []).slice(0, 5), p = /* @__PURE__ */ W(H, { children: [
		/* @__PURE__ */ W("header", {
			className: "flex flex-wrap items-center gap-2",
			children: [
				/* @__PURE__ */ U("span", {
					className: "font-mono text-[11px] font-semibold uppercase tracking-wide text-text-secondary",
					children: l
				}),
				e === "running" ? /* @__PURE__ */ W(S, {
					tone: "info",
					size: "sm",
					children: [/* @__PURE__ */ U("span", { className: "inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-primary" }), " running"]
				}) : e === "completed" ? /* @__PURE__ */ U(S, {
					tone: "success",
					size: "sm",
					children: "ok"
				}) : /* @__PURE__ */ U(S, {
					tone: "danger",
					size: "sm",
					children: "failed"
				}),
				typeof u == "number" ? /* @__PURE__ */ W("span", {
					className: "font-mono text-[11px] text-text-tertiary",
					children: [u.toFixed(0), "ms"]
				}) : null,
				r ? /* @__PURE__ */ U("span", {
					className: "ml-auto truncate font-mono text-[10px] text-text-tertiary",
					children: r
				}) : null
			]
		}),
		e === "failed" && a ? /* @__PURE__ */ U("p", {
			className: "text-[13px] text-danger-fg",
			children: a
		}) : /* @__PURE__ */ U("p", {
			className: "line-clamp-2 text-left text-[13px] text-text-primary",
			children: d ?? (e === "running" ? "Analyzing image…" : "No caption produced.")
		}),
		f.length > 0 ? /* @__PURE__ */ U("div", {
			className: "flex flex-wrap gap-1",
			children: f.map((e) => /* @__PURE__ */ W(S, {
				tone: "neutral",
				size: "sm",
				children: ["#", e]
			}, e))
		}) : null
	] }), m = n("flex w-full flex-col gap-1.5 rounded-lg border bg-surface p-3 text-sm text-left", e === "running" ? "border-primary-border ring-1 ring-primary" : e === "failed" ? "border-danger-border" : "border-border");
	if (s) {
		let t = d ? d.slice(0, 60) : "no caption";
		return /* @__PURE__ */ U("button", {
			type: "button",
			onClick: s,
			"aria-label": `Open vision result: ${l}, ${e}, ${t}`,
			className: n(m, "cursor-pointer transition-colors hover:bg-surface-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1", c),
			children: p
		});
	}
	return /* @__PURE__ */ U("article", {
		className: n(m, c),
		children: p
	});
}
//#endregion
//#region src/components/pipelines/vision/useVisionResults.ts
function Yu(e = {}) {
	let { maxRecords: t = 50, runId: n } = e, [r, i] = V([]), a = B(!0);
	return R(() => (a.current = !0, () => {
		a.current = !1;
	}), []), P("*", (e) => {
		if (!a.current) return;
		let r = e;
		if (!r || typeof r.eventType != "string") return;
		let o = r.eventType;
		if (!o.startsWith("pipeline.image.vision.")) return;
		let s = r.payload;
		if (!s || typeof s.runId != "string" || typeof s.stepId != "string" || n && s.runId !== n) return;
		let c = `${s.runId}::${s.stepId}`;
		i((e) => {
			let n = e.findIndex((e) => `${e.runId}::${e.stepId}` === c), r = n === -1 ? void 0 : n, i = typeof s.at == "number" ? s.at : Date.now(), a = (n) => {
				if (typeof r == "number" && r >= 0 && r < e.length) {
					let t = e.slice();
					return t[r] = {
						...e[r],
						...n
					}, t;
				}
				let i = [n, ...e];
				return i.length > t && (i.length = t), i;
			};
			if (o === "pipeline.image.vision.started") return a({
				runId: s.runId,
				stepId: s.stepId,
				status: "running",
				endpointId: s.endpointId,
				startedAt: i
			});
			if (o === "pipeline.image.vision.completed") {
				let t = typeof r == "number" ? e[r] : void 0;
				return a({
					runId: s.runId,
					stepId: s.stepId,
					status: "completed",
					result: s.result,
					completedAt: i,
					elapsedMs: t?.startedAt ? i - t.startedAt : void 0,
					endpointId: t?.endpointId ?? s.result?.model?.endpointId
				});
			}
			if (o === "pipeline.image.vision.failed") {
				let t = typeof r == "number" ? e[r] : void 0;
				return a({
					runId: s.runId,
					stepId: s.stepId,
					status: "failed",
					error: s.error,
					completedAt: i,
					elapsedMs: t?.startedAt ? i - t.startedAt : void 0
				});
			}
			return e;
		});
	}), z(() => r, [r]);
}
//#endregion
//#region src/components/pipelines/steps/StepThread.tsx
var Xu = {
	completed: "var(--color-success)",
	failed: "var(--color-danger)",
	running: "var(--color-info)"
};
function Zu(e) {
	let t = Number(e);
	return Number.isFinite(t) ? t : 0;
}
function Qu(e, t) {
	let n = typeof e.imageId == "string" ? e.imageId : null;
	return {
		...e.extracted ?? {},
		...typeof e.caption == "string" ? { caption: e.caption } : {},
		...typeof e.rawModelText == "string" ? { rawModelText: e.rawModelText } : {},
		...n && t ? { imageUrl: t(n) } : {}
	};
}
function $u({ stepId: e, step: t, index: r, nodeType: i, nodeConfig: a, onRetryFromStep: o, onResumeFromStep: s, onArtifactClick: c }) {
	let [l, u] = V(!1), [d, f] = V("Copy JSON"), p = Ke(), m = L(() => {
		let e = t.output;
		e && navigator.clipboard.writeText(JSON.stringify(e, null, 2)).then(() => {
			f("Copied!"), setTimeout(() => f("Copy JSON"), 1e3);
		});
	}, [t.output]), h = t.output, g = h?.response, _ = t.llm, v = t.input, y = Xu[t.status] ?? "var(--color-text-tertiary)";
	return /* @__PURE__ */ W("div", {
		className: "relative pl-9 mb-1",
		children: [
			/* @__PURE__ */ U("div", {
				className: "absolute left-[10px] top-[14px] w-3 h-3 rounded-full border-2 border-white z-[1] shadow-[0_0_0_1px_var(--color-border)]",
				style: { background: y }
			}),
			/* @__PURE__ */ W("div", {
				onClick: () => u(!l),
				"aria-expanded": l,
				role: "button",
				tabIndex: 0,
				onKeyDown: (e) => {
					(e.key === "Enter" || e.key === " ") && (e.preventDefault(), u(!l));
				},
				"data-testid": `step-row-${e}`,
				"data-node-type": i,
				className: n("flex items-center gap-2.5 px-3.5 py-2.5 cursor-pointer transition-colors duration-100", l ? "bg-surface-inset rounded-t-lg" : "bg-surface rounded-lg"),
				style: {
					border: `1px solid ${l ? y + "40" : "var(--color-border)"}`,
					...l ? { borderRadius: "8px 8px 0 0" } : {}
				},
				children: [
					/* @__PURE__ */ U("span", {
						"aria-hidden": "true",
						className: n("text-[10px] text-text-tertiary shrink-0 transition-transform duration-150", l && "rotate-90"),
						children: "▶"
					}),
					/* @__PURE__ */ U("span", {
						"aria-label": `Status: ${t.status}`,
						className: "text-[10px] font-bold text-white px-1.5 py-0.5 rounded-[3px] uppercase shrink-0",
						style: { background: y },
						children: t.status
					}),
					/* @__PURE__ */ W("span", {
						className: "text-[13px] font-semibold text-text-primary",
						children: [
							r + 1,
							". ",
							typeof a?.label == "string" && a.label.trim() ? a.label : i
						]
					}),
					/* @__PURE__ */ U("span", {
						className: "text-[11px] font-mono text-text-tertiary",
						title: `${i} · ${e}`,
						children: typeof a?.label == "string" && a.label.trim() ? i : e.slice(0, 8)
					}),
					t.durationMs != null && /* @__PURE__ */ U("span", {
						className: "text-[11px] text-text-tertiary ml-auto",
						children: t.durationMs < 1e3 ? `${t.durationMs}ms` : `${(t.durationMs / 1e3).toFixed(1)}s`
					}),
					(t.attempts?.length ?? 0) > 1 && /* @__PURE__ */ W("span", {
						"data-testid": `step-attempts-badge-${e}`,
						title: `${t.attempts?.length} attempts`,
						className: "text-[10px] font-semibold font-mono px-1.5 py-px rounded-[3px] bg-warning-bg text-warning-fg shrink-0",
						children: ["×", t.attempts?.length]
					}),
					_ && /* @__PURE__ */ W("span", {
						className: "text-[10px] text-text-tertiary font-mono",
						children: [_.tokensIn + _.tokensOut, " tok"]
					}),
					h?.tokensIn != null && !_ && /* @__PURE__ */ W("span", {
						className: "text-[10px] text-text-tertiary font-mono",
						children: [Zu(h.tokensIn) + Zu(h.tokensOut), " tok"]
					})
				]
			}),
			l && /* @__PURE__ */ W("div", {
				className: "border-t-0 rounded-b-lg bg-surface overflow-hidden",
				style: { border: `1px solid ${y}40` },
				children: [
					/* @__PURE__ */ U(Au, {
						title: "Execution Timeline",
						children: /* @__PURE__ */ W("table", {
							className: "w-full text-[11px] border-collapse font-mono",
							children: [/* @__PURE__ */ U("thead", { children: /* @__PURE__ */ W("tr", {
								className: "border-b border-border",
								children: [
									/* @__PURE__ */ U("th", {
										scope: "col",
										className: "text-left px-2 py-1 text-[10px] font-semibold text-text-tertiary uppercase",
										children: "Event"
									}),
									/* @__PURE__ */ U("th", {
										scope: "col",
										className: "text-left px-2 py-1 text-[10px] font-semibold text-text-tertiary uppercase",
										children: "Time"
									}),
									/* @__PURE__ */ U("th", {
										scope: "col",
										className: "text-left px-2 py-1 text-[10px] font-semibold text-text-tertiary uppercase",
										children: "Detail"
									})
								]
							}) }), /* @__PURE__ */ W("tbody", { children: [
								t.startedAt && /* @__PURE__ */ W("tr", {
									className: "border-b border-border",
									children: [
										/* @__PURE__ */ U("td", {
											className: "px-2 py-[5px] text-[11px] text-text-secondary align-top",
											children: /* @__PURE__ */ U("span", {
												className: Lu("var(--color-info)"),
												children: "started"
											})
										}),
										/* @__PURE__ */ U("td", {
											className: "px-2 py-[5px] text-[11px] text-text-secondary align-top",
											children: new Date(t.startedAt).toLocaleTimeString()
										}),
										/* @__PURE__ */ W("td", {
											className: "px-2 py-[5px] text-[11px] text-text-secondary align-top",
											children: [
												"Node ",
												e.slice(0, 8),
												" (",
												i,
												") began execution"
											]
										})
									]
								}),
								_?.streamOpened && /* @__PURE__ */ W("tr", {
									className: "border-b border-border",
									children: [
										/* @__PURE__ */ U("td", {
											className: "px-2 py-[5px] text-[11px] text-text-secondary align-top",
											children: /* @__PURE__ */ U("span", {
												className: Lu("var(--color-cat-ai)"),
												children: "stream.opened"
											})
										}),
										/* @__PURE__ */ U("td", {
											className: "px-2 py-[5px] text-[11px] text-text-secondary align-top",
											children: "—"
										}),
										/* @__PURE__ */ U("td", {
											className: "px-2 py-[5px] text-[11px] text-text-secondary align-top",
											children: "LLM stream connection established"
										})
									]
								}),
								_?.firstTokenLatencyMs != null && /* @__PURE__ */ W("tr", {
									className: "border-b border-border",
									children: [
										/* @__PURE__ */ U("td", {
											className: "px-2 py-[5px] text-[11px] text-text-secondary align-top",
											children: /* @__PURE__ */ U("span", {
												className: Lu("var(--color-cat-ai)"),
												children: "first.token"
											})
										}),
										/* @__PURE__ */ W("td", {
											className: "px-2 py-[5px] text-[11px] text-text-secondary align-top",
											children: [
												"+",
												_.firstTokenLatencyMs,
												"ms"
											]
										}),
										/* @__PURE__ */ U("td", {
											className: "px-2 py-[5px] text-[11px] text-text-secondary align-top",
											children: "First token received from LLM"
										})
									]
								}),
								t.completedAt && t.status === "completed" && /* @__PURE__ */ W("tr", {
									className: "border-b border-border",
									children: [
										/* @__PURE__ */ U("td", {
											className: "px-2 py-[5px] text-[11px] text-text-secondary align-top",
											children: /* @__PURE__ */ U("span", {
												className: Lu("var(--color-success)"),
												children: "completed"
											})
										}),
										/* @__PURE__ */ U("td", {
											className: "px-2 py-[5px] text-[11px] text-text-secondary align-top",
											children: new Date(t.completedAt).toLocaleTimeString()
										}),
										/* @__PURE__ */ W("td", {
											className: "px-2 py-[5px] text-[11px] text-text-secondary align-top",
											children: ["Finished in ", t.durationMs == null ? "—" : t.durationMs < 1e3 ? `${t.durationMs}ms` : `${(t.durationMs / 1e3).toFixed(1)}s`]
										})
									]
								}),
								t.status === "failed" && /* @__PURE__ */ W("tr", {
									className: "border-b border-border",
									children: [
										/* @__PURE__ */ U("td", {
											className: "px-2 py-[5px] text-[11px] text-text-secondary align-top",
											children: /* @__PURE__ */ U("span", {
												className: Lu("var(--color-danger)"),
												children: "failed"
											})
										}),
										/* @__PURE__ */ U("td", {
											className: "px-2 py-[5px] text-[11px] text-text-secondary align-top",
											children: t.completedAt ? new Date(t.completedAt).toLocaleTimeString() : "—"
										}),
										/* @__PURE__ */ U("td", {
											className: "px-2 py-[5px] text-[11px] text-text-secondary align-top",
											children: t.error ?? "Unknown error"
										})
									]
								})
							] })]
						})
					}),
					/* @__PURE__ */ U(Fu, { attempts: t.attempts ?? [] }),
					/* @__PURE__ */ U(Au, {
						title: "Node Configuration",
						children: a && Object.keys(a).length > 1 ? /* @__PURE__ */ U("div", {
							className: "grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-xs",
							children: Object.entries(a).filter(([e]) => e !== "type").map(([e, t]) => /* @__PURE__ */ W(ot.Fragment, { children: [/* @__PURE__ */ U("span", {
								className: "text-text-tertiary font-medium",
								children: e
							}), /* @__PURE__ */ U("span", {
								className: n("text-text-secondary break-words", typeof t == "string" && t.length > 60 ? "whitespace-pre-wrap font-sans" : "whitespace-nowrap font-mono"),
								children: typeof t == "string" ? t : JSON.stringify(t)
							})] }, e))
						}) : /* @__PURE__ */ U("span", {
							className: "text-xs text-text-tertiary italic",
							children: "No configuration"
						})
					}),
					v && Object.keys(v).length > 0 && /* @__PURE__ */ U(Au, {
						title: "Runtime Input",
						children: /* @__PURE__ */ U("pre", {
							className: "m-0 px-3 py-2 bg-surface-inset border border-border rounded-md text-[11px] font-mono text-text-secondary whitespace-pre-wrap break-words max-h-[300px] overflow-auto",
							children: JSON.stringify(v, null, 2)
						})
					}),
					_?.prompt && /* @__PURE__ */ U(Au, {
						title: "Resolved Prompt",
						children: /* @__PURE__ */ U("div", {
							className: "px-3.5 py-2.5 bg-surface-inset border border-border rounded-md text-[13px] text-text-primary whitespace-pre-wrap break-words leading-[1.6] max-h-[400px] overflow-auto",
							children: _.prompt
						})
					}),
					p && t.images && t.images.length > 0 && /* @__PURE__ */ U(Au, {
						title: `Produced images (${t.images.length})`,
						children: /* @__PURE__ */ U("div", {
							className: "flex flex-wrap gap-2",
							children: t.images.map((e) => {
								let t = e.bbox ? `[${e.bbox.x},${e.bbox.y} ${e.bbox.width}×${e.bbox.height}]` : `${e.width}×${e.height}`, n = p(e.imageId), r = /* @__PURE__ */ W(H, { children: [/* @__PURE__ */ U("img", {
									src: n,
									alt: `Produced image ${e.imageId}`,
									loading: "lazy",
									className: "w-32 h-24 object-cover rounded border border-border bg-surface-inset block"
								}), /* @__PURE__ */ U("figcaption", {
									className: "font-mono text-[10px] text-text-tertiary overflow-hidden text-ellipsis whitespace-nowrap",
									children: t
								})] });
								return /* @__PURE__ */ U("figure", {
									className: "m-0 w-32",
									title: `${e.imageId} — ${t}`,
									children: c ? /* @__PURE__ */ U("button", {
										type: "button",
										onClick: () => c(e.imageId),
										"data-testid": `step-artifact-${e.imageId}`,
										className: "flex flex-col gap-1 w-32 p-0 bg-transparent border-none cursor-pointer text-left font-[inherit] hover:opacity-80",
										children: r
									}) : /* @__PURE__ */ U("a", {
										href: n,
										target: "_blank",
										rel: "noreferrer",
										"data-testid": `step-artifact-${e.imageId}`,
										className: "flex flex-col gap-1 w-32 no-underline cursor-pointer hover:opacity-80",
										children: r
									})
								}, e.imageId);
							})
						})
					}),
					g || _?.response ? /* @__PURE__ */ U(Au, {
						title: "Response",
						children: /* @__PURE__ */ U("div", {
							className: "px-3.5 py-2.5 bg-surface-inset border border-border rounded-md text-[13px] text-text-primary whitespace-pre-wrap break-words leading-[1.6] max-h-[400px] overflow-auto",
							children: g ?? _?.response
						})
					}) : zu(h) ? /* @__PURE__ */ U(qu, {
						stepId: e,
						output: h,
						startedAt: t.startedAt,
						completedAt: t.completedAt
					}) : t.status === "running" && (t.agentLive || i === "agent") ? /* @__PURE__ */ U(qu, {
						stepId: e,
						output: Hu(t.agentLive?.toolCalls ?? []),
						startedAt: t.startedAt,
						live: !0
					}) : h && Ru(h) === "vision" ? /* @__PURE__ */ W(Au, {
						title: "Vision result",
						children: [/* @__PURE__ */ W("button", {
							type: "button",
							onClick: m,
							className: "mb-1.5 px-2 py-[3px] text-[11px] font-medium border border-border-field rounded bg-transparent cursor-pointer font-[inherit] text-text-secondary",
							children: ["📋 ", d]
						}), /* @__PURE__ */ U(Oc, { result: Qu(h, p) })]
					}) : /* @__PURE__ */ U(Au, {
						title: "Output",
						children: h && Object.keys(h).length > 0 ? /* @__PURE__ */ U("pre", {
							className: "m-0 px-3 py-2 bg-surface-inset border border-border rounded-md text-[11px] font-mono text-text-secondary whitespace-pre-wrap break-words max-h-[300px] overflow-auto",
							children: JSON.stringify(h, null, 2)
						}) : /* @__PURE__ */ U("span", {
							className: "text-xs text-text-tertiary italic",
							children: "No output data"
						})
					}),
					(_ || h?.tokensIn != null) && /* @__PURE__ */ U(Au, {
						title: "Token Usage",
						children: /* @__PURE__ */ W("div", {
							className: "flex gap-5 flex-wrap text-xs text-text-secondary",
							children: [
								/* @__PURE__ */ W("span", { children: ["Tokens in: ", /* @__PURE__ */ U("strong", { children: String(_?.tokensIn ?? h?.tokensIn ?? "—") })] }),
								/* @__PURE__ */ W("span", { children: ["Tokens out: ", /* @__PURE__ */ U("strong", { children: String(_?.tokensOut ?? h?.tokensOut ?? "—") })] }),
								_?.firstTokenLatencyMs != null && /* @__PURE__ */ W("span", { children: ["First token: ", /* @__PURE__ */ W("strong", { children: [_.firstTokenLatencyMs, "ms"] })] })
							]
						})
					}),
					t.error && /* @__PURE__ */ U(Au, {
						title: "Error",
						children: /* @__PURE__ */ U("div", {
							className: "px-3 py-2 bg-danger-bg border border-danger-border rounded-md text-xs text-danger-fg font-mono whitespace-pre-wrap",
							children: t.error
						})
					}),
					(o || s) && /* @__PURE__ */ W("div", {
						className: "px-4 py-2.5 border-t border-border flex justify-end gap-2",
						children: [s && /* @__PURE__ */ U("button", {
							type: "button",
							"data-testid": `resume-from-step-${e}`,
							onClick: (t) => {
								t.stopPropagation(), s(e);
							},
							title: "Resume the same run from this step (preserves accumulated context)",
							className: "px-3 py-[5px] text-xs font-medium border border-primary bg-primary text-white rounded cursor-pointer font-[inherit]",
							children: "↻ Resume from here"
						}), o && /* @__PURE__ */ U("button", {
							type: "button",
							"data-testid": `retry-from-step-${e}`,
							onClick: (t) => {
								t.stopPropagation(), o(e);
							},
							className: "px-3 py-[5px] text-xs font-medium border border-primary bg-transparent text-primary rounded cursor-pointer font-[inherit]",
							children: "↻ Retry from here"
						})]
					})
				]
			})
		]
	});
}
//#endregion
//#region src/components/pipelines/steps/StepTree.tsx
function ed(e) {
	if (e.startedAt) {
		let t = Date.parse(e.startedAt);
		if (Number.isFinite(t)) return t;
	}
	if (e.completedAt) {
		let t = Date.parse(e.completedAt);
		if (Number.isFinite(t)) return t - (e.durationMs ?? 0);
	}
	return Infinity;
}
function td({ steps: e, nodeDataMap: t, edges: n, onRetryFromStep: r, onResumeFromStep: i, onArtifactClick: a }) {
	let o = z(() => {
		let r = Object.entries(e).sort(([, e], [, t]) => {
			let n = ed(e), r = ed(t);
			return n === r ? 0 : n < r ? -1 : 1;
		});
		if (!n || n.length === 0) return r.map(([e, t]) => ({
			stepId: e,
			step: t,
			children: []
		}));
		let i = (e) => {
			let t = e.lastIndexOf(":");
			if (t > 0) {
				let n = e.slice(t + 1);
				if (/^\d+$/.test(n)) return e.slice(0, t);
			}
			return e;
		}, a = /* @__PURE__ */ new Set([
			"fork",
			"condition",
			"approval"
		]), o = /* @__PURE__ */ new Set();
		for (let [e] of r) {
			let n = i(e), r = t[n]?.type;
			r && a.has(r) && o.add(n);
		}
		let s = (e) => e.startsWith("branch-") || e === "true" || e === "false" || e === "approved" || e === "rejected", c = [];
		for (let e of n) o.has(e.source) && s(e.sourceHandle) && c.push({
			forkId: e.source,
			branch: e.sourceHandle,
			targetNodeId: e.target
		});
		let l = /* @__PURE__ */ new Map();
		for (let e of n) l.has(e.source) || l.set(e.source, []), l.get(e.source).push({
			target: e.target,
			handle: e.sourceHandle
		});
		let u = /* @__PURE__ */ new Set();
		function d(e) {
			let t = [], n = e;
			for (; n;) {
				let e = r.find(([e]) => i(e) === n && !u.has(e));
				if (!e) break;
				let [a, s] = e;
				u.add(a);
				let f = {
					stepId: a,
					step: s,
					children: []
				}, p = i(a);
				if (o.has(p)) {
					let e = c.filter((e) => e.forkId === p);
					for (let { branch: t, targetNodeId: n } of e) {
						let e = d(n);
						for (let n of e) n.branch = n.branch ?? t;
						e.length > 0 && (e[0].branch = t, f.children.push(...e));
					}
				}
				t.push(f);
				let m = l.get(p)?.filter((e) => e.handle === "out");
				n = m && m.length === 1 ? m[0].target : null;
			}
			return t;
		}
		let f = /* @__PURE__ */ new Set();
		for (let e of n) f.add(e.target);
		let p = r.find(([e]) => !f.has(i(e)))?.[1] ? r.find(([e]) => !f.has(i(e)))[0] : r[0]?.[0], m = [];
		p && (m = d(i(p)));
		for (let [e, t] of r) u.has(e) || m.push({
			stepId: e,
			step: t,
			children: []
		});
		return m;
	}, [
		e,
		t,
		n
	]), s = (e) => {
		if (t[e]) return t[e];
		let n = e.lastIndexOf(":");
		if (n > 0 && /^\d+$/.test(e.slice(n + 1))) return t[e.slice(0, n)];
	};
	function c(e, t) {
		let n = t;
		return e.map((e) => {
			let t = n++, o = /* @__PURE__ */ new Map();
			for (let t of e.children) {
				let e = t.branch ?? "default";
				o.has(e) || o.set(e, []), o.get(e).push(t);
			}
			return /* @__PURE__ */ W(ot.Fragment, { children: [/* @__PURE__ */ U($u, {
				onArtifactClick: a,
				stepId: e.stepId,
				step: e.step,
				index: t,
				nodeType: s(e.stepId)?.type ?? "unknown",
				nodeConfig: s(e.stepId)?.data,
				onRetryFromStep: r,
				onResumeFromStep: i
			}), e.children.length > 0 && /* @__PURE__ */ U("div", {
				className: "ml-9 pl-5 border-l-2 border-dashed border-border mb-1",
				children: Array.from(o.entries()).map(([e, t], r) => /* @__PURE__ */ W("div", { children: [/* @__PURE__ */ U("div", {
					className: `text-[10px] font-semibold text-text-tertiary uppercase pt-1 pb-0.5 ${r === 0 ? "mt-1" : "mt-2"}`,
					children: e.replace("-", " ")
				}), c(t, n)] }, e))
			})] }, e.stepId);
		});
	}
	return /* @__PURE__ */ W("div", {
		className: "relative",
		children: [/* @__PURE__ */ U("div", { className: "absolute left-[15px] top-6 bottom-6 w-0.5 bg-border rounded-sm" }), c(o, 0)]
	});
}
//#endregion
//#region src/components/pipelines/hooks/usePipelineRunAuditLog.ts
var nd = 5e3, rd = "synthetic-";
function id(e) {
	switch (e) {
		case "pipeline.step.started": return "pipeline.step.started";
		case "pipeline.step.completed": return "pipeline.step.completed";
		case "pipeline.step.failed": return "pipeline.step.failed";
		case "pipeline.step.breakpoint": return "pipeline.step.breakpoint.hit";
		case "pipeline.run.completed": return "pipeline.run.completed";
		case "pipeline.run.failed": return "pipeline.run.failed";
		case "pipeline.run.resumed-from-step": return "pipeline.run.resumed-from-step";
		case "pipeline.approval.requested": return null;
		case "pipeline.approval.recorded": return "pipeline.approve";
		default: return null;
	}
}
function ad(e, t) {
	return t.timestamp.localeCompare(e.timestamp);
}
function od(e, t) {
	if (t.length === 0) return e.slice().sort(ad);
	let n = new Set(e.map((e) => e.auditId)), r = /* @__PURE__ */ new Map();
	for (let t of e) {
		let e = r.get(t.action);
		(!e || t.timestamp > e) && r.set(t.action, t.timestamp);
	}
	let i = t.filter((e) => {
		if (n.has(e.auditId)) return !1;
		let t = r.get(e.action);
		return !t || e.timestamp >= t;
	});
	return [...e, ...i].sort(ad);
}
function sd(e, t, n = {}) {
	let { pollMs: r = nd, filters: i } = n, a = F(), [o, s] = V([]), [c, l] = V([]), [u, d] = V(!0), [f, p] = V(null), [m, h] = V(void 0), [g, _] = V(0), [v, y] = V(!1), b = JSON.stringify({
		since: i?.since,
		until: i?.until,
		actions: i?.actions,
		limit: i?.limit
	}), x = `${e ?? ""}|${t ?? ""}|${b}`, S = B(null), C = B(0);
	R(() => {
		C.current = o.length;
	}, [o]), R(() => {
		if (!e || !t) return;
		let n = !1;
		d(!0), p(null);
		let r = S.current !== x;
		S.current = x, r && (C.current = 0);
		let a = C.current > (i?.limit ?? 0) ? C.current : i?.limit;
		return (async () => {
			try {
				let r = await We(e, t, {
					...i ?? {},
					...a == null ? {} : { limit: a }
				});
				if (n) return;
				s(r.items), h(r.nextCursor), d(!1);
			} catch (e) {
				if (n) return;
				p(e instanceof Error ? e.message : String(e)), d(!1);
			}
		})(), () => {
			n = !0;
		};
	}, [
		e,
		t,
		b,
		g
	]), R(() => {
		if (!e || !t || r <= 0) return;
		let n = window.setInterval(() => {
			_((e) => e + 1);
		}, r);
		return () => window.clearInterval(n);
	}, [
		e,
		t,
		r
	]), R(() => {
		if (!e || !t) return;
		let n = [], r = (n, r) => {
			let i = id(n);
			if (!i) return;
			let a = r;
			if (a.runId !== t) return;
			y(!0);
			let o = {
				auditId: `${rd}${n}-${a.stepId ?? "run"}-${Date.now()}`,
				timestamp: a.at ?? (/* @__PURE__ */ new Date()).toISOString(),
				action: i,
				actorUserId: "executor",
				pipelineId: e,
				runId: t,
				trace: r
			};
			l((e) => [o, ...e]);
		};
		for (let e of [
			"pipeline.step.started",
			"pipeline.step.completed",
			"pipeline.step.failed",
			"pipeline.step.breakpoint",
			"pipeline.run.completed",
			"pipeline.run.failed",
			"pipeline.run.resumed-from-step",
			"pipeline.approval.recorded"
		]) n.push(a.subscribe(e, (t) => r(e, t)));
		return n.push(a.subscribeToRun(t)), () => {
			for (let e of n) e();
		};
	}, [
		a,
		e,
		t
	]), R(() => {
		o.length !== 0 && l((e) => {
			if (e.length === 0) return e;
			let t = /* @__PURE__ */ new Map();
			for (let e of o) {
				let n = t.get(e.action);
				(!n || e.timestamp > n) && t.set(e.action, e.timestamp);
			}
			return e.filter((e) => {
				let n = t.get(e.action);
				return !n || e.timestamp >= n;
			});
		});
	}, [o]);
	let w = B(!1), T = L(() => {
		!e || !t || !m || w.current || (w.current = !0, (async () => {
			try {
				let n = await We(e, t, {
					...i ?? {},
					cursor: m
				});
				s((e) => {
					let t = new Set(e.map((e) => e.auditId)), r = e.concat(n.items.filter((e) => !t.has(e.auditId)));
					return r.sort(ad), r;
				}), h(n.nextCursor);
			} catch (e) {
				p(e instanceof Error ? e.message : String(e));
			} finally {
				w.current = !1;
			}
		})());
	}, [
		e,
		t,
		m,
		b
	]), E = L(() => {
		_((e) => e + 1);
	}, []);
	return {
		items: z(() => od(o, c), [o, c]),
		loading: u,
		error: f,
		hasMore: !!m,
		loadMore: T,
		liveHealthy: v,
		refresh: E
	};
}
//#endregion
//#region src/components/pipelines/ExecutorLog.tsx
var cd = "var(--color-info)", ld = "var(--color-warning)", ud = "var(--color-caution)", dd = "var(--color-neutral)", fd = "var(--color-danger)", pd = "var(--color-accent)";
function md(e) {
	return e.action === "pipeline.step.failed" || e.outcome === "error" ? fd : e.action === "pipeline.run.resumed-from-step" || e.action.startsWith("pipeline.step.context.patched") ? pd : e.action.startsWith("pipeline.approval.") ? ld : e.action.startsWith("pipeline.breakpoint.") ? ud : e.action.startsWith("pipeline.step.") ? cd : (e.action.startsWith("pipeline.run."), dd);
}
var hd = {
	"1h": "Last 1h",
	"24h": "Last 24h",
	all: "All"
}, gd = [
	{
		label: "Steps",
		matches: (e) => e.startsWith("pipeline.step.")
	},
	{
		label: "Approvals",
		matches: (e) => e.startsWith("pipeline.approval.") || e === "pipeline.approve" || e === "pipeline.reject"
	},
	{
		label: "Breakpoints",
		matches: (e) => e.startsWith("pipeline.breakpoint.") || e === "pipeline.step.breakpoint.hit"
	},
	{
		label: "Run lifecycle",
		matches: (e) => e.startsWith("pipeline.run.") || e === "pipeline.trigger" || e === "pipeline.cancel"
	},
	{
		label: "Errors",
		matches: (e) => e === "pipeline.step.failed" || e === "pipeline.run.failed" || e === "pipeline.force_fail"
	}
];
function _d(e) {
	if (e === "all") return null;
	let t = Date.now();
	return e === "1h" ? t - 36e5 : t - 864e5;
}
function vd(e) {
	let t = e.details, n = e.trace, r = t && typeof t.stepId == "string" ? t.stepId : void 0, i = n && typeof n.stepId == "string" ? n.stepId : void 0, a = n && typeof n.nodeId == "string" ? n.nodeId : void 0;
	return r ?? i ?? a;
}
function yd(e, t = Date.now()) {
	let n = Date.parse(e);
	if (!Number.isFinite(n)) return e;
	let r = Math.max(0, Math.floor((t - n) / 1e3));
	if (r < 5) return "just now";
	if (r < 60) return `${r}s ago`;
	let i = Math.floor(r / 60);
	if (i < 60) return `${i}m ago`;
	let a = Math.floor(i / 60);
	return a < 24 ? `${a}h ago` : `${Math.floor(a / 24)}d ago`;
}
function bd({ pipelineId: e, runId: t, onStepClick: r }) {
	let { items: i, error: a, hasMore: o, loadMore: s, loading: c } = sd(e, t), [l, u] = V(/* @__PURE__ */ new Set()), [d, f] = V(""), [p, m] = V("all"), [g, _] = V(/* @__PURE__ */ new Set()), v = L((e) => {
		u((t) => {
			let n = new Set(t);
			return n.has(e) ? n.delete(e) : n.add(e), n;
		});
	}, []), y = L((e) => {
		_((t) => {
			let n = new Set(t);
			return n.has(e) ? n.delete(e) : n.add(e), n;
		});
	}, []), b = z(() => {
		let e = _d(p), t = d.trim().toLowerCase(), n = gd.filter((e) => l.has(e.label));
		return i.filter((r) => {
			if (n.length > 0 && !n.some((e) => e.matches(r.action)) || t && !r.actorUserId.toLowerCase().includes(t)) return !1;
			if (e !== null) {
				let t = Date.parse(r.timestamp);
				if (!Number.isFinite(t) || t < e) return !1;
			}
			return !0;
		});
	}, [
		i,
		l,
		d,
		p
	]), x = L(() => {
		if (typeof window > "u") return;
		let e = b.map((e) => JSON.stringify(e)).join("\n") + (b.length > 0 ? "\n" : ""), n = new Blob([e], { type: "application/x-ndjson" }), r = URL.createObjectURL(n), i = document.createElement("a");
		i.href = r, i.download = `executor-log-${t}.ndjson`, document.body.appendChild(i), i.click(), document.body.removeChild(i), URL.revokeObjectURL(r);
	}, [b, t]), S = L((e) => {
		if (y(e.auditId), !r || !e.action.startsWith("pipeline.step.")) return;
		let t = vd(e);
		t && r(t);
	}, [r, y]);
	return /* @__PURE__ */ W("div", {
		className: "flex flex-col flex-1 min-h-0 bg-surface border border-border rounded-lg overflow-hidden",
		"data-testid": "executor-log",
		children: [
			/* @__PURE__ */ W("div", {
				className: "sticky top-0 z-[2] flex flex-wrap items-center gap-2 px-3 py-2.5 bg-surface-panel border-b border-border text-xs",
				children: [
					/* @__PURE__ */ W("span", {
						className: n("inline-flex items-center text-[11px] font-semibold", a ? "text-text-tertiary" : "text-text-secondary"),
						"data-testid": "executor-log-live-indicator",
						title: a ? `Live updates unavailable: ${a}` : "Live updates active",
						children: [/* @__PURE__ */ U("span", {
							className: n("inline-block w-2 h-2 rounded-full mr-1.5 align-middle", a ? "bg-text-tertiary" : "bg-success [animation:executor-log-pulse_1.6s_ease-in-out_infinite]"),
							"aria-hidden": !0
						}), "Live"]
					}),
					/* @__PURE__ */ U("span", {
						className: "text-border",
						children: "|"
					}),
					gd.map((e) => {
						let t = l.has(e.label);
						return /* @__PURE__ */ U("button", {
							type: "button",
							className: n("font-[inherit] text-[11px] font-semibold px-2.5 py-[3px] rounded-xl border cursor-pointer", t ? "bg-info-bg text-info-fg border-info-border" : "bg-surface text-text-secondary border-border"),
							onClick: () => v(e.label),
							"data-testid": `executor-log-chip-${e.label.toLowerCase().replace(/\s+/g, "-")}`,
							"aria-pressed": t,
							children: e.label
						}, e.label);
					}),
					/* @__PURE__ */ U("span", {
						className: "text-border",
						children: "|"
					}),
					/* @__PURE__ */ U(k, {
						size: "sm",
						value: d,
						onChange: (e) => f(e.target.value),
						placeholder: "Actor",
						className: "min-w-30",
						"data-testid": "executor-log-actor-input",
						"aria-label": "Filter by actor"
					}),
					/* @__PURE__ */ U("span", {
						className: "text-border",
						children: "|"
					}),
					[
						"1h",
						"24h",
						"all"
					].map((e) => {
						let t = p === e;
						return /* @__PURE__ */ U("button", {
							type: "button",
							className: n("font-[inherit] text-[11px] font-semibold px-2.5 py-[3px] rounded-xl border cursor-pointer", t ? "bg-info-bg text-info-fg border-info-border" : "bg-surface text-text-secondary border-border"),
							onClick: () => m(e),
							"data-testid": `executor-log-time-${e}`,
							"aria-pressed": t,
							children: hd[e]
						}, e);
					}),
					/* @__PURE__ */ U("div", { className: "flex-1" }),
					/* @__PURE__ */ W("span", {
						className: "text-[11px] text-text-tertiary",
						children: [
							b.length,
							" of ",
							i.length,
							" shown"
						]
					})
				]
			}),
			/* @__PURE__ */ W("div", {
				className: "flex-1 overflow-y-auto px-4 py-3 relative",
				"data-testid": "executor-log-timeline",
				children: [
					c && i.length === 0 && /* @__PURE__ */ U("div", {
						className: "text-xs text-text-tertiary p-3",
						children: "Loading audit rows…"
					}),
					!c && i.length === 0 && /* @__PURE__ */ U("div", {
						className: "px-3 py-6 text-[13px] text-text-secondary text-center leading-relaxed",
						"data-testid": "executor-log-empty",
						children: "Audit log started recording on 2026-05-07 (hub#2224). This run predates that — no rows captured."
					}),
					b.length === 0 && i.length > 0 && /* @__PURE__ */ U("div", {
						className: "px-3 py-5 text-xs text-text-tertiary text-center",
						"data-testid": "executor-log-no-matches",
						children: "No audit rows match the current filters."
					}),
					b.map((e) => {
						let t = g.has(e.auditId), r = e.action.startsWith("pipeline.step.") ? vd(e) : void 0;
						return /* @__PURE__ */ W("div", {
							role: "button",
							tabIndex: 0,
							"aria-expanded": e.trace ? t : void 0,
							className: "grid grid-cols-[14px_auto_auto_1fr] items-baseline gap-2.5 py-1.5 text-xs border-b border-surface-inset cursor-pointer",
							onClick: () => S(e),
							onKeyDown: ie(() => S(e)),
							"data-testid": "executor-log-row",
							"data-action": e.action,
							"data-audit-id": e.auditId,
							children: [
								/* @__PURE__ */ U("span", {
									className: "w-2.5 h-2.5 rounded-full shrink-0 self-center",
									style: { background: md(e) },
									"aria-hidden": !0,
									"data-testid": "executor-log-marker"
								}),
								/* @__PURE__ */ U("span", {
									className: "text-text-tertiary font-mono text-[11px] whitespace-nowrap",
									title: e.timestamp,
									children: yd(e.timestamp)
								}),
								/* @__PURE__ */ U("span", {
									className: "text-text-secondary text-[11px] whitespace-nowrap",
									children: e.actorUserId
								}),
								/* @__PURE__ */ W("span", {
									className: "text-text-primary flex items-baseline gap-1.5 flex-wrap",
									children: [
										/* @__PURE__ */ U("code", {
											className: "font-mono text-[11px] bg-surface-inset px-1.5 py-px rounded-[3px]",
											children: e.action
										}),
										r && /* @__PURE__ */ W("span", {
											className: "text-[11px] text-text-tertiary",
											"data-testid": "executor-log-stepid",
											children: [
												"· ",
												r.slice(0, 14),
												r.length > 14 ? "…" : ""
											]
										}),
										e.outcome && /* @__PURE__ */ W("span", {
											className: n("text-[11px]", e.outcome === "error" ? "text-danger-fg" : "text-text-tertiary"),
											children: ["· ", e.outcome]
										})
									]
								}),
								t && e.trace && /* @__PURE__ */ U("pre", {
									className: "col-[2/span_3] mt-1 p-2 bg-surface-inset border border-border rounded text-[11px] font-mono text-text-secondary overflow-x-auto",
									"data-testid": "executor-log-trace",
									onClick: (e) => e.stopPropagation(),
									children: JSON.stringify(e.trace, null, 2)
								})
							]
						}, e.auditId);
					})
				]
			}),
			/* @__PURE__ */ W("div", {
				className: "flex justify-between items-center gap-2 px-3 py-2.5 border-t border-border bg-surface-panel",
				children: [o ? /* @__PURE__ */ U("span", { children: /* @__PURE__ */ U(h, {
					variant: "secondary",
					size: "sm",
					onClick: () => s(),
					"data-testid": "executor-log-load-more",
					children: "Load more"
				}) }) : /* @__PURE__ */ U("span", {}), /* @__PURE__ */ U("span", { children: /* @__PURE__ */ U(h, {
					variant: "secondary",
					size: "sm",
					onClick: x,
					disabled: b.length === 0,
					"data-testid": "executor-log-download",
					children: "Download log"
				}) })]
			})
		]
	});
}
//#endregion
//#region src/components/pipelines/PipelineRunReplayPage.tsx
function xd() {
	let { pipelineId: e, runId: t } = pt();
	return !e || !t ? /* @__PURE__ */ U(dt, {
		to: "/pipelines",
		replace: !0
	}) : /* @__PURE__ */ U(xe, {
		pipelineId: e,
		children: /* @__PURE__ */ U(Ce, { children: /* @__PURE__ */ U(Sd, {
			pipelineId: e,
			runId: t
		}) })
	});
}
function Sd({ pipelineId: e, runId: t }) {
	let r = ft(), i = de(), a = $e(), { definition: o } = i, [s, c] = V(null), [l, u] = V(null), [d, f] = V(0), p = L(() => f((e) => e + 1), []);
	R(() => {
		let n = !1;
		return u(null), import("./services-CwJ5tpy0.js").then((e) => e.Q).then(({ getPipelineRun: r }) => r(e, t).then((e) => {
			!n && e && c(e);
		})).catch((e) => {
			n || u(e instanceof Error ? e.message : String(e));
		}), () => {
			n = !0;
		};
	}, [
		e,
		t,
		d
	]);
	let m = z(() => {
		let e = a.runs[t], n = s;
		if (!(!e && !n)) return e ? !n || Object.keys(e.steps).length >= Object.keys(n.steps).length ? e : {
			...n,
			status: e.status,
			currentStepIds: e.currentStepIds
		} : n ?? void 0;
	}, [
		a.runs,
		t,
		s
	]);
	se(t);
	let g = ku(m ?? null), _ = z(() => {
		let e = {};
		if (!o) return e;
		for (let t of o.nodes) e[t.id] = {
			type: t.data.type,
			data: t.data
		};
		return e;
	}, [o]), [b, x] = V(!1), C = B(null);
	Xn(C, () => x(!1), b);
	let [T, E] = V("steps"), [D, ee] = V(null), O = L((e) => {
		ee(e), E("steps");
	}, []), [te, k] = V(null), [A, ne] = V(null), [j, M] = V(!1), N = m?.status === "failed" ? m.error?.nodeId : void 0, ie = L((e) => {
		if (!m) return;
		let t = Object.entries(m.steps).filter(([t, n]) => t !== e && n.status === "completed").map(([e]) => e);
		k({
			nodeId: e,
			skippedNodes: t,
			snapshotInput: !1
		}), ne(null);
	}, [m]), P = L(async () => {
		if (!(!te || !m)) {
			ne(null), M(!0);
			try {
				let t = await qe(e, m.id, te.nodeId, void 0, te.snapshotInput || void 0);
				k(null), r(`/pipelines/${e}/runs/${t.newRunId}`);
			} catch (e) {
				ne(e instanceof Error ? e.message : String(e)), M(!1);
			}
		}
	}, [
		te,
		m,
		e,
		r
	]), [F, ae] = V(null), [oe, ce] = V(null), [I, le] = V(null), [ue, pe] = V(null), me = B(null);
	R(() => () => {
		me.current && clearTimeout(me.current);
	}, []);
	let he = L(async (t) => {
		if (m) {
			ce(null), ae(t);
			try {
				let n = await Re(e, m.id, t);
				le(`Resumed from ${t.slice(0, 10)}${t.length > 10 ? "…" : ""} (replay #${n.replayAttempts})`), me.current && clearTimeout(me.current), me.current = setTimeout(() => le(null), 4e3), r(`/pipelines/${e}/runs/${m.id}`);
			} catch (e) {
				ce(e instanceof Error ? e.message : String(e));
			} finally {
				ae(null);
			}
		}
	}, [
		m,
		e,
		r
	]), ge = L(async () => {
		pe(null);
		try {
			let t = await a.triggerRun(e, m ? m.triggeredBy.payload : void 0);
			r(`/pipelines/${e}/runs/${t}`);
		} catch (e) {
			console.error("[PipelineRunReplay] re-run failed", e), pe(e instanceof Error ? e.message : String(e));
		}
	}, [
		m,
		a,
		e,
		r
	]), _e = async () => {
		x(!1);
		try {
			await navigator.clipboard?.writeText(t);
		} catch {}
	}, ve = () => {
		if (x(!1), !m) return;
		let e = JSON.stringify(m, null, 2);
		Ki(`run-${t}.json`, e);
	}, ye = () => {
		if (x(!1), !o) return;
		let e = fe(o.id, `${o.name} (from run)`);
		e && r(`/pipelines/${e.id}`);
	};
	if (!m) {
		let t = l !== null;
		return /* @__PURE__ */ W("div", {
			className: "flex flex-col flex-1 h-0 overflow-hidden bg-surface-inset font-[inherit] text-text-primary rounded-lg border border-border",
			"data-testid": t ? "pipeline-replay-error" : "pipeline-replay-missing",
			children: [/* @__PURE__ */ W("div", {
				className: "h-11 shrink-0 flex items-center gap-2.5 px-3 border-b border-border bg-surface relative z-[5]",
				children: [/* @__PURE__ */ U(v, {
					onClick: () => r(`/pipelines/${e}`),
					"aria-label": "Back to pipeline",
					title: "Back to pipeline",
					children: "←"
				}), /* @__PURE__ */ U("div", {
					className: "text-[13px] font-semibold text-text-primary",
					children: o?.name ?? "Pipeline"
				})]
			}), /* @__PURE__ */ U("div", {
				className: "flex-1 flex flex-col items-center justify-center gap-3.5 p-8 text-center",
				children: t ? /* @__PURE__ */ W(H, { children: [
					/* @__PURE__ */ U("div", {
						className: "text-sm text-text-secondary",
						"data-testid": "replay-load-error",
						children: "Couldn't load this run — the pipeline API is unreachable. The run has not necessarily been deleted."
					}),
					/* @__PURE__ */ U("div", {
						className: "text-xs text-danger-fg font-mono",
						"data-testid": "replay-load-error-detail",
						children: l
					}),
					/* @__PURE__ */ W("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ U(h, {
							onClick: p,
							"data-testid": "replay-retry",
							children: "Retry"
						}), /* @__PURE__ */ U(h, {
							variant: "secondary",
							onClick: () => r(`/pipelines/${e}`),
							children: "Back to pipeline"
						})]
					})
				] }) : /* @__PURE__ */ W(H, { children: [/* @__PURE__ */ U("div", {
					className: "text-sm text-text-secondary",
					children: "Run not available — it may have been trimmed from history."
				}), /* @__PURE__ */ U(h, {
					onClick: () => r(`/pipelines/${e}`),
					children: "Back to pipeline"
				})] })
			})]
		});
	}
	let be = Cu(m.status), xe = m.triggeredBy.userId ?? m.triggeredBy.triggerType, Se = tu(g);
	return /* @__PURE__ */ W("div", {
		className: "flex flex-col flex-1 h-0 overflow-hidden bg-surface-inset font-[inherit] text-text-primary rounded-lg border border-border",
		"data-testid": "pipeline-replay",
		children: [
			/* @__PURE__ */ W("div", {
				className: "h-11 shrink-0 flex items-center gap-2.5 px-3 border-b border-border bg-surface relative z-[5]",
				children: [
					/* @__PURE__ */ U(v, {
						onClick: () => r(`/pipelines/${e}`),
						"aria-label": "Back to pipeline",
						title: "Back to pipeline",
						children: "←"
					}),
					/* @__PURE__ */ U("div", {
						className: "text-[13px] font-bold text-text-primary max-w-[220px] overflow-hidden text-ellipsis whitespace-nowrap",
						title: o?.name ?? e,
						children: o?.name ?? e
					}),
					/* @__PURE__ */ U("span", {
						className: "text-text-tertiary text-xs",
						children: "·"
					}),
					/* @__PURE__ */ W("div", {
						className: "text-xs text-text-secondary overflow-hidden text-ellipsis whitespace-nowrap",
						"data-testid": "replay-subtitle",
						children: [
							"Run from ",
							ha(m.startedAt),
							" by ",
							xe
						]
					}),
					/* @__PURE__ */ W("span", {
						className: "text-text-tertiary text-xs",
						"data-testid": "replay-cost",
						children: ["· ", Se]
					}),
					/* @__PURE__ */ U(S, {
						tone: be.tone,
						"aria-label": `Status: ${be.label}`,
						children: be.label
					}),
					m.status === "failed" && m.error?.errorCategory ? /* @__PURE__ */ U(S, {
						tone: "danger",
						title: m.error.message || "Error details unavailable",
						children: m.error.errorCategory
					}) : null,
					/* @__PURE__ */ U("div", { className: "flex-1" }),
					N && /* @__PURE__ */ U(h, {
						onClick: () => ie(N),
						disabled: j,
						"data-testid": "retry-from-failed-step-button",
						title: `Retry from "${N}" with the original upstream context`,
						children: "↻ Retry from failure"
					}),
					/* @__PURE__ */ U(h, {
						onClick: ge,
						"data-testid": "rerun-button",
						title: "Re-run with the original trigger payload",
						children: "↻ Re-run"
					}),
					/* @__PURE__ */ W("div", {
						className: "relative",
						ref: C,
						children: [/* @__PURE__ */ U(v, {
							onClick: () => x((e) => !e),
							"aria-label": "More actions",
							"aria-haspopup": "menu",
							"aria-expanded": b,
							"data-testid": "replay-overflow-btn",
							children: "⋯"
						}), b ? /* @__PURE__ */ W("div", {
							className: "absolute top-full right-0 mt-1.5 bg-surface border border-border rounded-lg shadow-[0_12px_28px_rgba(15,23,42,0.14)] min-w-[200px] z-20 overflow-hidden",
							role: "menu",
							"aria-label": "More actions",
							children: [
								/* @__PURE__ */ U("button", {
									className: "block w-full text-left py-2 px-3.5 text-[13px] border-none bg-transparent cursor-pointer font-[inherit] text-text-primary",
									role: "menuitem",
									onClick: _e,
									children: "Copy runId"
								}),
								/* @__PURE__ */ U("button", {
									className: "block w-full text-left py-2 px-3.5 text-[13px] border-none bg-transparent cursor-pointer font-[inherit] text-text-primary",
									role: "menuitem",
									onClick: ve,
									children: "Export run JSON"
								}),
								/* @__PURE__ */ U("button", {
									className: "block w-full text-left py-2 px-3.5 text-[13px] border-none bg-transparent cursor-pointer font-[inherit] text-text-primary",
									role: "menuitem",
									onClick: ye,
									children: "Open as new draft"
								})
							]
						}) : null]
					})
				]
			}),
			/* @__PURE__ */ U(w, {
				open: te !== null,
				onConfirm: P,
				onCancel: () => {
					j || k(null);
				},
				title: "Retry from step",
				confirmLabel: j ? "Starting…" : "Confirm retry",
				confirmDisabled: j,
				children: te && /* @__PURE__ */ W("div", {
					className: "flex flex-col gap-2.5",
					children: [
						/* @__PURE__ */ W("div", {
							className: "text-[13px] text-text-secondary",
							children: [
								"A new run will start from",
								" ",
								/* @__PURE__ */ W("code", {
									className: "bg-surface-inset px-1 rounded text-xs",
									children: [te.nodeId.slice(0, 12), te.nodeId.length > 12 ? "…" : ""]
								}),
								" ",
								"using the original upstream context."
							]
						}),
						te.skippedNodes.length > 0 && /* @__PURE__ */ W("div", { children: [/* @__PURE__ */ W("div", {
							className: "text-[11px] font-semibold text-text-tertiary uppercase mb-1.5",
							children: [
								"Steps that will be skipped (",
								te.skippedNodes.length,
								")"
							]
						}), /* @__PURE__ */ U("div", {
							className: "max-h-20 overflow-y-auto flex flex-wrap gap-1",
							children: te.skippedNodes.map((e) => /* @__PURE__ */ U("span", {
								className: "bg-surface-inset border border-border rounded px-1.5 py-px text-[11px] font-mono text-text-secondary",
								children: e.slice(0, 10)
							}, e))
						})] }),
						/* @__PURE__ */ W("label", {
							className: "flex items-center gap-2 text-[13px] text-text-secondary cursor-pointer",
							children: [/* @__PURE__ */ U(re, {
								checked: te.snapshotInput,
								onChange: (e) => k((t) => t && {
									...t,
									snapshotInput: e
								})
							}), "Use persisted input snapshot"]
						}),
						A && /* @__PURE__ */ U("div", {
							role: "alert",
							"data-testid": "retry-modal-error",
							className: "py-2 px-3 bg-danger-bg border border-danger-border rounded-md text-xs text-danger-fg",
							children: A
						})
					]
				})
			}),
			/* @__PURE__ */ U("div", {
				className: "flex-1 flex flex-col min-h-0",
				children: /* @__PURE__ */ W("div", {
					className: "flex-1 overflow-auto py-5 px-7 bg-surface",
					children: [
						/* @__PURE__ */ W("div", {
							className: "flex items-center gap-3 mb-5",
							children: [
								/* @__PURE__ */ W("h3", {
									className: "m-0 text-[15px] font-bold text-text-primary",
									children: [
										"Steps (",
										Object.keys(m.steps).length,
										")"
									]
								}),
								/* @__PURE__ */ W("span", {
									className: "text-xs text-text-tertiary",
									children: [
										m.startedAt ? new Date(m.startedAt).toLocaleTimeString() : "",
										" — ",
										m.completedAt ? new Date(m.completedAt).toLocaleTimeString() : "in progress"
									]
								}),
								m.durationMs != null && /* @__PURE__ */ W("span", {
									className: "text-xs text-text-secondary ml-auto",
									children: ["Total: ", m.durationMs < 1e3 ? `${m.durationMs}ms` : `${(m.durationMs / 1e3).toFixed(1)}s`]
								})
							]
						}),
						A && /* @__PURE__ */ U(y, {
							title: "Retry failed:",
							className: "mb-4",
							children: A
						}),
						oe && /* @__PURE__ */ U(y, {
							title: "Resume failed:",
							className: "mb-4",
							"data-testid": "resume-error-banner",
							children: oe
						}),
						ue && /* @__PURE__ */ U(y, {
							title: "Re-run failed:",
							className: "mb-4",
							"data-testid": "rerun-error-banner",
							children: ue
						}),
						(m.replayAttempts ?? 0) > 0 && /* @__PURE__ */ U(y, {
							title: "Resumed from a previous failure",
							className: "mb-4",
							"data-testid": "resume-history-banner",
							children: /* @__PURE__ */ W("div", {
								className: "flex flex-col gap-1.5",
								children: [/* @__PURE__ */ W("div", { children: [
									m.error?.nodeId && m.error.nodeId !== "unknown" && /* @__PURE__ */ W(H, { children: [
										"Originally failed at ",
										/* @__PURE__ */ U("code", { children: m.error.nodeId.slice(0, 12) }),
										" — "
									] }),
									"Resumed ",
									m.replayAttempts,
									" time",
									m.replayAttempts === 1 ? "" : "s",
									".",
									m.resumeHistory && m.resumeHistory.length > 0 && /* @__PURE__ */ W(H, { children: [
										" ",
										"Most recent: from",
										" ",
										/* @__PURE__ */ U("code", { children: m.resumeHistory[m.resumeHistory.length - 1].fromNodeId.slice(0, 12) }),
										" ",
										"at ",
										ha(m.resumeHistory[m.resumeHistory.length - 1].at),
										"."
									] })
								] }), m.resumeHistory && m.resumeHistory.length > 1 && /* @__PURE__ */ U("ol", {
									className: "m-0 pl-[18px] text-[11px] text-text-tertiary leading-relaxed",
									"data-testid": "resume-history-timeline",
									children: m.resumeHistory.map((e, t) => /* @__PURE__ */ W("li", { children: [
										"from ",
										/* @__PURE__ */ U("code", { children: e.fromNodeId.slice(0, 12) }),
										" at ",
										ha(e.at)
									] }, `${e.fromNodeId}-${e.at}-${t}`))
								})]
							})
						}),
						I && /* @__PURE__ */ U(y, {
							title: "Resumed",
							className: "mb-4",
							"data-testid": "resume-toast",
							children: I
						}),
						m.error && /* @__PURE__ */ W(y, {
							title: "Run failed:",
							className: "mb-4",
							children: [
								m.error.message,
								m.error.nodeId && m.error.nodeId !== "unknown" && /* @__PURE__ */ W("span", {
									className: "ml-2 text-[11px] text-danger-fg",
									children: ["at node ", m.error.nodeId.slice(0, 8)]
								}),
								m.status === "failed" && m.error.nodeId && m.error.nodeId !== "unknown" && /* @__PURE__ */ U("div", {
									className: "mt-2",
									children: /* @__PURE__ */ U(h, {
										onClick: () => he(m.error.nodeId),
										disabled: F !== null,
										"data-testid": "resume-from-here-button",
										title: `Resume this run from "${m.error.nodeId}" using its accumulated upstream context`,
										children: F === m.error.nodeId ? "Resuming…" : "↻ Resume from here"
									})
								})
							]
						}),
						/* @__PURE__ */ U("div", {
							role: "tablist",
							"aria-label": "Run detail view",
							onKeyDown: rt,
							className: "flex gap-1 mb-3 border-b border-border",
							"data-testid": "run-replay-tabs",
							children: [{
								id: "steps",
								label: "Steps"
							}, {
								id: "log",
								label: "Executor Log"
							}].map((e) => {
								let t = T === e.id;
								return /* @__PURE__ */ U("button", {
									role: "tab",
									"aria-selected": t,
									tabIndex: t ? 0 : -1,
									onClick: () => E(e.id),
									"data-testid": `run-replay-tab-${e.id}`,
									className: n("font-[inherit] text-[13px] font-semibold py-1.5 px-3.5 border-none bg-transparent cursor-pointer -mb-px", t ? "text-text-primary border-b-2 border-b-primary" : "text-text-tertiary border-b-2 border-b-transparent"),
									children: e.label
								}, e.id);
							})
						}),
						T === "steps" ? /* @__PURE__ */ U(td, {
							steps: m.steps,
							nodeDataMap: _,
							edges: o?.edges,
							onRetryFromStep: ie,
							onResumeFromStep: m.status === "failed" ? he : void 0
						}) : /* @__PURE__ */ U("div", {
							className: "flex flex-col min-h-[400px] h-[60vh]",
							children: /* @__PURE__ */ U(bd, {
								pipelineId: e,
								runId: t,
								onStepClick: O
							})
						})
					]
				})
			})
		]
	});
}
//#endregion
//#region src/components/pipelines/AllRunsPage.tsx
function Cd() {
	let e = ft(), [t, n] = mt(), [r, i] = V([]), { runs: a } = $e();
	R(() => {
		let e = !1;
		return (async () => {
			let t = Ge(), n = [];
			await Promise.all(t.map(async (e) => {
				try {
					let { runs: t } = await Ae(e.id, { limit: 50 });
					if (t.length > 0) {
						for (let r of t) r.id && n.push({
							...r,
							pipelineName: e.name
						});
						return;
					}
				} catch {}
				for (let t of Xe(e.id)) t.id && n.push({
					...t,
					pipelineName: e.name
				});
			})), !e && (n.sort((e, t) => t.startedAt.localeCompare(e.startedAt)), i(n));
		})(), () => {
			e = !0;
		};
	}, []);
	let o = z(() => {
		let e = new Map(Ge().map((e) => [e.id, e.name])), t = new Set(r.map((e) => e.id)), n = [];
		for (let [r, i] of Object.entries(a)) t.has(r) || i.pipelineId && n.push({
			...i,
			pipelineName: e.get(i.pipelineId) ?? `Pipeline ${i.pipelineId.slice(0, 8)}`
		});
		return n.length === 0 ? r : [...n, ...r].sort((e, t) => t.startedAt.localeCompare(e.startedAt));
	}, [r, a]), { query: s, statuses: c, triggerKinds: l, range: u } = z(() => gu(t), [t]), d = (e, r) => {
		let i = new URLSearchParams(t);
		r ? i.set(e, r) : i.delete(e), n(i, { replace: !0 });
	}, f = (e) => {
		let t = new Set(c);
		t.has(e) ? t.delete(e) : t.add(e), d("status", t.size === 0 ? null : Array.from(t).join(","));
	}, p = (e) => {
		let t = new Set(l);
		t.has(e) ? t.delete(e) : t.add(e), d("trigger", t.size === 0 ? null : Array.from(t).join(","));
	}, m = (e) => {
		d("range", e === "7d" ? null : e);
	}, h = (e) => {
		d("q", e.length === 0 ? null : e);
	}, g = z(() => mu(o, {
		query: s,
		statuses: c,
		triggerKinds: l,
		range: u
	}), [
		o,
		s,
		c,
		l,
		u
	]), _ = z(() => {
		let e = {};
		for (let t of g) {
			let n = eu(Object.values(t.steps).filter((e) => !!e.llm).map((e) => ({
				model: void 0,
				tokensIn: e.llm?.tokensIn ?? 0,
				tokensOut: e.llm?.tokensOut ?? 0
			})));
			n.total.totalCostUsd > 0 && (e[t.id] = tu(n.total));
		}
		return e;
	}, [g]);
	return /* @__PURE__ */ W("div", {
		"data-testid": "all-runs-page",
		className: "p-6 flex flex-col gap-3",
		children: [
			/* @__PURE__ */ W("div", {
				className: "flex items-center justify-between mb-4",
				children: [/* @__PURE__ */ U("h2", {
					className: "m-0 text-[22px] font-bold text-text-primary",
					children: "Runs"
				}), /* @__PURE__ */ W("span", {
					className: "text-[13px] text-text-tertiary",
					children: [
						g.length,
						" run",
						g.length === 1 ? "" : "s"
					]
				})]
			}),
			/* @__PURE__ */ U(xu, {
				query: s,
				onQueryChange: h,
				statuses: c,
				onStatusToggle: f,
				triggerKinds: l,
				onTriggerToggle: p,
				range: u,
				onRangeChange: m,
				onClearFilters: () => n(new URLSearchParams(), { replace: !0 })
			}),
			g.length === 0 ? /* @__PURE__ */ U(T, {
				icon: "📋",
				title: "No runs yet",
				body: "Run a pipeline to see execution history here."
			}) : /* @__PURE__ */ U("div", {
				className: "overflow-x-auto",
				children: /* @__PURE__ */ W("table", {
					className: "w-full border-collapse text-[13px]",
					children: [/* @__PURE__ */ U("thead", { children: /* @__PURE__ */ W("tr", {
						className: "border-b border-border",
						children: [
							/* @__PURE__ */ U("th", {
								className: "px-3 py-2.5 text-xs text-text-secondary font-semibold text-left",
								children: "Pipeline"
							}),
							/* @__PURE__ */ U("th", {
								className: "px-3 py-2.5 text-xs text-text-secondary font-semibold text-left",
								children: "Run ID"
							}),
							/* @__PURE__ */ U("th", {
								className: "px-3 py-2.5 text-xs text-text-secondary font-semibold text-left",
								children: "Status"
							}),
							/* @__PURE__ */ U("th", {
								className: "px-3 py-2.5 text-xs text-text-secondary font-semibold text-left",
								children: "Trigger"
							}),
							/* @__PURE__ */ U("th", {
								className: "px-3 py-2.5 text-xs text-text-secondary font-semibold text-left",
								children: "Started"
							}),
							/* @__PURE__ */ U("th", {
								className: "px-3 py-2.5 text-xs text-text-secondary font-semibold text-right",
								children: "Duration"
							}),
							/* @__PURE__ */ U("th", {
								className: "px-3 py-2.5 text-xs text-text-secondary font-semibold text-right",
								children: "Cost"
							})
						]
					}) }), /* @__PURE__ */ U("tbody", { children: g.map((t) => /* @__PURE__ */ W("tr", {
						role: "button",
						tabIndex: 0,
						"aria-label": `Open run ${t.id.slice(0, 11)} of ${t.pipelineName}`,
						onClick: () => e(`/pipelines/${t.pipelineId}/runs/${t.id}`),
						onKeyDown: ie(() => e(`/pipelines/${t.pipelineId}/runs/${t.id}`)),
						className: "border-b border-border cursor-pointer hover:bg-surface-hover",
						children: [
							/* @__PURE__ */ U("td", {
								className: "px-3 py-2.5 text-xs text-text-secondary font-medium",
								children: t.pipelineName
							}),
							/* @__PURE__ */ U("td", {
								className: "px-3 py-2.5 text-xs text-text-secondary font-mono",
								children: t.id.slice(0, 11)
							}),
							/* @__PURE__ */ U("td", {
								className: "px-3 py-2.5 text-xs text-text-secondary",
								children: /* @__PURE__ */ U(S, {
									tone: Cu(t.status).tone,
									size: "sm",
									children: t.status
								})
							}),
							/* @__PURE__ */ U("td", {
								className: "px-3 py-2.5 text-xs text-text-secondary",
								children: t.triggerType ?? t.triggeredBy?.triggerType
							}),
							/* @__PURE__ */ U("td", {
								className: "px-3 py-2.5 text-xs text-text-secondary",
								children: ga(t.startedAt)
							}),
							/* @__PURE__ */ U("td", {
								className: "px-3 py-2.5 text-xs text-text-secondary text-right font-mono",
								children: t.completedAt ? ma(new Date(t.completedAt).getTime() - new Date(t.startedAt).getTime()) : "—"
							}),
							/* @__PURE__ */ U("td", {
								className: "px-3 py-2.5 text-xs text-text-secondary text-right font-mono",
								children: _[t.id] ?? "—"
							})
						]
					}, t.id)) })]
				})
			})
		]
	});
}
//#endregion
//#region src/components/pipelines/PipelineStatsPage.tsx
function wd(e) {
	let t = 0, n = 0;
	for (let r of Object.values(e.steps ?? {})) r.llm && (t += r.llm.tokensIn ?? 0, n += r.llm.tokensOut ?? 0);
	return {
		tokensIn: t,
		tokensOut: n
	};
}
function Td(e) {
	let t = /* @__PURE__ */ new Map();
	if (!e) return t;
	for (let n of e.nodes) n.data.type === "llm" && t.set(n.id, n.data.model);
	return t;
}
function Ed(e, t) {
	let n = [];
	for (let r of Object.values(e.steps ?? {})) r.llm && n.push({
		model: t.get(r.nodeId),
		tokensIn: r.llm.tokensIn,
		tokensOut: r.llm.tokensOut
	});
	return eu(n).total.totalCostUsd;
}
function Dd(e, t) {
	if (e.length === 0) return 0;
	let n = Math.ceil(e.length * t);
	return e[Math.min(e.length - 1, Math.max(0, n - 1))];
}
function Od(e) {
	return e < .01 ? `$${e.toFixed(4)}` : e < 1 ? `$${e.toFixed(3)}` : `$${e.toFixed(2)}`;
}
function kd(e) {
	let t = typeof e == "number" ? e : Number(e);
	return Number.isFinite(t) ? `$${t.toFixed(4).replace(/\.?0+$/, "")}` : "$0";
}
function Ad(e) {
	return e.slice(0, 8);
}
function jd(e) {
	let t = Date.now() - new Date(e).getTime();
	return t < 6e4 ? "just now" : t < 36e5 ? `${Math.floor(t / 6e4)}m ago` : t < 864e5 ? `${Math.floor(t / 36e5)}h ago` : t < 2592e5 ? `${Math.floor(t / 864e5)}d ago` : new Date(e).toLocaleDateString();
}
function Md(e, t) {
	let n = e.length, r = 0, i = 0, a = 0, o = [], s = 0, c = 0, l = 0, u = /* @__PURE__ */ new Map();
	for (let n of e) {
		n.status === "completed" ? r++ : n.status === "failed" ? i++ : n.status === "cancelled" && a++, typeof n.durationMs == "number" && n.durationMs > 0 && o.push(n.durationMs);
		let e = wd(n);
		if (s += e.tokensIn, c += e.tokensOut, l += Ed(n, t), n.error?.message) {
			let e = n.error.message.slice(0, 48), t = u.get(e);
			t ? (t.count += 1, n.startedAt > t.lastSeenAt && (t.lastSeenAt = n.startedAt, t.exampleRunId = n.id)) : u.set(e, {
				count: 1,
				lastSeenAt: n.startedAt,
				exampleRunId: n.id
			});
		}
	}
	o.sort((e, t) => e - t);
	let d = Dd(o, .5), f = Dd(o, .95), p = r + i + a, m = p === 0 ? 0 : Math.round(r / p * 100), h = [...u.entries()].map(([e, t]) => ({
		key: e,
		count: t.count,
		lastSeenAt: t.lastSeenAt,
		exampleRunId: t.exampleRunId
	})).sort((e, t) => t.count - e.count).slice(0, 5);
	return {
		totalCount: n,
		completedCount: r,
		failedCount: i,
		cancelledCount: a,
		finishedCount: p,
		successRatePct: m,
		medianMs: d,
		p95Ms: f,
		tokensIn: s,
		tokensOut: c,
		tokensPerRun: n === 0 ? 0 : Math.round((s + c) / n),
		totalCost: l,
		costPerRun: n === 0 ? 0 : l / n,
		failureBreakdown: h
	};
}
function Nd(e) {
	return e >= 90 ? "var(--color-success)" : e >= 70 ? "var(--color-warning)" : "var(--color-danger)";
}
function Pd(e) {
	let t = [...e].sort((e, t) => e.startedAt.localeCompare(t.startedAt)), n = [], r = [], i = [], a = 0, o = 0, s = 0;
	for (let e of t) {
		let t = new Date(e.startedAt).getTime();
		e.status === "completed" ? a += 1 : e.status === "failed" ? o += 1 : e.status === "cancelled" && (s += 1), n.push({
			x: t,
			y: a
		}), r.push({
			x: t,
			y: o
		}), i.push({
			x: t,
			y: s
		});
	}
	return [
		{
			label: "Completed",
			data: n,
			color: "var(--color-success)"
		},
		{
			label: "Failed",
			data: r,
			color: "var(--color-danger)"
		},
		{
			label: "Cancelled",
			data: i,
			color: "var(--color-border-field)"
		}
	];
}
function Fd(e, t) {
	let n = [...e].sort((e, t) => e.startedAt.localeCompare(t.startedAt)).filter((e) => typeof e.durationMs == "number" && e.durationMs > 0).map((e) => ({
		x: new Date(e.startedAt).getTime(),
		y: e.durationMs
	})), r = n.map((e) => ({
		x: e.x,
		y: t
	}));
	return [{
		label: "Duration (ms)",
		data: n,
		color: "var(--color-primary)"
	}, {
		label: "p50",
		data: r,
		color: "var(--color-text-tertiary)"
	}];
}
function Id(e) {
	let t = [...e].sort((e, t) => e.startedAt.localeCompare(t.startedAt)), n = [], r = [];
	for (let e of t) {
		let t = new Date(e.startedAt).getTime(), { tokensIn: i, tokensOut: a } = wd(e);
		n.push({
			x: t,
			y: i
		}), r.push({
			x: t,
			y: a
		});
	}
	return [{
		label: "Tokens in",
		data: n,
		color: "var(--color-primary)"
	}, {
		label: "Tokens out",
		data: r,
		color: "var(--color-success)"
	}];
}
function Ld() {
	let { pipelineId: e } = pt(), t = ft(), [r, i] = V(null), [a, o] = V([]), [s, c] = V("50");
	R(() => {
		e && (i(he(e)), o(Xe(e)));
	}, [e]);
	let l = z(() => {
		if (s === "all") return a;
		let e = Number(s);
		return a.slice(0, e);
	}, [a, s]), u = z(() => Td(r), [r]), d = z(() => Md(l, u), [l, u]), f = z(() => iu(l, r).filter((e) => e.totalCostUsd > 0 || e.stepCount > 0), [l, r]), p = z(() => su(a, r, 30), [a, r]), m = z(() => [{
		label: "Daily spend",
		data: p.map((e) => ({
			x: e.ts,
			y: e.totalCostUsd
		})),
		color: "var(--color-primary)"
	}], [p]);
	if (!e) return /* @__PURE__ */ U(dt, {
		to: "/pipelines",
		replace: !0
	});
	if (!r) return /* @__PURE__ */ U("div", {
		className: "p-8",
		children: /* @__PURE__ */ U(T, {
			icon: "🔍",
			title: "Pipeline not found",
			body: "It may have been deleted. Go back to the pipelines list.",
			actionLabel: "Back to pipelines",
			onAction: () => t("/pipelines")
		})
	});
	let h = l.length > 0;
	return /* @__PURE__ */ W("div", {
		className: "p-6 flex flex-col gap-4",
		children: [/* @__PURE__ */ W("div", {
			className: "flex items-center gap-3",
			children: [
				/* @__PURE__ */ W("button", {
					type: "button",
					onClick: () => t(`/pipelines/${e}`),
					className: "bg-transparent border-none text-primary cursor-pointer text-[13px] p-0",
					children: ["← ", r.name]
				}),
				/* @__PURE__ */ U("span", {
					className: "text-text-tertiary",
					children: "/"
				}),
				/* @__PURE__ */ U("span", {
					className: "text-lg font-bold text-text-primary",
					children: "Execution stats"
				}),
				/* @__PURE__ */ U("div", {
					className: "ml-auto flex gap-1.5",
					"data-testid": "stats-range",
					children: [
						"10",
						"50",
						"all"
					].map((e) => /* @__PURE__ */ U("button", {
						type: "button",
						onClick: () => c(e),
						className: n("px-2.5 py-1 text-xs font-medium rounded cursor-pointer font-[inherit]", s === e ? "border border-primary bg-primary text-white" : "border border-border bg-surface text-text-secondary"),
						children: e === "all" ? "All" : `Last ${e}`
					}, e))
				})
			]
		}), h ? /* @__PURE__ */ W(H, { children: [
			/* @__PURE__ */ W("div", {
				className: "grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3",
				"data-testid": "stats-kpis",
				children: [
					/* @__PURE__ */ W("div", {
						className: "bg-surface border border-border rounded-lg p-4 flex flex-col gap-1.5 min-w-0",
						children: [
							/* @__PURE__ */ U("div", {
								className: "text-[11px] font-semibold text-text-secondary uppercase tracking-[0.04em]",
								children: "Success rate"
							}),
							/* @__PURE__ */ U("div", {
								className: "text-[22px] font-bold font-mono",
								style: { color: d.finishedCount === 0 ? "var(--color-text-tertiary)" : Nd(d.successRatePct) },
								"data-testid": "stats-success-rate",
								children: d.finishedCount === 0 ? "—" : `${d.completedCount}/${d.finishedCount} (${d.successRatePct}%)`
							}),
							/* @__PURE__ */ W("div", {
								className: "text-xs text-text-tertiary font-mono",
								children: [
									d.failedCount,
									" failed · ",
									d.cancelledCount,
									" cancelled",
									d.totalCount > d.finishedCount ? ` · ${d.totalCount - d.finishedCount} in flight` : ""
								]
							})
						]
					}),
					/* @__PURE__ */ W("div", {
						className: "bg-surface border border-border rounded-lg p-4 flex flex-col gap-1.5 min-w-0",
						children: [
							/* @__PURE__ */ U("div", {
								className: "text-[11px] font-semibold text-text-secondary uppercase tracking-[0.04em]",
								children: "Median duration"
							}),
							/* @__PURE__ */ U("div", {
								className: "text-[22px] font-bold text-text-primary font-mono",
								children: ma(d.medianMs)
							}),
							/* @__PURE__ */ W("div", {
								className: "text-xs text-text-tertiary font-mono",
								children: ["p95 · ", ma(d.p95Ms)]
							})
						]
					}),
					/* @__PURE__ */ W("div", {
						className: "bg-surface border border-border rounded-lg p-4 flex flex-col gap-1.5 min-w-0",
						children: [
							/* @__PURE__ */ U("div", {
								className: "text-[11px] font-semibold text-text-secondary uppercase tracking-[0.04em]",
								children: "Total tokens"
							}),
							/* @__PURE__ */ W("div", {
								className: "text-[22px] font-bold text-text-primary font-mono",
								children: [
									d.tokensIn.toLocaleString(),
									" → ",
									d.tokensOut.toLocaleString()
								]
							}),
							/* @__PURE__ */ W("div", {
								className: "text-xs text-text-tertiary font-mono",
								children: [d.tokensPerRun.toLocaleString(), " avg per run"]
							})
						]
					}),
					/* @__PURE__ */ W("div", {
						className: "bg-surface border border-border rounded-lg p-4 flex flex-col gap-1.5 min-w-0",
						children: [
							/* @__PURE__ */ U("div", {
								className: "text-[11px] font-semibold text-text-secondary uppercase tracking-[0.04em]",
								children: "Total cost"
							}),
							/* @__PURE__ */ U("div", {
								className: "text-[22px] font-bold text-text-primary font-mono",
								children: Od(d.totalCost)
							}),
							/* @__PURE__ */ W("div", {
								className: "text-xs text-text-tertiary font-mono",
								children: [Od(d.costPerRun), " avg per run"]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ W("div", {
				className: "grid grid-cols-[repeat(auto-fit,minmax(360px,1fr))] gap-3",
				"data-testid": "stats-cost-row",
				children: [/* @__PURE__ */ W("div", {
					className: "bg-surface border border-border rounded-lg p-4 flex flex-col gap-2 min-w-0",
					"data-testid": "stats-cost-by-node",
					children: [/* @__PURE__ */ U("div", {
						className: "text-[13px] font-semibold text-text-primary",
						children: "Cost by node"
					}), f.length === 0 ? /* @__PURE__ */ U("div", {
						className: "text-xs text-text-tertiary py-2",
						children: "No per-node cost data in this range."
					}) : /* @__PURE__ */ U(x, {
						data: f.map((e) => ({
							label: e.label,
							cost: Number(e.totalCostUsd.toFixed(6))
						})),
						xKey: "label",
						yKey: "cost",
						height: 200,
						color: "var(--color-primary)",
						yFormat: kd
					})]
				}), /* @__PURE__ */ W("div", {
					className: "bg-surface border border-border rounded-lg p-4 flex flex-col gap-2 min-w-0",
					"data-testid": "stats-cost-trend-30d",
					children: [/* @__PURE__ */ U("div", {
						className: "text-[13px] font-semibold text-text-primary",
						children: "30-day spend trend"
					}), /* @__PURE__ */ U(b, {
						series: m,
						height: 200,
						xFormat: (e) => new Date(Number(e)).toLocaleDateString(void 0, {
							month: "short",
							day: "numeric"
						}),
						yFormat: kd
					})]
				})]
			}),
			/* @__PURE__ */ W("div", {
				className: "grid grid-cols-[repeat(auto-fit,minmax(360px,1fr))] gap-3",
				children: [
					/* @__PURE__ */ W("div", {
						className: "bg-surface border border-border rounded-lg p-4 flex flex-col gap-2 min-w-0",
						children: [/* @__PURE__ */ U("div", {
							className: "text-[13px] font-semibold text-text-primary",
							children: "Runs over time (cumulative)"
						}), /* @__PURE__ */ U(b, {
							series: Pd(l),
							height: 180,
							xFormat: (e) => new Date(Number(e)).toLocaleDateString()
						})]
					}),
					/* @__PURE__ */ W("div", {
						className: "bg-surface border border-border rounded-lg p-4 flex flex-col gap-2 min-w-0",
						children: [/* @__PURE__ */ U("div", {
							className: "text-[13px] font-semibold text-text-primary",
							children: "Duration over time"
						}), /* @__PURE__ */ U(b, {
							series: Fd(l, d.medianMs),
							height: 180,
							xFormat: (e) => new Date(Number(e)).toLocaleDateString(),
							yFormat: (e) => ma(e)
						})]
					}),
					/* @__PURE__ */ W("div", {
						className: "bg-surface border border-border rounded-lg p-4 flex flex-col gap-2 min-w-0",
						children: [/* @__PURE__ */ U("div", {
							className: "text-[13px] font-semibold text-text-primary",
							children: "Token usage over time"
						}), /* @__PURE__ */ U(b, {
							series: Id(l),
							height: 180,
							xFormat: (e) => new Date(Number(e)).toLocaleDateString(),
							yFormat: (e) => e.toLocaleString()
						})]
					}),
					/* @__PURE__ */ W("div", {
						className: "bg-surface border border-border rounded-lg p-4 flex flex-col gap-2 min-w-0",
						"data-testid": "stats-failure-breakdown",
						children: [/* @__PURE__ */ U("div", {
							className: "text-[13px] font-semibold text-text-primary",
							children: "Failure breakdown (top 5)"
						}), d.failureBreakdown.length === 0 ? /* @__PURE__ */ U("div", {
							className: "text-xs text-text-tertiary py-2",
							children: "No failures in this range."
						}) : /* @__PURE__ */ W("table", {
							className: "w-full border-collapse text-xs",
							children: [/* @__PURE__ */ U("thead", { children: /* @__PURE__ */ U("tr", {
								className: "text-left",
								children: [
									"Error",
									"Count",
									"Last seen",
									"Example"
								].map((e) => /* @__PURE__ */ U("th", {
									className: "px-2 py-1.5 text-[10px] font-semibold text-text-secondary uppercase tracking-[0.04em] border-b border-border",
									children: e
								}, e))
							}) }), /* @__PURE__ */ U("tbody", { children: d.failureBreakdown.map((n) => /* @__PURE__ */ W("tr", {
								className: "border-b border-border",
								children: [
									/* @__PURE__ */ U("td", {
										className: "px-2 py-1.5 text-text-primary max-w-[240px] overflow-hidden text-ellipsis whitespace-nowrap",
										title: n.key,
										children: n.key
									}),
									/* @__PURE__ */ U("td", {
										className: "px-2 py-1.5 font-mono text-text-primary",
										children: n.count
									}),
									/* @__PURE__ */ U("td", {
										className: "px-2 py-1.5 text-text-secondary",
										children: jd(n.lastSeenAt)
									}),
									/* @__PURE__ */ U("td", {
										className: "px-2 py-1.5",
										children: /* @__PURE__ */ W("button", {
											type: "button",
											onClick: () => t(`/pipelines/${e}/runs/${n.exampleRunId}`),
											className: "bg-transparent border-none text-primary cursor-pointer text-xs font-mono p-0",
											children: [Ad(n.exampleRunId), " →"]
										})
									})
								]
							}, n.key)) })]
						})]
					})
				]
			})
		] }) : /* @__PURE__ */ U(T, {
			icon: "📊",
			title: "No runs yet",
			body: "No runs yet. Trigger this pipeline to see stats."
		})]
	});
}
//#endregion
//#region src/components/pipelines/PendingApprovalsPage.tsx
function Rd(e) {
	let t = new Date(e).getTime();
	if (!Number.isFinite(t) || t <= 0) return "—";
	let n = Math.floor((Date.now() - t) / 1e3);
	if (n < 10) return "just now";
	if (n < 60) return `${n}s ago`;
	let r = Math.floor(n / 60);
	if (r < 60) return `${r}m ago`;
	let i = Math.floor(r / 60);
	return i < 24 ? `${i}h ago` : `${Math.floor(i / 24)}d ago`;
}
function zd(e) {
	return e.length <= 6 ? e : e.slice(-6);
}
function Bd({ approver: e, idx: t }) {
	let n = e.type === "role" ? "🎖" : "👤";
	return /* @__PURE__ */ W("span", {
		className: "inline-flex items-center gap-1 bg-info-bg text-info-fg px-2 py-0.5 rounded-sm text-[11px] font-semibold leading-[1.4] whitespace-nowrap",
		children: [/* @__PURE__ */ U("span", {
			"aria-hidden": !0,
			children: n
		}), /* @__PURE__ */ U("span", { children: e.value })]
	}, `${e.type}:${e.value}:${t}`);
}
function Vd(e, t) {
	let n = [];
	if (e) {
		let t = e.steps;
		for (let [t, r] of Object.entries(e)) t !== "steps" && r != null && r !== "" && (typeof r == "string" ? n.push({
			label: t,
			value: r
		}) : typeof r == "object" && n.push({
			label: t,
			value: JSON.stringify(r, null, 2)
		}));
		if (t && typeof t == "object") for (let [e, r] of Object.entries(t)) {
			if (r == null) continue;
			let t = r;
			typeof t.response == "string" && t.response.trim() && n.push({
				label: `Step ${e.slice(0, 8)} response`,
				value: t.response
			});
		}
	}
	if (n.length === 0 && t) for (let [e, r] of Object.entries(t)) {
		let e = r.output;
		if (e) for (let [t, r] of Object.entries(e)) r != null && r !== "" && t !== "tokensIn" && t !== "tokensOut" && typeof r == "string" && r.trim() && n.push({
			label: t,
			value: r
		});
	}
	return n;
}
function Hd({ row: e, onSubmit: t, onOpenPipeline: n }) {
	let [r, i] = V(""), a = L((e) => {
		t(e, r.trim()), i("");
	}, [r, t]), o = e.requiredCount ?? 1, s = e.recordedCount ?? 0, c = z(() => Vd(e.runContext, e.runSteps), [e.runContext, e.runSteps]);
	return /* @__PURE__ */ W("div", {
		"data-testid": `approval-card-${e.runId}`,
		className: "flex flex-col gap-3 p-4 bg-surface border border-border rounded-[10px]",
		children: [
			/* @__PURE__ */ W("div", {
				className: "flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ W("div", {
					className: "flex items-center gap-2.5 min-w-0",
					children: [/* @__PURE__ */ U("span", {
						className: "text-lg",
						"aria-hidden": !0,
						children: "✋"
					}), /* @__PURE__ */ W("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ U("button", {
							type: "button",
							onClick: n,
							"data-testid": `open-pipeline-${e.pipelineId}`,
							className: "text-sm font-semibold text-text-primary bg-transparent border-none p-0 cursor-pointer font-[inherit] text-left overflow-hidden text-ellipsis whitespace-nowrap max-w-full",
							title: e.pipelineName,
							children: e.pipelineName
						}), /* @__PURE__ */ W("div", {
							className: "font-mono text-[11px] text-text-tertiary",
							children: ["run #", zd(e.runId)]
						})]
					})]
				}), /* @__PURE__ */ U("span", {
					className: "text-xs text-text-tertiary whitespace-nowrap",
					children: Rd(e.requestedAt)
				})]
			}),
			e.message ? /* @__PURE__ */ U("div", {
				"data-testid": `approval-message-${e.runId}`,
				className: "text-[13px] text-text-secondary bg-surface-inset px-3 py-2 rounded-md leading-normal",
				children: e.message
			}) : null,
			/* @__PURE__ */ W("div", {
				className: "flex flex-col gap-1.5 px-3 py-2.5 bg-surface-inset rounded-md border border-border",
				children: [/* @__PURE__ */ U("div", {
					className: "text-[11px] font-semibold text-text-tertiary uppercase tracking-[0.5px]",
					children: c.length > 0 ? "Context" : e.runFetchError ? "Review context unavailable" : "Run details"
				}), c.length === 0 && e.runFetchError ? /* @__PURE__ */ W("div", {
					"data-testid": `approval-context-error-${e.runId}`,
					className: "flex flex-col gap-0.5 px-2.5 py-2 rounded-md bg-danger-bg border border-danger-border",
					children: [
						/* @__PURE__ */ U("div", {
							className: "text-[11px] font-semibold text-danger-fg",
							children: "Couldn't load this run — decide with caution"
						}),
						/* @__PURE__ */ U("div", {
							className: "text-[11px] text-danger-fg leading-normal",
							children: "The pipeline API is unreachable, so what this step produced is unknown. This is not the same as there being nothing to review."
						}),
						/* @__PURE__ */ U("div", {
							className: "font-mono text-[11px] text-danger-fg break-words",
							children: e.runFetchError
						})
					]
				}) : c.length > 0 ? c.map(({ label: e, value: t }) => /* @__PURE__ */ W("div", {
					className: "flex flex-col gap-0.5",
					children: [/* @__PURE__ */ U("div", {
						className: "text-[11px] font-medium text-text-secondary",
						children: e
					}), /* @__PURE__ */ U("pre", {
						className: "m-0 text-xs leading-normal text-text-primary whitespace-pre-wrap break-words font-[inherit] max-h-[120px] overflow-auto",
						children: t
					})]
				}, e)) : /* @__PURE__ */ W(H, { children: [
					/* @__PURE__ */ W("div", {
						className: "flex flex-col gap-0.5",
						children: [/* @__PURE__ */ U("div", {
							className: "text-[11px] font-medium text-text-secondary",
							children: "Run"
						}), /* @__PURE__ */ U("pre", {
							className: "m-0 text-xs leading-normal text-text-primary whitespace-pre-wrap break-words font-[inherit] max-h-[120px] overflow-auto",
							children: e.runId
						})]
					}),
					/* @__PURE__ */ W("div", {
						className: "flex flex-col gap-0.5",
						children: [/* @__PURE__ */ U("div", {
							className: "text-[11px] font-medium text-text-secondary",
							children: "Step"
						}), /* @__PURE__ */ U("pre", {
							className: "m-0 text-xs leading-normal text-text-primary whitespace-pre-wrap break-words font-[inherit] max-h-[120px] overflow-auto",
							children: e.stepId
						})]
					}),
					/* @__PURE__ */ W("div", {
						className: "flex flex-col gap-0.5",
						children: [/* @__PURE__ */ U("div", {
							className: "text-[11px] font-medium text-text-secondary",
							children: "Status"
						}), /* @__PURE__ */ U("pre", {
							className: "m-0 text-xs leading-normal text-text-primary whitespace-pre-wrap break-words font-[inherit] max-h-[120px] overflow-auto",
							children: "Awaiting your approval — upstream steps haven't produced reviewable output yet (or this approval node runs in parallel with them)."
						})]
					})
				] })]
			}),
			/* @__PURE__ */ W("div", {
				className: "flex flex-wrap gap-1.5 items-center",
				children: [
					/* @__PURE__ */ U("span", {
						className: "text-[11px] text-text-tertiary mr-1",
						children: "Approvers:"
					}),
					e.approvers.length === 0 ? /* @__PURE__ */ U("span", {
						className: "text-[11px] text-text-tertiary",
						children: "(anyone)"
					}) : e.approvers.map((e, t) => /* @__PURE__ */ U(Bd, {
						approver: e,
						idx: t
					}, t)),
					o > 1 ? /* @__PURE__ */ W("span", {
						className: "text-[11px] text-text-tertiary ml-1",
						children: [
							"(",
							s,
							"/",
							o,
							" approvals)"
						]
					}) : null
				]
			}),
			/* @__PURE__ */ U(A, {
				"data-testid": `approval-comment-${e.runId}`,
				value: r,
				onChange: (e) => i(e.target.value),
				placeholder: "Optional comment…",
				rows: 2,
				className: "w-full",
				"aria-label": "Approval comment"
			}),
			/* @__PURE__ */ W("div", {
				className: "flex gap-2 justify-end",
				children: [/* @__PURE__ */ U("button", {
					"data-testid": `reject-${e.runId}`,
					onClick: () => a("reject"),
					className: "px-3.5 py-1.5 text-[13px] font-semibold bg-danger text-white border-none rounded-md font-[inherit] cursor-pointer",
					children: "Reject"
				}), /* @__PURE__ */ U("button", {
					"data-testid": `approve-${e.runId}`,
					onClick: () => a("approve"),
					className: "px-3.5 py-1.5 text-[13px] font-semibold bg-success text-white border-none rounded-md font-[inherit] cursor-pointer shrink-0",
					children: "Approve"
				})]
			})
		]
	});
}
function Ud() {
	let e = ft(), { approvals: t, isLoading: n, error: r, retry: i } = et(), { resolveApproval: a, runs: o } = $e(), [s, c] = V(() => /* @__PURE__ */ new Set());
	R(() => {
		if (s.size === 0) return;
		let e = new Set(t.map((e) => `${e.runId}::${e.stepId}`)), n = !1, r = new Set(s);
		for (let t of s) e.has(t) || (r.delete(t), n = !0);
		n && c(r);
	}, [t, s]);
	let [l, u] = V({}), [d, f] = V({}), p = B(/* @__PURE__ */ new Set());
	R(() => {
		for (let e of t) {
			if (p.current.has(e.runId)) continue;
			p.current.add(e.runId);
			let { runId: t } = e;
			Oe(e.pipelineId, t).then((e) => {
				e && u((n) => ({
					...n,
					[t]: {
						context: e.context,
						steps: e.steps
					}
				}));
			}, (e) => {
				f((n) => ({
					...n,
					[t]: e instanceof Error ? e.message : String(e)
				}));
			});
		}
	}, [t]);
	let m = z(() => {
		let e = /* @__PURE__ */ new Map(), n = [];
		for (let r of t) {
			let t = `${r.runId}::${r.stepId}`;
			if (s.has(t)) continue;
			let i = e.get(r.pipelineId);
			i === void 0 && (i = he(r.pipelineId), e.set(r.pipelineId, i));
			let a = i?.name ?? (r.pipelineId ? `Pipeline ${r.pipelineId.slice(0, 8)}` : "Unknown pipeline"), c = l[r.runId]?.context ?? o[r.runId]?.context, u = l[r.runId]?.steps, f = c ? void 0 : d[r.runId];
			n.push({
				...r,
				pipelineName: a,
				runContext: c,
				runSteps: u,
				runFetchError: f
			});
		}
		return n;
	}, [
		t,
		s,
		o,
		l,
		d
	]), h = L((t, n, r, i, o) => {
		a(n, r, i, o || void 0), c((e) => {
			let t = new Set(e);
			return t.add(`${n}::${r}`), t;
		}), fetch(`/api/pipelines/${encodeURIComponent(n)}/approvals`, {
			method: "POST",
			credentials: "same-origin",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				stepId: r,
				decision: i,
				...o ? { comment: o } : {}
			})
		}).catch((e) => {
			console.error("[approvals] POST failed", e);
		}), e(`/pipelines/${t}/runs/${n}`);
	}, [a, e]), g = m.length;
	return /* @__PURE__ */ W("div", {
		"data-testid": "pending-approvals-page",
		className: "flex flex-col h-full overflow-hidden bg-surface-inset font-[inherit]",
		children: [/* @__PURE__ */ U("div", {
			className: "h-14 shrink-0 flex items-center justify-between px-6 border-b border-border bg-surface sticky top-0 z-[2]",
			children: /* @__PURE__ */ W("div", {
				className: "flex items-center gap-2.5",
				children: [/* @__PURE__ */ U("div", {
					className: "text-lg font-bold text-text-primary",
					children: "Pending approvals"
				}), /* @__PURE__ */ U(S, {
					"data-testid": "pending-count",
					tone: g > 0 ? "warning" : "neutral",
					size: "sm",
					children: g
				})]
			})
		}), /* @__PURE__ */ W("div", {
			className: "flex-1 overflow-y-auto p-5",
			children: [r ? /* @__PURE__ */ W("div", {
				"data-testid": "approvals-error",
				role: "alert",
				className: "px-4 py-3 bg-danger-bg border border-danger text-danger-fg rounded-lg flex items-center justify-between gap-3 mb-4",
				children: [/* @__PURE__ */ U("span", {
					className: "text-[13px] font-medium",
					children: "Couldn't load pending approvals. Try again."
				}), /* @__PURE__ */ U("button", {
					"data-testid": "approvals-retry",
					onClick: i,
					className: "px-3.5 py-1.5 text-[13px] font-medium bg-surface text-danger-fg border border-danger rounded-md cursor-pointer font-[inherit]",
					children: "Retry"
				})]
			}) : null, n && g === 0 ? /* @__PURE__ */ W("div", {
				"data-testid": "approvals-loading",
				className: "flex flex-col gap-3 max-w-[680px] mx-auto",
				children: [
					/* @__PURE__ */ U(ee, { height: 140 }),
					/* @__PURE__ */ U(ee, { height: 140 }),
					/* @__PURE__ */ U(ee, { height: 140 })
				]
			}) : g === 0 && !r ? /* @__PURE__ */ U(T, {
				icon: "✋",
				title: "No pending approvals",
				body: "When a pipeline reaches an approval step, it'll show up here.",
				testId: "approvals-empty"
			}) : /* @__PURE__ */ U("div", {
				"data-testid": "approvals-list",
				className: "flex flex-col gap-3 max-w-[680px] mx-auto",
				children: m.map((t) => /* @__PURE__ */ U(Hd, {
					row: t,
					onOpenPipeline: () => e(`/pipelines/${t.pipelineId}`),
					onSubmit: (e, n) => h(t.pipelineId, t.runId, t.stepId, e, n)
				}, `${t.runId}:${t.stepId}`))
			})]
		})]
	});
}
//#endregion
//#region src/components/pipelines/judge/VerdictPanel.tsx
function Wd(e) {
	return e === "pass" ? "success" : e === "fail" ? "danger" : "warning";
}
function Gd({ result: e, className: t }) {
	let r = Wd(e.overallVerdict), i = r === "success" ? "PASS" : r === "danger" ? "FAIL" : "INCONCLUSIVE", a = e.rubricSnapshot.passThreshold ?? .5;
	return /* @__PURE__ */ W("section", {
		className: n("flex flex-col gap-2 rounded-lg border border-border bg-surface p-3", t),
		children: [/* @__PURE__ */ W("div", {
			className: "flex flex-wrap items-center gap-2",
			children: [
				/* @__PURE__ */ W("span", {
					className: "font-mono text-[11px] font-semibold uppercase tracking-wide text-text-secondary",
					children: [
						e.rubricSnapshot.id,
						" v",
						e.rubricSnapshot.version
					]
				}),
				/* @__PURE__ */ W(S, {
					tone: r,
					size: "sm",
					children: [
						i,
						" · ",
						e.overallVerdict
					]
				}),
				/* @__PURE__ */ U("span", {
					className: "text-[11px] text-text-tertiary",
					children: "·"
				}),
				/* @__PURE__ */ U("span", {
					className: "font-mono text-[11px] text-text-tertiary",
					children: e.model
				}),
				/* @__PURE__ */ U("span", {
					className: "text-[11px] text-text-tertiary",
					children: "·"
				}),
				/* @__PURE__ */ W("span", {
					className: "font-mono text-[11px] text-text-tertiary",
					children: ["mode: ", e.mode]
				}),
				typeof e.confidence == "number" ? /* @__PURE__ */ W("span", {
					className: "ml-auto font-mono text-[11px] text-text-tertiary",
					children: [
						"confidence ",
						(e.confidence * 100).toFixed(0),
						"%"
					]
				}) : null
			]
		}), /* @__PURE__ */ W("div", {
			className: "flex items-center gap-3",
			children: [/* @__PURE__ */ U("span", {
				className: "text-[11px] font-medium uppercase text-text-tertiary",
				children: "overall"
			}), /* @__PURE__ */ U(o, {
				value: e.overallScore,
				threshold: a,
				tone: r === "warning" ? "warning" : r,
				size: "lg",
				ariaLabel: `Overall judge score ${(e.overallScore * 100).toFixed(0)}% — ${i}`
			})]
		})]
	});
}
//#endregion
//#region src/components/pipelines/judge/CriteriaPanel.tsx
function Kd({ result: e, className: t }) {
	if (!e.criteria || e.criteria.length === 0) return null;
	let r = /* @__PURE__ */ new Map();
	for (let t of e.rubricSnapshot.criteria) r.set(t.id, t);
	return /* @__PURE__ */ W("section", {
		className: n("flex flex-col gap-1.5", t),
		children: [/* @__PURE__ */ W("h4", {
			className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary",
			children: [
				"Criteria (",
				e.criteria.length,
				")"
			]
		}), /* @__PURE__ */ U("ul", {
			className: "flex flex-col gap-1.5",
			children: e.criteria.map((e) => /* @__PURE__ */ U(qd, {
				score: e,
				def: r.get(e.criterionId)
			}, e.criterionId))
		})]
	});
}
function qd({ score: e, def: t }) {
	let n = e.passed ? "success" : "danger", r = e.passed ? "PASS" : "FAIL", i = t?.scale ?? "0-1";
	return /* @__PURE__ */ W("li", {
		className: "flex flex-col gap-1.5 rounded-lg border border-border bg-surface p-2.5",
		children: [
			/* @__PURE__ */ W("div", {
				className: "flex flex-wrap items-center gap-1.5",
				children: [
					/* @__PURE__ */ U("span", {
						className: "font-mono text-[11px] font-semibold text-text-primary",
						children: e.criterionId
					}),
					/* @__PURE__ */ W("span", {
						className: "font-mono text-[10px] uppercase text-text-tertiary",
						children: [
							"[",
							i,
							"]"
						]
					}),
					/* @__PURE__ */ U(S, {
						tone: n,
						size: "sm",
						children: r
					}),
					/* @__PURE__ */ W("span", {
						className: "ml-auto font-mono text-[11px] text-text-tertiary",
						children: ["raw: ", String(e.rawScore)]
					})
				]
			}),
			/* @__PURE__ */ U(o, {
				value: e.score,
				threshold: t?.failThreshold ?? .5,
				tone: n,
				size: "sm",
				ariaLabel: `Criterion ${e.criterionId} score ${(e.score * 100).toFixed(0)}% — ${r}`
			}),
			t?.prompt ? /* @__PURE__ */ W("p", {
				className: "text-[12px] italic leading-snug text-text-tertiary",
				children: [
					"“",
					t.prompt,
					"”"
				]
			}) : null,
			e.rationale ? /* @__PURE__ */ U("p", {
				className: "text-[13px] leading-snug text-text-primary",
				children: e.rationale
			}) : null
		]
	});
}
//#endregion
//#region src/components/pipelines/judge/JudgmentApiContext.tsx
var Jd = st(null);
function Yd({ value: e, children: t }) {
	return /* @__PURE__ */ U(Jd.Provider, {
		value: e,
		children: t
	});
}
function Xd() {
	return lt(Jd);
}
//#endregion
//#region src/components/pipelines/judge/JudgmentResultViewer.tsx
function Zd({ result: e, showVerdict: t = !0, showCriteria: r = !0, showMetadata: i = !0, showRawText: a = !1, className: o }) {
	let s = Xd(), [c, l] = V(!1), [u, d] = V(null), [f, p] = V(!1), [m, h] = V(null), g = B(!0), _ = B(null);
	R(() => (g.current = !0, () => {
		g.current = !1;
	}), []), R(() => {
		c && (e.rawModelText || e.rawTextTruncated && s && _.current !== e.judgmentId && (_.current = e.judgmentId, d(null), h(null), p(!0), (async () => {
			try {
				let t = await s.fetchRawText(e.judgmentId);
				if (!g.current) return;
				d(t ?? ""), h(null);
			} catch (e) {
				if (!g.current) return;
				h(e instanceof Error ? e : Error(String(e)));
			} finally {
				g.current && p(!1);
			}
		})()));
	}, [
		c,
		e.rawModelText,
		e.rawTextTruncated,
		e.judgmentId,
		s
	]);
	let v = e.rawModelText ?? u ?? null, y = !!e.rawModelText || !!e.rawTextTruncated;
	return /* @__PURE__ */ W("div", {
		className: n("flex w-full flex-col gap-3 text-text-primary", o),
		children: [
			t ? /* @__PURE__ */ U(Gd, { result: e }) : null,
			r ? /* @__PURE__ */ U(Kd, { result: e }) : null,
			i ? /* @__PURE__ */ W("section", {
				className: "flex flex-wrap items-center gap-2 text-[11px] text-text-tertiary",
				children: [
					/* @__PURE__ */ W("span", { children: [
						"tokens ",
						/* @__PURE__ */ U("span", {
							className: "font-mono",
							children: e.tokensIn
						}),
						" in /",
						" ",
						/* @__PURE__ */ U("span", {
							className: "font-mono",
							children: e.tokensOut
						}),
						" out"
					] }),
					e.cacheReadTokens && e.cacheReadTokens > 0 ? /* @__PURE__ */ W(H, { children: [/* @__PURE__ */ U("span", { children: "·" }), /* @__PURE__ */ W("span", { children: [
						"cache ",
						/* @__PURE__ */ U("span", {
							className: "font-mono",
							children: e.cacheReadTokens
						}),
						" read"
					] })] }) : null,
					/* @__PURE__ */ U("span", { children: "·" }),
					/* @__PURE__ */ W("span", { children: [
						"latency ",
						/* @__PURE__ */ U("span", {
							className: "font-mono",
							children: e.latencyMs
						}),
						"ms"
					] }),
					/* @__PURE__ */ U("span", { children: "·" }),
					/* @__PURE__ */ W("span", { children: ["cost ", /* @__PURE__ */ W("span", {
						className: "font-mono",
						children: ["$", e.costUsd.toFixed(4)]
					})] }),
					/* @__PURE__ */ U("span", {
						className: "ml-auto font-mono",
						children: e.judgedAt
					})
				]
			}) : null,
			a && y ? /* @__PURE__ */ W("section", {
				className: "flex flex-col gap-1.5",
				children: [/* @__PURE__ */ W("button", {
					type: "button",
					onClick: () => l((e) => !e),
					className: "self-start text-[11px] font-medium text-text-tertiary hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 rounded",
					"aria-expanded": c,
					children: [c ? "▾" : "▸", " Raw model output"]
				}), c ? /* @__PURE__ */ U(Qd, {
					text: v,
					loading: f,
					error: m,
					fallbackHint: e.rawTextTruncated && !s ? "Raw text was spilled to S3 but no JudgmentApi provider is wired." : null
				}) : null]
			}) : null
		]
	});
}
function Qd({ text: e, loading: t, error: n, fallbackHint: r }) {
	return t ? /* @__PURE__ */ U("div", {
		className: "rounded-lg border border-border bg-surface-panel p-2 text-[11px] text-text-tertiary",
		children: "Loading raw text…"
	}) : n ? /* @__PURE__ */ W("div", {
		className: "rounded-lg border border-state-failed bg-danger-bg p-2 text-[11px] text-text-primary",
		children: ["Failed to fetch raw text: ", n.message]
	}) : e === null || e.length === 0 ? /* @__PURE__ */ U("div", {
		className: "rounded-lg border border-border bg-surface-panel p-2 text-[11px] text-text-tertiary",
		children: r ?? "Raw text not available."
	}) : /* @__PURE__ */ U("pre", {
		className: "overflow-x-auto rounded-lg border border-border bg-surface-panel p-2 font-mono text-[11px] leading-snug text-text-secondary",
		children: e
	});
}
//#endregion
//#region src/components/pipelines/judge/AggregateSummaryCard.tsx
function $d({ aggregate: e, className: t }) {
	let r = e.numJudgments > 0 ? e.numPassed / e.numJudgments : 0, i = e.numJudgments > 0 ? e.sumOverallScore / e.numJudgments : 0, a = r >= .9 ? "success" : r >= .6 ? "warning" : "danger", s = a === "success" ? "HEALTHY" : a === "warning" ? "MIXED" : "FAILING";
	return /* @__PURE__ */ W("section", {
		className: n("flex flex-col gap-2 rounded-lg border border-border bg-surface p-3", t),
		children: [
			/* @__PURE__ */ W("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [
					/* @__PURE__ */ U("span", {
						className: "font-mono text-[11px] font-semibold uppercase tracking-wide text-text-secondary",
						children: e.dayBucket
					}),
					/* @__PURE__ */ W(S, {
						tone: a,
						size: "sm",
						children: [
							s,
							" · ",
							(r * 100).toFixed(0),
							"% pass"
						]
					}),
					/* @__PURE__ */ W("span", {
						className: "ml-auto font-mono text-[11px] text-text-tertiary",
						children: [e.numJudgments, " judgments"]
					})
				]
			}),
			/* @__PURE__ */ W("div", {
				className: "flex items-center gap-3",
				children: [/* @__PURE__ */ U("span", {
					className: "text-[11px] font-medium uppercase text-text-tertiary",
					children: "mean score"
				}), /* @__PURE__ */ U(o, {
					value: i,
					tone: a === "warning" ? "warning" : a,
					size: "md",
					ariaLabel: `Mean score ${(i * 100).toFixed(0)}% across ${e.numJudgments} judgments`
				})]
			}),
			/* @__PURE__ */ W("div", {
				className: "flex flex-wrap items-center gap-2 text-[11px] text-text-tertiary",
				children: [
					/* @__PURE__ */ W("span", { children: [
						"tokens ",
						/* @__PURE__ */ U("span", {
							className: "font-mono",
							children: e.sumTokensIn
						}),
						" in /",
						" ",
						/* @__PURE__ */ U("span", {
							className: "font-mono",
							children: e.sumTokensOut
						}),
						" out"
					] }),
					/* @__PURE__ */ U("span", { children: "·" }),
					/* @__PURE__ */ W("span", { children: ["cost ", /* @__PURE__ */ W("span", {
						className: "font-mono",
						children: ["$", e.sumCostUsd.toFixed(4)]
					})] }),
					typeof e.minOverallScore == "number" && typeof e.maxOverallScore == "number" ? /* @__PURE__ */ W(H, { children: [/* @__PURE__ */ U("span", { children: "·" }), /* @__PURE__ */ W("span", { children: [
						"range ",
						/* @__PURE__ */ U("span", {
							className: "font-mono",
							children: e.minOverallScore.toFixed(2)
						}),
						"–",
						/* @__PURE__ */ U("span", {
							className: "font-mono",
							children: e.maxOverallScore.toFixed(2)
						})
					] })] }) : null,
					/* @__PURE__ */ U("span", { children: "·" }),
					/* @__PURE__ */ W("span", {
						className: "font-mono",
						children: [
							e.numPassed,
							" pass / ",
							e.numFailed,
							" fail"
						]
					})
				]
			})
		]
	});
}
//#endregion
//#region src/components/pipelines/judge/JudgmentTrendChart.tsx
function ef({ aggregates: e, sortOrder: t = "desc", caption: r, loading: i = !1, className: a }) {
	let o = z(() => {
		let n = e.slice();
		return n.sort((e, t) => e.dayBucket.localeCompare(t.dayBucket)), t === "desc" && n.reverse(), n;
	}, [e, t]), s = z(() => e.slice().sort((e, t) => e.dayBucket.localeCompare(t.dayBucket)).map((e) => e.numJudgments > 0 ? e.numPassed / e.numJudgments : 0), [e]);
	if (e.length === 0) return /* @__PURE__ */ U("section", {
		className: n("flex min-h-[120px] w-full flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-border bg-surface-panel p-4 text-text-tertiary", a),
		children: /* @__PURE__ */ U("span", {
			className: "text-[12px]",
			children: i ? "Loading trends…" : "No judgment activity in range."
		})
	});
	let c = e.reduce((e, t) => e + t.numJudgments, 0), l = e.reduce((e, t) => e + t.numPassed, 0), u = e.reduce((e, t) => e + t.sumCostUsd, 0), d = c > 0 ? l / c : 0;
	return /* @__PURE__ */ W("section", {
		className: n("flex w-full flex-col gap-2", a),
		children: [
			/* @__PURE__ */ W("header", {
				className: "flex flex-wrap items-center gap-2",
				children: [
					/* @__PURE__ */ U("span", {
						className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary",
						children: r ?? `Judgment trend — ${e.length} days`
					}),
					/* @__PURE__ */ W(S, {
						tone: d >= .9 ? "success" : d >= .6 ? "warning" : "danger",
						size: "sm",
						children: [
							(d * 100).toFixed(0),
							"% pass · ",
							c,
							" judgments"
						]
					}),
					/* @__PURE__ */ W("span", {
						className: "ml-auto font-mono text-[11px] text-text-tertiary",
						children: ["total cost $", u.toFixed(4)]
					})
				]
			}),
			/* @__PURE__ */ W("div", {
				className: "flex items-center gap-3",
				children: [/* @__PURE__ */ U("span", {
					className: "text-[11px] font-medium uppercase text-text-tertiary",
					children: "pass-rate"
				}), /* @__PURE__ */ U(p, {
					points: s,
					yMin: 0,
					yMax: 1,
					width: 240,
					height: 36,
					ariaLabel: `Pass-rate over ${s.length} days, ending at ${(s[s.length - 1] * 100).toFixed(0)}%`
				})]
			}),
			/* @__PURE__ */ W("table", {
				className: "w-full border-collapse text-[12px]",
				children: [/* @__PURE__ */ U("thead", { children: /* @__PURE__ */ W("tr", {
					className: "text-left text-[11px] uppercase tracking-wide text-text-tertiary",
					children: [
						/* @__PURE__ */ U("th", {
							scope: "col",
							className: "py-1 pr-2",
							children: "date"
						}),
						/* @__PURE__ */ U("th", {
							scope: "col",
							className: "py-1 pr-2",
							children: "pass"
						}),
						/* @__PURE__ */ U("th", {
							scope: "col",
							className: "py-1 pr-2",
							children: "mean"
						}),
						/* @__PURE__ */ U("th", {
							scope: "col",
							className: "py-1 pr-2 text-right",
							children: "judgments"
						}),
						/* @__PURE__ */ U("th", {
							scope: "col",
							className: "py-1 pl-2 text-right",
							children: "cost"
						})
					]
				}) }), /* @__PURE__ */ U("tbody", { children: o.map((e) => /* @__PURE__ */ U(tf, { row: e }, e.aggregateKey)) })]
			})
		]
	});
}
function tf({ row: e }) {
	let t = e.numJudgments > 0 ? e.numPassed / e.numJudgments : 0, n = e.numJudgments > 0 ? e.sumOverallScore / e.numJudgments : 0, r = t >= .9 ? "success" : t >= .6 ? "warning" : "danger";
	return /* @__PURE__ */ W("tr", {
		className: "border-t border-border",
		children: [
			/* @__PURE__ */ U("td", {
				className: "py-1 pr-2 font-mono",
				children: e.dayBucket
			}),
			/* @__PURE__ */ U("td", {
				className: "py-1 pr-2",
				children: /* @__PURE__ */ W(S, {
					tone: r,
					size: "sm",
					children: [(t * 100).toFixed(0), "%"]
				})
			}),
			/* @__PURE__ */ W("td", {
				className: "py-1 pr-2 font-mono",
				children: [(n * 100).toFixed(0), "%"]
			}),
			/* @__PURE__ */ U("td", {
				className: "py-1 pr-2 text-right font-mono",
				children: e.numJudgments
			}),
			/* @__PURE__ */ W("td", {
				className: "py-1 pl-2 text-right font-mono",
				children: ["$", e.sumCostUsd.toFixed(4)]
			})
		]
	});
}
//#endregion
//#region src/components/pipelines/judge/useJudgmentResults.ts
function nf(e) {
	if (typeof e == "number") return e;
	if (typeof e == "string") {
		let t = Date.parse(e);
		if (Number.isFinite(t)) return t;
	}
	return Date.now();
}
function rf(e = {}) {
	let { maxRecords: t = 50, runId: n } = e, [r, i] = V([]), a = B(!0);
	return R(() => (a.current = !0, () => {
		a.current = !1;
	}), []), P("*", (e) => {
		if (!a.current) return;
		let r = e;
		if (!r || typeof r.eventType != "string") return;
		let o = r.eventType;
		if (!o.startsWith("pipeline.judge.")) return;
		let s = r.payload;
		if (!s || typeof s.runId != "string" || typeof s.stepId != "string" || n && s.runId !== n) return;
		let c = `${s.runId}::${s.stepId}`;
		i((e) => {
			let n = e.findIndex((e) => `${e.runId}::${e.stepId}` === c), r = n === -1 ? void 0 : n, i = nf(s.at), a = (n) => {
				if (typeof r == "number" && r >= 0 && r < e.length) {
					let t = e.slice();
					return t[r] = {
						...e[r],
						...n
					}, t;
				}
				let i = [n, ...e];
				return i.length > t && (i.length = t), i;
			};
			if (o === "pipeline.judge.started") return a({
				runId: s.runId,
				stepId: s.stepId,
				pipelineId: s.pipelineId,
				status: "running",
				rubricId: s.rubricId,
				judgeModel: s.judgeModel,
				startedAt: i
			});
			if (o === "pipeline.judge.scored") {
				let t = typeof r == "number" ? e[r] : void 0;
				return a({
					runId: s.runId,
					stepId: s.stepId,
					pipelineId: s.pipelineId ?? t?.pipelineId,
					status: "scored",
					result: s.result,
					completedAt: i,
					elapsedMs: t?.startedAt ? i - t.startedAt : s.latencyMs,
					rubricId: s.rubricId ?? t?.rubricId,
					judgeModel: s.judgeModel ?? t?.judgeModel,
					costUsd: s.costUsd ?? s.result?.costUsd,
					tokensIn: s.usage?.inputTokens ?? s.result?.tokensIn,
					tokensOut: s.usage?.outputTokens ?? s.result?.tokensOut
				});
			}
			if (o === "pipeline.judge.failed") {
				let t = typeof r == "number" ? e[r] : void 0;
				return a({
					runId: s.runId,
					stepId: s.stepId,
					pipelineId: s.pipelineId ?? t?.pipelineId,
					status: "failed",
					error: s.error,
					failureReason: s.reason,
					completedAt: i,
					elapsedMs: t?.startedAt ? i - t.startedAt : s.latencyMs,
					costUsd: s.costUsd,
					tokensIn: s.tokensIn,
					tokensOut: s.tokensOut
				});
			}
			if (o === "pipeline.judge.budget-exceeded") {
				let t = typeof r == "number" ? e[r] : void 0;
				return a({
					runId: s.runId,
					stepId: s.stepId,
					pipelineId: s.pipelineId ?? t?.pipelineId,
					status: "budget-exceeded",
					completedAt: i
				});
			}
			return e;
		});
	}), z(() => r, [r]);
}
//#endregion
//#region src/components/pipelines/judge/useJudgmentAggregates.ts
function af(e) {
	let t = Xd(), [n, r] = V([]), [i, a] = V(!1), [o, s] = V(null), c = B(!0), l = B(() => {}), { pipelineId: u, rubricId: d, since: f, until: p, limit: m, refreshIntervalMs: h = 0, paused: g = !1 } = e, _ = `${u ?? ""}|${d ?? ""}|${f ?? ""}|${p ?? ""}|${m ?? ""}|${g ? "1" : "0"}`;
	return R(() => (c.current = !0, () => {
		c.current = !1;
	}), []), R(() => {
		if (!t) {
			r([]), a(!1), s(null);
			return;
		}
		if (g) return;
		if (!u && !d) {
			s(/* @__PURE__ */ Error("useJudgmentAggregates: one of pipelineId or rubricId is required")), a(!1);
			return;
		}
		let e = !1, n = async () => {
			a(!0);
			try {
				let n = await t.fetchAggregates({
					...u ? { pipelineId: u } : {},
					...d ? { rubricId: d } : {},
					...f ? { since: f } : {},
					...p ? { until: p } : {},
					...typeof m == "number" ? { limit: m } : {}
				});
				if (e || !c.current) return;
				r(n.items), s(null);
			} catch (t) {
				if (e || !c.current) return;
				s(t instanceof Error ? t : Error(String(t)));
			} finally {
				c.current && !e && a(!1);
			}
		};
		if (l.current = () => {
			n();
		}, n(), h > 0) {
			let t = setInterval(() => {
				n();
			}, h);
			return () => {
				e = !0, clearInterval(t);
			};
		}
		return () => {
			e = !0;
		};
	}, [
		t,
		_,
		h
	]), {
		aggregates: n,
		loading: i,
		error: o,
		reload: () => l.current()
	};
}
//#endregion
//#region src/components/pipelines/lineage/ImageLineageGraph.tsx
var of = 100, sf = 500, cf = 148, lf = 116;
function uf(e) {
	let t = new Map(e.map((e) => [e.imageId, e])), n = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
	for (let t of e) if (t.parentImageId) {
		let e = r.get(t.parentImageId) ?? [];
		e.push(t.imageId), r.set(t.parentImageId, e);
	}
	let i = [];
	for (let r of e) (!r.parentImageId || !t.has(r.parentImageId)) && (n.set(r.imageId, 0), i.push(r.imageId));
	let a = 0;
	for (; a < i.length;) {
		let e = i[a++], t = n.get(e) ?? 0;
		for (let a of r.get(e) ?? []) {
			let e = n.get(a) ?? -1;
			t + 1 > e && (n.set(a, t + 1), i.push(a));
		}
	}
	let o = /* @__PURE__ */ new Map();
	for (let [e, t] of n.entries()) {
		let n = o.get(t) ?? [];
		n.push(e), o.set(t, n);
	}
	let s = /* @__PURE__ */ new Map();
	for (let [e, t] of o.entries()) {
		let n = e * 204;
		t.forEach((e, t) => {
			s.set(e, {
				x: n,
				y: t * 136
			});
		});
	}
	return s;
}
function df(e, t) {
	let n = new Map(t.map((e) => [e.imageId, e])), r = /* @__PURE__ */ new Set(), i = [e];
	for (; i.length;) {
		let e = i.shift();
		if (r.has(e)) continue;
		r.add(e);
		let t = n.get(e);
		t?.parentImageId && i.push(t.parentImageId);
	}
	return r;
}
function ff({ src: e, alt: t, testId: n }) {
	let r = B(null), [i, a] = V(!1);
	return R(() => {
		if (!r.current) return;
		if (typeof IntersectionObserver > "u") {
			a(!0);
			return;
		}
		let e = r.current, t = new IntersectionObserver(([e]) => {
			e.isIntersecting && (a(!0), t.disconnect());
		}, { rootMargin: "200px" });
		return t.observe(e), () => t.disconnect();
	}, []), /* @__PURE__ */ U("div", {
		ref: r,
		className: "w-full h-full flex items-center justify-center bg-surface-inset",
		children: i ? /* @__PURE__ */ U("img", {
			src: e,
			alt: t,
			className: "w-full h-full object-cover",
			loading: "lazy",
			"data-testid": n
		}) : /* @__PURE__ */ U("div", {
			"aria-hidden": "true",
			className: "w-full h-full animate-pulse bg-surface-inset",
			"data-testid": n ? `${n}-placeholder` : void 0
		})
	});
}
function pf({ data: e }) {
	let { entry: t, highlighted: r, selected: i, onSelect: a, getImageUrl: o } = e, s = t.width && t.height ? `${t.width}×${t.height}` : "", c = t.producedByNodeKind;
	return /* @__PURE__ */ W(H, { children: [
		/* @__PURE__ */ U(G, {
			type: "target",
			position: K.Left,
			id: "in",
			className: "w-2 h-2 bg-border-emphasis"
		}),
		/* @__PURE__ */ W("button", {
			type: "button",
			onClick: () => a(t.imageId),
			className: n("w-full h-full flex flex-col overflow-hidden rounded-lg border bg-surface text-left", "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary", i ? "border-primary ring-2 ring-primary/30" : r ? "border-primary/60 bg-primary/5" : "border-border"),
			"aria-label": `Image artifact ${t.imageId.slice(0, 8)} produced by ${c}`,
			"data-testid": `lineage-node-${t.imageId}`,
			children: [/* @__PURE__ */ U("div", {
				className: "flex-1 min-h-0 overflow-hidden bg-surface-inset flex items-center justify-center",
				children: /* @__PURE__ */ U(ff, {
					src: o(t.imageId),
					alt: `Artifact ${t.imageId.slice(0, 8)}`,
					testId: `lineage-thumb-${t.imageId}`
				})
			}), /* @__PURE__ */ W("div", {
				className: "px-1.5 py-1 flex flex-col gap-0.5 flex-shrink-0",
				children: [/* @__PURE__ */ U("span", {
					className: n("inline-block text-[9px] font-mono px-1 rounded", "bg-surface-inset text-text-secondary truncate max-w-full"),
					title: c,
					children: c
				}), s && /* @__PURE__ */ U("span", {
					className: "text-[9px] text-text-tertiary font-mono",
					children: s
				})]
			})]
		}),
		/* @__PURE__ */ U(G, {
			type: "source",
			position: K.Right,
			id: "out",
			className: "w-2 h-2 bg-border-emphasis"
		})
	] });
}
var mf = { lineageNode: pf };
function hf() {
	return /* @__PURE__ */ U("div", {
		className: "flex items-center justify-center h-full text-text-tertiary text-sm",
		"data-testid": "lineage-graph-empty",
		children: "No image artifacts produced by this run."
	});
}
function gf(e, t) {
	if (e.length <= t) return e;
	let n = e.map((e, t) => ({
		e,
		i: t
	}));
	return n.sort((e, t) => {
		let n = Date.parse(e.e.at), r = Date.parse(t.e.at);
		return r === n ? t.i - e.i : r - n;
	}), n.slice(0, t).map((e) => e.e);
}
function _f(e) {
	return e.length > 10 ? `${e.slice(0, 8)}…` : e;
}
function vf({ navEntries: e, imageId: t, onClose: r, onNavigate: i, getImageUrl: a }) {
	let o = e.find((e) => e.imageId === t), [s, c] = V(!1), l = B(null);
	R(() => () => {
		l.current && clearTimeout(l.current);
	}, []), R(() => {
		c(!1);
	}, [t]), R(() => {
		let n = (n) => {
			if (n.key !== "ArrowRight" && n.key !== "ArrowLeft" || e.length === 0) return;
			let r = e.findIndex((e) => e.imageId === t);
			if (r === -1) return;
			let a = e.length, o = n.key === "ArrowRight" ? (r + 1) % a : (r - 1 + a) % a;
			n.preventDefault(), i(e[o].imageId);
		};
		return window.addEventListener("keydown", n), () => window.removeEventListener("keydown", n);
	}, [
		t,
		e,
		i
	]);
	let u = L(() => {
		typeof navigator < "u" && navigator.clipboard?.writeText && navigator.clipboard.writeText(t).then(() => {
			c(!0), l.current && clearTimeout(l.current), l.current = setTimeout(() => c(!1), 1200);
		}, () => {});
	}, [t]);
	if (!o) return null;
	let d = o.width && o.height ? `${o.width}×${o.height}` : null;
	return /* @__PURE__ */ U(C, {
		open: !0,
		onClose: r,
		title: `Artifact ${_f(o.imageId)}`,
		maxWidth: 760,
		rawChildren: !0,
		backdropTestId: "lineage-preview-backdrop",
		footer: /* @__PURE__ */ U(h, {
			variant: "secondary",
			size: "sm",
			onClick: r,
			"data-testid": "lineage-preview-close",
			children: "Close"
		}),
		children: /* @__PURE__ */ W("div", {
			className: "flex flex-col gap-3",
			"data-testid": "lineage-preview-modal",
			children: [/* @__PURE__ */ U("div", {
				className: n("flex items-center justify-center bg-surface-inset rounded-md overflow-hidden", "max-h-[70vh] min-h-[200px]"),
				children: /* @__PURE__ */ U("img", {
					src: a(o.imageId),
					alt: `Artifact ${o.imageId}`,
					className: "max-w-full max-h-[70vh] object-contain",
					"data-testid": `lineage-preview-image-${o.imageId}`
				})
			}), /* @__PURE__ */ W("div", {
				className: "flex flex-wrap items-center gap-2 pt-1",
				"data-testid": "lineage-preview-meta",
				children: [
					/* @__PURE__ */ W(S, {
						tone: "neutral",
						size: "sm",
						mono: !0,
						title: o.imageId,
						children: ["id: ", _f(o.imageId)]
					}),
					/* @__PURE__ */ U(v, {
						"aria-label": s ? "Image id copied" : "Copy image id",
						size: "sm",
						variant: "ghost",
						onClick: u,
						"data-testid": "lineage-preview-copy",
						children: s ? "✓" : "⧉"
					}),
					o.mimeType && /* @__PURE__ */ U(S, {
						tone: "info",
						size: "sm",
						children: o.mimeType
					}),
					d && /* @__PURE__ */ U(S, {
						tone: "neutral",
						size: "sm",
						mono: !0,
						children: d
					}),
					/* @__PURE__ */ W(S, {
						tone: "purple",
						size: "sm",
						mono: !0,
						title: o.producedByStepId,
						children: ["step: ", _f(o.producedByStepId)]
					})
				]
			})]
		})
	});
}
function yf({ entries: e, selectedImageId: t, onSelect: r, maxRenderedNodes: i = of }) {
	let a = Ve(), [o, s] = V(!1), [c, l] = V(!1), [u, d] = V(null), f = e.length, p = !o && f > i, m = z(() => p ? gf(e, i) : e, [
		e,
		p,
		i
	]), h = z(() => t ? df(t, m) : /* @__PURE__ */ new Set(), [t, m]), g = z(() => uf(m), [m]), _ = L((e) => {
		r?.(e), d(e);
	}, [r]), v = z(() => m.map((e) => {
		let n = g.get(e.imageId) ?? {
			x: 0,
			y: 0
		};
		return {
			id: e.imageId,
			type: "lineageNode",
			position: n,
			data: {
				entry: e,
				highlighted: h.has(e.imageId),
				selected: e.imageId === t,
				onSelect: _,
				getImageUrl: a
			},
			style: {
				width: cf,
				height: lf
			}
		};
	}), [
		m,
		t,
		h,
		_,
		a
	]), b = z(() => new Set(m.map((e) => e.imageId)), [m]), x = z(() => m.filter((e) => e.parentImageId && b.has(e.parentImageId)).map((e) => ({
		id: `${e.parentImageId}->${e.imageId}`,
		source: e.parentImageId,
		target: e.imageId,
		sourceHandle: "out",
		targetHandle: "in",
		className: h.has(e.imageId) && h.has(e.parentImageId) ? "stroke-primary stroke-2" : "stroke-border"
	})), [
		m,
		b,
		h
	]), [S, C, T] = Ct(v), [E, D, ee] = xt(x);
	R(() => {
		C((e) => {
			let t = new Map(e.map((e) => [e.id, e.position]));
			return v.map((e) => {
				let n = t.get(e.id);
				return n ? {
					...e,
					position: n
				} : e;
			});
		});
	}, [v, C]), R(() => {
		D(x);
	}, [x, D]);
	let O = L((e, t) => {
		_(t.id);
	}, [_]), te = L(() => {
		f > sf ? l(!0) : s(!0);
	}, [f]), k = L(() => {
		s(!0), l(!1);
	}, []), A = L(() => {
		l(!1);
	}, []), ne = z(() => {
		let e = m.slice();
		return e.sort((e, t) => {
			let n = Date.parse(e.at), r = Date.parse(t.at);
			return n === r ? e.imageId.localeCompare(t.imageId) : n - r;
		}), e;
	}, [m]), j = L(() => d(null), []), M = L((e) => d(e), []);
	return f === 0 ? /* @__PURE__ */ U(hf, {}) : /* @__PURE__ */ W("div", {
		className: "relative w-full h-full flex flex-col",
		"data-testid": "lineage-graph",
		children: [
			p && /* @__PURE__ */ U("div", {
				className: "p-2 flex-shrink-0",
				children: /* @__PURE__ */ W(y, {
					variant: "info",
					"data-testid": "lineage-graph-clip-banner",
					children: [/* @__PURE__ */ W("span", {
						className: "flex-1",
						children: [
							"Showing ",
							m.length,
							" of ",
							f,
							" artifacts"
						]
					}), /* @__PURE__ */ U("button", {
						type: "button",
						onClick: te,
						"data-testid": "lineage-graph-show-all",
						className: n("ml-2 px-2 py-1 text-[12px] font-medium rounded", "border border-current bg-transparent cursor-pointer", "hover:bg-current/10"),
						children: "Show all"
					})]
				})
			}),
			/* @__PURE__ */ W("div", {
				className: "flex-1 min-h-0 relative",
				children: [/* @__PURE__ */ U("style", { children: ".react-flow__node { position: absolute; }" }), /* @__PURE__ */ W(yt, {
					nodes: S,
					edges: E,
					onNodesChange: T,
					onEdgesChange: ee,
					onNodeClick: O,
					nodeTypes: mf,
					fitView: !0,
					fitViewOptions: { padding: .2 },
					minZoom: .3,
					maxZoom: 2,
					onlyRenderVisibleElements: !0,
					proOptions: { hideAttribution: !0 },
					children: [/* @__PURE__ */ U(ht, {
						gap: 16,
						size: 1,
						className: "bg-surface-inset"
					}), /* @__PURE__ */ U(_t, {
						showInteractive: !1,
						className: "bg-surface border border-border rounded"
					})]
				})]
			}),
			/* @__PURE__ */ U(w, {
				open: c,
				onConfirm: k,
				onCancel: A,
				title: "Show all artifacts?",
				body: `Rendering all ${f} artifacts may slow down the lineage tab. Continue?`,
				confirmLabel: "Show all",
				tone: "caution"
			}),
			u && /* @__PURE__ */ U(vf, {
				navEntries: ne,
				imageId: u,
				onClose: j,
				onNavigate: M,
				getImageUrl: a
			})
		]
	});
}
//#endregion
//#region src/components/pipelines/lineage/useImageLineage.ts
var bf = /* @__PURE__ */ new Map(), xf = 6e4, Sf = /* @__PURE__ */ new Map();
function Cf(e) {
	let t = bf.get(e);
	return t ? Date.now() - t.fetchedAt > xf ? (bf.delete(e), null) : t.entries : null;
}
function wf(e, t) {
	bf.set(e, {
		entries: t,
		fetchedAt: Date.now()
	});
}
function Tf() {
	bf.clear(), Sf.clear();
}
function Ef(e, t) {
	let n = Sf.get(e);
	if (n) return n;
	let r = `/api/pipeline/runs/${encodeURIComponent(e)}/image-lineage?pipelineId=${encodeURIComponent(t)}`, i = fetch(r, {
		headers: { "Content-Type": "application/json" },
		credentials: "include"
	}).then(async (t) => {
		if (!t.ok) throw Error(`image-lineage: ${t.status} ${t.statusText}`);
		let n = await t.json(), r = Array.isArray(n.entries) ? n.entries : [];
		return wf(e, r), r;
	}).finally(() => {
		Sf.get(e) === i && Sf.delete(e);
	});
	return Sf.set(e, i), i;
}
function Df(e, t) {
	let [n, r] = V(() => e ? Cf(e) ?? [] : []), [i, a] = V(!1), [o, s] = V(null), c = B(0), l = L(() => {
		if (!e || !t) return;
		let n = Cf(e);
		if (n) {
			r(n), a(!1), s(null);
			return;
		}
		let i = ++c.current;
		a(!0), s(null), Ef(e, t).then((e) => {
			i === c.current && (r(e), a(!1));
		}).catch((e) => {
			i === c.current && (s(e instanceof Error ? e.message : String(e)), a(!1));
		});
	}, [e, t]), u = L(() => {
		e && (bf.delete(e), Sf.delete(e)), l();
	}, [e, l]);
	return R(() => {
		l();
	}, [l]), {
		entries: n,
		loading: i,
		error: o,
		refetch: u
	};
}
//#endregion
export { qt as ActionNode, ms as AdjustBwConfig, Dn as AdjustBwNode, Ms as AdjustLayerConfig, kn as AdjustLayerNode, ln as AgUiOutputNode, tn as AgentNode, $d as AggregateSummaryCard, Cd as AllRunsPage, it as AnimatedEdge, en as ApprovalNode, q as BaseNode, vc as CaptionPanel, Gt as ConditionNode, X as ConfigField, _a as ConfigSection, qa as ContextVariablePicker, Kd as CriteriaPanel, fs as CropConfig, En as CropNode, Ps as DimensionsConfig, An as DimensionsNode, ic as EditPromptConfig, Jn as EditPromptNode, Dc as EditRecommendationsPanel, ae as EventStreamProvider, bd as ExecutorLog, Yt as ForkNode, Ko as FormatConvertConfig, Sn as FormatConvertNode, $s as GenerateConfig, Un as GenerateNode, an as GraphQueryNode, sn as GuardrailNode, yf as ImageLineageGraph, oc as ImageSourceConfig, dn as ImageSourceNode, bc as ImageWithBBoxOverlay, Qt as JoinNode, Yd as JudgmentApiProvider, Zd as JudgmentResultViewer, ef as JudgmentTrendChart, rn as KnowledgeBaseNode, Vt as LLMNode, nn as McpToolNode, on as MemoryNode, Pt as NODE_CATEGORIES, Rc as NODE_TYPES_WITHOUT_CONFIG, va as NodeConfigShell, Er as NodePalette, mn as NodeThumbStrip, Cc as ObjectsPanel, mr as PALETTE_ITEMS, Ft as PORT_CLS, Ud as PendingApprovalsPage, Sc as PeoplePanel, Wr as PipelineCanvas, ye as PipelineEditorContext, ol as PipelineEditorPage, xe as PipelineEditorProvider, Ye as PipelineEditorServicesProvider, le as PipelineNodeRuntimeProvider, xd as PipelineRunReplayPage, Ou as PipelineRunsPage, Ce as PipelineRunsProvider, Ld as PipelineStatsPage, Zl as PipelinesPage, cn as PolicyNode, Lo as ResizeConfig, vn as ResizeNode, ya as SamplePills, cc as SaveConfig, hn as SaveNode, Fo as ScatterConfig, _n as ScatterNode, Jt as ServerStepNode, qo as SharpenConfig, Cn as SharpenNode, Oa as SourceImagePathField, Fu as StepAttempts, Au as StepSection, $u as StepThread, td as StepTree, wc as TagsPanel, ka as ToggleField, Ho as TransformGeoConfig, bn as TransformGeoNode, Ut as TransformNode, Rt as TriggerNode, Is as UpscaleConfig, jn as UpscaleNode, nc as VariationConfig, Gn as VariationNode, Gd as VerdictPanel, Gs as VisionClassifyConfig, Ln as VisionClassifyNode, Vs as VisionConfig, Ks as VisionDescribeConfig, Rn as VisionDescribeNode, Js as VisionExtractTextConfig, Bn as VisionExtractTextNode, In as VisionNode, Oc as VisionResultViewer, Ju as VisionRunCard, Us as VisionTagConfig, zn as VisionTagNode, Yo as WatermarkConfig, wn as WatermarkNode, Sa as availableContextPaths, Ta as availableImageRefs, J as categoryFor, Tf as clearImageLineageCache, ba as contextContributions, xc as imageOverlayPropsFrom, Yn as nodeTypes, Y as portCls, br as recordRecentType, Ca as unresolvedTemplatePaths, xa as upstreamNodeIds, P as useEventStream, F as useEventStreamContext, Df as useImageLineage, Ve as useImageUrl, Ke as useImageUrlOptional, ze as useIsNodeTypeExecutable, af as useJudgmentAggregates, Xd as useJudgmentApi, rf as useJudgmentResults, I as useLatestStepForNode, de as usePipelineEditor, Ne as usePipelineEditorServices, be as usePipelineNodeRuntime, $e as usePipelineRuns, we as useRetryFromStep, Ea as useUpstreamContext, Da as useUpstreamImageRefs, Yu as useVisionResults, Be as useWebhookRelay };
