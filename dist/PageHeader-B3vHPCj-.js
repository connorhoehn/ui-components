import { t as e } from "./cn-D4QmbyEy.js";
import { a as t, n } from "./Tabs-DqkWBCTi.js";
import { I as r, m as i } from "./Icons-B_xESAH3.js";
import { t as a } from "./Avatar-CmYYkk9C.js";
import { t as o } from "./Tooltip-DWyAb81m.js";
import { n as s } from "./NumberInput-axCowEor.js";
import { r as c } from "./Density-Bm-JmcDy.js";
import { n as l } from "./Text-BA4t3u5l.js";
import { useCallback as u, useEffect as d, useId as f, useLayoutEffect as p, useRef as m, useState as h } from "react";
import { Fragment as g, jsx as _, jsxs as v } from "react/jsx-runtime";
import { createPortal as y } from "react-dom";
//#region src/components/shared/HoverCard.tsx
var b = 300, x = 250, S = {
	sm: "w-64",
	md: "w-72",
	lg: "w-80",
	xl: "w-[32rem] max-w-[calc(100vw-16px)]"
};
function C({ label: t, content: n, children: r, width: i = "md", openOnFocus: a = !0, pinOnKey: o = !0, onOpenChange: s, className: c, "data-testid": l = "hover-card" }) {
	let [b, x] = h(!1), [C, w] = h(!1), T = b || C, E = m(null), D = m(null), O = m(null), k = f(), A = u(() => {
		O.current &&= (clearTimeout(O.current), null);
	}, []), j = u((e, t) => {
		A(), O.current = setTimeout(() => {
			O.current = null, x(e);
		}, t);
	}, [A]);
	d(() => A, [A]);
	let M = m(s);
	M.current = s;
	let N = m(!1);
	d(() => {
		N.current !== T && (N.current = T, M.current?.(T));
	}, [T]);
	let P = u(() => {
		A(), x(!1), w(!1);
	}, [A]);
	return d(() => {
		if (!T) return;
		let e = (e) => {
			e.key === "Escape" && P();
		}, t = (e) => {
			let t = e.target;
			t && (E.current?.contains(t) || D.current?.contains(t)) || P();
		};
		return document.addEventListener("keydown", e), document.addEventListener("mousedown", t), () => {
			document.removeEventListener("keydown", e), document.removeEventListener("mousedown", t);
		};
	}, [T, P]), p(() => {
		if (!T) return;
		let e = E.current, t = D.current;
		if (!e || !t) return;
		t.style.position = "fixed", t.style.zIndex = "9500", t.style.overflowY = "auto";
		let n = 0, r = () => {
			let n = document.documentElement.clientWidth || window.innerWidth, r = document.documentElement.clientHeight || window.innerHeight;
			t.style.maxWidth = `${Math.max(1, n - 16)}px`, t.style.maxHeight = `${Math.max(1, r - 16)}px`;
			let i = e.getBoundingClientRect(), a = i.bottom + 6, o = i.top - 6 - t.offsetHeight, s = r - 8 - t.offsetHeight, c = a >= 8 && a <= s ? "below" : o >= 8 && o <= s ? "above" : "bounded", l = c === "below" ? a : c === "above" ? o : Math.max(8, Math.min(a, s));
			t.style.top = `${l}px`, t.style.left = `${Math.max(8, Math.min(i.left, n - 8 - t.offsetWidth))}px`, t.dataset.viewportPlacement = c;
		}, i = () => {
			n ||= requestAnimationFrame(() => {
				n = 0, r();
			});
		};
		r();
		let a = new ResizeObserver(r);
		return a.observe(t), a.observe(e), window.addEventListener("resize", i), document.addEventListener("scroll", i, !0), () => {
			a.disconnect(), window.removeEventListener("resize", i), document.removeEventListener("scroll", i, !0), n && cancelAnimationFrame(n);
		};
	}, [T]), /* @__PURE__ */ v(g, { children: [r({
		ref: (e) => {
			E.current = e;
		},
		onMouseEnter: () => j(!0, 300),
		onMouseLeave: () => j(!1, 250),
		onFocus: () => {
			a && (A(), x(!0));
		},
		onBlur: () => {
			a && j(!1, 250);
		},
		onKeyDown: (e) => {
			if (e.key === "Escape" && T) {
				e.stopPropagation(), P();
				return;
			}
			o && (e.key === "Enter" || e.key === " ") && (A(), w((e) => !e));
		},
		"aria-expanded": T,
		"aria-controls": T ? k : void 0,
		"aria-describedby": T ? k : void 0
	}), T && typeof document < "u" && y(/* @__PURE__ */ _("div", {
		ref: D,
		id: k,
		role: "dialog",
		"aria-modal": "false",
		"aria-label": t,
		"data-testid": l,
		"data-pinned": C ? "true" : "false",
		onMouseEnter: A,
		onMouseLeave: () => {
			C || j(!1, 250);
		},
		className: e("rounded-lg border border-border bg-surface p-3 shadow-lg", S[i], c),
		children: n
	}), document.body)] });
}
//#endregion
//#region src/components/shared/headerDensity.tsx
var w = [
	"canvas",
	"graph",
	"conversation",
	"document"
];
function T(e) {
	return !!e && w.includes(e);
}
var E = "uic:header-density:";
function D(e, t) {
	return `${E}${e}:${T(t) ? "rich" : "plain"}`;
}
var O = 640, k = 480;
function A({ contentKind: e, containerHeight: t, preference: n }) {
	let r = t != null && t > 0 ? t : null, i = T(e);
	return {
		density: n ?? (i || r != null && r < 640 ? "compact" : "comfortable"),
		collapsed: i && r != null && r < 480
	};
}
function j(e, t) {
	let n = [...e ?? []];
	if (!t) return n;
	let r = n[n.length - 1];
	return r && r.label.trim() === t.trim() ? n : [...n, { label: t }];
}
function M({ collapsed: n, onToggle: r, className: a, "data-testid": s = "header-collapse-toggle" }) {
	let c = n ? "Expand header" : "Collapse header";
	return /* @__PURE__ */ _(o, {
		content: c,
		"data-testid": `${s}-tooltip`,
		children: /* @__PURE__ */ _(t, {
			"aria-label": c,
			"aria-expanded": !n,
			variant: "ghost",
			size: "sm",
			icon: /* @__PURE__ */ _(i, {
				size: 14,
				dir: n ? "down" : "up"
			}),
			onClick: r,
			className: e("shrink-0 text-text-secondary", a),
			"data-testid": s,
			"data-collapsed": n ? "true" : "false"
		})
	});
}
function N({ breadcrumbs: t, title: n, badge: r, onExpand: i, actions: a, className: o, "data-testid": c = "header-trail-fold" }) {
	let l = j(t, n);
	return /* @__PURE__ */ v("div", {
		className: e("flex h-7 min-w-0 items-center gap-2", o),
		"data-testid": c,
		children: [
			l.length > 0 && /* @__PURE__ */ _(s, {
				items: l,
				separator: "›",
				maxItems: 5,
				className: "min-w-0 shrink overflow-hidden whitespace-nowrap [&>ol]:flex-nowrap",
				"data-testid": `${c}-crumbs`
			}),
			r && /* @__PURE__ */ _("div", {
				className: "flex shrink-0 items-center",
				children: r
			}),
			i && /* @__PURE__ */ _(M, {
				collapsed: !0,
				onToggle: i,
				"data-testid": `${c}-toggle`
			}),
			a && /* @__PURE__ */ _("div", {
				className: "ml-auto flex shrink-0 items-center gap-2",
				children: a
			})
		]
	});
}
function P({ title: e, description: n, width: i = "lg", "data-testid": a = "header-description" }) {
	return /* @__PURE__ */ _(C, {
		label: `About ${e}`,
		width: i,
		"data-testid": `${a}-card`,
		content: /* @__PURE__ */ v("div", {
			className: "flex flex-col gap-1",
			children: [/* @__PURE__ */ _(l, {
				as: "p",
				size: "sm",
				weight: "semibold",
				tone: "primary",
				wrap: !0,
				children: e
			}), /* @__PURE__ */ _("div", {
				className: "whitespace-pre-line text-xs text-text-secondary",
				"data-testid": `${a}-text`,
				children: n
			})]
		}),
		children: (n) => /* @__PURE__ */ _(t, {
			...n,
			"aria-label": `About ${e}`,
			variant: "ghost",
			size: "sm",
			icon: /* @__PURE__ */ _(r, { size: 14 }),
			className: "shrink-0 text-text-secondary",
			"data-testid": `${a}-trigger`
		})
	});
}
function F(e) {
	return (e ?? []).filter((e) => e.people.length > 0 || !!e.action);
}
function I({ groups: e, density: t, "data-testid": n = "header-people" }) {
	let r = F(e);
	return r.length === 0 ? null : t === "compact" ? /* @__PURE__ */ _("div", {
		className: "flex min-w-0 shrink-0 items-center gap-2",
		"data-testid": n,
		children: r.map((e, t) => /* @__PURE__ */ v("div", {
			role: "group",
			"aria-label": e.label,
			className: "flex items-center gap-1",
			"data-testid": `${n}-${e.label.toLowerCase()}`,
			children: [
				t > 0 && /* @__PURE__ */ _("span", {
					"aria-hidden": "true",
					className: "mr-1 h-4 w-px shrink-0 bg-border"
				}),
				e.people.map((t) => /* @__PURE__ */ _(o, {
					content: `${t.name} · ${e.label}`,
					"data-testid": `${n}-tip-${t.id}`,
					children: /* @__PURE__ */ _("span", {
						tabIndex: 0,
						role: "img",
						"aria-label": `${t.name}, ${e.label}`,
						className: "inline-flex rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
						"data-testid": `${n}-person-${t.id}`,
						children: /* @__PURE__ */ _(a, {
							name: t.name,
							size: 24,
							...t.avatarUrl ? { src: t.avatarUrl } : {},
							...t.color ? { color: t.color } : {}
						})
					})
				}, t.id)),
				e.action
			]
		}, e.label))
	}) : /* @__PURE__ */ _("div", {
		className: "flex min-w-0 flex-wrap items-center gap-x-6 gap-y-2",
		"data-testid": n,
		children: r.map((e) => /* @__PURE__ */ v("div", {
			role: "group",
			"aria-label": e.label,
			className: "flex min-w-0 items-center gap-3",
			"data-testid": `${n}-${e.label.toLowerCase()}`,
			children: [
				/* @__PURE__ */ _(l, {
					size: "sm",
					tone: "tertiary",
					className: "shrink-0",
					children: e.label
				}),
				e.people.map((e) => /* @__PURE__ */ v("span", {
					className: "flex min-w-0 items-center gap-2",
					"data-testid": `${n}-person-${e.id}`,
					children: [/* @__PURE__ */ _(a, {
						name: e.name,
						size: 32,
						...e.avatarUrl ? { src: e.avatarUrl } : {},
						...e.color ? { color: e.color } : {}
					}), /* @__PURE__ */ _(l, {
						size: "sm",
						tone: "primary",
						className: "truncate",
						children: e.name
					})]
				}, e.id)),
				e.action
			]
		}, e.label))
	});
}
//#endregion
//#region src/components/shared/PageHeader.tsx
function L({ title: t, description: r, actions: i, back: a, badge: o, size: l = "md", breadcrumbs: u, density: d, collapsed: f = !1, onToggleCollapsed: p, people: m, info: h, meta: y, tabs: b, activeTab: x, onTabChange: S, className: C, "data-testid": w = "page-header" }) {
	let T = c(d), E = F(m), D = !!u && u.length > 0, O = b && b.length > 0 ? /* @__PURE__ */ _(n, {
		items: b.map((e) => ({
			id: e.id,
			label: e.label,
			...e.count == null ? {} : { badge: e.count },
			...e.disabled ? { disabled: !0 } : {},
			testId: `${w}-tab-${e.id}`
		})),
		value: x && b.some((e) => e.id === x) ? x : b[0].id,
		onValueChange: (e) => S?.(e),
		variant: "underline",
		size: "md",
		badgeStyle: "plain",
		indicator: "bar",
		indicatorWeight: 3,
		"aria-label": `${t} views`,
		className: e("gap-0", f || T === "compact" ? "mt-0" : "mt-3"),
		"data-testid": `${w}-tabs`
	}) : null, k = D ? /* @__PURE__ */ _(s, {
		items: u,
		separator: "›",
		maxItems: 5,
		className: "min-w-0",
		"data-testid": `${w}-crumbs`
	}) : null, A = p ? /* @__PURE__ */ _(M, {
		collapsed: f,
		onToggle: p,
		"data-testid": `${w}-collapse-toggle`
	}) : null;
	return f ? /* @__PURE__ */ v("div", {
		className: e("flex min-w-0 flex-col gap-1", D && "pt-2", C),
		"data-testid": w,
		"data-density": T,
		"data-collapsed": "true",
		children: [/* @__PURE__ */ _(N, {
			breadcrumbs: u,
			title: t,
			badge: o,
			actions: i,
			"data-testid": `${w}-fold`,
			...p ? { onExpand: p } : {}
		}), O]
	}) : T === "compact" ? /* @__PURE__ */ v("div", {
		className: e("flex min-w-0 flex-col gap-1", D && "pt-2", C),
		"data-testid": w,
		"data-density": "compact",
		"data-collapsed": "false",
		children: [
			k,
			/* @__PURE__ */ v("div", {
				className: "flex h-7 min-w-0 items-center gap-3",
				"data-testid": `${w}-row`,
				children: [/* @__PURE__ */ v("div", {
					className: "flex min-w-0 flex-1 items-center gap-2",
					children: [
						/* @__PURE__ */ _("h1", {
							className: "m-0 min-w-0 truncate text-sm font-semibold leading-5 text-[var(--color-text-primary)]",
							title: t,
							children: t
						}),
						o,
						h ?? (r || y ? /* @__PURE__ */ _(P, {
							title: t,
							width: y ? "xl" : "lg",
							description: /* @__PURE__ */ v(g, { children: [r, y && /* @__PURE__ */ _("div", {
								className: "mt-2 whitespace-normal",
								children: y
							})] }),
							"data-testid": `${w}-description`
						}) : null),
						E.length > 0 && /* @__PURE__ */ _("div", {
							className: "flex min-w-0 shrink-[8] overflow-hidden",
							children: /* @__PURE__ */ _(I, {
								groups: E,
								density: "compact",
								"data-testid": `${w}-people`
							})
						}),
						A
					]
				}), i && /* @__PURE__ */ _("div", {
					className: "flex flex-shrink-0 items-center gap-2",
					children: i
				})]
			}),
			O
		]
	}) : /* @__PURE__ */ v("div", {
		className: e("flex flex-col gap-1.5", D && "pt-3", C),
		"data-testid": w,
		"data-density": "comfortable",
		"data-collapsed": "false",
		children: [
			k && /* @__PURE__ */ _("div", {
				className: "mb-2.5",
				children: k
			}),
			a && /* @__PURE__ */ v("a", {
				href: a.to,
				onClick: a.onClick,
				className: "inline-flex items-center gap-1 text-xs text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] mb-1 w-fit",
				children: [/* @__PURE__ */ _("svg", {
					width: "12",
					height: "12",
					viewBox: "0 0 12 12",
					fill: "none",
					"aria-hidden": "true",
					children: /* @__PURE__ */ _("path", {
						d: "M7 2L3 6l4 4",
						stroke: "currentColor",
						strokeWidth: "1.5",
						strokeLinecap: "round",
						strokeLinejoin: "round"
					})
				}), a.label]
			}),
			/* @__PURE__ */ v("div", {
				className: "flex flex-wrap items-center justify-between gap-x-4 gap-y-2",
				children: [/* @__PURE__ */ v("div", {
					className: "min-w-0 flex items-center gap-2.5",
					children: [
						/* @__PURE__ */ _("h1", {
							className: e("font-semibold text-[var(--color-text-primary)] leading-tight", l === "lg" ? "text-[28px] font-bold tracking-[-0.01em]" : "text-xl"),
							children: t
						}),
						o,
						h,
						A
					]
				}), i && /* @__PURE__ */ _("div", {
					className: "flex-shrink-0 flex items-center gap-2",
					children: i
				})]
			}),
			r && /* @__PURE__ */ _("p", {
				className: "text-sm text-[var(--color-text-secondary)]",
				children: r
			}),
			E.length > 0 && /* @__PURE__ */ _("div", {
				className: "mt-1",
				children: /* @__PURE__ */ _(I, {
					groups: E,
					density: "comfortable",
					"data-testid": `${w}-people`
				})
			}),
			y && /* @__PURE__ */ _("div", {
				className: "mt-2 min-w-0",
				"data-testid": `${w}-meta`,
				children: y
			}),
			O
		]
	});
}
//#endregion
export { C as _, M as a, N as c, A as d, D as f, b as g, x as h, E as i, w as l, F as m, k as n, P as o, T as p, O as r, I as s, L as t, j as u };
