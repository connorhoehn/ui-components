import { t as e } from "./cn-D4QmbyEy.js";
import { n as t } from "./Button-C-I3BxWI.js";
import { t as n } from "./IconButton-J9jGN6eo.js";
import { a as r, p as i, xt as a } from "./Icons-C__ztBBw.js";
import { i as o, r as s, t as c } from "./Text-Cv8fPFPw.js";
import { t as l } from "./Badge-CogooeUA.js";
import { t as u } from "./Tooltip-DWyAb81m.js";
import { t as d } from "./InlinePopover-Dx8-r-XU.js";
import { t as f } from "./EmptyState-D5ucMp2y.js";
import { useCallback as p, useId as m, useRef as h, useState as g } from "react";
import { jsx as _, jsxs as v } from "react/jsx-runtime";
//#region src/components/shared/ConnectionPill.tsx
var y = {
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
}, b = {
	idle: "text-code-muted",
	connecting: "text-code-peach",
	connected: "text-code-green",
	reconnecting: "text-code-peach",
	disconnected: "text-code-red"
};
function x({ state: t, tone: n = "surface", compact: r = !1, withLabel: i = !0, labels: a, action: o, className: s, "data-testid": c = "connection-pill" }) {
	let l = y[t], u = a?.[t] ?? l?.label ?? String(t), d = i && !r, f = n === "code" ? b[t] : l?.colorClass;
	return /* @__PURE__ */ v("span", {
		role: "status",
		"aria-live": "polite",
		"aria-label": d ? void 0 : u,
		"data-testid": c,
		"data-state": t,
		className: e("inline-flex items-center gap-1.5 font-mono", s),
		children: [
			/* @__PURE__ */ _("span", {
				"aria-hidden": "true",
				className: f,
				children: "⬤"
			}),
			d && /* @__PURE__ */ _("span", {
				className: e(f, "font-semibold"),
				children: u
			}),
			o && !r && /* @__PURE__ */ _("button", {
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
function S(e) {
	if (e == null) return null;
	let t = new Date(e);
	if (isNaN(t.getTime())) return null;
	let n = Date.now() - t.getTime();
	return n < 6e4 ? "just now" : n < 36e5 ? `${Math.floor(n / 6e4)}m ago` : n < 864e5 ? `${Math.floor(n / 36e5)}h ago` : `${Math.floor(n / 864e5)}d ago`;
}
function C({ items: t, onItemClick: r, onMarkAllRead: l, onClearAll: d, footer: p, emptyTestId: h, className: y, "data-testid": b }) {
	let [x, C] = g("unread"), w = m(), T = t.filter((e) => !e.read), E = x === "unread" ? T : t, D = T.length > 0;
	return /* @__PURE__ */ v("section", {
		"data-testid": b,
		"aria-label": "Notifications",
		className: e("flex min-h-0 flex-col bg-surface text-text-primary", y),
		children: [
			/* @__PURE__ */ v("div", {
				className: "flex shrink-0 flex-wrap items-center justify-between gap-2 border-b border-border px-4 py-3",
				children: [/* @__PURE__ */ _("h2", { children: /* @__PURE__ */ v(c, {
					as: "span",
					size: "sm",
					weight: "semibold",
					children: ["Notifications ", D && /* @__PURE__ */ _("span", {
						className: "ml-2 text-xs text-primary",
						"aria-label": `${T.length} unread`,
						children: T.length
					})]
				}) }), /* @__PURE__ */ v("div", {
					className: "flex items-center gap-2",
					children: [l && D && /* @__PURE__ */ _(u, {
						content: "Mark all read",
						placement: "bottom",
						children: /* @__PURE__ */ _(n, {
							"aria-label": "Mark all read",
							icon: /* @__PURE__ */ _(i, { size: 16 }),
							onClick: l
						})
					}), d && t.length > 0 && /* @__PURE__ */ _(u, {
						content: "Clear all",
						placement: "bottom",
						children: /* @__PURE__ */ _(n, {
							"aria-label": "Clear all",
							icon: /* @__PURE__ */ _(a, { size: 16 }),
							onClick: d
						})
					})]
				})]
			}),
			/* @__PURE__ */ _(o, {
				idPrefix: w,
				className: "mx-4 shrink-0",
				"aria-label": "Notification filter",
				value: x,
				onValueChange: (e) => C(e),
				size: "md",
				variant: "underline",
				items: [{
					id: "unread",
					label: `Unread${T.length ? ` (${T.length})` : ""}`
				}, {
					id: "all",
					label: "All"
				}]
			}),
			/* @__PURE__ */ _(s, {
				id: x,
				when: x,
				idPrefix: w,
				className: "flex min-h-0 flex-1 flex-col overflow-y-auto py-2",
				children: E.length === 0 ? /* @__PURE__ */ _(f, {
					size: "sm",
					align: "start",
					className: "px-4 py-2",
					...h ? { testId: h } : {},
					title: t.length === 0 ? "Nothing new" : x === "unread" ? "All caught up" : "No notifications",
					body: t.length === 0 ? "Activity will appear here." : x === "unread" ? "No unread notifications." : "Notifications will appear here."
				}) : E.map((t) => /* @__PURE__ */ v(r ? "button" : "div", {
					type: r ? "button" : void 0,
					onClick: r ? () => r(t) : void 0,
					className: e("flex items-start gap-3 px-4 py-3 text-left border-0 border-b border-solid border-border/50 last:border-b-0", "transition-colors duration-100 font-[inherit] w-full", r && "cursor-pointer focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-[-2px]", t.read ? e("bg-transparent", r && "hover:bg-[var(--color-surface-hover)]") : e("bg-primary/5", r && "hover:bg-surface-hover")),
					children: [t.icon && /* @__PURE__ */ _("span", {
						className: "text-lg shrink-0 mt-0.5",
						"aria-hidden": "true",
						children: t.icon
					}), /* @__PURE__ */ v("div", {
						className: "flex-1 min-w-0",
						children: [
							/* @__PURE__ */ v("div", {
								className: "flex items-center justify-between gap-2",
								children: [/* @__PURE__ */ _("span", {
									className: e("text-sm leading-5 line-clamp-2", t.read ? "text-[var(--color-text-secondary)] font-normal" : "text-[var(--color-text-primary)] font-medium"),
									children: t.title
								}), !t.read && /* @__PURE__ */ _("span", {
									className: "shrink-0 w-1.5 h-1.5 rounded-full bg-primary",
									"aria-label": "Unread"
								})]
							}),
							t.body && /* @__PURE__ */ _("p", {
								className: "text-sm text-text-secondary mt-1 leading-5 line-clamp-2",
								children: t.body
							}),
							t.timestamp != null && /* @__PURE__ */ _("p", {
								className: "text-xs text-text-tertiary mt-1",
								children: S(t.timestamp)
							})
						]
					})]
				}, t.id))
			}),
			p != null && p !== !1 && /* @__PURE__ */ _("div", {
				className: "flex shrink-0 items-center justify-center border-t border-border px-4 py-1.5",
				"data-notification-footer": "",
				children: p
			})
		]
	});
}
//#endregion
//#region src/components/shared/NotificationBell.tsx
function w(e, t) {
	return t > 0 ? `${e}, ${t} unread` : e;
}
function T({ items: i, unreadCount: a, onItemClick: o, onMarkAllRead: s, onClearAll: c, label: u = "Activity", placement: f = "bottom-end", size: m = "md", seeAll: y, className: b, "data-testid": x = "notification-bell" }) {
	let [S, T] = g(!1), E = h(null), D = Math.max(0, Math.trunc(a ?? i.filter((e) => e.read !== !0).length)), O = p(() => {
		T(!1), E.current?.querySelector("button")?.focus();
	}, []), k = o ? (e) => {
		o(e), O();
	} : void 0, A = y ? /* @__PURE__ */ _(t, {
		variant: "link",
		size: "sm",
		onClick: () => {
			O(), y.onSelect();
		},
		"data-testid": `${x}-see-all`,
		children: y.label ?? "See all activity"
	}) : null;
	return /* @__PURE__ */ v("span", {
		ref: E,
		"data-testid": x,
		"data-notification-bell": "",
		className: e("relative inline-flex", b),
		children: [/* @__PURE__ */ v(n, {
			"aria-label": w(u, D),
			"aria-haspopup": "dialog",
			"aria-expanded": S,
			size: m,
			className: e("relative", m === "sm" && "h-7 w-7"),
			onClick: () => T((e) => !e),
			"data-testid": `${x}-button`,
			children: [/* @__PURE__ */ _(r, { size: m === "sm" ? 16 : 18 }), D > 0 && /* @__PURE__ */ _("span", {
				"aria-hidden": "true",
				className: "pointer-events-none absolute -right-1.5 -top-1.5",
				children: /* @__PURE__ */ _(l, {
					variant: "count",
					value: D,
					color: "danger",
					"data-testid": `${x}-badge`
				})
			})]
		}), /* @__PURE__ */ _(d, {
			trigger: E,
			open: S,
			onClose: O,
			placement: f,
			"aria-label": u,
			"data-testid": `${x}-popover`,
			className: "w-[360px] max-w-[calc(100vw-16px)] overflow-hidden p-0",
			children: /* @__PURE__ */ _(C, {
				items: i,
				onItemClick: k,
				onMarkAllRead: s,
				onClearAll: c,
				footer: A,
				emptyTestId: `${x}-empty`,
				className: "max-h-[min(70vh,560px)] w-full",
				"data-testid": `${x}-center`
			})
		})]
	});
}
//#endregion
export { C as n, x as r, T as t };
