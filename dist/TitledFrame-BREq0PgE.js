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
function a({ title: a, titleAction: o, titleText: s, active: c = !1, tone: l = "code", titleStyle: u = "mono", children: d, onActivate: f, className: p, bodyClassName: m, style: h, "data-testid": g }) {
	let _ = i[l];
	return /* @__PURE__ */ r("div", {
		"data-testid": g,
		onMouseDown: f,
		style: h,
		className: e("relative flex flex-col min-h-0 rounded border transition-colors", _.frame, c ? _.active : _.idle, p),
		children: [/* @__PURE__ */ r("div", {
			className: "absolute -top-2 left-2 right-2 h-4 flex items-center gap-1 pointer-events-none",
			children: [/* @__PURE__ */ n("span", {
				title: s ?? (typeof a == "string" ? a : void 0),
				"data-titled-frame-title": u,
				className: e("min-w-0 leading-none truncate", u === "label" ? "px-1 text-xs font-medium" : "px-1.5 text-[10px] font-mono", o == null ? "max-w-full" : "max-w-[60%]", _.frame, c ? _.titleActive : _.title),
				children: a
			}), o != null && /* @__PURE__ */ r(t, { children: [/* @__PURE__ */ n("span", { className: "min-w-0 flex-1" }), /* @__PURE__ */ n("span", {
				className: e("px-1 h-full flex shrink-0 items-center pointer-events-auto", _.frame),
				children: o
			})] })]
		}), /* @__PURE__ */ n("div", {
			className: e("flex-1 min-h-0 pt-2", m),
			children: d
		})]
	});
}
//#endregion
export { a as t };
