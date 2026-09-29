import { t as e } from "./cn-D4QmbyEy.js";
import { useCallback as t, useId as n, useMemo as r, useRef as i } from "react";
import { jsx as a, jsxs as o } from "react/jsx-runtime";
//#region src/components/shared/Tabs.tsx
var s = {
	sm: "px-2.5 py-1 text-xs",
	md: "px-3 py-1.5 text-sm"
};
function c(e, t) {
	switch (e) {
		case "underline": return t ? "relative inline-flex items-center gap-1 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-[var(--color-border)] after:content-['']" : "inline-flex items-center gap-1 border-b border-[var(--color-border)]";
		case "pill": return "inline-flex items-center gap-1";
		case "segmented": return "inline-flex items-center rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-inset,#f8fafc)] p-0.5 gap-0.5";
	}
}
function l(t, n, r, i = !1) {
	return t === "underline" ? e(i ? "relative rounded-none" : "-mb-px border-b-2 rounded-none", n ? e(!i && "border-[var(--color-primary)]", "text-[var(--color-text-primary)]") : e(!i && "border-transparent", "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"), r && "opacity-50 cursor-not-allowed hover:text-[var(--color-text-secondary)]") : t === "pill" ? e("rounded-full", n ? "bg-[var(--color-primary)] text-white" : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text-primary)]", r && "opacity-50 cursor-not-allowed hover:bg-transparent") : e("rounded-md", n ? "bg-surface shadow-sm text-[var(--color-text-primary)] border border-[var(--color-border)]" : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]", r && "opacity-50 cursor-not-allowed hover:bg-transparent");
}
function u({ items: u, value: d, onValueChange: f, variant: p = "underline", size: m = "md", badgeStyle: h = "chip", className: g, style: _, "aria-label": v, idPrefix: y, getItemTestId: b, stretch: x = !1, itemClassName: S, "data-testid": C, indicator: w = "border", indicatorWeight: T = 2 }) {
	let E = p === "underline" && w === "bar", D = n(), O = y ?? D, k = i(/* @__PURE__ */ new Map()), A = r(() => u.filter((e) => !e.disabled).map((e) => e.id), [u]), j = t((e) => {
		k.current.get(e)?.focus();
	}, []), M = t((e, t) => {
		if (A.length === 0) return;
		let n = A.indexOf(t), r = null;
		switch (e.key) {
			case "ArrowRight":
			case "ArrowDown":
				r = n === -1 ? 0 : (n + 1) % A.length;
				break;
			case "ArrowLeft":
			case "ArrowUp":
				r = n === -1 ? A.length - 1 : (n - 1 + A.length) % A.length;
				break;
			case "Home":
				r = 0;
				break;
			case "End":
				r = A.length - 1;
				break;
			case "Enter":
			case " ":
				e.preventDefault(), f(t);
				return;
			default: return;
		}
		if (r !== null) {
			e.preventDefault();
			let t = A[r];
			f(t), j(t);
		}
	}, [
		A,
		f,
		j
	]);
	return /* @__PURE__ */ a("div", {
		role: "tablist",
		"aria-label": v,
		"data-testid": C,
		...E ? { "data-indicator": "bar" } : {},
		className: e(c(p, E), g),
		style: _,
		children: u.map((t) => {
			let n = t.id === d;
			return /* @__PURE__ */ o("button", {
				ref: (e) => {
					e ? k.current.set(t.id, e) : k.current.delete(t.id);
				},
				type: "button",
				role: "tab",
				id: `${O}-tab-${t.id}`,
				"aria-controls": `${O}-panel-${t.id}`,
				"data-testid": t.testId ?? b?.(t),
				"aria-selected": n,
				"aria-disabled": t.disabled || void 0,
				tabIndex: n ? 0 : -1,
				disabled: t.disabled,
				onClick: () => !t.disabled && f(t.id),
				onKeyDown: (e) => M(e, t.id),
				className: e("inline-flex items-center gap-1.5 font-medium transition-colors cursor-pointer", x && "flex-1 justify-center", s[m], l(p, n, !!t.disabled, E), S),
				children: [
					t.icon,
					/* @__PURE__ */ a("span", { children: t.label }),
					E && n && /* @__PURE__ */ a("span", {
						"aria-hidden": "true",
						"data-tab-indicator": "",
						className: e("pointer-events-none absolute inset-x-0 bottom-0 z-[1] bg-[var(--color-primary)]", T === 3 ? "h-[3px]" : "h-0.5")
					}),
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
