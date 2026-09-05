import { t as e } from "./StatusDot-Bgx2zxgC.js";
import { jsx as t } from "react/jsx-runtime";
//#region src/components/shared/PresenceDot.tsx
var n = {
	online: "var(--color-success, #22c55e)",
	away: "var(--color-state-pending, #f59e0b)",
	busy: "var(--color-state-error, #ef4444)",
	offline: "var(--color-text-tertiary, #94a3b8)",
	unknown: "var(--color-text-tertiary, #94a3b8)"
}, r = {
	online: "Online",
	away: "Away",
	busy: "Busy",
	offline: "Offline",
	unknown: "Unknown presence"
};
function i({ state: i, ariaLabel: a, label: o, pulse: s, size: c = "sm", className: l, style: u, title: d, "data-testid": f }) {
	let p = s ?? i === "online", m = a ?? r[i];
	return /* @__PURE__ */ t(e, {
		color: n[i],
		pulse: p,
		size: c,
		label: o,
		className: l,
		style: u,
		title: d,
		"data-testid": f ?? `presence-${i}`,
		"aria-label": m
	});
}
//#endregion
export { i as t };
