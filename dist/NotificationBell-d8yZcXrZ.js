import { t as e } from "./cn-D4QmbyEy.js";
import { n as t } from "./Button-BEOshFFZ.js";
import { i as n, r, s as i, t as a } from "./Text-WZBlGWvc.js";
import { a as o } from "./Icons-B_xESAH3.js";
import { t as s } from "./Badge-POenI45X.js";
import { t as c } from "./EmptyState-BupZX4UK.js";
import { n as l } from "./DropdownMenu-DR9iVi2Z.js";
import { useCallback as u, useId as d, useRef as f, useState as p } from "react";
import { jsx as m, jsxs as h } from "react/jsx-runtime";
//#region src/components/shared/ConnectionPill.tsx
var g = {
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
}, _ = {
	idle: "text-code-muted",
	connecting: "text-code-peach",
	connected: "text-code-green",
	reconnecting: "text-code-peach",
	disconnected: "text-code-red"
};
function v({ state: t, tone: n = "surface", compact: r = !1, withLabel: i = !0, labels: a, action: o, className: s, "data-testid": c = "connection-pill" }) {
	let l = g[t], u = a?.[t] ?? l?.label ?? String(t), d = i && !r, f = n === "code" ? _[t] : l?.colorClass;
	return /* @__PURE__ */ h("span", {
		role: "status",
		"aria-live": "polite",
		"aria-label": d ? void 0 : u,
		"data-testid": c,
		"data-state": t,
		className: e("inline-flex items-center gap-1.5 font-mono", s),
		children: [
			/* @__PURE__ */ m("span", {
				"aria-hidden": "true",
				className: f,
				children: "⬤"
			}),
			d && /* @__PURE__ */ m("span", {
				className: e(f, "font-semibold"),
				children: u
			}),
			o && !r && /* @__PURE__ */ m("button", {
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
function y(e) {
	if (e == null) return null;
	let t = new Date(e);
	if (isNaN(t.getTime())) return null;
	let n = Date.now() - t.getTime();
	return n < 6e4 ? "just now" : n < 36e5 ? `${Math.floor(n / 6e4)}m ago` : n < 864e5 ? `${Math.floor(n / 36e5)}h ago` : `${Math.floor(n / 864e5)}d ago`;
}
function b({ items: i, onItemClick: o, onMarkAllRead: s, onClearAll: l, className: u, "data-testid": f }) {
	let [g, _] = p("unread"), v = d(), b = i.filter((e) => !e.read), x = g === "unread" ? b : i, S = b.length > 0;
	return /* @__PURE__ */ h("section", {
		"data-testid": f,
		"aria-label": "Notifications",
		className: e("flex min-h-0 flex-col bg-surface text-text-primary", u),
		children: [
			/* @__PURE__ */ h("div", {
				className: "flex flex-wrap items-center justify-between gap-2 border-b border-border px-4 py-3",
				children: [/* @__PURE__ */ m("h2", { children: /* @__PURE__ */ h(a, {
					as: "span",
					size: "sm",
					weight: "semibold",
					children: ["Notifications ", S && /* @__PURE__ */ m("span", {
						className: "ml-2 text-xs text-primary",
						"aria-label": `${b.length} unread`,
						children: b.length
					})]
				}) }), /* @__PURE__ */ h("div", {
					className: "flex items-center gap-2",
					children: [s && S && /* @__PURE__ */ m(t, {
						variant: "ghost",
						size: "sm",
						onClick: s,
						children: "Mark all read"
					}), l && i.length > 0 && /* @__PURE__ */ m(t, {
						variant: "ghost",
						size: "sm",
						onClick: l,
						children: "Clear all"
					})]
				})]
			}),
			/* @__PURE__ */ m(n, {
				idPrefix: v,
				className: "mx-4 shrink-0",
				"aria-label": "Notification filter",
				value: g,
				onValueChange: (e) => _(e),
				size: "md",
				variant: "underline",
				items: [{
					id: "unread",
					label: `Unread${b.length ? ` (${b.length})` : ""}`
				}, {
					id: "all",
					label: "All"
				}]
			}),
			/* @__PURE__ */ m(r, {
				id: g,
				when: g,
				idPrefix: v,
				className: "flex min-h-0 flex-1 flex-col overflow-y-auto py-2",
				children: x.length === 0 ? /* @__PURE__ */ m(c, {
					size: "sm",
					align: "start",
					title: g === "unread" ? "All caught up" : "No notifications",
					body: g === "unread" ? "No unread notifications." : "Notifications will appear here."
				}) : x.map((t) => /* @__PURE__ */ h(o ? "button" : "div", {
					type: o ? "button" : void 0,
					onClick: o ? () => o(t) : void 0,
					className: e("flex items-start gap-3 px-4 py-3 text-left border-0 border-b border-solid border-border/50 last:border-b-0", "transition-colors duration-100 font-[inherit] w-full", o && "cursor-pointer focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-[-2px]", t.read ? e("bg-transparent", o && "hover:bg-[var(--color-surface-hover)]") : e("bg-primary/5", o && "hover:bg-surface-hover")),
					children: [t.icon && /* @__PURE__ */ m("span", {
						className: "text-lg shrink-0 mt-0.5",
						"aria-hidden": "true",
						children: t.icon
					}), /* @__PURE__ */ h("div", {
						className: "flex-1 min-w-0",
						children: [
							/* @__PURE__ */ h("div", {
								className: "flex items-center justify-between gap-2",
								children: [/* @__PURE__ */ m("span", {
									className: e("text-sm leading-5 line-clamp-2", t.read ? "text-[var(--color-text-secondary)] font-normal" : "text-[var(--color-text-primary)] font-medium"),
									children: t.title
								}), !t.read && /* @__PURE__ */ m("span", {
									className: "shrink-0 w-1.5 h-1.5 rounded-full bg-primary",
									"aria-label": "Unread"
								})]
							}),
							t.body && /* @__PURE__ */ m("p", {
								className: "text-sm text-text-secondary mt-1 leading-5 line-clamp-2",
								children: t.body
							}),
							t.timestamp != null && /* @__PURE__ */ m("p", {
								className: "text-xs text-text-tertiary mt-1",
								children: y(t.timestamp)
							})
						]
					})]
				}, t.id))
			})
		]
	});
}
//#endregion
//#region src/components/shared/NotificationBell.tsx
function x(e, t) {
	return t > 0 ? `${e}, ${t} unread` : e;
}
function S({ items: t, unreadCount: n, onItemClick: r, onMarkAllRead: a, onClearAll: d, label: g = "Activity", placement: _ = "bottom-end", size: v = "md", className: y, "data-testid": S = "notification-bell" }) {
	let [C, w] = p(!1), T = f(null), E = Math.max(0, Math.trunc(n ?? t.filter((e) => e.read !== !0).length)), D = u(() => {
		w(!1), T.current?.querySelector("button")?.focus();
	}, []), O = r ? (e) => {
		r(e), D();
	} : void 0, k = t.length === 0;
	return /* @__PURE__ */ h("span", {
		ref: T,
		"data-testid": S,
		className: e("relative inline-flex", y),
		children: [/* @__PURE__ */ h(i, {
			"aria-label": x(g, E),
			"aria-haspopup": "dialog",
			"aria-expanded": C,
			size: v,
			className: e("relative", v === "sm" && "h-7 w-7"),
			onClick: () => w((e) => !e),
			"data-testid": `${S}-button`,
			children: [/* @__PURE__ */ m(o, { size: v === "sm" ? 16 : 18 }), E > 0 && /* @__PURE__ */ m("span", {
				"aria-hidden": "true",
				className: "pointer-events-none absolute -right-1.5 -top-1.5",
				children: /* @__PURE__ */ m(s, {
					variant: "count",
					value: E,
					color: "danger",
					"data-testid": `${S}-badge`
				})
			})]
		}), /* @__PURE__ */ m(l, {
			trigger: T,
			open: C,
			onClose: D,
			placement: _,
			"aria-label": g,
			"data-testid": `${S}-popover`,
			className: k ? "w-[300px] max-w-[calc(100vw-16px)]" : "w-[360px] max-w-[calc(100vw-16px)] p-0 border-0 bg-transparent shadow-none",
			children: k ? /* @__PURE__ */ m(c, {
				size: "sm",
				icon: /* @__PURE__ */ m(o, { size: 24 }),
				title: "Nothing new",
				description: "Activity will appear here.",
				testId: `${S}-empty`
			}) : /* @__PURE__ */ m(b, {
				items: t,
				onItemClick: O,
				onMarkAllRead: a,
				onClearAll: d,
				className: "w-full",
				"data-testid": `${S}-center`
			})
		})]
	});
}
//#endregion
export { b as n, v as r, S as t };
