import { t as e } from "./cn-D4QmbyEy.js";
import { n as t, r as n } from "./Tabs-C6UIoOMr.js";
import { I as r, m as i } from "./Icons-B_xESAH3.js";
import { t as a } from "./Avatar-CmYYkk9C.js";
import { t as o } from "./Tooltip-DWyAb81m.js";
import { n as s } from "./NumberInput-axCowEor.js";
import { n as c } from "./Text-CrEXEvGa.js";
import { createContext as l, useCallback as u, useContext as d, useEffect as f, useId as p, useLayoutEffect as m, useRef as h, useState as g } from "react";
import { Fragment as _, jsx as v, jsxs as y } from "react/jsx-runtime";
import { createPortal as b } from "react-dom";
//#region src/components/shared/Density.tsx
var x = ["comfortable", "compact"], S = l("comfortable");
function C({ value: e, children: t }) {
	return /* @__PURE__ */ v(S.Provider, {
		value: e,
		children: t
	});
}
function w(e) {
	let t = d(S);
	return e ?? t;
}
//#endregion
//#region src/components/shared/HoverCard.tsx
var T = 300, E = 250, D = {
	sm: "w-64",
	md: "w-72",
	lg: "w-80"
};
function O({ label: t, content: n, children: r, width: i = "md", openOnFocus: a = !0, pinOnKey: o = !0, onOpenChange: s, className: c, "data-testid": l = "hover-card" }) {
	let [d, x] = g(!1), [S, C] = g(!1), w = d || S, T = h(null), E = h(null), O = h(null), k = p(), A = u(() => {
		O.current &&= (clearTimeout(O.current), null);
	}, []), j = u((e, t) => {
		A(), O.current = setTimeout(() => {
			O.current = null, x(e);
		}, t);
	}, [A]);
	f(() => A, [A]);
	let M = h(s);
	M.current = s;
	let N = h(!1);
	f(() => {
		N.current !== w && (N.current = w, M.current?.(w));
	}, [w]);
	let P = u(() => {
		A(), x(!1), C(!1);
	}, [A]);
	return f(() => {
		if (!w) return;
		let e = (e) => {
			e.key === "Escape" && P();
		}, t = (e) => {
			let t = e.target;
			t && (T.current?.contains(t) || E.current?.contains(t)) || P();
		};
		return document.addEventListener("keydown", e), document.addEventListener("mousedown", t), () => {
			document.removeEventListener("keydown", e), document.removeEventListener("mousedown", t);
		};
	}, [w, P]), m(() => {
		if (!w) return;
		let e = T.current, t = E.current;
		if (!e || !t) return;
		let n = e.getBoundingClientRect(), r = t.offsetWidth || 0, i = Math.max(8, Math.min(n.left, window.innerWidth - r - 8));
		t.style.position = "fixed", t.style.top = `${n.bottom + 6}px`, t.style.left = `${i}px`, t.style.zIndex = "9500";
	}, [w]), /* @__PURE__ */ y(_, { children: [r({
		ref: (e) => {
			T.current = e;
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
			if (e.key === "Escape" && w) {
				e.stopPropagation(), P();
				return;
			}
			o && (e.key === "Enter" || e.key === " ") && (A(), C((e) => !e));
		},
		"aria-expanded": w,
		"aria-controls": w ? k : void 0,
		"aria-describedby": w ? k : void 0
	}), w && typeof document < "u" && b(/* @__PURE__ */ v("div", {
		ref: E,
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
		className: e("rounded-lg border border-border bg-surface p-3 shadow-lg", D[i], c),
		children: n
	}), document.body)] });
}
//#endregion
//#region src/components/shared/headerDensity.tsx
var k = [
	"canvas",
	"graph",
	"conversation",
	"document"
];
function A(e) {
	return !!e && k.includes(e);
}
var j = "uic:header-density:";
function M(e, t) {
	return `${j}${e}:${A(t) ? "rich" : "plain"}`;
}
var N = 640, P = 480;
function F({ contentKind: e, containerHeight: t, preference: n }) {
	let r = t != null && t > 0 ? t : null, i = A(e);
	return {
		density: n ?? (i || r != null && r < 640 ? "compact" : "comfortable"),
		collapsed: i && r != null && r < 480
	};
}
function I(e, t) {
	let n = [...e ?? []];
	if (!t) return n;
	let r = n[n.length - 1];
	return r && r.label.trim() === t.trim() ? n : [...n, { label: t }];
}
function L({ collapsed: t, onToggle: r, className: a, "data-testid": s = "header-collapse-toggle" }) {
	let c = t ? "Expand header" : "Collapse header";
	return /* @__PURE__ */ v(o, {
		content: c,
		"data-testid": `${s}-tooltip`,
		children: /* @__PURE__ */ v(n, {
			"aria-label": c,
			"aria-expanded": !t,
			variant: "ghost",
			size: "sm",
			icon: /* @__PURE__ */ v(i, {
				size: 14,
				dir: t ? "down" : "up"
			}),
			onClick: r,
			className: e("shrink-0 text-text-secondary", a),
			"data-testid": s,
			"data-collapsed": t ? "true" : "false"
		})
	});
}
function R({ breadcrumbs: t, title: n, badge: r, onExpand: i, actions: a, className: o, "data-testid": c = "header-trail-fold" }) {
	let l = I(t, n);
	return /* @__PURE__ */ y("div", {
		className: e("flex h-7 min-w-0 items-center gap-2", o),
		"data-testid": c,
		children: [
			l.length > 0 && /* @__PURE__ */ v(s, {
				items: l,
				separator: "›",
				maxItems: 5,
				className: "min-w-0",
				"data-testid": `${c}-crumbs`
			}),
			r,
			i && /* @__PURE__ */ v(L, {
				collapsed: !0,
				onToggle: i,
				"data-testid": `${c}-toggle`
			}),
			a && /* @__PURE__ */ v("div", {
				className: "ml-auto flex shrink-0 items-center gap-2",
				children: a
			})
		]
	});
}
function z({ title: e, description: t, "data-testid": i = "header-description" }) {
	return /* @__PURE__ */ v(O, {
		label: `About ${e}`,
		width: "lg",
		"data-testid": `${i}-card`,
		content: /* @__PURE__ */ y("div", {
			className: "flex flex-col gap-1",
			children: [/* @__PURE__ */ v(c, {
				as: "p",
				size: "sm",
				weight: "semibold",
				tone: "primary",
				wrap: !0,
				children: e
			}), /* @__PURE__ */ v("div", {
				className: "whitespace-pre-line text-xs text-text-secondary",
				"data-testid": `${i}-text`,
				children: t
			})]
		}),
		children: (t) => /* @__PURE__ */ v(n, {
			...t,
			"aria-label": `About ${e}`,
			variant: "ghost",
			size: "sm",
			icon: /* @__PURE__ */ v(r, { size: 14 }),
			className: "shrink-0 text-text-secondary",
			"data-testid": `${i}-trigger`
		})
	});
}
function B(e) {
	return (e ?? []).filter((e) => e.people.length > 0 || !!e.action);
}
function V({ groups: e, density: t, "data-testid": n = "header-people" }) {
	let r = B(e);
	return r.length === 0 ? null : t === "compact" ? /* @__PURE__ */ v("div", {
		className: "flex min-w-0 shrink-0 items-center gap-2",
		"data-testid": n,
		children: r.map((e, t) => /* @__PURE__ */ y("div", {
			role: "group",
			"aria-label": e.label,
			className: "flex items-center gap-1",
			"data-testid": `${n}-${e.label.toLowerCase()}`,
			children: [
				t > 0 && /* @__PURE__ */ v("span", {
					"aria-hidden": "true",
					className: "mr-1 h-4 w-px shrink-0 bg-border"
				}),
				e.people.map((t) => /* @__PURE__ */ v(o, {
					content: `${t.name} · ${e.label}`,
					"data-testid": `${n}-tip-${t.id}`,
					children: /* @__PURE__ */ v("span", {
						tabIndex: 0,
						role: "img",
						"aria-label": `${t.name}, ${e.label}`,
						className: "inline-flex rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
						"data-testid": `${n}-person-${t.id}`,
						children: /* @__PURE__ */ v(a, {
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
	}) : /* @__PURE__ */ v("div", {
		className: "flex min-w-0 flex-wrap items-center gap-x-6 gap-y-2",
		"data-testid": n,
		children: r.map((e) => /* @__PURE__ */ y("div", {
			role: "group",
			"aria-label": e.label,
			className: "flex min-w-0 items-center gap-3",
			"data-testid": `${n}-${e.label.toLowerCase()}`,
			children: [
				/* @__PURE__ */ v(c, {
					size: "sm",
					tone: "tertiary",
					className: "shrink-0",
					children: e.label
				}),
				e.people.map((e) => /* @__PURE__ */ y("span", {
					className: "flex min-w-0 items-center gap-2",
					"data-testid": `${n}-person-${e.id}`,
					children: [/* @__PURE__ */ v(a, {
						name: e.name,
						size: 32,
						...e.avatarUrl ? { src: e.avatarUrl } : {},
						...e.color ? { color: e.color } : {}
					}), /* @__PURE__ */ v(c, {
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
function H({ title: n, description: r, actions: i, back: a, badge: o, size: c = "md", breadcrumbs: l, density: u, collapsed: d = !1, onToggleCollapsed: f, people: p, info: m, meta: h, tabs: g, activeTab: b, onTabChange: x, className: S, "data-testid": C = "page-header" }) {
	let T = w(u), E = B(p), D = !!l && l.length > 0, O = g && g.length > 0 ? /* @__PURE__ */ v(t, {
		items: g.map((e) => ({
			id: e.id,
			label: e.label,
			...e.count == null ? {} : { badge: e.count },
			...e.disabled ? { disabled: !0 } : {},
			testId: `${C}-tab-${e.id}`
		})),
		value: b && g.some((e) => e.id === b) ? b : g[0].id,
		onValueChange: (e) => x?.(e),
		variant: "underline",
		size: "md",
		badgeStyle: "plain",
		indicator: "bar",
		indicatorWeight: 3,
		"aria-label": `${n} views`,
		className: e("gap-0", d || T === "compact" ? "mt-1" : "mt-3"),
		"data-testid": `${C}-tabs`
	}) : null, k = D ? /* @__PURE__ */ v(s, {
		items: l,
		separator: "›",
		maxItems: 5,
		className: "min-w-0",
		"data-testid": `${C}-crumbs`
	}) : null, A = f ? /* @__PURE__ */ v(L, {
		collapsed: d,
		onToggle: f,
		"data-testid": `${C}-collapse-toggle`
	}) : null;
	return d ? /* @__PURE__ */ y("div", {
		className: e("flex min-w-0 flex-col", D && "pt-2", S),
		"data-testid": C,
		"data-density": T,
		"data-collapsed": "true",
		children: [/* @__PURE__ */ v(R, {
			breadcrumbs: l,
			title: n,
			badge: o,
			actions: i,
			"data-testid": `${C}-fold`,
			...f ? { onExpand: f } : {}
		}), O]
	}) : T === "compact" ? /* @__PURE__ */ y("div", {
		className: e("flex min-w-0 flex-col gap-1", D && "pt-2", S),
		"data-testid": C,
		"data-density": "compact",
		"data-collapsed": "false",
		children: [
			k,
			/* @__PURE__ */ y("div", {
				className: "flex h-7 min-w-0 items-center gap-3",
				"data-testid": `${C}-row`,
				children: [/* @__PURE__ */ y("div", {
					className: "flex min-w-0 flex-1 items-center gap-2",
					children: [
						/* @__PURE__ */ v("h1", {
							className: "m-0 min-w-0 truncate text-sm font-semibold leading-5 text-[var(--color-text-primary)]",
							title: n,
							children: n
						}),
						o,
						m ?? (r || h ? /* @__PURE__ */ v(z, {
							title: n,
							description: /* @__PURE__ */ y(_, { children: [r, h && /* @__PURE__ */ v("div", {
								className: "mt-2 whitespace-normal",
								children: h
							})] }),
							"data-testid": `${C}-description`
						}) : null),
						E.length > 0 && /* @__PURE__ */ v(V, {
							groups: E,
							density: "compact",
							"data-testid": `${C}-people`
						}),
						A
					]
				}), i && /* @__PURE__ */ v("div", {
					className: "flex flex-shrink-0 items-center gap-2",
					children: i
				})]
			}),
			O
		]
	}) : /* @__PURE__ */ y("div", {
		className: e("flex flex-col gap-1.5", D && "pt-3", S),
		"data-testid": C,
		"data-density": "comfortable",
		"data-collapsed": "false",
		children: [
			k && /* @__PURE__ */ v("div", {
				className: "mb-2.5",
				children: k
			}),
			a && /* @__PURE__ */ y("a", {
				href: a.to,
				onClick: a.onClick,
				className: "inline-flex items-center gap-1 text-xs text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] mb-1 w-fit",
				children: [/* @__PURE__ */ v("svg", {
					width: "12",
					height: "12",
					viewBox: "0 0 12 12",
					fill: "none",
					"aria-hidden": "true",
					children: /* @__PURE__ */ v("path", {
						d: "M7 2L3 6l4 4",
						stroke: "currentColor",
						strokeWidth: "1.5",
						strokeLinecap: "round",
						strokeLinejoin: "round"
					})
				}), a.label]
			}),
			/* @__PURE__ */ y("div", {
				className: "flex flex-wrap items-center justify-between gap-x-4 gap-y-2",
				children: [/* @__PURE__ */ y("div", {
					className: "min-w-0 flex items-center gap-2.5",
					children: [
						/* @__PURE__ */ v("h1", {
							className: e("font-semibold text-[var(--color-text-primary)] leading-tight", c === "lg" ? "text-[28px] font-bold tracking-[-0.01em]" : "text-xl"),
							children: n
						}),
						o,
						m,
						A
					]
				}), i && /* @__PURE__ */ v("div", {
					className: "flex-shrink-0 flex items-center gap-2",
					children: i
				})]
			}),
			r && /* @__PURE__ */ v("p", {
				className: "text-sm text-[var(--color-text-secondary)]",
				children: r
			}),
			E.length > 0 && /* @__PURE__ */ v("div", {
				className: "mt-1",
				children: /* @__PURE__ */ v(V, {
					groups: E,
					density: "comfortable",
					"data-testid": `${C}-people`
				})
			}),
			h && /* @__PURE__ */ v("div", {
				className: "mt-2 min-w-0",
				"data-testid": `${C}-meta`,
				children: h
			}),
			O
		]
	});
}
//#endregion
export { O as _, L as a, w as b, R as c, F as d, M as f, T as g, E as h, j as i, k as l, B as m, P as n, z as o, A as p, N as r, V as s, H as t, I as u, x as v, C as y };
