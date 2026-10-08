import { t as e } from "./cn-D4QmbyEy.js";
import { n as t } from "./Button-C2OEUpX-.js";
import { n } from "./DropdownMenu-M27Ly7by.js";
import { a as r, c as i, d as a, i as o, l as s, n as c, o as l, r as u } from "./railType-DaEA_kg6.js";
import { createContext as d, useCallback as f, useContext as p, useEffect as m, useId as h, useLayoutEffect as g, useMemo as _, useRef as v, useState as y } from "react";
import { Fragment as b, jsx as x, jsxs as S } from "react/jsx-runtime";
//#region src/components/shared/SubNavLayout.tsx
function C(e) {
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
function w({ items: e, storageKey: t, title: n, renderNavItem: r, railLabel: i }) {
	let a = _(() => C(e), [e]), o = a.some((e) => e.name !== null);
	return /* @__PURE__ */ x("nav", {
		"aria-label": i,
		className: "flex-1 overflow-y-auto py-1",
		children: o ? a.map((e) => e.name === null ? /* @__PURE__ */ x(O, {
			items: e.items,
			renderNavItem: r
		}, "__ungrouped") : /* @__PURE__ */ x(k, {
			name: e.name,
			items: e.items,
			storageKey: `${t}.${n}.${e.name}`,
			renderNavItem: r
		}, e.name)) : /* @__PURE__ */ x(O, {
			items: e,
			renderNavItem: r
		})
	});
}
function T({ title: t, items: n, titleAction: r, railHeader: i, railWidth: a = 220, storageKey: o = "subnav", secondaryTitle: s, secondaryItems: c, secondaryStorageKey: l, secondaryRailWidth: u = 200, renderNavItem: d, railLabel: p, contentAs: m = "main", contentLabel: h, collapsed: g = !1, children: _ }) {
	let v = m, b = c && c.length > 0, [C, T] = y(0), D = f((e) => e ? (T((e) => e + 1), () => T((e) => e - 1)) : () => {}, []), O = g && C > 0;
	return /* @__PURE__ */ S("div", {
		className: "flex h-full min-h-0",
		children: [
			/* @__PURE__ */ S("aside", {
				className: e("flex-none border-r border-[var(--color-border)] bg-[var(--color-surface)] flex flex-col overflow-hidden", g && "w-11 min-w-11"),
				style: g ? void 0 : { width: a },
				"data-collapsed": g ? "true" : void 0,
				children: [
					/* @__PURE__ */ S("div", {
						className: e("flex items-center border-b border-[var(--color-border)]", g ? "justify-center px-0" : "justify-between px-4", O ? "h-9 py-0" : "py-[14px]"),
						children: [!g && /* @__PURE__ */ x("span", {
							className: "text-[11px] font-semibold text-[var(--color-text-tertiary)] uppercase tracking-[0.05em]",
							children: t
						}), r]
					}),
					i && !g && /* @__PURE__ */ x("div", {
						className: "px-3 py-2 border-b border-[var(--color-border)]",
						children: i
					}),
					!g && /* @__PURE__ */ x(w, {
						items: n,
						storageKey: o,
						title: t,
						renderNavItem: d,
						railLabel: p
					})
				]
			}),
			b && /* @__PURE__ */ S("aside", {
				className: "flex-none border-r border-[var(--color-border)] bg-[var(--color-surface)] flex flex-col overflow-hidden",
				style: { width: u },
				children: [/* @__PURE__ */ x("div", {
					className: "flex items-center justify-between px-4 py-[14px] border-b border-[var(--color-border)]",
					children: /* @__PURE__ */ x("span", {
						className: "text-[11px] font-semibold text-[var(--color-text-tertiary)] uppercase tracking-[0.05em]",
						children: s ?? ""
					})
				}), /* @__PURE__ */ x(w, {
					items: c,
					storageKey: l ?? `${o}.secondary`,
					title: s ?? "secondary",
					renderNavItem: d
				})]
			}),
			/* @__PURE__ */ x(v, {
				"aria-label": h,
				className: "flex-1 min-w-0 overflow-auto p-6",
				children: /* @__PURE__ */ x(E.Provider, {
					value: D,
					children: _
				})
			})
		]
	});
}
var E = d(null);
function D(e) {
	let t = p(E);
	g(() => t ? t(e) : void 0, [t, e]);
}
function O({ items: e, renderNavItem: t }) {
	return /* @__PURE__ */ x(b, { children: e.map((e) => /* @__PURE__ */ x(A, {
		item: e,
		renderNavItem: t
	}, e.path)) });
}
function k({ name: t, items: n, storageKey: i, renderNavItem: s }) {
	let [c, d] = y(() => typeof window > "u" ? !1 : window.localStorage?.getItem(i) === "1");
	m(() => {
		typeof window > "u" || (c ? window.localStorage?.setItem(i, "1") : window.localStorage?.removeItem(i));
	}, [c, i]);
	let f = h(), p = v(null), g = v(null), _ = () => {
		if (!c) {
			let e = typeof document > "u" ? null : document.activeElement;
			e && g.current?.contains(e) && p.current?.focus();
		}
		d((e) => !e);
	}, b = n.find((e) => e.groupScrollAfter)?.groupScrollAfter, C = b ? {
		maxHeight: b * 36,
		overflowY: "auto"
	} : void 0;
	return /* @__PURE__ */ S("section", {
		className: "border-b border-[var(--color-border)]",
		children: [/* @__PURE__ */ S("button", {
			type: "button",
			ref: p,
			onClick: _,
			className: e("flex items-center gap-1.5 w-full px-2 bg-transparent border-none cursor-pointer text-left hover:bg-surface-hover", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary", l, o, r),
			"aria-expanded": !c,
			"aria-controls": f,
			"data-testid": "subnav-group-header",
			children: [
				/* @__PURE__ */ x("span", {
					className: "grid h-5 w-5 shrink-0 place-items-center",
					"aria-hidden": "true",
					children: /* @__PURE__ */ x(a, { open: !c })
				}),
				/* @__PURE__ */ x("span", {
					className: "min-w-0 flex-1 truncate",
					children: t
				}),
				/* @__PURE__ */ x("span", {
					className: e("shrink-0 pr-1", u),
					"aria-label": `${n.length} items`,
					"data-testid": "subnav-group-count",
					children: n.length
				})
			]
		}), !c && /* @__PURE__ */ x("div", {
			id: f,
			ref: g,
			style: C,
			children: n.map((e) => /* @__PURE__ */ x(A, {
				item: e,
				renderNavItem: s
			}, e.path))
		})]
	});
}
function A({ item: t, renderNavItem: n }) {
	let r = t.accent === "danger" ? "var(--color-danger)" : t.accent === "warning" ? "var(--color-warning)" : t.accent === "success" ? "var(--color-success)" : void 0, a = /* @__PURE__ */ S(b, { children: [/* @__PURE__ */ S("div", {
		className: "flex min-w-0 items-center justify-between gap-2",
		children: [/* @__PURE__ */ x("span", {
			className: e("min-w-0 truncate", i),
			style: r ? { color: r } : void 0,
			"data-testid": "subnav-item-label",
			children: t.label
		}), t.count !== void 0 && /* @__PURE__ */ x("span", {
			className: e("shrink-0", "text-[12px] font-medium leading-4 tabular-nums text-text-tertiary"),
			"data-testid": "subnav-item-count",
			children: t.count
		})]
	}), t.hint && /* @__PURE__ */ x("div", {
		className: "text-[12px] leading-4 text-[var(--color-text-tertiary)] mt-0.5",
		children: t.hint
	})] });
	return t.onClick ? /* @__PURE__ */ x("button", {
		type: "button",
		onClick: t.onClick,
		className: e("block w-full px-[14px] border-l-[3px] border-transparent border-t-0 border-r-0 border-b-0 bg-transparent text-text-primary text-left cursor-pointer font-[inherit] hover:bg-surface-hover", s),
		children: a
	}) : n ? /* @__PURE__ */ x(b, { children: n(t, a, {
		display: "block",
		padding: "9px 14px",
		borderLeft: "3px solid transparent",
		color: "var(--color-text-primary)",
		textDecoration: "none",
		cursor: "pointer"
	}) }) : /* @__PURE__ */ x("a", {
		href: t.path,
		className: M,
		children: a
	});
}
var j = {
	borderLeft: "3px solid var(--color-primary)",
	background: "color-mix(in srgb, var(--color-primary) 8%, transparent)",
	color: "var(--color-text-primary)"
}, M = `block px-[14px] ${s} border-l-[3px] border-transparent text-text-primary no-underline cursor-pointer hover:bg-surface-hover`, N = `block px-[14px] ${s} border-l-[3px] border-primary ${c} text-text-primary no-underline cursor-pointer`, P = {
	sm: "w-[264px]",
	md: "w-[320px]",
	lg: "w-[380px]"
};
function F({ open: r, anchor: i, placement: a = "bottom-start", title: o, subtitle: s, icon: c, submitLabel: l, submitSlot: u, submitTestId: d, submitDisabled: f = !1, busy: p = !1, error: h = null, onSubmit: g, onClose: _, width: y = "md", children: b, "data-testid": C = "popover-form" }) {
	let w = v(null), T = v(null);
	if (m(() => {
		if (!r) return;
		let e = window.setTimeout(() => {
			T.current?.querySelector("input, textarea, select")?.focus();
		}, 0);
		return () => window.clearTimeout(e);
	}, [r]), !r) return null;
	let E = /* @__PURE__ */ S("form", {
		className: e("flex flex-col", P[y]),
		"data-testid": C,
		onSubmit: (e) => {
			e.preventDefault(), !f && !p && g();
		},
		children: [
			/* @__PURE__ */ S("div", {
				className: "flex items-center gap-2 border-b border-border px-3 py-2.5",
				children: [c && /* @__PURE__ */ x("span", {
					className: "flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-primary-bg text-primary-fg",
					"aria-hidden": "true",
					children: c
				}), /* @__PURE__ */ S("span", {
					className: "flex min-w-0 flex-col",
					children: [/* @__PURE__ */ x("span", {
						className: "truncate text-[13px] font-semibold leading-tight text-text-primary",
						"data-testid": `${C}-title`,
						children: o
					}), s && /* @__PURE__ */ x("span", {
						className: "truncate text-[11px] leading-tight text-text-tertiary",
						children: s
					})]
				})]
			}),
			/* @__PURE__ */ x("div", {
				ref: T,
				className: "flex flex-col gap-2.5 px-3 py-2.5",
				children: b
			}),
			/* @__PURE__ */ x("div", {
				className: e("min-h-[1.125rem] px-3", h && "pb-1"),
				"aria-live": "polite",
				children: h && /* @__PURE__ */ x("span", {
					className: "text-[11px] leading-tight text-danger-fg",
					role: "alert",
					"data-testid": `${C}-error`,
					children: h
				})
			}),
			/* @__PURE__ */ S("div", {
				className: "flex items-center justify-end gap-1.5 border-t border-border px-3 py-2",
				children: [/* @__PURE__ */ x(t, {
					type: "button",
					variant: "ghost",
					size: "sm",
					onClick: _,
					disabled: p,
					"data-testid": `${C}-cancel`,
					children: "Cancel"
				}), u === !1 ? null : u ?? /* @__PURE__ */ x(t, {
					type: "submit",
					variant: "primary",
					size: "sm",
					disabled: f || p,
					"data-testid": d ?? `${C}-submit`,
					children: p ? "Working…" : l
				})]
			})
		]
	});
	return i ? /* @__PURE__ */ x(n, {
		trigger: i ?? w,
		open: r,
		onClose: _,
		placement: a,
		offset: 6,
		className: "p-0",
		"data-testid": `${C}-popover`,
		children: E
	}) : /* @__PURE__ */ x("div", {
		className: "fixed inset-0 z-50 flex items-start justify-center bg-black/20 pt-24",
		onMouseDown: _,
		"data-testid": `${C}-backdrop`,
		children: /* @__PURE__ */ x("div", {
			className: "rounded-lg border border-border bg-surface shadow-lg",
			onMouseDown: (e) => e.stopPropagation(),
			children: E
		})
	});
}
function I({ label: e, hint: t, children: n, "data-testid": r }) {
	return /* @__PURE__ */ S("label", {
		className: "flex flex-col gap-1",
		"data-testid": r,
		children: [
			/* @__PURE__ */ x("span", {
				className: "text-[11px] font-medium leading-none text-text-secondary",
				children: e
			}),
			n,
			t && /* @__PURE__ */ x("span", {
				className: "text-[11px] leading-tight text-text-tertiary",
				children: t
			})
		]
	});
}
//#endregion
export { j as a, N as i, F as n, M as o, T as r, D as s, I as t };
