import { t as e } from "./cn-D4QmbyEy.js";
import { c as t } from "./Button-uREUOWUk.js";
import { t as n } from "./IconButton-IE5g44md.js";
import { I as r, m as i } from "./Icons-GSE-QGuJ.js";
import { a, i as o, n as s, o as c } from "./Text-4BIlhd_-.js";
import { t as l } from "./Tooltip-DWyAb81m.js";
import { t as u } from "./Avatar-poY12YbV.js";
import { t as d } from "./Breadcrumbs-DnXnRkLN.js";
import { useCallback as f, useEffect as p, useId as m, useLayoutEffect as h, useRef as g, useState as _ } from "react";
import { Fragment as v, jsx as y, jsxs as b } from "react/jsx-runtime";
import { createPortal as x } from "react-dom";
//#region src/components/shared/HoverCard.tsx
var S = 300, C = 250, w = {
	sm: "w-64",
	md: "w-72",
	lg: "w-80",
	xl: "w-[32rem] max-w-[calc(100vw-16px)]"
};
function T({ label: t, content: n, children: r, width: i = "md", openOnFocus: a = !0, pinOnKey: o = !0, onOpenChange: s, className: c, "data-testid": l = "hover-card" }) {
	let [u, d] = _(!1), [S, C] = _(!1), T = u || S, E = g(null), D = g(null), O = g(null), k = m(), A = f(() => {
		O.current &&= (clearTimeout(O.current), null);
	}, []), j = f((e, t) => {
		A(), O.current = setTimeout(() => {
			O.current = null, d(e);
		}, t);
	}, [A]);
	p(() => A, [A]);
	let M = g(s);
	M.current = s;
	let N = g(!1);
	p(() => {
		N.current !== T && (N.current = T, M.current?.(T));
	}, [T]);
	let P = f(() => {
		A(), d(!1), C(!1);
	}, [A]);
	return p(() => {
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
	}, [T, P]), h(() => {
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
	}, [T]), /* @__PURE__ */ b(v, { children: [r({
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
			if (e.key === "Escape" && T) {
				e.stopPropagation(), P();
				return;
			}
			o && (e.key === "Enter" || e.key === " ") && (A(), C((e) => !e));
		},
		"aria-expanded": T,
		"aria-controls": T ? k : void 0,
		"aria-describedby": T ? k : void 0
	}), T && typeof document < "u" && x(/* @__PURE__ */ y("div", {
		ref: D,
		id: k,
		role: "dialog",
		"aria-modal": "false",
		"aria-label": t,
		"data-testid": l,
		"data-pinned": S ? "true" : "false",
		onMouseEnter: A,
		onMouseLeave: () => {
			S || j(!1, 250);
		},
		className: e("rounded-lg border border-border bg-surface p-3 shadow-lg", w[i], c),
		children: n
	}), document.body)] });
}
//#endregion
//#region src/components/shared/headerDensity.tsx
var E = [
	"canvas",
	"graph",
	"conversation",
	"document"
];
function D(e) {
	return !!e && E.includes(e);
}
var O = "uic:header-density:";
function k(e, t) {
	return `${O}${e}:${D(t) ? "rich" : "plain"}`;
}
var A = a.header, j = 480;
function M({ contentKind: e, containerHeight: t, preference: n }) {
	let r = t != null && t > 0 ? t : null, i = D(e);
	return {
		density: n ?? (i || c(r, A) === "compact" ? "compact" : "comfortable"),
		collapsed: i && r != null && r < 480
	};
}
function N(e, t) {
	let n = [...e ?? []];
	if (!t) return n;
	let r = n[n.length - 1];
	return r && r.label.trim() === t.trim() ? n : [...n, { label: t }];
}
function P({ collapsed: t, onToggle: r, className: a, "data-testid": o = "header-collapse-toggle" }) {
	let s = t ? "Expand header" : "Collapse header";
	return /* @__PURE__ */ y(l, {
		content: s,
		"data-testid": `${o}-tooltip`,
		children: /* @__PURE__ */ y(n, {
			"aria-label": s,
			"aria-expanded": !t,
			variant: "ghost",
			size: "sm",
			icon: /* @__PURE__ */ y(i, {
				size: 14,
				dir: t ? "down" : "up"
			}),
			onClick: r,
			className: e("shrink-0 text-text-secondary", a),
			"data-testid": o,
			"data-collapsed": t ? "true" : "false"
		})
	});
}
function F({ breadcrumbs: t, title: n, badge: r, onExpand: i, actions: a, className: o, "data-testid": s = "header-trail-fold" }) {
	let c = N(t, n);
	return /* @__PURE__ */ b("div", {
		className: e("flex h-7 min-w-0 items-center gap-2", o),
		"data-testid": s,
		children: [
			c.length > 0 && /* @__PURE__ */ y(d, {
				items: c,
				separator: "›",
				maxItems: 5,
				className: "min-w-0 shrink overflow-hidden whitespace-nowrap [&>ol]:flex-nowrap",
				"data-testid": `${s}-crumbs`
			}),
			r && /* @__PURE__ */ y("div", {
				className: "flex shrink-0 items-center",
				children: r
			}),
			i && /* @__PURE__ */ y(P, {
				collapsed: !0,
				onToggle: i,
				"data-testid": `${s}-toggle`
			}),
			a && /* @__PURE__ */ y("div", {
				className: "ml-auto flex shrink-0 items-center gap-2",
				children: a
			})
		]
	});
}
function I({ title: e, description: t, width: i = "lg", "data-testid": a = "header-description" }) {
	return /* @__PURE__ */ y(T, {
		label: `About ${e}`,
		width: i,
		"data-testid": `${a}-card`,
		content: /* @__PURE__ */ b("div", {
			className: "flex flex-col gap-1",
			children: [/* @__PURE__ */ y(s, {
				as: "p",
				size: "sm",
				weight: "semibold",
				tone: "primary",
				wrap: !0,
				children: e
			}), /* @__PURE__ */ y("div", {
				className: "whitespace-pre-line text-xs text-text-secondary",
				"data-testid": `${a}-text`,
				children: t
			})]
		}),
		children: (t) => /* @__PURE__ */ y(n, {
			...t,
			"aria-label": `About ${e}`,
			variant: "ghost",
			size: "sm",
			icon: /* @__PURE__ */ y(r, { size: 14 }),
			className: "shrink-0 text-text-secondary",
			"data-testid": `${a}-trigger`
		})
	});
}
function L(e) {
	return (e ?? []).filter((e) => e.people.length > 0 || !!e.action);
}
function R({ groups: e, density: t, "data-testid": n = "header-people" }) {
	let r = L(e);
	return r.length === 0 ? null : t === "compact" ? /* @__PURE__ */ y("div", {
		className: "flex min-w-0 shrink-0 items-center gap-2",
		"data-testid": n,
		children: r.map((e, t) => /* @__PURE__ */ b("div", {
			role: "group",
			"aria-label": e.label,
			className: "flex items-center gap-1",
			"data-testid": `${n}-${e.label.toLowerCase()}`,
			children: [
				t > 0 && /* @__PURE__ */ y("span", {
					"aria-hidden": "true",
					className: "mr-1 h-4 w-px shrink-0 bg-border"
				}),
				e.people.map((t) => /* @__PURE__ */ y(l, {
					content: `${t.name} · ${e.label}`,
					"data-testid": `${n}-tip-${t.id}`,
					children: /* @__PURE__ */ y("span", {
						tabIndex: 0,
						role: "img",
						"aria-label": `${t.name}, ${e.label}`,
						className: "inline-flex rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
						"data-testid": `${n}-person-${t.id}`,
						children: /* @__PURE__ */ y(u, {
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
	}) : /* @__PURE__ */ y("div", {
		className: "flex min-w-0 flex-wrap items-center gap-x-6 gap-y-2",
		"data-testid": n,
		children: r.map((e) => /* @__PURE__ */ b("div", {
			role: "group",
			"aria-label": e.label,
			className: "flex min-w-0 items-center gap-3",
			"data-testid": `${n}-${e.label.toLowerCase()}`,
			children: [
				/* @__PURE__ */ y(s, {
					size: "sm",
					tone: "tertiary",
					className: "shrink-0",
					children: e.label
				}),
				e.people.map((e) => /* @__PURE__ */ b("span", {
					className: "flex min-w-0 items-center gap-2",
					"data-testid": `${n}-person-${e.id}`,
					children: [/* @__PURE__ */ y(u, {
						name: e.name,
						size: 32,
						...e.avatarUrl ? { src: e.avatarUrl } : {},
						...e.color ? { color: e.color } : {}
					}), /* @__PURE__ */ y(s, {
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
function z({ title: n, description: r, actions: a, back: s, badge: c, size: u = "md", breadcrumbs: f, density: p, collapsed: m = !1, onToggleCollapsed: h, people: g, info: _, meta: x, tabs: S, activeTab: C, onTabChange: w, className: T, "data-testid": E = "page-header" }) {
	let D = t(p), O = L(g), k = !!f && f.length > 0, A = S && S.length > 0 ? /* @__PURE__ */ y(o, {
		items: S.map((e) => ({
			id: e.id,
			label: e.label,
			...e.count == null ? {} : { badge: e.count },
			...e.disabled ? { disabled: !0 } : {},
			testId: `${E}-tab-${e.id}`
		})),
		value: C && S.some((e) => e.id === C) ? C : S[0].id,
		onValueChange: (e) => w?.(e),
		variant: "underline",
		size: "md",
		badgeStyle: "plain",
		indicator: "bar",
		indicatorWeight: 3,
		"aria-label": `${n} views`,
		className: e("gap-0", m || D === "compact" ? "mt-0" : "mt-3"),
		"data-testid": `${E}-tabs`
	}) : null, j = k ? /* @__PURE__ */ y(d, {
		items: f,
		separator: "›",
		maxItems: 5,
		className: "min-w-0",
		"data-testid": `${E}-crumbs`
	}) : null, M = h ? /* @__PURE__ */ y(P, {
		collapsed: m,
		onToggle: h,
		"data-testid": `${E}-collapse-toggle`
	}) : null, N = s ? /* @__PURE__ */ y(l, {
		content: s.label,
		children: /* @__PURE__ */ y("a", {
			href: s.to,
			onClick: s.onClick,
			"aria-label": s.label,
			className: "inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-text-secondary hover:bg-primary/10 hover:text-primary focus-visible:outline-2 focus-visible:outline-primary",
			children: /* @__PURE__ */ y(i, {
				dir: "left",
				size: 16
			})
		})
	}) : null;
	return m ? /* @__PURE__ */ b("div", {
		className: e("flex min-w-0 flex-col gap-1", k && "pt-2", T),
		"data-testid": E,
		"data-density": D,
		"data-collapsed": "true",
		children: [/* @__PURE__ */ b("div", {
			className: "flex min-w-0 items-center gap-2",
			children: [N, /* @__PURE__ */ y("div", {
				className: "min-w-0 flex-1",
				children: /* @__PURE__ */ y(F, {
					breadcrumbs: f,
					title: n,
					badge: c,
					actions: a,
					"data-testid": `${E}-fold`,
					...h ? { onExpand: h } : {}
				})
			})]
		}), A]
	}) : D === "compact" ? /* @__PURE__ */ b("div", {
		className: e("flex min-w-0 flex-col gap-1", k && "pt-2", T),
		"data-testid": E,
		"data-density": "compact",
		"data-collapsed": "false",
		children: [
			j,
			/* @__PURE__ */ b("div", {
				className: "flex h-7 min-w-0 items-center gap-3",
				"data-testid": `${E}-row`,
				children: [
					N,
					/* @__PURE__ */ b("div", {
						className: "flex min-w-0 flex-1 items-center gap-2",
						children: [
							/* @__PURE__ */ y("h1", {
								className: e("m-0 min-w-0 truncate font-semibold text-[var(--color-text-primary)]", u === "sm" ? "text-sm leading-5" : "text-xl leading-7"),
								title: n,
								"data-title-size": u,
								children: n
							}),
							c,
							_ ?? (r || x ? /* @__PURE__ */ y(I, {
								title: n,
								width: x ? "xl" : "lg",
								description: /* @__PURE__ */ b(v, { children: [r, x && /* @__PURE__ */ y("div", {
									className: "mt-2 whitespace-normal",
									children: x
								})] }),
								"data-testid": `${E}-description`
							}) : null),
							O.length > 0 && /* @__PURE__ */ y("div", {
								className: "flex min-w-0 shrink-[8] overflow-hidden",
								children: /* @__PURE__ */ y(R, {
									groups: O,
									density: "compact",
									"data-testid": `${E}-people`
								})
							}),
							M
						]
					}),
					a && /* @__PURE__ */ y("div", {
						className: "flex flex-shrink-0 items-center gap-2",
						children: a
					})
				]
			}),
			A
		]
	}) : /* @__PURE__ */ b("div", {
		className: e("flex flex-col gap-1.5", k && "pt-3", T),
		"data-testid": E,
		"data-density": "comfortable",
		"data-collapsed": "false",
		children: [
			j && /* @__PURE__ */ y("div", {
				className: "mb-2.5",
				children: j
			}),
			s && /* @__PURE__ */ b("a", {
				href: s.to,
				onClick: s.onClick,
				className: "inline-flex items-center gap-1 text-xs text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] mb-1 w-fit",
				children: [/* @__PURE__ */ y("svg", {
					width: "12",
					height: "12",
					viewBox: "0 0 12 12",
					fill: "none",
					"aria-hidden": "true",
					children: /* @__PURE__ */ y("path", {
						d: "M7 2L3 6l4 4",
						stroke: "currentColor",
						strokeWidth: "1.5",
						strokeLinecap: "round",
						strokeLinejoin: "round"
					})
				}), s.label]
			}),
			/* @__PURE__ */ b("div", {
				className: "flex flex-wrap items-center justify-between gap-x-4 gap-y-2",
				children: [/* @__PURE__ */ b("div", {
					className: "min-w-0 flex flex-wrap items-center gap-x-2.5 gap-y-2",
					children: [
						/* @__PURE__ */ y("h1", {
							className: e("font-semibold text-[var(--color-text-primary)] leading-tight", u === "lg" ? "text-[28px] font-bold tracking-[-0.01em]" : u === "sm" ? "text-sm" : "text-xl"),
							children: n
						}),
						c,
						_,
						M
					]
				}), a && /* @__PURE__ */ y("div", {
					className: "flex max-w-full min-w-0 flex-shrink-0 flex-wrap items-center gap-2",
					children: a
				})]
			}),
			r && /* @__PURE__ */ y("p", {
				className: "text-sm text-[var(--color-text-secondary)]",
				children: r
			}),
			O.length > 0 && /* @__PURE__ */ y("div", {
				className: "mt-1",
				children: /* @__PURE__ */ y(R, {
					groups: O,
					density: "comfortable",
					"data-testid": `${E}-people`
				})
			}),
			x && /* @__PURE__ */ y("div", {
				className: "mt-2 min-w-0",
				"data-testid": `${E}-meta`,
				children: x
			}),
			A
		]
	});
}
//#endregion
export { T as _, P as a, F as c, M as d, k as f, S as g, C as h, O as i, E as l, L as m, j as n, I as o, D as p, A as r, R as s, z as t, N as u };
