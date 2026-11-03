import { t as e } from "./cn-D4QmbyEy.js";
import { useCallback as t, useEffect as n, useId as r, useLayoutEffect as i, useRef as a, useState as o } from "react";
import { Fragment as s, jsx as c, jsxs as l } from "react/jsx-runtime";
import { createPortal as u } from "react-dom";
//#region src/components/shared/Tooltip.tsx
function d(e, t, n) {
	let r = t.width, i = t.height, a = e.left + (e.width - r) / 2, o = n === "top" ? e.top - i - 6 : e.bottom + 6;
	return n === "left" || n === "right" ? (a = n === "left" ? e.left - r - 6 : e.right + 6, o = e.top + (e.height - i) / 2, a < 8 && e.right + 6 + r <= window.innerWidth - 8 ? a = e.right + 6 : a + r > window.innerWidth - 8 && e.left - r - 6 >= 8 && (a = e.left - r - 6)) : o < 8 && e.bottom + 6 + i <= window.innerHeight - 8 ? o = e.bottom + 6 : o + i > window.innerHeight - 8 && e.top - i - 6 >= 8 && (o = e.top - i - 6), {
		position: "fixed",
		left: Math.max(8, Math.min(a, window.innerWidth - r - 8)),
		top: Math.max(8, Math.min(o, window.innerHeight - i - 8))
	};
}
function f({ content: f, children: p, placement: m = "top", openDelay: h = 350, closeDelay: g = 100, disabled: _ = !1, className: v, "data-testid": y = "tooltip" }) {
	let [b, x] = o(!1), [S, C] = o(null), w = a(null), T = a(null), E = a(null), D = r(), O = t(() => {
		E.current &&= (clearTimeout(E.current), null);
	}, []);
	n(() => O, [O]);
	let k = t(() => {
		let e = w.current;
		!e || !T.current || C(d(e.getBoundingClientRect(), T.current.getBoundingClientRect(), m));
	}, [m]);
	i(() => {
		if (!b) {
			C(null);
			return;
		}
		k(), window.addEventListener("resize", k), window.addEventListener("scroll", k, !0);
		let e = typeof ResizeObserver > "u" ? null : new ResizeObserver(k);
		return T.current && e?.observe(T.current), () => {
			window.removeEventListener("resize", k), window.removeEventListener("scroll", k, !0), e?.disconnect();
		};
	}, [
		b,
		k,
		f
	]);
	let A = t(() => {
		_ || (O(), E.current = setTimeout(() => x(!0), h));
	}, [
		O,
		_,
		h
	]), j = t(() => {
		O(), E.current = setTimeout(() => x(!1), g);
	}, [O, g]), M = t(() => {
		O(), x(!1);
	}, [O]);
	return /* @__PURE__ */ l(s, { children: [/* @__PURE__ */ c("span", {
		ref: w,
		className: "inline-flex",
		onMouseEnter: A,
		onMouseLeave: j,
		onFocus: (e) => {
			_ || !e.currentTarget.contains(e.target) || (O(), x(!0));
		},
		onBlur: M,
		onClickCapture: M,
		onKeyDownCapture: (e) => {
			[
				"Escape",
				"Enter",
				" "
			].includes(e.key) && M();
		},
		"aria-describedby": b ? D : void 0,
		children: p
	}), b && typeof document < "u" && u(/* @__PURE__ */ c("div", {
		ref: T,
		role: "tooltip",
		id: D,
		"data-testid": y,
		className: e("pointer-events-none z-[9500] w-max max-w-[min(20rem,calc(100vw-16px))] break-words rounded-md border border-border bg-surface px-2 py-1 text-xs text-text-primary shadow-lg", v),
		style: S || {
			position: "fixed",
			visibility: "hidden"
		},
		children: f
	}), document.body)] });
}
//#endregion
export { f as t };
