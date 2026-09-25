import { t as e } from "./cn-DhjIN-s0.js";
import { d as t } from "./Icons-rzhVAphQ.js";
import { t as n } from "./InlinePopover-D102uoo1.js";
import { useCallback as r, useEffect as i, useRef as a, useState as o } from "react";
import { Fragment as s, jsx as c, jsxs as l } from "react/jsx-runtime";
//#region src/components/shared/DropdownMenu.tsx
var u = {
	default: "rounded-md border border-[var(--color-border)] px-2 py-1 text-base leading-none text-[var(--color-text-secondary)] bg-transparent hover:bg-[var(--color-surface-hover)]",
	primary: "h-9 rounded-lg border-none px-3.5 text-[15px] font-semibold leading-none bg-primary text-on-primary hover:bg-primary-hover",
	secondary: "h-9 rounded-lg border border-border px-3.5 text-[15px] font-medium leading-none bg-surface text-text-primary hover:bg-surface-hover",
	link: "rounded px-1 py-0.5 border-none text-sm leading-none bg-transparent text-text-secondary hover:text-text-primary hover:bg-surface-hover"
}, d = {
	default: "bg-[var(--color-surface-hover)]",
	primary: "bg-primary-hover",
	secondary: "bg-surface-hover",
	link: "text-text-primary"
};
function f({ trigger: t, triggerLabel: i = "Open menu", triggerTitle: f, triggerClassName: p, triggerVariant: m = "default", triggerTabIndex: h, triggerTestId: _, align: v = "start", sections: y, className: b, "data-testid": x = "dropdown-menu" }) {
	let [S, C] = o(!1), w = a(null), T = a(null), E = r(() => C(!1), []), D = r((e) => {
		if (![
			"ArrowDown",
			"ArrowUp",
			"Home",
			"End"
		].includes(e.key)) return;
		let t = T.current;
		if (!t) return;
		let n = Array.from(t.querySelectorAll("[role=\"menuitem\"]"));
		if (n.length === 0) return;
		e.preventDefault();
		let r = n.indexOf(document.activeElement), i;
		i = e.key === "Home" ? 0 : e.key === "End" ? n.length - 1 : e.key === "ArrowDown" ? r < 0 ? 0 : (r + 1) % n.length : r <= 0 ? n.length - 1 : r - 1, n[i].focus();
	}, []);
	return /* @__PURE__ */ l(s, { children: [/* @__PURE__ */ c("button", {
		ref: w,
		type: "button",
		"aria-label": i,
		"aria-haspopup": "menu",
		"aria-expanded": S,
		title: f,
		tabIndex: h,
		"data-testid": _,
		onClick: () => C((e) => !e),
		"data-variant": m,
		className: e("inline-flex items-center justify-center gap-1.5 cursor-pointer transition-colors duration-100", u[m], S && d[m], p),
		children: t
	}), /* @__PURE__ */ c(n, {
		trigger: w,
		open: S,
		onClose: E,
		placement: v === "end" ? "bottom-end" : "bottom-start",
		className: e("min-w-[180px] p-0 overflow-hidden rounded-lg", b),
		"data-testid": x,
		children: /* @__PURE__ */ c("div", {
			ref: T,
			role: "menu",
			"aria-label": i,
			onKeyDown: D,
			className: "py-1 uic-menu-scroll",
			children: y.map((e, t) => /* @__PURE__ */ l("div", {
				role: "group",
				"aria-label": e.label,
				className: e.scroll ? "uic-menu-group-scroll" : void 0,
				"data-testid": e["data-testid"],
				children: [
					t > 0 && /* @__PURE__ */ c("div", {
						role: "separator",
						className: "my-1 border-t border-[var(--color-border)]"
					}),
					e.label && /* @__PURE__ */ c("div", {
						className: "px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-[var(--color-text-tertiary)]",
						children: e.label
					}),
					e.items.map((e, t) => /* @__PURE__ */ c(g, {
						item: e,
						close: E,
						testId: x
					}, t))
				]
			}, t))
		})
	})] });
}
var p = "flex items-center gap-2.5 w-full text-left px-3.5 py-2 text-sm border-none cursor-pointer font-[inherit] transition-colors duration-100";
function m(e, t = !1) {
	return e.danger ? "text-danger-fg bg-transparent hover:bg-danger-bg" : e.active || t ? "font-semibold text-[var(--color-text-primary)] bg-[var(--color-surface-hover)]" : "font-normal text-[var(--color-text-primary)] bg-transparent hover:bg-[var(--color-surface-hover)]";
}
function h({ item: e }) {
	return /* @__PURE__ */ l(s, { children: [
		e.checked === void 0 ? e.icon ? /* @__PURE__ */ c("span", {
			className: "flex w-4 shrink-0 items-center justify-center text-base leading-none text-[var(--color-text-secondary)]",
			"aria-hidden": "true",
			children: e.icon
		}) : null : /* @__PURE__ */ c("span", {
			className: "flex w-4 shrink-0 items-center justify-center text-[var(--color-text-secondary)]",
			"aria-hidden": "true",
			children: e.checked ? "✓" : ""
		}),
		/* @__PURE__ */ l("span", {
			className: "flex min-w-0 flex-1 flex-col",
			children: [/* @__PURE__ */ c("span", {
				className: "truncate",
				children: e.label
			}), e.description && /* @__PURE__ */ c("span", {
				className: "truncate text-xs font-normal text-[var(--color-text-tertiary)]",
				children: e.description
			})]
		}),
		e.trailing !== void 0 && /* @__PURE__ */ c("span", {
			className: "shrink-0 text-xs text-[var(--color-text-tertiary)]",
			"aria-hidden": "true",
			children: e.trailing
		}),
		e.submenu && /* @__PURE__ */ c(t, {
			dir: "right",
			size: 14,
			className: "shrink-0 text-[var(--color-text-tertiary)]"
		})
	] });
}
function g({ item: t, close: r, testId: u }) {
	let [d, f] = o(!1), _ = a(null), v = a(null), y = a(null), b = () => {
		y.current &&= (clearTimeout(y.current), null);
	}, x = () => {
		b(), y.current = setTimeout(() => f(!1), 180);
	};
	return i(() => () => b(), []), t.submenu ? /* @__PURE__ */ l(s, { children: [/* @__PURE__ */ c("button", {
		ref: _,
		type: "button",
		role: "menuitem",
		"aria-haspopup": "menu",
		"aria-expanded": d,
		onMouseEnter: () => {
			b(), f(!0);
		},
		onMouseLeave: x,
		onClick: () => f(!0),
		onKeyDown: (e) => {
			(e.key === "ArrowRight" || e.key === "Enter" || e.key === " ") && (e.preventDefault(), f(!0), setTimeout(() => v.current?.querySelector("[role=\"menuitem\"],[role=\"menuitemcheckbox\"]")?.focus(), 0));
		},
		"data-testid": t["data-testid"],
		className: e(p, m(t, d)),
		children: /* @__PURE__ */ c(h, { item: t })
	}), /* @__PURE__ */ c(n, {
		trigger: _,
		open: d,
		onClose: () => f(!1),
		placement: "right",
		offset: 2,
		className: "min-w-[200px] p-0 overflow-hidden rounded-lg",
		"data-testid": `${u}-submenu`,
		children: /* @__PURE__ */ c("div", {
			ref: v,
			role: "menu",
			"aria-label": t.label,
			className: "py-1 uic-menu-scroll",
			onMouseEnter: b,
			onMouseLeave: x,
			onKeyDown: (e) => {
				e.key === "ArrowLeft" && (e.preventDefault(), f(!1), _.current?.focus());
			},
			children: t.submenu.map((e, t) => /* @__PURE__ */ l("div", {
				role: "group",
				"aria-label": e.label,
				className: e.scroll ? "uic-menu-group-scroll" : void 0,
				"data-testid": e["data-testid"],
				children: [
					t > 0 && /* @__PURE__ */ c("div", {
						role: "separator",
						className: "my-1 border-t border-[var(--color-border)]"
					}),
					e.label && /* @__PURE__ */ c("div", {
						className: "px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-[var(--color-text-tertiary)]",
						children: e.label
					}),
					e.items.map((e, t) => /* @__PURE__ */ c(g, {
						item: e,
						close: r,
						testId: u
					}, t))
				]
			}, t))
		})
	})] }) : /* @__PURE__ */ c("button", {
		type: "button",
		role: t.checked === void 0 ? "menuitem" : "menuitemcheckbox",
		"aria-checked": t.checked === void 0 ? void 0 : t.checked,
		"aria-current": t.active || void 0,
		onClick: () => {
			t.onSelect?.(), r();
		},
		"data-testid": t["data-testid"],
		className: e(p, m(t)),
		children: /* @__PURE__ */ c(h, { item: t })
	});
}
//#endregion
export { f as t };
