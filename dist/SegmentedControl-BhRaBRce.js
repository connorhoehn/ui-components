import { t as e } from "./cn-DhjIN-s0.js";
import { useRef as t } from "react";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
//#region src/components/shared/SegmentedControl.tsx
var i = {
	sm: "px-2.5 py-1 text-xs",
	md: "px-3 py-1.5 text-sm"
}, a = "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]", o = "bg-surface shadow-sm text-[var(--color-text-primary)] border border-[var(--color-border)]";
function s({ options: s, value: c, onChange: l, size: u = "md", "aria-label": d, "aria-labelledby": f, disabled: p = !1, fullWidth: m = !1, className: h, "data-testid": g }) {
	let _ = t(null), v = s.filter((e) => !p), y = s.findIndex((e) => e.value === c), b = (e) => {
		if (p || v.length === 0) return;
		let t = (((y < 0 ? 0 : y) + e) % s.length + s.length) % s.length;
		l(s[t].value), _.current?.querySelectorAll("[role=\"radio\"]")[t]?.focus();
	};
	return /* @__PURE__ */ n("div", {
		ref: _,
		role: "radiogroup",
		"aria-label": d,
		"aria-labelledby": f,
		"data-testid": g,
		className: e(m ? "flex w-full items-center" : "inline-flex items-center", "rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-inset,#f8fafc)] p-0.5 gap-0.5", h),
		children: s.map((t, n) => {
			let d = t.value === c;
			return /* @__PURE__ */ r("button", {
				type: "button",
				role: "radio",
				"aria-checked": d,
				tabIndex: d || y < 0 && n === 0 ? 0 : -1,
				onClick: () => l(t.value),
				onKeyDown: (e) => {
					let t = e.key === "ArrowLeft" || e.key === "ArrowUp", n = e.key === "ArrowRight" || e.key === "ArrowDown";
					if (!(!t && !n && e.key !== "Home" && e.key !== "End")) {
						if (e.preventDefault(), e.key === "Home") {
							l(s[0].value);
							return;
						}
						if (e.key === "End") {
							l(s[s.length - 1].value);
							return;
						}
						b(t ? -1 : 1);
					}
				},
				disabled: p,
				"data-testid": g ? `${g}-${t.value}` : void 0,
				className: e("inline-flex items-center justify-center gap-1.5 rounded-md font-medium transition-all cursor-pointer", m && "flex-1", p && "cursor-not-allowed opacity-60", i[u], d ? o : a),
				children: [t.icon, t.label]
			}, t.value);
		})
	});
}
//#endregion
export { s as t };
