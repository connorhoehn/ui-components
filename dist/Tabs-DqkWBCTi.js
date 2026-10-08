import { t as e } from "./cn-D4QmbyEy.js";
import { t } from "./DropdownMenu-M27Ly7by.js";
import { useCallback as n, useId as r, useLayoutEffect as i, useMemo as a, useRef as o, useState as s } from "react";
import { jsx as c, jsxs as l } from "react/jsx-runtime";
//#region src/components/ui/IconButton.tsx
var u = {
	ghost: "bg-transparent text-text-primary hover:bg-surface-hover",
	primary: "bg-info text-white hover:bg-info",
	danger: "bg-danger text-white hover:bg-danger",
	outline: "bg-surface text-text-secondary border border-solid border-border hover:bg-surface-hover hover:text-text-primary"
}, d = {
	surface: u,
	code: {
		ghost: "bg-transparent text-code-subtle hover:bg-code-surface hover:text-code-text",
		primary: "bg-code-blue text-code-bg hover:bg-code-blue",
		danger: "bg-code-red text-code-bg hover:bg-code-red",
		outline: "bg-transparent text-code-subtle border border-solid border-code-border hover:bg-code-surface hover:text-code-text"
	}
}, f = {
	sm: "w-6 h-6 text-sm",
	md: "w-8 h-8 text-base",
	lg: "w-10 h-10 text-lg"
};
function p({ "aria-label": t, icon: n, children: r, disabled: i = !1, variant: a = "ghost", tone: o = "surface", size: s = "md", className: l, ...p }) {
	return /* @__PURE__ */ c("button", {
		type: "button",
		"aria-label": t,
		disabled: i,
		className: e("inline-flex items-center justify-center border-none rounded-md", "transition-colors duration-150 ease-in-out", (d[o] ?? u)[a], f[s], i && "opacity-50 cursor-not-allowed", !i && "cursor-pointer", l),
		...p,
		children: n ?? r
	});
}
//#endregion
//#region src/components/ui/Stack.tsx
var m = {
	none: "gap-0",
	xs: "gap-1.5",
	sm: "gap-2",
	md: "gap-3",
	lg: "gap-4",
	xl: "gap-6"
}, h = {
	start: "items-start",
	center: "items-center",
	end: "items-end",
	baseline: "items-baseline",
	stretch: "items-stretch"
}, g = {
	start: "justify-start",
	center: "justify-center",
	end: "justify-end",
	between: "justify-between"
};
function _(t, { gap: n = "md", align: r, justify: i, wrap: a }) {
	return e("flex", t === "col" ? "flex-col" : "flex-row", m[n], r ? h[r] : void 0, i ? g[i] : void 0, a ? "flex-wrap" : void 0);
}
function v({ children: t, gap: n, align: r, justify: i, wrap: a = !1, as: o = "div", className: s, ref: l, ...u }) {
	return /* @__PURE__ */ c(o, {
		ref: l,
		className: e(_("col", {
			gap: n,
			align: r,
			justify: i,
			wrap: a
		}), s),
		...u,
		children: t
	});
}
function y({ children: t, gap: n = "sm", align: r = "center", justify: i, wrap: a = !0, as: o = "div", className: s, ref: l, ...u }) {
	return /* @__PURE__ */ c(o, {
		ref: l,
		className: e(_("row", {
			gap: n,
			align: r,
			justify: i,
			wrap: a
		}), s),
		...u,
		children: t
	});
}
//#endregion
//#region src/components/shared/Tabs.tsx
var b = {
	sm: "px-2.5 py-1 text-xs",
	md: "px-3 py-1.5 text-sm"
};
function x(e, t) {
	switch (e) {
		case "underline": return t ? "relative inline-flex items-center gap-1 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-[var(--color-border)] after:content-['']" : "inline-flex items-center gap-1 border-b border-[var(--color-border)]";
		case "pill": return "inline-flex items-center gap-1";
		case "segmented": return "inline-flex items-center rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-inset,#f8fafc)] p-0.5 gap-0.5";
	}
}
function S(t, n, r, i = !1) {
	return t === "underline" ? e(i ? "relative rounded-none" : "-mb-px border-b-2 rounded-none", n ? e(!i && "border-[var(--color-primary)]", "text-[var(--color-text-primary)]") : e(!i && "border-transparent", "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"), r && "opacity-50 cursor-not-allowed hover:text-[var(--color-text-secondary)]") : t === "pill" ? e("rounded-full", n ? "bg-[var(--color-primary)] text-white" : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text-primary)]", r && "opacity-50 cursor-not-allowed hover:bg-transparent") : e("rounded-md", n ? "bg-surface shadow-sm text-[var(--color-text-primary)] border border-[var(--color-border)]" : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]", r && "opacity-50 cursor-not-allowed hover:bg-transparent");
}
function C({ items: u, value: d, onValueChange: f, variant: p = "underline", size: m = "md", badgeStyle: h = "chip", className: g, style: _, "aria-label": v, idPrefix: y, getItemTestId: C, stretch: w = !1, itemClassName: T, "data-testid": E, indicator: D = "border", indicatorWeight: O = 2, overflowBelow: k }) {
	let A = p === "underline" && D === "bar", j = o(null), [M, N] = s(!1);
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
	let P = M ? u.filter((e, t) => t === 0 || e.id === d) : u, F = M ? u.filter((e) => !P.includes(e)) : [], I = r(), L = y ?? I, R = o(/* @__PURE__ */ new Map()), z = a(() => u.filter((e) => !e.disabled).map((e) => e.id), [u]), B = n((e) => {
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
				e.preventDefault(), f(t);
				return;
			default: return;
		}
		if (r !== null) {
			e.preventDefault();
			let t = z[r];
			f(t), B(t);
		}
	}, [
		z,
		f,
		B
	]);
	return /* @__PURE__ */ l("div", {
		ref: j,
		role: "tablist",
		"aria-label": v,
		"data-testid": E,
		"data-folded": k ? M ? "true" : "false" : void 0,
		...A ? { "data-indicator": "bar" } : {},
		className: e(x(p, A), g),
		style: _,
		children: [P.map((t) => {
			let n = t.id === d;
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
				onClick: () => !t.disabled && f(t.id),
				onKeyDown: (e) => V(e, t.id),
				className: e("inline-flex items-center gap-1.5 font-medium transition-colors cursor-pointer", w && "flex-1 justify-center", b[m], S(p, n, !!t.disabled, A), T),
				children: [
					t.icon,
					/* @__PURE__ */ c("span", { children: t.label }),
					A && n && /* @__PURE__ */ c("span", {
						"aria-hidden": "true",
						"data-tab-indicator": "",
						className: e("pointer-events-none absolute inset-x-0 bottom-0 z-[1] bg-[var(--color-primary)]", O === 3 ? "h-[3px]" : "h-0.5")
					}),
					t.badge !== void 0 && t.badge !== null && /* @__PURE__ */ c("span", {
						className: h === "plain" ? "ml-2.5 inline-flex items-center text-[14px] font-medium tabular-nums text-[var(--color-text-tertiary)]" : e("ml-1 inline-flex items-center justify-center rounded-full px-1.5 min-w-[20px] text-[10px] font-semibold", n && p === "pill" ? "bg-white/20 text-white" : "bg-[var(--color-surface-hover)] text-[var(--color-text-secondary)]"),
						children: t.badge
					})
				]
			}, t.id);
		}), F.length > 0 && /* @__PURE__ */ c(t, {
			trigger: /* @__PURE__ */ l("span", {
				className: e("inline-flex items-center gap-1 font-medium", m === "sm" ? "text-xs" : "text-sm"),
				children: ["More", /* @__PURE__ */ c("span", {
					"aria-hidden": "true",
					className: "text-[10px] leading-none",
					children: "▾"
				})]
			}),
			triggerLabel: `More views: ${F.map((e) => typeof e.label == "string" ? e.label : e.id).join(", ")}`,
			triggerTestId: `${E ?? "tabs"}-more`,
			triggerClassName: e("border-0 bg-transparent", b[m], "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"),
			align: "end",
			"data-testid": `${E ?? "tabs"}-more-menu`,
			sections: [{ items: F.map((e) => ({
				label: typeof e.label == "string" ? e.label : e.id,
				...e.badge !== void 0 && e.badge !== null ? { trailing: e.badge } : {},
				...e.disabled ? { disabled: !0 } : {},
				onSelect: () => f(e.id),
				...e.testId ?? C?.(e) ? { "data-testid": e.testId ?? C?.(e) } : {}
			})) }]
		})]
	});
}
function w({ id: e, when: t, idPrefix: n, className: r, style: i, children: a }) {
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
export { p as a, v as i, C as n, y as r, w as t };
