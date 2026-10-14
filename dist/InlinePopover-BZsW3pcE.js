import { t as e } from "./cn-D4QmbyEy.js";
import { t } from "./overlayStack-C0EBgmzL.js";
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
function v({ trigger: l, open: d, onClose: p, placement: h = "bottom-start", offset: v = 6, className: y, zIndex: b = 9500, "data-testid": x = "inline-popover", "aria-label": S, "aria-labelledby": C, kind: w = "popover", children: T }) {
	let E = a(null), [D, O] = o(null), k = a(!1), A = a(null), j = a(null), M = a(!1), N = t(d), P = a(0);
	d && P.current === 0 && (P.current = ++_), !d && P.current !== 0 && (P.current = 0);
	let F = n(() => {
		let e = l.current;
		if (!e) return;
		let t = e.getBoundingClientRect();
		k.current = !1, A.current = t, O(f(t, h, v));
	}, [
		l,
		h,
		v
	]);
	return i(() => {
		if (!d) {
			O(null);
			return;
		}
		F();
	}, [d, F]), i(() => {
		if (!d || !D || k.current) return;
		k.current = !0;
		let e = E.current;
		if (!e) return;
		let t = e.getBoundingClientRect();
		if (t.width === 0 && t.height === 0) return;
		let n = A.current, r = m(n, window.innerHeight), i = r - 16, a = t.top, o = t.left, s = !1, c = A.current;
		!(!h.startsWith("bottom") || !c) && t.bottom > r - 8 && c.top - v - t.height >= 8 ? (a = c.top - v - t.height, s = !0) : t.height > i ? (a = 8, s = !0) : t.bottom > r - 8 && (a = r - 8 - t.height, s = !0), a < 8 && (a = 8, s = !0);
		let u = g(l.current, window.innerWidth), f = u.left + 8, p = u.right - 8;
		t.right > p && (o = Math.max(f, p - t.width), s = !0), o < f && (o = f, s = !0), s && O({
			position: "fixed",
			top: a,
			left: o,
			maxHeight: i,
			overflowY: "auto"
		});
	}, [d, D]), r(() => {
		if (!d) return;
		let e = () => F();
		return window.addEventListener("scroll", e, !0), window.addEventListener("resize", e), () => {
			window.removeEventListener("scroll", e, !0), window.removeEventListener("resize", e);
		};
	}, [d, F]), r(() => {
		if (!d) return;
		let e = typeof document < "u" ? document.activeElement : null;
		return j.current = e, M.current = !1, queueMicrotask(() => {
			let e = E.current;
			if (!e) return;
			let t = u(e);
			t.length > 0 ? t[0].focus() : (e.setAttribute("tabindex", "-1"), e.focus());
		}), () => {
			let e = j.current, t = l.current, n = !!e && e !== document.body && document.contains(e), r = M.current;
			M.current = !1;
			let i = n ? e : r && t && document.contains(t) ? t : null;
			i && typeof i.focus == "function" && document.contains(i) && i.focus(), j.current = null;
		};
	}, [d]), r(() => {
		if (!d) return;
		let e = (e) => {
			if (e.key === "Escape") {
				if (!N()) return;
				e.stopPropagation(), M.current = !0, p();
				return;
			}
			if (e.key !== "Tab" || !N()) return;
			let t = E.current;
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
		N
	]), r(() => {
		if (!d) return;
		let e = (e) => {
			let t = e.target;
			if (!t || E.current?.contains(t) || l.current?.contains(t)) return;
			let n = t.closest?.("[data-uic-popover-seq]");
			n && Number(n.getAttribute("data-uic-popover-seq")) > P.current || p();
		};
		return document.addEventListener("mousedown", e), () => document.removeEventListener("mousedown", e);
	}, [
		d,
		p,
		l
	]), !d || !D || typeof document > "u" ? null : c(/* @__PURE__ */ s("div", {
		ref: E,
		role: "dialog",
		"aria-label": S,
		"aria-labelledby": C,
		"data-testid": x,
		"data-placement": h,
		"data-ui-dialog": w,
		"data-uic-popover-seq": P.current || void 0,
		className: e("min-w-[160px] rounded-lg border border-border bg-surface", "shadow-lg p-1 text-sm text-text-primary", y),
		style: {
			...D,
			zIndex: b
		},
		children: T
	}), document.body);
}
//#endregion
export { m as a, g as i, h as n, p as r, v as t };
