import { d as e, r as t } from "./Button-DQoeE5dN.js";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
//#region src/components/shared/ScoreBarGauge.tsx
var i = {
	success: "bg-state-completed",
	warning: "bg-state-awaiting",
	danger: "bg-state-failed",
	info: "bg-state-running",
	neutral: "bg-state-idle"
}, a = {
	sm: "h-1.5",
	md: "h-2",
	lg: "h-3"
};
function o({ value: t, threshold: o = .5, tone: c, size: l = "md", showLabel: u = !0, formatLabel: d, ariaLabel: f, className: p }) {
	let m = Number.isFinite(t) ? Math.max(0, Math.min(1, t)) : 0, h = c ?? (m >= o ? "success" : "danger"), g = (d ?? s)(m);
	return /* @__PURE__ */ r("div", {
		role: "meter",
		"aria-valuenow": m,
		"aria-valuemin": 0,
		"aria-valuemax": 1,
		"aria-label": f ?? `Score ${g} (threshold ${s(o)})`,
		className: e("flex w-full items-center gap-2", p),
		children: [/* @__PURE__ */ n("div", {
			className: e("relative flex-1 overflow-hidden rounded-full bg-surface-panel", a[l]),
			children: /* @__PURE__ */ n("div", {
				className: e("absolute inset-y-0 left-0 rounded-full transition-[width]", i[h]),
				style: { width: `${m * 100}%` }
			})
		}), u ? /* @__PURE__ */ n("span", {
			className: "min-w-[2.5rem] shrink-0 text-right font-mono text-[11px] text-text-secondary",
			children: g
		}) : null]
	});
}
function s(e) {
	return `${Math.round(e * 100)}%`;
}
//#endregion
//#region src/components/shared/FilterChip.tsx
var c = {
	md: `${t.md} px-3 text-sm`,
	sm: `${t.sm} px-2.5 text-xs`,
	xs: `${t.sm} px-2 text-xs`
}, l = "bg-[var(--color-surface)] border-[var(--color-border)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] hover:border-[var(--color-border-emphasis)]", u = "bg-[var(--color-primary)] border-[var(--color-primary)] text-on-primary hover:opacity-90", d = "border-[var(--color-border-emphasis)] text-[var(--color-text-primary)]";
function f({ active: t, onClick: i, color: a, dot: o = !1, size: s = "sm", children: f, className: p, disabled: m = !1, "data-testid": h, "aria-label": g, title: _ }) {
	let v = t && !!a, y = v ? {
		background: `${a}22`,
		borderColor: `${a}66`,
		color: a
	} : void 0;
	return /* @__PURE__ */ r("button", {
		"data-ui-part": "",
		type: "button",
		onClick: i,
		disabled: m,
		"aria-pressed": t,
		"data-testid": h,
		"aria-label": g,
		title: _,
		className: e("inline-flex items-center gap-1.5 rounded-full font-semibold border transition-colors cursor-pointer select-none", c[s], t ? v ? d : u : l, m && "opacity-50 cursor-not-allowed", p),
		style: y,
		children: [o && /* @__PURE__ */ n("span", {
			className: "w-1.5 h-1.5 rounded-full flex-shrink-0",
			style: { background: a || "currentColor" }
		}), f]
	});
}
//#endregion
export { o as n, f as t };
