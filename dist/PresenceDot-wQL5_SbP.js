import { t as e } from "./cn-DhjIN-s0.js";
import { t } from "./StatusDot-Bgx2zxgC.js";
import { jsx as n } from "react/jsx-runtime";
//#region src/components/ui/Stack.tsx
var r = {
	none: "gap-0",
	xs: "gap-1.5",
	sm: "gap-2",
	md: "gap-3",
	lg: "gap-4",
	xl: "gap-6"
}, i = {
	start: "items-start",
	center: "items-center",
	end: "items-end",
	baseline: "items-baseline",
	stretch: "items-stretch"
}, a = {
	start: "justify-start",
	center: "justify-center",
	end: "justify-end",
	between: "justify-between"
};
function o(t, { gap: n = "md", align: o, justify: s, wrap: c }) {
	return e("flex", t === "col" ? "flex-col" : "flex-row", r[n], o ? i[o] : void 0, s ? a[s] : void 0, c ? "flex-wrap" : void 0);
}
function s({ children: t, gap: r, align: i, justify: a, wrap: s = !1, as: c = "div", className: l, ref: u, ...d }) {
	return /* @__PURE__ */ n(c, {
		ref: u,
		className: e(o("col", {
			gap: r,
			align: i,
			justify: a,
			wrap: s
		}), l),
		...d,
		children: t
	});
}
function c({ children: t, gap: r = "sm", align: i = "center", justify: a, wrap: s = !0, as: c = "div", className: l, ref: u, ...d }) {
	return /* @__PURE__ */ n(c, {
		ref: u,
		className: e(o("row", {
			gap: r,
			align: i,
			justify: a,
			wrap: s
		}), l),
		...d,
		children: t
	});
}
//#endregion
//#region src/components/shared/PresenceDot.tsx
var l = {
	online: "var(--color-success, #22c55e)",
	away: "var(--color-state-pending, #f59e0b)",
	busy: "var(--color-state-error, #ef4444)",
	offline: "var(--color-text-tertiary, #94a3b8)",
	unknown: "var(--color-text-tertiary, #94a3b8)"
}, u = {
	online: "Online",
	away: "Away",
	busy: "Busy",
	offline: "Offline",
	unknown: "Unknown presence"
};
function d({ state: e, ariaLabel: r, label: i, pulse: a, size: o = "sm", className: s, style: c, title: d, "data-testid": f }) {
	let p = a ?? e === "online", m = r ?? u[e];
	return /* @__PURE__ */ n(t, {
		color: l[e],
		pulse: p,
		size: o,
		label: i,
		className: s,
		style: c,
		title: d,
		"data-testid": f ?? `presence-${e}`,
		"aria-label": m
	});
}
//#endregion
export { c as n, s as r, d as t };
