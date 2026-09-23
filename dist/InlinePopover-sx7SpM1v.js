import { t as e } from "./cn-DhjIN-s0.js";
import { t } from "./overlayStack-BDlo8PJg.js";
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
function d(e, t, n) {
	return t === "right" ? {
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
var f = "data-uic-keepout";
function p(e, t, n = document) {
	let r = t;
	return e && n.querySelectorAll(`[${f}="bottom"]`).forEach((t) => {
		let n = t.getBoundingClientRect();
		(n.height !== 0 || n.width !== 0) && n.top >= e.bottom && n.top < r && (r = n.top);
	}), r;
}
var m = 0;
function h({ trigger: l, open: f, onClose: h, placement: g = "bottom-start", offset: _ = 6, className: v, zIndex: y = 9500, "data-testid": b = "inline-popover", "aria-label": x, "aria-labelledby": S, children: C }) {
	let w = a(null), [T, E] = o(null), D = a(!1), O = a(null), k = a(null), A = t(f), j = a(0);
	f && j.current === 0 && (j.current = ++m), !f && j.current !== 0 && (j.current = 0);
	let M = n(() => {
		let e = l.current;
		if (!e) return;
		let t = e.getBoundingClientRect();
		D.current = !1, O.current = t, E(d(t, g, _));
	}, [
		l,
		g,
		_
	]);
	return i(() => {
		if (!f) {
			E(null);
			return;
		}
		M();
	}, [f, M]), i(() => {
		if (!f || !T || D.current) return;
		D.current = !0;
		let e = w.current;
		if (!e) return;
		let t = e.getBoundingClientRect();
		if (t.width === 0 && t.height === 0) return;
		let n = O.current, r = p(n, window.innerHeight), i = r - 16, a = t.top, o = t.left, s = !1, c = O.current;
		!(!g.startsWith("bottom") || !c) && t.bottom > r - 8 && c.top - _ - t.height >= 8 ? (a = c.top - _ - t.height, s = !0) : t.height > i ? (a = 8, s = !0) : t.bottom > r - 8 && (a = r - 8 - t.height, s = !0), a < 8 && (a = 8, s = !0), t.right > window.innerWidth - 8 && (o = Math.max(8, window.innerWidth - 8 - t.width), s = !0), o < 8 && (o = 8, s = !0), s && E({
			position: "fixed",
			top: a,
			left: o,
			maxHeight: i,
			overflowY: "auto"
		});
	}, [f, T]), r(() => {
		if (!f) return;
		let e = () => M();
		return window.addEventListener("scroll", e, !0), window.addEventListener("resize", e), () => {
			window.removeEventListener("scroll", e, !0), window.removeEventListener("resize", e);
		};
	}, [f, M]), r(() => {
		if (!f) return;
		let e = typeof document < "u" ? document.activeElement : null;
		return k.current = e, queueMicrotask(() => {
			let e = w.current;
			if (!e) return;
			let t = u(e);
			t.length > 0 ? t[0].focus() : (e.setAttribute("tabindex", "-1"), e.focus());
		}), () => {
			let e = k.current;
			e && typeof e.focus == "function" && document.contains(e) && e.focus(), k.current = null;
		};
	}, [f]), r(() => {
		if (!f) return;
		let e = (e) => {
			if (e.key === "Escape") {
				if (!A()) return;
				e.stopPropagation(), h();
				return;
			}
			if (e.key !== "Tab" || !A()) return;
			let t = w.current;
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
		f,
		h,
		A
	]), r(() => {
		if (!f) return;
		let e = (e) => {
			let t = e.target;
			if (!t || w.current?.contains(t) || l.current?.contains(t)) return;
			let n = t.closest?.("[data-uic-popover-seq]");
			n && Number(n.getAttribute("data-uic-popover-seq")) > j.current || h();
		};
		return document.addEventListener("mousedown", e), () => document.removeEventListener("mousedown", e);
	}, [
		f,
		h,
		l
	]), !f || !T || typeof document > "u" ? null : c(/* @__PURE__ */ s("div", {
		ref: w,
		role: "dialog",
		"aria-label": x,
		"aria-labelledby": S,
		"data-testid": b,
		"data-placement": g,
		"data-uic-popover-seq": j.current || void 0,
		className: e("min-w-[160px] rounded-lg border border-border bg-surface", "shadow-lg p-1 text-sm text-text-primary", v),
		style: {
			...T,
			zIndex: y
		},
		children: C
	}), document.body);
}
//#endregion
export { f as n, p as r, h as t };
