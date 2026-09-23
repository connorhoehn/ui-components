import { t as e } from "./cn-DhjIN-s0.js";
import { A as t, G as n, K as r, U as i, c as a, o, p as s, v as c } from "./DropdownMenu-3RUmXOvU.js";
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
	xl: "h-8 w-8 rounded-lg"
}, h = {
	sm: 12,
	md: 14,
	lg: 16,
	xl: 20
};
function g(e) {
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
function _({ size: e }) {
	return /* @__PURE__ */ u("svg", {
		...g(e),
		children: [/* @__PURE__ */ l("path", { d: "M7 2.5c.4 2.6 1.6 3.8 4.2 4.2-2.6.4-3.8 1.6-4.2 4.2-.4-2.6-1.6-3.8-4.2-4.2C5.4 6.3 6.6 5.1 7 2.5Z" }), /* @__PURE__ */ l("path", { d: "M12.5 10.5c.2 1.2.8 1.8 2 2-1.2.2-1.8.8-2 2-.2-1.2-.8-1.8-2-2 1.2-.2 1.8-.8 2-2Z" })]
	});
}
function v({ size: e }) {
	return /* @__PURE__ */ u("svg", {
		...g(e),
		children: [/* @__PURE__ */ l("path", { d: "M6.5 2h3M7 2v4.2L3.4 12.3A1 1 0 0 0 4.3 14h7.4a1 1 0 0 0 .9-1.7L9 6.2V2" }), /* @__PURE__ */ l("path", { d: "M5.2 10.5h5.6" })]
	});
}
function y({ size: e }) {
	return /* @__PURE__ */ u("svg", {
		...g(e),
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
function b({ size: e }) {
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
function x({ kind: u, size: d = "md", variant: g = "tinted", label: x, className: S, "data-testid": C = "file-kind-mark" }) {
	let w = h[d], T = {
		page: /* @__PURE__ */ l(s, { size: w }),
		presentation: /* @__PURE__ */ l(b, { size: w }),
		recording: /* @__PURE__ */ l(n, { size: w }),
		transcript: /* @__PURE__ */ l(i, { size: w }),
		diagram: /* @__PURE__ */ l(r, { size: w }),
		folder: /* @__PURE__ */ l(c, { size: w }),
		agent: /* @__PURE__ */ l(_, { size: w }),
		experiment: /* @__PURE__ */ l(v, { size: w }),
		call: /* @__PURE__ */ l(t, { size: w }),
		conversation: /* @__PURE__ */ l(a, { size: w }),
		media: /* @__PURE__ */ l(y, { size: w }),
		workflow: /* @__PURE__ */ l(o, { size: w })
	}[u];
	return /* @__PURE__ */ l("span", {
		"data-testid": C,
		"data-kind": u,
		"data-variant": g,
		...x ? {
			role: "img",
			"aria-label": x
		} : { "aria-hidden": !0 },
		className: e("inline-grid shrink-0 place-items-center", m[d], g === "plain" ? p : f[u], S),
		children: T
	});
}
//#endregion
export { x as n, d as t };
