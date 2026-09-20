import { t as e } from "./usePrefersReducedMotion-Cllucr7i.js";
import { t } from "./cn-DhjIN-s0.js";
import { t as n } from "./Button-BhS4-R6_.js";
import { t as r } from "./Card-RQCeAPNU.js";
import { t as i } from "./IconButton-C3DMtvSx.js";
import { t as a } from "./Chip-BENLwTlq.js";
import { t as o } from "./EmptyState-JzzL2z1E.js";
import { t as s } from "./Spinner-CLcq5z8N.js";
import { t as c } from "./SkeletonCard-CGe8XFPB.js";
import { t as l } from "./Input-DLknWXri.js";
import { t as u } from "./Avatar-BzicCOft.js";
import { t as d } from "./InlineAlert-CRnIKeAF.js";
import { t as f } from "./Checkbox-DqN9RkXK.js";
/* empty css               */
import { useCallback as p, useEffect as m, useId as h, useMemo as g, useRef as _, useState as v } from "react";
import { Fragment as y, jsx as b, jsxs as x } from "react/jsx-runtime";
import { Background as S, BaseEdge as C, Controls as w, Handle as T, Position as E, ReactFlow as D, getBezierPath as O } from "@xyflow/react";
//#region src/components/graph/layout.ts
function k(e) {
	let t = e.find((e) => e.group === "center");
	if (t) return t;
	let n = null, r = !1;
	for (let t of e) typeof t.weight == "number" && (!n || t.weight > n.weight ? (n = t, r = !1) : t.weight === n.weight && (r = !0));
	return n && !r ? n : null;
}
function A(e) {
	let t = [];
	for (let n of e) {
		let e = n.group ?? "";
		e !== "center" && (t.includes(e) || t.push(e));
	}
	return t;
}
function j(e, t, n, r) {
	if (e.length === 0) return /* @__PURE__ */ new Map();
	switch (n) {
		case "grid": return M(e, r);
		case "force": return N(e, t, r);
		default: return ee(e, r);
	}
}
function ee(e, { width: t, height: n, padding: r = 40 }) {
	let i = /* @__PURE__ */ new Map(), a = t / 2, o = n / 2, s = k(e), c = e.filter((e) => e !== s);
	if (s && i.set(s.id, {
		x: a,
		y: o
	}), c.length === 0) return i;
	let l = A(c), u = /* @__PURE__ */ new Map();
	for (let e of c) {
		let t = e.group ?? "", n = u.get(t) ?? [];
		n.push(e), u.set(t, n);
	}
	let d = Math.max(24, Math.min(t, n) / 2 - r), f = l.length > 1 ? Math.max(24, d * .45) : d;
	return l.forEach((e, t) => {
		let n = u.get(e) ?? [], r = l.length > 1 ? f + (d - f) * t / (l.length - 1) : d, s = 2 * Math.PI / n.length, c = -Math.PI / 2 + t * s / 2;
		n.forEach((e, t) => {
			let n = c + t * s;
			i.set(e.id, {
				x: P(a + r * Math.cos(n)),
				y: P(o + r * Math.sin(n))
			});
		});
	}), i;
}
function M(e, { width: t, height: n, padding: r = 40 }) {
	let i = /* @__PURE__ */ new Map(), a = [];
	for (let t of e) {
		let e = t.group ?? "";
		a.includes(e) || a.push(e);
	}
	a.sort((e, t) => e === "center" ? -1 : +(t === "center"));
	let o = Math.max(1, t - r * 2), s = Math.max(1, n - r * 2);
	return a.forEach((t, c) => {
		let l = e.filter((e) => (e.group ?? "") === t), u = a.length === 1 ? n / 2 : r + s * c / (a.length - 1);
		l.forEach((e, t) => {
			let n = r + o * (t + .5) / l.length;
			i.set(e.id, {
				x: P(n),
				y: P(u)
			});
		});
	}), i;
}
function N(e, t, { width: n, height: r, padding: i = 40 }) {
	let a = e.length, o = new Map(e.map((e, t) => [e.id, t])), s = new Float64Array(a), c = new Float64Array(a);
	for (let e = 0; e < a; e++) {
		let t = 2 * Math.PI * e / a;
		s[e] = Math.cos(t) * 100, c[e] = Math.sin(t) * 100;
	}
	if (a === 1) return /* @__PURE__ */ new Map([[e[0].id, {
		x: n / 2,
		y: r / 2
	}]]);
	let l = [];
	for (let e of t) {
		let t = o.get(e.from), n = o.get(e.to);
		t !== void 0 && n !== void 0 && t !== n && l.push([
			t,
			n,
			Math.max(.25, e.weight ?? 1)
		]);
	}
	let u = Math.sqrt(9e4 / a), d = new Float64Array(a), f = new Float64Array(a);
	for (let e = 0; e < 120; e++) {
		let t = 60 * (1 - e / 120) + .5;
		d.fill(0), f.fill(0);
		for (let e = 0; e < a; e++) for (let t = e + 1; t < a; t++) {
			let n = s[e] - s[t], r = c[e] - c[t], i = Math.hypot(n, r);
			i < .01 && (n = .01 * (e - t), r = .01, i = Math.hypot(n, r));
			let a = u * u / i;
			d[e] += n / i * a, f[e] += r / i * a, d[t] -= n / i * a, f[t] -= r / i * a;
		}
		for (let [e, t, n] of l) {
			let r = s[e] - s[t], i = c[e] - c[t], a = Math.hypot(r, i) || .01, o = a * a / u * n;
			d[e] -= r / a * o, f[e] -= i / a * o, d[t] += r / a * o, f[t] += i / a * o;
		}
		for (let e = 0; e < a; e++) {
			d[e] -= s[e] * .05, f[e] -= c[e] * .05;
			let n = Math.hypot(d[e], f[e]) || 1, r = Math.min(n, t);
			s[e] += d[e] / n * r, c[e] += f[e] / n * r;
		}
	}
	let p = Infinity, m = -Infinity, h = Infinity, g = -Infinity;
	for (let e = 0; e < a; e++) p = Math.min(p, s[e]), m = Math.max(m, s[e]), h = Math.min(h, c[e]), g = Math.max(g, c[e]);
	let _ = Math.max(1, m - p), v = Math.max(1, g - h), y = Math.min((n - i * 2) / _, (r - i * 2) / v), b = (n - _ * y) / 2, x = (r - v * y) / 2, S = /* @__PURE__ */ new Map();
	return e.forEach((e, t) => {
		S.set(e.id, {
			x: P(b + (s[t] - p) * y),
			y: P(x + (c[t] - h) * y)
		});
	}), S;
}
function P(e) {
	return Math.round(e * 100) / 100;
}
//#endregion
//#region src/components/graph/NodeGraph.tsx
var F = 480, I = [
	{
		fill: "fill-info",
		bg: "bg-info"
	},
	{
		fill: "fill-success",
		bg: "bg-success"
	},
	{
		fill: "fill-warning",
		bg: "bg-warning"
	},
	{
		fill: "fill-accent",
		bg: "bg-accent"
	},
	{
		fill: "fill-caution",
		bg: "bg-caution"
	},
	{
		fill: "fill-danger",
		bg: "bg-danger"
	},
	{
		fill: "fill-neutral",
		bg: "bg-neutral"
	}
], te = {
	fill: "fill-primary",
	bg: "bg-primary"
};
function L(e, t) {
	if (e === "center") return te;
	let n = t.indexOf(e ?? "");
	return I[(n < 0 ? 0 : n) % I.length];
}
var ne = .5, re = 4, ie = {
	x: 0,
	y: 0,
	k: 1
};
function R({ nodes: e, edges: n, layout: r = "radial", selectedId: a = null, onSelect: o, height: s = 320, className: c, "data-testid": l = "node-graph" }) {
	let u = g(() => j(e, n, r, {
		width: 480,
		height: s
	}), [
		e,
		n,
		r,
		480,
		s
	]), d = g(() => A(e), [e]), f = g(() => k(e), [e]), p = g(() => ae(e, f), [e, f]), [h, S] = v(ie), [C, w] = v(null), T = _(null), E = _(null), [D, O] = v(!1), ee = () => {
		let e = T.current?.getBoundingClientRect();
		return e && e.width > 0 ? 480 / e.width : 1;
	};
	m(() => {
		let e = T.current;
		if (!e) return;
		let t = (t) => {
			t.preventDefault();
			let n = e.getBoundingClientRect(), r = n.width > 0 ? 480 / n.width : 1, i = (t.clientX - n.left) * r, a = (t.clientY - n.top) * r;
			S((e) => {
				let n = z(e.k * (t.deltaY < 0 ? 1.1 : 1 / 1.1), ne, re), r = n / e.k;
				return {
					k: n,
					x: i - (i - e.x) * r,
					y: a - (a - e.y) * r
				};
			});
		};
		return e.addEventListener("wheel", t, { passive: !1 }), () => e.removeEventListener("wheel", t);
	}, [480]);
	let M = (e) => {
		e.button === 0 && (E.current = {
			startX: e.clientX,
			startY: e.clientY,
			originX: h.x,
			originY: h.y
		}, O(!0));
	};
	m(() => {
		if (!D) return;
		let e = (e) => {
			let t = E.current;
			if (!t) return;
			let n = ee();
			S((r) => ({
				...r,
				x: t.originX + (e.clientX - t.startX) * n,
				y: t.originY + (e.clientY - t.startY) * n
			}));
		}, t = () => {
			E.current = null, O(!1);
		};
		return window.addEventListener("mousemove", e), window.addEventListener("mouseup", t), () => {
			window.removeEventListener("mousemove", e), window.removeEventListener("mouseup", t);
		};
	}, [D]);
	let N = (e) => o?.(e), P = (e, t) => {
		(e.key === "Enter" || e.key === " ") && (e.preventDefault(), N(t));
	}, F = h.x === 0 && h.y === 0 && h.k === 1, I = g(() => new Map(e.map((e) => [e.id, e])), [e]);
	return /* @__PURE__ */ x("div", {
		className: t("relative flex flex-col overflow-hidden rounded-lg border border-border bg-surface", c),
		"data-testid": l,
		children: [
			/* @__PURE__ */ b("svg", {
				ref: T,
				role: "img",
				"aria-label": `Graph of ${e.length} nodes`,
				viewBox: `0 0 480 ${s}`,
				width: "100%",
				height: s,
				className: t("block select-none touch-none", D ? "cursor-grabbing" : "cursor-grab"),
				onMouseDown: M,
				"data-testid": `${l}-svg`,
				children: /* @__PURE__ */ x("g", {
					transform: `translate(${h.x} ${h.y}) scale(${h.k})`,
					"data-testid": `${l}-viewport`,
					children: [n.map((e, t) => {
						let n = u.get(e.from), r = u.get(e.to);
						if (!n || !r) return null;
						let i = a !== null && (e.from === a || e.to === a);
						return /* @__PURE__ */ x("g", {
							"data-testid": `${l}-edge-${e.from}-${e.to}`,
							children: [/* @__PURE__ */ b("line", {
								x1: n.x,
								y1: n.y,
								x2: r.x,
								y2: r.y,
								strokeWidth: oe(e.weight),
								className: i ? "stroke-primary" : "stroke-border-emphasis"
							}), e.label && /* @__PURE__ */ b("text", {
								x: (n.x + r.x) / 2,
								y: (n.y + r.y) / 2 - 4,
								textAnchor: "middle",
								className: "fill-text-tertiary text-[10px]",
								"data-testid": `${l}-edge-label-${e.from}-${e.to}`,
								children: e.label
							})]
						}, `${e.from}->${e.to}#${t}`);
					}), e.map((e) => {
						let n = u.get(e.id);
						if (!n) return null;
						let r = p.get(e.id) ?? 16, i = e.id === a, o = L(e.group, d), s = `${l}-clip-${e.id}`;
						return /* @__PURE__ */ x("g", {
							role: "button",
							tabIndex: 0,
							"aria-label": e.sublabel ? `${e.label}, ${e.sublabel}` : e.label,
							"aria-pressed": i,
							transform: `translate(${n.x} ${n.y})`,
							className: "cursor-pointer outline-none",
							onClick: (t) => {
								t.stopPropagation(), N(e);
							},
							onMouseDown: (e) => e.stopPropagation(),
							onKeyDown: (t) => P(t, e),
							onFocus: () => w(e.id),
							onBlur: () => w((t) => t === e.id ? null : t),
							"data-testid": `${l}-node-${e.id}`,
							"data-selected": i || void 0,
							children: [
								/* @__PURE__ */ b("title", { children: e.sublabel ?? e.label }),
								(i || C === e.id) && /* @__PURE__ */ b("circle", {
									r: r + 4,
									className: t("fill-none", i ? "stroke-primary" : "stroke-border-emphasis"),
									strokeWidth: 2,
									strokeDasharray: i ? void 0 : "3 3"
								}),
								e.avatarUrl ? /* @__PURE__ */ x(y, { children: [
									/* @__PURE__ */ b("clipPath", {
										id: s,
										children: /* @__PURE__ */ b("circle", { r })
									}),
									/* @__PURE__ */ b("circle", {
										r,
										className: t("stroke-surface", o.fill),
										strokeWidth: 2
									}),
									/* @__PURE__ */ b("image", {
										href: e.avatarUrl,
										x: -r,
										y: -r,
										width: r * 2,
										height: r * 2,
										clipPath: `url(#${s})`,
										preserveAspectRatio: "xMidYMid slice"
									})
								] }) : /* @__PURE__ */ b("circle", {
									r,
									fill: e.color,
									className: t("stroke-surface", !e.color && o.fill),
									strokeWidth: 2
								}),
								!e.avatarUrl && /* @__PURE__ */ b("text", {
									y: 1,
									textAnchor: "middle",
									dominantBaseline: "middle",
									className: "pointer-events-none fill-white text-[10px] font-semibold",
									children: se(e.label)
								}),
								/* @__PURE__ */ b("text", {
									y: r + 12,
									textAnchor: "middle",
									className: "pointer-events-none fill-text-primary text-[11px]",
									children: e.label
								}),
								e === f && e.sublabel && /* @__PURE__ */ b("text", {
									y: r + 24,
									textAnchor: "middle",
									className: "pointer-events-none fill-text-tertiary text-[10px]",
									children: e.sublabel
								})
							]
						}, e.id);
					})]
				})
			}),
			/* @__PURE__ */ x("div", {
				className: "pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-2",
				children: [d.length > 0 && (d.length > 1 || d[0] !== "") ? /* @__PURE__ */ b("ul", {
					"aria-label": "Legend",
					className: "pointer-events-auto flex flex-wrap gap-x-3 gap-y-1 rounded-md bg-surface/85 px-2 py-1 text-[11px] text-text-secondary",
					"data-testid": `${l}-legend`,
					children: d.map((e) => /* @__PURE__ */ x("li", {
						className: "flex items-center gap-1",
						children: [/* @__PURE__ */ b("span", {
							"aria-hidden": !0,
							className: t("inline-block h-2 w-2 rounded-full", L(e, d).bg)
						}), e || "Other"]
					}, e || "(none)"))
				}) : /* @__PURE__ */ b("span", {}), /* @__PURE__ */ b(i, {
					size: "sm",
					"aria-label": "Reset view",
					title: "Reset view",
					disabled: F,
					onClick: () => S(ie),
					className: "pointer-events-auto bg-surface/85",
					"data-testid": `${l}-reset`,
					children: "⟲"
				})]
			}),
			a && I.get(a) && /* @__PURE__ */ x("span", {
				className: "sr-only",
				"aria-live": "polite",
				children: ["Selected ", I.get(a).label]
			})
		]
	});
}
function ae(e, t) {
	let n = e.map((e) => e.weight).filter((e) => typeof e == "number"), r = Math.min(...n), i = Math.max(...n), a = /* @__PURE__ */ new Map();
	for (let n of e) {
		if (n === t) {
			a.set(n.id, 22);
			continue;
		}
		typeof n.weight == "number" && i > r ? a.set(n.id, Math.round(14 + 10 * (n.weight - r) / (i - r))) : a.set(n.id, 16);
	}
	return a;
}
function oe(e) {
	return typeof e == "number" ? z(1 + e * 1.5, 1, 5) : 1.5;
}
function z(e, t, n) {
	return Math.min(n, Math.max(t, e));
}
function se(e) {
	let t = e.trim().split(/\s+/).filter(Boolean);
	return t.length === 0 ? "" : t.length === 1 ? t[0].slice(0, 2).toUpperCase() : (t[0][0] + t[t.length - 1][0]).toUpperCase();
}
//#endregion
//#region src/components/graph/PeopleGraph.tsx
var B = "__query__";
function V(e, t) {
	let n = e.tags ?? [];
	if (n.length === 0) return;
	let r = (t ?? "").trim().toLowerCase();
	if (r) {
		let e = n.find((e) => {
			let t = e.toLowerCase();
			return r.includes(t) || t.includes(r);
		});
		if (e) return e;
	}
	return n[0];
}
function H(e, t) {
	let n = [{
		id: B,
		label: t?.trim() || "Everyone",
		sublabel: `${e.length} ${e.length === 1 ? "person" : "people"}`,
		group: "center"
	}], r = [];
	for (let i of e) {
		let e = V(i, t);
		n.push({
			id: i.id,
			label: i.name,
			sublabel: i.title,
			group: e,
			weight: i.score,
			avatarUrl: i.avatarUrl
		}), r.push({
			from: B,
			to: i.id,
			label: e,
			weight: i.score
		});
	}
	return {
		nodes: n,
		edges: r
	};
}
function U({ people: e, query: i, onOpenPerson: s, onMessagePerson: c, graphHeight: l = 300, className: d, "data-testid": f = "people-graph" }) {
	let [p, m] = v(null), { nodes: h, edges: _ } = g(() => H(e, i), [e, i]), y = g(() => A(h), [h]);
	return e.length === 0 ? /* @__PURE__ */ b(o, {
		size: "sm",
		icon: "🕸️",
		title: "No people found",
		body: i ? `Nothing matched “${i}”.` : "There is nobody to show yet.",
		testId: `${f}-empty`,
		className: d
	}) : /* @__PURE__ */ b("div", {
		className: t("@container flex min-h-0 flex-col gap-3 p-3", d),
		"data-testid": f,
		children: /* @__PURE__ */ x("div", {
			className: "flex min-h-0 flex-col gap-3 @lg:flex-row",
			children: [/* @__PURE__ */ b(R, {
				nodes: h,
				edges: _,
				layout: "radial",
				height: l,
				selectedId: p,
				onSelect: (e) => m(e.id === "__query__" ? null : e.id),
				className: "@lg:flex-1",
				"data-testid": `${f}-graph`
			}), /* @__PURE__ */ b("ul", {
				className: "flex min-w-0 flex-col gap-2 @lg:w-[260px] @lg:shrink-0",
				"aria-label": "People",
				"data-testid": `${f}-list`,
				children: e.map((e) => {
					let o = V(e, i), l = e.id === p;
					return /* @__PURE__ */ b("li", { children: /* @__PURE__ */ x(r, {
						padding: "none",
						className: t("flex cursor-pointer items-center gap-3 p-2", l && "ring-2 ring-primary"),
						onClick: () => m(l ? null : e.id),
						"data-testid": `${f}-row-${e.id}`,
						"data-selected": l || void 0,
						children: [
							/* @__PURE__ */ b("span", {
								className: t("h-2 w-2 shrink-0 rounded-full", L(o, y).bg),
								"aria-hidden": !0
							}),
							/* @__PURE__ */ b(u, {
								name: e.name,
								src: e.avatarUrl,
								size: 28
							}),
							/* @__PURE__ */ x("span", {
								className: "flex min-w-0 flex-1 flex-col",
								children: [
									/* @__PURE__ */ b("span", {
										className: "truncate text-[13px] font-medium text-text-primary",
										children: e.name
									}),
									e.title && /* @__PURE__ */ b("span", {
										className: "truncate text-[11px] text-text-tertiary",
										children: e.title
									}),
									o && /* @__PURE__ */ b("span", {
										className: "mt-0.5",
										children: /* @__PURE__ */ b(a, {
											size: "xs",
											children: o
										})
									})
								]
							}),
							/* @__PURE__ */ x("span", {
								className: "flex shrink-0 items-center gap-1",
								children: [c && /* @__PURE__ */ b(n, {
									size: "sm",
									variant: "secondary",
									onClick: (t) => {
										t.stopPropagation(), c(e.id);
									},
									"data-testid": `${f}-message-${e.id}`,
									children: "Message"
								}), s && /* @__PURE__ */ b(n, {
									size: "sm",
									variant: "ghost",
									onClick: (t) => {
										t.stopPropagation(), s(e.id);
									},
									"data-testid": `${f}-open-${e.id}`,
									children: "Open"
								})]
							})
						]
					}) }, e.id);
				})
			})]
		})
	});
}
//#endregion
//#region src/components/graph/graphPanelRenderer.tsx
function W(e) {
	return Array.isArray(e.people);
}
function ce(e) {
	return (t, n) => /* @__PURE__ */ b(G, {
		panel: t,
		api: n,
		options: e
	});
}
function G({ panel: e, api: t, options: r }) {
	let { load: i, onOpenPerson: a, onMessagePerson: o, onSelectNode: l, graphHeight: u = 300, "data-testid": f = "graph-panel" } = r, [h, g] = v({ status: "loading" }), [_, y] = v(0), [S, C] = v(null);
	m(() => {
		let n = !1;
		return g({ status: "loading" }), i(e).then((e) => {
			n || (g({
				status: "ready",
				data: e
			}), e.title && t.setTitle(e.title));
		}, (e) => {
			n || g({
				status: "error",
				message: e instanceof Error ? e.message : String(e)
			});
		}), () => {
			n = !0;
		};
	}, [
		e.kind,
		e.id,
		_
	]);
	let w = p(() => y((e) => e + 1), []), T = {
		panel: e,
		api: t
	};
	if (h.status === "loading") return /* @__PURE__ */ x("div", {
		className: "relative flex flex-col gap-3 p-3",
		"data-testid": `${f}-loading`,
		"aria-busy": "true",
		children: [
			/* @__PURE__ */ b(c, {
				height: u,
				rounded: "lg"
			}),
			/* @__PURE__ */ b(c, { height: 44 }),
			/* @__PURE__ */ b(c, { height: 44 }),
			/* @__PURE__ */ b("div", {
				className: "absolute inset-0 flex items-center justify-center",
				children: /* @__PURE__ */ b(s, {
					size: "md",
					"aria-label": "Loading graph"
				})
			})
		]
	});
	if (h.status === "error") return /* @__PURE__ */ x("div", {
		className: "flex flex-col gap-2 p-3",
		"data-testid": `${f}-error`,
		children: [/* @__PURE__ */ x(d, {
			tone: "error",
			children: ["Could not load this graph: ", h.message]
		}), /* @__PURE__ */ b(n, {
			size: "sm",
			variant: "secondary",
			onClick: w,
			className: "self-start",
			"data-testid": `${f}-retry`,
			children: "Try again"
		})]
	});
	let { data: E } = h;
	return W(E) ? /* @__PURE__ */ b(U, {
		people: E.people,
		query: E.query ?? e.params?.q ?? e.params?.query,
		graphHeight: u,
		onOpenPerson: a ? (e) => a(e, T) : void 0,
		onMessagePerson: o ? (e) => o(e, T) : void 0,
		"data-testid": `${f}-people`
	}) : /* @__PURE__ */ b("div", {
		className: "p-3",
		"data-testid": `${f}-nodes`,
		children: /* @__PURE__ */ b(R, {
			nodes: E.nodes,
			edges: E.edges,
			layout: E.layout ?? "force",
			height: u,
			selectedId: S,
			onSelect: (e) => {
				C(e.id), l?.(e, T);
			},
			"data-testid": `${f}-graph`
		})
	});
}
//#endregion
//#region src/components/graph/work/WorkStatus.tsx
var le = {
	idle: {
		label: "Idle",
		icon: "○",
		tone: "text-text-secondary"
	},
	running: {
		label: "Running",
		icon: "▶",
		tone: "text-info-fg"
	},
	waiting: {
		label: "Waiting",
		icon: "⏸",
		tone: "text-warning-fg"
	},
	completed: {
		label: "Completed",
		icon: "✓",
		tone: "text-success-fg"
	},
	error: {
		label: "Error",
		icon: "!",
		tone: "text-danger-fg"
	},
	stopped: {
		label: "Stopped",
		icon: "■",
		tone: "text-text-tertiary"
	},
	stale: {
		label: "Stale",
		icon: "◌",
		tone: "text-warning-fg"
	}
};
function K({ status: n, sharingFresh: r = !1, label: i, className: a }) {
	let o = e(), s = le[n], c = i ?? s.label, l = n === "running" && r && !o;
	return /* @__PURE__ */ x("span", {
		role: "status",
		"aria-label": i ? `${s.label}: ${i}` : s.label,
		"data-status": n,
		"data-sharing-fresh": r ? "true" : "false",
		className: t("inline-flex items-center gap-1.5 whitespace-nowrap text-xs font-medium", s.tone, a),
		children: [/* @__PURE__ */ b("span", {
			"aria-hidden": "true",
			className: t("inline-flex h-4 w-4 items-center justify-center rounded-full border border-current text-[10px] leading-none", l && "animate-pulse"),
			children: s.icon
		}), /* @__PURE__ */ b("span", { children: c })]
	});
}
//#endregion
//#region src/components/graph/work/WorkNode.tsx
var q = {
	project: "Project",
	terminal: "Terminal",
	agent: "Agent",
	run: "Run",
	document: "Document",
	change: "Change",
	conversation: "Conversation",
	meeting: "Meeting",
	transcript: "Transcript",
	task: "Task"
}, ue = {
	terminal: "observe-terminal",
	document: "view-document",
	conversation: "join-conversation",
	meeting: "join-meeting",
	transcript: "view-transcript",
	run: "view-run"
}, de = {
	terminal: "Observe",
	document: "View",
	conversation: "Join",
	meeting: "Join",
	transcript: "View",
	run: "View"
};
function J(e) {
	if (!e) return null;
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? null : t.toLocaleString(void 0, {
		dateStyle: "medium",
		timeStyle: "short"
	});
}
function fe(e) {
	return e.locked ? "Restricted work item" : e.title.trim() || `${q[e.kind]} (untitled)`;
}
function Y({ node: e, selected: r = !1, sharingFresh: i = !1, onSelect: a, onOpen: o }) {
	let s = fe(e), c = ue[e.kind], l = c !== void 0 && e.capabilities.includes(c), d = de[e.kind] ?? "Open", f = J(e.updatedAt), p = J(e.startedAt), m = J(e.endedAt), h = () => a?.(e.id);
	return /* @__PURE__ */ x("article", {
		role: "group",
		tabIndex: 0,
		"aria-label": `${q[e.kind]}: ${s}`,
		"aria-current": r ? "true" : void 0,
		"data-testid": `work-node-${e.id}`,
		"data-kind": e.kind,
		"data-locked": e.locked ? "true" : "false",
		onClick: h,
		onKeyDown: (e) => {
			(e.key === "Enter" || e.key === " ") && (e.preventDefault(), h());
		},
		className: t("flex min-w-0 flex-col gap-3 rounded-lg border bg-surface p-3 text-left transition-colors", r ? "border-primary ring-2 ring-primary/20" : "border-border hover:bg-surface-hover", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"),
		children: [
			/* @__PURE__ */ x("div", {
				className: "flex min-w-0 items-start gap-2",
				children: [
					/* @__PURE__ */ b(u, {
						name: e.locked ? "Restricted work item" : s,
						...!e.locked && e.avatarUrl ? { src: e.avatarUrl } : {},
						size: 32
					}),
					/* @__PURE__ */ x("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ b("div", {
							className: "mb-1 text-[11px] font-medium uppercase tracking-wide text-text-tertiary",
							children: q[e.kind]
						}), /* @__PURE__ */ b("h3", {
							className: "break-words line-clamp-2 text-sm font-semibold text-text-primary",
							"data-testid": "work-node-title",
							children: s
						})]
					}),
					r && /* @__PURE__ */ b("span", {
						className: "sr-only",
						children: "Selected"
					})
				]
			}),
			/* @__PURE__ */ b(K, {
				status: e.status,
				sharingFresh: i
			}),
			!e.locked && e.description && /* @__PURE__ */ b("p", {
				className: "break-words line-clamp-3 text-xs text-text-secondary",
				children: e.description
			}),
			/* @__PURE__ */ x("dl", {
				className: "grid min-w-0 gap-1 text-[11px] text-text-tertiary",
				children: [
					p && /* @__PURE__ */ x("div", { children: [/* @__PURE__ */ b("dt", {
						className: "inline font-medium",
						children: "Started: "
					}), /* @__PURE__ */ b("dd", {
						className: "inline",
						children: p
					})] }),
					/* @__PURE__ */ x("div", { children: [/* @__PURE__ */ b("dt", {
						className: "inline font-medium",
						children: "Updated: "
					}), /* @__PURE__ */ b("dd", {
						className: "inline",
						children: f ?? "Unknown"
					})] }),
					m && /* @__PURE__ */ x("div", { children: [/* @__PURE__ */ b("dt", {
						className: "inline font-medium",
						children: "Ended: "
					}), /* @__PURE__ */ b("dd", {
						className: "inline",
						children: m
					})] })
				]
			}),
			l && c && /* @__PURE__ */ b(n, {
				size: "sm",
				variant: "secondary",
				disabled: !l || !o,
				"data-capability": c,
				"aria-label": `${d} ${q[e.kind].toLowerCase()}`,
				onClick: (t) => {
					t.stopPropagation(), l && o?.(e.id);
				},
				children: d
			})
		]
	});
}
//#endregion
//#region src/components/graph/work/WorkEdge.tsx
var pe = {
	"works-on": "Works on",
	"runs-in": "Runs in",
	"operates-on": "Operates on",
	produced: "Produced",
	edited: "Edited",
	attended: "Attended",
	discussed: "Discussed",
	"derived-from": "Derived from"
};
function me({ edge: e, selected: n = !1, reducedMotion: r = !1, fromLabel: i, toLabel: a, onSelect: o }) {
	let s = pe[e.relation], c = e.disclosure === "existence", l = c ? "Shared connection" : e.label?.trim() || s;
	return /* @__PURE__ */ x("button", {
		type: "button",
		"aria-label": `${i}: ${s.toLowerCase()} ${a}${c ? ", details restricted" : ""}`,
		"aria-pressed": n,
		"data-testid": `work-edge-${e.id}`,
		"data-relation": e.relation,
		"data-status": e.status,
		"data-disclosure": e.disclosure,
		"data-reduced-motion": r ? "true" : "false",
		onClick: () => o?.(e.id),
		className: t("group flex w-full min-w-0 items-center gap-2 rounded-md border bg-surface px-3 py-2 text-left", !r && "transition-colors duration-150", n ? "border-primary bg-primary/5 ring-2 ring-primary/20" : "border-border hover:border-primary/50 hover:bg-surface-hover", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"),
		children: [
			/* @__PURE__ */ b("span", {
				"aria-hidden": "true",
				className: t("h-px min-w-4 flex-1 bg-border", n ? "bg-primary" : "group-hover:bg-primary/50")
			}),
			/* @__PURE__ */ x("span", {
				className: "min-w-0 flex-1",
				children: [/* @__PURE__ */ b("span", {
					className: "block truncate text-xs font-medium text-text-primary",
					children: l
				}), /* @__PURE__ */ x("span", {
					className: "block truncate text-[11px] text-text-tertiary",
					children: [
						i,
						" → ",
						a
					]
				})]
			}),
			/* @__PURE__ */ b(K, { status: e.status }),
			/* @__PURE__ */ b("span", {
				"aria-hidden": "true",
				className: t("h-px min-w-4 flex-1 bg-border", n ? "bg-primary" : "group-hover:bg-primary/50")
			}),
			n && /* @__PURE__ */ b("span", {
				className: "sr-only",
				children: "Selected"
			})
		]
	});
}
//#endregion
//#region src/components/graph/work/WorkEntityList.tsx
function he(e, t, n) {
	return e?.kind === t && e.id === n;
}
function X(e) {
	return e.locked ? "Restricted work item" : e.title.trim() || "Untitled work item";
}
function ge(e, t) {
	let n = t.get(e.fromId), r = t.get(e.toId), i = n ? X(n) : "Unavailable item", a = r ? X(r) : "Unavailable item";
	return e.label?.trim() || `${i} ${e.relation} ${a}`;
}
function _e({ nodes: e, edges: n, selection: r, onSelectionChange: i, heading: a = "Accessible work graph" }) {
	let o = new Map(e.map((e) => [e.id, e]));
	return /* @__PURE__ */ x("section", {
		"aria-labelledby": "work-entity-list-heading",
		className: "min-w-0 space-y-3",
		children: [/* @__PURE__ */ b("h3", {
			id: "work-entity-list-heading",
			className: "text-sm font-semibold text-text-primary",
			children: a
		}), e.length === 0 && n.length === 0 ? /* @__PURE__ */ b("p", {
			className: "text-sm text-text-secondary",
			children: "No shared work is available."
		}) : /* @__PURE__ */ x("div", {
			className: "grid gap-3 md:grid-cols-2",
			children: [/* @__PURE__ */ x("div", { children: [/* @__PURE__ */ b("h4", {
				className: "mb-1 text-xs font-medium uppercase tracking-wide text-text-tertiary",
				children: "Items"
			}), /* @__PURE__ */ b("ul", {
				className: "space-y-1",
				children: e.map((e) => {
					let n = he(r, "node", e.id);
					return /* @__PURE__ */ b("li", { children: /* @__PURE__ */ x("button", {
						type: "button",
						"aria-label": `Work item: ${X(e)}`,
						"aria-pressed": n,
						onClick: () => i({
							kind: "node",
							id: e.id
						}),
						className: t("w-full rounded-md border px-3 py-2 text-left text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50", n ? "border-primary bg-primary/5" : "border-border hover:bg-surface-hover"),
						children: [/* @__PURE__ */ b("span", {
							className: "block break-words font-medium text-text-primary",
							children: X(e)
						}), /* @__PURE__ */ x("span", {
							className: "text-xs text-text-tertiary",
							children: [
								e.kind,
								" · ",
								e.status
							]
						})]
					}) }, e.id);
				})
			})] }), /* @__PURE__ */ x("div", { children: [/* @__PURE__ */ b("h4", {
				className: "mb-1 text-xs font-medium uppercase tracking-wide text-text-tertiary",
				children: "Relationships"
			}), /* @__PURE__ */ b("ul", {
				className: "space-y-1",
				children: n.map((e) => {
					let n = he(r, "edge", e.id), a = ge(e, o);
					return /* @__PURE__ */ b("li", { children: /* @__PURE__ */ x("button", {
						type: "button",
						"aria-label": `Relationship: ${a}`,
						"aria-pressed": n,
						onClick: () => i({
							kind: "edge",
							id: e.id
						}),
						className: t("w-full rounded-md border px-3 py-2 text-left text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50", n ? "border-primary bg-primary/5" : "border-border hover:bg-surface-hover"),
						children: [/* @__PURE__ */ b("span", {
							className: "block break-words font-medium text-text-primary",
							children: a
						}), /* @__PURE__ */ x("span", {
							className: "text-xs text-text-tertiary",
							children: [
								e.relation,
								" · ",
								e.status
							]
						})]
					}) }, e.id);
				})
			})] })]
		})]
	});
}
//#endregion
//#region src/components/graph/work/WorkInspector.tsx
var ve = {
	message: "Message",
	"view-document": "View document",
	"edit-document": "Edit document",
	"join-conversation": "Join conversation",
	"join-meeting": "Join meeting",
	"observe-terminal": "Observe terminal",
	"control-terminal": "Control terminal",
	"view-transcript": "View transcript",
	"view-run": "View run",
	"dispatch-run": "Dispatch run"
}, ye = /* @__PURE__ */ new Set([
	"view-document",
	"edit-document",
	"join-conversation",
	"join-meeting",
	"observe-terminal",
	"control-terminal",
	"view-transcript",
	"view-run"
]);
function be(e, t, n) {
	if (n) return n.kind === "node" ? e.find((e) => e.id === n.id) : t.find((e) => e.id === n.id);
}
function xe(e) {
	return "kind" in e ? e.locked ? "Restricted work item" : e.title : e.label?.trim() || `${e.relation} relationship`;
}
function Se({ nodes: e, edges: t, selection: r, onSelectionChange: i, onOpen: a, onReference: o, onRequestCollaboration: s }) {
	let c = be(e, t, r);
	if (m(() => {
		r && !c && i(null);
	}, [
		c,
		i,
		r
	]), !r || !c) return /* @__PURE__ */ b("aside", {
		"aria-label": "Work details",
		className: "rounded-lg border border-border bg-surface p-4",
		children: /* @__PURE__ */ b("p", {
			className: "text-sm text-text-secondary",
			children: "Select a work item or relationship to inspect it."
		})
	});
	let l = r, u = c.capabilities.find((e) => ye.has(e));
	return /* @__PURE__ */ x("aside", {
		"aria-label": "Work details",
		className: "space-y-4 rounded-lg border border-border bg-surface p-4",
		children: [
			/* @__PURE__ */ x("div", {
				className: "min-w-0",
				children: [
					/* @__PURE__ */ b("p", {
						className: "text-xs font-medium uppercase tracking-wide text-text-tertiary",
						children: "kind" in c ? c.kind : "Relationship"
					}),
					/* @__PURE__ */ b("h3", {
						className: "break-words text-base font-semibold text-text-primary",
						children: xe(c)
					}),
					/* @__PURE__ */ b("p", {
						className: "text-sm text-text-secondary",
						children: c.status
					}),
					"description" in c && !c.locked && c.description ? /* @__PURE__ */ b("p", {
						className: "mt-2 break-words text-sm text-text-secondary",
						children: c.description
					}) : null
				]
			}),
			/* @__PURE__ */ x("div", {
				className: "flex flex-wrap gap-2",
				children: [u && a ? /* @__PURE__ */ b(n, {
					size: "sm",
					variant: "secondary",
					onClick: () => a(l),
					children: "Open"
				}) : null, o ? /* @__PURE__ */ b(n, {
					size: "sm",
					variant: "secondary",
					onClick: () => o(l),
					children: "Reference"
				}) : null]
			}),
			c.capabilities.length > 0 && s ? /* @__PURE__ */ x("div", { children: [/* @__PURE__ */ b("h4", {
				className: "mb-2 text-xs font-medium uppercase tracking-wide text-text-tertiary",
				children: "Request collaboration"
			}), /* @__PURE__ */ b("div", {
				className: "flex flex-wrap gap-2",
				children: c.capabilities.map((e) => /* @__PURE__ */ b(n, {
					size: "sm",
					variant: "secondary",
					onClick: () => s(l, e),
					children: ve[e]
				}, e))
			})] }) : null
		]
	});
}
//#endregion
//#region src/components/graph/work/WorkSharingControls.tsx
var Ce = [
	{
		value: "existence",
		label: "Existence only"
	},
	{
		value: "summary",
		label: "Summary"
	},
	{
		value: "details",
		label: "Details"
	}
];
function we(e) {
	return e.locked ? "Restricted work item" : e.title.trim() || "Untitled work item";
}
function Te(e) {
	return e.label?.trim() || `${e.relation} relationship`;
}
function Z(e, t, n, r) {
	let i = e[t];
	return {
		...e,
		[t]: r ? i.includes(n) ? i : [...i, n] : i.filter((e) => e !== n)
	};
}
function Ee(e) {
	return e.audience.kind === "organization" ? ["Everyone in your organization"] : e.audience.kind === "people" ? e.audience.personIds : e.audience.conversationIds;
}
function De({ state: e, value: t, availableNodes: r, availableEdges: i, saving: a = !1, error: o, conflict: s = !1, onChange: c, onStart: u, onPause: p, onResume: m, onStop: g }) {
	let _ = h(), v = Ee(t), y = e === "off" ? "Off" : e.charAt(0).toUpperCase() + e.slice(1);
	return /* @__PURE__ */ x("section", {
		"aria-labelledby": "work-sharing-heading",
		className: "space-y-5 rounded-lg border border-border bg-surface p-4",
		children: [
			/* @__PURE__ */ x("div", {
				className: "flex flex-wrap items-start justify-between gap-3",
				children: [/* @__PURE__ */ x("div", { children: [/* @__PURE__ */ b("h3", {
					id: "work-sharing-heading",
					className: "text-base font-semibold text-text-primary",
					children: "Share work activity"
				}), /* @__PURE__ */ b("p", {
					className: "mt-1 text-sm text-text-secondary",
					children: "Sharing is voluntary. Only the audience, work, relationships, and detail selected here are shared."
				})] }), /* @__PURE__ */ b("span", {
					className: "rounded-full border border-border bg-surface-inset px-2.5 py-1 text-xs font-medium text-text-secondary",
					children: y
				})]
			}),
			o ? /* @__PURE__ */ b(d, {
				tone: "error",
				children: o
			}) : null,
			s ? /* @__PURE__ */ b(d, {
				tone: "warning",
				children: "Sharing changed elsewhere. Review the current settings before trying again."
			}) : null,
			a ? /* @__PURE__ */ b("p", {
				role: "status",
				"aria-live": "polite",
				className: "text-sm text-text-secondary",
				children: "Saving sharing settings…"
			}) : null,
			/* @__PURE__ */ x("fieldset", {
				disabled: a,
				className: "space-y-2",
				children: [
					/* @__PURE__ */ b("legend", {
						className: "text-sm font-semibold text-text-primary",
						children: "Audience"
					}),
					/* @__PURE__ */ b("p", {
						className: "text-xs text-text-tertiary",
						children: t.audience.kind === "people" ? "Selected people" : t.audience.kind === "conversation" ? "Selected conversations" : "Organization"
					}),
					v.length > 0 ? /* @__PURE__ */ b("ul", {
						"aria-label": "Current sharing audience",
						className: "flex flex-wrap gap-2",
						children: v.map((e) => /* @__PURE__ */ b("li", {
							className: "max-w-full break-all rounded-md border border-border bg-surface-inset px-2 py-1 text-xs text-text-secondary",
							children: e
						}, e))
					}) : /* @__PURE__ */ b("p", {
						className: "text-sm text-text-secondary",
						children: "No audience selected."
					}),
					/* @__PURE__ */ b("p", {
						className: "text-xs text-text-tertiary",
						children: "Audience choices are provided by the host application."
					})
				]
			}),
			/* @__PURE__ */ x("fieldset", {
				disabled: a,
				className: "space-y-2",
				children: [/* @__PURE__ */ b("legend", {
					className: "text-sm font-semibold text-text-primary",
					children: "Work items"
				}), r.length === 0 ? /* @__PURE__ */ b("p", {
					className: "text-sm text-text-secondary",
					children: "No work items are available."
				}) : /* @__PURE__ */ b("div", {
					className: "space-y-2",
					children: r.map((e) => {
						let n = `${_}-node-${e.id}`;
						return /* @__PURE__ */ x("label", {
							htmlFor: n,
							className: "flex items-start gap-2 rounded-md border border-border px-3 py-2 text-sm text-text-primary",
							children: [/* @__PURE__ */ b(f, {
								id: n,
								checked: t.selectedNodeIds.includes(e.id),
								disabled: a,
								onChange: (n) => c(Z(t, "selectedNodeIds", e.id, n))
							}), /* @__PURE__ */ x("span", {
								className: "min-w-0 break-words",
								children: [/* @__PURE__ */ b("span", {
									className: "block font-medium",
									children: we(e)
								}), /* @__PURE__ */ b("span", {
									className: "text-xs text-text-tertiary",
									children: e.kind
								})]
							})]
						}, e.id);
					})
				})]
			}),
			/* @__PURE__ */ x("fieldset", {
				disabled: a,
				className: "space-y-2",
				children: [/* @__PURE__ */ b("legend", {
					className: "text-sm font-semibold text-text-primary",
					children: "Relationships"
				}), i.length === 0 ? /* @__PURE__ */ b("p", {
					className: "text-sm text-text-secondary",
					children: "No relationships are available."
				}) : /* @__PURE__ */ b("div", {
					className: "space-y-2",
					children: i.map((e) => {
						let n = `${_}-edge-${e.id}`;
						return /* @__PURE__ */ x("label", {
							htmlFor: n,
							className: "flex items-start gap-2 rounded-md border border-border px-3 py-2 text-sm text-text-primary",
							children: [/* @__PURE__ */ b(f, {
								id: n,
								checked: t.selectedEdgeIds.includes(e.id),
								disabled: a,
								onChange: (n) => c(Z(t, "selectedEdgeIds", e.id, n))
							}), /* @__PURE__ */ x("span", {
								className: "min-w-0 break-words",
								children: [/* @__PURE__ */ b("span", {
									className: "block font-medium",
									children: Te(e)
								}), /* @__PURE__ */ b("span", {
									className: "text-xs text-text-tertiary",
									children: e.relation
								})]
							})]
						}, e.id);
					})
				})]
			}),
			/* @__PURE__ */ x("div", {
				className: "grid gap-4 sm:grid-cols-2",
				children: [/* @__PURE__ */ x("label", {
					className: "space-y-1 text-sm font-medium text-text-primary",
					children: [/* @__PURE__ */ b("span", { children: "Detail shared" }), /* @__PURE__ */ b("select", {
						value: t.disclosure,
						disabled: a,
						onChange: (e) => c({
							...t,
							disclosure: e.target.value
						}),
						className: "h-9 w-full rounded-md border border-border-emphasis bg-surface-panel px-2.5 text-sm text-text-primary outline-none focus:border-info focus:ring-1 focus:ring-info/40 disabled:cursor-not-allowed disabled:opacity-50",
						children: Ce.map((e) => /* @__PURE__ */ b("option", {
							value: e.value,
							children: e.label
						}, e.value))
					})]
				}), /* @__PURE__ */ x("label", {
					className: "space-y-1 text-sm font-medium text-text-primary",
					children: [/* @__PURE__ */ b("span", { children: "Live sharing expires" }), /* @__PURE__ */ b(l, {
						type: "datetime-local",
						value: t.expiresAt,
						disabled: a,
						onChange: (e) => c({
							...t,
							expiresAt: e.target.value
						})
					})]
				})]
			}),
			/* @__PURE__ */ x("fieldset", {
				disabled: a,
				className: "space-y-3 rounded-md border border-border p-3",
				children: [
					/* @__PURE__ */ b("legend", {
						className: "px-1 text-sm font-semibold text-text-primary",
						children: "Earlier work"
					}),
					/* @__PURE__ */ x("label", {
						htmlFor: `${_}-history`,
						className: "flex items-start gap-2 text-sm text-text-primary",
						children: [/* @__PURE__ */ b(f, {
							id: `${_}-history`,
							checked: t.history !== void 0,
							disabled: a,
							onChange: (e) => c({
								...t,
								history: e ? {
									dayFrom: "",
									dayThrough: "",
									expiresAt: t.expiresAt
								} : void 0
							})
						}), /* @__PURE__ */ x("span", { children: [/* @__PURE__ */ b("span", {
							className: "block font-medium",
							children: "Share selected history"
						}), /* @__PURE__ */ b("span", {
							className: "block text-xs text-text-tertiary",
							children: "Historical work is never included unless you select this option."
						})] })]
					}),
					t.history ? /* @__PURE__ */ x("div", {
						className: "grid gap-3 sm:grid-cols-3",
						children: [
							/* @__PURE__ */ x("label", {
								className: "space-y-1 text-sm font-medium text-text-primary",
								children: [/* @__PURE__ */ b("span", { children: "First day" }), /* @__PURE__ */ b(l, {
									type: "date",
									value: t.history.dayFrom,
									disabled: a,
									onChange: (e) => c({
										...t,
										history: {
											...t.history,
											dayFrom: e.target.value
										}
									})
								})]
							}),
							/* @__PURE__ */ x("label", {
								className: "space-y-1 text-sm font-medium text-text-primary",
								children: [/* @__PURE__ */ b("span", { children: "Last day" }), /* @__PURE__ */ b(l, {
									type: "date",
									value: t.history.dayThrough,
									disabled: a,
									onChange: (e) => c({
										...t,
										history: {
											...t.history,
											dayThrough: e.target.value
										}
									})
								})]
							}),
							/* @__PURE__ */ x("label", {
								className: "space-y-1 text-sm font-medium text-text-primary",
								children: [/* @__PURE__ */ b("span", { children: "History access expires" }), /* @__PURE__ */ b(l, {
									type: "datetime-local",
									value: t.history.expiresAt,
									disabled: a,
									onChange: (e) => c({
										...t,
										history: {
											...t.history,
											expiresAt: e.target.value
										}
									})
								})]
							})
						]
					}) : null
				]
			}),
			/* @__PURE__ */ x("div", {
				className: "flex flex-wrap gap-2",
				children: [
					e === "off" || e === "stopped" || e === "expired" ? /* @__PURE__ */ b(n, {
						disabled: a,
						onClick: u,
						children: e === "off" ? "Start sharing" : "Start sharing again"
					}) : null,
					e === "active" ? /* @__PURE__ */ b(n, {
						variant: "secondary",
						disabled: a,
						onClick: p,
						children: "Pause sharing"
					}) : null,
					e === "paused" ? /* @__PURE__ */ b(n, {
						disabled: a,
						onClick: m,
						children: "Resume sharing"
					}) : null,
					e === "active" || e === "paused" ? /* @__PURE__ */ b(n, {
						variant: "danger",
						disabled: a,
						onClick: g,
						children: "Stop sharing"
					}) : null
				]
			})
		]
	});
}
//#endregion
//#region src/components/graph/work/WorkReferenceCard.tsx
var Oe = /* @__PURE__ */ new Set([
	"view-document",
	"edit-document",
	"join-conversation",
	"join-meeting",
	"observe-terminal",
	"control-terminal",
	"view-transcript",
	"view-run"
]);
function ke({ target: e, state: t, node: r, edge: i, unavailableLabel: a, onSelect: o, onOpen: s }) {
	let c = e?.kind === "node" ? r : e?.kind === "edge" ? i : void 0;
	if (t === "loading") return /* @__PURE__ */ b("article", {
		"aria-label": "Shared work reference",
		"aria-busy": "true",
		className: "rounded-lg border border-border bg-surface p-3",
		children: /* @__PURE__ */ b("p", {
			role: "status",
			className: "text-sm text-text-secondary",
			children: "Loading shared work…"
		})
	});
	if (t === "unavailable" || !e || !c) return /* @__PURE__ */ b("article", {
		"aria-label": "Shared work reference",
		className: "rounded-lg border border-border bg-surface p-3",
		children: /* @__PURE__ */ b("p", {
			className: "text-sm text-text-secondary",
			children: a ?? "This work item is unavailable."
		})
	});
	let l = e.kind === "node" ? r?.locked ? "Restricted work item" : r?.title : i?.label?.trim() || `${i?.relation ?? "Shared"} relationship`, u = (e.kind === "node" ? r?.capabilities ?? [] : i?.capabilities ?? []).some((e) => Oe.has(e)), d = e;
	return /* @__PURE__ */ x("article", {
		"aria-label": "Shared work reference",
		className: "space-y-3 rounded-lg border border-border bg-surface p-3",
		children: [/* @__PURE__ */ x("button", {
			type: "button",
			"aria-label": `Select reference: ${l}`,
			disabled: !o,
			onClick: () => o?.(d),
			className: "block w-full rounded text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:cursor-default",
			children: [
				/* @__PURE__ */ b("span", {
					className: "block text-xs font-medium uppercase tracking-wide text-text-tertiary",
					children: e.kind === "node" ? r?.kind : "Relationship"
				}),
				/* @__PURE__ */ b("span", {
					className: "block break-words text-sm font-semibold text-text-primary",
					children: l
				}),
				/* @__PURE__ */ b("span", {
					className: "block text-xs text-text-secondary",
					children: c.status
				})
			]
		}), u && s ? /* @__PURE__ */ b(n, {
			size: "sm",
			variant: "secondary",
			onClick: () => s(d),
			children: "Open shared work"
		}) : null]
	});
}
//#endregion
//#region src/components/graph/work/WorkGraph.tsx
var Ae = 328, je = 224, Q = {
	project: 0,
	terminal: 1,
	agent: 2,
	run: 3,
	document: 4,
	change: 5,
	task: 6,
	conversation: 7,
	meeting: 8,
	transcript: 9
};
function Me(e) {
	return e.locked ? "Restricted work item" : e.title.trim() || "Untitled work item";
}
function Ne({ data: e }) {
	return /* @__PURE__ */ x("div", {
		className: "w-[248px]",
		children: [
			/* @__PURE__ */ b(T, {
				type: "target",
				position: E.Left,
				isConnectable: !1,
				className: "opacity-0"
			}),
			/* @__PURE__ */ b(Y, {
				node: e.entity,
				selected: e.selected,
				onSelect: e.onSelect,
				onOpen: e.onOpen
			}),
			/* @__PURE__ */ b(T, {
				type: "source",
				position: E.Right,
				isConnectable: !1,
				className: "opacity-0"
			})
		]
	});
}
function Pe({ id: t, sourceX: n, sourceY: r, targetX: i, targetY: a, sourcePosition: o, targetPosition: s, markerEnd: c, data: l }) {
	let u = e(), [d, f, p] = O({
		sourceX: n,
		sourceY: r,
		targetX: i,
		targetY: a,
		sourcePosition: o,
		targetPosition: s
	});
	if (!l) return null;
	let m = l.entity.status === "running" && !l.entity.endedAt;
	return /* @__PURE__ */ x(y, { children: [
		/* @__PURE__ */ b(C, {
			id: t,
			path: d,
			markerEnd: c,
			interactionWidth: 24,
			className: l.selected ? "stroke-primary" : "stroke-border-emphasis"
		}),
		m && !u ? /* @__PURE__ */ b("circle", {
			r: "4",
			className: "fill-primary",
			"aria-hidden": "true",
			"data-testid": `work-edge-motion-${l.entity.id}`,
			children: /* @__PURE__ */ b("animateMotion", {
				dur: "2s",
				repeatCount: "indefinite",
				path: d
			})
		}) : null,
		/* @__PURE__ */ b("foreignObject", {
			x: f - 104,
			y: p - 40,
			width: "208",
			height: "80",
			className: "overflow-visible",
			children: /* @__PURE__ */ b("div", {
				className: "nodrag nopan w-52",
				"data-work-edge-label": l.entity.id,
				children: /* @__PURE__ */ b(me, {
					edge: l.entity,
					selected: l.selected,
					reducedMotion: u,
					fromLabel: l.fromLabel,
					toLabel: l.toLabel,
					onSelect: l.onSelect
				})
			})
		})
	] });
}
var Fe = { work: Ne }, Ie = { work: Pe };
function Le(e, t) {
	let n = new Set(e.map((e) => e.id)), r = new Map(e.map((e) => [e.id, 0])), i = new Map(e.map((e) => [e.id, []]));
	for (let e of t) !n.has(e.fromId) || !n.has(e.toId) || e.fromId === e.toId || (i.get(e.fromId)?.push(e.toId), r.set(e.toId, (r.get(e.toId) ?? 0) + 1));
	let a = /* @__PURE__ */ new Map(), o = e.filter((e) => r.get(e.id) === 0).sort($).map((e) => e.id);
	for (let e of o) a.set(e, 0);
	for (let e = 0; e < o.length; e += 1) {
		let t = o[e], n = (a.get(t) ?? 0) + 1;
		for (let e of (i.get(t) ?? []).sort()) a.set(e, Math.max(a.get(e) ?? 0, n)), r.set(e, (r.get(e) ?? 1) - 1), r.get(e) === 0 && o.push(e);
	}
	for (let t of [...e].sort($)) a.has(t.id) || a.set(t.id, Q[t.kind] % 4);
	let s = /* @__PURE__ */ new Map();
	for (let t of e) {
		let e = a.get(t.id) ?? 0, n = s.get(e) ?? [];
		n.push(t), s.set(e, n);
	}
	let c = /* @__PURE__ */ new Map();
	for (let [e, t] of s) t.sort($), t.forEach((t, n) => {
		c.set(t.id, {
			x: 48 + e * Ae,
			y: 48 + n * je
		});
	});
	return c;
}
function $(e, t) {
	return Q[e.kind] - Q[t.kind] || e.id.localeCompare(t.id);
}
function Re(e, t, n) {
	return e ? e.kind === "node" ? t.some((t) => t.id === e.id) : n.some((t) => t.id === e.id) : !1;
}
function ze({ state: e, errorMessage: t, onRetry: r }) {
	return e === "loading" ? /* @__PURE__ */ b("div", {
		role: "status",
		"data-testid": "work-graph-loading",
		className: "flex min-h-[22rem] items-center justify-center rounded-lg border border-border bg-surface text-sm text-text-secondary",
		children: "Loading shared work…"
	}) : e === "error" ? /* @__PURE__ */ b(o, {
		testId: "work-graph-error",
		icon: "!",
		title: "Shared work is unavailable",
		description: t || "The work graph could not be loaded.",
		action: r ? /* @__PURE__ */ b(n, {
			onClick: r,
			children: "Try again"
		}) : void 0
	}) : /* @__PURE__ */ b(o, {
		testId: "work-graph-empty",
		icon: "○",
		title: "No shared work",
		description: "There is no shared work available for this day."
	});
}
function Be({ nodes: e, edges: n, selection: r, viewport: i, sources: a = [], state: o = "ready", errorMessage: s, className: c, onSelectionChange: l, onViewportChange: u, onRetry: d, onOpen: f, onReference: p, onRequestCollaboration: h }) {
	let _ = g(() => new Set(e.map((e) => e.id)), [e]), v = g(() => n.filter((e) => _.has(e.fromId) && _.has(e.toId)), [n, _]), y = Re(r, e, v) ? r : null;
	m(() => {
		r && !y && l(null);
	}, [
		y,
		l,
		r
	]);
	let C = Le(e.map((e) => ({
		id: e.id,
		kind: e.kind
	})), v), T = new Map(e.map((e) => [e.id, e])), E = e.map((e) => ({
		id: e.id,
		type: "work",
		position: C.get(e.id) ?? {
			x: 0,
			y: 0
		},
		selected: y?.kind === "node" && y.id === e.id,
		draggable: !1,
		connectable: !1,
		data: {
			entity: e,
			selected: y?.kind === "node" && y.id === e.id,
			onSelect: (e) => l({
				kind: "node",
				id: e
			}),
			onOpen: f ? (e) => f({
				kind: "node",
				id: e
			}) : void 0
		}
	})), O = v.map((e) => ({
		id: e.id,
		type: "work",
		source: e.fromId,
		target: e.toId,
		selected: y?.kind === "edge" && y.id === e.id,
		focusable: !1,
		data: {
			entity: e,
			selected: y?.kind === "edge" && y.id === e.id,
			fromLabel: Me(T.get(e.fromId)),
			toLabel: Me(T.get(e.toId)),
			onSelect: (e) => l({
				kind: "edge",
				id: e
			})
		}
	}));
	if (o === "loading" || o === "error" || o === "empty" || e.length === 0) return /* @__PURE__ */ b("section", {
		"aria-label": "Shared work graph",
		className: t("min-w-0", c),
		children: /* @__PURE__ */ b(ze, {
			state: o === "ready" ? "empty" : o,
			errorMessage: s,
			onRetry: d
		})
	});
	let k = a.filter((e) => e.health !== "available");
	return /* @__PURE__ */ x("section", {
		"aria-label": "Shared work graph",
		className: t("min-w-0 space-y-4", c),
		"data-state": o,
		children: [
			o === "partial" ? /* @__PURE__ */ x("div", {
				role: "status",
				"data-testid": "work-graph-partial",
				className: "rounded-lg border border-warning-border bg-warning-bg px-3 py-2 text-sm text-warning-fg",
				children: [/* @__PURE__ */ b("p", {
					className: "font-medium",
					children: "Some work sources are unavailable or delayed."
				}), k.length > 0 ? /* @__PURE__ */ b("ul", {
					className: "mt-1 list-disc pl-5 text-xs",
					children: k.map((e) => /* @__PURE__ */ b("li", { children: e.message || `${e.source} is ${e.health}.` }, e.source))
				}) : null]
			}) : null,
			/* @__PURE__ */ x("div", {
				className: "grid min-w-0 grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_20rem]",
				"data-testid": "work-graph-layout",
				children: [/* @__PURE__ */ b("div", {
					className: "relative h-[clamp(22rem,55vh,42rem)] min-w-0 overflow-hidden rounded-lg border border-border bg-surface",
					"data-testid": "work-graph-canvas",
					children: /* @__PURE__ */ x(D, {
						nodes: E,
						edges: O,
						nodeTypes: Fe,
						edgeTypes: Ie,
						viewport: i,
						onViewportChange: u,
						onPaneClick: () => l(null),
						minZoom: .35,
						maxZoom: 2.5,
						nodesDraggable: !1,
						nodesConnectable: !1,
						elementsSelectable: !1,
						onlyRenderVisibleElements: !0,
						proOptions: { hideAttribution: !0 },
						children: [/* @__PURE__ */ b(S, {
							gap: 20,
							size: 1,
							color: "var(--color-border)"
						}), /* @__PURE__ */ b(w, { showInteractive: !1 })]
					})
				}), /* @__PURE__ */ b(Se, {
					nodes: e,
					edges: v,
					selection: y,
					onSelectionChange: l,
					onOpen: f,
					onReference: p,
					onRequestCollaboration: h
				})]
			}),
			/* @__PURE__ */ b(_e, {
				nodes: e,
				edges: v,
				selection: y,
				onSelectionChange: l,
				onOpen: f,
				onReference: p,
				onRequestCollaboration: h
			})
		]
	});
}
//#endregion
export { R as _, _e as a, A as b, K as c, W as d, B as f, F as g, H as h, Se as i, G as l, V as m, ke as n, me as o, U as p, De as r, Y as s, Be as t, ce as u, L as v, j as x, k as y };
