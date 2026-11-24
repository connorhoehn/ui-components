import { c as e, f as t, i as n, r, t as i } from "./Button-DwPf_9pb.js";
import { m as a } from "./Icons-DX0dqgD-.js";
import { t as o } from "./InlinePopover-C-Dtxban.js";
import { useCallback as s, useEffect as c, useId as l, useRef as u, useState as d } from "react";
import { Fragment as f, jsx as p, jsxs as m } from "react/jsx-runtime";
//#region src/components/shared/DropdownMenu.tsx
var h = {
	default: " rounded-md border border-[var(--color-border)] px-2 text-xs leading-none text-[var(--color-text-secondary)] bg-transparent hover:bg-[var(--color-surface-hover)]",
	primary: " rounded-lg border-none px-3.5 text-sm leading-none bg-primary text-on-primary hover:bg-primary-hover",
	secondary: " rounded-lg border border-border px-3.5 text-sm leading-none bg-surface text-text-primary hover:bg-surface-hover",
	link: "rounded px-1 py-0.5 border-none text-sm leading-none bg-transparent text-text-secondary hover:text-text-primary hover:bg-surface-hover"
}, g = {
	default: "bg-[var(--color-surface-hover)]",
	primary: "bg-primary-hover",
	secondary: "bg-surface-hover",
	link: "text-text-primary"
};
function _({ trigger: a, triggerLabel: c = "Open menu", triggerTitle: l, triggerClassName: _, triggerVariant: v = "default", buttonVariant: b, buttonSize: x = "sm", triggerTabIndex: C, disabled: w = !1, triggerTestId: T, triggerAttributes: E, align: D = "start", zIndex: O, sections: k, className: A, "data-testid": j = "dropdown-menu" }) {
	let M = e() === "compact" ? "sm" : "md", [N, P] = d(!1), F = u(null), I = u(null), L = s(() => P(!1), []), R = s((e) => {
		if (![
			"ArrowDown",
			"ArrowUp",
			"Home",
			"End"
		].includes(e.key)) return;
		let t = I.current;
		if (!t) return;
		let n = Array.from(t.querySelectorAll("[role=\"menuitem\"],[role=\"menuitemcheckbox\"]")).filter((e) => e.closest("[role=\"menu\"]") === t);
		if (n.length === 0) return;
		e.preventDefault();
		let r = n.indexOf(document.activeElement), i;
		i = e.key === "Home" ? 0 : e.key === "End" ? n.length - 1 : e.key === "ArrowDown" ? r < 0 ? 0 : (r + 1) % n.length : r <= 0 ? n.length - 1 : r - 1, n[i].focus();
	}, []);
	return /* @__PURE__ */ m(f, { children: [/* @__PURE__ */ p("button", {
		"data-ui-part": "",
		ref: F,
		type: "button",
		"aria-label": c,
		"aria-haspopup": "menu",
		"aria-expanded": N,
		title: l,
		tabIndex: C,
		...E,
		"data-testid": T,
		disabled: w || void 0,
		"aria-disabled": w ? "true" : void 0,
		onClick: () => {
			w || P((e) => !e);
		},
		"data-variant": b ?? v,
		className: b ? t(r({
			variant: b,
			size: x,
			disabled: w
		}), N && "bg-primary/12", _) : t("inline-flex items-center justify-center gap-1.5 cursor-pointer transition-colors duration-100", "disabled:cursor-not-allowed disabled:bg-transparent disabled:text-[var(--color-text-disabled)] disabled:opacity-70", i, h[v], v !== "link" && n[M], N && g[v], _),
		children: a
	}), /* @__PURE__ */ p(o, {
		trigger: F,
		open: N && !w,
		onClose: L,
		placement: D === "end" ? "bottom-end" : "bottom-start",
		className: t("min-w-[180px] p-0 overflow-hidden rounded-lg", A),
		...O === void 0 ? {} : { zIndex: O },
		"data-testid": j,
		panelRole: "none",
		kind: "menu",
		children: /* @__PURE__ */ p("div", {
			ref: I,
			role: "menu",
			"aria-label": c,
			onKeyDown: R,
			className: "py-1 uic-menu-scroll",
			children: k.map((e, t) => /* @__PURE__ */ m("div", {
				role: "group",
				"aria-label": e.label,
				className: e.scroll ? "uic-menu-group-scroll" : void 0,
				"data-testid": e["data-testid"],
				children: [
					t > 0 && /* @__PURE__ */ p("div", {
						role: "separator",
						className: "my-1 border-t border-[var(--color-border)]"
					}),
					e.label && /* @__PURE__ */ p("div", {
						className: "px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-[var(--color-text-tertiary)]",
						children: e.label
					}),
					e.items.map((e, t) => /* @__PURE__ */ p(S, {
						item: e,
						close: L,
						testId: j
					}, t)),
					e.caption && /* @__PURE__ */ p(y, { text: e.caption })
				]
			}, t))
		})
	})] });
}
var v = "flex items-center gap-2.5 w-full text-left px-3.5 py-2 text-sm border-none cursor-pointer font-[inherit] transition-colors duration-100";
function y({ text: e }) {
	return /* @__PURE__ */ p("div", {
		className: "mt-1 border-t border-[var(--color-border)] px-3.5 pb-1 pt-2 text-xs text-[var(--color-text-tertiary)]",
		"data-menu-caption": "",
		children: e
	});
}
function b(e, t = !1) {
	return e.disabled ? "cursor-not-allowed text-[var(--color-text-tertiary)] bg-transparent" : e.danger ? "text-danger-fg bg-transparent hover:bg-danger-bg" : t ? "font-normal text-primary-fg bg-primary-bg" : e.active ? "font-semibold text-[var(--color-text-primary)] bg-[var(--color-surface-hover)]" : "font-normal text-[var(--color-text-primary)] bg-transparent hover:bg-[var(--color-surface-hover)]";
}
function x({ item: e, open: n = !1, labelId: r, reasonId: i }) {
	let o = e.disabled && e.disabledReason ? e.disabledReason : void 0, s = o ?? e.description;
	return /* @__PURE__ */ m(f, { children: [
		e.checked === void 0 ? e.icon ? /* @__PURE__ */ p("span", {
			className: t("flex w-4 shrink-0 items-center justify-center text-base leading-none", e.danger || n ? "text-current" : "text-[var(--color-text-secondary)]", e.disabled && "opacity-60"),
			"aria-hidden": "true",
			children: e.icon
		}) : null : /* @__PURE__ */ p("span", {
			className: t("flex w-4 shrink-0 items-center justify-center text-[var(--color-text-secondary)]", e.disabled && "opacity-60"),
			"aria-hidden": "true",
			children: e.checked ? "✓" : ""
		}),
		/* @__PURE__ */ m("span", {
			className: "flex min-w-0 flex-1 flex-col",
			children: [/* @__PURE__ */ p("span", {
				id: r,
				className: "truncate",
				children: e.label
			}), s && /* @__PURE__ */ p("span", {
				id: o ? i : void 0,
				"data-menu-disabled-reason": o ? "" : void 0,
				className: "truncate text-xs font-normal text-[var(--color-text-tertiary)]",
				children: s
			})]
		}),
		e.trailing !== void 0 && /* @__PURE__ */ p("span", {
			className: "shrink-0 text-xs text-[var(--color-text-tertiary)]",
			"aria-hidden": "true",
			children: e.trailing
		}),
		e.submenu && /* @__PURE__ */ p(a, {
			dir: "right",
			size: 14,
			className: t("shrink-0", n ? "text-current" : "text-[var(--color-text-tertiary)]")
		})
	] });
}
function S({ item: e, close: n, testId: i }) {
	let [a, s] = d(!1), h = u(null), g = u(null), _ = u(null), C = () => {
		_.current &&= (clearTimeout(_.current), null);
	}, w = () => {
		C(), _.current = setTimeout(() => s(!1), 180);
	};
	c(() => () => C(), []);
	let T = l(), E = !!(e.disabled && e.disabledReason), [D, O] = d(!1), k = u(null);
	if (c(() => {
		D && k.current?.focus();
	}, [D]), D && e.confirm && !e.disabled) {
		let t = () => {
			O(!1), requestAnimationFrame(() => h.current?.focus());
		};
		return /* @__PURE__ */ m("div", {
			role: "group",
			"aria-label": e.confirm.question,
			"data-confirm-state": "asking",
			"data-testid": e["data-testid"] ? `${e["data-testid"]}-asking` : void 0,
			onKeyDown: (e) => {
				e.key === "Escape" && (e.preventDefault(), e.stopPropagation(), t());
			},
			className: "flex flex-col gap-2 px-3.5 py-2",
			children: [/* @__PURE__ */ p("span", {
				className: "text-sm text-[var(--color-text-primary)]",
				children: e.confirm.question
			}), /* @__PURE__ */ m("span", {
				className: "flex items-center justify-end gap-2",
				children: [/* @__PURE__ */ p("button", {
					type: "button",
					role: "menuitem",
					onClick: t,
					"data-testid": e["data-testid"] ? `${e["data-testid"]}-cancel` : void 0,
					className: r({
						variant: "ghost",
						size: "sm"
					}),
					children: "Cancel"
				}), /* @__PURE__ */ p("button", {
					ref: k,
					type: "button",
					role: "menuitem",
					onClick: () => {
						e.onSelect?.(), n();
					},
					"data-testid": e["data-testid"] ? `${e["data-testid"]}-confirm` : void 0,
					className: r({
						variant: e.confirm.tone === "destructive" ? "danger-solid" : "primary",
						size: "sm"
					}),
					children: e.confirm.confirmLabel ?? e.label
				})]
			})]
		});
	}
	return !e.submenu || e.disabled ? /* @__PURE__ */ p("button", {
		"data-ui-part": "",
		type: "button",
		role: e.checked === void 0 ? "menuitem" : "menuitemcheckbox",
		"aria-checked": e.checked === void 0 ? void 0 : e.checked,
		"aria-current": e.active || void 0,
		"aria-disabled": e.disabled ? "true" : void 0,
		"aria-labelledby": E ? `${T}-label` : void 0,
		"aria-describedby": E ? `${T}-reason` : void 0,
		title: e.disabled ? e.disabledReason : void 0,
		ref: e.submenu ? void 0 : h,
		onClick: () => {
			if (!e.disabled) {
				if (e.confirm) {
					O(!0);
					return;
				}
				e.onSelect?.(), n();
			}
		},
		"data-testid": e["data-testid"],
		"data-disabled": e.disabled ? "" : void 0,
		className: t(v, b(e)),
		children: /* @__PURE__ */ p(x, {
			item: e,
			labelId: E ? `${T}-label` : void 0,
			reasonId: E ? `${T}-reason` : void 0
		})
	}) : /* @__PURE__ */ m(f, { children: [/* @__PURE__ */ p("button", {
		"data-ui-part": "",
		ref: h,
		type: "button",
		role: "menuitem",
		"aria-haspopup": "menu",
		"aria-expanded": a,
		onMouseEnter: () => {
			C(), s(!0);
		},
		onMouseLeave: w,
		onClick: () => s(!0),
		onKeyDown: (e) => {
			(e.key === "ArrowRight" || e.key === "Enter" || e.key === " ") && (e.preventDefault(), s(!0), setTimeout(() => g.current?.querySelector("[role=\"menuitem\"],[role=\"menuitemcheckbox\"]")?.focus(), 0));
		},
		"data-testid": e["data-testid"],
		className: t(v, b(e, a)),
		children: /* @__PURE__ */ p(x, {
			item: e,
			open: a
		})
	}), /* @__PURE__ */ p(o, {
		trigger: h,
		open: a,
		onClose: () => s(!1),
		placement: "right",
		offset: 2,
		className: "min-w-[200px] p-0 overflow-hidden rounded-lg",
		"data-testid": `${i}-submenu`,
		panelRole: "none",
		kind: "menu",
		children: /* @__PURE__ */ p("div", {
			ref: g,
			role: "menu",
			"aria-label": e.label,
			className: "py-1 uic-menu-scroll",
			onMouseEnter: C,
			onMouseLeave: w,
			onKeyDown: (e) => {
				e.key === "ArrowLeft" && (e.preventDefault(), s(!1), h.current?.focus());
			},
			children: e.submenu.map((e, t) => /* @__PURE__ */ m("div", {
				role: "group",
				"aria-label": e.label,
				className: e.scroll ? "uic-menu-group-scroll" : void 0,
				"data-testid": e["data-testid"],
				children: [
					t > 0 && /* @__PURE__ */ p("div", {
						role: "separator",
						className: "my-1 border-t border-[var(--color-border)]"
					}),
					e.label && /* @__PURE__ */ p("div", {
						className: "px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-[var(--color-text-tertiary)]",
						children: e.label
					}),
					e.items.map((e, t) => /* @__PURE__ */ p(S, {
						item: e,
						close: n,
						testId: i
					}, t)),
					e.caption && /* @__PURE__ */ p(y, { text: e.caption })
				]
			}, t))
		})
	})] });
}
//#endregion
export { _ as t };
