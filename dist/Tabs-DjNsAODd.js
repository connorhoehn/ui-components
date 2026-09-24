import { t as e } from "./cn-DhjIN-s0.js";
import { useCallback as t, useId as n, useMemo as r, useRef as i } from "react";
import { jsx as a, jsxs as o } from "react/jsx-runtime";
//#region src/components/shared/Tabs.tsx
var s = {
	sm: "px-2.5 py-1 text-xs",
	md: "px-3 py-1.5 text-sm"
};
function c(e) {
	switch (e) {
		case "underline": return "inline-flex items-center gap-1 border-b border-[var(--color-border)]";
		case "pill": return "inline-flex items-center gap-1";
		case "segmented": return "inline-flex items-center rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-inset,#f8fafc)] p-0.5 gap-0.5";
	}
}
function l(t, n, r) {
	return t === "underline" ? e("-mb-px border-b-2 rounded-none", n ? "border-[var(--color-primary)] text-[var(--color-text-primary)]" : "border-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]", r && "opacity-50 cursor-not-allowed hover:text-[var(--color-text-secondary)]") : t === "pill" ? e("rounded-full", n ? "bg-[var(--color-primary)] text-white" : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text-primary)]", r && "opacity-50 cursor-not-allowed hover:bg-transparent") : e("rounded-md", n ? "bg-surface shadow-sm text-[var(--color-text-primary)] border border-[var(--color-border)]" : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]", r && "opacity-50 cursor-not-allowed hover:bg-transparent");
}
function u({ items: u, value: d, onValueChange: f, variant: p = "underline", size: m = "md", badgeStyle: h = "chip", className: g, style: _, "aria-label": v, idPrefix: y, getItemTestId: b, stretch: x = !1, itemClassName: S, "data-testid": C }) {
	let w = n(), T = y ?? w, E = i(/* @__PURE__ */ new Map()), D = r(() => u.filter((e) => !e.disabled).map((e) => e.id), [u]), O = t((e) => {
		E.current.get(e)?.focus();
	}, []), k = t((e, t) => {
		if (D.length === 0) return;
		let n = D.indexOf(t), r = null;
		switch (e.key) {
			case "ArrowRight":
			case "ArrowDown":
				r = n === -1 ? 0 : (n + 1) % D.length;
				break;
			case "ArrowLeft":
			case "ArrowUp":
				r = n === -1 ? D.length - 1 : (n - 1 + D.length) % D.length;
				break;
			case "Home":
				r = 0;
				break;
			case "End":
				r = D.length - 1;
				break;
			case "Enter":
			case " ":
				e.preventDefault(), f(t);
				return;
			default: return;
		}
		if (r !== null) {
			e.preventDefault();
			let t = D[r];
			f(t), O(t);
		}
	}, [
		D,
		f,
		O
	]);
	return /* @__PURE__ */ a("div", {
		role: "tablist",
		"aria-label": v,
		"data-testid": C,
		className: e(c(p), g),
		style: _,
		children: u.map((t) => {
			let n = t.id === d;
			return /* @__PURE__ */ o("button", {
				ref: (e) => {
					e ? E.current.set(t.id, e) : E.current.delete(t.id);
				},
				type: "button",
				role: "tab",
				id: `${T}-tab-${t.id}`,
				"aria-controls": `${T}-panel-${t.id}`,
				"data-testid": t.testId ?? b?.(t),
				"aria-selected": n,
				"aria-disabled": t.disabled || void 0,
				tabIndex: n ? 0 : -1,
				disabled: t.disabled,
				onClick: () => !t.disabled && f(t.id),
				onKeyDown: (e) => k(e, t.id),
				className: e("inline-flex items-center gap-1.5 font-medium transition-colors cursor-pointer", x && "flex-1 justify-center", s[m], l(p, n, !!t.disabled), S),
				children: [
					t.icon,
					/* @__PURE__ */ a("span", { children: t.label }),
					t.badge !== void 0 && t.badge !== null && /* @__PURE__ */ a("span", {
						className: h === "plain" ? "ml-2.5 inline-flex items-center text-[14px] font-medium tabular-nums text-[var(--color-text-tertiary)]" : e("ml-1 inline-flex items-center justify-center rounded-full px-1.5 min-w-[20px] text-[10px] font-semibold", n && p === "pill" ? "bg-white/20 text-white" : "bg-[var(--color-surface-hover)] text-[var(--color-text-secondary)]"),
						children: t.badge
					})
				]
			}, t.id);
		})
	});
}
function d({ id: e, when: t, idPrefix: n, className: r, style: i, children: o }) {
	return e === t ? /* @__PURE__ */ a("div", {
		role: "tabpanel",
		id: n ? `${n}-panel-${e}` : void 0,
		"data-testid": n ? `${n}-panel-${e}` : void 0,
		"aria-labelledby": n ? `${n}-tab-${e}` : void 0,
		tabIndex: 0,
		className: r,
		style: i,
		children: o
	}) : null;
}
//#endregion
export { u as n, d as t };
