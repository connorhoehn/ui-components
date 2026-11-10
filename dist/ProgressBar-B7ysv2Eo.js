import { d as e } from "./Button-DQoeE5dN.js";
import { g as t, h as n, m as r } from "./safeHref-D1tj5kGa.js";
import { jsx as i, jsxs as a } from "react/jsx-runtime";
//#region src/components/shared/ProgressBar.tsx
var o = {
	sm: "h-1.5",
	md: "h-2"
};
function s({ value: s, max: c = 100, color: l, size: u = "md", completeTone: d, label: f, valueLabel: p, showRatio: m = !0, labelClassName: h, className: g, style: _, "data-testid": v, "aria-label": y }) {
	let b = c > 0 ? c : 100, x = Math.max(0, Math.min(s, b)), S = Math.min(100, x / b * 100), C = d !== void 0 && S >= 100 ? n(d) : null, w = C ? t(C) : l ?? "var(--color-primary)";
	return /* @__PURE__ */ a("div", {
		"data-testid": v,
		className: e("w-full", g),
		style: _,
		children: [f != null && /* @__PURE__ */ a("div", {
			className: e("flex items-center justify-between mb-1 text-[12px] text-[var(--color-text-secondary)]", h),
			children: [/* @__PURE__ */ i("span", { children: f }), /* @__PURE__ */ i("span", {
				className: e("tabular-nums", C ? r[C] : "text-[var(--color-text-tertiary)]"),
				children: p ?? (m ? `${x}/${b}` : `${Math.round(S)}%`)
			})]
		}), /* @__PURE__ */ i("div", {
			role: "progressbar",
			"aria-valuenow": x,
			"aria-valuemin": 0,
			"aria-valuemax": b,
			"aria-label": y,
			className: e("w-full rounded-full overflow-hidden bg-[var(--color-surface-hover)]", o[u]),
			children: /* @__PURE__ */ i("div", {
				className: "h-full rounded-full transition-all duration-300",
				style: {
					width: `${S}%`,
					background: w
				}
			})
		})]
	});
}
//#endregion
export { s as t };
