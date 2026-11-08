import { d as e, r as t, s as n, t as r } from "./Button-DQoeE5dN.js";
import { m as i } from "./Icons-CqVFbuiZ.js";
import { t as a } from "./InlinePopover-BQTS5egk.js";
import { useCallback as o, useEffect as s, useId as c, useRef as l, useState as u } from "react";
import { Fragment as d, jsx as f, jsxs as p } from "react/jsx-runtime";
//#region src/components/shared/DropdownMenu.tsx
var m = {
	default: " rounded-md border border-[var(--color-border)] px-2 text-xs leading-none text-[var(--color-text-secondary)] bg-transparent hover:bg-[var(--color-surface-hover)]",
	primary: " rounded-lg border-none px-3.5 text-sm leading-none bg-primary text-on-primary hover:bg-primary-hover",
	secondary: " rounded-lg border border-border px-3.5 text-sm leading-none bg-surface text-text-primary hover:bg-surface-hover",
	link: "rounded px-1 py-0.5 border-none text-sm leading-none bg-transparent text-text-secondary hover:text-text-primary hover:bg-surface-hover"
}, h = {
	default: "bg-[var(--color-surface-hover)]",
	primary: "bg-primary-hover",
	secondary: "bg-surface-hover",
	link: "text-text-primary"
};
function g({ trigger: i, triggerLabel: s = "Open menu", triggerTitle: c, triggerClassName: g, triggerVariant: _ = "default", triggerTabIndex: y, disabled: b = !1, triggerTestId: S, triggerAttributes: C, align: w = "start", sections: T, className: E, "data-testid": D = "dropdown-menu" }) {
	let O = n() === "compact" ? "sm" : "md", [k, A] = u(!1), j = l(null), M = l(null), N = o(() => A(!1), []), P = o((e) => {
		if (![
			"ArrowDown",
			"ArrowUp",
			"Home",
			"End"
		].includes(e.key)) return;
		let t = M.current;
		if (!t) return;
		let n = Array.from(t.querySelectorAll("[role=\"menuitem\"],[role=\"menuitemcheckbox\"]")).filter((e) => e.closest("[role=\"menu\"]") === t);
		if (n.length === 0) return;
		e.preventDefault();
		let r = n.indexOf(document.activeElement), i;
		i = e.key === "Home" ? 0 : e.key === "End" ? n.length - 1 : e.key === "ArrowDown" ? r < 0 ? 0 : (r + 1) % n.length : r <= 0 ? n.length - 1 : r - 1, n[i].focus();
	}, []);
	return /* @__PURE__ */ p(d, { children: [/* @__PURE__ */ f("button", {
		"data-ui-part": "",
		ref: j,
		type: "button",
		"aria-label": s,
		"aria-haspopup": "menu",
		"aria-expanded": k,
		title: c,
		tabIndex: y,
		...C,
		"data-testid": S,
		disabled: b || void 0,
		"aria-disabled": b ? "true" : void 0,
		onClick: () => {
			b || A((e) => !e);
		},
		"data-variant": _,
		className: e("inline-flex items-center justify-center gap-1.5 cursor-pointer transition-colors duration-100", "disabled:cursor-not-allowed disabled:bg-transparent disabled:text-[var(--color-text-disabled)] disabled:opacity-70", r, m[_], _ !== "link" && t[O], k && h[_], g),
		children: i
	}), /* @__PURE__ */ f(a, {
		trigger: j,
		open: k && !b,
		onClose: N,
		placement: w === "end" ? "bottom-end" : "bottom-start",
		className: e("min-w-[180px] p-0 overflow-hidden rounded-lg", E),
		"data-testid": D,
		children: /* @__PURE__ */ f("div", {
			ref: M,
			role: "menu",
			"aria-label": s,
			onKeyDown: P,
			className: "py-1 uic-menu-scroll",
			children: T.map((e, t) => /* @__PURE__ */ p("div", {
				role: "group",
				"aria-label": e.label,
				className: e.scroll ? "uic-menu-group-scroll" : void 0,
				"data-testid": e["data-testid"],
				children: [
					t > 0 && /* @__PURE__ */ f("div", {
						role: "separator",
						className: "my-1 border-t border-[var(--color-border)]"
					}),
					e.label && /* @__PURE__ */ f("div", {
						className: "px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-[var(--color-text-tertiary)]",
						children: e.label
					}),
					e.items.map((e, t) => /* @__PURE__ */ f(x, {
						item: e,
						close: N,
						testId: D
					}, t)),
					e.caption && /* @__PURE__ */ f(v, { text: e.caption })
				]
			}, t))
		})
	})] });
}
var _ = "flex items-center gap-2.5 w-full text-left px-3.5 py-2 text-sm border-none cursor-pointer font-[inherit] transition-colors duration-100";
function v({ text: e }) {
	return /* @__PURE__ */ f("div", {
		className: "mt-1 border-t border-[var(--color-border)] px-3.5 pb-1 pt-2 text-xs text-[var(--color-text-tertiary)]",
		"data-menu-caption": "",
		children: e
	});
}
function y(e, t = !1) {
	return e.disabled ? "cursor-not-allowed text-[var(--color-text-tertiary)] bg-transparent" : e.danger ? "text-danger-fg bg-transparent hover:bg-danger-bg" : t ? "font-normal text-primary-fg bg-primary-bg" : e.active ? "font-semibold text-[var(--color-text-primary)] bg-[var(--color-surface-hover)]" : "font-normal text-[var(--color-text-primary)] bg-transparent hover:bg-[var(--color-surface-hover)]";
}
function b({ item: t, open: n = !1, labelId: r, reasonId: a }) {
	let o = t.disabled && t.disabledReason ? t.disabledReason : void 0, s = o ?? t.description;
	return /* @__PURE__ */ p(d, { children: [
		t.checked === void 0 ? t.icon ? /* @__PURE__ */ f("span", {
			className: e("flex w-4 shrink-0 items-center justify-center text-base leading-none", t.danger || n ? "text-current" : "text-[var(--color-text-secondary)]", t.disabled && "opacity-60"),
			"aria-hidden": "true",
			children: t.icon
		}) : null : /* @__PURE__ */ f("span", {
			className: e("flex w-4 shrink-0 items-center justify-center text-[var(--color-text-secondary)]", t.disabled && "opacity-60"),
			"aria-hidden": "true",
			children: t.checked ? "✓" : ""
		}),
		/* @__PURE__ */ p("span", {
			className: "flex min-w-0 flex-1 flex-col",
			children: [/* @__PURE__ */ f("span", {
				id: r,
				className: "truncate",
				children: t.label
			}), s && /* @__PURE__ */ f("span", {
				id: o ? a : void 0,
				"data-menu-disabled-reason": o ? "" : void 0,
				className: "truncate text-xs font-normal text-[var(--color-text-tertiary)]",
				children: s
			})]
		}),
		t.trailing !== void 0 && /* @__PURE__ */ f("span", {
			className: "shrink-0 text-xs text-[var(--color-text-tertiary)]",
			"aria-hidden": "true",
			children: t.trailing
		}),
		t.submenu && /* @__PURE__ */ f(i, {
			dir: "right",
			size: 14,
			className: e("shrink-0", n ? "text-current" : "text-[var(--color-text-tertiary)]")
		})
	] });
}
function x({ item: t, close: n, testId: r }) {
	let [i, o] = u(!1), m = l(null), h = l(null), g = l(null), S = () => {
		g.current &&= (clearTimeout(g.current), null);
	}, C = () => {
		S(), g.current = setTimeout(() => o(!1), 180);
	};
	s(() => () => S(), []);
	let w = c(), T = !!(t.disabled && t.disabledReason);
	return !t.submenu || t.disabled ? /* @__PURE__ */ f("button", {
		"data-ui-part": "",
		type: "button",
		role: t.checked === void 0 ? "menuitem" : "menuitemcheckbox",
		"aria-checked": t.checked === void 0 ? void 0 : t.checked,
		"aria-current": t.active || void 0,
		"aria-disabled": t.disabled ? "true" : void 0,
		"aria-labelledby": T ? `${w}-label` : void 0,
		"aria-describedby": T ? `${w}-reason` : void 0,
		title: t.disabled ? t.disabledReason : void 0,
		onClick: () => {
			t.disabled || (t.onSelect?.(), n());
		},
		"data-testid": t["data-testid"],
		"data-disabled": t.disabled ? "" : void 0,
		className: e(_, y(t)),
		children: /* @__PURE__ */ f(b, {
			item: t,
			labelId: T ? `${w}-label` : void 0,
			reasonId: T ? `${w}-reason` : void 0
		})
	}) : /* @__PURE__ */ p(d, { children: [/* @__PURE__ */ f("button", {
		"data-ui-part": "",
		ref: m,
		type: "button",
		role: "menuitem",
		"aria-haspopup": "menu",
		"aria-expanded": i,
		onMouseEnter: () => {
			S(), o(!0);
		},
		onMouseLeave: C,
		onClick: () => o(!0),
		onKeyDown: (e) => {
			(e.key === "ArrowRight" || e.key === "Enter" || e.key === " ") && (e.preventDefault(), o(!0), setTimeout(() => h.current?.querySelector("[role=\"menuitem\"],[role=\"menuitemcheckbox\"]")?.focus(), 0));
		},
		"data-testid": t["data-testid"],
		className: e(_, y(t, i)),
		children: /* @__PURE__ */ f(b, {
			item: t,
			open: i
		})
	}), /* @__PURE__ */ f(a, {
		trigger: m,
		open: i,
		onClose: () => o(!1),
		placement: "right",
		offset: 2,
		className: "min-w-[200px] p-0 overflow-hidden rounded-lg",
		"data-testid": `${r}-submenu`,
		children: /* @__PURE__ */ f("div", {
			ref: h,
			role: "menu",
			"aria-label": t.label,
			className: "py-1 uic-menu-scroll",
			onMouseEnter: S,
			onMouseLeave: C,
			onKeyDown: (e) => {
				e.key === "ArrowLeft" && (e.preventDefault(), o(!1), m.current?.focus());
			},
			children: t.submenu.map((e, t) => /* @__PURE__ */ p("div", {
				role: "group",
				"aria-label": e.label,
				className: e.scroll ? "uic-menu-group-scroll" : void 0,
				"data-testid": e["data-testid"],
				children: [
					t > 0 && /* @__PURE__ */ f("div", {
						role: "separator",
						className: "my-1 border-t border-[var(--color-border)]"
					}),
					e.label && /* @__PURE__ */ f("div", {
						className: "px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-[var(--color-text-tertiary)]",
						children: e.label
					}),
					e.items.map((e, t) => /* @__PURE__ */ f(x, {
						item: e,
						close: n,
						testId: r
					}, t)),
					e.caption && /* @__PURE__ */ f(v, { text: e.caption })
				]
			}, t))
		})
	})] });
}
//#endregion
export { g as t };
