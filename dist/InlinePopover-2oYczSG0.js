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
function f({ trigger: l, open: f, onClose: p, placement: m = "bottom-start", offset: h = 6, className: g, zIndex: _ = 9500, "data-testid": v = "inline-popover", "aria-label": y, "aria-labelledby": b, children: x }) {
	let S = a(null), [C, w] = o(null), T = a(!1), E = a(null), D = a(null), O = t(f), k = n(() => {
		let e = l.current;
		if (!e) return;
		let t = e.getBoundingClientRect();
		T.current = !1, E.current = t, w(d(t, m, h));
	}, [
		l,
		m,
		h
	]);
	return i(() => {
		if (!f) {
			w(null);
			return;
		}
		k();
	}, [f, k]), i(() => {
		if (!f || !C || T.current) return;
		T.current = !0;
		let e = S.current;
		if (!e) return;
		let t = e.getBoundingClientRect();
		if (t.width === 0 && t.height === 0) return;
		let n = window.innerHeight - 16, r = t.top, i = t.left, a = !1, o = E.current;
		!(!m.startsWith("bottom") || !o) && t.bottom > window.innerHeight - 8 && o.top - h - t.height >= 8 ? (r = o.top - h - t.height, a = !0) : t.height > n ? (r = 8, a = !0) : t.bottom > window.innerHeight - 8 && (r = window.innerHeight - 8 - t.height, a = !0), r < 8 && (r = 8, a = !0), t.right > window.innerWidth - 8 && (i = Math.max(8, window.innerWidth - 8 - t.width), a = !0), i < 8 && (i = 8, a = !0), a && w({
			position: "fixed",
			top: r,
			left: i,
			maxHeight: n,
			overflowY: "auto"
		});
	}, [f, C]), r(() => {
		if (!f) return;
		let e = () => k();
		return window.addEventListener("scroll", e, !0), window.addEventListener("resize", e), () => {
			window.removeEventListener("scroll", e, !0), window.removeEventListener("resize", e);
		};
	}, [f, k]), r(() => {
		if (!f) return;
		let e = typeof document < "u" ? document.activeElement : null;
		return D.current = e, queueMicrotask(() => {
			let e = S.current;
			if (!e) return;
			let t = u(e);
			t.length > 0 ? t[0].focus() : (e.setAttribute("tabindex", "-1"), e.focus());
		}), () => {
			let e = D.current;
			e && typeof e.focus == "function" && document.contains(e) && e.focus(), D.current = null;
		};
	}, [f]), r(() => {
		if (!f) return;
		let e = (e) => {
			if (e.key === "Escape") {
				if (!O()) return;
				e.stopPropagation(), p();
				return;
			}
			if (e.key !== "Tab" || !O()) return;
			let t = S.current;
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
		p,
		O
	]), r(() => {
		if (!f) return;
		let e = (e) => {
			let t = e.target;
			t && (S.current?.contains(t) || l.current?.contains(t) || p());
		};
		return document.addEventListener("mousedown", e), () => document.removeEventListener("mousedown", e);
	}, [
		f,
		p,
		l
	]), !f || !C || typeof document > "u" ? null : c(/* @__PURE__ */ s("div", {
		ref: S,
		role: "dialog",
		"aria-label": y,
		"aria-labelledby": b,
		"data-testid": v,
		"data-placement": m,
		className: e("min-w-[160px] rounded-lg border border-border bg-surface", "shadow-lg p-1 text-sm text-text-primary", g),
		style: {
			...C,
			zIndex: _
		},
		children: x
	}), document.body);
}
//#endregion
export { f as t };
