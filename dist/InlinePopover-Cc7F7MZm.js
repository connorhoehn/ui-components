import { t as e } from "./cn-D4QmbyEy.js";
import { t } from "./overlayStack-D0Hf2ZrU.js";
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
var _ = 0;
function v({ trigger: l, open: d, onClose: p, placement: h = "bottom-start", offset: v = 6, className: y, zIndex: b = 9500, "data-testid": x = "inline-popover", "aria-label": S, "aria-labelledby": C, children: w }) {
	let T = a(null), [E, D] = o(null), O = a(!1), k = a(null), A = a(null), j = a(!1), M = t(d), N = a(0);
	d && N.current === 0 && (N.current = ++_), !d && N.current !== 0 && (N.current = 0);
	let P = n(() => {
		let e = l.current;
		if (!e) return;
		let t = e.getBoundingClientRect();
		O.current = !1, k.current = t, D(f(t, h, v));
	}, [
		l,
		h,
		v
	]);
	return i(() => {
		if (!d) {
			D(null);
			return;
		}
		P();
	}, [d, P]), i(() => {
		if (!d || !E || O.current) return;
		O.current = !0;
		let e = T.current;
		if (!e) return;
		let t = e.getBoundingClientRect();
		if (t.width === 0 && t.height === 0) return;
		let n = k.current, r = m(n, window.innerHeight), i = r - 16, a = t.top, o = t.left, s = !1, c = k.current;
		!(!h.startsWith("bottom") || !c) && t.bottom > r - 8 && c.top - v - t.height >= 8 ? (a = c.top - v - t.height, s = !0) : t.height > i ? (a = 8, s = !0) : t.bottom > r - 8 && (a = r - 8 - t.height, s = !0), a < 8 && (a = 8, s = !0);
		let u = g(l.current, window.innerWidth), f = u.left + 8, p = u.right - 8;
		t.right > p && (o = Math.max(f, p - t.width), s = !0), o < f && (o = f, s = !0), s && D({
			position: "fixed",
			top: a,
			left: o,
			maxHeight: i,
			overflowY: "auto"
		});
	}, [d, E]), r(() => {
		if (!d) return;
		let e = () => P();
		return window.addEventListener("scroll", e, !0), window.addEventListener("resize", e), () => {
			window.removeEventListener("scroll", e, !0), window.removeEventListener("resize", e);
		};
	}, [d, P]), r(() => {
		if (!d) return;
		let e = typeof document < "u" ? document.activeElement : null;
		return A.current = e, j.current = !1, queueMicrotask(() => {
			let e = T.current;
			if (!e) return;
			let t = u(e);
			t.length > 0 ? t[0].focus() : (e.setAttribute("tabindex", "-1"), e.focus());
		}), () => {
			let e = A.current, t = l.current, n = !!e && e !== document.body && document.contains(e), r = j.current;
			j.current = !1;
			let i = n ? e : r && t && document.contains(t) ? t : null;
			i && typeof i.focus == "function" && document.contains(i) && i.focus(), A.current = null;
		};
	}, [d]), r(() => {
		if (!d) return;
		let e = (e) => {
			if (e.key === "Escape") {
				if (!M()) return;
				e.stopPropagation(), j.current = !0, p();
				return;
			}
			if (e.key !== "Tab" || !M()) return;
			let t = T.current;
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
		M
	]), r(() => {
		if (!d) return;
		let e = (e) => {
			let t = e.target;
			if (!t || T.current?.contains(t) || l.current?.contains(t)) return;
			let n = t.closest?.("[data-uic-popover-seq]");
			n && Number(n.getAttribute("data-uic-popover-seq")) > N.current || p();
		};
		return document.addEventListener("mousedown", e), () => document.removeEventListener("mousedown", e);
	}, [
		d,
		p,
		l
	]), !d || !E || typeof document > "u" ? null : c(/* @__PURE__ */ s("div", {
		ref: T,
		role: "dialog",
		"aria-label": S,
		"aria-labelledby": C,
		"data-testid": x,
		"data-placement": h,
		"data-uic-popover-seq": N.current || void 0,
		className: e("min-w-[160px] rounded-lg border border-border bg-surface", "shadow-lg p-1 text-sm text-text-primary", y),
		style: {
			...E,
			zIndex: b
		},
		children: w
	}), document.body);
}
//#endregion
export { m as a, g as i, h as n, p as r, v as t };
