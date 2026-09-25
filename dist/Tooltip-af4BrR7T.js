import { t as e } from "./cn-DhjIN-s0.js";
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
export { f as t };
