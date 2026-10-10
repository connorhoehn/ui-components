import { t as e } from "./cn-D4QmbyEy.js";
import { t } from "./DropdownMenu-DR9iVi2Z.js";
import { useCallback as n, useId as r, useLayoutEffect as i, useMemo as a, useRef as o, useState as s } from "react";
import { jsx as c, jsxs as l } from "react/jsx-runtime";
//#region src/components/ui/IconButton.tsx
var u = {
	ghost: "bg-transparent text-text-secondary enabled:hover:bg-primary/10 enabled:hover:text-primary aria-pressed:bg-primary/12 aria-pressed:text-primary",
	primary: "bg-primary text-on-primary enabled:hover:bg-primary-hover",
	danger: "bg-danger text-white hover:bg-danger",
	outline: "bg-primary/5 text-text-secondary border border-solid border-primary/20 enabled:hover:bg-primary/12 enabled:hover:text-primary aria-pressed:bg-primary/12 aria-pressed:text-primary"
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
		"data-variant": a,
		"data-size": s,
		className: e("inline-flex items-center justify-center border-none rounded-md", "transition-colors duration-150 ease-in-out", o === "code" ? "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-code-blue" : "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary", (d[o] ?? u)[a], f[s], i && "opacity-50 cursor-not-allowed", !i && "cursor-pointer", l),
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
//#region src/components/shared/ContainerDensity.ts
var b = {
	pane: 600,
	header: 640
};
function x(e, t) {
	return !t || e == null || !(e > 0) ? "comfortable" : e < t ? "compact" : "comfortable";
}
function S(e = {}) {
	let { compactBelow: t = null, of: r = "self", axis: i = "width", box: a = "content", enabled: c = !0, forward: l } = e, [u, d] = s(null), f = o(null);
	return {
		ref: n((e) => {
			typeof l == "function" ? l(e) : l && (l.current = e), f.current?.disconnect(), f.current = null;
			let t = e && r === "parent" ? e.parentElement : e;
			if (!t || !c) return;
			let n = (e) => i === "height" ? e.height : e.width;
			if (a === "border") {
				let e = () => {
					let e = n(t.getBoundingClientRect());
					e > 0 && d(e);
				};
				if (e(), typeof ResizeObserver > "u") return;
				let r = new ResizeObserver(e);
				r.observe(t), f.current = r;
				return;
			}
			if (typeof ResizeObserver > "u") return;
			let o = new ResizeObserver((e) => {
				let t = e[0]?.contentRect;
				t && d(n(t));
			});
			o.observe(t), f.current = o;
		}, [
			l,
			r,
			i,
			a,
			c
		]),
		size: u,
		density: x(u, t)
	};
}
//#endregion
//#region src/components/shared/Tabs.tsx
var C = {
	sm: "px-2.5 py-1 text-xs",
	md: "px-3 py-1.5 text-sm"
};
function w(e, t) {
	switch (e) {
		case "underline": return t ? "relative inline-flex items-center gap-1 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-[var(--color-border)] after:content-['']" : "inline-flex items-center gap-1 border-b border-[var(--color-border)]";
		case "pill": return "inline-flex items-center gap-1";
		case "segmented": return "inline-flex items-center rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-inset,#f8fafc)] p-0.5 gap-0.5";
	}
}
function T(t, n, r, i = !1) {
	return t === "underline" ? e(i ? "relative rounded-none" : "-mb-px border-b-2 rounded-none", n ? e(!i && "border-[var(--color-primary)]", "text-[var(--color-text-primary)]") : e(!i && "border-transparent", "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"), r && "opacity-50 cursor-not-allowed hover:text-[var(--color-text-secondary)]") : t === "pill" ? e("rounded-full", n ? "bg-[var(--color-primary)] text-white" : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text-primary)]", r && "opacity-50 cursor-not-allowed hover:bg-transparent") : e("rounded-md", n ? "bg-surface shadow-sm text-[var(--color-text-primary)] border border-[var(--color-border)]" : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]", r && "opacity-50 cursor-not-allowed hover:bg-transparent");
}
function E({ items: s, value: u, onValueChange: d, variant: f = "underline", size: p = "md", badgeStyle: m = "chip", className: h, style: g, "aria-label": _, idPrefix: v, getItemTestId: y, stretch: b = !1, itemClassName: x, "data-testid": E, indicator: D = "border", indicatorWeight: O = 2, overflowBelow: k }) {
	let A = f === "underline" && D === "bar", j = S({
		compactBelow: k ?? null,
		of: "parent",
		box: "border",
		enabled: !!k
	}), M = !!k && j.density === "compact", N = M ? s.filter((e, t) => t === 0 || e.id === u) : s, P = M ? s.filter((e) => !N.includes(e)) : [], F = r(), I = v ?? F, L = o(/* @__PURE__ */ new Map()), R = o(null), z = a(() => s.filter((e) => !e.disabled).map((e) => e.id), [s]), B = n((e) => {
		L.current.get(e)?.focus();
	}, []);
	i(() => {
		let e = R.current;
		R.current = null, e?.id === u && (document.activeElement === e.origin || document.activeElement === document.body) && B(u);
	}, [
		u,
		M,
		B
	]);
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
		"aria-label": _,
		"data-testid": E,
		"data-folded": k ? M ? "true" : "false" : void 0,
		...A ? { "data-indicator": "bar" } : {},
		className: e(w(f, A), h),
		style: g,
		children: [N.map((t) => {
			let n = t.id === u;
			return /* @__PURE__ */ l("button", {
				ref: (e) => {
					e ? L.current.set(t.id, e) : L.current.delete(t.id);
				},
				type: "button",
				role: "tab",
				id: `${I}-tab-${t.id}`,
				"aria-controls": `${I}-panel-${t.id}`,
				"data-testid": t.testId ?? y?.(t),
				"aria-selected": n,
				"aria-disabled": t.disabled || void 0,
				tabIndex: n ? 0 : -1,
				disabled: t.disabled,
				onClick: () => !t.disabled && d(t.id),
				onKeyDown: (e) => V(e, t.id),
				className: e("inline-flex items-center gap-1.5 font-medium transition-colors cursor-pointer", b && "flex-1 justify-center", C[p], T(f, n, !!t.disabled, A), x),
				children: [
					t.icon,
					/* @__PURE__ */ c("span", { children: t.label }),
					A && n && /* @__PURE__ */ c("span", {
						"aria-hidden": "true",
						"data-tab-indicator": "",
						className: e("pointer-events-none absolute inset-x-0 bottom-0 z-[1] bg-[var(--color-primary)]", O === 3 ? "h-[3px]" : "h-0.5")
					}),
					t.badge !== void 0 && t.badge !== null && /* @__PURE__ */ c("span", {
						className: m === "plain" ? "ml-2.5 inline-flex items-center text-[14px] font-medium tabular-nums text-[var(--color-text-tertiary)]" : e("ml-1 inline-flex items-center justify-center rounded-full px-1.5 min-w-[20px] text-[10px] font-semibold", n && f === "pill" ? "bg-white/20 text-white" : "bg-[var(--color-surface-hover)] text-[var(--color-text-secondary)]"),
						children: t.badge
					})
				]
			}, t.id);
		}), P.length > 0 && /* @__PURE__ */ c(t, {
			trigger: /* @__PURE__ */ l("span", {
				className: e("inline-flex items-center gap-1 font-medium", p === "sm" ? "text-xs" : "text-sm"),
				children: ["More", /* @__PURE__ */ c("span", {
					"aria-hidden": "true",
					className: "text-[10px] leading-none",
					children: "▾"
				})]
			}),
			triggerLabel: `More views: ${P.map((e) => typeof e.label == "string" ? e.label : e.id).join(", ")}`,
			triggerTestId: `${E ?? "tabs"}-more`,
			triggerClassName: e("border-0 bg-transparent", C[p], "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"),
			align: "end",
			"data-testid": `${E ?? "tabs"}-more-menu`,
			sections: [{ items: P.map((e) => ({
				label: typeof e.label == "string" ? e.label : e.id,
				...e.badge !== void 0 && e.badge !== null ? { trailing: e.badge } : {},
				...e.disabled ? { disabled: !0 } : {},
				onSelect: () => d(e.id),
				...e.testId ?? y?.(e) ? { "data-testid": e.testId ?? y?.(e) } : {}
			})) }]
		})]
	});
}
function D({ id: e, when: t, idPrefix: n, className: r, style: i, children: a }) {
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
//#region src/components/shared/Text.tsx
var O = {
	xs: "text-xs",
	sm: "text-sm",
	base: "text-base",
	lg: "text-lg"
}, k = {
	normal: "font-normal",
	medium: "font-medium",
	semibold: "font-semibold",
	bold: "font-bold"
}, A = {
	primary: "text-text-primary",
	secondary: "text-text-secondary",
	tertiary: "text-text-tertiary",
	inherit: ""
};
function j({ as: e = "span", className: t, title: n, children: r, wrap: i = !1, size: a, weight: o, tone: s, tabular: l = !1, ...u }) {
	let d = [
		a && O[a],
		o && k[o],
		s && A[s],
		l && "tabular-nums",
		t
	].filter(Boolean).join(" ") || void 0;
	return /* @__PURE__ */ c(y, {
		as: e,
		gap: "none",
		wrap: i,
		className: d,
		title: n,
		...u,
		children: r
	});
}
var M = j;
//#endregion
export { b as a, y as c, E as i, v as l, j as n, x as o, D as r, S as s, M as t, p as u };
