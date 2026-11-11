import { d as e, n as t } from "./Button-DQoeE5dN.js";
import { r as n } from "./ToastProvider-BU9h6ZJU.js";
import { n as r, r as i } from "./safeHref-CSAycLWi.js";
import { n as a, t as o } from "./Stack-CE1FjEn8.js";
import { t as s } from "./Card-D4k-Buoz.js";
import { t as c } from "./IconButton-BgM9MvwA.js";
import { m as l, t as u } from "./Icons-CqVFbuiZ.js";
import { t as d } from "./Input-DiOEvL5h.js";
import { t as f } from "./InlinePopover-CEzf8hyR.js";
import { t as p } from "./EmptyState-DqWgLbIq.js";
import { n as m } from "./ThinkingDots-mwuPsKFX.js";
import { t as h } from "./LoadingState-BQlqtSB5.js";
import { a as g, c as _, d as v, i as y, l as b, n as x, o as S, r as C } from "./railType-OvWDaK-G.js";
import { n as w } from "./Avatar-CNZ7AQ8M.js";
import { t as T } from "./StatusDot-DAok6F5B.js";
import { i as E } from "./ChoiceList-DHsxqQ1Y.js";
import { createContext as D, useCallback as O, useContext as k, useEffect as A, useId as j, useLayoutEffect as M, useMemo as N, useRef as P, useState as F } from "react";
import { Fragment as I, jsx as L, jsxs as R } from "react/jsx-runtime";
//#region src/components/shared/SubNavLayout.tsx
function z(e) {
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
function B({ items: e, storageKey: t, title: n, renderNavItem: r, railLabel: i }) {
	let a = N(() => z(e), [e]), o = a.some((e) => e.name !== null);
	return /* @__PURE__ */ L("nav", {
		"aria-label": i,
		className: "flex-1 overflow-y-auto py-1",
		children: o ? a.map((e) => e.name === null ? /* @__PURE__ */ L(W, {
			items: e.items,
			renderNavItem: r
		}, "__ungrouped") : /* @__PURE__ */ L(G, {
			name: e.name,
			items: e.items,
			storageKey: `${t}.${n}.${e.name}`,
			renderNavItem: r
		}, e.name)) : /* @__PURE__ */ L(W, {
			items: e,
			renderNavItem: r
		})
	});
}
function V({ title: t, items: n, compactHeader: r = !1, railContent: i, contentPadding: a = "default", titleAction: o, railHeader: s, railWidth: c = 220, storageKey: l = "subnav", secondaryTitle: u, secondaryItems: d, secondaryStorageKey: f, secondaryRailWidth: p = 200, renderNavItem: m, railLabel: h, contentAs: g = "main", contentLabel: _, collapsed: v = !1, narrow: y = !1, children: b }) {
	let x = g, S = d && d.length > 0, C = y && !i, [w, T] = F(0), E = O((e) => e ? (T((e) => e + 1), () => T((e) => e - 1)) : () => {}, []), D = v && w > 0, k = /* @__PURE__ */ R("div", {
		className: e("flex h-full min-h-0", C && "@max-[40rem]:flex-col"),
		...C ? { "data-subnav-narrow": "" } : {},
		children: [
			C && /* @__PURE__ */ L("nav", {
				"aria-label": `${h ?? `${t} navigation`} (compact)`,
				className: e("flex shrink-0 overflow-x-auto overflow-y-hidden border-b border-[var(--color-border)] bg-[var(--color-surface)] px-2 @min-[40rem]:hidden", "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden", "[&>*]:shrink-0 [&_a]:whitespace-nowrap [&_a]:border-l-0 [&_a]:border-b-[3px] [&_button]:whitespace-nowrap [&_button]:border-l-0"),
				"data-subnav-strip": "",
				children: /* @__PURE__ */ L(W, {
					items: [...n, ...d ?? []],
					renderNavItem: m
				})
			}),
			/* @__PURE__ */ R("aside", {
				"aria-label": h ?? `${t} navigation`,
				className: e("flex-none border-r border-[var(--color-border)] bg-[var(--color-surface)] flex flex-col overflow-hidden", v && "w-11 min-w-11", C && "@max-[40rem]:hidden"),
				style: v ? void 0 : { width: c },
				"data-collapsed": v ? "true" : void 0,
				children: [
					/* @__PURE__ */ R("div", {
						className: e("flex flex-none items-center border-b border-[var(--color-border)]", v ? "justify-center px-0" : "justify-between px-4", D ? "h-9 py-0" : r ? "py-2.5" : "py-[14px]"),
						children: [!v && /* @__PURE__ */ L("span", {
							className: e("font-semibold text-[var(--color-text-tertiary)] uppercase tracking-[0.05em]", r ? "text-[11px]" : "text-[12px]"),
							children: t
						}), o]
					}),
					s && !v && /* @__PURE__ */ L("div", {
						className: "px-3 py-2 border-b border-[var(--color-border)]",
						children: s
					}),
					!v && (i ? /* @__PURE__ */ L("div", {
						className: "min-h-0 flex-1 overflow-auto",
						"data-subnav-explorer": !0,
						children: i
					}) : /* @__PURE__ */ L(B, {
						items: n,
						storageKey: l,
						title: t,
						renderNavItem: m,
						railLabel: h
					}))
				]
			}),
			S && /* @__PURE__ */ R("aside", {
				"aria-label": `${u ?? t} sections`,
				className: e("flex-none border-r border-[var(--color-border)] bg-[var(--color-surface)] flex flex-col overflow-hidden", C && "@max-[40rem]:hidden"),
				style: { width: p },
				children: [/* @__PURE__ */ L("div", {
					className: "flex items-center justify-between px-4 py-[14px] border-b border-[var(--color-border)]",
					children: /* @__PURE__ */ L("span", {
						className: "text-[12px] font-semibold text-[var(--color-text-tertiary)] uppercase tracking-[0.05em]",
						children: u ?? ""
					})
				}), /* @__PURE__ */ L(B, {
					items: d,
					storageKey: f ?? `${l}.secondary`,
					title: u ?? "secondary",
					renderNavItem: m
				})]
			}),
			/* @__PURE__ */ L(x, {
				"aria-label": _,
				"data-subnav-content": !0,
				className: e("flex-1 min-w-0 min-h-0 overflow-auto", a === "none" ? "p-0" : "p-[var(--ui-page-gutter,1.5rem)]"),
				children: /* @__PURE__ */ L(H.Provider, {
					value: E,
					children: b
				})
			})
		]
	});
	return C ? /* @__PURE__ */ L("div", {
		className: "@container flex h-full min-h-0 min-w-0 flex-col",
		"data-subnav-container": "",
		children: k
	}) : k;
}
var H = D(null);
function U(e) {
	let t = k(H);
	M(() => t ? t(e) : void 0, [t, e]);
}
function W({ items: e, renderNavItem: t }) {
	return /* @__PURE__ */ L(I, { children: e.map((e) => /* @__PURE__ */ L(K, {
		item: e,
		renderNavItem: t
	}, e.path)) });
}
function G({ name: t, items: n, storageKey: r, renderNavItem: i }) {
	let [a, o] = F(() => typeof window > "u" ? !1 : window.localStorage?.getItem(r) === "1");
	A(() => {
		typeof window > "u" || (a ? window.localStorage?.setItem(r, "1") : window.localStorage?.removeItem(r));
	}, [a, r]);
	let s = j(), c = P(null), l = P(null), u = () => {
		if (!a) {
			let e = typeof document > "u" ? null : document.activeElement;
			e && l.current?.contains(e) && c.current?.focus();
		}
		o((e) => !e);
	}, d = n.find((e) => e.groupScrollAfter)?.groupScrollAfter, f = d ? {
		maxHeight: d * 36,
		overflowY: "auto"
	} : void 0;
	return /* @__PURE__ */ R("section", {
		"data-ui-part": "",
		className: "border-b border-[var(--color-border)]",
		children: [/* @__PURE__ */ R("button", {
			"data-ui-part": "",
			type: "button",
			ref: c,
			onClick: u,
			className: e("flex items-center gap-1.5 w-full px-2 bg-transparent border-none cursor-pointer text-left hover:bg-surface-hover", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary", S, y, g),
			"aria-expanded": !a,
			"aria-controls": s,
			"data-testid": "subnav-group-header",
			children: [
				/* @__PURE__ */ L("span", {
					className: "grid h-5 w-5 shrink-0 place-items-center",
					"aria-hidden": "true",
					children: /* @__PURE__ */ L(v, { open: !a })
				}),
				/* @__PURE__ */ L("span", {
					className: "min-w-0 flex-1 truncate",
					children: t
				}),
				/* @__PURE__ */ L("span", {
					className: e("shrink-0 pr-1", C),
					"aria-label": `${n.length} items`,
					"data-testid": "subnav-group-count",
					children: n.length
				})
			]
		}), !a && /* @__PURE__ */ L("div", {
			id: s,
			ref: l,
			style: f,
			children: n.map((e) => /* @__PURE__ */ L(K, {
				item: e,
				renderNavItem: i
			}, e.path))
		})]
	});
}
function K({ item: t, renderNavItem: n }) {
	let i = t.accent === "danger" ? "var(--color-danger)" : t.accent === "warning" ? "var(--color-warning)" : t.accent === "success" ? "var(--color-success)" : void 0, a = /* @__PURE__ */ R(I, { children: [/* @__PURE__ */ R("div", {
		className: "flex min-w-0 items-center justify-between gap-2",
		children: [
			/* @__PURE__ */ L("span", {
				className: e("min-w-0 truncate", _),
				style: i ? { color: i } : void 0,
				"data-testid": "subnav-item-label",
				"data-ui-text": "rail-item",
				children: t.label
			}),
			t.activity && /* @__PURE__ */ L("span", {
				className: "ml-auto shrink-0 text-primary",
				role: "img",
				"aria-label": t.activity.label,
				title: t.activity.label,
				"data-testid": "subnav-item-activity",
				children: /* @__PURE__ */ L(u, { size: 13 })
			}),
			t.count !== void 0 && /* @__PURE__ */ L("span", {
				className: e("shrink-0", "text-[12px] font-medium leading-4 tabular-nums text-text-secondary"),
				"data-testid": "subnav-item-count",
				children: t.count
			})
		]
	}), t.hint && /* @__PURE__ */ L("div", {
		className: "text-[12px] leading-4 text-[var(--color-text-tertiary)] mt-0.5",
		children: t.hint
	})] });
	return t.onClick ? /* @__PURE__ */ L("button", {
		"data-ui-part": "",
		type: "button",
		onClick: t.onClick,
		className: e("block w-full px-[14px] border-l-[3px] border-transparent border-t-0 border-r-0 border-b-0 bg-transparent text-text-primary text-left cursor-pointer font-[inherit] hover:bg-surface-hover", b),
		children: a
	}) : n ? /* @__PURE__ */ L(I, { children: n(t, a, {
		display: "block",
		padding: "9px 14px",
		borderLeft: "3px solid transparent",
		color: "var(--color-text-primary)",
		textDecoration: "none",
		cursor: "pointer"
	}) }) : /* @__PURE__ */ L("a", {
		href: r(t.path) ?? void 0,
		className: J,
		children: a
	});
}
var q = {
	borderLeft: "3px solid var(--color-primary)",
	background: "color-mix(in srgb, var(--color-primary) 8%, transparent)",
	color: "var(--color-text-primary)"
}, J = `block px-[14px] ${b} border-l-[3px] border-transparent text-text-primary no-underline cursor-pointer hover:bg-surface-hover`, Y = `block px-[14px] ${b} border-l-[3px] border-primary ${x} text-text-primary no-underline cursor-pointer`, X = {
	sm: "w-[264px]",
	md: "w-[320px]",
	lg: "w-[380px]"
};
function Z({ open: n, anchor: r, placement: i = "bottom-start", title: a, subtitle: o, icon: s, submitLabel: c, submitSlot: l, submitTestId: u, submitDisabled: d = !1, busy: p = !1, error: m = null, onSubmit: h, onClose: g, width: _ = "md", children: v, "data-testid": y = "popover-form" }) {
	let b = P(null), x = P(null);
	if (A(() => {
		if (!n) return;
		let e = window.setTimeout(() => {
			x.current?.querySelector("input, textarea, select")?.focus();
		}, 0);
		return () => window.clearTimeout(e);
	}, [n]), !n) return null;
	let S = /* @__PURE__ */ R("form", {
		className: e("flex flex-col", X[_]),
		"data-testid": y,
		onSubmit: (e) => {
			e.preventDefault(), !d && !p && h();
		},
		children: [
			/* @__PURE__ */ R("div", {
				className: "flex items-center gap-2 border-b border-border px-3 py-2.5",
				children: [s && /* @__PURE__ */ L("span", {
					className: "flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-primary-bg text-primary-fg",
					"aria-hidden": "true",
					children: s
				}), /* @__PURE__ */ R("span", {
					className: "flex min-w-0 flex-col",
					children: [/* @__PURE__ */ L("span", {
						className: "truncate text-[13px] font-semibold leading-tight text-text-primary",
						"data-testid": `${y}-title`,
						children: a
					}), o && /* @__PURE__ */ L("span", {
						className: "truncate text-[11px] leading-tight text-text-tertiary",
						children: o
					})]
				})]
			}),
			/* @__PURE__ */ L("div", {
				ref: x,
				className: "flex flex-col gap-2.5 px-3 py-2.5",
				children: v
			}),
			/* @__PURE__ */ L("div", {
				className: e("min-h-[1.125rem] px-3", m && "pb-1"),
				"aria-live": "polite",
				children: m && /* @__PURE__ */ L("span", {
					className: "text-[11px] leading-tight text-danger-fg",
					role: "alert",
					"data-testid": `${y}-error`,
					children: m
				})
			}),
			/* @__PURE__ */ R("div", {
				className: "flex items-center justify-end gap-1.5 border-t border-border px-3 py-2",
				children: [/* @__PURE__ */ L(t, {
					type: "button",
					variant: "ghost",
					size: "sm",
					onClick: g,
					disabled: p,
					"data-testid": `${y}-cancel`,
					children: "Cancel"
				}), l === !1 ? null : l ?? /* @__PURE__ */ L(t, {
					type: "submit",
					variant: "primary",
					size: "sm",
					disabled: d || p,
					"data-testid": u ?? `${y}-submit`,
					children: p ? "Working…" : c
				})]
			})
		]
	});
	return r ? /* @__PURE__ */ L(f, {
		trigger: r ?? b,
		open: n,
		onClose: g,
		placement: i,
		offset: 6,
		className: "p-0",
		"data-testid": `${y}-popover`,
		children: S
	}) : /* @__PURE__ */ L("div", {
		className: "fixed inset-0 z-50 flex items-start justify-center bg-black/20 pt-24",
		onMouseDown: g,
		"data-testid": `${y}-backdrop`,
		children: /* @__PURE__ */ L("div", {
			className: "rounded-lg border border-border bg-surface shadow-lg",
			onMouseDown: (e) => e.stopPropagation(),
			children: S
		})
	});
}
function Q({ label: e, hint: t, children: n, "data-testid": r }) {
	return /* @__PURE__ */ R("label", {
		className: "flex flex-col gap-1",
		"data-testid": r,
		children: [
			/* @__PURE__ */ L("span", {
				className: "text-[11px] font-medium leading-none text-text-secondary",
				children: e
			}),
			n,
			t && /* @__PURE__ */ L("span", {
				className: "text-[11px] leading-tight text-text-tertiary",
				children: t
			})
		]
	});
}
//#endregion
//#region src/components/layout/WorkspaceRail.tsx
var $ = e("inline-flex items-center gap-1 rounded border-0 bg-transparent p-0 text-[13px] font-medium text-primary no-underline", "cursor-pointer hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary");
function ee({ title: t, label: n, actions: a, header: o, footer: s, children: u, width: d = "md", count: f, heading: p = "compact", countStyle: m = "chip", back: h, collapsed: g = !1, collapsedContent: _, onToggle: v, toggleLabel: y, toggleTestId: b, className: x, "data-testid": S = "workspace-rail" }) {
	let C = m === "plain" || p === "label", w = !!(t || a || v);
	U(w && p === "compact");
	let T = y ?? `${g ? "Show" : "Hide"} ${n ?? t ?? "the list"}`;
	return /* @__PURE__ */ R("nav", {
		"aria-label": n ?? t ?? "Workspace",
		"data-testid": S,
		"data-collapsed": g,
		className: e("flex h-full min-h-0 shrink-0 flex-col border-r border-border bg-surface-panel", g ? "w-9" : d === "xs" ? "w-[220px]" : d === "sm" ? "w-[240px]" : d === "ms" ? "w-[264px]" : d === "lg" ? "w-[368px]" : d === "ml" ? "w-[320px]" : "w-[300px]", x),
		children: [
			h && !g && /* @__PURE__ */ L("div", {
				className: e("flex shrink-0 items-center pt-4", p === "compact" ? "px-3" : "px-4"),
				"data-testid": `${S}-back-row`,
				children: h.href ? /* @__PURE__ */ R("a", {
					href: r(h.href) ?? void 0,
					onClick: h.onClick,
					className: $,
					"data-testid": `${S}-back`,
					children: [/* @__PURE__ */ L(l, {
						dir: "left",
						size: 14
					}), h.label]
				}) : /* @__PURE__ */ R("button", {
					"data-ui-part": "",
					type: "button",
					onClick: h.onClick,
					className: $,
					"data-testid": `${S}-back`,
					children: [/* @__PURE__ */ L(l, {
						dir: "left",
						size: 14
					}), h.label]
				})
			}),
			w && /* @__PURE__ */ R("div", {
				className: e("flex shrink-0 items-center gap-1", p === "compact" ? "h-9 border-b border-border" : "h-14", g ? "justify-center" : p === "compact" ? "pl-3 pr-2" : "pl-4 pr-3"),
				"data-testid": `${S}-header`,
				"data-rail-inset": p === "compact" ? 12 : 16,
				children: [
					!g && (t ? /* @__PURE__ */ R("h2", {
						className: e("m-0 flex min-w-0 flex-1 items-center gap-2 text-text-primary", p === "prominent" ? "text-[18px] font-semibold" : p === "label" ? e("text-[12px] font-semibold uppercase leading-4 tracking-wide", "text-text-secondary") : p === "caption" ? "text-[12px] font-semibold uppercase tracking-[0.06em]" : "text-[12px] font-semibold"),
						"data-testid": `${S}-title`,
						children: [
							/* @__PURE__ */ L("span", {
								className: "min-w-0 truncate",
								children: t
							}),
							typeof f == "number" && C && /* @__PURE__ */ L("span", {
								className: e("shrink-0", p === "label" ? "text-[12px] font-medium leading-4 normal-case tracking-normal tabular-nums text-text-tertiary" : "text-xs font-medium text-text-secondary"),
								"aria-label": `${f} items`,
								"data-testid": `${S}-count`,
								"data-count-style": "plain",
								children: f
							}),
							typeof f == "number" && !C && /* @__PURE__ */ L(i, {
								size: p === "prominent" ? "md" : p === "caption" ? "sm" : "xs",
								tone: "neutral",
								className: e("shrink-0", p === "caption" && "py-1"),
								"aria-label": `${f} items`,
								"data-testid": `${S}-count`,
								children: f
							})
						]
					}) : /* @__PURE__ */ L("span", { className: "flex-1" })),
					!g && a != null && /* @__PURE__ */ L("div", {
						className: "flex shrink-0 items-center gap-1",
						"data-testid": `${S}-actions`,
						children: a
					}),
					v && /* @__PURE__ */ L(c, {
						size: "sm",
						variant: "ghost",
						"aria-label": T,
						title: T,
						"aria-expanded": !g,
						onClick: v,
						icon: /* @__PURE__ */ L(l, {
							dir: g ? "right" : "left",
							size: 14
						}),
						"data-testid": b ?? `${S}-${g ? "unfold" : "fold"}`
					})
				]
			}),
			!g && o && /* @__PURE__ */ L("div", {
				className: e("shrink-0 py-3", p === "compact" ? "px-3" : "px-4 pt-0"),
				"data-rail-header-slot": "",
				children: o
			}),
			/* @__PURE__ */ L("div", {
				className: "min-h-0 flex-1 overflow-y-auto overflow-x-hidden",
				"data-testid": `${S}-scroll`,
				children: g ? _ : u
			}),
			!g && s && /* @__PURE__ */ L("div", {
				className: "shrink-0 border-t border-border px-3 py-2",
				children: s
			})
		]
	});
}
//#endregion
//#region src/components/hangout/InviteCandidateList.tsx
function te({ candidates: n, onInvite: r, loading: i = !1, resetKey: a, children: o, tone: s = "light", searchable: c = !1, grouped: l = !1, selectMode: u = "multi", onPick: f, confirmLabel: p = "Invite", confirmLoadingLabel: m = "Inviting…", confirmCountLabel: h, className: g, "data-testid": _ }) {
	let v = s === "dark", y = u === "single", [b, x] = F(() => /* @__PURE__ */ new Set()), [S, C] = F("");
	A(() => {
		x(/* @__PURE__ */ new Set()), C("");
	}, [a]);
	let T = N(() => n.filter((e) => !e.alreadyInCall), [n]);
	A(() => {
		x((e) => {
			if (e.size === 0) return e;
			let t = new Set(T.map((e) => e.userId)), n = !1, r = /* @__PURE__ */ new Set();
			for (let i of e) t.has(i) ? r.add(i) : n = !0;
			return n ? r : e;
		});
	}, [T]);
	let D = N(() => {
		let e = S.trim().toLowerCase();
		return !c || !e ? n : n.filter((t) => t.name.toLowerCase().includes(e) || t.userId.toLowerCase().includes(e));
	}, [
		n,
		c,
		S
	]), O = (e) => {
		x((t) => {
			let n = new Set(t);
			return n.has(e) ? n.delete(e) : n.add(e), n;
		});
	}, k = b.size, j = (t) => {
		let n = !!t.alreadyInCall || !!t.disabled || i, r = !y && b.has(t.userId);
		return /* @__PURE__ */ L("li", { children: /* @__PURE__ */ R("button", {
			"data-ui-part": "",
			type: "button",
			disabled: n,
			"aria-pressed": y ? void 0 : r,
			onClick: () => {
				y ? f?.(t.userId) : O(t.userId);
			},
			"data-testid": "invite-candidate",
			"data-user-id": t.userId,
			"data-selected": r ? "true" : "false",
			"data-already-in-call": t.alreadyInCall ? "true" : "false",
			"data-disabled": n ? "true" : "false",
			className: e("flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left", n ? "opacity-50 cursor-not-allowed" : e("cursor-pointer", v ? "hover:bg-white/10" : "hover:bg-surface-hover"), r && (v ? "bg-white/10" : "bg-surface-hover")),
			children: [
				/* @__PURE__ */ R("span", {
					className: "relative inline-flex shrink-0",
					children: [/* @__PURE__ */ L(w, {
						name: t.name,
						src: t.avatarUrl,
						color: t.color,
						size: 24
					}), t.online !== void 0 && /* @__PURE__ */ L(E, {
						state: t.online ? "online" : "offline",
						pulse: !1,
						size: "xs",
						className: e("absolute -bottom-0.5 -right-0.5 rounded-full ring-2", v ? "ring-call-chrome" : "ring-surface")
					})]
				}),
				/* @__PURE__ */ L("span", {
					className: e("flex-1 truncate text-[13px]", v ? "text-white" : "text-text-primary"),
					children: t.name
				}),
				t.online === !1 && t.lastSeenLabel && /* @__PURE__ */ L("span", {
					"data-testid": "invite-candidate-last-seen",
					className: e("shrink-0 text-[11px]", v ? "text-white/50" : "text-neutral"),
					children: t.lastSeenLabel
				}),
				t.statusLabel && !t.alreadyInCall && !t.pending && /* @__PURE__ */ L("span", {
					"data-testid": "invite-candidate-status",
					className: e("shrink-0 text-[11px]", v ? "text-white/50" : "text-neutral"),
					children: t.statusLabel
				}),
				t.alreadyInCall ? /* @__PURE__ */ L("span", {
					className: e("text-[11px]", v ? "text-white/50" : "text-neutral"),
					children: "In call"
				}) : t.pending ? /* @__PURE__ */ L("span", {
					className: e("text-[11px]", v ? "text-white/50" : "text-neutral"),
					children: "Ringing…"
				}) : y || t.disabled ? null : /* @__PURE__ */ L("span", {
					"aria-hidden": "true",
					className: e("grid h-4 w-4 place-items-center rounded border text-[10px]", r ? "border-transparent bg-primary text-on-primary" : e("text-transparent", v ? "border-white/30" : "border-border")),
					children: "✓"
				})
			]
		}) }, t.userId);
	}, M = (t, n) => /* @__PURE__ */ L("li", {
		"data-testid": `people-group-${n}`,
		"aria-hidden": "true",
		className: e("px-2 pb-0.5 pt-2 text-[11px] font-semibold uppercase tracking-wide first:pt-0", v ? "text-white/40" : "text-text-tertiary"),
		children: t
	}, `section-${n}`), P = l ? D.filter((e) => e.online === !0) : [], z = l ? D.filter((e) => e.online !== !0) : [], B = /* @__PURE__ */ R(I, { children: [c && /* @__PURE__ */ L(d, {
		type: "search",
		size: "sm",
		value: S,
		onChange: (e) => C(e.target.value),
		placeholder: "Search people",
		"aria-label": "Search people",
		"data-testid": "people-search",
		className: e("mb-1", v && "border-white/20 bg-white/10 text-white placeholder:text-white/40 focus:border-white/40 focus:bg-white/10 focus:ring-white/20")
	}), n.length === 0 ? /* @__PURE__ */ L("p", {
		className: e("m-0 text-[13px]", v ? "text-white/60" : "text-text-secondary"),
		"data-testid": "invite-to-call-empty",
		children: l ? "No one to show yet." : "Nobody else is online right now."
	}) : T.length === 0 ? /* @__PURE__ */ L("p", {
		className: e("m-0 text-[13px]", v ? "text-white/60" : "text-text-secondary"),
		"data-testid": "invite-to-call-everyone-here",
		children: "Everyone who's online is already on this call."
	}) : D.length === 0 ? /* @__PURE__ */ R("p", {
		className: e("m-0 text-[13px]", v ? "text-white/60" : "text-text-secondary"),
		"data-testid": "people-search-empty",
		children: [
			"No one matches “",
			S.trim(),
			"”."
		]
	}) : /* @__PURE__ */ L("ul", {
		className: "flex flex-col gap-1 m-0 p-0 list-none max-h-[min(55vh,480px)] overflow-y-auto overscroll-contain [scrollbar-width:thin] [scrollbar-gutter:stable]",
		"aria-label": "People you can invite",
		children: l ? /* @__PURE__ */ R(I, { children: [
			P.length > 0 && M("Online", "online"),
			P.map(j),
			z.length > 0 && M("Offline", "offline"),
			z.map(j)
		] }) : D.map(j)
	})] }), V = y ? null : /* @__PURE__ */ L(t, {
		variant: "primary",
		size: "md",
		onClick: () => {
			let e = [...b];
			x(/* @__PURE__ */ new Set()), r(e);
		},
		disabled: i || k === 0,
		"data-autofocus": !0,
		"data-testid": _ ? `${_}-confirm` : "invite-to-call-confirm",
		children: i ? m : k === 0 ? p : h ? h(k) : `${p} ${k} ${k === 1 ? "person" : "people"}`
	});
	return o ? /* @__PURE__ */ L(I, { children: o({
		list: B,
		confirm: V
	}) }) : /* @__PURE__ */ R("div", {
		className: e("flex flex-col gap-3", g),
		"data-testid": _,
		children: [B, V && /* @__PURE__ */ L("div", {
			className: "flex justify-end",
			children: V
		})]
	});
}
//#endregion
//#region src/components/social/ActivityPanel.tsx
function ne() {
	return "";
}
var re = 50;
function ie(e) {
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
function ae(e) {
	let t = Date.now() - new Date(e).getTime(), n = Math.floor(t / 1e3);
	return n < 60 ? "just now" : n < 3600 ? `${Math.floor(n / 60)}m ago` : e.slice(0, 10);
}
function oe(e) {
	if (!e) return null;
	try {
		return JSON.parse(atob(e.split(".")[1])).sub;
	} catch {
		return null;
	}
}
function se({ idToken: e, sendMessage: t, onMessage: r, connectionState: i, baseUrl: a, fetchActivity: o, onError: s }) {
	let [c, l] = F([]), [u, d] = F(!0), [f, p] = F(!1), [m, h] = F(null), [g, _] = F(0), v = P(t);
	A(() => {
		v.current = t;
	}, [t]);
	let { toast: y } = n(), b = P(s);
	A(() => {
		b.current = s;
	}, [s]);
	let x = oe(e), S = O(() => _((e) => e + 1), []);
	return A(() => {
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
		let t = a ?? ne();
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
	]), A(() => {
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
	}, [i, x]), A(() => r((e) => {
		if (e.type !== "activity:event") return;
		let t = e.payload;
		t && l((e) => e.length > 0 && e[0].timestamp === t.timestamp && e[0].eventType === t.eventType ? e : [{
			eventType: t.eventType,
			timestamp: t.timestamp,
			detail: t.detail
		}, ...e].slice(0, re));
	}), [r]), {
		items: c,
		loading: u,
		isLive: f,
		error: m,
		retry: S
	};
}
function ce({ idToken: n, sendMessage: r, onMessage: i, connectionState: c, baseUrl: l, fetchActivity: u, onError: d }) {
	let { items: f, loading: g, isLive: _, error: v, retry: y } = se({
		idToken: n,
		sendMessage: r,
		onMessage: i,
		connectionState: c,
		baseUrl: l,
		fetchActivity: u,
		onError: d
	});
	return /* @__PURE__ */ R(s, {
		padding: "md",
		children: [/* @__PURE__ */ R(o, {
			gap: "sm",
			align: "center",
			className: "mb-3",
			children: [/* @__PURE__ */ L("h2", {
				className: "text-xs font-semibold uppercase tracking-wide text-text-secondary m-0",
				children: "Activity"
			}), _ && /* @__PURE__ */ L(T, {
				color: "var(--color-success)",
				size: "xs",
				title: "Live",
				"aria-label": "Live"
			})]
		}), g ? /* @__PURE__ */ L(h, { label: "Loading..." }) : v && f.length === 0 ? /* @__PURE__ */ L(m, {
			title: "Couldn't load activity",
			body: v,
			action: /* @__PURE__ */ L(t, {
				variant: "secondary",
				size: "sm",
				onClick: y,
				children: "Retry"
			})
		}) : f.length === 0 ? /* @__PURE__ */ L(p, { title: "No activity yet" }) : /* @__PURE__ */ L(a, {
			gap: "none",
			children: f.map((t, n) => {
				let { icon: r, text: i } = ie(t);
				return /* @__PURE__ */ R(o, {
					gap: "sm",
					align: "center",
					className: e("py-2", n < f.length - 1 && "border-b border-surface-hover"),
					children: [
						/* @__PURE__ */ L("span", {
							className: "w-6 shrink-0 text-center",
							children: r
						}),
						/* @__PURE__ */ L("span", {
							className: "flex-1 text-sm text-text-primary",
							children: i
						}),
						/* @__PURE__ */ L("span", {
							className: "text-xs text-text-tertiary shrink-0",
							children: ae(t.timestamp)
						})
					]
				}, n);
			})
		})]
	});
}
//#endregion
export { Q as a, Y as c, ee as i, q as l, te as n, Z as o, $ as r, V as s, ce as t, J as u };
