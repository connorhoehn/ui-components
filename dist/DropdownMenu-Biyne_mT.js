import { t as e } from "./cn-DhjIN-s0.js";
import { s as t } from "./Icons-CuuLNfdk.js";
import { t as n } from "./InlinePopover-CG_Jwga7.js";
import { useCallback as r, useEffect as i, useRef as a, useState as o } from "react";
import { Fragment as s, jsx as c, jsxs as l } from "react/jsx-runtime";
//#region src/components/shared/DropdownMenu.tsx
function u({ trigger: t, triggerLabel: i = "Open menu", triggerTitle: u, triggerClassName: d, triggerTabIndex: f, triggerTestId: p, align: h = "start", sections: g, className: _, "data-testid": v = "dropdown-menu" }) {
	let [y, b] = o(!1), x = a(null), S = a(null), C = r(() => b(!1), []), w = r((e) => {
		if (![
			"ArrowDown",
			"ArrowUp",
			"Home",
			"End"
		].includes(e.key)) return;
		let t = S.current;
		if (!t) return;
		let n = Array.from(t.querySelectorAll("[role=\"menuitem\"]"));
		if (n.length === 0) return;
		e.preventDefault();
		let r = n.indexOf(document.activeElement), i;
		i = e.key === "Home" ? 0 : e.key === "End" ? n.length - 1 : e.key === "ArrowDown" ? r < 0 ? 0 : (r + 1) % n.length : r <= 0 ? n.length - 1 : r - 1, n[i].focus();
	}, []);
	return /* @__PURE__ */ l(s, { children: [/* @__PURE__ */ c("button", {
		ref: x,
		type: "button",
		"aria-label": i,
		"aria-haspopup": "menu",
		"aria-expanded": y,
		title: u,
		tabIndex: f,
		"data-testid": p,
		onClick: () => b((e) => !e),
		className: e("inline-flex items-center justify-center gap-1.5 cursor-pointer", "rounded-md border border-[var(--color-border)] px-2 py-1", "text-base leading-none text-[var(--color-text-secondary)]", "bg-transparent hover:bg-[var(--color-surface-hover)] transition-colors duration-100", y && "bg-[var(--color-surface-hover)]", d),
		children: t
	}), /* @__PURE__ */ c(n, {
		trigger: x,
		open: y,
		onClose: C,
		placement: h === "end" ? "bottom-end" : "bottom-start",
		className: e("min-w-[180px] p-0 overflow-hidden rounded-lg", _),
		"data-testid": v,
		children: /* @__PURE__ */ c("div", {
			ref: S,
			role: "menu",
			"aria-label": i,
			onKeyDown: w,
			className: "py-1 uic-menu-scroll",
			children: g.map((e, t) => /* @__PURE__ */ l("div", {
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
					e.items.map((e, t) => /* @__PURE__ */ c(m, {
						item: e,
						close: C,
						testId: v
					}, t))
				]
			}, t))
		})
	})] });
}
var d = "flex items-center gap-2.5 w-full text-left px-3.5 py-2 text-sm border-none cursor-pointer font-[inherit] transition-colors duration-100";
function f(e, t = !1) {
	return e.danger ? "text-danger-fg bg-transparent hover:bg-danger-bg" : e.active || t ? "font-semibold text-[var(--color-text-primary)] bg-[var(--color-surface-hover)]" : "font-normal text-[var(--color-text-primary)] bg-transparent hover:bg-[var(--color-surface-hover)]";
}
function p({ item: e }) {
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
function m({ item: t, close: r, testId: u }) {
	let [h, g] = o(!1), _ = a(null), v = a(null), y = a(null), b = () => {
		y.current &&= (clearTimeout(y.current), null);
	}, x = () => {
		b(), y.current = setTimeout(() => g(!1), 180);
	};
	return i(() => () => b(), []), t.submenu ? /* @__PURE__ */ l(s, { children: [/* @__PURE__ */ c("button", {
		ref: _,
		type: "button",
		role: "menuitem",
		"aria-haspopup": "menu",
		"aria-expanded": h,
		onMouseEnter: () => {
			b(), g(!0);
		},
		onMouseLeave: x,
		onClick: () => g(!0),
		onKeyDown: (e) => {
			(e.key === "ArrowRight" || e.key === "Enter" || e.key === " ") && (e.preventDefault(), g(!0), setTimeout(() => v.current?.querySelector("[role=\"menuitem\"],[role=\"menuitemcheckbox\"]")?.focus(), 0));
		},
		"data-testid": t["data-testid"],
		className: e(d, f(t, h)),
		children: /* @__PURE__ */ c(p, { item: t })
	}), /* @__PURE__ */ c(n, {
		trigger: _,
		open: h,
		onClose: () => g(!1),
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
				e.key === "ArrowLeft" && (e.preventDefault(), g(!1), _.current?.focus());
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
					e.items.map((e, t) => /* @__PURE__ */ c(m, {
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
		className: e(d, f(t)),
		children: /* @__PURE__ */ c(p, { item: t })
	});
}
//#endregion
export { u as t };
