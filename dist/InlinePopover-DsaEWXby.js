import { t as e } from "./cn-DhjIN-s0.js";
import { t } from "./overlayStack-tmtTS-39.js";
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
	let S = a(null), [C, w] = o(null), T = a(null), E = t(f), D = n(() => {
		let e = l.current;
		if (!e) return;
		let t = e.getBoundingClientRect();
		w(d(t, m, h));
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
		D();
	}, [f, D]), r(() => {
		if (!f) return;
		let e = () => D();
		return window.addEventListener("scroll", e, !0), window.addEventListener("resize", e), () => {
			window.removeEventListener("scroll", e, !0), window.removeEventListener("resize", e);
		};
	}, [f, D]), r(() => {
		if (!f) return;
		let e = typeof document < "u" ? document.activeElement : null;
		return T.current = e, queueMicrotask(() => {
			let e = S.current;
			if (!e) return;
			let t = u(e);
			t.length > 0 ? t[0].focus() : (e.setAttribute("tabindex", "-1"), e.focus());
		}), () => {
			let e = T.current;
			e && typeof e.focus == "function" && document.contains(e) && e.focus(), T.current = null;
		};
	}, [f]), r(() => {
		if (!f) return;
		let e = (e) => {
			if (e.key === "Escape") {
				if (!E()) return;
				e.stopPropagation(), p();
				return;
			}
			if (e.key !== "Tab" || !E()) return;
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
		E
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
