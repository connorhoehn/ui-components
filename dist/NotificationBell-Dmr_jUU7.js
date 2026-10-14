import { t as e } from "./cn-D4QmbyEy.js";
import { n as t, o as n } from "./Button-uREUOWUk.js";
import { t as r } from "./IconButton-IE5g44md.js";
import { a as i, p as a, yt as o } from "./Icons-B_xESAH3.js";
import { i as s, r as c, t as l } from "./Text-kXXifsCP.js";
import { t as u } from "./Badge-Dr0R7r9G.js";
import { t as d } from "./Tooltip-DWyAb81m.js";
import { t as f } from "./InlinePopover-BSeEQkYe.js";
import { t as p } from "./EmptyState-iFs0woF1.js";
import { useCallback as m, useId as h, useRef as g, useState as _ } from "react";
import { Fragment as v, jsx as y, jsxs as b } from "react/jsx-runtime";
//#region src/components/shared/ConnectionPill.tsx
var x = {
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
}, S = {
	idle: "text-code-muted",
	connecting: "text-code-peach",
	connected: "text-code-green",
	reconnecting: "text-code-peach",
	disconnected: "text-code-red"
};
function C({ state: t, tone: n = "surface", compact: r = !1, withLabel: i = !0, labels: a, action: o, className: s, "data-testid": c = "connection-pill" }) {
	let l = x[t], u = a?.[t] ?? l?.label ?? String(t), d = i && !r, f = n === "code" ? S[t] : l?.colorClass;
	return /* @__PURE__ */ b("span", {
		role: "status",
		"aria-live": "polite",
		"aria-label": d ? void 0 : u,
		"data-testid": c,
		"data-state": t,
		className: e("inline-flex items-center gap-1.5 font-mono", s),
		children: [
			/* @__PURE__ */ y("span", {
				"aria-hidden": "true",
				className: f,
				children: "⬤"
			}),
			d && /* @__PURE__ */ y("span", {
				className: e(f, "font-semibold"),
				children: u
			}),
			o && !r && /* @__PURE__ */ y("button", {
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
function w(e) {
	if (e == null) return null;
	let t = new Date(e);
	if (isNaN(t.getTime())) return null;
	let n = Date.now() - t.getTime();
	return n < 6e4 ? "just now" : n < 36e5 ? `${Math.floor(n / 6e4)}m ago` : n < 864e5 ? `${Math.floor(n / 36e5)}h ago` : `${Math.floor(n / 864e5)}d ago`;
}
function T({ items: t, onItemClick: n, onMarkAllRead: i, onClearAll: u, footer: f, className: m, "data-testid": g }) {
	let [v, x] = _("unread"), S = h(), C = t.filter((e) => !e.read), T = v === "unread" ? C : t, E = C.length > 0;
	return /* @__PURE__ */ b("section", {
		"data-testid": g,
		"aria-label": "Notifications",
		className: e("flex min-h-0 flex-col bg-surface text-text-primary", m),
		children: [
			/* @__PURE__ */ b("div", {
				className: "flex shrink-0 flex-wrap items-center justify-between gap-2 border-b border-border px-4 py-3",
				children: [/* @__PURE__ */ y("h2", { children: /* @__PURE__ */ b(l, {
					as: "span",
					size: "sm",
					weight: "semibold",
					children: ["Notifications ", E && /* @__PURE__ */ y("span", {
						className: "ml-2 text-xs text-primary",
						"aria-label": `${C.length} unread`,
						children: C.length
					})]
				}) }), /* @__PURE__ */ b("div", {
					className: "flex items-center gap-2",
					children: [i && E && /* @__PURE__ */ y(d, {
						content: "Mark all read",
						placement: "bottom",
						children: /* @__PURE__ */ y(r, {
							"aria-label": "Mark all read",
							icon: /* @__PURE__ */ y(a, { size: 16 }),
							onClick: i
						})
					}), u && t.length > 0 && /* @__PURE__ */ y(d, {
						content: "Clear all",
						placement: "bottom",
						children: /* @__PURE__ */ y(r, {
							"aria-label": "Clear all",
							icon: /* @__PURE__ */ y(o, { size: 16 }),
							onClick: u
						})
					})]
				})]
			}),
			/* @__PURE__ */ y(s, {
				idPrefix: S,
				className: "mx-4 shrink-0",
				"aria-label": "Notification filter",
				value: v,
				onValueChange: (e) => x(e),
				size: "md",
				variant: "underline",
				items: [{
					id: "unread",
					label: `Unread${C.length ? ` (${C.length})` : ""}`
				}, {
					id: "all",
					label: "All"
				}]
			}),
			/* @__PURE__ */ y(c, {
				id: v,
				when: v,
				idPrefix: S,
				className: "flex min-h-0 flex-1 flex-col overflow-y-auto py-2",
				children: T.length === 0 ? /* @__PURE__ */ y(p, {
					size: "sm",
					align: "start",
					title: v === "unread" ? "All caught up" : "No notifications",
					body: v === "unread" ? "No unread notifications." : "Notifications will appear here."
				}) : T.map((t) => /* @__PURE__ */ b(n ? "button" : "div", {
					type: n ? "button" : void 0,
					onClick: n ? () => n(t) : void 0,
					className: e("flex items-start gap-3 px-4 py-3 text-left border-0 border-b border-solid border-border/50 last:border-b-0", "transition-colors duration-100 font-[inherit] w-full", n && "cursor-pointer focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-[-2px]", t.read ? e("bg-transparent", n && "hover:bg-[var(--color-surface-hover)]") : e("bg-primary/5", n && "hover:bg-surface-hover")),
					children: [t.icon && /* @__PURE__ */ y("span", {
						className: "text-lg shrink-0 mt-0.5",
						"aria-hidden": "true",
						children: t.icon
					}), /* @__PURE__ */ b("div", {
						className: "flex-1 min-w-0",
						children: [
							/* @__PURE__ */ b("div", {
								className: "flex items-center justify-between gap-2",
								children: [/* @__PURE__ */ y("span", {
									className: e("text-sm leading-5 line-clamp-2", t.read ? "text-[var(--color-text-secondary)] font-normal" : "text-[var(--color-text-primary)] font-medium"),
									children: t.title
								}), !t.read && /* @__PURE__ */ y("span", {
									className: "shrink-0 w-1.5 h-1.5 rounded-full bg-primary",
									"aria-label": "Unread"
								})]
							}),
							t.body && /* @__PURE__ */ y("p", {
								className: "text-sm text-text-secondary mt-1 leading-5 line-clamp-2",
								children: t.body
							}),
							t.timestamp != null && /* @__PURE__ */ y("p", {
								className: "text-xs text-text-tertiary mt-1",
								children: w(t.timestamp)
							})
						]
					})]
				}, t.id))
			}),
			f != null && f !== !1 && /* @__PURE__ */ y("div", {
				className: "flex shrink-0 items-center justify-center border-t border-border px-4 py-1.5",
				"data-notification-footer": "",
				children: f
			})
		]
	});
}
//#endregion
//#region src/components/shared/NotificationBell.tsx
function E(e, t) {
	return t > 0 ? `${e}, ${t} unread` : e;
}
function D({ items: a, unreadCount: o, onItemClick: s, onMarkAllRead: c, onClearAll: l, label: d = "Activity", placement: h = "bottom-end", size: x = "md", seeAll: S, className: C, "data-testid": w = "notification-bell" }) {
	let [D, O] = _(!1), k = g(null), A = Math.max(0, Math.trunc(o ?? a.filter((e) => e.read !== !0).length)), j = m(() => {
		O(!1), k.current?.querySelector("button")?.focus();
	}, []), M = s ? (e) => {
		s(e), j();
	} : void 0, N = a.length === 0, P = S ? /* @__PURE__ */ y(t, {
		variant: "link",
		size: "sm",
		onClick: () => {
			j(), S.onSelect();
		},
		"data-testid": `${w}-see-all`,
		children: S.label ?? "See all activity"
	}) : null;
	return /* @__PURE__ */ b("span", {
		ref: k,
		"data-testid": w,
		"data-notification-bell": "",
		className: e("relative inline-flex", C),
		children: [/* @__PURE__ */ b(r, {
			"aria-label": E(d, A),
			"aria-haspopup": "dialog",
			"aria-expanded": D,
			size: x,
			className: e("relative", x === "sm" && "h-7 w-7"),
			onClick: () => O((e) => !e),
			"data-testid": `${w}-button`,
			children: [/* @__PURE__ */ y(i, { size: x === "sm" ? 16 : 18 }), A > 0 && /* @__PURE__ */ y("span", {
				"aria-hidden": "true",
				className: "pointer-events-none absolute -right-1.5 -top-1.5",
				children: /* @__PURE__ */ y(u, {
					variant: "count",
					value: A,
					color: "danger",
					"data-testid": `${w}-badge`
				})
			})]
		}), /* @__PURE__ */ y(f, {
			trigger: k,
			open: D,
			onClose: j,
			placement: h,
			"aria-label": d,
			"data-testid": `${w}-popover`,
			className: N ? "w-[300px] max-w-[calc(100vw-16px)]" : "w-[360px] max-w-[calc(100vw-16px)] overflow-hidden p-0",
			children: N ? /* @__PURE__ */ b(v, { children: [/* @__PURE__ */ y(n, {
				density: "compact",
				children: /* @__PURE__ */ y(p, {
					icon: /* @__PURE__ */ y(i, { size: 24 }),
					title: "Nothing new",
					description: "Activity will appear here.",
					testId: `${w}-empty`
				})
			}), P && /* @__PURE__ */ y("div", {
				className: "flex justify-center border-t border-border py-1.5",
				children: P
			})] }) : /* @__PURE__ */ y(T, {
				items: a,
				onItemClick: M,
				onMarkAllRead: c,
				onClearAll: l,
				footer: P,
				className: "h-[min(70vh,560px)] w-full",
				"data-testid": `${w}-center`
			})
		})]
	});
}
//#endregion
export { T as n, C as r, D as t };
