import { f as e, l as t } from "./Button-DwPf_9pb.js";
import { n } from "./Text-DyujO08i.js";
import { n as r } from "./safeHref-dF2rw8EK.js";
import { t as i } from "./IconButton-BmDqeC-b.js";
import { I as a, m as o } from "./Icons-DX0dqgD-.js";
import { t as s } from "./Tooltip-BaCci7O5.js";
import { i as c, n as l, r as u } from "./Tabs-ChyOmBFc.js";
import { n as d } from "./Avatar-BWzSZ73h.js";
import { t as f } from "./Breadcrumbs-BALh6O9m.js";
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
function E({ label: t, content: n, children: r, width: i = "md", openOnFocus: a = !0, pinOnKey: o = !0, onOpenChange: s, className: c, "data-testid": l = "hover-card" }) {
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
		"aria-label": t,
		"data-testid": l,
		"data-pinned": f ? "true" : "false",
		onMouseEnter: A,
		onMouseLeave: () => {
			f || j(!1, 250);
		},
		className: e("rounded-lg border border-border bg-surface p-3 shadow-lg", T[i], c),
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
function F({ collapsed: t, onToggle: n, className: r, "data-testid": a = "header-collapse-toggle" }) {
	let c = t ? "Expand header" : "Collapse header";
	return /* @__PURE__ */ b(s, {
		content: c,
		"data-testid": `${a}-tooltip`,
		children: /* @__PURE__ */ b(i, {
			"aria-label": c,
			"aria-expanded": !t,
			variant: "ghost",
			size: "sm",
			icon: /* @__PURE__ */ b(o, {
				size: 14,
				dir: t ? "down" : "up"
			}),
			onClick: n,
			className: e("shrink-0 text-text-secondary", r),
			"data-testid": a,
			"data-collapsed": t ? "true" : "false"
		})
	});
}
function I({ breadcrumbs: t, title: n, badge: r, onExpand: i, actions: a, className: o, "data-testid": s = "header-trail-fold" }) {
	let c = P(t, n);
	return /* @__PURE__ */ x("div", {
		className: e("flex h-7 min-w-0 items-center gap-2", o),
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
function L({ title: e, description: t, width: r = "lg", "data-testid": o = "header-description" }) {
	return /* @__PURE__ */ b(E, {
		label: `About ${e}`,
		width: r,
		"data-testid": `${o}-card`,
		content: /* @__PURE__ */ x("div", {
			className: "flex flex-col gap-1",
			children: [/* @__PURE__ */ b(n, {
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
function z({ groups: t, density: r, "data-testid": i = "header-people" }) {
	let a = R(t);
	return a.length === 0 ? null : r === "compact" ? /* @__PURE__ */ b("div", {
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
		children: a.map((t) => /* @__PURE__ */ x("div", {
			role: "group",
			"aria-label": t.label,
			className: "flex min-w-0 items-center gap-3",
			"data-testid": `${i}-${t.label.toLowerCase()}`,
			children: [
				/* @__PURE__ */ b(n, {
					size: "sm",
					tone: "tertiary",
					className: "shrink-0",
					children: t.label
				}),
				t.people.map((r) => /* @__PURE__ */ x("span", {
					className: "flex min-w-0 items-center gap-2",
					"data-testid": `${i}-person-${r.id}`,
					children: [/* @__PURE__ */ b(d, {
						name: r.name,
						size: 32,
						className: "shrink-0",
						...r.avatarUrl ? { src: r.avatarUrl } : {},
						...r.color ? { color: r.color } : {}
					}), /* @__PURE__ */ b("span", {
						className: e("min-w-0", t.people.length > 1 && "hidden @min-[30rem]:block"),
						"data-testid": `${i}-name-${r.id}`,
						children: /* @__PURE__ */ b(n, {
							size: "sm",
							tone: "primary",
							truncate: !0,
							children: r.name
						})
					})]
				}, r.id)),
				t.action
			]
		}, t.label))
	});
}
//#endregion
//#region src/components/shared/PageHeader.tsx
function B({ title: n, as: i = "h1", titleOverflow: a = "truncate", description: c, actions: u, back: d, badge: p, size: m = "md", breadcrumbs: h, density: g, collapsed: _ = !1, onToggleCollapsed: v, people: S, info: C, meta: w, tabs: T, tabsOverflowBelow: E, activeTab: D, onTabChange: O, className: k, "data-testid": A = "page-header" }) {
	let j = t(g), M = R(S), N = !!h && h.length > 0, P = T && T.length > 0 ? /* @__PURE__ */ b(l, {
		items: T.map((e) => ({
			id: e.id,
			label: e.label,
			...e.count == null ? {} : { badge: e.count },
			...e.disabled ? { disabled: !0 } : {},
			testId: `${A}-tab-${e.id}`
		})),
		value: D && T.some((e) => e.id === D) ? D : T[0].id,
		onValueChange: (e) => O?.(e),
		variant: "underline",
		size: "md",
		badgeStyle: "plain",
		indicator: "bar",
		indicatorWeight: 3,
		"aria-label": `${n} views`,
		className: e("gap-0", _ || j === "compact" ? "mt-0" : "mt-3"),
		...E ? { overflowBelow: E } : {},
		"data-testid": `${A}-tabs`
	}) : null, B = N ? /* @__PURE__ */ b(f, {
		items: h,
		separator: "›",
		maxItems: 5,
		className: "min-w-0",
		"data-testid": `${A}-crumbs`
	}) : null, V = v ? /* @__PURE__ */ b(F, {
		collapsed: _,
		onToggle: v,
		"data-testid": `${A}-collapse-toggle`
	}) : null, H = d ? /* @__PURE__ */ b(s, {
		content: d.label,
		children: /* @__PURE__ */ b("a", {
			href: r(d.to) ?? void 0,
			onClick: d.onClick,
			"aria-label": d.label,
			className: "inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-text-secondary hover:bg-primary/10 hover:text-primary focus-visible:outline-2 focus-visible:outline-primary",
			children: /* @__PURE__ */ b(o, {
				dir: "left",
				size: 16
			})
		})
	}) : null;
	return _ ? /* @__PURE__ */ x("div", {
		className: e("flex min-w-0 flex-col gap-1", N && "pt-2", k),
		"data-testid": A,
		"data-page-header": "",
		"data-density": j,
		"data-collapsed": "true",
		children: [/* @__PURE__ */ x("div", {
			className: "flex min-w-0 items-center gap-2",
			children: [H, /* @__PURE__ */ b("div", {
				className: "min-w-0 flex-1",
				children: /* @__PURE__ */ b(I, {
					breadcrumbs: h,
					title: n,
					badge: p,
					actions: u,
					"data-testid": `${A}-fold`,
					...v ? { onExpand: v } : {}
				})
			})]
		}), P]
	}) : j === "compact" ? /* @__PURE__ */ x("div", {
		className: e("flex min-w-0 flex-col gap-1", N && "pt-2", k),
		"data-testid": A,
		"data-page-header": "",
		"data-density": "compact",
		"data-collapsed": "false",
		children: [
			B,
			/* @__PURE__ */ x("div", {
				className: "flex min-h-7 min-w-0 flex-wrap items-center gap-x-3 gap-y-1",
				"data-testid": `${A}-row`,
				"data-page-header-row": "",
				children: [
					H,
					/* @__PURE__ */ x("div", {
						className: "flex min-w-0 flex-1 basis-48 items-center gap-2",
						"data-page-header-title-cell": "",
						children: [
							/* @__PURE__ */ b(i, {
								className: e("m-0 min-w-0 font-semibold text-[var(--color-text-primary)]", a === "wrap" ? "whitespace-normal break-words" : "truncate", m === "sm" ? "text-sm leading-5" : "text-xl leading-7"),
								title: n,
								"data-title-size": m,
								"data-page-header-title": "",
								children: n
							}),
							p,
							C ?? (c || w ? /* @__PURE__ */ b(L, {
								title: n,
								width: w ? "xl" : "lg",
								description: /* @__PURE__ */ x(y, { children: [c, w && /* @__PURE__ */ b("div", {
									className: "mt-2 whitespace-normal",
									children: w
								})] }),
								"data-testid": `${A}-description`
							}) : null),
							M.length > 0 && /* @__PURE__ */ b("div", {
								className: "flex min-w-0 shrink-[8] overflow-hidden",
								children: /* @__PURE__ */ b(z, {
									groups: M,
									density: "compact",
									"data-testid": `${A}-people`
								})
							}),
							V
						]
					}),
					u && /* @__PURE__ */ b("div", {
						className: "flex max-w-full flex-shrink-0 flex-wrap items-center gap-2",
						"data-page-header-actions": "",
						children: u
					})
				]
			}),
			P
		]
	}) : /* @__PURE__ */ x("div", {
		className: e("flex flex-col gap-1.5", N && "pt-3", k),
		"data-testid": A,
		"data-page-header": "",
		"data-density": "comfortable",
		"data-collapsed": "false",
		children: [
			B && /* @__PURE__ */ b("div", {
				className: "mb-2.5",
				children: B
			}),
			d && /* @__PURE__ */ x("a", {
				href: r(d.to) ?? void 0,
				onClick: d.onClick,
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
				}), d.label]
			}),
			/* @__PURE__ */ x("div", {
				className: "flex flex-wrap items-center justify-between gap-x-4 gap-y-2",
				children: [/* @__PURE__ */ x("div", {
					className: "min-w-0 flex flex-wrap items-center gap-x-2.5 gap-y-2",
					children: [
						/* @__PURE__ */ b(i, {
							className: e("font-semibold text-[var(--color-text-primary)] leading-tight", m === "lg" ? "text-[28px] font-bold tracking-[-0.01em]" : m === "sm" ? "text-sm" : "text-xl"),
							children: n
						}),
						p,
						C,
						V
					]
				}), u && /* @__PURE__ */ b("div", {
					className: "flex max-w-full min-w-0 flex-shrink-0 flex-wrap items-center gap-2",
					children: u
				})]
			}),
			c && /* @__PURE__ */ b("p", {
				className: "text-sm text-[var(--color-text-secondary)]",
				children: c
			}),
			M.length > 0 && /* @__PURE__ */ b("div", {
				className: "mt-1",
				children: /* @__PURE__ */ b(z, {
					groups: M,
					density: "comfortable",
					"data-testid": `${A}-people`
				})
			}),
			w && /* @__PURE__ */ b("div", {
				className: "mt-2 min-w-0",
				"data-testid": `${A}-meta`,
				children: w
			}),
			P
		]
	});
}
//#endregion
export { E as _, F as a, I as c, N as d, A as f, C as g, w as h, k as i, D as l, R as m, M as n, L as o, O as p, j as r, z as s, B as t, P as u };
