import { t as e } from "./cn-D4QmbyEy.js";
import { r as t } from "./Text-CW3uJm-G.js";
import { useRef as n } from "react";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
//#region src/components/shared/SegmentedControl.tsx
var a = {
	sm: "h-6 min-w-6 px-1 [&_svg]:size-3.5",
	md: "h-7 min-w-7 px-1.5 [&_svg]:size-4"
}, o = {
	sm: "px-2.5 py-1 text-xs",
	md: "px-3 py-1.5 text-sm"
}, s = "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]", c = "bg-surface shadow-sm text-[var(--color-text-primary)] border border-[var(--color-border)]", l = "bg-primary-bg text-primary border border-transparent";
function u({ options: u, value: d, onChange: f, size: p = "md", "aria-label": m, "aria-labelledby": h, disabled: g = !1, fullWidth: _ = !1, tone: v = "neutral", iconOnly: y = !1, className: b, "data-testid": x }) {
	let S = n(null), C = u.filter((e) => !g), w = u.findIndex((e) => e.value === d), T = (e) => {
		if (g || C.length === 0) return;
		let t = (((w < 0 ? 0 : w) + e) % u.length + u.length) % u.length;
		f(u[t].value), S.current?.querySelectorAll("[role=\"radio\"]")[t]?.focus();
	};
	return /* @__PURE__ */ r("div", {
		ref: S,
		role: "radiogroup",
		"aria-label": m,
		"aria-labelledby": h,
		"data-testid": x,
		className: e(_ ? "flex w-full items-center" : "inline-flex items-center", "rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-inset,#f8fafc)] p-0.5 gap-0.5", v === "accent" && "bg-surface p-[3px] gap-1", b),
		children: u.map((n, m) => {
			let h = n.value === d, b = y && n.icon != null, S = n.badge !== void 0 && n.badge !== null && n.badge !== !1, C = /* @__PURE__ */ i("button", {
				type: "button",
				role: "radio",
				"aria-checked": h,
				tabIndex: h || w < 0 && m === 0 ? 0 : -1,
				onClick: () => f(n.value),
				onKeyDown: (e) => {
					let t = e.key === "ArrowLeft" || e.key === "ArrowUp", n = e.key === "ArrowRight" || e.key === "ArrowDown";
					if (!(!t && !n && e.key !== "Home" && e.key !== "End")) {
						if (e.preventDefault(), e.key === "Home") {
							f(u[0].value);
							return;
						}
						if (e.key === "End") {
							f(u[u.length - 1].value);
							return;
						}
						T(t ? -1 : 1);
					}
				},
				disabled: g,
				"data-testid": n.testId ?? (x ? `${x}-${n.value}` : void 0),
				...b ? { "aria-label": S && (typeof n.badge == "string" || typeof n.badge == "number") ? `${n.label}, ${n.badge}` : n.label } : {},
				className: e("inline-flex items-center justify-center gap-1.5 rounded-md font-medium transition-all cursor-pointer", _ && "flex-1", g && "cursor-not-allowed opacity-60", b ? e("relative", a[p]) : o[p], h ? v === "accent" ? l : c : s, v === "accent" && "h-[30px] py-0 text-[15px]", v === "accent" && !h && "text-text-primary"),
				children: [
					n.icon,
					!b && n.label,
					S && (b ? /* @__PURE__ */ r("span", {
						"aria-hidden": "true",
						className: "absolute -right-0.5 -top-0.5 min-w-3.5 rounded-full bg-primary px-1 text-center text-[10px] font-semibold leading-3.5 text-on-primary",
						children: n.badge
					}) : /* @__PURE__ */ r("span", {
						className: "text-[var(--color-text-tertiary)] tabular-nums",
						children: n.badge
					}))
				]
			}, n.value);
			return b ? /* @__PURE__ */ r(t, {
				content: n.label,
				placement: "bottom",
				children: C
			}, n.value) : C;
		})
	});
}
//#endregion
export { u as t };
