import { t as e } from "./cn-DhjIN-s0.js";
import { useCallback as t, useEffect as n, useId as r, useLayoutEffect as i, useRef as a, useState as o } from "react";
import { Fragment as s, jsx as c, jsxs as l } from "react/jsx-runtime";
import { createPortal as u } from "react-dom";
//#region src/components/shared/InlineAlert.tsx
var d = {
	error: "bg-[var(--color-danger-bg,#fef2f2)] border-[var(--color-danger,#dc2626)] text-[var(--color-danger,#dc2626)]",
	success: "bg-[var(--color-success-bg,#f0fdf4)] border-[var(--color-success,#16a34a)] text-[var(--color-success,#16a34a)]",
	info: "bg-[var(--color-info-bg,#eff6ff)] border-[var(--color-info,#2563eb)] text-[var(--color-info,#2563eb)]",
	warning: "bg-[var(--color-warning-bg,#fffbeb)] border-[var(--color-warning,#f59e0b)] text-[var(--color-warning,#f59e0b)]"
}, f = {
	surface: d,
	code: {
		error: "bg-code-surface border-code-red text-code-red",
		success: "bg-code-surface border-code-green text-code-green",
		info: "bg-code-surface border-code-blue text-code-blue",
		warning: "bg-code-surface border-code-peach text-code-peach"
	}
};
function p({ tone: t, palette: n = "surface", children: r, onDismiss: i, className: a, "data-testid": o }) {
	return /* @__PURE__ */ l("div", {
		"data-testid": o,
		role: t === "error" || t === "warning" ? "alert" : "status",
		"aria-live": t === "error" || t === "warning" ? "assertive" : "polite",
		className: e("flex items-start gap-2 px-3 py-2 rounded-md border-l-[3px] text-sm", (f[n] ?? d)[t], a),
		children: [/* @__PURE__ */ c("span", {
			className: "flex-1",
			children: r
		}), i && /* @__PURE__ */ c("button", {
			type: "button",
			onClick: i,
			"aria-label": "Dismiss",
			className: "flex-shrink-0 opacity-70 hover:opacity-100",
			children: "✕"
		})]
	});
}
//#endregion
//#region src/components/shared/Tooltip.tsx
function m(e, t, n) {
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
function h({ content: d, children: f, placement: p = "top", openDelay: h = 350, closeDelay: g = 100, disabled: _ = !1, className: v, "data-testid": y = "tooltip" }) {
	let [b, x] = o(!1), [S, C] = o(null), w = a(null), T = a(null), E = r(), D = t(() => {
		T.current &&= (clearTimeout(T.current), null);
	}, []);
	n(() => D, [D]);
	let O = t(() => {
		let e = w.current;
		e && C(m(e.getBoundingClientRect(), p, 6));
	}, [p]);
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
		children: f
	}), b && S && typeof document < "u" && u(/* @__PURE__ */ c("div", {
		role: "tooltip",
		id: E,
		"data-testid": y,
		className: e("pointer-events-none z-[9500] max-w-xs rounded-md border border-border bg-surface px-2 py-1 text-xs text-text-primary shadow-lg", v),
		style: S,
		children: d
	}), document.body)] });
}
//#endregion
export { p as n, h as t };
