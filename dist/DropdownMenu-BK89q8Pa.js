import { t as e } from "./cn-DhjIN-s0.js";
import { t } from "./InlinePopover-DFdI8hw1.js";
import { useCallback as n, useRef as r, useState as i } from "react";
import { Fragment as a, jsx as o, jsxs as s } from "react/jsx-runtime";
//#region src/components/shared/DropdownMenu.tsx
function c({ trigger: c, triggerLabel: l = "Open menu", triggerTitle: u, triggerClassName: d, align: f = "start", sections: p, className: m, "data-testid": h = "dropdown-menu" }) {
	let [g, _] = i(!1), v = r(null), y = r(null), b = n(() => _(!1), []), x = n((e) => {
		if (![
			"ArrowDown",
			"ArrowUp",
			"Home",
			"End"
		].includes(e.key)) return;
		let t = y.current;
		if (!t) return;
		let n = Array.from(t.querySelectorAll("[role=\"menuitem\"]"));
		if (n.length === 0) return;
		e.preventDefault();
		let r = n.indexOf(document.activeElement), i;
		i = e.key === "Home" ? 0 : e.key === "End" ? n.length - 1 : e.key === "ArrowDown" ? r < 0 ? 0 : (r + 1) % n.length : r <= 0 ? n.length - 1 : r - 1, n[i].focus();
	}, []);
	return /* @__PURE__ */ s(a, { children: [/* @__PURE__ */ o("button", {
		ref: v,
		type: "button",
		"aria-label": l,
		"aria-haspopup": "menu",
		"aria-expanded": g,
		title: u,
		onClick: () => _((e) => !e),
		className: e("inline-flex items-center justify-center gap-1.5 cursor-pointer", "rounded-md border border-[var(--color-border)] px-2 py-1", "text-base leading-none text-[var(--color-text-secondary)]", "bg-transparent hover:bg-[var(--color-surface-hover)] transition-colors duration-100", g && "bg-[var(--color-surface-hover)]", d),
		children: c
	}), /* @__PURE__ */ o(t, {
		trigger: v,
		open: g,
		onClose: b,
		placement: f === "end" ? "bottom-end" : "bottom-start",
		className: e("min-w-[180px] p-0 overflow-hidden rounded-lg", m),
		"data-testid": h,
		children: /* @__PURE__ */ o("div", {
			ref: y,
			role: "menu",
			"aria-label": l,
			onKeyDown: x,
			className: "py-1",
			children: p.map((t, n) => /* @__PURE__ */ s("div", {
				role: "group",
				"aria-label": t.label,
				children: [
					n > 0 && /* @__PURE__ */ o("div", {
						role: "separator",
						className: "my-1 border-t border-[var(--color-border)]"
					}),
					t.label && /* @__PURE__ */ o("div", {
						className: "px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-[var(--color-text-tertiary)]",
						children: t.label
					}),
					t.items.map((t, n) => /* @__PURE__ */ s("button", {
						type: "button",
						role: "menuitem",
						"aria-current": t.active || void 0,
						onClick: () => {
							t.onSelect(), b();
						},
						className: e("flex items-center gap-2.5 w-full text-left px-3.5 py-2", "text-sm border-none cursor-pointer font-[inherit] transition-colors duration-100", t.danger ? "text-danger-fg bg-transparent hover:bg-danger-bg" : t.active ? "font-semibold text-[var(--color-text-primary)] bg-[var(--color-surface-hover)]" : "font-normal text-[var(--color-text-primary)] bg-transparent hover:bg-[var(--color-surface-hover)]"),
						children: [t.icon && /* @__PURE__ */ o("span", {
							className: "shrink-0 text-base leading-none",
							"aria-hidden": "true",
							children: t.icon
						}), t.label]
					}, n))
				]
			}, n))
		})
	})] });
}
//#endregion
export { c as t };
