import { t as e } from "./cn-D4QmbyEy.js";
import { t } from "./Button-C2OEUpX-.js";
import { p as n } from "./Icons-_hcrQmPz.js";
import { t as r } from "./InlinePopover-Nn2oovSj.js";
import { useCallback as i, useEffect as a, useId as o, useRef as s, useState as c } from "react";
import { Fragment as l, jsx as u, jsxs as d } from "react/jsx-runtime";
//#region src/components/shared/DropdownMenu.tsx
var f = {
	default: "h-6.5 rounded-md border border-[var(--color-border)] px-2 text-base leading-none text-[var(--color-text-secondary)] bg-transparent hover:bg-[var(--color-surface-hover)]",
	primary: "h-9 rounded-lg border-none px-3.5 text-sm leading-none bg-primary text-on-primary hover:bg-primary-hover",
	secondary: "h-9 rounded-lg border border-border px-3.5 text-sm leading-none bg-surface text-text-primary hover:bg-surface-hover",
	link: "rounded px-1 py-0.5 border-none text-sm leading-none bg-transparent text-text-secondary hover:text-text-primary hover:bg-surface-hover"
}, p = {
	default: "bg-[var(--color-surface-hover)]",
	primary: "bg-primary-hover",
	secondary: "bg-surface-hover",
	link: "text-text-primary"
};
function m({ trigger: n, triggerLabel: a = "Open menu", triggerTitle: o, triggerClassName: m, triggerVariant: h = "default", triggerTabIndex: _, triggerTestId: v, align: b = "start", sections: x, className: S, "data-testid": C = "dropdown-menu" }) {
	let [w, T] = c(!1), E = s(null), D = s(null), O = i(() => T(!1), []), k = i((e) => {
		if (![
			"ArrowDown",
			"ArrowUp",
			"Home",
			"End"
		].includes(e.key)) return;
		let t = D.current;
		if (!t) return;
		let n = Array.from(t.querySelectorAll("[role=\"menuitem\"],[role=\"menuitemcheckbox\"]")).filter((e) => e.closest("[role=\"menu\"]") === t);
		if (n.length === 0) return;
		e.preventDefault();
		let r = n.indexOf(document.activeElement), i;
		i = e.key === "Home" ? 0 : e.key === "End" ? n.length - 1 : e.key === "ArrowDown" ? r < 0 ? 0 : (r + 1) % n.length : r <= 0 ? n.length - 1 : r - 1, n[i].focus();
	}, []);
	return /* @__PURE__ */ d(l, { children: [/* @__PURE__ */ u("button", {
		ref: E,
		type: "button",
		"aria-label": a,
		"aria-haspopup": "menu",
		"aria-expanded": w,
		title: o,
		tabIndex: _,
		"data-testid": v,
		onClick: () => T((e) => !e),
		"data-variant": h,
		className: e("inline-flex items-center justify-center gap-1.5 cursor-pointer transition-colors duration-100", t, f[h], w && p[h], m),
		children: n
	}), /* @__PURE__ */ u(r, {
		trigger: E,
		open: w,
		onClose: O,
		placement: b === "end" ? "bottom-end" : "bottom-start",
		className: e("min-w-[180px] p-0 overflow-hidden rounded-lg", S),
		"data-testid": C,
		children: /* @__PURE__ */ u("div", {
			ref: D,
			role: "menu",
			"aria-label": a,
			onKeyDown: k,
			className: "py-1 uic-menu-scroll",
			children: x.map((e, t) => /* @__PURE__ */ d("div", {
				role: "group",
				"aria-label": e.label,
				className: e.scroll ? "uic-menu-group-scroll" : void 0,
				"data-testid": e["data-testid"],
				children: [
					t > 0 && /* @__PURE__ */ u("div", {
						role: "separator",
						className: "my-1 border-t border-[var(--color-border)]"
					}),
					e.label && /* @__PURE__ */ u("div", {
						className: "px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-[var(--color-text-tertiary)]",
						children: e.label
					}),
					e.items.map((e, t) => /* @__PURE__ */ u(y, {
						item: e,
						close: O,
						testId: C
					}, t)),
					e.caption && /* @__PURE__ */ u(g, { text: e.caption })
				]
			}, t))
		})
	})] });
}
var h = "flex items-center gap-2.5 w-full text-left px-3.5 py-2 text-sm border-none cursor-pointer font-[inherit] transition-colors duration-100";
function g({ text: e }) {
	return /* @__PURE__ */ u("div", {
		className: "mt-1 border-t border-[var(--color-border)] px-3.5 pb-1 pt-2 text-xs text-[var(--color-text-tertiary)]",
		"data-menu-caption": "",
		children: e
	});
}
function _(e, t = !1) {
	return e.disabled ? "cursor-not-allowed text-[var(--color-text-tertiary)] bg-transparent" : e.danger ? "text-danger-fg bg-transparent hover:bg-danger-bg" : t ? "font-normal text-primary-fg bg-primary-bg" : e.active ? "font-semibold text-[var(--color-text-primary)] bg-[var(--color-surface-hover)]" : "font-normal text-[var(--color-text-primary)] bg-transparent hover:bg-[var(--color-surface-hover)]";
}
function v({ item: t, open: r = !1, labelId: i, reasonId: a }) {
	let o = t.disabled && t.disabledReason ? t.disabledReason : void 0, s = o ?? t.description;
	return /* @__PURE__ */ d(l, { children: [
		t.checked === void 0 ? t.icon ? /* @__PURE__ */ u("span", {
			className: e("flex w-4 shrink-0 items-center justify-center text-base leading-none", t.danger || r ? "text-current" : "text-[var(--color-text-secondary)]", t.disabled && "opacity-60"),
			"aria-hidden": "true",
			children: t.icon
		}) : null : /* @__PURE__ */ u("span", {
			className: e("flex w-4 shrink-0 items-center justify-center text-[var(--color-text-secondary)]", t.disabled && "opacity-60"),
			"aria-hidden": "true",
			children: t.checked ? "✓" : ""
		}),
		/* @__PURE__ */ d("span", {
			className: "flex min-w-0 flex-1 flex-col",
			children: [/* @__PURE__ */ u("span", {
				id: i,
				className: "truncate",
				children: t.label
			}), s && /* @__PURE__ */ u("span", {
				id: o ? a : void 0,
				"data-menu-disabled-reason": o ? "" : void 0,
				className: "truncate text-xs font-normal text-[var(--color-text-tertiary)]",
				children: s
			})]
		}),
		t.trailing !== void 0 && /* @__PURE__ */ u("span", {
			className: "shrink-0 text-xs text-[var(--color-text-tertiary)]",
			"aria-hidden": "true",
			children: t.trailing
		}),
		t.submenu && /* @__PURE__ */ u(n, {
			dir: "right",
			size: 14,
			className: e("shrink-0", r ? "text-current" : "text-[var(--color-text-tertiary)]")
		})
	] });
}
function y({ item: t, close: n, testId: i }) {
	let [f, p] = c(!1), m = s(null), b = s(null), x = s(null), S = () => {
		x.current &&= (clearTimeout(x.current), null);
	}, C = () => {
		S(), x.current = setTimeout(() => p(!1), 180);
	};
	a(() => () => S(), []);
	let w = o(), T = !!(t.disabled && t.disabledReason);
	return !t.submenu || t.disabled ? /* @__PURE__ */ u("button", {
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
		className: e(h, _(t)),
		children: /* @__PURE__ */ u(v, {
			item: t,
			labelId: T ? `${w}-label` : void 0,
			reasonId: T ? `${w}-reason` : void 0
		})
	}) : /* @__PURE__ */ d(l, { children: [/* @__PURE__ */ u("button", {
		ref: m,
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
		className: e(h, _(t, f)),
		children: /* @__PURE__ */ u(v, {
			item: t,
			open: f
		})
	}), /* @__PURE__ */ u(r, {
		trigger: m,
		open: f,
		onClose: () => p(!1),
		placement: "right",
		offset: 2,
		className: "min-w-[200px] p-0 overflow-hidden rounded-lg",
		"data-testid": `${i}-submenu`,
		children: /* @__PURE__ */ u("div", {
			ref: b,
			role: "menu",
			"aria-label": t.label,
			className: "py-1 uic-menu-scroll",
			onMouseEnter: S,
			onMouseLeave: C,
			onKeyDown: (e) => {
				e.key === "ArrowLeft" && (e.preventDefault(), p(!1), m.current?.focus());
			},
			children: t.submenu.map((e, t) => /* @__PURE__ */ d("div", {
				role: "group",
				"aria-label": e.label,
				className: e.scroll ? "uic-menu-group-scroll" : void 0,
				"data-testid": e["data-testid"],
				children: [
					t > 0 && /* @__PURE__ */ u("div", {
						role: "separator",
						className: "my-1 border-t border-[var(--color-border)]"
					}),
					e.label && /* @__PURE__ */ u("div", {
						className: "px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-[var(--color-text-tertiary)]",
						children: e.label
					}),
					e.items.map((e, t) => /* @__PURE__ */ u(y, {
						item: e,
						close: n,
						testId: i
					}, t)),
					e.caption && /* @__PURE__ */ u(g, { text: e.caption })
				]
			}, t))
		})
	})] });
}
//#endregion
export { m as t };
