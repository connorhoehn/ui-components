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
function c({ open: o, onClose: c, title: l, maxWidth: u = 380, children: d, footer: f, backdropTestId: p = "modal-backdrop", backdropStyle: m, cardStyle: h, zIndex: g = 1e4, rawChildren: _ = !1 }) {
	let v = n(null), y = n(null);
	return t(() => {
		if (!o) return;
		let e = typeof document < "u" ? document.activeElement : null;
		y.current = e;
		let t = v.current;
		if (t) {
			let e = t.querySelector("[data-autofocus]");
			if (e) e.focus();
			else {
				let e = s(t);
				e.length > 0 ? e[0].focus() : (t.setAttribute("tabindex", "-1"), t.focus());
			}
		}
		return () => {
			let e = y.current;
			e && typeof e.focus == "function" && document.contains(e) && e.focus(), y.current = null;
		};
	}, [o]), t(() => {
		if (!o) return;
		let e = (e) => {
			if (e.key === "Escape") {
				c();
				return;
			}
			if (e.key !== "Tab") return;
			let t = v.current;
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
		"data-testid": p,
		className: e("fixed inset-0 flex items-center justify-center bg-black/45"),
		style: {
			zIndex: g,
			...m
		},
		onClick: c,
		children: /* @__PURE__ */ i("div", {
			ref: v,
			role: "dialog",
			"aria-modal": "true",
			"aria-label": l,
			className: e("bg-white rounded-xl px-6 py-7 w-[90%] shadow-lg font-[inherit]"),
			style: {
				maxWidth: u,
				...h
			},
			onClick: (e) => e.stopPropagation(),
			children: [
				l && /* @__PURE__ */ r("div", {
					className: "text-base font-semibold text-text-primary mb-2.5",
					children: l
				}),
				_ ? d : /* @__PURE__ */ r("div", {
					className: "text-[13px] text-text-secondary",
					children: d
				}),
				f && /* @__PURE__ */ r("div", {
					className: "flex gap-2 justify-end mt-5",
					children: f
				})
			]
		})
	}), document.body) : null;
}
//#endregion
export { c as t };
