import { d as e } from "./Button-DQoeE5dN.js";
import { useCallback as t, useEffect as n, useId as r, useLayoutEffect as i, useRef as a, useState as o } from "react";
import { Fragment as s, jsx as c, jsxs as l } from "react/jsx-runtime";
import { createPortal as u } from "react-dom";
//#region src/components/shared/Tooltip.tsx
function d(e) {
	let t = e?.firstElementChild ?? e;
	return t ? t.scrollWidth > t.clientWidth + 1 || t.scrollHeight > t.clientHeight + 1 : !1;
}
function f(e, t, n) {
	let r = t.width, i = t.height, a = e.left + (e.width - r) / 2, o = n === "top" ? e.top - i - 6 : e.bottom + 6;
	return n === "left" || n === "right" ? (a = n === "left" ? e.left - r - 6 : e.right + 6, o = e.top + (e.height - i) / 2, a < 8 && e.right + 6 + r <= window.innerWidth - 8 ? a = e.right + 6 : a + r > window.innerWidth - 8 && e.left - r - 6 >= 8 && (a = e.left - r - 6)) : o < 8 && e.bottom + 6 + i <= window.innerHeight - 8 ? o = e.bottom + 6 : o + i > window.innerHeight - 8 && e.top - i - 6 >= 8 && (o = e.top - i - 6), {
		position: "fixed",
		left: Math.max(8, Math.min(a, window.innerWidth - r - 8)),
		top: Math.max(8, Math.min(o, window.innerHeight - i - 8))
	};
}
function p({ content: p, children: m, placement: h = "top", openDelay: g = 350, closeDelay: _ = 100, disabled: v = !1, className: y, triggerClassName: b, onlyWhenTruncated: x = !1, "data-testid": S = "tooltip" }) {
	let [C, w] = o(!1), [T, E] = o(null), D = a(null), O = a(null), k = a(null), A = r(), j = t(() => {
		k.current &&= (clearTimeout(k.current), null);
	}, []);
	n(() => j, [j]);
	let M = t(() => {
		let e = D.current;
		!e || !O.current || E(f(e.getBoundingClientRect(), O.current.getBoundingClientRect(), h));
	}, [h]);
	i(() => {
		if (!C) {
			E(null);
			return;
		}
		M(), window.addEventListener("resize", M), window.addEventListener("scroll", M, !0);
		let e = typeof ResizeObserver > "u" ? null : new ResizeObserver(M);
		return O.current && e?.observe(O.current), () => {
			window.removeEventListener("resize", M), window.removeEventListener("scroll", M, !0), e?.disconnect();
		};
	}, [
		C,
		M,
		p
	]);
	let N = t(() => {
		v || x && !d(D.current) || (j(), k.current = setTimeout(() => w(!0), g));
	}, [
		j,
		v,
		g,
		x
	]), P = t(() => {
		j(), k.current = setTimeout(() => w(!1), _);
	}, [j, _]), F = t(() => {
		j(), w(!1);
	}, [j]);
	return /* @__PURE__ */ l(s, { children: [/* @__PURE__ */ c("span", {
		ref: D,
		className: b ?? "inline-flex",
		onMouseEnter: N,
		onMouseLeave: P,
		onFocus: (e) => {
			v || !e.currentTarget.contains(e.target) || x && !d(D.current) || (j(), w(!0));
		},
		onBlur: F,
		onClickCapture: F,
		onKeyDownCapture: (e) => {
			[
				"Escape",
				"Enter",
				" "
			].includes(e.key) && F();
		},
		"aria-describedby": C ? A : void 0,
		children: m
	}), C && typeof document < "u" && u(/* @__PURE__ */ c("div", {
		ref: O,
		role: "tooltip",
		id: A,
		"data-testid": S,
		className: e("pointer-events-none z-[9500] w-max max-w-[min(20rem,calc(100vw-16px))] break-words rounded-md border border-border bg-surface px-2 py-1 text-xs text-text-primary shadow-lg", y),
		style: T || {
			position: "fixed",
			visibility: "hidden"
		},
		children: p
	}), document.body)] });
}
//#endregion
export { d as n, p as t };
