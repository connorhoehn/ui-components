import { t as e } from "./cn-DhjIN-s0.js";
import { t } from "./overlayStack-BFH9XXvN.js";
import { useEffect as n, useRef as r } from "react";
import { jsx as i, jsxs as a } from "react/jsx-runtime";
import { createPortal as o } from "react-dom";
//#region src/components/shared/Modal.tsx
var s = [
	"a[href]",
	"button:not([disabled])",
	"input:not([disabled]):not([type=\"hidden\"])",
	"select:not([disabled])",
	"textarea:not([disabled])",
	"[tabindex]:not([tabindex=\"-1\"])",
	"[contenteditable=\"true\"]"
].join(",");
function c(e) {
	return Array.from(e.querySelectorAll(s)).filter((e) => e.getAttribute("aria-hidden") !== "true" && e.style.display !== "none" && e.style.visibility !== "hidden");
}
function l({ open: s, onClose: l, title: u, ariaLabel: d, maxWidth: f = 380, children: p, footer: m, backdropTestId: h = "modal-backdrop", backdropStyle: g, cardStyle: _, zIndex: v = 1e4, rawChildren: y = !1 }) {
	let b = r(null), x = r(null), S = t(s);
	return n(() => {
		if (!s) return;
		let e = typeof document < "u" ? document.activeElement : null;
		x.current = e;
		let t = b.current;
		if (t) {
			let e = t.querySelector("[data-autofocus]");
			if (e) e.focus();
			else {
				let e = c(t);
				e.length > 0 ? e[0].focus() : (t.setAttribute("tabindex", "-1"), t.focus());
			}
		}
		return () => {
			let e = x.current;
			e && typeof e.focus == "function" && document.contains(e) && e.focus(), x.current = null;
		};
	}, [s]), n(() => {
		if (!s) return;
		let e = (e) => {
			if (e.key === "Escape") {
				S() && l();
				return;
			}
			if (e.key !== "Tab" || !S()) return;
			let t = b.current;
			if (!t) return;
			let n = c(t);
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
		s,
		l,
		S
	]), s ? o(/* @__PURE__ */ i("div", {
		"data-testid": h,
		className: e("fixed inset-0 flex items-center justify-center bg-black/45"),
		style: {
			zIndex: v,
			...g
		},
		onClick: l,
		children: /* @__PURE__ */ a("div", {
			ref: b,
			role: "dialog",
			"aria-modal": "true",
			"aria-label": u ?? d,
			className: e("bg-white rounded-xl px-6 py-7 w-[90%] shadow-lg font-[inherit]"),
			style: {
				maxWidth: f,
				..._
			},
			onClick: (e) => e.stopPropagation(),
			children: [
				u && /* @__PURE__ */ i("div", {
					className: "text-base font-semibold text-text-primary mb-2.5",
					children: u
				}),
				y ? p : /* @__PURE__ */ i("div", {
					className: "text-[13px] text-text-secondary",
					children: p
				}),
				m && /* @__PURE__ */ i("div", {
					className: "flex gap-2 justify-end mt-5",
					children: m
				})
			]
		})
	}), document.body) : null;
}
//#endregion
export { l as t };
