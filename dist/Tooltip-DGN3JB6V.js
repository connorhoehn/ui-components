import { d as e } from "./Button-DQoeE5dN.js";
import { useCallback as t, useEffect as n, useId as r, useLayoutEffect as i, useRef as a, useState as o } from "react";
import { Fragment as s, jsx as c, jsxs as l } from "react/jsx-runtime";
import { createPortal as u } from "react-dom";
//#region src/components/shared/Tooltip.tsx
function d(e) {
	let t = e?.firstElementChild ?? e;
	return t ? t.scrollWidth > t.clientWidth + 1 || t.scrollHeight > t.clientHeight + 1 : !1;
}
function f(e) {
	let t = 9500;
	for (let n = e; n; n = n.parentElement) {
		let e = Number.parseInt(window.getComputedStyle(n).zIndex, 10);
		Number.isFinite(e) && (t = Math.max(t, e + 1));
	}
	return t;
}
function p(e) {
	let t = e.getBoundingClientRect();
	return t.width > 0 || t.height > 0 ? t : e.firstElementChild?.getBoundingClientRect() ?? t;
}
function m(e, t, n) {
	let r = t.width, i = t.height, a = e.left + (e.width - r) / 2, o = n === "top" ? e.top - i - 6 : e.bottom + 6;
	return n === "left" || n === "right" ? (a = n === "left" ? e.left - r - 6 : e.right + 6, o = e.top + (e.height - i) / 2, a < 8 && e.right + 6 + r <= window.innerWidth - 8 ? a = e.right + 6 : a + r > window.innerWidth - 8 && e.left - r - 6 >= 8 && (a = e.left - r - 6)) : o < 8 && e.bottom + 6 + i <= window.innerHeight - 8 ? o = e.bottom + 6 : o + i > window.innerHeight - 8 && e.top - i - 6 >= 8 && (o = e.top - i - 6), {
		position: "fixed",
		left: Math.max(8, Math.min(a, window.innerWidth - r - 8)),
		top: Math.max(8, Math.min(o, window.innerHeight - i - 8))
	};
}
function h({ content: h, children: g, placement: _ = "top", openDelay: v = 350, closeDelay: y = 100, disabled: b = !1, className: x, triggerClassName: S, onlyWhenTruncated: C = !1, "data-testid": w = "tooltip" }) {
	let [T, E] = o(!1), [D, O] = o(null), k = a(null), A = a(null), j = a(null), M = r(), N = t(() => {
		j.current &&= (clearTimeout(j.current), null);
	}, []);
	n(() => N, [N]);
	let P = t(() => {
		let e = k.current;
		!e || !A.current || O({
			...m(p(e), A.current.getBoundingClientRect(), _),
			zIndex: f(e)
		});
	}, [_]);
	i(() => {
		if (!T) {
			O(null);
			return;
		}
		P(), window.addEventListener("resize", P), window.addEventListener("scroll", P, !0);
		let e = typeof ResizeObserver > "u" ? null : new ResizeObserver(P);
		return A.current && e?.observe(A.current), () => {
			window.removeEventListener("resize", P), window.removeEventListener("scroll", P, !0), e?.disconnect();
		};
	}, [
		T,
		P,
		h
	]);
	let F = t(() => {
		b || C && !d(k.current) || (N(), j.current = setTimeout(() => E(!0), v));
	}, [
		N,
		b,
		v,
		C
	]), I = t(() => {
		N(), j.current = setTimeout(() => E(!1), y);
	}, [N, y]), L = t(() => {
		N(), E(!1);
	}, [N]);
	return /* @__PURE__ */ l(s, { children: [/* @__PURE__ */ c("span", {
		ref: k,
		className: S ?? "inline-flex",
		onMouseEnter: F,
		onMouseLeave: I,
		onFocus: (e) => {
			b || !e.currentTarget.contains(e.target) || C && !d(k.current) || (N(), E(!0));
		},
		onBlur: L,
		onClickCapture: L,
		onKeyDownCapture: (e) => {
			[
				"Escape",
				"Enter",
				" "
			].includes(e.key) && L();
		},
		"aria-describedby": T && !b ? M : void 0,
		children: g
	}), T && !b && typeof document < "u" && u(/* @__PURE__ */ c("div", {
		ref: A,
		role: "tooltip",
		id: M,
		"data-testid": w,
		className: e("pointer-events-none z-[9500] w-max max-w-[min(20rem,calc(100vw-16px))] break-words rounded-md border border-border bg-surface px-2 py-1 text-xs text-text-primary shadow-lg", x),
		style: D || {
			position: "fixed",
			visibility: "hidden"
		},
		children: h
	}), document.body)] });
}
//#endregion
export { d as n, h as t };
