import { t as e } from "./cn-D4QmbyEy.js";
import { l as t } from "./Button-uREUOWUk.js";
import { t as n } from "./Tooltip-DWyAb81m.js";
import { useRef as r } from "react";
import { jsx as i, jsxs as a } from "react/jsx-runtime";
//#region src/components/shared/SegmentedControl.tsx
var o = {
	sm: "h-6 min-w-6 px-1 [&_svg]:size-3.5",
	md: "h-7 min-w-7 px-1.5 [&_svg]:size-4"
}, s = {
	sm: "px-2.5 py-1 text-xs",
	md: "px-3 py-1.5 text-sm"
}, c = "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]", l = "bg-surface shadow-sm text-[var(--color-text-primary)] border border-[var(--color-border)]", u = "bg-primary-bg text-primary border border-transparent";
function d({ options: d, value: f, onChange: p, size: m, "aria-label": h, "aria-labelledby": g, disabled: _ = !1, fullWidth: v = !1, tone: y = "neutral", iconOnly: b = !1, className: x, "data-testid": S }) {
	let C = t("SegmentedControl", m, {
		comfortable: "md",
		compact: "sm"
	}), w = r(null), T = d.filter((e) => !_), E = d.findIndex((e) => e.value === f), D = (e) => {
		if (_ || T.length === 0) return;
		let t = (((E < 0 ? 0 : E) + e) % d.length + d.length) % d.length;
		p(d[t].value), w.current?.querySelectorAll("[role=\"radio\"]")[t]?.focus();
	};
	return /* @__PURE__ */ i("div", {
		ref: w,
		role: "radiogroup",
		"aria-label": h,
		"aria-labelledby": g,
		"data-testid": S,
		className: e(v ? "flex w-full items-center" : "inline-flex items-center", "rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-inset,#f8fafc)] p-0.5 gap-0.5", y === "accent" && "bg-surface p-[3px] gap-1", x),
		children: d.map((t, r) => {
			let m = t.value === f, h = b && t.icon != null, g = t.badge !== void 0 && t.badge !== null && t.badge !== !1, x = /* @__PURE__ */ a("button", {
				type: "button",
				role: "radio",
				"aria-checked": m,
				tabIndex: m || E < 0 && r === 0 ? 0 : -1,
				onClick: () => p(t.value),
				onKeyDown: (e) => {
					let t = e.key === "ArrowLeft" || e.key === "ArrowUp", n = e.key === "ArrowRight" || e.key === "ArrowDown";
					if (!(!t && !n && e.key !== "Home" && e.key !== "End")) {
						if (e.preventDefault(), e.key === "Home") {
							p(d[0].value);
							return;
						}
						if (e.key === "End") {
							p(d[d.length - 1].value);
							return;
						}
						D(t ? -1 : 1);
					}
				},
				disabled: _,
				"data-testid": t.testId ?? (S ? `${S}-${t.value}` : void 0),
				...h ? { "aria-label": g && (typeof t.badge == "string" || typeof t.badge == "number") ? `${t.label}, ${t.badge}` : t.label } : {},
				className: e("inline-flex items-center justify-center gap-1.5 rounded-md font-medium transition-all cursor-pointer", v && "flex-1", _ && "cursor-not-allowed opacity-60", h ? e("relative", o[C]) : s[C], m ? y === "accent" ? u : l : c, y === "accent" && "h-[30px] py-0 text-sm", y === "accent" && !m && "text-text-primary"),
				children: [
					t.icon,
					!h && t.label,
					g && (h ? /* @__PURE__ */ i("span", {
						"aria-hidden": "true",
						className: "absolute -right-0.5 -top-0.5 min-w-3.5 rounded-full bg-primary px-1 text-center text-[10px] font-semibold leading-3.5 text-on-primary",
						children: t.badge
					}) : /* @__PURE__ */ i("span", {
						className: "text-[var(--color-text-tertiary)] tabular-nums",
						children: t.badge
					}))
				]
			}, t.value);
			return h ? /* @__PURE__ */ i(n, {
				content: t.label,
				placement: "bottom",
				children: x
			}, t.value) : x;
		})
	});
}
//#endregion
export { d as t };
