import { t as e } from "./cn-DhjIN-s0.js";
import { t } from "./Avatar-BzicCOft.js";
import { t as n } from "./StatusDot-Bgx2zxgC.js";
import { t as r } from "./InlinePopover-D25AtkYZ.js";
import { useCallback as i, useEffect as a, useRef as o, useState as s } from "react";
import { Fragment as c, jsx as l, jsxs as u } from "react/jsx-runtime";
//#region src/components/ui/Icons.tsx
function d(e, t) {
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
function f({ size: e = 16, ...t }) {
	return /* @__PURE__ */ l("svg", {
		...d(e, t),
		children: /* @__PURE__ */ l("path", { d: "M8 3.5v9M3.5 8h9" })
	});
}
function p({ size: e = 16, ...t }) {
	return /* @__PURE__ */ l("svg", {
		...d(e, t),
		children: /* @__PURE__ */ l("path", { d: "M4 4l8 8M12 4l-8 8" })
	});
}
function m({ size: e = 16, ...t }) {
	return /* @__PURE__ */ l("svg", {
		...d(e, t),
		children: /* @__PURE__ */ l("path", { d: "M13.5 10a1.5 1.5 0 0 1-1.5 1.5H5.5L2.5 14V3.5A1.5 1.5 0 0 1 4 2h8a1.5 1.5 0 0 1 1.5 1.5z" })
	});
}
function h({ size: e = 16, ...t }) {
	return /* @__PURE__ */ l("svg", {
		...d(e, t),
		children: /* @__PURE__ */ l("path", { d: "M3 8.5V13a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V8.5M10.5 4.5 8 2 5.5 4.5M8 2v8" })
	});
}
function g({ size: e = 16, dir: t = "down", ...n }) {
	let r = t === "down" ? "M4 6l4 4 4-4" : t === "up" ? "M4 10l4-4 4 4" : t === "left" ? "M10 4 6 8l4 4" : "M6 4l4 4-4 4";
	return /* @__PURE__ */ l("svg", {
		...d(e, n),
		children: /* @__PURE__ */ l("path", { d: r })
	});
}
function _({ size: e = 16, ...t }) {
	return /* @__PURE__ */ u("svg", {
		...d(e, t),
		children: [/* @__PURE__ */ l("circle", {
			cx: "8",
			cy: "8",
			r: "5.5"
		}), /* @__PURE__ */ l("path", { d: "M8 5v3l2 1.5" })]
	});
}
function v({ size: e = 16, ...t }) {
	return /* @__PURE__ */ u("svg", {
		...d(e, t),
		children: [/* @__PURE__ */ l("path", { d: "M9.5 2H4.5A1.5 1.5 0 0 0 3 3.5v9A1.5 1.5 0 0 0 4.5 14h7a1.5 1.5 0 0 0 1.5-1.5V5.5z" }), /* @__PURE__ */ l("path", { d: "M9.5 2v3.5H13M6 9h4M6 11.5h4" })]
	});
}
function y({ size: e = 16, ...t }) {
	return /* @__PURE__ */ u("svg", {
		...d(e, t),
		children: [
			/* @__PURE__ */ l("path", { d: "M7 3H4a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V9" }),
			/* @__PURE__ */ l("path", { d: "M9.5 2.5H13.5V6.5" }),
			/* @__PURE__ */ l("path", { d: "M13.5 2.5 7.5 8.5" })
		]
	});
}
function b({ size: e = 16, ...t }) {
	return /* @__PURE__ */ u("svg", {
		...d(e, t),
		children: [/* @__PURE__ */ l("path", { d: "M11.5 2.5 13.5 4.5 5.5 12.5H3.5V10.5z" }), /* @__PURE__ */ l("path", { d: "M10 4l2 2" })]
	});
}
function x({ size: e = 16, ...t }) {
	return /* @__PURE__ */ u("svg", {
		...d(e, t),
		children: [
			/* @__PURE__ */ l("path", { d: "M3 4.5h10" }),
			/* @__PURE__ */ l("path", { d: "M6.5 4.5V3h3v1.5" }),
			/* @__PURE__ */ l("path", { d: "M4.5 4.5 5 13h6l.5-8.5" }),
			/* @__PURE__ */ l("path", { d: "M7 7v4M9 7v4" })
		]
	});
}
function S({ size: e = 16, ...t }) {
	return /* @__PURE__ */ u("svg", {
		...d(e, t),
		children: [
			/* @__PURE__ */ l("path", { d: "M5.5 2h5" }),
			/* @__PURE__ */ l("path", { d: "M6.5 2v3.5L5 8.5h6L9.5 5.5V2" }),
			/* @__PURE__ */ l("path", { d: "M8 8.5V14" })
		]
	});
}
function C({ size: e = 16, ...t }) {
	return /* @__PURE__ */ u("svg", {
		...d(e, t),
		children: [
			/* @__PURE__ */ l("path", { d: "M4.6 11.5h6.8l-.8-1.4V7a2.7 2.7 0 0 0-4.2-2.2" }),
			/* @__PURE__ */ l("path", { d: "M5.3 6.3V7v3.1l-.7 1.4" }),
			/* @__PURE__ */ l("path", { d: "M6.9 13.2a1.2 1.2 0 0 0 2.2 0" }),
			/* @__PURE__ */ l("path", { d: "M2.5 2.5 13.5 13.5" })
		]
	});
}
function w({ size: e = 16, ...t }) {
	return /* @__PURE__ */ u("svg", {
		...d(e, t),
		children: [/* @__PURE__ */ l("rect", {
			x: "3.5",
			y: "7.5",
			width: "9",
			height: "6",
			rx: "1.2"
		}), /* @__PURE__ */ l("path", { d: "M5.5 7.5V5.5a2.5 2.5 0 0 1 5 0v2" })]
	});
}
function T({ size: e = 16, ...t }) {
	return /* @__PURE__ */ l("svg", {
		...d(e, t),
		children: /* @__PURE__ */ l("path", { d: "M8.5 2 4 9h3.2l-.7 5L12 7H8.8z" })
	});
}
function E({ size: e = 16, ...t }) {
	return /* @__PURE__ */ u("svg", {
		...d(e, t),
		children: [/* @__PURE__ */ l("circle", {
			cx: "8",
			cy: "8.3",
			r: "2.8"
		}), /* @__PURE__ */ l("path", { d: "M10.8 8.3v.9a1.9 1.9 0 0 0 3.7 0V8a6.5 6.5 0 1 0-2.8 5.4" })]
	});
}
//#endregion
//#region src/components/shared/PresenceAvatars.tsx
var D = {
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
function O(e) {
	return e.idle === !0 ? "#f59e0b" : e.online === !1 ? "var(--color-text-tertiary)" : e.online === !0 ? "#22c55e" : null;
}
function k(e) {
	if (e) return /^#[0-9a-fA-F]{6}$/.test(e) ? `${e}99` : (/^#[0-9a-fA-F]{8}$/.test(e), e);
}
function A({ user: t, isFollowing: n, onFollow: r, children: i }) {
	let [c, d] = s(!1), f = o(null), p = () => {
		f.current &&= (clearTimeout(f.current), null), d(!0);
	}, m = () => {
		f.current = setTimeout(() => d(!1), 150);
	};
	return a(() => () => {
		f.current && clearTimeout(f.current);
	}, []), /* @__PURE__ */ u("span", {
		className: "relative inline-flex",
		onMouseEnter: p,
		onMouseLeave: m,
		onFocus: p,
		onBlur: m,
		onKeyDown: (e) => {
			e.key === "Escape" && d(!1);
		},
		children: [i, c && /* @__PURE__ */ u("div", {
			role: "tooltip",
			"data-testid": "presence-card",
			onMouseEnter: p,
			onMouseLeave: m,
			className: "absolute top-full left-1/2 -translate-x-1/2 mt-1.5 z-50 min-w-[140px] rounded-md border border-border bg-surface shadow-lg px-2.5 py-2 text-left",
			children: [
				/* @__PURE__ */ l("div", {
					className: "text-[12px] font-semibold text-text-primary whitespace-nowrap",
					children: t.name
				}),
				t.detail && /* @__PURE__ */ l("div", {
					className: "text-[11px] text-text-tertiary whitespace-nowrap",
					children: t.detail
				}),
				t.location && /* @__PURE__ */ u("div", {
					className: "text-[11px] text-text-tertiary whitespace-nowrap mt-0.5",
					children: ["§ ", t.location]
				}),
				/* @__PURE__ */ l("button", {
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
function j({ users: r, maxVisible: i = 5, size: a = 28, onMoreClick: o, onUserClick: s, onFollowUser: d, followingUserId: f = null, className: p }) {
	let m = r.slice(0, i), h = r.length - m.length, g = -(a * .3), _ = Math.max(1, Math.round(a * .07)), v = Math.max(10, Math.round(a * .42));
	return /* @__PURE__ */ u("div", {
		className: e("inline-flex items-center", p),
		role: "list",
		"aria-label": "Online users",
		children: [m.map((e, r) => {
			let i = O(e), o = e.idle === !0, p = o ? k(e.color) : e.color, m = o && !e.color ? .6 : void 0, h = e.mode ? D[e.mode] : null, y = [e.name];
			o ? y.push("Away") : h && y.push(h.label);
			let b = y.join(" — "), x = {
				"data-testid": "presence-avatar",
				"data-presence-user": e.name,
				"data-presence-user-id": e.id,
				...o ? { "data-presence-idle": "true" } : {},
				...e.mode ? { "data-presence-mode": e.mode } : {}
			}, S = /* @__PURE__ */ u(c, { children: [
				e.avatarUrl ? /* @__PURE__ */ l("img", {
					src: e.avatarUrl,
					alt: e.name,
					className: "rounded-full object-cover",
					style: {
						width: a,
						height: a,
						border: `${_}px solid white`,
						opacity: m
					}
				}) : /* @__PURE__ */ l(t, {
					name: e.name,
					size: a,
					color: p,
					style: {
						border: `${_}px solid white`,
						opacity: m
					}
				}),
				i && /* @__PURE__ */ l("span", {
					className: "absolute -bottom-0.5 -right-0.5",
					children: /* @__PURE__ */ l(n, {
						color: i,
						size: "xs",
						"aria-label": o ? `${e.name} away` : e.online === !1 ? `${e.name} offline` : `${e.name} online`
					})
				}),
				h && /* @__PURE__ */ l("span", {
					className: "absolute flex items-center justify-center rounded-full bg-surface border border-border select-none",
					style: {
						top: -_,
						right: -_,
						width: v,
						height: v,
						fontSize: v * .6,
						lineHeight: 1
					},
					"data-testid": "presence-mode-badge",
					"aria-label": h.label,
					children: h.glyph
				})
			] }), C = { marginLeft: r > 0 ? g : 0 };
			return ((t) => d ? /* @__PURE__ */ l(A, {
				user: e,
				isFollowing: f === e.id,
				onFollow: d,
				children: t
			}, e.id) : t)(s ? /* @__PURE__ */ l("button", {
				type: "button",
				role: "listitem",
				onClick: (t) => {
					t.stopPropagation(), s(e.id);
				},
				className: "relative shrink-0 p-0 bg-transparent border-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-info rounded-full",
				...d ? {} : { title: b },
				"aria-label": b,
				...x,
				style: C,
				children: S
			}, e.id) : /* @__PURE__ */ l("div", {
				role: "listitem",
				className: "relative shrink-0",
				...d ? {} : { title: b },
				...x,
				style: C,
				children: S
			}, e.id));
		}), h > 0 && /* @__PURE__ */ u("button", {
			type: "button",
			onClick: o,
			disabled: !o,
			"aria-label": `${h} more users`,
			className: e("inline-flex items-center justify-center rounded-full shrink-0", "font-semibold select-none bg-surface-emphasis text-text-secondary", o && "cursor-pointer hover:bg-surface-emphasis", !o && "cursor-default", "border-white"),
			style: {
				width: a,
				height: a,
				fontSize: a * .34,
				marginLeft: g,
				border: `${_}px solid white`
			},
			children: ["+", h]
		})]
	});
}
//#endregion
//#region src/components/shared/DropdownMenu.tsx
function M({ trigger: t, triggerLabel: n = "Open menu", triggerTitle: a, triggerClassName: d, triggerTabIndex: f, triggerTestId: p, align: m = "start", sections: h, className: g, "data-testid": _ = "dropdown-menu" }) {
	let [v, y] = s(!1), b = o(null), x = o(null), S = i(() => y(!1), []), C = i((e) => {
		if (![
			"ArrowDown",
			"ArrowUp",
			"Home",
			"End"
		].includes(e.key)) return;
		let t = x.current;
		if (!t) return;
		let n = Array.from(t.querySelectorAll("[role=\"menuitem\"]"));
		if (n.length === 0) return;
		e.preventDefault();
		let r = n.indexOf(document.activeElement), i;
		i = e.key === "Home" ? 0 : e.key === "End" ? n.length - 1 : e.key === "ArrowDown" ? r < 0 ? 0 : (r + 1) % n.length : r <= 0 ? n.length - 1 : r - 1, n[i].focus();
	}, []);
	return /* @__PURE__ */ u(c, { children: [/* @__PURE__ */ l("button", {
		ref: b,
		type: "button",
		"aria-label": n,
		"aria-haspopup": "menu",
		"aria-expanded": v,
		title: a,
		tabIndex: f,
		"data-testid": p,
		onClick: () => y((e) => !e),
		className: e("inline-flex items-center justify-center gap-1.5 cursor-pointer", "rounded-md border border-[var(--color-border)] px-2 py-1", "text-base leading-none text-[var(--color-text-secondary)]", "bg-transparent hover:bg-[var(--color-surface-hover)] transition-colors duration-100", v && "bg-[var(--color-surface-hover)]", d),
		children: t
	}), /* @__PURE__ */ l(r, {
		trigger: b,
		open: v,
		onClose: S,
		placement: m === "end" ? "bottom-end" : "bottom-start",
		className: e("min-w-[180px] p-0 overflow-hidden rounded-lg", g),
		"data-testid": _,
		children: /* @__PURE__ */ l("div", {
			ref: x,
			role: "menu",
			"aria-label": n,
			onKeyDown: C,
			className: "py-1 uic-menu-scroll",
			children: h.map((e, t) => /* @__PURE__ */ u("div", {
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
					e.items.map((e, t) => /* @__PURE__ */ l(I, {
						item: e,
						close: S,
						testId: _
					}, t))
				]
			}, t))
		})
	})] });
}
var N = "flex items-center gap-2.5 w-full text-left px-3.5 py-2 text-sm border-none cursor-pointer font-[inherit] transition-colors duration-100";
function P(e, t = !1) {
	return e.danger ? "text-danger-fg bg-transparent hover:bg-danger-bg" : e.active || t ? "font-semibold text-[var(--color-text-primary)] bg-[var(--color-surface-hover)]" : "font-normal text-[var(--color-text-primary)] bg-transparent hover:bg-[var(--color-surface-hover)]";
}
function F({ item: e }) {
	return /* @__PURE__ */ u(c, { children: [
		e.checked === void 0 ? e.icon ? /* @__PURE__ */ l("span", {
			className: "flex w-4 shrink-0 items-center justify-center text-base leading-none text-[var(--color-text-secondary)]",
			"aria-hidden": "true",
			children: e.icon
		}) : null : /* @__PURE__ */ l("span", {
			className: "flex w-4 shrink-0 items-center justify-center text-[var(--color-text-secondary)]",
			"aria-hidden": "true",
			children: e.checked ? "✓" : ""
		}),
		/* @__PURE__ */ u("span", {
			className: "flex min-w-0 flex-1 flex-col",
			children: [/* @__PURE__ */ l("span", {
				className: "truncate",
				children: e.label
			}), e.description && /* @__PURE__ */ l("span", {
				className: "truncate text-xs font-normal text-[var(--color-text-tertiary)]",
				children: e.description
			})]
		}),
		e.trailing !== void 0 && /* @__PURE__ */ l("span", {
			className: "shrink-0 text-xs text-[var(--color-text-tertiary)]",
			"aria-hidden": "true",
			children: e.trailing
		}),
		e.submenu && /* @__PURE__ */ l(g, {
			dir: "right",
			size: 14,
			className: "shrink-0 text-[var(--color-text-tertiary)]"
		})
	] });
}
function I({ item: t, close: n, testId: i }) {
	let [d, f] = s(!1), p = o(null), m = o(null), h = o(null), g = () => {
		h.current &&= (clearTimeout(h.current), null);
	}, _ = () => {
		g(), h.current = setTimeout(() => f(!1), 180);
	};
	return a(() => () => g(), []), t.submenu ? /* @__PURE__ */ u(c, { children: [/* @__PURE__ */ l("button", {
		ref: p,
		type: "button",
		role: "menuitem",
		"aria-haspopup": "menu",
		"aria-expanded": d,
		onMouseEnter: () => {
			g(), f(!0);
		},
		onMouseLeave: _,
		onClick: () => f(!0),
		onKeyDown: (e) => {
			(e.key === "ArrowRight" || e.key === "Enter" || e.key === " ") && (e.preventDefault(), f(!0), setTimeout(() => m.current?.querySelector("[role=\"menuitem\"],[role=\"menuitemcheckbox\"]")?.focus(), 0));
		},
		"data-testid": t["data-testid"],
		className: e(N, P(t, d)),
		children: /* @__PURE__ */ l(F, { item: t })
	}), /* @__PURE__ */ l(r, {
		trigger: p,
		open: d,
		onClose: () => f(!1),
		placement: "right",
		offset: 2,
		className: "min-w-[200px] p-0 overflow-hidden rounded-lg",
		"data-testid": `${i}-submenu`,
		children: /* @__PURE__ */ l("div", {
			ref: m,
			role: "menu",
			"aria-label": t.label,
			className: "py-1 uic-menu-scroll",
			onMouseEnter: g,
			onMouseLeave: _,
			onKeyDown: (e) => {
				e.key === "ArrowLeft" && (e.preventDefault(), f(!1), p.current?.focus());
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
					e.items.map((e, t) => /* @__PURE__ */ l(I, {
						item: e,
						close: n,
						testId: i
					}, t))
				]
			}, t))
		})
	})] }) : /* @__PURE__ */ l("button", {
		type: "button",
		role: t.checked === void 0 ? "menuitem" : "menuitemcheckbox",
		"aria-checked": t.checked === void 0 ? void 0 : t.checked,
		"aria-current": t.active || void 0,
		onClick: () => {
			t.onSelect?.(), n();
		},
		"data-testid": t["data-testid"],
		className: e(N, P(t)),
		children: /* @__PURE__ */ l(F, { item: t })
	});
}
//#endregion
export { x as _, C as a, p as c, _ as d, w as f, h as g, y as h, E as i, v as l, f as m, j as n, m as o, S as p, T as r, g as s, M as t, b as u };
