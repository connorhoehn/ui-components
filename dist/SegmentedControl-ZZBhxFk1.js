import { t as e } from "./cn-D4QmbyEy.js";
import { useCallback as t, useEffect as n, useId as r, useLayoutEffect as i, useRef as a, useState as o } from "react";
import { Fragment as s, jsx as c, jsxs as l } from "react/jsx-runtime";
import { createPortal as u } from "react-dom";
//#region src/components/shared/Tooltip.tsx
function d(e, t, n) {
	switch (t) {
		case "top": return {
			position: "fixed",
			bottom: window.innerHeight - e.top + n,
			left: e.left + e.width / 2,
			transform: "translateX(-50%)"
		};
		case "left": return {
			position: "fixed",
			top: e.top + e.height / 2,
			right: window.innerWidth - e.left + n,
			transform: "translateY(-50%)"
		};
		case "right": return {
			position: "fixed",
			top: e.top + e.height / 2,
			left: e.right + n,
			transform: "translateY(-50%)"
		};
		default: return {
			position: "fixed",
			top: e.bottom + n,
			left: e.left + e.width / 2,
			transform: "translateX(-50%)"
		};
	}
}
function f({ content: f, children: p, placement: m = "top", openDelay: h = 350, closeDelay: g = 100, disabled: _ = !1, className: v, "data-testid": y = "tooltip" }) {
	let [b, x] = o(!1), [S, C] = o(null), w = a(null), T = a(null), E = r(), D = t(() => {
		T.current &&= (clearTimeout(T.current), null);
	}, []);
	n(() => D, [D]);
	let O = t(() => {
		let e = w.current;
		e && C(d(e.getBoundingClientRect(), m, 6));
	}, [m]);
	i(() => {
		b ? O() : C(null);
	}, [b, O]);
	let k = t(() => {
		_ || (D(), T.current = setTimeout(() => x(!0), h));
	}, [
		D,
		_,
		h
	]), A = t(() => {
		D(), T.current = setTimeout(() => x(!1), g);
	}, [D, g]), j = t(() => {
		D(), x(!1);
	}, [D]);
	return /* @__PURE__ */ l(s, { children: [/* @__PURE__ */ c("span", {
		ref: w,
		className: "inline-flex",
		onMouseEnter: k,
		onMouseLeave: A,
		onFocus: () => {
			D(), x(!0);
		},
		onBlur: j,
		onKeyDown: (e) => {
			e.key === "Escape" && j();
		},
		"aria-describedby": b ? E : void 0,
		children: p
	}), b && S && typeof document < "u" && u(/* @__PURE__ */ c("div", {
		role: "tooltip",
		id: E,
		"data-testid": y,
		className: e("pointer-events-none z-[9500] max-w-xs rounded-md border border-border bg-surface px-2 py-1 text-xs text-text-primary shadow-lg", v),
		style: S,
		children: f
	}), document.body)] });
}
//#endregion
//#region src/components/shared/SegmentedControl.tsx
var p = {
	sm: "h-6 min-w-6 px-1 [&_svg]:size-3.5",
	md: "h-7 min-w-7 px-1.5 [&_svg]:size-4"
}, m = {
	sm: "px-2.5 py-1 text-xs",
	md: "px-3 py-1.5 text-sm"
}, h = "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]", g = "bg-surface shadow-sm text-[var(--color-text-primary)] border border-[var(--color-border)]", _ = "bg-primary-bg text-primary border border-transparent";
function v({ options: t, value: n, onChange: r, size: i = "md", "aria-label": o, "aria-labelledby": s, disabled: u = !1, fullWidth: d = !1, tone: v = "neutral", iconOnly: y = !1, className: b, "data-testid": x }) {
	let S = a(null), C = t.filter((e) => !u), w = t.findIndex((e) => e.value === n), T = (e) => {
		if (u || C.length === 0) return;
		let n = (((w < 0 ? 0 : w) + e) % t.length + t.length) % t.length;
		r(t[n].value), S.current?.querySelectorAll("[role=\"radio\"]")[n]?.focus();
	};
	return /* @__PURE__ */ c("div", {
		ref: S,
		role: "radiogroup",
		"aria-label": o,
		"aria-labelledby": s,
		"data-testid": x,
		className: e(d ? "flex w-full items-center" : "inline-flex items-center", "rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-inset,#f8fafc)] p-0.5 gap-0.5", v === "accent" && "bg-surface p-[3px] gap-1", b),
		children: t.map((a, o) => {
			let s = a.value === n, b = y && a.icon != null, S = a.badge !== void 0 && a.badge !== null && a.badge !== !1, C = /* @__PURE__ */ l("button", {
				type: "button",
				role: "radio",
				"aria-checked": s,
				tabIndex: s || w < 0 && o === 0 ? 0 : -1,
				onClick: () => r(a.value),
				onKeyDown: (e) => {
					let n = e.key === "ArrowLeft" || e.key === "ArrowUp", i = e.key === "ArrowRight" || e.key === "ArrowDown";
					if (!(!n && !i && e.key !== "Home" && e.key !== "End")) {
						if (e.preventDefault(), e.key === "Home") {
							r(t[0].value);
							return;
						}
						if (e.key === "End") {
							r(t[t.length - 1].value);
							return;
						}
						T(n ? -1 : 1);
					}
				},
				disabled: u,
				"data-testid": a.testId ?? (x ? `${x}-${a.value}` : void 0),
				...b ? { "aria-label": S && (typeof a.badge == "string" || typeof a.badge == "number") ? `${a.label}, ${a.badge}` : a.label } : {},
				className: e("inline-flex items-center justify-center gap-1.5 rounded-md font-medium transition-all cursor-pointer", d && "flex-1", u && "cursor-not-allowed opacity-60", b ? e("relative", p[i]) : m[i], s ? v === "accent" ? _ : g : h, v === "accent" && "h-[30px] py-0 text-[15px]", v === "accent" && !s && "text-text-primary"),
				children: [
					a.icon,
					!b && a.label,
					S && (b ? /* @__PURE__ */ c("span", {
						"aria-hidden": "true",
						className: "absolute -right-0.5 -top-0.5 min-w-3.5 rounded-full bg-primary px-1 text-center text-[10px] font-semibold leading-3.5 text-on-primary",
						children: a.badge
					}) : /* @__PURE__ */ c("span", {
						className: "text-[var(--color-text-tertiary)] tabular-nums",
						children: a.badge
					}))
				]
			}, a.value);
			return b ? /* @__PURE__ */ c(f, {
				content: a.label,
				placement: "bottom",
				children: C
			}, a.value) : C;
		})
	});
}
//#endregion
export { f as n, v as t };
