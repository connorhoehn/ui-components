import { t as e } from "./cn-DhjIN-s0.js";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
//#region src/components/shared/SegmentedControl.tsx
var r = {
	sm: "px-2.5 py-1 text-xs",
	md: "px-3 py-1.5 text-sm"
}, i = "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]", a = "bg-surface shadow-sm text-[var(--color-text-primary)] border border-[var(--color-border)]";
function o({ options: o, value: s, onChange: c, size: l = "md", "aria-label": u, disabled: d = !1, fullWidth: f = !1, className: p, "data-testid": m }) {
	return /* @__PURE__ */ t("div", {
		role: "group",
		"aria-label": u,
		"data-testid": m,
		className: e(f ? "flex w-full items-center" : "inline-flex items-center", "rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-inset,#f8fafc)] p-0.5 gap-0.5", p),
		children: o.map((t) => {
			let o = t.value === s;
			return /* @__PURE__ */ n("button", {
				type: "button",
				onClick: () => c(t.value),
				"aria-pressed": o,
				disabled: d,
				"data-testid": m ? `${m}-${t.value}` : void 0,
				className: e("inline-flex items-center justify-center gap-1.5 rounded-md font-medium transition-all cursor-pointer", f && "flex-1", d && "cursor-not-allowed opacity-60", r[l], o ? a : i),
				children: [t.icon, t.label]
			}, t.value);
		})
	});
}
//#endregion
export { o as t };
