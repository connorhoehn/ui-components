import { t as e } from "./cn-DhjIN-s0.js";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
//#region src/components/shared/ScoreBarGauge.tsx
var r = {
	success: "bg-state-completed",
	warning: "bg-state-awaiting",
	danger: "bg-state-failed",
	info: "bg-state-running",
	neutral: "bg-state-idle"
}, i = {
	sm: "h-1.5",
	md: "h-2",
	lg: "h-3"
};
function a({ value: a, threshold: s = .5, tone: c, size: l = "md", showLabel: u = !0, formatLabel: d, ariaLabel: f, className: p }) {
	let m = Number.isFinite(a) ? Math.max(0, Math.min(1, a)) : 0, h = c ?? (m >= s ? "success" : "danger"), g = (d ?? o)(m);
	return /* @__PURE__ */ n("div", {
		role: "meter",
		"aria-valuenow": m,
		"aria-valuemin": 0,
		"aria-valuemax": 1,
		"aria-label": f ?? `Score ${g} (threshold ${o(s)})`,
		className: e("flex w-full items-center gap-2", p),
		children: [/* @__PURE__ */ t("div", {
			className: e("relative flex-1 overflow-hidden rounded-full bg-surface-panel", i[l]),
			children: /* @__PURE__ */ t("div", {
				className: e("absolute inset-y-0 left-0 rounded-full transition-[width]", r[h]),
				style: { width: `${m * 100}%` }
			})
		}), u ? /* @__PURE__ */ t("span", {
			className: "min-w-[2.5rem] shrink-0 text-right font-mono text-[11px] text-text-secondary",
			children: g
		}) : null]
	});
}
function o(e) {
	return `${Math.round(e * 100)}%`;
}
//#endregion
//#region src/components/shared/FilterChip.tsx
var s = {
	md: "px-3 py-1 text-[12.5px]",
	sm: "px-2.5 py-0.5 text-[11px]",
	xs: "px-2 py-px text-[10px]"
}, c = "bg-[var(--color-surface)] border-[var(--color-border)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] hover:border-[var(--color-border-emphasis)]", l = "bg-[var(--color-primary)] border-[var(--color-primary)] text-white hover:opacity-90", u = "border-[var(--color-border-emphasis)] text-[var(--color-text-primary)]";
function d({ active: r, onClick: i, color: a, dot: o = !1, size: d = "sm", children: f, className: p, disabled: m = !1, "data-testid": h, "aria-label": g, title: _ }) {
	let v = r && !!a, y = v ? {
		background: `${a}22`,
		borderColor: `${a}66`,
		color: a
	} : void 0;
	return /* @__PURE__ */ n("button", {
		type: "button",
		onClick: i,
		disabled: m,
		"aria-pressed": r,
		"data-testid": h,
		"aria-label": g,
		title: _,
		className: e("inline-flex items-center gap-1.5 rounded-full font-semibold border transition-colors cursor-pointer select-none", s[d], r ? v ? u : l : c, m && "opacity-50 cursor-not-allowed", p),
		style: y,
		children: [o && /* @__PURE__ */ t("span", {
			className: "w-1.5 h-1.5 rounded-full flex-shrink-0",
			style: { background: a || "currentColor" }
		}), f]
	});
}
//#endregion
export { a as n, d as t };
