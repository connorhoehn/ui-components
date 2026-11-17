import { d as e } from "./Button-DQoeE5dN.js";
import { t } from "./overlayStack-BFH9XXvN.js";
import { useCallback as n, useEffect as r, useLayoutEffect as i, useRef as a, useState as o } from "react";
import { jsx as s } from "react/jsx-runtime";
import { createPortal as c } from "react-dom";
//#region src/components/shared/InlinePopover.tsx
var l = [
	"a[href]",
	"button:not([disabled])",
	"input:not([disabled]):not([type=\"hidden\"])",
	"select:not([disabled])",
	"textarea:not([disabled])",
	"[tabindex]:not([tabindex=\"-1\"])",
	"[contenteditable=\"true\"]"
].join(",");
function u(e) {
	return Array.from(e.querySelectorAll(l)).filter((e) => e.getAttribute("aria-hidden") !== "true");
}
var d = 8, f = "45vh", p = 240;
function m(e, t, n) {
	if (t === "sheet") {
		let t = typeof window < "u" ? window.innerHeight : 0;
		return {
			position: "fixed",
			left: d,
			right: d,
			bottom: Math.max(0, t - e.top + n),
			maxHeight: `min(${f}, ${Math.max(0, e.top - n - d)}px)`,
			overflowY: "auto"
		};
	}
	return t === "right" ? (typeof window < "u" ? window.innerWidth - e.right - n : Infinity) < p && e.left > p ? {
		position: "fixed",
		top: e.top,
		left: e.left - n,
		transform: "translateX(-100%)"
	} : {
		position: "fixed",
		top: e.top,
		left: e.right + n
	} : t === "top-start" || t === "top-end" ? {
		position: "fixed",
		top: e.top - n,
		left: t === "top-end" ? e.right : e.left,
		transform: t === "top-end" ? "translate(-100%, -100%)" : "translateY(-100%)"
	} : t === "bottom-end" ? {
		position: "fixed",
		top: e.bottom + n,
		left: e.right,
		transform: "translateX(-100%)"
	} : {
		position: "fixed",
		top: e.bottom + n,
		left: e.left
	};
}
var h = "data-uic-keepout";
function g(e, t, n = document) {
	let r = t;
	return e && n.querySelectorAll(`[${h}="bottom"]`).forEach((t) => {
		let n = t.getBoundingClientRect();
		(n.height !== 0 || n.width !== 0) && n.top >= e.bottom && n.top < r && (r = n.top);
	}), r;
}
var _ = "data-uic-popover-boundary";
function v(e, t) {
	let n = e?.closest("[data-uic-popover-boundary]") ?? null;
	if (!n) return {
		left: 0,
		right: t
	};
	let r = n.getBoundingClientRect();
	return r.width === 0 ? {
		left: 0,
		right: t
	} : {
		left: Math.max(0, r.left),
		right: Math.min(t, r.right)
	};
}
function y(e, t) {
	return e.left < t.right && e.left + e.width > t.left && e.top < t.bottom && e.top + e.height > t.top;
}
function b(e, t, n, r = 8) {
	let i = t.find((t) => y(e, t));
	if (!i) return null;
	let a = (e) => e.left >= n.left && e.left + e.width <= n.right && e.top >= n.top && e.top + e.height <= n.bottom && !t.some((t) => y(e, t)), o = [
		{
			...e,
			left: i.left - r - e.width
		},
		{
			...e,
			left: i.right + r
		},
		{
			...e,
			top: i.top - r - e.height
		}
	].find(a);
	return o ? {
		top: o.top,
		left: o.left
	} : null;
}
var x = 0;
function S({ trigger: l, open: d, onClose: f, placement: p = "bottom-start", offset: h = 6, className: _, zIndex: y = 9500, "data-testid": S = "inline-popover", "aria-label": C, "aria-labelledby": w, kind: T = "popover", avoidKeepouts: E = !1, focusOnOpen: D = "first", escapeScope: O = "window", trapFocus: k = !0, panelRole: A = "dialog", children: j }) {
	let M = a(null), [N, P] = o(null), [F, I] = o(y), L = a(!1), R = a(null), z = a(null), B = a(!1), V = t(d), H = a(0);
	d && H.current === 0 && (H.current = ++x), !d && H.current !== 0 && (H.current = 0);
	let U = n(() => {
		let e = l.current;
		if (!e) return;
		let t = e.getBoundingClientRect(), n = y;
		for (let t = e; t; t = t.parentElement) {
			let e = Number.parseInt(window.getComputedStyle(t).zIndex, 10);
			Number.isFinite(e) && (n = Math.max(n, e + 1));
		}
		I(n), L.current = !1, R.current = t, P(m(t, p, h));
	}, [
		l,
		p,
		h,
		y
	]);
	return i(() => {
		if (!d) {
			P(null);
			return;
		}
		U();
	}, [d, U]), i(() => {
		if (!d || !N || p === "sheet" || L.current) return;
		L.current = !0;
		let e = M.current;
		if (!e) return;
		let t = e.getBoundingClientRect();
		if (t.width === 0 && t.height === 0) return;
		let n = R.current, r = g(n, window.innerHeight), i = r - 16, a = t.top, o = t.left, s = !1, c = R.current;
		!(!p.startsWith("bottom") || !c) && t.bottom > r - 8 && c.top - h - t.height >= 8 ? (a = c.top - h - t.height, s = !0) : t.height > i ? (a = 8, s = !0) : t.bottom > r - 8 && (a = r - 8 - t.height, s = !0), a < 8 && (a = 8, s = !0);
		let u = v(l.current, window.innerWidth), f = u.left + 8, m = u.right - 8;
		if (t.right > m && (o = Math.max(f, m - t.width), s = !0), o < f && (o = f, s = !0), E) {
			let n = [];
			document.querySelectorAll("[data-uic-keepout]").forEach((t) => {
				if (l.current && t.contains(l.current) || e.contains(t)) return;
				let r = t.getBoundingClientRect();
				r.width > 0 && r.height > 0 && n.push(r);
			});
			let r = b({
				top: a,
				left: o,
				width: t.width,
				height: t.height
			}, n, {
				left: f,
				right: m,
				top: 8,
				bottom: window.innerHeight - 8
			}, 8);
			r && (a = r.top, o = r.left, s = !0);
		}
		s && P({
			position: "fixed",
			top: a,
			left: o,
			maxHeight: i,
			overflowY: "auto"
		});
	}, [
		d,
		N,
		E,
		p
	]), r(() => {
		if (!d || !N || typeof ResizeObserver > "u") return;
		let e = M.current;
		if (!e) return;
		let t = new ResizeObserver(() => {
			let t = e.getBoundingClientRect();
			(t.width !== 0 || t.height !== 0) && (t.top < 0 || t.bottom > window.innerHeight) && U();
		});
		return t.observe(e), () => t.disconnect();
	}, [
		d,
		N,
		U
	]), r(() => {
		if (!d) return;
		let e = () => U();
		return window.addEventListener("scroll", e, !0), window.addEventListener("resize", e), () => {
			window.removeEventListener("scroll", e, !0), window.removeEventListener("resize", e);
		};
	}, [d, U]), r(() => {
		if (!d) return;
		let e = typeof document < "u" ? document.activeElement : null;
		return z.current = e, B.current = !1, queueMicrotask(() => {
			if (D === "none") return;
			let e = M.current;
			if (!e) return;
			let t = u(e);
			t.length > 0 ? t[0].focus() : (e.setAttribute("tabindex", "-1"), e.focus());
		}), () => {
			let e = z.current, t = l.current, n = !!e && e !== document.body && document.contains(e), r = B.current;
			B.current = !1;
			let i = document.activeElement, a = !i || i === document.body || !document.contains(i), o = D === "none" && !a ? null : n ? e : r && t && document.contains(t) ? t : null;
			o && typeof o.focus == "function" && document.contains(o) && o.focus(), z.current = null;
		};
	}, [d]), r(() => {
		if (!d) return;
		let e = (e) => {
			if (e.key === "Escape") {
				if (!V() || O === "inside" && !(e.target instanceof Node && M.current?.contains(e.target))) return;
				e.stopPropagation(), B.current = !0, f();
				return;
			}
			if (e.key !== "Tab" || !k || !V()) return;
			let t = M.current;
			if (!t) return;
			let n = u(t);
			if (n.length === 0) {
				e.preventDefault();
				return;
			}
			let r = n[0], i = n[n.length - 1], a = document.activeElement;
			if (!a || !t.contains(a)) {
				e.preventDefault(), r.focus();
				return;
			}
			e.shiftKey && a === r ? (e.preventDefault(), i.focus()) : !e.shiftKey && a === i && (e.preventDefault(), r.focus());
		};
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, [
		d,
		f,
		V,
		O,
		k
	]), r(() => {
		if (!d || p === "sheet") return;
		let e = (e) => {
			let t = e.target;
			if (!t || M.current?.contains(t) || l.current?.contains(t)) return;
			let n = t.closest?.("[data-uic-popover-seq]");
			n && Number(n.getAttribute("data-uic-popover-seq")) > H.current || f();
		};
		return document.addEventListener("mousedown", e), () => document.removeEventListener("mousedown", e);
	}, [
		d,
		f,
		l,
		p
	]), !d || !N || typeof document > "u" ? null : c(/* @__PURE__ */ s("div", {
		ref: M,
		role: A === "dialog" ? "dialog" : void 0,
		"aria-label": A === "dialog" ? C : void 0,
		"aria-labelledby": A === "dialog" ? w : void 0,
		"data-testid": S,
		"data-placement": p,
		"data-ui-dialog": A === "dialog" ? T : void 0,
		"data-ui-popover": T,
		"data-uic-popover-seq": H.current || void 0,
		className: e("min-w-[160px] rounded-lg border border-border bg-surface", "shadow-lg p-1 text-sm text-text-primary", p === "sheet" && "overscroll-contain", _),
		style: {
			...N,
			zIndex: F
		},
		children: j
	}), document.body);
}
//#endregion
export { g as a, v as i, _ as n, h as r, S as t };
