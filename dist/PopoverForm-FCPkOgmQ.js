import { t as e } from "./cn-D4QmbyEy.js";
import { n as t } from "./Button-DZuk8L0q.js";
import { t as n } from "./Icons-B_xESAH3.js";
import { t as r } from "./InlinePopover-MVLSEiUg.js";
import { a as i, c as a, d as o, i as s, l as c, n as l, o as u, r as d } from "./railType-DaEA_kg6.js";
import { createContext as f, useCallback as p, useContext as m, useEffect as h, useId as g, useLayoutEffect as _, useMemo as v, useRef as y, useState as b } from "react";
import { Fragment as x, jsx as S, jsxs as C } from "react/jsx-runtime";
//#region src/components/shared/SubNavLayout.tsx
function w(e) {
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
function T({ items: e, storageKey: t, title: n, renderNavItem: r, railLabel: i }) {
	let a = v(() => w(e), [e]), o = a.some((e) => e.name !== null);
	return /* @__PURE__ */ S("nav", {
		"aria-label": i,
		className: "flex-1 overflow-y-auto py-1",
		children: o ? a.map((e) => e.name === null ? /* @__PURE__ */ S(k, {
			items: e.items,
			renderNavItem: r
		}, "__ungrouped") : /* @__PURE__ */ S(A, {
			name: e.name,
			items: e.items,
			storageKey: `${t}.${n}.${e.name}`,
			renderNavItem: r
		}, e.name)) : /* @__PURE__ */ S(k, {
			items: e,
			renderNavItem: r
		})
	});
}
function E({ title: t, items: n, titleAction: r, railHeader: i, railWidth: a = 220, storageKey: o = "subnav", secondaryTitle: s, secondaryItems: c, secondaryStorageKey: l, secondaryRailWidth: u = 200, renderNavItem: d, railLabel: f, contentAs: m = "main", contentLabel: h, collapsed: g = !1, children: _ }) {
	let v = m, y = c && c.length > 0, [x, w] = b(0), E = p((e) => e ? (w((e) => e + 1), () => w((e) => e - 1)) : () => {}, []), O = g && x > 0;
	return /* @__PURE__ */ C("div", {
		className: "flex h-full min-h-0",
		children: [
			/* @__PURE__ */ C("aside", {
				className: e("flex-none border-r border-[var(--color-border)] bg-[var(--color-surface)] flex flex-col overflow-hidden", g && "w-11 min-w-11"),
				style: g ? void 0 : { width: a },
				"data-collapsed": g ? "true" : void 0,
				children: [
					/* @__PURE__ */ C("div", {
						className: e("flex items-center border-b border-[var(--color-border)]", g ? "justify-center px-0" : "justify-between px-4", O ? "h-9 py-0" : "py-[14px]"),
						children: [!g && /* @__PURE__ */ S("span", {
							className: "text-[11px] font-semibold text-[var(--color-text-tertiary)] uppercase tracking-[0.05em]",
							children: t
						}), r]
					}),
					i && !g && /* @__PURE__ */ S("div", {
						className: "px-3 py-2 border-b border-[var(--color-border)]",
						children: i
					}),
					!g && /* @__PURE__ */ S(T, {
						items: n,
						storageKey: o,
						title: t,
						renderNavItem: d,
						railLabel: f
					})
				]
			}),
			y && /* @__PURE__ */ C("aside", {
				className: "flex-none border-r border-[var(--color-border)] bg-[var(--color-surface)] flex flex-col overflow-hidden",
				style: { width: u },
				children: [/* @__PURE__ */ S("div", {
					className: "flex items-center justify-between px-4 py-[14px] border-b border-[var(--color-border)]",
					children: /* @__PURE__ */ S("span", {
						className: "text-[11px] font-semibold text-[var(--color-text-tertiary)] uppercase tracking-[0.05em]",
						children: s ?? ""
					})
				}), /* @__PURE__ */ S(T, {
					items: c,
					storageKey: l ?? `${o}.secondary`,
					title: s ?? "secondary",
					renderNavItem: d
				})]
			}),
			/* @__PURE__ */ S(v, {
				"aria-label": h,
				"data-subnav-content": !0,
				className: "flex-1 min-w-0 overflow-auto p-[var(--ui-page-gutter,1.5rem)]",
				children: /* @__PURE__ */ S(D.Provider, {
					value: E,
					children: _
				})
			})
		]
	});
}
var D = f(null);
function O(e) {
	let t = m(D);
	_(() => t ? t(e) : void 0, [t, e]);
}
function k({ items: e, renderNavItem: t }) {
	return /* @__PURE__ */ S(x, { children: e.map((e) => /* @__PURE__ */ S(j, {
		item: e,
		renderNavItem: t
	}, e.path)) });
}
function A({ name: t, items: n, storageKey: r, renderNavItem: a }) {
	let [c, l] = b(() => typeof window > "u" ? !1 : window.localStorage?.getItem(r) === "1");
	h(() => {
		typeof window > "u" || (c ? window.localStorage?.setItem(r, "1") : window.localStorage?.removeItem(r));
	}, [c, r]);
	let f = g(), p = y(null), m = y(null), _ = () => {
		if (!c) {
			let e = typeof document > "u" ? null : document.activeElement;
			e && m.current?.contains(e) && p.current?.focus();
		}
		l((e) => !e);
	}, v = n.find((e) => e.groupScrollAfter)?.groupScrollAfter, x = v ? {
		maxHeight: v * 36,
		overflowY: "auto"
	} : void 0;
	return /* @__PURE__ */ C("section", {
		className: "border-b border-[var(--color-border)]",
		children: [/* @__PURE__ */ C("button", {
			type: "button",
			ref: p,
			onClick: _,
			className: e("flex items-center gap-1.5 w-full px-2 bg-transparent border-none cursor-pointer text-left hover:bg-surface-hover", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary", u, s, i),
			"aria-expanded": !c,
			"aria-controls": f,
			"data-testid": "subnav-group-header",
			children: [
				/* @__PURE__ */ S("span", {
					className: "grid h-5 w-5 shrink-0 place-items-center",
					"aria-hidden": "true",
					children: /* @__PURE__ */ S(o, { open: !c })
				}),
				/* @__PURE__ */ S("span", {
					className: "min-w-0 flex-1 truncate",
					children: t
				}),
				/* @__PURE__ */ S("span", {
					className: e("shrink-0 pr-1", d),
					"aria-label": `${n.length} items`,
					"data-testid": "subnav-group-count",
					children: n.length
				})
			]
		}), !c && /* @__PURE__ */ S("div", {
			id: f,
			ref: m,
			style: x,
			children: n.map((e) => /* @__PURE__ */ S(j, {
				item: e,
				renderNavItem: a
			}, e.path))
		})]
	});
}
function j({ item: t, renderNavItem: r }) {
	let i = t.accent === "danger" ? "var(--color-danger)" : t.accent === "warning" ? "var(--color-warning)" : t.accent === "success" ? "var(--color-success)" : void 0, o = /* @__PURE__ */ C(x, { children: [/* @__PURE__ */ C("div", {
		className: "flex min-w-0 items-center justify-between gap-2",
		children: [
			/* @__PURE__ */ S("span", {
				className: e("min-w-0 truncate", a),
				style: i ? { color: i } : void 0,
				"data-testid": "subnav-item-label",
				children: t.label
			}),
			t.activity && /* @__PURE__ */ S("span", {
				className: "ml-auto shrink-0 text-primary",
				role: "img",
				"aria-label": t.activity.label,
				title: t.activity.label,
				"data-testid": "subnav-item-activity",
				children: /* @__PURE__ */ S(n, { size: 13 })
			}),
			t.count !== void 0 && /* @__PURE__ */ S("span", {
				className: e("shrink-0", "text-[12px] font-medium leading-4 tabular-nums text-text-tertiary"),
				"data-testid": "subnav-item-count",
				children: t.count
			})
		]
	}), t.hint && /* @__PURE__ */ S("div", {
		className: "text-[12px] leading-4 text-[var(--color-text-tertiary)] mt-0.5",
		children: t.hint
	})] });
	return t.onClick ? /* @__PURE__ */ S("button", {
		type: "button",
		onClick: t.onClick,
		className: e("block w-full px-[14px] border-l-[3px] border-transparent border-t-0 border-r-0 border-b-0 bg-transparent text-text-primary text-left cursor-pointer font-[inherit] hover:bg-surface-hover", c),
		children: o
	}) : r ? /* @__PURE__ */ S(x, { children: r(t, o, {
		display: "block",
		padding: "9px 14px",
		borderLeft: "3px solid transparent",
		color: "var(--color-text-primary)",
		textDecoration: "none",
		cursor: "pointer"
	}) }) : /* @__PURE__ */ S("a", {
		href: t.path,
		className: N,
		children: o
	});
}
var M = {
	borderLeft: "3px solid var(--color-primary)",
	background: "color-mix(in srgb, var(--color-primary) 8%, transparent)",
	color: "var(--color-text-primary)"
}, N = `block px-[14px] ${c} border-l-[3px] border-transparent text-text-primary no-underline cursor-pointer hover:bg-surface-hover`, P = `block px-[14px] ${c} border-l-[3px] border-primary ${l} text-text-primary no-underline cursor-pointer`, F = {
	sm: "w-[264px]",
	md: "w-[320px]",
	lg: "w-[380px]"
};
function I({ open: n, anchor: i, placement: a = "bottom-start", title: o, subtitle: s, icon: c, submitLabel: l, submitSlot: u, submitTestId: d, submitDisabled: f = !1, busy: p = !1, error: m = null, onSubmit: g, onClose: _, width: v = "md", children: b, "data-testid": x = "popover-form" }) {
	let w = y(null), T = y(null);
	if (h(() => {
		if (!n) return;
		let e = window.setTimeout(() => {
			T.current?.querySelector("input, textarea, select")?.focus();
		}, 0);
		return () => window.clearTimeout(e);
	}, [n]), !n) return null;
	let E = /* @__PURE__ */ C("form", {
		className: e("flex flex-col", F[v]),
		"data-testid": x,
		onSubmit: (e) => {
			e.preventDefault(), !f && !p && g();
		},
		children: [
			/* @__PURE__ */ C("div", {
				className: "flex items-center gap-2 border-b border-border px-3 py-2.5",
				children: [c && /* @__PURE__ */ S("span", {
					className: "flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-primary-bg text-primary-fg",
					"aria-hidden": "true",
					children: c
				}), /* @__PURE__ */ C("span", {
					className: "flex min-w-0 flex-col",
					children: [/* @__PURE__ */ S("span", {
						className: "truncate text-[13px] font-semibold leading-tight text-text-primary",
						"data-testid": `${x}-title`,
						children: o
					}), s && /* @__PURE__ */ S("span", {
						className: "truncate text-[11px] leading-tight text-text-tertiary",
						children: s
					})]
				})]
			}),
			/* @__PURE__ */ S("div", {
				ref: T,
				className: "flex flex-col gap-2.5 px-3 py-2.5",
				children: b
			}),
			/* @__PURE__ */ S("div", {
				className: e("min-h-[1.125rem] px-3", m && "pb-1"),
				"aria-live": "polite",
				children: m && /* @__PURE__ */ S("span", {
					className: "text-[11px] leading-tight text-danger-fg",
					role: "alert",
					"data-testid": `${x}-error`,
					children: m
				})
			}),
			/* @__PURE__ */ C("div", {
				className: "flex items-center justify-end gap-1.5 border-t border-border px-3 py-2",
				children: [/* @__PURE__ */ S(t, {
					type: "button",
					variant: "ghost",
					size: "sm",
					onClick: _,
					disabled: p,
					"data-testid": `${x}-cancel`,
					children: "Cancel"
				}), u === !1 ? null : u ?? /* @__PURE__ */ S(t, {
					type: "submit",
					variant: "primary",
					size: "sm",
					disabled: f || p,
					"data-testid": d ?? `${x}-submit`,
					children: p ? "Working…" : l
				})]
			})
		]
	});
	return i ? /* @__PURE__ */ S(r, {
		trigger: i ?? w,
		open: n,
		onClose: _,
		placement: a,
		offset: 6,
		className: "p-0",
		"data-testid": `${x}-popover`,
		children: E
	}) : /* @__PURE__ */ S("div", {
		className: "fixed inset-0 z-50 flex items-start justify-center bg-black/20 pt-24",
		onMouseDown: _,
		"data-testid": `${x}-backdrop`,
		children: /* @__PURE__ */ S("div", {
			className: "rounded-lg border border-border bg-surface shadow-lg",
			onMouseDown: (e) => e.stopPropagation(),
			children: E
		})
	});
}
function L({ label: e, hint: t, children: n, "data-testid": r }) {
	return /* @__PURE__ */ C("label", {
		className: "flex flex-col gap-1",
		"data-testid": r,
		children: [
			/* @__PURE__ */ S("span", {
				className: "text-[11px] font-medium leading-none text-text-secondary",
				children: e
			}),
			n,
			t && /* @__PURE__ */ S("span", {
				className: "text-[11px] leading-tight text-text-tertiary",
				children: t
			})
		]
	});
}
//#endregion
export { M as a, P as i, I as n, N as o, E as r, O as s, L as t };
