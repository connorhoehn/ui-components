import { t as e } from "./cn-DhjIN-s0.js";
import { t } from "./EmptyState-DFWbBBcY.js";
import { useState as n } from "react";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
//#region src/components/shared/ConnectionPill.tsx
var a = {
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
}, o = {
	idle: "text-code-muted",
	connecting: "text-code-peach",
	connected: "text-code-green",
	reconnecting: "text-code-peach",
	disconnected: "text-code-red"
};
function s({ state: t, tone: n = "surface", compact: s = !1, withLabel: c = !0, labels: l, action: u, className: d, "data-testid": f = "connection-pill" }) {
	let p = a[t], m = l?.[t] ?? p?.label ?? String(t), h = c && !s, g = n === "code" ? o[t] : p?.colorClass;
	return /* @__PURE__ */ i("span", {
		role: "status",
		"aria-live": "polite",
		"aria-label": h ? void 0 : m,
		"data-testid": f,
		"data-state": t,
		className: e("inline-flex items-center gap-1.5 font-mono", d),
		children: [
			/* @__PURE__ */ r("span", {
				"aria-hidden": "true",
				className: g,
				children: "⬤"
			}),
			h && /* @__PURE__ */ r("span", {
				className: e(g, "font-semibold"),
				children: m
			}),
			u && !s && /* @__PURE__ */ r("button", {
				type: "button",
				onClick: u.onClick,
				disabled: u.disabled,
				"data-testid": u["data-testid"] ?? "connection-pill-action",
				className: e("rounded-sm px-1 underline decoration-dotted underline-offset-2", "hover:decoration-solid focus-visible:outline-2 focus-visible:outline-offset-1", "disabled:cursor-not-allowed disabled:no-underline disabled:opacity-50", g),
				children: u.label
			})
		]
	});
}
//#endregion
//#region src/components/shared/NotificationCenter.tsx
function c(e) {
	if (e == null) return null;
	let t = new Date(e);
	if (isNaN(t.getTime())) return null;
	let n = Date.now() - t.getTime();
	return n < 6e4 ? "just now" : n < 36e5 ? `${Math.floor(n / 6e4)}m ago` : n < 864e5 ? `${Math.floor(n / 36e5)}h ago` : `${Math.floor(n / 864e5)}d ago`;
}
function l({ items: a, onItemClick: o, onMarkAllRead: s, onClearAll: l, className: u, "data-testid": d }) {
	let [f, p] = n("unread"), m = a.filter((e) => !e.read), h = f === "unread" ? m : a, g = m.length > 0, _ = (t) => e("px-3 py-1.5 text-sm border-none rounded-md cursor-pointer font-[inherit] transition-colors duration-100", t ? "bg-primary-bg text-text-primary font-semibold" : "bg-transparent text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)]");
	return /* @__PURE__ */ i("div", {
		"data-testid": d,
		className: e("flex flex-col bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl shadow-md overflow-hidden", u),
		children: [
			/* @__PURE__ */ i("div", {
				className: "flex items-center justify-between px-4 pt-3 pb-2 border-b border-[var(--color-border)]",
				children: [/* @__PURE__ */ i("span", {
					className: "text-sm font-semibold text-[var(--color-text-primary)]",
					children: ["Notifications", g && /* @__PURE__ */ r("span", {
						className: "ml-2 inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full text-[11px] font-bold bg-danger text-white leading-none",
						children: m.length
					})]
				}), /* @__PURE__ */ i("div", {
					className: "flex items-center gap-2",
					children: [s && g && /* @__PURE__ */ r("button", {
						type: "button",
						onClick: s,
						className: "text-xs text-info-fg bg-transparent border-none cursor-pointer hover:underline",
						children: "Mark all read"
					}), l && a.length > 0 && /* @__PURE__ */ r("button", {
						type: "button",
						onClick: l,
						className: "text-xs text-[var(--color-text-tertiary)] bg-transparent border-none cursor-pointer hover:underline",
						children: "Clear all"
					})]
				})]
			}),
			/* @__PURE__ */ i("div", {
				className: "flex items-center gap-1 px-3 pt-2",
				children: [/* @__PURE__ */ i("button", {
					type: "button",
					className: _(f === "unread"),
					onClick: () => p("unread"),
					children: ["Unread ", m.length > 0 && `(${m.length})`]
				}), /* @__PURE__ */ r("button", {
					type: "button",
					className: _(f === "all"),
					onClick: () => p("all"),
					children: "All"
				})]
			}),
			/* @__PURE__ */ r("div", {
				className: "flex flex-col overflow-y-auto max-h-[420px] py-2",
				children: h.length === 0 ? /* @__PURE__ */ r(t, {
					icon: f === "unread" ? "✓" : "🔔",
					title: f === "unread" ? "All caught up" : "No notifications",
					body: f === "unread" ? "No unread notifications." : "Notifications will appear here."
				}) : h.map((t) => /* @__PURE__ */ i(o ? "button" : "div", {
					type: o ? "button" : void 0,
					onClick: o ? () => o(t) : void 0,
					className: e("flex items-start gap-3 px-4 py-3 text-left border-none", "transition-colors duration-100 font-[inherit] w-full", o && "cursor-pointer", t.read ? e("bg-transparent", o && "hover:bg-[var(--color-surface-hover)]") : e("bg-[rgba(59,130,246,0.05)]", o && "hover:bg-[rgba(59,130,246,0.1)]")),
					children: [t.icon && /* @__PURE__ */ r("span", {
						className: "text-lg shrink-0 mt-0.5",
						"aria-hidden": "true",
						children: t.icon
					}), /* @__PURE__ */ i("div", {
						className: "flex-1 min-w-0",
						children: [
							/* @__PURE__ */ i("div", {
								className: "flex items-center justify-between gap-2",
								children: [/* @__PURE__ */ r("span", {
									className: e("text-sm leading-snug truncate", t.read ? "text-[var(--color-text-secondary)] font-normal" : "text-[var(--color-text-primary)] font-medium"),
									children: t.title
								}), !t.read && /* @__PURE__ */ r("span", {
									className: "shrink-0 w-1.5 h-1.5 rounded-full bg-info",
									"aria-label": "Unread"
								})]
							}),
							t.body && /* @__PURE__ */ r("p", {
								className: "text-xs text-[var(--color-text-tertiary)] mt-0.5 leading-snug line-clamp-2",
								children: t.body
							}),
							t.timestamp != null && /* @__PURE__ */ r("p", {
								className: "text-[11px] text-[var(--color-text-tertiary)] mt-1 font-mono",
								children: c(t.timestamp)
							})
						]
					})]
				}, t.id))
			})
		]
	});
}
//#endregion
export { s as n, l as t };
