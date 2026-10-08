import { t as e } from "./cn-D4QmbyEy.js";
import { t } from "./DropdownMenu-M27Ly7by.js";
import { useCallback as n, useId as r, useMemo as i, useRef as a, useState as o } from "react";
import { jsx as s, jsxs as c } from "react/jsx-runtime";
//#region src/components/ui/IconButton.tsx
var l = {
	ghost: "bg-transparent text-text-primary hover:bg-surface-hover",
	primary: "bg-info text-white hover:bg-info",
	danger: "bg-danger text-white hover:bg-danger",
	outline: "bg-surface text-text-secondary border border-solid border-border hover:bg-surface-hover hover:text-text-primary"
}, u = {
	surface: l,
	code: {
		ghost: "bg-transparent text-code-subtle hover:bg-code-surface hover:text-code-text",
		primary: "bg-code-blue text-code-bg hover:bg-code-blue",
		danger: "bg-code-red text-code-bg hover:bg-code-red",
		outline: "bg-transparent text-code-subtle border border-solid border-code-border hover:bg-code-surface hover:text-code-text"
	}
}, d = {
	sm: "w-6 h-6 text-sm",
	md: "w-8 h-8 text-base",
	lg: "w-10 h-10 text-lg"
};
function f({ "aria-label": t, icon: n, children: r, disabled: i = !1, variant: a = "ghost", tone: o = "surface", size: c = "md", className: f, ...p }) {
	return /* @__PURE__ */ s("button", {
		type: "button",
		"aria-label": t,
		disabled: i,
		className: e("inline-flex items-center justify-center border-none rounded-md", "transition-colors duration-150 ease-in-out", (u[o] ?? l)[a], d[c], i && "opacity-50 cursor-not-allowed", !i && "cursor-pointer", f),
		...p,
		children: n ?? r
	});
}
//#endregion
//#region src/components/ui/Stack.tsx
var p = {
	none: "gap-0",
	xs: "gap-1.5",
	sm: "gap-2",
	md: "gap-3",
	lg: "gap-4",
	xl: "gap-6"
}, m = {
	start: "items-start",
	center: "items-center",
	end: "items-end",
	baseline: "items-baseline",
	stretch: "items-stretch"
}, h = {
	start: "justify-start",
	center: "justify-center",
	end: "justify-end",
	between: "justify-between"
};
function g(t, { gap: n = "md", align: r, justify: i, wrap: a }) {
	return e("flex", t === "col" ? "flex-col" : "flex-row", p[n], r ? m[r] : void 0, i ? h[i] : void 0, a ? "flex-wrap" : void 0);
}
function _({ children: t, gap: n, align: r, justify: i, wrap: a = !1, as: o = "div", className: c, ref: l, ...u }) {
	return /* @__PURE__ */ s(o, {
		ref: l,
		className: e(g("col", {
			gap: n,
			align: r,
			justify: i,
			wrap: a
		}), c),
		...u,
		children: t
	});
}
function v({ children: t, gap: n = "sm", align: r = "center", justify: i, wrap: a = !0, as: o = "div", className: c, ref: l, ...u }) {
	return /* @__PURE__ */ s(o, {
		ref: l,
		className: e(g("row", {
			gap: n,
			align: r,
			justify: i,
			wrap: a
		}), c),
		...u,
		children: t
	});
}
//#endregion
//#region src/components/shared/ContainerDensity.ts
var y = {
	pane: 600,
	header: 640
};
function b(e, t) {
	return !t || e == null || !(e > 0) ? "comfortable" : e < t ? "compact" : "comfortable";
}
function x(e = {}) {
	let { compactBelow: t = null, of: r = "self", axis: i = "width", box: s = "content", enabled: c = !0, forward: l } = e, [u, d] = o(null), f = a(null);
	return {
		ref: n((e) => {
			typeof l == "function" ? l(e) : l && (l.current = e), f.current?.disconnect(), f.current = null;
			let t = e && r === "parent" ? e.parentElement : e;
			if (!t || !c) return;
			let n = (e) => i === "height" ? e.height : e.width;
			if (s === "border") {
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
			let a = new ResizeObserver((e) => {
				let t = e[0]?.contentRect;
				t && d(n(t));
			});
			a.observe(t), f.current = a;
		}, [
			l,
			r,
			i,
			s,
			c
		]),
		size: u,
		density: b(u, t)
	};
}
//#endregion
//#region src/components/shared/Tabs.tsx
var S = {
	sm: "px-2.5 py-1 text-xs",
	md: "px-3 py-1.5 text-sm"
};
function C(e, t) {
	switch (e) {
		case "underline": return t ? "relative inline-flex items-center gap-1 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-[var(--color-border)] after:content-['']" : "inline-flex items-center gap-1 border-b border-[var(--color-border)]";
		case "pill": return "inline-flex items-center gap-1";
		case "segmented": return "inline-flex items-center rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-inset,#f8fafc)] p-0.5 gap-0.5";
	}
}
function w(t, n, r, i = !1) {
	return t === "underline" ? e(i ? "relative rounded-none" : "-mb-px border-b-2 rounded-none", n ? e(!i && "border-[var(--color-primary)]", "text-[var(--color-text-primary)]") : e(!i && "border-transparent", "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"), r && "opacity-50 cursor-not-allowed hover:text-[var(--color-text-secondary)]") : t === "pill" ? e("rounded-full", n ? "bg-[var(--color-primary)] text-white" : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text-primary)]", r && "opacity-50 cursor-not-allowed hover:bg-transparent") : e("rounded-md", n ? "bg-surface shadow-sm text-[var(--color-text-primary)] border border-[var(--color-border)]" : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]", r && "opacity-50 cursor-not-allowed hover:bg-transparent");
}
function T({ items: o, value: l, onValueChange: u, variant: d = "underline", size: f = "md", badgeStyle: p = "chip", className: m, style: h, "aria-label": g, idPrefix: _, getItemTestId: v, stretch: y = !1, itemClassName: b, "data-testid": T, indicator: E = "border", indicatorWeight: D = 2, overflowBelow: O }) {
	let k = d === "underline" && E === "bar", A = x({
		compactBelow: O ?? null,
		of: "parent",
		box: "border",
		enabled: !!O
	}), j = !!O && A.density === "compact", M = j ? o.filter((e, t) => t === 0 || e.id === l) : o, N = j ? o.filter((e) => !M.includes(e)) : [], P = r(), F = _ ?? P, I = a(/* @__PURE__ */ new Map()), L = i(() => o.filter((e) => !e.disabled).map((e) => e.id), [o]), R = n((e) => {
		I.current.get(e)?.focus();
	}, []), z = n((e, t) => {
		if (L.length === 0) return;
		let n = L.indexOf(t), r = null;
		switch (e.key) {
			case "ArrowRight":
			case "ArrowDown":
				r = n === -1 ? 0 : (n + 1) % L.length;
				break;
			case "ArrowLeft":
			case "ArrowUp":
				r = n === -1 ? L.length - 1 : (n - 1 + L.length) % L.length;
				break;
			case "Home":
				r = 0;
				break;
			case "End":
				r = L.length - 1;
				break;
			case "Enter":
			case " ":
				e.preventDefault(), u(t);
				return;
			default: return;
		}
		if (r !== null) {
			e.preventDefault();
			let t = L[r];
			u(t), R(t);
		}
	}, [
		L,
		u,
		R
	]);
	return /* @__PURE__ */ c("div", {
		ref: A.ref,
		role: "tablist",
		"aria-label": g,
		"data-testid": T,
		"data-folded": O ? j ? "true" : "false" : void 0,
		...k ? { "data-indicator": "bar" } : {},
		className: e(C(d, k), m),
		style: h,
		children: [M.map((t) => {
			let n = t.id === l;
			return /* @__PURE__ */ c("button", {
				ref: (e) => {
					e ? I.current.set(t.id, e) : I.current.delete(t.id);
				},
				type: "button",
				role: "tab",
				id: `${F}-tab-${t.id}`,
				"aria-controls": `${F}-panel-${t.id}`,
				"data-testid": t.testId ?? v?.(t),
				"aria-selected": n,
				"aria-disabled": t.disabled || void 0,
				tabIndex: n ? 0 : -1,
				disabled: t.disabled,
				onClick: () => !t.disabled && u(t.id),
				onKeyDown: (e) => z(e, t.id),
				className: e("inline-flex items-center gap-1.5 font-medium transition-colors cursor-pointer", y && "flex-1 justify-center", S[f], w(d, n, !!t.disabled, k), b),
				children: [
					t.icon,
					/* @__PURE__ */ s("span", { children: t.label }),
					k && n && /* @__PURE__ */ s("span", {
						"aria-hidden": "true",
						"data-tab-indicator": "",
						className: e("pointer-events-none absolute inset-x-0 bottom-0 z-[1] bg-[var(--color-primary)]", D === 3 ? "h-[3px]" : "h-0.5")
					}),
					t.badge !== void 0 && t.badge !== null && /* @__PURE__ */ s("span", {
						className: p === "plain" ? "ml-2.5 inline-flex items-center text-[14px] font-medium tabular-nums text-[var(--color-text-tertiary)]" : e("ml-1 inline-flex items-center justify-center rounded-full px-1.5 min-w-[20px] text-[10px] font-semibold", n && d === "pill" ? "bg-white/20 text-white" : "bg-[var(--color-surface-hover)] text-[var(--color-text-secondary)]"),
						children: t.badge
					})
				]
			}, t.id);
		}), N.length > 0 && /* @__PURE__ */ s(t, {
			trigger: /* @__PURE__ */ c("span", {
				className: e("inline-flex items-center gap-1 font-medium", f === "sm" ? "text-xs" : "text-sm"),
				children: ["More", /* @__PURE__ */ s("span", {
					"aria-hidden": "true",
					className: "text-[10px] leading-none",
					children: "▾"
				})]
			}),
			triggerLabel: `More views: ${N.map((e) => typeof e.label == "string" ? e.label : e.id).join(", ")}`,
			triggerTestId: `${T ?? "tabs"}-more`,
			triggerClassName: e("border-0 bg-transparent", S[f], "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"),
			align: "end",
			"data-testid": `${T ?? "tabs"}-more-menu`,
			sections: [{ items: N.map((e) => ({
				label: typeof e.label == "string" ? e.label : e.id,
				...e.badge !== void 0 && e.badge !== null ? { trailing: e.badge } : {},
				...e.disabled ? { disabled: !0 } : {},
				onSelect: () => u(e.id),
				...e.testId ?? v?.(e) ? { "data-testid": e.testId ?? v?.(e) } : {}
			})) }]
		})]
	});
}
function E({ id: e, when: t, idPrefix: n, className: r, style: i, children: a }) {
	return e === t ? /* @__PURE__ */ s("div", {
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
export { x as a, f as c, b as i, T as n, v as o, y as r, _ as s, E as t };
