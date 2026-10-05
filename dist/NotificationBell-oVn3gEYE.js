import { t as e } from "./cn-D4QmbyEy.js";
import { t } from "./IconButton-VqtspsS5.js";
import { a as n } from "./Icons-_hcrQmPz.js";
import { t as r } from "./Badge-BV6tPLgZ.js";
import { t as i } from "./EmptyState-DnbFBYDA.js";
import { t as a } from "./InlinePopover-PfCtP6n9.js";
import { useCallback as o, useRef as s, useState as c } from "react";
import { jsx as l, jsxs as u } from "react/jsx-runtime";
//#region src/components/shared/ConnectionPill.tsx
var d = {
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
}, f = {
	idle: "text-code-muted",
	connecting: "text-code-peach",
	connected: "text-code-green",
	reconnecting: "text-code-peach",
	disconnected: "text-code-red"
};
function p({ state: t, tone: n = "surface", compact: r = !1, withLabel: i = !0, labels: a, action: o, className: s, "data-testid": c = "connection-pill" }) {
	let p = d[t], m = a?.[t] ?? p?.label ?? String(t), h = i && !r, g = n === "code" ? f[t] : p?.colorClass;
	return /* @__PURE__ */ u("span", {
		role: "status",
		"aria-live": "polite",
		"aria-label": h ? void 0 : m,
		"data-testid": c,
		"data-state": t,
		className: e("inline-flex items-center gap-1.5 font-mono", s),
		children: [
			/* @__PURE__ */ l("span", {
				"aria-hidden": "true",
				className: g,
				children: "⬤"
			}),
			h && /* @__PURE__ */ l("span", {
				className: e(g, "font-semibold"),
				children: m
			}),
			o && !r && /* @__PURE__ */ l("button", {
				type: "button",
				onClick: o.onClick,
				disabled: o.disabled,
				"data-testid": o["data-testid"] ?? "connection-pill-action",
				className: e("rounded-sm px-1 underline decoration-dotted underline-offset-2", "hover:decoration-solid focus-visible:outline-2 focus-visible:outline-offset-1", "disabled:cursor-not-allowed disabled:no-underline disabled:opacity-50", g),
				children: o.label
			})
		]
	});
}
//#endregion
//#region src/components/shared/NotificationCenter.tsx
function m(e) {
	if (e == null) return null;
	let t = new Date(e);
	if (isNaN(t.getTime())) return null;
	let n = Date.now() - t.getTime();
	return n < 6e4 ? "just now" : n < 36e5 ? `${Math.floor(n / 6e4)}m ago` : n < 864e5 ? `${Math.floor(n / 36e5)}h ago` : `${Math.floor(n / 864e5)}d ago`;
}
function h({ items: t, onItemClick: n, onMarkAllRead: r, onClearAll: a, className: o, "data-testid": s }) {
	let [d, f] = c("unread"), p = t.filter((e) => !e.read), h = d === "unread" ? p : t, g = p.length > 0, _ = (t) => e("px-3 py-1.5 text-sm border-none rounded-md cursor-pointer font-[inherit] transition-colors duration-100", t ? "bg-primary-bg text-text-primary font-semibold" : "bg-transparent text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)]");
	return /* @__PURE__ */ u("div", {
		"data-testid": s,
		className: e("flex flex-col bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl shadow-md overflow-hidden", o),
		children: [
			/* @__PURE__ */ u("div", {
				className: "flex items-center justify-between px-4 pt-3 pb-2 border-b border-[var(--color-border)]",
				children: [/* @__PURE__ */ u("span", {
					className: "text-sm font-semibold text-[var(--color-text-primary)]",
					children: ["Notifications", g && /* @__PURE__ */ l("span", {
						className: "ml-2 inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full text-[11px] font-bold bg-danger text-white leading-none",
						children: p.length
					})]
				}), /* @__PURE__ */ u("div", {
					className: "flex items-center gap-2",
					children: [r && g && /* @__PURE__ */ l("button", {
						type: "button",
						onClick: r,
						className: "text-xs text-info-fg bg-transparent border-none cursor-pointer hover:underline",
						children: "Mark all read"
					}), a && t.length > 0 && /* @__PURE__ */ l("button", {
						type: "button",
						onClick: a,
						className: "text-xs text-[var(--color-text-tertiary)] bg-transparent border-none cursor-pointer hover:underline",
						children: "Clear all"
					})]
				})]
			}),
			/* @__PURE__ */ u("div", {
				className: "flex items-center gap-1 px-3 pt-2",
				children: [/* @__PURE__ */ u("button", {
					type: "button",
					className: _(d === "unread"),
					onClick: () => f("unread"),
					children: ["Unread ", p.length > 0 && `(${p.length})`]
				}), /* @__PURE__ */ l("button", {
					type: "button",
					className: _(d === "all"),
					onClick: () => f("all"),
					children: "All"
				})]
			}),
			/* @__PURE__ */ l("div", {
				className: "flex flex-col overflow-y-auto max-h-[420px] py-2",
				children: h.length === 0 ? /* @__PURE__ */ l(i, {
					icon: d === "unread" ? "✓" : "🔔",
					title: d === "unread" ? "All caught up" : "No notifications",
					body: d === "unread" ? "No unread notifications." : "Notifications will appear here."
				}) : h.map((t) => /* @__PURE__ */ u(n ? "button" : "div", {
					type: n ? "button" : void 0,
					onClick: n ? () => n(t) : void 0,
					className: e("flex items-start gap-3 px-4 py-3 text-left border-none", "transition-colors duration-100 font-[inherit] w-full", n && "cursor-pointer", t.read ? e("bg-transparent", n && "hover:bg-[var(--color-surface-hover)]") : e("bg-[rgba(59,130,246,0.05)]", n && "hover:bg-[rgba(59,130,246,0.1)]")),
					children: [t.icon && /* @__PURE__ */ l("span", {
						className: "text-lg shrink-0 mt-0.5",
						"aria-hidden": "true",
						children: t.icon
					}), /* @__PURE__ */ u("div", {
						className: "flex-1 min-w-0",
						children: [
							/* @__PURE__ */ u("div", {
								className: "flex items-center justify-between gap-2",
								children: [/* @__PURE__ */ l("span", {
									className: e("text-sm leading-snug truncate", t.read ? "text-[var(--color-text-secondary)] font-normal" : "text-[var(--color-text-primary)] font-medium"),
									children: t.title
								}), !t.read && /* @__PURE__ */ l("span", {
									className: "shrink-0 w-1.5 h-1.5 rounded-full bg-info",
									"aria-label": "Unread"
								})]
							}),
							t.body && /* @__PURE__ */ l("p", {
								className: "text-xs text-[var(--color-text-tertiary)] mt-0.5 leading-snug line-clamp-2",
								children: t.body
							}),
							t.timestamp != null && /* @__PURE__ */ l("p", {
								className: "text-[11px] text-[var(--color-text-tertiary)] mt-1 font-mono",
								children: m(t.timestamp)
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
function g(e, t) {
	return t > 0 ? `${e}, ${t} unread` : e;
}
function _({ items: d, unreadCount: f, onItemClick: p, onMarkAllRead: m, onClearAll: _, label: v = "Activity", placement: y = "bottom-end", size: b = "md", className: x, "data-testid": S = "notification-bell" }) {
	let [C, w] = c(!1), T = s(null), E = Math.max(0, Math.trunc(f ?? d.filter((e) => e.read !== !0).length)), D = o(() => {
		w(!1), T.current?.querySelector("button")?.focus();
	}, []), O = p ? (e) => {
		p(e), D();
	} : void 0, k = d.length === 0;
	return /* @__PURE__ */ u("span", {
		ref: T,
		"data-testid": S,
		className: e("relative inline-flex", x),
		children: [/* @__PURE__ */ u(t, {
			"aria-label": g(v, E),
			"aria-haspopup": "dialog",
			"aria-expanded": C,
			size: b,
			className: e("relative", b === "sm" && "h-7 w-7"),
			onClick: () => w((e) => !e),
			"data-testid": `${S}-button`,
			children: [/* @__PURE__ */ l(n, { size: b === "sm" ? 16 : 18 }), E > 0 && /* @__PURE__ */ l("span", {
				"aria-hidden": "true",
				className: "pointer-events-none absolute -right-1.5 -top-1.5",
				children: /* @__PURE__ */ l(r, {
					variant: "count",
					value: E,
					color: "danger",
					"data-testid": `${S}-badge`
				})
			})]
		}), /* @__PURE__ */ l(a, {
			trigger: T,
			open: C,
			onClose: D,
			placement: y,
			"aria-label": v,
			"data-testid": `${S}-popover`,
			className: k ? "w-[300px] max-w-[calc(100vw-16px)]" : "w-[360px] max-w-[calc(100vw-16px)] p-0 border-0 bg-transparent shadow-none",
			children: k ? /* @__PURE__ */ l(i, {
				size: "sm",
				icon: /* @__PURE__ */ l(n, { size: 24 }),
				title: "Nothing new",
				description: "Activity will appear here.",
				testId: `${S}-empty`
			}) : /* @__PURE__ */ l(h, {
				items: d,
				onItemClick: O,
				onMarkAllRead: m,
				onClearAll: _,
				className: "w-full",
				"data-testid": `${S}-center`
			})
		})]
	});
}
//#endregion
export { h as n, p as r, _ as t };
