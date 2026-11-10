import { d as e, n as t } from "./Button-DQoeE5dN.js";
import { n } from "./safeHref-BL4Z8n8E.js";
import { t as r } from "./Text-fqIvcZp2.js";
import { t as i } from "./IconButton-BgM9MvwA.js";
import { St as a, a as o, h as s, p as c } from "./Icons-CqVFbuiZ.js";
import { t as l } from "./Badge-BArozXCv.js";
import { t as u } from "./Tooltip-ClzY6PN8.js";
import { t as d } from "./InlinePopover-BQTS5egk.js";
import { t as f } from "./EmptyState-D0-FmU2J.js";
import { n as p, t as m } from "./Tabs-CufFeWur.js";
import { useCallback as h, useEffect as g, useId as _, useRef as v, useState as y } from "react";
import { Fragment as b, jsx as x, jsxs as S } from "react/jsx-runtime";
//#region src/components/shared/ConnectionPill.tsx
var C = {
	idle: {
		label: "Idle",
		colorClass: "text-text-secondary"
	},
	connecting: {
		label: "Connecting…",
		colorClass: "text-warning-fg"
	},
	connected: {
		label: "Connected",
		colorClass: "text-success-fg"
	},
	reconnecting: {
		label: "Reconnecting…",
		colorClass: "text-warning-fg"
	},
	disconnected: {
		label: "Disconnected",
		colorClass: "text-danger-fg"
	}
}, w = {
	idle: "text-code-muted",
	connecting: "text-code-peach",
	connected: "text-code-green",
	reconnecting: "text-code-peach",
	disconnected: "text-code-red"
};
function T({ state: t, tone: n = "surface", compact: r = !1, withLabel: i = !0, labels: a, action: o, className: s, "data-testid": c = "connection-pill" }) {
	let l = C[t], u = a?.[t] ?? l?.label ?? String(t), d = i && !r, f = n === "code" ? w[t] : l?.colorClass;
	return /* @__PURE__ */ S("span", {
		role: "status",
		"aria-live": "polite",
		"aria-label": d ? void 0 : u,
		"data-testid": c,
		"data-state": t,
		className: e("inline-flex items-center gap-1.5 font-mono", s),
		children: [
			/* @__PURE__ */ x("span", {
				"aria-hidden": "true",
				className: f,
				children: "⬤"
			}),
			d && /* @__PURE__ */ x("span", {
				className: e(f, "font-semibold"),
				children: u
			}),
			o && !r && /* @__PURE__ */ x("button", {
				"data-ui-part": "",
				type: "button",
				onClick: o.onClick,
				disabled: o.disabled,
				"data-testid": o["data-testid"] ?? "connection-pill-action",
				className: e("rounded-sm px-1 underline decoration-dotted underline-offset-2", "hover:decoration-solid focus-visible:outline-2 focus-visible:outline-offset-1", "disabled:cursor-not-allowed disabled:no-underline disabled:opacity-50", f),
				children: o.label
			})
		]
	});
}
//#endregion
//#region src/components/shared/NotificationCenter.tsx
function E(e) {
	if (e == null) return null;
	let t = new Date(e);
	if (isNaN(t.getTime())) return null;
	let n = Date.now() - t.getTime();
	return n < 6e4 ? "just now" : n < 36e5 ? `${Math.floor(n / 6e4)}m ago` : n < 864e5 ? `${Math.floor(n / 36e5)}h ago` : `${Math.floor(n / 864e5)}d ago`;
}
function D({ items: t, onItemClick: n, onMarkAllRead: o, onClearAll: s, footer: l, emptyTestId: d, className: h, "data-testid": g }) {
	let [v, b] = y("unread"), C = _(), w = t.filter((e) => !e.read), T = v === "unread" ? w : t, D = w.length > 0;
	return /* @__PURE__ */ S("section", {
		"data-ui-part": "",
		"data-testid": g,
		"aria-label": "Notifications",
		className: e("flex min-h-0 flex-col bg-surface text-text-primary", h),
		children: [
			/* @__PURE__ */ S("div", {
				className: "flex shrink-0 flex-wrap items-center justify-between gap-2 border-b border-border px-4 py-3",
				children: [/* @__PURE__ */ x("h2", { children: /* @__PURE__ */ S(r, {
					as: "span",
					size: "sm",
					weight: "semibold",
					children: ["Notifications ", D && /* @__PURE__ */ x("span", {
						className: "ml-2 text-xs text-primary",
						"aria-label": `${w.length} unread`,
						children: w.length
					})]
				}) }), /* @__PURE__ */ S("div", {
					className: "flex items-center gap-2",
					children: [o && D && /* @__PURE__ */ x(u, {
						content: "Mark all read",
						placement: "bottom",
						children: /* @__PURE__ */ x(i, {
							"aria-label": "Mark all read",
							icon: /* @__PURE__ */ x(c, { size: 16 }),
							onClick: o
						})
					}), s && t.length > 0 && /* @__PURE__ */ x(u, {
						content: "Clear all",
						placement: "bottom",
						children: /* @__PURE__ */ x(i, {
							"aria-label": "Clear all",
							icon: /* @__PURE__ */ x(a, { size: 16 }),
							onClick: s
						})
					})]
				})]
			}),
			/* @__PURE__ */ x(p, {
				idPrefix: C,
				className: "mx-4 shrink-0",
				"aria-label": "Notification filter",
				value: v,
				onValueChange: (e) => b(e),
				size: "md",
				variant: "underline",
				items: [{
					id: "unread",
					label: `Unread${w.length ? ` (${w.length})` : ""}`
				}, {
					id: "all",
					label: "All"
				}]
			}),
			/* @__PURE__ */ x(m, {
				id: v,
				when: v,
				idPrefix: C,
				className: "flex min-h-0 flex-1 flex-col overflow-y-auto py-2",
				children: T.length === 0 ? /* @__PURE__ */ x(f, {
					size: "sm",
					align: "start",
					className: "px-4 py-2",
					...d ? { testId: d } : {},
					title: t.length === 0 ? "Nothing new" : v === "unread" ? "All caught up" : "No notifications",
					body: t.length === 0 ? "Activity will appear here." : v === "unread" ? "No unread notifications." : "Notifications will appear here."
				}) : T.map((t) => /* @__PURE__ */ S(n ? "button" : "div", {
					type: n ? "button" : void 0,
					onClick: n ? () => n(t) : void 0,
					className: e("flex items-start gap-3 px-4 py-3 text-left border-0 border-b border-solid border-border/50 last:border-b-0", "transition-colors duration-100 font-[inherit] w-full", n && "cursor-pointer focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-[-2px]", t.read ? e("bg-transparent", n && "hover:bg-[var(--color-surface-hover)]") : e("bg-primary/5", n && "hover:bg-surface-hover")),
					children: [t.icon && /* @__PURE__ */ x("span", {
						className: "text-lg shrink-0 mt-0.5",
						"aria-hidden": "true",
						children: t.icon
					}), /* @__PURE__ */ S("div", {
						className: "flex-1 min-w-0",
						children: [
							/* @__PURE__ */ S("div", {
								className: "flex items-center justify-between gap-2",
								children: [/* @__PURE__ */ x("span", {
									className: e("text-sm leading-5 line-clamp-2", t.read ? "text-[var(--color-text-secondary)] font-normal" : "text-[var(--color-text-primary)] font-medium"),
									children: t.title
								}), !t.read && /* @__PURE__ */ x("span", {
									className: "shrink-0 w-1.5 h-1.5 rounded-full bg-primary",
									"aria-label": "Unread"
								})]
							}),
							t.body && /* @__PURE__ */ x("p", {
								className: "text-sm text-text-secondary mt-1 leading-5 line-clamp-2",
								children: t.body
							}),
							t.timestamp != null && /* @__PURE__ */ x("p", {
								className: "text-xs text-text-tertiary mt-1",
								children: E(t.timestamp)
							})
						]
					})]
				}, t.id))
			}),
			l != null && l !== !1 && /* @__PURE__ */ x("div", {
				className: "flex shrink-0 items-center justify-center border-t border-border px-4 py-1.5",
				"data-notification-footer": "",
				children: l
			})
		]
	});
}
//#endregion
//#region src/components/shared/NotificationBell.tsx
function O(e, t) {
	return t > 0 ? `${e}, ${t} unread` : e;
}
function k({ items: n, unreadCount: r, onItemClick: a, onMarkAllRead: s, onClearAll: c, label: u = "Activity", placement: f = "bottom-end", size: p = "md", seeAll: m, className: g, "data-testid": _ = "notification-bell" }) {
	let [b, C] = y(!1), w = v(null), T = Math.max(0, Math.trunc(r ?? n.filter((e) => e.read !== !0).length)), E = h(() => {
		C(!1), w.current?.querySelector("button")?.focus();
	}, []), k = a ? (e) => {
		a(e), E();
	} : void 0, A = m ? /* @__PURE__ */ x(t, {
		variant: "link",
		size: "sm",
		onClick: () => {
			E(), m.onSelect();
		},
		"data-testid": `${_}-see-all`,
		children: m.label ?? "See all activity"
	}) : null;
	return /* @__PURE__ */ S("span", {
		ref: w,
		"data-testid": _,
		"data-notification-bell": "",
		className: e("relative inline-flex", g),
		children: [/* @__PURE__ */ S(i, {
			"aria-label": O(u, T),
			"aria-haspopup": "dialog",
			"aria-expanded": b,
			size: p,
			className: e("relative", p === "sm" && "h-7 w-7"),
			onClick: () => C((e) => !e),
			"data-testid": `${_}-button`,
			children: [/* @__PURE__ */ x(o, { size: p === "sm" ? 16 : 18 }), T > 0 && /* @__PURE__ */ x("span", {
				"aria-hidden": "true",
				className: "pointer-events-none absolute -right-1.5 -top-1.5",
				children: /* @__PURE__ */ x(l, {
					variant: "count",
					value: T,
					color: "danger",
					"data-testid": `${_}-badge`
				})
			})]
		}), /* @__PURE__ */ x(d, {
			trigger: w,
			open: b,
			onClose: E,
			placement: f,
			"aria-label": u,
			"data-testid": `${_}-popover`,
			className: "w-[360px] max-w-[calc(100vw-16px)] overflow-hidden p-0",
			children: /* @__PURE__ */ x(D, {
				items: n,
				onItemClick: k,
				onMarkAllRead: s,
				onClearAll: c,
				footer: A,
				emptyTestId: `${_}-empty`,
				className: "max-h-[min(70vh,560px)] w-full",
				"data-testid": `${_}-center`
			})
		})]
	});
}
//#endregion
//#region src/components/layout/DockedAside.tsx
function A({ children: t, width: n = 420, offsetTop: r, maxHeight: a = "calc(100vh - 180px)", title: o, onClose: c, closeLabel: l = "Close", bodyPadding: u = "md", className: d, "data-testid": f = "docked-aside" }) {
	return /* @__PURE__ */ S("aside", {
		"data-testid": f,
		className: e("flex shrink-0 flex-col overflow-hidden rounded-lg border border-border bg-surface-panel", d),
		style: {
			width: n,
			marginTop: r,
			maxHeight: a
		},
		children: [(o !== void 0 || c) && /* @__PURE__ */ S("div", {
			className: "flex shrink-0 items-center justify-between gap-2 border-b border-border px-3.5 py-3",
			"data-testid": `${f}-header`,
			children: [/* @__PURE__ */ x("div", {
				className: "min-w-0 flex-1 truncate text-[13px] font-semibold text-text-secondary",
				children: o
			}), c && /* @__PURE__ */ x(i, {
				"aria-label": l,
				title: l,
				variant: "ghost",
				size: "sm",
				icon: /* @__PURE__ */ x(s, { size: 14 }),
				onClick: c,
				"data-testid": `${f}-close`
			})]
		}), /* @__PURE__ */ x("div", {
			className: e("min-h-0 flex-1 overflow-y-auto", u === "md" && "px-3 py-3.5"),
			"data-testid": `${f}-body`,
			children: t
		})]
	});
}
var j = {
	"bottom-right": "bottom-4 right-4",
	"bottom-left": "bottom-4 left-4",
	"top-right": "top-4 right-4",
	"top-left": "top-4 left-4"
};
function M({ children: t, corner: n = "bottom-right", width: r = 160, maxHeight: i = 280, className: a, "data-testid": o = "floating-card" }) {
	return /* @__PURE__ */ x("div", {
		"data-testid": o,
		"data-corner": n,
		className: e("fixed z-30 overflow-y-auto rounded-[10px] border border-border bg-surface px-3 py-2.5 shadow-lg", j[n], a),
		style: {
			width: r,
			maxHeight: i
		},
		children: t
	});
}
function N({ width: t, pinned: n, top: r, left: i, slotId: a, spacerRef: o, children: s, "data-testid": c = "pinned-slot" }) {
	return /* @__PURE__ */ x("div", {
		ref: o,
		className: "shrink-0",
		style: { width: t },
		"data-testid": c,
		children: /* @__PURE__ */ x("div", {
			id: a,
			className: e(n && "fixed z-30"),
			style: n ? {
				top: r,
				left: i,
				width: t
			} : void 0,
			"data-pinned": n ? "true" : "false",
			children: s
		})
	});
}
//#endregion
//#region src/components/sidebar/SidebarSection.tsx
function P(e, t) {
	if (typeof window > "u") return t;
	try {
		let n = window.localStorage.getItem(e);
		return n === null ? t : n === "true";
	} catch {
		return t;
	}
}
function F({ title: t, actions: n, collapsible: r = !0, defaultCollapsed: i = !1, storageKey: a, children: o, className: s, "data-testid": c = "sidebar-section" }) {
	let l = _(), u = `${l}-label`, d = `${l}-body`, f = a ?? `sidebar-section:${t}`, [p, m] = y(() => r ? P(f, i) : !1);
	g(() => {
		if (r && !(typeof window > "u")) try {
			window.localStorage.setItem(f, String(p));
		} catch {}
	}, [
		p,
		r,
		f
	]);
	let h = !p, b = v(null), C = v(null);
	return /* @__PURE__ */ S("section", {
		"data-ui-part": "",
		"aria-labelledby": u,
		"data-testid": c,
		"data-collapsed": p ? "true" : "false",
		className: e("flex flex-col", s),
		children: [/* @__PURE__ */ S("div", {
			className: "flex items-center justify-between gap-1 py-2 pr-1",
			children: [/* @__PURE__ */ S("button", {
				"data-ui-part": "",
				type: "button",
				ref: b,
				id: u,
				"aria-expanded": r ? h : void 0,
				"aria-controls": d,
				onClick: () => {
					if (r) {
						if (h) {
							let e = typeof document > "u" ? null : document.activeElement;
							e && C.current?.contains(e) && b.current?.focus();
						}
						m((e) => !e);
					}
				},
				disabled: !r,
				className: e("flex items-center gap-1.5 min-w-0 flex-1", "text-[11px] font-bold uppercase tracking-[0.5px]", "text-neutral select-none text-left", r && "cursor-pointer hover:text-text-primary", !r && "cursor-default", "bg-transparent border-0 p-0 m-0"),
				children: [r && /* @__PURE__ */ x("span", {
					"aria-hidden": "true",
					className: e("inline-block text-[10px] leading-none transition-transform duration-150", h ? "rotate-90" : "rotate-0"),
					children: "▸"
				}), /* @__PURE__ */ x("span", {
					className: "truncate",
					children: t
				})]
			}), n && /* @__PURE__ */ x("div", {
				className: "flex items-center gap-1 shrink-0",
				children: n
			})]
		}), /* @__PURE__ */ x("div", {
			id: d,
			ref: C,
			hidden: !h,
			className: e("flex flex-col gap-0.5", h && "pb-1"),
			children: o
		})]
	});
}
//#endregion
//#region src/components/sidebar/SidebarRow.tsx
function I({ icon: t, label: r, trailing: i, active: a = !1, onClick: o, onContextMenu: s, href: c, kebab: l, disabled: u = !1, "aria-label": d, className: f, "data-testid": p = "sidebar-row", dataAttrs: m }) {
	let g = {};
	if (m) for (let [e, t] of Object.entries(m)) t != null && t !== "" && (g[e] = t);
	let _ = v(null), y = h(() => {
		u || o?.();
	}, [u, o]), C = h((e) => {
		if (!u) {
			if (e.key === "Enter" || e.key === " ") {
				e.preventDefault(), o?.();
				return;
			}
			e.key === "ContextMenu" && s && (e.preventDefault(), s(e));
		}
	}, [
		u,
		o,
		s
	]), w = h((e) => {
		u || s?.(e);
	}, [u, s]), T = !!o || !!c || !!s, E = e("group relative flex items-center gap-2 w-full", "px-2 py-1.5 rounded-md text-sm leading-tight select-none", "transition-colors duration-100", !u && T && "cursor-pointer hover:bg-surface-hover", a && !u && "bg-info-bg text-info-fg hover:bg-info-bg", !a && !u && "text-text-primary", u && "opacity-50 cursor-not-allowed text-neutral", "no-underline", f), D = /* @__PURE__ */ S(b, { children: [
		t && /* @__PURE__ */ x("span", {
			className: "inline-flex items-center justify-center w-4 h-4 shrink-0 text-text-tertiary group-hover:text-neutral",
			children: t
		}),
		/* @__PURE__ */ x("span", {
			className: "flex-1 min-w-0 truncate",
			children: r
		}),
		i && /* @__PURE__ */ x("span", {
			className: "flex items-center gap-1 shrink-0",
			children: i
		}),
		l && /* @__PURE__ */ x("span", {
			className: "shrink-0",
			onClick: (e) => e.stopPropagation(),
			onKeyDown: (e) => e.stopPropagation(),
			children: l
		})
	] });
	return c ? /* @__PURE__ */ x("a", {
		ref: _,
		href: n(c) ?? void 0,
		"aria-current": a ? "page" : void 0,
		"aria-disabled": u || void 0,
		"aria-label": d,
		"data-testid": p,
		"data-active": a ? "true" : "false",
		...g,
		className: E,
		onClick: (e) => {
			if (u) {
				e.preventDefault();
				return;
			}
			o && (e.preventDefault(), o());
		},
		onContextMenu: w,
		onKeyDown: C,
		children: D
	}) : /* @__PURE__ */ x("div", {
		ref: _,
		role: T ? "button" : void 0,
		tabIndex: T ? u ? -1 : 0 : void 0,
		"aria-pressed": T ? a : void 0,
		"aria-disabled": u || void 0,
		"aria-label": d,
		"data-testid": p,
		"data-active": a ? "true" : "false",
		...g,
		className: E,
		onClick: y,
		onContextMenu: w,
		onKeyDown: C,
		children: D
	});
}
//#endregion
export { N as a, T as c, M as i, F as n, k as o, A as r, D as s, I as t };
