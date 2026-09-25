import { t as e } from "./cn-DhjIN-s0.js";
import { f as t } from "./Icons-BSEVGRI6.js";
import { t as n } from "./InlinePopover-DtYo8_ZC.js";
import { useCallback as r, useEffect as i, useId as a, useRef as o, useState as s } from "react";
import { Fragment as c, jsx as l, jsxs as u } from "react/jsx-runtime";
//#region src/components/shared/DropdownMenu.tsx
var d = {
	default: "rounded-md border border-[var(--color-border)] px-2 py-1 text-base leading-none text-[var(--color-text-secondary)] bg-transparent hover:bg-[var(--color-surface-hover)]",
	primary: "h-9 rounded-lg border-none px-3.5 text-[15px] font-semibold leading-none bg-primary text-on-primary hover:bg-primary-hover",
	secondary: "h-9 rounded-lg border border-border px-3.5 text-[15px] font-medium leading-none bg-surface text-text-primary hover:bg-surface-hover",
	link: "rounded px-1 py-0.5 border-none text-sm leading-none bg-transparent text-text-secondary hover:text-text-primary hover:bg-surface-hover"
}, f = {
	default: "bg-[var(--color-surface-hover)]",
	primary: "bg-primary-hover",
	secondary: "bg-surface-hover",
	link: "text-text-primary"
};
function p({ trigger: t, triggerLabel: i = "Open menu", triggerTitle: a, triggerClassName: p, triggerVariant: m = "default", triggerTabIndex: g, triggerTestId: _, align: y = "start", sections: b, className: x, "data-testid": S = "dropdown-menu" }) {
	let [C, w] = s(!1), T = o(null), E = o(null), D = r(() => w(!1), []), O = r((e) => {
		if (![
			"ArrowDown",
			"ArrowUp",
			"Home",
			"End"
		].includes(e.key)) return;
		let t = E.current;
		if (!t) return;
		let n = Array.from(t.querySelectorAll("[role=\"menuitem\"],[role=\"menuitemcheckbox\"]")).filter((e) => e.closest("[role=\"menu\"]") === t);
		if (n.length === 0) return;
		e.preventDefault();
		let r = n.indexOf(document.activeElement), i;
		i = e.key === "Home" ? 0 : e.key === "End" ? n.length - 1 : e.key === "ArrowDown" ? r < 0 ? 0 : (r + 1) % n.length : r <= 0 ? n.length - 1 : r - 1, n[i].focus();
	}, []);
	return /* @__PURE__ */ u(c, { children: [/* @__PURE__ */ l("button", {
		ref: T,
		type: "button",
		"aria-label": i,
		"aria-haspopup": "menu",
		"aria-expanded": C,
		title: a,
		tabIndex: g,
		"data-testid": _,
		onClick: () => w((e) => !e),
		"data-variant": m,
		className: e("inline-flex items-center justify-center gap-1.5 cursor-pointer transition-colors duration-100", d[m], C && f[m], p),
		children: t
	}), /* @__PURE__ */ l(n, {
		trigger: T,
		open: C,
		onClose: D,
		placement: y === "end" ? "bottom-end" : "bottom-start",
		className: e("min-w-[180px] p-0 overflow-hidden rounded-lg", x),
		"data-testid": S,
		children: /* @__PURE__ */ l("div", {
			ref: E,
			role: "menu",
			"aria-label": i,
			onKeyDown: O,
			className: "py-1 uic-menu-scroll",
			children: b.map((e, t) => /* @__PURE__ */ u("div", {
				role: "group",
				"aria-label": e.label,
				className: e.scroll ? "uic-menu-group-scroll" : void 0,
				"data-testid": e["data-testid"],
				children: [
					t > 0 && /* @__PURE__ */ l("div", {
						role: "separator",
						className: "my-1 border-t border-[var(--color-border)]"
					}),
					e.label && /* @__PURE__ */ l("div", {
						className: "px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-[var(--color-text-tertiary)]",
						children: e.label
					}),
					e.items.map((e, t) => /* @__PURE__ */ l(v, {
						item: e,
						close: D,
						testId: S
					}, t)),
					e.caption && /* @__PURE__ */ l(h, { text: e.caption })
				]
			}, t))
		})
	})] });
}
var m = "flex items-center gap-2.5 w-full text-left px-3.5 py-2 text-sm border-none cursor-pointer font-[inherit] transition-colors duration-100";
function h({ text: e }) {
	return /* @__PURE__ */ l("div", {
		className: "mt-1 border-t border-[var(--color-border)] px-3.5 pb-1 pt-2 text-xs text-[var(--color-text-tertiary)]",
		"data-menu-caption": "",
		children: e
	});
}
function g(e, t = !1) {
	return e.disabled ? "cursor-not-allowed text-[var(--color-text-tertiary)] bg-transparent" : e.danger ? "text-danger-fg bg-transparent hover:bg-danger-bg" : t ? "font-normal text-primary-fg bg-primary-bg" : e.active ? "font-semibold text-[var(--color-text-primary)] bg-[var(--color-surface-hover)]" : "font-normal text-[var(--color-text-primary)] bg-transparent hover:bg-[var(--color-surface-hover)]";
}
function _({ item: n, open: r = !1, labelId: i, reasonId: a }) {
	let o = n.disabled && n.disabledReason ? n.disabledReason : void 0, s = o ?? n.description;
	return /* @__PURE__ */ u(c, { children: [
		n.checked === void 0 ? n.icon ? /* @__PURE__ */ l("span", {
			className: e("flex w-4 shrink-0 items-center justify-center text-base leading-none", n.danger || r ? "text-current" : "text-[var(--color-text-secondary)]", n.disabled && "opacity-60"),
			"aria-hidden": "true",
			children: n.icon
		}) : null : /* @__PURE__ */ l("span", {
			className: e("flex w-4 shrink-0 items-center justify-center text-[var(--color-text-secondary)]", n.disabled && "opacity-60"),
			"aria-hidden": "true",
			children: n.checked ? "✓" : ""
		}),
		/* @__PURE__ */ u("span", {
			className: "flex min-w-0 flex-1 flex-col",
			children: [/* @__PURE__ */ l("span", {
				id: i,
				className: "truncate",
				children: n.label
			}), s && /* @__PURE__ */ l("span", {
				id: o ? a : void 0,
				"data-menu-disabled-reason": o ? "" : void 0,
				className: "truncate text-xs font-normal text-[var(--color-text-tertiary)]",
				children: s
			})]
		}),
		n.trailing !== void 0 && /* @__PURE__ */ l("span", {
			className: "shrink-0 text-xs text-[var(--color-text-tertiary)]",
			"aria-hidden": "true",
			children: n.trailing
		}),
		n.submenu && /* @__PURE__ */ l(t, {
			dir: "right",
			size: 14,
			className: e("shrink-0", r ? "text-current" : "text-[var(--color-text-tertiary)]")
		})
	] });
}
function v({ item: t, close: r, testId: d }) {
	let [f, p] = s(!1), y = o(null), b = o(null), x = o(null), S = () => {
		x.current &&= (clearTimeout(x.current), null);
	}, C = () => {
		S(), x.current = setTimeout(() => p(!1), 180);
	};
	i(() => () => S(), []);
	let w = a(), T = !!(t.disabled && t.disabledReason);
	return !t.submenu || t.disabled ? /* @__PURE__ */ l("button", {
		type: "button",
		role: t.checked === void 0 ? "menuitem" : "menuitemcheckbox",
		"aria-checked": t.checked === void 0 ? void 0 : t.checked,
		"aria-current": t.active || void 0,
		"aria-disabled": t.disabled ? "true" : void 0,
		"aria-labelledby": T ? `${w}-label` : void 0,
		"aria-describedby": T ? `${w}-reason` : void 0,
		title: t.disabled ? t.disabledReason : void 0,
		onClick: () => {
			t.disabled || (t.onSelect?.(), r());
		},
		"data-testid": t["data-testid"],
		"data-disabled": t.disabled ? "" : void 0,
		className: e(m, g(t)),
		children: /* @__PURE__ */ l(_, {
			item: t,
			labelId: T ? `${w}-label` : void 0,
			reasonId: T ? `${w}-reason` : void 0
		})
	}) : /* @__PURE__ */ u(c, { children: [/* @__PURE__ */ l("button", {
		ref: y,
		type: "button",
		role: "menuitem",
		"aria-haspopup": "menu",
		"aria-expanded": f,
		onMouseEnter: () => {
			S(), p(!0);
		},
		onMouseLeave: C,
		onClick: () => p(!0),
		onKeyDown: (e) => {
			(e.key === "ArrowRight" || e.key === "Enter" || e.key === " ") && (e.preventDefault(), p(!0), setTimeout(() => b.current?.querySelector("[role=\"menuitem\"],[role=\"menuitemcheckbox\"]")?.focus(), 0));
		},
		"data-testid": t["data-testid"],
		className: e(m, g(t, f)),
		children: /* @__PURE__ */ l(_, {
			item: t,
			open: f
		})
	}), /* @__PURE__ */ l(n, {
		trigger: y,
		open: f,
		onClose: () => p(!1),
		placement: "right",
		offset: 2,
		className: "min-w-[200px] p-0 overflow-hidden rounded-lg",
		"data-testid": `${d}-submenu`,
		children: /* @__PURE__ */ l("div", {
			ref: b,
			role: "menu",
			"aria-label": t.label,
			className: "py-1 uic-menu-scroll",
			onMouseEnter: S,
			onMouseLeave: C,
			onKeyDown: (e) => {
				e.key === "ArrowLeft" && (e.preventDefault(), p(!1), y.current?.focus());
			},
			children: t.submenu.map((e, t) => /* @__PURE__ */ u("div", {
				role: "group",
				"aria-label": e.label,
				className: e.scroll ? "uic-menu-group-scroll" : void 0,
				"data-testid": e["data-testid"],
				children: [
					t > 0 && /* @__PURE__ */ l("div", {
						role: "separator",
						className: "my-1 border-t border-[var(--color-border)]"
					}),
					e.label && /* @__PURE__ */ l("div", {
						className: "px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-[var(--color-text-tertiary)]",
						children: e.label
					}),
					e.items.map((e, t) => /* @__PURE__ */ l(v, {
						item: e,
						close: r,
						testId: d
					}, t)),
					e.caption && /* @__PURE__ */ l(h, { text: e.caption })
				]
			}, t))
		})
	})] });
}
//#endregion
export { p as t };
