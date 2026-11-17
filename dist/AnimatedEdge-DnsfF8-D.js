import { t as e } from "./usePrefersReducedMotion-Cllucr7i.js";
import { t } from "./cn-D4QmbyEy.js";
import { Fragment as n, jsx as r, jsxs as i } from "react/jsx-runtime";
import { EdgeLabelRenderer as a, getSmoothStepPath as o } from "@xyflow/react";
//#region src/components/pipelines/canvas/edges/AnimatedEdge.tsx
var s = "#c4b5fd";
function c(e) {
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
function l({ id: l, sourceX: u, sourceY: d, targetX: f, targetY: p, sourcePosition: m, targetPosition: h, data: g, markerEnd: _, selected: v }) {
	let y = g ?? {}, b = e(), [x, S, C] = o({
		sourceX: u,
		sourceY: d,
		targetX: f,
		targetY: p,
		sourcePosition: m,
		targetPosition: h
	}), w = c(y.state), T = (y.state ?? "default") === "default", E = y.payload, D = w.animate && !b, O = w.stroke, k = w.strokeWidth, A = D ? w.strokeDasharray : void 0;
	E === "image" ? (k = 2.5, T && (O = s)) : E === "control" && (k = 1.5, T && (A = "2 4"));
	let j = y.volume, M = typeof j == "number" && j >= 2;
	M && (k = Math.min(4, k + Math.log2(j)));
	let N = v ? "var(--color-primary)" : O, P = v ? Math.max(2.5, k) : k, F = E === "image" && y.state === "active" && !b;
	return /* @__PURE__ */ i(n, { children: [
		/* @__PURE__ */ r("path", {
			d: x,
			fill: "none",
			stroke: "transparent",
			strokeWidth: 12,
			className: "[pointer-events:stroke]"
		}),
		/* @__PURE__ */ r("path", {
			id: l,
			d: x,
			fill: "none",
			stroke: N,
			strokeWidth: P,
			strokeDasharray: A,
			markerEnd: _,
			className: "pointer-events-none",
			children: D ? /* @__PURE__ */ r("animate", {
				attributeName: "stroke-dashoffset",
				from: "0",
				to: "-20",
				dur: "1s",
				repeatCount: "indefinite"
			}) : null
		}),
		F ? /* @__PURE__ */ r("circle", {
			r: 3,
			fill: N,
			className: "pointer-events-none",
			children: /* @__PURE__ */ r("animateMotion", {
				dur: "1.2s",
				repeatCount: "indefinite",
				path: x
			})
		}) : null,
		y.label ? /* @__PURE__ */ r(a, { children: /* @__PURE__ */ r("div", {
			className: t("absolute pointer-events-auto px-2 py-0.5 rounded-full text-[10px] font-semibold leading-[1.4]", "bg-surface text-text-secondary border border-border font-[inherit] whitespace-nowrap", "shadow-[0_1px_2px_rgba(15,23,42,0.06)]"),
			style: { transform: `translate(-50%, -50%) translate(${u + 28}px, ${d}px)` },
			children: y.label
		}) }) : null,
		M ? /* @__PURE__ */ r(a, { children: /* @__PURE__ */ r("div", {
			className: t("absolute pointer-events-none px-1.5 py-px rounded-full text-[9px] font-semibold leading-[1.4]", "bg-surface text-text-secondary border border-border font-[inherit] whitespace-nowrap", "shadow-[0_1px_2px_rgba(15,23,42,0.06)]"),
			style: { transform: `translate(-50%, -50%) translate(${S}px, ${C}px)` },
			children: `×${j}`
		}) }) : null
	] });
}
//#endregion
export { l as t };
