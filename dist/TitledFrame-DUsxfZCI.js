import { t as e } from "./cn-DhjIN-s0.js";
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
function a({ title: a, titleAction: o, active: s = !1, tone: c = "code", children: l, onActivate: u, className: d, bodyClassName: f, style: p, "data-testid": m }) {
	let h = i[c];
	return /* @__PURE__ */ r("div", {
		"data-testid": m,
		onMouseDown: u,
		style: p,
		className: e("relative flex flex-col min-h-0 rounded border transition-colors", h.frame, s ? h.active : h.idle, d),
		children: [/* @__PURE__ */ r("div", {
			className: "absolute -top-2 left-2 right-2 h-4 flex items-center gap-1 pointer-events-none",
			children: [/* @__PURE__ */ n("span", {
				className: e("px-1.5 text-[10px] font-mono leading-none truncate max-w-[60%]", h.frame, s ? h.titleActive : h.title),
				children: a
			}), o != null && /* @__PURE__ */ r(t, { children: [/* @__PURE__ */ n("span", { className: "flex-1" }), /* @__PURE__ */ n("span", {
				className: e("px-1 h-full flex items-center pointer-events-auto", h.frame),
				children: o
			})] })]
		}), /* @__PURE__ */ n("div", {
			className: e("flex-1 min-h-0 pt-2", f),
			children: l
		})]
	});
}
//#endregion
export { a as t };
