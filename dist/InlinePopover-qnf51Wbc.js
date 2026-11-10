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
var d = 240;
function f(e, t, n) {
	return t === "right" ? (typeof window < "u" ? window.innerWidth - e.right - n : Infinity) < d && e.left > d ? {
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
var p = "data-uic-keepout";
function m(e, t, n = document) {
	let r = t;
	return e && n.querySelectorAll(`[${p}="bottom"]`).forEach((t) => {
		let n = t.getBoundingClientRect();
		(n.height !== 0 || n.width !== 0) && n.top >= e.bottom && n.top < r && (r = n.top);
	}), r;
}
var h = "data-uic-popover-boundary";
function g(e, t) {
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
function _(e, t) {
	return e.left < t.right && e.left + e.width > t.left && e.top < t.bottom && e.top + e.height > t.top;
}
function v(e, t, n, r = 8) {
	let i = t.find((t) => _(e, t));
	if (!i) return null;
	let a = (e) => e.left >= n.left && e.left + e.width <= n.right && e.top >= n.top && e.top + e.height <= n.bottom && !t.some((t) => _(e, t)), o = [
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
var y = 0;
function b({ trigger: l, open: d, onClose: p, placement: h = "bottom-start", offset: _ = 6, className: b, zIndex: x = 9500, "data-testid": S = "inline-popover", "aria-label": C, "aria-labelledby": w, kind: T = "popover", avoidKeepouts: E = !1, children: D }) {
	let O = a(null), [k, A] = o(null), [j, M] = o(x), N = a(!1), P = a(null), F = a(null), I = a(!1), L = t(d), R = a(0);
	d && R.current === 0 && (R.current = ++y), !d && R.current !== 0 && (R.current = 0);
	let z = n(() => {
		let e = l.current;
		if (!e) return;
		let t = e.getBoundingClientRect(), n = x;
		for (let t = e; t; t = t.parentElement) {
			let e = Number.parseInt(window.getComputedStyle(t).zIndex, 10);
			Number.isFinite(e) && (n = Math.max(n, e + 1));
		}
		M(n), N.current = !1, P.current = t, A(f(t, h, _));
	}, [
		l,
		h,
		_,
		x
	]);
	return i(() => {
		if (!d) {
			A(null);
			return;
		}
		z();
	}, [d, z]), i(() => {
		if (!d || !k || N.current) return;
		N.current = !0;
		let e = O.current;
		if (!e) return;
		let t = e.getBoundingClientRect();
		if (t.width === 0 && t.height === 0) return;
		let n = P.current, r = m(n, window.innerHeight), i = r - 16, a = t.top, o = t.left, s = !1, c = P.current;
		!(!h.startsWith("bottom") || !c) && t.bottom > r - 8 && c.top - _ - t.height >= 8 ? (a = c.top - _ - t.height, s = !0) : t.height > i ? (a = 8, s = !0) : t.bottom > r - 8 && (a = r - 8 - t.height, s = !0), a < 8 && (a = 8, s = !0);
		let u = g(l.current, window.innerWidth), f = u.left + 8, p = u.right - 8;
		if (t.right > p && (o = Math.max(f, p - t.width), s = !0), o < f && (o = f, s = !0), E) {
			let n = [];
			document.querySelectorAll("[data-uic-keepout]").forEach((t) => {
				if (l.current && t.contains(l.current) || e.contains(t)) return;
				let r = t.getBoundingClientRect();
				r.width > 0 && r.height > 0 && n.push(r);
			});
			let r = v({
				top: a,
				left: o,
				width: t.width,
				height: t.height
			}, n, {
				left: f,
				right: p,
				top: 8,
				bottom: window.innerHeight - 8
			}, 8);
			r && (a = r.top, o = r.left, s = !0);
		}
		s && A({
			position: "fixed",
			top: a,
			left: o,
			maxHeight: i,
			overflowY: "auto"
		});
	}, [
		d,
		k,
		E
	]), r(() => {
		if (!d || !k || typeof ResizeObserver > "u") return;
		let e = O.current;
		if (!e) return;
		let t = new ResizeObserver(() => {
			let t = e.getBoundingClientRect();
			(t.width !== 0 || t.height !== 0) && (t.top < 0 || t.bottom > window.innerHeight) && z();
		});
		return t.observe(e), () => t.disconnect();
	}, [
		d,
		k,
		z
	]), r(() => {
		if (!d) return;
		let e = () => z();
		return window.addEventListener("scroll", e, !0), window.addEventListener("resize", e), () => {
			window.removeEventListener("scroll", e, !0), window.removeEventListener("resize", e);
		};
	}, [d, z]), r(() => {
		if (!d) return;
		let e = typeof document < "u" ? document.activeElement : null;
		return F.current = e, I.current = !1, queueMicrotask(() => {
			let e = O.current;
			if (!e) return;
			let t = u(e);
			t.length > 0 ? t[0].focus() : (e.setAttribute("tabindex", "-1"), e.focus());
		}), () => {
			let e = F.current, t = l.current, n = !!e && e !== document.body && document.contains(e), r = I.current;
			I.current = !1;
			let i = n ? e : r && t && document.contains(t) ? t : null;
			i && typeof i.focus == "function" && document.contains(i) && i.focus(), F.current = null;
		};
	}, [d]), r(() => {
		if (!d) return;
		let e = (e) => {
			if (e.key === "Escape") {
				if (!L()) return;
				e.stopPropagation(), I.current = !0, p();
				return;
			}
			if (e.key !== "Tab" || !L()) return;
			let t = O.current;
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
		p,
		L
	]), r(() => {
		if (!d) return;
		let e = (e) => {
			let t = e.target;
			if (!t || O.current?.contains(t) || l.current?.contains(t)) return;
			let n = t.closest?.("[data-uic-popover-seq]");
			n && Number(n.getAttribute("data-uic-popover-seq")) > R.current || p();
		};
		return document.addEventListener("mousedown", e), () => document.removeEventListener("mousedown", e);
	}, [
		d,
		p,
		l
	]), !d || !k || typeof document > "u" ? null : c(/* @__PURE__ */ s("div", {
		ref: O,
		role: "dialog",
		"aria-label": C,
		"aria-labelledby": w,
		"data-testid": S,
		"data-placement": h,
		"data-ui-dialog": T,
		"data-uic-popover-seq": R.current || void 0,
		className: e("min-w-[160px] rounded-lg border border-border bg-surface", "shadow-lg p-1 text-sm text-text-primary", b),
		style: {
			...k,
			zIndex: j
		},
		children: D
	}), document.body);
}
//#endregion
export { m as a, g as i, h as n, p as r, b as t };
