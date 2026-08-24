import { n as e } from "./IdentityContext-m2wQF4sJ.js";
import "./WebSocketContext-DUvjGLFq.js";
import { a as t, n } from "./ToastProvider-DPq8u2eM.js";
import { t as r } from "./cn-DhjIN-s0.js";
import { t as i } from "./useEventCallback-Cwx9QVSi.js";
import { a, i as o, l as s, n as c, o as l, r as u, s as d, t as f, u as p } from "./StatusPill-DEit2_T4.js";
import { t as m } from "./Button-CTpms90-.js";
import { n as h, r as g, t as _ } from "./FileUploadDrop-CpLUJEjW.js";
import { t as v } from "./Banner-BLOg1hC_.js";
import { n as y, t as b } from "./Chart-B40fkHgm.js";
import { t as x } from "./Chip-2lIuHwy5.js";
import { t as S } from "./Modal-DbKyLw86.js";
import { t as C } from "./ConfirmDialog-DTHQQziN.js";
import { t as w } from "./EmptyState-CUHf5NYN.js";
import { t as T } from "./SkeletonCard-CGe8XFPB.js";
import { t as E } from "./activationKey-CjbL3LUv.js";
import { t as D } from "./Input-DcK2h-jK.js";
import { t as O } from "./Textarea-C3t5PCLv.js";
import { n as k, r as A, t as ee } from "./EventStreamContext-C0egqLaF.js";
import { $ as j, B as te, C as ne, D as re, E as M, F as ie, G as ae, H as oe, I as se, J as ce, K as le, L as ue, M as N, N as de, O as fe, P as pe, Q as me, R as he, S as ge, T as _e, U as ve, V as ye, W as be, Y as xe, Z as Se, _ as Ce, a as we, b as Te, c as Ee, d as De, et as Oe, f as P, g as ke, i as Ae, j as je, k as Me, l as Ne, m as Pe, n as Fe, nt as Ie, o as Le, p as Re, q as ze, r as Be, s as Ve, t as He, tt as Ue, u as We, v as Ge, w as F, y as Ke, z as qe } from "./services-CK_zipW-.js";
import { t as Je } from "./rovingFocus-Bj5Y6kwY.js";
import { t as Ye } from "./Select-Z0TLUVeL.js";
import { t as Xe } from "./Checkbox-CsbxMNgR.js";
/* empty css               */
import Ze, { createContext as Qe, memo as $e, useCallback as I, useContext as et, useEffect as L, useId as tt, useMemo as R, useRef as z, useState as B } from "react";
import { Fragment as V, jsx as H, jsxs as U } from "react/jsx-runtime";
import { Navigate as nt, useNavigate as rt, useParams as it, useSearchParams as at } from "react-router";
import { Background as ot, BackgroundVariant as st, Controls as ct, EdgeLabelRenderer as lt, Handle as W, MiniMap as ut, Position as G, ReactFlow as dt, ReactFlowProvider as ft, getSmoothStepPath as pt, useEdgesState as mt, useNodeConnections as ht, useNodesState as gt, useReactFlow as _t } from "@xyflow/react";
//#region src/components/pipelines/validation/handleCompatibility.ts
var vt = {
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
}, yt = {
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
function bt(e, t, n, r) {
	return !(!xt(e, t) || !St(n, r));
}
function xt(e, t) {
	let n = vt[e];
	return n === "fork" ? Ct(t) : n.includes(t);
}
function St(e, t) {
	let n = yt[e];
	return n === null ? !1 : n === "join" ? wt(t) : n.includes(t);
}
function Ct(e) {
	return /^branch-(\d+)$/.exec(e) !== null;
}
function wt(e) {
	return /^in-(\d+)$/.exec(e) !== null;
}
//#endregion
//#region src/components/pipelines/nodes/BaseNode.tsx
var Tt = {
	idle: {
		card: "border border-border-field bg-white",
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
}, Et = {
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
function K(e) {
	let n = Be(), i = e.nodeType ? !n(e.nodeType) : !1, { icon: a, subtitle: o, state: s, body: c, footer: l, selected: u, onRetry: d, hasBreakpoint: f, pausedAtBreakpoint: p, ariaLabel: m, category: h, children: g } = e, _ = Tt[s], v = h ? Et[h] : void 0, y = t(), [b, x] = B(!1), S = s === "failed" && typeof d == "function", C = (e) => {
		e.preventDefault(), e.stopPropagation(), d?.();
	}, w = !y && s === "pending" ? "animate-[basenode-pulse_2000ms_cubic-bezier(0.25,0.1,0.25,1)_infinite]" : !y && s === "running" ? "animate-[basenode-pulse_1500ms_linear_infinite]" : "", T = !!(c || l || S), E = !!(c || l), D = o ? `${o}, state: ${s}` : `Node, state: ${s}`;
	return /* @__PURE__ */ U("div", {
		className: r("w-[200px] rounded-lg relative font-inherit text-text-primary box-border outline-none transition-[border-color,background-color] duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2", p ? "border-2 border-warning bg-warning-bg shadow-[0_0_0_3px_rgba(217,119,6,0.25),0_1px_2px_rgba(15,23,42,0.06)]" : _.card, !p && u && "shadow-[0_0_0_4px_rgba(100,108,255,0.18),0_1px_2px_rgba(15,23,42,0.06)]", !p && !u && "shadow-[0_1px_2px_rgba(15,23,42,0.06)]", y && "transition-none"),
		role: "button",
		tabIndex: 0,
		"aria-label": m ?? D,
		"aria-selected": !!u,
		"data-state": s,
		"data-node-state": s,
		"data-node-category": h,
		"data-pipeline-node": "true",
		children: [
			v && /* @__PURE__ */ H("span", {
				"aria-hidden": "true",
				"data-testid": "category-accent",
				className: r("absolute left-0 top-0 bottom-0 w-[3px] rounded-l-[7px] pointer-events-none", v.bar)
			}),
			f && /* @__PURE__ */ H("span", {
				"aria-label": "breakpoint",
				"data-testid": "breakpoint-dot",
				className: "absolute -top-1 -left-1 w-2.5 h-2.5 rounded-full bg-danger border-[1.5px] border-white z-[1]"
			}),
			/* @__PURE__ */ U("div", {
				className: r("flex items-center gap-2 h-7 px-2.5", T && "border-b border-border"),
				children: [
					v ? /* @__PURE__ */ H("span", {
						"aria-hidden": "true",
						"data-testid": "category-chip",
						className: r("flex items-center justify-center shrink-0", v.chip),
						children: /* @__PURE__ */ H("span", {
							className: r("text-xs leading-none", v.glyph),
							children: a
						})
					}) : /* @__PURE__ */ H("span", {
						className: "text-sm leading-none shrink-0",
						"aria-hidden": "true",
						children: a
					}),
					/* @__PURE__ */ H("span", {
						className: "flex-1 min-w-0 text-xs font-semibold text-text-primary overflow-hidden text-ellipsis whitespace-nowrap",
						children: o
					}),
					i && /* @__PURE__ */ H("span", {
						"data-testid": "node-preview-badge",
						title: "This deployment has no executor for this node type — the step will not run.",
						className: "shrink-0 rounded-full border border-warning-border bg-warning-bg px-1.5 text-[8px] font-semibold uppercase tracking-wide text-warning-fg",
						children: "preview"
					}),
					/* @__PURE__ */ H("span", {
						className: r("w-2 h-2 rounded-full shrink-0", _.dot, w),
						"aria-label": `state: ${s}`
					})
				]
			}),
			S && /* @__PURE__ */ H("div", {
				className: r("flex px-2.5 py-1.5", E && "border-b border-border"),
				children: /* @__PURE__ */ H("button", {
					type: "button",
					className: r("cursor-pointer appearance-none font-inherit text-[11px] font-medium leading-tight px-2 py-0.5 rounded-full border border-danger text-danger-fg transition-colors duration-[120ms] ease-[cubic-bezier(0.4,0,0.2,1)]", b ? "bg-danger-bg" : "bg-transparent", y && "transition-none"),
					onClick: C,
					onMouseDown: (e) => e.stopPropagation(),
					onMouseEnter: () => x(!0),
					onMouseLeave: () => x(!1),
					"aria-label": "Retry from here",
					children: "⟳ Retry from here"
				})
			}),
			c != null && /* @__PURE__ */ H("div", {
				className: "px-2.5 py-2 text-[13px] leading-[1.4] text-text-secondary",
				children: c
			}),
			l != null && /* @__PURE__ */ H("div", {
				className: "border-t border-border px-2.5 py-1.5 text-xs text-text-secondary",
				children: l
			}),
			g
		]
	});
}
//#endregion
//#region src/components/pipelines/nodes/categories.ts
var Dt = {
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
function q(e) {
	return Dt[e];
}
//#endregion
//#region src/components/pipelines/nodes/shared/ports.ts
var Ot = {
	image: "!w-2.5 !h-2.5 !rounded-sm !bg-accent !border-accent",
	text: "!w-2.5 !h-2.5 !bg-surface-emphasis",
	data: "!w-2.5 !h-2.5 !bg-neutral",
	control: "!w-2 !h-2 !bg-warning",
	error: "!w-2 !h-2 !bg-danger"
};
function J(e) {
	return Ot[e];
}
//#endregion
//#region src/components/pipelines/nodes/trigger/TriggerNode.tsx
function kt(e) {
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
function At(e) {
	return e.triggerType === "schedule" ? e.schedule ? `cron: ${e.schedule}` : "No schedule set" : e.triggerType === "webhook" ? e.webhookPath ? `POST ${e.webhookPath}` : "No path set" : e.triggerType.startsWith("document.") ? e.documentTypeId ? `Doc type: ${e.documentTypeId}` : "Any document" : "Fires on user click";
}
function jt(e) {
	let { id: t, data: n, selected: r } = e, i = F(t), a = i?.status === "cancelled" ? "failed" : i?.status, o = (n._state && n._state !== "idle" ? n._state : void 0) ?? a ?? n._state ?? "idle", s = M(), c = o === "failed" ? () => s(t) : void 0, l = `Trigger node, ${kt(n)}, state: ${o}`;
	return /* @__PURE__ */ H(K, {
		icon: "▶",
		subtitle: kt(n),
		state: o,
		category: q("trigger"),
		body: /* @__PURE__ */ H("span", {
			className: "italic",
			children: At(n)
		}),
		selected: r,
		onRetry: c,
		ariaLabel: l,
		hasBreakpoint: n._hasBreakpoint,
		pausedAtBreakpoint: n._pausedAtBreakpoint,
		children: /* @__PURE__ */ H(W, {
			type: "source",
			position: G.Right,
			id: "out",
			className: J("data")
		})
	});
}
//#endregion
//#region src/components/pipelines/nodes/llm/LLMNode.tsx
function Mt(e) {
	if (!e || e.trim().length === 0) return "Not configured";
	let t = e.split("\n").slice(0, 2).join(" ").trim();
	return t.length > 120 ? `${t.slice(0, 117)}…` : t;
}
function Nt({ info: e }) {
	let [t, n] = B(!1), r = t ? e.response : e.response.length > 60 ? `${e.response.slice(0, 60)}…` : e.response, i = e.tokensIn != null || e.tokensOut != null;
	return /* @__PURE__ */ U("div", { children: [/* @__PURE__ */ U("button", {
		type: "button",
		onClick: () => n((e) => !e),
		className: "bg-transparent border-none p-0 cursor-pointer font-inherit text-xs text-text-secondary font-medium text-left",
		children: [
			t ? "▾" : "▸",
			" Response",
			i && /* @__PURE__ */ U("span", {
				className: "ml-1.5 text-[11px] text-text-tertiary",
				children: [
					e.tokensIn ?? 0,
					" → ",
					e.tokensOut ?? 0,
					" tokens"
				]
			}),
			e.streamOpening && /* @__PURE__ */ H("span", {
				className: "ml-1.5 text-[11px] text-info-fg",
				"data-testid": "llm-stream-opening",
				title: "LLM stream is open — waiting for the first token",
				children: "· stream open — waiting…"
			}),
			!e.streamOpening && e.streaming && /* @__PURE__ */ H("span", {
				className: "ml-1.5 text-[11px] text-text-tertiary",
				children: "· streaming…"
			})
		]
	}), /* @__PURE__ */ H("div", {
		className: t ? "mt-1 font-mono text-[11px] leading-[1.4] text-text-primary whitespace-pre-wrap break-words line-clamp-6" : "mt-1 font-mono text-[11px] leading-[1.4] text-text-primary whitespace-pre-wrap break-words max-h-[1.4em] overflow-hidden",
		children: r
	})] });
}
function Pt(e) {
	let { id: t, data: n, selected: r } = e, i = F(t), a = i?.status === "cancelled" ? "failed" : i?.status, o = (n._state && n._state !== "idle" ? n._state : void 0) ?? a ?? n._state ?? "idle", s = i?.llm, c = o === "running" && s?.streamOpened === !0 && (s?.tokensOut ?? 0) === 0, l = o === "running" && s !== void 0 && (s.tokensOut ?? 0) > 0, u = M(), d = o === "failed" ? () => u(t) : void 0, f = /* @__PURE__ */ H("span", {
		className: "italic",
		children: Mt(n.userPromptTemplate)
	}), p = (s ? {
		response: s.response ?? "",
		tokensIn: s.tokensIn,
		tokensOut: s.tokensOut,
		streaming: l,
		streamOpening: c
	} : void 0) ?? n._llmResponse, m = p ? /* @__PURE__ */ H(Nt, { info: p }) : void 0, h = (n.systemPrompt ?? "").replace(/\s+/g, " ").trim(), g = h.length === 0 ? "no system prompt" : `system prompt: ${h.length > 60 ? `${h.slice(0, 60)}…` : h}`, _ = `LLM node, ${n.model || n.provider}, ${g}, state: ${o}`;
	return /* @__PURE__ */ U(K, {
		icon: "🧠",
		subtitle: n.model || n.provider,
		state: o,
		category: q("llm"),
		body: f,
		footer: m,
		selected: r,
		onRetry: d,
		ariaLabel: _,
		hasBreakpoint: n._hasBreakpoint,
		pausedAtBreakpoint: n._pausedAtBreakpoint,
		children: [
			/* @__PURE__ */ H(W, {
				type: "target",
				position: G.Left,
				id: "in",
				className: J("data")
			}),
			/* @__PURE__ */ H(W, {
				type: "source",
				position: G.Right,
				id: "out",
				className: `${J("text")} !top-[40%]`
			}),
			/* @__PURE__ */ H(W, {
				type: "source",
				position: G.Right,
				id: "error",
				className: `${J("error")} !top-[60%]`
			})
		]
	});
}
//#endregion
//#region src/components/pipelines/nodes/transform/TransformNode.tsx
function Ft(e) {
	if (!e) return "—";
	let t = e.replace(/\s+/g, " ").trim();
	return t.length > 60 ? `${t.slice(0, 60)}…` : t;
}
function It(e) {
	let { id: t, data: n, selected: r } = e, i = F(t), a = i?.status === "cancelled" ? "failed" : i?.status, o = (n._state && n._state !== "idle" ? n._state : void 0) ?? a ?? n._state ?? "idle", s = M(), c = o === "failed" ? () => s(t) : void 0;
	return /* @__PURE__ */ U(K, {
		icon: "✨",
		subtitle: n.transformType,
		state: o,
		category: q("transform"),
		body: /* @__PURE__ */ H("span", {
			className: "font-mono text-xs text-text-primary bg-surface-inset px-1.5 py-0.5 rounded inline-block max-w-full overflow-hidden text-ellipsis whitespace-nowrap",
			children: Ft(n.expression)
		}),
		selected: r,
		onRetry: c,
		hasBreakpoint: n._hasBreakpoint,
		pausedAtBreakpoint: n._pausedAtBreakpoint,
		children: [/* @__PURE__ */ H(W, {
			type: "target",
			position: G.Left,
			id: "in",
			className: J("data")
		}), /* @__PURE__ */ H(W, {
			type: "source",
			position: G.Right,
			id: "out",
			className: J("data")
		})]
	});
}
//#endregion
//#region src/components/pipelines/nodes/condition/ConditionNode.tsx
function Lt(e) {
	if (!e) return "—";
	let t = e.replace(/\s+/g, " ").trim();
	return t.length > 60 ? `${t.slice(0, 60)}…` : t;
}
function Rt(e) {
	let { id: t, data: n, selected: r } = e, i = F(t), a = i?.status === "cancelled" ? "failed" : i?.status, o = (n._state && n._state !== "idle" ? n._state : void 0) ?? a ?? n._state ?? "idle", s = M(), c = o === "failed" ? () => s(t) : void 0;
	return /* @__PURE__ */ U(K, {
		icon: "❓",
		subtitle: n.label || "condition",
		state: o,
		category: q("condition"),
		body: /* @__PURE__ */ H("span", {
			className: "font-mono text-xs text-text-primary bg-surface-inset px-1.5 py-0.5 rounded inline-block max-w-full overflow-hidden text-ellipsis whitespace-nowrap",
			children: Lt(n.expression)
		}),
		selected: r,
		onRetry: c,
		hasBreakpoint: n._hasBreakpoint,
		pausedAtBreakpoint: n._pausedAtBreakpoint,
		children: [
			/* @__PURE__ */ H(W, {
				type: "target",
				position: G.Left,
				id: "in",
				className: J("data")
			}),
			/* @__PURE__ */ H(W, {
				type: "source",
				position: G.Right,
				id: "true",
				className: `${J("control")} !top-[40%]`
			}),
			/* @__PURE__ */ H(W, {
				type: "source",
				position: G.Right,
				id: "false",
				className: `${J("control")} !top-[60%]`
			})
		]
	});
}
//#endregion
//#region src/components/pipelines/nodes/action/ActionNode.tsx
function zt(e) {
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
function Bt(e) {
	let { id: t, data: n, selected: r } = e, i = F(t), a = i?.status === "cancelled" ? "failed" : i?.status, o = (n._state && n._state !== "idle" ? n._state : void 0) ?? a ?? n._state ?? "idle", s = M(), c = o === "failed" ? () => s(t) : void 0;
	return /* @__PURE__ */ U(K, {
		icon: "⚡",
		subtitle: n.actionType,
		state: o,
		category: q("action"),
		body: /* @__PURE__ */ H("span", {
			className: "italic",
			children: zt(n)
		}),
		selected: r,
		onRetry: c,
		hasBreakpoint: n._hasBreakpoint,
		pausedAtBreakpoint: n._pausedAtBreakpoint,
		children: [
			/* @__PURE__ */ H(W, {
				type: "target",
				position: G.Left,
				id: "in",
				className: J("data")
			}),
			/* @__PURE__ */ H(W, {
				type: "source",
				position: G.Right,
				id: "out",
				className: `${J("data")} !top-[40%]`
			}),
			/* @__PURE__ */ H(W, {
				type: "source",
				position: G.Right,
				id: "error",
				className: `${J("error")} !top-[60%]`
			})
		]
	});
}
//#endregion
//#region src/components/pipelines/nodes/fork/ForkNode.tsx
function Vt(e) {
	let { id: t, data: n, selected: r } = e, i = F(t), a = i?.status === "cancelled" ? "failed" : i?.status, o = (n._state && n._state !== "idle" ? n._state : void 0) ?? a ?? n._state ?? "idle", s = M(), c = o === "failed" ? () => s(t) : void 0, l = Math.max(2, Math.min(8, n.branchCount ?? 2)), u = Array.from({ length: l }, (e, t) => {
		let r = n.branchLabels?.[t];
		return r && r.trim().length > 0 ? r : `branch ${t}`;
	});
	return /* @__PURE__ */ U(K, {
		icon: "⑂",
		subtitle: `${l} branches`,
		state: o,
		category: q("fork"),
		body: /* @__PURE__ */ H("ul", {
			className: "m-0 p-0 list-none flex flex-col gap-0.5 text-xs text-text-secondary",
			children: u.map((e, t) => /* @__PURE__ */ U("li", {
				className: "overflow-hidden text-ellipsis whitespace-nowrap",
				children: ["• ", e]
			}, t))
		}),
		selected: r,
		onRetry: c,
		hasBreakpoint: n._hasBreakpoint,
		pausedAtBreakpoint: n._pausedAtBreakpoint,
		children: [/* @__PURE__ */ H(W, {
			type: "target",
			position: G.Left,
			id: "in",
			className: J("data")
		}), u.map((e, t) => {
			let n = (t + 1) / (l + 1) * 100;
			return /* @__PURE__ */ H(W, {
				type: "source",
				position: G.Right,
				id: `branch-${t}`,
				className: J("control"),
				style: { top: `${n}%` }
			}, t);
		})]
	});
}
//#endregion
//#region src/components/pipelines/nodes/join/JoinNode.tsx
function Ht(e) {
	return e.mode === "all" ? "all" : e.mode === "any" ? "any" : `${e.n ?? 1} of many`;
}
function Ut(e) {
	switch (e) {
		case "deep-merge": return "Deep merge";
		case "array-collect": return "Array collect";
		case "last-writer-wins": return "Last writer wins";
		default: return String(e);
	}
}
function Wt(e) {
	let { id: t, data: n, selected: r } = e, i = F(t), a = i?.status === "cancelled" ? "failed" : i?.status, o = (n._state && n._state !== "idle" ? n._state : void 0) ?? a ?? n._state ?? "idle", s = M(), c = o === "failed" ? () => s(t) : void 0, l = ht({ handleType: "target" }), u = Math.max(2, l.length + 1);
	return /* @__PURE__ */ U(K, {
		icon: "⑃",
		subtitle: Ht(n),
		state: o,
		category: q("join"),
		body: /* @__PURE__ */ H("span", {
			className: "italic",
			children: Ut(n.mergeStrategy)
		}),
		selected: r,
		onRetry: c,
		hasBreakpoint: n._hasBreakpoint,
		pausedAtBreakpoint: n._pausedAtBreakpoint,
		children: [Array.from({ length: u }, (e, t) => {
			let n = (t + 1) / (u + 1) * 100;
			return /* @__PURE__ */ H(W, {
				type: "target",
				position: G.Left,
				id: `in-${t}`,
				className: J("control"),
				style: { top: `${n}%` }
			}, `in-${t}`);
		}), /* @__PURE__ */ H(W, {
			type: "source",
			position: G.Right,
			id: "out",
			className: J("data")
		})]
	});
}
//#endregion
//#region src/components/pipelines/nodes/approval/ApprovalNode.tsx
function Gt(e) {
	return e.type === "role" ? `@${e.value}` : e.value;
}
function Kt(e) {
	let { id: t, data: n, selected: r } = e, i = F(t), a = i?.status === "cancelled" ? "failed" : i?.status, o = (n._state && n._state !== "idle" ? n._state : void 0) ?? a ?? n._state ?? "idle", s = M(), c = o === "failed" ? () => s(t) : void 0, l = n.approvers ?? [], u = l.length, d = n.requiredCount ?? 0, f = `${u} approver${u === 1 ? "" : "s"}, ${d}/${u} required`, p = l.slice(0, 2), m = Math.max(0, l.length - 2), h = l.length === 0 ? /* @__PURE__ */ H("span", {
		className: "italic text-text-tertiary",
		children: "No approvers"
	}) : /* @__PURE__ */ U("div", {
		className: "flex flex-wrap gap-1",
		children: [p.map((e, t) => /* @__PURE__ */ H("span", {
			className: "inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-surface-panel text-text-secondary border border-border max-w-[120px] overflow-hidden text-ellipsis whitespace-nowrap",
			children: Gt(e)
		}, t)), m > 0 && /* @__PURE__ */ U("span", {
			className: "inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-surface-inset text-text-tertiary border border-border max-w-[120px] overflow-hidden text-ellipsis whitespace-nowrap",
			children: [
				"+",
				m,
				" more"
			]
		})]
	});
	return /* @__PURE__ */ U(K, {
		icon: "✋",
		subtitle: f,
		state: o,
		category: q("approval"),
		body: h,
		selected: r,
		onRetry: c,
		hasBreakpoint: n._hasBreakpoint,
		pausedAtBreakpoint: n._pausedAtBreakpoint,
		children: [
			/* @__PURE__ */ H(W, {
				type: "target",
				position: G.Left,
				id: "in",
				className: J("data")
			}),
			/* @__PURE__ */ H(W, {
				type: "source",
				position: G.Right,
				id: "approved",
				className: `${J("data")} !top-[40%]`
			}),
			/* @__PURE__ */ H(W, {
				type: "source",
				position: G.Right,
				id: "rejected",
				className: `${J("data")} !top-[60%]`
			})
		]
	});
}
//#endregion
//#region src/components/pipelines/nodes/agent/AgentNode.tsx
function qt({ id: e, data: t, selected: n }) {
	let r = F(e), i = r?.status === "cancelled" ? "failed" : r?.status, a = t._state ?? i ?? "idle", o = M(), s = t.agentName || t.agentId || "Not configured", c = `${t.protocol.toUpperCase()}${t.streaming ? " (streaming)" : ""}`;
	return /* @__PURE__ */ U(K, {
		icon: "🤖",
		subtitle: s,
		state: a,
		category: q("agent"),
		body: /* @__PURE__ */ H("span", {
			className: "text-[11px]",
			children: c
		}),
		selected: n,
		onRetry: a === "failed" && r ? () => o(e) : void 0,
		hasBreakpoint: t._hasBreakpoint,
		pausedAtBreakpoint: t._pausedAtBreakpoint,
		children: [
			/* @__PURE__ */ H(W, {
				type: "target",
				position: G.Left,
				id: "in",
				className: J("data")
			}),
			/* @__PURE__ */ H(W, {
				type: "source",
				position: G.Right,
				id: "out",
				className: `${J("data")} !top-[40%]`
			}),
			/* @__PURE__ */ H(W, {
				type: "source",
				position: G.Right,
				id: "error",
				className: `${J("error")} !top-[60%]`
			})
		]
	});
}
//#endregion
//#region src/components/pipelines/nodes/mcp-tool/McpToolNode.tsx
function Jt({ id: e, data: t, selected: n }) {
	let r = F(e), i = r?.status === "cancelled" ? "failed" : r?.status, a = t._state ?? i ?? "idle", o = M(), s = t.toolName || "Not configured";
	return /* @__PURE__ */ U(K, {
		icon: "🔌",
		subtitle: s,
		state: a,
		category: q("mcp-tool"),
		body: t.gatewayUrl ? /* @__PURE__ */ H("span", {
			className: "text-[11px]",
			children: t.gatewayUrl
		}) : void 0,
		selected: n,
		onRetry: a === "failed" && r ? () => o(e) : void 0,
		hasBreakpoint: t._hasBreakpoint,
		pausedAtBreakpoint: t._pausedAtBreakpoint,
		children: [
			/* @__PURE__ */ H(W, {
				type: "target",
				position: G.Left,
				id: "in",
				className: J("data")
			}),
			/* @__PURE__ */ H(W, {
				type: "source",
				position: G.Right,
				id: "out",
				className: `${J("data")} !top-[40%]`
			}),
			/* @__PURE__ */ H(W, {
				type: "source",
				position: G.Right,
				id: "error",
				className: `${J("error")} !top-[60%]`
			})
		]
	});
}
//#endregion
//#region src/components/pipelines/nodes/knowledge-base/KnowledgeBaseNode.tsx
function Yt({ id: e, data: t, selected: n }) {
	let r = F(e), i = r?.status === "cancelled" ? "failed" : r?.status, a = t._state ?? i ?? "idle", o = M(), s = t.knowledgeBaseId || "Not configured", c = `Top ${t.topK} chunks${t.scoreThreshold ? ` (≥${t.scoreThreshold})` : ""}`;
	return /* @__PURE__ */ U(K, {
		icon: "📚",
		subtitle: s,
		state: a,
		category: q("knowledge-base"),
		body: /* @__PURE__ */ H("span", {
			className: "text-[11px]",
			children: c
		}),
		selected: n,
		onRetry: a === "failed" && r ? () => o(e) : void 0,
		hasBreakpoint: t._hasBreakpoint,
		pausedAtBreakpoint: t._pausedAtBreakpoint,
		children: [
			/* @__PURE__ */ H(W, {
				type: "target",
				position: G.Left,
				id: "in",
				className: J("data")
			}),
			/* @__PURE__ */ H(W, {
				type: "source",
				position: G.Right,
				id: "out",
				className: `${J("data")} !top-[40%]`
			}),
			/* @__PURE__ */ H(W, {
				type: "source",
				position: G.Right,
				id: "error",
				className: `${J("error")} !top-[60%]`
			})
		]
	});
}
//#endregion
//#region src/components/pipelines/nodes/graph-query/GraphQueryNode.tsx
function Xt({ id: e, data: t, selected: n }) {
	let r = F(e), i = r?.status === "cancelled" ? "failed" : r?.status, a = t._state ?? i ?? "idle", o = M(), s = t.graphId || "Not configured", c = t.query.length > 40 ? `${t.query.slice(0, 37)}...` : t.query;
	return /* @__PURE__ */ U(K, {
		icon: "🕸️",
		subtitle: s,
		state: a,
		category: q("graph-query"),
		body: /* @__PURE__ */ H("span", {
			className: "text-[11px] font-mono",
			children: c
		}),
		selected: n,
		onRetry: a === "failed" && r ? () => o(e) : void 0,
		hasBreakpoint: t._hasBreakpoint,
		pausedAtBreakpoint: t._pausedAtBreakpoint,
		children: [
			/* @__PURE__ */ H(W, {
				type: "target",
				position: G.Left,
				id: "in",
				className: J("data")
			}),
			/* @__PURE__ */ H(W, {
				type: "source",
				position: G.Right,
				id: "out",
				className: `${J("data")} !top-[40%]`
			}),
			/* @__PURE__ */ H(W, {
				type: "source",
				position: G.Right,
				id: "error",
				className: `${J("error")} !top-[60%]`
			})
		]
	});
}
//#endregion
//#region src/components/pipelines/nodes/memory/MemoryNode.tsx
function Zt({ id: e, data: t, selected: n }) {
	let r = F(e), i = r?.status === "cancelled" ? "failed" : r?.status, a = t._state ?? i ?? "idle", o = M(), s = `${t.mode} ${t.scope}`, c = t.namespace ? `ns: ${t.namespace}` : "No namespace";
	return /* @__PURE__ */ U(K, {
		icon: "💾",
		subtitle: s,
		state: a,
		category: q("memory"),
		body: /* @__PURE__ */ H("span", {
			className: "text-[11px]",
			children: c
		}),
		selected: n,
		onRetry: a === "failed" && r ? () => o(e) : void 0,
		hasBreakpoint: t._hasBreakpoint,
		pausedAtBreakpoint: t._pausedAtBreakpoint,
		children: [
			/* @__PURE__ */ H(W, {
				type: "target",
				position: G.Left,
				id: "in",
				className: J("data")
			}),
			/* @__PURE__ */ H(W, {
				type: "source",
				position: G.Right,
				id: "out",
				className: `${J("data")} !top-[40%]`
			}),
			/* @__PURE__ */ H(W, {
				type: "source",
				position: G.Right,
				id: "error",
				className: `${J("error")} !top-[60%]`
			})
		]
	});
}
//#endregion
//#region src/components/pipelines/nodes/guardrail/GuardrailNode.tsx
function Qt({ id: e, data: t, selected: n }) {
	let r = F(e), i = r?.status === "cancelled" ? "failed" : r?.status, a = t._state ?? i ?? "idle", o = M(), s = t.label || t.guardrailId || "Not configured";
	return /* @__PURE__ */ U(K, {
		icon: "🛡️",
		subtitle: s,
		state: a,
		category: q("guardrail"),
		body: /* @__PURE__ */ U("span", {
			className: "text-[11px]",
			children: ["Action: ", t.action]
		}),
		selected: n,
		onRetry: a === "failed" && r ? () => o(e) : void 0,
		hasBreakpoint: t._hasBreakpoint,
		pausedAtBreakpoint: t._pausedAtBreakpoint,
		children: [
			/* @__PURE__ */ H(W, {
				type: "target",
				position: G.Left,
				id: "in",
				className: J("data")
			}),
			/* @__PURE__ */ H(W, {
				type: "source",
				position: G.Right,
				id: "pass",
				className: `${J("control")} !top-[40%]`
			}),
			/* @__PURE__ */ H(W, {
				type: "source",
				position: G.Right,
				id: "block",
				className: `${J("control")} !top-[60%]`
			})
		]
	});
}
//#endregion
//#region src/components/pipelines/nodes/policy/PolicyNode.tsx
function $t({ id: e, data: t, selected: n }) {
	let r = F(e), i = r?.status === "cancelled" ? "failed" : r?.status, a = t._state ?? i ?? "idle", o = M(), s = t.label || t.action || "Not configured";
	return /* @__PURE__ */ U(K, {
		icon: "📜",
		subtitle: s,
		state: a,
		category: q("policy"),
		body: /* @__PURE__ */ U("span", {
			className: "text-[11px]",
			children: [
				t.principal,
				" → ",
				t.resource
			]
		}),
		selected: n,
		onRetry: a === "failed" && r ? () => o(e) : void 0,
		hasBreakpoint: t._hasBreakpoint,
		pausedAtBreakpoint: t._pausedAtBreakpoint,
		children: [
			/* @__PURE__ */ H(W, {
				type: "target",
				position: G.Left,
				id: "in",
				className: J("data")
			}),
			/* @__PURE__ */ H(W, {
				type: "source",
				position: G.Right,
				id: "allow",
				className: `${J("control")} !top-[40%]`
			}),
			/* @__PURE__ */ H(W, {
				type: "source",
				position: G.Right,
				id: "deny",
				className: `${J("control")} !top-[60%]`
			})
		]
	});
}
//#endregion
//#region src/components/pipelines/nodes/ag-ui-output/AgUiOutputNode.tsx
function en({ id: e, data: t, selected: n }) {
	let r = F(e), i = r?.status === "cancelled" ? "failed" : r?.status, a = t._state ?? i ?? "idle", o = t.eventType === "CUSTOM" ? t.customEventName || "Custom" : t.eventType;
	return /* @__PURE__ */ H(K, {
		icon: "📡",
		subtitle: o,
		state: a,
		category: q("ag-ui-output"),
		body: /* @__PURE__ */ U("span", {
			className: "text-[11px]",
			children: ["Source: ", t.sourceField]
		}),
		footer: /* @__PURE__ */ H("span", {
			className: "text-[10px] text-primary",
			children: "Terminal — streams to AG-UI frontend"
		}),
		selected: n,
		hasBreakpoint: t._hasBreakpoint,
		pausedAtBreakpoint: t._pausedAtBreakpoint,
		children: /* @__PURE__ */ H(W, {
			type: "target",
			position: G.Left,
			id: "in",
			className: J("data")
		})
	});
}
//#endregion
//#region src/components/pipelines/nodes/image-source/ImageSourceNode.tsx
var tn = (e) => e.stopPropagation();
function nn(e) {
	let { id: t, data: n, selected: i } = e, [a, o] = B(!1), s = F(t), c = s?.status === "cancelled" ? "failed" : s?.status, l = (n._state && n._state !== "idle" ? n._state : void 0) ?? c ?? n._state ?? "idle", u = Fe(), f = s?.images?.[0]?.imageId ?? s?.output?.imageId ?? n.imageId, p = f ? /* @__PURE__ */ U(V, { children: [/* @__PURE__ */ H("button", {
		type: "button",
		"aria-label": "View source image",
		className: r("block w-full rounded border-none bg-transparent p-0 cursor-zoom-in", "focus:outline-none focus-visible:ring-2 focus-visible:ring-info"),
		onMouseDown: tn,
		onClick: (e) => {
			e.stopPropagation(), o(!0);
		},
		children: /* @__PURE__ */ H("img", {
			src: u(f),
			alt: "Source image",
			className: r("w-full h-20 object-cover rounded block", "border border-border-field bg-surface-hover"),
			"data-testid": "image-source-thumb"
		})
	}), /* @__PURE__ */ H(d, {
		images: [{
			src: u(f),
			alt: "Source image"
		}],
		openIndex: a ? 0 : null,
		onClose: () => o(!1)
	})] }) : /* @__PURE__ */ H("div", {
		className: r("w-full h-20 rounded flex items-center justify-center", "border border-dashed border-border-field bg-surface-hover", "text-[11px] text-text-secondary"),
		"data-testid": "image-source-placeholder",
		children: "No image configured"
	}), m = f ? /* @__PURE__ */ U("span", {
		className: "font-mono text-[11px] text-text-secondary",
		children: [f.slice(0, 16), "…"]
	}) : void 0;
	return /* @__PURE__ */ U(K, {
		icon: "🖼",
		subtitle: "image-source",
		state: l,
		category: q("image-source"),
		body: p,
		footer: m,
		selected: i,
		ariaLabel: `Image Source node, state: ${l}`,
		hasBreakpoint: n._hasBreakpoint,
		pausedAtBreakpoint: n._pausedAtBreakpoint,
		children: [/* @__PURE__ */ H(W, {
			type: "target",
			position: G.Left,
			id: "in",
			className: J("control")
		}), /* @__PURE__ */ H(W, {
			type: "source",
			position: G.Right,
			id: "out",
			className: J("image")
		})]
	});
}
//#endregion
//#region src/components/pipelines/nodes/shared/NodeThumbStrip.tsx
var rn = (e) => e.stopPropagation(), an = r("h-[38px] w-[38px] shrink-0 overflow-hidden rounded border border-border bg-surface-inset", "p-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-info");
function on({ images: e, max: t = 4, "data-testid": n = "node-thumb-strip" }) {
	let i = Fe(), [a, o] = B(null);
	if (e.length === 0) return null;
	let s = e.length > t, c = s ? e.slice(0, t - 1) : e, l = e.length - c.length, u = (e) => (t) => {
		t.stopPropagation(), o(e);
	};
	return /* @__PURE__ */ U(V, { children: [/* @__PURE__ */ U("div", {
		"data-testid": n,
		className: "flex flex-row items-center gap-1",
		children: [c.map((t, r) => /* @__PURE__ */ H("button", {
			type: "button",
			"data-testid": `${n}-thumb-${r}`,
			"aria-label": t.alt ?? `Result image ${r + 1} of ${e.length}`,
			className: an,
			onMouseDown: rn,
			onClick: u(r),
			children: /* @__PURE__ */ H("img", {
				src: i(t.imageId),
				alt: t.alt ?? "",
				loading: "lazy",
				className: "h-full w-full object-cover"
			})
		}, `${t.imageId}-${r}`)), s && /* @__PURE__ */ U("button", {
			type: "button",
			"data-testid": `${n}-overflow`,
			"aria-label": `Show all ${e.length} images`,
			className: r(an, "flex items-center justify-center font-mono text-[11px] font-medium text-text-secondary"),
			onMouseDown: rn,
			onClick: u(c.length),
			children: ["+", l]
		})]
	}), /* @__PURE__ */ H(d, {
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
function sn(e) {
	let { id: t, data: n, selected: i } = e, a = F(t), o = a?.status === "cancelled" ? "failed" : a?.status, s = (n._state && n._state !== "idle" ? n._state : void 0) ?? o ?? n._state ?? "idle", c = a?.images ?? [], l = a?.output?.filename ?? null, u = c.length > 0 ? /* @__PURE__ */ U("div", { children: [/* @__PURE__ */ H(on, {
		images: c,
		"data-testid": "save-thumb-strip"
	}), l && /* @__PURE__ */ H("div", {
		className: "mt-1 text-[10px] font-mono text-text-secondary overflow-hidden text-ellipsis whitespace-nowrap",
		"data-testid": "save-filename-badge",
		title: l,
		children: l
	})] }) : /* @__PURE__ */ H("div", {
		className: r("w-full h-20 rounded flex items-center justify-center", "border border-dashed border-border-field bg-surface-hover", "text-[11px] text-text-secondary"),
		"data-testid": "save-placeholder",
		children: "Awaiting input"
	}), d = n.filenameTemplate ?? "crop-{{scatter.index}}.png", f = d.length > 28 ? `${d.slice(0, 25)}…` : d, p = /* @__PURE__ */ H("span", {
		className: "font-mono text-[11px] text-text-secondary",
		"data-testid": "save-footer",
		title: d,
		children: f
	}), m = `Save node, template: ${d}, state: ${s}`;
	return /* @__PURE__ */ U(K, {
		icon: "⬇",
		subtitle: "image:save",
		state: s,
		category: q("image:save"),
		body: u,
		footer: p,
		selected: i,
		ariaLabel: m,
		hasBreakpoint: n._hasBreakpoint,
		pausedAtBreakpoint: n._pausedAtBreakpoint,
		children: [
			/* @__PURE__ */ H(W, {
				type: "target",
				position: G.Left,
				id: "in",
				className: J("image")
			}),
			/* @__PURE__ */ H(W, {
				type: "source",
				position: G.Right,
				id: "out",
				className: J("image")
			}),
			/* @__PURE__ */ H(W, {
				type: "source",
				position: G.Right,
				id: "error",
				className: `${J("error")} !top-[75%]`
			})
		]
	});
}
//#endregion
//#region src/components/pipelines/nodes/scatter/ScatterNode.tsx
function cn(e) {
	return e ? e.length > 40 ? `${e.slice(0, 37)}…` : e : "Not configured";
}
function ln(e) {
	let { id: t, data: n, selected: r } = e, i = F(t), a = i?.status === "cancelled" ? "failed" : i?.status, o = (n._state && n._state !== "idle" ? n._state : void 0) ?? a ?? n._state ?? "idle", s = i?.output, c = Array.isArray(s?.items) ? s.items.length : null, l = /* @__PURE__ */ U("div", {
		className: "flex flex-col gap-1",
		children: [/* @__PURE__ */ H("span", {
			className: "font-mono text-[11px] text-text-secondary break-all",
			children: cn(n.itemsPath ?? "")
		}), c !== null && /* @__PURE__ */ U("span", {
			className: "text-[11px] text-text-tertiary",
			children: [
				c,
				" item",
				c === 1 ? "" : "s",
				" resolved"
			]
		})]
	}), u = c, d = u !== null && o !== "idle" ? /* @__PURE__ */ U("span", {
		className: "inline-block text-[11px] font-semibold text-info-fg bg-info-bg border border-info rounded-full px-2 py-0.5",
		children: [
			"Dispatched ",
			u,
			" arm",
			u === 1 ? "" : "s"
		]
	}) : void 0, f = `scatter${n.itemAlias ? ` · alias: ${n.itemAlias}` : ""}${n.maxConcurrency ? ` · max ${n.maxConcurrency}` : ""}`, p = `Scatter node, path: ${n.itemsPath ?? "not set"}, state: ${o}`;
	return /* @__PURE__ */ U(K, {
		icon: "⑂",
		subtitle: f,
		state: o,
		category: q("scatter"),
		body: l,
		footer: d,
		selected: r,
		ariaLabel: p,
		hasBreakpoint: n._hasBreakpoint,
		pausedAtBreakpoint: n._pausedAtBreakpoint,
		children: [/* @__PURE__ */ H(W, {
			type: "target",
			position: G.Left,
			id: "in",
			className: J("data")
		}), /* @__PURE__ */ H(W, {
			type: "source",
			position: G.Right,
			id: "out",
			className: J("control")
		})]
	});
}
//#endregion
//#region src/components/pipelines/nodes/resize/ResizeNode.tsx
function un(e) {
	let { id: t, data: n, selected: r } = e, i = Fe(), a = F(t), o = a?.status === "cancelled" ? "failed" : a?.status, s = (n._state && n._state !== "idle" ? n._state : void 0) ?? o ?? n._state ?? "idle", c = a?.images?.[0] ?? null, l = n.width != null && n.height != null ? `→ ${n.width}×${n.height}` : n.width == null ? n.height == null ? null : `→ ${n.height}h` : `→ ${n.width}w`, u = c ? /* @__PURE__ */ H("img", {
		src: i(c.imageId),
		alt: "Resize output",
		className: "w-full h-20 object-cover rounded border border-border bg-surface-inset block",
		"data-testid": "resize-output-thumb"
	}) : /* @__PURE__ */ H("div", {
		className: "w-full h-20 rounded border border-dashed border-border bg-surface-inset flex items-center justify-center text-[11px] text-text-tertiary",
		"data-testid": "resize-placeholder",
		children: l ?? "No image yet"
	}), d = l ? /* @__PURE__ */ U("span", {
		className: "font-mono text-[11px] text-text-tertiary",
		children: [l, n.fit ? ` · ${n.fit}` : ""]
	}) : void 0;
	return /* @__PURE__ */ U(K, {
		icon: "⥂",
		subtitle: "image:resize",
		state: s,
		category: q("image:resize"),
		body: u,
		footer: d,
		selected: r,
		ariaLabel: `Resize node, state: ${s}`,
		hasBreakpoint: n._hasBreakpoint,
		pausedAtBreakpoint: n._pausedAtBreakpoint,
		children: [
			/* @__PURE__ */ H(W, {
				type: "target",
				position: G.Left,
				id: "in",
				className: J("image")
			}),
			/* @__PURE__ */ H(W, {
				type: "source",
				position: G.Right,
				id: "out",
				className: J("image")
			}),
			/* @__PURE__ */ H(W, {
				type: "source",
				position: G.Right,
				id: "error",
				className: `${J("error")} !bottom-2 !top-auto`
			})
		]
	});
}
//#endregion
//#region src/components/pipelines/nodes/transform-geo/TransformGeoNode.tsx
function dn(e) {
	switch (e.op) {
		case "rotate": return `rotate ${e.degrees}°`;
		case "flip": return "flip ↕";
		case "flop": return "flop ↔";
	}
}
function fn(e) {
	let { id: t, data: n, selected: r } = e, i = Fe(), a = F(t), o = a?.status === "cancelled" ? "failed" : a?.status, s = (n._state && n._state !== "idle" ? n._state : void 0) ?? o ?? n._state ?? "idle", c = a?.images?.[0] ?? null, l = n.operations ?? [], u = l.length > 0 ? l.map(dn).join("  ›  ") : null, d = c ? /* @__PURE__ */ H("img", {
		src: i(c.imageId),
		alt: "Transform output",
		className: "w-full h-20 object-cover rounded border border-border bg-surface-inset block",
		"data-testid": "transform-geo-output-thumb"
	}) : /* @__PURE__ */ H("div", {
		className: "w-full h-20 rounded border border-dashed border-border bg-surface-inset flex items-center justify-center text-[11px] text-text-tertiary",
		"data-testid": "transform-geo-placeholder",
		children: u ?? "No ops configured"
	}), f = u ? /* @__PURE__ */ H("span", {
		className: "font-mono text-[11px] text-text-tertiary",
		children: u
	}) : void 0;
	return /* @__PURE__ */ U(K, {
		icon: "↻",
		subtitle: "image:transform",
		state: s,
		category: q("image:transform"),
		body: d,
		footer: f,
		selected: r,
		ariaLabel: `Transform node, ops: ${l.length}, state: ${s}`,
		hasBreakpoint: n._hasBreakpoint,
		pausedAtBreakpoint: n._pausedAtBreakpoint,
		children: [
			/* @__PURE__ */ H(W, {
				type: "target",
				position: G.Left,
				id: "in",
				className: J("image")
			}),
			/* @__PURE__ */ H(W, {
				type: "source",
				position: G.Right,
				id: "out",
				className: J("image")
			}),
			/* @__PURE__ */ H(W, {
				type: "source",
				position: G.Right,
				id: "error",
				className: `${J("error")} !bottom-2 !top-auto`
			})
		]
	});
}
//#endregion
//#region src/components/pipelines/nodes/format-convert/FormatConvertNode.tsx
function pn(e) {
	let t = e.format?.toUpperCase() ?? "?", n = e.lossless ? "lossless" : e.quality == null ? "" : `q${e.quality}`;
	return n ? `${t} ${n}` : t;
}
function mn(e) {
	let { id: t, data: n, selected: r } = e, i = Fe(), a = F(t), o = a?.status === "cancelled" ? "failed" : a?.status, s = (n._state && n._state !== "idle" ? n._state : void 0) ?? o ?? n._state ?? "idle", c = a?.images?.[0] ?? null, l = n.format ? pn(n) : null, u = c ? /* @__PURE__ */ H("img", {
		src: i(c.imageId),
		alt: "Format convert output",
		className: "w-full h-20 object-cover rounded border border-border bg-surface-inset block",
		"data-testid": "format-convert-output-thumb"
	}) : /* @__PURE__ */ H("div", {
		className: "w-full h-20 rounded border border-dashed border-border bg-surface-inset flex items-center justify-center text-[11px] text-text-tertiary",
		"data-testid": "format-convert-placeholder",
		children: l ?? "No format set"
	}), d = l ? /* @__PURE__ */ H("span", {
		className: "font-mono text-[11px] bg-surface-inset border border-border rounded px-1.5 py-0.5 text-text-secondary",
		children: l
	}) : void 0;
	return /* @__PURE__ */ U(K, {
		icon: "⇌",
		subtitle: "image:format-convert",
		state: s,
		category: q("image:format-convert"),
		body: u,
		footer: d,
		selected: r,
		ariaLabel: `Format Convert node, format: ${n.format ?? "unset"}, state: ${s}`,
		hasBreakpoint: n._hasBreakpoint,
		pausedAtBreakpoint: n._pausedAtBreakpoint,
		children: [
			/* @__PURE__ */ H(W, {
				type: "target",
				position: G.Left,
				id: "in",
				className: J("image")
			}),
			/* @__PURE__ */ H(W, {
				type: "source",
				position: G.Right,
				id: "out",
				className: J("image")
			}),
			/* @__PURE__ */ H(W, {
				type: "source",
				position: G.Right,
				id: "error",
				className: `${J("error")} !bottom-2 !top-auto`
			})
		]
	});
}
//#endregion
//#region src/components/pipelines/nodes/sharpen/SharpenNode.tsx
function hn(e) {
	let { id: t, data: n, selected: r } = e, i = Fe(), a = F(t), o = a?.status === "cancelled" ? "failed" : a?.status, s = (n._state && n._state !== "idle" ? n._state : void 0) ?? o ?? n._state ?? "idle", c = a?.images?.[0] ?? null, l = n.sigma == null ? null : `σ ${n.sigma}`, u = c ? /* @__PURE__ */ H("img", {
		src: i(c.imageId),
		alt: "Sharpen output",
		className: "w-full h-20 object-cover rounded border border-border bg-surface-inset block",
		"data-testid": "sharpen-output-thumb"
	}) : /* @__PURE__ */ H("div", {
		className: "w-full h-20 rounded border border-dashed border-border bg-surface-inset flex items-center justify-center text-[11px] text-text-tertiary",
		"data-testid": "sharpen-placeholder",
		children: l ?? "Sharpen (default σ)"
	}), d = l ? /* @__PURE__ */ H("span", {
		className: "font-mono text-[11px] bg-surface-inset border border-border rounded px-1.5 py-0.5 text-text-secondary",
		children: l
	}) : void 0;
	return /* @__PURE__ */ U(K, {
		icon: "◈",
		subtitle: "image:sharpen",
		state: s,
		category: q("image:sharpen"),
		body: u,
		footer: d,
		selected: r,
		ariaLabel: `Sharpen node, sigma: ${n.sigma ?? "default"}, state: ${s}`,
		hasBreakpoint: n._hasBreakpoint,
		pausedAtBreakpoint: n._pausedAtBreakpoint,
		children: [
			/* @__PURE__ */ H(W, {
				type: "target",
				position: G.Left,
				id: "in",
				className: J("image")
			}),
			/* @__PURE__ */ H(W, {
				type: "source",
				position: G.Right,
				id: "out",
				className: J("image")
			}),
			/* @__PURE__ */ H(W, {
				type: "source",
				position: G.Right,
				id: "error",
				className: `${J("error")} !bottom-2 !top-auto`
			})
		]
	});
}
//#endregion
//#region src/components/pipelines/nodes/watermark/WatermarkNode.tsx
function gn(e) {
	let { id: t, data: n, selected: r } = e, i = Fe(), a = F(t), o = a?.status === "cancelled" ? "failed" : a?.status, s = (n._state && n._state !== "idle" ? n._state : void 0) ?? o ?? n._state ?? "idle", c = a?.images?.[0] ?? null, l = n.gravity ?? "southeast", u = n.opacity == null ? "100%" : `${Math.round(n.opacity * 100)}%`, d = c ? /* @__PURE__ */ H("img", {
		src: i(c.imageId),
		alt: "Watermark output",
		className: "w-full h-20 object-cover rounded border border-border bg-surface-inset block",
		"data-testid": "watermark-output-thumb"
	}) : /* @__PURE__ */ H("div", {
		className: "w-full h-20 rounded border border-dashed border-border bg-surface-inset flex items-center justify-center text-[11px] text-text-tertiary",
		"data-testid": "watermark-placeholder",
		children: n.overlayImageId ? `${l} · ${u}` : "No overlay image set"
	}), f = n.overlayImageId ? /* @__PURE__ */ U("span", {
		className: "font-mono text-[11px] text-text-tertiary",
		children: [
			l,
			" · ",
			u
		]
	}) : void 0;
	return /* @__PURE__ */ U(K, {
		icon: "⊕",
		subtitle: "image:watermark",
		state: s,
		category: q("image:watermark"),
		body: d,
		footer: f,
		selected: r,
		ariaLabel: `Watermark node, gravity: ${l}, state: ${s}`,
		hasBreakpoint: n._hasBreakpoint,
		pausedAtBreakpoint: n._pausedAtBreakpoint,
		children: [
			/* @__PURE__ */ H(W, {
				type: "target",
				position: G.Left,
				id: "in",
				className: J("image")
			}),
			/* @__PURE__ */ H(W, {
				type: "source",
				position: G.Right,
				id: "out",
				className: J("image")
			}),
			/* @__PURE__ */ H(W, {
				type: "source",
				position: G.Right,
				id: "error",
				className: `${J("error")} !bottom-2 !top-auto`
			})
		]
	});
}
//#endregion
//#region src/components/pipelines/nodes/crop/CropNode.tsx
function _n(e) {
	if (!e) return null;
	let t = e.x + e.width, n = e.y + e.height;
	return `[${e.x},${e.y} → ${t},${n}]`;
}
function vn(e) {
	let { id: t, data: n, selected: r } = e, i = Fe(), a = F(t), o = a?.status === "cancelled" ? "failed" : a?.status, s = (n._state && n._state !== "idle" ? n._state : void 0) ?? o ?? n._state ?? "idle", c = a?.images?.[0] ?? null, l = a?.output, u = _n(c?.bbox ?? l?.bbox), d = c ? /* @__PURE__ */ H("img", {
		src: i(c.imageId),
		alt: "Crop output",
		className: "w-full h-20 object-cover rounded border border-border bg-surface-inset block",
		"data-testid": "crop-output-thumb"
	}) : /* @__PURE__ */ H("div", {
		className: "w-full h-20 rounded border border-dashed border-border bg-surface-inset flex items-center justify-center text-[11px] text-text-tertiary",
		"data-testid": "crop-placeholder",
		children: "No crop yet"
	}), f = u ? /* @__PURE__ */ H("span", {
		className: "font-mono text-[11px] text-text-tertiary",
		"data-testid": "crop-bbox-coords",
		children: u
	}) : void 0, p = `Crop node, source: ${n.sourceImagePath ?? "default"}, state: ${s}`;
	return /* @__PURE__ */ U(K, {
		icon: "✂",
		subtitle: "image:crop",
		state: s,
		category: q("image:crop"),
		body: d,
		footer: f,
		selected: r,
		ariaLabel: p,
		hasBreakpoint: n._hasBreakpoint,
		pausedAtBreakpoint: n._pausedAtBreakpoint,
		children: [/* @__PURE__ */ H(W, {
			type: "target",
			position: G.Left,
			id: "in",
			className: J("image")
		}), /* @__PURE__ */ H(W, {
			type: "source",
			position: G.Right,
			id: "out",
			className: J("image")
		})]
	});
}
//#endregion
//#region src/components/pipelines/nodes/adjust-bw/AdjustBwNode.tsx
function yn(e) {
	let { id: t, data: n, selected: r } = e, i = Fe(), a = F(t), o = a?.status === "cancelled" ? "failed" : a?.status, s = (n._state && n._state !== "idle" ? n._state : void 0) ?? o ?? n._state ?? "idle", c = a?.images?.[0] ?? null, l = c ? /* @__PURE__ */ H("div", {
		className: "flex gap-1 w-full",
		children: /* @__PURE__ */ U("div", {
			className: "flex-1 min-w-0",
			children: [/* @__PURE__ */ H("img", {
				src: i(c.imageId),
				alt: "B/W output",
				className: "flex-1 h-16 object-cover rounded border border-border bg-surface-inset block",
				"data-testid": "adjust-bw-output-thumb"
			}), /* @__PURE__ */ H("div", {
				className: "text-[9px] text-text-tertiary text-center mt-0.5",
				children: "output"
			})]
		})
	}) : /* @__PURE__ */ H("div", {
		className: "w-full h-16 rounded border border-dashed border-border bg-surface-inset flex items-center justify-center text-[11px] text-text-tertiary",
		"data-testid": "adjust-bw-placeholder",
		children: "Awaiting input"
	}), u = n.algorithm ?? "luminosity", d = n.contrast ?? 1, f = /* @__PURE__ */ U("span", {
		className: "font-mono text-[11px] text-text-tertiary",
		"data-testid": "adjust-bw-footer",
		children: [
			u,
			" · contrast ",
			d
		]
	}), p = `Adjust B/W node, algorithm: ${u}, state: ${s}`;
	return /* @__PURE__ */ U(K, {
		icon: "◐",
		subtitle: "image:adjust-bw",
		state: s,
		category: q("image:adjust-bw"),
		body: l,
		footer: f,
		selected: r,
		ariaLabel: p,
		hasBreakpoint: n._hasBreakpoint,
		pausedAtBreakpoint: n._pausedAtBreakpoint,
		children: [
			/* @__PURE__ */ H(W, {
				type: "target",
				position: G.Left,
				id: "in",
				className: J("image")
			}),
			/* @__PURE__ */ H(W, {
				type: "source",
				position: G.Right,
				id: "out",
				className: J("image")
			}),
			/* @__PURE__ */ H(W, {
				type: "source",
				position: G.Right,
				id: "error",
				className: `${J("error")} !top-[75%]`
			})
		]
	});
}
//#endregion
//#region src/components/pipelines/nodes/adjust-layer/AdjustLayerNode.tsx
function bn(e) {
	switch (e.kind) {
		case "brightness": return `brightness ${e.value}`;
		case "contrast": return `contrast ${e.value}`;
		case "saturation": return `sat ${e.value}`;
		case "hue": return `hue ${e.degrees}°`;
		case "blur": return `blur ${e.radiusPx}px`;
	}
}
function xn(e) {
	let { id: t, data: n, selected: r } = e, i = Fe(), a = F(t), o = a?.status === "cancelled" ? "failed" : a?.status, s = (n._state && n._state !== "idle" ? n._state : void 0) ?? o ?? n._state ?? "idle", c = a?.images?.[0] ?? null, l = n.layers ?? [], u = c ? /* @__PURE__ */ H("img", {
		src: i(c.imageId),
		alt: "Adjust output",
		className: "w-full h-20 object-cover rounded border border-border bg-surface-inset block",
		"data-testid": "adjust-layer-output-thumb"
	}) : l.length > 0 ? /* @__PURE__ */ H("div", {
		className: "w-full rounded border border-dashed border-border bg-surface-inset p-1.5 flex flex-wrap gap-1 min-h-8",
		"data-testid": "adjust-layer-chips",
		children: l.map((e, t) => /* @__PURE__ */ H("span", {
			className: "text-[10px] font-mono bg-surface-hover border border-border text-text-secondary rounded px-1 py-0.5",
			children: bn(e)
		}, t))
	}) : /* @__PURE__ */ H("div", {
		className: "w-full rounded border border-dashed border-border bg-surface-inset flex items-center justify-center text-[11px] text-text-tertiary min-h-8",
		"data-testid": "adjust-layer-placeholder",
		children: "Awaiting input"
	}), d = /* @__PURE__ */ U("span", {
		className: "text-[11px] text-text-tertiary",
		"data-testid": "adjust-layer-footer",
		children: [
			l.length,
			" layer",
			l.length === 1 ? "" : "s"
		]
	}), f = `Adjust Layer node, ${l.length} layer${l.length === 1 ? "" : "s"}, state: ${s}`;
	return /* @__PURE__ */ U(K, {
		icon: "𝍩",
		subtitle: "image:adjust-layer",
		state: s,
		category: q("image:adjust-layer"),
		body: u,
		footer: d,
		selected: r,
		ariaLabel: f,
		hasBreakpoint: n._hasBreakpoint,
		pausedAtBreakpoint: n._pausedAtBreakpoint,
		children: [
			/* @__PURE__ */ H(W, {
				type: "target",
				position: G.Left,
				id: "in",
				className: J("image")
			}),
			/* @__PURE__ */ H(W, {
				type: "source",
				position: G.Right,
				id: "out",
				className: J("image")
			}),
			/* @__PURE__ */ H(W, {
				type: "source",
				position: G.Right,
				id: "error",
				className: `${J("error")} !top-[75%]`
			})
		]
	});
}
//#endregion
//#region src/components/pipelines/nodes/dimensions/DimensionsNode.tsx
function Sn(e) {
	let { id: t, data: n, selected: r } = e, i = F(t), a = i?.status === "cancelled" ? "failed" : i?.status, o = (n._state && n._state !== "idle" ? n._state : void 0) ?? a ?? n._state ?? "idle", s = i?.output ?? void 0, c = s?.genWidth != null && s?.genHeight != null ? `${s.genWidth}×${s.genHeight}` : null, l = c ? /* @__PURE__ */ U("div", {
		className: "w-full h-20 rounded border border-border bg-surface-inset flex flex-col items-center justify-center gap-0.5 text-text-secondary",
		"data-testid": "dimensions-output",
		children: [/* @__PURE__ */ H("span", {
			className: "font-mono text-[13px]",
			children: c
		}), s?.width != null && s?.height != null && /* @__PURE__ */ U("span", {
			className: "font-mono text-[11px] text-text-tertiary",
			children: [
				"src ",
				s.width,
				"×",
				s.height
			]
		})]
	}) : /* @__PURE__ */ H("div", {
		className: "w-full h-20 rounded border border-dashed border-border bg-surface-inset flex items-center justify-center text-[11px] text-text-tertiary",
		"data-testid": "dimensions-placeholder",
		children: "reads image size"
	}), u = /* @__PURE__ */ U("span", {
		className: "font-mono text-[11px] text-text-tertiary",
		children: ["maxEdge ", n.maxEdge ?? 1024]
	});
	return /* @__PURE__ */ U(K, {
		icon: "📐",
		subtitle: "image:dimensions",
		state: o,
		category: q("image:dimensions"),
		body: l,
		footer: u,
		selected: r,
		ariaLabel: `Dimensions node, state: ${o}`,
		hasBreakpoint: n._hasBreakpoint,
		pausedAtBreakpoint: n._pausedAtBreakpoint,
		children: [
			/* @__PURE__ */ H(W, {
				type: "target",
				position: G.Left,
				id: "in",
				className: J("image")
			}),
			/* @__PURE__ */ H(W, {
				type: "source",
				position: G.Right,
				id: "out",
				className: J("data")
			}),
			/* @__PURE__ */ H(W, {
				type: "source",
				position: G.Right,
				id: "error",
				className: `${J("error")} !bottom-2 !top-auto`
			})
		]
	});
}
//#endregion
//#region src/components/pipelines/nodes/upscale/UpscaleNode.tsx
function Cn(e) {
	let { id: t, data: n, selected: r } = e, i = Fe(), a = F(t), o = a?.status === "cancelled" ? "failed" : a?.status, s = (n._state && n._state !== "idle" ? n._state : void 0) ?? o ?? n._state ?? "idle", c = a?.images?.[0] ?? null, l = `≤ ${n.maxEdge ?? 1024}px → 4×`, u = c ? /* @__PURE__ */ H("img", {
		src: i(c.imageId),
		alt: "Upscale output",
		className: "w-full h-20 object-cover rounded border border-border bg-surface-inset block",
		"data-testid": "upscale-output-thumb"
	}) : /* @__PURE__ */ H("div", {
		className: "w-full h-20 rounded border border-dashed border-border bg-surface-inset flex items-center justify-center text-[11px] text-text-tertiary",
		"data-testid": "upscale-placeholder",
		children: l
	}), d = /* @__PURE__ */ H("span", {
		className: "font-mono text-[11px] text-text-tertiary",
		children: l
	});
	return /* @__PURE__ */ U(K, {
		icon: "⤢",
		subtitle: "image:upscale",
		state: s,
		category: q("image:upscale"),
		body: u,
		footer: d,
		selected: r,
		ariaLabel: `Upscale node, state: ${s}`,
		hasBreakpoint: n._hasBreakpoint,
		pausedAtBreakpoint: n._pausedAtBreakpoint,
		children: [
			/* @__PURE__ */ H(W, {
				type: "target",
				position: G.Left,
				id: "in",
				className: J("image")
			}),
			/* @__PURE__ */ H(W, {
				type: "source",
				position: G.Right,
				id: "out",
				className: J("image")
			}),
			/* @__PURE__ */ H(W, {
				type: "source",
				position: G.Right,
				id: "error",
				className: `${J("error")} !bottom-2 !top-auto`
			})
		]
	});
}
//#endregion
//#region src/components/pipelines/nodes/vision/VisionNode.tsx
function wn(e) {
	return e === 0 ? "$0" : e < .001 ? "<$0.001" : e < 1 ? `$${e.toFixed(3)}` : `$${e.toFixed(2)}`;
}
function Tn(e) {
	if (!e || e.trim().length === 0) return "Not configured";
	let t = e.split("\n").slice(0, 2).join(" ").trim();
	return t.length > 120 ? `${t.slice(0, 117)}…` : t;
}
var En = (e) => e.stopPropagation(), Dn = $e(function({ info: e }) {
	let [t, n] = B(!1), [i, a] = B(!1);
	if (e.failure) {
		let t = e.failure.reason === "refusal";
		return /* @__PURE__ */ U("div", { children: [
			/* @__PURE__ */ H("output", {
				"aria-live": "polite",
				className: "sr-only",
				children: t ? "Content policy refusal" : `Failure: ${e.failure.reason}`
			}),
			/* @__PURE__ */ U("div", {
				className: "flex items-start gap-1",
				children: [/* @__PURE__ */ H("span", {
					className: "bg-transparent border-none p-0 text-[12px] text-danger-fg font-medium text-left",
					children: t ? "✕ Content policy refusal" : `✕ ${e.failure.reason}`
				}), e.onRetry && /* @__PURE__ */ H("button", {
					type: "button",
					onClick: e.onRetry,
					className: "ml-2 bg-transparent border border-border-emphasis rounded px-1.5 py-0.5 text-[11px] cursor-pointer text-text-secondary",
					title: "Retry this step",
					children: "Retry ↺"
				})]
			}),
			/* @__PURE__ */ H("div", {
				className: "mt-1 font-mono text-[11px] leading-snug text-text-secondary",
				children: e.failure.error
			})
		] });
	}
	let o = e.tokensIn != null || e.tokensOut != null, s = !e.streaming && !e.awaiting && e.response.length > 0, c = t ? e.response : e.response.length > 60 ? `${e.response.slice(0, 60)}…` : e.response, l = e.awaiting ? "Vision: waiting for first token" : e.streaming ? "Vision: streaming response" : s ? "Vision: completed" : "";
	return /* @__PURE__ */ U("div", { children: [
		/* @__PURE__ */ H("output", {
			"aria-live": "polite",
			className: "sr-only",
			children: l
		}),
		/* @__PURE__ */ U("button", {
			type: "button",
			onClick: () => n((e) => !e),
			className: "bg-transparent border-none p-0 cursor-pointer font-inherit text-[12px] text-text-secondary font-medium text-left",
			children: [
				t ? "▾" : "▸",
				" ",
				e.streaming ? "Streaming" : "Response",
				typeof e.costUsd == "number" && /* @__PURE__ */ U("span", {
					className: "ml-1.5 text-[11px] text-text-tertiary",
					"data-testid": "vision-cost",
					title: "Cost based on model usage rate",
					children: ["· ", wn(e.costUsd)]
				}),
				o && /* @__PURE__ */ U("span", {
					className: "ml-1.5 text-[11px] text-text-tertiary",
					children: [
						"· ",
						e.tokensIn ?? 0,
						" → ",
						e.tokensOut ?? 0,
						" tokens"
					]
				}),
				e.awaiting && /* @__PURE__ */ H("span", {
					className: "ml-1.5 text-[11px] text-info-fg",
					"data-testid": "vision-awaiting",
					children: "· waiting…"
				}),
				e.streaming && !e.awaiting && /* @__PURE__ */ H("span", {
					className: "ml-1.5 text-[11px] text-text-tertiary",
					children: "· streaming…"
				})
			]
		}),
		s && e.imageId && /* @__PURE__ */ H("button", {
			type: "button",
			onClick: () => window.dispatchEvent(new CustomEvent("pipeline:open-run-modal")),
			className: "mt-1 block bg-transparent border-none p-0 cursor-pointer text-[11px] text-primary underline font-inherit",
			children: "Run with new image →"
		}),
		e.imageId && /* @__PURE__ */ U(V, { children: [/* @__PURE__ */ H("button", {
			type: "button",
			"aria-label": "View vision input image",
			className: r("mt-1.5 block h-14 w-14 overflow-hidden rounded border border-border bg-surface-inset", "p-0 cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-info"),
			onMouseDown: En,
			onClick: (e) => {
				e.stopPropagation(), a(!0);
			},
			children: /* @__PURE__ */ H("img", {
				src: e.getImageUrl(e.imageId),
				alt: "Vision input",
				className: "h-full w-full object-cover",
				"data-testid": "vision-input-thumb"
			})
		}), /* @__PURE__ */ H(d, {
			images: [{
				src: e.getImageUrl(e.imageId),
				alt: "Vision input",
				caption: "Vision input"
			}],
			openIndex: i ? 0 : null,
			onClose: () => a(!1)
		})] }),
		/* @__PURE__ */ H("div", {
			className: r("mt-1 overflow-hidden font-mono text-[11px] leading-snug text-text-primary whitespace-pre-wrap break-words", t ? "max-h-none" : "max-h-[1.4em]"),
			children: c
		})
	] });
});
function On(e) {
	let { id: t, data: n, selected: r } = e, i = Fe(), a = F(t), o = a?.status === "cancelled" ? "failed" : a?.status, s = (n._state && n._state !== "idle" ? n._state : void 0) ?? o ?? n._state ?? "idle", c = M(), l = I(() => c(t), [c, t]), u = s === "failed" ? l : void 0, d = /* @__PURE__ */ H("span", {
		className: "italic text-text-secondary text-[13px]",
		children: Tn(n.userPrompt)
	}), f = a?.vision, p = s === "running" && f !== void 0 && f.tokensSeen > 0 && !f.analyzed, m = s === "running" && f !== void 0 && f.tokensSeen === 0 && !f.failure, h = R(() => f ? {
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
	]), g = h ? /* @__PURE__ */ H(Dn, { info: h }) : void 0, _ = n.model || "claude-sonnet-4-6", v = n.outputSchema ? "extract" : "caption", y = `Vision node, model ${_}, mode ${v}, state: ${s}`;
	return /* @__PURE__ */ U(K, {
		icon: "📷",
		subtitle: `${_} · ${v}`,
		state: s,
		category: q("image:vision-analyze"),
		body: d,
		footer: g,
		selected: r,
		onRetry: u,
		ariaLabel: y,
		hasBreakpoint: n._hasBreakpoint,
		pausedAtBreakpoint: n._pausedAtBreakpoint,
		children: [/* @__PURE__ */ H(W, {
			type: "target",
			position: G.Left,
			id: "in",
			className: J("image")
		}), /* @__PURE__ */ H(W, {
			type: "source",
			position: G.Right,
			id: "out",
			className: J("data")
		})]
	});
}
//#endregion
//#region src/components/pipelines/nodes/vision-classify/VisionClassifyNode.tsx
function kn(e) {
	let { id: t, data: n, selected: r } = e, i = F(t), a = i?.status === "cancelled" ? "failed" : i?.status, o = (n._state && n._state !== "idle" ? n._state : void 0) ?? a ?? n._state ?? "idle", s = i?.output, c = s?.extracted?.label, l = s?.extracted?.confidence, u = (n.labels ?? []).slice(0, 4).join(", "), d = c ? /* @__PURE__ */ U("div", {
		className: "flex items-center gap-1.5 py-0.5",
		children: [/* @__PURE__ */ H("span", {
			className: "text-[12px] font-semibold text-text-primary bg-surface-inset border border-border rounded px-2 py-0.5",
			"data-testid": "classify-label",
			children: c
		}), l != null && /* @__PURE__ */ U("span", {
			className: "text-[11px] font-mono text-text-tertiary",
			"data-testid": "classify-confidence",
			children: [(l * 100).toFixed(0), "%"]
		})]
	}) : /* @__PURE__ */ H("span", {
		className: "text-[11px] text-text-tertiary italic",
		children: u ? `Labels: ${u}` : "No labels configured"
	}), f = n.model ?? "claude-haiku-4-5";
	return /* @__PURE__ */ U(K, {
		icon: "🏷",
		subtitle: f,
		state: o,
		category: q("image:vision-classify"),
		body: d,
		selected: r,
		ariaLabel: `Vision Classify node, model: ${f}, state: ${o}`,
		hasBreakpoint: n._hasBreakpoint,
		pausedAtBreakpoint: n._pausedAtBreakpoint,
		children: [
			/* @__PURE__ */ H(W, {
				type: "target",
				position: G.Left,
				id: "in",
				className: J("image")
			}),
			/* @__PURE__ */ H(W, {
				type: "source",
				position: G.Right,
				id: "out",
				className: J("data")
			}),
			/* @__PURE__ */ H(W, {
				type: "source",
				position: G.Right,
				id: "error",
				className: `${J("error")} !bottom-2 !top-auto`
			})
		]
	});
}
//#endregion
//#region src/components/pipelines/nodes/vision-describe/VisionDescribeNode.tsx
function An(e) {
	let { id: t, data: n, selected: r } = e, i = F(t), a = i?.status === "cancelled" ? "failed" : i?.status, o = (n._state && n._state !== "idle" ? n._state : void 0) ?? a ?? n._state ?? "idle", s = (i?.output)?.extracted?.caption, c = s ? s.length > 80 ? `${s.slice(0, 77)}…` : s : null, l = n.userPrompt ? n.userPrompt.length > 60 ? `${n.userPrompt.slice(0, 57)}…` : n.userPrompt : "No prompt set", u = c ? /* @__PURE__ */ H("span", {
		className: "text-[11px] text-text-primary leading-snug",
		"data-testid": "describe-caption",
		children: c
	}) : /* @__PURE__ */ H("span", {
		className: "text-[11px] text-text-tertiary italic",
		children: l
	}), d = n.model ?? "claude-haiku-4-5";
	return /* @__PURE__ */ U(K, {
		icon: "💬",
		subtitle: d,
		state: o,
		category: q("image:vision-describe"),
		body: u,
		selected: r,
		ariaLabel: `Vision Describe node, model: ${d}, state: ${o}`,
		hasBreakpoint: n._hasBreakpoint,
		pausedAtBreakpoint: n._pausedAtBreakpoint,
		children: [
			/* @__PURE__ */ H(W, {
				type: "target",
				position: G.Left,
				id: "in",
				className: J("image")
			}),
			/* @__PURE__ */ H(W, {
				type: "source",
				position: G.Right,
				id: "out",
				className: J("data")
			}),
			/* @__PURE__ */ H(W, {
				type: "source",
				position: G.Right,
				id: "error",
				className: `${J("error")} !bottom-2 !top-auto`
			})
		]
	});
}
//#endregion
//#region src/components/pipelines/nodes/vision-tag/VisionTagNode.tsx
function jn(e) {
	let { id: t, data: n, selected: r } = e, i = F(t), a = i?.status === "cancelled" ? "failed" : i?.status, o = (n._state && n._state !== "idle" ? n._state : void 0) ?? a ?? n._state ?? "idle", s = ((i?.output)?.extracted?.tags ?? []).slice(0, 5), c = (n.candidateTags ?? []).slice(0, 3).join(", "), l = s.length > 0 ? /* @__PURE__ */ H("div", {
		className: "flex flex-wrap gap-1",
		"data-testid": "tag-pills",
		children: s.map((e) => /* @__PURE__ */ H("span", {
			className: "inline-block text-[10px] font-semibold bg-surface-inset border border-border rounded-full px-1.5 py-0.5 text-text-secondary whitespace-nowrap",
			children: e
		}, e))
	}) : /* @__PURE__ */ H("span", {
		className: "text-[11px] text-text-tertiary italic",
		children: c ? `Candidates: ${c}…` : "Open-vocabulary tagging"
	}), u = n.model ?? "claude-haiku-4-5";
	return /* @__PURE__ */ U(K, {
		icon: "🔖",
		subtitle: u,
		state: o,
		category: q("image:vision-tag"),
		body: l,
		selected: r,
		ariaLabel: `Vision Tag node, model: ${u}, state: ${o}`,
		hasBreakpoint: n._hasBreakpoint,
		pausedAtBreakpoint: n._pausedAtBreakpoint,
		children: [
			/* @__PURE__ */ H(W, {
				type: "target",
				position: G.Left,
				id: "in",
				className: J("image")
			}),
			/* @__PURE__ */ H(W, {
				type: "source",
				position: G.Right,
				id: "out",
				className: J("data")
			}),
			/* @__PURE__ */ H(W, {
				type: "source",
				position: G.Right,
				id: "error",
				className: `${J("error")} !bottom-2 !top-auto`
			})
		]
	});
}
//#endregion
//#region src/components/pipelines/nodes/vision-extract-text/VisionExtractTextNode.tsx
function Mn(e) {
	let { id: t, data: n, selected: r } = e, i = F(t), a = i?.status === "cancelled" ? "failed" : i?.status, o = (n._state && n._state !== "idle" ? n._state : void 0) ?? a ?? n._state ?? "idle", s = (i?.output)?.extracted?.lines ?? [], c = s[0], l = s.length > 0 ? /* @__PURE__ */ U("div", {
		"data-testid": "extract-text-result",
		children: [/* @__PURE__ */ U("div", {
			className: "text-[11px] text-text-tertiary mb-0.5",
			children: [
				s.length,
				" line",
				s.length === 1 ? "" : "s"
			]
		}), /* @__PURE__ */ H("div", {
			className: "font-mono text-[11px] text-text-primary whitespace-nowrap overflow-hidden text-ellipsis",
			"data-testid": "extract-text-first-line",
			children: c
		})]
	}) : /* @__PURE__ */ H("span", {
		className: "text-[11px] text-text-tertiary italic",
		children: "Awaiting OCR"
	}), u = n.model ?? "claude-sonnet-4-6";
	return /* @__PURE__ */ U(K, {
		icon: "📝",
		subtitle: u,
		state: o,
		category: q("image:vision-extract-text"),
		body: l,
		selected: r,
		ariaLabel: `Vision Extract Text node, model: ${u}, state: ${o}`,
		hasBreakpoint: n._hasBreakpoint,
		pausedAtBreakpoint: n._pausedAtBreakpoint,
		children: [
			/* @__PURE__ */ H(W, {
				type: "target",
				position: G.Left,
				id: "in",
				className: J("image")
			}),
			/* @__PURE__ */ H(W, {
				type: "source",
				position: G.Right,
				id: "out",
				className: J("data")
			}),
			/* @__PURE__ */ H(W, {
				type: "source",
				position: G.Right,
				id: "error",
				className: `${J("error")} !bottom-2 !top-auto`
			})
		]
	});
}
//#endregion
//#region src/components/pipelines/nodes/generate/GenerateNode.tsx
function Nn(e) {
	return !e || !e.trim() ? "No prompt set" : e.length > 80 ? `${e.slice(0, 77)}…` : e;
}
var Pn = (e) => e.stopPropagation();
function Fn(e) {
	let { id: t, data: n, selected: i } = e, a = Fe(), [o, s] = B(!1), c = F(t), l = c?.status === "cancelled" ? "failed" : c?.status, u = (n._state && n._state !== "idle" ? n._state : void 0) ?? l ?? n._state ?? "idle", f = c?.images ?? [], p = c?.startedAt ? Date.parse(c.startedAt) : NaN, m = u === "running" && f.length === 0, h = (n.numImages ?? 1) > 1 || f.length > 1, g;
	if (f.length > 0 && h) g = /* @__PURE__ */ H(on, {
		images: f,
		"data-testid": "generate-thumb-strip"
	});
	else if (m || f.length === 1) {
		let e = f[0] ? a(f[0].imageId) : void 0;
		g = /* @__PURE__ */ U(V, { children: [/* @__PURE__ */ H("button", {
			type: "button",
			"data-testid": "generate-output-preview",
			"aria-label": e ? "View generated image" : "Image synthesizing",
			className: r("block w-full rounded-md border-none bg-transparent p-0", "focus:outline-none focus-visible:ring-2 focus-visible:ring-info", e ? "cursor-zoom-in" : "cursor-default"),
			onMouseDown: Pn,
			onClick: (t) => {
				t.stopPropagation(), e && s(!0);
			},
			children: /* @__PURE__ */ H(Ee, {
				status: m ? "synthesizing" : "done",
				...e ? { src: e } : {},
				alt: "Generate output",
				...m && Number.isFinite(p) ? { startedAt: p } : {},
				className: "w-full h-20"
			})
		}), e && /* @__PURE__ */ H(d, {
			images: [{
				src: e,
				alt: "Generate output"
			}],
			openIndex: o ? 0 : null,
			onClose: () => s(!1)
		})] });
	} else g = /* @__PURE__ */ H("div", {
		className: "w-24 h-16 rounded border border-dashed border-border bg-surface-inset flex items-center justify-center px-2 text-center text-[11px] text-text-tertiary",
		"data-testid": "generate-placeholder",
		children: Nn(n.prompt)
	});
	let _ = (n.numImages ?? 1) > 1 ? `×${n.numImages}` : null, v = n.width && n.height ? `${n.width}×${n.height}` : null, y = _ || v ? /* @__PURE__ */ H("span", {
		className: "font-mono text-[11px] text-text-tertiary",
		children: [v, _].filter(Boolean).join(" · ")
	}) : void 0;
	return /* @__PURE__ */ U(K, {
		icon: "✦",
		subtitle: "image:generate",
		state: u,
		category: q("image:generate"),
		body: g,
		footer: y,
		selected: i,
		ariaLabel: `Generate node, state: ${u}`,
		hasBreakpoint: n._hasBreakpoint,
		pausedAtBreakpoint: n._pausedAtBreakpoint,
		children: [
			/* @__PURE__ */ H(W, {
				type: "target",
				position: G.Left,
				id: "in",
				className: J("data")
			}),
			/* @__PURE__ */ H(W, {
				type: "source",
				position: G.Right,
				id: "out",
				className: J("image")
			}),
			/* @__PURE__ */ H(W, {
				type: "source",
				position: G.Right,
				id: "error",
				className: `${J("error")} !bottom-2 !top-auto`
			})
		]
	});
}
//#endregion
//#region src/components/pipelines/nodes/variation/VariationNode.tsx
var In = (e) => e.stopPropagation();
function Ln(e) {
	let { id: t, data: n, selected: i } = e, a = Fe(), [o, s] = B(!1), c = F(t), l = c?.status === "cancelled" ? "failed" : c?.status, u = (n._state && n._state !== "idle" ? n._state : void 0) ?? l ?? n._state ?? "idle", f = c?.images ?? [], p = c?.startedAt ? Date.parse(c.startedAt) : NaN, m = u === "running" && f.length === 0, h = n.numVariations ?? 1, g = h > 1 || f.length > 1, _ = /* @__PURE__ */ U("span", {
		className: "inline-block text-[10px] font-semibold bg-surface-inset border border-border rounded px-1.5 py-0.5 text-text-secondary mb-1",
		children: [
			"×",
			h,
			" variation",
			h === 1 ? "" : "s"
		]
	}), v;
	if (f.length > 0 && g) v = /* @__PURE__ */ H(on, {
		images: f,
		"data-testid": "variation-thumb-strip"
	});
	else if (m || f.length === 1) {
		let e = f[0] ? a(f[0].imageId) : void 0;
		v = /* @__PURE__ */ U(V, { children: [/* @__PURE__ */ H("button", {
			type: "button",
			"data-testid": "variation-output-preview",
			"aria-label": e ? "View variation image" : "Image synthesizing",
			className: r("block w-full rounded-md border-none bg-transparent p-0", "focus:outline-none focus-visible:ring-2 focus-visible:ring-info", e ? "cursor-zoom-in" : "cursor-default"),
			onMouseDown: In,
			onClick: (t) => {
				t.stopPropagation(), e && s(!0);
			},
			children: /* @__PURE__ */ H(Ee, {
				status: m ? "synthesizing" : "done",
				...e ? { src: e } : {},
				alt: "Variation output",
				...m && Number.isFinite(p) ? { startedAt: p } : {},
				className: "w-full h-20"
			})
		}), e && /* @__PURE__ */ H(d, {
			images: [{
				src: e,
				alt: "Variation output"
			}],
			openIndex: o ? 0 : null,
			onClose: () => s(!1)
		})] });
	} else v = /* @__PURE__ */ H("div", {
		className: "w-24 h-16 rounded border border-dashed border-border bg-surface-inset flex items-center justify-center text-[11px] text-text-tertiary",
		"data-testid": "variation-placeholder",
		children: "Awaiting input"
	});
	let y = /* @__PURE__ */ U("div", { children: [_, v] }), b = n.similarity == null ? void 0 : /* @__PURE__ */ U("span", {
		className: "font-mono text-[11px] text-text-tertiary",
		children: ["similarity ", n.similarity]
	});
	return /* @__PURE__ */ U(K, {
		icon: "⊞",
		subtitle: "image:variation",
		state: u,
		category: q("image:variation"),
		body: y,
		footer: b,
		selected: i,
		ariaLabel: `Variation node, ${h} variations, state: ${u}`,
		hasBreakpoint: n._hasBreakpoint,
		pausedAtBreakpoint: n._pausedAtBreakpoint,
		children: [
			/* @__PURE__ */ H(W, {
				type: "target",
				position: G.Left,
				id: "in",
				className: J("image")
			}),
			/* @__PURE__ */ H(W, {
				type: "source",
				position: G.Right,
				id: "out",
				className: J("image")
			}),
			/* @__PURE__ */ H(W, {
				type: "source",
				position: G.Right,
				id: "error",
				className: `${J("error")} !bottom-2 !top-auto`
			})
		]
	});
}
//#endregion
//#region src/components/pipelines/nodes/edit-prompt/EditPromptNode.tsx
function Rn(e) {
	return !e || !e.trim() ? "No prompt set" : e.length > 80 ? `${e.slice(0, 77)}…` : e;
}
var zn = (e) => e.stopPropagation();
function Bn(e) {
	let { id: t, data: n, selected: i } = e, a = Fe(), [o, s] = B(!1), c = F(t), l = c?.status === "cancelled" ? "failed" : c?.status, u = (n._state && n._state !== "idle" ? n._state : void 0) ?? l ?? n._state ?? "idle", f = c?.images ?? [], p = c?.startedAt ? Date.parse(c.startedAt) : NaN, m = u === "running" && f.length === 0, h = f.length > 1, g;
	if (h) g = /* @__PURE__ */ H(on, {
		images: f,
		"data-testid": "edit-prompt-thumb-strip"
	});
	else if (m || f.length === 1) {
		let e = f[0] ? a(f[0].imageId) : void 0;
		g = /* @__PURE__ */ U(V, { children: [/* @__PURE__ */ H("button", {
			type: "button",
			"data-testid": "edit-prompt-output-preview",
			"aria-label": e ? "View edited image" : "Image synthesizing",
			className: r("block w-full rounded-md border-none bg-transparent p-0", "focus:outline-none focus-visible:ring-2 focus-visible:ring-info", e ? "cursor-zoom-in" : "cursor-default"),
			onMouseDown: zn,
			onClick: (t) => {
				t.stopPropagation(), e && s(!0);
			},
			children: /* @__PURE__ */ H(Ee, {
				status: m ? "synthesizing" : "done",
				...e ? { src: e } : {},
				alt: "Edit output",
				...m && Number.isFinite(p) ? { startedAt: p } : {},
				className: "w-full h-20"
			})
		}), e && /* @__PURE__ */ H(d, {
			images: [{
				src: e,
				alt: "Edit output"
			}],
			openIndex: o ? 0 : null,
			onClose: () => s(!1)
		})] });
	} else g = /* @__PURE__ */ H("div", {
		className: "w-24 h-16 rounded border border-dashed border-border bg-surface-inset flex items-center justify-center px-2 text-center text-[11px] text-text-tertiary",
		"data-testid": "edit-prompt-placeholder",
		children: Rn(n.prompt)
	});
	let _ = n.maskImagePath ? /* @__PURE__ */ U("span", {
		className: "font-mono text-[11px] text-text-tertiary",
		children: ["mask: ", n.maskImagePath]
	}) : void 0;
	return /* @__PURE__ */ U(K, {
		icon: "✎",
		subtitle: "image:edit-prompt",
		state: u,
		category: q("image:edit-prompt"),
		body: g,
		footer: _,
		selected: i,
		ariaLabel: `Edit Prompt node, state: ${u}`,
		hasBreakpoint: n._hasBreakpoint,
		pausedAtBreakpoint: n._pausedAtBreakpoint,
		children: [
			/* @__PURE__ */ H(W, {
				type: "target",
				position: G.Left,
				id: "in",
				className: J("image")
			}),
			/* @__PURE__ */ H(W, {
				type: "source",
				position: G.Right,
				id: "out",
				className: J("image")
			}),
			/* @__PURE__ */ H(W, {
				type: "source",
				position: G.Right,
				id: "error",
				className: `${J("error")} !bottom-2 !top-auto`
			})
		]
	});
}
//#endregion
//#region src/components/pipelines/nodes/index.ts
var Vn = {
	trigger: jt,
	llm: Pt,
	transform: It,
	condition: Rt,
	action: Bt,
	fork: Vt,
	join: Wt,
	approval: Kt,
	agent: qt,
	"mcp-tool": Jt,
	"knowledge-base": Yt,
	"graph-query": Xt,
	memory: Zt,
	guardrail: Qt,
	policy: $t,
	"ag-ui-output": en,
	"image-source": nn,
	"image:save": sn,
	scatter: ln,
	"image:resize": un,
	"image:transform": fn,
	"image:format-convert": mn,
	"image:sharpen": hn,
	"image:watermark": gn,
	"image:crop": vn,
	"image:adjust-bw": yn,
	"image:adjust-layer": xn,
	"image:dimensions": Sn,
	"image:upscale": Cn,
	"image:vision-analyze": On,
	"image:vision-classify": kn,
	"image:vision-describe": An,
	"image:vision-tag": jn,
	"image:vision-extract-text": Mn,
	"image:generate": Fn,
	"image:variation": Ln,
	"image:edit-prompt": Bn
}, Hn = "#c4b5fd";
function Un(e) {
	switch (e) {
		case "active": return {
			stroke: "var(--color-info)",
			strokeWidth: 2,
			strokeDasharray: "6 4",
			animate: !0
		};
		case "traversed-success": return {
			stroke: "var(--color-success)",
			strokeWidth: 2
		};
		case "traversed-failure": return {
			stroke: "var(--color-danger)",
			strokeWidth: 2
		};
		default: return {
			stroke: "var(--color-border-emphasis)",
			strokeWidth: 1.5
		};
	}
}
function Wn({ id: e, sourceX: n, sourceY: i, targetX: a, targetY: o, sourcePosition: s, targetPosition: c, data: l, markerEnd: u, selected: d }) {
	let f = l ?? {}, p = t(), [m, h, g] = pt({
		sourceX: n,
		sourceY: i,
		targetX: a,
		targetY: o,
		sourcePosition: s,
		targetPosition: c
	}), _ = Un(f.state), v = (f.state ?? "default") === "default", y = f.payload, b = _.animate && !p, x = _.stroke, S = _.strokeWidth, C = b ? _.strokeDasharray : void 0;
	y === "image" ? (S = 2.5, v && (x = Hn)) : y === "control" && (S = 1.5, v && (C = "2 4"));
	let w = f.volume, T = typeof w == "number" && w >= 2;
	T && (S = Math.min(4, S + Math.log2(w)));
	let E = d ? "var(--color-primary)" : x, D = d ? Math.max(2.5, S) : S, O = y === "image" && f.state === "active" && !p;
	return /* @__PURE__ */ U(V, { children: [
		/* @__PURE__ */ H("path", {
			d: m,
			fill: "none",
			stroke: "transparent",
			strokeWidth: 12,
			className: "[pointer-events:stroke]"
		}),
		/* @__PURE__ */ H("path", {
			id: e,
			d: m,
			fill: "none",
			stroke: E,
			strokeWidth: D,
			strokeDasharray: C,
			markerEnd: u,
			className: "pointer-events-none",
			children: b ? /* @__PURE__ */ H("animate", {
				attributeName: "stroke-dashoffset",
				from: "0",
				to: "-20",
				dur: "1s",
				repeatCount: "indefinite"
			}) : null
		}),
		O ? /* @__PURE__ */ H("circle", {
			r: 3,
			fill: E,
			className: "pointer-events-none",
			children: /* @__PURE__ */ H("animateMotion", {
				dur: "1.2s",
				repeatCount: "indefinite",
				path: m
			})
		}) : null,
		f.label ? /* @__PURE__ */ H(lt, { children: /* @__PURE__ */ H("div", {
			className: r("absolute pointer-events-auto px-2 py-0.5 rounded-full text-[10px] font-semibold leading-[1.4]", "bg-white text-text-secondary border border-border font-[inherit] whitespace-nowrap", "shadow-[0_1px_2px_rgba(15,23,42,0.06)]"),
			style: { transform: `translate(-50%, -50%) translate(${n + 28}px, ${i}px)` },
			children: f.label
		}) }) : null,
		T ? /* @__PURE__ */ H(lt, { children: /* @__PURE__ */ H("div", {
			className: r("absolute pointer-events-none px-1.5 py-px rounded-full text-[9px] font-semibold leading-[1.4]", "bg-white text-text-secondary border border-border font-[inherit] whitespace-nowrap", "shadow-[0_1px_2px_rgba(15,23,42,0.06)]"),
			style: { transform: `translate(-50%, -50%) translate(${h}px, ${g}px)` },
			children: `×${w}`
		}) }) : null
	] });
}
//#endregion
//#region src/components/pipelines/hooks/useClickOutside.ts
function Gn(e, t, n) {
	let r = z(t);
	r.current = t, L(() => {
		if (n === !1) return;
		let t = (t) => {
			e.current && !e.current.contains(t.target) && r.current();
		};
		return document.addEventListener("mousedown", t), () => document.removeEventListener("mousedown", t);
	}, [e, n]);
}
//#endregion
//#region src/components/pipelines/canvas/QuickInsertPopover.tsx
var Kn = "quick-insert-listbox", qn = (e) => e ? `quick-insert-option-${e}` : void 0, Jn = [
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
function Yn(e, t) {
	if (!t) return !0;
	let n = t.toLowerCase();
	return e.type.toLowerCase().includes(n) || e.name.toLowerCase().includes(n) || e.description.toLowerCase().includes(n);
}
function Xn({ anchor: e, flowPosition: t, disabledTypes: n = [], onClose: i, onInsert: a }) {
	let [o, s] = B(""), [c, l] = B(0), u = z(null), d = z(null), f = R(() => new Set(n), [n]), p = R(() => Jn.filter((e) => !f.has(e.type) && Yn(e, o)), [f, o]);
	if (L(() => {
		l((e) => e >= p.length ? 0 : e);
	}, [p.length]), L(() => {
		if (e) {
			let e = setTimeout(() => d.current?.focus(), 0);
			return () => clearTimeout(e);
		}
	}, [e]), Gn(u, i, !!e), !e) return null;
	let m = (e) => {
		let n = p[e];
		!n || !t || (a(n.type, t), i());
	};
	return /* @__PURE__ */ U("div", {
		ref: u,
		className: "fixed w-[260px] bg-white border border-border rounded-lg shadow-[0_12px_28px_rgba(15,23,42,0.14)] z-50 flex flex-col overflow-hidden font-inherit",
		style: {
			top: e.y,
			left: e.x
		},
		role: "dialog",
		"aria-label": "Quick insert node",
		"data-testid": "quick-insert-popover",
		children: [/* @__PURE__ */ H("div", {
			className: "p-2 border-b border-border",
			children: /* @__PURE__ */ H("input", {
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
				"aria-controls": Kn,
				"aria-activedescendant": p.length > 0 ? qn(p[c]?.type) : void 0,
				"data-testid": "quick-insert-search"
			})
		}), /* @__PURE__ */ H("div", {
			id: Kn,
			className: "max-h-[260px] overflow-y-auto py-1",
			role: "listbox",
			"aria-label": "Node types",
			children: p.length === 0 ? /* @__PURE__ */ U("div", {
				className: "px-3 py-3.5 text-xs text-text-tertiary font-inherit",
				children: [
					"No nodes match \"",
					o,
					"\""
				]
			}) : p.map((e, t) => {
				let n = t === c;
				return /* @__PURE__ */ U("div", {
					id: qn(e.type),
					role: "option",
					"aria-selected": n,
					onMouseEnter: () => l(t),
					onMouseDown: (e) => {
						e.preventDefault(), m(t);
					},
					className: r("flex items-center gap-2.5 px-3 py-2 cursor-pointer font-inherit", n ? "bg-surface-hover" : "bg-transparent"),
					"data-node-type": e.type,
					"data-testid": `quick-insert-row-${e.type}`,
					children: [/* @__PURE__ */ H("span", {
						className: "text-lg leading-none w-[22px] text-center shrink-0",
						"aria-hidden": !0,
						children: e.icon
					}), /* @__PURE__ */ U("div", {
						className: "flex-1 min-w-0",
						children: [/* @__PURE__ */ H("div", {
							className: "text-[13px] font-semibold text-text-primary",
							children: e.name
						}), /* @__PURE__ */ H("div", {
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
function Zn({ addNode: e, addEdge: t, updateNodeData: n, getDefinition: r }) {
	L(() => {}, [
		e,
		t,
		n,
		r
	]);
}
//#endregion
//#region src/components/pipelines/canvas/useCanvasKeyboard.ts
function Qn({ definition: e, selectedNodeId: t, setSelectedNodeId: n, removeNode: r, removeDefEdge: i, nodes: a, edges: o, setNodes: s, setEdges: c, setPositions: l, duplicateNodes: u, clipboardRef: d, containerRef: f }) {
	let p = z(a);
	p.current = a;
	let m = z(o);
	m.current = o, L(() => {
		let a = f.current;
		if (!a) return;
		let o = (e) => {
			let t = a.querySelector(`.react-flow__node[data-id="${CSS.escape(e)}"]`);
			return t ? ((t.querySelector("[data-pipeline-node=\"true\"]") ?? t).focus(), !0) : !1;
		}, h = (f) => {
			if (kr(f.target)) return;
			let h = document.activeElement, g = !!h && a.contains(h);
			if (f.key === "Tab") {
				if (!g || !e || e.nodes.length === 0) return;
				let t = Ar(e);
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
function $n({ addNode: e, screenToFlowPosition: t }) {
	return {
		handleDragOver: I((e) => {
			e.preventDefault(), e.dataTransfer.dropEffect = "move";
		}, []),
		handleDrop: I((n) => {
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
function er({ nodeMenu: e, breakpoints: t, showBreakpointOption: n, onFilterLog: i, onCopyNodeId: a, onDuplicate: o, onToggleBreakpoint: s, onDismiss: c }) {
	L(() => {
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
	return /* @__PURE__ */ U("div", {
		"data-testid": "canvas-node-context-menu",
		role: "menu",
		"aria-label": "Node actions",
		onKeyDown: (e) => Je(e, {
			itemSelector: "[role=\"menuitem\"]",
			orientation: "vertical"
		}),
		className: "fixed bg-white border border-border rounded-md shadow-[0_8px_20px_rgba(15,23,42,0.16)] min-w-[220px] z-50 p-1 font-inherit",
		style: {
			top: e.y,
			left: e.x
		},
		children: [
			/* @__PURE__ */ H("button", {
				type: "button",
				role: "menuitem",
				onClick: i,
				"data-testid": "ctx-filter-log",
				className: r(l, "text-text-primary"),
				children: "🎯 Filter log to this node"
			}),
			/* @__PURE__ */ H("button", {
				type: "button",
				role: "menuitem",
				onClick: a,
				"data-testid": "ctx-copy-id",
				className: r(l, "text-text-primary"),
				children: "📋 Copy node id"
			}),
			/* @__PURE__ */ H("button", {
				type: "button",
				role: "menuitem",
				onClick: o,
				"data-testid": "ctx-duplicate",
				className: r(l, "text-text-primary"),
				children: "📑 Duplicate node"
			}),
			n ? /* @__PURE__ */ H("button", {
				type: "button",
				role: "menuitem",
				onClick: s,
				"data-testid": "ctx-toggle-breakpoint",
				className: r(l, t?.has(e.nodeId) ? "text-danger-fg" : "text-text-primary"),
				children: t?.has(e.nodeId) ? "🔴 Remove Breakpoint" : "🔴 Toggle Breakpoint"
			}) : null
		]
	});
}
//#endregion
//#region src/components/pipelines/canvas/NodePalette.tsx
var tr = [
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
		description: "Invoke a Strands agent via A2A"
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
], nr = [
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
], rr = {
	source: "bg-cat-source",
	transform: "bg-cat-transform",
	ai: "bg-cat-ai",
	control: "bg-cat-control",
	sink: "bg-cat-sink",
	human: "bg-cat-human"
}, ir = nr.map(({ key: e, name: t }) => ({
	key: e,
	name: t,
	items: tr.filter((t) => q(t.type) === e).map((n) => ({
		...n,
		category: t,
		nodeCategory: e
	}))
})).filter((e) => e.items.length > 0), ar = ir.flatMap((e) => e.items.map((e) => ({
	type: e.type,
	name: e.name
}))), or = ir.map((e) => e.name), sr = "pipeline.palette.recents", cr = 5, lr = "pipeline.palette.compact";
function ur() {
	if (typeof window > "u") return [];
	try {
		let e = window.localStorage.getItem(sr);
		if (!e) return [];
		let t = JSON.parse(e);
		return Array.isArray(t) ? t : [];
	} catch {
		return [];
	}
}
function dr(e) {
	if (!(typeof window > "u")) try {
		window.localStorage.setItem(sr, JSON.stringify(e));
	} catch {}
}
function fr(e) {
	dr([e, ...ur().filter((t) => t !== e)].slice(0, cr));
}
var pr = "pipeline.palette.collapsed.";
function mr(e) {
	if (typeof window > "u") return !1;
	try {
		return window.localStorage.getItem(pr + e) === "true";
	} catch {
		return !1;
	}
}
function hr(e, t) {
	if (!(typeof window > "u")) try {
		window.localStorage.setItem(pr + e, String(t));
	} catch {}
}
function gr(e, t) {
	if (!t) return !0;
	let n = t.toLowerCase();
	return e.name.toLowerCase().includes(n) || e.type.toLowerCase().includes(n) || e.description.toLowerCase().includes(n);
}
function _r({ expanded: e }) {
	return /* @__PURE__ */ H("svg", {
		width: "12",
		height: "12",
		viewBox: "0 0 12 12",
		fill: "none",
		"aria-hidden": "true",
		className: r("shrink-0 transition-transform duration-150", e ? "rotate-90" : "rotate-0"),
		children: /* @__PURE__ */ H("path", {
			d: "M4 2.5l3.5 3.5L4 9.5",
			stroke: "currentColor",
			strokeWidth: "1.5",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
}
function vr({ disabledTypes: e = [] }) {
	let [t, n] = B(""), [i, a] = B(/* @__PURE__ */ new Set()), [o, s] = B(null), [l, u] = B(() => ur()), [d, f] = B(() => {
		if (typeof window > "u") return !1;
		try {
			return window.localStorage.getItem(lr) === "true";
		} catch {
			return !1;
		}
	}), [p, m] = B(() => {
		let e = {};
		for (let t of ir) e[t.name] = mr(t.name);
		return e;
	}), h = R(() => new Set(e), [e]);
	L(() => {
		let e = (e) => {
			e.key === sr && u(ur());
		};
		return window.addEventListener("storage", e), () => window.removeEventListener("storage", e);
	}, []), L(() => {
		if (!(typeof window > "u")) try {
			window.localStorage.setItem(lr, String(d));
		} catch {}
	}, [d]);
	let g = I((e) => {
		a((t) => {
			let n = new Set(t);
			return n.has(e) ? n.delete(e) : n.add(e), n;
		});
	}, []), _ = I(() => {
		n(""), a(/* @__PURE__ */ new Set());
	}, []), v = I((e) => {
		m((t) => {
			let n = {
				...t,
				[e]: !t[e]
			};
			return hr(e, n[e]), n;
		});
	}, []), y = R(() => {
		let e = /* @__PURE__ */ new Map();
		for (let t of ir) for (let n of t.items) e.set(n.type, n);
		return e;
	}, []), b = R(() => l.map((e) => y.get(e)).filter(Boolean), [l, y]), x = R(() => ir.map((e) => {
		let n = i.size > 0 && !i.has(e.name) ? [] : e.items.filter((e) => gr(e, t));
		return {
			...e,
			items: n
		};
	}).filter((e) => e.items.length > 0), [t, i]), S = R(() => {
		let e = /* @__PURE__ */ new Set(), n = [];
		if (!t && i.size === 0) for (let t of b) n.push(t), e.add(t.type);
		for (let t of x) for (let r of t.items) e.has(r.type) || (n.push(r), e.add(r.type));
		return n;
	}, [
		b,
		x,
		t,
		i
	]), C = z(S);
	L(() => {
		C.current = S;
	}, [S]);
	let w = x.length === 0 && (t !== "" || i.size > 0), T = (e) => (t) => {
		if (h.has(e.type)) {
			t.preventDefault();
			return;
		}
		t.dataTransfer.setData("application/reactflow", JSON.stringify({ nodeType: e.type })), t.dataTransfer.effectAllowed = "move";
	}, E = Be(), D = (e, t) => {
		let n = h.has(e.type), i = !E(e.type), a = o === e.type && !n, c = t !== null && t < 9 ? t + 1 : null;
		return d ? /* @__PURE__ */ U("div", {
			draggable: !n,
			onDragStart: T(e),
			onMouseEnter: () => s(e.type),
			onMouseLeave: () => s(null),
			className: r("h-8 box-border my-px mx-2 px-2 flex items-center gap-2 rounded font-[inherit]", n ? "cursor-not-allowed opacity-45" : "cursor-grab", a ? "bg-surface-hover" : "bg-transparent"),
			title: n ? `${e.name} is already placed` : i ? `${e.name} — preview: this deployment has no executor for it yet, so the step will not run.` : c ? `${e.description} — press ${c}` : e.description,
			"data-preview": i || void 0,
			"data-node-type": e.type,
			"data-disabled": n || void 0,
			"data-testid": `palette-item-${e.type}`,
			children: [
				/* @__PURE__ */ H("span", {
					"aria-hidden": !0,
					"data-testid": `palette-accent-${e.type}`,
					className: r("w-1.5 h-1.5 rounded-full shrink-0", e.nodeCategory && rr[e.nodeCategory])
				}),
				/* @__PURE__ */ H("span", {
					className: "text-base leading-none w-5 text-center shrink-0",
					"aria-hidden": !0,
					children: e.icon
				}),
				/* @__PURE__ */ H("span", {
					className: r("text-[12px] font-medium text-text-primary truncate", n && "line-through"),
					children: e.name
				}),
				c !== null && /* @__PURE__ */ H("kbd", {
					"data-testid": `palette-shortcut-${e.type}`,
					className: r("ml-auto text-[10px] font-semibold font-mono text-neutral bg-surface-hover border border-border rounded px-1 leading-[14px] min-w-[14px] text-center shrink-0", n && "opacity-50"),
					children: c
				})
			]
		}, e.type) : /* @__PURE__ */ U("div", {
			draggable: !n,
			onDragStart: T(e),
			onMouseEnter: () => s(e.type),
			onMouseLeave: () => s(null),
			className: r("h-11 box-border my-0.5 mx-2 py-1.5 px-2.5 flex items-center gap-2.5 rounded-md border border-transparent font-[inherit]", n ? "cursor-not-allowed opacity-45" : "cursor-grab", a ? "bg-surface-panel" : "bg-transparent"),
			title: n ? `${e.name} is already placed` : i ? `${e.name} — preview: this deployment has no executor for it yet, so the step will not run.` : c ? `${e.description} — press ${c}` : e.description,
			"data-preview": i || void 0,
			"data-node-type": e.type,
			"data-disabled": n || void 0,
			"data-testid": `palette-item-${e.type}`,
			children: [
				/* @__PURE__ */ H("span", {
					"aria-hidden": !0,
					"data-testid": `palette-accent-${e.type}`,
					className: r("w-1.5 h-1.5 rounded-full shrink-0", e.nodeCategory && rr[e.nodeCategory])
				}),
				/* @__PURE__ */ H("span", {
					className: "text-lg leading-none w-[22px] text-center shrink-0",
					"aria-hidden": !0,
					children: e.icon
				}),
				/* @__PURE__ */ U("div", {
					className: "flex-1 min-w-0",
					children: [/* @__PURE__ */ U("div", {
						className: r("text-[13px] font-semibold text-text-primary flex items-center gap-1.5", n && "line-through"),
						children: [
							/* @__PURE__ */ H("span", {
								className: "truncate",
								children: e.name
							}),
							i && /* @__PURE__ */ H("span", {
								"data-testid": `palette-preview-${e.type}`,
								className: "shrink-0 rounded-full border border-warning-border bg-warning-bg px-1.5 text-[9px] font-semibold uppercase tracking-wide text-warning-fg",
								title: "No executor handler in this deployment",
								children: "preview"
							}),
							c !== null && /* @__PURE__ */ H("kbd", {
								"data-testid": `palette-shortcut-${e.type}`,
								className: r("text-[10px] font-semibold font-mono text-neutral bg-surface-hover border border-border rounded px-1 leading-[14px] min-w-[14px] text-center shrink-0", n && "opacity-50"),
								children: c
							})
						]
					}), /* @__PURE__ */ H("div", {
						className: "text-[11px] text-neutral truncate",
						children: n ? "Placed" : i ? "Preview — no executor" : e.description
					})]
				})
			]
		}, e.type);
	}, O = b.length > 0 && !t && i.size === 0, k = 0;
	return /* @__PURE__ */ U("div", {
		className: "w-[220px] shrink-0 h-full border-r border-border bg-white flex flex-col",
		"data-testid": "node-palette",
		children: [
			/* @__PURE__ */ U("div", {
				className: "shrink-0 border-b border-border",
				children: [/* @__PURE__ */ U("div", {
					className: "flex items-center gap-1.5 py-2.5 px-3",
					children: [/* @__PURE__ */ H("input", {
						type: "text",
						value: t,
						onChange: (e) => n(e.target.value),
						placeholder: "Search nodes...",
						"aria-label": "Search nodes",
						"data-testid": "palette-search",
						className: "flex-1 min-w-0 border border-border-emphasis rounded-md py-1.5 px-2.5 text-[13px] font-[inherit] bg-surface-panel text-text-primary outline-none focus:border-info focus:ring-1 focus:ring-info placeholder:text-text-tertiary"
					}), /* @__PURE__ */ H("button", {
						type: "button",
						onClick: () => f((e) => !e),
						title: d ? "Switch to card view" : "Switch to compact view",
						"data-testid": "palette-compact-toggle",
						"aria-pressed": d,
						className: r("shrink-0 w-7 h-7 flex items-center justify-center rounded border text-[11px] transition-colors", d ? "bg-info border-info text-white" : "bg-white border-border-emphasis text-neutral hover:bg-surface-panel"),
						children: d ? /* @__PURE__ */ U("svg", {
							width: "14",
							height: "14",
							viewBox: "0 0 14 14",
							fill: "none",
							"aria-hidden": "true",
							children: [
								/* @__PURE__ */ H("rect", {
									x: "1",
									y: "2",
									width: "12",
									height: "2",
									rx: "1",
									fill: "currentColor"
								}),
								/* @__PURE__ */ H("rect", {
									x: "1",
									y: "6",
									width: "12",
									height: "2",
									rx: "1",
									fill: "currentColor"
								}),
								/* @__PURE__ */ H("rect", {
									x: "1",
									y: "10",
									width: "12",
									height: "2",
									rx: "1",
									fill: "currentColor"
								})
							]
						}) : /* @__PURE__ */ U("svg", {
							width: "14",
							height: "14",
							viewBox: "0 0 14 14",
							fill: "none",
							"aria-hidden": "true",
							children: [
								/* @__PURE__ */ H("rect", {
									x: "1",
									y: "1",
									width: "5",
									height: "5",
									rx: "1",
									fill: "currentColor"
								}),
								/* @__PURE__ */ H("rect", {
									x: "8",
									y: "1",
									width: "5",
									height: "5",
									rx: "1",
									fill: "currentColor"
								}),
								/* @__PURE__ */ H("rect", {
									x: "1",
									y: "8",
									width: "5",
									height: "5",
									rx: "1",
									fill: "currentColor"
								}),
								/* @__PURE__ */ H("rect", {
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
				}), /* @__PURE__ */ H("div", {
					className: "flex flex-wrap gap-1 px-3 pb-2.5",
					"data-testid": "palette-category-chips",
					children: or.map((e) => /* @__PURE__ */ H(c, {
						size: "xs",
						active: i.has(e),
						onClick: () => g(e),
						"data-testid": `palette-chip-${e}`,
						children: e
					}, e))
				})]
			}),
			/* @__PURE__ */ U("div", {
				className: "flex-1 overflow-y-auto py-1",
				"data-testid": "palette-scroll",
				children: [O && /* @__PURE__ */ U("div", {
					"data-testid": "palette-recents",
					children: [/* @__PURE__ */ U("button", {
						type: "button",
						onClick: () => v("__recents__"),
						className: "w-full flex items-center gap-1 pt-2 pb-1 px-3.5 text-[10px] font-bold tracking-[0.6px] uppercase text-text-tertiary hover:text-text-secondary transition-colors font-[inherit]",
						"aria-expanded": !p.__recents__,
						children: [/* @__PURE__ */ H(_r, { expanded: !p.__recents__ }), "Recently used"]
					}), !p.__recents__ && /* @__PURE__ */ H("div", { children: b.map((e) => {
						let t = k++;
						return D(e, t);
					}) })]
				}), w ? /* @__PURE__ */ U("div", {
					className: "flex flex-col items-center gap-3 px-4 py-8 text-center",
					"data-testid": "palette-empty",
					children: [/* @__PURE__ */ H("span", {
						className: "text-xs text-text-tertiary",
						children: "No nodes match"
					}), /* @__PURE__ */ H("button", {
						type: "button",
						onClick: _,
						"data-testid": "palette-clear-filters",
						className: "text-[11px] font-semibold text-info-fg hover:underline",
						children: "Clear filters"
					})]
				}) : x.map((e) => {
					let t = !!p[e.name];
					return /* @__PURE__ */ U("div", {
						"data-testid": `palette-category-${e.name}`,
						children: [/* @__PURE__ */ U("button", {
							type: "button",
							onClick: () => v(e.name),
							className: "w-full flex items-center gap-1 pt-2 pb-1 px-3.5 text-[10px] font-bold tracking-[0.6px] uppercase text-text-tertiary hover:text-text-secondary transition-colors font-[inherit]",
							"aria-expanded": !t,
							children: [
								/* @__PURE__ */ H(_r, { expanded: !t }),
								/* @__PURE__ */ H("span", {
									"aria-hidden": !0,
									"data-testid": `palette-section-accent-${e.key}`,
									className: r("w-1.5 h-1.5 rounded-full shrink-0", rr[e.key])
								}),
								e.name
							]
						}), !t && /* @__PURE__ */ H("div", { children: e.items.map((e) => {
							let t = k++;
							return D(e, t);
						}) })]
					}, e.name);
				})]
			}),
			/* @__PURE__ */ H("div", {
				className: "py-2 px-3 border-t border-border text-[10px] text-text-tertiary font-[inherit] shrink-0",
				children: "Press 1–9 to insert at center"
			})
		]
	});
}
//#endregion
//#region src/components/pipelines/canvas/QuickInsertLayer.tsx
function yr({ definition: e, addNode: t, screenToFlowPosition: n, containerRef: r }) {
	return L(() => {
		let i = (i) => {
			if (!kr(i.target) && !(i.metaKey || i.ctrlKey || i.altKey) && /^[1-8]$/.test(i.key)) {
				let a = ar[Number(i.key) - 1];
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
var br = 280, xr = 120, Sr = 40, Cr = 40;
function wr(e, t) {
	let n = t?.layerSpacingX ?? br, r = t?.nodeSpacingY ?? xr, i = t?.startX ?? Sr, a = t?.startY ?? Cr;
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
function Tr({ definition: e, setPositions: t, fitView: n }) {
	return {
		handleFitView: I(() => {
			n({
				padding: .15,
				duration: 500
			});
		}, [n]),
		handleAutoArrange: I(() => {
			if (!e) return;
			let r = wr(e);
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
function Er({ definition: e, setPositions: t, fitView: n }) {
	let { handleFitView: r, handleAutoArrange: i } = Tr({
		definition: e,
		setPositions: t,
		fitView: n
	});
	return L(() => {
		let e = (e) => {
			let t = e.target;
			if (!(t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) && e.shiftKey && (e.key === "A" || e.key === "a")) {
				if (e.metaKey || e.ctrlKey || e.altKey) return;
				e.preventDefault(), i();
			}
		};
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, [i]), /* @__PURE__ */ U(V, { children: [/* @__PURE__ */ H("button", {
		type: "button",
		onClick: i,
		className: "absolute top-3 right-[50px] z-[5] w-8 h-8 inline-flex items-center justify-center bg-white border border-border rounded-md shadow-sm text-text-secondary cursor-pointer p-0 font-inherit text-sm leading-none",
		title: "Auto-arrange (Shift+A)",
		"aria-label": "Auto-arrange",
		"data-testid": "auto-arrange-btn",
		children: /* @__PURE__ */ H("svg", {
			width: "14",
			height: "14",
			viewBox: "0 0 16 16",
			fill: "none",
			"aria-hidden": "true",
			children: /* @__PURE__ */ H("path", {
				d: "M2 4h8M2 8h12M2 12h6",
				stroke: "currentColor",
				strokeWidth: "1.5",
				strokeLinecap: "round"
			})
		})
	}), /* @__PURE__ */ H("button", {
		type: "button",
		onClick: r,
		className: "absolute top-3 right-3 z-[5] w-8 h-8 inline-flex items-center justify-center bg-white border border-border rounded-md shadow-sm text-text-secondary cursor-pointer p-0 font-inherit text-sm leading-none",
		title: "Fit view",
		"aria-label": "Fit view",
		children: /* @__PURE__ */ H("svg", {
			width: "14",
			height: "14",
			viewBox: "0 0 16 16",
			fill: "none",
			"aria-hidden": "true",
			children: /* @__PURE__ */ H("path", {
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
var Dr = .1, Or = {
	padding: .15,
	minZoom: Dr,
	maxZoom: 1
};
function kr(e) {
	if (!e || !(e instanceof HTMLElement)) return !1;
	let t = e.tagName;
	return !!(t === "INPUT" || t === "TEXTAREA" || t === "SELECT" || e.isContentEditable);
}
function Ar(e) {
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
var jr = { animated: Wn }, Mr = Vn;
function Nr(e) {
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
function Pr(e) {
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
function Fr({ onFilterLog: e, errorNodeId: t, onErrorNodePosition: n, replayEdgeStates: r, replayNodeClasses: i, breakpoints: a, onToggleBreakpoint: o, pausedAtNodeId: s }) {
	let { definition: c, addNode: l, setPositions: u, addEdge: d, removeEdge: f, removeNode: p, duplicateNodes: m, selectedNodeId: h, setSelectedNodeId: g, updateNodeData: _ } = pe(), { screenToFlowPosition: v, fitView: y } = _t(), b = z(!1), x = I((e) => {
		e && (b.current = !0);
	}, []);
	L(() => {
		let e = j.current;
		if (!e || typeof ResizeObserver > "u") return;
		let t = {
			w: e.clientWidth,
			h: e.clientHeight
		}, n = new ResizeObserver(() => {
			let n = e.clientWidth, r = e.clientHeight;
			n !== 0 && r !== 0 && (Math.abs(n - t.w) < 2 && Math.abs(r - t.h) < 2 || (t = {
				w: n,
				h: r
			}, !b.current && y(Or)));
		});
		return n.observe(e), () => n.disconnect();
	}, [y]), Zn({
		addNode: l,
		addEdge: d,
		updateNodeData: _,
		getDefinition: () => c
	});
	let [S, C, w] = gt([]), [T, E, D] = mt([]), [O, k] = B(!0), [A, ee] = B(!0), j = z(null), te = z(null), [ne, re] = B(null), [M, ie] = B(null), ae = I((e, t) => {
		e.preventDefault(), ie({
			nodeId: t.id,
			x: e.clientX,
			y: e.clientY
		});
	}, []), oe = I(() => {
		M && (e?.(M.nodeId), ie(null));
	}, [M, e]), se = I(() => {
		if (!M) return;
		let e = M.nodeId;
		typeof navigator < "u" && navigator.clipboard?.writeText && navigator.clipboard.writeText(e).catch(() => {}), ie(null);
	}, [M]), ce = I(() => {
		M && (o?.(M.nodeId), ie(null));
	}, [M, o]), le = I(() => {
		if (!M) return;
		let e = m([M.nodeId]);
		e.length > 0 && g(e[0]), ie(null);
	}, [
		M,
		m,
		g
	]), ue = I(() => ie(null), []);
	L(() => {
		if (!c) {
			C([]), E([]);
			return;
		}
		C((e) => {
			let t = new Map(e.map((e) => [e.id, e]));
			return c.nodes.map((e) => {
				let n = t.get(e.id), r = Nr(e);
				return a && a.size > 0 && (r.data._hasBreakpoint = a.has(e.id)), s && (r.data._pausedAtBreakpoint = e.id === s), n ? {
					...n,
					...r,
					selected: n.selected
				} : r;
			});
		}), E(() => c.edges.map(Pr));
	}, [
		c,
		a,
		s,
		C,
		E
	]), L(() => {
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
			let e = j.current;
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
	]), L(() => {
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
	]), L(() => {
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
	let N = I((e) => {
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
	]), de = I((e) => {
		D(e);
		for (let t of e) t.type === "remove" && f(t.id);
	}, [D, f]), fe = I((e) => {
		if (!c || !e.source || !e.target) return;
		let t = c.nodes.find((t) => t.id === e.source), n = c.nodes.find((t) => t.id === e.target);
		if (!t || !n) return;
		let r = e.sourceHandle ?? "out", i = e.targetHandle ?? "in";
		bt(t.type, r, n.type, i) && d({
			source: e.source,
			sourceHandle: r,
			target: e.target,
			targetHandle: i
		});
	}, [c, d]), me = I((e) => {
		if (!c || !e.source || !e.target) return !1;
		let t = c.nodes.find((t) => t.id === e.source), n = c.nodes.find((t) => t.id === e.target);
		return !t || !n ? !1 : bt(t.type, e.sourceHandle ?? "out", n.type, e.targetHandle ?? "in");
	}, [c]), he = I((e, t) => {
		g(t.id);
	}, [g]), ge = I(() => {
		g(null);
	}, [g]), _e = I((e) => {
		let t = e.target;
		if (!t || !(t.classList.contains("react-flow__pane") || t.classList.contains("react-flow__renderer") || t.classList.contains("react-flow__viewport") || t.classList.contains("react-flow"))) return;
		e.preventDefault();
		let n = v({
			x: e.clientX,
			y: e.clientY
		});
		re({
			anchor: {
				x: e.clientX,
				y: e.clientY
			},
			flowPosition: n
		});
	}, [v]), ve = I(() => re(null), []), ye = I((e, t) => {
		l(e, t);
	}, [l]), be = R(() => c && c.nodes.some((e) => e.type === "trigger") ? ["trigger"] : [], [c]), { handleDragOver: xe, handleDrop: Se } = $n({
		addNode: l,
		screenToFlowPosition: v
	});
	L(() => {
		let e = (e) => {
			if (!kr(e.target) && !(e.metaKey || e.ctrlKey || e.altKey)) {
				if (e.key === "m" || e.key === "M") {
					k((e) => !e);
					return;
				}
				if (e.key === "c" || e.key === "C") {
					ee((e) => !e);
					return;
				}
			}
		};
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, []), Qn({
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
		clipboardRef: te,
		containerRef: j
	});
	let Ce = I((e) => {
		switch (e.data?._state) {
			case "running":
			case "pending": return "var(--color-info)";
			case "completed": return "var(--color-success)";
			case "failed": return "var(--color-danger)";
			case "awaiting": return "var(--color-warning)";
			default: return "var(--color-text-tertiary)";
		}
	}, []);
	return /* @__PURE__ */ U("div", {
		ref: j,
		className: "flex-1 min-w-0 min-h-[520px] relative bg-surface-inset",
		role: "application",
		"aria-label": "Pipeline editor canvas",
		tabIndex: 0,
		"data-testid": "pipeline-canvas",
		onDragOver: xe,
		onDrop: Se,
		onDoubleClick: _e,
		children: [
			/* @__PURE__ */ U(dt, {
				nodes: S,
				edges: T,
				nodeTypes: Mr,
				edgeTypes: jr,
				onNodesChange: N,
				onEdgesChange: de,
				onConnect: fe,
				isValidConnection: me,
				onNodeClick: he,
				onNodeContextMenu: ae,
				onPaneClick: ge,
				onMoveStart: x,
				fitView: !0,
				fitViewOptions: Or,
				minZoom: Dr,
				snapToGrid: !0,
				snapGrid: [16, 16],
				edgesFocusable: !0,
				defaultEdgeOptions: { type: "smoothstep" },
				proOptions: { hideAttribution: !0 },
				children: [
					/* @__PURE__ */ H(ot, {
						variant: st.Dots,
						gap: 16,
						size: 1,
						color: "#e2e8f0",
						bgColor: "#fafbfc"
					}),
					A ? /* @__PURE__ */ H(ct, {
						position: "bottom-left",
						showZoom: !0,
						showFitView: !0,
						showInteractive: !0,
						className: "!bg-white !border !border-border !rounded-md !shadow-[0_1px_3px_rgba(0,0,0,0.06)]"
					}) : null,
					O ? /* @__PURE__ */ H(ut, {
						position: "bottom-right",
						pannable: !0,
						zoomable: !0,
						className: "!bg-white !border !border-border !rounded-md !w-[180px] !h-[120px]",
						maskColor: "rgba(15, 23, 42, 0.04)",
						nodeColor: Ce,
						nodeStrokeColor: "#e2e8f0"
					}) : null
				]
			}),
			ne ? /* @__PURE__ */ H(Xn, {
				anchor: ne.anchor,
				flowPosition: ne.flowPosition,
				disabledTypes: be,
				onClose: ve,
				onInsert: ye
			}) : null,
			/* @__PURE__ */ H(yr, {
				definition: c,
				addNode: l,
				screenToFlowPosition: v,
				containerRef: j
			}),
			/* @__PURE__ */ H(Er, {
				definition: c,
				setPositions: u,
				fitView: y
			}),
			M ? /* @__PURE__ */ H(er, {
				nodeMenu: M,
				breakpoints: a,
				showBreakpointOption: !!o,
				onFilterLog: oe,
				onCopyNodeId: se,
				onDuplicate: le,
				onToggleBreakpoint: ce,
				onDismiss: ue
			}) : null
		]
	});
}
function Ir({ onFilterLog: e, errorNodeId: t, onErrorNodePosition: n, replayEdgeStates: r, replayNodeClasses: i, breakpoints: a, onToggleBreakpoint: o, pausedAtNodeId: s } = {}) {
	return /* @__PURE__ */ H(ft, { children: /* @__PURE__ */ H(Fr, {
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
var Lr = {
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
		bg: "#fefce8",
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
function Rr(e) {
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
function zr({ error: e, anchor: t, onDismiss: n, onRetry: r }) {
	let [i, a] = B(!1), [o, s] = B(!1), c = z(null);
	L(() => () => {
		c.current && clearTimeout(c.current);
	}, []);
	let l = e.errorCategory ?? "UnknownError", u = Lr[l] ?? Lr.UnknownError, d = I(async () => {
		let t = [
			`Error Category: ${l}`,
			`Node ID: ${e.nodeId}`,
			`Message: ${e.message}`,
			e.stack ? `\nStack Trace:\n${e.stack}` : ""
		].filter(Boolean).join("\n");
		try {
			typeof navigator < "u" && navigator.clipboard?.writeText && (await navigator.clipboard.writeText(t), s(!0), c.current && clearTimeout(c.current), c.current = setTimeout(() => s(!1), 2e3));
		} catch {}
	}, [e, l]), f = I(() => {
		r?.();
	}, [r]), p = Math.min(t.y + 8, window.innerHeight - 440), m = Math.min(t.x + 12, window.innerWidth - 360);
	return /* @__PURE__ */ U("div", {
		className: "fixed z-[100] bg-white border border-border rounded-[10px] shadow-[0_12px_32px_rgba(15,23,42,0.18),0_2px_6px_rgba(15,23,42,0.08)] p-0 w-[340px] max-h-[420px] overflow-y-auto font-inherit text-text-primary",
		style: {
			top: Math.max(8, p),
			left: Math.max(8, m)
		},
		"data-testid": "error-overlay",
		role: "dialog",
		"aria-label": `Error details for node ${e.nodeId}`,
		children: [
			/* @__PURE__ */ U("div", {
				className: "flex items-center gap-2 px-3.5 pt-3 pb-2.5 border-b border-border",
				children: [
					/* @__PURE__ */ H("span", {
						className: "inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold leading-snug",
						style: {
							background: u.bg,
							color: u.fg
						},
						"data-testid": "error-category-badge",
						children: Rr(l)
					}),
					/* @__PURE__ */ H("span", { className: "flex-1" }),
					/* @__PURE__ */ H("button", {
						type: "button",
						onClick: n,
						"aria-label": "Dismiss error overlay",
						className: "bg-transparent border-none text-text-tertiary cursor-pointer text-base leading-none px-1 py-0.5",
						children: "×"
					})
				]
			}),
			/* @__PURE__ */ U("div", {
				className: "px-3.5 py-3 flex flex-col gap-2.5",
				children: [
					/* @__PURE__ */ H("div", {
						className: "text-[13px] leading-normal text-text-primary",
						children: e.message
					}),
					/* @__PURE__ */ U("div", {
						className: "text-[11px] text-text-tertiary",
						children: [
							"Failed node:",
							" ",
							/* @__PURE__ */ H("code", {
								className: "bg-surface-hover px-[5px] py-px rounded-[3px] font-mono text-[11px] text-text-secondary",
								children: e.nodeId
							})
						]
					}),
					e.stack && /* @__PURE__ */ U("div", { children: [/* @__PURE__ */ U("button", {
						type: "button",
						onClick: () => a((e) => !e),
						className: "bg-transparent border-none p-0 cursor-pointer text-xs font-medium text-text-secondary font-inherit",
						"data-testid": "error-stack-toggle",
						children: [i ? "▾" : "▸", " Stack trace"]
					}), i && /* @__PURE__ */ H("pre", {
						className: "mt-1.5 p-2.5 bg-surface-panel border border-border rounded-md text-[10px] leading-normal font-mono text-text-secondary whitespace-pre-wrap break-all max-h-40 overflow-y-auto m-0",
						"data-testid": "error-stack-content",
						children: e.stack
					})] })
				]
			}),
			/* @__PURE__ */ U("div", {
				className: "flex gap-2 px-3.5 pt-2.5 pb-3 border-t border-border",
				children: [/* @__PURE__ */ H("button", {
					type: "button",
					onClick: d,
					className: "px-3 py-1.5 text-xs font-semibold border-none rounded-md cursor-pointer font-inherit leading-snug bg-surface-hover text-text-secondary",
					"data-testid": "error-copy-btn",
					children: o ? "Copied!" : "Copy error details"
				}), r && /* @__PURE__ */ H("button", {
					type: "button",
					onClick: f,
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
function Br(e, t) {
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
function Vr(e) {
	let t = [], n = [], { nodes: r, edges: i } = e, a = /* @__PURE__ */ new Map();
	for (let e of r) a.set(e.id, e);
	return Hr(r, t), Ur(r, i, t), Wr(i, a, t), Gr(r, t), $r(r, i, t), ti(r, i, n), ni(r, i, n), ri(r, i, n), ii(r, i, n), n.push(...oi(e)), n.push(...si(e)), n.push(...ci(e)), n.push(...li(e)), n.push(...ui(e)), n.push(...di(e)), n.push(...fi(e)), n.push(...pi(e)), n.push(...mi(e)), n.push(...hi(e)), {
		errors: t,
		warnings: n,
		isValid: t.length === 0,
		canPublish: t.length === 0
	};
}
function Hr(e, t) {
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
function Ur(e, t, n) {
	let r = Br(e, t);
	r !== null && n.push({
		code: "CYCLE_DETECTED",
		severity: "error",
		message: "Pipeline contains a cycle.",
		edgeId: r
	});
}
function Wr(e, t, n) {
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
		bt(e.type, r.sourceHandle, i.type, r.targetHandle) || n.push({
			code: "INVALID_HANDLE",
			severity: "error",
			message: `Invalid connection: ${e.type}.${r.sourceHandle} → ${i.type}.${r.targetHandle}.`,
			edgeId: r.id
		});
	}
}
function Gr(e, t) {
	for (let n of e) switch (n.data.type) {
		case "llm":
			Kr(n.id, n.data, t);
			break;
		case "transform":
			qr(n.id, n.data, t);
			break;
		case "condition":
			Jr(n.id, n.data, t);
			break;
		case "action":
			Yr(n.id, n.data, t);
			break;
		case "fork":
			Xr(n.id, n.data, t);
			break;
		case "join":
			Zr(n.id, n.data, t);
			break;
		case "approval": Qr(n.id, n.data, t);
	}
}
function Kr(e, t, n) {
	t.provider || ei(n, e, "provider"), (!t.model || !t.model.trim()) && ei(n, e, "model"), (!t.systemPrompt || !t.systemPrompt.trim()) && ei(n, e, "systemPrompt"), (!t.userPromptTemplate || !t.userPromptTemplate.trim()) && ei(n, e, "userPromptTemplate");
}
function qr(e, t, n) {
	t.transformType || ei(n, e, "transformType"), (!t.expression || !t.expression.trim()) && ei(n, e, "expression");
}
function Jr(e, t, n) {
	(!t.expression || !t.expression.trim()) && ei(n, e, "expression");
}
function Yr(e, t, n) {
	t.actionType || ei(n, e, "actionType");
}
function Xr(e, t, n) {
	(typeof t.branchCount != "number" || t.branchCount < 2) && n.push({
		code: "MISSING_CONFIG",
		severity: "error",
		message: "Fork requires branchCount ≥ 2.",
		nodeId: e,
		field: "branchCount"
	});
}
function Zr(e, t, n) {
	t.mode || ei(n, e, "mode"), t.mergeStrategy || ei(n, e, "mergeStrategy"), t.mode === "n_of_m" && (typeof t.n != "number" || t.n < 1) && n.push({
		code: "MISSING_CONFIG",
		severity: "error",
		message: "Join mode 'n_of_m' requires a numeric n ≥ 1.",
		nodeId: e,
		field: "n"
	});
}
function Qr(e, t, n) {
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
function $r(e, t, n) {
	let r = /* @__PURE__ */ new Map();
	for (let e of t) r.set(e.target, (r.get(e.target) ?? 0) + 1);
	for (let t of e) t.type === "join" && (r.get(t.id) ?? 0) < 2 && n.push({
		code: "JOIN_INSUFFICIENT_INPUTS",
		severity: "error",
		message: "Join node requires at least 2 incoming edges.",
		nodeId: t.id
	});
}
function ei(e, t, n) {
	e.push({
		code: "MISSING_CONFIG",
		severity: "error",
		message: `Missing required field '${n}'.`,
		nodeId: t,
		field: n
	});
}
function ti(e, t, n) {
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
function ni(e, t, n) {
	let r = /* @__PURE__ */ new Set();
	for (let e of t) r.add(e.source);
	for (let t of e) r.has(t.id) || t.data.terminal !== !0 && n.push({
		code: "DEAD_END",
		severity: "warning",
		message: "Node has no outgoing edges.",
		nodeId: t.id
	});
}
function ri(e, t, n) {
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
function ii(e, t, n) {
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
function ai(e) {
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
function oi(e) {
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
		message: `${n.data.type} node '${ai(n)}' has no error handler — failures will terminate the run.`,
		nodeId: n.id
	}));
	return t;
}
function si(e) {
	let t = [];
	for (let n of e.nodes) n.data.type === "llm" && (typeof n.data.maxTokens != "number" || n.data.maxTokens <= 0) && t.push({
		code: "LLM_NO_MAX_TOKENS",
		severity: "warning",
		message: `LLM node '${ai(n)}' has no maxTokens — responses could run long / expensive.`,
		nodeId: n.id,
		field: "maxTokens"
	});
	return t;
}
function ci(e) {
	let t = [];
	for (let n of e.nodes) n.data.type === "approval" && (typeof n.data.timeoutMs != "number" || n.data.timeoutMs <= 0) && t.push({
		code: "UNGUARDED_APPROVAL_TIMEOUT",
		severity: "warning",
		message: `Approval '${ai(n)}' has no timeout — the run could block indefinitely.`,
		nodeId: n.id,
		field: "timeoutMs"
	});
	return t;
}
function li(e) {
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
function ui(e) {
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
function di(e) {
	let t = [], n = /* @__PURE__ */ new Map();
	for (let t of e.nodes) {
		let e = ai(t), r = n.get(e) ?? [];
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
function fi(e) {
	let t = [], n = /\{\{[^}]+\}\}/;
	for (let r of e.nodes) {
		if (r.data.type !== "llm") continue;
		let { temperature: e, userPromptTemplate: i } = r.data;
		typeof e != "number" || e <= .8 || !i || !n.test(i) || t.push({
			code: "LOW_TEMPERATURE_NON_DETERMINISTIC_PROMPT",
			severity: "warning",
			message: `LLM '${ai(r)}' uses high temperature with templated inputs — outputs will be non-deterministic, pair with a retry or validation downstream.`,
			nodeId: r.id
		});
	}
	return t;
}
function pi(e) {
	return e.triggerBinding?.event !== "schedule" || e.status !== "draft" ? [] : [{
		code: "NO_PUBLISHED_VERSION_BUT_TRIGGER_SCHEDULED",
		severity: "warning",
		message: "Scheduled trigger on a draft pipeline — schedules won't fire until published."
	}];
}
function mi(e) {
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
			message: `Condition '${ai(r)}' has no edge from its 'false' handle — any node intended for the false branch is unreachable.`,
			nodeId: r.id,
			field: "false"
		});
	}
	return t;
}
function hi(e) {
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
			message: `Fork '${ai(r)}' branches do not converge in a single Join — parallel branches may diverge or terminate without merging.`,
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
			message: `Join '${ai(n)}' has no matching upstream Fork — its incoming branches don't share a common Fork ancestor.`,
			nodeId: n.id
		});
	}
	return t;
}
//#endregion
//#region src/components/pipelines/export/toMermaid.ts
function gi(e, t) {
	return `${e}${t}`;
}
var _i = {
	trigger: "t",
	llm: "llm",
	transform: "x",
	condition: "c",
	action: "a",
	fork: "f",
	join: "j",
	approval: "ap"
}, vi = {
	trigger: "▶",
	llm: "🧠",
	transform: "⚙",
	condition: "❓",
	action: "⚡",
	fork: "🔀",
	join: "🔗",
	approval: "✋"
};
function yi(e) {
	return e.replace(/"/g, "&quot;").replace(/#/g, "&#35;").replace(/\n/g, "<br/>");
}
var bi = {
	trigger: "Trigger",
	llm: "LLM",
	transform: "Transform",
	condition: "Condition",
	action: "Action",
	fork: "Fork",
	join: "Join",
	approval: "Approval"
};
function xi(e) {
	let t = vi[e.type] ?? "■", n = bi[e.type] ?? e.type.charAt(0).toUpperCase() + e.type.slice(1), r = null;
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
	return yi(r ? `${i}<br/>${r}` : i);
}
function Si(e, t) {
	let n = `"${t}"`;
	switch (e) {
		case "condition": return `{${n}}`;
		case "fork": return `{{${n}}}`;
		case "approval": return `[/${n}\\]`;
		case "llm": return `(${n})`;
		default: return `[${n}]`;
	}
}
function Ci(e) {
	return !e || e === "out" ? null : e;
}
function wi(e) {
	let t = ["flowchart TD"], n = {}, r = /* @__PURE__ */ new Map();
	for (let t of e.nodes) {
		let e = _i[t.type] ?? "n", i = n[e] = (n[e] ?? 0) + 1;
		r.set(t.id, gi(e, i));
	}
	for (let n of e.nodes) {
		let e = r.get(n.id);
		if (!e) continue;
		let i = Si(n.type, xi(n));
		t.push(`  ${e}${i}`);
	}
	for (let n of e.edges) {
		let e = r.get(n.source), i = r.get(n.target);
		if (!e || !i) continue;
		let a = Ci(n.sourceHandle);
		a ? t.push(`  ${e} --"${yi(a)}"--> ${i}`) : t.push(`  ${e} --> ${i}`);
	}
	return t.join("\n");
}
//#endregion
//#region src/components/pipelines/versions/diffDefinitions.ts
function Ti(e) {
	return JSON.stringify(e, (e, t) => {
		if (t && typeof t == "object" && !Array.isArray(t)) {
			let e = Object.keys(t).sort(), n = {};
			for (let r of e) n[r] = t[r];
			return n;
		}
		return t;
	});
}
function Ei(e) {
	let t = /* @__PURE__ */ new Map();
	for (let n of e) t.set(n.id, n);
	return t;
}
function Di(e) {
	return new Set(e.edges.map((e) => e.id));
}
function Oi(e, t) {
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
	let n = Ei(e.nodes), r = Ei(t.nodes), i = [], a = [], o = [];
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
		let a = Ti(t.data) !== Ti(n.data), s = t.position.x !== n.position.x || t.position.y !== n.position.y;
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
	let s = Di(e), c = Di(t), l = 0, u = 0;
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
var ki = {
	trigger: "▶",
	llm: "🧠",
	transform: "⚙",
	condition: "❓",
	action: "⚡",
	fork: "🔀",
	join: "🔗",
	approval: "✋"
};
function Ai(e) {
	return e.data.type === "condition" && e.data.label ? e.data.label : e.data.type === "llm" ? e.data.model : e.data.type === "action" ? e.data.actionType : e.data.type === "trigger" ? e.data.triggerType : e.type.charAt(0).toUpperCase() + e.type.slice(1);
}
function ji(e, t, n) {
	let i = e.node, a = ki[i.type] ?? "■", o = t !== "removed" && !!n;
	return /* @__PURE__ */ U("button", {
		type: "button",
		disabled: !o,
		onClick: o ? () => n(e.node.id) : void 0,
		className: r("flex items-center gap-1.5 px-2 py-1.5 rounded-md text-xs font-[inherit] bg-surface-panel border border-border text-left w-full text-text-primary", o ? "cursor-pointer" : "cursor-default", t === "removed" && "opacity-85"),
		"data-testid": `diff-row-${t}`,
		children: [
			/* @__PURE__ */ H("span", {
				className: "text-sm",
				children: a
			}),
			/* @__PURE__ */ H("span", {
				className: "font-semibold",
				children: i.type
			}),
			/* @__PURE__ */ H("span", {
				className: "text-text-secondary flex-1 overflow-hidden text-ellipsis whitespace-nowrap",
				children: Ai(i)
			}),
			t === "modified" && e.positionChanged ? /* @__PURE__ */ H("span", {
				className: "inline-flex items-center px-1.5 py-px rounded text-[10px] font-semibold bg-warning-bg text-warning-fg",
				children: "moved"
			}) : null
		]
	}, `${t}-${e.node.id}`);
}
function Mi({ open: e, onClose: t, currentDef: n, publishedDef: r, onJumpToNode: i }) {
	let a = R(() => Oi(n, r), [n, r]), o = (e) => {
		i && i(e), t();
	}, s = r !== null, c = n.version, l = n.publishedVersion;
	return /* @__PURE__ */ U(S, {
		open: e,
		onClose: t,
		title: "Changes since publish",
		maxWidth: 820,
		footer: /* @__PURE__ */ H("button", {
			onClick: t,
			className: "px-4 py-[7px] text-[13px] font-semibold bg-primary text-white border-none rounded-[7px] cursor-pointer font-[inherit]",
			children: "Close"
		}),
		children: [/* @__PURE__ */ U("div", {
			className: "text-[13px] text-text-primary mb-3 flex items-center gap-2 flex-wrap",
			children: [
				/* @__PURE__ */ U("strong", { children: ["v", c] }),
				/* @__PURE__ */ H("span", {
					className: "text-text-tertiary",
					children: "vs"
				}),
				typeof l == "number" ? /* @__PURE__ */ U("strong", { children: ["published v", l] }) : /* @__PURE__ */ H("strong", {
					className: "text-text-secondary",
					children: "never published"
				})
			]
		}), n.publishedVersion === void 0 ? /* @__PURE__ */ H("p", {
			className: "m-0 text-[13px] text-text-secondary",
			children: "This pipeline has never been published."
		}) : s ? /* @__PURE__ */ U(V, { children: [/* @__PURE__ */ U("div", {
			className: "flex gap-3 flex-wrap",
			children: [
				/* @__PURE__ */ U("div", {
					className: "flex-1 min-w-0 flex flex-col gap-1.5",
					children: [/* @__PURE__ */ U("div", {
						className: "text-[11px] font-bold tracking-[0.5px] uppercase text-text-secondary mb-0.5",
						children: [
							"Added (",
							a.addedNodes.length,
							")"
						]
					}), a.addedNodes.length === 0 ? /* @__PURE__ */ H("div", {
						className: "text-xs text-text-tertiary",
						children: "None"
					}) : a.addedNodes.map((e) => ji(e, "added", o))]
				}),
				/* @__PURE__ */ U("div", {
					className: "flex-1 min-w-0 flex flex-col gap-1.5",
					children: [/* @__PURE__ */ U("div", {
						className: "text-[11px] font-bold tracking-[0.5px] uppercase text-text-secondary mb-0.5",
						children: [
							"Removed (",
							a.removedNodes.length,
							")"
						]
					}), a.removedNodes.length === 0 ? /* @__PURE__ */ H("div", {
						className: "text-xs text-text-tertiary",
						children: "None"
					}) : a.removedNodes.map((e) => ji(e, "removed", void 0))]
				}),
				/* @__PURE__ */ U("div", {
					className: "flex-1 min-w-0 flex flex-col gap-1.5",
					children: [/* @__PURE__ */ U("div", {
						className: "text-[11px] font-bold tracking-[0.5px] uppercase text-text-secondary mb-0.5",
						children: [
							"Modified (",
							a.modifiedNodes.length,
							")"
						]
					}), a.modifiedNodes.length === 0 ? /* @__PURE__ */ H("div", {
						className: "text-xs text-text-tertiary",
						children: "None"
					}) : a.modifiedNodes.map((e) => ji(e, "modified", o))]
				})
			]
		}), /* @__PURE__ */ U("div", {
			className: "mt-4 pt-3 border-t border-border",
			children: [
				/* @__PURE__ */ U("div", {
					className: "text-xs text-text-secondary mt-1",
					children: [
						/* @__PURE__ */ H("strong", { children: a.addedEdges }),
						" edge",
						a.addedEdges === 1 ? "" : "s",
						" added ·",
						" ",
						/* @__PURE__ */ H("strong", { children: a.removedEdges }),
						" edge",
						a.removedEdges === 1 ? "" : "s",
						" removed"
					]
				}),
				a.nameChanged ? /* @__PURE__ */ U("div", {
					className: "text-xs text-text-secondary mt-1",
					children: [
						"Name: ",
						/* @__PURE__ */ U("em", { children: [
							"\"",
							a.previousName ?? "",
							"\""
						] }),
						" →",
						" ",
						/* @__PURE__ */ U("strong", { children: [
							"\"",
							n.name,
							"\""
						] })
					]
				}) : null,
				a.iconChanged ? /* @__PURE__ */ U("div", {
					className: "text-xs text-text-secondary mt-1",
					children: [
						"Icon: ",
						a.previousIcon ?? "—",
						" → ",
						n.icon ?? "—"
					]
				}) : null,
				a.tagsChanged ? /* @__PURE__ */ U("div", {
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
		})] }) : /* @__PURE__ */ U("p", {
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
function Ni({ open: e, onClose: t }) {
	return null;
}
//#endregion
//#region src/components/pipelines/EditorModals.tsx
var Pi = "px-3 py-1.5 text-[13px] bg-transparent border-none text-text-secondary cursor-pointer font-[inherit]", Fi = "px-4 py-[7px] text-[13px] font-semibold bg-danger text-white border-none rounded-[7px] cursor-pointer font-[inherit]";
function Ii(e) {
	let { publishConfirmOpen: t, onPublishClose: n, onPublishConfirm: i, hasErrors: a, validationErrorCount: o, definitionName: s, definitionVersion: c, deleteConfirmOpen: l, onDeleteClose: u, onDeleteConfirm: d, clearRunsConfirmOpen: f, onClearRunsClose: p, onClearRunsConfirm: m, versionDiffOpen: h, onVersionDiffClose: g, currentDef: _, publishedDef: v, onJumpToNode: y, simPanelOpen: b, onSimPanelClose: x } = e;
	return /* @__PURE__ */ U(V, { children: [
		/* @__PURE__ */ H(S, {
			open: t,
			onClose: n,
			title: "Publish pipeline?",
			maxWidth: 420,
			footer: /* @__PURE__ */ U(V, { children: [/* @__PURE__ */ H("button", {
				onClick: n,
				className: Pi,
				children: "Cancel"
			}), /* @__PURE__ */ H("button", {
				onClick: i,
				disabled: a,
				className: r("px-4 py-[7px] text-[13px] font-semibold text-white border-none rounded-[7px] font-[inherit]", a ? "bg-border-emphasis cursor-not-allowed" : "bg-primary cursor-pointer"),
				children: "Publish"
			})] }),
			children: /* @__PURE__ */ U("p", {
				className: "m-0",
				children: [
					"Publishing will make ",
					/* @__PURE__ */ U("strong", { children: [
						"\"",
						s,
						"\""
					] }),
					" available for runs and set the published version to",
					/* @__PURE__ */ U("strong", { children: [" v", c + 1] }),
					".",
					a ? /* @__PURE__ */ U(V, { children: [
						/* @__PURE__ */ H("br", {}),
						/* @__PURE__ */ H("br", {}),
						/* @__PURE__ */ U("span", {
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
		/* @__PURE__ */ H(S, {
			open: l,
			onClose: u,
			title: "Delete pipeline?",
			maxWidth: 400,
			footer: /* @__PURE__ */ U(V, { children: [/* @__PURE__ */ H("button", {
				onClick: u,
				className: Pi,
				children: "Cancel"
			}), /* @__PURE__ */ H("button", {
				onClick: d,
				className: Fi,
				children: "Delete"
			})] }),
			children: /* @__PURE__ */ U("p", {
				className: "m-0",
				children: [/* @__PURE__ */ U("strong", { children: [
					"\"",
					s,
					"\""
				] }), " will be permanently removed. Run history for this pipeline will also be lost."]
			})
		}),
		/* @__PURE__ */ H(S, {
			open: f,
			onClose: p,
			title: "Clear run history?",
			maxWidth: 400,
			footer: /* @__PURE__ */ U(V, { children: [/* @__PURE__ */ H("button", {
				onClick: p,
				className: Pi,
				children: "Cancel"
			}), /* @__PURE__ */ H("button", {
				onClick: m,
				className: Fi,
				children: "Clear history"
			})] }),
			children: /* @__PURE__ */ U("p", {
				className: "m-0",
				children: [
					"All stored run history for ",
					/* @__PURE__ */ U("strong", { children: [
						"\"",
						s,
						"\""
					] }),
					" will be permanently removed. This cannot be undone."
				]
			})
		}),
		/* @__PURE__ */ H(Mi, {
			open: h,
			onClose: g,
			currentDef: _,
			publishedDef: v,
			onJumpToNode: y
		}),
		/* @__PURE__ */ H(Ni, {
			open: b,
			onClose: x
		})
	] });
}
//#endregion
//#region src/components/pipelines/LiveOutputPanel.tsx
function Li({ runId: e, visible: t }) {
	let [n, i] = B(/* @__PURE__ */ new Map()), a = z(null), o = z(!0), s = z(null);
	L(() => {
		e !== s.current && (s.current = e, i(/* @__PURE__ */ new Map()), o.current = !0);
	}, [e]);
	let c = I(() => {
		let e = a.current;
		if (!e) return;
		let t = e.scrollHeight - e.scrollTop - e.clientHeight < 30;
		o.current = t;
	}, []), l = I(() => {
		if (!o.current) return;
		let e = a.current;
		e && (e.scrollTop = e.scrollHeight);
	}, []), u = I((t) => {
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
	k("*", u), L(() => {
		l();
	}, [n, l]);
	let d = I((e) => {
		i((t) => {
			let n = new Map(t), r = n.get(e);
			return r && n.set(e, {
				...r,
				collapsed: !r.collapsed
			}), n;
		});
	}, []), f = R(() => {
		for (let e of n.values()) if (e.active) return !0;
		return !1;
	}, [n]), p = R(() => Array.from(n.values()), [n]);
	return t ? /* @__PURE__ */ U("div", {
		className: "flex flex-col bg-code-surface border-t border-code-border max-h-[320px] min-h-[160px] overflow-hidden relative",
		"data-testid": "live-output-panel",
		children: [/* @__PURE__ */ H("div", {
			className: "flex items-center justify-between py-2 px-[14px] bg-code-panel border-b border-code-border shrink-0",
			children: /* @__PURE__ */ U("div", {
				className: "text-xs font-bold text-code-text tracking-[0.04em] uppercase flex items-center gap-2",
				children: [
					/* @__PURE__ */ H("span", { children: "Live Output" }),
					f && /* @__PURE__ */ H("span", { className: "w-1.5 h-1.5 rounded-full bg-code-green [animation:live-output-blink_1.2s_ease-in-out_infinite]" }),
					e && /* @__PURE__ */ U("span", {
						className: "text-[10px] text-code-muted font-normal normal-case",
						children: [e.slice(0, 8), "..."]
					})
				]
			})
		}), /* @__PURE__ */ H("div", {
			ref: a,
			className: "flex-1 overflow-y-auto py-[10px] px-[14px] text-[13px] leading-[1.6] text-code-text font-code",
			onScroll: c,
			children: p.length === 0 ? /* @__PURE__ */ H("div", {
				className: "flex items-center justify-center h-full text-code-muted text-[13px] italic",
				children: e ? "Waiting for LLM output..." : "No active run"
			}) : p.map((e) => /* @__PURE__ */ U("div", { children: [/* @__PURE__ */ U("div", {
				className: r("flex items-center gap-2 py-1.5 cursor-pointer select-none text-[11px] font-semibold border-b border-code-border mb-1.5", e.active ? "text-code-blue" : "text-code-subtle"),
				onClick: () => d(e.stepId),
				role: "button",
				tabIndex: 0,
				onKeyDown: E(() => d(e.stepId)),
				children: [
					/* @__PURE__ */ H("span", {
						className: "text-[10px]",
						children: e.collapsed ? "▶" : "▼"
					}),
					/* @__PURE__ */ H("span", { children: e.stepId }),
					e.active && /* @__PURE__ */ H("span", {
						className: "text-code-green text-[10px]",
						children: "streaming"
					})
				]
			}), !e.collapsed && /* @__PURE__ */ U(V, { children: [e.text.length > 0 && /* @__PURE__ */ U("div", {
				className: "whitespace-pre-wrap break-words m-0 mb-3 p-0 text-code-text",
				children: [e.text, e.active && /* @__PURE__ */ H("span", { className: "inline-block w-0.5 h-[14px] bg-code-blue ml-px align-text-bottom [animation:live-output-blink_1s_step-end_infinite]" })]
			}), e.summary && /* @__PURE__ */ U("div", {
				className: "text-[11px] text-code-green font-semibold pt-1 pb-2 border-b border-code-border mb-2",
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
function Ri(e, t) {
	let n = new Blob([t], { type: "application/json" }), r = URL.createObjectURL(n), i = document.createElement("a");
	i.href = r, i.download = e, document.body.appendChild(i), i.click(), document.body.removeChild(i), URL.revokeObjectURL(r);
}
//#endregion
//#region src/components/pipelines/editor/useEditorRunLifecycle.ts
function zi(e, t) {
	if (!t) return "step";
	let n = e?.nodes.find((e) => e.id === t);
	return n ? n.data.type === "condition" && n.data.label ? n.data.label : n.type.charAt(0).toUpperCase() + n.type.slice(1) : t;
}
function Bi(e) {
	let t = _e(), { toast: r } = n(), { definition: i, selectedNodeId: a, setSelectedNodeId: o } = pe(), s = z(t.runs);
	L(() => {
		s.current = t.runs;
	}, [t.runs]);
	let c = z(i);
	L(() => {
		c.current = i;
	}, [i]);
	let l = I((t) => t ? s.current[t]?.pipelineId === e : !1, [e]), [u, d] = B(null), [f, p] = B(null), m = I(() => {
		d(null), p(null);
	}, []), h = I((e) => {
		p(e);
	}, []), g = I((t) => {
		"eventType" in t || t.pipelineId === e && (r("Run started", { type: "info" }), d(null), p(null));
	}, [e, r]), _ = I((e) => {
		if ("eventType" in e || !l(e.runId)) return;
		let t = Math.round(e.durationMs / 100) / 10;
		r(`Run completed in ${t}s`, { type: "success" });
	}, [l, r]), v = I((e) => {
		if ("eventType" in e || !l(e.runId)) return;
		let t = e.error.nodeId, n = zi(c.current, t);
		r(`Run failed at ${n}`, {
			type: "error",
			durationMs: 8e3,
			actionLabel: "View",
			onAction: () => o(t)
		}), d(e.error);
	}, [
		l,
		o,
		r
	]), y = I((e) => {
		"eventType" in e || l(e.runId) && r("Run cancelled", { type: "warning" });
	}, [l, r]), b = I((e) => {
		if ("eventType" in e || !l(e.runId)) return;
		let t = e.stepId, n = zi(c.current, t);
		r(`Approval requested on "${n}"`, {
			type: "warning",
			durationMs: 6e3,
			actionLabel: "Resolve",
			onAction: () => o(t)
		});
	}, [
		l,
		o,
		r
	]);
	k("pipeline.run.started", g), k("pipeline.run.completed", _), k("pipeline.run.failed", v), k("pipeline.run.cancelled", y), k("pipeline.approval.requested", b);
	let [x, S] = B(null);
	L(() => {
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
	let C = x ? t.runs[x] : void 0, w = !!C && (C.status === "running" || C.status === "pending" || C.status === "awaiting_approval"), [T, E] = B(/* @__PURE__ */ new Set()), [D, O] = B(null), [A, ee] = B(null), [j, te] = B(null), [ne, re] = B(0), [M, ie] = B(!1), [ae, oe] = B(null), se = I((e, t) => {
		t === null ? (ee(null), te(null)) : (ee(t), te(e));
	}, []), ce = I((e) => {
		E((t) => {
			let n = new Set(t);
			return n.has(e) ? n.delete(e) : n.add(e), n;
		});
	}, []), le = I(async () => {
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
	]), ue = I(() => {
		D && (t.resolveBreakpoint(D.runId, D.stepId, "continue"), O(null));
	}, [D, t]), N = I(() => {
		D && (t.resolveBreakpoint(D.runId, D.stepId, "step_over"), O(null));
	}, [D, t]), de = I(() => {
		D && (t.resolveBreakpoint(D.runId, D.stepId, "resume_all"), O(null));
	}, [D, t]), fe = I(async () => {
		if (!(!D || !A || j !== D.stepId) && Object.keys(A).length !== 0) {
			ie(!0);
			try {
				await Ke(e, D.runId, D.stepId, {
					mode: "merge",
					values: A
				}), ee(null), te(null), re((e) => e + 1), t.resolveBreakpoint(D.runId, D.stepId, "continue"), O(null);
			} catch (e) {
				if (e instanceof Ge) r(`Patch rejected: ${e.reason}`, {
					type: "error",
					durationMs: 8e3
				});
				else if (e instanceof Ce) r(`Apply failed (HTTP ${e.status})`, {
					type: "error",
					durationMs: 6e3
				});
				else {
					let t = e instanceof Error ? e.message : String(e);
					r(`Apply failed: ${t}`, {
						type: "error",
						durationMs: 6e3
					});
				}
			} finally {
				ie(!1);
			}
		}
	}, [
		D,
		A,
		j,
		e,
		t,
		r
	]), me = I(async (t) => {
		if (D) {
			oe(t);
			try {
				await Te(e, D.runId, D.stepId, t), r("Patch reverted", {
					type: "success",
					durationMs: 3e3
				});
			} catch (e) {
				if (e instanceof Ce) r(`Revert failed (HTTP ${e.status})`, {
					type: "error",
					durationMs: 6e3
				});
				else {
					let t = e instanceof Error ? e.message : String(e);
					r(`Revert failed: ${t}`, {
						type: "error",
						durationMs: 6e3
					});
				}
			} finally {
				oe(null);
			}
		}
	}, [
		D,
		e,
		r
	]), he = I((e) => {
		if ("eventType" in e || !l(e.runId)) return;
		O({
			runId: e.runId,
			stepId: e.stepId
		});
		let t = zi(c.current, e.stepId);
		r(`Paused at breakpoint: ${t}`, {
			type: "warning",
			durationMs: 6e3
		});
	}, [l, r]);
	k("pipeline.step.breakpoint", he);
	let ge = I((e) => {
		"eventType" in e || D && D.runId === e.runId && O(null);
	}, [D]);
	k("pipeline.run.completed", ge), k("pipeline.run.failed", ge), k("pipeline.run.cancelled", ge);
	let ve = I(() => {
		u?.nodeId && (t.retryFromStep(u.nodeId), m());
	}, [
		u,
		t,
		m
	]), ye = i?.status === "published", be = !w && !ye, xe = w ? "Cancel the active run" : ye ? "Start a new run" : "Publish the pipeline to enable runs", [Se, we] = B(!1), [Ee, De] = B({}), [Oe, P] = B(!1), [ke, Ae] = B("config");
	L(() => {
		a !== null && Ae("config");
	}, [a]);
	let je = I(async (n) => {
		P(!0);
		try {
			let i = await t.triggerRun(e, n);
			S(i), Ae("runs"), r(`Pipeline triggered — run ${i.slice(0, 8)}…`, { type: "success" });
		} catch (e) {
			console.error("[PipelineEditor] triggerRun failed", e), r(`Trigger failed: ${e.message}`, { type: "error" });
		} finally {
			P(!1);
		}
	}, [
		t,
		e,
		r
	]);
	return {
		currentRunId: x,
		setCurrentRunId: S,
		activeError: u,
		setActiveError: d,
		errorNodeAnchor: f,
		handleDismissError: m,
		handleErrorNodePosition: h,
		handleRetryFromError: ve,
		handleRunClick: I(async () => {
			if (w && x) {
				t.cancelRun(x);
				return;
			}
			be || je();
		}, [
			w,
			x,
			be,
			t,
			je
		]),
		handleTriggerInputSubmit: I(() => {
			we(!1), je(Ee);
		}, [je, Ee]),
		isRunActive: w,
		runDisabled: be,
		runTitle: xe,
		isTriggering: Oe,
		triggerInputOpen: Se,
		setTriggerInputOpen: we,
		triggerInputValues: Ee,
		setTriggerInputValues: De,
		breakpoints: T,
		handleToggleBreakpoint: ce,
		handleDebugRunClick: le,
		pausedBreakpoint: D,
		handleBreakpointContinue: ue,
		handleBreakpointStepOver: N,
		handleBreakpointResumeAll: de,
		handleApplyAndContinue: fe,
		handleRevertPatch: me,
		applyingPatch: M,
		revertingPatchId: ae,
		dirtyPatch: A,
		dirtyPatchStepId: j,
		handleContextEditBufferChange: se,
		resetEditBufferKey: ne,
		sidebarTab: ke,
		setSidebarTab: Ae
	};
}
//#endregion
//#region src/components/pipelines/editor/EditorOverflowMenu.tsx
function Vi({ isPublished: e, showTags: t, hasPublishedVersion: n, onDuplicate: i, onCopyMermaid: a, onViewVersions: o, onRevert: s, onToggleShowTags: c, onViewRunHistory: l, onClearRunHistory: u, onSimPanelOpen: d, onDelete: f }) {
	let p = r("block w-full text-left px-3.5 py-2 text-[13px]", "border-none bg-transparent cursor-pointer font-inherit text-text-primary", "hover:bg-surface-hover"), m = r("block w-full text-left px-3.5 py-2 text-[13px]", "border-none bg-transparent cursor-pointer font-inherit text-danger-fg", "hover:bg-surface-hover");
	return /* @__PURE__ */ U("div", {
		className: r("absolute top-full right-0 mt-1.5 bg-surface border border-border rounded-lg", "shadow-lg p-0 min-w-[200px] max-h-[320px] overflow-y-auto z-20"),
		role: "menu",
		"aria-label": "Editor actions",
		onKeyDown: (e) => Je(e, {
			itemSelector: "[role=\"menuitem\"]",
			orientation: "vertical"
		}),
		children: [
			/* @__PURE__ */ H("button", {
				className: p,
				role: "menuitem",
				onClick: i,
				children: "Duplicate"
			}),
			/* @__PURE__ */ H("button", {
				className: p,
				role: "menuitem",
				onClick: a,
				"data-testid": "copy-mermaid-btn",
				children: "Copy Mermaid"
			}),
			/* @__PURE__ */ H("button", {
				className: p,
				role: "menuitem",
				onClick: o,
				"data-testid": "view-versions-btn",
				children: "View changes since publish"
			}),
			/* @__PURE__ */ H("button", {
				className: p,
				role: "menuitem",
				onClick: s,
				disabled: !n,
				children: "Revert to published"
			}),
			/* @__PURE__ */ H("div", { className: "border-t border-border-subtle my-1" }),
			/* @__PURE__ */ H("button", {
				className: p,
				role: "menuitem",
				onClick: c,
				"data-testid": "toggle-tags-row",
				children: t ? "Hide tags" : "Show tags"
			}),
			/* @__PURE__ */ H("button", {
				className: p,
				role: "menuitem",
				onClick: l,
				children: "View run history"
			}),
			/* @__PURE__ */ H("button", {
				className: m,
				role: "menuitem",
				onClick: u,
				children: "Clear run history"
			}),
			!1,
			/* @__PURE__ */ H("div", { className: "border-t border-border-subtle my-1" }),
			/* @__PURE__ */ H("button", {
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
var Hi = {
	neutral: "bg-surface-hover text-text-secondary",
	success: "bg-success-bg text-success-fg",
	warning: "bg-warning-bg text-warning-fg",
	danger: "bg-danger-bg text-danger-fg",
	info: "bg-info-bg text-info-fg"
};
function Ui({ pipelineId: e, definition: t, dirty: n, savingFlash: i, isRunActive: a, isTriggering: o, runDisabled: c, runTitle: l, currentRun: u, breakpoints: d, onRunClick: f, onDebugRunClick: p, onExport: h, onPublishClick: _, onDuplicate: v, onCopyMermaid: y, onViewVersions: b, onRevert: x, onToggleShowTags: S, showTags: C, onViewRunHistory: w, onClearRunHistory: T, onSimPanelOpen: E, onDelete: D }) {
	let O = rt(), { rename: k, setIcon: A, setSelectedNodeId: ee } = pe(), [j, te] = B(!1), [ne, re] = B(""), M = z(null);
	L(() => {
		j && (re(t.name ?? ""), setTimeout(() => M.current?.focus(), 0));
	}, [j, t.name]);
	let ie = () => {
		let e = ne.trim();
		e && e !== t.name && k(e), te(!1);
	}, ae = R(() => t ? Vr(t) : null, [t]);
	ae?.errors.length;
	let oe = t.status === "published", se = n ? {
		label: "Saving…",
		variant: "info"
	} : i ? {
		label: "✓ Saved",
		variant: "success"
	} : {
		label: "✓ Saved",
		variant: "neutral"
	}, ce = t.status === "published" ? {
		label: `v${t.version} · Published`,
		variant: "success"
	} : typeof t.publishedVersion == "number" ? {
		label: `v${t.version} · Draft (pub v${t.publishedVersion})`,
		variant: "warning"
	} : {
		label: `v${t.version} · Draft`,
		variant: "neutral"
	}, le = ae ? ae.errors.length > 0 ? {
		label: `✗ ${ae.errors.length} error${ae.errors.length === 1 ? "" : "s"}`,
		variant: "danger"
	} : ae.warnings.length > 0 ? {
		label: `⚠ ${ae.warnings.length} warning${ae.warnings.length === 1 ? "" : "s"}`,
		variant: "warning"
	} : {
		label: "✓ Valid",
		variant: "success"
	} : {
		label: "…",
		variant: "neutral"
	}, [ue, N] = B(!1), de = z(null);
	Gn(de, () => N(!1), ue);
	let fe = ae ? [...ae.errors, ...ae.warnings] : [], me = (e) => {
		e && (ee(e), N(!1));
	}, he = t.nodes.filter((e) => e.type !== "trigger").length, ge = u ? Object.values(u.steps).filter((e) => e.status === "completed" || e.status === "skipped").length : 0, _e = ((u?.startedAt ? Date.now() - new Date(u.startedAt).getTime() : 0) / 1e3).toFixed(1), ve = a && u ? {
		text: `Running (${ge}/${he} steps) · ${_e}s`,
		variant: "running"
	} : u?.status === "completed" ? {
		text: `Completed in ${u.durationMs ? (u.durationMs / 1e3).toFixed(1) : "?"}s`,
		variant: "success"
	} : u?.status === "failed" ? {
		text: `Failed at ${zi(t, u.error?.nodeId)}`,
		variant: "error"
	} : {
		text: "",
		variant: "none"
	}, ye = {
		running: "bg-info-bg text-info-fg",
		success: "bg-success-bg text-success-fg",
		error: "bg-danger-bg text-danger-fg"
	}, be = a ? "⏹ Stop" : u && u.status !== "running" ? "↻ Re-run" : "▶ Run", [xe, Se] = B(!1), Ce = z(null);
	return Gn(Ce, () => Se(!1), xe), /* @__PURE__ */ U("div", {
		className: r("h-11 shrink-0 flex items-center gap-2.5 px-3", "border-b border-border bg-surface", "sticky top-0 z-5"),
		children: [
			/* @__PURE__ */ H(g, {
				onClick: () => O("/pipelines"),
				"aria-label": "Back to pipelines",
				title: "Back to pipelines",
				children: "←"
			}),
			/* @__PURE__ */ H(s, {
				value: t.icon ?? "🔀",
				onChange: A
			}),
			j ? /* @__PURE__ */ H("input", {
				ref: M,
				value: ne,
				onChange: (e) => re(e.target.value),
				onBlur: ie,
				onKeyDown: (e) => {
					e.key === "Enter" && ie(), e.key === "Escape" && (re(t.name), te(!1));
				},
				className: r("px-2 py-1 text-sm font-bold text-text-primary", "bg-surface border border-border-field rounded-md", "font-inherit outline-none w-[260px]"),
				"data-testid": "pipeline-name-input"
			}) : /* @__PURE__ */ H("button", {
				type: "button",
				onClick: () => te(!0),
				className: r("px-2 py-1 text-sm font-bold text-text-primary", "bg-transparent border border-transparent rounded-md", "cursor-text font-inherit max-w-[280px]", "overflow-hidden text-ellipsis whitespace-nowrap text-left"),
				title: t.name,
				"data-testid": "pipeline-name",
				children: t.name
			}),
			/* @__PURE__ */ H("span", {
				className: r("inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold font-inherit leading-snug whitespace-nowrap", Hi[se.variant]),
				"data-testid": "save-status",
				children: se.label
			}),
			/* @__PURE__ */ H("span", {
				className: r("inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold font-inherit leading-snug whitespace-nowrap", Hi[ce.variant]),
				"data-testid": "version-badge",
				children: ce.label
			}),
			/* @__PURE__ */ U("div", {
				className: "relative",
				ref: de,
				children: [/* @__PURE__ */ H("button", {
					type: "button",
					onClick: () => N((e) => !e),
					className: r("inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold font-inherit leading-snug whitespace-nowrap", "cursor-pointer border-none", Hi[le.variant]),
					"data-testid": "validation-indicator",
					children: le.label
				}), ue && fe.length > 0 && /* @__PURE__ */ H("div", {
					className: r("absolute top-full mt-1.5 bg-surface border border-border rounded-lg", "shadow-lg p-0 min-w-[260px] max-w-[360px] max-h-[320px] overflow-y-auto z-20"),
					children: fe.map((e, t) => /* @__PURE__ */ U("button", {
						type: "button",
						onClick: () => me(e.nodeId),
						className: r("block w-full text-left px-3.5 py-2 text-[13px]", "border-none bg-transparent font-inherit text-text-primary", "flex gap-2 items-start leading-snug", e.nodeId ? "cursor-pointer" : "cursor-default", t < fe.length - 1 && "border-b border-border"),
						children: [/* @__PURE__ */ H("span", {
							className: r("font-bold text-xs", e.severity === "error" ? "text-danger-fg" : "text-warning-fg"),
							children: e.severity === "error" ? "✗" : "⚠"
						}), /* @__PURE__ */ U("span", {
							className: "flex-1 text-xs",
							children: [
								/* @__PURE__ */ H("div", {
									className: "font-semibold",
									children: e.code
								}),
								/* @__PURE__ */ H("div", {
									className: "text-text-secondary",
									children: e.message
								}),
								e.nodeId && /* @__PURE__ */ H("div", {
									className: "mt-0.5 text-[11px] text-primary",
									children: "Jump to node →"
								})
							]
						})]
					}, `${e.code}-${t}`))
				})]
			}),
			ve.variant !== "none" && /* @__PURE__ */ U("span", {
				className: r("inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-semibold font-inherit leading-snug whitespace-nowrap", ye[ve.variant]),
				"data-testid": "run-status-indicator",
				children: [
					ve.variant === "running" && /* @__PURE__ */ H("span", { className: "inline-block w-3 h-3 border-2 border-border border-t-primary rounded-full animate-spin" }),
					ve.variant === "success" && "✓ ",
					ve.variant === "error" && "✗ ",
					ve.text
				]
			}),
			/* @__PURE__ */ H("div", { className: "flex-1" }),
			/* @__PURE__ */ H(m, {
				variant: "secondary",
				onClick: () => O("/pipelines/metrics"),
				title: "View pipeline metrics dashboard",
				"data-testid": "metrics-button",
				children: "Metrics"
			}),
			/* @__PURE__ */ H(m, {
				variant: "secondary",
				onClick: h,
				title: "Export pipeline as JSON",
				"data-testid": "export-button",
				children: "Export"
			}),
			/* @__PURE__ */ H("button", {
				type: "button",
				onClick: _,
				title: oe ? "Already published at this version" : "Publish pipeline to enable runs",
				disabled: oe,
				className: r("px-3 py-1.5 text-[13px] font-semibold border-none rounded-md font-inherit shrink-0", oe ? "bg-surface-hover text-text-tertiary cursor-default opacity-70" : "bg-success text-white cursor-pointer"),
				"data-testid": "publish-button",
				children: oe ? "Published" : "Publish"
			}),
			/* @__PURE__ */ H("button", {
				type: "button",
				onClick: f,
				disabled: c || o,
				title: l,
				className: r("px-3.5 py-1.5 text-[13px] font-semibold text-white border-none rounded-md font-inherit shrink-0", a ? "bg-danger" : "bg-primary", c || o ? "cursor-not-allowed opacity-50" : "cursor-pointer"),
				"data-testid": "run-button",
				children: o ? /* @__PURE__ */ U("span", {
					className: "inline-flex items-center gap-1.5",
					children: [/* @__PURE__ */ H("span", { className: "inline-block w-3 h-3 border-2 border-border border-t-white rounded-full animate-spin" }), "Triggering…"]
				}) : be
			}),
			d.size > 0 && /* @__PURE__ */ U("button", {
				type: "button",
				onClick: p,
				disabled: c || a,
				title: `Debug run (${d.size} breakpoint${d.size > 1 ? "s" : ""})`,
				className: r("px-3.5 py-1.5 text-[13px] font-semibold bg-warning text-white", "border-none rounded-md font-inherit shrink-0", c || a ? "cursor-not-allowed opacity-50" : "cursor-pointer"),
				"data-testid": "debug-run-button",
				children: [
					"Debug (",
					d.size,
					")"
				]
			}),
			/* @__PURE__ */ U("div", {
				className: "relative",
				ref: Ce,
				children: [/* @__PURE__ */ H(g, {
					onClick: () => Se((e) => !e),
					"aria-label": "More actions",
					"data-testid": "overflow-menu-btn",
					children: "⋯"
				}), xe && /* @__PURE__ */ H(Vi, {
					isPublished: oe,
					showTags: C,
					onDuplicate: () => {
						v(), Se(!1);
					},
					onCopyMermaid: () => {
						y(), Se(!1);
					},
					onViewVersions: () => {
						b(), Se(!1);
					},
					onRevert: () => {
						x(), Se(!1);
					},
					onToggleShowTags: () => {
						S(), Se(!1);
					},
					onViewRunHistory: () => {
						w(), Se(!1);
					},
					onClearRunHistory: () => {
						T(), Se(!1);
					},
					onSimPanelOpen: () => {
						E(), Se(!1);
					},
					onDelete: () => {
						D(), Se(!1);
					},
					hasPublishedVersion: typeof t.publishedVersion == "number"
				})]
			})
		]
	});
}
//#endregion
//#region src/components/pipelines/context-inspector/ContextJsonTree.tsx
var Wi = 12;
function Gi(e) {
	return r("text-xs", {
		string: "text-code-green",
		number: "text-code-peach",
		boolean: "text-code-mauve",
		null: "text-code-muted",
		bracket: "text-code-comment"
	}[e]);
}
function Ki({ data: e, depth: t = 0, highlightKeys: n, keyName: i, isHighlighted: a = !1 }) {
	let [o, s] = B(t > 2);
	if (t > Wi) return /* @__PURE__ */ H("span", {
		className: Gi("string"),
		children: "[max depth]"
	});
	let c = a || i != null && n?.has(i);
	if (e === null) return /* @__PURE__ */ H("span", {
		className: r(Gi("null"), c && "bg-[rgba(166,227,161,0.08)] rounded-sm px-0.5"),
		children: "null"
	});
	if (e === void 0) return /* @__PURE__ */ H("span", {
		className: r(Gi("null"), c && "bg-[rgba(166,227,161,0.08)] rounded-sm px-0.5"),
		children: "undefined"
	});
	if (typeof e == "boolean") return /* @__PURE__ */ H("span", {
		className: r(Gi("boolean"), c && "bg-[rgba(166,227,161,0.08)] rounded-sm px-0.5"),
		children: String(e)
	});
	if (typeof e == "number") return /* @__PURE__ */ H("span", {
		className: r(Gi("number"), c && "bg-[rgba(166,227,161,0.08)] rounded-sm px-0.5"),
		children: String(e)
	});
	if (typeof e == "string") {
		let t = e.length > 120 ? e.slice(0, 120) + "..." : e;
		return /* @__PURE__ */ U("span", {
			className: r(Gi("string"), c && "bg-[rgba(166,227,161,0.08)] rounded-sm px-0.5"),
			children: [
				"\"",
				t,
				"\""
			]
		});
	}
	if (Array.isArray(e)) return e.length === 0 ? /* @__PURE__ */ H("span", {
		className: Gi("bracket"),
		children: "[]"
	}) : /* @__PURE__ */ U("span", { children: [
		/* @__PURE__ */ H("span", {
			className: "cursor-pointer select-none text-[9px] mr-1 text-code-muted inline-block w-3 text-center",
			onClick: () => s((e) => !e),
			role: "button",
			tabIndex: 0,
			onKeyDown: E(() => s((e) => !e)),
			children: o ? "▶" : "▼"
		}),
		/* @__PURE__ */ H("span", {
			className: Gi("bracket"),
			children: "["
		}),
		o ? /* @__PURE__ */ U("span", {
			className: "text-code-muted italic text-[11px] ml-1",
			children: [e.length, " items"]
		}) : /* @__PURE__ */ H("div", {
			className: "pl-4",
			children: e.map((r, i) => /* @__PURE__ */ U("div", {
				className: "leading-relaxed whitespace-nowrap",
				children: [
					/* @__PURE__ */ U("span", {
						className: "text-code-muted text-[11px]",
						children: [i, ": "]
					}),
					/* @__PURE__ */ H(Ki, {
						data: r,
						depth: t + 1,
						highlightKeys: n
					}),
					i < e.length - 1 && /* @__PURE__ */ H("span", {
						className: Gi("bracket"),
						children: ","
					})
				]
			}, i))
		}),
		/* @__PURE__ */ H("span", {
			className: Gi("bracket"),
			children: "]"
		})
	] });
	if (typeof e == "object") {
		let i = Object.entries(e);
		return i.length === 0 ? /* @__PURE__ */ H("span", {
			className: Gi("bracket"),
			children: "{}"
		}) : /* @__PURE__ */ U("span", { children: [
			/* @__PURE__ */ H("span", {
				className: "cursor-pointer select-none text-[9px] mr-1 text-code-muted inline-block w-3 text-center",
				onClick: () => s((e) => !e),
				role: "button",
				tabIndex: 0,
				onKeyDown: E(() => s((e) => !e)),
				children: o ? "▶" : "▼"
			}),
			/* @__PURE__ */ H("span", {
				className: Gi("bracket"),
				children: "{"
			}),
			o ? /* @__PURE__ */ U("span", {
				className: "text-code-muted italic text-[11px] ml-1",
				children: [i.length, " keys"]
			}) : /* @__PURE__ */ H("div", {
				className: "pl-4",
				children: i.map(([e, o], s) => {
					let c = n?.has(e) || a;
					return /* @__PURE__ */ U("div", {
						className: "leading-relaxed whitespace-nowrap",
						children: [
							/* @__PURE__ */ H("span", {
								className: r("text-xs font-medium text-code-blue", c && "text-code-green font-bold bg-[rgba(166,227,161,0.1)] rounded-sm px-0.5"),
								children: e
							}),
							/* @__PURE__ */ H("span", {
								className: Gi("bracket"),
								children: ": "
							}),
							/* @__PURE__ */ H(Ki, {
								data: o,
								depth: t + 1,
								highlightKeys: t === 0 ? n : void 0,
								keyName: e,
								isHighlighted: c
							}),
							s < i.length - 1 && /* @__PURE__ */ H("span", {
								className: Gi("bracket"),
								children: ","
							})
						]
					}, e);
				})
			}),
			/* @__PURE__ */ H("span", {
				className: Gi("bracket"),
				children: "}"
			})
		] });
	}
	return /* @__PURE__ */ H("span", {
		className: Gi("string"),
		children: String(e)
	});
}
//#endregion
//#region src/components/pipelines/context-inspector/ContextStepList.tsx
function qi({ snapshots: e, activeStepId: t, fallbackActiveStepId: n, onStepSelect: i }) {
	let a = t ?? n;
	return /* @__PURE__ */ H("div", {
		className: "w-[140px] shrink-0 border-r border-border overflow-y-auto",
		children: e.map((e, t) => {
			let n = e.stepId === a;
			return /* @__PURE__ */ U("div", {
				className: r("px-2.5 py-1.5 text-[11px] font-mono cursor-pointer border-b border-border overflow-hidden text-ellipsis whitespace-nowrap", n ? "text-text-primary bg-surface-inset font-semibold" : "text-text-tertiary font-normal"),
				onClick: () => i?.(e.stepId),
				role: "button",
				tabIndex: 0,
				onKeyDown: E(() => i?.(e.stepId)),
				title: e.stepId,
				children: [
					e.newKeys.length > 0 && /* @__PURE__ */ H("span", {
						className: "text-code-green mr-1 text-[9px]",
						children: "+"
					}),
					/* @__PURE__ */ U("span", {
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
function Ji(e) {
	return typeof e == "string" ? "string" : typeof e == "number" ? "number" : typeof e == "boolean" ? "boolean" : "object";
}
function Yi({ k: e, initial: t, onCommit: n, onError: r, onFocus: i }) {
	let [a, o] = B(() => {
		try {
			return JSON.stringify(t, null, 2);
		} catch {
			return "";
		}
	});
	return /* @__PURE__ */ H("textarea", {
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
function Xi({ inputContext: e, buffer: t, parseErrors: n, newKeyDraft: i, setNewKeyDraft: a, onCommitNewKey: o, onBeginEditKey: s, onSetValue: c, onRemoveKey: l, onParseError: u }) {
	let d = R(() => {
		let n = /* @__PURE__ */ new Set([...Object.keys(e), ...Object.keys(t)]);
		return Array.from(n);
	}, [e, t]), f = "w-full px-1.5 py-1 text-xs bg-code-bg text-code-text border border-code-border rounded-sm font-mono";
	return /* @__PURE__ */ U("div", {
		"data-testid": "context-edit-table",
		children: [d.map((i) => {
			let a = i in t, o = a ? t[i] : e[i], d = Ji(o), p = a;
			return /* @__PURE__ */ U("div", {
				className: "grid grid-cols-[120px_1fr_auto] gap-2 items-start py-1.5 border-b border-code-border",
				"data-testid": `context-edit-row-${i}`,
				children: [
					/* @__PURE__ */ U("span", {
						className: r("text-xs font-medium text-code-blue pt-1 overflow-hidden text-ellipsis whitespace-nowrap", p && "text-code-green font-bold"),
						title: i,
						children: [i, p && /* @__PURE__ */ H("span", {
							className: "ml-1 text-[9px]",
							children: "●"
						})]
					}),
					/* @__PURE__ */ U("div", {
						className: "min-w-0",
						children: [d === "boolean" ? /* @__PURE__ */ U("select", {
							"data-testid": `context-edit-input-${i}`,
							value: String(o),
							onChange: (e) => c(i, e.target.value === "true"),
							onFocus: () => s(i, o),
							className: f,
							children: [/* @__PURE__ */ H("option", {
								value: "true",
								children: "true"
							}), /* @__PURE__ */ H("option", {
								value: "false",
								children: "false"
							})]
						}) : d === "number" ? /* @__PURE__ */ H("input", {
							"data-testid": `context-edit-input-${i}`,
							type: "number",
							value: String(o),
							onChange: (e) => {
								let t = e.target.value === "" ? 0 : Number(e.target.value);
								c(i, Number.isNaN(t) ? 0 : t);
							},
							onFocus: () => s(i, o),
							className: f
						}) : d === "string" ? /* @__PURE__ */ H("input", {
							"data-testid": `context-edit-input-${i}`,
							type: "text",
							value: o ?? "",
							onChange: (e) => c(i, e.target.value),
							onFocus: () => s(i, o),
							className: f
						}) : /* @__PURE__ */ H(Yi, {
							k: i,
							initial: o,
							onCommit: (e) => c(i, e),
							onError: (e) => u(i, e),
							onFocus: () => s(i, o)
						}), n[i] && /* @__PURE__ */ H("div", {
							"data-testid": `context-edit-parse-error-${i}`,
							className: "text-code-red text-[11px] mt-1",
							children: n[i]
						})]
					}),
					/* @__PURE__ */ H("div", {
						className: "flex gap-1",
						children: p && /* @__PURE__ */ H("button", {
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
		}), /* @__PURE__ */ U("div", {
			className: "grid grid-cols-[120px_1fr_auto] gap-2 items-start py-1.5 mt-2",
			"data-testid": "context-edit-add-row",
			children: [
				/* @__PURE__ */ H("input", {
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
				/* @__PURE__ */ H("input", {
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
				/* @__PURE__ */ H("button", {
					type: "button",
					"data-testid": "context-edit-add-btn",
					onClick: o,
					disabled: !i.key.trim(),
					className: r("px-2.5 py-0.5 text-[11px] font-semibold border rounded-sm cursor-pointer font-mono", i.key.trim() ? "bg-code-green text-code-surface border-code-green" : "bg-transparent text-code-raised border-code-border cursor-not-allowed"),
					children: "+ Add field"
				})
			]
		})]
	});
}
//#endregion
//#region src/components/pipelines/context-inspector/useContextSnapshots.ts
function Zi(e, t, n) {
	let r = { ...e }, i = { ...r.steps ?? {} };
	return i[t] = n, r.steps = i, n && typeof n == "object" && !Array.isArray(n) && Object.assign(r, n), r;
}
function Qi(e, t) {
	let n = [];
	for (let r of Object.keys(t)) r in e || n.push(r);
	return n;
}
function $i(e) {
	let t = Object.values(e.steps).filter((e) => e != null).sort((e, t) => (e.startedAt ? Date.parse(e.startedAt) : 0) - (t.startedAt ? Date.parse(t.startedAt) : 0)), n = [], r = {};
	e.triggeredBy?.payload && typeof e.triggeredBy.payload == "object" && (r = { ...e.triggeredBy.payload });
	for (let e of t) {
		let t = { ...r }, i = e.output, a = e.llm?.prompt, o;
		if (i !== void 0) o = Zi(r, e.nodeId, i);
		else {
			o = { ...r };
			let t = { ...o.steps ?? {} };
			t[e.nodeId] = i, o.steps = t;
		}
		let s = Qi(t, o);
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
function ea(e, t) {
	let [n, r] = B(/* @__PURE__ */ new Map()), [i, a] = B(/* @__PURE__ */ new Map()), o = z(null);
	L(() => {
		let t = e?.id ?? null;
		t !== o.current && (o.current = t, r(/* @__PURE__ */ new Map()), a(/* @__PURE__ */ new Map()));
	}, [e?.id]);
	let s = I((t) => {
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
	k("*", s);
	let c = R(() => e ? $i(e) : [], [e]), l = R(() => c.map((e) => {
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
	]), u = R(() => t ? l.find((e) => e.stepId === t) ?? null : l[l.length - 1] ?? null, [l, t]);
	return {
		enrichedSnapshots: l,
		activeSnapshot: u,
		newKeysSet: R(() => u ? new Set(u.newKeys) : /* @__PURE__ */ new Set(), [u])
	};
}
//#endregion
//#region src/components/pipelines/ContextInspector.tsx
function ta({ attempt: e, label: t }) {
	let n = !e.error;
	return /* @__PURE__ */ U("div", {
		className: "bg-code-bg rounded-md border border-code-border p-2.5 overflow-auto",
		children: [
			/* @__PURE__ */ H("div", {
				className: "text-[11px] font-bold text-code-text mb-2",
				children: t
			}),
			/* @__PURE__ */ U("div", {
				className: "flex gap-1.5 mb-1.5 items-center",
				children: [/* @__PURE__ */ H("span", {
					className: r("text-[10px] font-semibold px-1.5 py-px rounded-sm", n ? "bg-[rgba(166,227,161,0.15)] text-code-green" : "bg-[rgba(243,139,168,0.15)] text-code-red"),
					children: n ? "OK" : "FAIL"
				}), e.durationMs != null && /* @__PURE__ */ U("span", {
					className: "text-[10px] text-code-muted",
					children: [e.durationMs, "ms"]
				})]
			}),
			e.error && /* @__PURE__ */ H("div", {
				className: "text-[11px] text-code-red font-mono mb-1.5 px-2 py-1.5 bg-code-red/10 rounded whitespace-pre-wrap break-words",
				children: e.error
			}),
			e.output !== void 0 && /* @__PURE__ */ U("div", { children: [/* @__PURE__ */ H("div", {
				className: "text-[10px] text-code-muted font-semibold mb-1 uppercase",
				children: "Output"
			}), /* @__PURE__ */ H(Ki, {
				data: e.output,
				depth: 0
			})] })
		]
	});
}
function na({ run: e, activeStepId: t, onStepSelect: n, editable: i = !1, onEditBufferChange: a, resetEditBufferKey: o }) {
	let [s, c] = B("input"), [l, u] = B(0), [d, f] = B(!1), [p, m] = B({}), [h, g] = B(null), [_, v] = B({}), [y, b] = B({
		key: "",
		value: ""
	}), { enrichedSnapshots: x, activeSnapshot: S, newKeysSet: C } = ea(e, t), w = S?.resolvedPrompt != null, T = S?.stepExecution.attempts, E = (T?.length ?? 0) >= 2;
	L(() => {
		s === "prompt" && !w && c("input"), s === "attempts" && !E && c("input");
	}, [
		s,
		w,
		E
	]), L(() => {
		u(0);
	}, [t]);
	let D = !!(e && e.status === "paused_at_breakpoint" && t && (e.currentStepIds?.includes(t) || S?.stepExecution.status === "running" || S?.stepExecution.status === "awaiting" || S?.stepExecution.status === "pending")), O = !!i && !!D;
	L(() => {
		O ? h && h !== t && (m({}), g(null), v({})) : (d && f(!1), Object.keys(p).length > 0 && m({}), h && g(null), Object.keys(_).length > 0 && v({}));
	}, [O, t]), L(() => {
		o !== void 0 && (m({}), g(null), v({}), b({
			key: "",
			value: ""
		}));
	}, [o]), L(() => {
		!O || !t || a && (Object.keys(p).length === 0 ? a(t, null) : a(t, p));
	}, [
		p,
		O,
		t
	]);
	let k = I((e, n) => {
		g(t), m((t) => e in t ? t : {
			...t,
			[e]: n
		});
	}, [t]), A = I((e, n) => {
		g(t), m((t) => ({
			...t,
			[e]: n
		})), v((t) => {
			if (!(e in t)) return t;
			let n = { ...t };
			return delete n[e], n;
		});
	}, [t]), ee = I((e) => {
		m((t) => {
			if (!(e in t)) return t;
			let n = { ...t };
			return delete n[e], n;
		}), v((t) => {
			if (!(e in t)) return t;
			let n = { ...t };
			return delete n[e], n;
		});
	}, []), j = I((e, t) => {
		v((n) => ({
			...n,
			[e]: t
		}));
	}, []), te = I(() => {
		m({}), g(null), v({}), b({
			key: "",
			value: ""
		});
	}, []), ne = I(() => {
		let e = y.key.trim();
		if (!e) return;
		let t = y.value, n = y.value;
		if (n.trim().length > 0) try {
			t = JSON.parse(n);
		} catch {
			t = n;
		}
		A(e, t), b({
			key: "",
			value: ""
		});
	}, [y, A]);
	return !e || x.length === 0 ? /* @__PURE__ */ U("div", {
		className: "flex flex-col overflow-hidden h-full",
		"data-testid": "context-inspector",
		children: [/* @__PURE__ */ H("div", {
			className: "flex items-center justify-between px-3.5 py-2 border-b border-border shrink-0",
			children: /* @__PURE__ */ H("span", {
				className: "text-xs font-bold text-text-primary tracking-wide uppercase",
				children: "Context Inspector"
			})
		}), /* @__PURE__ */ U("div", {
			className: "flex-1 overflow-auto px-3.5 py-2.5 font-mono text-xs flex items-center justify-center flex-col gap-2",
			children: [/* @__PURE__ */ H("span", {
				className: "text-[13px] text-code-muted",
				children: e ? "Waiting for step execution data..." : "Run a pipeline to inspect context flow"
			}), /* @__PURE__ */ H("span", {
				className: "text-[11px] text-code-raised",
				children: e ? "Context data will appear as steps complete." : "Trigger a run to see inputs, outputs, and context at each step."
			})]
		})]
	}) : /* @__PURE__ */ U("div", {
		className: "flex flex-col overflow-hidden h-full",
		"data-testid": "context-inspector",
		children: [
			/* @__PURE__ */ U("div", {
				className: "flex items-center justify-between px-3.5 py-2 border-b border-border shrink-0",
				children: [/* @__PURE__ */ H("span", {
					className: "text-xs font-bold text-text-primary tracking-wide uppercase",
					children: "Context Inspector"
				}), S && S.stepId && /* @__PURE__ */ U("span", {
					className: "text-[10px] text-code-muted",
					children: ["Step: ", S.stepId.slice(0, 8)]
				})]
			}),
			/* @__PURE__ */ H("div", {
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
						show: w
					},
					{
						id: "details",
						label: "Details",
						show: !0
					},
					{
						id: "attempts",
						label: `Attempts (${T?.length})`,
						show: E
					}
				].filter((e) => e.show).map((e) => /* @__PURE__ */ H("button", {
					type: "button",
					"data-testid": e.id === "attempts" ? "attempts-tab" : void 0,
					className: r("px-3.5 py-1.5 text-[11px] font-semibold bg-transparent border-none cursor-pointer font-inherit uppercase tracking-wide border-b-2", s === e.id ? "text-primary border-b-primary" : "text-text-tertiary border-b-transparent"),
					onClick: () => c(e.id),
					children: e.label
				}, e.id))
			}),
			/* @__PURE__ */ U("div", {
				className: "flex flex-1 min-h-0 overflow-hidden",
				children: [/* @__PURE__ */ H(qi, {
					snapshots: x,
					activeStepId: t,
					fallbackActiveStepId: S?.stepId,
					onStepSelect: n
				}), /* @__PURE__ */ H("div", {
					className: "flex-1 overflow-auto px-3.5 py-2.5 font-mono text-xs",
					children: S ? s === "input" ? /* @__PURE__ */ U("div", { children: [/* @__PURE__ */ U("div", {
						className: "flex items-center justify-between mb-2",
						children: [/* @__PURE__ */ U("div", {
							className: "text-[10px] text-code-muted font-semibold uppercase",
							children: ["Input context", S.stepId ? ` — step ${S.stepId.slice(0, 8)}` : ""]
						}), O && /* @__PURE__ */ U("div", {
							className: "flex gap-1.5 items-center",
							children: [d && Object.keys(p).length > 0 && /* @__PURE__ */ H("button", {
								type: "button",
								onClick: te,
								"data-testid": "context-inspector-discard",
								className: "px-2 py-0.5 text-[10px] font-semibold bg-transparent text-code-red border border-code-border rounded-sm cursor-pointer font-mono",
								children: "Discard changes"
							}), /* @__PURE__ */ H("button", {
								type: "button",
								onClick: () => {
									let e = !d;
									f(e), e || te();
								},
								"data-testid": "context-inspector-edit-toggle",
								className: r("px-2 py-0.5 text-[10px] font-semibold border rounded-sm cursor-pointer font-mono uppercase tracking-wide", d ? "bg-warning text-white border-warning" : "bg-transparent text-warning-fg border-warning"),
								children: d ? "Editing" : "Edit"
							})]
						})]
					}), Object.keys(S.inputContext).length === 0 && !(O && d) ? /* @__PURE__ */ H("div", {
						className: "text-code-muted text-xs italic",
						children: "No input context (first step or no upstream output)"
					}) : O && d ? /* @__PURE__ */ H(Xi, {
						inputContext: S.inputContext,
						buffer: p,
						parseErrors: _,
						newKeyDraft: y,
						setNewKeyDraft: b,
						onCommitNewKey: ne,
						onBeginEditKey: k,
						onSetValue: A,
						onRemoveKey: ee,
						onParseError: j
					}) : /* @__PURE__ */ H(Ki, {
						data: S.inputContext,
						highlightKeys: C
					})] }) : s === "output" ? /* @__PURE__ */ U("div", { children: [
						/* @__PURE__ */ U("div", {
							className: "mb-2 text-[10px] text-code-muted font-semibold uppercase",
							children: ["Output", S.stepId ? ` — step ${S.stepId.slice(0, 8)}` : ""]
						}),
						/* @__PURE__ */ H(Ki, { data: S.output }),
						S.newKeys.length > 0 && /* @__PURE__ */ U("div", {
							className: "mt-3",
							children: [/* @__PURE__ */ H("div", {
								className: "text-[10px] text-code-green font-semibold uppercase mb-1",
								children: "New context keys added"
							}), /* @__PURE__ */ H("div", {
								className: "flex flex-wrap gap-1",
								children: S.newKeys.map((e) => /* @__PURE__ */ H("span", {
									className: "px-1.5 py-0.5 bg-[rgba(166,227,161,0.15)] text-code-green rounded-sm text-[11px] font-semibold font-mono",
									children: e
								}, e))
							})]
						})
					] }) : s === "prompt" ? /* @__PURE__ */ U("div", { children: [/* @__PURE__ */ H("div", {
						className: "mb-2 text-[10px] text-code-muted font-semibold uppercase",
						children: "Resolved prompt template"
					}), /* @__PURE__ */ H("div", {
						className: "px-3 py-2.5 bg-surface-inset border border-border rounded-md text-xs text-text-primary whitespace-pre-wrap break-words leading-relaxed max-h-60 overflow-y-auto",
						children: S.resolvedPrompt
					})] }) : s === "details" ? /* @__PURE__ */ U("div", { children: [/* @__PURE__ */ H("div", {
						className: "mb-2 text-[10px] text-code-muted font-semibold uppercase",
						children: "Step execution details"
					}), /* @__PURE__ */ U("div", {
						className: "flex flex-col gap-3",
						children: [
							S.stepExecution.startedAt && /* @__PURE__ */ U("div", { children: [/* @__PURE__ */ H("div", {
								className: "text-[11px] text-code-blue font-semibold mb-1",
								children: "Duration"
							}), /* @__PURE__ */ U("div", {
								className: "text-[11px] text-code-text",
								children: [
									"Started: ",
									S.stepExecution.startedAt,
									S.stepExecution.completedAt && /* @__PURE__ */ U(V, { children: [
										/* @__PURE__ */ H("br", {}),
										"Completed: ",
										S.stepExecution.completedAt,
										S.stepExecution.durationMs != null && /* @__PURE__ */ U(V, { children: [
											/* @__PURE__ */ H("br", {}),
											"Duration: ",
											S.stepExecution.durationMs,
											"ms"
										] })
									] })
								]
							})] }),
							S.stepExecution.llm && /* @__PURE__ */ U("div", { children: [
								/* @__PURE__ */ H("div", {
									className: "text-[11px] text-code-blue font-semibold mb-1",
									children: "LLM Metrics"
								}),
								/* @__PURE__ */ U("div", {
									className: "text-[11px] text-code-text",
									children: [
										"Tokens in: ",
										S.stepExecution.llm.tokensIn,
										/* @__PURE__ */ H("br", {}),
										"Tokens out: ",
										S.stepExecution.llm.tokensOut,
										S.stepExecution.llm.firstTokenLatencyMs != null && /* @__PURE__ */ U(V, { children: [
											/* @__PURE__ */ H("br", {}),
											"First token latency: ",
											S.stepExecution.llm.firstTokenLatencyMs,
											"ms"
										] })
									]
								}),
								S.stepExecution.llm.response && /* @__PURE__ */ U(V, { children: [/* @__PURE__ */ H("div", {
									className: "text-[11px] text-code-blue font-semibold mt-2 mb-1",
									children: "Response Text"
								}), /* @__PURE__ */ H("div", {
									className: "px-3 py-2.5 bg-surface-inset border border-border rounded-md text-xs text-text-primary whitespace-pre-wrap break-words leading-relaxed max-h-60 overflow-y-auto",
									children: S.stepExecution.llm.response
								})] })
							] }),
							S.stepExecution.error && /* @__PURE__ */ U("div", { children: [/* @__PURE__ */ H("div", {
								className: "text-[11px] text-code-red font-semibold mb-1",
								children: "Error"
							}), /* @__PURE__ */ H("div", {
								className: "px-3 py-2.5 bg-code-red/10 border border-code-red rounded-md text-xs text-text-primary whitespace-pre-wrap break-words leading-relaxed max-h-60 overflow-y-auto",
								children: /* @__PURE__ */ H("div", {
									className: "text-code-red font-semibold mb-1",
									children: S.stepExecution.error
								})
							})] }),
							S.stepExecution.approvals && S.stepExecution.approvals.length > 0 && /* @__PURE__ */ U("div", { children: [/* @__PURE__ */ U("div", {
								className: "text-[11px] text-code-blue font-semibold mb-1",
								children: [
									"Approvals (",
									S.stepExecution.approvals.length,
									")"
								]
							}), S.stepExecution.approvals.map((e, t) => /* @__PURE__ */ U("div", {
								className: "px-3 py-2.5 bg-surface-inset border border-border rounded-md text-xs text-text-primary whitespace-pre-wrap break-words leading-relaxed max-h-60 overflow-y-auto mb-2",
								children: [
									/* @__PURE__ */ U("div", {
										className: "flex gap-2 mb-1",
										children: [/* @__PURE__ */ H("span", {
											className: r("px-1.5 py-0.5 rounded-sm text-[10px] font-semibold", e.decision === "approve" ? "bg-[rgba(166,227,161,0.15)] text-code-green" : "bg-[rgba(243,139,168,0.15)] text-code-red"),
											children: e.decision.toUpperCase()
										}), /* @__PURE__ */ H("span", {
											className: "text-[11px] text-code-text",
											children: e.userId
										})]
									}),
									e.comment && /* @__PURE__ */ U("div", {
										className: "text-[11px] text-code-comment italic",
										children: [
											"\"",
											e.comment,
											"\""
										]
									}),
									/* @__PURE__ */ H("div", {
										className: "text-[10px] text-code-muted mt-1",
										children: e.at
									})
								]
							}, t))] }),
							/* @__PURE__ */ U("div", { children: [/* @__PURE__ */ H("div", {
								className: "text-[11px] text-code-blue font-semibold mb-1",
								children: "Status"
							}), /* @__PURE__ */ H("div", {
								className: "text-[11px] text-code-text",
								children: S.stepExecution.status
							})] })
						]
					})] }) : s === "attempts" && T && T.length >= 2 ? /* @__PURE__ */ U("div", { children: [/* @__PURE__ */ U("div", {
						className: "flex items-center gap-2 mb-3",
						children: [
							/* @__PURE__ */ H("button", {
								type: "button",
								"data-testid": "attempts-prev",
								disabled: l === 0,
								onClick: () => u((e) => e - 1),
								className: r("px-2 py-0.5 text-[11px] bg-transparent border border-code-border rounded-sm font-mono", l === 0 ? "text-code-raised cursor-not-allowed" : "text-code-text cursor-pointer"),
								children: "←"
							}),
							/* @__PURE__ */ U("span", {
								"data-testid": "attempts-label",
								className: "text-[11px] text-code-comment flex-1 text-center",
								children: [
									"Attempt ",
									l + 1,
									" vs ",
									l + 2,
									" of ",
									T.length
								]
							}),
							/* @__PURE__ */ H("button", {
								type: "button",
								"data-testid": "attempts-next",
								disabled: l >= T.length - 2,
								onClick: () => u((e) => e + 1),
								className: r("px-2 py-0.5 text-[11px] bg-transparent border border-code-border rounded-sm font-mono", l >= T.length - 2 ? "text-code-raised cursor-not-allowed" : "text-code-text cursor-pointer"),
								children: "→"
							})
						]
					}), /* @__PURE__ */ U("div", {
						className: "grid grid-cols-2 gap-2.5",
						children: [/* @__PURE__ */ H(ta, {
							attempt: T[l],
							label: `Attempt ${l + 1}`
						}), /* @__PURE__ */ H(ta, {
							attempt: T[l + 1],
							label: `Attempt ${l + 2}`
						})]
					})] }) : null : /* @__PURE__ */ H("div", {
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
function ra({ definition: e, pausedBreakpoint: t, applyingPatch: n, revertingPatchId: i, dirtyPatch: a, dirtyPatchStepId: o, resetEditBufferKey: s, onContinue: c, onStepOver: l, onResumeAll: u, onApplyAndContinue: d, onRevertPatch: f, onEditBufferChange: p }) {
	let m = _e().runs[t.runId] ?? null, h = m?.steps?.[t.stepId]?.patches ?? [], g = !!a && o === t.stepId && Object.keys(a).length > 0, _ = m?.status === "paused_at_breakpoint";
	return /* @__PURE__ */ U("div", {
		"data-testid": "breakpoint-pause-overlay",
		className: r("absolute top-14 left-1/2 -translate-x-1/2 z-30", "bg-surface border-2 border-warning rounded-lg", "px-4 py-3 shadow-[0_8px_24px_rgba(217,119,6,0.2)]", "flex flex-col gap-3 font-inherit", "w-[min(900px,92vw)] max-h-[calc(100vh-120px)]"),
		children: [/* @__PURE__ */ U("div", {
			className: "flex items-center gap-3 flex-wrap",
			children: [
				/* @__PURE__ */ U("span", {
					className: "text-[13px] font-semibold text-warning-fg",
					children: ["Paused at: ", zi(e, t.stepId)]
				}),
				g && /* @__PURE__ */ H("button", {
					type: "button",
					onClick: d,
					disabled: n,
					"data-testid": "breakpoint-apply-continue-btn",
					className: r("px-3 py-1 text-xs font-semibold bg-success-bg text-text-primary", "border-none rounded cursor-pointer font-inherit", n && "cursor-wait opacity-70"),
					children: n ? "Applying…" : "Apply & Continue"
				}),
				/* @__PURE__ */ H("button", {
					type: "button",
					onClick: c,
					disabled: n,
					className: r("px-3 py-1 text-xs font-semibold bg-warning text-white", "border-none rounded font-inherit", n ? "cursor-not-allowed opacity-60" : "cursor-pointer"),
					"data-testid": "breakpoint-continue-btn",
					children: "Continue"
				}),
				/* @__PURE__ */ H("button", {
					type: "button",
					onClick: l,
					disabled: n,
					className: r("px-3 py-1 text-xs font-semibold bg-transparent text-warning-fg", "border border-warning rounded font-inherit", n ? "cursor-not-allowed opacity-60" : "cursor-pointer"),
					"data-testid": "breakpoint-step-over-btn",
					children: "Step Over"
				}),
				/* @__PURE__ */ H("button", {
					type: "button",
					onClick: u,
					disabled: n,
					className: r("px-3 py-1 text-xs font-semibold bg-transparent text-warning-fg", "border border-warning rounded font-inherit", n ? "cursor-not-allowed opacity-60" : "cursor-pointer"),
					"data-testid": "breakpoint-resume-all-btn",
					children: "Resume All"
				})
			]
		}), /* @__PURE__ */ U("div", {
			className: "grid [grid-template-columns:minmax(0,1fr)_240px] gap-3 min-h-[280px] max-h-[calc(100vh-220px)]",
			children: [/* @__PURE__ */ H("div", {
				className: "border border-border rounded-md bg-surface-inset overflow-hidden min-h-0",
				children: m ? /* @__PURE__ */ H(na, {
					run: m,
					activeStepId: t.stepId,
					editable: !0,
					onEditBufferChange: p,
					resetEditBufferKey: s
				}) : /* @__PURE__ */ H("div", {
					className: "p-3 text-xs text-text-tertiary",
					children: "Loading run…"
				})
			}), /* @__PURE__ */ U("div", {
				"data-testid": "breakpoint-patch-history",
				className: "border border-border rounded-md bg-surface-inset p-2.5 overflow-auto min-h-0",
				children: [/* @__PURE__ */ U("div", {
					className: "text-[10px] font-bold text-text-primary tracking-wide uppercase mb-2",
					children: [
						"Patch history (",
						h.length,
						")"
					]
				}), h.length === 0 ? /* @__PURE__ */ H("div", {
					className: "text-[11px] text-text-tertiary italic",
					"data-testid": "breakpoint-patch-history-empty",
					children: "No patches applied yet."
				}) : /* @__PURE__ */ H("div", {
					className: "flex flex-col gap-2",
					children: h.map((e) => {
						let t = !!e.revertedAt;
						return /* @__PURE__ */ U("div", {
							"data-testid": `breakpoint-patch-row-${e.patchId}`,
							className: r("border border-border rounded p-1.5", t ? "bg-neutral/10 opacity-60" : "bg-code-bg"),
							children: [
								/* @__PURE__ */ U("div", {
									className: "flex items-center gap-1 text-[10px] text-code-text mb-0.5",
									children: [
										/* @__PURE__ */ H("span", {
											className: "font-mono",
											children: e.patchId.slice(0, 8)
										}),
										e.unvalidated && /* @__PURE__ */ H("span", {
											"data-testid": `breakpoint-patch-unvalidated-${e.patchId}`,
											title: "No validator was registered for this step's node type",
											className: "px-1 text-[9px] font-bold bg-caution-bg/15 text-caution-fg rounded-sm",
											children: "⚠ Unvalidated"
										}),
										t && /* @__PURE__ */ H("span", {
											className: "px-1 text-[9px] font-bold bg-neutral/20 text-text-tertiary rounded-sm",
											children: "Reverted"
										})
									]
								}),
								/* @__PURE__ */ U("div", {
									className: "text-[10px] text-code-comment",
									children: [e.appliedAt, e.appliedBy && /* @__PURE__ */ U(V, { children: [" · ", /* @__PURE__ */ H("span", {
										className: "text-code-text",
										children: e.appliedBy
									})] })]
								}),
								!t && /* @__PURE__ */ H("button", {
									type: "button",
									"data-testid": `breakpoint-patch-revert-${e.patchId}`,
									onClick: () => f(e.patchId),
									disabled: !_ || i === e.patchId,
									title: _ ? "Revert this patch" : "Run has progressed past this breakpoint — revert no longer allowed",
									className: r("mt-1 px-2 py-0.5 text-[10px] font-semibold bg-transparent rounded-sm font-inherit", _ ? "text-danger-fg border border-danger cursor-pointer" : "text-text-primary border border-border-emphasis cursor-not-allowed", i === e.patchId && "cursor-not-allowed"),
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
function ia(e) {
	return e == null ? "--" : e < 1e3 ? `${Math.round(e)}ms` : e < 6e4 ? `${(e / 1e3).toFixed(1)}s` : `${Math.floor(e / 6e4)}m ${Math.floor(e % 6e4 / 1e3)}s`;
}
function aa(e) {
	if (!e) return "--";
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? "--" : new Intl.DateTimeFormat(void 0, {
		month: "short",
		day: "numeric",
		hour: "numeric",
		minute: "2-digit"
	}).format(t);
}
function oa(e) {
	let t = Date.now() - new Date(e).getTime();
	return t < 6e4 ? "just now" : t < 36e5 ? `${Math.floor(t / 6e4)}m ago` : t < 864e5 ? `${Math.floor(t / 36e5)}h ago` : t < 2592e5 ? `${Math.floor(t / 864e5)}d ago` : new Date(e).toLocaleDateString();
}
//#endregion
//#region src/components/pipelines/nodes/shared/ConfigField.tsx
function Y({ label: e, required: t, help: n, error: i, controlId: a, render: o, children: s, className: c }) {
	let l = tt(), u = `${l}-label`, d = i || n ? `${l}-desc` : void 0;
	return /* @__PURE__ */ U("div", {
		className: r("flex flex-col", c),
		children: [
			/* @__PURE__ */ U("label", {
				id: u,
				htmlFor: a,
				className: "text-xs font-semibold text-text-secondary",
				children: [e, t && /* @__PURE__ */ H("span", {
					className: "text-danger-fg ml-1",
					"aria-hidden": "true",
					children: "●"
				})]
			}),
			/* @__PURE__ */ H("div", {
				className: "mt-1",
				children: o ? o({
					describedById: d,
					controlId: a,
					labelId: u
				}) : s
			}),
			i && /* @__PURE__ */ H("div", {
				id: d,
				role: "alert",
				className: "text-[11px] text-danger-fg mt-0.5",
				children: i
			}),
			!i && n && /* @__PURE__ */ H("div", {
				id: d,
				className: "text-[11px] text-text-tertiary mt-0.5",
				children: n
			})
		]
	});
}
//#endregion
//#region src/components/pipelines/nodes/shared/ConfigSection.tsx
function sa({ title: e, defaultCollapsed: t = !1, children: n, className: i }) {
	let [a, o] = B(t);
	return /* @__PURE__ */ U("div", {
		className: r("flex flex-col", i),
		children: [/* @__PURE__ */ U("button", {
			type: "button",
			onClick: () => o((e) => !e),
			className: "flex items-center gap-1 bg-transparent border-none p-0 cursor-pointer font-inherit text-xs font-semibold text-text-secondary",
			children: [
				/* @__PURE__ */ H("span", { children: a ? "▸" : "▾" }),
				" ",
				e
			]
		}), !a && /* @__PURE__ */ H("div", {
			className: "flex flex-col gap-3 mt-2",
			children: n
		})]
	});
}
//#endregion
//#region src/components/pipelines/nodes/shared/NodeConfigShell.tsx
function X({ children: e, className: t }) {
	return /* @__PURE__ */ H("div", {
		className: r("flex flex-col gap-3 px-4 py-3", t),
		children: e
	});
}
//#endregion
//#region src/components/pipelines/nodes/shared/SamplePills.tsx
function ca({ samples: e, onSelect: t, "aria-label": n = "Suggestions", className: i }) {
	return e.length === 0 ? null : /* @__PURE__ */ H("div", {
		className: r("mt-1.5 flex flex-wrap gap-1", i),
		role: "group",
		"aria-label": n,
		"data-testid": "sample-pills",
		children: e.map((e) => /* @__PURE__ */ H("button", {
			type: "button",
			onClick: () => t(e),
			className: "text-[10px] font-mono bg-surface-inset border border-border text-text-secondary rounded px-1.5 py-0.5 cursor-pointer hover:bg-surface-hover",
			children: e
		}, e))
	});
}
//#endregion
//#region src/components/pipelines/context/upstreamContext.ts
function la(e) {
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
function ua(e, t) {
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
function da(e, t, n) {
	let r = new Map(e.map((e) => [e.id, e])), i = [], a = /* @__PURE__ */ new Set(), o = (e) => {
		a.has(e.path) || (a.add(e.path), i.push(e));
	};
	for (let e of ua(t, n)) {
		let t = r.get(e);
		t && la(t).forEach(o);
	}
	if (!a.has("context.trigger")) {
		let t = e.find((e) => e.type === "trigger");
		t && la(t).forEach(o);
	}
	return i;
}
function fa(e, t) {
	let n = new Set(t.map((e) => e.path)), r = /* @__PURE__ */ new Set();
	for (let t of e.matchAll(/\{\{\s*([\w.[\]-]+)\s*\}\}/g)) r.add(t[1]);
	return [...r].filter((e) => !n.has(e) && ![...n].some((t) => e.startsWith(`${t}.`)));
}
var pa = /* @__PURE__ */ new Set([
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
function ma(e, t, n) {
	let r = new Map(e.map((e) => [e.id, e])), i = [], a = /* @__PURE__ */ new Set(), o = (e) => {
		a.has(e.path) || (a.add(e.path), i.push(e));
	};
	for (let e of ua(t, n)) {
		let t = r.get(e);
		if (!t || !pa.has(t.type)) continue;
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
	for (let e of ua(t, n)) if (r.get(e)?.type === "scatter") {
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
function ha(e) {
	let t = et(N)?.definition ?? null, n = t?.nodes ?? [], r = t?.edges ?? [], i = R(() => e ? da(n, r, e) : [], [
		n,
		r,
		e
	]);
	return R(() => ({
		paths: i,
		unresolved: (e) => fa(e, i)
	}), [i]);
}
function ga(e) {
	let t = et(N)?.definition ?? null, n = t?.nodes ?? [], r = t?.edges ?? [];
	return R(() => e ? ma(n, r, e) : [], [
		n,
		r,
		e
	]);
}
//#endregion
//#region src/components/pipelines/nodes/shared/SourceImagePathField.tsx
function _a({ value: e, onChange: t, nodeId: n, label: r = "Source image path", help: i = "Optional. Defaults to the image produced upstream.", placeholder: a = "$.trigger.imageRef" }) {
	let o = ga(n ?? null), s = tt();
	return /* @__PURE__ */ H(Y, {
		label: r,
		help: i,
		controlId: s,
		render: ({ describedById: n, controlId: r }) => /* @__PURE__ */ U(V, { children: [/* @__PURE__ */ H(D, {
			id: r,
			"aria-describedby": n,
			size: "sm",
			mono: !0,
			spellCheck: !1,
			value: e ?? "",
			onChange: (e) => t(e.target.value.trim() || void 0),
			placeholder: a
		}), /* @__PURE__ */ H(ca, {
			samples: o.map((e) => e.path),
			onSelect: t,
			"aria-label": "Upstream image refs"
		})] })
	});
}
//#endregion
//#region src/components/pipelines/nodes/shared/ToggleField.tsx
function va({ label: e, checked: t, onChange: n, help: r, disabled: i, "data-testid": a }) {
	return /* @__PURE__ */ U("div", {
		className: "flex flex-col",
		children: [/* @__PURE__ */ U("div", {
			className: "flex items-center gap-2",
			children: [/* @__PURE__ */ H(h, {
				size: "sm",
				checked: t,
				onChange: n,
				disabled: i,
				"aria-label": e,
				"data-testid": a
			}), /* @__PURE__ */ H("span", {
				className: "text-xs font-semibold text-text-secondary",
				children: e
			})]
		}), r && /* @__PURE__ */ H("div", {
			className: "text-[11px] text-text-tertiary mt-0.5",
			children: r
		})]
	});
}
//#endregion
//#region src/components/pipelines/cron/cronUtils.ts
var ya = [
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
function ba(e, t, n) {
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
function xa(e) {
	if (typeof e != "string") return null;
	let t = e.trim().split(/\s+/);
	if (t.length !== 5) return null;
	let n = {};
	for (let e = 0; e < 5; e++) {
		let r = ya[e], i = ba(t[e], r.min, r.max);
		if (!i) return null;
		n[r.name] = i;
	}
	return n;
}
function Sa(e, t, n) {
	return e.match === "*" ? !e.step || e.step === 1 || (t - n) % e.step === 0 : e.match.includes(t);
}
function Ca(e, t) {
	return Sa(e.minute, t.getMinutes(), 0) && Sa(e.hour, t.getHours(), 0) && Sa(e.dayOfMonth, t.getDate(), 1) && Sa(e.month, t.getMonth() + 1, 1) && Sa(e.dayOfWeek, t.getDay(), 0);
}
function wa(e, t, n) {
	if (n <= 0) return [];
	let r = [], i = new Date(t.getTime());
	i.setSeconds(0, 0), i.setMinutes(i.getMinutes() + 1);
	let a = new Date(i.getTime());
	for (let t = 0; t < 527040 && r.length < n; t++) Ca(e, a) && r.push(new Date(a.getTime())), a.setMinutes(a.getMinutes() + 1);
	return r;
}
//#endregion
//#region src/components/pipelines/nodes/trigger/TriggerConfig.tsx
var Ta = /^[a-zA-Z0-9_-]{1,64}$/, Ea = "http://localhost:13001";
function Da() {
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
var Oa = [
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
function ka({ data: e, onChange: t }) {
	let r = tt(), { toast: i } = n(), a = et(N)?.definition?.triggerBinding?.webhookSecret, [o, s] = B(!1), c = e.triggerType.startsWith("document."), l = R(() => c ? Da() : [], [c]), u = c && !e.documentTypeId, d = e.triggerType === "schedule" && !e.schedule, f = e.triggerType === "webhook" && !e.webhookPath, p = e.webhookPath ?? "", m = e.triggerType === "webhook" && p.length > 0 && !Ta.test(p), h = e.triggerType === "webhook" && Ta.test(p) ? `${Ea}/hooks/pipeline/${p}` : null, g = () => {
		h && navigator.clipboard.writeText(h).then(() => i("Webhook URL copied", { type: "success" })).catch(() => i("Could not copy webhook URL", { type: "error" }));
	}, _ = () => {
		a && navigator.clipboard.writeText(a).then(() => i("Webhook secret copied", { type: "success" })).catch(() => i("Could not copy webhook secret", { type: "error" }));
	}, v = e.triggerType === "schedule" ? e.schedule ?? "" : "", y = R(() => v ? xa(v) : null, [v]), b = R(() => y ? wa(y, /* @__PURE__ */ new Date(), 3) : [], [y]), x = e.triggerType === "schedule" && !!v && !y, S = e.triggerType === "document.finalize" ? "On finalize" : e.triggerType === "document.submit" ? "On submit for review" : e.triggerType === "document.comment" ? "On comment added" : "";
	return /* @__PURE__ */ U(X, { children: [
		/* @__PURE__ */ H(Y, {
			label: "Trigger type",
			required: !0,
			controlId: `${r}-trigger-type`,
			render: ({ controlId: n, describedById: r }) => /* @__PURE__ */ H(Ye, {
				size: "sm",
				id: n,
				"aria-describedby": r,
				value: e.triggerType,
				onChange: (e) => t({ triggerType: e.target.value }),
				options: Oa
			})
		}),
		c && /* @__PURE__ */ H(Y, {
			label: "Document type",
			required: !0,
			error: u ? "Select a document type." : void 0,
			help: u ? void 0 : "Which document type should trigger this pipeline.",
			controlId: `${r}-document-type`,
			render: ({ controlId: n, describedById: r }) => /* @__PURE__ */ U(V, { children: [/* @__PURE__ */ H(Ye, {
				size: "sm",
				invalid: u,
				id: n,
				"aria-describedby": r,
				value: e.documentTypeId ?? "",
				onChange: (e) => t({ documentTypeId: e.target.value || void 0 }),
				options: [{
					value: "",
					label: "— select a document type —"
				}, ...l.map((e) => ({
					value: e.id,
					label: e.name
				}))]
			}), S && /* @__PURE__ */ U("div", {
				className: "text-[11px] text-text-tertiary mt-1.5",
				children: ["Event: ", /* @__PURE__ */ H("span", {
					className: "font-semibold text-text-secondary",
					children: S
				})]
			})] })
		}),
		e.triggerType === "schedule" && /* @__PURE__ */ H(Y, {
			label: "Schedule (cron)",
			required: !0,
			error: d ? "Cron expression is required." : x ? "Invalid cron expression — supports *, */N, N,M, A-B, exact values." : void 0,
			help: !d && !x ? "5-field cron: minute hour day month weekday." : void 0,
			controlId: `${r}-schedule`,
			render: ({ controlId: n, describedById: r }) => /* @__PURE__ */ U(V, { children: [/* @__PURE__ */ H(D, {
				size: "sm",
				mono: !0,
				spellCheck: !1,
				invalid: d || x,
				placeholder: "*/15 * * * *",
				id: n,
				"aria-describedby": r,
				value: e.schedule ?? "",
				onChange: (e) => t({ schedule: e.target.value })
			}), /* @__PURE__ */ H("div", {
				className: "mt-2 p-2 bg-surface-inset border border-dashed border-border rounded-md text-[11px] text-text-tertiary font-mono",
				children: b.length > 0 ? /* @__PURE__ */ U(V, { children: [/* @__PURE__ */ H("div", {
					className: "text-text-secondary mb-1",
					children: "Next 3 fires:"
				}), b.map((e, t) => /* @__PURE__ */ H("div", { children: e.toLocaleString() }, t))] }) : /* @__PURE__ */ H("span", { children: "Next fires: enter a valid cron expression to preview." })
			})] })
		}),
		e.triggerType === "webhook" && /* @__PURE__ */ U("div", {
			className: "flex flex-col gap-3",
			children: [
				/* @__PURE__ */ H(Y, {
					label: "Path",
					required: !0,
					error: f ? "Webhook path is required." : m ? "Path must be alphanumeric (plus _, -)" : void 0,
					help: !f && !m ? "Alphanumeric, _, or - (max 64 chars). No leading slash." : void 0,
					controlId: `${r}-webhook-path`,
					render: ({ controlId: e, describedById: n }) => /* @__PURE__ */ H(D, {
						size: "sm",
						mono: !0,
						spellCheck: !1,
						invalid: f || m,
						placeholder: "weekly-digest",
						id: e,
						"aria-describedby": n,
						value: p,
						onChange: (e) => t({ webhookPath: e.target.value })
					})
				}),
				/* @__PURE__ */ H("div", {
					className: "p-2 bg-surface-inset border border-dashed border-border rounded-md text-[11px] text-text-secondary font-mono break-all flex items-center gap-2",
					children: h ? /* @__PURE__ */ U(V, { children: [/* @__PURE__ */ U("span", {
						className: "flex-1",
						children: [/* @__PURE__ */ H("span", {
							className: "font-sans text-text-tertiary mr-1",
							children: "Full URL:"
						}), h]
					}), /* @__PURE__ */ H("button", {
						type: "button",
						onClick: g,
						className: "text-[11px] px-2 py-0.5 border border-border rounded bg-transparent text-text-secondary cursor-pointer font-sans",
						children: "Copy"
					})] }) : /* @__PURE__ */ H("span", {
						className: "font-sans text-text-tertiary",
						children: "Set a path above to see the URL"
					})
				}),
				/* @__PURE__ */ U("div", { children: [
					/* @__PURE__ */ H("label", {
						className: "text-xs font-semibold text-text-secondary",
						children: "Signing secret"
					}),
					/* @__PURE__ */ H("div", {
						className: "mt-1 p-2 bg-surface-inset border border-dashed border-border rounded-md text-[11px] text-text-secondary font-mono break-all flex items-center gap-2",
						children: a ? /* @__PURE__ */ U(V, { children: [
							/* @__PURE__ */ H("span", {
								className: "flex-1",
								"aria-label": "webhook secret",
								children: o ? a : "•".repeat(32)
							}),
							/* @__PURE__ */ H("button", {
								type: "button",
								onClick: () => s((e) => !e),
								className: "text-[11px] px-2 py-0.5 border border-border rounded bg-transparent text-text-secondary cursor-pointer font-sans",
								children: o ? "Hide" : "Reveal"
							}),
							/* @__PURE__ */ H("button", {
								type: "button",
								onClick: _,
								className: "text-[11px] px-2 py-0.5 border border-border rounded bg-transparent text-text-secondary cursor-pointer font-sans",
								children: "Copy"
							})
						] }) : /* @__PURE__ */ U("span", {
							className: "font-sans text-text-tertiary",
							children: [
								"Save the pipeline to mint a signing secret. External callers must send ",
								/* @__PURE__ */ H("code", { children: "X-Pipeline-Signature-256: sha256=<hmac>" }),
								"."
							]
						})
					}),
					/* @__PURE__ */ U("div", {
						className: "text-[11px] text-text-tertiary mt-0.5",
						children: [
							"HMAC-SHA256 of the raw request body. Send as",
							" ",
							/* @__PURE__ */ H("code", { children: "X-Pipeline-Signature-256: sha256=<hex>" }),
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
var Aa = {
	maxAttempts: 3,
	backoffMs: 1e3,
	backoffMultiplier: 2
}, ja = 3e4;
function Ma(e) {
	return e < 1e3 ? `${Math.round(e)}ms` : e < 6e4 ? `${(e / 1e3).toFixed(+(e < 1e4))}s` : `${Math.round(e / 6e4)}m`;
}
function Na(e) {
	let t = [];
	for (let n = 1; n < e.maxAttempts; n++) {
		let r = e.backoffMs * e.backoffMultiplier ** (n - 1);
		t.push(Math.min(r, ja));
	}
	return t;
}
function Pa({ value: e, onChange: t }) {
	let n = e !== void 0, r = e ?? Aa, i = n ? Na(r) : [], a = i.reduce((e, t) => e + t, 0) > 3e5;
	return /* @__PURE__ */ U("div", {
		"data-testid": "retry-policy-editor",
		className: "flex flex-col gap-1.5",
		children: [/* @__PURE__ */ H(va, {
			label: "Retry policy",
			checked: n,
			onChange: (e) => t(e ? Aa : void 0),
			help: n ? void 0 : "No retries — failure is terminal on first attempt.",
			"data-testid": "retry-policy-enabled"
		}), n && /* @__PURE__ */ U(V, { children: [
			/* @__PURE__ */ U("div", {
				className: "grid grid-cols-3 gap-2 mt-1",
				children: [
					/* @__PURE__ */ U("div", { children: [/* @__PURE__ */ H("label", {
						className: "text-[11px] font-semibold text-text-secondary",
						children: "Max attempts"
					}), /* @__PURE__ */ H(P, {
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
					/* @__PURE__ */ U("div", { children: [/* @__PURE__ */ H("label", {
						className: "text-[11px] font-semibold text-text-secondary",
						children: "Initial backoff (ms)"
					}), /* @__PURE__ */ H(P, {
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
					/* @__PURE__ */ U("div", { children: [/* @__PURE__ */ H("label", {
						className: "text-[11px] font-semibold text-text-secondary",
						children: "Backoff multiplier"
					}), /* @__PURE__ */ H(P, {
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
			/* @__PURE__ */ H("div", {
				className: "text-[11px] text-text-tertiary mt-1",
				"data-testid": "retry-policy-preview",
				children: r.maxAttempts === 1 ? "Effectively no retry (1 attempt)." : i.length === 0 ? `Retries up to ${r.maxAttempts}× with no delay.` : `Retries up to ${r.maxAttempts}× with delays: ${i.map(Ma).join(", ")}.`
			}),
			a && /* @__PURE__ */ H("div", {
				className: "text-[11px] text-warning-fg mt-1",
				"data-testid": "retry-policy-tail-warning",
				children: "⚠ Total backoff >5min — long-tail latency risk on persistent failures."
			})
		] })]
	});
}
//#endregion
//#region src/components/pipelines/context/ContextVariablePicker.tsx
var Fa = {
	string: "bg-info-bg text-info-fg border-info-border",
	number: "bg-accent-bg text-accent-fg border-accent-border",
	boolean: "bg-warning-bg text-warning-fg border-warning-border",
	object: "bg-neutral-bg text-neutral-fg border-neutral-border",
	array: "bg-neutral-bg text-neutral-fg border-neutral-border",
	image: "bg-success-bg text-success-fg border-success-border"
};
function Ia({ paths: e, unresolved: t = [], onInsert: n, onRevealNode: i, className: a }) {
	return /* @__PURE__ */ U("div", {
		className: r("flex flex-col gap-1.5", a),
		"data-testid": "context-variable-picker",
		children: [
			e.length === 0 ? /* @__PURE__ */ H("p", {
				className: "m-0 text-[11px] text-text-tertiary",
				"data-testid": "context-picker-empty",
				children: "No upstream context yet — connect this node to a trigger or an earlier step and its outputs will appear here."
			}) : /* @__PURE__ */ U(V, { children: [/* @__PURE__ */ H("div", {
				className: "flex flex-wrap gap-1",
				children: e.map((e) => /* @__PURE__ */ H("button", {
					type: "button",
					onClick: () => n(`{{${e.path}}}`),
					title: `${e.description}\nfrom ${e.source}`,
					className: r("rounded-full border px-2 py-0.5 font-mono text-[10px] cursor-pointer", "hover:brightness-95 transition-[filter]", Fa[e.kind]),
					"data-testid": `context-pill-${e.path}`,
					children: e.path.replace(/^context\./, "")
				}, e.path))
			}), /* @__PURE__ */ H("p", {
				className: "m-0 text-[11px] text-text-tertiary",
				children: "Click to insert. Derived from what is actually upstream of this node."
			})] }),
			t.length > 0 && /* @__PURE__ */ U("div", {
				className: "rounded-md border border-warning-border bg-warning-bg px-2 py-1.5",
				"data-testid": "context-unresolved",
				children: [
					/* @__PURE__ */ H("p", {
						className: "m-0 text-[11px] font-semibold text-warning-fg",
						children: t.length === 1 ? "This path is not provided by anything upstream:" : `${t.length} paths are not provided by anything upstream:`
					}),
					/* @__PURE__ */ H("ul", {
						className: "m-0 mt-1 list-none p-0",
						children: t.map((e) => /* @__PURE__ */ H("li", {
							className: "font-mono text-[11px] text-warning-fg",
							children: `{{${e}}}`
						}, e))
					}),
					/* @__PURE__ */ H("p", {
						className: "m-0 mt-1 text-[10px] text-warning-fg",
						children: "It will resolve to nothing at run time. Wire in the step that produces it, or fix the path."
					})
				]
			}),
			i && e.length > 0 && /* @__PURE__ */ U("details", {
				className: "text-[11px] text-text-secondary",
				children: [/* @__PURE__ */ H("summary", {
					className: "cursor-pointer select-none",
					children: "Where each value comes from"
				}), /* @__PURE__ */ H("ul", {
					className: "m-0 mt-1 list-none p-0",
					children: e.map((e) => /* @__PURE__ */ U("li", {
						className: "flex items-baseline gap-1.5 py-0.5",
						children: [/* @__PURE__ */ H("button", {
							type: "button",
							onClick: () => i(e.sourceNodeId),
							className: "bg-transparent border-none p-0 cursor-pointer text-primary underline font-inherit text-[11px]",
							children: e.source
						}), /* @__PURE__ */ H("span", {
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
var La = [
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
], Ra = {
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
function za(e, t) {
	switch (t) {
		case "image": return `<image from ${e}>`;
		case "number": return "123";
		case "boolean": return "true";
		case "array": return "[ … ]";
		case "object": return "{ … }";
		default: return `<${e}>`;
	}
}
function Ba(e, t) {
	return e.replace(/\{\{\s*([\w.[\]-]+)\s*\}\}/g, (e, n) => {
		let r = t.get(n);
		return r ? za(n, r) : `{{${n}}}`;
	});
}
function Va({ data: e, onChange: t, nodeId: n }) {
	let r = tt(), [i, a] = B(!1), { paths: o, unresolved: s } = ha(n ?? null), c = new Map(o.map((e) => [e.path, e.kind])), l = s(`${e.systemPrompt ?? ""}\n${e.userPromptTemplate ?? ""}`), u = !e.systemPrompt?.trim(), d = !e.userPromptTemplate?.trim(), f = we(), m = (e) => f(`llm:${e}`, Ra[e].map((e) => ({ value: e }))), h = m(e.provider), g = (n) => {
		let r = m(n).map((e) => e.value);
		t({
			provider: n,
			model: r.includes(e.model) ? e.model : r[0]
		});
	};
	return /* @__PURE__ */ U(X, { children: [
		/* @__PURE__ */ H(Y, {
			label: "Provider",
			required: !0,
			controlId: `${r}-provider`,
			render: ({ controlId: t, describedById: n }) => /* @__PURE__ */ H(Ye, {
				size: "sm",
				id: t,
				"aria-describedby": n,
				value: e.provider,
				onChange: (e) => g(e.target.value),
				options: La
			})
		}),
		/* @__PURE__ */ H(Y, {
			label: "Model",
			required: !0,
			controlId: `${r}-model`,
			render: ({ controlId: n, describedById: r }) => /* @__PURE__ */ H(Ye, {
				size: "sm",
				id: n,
				"aria-describedby": r,
				value: e.model,
				onChange: (e) => t({ model: e.target.value }),
				options: h.map((e) => ({
					value: e.value,
					label: e.label ?? e.value
				}))
			})
		}),
		/* @__PURE__ */ H(Y, {
			label: "Available context",
			render: ({ labelId: n }) => /* @__PURE__ */ H("div", {
				role: "group",
				"aria-labelledby": n,
				children: /* @__PURE__ */ H(Ia, {
					paths: o,
					unresolved: l,
					onInsert: (n) => t({ userPromptTemplate: `${e.userPromptTemplate ?? ""}${n}` })
				})
			})
		}),
		/* @__PURE__ */ H(Y, {
			label: "System prompt",
			required: !0,
			error: u ? "System prompt is required." : void 0,
			help: u ? void 0 : "Sets the model's role and constraints.",
			controlId: `${r}-system-prompt`,
			render: ({ controlId: n, describedById: r }) => /* @__PURE__ */ H(O, {
				rows: 4,
				invalid: u,
				id: n,
				"aria-describedby": r,
				value: e.systemPrompt,
				onChange: (e) => t({ systemPrompt: e.target.value })
			})
		}),
		/* @__PURE__ */ H(Y, {
			label: "User prompt template",
			required: !0,
			error: d ? "User prompt template is required." : void 0,
			help: d ? void 0 : "Supports {{ context.* }} substitution — click a pill above to append.",
			children: /* @__PURE__ */ H(p, {
				value: e.userPromptTemplate,
				onChange: (e) => t({ userPromptTemplate: e }),
				language: "template",
				variables: o.map((e) => e.path),
				minLines: 6,
				"aria-label": "User prompt template"
			})
		}),
		/* @__PURE__ */ U(sa, {
			title: "Advanced",
			defaultCollapsed: !0,
			children: [
				/* @__PURE__ */ H(Y, {
					label: "Temperature",
					help: "0 = deterministic, 1 = creative.",
					children: /* @__PURE__ */ H(We, {
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
				/* @__PURE__ */ H(Y, {
					label: "Max tokens",
					help: "Upper bound on response length.",
					controlId: `${r}-max-tokens`,
					render: ({ controlId: n, describedById: r }) => /* @__PURE__ */ H(P, {
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
				/* @__PURE__ */ H("div", { children: /* @__PURE__ */ H(va, {
					label: "Streaming",
					checked: e.streaming,
					onChange: (e) => t({ streaming: e }),
					help: "Stream tokens as they are generated.",
					"data-testid": "llm-streaming"
				}) }),
				/* @__PURE__ */ H(Pa, {
					value: e.retryPolicy,
					onChange: (e) => t({ retryPolicy: e })
				})
			]
		}),
		/* @__PURE__ */ U("button", {
			type: "button",
			onClick: () => a((e) => !e),
			className: "px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-white border-none rounded-md cursor-pointer font-inherit shrink-0",
			children: [i ? "▾" : "▶", " Preview with sample context"]
		}),
		i && /* @__PURE__ */ U("div", {
			className: "bg-surface-inset border border-border rounded-lg p-3 flex flex-col gap-2.5",
			children: [
				/* @__PURE__ */ U("div", { children: [/* @__PURE__ */ H("div", {
					className: "text-[11px] font-semibold text-text-secondary mb-1",
					children: "Resolved system prompt"
				}), /* @__PURE__ */ H("pre", {
					className: "text-xs whitespace-pre-wrap break-words m-0 text-text-primary bg-white p-2 rounded-md border border-border max-h-[120px] overflow-auto",
					children: Ba(e.systemPrompt || "(empty)", c)
				})] }),
				/* @__PURE__ */ U("div", { children: [/* @__PURE__ */ H("div", {
					className: "text-[11px] font-semibold text-text-secondary mb-1",
					children: "Resolved user prompt"
				}), /* @__PURE__ */ H("pre", {
					className: "text-xs whitespace-pre-wrap break-words m-0 text-text-primary bg-white p-2 rounded-md border border-border max-h-[200px] overflow-auto",
					children: Ba(e.userPromptTemplate || "(empty)", c)
				})] }),
				/* @__PURE__ */ H("div", {
					className: "text-[11px] text-text-tertiary",
					children: o.length > 0 ? "Placeholders describe the shape of each upstream value; unresolved paths stay in braces." : "No upstream context — connect this node to see what it can reference."
				})
			]
		})
	] });
}
//#endregion
//#region src/components/pipelines/nodes/transform/TransformConfig.tsx
var Ha = [
	"context",
	"context.steps",
	"context.trigger"
], Ua = [
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
function Wa({ data: e, onChange: t }) {
	let n = tt(), r = !e.expression?.trim();
	return /* @__PURE__ */ U(X, { children: [
		/* @__PURE__ */ H(Y, {
			label: "Type",
			required: !0,
			render: ({ labelId: n }) => /* @__PURE__ */ H("div", {
				role: "group",
				"aria-labelledby": n,
				children: /* @__PURE__ */ H(De, {
					name: "transform-type",
					value: e.transformType,
					onChange: (e) => t({ transformType: e }),
					options: Ua.map((e) => ({
						value: e.value,
						label: e.label
					})),
					"data-testid": "transform-type"
				})
			})
		}),
		/* @__PURE__ */ H(Y, {
			label: "Expression",
			required: !0,
			error: r ? "Expression is required." : void 0,
			help: r ? void 0 : e.transformType === "jsonpath" ? "e.g. $.items[?(@.status == \"active\")]" : e.transformType === "template" ? "Mustache-style: {{ context.doc.title }}" : e.transformType === "javascript" ? "return ctx.items.filter(x => x.active)" : void 0,
			children: /* @__PURE__ */ H(p, {
				value: e.expression,
				onChange: (e) => t({ expression: e }),
				language: e.transformType === "javascript" ? "javascript" : "jsonpath",
				variables: Ha,
				"aria-label": "Expression"
			})
		}),
		/* @__PURE__ */ H(Y, {
			label: "Output key (optional)",
			help: `If set, writes to context.${e.outputKey || "outputKey"}. Otherwise merges into root context.`,
			controlId: `${n}-output-key`,
			render: ({ controlId: n, describedById: r }) => /* @__PURE__ */ H(D, {
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
		/* @__PURE__ */ H(Pa, {
			value: e.retryPolicy,
			onChange: (e) => t({ retryPolicy: e })
		}),
		/* @__PURE__ */ H(Y, {
			label: "Preview",
			children: /* @__PURE__ */ H(w, {
				title: "Preview not available yet",
				body: "Sample input and output for a transform will render here once the preview runner ships."
			})
		})
	] });
}
//#endregion
//#region src/components/pipelines/nodes/condition/ConditionConfig.tsx
var Ga = ["context.trigger", "context.steps"];
function Ka({ data: e, onChange: t }) {
	let n = tt(), r = !e.expression?.trim();
	return /* @__PURE__ */ U(X, { children: [/* @__PURE__ */ H(Y, {
		label: "Expression",
		required: !0,
		error: r ? "Expression is required." : void 0,
		help: r ? void 0 : "e.g. context.llm.response.length > 500",
		children: /* @__PURE__ */ H(p, {
			value: e.expression,
			onChange: (e) => t({ expression: e }),
			language: "javascript",
			variables: Ga,
			"aria-label": "Expression"
		})
	}), /* @__PURE__ */ H(Y, {
		label: "Label (optional — shown on node face)",
		help: "A short name so this branch is easy to spot.",
		controlId: `${n}-label`,
		render: ({ controlId: n, describedById: r }) => /* @__PURE__ */ H(D, {
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
var qa = [
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
], Ja = {
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
}, Ya = [
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
], Xa = [{
	value: "per-step",
	label: "Per step — fire once regardless of retries"
}, {
	value: "per-attempt",
	label: "Per attempt — fire once per retry window"
}];
function Za({ data: e, onChange: t }) {
	let n = tt(), r = Ja[e.actionType], i = e.config ?? {}, a = typeof i.retryCount == "number" ? i.retryCount : 3, o = e.onError === "route-error" ? "route-error" : typeof i.retryCount == "number" ? "retry" : "halt", s = (e, n) => {
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
	return /* @__PURE__ */ U(X, { children: [
		/* @__PURE__ */ H(Y, {
			label: "Action type",
			required: !0,
			controlId: `${n}-action-type`,
			render: ({ controlId: n, describedById: r }) => /* @__PURE__ */ H(Ye, {
				size: "sm",
				id: n,
				"aria-describedby": r,
				value: e.actionType,
				onChange: (e) => t({
					actionType: e.target.value,
					config: {}
				}),
				options: qa
			})
		}),
		/* @__PURE__ */ H(Y, {
			label: "Configuration",
			render: ({ labelId: e }) => /* @__PURE__ */ H("div", {
				role: "group",
				"aria-labelledby": e,
				className: "flex flex-col gap-2.5",
				children: r.map((e) => {
					let t = `${n}-cfg-${e.key}`, r = e.help ? `${t}-help` : void 0, a = typeof i[e.key] == "string" ? i[e.key] : "";
					return /* @__PURE__ */ U("div", { children: [
						/* @__PURE__ */ H("label", {
							htmlFor: t,
							className: "text-[11px] font-semibold text-text-secondary",
							children: e.label
						}),
						e.multiline ? /* @__PURE__ */ H(O, {
							rows: 2,
							id: t,
							"aria-describedby": r,
							placeholder: e.placeholder,
							value: a,
							onChange: (t) => s(e.key, t.target.value)
						}) : /* @__PURE__ */ H(D, {
							size: "sm",
							id: t,
							"aria-describedby": r,
							placeholder: e.placeholder,
							value: a,
							onChange: (t) => s(e.key, t.target.value)
						}),
						e.help && /* @__PURE__ */ H("div", {
							id: r,
							className: "text-[11px] text-text-tertiary mt-0.5",
							children: e.help
						})
					] }, e.key);
				})
			})
		}),
		/* @__PURE__ */ H(va, {
			label: "Idempotent",
			checked: !!e.idempotent,
			onChange: (e) => t({ idempotent: e }),
			help: "This action is safe to retry.",
			"data-testid": "action-idempotent"
		}),
		e.idempotent && /* @__PURE__ */ H(Y, {
			label: "Dedup scope",
			controlId: `${n}-dedup-scope`,
			render: ({ controlId: r }) => /* @__PURE__ */ U(V, { children: [/* @__PURE__ */ H(Ye, {
				size: "sm",
				id: r,
				"aria-describedby": `${n}-dedup-help`,
				value: e.idempotencyMode ?? "per-step",
				onChange: (e) => t({ idempotencyMode: e.target.value }),
				options: Xa
			}), /* @__PURE__ */ H("div", {
				id: `${n}-dedup-help`,
				className: "text-[11px] text-text-tertiary mt-0.5",
				children: (e.idempotencyMode ?? "per-step") === "per-step" ? "Retries skip this action if it already succeeded. Best for post-comment, notify." : "Each retry attempt can execute the action. Best for idempotent PUTs/webhooks."
			})] })
		}),
		/* @__PURE__ */ H(Pa, {
			value: e.retryPolicy,
			onChange: (e) => t({ retryPolicy: e })
		}),
		/* @__PURE__ */ H(Y, {
			label: "On error",
			render: ({ labelId: e }) => /* @__PURE__ */ U("div", {
				role: "group",
				"aria-labelledby": e,
				children: [/* @__PURE__ */ H(De, {
					name: "action-on-error",
					value: o,
					onChange: c,
					options: Ya,
					"data-testid": "action-on-error"
				}), o === "retry" && /* @__PURE__ */ U("div", {
					className: "mt-2 flex items-center gap-2",
					children: [/* @__PURE__ */ H("span", {
						className: "text-[11px] font-semibold text-text-secondary",
						children: "Attempts"
					}), /* @__PURE__ */ H(P, {
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
var Qa = 2, $a = 8;
function eo(e, t) {
	let n = e ?? [];
	return n.length === t ? n : n.length > t ? n.slice(0, t) : [...n, ...Array(t - n.length).fill("")];
}
function to({ data: e, onChange: t }) {
	let n = tt(), r = Math.max(Qa, Math.min($a, e.branchCount || Qa)), i = eo(e.branchLabels, r), a = (n) => {
		let r = Math.max(Qa, Math.min($a, n));
		t({
			branchCount: r,
			branchLabels: eo(e.branchLabels, r)
		});
	}, o = (e, n) => {
		let r = [...i];
		r[e] = n, t({ branchLabels: r });
	};
	return /* @__PURE__ */ U(X, { children: [/* @__PURE__ */ H(Y, {
		label: "Branch count",
		required: !0,
		help: `Between ${Qa} and ${$a} parallel branches.`,
		controlId: `${n}-branch-count`,
		render: ({ controlId: e, describedById: t }) => /* @__PURE__ */ U(V, { children: [/* @__PURE__ */ H(We, {
			min: Qa,
			max: $a,
			step: 1,
			value: r,
			onChange: a,
			"aria-label": "Branch count",
			"data-testid": "fork-branch-slider"
		}), /* @__PURE__ */ H(P, {
			size: "sm",
			min: Qa,
			max: $a,
			value: r,
			onChange: a,
			id: e,
			"aria-describedby": t,
			"data-testid": "fork-branch-count"
		})] })
	}), /* @__PURE__ */ H(Y, {
		label: "Branch labels (optional)",
		render: ({ labelId: e }) => /* @__PURE__ */ H("div", {
			role: "group",
			"aria-labelledby": e,
			className: "flex flex-col gap-1.5",
			children: i.map((e, t) => /* @__PURE__ */ U("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ U("span", {
					className: "text-xs text-text-secondary min-w-[72px]",
					children: [
						"Branch ",
						t,
						":"
					]
				}), /* @__PURE__ */ H(D, {
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
var no = [
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
], ro = [
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
function io({ data: e, onChange: t }) {
	return /* @__PURE__ */ U(X, { children: [
		/* @__PURE__ */ H(Y, {
			label: "Mode",
			required: !0,
			render: ({ labelId: n }) => /* @__PURE__ */ U("div", {
				role: "group",
				"aria-labelledby": n,
				children: [/* @__PURE__ */ H(De, {
					name: "join-mode",
					value: e.mode,
					onChange: (e) => t({ mode: e }),
					options: no.map((e) => ({
						value: e.value,
						label: e.label,
						description: e.hint
					})),
					"data-testid": "join-mode"
				}), e.mode === "n_of_m" && /* @__PURE__ */ U("div", {
					className: "mt-2 flex items-center gap-2",
					children: [/* @__PURE__ */ H("span", {
						className: "text-[11px] font-semibold text-text-secondary",
						children: "N"
					}), /* @__PURE__ */ H(P, {
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
		/* @__PURE__ */ H(Y, {
			label: "Merge strategy",
			required: !0,
			render: ({ labelId: n }) => /* @__PURE__ */ H("div", {
				role: "group",
				"aria-labelledby": n,
				children: /* @__PURE__ */ H(De, {
					name: "join-merge",
					value: e.mergeStrategy,
					onChange: (e) => t({ mergeStrategy: e }),
					options: ro.map((e) => ({
						value: e.value,
						label: e.label,
						description: e.hint
					})),
					"data-testid": "join-merge"
				})
			})
		}),
		/* @__PURE__ */ U("div", {
			className: "p-2 bg-surface-inset border border-border rounded-md text-xs text-text-secondary",
			children: [
				"Current inputs: ",
				/* @__PURE__ */ H("strong", { children: "TBD" }),
				/* @__PURE__ */ H("div", {
					className: "text-[11px] text-text-tertiary mt-0.5",
					children: "Derived from incoming edges once the canvas is connected."
				})
			]
		})
	] });
}
//#endregion
//#region src/components/pipelines/nodes/approval/ApprovalConfig.tsx
var ao = [
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
], oo = [{
	value: "reject",
	label: "Reject"
}, {
	value: "approve",
	label: "Approve"
}], so = {
	seconds: 1e3,
	minutes: 6e4,
	hours: 36e5
};
function co(e) {
	return !e || e <= 0 ? "minutes" : e % so.hours === 0 ? "hours" : e % so.minutes === 0 ? "minutes" : "seconds";
}
function lo({ data: e, onChange: t }) {
	let n = tt(), i = e.approvers ?? [], a = i.length === 0, [o, s] = B(() => co(e.timeoutMs)), c = e.timeoutMs === void 0 ? "" : Math.round(e.timeoutMs / so[o]), l = i.filter((e) => e.type === "user").map((e) => e.value), d = (n) => {
		let r = i.filter((e) => e.type === "role"), a = [...n.map((e) => ({
			type: "user",
			value: e
		})), ...r];
		t({
			approvers: a,
			requiredCount: Math.max(1, Math.min(e.requiredCount || 1, a.length || 1))
		});
	}, f = (n) => {
		let r = i.filter((e, t) => t !== n);
		t({
			approvers: r,
			requiredCount: Math.max(1, Math.min(e.requiredCount || 1, r.length || 1))
		});
	}, p = (e) => {
		if (e === "") {
			t({ timeoutMs: void 0 });
			return;
		}
		t({ timeoutMs: Math.max(0, parseInt(e, 10) || 0) * so[o] });
	}, m = (e) => {
		s(e), typeof c == "number" && !Number.isNaN(c) && t({ timeoutMs: c * so[e] });
	}, h = Math.max(1, i.length);
	return /* @__PURE__ */ U(X, { children: [
		/* @__PURE__ */ H(Y, {
			label: "Approvers",
			required: !0,
			error: a ? "At least one approver is required." : void 0,
			help: a ? void 0 : "Who can approve this step.",
			render: ({ describedById: e, labelId: t }) => /* @__PURE__ */ U("div", {
				role: "group",
				"aria-labelledby": t,
				"aria-describedby": e,
				children: [/* @__PURE__ */ H(u, {
					value: l,
					onChange: d,
					placeholder: "Add approver…"
				}), i.length > 0 && /* @__PURE__ */ H("div", {
					className: "flex flex-wrap gap-1.5 mt-2",
					children: i.map((e, t) => /* @__PURE__ */ U("span", {
						className: r("inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold font-inherit leading-[1.4] whitespace-nowrap", e.type === "role" ? "bg-warning-bg text-warning-fg" : "bg-info-bg text-info-fg"),
						children: [
							e.type === "role" ? "🎖" : "👤",
							" ",
							e.value,
							/* @__PURE__ */ H("button", {
								type: "button",
								onClick: () => f(t),
								"aria-label": `Remove ${e.value}`,
								className: "bg-transparent border-none p-0 ml-0.5 cursor-pointer text-current font-inherit text-xs leading-none",
								children: "×"
							})
						]
					}, `${e.type}:${e.value}:${t}`))
				})]
			})
		}),
		/* @__PURE__ */ H(Y, {
			label: "Required count",
			required: !0,
			help: "How many approvers must say yes.",
			controlId: `${n}-required-count`,
			render: ({ controlId: n, describedById: r }) => /* @__PURE__ */ U("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ H(P, {
					size: "sm",
					min: 1,
					max: h,
					value: e.requiredCount || 1,
					onChange: (e) => t({ requiredCount: e }),
					id: n,
					"aria-describedby": r,
					"data-testid": "approval-required-count"
				}), /* @__PURE__ */ U("span", {
					className: "text-text-tertiary text-xs whitespace-nowrap",
					children: ["of ", h]
				})]
			})
		}),
		/* @__PURE__ */ H(Y, {
			label: "Timeout",
			help: "Leave blank for no timeout.",
			render: ({ describedById: n, labelId: r }) => /* @__PURE__ */ U("div", {
				role: "group",
				"aria-labelledby": r,
				"aria-describedby": n,
				children: [/* @__PURE__ */ U("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ H(P, {
						size: "sm",
						min: 0,
						value: c === "" ? void 0 : Number(c),
						onChange: (e) => p(String(e)),
						onClear: () => p(""),
						placeholder: "24",
						"aria-label": "Timeout value",
						"data-testid": "approval-timeout-value"
					}), /* @__PURE__ */ H(Ye, {
						size: "sm",
						className: "w-[120px] flex-none",
						value: o,
						onChange: (e) => m(e.target.value),
						"aria-label": "Timeout unit",
						options: ao
					})]
				}), e.timeoutMs !== void 0 && e.timeoutMs > 0 && /* @__PURE__ */ U("div", {
					className: "mt-2",
					children: [/* @__PURE__ */ H("span", {
						className: "text-[11px] font-semibold text-text-secondary",
						children: "If timeout"
					}), /* @__PURE__ */ H("div", {
						className: "mt-1",
						children: /* @__PURE__ */ H(De, {
							name: "approval-timeout-action",
							orientation: "horizontal",
							value: e.timeoutAction ?? "reject",
							onChange: (e) => t({ timeoutAction: e }),
							options: oo,
							"data-testid": "approval-timeout-action"
						})
					})]
				})]
			})
		}),
		/* @__PURE__ */ H(Y, {
			label: "Message for approver (optional)",
			help: "Shown to the approver when the request is sent.",
			controlId: `${n}-message`,
			render: ({ controlId: n, describedById: r }) => /* @__PURE__ */ H(O, {
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
function uo(e) {
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
function fo(e) {
	let t = Array.isArray(e.type) ? e.type[0] : e.type;
	if (t === "array") {
		let t = e.items ? Array.isArray(e.items.type) ? e.items.type[0] : e.items.type : void 0;
		return t ? `array of ${t}` : "array";
	}
	return t ?? "unknown";
}
function po(e, t, n, r, i) {
	if (i.has(e)) return;
	i.add(e);
	let a = Array.isArray(e.type) ? e.type[0] : e.type, o = [
		e.anyOf,
		e.oneOf,
		e.allOf
	].filter(Boolean);
	for (let e of o) for (let a of e) po(a, t, n, r, i);
	if (a === "object" && e.properties) {
		for (let [a, o] of Object.entries(e.properties)) {
			let e = `${t}.${a}`, s = uo(o);
			r.push({
				path: e,
				label: `${a} (${fo(o)})`,
				depth: n,
				kind: s,
				isArrayItems: s === "array"
			}), po(o, e, n + 1, r, i);
		}
		return;
	}
	if (a === "array") {
		let a = `${t}[*]`, o = e.items, s = o ? uo(o) : "unknown";
		r.push({
			path: a,
			label: `${t.slice(t.lastIndexOf(".") + 1)}[*] (each item)`,
			depth: n,
			kind: s,
			isArrayItems: !0
		}), o && po(o, a, n + 1, r, i);
	}
}
function mo(e, t = "$") {
	if (!e || typeof e != "object") return [];
	let n = [], r = /* @__PURE__ */ new Set();
	if ((Array.isArray(e.type) ? e.type[0] : e.type) === "object" && e.properties) for (let [i, a] of Object.entries(e.properties)) {
		let e = `${t}.${i}`, o = uo(a);
		n.push({
			path: e,
			label: `${i} (${fo(a)})`,
			depth: 0,
			kind: o,
			isArrayItems: o === "array"
		}), po(a, e, 1, n, r);
	}
	else po(e, t, 0, n, r);
	return n;
}
//#endregion
//#region src/components/pipelines/nodes/scatter/ScatterPathPicker.tsx
function ho() {
	return "/api/pipeline/output-schemas";
}
var go = null, _o = null;
async function vo() {
	return go || (_o ||= fetch(ho()).then((e) => {
		if (!e.ok) throw Error(`HTTP ${e.status}`);
		return e.json();
	}).then((e) => (go = e, _o = null, e)).catch((e) => {
		throw _o = null, e;
	}), _o);
}
var yo = {
	array: "bg-primary-bg text-primary-fg border-primary-border",
	object: "bg-surface-panel text-text-secondary border-border",
	string: "bg-success-bg text-success-fg border-success-border",
	number: "bg-warning-bg text-warning-fg border-warning-border",
	boolean: "bg-pink-50 text-pink-700 border-pink-200",
	unknown: "bg-surface-panel text-text-tertiary border-border"
};
function bo({ kind: e }) {
	return /* @__PURE__ */ H("span", {
		className: r("inline-flex items-center px-1 py-0 rounded text-[10px] font-mono border leading-4", yo[e]),
		children: e
	});
}
function xo({ entry: e, isSelected: t, onPick: n }) {
	return /* @__PURE__ */ U("button", {
		type: "button",
		onClick: () => n(e.path),
		"aria-pressed": t,
		"data-testid": `path-row-${e.path}`,
		className: r("w-full flex items-center gap-2 px-2 py-1 rounded text-left transition-colors duration-100", "hover:bg-surface-panel focus:outline-none focus:ring-2 focus:ring-primary/50", t && "bg-primary-bg ring-1 ring-inset ring-primary", e.isArrayItems && !t && "hover:bg-primary-bg"),
		style: { paddingLeft: `${8 + e.depth * 12}px` },
		children: [/* @__PURE__ */ H("span", {
			className: r("flex-1 font-mono text-[12px] leading-5 truncate", e.isArrayItems ? "text-primary-fg font-semibold" : "text-text-primary"),
			children: e.path
		}), /* @__PURE__ */ H(bo, { kind: e.kind })]
	});
}
function So({ value: e, onChange: t, upstreamKind: n, upstreamSchema: r }) {
	let [i, a] = B("idle"), [o, s] = B(null), c = z(!0);
	L(() => (c.current = !0, () => {
		c.current = !1;
	}), []);
	let l = R(() => r === void 0 ? o : r, [r, o]);
	L(() => {
		!n || r !== void 0 || (a("loading"), vo().then((e) => {
			if (!c.current) return;
			let t = e.schemas[n] ?? null;
			s(t), a("done");
		}).catch(() => {
			c.current && a("error");
		}));
	}, [n, r]);
	let u = R(() => mo(l), [l]), d = l !== null && u.length > 0, f = I((e) => {
		t(e);
	}, [t]);
	if (!n && r === void 0) return /* @__PURE__ */ H(Re, {
		value: e,
		onChange: t,
		enforcePrefix: !0,
		"data-testid": "scatter-path-plain-input"
	});
	if (!d) return /* @__PURE__ */ U("div", {
		className: "flex flex-col gap-1.5",
		children: [
			i === "loading" && /* @__PURE__ */ U("p", {
				className: "text-[11px] text-text-tertiary leading-4",
				children: [
					"Loading schema for ",
					n,
					"…"
				]
			}),
			i === "error" && /* @__PURE__ */ H("p", {
				className: "text-[11px] text-warning-fg leading-4",
				children: "Could not load schema — enter path manually."
			}),
			(i === "done" || r === null) && /* @__PURE__ */ U("p", {
				className: "text-[11px] text-text-tertiary leading-4",
				children: [
					"Schema unavailable for ",
					/* @__PURE__ */ H("span", {
						className: "font-mono",
						children: n
					}),
					" — enter path manually."
				]
			}),
			/* @__PURE__ */ H(Re, {
				value: e,
				onChange: t,
				enforcePrefix: !0,
				"data-testid": "scatter-path-fallback-input"
			})
		]
	});
	let p = u.filter((e) => e.isArrayItems).length < u.length;
	return /* @__PURE__ */ U("div", {
		className: "flex flex-col gap-1.5",
		children: [
			/* @__PURE__ */ U("p", {
				className: "text-[11px] text-neutral leading-4",
				children: ["Click a path to set itemsPath.", p && /* @__PURE__ */ U(V, { children: [
					" ",
					/* @__PURE__ */ H("span", {
						className: "text-primary-fg font-semibold",
						children: "Indigo"
					}),
					" ",
					"paths are arrays — valid scatter sources."
				] })]
			}),
			/* @__PURE__ */ H("div", {
				className: "flex flex-col gap-px border border-border rounded-md bg-white max-h-48 overflow-y-auto",
				"data-testid": "scatter-path-tree",
				role: "group",
				"aria-label": "Available output paths",
				children: u.map((t) => /* @__PURE__ */ H(xo, {
					entry: t,
					isSelected: e === t.path,
					onPick: f
				}, t.path))
			}),
			/* @__PURE__ */ H(Re, {
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
function Co(e) {
	let { definition: t } = pe();
	return R(() => {
		if (!e || !t) return;
		let n = t.edges.find((t) => t.target === e);
		if (!n) return;
		let r = t.nodes.find((e) => e.id === n.source);
		if (r) return r.type;
	}, [e, t]);
}
function wo({ data: e, onChange: t }) {
	let n = tt(), { selectedNodeId: r } = pe(), i = Co(r);
	return e.maxConcurrency, /* @__PURE__ */ U(X, { children: [
		/* @__PURE__ */ H(Y, {
			label: "Items path",
			required: !0,
			error: e.itemsPath?.trim() ? e.itemsPath.startsWith("$.") ? void 0 : "Path must start with $." : "Items path is required.",
			help: "JSONPath into context resolving to an array. Each element becomes one scatter arm.",
			render: ({ describedById: n, labelId: r }) => /* @__PURE__ */ H("div", {
				role: "group",
				"aria-labelledby": r,
				"aria-describedby": n,
				children: /* @__PURE__ */ H(So, {
					value: e.itemsPath ?? "",
					onChange: (e) => t({ itemsPath: e }),
					upstreamKind: i
				})
			})
		}),
		/* @__PURE__ */ H(Y, {
			label: "Item alias",
			help: "Optional, default 'item'. Key written to $.scatter.<alias> for each arm.",
			controlId: `${n}-item-alias`,
			render: ({ controlId: n, describedById: r }) => /* @__PURE__ */ H(D, {
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
		/* @__PURE__ */ H(Y, {
			label: "Max concurrency",
			help: "Optional, default 4. Maximum number of arms executing concurrently.",
			controlId: `${n}-max-concurrency`,
			render: ({ controlId: n, describedById: r }) => /* @__PURE__ */ H(P, {
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
var To = [
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
function Eo({ data: e, onChange: t, nodeId: n }) {
	let r = e.fit ?? "cover", i = r === "contain" || r === "fill";
	return /* @__PURE__ */ U(X, { children: [
		/* @__PURE__ */ H(_a, {
			value: e.sourceImagePath,
			onChange: (e) => t({ sourceImagePath: e }),
			nodeId: n
		}),
		/* @__PURE__ */ U("div", {
			className: "flex gap-2",
			children: [/* @__PURE__ */ H("div", {
				className: "flex-1",
				children: /* @__PURE__ */ H(Y, {
					label: "Width",
					controlId: "resize-width",
					render: ({ describedById: n, controlId: r }) => /* @__PURE__ */ H(P, {
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
			}), /* @__PURE__ */ H("div", {
				className: "flex-1",
				children: /* @__PURE__ */ H(Y, {
					label: "Height",
					controlId: "resize-height",
					render: ({ describedById: n, controlId: r }) => /* @__PURE__ */ H(P, {
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
		/* @__PURE__ */ H(Y, {
			label: "Fit mode",
			help: "How the image fits the target dimensions. cover (default) crops, contain letterboxes, fill stretches.",
			controlId: "resize-fit",
			render: ({ describedById: e, controlId: n }) => /* @__PURE__ */ H(Ye, {
				id: n,
				"aria-describedby": e,
				size: "sm",
				value: r,
				onChange: (e) => t({ fit: e.target.value }),
				options: To
			})
		}),
		/* @__PURE__ */ H(va, {
			label: "Do not enlarge if already smaller than target",
			checked: e.withoutEnlargement ?? !1,
			onChange: (e) => t({ withoutEnlargement: e }),
			"data-testid": "resize-without-enlargement"
		}),
		/* @__PURE__ */ H(Y, {
			label: "Background colour",
			help: i ? "Hex colour used to fill letterbox padding." : "Only applies when fit is contain or fill.",
			controlId: "resize-background",
			render: ({ describedById: n, controlId: r }) => /* @__PURE__ */ H(D, {
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
var Do = "Operations", Oo = [
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
function ko(e) {
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
function Ao({ op: e, index: t, onUpdate: n, onRemove: r }) {
	let i = e;
	return /* @__PURE__ */ U("div", {
		className: "border border-border rounded-md p-2.5 bg-surface-inset flex flex-col gap-2",
		"data-testid": `geo-op-card-${t}`,
		children: [/* @__PURE__ */ U("div", {
			className: "flex items-center gap-2",
			children: [
				/* @__PURE__ */ U("span", {
					className: "text-[11px] text-text-tertiary font-semibold min-w-[20px]",
					children: [t + 1, "."]
				}),
				/* @__PURE__ */ H(Ye, {
					size: "sm",
					className: "flex-1",
					value: e.op,
					onChange: (e) => n(ko(e.target.value)),
					"aria-label": `Op ${t + 1} type`,
					options: Oo
				}),
				/* @__PURE__ */ H(m, {
					size: "sm",
					variant: "ghost",
					onClick: r,
					"aria-label": `Remove op ${t + 1}`,
					children: "✕"
				})
			]
		}), e.op === "rotate" && /* @__PURE__ */ U(V, { children: [
			/* @__PURE__ */ U("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ H("span", {
					className: "text-[11px] text-text-tertiary min-w-[60px]",
					children: "Degrees"
				}), /* @__PURE__ */ H(P, {
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
			/* @__PURE__ */ U("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ H("span", {
					className: "text-[11px] text-text-tertiary min-w-[60px]",
					children: "Background"
				}), /* @__PURE__ */ H(D, {
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
			/* @__PURE__ */ H(va, {
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
function jo({ data: e, onChange: t, nodeId: n }) {
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
	return /* @__PURE__ */ U(X, { children: [/* @__PURE__ */ H(_a, {
		value: e.sourceImagePath,
		onChange: (e) => t({ sourceImagePath: e }),
		nodeId: n
	}), /* @__PURE__ */ H(Y, {
		label: Do,
		error: r.length === 0 ? "Add at least one operation." : void 0,
		help: "Applied top-to-bottom. Rotate (any angle), Flip (top-to-bottom mirror), Flop (left-to-right mirror).",
		render: ({ describedById: e, labelId: t }) => /* @__PURE__ */ U("div", {
			role: "group",
			"aria-labelledby": t,
			"aria-describedby": e,
			children: [/* @__PURE__ */ H("div", {
				className: "flex flex-col gap-1.5",
				children: r.map((e, t) => /* @__PURE__ */ H(Ao, {
					op: e,
					index: t,
					onUpdate: (e) => i(t, e),
					onRemove: () => a(t)
				}, t))
			}), /* @__PURE__ */ H("div", {
				className: r.length > 0 ? "mt-2" : "",
				children: /* @__PURE__ */ H(m, {
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
var Mo = [
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
], No = [
	"jpeg",
	"webp",
	"avif"
], Po = ["webp", "avif"];
function Fo({ data: e, onChange: t, nodeId: n }) {
	let r = e.format ?? "jpeg", i = No.includes(r), a = Po.includes(r), o = e.lossless ?? !1;
	return /* @__PURE__ */ U(X, { children: [
		/* @__PURE__ */ H(_a, {
			value: e.sourceImagePath,
			onChange: (e) => t({ sourceImagePath: e }),
			nodeId: n
		}),
		/* @__PURE__ */ H(Y, {
			label: "Output format",
			controlId: "format-convert-format",
			render: ({ describedById: e, controlId: n }) => /* @__PURE__ */ H(Ye, {
				id: n,
				"aria-describedby": e,
				size: "sm",
				value: r,
				onChange: (e) => t({ format: e.target.value }),
				options: Mo
			})
		}),
		i && /* @__PURE__ */ H(Y, {
			label: "Quality",
			help: o ? "Ignored while lossless encoding is on." : "Higher is better quality and a larger file. 80 is a good default. Range 1–100.",
			controlId: "format-convert-quality",
			render: ({ describedById: n, controlId: r }) => /* @__PURE__ */ H(P, {
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
		a && /* @__PURE__ */ H(va, {
			label: "Lossless encoding",
			checked: o,
			onChange: (e) => t({ lossless: e }),
			help: "Overrides quality when on. Larger files, no compression artefacts.",
			"data-testid": "format-convert-lossless"
		}),
		/* @__PURE__ */ H(va, {
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
function Io({ data: e, onChange: t, nodeId: n }) {
	let r = ga(n ?? null);
	return /* @__PURE__ */ U(X, { children: [
		/* @__PURE__ */ H(Y, {
			label: "Source image path",
			help: "Optional. Defaults to the image produced upstream.",
			controlId: "sharpen-source-image-path",
			render: ({ describedById: n, controlId: i }) => /* @__PURE__ */ U(V, { children: [/* @__PURE__ */ H(D, {
				id: i,
				"aria-describedby": n,
				size: "sm",
				mono: !0,
				spellCheck: !1,
				value: e.sourceImagePath ?? "",
				onChange: (e) => t({ sourceImagePath: e.target.value.trim() || void 0 }),
				placeholder: "$.trigger.imageRef"
			}), /* @__PURE__ */ H(ca, {
				samples: r.map((e) => e.path),
				onSelect: (e) => t({ sourceImagePath: e }),
				"aria-label": "Upstream image refs"
			})] })
		}),
		/* @__PURE__ */ H(Y, {
			label: "Sigma",
			help: "Gaussian mask sigma. Higher is broader and stronger. Typical range 0.5–3.",
			controlId: "sharpen-sigma",
			render: ({ describedById: n, controlId: r }) => /* @__PURE__ */ H(P, {
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
		/* @__PURE__ */ H(Y, {
			label: "m1 — flat area level",
			help: "Sharpening applied to flat (smooth) areas of the image.",
			controlId: "sharpen-m1",
			render: ({ describedById: n, controlId: r }) => /* @__PURE__ */ H(P, {
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
		/* @__PURE__ */ H(Y, {
			label: "m2 — jagged area level",
			help: "Sharpening applied to jagged (edge) areas of the image.",
			controlId: "sharpen-m2",
			render: ({ describedById: n, controlId: r }) => /* @__PURE__ */ H(P, {
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
var Lo = [
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
function Ro({ data: e, onChange: t, nodeId: n }) {
	let r = !e.overlayImageId?.trim();
	return /* @__PURE__ */ U(X, { children: [
		/* @__PURE__ */ H(_a, {
			value: e.sourceImagePath,
			onChange: (e) => t({ sourceImagePath: e }),
			nodeId: n
		}),
		/* @__PURE__ */ H(Y, {
			label: "Overlay image ID",
			required: !0,
			error: r ? "Overlay image ID is required." : void 0,
			help: "The imageId of the watermark image already stored in the blob store.",
			controlId: "watermark-overlay-image-id",
			render: ({ describedById: n, controlId: i }) => /* @__PURE__ */ H(D, {
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
		/* @__PURE__ */ H(Y, {
			label: "Gravity",
			help: "Where the overlay sits on the source image. Default southeast.",
			controlId: "watermark-gravity",
			render: ({ describedById: n, controlId: r }) => /* @__PURE__ */ H(Ye, {
				id: r,
				"aria-describedby": n,
				size: "sm",
				value: e.gravity ?? "southeast",
				onChange: (e) => t({ gravity: e.target.value }),
				options: Lo
			})
		}),
		/* @__PURE__ */ H(Y, {
			label: "Opacity",
			help: "0 to 1. Default 1.",
			controlId: "watermark-opacity",
			render: ({ describedById: n, controlId: r }) => /* @__PURE__ */ H(P, {
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
		/* @__PURE__ */ U("div", {
			className: "flex gap-2",
			children: [/* @__PURE__ */ H("div", {
				className: "flex-1",
				children: /* @__PURE__ */ H(Y, {
					label: "Offset X",
					controlId: "watermark-offset-x",
					render: ({ describedById: n, controlId: r }) => /* @__PURE__ */ H(P, {
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
			}), /* @__PURE__ */ H("div", {
				className: "flex-1",
				children: /* @__PURE__ */ H(Y, {
					label: "Offset Y",
					controlId: "watermark-offset-y",
					render: ({ describedById: n, controlId: r }) => /* @__PURE__ */ H(P, {
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
var zo = 50;
function Bo(e, t) {
	let [n, r] = B(e), [i, a] = B([]), [o, s] = B([]), c = z(n);
	c.current = n;
	let l = I((e) => {
		let n = c.current, i = e(n);
		c.current = i, a((e) => {
			let t = [...e, n];
			return t.length > zo && t.shift(), t;
		}), s([]), r(i), t(i);
	}, [t]);
	return {
		boxes: n,
		addBox: I((e) => {
			l((t) => [...t, e]);
		}, [l]),
		moveBox: I((e, t, n) => {
			l((r) => r.map((r) => r.id === e ? {
				...r,
				x: t,
				y: n
			} : r));
		}, [l]),
		resizeBox: I((e, t, n, r, i) => {
			l((a) => a.map((a) => a.id === e ? {
				...a,
				x: t,
				y: n,
				width: r,
				height: i
			} : a));
		}, [l]),
		setLabel: I((e, t) => {
			l((n) => n.map((n) => n.id === e ? {
				...n,
				label: t
			} : n));
		}, [l]),
		deleteBox: I((e) => {
			l((t) => t.filter((t) => t.id !== e));
		}, [l]),
		undo: I(() => {
			if (i.length === 0) return;
			let e = i[i.length - 1], n = c.current;
			c.current = e, s((e) => [...e, n]), a((e) => e.slice(0, -1)), r(e), t(e);
		}, [t, i]),
		redo: I(() => {
			if (o.length === 0) return;
			let e = o[o.length - 1], n = c.current;
			c.current = e, a((e) => {
				let t = [...e, n];
				return t.length > zo && t.shift(), t;
			}), s((e) => e.slice(0, -1)), r(e), t(e);
		}, [t, o]),
		canUndo: i.length > 0,
		canRedo: o.length > 0
	};
}
//#endregion
//#region src/components/pipelines/vision/BBoxAuthoringCanvas.tsx
function Vo() {
	return typeof crypto < "u" && "randomUUID" in crypto ? crypto.randomUUID() : `bbox-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
function Ho(e, t, n) {
	return Math.max(t, Math.min(n, e));
}
function Uo(e, t) {
	let n = t.getBoundingClientRect();
	return {
		x: Ho(e.clientX - n.left, 0, n.width),
		y: Ho(e.clientY - n.top, 0, n.height)
	};
}
function Wo(e, t, n, r, i, a) {
	let o = i / n, s = a / r;
	return {
		x: e * o,
		y: t * s
	};
}
function Go(e, t, n) {
	return {
		left: `${e.x / t * 100}%`,
		top: `${e.y / n * 100}%`,
		width: `${e.width / t * 100}%`,
		height: `${e.height / n * 100}%`
	};
}
function Ko(e, t, n) {
	for (let r = n.length - 1; r >= 0; r--) {
		let i = n[r];
		if (e >= i.x && e <= i.x + i.width && t >= i.y && t <= i.y + i.height) return i;
	}
	return null;
}
function qo({ imageUrl: e, imageWidth: t, imageHeight: n, boxes: i, onChange: a, readOnly: o = !1, className: s }) {
	let c = z(null), [l, u] = B({ kind: "idle" }), [d, f] = B(null), p = z(null), { addBox: m, moveBox: h, resizeBox: g, setLabel: _, deleteBox: v } = Bo(i, a);
	L(() => {
		d && p.current && (p.current.focus(), p.current.select());
	}, [d]);
	let y = I((e) => {
		if (o || e.button !== 0) return;
		let r = c.current;
		if (!r) return;
		e.preventDefault(), r.setPointerCapture(e.pointerId);
		let { x: a, y: s } = Uo(e, r), l = r.getBoundingClientRect(), { x: d, y: f } = Wo(a, s, l.width, l.height, t, n), p = Ko(d, f, i);
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
		n
	]), b = I((e, r, i) => {
		if (o) return;
		e.stopPropagation(), e.preventDefault();
		let a = c.current;
		if (!a) return;
		a.setPointerCapture(e.pointerId);
		let { x: s, y: l } = Uo(e, a), d = a.getBoundingClientRect(), { x: f, y: p } = Wo(s, l, d.width, d.height, t, n);
		u({
			kind: "resize",
			id: r.id,
			corner: i,
			origBox: { ...r },
			currentX: f,
			currentY: p
		});
	}, [
		o,
		t,
		n
	]), x = I((e) => {
		if (l.kind === "idle") return;
		let r = c.current;
		if (!r) return;
		let { x: i, y: a } = Uo(e, r), o = r.getBoundingClientRect(), { x: s, y: d } = Wo(i, a, o.width, o.height, t, n);
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
		n
	]), S = I((e) => {
		if (l.kind === "create") {
			let e = Math.min(l.startX, l.currentX), t = Math.min(l.startY, l.currentY), n = Math.max(l.startX, l.currentX), r = Math.max(l.startY, l.currentY), i = n - e, a = r - t;
			i >= 4 && a >= 4 && m({
				id: Vo(),
				x: e,
				y: t,
				width: i,
				height: a
			});
		} else if (l.kind === "move") {
			let e = i.find((e) => e.id === l.id);
			if (e) {
				let r = Ho(l.currentX - l.offsetX, 0, t - e.width), i = Ho(l.currentY - l.offsetY, 0, n - e.height);
				h(l.id, r, i);
			}
		} else if (l.kind === "resize") {
			let { id: e, corner: r, origBox: i, currentX: a, currentY: o } = l, { x: s, y: c, width: u, height: d } = i;
			if (r === "nw") {
				let e = Ho(a, 0, s + u - 4), t = Ho(o, 0, c + d - 4);
				u = s + u - e, d = c + d - t, s = e, c = t;
			} else if (r === "ne") {
				let e = Ho(o, 0, c + d - 4);
				u = Ho(a - s, 4, t - s), d = c + d - e, c = e;
			} else if (r === "sw") {
				let e = Ho(a, 0, s + u - 4);
				u = s + u - e, d = Ho(o - c, 4, n - c), s = e;
			} else u = Ho(a - s, 4, t - s), d = Ho(o - c, 4, n - c);
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
		n
	]), C = I((e, t) => {
		o || (e.preventDefault(), v(t));
	}, [o, v]), w = I((e, t) => {
		o || (e.key === "Delete" || e.key === "Backspace") && (e.preventDefault(), v(t));
	}, [o, v]), T = I((e, t) => {
		o || (e.stopPropagation(), f({
			id: t.id,
			value: t.label ?? ""
		}));
	}, [o]), E = I(() => {
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
	let O = null;
	if (l.kind === "move") {
		let e = i.find((e) => e.id === l.id);
		if (e) {
			let r = Ho(l.currentX - l.offsetX, 0, t - e.width), i = Ho(l.currentY - l.offsetY, 0, n - e.height);
			O = {
				...e,
				x: r,
				y: i
			};
		}
	}
	let k = null;
	if (l.kind === "resize") {
		let { corner: e, origBox: r, currentX: i, currentY: a } = l, { x: o, y: s, width: c, height: u } = r;
		if (e === "nw") {
			let e = Ho(i, 0, o + c - 4), t = Ho(a, 0, s + u - 4);
			c = o + c - e, u = s + u - t, o = e, s = t;
		} else if (e === "ne") {
			let e = Ho(a, 0, s + u - 4);
			c = Ho(i - o, 4, t - o), u = s + u - e, s = e;
		} else if (e === "sw") {
			let e = Ho(i, 0, o + c - 4);
			c = o + c - e, u = Ho(a - s, 4, n - s), o = e;
		} else c = Ho(i - o, 4, t - o), u = Ho(a - s, 4, n - s);
		k = {
			...r,
			x: o,
			y: s,
			width: c,
			height: u
		};
	}
	let A = /* @__PURE__ */ new Set();
	l.kind === "move" && A.add(l.id), l.kind === "resize" && A.add(l.id);
	let ee = (e, t) => /* @__PURE__ */ H("button", {
		type: "button",
		"aria-label": `Resize ${t}`,
		className: r("absolute h-3 w-3 rounded-sm border border-primary bg-white shadow", {
			nw: "-top-1.5 -left-1.5 cursor-nw-resize",
			ne: "-top-1.5 -right-1.5 cursor-ne-resize",
			sw: "-bottom-1.5 -left-1.5 cursor-sw-resize",
			se: "-bottom-1.5 -right-1.5 cursor-se-resize"
		}[t]),
		onPointerDown: (n) => b(n, e, t)
	}, t), j = (e, i, a, s) => {
		let c = Go(e, t, n), l = d?.id === e.id;
		return /* @__PURE__ */ U("div", {
			role: "none",
			"aria-label": `Bounding box${e.label ? ": " + e.label : ""}`,
			className: r("absolute", i ? "opacity-60" : "opacity-100"),
			style: {
				left: c.left,
				top: c.top,
				width: c.width,
				height: c.height,
				border: "2px solid #6366f1",
				background: "rgba(99,102,241,0.1)",
				borderRadius: 2,
				boxSizing: "border-box"
			},
			children: [l ? /* @__PURE__ */ H("input", {
				ref: p,
				type: "text",
				value: d.value,
				onChange: (e) => f((t) => t ? {
					...t,
					value: e.target.value
				} : null),
				onBlur: E,
				onKeyDown: (e) => {
					e.key === "Enter" && (e.preventDefault(), E()), e.key === "Escape" && (e.preventDefault(), f(null));
				},
				className: "absolute -top-5 left-0 w-24 rounded border border-primary bg-white px-1 py-0 text-[10px] font-semibold text-primary shadow outline-none focus:ring-1 focus:ring-primary",
				onClick: (e) => e.stopPropagation()
			}) : /* @__PURE__ */ H("button", {
				type: "button",
				tabIndex: 0,
				"aria-label": `Label: ${e.label || "Unlabeled"}. Double-click to edit.`,
				className: "absolute -top-5 left-0 rounded bg-primary px-1.5 py-0.5 text-[10px] font-semibold leading-none text-white shadow",
				style: { whiteSpace: "nowrap" },
				onDoubleClick: (t) => T(t, e),
				onContextMenu: (t) => C(t, e.id),
				onKeyDown: (t) => w(t, e.id),
				children: e.label || "Unlabeled"
			}), a && !o && /* @__PURE__ */ U(V, { children: [
				ee(e, "nw"),
				ee(e, "ne"),
				ee(e, "sw"),
				ee(e, "se")
			] })]
		}, s);
	};
	return /* @__PURE__ */ U("div", {
		className: r("relative w-full select-none overflow-hidden rounded-lg border border-border bg-black/5", s),
		"aria-label": "Bounding box authoring canvas",
		"data-testid": "bbox-authoring-canvas",
		children: [
			/* @__PURE__ */ H("img", {
				src: e,
				alt: "",
				className: "block h-auto w-full object-contain",
				draggable: !1
			}),
			/* @__PURE__ */ U("div", {
				ref: c,
				"data-testid": "bbox-authoring-overlay",
				className: r("absolute inset-0", o ? "pointer-events-none" : "cursor-crosshair"),
				onPointerDown: o ? void 0 : y,
				onPointerMove: o ? void 0 : x,
				onPointerUp: o ? void 0 : S,
				children: [
					i.map((e) => A.has(e.id) ? null : j(e, !1, !0, `box-${e.id}`)),
					O && j(O, !0, !1, "ghost-move"),
					k && j(k, !0, !0, "ghost-resize"),
					(() => {
						if (!D) return null;
						let e = Go(D, t, n);
						return /* @__PURE__ */ H("div", {
							"aria-hidden": !0,
							className: "pointer-events-none absolute",
							style: {
								left: e.left,
								top: e.top,
								width: e.width,
								height: e.height,
								border: "2px dashed #6366f1",
								background: "rgba(99,102,241,0.08)",
								borderRadius: 2,
								boxSizing: "border-box",
								opacity: .8
							}
						}, "ghost-create");
					})()
				]
			}),
			!o && /* @__PURE__ */ H("div", {
				className: "pointer-events-none absolute bottom-1.5 right-2 rounded bg-black/40 px-1.5 py-0.5 text-[10px] text-white/80",
				children: "Drag to add box"
			})
		]
	});
}
//#endregion
//#region src/components/pipelines/nodes/crop/CropConfig.tsx
var Jo = [
	"$.scatter.item.bbox",
	"$.steps.visionAnalyze.output.extracted.regions[0].bbox",
	"$.trigger.payload.bbox"
], Yo = "crop-region", Xo = "crop", Zo = "Crop region", Qo = "text-[11px] text-text-tertiary mt-0.5";
function $o(e) {
	let { definition: t } = pe(), n = R(() => !e || !t ? null : t.edges.find((t) => t.target === e)?.source ?? null, [t, e]), r = F(n ?? "")?.images?.[0];
	return r ? {
		imageId: r.imageId,
		width: r.width,
		height: r.height
	} : null;
}
function es({ data: e, onChange: t, currentNodeId: n }) {
	ga(n ?? null);
	let i = e.materialize !== !1, a = $o(n), o = Fe(), s = R(() => e.bbox ? [{
		id: Yo,
		x: e.bbox.x,
		y: e.bbox.y,
		width: e.bbox.width,
		height: e.bbox.height,
		label: Xo
	}] : [], [e.bbox]), c = I((e) => {
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
	return /* @__PURE__ */ U(X, { children: [
		/* @__PURE__ */ H(_a, {
			value: e.sourceImagePath,
			onChange: (e) => t({ sourceImagePath: e }),
			nodeId: n ?? void 0,
			help: "JSONPath to the imageId of the source image. Defaults server-side to $.scatter.parentImageId.",
			placeholder: "$.scatter.parentImageId"
		}),
		/* @__PURE__ */ H(Y, {
			label: "Bounding-box path",
			help: "Optional. JSONPath to a bbox object { x, y, width, height } in pixels. Overrides the manual crop region below when present at run time.",
			controlId: "crop-bbox-path",
			render: ({ describedById: n, controlId: r, labelId: i }) => /* @__PURE__ */ U(V, { children: [/* @__PURE__ */ H(D, {
				id: r,
				"aria-describedby": n,
				size: "sm",
				mono: !0,
				spellCheck: !1,
				value: e.bboxPath ?? "",
				onChange: (e) => t({ bboxPath: e.target.value.trim() || void 0 }),
				placeholder: "$.scatter.item.bbox"
			}), /* @__PURE__ */ H(ca, {
				samples: Jo,
				onSelect: (e) => t({ bboxPath: e }),
				"aria-label": "Common bbox paths"
			})] })
		}),
		/* @__PURE__ */ U("div", {
			"data-testid": "crop-region-section",
			role: "group",
			"aria-label": Zo,
			children: [/* @__PURE__ */ H(Y, {
				label: Zo,
				help: "Optional. Drag on the source image to paint the crop box. Drawing a new box replaces the previous one.",
				children: /* @__PURE__ */ H(V, {})
			}), a ? /* @__PURE__ */ U(V, { children: [/* @__PURE__ */ H(qo, {
				imageUrl: o(a.imageId),
				imageWidth: a.width,
				imageHeight: a.height,
				boxes: s,
				onChange: c,
				className: "mt-1.5"
			}), /* @__PURE__ */ H("div", {
				className: "mt-1.5 flex flex-wrap gap-1",
				"data-testid": "crop-region-chips",
				children: e.bbox ? /* @__PURE__ */ U(V, { children: [
					/* @__PURE__ */ U(x, {
						tone: "neutral",
						size: "xs",
						mono: !0,
						"data-testid": "crop-chip-x",
						children: ["x: ", e.bbox.x]
					}),
					/* @__PURE__ */ U(x, {
						tone: "neutral",
						size: "xs",
						mono: !0,
						"data-testid": "crop-chip-y",
						children: ["y: ", e.bbox.y]
					}),
					/* @__PURE__ */ U(x, {
						tone: "neutral",
						size: "xs",
						mono: !0,
						"data-testid": "crop-chip-width",
						children: ["w: ", e.bbox.width]
					}),
					/* @__PURE__ */ U(x, {
						tone: "neutral",
						size: "xs",
						mono: !0,
						"data-testid": "crop-chip-height",
						children: ["h: ", e.bbox.height]
					})
				] }) : /* @__PURE__ */ H("span", {
					className: r(Qo, "italic"),
					children: "No crop region yet — drag on the image to add one."
				})
			})] }) : /* @__PURE__ */ H(v, {
				variant: "info",
				className: "mt-1.5",
				"data-testid": "crop-region-empty-banner",
				children: "Run the upstream node once to populate the source image, then drag here to paint a crop region."
			})]
		}),
		/* @__PURE__ */ H(va, {
			label: "Persist crop to blob store",
			checked: i,
			onChange: (e) => t({ materialize: e }),
			help: "On by default. The cropped image is saved to the image blob store.",
			"data-testid": "crop-materialize"
		})
	] });
}
function ts(e) {
	let { selectedNodeId: t } = pe();
	return /* @__PURE__ */ H(es, {
		...e,
		currentNodeId: t
	});
}
//#endregion
//#region src/components/pipelines/nodes/adjust-bw/AdjustBwConfig.tsx
var ns = [
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
function rs({ data: e, onChange: t, nodeId: n }) {
	let r = e.algorithm ?? "luminosity", i = e.contrast ?? 1;
	return /* @__PURE__ */ U(X, { children: [
		/* @__PURE__ */ H(_a, {
			value: e.sourceImagePath,
			onChange: (e) => t({ sourceImagePath: e }),
			nodeId: n,
			help: "JSONPath to the imageId of the source image.",
			placeholder: "$.scatter.parentImageId"
		}),
		/* @__PURE__ */ H(Y, {
			label: "Greyscale algorithm",
			help: "Controls how RGB channels are weighted when converting to greyscale.",
			controlId: "adjust-bw-algorithm",
			render: ({ describedById: e, controlId: n }) => /* @__PURE__ */ H(Ye, {
				id: n,
				"aria-describedby": e,
				size: "sm",
				value: r,
				onChange: (e) => t({ algorithm: e.target.value }),
				options: ns
			})
		}),
		/* @__PURE__ */ H(Y, {
			label: "Contrast multiplier",
			help: "Applied after greyscale conversion. 1 is no change, below 1 lowers contrast, above 1 raises it. Range 0–4.",
			controlId: "adjust-bw-contrast",
			render: ({ describedById: e, controlId: n }) => /* @__PURE__ */ H(P, {
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
function is({ value: e, onChange: t, uploadImage: n, getImageUrl: i, maxSize: a = 8388608, accept: o = "image/*", fileOnly: s = !1, urlOnly: c = !1, className: l, "data-testid": u }) {
	let [d, f] = B(!1), [p, h] = B(null), [g, v] = B("");
	async function y(e) {
		f(!0), h(null);
		try {
			t(await n(e)), v("");
		} catch (e) {
			let t = e instanceof Error ? e.message : "Upload failed. Please try again.";
			h(t);
		} finally {
			f(!1);
		}
	}
	function b(e) {
		e.length > 0 && y(e[0]);
	}
	async function x() {
		let e = g.trim();
		e && await y({ url: e });
	}
	if (e) {
		let n = i(e.imageId);
		return /* @__PURE__ */ H("div", {
			className: r("flex flex-col gap-3", l),
			"data-testid": u,
			children: /* @__PURE__ */ U("div", {
				className: "flex items-start gap-3",
				children: [/* @__PURE__ */ H(Ne, {
					src: n,
					alt: "Uploaded image",
					size: "md",
					aspectRatio: "square",
					"data-testid": u ? `${u}-thumbnail` : void 0
				}), /* @__PURE__ */ H(m, {
					variant: "ghost",
					size: "sm",
					onClick: () => t(null),
					"data-testid": u ? `${u}-replace` : void 0,
					children: "Replace"
				})]
			})
		});
	}
	return /* @__PURE__ */ U("div", {
		className: r("flex flex-col gap-3", l),
		"data-testid": u,
		children: [
			d && /* @__PURE__ */ H("p", {
				className: "text-sm text-neutral",
				"data-testid": u ? `${u}-uploading` : void 0,
				children: "Uploading..."
			}),
			!c && /* @__PURE__ */ H(_, {
				accept: o,
				maxSize: a,
				onFiles: b,
				disabled: d,
				"data-testid": u ? `${u}-drop` : void 0
			}),
			!s && /* @__PURE__ */ U("div", {
				className: "flex items-center gap-2",
				"data-testid": u ? `${u}-url-row` : void 0,
				children: [/* @__PURE__ */ H(D, {
					type: "url",
					placeholder: "https://example.com/image.jpg",
					value: g,
					onChange: (e) => v(e.target.value),
					disabled: d,
					"data-testid": u ? `${u}-url-input` : void 0,
					onKeyDown: (e) => {
						e.key === "Enter" && x();
					}
				}), /* @__PURE__ */ H(m, {
					variant: "secondary",
					size: "sm",
					onClick: () => void x(),
					disabled: d || !g.trim(),
					"data-testid": u ? `${u}-fetch-btn` : void 0,
					children: "Fetch"
				})]
			}),
			p && /* @__PURE__ */ H("p", {
				role: "alert",
				className: "text-sm text-danger-fg",
				"data-testid": u ? `${u}-error` : void 0,
				children: p
			})
		]
	});
}
function as(e) {
	let t = Ve(), n = t.uploadImage;
	return n ? /* @__PURE__ */ H(is, {
		...e,
		uploadImage: n,
		getImageUrl: t.getImageUrl
	}) : /* @__PURE__ */ H("div", {
		className: "text-sm text-neutral",
		children: "This host has not wired uploadImage. Cannot accept new uploads."
	});
}
//#endregion
//#region src/components/pipelines/nodes/adjust-layer/AdjustLayerSliderPanel.tsx
var os = {
	brightness: "Brightness",
	contrast: "Contrast",
	saturation: "Saturation",
	hue: "Hue",
	blur: "Blur"
}, ss = Object.keys(os).map((e) => ({
	value: e,
	label: os[e]
})), cs = {
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
function ls(e) {
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
function us(e) {
	switch (e.kind) {
		case "hue": return e.degrees;
		case "blur": return e.radiusPx;
		default: return e.value;
	}
}
function ds(e, t) {
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
var fs = r("w-4 h-full flex items-center justify-center", "text-[14px] text-text-tertiary cursor-grab select-none shrink-0");
r("text-[11px] font-semibold px-2 py-0.5 rounded-full", "bg-surface-hover border border-border text-text-secondary", "whitespace-nowrap shrink-0");
function ps({ layer: e, index: t, onUpdate: n, onRemove: i }) {
	let a = cs[e.kind], o = us(e), s = (e) => {
		n(ls(e.target.value));
	}, c = (t) => {
		n(ds(e, t));
	};
	return /* @__PURE__ */ U("div", {
		className: "flex items-center gap-2 px-2 py-1.5 rounded-md border border-border bg-surface-inset",
		"data-testid": `layer-row-${t}`,
		children: [
			/* @__PURE__ */ H("span", {
				className: fs,
				"aria-hidden": "true",
				title: "Drag handle",
				children: "⠿"
			}),
			/* @__PURE__ */ H(Ye, {
				value: e.kind,
				onChange: s,
				options: ss,
				size: "sm",
				"aria-label": `Layer ${t + 1} kind`,
				"data-testid": `layer-kind-select-${t}`,
				className: "shrink-0"
			}),
			/* @__PURE__ */ H(We, {
				min: a.min,
				max: a.max,
				step: a.step,
				value: o,
				onChange: c,
				readout: !1,
				className: "flex-1 min-w-0",
				"aria-label": `${os[e.kind]} slider`,
				"data-testid": `layer-slider-${t}`
			}),
			/* @__PURE__ */ H(P, {
				value: o,
				onChange: c,
				min: a.min,
				max: a.max,
				step: a.step,
				unit: a.unit,
				size: "sm",
				"data-testid": `layer-number-${t}`
			}),
			/* @__PURE__ */ H("button", {
				type: "button",
				onClick: i,
				className: r("shrink-0 w-6 h-6 flex items-center justify-center rounded", "text-[12px] text-text-tertiary bg-transparent border-none", "cursor-pointer hover:text-danger-fg hover:bg-danger-bg"),
				"aria-label": `Remove layer ${t + 1}`,
				"data-testid": `layer-remove-${t}`,
				children: "✕"
			})
		]
	});
}
var ms = 150;
function hs(e, t, n) {
	let [r, i] = B(null), [a, o] = B(!1), s = z(null), c = z(null), l = I(async (e, t) => {
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
	return L(() => {
		if (!e) {
			i(null);
			return;
		}
		return s.current && clearTimeout(s.current), s.current = setTimeout(() => {
			l(e, t);
		}, ms), () => {
			s.current && clearTimeout(s.current);
		};
	}, [
		e,
		JSON.stringify(t),
		l
	]), L(() => () => c.current?.abort(), []), {
		previewSrc: r,
		loading: a
	};
}
function gs(e) {
	return e.length <= 8 ? e : `${e.slice(0, 8)}…`;
}
function _s({ layers: e, onChange: t, autoSourceImageId: n, pinnedSourceImageId: i, onPinnedSourceImageIdChange: a, sourceImageId: o, apiBase: s = "" }) {
	let [c, l] = B("brightness"), [u, d] = B(!1), f = n ?? o, p = i ?? f, h = !!i, { previewSrc: g, loading: _ } = hs(p, e, s), v = () => {
		a?.(void 0);
	}, y = (e) => {
		e?.imageId && (a?.(e.imageId), d(!1));
	}, b = (n, r) => {
		t(e.map((e, t) => t === n ? r : e));
	}, S = (n) => {
		t(e.filter((e, t) => t !== n));
	};
	return /* @__PURE__ */ U("div", {
		className: "flex gap-3 p-3",
		"data-testid": "adjust-layer-slider-panel",
		children: [/* @__PURE__ */ U("div", {
			className: "flex-1 flex flex-col gap-2 min-w-0",
			children: [
				e.length === 0 && /* @__PURE__ */ H("div", {
					className: "text-[11px] text-text-tertiary italic",
					children: "No layers — add one below."
				}),
				e.map((e, t) => /* @__PURE__ */ H(ps, {
					layer: e,
					index: t,
					onUpdate: (e) => b(t, e),
					onRemove: () => S(t)
				}, t)),
				/* @__PURE__ */ U("div", {
					className: "flex items-center gap-2 mt-1",
					children: [/* @__PURE__ */ H(Ye, {
						value: c,
						onChange: (e) => {
							l(e.target.value);
						},
						options: ss,
						size: "sm",
						"aria-label": "New layer kind",
						"data-testid": "new-layer-kind-select"
					}), /* @__PURE__ */ H("button", {
						type: "button",
						onClick: () => {
							t([...e, ls(c)]);
						},
						className: r("text-[12px] font-semibold px-3 py-1 rounded-md cursor-pointer", "bg-primary text-white border-none hover:bg-primary/90"),
						"data-testid": "add-layer-btn",
						children: "+ Add layer"
					})]
				})
			]
		}), /* @__PURE__ */ U("div", {
			className: "shrink-0 flex flex-col items-stretch gap-1.5",
			children: [
				/* @__PURE__ */ H("div", {
					className: "text-[11px] font-semibold text-text-tertiary",
					children: "Preview"
				}),
				/* @__PURE__ */ U("div", {
					className: r("flex items-center gap-1.5 flex-wrap"),
					"data-testid": "adjust-layer-source-caption-row",
					children: [h && p ? /* @__PURE__ */ U(x, {
						tone: "neutral",
						size: "xs",
						"data-testid": "adjust-layer-source-chip-pinned",
						children: [/* @__PURE__ */ U("span", { children: [
							"Source: pinned (",
							gs(p),
							")"
						] }), /* @__PURE__ */ H("button", {
							type: "button",
							onClick: v,
							"aria-label": "Clear pinned source image",
							"data-testid": "adjust-layer-source-clear-pin",
							className: r("ml-1 inline-flex items-center justify-center", "w-3 h-3 rounded-full text-[10px] leading-none", "bg-transparent border-none cursor-pointer text-current", "hover:bg-surface-emphasis"),
							children: "×"
						})]
					}) : f ? /* @__PURE__ */ U(x, {
						tone: "info",
						size: "xs",
						"data-testid": "adjust-layer-source-chip-auto",
						children: [
							"Source: ",
							gs(f),
							" from upstream run"
						]
					}) : null, a && /* @__PURE__ */ H(m, {
						variant: "ghost",
						size: "sm",
						onClick: () => d((e) => !e),
						"data-testid": "adjust-layer-override-btn",
						children: "Override"
					})]
				}),
				u && a && /* @__PURE__ */ H("div", {
					className: "w-48",
					"data-testid": "adjust-layer-override-uploader-wrap",
					children: /* @__PURE__ */ H(as, {
						value: null,
						onChange: y,
						"data-testid": "adjust-layer-override-uploader"
					})
				}),
				p ? /* @__PURE__ */ U("div", {
					className: "relative",
					children: [/* @__PURE__ */ H(Ne, {
						src: g ?? "",
						alt: "Adjust layer preview",
						size: "lg",
						aspectRatio: "auto",
						loading: "eager",
						"data-testid": "adjust-layer-preview-thumb"
					}), _ && /* @__PURE__ */ H("div", {
						className: "absolute inset-0 flex items-center justify-center bg-white/60 rounded-md",
						children: /* @__PURE__ */ H("span", {
							className: "text-[11px] text-text-secondary",
							children: "Loading…"
						})
					})]
				}) : /* @__PURE__ */ H("div", {
					className: r("w-48 h-32 rounded-md border border-dashed border-border", "flex items-center justify-center text-[11px] text-text-tertiary", "bg-surface-inset"),
					"data-testid": "adjust-layer-no-source",
					children: "No source image"
				})
			]
		})]
	});
}
//#endregion
//#region src/components/pipelines/nodes/adjust-layer/AdjustLayerConfig.tsx
var vs = "Adjustment layers";
function ys(e) {
	let { definition: t } = pe(), n = R(() => !e || !t ? null : t.edges.find((t) => t.target === e)?.source ?? null, [t, e]);
	return F(n ?? "")?.images?.[0]?.imageId;
}
function bs({ data: e, onChange: t, currentNodeId: n }) {
	ga(n ?? null);
	let r = ys(n), i = e.previewSourceImageId, a = e.layers ?? [];
	return /* @__PURE__ */ U(X, { children: [/* @__PURE__ */ H(_a, {
		value: e.sourceImagePath,
		onChange: (e) => t({ sourceImagePath: e }),
		nodeId: n ?? void 0,
		help: "JSONPath to the imageId of the source image.",
		placeholder: "$.scatter.parentImageId"
	}), /* @__PURE__ */ H(Y, {
		label: vs,
		help: "Applied top-to-bottom.",
		render: ({ describedById: e, labelId: n }) => /* @__PURE__ */ H("div", {
			role: "group",
			"aria-labelledby": n,
			"aria-describedby": e,
			children: /* @__PURE__ */ H(_s, {
				layers: a,
				onChange: (e) => t({ layers: e }),
				autoSourceImageId: r,
				pinnedSourceImageId: i,
				onPinnedSourceImageIdChange: (e) => t({ previewSourceImageId: e })
			})
		})
	})] });
}
function xs(e) {
	let { selectedNodeId: t } = pe();
	return /* @__PURE__ */ H(bs, {
		...e,
		currentNodeId: t
	});
}
//#endregion
//#region src/components/pipelines/nodes/dimensions/DimensionsConfig.tsx
var Ss = 1024;
function Cs({ data: e, onChange: t, nodeId: n }) {
	return /* @__PURE__ */ U(X, { children: [/* @__PURE__ */ H(_a, {
		value: e.sourceImagePath,
		onChange: (e) => t({ sourceImagePath: e }),
		nodeId: n
	}), /* @__PURE__ */ H(Y, {
		label: "Max edge",
		help: "Longest-edge cap. The derived genWidth/genHeight scale to fit within it while preserving aspect ratio — wire them into image:generate.",
		controlId: "dimensions-max-edge",
		render: ({ describedById: n, controlId: r }) => /* @__PURE__ */ H(P, {
			id: r,
			"aria-describedby": n,
			size: "sm",
			min: 1,
			step: 1,
			unit: "px",
			value: e.maxEdge ?? Ss,
			onChange: (e) => t({ maxEdge: e }),
			"data-testid": "dimensions-max-edge"
		})
	})] });
}
//#endregion
//#region src/components/pipelines/nodes/upscale/UpscaleConfig.tsx
var ws = 1024;
function Ts({ data: e, onChange: t, nodeId: n }) {
	return /* @__PURE__ */ U(X, { children: [
		/* @__PURE__ */ H(Y, {
			label: "Prompt",
			help: "Optional text guidance forwarded to the upscaler.",
			controlId: "upscale-prompt",
			render: ({ describedById: n, controlId: r }) => /* @__PURE__ */ H(O, {
				id: r,
				"aria-describedby": n,
				rows: 3,
				spellCheck: !1,
				value: e.prompt ?? "",
				onChange: (e) => t({ prompt: e.target.value.trim() ? e.target.value : void 0 }),
				placeholder: "optional guidance forwarded to the upscaler"
			})
		}),
		/* @__PURE__ */ H(Y, {
			label: "Max edge",
			help: "Longest-edge cap applied before the super-resolution pass.",
			controlId: "upscale-max-edge",
			render: ({ describedById: n, controlId: r }) => /* @__PURE__ */ H(P, {
				id: r,
				"aria-describedby": n,
				size: "sm",
				min: 1,
				step: 1,
				unit: "px",
				value: e.maxEdge ?? ws,
				onChange: (e) => t({ maxEdge: e }),
				"data-testid": "upscale-max-edge"
			})
		}),
		/* @__PURE__ */ H(_a, {
			value: e.sourceImagePath,
			onChange: (e) => t({ sourceImagePath: e }),
			nodeId: n
		})
	] });
}
//#endregion
//#region src/components/pipelines/nodes/vision/VisionConfig.tsx
var Es = [
	{ value: "claude-opus-4-7" },
	{ value: "claude-sonnet-4-6" },
	{ value: "claude-haiku-4-5-20251001" }
];
function Ds(e) {
	if (!e) return !1;
	let t = e.properties;
	if (!t || typeof t != "object" || Array.isArray(t)) return !1;
	let n = t.regions;
	return typeof n == "object" && !!n;
}
function Os(e) {
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
var ks = "{\n  \"type\": \"object\",\n  \"properties\": {\n    \"caption\": { \"type\": \"string\" }\n  }\n}";
function As({ data: e, onChange: t, nodeId: n }) {
	let r = tt(), i = ga(n ?? null), a = Ae("image:vision-analyze", Es), [o, s] = B(!1), [c, l] = B(e.outputSchema ? JSON.stringify(e.outputSchema, null, 2) : ""), [u, d] = B(null), f = !e.userPrompt?.trim(), p = !e.imageRefPath?.trim(), m = !!e.imageRefPath && !e.imageRefPath.startsWith("$."), h = Ds(e.outputSchema), g = I((e) => {
		t({ seedRegions: e });
	}, [t]), _ = (e) => {
		l(e);
		let n = Os(e);
		if (!n.ok) {
			d(n.error);
			return;
		}
		d(null), t({ outputSchema: n.value });
	}, v = p ? "Image reference path is required." : m ? "Path must start with $." : void 0;
	return /* @__PURE__ */ U(X, { children: [
		/* @__PURE__ */ H(Y, {
			label: "Model",
			help: "Requires the host's vision credentials on the executor.",
			controlId: `${r}-model`,
			render: ({ controlId: n, describedById: r }) => /* @__PURE__ */ H(Ye, {
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
		/* @__PURE__ */ H(Y, {
			label: "Image reference path",
			required: !0,
			error: v,
			help: "JSONPath into context. The value must be a string imageId, or an object with one.",
			controlId: `${r}-image-ref-path`,
			render: ({ controlId: n, describedById: r }) => /* @__PURE__ */ U(V, { children: [/* @__PURE__ */ H(D, {
				size: "sm",
				mono: !0,
				spellCheck: !1,
				invalid: !!v,
				id: n,
				"aria-describedby": r,
				value: e.imageRefPath ?? "",
				onChange: (e) => t({ imageRefPath: e.target.value }),
				placeholder: "$.trigger.imageRef"
			}), /* @__PURE__ */ H(ca, {
				samples: i.map((e) => e.path),
				onSelect: (e) => t({ imageRefPath: e }),
				"aria-label": "Upstream image refs"
			})] })
		}),
		/* @__PURE__ */ H(Y, {
			label: "User prompt",
			required: !0,
			error: f ? "User prompt is required." : void 0,
			help: "Supports {{ context.* }} substitution.",
			controlId: `${r}-user-prompt`,
			render: ({ controlId: n, describedById: r }) => /* @__PURE__ */ H(O, {
				rows: 4,
				invalid: f,
				id: n,
				"aria-describedby": r,
				value: e.userPrompt,
				onChange: (e) => t({ userPrompt: e.target.value })
			})
		}),
		h && /* @__PURE__ */ H(Y, {
			label: "Focus regions",
			help: "Drag on the image to paint focus boxes. The next vision pass uses these as analysis hints.",
			render: ({ describedById: t, labelId: n }) => /* @__PURE__ */ U("div", {
				role: "group",
				"aria-labelledby": n,
				"aria-describedby": t,
				children: [/* @__PURE__ */ H(qo, {
					imageUrl: "",
					imageWidth: 800,
					imageHeight: 600,
					boxes: e.seedRegions ?? [],
					onChange: g
				}), (e.seedRegions?.length ?? 0) > 0 && /* @__PURE__ */ U("div", {
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
		/* @__PURE__ */ H(Y, {
			label: "Output schema",
			error: u ? `Invalid JSON: ${u}` : void 0,
			help: e.outputSchema ? "Extract mode — the model must return JSON matching this schema." : "Leave blank for caption mode (freeform analysis text).",
			controlId: `${r}-output-schema`,
			render: ({ controlId: e, describedById: t }) => /* @__PURE__ */ H(O, {
				rows: 6,
				invalid: !!u,
				className: "font-mono text-[11px]",
				id: e,
				"aria-describedby": t,
				value: c,
				onChange: (e) => _(e.target.value),
				placeholder: ks
			})
		}),
		/* @__PURE__ */ U("div", { children: [/* @__PURE__ */ U("button", {
			type: "button",
			onClick: () => s((e) => !e),
			"aria-expanded": o,
			className: "bg-transparent border-none p-0 cursor-pointer font-inherit text-[12px] font-semibold text-text-secondary flex items-center gap-1",
			children: [/* @__PURE__ */ H("span", {
				"aria-hidden": "true",
				children: o ? "▾" : "▸"
			}), " Advanced"]
		}), o && /* @__PURE__ */ U("div", {
			className: "flex flex-col gap-3 mt-2",
			children: [/* @__PURE__ */ H(Y, {
				label: "Max output tokens",
				help: "Caps the response length. Default 2048.",
				controlId: `${r}-max-output-tokens`,
				render: ({ controlId: n, describedById: r }) => /* @__PURE__ */ H(P, {
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
			}), /* @__PURE__ */ H(Y, {
				label: "System prompt override",
				help: "Schema instructions are auto-appended when an output schema is set.",
				controlId: `${r}-system-prompt`,
				render: ({ controlId: n, describedById: r }) => /* @__PURE__ */ H(O, {
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
var js = [{
	value: "claude-haiku-4-5",
	label: "Claude Haiku 4.5 (default — fast)"
}, {
	value: "claude-sonnet-4-6",
	label: "Claude Sonnet 4.6 (more accurate)"
}];
function Ms({ data: e, onChange: t, nodeId: n }) {
	let r = Ae("image:vision", js), i = !e.imageRefPath?.trim();
	return /* @__PURE__ */ U(X, { children: [
		/* @__PURE__ */ H(_a, {
			value: e.imageRefPath,
			onChange: (e) => t({ imageRefPath: e ?? "" }),
			nodeId: n,
			label: "Image ref path",
			help: i ? "Required — JSONPath to the imageId to tag." : "JSONPath to the imageId to tag."
		}),
		/* @__PURE__ */ H(Y, {
			label: "Candidate tags",
			help: "Restricts tagging to this vocabulary. Leave empty for open-ended tags.",
			children: /* @__PURE__ */ H(o, {
				value: e.candidateTags ?? [],
				onChange: (e) => t({ candidateTags: e }),
				placeholder: "Add candidate tag…",
				lowercase: !1
			})
		}),
		/* @__PURE__ */ H(Y, {
			label: "Max tags",
			help: "Default 10.",
			controlId: "vision-tag-max-tags",
			render: ({ describedById: n, controlId: r }) => /* @__PURE__ */ H(P, {
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
		/* @__PURE__ */ H(Y, {
			label: "Model",
			children: /* @__PURE__ */ H(Ye, {
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
		/* @__PURE__ */ H(Y, {
			label: "System prompt override",
			help: "Optional. Sent verbatim — {{context.*}} is NOT substituted here.",
			children: /* @__PURE__ */ H(O, {
				rows: 3,
				spellCheck: !1,
				value: e.systemPrompt ?? "",
				onChange: (e) => t({ systemPrompt: e.target.value || void 0 }),
				placeholder: "Leave blank to use the default tagging system prompt.",
				"aria-label": "System prompt override"
			})
		}),
		/* @__PURE__ */ H(Y, {
			label: "Max output tokens",
			help: "Default 256.",
			children: /* @__PURE__ */ H(P, {
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
var Ns = 2;
function Ps({ data: e, onChange: t, nodeId: n }) {
	let r = tt(), i = Ae("image:vision", js), a = e.labels ?? [], s = !e.imageRefPath?.trim();
	return /* @__PURE__ */ U(X, { children: [
		/* @__PURE__ */ H(_a, {
			value: e.imageRefPath,
			onChange: (e) => t({ imageRefPath: e ?? "" }),
			nodeId: n,
			label: "Image ref path",
			help: s ? "Required — JSONPath to the imageId to classify." : "JSONPath to the imageId to classify."
		}),
		/* @__PURE__ */ H(Y, {
			label: "Labels",
			required: !0,
			error: a.length < Ns ? `At least ${Ns} labels are required to classify between.` : void 0,
			help: "The model returns the single best-matching label.",
			render: ({ describedById: e, labelId: n }) => /* @__PURE__ */ H("div", {
				role: "group",
				"aria-labelledby": n,
				"aria-describedby": e,
				children: /* @__PURE__ */ H(o, {
					value: a,
					onChange: (e) => t({ labels: e }),
					placeholder: "Add label…",
					lowercase: !1
				})
			})
		}),
		/* @__PURE__ */ H(Y, {
			label: "Model",
			controlId: `${r}-model`,
			render: ({ controlId: n, describedById: r }) => /* @__PURE__ */ H(Ye, {
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
		/* @__PURE__ */ H(Y, {
			label: "System prompt override",
			help: "Optional. Sent verbatim — {{context.*}} is NOT substituted here.",
			controlId: `${r}-system-prompt`,
			render: ({ controlId: n, describedById: r }) => /* @__PURE__ */ H(O, {
				rows: 3,
				spellCheck: !1,
				id: n,
				"aria-describedby": r,
				value: e.systemPrompt ?? "",
				onChange: (e) => t({ systemPrompt: e.target.value || void 0 }),
				placeholder: "Leave blank to use the default classification system prompt."
			})
		}),
		/* @__PURE__ */ H(Y, {
			label: "Max output tokens",
			help: "Default 256.",
			controlId: `${r}-max-output-tokens`,
			render: ({ controlId: n, describedById: r }) => /* @__PURE__ */ H(P, {
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
function Fs({ data: e, onChange: t, nodeId: n }) {
	let r = tt(), i = Ae("image:vision", js), a = !e.imageRefPath?.trim(), o = !e.userPrompt?.trim();
	return /* @__PURE__ */ U(X, { children: [
		/* @__PURE__ */ H(_a, {
			value: e.imageRefPath,
			onChange: (e) => t({ imageRefPath: e ?? "" }),
			nodeId: n,
			label: "Image ref path",
			help: a ? "Required — JSONPath to the imageId to describe." : "JSONPath to the imageId to describe."
		}),
		/* @__PURE__ */ H(Y, {
			label: "User prompt",
			required: !0,
			error: o ? "User prompt is required." : void 0,
			help: "What to ask the model about the image.",
			controlId: `${r}-user-prompt`,
			render: ({ controlId: n, describedById: r }) => /* @__PURE__ */ H(O, {
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
		/* @__PURE__ */ H(Y, {
			label: "Model",
			controlId: `${r}-model`,
			render: ({ controlId: n, describedById: r }) => /* @__PURE__ */ H(Ye, {
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
		/* @__PURE__ */ H(Y, {
			label: "System prompt override",
			help: "Optional. Sent verbatim — {{context.*}} is NOT substituted here.",
			controlId: `${r}-system-prompt`,
			render: ({ controlId: n, describedById: r }) => /* @__PURE__ */ H(O, {
				rows: 3,
				spellCheck: !1,
				id: n,
				"aria-describedby": r,
				value: e.systemPrompt ?? "",
				onChange: (e) => t({ systemPrompt: e.target.value || void 0 }),
				placeholder: "Leave blank to use the default describe system prompt."
			})
		}),
		/* @__PURE__ */ H(Y, {
			label: "Max output tokens",
			help: "Default 512.",
			controlId: `${r}-max-output-tokens`,
			render: ({ controlId: n, describedById: r }) => /* @__PURE__ */ H(P, {
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
var Is = [{
	value: "claude-sonnet-4-6",
	label: "Claude Sonnet 4.6 (default — best OCR accuracy)"
}, {
	value: "claude-haiku-4-5",
	label: "Claude Haiku 4.5 (faster, lower accuracy)"
}];
function Ls({ data: e, onChange: t, nodeId: n }) {
	let r = tt(), i = Ae("image:vision-ocr", Is), a = !e.imageRefPath?.trim();
	return /* @__PURE__ */ U(X, { children: [
		/* @__PURE__ */ H(_a, {
			value: e.imageRefPath,
			onChange: (e) => t({ imageRefPath: e ?? "" }),
			nodeId: n,
			label: "Image ref path",
			help: a ? "Required — JSONPath to the imageId to extract text from." : "JSONPath to the imageId to extract text from."
		}),
		/* @__PURE__ */ H(Y, {
			label: "Model",
			help: "Defaults to the more accurate model for OCR.",
			controlId: `${r}-model`,
			render: ({ controlId: n, describedById: r }) => /* @__PURE__ */ H(Ye, {
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
		/* @__PURE__ */ H(Y, {
			label: "System prompt override",
			help: "Optional. Sent verbatim — {{context.*}} is NOT substituted here.",
			controlId: `${r}-system-prompt`,
			render: ({ controlId: n, describedById: r }) => /* @__PURE__ */ H(O, {
				rows: 3,
				spellCheck: !1,
				id: n,
				"aria-describedby": r,
				value: e.systemPrompt ?? "",
				onChange: (e) => t({ systemPrompt: e.target.value || void 0 }),
				placeholder: "Leave blank to use the default OCR system prompt."
			})
		}),
		/* @__PURE__ */ H(Y, {
			label: "Max output tokens",
			help: "Default 1024. Increase for documents with large amounts of text.",
			controlId: `${r}-max-output-tokens`,
			render: ({ controlId: n, describedById: r }) => /* @__PURE__ */ H(P, {
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
var Rs = [{
	value: "amazon.titan-image-generator-v2:0",
	label: "Titan v2 (default)"
}, {
	value: "amazon.titan-image-generator-v1",
	label: "Titan v1"
}], zs = 64, Bs = 2048, Vs = 8;
function Hs({ data: e, onChange: t }) {
	let n = Ae("image:generate", Rs), r = Le("image:generate"), i = !e.prompt?.trim(), a = e.model ?? n[0]?.value ?? "";
	return /* @__PURE__ */ U(X, { children: [
		/* @__PURE__ */ H(Y, {
			label: r.label("prompt", "Prompt"),
			required: !0,
			error: i ? "Prompt is required." : void 0,
			help: i ? void 0 : r.help("prompt", "Text description of the image to generate."),
			controlId: "generate-prompt",
			render: ({ describedById: n, controlId: a }) => /* @__PURE__ */ H(O, {
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
		/* @__PURE__ */ H(Y, {
			label: r.label("model", "Model"),
			help: n.length === 0 ? "This host declares no image models." : r.help("model"),
			controlId: "generate-model",
			render: ({ describedById: e, controlId: r }) => /* @__PURE__ */ H(Ye, {
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
		/* @__PURE__ */ U("div", {
			className: "flex gap-2",
			children: [/* @__PURE__ */ H("div", {
				className: "flex-1",
				children: /* @__PURE__ */ H(Y, {
					label: r.label("width", "Width"),
					controlId: "generate-width",
					render: ({ describedById: n, controlId: r }) => /* @__PURE__ */ H(P, {
						id: r,
						"aria-describedby": n,
						size: "sm",
						min: zs,
						max: Bs,
						step: 64,
						unit: "px",
						value: e.width ?? 512,
						onChange: (e) => t({ width: e }),
						"data-testid": "generate-width"
					})
				})
			}), /* @__PURE__ */ H("div", {
				className: "flex-1",
				children: /* @__PURE__ */ H(Y, {
					label: r.label("height", "Height"),
					controlId: "generate-height",
					render: ({ describedById: n, controlId: r }) => /* @__PURE__ */ H(P, {
						id: r,
						"aria-describedby": n,
						size: "sm",
						min: zs,
						max: Bs,
						step: 64,
						unit: "px",
						value: e.height ?? 512,
						onChange: (e) => t({ height: e }),
						"data-testid": "generate-height"
					})
				})
			})]
		}),
		/* @__PURE__ */ H(Y, {
			label: r.label("seed", "Seed"),
			help: "Optional — set for a reproducible result.",
			controlId: "generate-seed",
			render: ({ describedById: n, controlId: r }) => /* @__PURE__ */ H(P, {
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
		/* @__PURE__ */ H(Y, {
			label: r.label("numImages", "Number of images"),
			help: "Above 1, the step fans out with one arm per image, each carrying one imageId.",
			controlId: "generate-num-images",
			render: ({ describedById: n, controlId: r }) => /* @__PURE__ */ H(P, {
				id: r,
				"aria-describedby": n,
				size: "sm",
				min: 1,
				max: Vs,
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
var Us = [{
	value: "amazon.nova-canvas-v1:0",
	label: "Nova Canvas v1 (default)"
}], Ws = 8;
function Gs({ data: e, onChange: t, nodeId: n }) {
	let r = Ae("image:edit", Us);
	return /* @__PURE__ */ U(X, { children: [
		/* @__PURE__ */ H(_a, {
			value: e.sourceImagePath,
			onChange: (e) => t({ sourceImagePath: e }),
			nodeId: n
		}),
		/* @__PURE__ */ H(Y, {
			label: "Model",
			controlId: "variation-model",
			render: ({ describedById: n, controlId: i }) => /* @__PURE__ */ H(Ye, {
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
		/* @__PURE__ */ H(Y, {
			label: "Number of variations",
			help: "Always fans out — each variation becomes a separate arm downstream.",
			controlId: "variation-num-variations",
			render: ({ describedById: n, controlId: r }) => /* @__PURE__ */ H(P, {
				id: r,
				"aria-describedby": n,
				size: "sm",
				min: 1,
				max: Ws,
				step: 1,
				value: e.numVariations ?? 1,
				onChange: (e) => t({ numVariations: e }),
				"data-testid": "variation-num-variations"
			})
		}),
		/* @__PURE__ */ H(Y, {
			label: "Similarity",
			help: "0 is very different, 1 is nearly identical. 0.7 is a good starting point.",
			controlId: "variation-similarity",
			render: ({ describedById: n, controlId: r }) => /* @__PURE__ */ H(P, {
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
var Ks = ["$.steps.mask.output.imageId", "$.trigger.maskRef"];
function qs({ data: e, onChange: t, nodeId: n }) {
	let r = Ae("image:edit", Us), i = !e.prompt?.trim();
	return /* @__PURE__ */ U(X, { children: [
		/* @__PURE__ */ H(_a, {
			value: e.sourceImagePath,
			onChange: (e) => t({ sourceImagePath: e }),
			nodeId: n
		}),
		/* @__PURE__ */ H(Y, {
			label: "Mask image path",
			help: "Optional. White pixels are the edit region, black is preserved. Omit for outpainting.",
			controlId: "edit-prompt-mask-path",
			render: ({ describedById: n, controlId: r }) => /* @__PURE__ */ U(V, { children: [/* @__PURE__ */ H(D, {
				id: r,
				"aria-describedby": n,
				size: "sm",
				mono: !0,
				spellCheck: !1,
				value: e.maskImagePath ?? "",
				onChange: (e) => t({ maskImagePath: e.target.value.trim() || void 0 }),
				placeholder: "$.steps.mask.output.imageId"
			}), /* @__PURE__ */ H(ca, {
				samples: Ks,
				onSelect: (e) => t({ maskImagePath: e }),
				"aria-label": "Common mask paths"
			})] })
		}),
		/* @__PURE__ */ H(Y, {
			label: "Edit prompt",
			required: !0,
			error: i ? "Edit prompt is required." : void 0,
			help: "Describes what to generate in the masked region.",
			controlId: "edit-prompt-prompt",
			render: ({ describedById: n, controlId: r }) => /* @__PURE__ */ H(O, {
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
		/* @__PURE__ */ H(Y, {
			label: "Model",
			controlId: "edit-prompt-model",
			render: ({ describedById: n, controlId: i }) => /* @__PURE__ */ H(Ye, {
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
var Js = {
	trigger: /* @__PURE__ */ U(V, { children: [
		/* @__PURE__ */ H("h4", { children: "What it does" }),
		/* @__PURE__ */ H("p", { children: "The entry point of every pipeline. Every pipeline has exactly one trigger." }),
		/* @__PURE__ */ H("h4", { children: "Trigger types" }),
		/* @__PURE__ */ U("ul", { children: [
			/* @__PURE__ */ U("li", { children: [/* @__PURE__ */ H("code", { children: "manual" }), " — started by clicking Run in the editor."] }),
			/* @__PURE__ */ U("li", { children: [
				/* @__PURE__ */ H("code", { children: "document.finalize" }),
				" / ",
				/* @__PURE__ */ H("code", { children: "document.submit" }),
				" / ",
				/* @__PURE__ */ H("code", { children: "document.comment" }),
				" — fires on doc lifecycle events for a given document type."
			] }),
			/* @__PURE__ */ U("li", { children: [
				/* @__PURE__ */ H("code", { children: "schedule" }),
				" — cron expression (e.g. ",
				/* @__PURE__ */ H("code", { children: "0 9 * * 1-5" }),
				")."
			] }),
			/* @__PURE__ */ U("li", { children: [/* @__PURE__ */ H("code", { children: "webhook" }), " — inbound HTTP POST at the configured path."] })
		] }),
		/* @__PURE__ */ H("h4", { children: "Fields" }),
		/* @__PURE__ */ U("ul", { children: [
			/* @__PURE__ */ U("li", { children: [/* @__PURE__ */ H("code", { children: "triggerType" }), " — one of the above."] }),
			/* @__PURE__ */ U("li", { children: [
				/* @__PURE__ */ H("code", { children: "documentTypeId" }),
				" — required for ",
				/* @__PURE__ */ H("code", { children: "document.*" }),
				"."
			] }),
			/* @__PURE__ */ U("li", { children: [
				/* @__PURE__ */ H("code", { children: "schedule" }),
				" / ",
				/* @__PURE__ */ H("code", { children: "webhookPath" }),
				" — per type."
			] })
		] }),
		/* @__PURE__ */ H("h4", { children: "Wiring" }),
		/* @__PURE__ */ U("p", { children: [
			"One output handle ",
			/* @__PURE__ */ H("code", { children: "out" }),
			" that fires downstream with ",
			/* @__PURE__ */ H("code", { children: "{ trigger, payload }" }),
			" as the initial context."
		] })
	] }),
	llm: /* @__PURE__ */ U(V, { children: [
		/* @__PURE__ */ H("h4", { children: "What it does" }),
		/* @__PURE__ */ H("p", { children: "Calls an LLM with a prompt template filled from pipeline context." }),
		/* @__PURE__ */ H("h4", { children: "Provider & model" }),
		/* @__PURE__ */ U("ul", { children: [/* @__PURE__ */ U("li", { children: [
			/* @__PURE__ */ H("code", { children: "anthropic" }),
			" — Claude models (e.g. ",
			/* @__PURE__ */ H("code", { children: "claude-sonnet-4-6" }),
			")."
		] }), /* @__PURE__ */ U("li", { children: [/* @__PURE__ */ H("code", { children: "bedrock" }), " — same models via AWS Bedrock."] })] }),
		/* @__PURE__ */ H("h4", { children: "Prompt templates" }),
		/* @__PURE__ */ U("p", { children: [
			"Interpolate with ",
			/* @__PURE__ */ H("code", { children: "{{ context.steps.X.output }}" }),
			" or any dotted path into the run context."
		] }),
		/* @__PURE__ */ H("h4", { children: "Streaming" }),
		/* @__PURE__ */ U("p", { children: [
			"Toggle on to emit ",
			/* @__PURE__ */ H("code", { children: "pipeline.llm.token" }),
			" events as text arrives; off for a single response."
		] }),
		/* @__PURE__ */ H("h4", { children: "Errors" }),
		/* @__PURE__ */ U("p", { children: [
			"The ",
			/* @__PURE__ */ H("code", { children: "error" }),
			" handle routes downstream on LLM failure — retried per ",
			/* @__PURE__ */ H("code", { children: "RetryManager" }),
			" policy before surfacing here."
		] })
	] }),
	transform: /* @__PURE__ */ U(V, { children: [
		/* @__PURE__ */ H("h4", { children: "What it does" }),
		/* @__PURE__ */ H("p", { children: "Pure data transform — JSONPath, template string, or sandboxed JavaScript. No side effects." }),
		/* @__PURE__ */ H("h4", { children: "When to use each" }),
		/* @__PURE__ */ U("ul", { children: [
			/* @__PURE__ */ U("li", { children: [
				/* @__PURE__ */ H("code", { children: "jsonpath" }),
				" — extract a value, e.g. ",
				/* @__PURE__ */ H("code", { children: "$.document.body.sections[0]" }),
				"."
			] }),
			/* @__PURE__ */ U("li", { children: [
				/* @__PURE__ */ H("code", { children: "template" }),
				" — shape a string from context, e.g. ",
				/* @__PURE__ */ H("code", { children: "Hi {{context.user.name}}" }),
				"."
			] }),
			/* @__PURE__ */ U("li", { children: [
				/* @__PURE__ */ H("code", { children: "javascript" }),
				" — arbitrary logic; runs in an isolated sandbox with ",
				/* @__PURE__ */ H("code", { children: "context" }),
				" as input."
			] })
		] }),
		/* @__PURE__ */ H("h4", { children: "Output" }),
		/* @__PURE__ */ U("p", { children: [
			/* @__PURE__ */ H("code", { children: "outputKey" }),
			" scopes the result into ",
			/* @__PURE__ */ U("code", { children: ["context.", "{outputKey}"] }),
			". Leave blank to merge into the root context."
		] })
	] }),
	condition: /* @__PURE__ */ U(V, { children: [
		/* @__PURE__ */ H("h4", { children: "What it does" }),
		/* @__PURE__ */ H("p", { children: "Branches the flow based on a boolean expression evaluated over context." }),
		/* @__PURE__ */ H("h4", { children: "Expression language" }),
		/* @__PURE__ */ U("p", { children: [
			"JSONPath lookups combined with booleans and comparisons, e.g. ",
			/* @__PURE__ */ H("code", { children: "$.llm.output.sentiment == \"positive\"" }),
			" or ",
			/* @__PURE__ */ H("code", { children: "$.score > 0.8 && $.reviewed" }),
			"."
		] }),
		/* @__PURE__ */ H("h4", { children: "Wiring" }),
		/* @__PURE__ */ U("p", { children: [
			"Two output handles: ",
			/* @__PURE__ */ H("code", { children: "true" }),
			" and ",
			/* @__PURE__ */ H("code", { children: "false" }),
			". Connected branches run; unconnected branches are skipped and their step is marked ",
			/* @__PURE__ */ H("code", { children: "skipped" }),
			"."
		] })
	] }),
	action: /* @__PURE__ */ U(V, { children: [
		/* @__PURE__ */ H("h4", { children: "What it does" }),
		/* @__PURE__ */ H("p", { children: "Performs a side-effect: updates a doc, posts a comment, notifies, calls a webhook, or invokes an MCP tool." }),
		/* @__PURE__ */ H("h4", { children: "Subtypes" }),
		/* @__PURE__ */ U("ul", { children: [
			/* @__PURE__ */ U("li", { children: [/* @__PURE__ */ H("code", { children: "update-document" }), " — patch a document's body."] }),
			/* @__PURE__ */ U("li", { children: [/* @__PURE__ */ H("code", { children: "post-comment" }), " — append a comment thread entry."] }),
			/* @__PURE__ */ U("li", { children: [/* @__PURE__ */ H("code", { children: "notify" }), " — push notification to users/roles."] }),
			/* @__PURE__ */ U("li", { children: [/* @__PURE__ */ H("code", { children: "webhook" }), " — outbound HTTP request."] }),
			/* @__PURE__ */ U("li", { children: [/* @__PURE__ */ H("code", { children: "mcp-tool" }), " — invoke a registered MCP tool by name."] })
		] }),
		/* @__PURE__ */ H("h4", { children: "Idempotent flag" }),
		/* @__PURE__ */ U("p", { children: [
			"If ",
			/* @__PURE__ */ H("code", { children: "idempotent" }),
			" is true, retries are safe after partial completion — the runtime may re-invoke the action without guarding against duplicates."
		] }),
		/* @__PURE__ */ H("h4", { children: "Errors" }),
		/* @__PURE__ */ U("p", { children: [
			"The ",
			/* @__PURE__ */ H("code", { children: "error" }),
			" handle routes on failure (after retries), or fails the run if ",
			/* @__PURE__ */ H("code", { children: "onError" }),
			" is ",
			/* @__PURE__ */ H("code", { children: "fail-run" }),
			"."
		] })
	] }),
	fork: /* @__PURE__ */ U(V, { children: [
		/* @__PURE__ */ H("h4", { children: "What it does" }),
		/* @__PURE__ */ H("p", { children: "Splits the flow into N parallel branches that all run concurrently against the same context snapshot." }),
		/* @__PURE__ */ H("h4", { children: "Branch count" }),
		/* @__PURE__ */ U("p", { children: [
			"2-8 branches. Each branch exposes a handle ",
			/* @__PURE__ */ H("code", { children: "branch-0" }),
			", ",
			/* @__PURE__ */ H("code", { children: "branch-1" }),
			", etc."
		] }),
		/* @__PURE__ */ H("h4", { children: "Downstream" }),
		/* @__PURE__ */ U("p", { children: [
			"Typically paired with a ",
			/* @__PURE__ */ H("code", { children: "Join" }),
			" to merge results. Without a Join, each branch terminates independently and the run completes when all tails finish."
		] })
	] }),
	join: /* @__PURE__ */ U(V, { children: [
		/* @__PURE__ */ H("h4", { children: "What it does" }),
		/* @__PURE__ */ H("p", { children: "Combines N parallel branches back into one flow." }),
		/* @__PURE__ */ H("h4", { children: "Modes" }),
		/* @__PURE__ */ U("ul", { children: [
			/* @__PURE__ */ U("li", { children: [/* @__PURE__ */ H("code", { children: "all" }), " — wait for every input."] }),
			/* @__PURE__ */ U("li", { children: [/* @__PURE__ */ H("code", { children: "any" }), " — fire as soon as the first input arrives; later inputs are ignored."] }),
			/* @__PURE__ */ U("li", { children: [
				/* @__PURE__ */ H("code", { children: "n_of_m" }),
				" — fire after ",
				/* @__PURE__ */ H("code", { children: "n" }),
				" of ",
				/* @__PURE__ */ H("code", { children: "m" }),
				" inputs complete."
			] })
		] }),
		/* @__PURE__ */ H("h4", { children: "Merge strategies" }),
		/* @__PURE__ */ U("ul", { children: [
			/* @__PURE__ */ U("li", { children: [/* @__PURE__ */ H("code", { children: "deep-merge" }), " — recursive object merge."] }),
			/* @__PURE__ */ U("li", { children: [/* @__PURE__ */ H("code", { children: "array-collect" }), " — collect each branch's output into an array."] }),
			/* @__PURE__ */ U("li", { children: [/* @__PURE__ */ H("code", { children: "last-writer-wins" }), " — final branch to arrive replaces prior values."] })
		] }),
		/* @__PURE__ */ H("h4", { children: "Partial failures (§17.2)" }),
		/* @__PURE__ */ U("p", { children: [
			"In ",
			/* @__PURE__ */ H("code", { children: "all" }),
			" mode a failed branch fails the run. In ",
			/* @__PURE__ */ H("code", { children: "any" }),
			"/",
			/* @__PURE__ */ H("code", { children: "n_of_m" }),
			" failed branches count against the required total — the Join fires as soon as enough successes arrive."
		] })
	] }),
	approval: /* @__PURE__ */ U(V, { children: [
		/* @__PURE__ */ H("h4", { children: "What it does" }),
		/* @__PURE__ */ U("p", { children: [
			"Blocks the pipeline waiting for human approval. The run enters ",
			/* @__PURE__ */ H("code", { children: "awaiting_approval" }),
			" until decisions are recorded."
		] }),
		/* @__PURE__ */ H("h4", { children: "Approvers" }),
		/* @__PURE__ */ U("p", { children: [
			"A list of users or roles. ",
			/* @__PURE__ */ H("code", { children: "requiredCount" }),
			" controls how many approvals are needed (n-of-m)."
		] }),
		/* @__PURE__ */ H("h4", { children: "Timeout" }),
		/* @__PURE__ */ U("p", { children: [
			"Optional ",
			/* @__PURE__ */ H("code", { children: "timeoutMs" }),
			" with ",
			/* @__PURE__ */ H("code", { children: "timeoutAction" }),
			" of ",
			/* @__PURE__ */ H("code", { children: "reject" }),
			" or ",
			/* @__PURE__ */ H("code", { children: "approve" }),
			" — decides the outcome if no one responds in time."
		] }),
		/* @__PURE__ */ H("h4", { children: "Wiring" }),
		/* @__PURE__ */ U("p", { children: [
			"Two output handles: ",
			/* @__PURE__ */ H("code", { children: "approved" }),
			" and ",
			/* @__PURE__ */ H("code", { children: "rejected" }),
			". The flow resumes down the matching branch."
		] })
	] }),
	agent: /* @__PURE__ */ U(V, { children: [
		/* @__PURE__ */ H("h4", { children: "What it does" }),
		/* @__PURE__ */ H("p", { children: "Invokes a Strands agent via A2A protocol. The agent processes the input and returns a structured response." }),
		/* @__PURE__ */ H("h4", { children: "Fields" }),
		/* @__PURE__ */ U("ul", { children: [
			/* @__PURE__ */ U("li", { children: [/* @__PURE__ */ H("code", { children: "agentId" }), " — agent identifier, in whatever form the host's agent runtime uses."] }),
			/* @__PURE__ */ U("li", { children: [
				/* @__PURE__ */ H("code", { children: "protocol" }),
				" — ",
				/* @__PURE__ */ H("code", { children: "a2a" }),
				" (recommended) or ",
				/* @__PURE__ */ H("code", { children: "direct" }),
				"."
			] }),
			/* @__PURE__ */ U("li", { children: [
				/* @__PURE__ */ H("code", { children: "inputTemplate" }),
				" — supports ",
				/* @__PURE__ */ H("code", { children: "{{context.*}}" }),
				" substitution."
			] }),
			/* @__PURE__ */ U("li", { children: [/* @__PURE__ */ H("code", { children: "streaming" }), " — whether to stream the agent's response tokens."] })
		] }),
		/* @__PURE__ */ H("h4", { children: "Wiring" }),
		/* @__PURE__ */ U("p", { children: [
			"Output handles: ",
			/* @__PURE__ */ H("code", { children: "out" }),
			" (success) and ",
			/* @__PURE__ */ H("code", { children: "error" }),
			" (invocation failure)."
		] })
	] }),
	"mcp-tool": /* @__PURE__ */ U(V, { children: [
		/* @__PURE__ */ H("h4", { children: "What it does" }),
		/* @__PURE__ */ H("p", { children: "Invokes an external tool through an MCP Gateway server." }),
		/* @__PURE__ */ H("h4", { children: "Fields" }),
		/* @__PURE__ */ U("ul", { children: [
			/* @__PURE__ */ U("li", { children: [/* @__PURE__ */ H("code", { children: "gatewayUrl" }), " — MCP Gateway endpoint."] }),
			/* @__PURE__ */ U("li", { children: [/* @__PURE__ */ H("code", { children: "toolName" }), " — registered tool to invoke."] }),
			/* @__PURE__ */ U("li", { children: [/* @__PURE__ */ H("code", { children: "inputTemplate" }), " — JSON input with substitution support."] })
		] }),
		/* @__PURE__ */ H("h4", { children: "Wiring" }),
		/* @__PURE__ */ U("p", { children: [
			"Output handles: ",
			/* @__PURE__ */ H("code", { children: "out" }),
			" and ",
			/* @__PURE__ */ H("code", { children: "error" }),
			"."
		] })
	] }),
	"knowledge-base": /* @__PURE__ */ U(V, { children: [
		/* @__PURE__ */ H("h4", { children: "What it does" }),
		/* @__PURE__ */ H("p", { children: "Queries a knowledge base for relevant document chunks (RAG retrieval). Which retrieval backend answers is configured by the host." }),
		/* @__PURE__ */ H("h4", { children: "Fields" }),
		/* @__PURE__ */ U("ul", { children: [
			/* @__PURE__ */ U("li", { children: [/* @__PURE__ */ H("code", { children: "knowledgeBaseId" }), " — knowledge base identifier."] }),
			/* @__PURE__ */ U("li", { children: [/* @__PURE__ */ H("code", { children: "queryTemplate" }), " — natural language query with substitution."] }),
			/* @__PURE__ */ U("li", { children: [/* @__PURE__ */ H("code", { children: "topK" }), " — number of chunks to retrieve (default 5)."] }),
			/* @__PURE__ */ U("li", { children: [/* @__PURE__ */ H("code", { children: "scoreThreshold" }), " — minimum relevance score (0–1)."] })
		] }),
		/* @__PURE__ */ H("h4", { children: "Wiring" }),
		/* @__PURE__ */ U("p", { children: [
			"Output handles: ",
			/* @__PURE__ */ H("code", { children: "out" }),
			" (retrieved chunks in context) and ",
			/* @__PURE__ */ H("code", { children: "error" }),
			"."
		] })
	] }),
	"graph-query": /* @__PURE__ */ U(V, { children: [
		/* @__PURE__ */ H("h4", { children: "What it does" }),
		/* @__PURE__ */ H("p", { children: "Runs a query against a graph database. The query dialect is whatever the host's graph engine accepts." }),
		/* @__PURE__ */ H("h4", { children: "Fields" }),
		/* @__PURE__ */ U("ul", { children: [
			/* @__PURE__ */ U("li", { children: [/* @__PURE__ */ H("code", { children: "graphId" }), " — graph identifier."] }),
			/* @__PURE__ */ U("li", { children: [/* @__PURE__ */ H("code", { children: "query" }), " — openCypher query (NOT Gremlin/SPARQL)."] }),
			/* @__PURE__ */ U("li", { children: [/* @__PURE__ */ H("code", { children: "parameters" }), " — named query parameters."] })
		] }),
		/* @__PURE__ */ H("h4", { children: "Wiring" }),
		/* @__PURE__ */ U("p", { children: [
			"Output handles: ",
			/* @__PURE__ */ H("code", { children: "out" }),
			" and ",
			/* @__PURE__ */ H("code", { children: "error" }),
			"."
		] })
	] }),
	memory: /* @__PURE__ */ U(V, { children: [
		/* @__PURE__ */ H("h4", { children: "What it does" }),
		/* @__PURE__ */ H("p", { children: "Reads from or writes to a scoped key/value memory (session or long-term). The backing store is supplied by the host." }),
		/* @__PURE__ */ H("h4", { children: "Fields" }),
		/* @__PURE__ */ U("ul", { children: [
			/* @__PURE__ */ U("li", { children: [
				/* @__PURE__ */ H("code", { children: "mode" }),
				" — ",
				/* @__PURE__ */ H("code", { children: "read" }),
				" or ",
				/* @__PURE__ */ H("code", { children: "write" }),
				"."
			] }),
			/* @__PURE__ */ U("li", { children: [
				/* @__PURE__ */ H("code", { children: "scope" }),
				" — ",
				/* @__PURE__ */ H("code", { children: "session" }),
				" (ephemeral) or ",
				/* @__PURE__ */ H("code", { children: "long-term" }),
				" (persistent)."
			] }),
			/* @__PURE__ */ U("li", { children: [/* @__PURE__ */ H("code", { children: "namespace" }), " — memory collection key."] }),
			/* @__PURE__ */ U("li", { children: [/* @__PURE__ */ H("code", { children: "keyExpression" }), " — lookup key (read) or storage key (write)."] })
		] }),
		/* @__PURE__ */ H("h4", { children: "Wiring" }),
		/* @__PURE__ */ U("p", { children: [
			"Output handles: ",
			/* @__PURE__ */ H("code", { children: "out" }),
			" and ",
			/* @__PURE__ */ H("code", { children: "error" }),
			"."
		] })
	] }),
	guardrail: /* @__PURE__ */ U(V, { children: [
		/* @__PURE__ */ H("h4", { children: "What it does" }),
		/* @__PURE__ */ H("p", { children: "Applies content filtering. Evaluates input against the host's configured policies and routes accordingly." }),
		/* @__PURE__ */ H("h4", { children: "Fields" }),
		/* @__PURE__ */ U("ul", { children: [
			/* @__PURE__ */ U("li", { children: [/* @__PURE__ */ H("code", { children: "guardrailId" }), " — guardrail identifier."] }),
			/* @__PURE__ */ U("li", { children: [/* @__PURE__ */ H("code", { children: "inputField" }), " — context path to evaluate."] }),
			/* @__PURE__ */ U("li", { children: [
				/* @__PURE__ */ H("code", { children: "action" }),
				" — ",
				/* @__PURE__ */ H("code", { children: "block" }),
				", ",
				/* @__PURE__ */ H("code", { children: "mask" }),
				", or ",
				/* @__PURE__ */ H("code", { children: "warn" }),
				"."
			] })
		] }),
		/* @__PURE__ */ H("h4", { children: "Wiring" }),
		/* @__PURE__ */ U("p", { children: [
			"Two output handles: ",
			/* @__PURE__ */ H("code", { children: "pass" }),
			" (content OK) and ",
			/* @__PURE__ */ H("code", { children: "block" }),
			" (content flagged)."
		] })
	] }),
	policy: /* @__PURE__ */ U(V, { children: [
		/* @__PURE__ */ H("h4", { children: "What it does" }),
		/* @__PURE__ */ H("p", { children: "Evaluates a Cedar authorization policy against principal/action/resource." }),
		/* @__PURE__ */ H("h4", { children: "Fields" }),
		/* @__PURE__ */ U("ul", { children: [
			/* @__PURE__ */ U("li", { children: [/* @__PURE__ */ H("code", { children: "policyStoreId" }), " — Cedar policy store identifier."] }),
			/* @__PURE__ */ U("li", { children: [/* @__PURE__ */ H("code", { children: "principal" }), " — who is requesting (supports substitution)."] }),
			/* @__PURE__ */ U("li", { children: [/* @__PURE__ */ H("code", { children: "action" }), " — what action is being performed."] }),
			/* @__PURE__ */ U("li", { children: [/* @__PURE__ */ H("code", { children: "resource" }), " — what resource is being accessed."] })
		] }),
		/* @__PURE__ */ H("h4", { children: "Wiring" }),
		/* @__PURE__ */ U("p", { children: [
			"Two output handles: ",
			/* @__PURE__ */ H("code", { children: "allow" }),
			" and ",
			/* @__PURE__ */ H("code", { children: "deny" }),
			"."
		] })
	] }),
	"ag-ui-output": /* @__PURE__ */ U(V, { children: [
		/* @__PURE__ */ H("h4", { children: "What it does" }),
		/* @__PURE__ */ H("p", { children: "Streams output to the AG-UI frontend via Server-Sent Events. This is a terminal node — no downstream flow." }),
		/* @__PURE__ */ H("h4", { children: "Fields" }),
		/* @__PURE__ */ U("ul", { children: [
			/* @__PURE__ */ U("li", { children: [/* @__PURE__ */ H("code", { children: "sourceField" }), " — context path to stream."] }),
			/* @__PURE__ */ U("li", { children: [/* @__PURE__ */ H("code", { children: "eventType" }), " — AG-UI event type to emit (TEXT_MESSAGE_CONTENT, STATE_DELTA, or CUSTOM)."] }),
			/* @__PURE__ */ U("li", { children: [/* @__PURE__ */ H("code", { children: "terminal" }), " — marks this as the pipeline endpoint."] })
		] }),
		/* @__PURE__ */ H("h4", { children: "Wiring" }),
		/* @__PURE__ */ U("p", { children: [
			"One input handle ",
			/* @__PURE__ */ H("code", { children: "in" }),
			". No output — this is the endpoint."
		] })
	] }),
	"image-source": /* @__PURE__ */ U(V, { children: [
		/* @__PURE__ */ H("h4", { children: "What it does" }),
		/* @__PURE__ */ H("p", { children: "Injects an existing image into the pipeline context. Use this as the entry point for image-processing pipelines when the image is already stored in the blob store." }),
		/* @__PURE__ */ H("h4", { children: "Fields" }),
		/* @__PURE__ */ U("ul", { children: [/* @__PURE__ */ U("li", { children: [/* @__PURE__ */ H("code", { children: "imageId" }), " — optional; can be set at run time by the trigger or a preceding step."] }), /* @__PURE__ */ U("li", { children: [
			/* @__PURE__ */ H("code", { children: "outputKey" }),
			" — the key written to pipeline context (default: ",
			/* @__PURE__ */ H("code", { children: "imageRef" }),
			")."
		] })] }),
		/* @__PURE__ */ H("h4", { children: "Wiring" }),
		/* @__PURE__ */ U("p", { children: [
			"One output handle ",
			/* @__PURE__ */ H("code", { children: "out" }),
			". No inputs — this is a source node."
		] })
	] }),
	"image:save": /* @__PURE__ */ U(V, { children: [
		/* @__PURE__ */ H("h4", { children: "What it does" }),
		/* @__PURE__ */ H("p", { children: "Writes a produced image to a named file in the artifact store. Dispatched server-side by the SaveStepHandler." }),
		/* @__PURE__ */ H("h4", { children: "Fields" }),
		/* @__PURE__ */ U("ul", { children: [/* @__PURE__ */ U("li", { children: [
			/* @__PURE__ */ H("code", { children: "sourceImagePath" }),
			" — JSONPath to the imageId to save (default: ",
			/* @__PURE__ */ H("code", { children: "$.scatter.parentImageId" }),
			")."
		] }), /* @__PURE__ */ U("li", { children: [
			/* @__PURE__ */ H("code", { children: "filenameTemplate" }),
			" — output filename; supports ",
			/* @__PURE__ */ H("code", { children: "{{scatter.item.label}}" }),
			", ",
			/* @__PURE__ */ H("code", { children: "{{scatter.index}}" }),
			", ",
			/* @__PURE__ */ H("code", { children: "{{scatter.parentImageId}}" }),
			"."
		] })] }),
		/* @__PURE__ */ H("h4", { children: "Wiring" }),
		/* @__PURE__ */ U("p", { children: [
			"One input ",
			/* @__PURE__ */ H("code", { children: "in" }),
			", one output ",
			/* @__PURE__ */ H("code", { children: "out" }),
			", one error handle ",
			/* @__PURE__ */ H("code", { children: "error" }),
			"."
		] })
	] }),
	scatter: /* @__PURE__ */ U(V, { children: [
		/* @__PURE__ */ H("h4", { children: "What it does" }),
		/* @__PURE__ */ H("p", { children: "Fans out over a collection — runs downstream nodes once per item in the scatter set. Results are collected by a downstream Join or Save node." }),
		/* @__PURE__ */ H("h4", { children: "Wiring" }),
		/* @__PURE__ */ U("p", { children: [
			"One input ",
			/* @__PURE__ */ H("code", { children: "in" }),
			". One output ",
			/* @__PURE__ */ H("code", { children: "out" }),
			" that fires once per item in the scatter collection."
		] })
	] }),
	"image:resize": /* @__PURE__ */ U(V, { children: [
		/* @__PURE__ */ H("h4", { children: "What it does" }),
		/* @__PURE__ */ H("p", { children: "Resizes an image to the target dimensions using sharp.resize()." }),
		/* @__PURE__ */ H("h4", { children: "Fields" }),
		/* @__PURE__ */ U("ul", { children: [
			/* @__PURE__ */ U("li", { children: [
				/* @__PURE__ */ H("code", { children: "width" }),
				" / ",
				/* @__PURE__ */ H("code", { children: "height" }),
				" — target dimensions in pixels."
			] }),
			/* @__PURE__ */ U("li", { children: [
				/* @__PURE__ */ H("code", { children: "fit" }),
				" — ",
				/* @__PURE__ */ H("code", { children: "cover" }),
				", ",
				/* @__PURE__ */ H("code", { children: "contain" }),
				", ",
				/* @__PURE__ */ H("code", { children: "fill" }),
				", ",
				/* @__PURE__ */ H("code", { children: "inside" }),
				", or ",
				/* @__PURE__ */ H("code", { children: "outside" }),
				" (default: ",
				/* @__PURE__ */ H("code", { children: "cover" }),
				")."
			] }),
			/* @__PURE__ */ U("li", { children: [
				/* @__PURE__ */ H("code", { children: "background" }),
				" — hex fill colour used by ",
				/* @__PURE__ */ H("code", { children: "contain" }),
				" / ",
				/* @__PURE__ */ H("code", { children: "inside" }),
				" when padding is needed."
			] }),
			/* @__PURE__ */ U("li", { children: [/* @__PURE__ */ H("code", { children: "withoutEnlargement" }), " — skip resize if image is already smaller than target."] })
		] }),
		/* @__PURE__ */ H("h4", { children: "Wiring" }),
		/* @__PURE__ */ U("p", { children: [
			"Input ",
			/* @__PURE__ */ H("code", { children: "in" }),
			", output ",
			/* @__PURE__ */ H("code", { children: "out" }),
			", error handle ",
			/* @__PURE__ */ H("code", { children: "error" }),
			"."
		] })
	] }),
	"image:transform": /* @__PURE__ */ U(V, { children: [
		/* @__PURE__ */ H("h4", { children: "What it does" }),
		/* @__PURE__ */ H("p", { children: "Applies a sequential chain of geometric operations to an image." }),
		/* @__PURE__ */ H("h4", { children: "Operations" }),
		/* @__PURE__ */ U("ul", { children: [
			/* @__PURE__ */ U("li", { children: [/* @__PURE__ */ H("code", { children: "rotate" }), " — rotate by degrees (e.g. 90, 180, 270)."] }),
			/* @__PURE__ */ U("li", { children: [/* @__PURE__ */ H("code", { children: "flip" }), " — mirror vertically."] }),
			/* @__PURE__ */ U("li", { children: [/* @__PURE__ */ H("code", { children: "flop" }), " — mirror horizontally."] })
		] }),
		/* @__PURE__ */ H("h4", { children: "Wiring" }),
		/* @__PURE__ */ U("p", { children: [
			"Input ",
			/* @__PURE__ */ H("code", { children: "in" }),
			", output ",
			/* @__PURE__ */ H("code", { children: "out" }),
			", error handle ",
			/* @__PURE__ */ H("code", { children: "error" }),
			"."
		] })
	] }),
	"image:format-convert": /* @__PURE__ */ U(V, { children: [
		/* @__PURE__ */ H("h4", { children: "What it does" }),
		/* @__PURE__ */ H("p", { children: "Converts the image to a new format using sharp." }),
		/* @__PURE__ */ H("h4", { children: "Fields" }),
		/* @__PURE__ */ U("ul", { children: [
			/* @__PURE__ */ U("li", { children: [
				/* @__PURE__ */ H("code", { children: "format" }),
				" — target format: ",
				/* @__PURE__ */ H("code", { children: "jpeg" }),
				", ",
				/* @__PURE__ */ H("code", { children: "png" }),
				", ",
				/* @__PURE__ */ H("code", { children: "webp" }),
				", ",
				/* @__PURE__ */ H("code", { children: "avif" }),
				", ",
				/* @__PURE__ */ H("code", { children: "tiff" }),
				", ",
				/* @__PURE__ */ H("code", { children: "gif" }),
				"."
			] }),
			/* @__PURE__ */ U("li", { children: [/* @__PURE__ */ H("code", { children: "quality" }), " — 1–100 for lossy formats."] }),
			/* @__PURE__ */ U("li", { children: [/* @__PURE__ */ H("code", { children: "lossless" }), " — force lossless for WebP/AVIF."] })
		] }),
		/* @__PURE__ */ H("h4", { children: "Wiring" }),
		/* @__PURE__ */ U("p", { children: [
			"Input ",
			/* @__PURE__ */ H("code", { children: "in" }),
			", output ",
			/* @__PURE__ */ H("code", { children: "out" }),
			", error handle ",
			/* @__PURE__ */ H("code", { children: "error" }),
			"."
		] })
	] }),
	"image:sharpen": /* @__PURE__ */ U(V, { children: [
		/* @__PURE__ */ H("h4", { children: "What it does" }),
		/* @__PURE__ */ H("p", { children: "Applies unsharp mask sharpening via sharp." }),
		/* @__PURE__ */ H("h4", { children: "Fields" }),
		/* @__PURE__ */ U("ul", { children: [
			/* @__PURE__ */ U("li", { children: [/* @__PURE__ */ H("code", { children: "sigma" }), " — Gaussian sigma (0.5–3). Controls radius of the blur before differencing."] }),
			/* @__PURE__ */ U("li", { children: [/* @__PURE__ */ H("code", { children: "m1" }), " — flat area threshold (default 1.0)."] }),
			/* @__PURE__ */ U("li", { children: [/* @__PURE__ */ H("code", { children: "m2" }), " — jagged area threshold (default 2.0)."] })
		] }),
		/* @__PURE__ */ H("h4", { children: "Wiring" }),
		/* @__PURE__ */ U("p", { children: [
			"Input ",
			/* @__PURE__ */ H("code", { children: "in" }),
			", output ",
			/* @__PURE__ */ H("code", { children: "out" }),
			", error handle ",
			/* @__PURE__ */ H("code", { children: "error" }),
			"."
		] })
	] }),
	"image:watermark": /* @__PURE__ */ U(V, { children: [
		/* @__PURE__ */ H("h4", { children: "What it does" }),
		/* @__PURE__ */ H("p", { children: "Composites an overlay image (watermark / logo) atop the source." }),
		/* @__PURE__ */ H("h4", { children: "Fields" }),
		/* @__PURE__ */ U("ul", { children: [
			/* @__PURE__ */ U("li", { children: [/* @__PURE__ */ H("code", { children: "overlayImageId" }), " — the watermark image stored in the blob store."] }),
			/* @__PURE__ */ U("li", { children: [
				/* @__PURE__ */ H("code", { children: "gravity" }),
				" — placement: ",
				/* @__PURE__ */ H("code", { children: "northwest" }),
				", ",
				/* @__PURE__ */ H("code", { children: "north" }),
				", ",
				/* @__PURE__ */ H("code", { children: "northeast" }),
				", ",
				/* @__PURE__ */ H("code", { children: "west" }),
				", ",
				/* @__PURE__ */ H("code", { children: "center" }),
				", ",
				/* @__PURE__ */ H("code", { children: "east" }),
				", ",
				/* @__PURE__ */ H("code", { children: "southwest" }),
				", ",
				/* @__PURE__ */ H("code", { children: "south" }),
				", ",
				/* @__PURE__ */ H("code", { children: "southeast" }),
				"."
			] }),
			/* @__PURE__ */ U("li", { children: [/* @__PURE__ */ H("code", { children: "opacity" }), " — 0.0–1.0 (default 1.0)."] }),
			/* @__PURE__ */ U("li", { children: [
				/* @__PURE__ */ H("code", { children: "offsetX" }),
				" / ",
				/* @__PURE__ */ H("code", { children: "offsetY" }),
				" — pixel nudge from gravity anchor."
			] })
		] }),
		/* @__PURE__ */ H("h4", { children: "Wiring" }),
		/* @__PURE__ */ U("p", { children: [
			"Input ",
			/* @__PURE__ */ H("code", { children: "in" }),
			", output ",
			/* @__PURE__ */ H("code", { children: "out" }),
			", error handle ",
			/* @__PURE__ */ H("code", { children: "error" }),
			"."
		] })
	] }),
	"image:crop": /* @__PURE__ */ U(V, { children: [
		/* @__PURE__ */ H("h4", { children: "What it does" }),
		/* @__PURE__ */ H("p", { children: "Crops a rectangular region from the source image using a bounding box resolved from pipeline context." }),
		/* @__PURE__ */ H("h4", { children: "Fields" }),
		/* @__PURE__ */ U("ul", { children: [
			/* @__PURE__ */ U("li", { children: [
				/* @__PURE__ */ H("code", { children: "sourceImagePath" }),
				" — JSONPath to the source imageId (default: ",
				/* @__PURE__ */ H("code", { children: "$.trigger.imageRef" }),
				")."
			] }),
			/* @__PURE__ */ U("li", { children: [
				/* @__PURE__ */ H("code", { children: "bboxPath" }),
				" — JSONPath to a ",
				/* @__PURE__ */ H("code", { children: "{ x, y, width, height }" }),
				" object in context."
			] }),
			/* @__PURE__ */ U("li", { children: [/* @__PURE__ */ H("code", { children: "materialize" }), " — if true, saves the cropped image to the blob store; otherwise returns inline."] })
		] }),
		/* @__PURE__ */ H("h4", { children: "Wiring" }),
		/* @__PURE__ */ U("p", { children: [
			"Input ",
			/* @__PURE__ */ H("code", { children: "in" }),
			", output ",
			/* @__PURE__ */ H("code", { children: "out" }),
			"."
		] })
	] }),
	"image:adjust-bw": /* @__PURE__ */ U(V, { children: [
		/* @__PURE__ */ H("h4", { children: "What it does" }),
		/* @__PURE__ */ H("p", { children: "Converts a colour image to greyscale with an adjustable contrast." }),
		/* @__PURE__ */ H("h4", { children: "Fields" }),
		/* @__PURE__ */ U("ul", { children: [/* @__PURE__ */ U("li", { children: [
			/* @__PURE__ */ H("code", { children: "algorithm" }),
			" — ",
			/* @__PURE__ */ H("code", { children: "luminosity" }),
			" (default), ",
			/* @__PURE__ */ H("code", { children: "average" }),
			", or ",
			/* @__PURE__ */ H("code", { children: "lightness" }),
			"."
		] }), /* @__PURE__ */ U("li", { children: [/* @__PURE__ */ H("code", { children: "contrast" }), " — multiplier applied after greyscale conversion (default 1.0)."] })] }),
		/* @__PURE__ */ H("h4", { children: "Wiring" }),
		/* @__PURE__ */ U("p", { children: [
			"Input ",
			/* @__PURE__ */ H("code", { children: "in" }),
			", output ",
			/* @__PURE__ */ H("code", { children: "out" }),
			", error handle ",
			/* @__PURE__ */ H("code", { children: "error" }),
			"."
		] })
	] }),
	"image:adjust-layer": /* @__PURE__ */ U(V, { children: [
		/* @__PURE__ */ H("h4", { children: "What it does" }),
		/* @__PURE__ */ H("p", { children: "Applies a composable stack of colour and filter adjustments in sequence." }),
		/* @__PURE__ */ H("h4", { children: "Layer kinds" }),
		/* @__PURE__ */ U("ul", { children: [
			/* @__PURE__ */ U("li", { children: [
				/* @__PURE__ */ H("code", { children: "brightness" }),
				" / ",
				/* @__PURE__ */ H("code", { children: "contrast" }),
				" / ",
				/* @__PURE__ */ H("code", { children: "saturation" }),
				" — multiplicative factor (1.0 = no change)."
			] }),
			/* @__PURE__ */ U("li", { children: [/* @__PURE__ */ H("code", { children: "hue" }), " — degrees to rotate the hue wheel."] }),
			/* @__PURE__ */ U("li", { children: [/* @__PURE__ */ H("code", { children: "blur" }), " — Gaussian blur radius in pixels."] })
		] }),
		/* @__PURE__ */ H("h4", { children: "Wiring" }),
		/* @__PURE__ */ U("p", { children: [
			"Input ",
			/* @__PURE__ */ H("code", { children: "in" }),
			", output ",
			/* @__PURE__ */ H("code", { children: "out" }),
			", error handle ",
			/* @__PURE__ */ H("code", { children: "error" }),
			"."
		] })
	] }),
	"image:dimensions": /* @__PURE__ */ U(V, { children: [
		/* @__PURE__ */ H("h4", { children: "What it does" }),
		/* @__PURE__ */ U("p", { children: [
			"Reads a source image's natural size and emits dimension data — ",
			/* @__PURE__ */ H("code", { children: "width" }),
			", ",
			/* @__PURE__ */ H("code", { children: "height" }),
			", ",
			/* @__PURE__ */ H("code", { children: "aspectRatio" }),
			", plus ",
			/* @__PURE__ */ H("code", { children: "genWidth" }),
			"/",
			/* @__PURE__ */ H("code", { children: "genHeight" }),
			" scaled to fit within ",
			/* @__PURE__ */ H("code", { children: "maxEdge" }),
			". It does ",
			/* @__PURE__ */ H("em", { children: "not" }),
			" output an image."
		] }),
		/* @__PURE__ */ H("h4", { children: "Fields" }),
		/* @__PURE__ */ U("ul", { children: [/* @__PURE__ */ U("li", { children: [/* @__PURE__ */ H("code", { children: "sourceImagePath" }), " — JSONPath to the source image (optional; defaults to the upstream image)."] }), /* @__PURE__ */ U("li", { children: [/* @__PURE__ */ H("code", { children: "maxEdge" }), " — longest-edge cap used to derive the generation dimensions (default 1024)."] })] }),
		/* @__PURE__ */ H("h4", { children: "Wiring" }),
		/* @__PURE__ */ U("p", { children: [
			"Image input ",
			/* @__PURE__ */ H("code", { children: "in" }),
			", data output ",
			/* @__PURE__ */ H("code", { children: "out" }),
			" (wire into Generate's width/height), error handle ",
			/* @__PURE__ */ H("code", { children: "error" }),
			"."
		] })
	] }),
	"image:upscale": /* @__PURE__ */ U(V, { children: [
		/* @__PURE__ */ H("h4", { children: "What it does" }),
		/* @__PURE__ */ H("p", { children: "Super-resolves a source image via a self-hosted x4 upscaler and outputs a new, higher-resolution image." }),
		/* @__PURE__ */ H("h4", { children: "Fields" }),
		/* @__PURE__ */ U("ul", { children: [
			/* @__PURE__ */ U("li", { children: [/* @__PURE__ */ H("code", { children: "sourceImagePath" }), " — JSONPath to the source image (optional; defaults to the upstream image)."] }),
			/* @__PURE__ */ U("li", { children: [/* @__PURE__ */ H("code", { children: "prompt" }), " — optional guidance forwarded to the upscaler."] }),
			/* @__PURE__ */ U("li", { children: [/* @__PURE__ */ H("code", { children: "maxEdge" }), " — longest-edge cap applied before the 4× pass (default 1024)."] })
		] }),
		/* @__PURE__ */ H("h4", { children: "Wiring" }),
		/* @__PURE__ */ U("p", { children: [
			"Image input ",
			/* @__PURE__ */ H("code", { children: "in" }),
			", image output ",
			/* @__PURE__ */ H("code", { children: "out" }),
			", error handle ",
			/* @__PURE__ */ H("code", { children: "error" }),
			"."
		] })
	] }),
	"image:vision-analyze": /* @__PURE__ */ U(V, { children: [
		/* @__PURE__ */ H("h4", { children: "What it does" }),
		/* @__PURE__ */ H("p", { children: "Analyzes an image with a Claude vision model. Supports free-form caption mode (leave schema blank) or structured JSON extraction (provide a JSON Schema)." }),
		/* @__PURE__ */ H("h4", { children: "Fields" }),
		/* @__PURE__ */ U("ul", { children: [
			/* @__PURE__ */ U("li", { children: [
				/* @__PURE__ */ H("code", { children: "imageRefPath" }),
				" — JSONPath to the imageId (default: ",
				/* @__PURE__ */ H("code", { children: "$.trigger.imageRef" }),
				")."
			] }),
			/* @__PURE__ */ U("li", { children: [/* @__PURE__ */ H("code", { children: "userPrompt" }), " — required. What to ask the model about the image."] }),
			/* @__PURE__ */ U("li", { children: [/* @__PURE__ */ H("code", { children: "outputSchema" }), " — optional JSON Schema; presence switches to structured extraction mode."] }),
			/* @__PURE__ */ U("li", { children: [
				/* @__PURE__ */ H("code", { children: "model" }),
				" — default ",
				/* @__PURE__ */ H("code", { children: "claude-sonnet-4-6" }),
				"."
			] })
		] }),
		/* @__PURE__ */ H("h4", { children: "Wiring" }),
		/* @__PURE__ */ U("p", { children: [
			"Input ",
			/* @__PURE__ */ H("code", { children: "in" }),
			", output ",
			/* @__PURE__ */ H("code", { children: "out" }),
			"."
		] })
	] }),
	"image:vision-classify": /* @__PURE__ */ U(V, { children: [
		/* @__PURE__ */ H("h4", { children: "What it does" }),
		/* @__PURE__ */ H("p", { children: "Classifies an image into one of a configured label set." }),
		/* @__PURE__ */ H("h4", { children: "Fields" }),
		/* @__PURE__ */ U("ul", { children: [/* @__PURE__ */ U("li", { children: [
			/* @__PURE__ */ H("code", { children: "labels" }),
			" — array of candidate labels (e.g. ",
			/* @__PURE__ */ H("code", { children: "['cat', 'dog', 'bird']" }),
			")."
		] }), /* @__PURE__ */ U("li", { children: [
			/* @__PURE__ */ H("code", { children: "model" }),
			" — default ",
			/* @__PURE__ */ H("code", { children: "claude-haiku-4-5" }),
			"."
		] })] }),
		/* @__PURE__ */ H("h4", { children: "Output" }),
		/* @__PURE__ */ U("p", { children: [
			"Produces ",
			/* @__PURE__ */ H("code", { children: "{ label, confidence }" }),
			" in context."
		] }),
		/* @__PURE__ */ H("h4", { children: "Wiring" }),
		/* @__PURE__ */ U("p", { children: [
			"Input ",
			/* @__PURE__ */ H("code", { children: "in" }),
			", output ",
			/* @__PURE__ */ H("code", { children: "out" }),
			", error handle ",
			/* @__PURE__ */ H("code", { children: "error" }),
			"."
		] })
	] }),
	"image:vision-describe": /* @__PURE__ */ U(V, { children: [
		/* @__PURE__ */ H("h4", { children: "What it does" }),
		/* @__PURE__ */ H("p", { children: "Generates a natural-language caption for an image via Claude Haiku." }),
		/* @__PURE__ */ H("h4", { children: "Fields" }),
		/* @__PURE__ */ U("ul", { children: [
			/* @__PURE__ */ U("li", { children: [/* @__PURE__ */ H("code", { children: "imageRefPath" }), " — JSONPath to the imageId."] }),
			/* @__PURE__ */ U("li", { children: [/* @__PURE__ */ H("code", { children: "userPrompt" }), " — optional override (default: describe the image)."] }),
			/* @__PURE__ */ U("li", { children: [/* @__PURE__ */ H("code", { children: "systemPrompt" }), " — optional system context."] }),
			/* @__PURE__ */ U("li", { children: [/* @__PURE__ */ H("code", { children: "maxOutputTokens" }), " — cap on response length."] })
		] }),
		/* @__PURE__ */ H("h4", { children: "Wiring" }),
		/* @__PURE__ */ U("p", { children: [
			"Input ",
			/* @__PURE__ */ H("code", { children: "in" }),
			", output ",
			/* @__PURE__ */ H("code", { children: "out" }),
			", error handle ",
			/* @__PURE__ */ H("code", { children: "error" }),
			"."
		] })
	] }),
	"image:vision-tag": /* @__PURE__ */ U(V, { children: [
		/* @__PURE__ */ H("h4", { children: "What it does" }),
		/* @__PURE__ */ H("p", { children: "Extracts ranked tags from an image. Open-vocabulary or guided by a candidate tag list." }),
		/* @__PURE__ */ H("h4", { children: "Fields" }),
		/* @__PURE__ */ U("ul", { children: [
			/* @__PURE__ */ U("li", { children: [/* @__PURE__ */ H("code", { children: "candidateTags" }), " — optional array to guide tagging. Leave blank for open-vocabulary."] }),
			/* @__PURE__ */ U("li", { children: [/* @__PURE__ */ H("code", { children: "maxTags" }), " — maximum number of tags to return (default 10)."] }),
			/* @__PURE__ */ U("li", { children: [
				/* @__PURE__ */ H("code", { children: "model" }),
				" — default ",
				/* @__PURE__ */ H("code", { children: "claude-haiku-4-5" }),
				"."
			] })
		] }),
		/* @__PURE__ */ H("h4", { children: "Wiring" }),
		/* @__PURE__ */ U("p", { children: [
			"Input ",
			/* @__PURE__ */ H("code", { children: "in" }),
			", output ",
			/* @__PURE__ */ H("code", { children: "out" }),
			", error handle ",
			/* @__PURE__ */ H("code", { children: "error" }),
			"."
		] })
	] }),
	"image:vision-extract-text": /* @__PURE__ */ U(V, { children: [
		/* @__PURE__ */ H("h4", { children: "What it does" }),
		/* @__PURE__ */ H("p", { children: "Extracts text from an image via Claude vision (OCR)." }),
		/* @__PURE__ */ H("h4", { children: "Fields" }),
		/* @__PURE__ */ U("ul", { children: [
			/* @__PURE__ */ U("li", { children: [/* @__PURE__ */ H("code", { children: "imageRefPath" }), " — JSONPath to the imageId."] }),
			/* @__PURE__ */ U("li", { children: [
				/* @__PURE__ */ H("code", { children: "model" }),
				" — default ",
				/* @__PURE__ */ H("code", { children: "claude-sonnet-4-6" }),
				"."
			] }),
			/* @__PURE__ */ U("li", { children: [/* @__PURE__ */ H("code", { children: "systemPrompt" }), " — optional instruction for the extraction task."] }),
			/* @__PURE__ */ U("li", { children: [/* @__PURE__ */ H("code", { children: "maxOutputTokens" }), " — response length cap."] })
		] }),
		/* @__PURE__ */ H("h4", { children: "Output" }),
		/* @__PURE__ */ U("p", { children: [
			"Produces ",
			/* @__PURE__ */ H("code", { children: "{ text, lines }" }),
			" in context."
		] }),
		/* @__PURE__ */ H("h4", { children: "Wiring" }),
		/* @__PURE__ */ U("p", { children: [
			"Input ",
			/* @__PURE__ */ H("code", { children: "in" }),
			", output ",
			/* @__PURE__ */ H("code", { children: "out" }),
			", error handle ",
			/* @__PURE__ */ H("code", { children: "error" }),
			"."
		] })
	] }),
	"image:generate": /* @__PURE__ */ U(V, { children: [
		/* @__PURE__ */ H("h4", { children: "What it does" }),
		/* @__PURE__ */ H("p", { children: "Generates images from a text prompt using the host's configured image model." }),
		/* @__PURE__ */ H("h4", { children: "Fields" }),
		/* @__PURE__ */ U("ul", { children: [
			/* @__PURE__ */ U("li", { children: [/* @__PURE__ */ H("code", { children: "prompt" }), " — required. Describes what to generate."] }),
			/* @__PURE__ */ U("li", { children: [
				/* @__PURE__ */ H("code", { children: "model" }),
				" — default ",
				/* @__PURE__ */ H("code", { children: "amazon.titan-image-generator-v1" }),
				"."
			] }),
			/* @__PURE__ */ U("li", { children: [
				/* @__PURE__ */ H("code", { children: "width" }),
				" / ",
				/* @__PURE__ */ H("code", { children: "height" }),
				" — output dimensions."
			] }),
			/* @__PURE__ */ U("li", { children: [/* @__PURE__ */ H("code", { children: "seed" }), " — optional for reproducible generation."] }),
			/* @__PURE__ */ U("li", { children: [/* @__PURE__ */ H("code", { children: "numImages" }), " — 1–4 images to produce."] })
		] }),
		/* @__PURE__ */ H("h4", { children: "Wiring" }),
		/* @__PURE__ */ U("p", { children: [
			"Input ",
			/* @__PURE__ */ H("code", { children: "in" }),
			", output ",
			/* @__PURE__ */ H("code", { children: "out" }),
			", error handle ",
			/* @__PURE__ */ H("code", { children: "error" }),
			"."
		] })
	] }),
	"image:variation": /* @__PURE__ */ U(V, { children: [
		/* @__PURE__ */ H("h4", { children: "What it does" }),
		/* @__PURE__ */ H("p", { children: "Generates variations of a source image using Nova Canvas. Always fans out — each variation becomes a separate downstream arm." }),
		/* @__PURE__ */ H("h4", { children: "Fields" }),
		/* @__PURE__ */ U("ul", { children: [
			/* @__PURE__ */ U("li", { children: [/* @__PURE__ */ H("code", { children: "sourceImagePath" }), " — JSONPath to the source imageId."] }),
			/* @__PURE__ */ U("li", { children: [/* @__PURE__ */ H("code", { children: "numVariations" }), " — 1–8 variations to generate (default 1)."] }),
			/* @__PURE__ */ U("li", { children: [/* @__PURE__ */ H("code", { children: "similarity" }), " — 0.0–1.0 how closely each variation resembles the source (default 0.7)."] }),
			/* @__PURE__ */ U("li", { children: [
				/* @__PURE__ */ H("code", { children: "model" }),
				" — default ",
				/* @__PURE__ */ H("code", { children: "amazon.nova-canvas-v1:0" }),
				"."
			] })
		] }),
		/* @__PURE__ */ H("h4", { children: "Wiring" }),
		/* @__PURE__ */ U("p", { children: [
			"Input ",
			/* @__PURE__ */ H("code", { children: "in" }),
			", output ",
			/* @__PURE__ */ H("code", { children: "out" }),
			" (fires once per variation), error handle ",
			/* @__PURE__ */ H("code", { children: "error" }),
			"."
		] })
	] }),
	"image:edit-prompt": /* @__PURE__ */ U(V, { children: [
		/* @__PURE__ */ H("h4", { children: "What it does" }),
		/* @__PURE__ */ H("p", { children: "Inpaints or outpaints a region of an image using Nova Canvas." }),
		/* @__PURE__ */ H("h4", { children: "Fields" }),
		/* @__PURE__ */ U("ul", { children: [
			/* @__PURE__ */ U("li", { children: [/* @__PURE__ */ H("code", { children: "prompt" }), " — required. Describes what to generate in the edited region."] }),
			/* @__PURE__ */ U("li", { children: [/* @__PURE__ */ H("code", { children: "sourceImagePath" }), " — JSONPath to the source imageId."] }),
			/* @__PURE__ */ U("li", { children: [/* @__PURE__ */ H("code", { children: "maskImagePath" }), " — optional JSONPath to a mask imageId (white = edit, black = preserve). Omit for outpainting."] }),
			/* @__PURE__ */ U("li", { children: [
				/* @__PURE__ */ H("code", { children: "model" }),
				" — default ",
				/* @__PURE__ */ H("code", { children: "amazon.nova-canvas-v1:0" }),
				"."
			] })
		] }),
		/* @__PURE__ */ H("h4", { children: "Wiring" }),
		/* @__PURE__ */ U("p", { children: [
			"Input ",
			/* @__PURE__ */ H("code", { children: "in" }),
			", output ",
			/* @__PURE__ */ H("code", { children: "out" }),
			", error handle ",
			/* @__PURE__ */ H("code", { children: "error" }),
			"."
		] })
	] })
};
//#endregion
//#region src/components/pipelines/nodes/image-source/ImageSourceConfig.tsx
function Ys({ data: e, onChange: t }) {
	return /* @__PURE__ */ U(X, { children: [/* @__PURE__ */ U("div", { children: [
		/* @__PURE__ */ U("label", {
			htmlFor: "image-source-image-id",
			className: "block text-[12px] font-semibold text-text-primary",
			children: [
				"Image ID",
				" ",
				/* @__PURE__ */ H("span", {
					className: "text-text-secondary font-normal",
					children: "(optional — can be set at run time)"
				})
			]
		}),
		/* @__PURE__ */ H(D, {
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
		/* @__PURE__ */ H("p", {
			className: "mt-0.5 text-[11px] text-text-secondary",
			children: "The imageId of an image already in the blob store. Leave blank to have the trigger or a preceding step supply the image at runtime."
		})
	] }), /* @__PURE__ */ U("div", { children: [
		/* @__PURE__ */ U("label", {
			htmlFor: "image-source-output-key",
			className: "block text-[12px] font-semibold text-text-primary",
			children: [
				"Output key",
				" ",
				/* @__PURE__ */ H("span", {
					className: "text-text-secondary font-normal",
					children: "(default: imageRef)"
				})
			]
		}),
		/* @__PURE__ */ H(D, {
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
		/* @__PURE__ */ U("p", {
			className: "mt-0.5 text-[11px] text-text-secondary",
			children: [
				"The key written to pipeline context (accessible as",
				" ",
				/* @__PURE__ */ U("code", { children: ["$.trigger.", "<key>"] }),
				" by downstream steps)."
			]
		})
	] })] });
}
//#endregion
//#region src/components/pipelines/nodes/save/SaveConfig.tsx
var Xs = [
	"{{scatter.item.label}}",
	"{{scatter.index}}",
	"{{scatter.parentImageId}}"
];
function Zs({ data: e, onChange: t, nodeId: n }) {
	let r = ga(n ?? null);
	return /* @__PURE__ */ U(X, { children: [/* @__PURE__ */ U("div", { children: [
		/* @__PURE__ */ U("label", {
			htmlFor: "save-source-image-path",
			className: "block text-[12px] font-semibold text-text-primary",
			children: [
				"Source image path",
				" ",
				/* @__PURE__ */ H("span", {
					className: "text-text-secondary font-normal",
					children: "(optional)"
				})
			]
		}),
		/* @__PURE__ */ H(D, {
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
		/* @__PURE__ */ U("p", {
			className: "mt-0.5 text-[11px] text-text-secondary",
			children: [
				"JSONPath to the imageId to save. Defaults server-side to",
				" ",
				/* @__PURE__ */ H("code", { children: "$.scatter.parentImageId" }),
				"."
			]
		}),
		/* @__PURE__ */ H(ca, {
			samples: r.map((e) => e.path),
			onSelect: (e) => t({ sourceImagePath: e })
		})
	] }), /* @__PURE__ */ U("div", { children: [
		/* @__PURE__ */ U("label", {
			htmlFor: "save-filename-template",
			className: "block text-[12px] font-semibold text-text-primary",
			children: [
				"Filename template",
				" ",
				/* @__PURE__ */ H("span", {
					className: "text-text-secondary font-normal",
					children: "(optional)"
				})
			]
		}),
		/* @__PURE__ */ H(D, {
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
		/* @__PURE__ */ U("p", {
			className: "mt-0.5 text-[11px] text-text-secondary",
			children: [
				"Output filename. Supports",
				" ",
				/* @__PURE__ */ H("code", { children: "{{scatter.item.label}}" }),
				",",
				" ",
				/* @__PURE__ */ H("code", { children: "{{scatter.index}}" }),
				", and",
				" ",
				/* @__PURE__ */ H("code", { children: "{{scatter.parentImageId}}" }),
				" substitutions. Default:",
				" ",
				/* @__PURE__ */ U("code", { children: [
					"crop-",
					"{{scatter.index}}",
					".png"
				] }),
				"."
			]
		}),
		/* @__PURE__ */ U("div", {
			className: "mt-1.5",
			children: [/* @__PURE__ */ H("div", {
				className: "text-[10px] text-text-secondary mb-1",
				children: "Quick-fill variable:"
			}), /* @__PURE__ */ H(ca, {
				samples: Xs,
				onSelect: (n) => {
					t({ filenameTemplate: (e.filenameTemplate ?? "") + n });
				}
			})]
		})
	] })] });
}
//#endregion
//#region src/components/pipelines/nodes/memory/MemoryConfig.tsx
var Qs = [{
	value: "read",
	label: "Read",
	help: "Look records up and write them into context."
}, {
	value: "write",
	label: "Write",
	help: "Persist a value from context into memory."
}], $s = [{
	value: "session",
	label: "Session",
	help: "Scoped to this run; cleared when the session ends."
}, {
	value: "long-term",
	label: "Long-term",
	help: "Persists across runs for the namespace."
}];
function ec({ data: e, onChange: t, nodeId: n }) {
	let r = tt(), { paths: i, unresolved: a } = ha(n ?? null), o = e.mode === "write", s = !e.namespace?.trim(), c = !e.keyExpression?.trim(), l = o && !e.valueField?.trim(), u = Qs.find((t) => t.value === e.mode)?.help, d = $s.find((t) => t.value === e.scope)?.help;
	return /* @__PURE__ */ U(X, { children: [
		/* @__PURE__ */ H(Y, {
			label: "Mode",
			required: !0,
			help: u,
			controlId: `${r}-mode`,
			render: ({ controlId: n, describedById: r }) => /* @__PURE__ */ H(Ye, {
				size: "sm",
				id: n,
				"aria-describedby": r,
				value: e.mode,
				onChange: (e) => t({ mode: e.target.value }),
				options: Qs.map((e) => ({
					value: e.value,
					label: e.label
				}))
			})
		}),
		/* @__PURE__ */ H(Y, {
			label: "Scope",
			required: !0,
			help: d,
			controlId: `${r}-scope`,
			render: ({ controlId: n, describedById: r }) => /* @__PURE__ */ H(Ye, {
				size: "sm",
				id: n,
				"aria-describedby": r,
				value: e.scope,
				onChange: (e) => t({ scope: e.target.value }),
				options: $s.map((e) => ({
					value: e.value,
					label: e.label
				}))
			})
		}),
		/* @__PURE__ */ H(Y, {
			label: "Namespace",
			required: !0,
			error: s ? "Namespace is required." : void 0,
			help: s ? void 0 : "Groups related records. Reads only see their own namespace.",
			controlId: `${r}-namespace`,
			render: ({ controlId: n, describedById: r }) => /* @__PURE__ */ H(D, {
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
		/* @__PURE__ */ H(Y, {
			label: "Key expression",
			required: !0,
			error: c ? "Key expression is required." : void 0,
			help: c ? void 0 : "Identifies the record. Supports {{ context.* }} substitution.",
			controlId: `${r}-key-expression`,
			render: ({ controlId: n, describedById: r }) => /* @__PURE__ */ H(D, {
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
		/* @__PURE__ */ H(Y, {
			label: "Available context",
			render: ({ labelId: n }) => /* @__PURE__ */ H("div", {
				role: "group",
				"aria-labelledby": n,
				children: /* @__PURE__ */ H(Ia, {
					paths: i,
					unresolved: a(`${e.keyExpression ?? ""}\n${o ? e.valueField ?? "" : ""}`),
					onInsert: (n) => t({ keyExpression: `${e.keyExpression ?? ""}${n}` })
				})
			})
		}),
		o ? /* @__PURE__ */ H(Y, {
			label: "Value field",
			required: !0,
			error: l ? "Value field is required for a write." : void 0,
			help: l ? void 0 : "Context path whose value is persisted.",
			controlId: `${r}-value-field`,
			render: ({ controlId: n, describedById: r }) => /* @__PURE__ */ H(D, {
				size: "sm",
				mono: !0,
				spellCheck: !1,
				id: n,
				"aria-describedby": r,
				value: e.valueField ?? "",
				onChange: (e) => t({ valueField: e.target.value || void 0 }),
				placeholder: "context.steps.llm-1.output"
			})
		}) : /* @__PURE__ */ H(Y, {
			label: "Output key",
			help: "Where retrieved records land in context. Defaults to this step's output.",
			controlId: `${r}-output-key`,
			render: ({ controlId: n, describedById: r }) => /* @__PURE__ */ H(D, {
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
var tc = 100;
function nc({ data: e, onChange: t, nodeId: n }) {
	let r = tt(), { paths: i, unresolved: a } = ha(n ?? null), o = Le("knowledge-base"), s = !e.knowledgeBaseId?.trim(), c = !e.queryTemplate?.trim(), l = e.topK ?? 0, u = !Number.isFinite(l) || l < 1 || l > tc, d = e.scoreThreshold, f = d !== void 0 && (d < 0 || d > 1);
	return /* @__PURE__ */ U(X, { children: [/* @__PURE__ */ U(sa, {
		title: "Knowledge base",
		children: [
			/* @__PURE__ */ H(Y, {
				label: o.label("knowledgeBaseId", "Knowledge base ID"),
				required: !0,
				error: s ? "Knowledge base ID is required." : void 0,
				help: s ? void 0 : o.help("knowledgeBaseId", "The knowledge base to retrieve from."),
				controlId: `${r}-kb-id`,
				render: ({ controlId: n, describedById: r }) => /* @__PURE__ */ H(D, {
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
			/* @__PURE__ */ H(Y, {
				label: o.label("queryTemplate", "Query template"),
				required: !0,
				error: c ? "Query template is required." : void 0,
				help: c ? void 0 : o.help("queryTemplate", "Text to embed and search. Supports {{ context.* }} substitution."),
				controlId: `${r}-query-template`,
				render: ({ controlId: n, describedById: r }) => /* @__PURE__ */ H(O, {
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
			/* @__PURE__ */ H(Y, {
				label: "Available context",
				render: ({ labelId: n }) => /* @__PURE__ */ H("div", {
					role: "group",
					"aria-labelledby": n,
					children: /* @__PURE__ */ H(Ia, {
						paths: i,
						unresolved: a(e.queryTemplate ?? ""),
						onInsert: (n) => t({ queryTemplate: `${e.queryTemplate ?? ""}${n}` })
					})
				})
			})
		]
	}), /* @__PURE__ */ U(sa, {
		title: "Retrieval",
		children: [
			/* @__PURE__ */ H(Y, {
				label: o.label("topK", "Top K"),
				required: !0,
				error: u ? `Must be between 1 and ${tc}.` : void 0,
				help: u ? void 0 : o.help("topK", "How many passages to retrieve."),
				controlId: `${r}-top-k`,
				render: ({ controlId: e, describedById: n }) => /* @__PURE__ */ H(P, {
					size: "sm",
					min: 1,
					max: tc,
					step: 1,
					value: l,
					onChange: (e) => t({ topK: e }),
					invalid: u,
					id: e,
					"aria-describedby": n,
					"data-testid": "kb-top-k"
				})
			}),
			/* @__PURE__ */ H(Y, {
				label: o.label("scoreThreshold", "Score threshold"),
				error: f ? "Must be between 0 and 1." : void 0,
				help: f ? void 0 : "Drop passages scoring below this. Leave empty for no filtering.",
				controlId: `${r}-score-threshold`,
				render: ({ controlId: e, describedById: n }) => /* @__PURE__ */ H(P, {
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
			/* @__PURE__ */ H(Y, {
				label: "Output key",
				help: "Where retrieved passages land in context. Defaults to this step's output.",
				controlId: `${r}-output-key`,
				render: ({ controlId: n, describedById: r }) => /* @__PURE__ */ H(D, {
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
			/* @__PURE__ */ H(Pa, {
				value: e.retryPolicy,
				onChange: (e) => t({ retryPolicy: e })
			})
		]
	})] });
}
//#endregion
//#region src/components/pipelines/nodes/graph-query/GraphQueryConfig.tsx
var rc = "MATCH (u:User {id: $userId})-[:AUTHORED]->(d:Doc)\nRETURN d.title LIMIT 10", ic = 100, ac = 3e5;
function oc({ data: e, onChange: t, nodeId: n }) {
	let r = tt(), { paths: i, unresolved: a } = ha(n ?? null), o = Le("graph-query"), s = !e.graphId?.trim(), c = !e.query?.trim(), l = e.timeoutMs, u = l !== void 0 && (!Number.isFinite(l) || l < ic || l > ac), d = R(() => Object.entries(e.parameters ?? {}), [e.parameters]), f = (e) => t({ parameters: Object.keys(e).length > 0 ? e : void 0 }), [p, h] = B(null), g = (t, n) => {
		if (n !== t && n.trim() !== "" && n in (e.parameters ?? {})) {
			h(n);
			return;
		}
		h(null);
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
	return /* @__PURE__ */ U(X, { children: [
		/* @__PURE__ */ U(sa, {
			title: "Graph",
			children: [/* @__PURE__ */ H(Y, {
				label: o.label("graphId", "Graph ID"),
				required: !0,
				error: s ? "Graph ID is required." : void 0,
				help: s ? void 0 : o.help("graphId", "The graph to query."),
				controlId: `${r}-graph-id`,
				render: ({ controlId: n, describedById: r }) => /* @__PURE__ */ H(D, {
					size: "sm",
					mono: !0,
					spellCheck: !1,
					id: n,
					"aria-describedby": r,
					value: e.graphId ?? "",
					onChange: (e) => t({ graphId: e.target.value }),
					placeholder: o.placeholder("graphId", "my-graph")
				})
			}), /* @__PURE__ */ H(Y, {
				label: o.label("query", "Graph query"),
				required: !0,
				error: c ? "Query is required." : void 0,
				help: c ? void 0 : "Bind values with $parameters below rather than interpolating them.",
				controlId: `${r}-query`,
				render: ({ controlId: n, describedById: r }) => /* @__PURE__ */ H(O, {
					rows: 6,
					invalid: c,
					spellCheck: !1,
					id: n,
					"aria-describedby": r,
					value: e.query ?? "",
					onChange: (e) => t({ query: e.target.value }),
					placeholder: o.placeholder("query", rc)
				})
			})]
		}),
		/* @__PURE__ */ U(sa, {
			title: "Parameters",
			children: [/* @__PURE__ */ H(Y, {
				label: "Bind parameters",
				help: "Each row binds one $name in the query. Values support {{ context.* }}.",
				render: ({ describedById: e, labelId: t }) => /* @__PURE__ */ U("div", {
					role: "group",
					"aria-labelledby": t,
					"aria-describedby": e,
					className: "flex flex-col gap-2",
					"data-testid": "graph-query-params",
					children: [
						d.length === 0 ? /* @__PURE__ */ H("p", {
							className: "text-[12px] text-[var(--color-text-secondary)]",
							children: "No parameters. The query runs exactly as written."
						}) : null,
						d.map(([e, t], n) => /* @__PURE__ */ U("div", {
							className: "flex items-center gap-2",
							children: [
								/* @__PURE__ */ H(D, {
									size: "sm",
									mono: !0,
									spellCheck: !1,
									value: e,
									onChange: (t) => g(e, t.target.value),
									invalid: e.trim() === "",
									placeholder: "userId",
									"aria-label": `Parameter ${n + 1} name`
								}),
								/* @__PURE__ */ H(D, {
									size: "sm",
									mono: !0,
									spellCheck: !1,
									value: t,
									onChange: (t) => _(e, t.target.value),
									placeholder: "{{context.trigger.userId}}",
									"aria-label": `Parameter ${n + 1} value`
								}),
								/* @__PURE__ */ H(m, {
									size: "sm",
									variant: "ghost",
									onClick: () => v(e),
									"aria-label": `Remove parameter ${e || n + 1}`,
									children: "×"
								})
							]
						}, n)),
						p ? /* @__PURE__ */ U("p", {
							className: "text-[12px] text-[var(--color-danger)]",
							role: "alert",
							children: [
								"A parameter named “",
								p,
								"” already exists. Rename or remove it first — two rows cannot share a name."
							]
						}) : null,
						/* @__PURE__ */ H("div", { children: /* @__PURE__ */ H(m, {
							size: "sm",
							variant: "secondary",
							onClick: y,
							children: "+ Add parameter"
						}) })
					]
				})
			}), /* @__PURE__ */ H(Y, {
				label: "Available context",
				render: ({ labelId: t }) => /* @__PURE__ */ H("div", {
					role: "group",
					"aria-labelledby": t,
					children: /* @__PURE__ */ H(Ia, {
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
		/* @__PURE__ */ U(sa, {
			title: "Execution",
			children: [
				/* @__PURE__ */ H(Y, {
					label: "Timeout",
					error: u ? `Must be between ${ic} and ${ac} ms.` : void 0,
					help: u ? void 0 : "Leave empty to use the executor default.",
					controlId: `${r}-timeout`,
					render: ({ controlId: e, describedById: n }) => /* @__PURE__ */ H(P, {
						size: "sm",
						min: ic,
						max: ac,
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
				/* @__PURE__ */ H(Y, {
					label: "Output key",
					help: "Where rows land in context. Defaults to this step's output.",
					controlId: `${r}-output-key`,
					render: ({ controlId: n, describedById: r }) => /* @__PURE__ */ H(D, {
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
				/* @__PURE__ */ H(Pa, {
					value: e.retryPolicy,
					onChange: (e) => t({ retryPolicy: e })
				})
			]
		})
	] });
}
//#endregion
//#region src/components/pipelines/vision/CaptionPanel.tsx
function sc({ result: e, className: t }) {
	let { caption: n, setting: i, location: a, timeOfDay: o, mood: s, colors: c } = e;
	return !n && !i && !a && !o && !s && (!c || c.length === 0) ? null : /* @__PURE__ */ U("section", {
		className: r("flex flex-col gap-2", t),
		children: [n ? /* @__PURE__ */ H("p", {
			className: "text-base leading-relaxed text-text-primary",
			children: n
		}) : null, /* @__PURE__ */ U("div", {
			className: "flex flex-wrap gap-1.5",
			children: [
				i ? /* @__PURE__ */ U(x, {
					tone: "neutral",
					size: "sm",
					title: "Scene setting",
					children: ["setting: ", i]
				}) : null,
				a ? /* @__PURE__ */ U(x, {
					tone: "neutral",
					size: "sm",
					title: "Location",
					children: ["loc: ", a]
				}) : null,
				o ? /* @__PURE__ */ U(x, {
					tone: "neutral",
					size: "sm",
					title: "Time of day",
					children: ["tod: ", o]
				}) : null,
				s ? /* @__PURE__ */ U(x, {
					tone: "info",
					size: "sm",
					title: "Mood",
					children: ["mood: ", s]
				}) : null,
				(c ?? []).map((e) => /* @__PURE__ */ U("span", {
					className: "inline-flex items-center gap-1 rounded-full border border-border bg-surface px-2 py-0.5 text-[11px] text-text-secondary",
					title: `Dominant color: ${e}`,
					children: [/* @__PURE__ */ H("span", {
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
var cc = {
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
function lc({ imageUrl: e, imageDataUrl: t, imageWidth: n, imageHeight: i, people: a, objects: o, show: s = "both", onSelectPerson: c, onSelectObject: l, className: u, alt: d }) {
	let f = t ?? e, [p, m] = B(null), h = z(null), g = I(() => {
		let e = h.current;
		e && (!n || !i) && m({
			w: e.naturalWidth,
			h: e.naturalHeight
		});
	}, [n, i]), _ = R(() => n && i && n > 0 && i > 0 ? {
		w: n,
		h: i
	} : p && p.w > 0 && p.h > 0 ? p : null, [
		n,
		i,
		p
	]), v = (e, t, n, i, a) => {
		if (!_) return null;
		let o = Math.max(0, Math.min(e.x1, _.w)), s = Math.max(0, Math.min(e.y1, _.h)), c = Math.max(0, Math.min(e.x2, _.w)), l = Math.max(0, Math.min(e.y2, _.h));
		if (!Number.isFinite(o) || !Number.isFinite(s) || !Number.isFinite(c) || !Number.isFinite(l) || c <= o || l <= s) return null;
		let u = o / _.w * 100, d = s / _.h * 100, f = (c - o) / _.w * 100, p = (l - s) / _.h * 100, m = cc[n];
		return /* @__PURE__ */ H("button", {
			type: "button",
			onClick: i,
			title: t,
			"aria-label": `${n === "people" ? "Person" : "Object"} bounding box: ${t}`,
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
			children: /* @__PURE__ */ H("span", {
				className: r("pointer-events-none absolute -top-5 left-0 inline-block rounded px-1.5 py-0.5 text-[10px] font-semibold leading-none shadow", m.text),
				children: t
			})
		}, a);
	};
	return f ? /* @__PURE__ */ U("div", {
		className: r("relative w-full overflow-hidden rounded-lg border border-border bg-black/5", u),
		children: [/* @__PURE__ */ H("img", {
			ref: h,
			src: f,
			alt: d ?? "",
			onLoad: g,
			className: "block h-auto w-full object-contain",
			draggable: !1
		}), _ ? /* @__PURE__ */ H("div", {
			className: "pointer-events-none absolute inset-0",
			children: /* @__PURE__ */ U("div", {
				className: "pointer-events-auto absolute inset-0",
				children: [(s === "people" || s === "both") && (a ?? []).map((e) => v(e.bbox, `#${e.index}${e.activity ? " · " + e.activity.replace(/^::\s*/, "") : ""}`, "people", c ? () => c(e) : void 0, `p-${e.index}`)), (s === "objects" || s === "both") && (o ?? []).map((e, t) => v(e.bbox, e.label, "object", l ? () => l(e) : void 0, `o-${t}-${e.label}`))]
			})
		}) : null]
	}) : /* @__PURE__ */ H("div", {
		className: r("flex aspect-video w-full items-center justify-center rounded-lg border border-dashed border-border-emphasis bg-surface-panel text-xs text-text-tertiary", u),
		children: "(no image)"
	});
}
function uc(e) {
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
function dc({ people: e, highlightedIndex: t, onSelect: n, className: i }) {
	return !e || e.length === 0 ? null : /* @__PURE__ */ U("section", {
		className: r("flex flex-col gap-1.5", i),
		children: [/* @__PURE__ */ U("h4", {
			className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary",
			children: [
				"People (",
				e.length,
				")"
			]
		}), /* @__PURE__ */ H("ul", {
			className: "flex flex-col gap-1.5",
			children: e.map((e) => {
				let i = t === e.index, a = e.activity?.replace(/^::\s*/, ""), o = r("group flex w-full flex-col gap-1 rounded-lg border px-2.5 py-2 text-left text-sm transition-colors", i ? "border-primary bg-primary-bg/70 ring-1 ring-primary" : "border-border bg-surface hover:bg-surface-hover"), s = /* @__PURE__ */ U(V, { children: [
					/* @__PURE__ */ U("div", {
						className: "flex flex-wrap items-center gap-1.5",
						children: [
							/* @__PURE__ */ H("span", {
								"aria-hidden": !0,
								className: "inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold leading-none text-white",
								children: e.index
							}),
							e.ageBucket ? /* @__PURE__ */ H(x, {
								tone: "neutral",
								size: "sm",
								children: e.ageBucket.replace("_", " ")
							}) : null,
							e.gender ? /* @__PURE__ */ H(x, {
								tone: "neutral",
								size: "sm",
								children: e.gender
							}) : null,
							e.faceOrientation ? /* @__PURE__ */ H(x, {
								tone: "neutral",
								size: "sm",
								title: "Face orientation",
								children: e.faceOrientation
							}) : null,
							e.expression ? /* @__PURE__ */ H(x, {
								tone: "info",
								size: "sm",
								children: e.expression
							}) : null
						]
					}),
					a ? /* @__PURE__ */ U("div", {
						className: "text-[13px] text-text-primary",
						children: [
							/* @__PURE__ */ H("span", {
								className: "text-text-tertiary",
								children: "activity:"
							}),
							" ",
							a
						]
					}) : null,
					e.clothing ? /* @__PURE__ */ U("div", {
						className: "text-[12px] text-text-secondary",
						children: [
							/* @__PURE__ */ H("span", {
								className: "text-text-tertiary",
								children: "wearing:"
							}),
							" ",
							e.clothing
						]
					}) : null
				] });
				return n ? /* @__PURE__ */ H("li", { children: /* @__PURE__ */ H("button", {
					type: "button",
					onClick: () => n(e),
					className: r(o, "cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"),
					"aria-pressed": i,
					children: s
				}) }, e.index) : /* @__PURE__ */ H("li", {
					className: o,
					children: s
				}, e.index);
			})
		})]
	});
}
//#endregion
//#region src/components/pipelines/vision/ObjectsPanel.tsx
function fc({ objects: e, onSelect: t, className: n }) {
	return !e || e.length === 0 ? null : /* @__PURE__ */ U("section", {
		className: r("flex flex-col gap-1.5", n),
		children: [/* @__PURE__ */ U("h4", {
			className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary",
			children: [
				"Objects (",
				e.length,
				")"
			]
		}), /* @__PURE__ */ H("ul", {
			className: "grid grid-cols-1 gap-1 sm:grid-cols-2",
			children: e.map((e, n) => {
				let i = r("flex w-full items-center justify-between gap-2 rounded-lg border border-border bg-surface px-2 py-1.5 text-left text-[13px]"), a = /* @__PURE__ */ U(V, { children: [/* @__PURE__ */ H("span", {
					className: "truncate font-medium text-text-primary",
					children: e.label
				}), /* @__PURE__ */ U("span", {
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
				return t ? /* @__PURE__ */ H("li", { children: /* @__PURE__ */ H("button", {
					type: "button",
					onClick: () => t(e),
					className: r(i, "cursor-pointer hover:bg-surface-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"),
					children: a
				}) }, `${e.label}-${n}`) : /* @__PURE__ */ H("li", {
					className: i,
					children: a
				}, `${e.label}-${n}`);
			})
		})]
	});
}
//#endregion
//#region src/components/pipelines/vision/TagsPanel.tsx
function pc({ tags: e, onTagClick: t, className: n }) {
	return !e || e.length === 0 ? null : /* @__PURE__ */ U("section", {
		className: r("flex flex-col gap-1.5", n),
		children: [/* @__PURE__ */ H("h4", {
			className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary",
			children: "Tags"
		}), /* @__PURE__ */ H("div", {
			className: "flex flex-wrap gap-1.5",
			children: e.map((e) => t ? /* @__PURE__ */ H("button", {
				type: "button",
				onClick: () => t(e),
				title: `Filter by ${e}`,
				"aria-label": `Filter by ${e}`,
				className: "appearance-none border-0 bg-transparent p-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 rounded-full",
				children: /* @__PURE__ */ U(x, {
					tone: "info",
					size: "sm",
					children: ["#", e]
				})
			}, e) : /* @__PURE__ */ U(x, {
				tone: "info",
				size: "sm",
				children: ["#", e]
			}, e))
		})]
	});
}
//#endregion
//#region src/components/pipelines/vision/EditRecommendationsPanel.tsx
function mc(e) {
	return e ? e === "correct" || e === "neutral" || e === "normal" ? "success" : "warning" : "neutral";
}
function hc(e) {
	let t = mc(e);
	return t === "success" ? `OK · ${e}` : t === "warning" ? `ADJUST · ${e}` : e ?? "";
}
function gc({ exposure: e, whiteBalance: t, contrast: n, composition: i, edits: a, onApplyEdit: o, className: s }) {
	let c = e || t || n || i, l = (a ?? []).length > 0;
	return !c && !l ? null : /* @__PURE__ */ U("section", {
		className: r("flex flex-col gap-2", s),
		children: [
			/* @__PURE__ */ H("h4", {
				className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary",
				children: "Edits & Quality"
			}),
			c ? /* @__PURE__ */ U("div", {
				className: "grid grid-cols-1 gap-1.5 sm:grid-cols-2",
				children: [
					e ? /* @__PURE__ */ U("div", {
						className: "rounded-lg border border-border bg-surface p-2",
						children: [/* @__PURE__ */ U("div", {
							className: "flex items-center gap-1.5",
							children: [
								/* @__PURE__ */ H("span", {
									className: "text-[11px] font-medium text-text-tertiary",
									children: "EXPOSURE"
								}),
								/* @__PURE__ */ H(x, {
									tone: mc(e.verdict),
									size: "sm",
									children: hc(e.verdict)
								}),
								e.evAdjustment === 0 ? null : /* @__PURE__ */ U("span", {
									className: "font-mono text-[11px] text-text-tertiary",
									children: [
										e.evAdjustment > 0 ? "+" : "",
										e.evAdjustment.toFixed(1),
										" EV"
									]
								})
							]
						}), /* @__PURE__ */ H("p", {
							className: "mt-1 text-[12px] text-text-primary",
							children: e.rationale
						})]
					}) : null,
					t ? /* @__PURE__ */ U("div", {
						className: "rounded-lg border border-border bg-surface p-2",
						children: [/* @__PURE__ */ U("div", {
							className: "flex items-center gap-1.5",
							children: [
								/* @__PURE__ */ H("span", {
									className: "text-[11px] font-medium text-text-tertiary",
									children: "WB"
								}),
								/* @__PURE__ */ H(x, {
									tone: mc(t.verdict),
									size: "sm",
									children: hc(t.verdict)
								}),
								t.kelvinShift ? /* @__PURE__ */ U("span", {
									className: "font-mono text-[11px] text-text-tertiary",
									children: [
										t.kelvinShift > 0 ? "+" : "",
										t.kelvinShift,
										"K"
									]
								}) : null
							]
						}), /* @__PURE__ */ H("p", {
							className: "mt-1 text-[12px] text-text-primary",
							children: t.rationale
						})]
					}) : null,
					n ? /* @__PURE__ */ U("div", {
						className: "rounded-lg border border-border bg-surface p-2",
						children: [/* @__PURE__ */ H("span", {
							className: "text-[11px] font-medium text-text-tertiary",
							children: "CONTRAST"
						}), /* @__PURE__ */ H("span", {
							className: "ml-1.5",
							children: /* @__PURE__ */ H(x, {
								tone: mc(n),
								size: "sm",
								children: hc(n)
							})
						})]
					}) : null,
					i ? /* @__PURE__ */ U("div", {
						className: "rounded-lg border border-border bg-surface p-2",
						children: [/* @__PURE__ */ H("span", {
							className: "text-[11px] font-medium text-text-tertiary",
							children: "COMPOSITION"
						}), /* @__PURE__ */ H("p", {
							className: "mt-1 text-[12px] text-text-primary",
							children: i
						})]
					}) : null
				]
			}) : null,
			l ? /* @__PURE__ */ H("ul", {
				className: "flex flex-col gap-1",
				children: (a ?? []).map((e, t) => /* @__PURE__ */ U("li", {
					className: "flex items-start justify-between gap-2 rounded-lg border border-border bg-surface px-2.5 py-1.5 text-[13px]",
					children: [/* @__PURE__ */ H("span", {
						className: "flex-1 text-text-primary",
						children: e
					}), o ? /* @__PURE__ */ H("button", {
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
function _c({ result: e, showImage: t = !0, showCaption: n = !0, showPeople: i = !0, showObjects: a = !0, showTags: o = !0, showEdits: s = !0, showRawText: c = !1, onTagClick: l, onApplyEdit: u, className: d }) {
	let [f, p] = B(), [m, h] = B(!1), g = (e) => p(f === e.index ? void 0 : e.index), _ = uc(e);
	return /* @__PURE__ */ U("div", {
		className: r("flex w-full flex-col gap-4 text-text-primary", d),
		children: [
			/* @__PURE__ */ U("div", {
				className: "grid grid-cols-1 gap-4 md:grid-cols-12",
				children: [t ? /* @__PURE__ */ U("div", {
					className: "md:col-span-7",
					children: [/* @__PURE__ */ H(lc, {
						..._,
						onSelectPerson: g,
						alt: e.caption ?? "Vision result"
					}), e.model ? /* @__PURE__ */ U("div", {
						className: "mt-2 flex flex-wrap items-center gap-2 text-[11px] text-text-tertiary",
						children: [
							/* @__PURE__ */ H("span", {
								className: "font-medium text-text-primary",
								children: e.model.endpointId
							}),
							/* @__PURE__ */ H("span", { children: "·" }),
							/* @__PURE__ */ U("span", { children: [
								"latency ",
								e.model.latencyMs,
								"ms"
							] }),
							typeof e.model.tokensOut == "number" ? /* @__PURE__ */ U(V, { children: [/* @__PURE__ */ H("span", { children: "·" }), /* @__PURE__ */ U("span", { children: [e.model.tokensOut, " tok out"] })] }) : null
						]
					}) : null]
				}) : null, /* @__PURE__ */ U("div", {
					className: r("flex flex-col gap-4", t ? "md:col-span-5" : "md:col-span-12"),
					children: [n ? /* @__PURE__ */ H(sc, { result: e }) : null, i && e.people && e.people.length > 0 ? /* @__PURE__ */ H(dc, {
						people: e.people,
						highlightedIndex: f,
						onSelect: g
					}) : null]
				})]
			}),
			a && e.objects && e.objects.length > 0 ? /* @__PURE__ */ H(fc, { objects: e.objects }) : null,
			o && e.tags && e.tags.length > 0 ? /* @__PURE__ */ H(pc, {
				tags: e.tags,
				onTagClick: l
			}) : null,
			s ? /* @__PURE__ */ H(gc, {
				exposure: e.exposure,
				whiteBalance: e.whiteBalance,
				contrast: e.contrast,
				composition: e.composition,
				edits: e.edits,
				onApplyEdit: u
			}) : null,
			e.text && e.text.length > 0 ? /* @__PURE__ */ U("section", {
				className: "flex flex-col gap-1.5",
				children: [/* @__PURE__ */ H("h4", {
					className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary",
					children: "Text (OCR)"
				}), /* @__PURE__ */ H("ul", {
					className: "flex flex-col gap-1",
					children: e.text.map((e, t) => /* @__PURE__ */ H("li", {
						className: "rounded border border-border bg-surface px-2 py-1 font-mono text-[12px]",
						children: e
					}, t))
				})]
			}) : null,
			c && e.rawText ? /* @__PURE__ */ U("section", {
				className: "flex flex-col gap-1.5",
				children: [/* @__PURE__ */ U("button", {
					type: "button",
					onClick: () => h((e) => !e),
					"aria-expanded": m,
					"aria-label": `${m ? "Hide" : "Show"} raw model output`,
					className: "self-start text-[11px] font-medium text-text-tertiary hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 rounded",
					children: [m ? "▾" : "▸", " Raw model output"]
				}), m ? /* @__PURE__ */ H("pre", {
					className: "overflow-x-auto rounded-lg border border-border bg-surface-panel p-2 font-mono text-[11px] leading-snug text-text-secondary",
					children: e.rawText
				}) : null]
			}) : null
		]
	});
}
//#endregion
//#region src/components/pipelines/vision/VisionPromptBench.tsx
var vc = [
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
], yc = "claude-sonnet-4-6", bc = [
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
function xc(e) {
	let t = [`${e.inputTokens} in`, `${e.outputTokens} out`];
	return e.cacheReadTokens && t.push(`${e.cacheReadTokens} cached`), t.join(" / ");
}
function Sc({ systemPrompt: e, userPrompt: t, outputSchema: n, model: i, onSave: a, apiBase: o = "" }) {
	let s = Ve(), [c, l] = B(e), [u, d] = B(t), [f, p] = B(i ?? yc), [m, h] = B(n ? JSON.stringify(n, null, 2) : ""), [g, _] = B("0"), [v, y] = B(null), [b, x] = B(!1), [S, C] = B(null), [w, T] = B(null), E = I(() => {
		let e = m.trim();
		if (e) try {
			let t = JSON.parse(e);
			if (t && typeof t == "object" && !Array.isArray(t)) return t;
		} catch {}
	}, [m]), D = I((e) => {
		_(e);
		let t = bc[Number(e)];
		t && (h(t.value ? JSON.stringify(t.value, null, 2) : ""), t.systemPrompt !== void 0 && l(t.systemPrompt));
	}, []), k = v?.imageId ?? null, A = k ? s.getImageUrl(k) : null, ee = I(async () => {
		if (!k) {
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
					imageId: k,
					systemPrompt: c.trim() || void 0,
					userPrompt: u.trim(),
					outputSchema: e,
					model: f || yc
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
				imageUrl: A ?? "",
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
		k,
		A,
		u,
		c,
		f,
		E,
		o
	]), j = () => {
		a({
			systemPrompt: c,
			userPrompt: u,
			outputSchema: E()
		});
	}, te = "text-[12px] font-semibold text-text-secondary";
	return /* @__PURE__ */ U("div", {
		className: "flex flex-col gap-4 px-4 py-3",
		"data-testid": "vision-prompt-bench",
		children: [
			/* @__PURE__ */ U("div", { children: [/* @__PURE__ */ H("div", {
				className: r(te, "mb-1"),
				children: "Sample image"
			}), /* @__PURE__ */ H(as, {
				value: v,
				onChange: (e) => y(e),
				"data-testid": "bench-image-uploader"
			})] }),
			/* @__PURE__ */ U("div", {
				className: "flex flex-col gap-2",
				children: [
					/* @__PURE__ */ U("div", { children: [/* @__PURE__ */ H("label", {
						className: te,
						children: "System prompt"
					}), /* @__PURE__ */ H(O, {
						value: c,
						onChange: (e) => l(e.target.value),
						rows: 3,
						placeholder: "Optional override of the default vision system prompt.",
						"data-testid": "bench-system-prompt",
						className: "mt-1 text-[12px] font-mono"
					})] }),
					/* @__PURE__ */ U("div", { children: [/* @__PURE__ */ U("label", {
						className: te,
						children: ["User prompt ", /* @__PURE__ */ H("span", {
							className: "text-danger-fg",
							children: "*"
						})]
					}), /* @__PURE__ */ H(O, {
						value: u,
						onChange: (e) => d(e.target.value),
						rows: 3,
						placeholder: "Describe what you want the model to do with the image.",
						"data-testid": "bench-user-prompt",
						className: "mt-1 text-[12px]"
					})] }),
					/* @__PURE__ */ U("div", { children: [/* @__PURE__ */ U("div", {
						className: "flex items-center gap-2 mb-1",
						children: [/* @__PURE__ */ H("label", {
							className: te,
							children: "Output schema"
						}), /* @__PURE__ */ H(Ye, {
							value: g,
							onChange: (e) => D(e.target.value),
							options: bc.map((e, t) => ({
								value: String(t),
								label: e.label
							})),
							size: "sm",
							"aria-label": "Schema preset",
							"data-testid": "bench-schema-preset"
						})]
					}), /* @__PURE__ */ H(O, {
						value: m,
						onChange: (e) => h(e.target.value),
						rows: 5,
						placeholder: "Optional JSON Schema for structured output. Leave empty for caption-only mode.",
						"data-testid": "bench-schema-textarea",
						className: "text-[11px] font-mono"
					})] })
				]
			}),
			/* @__PURE__ */ U("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ H(Ye, {
					value: f,
					onChange: (e) => p(e.target.value),
					options: vc,
					size: "sm",
					"aria-label": "Vision model",
					"data-testid": "bench-model-select"
				}), /* @__PURE__ */ H("button", {
					type: "button",
					onClick: () => void ee(),
					disabled: b,
					className: r("flex-1 py-1.5 px-4 text-[13px] font-semibold rounded-md cursor-pointer", "bg-primary text-white border-none", b ? "opacity-60 cursor-not-allowed" : "hover:bg-primary/90"),
					"data-testid": "bench-try-btn",
					children: b ? "Running…" : "Try"
				})]
			}),
			S && /* @__PURE__ */ H("div", {
				className: "text-[12px] text-danger-fg bg-danger-bg border border-danger-border rounded px-3 py-2",
				"data-testid": "bench-error",
				children: S
			}),
			w && /* @__PURE__ */ U("div", {
				className: "flex flex-col gap-2 border-t border-border pt-3",
				"data-testid": "bench-result",
				children: [
					/* @__PURE__ */ U("div", {
						className: "flex flex-wrap gap-1.5",
						children: [
							/* @__PURE__ */ U("span", {
								className: "text-[11px] px-2 py-0.5 rounded-full bg-surface-inset border border-border text-text-secondary",
								children: [xc(w.usage), " tokens"]
							}),
							/* @__PURE__ */ U("span", {
								className: "text-[11px] px-2 py-0.5 rounded-full bg-surface-inset border border-border text-text-secondary",
								children: [w.latencyMs, " ms"]
							}),
							/* @__PURE__ */ U("span", {
								className: "text-[11px] px-2 py-0.5 rounded-full bg-surface-inset border border-border text-text-secondary",
								children: ["$", w.costUsd.toFixed(4)]
							})
						]
					}),
					/* @__PURE__ */ H(_c, {
						result: w.visionResult,
						showImage: !1,
						showRawText: !!w.rawExtracted,
						"data-testid": "bench-vision-viewer"
					}),
					w.rawExtracted !== null && w.rawExtracted !== void 0 && /* @__PURE__ */ U("div", {
						className: "flex flex-col gap-1",
						children: [/* @__PURE__ */ H("div", {
							className: "text-[11px] font-semibold text-text-secondary",
							children: "Extracted JSON"
						}), /* @__PURE__ */ H("pre", {
							className: "text-[10px] font-mono bg-surface-inset border border-border rounded p-2 overflow-x-auto",
							"data-testid": "bench-extracted-json",
							children: JSON.stringify(w.rawExtracted, null, 2)
						})]
					}),
					/* @__PURE__ */ H("button", {
						type: "button",
						onClick: j,
						className: r("mt-1 w-full py-1.5 text-[12px] font-semibold rounded-md cursor-pointer", "bg-surface-hover border border-border text-text-primary", "hover:bg-surface-inset"),
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
var Cc = {
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
}, wc = {
	completed: "success",
	failed: "error",
	running: "info",
	pending: "pending",
	awaiting: "warning",
	skipped: "neutral",
	cancelled: "neutral"
}, Tc = /* @__PURE__ */ new Set([
	"image:vision-analyze",
	"image:vision-classify",
	"image:vision-describe",
	"image:vision-tag",
	"image:vision-extract-text"
]), Ec = ({ data: e }) => /* @__PURE__ */ H("div", {
	className: "p-4",
	"data-testid": "config-panel-no-settings",
	children: /* @__PURE__ */ H(w, {
		icon: "⚙️",
		title: "No settings for this node type yet",
		description: /* @__PURE__ */ U(V, { children: [/* @__PURE__ */ H("code", {
			className: "font-mono text-[12px]",
			children: String(e.type)
		}), " has no configurable options in this version. The node can sit on the canvas and connect to others, and it will run with its defaults wherever the executor supports it."] })
	})
}), Dc = [
	"agent",
	"mcp-tool",
	"guardrail",
	"policy",
	"ag-ui-output"
], Oc = {
	trigger: ka,
	llm: Va,
	transform: Wa,
	condition: Ka,
	action: Za,
	fork: to,
	join: io,
	approval: lo,
	agent: Ec,
	"mcp-tool": Ec,
	"knowledge-base": nc,
	"graph-query": oc,
	memory: ec,
	guardrail: Ec,
	policy: Ec,
	"ag-ui-output": Ec,
	"image-source": Ys,
	"image:save": Zs,
	scatter: wo,
	"image:resize": Eo,
	"image:transform": jo,
	"image:format-convert": Fo,
	"image:sharpen": Io,
	"image:watermark": Ro,
	"image:crop": ts,
	"image:adjust-bw": rs,
	"image:adjust-layer": xs,
	"image:dimensions": Cs,
	"image:upscale": Ts,
	"image:vision-analyze": As,
	"image:vision-classify": Ps,
	"image:vision-describe": Fs,
	"image:vision-tag": Ms,
	"image:vision-extract-text": Ls,
	"image:generate": Hs,
	"image:variation": Gs,
	"image:edit-prompt": qs
};
function kc(e, t) {
	let n = Oc[e.type];
	return /* @__PURE__ */ H(n, {
		data: e.data,
		onChange: t,
		nodeId: e.id
	}, e.id);
}
function Ac({ selectedIds: e }) {
	let { definition: n, selectedNodeId: i, setSelectedNodeId: a, updateNodeData: o, removeNode: s, duplicateNodes: c } = pe(), [l, u] = B("config"), d = z(null), p = z(null);
	t();
	let m = R(() => e && e.length > 1 ? e : i ? [i] : [], [e, i]), h = m.length > 1, g = m.length > 0, _ = R(() => h || m.length === 0 || !n ? null : n.nodes.find((e) => e.id === m[0]) ?? null, [
		n,
		m,
		h
	]), v = F(_?.id ?? ""), y = I(() => {
		a(null);
	}, [a]);
	L(() => {
		u("config");
	}, [m.join(",")]), L(() => {
		if (!g) return;
		let e = (e) => {
			e.key === "Escape" && (e.stopPropagation(), y());
		};
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, [g, y]), L(() => {
		if (!g) return;
		let e = (e) => {
			let t = d.current;
			t && (e.target instanceof Node && t.contains(e.target) || e.target instanceof Element && (e.target.closest("[data-node-type]") || y()));
		};
		return window.addEventListener("mousedown", e), () => window.removeEventListener("mousedown", e);
	}, [g, y]);
	let b = _ ? Cc[_.type] : null, x = () => {
		if (h) for (let e of m) s(e);
		else _ && s(_.id);
	}, S = () => {
		m.length !== 0 && c(m);
	}, C = (e) => {
		_ && o(_.id, e);
	};
	return /* @__PURE__ */ H("div", {
		ref: d,
		className: "flex flex-col flex-1 min-h-0 bg-white",
		"data-testid": "config-panel",
		children: h ? /* @__PURE__ */ U(V, { children: [/* @__PURE__ */ U("div", {
			className: "h-11 px-3 pl-3.5 flex items-center gap-2 border-b border-border shrink-0",
			children: [
				/* @__PURE__ */ H("span", {
					className: "text-base",
					"aria-hidden": !0,
					children: "⧉"
				}),
				/* @__PURE__ */ U("div", {
					className: "flex-1 text-[13px] font-semibold text-text-primary",
					children: [m.length, " nodes selected"]
				}),
				/* @__PURE__ */ H("button", {
					type: "button",
					onClick: y,
					className: "w-7 h-7 p-0 bg-transparent border-none text-neutral text-lg leading-none cursor-pointer rounded font-inherit",
					"aria-label": "Close",
					children: "×"
				})
			]
		}), /* @__PURE__ */ U("div", {
			className: "flex-1 overflow-y-auto p-4 flex flex-col gap-3",
			children: [/* @__PURE__ */ H("div", {
				className: "text-xs text-neutral leading-normal",
				children: "Bulk actions apply to every selected node. Individual node configuration is only shown for single selections."
			}), /* @__PURE__ */ U("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ H("button", {
					type: "button",
					onClick: x,
					className: "px-2.5 py-1.5 text-xs font-semibold bg-transparent text-danger-fg border border-danger-border rounded-md cursor-pointer font-inherit",
					children: "Delete all"
				}), /* @__PURE__ */ H("button", {
					type: "button",
					onClick: S,
					className: "px-2.5 py-1.5 text-xs font-semibold bg-surface-hover text-text-primary border border-border rounded-md cursor-pointer font-inherit",
					children: "Duplicate all"
				})]
			})]
		})] }) : _ && b ? /* @__PURE__ */ U(V, { children: [
			/* @__PURE__ */ U("div", {
				className: "h-11 px-3 pl-3.5 flex items-center gap-2 border-b border-border shrink-0",
				children: [
					/* @__PURE__ */ H("span", {
						className: "text-lg leading-none",
						"aria-hidden": !0,
						children: b.icon
					}),
					/* @__PURE__ */ H("div", {
						className: "flex-1 text-[13px] font-semibold text-text-primary",
						children: b.name
					}),
					/* @__PURE__ */ H("button", {
						type: "button",
						onClick: y,
						className: "w-7 h-7 p-0 bg-transparent border-none text-neutral text-lg leading-none cursor-pointer rounded font-inherit",
						"aria-label": "Close",
						children: "×"
					})
				]
			}),
			/* @__PURE__ */ H("div", {
				ref: p,
				role: "tablist",
				"aria-label": "Node configuration tabs",
				className: "h-9 flex border-b border-border shrink-0",
				onKeyDown: (e) => {
					let t = _ && Tc.has(_.type) ? [
						"config",
						"runs",
						"docs",
						"bench"
					] : [
						"config",
						"runs",
						"docs"
					], n = t.indexOf(l), r = null;
					e.key === "ArrowRight" ? r = t[(n + 1) % t.length] : e.key === "ArrowLeft" ? r = t[(n - 1 + t.length) % t.length] : e.key === "Home" ? r = t[0] : e.key === "End" && (r = t[t.length - 1]), r && (e.preventDefault(), u(r), (p.current?.querySelector(`[data-tab="${r}"]`))?.focus());
				},
				children: (_ && Tc.has(_.type) ? [
					"config",
					"runs",
					"docs",
					"bench"
				] : [
					"config",
					"runs",
					"docs"
				]).map((e) => {
					let t = l === e, n = e === "config" ? "Config" : e === "runs" ? "Runs" : e === "docs" ? "Docs" : "Bench";
					return /* @__PURE__ */ H("button", {
						type: "button",
						role: "tab",
						"aria-selected": t,
						tabIndex: t ? 0 : -1,
						"data-tab": e,
						className: r("flex-1 border-none bg-transparent text-xs font-semibold cursor-pointer font-inherit", t ? "text-text-primary border-b-2 border-b-primary" : "text-neutral border-b-2 border-b-transparent"),
						onClick: () => u(e),
						children: n
					}, e);
				})
			}),
			/* @__PURE__ */ U("div", {
				className: "flex-1 overflow-y-auto",
				children: [
					l === "config" && kc(_, C),
					l === "runs" && (v ? /* @__PURE__ */ U("div", {
						className: "p-4 flex flex-col gap-3 text-[13px]",
						"data-testid": "config-runs-latest",
						children: [
							/* @__PURE__ */ U("div", {
								className: "flex items-center gap-2",
								children: [
									/* @__PURE__ */ H(f, {
										state: wc[v.status],
										label: v.status,
										size: "sm",
										"data-testid": "config-runs-status"
									}),
									v.durationMs != null && /* @__PURE__ */ H("span", {
										className: "text-text-secondary tabular-nums",
										children: ia(v.durationMs)
									}),
									v.startedAt && /* @__PURE__ */ H("span", {
										className: "text-text-tertiary ml-auto",
										children: oa(v.startedAt)
									})
								]
							}),
							v.error && /* @__PURE__ */ H("div", {
								role: "alert",
								className: "rounded-md border border-danger-border bg-danger-bg px-2.5 py-2 text-xs text-danger-fg whitespace-pre-wrap break-words",
								children: v.error
							}),
							v.output !== void 0 && /* @__PURE__ */ U("div", {
								className: "flex flex-col gap-1",
								children: [/* @__PURE__ */ H("span", {
									className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary",
									children: "Output"
								}), /* @__PURE__ */ H("pre", {
									className: "max-h-48 overflow-auto rounded-md bg-surface-panel border border-border p-2 font-mono text-[11px] text-text-primary whitespace-pre-wrap break-words m-0",
									children: typeof v.output == "string" ? v.output : JSON.stringify(v.output, null, 2)
								})]
							})
						]
					}) : /* @__PURE__ */ H("div", {
						className: "p-6 text-xs text-neutral",
						children: "No runs yet."
					})),
					l === "docs" && /* @__PURE__ */ H("div", {
						className: "pipeline-docs-pane p-4 text-[13px] text-text-primary leading-snug",
						children: Js[_.type] ?? /* @__PURE__ */ H("p", {
							className: "text-text-secondary",
							children: "No docs available for this node type."
						})
					}),
					l === "bench" && Tc.has(_.type) && (() => {
						let e = _.data;
						return /* @__PURE__ */ H(Sc, {
							systemPrompt: e.systemPrompt ?? "",
							userPrompt: e.userPrompt ?? "",
							outputSchema: e.outputSchema,
							model: e.model,
							onSave: (e) => {
								C(e);
							}
						});
					})()
				]
			}),
			/* @__PURE__ */ U("div", {
				className: "h-10 px-3 flex items-center justify-between gap-2 border-t border-border shrink-0",
				children: [/* @__PURE__ */ H("button", {
					type: "button",
					onClick: x,
					className: "px-2.5 py-1.5 text-xs font-semibold bg-transparent text-danger-fg border border-transparent rounded-md cursor-pointer font-inherit",
					children: "🗑 Delete node"
				}), /* @__PURE__ */ U("button", {
					type: "button",
					onClick: S,
					className: "px-2.5 py-1.5 text-xs font-semibold bg-surface-hover text-text-primary border border-border rounded-md cursor-pointer font-inherit",
					children: ["⧉", " Duplicate"]
				})]
			})
		] }) : null
	});
}
//#endregion
//#region src/components/pipelines/RunDetailDrawer.tsx
function jc(e) {
	return e == null || e === 0 ? "--" : e < .001 ? "<$0.001" : e < .01 ? `$${e.toFixed(4)}` : e < 1 ? `$${e.toFixed(3)}` : `$${e.toFixed(2)}`;
}
function Mc(e) {
	return e == null || e === 0 ? "text-text-tertiary" : e < .01 ? "text-success-fg" : e < .1 ? "text-warning-fg" : e < 1 ? "text-caution-fg" : "text-danger-fg";
}
function Nc(e) {
	switch (e) {
		case "completed": return "success";
		case "failed": return "danger";
		case "cancelled": return "neutral";
		case "running": return "info";
		case "pending": return "neutral";
		case "awaiting_approval": return "warning";
		default: return "neutral";
	}
}
function Pc(e) {
	switch (e) {
		case "completed": return "Completed";
		case "failed": return "Failed";
		case "cancelled": return "Cancelled";
		case "running": return "Running";
		case "pending": return "Pending";
		case "awaiting_approval": return "Awaiting";
		default: return e;
	}
}
function Fc(e) {
	return e.triggeredBy.userId ? e.triggeredBy.userId : e.triggeredBy.triggerType || "manual";
}
function Ic({ label: e, children: t }) {
	return /* @__PURE__ */ U("div", {
		className: "flex items-baseline gap-2",
		children: [/* @__PURE__ */ H("span", {
			className: "min-w-[80px] text-[11px] font-semibold uppercase text-text-tertiary",
			children: e
		}), /* @__PURE__ */ H("span", {
			className: "text-[13px] text-text-primary",
			children: t
		})]
	});
}
function Lc({ pipelineId: e, run: t, onBack: n }) {
	let i = rt();
	return /* @__PURE__ */ U("div", {
		className: "absolute inset-0 z-[2] flex flex-col overflow-hidden bg-surface",
		children: [/* @__PURE__ */ U("div", {
			className: "flex shrink-0 items-center gap-2 border-b border-border px-4 py-2.5",
			children: [/* @__PURE__ */ H("button", {
				type: "button",
				onClick: n,
				className: "cursor-pointer border-none bg-transparent p-0 font-inherit text-[13px] text-primary",
				children: "← Back"
			}), /* @__PURE__ */ H("span", {
				className: "font-mono text-xs text-text-tertiary",
				children: t.id.slice(0, 12)
			})]
		}), /* @__PURE__ */ H("div", {
			className: "flex-1 overflow-y-auto p-4",
			children: /* @__PURE__ */ U("div", {
				className: "flex flex-col gap-3",
				children: [
					/* @__PURE__ */ H(Ic, {
						label: "Status",
						children: /* @__PURE__ */ H(x, {
							tone: Nc(t.status),
							"aria-label": `Status: ${Pc(t.status)}`,
							children: Pc(t.status)
						})
					}),
					/* @__PURE__ */ H(Ic, {
						label: "Started",
						children: new Date(t.startedAt).toLocaleString()
					}),
					t.completedAt && /* @__PURE__ */ H(Ic, {
						label: "Completed",
						children: new Date(t.completedAt).toLocaleString()
					}),
					/* @__PURE__ */ H(Ic, {
						label: "Duration",
						children: ia(t.durationMs)
					}),
					/* @__PURE__ */ H(Ic, {
						label: "Triggered by",
						children: Fc(t)
					}),
					/* @__PURE__ */ H(Ic, {
						label: "Trigger type",
						children: t.triggeredBy.triggerType
					}),
					t.estimatedCostUsd != null && t.estimatedCostUsd > 0 && /* @__PURE__ */ U(Ic, {
						label: "Est. Cost",
						children: [/* @__PURE__ */ H("span", {
							className: r("font-semibold", Mc(t.estimatedCostUsd)),
							children: jc(t.estimatedCostUsd)
						}), t.estimatedCostUsd > 1 && /* @__PURE__ */ H("span", {
							className: "ml-1.5 rounded-sm bg-warning-bg px-1 py-px text-[9px] font-bold uppercase text-warning-fg",
							children: "Budget Warning"
						})]
					}),
					t.tokenUsage && Object.keys(t.tokenUsage).length > 0 && /* @__PURE__ */ U("div", {
						className: "mt-2",
						children: [/* @__PURE__ */ H("div", {
							className: "mb-1.5 text-[11px] font-semibold uppercase text-text-secondary",
							children: "Cost Breakdown"
						}), Object.entries(t.tokenUsage).map(([e, t]) => /* @__PURE__ */ U("div", {
							className: "flex items-center gap-2 py-0.5 text-[11px]",
							children: [/* @__PURE__ */ H("span", {
								className: "min-w-[100px] font-mono text-text-secondary",
								children: e
							}), /* @__PURE__ */ U("span", {
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
					t.error && /* @__PURE__ */ U("div", {
						className: "mt-2",
						children: [/* @__PURE__ */ H("div", {
							className: "mb-1 text-[11px] font-semibold uppercase text-state-failed",
							children: "Error"
						}), /* @__PURE__ */ U("div", {
							className: "whitespace-pre-wrap break-words rounded-md bg-danger-bg px-2.5 py-2 font-mono text-xs text-danger-fg",
							children: [t.error.message, t.error.nodeId && /* @__PURE__ */ U("div", {
								className: "mt-1 text-[11px] text-danger-fg",
								children: ["at node: ", t.error.nodeId]
							})]
						})]
					}),
					/* @__PURE__ */ H("button", {
						type: "button",
						onClick: () => i(`/pipelines/${e}/runs/${t.id}`),
						"data-testid": "runs-panel-replay-btn",
						className: "mt-3 w-full cursor-pointer rounded-md border-none bg-primary px-3.5 py-2 font-inherit text-[13px] font-semibold text-white",
						children: "View Full Run"
					}),
					Object.keys(t.steps).length > 0 && /* @__PURE__ */ U("div", {
						className: "mt-2",
						children: [/* @__PURE__ */ U("div", {
							className: "mb-1.5 text-[11px] font-semibold uppercase text-text-secondary",
							children: [
								"Steps (",
								Object.keys(t.steps).length,
								")"
							]
						}), Object.entries(t.steps).map(([e, t]) => {
							let n = Nc(t.status), r = Pc(t.status), i = t.output, a = i?.response;
							return /* @__PURE__ */ U("div", {
								className: "mb-2",
								children: [
									/* @__PURE__ */ U("div", {
										className: "flex items-center gap-2 py-1 text-xs",
										children: [
											/* @__PURE__ */ H(x, {
												tone: n,
												"aria-label": `Status: ${r}`,
												children: r
											}),
											/* @__PURE__ */ H("span", {
												className: "font-mono text-[11px] text-text-secondary",
												children: e.slice(0, 10)
											}),
											t.durationMs != null && /* @__PURE__ */ H("span", {
												className: "ml-auto text-[11px] text-text-tertiary",
												children: ia(t.durationMs)
											})
										]
									}),
									a && /* @__PURE__ */ H("div", {
										className: "mt-1 max-h-40 overflow-y-auto whitespace-pre-wrap break-words rounded-md border border-border bg-surface-inset px-2.5 py-2 text-xs leading-relaxed text-text-primary",
										children: a
									}),
									i && !a && Object.keys(i).length > 0 && /* @__PURE__ */ H("div", {
										className: "mt-1 max-h-[120px] overflow-y-auto whitespace-pre-wrap break-words rounded-md border border-border bg-surface-inset px-2.5 py-1.5 font-mono text-[11px] text-text-secondary",
										children: JSON.stringify(i, null, 2)
									})
								]
							}, e);
						})]
					}),
					/* @__PURE__ */ H("div", {
						className: "mt-3",
						children: /* @__PURE__ */ U("details", { children: [/* @__PURE__ */ H("summary", {
							className: "cursor-pointer select-none text-[11px] text-text-tertiary",
							children: "Raw snapshot JSON"
						}), /* @__PURE__ */ H("pre", {
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
function Rc(e) {
	return e == null || e === 0 ? "--" : e < .001 ? "<$0.001" : e < .01 ? `$${e.toFixed(4)}` : e < 1 ? `$${e.toFixed(3)}` : `$${e.toFixed(2)}`;
}
function zc(e) {
	return e == null || e === 0 ? "text-text-tertiary" : e < .01 ? "text-success-fg" : e < .1 ? "text-warning-fg" : e < 1 ? "text-caution-fg" : "text-danger-fg";
}
function Bc(e) {
	let t = Date.now() - new Date(e).getTime();
	return t < 6e4 ? "just now" : t < 36e5 ? `${Math.floor(t / 6e4)}m ago` : t < 864e5 ? `${Math.floor(t / 36e5)}h ago` : t < 2592e5 ? `${Math.floor(t / 864e5)}d ago` : new Date(e).toLocaleDateString();
}
function Vc(e) {
	switch (e) {
		case "completed": return "success";
		case "failed": return "danger";
		case "cancelled": return "neutral";
		case "running": return "info";
		case "pending": return "neutral";
		case "awaiting_approval": return "warning";
		default: return "neutral";
	}
}
function Hc(e) {
	switch (e) {
		case "completed": return "Completed";
		case "failed": return "Failed";
		case "cancelled": return "Cancelled";
		case "running": return "Running";
		case "pending": return "Pending";
		case "awaiting_approval": return "Awaiting";
		default: return e;
	}
}
function Uc(e) {
	return e.triggeredBy.userId ? e.triggeredBy.userId : e.triggeredBy.triggerType || "manual";
}
function Wc({ pipelineId: e, onClose: t }) {
	let n = rt(), [i, a] = B([]), [o, s] = B(!0), [c, l] = B(null), [u, d] = B(null), [f, p] = B(!1), [m, h] = B([]), g = z(null), _ = I(async () => {
		s(!0), l(null);
		try {
			let t = await xe(e, { limit: 50 });
			a(t.runs);
		} catch (e) {
			l(e instanceof Error ? e.message : "Failed to load runs");
		} finally {
			s(!1);
		}
	}, [e]);
	L(() => {
		g.current !== e && (g.current = e, _());
	}, [e, _]), k("*", I((t) => {
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
	let v = R(() => i.find((e) => e.id === u) ?? null, [i, u]), y = I((e) => {
		h((t) => t.includes(e) ? t.filter((t) => t !== e) : t.length >= 2 ? [t[1], e] : [...t, e]);
	}, []), b = I((e) => {
		f ? y(e) : d(e);
	}, [f, y]), S = I(() => {
		if (m.length !== 2) return;
		let [t, r] = m;
		n(`/pipelines/${e}/compare?a=${t}&b=${r}`);
	}, [
		m,
		n,
		e
	]);
	return /* @__PURE__ */ U("div", {
		className: "relative flex min-h-0 flex-1 flex-col overflow-hidden bg-surface",
		"data-testid": "pipeline-runs-panel",
		children: [
			/* @__PURE__ */ U("div", {
				className: "flex shrink-0 items-center justify-between border-b border-border px-4 py-3",
				children: [/* @__PURE__ */ H("span", {
					className: "text-sm font-bold text-text-primary",
					children: "Run History"
				}), /* @__PURE__ */ U("div", {
					className: "ml-auto flex items-center gap-1.5",
					children: [/* @__PURE__ */ H("button", {
						type: "button",
						onClick: () => {
							p(!f), f && h([]);
						},
						"data-testid": "runs-panel-compare-toggle",
						className: r("cursor-pointer rounded px-2 py-0.5 font-inherit text-[11px] font-medium", f ? "border border-primary bg-primary text-white" : "border border-border bg-surface text-text-secondary"),
						children: "Compare"
					}), /* @__PURE__ */ H("button", {
						type: "button",
						onClick: t,
						"aria-label": "Close runs panel",
						className: "cursor-pointer rounded border-none bg-transparent px-1.5 py-0.5 text-base text-text-tertiary",
						children: "x"
					})]
				})]
			}),
			f && /* @__PURE__ */ U("div", {
				className: "flex shrink-0 items-center gap-2 border-b border-border bg-surface-inset px-4 py-2",
				"data-testid": "runs-panel-compare-bar",
				children: [/* @__PURE__ */ U("span", {
					className: "text-[11px] text-text-secondary",
					children: [m.length, "/2 selected"]
				}), /* @__PURE__ */ H("button", {
					type: "button",
					disabled: m.length !== 2,
					onClick: S,
					"data-testid": "runs-panel-compare-action",
					className: r("ml-auto rounded px-2.5 py-0.5 font-inherit text-[11px] font-semibold", m.length === 2 ? "cursor-pointer border border-primary bg-primary text-white" : "cursor-not-allowed border border-border bg-surface text-text-disabled"),
					children: "Compare"
				})]
			}),
			/* @__PURE__ */ U("div", {
				className: "relative min-h-0 flex-1",
				children: [
					v && /* @__PURE__ */ H(Lc, {
						pipelineId: e,
						run: v,
						onBack: () => d(null)
					}),
					o && i.length === 0 && /* @__PURE__ */ H("div", {
						className: "p-6 text-center text-[13px] text-text-tertiary",
						children: "Loading runs..."
					}),
					c && /* @__PURE__ */ U("div", {
						className: "p-4 text-center text-xs text-state-failed",
						children: [c, /* @__PURE__ */ H("button", {
							type: "button",
							onClick: () => void _(),
							className: "mx-auto mt-2 block cursor-pointer border-none bg-transparent font-inherit text-xs text-primary underline",
							children: "Retry"
						})]
					}),
					!o && !c && i.length === 0 && /* @__PURE__ */ H("div", {
						className: "p-6 text-center text-[13px] text-text-tertiary",
						children: "No runs yet. Trigger this pipeline to see history here."
					}),
					i.length > 0 && /* @__PURE__ */ H("ul", {
						className: "m-0 flex-1 list-none overflow-y-auto p-0",
						children: i.map((e) => {
							let t = Vc(e.status), n = Hc(e.status), i = m.includes(e.id);
							return /* @__PURE__ */ U("li", {
								"data-testid": `runs-panel-row-${e.id}`,
								role: "button",
								tabIndex: 0,
								"aria-label": f ? `Toggle run ${e.id.slice(0, 8)} for comparison` : `Open run ${e.id.slice(0, 8)}`,
								onClick: () => b(e.id),
								onKeyDown: E(() => b(e.id)),
								className: r("cursor-pointer border-b border-border px-4 py-2.5 transition-colors duration-100 hover:bg-surface-hover", i && "bg-info-bg"),
								children: [
									/* @__PURE__ */ U("div", {
										className: "flex items-center gap-2",
										children: [
											f && /* @__PURE__ */ H(Xe, {
												checked: i,
												onChange: () => y(e.id),
												onClick: (e) => e.stopPropagation(),
												onKeyDown: (e) => e.stopPropagation(),
												"data-testid": `runs-panel-compare-check-${e.id}`,
												className: "m-0 shrink-0",
												"aria-label": `Select run ${e.id.slice(0, 8)} for comparison`
											}),
											/* @__PURE__ */ H(x, {
												tone: t,
												"aria-label": `Status: ${n}`,
												children: n
											}),
											/* @__PURE__ */ H("span", {
												className: "font-mono text-xs text-text-secondary",
												children: e.id.slice(0, 8)
											}),
											/* @__PURE__ */ H("span", {
												className: "ml-auto text-[11px] text-text-tertiary",
												children: Bc(e.startedAt)
											})
										]
									}),
									/* @__PURE__ */ U("div", {
										className: "mt-1 flex items-center gap-2 text-[11px] text-text-tertiary",
										children: [
											/* @__PURE__ */ H("span", { children: ia(e.durationMs) }),
											e.estimatedCostUsd != null && e.estimatedCostUsd > 0 && /* @__PURE__ */ H("span", {
												className: r("font-mono font-semibold", zc(e.estimatedCostUsd)),
												title: `Estimated cost: ${Rc(e.estimatedCostUsd)}`,
												children: Rc(e.estimatedCostUsd)
											}),
											e.estimatedCostUsd != null && e.estimatedCostUsd > 1 && /* @__PURE__ */ H("span", {
												className: "rounded-sm bg-warning-bg px-1 py-px text-[9px] font-bold uppercase text-warning-fg",
												children: "High Cost"
											}),
											/* @__PURE__ */ H("span", {
												className: "ml-auto",
												children: Uc(e)
											})
										]
									}),
									e.error && /* @__PURE__ */ H("div", {
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
function Gc({ pipelineId: e, selectedNodeId: t, sidebarTab: n, onTabChange: i }) {
	return /* @__PURE__ */ U("div", {
		className: r("w-[350px] shrink-0 border-l border-border bg-surface", "flex flex-col overflow-hidden"),
		"data-testid": "right-sidebar",
		children: [(t === null || n !== "config") && /* @__PURE__ */ U("div", {
			className: "h-[38px] flex border-b border-border shrink-0",
			children: [/* @__PURE__ */ H("button", {
				type: "button",
				className: r("flex-1 border-none bg-transparent text-xs font-semibold", "cursor-pointer font-inherit px-2", n === "config" ? "text-text-primary border-b-2 border-b-primary" : "text-text-secondary border-b-2 border-b-transparent"),
				onClick: () => i("config"),
				"data-testid": "sidebar-tab-config",
				children: "Config"
			}), /* @__PURE__ */ H("button", {
				type: "button",
				className: r("flex-1 border-none bg-transparent text-xs font-semibold", "cursor-pointer font-inherit px-2", n === "runs" ? "text-text-primary border-b-2 border-b-primary" : "text-text-secondary border-b-2 border-b-transparent"),
				onClick: () => i("runs"),
				"data-testid": "sidebar-tab-runs",
				children: "Runs"
			})]
		}), /* @__PURE__ */ U("div", {
			className: "flex-1 overflow-y-auto flex flex-col",
			children: [n === "config" && (t === null ? /* @__PURE__ */ H("div", {
				className: "flex-1 flex items-center justify-center text-text-tertiary text-[13px] p-5 text-center",
				children: "Select a node to configure"
			}) : /* @__PURE__ */ H(Ac, {})), n === "runs" && /* @__PURE__ */ H(Wc, {
				pipelineId: e,
				onClose: () => i("config")
			})]
		})]
	});
}
//#endregion
//#region src/components/pipelines/PipelineEditorPage.tsx
function Kc(e) {
	return e.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "pipeline";
}
function qc(e) {
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
function Jc(e) {
	if (!(e instanceof HTMLElement)) return !1;
	let t = e.tagName;
	return !!(t === "INPUT" || t === "TEXTAREA" || t === "SELECT" || e.isContentEditable);
}
function Yc() {
	let { pipelineId: e } = it(), t = R(() => e ? le(e) !== null : !1, [e]);
	return !e || !t ? /* @__PURE__ */ H(nt, {
		to: "/pipelines",
		replace: !0
	}) : /* @__PURE__ */ H(de, {
		pipelineId: e,
		children: /* @__PURE__ */ H(Xc, { pipelineId: e })
	});
}
function Xc({ pipelineId: e }) {
	let t = rt(), i = pe(), a = _e(), { toast: s } = n(), { definition: c, dirty: l, selectedNodeId: u, setSelectedNodeId: d, save: f, publish: p, revert: h, undo: g, redo: _, setTags: v } = i, y = Bi(e), [b, x] = B(!1), C = z(null), w = z(l);
	L(() => (w.current && !l && (x(!0), C.current && clearTimeout(C.current), C.current = setTimeout(() => x(!1), 450)), w.current = l, () => {
		C.current &&= (clearTimeout(C.current), null);
	}), [l]);
	let T = R(() => c ? Vr(c) : null, [c]), E = (T?.errors.length ?? 0) > 0, D = R(() => qc(c), [c]), k = R(() => c ? c.nodes.some((e) => e.type === "trigger") : !1, [c]) ? ["trigger"] : [], [A, ee] = B(!0), [j, te] = B(() => {
		if (typeof window > "u") return !1;
		try {
			return window.localStorage.getItem("ws_pipelines_v1_show_tags") === "true";
		} catch {
			return !1;
		}
	}), ne = I(() => {
		te((e) => {
			let t = !e;
			try {
				window.localStorage.setItem("ws_pipelines_v1_show_tags", t ? "true" : "false");
			} catch {}
			return t;
		});
	}, []), [re, M] = B(!1), [ie, ae] = B(!1), [se, ce] = B(!1), [le, ue] = B(!1), [N, de] = B(!1), fe = R(() => c?.publishedSnapshot ? c.publishedSnapshot : null, [c]), he = c?.status === "published", ge = !y.isRunActive && (!he || E), ye = y.isRunActive ? "Cancel the active run" : he ? E ? "Fix validation errors to enable runs" : "Start a new run" : "Publish the pipeline to enable runs", xe = I(async () => {
		if (y.isRunActive && y.currentRunId) {
			a.cancelRun(y.currentRunId);
			return;
		}
		if (!ge) {
			if (D.length > 0) {
				y.setTriggerInputValues(Object.fromEntries(D.map((e) => [e, ""]))), y.setTriggerInputOpen(!0);
				return;
			}
			y.handleRunClick();
		}
	}, [
		y,
		a,
		ge,
		D
	]), { saveError: Se, clearSaveError: Ce } = i;
	L(() => {
		Se && (s(`Could not save: ${Se}`, { type: "error" }), Ce());
	}, [
		Se,
		Ce,
		s
	]);
	let { retryError: we, clearRetryError: Te } = a;
	L(() => {
		we && (s(`Retry failed: ${we.message}`, { type: "error" }), Te());
	}, [
		we,
		Te,
		s
	]), L(() => {
		let e = (e) => {
			if (Jc(e.target)) return;
			let t = e.metaKey || e.ctrlKey;
			if (t && e.key.toLowerCase() === "s") {
				e.preventDefault(), f(), s("Saved", {
					type: "success",
					durationMs: 1200
				});
				return;
			}
			if (t && e.key === "Enter") {
				e.preventDefault(), xe();
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
				d(null);
				return;
			}
		};
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, [
		f,
		s,
		xe,
		y,
		a,
		g,
		_,
		d
	]);
	let Ee = () => {
		if (!c) return;
		let e = ve(c.id);
		e && t(`/pipelines/${e.id}`);
	}, De = () => {
		if (!c) return;
		let e = be(c.id);
		e && Ri(`${Kc(c.name)}.pipeline.json`, e);
	}, Oe = async () => {
		if (!c) return;
		let e = wi(c);
		try {
			if (typeof navigator < "u" && navigator.clipboard?.writeText) await navigator.clipboard.writeText(e), s("Mermaid diagram copied", { type: "success" });
			else throw Error("clipboard unavailable");
		} catch (e) {
			console.warn("[PipelineEditor] clipboard write failed", e), s("Could not copy Mermaid diagram", { type: "error" });
		}
	}, P = () => {
		ue(!0);
	}, ke = () => {
		M(!1), !E && (p(), s("Pipeline published", { type: "success" }));
	}, Ae = () => {
		c && (oe(c.id), ae(!1), t("/pipelines"));
	}, je = () => {
		me(e), ce(!1), s("Run history cleared", { type: "success" });
	}, Me = y.currentRunId ? a.runs[y.currentRunId] : void 0;
	return c ? /* @__PURE__ */ U("div", {
		className: r("flex flex-col min-h-[calc(100vh-200px)]", "bg-surface-inset font-inherit text-text-primary", "rounded-lg border border-border overflow-hidden"),
		"data-testid": "pipeline-editor",
		children: [
			/* @__PURE__ */ H(Ui, {
				pipelineId: e,
				definition: c,
				dirty: l,
				savingFlash: b,
				isRunActive: y.isRunActive,
				isTriggering: y.isTriggering,
				runDisabled: ge,
				runTitle: ye,
				currentRun: Me,
				breakpoints: y.breakpoints,
				onRunClick: xe,
				onDebugRunClick: y.handleDebugRunClick,
				onExport: De,
				onPublishClick: () => M(!0),
				onDuplicate: Ee,
				onCopyMermaid: Oe,
				onViewVersions: P,
				onRevert: h,
				onToggleShowTags: ne,
				showTags: j,
				onViewRunHistory: () => y.setSidebarTab("runs"),
				onClearRunHistory: () => ce(!0),
				onSimPanelOpen: () => de(!0),
				onDelete: () => ae(!0)
			}),
			j && /* @__PURE__ */ U("div", {
				"data-testid": "tags-row",
				className: r("flex items-center gap-2 px-4 py-1.5", "border-b border-border bg-surface-inset", "min-h-[34px] shrink-0 sticky top-11 z-[4]"),
				children: [/* @__PURE__ */ H("span", {
					className: "text-[11px] text-text-tertiary font-semibold",
					children: "TAGS"
				}), /* @__PURE__ */ H(o, {
					value: c.tags ?? [],
					onChange: v,
					placeholder: "add tag…"
				})]
			}),
			/* @__PURE__ */ U("div", {
				className: "flex-1 flex min-h-0 relative overflow-hidden",
				children: [
					/* @__PURE__ */ H(vr, { disabledTypes: k }),
					/* @__PURE__ */ H("div", {
						className: "flex-1 min-w-0 min-h-[600px] relative flex flex-col",
						children: /* @__PURE__ */ H(Ir, {
							errorNodeId: y.activeError?.nodeId ?? null,
							onErrorNodePosition: y.handleErrorNodePosition,
							breakpoints: y.breakpoints,
							onToggleBreakpoint: y.handleToggleBreakpoint,
							pausedAtNodeId: y.pausedBreakpoint?.stepId ?? null
						})
					}),
					/* @__PURE__ */ H(Gc, {
						pipelineId: e,
						selectedNodeId: u,
						sidebarTab: y.sidebarTab,
						onTabChange: y.setSidebarTab
					})
				]
			}),
			y.pausedBreakpoint && /* @__PURE__ */ H(ra, {
				definition: c,
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
			y.activeError && y.errorNodeAnchor && /* @__PURE__ */ H(zr, {
				error: y.activeError,
				anchor: y.errorNodeAnchor,
				onDismiss: y.handleDismissError,
				onRetry: y.handleRetryFromError
			}),
			/* @__PURE__ */ H(Li, {
				runId: y.currentRunId,
				visible: y.isRunActive && A
			}),
			/* @__PURE__ */ H(Ii, {
				publishConfirmOpen: re,
				onPublishClose: () => M(!1),
				onPublishConfirm: ke,
				hasErrors: E,
				validationErrorCount: T?.errors.length ?? 0,
				definitionName: c.name,
				definitionVersion: c.version,
				deleteConfirmOpen: ie,
				onDeleteClose: () => ae(!1),
				onDeleteConfirm: Ae,
				clearRunsConfirmOpen: se,
				onClearRunsClose: () => ce(!1),
				onClearRunsConfirm: je,
				versionDiffOpen: le,
				onVersionDiffClose: () => ue(!1),
				currentDef: c,
				publishedDef: fe,
				onJumpToNode: d,
				simPanelOpen: N,
				onSimPanelClose: () => de(!1)
			}),
			/* @__PURE__ */ H(S, {
				open: y.triggerInputOpen,
				onClose: () => y.setTriggerInputOpen(!1),
				title: "Trigger inputs",
				maxWidth: 480,
				footer: /* @__PURE__ */ U(V, { children: [/* @__PURE__ */ H(m, {
					variant: "ghost",
					onClick: () => y.setTriggerInputOpen(!1),
					children: "Cancel"
				}), /* @__PURE__ */ H(m, {
					variant: "primary",
					onClick: y.handleTriggerInputSubmit,
					disabled: D.some((e) => !y.triggerInputValues[e]?.trim()),
					children: "Run"
				})] }),
				children: /* @__PURE__ */ U("div", {
					className: "flex flex-col gap-3",
					children: [/* @__PURE__ */ H("p", {
						className: "m-0 text-xs text-text-secondary",
						children: "This pipeline expects input data. Provide values for the trigger context:"
					}), D.map((e) => /* @__PURE__ */ U("label", {
						className: "flex flex-col gap-1 text-xs",
						children: [/* @__PURE__ */ H("span", {
							className: "font-medium text-text-primary",
							children: e
						}), /* @__PURE__ */ H(O, {
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
	}) : /* @__PURE__ */ H("div", {
		className: r("flex flex-col min-h-[calc(100vh-200px)]", "bg-surface-inset font-inherit text-text-primary", "rounded-lg border border-border overflow-hidden"),
		children: /* @__PURE__ */ H("div", {
			className: "flex-1 flex items-center justify-center text-text-tertiary text-[13px]",
			children: "Loading pipeline…"
		})
	});
}
//#endregion
//#region src/components/pipelines/PipelineCard.tsx
function Zc(e) {
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
function Qc({ row: e, onOpen: t, onRun: n, onDuplicate: i, onExport: a, onDelete: o, selectionMode: s, selected: c, anySelected: l, onToggleSelect: u }) {
	let [d, f] = B(!1), [p, m] = B(!1), h = z(null);
	Gn(h, () => f(!1), d);
	let g = e.status === "published", _ = e.status === "archived", v = typeof e.publishedVersion == "number", y = Zc(e.triggerBinding), b, S;
	_ ? (b = `Archived · v${e.version}`, S = "danger") : g ? (b = `Published · v${e.version}`, S = "success") : v ? (b = `Draft · v${e.version} (published v${e.publishedVersion})`, S = "warning") : (b = `Draft · v${e.version}`, S = "neutral");
	let C = !g, w = (e) => (t) => {
		t.stopPropagation(), e();
	}, T = s || c || p || l;
	return /* @__PURE__ */ U("div", {
		"data-testid": `pipeline-card-${e.id}`,
		"data-selected": c ? "true" : "false",
		onClick: (e) => {
			s ? u(e.shiftKey) : t();
		},
		onMouseEnter: () => m(!0),
		onMouseLeave: () => {
			m(!1), f(!1);
		},
		className: r("flex flex-col gap-2 w-full px-3.5 py-3 bg-surface rounded-lg cursor-pointer relative transition-[border-color,box-shadow] duration-100", c ? "border border-primary shadow-[0_0_0_4px_rgba(100,108,255,0.18)]" : p ? "border border-primary shadow-[0_2px_8px_rgba(15,23,42,0.06)]" : "border border-border shadow-none"),
		children: [
			T && /* @__PURE__ */ H("label", {
				onClick: (e) => e.stopPropagation(),
				className: "absolute top-2 right-2 flex items-center justify-center w-[22px] h-[22px] cursor-pointer z-[1]",
				children: /* @__PURE__ */ H(Xe, {
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
			/* @__PURE__ */ U("div", {
				className: r("flex items-center gap-2 min-w-0", T && "pr-7"),
				children: [/* @__PURE__ */ H("span", {
					className: "text-lg shrink-0",
					"aria-hidden": !0,
					children: e.icon
				}), /* @__PURE__ */ H("div", {
					className: "flex-1 min-w-0 text-[13px] font-semibold text-text-primary overflow-hidden text-ellipsis whitespace-nowrap",
					title: e.name,
					children: e.name
				})]
			}),
			/* @__PURE__ */ U("div", {
				className: "flex items-center gap-2 flex-wrap",
				children: [
					/* @__PURE__ */ H(x, {
						"aria-label": `Status: ${b}`,
						tone: S,
						size: "sm",
						children: b
					}),
					/* @__PURE__ */ U("span", {
						className: "text-[11px] text-text-secondary",
						children: [
							y.icon,
							" ",
							y.text
						]
					}),
					/* @__PURE__ */ U("span", {
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
			/* @__PURE__ */ U("div", {
				className: "flex items-center gap-1.5",
				children: [
					/* @__PURE__ */ H("button", {
						"data-testid": `run-pipeline-${e.id}`,
						onClick: w(n),
						disabled: C,
						title: C ? "Run requires published state" : "Run pipeline",
						className: "px-3 py-[5px] text-xs font-semibold bg-primary text-white border-none rounded-md font-[inherit] shrink-0 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer",
						children: "Run"
					}),
					/* @__PURE__ */ H("button", {
						"data-testid": `edit-pipeline-${e.id}`,
						onClick: w(t),
						className: "px-3 py-[5px] text-xs font-semibold bg-surface text-text-secondary border border-border-field rounded-md cursor-pointer font-[inherit]",
						children: "Edit"
					}),
					/* @__PURE__ */ U("div", {
						className: "relative ml-auto",
						ref: h,
						children: [/* @__PURE__ */ H("button", {
							"data-testid": `overflow-pipeline-${e.id}`,
							onClick: w(() => f((e) => !e)),
							"aria-label": "More actions",
							"aria-haspopup": "menu",
							"aria-expanded": d,
							className: "px-2 py-1 text-sm font-bold bg-transparent text-text-secondary border border-transparent rounded-md cursor-pointer font-[inherit] leading-none",
							children: "⋯"
						}), d && /* @__PURE__ */ U("div", {
							"data-testid": `overflow-menu-${e.id}`,
							role: "menu",
							"aria-label": "More actions",
							onClick: (e) => e.stopPropagation(),
							className: "absolute right-0 top-full mt-1 bg-surface border border-border rounded-lg shadow-[0_8px_24px_rgba(15,23,42,0.12)] min-w-[160px] z-10 overflow-hidden",
							children: [
								/* @__PURE__ */ H("button", {
									className: "block w-full text-left px-3.5 py-2 text-[13px] border-none bg-transparent cursor-pointer font-[inherit]",
									role: "menuitem",
									onClick: w(() => {
										f(!1), i();
									}),
									children: "Duplicate"
								}),
								/* @__PURE__ */ H("button", {
									className: "block w-full text-left px-3.5 py-2 text-[13px] border-none bg-transparent cursor-pointer font-[inherit]",
									role: "menuitem",
									onClick: w(() => {
										f(!1), a();
									}),
									children: "Export JSON"
								}),
								/* @__PURE__ */ H("button", {
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
var $c = {
	draft: "Draft",
	published: "Published",
	archived: "Archived"
}, el = ["draft", "published"];
function tl({ search: e, onSearchChange: t, statusFilter: n, statusExplicit: i, onToggleStatusKey: a, triggerFilter: o, onTriggerFilterChange: s, sortKey: c, onSortKeyChange: l, allVisibleSelected: u, someVisibleSelected: d, onHeaderToggleAll: f }) {
	return /* @__PURE__ */ U("div", {
		className: r("min-h-[40px] shrink-0 flex items-center gap-3 px-6", "border-b border-border bg-white"),
		children: [
			/* @__PURE__ */ U("label", {
				className: "flex items-center gap-1.5 cursor-pointer",
				title: "Select all visible pipelines",
				children: [/* @__PURE__ */ H(Xe, {
					"data-testid": "pipeline-select-all",
					"aria-label": "Select all visible pipelines",
					checked: u,
					indeterminate: d && !u,
					onChange: f
				}), /* @__PURE__ */ H("span", {
					className: "text-[11px] text-text-tertiary",
					children: "All"
				})]
			}),
			/* @__PURE__ */ H(D, {
				"data-testid": "pipeline-search",
				type: "search",
				size: "sm",
				placeholder: "Search...",
				value: e,
				onChange: (e) => t(e.target.value),
				className: "flex-[0_1_260px] min-w-45",
				"aria-label": "Search pipelines"
			}),
			/* @__PURE__ */ H("span", {
				id: "pipelines-status-label",
				className: "text-xs text-text-secondary font-medium",
				children: "Status:"
			}),
			/* @__PURE__ */ H("div", {
				role: "group",
				"aria-labelledby": "pipelines-status-label",
				className: "flex gap-1.5 flex-nowrap shrink-0",
				children: Ml.map((e) => {
					let t = i ? n.has(e) : el.includes(e);
					return /* @__PURE__ */ H("button", {
						type: "button",
						role: "checkbox",
						"aria-checked": t,
						"data-testid": `status-chip-${e}`,
						onClick: () => a(e),
						onKeyDown: (t) => {
							(t.key === "Enter" || t.key === " ") && (t.preventDefault(), a(e));
						},
						className: r("px-3 py-1.5 text-xs font-medium rounded cursor-pointer font-inherit", t ? "border border-primary bg-primary text-white" : "border border-border bg-white text-text-secondary"),
						children: $c[e]
					}, e);
				})
			}),
			/* @__PURE__ */ U("label", {
				className: "text-xs text-text-secondary flex items-center gap-1.5",
				children: ["Trigger:", /* @__PURE__ */ H(Ye, {
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
			/* @__PURE__ */ U("label", {
				className: "text-xs text-text-secondary flex items-center gap-1.5 ml-auto",
				children: ["Sort:", /* @__PURE__ */ H(Ye, {
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
var nl = r("px-2.5 py-[5px] text-xs font-semibold", "bg-white text-text-secondary", "border border-border-field rounded-md", "cursor-pointer font-inherit");
function rl({ count: e, onClear: t, onExport: n, onExportAsJSON: a, onPublish: o, onArchive: s, onAddTag: c, onRemoveTag: l, onDelete: u, onDeleteWithConfirm: d, addTagOpen: f, removeTagOpen: p, onSubmitAddTag: m, onSubmitRemoveTag: h, onCloseAddTag: g, onCloseRemoveTag: _, unionTags: v }) {
	let [y, b] = B(""), x = z(null), S = z(null), C = z(null);
	L(() => {
		f && (b(""), setTimeout(() => x.current?.focus(), 30));
	}, [f]);
	let w = i(g), T = i(_);
	L(() => {
		if (!f) return;
		let e = (e) => {
			S.current?.contains(e.target) || w();
		}, t = window.setTimeout(() => {
			document.addEventListener("mousedown", e);
		}, 0);
		return () => {
			window.clearTimeout(t), document.removeEventListener("mousedown", e);
		};
	}, [f, w]), L(() => {
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
	return /* @__PURE__ */ U("div", {
		"data-testid": "bulk-action-bar",
		className: r("min-h-[40px] shrink-0 flex items-center gap-3 px-6", "border-b border-border bg-primary-bg", "sticky top-[56px] z-[1]"),
		children: [
			/* @__PURE__ */ U("span", {
				"data-testid": "bulk-count",
				className: "text-[13px] font-semibold text-text-primary",
				children: [e, " selected"]
			}),
			/* @__PURE__ */ H("span", {
				className: "text-text-tertiary",
				children: "·"
			}),
			/* @__PURE__ */ H("button", {
				"data-testid": "bulk-clear",
				className: nl,
				onClick: t,
				children: "Clear"
			}),
			/* @__PURE__ */ H("button", {
				"data-testid": "bulk-publish",
				className: nl,
				onClick: o,
				children: "Publish selected"
			}),
			/* @__PURE__ */ H("button", {
				"data-testid": "bulk-archive",
				className: nl,
				onClick: s,
				children: "Archive selected"
			}),
			/* @__PURE__ */ H("button", {
				"data-testid": "bulk-export-json",
				className: nl,
				onClick: a,
				children: "Export selected as JSON"
			}),
			/* @__PURE__ */ H("button", {
				"data-testid": "bulk-export",
				className: nl,
				onClick: n,
				children: "Export all"
			}),
			/* @__PURE__ */ H("button", {
				"data-testid": "bulk-delete-confirm-prompt",
				className: nl,
				onClick: d,
				children: "Delete selected"
			}),
			/* @__PURE__ */ U("div", {
				className: "relative",
				children: [/* @__PURE__ */ H("button", {
					"data-testid": "bulk-add-tag-btn",
					className: nl,
					onClick: c,
					children: "Add tag..."
				}), f && /* @__PURE__ */ U("div", {
					ref: S,
					"data-testid": "bulk-add-tag-popover",
					onClick: (e) => e.stopPropagation(),
					className: r("absolute top-full left-0 mt-1.5", "bg-white border border-border rounded-lg", "shadow-lg min-w-[220px] p-2.5 z-10", "flex flex-col gap-2"),
					children: [/* @__PURE__ */ H(D, {
						ref: x,
						size: "sm",
						"data-testid": "bulk-add-tag-input",
						placeholder: "Tag name",
						value: y,
						onChange: (e) => b(e.target.value),
						onKeyDown: (e) => {
							e.key === "Enter" ? (e.preventDefault(), E()) : e.key === "Escape" && (e.preventDefault(), g());
						},
						className: r("border border-border-field rounded-md px-2.5 py-1.5 text-[13px]", "bg-surface-inset text-text-primary outline-none w-full"),
						"aria-label": "Tag name"
					}), /* @__PURE__ */ H("button", {
						"data-testid": "bulk-add-tag-submit",
						disabled: y.trim().length === 0,
						onClick: E,
						className: r("px-2.5 py-[5px] text-xs font-semibold", "bg-primary text-white border-none rounded-md", "disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"),
						children: "Add"
					})]
				})]
			}),
			/* @__PURE__ */ U("div", {
				className: "relative",
				children: [/* @__PURE__ */ H("button", {
					"data-testid": "bulk-remove-tag-btn",
					className: r(nl, v.length === 0 && "opacity-50 cursor-not-allowed"),
					onClick: l,
					disabled: v.length === 0,
					title: v.length === 0 ? "No tags on selected pipelines" : "Remove tag from selected",
					children: "Remove tag..."
				}), p && /* @__PURE__ */ U("div", {
					ref: C,
					"data-testid": "bulk-remove-tag-popover",
					onClick: (e) => e.stopPropagation(),
					className: r("absolute top-full left-0 mt-1.5", "bg-white border border-border rounded-lg", "shadow-lg min-w-[220px] max-w-[320px] p-2.5 z-10", "flex flex-col gap-2"),
					children: [/* @__PURE__ */ H("div", {
						className: "text-xs text-text-secondary",
						children: "Click a tag to remove it from all selected:"
					}), /* @__PURE__ */ H("div", {
						className: "flex flex-wrap gap-1.5",
						children: v.length === 0 ? /* @__PURE__ */ H("div", {
							className: "text-xs text-text-tertiary",
							children: "No tags to remove."
						}) : v.map((e) => /* @__PURE__ */ U("button", {
							"data-testid": `bulk-remove-tag-chip-${e}`,
							onClick: () => h(e),
							className: r("px-2 py-0.5 text-xs font-medium", "bg-danger-bg text-danger-fg", "border border-danger-border rounded-full", "cursor-pointer font-inherit"),
							children: [e, " ✕"]
						}, e))
					})]
				})]
			}),
			/* @__PURE__ */ H("button", {
				"data-testid": "bulk-delete",
				className: r("px-3 py-[5px] text-xs font-semibold", "bg-danger text-white border-none rounded-md", "cursor-pointer font-inherit ml-auto"),
				onClick: u,
				children: "Delete"
			})
		]
	});
}
//#endregion
//#region src/components/pipelines/usePipelinesSelection.ts
function il({ visibleRows: e, filteredIds: t }) {
	let [n, r] = B(!1), [i, a] = B(/* @__PURE__ */ new Set()), o = z(null), s = z(null), c = I(() => {
		a(/* @__PURE__ */ new Set());
	}, []), l = I(() => {
		n ? (c(), r(!1)) : r(!0);
	}, [n, c]), u = I((t, n = !1) => {
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
	}, [e]), d = I(() => {
		a(new Set(t));
	}, [t]), f = e.length > 0 && e.every((e) => i.has(e.id)), p = !f && e.some((e) => i.has(e.id)), m = I(() => {
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
	return L(() => {
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
var al = 280, ol = 160, sl = 40, cl = 200;
function Z(e) {
	return sl + e * al;
}
function Q(e) {
	return cl + e * ol;
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
function ll(e) {
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
function ul(e) {
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
				y: Q(0) - ol / 2
			},
			data: d
		},
		{
			id: a,
			type: "action",
			position: {
				x: Z(3),
				y: Q(0) - ol / 2
			},
			data: f
		},
		{
			id: o,
			type: "llm",
			position: {
				x: Z(2),
				y: Q(0) + ol / 2
			},
			data: p
		},
		{
			id: s,
			type: "action",
			position: {
				x: Z(3),
				y: Q(0) + ol / 2
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
function dl(e) {
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
				y: Q(0) - ol / 2
			},
			data: m
		},
		{
			id: o,
			type: "action",
			position: {
				x: Z(3),
				y: Q(0) + ol / 2
			},
			data: h
		},
		{
			id: s,
			type: "approval",
			position: {
				x: Z(4),
				y: Q(0) + ol / 2
			},
			data: g
		},
		{
			id: c,
			type: "condition",
			position: {
				x: Z(5),
				y: Q(0) + ol / 2
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
				y: Q(0) + ol
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
function fl(e) {
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
function pl(e) {
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
function ml(e) {
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
function hl(e) {
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
function gl(e) {
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
function _l(e) {
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
				y: Q(0) - ol / 2
			},
			data: u
		},
		{
			id: a,
			type: "approval",
			position: {
				x: Z(2),
				y: Q(0) + ol / 2
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
function vl(e) {
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
				y: Q(0) - ol / 2
			},
			data: d
		},
		{
			id: o,
			type: "approval",
			position: {
				x: Z(4),
				y: Q(0) - ol / 2
			},
			data: f
		},
		{
			id: s,
			type: "action",
			position: {
				x: Z(3),
				y: Q(0) + ol / 2
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
function yl(e) {
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
				y: Q(0) - ol
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
				y: Q(0) + ol
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
function bl(e) {
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
				y: Q(0) - ol / 2
			},
			data: u
		},
		{
			id: o,
			type: "approval",
			position: {
				x: Z(3),
				y: Q(0) + ol / 2
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
function xl(e) {
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
				y: Q(0) - ol / 2
			},
			data: m
		},
		{
			id: s,
			type: "llm",
			position: {
				x: Z(4),
				y: Q(0) + ol / 2
			},
			data: h
		},
		{
			id: c,
			type: "approval",
			position: {
				x: Z(5),
				y: Q(0) + ol / 2
			},
			data: g
		},
		{
			id: l,
			type: "action",
			position: {
				x: Z(6),
				y: Q(0) + ol / 2
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
var Sl = [
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
		build: ll
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
		build: ul
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
		build: dl,
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
		build: fl,
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
		build: pl,
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
		build: ml
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
		build: hl
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
		build: gl
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
		build: _l
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
		build: vl
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
		build: yl
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
		build: bl
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
		build: xl
	}
], Cl = "/api";
async function wl(e) {
	let t = {
		createdTypes: [],
		errors: []
	};
	if (!e?.documentTypes?.length) return t;
	for (let n of e.documentTypes) try {
		let e = await Tl(n.name);
		if (e) {
			t.createdTypes.push(e.typeId);
			continue;
		}
		let r = await El(n);
		t.createdTypes.push(r.typeId);
	} catch (e) {
		t.errors.push(`Failed to scaffold "${n.name}": ${e instanceof Error ? e.message : String(e)}`);
	}
	return t;
}
async function Tl(e) {
	try {
		let t = await fetch(`${Cl}/document-types`, { credentials: "same-origin" });
		if (!t.ok) return null;
		let n = (await t.json()).items?.find((t) => t.name.toLowerCase() === e.toLowerCase());
		return n ? { typeId: n.typeId } : null;
	} catch {
		return null;
	}
}
async function El(e) {
	let t = e.fields.map((e, t) => ({
		fieldId: crypto.randomUUID(),
		name: e.name,
		fieldType: e.fieldType,
		widget: Dl(e.fieldType),
		cardinality: 1,
		required: e.required ?? !1,
		helpText: "",
		options: e.options,
		order: t
	})), n = await fetch(`${Cl}/document-types`, {
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
function Dl(e) {
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
function Ol(e) {
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
function kl(e) {
	let t = e.triggerBinding?.event ?? "manual";
	return t === "schedule" ? "Schedule" : t === "webhook" ? "Webhook" : t === "manual" ? "Manual" : t.startsWith("document.") ? `On ${t}` : t;
}
function Al({ template: e, meta: t, onPick: n }) {
	return /* @__PURE__ */ U("div", {
		"data-testid": `template-card-${e.id}`,
		className: "flex flex-col gap-2 w-[220px] min-h-[200px] p-3.5 bg-surface border border-border rounded-[10px] font-[inherit]",
		children: [
			/* @__PURE__ */ U("div", {
				className: "flex items-center gap-2.5",
				children: [/* @__PURE__ */ H("span", {
					className: "text-2xl",
					"aria-hidden": !0,
					children: e.icon
				}), /* @__PURE__ */ H("div", {
					className: "text-sm font-bold text-text-primary overflow-hidden text-ellipsis",
					children: e.name
				})]
			}),
			/* @__PURE__ */ U("div", {
				"data-testid": `template-meta-${e.id}`,
				className: "text-[11px] text-text-tertiary flex gap-2",
				children: [
					/* @__PURE__ */ U("span", { children: [
						t.nodeCount,
						" node",
						t.nodeCount === 1 ? "" : "s"
					] }),
					/* @__PURE__ */ H("span", {
						"aria-hidden": !0,
						children: "·"
					}),
					/* @__PURE__ */ H("span", { children: t.trigger })
				]
			}),
			/* @__PURE__ */ H("div", {
				className: "text-xs text-text-secondary leading-[1.4] flex-1",
				children: e.description
			}),
			e.tags.length > 0 && /* @__PURE__ */ H("div", {
				className: "flex flex-wrap gap-1",
				children: e.tags.map((e) => /* @__PURE__ */ H("span", {
					className: "text-[10px] font-semibold px-1.5 py-0.5 rounded bg-surface-hover text-text-secondary lowercase",
					children: e
				}, e))
			}),
			/* @__PURE__ */ H("button", {
				type: "button",
				"data-testid": `template-use-${e.id}`,
				onClick: () => n(e),
				className: "mt-auto px-2.5 py-1.5 text-xs font-semibold bg-primary text-white border-none rounded-md cursor-pointer font-[inherit]",
				children: "Use this template"
			})
		]
	});
}
function jl({ open: t, onClose: n, onCreated: r, onSelect: i }) {
	let { userId: a } = e(), [o, s] = B(""), c = z(null);
	L(() => {
		t && (s(""), setTimeout(() => c.current?.focus(), 30));
	}, [t]);
	let l = R(() => {
		let e = /* @__PURE__ */ new Map();
		for (let t of Sl) {
			let n = t.build(a || "anonymous");
			e.set(t.id, {
				nodeCount: n.nodes.length,
				trigger: kl(n)
			});
		}
		return e;
	}, [a, t]), u = R(() => {
		let e = o.trim().toLowerCase();
		return e ? Sl.filter((t) => t.name.toLowerCase().includes(e) || t.description.toLowerCase().includes(e) || t.tags.some((t) => t.toLowerCase().includes(e))) : Sl;
	}, [o]), d = (e) => {
		if (r) {
			let t = Ol(e.build(a || "anonymous"));
			ze(t), n(), r(t.id), e.prerequisites && wl(e.prerequisites).then((e) => {
				e.errors.length > 0 && console.warn("[TemplatesModal] scaffold errors:", e.errors);
			});
			return;
		}
		i && i(e);
	};
	return /* @__PURE__ */ U(S, {
		open: t,
		onClose: n,
		title: "Pipeline templates",
		maxWidth: 760,
		backdropTestId: "templates-modal",
		rawChildren: !0,
		children: [
			/* @__PURE__ */ H("div", {
				className: "text-[13px] text-text-secondary mb-3",
				children: "Pick a template to spawn a new pipeline with prebuilt nodes and edges."
			}),
			/* @__PURE__ */ H(D, {
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
			u.length === 0 ? /* @__PURE__ */ U("div", {
				"data-testid": "templates-empty",
				className: "text-center p-8 text-[13px] text-text-tertiary",
				children: [
					"No templates match \"",
					o,
					"\"."
				]
			}) : /* @__PURE__ */ H("div", {
				"data-testid": "templates-grid",
				className: "grid grid-cols-[repeat(3,220px)] gap-4 justify-center max-h-[60vh] overflow-y-auto p-2",
				children: u.map((e) => /* @__PURE__ */ H(Al, {
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
var Ml = [
	"draft",
	"published",
	"archived"
], Nl = ["draft", "published"];
function Pl(e) {
	if (e == null) return null;
	if (e.trim() === "") return /* @__PURE__ */ new Set();
	let t = new Set(Ml);
	return new Set(e.split(",").map((e) => e.trim()).filter((e) => t.has(e)));
}
function Fl(e, t) {
	return {
		id: e.id,
		name: e.name,
		status: e.status || "draft",
		updatedAt: e.updatedAt,
		version: e.version,
		publishedVersion: e.publishedVersion,
		nodeCount: (e.nodes ?? []).length,
		triggerBinding: e.triggerBinding,
		createdAt: e.createdAt,
		icon: e.icon ?? t ?? "🔀",
		tags: e.tags ?? []
	};
}
function Il(e) {
	let t = e?.event;
	return !t || t === "manual" ? "manual" : t === "schedule" ? "schedule" : t === "webhook" ? "webhook" : "document";
}
function Ll(e) {
	return e.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "pipeline";
}
function Rl() {
	let e = /* @__PURE__ */ new Date();
	return `${e.getFullYear()}-${String(e.getMonth() + 1).padStart(2, "0")}-${String(e.getDate()).padStart(2, "0")}`;
}
function zl({ open: e, onClose: t, onCreate: n }) {
	let [i, a] = B(""), o = z(null);
	L(() => {
		e && (a(""), setTimeout(() => o.current?.focus(), 50));
	}, [e]);
	let s = i.trim().length > 0, c = () => {
		s && n(i.trim());
	};
	return /* @__PURE__ */ U(S, {
		open: e,
		onClose: t,
		title: "Create new pipeline",
		maxWidth: 440,
		footer: /* @__PURE__ */ U(V, { children: [/* @__PURE__ */ H("button", {
			"data-testid": "new-pipeline-cancel",
			className: "px-3 py-1.5 text-[13px] bg-transparent border-none text-text-secondary cursor-pointer",
			onClick: t,
			children: "Cancel"
		}), /* @__PURE__ */ H("button", {
			"data-testid": "new-pipeline-confirm",
			className: r("px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-white border-none rounded-md cursor-pointer", !s && "opacity-50 cursor-not-allowed"),
			disabled: !s,
			onClick: c,
			children: "Create pipeline"
		})] }),
		children: [/* @__PURE__ */ H("label", {
			className: "block text-[13px] font-semibold text-text-secondary mb-1.5",
			children: "Name"
		}), /* @__PURE__ */ H(D, {
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
function Bl() {
	let t = rt(), { userId: i } = e(), { toast: a } = n(), { triggerRun: o, isTriggering: s } = je(), [c, l] = at(), [u, d] = B([]), [f, p] = B(""), [m, h] = B("all"), [g, _] = B("updated"), v = R(() => Pl(c.get("status")), [c]), y = R(() => v ?? new Set(Nl), [v]), b = v != null, x = (e) => {
		let t = new URLSearchParams(c);
		if (e.size === 0) t.set("status", "");
		else {
			let n = Ml.filter((t) => e.has(t)).join(",");
			t.set("status", n);
		}
		l(t, { replace: !0 });
	}, C = (e) => {
		let t = b ? new Set(y) : new Set(Nl);
		t.has(e) ? t.delete(e) : t.add(e), x(t);
	}, [T, E] = B(!1), [D, O] = B(!1), [k, A] = B(null), [ee, j] = B(!1), [ne, re] = B(!1), [M, ae] = B(!1), oe = I(async () => {
		let e = await ue(), t = [];
		for (let n of e) {
			let e = await he(n.id);
			e && t.push(Fl(e, n.icon));
		}
		d(t);
	}, []);
	L(() => {
		oe();
	}, [oe]);
	let ce = R(() => {
		let e = f.trim().toLowerCase(), t = [...u.filter((t) => {
			if (e) {
				let n = t.name.toLowerCase().includes(e), r = t.tags.some((t) => t.toLowerCase().includes(e));
				if (!n && !r) return !1;
			}
			return !(!(b && y.size === 0) && !y.has(t.status) || m !== "all" && Il(t.triggerBinding) !== m);
		})];
		return g === "name" ? t.sort((e, t) => e.name.localeCompare(t.name)) : g === "created" ? t.sort((e, t) => t.createdAt.localeCompare(e.createdAt)) : t.sort((e, t) => t.updatedAt.localeCompare(e.updatedAt)), t;
	}, [
		u,
		f,
		y,
		b,
		m,
		g
	]), { selectionMode: le, selected: N, allVisibleSelected: de, someVisibleSelected: fe, selectAllRef: pe, handleToggleSelectMode: me, handleToggleSelect: ge, handleSelectAllFiltered: _e, handleHeaderToggleAll: xe, clearSelection: Se, setSelectionMode: Ce } = il({
		visibleRows: ce,
		filteredIds: R(() => ce.map((e) => e.id), [ce])
	}), we = z(/* @__PURE__ */ new Set());
	L(() => {
		let e = we.current;
		return () => {
			e.forEach((e) => window.clearTimeout(e)), e.clear();
		};
	}, []);
	let Te = R(() => {
		let e = /* @__PURE__ */ new Set();
		for (let t of u) if (N.has(t.id)) for (let n of t.tags) e.add(n);
		return Array.from(e).sort((e, t) => e.localeCompare(t));
	}, [u, N]), Ee = async (e) => {
		let n = await ie({
			name: e,
			createdBy: i
		});
		E(!1), t(`/pipelines/${n.id}`);
	}, De = () => {
		let e = ye(i);
		te(e).then(() => oe()), t(`/pipelines/${e.id}`);
	}, Oe = (e) => {
		let n = e.build(i);
		te(n), O(!1), t(`/pipelines/${n.id}`);
	}, P = (e) => t(`/pipelines/${e}`), ke = async (e) => {
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
	}, Ae = (e) => {
		let t = ve(e);
		t && (te(t).then(() => oe()), a(`Duplicated as "${t.name}"`, { type: "success" }));
	}, Me = (e) => {
		let t = be(e.id);
		if (!t) {
			a("Export failed", { type: "error" });
			return;
		}
		Ri(`${Ll(e.name)}.pipeline.json`, t);
	}, Ne = async () => {
		k && (await se(k), A(null), oe(), a("Pipeline deleted", { type: "success" }));
	}, Pe = k ? u.find((e) => e.id === k) : null, Fe = () => {
		let e = Array.from(N);
		e.length !== 0 && (e.forEach((e, t) => {
			let n = window.setTimeout(() => {
				we.current.delete(n);
				let t = u.find((t) => t.id === e), r = be(e);
				!t || !r || Ri(`${Ll(t.name)}-${Rl()}.pipeline.json`, r);
			}, t * 100);
			we.current.add(n);
		}), a(`Exported ${e.length} pipeline${e.length === 1 ? "" : "s"}`, { type: "success" }));
	}, Ie = async (e) => {
		let t = Array.from(N);
		for (let n of t) {
			let t = await he(n);
			if (!t) continue;
			let r = t.tags ?? [];
			r.includes(e) || (t.tags = [...r, e], await te(t));
		}
		re(!1), oe(), a(`Added tag "${e}" to ${t.length} pipeline${t.length === 1 ? "" : "s"}`, { type: "success" });
	}, Le = async (e) => {
		let t = Array.from(N);
		for (let n of t) {
			let t = await he(n);
			if (!t) continue;
			let r = t.tags ?? [];
			r.includes(e) && (t.tags = r.filter((t) => t !== e), await te(t));
		}
		oe(), a(`Removed tag "${e}" from ${t.length} pipeline${t.length === 1 ? "" : "s"}`, { type: "success" });
	}, Re = async () => {
		let e = Array.from(N);
		for (let t of e) await se(t);
		j(!1), Se(), oe(), a(`Deleted ${e.length} pipeline${e.length === 1 ? "" : "s"}`, { type: "success" });
	}, ze = async () => {
		let e = Array.from(N);
		if (e.length === 0) return;
		let t = 0, n = 0;
		for (let r of e) {
			let e = await he(r);
			if (e) {
				if (e.status === "published") {
					n += 1;
					continue;
				}
				await qe(r) && (t += 1);
			}
		}
		oe(), a(n > 0 ? `Published ${t}; skipped ${n} already published` : `Published ${t} pipeline${t === 1 ? "" : "s"}`, { type: "success" });
	}, Be = async () => {
		let e = Array.from(N);
		if (e.length === 0) return;
		let t = 0, n = 0;
		for (let r of e) {
			let e = await he(r);
			e && (e.status === "archived" ? (e.status = "draft", n += 1) : (e.status = "archived", t += 1), await te(e));
		}
		oe();
		let r = [];
		t > 0 && r.push(`Archived ${t}`), n > 0 && r.push(`Unarchived ${n}`), a(r.join(" · ") || "No pipelines changed", { type: "success" });
	}, Ve = async () => {
		let e = Array.from(N);
		if (e.length === 0) return;
		let t = [];
		for (let n of e) {
			let e = await he(n);
			e && t.push(e);
		}
		if (t.length === 0) {
			a("Export failed", { type: "error" });
			return;
		}
		Ri(`pipelines-${(/* @__PURE__ */ new Date()).toISOString().replace(/[:.]/g, "-")}.json`, JSON.stringify(t, null, 2)), a(`Exported ${t.length} pipeline${t.length === 1 ? "" : "s"}`, { type: "success" });
	};
	L(() => {
		let e = (e) => {
			let t = e.target;
			if (t) {
				let e = t.tagName;
				if (e === "INPUT" || e === "TEXTAREA" || e === "SELECT" || t.isContentEditable) return;
			}
			if (e.key === "Escape") {
				(N.size > 0 || le || ne || M) && (re(!1), ae(!1), Se(), Ce(!1));
				return;
			}
			if ((e.metaKey || e.ctrlKey) && (e.key === "a" || e.key === "A")) {
				le && (e.preventDefault(), _e());
				return;
			}
			(e.key === "Delete" || e.key === "Backspace") && N.size > 0 && !ee && !k && !T && !D && (e.preventDefault(), j(!0));
		};
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, [
		N,
		le,
		ne,
		M,
		ee,
		k,
		T,
		D,
		Se,
		_e,
		Ce
	]);
	let He = u.length > 0, Ue = N.size > 0;
	return /* @__PURE__ */ U("div", {
		"data-testid": "pipelines-page",
		className: "flex flex-col h-full overflow-hidden bg-surface-inset font-inherit",
		children: [
			/* @__PURE__ */ U("div", {
				className: r("h-14 shrink-0 flex items-center justify-between px-6", "border-b border-border bg-white", "sticky top-0 z-[2]"),
				children: [/* @__PURE__ */ H("div", {
					className: "text-lg font-bold text-text-primary",
					children: "Pipelines"
				}), /* @__PURE__ */ U("div", {
					className: "flex items-center gap-2",
					children: [
						/* @__PURE__ */ H("button", {
							"data-testid": "metrics-btn",
							onClick: () => t("/pipelines/metrics"),
							className: r("px-4 py-[7px] text-[13px] font-semibold", "bg-white text-text-secondary", "border border-border-field rounded-[7px]", "cursor-pointer font-inherit"),
							children: "Metrics"
						}),
						/* @__PURE__ */ H("button", {
							"data-testid": "templates-btn",
							onClick: () => O(!0),
							className: r("px-4 py-[7px] text-[13px] font-semibold", "bg-white text-text-secondary", "border border-border-field rounded-[7px]", "cursor-pointer font-inherit"),
							children: "Templates"
						}),
						/* @__PURE__ */ H("button", {
							"data-testid": "new-pipeline-btn",
							onClick: () => E(!0),
							className: r("px-4 py-[7px] text-[13px] font-semibold", "bg-primary text-white border-none rounded-md", "cursor-pointer font-inherit"),
							children: "+ New Pipeline"
						})
					]
				})]
			}),
			He && /* @__PURE__ */ H(tl, {
				search: f,
				onSearchChange: p,
				statusFilter: y,
				statusExplicit: b,
				onToggleStatusKey: C,
				triggerFilter: m,
				onTriggerFilterChange: h,
				sortKey: g,
				onSortKeyChange: _,
				allVisibleSelected: de,
				someVisibleSelected: fe,
				onHeaderToggleAll: xe
			}),
			Ue && /* @__PURE__ */ H(rl, {
				count: N.size,
				onClear: Se,
				onExport: Fe,
				onExportAsJSON: Ve,
				onPublish: ze,
				onArchive: Be,
				onAddTag: () => {
					re((e) => !e), ae(!1);
				},
				onRemoveTag: () => {
					ae((e) => !e), re(!1);
				},
				onDelete: () => j(!0),
				onDeleteWithConfirm: () => j(!0),
				addTagOpen: ne,
				removeTagOpen: M,
				onSubmitAddTag: Ie,
				onSubmitRemoveTag: Le,
				onCloseAddTag: () => re(!1),
				onCloseRemoveTag: () => ae(!1),
				unionTags: Te
			}),
			/* @__PURE__ */ H("div", {
				className: r("flex-1 overflow-y-auto overflow-x-hidden min-w-0", He ? "p-6" : "p-0"),
				children: He ? ce.length === 0 ? /* @__PURE__ */ H("div", {
					"data-testid": "filtered-empty",
					className: "text-center p-12 text-[13px] text-text-tertiary",
					children: "No pipelines match the current filters."
				}) : /* @__PURE__ */ H("div", {
					"data-testid": "pipeline-grid",
					className: "grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-[50px]",
					children: ce.map((e) => /* @__PURE__ */ H(Qc, {
						row: e,
						onOpen: () => P(e.id),
						onRun: () => {
							ke(e);
						},
						onDuplicate: () => Ae(e.id),
						onExport: () => Me(e),
						onDelete: () => A(e.id),
						selectionMode: le,
						selected: N.has(e.id),
						anySelected: Ue,
						onToggleSelect: (t) => ge(e.id, t)
					}, e.id))
				}) : /* @__PURE__ */ U("div", {
					className: "flex flex-col h-full",
					children: [/* @__PURE__ */ H("div", {
						className: "flex-1 min-h-0",
						children: /* @__PURE__ */ H(w, {
							icon: "🔀",
							title: "No pipelines yet",
							body: "Design your first one — from scratch or pick a template later.",
							actionLabel: "+ New Pipeline",
							onAction: () => E(!0)
						})
					}), /* @__PURE__ */ U("div", {
						className: "flex justify-center items-center gap-2.5 text-[13px] text-text-tertiary px-6 pb-8",
						children: [
							/* @__PURE__ */ H("button", {
								"data-testid": "empty-state-demo",
								onClick: De,
								className: "bg-transparent border-none p-1 px-2 text-[13px] text-primary cursor-pointer underline font-inherit",
								children: "or try the demo pipeline"
							}),
							/* @__PURE__ */ H("span", {
								"aria-hidden": !0,
								children: "·"
							}),
							/* @__PURE__ */ H("button", {
								"data-testid": "empty-state-templates",
								onClick: () => O(!0),
								className: "bg-transparent border-none p-1 px-2 text-[13px] text-primary cursor-pointer underline font-inherit",
								children: "or browse templates"
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ H(zl, {
				open: T,
				onClose: () => E(!1),
				onCreate: Ee
			}),
			/* @__PURE__ */ H(jl, {
				open: D,
				onClose: () => O(!1),
				onSelect: Oe
			}),
			/* @__PURE__ */ H(S, {
				open: !!k,
				onClose: () => A(null),
				title: "Delete pipeline?",
				maxWidth: 400,
				footer: /* @__PURE__ */ U(V, { children: [/* @__PURE__ */ H("button", {
					"data-testid": "delete-pipeline-cancel",
					className: "px-3 py-1.5 text-[13px] bg-transparent border-none text-text-secondary cursor-pointer",
					onClick: () => A(null),
					children: "Cancel"
				}), /* @__PURE__ */ H("button", {
					"data-testid": "delete-pipeline-confirm",
					onClick: Ne,
					className: r("px-[18px] py-[7px] text-[13px] font-semibold", "bg-danger text-white border-none rounded-[7px]", "cursor-pointer font-inherit"),
					children: "Delete"
				})] }),
				children: Pe && /* @__PURE__ */ U("p", {
					className: "m-0",
					children: [/* @__PURE__ */ U("strong", { children: [
						"“",
						Pe.name,
						"”"
					] }), " will be permanently removed. Run history will also be lost."]
				})
			}),
			/* @__PURE__ */ H(S, {
				open: ee,
				onClose: () => j(!1),
				title: `Delete ${N.size} pipeline${N.size === 1 ? "" : "s"}?`,
				maxWidth: 420,
				backdropTestId: "bulk-delete-modal",
				footer: /* @__PURE__ */ U(V, { children: [/* @__PURE__ */ H("button", {
					"data-testid": "bulk-delete-cancel",
					className: "px-3 py-1.5 text-[13px] bg-transparent border-none text-text-secondary cursor-pointer",
					onClick: () => j(!1),
					children: "Cancel"
				}), /* @__PURE__ */ U("button", {
					"data-testid": "bulk-delete-confirm",
					onClick: Re,
					className: r("px-[18px] py-[7px] text-[13px] font-semibold", "bg-danger text-white border-none rounded-[7px]", "cursor-pointer font-inherit"),
					children: ["Delete ", N.size]
				})] }),
				children: /* @__PURE__ */ U("p", {
					className: "m-0",
					children: [
						/* @__PURE__ */ U("strong", { children: [
							N.size,
							" pipeline",
							N.size === 1 ? "" : "s"
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
var Vl = {
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
function Hl(e, t, n) {
	let r = Vl[e], i = Math.max(0, t | 0), a = Math.max(0, n | 0);
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
function Ul(e) {
	let t = {}, n = 0, r = 0, i = 0, a = 0, o = !1;
	for (let s of e) {
		if (!s.model) continue;
		let e = s.tokensIn ?? 0, c = s.tokensOut ?? 0, l = Hl(s.model, e, c), u = t[s.model];
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
function Wl(e) {
	return !e || !e.modelFound && e.totalCostUsd === 0 ? "—" : e.totalCostUsd >= .01 ? `$${e.totalCostUsd.toFixed(2)}` : e.totalCostUsd === 0 ? "$0.00" : `$${e.totalCostUsd.toFixed(4)}`;
}
function Gl(e) {
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
function Kl(e, t) {
	let n = 0;
	if (e.llm) {
		let r = t.get(e.nodeId);
		r && (n += Hl(r, e.llm.tokensIn, e.llm.tokensOut).totalCostUsd);
	}
	let r = e.costUsd;
	return typeof r == "number" && Number.isFinite(r) && r > 0 && (n += r), n;
}
function ql(e, t) {
	if (!t) return [];
	let n = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
	for (let e of t.nodes) e.data.type === "llm" && n.set(e.id, e.data.model), r.set(e.id, Gl(e)), i.set(e.id, e.data.type);
	let a = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map();
	for (let e of t.nodes) a.set(e.id, 0), o.set(e.id, 0);
	for (let t of e) for (let e of Object.values(t.steps ?? {})) {
		if (!r.has(e.nodeId)) continue;
		let t = Kl(e, n);
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
function Jl(e) {
	return e.slice(0, 10);
}
function Yl(e) {
	return Date.UTC(Number(e.slice(0, 4)), Number(e.slice(5, 7)) - 1, Number(e.slice(8, 10)));
}
function Xl(e, t, n = 30, r = /* @__PURE__ */ new Date()) {
	let i = /* @__PURE__ */ new Map();
	if (t) for (let e of t.nodes) e.data.type === "llm" && i.set(e.id, e.data.model);
	let a = Date.UTC(r.getUTCFullYear(), r.getUTCMonth(), r.getUTCDate()), o = a - (n - 1) * 864e5, s = /* @__PURE__ */ new Map(), c = /* @__PURE__ */ new Map();
	for (let e = o; e <= a; e += 864e5) {
		let t = new Date(e).toISOString().slice(0, 10);
		s.set(t, 0), c.set(t, 0);
	}
	for (let t of e) {
		let e = Jl(t.startedAt);
		if (!s.has(e)) continue;
		let n = 0;
		for (let e of Object.values(t.steps ?? {})) n += Kl(e, i);
		s.set(e, (s.get(e) ?? 0) + n), c.set(e, (c.get(e) ?? 0) + 1);
	}
	let l = [];
	for (let e = o; e <= a; e += 864e5) {
		let t = new Date(e).toISOString().slice(0, 10);
		l.push({
			date: t,
			ts: Yl(t),
			totalCostUsd: s.get(t) ?? 0,
			runCount: c.get(t) ?? 0
		});
	}
	return l;
}
//#endregion
//#region src/components/pipelines/runsUtils.ts
var Zl = [
	"pending",
	"running",
	"completed",
	"failed",
	"cancelled"
], Ql = [
	"manual",
	"scheduled",
	"webhook",
	"document"
], $l = [
	"24h",
	"7d",
	"30d",
	"all"
], eu = {
	"24h": 864e5,
	"7d": 6048e5,
	"30d": 2592e6
};
function tu(e) {
	return e.startsWith("document.") || e === "document" ? "document" : e === "schedule" || e === "scheduled" ? "scheduled" : e === "webhook" ? "webhook" : "manual";
}
function nu(e) {
	let t = 0;
	for (let n of Object.values(e.steps ?? {})) {
		let e = n.attempts?.length ?? 0;
		e > 1 && (t += e - 1);
	}
	return t;
}
function ru(e, t) {
	let n = t.now ?? Date.now(), r = t.range === "all" ? null : n - eu[t.range], i = t.query.trim().toLowerCase();
	return e.filter((e) => {
		if (t.statuses.size > 0 && !t.statuses.has(e.status)) return !1;
		if (t.triggerKinds.size > 0) {
			let n = tu(e.triggeredBy.triggerType);
			if (!t.triggerKinds.has(n)) return !1;
		}
		if (r != null) {
			let t = new Date(e.startedAt).getTime();
			if (Number.isFinite(t) && t < r) return !1;
		}
		if (i.length > 0) {
			let t = e.id.toLowerCase().includes(i), n = e.pipelineId.toLowerCase().includes(i);
			if (!t && !n) return !1;
		}
		return !0;
	});
}
function iu(e, t) {
	if (!e) return /* @__PURE__ */ new Set();
	let n = new Set(t);
	return new Set(e.split(",").map((e) => e.trim()).filter((e) => n.has(e)));
}
function au(e) {
	let t = e.get("range") ?? "7d", n = $l.includes(t) ? t : "7d";
	return {
		query: e.get("q") ?? "",
		statuses: iu(e.get("status"), Zl),
		triggerKinds: iu(e.get("trigger"), Ql),
		range: n
	};
}
//#endregion
//#region src/components/pipelines/RunsFilterBar.tsx
var ou = {
	pending: "Pending",
	running: "Running",
	completed: "Completed",
	failed: "Failed",
	cancelled: "Cancelled",
	paused_at_breakpoint: "Paused"
}, su = {
	manual: "Manual",
	scheduled: "Scheduled",
	webhook: "Webhook",
	document: "Document"
}, cu = {
	"24h": "Last 24h",
	"7d": "Last 7d",
	"30d": "Last 30d",
	all: "All time"
};
function lu({ label: e, options: t, selected: n, onToggle: i, labels: a, testIdPrefix: o }) {
	let [s, c] = B(!1), l = z(null);
	Gn(l, () => c(!1), s);
	let u = n.size === 0 ? "All" : n.size <= 2 ? Array.from(n).map((e) => a[e]).join(", ") : `${n.size} selected`;
	return /* @__PURE__ */ U("div", {
		ref: l,
		className: "relative",
		children: [/* @__PURE__ */ U("button", {
			type: "button",
			onClick: () => c(!s),
			"data-testid": `${o}-dropdown`,
			className: r("flex items-center gap-1.5 px-2.5 py-[5px] text-xs font-medium rounded cursor-pointer font-[inherit] whitespace-nowrap bg-surface text-text-secondary border", n.size > 0 ? "border-primary" : "border-border"),
			children: [
				/* @__PURE__ */ H("span", {
					className: "text-text-tertiary font-semibold text-[11px]",
					children: e
				}),
				/* @__PURE__ */ H("span", {
					className: r(n.size > 0 ? "text-primary font-semibold" : "text-text-secondary font-medium"),
					children: u
				}),
				/* @__PURE__ */ H("span", {
					className: "text-[9px] ml-0.5 opacity-60",
					children: "▾"
				})
			]
		}), s && /* @__PURE__ */ H("div", {
			className: "absolute top-full left-0 mt-1 bg-white border border-border rounded-md shadow-[0_4px_12px_rgba(0,0,0,0.1)] z-50 min-w-[160px] py-1",
			children: t.map((e) => /* @__PURE__ */ U("label", {
				"data-testid": `${o}-${e}`,
				className: "flex items-center gap-2 px-3 py-1.5 text-xs cursor-pointer text-text-primary hover:bg-surface-hover",
				children: [/* @__PURE__ */ H(Xe, {
					checked: n.has(e),
					onChange: () => i(e),
					className: "m-0",
					"aria-label": a[e]
				}), a[e]]
			}, e))
		})]
	});
}
function uu({ query: e, statuses: t, triggerKinds: n, range: i, onQueryChange: a, onStatusToggle: o, onTriggerToggle: s, onRangeChange: c, onClearFilters: l }) {
	let u = t.size > 0 || n.size > 0 || e.length > 0;
	return /* @__PURE__ */ U("div", {
		className: "flex items-center gap-2 px-3 py-2 bg-surface-inset border border-border rounded-md",
		children: [
			/* @__PURE__ */ H(D, {
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
			/* @__PURE__ */ H("div", { className: "w-px h-5 bg-border shrink-0" }),
			/* @__PURE__ */ H("div", {
				role: "radiogroup",
				"aria-label": "Date range",
				onKeyDown: (e) => Je(e, { itemSelector: "[role=\"radio\"]" }),
				className: "flex gap-0.5",
				children: $l.map((e) => /* @__PURE__ */ H("button", {
					type: "button",
					role: "radio",
					"aria-checked": i === e,
					tabIndex: i === e ? 0 : -1,
					"data-testid": `runs-range-${e}`,
					onClick: () => c(e),
					className: r("px-2 py-1 text-[11px] border-none rounded-[3px] cursor-pointer font-[inherit]", i === e ? "font-semibold bg-primary text-white" : "font-medium bg-transparent text-text-secondary"),
					children: cu[e]
				}, e))
			}),
			/* @__PURE__ */ H("div", { className: "w-px h-5 bg-border shrink-0" }),
			/* @__PURE__ */ H(lu, {
				label: "Status",
				options: Zl,
				selected: t,
				onToggle: o,
				labels: ou,
				testIdPrefix: "runs-status-chip"
			}),
			/* @__PURE__ */ H(lu, {
				label: "Trigger",
				options: Ql,
				selected: n,
				onToggle: s,
				labels: su,
				testIdPrefix: "runs-trigger-chip"
			}),
			u && /* @__PURE__ */ H("button", {
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
function du({ selectionCount: e, onExport: t, onDelete: n, onClear: r }) {
	return /* @__PURE__ */ U("div", {
		"data-testid": "runs-bulk-toolbar",
		className: "flex items-center gap-2 px-3 py-2 bg-surface-inset border border-border rounded-md",
		children: [
			/* @__PURE__ */ U("span", {
				className: "text-xs text-text-secondary",
				children: [e, " selected"]
			}),
			/* @__PURE__ */ H("button", {
				type: "button",
				"data-testid": "runs-bulk-export",
				onClick: t,
				className: "px-2.5 py-1 text-xs font-medium border border-border bg-surface text-text-secondary rounded cursor-pointer font-[inherit]",
				children: "Export JSON"
			}),
			/* @__PURE__ */ H("button", {
				type: "button",
				"data-testid": "runs-bulk-delete",
				onClick: n,
				className: "px-2.5 py-1 text-xs font-medium border border-danger bg-surface text-danger-fg rounded cursor-pointer font-[inherit]",
				children: "Delete"
			}),
			/* @__PURE__ */ H("button", {
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
function fu(e) {
	switch (e) {
		case "completed": return {
			label: "Completed",
			tone: "success"
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
		default: return {
			label: e,
			tone: "neutral"
		};
	}
}
function pu(e) {
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
var mu = {
	LLMError: "LLM",
	TimeoutError: "Timeout",
	NetworkError: "Network",
	ValidationError: "Validation",
	RegistryConflict: "Conflict",
	UnknownError: "Unknown"
};
function hu(e) {
	let t = Date.now() - new Date(e).getTime();
	return t < 6e4 ? "just now" : t < 36e5 ? `${Math.floor(t / 6e4)}m ago` : t < 864e5 ? `${Math.floor(t / 36e5)}h ago` : t < 2592e5 ? `${Math.floor(t / 864e5)}d ago` : new Date(e).toLocaleDateString();
}
function gu({ filtered: e, selected: t, onSelectionChange: n, comparePair: i, onToggleComparePair: a, costByRunId: o, pipelineId: s, onNavigate: c, onOpenRetryModal: l }) {
	let u = z(!1), d = z(null), f = e.length > 0 && e.every((e) => t.has(e.id)), p = !f && e.some((e) => t.has(e.id)), m = () => {
		let r = new Set(t);
		if (f) for (let t of e) r.delete(t.id);
		else for (let t of e) r.add(t.id);
		n(r);
	}, h = (r, i, a) => {
		let o = new Set(t), s = !o.has(r);
		if (a && d.current != null) {
			let t = Math.min(d.current, i), n = Math.max(d.current, i);
			for (let r = t; r <= n; r++) {
				let t = e[r];
				t && (s ? o.add(t.id) : o.delete(t.id));
			}
		} else s ? o.add(r) : o.delete(r);
		d.current = i, n(o);
	};
	return /* @__PURE__ */ U("table", {
		className: "w-full border-collapse text-[13px] bg-surface border border-border rounded-lg overflow-hidden",
		children: [/* @__PURE__ */ H("thead", { children: /* @__PURE__ */ U("tr", {
			className: "bg-surface-inset text-left",
			children: [/* @__PURE__ */ H("th", {
				scope: "col",
				className: "px-3 py-2 w-6 border-b border-border",
				children: /* @__PURE__ */ H(Xe, {
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
			].map((e, t) => /* @__PURE__ */ H("th", {
				scope: "col",
				className: "px-3 py-2 text-[11px] font-semibold text-text-secondary uppercase tracking-[0.04em] border-b border-border",
				children: e
			}, `${e}-${t}`))]
		}) }), /* @__PURE__ */ H("tbody", { children: e.map((e, n) => {
			let { tone: d, label: f } = fu(e.status), p = t.has(e.id), m = nu(e);
			return /* @__PURE__ */ U("tr", {
				"data-testid": `run-card-${e.id}`,
				className: r("border-b border-border cursor-pointer hover:bg-surface-hover", p && "bg-surface-hover"),
				onClick: () => c(`/pipelines/${s}/runs/${e.id}`),
				children: [
					/* @__PURE__ */ U("td", {
						className: "px-3 py-2.5 text-xs text-text-secondary w-6",
						onClick: (e) => e.stopPropagation(),
						children: [/* @__PURE__ */ H("span", {
							onMouseDown: (e) => {
								u.current = e.shiftKey;
							},
							onKeyDown: (e) => {
								u.current = e.shiftKey;
							},
							children: /* @__PURE__ */ H(Xe, {
								"data-testid": `run-select-${e.id}`,
								checked: p,
								onChange: () => {
									let t = u.current;
									u.current = !1, h(e.id, n, t);
								},
								"aria-label": `Select run ${e.id.slice(0, 8)}`
							})
						}), /* @__PURE__ */ H("input", {
							type: "checkbox",
							"data-testid": `run-compare-pick-${e.id}`,
							checked: i.includes(e.id),
							onChange: () => a(e.id),
							"aria-label": `Pick run ${e.id.slice(0, 8)} for comparison`,
							className: "absolute w-px h-px opacity-0 pointer-events-none",
							tabIndex: -1
						})]
					}),
					/* @__PURE__ */ H("td", {
						className: "px-3 py-2.5 text-xs text-text-primary",
						children: hu(e.startedAt)
					}),
					/* @__PURE__ */ U("td", {
						className: "px-3 py-2.5 text-xs text-text-secondary",
						children: [
							/* @__PURE__ */ H(x, {
								tone: d,
								"aria-label": `Status: ${f}`,
								children: f
							}),
							e.status === "running" && e.stuckAt && /* @__PURE__ */ H(x, {
								tone: "warning",
								size: "xs",
								"data-testid": `run-stuck-badge-${e.id}`,
								title: `No pipeline events since ${new Date(e.stuckAt).toLocaleTimeString()}`,
								className: "ml-1.5",
								children: "Stuck"
							}),
							e.status === "failed" && e.error?.errorCategory && /* @__PURE__ */ H(x, {
								tone: pu(e.error.errorCategory),
								size: "xs",
								"data-testid": `run-error-category-${e.id}`,
								title: e.error.message,
								className: "ml-1.5",
								children: mu[e.error.errorCategory] ?? e.error.errorCategory
							})
						]
					}),
					/* @__PURE__ */ H("td", {
						className: "px-3 py-2.5 text-xs text-text-secondary font-mono",
						children: ia(e.durationMs)
					}),
					/* @__PURE__ */ H("td", {
						className: r("px-3 py-2.5 text-xs font-mono", m > 0 ? "text-text-primary" : "text-text-tertiary"),
						"data-testid": `run-retries-${e.id}`,
						title: m > 0 ? `${m} retry attempts across this run` : "No retries — every step succeeded on first attempt",
						children: m > 0 ? `×${m}` : "—"
					}),
					/* @__PURE__ */ H("td", {
						className: "px-3 py-2.5 text-xs text-text-secondary font-mono",
						"data-testid": `run-cost-${e.id}`,
						children: o[e.id] ?? "—"
					}),
					/* @__PURE__ */ H("td", {
						className: "px-3 py-2.5 text-xs text-text-secondary",
						children: e.triggeredBy.userId ?? e.triggeredBy.triggerType
					}),
					/* @__PURE__ */ H("td", {
						className: "px-3 py-2.5 text-[11px] font-mono text-text-tertiary",
						children: e.id.slice(0, 8)
					}),
					/* @__PURE__ */ U("td", {
						className: "px-3 py-2.5 text-xs text-text-secondary text-right",
						onClick: (e) => e.stopPropagation(),
						children: [
							e.status === "running" && e.stuckAt && /* @__PURE__ */ H("button", {
								type: "button",
								"data-testid": `force-fail-${e.id}`,
								onClick: async (t) => {
									if (t.stopPropagation(), confirm(`Force-fail stuck run ${e.id.slice(0, 8)}? The run will be interrupted and you can retry from the stuck step.`)) try {
										await Ue(e.pipelineId, e.id);
									} catch (e) {
										alert(`Force-fail failed: ${e instanceof Error ? e.message : String(e)}`);
									}
								},
								title: "Force-fail this stuck run so you can retry from the stuck step",
								className: "text-[11px] px-2 py-1 mr-2 bg-transparent text-warning-fg border border-warning-border rounded cursor-pointer font-[inherit]",
								children: "⚡ Force-fail"
							}),
							e.status === "failed" && e.error?.nodeId && e.error.nodeId !== "unknown" && /* @__PURE__ */ H("button", {
								type: "button",
								"data-testid": `retry-from-failed-step-${e.id}`,
								onClick: (t) => {
									t.stopPropagation(), l(e);
								},
								title: `Retry from "${e.error.nodeId}" with the original upstream context`,
								className: "text-[11px] px-2 py-1 mr-2 bg-transparent text-caution-fg border border-caution-border rounded cursor-pointer font-[inherit]",
								children: "↻ Retry from failed"
							}),
							/* @__PURE__ */ H("button", {
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
function _u() {
	let { pipelineId: e } = it(), t = rt(), [n, i] = at(), [a, o] = B([]), [s, c] = B(null), [l, u] = B([]), [d, f] = B(() => /* @__PURE__ */ new Set()), [p, m] = B(null), [h, g] = B(!1), [_, y] = B(null), [b, x] = B(!1), S = I((e) => {
		let t = e.error?.nodeId;
		if (!t || t === "unknown") return;
		let n = Object.entries(e.steps).filter(([e, n]) => e !== t && n.status === "completed").map(([e]) => e);
		m({
			run: e,
			nodeId: t,
			skippedNodes: n,
			snapshotInput: !1
		}), y(null);
	}, []), T = I(async () => {
		if (p) {
			y(null), g(!0);
			try {
				let e = await Ie(p.run.pipelineId, p.run.id, p.nodeId, void 0, p.snapshotInput || void 0);
				m(null), t(`/pipelines/${p.run.pipelineId}/runs/${e.newRunId}`);
			} catch (e) {
				y(e instanceof Error ? e.message : String(e)), g(!1);
			}
		}
	}, [p, t]), { query: E, statuses: D, triggerKinds: O, range: k } = R(() => au(n), [n]), A = (e, t) => {
		let r = new URLSearchParams(n);
		t ? r.set(e, t) : r.delete(e), i(r, { replace: !0 });
	}, ee = (e) => {
		let t = new Set(D);
		t.has(e) ? t.delete(e) : t.add(e), A("status", t.size === 0 ? null : Array.from(t).join(","));
	}, j = (e) => {
		let t = new Set(O);
		t.has(e) ? t.delete(e) : t.add(e), A("trigger", t.size === 0 ? null : Array.from(t).join(","));
	}, te = (e) => {
		A("range", e === "7d" ? null : e);
	}, ne = (e) => {
		A("q", e.length === 0 ? null : e);
	}, re = (e) => {
		u((t) => t.includes(e) ? t.filter((t) => t !== e) : t.length >= 2 ? [t[1], e] : [...t, e]);
	};
	L(() => {
		e && (c(le(e)), o(Oe(e)));
	}, [e]);
	let M = R(() => ru(a, {
		query: E,
		statuses: D,
		triggerKinds: O,
		range: k
	}), [
		a,
		E,
		D,
		O,
		k
	]), ie = R(() => {
		let e = /* @__PURE__ */ new Map();
		if (!s) return e;
		for (let t of s.nodes) t.data.type === "llm" && e.set(t.id, t.data.model);
		return e;
	}, [s]), ae = R(() => {
		let e = {};
		for (let t of M) {
			let n = Object.values(t.steps).filter((e) => !!e.llm).map((e) => ({
				model: ie.get(e.nodeId),
				tokensIn: e.llm?.tokensIn ?? 0,
				tokensOut: e.llm?.tokensOut ?? 0
			}));
			e[t.id] = Wl(Ul(n).total);
		}
		return e;
	}, [M, ie]);
	return e ? s ? /* @__PURE__ */ U("div", {
		"data-testid": "pipeline-runs-page",
		className: "p-6 flex flex-col gap-3",
		children: [
			/* @__PURE__ */ H(C, {
				open: p !== null,
				onConfirm: T,
				onCancel: () => {
					h || m(null);
				},
				title: "Retry from failure",
				confirmLabel: h ? "Starting…" : "Confirm retry",
				confirmDisabled: h,
				children: p && /* @__PURE__ */ U("div", {
					className: "flex flex-col gap-2.5",
					children: [
						/* @__PURE__ */ U("div", {
							className: "text-[13px] text-text-secondary",
							children: [
								"Run ",
								/* @__PURE__ */ H("code", {
									className: "bg-surface-inset px-1 py-px rounded-[3px] text-xs",
									children: p.run.id.slice(0, 8)
								}),
								" will restart from step",
								" ",
								/* @__PURE__ */ U("code", {
									className: "bg-surface-inset px-1 py-px rounded-[3px] text-xs",
									children: [p.nodeId.slice(0, 12), p.nodeId.length > 12 ? "…" : ""]
								}),
								" ",
								"using the original upstream context."
							]
						}),
						p.skippedNodes.length > 0 && /* @__PURE__ */ U("div", { children: [/* @__PURE__ */ U("div", {
							className: "text-[11px] font-semibold text-text-tertiary uppercase mb-1.5",
							children: [
								"Steps skipped (",
								p.skippedNodes.length,
								")"
							]
						}), /* @__PURE__ */ H("div", {
							className: "max-h-20 overflow-y-auto flex flex-wrap gap-1",
							children: p.skippedNodes.map((e) => /* @__PURE__ */ H("span", {
								className: "bg-surface-inset border border-border rounded-[3px] px-1.5 py-px text-[11px] font-mono text-text-secondary",
								children: e.slice(0, 10)
							}, e))
						})] }),
						/* @__PURE__ */ U("label", {
							className: "flex items-center gap-2 text-[13px] text-text-secondary cursor-pointer",
							children: [/* @__PURE__ */ H(Xe, {
								checked: p.snapshotInput,
								onChange: (e) => m((t) => t && {
									...t,
									snapshotInput: e
								})
							}), "Use persisted input snapshot"]
						}),
						_ && /* @__PURE__ */ H("div", {
							"data-testid": "retry-modal-error",
							className: "px-3 py-2 bg-danger-bg border border-danger-border rounded-md text-xs text-danger-fg",
							children: _
						})
					]
				})
			}),
			/* @__PURE__ */ H(C, {
				open: b,
				onConfirm: () => {
					if (!e) return;
					x(!1);
					let t = Array.from(d), n = a.filter((e) => !d.has(e.id));
					me(e);
					for (let t of [...n].sort((e, t) => e.startedAt.localeCompare(t.startedAt))) Se(e, t);
					o(Oe(e)), f(/* @__PURE__ */ new Set()), u((e) => e.filter((e) => !t.includes(e)));
				},
				onCancel: () => x(!1),
				title: `Delete ${d.size} run${d.size === 1 ? "" : "s"}?`,
				body: "This cannot be undone.",
				confirmLabel: `Delete ${d.size}`,
				tone: "destructive"
			}),
			_ && /* @__PURE__ */ H(v, {
				title: "Retry failed:",
				onDismiss: () => y(null),
				children: _
			}),
			/* @__PURE__ */ U("div", {
				className: "flex items-center gap-3",
				children: [
					/* @__PURE__ */ U("button", {
						type: "button",
						onClick: () => t(`/pipelines/${e}`),
						className: "bg-none border-none text-primary cursor-pointer text-[13px] p-0",
						children: ["← ", s.name]
					}),
					/* @__PURE__ */ H("span", {
						className: "text-text-tertiary",
						children: "/"
					}),
					/* @__PURE__ */ H("span", {
						className: "text-lg font-bold text-text-primary",
						children: "Run history"
					}),
					/* @__PURE__ */ U("span", {
						className: "text-xs text-text-tertiary ml-auto",
						children: [
							a.length,
							" run",
							a.length === 1 ? "" : "s",
							" persisted"
						]
					}),
					/* @__PURE__ */ H("button", {
						type: "button",
						onClick: () => t(`/pipelines/${e}/stats`),
						"data-testid": "runs-stats-link",
						className: "px-2.5 py-1 text-xs font-medium border border-border bg-surface text-text-secondary rounded cursor-pointer font-[inherit]",
						children: "📊 Stats"
					}),
					/* @__PURE__ */ U("button", {
						type: "button",
						disabled: l.length !== 2,
						onClick: () => {
							if (l.length !== 2) return;
							let [n, r] = l;
							t(`/pipelines/${e}/runs/compare/${n}/${r}`);
						},
						"data-testid": "run-compare-btn",
						className: r("px-2.5 py-1 text-xs font-medium rounded font-[inherit]", l.length === 2 ? "border border-primary bg-primary text-white cursor-pointer opacity-100" : "border border-border bg-surface text-text-secondary cursor-not-allowed opacity-70"),
						children: [
							"⇄ Compare (",
							l.length,
							"/2)"
						]
					})
				]
			}),
			/* @__PURE__ */ H(uu, {
				query: E,
				statuses: D,
				triggerKinds: O,
				range: k,
				onQueryChange: ne,
				onStatusToggle: ee,
				onTriggerToggle: j,
				onRangeChange: te,
				onClearFilters: () => {
					ne(""), A("status", null), A("trigger", null);
				}
			}),
			d.size > 0 && /* @__PURE__ */ H(du, {
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
			M.length === 0 ? /* @__PURE__ */ H(w, {
				icon: "📜",
				title: a.length === 0 ? "No runs yet" : "No runs match these filters",
				body: a.length === 0 ? "Trigger this pipeline and completed runs will appear here." : "Try clearing a filter or expanding the date range."
			}) : /* @__PURE__ */ H(gu, {
				filtered: M,
				selected: d,
				onSelectionChange: f,
				comparePair: l,
				onToggleComparePair: re,
				costByRunId: ae,
				pipelineId: e,
				onNavigate: t,
				onOpenRetryModal: S
			})
		]
	}) : /* @__PURE__ */ H("div", {
		className: "p-8",
		children: /* @__PURE__ */ H(w, {
			icon: "🔍",
			title: "Pipeline not found",
			body: "It may have been deleted. Go back to the pipelines list.",
			actionLabel: "Back to pipelines",
			onAction: () => t("/pipelines")
		})
	}) : /* @__PURE__ */ H(nt, {
		to: "/pipelines",
		replace: !0
	});
}
//#endregion
//#region src/components/pipelines/cost/useRunCost.ts
function vu(e) {
	return R(() => {
		if (!e) return null;
		let t = le(e.pipelineId);
		if (!t) return null;
		let n = /* @__PURE__ */ new Map();
		for (let e of t.nodes) e.data.type === "llm" && n.set(e.id, e.data.model);
		return Ul(Object.values(e.steps).filter((e) => !!e.llm).map((e) => ({
			model: n.get(e.nodeId),
			tokensIn: e.llm?.tokensIn ?? 0,
			tokensOut: e.llm?.tokensOut ?? 0
		}))).total;
	}, [e]);
}
//#endregion
//#region src/components/pipelines/steps/StepSection.tsx
function yu({ title: e, children: t }) {
	return /* @__PURE__ */ U("div", {
		className: "px-4 py-2.5 border-t border-border",
		children: [/* @__PURE__ */ H("div", {
			className: "text-[10px] font-bold text-text-tertiary uppercase tracking-[0.5px] mb-1.5",
			children: e
		}), t]
	});
}
var bu = {
	"var(--color-info)": "bg-info/10 text-info-fg",
	"var(--color-cat-ai)": "bg-accent/10 text-accent-fg",
	"var(--color-success)": "bg-success/10 text-success-fg",
	"var(--color-danger)": "bg-danger/10 text-danger-fg"
};
function xu(e) {
	return `inline-block px-1.5 py-px rounded-[3px] text-[10px] font-semibold ${bu[e] ?? ""}`.trimEnd();
}
//#endregion
//#region src/components/pipelines/steps/StepThread.tsx
var Su = {
	completed: "var(--color-success)",
	failed: "var(--color-danger)",
	running: "var(--color-info)"
};
function Cu({ stepId: e, step: t, index: n, nodeType: i, nodeConfig: a, onRetryFromStep: o, onResumeFromStep: s }) {
	let [c, l] = B(!1), u = t.output, d = u?.response, f = t.llm, p = t.input, m = Su[t.status] ?? "var(--color-text-tertiary)";
	return /* @__PURE__ */ U("div", {
		className: "relative pl-9 mb-1",
		children: [
			/* @__PURE__ */ H("div", {
				className: "absolute left-[10px] top-[14px] w-3 h-3 rounded-full border-2 border-white z-[1] shadow-[0_0_0_1px_#e2e8f0]",
				style: { background: m }
			}),
			/* @__PURE__ */ U("div", {
				onClick: () => l(!c),
				"aria-expanded": c,
				role: "button",
				tabIndex: 0,
				onKeyDown: (e) => {
					(e.key === "Enter" || e.key === " ") && (e.preventDefault(), l(!c));
				},
				className: r("flex items-center gap-2.5 px-3.5 py-2.5 cursor-pointer transition-colors duration-100", c ? "bg-surface-inset rounded-t-lg" : "bg-surface rounded-lg"),
				style: {
					border: `1px solid ${c ? m + "40" : "var(--color-border)"}`,
					...c ? { borderRadius: "8px 8px 0 0" } : {}
				},
				children: [
					/* @__PURE__ */ H("span", {
						"aria-hidden": "true",
						className: r("text-[10px] text-text-tertiary shrink-0 transition-transform duration-150", c && "rotate-90"),
						children: "▶"
					}),
					/* @__PURE__ */ H("span", {
						"aria-label": `Status: ${t.status}`,
						className: "text-[10px] font-bold text-white px-1.5 py-0.5 rounded-[3px] uppercase shrink-0",
						style: { background: m },
						children: t.status
					}),
					/* @__PURE__ */ U("span", {
						className: "text-[13px] font-semibold text-text-primary",
						children: [
							n + 1,
							". ",
							i
						]
					}),
					/* @__PURE__ */ H("span", {
						className: "text-[11px] font-mono text-text-tertiary",
						children: e.slice(0, 8)
					}),
					t.durationMs != null && /* @__PURE__ */ H("span", {
						className: "text-[11px] text-text-tertiary ml-auto",
						children: t.durationMs < 1e3 ? `${t.durationMs}ms` : `${(t.durationMs / 1e3).toFixed(1)}s`
					}),
					f && /* @__PURE__ */ U("span", {
						className: "text-[10px] text-text-tertiary font-mono",
						children: [f.tokensIn + f.tokensOut, " tok"]
					}),
					u?.tokensIn != null && !f && /* @__PURE__ */ U("span", {
						className: "text-[10px] text-text-tertiary font-mono",
						children: [Number(u.tokensIn) + Number(u.tokensOut), " tok"]
					})
				]
			}),
			c && /* @__PURE__ */ U("div", {
				className: "border-t-0 rounded-b-lg bg-surface overflow-hidden",
				style: { border: `1px solid ${m}40` },
				children: [
					/* @__PURE__ */ H(yu, {
						title: "Execution Timeline",
						children: /* @__PURE__ */ U("table", {
							className: "w-full text-[11px] border-collapse font-mono",
							children: [/* @__PURE__ */ H("thead", { children: /* @__PURE__ */ U("tr", {
								className: "border-b border-border",
								children: [
									/* @__PURE__ */ H("th", {
										scope: "col",
										className: "text-left px-2 py-1 text-[10px] font-semibold text-text-tertiary uppercase",
										children: "Event"
									}),
									/* @__PURE__ */ H("th", {
										scope: "col",
										className: "text-left px-2 py-1 text-[10px] font-semibold text-text-tertiary uppercase",
										children: "Time"
									}),
									/* @__PURE__ */ H("th", {
										scope: "col",
										className: "text-left px-2 py-1 text-[10px] font-semibold text-text-tertiary uppercase",
										children: "Detail"
									})
								]
							}) }), /* @__PURE__ */ U("tbody", { children: [
								t.startedAt && /* @__PURE__ */ U("tr", {
									className: "border-b border-border",
									children: [
										/* @__PURE__ */ H("td", {
											className: "px-2 py-[5px] text-[11px] text-text-secondary align-top",
											children: /* @__PURE__ */ H("span", {
												className: xu("var(--color-info)"),
												children: "started"
											})
										}),
										/* @__PURE__ */ H("td", {
											className: "px-2 py-[5px] text-[11px] text-text-secondary align-top",
											children: new Date(t.startedAt).toLocaleTimeString()
										}),
										/* @__PURE__ */ U("td", {
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
								f?.streamOpened && /* @__PURE__ */ U("tr", {
									className: "border-b border-border",
									children: [
										/* @__PURE__ */ H("td", {
											className: "px-2 py-[5px] text-[11px] text-text-secondary align-top",
											children: /* @__PURE__ */ H("span", {
												className: xu("var(--color-cat-ai)"),
												children: "stream.opened"
											})
										}),
										/* @__PURE__ */ H("td", {
											className: "px-2 py-[5px] text-[11px] text-text-secondary align-top",
											children: "—"
										}),
										/* @__PURE__ */ H("td", {
											className: "px-2 py-[5px] text-[11px] text-text-secondary align-top",
											children: "LLM stream connection established"
										})
									]
								}),
								f?.firstTokenLatencyMs != null && /* @__PURE__ */ U("tr", {
									className: "border-b border-border",
									children: [
										/* @__PURE__ */ H("td", {
											className: "px-2 py-[5px] text-[11px] text-text-secondary align-top",
											children: /* @__PURE__ */ H("span", {
												className: xu("var(--color-cat-ai)"),
												children: "first.token"
											})
										}),
										/* @__PURE__ */ U("td", {
											className: "px-2 py-[5px] text-[11px] text-text-secondary align-top",
											children: [
												"+",
												f.firstTokenLatencyMs,
												"ms"
											]
										}),
										/* @__PURE__ */ H("td", {
											className: "px-2 py-[5px] text-[11px] text-text-secondary align-top",
											children: "First token received from LLM"
										})
									]
								}),
								t.completedAt && t.status === "completed" && /* @__PURE__ */ U("tr", {
									className: "border-b border-border",
									children: [
										/* @__PURE__ */ H("td", {
											className: "px-2 py-[5px] text-[11px] text-text-secondary align-top",
											children: /* @__PURE__ */ H("span", {
												className: xu("var(--color-success)"),
												children: "completed"
											})
										}),
										/* @__PURE__ */ H("td", {
											className: "px-2 py-[5px] text-[11px] text-text-secondary align-top",
											children: new Date(t.completedAt).toLocaleTimeString()
										}),
										/* @__PURE__ */ U("td", {
											className: "px-2 py-[5px] text-[11px] text-text-secondary align-top",
											children: ["Finished in ", t.durationMs == null ? "—" : t.durationMs < 1e3 ? `${t.durationMs}ms` : `${(t.durationMs / 1e3).toFixed(1)}s`]
										})
									]
								}),
								t.status === "failed" && /* @__PURE__ */ U("tr", {
									className: "border-b border-border",
									children: [
										/* @__PURE__ */ H("td", {
											className: "px-2 py-[5px] text-[11px] text-text-secondary align-top",
											children: /* @__PURE__ */ H("span", {
												className: xu("var(--color-danger)"),
												children: "failed"
											})
										}),
										/* @__PURE__ */ H("td", {
											className: "px-2 py-[5px] text-[11px] text-text-secondary align-top",
											children: t.completedAt ? new Date(t.completedAt).toLocaleTimeString() : "—"
										}),
										/* @__PURE__ */ H("td", {
											className: "px-2 py-[5px] text-[11px] text-text-secondary align-top",
											children: t.error ?? "Unknown error"
										})
									]
								})
							] })]
						})
					}),
					/* @__PURE__ */ H(yu, {
						title: "Node Configuration",
						children: a && Object.keys(a).length > 1 ? /* @__PURE__ */ H("div", {
							className: "grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-xs",
							children: Object.entries(a).filter(([e]) => e !== "type").map(([e, t]) => /* @__PURE__ */ U(Ze.Fragment, { children: [/* @__PURE__ */ H("span", {
								className: "text-text-tertiary font-medium",
								children: e
							}), /* @__PURE__ */ H("span", {
								className: r("text-text-secondary break-words", typeof t == "string" && t.length > 60 ? "whitespace-pre-wrap font-sans" : "whitespace-nowrap font-mono"),
								children: typeof t == "string" ? t : JSON.stringify(t)
							})] }, e))
						}) : /* @__PURE__ */ H("span", {
							className: "text-xs text-text-tertiary italic",
							children: "No configuration"
						})
					}),
					p && Object.keys(p).length > 0 && /* @__PURE__ */ H(yu, {
						title: "Runtime Input",
						children: /* @__PURE__ */ H("pre", {
							className: "m-0 px-3 py-2 bg-surface-inset border border-border rounded-md text-[11px] font-mono text-text-secondary whitespace-pre-wrap break-words max-h-[300px] overflow-auto",
							children: JSON.stringify(p, null, 2)
						})
					}),
					f?.prompt && /* @__PURE__ */ H(yu, {
						title: "Resolved Prompt",
						children: /* @__PURE__ */ H("div", {
							className: "px-3.5 py-2.5 bg-surface-inset border border-border rounded-md text-[13px] text-text-primary whitespace-pre-wrap break-words leading-[1.6] max-h-[400px] overflow-auto",
							children: f.prompt
						})
					}),
					d || f?.response ? /* @__PURE__ */ H(yu, {
						title: "Response",
						children: /* @__PURE__ */ H("div", {
							className: "px-3.5 py-2.5 bg-surface-inset border border-border rounded-md text-[13px] text-text-primary whitespace-pre-wrap break-words leading-[1.6] max-h-[400px] overflow-auto",
							children: d ?? f?.response
						})
					}) : /* @__PURE__ */ H(yu, {
						title: "Output",
						children: u && Object.keys(u).length > 0 ? /* @__PURE__ */ H("pre", {
							className: "m-0 px-3 py-2 bg-surface-inset border border-border rounded-md text-[11px] font-mono text-text-secondary whitespace-pre-wrap break-words max-h-[300px] overflow-auto",
							children: JSON.stringify(u, null, 2)
						}) : /* @__PURE__ */ H("span", {
							className: "text-xs text-text-tertiary italic",
							children: "No output data"
						})
					}),
					(f || u?.tokensIn != null) && /* @__PURE__ */ H(yu, {
						title: "Token Usage",
						children: /* @__PURE__ */ U("div", {
							className: "flex gap-5 flex-wrap text-xs text-text-secondary",
							children: [
								/* @__PURE__ */ U("span", { children: ["Tokens in: ", /* @__PURE__ */ H("strong", { children: String(f?.tokensIn ?? u?.tokensIn ?? "—") })] }),
								/* @__PURE__ */ U("span", { children: ["Tokens out: ", /* @__PURE__ */ H("strong", { children: String(f?.tokensOut ?? u?.tokensOut ?? "—") })] }),
								f?.firstTokenLatencyMs != null && /* @__PURE__ */ U("span", { children: ["First token: ", /* @__PURE__ */ U("strong", { children: [f.firstTokenLatencyMs, "ms"] })] })
							]
						})
					}),
					t.error && /* @__PURE__ */ H(yu, {
						title: "Error",
						children: /* @__PURE__ */ H("div", {
							className: "px-3 py-2 bg-danger-bg border border-danger-border rounded-md text-xs text-danger-fg font-mono whitespace-pre-wrap",
							children: t.error
						})
					}),
					(o || s) && /* @__PURE__ */ U("div", {
						className: "px-4 py-2.5 border-t border-border flex justify-end gap-2",
						children: [s && /* @__PURE__ */ H("button", {
							type: "button",
							"data-testid": `resume-from-step-${e}`,
							onClick: (t) => {
								t.stopPropagation(), s(e);
							},
							title: "Resume the same run from this step (preserves accumulated context)",
							className: "px-3 py-[5px] text-xs font-medium border border-primary bg-primary text-white rounded cursor-pointer font-[inherit]",
							children: "↻ Resume from here"
						}), o && /* @__PURE__ */ H("button", {
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
function wu({ steps: e, nodeDataMap: t, edges: n, onRetryFromStep: r, onResumeFromStep: i }) {
	let a = R(() => {
		let r = Object.entries(e).sort(([, e], [, t]) => (e.completedAt ? Date.parse(e.completedAt) - (e.durationMs ?? 0) : 0) - (t.completedAt ? Date.parse(t.completedAt) - (t.durationMs ?? 0) : 0));
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
	]), o = (e) => {
		if (t[e]) return t[e];
		let n = e.lastIndexOf(":");
		if (n > 0 && /^\d+$/.test(e.slice(n + 1))) return t[e.slice(0, n)];
	};
	function s(e, t) {
		let n = t;
		return e.map((e) => {
			let t = n++, a = /* @__PURE__ */ new Map();
			for (let t of e.children) {
				let e = t.branch ?? "default";
				a.has(e) || a.set(e, []), a.get(e).push(t);
			}
			return /* @__PURE__ */ U(Ze.Fragment, { children: [/* @__PURE__ */ H(Cu, {
				stepId: e.stepId,
				step: e.step,
				index: t,
				nodeType: o(e.stepId)?.type ?? "unknown",
				nodeConfig: o(e.stepId)?.data,
				onRetryFromStep: r,
				onResumeFromStep: i
			}), e.children.length > 0 && /* @__PURE__ */ H("div", {
				className: "ml-9 pl-5 border-l-2 border-dashed border-border mb-1",
				children: Array.from(a.entries()).map(([e, t], r) => /* @__PURE__ */ U("div", { children: [/* @__PURE__ */ H("div", {
					className: `text-[10px] font-semibold text-text-tertiary uppercase pt-1 pb-0.5 ${r === 0 ? "mt-1" : "mt-2"}`,
					children: e.replace("-", " ")
				}), s(t, n)] }, e))
			})] }, e.stepId);
		});
	}
	return /* @__PURE__ */ U("div", {
		className: "relative",
		children: [/* @__PURE__ */ H("div", { className: "absolute left-[15px] top-6 bottom-6 w-0.5 bg-border rounded-sm" }), s(a, 0)]
	});
}
//#endregion
//#region src/components/pipelines/hooks/usePipelineRunAuditLog.ts
var Tu = 5e3, Eu = "synthetic-";
function Du(e) {
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
function Ou(e, t) {
	return t.timestamp.localeCompare(e.timestamp);
}
function ku(e, t) {
	if (t.length === 0) return e.slice().sort(Ou);
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
	return [...e, ...i].sort(Ou);
}
function Au(e, t, n = {}) {
	let { pollMs: r = Tu, filters: i } = n, a = A(), [o, s] = B([]), [c, l] = B([]), [u, d] = B(!0), [f, p] = B(null), [m, h] = B(void 0), [g, _] = B(0), [v, y] = B(!1), b = JSON.stringify({
		since: i?.since,
		until: i?.until,
		actions: i?.actions,
		limit: i?.limit
	});
	L(() => {
		if (!e || !t) return;
		let n = !1;
		return d(!0), p(null), (async () => {
			try {
				let r = await Pe(e, t, i ?? {});
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
	]), L(() => {
		if (!e || !t || r <= 0) return;
		let n = window.setInterval(() => {
			_((e) => e + 1);
		}, r);
		return () => window.clearInterval(n);
	}, [
		e,
		t,
		r
	]), L(() => {
		if (!e || !t) return;
		let n = [], r = (n, r) => {
			let i = Du(n);
			if (!i) return;
			let a = r;
			if (a.runId !== t) return;
			y(!0);
			let o = {
				auditId: `${Eu}${n}-${a.stepId ?? "run"}-${Date.now()}`,
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
	]), L(() => {
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
	let x = z(!1), S = I(() => {
		!e || !t || !m || x.current || (x.current = !0, (async () => {
			try {
				let n = await Pe(e, t, {
					...i ?? {},
					cursor: m
				});
				s((e) => {
					let t = new Set(e.map((e) => e.auditId)), r = e.concat(n.items.filter((e) => !t.has(e.auditId)));
					return r.sort(Ou), r;
				}), h(n.nextCursor);
			} catch (e) {
				p(e instanceof Error ? e.message : String(e));
			} finally {
				x.current = !1;
			}
		})());
	}, [
		e,
		t,
		m,
		b
	]), C = I(() => {
		_((e) => e + 1);
	}, []);
	return {
		items: R(() => ku(o, c), [o, c]),
		loading: u,
		error: f,
		hasMore: !!m,
		loadMore: S,
		liveHealthy: v,
		refresh: C
	};
}
//#endregion
//#region src/components/pipelines/ExecutorLog.tsx
var ju = "var(--color-info)", Mu = "#eab308", Nu = "var(--color-caution)", Pu = "var(--color-neutral)", Fu = "var(--color-danger)", Iu = "var(--color-accent)";
function Lu(e) {
	return e.action === "pipeline.step.failed" || e.outcome === "error" ? Fu : e.action === "pipeline.run.resumed-from-step" || e.action.startsWith("pipeline.step.context.patched") ? Iu : e.action.startsWith("pipeline.approval.") ? Mu : e.action.startsWith("pipeline.breakpoint.") ? Nu : e.action.startsWith("pipeline.step.") ? ju : (e.action.startsWith("pipeline.run."), Pu);
}
var Ru = {
	"1h": "Last 1h",
	"24h": "Last 24h",
	all: "All"
}, zu = [
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
function Bu(e) {
	if (e === "all") return null;
	let t = Date.now();
	return e === "1h" ? t - 36e5 : t - 864e5;
}
function Vu(e) {
	let t = e.details, n = e.trace, r = t && typeof t.stepId == "string" ? t.stepId : void 0, i = n && typeof n.stepId == "string" ? n.stepId : void 0, a = n && typeof n.nodeId == "string" ? n.nodeId : void 0;
	return r ?? i ?? a;
}
function Hu(e, t = Date.now()) {
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
function Uu({ pipelineId: e, runId: t, onStepClick: n }) {
	let { items: i, error: a, hasMore: o, loadMore: s, loading: c } = Au(e, t), [l, u] = B(/* @__PURE__ */ new Set()), [d, f] = B(""), [p, h] = B("all"), [g, _] = B(/* @__PURE__ */ new Set()), v = I((e) => {
		u((t) => {
			let n = new Set(t);
			return n.has(e) ? n.delete(e) : n.add(e), n;
		});
	}, []), y = I((e) => {
		_((t) => {
			let n = new Set(t);
			return n.has(e) ? n.delete(e) : n.add(e), n;
		});
	}, []), b = R(() => {
		let e = Bu(p), t = d.trim().toLowerCase(), n = zu.filter((e) => l.has(e.label));
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
	]), x = I(() => {
		if (typeof window > "u") return;
		let e = b.map((e) => JSON.stringify(e)).join("\n") + (b.length > 0 ? "\n" : ""), n = new Blob([e], { type: "application/x-ndjson" }), r = URL.createObjectURL(n), i = document.createElement("a");
		i.href = r, i.download = `executor-log-${t}.ndjson`, document.body.appendChild(i), i.click(), document.body.removeChild(i), URL.revokeObjectURL(r);
	}, [b, t]), S = I((e) => {
		if (y(e.auditId), !n || !e.action.startsWith("pipeline.step.")) return;
		let t = Vu(e);
		t && n(t);
	}, [n, y]);
	return /* @__PURE__ */ U("div", {
		className: "flex flex-col flex-1 min-h-0 bg-surface border border-border rounded-lg overflow-hidden",
		"data-testid": "executor-log",
		children: [
			/* @__PURE__ */ U("div", {
				className: "sticky top-0 z-[2] flex flex-wrap items-center gap-2 px-3 py-2.5 bg-surface-panel border-b border-border text-xs",
				children: [
					/* @__PURE__ */ U("span", {
						className: r("inline-flex items-center text-[11px] font-semibold", a ? "text-text-tertiary" : "text-text-secondary"),
						"data-testid": "executor-log-live-indicator",
						title: a ? `Live updates unavailable: ${a}` : "Live updates active",
						children: [/* @__PURE__ */ H("span", {
							className: r("inline-block w-2 h-2 rounded-full mr-1.5 align-middle", a ? "bg-text-tertiary" : "bg-success [animation:executor-log-pulse_1.6s_ease-in-out_infinite]"),
							"aria-hidden": !0
						}), "Live"]
					}),
					/* @__PURE__ */ H("span", {
						className: "text-border",
						children: "|"
					}),
					zu.map((e) => {
						let t = l.has(e.label);
						return /* @__PURE__ */ H("button", {
							type: "button",
							className: r("font-[inherit] text-[11px] font-semibold px-2.5 py-[3px] rounded-xl border cursor-pointer", t ? "bg-info-bg text-info-fg border-info-border" : "bg-surface text-text-secondary border-border"),
							onClick: () => v(e.label),
							"data-testid": `executor-log-chip-${e.label.toLowerCase().replace(/\s+/g, "-")}`,
							"aria-pressed": t,
							children: e.label
						}, e.label);
					}),
					/* @__PURE__ */ H("span", {
						className: "text-border",
						children: "|"
					}),
					/* @__PURE__ */ H(D, {
						size: "sm",
						value: d,
						onChange: (e) => f(e.target.value),
						placeholder: "Actor",
						className: "min-w-30",
						"data-testid": "executor-log-actor-input",
						"aria-label": "Filter by actor"
					}),
					/* @__PURE__ */ H("span", {
						className: "text-border",
						children: "|"
					}),
					[
						"1h",
						"24h",
						"all"
					].map((e) => {
						let t = p === e;
						return /* @__PURE__ */ H("button", {
							type: "button",
							className: r("font-[inherit] text-[11px] font-semibold px-2.5 py-[3px] rounded-xl border cursor-pointer", t ? "bg-info-bg text-info-fg border-info-border" : "bg-surface text-text-secondary border-border"),
							onClick: () => h(e),
							"data-testid": `executor-log-time-${e}`,
							"aria-pressed": t,
							children: Ru[e]
						}, e);
					}),
					/* @__PURE__ */ H("div", { className: "flex-1" }),
					/* @__PURE__ */ U("span", {
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
			/* @__PURE__ */ U("div", {
				className: "flex-1 overflow-y-auto px-4 py-3 relative",
				"data-testid": "executor-log-timeline",
				children: [
					c && i.length === 0 && /* @__PURE__ */ H("div", {
						className: "text-xs text-text-tertiary p-3",
						children: "Loading audit rows…"
					}),
					!c && i.length === 0 && /* @__PURE__ */ H("div", {
						className: "px-3 py-6 text-[13px] text-text-secondary text-center leading-relaxed",
						"data-testid": "executor-log-empty",
						children: "Audit log started recording on 2026-05-07 (hub#2224). This run predates that — no rows captured."
					}),
					b.length === 0 && i.length > 0 && /* @__PURE__ */ H("div", {
						className: "px-3 py-5 text-xs text-text-tertiary text-center",
						"data-testid": "executor-log-no-matches",
						children: "No audit rows match the current filters."
					}),
					b.map((e) => {
						let t = g.has(e.auditId), n = e.action.startsWith("pipeline.step.") ? Vu(e) : void 0;
						return /* @__PURE__ */ U("div", {
							role: "button",
							tabIndex: 0,
							"aria-expanded": e.trace ? t : void 0,
							className: "grid grid-cols-[14px_auto_auto_1fr] items-baseline gap-2.5 py-1.5 text-xs border-b border-surface-inset cursor-pointer",
							onClick: () => S(e),
							onKeyDown: E(() => S(e)),
							"data-testid": "executor-log-row",
							"data-action": e.action,
							"data-audit-id": e.auditId,
							children: [
								/* @__PURE__ */ H("span", {
									className: "w-2.5 h-2.5 rounded-full shrink-0 self-center",
									style: { background: Lu(e) },
									"aria-hidden": !0,
									"data-testid": "executor-log-marker"
								}),
								/* @__PURE__ */ H("span", {
									className: "text-text-tertiary font-mono text-[11px] whitespace-nowrap",
									title: e.timestamp,
									children: Hu(e.timestamp)
								}),
								/* @__PURE__ */ H("span", {
									className: "text-text-secondary text-[11px] whitespace-nowrap",
									children: e.actorUserId
								}),
								/* @__PURE__ */ U("span", {
									className: "text-text-primary flex items-baseline gap-1.5 flex-wrap",
									children: [
										/* @__PURE__ */ H("code", {
											className: "font-mono text-[11px] bg-surface-inset px-1.5 py-px rounded-[3px]",
											children: e.action
										}),
										n && /* @__PURE__ */ U("span", {
											className: "text-[11px] text-text-tertiary",
											"data-testid": "executor-log-stepid",
											children: [
												"· ",
												n.slice(0, 14),
												n.length > 14 ? "…" : ""
											]
										}),
										e.outcome && /* @__PURE__ */ U("span", {
											className: r("text-[11px]", e.outcome === "error" ? "text-danger-fg" : "text-text-tertiary"),
											children: ["· ", e.outcome]
										})
									]
								}),
								t && e.trace && /* @__PURE__ */ H("pre", {
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
			/* @__PURE__ */ U("div", {
				className: "flex justify-between items-center gap-2 px-3 py-2.5 border-t border-border bg-surface-panel",
				children: [o ? /* @__PURE__ */ H("span", {
					"data-testid": "executor-log-load-more",
					children: /* @__PURE__ */ H(m, {
						variant: "secondary",
						size: "sm",
						onClick: () => s(),
						children: "Load more"
					})
				}) : /* @__PURE__ */ H("span", {}), /* @__PURE__ */ H("span", {
					"data-testid": "executor-log-download",
					children: /* @__PURE__ */ H(m, {
						variant: "secondary",
						size: "sm",
						onClick: x,
						disabled: b.length === 0,
						children: "Download log"
					})
				})]
			})
		]
	});
}
//#endregion
//#region src/components/pipelines/PipelineRunReplayPage.tsx
function Wu() {
	let { pipelineId: e, runId: t } = it();
	return !e || !t ? /* @__PURE__ */ H(nt, {
		to: "/pipelines",
		replace: !0
	}) : /* @__PURE__ */ H(de, {
		pipelineId: e,
		children: /* @__PURE__ */ H(ne, { children: /* @__PURE__ */ H(Gu, {
			pipelineId: e,
			runId: t
		}) })
	});
}
function Gu({ pipelineId: e, runId: t }) {
	let n = rt(), i = pe(), a = _e(), { definition: o } = i, [s, c] = B(null);
	L(() => {
		let n = !1;
		return import("./services-CK_zipW-.js").then((e) => e.X).then(({ getPipelineRun: r }) => {
			r(e, t).then((e) => {
				!n && e && c(e);
			});
		}), () => {
			n = !0;
		};
	}, [e, t]);
	let l = R(() => {
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
	Me(t);
	let u = vu(l ?? null), d = R(() => {
		let e = {};
		if (!o) return e;
		for (let t of o.nodes) e[t.id] = {
			type: t.data.type,
			data: t.data
		};
		return e;
	}, [o]), [f, p] = B(!1), h = z(null);
	Gn(h, () => p(!1), f);
	let [_, y] = B("steps"), [b, S] = B(null), w = I((e) => {
		S(e), y("steps");
	}, []), [T, E] = B(null), [D, O] = B(null), [k, A] = B(!1), ee = l?.status === "failed" ? l.error?.nodeId : void 0, j = I((e) => {
		if (!l) return;
		let t = Object.entries(l.steps).filter(([t, n]) => t !== e && n.status === "completed").map(([e]) => e);
		E({
			nodeId: e,
			skippedNodes: t,
			snapshotInput: !1
		}), O(null);
	}, [l]), te = I(async () => {
		if (!(!T || !l)) {
			O(null), A(!0);
			try {
				let t = await Ie(e, l.id, T.nodeId, void 0, T.snapshotInput || void 0);
				E(null), n(`/pipelines/${e}/runs/${t.newRunId}`);
			} catch (e) {
				O(e instanceof Error ? e.message : String(e)), A(!1);
			}
		}
	}, [
		T,
		l,
		e,
		n
	]), [ne, re] = B(null), [M, ie] = B(null), [ae, oe] = B(null), [se, ce] = B(null), le = z(null);
	L(() => () => {
		le.current && clearTimeout(le.current);
	}, []);
	let ue = I(async (t) => {
		if (l) {
			ie(null), re(t);
			try {
				let r = await ke(e, l.id, t);
				oe(`Resumed from ${t.slice(0, 10)}${t.length > 10 ? "…" : ""} (replay #${r.replayAttempts})`), le.current && clearTimeout(le.current), le.current = setTimeout(() => oe(null), 4e3), n(`/pipelines/${e}/runs/${l.id}`);
			} catch (e) {
				ie(e instanceof Error ? e.message : String(e));
			} finally {
				re(null);
			}
		}
	}, [
		l,
		e,
		n
	]), N = I(async () => {
		ce(null);
		try {
			let t = await a.triggerRun(e, l ? l.triggeredBy.payload : void 0);
			n(`/pipelines/${e}/runs/${t}`);
		} catch (e) {
			console.error("[PipelineRunReplay] re-run failed", e), ce(e instanceof Error ? e.message : String(e));
		}
	}, [
		l,
		a,
		e,
		n
	]), de = async () => {
		p(!1);
		try {
			await navigator.clipboard?.writeText(t);
		} catch {}
	}, fe = () => {
		if (p(!1), !l) return;
		let e = JSON.stringify(l, null, 2);
		Ri(`run-${t}.json`, e);
	}, me = () => {
		if (p(!1), !o) return;
		let e = ve(o.id, `${o.name} (from run)`);
		e && n(`/pipelines/${e.id}`);
	};
	if (!l) return /* @__PURE__ */ U("div", {
		className: "flex flex-col flex-1 h-0 overflow-hidden bg-surface-inset font-[inherit] text-text-primary rounded-lg border border-border",
		"data-testid": "pipeline-replay-missing",
		children: [/* @__PURE__ */ U("div", {
			className: "h-11 shrink-0 flex items-center gap-2.5 px-3 border-b border-border bg-surface relative z-[5]",
			children: [/* @__PURE__ */ H(g, {
				onClick: () => n(`/pipelines/${e}`),
				"aria-label": "Back to pipeline",
				title: "Back to pipeline",
				children: "←"
			}), /* @__PURE__ */ H("div", {
				className: "text-[13px] font-semibold text-text-primary",
				children: o?.name ?? "Pipeline"
			})]
		}), /* @__PURE__ */ U("div", {
			className: "flex-1 flex flex-col items-center justify-center gap-3.5 p-8 text-center",
			children: [/* @__PURE__ */ H("div", {
				className: "text-sm text-text-secondary",
				children: "Run not available — it may have been trimmed from history."
			}), /* @__PURE__ */ H(m, {
				onClick: () => n(`/pipelines/${e}`),
				children: "Back to pipeline"
			})]
		})]
	});
	let he = fu(l.status), ge = l.triggeredBy.userId ?? l.triggeredBy.triggerType, ye = Wl(u);
	return /* @__PURE__ */ U("div", {
		className: "flex flex-col flex-1 h-0 overflow-hidden bg-surface-inset font-[inherit] text-text-primary rounded-lg border border-border",
		"data-testid": "pipeline-replay",
		children: [
			/* @__PURE__ */ U("div", {
				className: "h-11 shrink-0 flex items-center gap-2.5 px-3 border-b border-border bg-surface relative z-[5]",
				children: [
					/* @__PURE__ */ H(g, {
						onClick: () => n(`/pipelines/${e}`),
						"aria-label": "Back to pipeline",
						title: "Back to pipeline",
						children: "←"
					}),
					/* @__PURE__ */ H("div", {
						className: "text-[13px] font-bold text-text-primary max-w-[220px] overflow-hidden text-ellipsis whitespace-nowrap",
						title: o?.name ?? e,
						children: o?.name ?? e
					}),
					/* @__PURE__ */ H("span", {
						className: "text-text-tertiary text-xs",
						children: "·"
					}),
					/* @__PURE__ */ U("div", {
						className: "text-xs text-text-secondary overflow-hidden text-ellipsis whitespace-nowrap",
						"data-testid": "replay-subtitle",
						children: [
							"Run from ",
							aa(l.startedAt),
							" by ",
							ge
						]
					}),
					/* @__PURE__ */ U("span", {
						className: "text-text-tertiary text-xs",
						"data-testid": "replay-cost",
						children: ["· ", ye]
					}),
					/* @__PURE__ */ H(x, {
						tone: he.tone,
						"aria-label": `Status: ${he.label}`,
						children: he.label
					}),
					l.status === "failed" && l.error?.errorCategory ? /* @__PURE__ */ H(x, {
						tone: "danger",
						title: l.error.message || "Error details unavailable",
						children: l.error.errorCategory
					}) : null,
					/* @__PURE__ */ H("div", { className: "flex-1" }),
					ee && /* @__PURE__ */ H(m, {
						onClick: () => j(ee),
						disabled: k,
						"data-testid": "retry-from-failed-step-button",
						title: `Retry from "${ee}" with the original upstream context`,
						children: "↻ Retry from failure"
					}),
					/* @__PURE__ */ H(m, {
						onClick: N,
						"data-testid": "rerun-button",
						title: "Re-run with the original trigger payload",
						children: "↻ Re-run"
					}),
					/* @__PURE__ */ U("div", {
						className: "relative",
						ref: h,
						children: [/* @__PURE__ */ H(g, {
							onClick: () => p((e) => !e),
							"aria-label": "More actions",
							"aria-haspopup": "menu",
							"aria-expanded": f,
							"data-testid": "replay-overflow-btn",
							children: "⋯"
						}), f ? /* @__PURE__ */ U("div", {
							className: "absolute top-full right-0 mt-1.5 bg-surface border border-border rounded-lg shadow-[0_12px_28px_rgba(15,23,42,0.14)] min-w-[200px] z-20 overflow-hidden",
							role: "menu",
							"aria-label": "More actions",
							children: [
								/* @__PURE__ */ H("button", {
									className: "block w-full text-left py-2 px-3.5 text-[13px] border-none bg-transparent cursor-pointer font-[inherit] text-text-primary",
									role: "menuitem",
									onClick: de,
									children: "Copy runId"
								}),
								/* @__PURE__ */ H("button", {
									className: "block w-full text-left py-2 px-3.5 text-[13px] border-none bg-transparent cursor-pointer font-[inherit] text-text-primary",
									role: "menuitem",
									onClick: fe,
									children: "Export run JSON"
								}),
								/* @__PURE__ */ H("button", {
									className: "block w-full text-left py-2 px-3.5 text-[13px] border-none bg-transparent cursor-pointer font-[inherit] text-text-primary",
									role: "menuitem",
									onClick: me,
									children: "Open as new draft"
								})
							]
						}) : null]
					})
				]
			}),
			/* @__PURE__ */ H(C, {
				open: T !== null,
				onConfirm: te,
				onCancel: () => {
					k || E(null);
				},
				title: "Retry from step",
				confirmLabel: k ? "Starting…" : "Confirm retry",
				confirmDisabled: k,
				children: T && /* @__PURE__ */ U("div", {
					className: "flex flex-col gap-2.5",
					children: [
						/* @__PURE__ */ U("div", {
							className: "text-[13px] text-text-secondary",
							children: [
								"A new run will start from",
								" ",
								/* @__PURE__ */ U("code", {
									className: "bg-surface-inset px-1 rounded text-xs",
									children: [T.nodeId.slice(0, 12), T.nodeId.length > 12 ? "…" : ""]
								}),
								" ",
								"using the original upstream context."
							]
						}),
						T.skippedNodes.length > 0 && /* @__PURE__ */ U("div", { children: [/* @__PURE__ */ U("div", {
							className: "text-[11px] font-semibold text-text-tertiary uppercase mb-1.5",
							children: [
								"Steps that will be skipped (",
								T.skippedNodes.length,
								")"
							]
						}), /* @__PURE__ */ H("div", {
							className: "max-h-20 overflow-y-auto flex flex-wrap gap-1",
							children: T.skippedNodes.map((e) => /* @__PURE__ */ H("span", {
								className: "bg-surface-inset border border-border rounded px-1.5 py-px text-[11px] font-mono text-text-secondary",
								children: e.slice(0, 10)
							}, e))
						})] }),
						/* @__PURE__ */ U("label", {
							className: "flex items-center gap-2 text-[13px] text-text-secondary cursor-pointer",
							children: [/* @__PURE__ */ H(Xe, {
								checked: T.snapshotInput,
								onChange: (e) => E((t) => t && {
									...t,
									snapshotInput: e
								})
							}), "Use persisted input snapshot"]
						}),
						D && /* @__PURE__ */ H("div", {
							"data-testid": "retry-modal-error",
							className: "py-2 px-3 bg-danger-bg border border-danger-border rounded-md text-xs text-danger-fg",
							children: D
						})
					]
				})
			}),
			/* @__PURE__ */ H("div", {
				className: "flex-1 flex flex-col min-h-0",
				children: /* @__PURE__ */ U("div", {
					className: "flex-1 overflow-auto py-5 px-7 bg-surface",
					children: [
						/* @__PURE__ */ U("div", {
							className: "flex items-center gap-3 mb-5",
							children: [
								/* @__PURE__ */ U("h3", {
									className: "m-0 text-[15px] font-bold text-text-primary",
									children: [
										"Steps (",
										Object.keys(l.steps).length,
										")"
									]
								}),
								/* @__PURE__ */ U("span", {
									className: "text-xs text-text-tertiary",
									children: [
										l.startedAt ? new Date(l.startedAt).toLocaleTimeString() : "",
										" — ",
										l.completedAt ? new Date(l.completedAt).toLocaleTimeString() : "in progress"
									]
								}),
								l.durationMs != null && /* @__PURE__ */ U("span", {
									className: "text-xs text-text-secondary ml-auto",
									children: ["Total: ", l.durationMs < 1e3 ? `${l.durationMs}ms` : `${(l.durationMs / 1e3).toFixed(1)}s`]
								})
							]
						}),
						D && /* @__PURE__ */ H(v, {
							title: "Retry failed:",
							className: "mb-4",
							children: D
						}),
						M && /* @__PURE__ */ H(v, {
							title: "Resume failed:",
							className: "mb-4",
							"data-testid": "resume-error-banner",
							children: M
						}),
						se && /* @__PURE__ */ H(v, {
							title: "Re-run failed:",
							className: "mb-4",
							"data-testid": "rerun-error-banner",
							children: se
						}),
						(l.replayAttempts ?? 0) > 0 && /* @__PURE__ */ H(v, {
							title: "Resumed from a previous failure",
							className: "mb-4",
							"data-testid": "resume-history-banner",
							children: /* @__PURE__ */ U("div", {
								className: "flex flex-col gap-1.5",
								children: [/* @__PURE__ */ U("div", { children: [
									l.error?.nodeId && l.error.nodeId !== "unknown" && /* @__PURE__ */ U(V, { children: [
										"Originally failed at ",
										/* @__PURE__ */ H("code", { children: l.error.nodeId.slice(0, 12) }),
										" — "
									] }),
									"Resumed ",
									l.replayAttempts,
									" time",
									l.replayAttempts === 1 ? "" : "s",
									".",
									l.resumeHistory && l.resumeHistory.length > 0 && /* @__PURE__ */ U(V, { children: [
										" ",
										"Most recent: from",
										" ",
										/* @__PURE__ */ H("code", { children: l.resumeHistory[l.resumeHistory.length - 1].fromNodeId.slice(0, 12) }),
										" ",
										"at ",
										aa(l.resumeHistory[l.resumeHistory.length - 1].at),
										"."
									] })
								] }), l.resumeHistory && l.resumeHistory.length > 1 && /* @__PURE__ */ H("ol", {
									className: "m-0 pl-[18px] text-[11px] text-text-tertiary leading-relaxed",
									"data-testid": "resume-history-timeline",
									children: l.resumeHistory.map((e, t) => /* @__PURE__ */ U("li", { children: [
										"from ",
										/* @__PURE__ */ H("code", { children: e.fromNodeId.slice(0, 12) }),
										" at ",
										aa(e.at)
									] }, `${e.fromNodeId}-${e.at}-${t}`))
								})]
							})
						}),
						ae && /* @__PURE__ */ H(v, {
							title: "Resumed",
							className: "mb-4",
							"data-testid": "resume-toast",
							children: ae
						}),
						l.error && /* @__PURE__ */ U(v, {
							title: "Run failed:",
							className: "mb-4",
							children: [
								l.error.message,
								l.error.nodeId && l.error.nodeId !== "unknown" && /* @__PURE__ */ U("span", {
									className: "ml-2 text-[11px] text-danger-fg",
									children: ["at node ", l.error.nodeId.slice(0, 8)]
								}),
								l.status === "failed" && l.error.nodeId && l.error.nodeId !== "unknown" && /* @__PURE__ */ H("div", {
									className: "mt-2",
									children: /* @__PURE__ */ H(m, {
										onClick: () => ue(l.error.nodeId),
										disabled: ne !== null,
										"data-testid": "resume-from-here-button",
										title: `Resume this run from "${l.error.nodeId}" using its accumulated upstream context`,
										children: ne === l.error.nodeId ? "Resuming…" : "↻ Resume from here"
									})
								})
							]
						}),
						/* @__PURE__ */ H("div", {
							role: "tablist",
							"aria-label": "Run detail view",
							onKeyDown: Je,
							className: "flex gap-1 mb-3 border-b border-border",
							"data-testid": "run-replay-tabs",
							children: [{
								id: "steps",
								label: "Steps"
							}, {
								id: "log",
								label: "Executor Log"
							}].map((e) => {
								let t = _ === e.id;
								return /* @__PURE__ */ H("button", {
									role: "tab",
									"aria-selected": t,
									tabIndex: t ? 0 : -1,
									onClick: () => y(e.id),
									"data-testid": `run-replay-tab-${e.id}`,
									className: r("font-[inherit] text-[13px] font-semibold py-1.5 px-3.5 border-none bg-transparent cursor-pointer -mb-px", t ? "text-text-primary border-b-2 border-b-primary" : "text-text-tertiary border-b-2 border-b-transparent"),
									children: e.label
								}, e.id);
							})
						}),
						_ === "steps" ? /* @__PURE__ */ H(wu, {
							steps: l.steps,
							nodeDataMap: d,
							edges: o?.edges,
							onRetryFromStep: j,
							onResumeFromStep: l.status === "failed" ? ue : void 0
						}) : /* @__PURE__ */ H("div", {
							className: "flex flex-col min-h-[400px] h-[60vh]",
							children: /* @__PURE__ */ H(Uu, {
								pipelineId: e,
								runId: t,
								onStepClick: w
							})
						})
					]
				})
			})
		]
	});
}
//#endregion
//#region src/components/pipelines/CompareStepMatrix.tsx
function Ku(e) {
	return e == null ? "—" : `${e > 0 ? "+" : ""}${ia(Math.abs(e))}`.replace(/^(\+|-)?/, e === 0 ? "" : e > 0 ? "+" : "-");
}
function qu(e) {
	switch (e) {
		case "completed": return "success";
		case "failed": return "danger";
		case "cancelled": return "neutral";
		case "skipped": return "neutral";
		case "running": return "info";
		case "awaiting": return "warning";
		default: return "neutral";
	}
}
function Ju(e, t) {
	if (!e) return t;
	let n = e.nodes.find((e) => e.id === t);
	return n ? n.data.type === "condition" && n.data.label ? n.data.label : n.type.charAt(0).toUpperCase() + n.type.slice(1) : t;
}
function Yu(e, t) {
	if (!e) return !1;
	let n = e.nodes.find((e) => e.id === t);
	return !!n && n.data.type === "condition";
}
function Xu(e) {
	if (!e) return;
	let t = e.output;
	if (t && typeof t == "object" && "result" in t) return t.result ? "true" : "false";
}
function Zu(e, t) {
	let n = (e) => e.split(/(\s+)/).filter((e) => e.length > 0), r = n(e), i = n(t), a = r.length, o = i.length, s = Array.from({ length: a + 1 }, () => Array(o + 1).fill(0));
	for (let e = a - 1; e >= 0; e--) for (let t = o - 1; t >= 0; t--) r[e] === i[t] ? s[e][t] = s[e + 1][t + 1] + 1 : s[e][t] = Math.max(s[e + 1][t], s[e][t + 1]);
	let c = [], l = (e, t) => {
		let n = c[c.length - 1];
		n && n.type === e ? n.text += t : c.push({
			type: e,
			text: t
		});
	}, u = 0, d = 0;
	for (; u < a && d < o;) r[u] === i[d] ? (l("eq", r[u]), u++, d++) : s[u + 1][d] >= s[u][d + 1] ? (l("del", r[u]), u++) : (l("add", i[d]), d++);
	for (; u < a;) l("del", r[u++]);
	for (; d < o;) l("add", i[d++]);
	return c;
}
function Qu(e, t, n) {
	let r = /* @__PURE__ */ new Set(), i = [];
	if (n) for (let a of n.nodes) (e.steps[a.id] || t.steps[a.id]) && (i.push(a.id), r.add(a.id));
	for (let n of [...Object.keys(e.steps), ...Object.keys(t.steps)]) r.has(n) || (i.push(n), r.add(n));
	return i.map((r) => {
		let i = e.steps[r], a = t.steps[r], o = i?.durationMs, s = a?.durationMs, c = o != null && s != null ? s - o : void 0, l = !!i && !!a && i.status !== a.status, u = !1;
		o != null && s != null && o > 0 && (u = Math.abs(s - o) / o > .5);
		let d = Yu(n, r), f = d ? Xu(i) : void 0, p = d ? Xu(a) : void 0, m = d && f !== void 0 && p !== void 0 && f !== p;
		return {
			nodeId: r,
			name: Ju(n, r),
			a: i,
			b: a,
			durationDelta: c,
			statusDiffers: l,
			durationLarge: u,
			branchDiffers: m,
			isLlm: !!(i?.llm || a?.llm),
			isCondition: d,
			branchA: f,
			branchB: p
		};
	});
}
function $u(e) {
	if (e.statusDiffers) return "bg-danger-bg";
	if (e.branchDiffers) return "bg-info-bg";
	if (e.durationLarge) return "bg-warning-bg";
}
function ed({ step: e, branch: t, isCondition: n }) {
	if (!e) return /* @__PURE__ */ H("span", {
		className: "text-text-tertiary",
		children: "(not run)"
	});
	let r = qu(e.status);
	return /* @__PURE__ */ U("div", {
		className: "flex flex-col gap-0.5",
		children: [
			/* @__PURE__ */ U("div", {
				className: "flex items-center gap-1.5",
				children: [
					/* @__PURE__ */ H(x, {
						tone: r,
						children: e.status
					}),
					/* @__PURE__ */ H("span", {
						className: "font-mono text-text-secondary",
						children: ia(e.durationMs)
					}),
					n && t ? /* @__PURE__ */ U("span", {
						className: "font-mono text-[11px] text-text-tertiary",
						children: [
							"(",
							t === "true" ? "T" : "F",
							")"
						]
					}) : null
				]
			}),
			e.llm ? /* @__PURE__ */ U("div", {
				className: "font-mono text-[11px] text-text-tertiary",
				children: [
					e.llm.tokensIn,
					"→",
					e.llm.tokensOut,
					"tok"
				]
			}) : null,
			e.error ? /* @__PURE__ */ H("div", {
				className: "text-[11px] text-danger-fg",
				title: e.error,
				children: e.error.length > 60 ? `${e.error.slice(0, 60)}…` : e.error
			}) : null
		]
	});
}
function td({ a: e, b: t }) {
	let n = R(() => Zu(e, t), [e, t]);
	return /* @__PURE__ */ H("div", {
		className: "whitespace-pre-wrap break-words rounded-md border border-border bg-surface-inset p-2.5 font-mono text-xs leading-relaxed",
		"data-testid": "llm-word-diff",
		children: n.map((e, t) => e.type === "eq" ? /* @__PURE__ */ H("span", { children: e.text }, t) : e.type === "add" ? /* @__PURE__ */ H("span", {
			"data-diff": "add",
			className: "bg-success-bg text-success-fg",
			children: e.text
		}, t) : /* @__PURE__ */ H("span", {
			"data-diff": "del",
			className: "bg-danger-bg text-danger-fg line-through",
			children: e.text
		}, t))
	});
}
function nd({ row: e }) {
	let t = e.a?.llm, n = e.b?.llm, i = t && n ? n.tokensIn + n.tokensOut - (t.tokensIn + t.tokensOut) : void 0, a = $u(e);
	return /* @__PURE__ */ U(V, { children: [/* @__PURE__ */ U("tr", {
		"data-testid": `run-compare-row-${e.nodeId}`,
		className: a,
		children: [
			/* @__PURE__ */ U("td", {
				className: r("border-b border-border px-3 py-2.5 align-top text-xs text-text-primary", a),
				children: [/* @__PURE__ */ H("div", {
					className: "font-semibold text-text-primary",
					children: e.name
				}), /* @__PURE__ */ H("div", {
					className: "font-mono text-[11px] text-text-tertiary",
					children: e.nodeId
				})]
			}),
			/* @__PURE__ */ H("td", {
				className: r("border-b border-border px-3 py-2.5 align-top text-xs text-text-primary", a),
				children: /* @__PURE__ */ H(ed, {
					step: e.a,
					branch: e.branchA,
					isCondition: e.isCondition
				})
			}),
			/* @__PURE__ */ H("td", {
				className: r("border-b border-border px-3 py-2.5 align-top text-xs text-text-primary", a),
				children: /* @__PURE__ */ H(ed, {
					step: e.b,
					branch: e.branchB,
					isCondition: e.isCondition
				})
			}),
			/* @__PURE__ */ U("td", {
				className: r("border-b border-border px-3 py-2.5 align-top font-mono text-xs text-text-primary", a),
				"data-testid": `run-compare-delta-${e.nodeId}`,
				children: [e.branchDiffers ? /* @__PURE__ */ H("span", {
					className: "font-semibold text-info-fg",
					children: "different branch!"
				}) : e.statusDiffers ? /* @__PURE__ */ H("span", {
					className: "font-semibold text-danger-fg",
					children: "status differs"
				}) : e.durationDelta == null ? /* @__PURE__ */ H("span", {
					className: "text-text-tertiary",
					children: "—"
				}) : /* @__PURE__ */ H("span", {
					className: e.durationLarge ? "text-warning-fg" : "text-text-secondary",
					children: Ku(e.durationDelta)
				}), i != null && i !== 0 ? /* @__PURE__ */ U("div", {
					className: "mt-0.5 text-[11px] text-text-tertiary",
					children: [
						i > 0 ? "+" : "",
						i,
						"tok"
					]
				}) : null]
			})
		]
	}), e.isLlm && (t || n) ? /* @__PURE__ */ H("tr", { children: /* @__PURE__ */ H("td", {
		className: "border-b border-border p-0",
		colSpan: 4,
		children: /* @__PURE__ */ U("details", {
			className: "bg-surface-inset px-3.5 py-2.5",
			children: [
				/* @__PURE__ */ H("summary", {
					className: "cursor-pointer text-xs font-semibold text-text-secondary",
					"data-testid": `run-compare-llm-toggle-${e.nodeId}`,
					children: "LLM response diff"
				}),
				/* @__PURE__ */ U("div", {
					className: "mt-2 grid grid-cols-2 gap-2",
					children: [/* @__PURE__ */ U("div", { children: [/* @__PURE__ */ H("div", {
						className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary",
						children: "Run A"
					}), /* @__PURE__ */ H("pre", {
						"data-testid": `run-compare-llm-a-${e.nodeId}`,
						className: "m-0 whitespace-pre-wrap break-words rounded-md border border-border bg-surface p-2.5 text-xs",
						children: t?.response ?? "(no response)"
					})] }), /* @__PURE__ */ U("div", { children: [/* @__PURE__ */ H("div", {
						className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary",
						children: "Run B"
					}), /* @__PURE__ */ H("pre", {
						"data-testid": `run-compare-llm-b-${e.nodeId}`,
						className: "m-0 whitespace-pre-wrap break-words rounded-md border border-border bg-surface p-2.5 text-xs",
						children: n?.response ?? "(no response)"
					})] })]
				}),
				/* @__PURE__ */ U("div", {
					className: "mt-2.5",
					children: [/* @__PURE__ */ H("div", {
						className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary",
						children: "Word-level diff"
					}), /* @__PURE__ */ H("div", {
						className: "mt-1.5",
						children: /* @__PURE__ */ H(td, {
							a: t?.response ?? "",
							b: n?.response ?? ""
						})
					})]
				})
			]
		})
	}) }) : null] });
}
function rd({ runA: e, runB: t, def: n }) {
	let r = R(() => Qu(e, t, n), [
		e,
		t,
		n
	]);
	return /* @__PURE__ */ U("table", {
		className: "w-full overflow-hidden rounded-lg border border-border bg-surface text-[13px]",
		"data-testid": "run-compare-table",
		children: [/* @__PURE__ */ H("thead", { children: /* @__PURE__ */ U("tr", { children: [
			/* @__PURE__ */ H("th", {
				className: "border-b border-border bg-surface-inset px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wide text-text-secondary",
				children: "Step"
			}),
			/* @__PURE__ */ H("th", {
				className: "border-b border-border bg-surface-inset px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wide text-text-secondary",
				children: "Run A"
			}),
			/* @__PURE__ */ H("th", {
				className: "border-b border-border bg-surface-inset px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wide text-text-secondary",
				children: "Run B"
			}),
			/* @__PURE__ */ H("th", {
				className: "border-b border-border bg-surface-inset px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wide text-text-secondary",
				children: "Δ"
			})
		] }) }), /* @__PURE__ */ H("tbody", { children: r.map((e) => /* @__PURE__ */ H(nd, { row: e }, e.nodeId)) })]
	});
}
//#endregion
//#region src/components/pipelines/PipelineRunComparePage.tsx
function id(e) {
	return e == null ? "—" : `${e > 0 ? "+" : ""}${ia(Math.abs(e))}`.replace(/^(\+|-)?/, e === 0 ? "" : e > 0 ? "+" : "-");
}
function ad(e) {
	switch (e) {
		case "completed": return "success";
		case "failed": return "danger";
		case "cancelled": return "neutral";
		case "awaiting_approval": return "warning";
		case "running": return "info";
		case "pending": return "neutral";
		default: return "neutral";
	}
}
function od(e) {
	let t = /* @__PURE__ */ new Map();
	if (!e) return t;
	for (let n of e.nodes) n.data.type === "llm" && t.set(n.id, n.data.model);
	return t;
}
function sd(e, t) {
	return Wl(Ul(Object.values(e.steps).filter((e) => !!e.llm).map((e) => ({
		model: t.get(e.nodeId),
		tokensIn: e.llm?.tokensIn ?? 0,
		tokensOut: e.llm?.tokensOut ?? 0
	}))).total);
}
function cd({ label: e, run: t, cost: n, testIdPrefix: r }) {
	let i = ad(t.status);
	return /* @__PURE__ */ U("div", {
		className: "flex flex-col gap-1.5 rounded-lg border border-border bg-surface p-3.5 text-xs",
		"data-testid": `${r}-summary`,
		children: [
			/* @__PURE__ */ H("span", {
				className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary",
				children: e
			}),
			/* @__PURE__ */ U("div", {
				className: "flex items-center gap-2",
				children: [
					/* @__PURE__ */ H("span", {
						className: "font-mono text-xs text-text-tertiary",
						children: t.id.slice(0, 8)
					}),
					/* @__PURE__ */ H("span", {
						className: "text-text-tertiary",
						children: "·"
					}),
					/* @__PURE__ */ H("span", {
						className: "text-text-secondary",
						children: aa(t.startedAt)
					})
				]
			}),
			/* @__PURE__ */ U("div", {
				className: "flex items-center gap-2",
				children: [
					/* @__PURE__ */ H(x, {
						tone: i,
						children: t.status
					}),
					/* @__PURE__ */ H("span", {
						className: "text-text-tertiary",
						children: "·"
					}),
					/* @__PURE__ */ H("span", {
						className: "font-mono",
						children: ia(t.durationMs)
					}),
					/* @__PURE__ */ H("span", {
						className: "text-text-tertiary",
						children: "·"
					}),
					/* @__PURE__ */ H("span", {
						className: "font-mono",
						"data-testid": `${r}-cost`,
						children: n
					})
				]
			})
		]
	});
}
function ld() {
	let { pipelineId: e, runIdA: t, runIdB: n } = it(), r = rt(), i = R(() => e ? le(e) : null, [e]), a = R(() => e && t ? j(e, t) : null, [e, t]), o = R(() => e && n ? j(e, n) : null, [e, n]), s = R(() => od(i), [i]);
	if (!e || !t || !n) return /* @__PURE__ */ H(nt, {
		to: "/pipelines",
		replace: !0
	});
	if (!i) return /* @__PURE__ */ H("div", {
		className: "p-8",
		children: /* @__PURE__ */ H(w, {
			icon: "🔍",
			title: "Pipeline not found",
			body: "It may have been deleted. Go back to the pipelines list.",
			actionLabel: "Back to pipelines",
			onAction: () => r("/pipelines")
		})
	});
	if (!a || !o) return /* @__PURE__ */ H("div", {
		className: "p-8",
		"data-testid": "run-compare-missing",
		children: /* @__PURE__ */ H(w, {
			icon: "🔍",
			title: "Run not found",
			body: "One or both runs are unavailable — they may have been trimmed from history.",
			actionLabel: "Back to runs",
			onAction: () => r(`/pipelines/${e}/runs`)
		})
	});
	let c = (o.durationMs ?? 0) - (a.durationMs ?? 0), l = sd(a, s), u = sd(o, s), d = (/* @__PURE__ */ new Set([...Object.keys(a.steps), ...Object.keys(o.steps)])).size;
	return /* @__PURE__ */ U("div", {
		className: "flex flex-col gap-4 p-6 text-text-primary",
		"data-testid": "run-compare",
		children: [
			/* @__PURE__ */ U("div", {
				className: "flex items-center gap-3",
				children: [
					/* @__PURE__ */ U("button", {
						type: "button",
						onClick: () => r(`/pipelines/${e}/runs`),
						className: "cursor-pointer border-none bg-transparent p-0 text-[13px] text-primary",
						children: ["← ", i.name]
					}),
					/* @__PURE__ */ H("span", {
						className: "text-text-tertiary",
						children: "/"
					}),
					/* @__PURE__ */ H("span", {
						className: "text-lg font-bold text-text-primary",
						children: "Compare runs"
					}),
					/* @__PURE__ */ U("span", {
						className: "ml-auto text-xs text-text-tertiary",
						"data-testid": "run-compare-cost-delta",
						children: [
							l,
							" → ",
							u
						]
					})
				]
			}),
			/* @__PURE__ */ U("div", {
				className: "grid grid-cols-2 gap-3",
				children: [/* @__PURE__ */ H(cd, {
					label: "Run A",
					run: a,
					cost: l,
					testIdPrefix: "run-a"
				}), /* @__PURE__ */ H(cd, {
					label: "Run B",
					run: o,
					cost: u,
					testIdPrefix: "run-b"
				})]
			}),
			/* @__PURE__ */ U("div", {
				className: "flex items-center gap-4 rounded-lg border border-border bg-surface px-3.5 py-2.5 text-xs",
				"data-testid": "run-compare-delta",
				children: [
					/* @__PURE__ */ H("span", {
						className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary",
						children: "Δ duration"
					}),
					/* @__PURE__ */ H("span", {
						className: "font-mono text-[13px]",
						children: id(c)
					}),
					/* @__PURE__ */ H("span", { className: "flex-1" }),
					/* @__PURE__ */ U("span", {
						className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary",
						children: [
							d,
							" step",
							d === 1 ? "" : "s",
							" compared"
						]
					})
				]
			}),
			/* @__PURE__ */ H(rd, {
				runA: a,
				runB: o,
				def: i
			})
		]
	});
}
//#endregion
//#region src/components/pipelines/DiffMetadataHeader.tsx
function ud(e) {
	return e === 0 ? "0ms" : `${e > 0 ? "+" : "-"}${ia(Math.abs(e))}`;
}
function dd(e) {
	switch (e) {
		case "completed": return "success";
		case "failed": return "danger";
		case "cancelled": return "neutral";
		case "awaiting_approval": return "warning";
		case "running": return "info";
		case "pending": return "neutral";
		default: return "neutral";
	}
}
function fd({ runA: e, runB: t, costA: n, costB: i }) {
	let a = e.durationMs ?? 0, o = (t.durationMs ?? 0) - a;
	return /* @__PURE__ */ U("div", {
		className: "flex flex-col gap-3",
		children: [/* @__PURE__ */ U("div", {
			className: "grid grid-cols-2 gap-3",
			children: [/* @__PURE__ */ U("div", {
				className: "flex flex-col gap-1.5 rounded-lg border border-border bg-surface p-3.5 text-xs",
				"data-testid": "diff-run-a-summary",
				children: [
					/* @__PURE__ */ H("span", {
						className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary",
						children: "Run A"
					}),
					/* @__PURE__ */ U("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ H("span", {
							className: "font-mono text-xs text-text-tertiary",
							children: e.id.slice(0, 8)
						}), /* @__PURE__ */ H(x, {
							tone: dd(e.status),
							children: e.status
						})]
					}),
					/* @__PURE__ */ H("div", {
						className: "text-xs text-text-secondary",
						children: aa(e.startedAt)
					}),
					/* @__PURE__ */ U("div", {
						className: "font-mono text-xs",
						children: [
							ia(e.durationMs),
							" | ",
							n
						]
					}),
					/* @__PURE__ */ U("div", {
						className: "text-[11px] text-text-tertiary",
						children: ["Trigger: ", e.triggeredBy.userId ?? e.triggeredBy.triggerType]
					})
				]
			}), /* @__PURE__ */ U("div", {
				className: "flex flex-col gap-1.5 rounded-lg border border-border bg-surface p-3.5 text-xs",
				"data-testid": "diff-run-b-summary",
				children: [
					/* @__PURE__ */ H("span", {
						className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary",
						children: "Run B"
					}),
					/* @__PURE__ */ U("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ H("span", {
							className: "font-mono text-xs text-text-tertiary",
							children: t.id.slice(0, 8)
						}), /* @__PURE__ */ H(x, {
							tone: dd(t.status),
							children: t.status
						})]
					}),
					/* @__PURE__ */ H("div", {
						className: "text-xs text-text-secondary",
						children: aa(t.startedAt)
					}),
					/* @__PURE__ */ U("div", {
						className: "font-mono text-xs",
						children: [
							ia(t.durationMs),
							" | ",
							i
						]
					}),
					/* @__PURE__ */ U("div", {
						className: "text-[11px] text-text-tertiary",
						children: ["Trigger: ", t.triggeredBy.userId ?? t.triggeredBy.triggerType]
					})
				]
			})]
		}), /* @__PURE__ */ U("div", {
			className: "flex items-center gap-4 rounded-md bg-surface-inset px-3.5 py-2.5",
			"data-testid": "diff-duration-delta",
			children: [
				/* @__PURE__ */ H("span", {
					className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary",
					children: "Duration delta"
				}),
				/* @__PURE__ */ H("span", {
					className: r("font-mono text-sm font-bold", o === 0 ? "text-text-secondary" : o < 0 ? "text-success-fg" : "text-danger-fg"),
					children: ud(o)
				}),
				/* @__PURE__ */ U("span", {
					className: "text-[11px] text-text-tertiary",
					children: [
						"(",
						o < 0 ? "faster" : o > 0 ? "slower" : "same",
						" in Run B)"
					]
				})
			]
		})]
	});
}
//#endregion
//#region src/components/pipelines/DiffStepTable.tsx
function pd(e) {
	return e === 0 ? "0ms" : `${e > 0 ? "+" : "-"}${ia(Math.abs(e))}`;
}
function md(e) {
	switch (e) {
		case "completed": return "success";
		case "failed": return "danger";
		case "cancelled": return "neutral";
		case "skipped": return "neutral";
		case "running": return "info";
		case "awaiting": return "warning";
		default: return "neutral";
	}
}
function hd(e, t) {
	if (!e) return t;
	let n = e.nodes.find((e) => e.id === t);
	return n ? n.data.type === "condition" && n.data.label ? n.data.label : n.type.charAt(0).toUpperCase() + n.type.slice(1) : t;
}
function gd(e, t, n) {
	let r = /* @__PURE__ */ new Set(), i = [];
	if (n) for (let a of n.nodes) (e.steps[a.id] || t.steps[a.id]) && (i.push(a.id), r.add(a.id));
	for (let n of [...Object.keys(e.steps), ...Object.keys(t.steps)]) r.has(n) || (i.push(n), r.add(n));
	return i.map((r) => {
		let i = e.steps[r], a = t.steps[r], o = i?.durationMs, s = a?.durationMs, c = o != null && s != null ? s - o : void 0, l = !!i && !!a && i.status !== a.status, u = !!i && !a, d = !i && !!a, f = i?.llm ? i.llm.tokensIn + i.llm.tokensOut : void 0, p = a?.llm ? a.llm.tokensIn + a.llm.tokensOut : void 0, m = f != null && p != null ? p - f : void 0;
		return {
			nodeId: r,
			name: hd(n, r),
			a: i,
			b: a,
			durationDelta: c,
			statusDiffers: l,
			onlyInA: u,
			onlyInB: d,
			tokenDelta: m
		};
	});
}
function _d({ runA: e, runB: t, def: n }) {
	let i = R(() => gd(e, t, n), [
		e,
		t,
		n
	]);
	return /* @__PURE__ */ U("table", {
		className: "w-full border-collapse text-[13px]",
		children: [/* @__PURE__ */ H("thead", { children: /* @__PURE__ */ U("tr", { children: [
			/* @__PURE__ */ H("th", {
				className: "border-b border-border bg-surface-inset px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wide text-text-secondary",
				children: "Step"
			}),
			/* @__PURE__ */ H("th", {
				className: "border-b border-border bg-surface-inset px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wide text-text-secondary",
				children: "Run A"
			}),
			/* @__PURE__ */ H("th", {
				className: "border-b border-border bg-surface-inset px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wide text-text-secondary",
				children: "Run B"
			}),
			/* @__PURE__ */ H("th", {
				className: "border-b border-border bg-surface-inset px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wide text-text-secondary",
				children: "Delta"
			})
		] }) }), /* @__PURE__ */ H("tbody", { children: i.map((e) => /* @__PURE__ */ U("tr", {
			className: r(e.onlyInA || e.onlyInB ? "bg-warning-bg" : e.statusDiffers ? "bg-danger-bg" : void 0),
			"data-testid": `diff-step-row-${e.nodeId}`,
			children: [
				/* @__PURE__ */ U("td", {
					className: "border-b border-border px-3 py-2.5 align-top text-xs text-text-primary",
					children: [
						/* @__PURE__ */ H("div", {
							className: "font-semibold",
							children: e.name
						}),
						/* @__PURE__ */ H("div", {
							className: "font-mono text-[10px] text-text-tertiary",
							children: e.nodeId
						}),
						e.onlyInA && /* @__PURE__ */ H(x, {
							tone: "warning",
							size: "xs",
							children: "only in A"
						}),
						e.onlyInB && /* @__PURE__ */ H(x, {
							tone: "warning",
							size: "xs",
							children: "only in B"
						})
					]
				}),
				/* @__PURE__ */ H("td", {
					className: "border-b border-border px-3 py-2.5 align-top text-xs text-text-primary",
					children: e.a ? /* @__PURE__ */ U("div", {
						className: "flex flex-col gap-0.5",
						children: [
							/* @__PURE__ */ H(x, {
								tone: md(e.a.status),
								children: e.a.status
							}),
							/* @__PURE__ */ H("span", {
								className: "font-mono text-[11px] text-text-secondary",
								children: ia(e.a.durationMs)
							}),
							e.a.llm && /* @__PURE__ */ U("span", {
								className: "text-[10px] text-text-tertiary",
								children: [
									e.a.llm.tokensIn,
									" in / ",
									e.a.llm.tokensOut,
									" out"
								]
							})
						]
					}) : /* @__PURE__ */ H("span", {
						className: "text-text-tertiary",
						children: "(not run)"
					})
				}),
				/* @__PURE__ */ H("td", {
					className: "border-b border-border px-3 py-2.5 align-top text-xs text-text-primary",
					children: e.b ? /* @__PURE__ */ U("div", {
						className: "flex flex-col gap-0.5",
						children: [
							/* @__PURE__ */ H(x, {
								tone: md(e.b.status),
								children: e.b.status
							}),
							/* @__PURE__ */ H("span", {
								className: "font-mono text-[11px] text-text-secondary",
								children: ia(e.b.durationMs)
							}),
							e.b.llm && /* @__PURE__ */ U("span", {
								className: "text-[10px] text-text-tertiary",
								children: [
									e.b.llm.tokensIn,
									" in / ",
									e.b.llm.tokensOut,
									" out"
								]
							})
						]
					}) : /* @__PURE__ */ H("span", {
						className: "text-text-tertiary",
						children: "(not run)"
					})
				}),
				/* @__PURE__ */ U("td", {
					className: "border-b border-border px-3 py-2.5 align-top font-mono text-xs text-text-primary",
					children: [
						e.statusDiffers && /* @__PURE__ */ H("div", {
							className: "text-[11px] font-semibold text-danger-fg",
							children: "status differs"
						}),
						e.durationDelta != null && /* @__PURE__ */ H("div", {
							className: r("text-xs", e.durationDelta === 0 ? "text-text-tertiary" : e.durationDelta < 0 ? "text-success-fg" : "text-danger-fg"),
							children: pd(e.durationDelta)
						}),
						e.tokenDelta != null && e.tokenDelta !== 0 && /* @__PURE__ */ U("div", {
							className: r("mt-0.5 text-[10px]", e.tokenDelta < 0 ? "text-success-fg" : "text-danger-fg"),
							children: [
								e.tokenDelta > 0 ? "+" : "",
								e.tokenDelta,
								" tok"
							]
						}),
						e.durationDelta == null && !e.statusDiffers && /* @__PURE__ */ H("span", {
							className: "text-text-tertiary",
							children: "--"
						})
					]
				})
			]
		}, e.nodeId)) })]
	});
}
//#endregion
//#region src/components/pipelines/DiffOutputViewer.tsx
function vd(e, t) {
	if (!e) return t;
	let n = e.nodes.find((e) => e.id === t);
	return n ? n.data.type === "condition" && n.data.label ? n.data.label : n.type.charAt(0).toUpperCase() + n.type.slice(1) : t;
}
function yd(e, t = "", n = 0) {
	let r = /* @__PURE__ */ new Map();
	if (n > 6 || e == null) return r.set(t || "(root)", String(e)), r;
	if (typeof e != "object") return r.set(t || "(root)", JSON.stringify(e)), r;
	if (Array.isArray(e)) {
		if (e.length === 0) r.set(t || "(root)", "[]");
		else for (let i = 0; i < e.length; i++) {
			let a = t ? `${t}.${i}` : String(i);
			for (let [t, o] of yd(e[i], a, n + 1)) r.set(t, o);
		}
		return r;
	}
	let i = Object.entries(e);
	if (i.length === 0) r.set(t || "(root)", "{}");
	else for (let [e, a] of i) {
		let i = t ? `${t}.${e}` : e;
		for (let [e, t] of yd(a, i, n + 1)) r.set(e, t);
	}
	return r;
}
function bd(e, t) {
	let n = yd(e), r = yd(t), i = /* @__PURE__ */ new Set([...n.keys(), ...r.keys()]), a = [];
	for (let e of i) {
		let t = n.get(e), i = r.get(e);
		t === void 0 ? a.push({
			key: e,
			type: "added",
			valueB: i
		}) : i === void 0 ? a.push({
			key: e,
			type: "removed",
			valueA: t
		}) : t === i ? a.push({
			key: e,
			type: "unchanged",
			valueA: t,
			valueB: i
		}) : a.push({
			key: e,
			type: "changed",
			valueA: t,
			valueB: i
		});
	}
	let o = {
		changed: 0,
		added: 1,
		removed: 2,
		unchanged: 3
	};
	return a.sort((e, t) => {
		let n = o[e.type] - o[t.type];
		return n === 0 ? e.key.localeCompare(t.key) : n;
	}), a;
}
var xd = {
	added: "bg-success-bg text-success-fg",
	removed: "bg-danger-bg text-danger-fg line-through",
	changed: "bg-warning-bg text-warning-fg",
	unchanged: "text-text-tertiary"
};
function Sd({ nodeId: e, name: t, outputA: n, outputB: i }) {
	let [a, o] = B(!1), s = R(() => bd(n, i), [n, i]), c = s.filter((e) => e.type !== "unchanged").length;
	return c === 0 ? /* @__PURE__ */ U("div", {
		className: "rounded-md bg-surface-inset px-3 py-2",
		children: [/* @__PURE__ */ H("span", {
			className: "text-xs font-semibold",
			children: t
		}), /* @__PURE__ */ H("span", {
			className: "ml-2 text-[11px] text-text-tertiary",
			children: "(no differences)"
		})]
	}) : /* @__PURE__ */ U("div", {
		className: "overflow-hidden rounded-md border border-border",
		"data-testid": `diff-output-${e}`,
		children: [/* @__PURE__ */ U("button", {
			type: "button",
			"aria-expanded": a,
			className: "flex w-full cursor-pointer items-center gap-2 border-none bg-surface-inset px-3 py-2 text-left font-[inherit]",
			onClick: () => o(!a),
			children: [
				/* @__PURE__ */ H("span", {
					className: "text-[11px] text-text-tertiary",
					children: a ? "▼" : "▶"
				}),
				/* @__PURE__ */ H("span", {
					className: "text-xs font-semibold",
					children: t
				}),
				/* @__PURE__ */ H("span", {
					className: "font-mono text-[10px] text-text-tertiary",
					children: e
				}),
				/* @__PURE__ */ U(x, {
					tone: "warning",
					size: "xs",
					className: "ml-auto",
					children: [
						c,
						" difference",
						c === 1 ? "" : "s"
					]
				})
			]
		}), a && /* @__PURE__ */ H("div", {
			className: "flex flex-col gap-0.5 px-3 py-2",
			children: s.filter((e) => e.type !== "unchanged").map((e, t) => /* @__PURE__ */ U("div", {
				className: r("flex items-baseline gap-2 rounded-sm px-2 py-0.5 font-mono text-[11px]", xd[e.type]),
				children: [
					/* @__PURE__ */ U("span", {
						className: "min-w-[120px] shrink-0 font-semibold",
						children: [
							e.type === "added" && "+ ",
							e.type === "removed" && "- ",
							e.type === "changed" && "~ ",
							e.key
						]
					}),
					e.type === "changed" && /* @__PURE__ */ U("span", { children: [
						/* @__PURE__ */ H("span", {
							className: "line-through opacity-70",
							children: e.valueA
						}),
						" -> ",
						/* @__PURE__ */ H("span", {
							className: "font-semibold",
							children: e.valueB
						})
					] }),
					e.type === "added" && /* @__PURE__ */ H("span", { children: e.valueB }),
					e.type === "removed" && /* @__PURE__ */ H("span", { children: e.valueA })
				]
			}, `${e.key}-${t}`))
		})]
	});
}
function Cd({ runA: e, runB: t, def: n }) {
	let r = R(() => {
		let r = /* @__PURE__ */ new Set(), i = [];
		if (n) for (let a of n.nodes) {
			let n = e.steps[a.id]?.output != null, o = t.steps[a.id]?.output != null;
			(n || o) && (i.push(a.id), r.add(a.id));
		}
		for (let n of [...Object.keys(e.steps), ...Object.keys(t.steps)]) {
			if (r.has(n)) continue;
			let a = e.steps[n]?.output != null, o = t.steps[n]?.output != null;
			(a || o) && (i.push(n), r.add(n));
		}
		return i;
	}, [
		e,
		t,
		n
	]);
	return r.length === 0 ? /* @__PURE__ */ H("div", {
		className: "p-4 text-center text-xs text-text-tertiary",
		children: "No step outputs to compare."
	}) : /* @__PURE__ */ H("div", {
		className: "flex flex-col gap-3",
		children: r.map((r) => /* @__PURE__ */ H(Sd, {
			nodeId: r,
			name: vd(n, r),
			outputA: e.steps[r]?.output,
			outputB: t.steps[r]?.output
		}, r))
	});
}
//#endregion
//#region src/components/pipelines/PipelineRunDiff.tsx
function wd(e) {
	let t = /* @__PURE__ */ new Map();
	if (!e) return t;
	for (let n of e.nodes) n.data.type === "llm" && t.set(n.id, n.data.model);
	return t;
}
function Td(e, t) {
	return Wl(Ul(Object.values(e.steps).filter((e) => !!e.llm).map((e) => ({
		model: t.get(e.nodeId),
		tokensIn: e.llm?.tokensIn ?? 0,
		tokensOut: e.llm?.tokensOut ?? 0
	}))).total);
}
function Ed({ title: e, defaultOpen: t = !0, badge: n, children: r, testId: i }) {
	let [a, o] = B(t);
	return /* @__PURE__ */ U("div", {
		className: "overflow-hidden rounded-lg border border-border bg-surface",
		"data-testid": i,
		children: [/* @__PURE__ */ U("div", {
			className: "flex cursor-pointer select-none items-center gap-2 border-b border-border bg-surface-inset px-4 py-3",
			onClick: () => o(!a),
			role: "button",
			tabIndex: 0,
			onKeyDown: (e) => {
				(e.key === "Enter" || e.key === " ") && (e.preventDefault(), o(!a));
			},
			"aria-expanded": a,
			children: [
				/* @__PURE__ */ H("span", {
					className: "text-xs text-text-tertiary",
					children: a ? "▼" : "▶"
				}),
				/* @__PURE__ */ H("span", {
					className: "text-[13px] font-bold text-text-primary",
					children: e
				}),
				n && /* @__PURE__ */ H(x, {
					tone: "info",
					className: "ml-auto",
					children: n
				})
			]
		}), a && /* @__PURE__ */ H("div", {
			className: "p-4",
			children: r
		})]
	});
}
var Dd = {
	added: "bg-success-bg text-success-fg",
	removed: "bg-danger-bg text-danger-fg line-through",
	changed: "bg-warning-bg text-warning-fg",
	unchanged: "text-text-tertiary"
};
function Od({ runA: e, runB: t }) {
	let n = R(() => bd(e.context, t.context), [e.context, t.context]), i = n.filter((e) => e.type !== "unchanged").length;
	return /* @__PURE__ */ H(Ed, {
		title: "Context evolution diff",
		defaultOpen: !1,
		badge: i > 0 ? `${i} difference${i === 1 ? "" : "s"}` : void 0,
		testId: "diff-context-section",
		children: i === 0 ? /* @__PURE__ */ H("div", {
			className: "p-4 text-center text-xs text-text-tertiary",
			children: "Final contexts are identical."
		}) : /* @__PURE__ */ H("div", {
			className: "flex flex-col gap-0.5",
			children: n.map((e, t) => /* @__PURE__ */ U("div", {
				className: r("flex items-baseline gap-2 rounded-sm px-2 py-0.5 font-mono text-[11px]", Dd[e.type]),
				children: [
					/* @__PURE__ */ U("span", {
						className: "min-w-[160px] shrink-0 font-semibold",
						children: [
							e.type === "added" && "+ ",
							e.type === "removed" && "- ",
							e.type === "changed" && "~ ",
							e.type === "unchanged" && "  ",
							e.key
						]
					}),
					e.type === "changed" && /* @__PURE__ */ U("span", { children: [
						/* @__PURE__ */ H("span", {
							className: "line-through opacity-70",
							children: e.valueA
						}),
						" -> ",
						/* @__PURE__ */ H("span", {
							className: "font-semibold",
							children: e.valueB
						})
					] }),
					e.type === "added" && /* @__PURE__ */ H("span", { children: e.valueB }),
					e.type === "removed" && /* @__PURE__ */ H("span", { children: e.valueA }),
					e.type === "unchanged" && /* @__PURE__ */ H("span", {
						className: "opacity-50",
						children: e.valueA
					})
				]
			}, `${e.key}-${t}`))
		})
	});
}
function kd({ pipelineId: e, runIdA: t, runIdB: n }) {
	let r = rt(), i = R(() => le(e), [e]), a = R(() => j(e, t), [e, t]), o = R(() => j(e, n), [e, n]), s = R(() => wd(i), [i]);
	if (!i) return /* @__PURE__ */ H("div", {
		className: "p-8",
		children: /* @__PURE__ */ H(w, {
			icon: "🔍",
			title: "Pipeline not found",
			body: "It may have been deleted. Go back to the pipelines list.",
			actionLabel: "Back to pipelines",
			onAction: () => r("/pipelines")
		})
	});
	if (!a || !o) return /* @__PURE__ */ H("div", {
		className: "p-8",
		"data-testid": "diff-run-missing",
		children: /* @__PURE__ */ H(w, {
			icon: "🔍",
			title: "Run not found",
			body: "One or both runs are unavailable -- they may have been trimmed from history.",
			actionLabel: "Back to runs",
			onAction: () => r(`/pipelines/${e}/runs`)
		})
	});
	let c = Td(a, s), l = Td(o, s);
	return /* @__PURE__ */ U("div", {
		className: "mx-auto flex w-full max-w-[1400px] flex-col gap-5 p-6 text-text-primary",
		"data-testid": "pipeline-run-diff",
		children: [
			/* @__PURE__ */ U("div", {
				className: "flex items-center gap-3",
				children: [
					/* @__PURE__ */ U("button", {
						type: "button",
						onClick: () => r(`/pipelines/${e}/runs`),
						className: "cursor-pointer border-none bg-transparent p-0 text-[13px] text-primary",
						children: ["← ", i.name]
					}),
					/* @__PURE__ */ H("span", {
						className: "text-text-tertiary",
						children: "/"
					}),
					/* @__PURE__ */ H("span", {
						className: "text-lg font-bold text-text-primary",
						children: "Diff view"
					}),
					/* @__PURE__ */ U("span", {
						className: "ml-auto font-mono text-[11px] text-text-tertiary",
						children: [
							t.slice(0, 8),
							" vs ",
							n.slice(0, 8)
						]
					})
				]
			}),
			/* @__PURE__ */ H(Ed, {
				title: "Summary",
				testId: "diff-summary-section",
				children: /* @__PURE__ */ H(fd, {
					runA: a,
					runB: o,
					costA: c,
					costB: l
				})
			}),
			/* @__PURE__ */ H(Ed, {
				title: "Step-by-step comparison",
				badge: `${Object.keys(a.steps).length + Object.keys(o.steps).length > 0 ? "steps" : "0 steps"}`,
				testId: "diff-steps-section",
				children: /* @__PURE__ */ H(_d, {
					runA: a,
					runB: o,
					def: i
				})
			}),
			/* @__PURE__ */ H(Ed, {
				title: "Output diff",
				defaultOpen: !1,
				testId: "diff-output-section",
				children: /* @__PURE__ */ H(Cd, {
					runA: a,
					runB: o,
					def: i
				})
			}),
			/* @__PURE__ */ H(Od, {
				runA: a,
				runB: o
			})
		]
	});
}
function Ad() {
	let { pipelineId: e } = it(), [t] = at(), n = t.get("a"), r = t.get("b");
	return !e || !n || !r ? /* @__PURE__ */ H(nt, {
		to: "/pipelines",
		replace: !0
	}) : /* @__PURE__ */ H(kd, {
		pipelineId: e,
		runIdA: n,
		runIdB: r
	});
}
//#endregion
//#region src/components/pipelines/AllRunsPage.tsx
function jd() {
	let e = rt(), [t, n] = at(), [r, i] = B([]), { runs: a } = _e();
	L(() => {
		let e = !1;
		return (async () => {
			let t = ae(), n = [];
			await Promise.all(t.map(async (e) => {
				try {
					let { runs: t } = await xe(e.id, { limit: 50 });
					if (t.length > 0) {
						for (let r of t) r.id && n.push({
							...r,
							pipelineName: e.name
						});
						return;
					}
				} catch {}
				for (let t of Oe(e.id)) t.id && n.push({
					...t,
					pipelineName: e.name
				});
			})), !e && (n.sort((e, t) => t.startedAt.localeCompare(e.startedAt)), i(n));
		})(), () => {
			e = !0;
		};
	}, []);
	let o = R(() => {
		let e = new Map(ae().map((e) => [e.id, e.name])), t = new Set(r.map((e) => e.id)), n = [];
		for (let [r, i] of Object.entries(a)) t.has(r) || i.pipelineId && n.push({
			...i,
			pipelineName: e.get(i.pipelineId) ?? `Pipeline ${i.pipelineId.slice(0, 8)}`
		});
		return n.length === 0 ? r : [...n, ...r].sort((e, t) => t.startedAt.localeCompare(e.startedAt));
	}, [r, a]), { query: s, statuses: c, triggerKinds: l, range: u } = R(() => au(t), [t]), d = (e, r) => {
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
	}, g = R(() => ru(o, {
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
	]), _ = R(() => {
		let e = {};
		for (let t of g) {
			let n = Ul(Object.values(t.steps).filter((e) => !!e.llm).map((e) => ({
				model: void 0,
				tokensIn: e.llm?.tokensIn ?? 0,
				tokensOut: e.llm?.tokensOut ?? 0
			})));
			n.total.totalCostUsd > 0 && (e[t.id] = Wl(n.total));
		}
		return e;
	}, [g]);
	return /* @__PURE__ */ U("div", {
		"data-testid": "all-runs-page",
		className: "p-6 flex flex-col gap-3",
		children: [
			/* @__PURE__ */ U("div", {
				className: "flex items-center justify-between mb-4",
				children: [/* @__PURE__ */ H("h2", {
					className: "m-0 text-[22px] font-bold text-text-primary",
					children: "Runs"
				}), /* @__PURE__ */ U("span", {
					className: "text-[13px] text-text-tertiary",
					children: [
						g.length,
						" run",
						g.length === 1 ? "" : "s"
					]
				})]
			}),
			/* @__PURE__ */ H(uu, {
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
			g.length === 0 ? /* @__PURE__ */ H(w, {
				icon: "📋",
				title: "No runs yet",
				body: "Run a pipeline to see execution history here."
			}) : /* @__PURE__ */ H("div", {
				className: "overflow-x-auto",
				children: /* @__PURE__ */ U("table", {
					className: "w-full border-collapse text-[13px]",
					children: [/* @__PURE__ */ H("thead", { children: /* @__PURE__ */ U("tr", {
						className: "border-b border-border",
						children: [
							/* @__PURE__ */ H("th", {
								className: "px-3 py-2.5 text-xs text-text-secondary font-semibold text-left",
								children: "Pipeline"
							}),
							/* @__PURE__ */ H("th", {
								className: "px-3 py-2.5 text-xs text-text-secondary font-semibold text-left",
								children: "Run ID"
							}),
							/* @__PURE__ */ H("th", {
								className: "px-3 py-2.5 text-xs text-text-secondary font-semibold text-left",
								children: "Status"
							}),
							/* @__PURE__ */ H("th", {
								className: "px-3 py-2.5 text-xs text-text-secondary font-semibold text-left",
								children: "Trigger"
							}),
							/* @__PURE__ */ H("th", {
								className: "px-3 py-2.5 text-xs text-text-secondary font-semibold text-left",
								children: "Started"
							}),
							/* @__PURE__ */ H("th", {
								className: "px-3 py-2.5 text-xs text-text-secondary font-semibold text-right",
								children: "Duration"
							}),
							/* @__PURE__ */ H("th", {
								className: "px-3 py-2.5 text-xs text-text-secondary font-semibold text-right",
								children: "Cost"
							})
						]
					}) }), /* @__PURE__ */ H("tbody", { children: g.map((t) => /* @__PURE__ */ U("tr", {
						role: "button",
						tabIndex: 0,
						"aria-label": `Open run ${t.id.slice(0, 11)} of ${t.pipelineName}`,
						onClick: () => e(`/pipelines/${t.pipelineId}/runs/${t.id}`),
						onKeyDown: E(() => e(`/pipelines/${t.pipelineId}/runs/${t.id}`)),
						className: "border-b border-border cursor-pointer hover:bg-surface-hover",
						children: [
							/* @__PURE__ */ H("td", {
								className: "px-3 py-2.5 text-xs text-text-secondary font-medium",
								children: t.pipelineName
							}),
							/* @__PURE__ */ H("td", {
								className: "px-3 py-2.5 text-xs text-text-secondary font-mono",
								children: t.id.slice(0, 11)
							}),
							/* @__PURE__ */ H("td", {
								className: "px-3 py-2.5 text-xs text-text-secondary",
								children: /* @__PURE__ */ H(x, {
									tone: fu(t.status).tone,
									size: "sm",
									children: t.status
								})
							}),
							/* @__PURE__ */ H("td", {
								className: "px-3 py-2.5 text-xs text-text-secondary",
								children: t.triggerType ?? t.triggeredBy?.triggerType
							}),
							/* @__PURE__ */ H("td", {
								className: "px-3 py-2.5 text-xs text-text-secondary",
								children: oa(t.startedAt)
							}),
							/* @__PURE__ */ H("td", {
								className: "px-3 py-2.5 text-xs text-text-secondary text-right font-mono",
								children: t.completedAt ? ia(new Date(t.completedAt).getTime() - new Date(t.startedAt).getTime()) : "—"
							}),
							/* @__PURE__ */ H("td", {
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
function Md(e) {
	let t = 0, n = 0;
	for (let r of Object.values(e.steps ?? {})) r.llm && (t += r.llm.tokensIn ?? 0, n += r.llm.tokensOut ?? 0);
	return {
		tokensIn: t,
		tokensOut: n
	};
}
function Nd(e) {
	let t = /* @__PURE__ */ new Map();
	if (!e) return t;
	for (let n of e.nodes) n.data.type === "llm" && t.set(n.id, n.data.model);
	return t;
}
function Pd(e, t) {
	let n = [];
	for (let r of Object.values(e.steps ?? {})) r.llm && n.push({
		model: t.get(r.nodeId),
		tokensIn: r.llm.tokensIn,
		tokensOut: r.llm.tokensOut
	});
	return Ul(n).total.totalCostUsd;
}
function Fd(e, t) {
	return e.length === 0 ? 0 : e[Math.min(e.length - 1, Math.floor(e.length * t))];
}
function Id(e) {
	return e < .01 ? `$${e.toFixed(4)}` : e < 1 ? `$${e.toFixed(3)}` : `$${e.toFixed(2)}`;
}
function Ld(e) {
	let t = typeof e == "number" ? e : Number(e);
	return Number.isFinite(t) ? `$${t.toFixed(4).replace(/\.?0+$/, "")}` : "$0";
}
function Rd(e) {
	return e.slice(0, 8);
}
function zd(e) {
	let t = Date.now() - new Date(e).getTime();
	return t < 6e4 ? "just now" : t < 36e5 ? `${Math.floor(t / 6e4)}m ago` : t < 864e5 ? `${Math.floor(t / 36e5)}h ago` : t < 2592e5 ? `${Math.floor(t / 864e5)}d ago` : new Date(e).toLocaleDateString();
}
function Bd(e, t) {
	let n = e.length, r = 0, i = 0, a = 0, o = [], s = 0, c = 0, l = 0, u = /* @__PURE__ */ new Map();
	for (let n of e) {
		n.status === "completed" ? r++ : n.status === "failed" ? i++ : n.status === "cancelled" && a++, typeof n.durationMs == "number" && n.durationMs > 0 && o.push(n.durationMs);
		let e = Md(n);
		if (s += e.tokensIn, c += e.tokensOut, l += Pd(n, t), n.error?.message) {
			let e = n.error.message.slice(0, 48), t = u.get(e);
			t ? (t.count += 1, n.startedAt > t.lastSeenAt && (t.lastSeenAt = n.startedAt, t.exampleRunId = n.id)) : u.set(e, {
				count: 1,
				lastSeenAt: n.startedAt,
				exampleRunId: n.id
			});
		}
	}
	o.sort((e, t) => e - t);
	let d = Fd(o, .5), f = Fd(o, .95), p = n === 0 ? 0 : Math.round(r / n * 100), m = [...u.entries()].map(([e, t]) => ({
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
		successRatePct: p,
		medianMs: d,
		p95Ms: f,
		tokensIn: s,
		tokensOut: c,
		tokensPerRun: n === 0 ? 0 : Math.round((s + c) / n),
		totalCost: l,
		costPerRun: n === 0 ? 0 : l / n,
		failureBreakdown: m
	};
}
function Vd(e) {
	return e >= 90 ? "var(--color-success)" : e >= 70 ? "var(--color-warning)" : "var(--color-danger)";
}
function Hd(e) {
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
function Ud(e, t) {
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
function Wd(e) {
	let t = [...e].sort((e, t) => e.startedAt.localeCompare(t.startedAt)), n = [], r = [];
	for (let e of t) {
		let t = new Date(e.startedAt).getTime(), { tokensIn: i, tokensOut: a } = Md(e);
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
function Gd() {
	let { pipelineId: e } = it(), t = rt(), [n, i] = B(null), [a, o] = B([]), [s, c] = B("50");
	L(() => {
		e && (i(le(e)), o(Oe(e)));
	}, [e]);
	let l = R(() => {
		if (s === "all") return a;
		let e = Number(s);
		return a.slice(0, e);
	}, [a, s]), u = R(() => Nd(n), [n]), d = R(() => Bd(l, u), [l, u]), f = R(() => ql(l, n).filter((e) => e.totalCostUsd > 0 || e.stepCount > 0), [l, n]), p = R(() => Xl(a, n, 30), [a, n]), m = R(() => [{
		label: "Daily spend",
		data: p.map((e) => ({
			x: e.ts,
			y: e.totalCostUsd
		})),
		color: "var(--color-primary)"
	}], [p]);
	if (!e) return /* @__PURE__ */ H(nt, {
		to: "/pipelines",
		replace: !0
	});
	if (!n) return /* @__PURE__ */ H("div", {
		className: "p-8",
		children: /* @__PURE__ */ H(w, {
			icon: "🔍",
			title: "Pipeline not found",
			body: "It may have been deleted. Go back to the pipelines list.",
			actionLabel: "Back to pipelines",
			onAction: () => t("/pipelines")
		})
	});
	let h = l.length > 0;
	return /* @__PURE__ */ U("div", {
		className: "p-6 flex flex-col gap-4",
		children: [/* @__PURE__ */ U("div", {
			className: "flex items-center gap-3",
			children: [
				/* @__PURE__ */ U("button", {
					type: "button",
					onClick: () => t(`/pipelines/${e}`),
					className: "bg-transparent border-none text-primary cursor-pointer text-[13px] p-0",
					children: ["← ", n.name]
				}),
				/* @__PURE__ */ H("span", {
					className: "text-text-tertiary",
					children: "/"
				}),
				/* @__PURE__ */ H("span", {
					className: "text-lg font-bold text-text-primary",
					children: "Execution stats"
				}),
				/* @__PURE__ */ H("div", {
					className: "ml-auto flex gap-1.5",
					"data-testid": "stats-range",
					children: [
						"10",
						"50",
						"all"
					].map((e) => /* @__PURE__ */ H("button", {
						type: "button",
						onClick: () => c(e),
						className: r("px-2.5 py-1 text-xs font-medium rounded cursor-pointer font-[inherit]", s === e ? "border border-primary bg-primary text-white" : "border border-border bg-surface text-text-secondary"),
						children: e === "all" ? "All" : `Last ${e}`
					}, e))
				})
			]
		}), h ? /* @__PURE__ */ U(V, { children: [
			/* @__PURE__ */ U("div", {
				className: "grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3",
				"data-testid": "stats-kpis",
				children: [
					/* @__PURE__ */ U("div", {
						className: "bg-surface border border-border rounded-lg p-4 flex flex-col gap-1.5 min-w-0",
						children: [
							/* @__PURE__ */ H("div", {
								className: "text-[11px] font-semibold text-text-secondary uppercase tracking-[0.04em]",
								children: "Success rate"
							}),
							/* @__PURE__ */ U("div", {
								className: "text-[22px] font-bold font-mono",
								style: { color: Vd(d.successRatePct) },
								"data-testid": "stats-success-rate",
								children: [
									d.completedCount,
									"/",
									d.totalCount,
									" (",
									d.successRatePct,
									"%)"
								]
							}),
							/* @__PURE__ */ U("div", {
								className: "text-xs text-text-tertiary font-mono",
								children: [
									d.failedCount,
									" failed · ",
									d.cancelledCount,
									" cancelled"
								]
							})
						]
					}),
					/* @__PURE__ */ U("div", {
						className: "bg-surface border border-border rounded-lg p-4 flex flex-col gap-1.5 min-w-0",
						children: [
							/* @__PURE__ */ H("div", {
								className: "text-[11px] font-semibold text-text-secondary uppercase tracking-[0.04em]",
								children: "Median duration"
							}),
							/* @__PURE__ */ H("div", {
								className: "text-[22px] font-bold text-text-primary font-mono",
								children: ia(d.medianMs)
							}),
							/* @__PURE__ */ U("div", {
								className: "text-xs text-text-tertiary font-mono",
								children: ["p95 · ", ia(d.p95Ms)]
							})
						]
					}),
					/* @__PURE__ */ U("div", {
						className: "bg-surface border border-border rounded-lg p-4 flex flex-col gap-1.5 min-w-0",
						children: [
							/* @__PURE__ */ H("div", {
								className: "text-[11px] font-semibold text-text-secondary uppercase tracking-[0.04em]",
								children: "Total tokens"
							}),
							/* @__PURE__ */ U("div", {
								className: "text-[22px] font-bold text-text-primary font-mono",
								children: [
									d.tokensIn.toLocaleString(),
									" → ",
									d.tokensOut.toLocaleString()
								]
							}),
							/* @__PURE__ */ U("div", {
								className: "text-xs text-text-tertiary font-mono",
								children: [d.tokensPerRun.toLocaleString(), " avg per run"]
							})
						]
					}),
					/* @__PURE__ */ U("div", {
						className: "bg-surface border border-border rounded-lg p-4 flex flex-col gap-1.5 min-w-0",
						children: [
							/* @__PURE__ */ H("div", {
								className: "text-[11px] font-semibold text-text-secondary uppercase tracking-[0.04em]",
								children: "Total cost"
							}),
							/* @__PURE__ */ H("div", {
								className: "text-[22px] font-bold text-text-primary font-mono",
								children: Id(d.totalCost)
							}),
							/* @__PURE__ */ U("div", {
								className: "text-xs text-text-tertiary font-mono",
								children: [Id(d.costPerRun), " avg per run"]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ U("div", {
				className: "grid grid-cols-[repeat(auto-fit,minmax(360px,1fr))] gap-3",
				"data-testid": "stats-cost-row",
				children: [/* @__PURE__ */ U("div", {
					className: "bg-surface border border-border rounded-lg p-4 flex flex-col gap-2 min-w-0",
					"data-testid": "stats-cost-by-node",
					children: [/* @__PURE__ */ H("div", {
						className: "text-[13px] font-semibold text-text-primary",
						children: "Cost by node"
					}), f.length === 0 ? /* @__PURE__ */ H("div", {
						className: "text-xs text-text-tertiary py-2",
						children: "No per-node cost data in this range."
					}) : /* @__PURE__ */ H(b, {
						data: f.map((e) => ({
							label: e.label,
							cost: Number(e.totalCostUsd.toFixed(6))
						})),
						xKey: "label",
						yKey: "cost",
						height: 200,
						color: "#646cff",
						yFormat: Ld
					})]
				}), /* @__PURE__ */ U("div", {
					className: "bg-surface border border-border rounded-lg p-4 flex flex-col gap-2 min-w-0",
					"data-testid": "stats-cost-trend-30d",
					children: [/* @__PURE__ */ H("div", {
						className: "text-[13px] font-semibold text-text-primary",
						children: "30-day spend trend"
					}), /* @__PURE__ */ H(y, {
						series: m,
						height: 200,
						xFormat: (e) => new Date(Number(e)).toLocaleDateString(void 0, {
							month: "short",
							day: "numeric"
						}),
						yFormat: Ld
					})]
				})]
			}),
			/* @__PURE__ */ U("div", {
				className: "grid grid-cols-[repeat(auto-fit,minmax(360px,1fr))] gap-3",
				children: [
					/* @__PURE__ */ U("div", {
						className: "bg-surface border border-border rounded-lg p-4 flex flex-col gap-2 min-w-0",
						children: [/* @__PURE__ */ H("div", {
							className: "text-[13px] font-semibold text-text-primary",
							children: "Runs over time (cumulative)"
						}), /* @__PURE__ */ H(y, {
							series: Hd(l),
							height: 180,
							xFormat: (e) => new Date(Number(e)).toLocaleDateString()
						})]
					}),
					/* @__PURE__ */ U("div", {
						className: "bg-surface border border-border rounded-lg p-4 flex flex-col gap-2 min-w-0",
						children: [/* @__PURE__ */ H("div", {
							className: "text-[13px] font-semibold text-text-primary",
							children: "Duration over time"
						}), /* @__PURE__ */ H(y, {
							series: Ud(l, d.medianMs),
							height: 180,
							xFormat: (e) => new Date(Number(e)).toLocaleDateString(),
							yFormat: (e) => ia(e)
						})]
					}),
					/* @__PURE__ */ U("div", {
						className: "bg-surface border border-border rounded-lg p-4 flex flex-col gap-2 min-w-0",
						children: [/* @__PURE__ */ H("div", {
							className: "text-[13px] font-semibold text-text-primary",
							children: "Token usage over time"
						}), /* @__PURE__ */ H(y, {
							series: Wd(l),
							height: 180,
							xFormat: (e) => new Date(Number(e)).toLocaleDateString(),
							yFormat: (e) => e.toLocaleString()
						})]
					}),
					/* @__PURE__ */ U("div", {
						className: "bg-surface border border-border rounded-lg p-4 flex flex-col gap-2 min-w-0",
						"data-testid": "stats-failure-breakdown",
						children: [/* @__PURE__ */ H("div", {
							className: "text-[13px] font-semibold text-text-primary",
							children: "Failure breakdown (top 5)"
						}), d.failureBreakdown.length === 0 ? /* @__PURE__ */ H("div", {
							className: "text-xs text-text-tertiary py-2",
							children: "No failures in this range."
						}) : /* @__PURE__ */ U("table", {
							className: "w-full border-collapse text-xs",
							children: [/* @__PURE__ */ H("thead", { children: /* @__PURE__ */ H("tr", {
								className: "text-left",
								children: [
									"Error",
									"Count",
									"Last seen",
									"Example"
								].map((e) => /* @__PURE__ */ H("th", {
									className: "px-2 py-1.5 text-[10px] font-semibold text-text-secondary uppercase tracking-[0.04em] border-b border-border",
									children: e
								}, e))
							}) }), /* @__PURE__ */ H("tbody", { children: d.failureBreakdown.map((n) => /* @__PURE__ */ U("tr", {
								className: "border-b border-border",
								children: [
									/* @__PURE__ */ H("td", {
										className: "px-2 py-1.5 text-text-primary max-w-[240px] overflow-hidden text-ellipsis whitespace-nowrap",
										title: n.key,
										children: n.key
									}),
									/* @__PURE__ */ H("td", {
										className: "px-2 py-1.5 font-mono text-text-primary",
										children: n.count
									}),
									/* @__PURE__ */ H("td", {
										className: "px-2 py-1.5 text-text-secondary",
										children: zd(n.lastSeenAt)
									}),
									/* @__PURE__ */ H("td", {
										className: "px-2 py-1.5",
										children: /* @__PURE__ */ U("button", {
											type: "button",
											onClick: () => t(`/pipelines/${e}/runs/${n.exampleRunId}`),
											className: "bg-transparent border-none text-primary cursor-pointer text-xs font-mono p-0",
											children: [Rd(n.exampleRunId), " →"]
										})
									})
								]
							}, n.key)) })]
						})]
					})
				]
			})
		] }) : /* @__PURE__ */ H(w, {
			icon: "📊",
			title: "No runs yet",
			body: "No runs yet. Trigger this pipeline to see stats."
		})]
	});
}
//#endregion
//#region src/components/pipelines/PendingApprovalsPage.tsx
function Kd(e) {
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
function qd(e) {
	return e.length <= 6 ? e : e.slice(-6);
}
function Jd({ approver: e, idx: t }) {
	let n = e.type === "role" ? "🎖" : "👤";
	return /* @__PURE__ */ U("span", {
		className: "inline-flex items-center gap-1 bg-info-bg text-info-fg px-2 py-0.5 rounded-sm text-[11px] font-semibold leading-[1.4] whitespace-nowrap",
		children: [/* @__PURE__ */ H("span", {
			"aria-hidden": !0,
			children: n
		}), /* @__PURE__ */ H("span", { children: e.value })]
	}, `${e.type}:${e.value}:${t}`);
}
function Yd(e, t) {
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
function Xd({ row: e, onSubmit: t, onOpenPipeline: n }) {
	let [r, i] = B(""), a = I((e) => {
		t(e, r.trim()), i("");
	}, [r, t]), o = e.requiredCount ?? 1, s = e.recordedCount ?? 0, c = R(() => Yd(e.runContext, e.runSteps), [e.runContext, e.runSteps]);
	return /* @__PURE__ */ U("div", {
		"data-testid": `approval-card-${e.runId}`,
		className: "flex flex-col gap-3 p-4 bg-surface border border-border rounded-[10px]",
		children: [
			/* @__PURE__ */ U("div", {
				className: "flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ U("div", {
					className: "flex items-center gap-2.5 min-w-0",
					children: [/* @__PURE__ */ H("span", {
						className: "text-lg",
						"aria-hidden": !0,
						children: "✋"
					}), /* @__PURE__ */ U("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ H("button", {
							type: "button",
							onClick: n,
							"data-testid": `open-pipeline-${e.pipelineId}`,
							className: "text-sm font-semibold text-text-primary bg-transparent border-none p-0 cursor-pointer font-[inherit] text-left overflow-hidden text-ellipsis whitespace-nowrap max-w-full",
							title: e.pipelineName,
							children: e.pipelineName
						}), /* @__PURE__ */ U("div", {
							className: "font-mono text-[11px] text-text-tertiary",
							children: ["run #", qd(e.runId)]
						})]
					})]
				}), /* @__PURE__ */ H("span", {
					className: "text-xs text-text-tertiary whitespace-nowrap",
					children: Kd(e.requestedAt)
				})]
			}),
			e.message ? /* @__PURE__ */ H("div", {
				"data-testid": `approval-message-${e.runId}`,
				className: "text-[13px] text-text-secondary bg-surface-inset px-3 py-2 rounded-md leading-normal",
				children: e.message
			}) : null,
			/* @__PURE__ */ U("div", {
				className: "flex flex-col gap-1.5 px-3 py-2.5 bg-surface-inset rounded-md border border-border",
				children: [/* @__PURE__ */ H("div", {
					className: "text-[11px] font-semibold text-text-tertiary uppercase tracking-[0.5px]",
					children: c.length > 0 ? "Context" : "Run details"
				}), c.length > 0 ? c.map(({ label: e, value: t }) => /* @__PURE__ */ U("div", {
					className: "flex flex-col gap-0.5",
					children: [/* @__PURE__ */ H("div", {
						className: "text-[11px] font-medium text-text-secondary",
						children: e
					}), /* @__PURE__ */ H("pre", {
						className: "m-0 text-xs leading-normal text-text-primary whitespace-pre-wrap break-words font-[inherit] max-h-[120px] overflow-auto",
						children: t
					})]
				}, e)) : /* @__PURE__ */ U(V, { children: [
					/* @__PURE__ */ U("div", {
						className: "flex flex-col gap-0.5",
						children: [/* @__PURE__ */ H("div", {
							className: "text-[11px] font-medium text-text-secondary",
							children: "Run"
						}), /* @__PURE__ */ H("pre", {
							className: "m-0 text-xs leading-normal text-text-primary whitespace-pre-wrap break-words font-[inherit] max-h-[120px] overflow-auto",
							children: e.runId
						})]
					}),
					/* @__PURE__ */ U("div", {
						className: "flex flex-col gap-0.5",
						children: [/* @__PURE__ */ H("div", {
							className: "text-[11px] font-medium text-text-secondary",
							children: "Step"
						}), /* @__PURE__ */ H("pre", {
							className: "m-0 text-xs leading-normal text-text-primary whitespace-pre-wrap break-words font-[inherit] max-h-[120px] overflow-auto",
							children: e.stepId
						})]
					}),
					/* @__PURE__ */ U("div", {
						className: "flex flex-col gap-0.5",
						children: [/* @__PURE__ */ H("div", {
							className: "text-[11px] font-medium text-text-secondary",
							children: "Status"
						}), /* @__PURE__ */ H("pre", {
							className: "m-0 text-xs leading-normal text-text-primary whitespace-pre-wrap break-words font-[inherit] max-h-[120px] overflow-auto",
							children: "Awaiting your approval — upstream steps haven't produced reviewable output yet (or this approval node runs in parallel with them)."
						})]
					})
				] })]
			}),
			/* @__PURE__ */ U("div", {
				className: "flex flex-wrap gap-1.5 items-center",
				children: [
					/* @__PURE__ */ H("span", {
						className: "text-[11px] text-text-tertiary mr-1",
						children: "Approvers:"
					}),
					e.approvers.length === 0 ? /* @__PURE__ */ H("span", {
						className: "text-[11px] text-text-tertiary",
						children: "(anyone)"
					}) : e.approvers.map((e, t) => /* @__PURE__ */ H(Jd, {
						approver: e,
						idx: t
					}, t)),
					o > 1 ? /* @__PURE__ */ U("span", {
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
			/* @__PURE__ */ H(O, {
				"data-testid": `approval-comment-${e.runId}`,
				value: r,
				onChange: (e) => i(e.target.value),
				placeholder: "Optional comment…",
				rows: 2,
				className: "w-full",
				"aria-label": "Approval comment"
			}),
			/* @__PURE__ */ U("div", {
				className: "flex gap-2 justify-end",
				children: [/* @__PURE__ */ H("button", {
					"data-testid": `reject-${e.runId}`,
					onClick: () => a("reject"),
					className: "px-3.5 py-1.5 text-[13px] font-semibold bg-danger text-white border-none rounded-md font-[inherit] cursor-pointer",
					children: "Reject"
				}), /* @__PURE__ */ H("button", {
					"data-testid": `approve-${e.runId}`,
					onClick: () => a("approve"),
					className: "px-3.5 py-1.5 text-[13px] font-semibold bg-success text-white border-none rounded-md font-[inherit] cursor-pointer shrink-0",
					children: "Approve"
				})]
			})
		]
	});
}
function Zd() {
	let e = rt(), { approvals: t, isLoading: n, error: r, retry: i } = ge(), { resolveApproval: a, runs: o } = _e(), [s, c] = B(() => /* @__PURE__ */ new Set());
	L(() => {
		if (s.size === 0) return;
		let e = new Set(t.map((e) => `${e.runId}::${e.stepId}`)), n = !1, r = new Set(s);
		for (let t of s) e.has(t) || (r.delete(t), n = !0);
		n && c(r);
	}, [t, s]);
	let [l, u] = B({}), d = z(/* @__PURE__ */ new Set());
	L(() => {
		for (let e of t) d.current.has(e.runId) || (d.current.add(e.runId), ce(e.pipelineId, e.runId).then((t) => {
			t && u((n) => ({
				...n,
				[e.runId]: {
					context: t.context,
					steps: t.steps
				}
			}));
		}));
	}, [t]);
	let f = R(() => {
		let e = /* @__PURE__ */ new Map(), n = [];
		for (let r of t) {
			let t = `${r.runId}::${r.stepId}`;
			if (s.has(t)) continue;
			let i = e.get(r.pipelineId);
			i === void 0 && (i = le(r.pipelineId), e.set(r.pipelineId, i));
			let a = i?.name ?? (r.pipelineId ? `Pipeline ${r.pipelineId.slice(0, 8)}` : "Unknown pipeline"), c = l[r.runId]?.context ?? o[r.runId]?.context, u = l[r.runId]?.steps;
			n.push({
				...r,
				pipelineName: a,
				runContext: c,
				runSteps: u
			});
		}
		return n;
	}, [
		t,
		s,
		o,
		l
	]), p = I((t, n, r, i, o) => {
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
	}, [a, e]), m = f.length;
	return /* @__PURE__ */ U("div", {
		"data-testid": "pending-approvals-page",
		className: "flex flex-col h-full overflow-hidden bg-surface-inset font-[inherit]",
		children: [/* @__PURE__ */ H("div", {
			className: "h-14 shrink-0 flex items-center justify-between px-6 border-b border-border bg-surface sticky top-0 z-[2]",
			children: /* @__PURE__ */ U("div", {
				className: "flex items-center gap-2.5",
				children: [/* @__PURE__ */ H("div", {
					className: "text-lg font-bold text-text-primary",
					children: "Pending approvals"
				}), /* @__PURE__ */ H(x, {
					"data-testid": "pending-count",
					tone: m > 0 ? "warning" : "neutral",
					size: "sm",
					children: m
				})]
			})
		}), /* @__PURE__ */ U("div", {
			className: "flex-1 overflow-y-auto p-5",
			children: [r ? /* @__PURE__ */ U("div", {
				"data-testid": "approvals-error",
				role: "alert",
				className: "px-4 py-3 bg-danger-bg border border-danger text-danger-fg rounded-lg flex items-center justify-between gap-3 mb-4",
				children: [/* @__PURE__ */ H("span", {
					className: "text-[13px] font-medium",
					children: "Couldn't load pending approvals. Try again."
				}), /* @__PURE__ */ H("button", {
					"data-testid": "approvals-retry",
					onClick: i,
					className: "px-3.5 py-1.5 text-[13px] font-medium bg-white text-danger-fg border border-danger rounded-md cursor-pointer font-[inherit]",
					children: "Retry"
				})]
			}) : null, n && m === 0 ? /* @__PURE__ */ U("div", {
				"data-testid": "approvals-loading",
				className: "flex flex-col gap-3 max-w-[680px] mx-auto",
				children: [
					/* @__PURE__ */ H(T, { height: 140 }),
					/* @__PURE__ */ H(T, { height: 140 }),
					/* @__PURE__ */ H(T, { height: 140 })
				]
			}) : m === 0 && !r ? /* @__PURE__ */ H(w, {
				icon: "✋",
				title: "No pending approvals",
				body: "When a pipeline reaches an approval step, it'll show up here.",
				testId: "approvals-empty"
			}) : /* @__PURE__ */ H("div", {
				"data-testid": "approvals-list",
				className: "flex flex-col gap-3 max-w-[680px] mx-auto",
				children: f.map((t) => /* @__PURE__ */ H(Xd, {
					row: t,
					onOpenPipeline: () => e(`/pipelines/${t.pipelineId}`),
					onSubmit: (e, n) => p(t.pipelineId, t.runId, t.stepId, e, n)
				}, `${t.runId}:${t.stepId}`))
			})]
		})]
	});
}
//#endregion
//#region src/components/pipelines/vision/VisionRunCard.tsx
function Qd({ status: e, result: t, runId: n, endpointLabel: i, error: a, latencyMs: o, onOpen: s, className: c }) {
	let l = i ?? t?.model?.endpointId ?? "vision-model", u = o ?? t?.model?.latencyMs, d = t?.caption, f = (t?.tags ?? []).slice(0, 5), p = /* @__PURE__ */ U(V, { children: [
		/* @__PURE__ */ U("header", {
			className: "flex flex-wrap items-center gap-2",
			children: [
				/* @__PURE__ */ H("span", {
					className: "font-mono text-[11px] font-semibold uppercase tracking-wide text-text-secondary",
					children: l
				}),
				e === "running" ? /* @__PURE__ */ U(x, {
					tone: "info",
					size: "sm",
					children: [/* @__PURE__ */ H("span", { className: "inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-primary" }), " running"]
				}) : e === "completed" ? /* @__PURE__ */ H(x, {
					tone: "success",
					size: "sm",
					children: "ok"
				}) : /* @__PURE__ */ H(x, {
					tone: "danger",
					size: "sm",
					children: "failed"
				}),
				typeof u == "number" ? /* @__PURE__ */ U("span", {
					className: "font-mono text-[11px] text-text-tertiary",
					children: [u.toFixed(0), "ms"]
				}) : null,
				n ? /* @__PURE__ */ H("span", {
					className: "ml-auto truncate font-mono text-[10px] text-text-tertiary",
					children: n
				}) : null
			]
		}),
		e === "failed" && a ? /* @__PURE__ */ H("p", {
			className: "text-[13px] text-danger-fg",
			children: a
		}) : /* @__PURE__ */ H("p", {
			className: "line-clamp-2 text-left text-[13px] text-text-primary",
			children: d ?? (e === "running" ? "Analyzing image…" : "No caption produced.")
		}),
		f.length > 0 ? /* @__PURE__ */ H("div", {
			className: "flex flex-wrap gap-1",
			children: f.map((e) => /* @__PURE__ */ U(x, {
				tone: "neutral",
				size: "sm",
				children: ["#", e]
			}, e))
		}) : null
	] }), m = r("flex w-full flex-col gap-1.5 rounded-lg border bg-surface p-3 text-sm text-left", e === "running" ? "border-primary-border ring-1 ring-primary" : e === "failed" ? "border-danger-border" : "border-border");
	if (s) {
		let t = d ? d.slice(0, 60) : "no caption";
		return /* @__PURE__ */ H("button", {
			type: "button",
			onClick: s,
			"aria-label": `Open vision result: ${l}, ${e}, ${t}`,
			className: r(m, "cursor-pointer transition-colors hover:bg-surface-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1", c),
			children: p
		});
	}
	return /* @__PURE__ */ H("article", {
		className: r(m, c),
		children: p
	});
}
//#endregion
//#region src/components/pipelines/vision/useVisionResults.ts
function $d(e = {}) {
	let { maxRecords: t = 50, runId: n } = e, [r, i] = B([]), a = z(!0);
	return L(() => (a.current = !0, () => {
		a.current = !1;
	}), []), k("*", (e) => {
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
	}), R(() => r, [r]);
}
//#endregion
//#region src/components/pipelines/judge/VerdictPanel.tsx
function ef(e) {
	return e === "pass" ? "success" : e === "fail" ? "danger" : "warning";
}
function tf({ result: e, className: t }) {
	let n = ef(e.overallVerdict), i = n === "success" ? "PASS" : n === "danger" ? "FAIL" : "INCONCLUSIVE", a = e.rubricSnapshot.passThreshold ?? .5;
	return /* @__PURE__ */ U("section", {
		className: r("flex flex-col gap-2 rounded-lg border border-border bg-surface p-3", t),
		children: [/* @__PURE__ */ U("div", {
			className: "flex flex-wrap items-center gap-2",
			children: [
				/* @__PURE__ */ U("span", {
					className: "font-mono text-[11px] font-semibold uppercase tracking-wide text-text-secondary",
					children: [
						e.rubricSnapshot.id,
						" v",
						e.rubricSnapshot.version
					]
				}),
				/* @__PURE__ */ U(x, {
					tone: n,
					size: "sm",
					children: [
						i,
						" · ",
						e.overallVerdict
					]
				}),
				/* @__PURE__ */ H("span", {
					className: "text-[11px] text-text-tertiary",
					children: "·"
				}),
				/* @__PURE__ */ H("span", {
					className: "font-mono text-[11px] text-text-tertiary",
					children: e.model
				}),
				/* @__PURE__ */ H("span", {
					className: "text-[11px] text-text-tertiary",
					children: "·"
				}),
				/* @__PURE__ */ U("span", {
					className: "font-mono text-[11px] text-text-tertiary",
					children: ["mode: ", e.mode]
				}),
				typeof e.confidence == "number" ? /* @__PURE__ */ U("span", {
					className: "ml-auto font-mono text-[11px] text-text-tertiary",
					children: [
						"confidence ",
						(e.confidence * 100).toFixed(0),
						"%"
					]
				}) : null
			]
		}), /* @__PURE__ */ U("div", {
			className: "flex items-center gap-3",
			children: [/* @__PURE__ */ H("span", {
				className: "text-[11px] font-medium uppercase text-text-tertiary",
				children: "overall"
			}), /* @__PURE__ */ H(l, {
				value: e.overallScore,
				threshold: a,
				tone: n === "warning" ? "warning" : n,
				size: "lg",
				ariaLabel: `Overall judge score ${(e.overallScore * 100).toFixed(0)}% — ${i}`
			})]
		})]
	});
}
//#endregion
//#region src/components/pipelines/judge/CriteriaPanel.tsx
function nf({ result: e, className: t }) {
	if (!e.criteria || e.criteria.length === 0) return null;
	let n = /* @__PURE__ */ new Map();
	for (let t of e.rubricSnapshot.criteria) n.set(t.id, t);
	return /* @__PURE__ */ U("section", {
		className: r("flex flex-col gap-1.5", t),
		children: [/* @__PURE__ */ U("h4", {
			className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary",
			children: [
				"Criteria (",
				e.criteria.length,
				")"
			]
		}), /* @__PURE__ */ H("ul", {
			className: "flex flex-col gap-1.5",
			children: e.criteria.map((e) => /* @__PURE__ */ H(rf, {
				score: e,
				def: n.get(e.criterionId)
			}, e.criterionId))
		})]
	});
}
function rf({ score: e, def: t }) {
	let n = e.passed ? "success" : "danger", r = e.passed ? "PASS" : "FAIL", i = t?.scale ?? "0-1";
	return /* @__PURE__ */ U("li", {
		className: "flex flex-col gap-1.5 rounded-lg border border-border bg-surface p-2.5",
		children: [
			/* @__PURE__ */ U("div", {
				className: "flex flex-wrap items-center gap-1.5",
				children: [
					/* @__PURE__ */ H("span", {
						className: "font-mono text-[11px] font-semibold text-text-primary",
						children: e.criterionId
					}),
					/* @__PURE__ */ U("span", {
						className: "font-mono text-[10px] uppercase text-text-tertiary",
						children: [
							"[",
							i,
							"]"
						]
					}),
					/* @__PURE__ */ H(x, {
						tone: n,
						size: "sm",
						children: r
					}),
					/* @__PURE__ */ U("span", {
						className: "ml-auto font-mono text-[11px] text-text-tertiary",
						children: ["raw: ", String(e.rawScore)]
					})
				]
			}),
			/* @__PURE__ */ H(l, {
				value: e.score,
				threshold: t?.failThreshold ?? .5,
				tone: n,
				size: "sm",
				ariaLabel: `Criterion ${e.criterionId} score ${(e.score * 100).toFixed(0)}% — ${r}`
			}),
			t?.prompt ? /* @__PURE__ */ U("p", {
				className: "text-[12px] italic leading-snug text-text-tertiary",
				children: [
					"“",
					t.prompt,
					"”"
				]
			}) : null,
			e.rationale ? /* @__PURE__ */ H("p", {
				className: "text-[13px] leading-snug text-text-primary",
				children: e.rationale
			}) : null
		]
	});
}
//#endregion
//#region src/components/pipelines/judge/JudgmentApiContext.tsx
var af = Qe(null);
function of({ value: e, children: t }) {
	return /* @__PURE__ */ H(af.Provider, {
		value: e,
		children: t
	});
}
function sf() {
	return et(af);
}
//#endregion
//#region src/components/pipelines/judge/JudgmentResultViewer.tsx
function cf({ result: e, showVerdict: t = !0, showCriteria: n = !0, showMetadata: i = !0, showRawText: a = !1, className: o }) {
	let s = sf(), [c, l] = B(!1), [u, d] = B(null), [f, p] = B(!1), [m, h] = B(null), g = z(!0), _ = z(null);
	L(() => (g.current = !0, () => {
		g.current = !1;
	}), []), L(() => {
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
	return /* @__PURE__ */ U("div", {
		className: r("flex w-full flex-col gap-3 text-text-primary", o),
		children: [
			t ? /* @__PURE__ */ H(tf, { result: e }) : null,
			n ? /* @__PURE__ */ H(nf, { result: e }) : null,
			i ? /* @__PURE__ */ U("section", {
				className: "flex flex-wrap items-center gap-2 text-[11px] text-text-tertiary",
				children: [
					/* @__PURE__ */ U("span", { children: [
						"tokens ",
						/* @__PURE__ */ H("span", {
							className: "font-mono",
							children: e.tokensIn
						}),
						" in /",
						" ",
						/* @__PURE__ */ H("span", {
							className: "font-mono",
							children: e.tokensOut
						}),
						" out"
					] }),
					e.cacheReadTokens && e.cacheReadTokens > 0 ? /* @__PURE__ */ U(V, { children: [/* @__PURE__ */ H("span", { children: "·" }), /* @__PURE__ */ U("span", { children: [
						"cache ",
						/* @__PURE__ */ H("span", {
							className: "font-mono",
							children: e.cacheReadTokens
						}),
						" read"
					] })] }) : null,
					/* @__PURE__ */ H("span", { children: "·" }),
					/* @__PURE__ */ U("span", { children: [
						"latency ",
						/* @__PURE__ */ H("span", {
							className: "font-mono",
							children: e.latencyMs
						}),
						"ms"
					] }),
					/* @__PURE__ */ H("span", { children: "·" }),
					/* @__PURE__ */ U("span", { children: ["cost ", /* @__PURE__ */ U("span", {
						className: "font-mono",
						children: ["$", e.costUsd.toFixed(4)]
					})] }),
					/* @__PURE__ */ H("span", {
						className: "ml-auto font-mono",
						children: e.judgedAt
					})
				]
			}) : null,
			a && y ? /* @__PURE__ */ U("section", {
				className: "flex flex-col gap-1.5",
				children: [/* @__PURE__ */ U("button", {
					type: "button",
					onClick: () => l((e) => !e),
					className: "self-start text-[11px] font-medium text-text-tertiary hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 rounded",
					"aria-expanded": c,
					children: [c ? "▾" : "▸", " Raw model output"]
				}), c ? /* @__PURE__ */ H(lf, {
					text: v,
					loading: f,
					error: m,
					fallbackHint: e.rawTextTruncated && !s ? "Raw text was spilled to S3 but no JudgmentApi provider is wired." : null
				}) : null]
			}) : null
		]
	});
}
function lf({ text: e, loading: t, error: n, fallbackHint: r }) {
	return t ? /* @__PURE__ */ H("div", {
		className: "rounded-lg border border-border bg-surface-panel p-2 text-[11px] text-text-tertiary",
		children: "Loading raw text…"
	}) : n ? /* @__PURE__ */ U("div", {
		className: "rounded-lg border border-state-failed bg-danger-bg p-2 text-[11px] text-text-primary",
		children: ["Failed to fetch raw text: ", n.message]
	}) : e === null || e.length === 0 ? /* @__PURE__ */ H("div", {
		className: "rounded-lg border border-border bg-surface-panel p-2 text-[11px] text-text-tertiary",
		children: r ?? "Raw text not available."
	}) : /* @__PURE__ */ H("pre", {
		className: "overflow-x-auto rounded-lg border border-border bg-surface-panel p-2 font-mono text-[11px] leading-snug text-text-secondary",
		children: e
	});
}
//#endregion
//#region src/components/pipelines/judge/AggregateSummaryCard.tsx
function uf({ aggregate: e, className: t }) {
	let n = e.numJudgments > 0 ? e.numPassed / e.numJudgments : 0, i = e.numJudgments > 0 ? e.sumOverallScore / e.numJudgments : 0, a = n >= .9 ? "success" : n >= .6 ? "warning" : "danger", o = a === "success" ? "HEALTHY" : a === "warning" ? "MIXED" : "FAILING";
	return /* @__PURE__ */ U("section", {
		className: r("flex flex-col gap-2 rounded-lg border border-border bg-surface p-3", t),
		children: [
			/* @__PURE__ */ U("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [
					/* @__PURE__ */ H("span", {
						className: "font-mono text-[11px] font-semibold uppercase tracking-wide text-text-secondary",
						children: e.dayBucket
					}),
					/* @__PURE__ */ U(x, {
						tone: a,
						size: "sm",
						children: [
							o,
							" · ",
							(n * 100).toFixed(0),
							"% pass"
						]
					}),
					/* @__PURE__ */ U("span", {
						className: "ml-auto font-mono text-[11px] text-text-tertiary",
						children: [e.numJudgments, " judgments"]
					})
				]
			}),
			/* @__PURE__ */ U("div", {
				className: "flex items-center gap-3",
				children: [/* @__PURE__ */ H("span", {
					className: "text-[11px] font-medium uppercase text-text-tertiary",
					children: "mean score"
				}), /* @__PURE__ */ H(l, {
					value: i,
					tone: a === "warning" ? "warning" : a,
					size: "md",
					ariaLabel: `Mean score ${(i * 100).toFixed(0)}% across ${e.numJudgments} judgments`
				})]
			}),
			/* @__PURE__ */ U("div", {
				className: "flex flex-wrap items-center gap-2 text-[11px] text-text-tertiary",
				children: [
					/* @__PURE__ */ U("span", { children: [
						"tokens ",
						/* @__PURE__ */ H("span", {
							className: "font-mono",
							children: e.sumTokensIn
						}),
						" in /",
						" ",
						/* @__PURE__ */ H("span", {
							className: "font-mono",
							children: e.sumTokensOut
						}),
						" out"
					] }),
					/* @__PURE__ */ H("span", { children: "·" }),
					/* @__PURE__ */ U("span", { children: ["cost ", /* @__PURE__ */ U("span", {
						className: "font-mono",
						children: ["$", e.sumCostUsd.toFixed(4)]
					})] }),
					typeof e.minOverallScore == "number" && typeof e.maxOverallScore == "number" ? /* @__PURE__ */ U(V, { children: [/* @__PURE__ */ H("span", { children: "·" }), /* @__PURE__ */ U("span", { children: [
						"range ",
						/* @__PURE__ */ H("span", {
							className: "font-mono",
							children: e.minOverallScore.toFixed(2)
						}),
						"–",
						/* @__PURE__ */ H("span", {
							className: "font-mono",
							children: e.maxOverallScore.toFixed(2)
						})
					] })] }) : null,
					/* @__PURE__ */ H("span", { children: "·" }),
					/* @__PURE__ */ U("span", {
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
function df({ aggregates: e, sortOrder: t = "desc", caption: n, loading: i = !1, className: o }) {
	let s = R(() => {
		let n = e.slice();
		return n.sort((e, t) => e.dayBucket.localeCompare(t.dayBucket)), t === "desc" && n.reverse(), n;
	}, [e, t]), c = R(() => e.slice().sort((e, t) => e.dayBucket.localeCompare(t.dayBucket)).map((e) => e.numJudgments > 0 ? e.numPassed / e.numJudgments : 0), [e]);
	if (e.length === 0) return /* @__PURE__ */ H("section", {
		className: r("flex min-h-[120px] w-full flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-border bg-surface-panel p-4 text-text-tertiary", o),
		children: /* @__PURE__ */ H("span", {
			className: "text-[12px]",
			children: i ? "Loading trends…" : "No judgment activity in range."
		})
	});
	let l = e.reduce((e, t) => e + t.numJudgments, 0), u = e.reduce((e, t) => e + t.numPassed, 0), d = e.reduce((e, t) => e + t.sumCostUsd, 0), f = l > 0 ? u / l : 0;
	return /* @__PURE__ */ U("section", {
		className: r("flex w-full flex-col gap-2", o),
		children: [
			/* @__PURE__ */ U("header", {
				className: "flex flex-wrap items-center gap-2",
				children: [
					/* @__PURE__ */ H("span", {
						className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary",
						children: n ?? `Judgment trend — ${e.length} days`
					}),
					/* @__PURE__ */ U(x, {
						tone: f >= .9 ? "success" : f >= .6 ? "warning" : "danger",
						size: "sm",
						children: [
							(f * 100).toFixed(0),
							"% pass · ",
							l,
							" judgments"
						]
					}),
					/* @__PURE__ */ U("span", {
						className: "ml-auto font-mono text-[11px] text-text-tertiary",
						children: ["total cost $", d.toFixed(4)]
					})
				]
			}),
			/* @__PURE__ */ U("div", {
				className: "flex items-center gap-3",
				children: [/* @__PURE__ */ H("span", {
					className: "text-[11px] font-medium uppercase text-text-tertiary",
					children: "pass-rate"
				}), /* @__PURE__ */ H(a, {
					points: c,
					yMin: 0,
					yMax: 1,
					width: 240,
					height: 36,
					ariaLabel: `Pass-rate over ${c.length} days, ending at ${(c[c.length - 1] * 100).toFixed(0)}%`
				})]
			}),
			/* @__PURE__ */ U("table", {
				className: "w-full border-collapse text-[12px]",
				children: [/* @__PURE__ */ H("thead", { children: /* @__PURE__ */ U("tr", {
					className: "text-left text-[11px] uppercase tracking-wide text-text-tertiary",
					children: [
						/* @__PURE__ */ H("th", {
							scope: "col",
							className: "py-1 pr-2",
							children: "date"
						}),
						/* @__PURE__ */ H("th", {
							scope: "col",
							className: "py-1 pr-2",
							children: "pass"
						}),
						/* @__PURE__ */ H("th", {
							scope: "col",
							className: "py-1 pr-2",
							children: "mean"
						}),
						/* @__PURE__ */ H("th", {
							scope: "col",
							className: "py-1 pr-2 text-right",
							children: "judgments"
						}),
						/* @__PURE__ */ H("th", {
							scope: "col",
							className: "py-1 pl-2 text-right",
							children: "cost"
						})
					]
				}) }), /* @__PURE__ */ H("tbody", { children: s.map((e) => /* @__PURE__ */ H(ff, { row: e }, e.aggregateKey)) })]
			})
		]
	});
}
function ff({ row: e }) {
	let t = e.numJudgments > 0 ? e.numPassed / e.numJudgments : 0, n = e.numJudgments > 0 ? e.sumOverallScore / e.numJudgments : 0, r = t >= .9 ? "success" : t >= .6 ? "warning" : "danger";
	return /* @__PURE__ */ U("tr", {
		className: "border-t border-border",
		children: [
			/* @__PURE__ */ H("td", {
				className: "py-1 pr-2 font-mono",
				children: e.dayBucket
			}),
			/* @__PURE__ */ H("td", {
				className: "py-1 pr-2",
				children: /* @__PURE__ */ U(x, {
					tone: r,
					size: "sm",
					children: [(t * 100).toFixed(0), "%"]
				})
			}),
			/* @__PURE__ */ U("td", {
				className: "py-1 pr-2 font-mono",
				children: [(n * 100).toFixed(0), "%"]
			}),
			/* @__PURE__ */ H("td", {
				className: "py-1 pr-2 text-right font-mono",
				children: e.numJudgments
			}),
			/* @__PURE__ */ U("td", {
				className: "py-1 pl-2 text-right font-mono",
				children: ["$", e.sumCostUsd.toFixed(4)]
			})
		]
	});
}
//#endregion
//#region src/components/pipelines/judge/useJudgmentResults.ts
function pf(e) {
	if (typeof e == "number") return e;
	if (typeof e == "string") {
		let t = Date.parse(e);
		if (Number.isFinite(t)) return t;
	}
	return Date.now();
}
function mf(e = {}) {
	let { maxRecords: t = 50, runId: n } = e, [r, i] = B([]), a = z(!0);
	return L(() => (a.current = !0, () => {
		a.current = !1;
	}), []), k("*", (e) => {
		if (!a.current) return;
		let r = e;
		if (!r || typeof r.eventType != "string") return;
		let o = r.eventType;
		if (!o.startsWith("pipeline.judge.")) return;
		let s = r.payload;
		if (!s || typeof s.runId != "string" || typeof s.stepId != "string" || n && s.runId !== n) return;
		let c = `${s.runId}::${s.stepId}`;
		i((e) => {
			let n = e.findIndex((e) => `${e.runId}::${e.stepId}` === c), r = n === -1 ? void 0 : n, i = pf(s.at), a = (n) => {
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
	}), R(() => r, [r]);
}
//#endregion
//#region src/components/pipelines/judge/useJudgmentAggregates.ts
function hf(e) {
	let t = sf(), [n, r] = B([]), [i, a] = B(!1), [o, s] = B(null), c = z(!0), l = z(() => {}), { pipelineId: u, rubricId: d, since: f, until: p, limit: m, refreshIntervalMs: h = 0, paused: g = !1 } = e, _ = `${u ?? ""}|${d ?? ""}|${f ?? ""}|${p ?? ""}|${m ?? ""}|${g ? "1" : "0"}`;
	return L(() => (c.current = !0, () => {
		c.current = !1;
	}), []), L(() => {
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
var gf = 100, _f = 500, vf = 148, yf = 116;
function bf(e) {
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
function xf(e, t) {
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
function Sf({ src: e, alt: t, testId: n }) {
	let r = z(null), [i, a] = B(!1);
	return L(() => {
		if (!r.current) return;
		if (typeof IntersectionObserver > "u") {
			a(!0);
			return;
		}
		let e = r.current, t = new IntersectionObserver(([e]) => {
			e.isIntersecting && (a(!0), t.disconnect());
		}, { rootMargin: "200px" });
		return t.observe(e), () => t.disconnect();
	}, []), /* @__PURE__ */ H("div", {
		ref: r,
		className: "w-full h-full flex items-center justify-center bg-surface-inset",
		children: i ? /* @__PURE__ */ H("img", {
			src: e,
			alt: t,
			className: "w-full h-full object-cover",
			loading: "lazy",
			"data-testid": n
		}) : /* @__PURE__ */ H("div", {
			"aria-hidden": "true",
			className: "w-full h-full animate-pulse bg-surface-inset",
			"data-testid": n ? `${n}-placeholder` : void 0
		})
	});
}
function Cf({ data: e }) {
	let { entry: t, highlighted: n, selected: i, onSelect: a, getImageUrl: o } = e, s = t.width && t.height ? `${t.width}×${t.height}` : "", c = t.producedByNodeKind;
	return /* @__PURE__ */ U(V, { children: [
		/* @__PURE__ */ H(W, {
			type: "target",
			position: G.Left,
			id: "in",
			className: "w-2 h-2 bg-border-emphasis"
		}),
		/* @__PURE__ */ U("button", {
			type: "button",
			onClick: () => a(t.imageId),
			className: r("w-full h-full flex flex-col overflow-hidden rounded-lg border bg-surface text-left", "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary", i ? "border-primary ring-2 ring-primary/30" : n ? "border-primary/60 bg-primary/5" : "border-border"),
			"aria-label": `Image artifact ${t.imageId.slice(0, 8)} produced by ${c}`,
			"data-testid": `lineage-node-${t.imageId}`,
			children: [/* @__PURE__ */ H("div", {
				className: "flex-1 min-h-0 overflow-hidden bg-surface-inset flex items-center justify-center",
				children: /* @__PURE__ */ H(Sf, {
					src: o(t.imageId),
					alt: `Artifact ${t.imageId.slice(0, 8)}`,
					testId: `lineage-thumb-${t.imageId}`
				})
			}), /* @__PURE__ */ U("div", {
				className: "px-1.5 py-1 flex flex-col gap-0.5 flex-shrink-0",
				children: [/* @__PURE__ */ H("span", {
					className: r("inline-block text-[9px] font-mono px-1 rounded", "bg-surface-inset text-text-secondary truncate max-w-full"),
					title: c,
					children: c
				}), s && /* @__PURE__ */ H("span", {
					className: "text-[9px] text-text-tertiary font-mono",
					children: s
				})]
			})]
		}),
		/* @__PURE__ */ H(W, {
			type: "source",
			position: G.Right,
			id: "out",
			className: "w-2 h-2 bg-border-emphasis"
		})
	] });
}
var wf = { lineageNode: Cf };
function Tf() {
	return /* @__PURE__ */ H("div", {
		className: "flex items-center justify-center h-full text-text-tertiary text-sm",
		"data-testid": "lineage-graph-empty",
		children: "No image artifacts produced by this run."
	});
}
function Ef(e, t) {
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
function Df(e) {
	return e.length > 10 ? `${e.slice(0, 8)}…` : e;
}
function Of({ navEntries: e, imageId: t, onClose: n, onNavigate: i, getImageUrl: a }) {
	let o = e.find((e) => e.imageId === t), [s, c] = B(!1), l = z(null);
	L(() => () => {
		l.current && clearTimeout(l.current);
	}, []), L(() => {
		c(!1);
	}, [t]), L(() => {
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
	let u = I(() => {
		typeof navigator < "u" && navigator.clipboard?.writeText && navigator.clipboard.writeText(t).then(() => {
			c(!0), l.current && clearTimeout(l.current), l.current = setTimeout(() => c(!1), 1200);
		}, () => {});
	}, [t]);
	if (!o) return null;
	let d = o.width && o.height ? `${o.width}×${o.height}` : null;
	return /* @__PURE__ */ H(S, {
		open: !0,
		onClose: n,
		title: `Artifact ${Df(o.imageId)}`,
		maxWidth: 760,
		rawChildren: !0,
		backdropTestId: "lineage-preview-backdrop",
		footer: /* @__PURE__ */ H(m, {
			variant: "secondary",
			size: "sm",
			onClick: n,
			"data-testid": "lineage-preview-close",
			children: "Close"
		}),
		children: /* @__PURE__ */ U("div", {
			className: "flex flex-col gap-3",
			"data-testid": "lineage-preview-modal",
			children: [/* @__PURE__ */ H("div", {
				className: r("flex items-center justify-center bg-surface-inset rounded-md overflow-hidden", "max-h-[70vh] min-h-[200px]"),
				children: /* @__PURE__ */ H("img", {
					src: a(o.imageId),
					alt: `Artifact ${o.imageId}`,
					className: "max-w-full max-h-[70vh] object-contain",
					"data-testid": `lineage-preview-image-${o.imageId}`
				})
			}), /* @__PURE__ */ U("div", {
				className: "flex flex-wrap items-center gap-2 pt-1",
				"data-testid": "lineage-preview-meta",
				children: [
					/* @__PURE__ */ U(x, {
						tone: "neutral",
						size: "sm",
						mono: !0,
						title: o.imageId,
						children: ["id: ", Df(o.imageId)]
					}),
					/* @__PURE__ */ H(g, {
						"aria-label": s ? "Image id copied" : "Copy image id",
						size: "sm",
						variant: "ghost",
						onClick: u,
						"data-testid": "lineage-preview-copy",
						children: s ? "✓" : "⧉"
					}),
					o.mimeType && /* @__PURE__ */ H(x, {
						tone: "info",
						size: "sm",
						children: o.mimeType
					}),
					d && /* @__PURE__ */ H(x, {
						tone: "neutral",
						size: "sm",
						mono: !0,
						children: d
					}),
					/* @__PURE__ */ U(x, {
						tone: "purple",
						size: "sm",
						mono: !0,
						title: o.producedByStepId,
						children: ["step: ", Df(o.producedByStepId)]
					})
				]
			})]
		})
	});
}
function kf({ entries: e, selectedImageId: t, onSelect: n, maxRenderedNodes: i = gf }) {
	let a = Fe(), [o, s] = B(!1), [c, l] = B(!1), [u, d] = B(null), f = e.length, p = !o && f > i, m = R(() => p ? Ef(e, i) : e, [
		e,
		p,
		i
	]), h = R(() => t ? xf(t, m) : /* @__PURE__ */ new Set(), [t, m]), g = R(() => bf(m), [m]), _ = I((e) => {
		n?.(e), d(e);
	}, [n]), y = R(() => m.map((e) => {
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
				width: vf,
				height: yf
			}
		};
	}), [
		m,
		t,
		h,
		_,
		a
	]), b = R(() => new Set(m.map((e) => e.imageId)), [m]), x = R(() => m.filter((e) => e.parentImageId && b.has(e.parentImageId)).map((e) => ({
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
	]), [S, , w] = gt(y), [T, , E] = mt(x), D = I((e, t) => {
		_(t.id);
	}, [_]), O = I(() => {
		f > _f ? l(!0) : s(!0);
	}, [f]), k = I(() => {
		s(!0), l(!1);
	}, []), A = I(() => {
		l(!1);
	}, []), ee = R(() => {
		let e = m.slice();
		return e.sort((e, t) => {
			let n = Date.parse(e.at), r = Date.parse(t.at);
			return n === r ? e.imageId.localeCompare(t.imageId) : n - r;
		}), e;
	}, [m]), j = I(() => d(null), []), te = I((e) => d(e), []);
	return f === 0 ? /* @__PURE__ */ H(Tf, {}) : /* @__PURE__ */ U("div", {
		className: "relative w-full h-full flex flex-col",
		"data-testid": "lineage-graph",
		children: [
			p && /* @__PURE__ */ H("div", {
				className: "p-2 flex-shrink-0",
				children: /* @__PURE__ */ U(v, {
					variant: "info",
					"data-testid": "lineage-graph-clip-banner",
					children: [/* @__PURE__ */ U("span", {
						className: "flex-1",
						children: [
							"Showing ",
							m.length,
							" of ",
							f,
							" artifacts"
						]
					}), /* @__PURE__ */ H("button", {
						type: "button",
						onClick: O,
						"data-testid": "lineage-graph-show-all",
						className: r("ml-2 px-2 py-1 text-[12px] font-medium rounded", "border border-current bg-transparent cursor-pointer", "hover:bg-current/10"),
						children: "Show all"
					})]
				})
			}),
			/* @__PURE__ */ U("div", {
				className: "flex-1 min-h-0 relative",
				children: [/* @__PURE__ */ H("style", { children: ".react-flow__node { position: absolute; }" }), /* @__PURE__ */ U(dt, {
					nodes: S,
					edges: T,
					onNodesChange: w,
					onEdgesChange: E,
					onNodeClick: D,
					nodeTypes: wf,
					fitView: !0,
					fitViewOptions: { padding: .2 },
					minZoom: .3,
					maxZoom: 2,
					onlyRenderVisibleElements: !0,
					proOptions: { hideAttribution: !0 },
					children: [/* @__PURE__ */ H(ot, {
						gap: 16,
						size: 1,
						className: "bg-surface-inset"
					}), /* @__PURE__ */ H(ct, {
						showInteractive: !1,
						className: "bg-surface border border-border rounded"
					})]
				})]
			}),
			/* @__PURE__ */ H(C, {
				open: c,
				onConfirm: k,
				onCancel: A,
				title: "Show all artifacts?",
				body: `Rendering all ${f} artifacts may slow down the lineage tab. Continue?`,
				confirmLabel: "Show all",
				tone: "caution"
			}),
			u && /* @__PURE__ */ H(Of, {
				navEntries: ee,
				imageId: u,
				onClose: j,
				onNavigate: te,
				getImageUrl: a
			})
		]
	});
}
//#endregion
//#region src/components/pipelines/lineage/useImageLineage.ts
var Af = /* @__PURE__ */ new Map(), jf = 6e4;
function Mf(e) {
	let t = Af.get(e);
	return t ? Date.now() - t.fetchedAt > jf ? (Af.delete(e), null) : t.entries : null;
}
function Nf(e, t) {
	Af.set(e, {
		entries: t,
		fetchedAt: Date.now()
	});
}
function Pf() {
	Af.clear();
}
function Ff(e, t) {
	let [n, r] = B(() => e ? Mf(e) ?? [] : []), [i, a] = B(!1), [o, s] = B(null), c = z(0), l = I(() => {
		if (!e || !t) return;
		let n = Mf(e);
		if (n) {
			r(n), a(!1), s(null);
			return;
		}
		let i = ++c.current;
		a(!0), s(null);
		let o = `/api/pipeline/runs/${encodeURIComponent(e)}/image-lineage?pipelineId=${encodeURIComponent(t)}`;
		fetch(o, {
			headers: { "Content-Type": "application/json" },
			credentials: "include"
		}).then(async (t) => {
			if (i !== c.current) return;
			if (!t.ok) {
				let e = `image-lineage: ${t.status} ${t.statusText}`;
				s(e), a(!1);
				return;
			}
			let n = await t.json();
			if (i !== c.current) return;
			let o = Array.isArray(n.entries) ? n.entries : [];
			Nf(e, o), r(o), a(!1);
		}).catch((e) => {
			i === c.current && (s(e instanceof Error ? e.message : String(e)), a(!1));
		});
	}, [e, t]), u = I(() => {
		e && Af.delete(e), l();
	}, [e, l]);
	return L(() => {
		l();
	}, [l]), {
		entries: n,
		loading: i,
		error: o,
		refetch: u
	};
}
//#endregion
export { Bt as ActionNode, rs as AdjustBwConfig, yn as AdjustBwNode, xs as AdjustLayerConfig, xn as AdjustLayerNode, en as AgUiOutputNode, qt as AgentNode, uf as AggregateSummaryCard, jd as AllRunsPage, Wn as AnimatedEdge, Kt as ApprovalNode, K as BaseNode, sc as CaptionPanel, Rt as ConditionNode, Y as ConfigField, sa as ConfigSection, Ia as ContextVariablePicker, nf as CriteriaPanel, ts as CropConfig, vn as CropNode, Cs as DimensionsConfig, Sn as DimensionsNode, qs as EditPromptConfig, Bn as EditPromptNode, gc as EditRecommendationsPanel, ee as EventStreamProvider, Vt as ForkNode, Fo as FormatConvertConfig, mn as FormatConvertNode, Hs as GenerateConfig, Fn as GenerateNode, Xt as GraphQueryNode, Qt as GuardrailNode, kf as ImageLineageGraph, Ys as ImageSourceConfig, nn as ImageSourceNode, lc as ImageWithBBoxOverlay, Wt as JoinNode, of as JudgmentApiProvider, cf as JudgmentResultViewer, df as JudgmentTrendChart, Yt as KnowledgeBaseNode, Pt as LLMNode, Jt as McpToolNode, Zt as MemoryNode, Dt as NODE_CATEGORIES, Dc as NODE_TYPES_WITHOUT_CONFIG, X as NodeConfigShell, vr as NodePalette, on as NodeThumbStrip, fc as ObjectsPanel, ar as PALETTE_ITEMS, Ot as PORT_CLS, Zd as PendingApprovalsPage, dc as PeoplePanel, Ir as PipelineCanvas, N as PipelineEditorContext, Yc as PipelineEditorPage, de as PipelineEditorProvider, He as PipelineEditorServicesProvider, re as PipelineNodeRuntimeProvider, ld as PipelineRunComparePage, Ad as PipelineRunDiff, Wu as PipelineRunReplayPage, _u as PipelineRunsPage, ne as PipelineRunsProvider, Gd as PipelineStatsPage, Bl as PipelinesPage, $t as PolicyNode, Eo as ResizeConfig, un as ResizeNode, ca as SamplePills, Zs as SaveConfig, sn as SaveNode, wo as ScatterConfig, ln as ScatterNode, Io as SharpenConfig, hn as SharpenNode, _a as SourceImagePathField, pc as TagsPanel, va as ToggleField, jo as TransformGeoConfig, fn as TransformGeoNode, It as TransformNode, jt as TriggerNode, Ts as UpscaleConfig, Cn as UpscaleNode, Gs as VariationConfig, Ln as VariationNode, tf as VerdictPanel, Ps as VisionClassifyConfig, kn as VisionClassifyNode, As as VisionConfig, Fs as VisionDescribeConfig, An as VisionDescribeNode, Ls as VisionExtractTextConfig, Mn as VisionExtractTextNode, On as VisionNode, _c as VisionResultViewer, Qd as VisionRunCard, Ms as VisionTagConfig, jn as VisionTagNode, Ro as WatermarkConfig, gn as WatermarkNode, da as availableContextPaths, ma as availableImageRefs, q as categoryFor, Pf as clearImageLineageCache, la as contextContributions, uc as imageOverlayPropsFrom, Vn as nodeTypes, J as portCls, fr as recordRecentType, fa as unresolvedTemplatePaths, ua as upstreamNodeIds, k as useEventStream, A as useEventStreamContext, Ff as useImageLineage, Fe as useImageUrl, Be as useIsNodeTypeExecutable, hf as useJudgmentAggregates, sf as useJudgmentApi, mf as useJudgmentResults, F as useLatestStepForNode, pe as usePipelineEditor, Ve as usePipelineEditorServices, fe as usePipelineNodeRuntime, _e as usePipelineRuns, M as useRetryFromStep, ha as useUpstreamContext, ga as useUpstreamImageRefs, $d as useVisionResults };
