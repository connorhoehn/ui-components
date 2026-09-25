import { t as e } from "./cn-DhjIN-s0.js";
import { B as t, S as n, g as r, l as i, lt as a, o, rt as s, st as c } from "./Icons-DpB_pJYh.js";
import { jsx as l, jsxs as u } from "react/jsx-runtime";
//#region src/components/shared/FileKindMark.tsx
var d = {
	page: "Page",
	presentation: "Presentation",
	recording: "Recording",
	transcript: "Transcript",
	diagram: "Diagram",
	folder: "Folder",
	agent: "Agent",
	experiment: "Experiment",
	call: "Call",
	conversation: "Conversation",
	media: "Media",
	workflow: "Workflow"
}, f = {
	page: "bg-info-bg text-info-fg",
	presentation: "bg-accent-bg text-accent-fg",
	recording: "bg-danger-bg text-danger-fg",
	transcript: "bg-warning-bg text-warning-fg",
	diagram: "bg-success-bg text-success-fg",
	folder: "bg-surface-hover text-text-secondary",
	agent: "bg-accent-bg text-accent-fg",
	experiment: "bg-warning-bg text-warning-fg",
	call: "bg-success-bg text-success-fg",
	conversation: "bg-info-bg text-info-fg",
	media: "bg-accent-bg text-accent-fg",
	workflow: "bg-surface-hover text-text-secondary"
}, p = "bg-transparent text-text-secondary", m = {
	sm: 14,
	md: 18,
	lg: 22,
	xl: 28,
	"2xl": 36
}, h = {
	sm: "h-[18px] w-[18px] rounded",
	md: "h-[22px] w-[22px] rounded-[5px]",
	lg: "h-7 w-7 rounded-md",
	xl: "h-8 w-8 rounded-lg",
	"2xl": "h-10 w-10 rounded-lg"
}, g = {
	sm: 12,
	md: 14,
	lg: 16,
	xl: 20,
	"2xl": 36
}, _ = (e) => f[e].split(" ").filter((e) => e.startsWith("text-")).join(" ");
function v(e) {
	return {
		width: e,
		height: e,
		viewBox: "0 0 16 16",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: 1.5,
		strokeLinecap: "round",
		strokeLinejoin: "round",
		"aria-hidden": !0
	};
}
function y({ size: e }) {
	return /* @__PURE__ */ u("svg", {
		...v(e),
		children: [/* @__PURE__ */ l("path", { d: "M7 2.5c.4 2.6 1.6 3.8 4.2 4.2-2.6.4-3.8 1.6-4.2 4.2-.4-2.6-1.6-3.8-4.2-4.2C5.4 6.3 6.6 5.1 7 2.5Z" }), /* @__PURE__ */ l("path", { d: "M12.5 10.5c.2 1.2.8 1.8 2 2-1.2.2-1.8.8-2 2-.2-1.2-.8-1.8-2-2 1.2-.2 1.8-.8 2-2Z" })]
	});
}
function b({ size: e }) {
	return /* @__PURE__ */ u("svg", {
		...v(e),
		children: [/* @__PURE__ */ l("path", { d: "M6.5 2h3M7 2v4.2L3.4 12.3A1 1 0 0 0 4.3 14h7.4a1 1 0 0 0 .9-1.7L9 6.2V2" }), /* @__PURE__ */ l("path", { d: "M5.2 10.5h5.6" })]
	});
}
function x({ size: e }) {
	return /* @__PURE__ */ u("svg", {
		...v(e),
		children: [
			/* @__PURE__ */ l("rect", {
				x: "2",
				y: "3",
				width: "12",
				height: "10",
				rx: "1.5"
			}),
			/* @__PURE__ */ l("circle", {
				cx: "6",
				cy: "6.5",
				r: "1.2"
			}),
			/* @__PURE__ */ l("path", { d: "M14 10.5 10.8 7.8 6.5 12M2 12l2.6-2.4 1.8 1.6" })
		]
	});
}
function S({ size: e }) {
	return /* @__PURE__ */ u("svg", {
		width: e,
		height: e,
		viewBox: "0 0 16 16",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: 1.5,
		strokeLinecap: "round",
		strokeLinejoin: "round",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ l("rect", {
			x: "2",
			y: "3",
			width: "12",
			height: "8.5",
			rx: "1"
		}), /* @__PURE__ */ l("path", { d: "M4.5 6h5M4.5 8.5h3M8 11.5V14M6 14h4" })]
	});
}
function C({ size: e }) {
	return /* @__PURE__ */ u("svg", {
		width: e,
		height: e,
		viewBox: "0 0 16 16",
		fill: "none",
		"aria-hidden": "true",
		"data-glyph": "deck-bars",
		children: [
			/* @__PURE__ */ l("rect", {
				x: "2.5",
				y: "8",
				width: "3",
				height: "5.5",
				rx: "0.5",
				className: "fill-success"
			}),
			/* @__PURE__ */ l("rect", {
				x: "6.5",
				y: "5",
				width: "3",
				height: "8.5",
				rx: "0.5",
				className: "fill-danger"
			}),
			/* @__PURE__ */ l("rect", {
				x: "10.5",
				y: "2.5",
				width: "3",
				height: "11",
				rx: "0.5",
				className: "fill-primary"
			}),
			/* @__PURE__ */ l("path", {
				d: "M1.5 14.25h13",
				stroke: "currentColor",
				strokeWidth: 1,
				strokeLinecap: "round",
				opacity: .35
			})
		]
	});
}
function w({ size: e }) {
	return /* @__PURE__ */ u("svg", {
		width: e,
		height: e,
		viewBox: "0 0 24 24",
		fill: "none",
		"aria-hidden": "true",
		"data-glyph": "slide-tile",
		children: [
			/* @__PURE__ */ l("rect", {
				x: "7",
				y: "3.5",
				width: "14",
				height: "17",
				rx: "1.5",
				className: "fill-danger-bg stroke-danger",
				strokeWidth: "1.2"
			}),
			/* @__PURE__ */ l("path", {
				d: "M14 8h4M14 11h4M14 14h4",
				className: "stroke-danger",
				strokeWidth: "1.2",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ l("rect", {
				x: "2.5",
				y: "6.5",
				width: "11",
				height: "11",
				rx: "1.5",
				className: "fill-danger"
			}),
			/* @__PURE__ */ l("path", {
				d: "M6.3 15V9.2h2.3a1.8 1.8 0 0 1 0 3.6H6.3",
				stroke: "white",
				strokeWidth: "1.4",
				strokeLinecap: "round",
				strokeLinejoin: "round"
			})
		]
	});
}
function T({ size: e }) {
	return /* @__PURE__ */ u("svg", {
		width: e,
		height: e,
		viewBox: "0 0 16 16",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: 1.6,
		strokeLinecap: "round",
		"aria-hidden": "true",
		"data-glyph": "diagram-nodes",
		className: "text-primary",
		children: [
			/* @__PURE__ */ l("circle", {
				cx: "4.25",
				cy: "4.25",
				r: "2"
			}),
			/* @__PURE__ */ l("circle", {
				cx: "11.75",
				cy: "11.75",
				r: "2"
			}),
			/* @__PURE__ */ l("path", { d: "M12.5 3.5 3.5 12.5M6.5 9.5l-.01.01M9.5 6.5l-.01.01" })
		]
	});
}
var E = {
	sm: "h-5 w-5",
	md: "h-6 w-6",
	lg: "h-7 w-7",
	xl: "h-8 w-8",
	"2xl": "h-10 w-10"
}, D = {
	sm: 18,
	md: 20,
	lg: 24,
	xl: 28,
	"2xl": 36
};
function O({ kind: u, size: d = "md", variant: v = "tinted", label: O, className: k, "data-testid": A = "file-kind-mark" }) {
	let j = v === "glyph" ? D[d] : v === "app" ? m[d] : g[d], M = v === "glyph" ? u === "presentation" ? /* @__PURE__ */ l(C, { size: j }) : u === "diagram" ? /* @__PURE__ */ l(T, { size: j }) : null : v === "app" ? u === "presentation" ? /* @__PURE__ */ l(w, { size: m[d] }) : u === "diagram" ? /* @__PURE__ */ l(T, { size: m[d] }) : null : null, N = d === "2xl" || v === "app" ? { strokeWidth: 1 } : {}, P = M ?? {
		page: /* @__PURE__ */ l(r, {
			size: j,
			...N
		}),
		presentation: /* @__PURE__ */ l(S, {
			size: j,
			...N
		}),
		recording: /* @__PURE__ */ l(c, {
			size: j,
			...N
		}),
		transcript: /* @__PURE__ */ l(s, {
			size: j,
			...N
		}),
		diagram: /* @__PURE__ */ l(a, {
			size: j,
			...N
		}),
		folder: /* @__PURE__ */ l(n, {
			size: j,
			...N
		}),
		agent: /* @__PURE__ */ l(y, {
			size: j,
			...N
		}),
		experiment: /* @__PURE__ */ l(b, {
			size: j,
			...N
		}),
		call: /* @__PURE__ */ l(t, {
			size: j,
			...N
		}),
		conversation: /* @__PURE__ */ l(i, {
			size: j,
			...N
		}),
		media: /* @__PURE__ */ l(x, {
			size: j,
			...N
		}),
		workflow: /* @__PURE__ */ l(o, {
			size: j,
			...N
		})
	}[u];
	return /* @__PURE__ */ l("span", {
		"data-testid": A,
		"data-kind": u,
		"data-variant": v,
		...O ? {
			role: "img",
			"aria-label": O
		} : { "aria-hidden": !0 },
		className: e("inline-grid shrink-0 place-items-center", v === "glyph" || v === "app" ? E[d] : h[d], v === "glyph" ? "bg-transparent" : v === "app" ? p : v === "outline" ? e("bg-transparent", _(u)) : v === "plain" ? p : f[u], k),
		children: P
	});
}
//#endregion
export { O as n, d as t };
