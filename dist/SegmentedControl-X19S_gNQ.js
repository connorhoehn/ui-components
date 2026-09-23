import { t as e } from "./cn-DhjIN-s0.js";
import { useRef as t } from "react";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
//#region src/components/shared/ErrorState.tsx
function i({ icon: t = "⚠️", title: i, body: a, description: o, actionLabel: s, onAction: c, action: l, testId: u = "error-state", actionTestId: d = "error-state-action" }) {
	let f = o ?? a;
	return /* @__PURE__ */ r("div", {
		role: "alert",
		"data-testid": u,
		className: e("flex flex-col items-center justify-center min-h-[220px]", "text-text-secondary gap-2 p-8 font-[inherit]"),
		children: [
			t && (typeof t == "string" ? /* @__PURE__ */ n("div", {
				className: "text-[52px] mb-2",
				"aria-hidden": !0,
				children: t
			}) : /* @__PURE__ */ n("div", {
				className: "mb-2",
				children: t
			})),
			/* @__PURE__ */ n("div", {
				className: "text-[17px] font-semibold text-[var(--color-state-error,#dc2626)]",
				children: i
			}),
			f && /* @__PURE__ */ n("div", {
				className: "text-[13px] text-center max-w-[340px] text-text-secondary leading-normal",
				children: f
			}),
			l ? /* @__PURE__ */ n("div", {
				className: "mt-2.5",
				children: l
			}) : s && c && /* @__PURE__ */ n("button", {
				"data-testid": d,
				onClick: c,
				type: "button",
				className: e("mt-2.5 px-[22px] py-[9px] text-sm font-semibold", "bg-surface text-text-primary border border-border rounded-lg cursor-pointer font-[inherit]", "hover:bg-surface-panel"),
				children: s
			})
		]
	});
}
//#endregion
//#region src/components/shared/SegmentedControl.tsx
var a = {
	sm: "px-2.5 py-1 text-xs",
	md: "px-3 py-1.5 text-sm"
}, o = "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]", s = "bg-surface shadow-sm text-[var(--color-text-primary)] border border-[var(--color-border)]";
function c({ options: i, value: c, onChange: l, size: u = "md", "aria-label": d, "aria-labelledby": f, disabled: p = !1, fullWidth: m = !1, className: h, "data-testid": g }) {
	let _ = t(null), v = i.filter((e) => !p), y = i.findIndex((e) => e.value === c), b = (e) => {
		if (p || v.length === 0) return;
		let t = (((y < 0 ? 0 : y) + e) % i.length + i.length) % i.length;
		l(i[t].value), _.current?.querySelectorAll("[role=\"radio\"]")[t]?.focus();
	};
	return /* @__PURE__ */ n("div", {
		ref: _,
		role: "radiogroup",
		"aria-label": d,
		"aria-labelledby": f,
		"data-testid": g,
		className: e(m ? "flex w-full items-center" : "inline-flex items-center", "rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-inset,#f8fafc)] p-0.5 gap-0.5", h),
		children: i.map((t, n) => {
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
							l(i[0].value);
							return;
						}
						if (e.key === "End") {
							l(i[i.length - 1].value);
							return;
						}
						b(t ? -1 : 1);
					}
				},
				disabled: p,
				"data-testid": g ? `${g}-${t.value}` : void 0,
				className: e("inline-flex items-center justify-center gap-1.5 rounded-md font-medium transition-all cursor-pointer", m && "flex-1", p && "cursor-not-allowed opacity-60", a[u], d ? s : o),
				children: [t.icon, t.label]
			}, t.value);
		})
	});
}
//#endregion
export { i as n, c as t };
