import { t as e } from "./cn-D4QmbyEy.js";
import { i as t } from "./Density-BgubVeSf.js";
import { a as n, i as r, n as i, o as a, u as o } from "./Text-CEkn6rLG.js";
import { I as s, m as c } from "./Icons-B_xESAH3.js";
import { t as l } from "./Avatar-CmYYkk9C.js";
import { t as u } from "./Tooltip-DWyAb81m.js";
import { n as d } from "./NumberInput-DfHkxDUc.js";
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
var A = n.header, j = 480;
function M({ contentKind: e, containerHeight: t, preference: n }) {
	let r = t != null && t > 0 ? t : null, i = D(e);
	return {
		density: n ?? (i || a(r, A) === "compact" ? "compact" : "comfortable"),
		collapsed: i && r != null && r < 480
	};
}
function N(e, t) {
	let n = [...e ?? []];
	if (!t) return n;
	let r = n[n.length - 1];
	return r && r.label.trim() === t.trim() ? n : [...n, { label: t }];
}
function P({ collapsed: t, onToggle: n, className: r, "data-testid": i = "header-collapse-toggle" }) {
	let a = t ? "Expand header" : "Collapse header";
	return /* @__PURE__ */ y(u, {
		content: a,
		"data-testid": `${i}-tooltip`,
		children: /* @__PURE__ */ y(o, {
			"aria-label": a,
			"aria-expanded": !t,
			variant: "ghost",
			size: "sm",
			icon: /* @__PURE__ */ y(c, {
				size: 14,
				dir: t ? "down" : "up"
			}),
			onClick: n,
			className: e("shrink-0 text-text-secondary", r),
			"data-testid": i,
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
function I({ title: e, description: t, width: n = "lg", "data-testid": r = "header-description" }) {
	return /* @__PURE__ */ y(T, {
		label: `About ${e}`,
		width: n,
		"data-testid": `${r}-card`,
		content: /* @__PURE__ */ b("div", {
			className: "flex flex-col gap-1",
			children: [/* @__PURE__ */ y(i, {
				as: "p",
				size: "sm",
				weight: "semibold",
				tone: "primary",
				wrap: !0,
				children: e
			}), /* @__PURE__ */ y("div", {
				className: "whitespace-pre-line text-xs text-text-secondary",
				"data-testid": `${r}-text`,
				children: t
			})]
		}),
		children: (t) => /* @__PURE__ */ y(o, {
			...t,
			"aria-label": `About ${e}`,
			variant: "ghost",
			size: "sm",
			icon: /* @__PURE__ */ y(s, { size: 14 }),
			className: "shrink-0 text-text-secondary",
			"data-testid": `${r}-trigger`
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
				e.people.map((t) => /* @__PURE__ */ y(u, {
					content: `${t.name} · ${e.label}`,
					"data-testid": `${n}-tip-${t.id}`,
					children: /* @__PURE__ */ y("span", {
						tabIndex: 0,
						role: "img",
						"aria-label": `${t.name}, ${e.label}`,
						className: "inline-flex rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
						"data-testid": `${n}-person-${t.id}`,
						children: /* @__PURE__ */ y(l, {
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
				/* @__PURE__ */ y(i, {
					size: "sm",
					tone: "tertiary",
					className: "shrink-0",
					children: e.label
				}),
				e.people.map((e) => /* @__PURE__ */ b("span", {
					className: "flex min-w-0 items-center gap-2",
					"data-testid": `${n}-person-${e.id}`,
					children: [/* @__PURE__ */ y(l, {
						name: e.name,
						size: 32,
						...e.avatarUrl ? { src: e.avatarUrl } : {},
						...e.color ? { color: e.color } : {}
					}), /* @__PURE__ */ y(i, {
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
function z({ title: n, description: i, actions: a, back: o, badge: s, size: c = "md", breadcrumbs: l, density: u, collapsed: f = !1, onToggleCollapsed: p, people: m, info: h, meta: g, tabs: _, activeTab: x, onTabChange: S, className: C, "data-testid": w = "page-header" }) {
	let T = t(u), E = L(m), D = !!l && l.length > 0, O = _ && _.length > 0 ? /* @__PURE__ */ y(r, {
		items: _.map((e) => ({
			id: e.id,
			label: e.label,
			...e.count == null ? {} : { badge: e.count },
			...e.disabled ? { disabled: !0 } : {},
			testId: `${w}-tab-${e.id}`
		})),
		value: x && _.some((e) => e.id === x) ? x : _[0].id,
		onValueChange: (e) => S?.(e),
		variant: "underline",
		size: "md",
		badgeStyle: "plain",
		indicator: "bar",
		indicatorWeight: 3,
		"aria-label": `${n} views`,
		className: e("gap-0", f || T === "compact" ? "mt-0" : "mt-3"),
		"data-testid": `${w}-tabs`
	}) : null, k = D ? /* @__PURE__ */ y(d, {
		items: l,
		separator: "›",
		maxItems: 5,
		className: "min-w-0",
		"data-testid": `${w}-crumbs`
	}) : null, A = p ? /* @__PURE__ */ y(P, {
		collapsed: f,
		onToggle: p,
		"data-testid": `${w}-collapse-toggle`
	}) : null;
	return f ? /* @__PURE__ */ b("div", {
		className: e("flex min-w-0 flex-col gap-1", D && "pt-2", C),
		"data-testid": w,
		"data-density": T,
		"data-collapsed": "true",
		children: [/* @__PURE__ */ y(F, {
			breadcrumbs: l,
			title: n,
			badge: s,
			actions: a,
			"data-testid": `${w}-fold`,
			...p ? { onExpand: p } : {}
		}), O]
	}) : T === "compact" ? /* @__PURE__ */ b("div", {
		className: e("flex min-w-0 flex-col gap-1", D && "pt-2", C),
		"data-testid": w,
		"data-density": "compact",
		"data-collapsed": "false",
		children: [
			k,
			/* @__PURE__ */ b("div", {
				className: "flex h-7 min-w-0 items-center gap-3",
				"data-testid": `${w}-row`,
				children: [/* @__PURE__ */ b("div", {
					className: "flex min-w-0 flex-1 items-center gap-2",
					children: [
						/* @__PURE__ */ y("h1", {
							className: "m-0 min-w-0 truncate text-sm font-semibold leading-5 text-[var(--color-text-primary)]",
							title: n,
							children: n
						}),
						s,
						h ?? (i || g ? /* @__PURE__ */ y(I, {
							title: n,
							width: g ? "xl" : "lg",
							description: /* @__PURE__ */ b(v, { children: [i, g && /* @__PURE__ */ y("div", {
								className: "mt-2 whitespace-normal",
								children: g
							})] }),
							"data-testid": `${w}-description`
						}) : null),
						E.length > 0 && /* @__PURE__ */ y("div", {
							className: "flex min-w-0 shrink-[8] overflow-hidden",
							children: /* @__PURE__ */ y(R, {
								groups: E,
								density: "compact",
								"data-testid": `${w}-people`
							})
						}),
						A
					]
				}), a && /* @__PURE__ */ y("div", {
					className: "flex flex-shrink-0 items-center gap-2",
					children: a
				})]
			}),
			O
		]
	}) : /* @__PURE__ */ b("div", {
		className: e("flex flex-col gap-1.5", D && "pt-3", C),
		"data-testid": w,
		"data-density": "comfortable",
		"data-collapsed": "false",
		children: [
			k && /* @__PURE__ */ y("div", {
				className: "mb-2.5",
				children: k
			}),
			o && /* @__PURE__ */ b("a", {
				href: o.to,
				onClick: o.onClick,
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
				}), o.label]
			}),
			/* @__PURE__ */ b("div", {
				className: "flex flex-wrap items-center justify-between gap-x-4 gap-y-2",
				children: [/* @__PURE__ */ b("div", {
					className: "min-w-0 flex items-center gap-2.5",
					children: [
						/* @__PURE__ */ y("h1", {
							className: e("font-semibold text-[var(--color-text-primary)] leading-tight", c === "lg" ? "text-[28px] font-bold tracking-[-0.01em]" : "text-xl"),
							children: n
						}),
						s,
						h,
						A
					]
				}), a && /* @__PURE__ */ y("div", {
					className: "flex-shrink-0 flex items-center gap-2",
					children: a
				})]
			}),
			i && /* @__PURE__ */ y("p", {
				className: "text-sm text-[var(--color-text-secondary)]",
				children: i
			}),
			E.length > 0 && /* @__PURE__ */ y("div", {
				className: "mt-1",
				children: /* @__PURE__ */ y(R, {
					groups: E,
					density: "comfortable",
					"data-testid": `${w}-people`
				})
			}),
			g && /* @__PURE__ */ y("div", {
				className: "mt-2 min-w-0",
				"data-testid": `${w}-meta`,
				children: g
			}),
			O
		]
	});
}
//#endregion
export { T as _, P as a, F as c, M as d, k as f, S as g, C as h, O as i, E as l, L as m, j as n, I as o, D as p, A as r, R as s, z as t, N as u };
