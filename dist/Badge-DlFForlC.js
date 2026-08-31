import { t as e } from "./cn-DhjIN-s0.js";
import { d as t, l as n } from "./Chip-YhQI5B9P.js";
import { t as r } from "./EmptyState-ClmWoqCb.js";
import { t as i } from "./Avatar-Yxs_9Jio.js";
import { t as a } from "./StatusDot-Bgx2zxgC.js";
import { useEffect as o, useRef as s, useState as c } from "react";
import { Fragment as l, jsx as u, jsxs as d } from "react/jsx-runtime";
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
function m({ state: t, tone: n = "surface", compact: r = !1, withLabel: i = !0, labels: a, className: o, "data-testid": s = "connection-pill" }) {
	let c = f[t], l = a?.[t] ?? c?.label ?? String(t), m = i && !r, h = n === "code" ? p[t] : c?.colorClass;
	return /* @__PURE__ */ d("span", {
		role: "status",
		"aria-live": "polite",
		"aria-label": m ? void 0 : l,
		"data-testid": s,
		"data-state": t,
		className: e("inline-flex items-center gap-1.5 font-mono", o),
		children: [/* @__PURE__ */ u("span", {
			"aria-hidden": "true",
			className: h,
			children: "⬤"
		}), m && /* @__PURE__ */ u("span", {
			className: e(h, "font-semibold"),
			children: l
		})]
	});
}
//#endregion
//#region src/components/shared/PresenceAvatars.tsx
var h = {
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
function g(e) {
	return e.idle === !0 ? "#f59e0b" : e.online === !1 ? "var(--color-text-tertiary)" : e.online === !0 ? "#22c55e" : null;
}
function _(e) {
	if (e) return /^#[0-9a-fA-F]{6}$/.test(e) ? `${e}99` : (/^#[0-9a-fA-F]{8}$/.test(e), e);
}
function v({ users: t, maxVisible: n = 5, size: r = 28, onMoreClick: o, onUserClick: s, className: c }) {
	let f = t.slice(0, n), p = t.length - f.length, m = -(r * .3), v = Math.max(1, Math.round(r * .07)), y = Math.max(10, Math.round(r * .42));
	return /* @__PURE__ */ d("div", {
		className: e("inline-flex items-center", c),
		role: "list",
		"aria-label": "Online users",
		children: [f.map((e, t) => {
			let n = g(e), o = e.idle === !0, c = o ? _(e.color) : e.color, f = o && !e.color ? .6 : void 0, p = e.mode ? h[e.mode] : null, b = [e.name];
			o ? b.push("Away") : p && b.push(p.label);
			let x = b.join(" — "), S = {
				"data-testid": "presence-avatar",
				"data-presence-user": e.name,
				"data-presence-user-id": e.id,
				...o ? { "data-presence-idle": "true" } : {},
				...e.mode ? { "data-presence-mode": e.mode } : {}
			}, C = /* @__PURE__ */ d(l, { children: [
				e.avatarUrl ? /* @__PURE__ */ u("img", {
					src: e.avatarUrl,
					alt: e.name,
					className: "rounded-full object-cover",
					style: {
						width: r,
						height: r,
						border: `${v}px solid white`,
						opacity: f
					}
				}) : /* @__PURE__ */ u(i, {
					name: e.name,
					size: r,
					color: c,
					style: {
						border: `${v}px solid white`,
						opacity: f
					}
				}),
				n && /* @__PURE__ */ u("span", {
					className: "absolute -bottom-0.5 -right-0.5",
					children: /* @__PURE__ */ u(a, {
						color: n,
						size: "xs",
						"aria-label": o ? `${e.name} away` : e.online === !1 ? `${e.name} offline` : `${e.name} online`
					})
				}),
				p && /* @__PURE__ */ u("span", {
					className: "absolute flex items-center justify-center rounded-full bg-surface border border-border select-none",
					style: {
						top: -v,
						right: -v,
						width: y,
						height: y,
						fontSize: y * .6,
						lineHeight: 1
					},
					"data-testid": "presence-mode-badge",
					"aria-label": p.label,
					children: p.glyph
				})
			] }), w = { marginLeft: t > 0 ? m : 0 };
			return s ? /* @__PURE__ */ u("button", {
				type: "button",
				role: "listitem",
				onClick: (t) => {
					t.stopPropagation(), s(e.id);
				},
				className: "relative shrink-0 p-0 bg-transparent border-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-info rounded-full",
				title: x,
				"aria-label": x,
				...S,
				style: w,
				children: C
			}, e.id) : /* @__PURE__ */ u("div", {
				role: "listitem",
				className: "relative shrink-0",
				title: x,
				...S,
				style: w,
				children: C
			}, e.id);
		}), p > 0 && /* @__PURE__ */ d("button", {
			type: "button",
			onClick: o,
			disabled: !o,
			"aria-label": `${p} more users`,
			className: e("inline-flex items-center justify-center rounded-full shrink-0", "font-semibold select-none bg-surface-emphasis text-text-secondary", o && "cursor-pointer hover:bg-surface-emphasis", !o && "cursor-default", "border-white"),
			style: {
				width: r,
				height: r,
				fontSize: r * .34,
				marginLeft: m,
				border: `${v}px solid white`
			},
			children: ["+", p]
		})]
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
function b({ items: t, onItemClick: n, onMarkAllRead: i, onClearAll: a, className: o, "data-testid": s }) {
	let [l, f] = c("unread"), p = t.filter((e) => !e.read), m = l === "unread" ? p : t, h = p.length > 0, g = (t) => e("px-3 py-1.5 text-sm border-none rounded-md cursor-pointer font-[inherit] transition-colors duration-100", t ? "bg-primary-bg text-text-primary font-semibold" : "bg-transparent text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)]");
	return /* @__PURE__ */ d("div", {
		"data-testid": s,
		className: e("flex flex-col bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl shadow-md overflow-hidden", o),
		children: [
			/* @__PURE__ */ d("div", {
				className: "flex items-center justify-between px-4 pt-3 pb-2 border-b border-[var(--color-border)]",
				children: [/* @__PURE__ */ d("span", {
					className: "text-sm font-semibold text-[var(--color-text-primary)]",
					children: ["Notifications", h && /* @__PURE__ */ u("span", {
						className: "ml-2 inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full text-[11px] font-bold bg-danger text-white leading-none",
						children: p.length
					})]
				}), /* @__PURE__ */ d("div", {
					className: "flex items-center gap-2",
					children: [i && h && /* @__PURE__ */ u("button", {
						type: "button",
						onClick: i,
						className: "text-xs text-info-fg bg-transparent border-none cursor-pointer hover:underline",
						children: "Mark all read"
					}), a && t.length > 0 && /* @__PURE__ */ u("button", {
						type: "button",
						onClick: a,
						className: "text-xs text-[var(--color-text-tertiary)] bg-transparent border-none cursor-pointer hover:underline",
						children: "Clear all"
					})]
				})]
			}),
			/* @__PURE__ */ d("div", {
				className: "flex items-center gap-1 px-3 pt-2",
				children: [/* @__PURE__ */ d("button", {
					type: "button",
					className: g(l === "unread"),
					onClick: () => f("unread"),
					children: ["Unread ", p.length > 0 && `(${p.length})`]
				}), /* @__PURE__ */ u("button", {
					type: "button",
					className: g(l === "all"),
					onClick: () => f("all"),
					children: "All"
				})]
			}),
			/* @__PURE__ */ u("div", {
				className: "flex flex-col overflow-y-auto max-h-[420px] py-2",
				children: m.length === 0 ? /* @__PURE__ */ u(r, {
					icon: l === "unread" ? "✓" : "🔔",
					title: l === "unread" ? "All caught up" : "No notifications",
					body: l === "unread" ? "No unread notifications." : "Notifications will appear here."
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
//#region src/components/shared/ActivityFeed.tsx
var x = {
	task: "var(--color-success)",
	pr: "var(--color-primary)",
	decision: "var(--color-warning)",
	comment: "var(--color-text-tertiary)",
	status: "var(--color-info)"
};
function S(e) {
	let t = e.trim().split(/\s+/), n = t[0] ?? "", r = t[1]?.[0] ?? "";
	return r ? `${n} ${r}.` : n;
}
var C = [
	1,
	.5,
	.18
];
function w({ item: e, opacity: t, dotColor: n }) {
	let r = e.subject.length > 30 ? e.subject.slice(0, 28) + "…" : e.subject;
	return /* @__PURE__ */ d("div", {
		className: "uc-activity-row flex items-center gap-1.5 py-[3.5px] overflow-hidden min-w-0 transition-[opacity] duration-[380ms] ease-in-out",
		style: { opacity: t },
		children: [
			/* @__PURE__ */ u("span", {
				className: "w-[5px] h-[5px] rounded-full shrink-0",
				style: { background: n }
			}),
			/* @__PURE__ */ u(i, {
				name: e.actor,
				size: 17
			}),
			/* @__PURE__ */ u("span", {
				className: "text-[11px] text-text-primary font-medium shrink-0",
				children: S(e.actor)
			}),
			/* @__PURE__ */ u("span", {
				className: "text-[11px] text-text-tertiary shrink-0",
				children: e.action
			}),
			e.ticketId && /* @__PURE__ */ u("span", {
				className: "text-[10px] font-bold font-mono text-primary-fg bg-primary-bg border border-primary-border rounded-[3px] px-[5px] py-px shrink-0 tracking-[0.01em] whitespace-nowrap",
				children: e.ticketId
			}),
			/* @__PURE__ */ u("span", {
				className: "text-[11px] text-text-secondary overflow-hidden text-ellipsis whitespace-nowrap flex-1 min-w-0",
				title: e.subject,
				children: r
			}),
			e.timeLabel && /* @__PURE__ */ u("span", {
				className: "text-[10px] text-code-subtle shrink-0 whitespace-nowrap",
				children: e.timeLabel
			})
		]
	});
}
function T({ items: t, visibleCount: n = 3, rotateMs: r = 4200, staggerMs: i = 0, kindColors: a, className: l }) {
	let d = {
		...x,
		...a
	}, [f, p] = c(() => t.slice(0, n)), m = s(n);
	return o(() => {
		p(t.slice(0, n)), m.current = n;
	}, [t, n]), o(() => {
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
	]), f.length === 0 ? /* @__PURE__ */ u("div", {
		className: e("flex-1 flex items-center", l),
		children: /* @__PURE__ */ u("span", {
			className: "text-[11px] text-border",
			children: "No recent activity"
		})
	}) : /* @__PURE__ */ u("div", {
		className: e("flex-1 flex flex-col overflow-hidden", l),
		children: f.map((e, t) => /* @__PURE__ */ u(w, {
			item: e,
			opacity: C[t] ?? .1,
			dotColor: d[e.kind ?? ""] ?? "var(--color-text-tertiary)"
		}, e.id))
	});
}
//#endregion
//#region src/components/shared/Badge.tsx
var E = {
	accent: "info",
	success: "success",
	danger: "danger",
	muted: "neutral"
};
function D(e) {
	return e == null || e <= 0 ? "0" : e > 99 ? "99+" : String(Math.trunc(e));
}
function O({ variant: r, value: i, color: a = "accent", "aria-label": o, className: s, "data-testid": c }) {
	if (r === "count") {
		let t = D(i);
		return /* @__PURE__ */ u("span", {
			"data-testid": c,
			"aria-label": o ?? `${t} items`,
			className: e("inline-flex items-center justify-center min-w-[18px] h-[18px]", "px-1.5 rounded-full text-[10px] font-semibold leading-none select-none", n[E[a]], s),
			children: t
		});
	}
	return r === "dot" ? /* @__PURE__ */ u("span", {
		"data-testid": c,
		"aria-label": o,
		role: o ? "img" : void 0,
		className: e("inline-block w-2 h-2 rounded-full shrink-0", t[E[a]], s)
	}) : /* @__PURE__ */ d("span", {
		"data-testid": c,
		"aria-label": o,
		role: o ? "img" : void 0,
		className: e("relative inline-flex w-2.5 h-2.5 shrink-0", s),
		children: [/* @__PURE__ */ u("span", {
			"aria-hidden": "true",
			className: e("absolute inset-0 rounded-full animate-ping", e(t[E[a]], "opacity-60"))
		}), /* @__PURE__ */ u("span", {
			"aria-hidden": "true",
			className: e("relative inline-block w-2.5 h-2.5 rounded-full", t[E[a]])
		})]
	});
}
//#endregion
export { m as a, v as i, T as n, b as r, O as t };
