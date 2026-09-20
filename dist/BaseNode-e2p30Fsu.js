import { t as e } from "./usePrefersReducedMotion-Cllucr7i.js";
import { t } from "./cn-DhjIN-s0.js";
import { createContext as n, useContext as r, useMemo as i, useState as a } from "react";
import { Fragment as o, jsx as s, jsxs as c } from "react/jsx-runtime";
import { EdgeLabelRenderer as l, getSmoothStepPath as u } from "@xyflow/react";
//#region src/components/pipelines/canvas/edges/AnimatedEdge.tsx
var d = "#c4b5fd";
function f(e) {
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
function p({ id: n, sourceX: r, sourceY: i, targetX: a, targetY: p, sourcePosition: m, targetPosition: h, data: g, markerEnd: _, selected: v }) {
	let y = g ?? {}, b = e(), [x, S, C] = u({
		sourceX: r,
		sourceY: i,
		targetX: a,
		targetY: p,
		sourcePosition: m,
		targetPosition: h
	}), w = f(y.state), T = (y.state ?? "default") === "default", E = y.payload, D = w.animate && !b, O = w.stroke, k = w.strokeWidth, A = D ? w.strokeDasharray : void 0;
	E === "image" ? (k = 2.5, T && (O = d)) : E === "control" && (k = 1.5, T && (A = "2 4"));
	let j = y.volume, M = typeof j == "number" && j >= 2;
	M && (k = Math.min(4, k + Math.log2(j)));
	let N = v ? "var(--color-primary)" : O, P = v ? Math.max(2.5, k) : k, F = E === "image" && y.state === "active" && !b;
	return /* @__PURE__ */ c(o, { children: [
		/* @__PURE__ */ s("path", {
			d: x,
			fill: "none",
			stroke: "transparent",
			strokeWidth: 12,
			className: "[pointer-events:stroke]"
		}),
		/* @__PURE__ */ s("path", {
			id: n,
			d: x,
			fill: "none",
			stroke: N,
			strokeWidth: P,
			strokeDasharray: A,
			markerEnd: _,
			className: "pointer-events-none",
			children: D ? /* @__PURE__ */ s("animate", {
				attributeName: "stroke-dashoffset",
				from: "0",
				to: "-20",
				dur: "1s",
				repeatCount: "indefinite"
			}) : null
		}),
		F ? /* @__PURE__ */ s("circle", {
			r: 3,
			fill: N,
			className: "pointer-events-none",
			children: /* @__PURE__ */ s("animateMotion", {
				dur: "1.2s",
				repeatCount: "indefinite",
				path: x
			})
		}) : null,
		y.label ? /* @__PURE__ */ s(l, { children: /* @__PURE__ */ s("div", {
			className: t("absolute pointer-events-auto px-2 py-0.5 rounded-full text-[10px] font-semibold leading-[1.4]", "bg-surface text-text-secondary border border-border font-[inherit] whitespace-nowrap", "shadow-[0_1px_2px_rgba(15,23,42,0.06)]"),
			style: { transform: `translate(-50%, -50%) translate(${r + 28}px, ${i}px)` },
			children: y.label
		}) }) : null,
		M ? /* @__PURE__ */ s(l, { children: /* @__PURE__ */ s("div", {
			className: t("absolute pointer-events-none px-1.5 py-px rounded-full text-[9px] font-semibold leading-[1.4]", "bg-surface text-text-secondary border border-border font-[inherit] whitespace-nowrap", "shadow-[0_1px_2px_rgba(15,23,42,0.06)]"),
			style: { transform: `translate(-50%, -50%) translate(${S}px, ${C}px)` },
			children: `×${j}`
		}) }) : null
	] });
}
//#endregion
//#region src/components/pipelines/services/PipelineEditorServicesContext.tsx
var m = n(null);
function h({ services: e, children: t }) {
	return /* @__PURE__ */ s(m.Provider, {
		value: e,
		children: t
	});
}
function g() {
	let e = r(m);
	if (!e) throw Error("useImageUrl must be called inside <PipelineEditorServicesProvider>. The host editor (e.g. wsg PipelineEditorPage) is responsible for mounting it with its own getImageUrl implementation.");
	return e.getImageUrl;
}
function _() {
	return r(m)?.getImageUrl ?? null;
}
function v() {
	let e = r(m);
	if (!e) throw Error("usePipelineEditorServices must be called inside <PipelineEditorServicesProvider>.");
	return e;
}
function y(e) {
	let t = r(m)?.nodeVocabulary?.[e];
	return i(() => ({
		label: (e, n) => t?.labels?.[e] ?? n,
		help: (e, n) => t?.help?.[e] ?? n,
		placeholder: (e, n) => t?.placeholders?.[e] ?? n
	}), [t]);
}
function b(e, t) {
	let n = r(m)?.modelOptions?.[e];
	return i(() => n ?? t, [n, t]);
}
function x() {
	let e = r(m)?.modelOptions;
	return i(() => (t, n) => e?.[t] ?? n, [e]);
}
function S() {
	let e = r(m)?.webhookRelay;
	return i(() => ({
		enabled: e?.enabled ?? !1,
		publicUrlBase: e?.publicUrlBase
	}), [e?.enabled, e?.publicUrlBase]);
}
function C() {
	let e = r(m)?.executableNodeTypes;
	return i(() => {
		if (!e) return () => !0;
		let t = new Set(e);
		return (e) => t.has(e);
	}, [e]);
}
//#endregion
//#region src/components/pipelines/nodes/BaseNode.tsx
var w = {
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
}, T = {
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
function E(n) {
	let r = C(), i = n.nodeType ? !r(n.nodeType) : !1, { icon: o, subtitle: l, state: u, body: d, footer: f, selected: p, onRetry: m, hasBreakpoint: h, pausedAtBreakpoint: g, ariaLabel: _, category: v, children: y } = n, b = w[u] ?? w.idle, x = v ? T[v] : void 0, S = e(), [E, D] = a(!1), O = u === "failed" && typeof m == "function", k = (e) => {
		e.preventDefault(), e.stopPropagation(), m?.();
	}, A = !S && u === "pending" ? "animate-[basenode-pulse_2000ms_cubic-bezier(0.25,0.1,0.25,1)_infinite]" : !S && u === "running" ? "animate-[basenode-pulse_1500ms_linear_infinite]" : "", j = !!(d || f || O), M = !!(d || f), N = l ? `${l}, state: ${u}` : `Node, state: ${u}`;
	return /* @__PURE__ */ c("div", {
		className: t("w-[200px] rounded-lg relative font-inherit text-text-primary box-border outline-none transition-[border-color,background-color] duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2", g ? "border-2 border-warning bg-warning-bg shadow-[0_0_0_3px_rgba(217,119,6,0.25),0_1px_2px_rgba(15,23,42,0.06)]" : b.card, !g && p && "shadow-[0_0_0_4px_rgba(100,108,255,0.18),0_1px_2px_rgba(15,23,42,0.06)]", !g && !p && "shadow-[0_1px_2px_rgba(15,23,42,0.06)]", S && "transition-none"),
		role: "button",
		tabIndex: 0,
		"aria-label": _ ?? N,
		"aria-selected": !!p,
		"data-state": u,
		"data-node-state": u,
		"data-node-category": v,
		"data-pipeline-node": "true",
		children: [
			x && /* @__PURE__ */ s("span", {
				"aria-hidden": "true",
				"data-testid": "category-accent",
				className: t("absolute left-0 top-0 bottom-0 w-[3px] rounded-l-[7px] pointer-events-none", x.bar)
			}),
			h && /* @__PURE__ */ s("span", {
				"aria-label": "breakpoint",
				"data-testid": "breakpoint-dot",
				className: "absolute -top-1 -left-1 w-2.5 h-2.5 rounded-full bg-danger border-[1.5px] border-white z-[1]"
			}),
			/* @__PURE__ */ c("div", {
				className: t("flex items-center gap-2 h-7 px-2.5", j && "border-b border-border"),
				children: [
					x ? /* @__PURE__ */ s("span", {
						"aria-hidden": "true",
						"data-testid": "category-chip",
						className: t("flex items-center justify-center shrink-0", x.chip),
						children: /* @__PURE__ */ s("span", {
							className: t("text-xs leading-none", x.glyph),
							children: o
						})
					}) : /* @__PURE__ */ s("span", {
						className: "text-sm leading-none shrink-0",
						"aria-hidden": "true",
						children: o
					}),
					/* @__PURE__ */ s("span", {
						className: "flex-1 min-w-0 text-xs font-semibold text-text-primary overflow-hidden text-ellipsis whitespace-nowrap",
						children: l
					}),
					i && /* @__PURE__ */ s("span", {
						"data-testid": "node-preview-badge",
						title: "This deployment has no executor for this node type — the step will not run.",
						className: "shrink-0 rounded-full border border-warning-border bg-warning-bg px-1.5 text-[8px] font-semibold uppercase tracking-wide text-warning-fg",
						children: "preview"
					}),
					/* @__PURE__ */ s("span", {
						className: t("w-2 h-2 rounded-full shrink-0", b.dot, A),
						"aria-label": `state: ${u}`
					})
				]
			}),
			O && /* @__PURE__ */ s("div", {
				className: t("flex px-2.5 py-1.5", M && "border-b border-border"),
				children: /* @__PURE__ */ s("button", {
					type: "button",
					className: t("cursor-pointer appearance-none font-inherit text-[11px] font-medium leading-tight px-2 py-0.5 rounded-full border border-danger text-danger-fg transition-colors duration-[120ms] ease-[cubic-bezier(0.4,0,0.2,1)]", E ? "bg-danger-bg" : "bg-transparent", S && "transition-none"),
					onClick: k,
					onMouseDown: (e) => e.stopPropagation(),
					onMouseEnter: () => D(!0),
					onMouseLeave: () => D(!1),
					"aria-label": "Retry from here",
					children: "⟳ Retry from here"
				})
			}),
			d != null && /* @__PURE__ */ s("div", {
				className: "px-2.5 py-2 text-[13px] leading-[1.4] text-text-secondary",
				children: d
			}),
			f != null && /* @__PURE__ */ s("div", {
				className: "border-t border-border px-2.5 py-1.5 text-xs text-text-secondary",
				children: f
			}),
			y
		]
	});
}
//#endregion
export { C as a, y as c, p as d, _ as i, v as l, h as n, b as o, g as r, x as s, E as t, S as u };
