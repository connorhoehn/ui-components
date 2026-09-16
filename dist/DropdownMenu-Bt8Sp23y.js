import { t as e } from "./cn-DhjIN-s0.js";
import { t } from "./InlinePopover-DFdI8hw1.js";
import { useCallback as n, useEffect as r, useRef as i, useState as a } from "react";
import { Fragment as o, jsx as s, jsxs as c } from "react/jsx-runtime";
//#region src/components/ui/Icons.tsx
function l(e, t) {
	return {
		width: e,
		height: e,
		viewBox: "0 0 16 16",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: 1.5,
		strokeLinecap: "round",
		strokeLinejoin: "round",
		"aria-hidden": !0,
		...t
	};
}
function u({ size: e = 16, ...t }) {
	return /* @__PURE__ */ s("svg", {
		...l(e, t),
		children: /* @__PURE__ */ s("path", { d: "M8 3.5v9M3.5 8h9" })
	});
}
function d({ size: e = 16, ...t }) {
	return /* @__PURE__ */ s("svg", {
		...l(e, t),
		children: /* @__PURE__ */ s("path", { d: "M4 4l8 8M12 4l-8 8" })
	});
}
function f({ size: e = 16, ...t }) {
	return /* @__PURE__ */ s("svg", {
		...l(e, t),
		children: /* @__PURE__ */ s("path", { d: "M13.5 10a1.5 1.5 0 0 1-1.5 1.5H5.5L2.5 14V3.5A1.5 1.5 0 0 1 4 2h8a1.5 1.5 0 0 1 1.5 1.5z" })
	});
}
function p({ size: e = 16, ...t }) {
	return /* @__PURE__ */ s("svg", {
		...l(e, t),
		children: /* @__PURE__ */ s("path", { d: "M3 8.5V13a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V8.5M10.5 4.5 8 2 5.5 4.5M8 2v8" })
	});
}
function m({ size: e = 16, dir: t = "down", ...n }) {
	let r = t === "down" ? "M4 6l4 4 4-4" : t === "up" ? "M4 10l4-4 4 4" : t === "left" ? "M10 4 6 8l4 4" : "M6 4l4 4-4 4";
	return /* @__PURE__ */ s("svg", {
		...l(e, n),
		children: /* @__PURE__ */ s("path", { d: r })
	});
}
function h({ size: e = 16, ...t }) {
	return /* @__PURE__ */ c("svg", {
		...l(e, t),
		children: [/* @__PURE__ */ s("circle", {
			cx: "8",
			cy: "8",
			r: "5.5"
		}), /* @__PURE__ */ s("path", { d: "M8 5v3l2 1.5" })]
	});
}
function g({ size: e = 16, ...t }) {
	return /* @__PURE__ */ c("svg", {
		...l(e, t),
		children: [/* @__PURE__ */ s("path", { d: "M9.5 2H4.5A1.5 1.5 0 0 0 3 3.5v9A1.5 1.5 0 0 0 4.5 14h7a1.5 1.5 0 0 0 1.5-1.5V5.5z" }), /* @__PURE__ */ s("path", { d: "M9.5 2v3.5H13M6 9h4M6 11.5h4" })]
	});
}
//#endregion
//#region src/components/shared/DropdownMenu.tsx
function _({ trigger: r, triggerLabel: l = "Open menu", triggerTitle: u, triggerClassName: d, align: f = "start", sections: p, className: m, "data-testid": h = "dropdown-menu" }) {
	let [g, _] = a(!1), v = i(null), y = i(null), b = n(() => _(!1), []), S = n((e) => {
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
	return /* @__PURE__ */ c(o, { children: [/* @__PURE__ */ s("button", {
		ref: v,
		type: "button",
		"aria-label": l,
		"aria-haspopup": "menu",
		"aria-expanded": g,
		title: u,
		onClick: () => _((e) => !e),
		className: e("inline-flex items-center justify-center gap-1.5 cursor-pointer", "rounded-md border border-[var(--color-border)] px-2 py-1", "text-base leading-none text-[var(--color-text-secondary)]", "bg-transparent hover:bg-[var(--color-surface-hover)] transition-colors duration-100", g && "bg-[var(--color-surface-hover)]", d),
		children: r
	}), /* @__PURE__ */ s(t, {
		trigger: v,
		open: g,
		onClose: b,
		placement: f === "end" ? "bottom-end" : "bottom-start",
		className: e("min-w-[180px] p-0 overflow-hidden rounded-lg", m),
		"data-testid": h,
		children: /* @__PURE__ */ s("div", {
			ref: y,
			role: "menu",
			"aria-label": l,
			onKeyDown: S,
			className: "py-1 uic-menu-scroll",
			children: p.map((e, t) => /* @__PURE__ */ c("div", {
				role: "group",
				"aria-label": e.label,
				className: e.scroll ? "uic-menu-group-scroll" : void 0,
				"data-testid": e["data-testid"],
				children: [
					t > 0 && /* @__PURE__ */ s("div", {
						role: "separator",
						className: "my-1 border-t border-[var(--color-border)]"
					}),
					e.label && /* @__PURE__ */ s("div", {
						className: "px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-[var(--color-text-tertiary)]",
						children: e.label
					}),
					e.items.map((e, t) => /* @__PURE__ */ s(x, {
						item: e,
						close: b,
						testId: h
					}, t))
				]
			}, t))
		})
	})] });
}
var v = "flex items-center gap-2.5 w-full text-left px-3.5 py-2 text-sm border-none cursor-pointer font-[inherit] transition-colors duration-100";
function y(e, t = !1) {
	return e.danger ? "text-danger-fg bg-transparent hover:bg-danger-bg" : e.active || t ? "font-semibold text-[var(--color-text-primary)] bg-[var(--color-surface-hover)]" : "font-normal text-[var(--color-text-primary)] bg-transparent hover:bg-[var(--color-surface-hover)]";
}
function b({ item: e }) {
	return /* @__PURE__ */ c(o, { children: [
		e.checked === void 0 ? e.icon ? /* @__PURE__ */ s("span", {
			className: "flex w-4 shrink-0 items-center justify-center text-base leading-none text-[var(--color-text-secondary)]",
			"aria-hidden": "true",
			children: e.icon
		}) : null : /* @__PURE__ */ s("span", {
			className: "flex w-4 shrink-0 items-center justify-center text-[var(--color-text-secondary)]",
			"aria-hidden": "true",
			children: e.checked ? "✓" : ""
		}),
		/* @__PURE__ */ c("span", {
			className: "flex min-w-0 flex-1 flex-col",
			children: [/* @__PURE__ */ s("span", {
				className: "truncate",
				children: e.label
			}), e.description && /* @__PURE__ */ s("span", {
				className: "truncate text-xs font-normal text-[var(--color-text-tertiary)]",
				children: e.description
			})]
		}),
		e.trailing !== void 0 && /* @__PURE__ */ s("span", {
			className: "shrink-0 text-xs text-[var(--color-text-tertiary)]",
			"aria-hidden": "true",
			children: e.trailing
		}),
		e.submenu && /* @__PURE__ */ s(m, {
			dir: "right",
			size: 14,
			className: "shrink-0 text-[var(--color-text-tertiary)]"
		})
	] });
}
function x({ item: n, close: l, testId: u }) {
	let [d, f] = a(!1), p = i(null), m = i(null), h = i(null), g = () => {
		h.current &&= (clearTimeout(h.current), null);
	}, _ = () => {
		g(), h.current = setTimeout(() => f(!1), 180);
	};
	return r(() => () => g(), []), n.submenu ? /* @__PURE__ */ c(o, { children: [/* @__PURE__ */ s("button", {
		ref: p,
		type: "button",
		role: "menuitem",
		"aria-haspopup": "menu",
		"aria-expanded": d,
		onMouseEnter: () => {
			g(), f(!0);
		},
		onMouseLeave: _,
		onClick: () => f((e) => !e),
		onKeyDown: (e) => {
			(e.key === "ArrowRight" || e.key === "Enter" || e.key === " ") && (e.preventDefault(), f(!0), setTimeout(() => m.current?.querySelector("[role=\"menuitem\"],[role=\"menuitemcheckbox\"]")?.focus(), 0));
		},
		"data-testid": n["data-testid"],
		className: e(v, y(n, d)),
		children: /* @__PURE__ */ s(b, { item: n })
	}), /* @__PURE__ */ s(t, {
		trigger: p,
		open: d,
		onClose: () => f(!1),
		placement: "right",
		offset: 2,
		className: "min-w-[200px] p-0 overflow-hidden rounded-lg",
		"data-testid": `${u}-submenu`,
		children: /* @__PURE__ */ s("div", {
			ref: m,
			role: "menu",
			"aria-label": n.label,
			className: "py-1 uic-menu-scroll",
			onMouseEnter: g,
			onMouseLeave: _,
			onKeyDown: (e) => {
				e.key === "ArrowLeft" && (e.preventDefault(), f(!1), p.current?.focus());
			},
			children: n.submenu.map((e, t) => /* @__PURE__ */ c("div", {
				role: "group",
				"aria-label": e.label,
				className: e.scroll ? "uic-menu-group-scroll" : void 0,
				"data-testid": e["data-testid"],
				children: [
					t > 0 && /* @__PURE__ */ s("div", {
						role: "separator",
						className: "my-1 border-t border-[var(--color-border)]"
					}),
					e.label && /* @__PURE__ */ s("div", {
						className: "px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-[var(--color-text-tertiary)]",
						children: e.label
					}),
					e.items.map((e, t) => /* @__PURE__ */ s(x, {
						item: e,
						close: l,
						testId: u
					}, t))
				]
			}, t))
		})
	})] }) : /* @__PURE__ */ s("button", {
		type: "button",
		role: n.checked === void 0 ? "menuitem" : "menuitemcheckbox",
		"aria-checked": n.checked === void 0 ? void 0 : n.checked,
		"aria-current": n.active || void 0,
		onClick: () => {
			n.onSelect?.(), l();
		},
		"data-testid": n["data-testid"],
		className: e(v, y(n)),
		children: /* @__PURE__ */ s(b, { item: n })
	});
}
//#endregion
export { g as a, p as c, d as i, f as n, h as o, m as r, u as s, _ as t };
