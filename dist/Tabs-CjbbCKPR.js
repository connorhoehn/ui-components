import { d as e } from "./Button-DQoeE5dN.js";
import { t } from "./DropdownMenu-CFI8rxXZ.js";
import { useCallback as n, useId as r, useLayoutEffect as i, useMemo as a, useRef as o, useState as s } from "react";
import { jsx as c, jsxs as l } from "react/jsx-runtime";
//#region src/components/shared/ContainerDensity.ts
var u = {
	pane: 600,
	header: 640
};
function d(e, t) {
	return !t || e == null || !(e > 0) ? "comfortable" : e < t ? "compact" : "comfortable";
}
function f(e = {}) {
	let { compactBelow: t = null, of: r = "self", axis: i = "width", box: a = "content", enabled: c = !0, forward: l } = e, [u, f] = s(null), p = o(null);
	return {
		ref: n((e) => {
			typeof l == "function" ? l(e) : l && (l.current = e), p.current?.disconnect(), p.current = null;
			let t = e && r === "parent" ? e.parentElement : e;
			if (!t || !c) return;
			let n = (e) => i === "height" ? e.height : e.width;
			if (a === "border") {
				let e = () => {
					let e = n(t.getBoundingClientRect());
					e > 0 && f(e);
				};
				if (e(), typeof ResizeObserver > "u") return;
				let r = new ResizeObserver(e);
				r.observe(t), p.current = r;
				return;
			}
			if (typeof ResizeObserver > "u") return;
			let o = new ResizeObserver((e) => {
				let t = e[0]?.contentRect;
				t && f(n(t));
			});
			o.observe(t), p.current = o;
		}, [
			l,
			r,
			i,
			a,
			c
		]),
		size: u,
		density: d(u, t)
	};
}
//#endregion
//#region src/components/shared/Tabs.tsx
var p = {
	sm: "px-2.5 py-1 text-xs",
	md: "px-3 py-1.5 text-sm"
};
function m(e, t) {
	switch (e) {
		case "underline": return t ? "relative inline-flex items-center gap-1 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-[var(--color-border)] after:content-['']" : "inline-flex items-center gap-1 border-b border-[var(--color-border)]";
		case "pill": return "inline-flex items-center gap-1";
		case "segmented": return "inline-flex items-center rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-inset,#f8fafc)] p-1 gap-1";
	}
}
function h(t, n, r, i = !1) {
	return t === "underline" ? e(i ? "relative rounded-none" : "-mb-px border-b-2 rounded-none", n ? e(!i && "border-[var(--color-primary)]", "text-[var(--color-text-primary)]") : e(!i && "border-transparent", "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"), r && "opacity-50 cursor-not-allowed hover:text-[var(--color-text-secondary)]") : t === "pill" ? e("rounded-full", n ? "bg-[var(--color-primary)] text-white" : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text-primary)]", r && "opacity-50 cursor-not-allowed hover:bg-transparent") : e("rounded-md border border-transparent", n ? "bg-surface shadow-sm text-[var(--color-text-primary)] border border-[var(--color-border)]" : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]", r && "opacity-50 cursor-not-allowed hover:bg-transparent");
}
function g({ items: s, value: u, onValueChange: d, variant: g = "underline", size: _ = "md", badgeStyle: v = "chip", className: y, style: b, "aria-label": x, idPrefix: S, getItemTestId: C, stretch: w = !1, itemClassName: T, "data-testid": E, indicator: D = "border", indicatorWeight: O = 2, overflowBelow: k }) {
	let A = g === "underline" && D === "bar", j = f({
		compactBelow: k ?? null,
		of: "parent",
		box: "border",
		enabled: !!k
	}), M = !!k && j.density === "compact", N = M ? s.filter((e, t) => t === 0 || e.id === u) : s, P = M ? s.filter((e) => !N.includes(e)) : [], F = r(), I = S ?? F, L = o(/* @__PURE__ */ new Map()), R = o(null), z = a(() => s.filter((e) => !e.disabled).map((e) => e.id), [s]), B = n((e) => {
		L.current.get(e)?.focus();
	}, []);
	i(() => {
		let e = R.current;
		R.current = null, e?.id === u && (document.activeElement === e.origin || document.activeElement === document.body) && B(u);
	}, [
		u,
		M,
		B
	]), i(() => {
		let e = L.current.get(u), t = e?.parentElement;
		if (!e || !t || t.scrollWidth <= t.clientWidth) return;
		let n = e.getBoundingClientRect(), r = t.getBoundingClientRect(), i = n.left - r.left + t.scrollLeft, a = i + n.width;
		i < t.scrollLeft ? t.scrollLeft = i : a > t.scrollLeft + t.clientWidth && (t.scrollLeft = a - t.clientWidth);
	}, [u, M]);
	let V = n((e, t) => {
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
				e.preventDefault(), d(t);
				return;
			default: return;
		}
		if (r !== null) {
			e.preventDefault();
			let t = z[r];
			R.current = L.current.has(t) ? null : {
				id: t,
				origin: document.activeElement
			}, d(t), B(t);
		}
	}, [
		z,
		d,
		B
	]);
	return /* @__PURE__ */ l("div", {
		ref: j.ref,
		role: "tablist",
		"aria-label": x,
		"data-testid": E,
		"data-folded": k ? M ? "true" : "false" : void 0,
		"data-tabs-overflow": k ? "menu" : "scroll",
		"data-tabs-hidden": M ? P.length : void 0,
		"data-tabs-variant": g,
		...A ? { "data-indicator": "bar" } : {},
		className: e(m(g, A), "min-w-0 max-w-full overflow-x-auto overflow-y-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden", y),
		"data-tab-scroller": "",
		style: b,
		children: [N.map((t) => {
			let n = t.id === u;
			return /* @__PURE__ */ l("button", {
				"data-ui-part": "",
				ref: (e) => {
					e ? L.current.set(t.id, e) : L.current.delete(t.id);
				},
				type: "button",
				role: "tab",
				id: `${I}-tab-${t.id}`,
				"aria-controls": `${I}-panel-${t.id}`,
				"data-testid": t.testId ?? C?.(t),
				"aria-selected": n,
				"aria-disabled": t.disabled || void 0,
				tabIndex: n ? 0 : -1,
				disabled: t.disabled,
				onClick: () => !t.disabled && d(t.id),
				onKeyDown: (e) => V(e, t.id),
				className: e("inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap font-medium transition-colors cursor-pointer focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--color-primary)]", w && "flex-1 justify-center", p[_], h(g, n, !!t.disabled, A), T),
				children: [
					t.icon,
					/* @__PURE__ */ c("span", { children: t.label }),
					A && n && /* @__PURE__ */ c("span", {
						"aria-hidden": "true",
						"data-tab-indicator": "",
						className: e("pointer-events-none absolute inset-x-0 bottom-0 z-[1] bg-[var(--color-primary)]", O === 3 ? "h-[3px]" : "h-0.5")
					}),
					t.badge !== void 0 && t.badge !== null && /* @__PURE__ */ c("span", {
						"data-tab-badge": v,
						className: v === "plain" ? e("ml-2.5 inline-flex items-center text-[14px] font-medium tabular-nums text-[var(--color-text-tertiary)]", _ === "sm" ? "leading-4" : "leading-5") : e("ml-1 inline-flex items-center justify-center rounded-full px-1.5 min-w-[20px] text-xs leading-4 font-semibold", n && g === "pill" ? "bg-white/20 text-white" : "bg-[var(--color-surface-hover)] text-[var(--color-text-secondary)]"),
						children: t.badge
					})
				]
			}, t.id);
		}), P.length > 0 && /* @__PURE__ */ c(t, {
			trigger: /* @__PURE__ */ l("span", {
				className: e("inline-flex items-center gap-1 font-medium", _ === "sm" ? "text-xs" : "text-sm"),
				children: ["More", /* @__PURE__ */ c("span", {
					"aria-hidden": "true",
					className: "text-xs leading-none",
					children: "▾"
				})]
			}),
			triggerLabel: `More views: ${P.map((e) => typeof e.label == "string" ? e.label : e.id).join(", ")}`,
			triggerTestId: `${E ?? "tabs"}-more`,
			triggerClassName: e("border-0 bg-transparent", p[_], "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"),
			align: "end",
			"data-testid": `${E ?? "tabs"}-more-menu`,
			sections: [{ items: P.map((e) => ({
				label: typeof e.label == "string" ? e.label : e.id,
				...e.badge !== void 0 && e.badge !== null ? { trailing: e.badge } : {},
				...e.disabled ? { disabled: !0 } : {},
				onSelect: () => d(e.id),
				...e.testId ?? C?.(e) ? { "data-testid": e.testId ?? C?.(e) } : {}
			})) }]
		})]
	});
}
function _({ id: e, when: t, idPrefix: n, className: r, style: i, children: a }) {
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
export { f as a, d as i, g as n, u as r, _ as t };
