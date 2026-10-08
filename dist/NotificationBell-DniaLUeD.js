import { t as e } from "./cn-D4QmbyEy.js";
import { n as t } from "./Density-BgubVeSf.js";
import { c as n } from "./Tabs-5OOt62a7.js";
import { a as r } from "./Icons-B_xESAH3.js";
import { t as i } from "./Badge-POenI45X.js";
import { t as a } from "./EmptyState-ClSHRgi-.js";
import { n as o } from "./DropdownMenu-M27Ly7by.js";
import { useCallback as s, useRef as c, useState as l } from "react";
import { jsx as u, jsxs as d } from "react/jsx-runtime";
//#region src/components/shared/ConnectionPill.tsx
var f = {
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
}, p = {
	idle: "text-code-muted",
	connecting: "text-code-peach",
	connected: "text-code-green",
	reconnecting: "text-code-peach",
	disconnected: "text-code-red"
};
function m({ state: t, tone: n = "surface", compact: r = !1, withLabel: i = !0, labels: a, action: o, className: s, "data-testid": c = "connection-pill" }) {
	let l = f[t], m = a?.[t] ?? l?.label ?? String(t), h = i && !r, g = n === "code" ? p[t] : l?.colorClass;
	return /* @__PURE__ */ d("span", {
		role: "status",
		"aria-live": "polite",
		"aria-label": h ? void 0 : m,
		"data-testid": c,
		"data-state": t,
		className: e("inline-flex items-center gap-1.5 font-mono", s),
		children: [
			/* @__PURE__ */ u("span", {
				"aria-hidden": "true",
				className: g,
				children: "⬤"
			}),
			h && /* @__PURE__ */ u("span", {
				className: e(g, "font-semibold"),
				children: m
			}),
			o && !r && /* @__PURE__ */ u("button", {
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
function h(e) {
	if (e == null) return null;
	let t = new Date(e);
	if (isNaN(t.getTime())) return null;
	let n = Date.now() - t.getTime();
	return n < 6e4 ? "just now" : n < 36e5 ? `${Math.floor(n / 6e4)}m ago` : n < 864e5 ? `${Math.floor(n / 36e5)}h ago` : `${Math.floor(n / 864e5)}d ago`;
}
function g({ items: t, onItemClick: n, onMarkAllRead: r, onClearAll: i, className: o, "data-testid": s }) {
	let [c, f] = l("unread"), p = t.filter((e) => !e.read), m = c === "unread" ? p : t, g = p.length > 0, _ = (t) => e("px-3 py-1.5 text-sm border-none rounded-md cursor-pointer font-[inherit] transition-colors duration-100", t ? "bg-primary-bg text-text-primary font-semibold" : "bg-transparent text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)]");
	return /* @__PURE__ */ d("div", {
		"data-testid": s,
		className: e("flex flex-col bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl shadow-md overflow-hidden", o),
		children: [
			/* @__PURE__ */ d("div", {
				className: "flex items-center justify-between px-4 pt-3 pb-2 border-b border-[var(--color-border)]",
				children: [/* @__PURE__ */ d("span", {
					className: "text-sm font-semibold text-[var(--color-text-primary)]",
					children: ["Notifications", g && /* @__PURE__ */ u("span", {
						className: "ml-2 inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full text-[11px] font-bold bg-danger text-white leading-none",
						children: p.length
					})]
				}), /* @__PURE__ */ d("div", {
					className: "flex items-center gap-2",
					children: [r && g && /* @__PURE__ */ u("button", {
						type: "button",
						onClick: r,
						className: "text-xs text-info-fg bg-transparent border-none cursor-pointer hover:underline",
						children: "Mark all read"
					}), i && t.length > 0 && /* @__PURE__ */ u("button", {
						type: "button",
						onClick: i,
						className: "text-xs text-[var(--color-text-tertiary)] bg-transparent border-none cursor-pointer hover:underline",
						children: "Clear all"
					})]
				})]
			}),
			/* @__PURE__ */ d("div", {
				className: "flex items-center gap-1 px-3 pt-2",
				children: [/* @__PURE__ */ d("button", {
					type: "button",
					className: _(c === "unread"),
					onClick: () => f("unread"),
					children: ["Unread ", p.length > 0 && `(${p.length})`]
				}), /* @__PURE__ */ u("button", {
					type: "button",
					className: _(c === "all"),
					onClick: () => f("all"),
					children: "All"
				})]
			}),
			/* @__PURE__ */ u("div", {
				className: "flex flex-col overflow-y-auto max-h-[420px] py-2",
				children: m.length === 0 ? /* @__PURE__ */ u(a, {
					icon: c === "unread" ? "✓" : "🔔",
					title: c === "unread" ? "All caught up" : "No notifications",
					body: c === "unread" ? "No unread notifications." : "Notifications will appear here."
				}) : m.map((t) => /* @__PURE__ */ d(n ? "button" : "div", {
					type: n ? "button" : void 0,
					onClick: n ? () => n(t) : void 0,
					className: e("flex items-start gap-3 px-4 py-3 text-left border-none", "transition-colors duration-100 font-[inherit] w-full", n && "cursor-pointer", t.read ? e("bg-transparent", n && "hover:bg-[var(--color-surface-hover)]") : e("bg-[rgba(59,130,246,0.05)]", n && "hover:bg-[rgba(59,130,246,0.1)]")),
					children: [t.icon && /* @__PURE__ */ u("span", {
						className: "text-lg shrink-0 mt-0.5",
						"aria-hidden": "true",
						children: t.icon
					}), /* @__PURE__ */ d("div", {
						className: "flex-1 min-w-0",
						children: [
							/* @__PURE__ */ d("div", {
								className: "flex items-center justify-between gap-2",
								children: [/* @__PURE__ */ u("span", {
									className: e("text-sm leading-snug truncate", t.read ? "text-[var(--color-text-secondary)] font-normal" : "text-[var(--color-text-primary)] font-medium"),
									children: t.title
								}), !t.read && /* @__PURE__ */ u("span", {
									className: "shrink-0 w-1.5 h-1.5 rounded-full bg-info",
									"aria-label": "Unread"
								})]
							}),
							t.body && /* @__PURE__ */ u("p", {
								className: "text-xs text-[var(--color-text-tertiary)] mt-0.5 leading-snug line-clamp-2",
								children: t.body
							}),
							t.timestamp != null && /* @__PURE__ */ u("p", {
								className: "text-[11px] text-[var(--color-text-tertiary)] mt-1 font-mono",
								children: h(t.timestamp)
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
function _(e, t) {
	return t > 0 ? `${e}, ${t} unread` : e;
}
function v({ items: f, unreadCount: p, onItemClick: m, onMarkAllRead: h, onClearAll: v, label: y = "Activity", placement: b = "bottom-end", size: x = "md", className: S, "data-testid": C = "notification-bell" }) {
	let [w, T] = l(!1), E = c(null), D = Math.max(0, Math.trunc(p ?? f.filter((e) => e.read !== !0).length)), O = s(() => {
		T(!1), E.current?.querySelector("button")?.focus();
	}, []), k = m ? (e) => {
		m(e), O();
	} : void 0, A = f.length === 0;
	return /* @__PURE__ */ d("span", {
		ref: E,
		"data-testid": C,
		className: e("relative inline-flex", S),
		children: [/* @__PURE__ */ d(n, {
			"aria-label": _(y, D),
			"aria-haspopup": "dialog",
			"aria-expanded": w,
			size: x,
			className: e("relative", x === "sm" && "h-7 w-7"),
			onClick: () => T((e) => !e),
			"data-testid": `${C}-button`,
			children: [/* @__PURE__ */ u(r, { size: x === "sm" ? 16 : 18 }), D > 0 && /* @__PURE__ */ u("span", {
				"aria-hidden": "true",
				className: "pointer-events-none absolute -right-1.5 -top-1.5",
				children: /* @__PURE__ */ u(i, {
					variant: "count",
					value: D,
					color: "danger",
					"data-testid": `${C}-badge`
				})
			})]
		}), /* @__PURE__ */ u(o, {
			trigger: E,
			open: w,
			onClose: O,
			placement: b,
			"aria-label": y,
			"data-testid": `${C}-popover`,
			className: A ? "w-[300px] max-w-[calc(100vw-16px)]" : "w-[360px] max-w-[calc(100vw-16px)] p-0 border-0 bg-transparent shadow-none",
			children: A ? /* @__PURE__ */ u(t, {
				density: "compact",
				children: /* @__PURE__ */ u(a, {
					icon: /* @__PURE__ */ u(r, { size: 24 }),
					title: "Nothing new",
					description: "Activity will appear here.",
					testId: `${C}-empty`
				})
			}) : /* @__PURE__ */ u(g, {
				items: f,
				onItemClick: k,
				onMarkAllRead: h,
				onClearAll: v,
				className: "w-full",
				"data-testid": `${C}-center`
			})
		})]
	});
}
//#endregion
export { g as n, m as r, v as t };
