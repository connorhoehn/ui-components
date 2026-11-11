import { c as e, d as t } from "./Button-DQoeE5dN.js";
import { n } from "./safeHref-CSAycLWi.js";
import { n as r } from "./Text-XdCzxWMv.js";
import { t as i } from "./IconButton-BgM9MvwA.js";
import { I as a, m as o } from "./Icons-CqVFbuiZ.js";
import { t as s } from "./Tooltip-DGN3JB6V.js";
import { i as c, n as l, r as u } from "./Tabs-C__jThyK.js";
import { n as d } from "./Avatar-CNZ7AQ8M.js";
import { t as f } from "./Breadcrumbs-D2qqIALK.js";
import { useCallback as p, useEffect as m, useId as h, useLayoutEffect as g, useRef as _, useState as v } from "react";
import { Fragment as y, jsx as b, jsxs as x } from "react/jsx-runtime";
import { createPortal as S } from "react-dom";
//#region src/components/shared/HoverCard.tsx
var C = 300, w = 250, T = {
	sm: "w-64",
	md: "w-72",
	lg: "w-80",
	xl: "w-[32rem] max-w-[calc(100vw-16px)]"
};
function E({ label: e, content: n, children: r, width: i = "md", openOnFocus: a = !0, pinOnKey: o = !0, onOpenChange: s, className: c, "data-testid": l = "hover-card" }) {
	let [u, d] = v(!1), [f, C] = v(!1), w = u || f, E = _(null), D = _(null), O = _(null), k = h(), A = p(() => {
		O.current &&= (clearTimeout(O.current), null);
	}, []), j = p((e, t) => {
		A(), O.current = setTimeout(() => {
			O.current = null, d(e);
		}, t);
	}, [A]);
	m(() => A, [A]);
	let M = _(s);
	M.current = s;
	let N = _(!1);
	m(() => {
		N.current !== w && (N.current = w, M.current?.(w));
	}, [w]);
	let P = p(() => {
		A(), d(!1), C(!1);
	}, [A]);
	return m(() => {
		if (!w) return;
		let e = (e) => {
			e.key === "Escape" && P();
		}, t = (e) => {
			let t = e.target;
			t && (E.current?.contains(t) || D.current?.contains(t)) || P();
		};
		return document.addEventListener("keydown", e), document.addEventListener("mousedown", t), () => {
			document.removeEventListener("keydown", e), document.removeEventListener("mousedown", t);
		};
	}, [w, P]), g(() => {
		if (!w) return;
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
	}, [w]), /* @__PURE__ */ x(y, { children: [r({
		ref: (e) => {
			E.current = e;
		},
		onMouseEnter: () => j(!0, 300),
		onMouseLeave: () => j(!1, 250),
		onFocus: () => {
			a && (A(), d(!0));
		},
		onBlur: () => {
			a && j(!1, 250);
		},
		onKeyDown: (e) => {
			if (e.key === "Escape" && w) {
				e.stopPropagation(), P();
				return;
			}
			o && (e.key === "Enter" || e.key === " ") && (e.preventDefault(), A(), C((e) => !e));
		},
		onClick: () => {
			A(), d(!1), C((e) => !e);
		},
		"aria-expanded": w,
		"aria-controls": w ? k : void 0,
		"aria-describedby": w ? k : void 0
	}), w && typeof document < "u" && S(/* @__PURE__ */ b("div", {
		ref: D,
		id: k,
		role: "dialog",
		"aria-modal": "false",
		"data-ui-focus": "trigger",
		"aria-label": e,
		"data-testid": l,
		"data-pinned": f ? "true" : "false",
		onMouseEnter: A,
		onMouseLeave: () => {
			f || j(!1, 250);
		},
		className: t("rounded-lg border border-border bg-surface p-3 shadow-lg", T[i], c),
		children: n
	}), document.body)] });
}
//#endregion
//#region src/components/shared/headerDensity.tsx
var D = [
	"canvas",
	"graph",
	"conversation",
	"document"
];
function O(e) {
	return !!e && D.includes(e);
}
var k = "uic:header-density:";
function A(e, t) {
	return `${k}${e}:${O(t) ? "rich" : "plain"}`;
}
var j = u.header, M = 480;
function N({ contentKind: e, containerHeight: t, preference: n }) {
	let r = t != null && t > 0 ? t : null, i = O(e);
	return {
		density: n ?? (i || c(r, j) === "compact" ? "compact" : "comfortable"),
		collapsed: i && r != null && r < 480
	};
}
function P(e, t) {
	let n = [...e ?? []];
	if (!t) return n;
	let r = n[n.length - 1];
	return r && r.label.trim() === t.trim() ? n : [...n, { label: t }];
}
function F({ collapsed: e, onToggle: n, className: r, "data-testid": a = "header-collapse-toggle" }) {
	let c = e ? "Expand header" : "Collapse header";
	return /* @__PURE__ */ b(s, {
		content: c,
		"data-testid": `${a}-tooltip`,
		children: /* @__PURE__ */ b(i, {
			"aria-label": c,
			"aria-expanded": !e,
			variant: "ghost",
			size: "sm",
			icon: /* @__PURE__ */ b(o, {
				size: 14,
				dir: e ? "down" : "up"
			}),
			onClick: n,
			className: t("shrink-0 text-text-secondary", r),
			"data-testid": a,
			"data-collapsed": e ? "true" : "false"
		})
	});
}
function I({ breadcrumbs: e, title: n, badge: r, onExpand: i, actions: a, className: o, "data-testid": s = "header-trail-fold" }) {
	let c = P(e, n);
	return /* @__PURE__ */ x("div", {
		className: t("flex h-7 min-w-0 items-center gap-2", o),
		"data-testid": s,
		children: [
			c.length > 0 && /* @__PURE__ */ b(f, {
				items: c,
				separator: "›",
				maxItems: 5,
				className: "min-w-0 shrink overflow-hidden whitespace-nowrap [&>ol]:flex-nowrap",
				"data-testid": `${s}-crumbs`
			}),
			r && /* @__PURE__ */ b("div", {
				className: "flex shrink-0 items-center",
				children: r
			}),
			i && /* @__PURE__ */ b(F, {
				collapsed: !0,
				onToggle: i,
				"data-testid": `${s}-toggle`
			}),
			a && /* @__PURE__ */ b("div", {
				className: "ml-auto flex shrink-0 items-center gap-2",
				children: a
			})
		]
	});
}
function L({ title: e, description: t, width: n = "lg", "data-testid": o = "header-description" }) {
	return /* @__PURE__ */ b(E, {
		label: `About ${e}`,
		width: n,
		"data-testid": `${o}-card`,
		content: /* @__PURE__ */ x("div", {
			className: "flex flex-col gap-1",
			children: [/* @__PURE__ */ b(r, {
				as: "p",
				size: "sm",
				weight: "semibold",
				tone: "primary",
				wrap: !0,
				children: e
			}), /* @__PURE__ */ b("div", {
				className: "whitespace-pre-line text-xs text-text-secondary",
				"data-testid": `${o}-text`,
				children: t
			})]
		}),
		children: (t) => /* @__PURE__ */ b(i, {
			...t,
			"aria-label": `About ${e}`,
			variant: "ghost",
			size: "sm",
			icon: /* @__PURE__ */ b(a, { size: 14 }),
			className: "shrink-0 text-text-secondary",
			"data-testid": `${o}-trigger`
		})
	});
}
function R(e) {
	return (e ?? []).filter((e) => e.people.length > 0 || !!e.action);
}
function z({ groups: e, density: n, "data-testid": i = "header-people" }) {
	let a = R(e);
	return a.length === 0 ? null : n === "compact" ? /* @__PURE__ */ b("div", {
		className: "flex min-w-0 shrink-0 items-center gap-2",
		"data-testid": i,
		children: a.map((e, t) => /* @__PURE__ */ x("div", {
			role: "group",
			"aria-label": e.label,
			className: "flex items-center gap-1",
			"data-testid": `${i}-${e.label.toLowerCase()}`,
			children: [
				t > 0 && /* @__PURE__ */ b("span", {
					"aria-hidden": "true",
					className: "mr-1 h-4 w-px shrink-0 bg-border"
				}),
				e.people.map((t) => /* @__PURE__ */ b(s, {
					content: `${t.name} · ${e.label}`,
					"data-testid": `${i}-tip-${t.id}`,
					children: /* @__PURE__ */ b("span", {
						tabIndex: 0,
						role: "img",
						"aria-label": `${t.name}, ${e.label}`,
						className: "inline-flex rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
						"data-testid": `${i}-person-${t.id}`,
						children: /* @__PURE__ */ b(d, {
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
	}) : /* @__PURE__ */ b("div", {
		className: "@container flex min-w-0 flex-wrap items-center gap-x-6 gap-y-2",
		"data-testid": i,
		children: a.map((e) => /* @__PURE__ */ x("div", {
			role: "group",
			"aria-label": e.label,
			className: "flex min-w-0 items-center gap-3",
			"data-testid": `${i}-${e.label.toLowerCase()}`,
			children: [
				/* @__PURE__ */ b(r, {
					size: "sm",
					tone: "tertiary",
					className: "shrink-0",
					children: e.label
				}),
				e.people.map((n) => /* @__PURE__ */ x("span", {
					className: "flex min-w-0 items-center gap-2",
					"data-testid": `${i}-person-${n.id}`,
					children: [/* @__PURE__ */ b(d, {
						name: n.name,
						size: 32,
						className: "shrink-0",
						...n.avatarUrl ? { src: n.avatarUrl } : {},
						...n.color ? { color: n.color } : {}
					}), /* @__PURE__ */ b("span", {
						className: t("min-w-0", e.people.length > 1 && "hidden @min-[30rem]:block"),
						"data-testid": `${i}-name-${n.id}`,
						children: /* @__PURE__ */ b(r, {
							size: "sm",
							tone: "primary",
							truncate: !0,
							children: n.name
						})
					})]
				}, n.id)),
				e.action
			]
		}, e.label))
	});
}
//#endregion
//#region src/components/shared/PageHeader.tsx
function B({ title: r, as: i = "h1", description: a, actions: c, back: u, badge: d, size: p = "md", breadcrumbs: m, density: h, collapsed: g = !1, onToggleCollapsed: _, people: v, info: S, meta: C, tabs: w, tabsOverflowBelow: T, activeTab: E, onTabChange: D, className: O, "data-testid": k = "page-header" }) {
	let A = e(h), j = R(v), M = !!m && m.length > 0, N = w && w.length > 0 ? /* @__PURE__ */ b(l, {
		items: w.map((e) => ({
			id: e.id,
			label: e.label,
			...e.count == null ? {} : { badge: e.count },
			...e.disabled ? { disabled: !0 } : {},
			testId: `${k}-tab-${e.id}`
		})),
		value: E && w.some((e) => e.id === E) ? E : w[0].id,
		onValueChange: (e) => D?.(e),
		variant: "underline",
		size: "md",
		badgeStyle: "plain",
		indicator: "bar",
		indicatorWeight: 3,
		"aria-label": `${r} views`,
		className: t("gap-0", g || A === "compact" ? "mt-0" : "mt-3"),
		...T ? { overflowBelow: T } : {},
		"data-testid": `${k}-tabs`
	}) : null, P = M ? /* @__PURE__ */ b(f, {
		items: m,
		separator: "›",
		maxItems: 5,
		className: "min-w-0",
		"data-testid": `${k}-crumbs`
	}) : null, B = _ ? /* @__PURE__ */ b(F, {
		collapsed: g,
		onToggle: _,
		"data-testid": `${k}-collapse-toggle`
	}) : null, V = u ? /* @__PURE__ */ b(s, {
		content: u.label,
		children: /* @__PURE__ */ b("a", {
			href: n(u.to) ?? void 0,
			onClick: u.onClick,
			"aria-label": u.label,
			className: "inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-text-secondary hover:bg-primary/10 hover:text-primary focus-visible:outline-2 focus-visible:outline-primary",
			children: /* @__PURE__ */ b(o, {
				dir: "left",
				size: 16
			})
		})
	}) : null;
	return g ? /* @__PURE__ */ x("div", {
		className: t("flex min-w-0 flex-col gap-1", M && "pt-2", O),
		"data-testid": k,
		"data-page-header": "",
		"data-density": A,
		"data-collapsed": "true",
		children: [/* @__PURE__ */ x("div", {
			className: "flex min-w-0 items-center gap-2",
			children: [V, /* @__PURE__ */ b("div", {
				className: "min-w-0 flex-1",
				children: /* @__PURE__ */ b(I, {
					breadcrumbs: m,
					title: r,
					badge: d,
					actions: c,
					"data-testid": `${k}-fold`,
					..._ ? { onExpand: _ } : {}
				})
			})]
		}), N]
	}) : A === "compact" ? /* @__PURE__ */ x("div", {
		className: t("flex min-w-0 flex-col gap-1", M && "pt-2", O),
		"data-testid": k,
		"data-page-header": "",
		"data-density": "compact",
		"data-collapsed": "false",
		children: [
			P,
			/* @__PURE__ */ x("div", {
				className: "flex min-h-7 min-w-0 flex-wrap items-center gap-x-3 gap-y-1",
				"data-testid": `${k}-row`,
				"data-page-header-row": "",
				children: [
					V,
					/* @__PURE__ */ x("div", {
						className: "flex min-w-0 flex-1 basis-32 items-center gap-2",
						"data-page-header-title-cell": "",
						children: [
							/* @__PURE__ */ b(i, {
								className: t("m-0 min-w-0 truncate font-semibold text-[var(--color-text-primary)]", p === "sm" ? "text-sm leading-5" : "text-xl leading-7"),
								title: r,
								"data-title-size": p,
								"data-page-header-title": "",
								children: r
							}),
							d,
							S ?? (a || C ? /* @__PURE__ */ b(L, {
								title: r,
								width: C ? "xl" : "lg",
								description: /* @__PURE__ */ x(y, { children: [a, C && /* @__PURE__ */ b("div", {
									className: "mt-2 whitespace-normal",
									children: C
								})] }),
								"data-testid": `${k}-description`
							}) : null),
							j.length > 0 && /* @__PURE__ */ b("div", {
								className: "flex min-w-0 shrink-[8] overflow-hidden",
								children: /* @__PURE__ */ b(z, {
									groups: j,
									density: "compact",
									"data-testid": `${k}-people`
								})
							}),
							B
						]
					}),
					c && /* @__PURE__ */ b("div", {
						className: "flex max-w-full flex-shrink-0 flex-wrap items-center gap-2",
						"data-page-header-actions": "",
						children: c
					})
				]
			}),
			N
		]
	}) : /* @__PURE__ */ x("div", {
		className: t("flex flex-col gap-1.5", M && "pt-3", O),
		"data-testid": k,
		"data-page-header": "",
		"data-density": "comfortable",
		"data-collapsed": "false",
		children: [
			P && /* @__PURE__ */ b("div", {
				className: "mb-2.5",
				children: P
			}),
			u && /* @__PURE__ */ x("a", {
				href: n(u.to) ?? void 0,
				onClick: u.onClick,
				className: "inline-flex items-center gap-1 text-xs text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] mb-1 w-fit",
				children: [/* @__PURE__ */ b("svg", {
					width: "12",
					height: "12",
					viewBox: "0 0 12 12",
					fill: "none",
					"aria-hidden": "true",
					children: /* @__PURE__ */ b("path", {
						d: "M7 2L3 6l4 4",
						stroke: "currentColor",
						strokeWidth: "1.5",
						strokeLinecap: "round",
						strokeLinejoin: "round"
					})
				}), u.label]
			}),
			/* @__PURE__ */ x("div", {
				className: "flex flex-wrap items-center justify-between gap-x-4 gap-y-2",
				children: [/* @__PURE__ */ x("div", {
					className: "min-w-0 flex flex-wrap items-center gap-x-2.5 gap-y-2",
					children: [
						/* @__PURE__ */ b(i, {
							className: t("font-semibold text-[var(--color-text-primary)] leading-tight", p === "lg" ? "text-[28px] font-bold tracking-[-0.01em]" : p === "sm" ? "text-sm" : "text-xl"),
							children: r
						}),
						d,
						S,
						B
					]
				}), c && /* @__PURE__ */ b("div", {
					className: "flex max-w-full min-w-0 flex-shrink-0 flex-wrap items-center gap-2",
					children: c
				})]
			}),
			a && /* @__PURE__ */ b("p", {
				className: "text-sm text-[var(--color-text-secondary)]",
				children: a
			}),
			j.length > 0 && /* @__PURE__ */ b("div", {
				className: "mt-1",
				children: /* @__PURE__ */ b(z, {
					groups: j,
					density: "comfortable",
					"data-testid": `${k}-people`
				})
			}),
			C && /* @__PURE__ */ b("div", {
				className: "mt-2 min-w-0",
				"data-testid": `${k}-meta`,
				children: C
			}),
			N
		]
	});
}
//#endregion
export { E as _, F as a, I as c, N as d, A as f, C as g, w as h, k as i, D as l, R as m, M as n, L as o, O as p, j as r, z as s, B as t, P as u };
