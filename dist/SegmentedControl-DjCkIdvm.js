import { t as e } from "./cn-DhjIN-s0.js";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
//#region src/components/shared/SegmentedControl.tsx
var r = {
	sm: "px-2.5 py-1 text-xs",
	md: "px-3 py-1.5 text-sm"
}, i = "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]", a = "bg-surface shadow-sm text-[var(--color-text-primary)] border border-[var(--color-border)]";
function o({ options: o, value: s, onChange: c, size: l = "md", "aria-label": u, "aria-labelledby": d, disabled: f = !1, fullWidth: p = !1, className: m, "data-testid": h }) {
	return /* @__PURE__ */ t("div", {
		role: "group",
		"aria-label": u,
		"aria-labelledby": d,
		"data-testid": h,
		className: e(p ? "flex w-full items-center" : "inline-flex items-center", "rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-inset,#f8fafc)] p-0.5 gap-0.5", m),
		children: o.map((t) => {
			let o = t.value === s;
			return /* @__PURE__ */ n("button", {
				type: "button",
				onClick: () => c(t.value),
				"aria-pressed": o,
				disabled: f,
				"data-testid": h ? `${h}-${t.value}` : void 0,
				className: e("inline-flex items-center justify-center gap-1.5 rounded-md font-medium transition-all cursor-pointer", p && "flex-1", f && "cursor-not-allowed opacity-60", r[l], o ? a : i),
				children: [t.icon, t.label]
			}, t.value);
		})
	});
}
//#endregion
export { o as t };
