import { t as e } from "./cn-DhjIN-s0.js";
import { Fragment as t, jsx as n, jsxs as r } from "react/jsx-runtime";
//#region src/components/shared/TitledFrame.tsx
var i = {
	code: {
		frame: "bg-code-bg",
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
			className: "absolute -top-2 left-2 right-2 flex items-center gap-1 pointer-events-none",
			children: [/* @__PURE__ */ n("span", {
				className: e("px-1.5 text-[10px] font-mono leading-none truncate max-w-[60%]", h.frame, s ? h.titleActive : h.title),
				children: a
			}), o != null && /* @__PURE__ */ r(t, { children: [/* @__PURE__ */ n("span", { className: "flex-1" }), /* @__PURE__ */ n("span", {
				className: e("px-1 pointer-events-auto", h.frame),
				children: o
			})] })]
		}), /* @__PURE__ */ n("div", {
			className: e("flex-1 min-h-0 pt-2", f),
			children: l
		})]
	});
}
//#endregion
//#region src/components/shared/DotMeter.tsx
var o = {
	code: {
		label: "text-code-muted",
		filled: "bg-code-blue",
		warn: "bg-code-peach",
		empty: "bg-code-raised",
		value: "text-code-subtle",
		note: "text-code-muted"
	},
	surface: {
		label: "text-text-tertiary",
		filled: "bg-primary",
		warn: "bg-warning",
		empty: "bg-border",
		value: "text-text-secondary",
		note: "text-text-tertiary"
	}
};
function s({ label: t, value: i, segments: a = 10, showPercent: s = !0, note: c, warnAbove: l = .85, tone: u = "code", className: d, "data-testid": f }) {
	let p = o[u], m = Number.isFinite(i) ? Math.min(1, Math.max(0, i)) : 0, h = Math.round(m * 100), g = m >= 1 ? a : Math.min(a - 1, Math.round(m * a)), _ = m > l;
	return /* @__PURE__ */ r("div", {
		"data-testid": f,
		className: e("flex items-center gap-2 text-[10px] font-mono leading-none", d),
		role: "meter",
		"aria-valuenow": h,
		"aria-valuemin": 0,
		"aria-valuemax": 100,
		"aria-label": t ? `${t}: ${h}%${c ? `, ${c}` : ""}` : void 0,
		children: [
			t != null && /* @__PURE__ */ n("span", {
				className: e("w-14 shrink-0 truncate", p.label),
				children: t
			}),
			/* @__PURE__ */ n("span", {
				"aria-hidden": "true",
				className: "flex items-center gap-[3px] shrink-0",
				children: Array.from({ length: a }, (t, r) => /* @__PURE__ */ n("span", { className: e("w-[5px] h-[5px] rounded-full", r < g ? _ ? p.warn : p.filled : p.empty) }, r))
			}),
			s && /* @__PURE__ */ r("span", {
				className: e("w-8 shrink-0 tabular-nums", p.value),
				children: [h, "%"]
			}),
			c != null && /* @__PURE__ */ n("span", {
				className: e("truncate", p.note),
				children: c
			})
		]
	});
}
//#endregion
export { a as n, s as t };
