import { t as e } from "./cn-D4QmbyEy.js";
import { n as t } from "./Button-C-I3BxWI.js";
import { t as n } from "./IconButton-Bf5Wy0tS.js";
import { St as r, a as i, h as a, p as o } from "./Icons-CqVFbuiZ.js";
import { i as s, r as c, t as l } from "./Text-BAAQrepu.js";
import { t as u } from "./Badge-D58pEJIm.js";
import { t as d } from "./Tooltip-Q0urBp4N.js";
import { t as f } from "./InlinePopover-Dx8-r-XU.js";
import { t as p } from "./EmptyState-pOG782nO.js";
import { useCallback as m, useEffect as h, useId as g, useRef as _, useState as v } from "react";
import { Fragment as y, jsx as b, jsxs as x } from "react/jsx-runtime";
//#region src/components/shared/ConnectionPill.tsx
var S = {
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
}, C = {
	idle: "text-code-muted",
	connecting: "text-code-peach",
	connected: "text-code-green",
	reconnecting: "text-code-peach",
	disconnected: "text-code-red"
};
function w({ state: t, tone: n = "surface", compact: r = !1, withLabel: i = !0, labels: a, action: o, className: s, "data-testid": c = "connection-pill" }) {
	let l = S[t], u = a?.[t] ?? l?.label ?? String(t), d = i && !r, f = n === "code" ? C[t] : l?.colorClass;
	return /* @__PURE__ */ x("span", {
		role: "status",
		"aria-live": "polite",
		"aria-label": d ? void 0 : u,
		"data-testid": c,
		"data-state": t,
		className: e("inline-flex items-center gap-1.5 font-mono", s),
		children: [
			/* @__PURE__ */ b("span", {
				"aria-hidden": "true",
				className: f,
				children: "⬤"
			}),
			d && /* @__PURE__ */ b("span", {
				className: e(f, "font-semibold"),
				children: u
			}),
			o && !r && /* @__PURE__ */ b("button", {
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
function T(e) {
	if (e == null) return null;
	let t = new Date(e);
	if (isNaN(t.getTime())) return null;
	let n = Date.now() - t.getTime();
	return n < 6e4 ? "just now" : n < 36e5 ? `${Math.floor(n / 6e4)}m ago` : n < 864e5 ? `${Math.floor(n / 36e5)}h ago` : `${Math.floor(n / 864e5)}d ago`;
}
function E({ items: t, onItemClick: i, onMarkAllRead: a, onClearAll: u, footer: f, emptyTestId: m, className: h, "data-testid": _ }) {
	let [y, S] = v("unread"), C = g(), w = t.filter((e) => !e.read), E = y === "unread" ? w : t, D = w.length > 0;
	return /* @__PURE__ */ x("section", {
		"data-ui-part": "",
		"data-testid": _,
		"aria-label": "Notifications",
		className: e("flex min-h-0 flex-col bg-surface text-text-primary", h),
		children: [
			/* @__PURE__ */ x("div", {
				className: "flex shrink-0 flex-wrap items-center justify-between gap-2 border-b border-border px-4 py-3",
				children: [/* @__PURE__ */ b("h2", { children: /* @__PURE__ */ x(l, {
					as: "span",
					size: "sm",
					weight: "semibold",
					children: ["Notifications ", D && /* @__PURE__ */ b("span", {
						className: "ml-2 text-xs text-primary",
						"aria-label": `${w.length} unread`,
						children: w.length
					})]
				}) }), /* @__PURE__ */ x("div", {
					className: "flex items-center gap-2",
					children: [a && D && /* @__PURE__ */ b(d, {
						content: "Mark all read",
						placement: "bottom",
						children: /* @__PURE__ */ b(n, {
							"aria-label": "Mark all read",
							icon: /* @__PURE__ */ b(o, { size: 16 }),
							onClick: a
						})
					}), u && t.length > 0 && /* @__PURE__ */ b(d, {
						content: "Clear all",
						placement: "bottom",
						children: /* @__PURE__ */ b(n, {
							"aria-label": "Clear all",
							icon: /* @__PURE__ */ b(r, { size: 16 }),
							onClick: u
						})
					})]
				})]
			}),
			/* @__PURE__ */ b(s, {
				idPrefix: C,
				className: "mx-4 shrink-0",
				"aria-label": "Notification filter",
				value: y,
				onValueChange: (e) => S(e),
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
			/* @__PURE__ */ b(c, {
				id: y,
				when: y,
				idPrefix: C,
				className: "flex min-h-0 flex-1 flex-col overflow-y-auto py-2",
				children: E.length === 0 ? /* @__PURE__ */ b(p, {
					size: "sm",
					align: "start",
					className: "px-4 py-2",
					...m ? { testId: m } : {},
					title: t.length === 0 ? "Nothing new" : y === "unread" ? "All caught up" : "No notifications",
					body: t.length === 0 ? "Activity will appear here." : y === "unread" ? "No unread notifications." : "Notifications will appear here."
				}) : E.map((t) => /* @__PURE__ */ x(i ? "button" : "div", {
					type: i ? "button" : void 0,
					onClick: i ? () => i(t) : void 0,
					className: e("flex items-start gap-3 px-4 py-3 text-left border-0 border-b border-solid border-border/50 last:border-b-0", "transition-colors duration-100 font-[inherit] w-full", i && "cursor-pointer focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-[-2px]", t.read ? e("bg-transparent", i && "hover:bg-[var(--color-surface-hover)]") : e("bg-primary/5", i && "hover:bg-surface-hover")),
					children: [t.icon && /* @__PURE__ */ b("span", {
						className: "text-lg shrink-0 mt-0.5",
						"aria-hidden": "true",
						children: t.icon
					}), /* @__PURE__ */ x("div", {
						className: "flex-1 min-w-0",
						children: [
							/* @__PURE__ */ x("div", {
								className: "flex items-center justify-between gap-2",
								children: [/* @__PURE__ */ b("span", {
									className: e("text-sm leading-5 line-clamp-2", t.read ? "text-[var(--color-text-secondary)] font-normal" : "text-[var(--color-text-primary)] font-medium"),
									children: t.title
								}), !t.read && /* @__PURE__ */ b("span", {
									className: "shrink-0 w-1.5 h-1.5 rounded-full bg-primary",
									"aria-label": "Unread"
								})]
							}),
							t.body && /* @__PURE__ */ b("p", {
								className: "text-sm text-text-secondary mt-1 leading-5 line-clamp-2",
								children: t.body
							}),
							t.timestamp != null && /* @__PURE__ */ b("p", {
								className: "text-xs text-text-tertiary mt-1",
								children: T(t.timestamp)
							})
						]
					})]
				}, t.id))
			}),
			f != null && f !== !1 && /* @__PURE__ */ b("div", {
				className: "flex shrink-0 items-center justify-center border-t border-border px-4 py-1.5",
				"data-notification-footer": "",
				children: f
			})
		]
	});
}
//#endregion
//#region src/components/shared/NotificationBell.tsx
function D(e, t) {
	return t > 0 ? `${e}, ${t} unread` : e;
}
function O({ items: r, unreadCount: a, onItemClick: o, onMarkAllRead: s, onClearAll: c, label: l = "Activity", placement: d = "bottom-end", size: p = "md", seeAll: h, className: g, "data-testid": y = "notification-bell" }) {
	let [S, C] = v(!1), w = _(null), T = Math.max(0, Math.trunc(a ?? r.filter((e) => e.read !== !0).length)), O = m(() => {
		C(!1), w.current?.querySelector("button")?.focus();
	}, []), k = o ? (e) => {
		o(e), O();
	} : void 0, A = h ? /* @__PURE__ */ b(t, {
		variant: "link",
		size: "sm",
		onClick: () => {
			O(), h.onSelect();
		},
		"data-testid": `${y}-see-all`,
		children: h.label ?? "See all activity"
	}) : null;
	return /* @__PURE__ */ x("span", {
		ref: w,
		"data-testid": y,
		"data-notification-bell": "",
		className: e("relative inline-flex", g),
		children: [/* @__PURE__ */ x(n, {
			"aria-label": D(l, T),
			"aria-haspopup": "dialog",
			"aria-expanded": S,
			size: p,
			className: e("relative", p === "sm" && "h-7 w-7"),
			onClick: () => C((e) => !e),
			"data-testid": `${y}-button`,
			children: [/* @__PURE__ */ b(i, { size: p === "sm" ? 16 : 18 }), T > 0 && /* @__PURE__ */ b("span", {
				"aria-hidden": "true",
				className: "pointer-events-none absolute -right-1.5 -top-1.5",
				children: /* @__PURE__ */ b(u, {
					variant: "count",
					value: T,
					color: "danger",
					"data-testid": `${y}-badge`
				})
			})]
		}), /* @__PURE__ */ b(f, {
			trigger: w,
			open: S,
			onClose: O,
			placement: d,
			"aria-label": l,
			"data-testid": `${y}-popover`,
			className: "w-[360px] max-w-[calc(100vw-16px)] overflow-hidden p-0",
			children: /* @__PURE__ */ b(E, {
				items: r,
				onItemClick: k,
				onMarkAllRead: s,
				onClearAll: c,
				footer: A,
				emptyTestId: `${y}-empty`,
				className: "max-h-[min(70vh,560px)] w-full",
				"data-testid": `${y}-center`
			})
		})]
	});
}
//#endregion
//#region src/components/layout/DockedAside.tsx
function k({ children: t, width: r = 420, offsetTop: i, maxHeight: o = "calc(100vh - 180px)", title: s, onClose: c, closeLabel: l = "Close", bodyPadding: u = "md", className: d, "data-testid": f = "docked-aside" }) {
	return /* @__PURE__ */ x("aside", {
		"data-testid": f,
		className: e("flex shrink-0 flex-col overflow-hidden rounded-lg border border-border bg-surface-panel", d),
		style: {
			width: r,
			marginTop: i,
			maxHeight: o
		},
		children: [(s !== void 0 || c) && /* @__PURE__ */ x("div", {
			className: "flex shrink-0 items-center justify-between gap-2 border-b border-border px-3.5 py-3",
			"data-testid": `${f}-header`,
			children: [/* @__PURE__ */ b("div", {
				className: "min-w-0 flex-1 truncate text-[13px] font-semibold text-text-secondary",
				children: s
			}), c && /* @__PURE__ */ b(n, {
				"aria-label": l,
				title: l,
				variant: "ghost",
				size: "sm",
				icon: /* @__PURE__ */ b(a, { size: 14 }),
				onClick: c,
				"data-testid": `${f}-close`
			})]
		}), /* @__PURE__ */ b("div", {
			className: e("min-h-0 flex-1 overflow-y-auto", u === "md" && "px-3 py-3.5"),
			"data-testid": `${f}-body`,
			children: t
		})]
	});
}
var A = {
	"bottom-right": "bottom-4 right-4",
	"bottom-left": "bottom-4 left-4",
	"top-right": "top-4 right-4",
	"top-left": "top-4 left-4"
};
function j({ children: t, corner: n = "bottom-right", width: r = 160, maxHeight: i = 280, className: a, "data-testid": o = "floating-card" }) {
	return /* @__PURE__ */ b("div", {
		"data-testid": o,
		"data-corner": n,
		className: e("fixed z-30 overflow-y-auto rounded-[10px] border border-border bg-surface px-3 py-2.5 shadow-lg", A[n], a),
		style: {
			width: r,
			maxHeight: i
		},
		children: t
	});
}
function M({ width: t, pinned: n, top: r, left: i, slotId: a, spacerRef: o, children: s, "data-testid": c = "pinned-slot" }) {
	return /* @__PURE__ */ b("div", {
		ref: o,
		className: "shrink-0",
		style: { width: t },
		"data-testid": c,
		children: /* @__PURE__ */ b("div", {
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
function N(e, t) {
	if (typeof window > "u") return t;
	try {
		let n = window.localStorage.getItem(e);
		return n === null ? t : n === "true";
	} catch {
		return t;
	}
}
function P({ title: t, actions: n, collapsible: r = !0, defaultCollapsed: i = !1, storageKey: a, children: o, className: s, "data-testid": c = "sidebar-section" }) {
	let l = g(), u = `${l}-label`, d = `${l}-body`, f = a ?? `sidebar-section:${t}`, [p, m] = v(() => r ? N(f, i) : !1);
	h(() => {
		if (r && !(typeof window > "u")) try {
			window.localStorage.setItem(f, String(p));
		} catch {}
	}, [
		p,
		r,
		f
	]);
	let y = !p, S = _(null), C = _(null);
	return /* @__PURE__ */ x("section", {
		"data-ui-part": "",
		"aria-labelledby": u,
		"data-testid": c,
		"data-collapsed": p ? "true" : "false",
		className: e("flex flex-col", s),
		children: [/* @__PURE__ */ x("div", {
			className: "flex items-center justify-between gap-1 py-2 pr-1",
			children: [/* @__PURE__ */ x("button", {
				"data-ui-part": "",
				type: "button",
				ref: S,
				id: u,
				"aria-expanded": r ? y : void 0,
				"aria-controls": d,
				onClick: () => {
					if (r) {
						if (y) {
							let e = typeof document > "u" ? null : document.activeElement;
							e && C.current?.contains(e) && S.current?.focus();
						}
						m((e) => !e);
					}
				},
				disabled: !r,
				className: e("flex items-center gap-1.5 min-w-0 flex-1", "text-[11px] font-bold uppercase tracking-[0.5px]", "text-neutral select-none text-left", r && "cursor-pointer hover:text-text-primary", !r && "cursor-default", "bg-transparent border-0 p-0 m-0"),
				children: [r && /* @__PURE__ */ b("span", {
					"aria-hidden": "true",
					className: e("inline-block text-[10px] leading-none transition-transform duration-150", y ? "rotate-90" : "rotate-0"),
					children: "▸"
				}), /* @__PURE__ */ b("span", {
					className: "truncate",
					children: t
				})]
			}), n && /* @__PURE__ */ b("div", {
				className: "flex items-center gap-1 shrink-0",
				children: n
			})]
		}), /* @__PURE__ */ b("div", {
			id: d,
			ref: C,
			hidden: !y,
			className: e("flex flex-col gap-0.5", y && "pb-1"),
			children: o
		})]
	});
}
//#endregion
//#region src/components/sidebar/SidebarRow.tsx
function F({ icon: t, label: n, trailing: r, active: i = !1, onClick: a, onContextMenu: o, href: s, kebab: c, disabled: l = !1, "aria-label": u, className: d, "data-testid": f = "sidebar-row", dataAttrs: p }) {
	let h = {};
	if (p) for (let [e, t] of Object.entries(p)) t != null && t !== "" && (h[e] = t);
	let g = _(null), v = m(() => {
		l || a?.();
	}, [l, a]), S = m((e) => {
		if (!l) {
			if (e.key === "Enter" || e.key === " ") {
				e.preventDefault(), a?.();
				return;
			}
			e.key === "ContextMenu" && o && (e.preventDefault(), o(e));
		}
	}, [
		l,
		a,
		o
	]), C = m((e) => {
		l || o?.(e);
	}, [l, o]), w = !!a || !!s || !!o, T = e("group relative flex items-center gap-2 w-full", "px-2 py-1.5 rounded-md text-sm leading-tight select-none", "transition-colors duration-100", !l && w && "cursor-pointer hover:bg-surface-hover", i && !l && "bg-info-bg text-info-fg hover:bg-info-bg", !i && !l && "text-text-primary", l && "opacity-50 cursor-not-allowed text-neutral", "no-underline", d), E = /* @__PURE__ */ x(y, { children: [
		t && /* @__PURE__ */ b("span", {
			className: "inline-flex items-center justify-center w-4 h-4 shrink-0 text-text-tertiary group-hover:text-neutral",
			children: t
		}),
		/* @__PURE__ */ b("span", {
			className: "flex-1 min-w-0 truncate",
			children: n
		}),
		r && /* @__PURE__ */ b("span", {
			className: "flex items-center gap-1 shrink-0",
			children: r
		}),
		c && /* @__PURE__ */ b("span", {
			className: "shrink-0",
			onClick: (e) => e.stopPropagation(),
			onKeyDown: (e) => e.stopPropagation(),
			children: c
		})
	] });
	return s ? /* @__PURE__ */ b("a", {
		ref: g,
		href: s,
		"aria-current": i ? "page" : void 0,
		"aria-disabled": l || void 0,
		"aria-label": u,
		"data-testid": f,
		"data-active": i ? "true" : "false",
		...h,
		className: T,
		onClick: (e) => {
			if (l) {
				e.preventDefault();
				return;
			}
			a && (e.preventDefault(), a());
		},
		onContextMenu: C,
		onKeyDown: S,
		children: E
	}) : /* @__PURE__ */ b("div", {
		ref: g,
		role: w ? "button" : void 0,
		tabIndex: w ? l ? -1 : 0 : void 0,
		"aria-pressed": w ? i : void 0,
		"aria-disabled": l || void 0,
		"aria-label": u,
		"data-testid": f,
		"data-active": i ? "true" : "false",
		...h,
		className: T,
		onClick: v,
		onContextMenu: C,
		onKeyDown: S,
		children: E
	});
}
//#endregion
export { M as a, w as c, j as i, P as n, O as o, k as r, E as s, F as t };
