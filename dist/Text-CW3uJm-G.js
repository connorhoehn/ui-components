import { t as e } from "./cn-D4QmbyEy.js";
import { t } from "./Stack-DNMA-_4L.js";
import { useCallback as n, useEffect as r, useId as i, useLayoutEffect as a, useRef as o, useState as s } from "react";
import { Fragment as c, jsx as l, jsxs as u } from "react/jsx-runtime";
import { createPortal as d } from "react-dom";
//#region src/components/shared/Tooltip.tsx
function f(e, t, n) {
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
function p({ content: t, children: p, placement: m = "top", openDelay: h = 350, closeDelay: g = 100, disabled: _ = !1, className: v, "data-testid": y = "tooltip" }) {
	let [b, x] = s(!1), [S, C] = s(null), w = o(null), T = o(null), E = i(), D = n(() => {
		T.current &&= (clearTimeout(T.current), null);
	}, []);
	r(() => D, [D]);
	let O = n(() => {
		let e = w.current;
		e && C(f(e.getBoundingClientRect(), m, 6));
	}, [m]);
	a(() => {
		b ? O() : C(null);
	}, [b, O]);
	let k = n(() => {
		_ || (D(), T.current = setTimeout(() => x(!0), h));
	}, [
		D,
		_,
		h
	]), A = n(() => {
		D(), T.current = setTimeout(() => x(!1), g);
	}, [D, g]), j = n(() => {
		D(), x(!1);
	}, [D]);
	return /* @__PURE__ */ u(c, { children: [/* @__PURE__ */ l("span", {
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
	}), b && S && typeof document < "u" && d(/* @__PURE__ */ l("div", {
		role: "tooltip",
		id: E,
		"data-testid": y,
		className: e("pointer-events-none z-[9500] max-w-xs rounded-md border border-border bg-surface px-2 py-1 text-xs text-text-primary shadow-lg", v),
		style: S,
		children: t
	}), document.body)] });
}
//#endregion
//#region src/components/shared/Text.tsx
var m = {
	xs: "text-xs",
	sm: "text-sm",
	base: "text-base",
	lg: "text-lg"
}, h = {
	normal: "font-normal",
	medium: "font-medium",
	semibold: "font-semibold",
	bold: "font-bold"
}, g = {
	primary: "text-text-primary",
	secondary: "text-text-secondary",
	tertiary: "text-text-tertiary",
	inherit: ""
};
function _({ as: e = "span", className: n, title: r, children: i, wrap: a = !1, size: o, weight: s, tone: c, tabular: u = !1, ...d }) {
	let f = [
		o && m[o],
		s && h[s],
		c && g[c],
		u && "tabular-nums",
		n
	].filter(Boolean).join(" ") || void 0;
	return /* @__PURE__ */ l(t, {
		as: e,
		gap: "none",
		wrap: a,
		className: f,
		title: r,
		...d,
		children: i
	});
}
var v = _;
//#endregion
export { _ as n, p as r, v as t };
