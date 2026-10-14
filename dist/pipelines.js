import { r as e } from "./IdentityContext-CQM1qwH6.js";
import "./WebSocketContext-DUvjGLFq.js";
import { t } from "./usePrefersReducedMotion-Cllucr7i.js";
import { t as n } from "./cn-D4QmbyEy.js";
import { n as r } from "./ToastProvider-CJAceUvq.js";
import { t as i } from "./useEventCallback-Cwx9QVSi.js";
import { a, c as o, d as s, i as c, n as l, o as u, s as d, t as f, u as p } from "./GroupedList-DGCDhr54.js";
import { n as m, o as h } from "./Button-uREUOWUk.js";
import { n as g, o as _, r as v } from "./overlayStack-C0EBgmzL.js";
import { t as y } from "./IconButton-IE5g44md.js";
import { t as b } from "./Banner-sz3Zmk7J.js";
import { n as x, t as S } from "./Chart-xxoyJmZI.js";
import { t as C } from "./Modal-CEiWhFnj.js";
import { t as w } from "./ConfirmDialog-DVS3MsJN.js";
import { t as T } from "./Input-_B49FdRY.js";
import { t as E } from "./Select-0lM_wZAc.js";
import { a as D, t as ee } from "./Toolbar-ceAMewE3.js";
import { t as O } from "./SearchInput-HK4TcIG4.js";
import { t as k } from "./EmptyState-ChFI22O0.js";
import { n as te, t as ne } from "./StatusPill-c89IbU1L.js";
import { i as A, t as re } from "./focusTrap-sOPgEKsE.js";
import { n as ie, t as j } from "./FilterChip-CRbJ6bUi.js";
import { t as M } from "./SkeletonCard-D3FL0TB7.js";
import { n as ae, t as oe } from "./Slider-DEbQCKD1.js";
import { t as se } from "./DropdownMenu-CkxvSCck.js";
import { t as N } from "./Textarea-BwvE1HPn.js";
import { t as P } from "./NumberInput-BEPkW6f6.js";
import { t as ce } from "./PageHeader-CyrCfpgD.js";
import { t as F } from "./FileUploadDrop-DT9fN5TH.js";
import { t as le } from "./Checkbox-Jycr-rlf.js";
import { n as ue } from "./FileKindMark-DhjYpKjg.js";
import { t as de } from "./activationKey-CjbL3LUv.js";
import { n as fe, r as pe, t as me } from "./EventStreamContext-CLzG8O5_.js";
import { $ as he, A as ge, B as _e, C as ve, D as ye, E as be, F as xe, G as Se, H as Ce, I as we, J as Te, K as Ee, L as De, M as Oe, N as ke, O as Ae, P as je, Q as Me, S as Ne, T as Pe, U as Fe, V as I, W as Ie, X as Le, Z as Re, _ as ze, _t as Be, a as Ve, at as He, b as Ue, bt as We, c as Ge, ct as Ke, d as qe, dt as Je, et as Ye, f as Xe, ft as Ze, g as Qe, h as $e, ht as et, i as tt, it as nt, j as rt, k as it, l as at, lt as ot, mt as st, n as ct, nt as lt, o as ut, ot as dt, p as ft, pt, r as mt, rt as ht, s as gt, st as _t, t as vt, tt as yt, u as bt, ut as xt, v as St, vt as Ct, w as wt, x as Tt, xt as Et, y as Dt, yt as Ot, z as kt } from "./services-ZzdtJ1Tq.js";
import { t as At } from "./rovingFocus-Bj5Y6kwY.js";
/* empty css               */
import { t as jt } from "./AnimatedEdge-DnsfF8-D.js";
import { t as Mt } from "./FloatingComposerDock-D10uQ4k3.js";
import { t as Nt } from "./TraceTimeline-CWhORWzc.js";
import Pt, { createContext as Ft, memo as It, useCallback as L, useContext as Lt, useEffect as R, useId as Rt, useMemo as z, useRef as B, useState as V } from "react";
import { Fragment as H, jsx as U, jsxs as W } from "react/jsx-runtime";
import { Navigate as zt, useNavigate as Bt, useParams as Vt, useSearchParams as Ht } from "react-router";
import { Background as Ut, BackgroundVariant as Wt, Controls as Gt, Handle as G, MiniMap as Kt, Position as K, ReactFlow as qt, ReactFlowProvider as Jt, useEdgesState as Yt, useNodeConnections as Xt, useNodesState as Zt, useReactFlow as Qt } from "@xyflow/react";
//#region src/components/pipelines/validation/handleCompatibility.ts
var $t = {
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
}, en = {
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
function tn(e, t, n, r) {
	return !(!nn(e, t) || !rn(n, r));
}
function nn(e, t) {
	let n = $t[e];
	return n === void 0 ? !1 : n === "fork" ? an(t) : n.includes(t);
}
function rn(e, t) {
	let n = en[e];
	return n == null ? !1 : n === "join" ? on(t) : n.includes(t);
}
function an(e) {
	return /^branch-(\d+)$/.exec(e) !== null;
}
function on(e) {
	return /^in-(\d+)$/.exec(e) !== null;
}
//#endregion
//#region src/components/pipelines/nodes/BaseNode.tsx
var sn = {
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
}, cn = {
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
	let r = tt(), i = e.nodeType ? !r(e.nodeType) : !1, { icon: a, subtitle: o, state: s, body: c, footer: l, selected: u, onRetry: d, hasBreakpoint: f, pausedAtBreakpoint: p, ariaLabel: m, category: h, children: g } = e, _ = sn[s] ?? sn.idle, v = h ? cn[h] : void 0, y = t(), [b, x] = V(!1), S = s === "failed" && typeof d == "function", C = (e) => {
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
var ln = {
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
	return ln[e];
}
//#endregion
//#region src/components/pipelines/nodes/shared/ports.ts
var un = {
	image: "!w-2.5 !h-2.5 !rounded-sm !bg-accent !border-accent",
	text: "!w-2.5 !h-2.5 !bg-surface-emphasis",
	data: "!w-2.5 !h-2.5 !bg-neutral",
	control: "!w-2 !h-2 !bg-warning",
	error: "!w-2 !h-2 !bg-danger"
};
function Y(e) {
	return un[e];
}
//#endregion
//#region src/components/pipelines/nodes/trigger/TriggerNode.tsx
function dn(e) {
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
function fn(e) {
	return e.triggerType === "schedule" ? e.schedule ? `cron: ${e.schedule}` : "No schedule set" : e.triggerType === "webhook" ? e.webhookPath ? `POST ${e.webhookPath}` : "No path set" : e.triggerType.startsWith("document.") ? e.documentTypeId ? `Doc type: ${e.documentTypeId}` : "Any document" : "Fires on user click";
}
function pn(e) {
	let { id: t, data: n, selected: r } = e, i = I(t), a = i?.status === "cancelled" ? "failed" : i?.status, o = (n._state && n._state !== "idle" ? n._state : void 0) ?? a ?? n._state ?? "idle", s = Ie(), c = o === "failed" && s ? () => s(t) : void 0, l = `Trigger node, ${dn(n)}, state: ${o}`;
	return /* @__PURE__ */ U(q, {
		icon: "▶",
		subtitle: dn(n),
		state: o,
		category: J("trigger"),
		body: /* @__PURE__ */ U("span", {
			className: "italic",
			children: fn(n)
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
function mn(e) {
	if (!e || e.trim().length === 0) return "Not configured";
	let t = e.split("\n").slice(0, 2).join(" ").trim();
	return t.length > 120 ? `${t.slice(0, 117)}…` : t;
}
function hn({ info: e }) {
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
function gn(e) {
	let { id: t, data: n, selected: r } = e, i = I(t), a = i?.status === "cancelled" ? "failed" : i?.status, o = (n._state && n._state !== "idle" ? n._state : void 0) ?? a ?? n._state ?? "idle", s = i?.llm, c = o === "running" && s?.streamOpened === !0 && (s?.tokensOut ?? 0) === 0, l = o === "running" && s !== void 0 && (s.tokensOut ?? 0) > 0, u = Ie(), d = o === "failed" && u ? () => u(t) : void 0, f = /* @__PURE__ */ U("span", {
		className: "italic",
		children: mn(n.userPromptTemplate)
	}), p = (s ? {
		response: s.response ?? "",
		tokensIn: s.tokensIn,
		tokensOut: s.tokensOut,
		streaming: l,
		streamOpening: c
	} : void 0) ?? n._llmResponse, m = p ? /* @__PURE__ */ U(hn, { info: p }) : void 0, h = (n.systemPrompt ?? "").replace(/\s+/g, " ").trim(), g = h.length === 0 ? "no system prompt" : `system prompt: ${h.length > 60 ? `${h.slice(0, 60)}…` : h}`, _ = `LLM node, ${n.model || n.provider}, ${g}, state: ${o}`;
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
function _n(e) {
	if (!e) return "—";
	let t = e.replace(/\s+/g, " ").trim();
	return t.length > 60 ? `${t.slice(0, 60)}…` : t;
}
function vn(e) {
	let { id: t, data: n, selected: r } = e, i = I(t), a = i?.status === "cancelled" ? "failed" : i?.status, o = (n._state && n._state !== "idle" ? n._state : void 0) ?? a ?? n._state ?? "idle", s = Ie(), c = o === "failed" && s ? () => s(t) : void 0;
	return /* @__PURE__ */ W(q, {
		icon: "✨",
		subtitle: n.transformType,
		state: o,
		category: J("transform"),
		body: /* @__PURE__ */ U("span", {
			className: "font-mono text-xs text-text-primary bg-surface-inset px-1.5 py-0.5 rounded inline-block max-w-full overflow-hidden text-ellipsis whitespace-nowrap",
			children: _n(n.expression)
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
function yn(e) {
	if (!e) return "—";
	let t = e.replace(/\s+/g, " ").trim();
	return t.length > 60 ? `${t.slice(0, 60)}…` : t;
}
function bn(e) {
	let { id: t, data: n, selected: r } = e, i = I(t), a = i?.status === "cancelled" ? "failed" : i?.status, o = (n._state && n._state !== "idle" ? n._state : void 0) ?? a ?? n._state ?? "idle", s = Ie(), c = o === "failed" && s ? () => s(t) : void 0;
	return /* @__PURE__ */ W(q, {
		icon: "❓",
		subtitle: n.label || "condition",
		state: o,
		category: J("condition"),
		body: /* @__PURE__ */ U("span", {
			className: "font-mono text-xs text-text-primary bg-surface-inset px-1.5 py-0.5 rounded inline-block max-w-full overflow-hidden text-ellipsis whitespace-nowrap",
			children: yn(n.expression)
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
function xn(e) {
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
function Sn(e) {
	let { id: t, data: n, selected: r } = e, i = I(t), a = i?.status === "cancelled" ? "failed" : i?.status, o = (n._state && n._state !== "idle" ? n._state : void 0) ?? a ?? n._state ?? "idle", s = Ie(), c = o === "failed" && s ? () => s(t) : void 0;
	return /* @__PURE__ */ W(q, {
		icon: "⚡",
		subtitle: n.actionType,
		state: o,
		category: J("action"),
		body: /* @__PURE__ */ U("span", {
			className: "italic",
			children: xn(n)
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
function Cn(e) {
	let { id: t, data: n, selected: r } = e, i = n.type ?? n.nodeType ?? "step", a = I(t), o = a?.status === "cancelled" ? "failed" : a?.status, s = (n._state && n._state !== "idle" ? n._state : void 0) ?? o ?? n._state ?? "idle", c = Ie(), l = s === "failed" && c ? () => c(t) : void 0;
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
function wn(e) {
	let { id: t, data: n, selected: r } = e, i = I(t), a = i?.status === "cancelled" ? "failed" : i?.status, o = (n._state && n._state !== "idle" ? n._state : void 0) ?? a ?? n._state ?? "idle", s = Ie(), c = o === "failed" && s ? () => s(t) : void 0, l = Math.max(2, Math.min(8, n.branchCount ?? 2)), u = Array.from({ length: l }, (e, t) => {
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
function Tn(e) {
	return e.mode === "all" ? "all" : e.mode === "any" ? "any" : `${e.n ?? 1} of many`;
}
function En(e) {
	switch (e) {
		case "deep-merge": return "Deep merge";
		case "array-collect": return "Array collect";
		case "last-writer-wins": return "Last writer wins";
		default: return String(e);
	}
}
function Dn(e) {
	let { id: t, data: n, selected: r } = e, i = I(t), a = i?.status === "cancelled" ? "failed" : i?.status, o = (n._state && n._state !== "idle" ? n._state : void 0) ?? a ?? n._state ?? "idle", s = Ie(), c = o === "failed" && s ? () => s(t) : void 0, l = Xt({ handleType: "target" }), u = Math.max(2, l.length + 1);
	return /* @__PURE__ */ W(q, {
		icon: "⑃",
		subtitle: Tn(n),
		state: o,
		category: J("join"),
		body: /* @__PURE__ */ U("span", {
			className: "italic",
			children: En(n.mergeStrategy)
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
function On(e) {
	return e.type === "role" ? `@${e.value}` : e.value;
}
function kn(e) {
	let { id: t, data: n, selected: r } = e, i = I(t), a = i?.status === "cancelled" ? "failed" : i?.status, o = (n._state && n._state !== "idle" ? n._state : void 0) ?? a ?? n._state ?? "idle", s = Ie(), c = o === "failed" && s ? () => s(t) : void 0, l = n.approvers ?? [], u = l.length, d = n.requiredCount ?? 0, f = `${u} approver${u === 1 ? "" : "s"}, ${d}/${u} required`, p = l.slice(0, 2), m = Math.max(0, l.length - 2), h = l.length === 0 ? /* @__PURE__ */ U("span", {
		className: "italic text-text-tertiary",
		children: "No approvers"
	}) : /* @__PURE__ */ W("div", {
		className: "flex flex-wrap gap-1",
		children: [p.map((e, t) => /* @__PURE__ */ U("span", {
			className: "inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-surface-panel text-text-secondary border border-border max-w-[120px] overflow-hidden text-ellipsis whitespace-nowrap",
			children: On(e)
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
function An({ id: e, data: t, selected: n }) {
	let r = I(e), i = r?.status === "cancelled" ? "failed" : r?.status, a = t._state ?? i ?? "idle", o = Ie(), s = t.allowedTools?.length ?? 0, c = t.prompt?.trim() ? t.prompt.trim().split("\n")[0].slice(0, 48) : "No prompt", l = s === 0 ? `${t.model ?? "sonnet"} · no tools` : `${t.model ?? "sonnet"} · ${s} tool${s === 1 ? "" : "s"}`;
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
function jn({ id: e, data: t, selected: n }) {
	let r = I(e), i = r?.status === "cancelled" ? "failed" : r?.status, a = t._state ?? i ?? "idle", o = Ie(), s = t.toolName || "Not configured";
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
function Mn({ id: e, data: t, selected: n }) {
	let r = I(e), i = r?.status === "cancelled" ? "failed" : r?.status, a = t._state ?? i ?? "idle", o = Ie(), s = t.knowledgeBaseId || "Not configured", c = `Top ${t.topK} chunks${t.scoreThreshold ? ` (≥${t.scoreThreshold})` : ""}`;
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
function Nn({ id: e, data: t, selected: n }) {
	let r = I(e), i = r?.status === "cancelled" ? "failed" : r?.status, a = t._state ?? i ?? "idle", o = Ie(), s = t.graphId || "Not configured", c = t.query.length > 40 ? `${t.query.slice(0, 37)}...` : t.query;
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
function Pn({ id: e, data: t, selected: n }) {
	let r = I(e), i = r?.status === "cancelled" ? "failed" : r?.status, a = t._state ?? i ?? "idle", o = Ie(), s = `${t.mode} ${t.scope}`, c = t.namespace ? `ns: ${t.namespace}` : "No namespace";
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
function Fn({ id: e, data: t, selected: n }) {
	let r = I(e), i = r?.status === "cancelled" ? "failed" : r?.status, a = t._state ?? i ?? "idle", o = Ie(), s = t.label || t.guardrailId || "Not configured";
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
function In({ id: e, data: t, selected: n }) {
	let r = I(e), i = r?.status === "cancelled" ? "failed" : r?.status, a = t._state ?? i ?? "idle", o = Ie(), s = t.label || t.action || "Not configured";
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
function Ln({ id: e, data: t, selected: n }) {
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
var Rn = (e) => e.stopPropagation();
function zn(e) {
	let { id: t, data: r, selected: i } = e, [a, s] = V(!1), c = I(t), l = c?.status === "cancelled" ? "failed" : c?.status, u = (r._state && r._state !== "idle" ? r._state : void 0) ?? l ?? r._state ?? "idle", d = ct(), f = c?.images?.[0]?.imageId ?? c?.output?.imageId ?? r.imageId, p = f ? /* @__PURE__ */ W(H, { children: [/* @__PURE__ */ U("button", {
		type: "button",
		"aria-label": "View source image",
		className: n("block w-full rounded border-none bg-transparent p-0 cursor-zoom-in", "focus:outline-none focus-visible:ring-2 focus-visible:ring-info"),
		onMouseDown: Rn,
		onClick: (e) => {
			e.stopPropagation(), s(!0);
		},
		children: /* @__PURE__ */ U("img", {
			src: d(f),
			alt: "Source image",
			className: n("w-full h-20 object-cover rounded block", "border border-border-field bg-surface-hover"),
			"data-testid": "image-source-thumb"
		})
	}), /* @__PURE__ */ U(o, {
		images: [{
			src: d(f),
			alt: "Source image"
		}],
		openIndex: a ? 0 : null,
		onClose: () => s(!1)
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
		state: u,
		category: J("image-source"),
		body: p,
		footer: m,
		selected: i,
		ariaLabel: `Image Source node, state: ${u}`,
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
var Bn = (e) => e.stopPropagation(), Vn = n("h-[38px] w-[38px] shrink-0 overflow-hidden rounded border border-border bg-surface-inset", "p-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-info");
function Hn({ images: e, max: t = 4, "data-testid": r = "node-thumb-strip" }) {
	let i = ct(), [a, s] = V(null);
	if (e.length === 0) return null;
	let c = e.length > t, l = c ? e.slice(0, t - 1) : e, u = e.length - l.length, d = (e) => (t) => {
		t.stopPropagation(), s(e);
	};
	return /* @__PURE__ */ W(H, { children: [/* @__PURE__ */ W("div", {
		"data-testid": r,
		className: "flex flex-row items-center gap-1",
		children: [l.map((t, n) => /* @__PURE__ */ U("button", {
			type: "button",
			"data-testid": `${r}-thumb-${n}`,
			"aria-label": t.alt ?? `Result image ${n + 1} of ${e.length}`,
			className: Vn,
			onMouseDown: Bn,
			onClick: d(n),
			children: /* @__PURE__ */ U("img", {
				src: i(t.imageId),
				alt: t.alt ?? "",
				loading: "lazy",
				className: "h-full w-full object-cover"
			})
		}, `${t.imageId}-${n}`)), c && /* @__PURE__ */ W("button", {
			type: "button",
			"data-testid": `${r}-overflow`,
			"aria-label": `Show all ${e.length} images`,
			className: n(Vn, "flex items-center justify-center font-mono text-[11px] font-medium text-text-secondary"),
			onMouseDown: Bn,
			onClick: d(l.length),
			children: ["+", u]
		})]
	}), /* @__PURE__ */ U(o, {
		images: e.map((e) => ({
			src: i(e.imageId),
			alt: e.alt,
			caption: e.alt
		})),
		openIndex: a,
		onClose: () => s(null),
		onNavigate: s
	})] });
}
//#endregion
//#region src/components/pipelines/nodes/save/SaveNode.tsx
function Un(e) {
	let { id: t, data: r, selected: i } = e, a = I(t), o = a?.status === "cancelled" ? "failed" : a?.status, s = (r._state && r._state !== "idle" ? r._state : void 0) ?? o ?? r._state ?? "idle", c = a?.images ?? [], l = a?.output?.filename ?? null, u = c.length > 0 ? /* @__PURE__ */ W("div", { children: [/* @__PURE__ */ U(Hn, {
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
function Wn(e) {
	return e ? e.length > 40 ? `${e.slice(0, 37)}…` : e : "Not configured";
}
function Gn(e) {
	let { id: t, data: n, selected: r } = e, i = I(t), a = i?.status === "cancelled" ? "failed" : i?.status, o = (n._state && n._state !== "idle" ? n._state : void 0) ?? a ?? n._state ?? "idle", s = i?.output, c = Array.isArray(s?.items) ? s.items.length : null, l = /* @__PURE__ */ W("div", {
		className: "flex flex-col gap-1",
		children: [/* @__PURE__ */ U("span", {
			className: "font-mono text-[11px] text-text-secondary break-all",
			children: Wn(n.itemsPath ?? "")
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
function Kn(e) {
	let { id: t, data: n, selected: r } = e, i = ct(), a = I(t), o = a?.status === "cancelled" ? "failed" : a?.status, s = (n._state && n._state !== "idle" ? n._state : void 0) ?? o ?? n._state ?? "idle", c = a?.images?.[0] ?? null, l = n.width != null && n.height != null ? `→ ${n.width}×${n.height}` : n.width == null ? n.height == null ? null : `→ ${n.height}h` : `→ ${n.width}w`, u = c ? /* @__PURE__ */ U("img", {
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
function qn(e) {
	switch (e.op) {
		case "rotate": return `rotate ${e.degrees}°`;
		case "flip": return "flip ↕";
		case "flop": return "flop ↔";
	}
}
function Jn(e) {
	let { id: t, data: n, selected: r } = e, i = ct(), a = I(t), o = a?.status === "cancelled" ? "failed" : a?.status, s = (n._state && n._state !== "idle" ? n._state : void 0) ?? o ?? n._state ?? "idle", c = a?.images?.[0] ?? null, l = n.operations ?? [], u = l.length > 0 ? l.map(qn).join("  ›  ") : null, d = c ? /* @__PURE__ */ U("img", {
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
function Yn(e) {
	let t = e.format?.toUpperCase() ?? "?", n = e.lossless ? "lossless" : e.quality == null ? "" : `q${e.quality}`;
	return n ? `${t} ${n}` : t;
}
function Xn(e) {
	let { id: t, data: n, selected: r } = e, i = ct(), a = I(t), o = a?.status === "cancelled" ? "failed" : a?.status, s = (n._state && n._state !== "idle" ? n._state : void 0) ?? o ?? n._state ?? "idle", c = a?.images?.[0] ?? null, l = n.format ? Yn(n) : null, u = c ? /* @__PURE__ */ U("img", {
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
function Zn(e) {
	let { id: t, data: n, selected: r } = e, i = ct(), a = I(t), o = a?.status === "cancelled" ? "failed" : a?.status, s = (n._state && n._state !== "idle" ? n._state : void 0) ?? o ?? n._state ?? "idle", c = a?.images?.[0] ?? null, l = n.sigma == null ? null : `σ ${n.sigma}`, u = c ? /* @__PURE__ */ U("img", {
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
function Qn(e) {
	let { id: t, data: n, selected: r } = e, i = ct(), a = I(t), o = a?.status === "cancelled" ? "failed" : a?.status, s = (n._state && n._state !== "idle" ? n._state : void 0) ?? o ?? n._state ?? "idle", c = a?.images?.[0] ?? null, l = n.gravity ?? "southeast", u = n.opacity == null ? "100%" : `${Math.round(n.opacity * 100)}%`, d = c ? /* @__PURE__ */ U("img", {
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
function $n(e) {
	if (!e) return null;
	let t = e.x + e.width, n = e.y + e.height;
	return `[${e.x},${e.y} → ${t},${n}]`;
}
function er(e) {
	let { id: t, data: n, selected: r } = e, i = ct(), a = I(t), o = a?.status === "cancelled" ? "failed" : a?.status, s = (n._state && n._state !== "idle" ? n._state : void 0) ?? o ?? n._state ?? "idle", c = a?.images?.[0] ?? null, l = a?.output, u = $n(c?.bbox ?? l?.bbox), d = c ? /* @__PURE__ */ U("img", {
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
function tr(e) {
	let { id: t, data: n, selected: r } = e, i = ct(), a = I(t), o = a?.status === "cancelled" ? "failed" : a?.status, s = (n._state && n._state !== "idle" ? n._state : void 0) ?? o ?? n._state ?? "idle", c = a?.images?.[0] ?? null, l = c ? /* @__PURE__ */ U("div", {
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
function nr(e) {
	switch (e.kind) {
		case "brightness": return `brightness ${e.value}`;
		case "contrast": return `contrast ${e.value}`;
		case "saturation": return `sat ${e.value}`;
		case "hue": return `hue ${e.degrees}°`;
		case "blur": return `blur ${e.radiusPx}px`;
	}
}
function rr(e) {
	let { id: t, data: n, selected: r } = e, i = ct(), a = I(t), o = a?.status === "cancelled" ? "failed" : a?.status, s = (n._state && n._state !== "idle" ? n._state : void 0) ?? o ?? n._state ?? "idle", c = a?.images?.[0] ?? null, l = n.layers ?? [], u = c ? /* @__PURE__ */ U("img", {
		src: i(c.imageId),
		alt: "Adjust output",
		className: "w-full h-20 object-cover rounded border border-border bg-surface-inset block",
		"data-testid": "adjust-layer-output-thumb"
	}) : l.length > 0 ? /* @__PURE__ */ U("div", {
		className: "w-full rounded border border-dashed border-border bg-surface-inset p-1.5 flex flex-wrap gap-1 min-h-8",
		"data-testid": "adjust-layer-chips",
		children: l.map((e, t) => /* @__PURE__ */ U("span", {
			className: "text-[10px] font-mono bg-surface-hover border border-border text-text-secondary rounded px-1 py-0.5",
			children: nr(e)
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
function ir(e) {
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
function ar(e) {
	let { id: t, data: n, selected: r } = e, i = ct(), a = I(t), o = a?.status === "cancelled" ? "failed" : a?.status, s = (n._state && n._state !== "idle" ? n._state : void 0) ?? o ?? n._state ?? "idle", c = a?.images?.[0] ?? null, l = `≤ ${n.maxEdge ?? 1024}px → 4×`, u = c ? /* @__PURE__ */ U("img", {
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
function or(e) {
	return e === 0 ? "$0" : e < .001 ? "<$0.001" : e < 1 ? `$${e.toFixed(3)}` : `$${e.toFixed(2)}`;
}
function sr(e) {
	if (!e || e.trim().length === 0) return "Not configured";
	let t = e.split("\n").slice(0, 2).join(" ").trim();
	return t.length > 120 ? `${t.slice(0, 117)}…` : t;
}
var cr = (e) => e.stopPropagation(), lr = It(function({ info: e }) {
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
	let s = e.tokensIn != null || e.tokensOut != null, c = !e.streaming && !e.awaiting && e.response.length > 0, l = t ? e.response : e.response.length > 60 ? `${e.response.slice(0, 60)}…` : e.response, u = e.awaiting ? "Vision: waiting for first token" : e.streaming ? "Vision: streaming response" : c ? "Vision: completed" : "";
	return /* @__PURE__ */ W("div", { children: [
		/* @__PURE__ */ U("output", {
			"aria-live": "polite",
			className: "sr-only",
			children: u
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
					children: ["· ", or(e.costUsd)]
				}),
				s && /* @__PURE__ */ W("span", {
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
		c && e.imageId && /* @__PURE__ */ U("button", {
			type: "button",
			onClick: () => window.dispatchEvent(new CustomEvent("pipeline:open-run-modal")),
			className: "mt-1 block bg-transparent border-none p-0 cursor-pointer text-[11px] text-primary underline font-inherit",
			children: "Run with new image →"
		}),
		e.imageId && /* @__PURE__ */ W(H, { children: [/* @__PURE__ */ U("button", {
			type: "button",
			"aria-label": "View vision input image",
			className: n("mt-1.5 block h-14 w-14 overflow-hidden rounded border border-border bg-surface-inset", "p-0 cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-info"),
			onMouseDown: cr,
			onClick: (e) => {
				e.stopPropagation(), a(!0);
			},
			children: /* @__PURE__ */ U("img", {
				src: e.getImageUrl(e.imageId),
				alt: "Vision input",
				className: "h-full w-full object-cover",
				"data-testid": "vision-input-thumb"
			})
		}), /* @__PURE__ */ U(o, {
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
			children: l
		})
	] });
});
function ur(e) {
	let { id: t, data: n, selected: r } = e, i = ct(), a = I(t), o = a?.status === "cancelled" ? "failed" : a?.status, s = (n._state && n._state !== "idle" ? n._state : void 0) ?? o ?? n._state ?? "idle", c = Ie(), l = L(() => c?.(t), [c, t]), u = s === "failed" && c ? l : void 0, d = /* @__PURE__ */ U("span", {
		className: "italic text-text-secondary text-[13px]",
		children: sr(n.userPrompt)
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
	]), g = h ? /* @__PURE__ */ U(lr, { info: h }) : void 0, _ = n.model || "claude-sonnet-4-6", v = n.outputSchema ? "extract" : "caption", y = `Vision node, model ${_}, mode ${v}, state: ${s}`;
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
function dr(e) {
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
function fr(e) {
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
function pr(e) {
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
function mr(e) {
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
function hr(e) {
	return !e || !e.trim() ? "No prompt set" : e.length > 80 ? `${e.slice(0, 77)}…` : e;
}
var gr = (e) => e.stopPropagation();
function _r(e) {
	let { id: t, data: r, selected: i } = e, a = ct(), [s, c] = V(!1), l = I(t), u = l?.status === "cancelled" ? "failed" : l?.status, d = (r._state && r._state !== "idle" ? r._state : void 0) ?? u ?? r._state ?? "idle", f = l?.images ?? [], p = l?.startedAt ? Date.parse(l.startedAt) : NaN, m = d === "running" && f.length === 0, h = (r.numImages ?? 1) > 1 || f.length > 1, g;
	if (f.length > 0 && h) g = /* @__PURE__ */ U(Hn, {
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
			onMouseDown: gr,
			onClick: (t) => {
				t.stopPropagation(), e && c(!0);
			},
			children: /* @__PURE__ */ U(bt, {
				status: m ? "synthesizing" : "done",
				...e ? { src: e } : {},
				alt: "Generate output",
				...m && Number.isFinite(p) ? { startedAt: p } : {},
				className: "w-full h-20"
			})
		}), e && /* @__PURE__ */ U(o, {
			images: [{
				src: e,
				alt: "Generate output"
			}],
			openIndex: s ? 0 : null,
			onClose: () => c(!1)
		})] });
	} else g = /* @__PURE__ */ U("div", {
		className: "w-24 h-16 rounded border border-dashed border-border bg-surface-inset flex items-center justify-center px-2 text-center text-[11px] text-text-tertiary",
		"data-testid": "generate-placeholder",
		children: hr(r.prompt)
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
var vr = (e) => e.stopPropagation();
function yr(e) {
	let { id: t, data: r, selected: i } = e, a = ct(), [s, c] = V(!1), l = I(t), u = l?.status === "cancelled" ? "failed" : l?.status, d = (r._state && r._state !== "idle" ? r._state : void 0) ?? u ?? r._state ?? "idle", f = l?.images ?? [], p = l?.startedAt ? Date.parse(l.startedAt) : NaN, m = d === "running" && f.length === 0, h = r.numVariations ?? 1, g = h > 1 || f.length > 1, _ = /* @__PURE__ */ W("span", {
		className: "inline-block text-[10px] font-semibold bg-surface-inset border border-border rounded px-1.5 py-0.5 text-text-secondary mb-1",
		children: [
			"×",
			h,
			" variation",
			h === 1 ? "" : "s"
		]
	}), v;
	if (f.length > 0 && g) v = /* @__PURE__ */ U(Hn, {
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
			onMouseDown: vr,
			onClick: (t) => {
				t.stopPropagation(), e && c(!0);
			},
			children: /* @__PURE__ */ U(bt, {
				status: m ? "synthesizing" : "done",
				...e ? { src: e } : {},
				alt: "Variation output",
				...m && Number.isFinite(p) ? { startedAt: p } : {},
				className: "w-full h-20"
			})
		}), e && /* @__PURE__ */ U(o, {
			images: [{
				src: e,
				alt: "Variation output"
			}],
			openIndex: s ? 0 : null,
			onClose: () => c(!1)
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
function br(e) {
	return !e || !e.trim() ? "No prompt set" : e.length > 80 ? `${e.slice(0, 77)}…` : e;
}
var xr = (e) => e.stopPropagation();
function Sr(e) {
	let { id: t, data: r, selected: i } = e, a = ct(), [s, c] = V(!1), l = I(t), u = l?.status === "cancelled" ? "failed" : l?.status, d = (r._state && r._state !== "idle" ? r._state : void 0) ?? u ?? r._state ?? "idle", f = l?.images ?? [], p = l?.startedAt ? Date.parse(l.startedAt) : NaN, m = d === "running" && f.length === 0, h = f.length > 1, g;
	if (h) g = /* @__PURE__ */ U(Hn, {
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
			onMouseDown: xr,
			onClick: (t) => {
				t.stopPropagation(), e && c(!0);
			},
			children: /* @__PURE__ */ U(bt, {
				status: m ? "synthesizing" : "done",
				...e ? { src: e } : {},
				alt: "Edit output",
				...m && Number.isFinite(p) ? { startedAt: p } : {},
				className: "w-full h-20"
			})
		}), e && /* @__PURE__ */ U(o, {
			images: [{
				src: e,
				alt: "Edit output"
			}],
			openIndex: s ? 0 : null,
			onClose: () => c(!1)
		})] });
	} else g = /* @__PURE__ */ U("div", {
		className: "w-24 h-16 rounded border border-dashed border-border bg-surface-inset flex items-center justify-center px-2 text-center text-[11px] text-text-tertiary",
		"data-testid": "edit-prompt-placeholder",
		children: br(r.prompt)
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
var Cr = {
	trigger: pn,
	llm: gn,
	transform: vn,
	condition: bn,
	action: Sn,
	fork: wn,
	join: Dn,
	approval: kn,
	agent: An,
	"mcp-tool": jn,
	"knowledge-base": Mn,
	"graph-query": Nn,
	memory: Pn,
	guardrail: Fn,
	policy: In,
	"ag-ui-output": Ln,
	"image-source": zn,
	"image:save": Un,
	scatter: Gn,
	"image:resize": Kn,
	"image:transform": Jn,
	"image:format-convert": Xn,
	"image:sharpen": Zn,
	"image:watermark": Qn,
	"image:crop": er,
	"image:adjust-bw": tr,
	"image:adjust-layer": rr,
	"image:dimensions": ir,
	"image:upscale": ar,
	"image:vision-analyze": ur,
	"image:vision-classify": dr,
	"image:vision-describe": fr,
	"image:vision-tag": pr,
	"image:vision-extract-text": mr,
	"image:generate": _r,
	"image:variation": yr,
	"image:edit-prompt": Sr
};
//#endregion
//#region src/components/pipelines/hooks/useClickOutside.ts
function wr(e, t, n) {
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
var Tr = "quick-insert-listbox", Er = (e) => e ? `quick-insert-option-${e}` : void 0, Dr = [
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
function Or(e, t) {
	if (!t) return !0;
	let n = t.toLowerCase();
	return e.type.toLowerCase().includes(n) || e.name.toLowerCase().includes(n) || e.description.toLowerCase().includes(n);
}
function kr({ anchor: e, flowPosition: t, disabledTypes: r = [], onClose: i, onInsert: a }) {
	let [o, s] = V(""), [c, l] = V(0), u = B(null), d = B(null), f = z(() => new Set(r), [r]), p = z(() => Dr.filter((e) => !f.has(e.type) && Or(e, o)), [f, o]);
	if (R(() => {
		l((e) => e >= p.length ? 0 : e);
	}, [p.length]), R(() => {
		if (e) {
			let e = setTimeout(() => d.current?.focus(), 0);
			return () => clearTimeout(e);
		}
	}, [e]), wr(u, i, !!e), !e) return null;
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
				"aria-controls": Tr,
				"aria-activedescendant": p.length > 0 ? Er(p[c]?.type) : void 0,
				"data-testid": "quick-insert-search"
			})
		}), /* @__PURE__ */ U("div", {
			id: Tr,
			className: "max-h-[260px] overflow-y-auto py-1",
			role: "listbox",
			"data-ui-listbox": "quick-insert",
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
					id: Er(e.type),
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
function Ar({ addNode: e, addEdge: t, updateNodeData: n, getDefinition: r }) {
	R(() => {}, [
		e,
		t,
		n,
		r
	]);
}
//#endregion
//#region src/components/pipelines/canvas/useCanvasKeyboard.ts
function jr({ definition: e, selectedNodeId: t, setSelectedNodeId: n, removeNode: r, removeDefEdge: i, nodes: a, edges: o, setNodes: s, setEdges: c, setPositions: l, duplicateNodes: u, clipboardRef: d, containerRef: f }) {
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
			if (di(f.target)) return;
			let h = document.activeElement, g = !!h && a.contains(h);
			if (f.key === "Tab") {
				if (!g || !e || e.nodes.length === 0) return;
				let t = fi(e);
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
function Mr({ addNode: e, screenToFlowPosition: t }) {
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
function Nr({ nodeMenu: e, breakpoints: t, showBreakpointOption: r, onFilterLog: i, onCopyNodeId: a, onDuplicate: o, onToggleBreakpoint: s, onDismiss: c }) {
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
		onKeyDown: (e) => At(e, {
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
function Pr(e) {
	let t = e.indexOf(":");
	return t > 0 ? e.slice(0, t) : null;
}
function Fr(e, t, n = {}) {
	let r = n.limit ?? 6;
	if (r <= 0) return [];
	let i = new Set(n.unavailable ?? []), a = new Set(e), o = /* @__PURE__ */ new Set();
	for (let t of e) {
		let e = Pr(t);
		e && o.add(e);
	}
	let s = [], c = /* @__PURE__ */ new Set();
	for (let e of t) c.has(e) || i.has(e) || a.has(e) && (s.push({
		kind: e,
		reason: "in-pipeline"
	}), c.add(e));
	for (let e of t) {
		if (c.has(e) || i.has(e)) continue;
		let t = Pr(e);
		t && o.has(t) && (s.push({
			kind: e,
			reason: "same-namespace"
		}), c.add(e));
	}
	return s.slice(0, r);
}
//#endregion
//#region src/components/pipelines/canvas/NodePalette.tsx
var Ir = [
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
], Lr = [
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
], Rr = {
	source: "bg-cat-source",
	transform: "bg-cat-transform",
	ai: "bg-cat-ai",
	control: "bg-cat-control",
	sink: "bg-cat-sink",
	human: "bg-cat-human"
}, zr = new Set(Ir.map((e) => e.type));
function Br(e) {
	if (e === "image-source") return "image";
	let t = e.indexOf(":");
	if (t <= 0) return null;
	let n = e.slice(0, t);
	return zr.has(n) ? null : n;
}
var Vr = Lr.map(({ key: e, name: t }) => ({
	key: e,
	name: t,
	items: Ir.filter((t) => J(t.type) === e).map((n) => ({
		...n,
		category: t,
		nodeCategory: e
	}))
})).filter((e) => e.items.length > 0), Hr = Vr.flatMap((e) => e.items.map((e) => ({
	type: e.type,
	name: e.name
})));
Vr.map((e) => e.name);
var Ur = "pipeline.palette.recents", Wr = 5, Gr = "pipeline.palette.compact";
function Kr() {
	if (typeof window > "u") return [];
	try {
		let e = window.localStorage.getItem(Ur);
		if (!e) return [];
		let t = JSON.parse(e);
		return Array.isArray(t) ? t : [];
	} catch {
		return [];
	}
}
function qr(e) {
	if (!(typeof window > "u")) try {
		window.localStorage.setItem(Ur, JSON.stringify(e));
	} catch {}
}
function Jr(e) {
	qr([e, ...Kr().filter((t) => t !== e)].slice(0, Wr));
}
var Yr = "pipeline.palette.collapsed.";
function Xr(e, t = !1) {
	if (typeof window > "u") return t;
	try {
		let n = window.localStorage.getItem(Yr + e);
		return n === null ? t : n === "true";
	} catch {
		return t;
	}
}
function Zr(e, t) {
	if (!(typeof window > "u")) try {
		window.localStorage.setItem(Yr + e, String(t));
	} catch {}
}
function Qr(e, t) {
	if (!t) return !0;
	let n = t.toLowerCase();
	return e.name.toLowerCase().includes(n) || e.type.toLowerCase().includes(n) || e.description.toLowerCase().includes(n);
}
function $r({ expanded: e }) {
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
function ei({ disabledTypes: e = [], contextTypes: t, serverKinds: r }) {
	let [i, a] = V(""), [o, s] = V(/* @__PURE__ */ new Set()), [c, l] = V(null), [u, d] = V(() => Kr()), [f, p] = V(() => {
		if (typeof window > "u") return !1;
		try {
			return window.localStorage.getItem(Gr) === "true";
		} catch {
			return !1;
		}
	}), [m, h] = V(() => {
		let e = {};
		for (let t of Vr) e[t.name] = Xr(t.name);
		return e;
	}), g = z(() => new Set(e), [e]), _ = z(() => {
		if (!r || r.length === 0) return [];
		let e = new Set(Ir.map((e) => e.type)), t = /* @__PURE__ */ new Map();
		for (let n of r) {
			if (e.has(n)) continue;
			let r = Pr(n);
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
	}, [r]), v = z(() => {
		let e = /* @__PURE__ */ new Map();
		if (!r) return e;
		let t = new Set(Ir.map((e) => e.type));
		for (let n of r) {
			if (t.has(n)) continue;
			let r = Pr(n);
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
	}, [r]), y = z(() => {
		let e = /* @__PURE__ */ new Map(), t = Vr.map((t) => {
			let n = v.get(t.key), r = n ? [...t.items, ...n] : t.items, i = [];
			for (let t of r) {
				let n = Br(t.type);
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
			..._
		];
	}, [_, v]), b = z(() => {
		let e = /* @__PURE__ */ new Set();
		for (let n of t ?? []) {
			let t = Br(n);
			t && e.add(t);
		}
		return e;
	}, [t]), x = L((e) => {
		let t = e.domain ?? (e.serverTail ? e.key : null);
		return t ? !b.has(t) : !1;
	}, [b]), S = z(() => y.map((e) => e.name), [y]);
	R(() => {
		let e = (e) => {
			e.key === Ur && d(Kr());
		};
		return window.addEventListener("storage", e), () => window.removeEventListener("storage", e);
	}, []), R(() => {
		if (!(typeof window > "u")) try {
			window.localStorage.setItem(Gr, String(f));
		} catch {}
	}, [f]);
	let C = L((e) => {
		s((t) => {
			let n = new Set(t);
			return n.has(e) ? n.delete(e) : n.add(e), n;
		});
	}, []), w = L(() => {
		a(""), s(/* @__PURE__ */ new Set());
	}, []), E = L((e, t) => {
		h((n) => {
			let r = {
				...n,
				[e]: !t
			};
			return Zr(e, r[e]), r;
		});
	}, []), D = z(() => {
		let e = /* @__PURE__ */ new Map();
		for (let t of y) for (let n of t.items) e.set(n.type, n);
		return e;
	}, [y]), ee = tt(), O = z(() => {
		if (!t || t.length === 0) return [];
		let e = [...D.keys()];
		return Fr(t, e, { unavailable: e.filter((e) => !ee(e) || g.has(e)) }).map((e) => D.get(e.kind)).filter(Boolean);
	}, [
		t,
		D,
		ee,
		g
	]), k = z(() => u.map((e) => D.get(e)).filter(Boolean), [u, D]), te = O.length > 0 ? O : k, ne = O.length > 0 ? "Relevant here" : "Recently used", A = z(() => {
		let e = !i && o.size === 0, t = new Set(e ? te.map((e) => e.type) : []);
		return y.map((e) => {
			let n = o.size > 0 && !o.has(e.name) ? [] : e.items.filter((e) => !t.has(e.type) && Qr(e, i));
			return {
				...e,
				items: n
			};
		}).filter((e) => e.items.length > 0);
	}, [
		i,
		o,
		y,
		te
	]), re = i.length > 0 || o.size > 0, ie = z(() => {
		let e = /* @__PURE__ */ new Set(), t = [];
		if (!i && o.size === 0) for (let n of te) t.push(n), e.add(n.type);
		for (let n of A) if (!(!re && (m[n.name] ?? x(n)))) for (let r of n.items) e.has(r.type) || (t.push(r), e.add(r.type));
		return t;
	}, [
		te,
		A,
		i,
		o,
		m,
		re,
		x
	]), M = B(ie);
	R(() => {
		M.current = ie;
	}, [ie]);
	let ae = A.length === 0 && (i !== "" || o.size > 0), oe = (e) => (t) => {
		if (g.has(e.type)) {
			t.preventDefault();
			return;
		}
		t.dataTransfer.setData("application/reactflow", JSON.stringify({ nodeType: e.type })), t.dataTransfer.effectAllowed = "move";
	}, se = (e, t) => {
		let r = g.has(e.type), i = !ee(e.type), a = c === e.type && !r, o = t !== null && t < 9 ? t + 1 : null;
		return f ? /* @__PURE__ */ W("div", {
			draggable: !r,
			onDragStart: oe(e),
			onMouseEnter: () => l(e.type),
			onMouseLeave: () => l(null),
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
					className: n("w-1.5 h-1.5 rounded-full shrink-0", e.nodeCategory && Rr[e.nodeCategory])
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
			onDragStart: oe(e),
			onMouseEnter: () => l(e.type),
			onMouseLeave: () => l(null),
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
					className: n("w-1.5 h-1.5 rounded-full shrink-0", e.nodeCategory && Rr[e.nodeCategory])
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
	}, N = te.length > 0 && !i && o.size === 0, P = 0;
	return /* @__PURE__ */ W("div", {
		className: "w-[220px] shrink-0 h-full border-r border-border bg-surface flex flex-col",
		"data-testid": "node-palette",
		children: [
			/* @__PURE__ */ W("div", {
				className: "shrink-0 border-b border-border",
				children: [/* @__PURE__ */ W("div", {
					className: "flex items-center gap-1.5 py-2.5 px-3",
					children: [/* @__PURE__ */ U(T, {
						type: "text",
						value: i,
						onChange: (e) => a(e.target.value),
						placeholder: "Search nodes...",
						"aria-label": "Search nodes",
						"data-testid": "palette-search",
						className: "flex-1 min-w-0"
					}), /* @__PURE__ */ U("button", {
						type: "button",
						onClick: () => p((e) => !e),
						title: f ? "Switch to card view" : "Switch to compact view",
						"data-testid": "palette-compact-toggle",
						"aria-pressed": f,
						className: n("shrink-0 w-7 h-7 flex items-center justify-center rounded border text-[11px] transition-colors", f ? "bg-info border-info text-white" : "bg-surface border-border-emphasis text-neutral hover:bg-surface-panel"),
						children: f ? /* @__PURE__ */ W("svg", {
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
					children: S.map((e) => /* @__PURE__ */ U(j, {
						size: "xs",
						active: o.has(e),
						onClick: () => C(e),
						"data-testid": `palette-chip-${e}`,
						children: e
					}, e))
				})]
			}),
			/* @__PURE__ */ W("div", {
				className: "flex-1 overflow-y-auto py-1",
				"data-testid": "palette-scroll",
				children: [N && /* @__PURE__ */ W("div", {
					"data-testid": "palette-recents",
					children: [/* @__PURE__ */ W("button", {
						type: "button",
						onClick: () => E("__recents__", !!m.__recents__),
						className: "w-full flex items-center gap-1 pt-2 pb-1 px-3.5 text-[10px] font-bold tracking-[0.6px] uppercase text-text-tertiary hover:text-text-secondary transition-colors font-[inherit]",
						"aria-expanded": !m.__recents__,
						children: [/* @__PURE__ */ U($r, { expanded: !m.__recents__ }), ne]
					}), !m.__recents__ && /* @__PURE__ */ U("div", { children: te.map((e) => {
						let t = P++;
						return se(e, t);
					}) })]
				}), ae ? /* @__PURE__ */ W("div", {
					className: "flex flex-col items-center gap-3 px-4 py-8 text-center",
					"data-testid": "palette-empty",
					children: [/* @__PURE__ */ U("span", {
						className: "text-xs text-text-tertiary",
						children: "No nodes match"
					}), /* @__PURE__ */ U("button", {
						type: "button",
						onClick: w,
						"data-testid": "palette-clear-filters",
						className: "text-[11px] font-semibold text-info-fg hover:underline",
						children: "Clear filters"
					})]
				}) : A.map((e) => {
					let t = re ? !1 : m[e.name] ?? x(e);
					return /* @__PURE__ */ W("div", {
						"data-testid": `palette-category-${e.name}`,
						children: [/* @__PURE__ */ W("button", {
							type: "button",
							onClick: () => E(e.name, t),
							className: "w-full flex items-center gap-1 pt-2 pb-1 px-3.5 text-[10px] font-bold tracking-[0.6px] uppercase text-text-tertiary hover:text-text-secondary transition-colors font-[inherit]",
							"aria-expanded": !t,
							children: [
								/* @__PURE__ */ U($r, { expanded: !t }),
								/* @__PURE__ */ U("span", {
									"aria-hidden": !0,
									"data-testid": `palette-section-accent-${e.key}`,
									className: n("w-1.5 h-1.5 rounded-full shrink-0", Rr[e.key])
								}),
								e.name
							]
						}), !t && /* @__PURE__ */ U("div", { children: e.items.map((e) => {
							let t = P++;
							return se(e, t);
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
function ti({ definition: e, addNode: t, screenToFlowPosition: n, containerRef: r }) {
	return R(() => {
		let i = (i) => {
			if (!di(i.target) && !(i.metaKey || i.ctrlKey || i.altKey) && /^[1-8]$/.test(i.key)) {
				let a = Hr[Number(i.key) - 1];
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
var ni = 280, ri = 120, ii = 40, ai = 40;
function oi(e, t) {
	let n = t?.layerSpacingX ?? ni, r = t?.nodeSpacingY ?? ri, i = t?.startX ?? ii, a = t?.startY ?? ai;
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
function si({ definition: e, setPositions: t, fitView: n }) {
	return {
		handleFitView: L(() => {
			n({
				padding: .15,
				duration: 500
			});
		}, [n]),
		handleAutoArrange: L(() => {
			if (!e) return;
			let r = oi(e);
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
function ci({ definition: e, setPositions: t, fitView: n }) {
	let { handleFitView: r, handleAutoArrange: i } = si({
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
var li = .1, ui = {
	padding: .15,
	minZoom: li,
	maxZoom: 1
};
function di(e) {
	if (!e || !(e instanceof HTMLElement)) return !1;
	let t = e.tagName;
	return !!(t === "INPUT" || t === "TEXTAREA" || t === "SELECT" || e.isContentEditable);
}
function fi(e) {
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
var pi = { animated: jt }, mi = Cr;
function hi(e) {
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
function gi(e) {
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
function _i({ onFilterLog: e, errorNodeId: t, onErrorNodePosition: n, replayEdgeStates: r, replayNodeClasses: i, breakpoints: a, onToggleBreakpoint: o, pausedAtNodeId: s }) {
	let { definition: c, addNode: l, setPositions: u, addEdge: d, removeEdge: f, removeNode: p, duplicateNodes: m, selectedNodeId: h, setSelectedNodeId: g, updateNodeData: _ } = he(), { screenToFlowPosition: v, fitView: y } = Qt(), b = B(!1), x = L((e) => {
		e && (b.current = !0);
	}, []);
	R(() => {
		let e = ne.current;
		if (!e || typeof ResizeObserver > "u") return;
		let t = {
			w: e.clientWidth,
			h: e.clientHeight
		}, n = new ResizeObserver(() => {
			let n = e.clientWidth, r = e.clientHeight;
			n !== 0 && r !== 0 && (Math.abs(n - t.w) < 2 && Math.abs(r - t.h) < 2 || (t = {
				w: n,
				h: r
			}, !b.current && y(ui)));
		});
		return n.observe(e), () => n.disconnect();
	}, [y]), Ar({
		addNode: l,
		addEdge: d,
		updateNodeData: _,
		getDefinition: () => c
	});
	let [S, C, w] = Zt([]), [T, E, D] = Yt([]), [ee, O] = V(!0), [k, te] = V(!0), ne = B(null), A = B(null), [re, ie] = V(null), [j, M] = V(null), ae = L((e, t) => {
		e.preventDefault(), M({
			nodeId: t.id,
			x: e.clientX,
			y: e.clientY
		});
	}, []), oe = L(() => {
		j && (e?.(j.nodeId), M(null));
	}, [j, e]), se = L(() => {
		if (!j) return;
		let e = j.nodeId;
		typeof navigator < "u" && navigator.clipboard?.writeText && navigator.clipboard.writeText(e).catch(() => {}), M(null);
	}, [j]), N = L(() => {
		j && (o?.(j.nodeId), M(null));
	}, [j, o]), P = L(() => {
		if (!j) return;
		let e = m([j.nodeId]);
		e.length > 0 && g(e[0]), M(null);
	}, [
		j,
		m,
		g
	]), ce = L(() => M(null), []);
	R(() => {
		if (!c) {
			C([]), E([]);
			return;
		}
		C((e) => {
			let t = new Map(e.map((e) => [e.id, e]));
			return c.nodes.map((e) => {
				let n = t.get(e.id), r = hi(e);
				return a && a.size > 0 && (r.data._hasBreakpoint = a.has(e.id)), s && (r.data._pausedAtBreakpoint = e.id === s), n ? {
					...n,
					...r,
					selected: n.selected
				} : r;
			});
		}), E(() => c.edges.map(gi));
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
			let e = ne.current;
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
	let F = L((e) => {
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
	]), le = L((e) => {
		D(e);
		for (let t of e) t.type === "remove" && f(t.id);
	}, [D, f]), ue = L((e) => {
		if (!c || !e.source || !e.target) return;
		let t = c.nodes.find((t) => t.id === e.source), n = c.nodes.find((t) => t.id === e.target);
		if (!t || !n) return;
		let r = e.sourceHandle ?? "out", i = e.targetHandle ?? "in";
		tn(t.type, r, n.type, i) && d({
			source: e.source,
			sourceHandle: r,
			target: e.target,
			targetHandle: i
		});
	}, [c, d]), de = L((e) => {
		if (!c || !e.source || !e.target) return !1;
		let t = c.nodes.find((t) => t.id === e.source), n = c.nodes.find((t) => t.id === e.target);
		return !t || !n ? !1 : tn(t.type, e.sourceHandle ?? "out", n.type, e.targetHandle ?? "in");
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
		ie({
			anchor: {
				x: e.clientX,
				y: e.clientY
			},
			flowPosition: n
		});
	}, [v]), ge = L(() => ie(null), []), _e = L((e, t) => {
		l(e, t);
	}, [l]), ve = z(() => c && c.nodes.some((e) => e.type === "trigger") ? ["trigger"] : [], [c]), { handleDragOver: ye, handleDrop: be } = Mr({
		addNode: l,
		screenToFlowPosition: v
	});
	R(() => {
		let e = (e) => {
			if (!di(e.target) && !(e.metaKey || e.ctrlKey || e.altKey)) {
				if (e.key === "m" || e.key === "M") {
					O((e) => !e);
					return;
				}
				if (e.key === "c" || e.key === "C") {
					te((e) => !e);
					return;
				}
			}
		};
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, []), jr({
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
		clipboardRef: A,
		containerRef: ne
	});
	let xe = L((e) => {
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
		ref: ne,
		className: "flex-1 min-w-0 min-h-[520px] relative bg-surface-inset",
		role: "application",
		"aria-label": "Pipeline editor canvas",
		tabIndex: 0,
		"data-testid": "pipeline-canvas",
		onDragOver: ye,
		onDrop: be,
		onDoubleClick: me,
		children: [
			/* @__PURE__ */ W(qt, {
				nodes: S,
				edges: T,
				nodeTypes: mi,
				edgeTypes: pi,
				onNodesChange: F,
				onEdgesChange: le,
				onConnect: ue,
				isValidConnection: de,
				onNodeClick: fe,
				onNodeContextMenu: ae,
				onPaneClick: pe,
				onMoveStart: x,
				fitView: !0,
				fitViewOptions: ui,
				minZoom: li,
				snapToGrid: !0,
				snapGrid: [16, 16],
				edgesFocusable: !0,
				defaultEdgeOptions: { type: "smoothstep" },
				proOptions: { hideAttribution: !0 },
				children: [
					/* @__PURE__ */ U(Ut, {
						variant: Wt.Dots,
						gap: 16,
						size: 1,
						color: "var(--color-border)",
						bgColor: "var(--color-surface-inset)"
					}),
					k ? /* @__PURE__ */ U(Gt, {
						position: "bottom-left",
						showZoom: !0,
						showFitView: !0,
						showInteractive: !0,
						className: "!bg-surface !border !border-border !rounded-md !shadow-[0_1px_3px_rgba(0,0,0,0.06)]"
					}) : null,
					ee ? /* @__PURE__ */ U(Kt, {
						position: "bottom-right",
						pannable: !0,
						zoomable: !0,
						className: "!bg-surface !border !border-border !rounded-md !w-[180px] !h-[120px]",
						maskColor: "rgba(15, 23, 42, 0.04)",
						nodeColor: xe,
						nodeStrokeColor: "var(--color-border)"
					}) : null
				]
			}),
			re ? /* @__PURE__ */ U(kr, {
				anchor: re.anchor,
				flowPosition: re.flowPosition,
				disabledTypes: ve,
				onClose: ge,
				onInsert: _e
			}) : null,
			/* @__PURE__ */ U(ti, {
				definition: c,
				addNode: l,
				screenToFlowPosition: v,
				containerRef: ne
			}),
			/* @__PURE__ */ U(ci, {
				definition: c,
				setPositions: u,
				fitView: y
			}),
			j ? /* @__PURE__ */ U(Nr, {
				nodeMenu: j,
				breakpoints: a,
				showBreakpointOption: !!o,
				onFilterLog: oe,
				onCopyNodeId: se,
				onDuplicate: P,
				onToggleBreakpoint: N,
				onDismiss: ce
			}) : null
		]
	});
}
function vi({ onFilterLog: e, errorNodeId: t, onErrorNodePosition: n, replayEdgeStates: r, replayNodeClasses: i, breakpoints: a, onToggleBreakpoint: o, pausedAtNodeId: s } = {}) {
	return /* @__PURE__ */ U(Jt, { children: /* @__PURE__ */ U(_i, {
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
var yi = {
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
	Refused: {
		bg: "var(--color-caution-bg)",
		fg: "var(--color-caution)"
	},
	ModelAuth: {
		bg: "var(--color-caution-bg)",
		fg: "var(--color-caution)"
	},
	UnknownError: {
		bg: "var(--color-surface-hover)",
		fg: "var(--color-text-secondary)"
	}
};
function bi(e) {
	switch (e) {
		case "LLMError": return "LLM Error";
		case "TimeoutError": return "Timeout";
		case "NetworkError": return "Network Error";
		case "ValidationError": return "Validation Error";
		case "RegistryConflict": return "Registry Conflict";
		case "Refused": return "Refused";
		case "ModelAuth": return "Model sign-in";
		case "UnknownError": return "Unknown Error";
		default: return String(e);
	}
}
function xi({ error: e, anchor: t, onDismiss: n, onRetry: r }) {
	let i = B(null), [a, o] = V(!1), [s, c] = V(!1), l = B(null);
	R(() => () => {
		l.current && clearTimeout(l.current);
	}, []);
	let u = e.errorCategory ?? "UnknownError", d = yi[u] ?? yi.UnknownError, f = L(async () => {
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
	A(!0, n), R(() => {
		re(i.current);
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
						children: bi(u)
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
function Si(e, t) {
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
function Ci(e) {
	let t = [], n = [], { nodes: r, edges: i } = e, a = /* @__PURE__ */ new Map();
	for (let e of r) a.set(e.id, e);
	return wi(r, t), Ti(r, i, t), Ei(i, a, t), Di(r, t), Fi(r, i, t), Li(r, i, n), Ri(r, i, n), zi(r, i, n), Bi(r, i, n), n.push(...Hi(e)), n.push(...Ui(e)), n.push(...Wi(e)), n.push(...Gi(e)), n.push(...Ki(e)), n.push(...qi(e)), n.push(...Ji(e)), n.push(...Yi(e)), n.push(...Xi(e)), n.push(...Zi(e)), {
		errors: t,
		warnings: n,
		isValid: t.length === 0,
		canPublish: t.length === 0
	};
}
function wi(e, t) {
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
function Ti(e, t, n) {
	let r = Si(e, t);
	r !== null && n.push({
		code: "CYCLE_DETECTED",
		severity: "error",
		message: "Pipeline contains a cycle.",
		edgeId: r
	});
}
function Ei(e, t, n) {
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
		tn(e.type, r.sourceHandle, i.type, r.targetHandle) || n.push({
			code: "INVALID_HANDLE",
			severity: "error",
			message: `Invalid connection: ${e.type}.${r.sourceHandle} → ${i.type}.${r.targetHandle}.`,
			edgeId: r.id
		});
	}
}
function Di(e, t) {
	for (let n of e) switch (n.data.type) {
		case "llm":
			Oi(n.id, n.data, t);
			break;
		case "transform":
			ki(n.id, n.data, t);
			break;
		case "condition":
			Ai(n.id, n.data, t);
			break;
		case "action":
			ji(n.id, n.data, t);
			break;
		case "fork":
			Mi(n.id, n.data, t);
			break;
		case "join":
			Ni(n.id, n.data, t);
			break;
		case "approval": Pi(n.id, n.data, t);
	}
}
function Oi(e, t, n) {
	t.provider || Ii(n, e, "provider"), (!t.model || !t.model.trim()) && Ii(n, e, "model"), (!t.systemPrompt || !t.systemPrompt.trim()) && Ii(n, e, "systemPrompt"), (!t.userPromptTemplate || !t.userPromptTemplate.trim()) && Ii(n, e, "userPromptTemplate");
}
function ki(e, t, n) {
	t.transformType || Ii(n, e, "transformType"), (!t.expression || !t.expression.trim()) && Ii(n, e, "expression");
}
function Ai(e, t, n) {
	(!t.expression || !t.expression.trim()) && Ii(n, e, "expression");
}
function ji(e, t, n) {
	t.actionType || Ii(n, e, "actionType");
}
function Mi(e, t, n) {
	(typeof t.branchCount != "number" || t.branchCount < 2) && n.push({
		code: "MISSING_CONFIG",
		severity: "error",
		message: "Fork requires branchCount ≥ 2.",
		nodeId: e,
		field: "branchCount"
	});
}
function Ni(e, t, n) {
	t.mode || Ii(n, e, "mode"), t.mergeStrategy || Ii(n, e, "mergeStrategy"), t.mode === "n_of_m" && (typeof t.n != "number" || t.n < 1) && n.push({
		code: "MISSING_CONFIG",
		severity: "error",
		message: "Join mode 'n_of_m' requires a numeric n ≥ 1.",
		nodeId: e,
		field: "n"
	});
}
function Pi(e, t, n) {
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
function Fi(e, t, n) {
	let r = /* @__PURE__ */ new Map();
	for (let e of t) r.set(e.target, (r.get(e.target) ?? 0) + 1);
	for (let t of e) t.type === "join" && (r.get(t.id) ?? 0) < 2 && n.push({
		code: "JOIN_INSUFFICIENT_INPUTS",
		severity: "error",
		message: "Join node requires at least 2 incoming edges.",
		nodeId: t.id
	});
}
function Ii(e, t, n) {
	e.push({
		code: "MISSING_CONFIG",
		severity: "error",
		message: `Missing required field '${n}'.`,
		nodeId: t,
		field: n
	});
}
function Li(e, t, n) {
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
function Ri(e, t, n) {
	let r = /* @__PURE__ */ new Set();
	for (let e of t) r.add(e.source);
	for (let t of e) r.has(t.id) || t.data.terminal !== !0 && n.push({
		code: "DEAD_END",
		severity: "warning",
		message: "Node has no outgoing edges.",
		nodeId: t.id
	});
}
function zi(e, t, n) {
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
function Bi(e, t, n) {
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
function Vi(e) {
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
function Hi(e) {
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
		message: `${n.data.type} node '${Vi(n)}' has no error handler — failures will terminate the run.`,
		nodeId: n.id
	}));
	return t;
}
function Ui(e) {
	let t = [];
	for (let n of e.nodes) n.data.type === "llm" && (typeof n.data.maxTokens != "number" || n.data.maxTokens <= 0) && t.push({
		code: "LLM_NO_MAX_TOKENS",
		severity: "warning",
		message: `LLM node '${Vi(n)}' has no maxTokens — responses could run long / expensive.`,
		nodeId: n.id,
		field: "maxTokens"
	});
	return t;
}
function Wi(e) {
	let t = [];
	for (let n of e.nodes) n.data.type === "approval" && (typeof n.data.timeoutMs != "number" || n.data.timeoutMs <= 0) && t.push({
		code: "UNGUARDED_APPROVAL_TIMEOUT",
		severity: "warning",
		message: `Approval '${Vi(n)}' has no timeout — the run could block indefinitely.`,
		nodeId: n.id,
		field: "timeoutMs"
	});
	return t;
}
function Gi(e) {
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
function Ki(e) {
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
function qi(e) {
	let t = [], n = /* @__PURE__ */ new Map();
	for (let t of e.nodes) {
		let e = Vi(t), r = n.get(e) ?? [];
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
function Ji(e) {
	let t = [], n = /\{\{[^}]+\}\}/;
	for (let r of e.nodes) {
		if (r.data.type !== "llm") continue;
		let { temperature: e, userPromptTemplate: i } = r.data;
		typeof e != "number" || e <= .8 || !i || !n.test(i) || t.push({
			code: "LOW_TEMPERATURE_NON_DETERMINISTIC_PROMPT",
			severity: "warning",
			message: `LLM '${Vi(r)}' uses high temperature with templated inputs — outputs will be non-deterministic, pair with a retry or validation downstream.`,
			nodeId: r.id
		});
	}
	return t;
}
function Yi(e) {
	return e.triggerBinding?.event !== "schedule" || e.status !== "draft" ? [] : [{
		code: "NO_PUBLISHED_VERSION_BUT_TRIGGER_SCHEDULED",
		severity: "warning",
		message: "Scheduled trigger on a draft pipeline — schedules won't fire until published."
	}];
}
function Xi(e) {
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
			message: `Condition '${Vi(r)}' has no edge from its 'false' handle — any node intended for the false branch is unreachable.`,
			nodeId: r.id,
			field: "false"
		});
	}
	return t;
}
function Zi(e) {
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
			message: `Fork '${Vi(r)}' branches do not converge in a single Join — parallel branches may diverge or terminate without merging.`,
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
			message: `Join '${Vi(n)}' has no matching upstream Fork — its incoming branches don't share a common Fork ancestor.`,
			nodeId: n.id
		});
	}
	return t;
}
//#endregion
//#region src/components/pipelines/export/toMermaid.ts
function Qi(e, t) {
	return `${e}${t}`;
}
var $i = {
	trigger: "t",
	llm: "llm",
	transform: "x",
	condition: "c",
	action: "a",
	fork: "f",
	join: "j",
	approval: "ap"
}, ea = {
	trigger: "▶",
	llm: "🧠",
	transform: "⚙",
	condition: "❓",
	action: "⚡",
	fork: "🔀",
	join: "🔗",
	approval: "✋"
};
function ta(e) {
	return e.replace(/"/g, "&quot;").replace(/#/g, "&#35;").replace(/\n/g, "<br/>");
}
var na = {
	trigger: "Trigger",
	llm: "LLM",
	transform: "Transform",
	condition: "Condition",
	action: "Action",
	fork: "Fork",
	join: "Join",
	approval: "Approval"
};
function ra(e) {
	let t = ea[e.type] ?? "■", n = na[e.type] ?? e.type.charAt(0).toUpperCase() + e.type.slice(1), r = null;
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
	return ta(r ? `${i}<br/>${r}` : i);
}
function ia(e, t) {
	let n = `"${t}"`;
	switch (e) {
		case "condition": return `{${n}}`;
		case "fork": return `{{${n}}}`;
		case "approval": return `[/${n}\\]`;
		case "llm": return `(${n})`;
		default: return `[${n}]`;
	}
}
function aa(e) {
	return !e || e === "out" ? null : e;
}
function oa(e) {
	let t = ["flowchart TD"], n = {}, r = /* @__PURE__ */ new Map();
	for (let t of e.nodes) {
		let e = $i[t.type] ?? "n", i = n[e] = (n[e] ?? 0) + 1;
		r.set(t.id, Qi(e, i));
	}
	for (let n of e.nodes) {
		let e = r.get(n.id);
		if (!e) continue;
		let i = ia(n.type, ra(n));
		t.push(`  ${e}${i}`);
	}
	for (let n of e.edges) {
		let e = r.get(n.source), i = r.get(n.target);
		if (!e || !i) continue;
		let a = aa(n.sourceHandle);
		a ? t.push(`  ${e} --"${ta(a)}"--> ${i}`) : t.push(`  ${e} --> ${i}`);
	}
	return t.join("\n");
}
//#endregion
//#region src/components/pipelines/versions/diffDefinitions.ts
function sa(e) {
	return JSON.stringify(e, (e, t) => {
		if (t && typeof t == "object" && !Array.isArray(t)) {
			let e = Object.keys(t).sort(), n = {};
			for (let r of e) n[r] = t[r];
			return n;
		}
		return t;
	});
}
function ca(e) {
	let t = /* @__PURE__ */ new Map();
	for (let n of e) t.set(n.id, n);
	return t;
}
function la(e) {
	return new Set(e.edges.map((e) => e.id));
}
function ua(e, t) {
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
	let n = ca(e.nodes), r = ca(t.nodes), i = [], a = [], o = [];
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
		let a = sa(t.data) !== sa(n.data), s = t.position.x !== n.position.x || t.position.y !== n.position.y;
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
	let s = la(e), c = la(t), l = 0, u = 0;
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
var da = {
	trigger: "▶",
	llm: "🧠",
	transform: "⚙",
	condition: "❓",
	action: "⚡",
	fork: "🔀",
	join: "🔗",
	approval: "✋"
};
function fa(e) {
	return e.data.type === "condition" && e.data.label ? e.data.label : e.data.type === "llm" ? e.data.model : e.data.type === "action" ? e.data.actionType : e.data.type === "trigger" ? e.data.triggerType : e.type.charAt(0).toUpperCase() + e.type.slice(1);
}
function pa(e, t, r) {
	let i = e.node, a = da[i.type] ?? "■", o = t !== "removed" && !!r;
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
				children: fa(i)
			}),
			t === "modified" && e.positionChanged ? /* @__PURE__ */ U("span", {
				className: "inline-flex items-center px-1.5 py-px rounded text-[10px] font-semibold bg-warning-bg text-warning-fg",
				children: "moved"
			}) : null
		]
	}, `${t}-${e.node.id}`);
}
function ma({ open: e, onClose: t, currentDef: n, publishedDef: r, onJumpToNode: i }) {
	let a = z(() => ua(n, r), [n, r]), o = (e) => {
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
					}) : a.addedNodes.map((e) => pa(e, "added", o))]
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
					}) : a.removedNodes.map((e) => pa(e, "removed", void 0))]
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
					}) : a.modifiedNodes.map((e) => pa(e, "modified", o))]
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
function ha({ open: e, onClose: t }) {
	return null;
}
//#endregion
//#region src/components/pipelines/EditorModals.tsx
var ga = "px-3 py-1.5 text-[13px] bg-transparent border-none text-text-secondary cursor-pointer font-[inherit]", _a = "px-4 py-[7px] text-[13px] font-semibold bg-danger text-white border-none rounded-[7px] cursor-pointer font-[inherit]";
function va(e) {
	let { publishConfirmOpen: t, onPublishClose: r, onPublishConfirm: i, hasErrors: a, validationErrorCount: o, definitionName: s, definitionVersion: c, deleteConfirmOpen: l, onDeleteClose: u, onDeleteConfirm: d, clearRunsConfirmOpen: f, onClearRunsClose: p, onClearRunsConfirm: m, versionDiffOpen: h, onVersionDiffClose: g, currentDef: _, publishedDef: v, onJumpToNode: y, simPanelOpen: b, onSimPanelClose: x } = e;
	return /* @__PURE__ */ W(H, { children: [
		/* @__PURE__ */ U(C, {
			open: t,
			onClose: r,
			title: "Publish pipeline?",
			maxWidth: 420,
			footer: /* @__PURE__ */ W(H, { children: [/* @__PURE__ */ U("button", {
				onClick: r,
				className: ga,
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
				className: ga,
				children: "Cancel"
			}), /* @__PURE__ */ U("button", {
				onClick: d,
				className: _a,
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
				className: ga,
				children: "Cancel"
			}), /* @__PURE__ */ U("button", {
				onClick: m,
				className: _a,
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
		/* @__PURE__ */ U(ma, {
			open: h,
			onClose: g,
			currentDef: _,
			publishedDef: v,
			onJumpToNode: y
		}),
		/* @__PURE__ */ U(ha, {
			open: b,
			onClose: x
		})
	] });
}
//#endregion
//#region src/components/pipelines/LiveOutputPanel.tsx
function ya({ runId: e, visible: t }) {
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
	fe("*", u), R(() => {
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
				className: n("flex items-center gap-2 py-1.5 cursor-pointer select-none text-[11px] font-semibold border-b border-code-border mb-1.5", e.active ? _.info : _.neutral),
				onClick: () => d(e.stepId),
				role: "button",
				tabIndex: 0,
				onKeyDown: de(() => d(e.stepId)),
				children: [
					/* @__PURE__ */ U("span", {
						className: "text-[10px]",
						children: e.collapsed ? "▶" : "▼"
					}),
					/* @__PURE__ */ U("span", { children: e.stepId }),
					e.active && /* @__PURE__ */ U("span", {
						className: n(_.success, "text-[10px]"),
						children: "streaming"
					})
				]
			}), !e.collapsed && /* @__PURE__ */ W(H, { children: [e.text.length > 0 && /* @__PURE__ */ W("div", {
				className: "whitespace-pre-wrap break-words m-0 mb-3 p-0 text-code-text",
				children: [e.text, e.active && /* @__PURE__ */ U("span", { className: "inline-block w-0.5 h-[14px] bg-code-blue ml-px align-text-bottom [animation:live-output-blink_1s_step-end_infinite]" })]
			}), e.summary && /* @__PURE__ */ W("div", {
				className: n(_.success, "text-[11px] font-semibold pt-1 pb-2 border-b border-code-border mb-2"),
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
function ba(e, t) {
	let n = new Blob([t], { type: "application/json" }), r = URL.createObjectURL(n), i = document.createElement("a");
	i.href = r, i.download = e, document.body.appendChild(i), i.click(), document.body.removeChild(i), URL.revokeObjectURL(r);
}
//#endregion
//#region src/components/pipelines/editor/useEditorRunLifecycle.ts
function xa(e, t) {
	if (!t) return "step";
	let n = e?.nodes.find((e) => e.id === t);
	return n ? n.data.type === "condition" && n.data.label ? n.data.label : n.type.charAt(0).toUpperCase() + n.type.slice(1) : t;
}
function Sa(e) {
	let t = Ce(), { toast: n } = r(), { definition: i, selectedNodeId: a, setSelectedNodeId: o } = he(), s = B(t.runs);
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
		let t = e.error.nodeId, r = xa(c.current, t);
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
		let t = e.stepId, r = xa(c.current, t);
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
	fe("pipeline.run.started", g), fe("pipeline.run.completed", _), fe("pipeline.run.failed", v), fe("pipeline.run.cancelled", y), fe("pipeline.approval.requested", b);
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
	let C = x ? t.runs[x] : void 0, w = !!C && (C.status === "running" || C.status === "pending" || C.status === "awaiting_approval"), [T, E] = V(/* @__PURE__ */ new Set()), [D, ee] = V(null), [O, k] = V(null), [te, ne] = V(null), [A, re] = V(0), [ie, j] = V(!1), [M, ae] = V(null), oe = L((e, t) => {
		t === null ? (k(null), ne(null)) : (k(t), ne(e));
	}, []), se = L((e) => {
		E((t) => {
			let n = new Set(t);
			return n.has(e) ? n.delete(e) : n.add(e), n;
		});
	}, []), N = L(async () => {
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
	]), P = L(() => {
		D && (t.resolveBreakpoint(D.runId, D.stepId, "continue"), ee(null));
	}, [D, t]), ce = L(() => {
		D && (t.resolveBreakpoint(D.runId, D.stepId, "step_over"), ee(null));
	}, [D, t]), F = L(() => {
		D && (t.resolveBreakpoint(D.runId, D.stepId, "resume_all"), ee(null));
	}, [D, t]), le = L(async () => {
		if (!(!D || !O || te !== D.stepId) && Object.keys(O).length !== 0) {
			j(!0);
			try {
				await St(e, D.runId, D.stepId, {
					mode: "merge",
					values: O
				}), k(null), ne(null), re((e) => e + 1), t.resolveBreakpoint(D.runId, D.stepId, "continue"), ee(null);
			} catch (e) {
				if (e instanceof ze) n(`Patch rejected: ${e.reason}`, {
					type: "error",
					durationMs: 8e3
				});
				else if (e instanceof Qe) n(`Apply failed (HTTP ${e.status})`, {
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
				j(!1);
			}
		}
	}, [
		D,
		O,
		te,
		e,
		t,
		n
	]), ue = L(async (t) => {
		if (D) {
			ae(t);
			try {
				await Dt(e, D.runId, D.stepId, t), n("Patch reverted", {
					type: "success",
					durationMs: 3e3
				});
			} catch (e) {
				if (e instanceof Qe) n(`Revert failed (HTTP ${e.status})`, {
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
				ae(null);
			}
		}
	}, [
		D,
		e,
		n
	]), de = L((e) => {
		if ("eventType" in e || !l(e.runId)) return;
		ee({
			runId: e.runId,
			stepId: e.stepId
		});
		let t = xa(c.current, e.stepId);
		n(`Paused at breakpoint: ${t}`, {
			type: "warning",
			durationMs: 6e3
		});
	}, [l, n]);
	fe("pipeline.step.breakpoint", de);
	let pe = L((e) => {
		"eventType" in e || D && D.runId === e.runId && ee(null);
	}, [D]);
	fe("pipeline.run.completed", pe), fe("pipeline.run.failed", pe), fe("pipeline.run.cancelled", pe);
	let me = L(() => {
		u?.nodeId && (t.retryFromStep(u.nodeId), m());
	}, [
		u,
		t,
		m
	]), ge = i?.status === "published", _e = !w && !ge, ve = w ? "Cancel the active run" : ge ? "Start a new run" : "Publish the pipeline to enable runs", [ye, be] = V(!1), [xe, Se] = V({}), [we, Te] = V(!1), [Ee, De] = V("config");
	R(() => {
		a !== null && De("config");
	}, [a]);
	let Oe = L(async (r) => {
		Te(!0);
		try {
			let i = await t.triggerRun(e, r);
			S(i), De("runs"), n(`Pipeline triggered — run ${i.slice(0, 8)}…`, { type: "success" });
		} catch (e) {
			console.error("[PipelineEditor] triggerRun failed", e), n(`Trigger failed: ${e.message}`, { type: "error" });
		} finally {
			Te(!1);
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
			_e || Oe();
		}, [
			w,
			x,
			_e,
			t,
			Oe
		]),
		handleTriggerInputSubmit: L(() => {
			be(!1), Oe(xe);
		}, [Oe, xe]),
		isRunActive: w,
		runDisabled: _e,
		runTitle: ve,
		isTriggering: we,
		triggerInputOpen: ye,
		setTriggerInputOpen: be,
		triggerInputValues: xe,
		setTriggerInputValues: Se,
		breakpoints: T,
		handleToggleBreakpoint: se,
		handleDebugRunClick: N,
		pausedBreakpoint: D,
		handleBreakpointContinue: P,
		handleBreakpointStepOver: ce,
		handleBreakpointResumeAll: F,
		handleApplyAndContinue: le,
		handleRevertPatch: ue,
		applyingPatch: ie,
		revertingPatchId: M,
		dirtyPatch: O,
		dirtyPatchStepId: te,
		handleContextEditBufferChange: oe,
		resetEditBufferKey: A,
		sidebarTab: Ee,
		setSidebarTab: De
	};
}
//#endregion
//#region src/components/pipelines/editor/EditorOverflowMenu.tsx
function Ca({ isPublished: e, showTags: t, hasPublishedVersion: r, onDuplicate: i, onCopyMermaid: a, onViewVersions: o, onRevert: s, onToggleShowTags: c, onViewRunHistory: l, onClearRunHistory: u, onSimPanelOpen: d, onDelete: f }) {
	let p = n("block w-full text-left px-3.5 py-2 text-[13px]", "border-none bg-transparent cursor-pointer font-inherit text-text-primary", "hover:bg-surface-hover"), m = n("block w-full text-left px-3.5 py-2 text-[13px]", "border-none bg-transparent cursor-pointer font-inherit text-danger-fg", "hover:bg-surface-hover");
	return /* @__PURE__ */ W("div", {
		className: n("absolute top-full right-0 mt-1.5 bg-surface border border-border rounded-lg", "shadow-lg p-0 min-w-[200px] max-h-[320px] overflow-y-auto z-20"),
		role: "menu",
		"aria-label": "Editor actions",
		onKeyDown: (e) => At(e, {
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
var wa = {
	neutral: "bg-surface-hover text-text-secondary",
	success: "bg-success-bg text-success-fg",
	warning: "bg-warning-bg text-warning-fg",
	danger: "bg-danger-bg text-danger-fg",
	info: "bg-info-bg text-info-fg"
};
function Ta({ pipelineId: e, definition: t, dirty: r, savingFlash: i, isRunActive: a, isTriggering: o, runDisabled: s, runTitle: c, currentRun: l, breakpoints: u, onRunClick: d, onDebugRunClick: f, onExport: h, onPublishClick: g, onDuplicate: _, onCopyMermaid: v, onViewVersions: b, onRevert: x, onToggleShowTags: S, showTags: C, onViewRunHistory: w, onClearRunHistory: E, onSimPanelOpen: D, onDelete: ee }) {
	let O = Bt(), { rename: k, setIcon: te, setSelectedNodeId: ne } = he(), [A, re] = V(!1), [ie, j] = V(""), M = B(null);
	R(() => {
		A && (j(t.name ?? ""), setTimeout(() => M.current?.focus(), 0));
	}, [A, t.name]);
	let ae = () => {
		let e = ie.trim();
		e && e !== t.name && k(e), re(!1);
	}, oe = z(() => t ? Ci(t) : null, [t]);
	oe?.errors.length;
	let se = t.status === "published", N = r ? {
		label: "Saving…",
		variant: "info"
	} : i ? {
		label: "✓ Saved",
		variant: "success"
	} : {
		label: "✓ Saved",
		variant: "neutral"
	}, P = t.status === "published" ? {
		label: `v${t.version} · Published`,
		variant: "success"
	} : typeof t.publishedVersion == "number" ? {
		label: `v${t.version} · Draft (pub v${t.publishedVersion})`,
		variant: "warning"
	} : {
		label: `v${t.version} · Draft`,
		variant: "neutral"
	}, ce = oe ? oe.errors.length > 0 ? {
		label: `✗ ${oe.errors.length} error${oe.errors.length === 1 ? "" : "s"}`,
		variant: "danger"
	} : oe.warnings.length > 0 ? {
		label: `⚠ ${oe.warnings.length} warning${oe.warnings.length === 1 ? "" : "s"}`,
		variant: "warning"
	} : {
		label: "✓ Valid",
		variant: "success"
	} : {
		label: "…",
		variant: "neutral"
	}, [F, le] = V(!1), ue = B(null);
	wr(ue, () => le(!1), F);
	let de = oe ? [...oe.errors, ...oe.warnings] : [], fe = (e) => {
		e && (ne(e), le(!1));
	}, pe = t.nodes.filter((e) => e.type !== "trigger").length, me = l ? Object.values(l.steps).filter((e) => e.status === "completed" || e.status === "skipped").length : 0, ge = ((l?.startedAt ? Date.now() - new Date(l.startedAt).getTime() : 0) / 1e3).toFixed(1), _e = a && l ? {
		text: `Running (${me}/${pe} steps) · ${ge}s`,
		variant: "running"
	} : l?.status === "completed" ? {
		text: `Completed in ${l.durationMs == null ? "?" : (l.durationMs / 1e3).toFixed(1)}s`,
		variant: "success"
	} : l?.status === "failed" ? {
		text: `Failed at ${xa(t, l.error?.nodeId)}`,
		variant: "error"
	} : {
		text: "",
		variant: "none"
	}, ve = {
		running: "bg-info-bg text-info-fg",
		success: "bg-success-bg text-success-fg",
		error: "bg-danger-bg text-danger-fg"
	}, ye = a ? "⏹ Stop" : l && l.status !== "running" ? "↻ Re-run" : "▶ Run", [be, xe] = V(!1), Se = B(null);
	return wr(Se, () => xe(!1), be), /* @__PURE__ */ W("div", {
		className: n("h-11 shrink-0 flex items-center gap-2.5 px-3", "border-b border-border bg-surface", "sticky top-0 z-5"),
		children: [
			/* @__PURE__ */ U(y, {
				onClick: () => O("/pipelines"),
				"aria-label": "Back to pipelines",
				title: "Back to pipelines",
				children: "←"
			}),
			/* @__PURE__ */ U(p, {
				value: t.icon ?? "🔀",
				onChange: te
			}),
			A ? /* @__PURE__ */ U(T, {
				ref: M,
				value: ie,
				onChange: (e) => j(e.target.value),
				onBlur: ae,
				onKeyDown: (e) => {
					e.key === "Enter" && ae(), e.key === "Escape" && (j(t.name), re(!1));
				},
				"aria-label": "Pipeline name",
				className: "w-[260px] text-sm font-bold",
				"data-testid": "pipeline-name-input"
			}) : /* @__PURE__ */ U("button", {
				type: "button",
				onClick: () => re(!0),
				className: n("px-2 py-1 text-sm font-bold text-text-primary", "bg-transparent border border-transparent rounded-md", "cursor-text font-inherit max-w-[280px]", "overflow-hidden text-ellipsis whitespace-nowrap text-left"),
				title: t.name,
				"data-testid": "pipeline-name",
				children: t.name
			}),
			/* @__PURE__ */ U("span", {
				className: n("inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold font-inherit leading-snug whitespace-nowrap", wa[N.variant]),
				"data-testid": "save-status",
				children: N.label
			}),
			/* @__PURE__ */ U("span", {
				className: n("inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold font-inherit leading-snug whitespace-nowrap", wa[P.variant]),
				"data-testid": "version-badge",
				children: P.label
			}),
			/* @__PURE__ */ W("div", {
				className: "relative",
				ref: ue,
				children: [/* @__PURE__ */ U("button", {
					type: "button",
					onClick: () => le((e) => !e),
					className: n("inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold font-inherit leading-snug whitespace-nowrap", "cursor-pointer border-none", wa[ce.variant]),
					"data-testid": "validation-indicator",
					children: ce.label
				}), F && de.length > 0 && /* @__PURE__ */ U("div", {
					className: n("absolute top-full mt-1.5 bg-surface border border-border rounded-lg", "shadow-lg p-0 min-w-[260px] max-w-[360px] max-h-[320px] overflow-y-auto z-20"),
					children: de.map((e, t) => /* @__PURE__ */ W("button", {
						type: "button",
						onClick: () => fe(e.nodeId),
						className: n("block w-full text-left px-3.5 py-2 text-[13px]", "border-none bg-transparent font-inherit text-text-primary", "flex gap-2 items-start leading-snug", e.nodeId ? "cursor-pointer" : "cursor-default", t < de.length - 1 && "border-b border-border"),
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
			_e.variant !== "none" && /* @__PURE__ */ W("span", {
				className: n("inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-semibold font-inherit leading-snug whitespace-nowrap", ve[_e.variant]),
				"data-testid": "run-status-indicator",
				children: [
					_e.variant === "running" && /* @__PURE__ */ U("span", { className: "inline-block w-3 h-3 border-2 border-border border-t-primary rounded-full animate-spin" }),
					_e.variant === "success" && "✓ ",
					_e.variant === "error" && "✗ ",
					_e.text
				]
			}),
			/* @__PURE__ */ U("div", { className: "flex-1" }),
			/* @__PURE__ */ U(m, {
				variant: "secondary",
				onClick: () => O("/pipelines/metrics"),
				title: "View pipeline metrics dashboard",
				"data-testid": "metrics-button",
				children: "Metrics"
			}),
			/* @__PURE__ */ U(m, {
				variant: "secondary",
				onClick: h,
				title: "Export pipeline as JSON",
				"data-testid": "export-button",
				children: "Export"
			}),
			/* @__PURE__ */ U("button", {
				type: "button",
				onClick: g,
				title: se ? "Already published at this version" : "Publish pipeline to enable runs",
				disabled: se,
				className: n("px-3 py-1.5 text-[13px] font-semibold border-none rounded-md font-inherit shrink-0", se ? "bg-surface-hover text-text-tertiary cursor-default opacity-70" : "bg-success text-white cursor-pointer"),
				"data-testid": "publish-button",
				children: se ? "Published" : "Publish"
			}),
			/* @__PURE__ */ U("button", {
				type: "button",
				onClick: d,
				disabled: s || o,
				title: c,
				className: n("px-3.5 py-1.5 text-[13px] font-semibold text-white border-none rounded-md font-inherit shrink-0", a ? "bg-danger" : "bg-primary", s || o ? "cursor-not-allowed opacity-50" : "cursor-pointer"),
				"data-testid": "run-button",
				children: o ? /* @__PURE__ */ W("span", {
					className: "inline-flex items-center gap-1.5",
					children: [/* @__PURE__ */ U("span", { className: "inline-block w-3 h-3 border-2 border-border border-t-white rounded-full animate-spin" }), "Triggering…"]
				}) : ye
			}),
			u.size > 0 && /* @__PURE__ */ W("button", {
				type: "button",
				onClick: f,
				disabled: s || a,
				title: `Debug run (${u.size} breakpoint${u.size > 1 ? "s" : ""})`,
				className: n("px-3.5 py-1.5 text-[13px] font-semibold bg-warning text-white", "border-none rounded-md font-inherit shrink-0", s || a ? "cursor-not-allowed opacity-50" : "cursor-pointer"),
				"data-testid": "debug-run-button",
				children: [
					"Debug (",
					u.size,
					")"
				]
			}),
			/* @__PURE__ */ W("div", {
				className: "relative",
				ref: Se,
				children: [/* @__PURE__ */ U(y, {
					onClick: () => xe((e) => !e),
					"aria-label": "More actions",
					"data-testid": "overflow-menu-btn",
					children: "⋯"
				}), be && /* @__PURE__ */ U(Ca, {
					isPublished: se,
					showTags: C,
					onDuplicate: () => {
						_(), xe(!1);
					},
					onCopyMermaid: () => {
						v(), xe(!1);
					},
					onViewVersions: () => {
						b(), xe(!1);
					},
					onRevert: () => {
						x(), xe(!1);
					},
					onToggleShowTags: () => {
						S(), xe(!1);
					},
					onViewRunHistory: () => {
						w(), xe(!1);
					},
					onClearRunHistory: () => {
						E(), xe(!1);
					},
					onSimPanelOpen: () => {
						D(), xe(!1);
					},
					onDelete: () => {
						ee(), xe(!1);
					},
					hasPublishedVersion: typeof t.publishedVersion == "number"
				})]
			})
		]
	});
}
//#endregion
//#region src/components/pipelines/context-inspector/ContextJsonTree.tsx
var Ea = 12;
function Da(e) {
	return n("text-xs", {
		string: "text-code-green",
		number: "text-code-peach",
		boolean: "text-code-mauve",
		null: "text-code-muted",
		bracket: "text-code-comment"
	}[e]);
}
var Oa = "bg-[rgba(166,227,161,0.08)] rounded-sm px-0.5", ka = "text-code-green font-bold bg-[rgba(166,227,161,0.1)] rounded-sm px-0.5";
function Aa({ data: e, depth: t = 0, highlightKeys: r, keyName: i, isHighlighted: a = !1 }) {
	let [o, s] = V(t > 2);
	if (t > Ea) return /* @__PURE__ */ U("span", {
		className: Da("string"),
		children: "[max depth]"
	});
	let c = a || i != null && r?.has(i);
	if (e === null) return /* @__PURE__ */ U("span", {
		className: n(Da("null"), c && Oa),
		children: "null"
	});
	if (e === void 0) return /* @__PURE__ */ U("span", {
		className: n(Da("null"), c && Oa),
		children: "undefined"
	});
	if (typeof e == "boolean") return /* @__PURE__ */ U("span", {
		className: n(Da("boolean"), c && Oa),
		children: String(e)
	});
	if (typeof e == "number") return /* @__PURE__ */ U("span", {
		className: n(Da("number"), c && Oa),
		children: String(e)
	});
	if (typeof e == "string") {
		let t = e.length > 120 ? e.slice(0, 120) + "..." : e;
		return /* @__PURE__ */ W("span", {
			className: n(Da("string"), c && Oa),
			children: [
				"\"",
				t,
				"\""
			]
		});
	}
	if (Array.isArray(e)) return e.length === 0 ? /* @__PURE__ */ U("span", {
		className: Da("bracket"),
		children: "[]"
	}) : /* @__PURE__ */ W("span", { children: [
		/* @__PURE__ */ U("span", {
			className: "cursor-pointer select-none text-[9px] mr-1 text-code-muted inline-block w-3 text-center",
			onClick: () => s((e) => !e),
			role: "button",
			tabIndex: 0,
			onKeyDown: de(() => s((e) => !e)),
			children: o ? "▶" : "▼"
		}),
		/* @__PURE__ */ U("span", {
			className: Da("bracket"),
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
					/* @__PURE__ */ U(Aa, {
						data: n,
						depth: t + 1,
						highlightKeys: r
					}),
					i < e.length - 1 && /* @__PURE__ */ U("span", {
						className: Da("bracket"),
						children: ","
					})
				]
			}, i))
		}),
		/* @__PURE__ */ U("span", {
			className: Da("bracket"),
			children: "]"
		})
	] });
	if (typeof e == "object") {
		let i = Object.entries(e);
		return i.length === 0 ? /* @__PURE__ */ U("span", {
			className: Da("bracket"),
			children: "{}"
		}) : /* @__PURE__ */ W("span", { children: [
			/* @__PURE__ */ U("span", {
				className: "cursor-pointer select-none text-[9px] mr-1 text-code-muted inline-block w-3 text-center",
				onClick: () => s((e) => !e),
				role: "button",
				tabIndex: 0,
				onKeyDown: de(() => s((e) => !e)),
				children: o ? "▶" : "▼"
			}),
			/* @__PURE__ */ U("span", {
				className: Da("bracket"),
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
								className: n("text-xs font-medium text-code-blue", c && ka),
								children: e
							}),
							/* @__PURE__ */ U("span", {
								className: Da("bracket"),
								children: ": "
							}),
							/* @__PURE__ */ U(Aa, {
								data: o,
								depth: t + 1,
								highlightKeys: t === 0 ? r : void 0,
								keyName: e,
								isHighlighted: c
							}),
							s < i.length - 1 && /* @__PURE__ */ U("span", {
								className: Da("bracket"),
								children: ","
							})
						]
					}, e);
				})
			}),
			/* @__PURE__ */ U("span", {
				className: Da("bracket"),
				children: "}"
			})
		] });
	}
	return /* @__PURE__ */ U("span", {
		className: Da("string"),
		children: String(e)
	});
}
//#endregion
//#region src/components/pipelines/context-inspector/ContextStepList.tsx
function ja({ snapshots: e, activeStepId: t, fallbackActiveStepId: r, onStepSelect: i }) {
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
				onKeyDown: i ? de(() => i(e.stepId)) : void 0,
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
var Ma = [{
	value: "true",
	label: "true"
}, {
	value: "false",
	label: "false"
}];
function Na(e) {
	return typeof e == "string" ? "string" : typeof e == "number" ? "number" : typeof e == "boolean" ? "boolean" : "object";
}
function Pa({ k: e, initial: t, onCommit: n, onError: r, onFocus: i }) {
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
function Fa({ inputContext: e, buffer: t, parseErrors: r, newKeyDraft: i, setNewKeyDraft: a, onCommitNewKey: o, onBeginEditKey: s, onSetValue: c, onRemoveKey: l, onParseError: u }) {
	let d = z(() => {
		let n = /* @__PURE__ */ new Set([...Object.keys(e), ...Object.keys(t)]);
		return Array.from(n);
	}, [e, t]), f = "w-full px-1.5 py-1 text-xs bg-code-bg text-code-text border border-code-border rounded-sm font-mono";
	return /* @__PURE__ */ W("div", {
		"data-testid": "context-edit-table",
		children: [d.map((i) => {
			let a = i in t, o = a ? t[i] : e[i], d = Na(o), p = a;
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
						children: [d === "boolean" ? /* @__PURE__ */ U(E, {
							size: "sm",
							"aria-label": `${i} value`,
							"data-testid": `context-edit-input-${i}`,
							value: String(o),
							onChange: (e) => c(i, e.target.value === "true"),
							onFocus: () => s(i, o),
							options: Ma,
							className: "h-auto py-1 bg-code-bg text-code-text border-code-border rounded-sm font-mono"
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
						}) : /* @__PURE__ */ U(Pa, {
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
function Ia(e, t, n) {
	let r = { ...e }, i = { ...r.steps ?? {} };
	return i[t] = n, r.steps = i, n && typeof n == "object" && !Array.isArray(n) && Object.assign(r, n), r;
}
function La(e, t) {
	let n = [];
	for (let r of Object.keys(t)) r in e || n.push(r);
	return n;
}
function Ra(e) {
	let t = Object.values(e.steps).filter((e) => e != null).sort((e, t) => (e.startedAt ? Date.parse(e.startedAt) : 0) - (t.startedAt ? Date.parse(t.startedAt) : 0)), n = [], r = {};
	e.triggeredBy?.payload && typeof e.triggeredBy.payload == "object" && (r = { ...e.triggeredBy.payload });
	for (let e of t) {
		let t = { ...r }, i = e.output, a = e.llm?.prompt, o;
		if (i !== void 0) o = Ia(r, e.nodeId, i);
		else {
			o = { ...r };
			let t = { ...o.steps ?? {} };
			t[e.nodeId] = i, o.steps = t;
		}
		let s = La(t, o);
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
function za(e, t) {
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
	fe("*", s);
	let c = z(() => e ? Ra(e) : [], [e]), l = z(() => c.map((e) => {
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
function Ba({ attempt: e, label: t }) {
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
				children: [/* @__PURE__ */ U(g, {
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
				className: n("text-[11px] font-mono mb-1.5 px-2 py-1.5 rounded whitespace-pre-wrap break-words", v.danger),
				children: e.error
			}),
			e.output !== void 0 && /* @__PURE__ */ W("div", { children: [/* @__PURE__ */ U("div", {
				className: "text-[10px] text-code-muted font-semibold mb-1 uppercase",
				children: "Output"
			}), /* @__PURE__ */ U(Aa, {
				data: e.output,
				depth: 0
			})] })
		]
	});
}
function Va({ run: e, activeStepId: t, onStepSelect: r, editable: i = !1, onEditBufferChange: a, resetEditBufferKey: o }) {
	let [s, c] = V("input"), [l, u] = V(0), [d, f] = V(!1), [p, m] = V({}), [h, _] = V(null), [v, y] = V({}), [b, x] = V({
		key: "",
		value: ""
	}), { enrichedSnapshots: S, activeSnapshot: C, newKeysSet: w } = za(e, t), T = C?.resolvedPrompt != null, E = C?.stepExecution.attempts, D = (E?.length ?? 0) >= 2;
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
		O ? h && h !== t && (m({}), _(null), y({})) : (d && f(!1), Object.keys(p).length > 0 && m({}), h && _(null), Object.keys(v).length > 0 && y({}));
	}, [O, t]), R(() => {
		o !== void 0 && (m({}), _(null), y({}), x({
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
	let k = L((e, n) => {
		_(t), m((t) => e in t ? t : {
			...t,
			[e]: n
		});
	}, [t]), te = L((e, n) => {
		_(t), m((t) => ({
			...t,
			[e]: n
		})), y((t) => {
			if (!(e in t)) return t;
			let n = { ...t };
			return delete n[e], n;
		});
	}, [t]), ne = L((e) => {
		m((t) => {
			if (!(e in t)) return t;
			let n = { ...t };
			return delete n[e], n;
		}), y((t) => {
			if (!(e in t)) return t;
			let n = { ...t };
			return delete n[e], n;
		});
	}, []), A = L((e, t) => {
		y((n) => ({
			...n,
			[e]: t
		}));
	}, []), re = L(() => {
		m({}), _(null), y({}), x({
			key: "",
			value: ""
		});
	}, []), ie = L(() => {
		let e = b.key.trim();
		if (!e) return;
		let t = b.value, n = b.value;
		if (n.trim().length > 0) try {
			t = JSON.parse(n);
		} catch {
			t = n;
		}
		te(e, t), x({
			key: "",
			value: ""
		});
	}, [b, te]);
	return !e || S.length === 0 ? /* @__PURE__ */ W("div", {
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
				children: [/* @__PURE__ */ U(ja, {
					snapshots: S,
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
								onClick: re,
								"data-testid": "context-inspector-discard",
								className: "px-2 py-0.5 text-[10px] font-semibold bg-transparent text-code-red border border-code-border rounded-sm cursor-pointer font-mono",
								children: "Discard changes"
							}), /* @__PURE__ */ U("button", {
								type: "button",
								onClick: () => {
									let e = !d;
									f(e), e || re();
								},
								"data-testid": "context-inspector-edit-toggle",
								className: n("px-2 py-0.5 text-[10px] font-semibold border rounded-sm cursor-pointer font-mono uppercase tracking-wide", d ? "bg-warning text-white border-warning" : "bg-transparent text-warning-fg border-warning"),
								children: d ? "Editing" : "Edit"
							})]
						})]
					}), Object.keys(C.inputContext).length === 0 && !(O && d) ? /* @__PURE__ */ U("div", {
						className: "text-code-muted text-xs italic",
						children: "No input context (first step or no upstream output)"
					}) : O && d ? /* @__PURE__ */ U(Fa, {
						inputContext: C.inputContext,
						buffer: p,
						parseErrors: v,
						newKeyDraft: b,
						setNewKeyDraft: x,
						onCommitNewKey: ie,
						onBeginEditKey: k,
						onSetValue: te,
						onRemoveKey: ne,
						onParseError: A
					}) : /* @__PURE__ */ U(Aa, {
						data: C.inputContext,
						highlightKeys: w
					})] }) : s === "output" ? /* @__PURE__ */ W("div", { children: [
						/* @__PURE__ */ W("div", {
							className: "mb-2 text-[10px] text-code-muted font-semibold uppercase",
							children: ["Output", C.stepId ? ` — step ${C.stepId.slice(0, 8)}` : ""]
						}),
						/* @__PURE__ */ U(Aa, { data: C.output }),
						C.newKeys.length > 0 && /* @__PURE__ */ W("div", {
							className: "mt-3",
							children: [/* @__PURE__ */ U("div", {
								className: "text-[10px] text-code-green font-semibold uppercase mb-1",
								children: "New context keys added"
							}), /* @__PURE__ */ U("div", {
								className: "flex flex-wrap gap-1",
								children: C.newKeys.map((e) => /* @__PURE__ */ U(g, {
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
										children: [/* @__PURE__ */ U(g, {
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
						children: [/* @__PURE__ */ U(Ba, {
							attempt: E[l],
							label: `Attempt ${l + 1}`
						}), /* @__PURE__ */ U(Ba, {
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
function Ha({ definition: e, pausedBreakpoint: t, applyingPatch: r, revertingPatchId: i, dirtyPatch: a, dirtyPatchStepId: o, resetEditBufferKey: s, onContinue: c, onStepOver: l, onResumeAll: u, onApplyAndContinue: d, onRevertPatch: f, onEditBufferChange: p }) {
	let m = Ce().runs[t.runId] ?? null, h = m?.steps?.[t.stepId]?.patches ?? [], g = !!a && o === t.stepId && Object.keys(a).length > 0, _ = m?.status === "paused_at_breakpoint";
	return /* @__PURE__ */ W("div", {
		"data-testid": "breakpoint-pause-overlay",
		className: n("absolute top-14 left-1/2 -translate-x-1/2 z-30", "bg-surface border-2 border-warning rounded-lg", "px-4 py-3 shadow-[0_8px_24px_rgba(217,119,6,0.2)]", "flex flex-col gap-3 font-inherit", "w-[min(900px,92vw)] max-h-[calc(100vh-120px)]"),
		children: [/* @__PURE__ */ W("div", {
			className: "flex items-center gap-3 flex-wrap",
			children: [
				/* @__PURE__ */ W("span", {
					className: "text-[13px] font-semibold text-warning-fg",
					children: ["Paused at: ", xa(e, t.stepId)]
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
				children: m ? /* @__PURE__ */ U(Va, {
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
function Ua(e) {
	return e == null ? "--" : e < 1e3 ? `${Math.round(e)}ms` : e < 6e4 ? `${(e / 1e3).toFixed(1)}s` : `${Math.floor(e / 6e4)}m ${Math.floor(e % 6e4 / 1e3)}s`;
}
function Wa(e) {
	if (!e) return "--";
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? "--" : new Intl.DateTimeFormat(void 0, {
		month: "short",
		day: "numeric",
		hour: "numeric",
		minute: "2-digit"
	}).format(t);
}
function Ga(e) {
	let t = Date.now() - new Date(e).getTime();
	return t < 6e4 ? "just now" : t < 36e5 ? `${Math.floor(t / 6e4)}m ago` : t < 864e5 ? `${Math.floor(t / 36e5)}h ago` : t < 2592e5 ? `${Math.floor(t / 864e5)}d ago` : new Date(e).toLocaleDateString();
}
//#endregion
//#region src/components/pipelines/nodes/shared/ConfigField.tsx
function X({ label: e, required: t, help: r, error: i, controlId: a, render: o, children: s, className: c }) {
	let l = Rt(), u = `${l}-label`, d = i || r ? `${l}-desc` : void 0;
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
function Ka({ title: e, defaultCollapsed: t = !1, children: r, className: i }) {
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
function qa({ children: e, className: t }) {
	return /* @__PURE__ */ U("div", {
		className: n("flex flex-col gap-3 px-4 py-3", t),
		children: e
	});
}
//#endregion
//#region src/components/pipelines/nodes/shared/SamplePills.tsx
function Ja({ samples: e, onSelect: t, "aria-label": r = "Suggestions", className: i }) {
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
function Ya(e) {
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
function Xa(e, t) {
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
function Za(e, t, n) {
	let r = new Map(e.map((e) => [e.id, e])), i = [], a = /* @__PURE__ */ new Set(), o = (e) => {
		a.has(e.path) || (a.add(e.path), i.push(e));
	};
	for (let e of Xa(t, n)) {
		let t = r.get(e);
		t && Ya(t).forEach(o);
	}
	if (!a.has("context.trigger")) {
		let t = e.find((e) => e.type === "trigger");
		t && Ya(t).forEach(o);
	}
	return i;
}
function Qa(e, t) {
	let n = new Set(t.map((e) => e.path)), r = /* @__PURE__ */ new Set();
	for (let t of e.matchAll(/\{\{\s*([\w.[\]-]+)\s*\}\}/g)) r.add(t[1]);
	return [...r].filter((e) => !n.has(e) && ![...n].some((t) => e.startsWith(`${t}.`)));
}
var $a = /* @__PURE__ */ new Set([
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
function eo(e, t, n) {
	let r = new Map(e.map((e) => [e.id, e])), i = [], a = /* @__PURE__ */ new Set(), o = (e) => {
		a.has(e.path) || (a.add(e.path), i.push(e));
	};
	for (let e of Xa(t, n)) {
		let t = r.get(e);
		if (!t || !$a.has(t.type)) continue;
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
	for (let e of Xa(t, n)) if (r.get(e)?.type === "scatter") {
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
function to(e) {
	let t = Lt(Re)?.definition ?? null, n = t?.nodes ?? [], r = t?.edges ?? [], i = z(() => e ? Za(n, r, e) : [], [
		n,
		r,
		e
	]);
	return z(() => ({
		paths: i,
		unresolved: (e) => Qa(e, i)
	}), [i]);
}
function no(e) {
	let t = Lt(Re)?.definition ?? null, n = t?.nodes ?? [], r = t?.edges ?? [];
	return z(() => e ? eo(n, r, e) : [], [
		n,
		r,
		e
	]);
}
//#endregion
//#region src/components/pipelines/nodes/shared/SourceImagePathField.tsx
function ro({ value: e, onChange: t, nodeId: n, label: r = "Source image path", help: i = "Optional. Defaults to the image produced upstream.", placeholder: a = "$.trigger.imageRef" }) {
	let o = no(n ?? null), s = Rt();
	return /* @__PURE__ */ U(X, {
		label: r,
		help: i,
		controlId: s,
		render: ({ describedById: n, controlId: r }) => /* @__PURE__ */ W(H, { children: [/* @__PURE__ */ U(T, {
			id: r,
			"aria-describedby": n,
			size: "sm",
			mono: !0,
			spellCheck: !1,
			value: e ?? "",
			onChange: (e) => t(e.target.value.trim() || void 0),
			placeholder: a
		}), /* @__PURE__ */ U(Ja, {
			samples: o.map((e) => e.path),
			onSelect: t,
			"aria-label": "Upstream image refs"
		})] })
	});
}
//#endregion
//#region src/components/pipelines/nodes/shared/ToggleField.tsx
function io({ label: e, checked: t, onChange: n, help: r, disabled: i, "data-testid": a }) {
	return /* @__PURE__ */ W("div", {
		className: "flex flex-col",
		children: [/* @__PURE__ */ W("div", {
			className: "flex items-center gap-2",
			children: [/* @__PURE__ */ U(ae, {
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
var ao = [
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
function oo(e, t, n) {
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
function so(e) {
	if (typeof e != "string") return null;
	let t = e.trim().split(/\s+/);
	if (t.length !== 5) return null;
	let n = {};
	for (let e = 0; e < 5; e++) {
		let r = ao[e], i = oo(t[e], r.min, r.max);
		if (!i) return null;
		n[r.name] = i;
	}
	return n;
}
function co(e, t, n) {
	return e.match === "*" ? !e.step || e.step === 1 || (t - n) % e.step === 0 : e.match.includes(t);
}
function lo(e, t) {
	return co(e.minute, t.getMinutes(), 0) && co(e.hour, t.getHours(), 0) && co(e.dayOfMonth, t.getDate(), 1) && co(e.month, t.getMonth() + 1, 1) && co(e.dayOfWeek, t.getDay(), 0);
}
function uo(e, t, n) {
	if (n <= 0) return [];
	let r = [], i = new Date(t.getTime());
	i.setSeconds(0, 0), i.setMinutes(i.getMinutes() + 1);
	let a = new Date(i.getTime());
	for (let t = 0; t < 527040 && r.length < n; t++) lo(e, a) && r.push(new Date(a.getTime())), a.setMinutes(a.getMinutes() + 1);
	return r;
}
//#endregion
//#region src/components/pipelines/nodes/trigger/TriggerConfig.tsx
var fo = /^[a-zA-Z0-9_-]{1,64}$/, po = "http://localhost:13001";
function mo() {
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
var ho = [
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
function go({ data: e, onChange: t }) {
	let n = Rt(), { toast: i } = r(), a = Lt(Re)?.definition?.triggerBinding?.webhookSecret, [o, s] = V(!1), c = at(), l = c.enabled, u = c.publicUrlBase ?? po, d = e.triggerType.startsWith("document."), f = z(() => d ? mo() : [], [d]), p = d && !e.documentTypeId, m = e.triggerType === "schedule" && !e.schedule, h = e.triggerType === "webhook" && !e.webhookPath, g = e.webhookPath ?? "", _ = e.triggerType === "webhook" && g.length > 0 && !fo.test(g), v = e.triggerType === "webhook" && fo.test(g) ? `${u}/hooks/pipeline/${g}` : null, y = () => {
		v && navigator.clipboard.writeText(v).then(() => i("Webhook URL copied", { type: "success" })).catch(() => i("Could not copy webhook URL", { type: "error" }));
	}, x = () => {
		a && navigator.clipboard.writeText(a).then(() => i("Webhook secret copied", { type: "success" })).catch(() => i("Could not copy webhook secret", { type: "error" }));
	}, S = e.triggerType === "schedule" ? e.schedule ?? "" : "", C = z(() => S ? so(S) : null, [S]), w = z(() => C ? uo(C, /* @__PURE__ */ new Date(), 3) : [], [C]), D = e.triggerType === "schedule" && !!S && !C, ee = e.triggerType === "document.finalize" ? "On finalize" : e.triggerType === "document.submit" ? "On submit for review" : e.triggerType === "document.comment" ? "On comment added" : "";
	return /* @__PURE__ */ W(qa, { children: [
		/* @__PURE__ */ U(X, {
			label: "Trigger type",
			required: !0,
			controlId: `${n}-trigger-type`,
			render: ({ controlId: n, describedById: r }) => /* @__PURE__ */ U(E, {
				size: "sm",
				id: n,
				"aria-describedby": r,
				value: e.triggerType,
				onChange: (e) => t({ triggerType: e.target.value }),
				options: ho
			})
		}),
		d && /* @__PURE__ */ U(X, {
			label: "Document type",
			required: !0,
			error: p ? "Select a document type." : void 0,
			help: p ? void 0 : "Which document type should trigger this pipeline.",
			controlId: `${n}-document-type`,
			render: ({ controlId: n, describedById: r }) => /* @__PURE__ */ W(H, { children: [/* @__PURE__ */ U(E, {
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
			}), ee && /* @__PURE__ */ W("div", {
				className: "text-[11px] text-text-tertiary mt-1.5",
				children: ["Event: ", /* @__PURE__ */ U("span", {
					className: "font-semibold text-text-secondary",
					children: ee
				})]
			})] })
		}),
		e.triggerType === "schedule" && /* @__PURE__ */ U(X, {
			label: "Schedule (cron)",
			required: !0,
			error: m ? "Cron expression is required." : D ? "Invalid cron expression — supports *, */N, N,M, A-B, exact values." : void 0,
			help: !m && !D ? "5-field cron: minute hour day month weekday." : void 0,
			controlId: `${n}-schedule`,
			render: ({ controlId: n, describedById: r }) => /* @__PURE__ */ W(H, { children: [/* @__PURE__ */ U(T, {
				size: "sm",
				mono: !0,
				spellCheck: !1,
				invalid: m || D,
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
					render: ({ controlId: e, describedById: n }) => /* @__PURE__ */ U(T, {
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
				!l && /* @__PURE__ */ U(b, {
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
						onClick: y,
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
var _o = {
	maxAttempts: 3,
	backoffMs: 1e3,
	backoffMultiplier: 2
}, vo = 3e4;
function yo(e) {
	return e < 1e3 ? `${Math.round(e)}ms` : e < 6e4 ? `${(e / 1e3).toFixed(+(e < 1e4))}s` : `${Math.round(e / 6e4)}m`;
}
function bo(e) {
	let t = [];
	for (let n = 1; n < e.maxAttempts; n++) {
		let r = e.backoffMs * e.backoffMultiplier ** (n - 1);
		t.push(Math.min(r, vo));
	}
	return t;
}
function xo({ value: e, onChange: t }) {
	let n = e !== void 0, r = e ?? _o, i = n ? bo(r) : [], a = i.reduce((e, t) => e + t, 0) > 3e5;
	return /* @__PURE__ */ W("div", {
		"data-testid": "retry-policy-editor",
		className: "flex flex-col gap-1.5",
		children: [/* @__PURE__ */ U(io, {
			label: "Retry policy",
			checked: n,
			onChange: (e) => t(e ? _o : void 0),
			help: n ? void 0 : "No retries — failure is terminal on first attempt.",
			"data-testid": "retry-policy-enabled"
		}), n && /* @__PURE__ */ W(H, { children: [
			/* @__PURE__ */ W("div", {
				className: "grid grid-cols-3 gap-2 mt-1",
				children: [
					/* @__PURE__ */ W("div", { children: [/* @__PURE__ */ U("label", {
						className: "text-[11px] font-semibold text-text-secondary",
						children: "Max attempts"
					}), /* @__PURE__ */ U(P, {
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
					}), /* @__PURE__ */ U(P, {
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
					}), /* @__PURE__ */ U(P, {
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
				children: r.maxAttempts === 1 ? "Effectively no retry (1 attempt)." : i.length === 0 ? `Retries up to ${r.maxAttempts}× with no delay.` : `Retries up to ${r.maxAttempts}× with delays: ${i.map(yo).join(", ")}.`
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
var So = {
	string: "bg-info-bg text-info-fg border-info-border",
	number: "bg-accent-bg text-accent-fg border-accent-border",
	boolean: "bg-warning-bg text-warning-fg border-warning-border",
	object: "bg-neutral-bg text-neutral-fg border-neutral-border",
	array: "bg-neutral-bg text-neutral-fg border-neutral-border",
	image: "bg-success-bg text-success-fg border-success-border"
};
function Co({ paths: e, unresolved: t = [], onInsert: r, onRevealNode: i, className: a }) {
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
					className: n("rounded-full border px-2 py-0.5 font-mono text-[10px] cursor-pointer", "hover:brightness-95 transition-[filter]", So[e.kind]),
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
var wo = [
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
], To = {
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
function Eo(e, t) {
	switch (t) {
		case "image": return `<image from ${e}>`;
		case "number": return "123";
		case "boolean": return "true";
		case "array": return "[ … ]";
		case "object": return "{ … }";
		default: return `<${e}>`;
	}
}
function Do(e, t) {
	return e.replace(/\{\{\s*([\w.[\]-]+)\s*\}\}/g, (e, n) => {
		let r = t.get(n);
		return r ? Eo(n, r) : `{{${n}}}`;
	});
}
function Oo({ data: e, onChange: t, nodeId: n }) {
	let r = Rt(), [i, a] = V(!1), { paths: o, unresolved: c } = to(n ?? null), l = new Map(o.map((e) => [e.path, e.kind])), u = c(`${e.systemPrompt ?? ""}\n${e.userPromptTemplate ?? ""}`), d = !e.systemPrompt?.trim(), f = !e.userPromptTemplate?.trim(), p = ut(), m = (e) => p(`llm:${e}`, (To[e] ?? []).map((e) => ({ value: e }))), h = m(e.provider), g = e.model && !h.some((t) => t.value === e.model) ? [{ value: e.model }, ...h] : h, _ = wo.some((t) => t.value === e.provider) ? wo : [...wo, {
		value: String(e.provider ?? ""),
		label: `${String(e.provider ?? "")} (unrecognised)`
	}], v = (n) => {
		let r = m(n).map((e) => e.value);
		t({
			provider: n,
			model: r.includes(e.model) ? e.model : r[0] ?? e.model
		});
	};
	return /* @__PURE__ */ W(qa, { children: [
		/* @__PURE__ */ U(X, {
			label: "Provider",
			required: !0,
			controlId: `${r}-provider`,
			render: ({ controlId: t, describedById: n }) => /* @__PURE__ */ U(E, {
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
			render: ({ controlId: n, describedById: r }) => /* @__PURE__ */ U(E, {
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
				children: /* @__PURE__ */ U(Co, {
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
			render: ({ controlId: n, describedById: r }) => /* @__PURE__ */ U(N, {
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
			children: /* @__PURE__ */ U(s, {
				value: e.userPromptTemplate,
				onChange: (e) => t({ userPromptTemplate: e }),
				language: "template",
				variables: o.map((e) => e.path),
				minLines: 6,
				"aria-label": "User prompt template"
			})
		}),
		/* @__PURE__ */ W(Ka, {
			title: "Advanced",
			defaultCollapsed: !0,
			children: [
				/* @__PURE__ */ U(X, {
					label: "Temperature",
					help: "0 = deterministic, 1 = creative.",
					children: /* @__PURE__ */ U(oe, {
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
					render: ({ controlId: n, describedById: r }) => /* @__PURE__ */ U(P, {
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
				/* @__PURE__ */ U("div", { children: /* @__PURE__ */ U(io, {
					label: "Streaming",
					checked: e.streaming,
					onChange: (e) => t({ streaming: e }),
					help: "Stream tokens as they are generated.",
					"data-testid": "llm-streaming"
				}) }),
				/* @__PURE__ */ U(xo, {
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
					children: Do(e.systemPrompt || "(empty)", l)
				})] }),
				/* @__PURE__ */ W("div", { children: [/* @__PURE__ */ U("div", {
					className: "text-[11px] font-semibold text-text-secondary mb-1",
					children: "Resolved user prompt"
				}), /* @__PURE__ */ U("pre", {
					className: "text-xs whitespace-pre-wrap break-words m-0 text-text-primary bg-surface p-2 rounded-md border border-border max-h-[200px] overflow-auto",
					children: Do(e.userPromptTemplate || "(empty)", l)
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
var ko = [
	"context",
	"context.steps",
	"context.trigger"
], Ao = [
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
function jo({ data: e, onChange: t }) {
	let n = Rt(), r = !e.expression?.trim();
	return /* @__PURE__ */ W(qa, { children: [
		/* @__PURE__ */ U(X, {
			label: "Type",
			required: !0,
			render: ({ labelId: n }) => /* @__PURE__ */ U("div", {
				role: "group",
				"aria-labelledby": n,
				children: /* @__PURE__ */ U(c, {
					name: "transform-type",
					value: e.transformType,
					onChange: (e) => t({ transformType: e }),
					options: Ao.map((e) => ({
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
			children: /* @__PURE__ */ U(s, {
				value: e.expression,
				onChange: (e) => t({ expression: e }),
				language: e.transformType === "javascript" ? "javascript" : "jsonpath",
				variables: ko,
				"aria-label": "Expression"
			})
		}),
		/* @__PURE__ */ U(X, {
			label: "Output key (optional)",
			help: `If set, writes to context.${e.outputKey || "outputKey"}. Otherwise merges into root context.`,
			controlId: `${n}-output-key`,
			render: ({ controlId: n, describedById: r }) => /* @__PURE__ */ U(T, {
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
		/* @__PURE__ */ U(xo, {
			value: e.retryPolicy,
			onChange: (e) => t({ retryPolicy: e })
		}),
		/* @__PURE__ */ U(X, {
			label: "Preview",
			children: /* @__PURE__ */ U(k, {
				title: "Preview not available yet",
				body: "Sample input and output for a transform will render here once the preview runner ships."
			})
		})
	] });
}
//#endregion
//#region src/components/pipelines/nodes/condition/ConditionConfig.tsx
var Mo = ["context.trigger", "context.steps"];
function No({ data: e, onChange: t }) {
	let n = Rt(), r = !e.expression?.trim();
	return /* @__PURE__ */ W(qa, { children: [/* @__PURE__ */ U(X, {
		label: "Expression",
		required: !0,
		error: r ? "Expression is required." : void 0,
		help: r ? void 0 : "e.g. context.llm.response.length > 500",
		children: /* @__PURE__ */ U(s, {
			value: e.expression,
			onChange: (e) => t({ expression: e }),
			language: "javascript",
			variables: Mo,
			"aria-label": "Expression"
		})
	}), /* @__PURE__ */ U(X, {
		label: "Label (optional — shown on node face)",
		help: "A short name so this branch is easy to spot.",
		controlId: `${n}-label`,
		render: ({ controlId: n, describedById: r }) => /* @__PURE__ */ U(T, {
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
var Po = [
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
], Fo = {
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
}, Io = [
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
], Lo = [{
	value: "per-step",
	label: "Per step — fire once regardless of retries"
}, {
	value: "per-attempt",
	label: "Per attempt — fire once per retry window"
}];
function Ro({ data: e, onChange: t }) {
	let n = Rt(), r = Fo[e.actionType] ?? [], i = e.config ?? {}, a = typeof i.retryCount == "number" ? i.retryCount : 3, o = e.onError === "route-error" ? "route-error" : typeof i.retryCount == "number" ? "retry" : "halt", s = (e, n) => {
		t({ config: {
			...i,
			[e]: n
		} });
	}, l = (e) => {
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
	return /* @__PURE__ */ W(qa, { children: [
		/* @__PURE__ */ U(X, {
			label: "Action type",
			required: !0,
			controlId: `${n}-action-type`,
			render: ({ controlId: n, describedById: r }) => /* @__PURE__ */ U(E, {
				size: "sm",
				id: n,
				"aria-describedby": r,
				value: e.actionType,
				onChange: (e) => t({
					actionType: e.target.value,
					config: {}
				}),
				options: Po
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
						e.multiline ? /* @__PURE__ */ U(N, {
							rows: 2,
							id: t,
							"aria-describedby": r,
							placeholder: e.placeholder,
							value: a,
							onChange: (t) => s(e.key, t.target.value)
						}) : /* @__PURE__ */ U(T, {
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
		/* @__PURE__ */ U(io, {
			label: "Idempotent",
			checked: !!e.idempotent,
			onChange: (e) => t({ idempotent: e }),
			help: "This action is safe to retry.",
			"data-testid": "action-idempotent"
		}),
		e.idempotent && /* @__PURE__ */ U(X, {
			label: "Dedup scope",
			controlId: `${n}-dedup-scope`,
			render: ({ controlId: r }) => /* @__PURE__ */ W(H, { children: [/* @__PURE__ */ U(E, {
				size: "sm",
				id: r,
				"aria-describedby": `${n}-dedup-help`,
				value: e.idempotencyMode ?? "per-step",
				onChange: (e) => t({ idempotencyMode: e.target.value }),
				options: Lo
			}), /* @__PURE__ */ U("div", {
				id: `${n}-dedup-help`,
				className: "text-[11px] text-text-tertiary mt-0.5",
				children: (e.idempotencyMode ?? "per-step") === "per-step" ? "Retries skip this action if it already succeeded. Best for post-comment, notify." : "Each retry attempt can execute the action. Best for idempotent PUTs/webhooks."
			})] })
		}),
		/* @__PURE__ */ U(xo, {
			value: e.retryPolicy,
			onChange: (e) => t({ retryPolicy: e })
		}),
		/* @__PURE__ */ U(X, {
			label: "On error",
			render: ({ labelId: e }) => /* @__PURE__ */ W("div", {
				role: "group",
				"aria-labelledby": e,
				children: [/* @__PURE__ */ U(c, {
					name: "action-on-error",
					value: o,
					onChange: l,
					options: Io,
					"data-testid": "action-on-error"
				}), o === "retry" && /* @__PURE__ */ W("div", {
					className: "mt-2 flex items-center gap-2",
					children: [/* @__PURE__ */ U("span", {
						className: "text-[11px] font-semibold text-text-secondary",
						children: "Attempts"
					}), /* @__PURE__ */ U(P, {
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
var zo = 2, Bo = 8;
function Vo(e, t) {
	let n = e ?? [];
	return n.length === t ? n : n.length > t ? n.slice(0, t) : [...n, ...Array(t - n.length).fill("")];
}
function Ho({ data: e, onChange: t }) {
	let n = Rt(), r = Math.max(zo, Math.min(Bo, e.branchCount || zo)), i = Vo(e.branchLabels, r), a = (n) => {
		let r = Math.max(zo, Math.min(Bo, n));
		t({
			branchCount: r,
			branchLabels: Vo(e.branchLabels, r)
		});
	}, o = (e, n) => {
		let r = [...i];
		r[e] = n, t({ branchLabels: r });
	};
	return /* @__PURE__ */ W(qa, { children: [/* @__PURE__ */ U(X, {
		label: "Branch count",
		required: !0,
		help: `Between ${zo} and ${Bo} parallel branches.`,
		controlId: `${n}-branch-count`,
		render: ({ controlId: e, describedById: t }) => /* @__PURE__ */ W(H, { children: [/* @__PURE__ */ U(oe, {
			min: zo,
			max: Bo,
			step: 1,
			value: r,
			onChange: a,
			"aria-label": "Branch count",
			"data-testid": "fork-branch-slider"
		}), /* @__PURE__ */ U(P, {
			size: "sm",
			min: zo,
			max: Bo,
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
				}), /* @__PURE__ */ U(T, {
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
var Uo = [
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
], Wo = [
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
function Go({ data: e, onChange: t }) {
	return /* @__PURE__ */ W(qa, { children: [
		/* @__PURE__ */ U(X, {
			label: "Mode",
			required: !0,
			render: ({ labelId: n }) => /* @__PURE__ */ W("div", {
				role: "group",
				"aria-labelledby": n,
				children: [/* @__PURE__ */ U(c, {
					name: "join-mode",
					value: e.mode,
					onChange: (e) => t({ mode: e }),
					options: Uo.map((e) => ({
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
					}), /* @__PURE__ */ U(P, {
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
				children: /* @__PURE__ */ U(c, {
					name: "join-merge",
					value: e.mergeStrategy,
					onChange: (e) => t({ mergeStrategy: e }),
					options: Wo.map((e) => ({
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
var Ko = [
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
], qo = [{
	value: "reject",
	label: "Reject"
}, {
	value: "approve",
	label: "Approve"
}], Jo = {
	seconds: 1e3,
	minutes: 6e4,
	hours: 36e5
};
function Yo(e) {
	return !e || e <= 0 ? "minutes" : e % Jo.hours === 0 ? "hours" : e % Jo.minutes === 0 ? "minutes" : "seconds";
}
function Xo({ data: e, onChange: t }) {
	let r = Rt(), i = e.approvers ?? [], o = i.length === 0, [s, l] = V(() => Yo(e.timeoutMs)), u = e.timeoutMs === void 0 ? "" : Math.round(e.timeoutMs / Jo[s]), d = i.filter((e) => e.type === "user").map((e) => e.value), f = (n) => {
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
		t({ timeoutMs: Math.max(0, parseInt(e, 10) || 0) * Jo[s] });
	}, h = (e) => {
		l(e), typeof u == "number" && !Number.isNaN(u) && t({ timeoutMs: u * Jo[e] });
	}, g = Math.max(1, i.length);
	return /* @__PURE__ */ W(qa, { children: [
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
					value: d,
					onChange: f,
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
				children: [/* @__PURE__ */ U(P, {
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
					children: [/* @__PURE__ */ U(P, {
						size: "sm",
						min: 0,
						value: u === "" ? void 0 : Number(u),
						onChange: (e) => m(String(e)),
						onClear: () => m(""),
						placeholder: "24",
						"aria-label": "Timeout value",
						"data-testid": "approval-timeout-value"
					}), /* @__PURE__ */ U(E, {
						size: "sm",
						className: "w-[120px] flex-none",
						value: s,
						onChange: (e) => h(e.target.value),
						"aria-label": "Timeout unit",
						options: Ko
					})]
				}), e.timeoutMs !== void 0 && e.timeoutMs > 0 && /* @__PURE__ */ W("div", {
					className: "mt-2",
					children: [/* @__PURE__ */ U("span", {
						className: "text-[11px] font-semibold text-text-secondary",
						children: "If timeout"
					}), /* @__PURE__ */ U("div", {
						className: "mt-1",
						children: /* @__PURE__ */ U(c, {
							name: "approval-timeout-action",
							orientation: "horizontal",
							value: e.timeoutAction ?? "reject",
							onChange: (e) => t({ timeoutAction: e }),
							options: qo,
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
			render: ({ controlId: n, describedById: r }) => /* @__PURE__ */ U(N, {
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
function Zo(e) {
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
function Qo(e) {
	let t = Array.isArray(e.type) ? e.type[0] : e.type;
	if (t === "array") {
		let t = e.items ? Array.isArray(e.items.type) ? e.items.type[0] : e.items.type : void 0;
		return t ? `array of ${t}` : "array";
	}
	return t ?? "unknown";
}
function $o(e, t, n, r, i) {
	if (i.has(e)) return;
	i.add(e);
	let a = Array.isArray(e.type) ? e.type[0] : e.type, o = [
		e.anyOf,
		e.oneOf,
		e.allOf
	].filter(Boolean);
	for (let e of o) for (let a of e) $o(a, t, n, r, i);
	if (a === "object" && e.properties) {
		for (let [a, o] of Object.entries(e.properties)) {
			let e = `${t}.${a}`, s = Zo(o);
			r.push({
				path: e,
				label: `${a} (${Qo(o)})`,
				depth: n,
				kind: s,
				isArrayItems: s === "array"
			}), $o(o, e, n + 1, r, i);
		}
		return;
	}
	if (a === "array") {
		let a = `${t}[*]`, o = e.items, s = o ? Zo(o) : "unknown";
		r.push({
			path: a,
			label: `${t.slice(t.lastIndexOf(".") + 1)}[*] (each item)`,
			depth: n,
			kind: s,
			isArrayItems: !0
		}), o && $o(o, a, n + 1, r, i);
	}
}
function es(e, t = "$") {
	if (!e || typeof e != "object") return [];
	let n = [], r = /* @__PURE__ */ new Set();
	if ((Array.isArray(e.type) ? e.type[0] : e.type) === "object" && e.properties) for (let [i, a] of Object.entries(e.properties)) {
		let e = `${t}.${i}`, o = Zo(a);
		n.push({
			path: e,
			label: `${i} (${Qo(a)})`,
			depth: 0,
			kind: o,
			isArrayItems: o === "array"
		}), $o(a, e, 1, n, r);
	}
	else $o(e, t, 0, n, r);
	return n;
}
//#endregion
//#region src/components/pipelines/nodes/scatter/ScatterPathPicker.tsx
function ts() {
	return "/api/pipeline/output-schemas";
}
var ns = null, rs = null;
async function is() {
	return ns || (rs ||= fetch(ts()).then((e) => {
		if (!e.ok) throw Error(`HTTP ${e.status}`);
		return e.json();
	}).then((e) => (ns = e, rs = null, e)).catch((e) => {
		throw rs = null, e;
	}), rs);
}
var as = {
	array: "bg-primary-bg text-primary-fg border-primary-border",
	object: "bg-surface-panel text-text-secondary border-border",
	string: "bg-success-bg text-success-fg border-success-border",
	number: "bg-warning-bg text-warning-fg border-warning-border",
	boolean: "bg-pink-50 text-pink-700 border-pink-200",
	unknown: "bg-surface-panel text-text-tertiary border-border"
};
function os({ kind: e }) {
	return /* @__PURE__ */ U("span", {
		className: n("inline-flex items-center px-1 py-0 rounded text-[10px] font-mono border leading-4", as[e]),
		children: e
	});
}
function ss({ entry: e, isSelected: t, onPick: r }) {
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
		}), /* @__PURE__ */ U(os, { kind: e.kind })]
	});
}
function cs({ value: e, onChange: t, upstreamKind: n, upstreamSchema: r }) {
	let [i, a] = V("idle"), [o, s] = V(null), c = B(!0);
	R(() => (c.current = !0, () => {
		c.current = !1;
	}), []);
	let l = z(() => r === void 0 ? o : r, [r, o]);
	R(() => {
		!n || r !== void 0 || (a("loading"), is().then((e) => {
			if (!c.current) return;
			let t = e.schemas[n] ?? null;
			s(t), a("done");
		}).catch(() => {
			c.current && a("error");
		}));
	}, [n, r]);
	let u = z(() => es(l), [l]), d = l !== null && u.length > 0, f = L((e) => {
		t(e);
	}, [t]);
	if (!n && r === void 0) return /* @__PURE__ */ U(Xe, {
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
			/* @__PURE__ */ U(Xe, {
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
				children: u.map((t) => /* @__PURE__ */ U(ss, {
					entry: t,
					isSelected: e === t.path,
					onPick: f
				}, t.path))
			}),
			/* @__PURE__ */ U(Xe, {
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
function ls(e) {
	let { definition: t } = Ye() ?? { definition: null };
	return z(() => {
		if (!e || !t) return;
		let n = t.edges.find((t) => t.target === e);
		if (!n) return;
		let r = t.nodes.find((e) => e.id === n.source);
		if (r) return r.type;
	}, [e, t]);
}
function us({ data: e, onChange: t }) {
	let n = Rt(), { selectedNodeId: r } = Ye() ?? { selectedNodeId: null }, i = ls(r);
	return e.maxConcurrency, /* @__PURE__ */ W(qa, { children: [
		/* @__PURE__ */ U(X, {
			label: "Items path",
			required: !0,
			error: e.itemsPath?.trim() ? e.itemsPath.startsWith("$.") ? void 0 : "Path must start with $." : "Items path is required.",
			help: "JSONPath into context resolving to an array. Each element becomes one scatter arm.",
			render: ({ describedById: n, labelId: r }) => /* @__PURE__ */ U("div", {
				role: "group",
				"aria-labelledby": r,
				"aria-describedby": n,
				children: /* @__PURE__ */ U(cs, {
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
			render: ({ controlId: n, describedById: r }) => /* @__PURE__ */ U(T, {
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
			render: ({ controlId: n, describedById: r }) => /* @__PURE__ */ U(P, {
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
var ds = [
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
function fs({ data: e, onChange: t, nodeId: n }) {
	let r = e.fit ?? "cover", i = r === "contain" || r === "fill";
	return /* @__PURE__ */ W(qa, { children: [
		/* @__PURE__ */ U(ro, {
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
					render: ({ describedById: n, controlId: r }) => /* @__PURE__ */ U(P, {
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
					render: ({ describedById: n, controlId: r }) => /* @__PURE__ */ U(P, {
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
			render: ({ describedById: e, controlId: n }) => /* @__PURE__ */ U(E, {
				id: n,
				"aria-describedby": e,
				size: "sm",
				value: r,
				onChange: (e) => t({ fit: e.target.value }),
				options: ds
			})
		}),
		/* @__PURE__ */ U(io, {
			label: "Do not enlarge if already smaller than target",
			checked: e.withoutEnlargement ?? !1,
			onChange: (e) => t({ withoutEnlargement: e }),
			"data-testid": "resize-without-enlargement"
		}),
		/* @__PURE__ */ U(X, {
			label: "Background colour",
			help: i ? "Hex colour used to fill letterbox padding." : "Only applies when fit is contain or fill.",
			controlId: "resize-background",
			render: ({ describedById: n, controlId: r }) => /* @__PURE__ */ U(T, {
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
var ps = "Operations", ms = [
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
function hs(e) {
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
function gs({ op: e, index: t, onUpdate: n, onRemove: r }) {
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
				/* @__PURE__ */ U(E, {
					size: "sm",
					className: "flex-1",
					value: e.op,
					onChange: (e) => n(hs(e.target.value)),
					"aria-label": `Op ${t + 1} type`,
					options: ms
				}),
				/* @__PURE__ */ U(m, {
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
				}), /* @__PURE__ */ U(P, {
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
				}), /* @__PURE__ */ U(T, {
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
			/* @__PURE__ */ U(io, {
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
function _s({ data: e, onChange: t, nodeId: n }) {
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
	return /* @__PURE__ */ W(qa, { children: [/* @__PURE__ */ U(ro, {
		value: e.sourceImagePath,
		onChange: (e) => t({ sourceImagePath: e }),
		nodeId: n
	}), /* @__PURE__ */ U(X, {
		label: ps,
		error: r.length === 0 ? "Add at least one operation." : void 0,
		help: "Applied top-to-bottom. Rotate (any angle), Flip (top-to-bottom mirror), Flop (left-to-right mirror).",
		render: ({ describedById: e, labelId: t }) => /* @__PURE__ */ W("div", {
			role: "group",
			"aria-labelledby": t,
			"aria-describedby": e,
			children: [/* @__PURE__ */ U("div", {
				className: "flex flex-col gap-1.5",
				children: r.map((e, t) => /* @__PURE__ */ U(gs, {
					op: e,
					index: t,
					onUpdate: (e) => i(t, e),
					onRemove: () => a(t)
				}, t))
			}), /* @__PURE__ */ U("div", {
				className: r.length > 0 ? "mt-2" : "",
				children: /* @__PURE__ */ U(m, {
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
var vs = [
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
], ys = [
	"jpeg",
	"webp",
	"avif"
], bs = ["webp", "avif"];
function xs({ data: e, onChange: t, nodeId: n }) {
	let r = e.format ?? "jpeg", i = ys.includes(r), a = bs.includes(r), o = e.lossless ?? !1;
	return /* @__PURE__ */ W(qa, { children: [
		/* @__PURE__ */ U(ro, {
			value: e.sourceImagePath,
			onChange: (e) => t({ sourceImagePath: e }),
			nodeId: n
		}),
		/* @__PURE__ */ U(X, {
			label: "Output format",
			controlId: "format-convert-format",
			render: ({ describedById: e, controlId: n }) => /* @__PURE__ */ U(E, {
				id: n,
				"aria-describedby": e,
				size: "sm",
				value: r,
				onChange: (e) => t({ format: e.target.value }),
				options: vs
			})
		}),
		i && /* @__PURE__ */ U(X, {
			label: "Quality",
			help: o ? "Ignored while lossless encoding is on." : "Higher is better quality and a larger file. 80 is a good default. Range 1–100.",
			controlId: "format-convert-quality",
			render: ({ describedById: n, controlId: r }) => /* @__PURE__ */ U(P, {
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
		a && /* @__PURE__ */ U(io, {
			label: "Lossless encoding",
			checked: o,
			onChange: (e) => t({ lossless: e }),
			help: "Overrides quality when on. Larger files, no compression artefacts.",
			"data-testid": "format-convert-lossless"
		}),
		/* @__PURE__ */ U(io, {
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
function Ss({ data: e, onChange: t, nodeId: n }) {
	let r = no(n ?? null);
	return /* @__PURE__ */ W(qa, { children: [
		/* @__PURE__ */ U(X, {
			label: "Source image path",
			help: "Optional. Defaults to the image produced upstream.",
			controlId: "sharpen-source-image-path",
			render: ({ describedById: n, controlId: i }) => /* @__PURE__ */ W(H, { children: [/* @__PURE__ */ U(T, {
				id: i,
				"aria-describedby": n,
				size: "sm",
				mono: !0,
				spellCheck: !1,
				value: e.sourceImagePath ?? "",
				onChange: (e) => t({ sourceImagePath: e.target.value.trim() || void 0 }),
				placeholder: "$.trigger.imageRef"
			}), /* @__PURE__ */ U(Ja, {
				samples: r.map((e) => e.path),
				onSelect: (e) => t({ sourceImagePath: e }),
				"aria-label": "Upstream image refs"
			})] })
		}),
		/* @__PURE__ */ U(X, {
			label: "Sigma",
			help: "Gaussian mask sigma. Higher is broader and stronger. Typical range 0.5–3.",
			controlId: "sharpen-sigma",
			render: ({ describedById: n, controlId: r }) => /* @__PURE__ */ U(P, {
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
			render: ({ describedById: n, controlId: r }) => /* @__PURE__ */ U(P, {
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
			render: ({ describedById: n, controlId: r }) => /* @__PURE__ */ U(P, {
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
var Cs = [
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
function ws({ data: e, onChange: t, nodeId: n }) {
	let r = !e.overlayImageId?.trim();
	return /* @__PURE__ */ W(qa, { children: [
		/* @__PURE__ */ U(ro, {
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
			render: ({ describedById: n, controlId: i }) => /* @__PURE__ */ U(T, {
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
			render: ({ describedById: n, controlId: r }) => /* @__PURE__ */ U(E, {
				id: r,
				"aria-describedby": n,
				size: "sm",
				value: e.gravity ?? "southeast",
				onChange: (e) => t({ gravity: e.target.value }),
				options: Cs
			})
		}),
		/* @__PURE__ */ U(X, {
			label: "Opacity",
			help: "0 to 1. Default 1.",
			controlId: "watermark-opacity",
			render: ({ describedById: n, controlId: r }) => /* @__PURE__ */ U(P, {
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
					render: ({ describedById: n, controlId: r }) => /* @__PURE__ */ U(P, {
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
					render: ({ describedById: n, controlId: r }) => /* @__PURE__ */ U(P, {
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
var Ts = 50;
function Es(e, t) {
	let [n, r] = V(e), [i, a] = V([]), [o, s] = V([]), c = B(n);
	c.current = n;
	let l = L((e) => {
		let n = c.current, i = e(n);
		c.current = i, a((e) => {
			let t = [...e, n];
			return t.length > Ts && t.shift(), t;
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
				return t.length > Ts && t.shift(), t;
			}), s((e) => e.slice(0, -1)), r(e), t(e);
		}, [t, o]),
		canUndo: i.length > 0,
		canRedo: o.length > 0
	};
}
//#endregion
//#region src/components/pipelines/vision/BBoxAuthoringCanvas.tsx
function Ds() {
	return typeof crypto < "u" && "randomUUID" in crypto ? crypto.randomUUID() : `bbox-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
function Os(e, t, n) {
	return Math.max(t, Math.min(n, e));
}
function ks(e, t) {
	let n = t.getBoundingClientRect();
	return {
		x: Os(e.clientX - n.left, 0, n.width),
		y: Os(e.clientY - n.top, 0, n.height)
	};
}
function As(e, t, n, r, i, a) {
	let o = i / n, s = a / r;
	return {
		x: e * o,
		y: t * s
	};
}
function js(e, t, n) {
	return {
		left: `${e.x / t * 100}%`,
		top: `${e.y / n * 100}%`,
		width: `${e.width / t * 100}%`,
		height: `${e.height / n * 100}%`
	};
}
function Ms(e, t, n) {
	for (let r = n.length - 1; r >= 0; r--) {
		let i = n[r];
		if (e >= i.x && e <= i.x + i.width && t >= i.y && t <= i.y + i.height) return i;
	}
	return null;
}
function Ns({ imageUrl: e, imageWidth: t, imageHeight: r, boxes: i, onChange: a, readOnly: o = !1, className: s }) {
	let c = B(null), [l, u] = V({ kind: "idle" }), [d, f] = V(null), p = B(null), { addBox: m, moveBox: h, resizeBox: g, setLabel: _, deleteBox: v } = Es(i, a);
	R(() => {
		d && p.current && (p.current.focus(), p.current.select());
	}, [d]);
	let y = L((e) => {
		if (o || e.button !== 0) return;
		let n = c.current;
		if (!n) return;
		e.preventDefault(), n.setPointerCapture(e.pointerId);
		let { x: a, y: s } = ks(e, n), l = n.getBoundingClientRect(), { x: d, y: f } = As(a, s, l.width, l.height, t, r), p = Ms(d, f, i);
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
		let { x: s, y: l } = ks(e, a), d = a.getBoundingClientRect(), { x: f, y: p } = As(s, l, d.width, d.height, t, r);
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
		let { x: i, y: a } = ks(e, n), o = n.getBoundingClientRect(), { x: s, y: d } = As(i, a, o.width, o.height, t, r);
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
				id: Ds(),
				x: e,
				y: t,
				width: i,
				height: a
			});
		} else if (l.kind === "move") {
			let e = i.find((e) => e.id === l.id);
			if (e) {
				let n = Os(l.currentX - l.offsetX, 0, t - e.width), i = Os(l.currentY - l.offsetY, 0, r - e.height);
				h(l.id, n, i);
			}
		} else if (l.kind === "resize") {
			let { id: e, corner: n, origBox: i, currentX: a, currentY: o } = l, { x: s, y: c, width: u, height: d } = i;
			if (n === "nw") {
				let e = Os(a, 0, s + u - 4), t = Os(o, 0, c + d - 4);
				u = s + u - e, d = c + d - t, s = e, c = t;
			} else if (n === "ne") {
				let e = Os(o, 0, c + d - 4);
				u = Os(a - s, 4, t - s), d = c + d - e, c = e;
			} else if (n === "sw") {
				let e = Os(a, 0, s + u - 4);
				u = s + u - e, d = Os(o - c, 4, r - c), s = e;
			} else u = Os(a - s, 4, t - s), d = Os(o - c, 4, r - c);
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
	}, [o, v]), E = L((e, t) => {
		o || (e.stopPropagation(), f({
			id: t.id,
			value: t.label ?? ""
		}));
	}, [o]), D = L(() => {
		d && (_(d.id, d.value), f(null));
	}, [d, _]), ee = null;
	if (l.kind === "create") {
		let e = Math.min(l.startX, l.currentX), t = Math.min(l.startY, l.currentY), n = Math.max(l.startX, l.currentX), r = Math.max(l.startY, l.currentY);
		n - e >= 2 && r - t >= 2 && (ee = {
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
			let n = Os(l.currentX - l.offsetX, 0, t - e.width), i = Os(l.currentY - l.offsetY, 0, r - e.height);
			O = {
				...e,
				x: n,
				y: i
			};
		}
	}
	let k = null;
	if (l.kind === "resize") {
		let { corner: e, origBox: n, currentX: i, currentY: a } = l, { x: o, y: s, width: c, height: u } = n;
		if (e === "nw") {
			let e = Os(i, 0, o + c - 4), t = Os(a, 0, s + u - 4);
			c = o + c - e, u = s + u - t, o = e, s = t;
		} else if (e === "ne") {
			let e = Os(a, 0, s + u - 4);
			c = Os(i - o, 4, t - o), u = s + u - e, s = e;
		} else if (e === "sw") {
			let e = Os(i, 0, o + c - 4);
			c = o + c - e, u = Os(a - s, 4, r - s), o = e;
		} else c = Os(i - o, 4, t - o), u = Os(a - s, 4, r - s);
		k = {
			...n,
			x: o,
			y: s,
			width: c,
			height: u
		};
	}
	let te = /* @__PURE__ */ new Set();
	l.kind === "move" && te.add(l.id), l.kind === "resize" && te.add(l.id);
	let ne = (e, t) => /* @__PURE__ */ U("button", {
		type: "button",
		"aria-label": `Resize ${t}`,
		className: n("absolute h-3 w-3 rounded-sm border border-primary bg-white shadow", {
			nw: "-top-1.5 -left-1.5 cursor-nw-resize",
			ne: "-top-1.5 -right-1.5 cursor-ne-resize",
			sw: "-bottom-1.5 -left-1.5 cursor-sw-resize",
			se: "-bottom-1.5 -right-1.5 cursor-se-resize"
		}[t]),
		onPointerDown: (n) => b(n, e, t)
	}, t), A = (e, i, a, s) => {
		let c = js(e, t, r), l = d?.id === e.id;
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
			children: [l ? /* @__PURE__ */ U(T, {
				ref: p,
				type: "text",
				size: "sm",
				value: d.value,
				onChange: (e) => f((t) => t ? {
					...t,
					value: e.target.value
				} : null),
				onBlur: D,
				onKeyDown: (e) => {
					e.key === "Enter" && (e.preventDefault(), D()), e.key === "Escape" && (e.preventDefault(), f(null));
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
				onDoubleClick: (t) => E(t, e),
				onContextMenu: (t) => C(t, e.id),
				onKeyDown: (t) => w(t, e.id),
				children: e.label || "Unlabeled"
			}), a && !o && /* @__PURE__ */ W(H, { children: [
				ne(e, "nw"),
				ne(e, "ne"),
				ne(e, "sw"),
				ne(e, "se")
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
					i.map((e) => te.has(e.id) ? null : A(e, !1, !0, `box-${e.id}`)),
					O && A(O, !0, !1, "ghost-move"),
					k && A(k, !0, !0, "ghost-resize"),
					(() => {
						if (!ee) return null;
						let e = js(ee, t, r);
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
var Ps = [
	"$.scatter.item.bbox",
	"$.steps.visionAnalyze.output.extracted.regions[0].bbox",
	"$.trigger.payload.bbox"
], Fs = "crop-region", Is = "crop", Ls = "Crop region", Rs = "text-[11px] text-text-tertiary mt-0.5";
function zs(e) {
	let { definition: t } = Ye() ?? { definition: null }, n = z(() => !e || !t ? null : t.edges.find((t) => t.target === e)?.source ?? null, [t, e]), r = I(n ?? "")?.images?.[0];
	return r ? {
		imageId: r.imageId,
		width: r.width,
		height: r.height
	} : null;
}
function Bs({ data: e, onChange: t, currentNodeId: r }) {
	no(r ?? null);
	let i = e.materialize !== !1, a = zs(r), o = ct(), s = z(() => e.bbox ? [{
		id: Fs,
		x: e.bbox.x,
		y: e.bbox.y,
		width: e.bbox.width,
		height: e.bbox.height,
		label: Is
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
	return /* @__PURE__ */ W(qa, { children: [
		/* @__PURE__ */ U(ro, {
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
			render: ({ describedById: n, controlId: r, labelId: i }) => /* @__PURE__ */ W(H, { children: [/* @__PURE__ */ U(T, {
				id: r,
				"aria-describedby": n,
				size: "sm",
				mono: !0,
				spellCheck: !1,
				value: e.bboxPath ?? "",
				onChange: (e) => t({ bboxPath: e.target.value.trim() || void 0 }),
				placeholder: "$.scatter.item.bbox"
			}), /* @__PURE__ */ U(Ja, {
				samples: Ps,
				onSelect: (e) => t({ bboxPath: e }),
				"aria-label": "Common bbox paths"
			})] })
		}),
		/* @__PURE__ */ W("div", {
			"data-testid": "crop-region-section",
			role: "group",
			"aria-label": Ls,
			children: [/* @__PURE__ */ U(X, {
				label: Ls,
				help: "Optional. Drag on the source image to paint the crop box. Drawing a new box replaces the previous one.",
				children: /* @__PURE__ */ U(H, {})
			}), a ? /* @__PURE__ */ W(H, { children: [/* @__PURE__ */ U(Ns, {
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
					/* @__PURE__ */ W(g, {
						tone: "neutral",
						size: "xs",
						mono: !0,
						"data-testid": "crop-chip-x",
						children: ["x: ", e.bbox.x]
					}),
					/* @__PURE__ */ W(g, {
						tone: "neutral",
						size: "xs",
						mono: !0,
						"data-testid": "crop-chip-y",
						children: ["y: ", e.bbox.y]
					}),
					/* @__PURE__ */ W(g, {
						tone: "neutral",
						size: "xs",
						mono: !0,
						"data-testid": "crop-chip-width",
						children: ["w: ", e.bbox.width]
					}),
					/* @__PURE__ */ W(g, {
						tone: "neutral",
						size: "xs",
						mono: !0,
						"data-testid": "crop-chip-height",
						children: ["h: ", e.bbox.height]
					})
				] }) : /* @__PURE__ */ U("span", {
					className: n(Rs, "italic"),
					children: "No crop region yet — drag on the image to add one."
				})
			})] }) : /* @__PURE__ */ U(b, {
				variant: "info",
				className: "mt-1.5",
				"data-testid": "crop-region-empty-banner",
				children: "Run the upstream node once to populate the source image, then drag here to paint a crop region."
			})]
		}),
		/* @__PURE__ */ U(io, {
			label: "Persist crop to blob store",
			checked: i,
			onChange: (e) => t({ materialize: e }),
			help: "On by default. The cropped image is saved to the image blob store.",
			"data-testid": "crop-materialize"
		})
	] });
}
function Vs(e) {
	let { selectedNodeId: t } = Ye() ?? { selectedNodeId: null };
	return /* @__PURE__ */ U(Bs, {
		...e,
		currentNodeId: t
	});
}
//#endregion
//#region src/components/pipelines/nodes/adjust-bw/AdjustBwConfig.tsx
var Hs = [
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
function Us({ data: e, onChange: t, nodeId: n }) {
	let r = e.algorithm ?? "luminosity", i = e.contrast ?? 1;
	return /* @__PURE__ */ W(qa, { children: [
		/* @__PURE__ */ U(ro, {
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
			render: ({ describedById: e, controlId: n }) => /* @__PURE__ */ U(E, {
				id: n,
				"aria-describedby": e,
				size: "sm",
				value: r,
				onChange: (e) => t({ algorithm: e.target.value }),
				options: Hs
			})
		}),
		/* @__PURE__ */ U(X, {
			label: "Contrast multiplier",
			help: "Applied after greyscale conversion. 1 is no change, below 1 lowers contrast, above 1 raises it. Range 0–4.",
			controlId: "adjust-bw-contrast",
			render: ({ describedById: e, controlId: n }) => /* @__PURE__ */ U(P, {
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
function Ws({ value: e, onChange: t, uploadImage: r, getImageUrl: i, maxSize: a = 8388608, accept: o = "image/*", fileOnly: s = !1, urlOnly: c = !1, className: l, "data-testid": u }) {
	let [d, f] = V(!1), [p, h] = V(null), [g, _] = V("");
	async function v(e) {
		f(!0), h(null);
		try {
			t(await r(e)), _("");
		} catch (e) {
			let t = e instanceof Error ? e.message : "Upload failed. Please try again.";
			h(t);
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
				children: [/* @__PURE__ */ U(qe, {
					src: r,
					alt: "Uploaded image",
					size: "md",
					aspectRatio: "square",
					"data-testid": u ? `${u}-thumbnail` : void 0
				}), /* @__PURE__ */ U(m, {
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
			!c && /* @__PURE__ */ U(F, {
				accept: o,
				maxSize: a,
				onFiles: y,
				disabled: d,
				"data-testid": u ? `${u}-drop` : void 0
			}),
			!s && /* @__PURE__ */ W("div", {
				className: "flex items-center gap-2",
				"data-testid": u ? `${u}-url-row` : void 0,
				children: [/* @__PURE__ */ U(T, {
					type: "url",
					placeholder: "https://example.com/image.jpg",
					value: g,
					onChange: (e) => _(e.target.value),
					disabled: d,
					"data-testid": u ? `${u}-url-input` : void 0,
					onKeyDown: (e) => {
						e.key === "Enter" && b();
					}
				}), /* @__PURE__ */ U(m, {
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
function Gs(e) {
	let t = Ge(), n = t.uploadImage;
	return n ? /* @__PURE__ */ U(Ws, {
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
var Ks = {
	brightness: "Brightness",
	contrast: "Contrast",
	saturation: "Saturation",
	hue: "Hue",
	blur: "Blur"
}, qs = Object.keys(Ks).map((e) => ({
	value: e,
	label: Ks[e]
})), Js = {
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
function Ys(e) {
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
function Xs(e) {
	switch (e.kind) {
		case "hue": return e.degrees;
		case "blur": return e.radiusPx;
		default: return e.value;
	}
}
function Zs(e, t) {
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
var Qs = n("w-4 h-full flex items-center justify-center", "text-[14px] text-text-tertiary cursor-grab select-none shrink-0");
n("text-[11px] font-semibold px-2 py-0.5 rounded-full", "bg-surface-hover border border-border text-text-secondary", "whitespace-nowrap shrink-0");
function $s({ layer: e, index: t, onUpdate: r, onRemove: i }) {
	let a = Js[e.kind] ?? {
		min: 0,
		max: 100,
		step: 1
	}, o = Xs(e), s = (e) => {
		r(Ys(e.target.value));
	}, c = (t) => {
		r(Zs(e, t));
	};
	return /* @__PURE__ */ W("div", {
		className: "flex items-center gap-2 px-2 py-1.5 rounded-md border border-border bg-surface-inset",
		"data-testid": `layer-row-${t}`,
		children: [
			/* @__PURE__ */ U("span", {
				className: Qs,
				"aria-hidden": "true",
				title: "Drag handle",
				children: "⠿"
			}),
			/* @__PURE__ */ U(E, {
				value: e.kind,
				onChange: s,
				options: qs,
				size: "sm",
				"aria-label": `Layer ${t + 1} kind`,
				"data-testid": `layer-kind-select-${t}`,
				className: "shrink-0"
			}),
			/* @__PURE__ */ U(oe, {
				min: a.min,
				max: a.max,
				step: a.step,
				value: o,
				onChange: c,
				readout: !1,
				className: "flex-1 min-w-0",
				"aria-label": `${Ks[e.kind]} slider`,
				"data-testid": `layer-slider-${t}`
			}),
			/* @__PURE__ */ U(P, {
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
var ec = 150;
function tc(e, t, n, r) {
	let [i, a] = V(null), [o, s] = V(!1), c = B(null), l = B(null), u = L(async (e, t) => {
		l.current?.abort();
		let i = new AbortController();
		l.current = i, s(!0);
		try {
			let o = await fetch(`${n}/api/pipeline/preview/adjust-layer`, {
				method: "POST",
				headers: {
					...r?.() ?? {},
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					imageId: e,
					layers: t
				}),
				signal: i.signal
			});
			if (!o.ok) return;
			let s = await o.json();
			s.dataUrl && a(s.dataUrl);
		} catch {} finally {
			s(!1);
		}
	}, [n, r]);
	return R(() => {
		if (!e) {
			a(null);
			return;
		}
		return c.current && clearTimeout(c.current), c.current = setTimeout(() => {
			u(e, t);
		}, ec), () => {
			c.current && clearTimeout(c.current);
		};
	}, [
		e,
		JSON.stringify(t),
		u
	]), R(() => () => l.current?.abort(), []), {
		previewSrc: i,
		loading: o
	};
}
function nc(e) {
	return e.length <= 8 ? e : `${e.slice(0, 8)}…`;
}
function rc({ layers: e, onChange: t, autoSourceImageId: r, pinnedSourceImageId: i, onPinnedSourceImageIdChange: a, sourceImageId: o, apiBase: s = "", authHeaders: c }) {
	let l = Ee(), u = c ?? l?.authHeaders, [d, f] = V("brightness"), [p, h] = V(!1), _ = r ?? o, v = i ?? _, y = !!i, { previewSrc: b, loading: x } = tc(v, e, s, u), S = () => {
		a?.(void 0);
	}, C = (e) => {
		e?.imageId && (a?.(e.imageId), h(!1));
	}, w = (n, r) => {
		t(e.map((e, t) => t === n ? r : e));
	}, T = (n) => {
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
				e.map((e, t) => /* @__PURE__ */ U($s, {
					layer: e,
					index: t,
					onUpdate: (e) => w(t, e),
					onRemove: () => T(t)
				}, t)),
				/* @__PURE__ */ W("div", {
					className: "flex items-center gap-2 mt-1",
					children: [/* @__PURE__ */ U(E, {
						value: d,
						onChange: (e) => {
							f(e.target.value);
						},
						options: qs,
						size: "sm",
						"aria-label": "New layer kind",
						"data-testid": "new-layer-kind-select"
					}), /* @__PURE__ */ U("button", {
						type: "button",
						onClick: () => {
							t([...e, Ys(d)]);
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
					children: [y && v ? /* @__PURE__ */ W(g, {
						tone: "neutral",
						size: "xs",
						"data-testid": "adjust-layer-source-chip-pinned",
						children: [/* @__PURE__ */ W("span", { children: [
							"Source: pinned (",
							nc(v),
							")"
						] }), /* @__PURE__ */ U("button", {
							type: "button",
							onClick: S,
							"aria-label": "Clear pinned source image",
							"data-testid": "adjust-layer-source-clear-pin",
							className: n("ml-1 inline-flex items-center justify-center", "w-3 h-3 rounded-full text-[10px] leading-none", "bg-transparent border-none cursor-pointer text-current", "hover:bg-surface-emphasis"),
							children: "×"
						})]
					}) : _ ? /* @__PURE__ */ W(g, {
						tone: "info",
						size: "xs",
						"data-testid": "adjust-layer-source-chip-auto",
						children: [
							"Source: ",
							nc(_),
							" from upstream run"
						]
					}) : null, a && /* @__PURE__ */ U(m, {
						variant: "ghost",
						size: "sm",
						onClick: () => h((e) => !e),
						"data-testid": "adjust-layer-override-btn",
						children: "Override"
					})]
				}),
				p && a && /* @__PURE__ */ U("div", {
					className: "w-48",
					"data-testid": "adjust-layer-override-uploader-wrap",
					children: /* @__PURE__ */ U(Gs, {
						value: null,
						onChange: C,
						"data-testid": "adjust-layer-override-uploader"
					})
				}),
				v ? /* @__PURE__ */ W("div", {
					className: "relative",
					children: [/* @__PURE__ */ U(qe, {
						src: b ?? "",
						alt: "Adjust layer preview",
						size: "lg",
						aspectRatio: "auto",
						loading: "eager",
						"data-testid": "adjust-layer-preview-thumb"
					}), x && /* @__PURE__ */ U("div", {
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
var ic = "Adjustment layers";
function ac(e) {
	let { definition: t } = Ye() ?? { definition: null }, n = z(() => !e || !t ? null : t.edges.find((t) => t.target === e)?.source ?? null, [t, e]);
	return I(n ?? "")?.images?.[0]?.imageId;
}
function oc({ data: e, onChange: t, currentNodeId: n }) {
	no(n ?? null);
	let r = ac(n), i = e.previewSourceImageId, a = e.layers ?? [];
	return /* @__PURE__ */ W(qa, { children: [/* @__PURE__ */ U(ro, {
		value: e.sourceImagePath,
		onChange: (e) => t({ sourceImagePath: e }),
		nodeId: n ?? void 0,
		help: "JSONPath to the imageId of the source image.",
		placeholder: "$.scatter.parentImageId"
	}), /* @__PURE__ */ U(X, {
		label: ic,
		help: "Applied top-to-bottom.",
		render: ({ describedById: e, labelId: n }) => /* @__PURE__ */ U("div", {
			role: "group",
			"aria-labelledby": n,
			"aria-describedby": e,
			children: /* @__PURE__ */ U(rc, {
				layers: a,
				onChange: (e) => t({ layers: e }),
				autoSourceImageId: r,
				pinnedSourceImageId: i,
				onPinnedSourceImageIdChange: (e) => t({ previewSourceImageId: e })
			})
		})
	})] });
}
function sc(e) {
	let { selectedNodeId: t } = Ye() ?? { selectedNodeId: null };
	return /* @__PURE__ */ U(oc, {
		...e,
		currentNodeId: t
	});
}
//#endregion
//#region src/components/pipelines/nodes/dimensions/DimensionsConfig.tsx
var cc = 1024;
function lc({ data: e, onChange: t, nodeId: n }) {
	return /* @__PURE__ */ W(qa, { children: [/* @__PURE__ */ U(ro, {
		value: e.sourceImagePath,
		onChange: (e) => t({ sourceImagePath: e }),
		nodeId: n
	}), /* @__PURE__ */ U(X, {
		label: "Max edge",
		help: "Longest-edge cap. The derived genWidth/genHeight scale to fit within it while preserving aspect ratio — wire them into image:generate.",
		controlId: "dimensions-max-edge",
		render: ({ describedById: n, controlId: r }) => /* @__PURE__ */ U(P, {
			id: r,
			"aria-describedby": n,
			size: "sm",
			min: 1,
			step: 1,
			unit: "px",
			value: e.maxEdge ?? cc,
			onChange: (e) => t({ maxEdge: e }),
			"data-testid": "dimensions-max-edge"
		})
	})] });
}
//#endregion
//#region src/components/pipelines/nodes/upscale/UpscaleConfig.tsx
var uc = 1024;
function dc({ data: e, onChange: t, nodeId: n }) {
	return /* @__PURE__ */ W(qa, { children: [
		/* @__PURE__ */ U(X, {
			label: "Prompt",
			help: "Optional text guidance forwarded to the upscaler.",
			controlId: "upscale-prompt",
			render: ({ describedById: n, controlId: r }) => /* @__PURE__ */ U(N, {
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
			render: ({ describedById: n, controlId: r }) => /* @__PURE__ */ U(P, {
				id: r,
				"aria-describedby": n,
				size: "sm",
				min: 1,
				step: 1,
				unit: "px",
				value: e.maxEdge ?? uc,
				onChange: (e) => t({ maxEdge: e }),
				"data-testid": "upscale-max-edge"
			})
		}),
		/* @__PURE__ */ U(ro, {
			value: e.sourceImagePath,
			onChange: (e) => t({ sourceImagePath: e }),
			nodeId: n
		})
	] });
}
//#endregion
//#region src/components/pipelines/nodes/vision/VisionConfig.tsx
var fc = [
	{ value: "claude-opus-4-7" },
	{ value: "claude-sonnet-4-6" },
	{ value: "claude-haiku-4-5-20251001" }
];
function pc(e) {
	if (!e) return !1;
	let t = e.properties;
	if (!t || typeof t != "object" || Array.isArray(t)) return !1;
	let n = t.regions;
	return typeof n == "object" && !!n;
}
function mc(e) {
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
var hc = "{\n  \"type\": \"object\",\n  \"properties\": {\n    \"caption\": { \"type\": \"string\" }\n  }\n}";
function gc({ data: e, onChange: t, nodeId: n }) {
	let r = Rt(), i = no(n ?? null), a = Ve("image:vision-analyze", fc), [o, s] = V(!1), [c, l] = V(e.outputSchema ? JSON.stringify(e.outputSchema, null, 2) : ""), [u, d] = V(null), f = !e.userPrompt?.trim(), p = !e.imageRefPath?.trim(), m = !!e.imageRefPath && !e.imageRefPath.startsWith("$."), h = pc(e.outputSchema), g = L((e) => {
		t({ seedRegions: e });
	}, [t]), _ = (e) => {
		l(e);
		let n = mc(e);
		if (!n.ok) {
			d(n.error);
			return;
		}
		d(null), t({ outputSchema: n.value });
	}, v = p ? "Image reference path is required." : m ? "Path must start with $." : void 0;
	return /* @__PURE__ */ W(qa, { children: [
		/* @__PURE__ */ U(X, {
			label: "Model",
			help: "Requires the host's vision credentials on the executor.",
			controlId: `${r}-model`,
			render: ({ controlId: n, describedById: r }) => /* @__PURE__ */ U(E, {
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
			render: ({ controlId: n, describedById: r }) => /* @__PURE__ */ W(H, { children: [/* @__PURE__ */ U(T, {
				size: "sm",
				mono: !0,
				spellCheck: !1,
				invalid: !!v,
				id: n,
				"aria-describedby": r,
				value: e.imageRefPath ?? "",
				onChange: (e) => t({ imageRefPath: e.target.value }),
				placeholder: "$.trigger.imageRef"
			}), /* @__PURE__ */ U(Ja, {
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
			render: ({ controlId: n, describedById: r }) => /* @__PURE__ */ U(N, {
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
				children: [/* @__PURE__ */ U(Ns, {
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
			render: ({ controlId: e, describedById: t }) => /* @__PURE__ */ U(N, {
				rows: 6,
				invalid: !!u,
				className: "font-mono text-[11px]",
				id: e,
				"aria-describedby": t,
				value: c,
				onChange: (e) => _(e.target.value),
				placeholder: hc
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
				render: ({ controlId: n, describedById: r }) => /* @__PURE__ */ U(P, {
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
				render: ({ controlId: n, describedById: r }) => /* @__PURE__ */ U(N, {
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
var _c = [{
	value: "claude-haiku-4-5",
	label: "Claude Haiku 4.5 (default — fast)"
}, {
	value: "claude-sonnet-4-6",
	label: "Claude Sonnet 4.6 (more accurate)"
}];
function vc({ data: e, onChange: t, nodeId: n }) {
	let r = Ve("image:vision", _c), i = !e.imageRefPath?.trim();
	return /* @__PURE__ */ W(qa, { children: [
		/* @__PURE__ */ U(ro, {
			value: e.imageRefPath,
			onChange: (e) => t({ imageRefPath: e ?? "" }),
			nodeId: n,
			label: "Image ref path",
			help: i ? "Required — JSONPath to the imageId to tag." : "JSONPath to the imageId to tag."
		}),
		/* @__PURE__ */ U(X, {
			label: "Candidate tags",
			help: "Restricts tagging to this vocabulary. Leave empty for open-ended tags.",
			children: /* @__PURE__ */ U(u, {
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
			render: ({ describedById: n, controlId: r }) => /* @__PURE__ */ U(P, {
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
			children: /* @__PURE__ */ U(E, {
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
			children: /* @__PURE__ */ U(N, {
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
			children: /* @__PURE__ */ U(P, {
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
var yc = 2;
function bc({ data: e, onChange: t, nodeId: n }) {
	let r = Rt(), i = Ve("image:vision", _c), a = e.labels ?? [], o = !e.imageRefPath?.trim();
	return /* @__PURE__ */ W(qa, { children: [
		/* @__PURE__ */ U(ro, {
			value: e.imageRefPath,
			onChange: (e) => t({ imageRefPath: e ?? "" }),
			nodeId: n,
			label: "Image ref path",
			help: o ? "Required — JSONPath to the imageId to classify." : "JSONPath to the imageId to classify."
		}),
		/* @__PURE__ */ U(X, {
			label: "Labels",
			required: !0,
			error: a.length < yc ? `At least ${yc} labels are required to classify between.` : void 0,
			help: "The model returns the single best-matching label.",
			render: ({ describedById: e, labelId: n }) => /* @__PURE__ */ U("div", {
				role: "group",
				"aria-labelledby": n,
				"aria-describedby": e,
				children: /* @__PURE__ */ U(u, {
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
			render: ({ controlId: n, describedById: r }) => /* @__PURE__ */ U(E, {
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
			render: ({ controlId: n, describedById: r }) => /* @__PURE__ */ U(N, {
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
			render: ({ controlId: n, describedById: r }) => /* @__PURE__ */ U(P, {
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
function xc({ data: e, onChange: t, nodeId: n }) {
	let r = Rt(), i = Ve("image:vision", _c), a = !e.imageRefPath?.trim(), o = !e.userPrompt?.trim();
	return /* @__PURE__ */ W(qa, { children: [
		/* @__PURE__ */ U(ro, {
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
			render: ({ controlId: n, describedById: r }) => /* @__PURE__ */ U(N, {
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
			render: ({ controlId: n, describedById: r }) => /* @__PURE__ */ U(E, {
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
			render: ({ controlId: n, describedById: r }) => /* @__PURE__ */ U(N, {
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
			render: ({ controlId: n, describedById: r }) => /* @__PURE__ */ U(P, {
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
var Sc = [{
	value: "claude-sonnet-4-6",
	label: "Claude Sonnet 4.6 (default — best OCR accuracy)"
}, {
	value: "claude-haiku-4-5",
	label: "Claude Haiku 4.5 (faster, lower accuracy)"
}];
function Cc({ data: e, onChange: t, nodeId: n }) {
	let r = Rt(), i = Ve("image:vision-ocr", Sc), a = !e.imageRefPath?.trim();
	return /* @__PURE__ */ W(qa, { children: [
		/* @__PURE__ */ U(ro, {
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
			render: ({ controlId: n, describedById: r }) => /* @__PURE__ */ U(E, {
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
			render: ({ controlId: n, describedById: r }) => /* @__PURE__ */ U(N, {
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
			render: ({ controlId: n, describedById: r }) => /* @__PURE__ */ U(P, {
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
var wc = [{
	value: "amazon.titan-image-generator-v2:0",
	label: "Titan v2 (default)"
}, {
	value: "amazon.titan-image-generator-v1",
	label: "Titan v1"
}], Tc = 64, Ec = 2048, Dc = 8;
function Oc({ data: e, onChange: t }) {
	let n = Ve("image:generate", wc), r = gt("image:generate"), i = !e.prompt?.trim(), a = e.model ?? n[0]?.value ?? "";
	return /* @__PURE__ */ W(qa, { children: [
		/* @__PURE__ */ U(X, {
			label: r.label("prompt", "Prompt"),
			required: !0,
			error: i ? "Prompt is required." : void 0,
			help: i ? void 0 : r.help("prompt", "Text description of the image to generate."),
			controlId: "generate-prompt",
			render: ({ describedById: n, controlId: a }) => /* @__PURE__ */ U(N, {
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
			render: ({ describedById: e, controlId: r }) => /* @__PURE__ */ U(E, {
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
					render: ({ describedById: n, controlId: r }) => /* @__PURE__ */ U(P, {
						id: r,
						"aria-describedby": n,
						size: "sm",
						min: Tc,
						max: Ec,
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
					render: ({ describedById: n, controlId: r }) => /* @__PURE__ */ U(P, {
						id: r,
						"aria-describedby": n,
						size: "sm",
						min: Tc,
						max: Ec,
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
			render: ({ describedById: n, controlId: r }) => /* @__PURE__ */ U(P, {
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
			render: ({ describedById: n, controlId: r }) => /* @__PURE__ */ U(P, {
				id: r,
				"aria-describedby": n,
				size: "sm",
				min: 1,
				max: Dc,
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
var kc = [{
	value: "amazon.nova-canvas-v1:0",
	label: "Nova Canvas v1 (default)"
}], Ac = 8;
function jc({ data: e, onChange: t, nodeId: n }) {
	let r = Ve("image:edit", kc);
	return /* @__PURE__ */ W(qa, { children: [
		/* @__PURE__ */ U(ro, {
			value: e.sourceImagePath,
			onChange: (e) => t({ sourceImagePath: e }),
			nodeId: n
		}),
		/* @__PURE__ */ U(X, {
			label: "Model",
			controlId: "variation-model",
			render: ({ describedById: n, controlId: i }) => /* @__PURE__ */ U(E, {
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
			render: ({ describedById: n, controlId: r }) => /* @__PURE__ */ U(P, {
				id: r,
				"aria-describedby": n,
				size: "sm",
				min: 1,
				max: Ac,
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
			render: ({ describedById: n, controlId: r }) => /* @__PURE__ */ U(P, {
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
var Mc = ["$.steps.mask.output.imageId", "$.trigger.maskRef"];
function Nc({ data: e, onChange: t, nodeId: n }) {
	let r = Ve("image:edit", kc), i = !e.prompt?.trim();
	return /* @__PURE__ */ W(qa, { children: [
		/* @__PURE__ */ U(ro, {
			value: e.sourceImagePath,
			onChange: (e) => t({ sourceImagePath: e }),
			nodeId: n
		}),
		/* @__PURE__ */ U(X, {
			label: "Mask image path",
			help: "Optional. White pixels are the edit region, black is preserved. Omit for outpainting.",
			controlId: "edit-prompt-mask-path",
			render: ({ describedById: n, controlId: r }) => /* @__PURE__ */ W(H, { children: [/* @__PURE__ */ U(T, {
				id: r,
				"aria-describedby": n,
				size: "sm",
				mono: !0,
				spellCheck: !1,
				value: e.maskImagePath ?? "",
				onChange: (e) => t({ maskImagePath: e.target.value.trim() || void 0 }),
				placeholder: "$.steps.mask.output.imageId"
			}), /* @__PURE__ */ U(Ja, {
				samples: Mc,
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
			render: ({ describedById: n, controlId: r }) => /* @__PURE__ */ U(N, {
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
			render: ({ describedById: n, controlId: i }) => /* @__PURE__ */ U(E, {
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
var Pc = {
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
function Fc({ data: e, onChange: t }) {
	return /* @__PURE__ */ W(qa, { children: [/* @__PURE__ */ W("div", { children: [
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
		/* @__PURE__ */ U(T, {
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
		/* @__PURE__ */ U(T, {
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
var Ic = [
	"{{scatter.item.label}}",
	"{{scatter.index}}",
	"{{scatter.parentImageId}}"
];
function Lc({ data: e, onChange: t, nodeId: n }) {
	let r = no(n ?? null);
	return /* @__PURE__ */ W(qa, { children: [/* @__PURE__ */ W("div", { children: [
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
		/* @__PURE__ */ U(T, {
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
		/* @__PURE__ */ U(Ja, {
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
		/* @__PURE__ */ U(T, {
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
			}), /* @__PURE__ */ U(Ja, {
				samples: Ic,
				onSelect: (n) => {
					t({ filenameTemplate: (e.filenameTemplate ?? "") + n });
				}
			})]
		})
	] })] });
}
//#endregion
//#region src/components/pipelines/nodes/memory/MemoryConfig.tsx
var Rc = [{
	value: "read",
	label: "Read",
	help: "Look records up and write them into context."
}, {
	value: "write",
	label: "Write",
	help: "Persist a value from context into memory."
}], zc = [{
	value: "session",
	label: "Session",
	help: "Scoped to this run; cleared when the session ends."
}, {
	value: "long-term",
	label: "Long-term",
	help: "Persists across runs for the namespace."
}];
function Bc({ data: e, onChange: t, nodeId: n }) {
	let r = Rt(), { paths: i, unresolved: a } = to(n ?? null), o = e.mode === "write", s = !e.namespace?.trim(), c = !e.keyExpression?.trim(), l = o && !e.valueField?.trim(), u = Rc.find((t) => t.value === e.mode)?.help, d = zc.find((t) => t.value === e.scope)?.help;
	return /* @__PURE__ */ W(qa, { children: [
		/* @__PURE__ */ U(X, {
			label: "Mode",
			required: !0,
			help: u,
			controlId: `${r}-mode`,
			render: ({ controlId: n, describedById: r }) => /* @__PURE__ */ U(E, {
				size: "sm",
				id: n,
				"aria-describedby": r,
				value: e.mode,
				onChange: (e) => t({ mode: e.target.value }),
				options: Rc.map((e) => ({
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
			render: ({ controlId: n, describedById: r }) => /* @__PURE__ */ U(E, {
				size: "sm",
				id: n,
				"aria-describedby": r,
				value: e.scope,
				onChange: (e) => t({ scope: e.target.value }),
				options: zc.map((e) => ({
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
			render: ({ controlId: n, describedById: r }) => /* @__PURE__ */ U(T, {
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
			render: ({ controlId: n, describedById: r }) => /* @__PURE__ */ U(T, {
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
				children: /* @__PURE__ */ U(Co, {
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
			render: ({ controlId: n, describedById: r }) => /* @__PURE__ */ U(T, {
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
			render: ({ controlId: n, describedById: r }) => /* @__PURE__ */ U(T, {
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
var Vc = 100;
function Hc({ data: e, onChange: t, nodeId: n }) {
	let r = Rt(), { paths: i, unresolved: a } = to(n ?? null), o = gt("knowledge-base"), s = !e.knowledgeBaseId?.trim(), c = !e.queryTemplate?.trim(), l = e.topK ?? 0, u = !Number.isFinite(l) || l < 1 || l > Vc, d = e.scoreThreshold, f = d !== void 0 && (d < 0 || d > 1);
	return /* @__PURE__ */ W(qa, { children: [/* @__PURE__ */ W(Ka, {
		title: "Knowledge base",
		children: [
			/* @__PURE__ */ U(X, {
				label: o.label("knowledgeBaseId", "Knowledge base ID"),
				required: !0,
				error: s ? "Knowledge base ID is required." : void 0,
				help: s ? void 0 : o.help("knowledgeBaseId", "The knowledge base to retrieve from."),
				controlId: `${r}-kb-id`,
				render: ({ controlId: n, describedById: r }) => /* @__PURE__ */ U(T, {
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
				render: ({ controlId: n, describedById: r }) => /* @__PURE__ */ U(N, {
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
					children: /* @__PURE__ */ U(Co, {
						paths: i,
						unresolved: a(e.queryTemplate ?? ""),
						onInsert: (n) => t({ queryTemplate: `${e.queryTemplate ?? ""}${n}` })
					})
				})
			})
		]
	}), /* @__PURE__ */ W(Ka, {
		title: "Retrieval",
		children: [
			/* @__PURE__ */ U(X, {
				label: o.label("topK", "Top K"),
				required: !0,
				error: u ? `Must be between 1 and ${Vc}.` : void 0,
				help: u ? void 0 : o.help("topK", "How many passages to retrieve."),
				controlId: `${r}-top-k`,
				render: ({ controlId: e, describedById: n }) => /* @__PURE__ */ U(P, {
					size: "sm",
					min: 1,
					max: Vc,
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
				render: ({ controlId: e, describedById: n }) => /* @__PURE__ */ U(P, {
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
				render: ({ controlId: n, describedById: r }) => /* @__PURE__ */ U(T, {
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
			/* @__PURE__ */ U(xo, {
				value: e.retryPolicy,
				onChange: (e) => t({ retryPolicy: e })
			})
		]
	})] });
}
//#endregion
//#region src/components/pipelines/nodes/graph-query/GraphQueryConfig.tsx
var Uc = "MATCH (u:User {id: $userId})-[:AUTHORED]->(d:Doc)\nRETURN d.title LIMIT 10", Wc = 100, Gc = 3e5;
function Kc({ data: e, onChange: t, nodeId: n }) {
	let r = Rt(), { paths: i, unresolved: a } = to(n ?? null), o = gt("graph-query"), s = !e.graphId?.trim(), c = !e.query?.trim(), l = e.timeoutMs, u = l !== void 0 && (!Number.isFinite(l) || l < Wc || l > Gc), d = z(() => Object.entries(e.parameters ?? {}), [e.parameters]), f = (e) => t({ parameters: Object.keys(e).length > 0 ? e : void 0 }), [p, h] = V(null), g = (t, n) => {
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
	return /* @__PURE__ */ W(qa, { children: [
		/* @__PURE__ */ W(Ka, {
			title: "Graph",
			children: [/* @__PURE__ */ U(X, {
				label: o.label("graphId", "Graph ID"),
				required: !0,
				error: s ? "Graph ID is required." : void 0,
				help: s ? void 0 : o.help("graphId", "The graph to query."),
				controlId: `${r}-graph-id`,
				render: ({ controlId: n, describedById: r }) => /* @__PURE__ */ U(T, {
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
				render: ({ controlId: n, describedById: r }) => /* @__PURE__ */ U(N, {
					rows: 6,
					invalid: c,
					spellCheck: !1,
					id: n,
					"aria-describedby": r,
					value: e.query ?? "",
					onChange: (e) => t({ query: e.target.value }),
					placeholder: o.placeholder("query", Uc)
				})
			})]
		}),
		/* @__PURE__ */ W(Ka, {
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
								/* @__PURE__ */ U(T, {
									size: "sm",
									mono: !0,
									spellCheck: !1,
									value: e,
									onChange: (t) => g(e, t.target.value),
									invalid: e.trim() === "",
									placeholder: "userId",
									"aria-label": `Parameter ${n + 1} name`
								}),
								/* @__PURE__ */ U(T, {
									size: "sm",
									mono: !0,
									spellCheck: !1,
									value: t,
									onChange: (t) => _(e, t.target.value),
									placeholder: "{{context.trigger.userId}}",
									"aria-label": `Parameter ${n + 1} value`
								}),
								/* @__PURE__ */ U(m, {
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
						/* @__PURE__ */ U("div", { children: /* @__PURE__ */ U(m, {
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
					children: /* @__PURE__ */ U(Co, {
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
		/* @__PURE__ */ W(Ka, {
			title: "Execution",
			children: [
				/* @__PURE__ */ U(X, {
					label: "Timeout",
					error: u ? `Must be between ${Wc} and ${Gc} ms.` : void 0,
					help: u ? void 0 : "Leave empty to use the executor default.",
					controlId: `${r}-timeout`,
					render: ({ controlId: e, describedById: n }) => /* @__PURE__ */ U(P, {
						size: "sm",
						min: Wc,
						max: Gc,
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
					render: ({ controlId: n, describedById: r }) => /* @__PURE__ */ U(T, {
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
				/* @__PURE__ */ U(xo, {
					value: e.retryPolicy,
					onChange: (e) => t({ retryPolicy: e })
				})
			]
		})
	] });
}
//#endregion
//#region src/components/pipelines/vision/CaptionPanel.tsx
function qc({ result: e, className: t }) {
	let { caption: r, setting: i, location: a, timeOfDay: o, mood: s, colors: c } = e;
	return !r && !i && !a && !o && !s && (!c || c.length === 0) ? null : /* @__PURE__ */ W("section", {
		className: n("flex flex-col gap-2", t),
		children: [r ? /* @__PURE__ */ U("p", {
			className: "text-base leading-relaxed text-text-primary",
			children: r
		}) : null, /* @__PURE__ */ W("div", {
			className: "flex flex-wrap gap-1.5",
			children: [
				i ? /* @__PURE__ */ W(g, {
					tone: "neutral",
					size: "sm",
					title: "Scene setting",
					children: ["setting: ", i]
				}) : null,
				a ? /* @__PURE__ */ W(g, {
					tone: "neutral",
					size: "sm",
					title: "Location",
					children: ["loc: ", a]
				}) : null,
				o ? /* @__PURE__ */ W(g, {
					tone: "neutral",
					size: "sm",
					title: "Time of day",
					children: ["tod: ", o]
				}) : null,
				s ? /* @__PURE__ */ W(g, {
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
var Jc = {
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
function Yc({ imageUrl: e, imageDataUrl: t, imageWidth: r, imageHeight: i, people: a, objects: o, show: s = "both", onSelectPerson: c, onSelectObject: l, className: u, alt: d }) {
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
		let u = o / _.w * 100, d = s / _.h * 100, f = (c - o) / _.w * 100, p = (l - s) / _.h * 100, m = Jc[r];
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
function Xc(e) {
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
function Zc({ people: e, highlightedIndex: t, onSelect: r, className: i }) {
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
							e.ageBucket ? /* @__PURE__ */ U(g, {
								tone: "neutral",
								size: "sm",
								children: e.ageBucket.replace("_", " ")
							}) : null,
							e.gender ? /* @__PURE__ */ U(g, {
								tone: "neutral",
								size: "sm",
								children: e.gender
							}) : null,
							e.faceOrientation ? /* @__PURE__ */ U(g, {
								tone: "neutral",
								size: "sm",
								title: "Face orientation",
								children: e.faceOrientation
							}) : null,
							e.expression ? /* @__PURE__ */ U(g, {
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
function Qc({ objects: e, onSelect: t, className: r }) {
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
function $c({ tags: e, onTagClick: t, className: r }) {
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
				children: /* @__PURE__ */ W(g, {
					tone: "info",
					size: "sm",
					children: ["#", e]
				})
			}, e) : /* @__PURE__ */ W(g, {
				tone: "info",
				size: "sm",
				children: ["#", e]
			}, e))
		})]
	});
}
//#endregion
//#region src/components/pipelines/vision/EditRecommendationsPanel.tsx
function el(e) {
	return e ? e === "correct" || e === "neutral" || e === "normal" ? "success" : "warning" : "neutral";
}
function tl(e) {
	let t = el(e);
	return t === "success" ? `OK · ${e}` : t === "warning" ? `ADJUST · ${e}` : e ?? "";
}
function nl({ exposure: e, whiteBalance: t, contrast: r, composition: i, edits: a, onApplyEdit: o, className: s }) {
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
								/* @__PURE__ */ U(g, {
									tone: el(e.verdict),
									size: "sm",
									children: tl(e.verdict)
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
								/* @__PURE__ */ U(g, {
									tone: el(t.verdict),
									size: "sm",
									children: tl(t.verdict)
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
							children: /* @__PURE__ */ U(g, {
								tone: el(r),
								size: "sm",
								children: tl(r)
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
function rl({ result: e, showImage: t = !0, showCaption: r = !0, showPeople: i = !0, showObjects: a = !0, showTags: o = !0, showEdits: s = !0, showRawText: c = !1, onTagClick: l, onApplyEdit: u, className: d }) {
	let [f, p] = V(), [m, h] = V(!1), g = (e) => p(f === e.index ? void 0 : e.index), _ = Xc(e);
	return /* @__PURE__ */ W("div", {
		className: n("flex w-full flex-col gap-4 text-text-primary", d),
		children: [
			/* @__PURE__ */ W("div", {
				className: "grid grid-cols-1 gap-4 md:grid-cols-12",
				children: [t ? /* @__PURE__ */ W("div", {
					className: "md:col-span-7",
					children: [/* @__PURE__ */ U(Yc, {
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
					children: [r ? /* @__PURE__ */ U(qc, { result: e }) : null, i && e.people && e.people.length > 0 ? /* @__PURE__ */ U(Zc, {
						people: e.people,
						highlightedIndex: f,
						onSelect: g
					}) : null]
				})]
			}),
			a && e.objects && e.objects.length > 0 ? /* @__PURE__ */ U(Qc, { objects: e.objects }) : null,
			o && e.tags && e.tags.length > 0 ? /* @__PURE__ */ U($c, {
				tags: e.tags,
				onTagClick: l
			}) : null,
			s ? /* @__PURE__ */ U(nl, {
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
var il = [
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
], al = "claude-sonnet-4-6", ol = [
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
function sl(e) {
	let t = [`${e.inputTokens} in`, `${e.outputTokens} out`];
	return e.cacheReadTokens && t.push(`${e.cacheReadTokens} cached`), t.join(" / ");
}
function cl({ systemPrompt: e, userPrompt: t, outputSchema: r, model: i, onSave: a, apiBase: o = "" }) {
	let s = Ge(), [c, l] = V(e), [u, d] = V(t), [f, p] = V(i ?? al), [m, h] = V(r ? JSON.stringify(r, null, 2) : ""), [g, _] = V("0"), [v, y] = V(null), [b, x] = V(!1), [S, C] = V(null), [w, T] = V(null), D = L(() => {
		let e = m.trim();
		if (e) try {
			let t = JSON.parse(e);
			if (t && typeof t == "object" && !Array.isArray(t)) return t;
		} catch {}
	}, [m]), ee = L((e) => {
		_(e);
		let t = ol[Number(e)];
		t && (h(t.value ? JSON.stringify(t.value, null, 2) : ""), t.systemPrompt !== void 0 && l(t.systemPrompt));
	}, []), O = v?.imageId ?? null, k = O ? s.getImageUrl(O) : null, te = L(async () => {
		if (!O) {
			C("Upload or paste a sample image URL first.");
			return;
		}
		if (!u.trim()) {
			C("User prompt is required.");
			return;
		}
		x(!0), C(null), T(null);
		let e = D();
		try {
			let t = await fetch(`${o}/api/pipeline/preview/vision`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					imageId: O,
					systemPrompt: c.trim() || void 0,
					userPrompt: u.trim(),
					outputSchema: e,
					model: f || al
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
				imageUrl: k ?? "",
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
		O,
		k,
		u,
		c,
		f,
		D,
		o
	]), ne = () => {
		a({
			systemPrompt: c,
			userPrompt: u,
			outputSchema: D()
		});
	}, A = "text-[12px] font-semibold text-text-secondary";
	return /* @__PURE__ */ W("div", {
		className: "flex flex-col gap-4 px-4 py-3",
		"data-testid": "vision-prompt-bench",
		children: [
			/* @__PURE__ */ W("div", { children: [/* @__PURE__ */ U("div", {
				className: n(A, "mb-1"),
				children: "Sample image"
			}), /* @__PURE__ */ U(Gs, {
				value: v,
				onChange: (e) => y(e),
				"data-testid": "bench-image-uploader"
			})] }),
			/* @__PURE__ */ W("div", {
				className: "flex flex-col gap-2",
				children: [
					/* @__PURE__ */ W("div", { children: [/* @__PURE__ */ U("label", {
						className: A,
						children: "System prompt"
					}), /* @__PURE__ */ U(N, {
						value: c,
						onChange: (e) => l(e.target.value),
						rows: 3,
						placeholder: "Optional override of the default vision system prompt.",
						"data-testid": "bench-system-prompt",
						className: "mt-1 text-[12px] font-mono"
					})] }),
					/* @__PURE__ */ W("div", { children: [/* @__PURE__ */ W("label", {
						className: A,
						children: ["User prompt ", /* @__PURE__ */ U("span", {
							className: "text-danger-fg",
							children: "*"
						})]
					}), /* @__PURE__ */ U(N, {
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
							className: A,
							children: "Output schema"
						}), /* @__PURE__ */ U(E, {
							value: g,
							onChange: (e) => ee(e.target.value),
							options: ol.map((e, t) => ({
								value: String(t),
								label: e.label
							})),
							size: "sm",
							"aria-label": "Schema preset",
							"data-testid": "bench-schema-preset"
						})]
					}), /* @__PURE__ */ U(N, {
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
				children: [/* @__PURE__ */ U(E, {
					value: f,
					onChange: (e) => p(e.target.value),
					options: il,
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
								children: [sl(w.usage), " tokens"]
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
					/* @__PURE__ */ U(rl, {
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
						onClick: ne,
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
var ll = {
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
}, ul = {
	completed: "success",
	failed: "error",
	running: "info",
	pending: "pending",
	awaiting: "warning",
	skipped: "neutral",
	cancelled: "neutral"
}, dl = /* @__PURE__ */ new Set([
	"image:vision-analyze",
	"image:vision-classify",
	"image:vision-describe",
	"image:vision-tag",
	"image:vision-extract-text"
]), fl = ({ data: e }) => /* @__PURE__ */ U("div", {
	className: "p-4",
	"data-testid": "config-panel-no-settings",
	children: /* @__PURE__ */ U(k, {
		icon: "⚙️",
		title: "No settings for this node type yet",
		description: /* @__PURE__ */ W(H, { children: [/* @__PURE__ */ U("code", {
			className: "font-mono text-[12px]",
			children: String(e.type)
		}), " has no configurable options in this version. The node can sit on the canvas and connect to others, and it will run with its defaults wherever the executor supports it."] })
	})
}), pl = [
	"agent",
	"mcp-tool",
	"guardrail",
	"policy",
	"ag-ui-output"
], ml = {
	trigger: go,
	llm: Oo,
	transform: jo,
	condition: No,
	action: Ro,
	fork: Ho,
	join: Go,
	approval: Xo,
	agent: fl,
	"mcp-tool": fl,
	"knowledge-base": Hc,
	"graph-query": Kc,
	memory: Bc,
	guardrail: fl,
	policy: fl,
	"ag-ui-output": fl,
	"image-source": Fc,
	"image:save": Lc,
	scatter: us,
	"image:resize": fs,
	"image:transform": _s,
	"image:format-convert": xs,
	"image:sharpen": Ss,
	"image:watermark": ws,
	"image:crop": Vs,
	"image:adjust-bw": Us,
	"image:adjust-layer": sc,
	"image:dimensions": lc,
	"image:upscale": dc,
	"image:vision-analyze": gc,
	"image:vision-classify": bc,
	"image:vision-describe": xc,
	"image:vision-tag": vc,
	"image:vision-extract-text": Cc,
	"image:generate": Oc,
	"image:variation": jc,
	"image:edit-prompt": Nc
};
function hl(e, t) {
	let n = ml[e.type];
	return /* @__PURE__ */ U(n, {
		data: e.data,
		onChange: t,
		nodeId: e.id
	}, e.id);
}
function gl({ selectedIds: e }) {
	let { definition: r, selectedNodeId: i, setSelectedNodeId: a, updateNodeData: o, removeNode: s, duplicateNodes: c } = he(), [l, u] = V("config"), d = B(null), f = B(null);
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
	let y = g ? ll[g.type] : null, b = () => {
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
					let t = g && dl.has(g.type) ? [
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
				children: (g && dl.has(g.type) ? [
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
					l === "config" && hl(g, S),
					l === "runs" && (_ ? /* @__PURE__ */ W("div", {
						className: "p-4 flex flex-col gap-3 text-[13px]",
						"data-testid": "config-runs-latest",
						children: [
							/* @__PURE__ */ W("div", {
								className: "flex items-center gap-2",
								children: [
									/* @__PURE__ */ U(ne, {
										state: ul[_.status],
										label: _.status,
										size: "sm",
										"data-testid": "config-runs-status"
									}),
									_.durationMs != null && /* @__PURE__ */ U("span", {
										className: "text-text-secondary tabular-nums",
										children: Ua(_.durationMs)
									}),
									_.startedAt && /* @__PURE__ */ U("span", {
										className: "text-text-tertiary ml-auto",
										children: Ga(_.startedAt)
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
						children: Pc[g.type] ?? /* @__PURE__ */ U("p", {
							className: "text-text-secondary",
							children: "No docs available for this node type."
						})
					}),
					l === "bench" && dl.has(g.type) && (() => {
						let e = g.data;
						return /* @__PURE__ */ U(cl, {
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
function _l(e) {
	return e == null || e === 0 ? "--" : e < .001 ? "<$0.001" : e < .01 ? `$${e.toFixed(4)}` : e < 1 ? `$${e.toFixed(3)}` : `$${e.toFixed(2)}`;
}
function vl(e) {
	return e == null || e === 0 ? "text-text-tertiary" : e < .01 ? "text-success-fg" : e < .1 ? "text-warning-fg" : e < 1 ? "text-caution-fg" : "text-danger-fg";
}
function yl(e) {
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
function bl(e) {
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
function xl(e) {
	return e.triggeredBy.userId ? e.triggeredBy.userId : e.triggeredBy.triggerType || "manual";
}
function Sl({ label: e, children: t }) {
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
function Cl({ pipelineId: e, run: t, onBack: r }) {
	let i = Bt();
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
					/* @__PURE__ */ U(Sl, {
						label: "Status",
						children: /* @__PURE__ */ U(g, {
							tone: yl(t.status),
							"aria-label": `Status: ${bl(t.status)}`,
							children: bl(t.status)
						})
					}),
					/* @__PURE__ */ U(Sl, {
						label: "Started",
						children: new Date(t.startedAt).toLocaleString()
					}),
					t.completedAt && /* @__PURE__ */ U(Sl, {
						label: "Completed",
						children: new Date(t.completedAt).toLocaleString()
					}),
					/* @__PURE__ */ U(Sl, {
						label: "Duration",
						children: Ua(t.durationMs)
					}),
					/* @__PURE__ */ U(Sl, {
						label: "Triggered by",
						children: xl(t)
					}),
					/* @__PURE__ */ U(Sl, {
						label: "Trigger type",
						children: t.triggeredBy.triggerType
					}),
					t.estimatedCostUsd != null && t.estimatedCostUsd > 0 && /* @__PURE__ */ W(Sl, {
						label: "Est. Cost",
						children: [/* @__PURE__ */ U("span", {
							className: n("font-semibold", vl(t.estimatedCostUsd)),
							children: _l(t.estimatedCostUsd)
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
							let n = yl(t.status), r = bl(t.status), i = t.output, a = i?.response;
							return /* @__PURE__ */ W("div", {
								className: "mb-2",
								children: [
									/* @__PURE__ */ W("div", {
										className: "flex items-center gap-2 py-1 text-xs",
										children: [
											/* @__PURE__ */ U(g, {
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
												children: Ua(t.durationMs)
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
function wl(e) {
	return e == null || e === 0 ? "--" : e < .001 ? "<$0.001" : e < .01 ? `$${e.toFixed(4)}` : e < 1 ? `$${e.toFixed(3)}` : `$${e.toFixed(2)}`;
}
function Tl(e) {
	return e == null || e === 0 ? "text-text-tertiary" : e < .01 ? "text-success-fg" : e < .1 ? "text-warning-fg" : e < 1 ? "text-caution-fg" : "text-danger-fg";
}
function El(e) {
	let t = Date.now() - new Date(e).getTime();
	return t < 6e4 ? "just now" : t < 36e5 ? `${Math.floor(t / 6e4)}m ago` : t < 864e5 ? `${Math.floor(t / 36e5)}h ago` : t < 2592e5 ? `${Math.floor(t / 864e5)}d ago` : new Date(e).toLocaleDateString();
}
function Dl(e) {
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
function Ol(e) {
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
function kl(e) {
	return e.triggeredBy.userId ? e.triggeredBy.userId : e.triggeredBy.triggerType || "manual";
}
function Al({ pipelineId: e, onClose: t }) {
	let r = Bt(), [i, a] = V([]), [o, s] = V(!0), [c, l] = V(null), [u, d] = V(null), [f, p] = V(!1), [m, h] = V([]), _ = B(null), v = L(async () => {
		s(!0), l(null);
		try {
			let t = await et(e, { limit: 50 });
			a(t.runs);
		} catch (e) {
			l(e instanceof Error ? e.message : "Failed to load runs");
		} finally {
			s(!1);
		}
	}, [e]);
	R(() => {
		_.current !== e && (_.current = e, v());
	}, [e, v]), fe("*", L((t) => {
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
	let y = z(() => i.find((e) => e.id === u) ?? null, [i, u]), b = L((e) => {
		h((t) => t.includes(e) ? t.filter((t) => t !== e) : t.length >= 2 ? [t[1], e] : [...t, e]);
	}, []), x = L((e) => {
		f ? b(e) : d(e);
	}, [f, b]), S = L(() => {
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
					onClick: S,
					"data-testid": "runs-panel-compare-action",
					className: n("ml-auto rounded px-2.5 py-0.5 font-inherit text-[11px] font-semibold", m.length === 2 ? "cursor-pointer border border-primary bg-primary text-white" : "cursor-not-allowed border border-border bg-surface text-text-disabled"),
					children: "Compare"
				})]
			}),
			/* @__PURE__ */ W("div", {
				className: "relative min-h-0 flex-1",
				children: [
					y && /* @__PURE__ */ U(Cl, {
						pipelineId: e,
						run: y,
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
							onClick: () => void v(),
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
							let t = Dl(e.status), r = Ol(e.status), i = m.includes(e.id);
							return /* @__PURE__ */ W("li", {
								"data-testid": `runs-panel-row-${e.id}`,
								role: "button",
								tabIndex: 0,
								"aria-label": f ? `Toggle run ${e.id.slice(0, 8)} for comparison` : `Open run ${e.id.slice(0, 8)}`,
								onClick: () => x(e.id),
								onKeyDown: de(() => x(e.id)),
								className: n("cursor-pointer border-b border-border px-4 py-2.5 transition-colors duration-100 hover:bg-surface-hover", i && "bg-info-bg"),
								children: [
									/* @__PURE__ */ W("div", {
										className: "flex items-center gap-2",
										children: [
											f && /* @__PURE__ */ U(le, {
												checked: i,
												onChange: () => b(e.id),
												onClick: (e) => e.stopPropagation(),
												onKeyDown: (e) => e.stopPropagation(),
												"data-testid": `runs-panel-compare-check-${e.id}`,
												className: "m-0 shrink-0",
												"aria-label": `Select run ${e.id.slice(0, 8)} for comparison`
											}),
											/* @__PURE__ */ U(g, {
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
												children: El(e.startedAt)
											})
										]
									}),
									/* @__PURE__ */ W("div", {
										className: "mt-1 flex items-center gap-2 text-[11px] text-text-tertiary",
										children: [
											/* @__PURE__ */ U("span", { children: Ua(e.durationMs) }),
											e.estimatedCostUsd != null && e.estimatedCostUsd > 0 && /* @__PURE__ */ U("span", {
												className: n("font-mono font-semibold", Tl(e.estimatedCostUsd)),
												title: `Estimated cost: ${wl(e.estimatedCostUsd)}`,
												children: wl(e.estimatedCostUsd)
											}),
											e.estimatedCostUsd != null && e.estimatedCostUsd > 1 && /* @__PURE__ */ U("span", {
												className: "rounded-sm bg-warning-bg px-1 py-px text-[9px] font-bold uppercase text-warning-fg",
												children: "High Cost"
											}),
											/* @__PURE__ */ U("span", {
												className: "ml-auto",
												children: kl(e)
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
function jl({ pipelineId: e, selectedNodeId: t, sidebarTab: r, onTabChange: i }) {
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
			}) : /* @__PURE__ */ U(gl, {})), r === "runs" && /* @__PURE__ */ U(Al, {
				pipelineId: e,
				onClose: () => i("config")
			})]
		})]
	});
}
//#endregion
//#region src/components/pipelines/PipelineEditorPage.tsx
function Ml(e) {
	return e.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "pipeline";
}
function Nl(e) {
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
function Pl(e) {
	if (!(e instanceof HTMLElement)) return !1;
	let t = e.tagName;
	return !!(t === "INPUT" || t === "TEXTAREA" || t === "SELECT" || e.isContentEditable);
}
function Fl() {
	let { pipelineId: e } = Vt(), t = z(() => e ? Ze(e) !== null : !1, [e]);
	return !e || !t ? /* @__PURE__ */ U(zt, {
		to: "/pipelines",
		replace: !0
	}) : /* @__PURE__ */ U(Me, {
		pipelineId: e,
		children: /* @__PURE__ */ U(Il, { pipelineId: e })
	});
}
function Il({ pipelineId: e }) {
	let t = Bt(), i = he(), a = Ce(), { toast: o } = r(), { definition: s, dirty: c, selectedNodeId: l, setSelectedNodeId: d, save: f, publish: p, revert: h, undo: g, redo: _, setTags: v } = i, y = Sa(e), [b, x] = V(!1), S = B(null), w = B(c);
	R(() => (w.current && !c && (x(!0), S.current && clearTimeout(S.current), S.current = setTimeout(() => x(!1), 450)), w.current = c, () => {
		S.current &&= (clearTimeout(S.current), null);
	}), [c]);
	let T = z(() => s ? Ci(s) : null, [s]), E = (T?.errors.length ?? 0) > 0, D = z(() => Nl(s), [s]), ee = z(() => s ? s.nodes.some((e) => e.type === "trigger") : !1, [s]) ? ["trigger"] : [], [O, k] = V(!0), [te, ne] = V(() => {
		if (typeof window > "u") return !1;
		try {
			return window.localStorage.getItem("ws_pipelines_v1_show_tags") === "true";
		} catch {
			return !1;
		}
	}), A = L(() => {
		ne((e) => {
			let t = !e;
			try {
				window.localStorage.setItem("ws_pipelines_v1_show_tags", t ? "true" : "false");
			} catch {}
			return t;
		});
	}, []), [re, ie] = V(!1), [j, M] = V(!1), [ae, oe] = V(!1), [se, P] = V(!1), [ce, F] = V(!1), le = z(() => s?.publishedSnapshot ? s.publishedSnapshot : null, [s]), ue = s?.status === "published", de = !y.isRunActive && (!ue || E), fe = y.isRunActive ? "Cancel the active run" : ue ? E ? "Fix validation errors to enable runs" : "Start a new run" : "Publish the pipeline to enable runs", pe = L(async () => {
		if (y.isRunActive && y.currentRunId) {
			a.cancelRun(y.currentRunId);
			return;
		}
		if (!de) {
			if (D.length > 0) {
				y.setTriggerInputValues(Object.fromEntries(D.map((e) => [e, ""]))), y.setTriggerInputOpen(!0);
				return;
			}
			y.handleRunClick();
		}
	}, [
		y,
		a,
		de,
		D
	]), { saveError: me, clearSaveError: ge } = i;
	R(() => {
		me && (o(`Could not save: ${me}`, { type: "error" }), ge());
	}, [
		me,
		ge,
		o
	]);
	let { publishError: _e, clearPublishError: ve, publishedAt: ye } = i, be = B(ye);
	R(() => {
		ye && ye !== be.current && o("Pipeline published", { type: "success" }), be.current = ye;
	}, [ye, o]), R(() => {
		_e && (o(`Could not publish: ${_e}`, { type: "error" }), ve());
	}, [
		_e,
		ve,
		o
	]);
	let { retryError: xe, clearRetryError: Se } = a;
	R(() => {
		xe && (o(`Retry failed: ${xe.message}`, { type: "error" }), Se());
	}, [
		xe,
		Se,
		o
	]), R(() => {
		let e = (e) => {
			if (Pl(e.target)) return;
			let t = e.metaKey || e.ctrlKey;
			if (t && e.key.toLowerCase() === "s") {
				e.preventDefault(), f(), o("Saved", {
					type: "success",
					durationMs: 1200
				});
				return;
			}
			if (t && e.key === "Enter") {
				e.preventDefault(), pe();
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
		o,
		pe,
		y,
		a,
		g,
		_,
		d
	]);
	let we = () => {
		if (!s) return;
		let e = ot(s.id);
		e && t(`/pipelines/${e.id}`);
	}, Te = () => {
		if (!s) return;
		let e = xt(s.id);
		e && ba(`${Ml(s.name)}.pipeline.json`, e);
	}, Ee = async () => {
		if (!s) return;
		let e = oa(s);
		try {
			if (typeof navigator < "u" && navigator.clipboard?.writeText) await navigator.clipboard.writeText(e), o("Mermaid diagram copied", { type: "success" });
			else throw Error("clipboard unavailable");
		} catch (e) {
			console.warn("[PipelineEditor] clipboard write failed", e), o("Could not copy Mermaid diagram", { type: "error" });
		}
	}, De = () => {
		P(!0);
	}, Oe = () => {
		ie(!1), !E && p();
	}, ke = () => {
		s && (Ke(s.id), M(!1), t("/pipelines"));
	}, Ae = () => {
		Ct(e), oe(!1), o("Run history cleared", { type: "success" });
	}, je = y.currentRunId ? a.runs[y.currentRunId] : void 0;
	return s ? /* @__PURE__ */ W("div", {
		className: n("flex flex-col min-h-[calc(100vh-200px)]", "bg-surface-inset font-inherit text-text-primary", "rounded-lg border border-border overflow-hidden"),
		"data-testid": "pipeline-editor",
		children: [
			/* @__PURE__ */ U(Ta, {
				pipelineId: e,
				definition: s,
				dirty: c,
				savingFlash: b,
				isRunActive: y.isRunActive,
				isTriggering: y.isTriggering,
				runDisabled: de,
				runTitle: fe,
				currentRun: je,
				breakpoints: y.breakpoints,
				onRunClick: pe,
				onDebugRunClick: y.handleDebugRunClick,
				onExport: Te,
				onPublishClick: () => ie(!0),
				onDuplicate: we,
				onCopyMermaid: Ee,
				onViewVersions: De,
				onRevert: h,
				onToggleShowTags: A,
				showTags: te,
				onViewRunHistory: () => y.setSidebarTab("runs"),
				onClearRunHistory: () => oe(!0),
				onSimPanelOpen: () => F(!0),
				onDelete: () => M(!0)
			}),
			te && /* @__PURE__ */ W("div", {
				"data-testid": "tags-row",
				className: n("flex items-center gap-2 px-4 py-1.5", "border-b border-border bg-surface-inset", "min-h-[34px] shrink-0 sticky top-11 z-[4]"),
				children: [/* @__PURE__ */ U("span", {
					className: "text-[11px] text-text-tertiary font-semibold",
					children: "TAGS"
				}), /* @__PURE__ */ U(u, {
					value: s.tags ?? [],
					onChange: v,
					placeholder: "add tag…"
				})]
			}),
			/* @__PURE__ */ W("div", {
				className: "flex-1 flex min-h-0 relative overflow-hidden",
				children: [
					/* @__PURE__ */ U(ei, { disabledTypes: ee }),
					/* @__PURE__ */ U("div", {
						className: "flex-1 min-w-0 min-h-[600px] relative flex flex-col",
						children: /* @__PURE__ */ U(vi, {
							errorNodeId: y.activeError?.nodeId ?? null,
							onErrorNodePosition: y.handleErrorNodePosition,
							breakpoints: y.breakpoints,
							onToggleBreakpoint: y.handleToggleBreakpoint,
							pausedAtNodeId: y.pausedBreakpoint?.stepId ?? null
						})
					}),
					/* @__PURE__ */ U(jl, {
						pipelineId: e,
						selectedNodeId: l,
						sidebarTab: y.sidebarTab,
						onTabChange: y.setSidebarTab
					})
				]
			}),
			y.pausedBreakpoint && /* @__PURE__ */ U(Ha, {
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
			y.activeError && y.errorNodeAnchor && /* @__PURE__ */ U(xi, {
				error: y.activeError,
				anchor: y.errorNodeAnchor,
				onDismiss: y.handleDismissError,
				onRetry: y.handleRetryFromError
			}),
			/* @__PURE__ */ U(ya, {
				runId: y.currentRunId,
				visible: y.isRunActive && O
			}),
			/* @__PURE__ */ U(va, {
				publishConfirmOpen: re,
				onPublishClose: () => ie(!1),
				onPublishConfirm: Oe,
				hasErrors: E,
				validationErrorCount: T?.errors.length ?? 0,
				definitionName: s.name,
				definitionVersion: s.version,
				deleteConfirmOpen: j,
				onDeleteClose: () => M(!1),
				onDeleteConfirm: ke,
				clearRunsConfirmOpen: ae,
				onClearRunsClose: () => oe(!1),
				onClearRunsConfirm: Ae,
				versionDiffOpen: se,
				onVersionDiffClose: () => P(!1),
				currentDef: s,
				publishedDef: le,
				onJumpToNode: d,
				simPanelOpen: ce,
				onSimPanelClose: () => F(!1)
			}),
			/* @__PURE__ */ U(C, {
				open: y.triggerInputOpen,
				onClose: () => y.setTriggerInputOpen(!1),
				title: "Trigger inputs",
				maxWidth: 480,
				footer: /* @__PURE__ */ W(H, { children: [/* @__PURE__ */ U(m, {
					variant: "ghost",
					onClick: () => y.setTriggerInputOpen(!1),
					children: "Cancel"
				}), /* @__PURE__ */ U(m, {
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
						}), /* @__PURE__ */ U(N, {
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
function Ll(e) {
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
function Rl({ row: e, onOpen: t, onRun: r, onDuplicate: i, onExport: a, onDelete: o, selectionMode: s, selected: c, anySelected: l, onToggleSelect: u }) {
	let [d, f] = V(!1), [p, m] = V(!1), h = B(null);
	wr(h, () => f(!1), d), A(d, L(() => f(!1), []));
	let _ = e.status === "published", v = e.status === "archived", y = typeof e.publishedVersion == "number", b = Ll(e.triggerBinding), x, S;
	v ? (x = `Archived · v${e.version}`, S = "danger") : _ ? (x = `Published · v${e.version}`, S = "success") : y ? (x = `Draft · v${e.version} (published v${e.publishedVersion})`, S = "warning") : (x = `Draft · v${e.version}`, S = "neutral");
	let C = !_, w = (e) => (t) => {
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
				children: /* @__PURE__ */ U(le, {
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
					/* @__PURE__ */ U(g, {
						"aria-label": `Status: ${x}`,
						tone: S,
						size: "sm",
						children: x
					}),
					/* @__PURE__ */ W("span", {
						className: "text-[11px] text-text-secondary",
						children: [
							b.icon,
							" ",
							b.text
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
var zl = {
	draft: "Draft",
	published: "Published",
	archived: "Archived"
}, Bl = ["draft", "published"];
function Vl({ search: e, onSearchChange: t, statusFilter: r, statusExplicit: i, onToggleStatusKey: a, triggerFilter: o, onTriggerFilterChange: s, sortKey: c, onSortKeyChange: l, allVisibleSelected: u, someVisibleSelected: d, onHeaderToggleAll: f }) {
	return /* @__PURE__ */ W("div", {
		className: n("min-h-[40px] shrink-0 flex items-center gap-3 px-6", "border-b border-border bg-surface"),
		children: [
			/* @__PURE__ */ W("label", {
				className: "flex items-center gap-1.5 cursor-pointer",
				title: "Select all visible pipelines",
				children: [/* @__PURE__ */ U(le, {
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
			/* @__PURE__ */ U(T, {
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
				children: vu.map((e) => {
					let t = i ? r.has(e) : Bl.includes(e);
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
						children: zl[e]
					}, e);
				})
			}),
			/* @__PURE__ */ W("label", {
				className: "text-xs text-text-secondary flex items-center gap-1.5",
				children: ["Trigger:", /* @__PURE__ */ U(E, {
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
				children: ["Sort:", /* @__PURE__ */ U(E, {
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
var Hl = n("px-2.5 py-[5px] text-xs font-semibold", "bg-surface text-text-secondary", "border border-border-field rounded-md", "cursor-pointer font-inherit");
function Ul({ count: e, onClear: t, onExport: r, onExportAsJSON: a, onPublish: o, onArchive: s, onAddTag: c, onRemoveTag: l, onDelete: u, onDeleteWithConfirm: d, addTagOpen: f, removeTagOpen: p, onSubmitAddTag: m, onSubmitRemoveTag: h, onCloseAddTag: g, onCloseRemoveTag: _, unionTags: v }) {
	let [y, b] = V(""), x = B(null), S = B(null), C = B(null);
	R(() => {
		f && (b(""), setTimeout(() => x.current?.focus(), 30));
	}, [f]);
	let w = i(g), E = i(_);
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
			C.current?.contains(e.target) || E();
		}, t = window.setTimeout(() => {
			document.addEventListener("mousedown", e);
		}, 0);
		return () => {
			window.clearTimeout(t), document.removeEventListener("mousedown", e);
		};
	}, [p, E]);
	let D = () => {
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
				className: Hl,
				onClick: t,
				children: "Clear"
			}),
			/* @__PURE__ */ U("button", {
				"data-testid": "bulk-publish",
				className: Hl,
				onClick: o,
				children: "Publish selected"
			}),
			/* @__PURE__ */ U("button", {
				"data-testid": "bulk-archive",
				className: Hl,
				onClick: s,
				children: "Archive selected"
			}),
			/* @__PURE__ */ U("button", {
				"data-testid": "bulk-export-json",
				className: Hl,
				onClick: a,
				children: "Export selected as JSON"
			}),
			/* @__PURE__ */ U("button", {
				"data-testid": "bulk-export",
				className: Hl,
				onClick: r,
				children: "Export all"
			}),
			/* @__PURE__ */ U("button", {
				"data-testid": "bulk-delete-confirm-prompt",
				className: Hl,
				onClick: d,
				children: "Delete selected"
			}),
			/* @__PURE__ */ W("div", {
				className: "relative",
				children: [/* @__PURE__ */ U("button", {
					"data-testid": "bulk-add-tag-btn",
					className: Hl,
					onClick: c,
					children: "Add tag..."
				}), f && /* @__PURE__ */ W("div", {
					ref: S,
					"data-testid": "bulk-add-tag-popover",
					onClick: (e) => e.stopPropagation(),
					className: n("absolute top-full left-0 mt-1.5", "bg-surface border border-border rounded-lg", "shadow-lg min-w-[220px] p-2.5 z-10", "flex flex-col gap-2"),
					children: [/* @__PURE__ */ U(T, {
						ref: x,
						size: "sm",
						"data-testid": "bulk-add-tag-input",
						placeholder: "Tag name",
						value: y,
						onChange: (e) => b(e.target.value),
						onKeyDown: (e) => {
							e.key === "Enter" ? (e.preventDefault(), D()) : e.key === "Escape" && (e.preventDefault(), g());
						},
						className: n("border border-border-field rounded-md px-2.5 py-1.5 text-[13px]", "bg-surface-inset text-text-primary outline-none w-full"),
						"aria-label": "Tag name"
					}), /* @__PURE__ */ U("button", {
						"data-testid": "bulk-add-tag-submit",
						disabled: y.trim().length === 0,
						onClick: D,
						className: n("px-2.5 py-[5px] text-xs font-semibold", "bg-primary text-white border-none rounded-md", "disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"),
						children: "Add"
					})]
				})]
			}),
			/* @__PURE__ */ W("div", {
				className: "relative",
				children: [/* @__PURE__ */ U("button", {
					"data-testid": "bulk-remove-tag-btn",
					className: n(Hl, v.length === 0 && "opacity-50 cursor-not-allowed"),
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
function Wl({ visibleRows: e, filteredIds: t }) {
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
var Gl = 280, Kl = 160, ql = 40, Jl = 200;
function Z(e) {
	return ql + e * Gl;
}
function Q(e) {
	return Jl + e * Kl;
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
function Yl(e) {
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
function Xl(e) {
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
				y: Q(0) - Kl / 2
			},
			data: d
		},
		{
			id: a,
			type: "action",
			position: {
				x: Z(3),
				y: Q(0) - Kl / 2
			},
			data: f
		},
		{
			id: o,
			type: "llm",
			position: {
				x: Z(2),
				y: Q(0) + Kl / 2
			},
			data: p
		},
		{
			id: s,
			type: "action",
			position: {
				x: Z(3),
				y: Q(0) + Kl / 2
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
function Zl(e) {
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
				y: Q(0) - Kl / 2
			},
			data: m
		},
		{
			id: o,
			type: "action",
			position: {
				x: Z(3),
				y: Q(0) + Kl / 2
			},
			data: h
		},
		{
			id: s,
			type: "approval",
			position: {
				x: Z(4),
				y: Q(0) + Kl / 2
			},
			data: g
		},
		{
			id: c,
			type: "condition",
			position: {
				x: Z(5),
				y: Q(0) + Kl / 2
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
				y: Q(0) + Kl
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
function Ql(e) {
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
function $l(e) {
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
function eu(e) {
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
function tu(e) {
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
function nu(e) {
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
function ru(e) {
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
				y: Q(0) - Kl / 2
			},
			data: u
		},
		{
			id: a,
			type: "approval",
			position: {
				x: Z(2),
				y: Q(0) + Kl / 2
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
function iu(e) {
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
				y: Q(0) - Kl / 2
			},
			data: d
		},
		{
			id: o,
			type: "approval",
			position: {
				x: Z(4),
				y: Q(0) - Kl / 2
			},
			data: f
		},
		{
			id: s,
			type: "action",
			position: {
				x: Z(3),
				y: Q(0) + Kl / 2
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
function au(e) {
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
				y: Q(0) - Kl
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
				y: Q(0) + Kl
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
function ou(e) {
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
				y: Q(0) - Kl / 2
			},
			data: u
		},
		{
			id: o,
			type: "approval",
			position: {
				x: Z(3),
				y: Q(0) + Kl / 2
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
function su(e) {
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
				y: Q(0) - Kl / 2
			},
			data: m
		},
		{
			id: s,
			type: "llm",
			position: {
				x: Z(4),
				y: Q(0) + Kl / 2
			},
			data: h
		},
		{
			id: c,
			type: "approval",
			position: {
				x: Z(5),
				y: Q(0) + Kl / 2
			},
			data: g
		},
		{
			id: l,
			type: "action",
			position: {
				x: Z(6),
				y: Q(0) + Kl / 2
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
var cu = [
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
		build: Yl
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
		build: Xl
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
		build: Zl,
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
		build: Ql,
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
		build: $l,
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
		build: eu
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
		build: tu
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
		build: nu
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
		build: ru
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
		build: iu
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
		build: au
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
		build: ou
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
		build: su
	}
], lu = "/api";
async function uu(e) {
	let t = {
		createdTypes: [],
		errors: []
	};
	if (!e?.documentTypes?.length) return t;
	for (let n of e.documentTypes) try {
		let e = await du(n.name);
		if (e) {
			t.createdTypes.push(e.typeId);
			continue;
		}
		let r = await fu(n);
		t.createdTypes.push(r.typeId);
	} catch (e) {
		t.errors.push(`Failed to scaffold "${n.name}": ${e instanceof Error ? e.message : String(e)}`);
	}
	return t;
}
async function du(e) {
	try {
		let t = await fetch(`${lu}/document-types`, { credentials: "same-origin" });
		if (!t.ok) return null;
		let n = (await t.json()).items?.find((t) => t.name.toLowerCase() === e.toLowerCase());
		return n ? { typeId: n.typeId } : null;
	} catch {
		return null;
	}
}
async function fu(e) {
	let t = e.fields.map((e, t) => ({
		fieldId: crypto.randomUUID(),
		name: e.name,
		fieldType: e.fieldType,
		widget: pu(e.fieldType),
		cardinality: 1,
		required: e.required ?? !1,
		helpText: "",
		options: e.options,
		order: t
	})), n = await fetch(`${lu}/document-types`, {
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
function pu(e) {
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
function mu(e) {
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
function hu(e) {
	let t = e.triggerBinding?.event ?? "manual";
	return t === "schedule" ? "Schedule" : t === "webhook" ? "Webhook" : t === "manual" ? "Manual" : t.startsWith("document.") ? `On ${t}` : t;
}
function gu({ template: e, meta: t, onPick: n }) {
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
function _u({ open: t, onClose: n, onCreated: r, onSelect: i, userId: a }) {
	let o = e(), s = a === void 0 ? o?.userId ?? "" : a, [c, l] = V(""), u = B(null);
	R(() => {
		t && (l(""), setTimeout(() => u.current?.focus(), 30));
	}, [t]);
	let d = z(() => {
		let e = /* @__PURE__ */ new Map();
		for (let t of cu) {
			let n = t.build(s || "anonymous");
			e.set(t.id, {
				nodeCount: n.nodes.length,
				trigger: hu(n)
			});
		}
		return e;
	}, [s, t]), f = z(() => {
		let e = c.trim().toLowerCase();
		return e ? cu.filter((t) => t.name.toLowerCase().includes(e) || t.description.toLowerCase().includes(e) || t.tags.some((t) => t.toLowerCase().includes(e))) : cu;
	}, [c]), p = (e) => {
		if (r) {
			let t = mu(e.build(s || "anonymous"));
			pt(t), n(), r(t.id), e.prerequisites && uu(e.prerequisites).then((e) => {
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
			/* @__PURE__ */ U(T, {
				ref: u,
				type: "search",
				"data-testid": "templates-search",
				placeholder: "Search templates…",
				value: c,
				onChange: (e) => l(e.target.value),
				onKeyDown: (e) => {
					e.key === "Enter" && f.length > 0 && (e.preventDefault(), p(f[0]));
				},
				className: "w-full mb-3.5",
				"aria-label": "Search templates"
			}),
			f.length === 0 ? /* @__PURE__ */ W("div", {
				"data-testid": "templates-empty",
				className: "text-center p-8 text-[13px] text-text-tertiary",
				children: [
					"No templates match \"",
					c,
					"\"."
				]
			}) : /* @__PURE__ */ U("div", {
				"data-testid": "templates-grid",
				className: "grid grid-cols-[repeat(3,220px)] gap-4 justify-center max-h-[60vh] overflow-y-auto p-2",
				children: f.map((e) => /* @__PURE__ */ U(gu, {
					template: e,
					meta: d.get(e.id) ?? {
						nodeCount: 0,
						trigger: "—"
					},
					onPick: p
				}, e.id))
			})
		]
	});
}
//#endregion
//#region src/components/pipelines/PipelinesPage.tsx
var vu = [
	"draft",
	"published",
	"archived"
], yu = ["draft", "published"];
function bu(e) {
	if (e == null) return null;
	if (e.trim() === "") return /* @__PURE__ */ new Set();
	let t = new Set(vu);
	return new Set(e.split(",").map((e) => e.trim()).filter((e) => t.has(e)));
}
function xu(e, t) {
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
function Su(e) {
	let t = e?.event;
	return !t || t === "manual" ? "manual" : t === "schedule" ? "schedule" : t === "webhook" ? "webhook" : "document";
}
function Cu(e) {
	return e.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "pipeline";
}
function wu() {
	let e = /* @__PURE__ */ new Date();
	return `${e.getFullYear()}-${String(e.getMonth() + 1).padStart(2, "0")}-${String(e.getDate()).padStart(2, "0")}`;
}
function Tu({ open: e, onClose: t, onCreate: r }) {
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
		}), /* @__PURE__ */ U(T, {
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
function Eu({ userId: t, idToken: i, baseUrl: a } = {}) {
	let o = Bt(), s = e(), c = t === void 0 ? s?.userId ?? "" : t, { toast: l } = r(), { triggerRun: u, isTriggering: d } = Le({
		idToken: i,
		baseUrl: a
	}), [f, p] = Ht(), [m, h] = V([]), [g, _] = V(""), [v, y] = V("all"), [b, x] = V("updated"), S = z(() => bu(f.get("status")), [f]), w = z(() => S ?? new Set(yu), [S]), T = S != null, E = (e) => {
		let t = new URLSearchParams(f);
		if (e.size === 0) t.set("status", "");
		else {
			let n = vu.filter((t) => e.has(t)).join(",");
			t.set("status", n);
		}
		p(t, { replace: !0 });
	}, D = (e) => {
		let t = T ? new Set(w) : new Set(yu);
		t.has(e) ? t.delete(e) : t.add(e), E(t);
	}, [ee, O] = V(!1), [te, ne] = V(!1), [A, re] = V(null), [ie, j] = V(!1), [M, ae] = V(!1), [oe, se] = V(!1), N = L(async () => {
		let e = await ht(), t = [];
		for (let n of e) {
			let e = await nt(n.id);
			e && t.push(xu(e, n.icon));
		}
		h(t);
	}, []);
	R(() => {
		N();
	}, [N]);
	let P = z(() => {
		let e = g.trim().toLowerCase(), t = [...m.filter((t) => {
			if (e) {
				let n = t.name.toLowerCase().includes(e), r = t.tags.some((t) => t.toLowerCase().includes(e));
				if (!n && !r) return !1;
			}
			return !(!(T && w.size === 0) && !w.has(t.status) || v !== "all" && Su(t.triggerBinding) !== v);
		})];
		return b === "name" ? t.sort((e, t) => e.name.localeCompare(t.name)) : b === "created" ? t.sort((e, t) => t.createdAt.localeCompare(e.createdAt)) : t.sort((e, t) => t.updatedAt.localeCompare(e.updatedAt)), t;
	}, [
		m,
		g,
		w,
		T,
		v,
		b
	]), { selectionMode: ce, selected: F, allVisibleSelected: le, someVisibleSelected: ue, selectAllRef: de, handleToggleSelectMode: fe, handleToggleSelect: pe, handleSelectAllFiltered: me, handleHeaderToggleAll: he, clearSelection: ge, setSelectionMode: _e } = Wl({
		visibleRows: P,
		filteredIds: z(() => P.map((e) => e.id), [P])
	}), ve = B(/* @__PURE__ */ new Set());
	R(() => {
		let e = ve.current;
		return () => {
			e.forEach((e) => window.clearTimeout(e)), e.clear();
		};
	}, []);
	let ye = z(() => {
		let e = /* @__PURE__ */ new Set();
		for (let t of m) if (F.has(t.id)) for (let n of t.tags) e.add(n);
		return Array.from(e).sort((e, t) => e.localeCompare(t));
	}, [m, F]), be = async (e) => {
		let t;
		try {
			t = await yt({
				name: e,
				createdBy: c
			});
		} catch {
			l("Could not create the pipeline — the server rejected the request", { type: "error" });
			return;
		}
		O(!1), o(`/pipelines/${t.id}`);
	}, xe = () => {
		let e = _t(c);
		dt(e).then(() => N()), o(`/pipelines/${e.id}`);
	}, Se = (e) => {
		let t = e.build(c);
		dt(t), ne(!1), o(`/pipelines/${t.id}`);
	}, Ce = (e) => o(`/pipelines/${e}`), we = async (e) => {
		if (e.status !== "published") {
			l("Run requires published state", { type: "warning" });
			return;
		}
		if (!d) try {
			await u(e.id, {}) ? l(`Run started for "${e.name}"`, { type: "success" }) : l("Could not start run", { type: "error" });
		} catch (e) {
			l(`Run failed: ${e.message}`, { type: "error" });
		} finally {
			o(`/pipelines/${e.id}`);
		}
	}, Te = (e) => {
		let t = ot(e);
		t && (dt(t).then(() => N()), l(`Duplicated as "${t.name}"`, { type: "success" }));
	}, Ee = (e) => {
		let t = xt(e.id);
		if (!t) {
			l("Export failed", { type: "error" });
			return;
		}
		ba(`${Cu(e.name)}.pipeline.json`, t);
	}, De = async () => {
		if (A) {
			try {
				await lt(A);
			} catch {
				re(null), N(), l("Could not delete the pipeline — it is still on the server", { type: "error" });
				return;
			}
			re(null), N(), l("Pipeline deleted", { type: "success" });
		}
	}, Oe = A ? m.find((e) => e.id === A) : null, ke = () => {
		let e = Array.from(F);
		e.length !== 0 && (e.forEach((e, t) => {
			let n = window.setTimeout(() => {
				ve.current.delete(n);
				let t = m.find((t) => t.id === e), r = xt(e);
				!t || !r || ba(`${Cu(t.name)}-${wu()}.pipeline.json`, r);
			}, t * 100);
			ve.current.add(n);
		}), l(`Exported ${e.length} pipeline${e.length === 1 ? "" : "s"}`, { type: "success" }));
	}, Ae = async (e) => {
		let t = Array.from(F);
		for (let n of t) {
			let t = await nt(n);
			if (!t) continue;
			let r = t.tags ?? [];
			r.includes(e) || (t.tags = [...r, e], await dt(t));
		}
		ae(!1), N(), l(`Added tag "${e}" to ${t.length} pipeline${t.length === 1 ? "" : "s"}`, { type: "success" });
	}, je = async (e) => {
		let t = Array.from(F);
		for (let n of t) {
			let t = await nt(n);
			if (!t) continue;
			let r = t.tags ?? [];
			r.includes(e) && (t.tags = r.filter((t) => t !== e), await dt(t));
		}
		N(), l(`Removed tag "${e}" from ${t.length} pipeline${t.length === 1 ? "" : "s"}`, { type: "success" });
	}, Me = async () => {
		let e = Array.from(F), t = 0, n = 0;
		for (let r of e) try {
			await lt(r), t += 1;
		} catch {
			n += 1;
		}
		if (j(!1), ge(), N(), n > 0) {
			l(`Deleted ${t} of ${e.length} pipeline${e.length === 1 ? "" : "s"} — ${n} still on the server`, { type: "error" });
			return;
		}
		l(`Deleted ${e.length} pipeline${e.length === 1 ? "" : "s"}`, { type: "success" });
	}, Ne = async () => {
		let e = Array.from(F);
		if (e.length === 0) return;
		let t = 0, n = 0, r = 0;
		for (let i of e) {
			let e = await nt(i);
			if (e) {
				if (e.status === "published") {
					n += 1;
					continue;
				}
				try {
					await He(i) ? t += 1 : r += 1;
				} catch {
					r += 1;
				}
			}
		}
		N(), r > 0 ? l(`Published ${t}; ${r} failed${n > 0 ? `; skipped ${n} already published` : ""}`, { type: "error" }) : l(n > 0 ? `Published ${t}; skipped ${n} already published` : `Published ${t} pipeline${t === 1 ? "" : "s"}`, { type: "success" });
	}, Pe = async () => {
		let e = Array.from(F);
		if (e.length === 0) return;
		let t = 0, n = 0;
		for (let r of e) {
			let e = await nt(r);
			e && (e.status === "archived" ? (e.status = "draft", n += 1) : (e.status = "archived", t += 1), await dt(e));
		}
		N();
		let r = [];
		t > 0 && r.push(`Archived ${t}`), n > 0 && r.push(`Unarchived ${n}`), l(r.join(" · ") || "No pipelines changed", { type: "success" });
	}, Fe = async () => {
		let e = Array.from(F);
		if (e.length === 0) return;
		let t = [];
		for (let n of e) {
			let e = await nt(n);
			e && t.push(e);
		}
		if (t.length === 0) {
			l("Export failed", { type: "error" });
			return;
		}
		ba(`pipelines-${(/* @__PURE__ */ new Date()).toISOString().replace(/[:.]/g, "-")}.json`, JSON.stringify(t, null, 2)), l(`Exported ${t.length} pipeline${t.length === 1 ? "" : "s"}`, { type: "success" });
	};
	R(() => {
		let e = (e) => {
			let t = e.target;
			if (t) {
				let e = t.tagName;
				if (e === "INPUT" || e === "TEXTAREA" || e === "SELECT" || t.isContentEditable) return;
			}
			if (e.key === "Escape") {
				(F.size > 0 || ce || M || oe) && (ae(!1), se(!1), ge(), _e(!1));
				return;
			}
			if ((e.metaKey || e.ctrlKey) && (e.key === "a" || e.key === "A")) {
				ce && (e.preventDefault(), me());
				return;
			}
			(e.key === "Delete" || e.key === "Backspace") && F.size > 0 && !ie && !A && !ee && !te && (e.preventDefault(), j(!0));
		};
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, [
		F,
		ce,
		M,
		oe,
		ie,
		A,
		ee,
		te,
		ge,
		me,
		_e
	]);
	let I = m.length > 0, Ie = F.size > 0;
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
							onClick: () => o("/pipelines/metrics"),
							className: n("px-4 py-[7px] text-[13px] font-semibold", "bg-surface text-text-secondary", "border border-border-field rounded-[7px]", "cursor-pointer font-inherit"),
							children: "Metrics"
						}),
						/* @__PURE__ */ U("button", {
							"data-testid": "templates-btn",
							onClick: () => ne(!0),
							className: n("px-4 py-[7px] text-[13px] font-semibold", "bg-surface text-text-secondary", "border border-border-field rounded-[7px]", "cursor-pointer font-inherit"),
							children: "Templates"
						}),
						/* @__PURE__ */ U("button", {
							"data-testid": "new-pipeline-btn",
							onClick: () => O(!0),
							className: n("px-4 py-[7px] text-[13px] font-semibold", "bg-primary text-white border-none rounded-md", "cursor-pointer font-inherit"),
							children: "+ New Pipeline"
						})
					]
				})]
			}),
			I && /* @__PURE__ */ U(Vl, {
				search: g,
				onSearchChange: _,
				statusFilter: w,
				statusExplicit: T,
				onToggleStatusKey: D,
				triggerFilter: v,
				onTriggerFilterChange: y,
				sortKey: b,
				onSortKeyChange: x,
				allVisibleSelected: le,
				someVisibleSelected: ue,
				onHeaderToggleAll: he
			}),
			Ie && /* @__PURE__ */ U(Ul, {
				count: F.size,
				onClear: ge,
				onExport: ke,
				onExportAsJSON: Fe,
				onPublish: Ne,
				onArchive: Pe,
				onAddTag: () => {
					ae((e) => !e), se(!1);
				},
				onRemoveTag: () => {
					se((e) => !e), ae(!1);
				},
				onDelete: () => j(!0),
				onDeleteWithConfirm: () => j(!0),
				addTagOpen: M,
				removeTagOpen: oe,
				onSubmitAddTag: Ae,
				onSubmitRemoveTag: je,
				onCloseAddTag: () => ae(!1),
				onCloseRemoveTag: () => se(!1),
				unionTags: ye
			}),
			/* @__PURE__ */ U("div", {
				className: n("flex-1 overflow-y-auto overflow-x-hidden min-w-0", I ? "p-6" : "p-0"),
				children: I ? P.length === 0 ? /* @__PURE__ */ U("div", {
					"data-testid": "filtered-empty",
					className: "text-center p-12 text-[13px] text-text-tertiary",
					children: "No pipelines match the current filters."
				}) : /* @__PURE__ */ U("div", {
					"data-testid": "pipeline-grid",
					className: "grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-[50px]",
					children: P.map((e) => /* @__PURE__ */ U(Rl, {
						row: e,
						onOpen: () => Ce(e.id),
						onRun: () => {
							we(e);
						},
						onDuplicate: () => Te(e.id),
						onExport: () => Ee(e),
						onDelete: () => re(e.id),
						selectionMode: ce,
						selected: F.has(e.id),
						anySelected: Ie,
						onToggleSelect: (t) => pe(e.id, t)
					}, e.id))
				}) : /* @__PURE__ */ W("div", {
					className: "flex flex-col h-full",
					children: [/* @__PURE__ */ U("div", {
						className: "flex-1 min-h-0",
						children: /* @__PURE__ */ U(k, {
							icon: "🔀",
							title: "No pipelines yet",
							body: "Design your first one — from scratch or pick a template later.",
							actionLabel: "+ New Pipeline",
							onAction: () => O(!0)
						})
					}), /* @__PURE__ */ W("div", {
						className: "flex justify-center items-center gap-2.5 text-[13px] text-text-tertiary px-6 pb-8",
						children: [
							/* @__PURE__ */ U("button", {
								"data-testid": "empty-state-demo",
								onClick: xe,
								className: "bg-transparent border-none p-1 px-2 text-[13px] text-primary cursor-pointer underline font-inherit",
								children: "or try the demo pipeline"
							}),
							/* @__PURE__ */ U("span", {
								"aria-hidden": !0,
								children: "·"
							}),
							/* @__PURE__ */ U("button", {
								"data-testid": "empty-state-templates",
								onClick: () => ne(!0),
								className: "bg-transparent border-none p-1 px-2 text-[13px] text-primary cursor-pointer underline font-inherit",
								children: "or browse templates"
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ U(Tu, {
				open: ee,
				onClose: () => O(!1),
				onCreate: be
			}),
			/* @__PURE__ */ U(_u, {
				open: te,
				onClose: () => ne(!1),
				onSelect: Se,
				userId: c
			}),
			/* @__PURE__ */ U(C, {
				open: !!A,
				onClose: () => re(null),
				title: "Delete pipeline?",
				maxWidth: 400,
				footer: /* @__PURE__ */ W(H, { children: [/* @__PURE__ */ U("button", {
					"data-testid": "delete-pipeline-cancel",
					className: "px-3 py-1.5 text-[13px] bg-transparent border-none text-text-secondary cursor-pointer",
					onClick: () => re(null),
					children: "Cancel"
				}), /* @__PURE__ */ U("button", {
					"data-testid": "delete-pipeline-confirm",
					onClick: De,
					className: n("px-[18px] py-[7px] text-[13px] font-semibold", "bg-danger text-white border-none rounded-[7px]", "cursor-pointer font-inherit"),
					children: "Delete"
				})] }),
				children: Oe && /* @__PURE__ */ W("p", {
					className: "m-0",
					children: [/* @__PURE__ */ W("strong", { children: [
						"“",
						Oe.name,
						"”"
					] }), " will be permanently removed. Run history will also be lost."]
				})
			}),
			/* @__PURE__ */ U(C, {
				open: ie,
				onClose: () => j(!1),
				title: `Delete ${F.size} pipeline${F.size === 1 ? "" : "s"}?`,
				maxWidth: 420,
				backdropTestId: "bulk-delete-modal",
				footer: /* @__PURE__ */ W(H, { children: [/* @__PURE__ */ U("button", {
					"data-testid": "bulk-delete-cancel",
					className: "px-3 py-1.5 text-[13px] bg-transparent border-none text-text-secondary cursor-pointer",
					onClick: () => j(!1),
					children: "Cancel"
				}), /* @__PURE__ */ W("button", {
					"data-testid": "bulk-delete-confirm",
					onClick: Me,
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
var Du = {
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
function Ou(e, t, n) {
	let r = Du[e], i = Math.max(0, t | 0), a = Math.max(0, n | 0);
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
function ku(e) {
	let t = {}, n = 0, r = 0, i = 0, a = 0, o = !1;
	for (let s of e) {
		if (!s.model) continue;
		let e = s.tokensIn ?? 0, c = s.tokensOut ?? 0, l = Ou(s.model, e, c), u = t[s.model];
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
function Au(e) {
	return !e || !e.modelFound && e.totalCostUsd === 0 ? "—" : e.totalCostUsd >= .01 ? `$${e.totalCostUsd.toFixed(2)}` : e.totalCostUsd === 0 ? "$0.00" : `$${e.totalCostUsd.toFixed(4)}`;
}
function ju(e) {
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
function Mu(e, t) {
	let n = 0;
	if (e.llm) {
		let r = t.get(e.nodeId);
		r && (n += Ou(r, e.llm.tokensIn, e.llm.tokensOut).totalCostUsd);
	}
	let r = e.costUsd;
	return typeof r == "number" && Number.isFinite(r) && r > 0 && (n += r), n;
}
function Nu(e, t) {
	if (!t) return [];
	let n = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
	for (let e of t.nodes) e.data.type === "llm" && n.set(e.id, e.data.model), r.set(e.id, ju(e)), i.set(e.id, e.data.type);
	let a = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map();
	for (let e of t.nodes) a.set(e.id, 0), o.set(e.id, 0);
	for (let t of e) for (let e of Object.values(t.steps ?? {})) {
		if (!r.has(e.nodeId)) continue;
		let t = Mu(e, n);
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
function Pu(e) {
	return e.slice(0, 10);
}
function Fu(e) {
	return Date.UTC(Number(e.slice(0, 4)), Number(e.slice(5, 7)) - 1, Number(e.slice(8, 10)));
}
function Iu(e, t, n = 30, r = /* @__PURE__ */ new Date()) {
	let i = /* @__PURE__ */ new Map();
	if (t) for (let e of t.nodes) e.data.type === "llm" && i.set(e.id, e.data.model);
	let a = Date.UTC(r.getUTCFullYear(), r.getUTCMonth(), r.getUTCDate()), o = a - (n - 1) * 864e5, s = /* @__PURE__ */ new Map(), c = /* @__PURE__ */ new Map();
	for (let e = o; e <= a; e += 864e5) {
		let t = new Date(e).toISOString().slice(0, 10);
		s.set(t, 0), c.set(t, 0);
	}
	for (let t of e) {
		let e = Pu(t.startedAt);
		if (!s.has(e)) continue;
		let n = 0;
		for (let e of Object.values(t.steps ?? {})) n += Mu(e, i);
		s.set(e, (s.get(e) ?? 0) + n), c.set(e, (c.get(e) ?? 0) + 1);
	}
	let l = [];
	for (let e = o; e <= a; e += 864e5) {
		let t = new Date(e).toISOString().slice(0, 10);
		l.push({
			date: t,
			ts: Fu(t),
			totalCostUsd: s.get(t) ?? 0,
			runCount: c.get(t) ?? 0
		});
	}
	return l;
}
//#endregion
//#region src/components/pipelines/runsUtils.ts
var Lu = [
	"pending",
	"running",
	"stuck",
	"completed",
	"rejected",
	"failed",
	"cancelled"
], Ru = [
	"manual",
	"scheduled",
	"webhook",
	"document"
], zu = [
	"24h",
	"7d",
	"30d",
	"all"
], Bu = {
	"24h": 864e5,
	"7d": 6048e5,
	"30d": 2592e6
};
function Vu(e) {
	return e.startsWith("document.") || e === "document" ? "document" : e === "schedule" || e === "scheduled" ? "scheduled" : e === "webhook" ? "webhook" : "manual";
}
function Hu(e) {
	let t = 0;
	for (let n of Object.values(e.steps ?? {})) {
		let e = n.attempts?.length ?? 0;
		e > 1 && (t += e - 1);
	}
	return t;
}
function Uu(e, t) {
	let n = t.now ?? Date.now(), r = t.range === "all" ? null : n - Bu[t.range], i = t.query.trim().toLowerCase();
	return e.filter((e) => {
		if (t.statuses.size > 0 && !t.statuses.has(e.status)) return !1;
		if (t.triggerKinds.size > 0) {
			if (!e.triggeredBy) return !1;
			let n = Vu(e.triggeredBy.triggerType);
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
function Wu(e, t) {
	if (!e) return /* @__PURE__ */ new Set();
	let n = new Set(t);
	return new Set(e.split(",").map((e) => e.trim()).filter((e) => n.has(e)));
}
function Gu(e) {
	let t = e.get("range") ?? "7d", n = zu.includes(t) ? t : "7d";
	return {
		query: e.get("q") ?? "",
		statuses: Wu(e.get("status"), Lu),
		triggerKinds: Wu(e.get("trigger"), Ru),
		range: n
	};
}
//#endregion
//#region src/components/pipelines/RunsFilterBar.tsx
var Ku = {
	pending: "Pending",
	running: "Running",
	stuck: "Stuck",
	completed: "Completed",
	rejected: "Rejected",
	failed: "Failed",
	cancelled: "Cancelled"
}, qu = {
	manual: "Manual",
	scheduled: "Scheduled",
	webhook: "Webhook",
	document: "Document"
}, Ju = {
	"24h": "Last 24h",
	"7d": "Last 7d",
	"30d": "Last 30d",
	all: "All time"
};
function Yu({ label: e, options: t, selected: r, onToggle: i, labels: a, testIdPrefix: o }) {
	let [s, c] = V(!1), l = B(null);
	wr(l, () => c(!1), s), A(s, L(() => c(!1), []));
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
				children: [/* @__PURE__ */ U(le, {
					checked: r.has(e),
					onChange: () => i(e),
					className: "m-0",
					"aria-label": a[e]
				}), a[e]]
			}, e))
		})]
	});
}
function Xu({ query: e, statuses: t, triggerKinds: r, range: i, onQueryChange: a, onStatusToggle: o, onTriggerToggle: s, onRangeChange: c, onClearFilters: l }) {
	let u = t.size > 0 || r.size > 0 || e.length > 0;
	return /* @__PURE__ */ W("div", {
		className: "flex items-center gap-2 px-3 py-2 bg-surface-inset border border-border rounded-md",
		children: [
			/* @__PURE__ */ U(T, {
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
				onKeyDown: (e) => At(e, { itemSelector: "[role=\"radio\"]" }),
				className: "flex gap-0.5",
				children: zu.map((e) => /* @__PURE__ */ U("button", {
					type: "button",
					role: "radio",
					"aria-checked": i === e,
					tabIndex: i === e ? 0 : -1,
					"data-testid": `runs-range-${e}`,
					onClick: () => c(e),
					className: n("px-2 py-1 text-[11px] border-none rounded-[3px] cursor-pointer font-[inherit]", i === e ? "font-semibold bg-primary text-white" : "font-medium bg-transparent text-text-secondary"),
					children: Ju[e]
				}, e))
			}),
			/* @__PURE__ */ U("div", { className: "w-px h-5 bg-border shrink-0" }),
			/* @__PURE__ */ U(Yu, {
				label: "Status",
				options: Lu,
				selected: t,
				onToggle: o,
				labels: Ku,
				testIdPrefix: "runs-status-chip"
			}),
			/* @__PURE__ */ U(Yu, {
				label: "Trigger",
				options: Ru,
				selected: r,
				onToggle: s,
				labels: qu,
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
function Zu({ selectionCount: e, onExport: t, onDelete: n, onClear: r }) {
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
function Qu(e) {
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
function $u(e) {
	switch (e) {
		case "LLMError": return "danger";
		case "TimeoutError": return "caution";
		case "NetworkError": return "warning";
		case "ValidationError": return "warning";
		case "RegistryConflict": return "purple";
		case "Refused": return "caution";
		case "ModelAuth": return "caution";
		case "UnknownError": return "neutral";
		default: return "neutral";
	}
}
//#endregion
//#region src/components/pipelines/RunsTable.tsx
var ed = {
	LLMError: "LLM",
	TimeoutError: "Timeout",
	NetworkError: "Network",
	ValidationError: "Validation",
	RegistryConflict: "Conflict",
	Refused: "Refused",
	ModelAuth: "Model sign-in",
	UnknownError: "Unknown"
};
function td(e) {
	let t = Date.now() - new Date(e).getTime();
	return t < 6e4 ? "just now" : t < 36e5 ? `${Math.floor(t / 6e4)}m ago` : t < 864e5 ? `${Math.floor(t / 36e5)}h ago` : t < 2592e5 ? `${Math.floor(t / 864e5)}d ago` : new Date(e).toLocaleDateString();
}
function nd({ filtered: e, selected: t, onSelectionChange: r, comparePair: i, onToggleComparePair: a, costByRunId: o, pipelineId: s, onNavigate: c, onOpenRetryModal: l }) {
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
				children: /* @__PURE__ */ U(le, {
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
			let { tone: d, label: f } = Qu(e.status), p = e.status === "stuck" || e.status === "running" && !!e.stuckAt, m = t.has(e.id), _ = Hu(e);
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
							children: /* @__PURE__ */ U(le, {
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
						children: td(e.startedAt)
					}),
					/* @__PURE__ */ W("td", {
						className: "px-3 py-2.5 text-xs text-text-secondary",
						children: [
							/* @__PURE__ */ U(g, {
								tone: d,
								"aria-label": `Status: ${f}`,
								children: f
							}),
							p && e.status !== "stuck" && e.stuckAt && /* @__PURE__ */ U(g, {
								tone: "warning",
								size: "xs",
								"data-testid": `run-stuck-badge-${e.id}`,
								title: `No pipeline events since ${new Date(e.stuckAt).toLocaleTimeString()}`,
								className: "ml-1.5",
								children: "Stuck"
							}),
							e.status === "failed" && e.error?.errorCategory && /* @__PURE__ */ U(g, {
								tone: $u(e.error.errorCategory),
								size: "xs",
								"data-testid": `run-error-category-${e.id}`,
								title: e.error.message,
								className: "ml-1.5",
								children: ed[e.error.errorCategory] ?? e.error.errorCategory
							})
						]
					}),
					/* @__PURE__ */ U("td", {
						className: "px-3 py-2.5 text-xs text-text-secondary font-mono",
						children: Ua(e.durationMs)
					}),
					/* @__PURE__ */ U("td", {
						className: n("px-3 py-2.5 text-xs font-mono", _ > 0 ? "text-text-primary" : "text-text-tertiary"),
						"data-testid": `run-retries-${e.id}`,
						title: _ > 0 ? `${_} retry attempts across this run` : "No retries — every step succeeded on first attempt",
						children: _ > 0 ? `×${_}` : "—"
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
										await We(e.pipelineId, e.id);
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
function rd() {
	let { pipelineId: e } = Vt(), t = Bt(), [r, i] = Ht(), [a, o] = V([]), [s, c] = V(null), [l, u] = V([]), [d, f] = V(() => /* @__PURE__ */ new Set()), [p, m] = V(null), [h, g] = V(!1), [_, v] = V(null), [y, x] = V(!1), S = L((e) => {
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
				let e = await Et(p.run.pipelineId, p.run.id, p.nodeId, void 0, p.snapshotInput || void 0);
				m(null), t(`/pipelines/${p.run.pipelineId}/runs/${e.newRunId}`);
			} catch (e) {
				v(e instanceof Error ? e.message : String(e)), g(!1);
			}
		}
	}, [p, t]), { query: T, statuses: E, triggerKinds: D, range: ee } = z(() => Gu(r), [r]), O = (e, t) => {
		let n = new URLSearchParams(r);
		t ? n.set(e, t) : n.delete(e), i(n, { replace: !0 });
	}, te = (e) => {
		let t = new Set(E);
		t.has(e) ? t.delete(e) : t.add(e), O("status", t.size === 0 ? null : Array.from(t).join(","));
	}, ne = (e) => {
		let t = new Set(D);
		t.has(e) ? t.delete(e) : t.add(e), O("trigger", t.size === 0 ? null : Array.from(t).join(","));
	}, A = (e) => {
		O("range", e === "7d" ? null : e);
	}, re = (e) => {
		O("q", e.length === 0 ? null : e);
	}, ie = (e) => {
		u((t) => t.includes(e) ? t.filter((t) => t !== e) : t.length >= 2 ? [t[1], e] : [...t, e]);
	};
	R(() => {
		e && (c(Ze(e)), o(Ot(e)));
	}, [e]);
	let j = z(() => Uu(a, {
		query: T,
		statuses: E,
		triggerKinds: D,
		range: ee
	}), [
		a,
		T,
		E,
		D,
		ee
	]), M = z(() => {
		let e = /* @__PURE__ */ new Map();
		if (!s) return e;
		for (let t of s.nodes) t.data.type === "llm" && e.set(t.id, t.data.model);
		return e;
	}, [s]), ae = z(() => {
		let e = {};
		for (let t of j) {
			let n = Object.values(t.steps).filter((e) => !!e.llm).map((e) => ({
				model: M.get(e.nodeId),
				tokensIn: e.llm?.tokensIn ?? 0,
				tokensOut: e.llm?.tokensOut ?? 0
			}));
			e[t.id] = Au(ku(n).total);
		}
		return e;
	}, [j, M]);
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
							children: [/* @__PURE__ */ U(le, {
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
				open: y,
				onConfirm: () => {
					if (!e) return;
					x(!1);
					let t = Array.from(d), n = a.filter((e) => !d.has(e.id));
					Ct(e);
					for (let t of [...n].sort((e, t) => e.startedAt.localeCompare(t.startedAt))) Be(e, t);
					o(Ot(e)), f(/* @__PURE__ */ new Set()), u((e) => e.filter((e) => !t.includes(e)));
				},
				onCancel: () => x(!1),
				title: `Delete ${d.size} run${d.size === 1 ? "" : "s"}?`,
				body: "This cannot be undone.",
				confirmLabel: `Delete ${d.size}`,
				tone: "destructive"
			}),
			_ && /* @__PURE__ */ U(b, {
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
			/* @__PURE__ */ U(Xu, {
				query: T,
				statuses: E,
				triggerKinds: D,
				range: ee,
				onQueryChange: re,
				onStatusToggle: te,
				onTriggerToggle: ne,
				onRangeChange: A,
				onClearFilters: () => {
					re(""), O("status", null), O("trigger", null);
				}
			}),
			d.size > 0 && /* @__PURE__ */ U(Zu, {
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
			j.length === 0 ? /* @__PURE__ */ U(k, {
				icon: "📜",
				title: a.length === 0 ? "No runs yet" : "No runs match these filters",
				body: a.length === 0 ? "Trigger this pipeline and completed runs will appear here." : "Try clearing a filter or expanding the date range."
			}) : /* @__PURE__ */ U(nd, {
				filtered: j,
				selected: d,
				onSelectionChange: f,
				comparePair: l,
				onToggleComparePair: ie,
				costByRunId: ae,
				pipelineId: e,
				onNavigate: t,
				onOpenRetryModal: S
			})
		]
	}) : /* @__PURE__ */ U("div", {
		className: "p-8",
		children: /* @__PURE__ */ U(k, {
			icon: "🔍",
			title: "Pipeline not found",
			body: "It may have been deleted. Go back to the pipelines list.",
			actionLabel: "Back to pipelines",
			onAction: () => t("/pipelines")
		})
	}) : /* @__PURE__ */ U(zt, {
		to: "/pipelines",
		replace: !0
	});
}
//#endregion
//#region src/components/pipelines/cost/useRunCost.ts
function id(e) {
	return z(() => {
		if (!e) return null;
		let t = Ze(e.pipelineId);
		if (!t) return null;
		let n = /* @__PURE__ */ new Map();
		for (let e of t.nodes) e.data.type === "llm" && n.set(e.id, e.data.model);
		return ku(Object.values(e.steps).filter((e) => !!e.llm).map((e) => ({
			model: n.get(e.nodeId),
			tokensIn: e.llm?.tokensIn ?? 0,
			tokensOut: e.llm?.tokensOut ?? 0
		}))).total;
	}, [e]);
}
//#endregion
//#region src/components/pipelines/utils/runRefusal.ts
var ad = [
	"constraint-not-met",
	"forbidden",
	"revision-conflict",
	"invalid-request"
], od = RegExp(`(?:^|: )[a-z][\\w-]* (${ad.join("|")}): `, "i");
function sd(e) {
	if (!e) return null;
	let t = od.exec(e);
	return t ? t[1].toLowerCase() : null;
}
function cd(e) {
	if (!e || e.status !== "failed" || !e.error || e.error.errorCategory === "ModelAuth") return null;
	let t = sd(e.error.message), n = e.error.errorCategory === "Refused" || e.error.retryability === "terminal";
	if (!t && !n) return null;
	let r = e.error.nodeId && e.error.nodeId !== "unknown" ? e.error.nodeId : void 0;
	return {
		code: t ?? "refused",
		message: e.error.message ?? "",
		...r ? { nodeId: r } : {}
	};
}
function ld(e) {
	if (!e || e.status !== "failed") return null;
	let t = e.attempts && e.attempts.length > 0 ? e.attempts[e.attempts.length - 1] : void 0, n = e.error ?? t?.error, r = sd(n);
	return !r && t?.errorCategory !== "Refused" ? null : {
		code: r ?? "refused",
		message: n ?? "",
		nodeId: e.nodeId
	};
}
function ud(e) {
	return `Refused (${e.code}): the step decided on the inputs this run already had, so retrying or resuming would refuse the same way. Change the request and start a new run.`;
}
function dd(e) {
	return !!e && e.status === "failed" && e.error?.errorCategory === "ModelAuth";
}
var fd = "The model could not sign in — its credentials are missing or expired. Retrying fails the same way until an operator refreshes them; then start the run again.";
//#endregion
//#region src/components/pipelines/steps/StepSection.tsx
function pd({ title: e, children: t }) {
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
function md(e) {
	if (e < 1e3) return `${Math.round(e)}ms`;
	if (e < 6e4) return `${Number((e / 1e3).toFixed(1))}s`;
	let t = Math.floor(e / 6e4), n = Math.round(e % 6e4 / 1e3);
	return n === 0 ? `${t}m` : `${t}m ${n}s`;
}
var hd = {
	NetworkError: "warning",
	TimeoutError: "warning",
	LLMError: "warning",
	ValidationError: "danger",
	RegistryConflict: "danger",
	Refused: "caution",
	ModelAuth: "caution",
	UnknownError: "neutral"
};
function gd(e) {
	return e.error != null;
}
function _d({ attempt: e, isLast: t }) {
	let r = gd(e), i = r ? "danger" : "success", a = e.errorCategory == null ? "neutral" : hd[e.errorCategory] ?? "neutral";
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
					/* @__PURE__ */ U(g, {
						tone: i,
						size: "xs",
						uppercase: !0,
						children: r ? "failed" : "succeeded"
					}),
					t && /* @__PURE__ */ U(g, {
						tone: "info",
						size: "xs",
						uppercase: !0,
						children: "final"
					}),
					/* @__PURE__ */ U("span", {
						className: "ml-auto text-[11px] text-text-tertiary",
						children: e.durationMs == null ? "—" : md(e.durationMs)
					})
				]
			}),
			r && /* @__PURE__ */ W("div", {
				className: "mt-1.5 flex flex-col gap-1.5",
				children: [e.errorCategory != null && /* @__PURE__ */ U("div", { children: /* @__PURE__ */ U(g, {
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
					md(e.retryAfterMs),
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
function vd({ attempts: e, className: t }) {
	if (e.length === 0 || e.length === 1 && !gd(e[0])) return null;
	let r = [...e].sort((e, t) => e.attemptNumber - t.attemptNumber), i = r[r.length - 1], a = r.filter(gd).length, o = gd(i) ? `${r.length} attempt${r.length === 1 ? "" : "s"}, all failed` : `succeeded on attempt ${i.attemptNumber} after ${a} failure${a === 1 ? "" : "s"}`;
	return /* @__PURE__ */ U(l, {
		first: !0,
		title: "Retry history",
		hint: o,
		className: n(t),
		"data-testid": "step-attempts",
		children: /* @__PURE__ */ U("ol", {
			className: "m-0 flex list-none flex-col gap-1.5 p-0",
			children: r.map((e, t) => /* @__PURE__ */ U(_d, {
				attempt: e,
				isLast: t === r.length - 1
			}, `${e.attemptNumber}-${e.idempotencyKey}`))
		})
	});
}
var yd = {
	"var(--color-info)": "bg-info/10 text-info-fg",
	"var(--color-cat-ai)": "bg-accent/10 text-accent-fg",
	"var(--color-success)": "bg-success/10 text-success-fg",
	"var(--color-danger)": "bg-danger/10 text-danger-fg"
};
function bd(e) {
	return `inline-block px-1.5 py-px rounded-[3px] text-[10px] font-semibold ${yd[e] ?? ""}`.trimEnd();
}
//#endregion
//#region src/components/pipelines/utils/classifyStepOutput.ts
function xd(e) {
	return e ? Array.isArray(e.toolCalls) && typeof e.turns == "number" && typeof e.text == "string" ? "agent" : typeof e.judgmentId == "string" && Array.isArray(e.criteria) && typeof e.overallScore == "number" ? "judgment" : !("judgmentId" in e) && (typeof e.visionId == "string" || typeof e.caption == "string" || Array.isArray(e.tags) || typeof e.imageId == "string" && "rawModelText" in e) ? "vision" : "unknown" : "unknown";
}
//#endregion
//#region src/components/pipelines/steps/agentTrace.ts
function Sd(e) {
	return e ? Array.isArray(e.toolCalls) && typeof e.turns == "number" && typeof e.text == "string" : !1;
}
function Cd(e, t = 160) {
	if (e == null) return "";
	let n = typeof e == "string" ? e : JSON.stringify(e);
	if (!n) return "";
	let r = n.replace(/\s+/g, " ").trim();
	return r.length > t ? `${r.slice(0, t - 1)}…` : r;
}
function wd(e) {
	if (!e) return null;
	let t = new Date(e).getTime();
	return Number.isFinite(t) ? t : null;
}
function Td(e) {
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
function Ed(e, t, n = {}) {
	let r = n.now ?? Date.now(), i = Array.isArray(t.toolCalls) ? t.toolCalls : [], a = i.map((e) => wd(e.startedAt)).filter((e) => e != null), o = i.map((e) => wd(e.endedAt) ?? (wd(e.startedAt) == null ? null : r)).filter((e) => e != null), s = wd(n.startedAt), c = wd(n.completedAt), l = Math.min(...[s, ...a].filter((e) => e != null), r), u = Math.max(...[
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
			let n = wd(e.startedAt) ?? l, i = wd(e.endedAt) ?? r, a = {
				ok: e.ok,
				callIndex: t
			}, o = Cd(e.input);
			o && (a.input = o);
			let s = Cd(e.output);
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
var Dd = "text-[11px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap", Od = {
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
function kd(e) {
	let [t, n] = V(() => Date.now());
	return R(() => {
		if (!e) return;
		let t = setInterval(() => n(Date.now()), 1e3);
		return () => clearInterval(t);
	}, [e]), t;
}
function Ad({ stepId: e, output: t, startedAt: r, completedAt: i, live: a = !1 }) {
	let o = (t.toolCalls ?? []).some((e) => !e.endedAt), s = Ed(e, t, {
		startedAt: r,
		completedAt: i,
		now: kd(a || o),
		live: a
	}), c = t.toolCalls?.length ?? 0, l = (t.toolCalls ?? []).filter((e) => e.endedAt && !e.ok).length, u = Od[t.stopReason] ?? Od.error;
	return /* @__PURE__ */ W(pd, {
		title: "Agent",
		children: [
			/* @__PURE__ */ W("div", {
				"data-testid": "agent-summary",
				className: "flex flex-wrap items-center gap-2 mb-2.5",
				children: [
					t.model && /* @__PURE__ */ U("span", {
						className: n(Dd, "bg-accent-bg text-accent-fg"),
						children: t.model
					}),
					(!a || t.turns > 0) && /* @__PURE__ */ W("span", {
						className: n(Dd, "bg-surface-hover text-text-secondary"),
						children: [
							t.turns,
							" turn",
							t.turns === 1 ? "" : "s"
						]
					}),
					t.toolless && !a ? /* @__PURE__ */ U("span", {
						"data-testid": "agent-toolless-badge",
						className: n(Dd, "bg-warning-bg text-warning-fg"),
						children: "no tools — ran as a plain completion (toolless)"
					}) : /* @__PURE__ */ W("span", {
						"data-testid": "agent-toolcall-count",
						className: n(Dd, "bg-surface-hover text-text-secondary"),
						children: [
							c,
							" tool call",
							c === 1 ? "" : "s"
						]
					}),
					l > 0 && /* @__PURE__ */ W("span", {
						"data-testid": "agent-failed-calls",
						className: n(Dd, "bg-danger-bg text-danger-fg"),
						children: [l, " failed"]
					}),
					a ? /* @__PURE__ */ U("span", {
						"data-testid": "agent-live-badge",
						className: n(Dd, "bg-info-bg text-info-fg"),
						children: "running — trace streaming"
					}) : /* @__PURE__ */ U("span", {
						"data-testid": "agent-stop-reason",
						className: n(Dd, u.className),
						children: u.label
					})
				]
			}),
			/* @__PURE__ */ U("div", {
				"data-testid": "agent-trace",
				children: c === 0 ? /* @__PURE__ */ U("div", {
					className: "px-3 py-2.5 border border-border rounded-lg text-[12px] text-text-secondary bg-surface-inset",
					children: a ? "No tool calls yet — the agent is thinking." : "No tool calls — nothing to trace. The agent produced its answer from the prompt alone."
				}) : /* @__PURE__ */ U(Nt, {
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
function jd({ status: e, result: t, runId: r, endpointLabel: i, error: a, latencyMs: o, onOpen: s, className: c }) {
	let l = i ?? t?.model?.endpointId ?? "vision-model", u = o ?? t?.model?.latencyMs, d = t?.caption, f = (t?.tags ?? []).slice(0, 5), p = /* @__PURE__ */ W(H, { children: [
		/* @__PURE__ */ W("header", {
			className: "flex flex-wrap items-center gap-2",
			children: [
				/* @__PURE__ */ U("span", {
					className: "font-mono text-[11px] font-semibold uppercase tracking-wide text-text-secondary",
					children: l
				}),
				e === "running" ? /* @__PURE__ */ W(g, {
					tone: "info",
					size: "sm",
					children: [/* @__PURE__ */ U("span", { className: "inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-primary" }), " running"]
				}) : e === "completed" ? /* @__PURE__ */ U(g, {
					tone: "success",
					size: "sm",
					children: "ok"
				}) : /* @__PURE__ */ U(g, {
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
			children: f.map((e) => /* @__PURE__ */ W(g, {
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
function Md(e = {}) {
	let { maxRecords: t = 50, runId: n } = e, [r, i] = V([]), a = B(!0);
	return R(() => (a.current = !0, () => {
		a.current = !1;
	}), []), fe("*", (e) => {
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
var Nd = {
	completed: "var(--color-success)",
	failed: "var(--color-danger)",
	running: "var(--color-info)"
};
function Pd(e) {
	let t = Number(e);
	return Number.isFinite(t) ? t : 0;
}
function Fd(e, t) {
	let n = typeof e.imageId == "string" ? e.imageId : null;
	return {
		...e.extracted ?? {},
		...typeof e.caption == "string" ? { caption: e.caption } : {},
		...typeof e.rawModelText == "string" ? { rawModelText: e.rawModelText } : {},
		...n && t ? { imageUrl: t(n) } : {}
	};
}
function Id({ stepId: e, step: t, index: r, nodeType: i, nodeConfig: a, onRetryFromStep: o, onResumeFromStep: s, onArtifactClick: c, renderStepDetail: l }) {
	let u = typeof a?.label == "string" && a.label.trim() ? a.label : void 0, d = !!i && i !== "unknown", f = u ?? (d ? i : e), p = u ? d ? i : void 0 : d ? e.slice(0, 8) : void 0, [m, h] = V(!1), g = l?.(t, e), [_, v] = V("Copy JSON"), y = mt(), b = L(() => {
		let e = t.output;
		e && navigator.clipboard.writeText(JSON.stringify(e, null, 2)).then(() => {
			v("Copied!"), setTimeout(() => v("Copy JSON"), 1e3);
		});
	}, [t.output]), x = t.output, S = x?.response, C = t.llm, w = t.input, T = Nd[t.status] ?? "var(--color-text-tertiary)", E = ld(t), D = !E && !!o, ee = !E && !!s;
	return /* @__PURE__ */ W("div", {
		className: "relative pl-9 mb-1",
		children: [
			/* @__PURE__ */ U("div", {
				className: "absolute left-[10px] top-[14px] w-3 h-3 rounded-full border-2 border-white z-[1] shadow-[0_0_0_1px_var(--color-border)]",
				style: { background: T }
			}),
			/* @__PURE__ */ W("div", {
				onClick: () => h(!m),
				"aria-expanded": m,
				role: "button",
				tabIndex: 0,
				onKeyDown: (e) => {
					(e.key === "Enter" || e.key === " ") && (e.preventDefault(), h(!m));
				},
				"data-testid": `step-row-${e}`,
				"data-node-type": i,
				className: n("flex items-center gap-2.5 px-3.5 py-2.5 cursor-pointer transition-colors duration-100", m ? "bg-surface-inset rounded-t-lg" : "bg-surface rounded-lg"),
				style: {
					border: `1px solid ${m ? T + "40" : "var(--color-border)"}`,
					...m ? { borderRadius: "8px 8px 0 0" } : {}
				},
				children: [
					/* @__PURE__ */ U("span", {
						"aria-hidden": "true",
						className: n("text-[10px] text-text-tertiary shrink-0 transition-transform duration-150", m && "rotate-90"),
						children: "▶"
					}),
					/* @__PURE__ */ U("span", {
						"aria-label": `Status: ${t.status}`,
						className: "text-[10px] font-bold text-white px-1.5 py-0.5 rounded-[3px] uppercase shrink-0",
						style: { background: T },
						children: t.status
					}),
					/* @__PURE__ */ W("span", {
						className: "text-[13px] font-semibold text-text-primary",
						children: [
							r + 1,
							". ",
							f
						]
					}),
					p && /* @__PURE__ */ U("span", {
						className: "text-[11px] font-mono text-text-tertiary",
						title: d ? `${i} · ${e}` : e,
						children: p
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
					C && /* @__PURE__ */ W("span", {
						className: "text-[10px] text-text-tertiary font-mono",
						children: [C.tokensIn + C.tokensOut, " tok"]
					}),
					x?.tokensIn != null && !C && /* @__PURE__ */ W("span", {
						className: "text-[10px] text-text-tertiary font-mono",
						children: [Pd(x.tokensIn) + Pd(x.tokensOut), " tok"]
					})
				]
			}),
			g != null && g !== !1 && /* @__PURE__ */ U("div", {
				className: "mt-1",
				"data-testid": `step-detail-${e}`,
				children: g
			}),
			m && /* @__PURE__ */ W("div", {
				className: "border-t-0 rounded-b-lg bg-surface overflow-hidden",
				style: { border: `1px solid ${T}40` },
				children: [
					/* @__PURE__ */ U(pd, {
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
												className: bd("var(--color-info)"),
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
								C?.streamOpened && /* @__PURE__ */ W("tr", {
									className: "border-b border-border",
									children: [
										/* @__PURE__ */ U("td", {
											className: "px-2 py-[5px] text-[11px] text-text-secondary align-top",
											children: /* @__PURE__ */ U("span", {
												className: bd("var(--color-cat-ai)"),
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
								C?.firstTokenLatencyMs != null && /* @__PURE__ */ W("tr", {
									className: "border-b border-border",
									children: [
										/* @__PURE__ */ U("td", {
											className: "px-2 py-[5px] text-[11px] text-text-secondary align-top",
											children: /* @__PURE__ */ U("span", {
												className: bd("var(--color-cat-ai)"),
												children: "first.token"
											})
										}),
										/* @__PURE__ */ W("td", {
											className: "px-2 py-[5px] text-[11px] text-text-secondary align-top",
											children: [
												"+",
												C.firstTokenLatencyMs,
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
												className: bd("var(--color-success)"),
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
												className: bd("var(--color-danger)"),
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
					/* @__PURE__ */ U(vd, { attempts: t.attempts ?? [] }),
					/* @__PURE__ */ U(pd, {
						title: "Node Configuration",
						children: a && Object.keys(a).length > 1 ? /* @__PURE__ */ U("div", {
							className: "grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-xs",
							children: Object.entries(a).filter(([e]) => e !== "type").map(([e, t]) => /* @__PURE__ */ W(Pt.Fragment, { children: [/* @__PURE__ */ U("span", {
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
					w && Object.keys(w).length > 0 && /* @__PURE__ */ U(pd, {
						title: "Runtime Input",
						children: /* @__PURE__ */ U("pre", {
							className: "m-0 px-3 py-2 bg-surface-inset border border-border rounded-md text-[11px] font-mono text-text-secondary whitespace-pre-wrap break-words max-h-[300px] overflow-auto",
							children: JSON.stringify(w, null, 2)
						})
					}),
					C?.prompt && /* @__PURE__ */ U(pd, {
						title: "Resolved Prompt",
						children: /* @__PURE__ */ U("div", {
							className: "px-3.5 py-2.5 bg-surface-inset border border-border rounded-md text-[13px] text-text-primary whitespace-pre-wrap break-words leading-[1.6] max-h-[400px] overflow-auto",
							children: C.prompt
						})
					}),
					y && t.images && t.images.length > 0 && /* @__PURE__ */ U(pd, {
						title: `Produced images (${t.images.length})`,
						children: /* @__PURE__ */ U("div", {
							className: "flex flex-wrap gap-2",
							children: t.images.map((e) => {
								let t = e.bbox ? `[${e.bbox.x},${e.bbox.y} ${e.bbox.width}×${e.bbox.height}]` : `${e.width}×${e.height}`, n = y(e.imageId), r = /* @__PURE__ */ W(H, { children: [/* @__PURE__ */ U("img", {
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
					S || C?.response ? /* @__PURE__ */ U(pd, {
						title: "Response",
						children: /* @__PURE__ */ U("div", {
							className: "px-3.5 py-2.5 bg-surface-inset border border-border rounded-md text-[13px] text-text-primary whitespace-pre-wrap break-words leading-[1.6] max-h-[400px] overflow-auto",
							children: S ?? C?.response
						})
					}) : Sd(x) ? /* @__PURE__ */ U(Ad, {
						stepId: e,
						output: x,
						startedAt: t.startedAt,
						completedAt: t.completedAt
					}) : t.status === "running" && (t.agentLive || i === "agent") ? /* @__PURE__ */ U(Ad, {
						stepId: e,
						output: Td(t.agentLive?.toolCalls ?? []),
						startedAt: t.startedAt,
						live: !0
					}) : x && xd(x) === "vision" ? /* @__PURE__ */ W(pd, {
						title: "Vision result",
						children: [/* @__PURE__ */ W("button", {
							type: "button",
							onClick: b,
							className: "mb-1.5 px-2 py-[3px] text-[11px] font-medium border border-border-field rounded bg-transparent cursor-pointer font-[inherit] text-text-secondary",
							children: ["📋 ", _]
						}), /* @__PURE__ */ U(rl, { result: Fd(x, y) })]
					}) : /* @__PURE__ */ U(pd, {
						title: "Output",
						children: x && Object.keys(x).length > 0 ? /* @__PURE__ */ U("pre", {
							className: "m-0 px-3 py-2 bg-surface-inset border border-border rounded-md text-[11px] font-mono text-text-secondary whitespace-pre-wrap break-words max-h-[300px] overflow-auto",
							children: JSON.stringify(x, null, 2)
						}) : /* @__PURE__ */ U("span", {
							className: "text-xs text-text-tertiary italic",
							children: "No output data"
						})
					}),
					(C || x?.tokensIn != null) && /* @__PURE__ */ U(pd, {
						title: "Token Usage",
						children: /* @__PURE__ */ W("div", {
							className: "flex gap-5 flex-wrap text-xs text-text-secondary",
							children: [
								/* @__PURE__ */ W("span", { children: ["Tokens in: ", /* @__PURE__ */ U("strong", { children: String(C?.tokensIn ?? x?.tokensIn ?? "—") })] }),
								/* @__PURE__ */ W("span", { children: ["Tokens out: ", /* @__PURE__ */ U("strong", { children: String(C?.tokensOut ?? x?.tokensOut ?? "—") })] }),
								C?.firstTokenLatencyMs != null && /* @__PURE__ */ W("span", { children: ["First token: ", /* @__PURE__ */ W("strong", { children: [C.firstTokenLatencyMs, "ms"] })] })
							]
						})
					}),
					t.error && /* @__PURE__ */ W(pd, {
						title: E ? `Refused (${E.code}):` : "Error",
						children: [/* @__PURE__ */ U("div", {
							className: n("px-3 py-2 rounded-md text-xs font-mono whitespace-pre-wrap border", E ? "bg-caution-bg border-caution-border text-caution-fg" : "bg-danger-bg border-danger-border text-danger-fg"),
							"data-testid": E ? `step-refused-${e}` : void 0,
							children: t.error
						}), E && /* @__PURE__ */ U("div", {
							className: "mt-2 text-xs text-text-secondary",
							"data-testid": `step-refused-reason-${e}`,
							children: ud(E)
						})]
					}),
					(D || ee) && /* @__PURE__ */ W("div", {
						className: "px-4 py-2.5 border-t border-border flex justify-end gap-2",
						children: [ee && s && /* @__PURE__ */ U("button", {
							type: "button",
							"data-testid": `resume-from-step-${e}`,
							onClick: (t) => {
								t.stopPropagation(), s(e);
							},
							title: "Resume the same run from this step (preserves accumulated context)",
							className: "px-3 py-[5px] text-xs font-medium border border-primary bg-primary text-white rounded cursor-pointer font-[inherit]",
							children: "↻ Resume from here"
						}), D && o && /* @__PURE__ */ U("button", {
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
function Ld(e) {
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
function Rd({ steps: e, nodeDataMap: t, edges: n, onRetryFromStep: r, onResumeFromStep: i, onArtifactClick: a, renderStepDetail: o }) {
	let s = z(() => {
		let r = Object.entries(e).sort(([, e], [, t]) => {
			let n = Ld(e), r = Ld(t);
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
	]), c = (e) => {
		if (t[e]) return t[e];
		let n = e.lastIndexOf(":");
		if (n > 0 && /^\d+$/.test(e.slice(n + 1))) return t[e.slice(0, n)];
	};
	function l(e, t) {
		let n = t;
		return e.map((e) => {
			let t = n++, s = /* @__PURE__ */ new Map();
			for (let t of e.children) {
				let e = t.branch ?? "default";
				s.has(e) || s.set(e, []), s.get(e).push(t);
			}
			return /* @__PURE__ */ W(Pt.Fragment, { children: [/* @__PURE__ */ U(Id, {
				onArtifactClick: a,
				stepId: e.stepId,
				step: e.step,
				index: t,
				nodeType: c(e.stepId)?.type ?? "unknown",
				nodeConfig: c(e.stepId)?.data,
				onRetryFromStep: r,
				onResumeFromStep: i,
				renderStepDetail: o
			}), e.children.length > 0 && /* @__PURE__ */ U("div", {
				className: "ml-9 pl-5 border-l-2 border-dashed border-border mb-1",
				children: Array.from(s.entries()).map(([e, t], r) => /* @__PURE__ */ W("div", { children: [/* @__PURE__ */ U("div", {
					className: `text-[10px] font-semibold text-text-tertiary uppercase pt-1 pb-0.5 ${r === 0 ? "mt-1" : "mt-2"}`,
					children: e.replace("-", " ")
				}), l(t, n)] }, e))
			})] }, e.stepId);
		});
	}
	return /* @__PURE__ */ W("div", {
		className: "relative",
		children: [/* @__PURE__ */ U("div", { className: "absolute left-[15px] top-6 bottom-6 w-0.5 bg-border rounded-sm" }), l(s, 0)]
	});
}
//#endregion
//#region src/components/pipelines/hooks/usePipelineRunAuditLog.ts
var zd = 5e3, Bd = "synthetic-";
function Vd(e) {
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
function Hd(e, t) {
	return t.timestamp.localeCompare(e.timestamp);
}
function Ud(e, t) {
	if (t.length === 0) return e.slice().sort(Hd);
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
	return [...e, ...i].sort(Hd);
}
function Wd(e, t, n = {}) {
	let { pollMs: r = zd, filters: i } = n, a = pe(), [o, s] = V([]), [c, l] = V([]), [u, d] = V(!0), [f, p] = V(null), [m, h] = V(void 0), [g, _] = V(0), [v, y] = V(!1), b = JSON.stringify({
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
				let r = await ft(e, t, {
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
			let i = Vd(n);
			if (!i) return;
			let a = r;
			if (a.runId !== t) return;
			y(!0);
			let o = {
				auditId: `${Bd}${n}-${a.stepId ?? "run"}-${Date.now()}`,
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
				let n = await ft(e, t, {
					...i ?? {},
					cursor: m
				});
				s((e) => {
					let t = new Set(e.map((e) => e.auditId)), r = e.concat(n.items.filter((e) => !t.has(e.auditId)));
					return r.sort(Hd), r;
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
		items: z(() => Ud(o, c), [o, c]),
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
var Gd = "var(--color-info)", Kd = "var(--color-warning)", qd = "var(--color-caution)", Jd = "var(--color-neutral)", Yd = "var(--color-danger)", Xd = "var(--color-accent)";
function Zd(e) {
	return e.action === "pipeline.step.failed" || e.outcome === "error" ? Yd : e.action === "pipeline.run.resumed-from-step" || e.action.startsWith("pipeline.step.context.patched") ? Xd : e.action.startsWith("pipeline.approval.") ? Kd : e.action.startsWith("pipeline.breakpoint.") ? qd : e.action.startsWith("pipeline.step.") ? Gd : (e.action.startsWith("pipeline.run."), Jd);
}
var Qd = {
	"1h": "Last 1h",
	"24h": "Last 24h",
	all: "All"
}, $d = [
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
function ef(e) {
	if (e === "all") return null;
	let t = Date.now();
	return e === "1h" ? t - 36e5 : t - 864e5;
}
function tf(e) {
	let t = e.details, n = e.trace, r = t && typeof t.stepId == "string" ? t.stepId : void 0, i = n && typeof n.stepId == "string" ? n.stepId : void 0, a = n && typeof n.nodeId == "string" ? n.nodeId : void 0;
	return r ?? i ?? a;
}
function nf(e, t = Date.now()) {
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
function rf({ pipelineId: e, runId: t, onStepClick: r }) {
	let { items: i, error: a, hasMore: o, loadMore: s, loading: c } = Wd(e, t), [l, u] = V(/* @__PURE__ */ new Set()), [d, f] = V(""), [p, h] = V("all"), [g, _] = V(/* @__PURE__ */ new Set()), v = L((e) => {
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
		let e = ef(p), t = d.trim().toLowerCase(), n = $d.filter((e) => l.has(e.label));
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
		let t = tf(e);
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
					$d.map((e) => {
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
					/* @__PURE__ */ U(T, {
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
							onClick: () => h(e),
							"data-testid": `executor-log-time-${e}`,
							"aria-pressed": t,
							children: Qd[e]
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
						let t = g.has(e.auditId), r = e.action.startsWith("pipeline.step.") ? tf(e) : void 0;
						return /* @__PURE__ */ W("div", {
							role: "button",
							tabIndex: 0,
							"aria-expanded": e.trace ? t : void 0,
							className: "grid grid-cols-[14px_auto_auto_1fr] items-baseline gap-2.5 py-1.5 text-xs border-b border-surface-inset cursor-pointer",
							onClick: () => S(e),
							onKeyDown: de(() => S(e)),
							"data-testid": "executor-log-row",
							"data-action": e.action,
							"data-audit-id": e.auditId,
							children: [
								/* @__PURE__ */ U("span", {
									className: "w-2.5 h-2.5 rounded-full shrink-0 self-center",
									style: { background: Zd(e) },
									"aria-hidden": !0,
									"data-testid": "executor-log-marker"
								}),
								/* @__PURE__ */ U("span", {
									className: "text-text-tertiary font-mono text-[11px] whitespace-nowrap",
									title: e.timestamp,
									children: nf(e.timestamp)
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
				children: [o ? /* @__PURE__ */ U("span", { children: /* @__PURE__ */ U(m, {
					variant: "secondary",
					size: "sm",
					onClick: () => s(),
					"data-testid": "executor-log-load-more",
					children: "Load more"
				}) }) : /* @__PURE__ */ U("span", {}), /* @__PURE__ */ U("span", { children: /* @__PURE__ */ U(m, {
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
function af() {
	let { pipelineId: e, runId: t } = Vt();
	return !e || !t ? /* @__PURE__ */ U(zt, {
		to: "/pipelines",
		replace: !0
	}) : /* @__PURE__ */ U(Me, {
		pipelineId: e,
		children: /* @__PURE__ */ U(_e, { children: /* @__PURE__ */ U(of, {
			pipelineId: e,
			runId: t
		}) })
	});
}
function of({ pipelineId: e, runId: t }) {
	let r = Bt(), i = he(), a = Ce(), { definition: o } = i, [s, c] = V(null), [l, u] = V(null), [d, f] = V(0), p = L(() => f((e) => e + 1), []);
	R(() => {
		let n = !1;
		return u(null), import("./services-ZzdtJ1Tq.js").then((e) => e.gt).then(({ getPipelineRun: r }) => r(e, t).then((e) => {
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
	let h = z(() => {
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
	Te(t);
	let _ = id(h ?? null), v = z(() => {
		let e = {};
		if (!o) return e;
		for (let t of o.nodes) e[t.id] = {
			type: t.data.type,
			data: t.data
		};
		return e;
	}, [o]), [x, S] = V(!1), C = B(null);
	wr(C, () => S(!1), x);
	let [T, E] = V("steps"), [D, ee] = V(null), O = L((e) => {
		ee(e), E("steps");
	}, []), [k, te] = V(null), [ne, A] = V(null), [re, ie] = V(!1), j = h?.status === "failed" ? h.error?.nodeId : void 0, M = cd(h), ae = L((e) => {
		if (!h) return;
		let t = Object.entries(h.steps).filter(([t, n]) => t !== e && n.status === "completed").map(([e]) => e);
		te({
			nodeId: e,
			skippedNodes: t,
			snapshotInput: !1
		}), A(null);
	}, [h]), oe = L(async () => {
		if (!(!k || !h)) {
			A(null), ie(!0);
			try {
				let t = await Et(e, h.id, k.nodeId, void 0, k.snapshotInput || void 0);
				te(null), r(`/pipelines/${e}/runs/${t.newRunId}`);
			} catch (e) {
				A(e instanceof Error ? e.message : String(e)), ie(!1);
			}
		}
	}, [
		k,
		h,
		e,
		r
	]), [se, N] = V(null), [P, ce] = V(null), [F, ue] = V(null), [de, fe] = V(null), pe = B(null);
	R(() => () => {
		pe.current && clearTimeout(pe.current);
	}, []);
	let me = L(async (t) => {
		if (h) {
			ce(null), N(t);
			try {
				let n = await $e(e, h.id, t);
				ue(`Resumed from ${t.slice(0, 10)}${t.length > 10 ? "…" : ""} (replay #${n.replayAttempts})`), pe.current && clearTimeout(pe.current), pe.current = setTimeout(() => ue(null), 4e3), r(`/pipelines/${e}/runs/${h.id}`);
			} catch (e) {
				ce(e instanceof Error ? e.message : String(e));
			} finally {
				N(null);
			}
		}
	}, [
		h,
		e,
		r
	]), ge = L(async () => {
		fe(null);
		try {
			let t = await a.triggerRun(e, h ? h.triggeredBy.payload : void 0);
			r(`/pipelines/${e}/runs/${t}`);
		} catch (e) {
			console.error("[PipelineRunReplay] re-run failed", e), fe(e instanceof Error ? e.message : String(e));
		}
	}, [
		h,
		a,
		e,
		r
	]), _e = async () => {
		S(!1);
		try {
			await navigator.clipboard?.writeText(t);
		} catch {}
	}, ve = () => {
		if (S(!1), !h) return;
		let e = JSON.stringify(h, null, 2);
		ba(`run-${t}.json`, e);
	}, ye = () => {
		if (S(!1), !o) return;
		let e = ot(o.id, `${o.name} (from run)`);
		e && r(`/pipelines/${e.id}`);
	};
	if (!h) {
		let t = l !== null;
		return /* @__PURE__ */ W("div", {
			className: "flex flex-col flex-1 h-0 overflow-hidden bg-surface-inset font-[inherit] text-text-primary rounded-lg border border-border",
			"data-testid": t ? "pipeline-replay-error" : "pipeline-replay-missing",
			children: [/* @__PURE__ */ W("div", {
				className: "h-11 shrink-0 flex items-center gap-2.5 px-3 border-b border-border bg-surface relative z-[5]",
				children: [/* @__PURE__ */ U(y, {
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
						children: [/* @__PURE__ */ U(m, {
							onClick: p,
							"data-testid": "replay-retry",
							children: "Retry"
						}), /* @__PURE__ */ U(m, {
							variant: "secondary",
							onClick: () => r(`/pipelines/${e}`),
							children: "Back to pipeline"
						})]
					})
				] }) : /* @__PURE__ */ W(H, { children: [/* @__PURE__ */ U("div", {
					className: "text-sm text-text-secondary",
					children: "Run not available — it may have been trimmed from history."
				}), /* @__PURE__ */ U(m, {
					onClick: () => r(`/pipelines/${e}`),
					children: "Back to pipeline"
				})] })
			})]
		});
	}
	let be = Qu(h.status), xe = h.triggeredBy.userId ?? h.triggeredBy.triggerType, Se = Au(_);
	return /* @__PURE__ */ W("div", {
		className: "flex flex-col flex-1 h-0 overflow-hidden bg-surface-inset font-[inherit] text-text-primary rounded-lg border border-border",
		"data-testid": "pipeline-replay",
		children: [
			/* @__PURE__ */ W("div", {
				className: "h-11 shrink-0 flex items-center gap-2.5 px-3 border-b border-border bg-surface relative z-[5]",
				children: [
					/* @__PURE__ */ U(y, {
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
							Wa(h.startedAt),
							" by ",
							xe
						]
					}),
					/* @__PURE__ */ W("span", {
						className: "text-text-tertiary text-xs",
						"data-testid": "replay-cost",
						children: ["· ", Se]
					}),
					/* @__PURE__ */ U(g, {
						tone: be.tone,
						"aria-label": `Status: ${be.label}`,
						children: be.label
					}),
					h.status === "failed" && h.error?.errorCategory ? /* @__PURE__ */ U(g, {
						tone: $u(h.error.errorCategory),
						title: h.error.message || "Error details unavailable",
						children: h.error.errorCategory
					}) : null,
					/* @__PURE__ */ U("div", { className: "flex-1" }),
					M && /* @__PURE__ */ U(g, {
						tone: "neutral",
						title: ud(M),
						"data-testid": "refused-not-retryable",
						children: "Not retryable"
					}),
					j && !M && /* @__PURE__ */ U(m, {
						onClick: () => ae(j),
						disabled: re,
						"data-testid": "retry-from-failed-step-button",
						title: `Retry from "${j}" with the original upstream context`,
						children: "↻ Retry from failure"
					}),
					/* @__PURE__ */ U(m, {
						onClick: ge,
						"data-testid": "rerun-button",
						title: "Re-run with the original trigger payload",
						children: "↻ Re-run"
					}),
					/* @__PURE__ */ W("div", {
						className: "relative",
						ref: C,
						children: [/* @__PURE__ */ U(y, {
							onClick: () => S((e) => !e),
							"aria-label": "More actions",
							"aria-haspopup": "menu",
							"aria-expanded": x,
							"data-testid": "replay-overflow-btn",
							children: "⋯"
						}), x ? /* @__PURE__ */ W("div", {
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
				open: k !== null,
				onConfirm: oe,
				onCancel: () => {
					re || te(null);
				},
				title: "Retry from step",
				confirmLabel: re ? "Starting…" : "Confirm retry",
				confirmDisabled: re,
				children: k && /* @__PURE__ */ W("div", {
					className: "flex flex-col gap-2.5",
					children: [
						/* @__PURE__ */ W("div", {
							className: "text-[13px] text-text-secondary",
							children: [
								"A new run will start from",
								" ",
								/* @__PURE__ */ W("code", {
									className: "bg-surface-inset px-1 rounded text-xs",
									children: [k.nodeId.slice(0, 12), k.nodeId.length > 12 ? "…" : ""]
								}),
								" ",
								"using the original upstream context."
							]
						}),
						k.skippedNodes.length > 0 && /* @__PURE__ */ W("div", { children: [/* @__PURE__ */ W("div", {
							className: "text-[11px] font-semibold text-text-tertiary uppercase mb-1.5",
							children: [
								"Steps that will be skipped (",
								k.skippedNodes.length,
								")"
							]
						}), /* @__PURE__ */ U("div", {
							className: "max-h-20 overflow-y-auto flex flex-wrap gap-1",
							children: k.skippedNodes.map((e) => /* @__PURE__ */ U("span", {
								className: "bg-surface-inset border border-border rounded px-1.5 py-px text-[11px] font-mono text-text-secondary",
								children: e.slice(0, 10)
							}, e))
						})] }),
						/* @__PURE__ */ W("label", {
							className: "flex items-center gap-2 text-[13px] text-text-secondary cursor-pointer",
							children: [/* @__PURE__ */ U(le, {
								checked: k.snapshotInput,
								onChange: (e) => te((t) => t && {
									...t,
									snapshotInput: e
								})
							}), "Use persisted input snapshot"]
						}),
						ne && /* @__PURE__ */ U("div", {
							role: "alert",
							"data-testid": "retry-modal-error",
							className: "py-2 px-3 bg-danger-bg border border-danger-border rounded-md text-xs text-danger-fg",
							children: ne
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
										Object.keys(h.steps).length,
										")"
									]
								}),
								/* @__PURE__ */ W("span", {
									className: "text-xs text-text-tertiary",
									children: [
										h.startedAt ? new Date(h.startedAt).toLocaleTimeString() : "",
										" — ",
										h.completedAt ? new Date(h.completedAt).toLocaleTimeString() : "in progress"
									]
								}),
								h.durationMs != null && /* @__PURE__ */ W("span", {
									className: "text-xs text-text-secondary ml-auto",
									children: ["Total: ", h.durationMs < 1e3 ? `${h.durationMs}ms` : `${(h.durationMs / 1e3).toFixed(1)}s`]
								})
							]
						}),
						ne && /* @__PURE__ */ U(b, {
							title: "Retry failed:",
							className: "mb-4",
							children: ne
						}),
						P && /* @__PURE__ */ U(b, {
							title: "Resume failed:",
							className: "mb-4",
							"data-testid": "resume-error-banner",
							children: P
						}),
						de && /* @__PURE__ */ U(b, {
							title: "Re-run failed:",
							className: "mb-4",
							"data-testid": "rerun-error-banner",
							children: de
						}),
						(h.replayAttempts ?? 0) > 0 && /* @__PURE__ */ U(b, {
							title: "Resumed from a previous failure",
							className: "mb-4",
							"data-testid": "resume-history-banner",
							children: /* @__PURE__ */ W("div", {
								className: "flex flex-col gap-1.5",
								children: [/* @__PURE__ */ W("div", { children: [
									h.error?.nodeId && h.error.nodeId !== "unknown" && /* @__PURE__ */ W(H, { children: [
										"Originally failed at ",
										/* @__PURE__ */ U("code", { children: h.error.nodeId.slice(0, 12) }),
										" — "
									] }),
									"Resumed ",
									h.replayAttempts,
									" time",
									h.replayAttempts === 1 ? "" : "s",
									".",
									h.resumeHistory && h.resumeHistory.length > 0 && /* @__PURE__ */ W(H, { children: [
										" ",
										"Most recent: from",
										" ",
										/* @__PURE__ */ U("code", { children: h.resumeHistory[h.resumeHistory.length - 1].fromNodeId.slice(0, 12) }),
										" ",
										"at ",
										Wa(h.resumeHistory[h.resumeHistory.length - 1].at),
										"."
									] })
								] }), h.resumeHistory && h.resumeHistory.length > 1 && /* @__PURE__ */ U("ol", {
									className: "m-0 pl-[18px] text-[11px] text-text-tertiary leading-relaxed",
									"data-testid": "resume-history-timeline",
									children: h.resumeHistory.map((e, t) => /* @__PURE__ */ W("li", { children: [
										"from ",
										/* @__PURE__ */ U("code", { children: e.fromNodeId.slice(0, 12) }),
										" at ",
										Wa(e.at)
									] }, `${e.fromNodeId}-${e.at}-${t}`))
								})]
							})
						}),
						F && /* @__PURE__ */ U(b, {
							title: "Resumed",
							className: "mb-4",
							"data-testid": "resume-toast",
							children: F
						}),
						h.error && /* @__PURE__ */ W(b, {
							title: M ? `Refused (${M.code}):` : "Run failed:",
							layout: M ? "stacked" : "inline",
							className: "mb-4",
							"data-testid": M ? "refused-banner" : "run-failed-banner",
							children: [
								h.error.message,
								h.error.nodeId && h.error.nodeId !== "unknown" && /* @__PURE__ */ W("span", {
									className: "ml-2 text-[11px] text-danger-fg",
									children: ["at node ", h.error.nodeId.slice(0, 8)]
								}),
								M && /* @__PURE__ */ U("span", {
									className: "mt-2 block text-xs text-text-secondary",
									"data-testid": "refused-reason",
									children: ud(M)
								}),
								h.status === "failed" && !M && h.error.nodeId && h.error.nodeId !== "unknown" && /* @__PURE__ */ U("div", {
									className: "mt-2",
									children: /* @__PURE__ */ U(m, {
										onClick: () => me(h.error.nodeId),
										disabled: se !== null,
										"data-testid": "resume-from-here-button",
										title: `Resume this run from "${h.error.nodeId}" using its accumulated upstream context`,
										children: se === h.error.nodeId ? "Resuming…" : "↻ Resume from here"
									})
								})
							]
						}),
						/* @__PURE__ */ U("div", {
							role: "tablist",
							"aria-label": "Run detail view",
							onKeyDown: At,
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
						T === "steps" ? /* @__PURE__ */ U(Rd, {
							steps: h.steps,
							nodeDataMap: v,
							edges: o?.edges,
							onRetryFromStep: M ? void 0 : ae,
							onResumeFromStep: h.status === "failed" && !M ? me : void 0
						}) : /* @__PURE__ */ U("div", {
							className: "flex flex-col min-h-[400px] h-[60vh]",
							children: /* @__PURE__ */ U(rf, {
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
function sf() {
	let e = Bt(), [t, n] = Ht(), [r, i] = V([]), { runs: a } = Ce();
	R(() => {
		let e = !1;
		return (async () => {
			let t = Je(), n = [];
			await Promise.all(t.map(async (e) => {
				try {
					let { runs: t } = await et(e.id, { limit: 50 });
					if (t.length > 0) {
						for (let r of t) r.id && n.push({
							...r,
							pipelineName: e.name
						});
						return;
					}
				} catch {}
				for (let t of Ot(e.id)) t.id && n.push({
					...t,
					pipelineName: e.name
				});
			})), !e && (n.sort((e, t) => t.startedAt.localeCompare(e.startedAt)), i(n));
		})(), () => {
			e = !0;
		};
	}, []);
	let o = z(() => {
		let e = new Map(Je().map((e) => [e.id, e.name])), t = new Set(r.map((e) => e.id)), n = [];
		for (let [r, i] of Object.entries(a)) t.has(r) || i.pipelineId && n.push({
			...i,
			pipelineName: e.get(i.pipelineId) ?? `Pipeline ${i.pipelineId.slice(0, 8)}`
		});
		return n.length === 0 ? r : [...n, ...r].sort((e, t) => t.startedAt.localeCompare(e.startedAt));
	}, [r, a]), { query: s, statuses: c, triggerKinds: l, range: u } = z(() => Gu(t), [t]), d = (e, r) => {
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
	}, _ = z(() => Uu(o, {
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
	]), v = z(() => {
		let e = {};
		for (let t of _) {
			let n = ku(Object.values(t.steps).filter((e) => !!e.llm).map((e) => ({
				model: void 0,
				tokensIn: e.llm?.tokensIn ?? 0,
				tokensOut: e.llm?.tokensOut ?? 0
			})));
			n.total.totalCostUsd > 0 && (e[t.id] = Au(n.total));
		}
		return e;
	}, [_]);
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
						_.length,
						" run",
						_.length === 1 ? "" : "s"
					]
				})]
			}),
			/* @__PURE__ */ U(Xu, {
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
			_.length === 0 ? /* @__PURE__ */ U(k, {
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
					}) }), /* @__PURE__ */ U("tbody", { children: _.map((t) => /* @__PURE__ */ W("tr", {
						role: "button",
						tabIndex: 0,
						"aria-label": `Open run ${t.id.slice(0, 11)} of ${t.pipelineName}`,
						onClick: () => e(`/pipelines/${t.pipelineId}/runs/${t.id}`),
						onKeyDown: de(() => e(`/pipelines/${t.pipelineId}/runs/${t.id}`)),
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
								children: /* @__PURE__ */ U(g, {
									tone: Qu(t.status).tone,
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
								children: Ga(t.startedAt)
							}),
							/* @__PURE__ */ U("td", {
								className: "px-3 py-2.5 text-xs text-text-secondary text-right font-mono",
								children: t.completedAt ? Ua(new Date(t.completedAt).getTime() - new Date(t.startedAt).getTime()) : "—"
							}),
							/* @__PURE__ */ U("td", {
								className: "px-3 py-2.5 text-xs text-text-secondary text-right font-mono",
								children: v[t.id] ?? "—"
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
function cf(e) {
	let t = 0, n = 0;
	for (let r of Object.values(e.steps ?? {})) r.llm && (t += r.llm.tokensIn ?? 0, n += r.llm.tokensOut ?? 0);
	return {
		tokensIn: t,
		tokensOut: n
	};
}
function lf(e) {
	let t = /* @__PURE__ */ new Map();
	if (!e) return t;
	for (let n of e.nodes) n.data.type === "llm" && t.set(n.id, n.data.model);
	return t;
}
function uf(e, t) {
	let n = [];
	for (let r of Object.values(e.steps ?? {})) r.llm && n.push({
		model: t.get(r.nodeId),
		tokensIn: r.llm.tokensIn,
		tokensOut: r.llm.tokensOut
	});
	return ku(n).total.totalCostUsd;
}
function df(e, t) {
	if (e.length === 0) return 0;
	let n = Math.ceil(e.length * t);
	return e[Math.min(e.length - 1, Math.max(0, n - 1))];
}
function ff(e) {
	return e < .01 ? `$${e.toFixed(4)}` : e < 1 ? `$${e.toFixed(3)}` : `$${e.toFixed(2)}`;
}
function pf(e) {
	let t = typeof e == "number" ? e : Number(e);
	return Number.isFinite(t) ? `$${t.toFixed(4).replace(/\.?0+$/, "")}` : "$0";
}
function mf(e) {
	return e.slice(0, 8);
}
function hf(e) {
	let t = Date.now() - new Date(e).getTime();
	return t < 6e4 ? "just now" : t < 36e5 ? `${Math.floor(t / 6e4)}m ago` : t < 864e5 ? `${Math.floor(t / 36e5)}h ago` : t < 2592e5 ? `${Math.floor(t / 864e5)}d ago` : new Date(e).toLocaleDateString();
}
function gf(e, t) {
	let n = e.length, r = 0, i = 0, a = 0, o = [], s = 0, c = 0, l = 0, u = /* @__PURE__ */ new Map();
	for (let n of e) {
		n.status === "completed" ? r++ : n.status === "failed" ? i++ : n.status === "cancelled" && a++, typeof n.durationMs == "number" && n.durationMs > 0 && o.push(n.durationMs);
		let e = cf(n);
		if (s += e.tokensIn, c += e.tokensOut, l += uf(n, t), n.error?.message) {
			let e = n.error.message.slice(0, 48), t = u.get(e);
			t ? (t.count += 1, n.startedAt > t.lastSeenAt && (t.lastSeenAt = n.startedAt, t.exampleRunId = n.id)) : u.set(e, {
				count: 1,
				lastSeenAt: n.startedAt,
				exampleRunId: n.id
			});
		}
	}
	o.sort((e, t) => e - t);
	let d = df(o, .5), f = df(o, .95), p = r + i + a, m = p === 0 ? 0 : Math.round(r / p * 100), h = [...u.entries()].map(([e, t]) => ({
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
function _f(e) {
	return e >= 90 ? "var(--color-success)" : e >= 70 ? "var(--color-warning)" : "var(--color-danger)";
}
function vf(e) {
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
function yf(e, t) {
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
function bf(e) {
	let t = [...e].sort((e, t) => e.startedAt.localeCompare(t.startedAt)), n = [], r = [];
	for (let e of t) {
		let t = new Date(e.startedAt).getTime(), { tokensIn: i, tokensOut: a } = cf(e);
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
function xf() {
	let { pipelineId: e } = Vt(), t = Bt(), [r, i] = V(null), [a, o] = V([]), [s, c] = V("50");
	R(() => {
		e && (i(Ze(e)), o(Ot(e)));
	}, [e]);
	let l = z(() => {
		if (s === "all") return a;
		let e = Number(s);
		return a.slice(0, e);
	}, [a, s]), u = z(() => lf(r), [r]), d = z(() => gf(l, u), [l, u]), f = z(() => Nu(l, r).filter((e) => e.totalCostUsd > 0 || e.stepCount > 0), [l, r]), p = z(() => Iu(a, r, 30), [a, r]), m = z(() => [{
		label: "Daily spend",
		data: p.map((e) => ({
			x: e.ts,
			y: e.totalCostUsd
		})),
		color: "var(--color-primary)"
	}], [p]);
	if (!e) return /* @__PURE__ */ U(zt, {
		to: "/pipelines",
		replace: !0
	});
	if (!r) return /* @__PURE__ */ U("div", {
		className: "p-8",
		children: /* @__PURE__ */ U(k, {
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
								style: { color: d.finishedCount === 0 ? "var(--color-text-tertiary)" : _f(d.successRatePct) },
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
								children: Ua(d.medianMs)
							}),
							/* @__PURE__ */ W("div", {
								className: "text-xs text-text-tertiary font-mono",
								children: ["p95 · ", Ua(d.p95Ms)]
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
								children: ff(d.totalCost)
							}),
							/* @__PURE__ */ W("div", {
								className: "text-xs text-text-tertiary font-mono",
								children: [ff(d.costPerRun), " avg per run"]
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
					}) : /* @__PURE__ */ U(S, {
						data: f.map((e) => ({
							label: e.label,
							cost: Number(e.totalCostUsd.toFixed(6))
						})),
						xKey: "label",
						yKey: "cost",
						height: 200,
						color: "var(--color-primary)",
						yFormat: pf
					})]
				}), /* @__PURE__ */ W("div", {
					className: "bg-surface border border-border rounded-lg p-4 flex flex-col gap-2 min-w-0",
					"data-testid": "stats-cost-trend-30d",
					children: [/* @__PURE__ */ U("div", {
						className: "text-[13px] font-semibold text-text-primary",
						children: "30-day spend trend"
					}), /* @__PURE__ */ U(x, {
						series: m,
						height: 200,
						xFormat: (e) => new Date(Number(e)).toLocaleDateString(void 0, {
							month: "short",
							day: "numeric"
						}),
						yFormat: pf
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
						}), /* @__PURE__ */ U(x, {
							series: vf(l),
							height: 180,
							xFormat: (e) => new Date(Number(e)).toLocaleDateString()
						})]
					}),
					/* @__PURE__ */ W("div", {
						className: "bg-surface border border-border rounded-lg p-4 flex flex-col gap-2 min-w-0",
						children: [/* @__PURE__ */ U("div", {
							className: "text-[13px] font-semibold text-text-primary",
							children: "Duration over time"
						}), /* @__PURE__ */ U(x, {
							series: yf(l, d.medianMs),
							height: 180,
							xFormat: (e) => new Date(Number(e)).toLocaleDateString(),
							yFormat: (e) => Ua(e)
						})]
					}),
					/* @__PURE__ */ W("div", {
						className: "bg-surface border border-border rounded-lg p-4 flex flex-col gap-2 min-w-0",
						children: [/* @__PURE__ */ U("div", {
							className: "text-[13px] font-semibold text-text-primary",
							children: "Token usage over time"
						}), /* @__PURE__ */ U(x, {
							series: bf(l),
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
										children: hf(n.lastSeenAt)
									}),
									/* @__PURE__ */ U("td", {
										className: "px-2 py-1.5",
										children: /* @__PURE__ */ W("button", {
											type: "button",
											onClick: () => t(`/pipelines/${e}/runs/${n.exampleRunId}`),
											className: "bg-transparent border-none text-primary cursor-pointer text-xs font-mono p-0",
											children: [mf(n.exampleRunId), " →"]
										})
									})
								]
							}, n.key)) })]
						})]
					})
				]
			})
		] }) : /* @__PURE__ */ U(k, {
			icon: "📊",
			title: "No runs yet",
			body: "No runs yet. Trigger this pipeline to see stats."
		})]
	});
}
//#endregion
//#region src/components/pipelines/PendingApprovalsPage.tsx
function Sf(e) {
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
function Cf(e) {
	return e.length <= 6 ? e : e.slice(-6);
}
function wf({ approver: e, idx: t }) {
	let n = e.type === "role" ? "🎖" : "👤";
	return /* @__PURE__ */ W("span", {
		className: "inline-flex items-center gap-1 bg-info-bg text-info-fg px-2 py-0.5 rounded-sm text-[11px] font-semibold leading-[1.4] whitespace-nowrap",
		children: [/* @__PURE__ */ U("span", {
			"aria-hidden": !0,
			children: n
		}), /* @__PURE__ */ U("span", { children: e.value })]
	}, `${e.type}:${e.value}:${t}`);
}
function Tf(e, t) {
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
function Ef({ row: e, onSubmit: t, onOpenPipeline: n }) {
	let [r, i] = V(""), a = L((e) => {
		t(e, r.trim()), i("");
	}, [r, t]), o = e.requiredCount ?? 1, s = e.recordedCount ?? 0, c = z(() => Tf(e.runContext, e.runSteps), [e.runContext, e.runSteps]);
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
							children: ["run #", Cf(e.runId)]
						})]
					})]
				}), /* @__PURE__ */ U("span", {
					className: "text-xs text-text-tertiary whitespace-nowrap",
					children: Sf(e.requestedAt)
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
					}) : e.approvers.map((e, t) => /* @__PURE__ */ U(wf, {
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
			/* @__PURE__ */ U(N, {
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
function Df() {
	let e = Bt(), { approvals: t, isLoading: n, error: r, retry: i } = kt(), { resolveApproval: a, runs: o } = Ce(), [s, c] = V(() => /* @__PURE__ */ new Set());
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
			st(e.pipelineId, t).then((e) => {
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
			i === void 0 && (i = Ze(r.pipelineId), e.set(r.pipelineId, i));
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
	}, [a, e]), _ = m.length;
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
				}), /* @__PURE__ */ U(g, {
					"data-testid": "pending-count",
					tone: _ > 0 ? "warning" : "neutral",
					size: "sm",
					children: _
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
			}) : null, n && _ === 0 ? /* @__PURE__ */ W("div", {
				"data-testid": "approvals-loading",
				className: "flex flex-col gap-3 max-w-[680px] mx-auto",
				children: [
					/* @__PURE__ */ U(M, { height: 140 }),
					/* @__PURE__ */ U(M, { height: 140 }),
					/* @__PURE__ */ U(M, { height: 140 })
				]
			}) : _ === 0 && !r ? /* @__PURE__ */ U(k, {
				icon: "✋",
				title: "No pending approvals",
				body: "When a pipeline reaches an approval step, it'll show up here.",
				testId: "approvals-empty"
			}) : /* @__PURE__ */ U("div", {
				"data-testid": "approvals-list",
				className: "flex flex-col gap-3 max-w-[680px] mx-auto",
				children: m.map((t) => /* @__PURE__ */ U(Ef, {
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
function Of(e) {
	return e === "pass" ? "success" : e === "fail" ? "danger" : "warning";
}
function kf({ result: e, className: t }) {
	let r = Of(e.overallVerdict), i = r === "success" ? "PASS" : r === "danger" ? "FAIL" : "INCONCLUSIVE", a = e.rubricSnapshot.passThreshold ?? .5;
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
				/* @__PURE__ */ W(g, {
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
			}), /* @__PURE__ */ U(ie, {
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
function Af({ result: e, className: t }) {
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
			children: e.criteria.map((e) => /* @__PURE__ */ U(jf, {
				score: e,
				def: r.get(e.criterionId)
			}, e.criterionId))
		})]
	});
}
function jf({ score: e, def: t }) {
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
					/* @__PURE__ */ U(g, {
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
			/* @__PURE__ */ U(ie, {
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
var Mf = Ft(null);
function Nf({ value: e, children: t }) {
	return /* @__PURE__ */ U(Mf.Provider, {
		value: e,
		children: t
	});
}
function Pf() {
	return Lt(Mf);
}
//#endregion
//#region src/components/pipelines/judge/JudgmentResultViewer.tsx
function Ff({ result: e, showVerdict: t = !0, showCriteria: r = !0, showMetadata: i = !0, showRawText: a = !1, className: o }) {
	let s = Pf(), [c, l] = V(!1), [u, d] = V(null), [f, p] = V(!1), [m, h] = V(null), g = B(!0), _ = B(null);
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
			t ? /* @__PURE__ */ U(kf, { result: e }) : null,
			r ? /* @__PURE__ */ U(Af, { result: e }) : null,
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
				}), c ? /* @__PURE__ */ U(If, {
					text: v,
					loading: f,
					error: m,
					fallbackHint: e.rawTextTruncated && !s ? "Raw text was spilled to S3 but no JudgmentApi provider is wired." : null
				}) : null]
			}) : null
		]
	});
}
function If({ text: e, loading: t, error: n, fallbackHint: r }) {
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
function Lf({ aggregate: e, className: t }) {
	let r = e.numJudgments > 0 ? e.numPassed / e.numJudgments : 0, i = e.numJudgments > 0 ? e.sumOverallScore / e.numJudgments : 0, a = r >= .9 ? "success" : r >= .6 ? "warning" : "danger", o = a === "success" ? "HEALTHY" : a === "warning" ? "MIXED" : "FAILING";
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
					/* @__PURE__ */ W(g, {
						tone: a,
						size: "sm",
						children: [
							o,
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
				}), /* @__PURE__ */ U(ie, {
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
function Rf({ aggregates: e, sortOrder: t = "desc", caption: r, loading: i = !1, className: a }) {
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
	let c = e.reduce((e, t) => e + t.numJudgments, 0), l = e.reduce((e, t) => e + t.numPassed, 0), u = e.reduce((e, t) => e + t.sumCostUsd, 0), f = c > 0 ? l / c : 0;
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
					/* @__PURE__ */ W(g, {
						tone: f >= .9 ? "success" : f >= .6 ? "warning" : "danger",
						size: "sm",
						children: [
							(f * 100).toFixed(0),
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
				}), /* @__PURE__ */ U(d, {
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
				}) }), /* @__PURE__ */ U("tbody", { children: o.map((e) => /* @__PURE__ */ U(zf, { row: e }, e.aggregateKey)) })]
			})
		]
	});
}
function zf({ row: e }) {
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
				children: /* @__PURE__ */ W(g, {
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
function Bf(e) {
	if (typeof e == "number") return e;
	if (typeof e == "string") {
		let t = Date.parse(e);
		if (Number.isFinite(t)) return t;
	}
	return Date.now();
}
function Vf(e = {}) {
	let { maxRecords: t = 50, runId: n } = e, [r, i] = V([]), a = B(!0);
	return R(() => (a.current = !0, () => {
		a.current = !1;
	}), []), fe("*", (e) => {
		if (!a.current) return;
		let r = e;
		if (!r || typeof r.eventType != "string") return;
		let o = r.eventType;
		if (!o.startsWith("pipeline.judge.")) return;
		let s = r.payload;
		if (!s || typeof s.runId != "string" || typeof s.stepId != "string" || n && s.runId !== n) return;
		let c = `${s.runId}::${s.stepId}`;
		i((e) => {
			let n = e.findIndex((e) => `${e.runId}::${e.stepId}` === c), r = n === -1 ? void 0 : n, i = Bf(s.at), a = (n) => {
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
function Hf(e) {
	let t = Pf(), [n, r] = V([]), [i, a] = V(!1), [o, s] = V(null), c = B(!0), l = B(() => {}), { pipelineId: u, rubricId: d, since: f, until: p, limit: m, refreshIntervalMs: h = 0, paused: g = !1 } = e, _ = `${u ?? ""}|${d ?? ""}|${f ?? ""}|${p ?? ""}|${m ?? ""}|${g ? "1" : "0"}`;
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
var Uf = 100, Wf = 500, Gf = 148, Kf = 116;
function qf(e) {
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
function Jf(e, t) {
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
function Yf({ src: e, alt: t, testId: n }) {
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
function Xf({ data: e }) {
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
				children: /* @__PURE__ */ U(Yf, {
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
var Zf = { lineageNode: Xf };
function Qf() {
	return /* @__PURE__ */ U("div", {
		className: "flex items-center justify-center h-full text-text-tertiary text-sm",
		"data-testid": "lineage-graph-empty",
		children: "No image artifacts produced by this run."
	});
}
function $f(e, t) {
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
function ep(e) {
	return e.length > 10 ? `${e.slice(0, 8)}…` : e;
}
function tp({ navEntries: e, imageId: t, onClose: r, onNavigate: i, getImageUrl: a }) {
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
		title: `Artifact ${ep(o.imageId)}`,
		maxWidth: 760,
		rawChildren: !0,
		backdropTestId: "lineage-preview-backdrop",
		footer: /* @__PURE__ */ U(m, {
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
					/* @__PURE__ */ W(g, {
						tone: "neutral",
						size: "sm",
						mono: !0,
						title: o.imageId,
						children: ["id: ", ep(o.imageId)]
					}),
					/* @__PURE__ */ U(y, {
						"aria-label": s ? "Image id copied" : "Copy image id",
						size: "sm",
						variant: "ghost",
						onClick: u,
						"data-testid": "lineage-preview-copy",
						children: s ? "✓" : "⧉"
					}),
					o.mimeType && /* @__PURE__ */ U(g, {
						tone: "info",
						size: "sm",
						children: o.mimeType
					}),
					d && /* @__PURE__ */ U(g, {
						tone: "neutral",
						size: "sm",
						mono: !0,
						children: d
					}),
					/* @__PURE__ */ W(g, {
						tone: "purple",
						size: "sm",
						mono: !0,
						title: o.producedByStepId,
						children: ["step: ", ep(o.producedByStepId)]
					})
				]
			})]
		})
	});
}
function np({ entries: e, selectedImageId: t, onSelect: r, maxRenderedNodes: i = Uf }) {
	let a = ct(), [o, s] = V(!1), [c, l] = V(!1), [u, d] = V(null), f = e.length, p = !o && f > i, m = z(() => p ? $f(e, i) : e, [
		e,
		p,
		i
	]), h = z(() => t ? Jf(t, m) : /* @__PURE__ */ new Set(), [t, m]), g = z(() => qf(m), [m]), _ = L((e) => {
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
				width: Gf,
				height: Kf
			}
		};
	}), [
		m,
		t,
		h,
		_,
		a
	]), y = z(() => new Set(m.map((e) => e.imageId)), [m]), x = z(() => m.filter((e) => e.parentImageId && y.has(e.parentImageId)).map((e) => ({
		id: `${e.parentImageId}->${e.imageId}`,
		source: e.parentImageId,
		target: e.imageId,
		sourceHandle: "out",
		targetHandle: "in",
		className: h.has(e.imageId) && h.has(e.parentImageId) ? "stroke-primary stroke-2" : "stroke-border"
	})), [
		m,
		y,
		h
	]), [S, C, T] = Zt(v), [E, D, ee] = Yt(x);
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
	}, [_]), k = L(() => {
		f > Wf ? l(!0) : s(!0);
	}, [f]), te = L(() => {
		s(!0), l(!1);
	}, []), ne = L(() => {
		l(!1);
	}, []), A = z(() => {
		let e = m.slice();
		return e.sort((e, t) => {
			let n = Date.parse(e.at), r = Date.parse(t.at);
			return n === r ? e.imageId.localeCompare(t.imageId) : n - r;
		}), e;
	}, [m]), re = L(() => d(null), []), ie = L((e) => d(e), []);
	return f === 0 ? /* @__PURE__ */ U(Qf, {}) : /* @__PURE__ */ W("div", {
		className: "relative w-full h-full flex flex-col",
		"data-testid": "lineage-graph",
		children: [
			p && /* @__PURE__ */ U("div", {
				className: "p-2 flex-shrink-0",
				children: /* @__PURE__ */ W(b, {
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
						onClick: k,
						"data-testid": "lineage-graph-show-all",
						className: n("ml-2 px-2 py-1 text-[12px] font-medium rounded", "border border-current bg-transparent cursor-pointer", "hover:bg-current/10"),
						children: "Show all"
					})]
				})
			}),
			/* @__PURE__ */ W("div", {
				className: "flex-1 min-h-0 relative",
				children: [/* @__PURE__ */ U("style", { children: ".react-flow__node { position: absolute; }" }), /* @__PURE__ */ W(qt, {
					nodes: S,
					edges: E,
					onNodesChange: T,
					onEdgesChange: ee,
					onNodeClick: O,
					nodeTypes: Zf,
					fitView: !0,
					fitViewOptions: { padding: .2 },
					minZoom: .3,
					maxZoom: 2,
					onlyRenderVisibleElements: !0,
					proOptions: { hideAttribution: !0 },
					children: [/* @__PURE__ */ U(Ut, {
						gap: 16,
						size: 1,
						className: "bg-surface-inset"
					}), /* @__PURE__ */ U(Gt, {
						showInteractive: !1,
						className: "bg-surface border border-border rounded"
					})]
				})]
			}),
			/* @__PURE__ */ U(w, {
				open: c,
				onConfirm: te,
				onCancel: ne,
				title: "Show all artifacts?",
				body: `Rendering all ${f} artifacts may slow down the lineage tab. Continue?`,
				confirmLabel: "Show all",
				tone: "caution"
			}),
			u && /* @__PURE__ */ U(tp, {
				navEntries: A,
				imageId: u,
				onClose: re,
				onNavigate: ie,
				getImageUrl: a
			})
		]
	});
}
//#endregion
//#region src/components/pipelines/lineage/useImageLineage.ts
var rp = /* @__PURE__ */ new Map(), ip = 6e4, ap = /* @__PURE__ */ new Map();
function op(e) {
	let t = rp.get(e);
	return t ? Date.now() - t.fetchedAt > ip ? (rp.delete(e), null) : t.entries : null;
}
function sp(e, t) {
	rp.set(e, {
		entries: t,
		fetchedAt: Date.now()
	});
}
function cp() {
	rp.clear(), ap.clear();
}
function lp(e, t) {
	let n = ap.get(e);
	if (n) return n;
	let r = `/api/pipeline/runs/${encodeURIComponent(e)}/image-lineage?pipelineId=${encodeURIComponent(t)}`, i = fetch(r, {
		headers: { "Content-Type": "application/json" },
		credentials: "include"
	}).then(async (t) => {
		if (!t.ok) throw Error(`image-lineage: ${t.status} ${t.statusText}`);
		let n = await t.json(), r = Array.isArray(n.entries) ? n.entries : [];
		return sp(e, r), r;
	}).finally(() => {
		ap.get(e) === i && ap.delete(e);
	});
	return ap.set(e, i), i;
}
function up(e, t) {
	let [n, r] = V(() => e ? op(e) ?? [] : []), [i, a] = V(!1), [o, s] = V(null), c = B(0), l = L(() => {
		if (!e || !t) return;
		let n = op(e);
		if (n) {
			r(n), a(!1), s(null);
			return;
		}
		let i = ++c.current;
		a(!0), s(null), lp(e, t).then((e) => {
			i === c.current && (r(e), a(!1));
		}).catch((e) => {
			i === c.current && (s(e instanceof Error ? e.message : String(e)), a(!1));
		});
	}, [e, t]), u = L(() => {
		e && (rp.delete(e), ap.delete(e)), l();
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
//#region src/components/pipelines/list/PipelinesListView.tsx
function dp() {
	return /* @__PURE__ */ U("svg", {
		width: "12",
		height: "12",
		viewBox: "0 0 16 16",
		fill: "currentColor",
		"aria-hidden": "true",
		children: /* @__PURE__ */ U("path", { d: "M4 2.8v10.4a.8.8 0 0 0 1.2.7l8.4-5.2a.8.8 0 0 0 0-1.4L5.2 2.1A.8.8 0 0 0 4 2.8Z" })
	});
}
var fp = /* @__PURE__ */ new Set(["danger", "warning"]);
function pp(e, t, n = {}) {
	let { currentId: r = null, now: i = Date.now(), onOpen: a, onRun: o, onViewRun: s, rowTrailing: c, testId: l = "pipelines-list" } = n, { groups: u, groupOf: d } = ke(e, t);
	return {
		groups: u.map((e) => ({
			id: e.id,
			title: e.title,
			count: e.count,
			icon: /* @__PURE__ */ U(ue, {
				kind: "folder",
				size: "lg",
				variant: "plain"
			})
		})),
		rows: e.map((e) => {
			let t = De(e, i), n = we(e.route), u = e.description?.trim() || void 0, f = !!s && !!e.rollup?.lastRunId && fp.has(t.tone), p = c?.(e), h = f || p ? /* @__PURE__ */ W(H, { children: [f && /* @__PURE__ */ U(m, {
				variant: "link",
				size: "sm",
				"data-testid": `${l}-view-run-${e.id}`,
				onClick: () => s(e, e.rollup.lastRunId),
				children: "View run"
			}), p] }) : void 0;
			return {
				id: e.id,
				groupId: d.get(e.id) ?? "all",
				icon: /* @__PURE__ */ U(ue, {
					kind: wt[rt(e)],
					size: "lg",
					variant: "plain"
				}),
				title: e.name,
				pill: /* @__PURE__ */ U(ne, {
					variant: "text",
					...t,
					"data-testid": `${l}-pill-${e.id}`
				}),
				subline: u ?? n,
				hoverSubline: u && n ? n : void 0,
				current: e.id === r,
				trailing: h,
				hoverActions: /* @__PURE__ */ W(H, { children: [o && e.status === "published" && /* @__PURE__ */ U(y, {
					"aria-label": `Run ${e.name}`,
					size: "sm",
					variant: "ghost",
					icon: /* @__PURE__ */ U(dp, {}),
					"data-testid": `${l}-run-${e.id}`,
					onClick: () => o(e)
				}), /* @__PURE__ */ U(m, {
					variant: "secondary",
					size: "sm",
					"data-testid": `${l}-open-${e.id}`,
					onClick: () => a?.(e),
					children: "Open"
				})] })
			};
		})
	};
}
function mp({ entries: e, loading: t = !1, error: r = null, onRetry: i, query: a, onQueryChange: o, searchPlaceholder: s = "Search pipelines…", groupBy: c, onGroupByChange: l, filters: u, activeFilterCount: d = 0, onClearFilters: p, title: _ = "Pipelines", count: v, headerMenu: y, onTemplates: x, onStartBlank: S, headerActions: C, currentId: w = null, onOpen: T, onRun: ne, onViewRun: A, rowMenu: re, rowTrailing: ie, storageKey: j, emptyState: M, footer: ae, now: oe, frame: N = "none", className: P, "data-testid": F = "pipelines-list" }) {
	let le = z(() => e.filter((e) => je(e, a)), [e, a]), ue = oe ?? Date.now(), { groups: de, rows: fe } = z(() => pp(le, c, {
		currentId: w,
		now: ue,
		onOpen: T,
		onRun: ne,
		onViewRun: A,
		rowTrailing: ie,
		testId: F
	}), [
		le,
		c,
		w,
		ue,
		T,
		ne,
		A,
		ie,
		F
	]), pe = z(() => new Map(le.map((e) => [e.id, e])), [le]), me = a.trim().length > 0 || d > 0, he = !!y?.length || !!x || !!S || !!C, ge;
	return ge = t && e.length === 0 ? /* @__PURE__ */ U(te, {
		label: "Loading pipelines…",
		testId: `${F}-loading`
	}) : e.length === 0 ? /* @__PURE__ */ U(k, {
		testId: `${F}-empty`,
		title: M?.title ?? "No pipelines yet",
		body: M?.body ?? "Start from a template, from blank, or ask the agent below to draft one.",
		actionLabel: M?.actionLabel ?? (S ? "Start from blank" : void 0),
		onAction: M?.onAction ?? S
	}) : le.length === 0 ? /* @__PURE__ */ U(h, {
		density: "compact",
		children: /* @__PURE__ */ U(k, {
			testId: `${F}-no-match`,
			title: "No pipelines match",
			body: me ? "Try a different search, or clear the filters." : void 0,
			actionLabel: me ? "Clear search and filters" : void 0,
			onAction: me ? () => {
				o(""), p?.();
			} : void 0
		})
	}) : /* @__PURE__ */ U(f, {
		"data-testid": `${F}-groups`,
		groups: de,
		rows: fe,
		currentId: w,
		storageKey: j,
		onOpenRow: (e) => {
			let t = pe.get(e.id);
			t && T(t);
		},
		rowMenu: re ? (e) => {
			let t = pe.get(e.id);
			return t ? re(t) : null;
		} : void 0
	}), /* @__PURE__ */ W("div", {
		"data-testid": F,
		"data-frame": N,
		className: n("flex h-full min-h-0 flex-col gap-4", P),
		children: [
			/* @__PURE__ */ U(ce, {
				title: _,
				badge: /* @__PURE__ */ U(g, {
					size: "sm",
					tone: "neutral",
					"data-testid": `${F}-count`,
					"aria-label": `${v ?? le.length} pipelines`,
					children: v ?? le.length
				}),
				actions: he ? /* @__PURE__ */ W(H, { children: [
					!!y?.length && /* @__PURE__ */ U(se, {
						trigger: /* @__PURE__ */ U("span", {
							"aria-hidden": "true",
							className: "text-base leading-none",
							children: "⋯"
						}),
						triggerLabel: "More actions",
						triggerTestId: `${F}-more`,
						align: "end",
						sections: y,
						triggerClassName: "h-9 w-9 px-0 py-0"
					}),
					x && /* @__PURE__ */ U(m, {
						variant: "secondary",
						size: "md",
						"data-testid": `${F}-templates`,
						onClick: x,
						children: "Templates"
					}),
					S && /* @__PURE__ */ U(m, {
						variant: "secondary",
						size: "md",
						"data-testid": `${F}-start-blank`,
						onClick: S,
						children: "Start from blank"
					}),
					C
				] }) : void 0
			}),
			/* @__PURE__ */ W("div", {
				"data-testid": `${F}-frame`,
				"data-frame": N,
				className: n("flex min-h-0 flex-1 flex-col gap-4", N === "card" && "gap-0 overflow-hidden rounded-xl border border-border bg-surface"),
				children: [
					/* @__PURE__ */ W(ee, {
						"aria-label": "Pipeline list tools",
						"data-testid": `${F}-toolbar`,
						bordered: N === "card",
						className: n(N === "card" && "py-1.5"),
						end: /* @__PURE__ */ U(E, {
							size: "sm",
							"aria-label": "Group by",
							"data-testid": `${F}-group-by`,
							value: c,
							onChange: (e) => l(e.target.value),
							options: Ne.map((e) => ({
								value: e,
								label: `Group: ${Tt[e]}`
							}))
						}),
						children: [/* @__PURE__ */ U(O, {
							value: a,
							onChange: o,
							placeholder: s,
							"aria-label": "Search pipelines",
							"data-testid": `${F}-search`,
							className: "w-full max-w-[420px] flex-1"
						}), u && /* @__PURE__ */ U(D, {
							activeCount: d,
							onClear: p,
							"data-testid": `${F}-filter`,
							children: u
						})]
					}),
					r && /* @__PURE__ */ U(b, {
						variant: "error",
						"data-testid": `${F}-error`,
						action: i ? /* @__PURE__ */ U(m, {
							variant: "secondary",
							size: "sm",
							onClick: i,
							children: "Retry"
						}) : void 0,
						children: r
					}),
					/* @__PURE__ */ U("div", {
						className: "min-h-0 flex-1 overflow-y-auto",
						"data-testid": `${F}-body`,
						children: ge
					})
				]
			}),
			ae && /* @__PURE__ */ U(Mt.Provider, {
				value: "pinned",
				children: /* @__PURE__ */ U("div", {
					"data-testid": `${F}-footer`,
					className: "w-full shrink-0 [--dock-inset:0px]",
					children: ae
				})
			})
		]
	});
}
//#endregion
export { Ue as ALL_GROUP_ID, Sn as ActionNode, Us as AdjustBwConfig, tr as AdjustBwNode, sc as AdjustLayerConfig, rr as AdjustLayerNode, Ln as AgUiOutputNode, An as AgentNode, Lf as AggregateSummaryCard, sf as AllRunsPage, jt as AnimatedEdge, kn as ApprovalNode, q as BaseNode, qc as CaptionPanel, bn as ConditionNode, X as ConfigField, Ka as ConfigSection, Co as ContextVariablePicker, Af as CriteriaPanel, Vs as CropConfig, er as CropNode, lc as DimensionsConfig, ir as DimensionsNode, Nc as EditPromptConfig, Sr as EditPromptNode, nl as EditRecommendationsPanel, me as EventStreamProvider, rf as ExecutorLog, wn as ForkNode, xs as FormatConvertConfig, Xn as FormatConvertNode, Tt as GROUP_BY_LABEL, Ne as GROUP_BY_ORDER, Oc as GenerateConfig, _r as GenerateNode, Nn as GraphQueryNode, Fn as GuardrailNode, np as ImageLineageGraph, Fc as ImageSourceConfig, zn as ImageSourceNode, Yc as ImageWithBBoxOverlay, Dn as JoinNode, Nf as JudgmentApiProvider, Ff as JudgmentResultViewer, Rf as JudgmentTrendChart, ve as KIND_LABEL, wt as KIND_MARK, Pe as KIND_ORDER, be as KIND_WORK_TYPE, Mn as KnowledgeBaseNode, gn as LLMNode, fd as MODEL_AUTH_NOT_RETRYABLE, jn as McpToolNode, Pn as MemoryNode, ln as NODE_CATEGORIES, pl as NODE_TYPES_WITHOUT_CONFIG, qa as NodeConfigShell, ei as NodePalette, Hn as NodeThumbStrip, Qc as ObjectsPanel, Hr as PALETTE_ITEMS, un as PORT_CLS, Df as PendingApprovalsPage, Zc as PeoplePanel, vi as PipelineCanvas, Re as PipelineEditorContext, Fl as PipelineEditorPage, Me as PipelineEditorProvider, vt as PipelineEditorServicesProvider, Se as PipelineNodeRuntimeProvider, af as PipelineRunReplayPage, rd as PipelineRunsPage, _e as PipelineRunsProvider, xf as PipelineStatsPage, mp as PipelinesListView, Eu as PipelinesPage, In as PolicyNode, ad as REFUSAL_CODES, fs as ResizeConfig, Kn as ResizeNode, ye as STATUS_LABEL, Ae as STATUS_ORDER, Ja as SamplePills, Lc as SaveConfig, Un as SaveNode, us as ScatterConfig, Gn as ScatterNode, Cn as ServerStepNode, Ss as SharpenConfig, Zn as SharpenNode, ro as SourceImagePathField, vd as StepAttempts, pd as StepSection, Id as StepThread, Rd as StepTree, $c as TagsPanel, io as ToggleField, _s as TransformGeoConfig, Jn as TransformGeoNode, vn as TransformNode, pn as TriggerNode, dc as UpscaleConfig, ar as UpscaleNode, jc as VariationConfig, yr as VariationNode, kf as VerdictPanel, bc as VisionClassifyConfig, dr as VisionClassifyNode, gc as VisionConfig, xc as VisionDescribeConfig, fr as VisionDescribeNode, Cc as VisionExtractTextConfig, mr as VisionExtractTextNode, ur as VisionNode, rl as VisionResultViewer, jd as VisionRunCard, vc as VisionTagConfig, pr as VisionTagNode, it as WORK_TYPE_LABEL, ge as WORK_TYPE_ORDER, ws as WatermarkConfig, Qn as WatermarkNode, Za as availableContextPaths, eo as availableImageRefs, J as categoryFor, cp as clearImageLineageCache, Ya as contextContributions, rt as entryKind, Oe as entryWorkType, ke as groupEntries, Xc as imageOverlayPropsFrom, je as matchesQuery, Cr as nodeTypes, Y as portCls, Jr as recordRecentType, sd as refusalCodeOf, ud as refusalNotRetryableReason, xe as relativeAgo, we as routeLine, dd as runModelAuth, cd as runRefusal, De as statusPillFor, ld as stepRefusal, pp as toGroupedRows, Qa as unresolvedTemplatePaths, Xa as upstreamNodeIds, fe as useEventStream, pe as useEventStreamContext, up as useImageLineage, ct as useImageUrl, mt as useImageUrlOptional, tt as useIsNodeTypeExecutable, Hf as useJudgmentAggregates, Pf as useJudgmentApi, Vf as useJudgmentResults, I as useLatestStepForNode, he as usePipelineEditor, Ge as usePipelineEditorServices, Ee as usePipelineNodeRuntime, Ce as usePipelineRuns, Fe as useRetryFromStep, Ie as useRetryFromStepIfWired, to as useUpstreamContext, no as useUpstreamImageRefs, Md as useVisionResults, at as useWebhookRelay };
