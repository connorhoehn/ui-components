import { t as e } from "./cn-DhjIN-s0.js";
import { L as t, Z as n, b as r, et as i, h as a, l as o, o as s, tt as c } from "./DropdownMenu-thsvyIAZ.js";
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
	sm: "h-[18px] w-[18px] rounded",
	md: "h-[22px] w-[22px] rounded-[5px]",
	lg: "h-7 w-7 rounded-md",
	xl: "h-8 w-8 rounded-lg",
	"2xl": "h-10 w-10 rounded-lg"
}, h = {
	sm: 12,
	md: 14,
	lg: 16,
	xl: 20,
	"2xl": 36
}, g = (e) => f[e].split(" ").filter((e) => e.startsWith("text-")).join(" ");
function _(e) {
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
function v({ size: e }) {
	return /* @__PURE__ */ u("svg", {
		..._(e),
		children: [/* @__PURE__ */ l("path", { d: "M7 2.5c.4 2.6 1.6 3.8 4.2 4.2-2.6.4-3.8 1.6-4.2 4.2-.4-2.6-1.6-3.8-4.2-4.2C5.4 6.3 6.6 5.1 7 2.5Z" }), /* @__PURE__ */ l("path", { d: "M12.5 10.5c.2 1.2.8 1.8 2 2-1.2.2-1.8.8-2 2-.2-1.2-.8-1.8-2-2 1.2-.2 1.8-.8 2-2Z" })]
	});
}
function y({ size: e }) {
	return /* @__PURE__ */ u("svg", {
		..._(e),
		children: [/* @__PURE__ */ l("path", { d: "M6.5 2h3M7 2v4.2L3.4 12.3A1 1 0 0 0 4.3 14h7.4a1 1 0 0 0 .9-1.7L9 6.2V2" }), /* @__PURE__ */ l("path", { d: "M5.2 10.5h5.6" })]
	});
}
function b({ size: e }) {
	return /* @__PURE__ */ u("svg", {
		..._(e),
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
function x({ size: e }) {
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
function S({ size: e }) {
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
function C({ size: e }) {
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
var w = {
	sm: "h-5 w-5",
	md: "h-6 w-6",
	lg: "h-7 w-7",
	xl: "h-8 w-8",
	"2xl": "h-10 w-10"
}, T = {
	sm: 18,
	md: 20,
	lg: 24,
	xl: 28,
	"2xl": 36
};
function E({ kind: u, size: d = "md", variant: _ = "tinted", label: E, className: D, "data-testid": O = "file-kind-mark" }) {
	let k = _ === "glyph" ? T[d] : h[d], A = _ === "glyph" ? u === "presentation" ? /* @__PURE__ */ l(S, { size: k }) : u === "diagram" ? /* @__PURE__ */ l(C, { size: k }) : null : null, j = d === "2xl" ? { strokeWidth: 1 } : {}, M = A ?? {
		page: /* @__PURE__ */ l(a, {
			size: k,
			...j
		}),
		presentation: /* @__PURE__ */ l(x, {
			size: k,
			...j
		}),
		recording: /* @__PURE__ */ l(i, {
			size: k,
			...j
		}),
		transcript: /* @__PURE__ */ l(n, {
			size: k,
			...j
		}),
		diagram: /* @__PURE__ */ l(c, {
			size: k,
			...j
		}),
		folder: /* @__PURE__ */ l(r, {
			size: k,
			...j
		}),
		agent: /* @__PURE__ */ l(v, {
			size: k,
			...j
		}),
		experiment: /* @__PURE__ */ l(y, {
			size: k,
			...j
		}),
		call: /* @__PURE__ */ l(t, {
			size: k,
			...j
		}),
		conversation: /* @__PURE__ */ l(o, {
			size: k,
			...j
		}),
		media: /* @__PURE__ */ l(b, {
			size: k,
			...j
		}),
		workflow: /* @__PURE__ */ l(s, {
			size: k,
			...j
		})
	}[u];
	return /* @__PURE__ */ l("span", {
		"data-testid": O,
		"data-kind": u,
		"data-variant": _,
		...E ? {
			role: "img",
			"aria-label": E
		} : { "aria-hidden": !0 },
		className: e("inline-grid shrink-0 place-items-center", _ === "glyph" ? w[d] : m[d], _ === "glyph" ? "bg-transparent" : _ === "outline" ? e("bg-transparent", g(u)) : _ === "plain" ? p : f[u], D),
		children: M
	});
}
//#endregion
export { E as n, d as t };
