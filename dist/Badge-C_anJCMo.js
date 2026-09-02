import { t as e } from "./cn-DhjIN-s0.js";
import { d as t, l as n } from "./Chip-YhQI5B9P.js";
import { t as r } from "./EmptyState-ClmWoqCb.js";
import { t as i } from "./Avatar-BzicCOft.js";
import { useEffect as a, useRef as o, useState as s } from "react";
import { jsx as c, jsxs as l } from "react/jsx-runtime";
//#region src/components/shared/ConnectionPill.tsx
var u = {
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
}, d = {
	idle: "text-code-muted",
	connecting: "text-code-peach",
	connected: "text-code-green",
	reconnecting: "text-code-peach",
	disconnected: "text-code-red"
};
function f({ state: t, tone: n = "surface", compact: r = !1, withLabel: i = !0, labels: a, className: o, "data-testid": s = "connection-pill" }) {
	let f = u[t], p = a?.[t] ?? f?.label ?? String(t), m = i && !r, h = n === "code" ? d[t] : f?.colorClass;
	return /* @__PURE__ */ l("span", {
		role: "status",
		"aria-live": "polite",
		"aria-label": m ? void 0 : p,
		"data-testid": s,
		"data-state": t,
		className: e("inline-flex items-center gap-1.5 font-mono", o),
		children: [/* @__PURE__ */ c("span", {
			"aria-hidden": "true",
			className: h,
			children: "⬤"
		}), m && /* @__PURE__ */ c("span", {
			className: e(h, "font-semibold"),
			children: p
		})]
	});
}
//#endregion
//#region src/components/shared/NotificationCenter.tsx
function p(e) {
	if (e == null) return null;
	let t = new Date(e);
	if (isNaN(t.getTime())) return null;
	let n = Date.now() - t.getTime();
	return n < 6e4 ? "just now" : n < 36e5 ? `${Math.floor(n / 6e4)}m ago` : n < 864e5 ? `${Math.floor(n / 36e5)}h ago` : `${Math.floor(n / 864e5)}d ago`;
}
function m({ items: t, onItemClick: n, onMarkAllRead: i, onClearAll: a, className: o, "data-testid": u }) {
	let [d, f] = s("unread"), m = t.filter((e) => !e.read), h = d === "unread" ? m : t, g = m.length > 0, _ = (t) => e("px-3 py-1.5 text-sm border-none rounded-md cursor-pointer font-[inherit] transition-colors duration-100", t ? "bg-primary-bg text-text-primary font-semibold" : "bg-transparent text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)]");
	return /* @__PURE__ */ l("div", {
		"data-testid": u,
		className: e("flex flex-col bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl shadow-md overflow-hidden", o),
		children: [
			/* @__PURE__ */ l("div", {
				className: "flex items-center justify-between px-4 pt-3 pb-2 border-b border-[var(--color-border)]",
				children: [/* @__PURE__ */ l("span", {
					className: "text-sm font-semibold text-[var(--color-text-primary)]",
					children: ["Notifications", g && /* @__PURE__ */ c("span", {
						className: "ml-2 inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full text-[11px] font-bold bg-danger text-white leading-none",
						children: m.length
					})]
				}), /* @__PURE__ */ l("div", {
					className: "flex items-center gap-2",
					children: [i && g && /* @__PURE__ */ c("button", {
						type: "button",
						onClick: i,
						className: "text-xs text-info-fg bg-transparent border-none cursor-pointer hover:underline",
						children: "Mark all read"
					}), a && t.length > 0 && /* @__PURE__ */ c("button", {
						type: "button",
						onClick: a,
						className: "text-xs text-[var(--color-text-tertiary)] bg-transparent border-none cursor-pointer hover:underline",
						children: "Clear all"
					})]
				})]
			}),
			/* @__PURE__ */ l("div", {
				className: "flex items-center gap-1 px-3 pt-2",
				children: [/* @__PURE__ */ l("button", {
					type: "button",
					className: _(d === "unread"),
					onClick: () => f("unread"),
					children: ["Unread ", m.length > 0 && `(${m.length})`]
				}), /* @__PURE__ */ c("button", {
					type: "button",
					className: _(d === "all"),
					onClick: () => f("all"),
					children: "All"
				})]
			}),
			/* @__PURE__ */ c("div", {
				className: "flex flex-col overflow-y-auto max-h-[420px] py-2",
				children: h.length === 0 ? /* @__PURE__ */ c(r, {
					icon: d === "unread" ? "✓" : "🔔",
					title: d === "unread" ? "All caught up" : "No notifications",
					body: d === "unread" ? "No unread notifications." : "Notifications will appear here."
				}) : h.map((t) => /* @__PURE__ */ l(n ? "button" : "div", {
					type: n ? "button" : void 0,
					onClick: n ? () => n(t) : void 0,
					className: e("flex items-start gap-3 px-4 py-3 text-left border-none", "transition-colors duration-100 font-[inherit] w-full", n && "cursor-pointer", t.read ? e("bg-transparent", n && "hover:bg-[var(--color-surface-hover)]") : e("bg-[rgba(59,130,246,0.05)]", n && "hover:bg-[rgba(59,130,246,0.1)]")),
					children: [t.icon && /* @__PURE__ */ c("span", {
						className: "text-lg shrink-0 mt-0.5",
						"aria-hidden": "true",
						children: t.icon
					}), /* @__PURE__ */ l("div", {
						className: "flex-1 min-w-0",
						children: [
							/* @__PURE__ */ l("div", {
								className: "flex items-center justify-between gap-2",
								children: [/* @__PURE__ */ c("span", {
									className: e("text-sm leading-snug truncate", t.read ? "text-[var(--color-text-secondary)] font-normal" : "text-[var(--color-text-primary)] font-medium"),
									children: t.title
								}), !t.read && /* @__PURE__ */ c("span", {
									className: "shrink-0 w-1.5 h-1.5 rounded-full bg-info",
									"aria-label": "Unread"
								})]
							}),
							t.body && /* @__PURE__ */ c("p", {
								className: "text-xs text-[var(--color-text-tertiary)] mt-0.5 leading-snug line-clamp-2",
								children: t.body
							}),
							t.timestamp != null && /* @__PURE__ */ c("p", {
								className: "text-[11px] text-[var(--color-text-tertiary)] mt-1 font-mono",
								children: p(t.timestamp)
							})
						]
					})]
				}, t.id))
			})
		]
	});
}
//#endregion
//#region src/components/shared/ActivityFeed.tsx
var h = {
	task: "var(--color-success)",
	pr: "var(--color-primary)",
	decision: "var(--color-warning)",
	comment: "var(--color-text-tertiary)",
	status: "var(--color-info)"
};
function g(e) {
	let t = e.trim().split(/\s+/), n = t[0] ?? "", r = t[1]?.[0] ?? "";
	return r ? `${n} ${r}.` : n;
}
var _ = [
	1,
	.5,
	.18
];
function v({ item: e, opacity: t, dotColor: n }) {
	let r = e.subject.length > 30 ? e.subject.slice(0, 28) + "…" : e.subject;
	return /* @__PURE__ */ l("div", {
		className: "uc-activity-row flex items-center gap-1.5 py-[3.5px] overflow-hidden min-w-0 transition-[opacity] duration-[380ms] ease-in-out",
		style: { opacity: t },
		children: [
			/* @__PURE__ */ c("span", {
				className: "w-[5px] h-[5px] rounded-full shrink-0",
				style: { background: n }
			}),
			/* @__PURE__ */ c(i, {
				name: e.actor,
				size: 17
			}),
			/* @__PURE__ */ c("span", {
				className: "text-[11px] text-text-primary font-medium shrink-0",
				children: g(e.actor)
			}),
			/* @__PURE__ */ c("span", {
				className: "text-[11px] text-text-tertiary shrink-0",
				children: e.action
			}),
			e.ticketId && /* @__PURE__ */ c("span", {
				className: "text-[10px] font-bold font-mono text-primary-fg bg-primary-bg border border-primary-border rounded-[3px] px-[5px] py-px shrink-0 tracking-[0.01em] whitespace-nowrap",
				children: e.ticketId
			}),
			/* @__PURE__ */ c("span", {
				className: "text-[11px] text-text-secondary overflow-hidden text-ellipsis whitespace-nowrap flex-1 min-w-0",
				title: e.subject,
				children: r
			}),
			e.timeLabel && /* @__PURE__ */ c("span", {
				className: "text-[10px] text-code-subtle shrink-0 whitespace-nowrap",
				children: e.timeLabel
			})
		]
	});
}
function y({ items: t, visibleCount: n = 3, rotateMs: r = 4200, staggerMs: i = 0, kindColors: l, className: u }) {
	let d = {
		...h,
		...l
	}, [f, p] = s(() => t.slice(0, n)), m = o(n);
	return a(() => {
		p(t.slice(0, n)), m.current = n;
	}, [t, n]), a(() => {
		if (!r || t.length <= n) return;
		let e, a = setTimeout(() => {
			e = setInterval(() => {
				if (!t.length) return;
				let e = t[m.current % t.length];
				e && (m.current = (m.current + 1) % t.length, p((t) => [e, ...t].slice(0, n)));
			}, r);
		}, i);
		return () => {
			clearTimeout(a), clearInterval(e);
		};
	}, [
		t,
		n,
		r,
		i
	]), f.length === 0 ? /* @__PURE__ */ c("div", {
		className: e("flex-1 flex items-center", u),
		children: /* @__PURE__ */ c("span", {
			className: "text-[11px] text-border",
			children: "No recent activity"
		})
	}) : /* @__PURE__ */ c("div", {
		className: e("flex-1 flex flex-col overflow-hidden", u),
		children: f.map((e, t) => /* @__PURE__ */ c(v, {
			item: e,
			opacity: _[t] ?? .1,
			dotColor: d[e.kind ?? ""] ?? "var(--color-text-tertiary)"
		}, e.id))
	});
}
//#endregion
//#region src/components/shared/Badge.tsx
var b = {
	accent: "info",
	success: "success",
	danger: "danger",
	muted: "neutral"
};
function x(e) {
	return e == null || e <= 0 ? "0" : e > 99 ? "99+" : String(Math.trunc(e));
}
function S({ variant: r, value: i, color: a = "accent", "aria-label": o, className: s, "data-testid": u }) {
	if (r === "count") {
		let t = x(i);
		return /* @__PURE__ */ c("span", {
			"data-testid": u,
			"aria-label": o ?? `${t} items`,
			className: e("inline-flex items-center justify-center min-w-[18px] h-[18px]", "px-1.5 rounded-full text-[10px] font-semibold leading-none select-none", n[b[a]], s),
			children: t
		});
	}
	return r === "dot" ? /* @__PURE__ */ c("span", {
		"data-testid": u,
		"aria-label": o,
		role: o ? "img" : void 0,
		className: e("inline-block w-2 h-2 rounded-full shrink-0", t[b[a]], s)
	}) : /* @__PURE__ */ l("span", {
		"data-testid": u,
		"aria-label": o,
		role: o ? "img" : void 0,
		className: e("relative inline-flex w-2.5 h-2.5 shrink-0", s),
		children: [/* @__PURE__ */ c("span", {
			"aria-hidden": "true",
			className: e("absolute inset-0 rounded-full animate-ping", e(t[b[a]], "opacity-60"))
		}), /* @__PURE__ */ c("span", {
			"aria-hidden": "true",
			className: e("relative inline-block w-2.5 h-2.5 rounded-full", t[b[a]])
		})]
	});
}
//#endregion
export { f as i, y as n, m as r, S as t };
