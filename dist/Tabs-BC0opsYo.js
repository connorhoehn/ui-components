import { t as e } from "./cn-D4QmbyEy.js";
import { t } from "./DropdownMenu-M27Ly7by.js";
import { useCallback as n, useId as r, useLayoutEffect as i, useMemo as a, useRef as o, useState as s } from "react";
import { jsx as c, jsxs as l } from "react/jsx-runtime";
//#region src/components/shared/Tabs.tsx
var u = {
	sm: "px-2.5 py-1 text-xs",
	md: "px-3 py-1.5 text-sm"
};
function d(e, t) {
	switch (e) {
		case "underline": return t ? "relative inline-flex items-center gap-1 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-[var(--color-border)] after:content-['']" : "inline-flex items-center gap-1 border-b border-[var(--color-border)]";
		case "pill": return "inline-flex items-center gap-1";
		case "segmented": return "inline-flex items-center rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-inset,#f8fafc)] p-0.5 gap-0.5";
	}
}
function f(t, n, r, i = !1) {
	return t === "underline" ? e(i ? "relative rounded-none" : "-mb-px border-b-2 rounded-none", n ? e(!i && "border-[var(--color-primary)]", "text-[var(--color-text-primary)]") : e(!i && "border-transparent", "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"), r && "opacity-50 cursor-not-allowed hover:text-[var(--color-text-secondary)]") : t === "pill" ? e("rounded-full", n ? "bg-[var(--color-primary)] text-white" : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text-primary)]", r && "opacity-50 cursor-not-allowed hover:bg-transparent") : e("rounded-md", n ? "bg-surface shadow-sm text-[var(--color-text-primary)] border border-[var(--color-border)]" : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]", r && "opacity-50 cursor-not-allowed hover:bg-transparent");
}
function p({ items: p, value: m, onValueChange: h, variant: g = "underline", size: _ = "md", badgeStyle: v = "chip", className: y, style: b, "aria-label": x, idPrefix: S, getItemTestId: C, stretch: w = !1, itemClassName: T, "data-testid": E, indicator: D = "border", indicatorWeight: O = 2, overflowBelow: k }) {
	let A = g === "underline" && D === "bar", j = o(null), [M, N] = s(!1);
	i(() => {
		let e = j.current?.parentElement;
		if (!k || !e) {
			N(!1);
			return;
		}
		let t = () => {
			let t = e.getBoundingClientRect().width;
			t > 0 && N(t < k);
		};
		if (t(), typeof ResizeObserver > "u") return;
		let n = new ResizeObserver(t);
		return n.observe(e), () => n.disconnect();
	}, [k]);
	let P = M ? p.filter((e, t) => t === 0 || e.id === m) : p, F = M ? p.filter((e) => !P.includes(e)) : [], I = r(), L = S ?? I, R = o(/* @__PURE__ */ new Map()), z = a(() => p.filter((e) => !e.disabled).map((e) => e.id), [p]), B = n((e) => {
		R.current.get(e)?.focus();
	}, []), V = n((e, t) => {
		if (z.length === 0) return;
		let n = z.indexOf(t), r = null;
		switch (e.key) {
			case "ArrowRight":
			case "ArrowDown":
				r = n === -1 ? 0 : (n + 1) % z.length;
				break;
			case "ArrowLeft":
			case "ArrowUp":
				r = n === -1 ? z.length - 1 : (n - 1 + z.length) % z.length;
				break;
			case "Home":
				r = 0;
				break;
			case "End":
				r = z.length - 1;
				break;
			case "Enter":
			case " ":
				e.preventDefault(), h(t);
				return;
			default: return;
		}
		if (r !== null) {
			e.preventDefault();
			let t = z[r];
			h(t), B(t);
		}
	}, [
		z,
		h,
		B
	]);
	return /* @__PURE__ */ l("div", {
		ref: j,
		role: "tablist",
		"aria-label": x,
		"data-testid": E,
		"data-folded": k ? M ? "true" : "false" : void 0,
		...A ? { "data-indicator": "bar" } : {},
		className: e(d(g, A), y),
		style: b,
		children: [P.map((t) => {
			let n = t.id === m;
			return /* @__PURE__ */ l("button", {
				ref: (e) => {
					e ? R.current.set(t.id, e) : R.current.delete(t.id);
				},
				type: "button",
				role: "tab",
				id: `${L}-tab-${t.id}`,
				"aria-controls": `${L}-panel-${t.id}`,
				"data-testid": t.testId ?? C?.(t),
				"aria-selected": n,
				"aria-disabled": t.disabled || void 0,
				tabIndex: n ? 0 : -1,
				disabled: t.disabled,
				onClick: () => !t.disabled && h(t.id),
				onKeyDown: (e) => V(e, t.id),
				className: e("inline-flex items-center gap-1.5 font-medium transition-colors cursor-pointer", w && "flex-1 justify-center", u[_], f(g, n, !!t.disabled, A), T),
				children: [
					t.icon,
					/* @__PURE__ */ c("span", { children: t.label }),
					A && n && /* @__PURE__ */ c("span", {
						"aria-hidden": "true",
						"data-tab-indicator": "",
						className: e("pointer-events-none absolute inset-x-0 bottom-0 z-[1] bg-[var(--color-primary)]", O === 3 ? "h-[3px]" : "h-0.5")
					}),
					t.badge !== void 0 && t.badge !== null && /* @__PURE__ */ c("span", {
						className: v === "plain" ? "ml-2.5 inline-flex items-center text-[14px] font-medium tabular-nums text-[var(--color-text-tertiary)]" : e("ml-1 inline-flex items-center justify-center rounded-full px-1.5 min-w-[20px] text-[10px] font-semibold", n && g === "pill" ? "bg-white/20 text-white" : "bg-[var(--color-surface-hover)] text-[var(--color-text-secondary)]"),
						children: t.badge
					})
				]
			}, t.id);
		}), F.length > 0 && /* @__PURE__ */ c(t, {
			trigger: /* @__PURE__ */ l("span", {
				className: e("inline-flex items-center gap-1 font-medium", _ === "sm" ? "text-xs" : "text-sm"),
				children: ["More", /* @__PURE__ */ c("span", {
					"aria-hidden": "true",
					className: "text-[10px] leading-none",
					children: "▾"
				})]
			}),
			triggerLabel: `More views: ${F.map((e) => typeof e.label == "string" ? e.label : e.id).join(", ")}`,
			triggerTestId: `${E ?? "tabs"}-more`,
			triggerClassName: e("border-0 bg-transparent", u[_], "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"),
			align: "end",
			"data-testid": `${E ?? "tabs"}-more-menu`,
			sections: [{ items: F.map((e) => ({
				label: typeof e.label == "string" ? e.label : e.id,
				...e.badge !== void 0 && e.badge !== null ? { trailing: e.badge } : {},
				...e.disabled ? { disabled: !0 } : {},
				onSelect: () => h(e.id),
				...e.testId ?? C?.(e) ? { "data-testid": e.testId ?? C?.(e) } : {}
			})) }]
		})]
	});
}
function m({ id: e, when: t, idPrefix: n, className: r, style: i, children: a }) {
	return e === t ? /* @__PURE__ */ c("div", {
		role: "tabpanel",
		id: n ? `${n}-panel-${e}` : void 0,
		"data-testid": n ? `${n}-panel-${e}` : void 0,
		"aria-labelledby": n ? `${n}-tab-${e}` : void 0,
		tabIndex: 0,
		className: r,
		style: i,
		children: a
	}) : null;
}
//#endregion
export { p as n, m as t };
