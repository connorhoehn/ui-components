import { t as e } from "./cn-D4QmbyEy.js";
import { t } from "./Button-BEOshFFZ.js";
import { t as n } from "./overlayStack-D0Hf2ZrU.js";
import { m as r } from "./Icons-B_xESAH3.js";
import { useCallback as i, useEffect as a, useId as o, useLayoutEffect as s, useRef as c, useState as l } from "react";
import { Fragment as u, jsx as d, jsxs as f } from "react/jsx-runtime";
import { createPortal as p } from "react-dom";
//#region src/components/shared/InlinePopover.tsx
var m = [
	"a[href]",
	"button:not([disabled])",
	"input:not([disabled]):not([type=\"hidden\"])",
	"select:not([disabled])",
	"textarea:not([disabled])",
	"[tabindex]:not([tabindex=\"-1\"])",
	"[contenteditable=\"true\"]"
].join(",");
function h(e) {
	return Array.from(e.querySelectorAll(m)).filter((e) => e.getAttribute("aria-hidden") !== "true");
}
var g = 240;
function _(e, t, n) {
	return t === "right" ? (typeof window < "u" ? window.innerWidth - e.right - n : Infinity) < g && e.left > g ? {
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
var v = "data-uic-keepout";
function y(e, t, n = document) {
	let r = t;
	return e && n.querySelectorAll(`[${v}="bottom"]`).forEach((t) => {
		let n = t.getBoundingClientRect();
		(n.height !== 0 || n.width !== 0) && n.top >= e.bottom && n.top < r && (r = n.top);
	}), r;
}
var b = "data-uic-popover-boundary";
function x(e, t) {
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
var S = 0;
function C({ trigger: t, open: r, onClose: o, placement: u = "bottom-start", offset: f = 6, className: m, zIndex: g = 9500, "data-testid": v = "inline-popover", "aria-label": b, "aria-labelledby": C, children: w }) {
	let T = c(null), [E, D] = l(null), O = c(!1), k = c(null), A = c(null), j = n(r), M = c(0);
	r && M.current === 0 && (M.current = ++S), !r && M.current !== 0 && (M.current = 0);
	let N = i(() => {
		let e = t.current;
		if (!e) return;
		let n = e.getBoundingClientRect();
		O.current = !1, k.current = n, D(_(n, u, f));
	}, [
		t,
		u,
		f
	]);
	return s(() => {
		if (!r) {
			D(null);
			return;
		}
		N();
	}, [r, N]), s(() => {
		if (!r || !E || O.current) return;
		O.current = !0;
		let e = T.current;
		if (!e) return;
		let n = e.getBoundingClientRect();
		if (n.width === 0 && n.height === 0) return;
		let i = k.current, a = y(i, window.innerHeight), o = a - 16, s = n.top, c = n.left, l = !1, d = k.current;
		!(!u.startsWith("bottom") || !d) && n.bottom > a - 8 && d.top - f - n.height >= 8 ? (s = d.top - f - n.height, l = !0) : n.height > o ? (s = 8, l = !0) : n.bottom > a - 8 && (s = a - 8 - n.height, l = !0), s < 8 && (s = 8, l = !0);
		let p = x(t.current, window.innerWidth), m = p.left + 8, h = p.right - 8;
		n.right > h && (c = Math.max(m, h - n.width), l = !0), c < m && (c = m, l = !0), l && D({
			position: "fixed",
			top: s,
			left: c,
			maxHeight: o,
			overflowY: "auto"
		});
	}, [r, E]), a(() => {
		if (!r) return;
		let e = () => N();
		return window.addEventListener("scroll", e, !0), window.addEventListener("resize", e), () => {
			window.removeEventListener("scroll", e, !0), window.removeEventListener("resize", e);
		};
	}, [r, N]), a(() => {
		if (!r) return;
		let e = typeof document < "u" ? document.activeElement : null;
		return A.current = e, queueMicrotask(() => {
			let e = T.current;
			if (!e) return;
			let t = h(e);
			t.length > 0 ? t[0].focus() : (e.setAttribute("tabindex", "-1"), e.focus());
		}), () => {
			let e = A.current;
			e && typeof e.focus == "function" && document.contains(e) && e.focus(), A.current = null;
		};
	}, [r]), a(() => {
		if (!r) return;
		let e = (e) => {
			if (e.key === "Escape") {
				if (!j()) return;
				e.stopPropagation(), o();
				return;
			}
			if (e.key !== "Tab" || !j()) return;
			let t = T.current;
			if (!t) return;
			let n = h(t);
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
		r,
		o,
		j
	]), a(() => {
		if (!r) return;
		let e = (e) => {
			let n = e.target;
			if (!n || T.current?.contains(n) || t.current?.contains(n)) return;
			let r = n.closest?.("[data-uic-popover-seq]");
			r && Number(r.getAttribute("data-uic-popover-seq")) > M.current || o();
		};
		return document.addEventListener("mousedown", e), () => document.removeEventListener("mousedown", e);
	}, [
		r,
		o,
		t
	]), !r || !E || typeof document > "u" ? null : p(/* @__PURE__ */ d("div", {
		ref: T,
		role: "dialog",
		"aria-label": b,
		"aria-labelledby": C,
		"data-testid": v,
		"data-placement": u,
		"data-uic-popover-seq": M.current || void 0,
		className: e("min-w-[160px] rounded-lg border border-border bg-surface", "shadow-lg p-1 text-sm text-text-primary", m),
		style: {
			...E,
			zIndex: g
		},
		children: w
	}), document.body);
}
//#endregion
//#region src/components/shared/DropdownMenu.tsx
var w = {
	default: "h-6.5 rounded-md border border-[var(--color-border)] px-2 text-base leading-none text-[var(--color-text-secondary)] bg-transparent hover:bg-[var(--color-surface-hover)]",
	primary: "h-9 rounded-lg border-none px-3.5 text-sm leading-none bg-primary text-on-primary hover:bg-primary-hover",
	secondary: "h-9 rounded-lg border border-border px-3.5 text-sm leading-none bg-surface text-text-primary hover:bg-surface-hover",
	link: "rounded px-1 py-0.5 border-none text-sm leading-none bg-transparent text-text-secondary hover:text-text-primary hover:bg-surface-hover"
}, T = {
	default: "bg-[var(--color-surface-hover)]",
	primary: "bg-primary-hover",
	secondary: "bg-surface-hover",
	link: "text-text-primary"
};
function E({ trigger: n, triggerLabel: r = "Open menu", triggerTitle: a, triggerClassName: o, triggerVariant: s = "default", triggerTabIndex: p, triggerTestId: m, align: h = "start", sections: g, className: _, "data-testid": v = "dropdown-menu" }) {
	let [y, b] = l(!1), x = c(null), S = c(null), E = i(() => b(!1), []), D = i((e) => {
		if (![
			"ArrowDown",
			"ArrowUp",
			"Home",
			"End"
		].includes(e.key)) return;
		let t = S.current;
		if (!t) return;
		let n = Array.from(t.querySelectorAll("[role=\"menuitem\"],[role=\"menuitemcheckbox\"]")).filter((e) => e.closest("[role=\"menu\"]") === t);
		if (n.length === 0) return;
		e.preventDefault();
		let r = n.indexOf(document.activeElement), i;
		i = e.key === "Home" ? 0 : e.key === "End" ? n.length - 1 : e.key === "ArrowDown" ? r < 0 ? 0 : (r + 1) % n.length : r <= 0 ? n.length - 1 : r - 1, n[i].focus();
	}, []);
	return /* @__PURE__ */ f(u, { children: [/* @__PURE__ */ d("button", {
		ref: x,
		type: "button",
		"aria-label": r,
		"aria-haspopup": "menu",
		"aria-expanded": y,
		title: a,
		tabIndex: p,
		"data-testid": m,
		onClick: () => b((e) => !e),
		"data-variant": s,
		className: e("inline-flex items-center justify-center gap-1.5 cursor-pointer transition-colors duration-100", t, w[s], y && T[s], o),
		children: n
	}), /* @__PURE__ */ d(C, {
		trigger: x,
		open: y,
		onClose: E,
		placement: h === "end" ? "bottom-end" : "bottom-start",
		className: e("min-w-[180px] p-0 overflow-hidden rounded-lg", _),
		"data-testid": v,
		children: /* @__PURE__ */ d("div", {
			ref: S,
			role: "menu",
			"aria-label": r,
			onKeyDown: D,
			className: "py-1 uic-menu-scroll",
			children: g.map((e, t) => /* @__PURE__ */ f("div", {
				role: "group",
				"aria-label": e.label,
				className: e.scroll ? "uic-menu-group-scroll" : void 0,
				"data-testid": e["data-testid"],
				children: [
					t > 0 && /* @__PURE__ */ d("div", {
						role: "separator",
						className: "my-1 border-t border-[var(--color-border)]"
					}),
					e.label && /* @__PURE__ */ d("div", {
						className: "px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-[var(--color-text-tertiary)]",
						children: e.label
					}),
					e.items.map((e, t) => /* @__PURE__ */ d(j, {
						item: e,
						close: E,
						testId: v
					}, t)),
					e.caption && /* @__PURE__ */ d(O, { text: e.caption })
				]
			}, t))
		})
	})] });
}
var D = "flex items-center gap-2.5 w-full text-left px-3.5 py-2 text-sm border-none cursor-pointer font-[inherit] transition-colors duration-100";
function O({ text: e }) {
	return /* @__PURE__ */ d("div", {
		className: "mt-1 border-t border-[var(--color-border)] px-3.5 pb-1 pt-2 text-xs text-[var(--color-text-tertiary)]",
		"data-menu-caption": "",
		children: e
	});
}
function k(e, t = !1) {
	return e.disabled ? "cursor-not-allowed text-[var(--color-text-tertiary)] bg-transparent" : e.danger ? "text-danger-fg bg-transparent hover:bg-danger-bg" : t ? "font-normal text-primary-fg bg-primary-bg" : e.active ? "font-semibold text-[var(--color-text-primary)] bg-[var(--color-surface-hover)]" : "font-normal text-[var(--color-text-primary)] bg-transparent hover:bg-[var(--color-surface-hover)]";
}
function A({ item: t, open: n = !1, labelId: i, reasonId: a }) {
	let o = t.disabled && t.disabledReason ? t.disabledReason : void 0, s = o ?? t.description;
	return /* @__PURE__ */ f(u, { children: [
		t.checked === void 0 ? t.icon ? /* @__PURE__ */ d("span", {
			className: e("flex w-4 shrink-0 items-center justify-center text-base leading-none", t.danger || n ? "text-current" : "text-[var(--color-text-secondary)]", t.disabled && "opacity-60"),
			"aria-hidden": "true",
			children: t.icon
		}) : null : /* @__PURE__ */ d("span", {
			className: e("flex w-4 shrink-0 items-center justify-center text-[var(--color-text-secondary)]", t.disabled && "opacity-60"),
			"aria-hidden": "true",
			children: t.checked ? "✓" : ""
		}),
		/* @__PURE__ */ f("span", {
			className: "flex min-w-0 flex-1 flex-col",
			children: [/* @__PURE__ */ d("span", {
				id: i,
				className: "truncate",
				children: t.label
			}), s && /* @__PURE__ */ d("span", {
				id: o ? a : void 0,
				"data-menu-disabled-reason": o ? "" : void 0,
				className: "truncate text-xs font-normal text-[var(--color-text-tertiary)]",
				children: s
			})]
		}),
		t.trailing !== void 0 && /* @__PURE__ */ d("span", {
			className: "shrink-0 text-xs text-[var(--color-text-tertiary)]",
			"aria-hidden": "true",
			children: t.trailing
		}),
		t.submenu && /* @__PURE__ */ d(r, {
			dir: "right",
			size: 14,
			className: e("shrink-0", n ? "text-current" : "text-[var(--color-text-tertiary)]")
		})
	] });
}
function j({ item: t, close: n, testId: r }) {
	let [i, s] = l(!1), p = c(null), m = c(null), h = c(null), g = () => {
		h.current &&= (clearTimeout(h.current), null);
	}, _ = () => {
		g(), h.current = setTimeout(() => s(!1), 180);
	};
	a(() => () => g(), []);
	let v = o(), y = !!(t.disabled && t.disabledReason);
	return !t.submenu || t.disabled ? /* @__PURE__ */ d("button", {
		type: "button",
		role: t.checked === void 0 ? "menuitem" : "menuitemcheckbox",
		"aria-checked": t.checked === void 0 ? void 0 : t.checked,
		"aria-current": t.active || void 0,
		"aria-disabled": t.disabled ? "true" : void 0,
		"aria-labelledby": y ? `${v}-label` : void 0,
		"aria-describedby": y ? `${v}-reason` : void 0,
		title: t.disabled ? t.disabledReason : void 0,
		onClick: () => {
			t.disabled || (t.onSelect?.(), n());
		},
		"data-testid": t["data-testid"],
		"data-disabled": t.disabled ? "" : void 0,
		className: e(D, k(t)),
		children: /* @__PURE__ */ d(A, {
			item: t,
			labelId: y ? `${v}-label` : void 0,
			reasonId: y ? `${v}-reason` : void 0
		})
	}) : /* @__PURE__ */ f(u, { children: [/* @__PURE__ */ d("button", {
		ref: p,
		type: "button",
		role: "menuitem",
		"aria-haspopup": "menu",
		"aria-expanded": i,
		onMouseEnter: () => {
			g(), s(!0);
		},
		onMouseLeave: _,
		onClick: () => s(!0),
		onKeyDown: (e) => {
			(e.key === "ArrowRight" || e.key === "Enter" || e.key === " ") && (e.preventDefault(), s(!0), setTimeout(() => m.current?.querySelector("[role=\"menuitem\"],[role=\"menuitemcheckbox\"]")?.focus(), 0));
		},
		"data-testid": t["data-testid"],
		className: e(D, k(t, i)),
		children: /* @__PURE__ */ d(A, {
			item: t,
			open: i
		})
	}), /* @__PURE__ */ d(C, {
		trigger: p,
		open: i,
		onClose: () => s(!1),
		placement: "right",
		offset: 2,
		className: "min-w-[200px] p-0 overflow-hidden rounded-lg",
		"data-testid": `${r}-submenu`,
		children: /* @__PURE__ */ d("div", {
			ref: m,
			role: "menu",
			"aria-label": t.label,
			className: "py-1 uic-menu-scroll",
			onMouseEnter: g,
			onMouseLeave: _,
			onKeyDown: (e) => {
				e.key === "ArrowLeft" && (e.preventDefault(), s(!1), p.current?.focus());
			},
			children: t.submenu.map((e, t) => /* @__PURE__ */ f("div", {
				role: "group",
				"aria-label": e.label,
				className: e.scroll ? "uic-menu-group-scroll" : void 0,
				"data-testid": e["data-testid"],
				children: [
					t > 0 && /* @__PURE__ */ d("div", {
						role: "separator",
						className: "my-1 border-t border-[var(--color-border)]"
					}),
					e.label && /* @__PURE__ */ d("div", {
						className: "px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-[var(--color-text-tertiary)]",
						children: e.label
					}),
					e.items.map((e, t) => /* @__PURE__ */ d(j, {
						item: e,
						close: n,
						testId: r
					}, t)),
					e.caption && /* @__PURE__ */ d(O, { text: e.caption })
				]
			}, t))
		})
	})] });
}
//#endregion
export { x as a, v as i, C as n, y as o, b as r, E as t };
