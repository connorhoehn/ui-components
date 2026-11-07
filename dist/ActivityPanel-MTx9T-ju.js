import { t as e } from "./cn-D4QmbyEy.js";
import { n as t } from "./ToastProvider-D6jAeNNE.js";
import { n } from "./Button-C-I3BxWI.js";
import { t as r } from "./Card-sJqvEOtP.js";
import { n as i } from "./overlayStack-DxIDMUs-.js";
import { t as a } from "./IconButton-Bf5Wy0tS.js";
import { m as o, t as s } from "./Icons-CqVFbuiZ.js";
import { c, l } from "./Text-BAAQrepu.js";
import { t as u } from "./Input-Brvp1kPv.js";
import { t as d } from "./InlinePopover-Dx8-r-XU.js";
import { t as f } from "./EmptyState-pOG782nO.js";
import { r as p } from "./safeHref-BR1Vy6Dm.js";
import { n as m } from "./StatusPill-cLjwbEQM.js";
import { n as h } from "./Avatar-GvBbrBxQ.js";
import { t as g } from "./StatusDot-GwVn-q5q.js";
import { i as _ } from "./ChoiceList-e9ggV8ZP.js";
import { a as v, c as y, d as b, i as x, l as S, n as C, o as w, r as T } from "./railType-AsIPWdQ5.js";
import { createContext as E, useCallback as D, useContext as O, useEffect as k, useId as A, useLayoutEffect as j, useMemo as M, useRef as N, useState as P } from "react";
import { Fragment as F, jsx as I, jsxs as L } from "react/jsx-runtime";
//#region src/components/shared/SubNavLayout.tsx
function R(e) {
	let t = [], n = /* @__PURE__ */ new Map();
	for (let r of e) {
		let e = r.group ?? null;
		if (e === null) {
			(t.length === 0 || t[0].name !== null) && (t.unshift({
				name: null,
				items: []
			}), n.forEach((e, t) => n.set(t, e + 1))), t[0].items.push(r);
			continue;
		}
		let i = n.get(e);
		i === void 0 && (i = t.length, n.set(e, i), t.push({
			name: e,
			items: []
		})), t[i].items.push(r);
	}
	return t;
}
function z({ items: e, storageKey: t, title: n, renderNavItem: r, railLabel: i }) {
	let a = M(() => R(e), [e]), o = a.some((e) => e.name !== null);
	return /* @__PURE__ */ I("nav", {
		"aria-label": i,
		className: "flex-1 overflow-y-auto py-1",
		children: o ? a.map((e) => e.name === null ? /* @__PURE__ */ I(U, {
			items: e.items,
			renderNavItem: r
		}, "__ungrouped") : /* @__PURE__ */ I(W, {
			name: e.name,
			items: e.items,
			storageKey: `${t}.${n}.${e.name}`,
			renderNavItem: r
		}, e.name)) : /* @__PURE__ */ I(U, {
			items: e,
			renderNavItem: r
		})
	});
}
function B({ title: t, items: n, compactHeader: r = !1, railContent: i, contentPadding: a = "default", titleAction: o, railHeader: s, railWidth: c = 220, storageKey: l = "subnav", secondaryTitle: u, secondaryItems: d, secondaryStorageKey: f, secondaryRailWidth: p = 200, renderNavItem: m, railLabel: h, contentAs: g = "main", contentLabel: _, collapsed: v = !1, children: y }) {
	let b = g, x = d && d.length > 0, [S, C] = P(0), w = D((e) => e ? (C((e) => e + 1), () => C((e) => e - 1)) : () => {}, []), T = v && S > 0;
	return /* @__PURE__ */ L("div", {
		className: "flex h-full min-h-0",
		children: [
			/* @__PURE__ */ L("aside", {
				"aria-label": h ?? `${t} navigation`,
				className: e("flex-none border-r border-[var(--color-border)] bg-[var(--color-surface)] flex flex-col overflow-hidden", v && "w-11 min-w-11"),
				style: v ? void 0 : { width: c },
				"data-collapsed": v ? "true" : void 0,
				children: [
					/* @__PURE__ */ L("div", {
						className: e("flex flex-none items-center border-b border-[var(--color-border)]", v ? "justify-center px-0" : "justify-between px-4", T ? "h-9 py-0" : r ? "py-2.5" : "py-[14px]"),
						children: [!v && /* @__PURE__ */ I("span", {
							className: e("font-semibold text-[var(--color-text-tertiary)] uppercase tracking-[0.05em]", r ? "text-[11px]" : "text-[12px]"),
							children: t
						}), o]
					}),
					s && !v && /* @__PURE__ */ I("div", {
						className: "px-3 py-2 border-b border-[var(--color-border)]",
						children: s
					}),
					!v && (i ? /* @__PURE__ */ I("div", {
						className: "min-h-0 flex-1 overflow-auto",
						"data-subnav-explorer": !0,
						children: i
					}) : /* @__PURE__ */ I(z, {
						items: n,
						storageKey: l,
						title: t,
						renderNavItem: m,
						railLabel: h
					}))
				]
			}),
			x && /* @__PURE__ */ L("aside", {
				"aria-label": `${u ?? t} sections`,
				className: "flex-none border-r border-[var(--color-border)] bg-[var(--color-surface)] flex flex-col overflow-hidden",
				style: { width: p },
				children: [/* @__PURE__ */ I("div", {
					className: "flex items-center justify-between px-4 py-[14px] border-b border-[var(--color-border)]",
					children: /* @__PURE__ */ I("span", {
						className: "text-[12px] font-semibold text-[var(--color-text-tertiary)] uppercase tracking-[0.05em]",
						children: u ?? ""
					})
				}), /* @__PURE__ */ I(z, {
					items: d,
					storageKey: f ?? `${l}.secondary`,
					title: u ?? "secondary",
					renderNavItem: m
				})]
			}),
			/* @__PURE__ */ I(b, {
				"aria-label": _,
				"data-subnav-content": !0,
				className: e("flex-1 min-w-0 min-h-0 overflow-auto", a === "none" ? "p-0" : "p-[var(--ui-page-gutter,1.5rem)]"),
				children: /* @__PURE__ */ I(V.Provider, {
					value: w,
					children: y
				})
			})
		]
	});
}
var V = E(null);
function H(e) {
	let t = O(V);
	j(() => t ? t(e) : void 0, [t, e]);
}
function U({ items: e, renderNavItem: t }) {
	return /* @__PURE__ */ I(F, { children: e.map((e) => /* @__PURE__ */ I(G, {
		item: e,
		renderNavItem: t
	}, e.path)) });
}
function W({ name: t, items: n, storageKey: r, renderNavItem: i }) {
	let [a, o] = P(() => typeof window > "u" ? !1 : window.localStorage?.getItem(r) === "1");
	k(() => {
		typeof window > "u" || (a ? window.localStorage?.setItem(r, "1") : window.localStorage?.removeItem(r));
	}, [a, r]);
	let s = A(), c = N(null), l = N(null), u = () => {
		if (!a) {
			let e = typeof document > "u" ? null : document.activeElement;
			e && l.current?.contains(e) && c.current?.focus();
		}
		o((e) => !e);
	}, d = n.find((e) => e.groupScrollAfter)?.groupScrollAfter, f = d ? {
		maxHeight: d * 36,
		overflowY: "auto"
	} : void 0;
	return /* @__PURE__ */ L("section", {
		"data-ui-part": "",
		className: "border-b border-[var(--color-border)]",
		children: [/* @__PURE__ */ L("button", {
			"data-ui-part": "",
			type: "button",
			ref: c,
			onClick: u,
			className: e("flex items-center gap-1.5 w-full px-2 bg-transparent border-none cursor-pointer text-left hover:bg-surface-hover", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary", w, x, v),
			"aria-expanded": !a,
			"aria-controls": s,
			"data-testid": "subnav-group-header",
			children: [
				/* @__PURE__ */ I("span", {
					className: "grid h-5 w-5 shrink-0 place-items-center",
					"aria-hidden": "true",
					children: /* @__PURE__ */ I(b, { open: !a })
				}),
				/* @__PURE__ */ I("span", {
					className: "min-w-0 flex-1 truncate",
					children: t
				}),
				/* @__PURE__ */ I("span", {
					className: e("shrink-0 pr-1", T),
					"aria-label": `${n.length} items`,
					"data-testid": "subnav-group-count",
					children: n.length
				})
			]
		}), !a && /* @__PURE__ */ I("div", {
			id: s,
			ref: l,
			style: f,
			children: n.map((e) => /* @__PURE__ */ I(G, {
				item: e,
				renderNavItem: i
			}, e.path))
		})]
	});
}
function G({ item: t, renderNavItem: n }) {
	let r = t.accent === "danger" ? "var(--color-danger)" : t.accent === "warning" ? "var(--color-warning)" : t.accent === "success" ? "var(--color-success)" : void 0, i = /* @__PURE__ */ L(F, { children: [/* @__PURE__ */ L("div", {
		className: "flex min-w-0 items-center justify-between gap-2",
		children: [
			/* @__PURE__ */ I("span", {
				className: e("min-w-0 truncate", y),
				style: r ? { color: r } : void 0,
				"data-testid": "subnav-item-label",
				"data-ui-text": "rail-item",
				children: t.label
			}),
			t.activity && /* @__PURE__ */ I("span", {
				className: "ml-auto shrink-0 text-primary",
				role: "img",
				"aria-label": t.activity.label,
				title: t.activity.label,
				"data-testid": "subnav-item-activity",
				children: /* @__PURE__ */ I(s, { size: 13 })
			}),
			t.count !== void 0 && /* @__PURE__ */ I("span", {
				className: e("shrink-0", "text-[12px] font-medium leading-4 tabular-nums text-text-secondary"),
				"data-testid": "subnav-item-count",
				children: t.count
			})
		]
	}), t.hint && /* @__PURE__ */ I("div", {
		className: "text-[12px] leading-4 text-[var(--color-text-tertiary)] mt-0.5",
		children: t.hint
	})] });
	return t.onClick ? /* @__PURE__ */ I("button", {
		"data-ui-part": "",
		type: "button",
		onClick: t.onClick,
		className: e("block w-full px-[14px] border-l-[3px] border-transparent border-t-0 border-r-0 border-b-0 bg-transparent text-text-primary text-left cursor-pointer font-[inherit] hover:bg-surface-hover", S),
		children: i
	}) : n ? /* @__PURE__ */ I(F, { children: n(t, i, {
		display: "block",
		padding: "9px 14px",
		borderLeft: "3px solid transparent",
		color: "var(--color-text-primary)",
		textDecoration: "none",
		cursor: "pointer"
	}) }) : /* @__PURE__ */ I("a", {
		href: t.path,
		className: q,
		children: i
	});
}
var K = {
	borderLeft: "3px solid var(--color-primary)",
	background: "color-mix(in srgb, var(--color-primary) 8%, transparent)",
	color: "var(--color-text-primary)"
}, q = `block px-[14px] ${S} border-l-[3px] border-transparent text-text-primary no-underline cursor-pointer hover:bg-surface-hover`, J = `block px-[14px] ${S} border-l-[3px] border-primary ${C} text-text-primary no-underline cursor-pointer`, Y = {
	sm: "w-[264px]",
	md: "w-[320px]",
	lg: "w-[380px]"
};
function X({ open: t, anchor: r, placement: i = "bottom-start", title: a, subtitle: o, icon: s, submitLabel: c, submitSlot: l, submitTestId: u, submitDisabled: f = !1, busy: p = !1, error: m = null, onSubmit: h, onClose: g, width: _ = "md", children: v, "data-testid": y = "popover-form" }) {
	let b = N(null), x = N(null);
	if (k(() => {
		if (!t) return;
		let e = window.setTimeout(() => {
			x.current?.querySelector("input, textarea, select")?.focus();
		}, 0);
		return () => window.clearTimeout(e);
	}, [t]), !t) return null;
	let S = /* @__PURE__ */ L("form", {
		className: e("flex flex-col", Y[_]),
		"data-testid": y,
		onSubmit: (e) => {
			e.preventDefault(), !f && !p && h();
		},
		children: [
			/* @__PURE__ */ L("div", {
				className: "flex items-center gap-2 border-b border-border px-3 py-2.5",
				children: [s && /* @__PURE__ */ I("span", {
					className: "flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-primary-bg text-primary-fg",
					"aria-hidden": "true",
					children: s
				}), /* @__PURE__ */ L("span", {
					className: "flex min-w-0 flex-col",
					children: [/* @__PURE__ */ I("span", {
						className: "truncate text-[13px] font-semibold leading-tight text-text-primary",
						"data-testid": `${y}-title`,
						children: a
					}), o && /* @__PURE__ */ I("span", {
						className: "truncate text-[11px] leading-tight text-text-tertiary",
						children: o
					})]
				})]
			}),
			/* @__PURE__ */ I("div", {
				ref: x,
				className: "flex flex-col gap-2.5 px-3 py-2.5",
				children: v
			}),
			/* @__PURE__ */ I("div", {
				className: e("min-h-[1.125rem] px-3", m && "pb-1"),
				"aria-live": "polite",
				children: m && /* @__PURE__ */ I("span", {
					className: "text-[11px] leading-tight text-danger-fg",
					role: "alert",
					"data-testid": `${y}-error`,
					children: m
				})
			}),
			/* @__PURE__ */ L("div", {
				className: "flex items-center justify-end gap-1.5 border-t border-border px-3 py-2",
				children: [/* @__PURE__ */ I(n, {
					type: "button",
					variant: "ghost",
					size: "sm",
					onClick: g,
					disabled: p,
					"data-testid": `${y}-cancel`,
					children: "Cancel"
				}), l === !1 ? null : l ?? /* @__PURE__ */ I(n, {
					type: "submit",
					variant: "primary",
					size: "sm",
					disabled: f || p,
					"data-testid": u ?? `${y}-submit`,
					children: p ? "Working…" : c
				})]
			})
		]
	});
	return r ? /* @__PURE__ */ I(d, {
		trigger: r ?? b,
		open: t,
		onClose: g,
		placement: i,
		offset: 6,
		className: "p-0",
		"data-testid": `${y}-popover`,
		children: S
	}) : /* @__PURE__ */ I("div", {
		className: "fixed inset-0 z-50 flex items-start justify-center bg-black/20 pt-24",
		onMouseDown: g,
		"data-testid": `${y}-backdrop`,
		children: /* @__PURE__ */ I("div", {
			className: "rounded-lg border border-border bg-surface shadow-lg",
			onMouseDown: (e) => e.stopPropagation(),
			children: S
		})
	});
}
function Z({ label: e, hint: t, children: n, "data-testid": r }) {
	return /* @__PURE__ */ L("label", {
		className: "flex flex-col gap-1",
		"data-testid": r,
		children: [
			/* @__PURE__ */ I("span", {
				className: "text-[11px] font-medium leading-none text-text-secondary",
				children: e
			}),
			n,
			t && /* @__PURE__ */ I("span", {
				className: "text-[11px] leading-tight text-text-tertiary",
				children: t
			})
		]
	});
}
//#endregion
//#region src/components/layout/WorkspaceRail.tsx
var Q = e("inline-flex items-center gap-1 rounded border-0 bg-transparent p-0 text-[13px] font-medium text-primary no-underline", "cursor-pointer hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary");
function $({ title: t, label: n, actions: r, header: s, footer: c, children: l, width: u = "md", count: d, heading: f = "compact", countStyle: p = "chip", back: m, collapsed: h = !1, collapsedContent: g, onToggle: _, toggleLabel: v, toggleTestId: y, className: b, "data-testid": x = "workspace-rail" }) {
	let S = p === "plain" || f === "label", C = !!(t || r || _);
	H(C && f === "compact");
	let w = v ?? `${h ? "Show" : "Hide"} ${n ?? t ?? "the list"}`;
	return /* @__PURE__ */ L("nav", {
		"aria-label": n ?? t ?? "Workspace",
		"data-testid": x,
		"data-collapsed": h,
		className: e("flex h-full min-h-0 shrink-0 flex-col border-r border-border bg-surface-panel", h ? "w-9" : u === "xs" ? "w-[220px]" : u === "sm" ? "w-[240px]" : u === "ms" ? "w-[264px]" : u === "lg" ? "w-[368px]" : u === "ml" ? "w-[320px]" : "w-[300px]", b),
		children: [
			m && !h && /* @__PURE__ */ I("div", {
				className: e("flex shrink-0 items-center pt-4", f === "compact" ? "px-3.5" : "px-5"),
				"data-testid": `${x}-back-row`,
				children: m.href ? /* @__PURE__ */ L("a", {
					href: m.href,
					onClick: m.onClick,
					className: Q,
					"data-testid": `${x}-back`,
					children: [/* @__PURE__ */ I(o, {
						dir: "left",
						size: 14
					}), m.label]
				}) : /* @__PURE__ */ L("button", {
					"data-ui-part": "",
					type: "button",
					onClick: m.onClick,
					className: Q,
					"data-testid": `${x}-back`,
					children: [/* @__PURE__ */ I(o, {
						dir: "left",
						size: 14
					}), m.label]
				})
			}),
			C && /* @__PURE__ */ L("div", {
				className: e("flex shrink-0 items-center gap-1", f === "compact" ? "h-9 border-b border-border" : "h-14", h ? "justify-center" : f === "compact" ? "pl-3.5 pr-1.5" : "pl-5 pr-3"),
				"data-testid": `${x}-header`,
				children: [
					!h && (t ? /* @__PURE__ */ L("h2", {
						className: e("m-0 flex min-w-0 flex-1 items-center gap-2 text-text-primary", f === "prominent" ? "text-[18px] font-semibold" : f === "label" ? e("text-[12px] font-semibold uppercase leading-4 tracking-wide", "text-text-secondary") : f === "caption" ? "text-[12px] font-semibold uppercase tracking-[0.06em]" : "text-[12px] font-semibold"),
						"data-testid": `${x}-title`,
						children: [
							/* @__PURE__ */ I("span", {
								className: "min-w-0 truncate",
								children: t
							}),
							typeof d == "number" && S && /* @__PURE__ */ I("span", {
								className: e("shrink-0", f === "label" ? "text-[12px] font-medium leading-4 normal-case tracking-normal tabular-nums text-text-tertiary" : "text-xs font-medium text-text-secondary"),
								"aria-label": `${d} items`,
								"data-testid": `${x}-count`,
								"data-count-style": "plain",
								children: d
							}),
							typeof d == "number" && !S && /* @__PURE__ */ I(i, {
								size: f === "prominent" ? "md" : f === "caption" ? "sm" : "xs",
								tone: "neutral",
								className: "shrink-0",
								"aria-label": `${d} items`,
								"data-testid": `${x}-count`,
								children: d
							})
						]
					}) : /* @__PURE__ */ I("span", { className: "flex-1" })),
					!h && r != null && /* @__PURE__ */ I("div", {
						className: "flex shrink-0 items-center gap-1",
						"data-testid": `${x}-actions`,
						children: r
					}),
					_ && /* @__PURE__ */ I(a, {
						size: "sm",
						variant: "ghost",
						"aria-label": w,
						title: w,
						"aria-expanded": !h,
						onClick: _,
						icon: /* @__PURE__ */ I(o, {
							dir: h ? "right" : "left",
							size: 14
						}),
						"data-testid": y ?? `${x}-${h ? "unfold" : "fold"}`
					})
				]
			}),
			!h && s && /* @__PURE__ */ I("div", {
				className: e("shrink-0 py-3", f === "compact" ? "px-3.5" : "px-5 pt-0"),
				children: s
			}),
			/* @__PURE__ */ I("div", {
				className: "min-h-0 flex-1 overflow-y-auto overflow-x-hidden",
				"data-testid": `${x}-scroll`,
				children: h ? g : l
			}),
			!h && c && /* @__PURE__ */ I("div", {
				className: "shrink-0 border-t border-border px-3.5 py-2",
				children: c
			})
		]
	});
}
//#endregion
//#region src/components/hangout/InviteCandidateList.tsx
function ee({ candidates: t, onInvite: r, loading: i = !1, resetKey: a, children: o, tone: s = "light", searchable: c = !1, grouped: l = !1, selectMode: d = "multi", onPick: f, confirmLabel: p = "Invite", confirmLoadingLabel: m = "Inviting…", confirmCountLabel: g, className: v, "data-testid": y }) {
	let b = s === "dark", x = d === "single", [S, C] = P(() => /* @__PURE__ */ new Set()), [w, T] = P("");
	k(() => {
		C(/* @__PURE__ */ new Set()), T("");
	}, [a]);
	let E = M(() => t.filter((e) => !e.alreadyInCall), [t]);
	k(() => {
		C((e) => {
			if (e.size === 0) return e;
			let t = new Set(E.map((e) => e.userId)), n = !1, r = /* @__PURE__ */ new Set();
			for (let i of e) t.has(i) ? r.add(i) : n = !0;
			return n ? r : e;
		});
	}, [E]);
	let D = M(() => {
		let e = w.trim().toLowerCase();
		return !c || !e ? t : t.filter((t) => t.name.toLowerCase().includes(e) || t.userId.toLowerCase().includes(e));
	}, [
		t,
		c,
		w
	]), O = (e) => {
		C((t) => {
			let n = new Set(t);
			return n.has(e) ? n.delete(e) : n.add(e), n;
		});
	}, A = S.size, j = (t) => {
		let n = !!t.alreadyInCall || !!t.disabled || i, r = !x && S.has(t.userId);
		return /* @__PURE__ */ I("li", { children: /* @__PURE__ */ L("button", {
			"data-ui-part": "",
			type: "button",
			disabled: n,
			"aria-pressed": x ? void 0 : r,
			onClick: () => {
				x ? f?.(t.userId) : O(t.userId);
			},
			"data-testid": "invite-candidate",
			"data-user-id": t.userId,
			"data-selected": r ? "true" : "false",
			"data-already-in-call": t.alreadyInCall ? "true" : "false",
			"data-disabled": n ? "true" : "false",
			className: e("flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left", n ? "opacity-50 cursor-not-allowed" : e("cursor-pointer", b ? "hover:bg-white/10" : "hover:bg-surface-hover"), r && (b ? "bg-white/10" : "bg-surface-hover")),
			children: [
				/* @__PURE__ */ L("span", {
					className: "relative inline-flex shrink-0",
					children: [/* @__PURE__ */ I(h, {
						name: t.name,
						src: t.avatarUrl,
						color: t.color,
						size: 24
					}), t.online !== void 0 && /* @__PURE__ */ I(_, {
						state: t.online ? "online" : "offline",
						pulse: !1,
						size: "xs",
						className: e("absolute -bottom-0.5 -right-0.5 rounded-full ring-2", b ? "ring-call-chrome" : "ring-surface")
					})]
				}),
				/* @__PURE__ */ I("span", {
					className: e("flex-1 truncate text-[13px]", b ? "text-white" : "text-text-primary"),
					children: t.name
				}),
				t.online === !1 && t.lastSeenLabel && /* @__PURE__ */ I("span", {
					"data-testid": "invite-candidate-last-seen",
					className: e("shrink-0 text-[11px]", b ? "text-white/50" : "text-neutral"),
					children: t.lastSeenLabel
				}),
				t.statusLabel && !t.alreadyInCall && !t.pending && /* @__PURE__ */ I("span", {
					"data-testid": "invite-candidate-status",
					className: e("shrink-0 text-[11px]", b ? "text-white/50" : "text-neutral"),
					children: t.statusLabel
				}),
				t.alreadyInCall ? /* @__PURE__ */ I("span", {
					className: e("text-[11px]", b ? "text-white/50" : "text-neutral"),
					children: "In call"
				}) : t.pending ? /* @__PURE__ */ I("span", {
					className: e("text-[11px]", b ? "text-white/50" : "text-neutral"),
					children: "Ringing…"
				}) : x || t.disabled ? null : /* @__PURE__ */ I("span", {
					"aria-hidden": "true",
					className: e("grid h-4 w-4 place-items-center rounded border text-[10px]", r ? "border-transparent bg-primary text-on-primary" : e("text-transparent", b ? "border-white/30" : "border-border")),
					children: "✓"
				})
			]
		}) }, t.userId);
	}, N = (t, n) => /* @__PURE__ */ I("li", {
		"data-testid": `people-group-${n}`,
		"aria-hidden": "true",
		className: e("px-2 pb-0.5 pt-2 text-[11px] font-semibold uppercase tracking-wide first:pt-0", b ? "text-white/40" : "text-text-tertiary"),
		children: t
	}, `section-${n}`), R = l ? D.filter((e) => e.online === !0) : [], z = l ? D.filter((e) => e.online !== !0) : [], B = /* @__PURE__ */ L(F, { children: [c && /* @__PURE__ */ I(u, {
		type: "search",
		size: "sm",
		value: w,
		onChange: (e) => T(e.target.value),
		placeholder: "Search people",
		"aria-label": "Search people",
		"data-testid": "people-search",
		className: e("mb-1", b && "border-white/20 bg-white/10 text-white placeholder:text-white/40 focus:border-white/40 focus:bg-white/10 focus:ring-white/20")
	}), t.length === 0 ? /* @__PURE__ */ I("p", {
		className: e("m-0 text-[13px]", b ? "text-white/60" : "text-text-secondary"),
		"data-testid": "invite-to-call-empty",
		children: l ? "No one to show yet." : "Nobody else is online right now."
	}) : E.length === 0 ? /* @__PURE__ */ I("p", {
		className: e("m-0 text-[13px]", b ? "text-white/60" : "text-text-secondary"),
		"data-testid": "invite-to-call-everyone-here",
		children: "Everyone who's online is already on this call."
	}) : D.length === 0 ? /* @__PURE__ */ L("p", {
		className: e("m-0 text-[13px]", b ? "text-white/60" : "text-text-secondary"),
		"data-testid": "people-search-empty",
		children: [
			"No one matches “",
			w.trim(),
			"”."
		]
	}) : /* @__PURE__ */ I("ul", {
		className: "flex flex-col gap-1 m-0 p-0 list-none max-h-[min(55vh,480px)] overflow-y-auto overscroll-contain [scrollbar-width:thin] [scrollbar-gutter:stable]",
		"aria-label": "People you can invite",
		children: l ? /* @__PURE__ */ L(F, { children: [
			R.length > 0 && N("Online", "online"),
			R.map(j),
			z.length > 0 && N("Offline", "offline"),
			z.map(j)
		] }) : D.map(j)
	})] }), V = x ? null : /* @__PURE__ */ I(n, {
		variant: "primary",
		size: "md",
		onClick: () => {
			let e = [...S];
			C(/* @__PURE__ */ new Set()), r(e);
		},
		disabled: i || A === 0,
		"data-autofocus": !0,
		"data-testid": y ? `${y}-confirm` : "invite-to-call-confirm",
		children: i ? m : A === 0 ? p : g ? g(A) : `${p} ${A} ${A === 1 ? "person" : "people"}`
	});
	return o ? /* @__PURE__ */ I(F, { children: o({
		list: B,
		confirm: V
	}) }) : /* @__PURE__ */ L("div", {
		className: e("flex flex-col gap-3", v),
		"data-testid": y,
		children: [B, V && /* @__PURE__ */ I("div", {
			className: "flex justify-end",
			children: V
		})]
	});
}
//#endregion
//#region src/components/social/ActivityPanel.tsx
function te() {
	return "";
}
var ne = 50;
function re(e) {
	let t = e.detail;
	switch (e.eventType) {
		case "social.room.join": return {
			icon: "🚪",
			text: `Joined room ${t.roomId?.slice(0, 8) ?? ""}`
		};
		case "social.room.leave": return {
			icon: "🚪",
			text: `Left room ${t.roomId?.slice(0, 8) ?? ""}`
		};
		case "social.follow": return {
			icon: "👥",
			text: `Followed @${t.followeeId?.slice(0, 8) ?? ""}`
		};
		case "social.unfollow": return {
			icon: "👥",
			text: `Unfollowed @${t.followeeId?.slice(0, 8) ?? ""}`
		};
		case "social.like": return {
			icon: "❤️",
			text: `Liked ${t.contentId?.slice(0, 8) ?? "content"}`
		};
		case "social.reaction": return {
			icon: t.emoji ?? "😀",
			text: `Reacted to ${t.contentId?.slice(0, 8) ?? "content"}`
		};
		case "social.post.created": return {
			icon: "📝",
			text: `Posted in room ${t.roomId?.slice(0, 8) ?? ""}`
		};
		case "social.comment.created": return {
			icon: "💬",
			text: `Commented in room ${t.roomId?.slice(0, 8) ?? ""}`
		};
		case "pipeline.run.started": {
			let e = t.pipelineId ?? "";
			return {
				icon: "▶",
				text: e ? `Triggered pipeline ${e}` : "Triggered pipeline"
			};
		}
		case "pipeline.run.completed": return {
			icon: "✓",
			text: typeof t.durationMs == "number" ? `Pipeline run completed in ${t.durationMs}ms` : "Pipeline run completed"
		};
		case "pipeline.run.failed": return {
			icon: "✕",
			text: `Pipeline run failed: ${t.error ?? "unknown error"}`
		};
		case "pipeline.approval.requested": return {
			icon: "✋",
			text: "Approval requested"
		};
		default: return {
			icon: "ℹ️",
			text: e.eventType
		};
	}
}
function ie(e) {
	let t = Date.now() - new Date(e).getTime(), n = Math.floor(t / 1e3);
	return n < 60 ? "just now" : n < 3600 ? `${Math.floor(n / 60)}m ago` : e.slice(0, 10);
}
function ae(e) {
	if (!e) return null;
	try {
		return JSON.parse(atob(e.split(".")[1])).sub;
	} catch {
		return null;
	}
}
function oe({ idToken: e, sendMessage: n, onMessage: r, connectionState: i, baseUrl: a, fetchActivity: o, onError: s }) {
	let [c, l] = P([]), [u, d] = P(!0), [f, p] = P(!1), [m, h] = P(null), [g, _] = P(0), v = N(n);
	k(() => {
		v.current = n;
	}, [n]);
	let { toast: y } = t(), b = N(s);
	k(() => {
		b.current = s;
	}, [s]);
	let x = ae(e), S = D(() => _((e) => e + 1), []);
	return k(() => {
		if (o) {
			let t = !1;
			return d(!0), h(null), Promise.resolve(o({
				idToken: e,
				limit: 20
			})).then((e) => {
				t || (l(e?.items ?? []), h(null));
			}).catch((e) => {
				if (t) return;
				let n = e instanceof Error ? e : Error(String(e));
				console.error("[activity] fetch failed:", e), h(n.message), y("Couldn't load activity feed", { type: "error" }), b.current?.(n);
			}).finally(() => {
				t || d(!1);
			}), () => {
				t = !0;
			};
		}
		let t = a ?? te();
		if (!e || !t) {
			d(!1);
			return;
		}
		let n = !1;
		return d(!0), h(null), fetch(`${t}/api/activity?limit=20`, { headers: { Authorization: `Bearer ${e}` } }).then((e) => {
			if (!e.ok) throw Error(`HTTP ${e.status}`);
			return e.json();
		}).then((e) => {
			!n && e?.items && (l(e.items), h(null));
		}).catch((e) => {
			if (n) return;
			let t = e instanceof Error ? e : Error(String(e));
			console.error("[activity] fetch failed:", e), h(t.message), y("Couldn't load activity feed", { type: "error" }), b.current?.(t);
		}).finally(() => {
			n || d(!1);
		}), () => {
			n = !0;
		};
	}, [
		e,
		g,
		y,
		a,
		o
	]), k(() => {
		if (i !== "connected" || !x) {
			p(!1);
			return;
		}
		let e = `activity:${x}`;
		return v.current({
			service: "activity",
			action: "subscribe",
			channelId: e
		}), p(!0), () => {
			v.current({
				service: "activity",
				action: "unsubscribe",
				channelId: e
			}), p(!1);
		};
	}, [i, x]), k(() => r((e) => {
		if (e.type !== "activity:event") return;
		let t = e.payload;
		t && l((e) => e.length > 0 && e[0].timestamp === t.timestamp && e[0].eventType === t.eventType ? e : [{
			eventType: t.eventType,
			timestamp: t.timestamp,
			detail: t.detail
		}, ...e].slice(0, ne));
	}), [r]), {
		items: c,
		loading: u,
		isLive: f,
		error: m,
		retry: S
	};
}
function se({ idToken: t, sendMessage: i, onMessage: a, connectionState: o, baseUrl: s, fetchActivity: u, onError: d }) {
	let { items: h, loading: _, isLive: v, error: y, retry: b } = oe({
		idToken: t,
		sendMessage: i,
		onMessage: a,
		connectionState: o,
		baseUrl: s,
		fetchActivity: u,
		onError: d
	});
	return /* @__PURE__ */ L(r, {
		padding: "md",
		children: [/* @__PURE__ */ L(c, {
			gap: "sm",
			align: "center",
			className: "mb-3",
			children: [/* @__PURE__ */ I("h2", {
				className: "text-xs font-semibold uppercase tracking-wide text-text-secondary m-0",
				children: "Activity"
			}), v && /* @__PURE__ */ I(g, {
				color: "var(--color-success)",
				size: "xs",
				title: "Live",
				"aria-label": "Live"
			})]
		}), _ ? /* @__PURE__ */ I(m, { label: "Loading..." }) : y && h.length === 0 ? /* @__PURE__ */ I(p, {
			title: "Couldn't load activity",
			body: y,
			action: /* @__PURE__ */ I(n, {
				variant: "secondary",
				size: "sm",
				onClick: b,
				children: "Retry"
			})
		}) : h.length === 0 ? /* @__PURE__ */ I(f, { title: "No activity yet" }) : /* @__PURE__ */ I(l, {
			gap: "none",
			children: h.map((t, n) => {
				let { icon: r, text: i } = re(t);
				return /* @__PURE__ */ L(c, {
					gap: "sm",
					align: "center",
					className: e("py-2", n < h.length - 1 && "border-b border-surface-hover"),
					children: [
						/* @__PURE__ */ I("span", {
							className: "w-6 shrink-0 text-center",
							children: r
						}),
						/* @__PURE__ */ I("span", {
							className: "flex-1 text-sm text-text-primary",
							children: i
						}),
						/* @__PURE__ */ I("span", {
							className: "text-xs text-text-tertiary shrink-0",
							children: ie(t.timestamp)
						})
					]
				}, n);
			})
		})]
	});
}
//#endregion
export { X as a, K as c, Z as i, q as l, ee as n, B as o, $ as r, J as s, se as t };
