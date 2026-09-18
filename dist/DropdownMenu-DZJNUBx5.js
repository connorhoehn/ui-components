import { t as e } from "./cn-DhjIN-s0.js";
import { s as t } from "./Icons-CQiDn2Ki.js";
import { t as n } from "./Avatar-BzicCOft.js";
import { t as r } from "./StatusDot-Bgx2zxgC.js";
import { t as i } from "./InlinePopover-CG_Jwga7.js";
import { useCallback as a, useEffect as o, useRef as s, useState as c } from "react";
import { Fragment as l, jsx as u, jsxs as d } from "react/jsx-runtime";
//#region src/components/shared/PresenceAvatars.tsx
var f = {
	editor: {
		glyph: "✏",
		label: "Editing"
	},
	reviewer: {
		glyph: "✔",
		label: "Reviewing"
	},
	reader: {
		glyph: "👁",
		label: "Viewing"
	}
};
function p(e) {
	return e.idle === !0 ? "#f59e0b" : e.online === !1 ? "var(--color-text-tertiary)" : e.online === !0 ? "#22c55e" : null;
}
function m(e) {
	if (e) return /^#[0-9a-fA-F]{6}$/.test(e) ? `${e}99` : (/^#[0-9a-fA-F]{8}$/.test(e), e);
}
function h({ user: t, isFollowing: n, onFollow: r, children: i }) {
	let [a, l] = c(!1), f = s(null), p = () => {
		f.current &&= (clearTimeout(f.current), null), l(!0);
	}, m = () => {
		f.current = setTimeout(() => l(!1), 150);
	};
	return o(() => () => {
		f.current && clearTimeout(f.current);
	}, []), /* @__PURE__ */ d("span", {
		className: "relative inline-flex",
		onMouseEnter: p,
		onMouseLeave: m,
		onFocus: p,
		onBlur: m,
		onKeyDown: (e) => {
			e.key === "Escape" && l(!1);
		},
		children: [i, a && /* @__PURE__ */ d("div", {
			role: "tooltip",
			"data-testid": "presence-card",
			onMouseEnter: p,
			onMouseLeave: m,
			className: "absolute top-full left-1/2 -translate-x-1/2 mt-1.5 z-50 min-w-[140px] rounded-md border border-border bg-surface shadow-lg px-2.5 py-2 text-left",
			children: [
				/* @__PURE__ */ u("div", {
					className: "text-[12px] font-semibold text-text-primary whitespace-nowrap",
					children: t.name
				}),
				t.detail && /* @__PURE__ */ u("div", {
					className: "text-[11px] text-text-tertiary whitespace-nowrap",
					children: t.detail
				}),
				t.location && /* @__PURE__ */ d("div", {
					className: "text-[11px] text-text-tertiary whitespace-nowrap mt-0.5",
					children: ["§ ", t.location]
				}),
				/* @__PURE__ */ u("button", {
					type: "button",
					onClick: (e) => {
						e.stopPropagation(), r(t.id);
					},
					className: e("mt-1.5 text-[11px] font-semibold bg-transparent border-0 p-0 cursor-pointer", n ? "text-warning" : "text-info"),
					children: n ? "Stop following" : "Follow"
				})
			]
		})]
	});
}
function g({ users: t, maxVisible: i = 5, size: a = 28, onMoreClick: o, onUserClick: s, onFollowUser: c, followingUserId: g = null, className: _ }) {
	let v = t.slice(0, i), y = t.length - v.length, b = -(a * .3), x = Math.max(1, Math.round(a * .07)), S = Math.max(10, Math.round(a * .42));
	return /* @__PURE__ */ d("div", {
		className: e("inline-flex items-center", _),
		role: "list",
		"aria-label": "Online users",
		children: [v.map((e, t) => {
			let i = p(e), o = e.idle === !0, _ = o ? m(e.color) : e.color, v = o && !e.color ? .6 : void 0, y = e.mode ? f[e.mode] : null, C = [e.name];
			o ? C.push("Away") : y && C.push(y.label);
			let w = C.join(" — "), T = {
				"data-testid": "presence-avatar",
				"data-presence-user": e.name,
				"data-presence-user-id": e.id,
				...o ? { "data-presence-idle": "true" } : {},
				...e.mode ? { "data-presence-mode": e.mode } : {}
			}, E = /* @__PURE__ */ d(l, { children: [
				e.avatarUrl ? /* @__PURE__ */ u("img", {
					src: e.avatarUrl,
					alt: e.name,
					className: "rounded-full object-cover",
					style: {
						width: a,
						height: a,
						border: `${x}px solid white`,
						opacity: v
					}
				}) : /* @__PURE__ */ u(n, {
					name: e.name,
					size: a,
					color: _,
					style: {
						border: `${x}px solid white`,
						opacity: v
					}
				}),
				i && /* @__PURE__ */ u("span", {
					className: "absolute -bottom-0.5 -right-0.5",
					children: /* @__PURE__ */ u(r, {
						color: i,
						size: "xs",
						"aria-label": o ? `${e.name} away` : e.online === !1 ? `${e.name} offline` : `${e.name} online`
					})
				}),
				y && /* @__PURE__ */ u("span", {
					className: "absolute flex items-center justify-center rounded-full bg-surface border border-border select-none",
					style: {
						top: -x,
						right: -x,
						width: S,
						height: S,
						fontSize: S * .6,
						lineHeight: 1
					},
					"data-testid": "presence-mode-badge",
					"aria-label": y.label,
					children: y.glyph
				})
			] }), D = { marginLeft: t > 0 ? b : 0 };
			return ((t) => c ? /* @__PURE__ */ u(h, {
				user: e,
				isFollowing: g === e.id,
				onFollow: c,
				children: t
			}, e.id) : t)(s ? /* @__PURE__ */ u("button", {
				type: "button",
				role: "listitem",
				onClick: (t) => {
					t.stopPropagation(), s(e.id);
				},
				className: "relative shrink-0 p-0 bg-transparent border-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-info rounded-full",
				...c ? {} : { title: w },
				"aria-label": w,
				...T,
				style: D,
				children: E
			}, e.id) : /* @__PURE__ */ u("div", {
				role: "listitem",
				className: "relative shrink-0",
				...c ? {} : { title: w },
				...T,
				style: D,
				children: E
			}, e.id));
		}), y > 0 && /* @__PURE__ */ d("button", {
			type: "button",
			onClick: o,
			disabled: !o,
			"aria-label": `${y} more users`,
			className: e("inline-flex items-center justify-center rounded-full shrink-0", "font-semibold select-none bg-surface-emphasis text-text-secondary", o && "cursor-pointer hover:bg-surface-emphasis", !o && "cursor-default", "border-white"),
			style: {
				width: a,
				height: a,
				fontSize: a * .34,
				marginLeft: b,
				border: `${x}px solid white`
			},
			children: ["+", y]
		})]
	});
}
//#endregion
//#region src/components/shared/DropdownMenu.tsx
function _({ trigger: t, triggerLabel: n = "Open menu", triggerTitle: r, triggerClassName: o, triggerTabIndex: f, triggerTestId: p, align: m = "start", sections: h, className: g, "data-testid": _ = "dropdown-menu" }) {
	let [v, y] = c(!1), b = s(null), S = s(null), C = a(() => y(!1), []), w = a((e) => {
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
	return /* @__PURE__ */ d(l, { children: [/* @__PURE__ */ u("button", {
		ref: b,
		type: "button",
		"aria-label": n,
		"aria-haspopup": "menu",
		"aria-expanded": v,
		title: r,
		tabIndex: f,
		"data-testid": p,
		onClick: () => y((e) => !e),
		className: e("inline-flex items-center justify-center gap-1.5 cursor-pointer", "rounded-md border border-[var(--color-border)] px-2 py-1", "text-base leading-none text-[var(--color-text-secondary)]", "bg-transparent hover:bg-[var(--color-surface-hover)] transition-colors duration-100", v && "bg-[var(--color-surface-hover)]", o),
		children: t
	}), /* @__PURE__ */ u(i, {
		trigger: b,
		open: v,
		onClose: C,
		placement: m === "end" ? "bottom-end" : "bottom-start",
		className: e("min-w-[180px] p-0 overflow-hidden rounded-lg", g),
		"data-testid": _,
		children: /* @__PURE__ */ u("div", {
			ref: S,
			role: "menu",
			"aria-label": n,
			onKeyDown: w,
			className: "py-1 uic-menu-scroll",
			children: h.map((e, t) => /* @__PURE__ */ d("div", {
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
					e.items.map((e, t) => /* @__PURE__ */ u(x, {
						item: e,
						close: C,
						testId: _
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
	return /* @__PURE__ */ d(l, { children: [
		e.checked === void 0 ? e.icon ? /* @__PURE__ */ u("span", {
			className: "flex w-4 shrink-0 items-center justify-center text-base leading-none text-[var(--color-text-secondary)]",
			"aria-hidden": "true",
			children: e.icon
		}) : null : /* @__PURE__ */ u("span", {
			className: "flex w-4 shrink-0 items-center justify-center text-[var(--color-text-secondary)]",
			"aria-hidden": "true",
			children: e.checked ? "✓" : ""
		}),
		/* @__PURE__ */ d("span", {
			className: "flex min-w-0 flex-1 flex-col",
			children: [/* @__PURE__ */ u("span", {
				className: "truncate",
				children: e.label
			}), e.description && /* @__PURE__ */ u("span", {
				className: "truncate text-xs font-normal text-[var(--color-text-tertiary)]",
				children: e.description
			})]
		}),
		e.trailing !== void 0 && /* @__PURE__ */ u("span", {
			className: "shrink-0 text-xs text-[var(--color-text-tertiary)]",
			"aria-hidden": "true",
			children: e.trailing
		}),
		e.submenu && /* @__PURE__ */ u(t, {
			dir: "right",
			size: 14,
			className: "shrink-0 text-[var(--color-text-tertiary)]"
		})
	] });
}
function x({ item: t, close: n, testId: r }) {
	let [a, f] = c(!1), p = s(null), m = s(null), h = s(null), g = () => {
		h.current &&= (clearTimeout(h.current), null);
	}, _ = () => {
		g(), h.current = setTimeout(() => f(!1), 180);
	};
	return o(() => () => g(), []), t.submenu ? /* @__PURE__ */ d(l, { children: [/* @__PURE__ */ u("button", {
		ref: p,
		type: "button",
		role: "menuitem",
		"aria-haspopup": "menu",
		"aria-expanded": a,
		onMouseEnter: () => {
			g(), f(!0);
		},
		onMouseLeave: _,
		onClick: () => f(!0),
		onKeyDown: (e) => {
			(e.key === "ArrowRight" || e.key === "Enter" || e.key === " ") && (e.preventDefault(), f(!0), setTimeout(() => m.current?.querySelector("[role=\"menuitem\"],[role=\"menuitemcheckbox\"]")?.focus(), 0));
		},
		"data-testid": t["data-testid"],
		className: e(v, y(t, a)),
		children: /* @__PURE__ */ u(b, { item: t })
	}), /* @__PURE__ */ u(i, {
		trigger: p,
		open: a,
		onClose: () => f(!1),
		placement: "right",
		offset: 2,
		className: "min-w-[200px] p-0 overflow-hidden rounded-lg",
		"data-testid": `${r}-submenu`,
		children: /* @__PURE__ */ u("div", {
			ref: m,
			role: "menu",
			"aria-label": t.label,
			className: "py-1 uic-menu-scroll",
			onMouseEnter: g,
			onMouseLeave: _,
			onKeyDown: (e) => {
				e.key === "ArrowLeft" && (e.preventDefault(), f(!1), p.current?.focus());
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
					e.items.map((e, t) => /* @__PURE__ */ u(x, {
						item: e,
						close: n,
						testId: r
					}, t))
				]
			}, t))
		})
	})] }) : /* @__PURE__ */ u("button", {
		type: "button",
		role: t.checked === void 0 ? "menuitem" : "menuitemcheckbox",
		"aria-checked": t.checked === void 0 ? void 0 : t.checked,
		"aria-current": t.active || void 0,
		onClick: () => {
			t.onSelect?.(), n();
		},
		"data-testid": t["data-testid"],
		className: e(v, y(t)),
		children: /* @__PURE__ */ u(b, { item: t })
	});
}
//#endregion
export { g as n, _ as t };
