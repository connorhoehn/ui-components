import { t as e } from "./cn-DhjIN-s0.js";
import { useEffect as t, useRef as n } from "react";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
import { createPortal as a } from "react-dom";
//#region src/components/shared/Modal.tsx
var o = [
	"a[href]",
	"button:not([disabled])",
	"input:not([disabled]):not([type=\"hidden\"])",
	"select:not([disabled])",
	"textarea:not([disabled])",
	"[tabindex]:not([tabindex=\"-1\"])",
	"[contenteditable=\"true\"]"
].join(",");
function s(e) {
	return Array.from(e.querySelectorAll(o)).filter((e) => e.getAttribute("aria-hidden") !== "true" && e.style.display !== "none" && e.style.visibility !== "hidden");
}
function c({ open: o, onClose: c, title: l, ariaLabel: u, maxWidth: d = 380, children: f, footer: p, backdropTestId: m = "modal-backdrop", backdropStyle: h, cardStyle: g, zIndex: _ = 1e4, rawChildren: v = !1 }) {
	let y = n(null), b = n(null);
	return t(() => {
		if (!o) return;
		let e = typeof document < "u" ? document.activeElement : null;
		b.current = e;
		let t = y.current;
		if (t) {
			let e = t.querySelector("[data-autofocus]");
			if (e) e.focus();
			else {
				let e = s(t);
				e.length > 0 ? e[0].focus() : (t.setAttribute("tabindex", "-1"), t.focus());
			}
		}
		return () => {
			let e = b.current;
			e && typeof e.focus == "function" && document.contains(e) && e.focus(), b.current = null;
		};
	}, [o]), t(() => {
		if (!o) return;
		let e = (e) => {
			if (e.key === "Escape") {
				c();
				return;
			}
			if (e.key !== "Tab") return;
			let t = y.current;
			if (!t) return;
			let n = s(t);
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
	}, [o, c]), o ? a(/* @__PURE__ */ r("div", {
		"data-testid": m,
		className: e("fixed inset-0 flex items-center justify-center bg-black/45"),
		style: {
			zIndex: _,
			...h
		},
		onClick: c,
		children: /* @__PURE__ */ i("div", {
			ref: y,
			role: "dialog",
			"aria-modal": "true",
			"aria-label": l ?? u,
			className: e("bg-white rounded-xl px-6 py-7 w-[90%] shadow-lg font-[inherit]"),
			style: {
				maxWidth: d,
				...g
			},
			onClick: (e) => e.stopPropagation(),
			children: [
				l && /* @__PURE__ */ r("div", {
					className: "text-base font-semibold text-text-primary mb-2.5",
					children: l
				}),
				v ? f : /* @__PURE__ */ r("div", {
					className: "text-[13px] text-text-secondary",
					children: f
				}),
				p && /* @__PURE__ */ r("div", {
					className: "flex gap-2 justify-end mt-5",
					children: p
				})
			]
		})
	}), document.body) : null;
}
//#endregion
export { c as t };
