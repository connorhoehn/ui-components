import { t as e } from "./cn-D4QmbyEy.js";
import { n as t } from "./Button-C-I3BxWI.js";
import { n } from "./overlayStack-DxIDMUs-.js";
import { t as r } from "./IconButton-Bf5Wy0tS.js";
import { m as i, t as a } from "./Icons-CqVFbuiZ.js";
import { t as o } from "./InlinePopover-Dx8-r-XU.js";
import { a as s, c, d as l, i as u, l as d, n as f, o as p, r as m } from "./railType-AsIPWdQ5.js";
import { createContext as h, useCallback as g, useContext as _, useEffect as v, useId as y, useLayoutEffect as b, useMemo as x, useRef as S, useState as C } from "react";
import { Fragment as w, jsx as T, jsxs as E } from "react/jsx-runtime";
//#region src/components/shared/SubNavLayout.tsx
function D(e) {
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
function O({ items: e, storageKey: t, title: n, renderNavItem: r, railLabel: i }) {
	let a = x(() => D(e), [e]), o = a.some((e) => e.name !== null);
	return /* @__PURE__ */ T("nav", {
		"aria-label": i,
		className: "flex-1 overflow-y-auto py-1",
		children: o ? a.map((e) => e.name === null ? /* @__PURE__ */ T(M, {
			items: e.items,
			renderNavItem: r
		}, "__ungrouped") : /* @__PURE__ */ T(N, {
			name: e.name,
			items: e.items,
			storageKey: `${t}.${n}.${e.name}`,
			renderNavItem: r
		}, e.name)) : /* @__PURE__ */ T(M, {
			items: e,
			renderNavItem: r
		})
	});
}
function k({ title: t, items: n, compactHeader: r = !1, railContent: i, contentPadding: a = "default", titleAction: o, railHeader: s, railWidth: c = 220, storageKey: l = "subnav", secondaryTitle: u, secondaryItems: d, secondaryStorageKey: f, secondaryRailWidth: p = 200, renderNavItem: m, railLabel: h, contentAs: _ = "main", contentLabel: v, collapsed: y = !1, children: b }) {
	let x = _, S = d && d.length > 0, [w, D] = C(0), k = g((e) => e ? (D((e) => e + 1), () => D((e) => e - 1)) : () => {}, []), j = y && w > 0;
	return /* @__PURE__ */ E("div", {
		className: "flex h-full min-h-0",
		children: [
			/* @__PURE__ */ E("aside", {
				"aria-label": h ?? `${t} navigation`,
				className: e("flex-none border-r border-[var(--color-border)] bg-[var(--color-surface)] flex flex-col overflow-hidden", y && "w-11 min-w-11"),
				style: y ? void 0 : { width: c },
				"data-collapsed": y ? "true" : void 0,
				children: [
					/* @__PURE__ */ E("div", {
						className: e("flex flex-none items-center border-b border-[var(--color-border)]", y ? "justify-center px-0" : "justify-between px-4", j ? "h-9 py-0" : r ? "py-2.5" : "py-[14px]"),
						children: [!y && /* @__PURE__ */ T("span", {
							className: e("font-semibold text-[var(--color-text-tertiary)] uppercase tracking-[0.05em]", r ? "text-[11px]" : "text-[12px]"),
							children: t
						}), o]
					}),
					s && !y && /* @__PURE__ */ T("div", {
						className: "px-3 py-2 border-b border-[var(--color-border)]",
						children: s
					}),
					!y && (i ? /* @__PURE__ */ T("div", {
						className: "min-h-0 flex-1 overflow-auto",
						"data-subnav-explorer": !0,
						children: i
					}) : /* @__PURE__ */ T(O, {
						items: n,
						storageKey: l,
						title: t,
						renderNavItem: m,
						railLabel: h
					}))
				]
			}),
			S && /* @__PURE__ */ E("aside", {
				"aria-label": `${u ?? t} sections`,
				className: "flex-none border-r border-[var(--color-border)] bg-[var(--color-surface)] flex flex-col overflow-hidden",
				style: { width: p },
				children: [/* @__PURE__ */ T("div", {
					className: "flex items-center justify-between px-4 py-[14px] border-b border-[var(--color-border)]",
					children: /* @__PURE__ */ T("span", {
						className: "text-[12px] font-semibold text-[var(--color-text-tertiary)] uppercase tracking-[0.05em]",
						children: u ?? ""
					})
				}), /* @__PURE__ */ T(O, {
					items: d,
					storageKey: f ?? `${l}.secondary`,
					title: u ?? "secondary",
					renderNavItem: m
				})]
			}),
			/* @__PURE__ */ T(x, {
				"aria-label": v,
				"data-subnav-content": !0,
				className: e("flex-1 min-w-0 min-h-0 overflow-auto", a === "none" ? "p-0" : "p-[var(--ui-page-gutter,1.5rem)]"),
				children: /* @__PURE__ */ T(A.Provider, {
					value: k,
					children: b
				})
			})
		]
	});
}
var A = h(null);
function j(e) {
	let t = _(A);
	b(() => t ? t(e) : void 0, [t, e]);
}
function M({ items: e, renderNavItem: t }) {
	return /* @__PURE__ */ T(w, { children: e.map((e) => /* @__PURE__ */ T(P, {
		item: e,
		renderNavItem: t
	}, e.path)) });
}
function N({ name: t, items: n, storageKey: r, renderNavItem: i }) {
	let [a, o] = C(() => typeof window > "u" ? !1 : window.localStorage?.getItem(r) === "1");
	v(() => {
		typeof window > "u" || (a ? window.localStorage?.setItem(r, "1") : window.localStorage?.removeItem(r));
	}, [a, r]);
	let c = y(), d = S(null), f = S(null), h = () => {
		if (!a) {
			let e = typeof document > "u" ? null : document.activeElement;
			e && f.current?.contains(e) && d.current?.focus();
		}
		o((e) => !e);
	}, g = n.find((e) => e.groupScrollAfter)?.groupScrollAfter, _ = g ? {
		maxHeight: g * 36,
		overflowY: "auto"
	} : void 0;
	return /* @__PURE__ */ E("section", {
		"data-ui-part": "",
		className: "border-b border-[var(--color-border)]",
		children: [/* @__PURE__ */ E("button", {
			"data-ui-part": "",
			type: "button",
			ref: d,
			onClick: h,
			className: e("flex items-center gap-1.5 w-full px-2 bg-transparent border-none cursor-pointer text-left hover:bg-surface-hover", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary", p, u, s),
			"aria-expanded": !a,
			"aria-controls": c,
			"data-testid": "subnav-group-header",
			children: [
				/* @__PURE__ */ T("span", {
					className: "grid h-5 w-5 shrink-0 place-items-center",
					"aria-hidden": "true",
					children: /* @__PURE__ */ T(l, { open: !a })
				}),
				/* @__PURE__ */ T("span", {
					className: "min-w-0 flex-1 truncate",
					children: t
				}),
				/* @__PURE__ */ T("span", {
					className: e("shrink-0 pr-1", m),
					"aria-label": `${n.length} items`,
					"data-testid": "subnav-group-count",
					children: n.length
				})
			]
		}), !a && /* @__PURE__ */ T("div", {
			id: c,
			ref: f,
			style: _,
			children: n.map((e) => /* @__PURE__ */ T(P, {
				item: e,
				renderNavItem: i
			}, e.path))
		})]
	});
}
function P({ item: t, renderNavItem: n }) {
	let r = t.accent === "danger" ? "var(--color-danger)" : t.accent === "warning" ? "var(--color-warning)" : t.accent === "success" ? "var(--color-success)" : void 0, i = /* @__PURE__ */ E(w, { children: [/* @__PURE__ */ E("div", {
		className: "flex min-w-0 items-center justify-between gap-2",
		children: [
			/* @__PURE__ */ T("span", {
				className: e("min-w-0 truncate", c),
				style: r ? { color: r } : void 0,
				"data-testid": "subnav-item-label",
				"data-ui-text": "rail-item",
				children: t.label
			}),
			t.activity && /* @__PURE__ */ T("span", {
				className: "ml-auto shrink-0 text-primary",
				role: "img",
				"aria-label": t.activity.label,
				title: t.activity.label,
				"data-testid": "subnav-item-activity",
				children: /* @__PURE__ */ T(a, { size: 13 })
			}),
			t.count !== void 0 && /* @__PURE__ */ T("span", {
				className: e("shrink-0", "text-[12px] font-medium leading-4 tabular-nums text-text-secondary"),
				"data-testid": "subnav-item-count",
				children: t.count
			})
		]
	}), t.hint && /* @__PURE__ */ T("div", {
		className: "text-[12px] leading-4 text-[var(--color-text-tertiary)] mt-0.5",
		children: t.hint
	})] });
	return t.onClick ? /* @__PURE__ */ T("button", {
		"data-ui-part": "",
		type: "button",
		onClick: t.onClick,
		className: e("block w-full px-[14px] border-l-[3px] border-transparent border-t-0 border-r-0 border-b-0 bg-transparent text-text-primary text-left cursor-pointer font-[inherit] hover:bg-surface-hover", d),
		children: i
	}) : n ? /* @__PURE__ */ T(w, { children: n(t, i, {
		display: "block",
		padding: "9px 14px",
		borderLeft: "3px solid transparent",
		color: "var(--color-text-primary)",
		textDecoration: "none",
		cursor: "pointer"
	}) }) : /* @__PURE__ */ T("a", {
		href: t.path,
		className: I,
		children: i
	});
}
var F = {
	borderLeft: "3px solid var(--color-primary)",
	background: "color-mix(in srgb, var(--color-primary) 8%, transparent)",
	color: "var(--color-text-primary)"
}, I = `block px-[14px] ${d} border-l-[3px] border-transparent text-text-primary no-underline cursor-pointer hover:bg-surface-hover`, L = `block px-[14px] ${d} border-l-[3px] border-primary ${f} text-text-primary no-underline cursor-pointer`, R = {
	sm: "w-[264px]",
	md: "w-[320px]",
	lg: "w-[380px]"
};
function z({ open: n, anchor: r, placement: i = "bottom-start", title: a, subtitle: s, icon: c, submitLabel: l, submitSlot: u, submitTestId: d, submitDisabled: f = !1, busy: p = !1, error: m = null, onSubmit: h, onClose: g, width: _ = "md", children: y, "data-testid": b = "popover-form" }) {
	let x = S(null), C = S(null);
	if (v(() => {
		if (!n) return;
		let e = window.setTimeout(() => {
			C.current?.querySelector("input, textarea, select")?.focus();
		}, 0);
		return () => window.clearTimeout(e);
	}, [n]), !n) return null;
	let w = /* @__PURE__ */ E("form", {
		className: e("flex flex-col", R[_]),
		"data-testid": b,
		onSubmit: (e) => {
			e.preventDefault(), !f && !p && h();
		},
		children: [
			/* @__PURE__ */ E("div", {
				className: "flex items-center gap-2 border-b border-border px-3 py-2.5",
				children: [c && /* @__PURE__ */ T("span", {
					className: "flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-primary-bg text-primary-fg",
					"aria-hidden": "true",
					children: c
				}), /* @__PURE__ */ E("span", {
					className: "flex min-w-0 flex-col",
					children: [/* @__PURE__ */ T("span", {
						className: "truncate text-[13px] font-semibold leading-tight text-text-primary",
						"data-testid": `${b}-title`,
						children: a
					}), s && /* @__PURE__ */ T("span", {
						className: "truncate text-[11px] leading-tight text-text-tertiary",
						children: s
					})]
				})]
			}),
			/* @__PURE__ */ T("div", {
				ref: C,
				className: "flex flex-col gap-2.5 px-3 py-2.5",
				children: y
			}),
			/* @__PURE__ */ T("div", {
				className: e("min-h-[1.125rem] px-3", m && "pb-1"),
				"aria-live": "polite",
				children: m && /* @__PURE__ */ T("span", {
					className: "text-[11px] leading-tight text-danger-fg",
					role: "alert",
					"data-testid": `${b}-error`,
					children: m
				})
			}),
			/* @__PURE__ */ E("div", {
				className: "flex items-center justify-end gap-1.5 border-t border-border px-3 py-2",
				children: [/* @__PURE__ */ T(t, {
					type: "button",
					variant: "ghost",
					size: "sm",
					onClick: g,
					disabled: p,
					"data-testid": `${b}-cancel`,
					children: "Cancel"
				}), u === !1 ? null : u ?? /* @__PURE__ */ T(t, {
					type: "submit",
					variant: "primary",
					size: "sm",
					disabled: f || p,
					"data-testid": d ?? `${b}-submit`,
					children: p ? "Working…" : l
				})]
			})
		]
	});
	return r ? /* @__PURE__ */ T(o, {
		trigger: r ?? x,
		open: n,
		onClose: g,
		placement: i,
		offset: 6,
		className: "p-0",
		"data-testid": `${b}-popover`,
		children: w
	}) : /* @__PURE__ */ T("div", {
		className: "fixed inset-0 z-50 flex items-start justify-center bg-black/20 pt-24",
		onMouseDown: g,
		"data-testid": `${b}-backdrop`,
		children: /* @__PURE__ */ T("div", {
			className: "rounded-lg border border-border bg-surface shadow-lg",
			onMouseDown: (e) => e.stopPropagation(),
			children: w
		})
	});
}
function B({ label: e, hint: t, children: n, "data-testid": r }) {
	return /* @__PURE__ */ E("label", {
		className: "flex flex-col gap-1",
		"data-testid": r,
		children: [
			/* @__PURE__ */ T("span", {
				className: "text-[11px] font-medium leading-none text-text-secondary",
				children: e
			}),
			n,
			t && /* @__PURE__ */ T("span", {
				className: "text-[11px] leading-tight text-text-tertiary",
				children: t
			})
		]
	});
}
//#endregion
//#region src/components/layout/WorkspaceRail.tsx
var V = e("inline-flex items-center gap-1 rounded border-0 bg-transparent p-0 text-[13px] font-medium text-primary no-underline", "cursor-pointer hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary");
function H({ title: t, label: a, actions: o, header: s, footer: c, children: l, width: u = "md", count: d, heading: f = "compact", countStyle: p = "chip", back: m, collapsed: h = !1, collapsedContent: g, onToggle: _, toggleLabel: v, toggleTestId: y, className: b, "data-testid": x = "workspace-rail" }) {
	let S = p === "plain" || f === "label", C = !!(t || o || _);
	j(C && f === "compact");
	let w = v ?? `${h ? "Show" : "Hide"} ${a ?? t ?? "the list"}`;
	return /* @__PURE__ */ E("nav", {
		"aria-label": a ?? t ?? "Workspace",
		"data-testid": x,
		"data-collapsed": h,
		className: e("flex h-full min-h-0 shrink-0 flex-col border-r border-border bg-surface-panel", h ? "w-9" : u === "xs" ? "w-[220px]" : u === "sm" ? "w-[240px]" : u === "ms" ? "w-[264px]" : u === "lg" ? "w-[368px]" : u === "ml" ? "w-[320px]" : "w-[300px]", b),
		children: [
			m && !h && /* @__PURE__ */ T("div", {
				className: e("flex shrink-0 items-center pt-4", f === "compact" ? "px-3.5" : "px-5"),
				"data-testid": `${x}-back-row`,
				children: m.href ? /* @__PURE__ */ E("a", {
					href: m.href,
					onClick: m.onClick,
					className: V,
					"data-testid": `${x}-back`,
					children: [/* @__PURE__ */ T(i, {
						dir: "left",
						size: 14
					}), m.label]
				}) : /* @__PURE__ */ E("button", {
					"data-ui-part": "",
					type: "button",
					onClick: m.onClick,
					className: V,
					"data-testid": `${x}-back`,
					children: [/* @__PURE__ */ T(i, {
						dir: "left",
						size: 14
					}), m.label]
				})
			}),
			C && /* @__PURE__ */ E("div", {
				className: e("flex shrink-0 items-center gap-1", f === "compact" ? "h-9 border-b border-border" : "h-14", h ? "justify-center" : f === "compact" ? "pl-3.5 pr-1.5" : "pl-5 pr-3"),
				"data-testid": `${x}-header`,
				children: [
					!h && (t ? /* @__PURE__ */ E("h2", {
						className: e("m-0 flex min-w-0 flex-1 items-center gap-2 text-text-primary", f === "prominent" ? "text-[18px] font-semibold" : f === "label" ? e("text-[12px] font-semibold uppercase leading-4 tracking-wide", "text-text-secondary") : f === "caption" ? "text-[12px] font-semibold uppercase tracking-[0.06em]" : "text-[12px] font-semibold"),
						"data-testid": `${x}-title`,
						children: [
							/* @__PURE__ */ T("span", {
								className: "min-w-0 truncate",
								children: t
							}),
							typeof d == "number" && S && /* @__PURE__ */ T("span", {
								className: e("shrink-0", f === "label" ? "text-[12px] font-medium leading-4 normal-case tracking-normal tabular-nums text-text-tertiary" : "text-xs font-medium text-text-secondary"),
								"aria-label": `${d} items`,
								"data-testid": `${x}-count`,
								"data-count-style": "plain",
								children: d
							}),
							typeof d == "number" && !S && /* @__PURE__ */ T(n, {
								size: f === "prominent" ? "md" : f === "caption" ? "sm" : "xs",
								tone: "neutral",
								className: "shrink-0",
								"aria-label": `${d} items`,
								"data-testid": `${x}-count`,
								children: d
							})
						]
					}) : /* @__PURE__ */ T("span", { className: "flex-1" })),
					!h && o != null && /* @__PURE__ */ T("div", {
						className: "flex shrink-0 items-center gap-1",
						"data-testid": `${x}-actions`,
						children: o
					}),
					_ && /* @__PURE__ */ T(r, {
						size: "sm",
						variant: "ghost",
						"aria-label": w,
						title: w,
						"aria-expanded": !h,
						onClick: _,
						icon: /* @__PURE__ */ T(i, {
							dir: h ? "right" : "left",
							size: 14
						}),
						"data-testid": y ?? `${x}-${h ? "unfold" : "fold"}`
					})
				]
			}),
			!h && s && /* @__PURE__ */ T("div", {
				className: e("shrink-0 py-3", f === "compact" ? "px-3.5" : "px-5 pt-0"),
				children: s
			}),
			/* @__PURE__ */ T("div", {
				className: "min-h-0 flex-1 overflow-y-auto overflow-x-hidden",
				"data-testid": `${x}-scroll`,
				children: h ? g : l
			}),
			!h && c && /* @__PURE__ */ T("div", {
				className: "shrink-0 border-t border-border px-3.5 py-2",
				children: c
			})
		]
	});
}
//#endregion
export { L as a, k as i, B as n, F as o, z as r, I as s, H as t };
