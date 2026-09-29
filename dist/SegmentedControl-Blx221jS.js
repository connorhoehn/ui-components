import { t as e } from "./cn-D4QmbyEy.js";
import { useRef as t } from "react";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
//#region src/components/shared/SegmentedControl.tsx
var i = {
	sm: "px-2.5 py-1 text-xs",
	md: "px-3 py-1.5 text-sm"
}, a = "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]", o = "bg-surface shadow-sm text-[var(--color-text-primary)] border border-[var(--color-border)]", s = "bg-primary-bg text-primary border border-transparent";
function c({ options: c, value: l, onChange: u, size: d = "md", "aria-label": f, "aria-labelledby": p, disabled: m = !1, fullWidth: h = !1, tone: g = "neutral", className: _, "data-testid": v }) {
	let y = t(null), b = c.filter((e) => !m), x = c.findIndex((e) => e.value === l), S = (e) => {
		if (m || b.length === 0) return;
		let t = (((x < 0 ? 0 : x) + e) % c.length + c.length) % c.length;
		u(c[t].value), y.current?.querySelectorAll("[role=\"radio\"]")[t]?.focus();
	};
	return /* @__PURE__ */ n("div", {
		ref: y,
		role: "radiogroup",
		"aria-label": f,
		"aria-labelledby": p,
		"data-testid": v,
		className: e(h ? "flex w-full items-center" : "inline-flex items-center", "rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-inset,#f8fafc)] p-0.5 gap-0.5", g === "accent" && "bg-surface p-[3px] gap-1", _),
		children: c.map((t, n) => {
			let f = t.value === l;
			return /* @__PURE__ */ r("button", {
				type: "button",
				role: "radio",
				"aria-checked": f,
				tabIndex: f || x < 0 && n === 0 ? 0 : -1,
				onClick: () => u(t.value),
				onKeyDown: (e) => {
					let t = e.key === "ArrowLeft" || e.key === "ArrowUp", n = e.key === "ArrowRight" || e.key === "ArrowDown";
					if (!(!t && !n && e.key !== "Home" && e.key !== "End")) {
						if (e.preventDefault(), e.key === "Home") {
							u(c[0].value);
							return;
						}
						if (e.key === "End") {
							u(c[c.length - 1].value);
							return;
						}
						S(t ? -1 : 1);
					}
				},
				disabled: m,
				"data-testid": v ? `${v}-${t.value}` : void 0,
				className: e("inline-flex items-center justify-center gap-1.5 rounded-md font-medium transition-all cursor-pointer", h && "flex-1", m && "cursor-not-allowed opacity-60", i[d], f ? g === "accent" ? s : o : a, g === "accent" && "h-[30px] py-0 text-[15px]", g === "accent" && !f && "text-text-primary"),
				children: [t.icon, t.label]
			}, t.value);
		})
	});
}
//#endregion
export { c as t };
