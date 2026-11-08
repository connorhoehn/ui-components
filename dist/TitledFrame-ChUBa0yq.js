import { d as e } from "./Button-DQoeE5dN.js";
import { Fragment as t, jsx as n, jsxs as r } from "react/jsx-runtime";
//#region src/components/shared/TitledFrame.tsx
var i = {
	code: {
		frame: "bg-terminal-bg",
		idle: "border-code-border",
		active: "border-code-blue",
		title: "text-code-subtle",
		titleActive: "text-code-blue"
	},
	surface: {
		frame: "bg-surface",
		idle: "border-border",
		active: "border-primary",
		title: "text-text-tertiary",
		titleActive: "text-primary"
	}
};
function a({ title: a, titleAction: o, titleText: s, active: c = !1, tone: l = "code", children: u, onActivate: d, className: f, bodyClassName: p, style: m, "data-testid": h }) {
	let g = i[l];
	return /* @__PURE__ */ r("div", {
		"data-testid": h,
		onMouseDown: d,
		style: m,
		className: e("relative flex flex-col min-h-0 rounded border transition-colors", g.frame, c ? g.active : g.idle, f),
		children: [/* @__PURE__ */ r("div", {
			className: "absolute -top-2 left-2 right-2 h-4 flex items-center gap-1 pointer-events-none",
			children: [/* @__PURE__ */ n("span", {
				title: s ?? (typeof a == "string" ? a : void 0),
				"data-titled-frame-title": "",
				className: e("min-w-0 px-1.5 text-[10px] font-mono leading-none truncate", o == null ? "max-w-full" : "max-w-[60%]", g.frame, c ? g.titleActive : g.title),
				children: a
			}), o != null && /* @__PURE__ */ r(t, { children: [/* @__PURE__ */ n("span", { className: "min-w-0 flex-1" }), /* @__PURE__ */ n("span", {
				className: e("px-1 h-full flex shrink-0 items-center pointer-events-auto", g.frame),
				children: o
			})] })]
		}), /* @__PURE__ */ n("div", {
			className: e("flex-1 min-h-0 pt-2", p),
			children: u
		})]
	});
}
//#endregion
export { a as t };
