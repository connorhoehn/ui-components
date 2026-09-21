import { t as e } from "./usePrefersReducedMotion-Cllucr7i.js";
import { t } from "./cn-DhjIN-s0.js";
import { t as n } from "./Button-BhS4-R6_.js";
import { t as r } from "./Card-RQCeAPNU.js";
import { t as i } from "./IconButton-C3DMtvSx.js";
import { c as a, o } from "./Icons-CQiDn2Ki.js";
import { t as s } from "./Chip-BENLwTlq.js";
import { t as c } from "./EmptyState-JzzL2z1E.js";
import { t as l } from "./Spinner-CLcq5z8N.js";
import { t as u } from "./SkeletonCard-CGe8XFPB.js";
import { n as d, t as f } from "./Tabs-Bc6QoOAC.js";
import { t as p } from "./Input-DLknWXri.js";
import { t as m } from "./Avatar-BzicCOft.js";
import { t as h } from "./TitledFrame-DUsxfZCI.js";
import { t as g } from "./InlineAlert-CRnIKeAF.js";
import { t as _ } from "./Select-CqVokE2v.js";
import { t as v } from "./Checkbox-DqN9RkXK.js";
import { t as y } from "./Tooltip-af4BrR7T.js";
import { n as b } from "./ChatSidePanelRegistry-DvIQqKed.js";
/* empty css               */
import { t as x } from "./AnimatedEdge-OTHCEYJd.js";
import { useCallback as S, useEffect as C, useId as w, useMemo as T, useRef as E, useState as D } from "react";
import { Fragment as O, jsx as k, jsxs as A } from "react/jsx-runtime";
import { Background as j, BaseEdge as M, Controls as N, EdgeLabelRenderer as P, Handle as F, MarkerType as I, Position as L, ReactFlow as R, getBezierPath as z } from "@xyflow/react";
//#region src/components/graph/layout.ts
function B(e) {
	let t = e.find((e) => e.group === "center");
	if (t) return t;
	let n = null, r = !1;
	for (let t of e) typeof t.weight == "number" && (!n || t.weight > n.weight ? (n = t, r = !1) : t.weight === n.weight && (r = !0));
	return n && !r ? n : null;
}
function V(e) {
	let t = [];
	for (let n of e) {
		let e = n.group ?? "";
		e !== "center" && (t.includes(e) || t.push(e));
	}
	return t;
}
function H(e, t, n, r) {
	if (e.length === 0) return /* @__PURE__ */ new Map();
	switch (n) {
		case "grid": return W(e, r);
		case "force": return ee(e, t, r);
		default: return U(e, r);
	}
}
function U(e, { width: t, height: n, padding: r = 40 }) {
	let i = /* @__PURE__ */ new Map(), a = t / 2, o = n / 2, s = B(e), c = e.filter((e) => e !== s);
	if (s && i.set(s.id, {
		x: a,
		y: o
	}), c.length === 0) return i;
	let l = V(c), u = /* @__PURE__ */ new Map();
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
				x: G(a + r * Math.cos(n)),
				y: G(o + r * Math.sin(n))
			});
		});
	}), i;
}
function W(e, { width: t, height: n, padding: r = 40 }) {
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
				x: G(n),
				y: G(u)
			});
		});
	}), i;
}
function ee(e, t, { width: n, height: r, padding: i = 40 }) {
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
			x: G(b + (s[t] - p) * y),
			y: G(x + (c[t] - h) * y)
		});
	}), S;
}
function G(e) {
	return Math.round(e * 100) / 100;
}
//#endregion
//#region src/components/graph/NodeGraph.tsx
var te = 480, ne = [
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
], re = {
	fill: "fill-primary",
	bg: "bg-primary"
};
function K(e, t) {
	if (e === "center") return re;
	let n = t.indexOf(e ?? "");
	return ne[(n < 0 ? 0 : n) % ne.length];
}
var ie = .5, ae = 4, oe = {
	x: 0,
	y: 0,
	k: 1
};
function se({ nodes: e, edges: n, layout: r = "radial", selectedId: a = null, onSelect: o, height: s = 320, className: c, "data-testid": l = "node-graph" }) {
	let u = T(() => H(e, n, r, {
		width: 480,
		height: s
	}), [
		e,
		n,
		r,
		480,
		s
	]), d = T(() => V(e), [e]), f = T(() => B(e), [e]), p = T(() => ce(e, f), [e, f]), [m, h] = D(oe), [g, _] = D(null), v = E(null), y = E(null), [b, x] = D(!1), S = () => {
		let e = v.current?.getBoundingClientRect();
		return e && e.width > 0 ? 480 / e.width : 1;
	};
	C(() => {
		let e = v.current;
		if (!e) return;
		let t = (t) => {
			t.preventDefault();
			let n = e.getBoundingClientRect(), r = n.width > 0 ? 480 / n.width : 1, i = (t.clientX - n.left) * r, a = (t.clientY - n.top) * r;
			h((e) => {
				let n = ue(e.k * (t.deltaY < 0 ? 1.1 : 1 / 1.1), ie, ae), r = n / e.k;
				return {
					k: n,
					x: i - (i - e.x) * r,
					y: a - (a - e.y) * r
				};
			});
		};
		return e.addEventListener("wheel", t, { passive: !1 }), () => e.removeEventListener("wheel", t);
	}, [480]);
	let w = (e) => {
		e.button === 0 && (y.current = {
			startX: e.clientX,
			startY: e.clientY,
			originX: m.x,
			originY: m.y
		}, x(!0));
	};
	C(() => {
		if (!b) return;
		let e = (e) => {
			let t = y.current;
			if (!t) return;
			let n = S();
			h((r) => ({
				...r,
				x: t.originX + (e.clientX - t.startX) * n,
				y: t.originY + (e.clientY - t.startY) * n
			}));
		}, t = () => {
			y.current = null, x(!1);
		};
		return window.addEventListener("mousemove", e), window.addEventListener("mouseup", t), () => {
			window.removeEventListener("mousemove", e), window.removeEventListener("mouseup", t);
		};
	}, [b]);
	let j = (e) => o?.(e), M = (e, t) => {
		(e.key === "Enter" || e.key === " ") && (e.preventDefault(), j(t));
	}, N = m.x === 0 && m.y === 0 && m.k === 1, P = T(() => new Map(e.map((e) => [e.id, e])), [e]);
	return /* @__PURE__ */ A("div", {
		className: t("relative flex flex-col overflow-hidden rounded-lg border border-border bg-surface", c),
		"data-testid": l,
		children: [
			/* @__PURE__ */ k("svg", {
				ref: v,
				role: "img",
				"aria-label": `Graph of ${e.length} nodes`,
				viewBox: `0 0 480 ${s}`,
				width: "100%",
				height: s,
				className: t("block select-none touch-none", b ? "cursor-grabbing" : "cursor-grab"),
				onMouseDown: w,
				"data-testid": `${l}-svg`,
				children: /* @__PURE__ */ A("g", {
					transform: `translate(${m.x} ${m.y}) scale(${m.k})`,
					"data-testid": `${l}-viewport`,
					children: [n.map((e, t) => {
						let n = u.get(e.from), r = u.get(e.to);
						if (!n || !r) return null;
						let i = a !== null && (e.from === a || e.to === a);
						return /* @__PURE__ */ A("g", {
							"data-testid": `${l}-edge-${e.from}-${e.to}`,
							children: [/* @__PURE__ */ k("line", {
								x1: n.x,
								y1: n.y,
								x2: r.x,
								y2: r.y,
								strokeWidth: le(e.weight),
								className: i ? "stroke-primary" : "stroke-border-emphasis"
							}), e.label && /* @__PURE__ */ k("text", {
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
						let r = p.get(e.id) ?? 16, i = e.id === a, o = K(e.group, d), s = `${l}-clip-${e.id}`;
						return /* @__PURE__ */ A("g", {
							role: "button",
							tabIndex: 0,
							"aria-label": e.sublabel ? `${e.label}, ${e.sublabel}` : e.label,
							"aria-pressed": i,
							transform: `translate(${n.x} ${n.y})`,
							className: "cursor-pointer outline-none",
							onClick: (t) => {
								t.stopPropagation(), j(e);
							},
							onMouseDown: (e) => e.stopPropagation(),
							onKeyDown: (t) => M(t, e),
							onFocus: () => _(e.id),
							onBlur: () => _((t) => t === e.id ? null : t),
							"data-testid": `${l}-node-${e.id}`,
							"data-selected": i || void 0,
							children: [
								/* @__PURE__ */ k("title", { children: e.sublabel ?? e.label }),
								(i || g === e.id) && /* @__PURE__ */ k("circle", {
									r: r + 4,
									className: t("fill-none", i ? "stroke-primary" : "stroke-border-emphasis"),
									strokeWidth: 2,
									strokeDasharray: i ? void 0 : "3 3"
								}),
								e.avatarUrl ? /* @__PURE__ */ A(O, { children: [
									/* @__PURE__ */ k("clipPath", {
										id: s,
										children: /* @__PURE__ */ k("circle", { r })
									}),
									/* @__PURE__ */ k("circle", {
										r,
										className: t("stroke-surface", o.fill),
										strokeWidth: 2
									}),
									/* @__PURE__ */ k("image", {
										href: e.avatarUrl,
										x: -r,
										y: -r,
										width: r * 2,
										height: r * 2,
										clipPath: `url(#${s})`,
										preserveAspectRatio: "xMidYMid slice"
									})
								] }) : /* @__PURE__ */ k("circle", {
									r,
									fill: e.color,
									className: t("stroke-surface", !e.color && o.fill),
									strokeWidth: 2
								}),
								!e.avatarUrl && /* @__PURE__ */ k("text", {
									y: 1,
									textAnchor: "middle",
									dominantBaseline: "middle",
									className: "pointer-events-none fill-white text-[10px] font-semibold",
									children: de(e.label)
								}),
								/* @__PURE__ */ k("text", {
									y: r + 12,
									textAnchor: "middle",
									className: "pointer-events-none fill-text-primary text-[11px]",
									children: e.label
								}),
								e === f && e.sublabel && /* @__PURE__ */ k("text", {
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
			/* @__PURE__ */ A("div", {
				className: "pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-2",
				children: [d.length > 0 && (d.length > 1 || d[0] !== "") ? /* @__PURE__ */ k("ul", {
					"aria-label": "Legend",
					className: "pointer-events-auto flex flex-wrap gap-x-3 gap-y-1 rounded-md bg-surface/85 px-2 py-1 text-[11px] text-text-secondary",
					"data-testid": `${l}-legend`,
					children: d.map((e) => /* @__PURE__ */ A("li", {
						className: "flex items-center gap-1",
						children: [/* @__PURE__ */ k("span", {
							"aria-hidden": !0,
							className: t("inline-block h-2 w-2 rounded-full", K(e, d).bg)
						}), e || "Other"]
					}, e || "(none)"))
				}) : /* @__PURE__ */ k("span", {}), /* @__PURE__ */ k(i, {
					size: "sm",
					"aria-label": "Reset view",
					title: "Reset view",
					disabled: N,
					onClick: () => h(oe),
					className: "pointer-events-auto bg-surface/85",
					"data-testid": `${l}-reset`,
					children: "⟲"
				})]
			}),
			a && P.get(a) && /* @__PURE__ */ A("span", {
				className: "sr-only",
				"aria-live": "polite",
				children: ["Selected ", P.get(a).label]
			})
		]
	});
}
function ce(e, t) {
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
function le(e) {
	return typeof e == "number" ? ue(1 + e * 1.5, 1, 5) : 1.5;
}
function ue(e, t, n) {
	return Math.min(n, Math.max(t, e));
}
function de(e) {
	let t = e.trim().split(/\s+/).filter(Boolean);
	return t.length === 0 ? "" : t.length === 1 ? t[0].slice(0, 2).toUpperCase() : (t[0][0] + t[t.length - 1][0]).toUpperCase();
}
//#endregion
//#region src/components/graph/PeopleGraph.tsx
var fe = "__query__";
function pe(e, t) {
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
function me(e, t) {
	let n = [{
		id: fe,
		label: t?.trim() || "Everyone",
		sublabel: `${e.length} ${e.length === 1 ? "person" : "people"}`,
		group: "center"
	}], r = [];
	for (let i of e) {
		let e = pe(i, t);
		n.push({
			id: i.id,
			label: i.name,
			sublabel: i.title,
			group: e,
			weight: i.score,
			avatarUrl: i.avatarUrl
		}), r.push({
			from: fe,
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
function he({ people: e, query: i, onOpenPerson: a, onMessagePerson: o, graphHeight: l = 300, className: u, "data-testid": d = "people-graph" }) {
	let [f, p] = D(null), { nodes: h, edges: g } = T(() => me(e, i), [e, i]), _ = T(() => V(h), [h]);
	return e.length === 0 ? /* @__PURE__ */ k(c, {
		size: "sm",
		icon: "🕸️",
		title: "No people found",
		body: i ? `Nothing matched “${i}”.` : "There is nobody to show yet.",
		testId: `${d}-empty`,
		className: u
	}) : /* @__PURE__ */ k("div", {
		className: t("@container flex min-h-0 flex-col gap-3 p-3", u),
		"data-testid": d,
		children: /* @__PURE__ */ A("div", {
			className: "flex min-h-0 flex-col gap-3 @lg:flex-row",
			children: [/* @__PURE__ */ k(se, {
				nodes: h,
				edges: g,
				layout: "radial",
				height: l,
				selectedId: f,
				onSelect: (e) => p(e.id === "__query__" ? null : e.id),
				className: "@lg:flex-1",
				"data-testid": `${d}-graph`
			}), /* @__PURE__ */ k("ul", {
				className: "flex min-w-0 flex-col gap-2 @lg:w-[260px] @lg:shrink-0",
				"aria-label": "People",
				"data-testid": `${d}-list`,
				children: e.map((e) => {
					let c = pe(e, i), l = e.id === f;
					return /* @__PURE__ */ k("li", { children: /* @__PURE__ */ A(r, {
						padding: "none",
						className: t("flex cursor-pointer items-center gap-3 p-2", l && "ring-2 ring-primary"),
						onClick: () => p(l ? null : e.id),
						"data-testid": `${d}-row-${e.id}`,
						"data-selected": l || void 0,
						children: [
							/* @__PURE__ */ k("span", {
								className: t("h-2 w-2 shrink-0 rounded-full", K(c, _).bg),
								"aria-hidden": !0
							}),
							/* @__PURE__ */ k(m, {
								name: e.name,
								src: e.avatarUrl,
								size: 28
							}),
							/* @__PURE__ */ A("span", {
								className: "flex min-w-0 flex-1 flex-col",
								children: [
									/* @__PURE__ */ k("span", {
										className: "truncate text-[13px] font-medium text-text-primary",
										children: e.name
									}),
									e.title && /* @__PURE__ */ k("span", {
										className: "truncate text-[11px] text-text-tertiary",
										children: e.title
									}),
									c && /* @__PURE__ */ k("span", {
										className: "mt-0.5",
										children: /* @__PURE__ */ k(s, {
											size: "xs",
											children: c
										})
									})
								]
							}),
							/* @__PURE__ */ A("span", {
								className: "flex shrink-0 items-center gap-1",
								children: [o && /* @__PURE__ */ k(n, {
									size: "sm",
									variant: "secondary",
									onClick: (t) => {
										t.stopPropagation(), o(e.id);
									},
									"data-testid": `${d}-message-${e.id}`,
									children: "Message"
								}), a && /* @__PURE__ */ k(n, {
									size: "sm",
									variant: "ghost",
									onClick: (t) => {
										t.stopPropagation(), a(e.id);
									},
									"data-testid": `${d}-open-${e.id}`,
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
function ge(e) {
	return Array.isArray(e.people);
}
function _e(e) {
	return (t, n) => /* @__PURE__ */ k(ve, {
		panel: t,
		api: n,
		options: e
	});
}
function ve({ panel: e, api: t, options: r }) {
	let { load: i, onOpenPerson: a, onMessagePerson: o, onSelectNode: s, graphHeight: c = 300, "data-testid": d = "graph-panel" } = r, [f, p] = D({ status: "loading" }), [m, h] = D(0), [_, v] = D(null);
	C(() => {
		let n = !1;
		return p({ status: "loading" }), i(e).then((e) => {
			n || (p({
				status: "ready",
				data: e
			}), e.title && t.setTitle(e.title));
		}, (e) => {
			n || p({
				status: "error",
				message: e instanceof Error ? e.message : String(e)
			});
		}), () => {
			n = !0;
		};
	}, [
		e.kind,
		e.id,
		m
	]);
	let y = S(() => h((e) => e + 1), []), b = {
		panel: e,
		api: t
	};
	if (f.status === "loading") return /* @__PURE__ */ A("div", {
		className: "relative flex flex-col gap-3 p-3",
		"data-testid": `${d}-loading`,
		"aria-busy": "true",
		children: [
			/* @__PURE__ */ k(u, {
				height: c,
				rounded: "lg"
			}),
			/* @__PURE__ */ k(u, { height: 44 }),
			/* @__PURE__ */ k(u, { height: 44 }),
			/* @__PURE__ */ k("div", {
				className: "absolute inset-0 flex items-center justify-center",
				children: /* @__PURE__ */ k(l, {
					size: "md",
					"aria-label": "Loading graph"
				})
			})
		]
	});
	if (f.status === "error") return /* @__PURE__ */ A("div", {
		className: "flex flex-col gap-2 p-3",
		"data-testid": `${d}-error`,
		children: [/* @__PURE__ */ A(g, {
			tone: "error",
			children: ["Could not load this graph: ", f.message]
		}), /* @__PURE__ */ k(n, {
			size: "sm",
			variant: "secondary",
			onClick: y,
			className: "self-start",
			"data-testid": `${d}-retry`,
			children: "Try again"
		})]
	});
	let { data: x } = f;
	return ge(x) ? /* @__PURE__ */ k(he, {
		people: x.people,
		query: x.query ?? e.params?.q ?? e.params?.query,
		graphHeight: c,
		onOpenPerson: a ? (e) => a(e, b) : void 0,
		onMessagePerson: o ? (e) => o(e, b) : void 0,
		"data-testid": `${d}-people`
	}) : /* @__PURE__ */ k("div", {
		className: "p-3",
		"data-testid": `${d}-nodes`,
		children: /* @__PURE__ */ k(se, {
			nodes: x.nodes,
			edges: x.edges,
			layout: x.layout ?? "force",
			height: c,
			selectedId: _,
			onSelect: (e) => {
				v(e.id), s?.(e, b);
			},
			"data-testid": `${d}-graph`
		})
	});
}
//#endregion
//#region src/components/graph/work/WorkStatus.tsx
var ye = {
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
function be({ status: n, sharingFresh: r = !1, label: i, className: a }) {
	let o = e(), s = ye[n], c = i ?? s.label, l = n === "running" && r && !o;
	return /* @__PURE__ */ A("span", {
		role: "status",
		"aria-label": i ? `${s.label}: ${i}` : s.label,
		"data-status": n,
		"data-sharing-fresh": r ? "true" : "false",
		className: t("inline-flex items-center gap-1.5 whitespace-nowrap text-xs font-medium", s.tone, a),
		children: [/* @__PURE__ */ k("span", {
			"aria-hidden": "true",
			className: t("inline-flex h-4 w-4 items-center justify-center rounded-full border border-current text-[10px] leading-none", l && "animate-pulse"),
			children: s.icon
		}), /* @__PURE__ */ k("span", { children: c })]
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
	conversation: "Chat",
	meeting: "Meeting",
	transcript: "Transcript",
	task: "Task"
}, xe = {
	terminal: "observe-terminal",
	document: "view-document",
	conversation: "join-conversation",
	meeting: "join-meeting",
	transcript: "view-transcript",
	run: "view-run"
}, Se = {
	terminal: "Observe",
	document: "View",
	conversation: "Open chat",
	meeting: "Join",
	transcript: "View",
	run: "View"
};
function Ce(e) {
	if (!e) return null;
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? null : t.toLocaleString(void 0, {
		dateStyle: "medium",
		timeStyle: "short"
	});
}
function we(e) {
	return e.locked ? "Restricted work item" : e.title.trim() || `${q[e.kind]} (untitled)`;
}
function Te({ node: e, selected: r = !1, sharingFresh: i = !1, onSelect: a, onOpen: o }) {
	let s = we(e), c = xe[e.kind], l = c !== void 0 && e.capabilities.includes(c), u = Se[e.kind] ?? "Open", d = Ce(e.updatedAt), f = Ce(e.startedAt), p = Ce(e.endedAt), h = () => a?.(e.id);
	return /* @__PURE__ */ A("article", {
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
			/* @__PURE__ */ A("div", {
				className: "flex min-w-0 items-start gap-2",
				children: [
					/* @__PURE__ */ k(m, {
						name: e.locked ? "Restricted work item" : s,
						...!e.locked && e.avatarUrl ? { src: e.avatarUrl } : {},
						size: 32
					}),
					/* @__PURE__ */ A("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ k("div", {
							className: "mb-1 text-[11px] font-medium uppercase tracking-wide text-text-tertiary",
							children: q[e.kind]
						}), /* @__PURE__ */ k("h3", {
							className: "break-words line-clamp-2 text-sm font-semibold text-text-primary",
							"data-testid": "work-node-title",
							children: s
						})]
					}),
					r && /* @__PURE__ */ k("span", {
						className: "sr-only",
						children: "Selected"
					})
				]
			}),
			e.kind === "conversation" && e.status === "completed" ? /* @__PURE__ */ k("span", {
				role: "status",
				className: "text-xs font-medium text-text-secondary",
				children: "Recent activity"
			}) : /* @__PURE__ */ k(be, {
				status: e.status,
				sharingFresh: i
			}),
			!e.locked && e.description && /* @__PURE__ */ k("p", {
				className: "break-words line-clamp-3 text-xs text-text-secondary",
				children: e.description
			}),
			/* @__PURE__ */ A("dl", {
				className: "grid min-w-0 gap-1 text-[11px] text-text-tertiary",
				children: [
					f && /* @__PURE__ */ A("div", { children: [/* @__PURE__ */ k("dt", {
						className: "inline font-medium",
						children: e.kind === "conversation" ? "First activity: " : "Started: "
					}), /* @__PURE__ */ k("dd", {
						className: "inline",
						children: f
					})] }),
					/* @__PURE__ */ A("div", { children: [/* @__PURE__ */ k("dt", {
						className: "inline font-medium",
						children: e.kind === "conversation" ? "Last activity: " : "Updated: "
					}), /* @__PURE__ */ k("dd", {
						className: "inline",
						children: d ?? "Unknown"
					})] }),
					p && /* @__PURE__ */ A("div", { children: [/* @__PURE__ */ k("dt", {
						className: "inline font-medium",
						children: "Ended: "
					}), /* @__PURE__ */ k("dd", {
						className: "inline",
						children: p
					})] })
				]
			}),
			l && c && /* @__PURE__ */ k(n, {
				size: "sm",
				variant: "secondary",
				disabled: !l || !o,
				"data-capability": c,
				"aria-label": `${u} ${q[e.kind].toLowerCase()}`,
				onClick: (t) => {
					t.stopPropagation(), l && o?.(e.id);
				},
				children: u
			})
		]
	});
}
//#endregion
//#region src/components/graph/work/WorkEdge.tsx
var Ee = {
	"works-on": "Works on",
	"runs-in": "Runs in",
	"operates-on": "Operates on",
	produced: "Produced",
	edited: "Edited",
	attended: "Attended",
	discussed: "Discussed",
	"derived-from": "Derived from"
};
function De({ edge: e, selected: n = !1, reducedMotion: r = !1, fromLabel: i, toLabel: a, onSelect: o }) {
	let s = Ee[e.relation], c = e.disclosure === "existence", l = c ? "Shared connection" : e.label?.trim() || s;
	return /* @__PURE__ */ A("button", {
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
			/* @__PURE__ */ k("span", {
				"aria-hidden": "true",
				className: t("h-px min-w-4 flex-1 bg-border", n ? "bg-primary" : "group-hover:bg-primary/50")
			}),
			/* @__PURE__ */ A("span", {
				className: "min-w-0 flex-1",
				children: [/* @__PURE__ */ k("span", {
					className: "block truncate text-xs font-medium text-text-primary",
					children: l
				}), /* @__PURE__ */ A("span", {
					className: "block truncate text-[11px] text-text-tertiary",
					children: [
						i,
						" → ",
						a
					]
				})]
			}),
			/* @__PURE__ */ k(be, { status: e.status }),
			/* @__PURE__ */ k("span", {
				"aria-hidden": "true",
				className: t("h-px min-w-4 flex-1 bg-border", n ? "bg-primary" : "group-hover:bg-primary/50")
			}),
			n && /* @__PURE__ */ k("span", {
				className: "sr-only",
				children: "Selected"
			})
		]
	});
}
//#endregion
//#region src/components/graph/work/WorkEntityList.tsx
function Oe(e, t, n) {
	return e?.kind === t && e.id === n;
}
function J(e) {
	return e.locked ? "Restricted work item" : e.title.trim() || "Untitled work item";
}
function ke(e, t) {
	let n = t.get(e.fromId), r = t.get(e.toId), i = n ? J(n) : "Unavailable item", a = r ? J(r) : "Unavailable item";
	return e.label?.trim() || `${i} ${e.relation} ${a}`;
}
function Ae({ nodes: e, edges: n, selection: r, onSelectionChange: i, heading: a = "Accessible work graph" }) {
	let o = new Map(e.map((e) => [e.id, e]));
	return /* @__PURE__ */ A("section", {
		"aria-labelledby": "work-entity-list-heading",
		className: "min-w-0 space-y-3",
		children: [/* @__PURE__ */ k("h3", {
			id: "work-entity-list-heading",
			className: "text-sm font-semibold text-text-primary",
			children: a
		}), e.length === 0 && n.length === 0 ? /* @__PURE__ */ k("p", {
			className: "text-sm text-text-secondary",
			children: "No shared work is available."
		}) : /* @__PURE__ */ A("div", {
			className: "grid gap-3 md:grid-cols-2",
			children: [/* @__PURE__ */ A("div", { children: [/* @__PURE__ */ k("h4", {
				className: "mb-1 text-xs font-medium uppercase tracking-wide text-text-tertiary",
				children: "Items"
			}), /* @__PURE__ */ k("ul", {
				className: "space-y-1",
				children: e.map((e) => {
					let n = Oe(r, "node", e.id);
					return /* @__PURE__ */ k("li", { children: /* @__PURE__ */ A("button", {
						type: "button",
						"aria-label": `Work item: ${J(e)}`,
						"aria-pressed": n,
						onClick: () => i({
							kind: "node",
							id: e.id
						}),
						className: t("w-full rounded-md border px-3 py-2 text-left text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50", n ? "border-primary bg-primary/5" : "border-border hover:bg-surface-hover"),
						children: [/* @__PURE__ */ k("span", {
							className: "block break-words font-medium text-text-primary",
							children: J(e)
						}), /* @__PURE__ */ k("span", {
							className: "text-xs text-text-tertiary",
							children: e.kind === "conversation" ? "Chat · Recent activity" : `${e.kind} · ${e.status}`
						})]
					}) }, e.id);
				})
			})] }), /* @__PURE__ */ A("div", { children: [/* @__PURE__ */ k("h4", {
				className: "mb-1 text-xs font-medium uppercase tracking-wide text-text-tertiary",
				children: "Relationships"
			}), /* @__PURE__ */ k("ul", {
				className: "space-y-1",
				children: n.map((e) => {
					let n = Oe(r, "edge", e.id), a = ke(e, o);
					return /* @__PURE__ */ k("li", { children: /* @__PURE__ */ A("button", {
						type: "button",
						"aria-label": `Relationship: ${a}`,
						"aria-pressed": n,
						onClick: () => i({
							kind: "edge",
							id: e.id
						}),
						className: t("w-full rounded-md border px-3 py-2 text-left text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50", n ? "border-primary bg-primary/5" : "border-border hover:bg-surface-hover"),
						children: [/* @__PURE__ */ k("span", {
							className: "block break-words font-medium text-text-primary",
							children: a
						}), /* @__PURE__ */ A("span", {
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
var je = {
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
}, Me = /* @__PURE__ */ new Set([
	"view-document",
	"edit-document",
	"join-conversation",
	"join-meeting",
	"observe-terminal",
	"control-terminal",
	"view-transcript",
	"view-run"
]);
function Ne(e, t, n) {
	if (n) return n.kind === "node" ? e.find((e) => e.id === n.id) : t.find((e) => e.id === n.id);
}
function Pe(e) {
	return "kind" in e ? e.locked ? "Restricted work item" : e.title : e.label?.trim() || `${e.relation} relationship`;
}
function Fe({ nodes: e, edges: t, selection: r, onSelectionChange: i, onOpen: a, onReference: o, onRequestCollaboration: s }) {
	let c = Ne(e, t, r);
	if (C(() => {
		r && !c && i(null);
	}, [
		c,
		i,
		r
	]), !r || !c) return /* @__PURE__ */ k("aside", {
		"aria-label": "Work details",
		className: "rounded-lg border border-border bg-surface p-4",
		children: /* @__PURE__ */ k("p", {
			className: "text-sm text-text-secondary",
			children: "Select a work item or relationship to inspect it."
		})
	});
	let l = r, u = c.capabilities.find((e) => Me.has(e));
	return /* @__PURE__ */ A("aside", {
		"aria-label": "Work details",
		className: "space-y-4 rounded-lg border border-border bg-surface p-4",
		children: [
			/* @__PURE__ */ A("div", {
				className: "min-w-0",
				children: [
					/* @__PURE__ */ k("p", {
						className: "text-xs font-medium uppercase tracking-wide text-text-tertiary",
						children: "kind" in c ? c.kind : "Relationship"
					}),
					/* @__PURE__ */ k("h3", {
						className: "break-words text-base font-semibold text-text-primary",
						children: Pe(c)
					}),
					/* @__PURE__ */ k("p", {
						className: "text-sm text-text-secondary",
						children: c.status
					}),
					"description" in c && !c.locked && c.description ? /* @__PURE__ */ k("p", {
						className: "mt-2 break-words text-sm text-text-secondary",
						children: c.description
					}) : null
				]
			}),
			/* @__PURE__ */ A("div", {
				className: "flex flex-wrap gap-2",
				children: [u && a ? /* @__PURE__ */ k(n, {
					size: "sm",
					variant: "secondary",
					onClick: () => a(l),
					children: "Open"
				}) : null, o ? /* @__PURE__ */ k(n, {
					size: "sm",
					variant: "secondary",
					onClick: () => o(l),
					children: "Reference"
				}) : null]
			}),
			c.capabilities.length > 0 && s ? /* @__PURE__ */ A("div", { children: [/* @__PURE__ */ k("h4", {
				className: "mb-2 text-xs font-medium uppercase tracking-wide text-text-tertiary",
				children: "Request collaboration"
			}), /* @__PURE__ */ k("div", {
				className: "flex flex-wrap gap-2",
				children: c.capabilities.map((e) => /* @__PURE__ */ k(n, {
					size: "sm",
					variant: "secondary",
					onClick: () => s(l, e),
					children: je[e]
				}, e))
			})] }) : null
		]
	});
}
//#endregion
//#region src/components/graph/work/WorkSharingControls.tsx
var Ie = [
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
function Le(e) {
	return e.locked ? "Restricted work item" : e.title.trim() || "Untitled work item";
}
function Re(e) {
	return e.label?.trim() || `${e.relation} relationship`;
}
function ze(e, t, n, r) {
	let i = e[t];
	return {
		...e,
		[t]: r ? i.includes(n) ? i : [...i, n] : i.filter((e) => e !== n)
	};
}
function Be(e) {
	return e.audience.kind === "organization" ? ["Everyone in your organization"] : e.audience.kind === "people" ? e.audience.personIds : e.audience.conversationIds;
}
function Ve({ state: e, value: t, availableNodes: r, availableEdges: i, saving: a = !1, error: o, conflict: s = !1, onChange: c, onStart: l, onPause: u, onResume: d, onStop: f }) {
	let m = w(), h = Be(t), _ = e === "off" ? "Off" : e.charAt(0).toUpperCase() + e.slice(1);
	return /* @__PURE__ */ A("section", {
		"aria-labelledby": "work-sharing-heading",
		className: "space-y-5 rounded-lg border border-border bg-surface p-4",
		children: [
			/* @__PURE__ */ A("div", {
				className: "flex flex-wrap items-start justify-between gap-3",
				children: [/* @__PURE__ */ A("div", { children: [/* @__PURE__ */ k("h3", {
					id: "work-sharing-heading",
					className: "text-base font-semibold text-text-primary",
					children: "Share work activity"
				}), /* @__PURE__ */ k("p", {
					className: "mt-1 text-sm text-text-secondary",
					children: "Sharing is voluntary. Only the audience, work, relationships, and detail selected here are shared."
				})] }), /* @__PURE__ */ k("span", {
					className: "rounded-full border border-border bg-surface-inset px-2.5 py-1 text-xs font-medium text-text-secondary",
					children: _
				})]
			}),
			o ? /* @__PURE__ */ k(g, {
				tone: "error",
				children: o
			}) : null,
			s ? /* @__PURE__ */ k(g, {
				tone: "warning",
				children: "Sharing changed elsewhere. Review the current settings before trying again."
			}) : null,
			a ? /* @__PURE__ */ k("p", {
				role: "status",
				"aria-live": "polite",
				className: "text-sm text-text-secondary",
				children: "Saving sharing settings…"
			}) : null,
			/* @__PURE__ */ A("fieldset", {
				disabled: a,
				className: "space-y-2",
				children: [
					/* @__PURE__ */ k("legend", {
						className: "text-sm font-semibold text-text-primary",
						children: "Audience"
					}),
					/* @__PURE__ */ k("p", {
						className: "text-xs text-text-tertiary",
						children: t.audience.kind === "people" ? "Selected people" : t.audience.kind === "conversation" ? "Selected conversations" : "Organization"
					}),
					h.length > 0 ? /* @__PURE__ */ k("ul", {
						"aria-label": "Current sharing audience",
						className: "flex flex-wrap gap-2",
						children: h.map((e) => /* @__PURE__ */ k("li", {
							className: "max-w-full break-all rounded-md border border-border bg-surface-inset px-2 py-1 text-xs text-text-secondary",
							children: e
						}, e))
					}) : /* @__PURE__ */ k("p", {
						className: "text-sm text-text-secondary",
						children: "No audience selected."
					}),
					/* @__PURE__ */ k("p", {
						className: "text-xs text-text-tertiary",
						children: "Audience choices are provided by the host application."
					})
				]
			}),
			/* @__PURE__ */ A("fieldset", {
				disabled: a,
				className: "space-y-2",
				children: [/* @__PURE__ */ k("legend", {
					className: "text-sm font-semibold text-text-primary",
					children: "Work items"
				}), r.length === 0 ? /* @__PURE__ */ k("p", {
					className: "text-sm text-text-secondary",
					children: "No work items are available."
				}) : /* @__PURE__ */ k("div", {
					className: "space-y-2",
					children: r.map((e) => {
						let n = `${m}-node-${e.id}`;
						return /* @__PURE__ */ A("label", {
							htmlFor: n,
							className: "flex items-start gap-2 rounded-md border border-border px-3 py-2 text-sm text-text-primary",
							children: [/* @__PURE__ */ k(v, {
								id: n,
								checked: t.selectedNodeIds.includes(e.id),
								disabled: a,
								onChange: (n) => c(ze(t, "selectedNodeIds", e.id, n))
							}), /* @__PURE__ */ A("span", {
								className: "min-w-0 break-words",
								children: [/* @__PURE__ */ k("span", {
									className: "block font-medium",
									children: Le(e)
								}), /* @__PURE__ */ k("span", {
									className: "text-xs text-text-tertiary",
									children: e.kind
								})]
							})]
						}, e.id);
					})
				})]
			}),
			/* @__PURE__ */ A("fieldset", {
				disabled: a,
				className: "space-y-2",
				children: [/* @__PURE__ */ k("legend", {
					className: "text-sm font-semibold text-text-primary",
					children: "Relationships"
				}), i.length === 0 ? /* @__PURE__ */ k("p", {
					className: "text-sm text-text-secondary",
					children: "No relationships are available."
				}) : /* @__PURE__ */ k("div", {
					className: "space-y-2",
					children: i.map((e) => {
						let n = `${m}-edge-${e.id}`;
						return /* @__PURE__ */ A("label", {
							htmlFor: n,
							className: "flex items-start gap-2 rounded-md border border-border px-3 py-2 text-sm text-text-primary",
							children: [/* @__PURE__ */ k(v, {
								id: n,
								checked: t.selectedEdgeIds.includes(e.id),
								disabled: a,
								onChange: (n) => c(ze(t, "selectedEdgeIds", e.id, n))
							}), /* @__PURE__ */ A("span", {
								className: "min-w-0 break-words",
								children: [/* @__PURE__ */ k("span", {
									className: "block font-medium",
									children: Re(e)
								}), /* @__PURE__ */ k("span", {
									className: "text-xs text-text-tertiary",
									children: e.relation
								})]
							})]
						}, e.id);
					})
				})]
			}),
			/* @__PURE__ */ A("div", {
				className: "grid gap-4 sm:grid-cols-2",
				children: [/* @__PURE__ */ A("label", {
					className: "space-y-1 text-sm font-medium text-text-primary",
					children: [/* @__PURE__ */ k("span", { children: "Detail shared" }), /* @__PURE__ */ k("select", {
						value: t.disclosure,
						disabled: a,
						onChange: (e) => c({
							...t,
							disclosure: e.target.value
						}),
						className: "h-9 w-full rounded-md border border-border-emphasis bg-surface-panel px-2.5 text-sm text-text-primary outline-none focus:border-info focus:ring-1 focus:ring-info/40 disabled:cursor-not-allowed disabled:opacity-50",
						children: Ie.map((e) => /* @__PURE__ */ k("option", {
							value: e.value,
							children: e.label
						}, e.value))
					})]
				}), /* @__PURE__ */ A("label", {
					className: "space-y-1 text-sm font-medium text-text-primary",
					children: [/* @__PURE__ */ k("span", { children: "Live sharing expires" }), /* @__PURE__ */ k(p, {
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
			/* @__PURE__ */ A("fieldset", {
				disabled: a,
				className: "space-y-3 rounded-md border border-border p-3",
				children: [
					/* @__PURE__ */ k("legend", {
						className: "px-1 text-sm font-semibold text-text-primary",
						children: "Earlier work"
					}),
					/* @__PURE__ */ A("label", {
						htmlFor: `${m}-history`,
						className: "flex items-start gap-2 text-sm text-text-primary",
						children: [/* @__PURE__ */ k(v, {
							id: `${m}-history`,
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
						}), /* @__PURE__ */ A("span", { children: [/* @__PURE__ */ k("span", {
							className: "block font-medium",
							children: "Share selected history"
						}), /* @__PURE__ */ k("span", {
							className: "block text-xs text-text-tertiary",
							children: "Historical work is never included unless you select this option."
						})] })]
					}),
					t.history ? /* @__PURE__ */ A("div", {
						className: "grid gap-3 sm:grid-cols-3",
						children: [
							/* @__PURE__ */ A("label", {
								className: "space-y-1 text-sm font-medium text-text-primary",
								children: [/* @__PURE__ */ k("span", { children: "First day" }), /* @__PURE__ */ k(p, {
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
							/* @__PURE__ */ A("label", {
								className: "space-y-1 text-sm font-medium text-text-primary",
								children: [/* @__PURE__ */ k("span", { children: "Last day" }), /* @__PURE__ */ k(p, {
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
							/* @__PURE__ */ A("label", {
								className: "space-y-1 text-sm font-medium text-text-primary",
								children: [/* @__PURE__ */ k("span", { children: "History access expires" }), /* @__PURE__ */ k(p, {
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
			/* @__PURE__ */ A("div", {
				className: "flex flex-wrap gap-2",
				children: [
					e === "off" || e === "stopped" || e === "expired" ? /* @__PURE__ */ k(n, {
						disabled: a,
						onClick: l,
						children: e === "off" ? "Start sharing" : "Start sharing again"
					}) : null,
					e === "active" ? /* @__PURE__ */ k(n, {
						variant: "secondary",
						disabled: a,
						onClick: u,
						children: "Pause sharing"
					}) : null,
					e === "paused" ? /* @__PURE__ */ k(n, {
						disabled: a,
						onClick: d,
						children: "Resume sharing"
					}) : null,
					e === "active" || e === "paused" ? /* @__PURE__ */ k(n, {
						variant: "danger",
						disabled: a,
						onClick: f,
						children: "Stop sharing"
					}) : null
				]
			})
		]
	});
}
//#endregion
//#region src/components/graph/work/WorkReferenceCard.tsx
var He = /* @__PURE__ */ new Set([
	"view-document",
	"edit-document",
	"join-conversation",
	"join-meeting",
	"observe-terminal",
	"control-terminal",
	"view-transcript",
	"view-run"
]);
function Ue({ target: e, state: t, node: r, edge: i, unavailableLabel: a, onSelect: o, onOpen: s }) {
	let c = e?.kind === "node" ? r : e?.kind === "edge" ? i : void 0;
	if (t === "loading") return /* @__PURE__ */ k("article", {
		"aria-label": "Shared work reference",
		"aria-busy": "true",
		className: "rounded-lg border border-border bg-surface p-3",
		children: /* @__PURE__ */ k("p", {
			role: "status",
			className: "text-sm text-text-secondary",
			children: "Loading shared work…"
		})
	});
	if (t === "unavailable" || !e || !c) return /* @__PURE__ */ k("article", {
		"aria-label": "Shared work reference",
		className: "rounded-lg border border-border bg-surface p-3",
		children: /* @__PURE__ */ k("p", {
			className: "text-sm text-text-secondary",
			children: a ?? "This work item is unavailable."
		})
	});
	let l = e.kind === "node" ? r?.locked ? "Restricted work item" : r?.title : i?.label?.trim() || `${i?.relation ?? "Shared"} relationship`, u = (e.kind === "node" ? r?.capabilities ?? [] : i?.capabilities ?? []).some((e) => He.has(e)), d = e;
	return /* @__PURE__ */ A("article", {
		"aria-label": "Shared work reference",
		className: "space-y-3 rounded-lg border border-border bg-surface p-3",
		children: [/* @__PURE__ */ A("button", {
			type: "button",
			"aria-label": `Select reference: ${l}`,
			disabled: !o,
			onClick: () => o?.(d),
			className: "block w-full rounded text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:cursor-default",
			children: [
				/* @__PURE__ */ k("span", {
					className: "block text-xs font-medium uppercase tracking-wide text-text-tertiary",
					children: e.kind === "node" ? r?.kind : "Relationship"
				}),
				/* @__PURE__ */ k("span", {
					className: "block break-words text-sm font-semibold text-text-primary",
					children: l
				}),
				/* @__PURE__ */ k("span", {
					className: "block text-xs text-text-secondary",
					children: c.status
				})
			]
		}), u && s ? /* @__PURE__ */ k(n, {
			size: "sm",
			variant: "secondary",
			onClick: () => s(d),
			children: "Open shared work"
		}) : null]
	});
}
//#endregion
//#region src/components/graph/work/WorkActivityTimeline.tsx
function We(e, t) {
	let n = new Intl.DateTimeFormat("en-US", {
		timeZone: t,
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
		hourCycle: "h23"
	}).formatToParts(e), r = (e) => n.find((t) => t.type === e)?.value ?? "00";
	return {
		day: `${r("year")}-${r("month")}-${r("day")}`,
		minute: Number(r("hour")) * 60 + Number(r("minute")),
		time: `${r("hour")}:${r("minute")}`
	};
}
function Ge(e, t, n, r, i) {
	let a = t.updatedAt || t.startedAt;
	if (!a) return null;
	let o = new Date(a);
	if (Number.isNaN(o.getTime())) return null;
	let s = We(o, i);
	return s.day === r ? {
		key: `${e}:${t.id}`,
		selection: {
			kind: e,
			id: t.id
		},
		label: n,
		minute: s.minute,
		time: s.time,
		live: t.status === "running" && !t.endedAt
	} : null;
}
function Ke({ day: e, timezone: t, nodes: n, edges: r, selection: i, onSelectionChange: a }) {
	let [o, s] = D(() => /* @__PURE__ */ new Date());
	C(() => {
		let e = window.setInterval(() => s(/* @__PURE__ */ new Date()), 6e4);
		return () => window.clearInterval(e);
	}, []);
	let c = T(() => {
		let i = new Map(n.map((e) => [e.id, e.locked ? "Restricted work item" : e.title.trim() || "Untitled work item"]));
		return [...n.map((n) => Ge("node", n, i.get(n.id), e, t)), ...r.map((n) => Ge("edge", n, `${i.get(n.fromId) ?? "Work item"} → ${i.get(n.toId) ?? "Work item"}`, e, t))].filter((e) => e !== null).sort((e, t) => e.minute - t.minute || e.key.localeCompare(t.key));
	}, [
		e,
		t,
		n,
		r
	]), l = /* @__PURE__ */ new Map();
	for (let e of c) {
		let t = Math.floor(e.minute / 60), n = l.get(t) ?? [];
		n.push(e), l.set(t, n);
	}
	let u = We(o, t), d = u.day === e;
	return /* @__PURE__ */ A("div", {
		className: "rounded-lg border border-border bg-surface px-4 py-3",
		"aria-label": `Activity on ${e}`,
		"data-testid": "work-activity-timeline",
		children: [
			/* @__PURE__ */ A("div", {
				className: "mb-3 flex items-baseline justify-between gap-3",
				children: [/* @__PURE__ */ A("div", { children: [/* @__PURE__ */ k("h2", {
					className: "text-sm font-semibold text-text-primary",
					children: "Activity over the day"
				}), /* @__PURE__ */ k("p", {
					className: "text-xs text-text-secondary",
					children: "Select a time to inspect visible work and its branches."
				})] }), /* @__PURE__ */ k("span", {
					className: "shrink-0 text-xs text-text-secondary",
					children: t
				})]
			}),
			/* @__PURE__ */ A("div", {
				className: "relative h-10 border-b border-border",
				children: [
					[
						0,
						6,
						12,
						18,
						24
					].map((e) => /* @__PURE__ */ k("span", {
						"aria-hidden": "true",
						className: "absolute bottom-0 h-2 border-l border-border",
						style: { left: `${e / 24 * 100}%` }
					}, e)),
					Array.from(l, ([e, t]) => {
						let n = t.some((e) => i?.kind === e.selection.kind && i.id === e.selection.id), r = t.some((e) => e.live);
						return /* @__PURE__ */ k("button", {
							type: "button",
							"aria-label": `${t.length} visible ${t.length === 1 ? "item" : "items"} around ${String(e).padStart(2, "0")}:00. Select latest.`,
							onClick: () => a(t[t.length - 1].selection),
							className: `absolute bottom-1 h-6 min-w-6 rounded-full ${n ? "bg-primary" : r ? "bg-success" : "bg-border-emphasis"}`,
							style: {
								left: `${(e + .5) / 24 * 100}%`,
								transform: "translateX(-50%)"
							}
						}, e);
					}),
					d ? /* @__PURE__ */ k("span", {
						"aria-hidden": "true",
						className: "pointer-events-none absolute bottom-0 top-0 border-l-2 border-primary",
						style: { left: `${u.minute / 1440 * 100}%` }
					}) : null
				]
			}),
			/* @__PURE__ */ A("div", {
				className: "mt-1 flex justify-between text-[11px] text-text-secondary",
				"aria-hidden": "true",
				children: [
					/* @__PURE__ */ k("span", { children: "12 AM" }),
					/* @__PURE__ */ k("span", { children: "6 AM" }),
					/* @__PURE__ */ k("span", { children: "12 PM" }),
					/* @__PURE__ */ k("span", { children: "6 PM" }),
					/* @__PURE__ */ k("span", { children: "12 AM" })
				]
			}),
			/* @__PURE__ */ A("p", {
				className: "mt-2 text-xs text-text-secondary",
				children: [c.length === 0 ? "No visible activity recorded for this day." : `${c.length} visible work ${c.length === 1 ? "item" : "items"} across ${l.size} ${l.size === 1 ? "hour" : "hours"}.`, d ? ` Now ${u.time}.` : ""]
			}),
			c.length > 0 ? /* @__PURE__ */ A("details", {
				className: "mt-2 text-xs",
				children: [/* @__PURE__ */ k("summary", {
					className: "cursor-pointer text-primary",
					children: "Browse activity"
				}), /* @__PURE__ */ k("ol", {
					className: "mt-2 max-h-36 space-y-1 overflow-y-auto",
					children: c.map((e) => /* @__PURE__ */ k("li", { children: /* @__PURE__ */ A("button", {
						type: "button",
						className: `w-full rounded px-2 py-1 text-left hover:bg-surface-hover ${i?.kind === e.selection.kind && i.id === e.selection.id ? "font-semibold text-primary" : "text-text-primary"}`,
						onClick: () => a(e.selection),
						"aria-current": i?.kind === e.selection.kind && i.id === e.selection.id ? "true" : void 0,
						children: [
							/* @__PURE__ */ k("time", { children: e.time }),
							" · ",
							e.label,
							e.live ? " · active" : ""
						]
					}) }, e.key))
				})]
			}) : null
		]
	});
}
//#endregion
//#region src/components/graph/work/effortLayout.ts
var Y = (e, t, n) => JSON.stringify([
	e,
	t,
	n
]);
function qe(e, t, n, r) {
	let i = new Map(e.map((e) => [e.id, e])), a = new Map(t.map((e) => [e.id, e])), o = new Set(r.expandedSourceEfforts), s = new Set(r.reversedEdgeIds), c = r.full ? 28 : 20, l = r.full ? 64 : 36, u = Math.max(240, r.width - 32), d = n.length >= 3 && !r.focusedEffortId, f = r.focusedEffortId ? n.filter((e) => e.id === r.focusedEffortId) : n, p = [];
	for (let e of f) {
		let t = [...new Set(e.nodeIds)].filter((e) => i.has(e)), n = new Set(t), l = new Set(e.contextNodeIds?.filter((e) => n.has(e))), u = (d || r.foldedForHeight?.includes(e.id)) && !o.has(e.id) && l.size < t.length ? t.filter((e) => !l.has(e)) : t;
		if (!u.length) continue;
		let f = new Set(u), m = [...new Set(e.edgeIds)].flatMap((e) => {
			let t = a.get(e);
			return !t || !f.has(t.fromId) || !f.has(t.toId) || t.fromId === t.toId ? [] : [{
				id: e,
				from: s.has(e) ? t.toId : t.fromId,
				to: s.has(e) ? t.fromId : t.toId
			}];
		}), h = new Map(u.map((e) => [e, 0])), g = new Map(u.map((e) => [e, []]));
		for (let e of m) h.set(e.to, h.get(e.to) + 1), g.get(e.from).push(e.to);
		let _ = u.filter((e) => h.get(e) === 0).sort(), v = new Map(_.map((e) => [e, 0]));
		for (let e = 0; e < _.length; e++) {
			let t = _[e];
			for (let e of g.get(t).sort()) v.set(e, Math.max(v.get(e) ?? 0, v.get(t) + 1)), h.set(e, h.get(e) - 1), h.get(e) || _.push(e);
		}
		let y = u.filter((e) => !_.includes(e));
		for (let e of y) v.set(e, 0);
		let b = /* @__PURE__ */ new Map();
		for (let e of u) {
			let t = v.get(e);
			b.set(t, [...b.get(t) ?? [], e]);
		}
		let x = (e) => r.measurements?.get(e) ?? {
			width: 200,
			height: 112
		}, S = u.filter((e) => l.has(e)), C = u.filter((e) => !l.has(e)), w = (C.length ? C : u).slice().sort((e, t) => v.get(e) - v.get(t) || (e < t ? -1 : 1)), T = C.length ? S : [], E = new Map(w.map((e, t) => [e, t])), D = (e) => {
			let t = m.filter((t) => t.from === e).map((e) => E.get(e.to)).filter((e) => e !== void 0);
			return t.length ? Math.min(...t) : void 0;
		}, O = /* @__PURE__ */ new Set(), k = /* @__PURE__ */ new Map(), A = w.length;
		for (let e of T.slice().sort((e, t) => v.get(e) - v.get(t) || (e < t ? -1 : 1))) {
			let t = D(e), n = t;
			if (n === void 0 || O.has(n)) {
				let e = t === void 0 ? [] : [...Array(w.length).keys()].filter((e) => !O.has(e));
				n = e.length ? e.reduce((e, n) => Math.abs(n - t) < Math.abs(e - t) ? n : e) : A++;
			}
			O.add(n), k.set(e, n);
		}
		let j = Math.max(w.length, ...[...k.values()].map((e) => e + 1), 1), M = r.labelledEdgeIds?.some((e) => m.some((t) => t.id === e && k.has(t.from))) ? 132 : 56, N = T.length ? Math.max(...T.map((e) => x(e).width)) : 0, P = c + (N ? N + M : 0), F = (e) => [...w.filter((t) => E.get(t) === e), ...[...k].filter(([, t]) => t === e).map(([e]) => e)], I = [...Array(j).keys()].map((e) => Math.max(0, ...F(e).map((e) => x(e).height))), L = [...Array(j).keys()].map((e) => 32 + Math.max(1, ...F(e).map((e) => m.filter((t) => t.to === e).length)) * 24), R = I.reduce((e, t, n) => e + t + (n ? L[n] : 0), 56 + c), z = T.length === 0 && r.height && R > r.height && j > 2 ? I.reduce((e, t, n) => {
			let r = e.run + t + (n ? L[n] : 0);
			return r < R / 2 ? {
				row: n + 1,
				run: r
			} : e;
		}, {
			row: 0,
			run: 56
		}).row || Math.ceil(j / 2) : j, B = (e) => e < z ? 0 : 1, V = I.reduce((e, t, n) => [...e, n === 0 || B(n) !== B(n - 1) ? 56 : e[n - 1] + I[n - 1] + L[n]], []), H = Math.max(0, ...w.map((e) => x(e).width)), U = (e) => P + B(e) * (H + Math.max(96, M)), W = [];
		for (let t of w) W.push({
			id: Y(e.id, "node", t),
			entityId: t,
			x: U(E.get(t)),
			y: V[E.get(t)],
			...x(t)
		});
		for (let [t, n] of k) W.push({
			id: Y(e.id, "node", t),
			entityId: t,
			x: c,
			y: V[n],
			...x(t)
		});
		let ee = T.length === 0, G = new Map(W.map((e) => [e.entityId, e])), te = /* @__PURE__ */ new Map();
		p.push({
			id: e.id,
			title: e.title,
			subtitle: e.subtitle,
			x: 0,
			y: 0,
			width: Math.max(...W.map((e) => e.x + e.width)) + c,
			height: Math.max(...W.map((e) => e.y + e.height)) + c,
			collapsedSourceCount: t.length - u.length,
			sourceCount: l.size,
			vertical: ee,
			cyclicNodeIds: y,
			nodes: W,
			edges: m.map((t) => {
				let n = te.get(t.to) ?? 0;
				te.set(t.to, n + 1);
				let r = G.get(t.from), i = G.get(t.to), a = r.x !== i.x, o = a ? "out-right" : "out-bottom", s = a ? "in-left" : "in-top";
				return {
					id: Y(e.id, "edge", t.id),
					entityId: t.id,
					source: Y(e.id, "node", t.from),
					target: Y(e.id, "node", t.to),
					sourceHandle: o,
					targetHandle: s,
					labelX: a ? (r.x + r.width + i.x) / 2 : i.x + i.width / 2 + 44,
					labelY: i.y - 26 - n * 24
				};
			})
		});
	}
	let m = (e) => {
		let t = [], n = 16, i = 24, a = 0;
		for (let r of p) e && n > 16 && n + r.width > u && (n = 16, i += a + l, a = 0), t.push({
			x: n,
			y: i
		}), n += r.width + l, a = Math.max(a, r.height);
		let o = Math.max(1, ...t.map((e, t) => e.x + p[t].width)), s = Math.max(1, ...t.map((e, t) => e.y + p[t].height));
		return {
			places: t,
			zoom: Math.min((r.width - 48) / o, ((r.height ?? s + 48) - 48) / s)
		};
	}, h = m(!1), g = m(!0), _ = p.length <= 1 || g.zoom <= h.zoom * 1.25 ? h : g;
	if (r.height && !r.focusedEffortId && _.zoom < .4) {
		let i = p.filter((e) => e.sourceCount > 0 && e.sourceCount < e.nodes.length && e.collapsedSourceCount === 0 && !o.has(e.id) && !r.foldedForHeight?.includes(e.id));
		if (i.length) return qe(e, t, n, {
			...r,
			foldedForHeight: [...r.foldedForHeight ?? [], ...i.map((e) => e.id)]
		});
	}
	for (let [e, t] of p.entries()) t.x = _.places[e].x, t.y = _.places[e].y;
	return p;
}
//#endregion
//#region src/components/graph/work/WorkActivityNode.tsx
var Je = {
	project: "▱",
	terminal: "⌘",
	agent: "✦",
	run: "▶",
	document: "▤",
	change: "⌥",
	conversation: "◌",
	meeting: "◉",
	transcript: "▤",
	task: "☑"
}, Ye = {
	meeting: {
		bar: "bg-cat-human",
		chip: "bg-cat-human/10 text-cat-human"
	},
	conversation: {
		bar: "bg-cat-human",
		chip: "bg-cat-human/10 text-cat-human"
	},
	transcript: {
		bar: "bg-cat-sink",
		chip: "bg-cat-sink/10 text-cat-sink"
	},
	terminal: {
		bar: "bg-cat-sink",
		chip: "bg-cat-sink/10 text-cat-sink"
	},
	document: {
		bar: "bg-cat-source",
		chip: "bg-cat-source/10 text-cat-source"
	},
	project: {
		bar: "bg-cat-source",
		chip: "bg-cat-source/10 text-cat-source"
	},
	task: {
		bar: "bg-cat-source",
		chip: "bg-cat-source/10 text-cat-source"
	},
	run: {
		bar: "bg-cat-ai",
		chip: "bg-cat-ai/10 text-cat-ai"
	},
	agent: {
		bar: "bg-cat-ai",
		chip: "bg-cat-ai/10 text-cat-ai"
	},
	change: {
		bar: "bg-cat-transform",
		chip: "bg-cat-transform/10 text-cat-transform"
	}
}, Xe = "flex items-center justify-center [&>*]:h-full [&>*]:w-full [&_img]:h-full [&_img]:w-full [&_img]:object-contain [&_svg]:h-full [&_svg]:w-full", Ze = {
	idle: "bg-border-emphasis",
	running: "bg-info",
	waiting: "bg-caution",
	completed: "bg-success",
	error: "bg-danger",
	stopped: "bg-border-emphasis",
	stale: "bg-border-emphasis"
};
function Qe({ node: e, detail: n, selected: r, selectedRevisionId: a, live: s, onSelect: c, onFeedback: l }) {
	let u = e.locked || e.disclosure === "existence" ? void 0 : n, d = a ? u?.artifact?.revisions.find((e) => e.id === a) : u?.artifact?.revisions.at(-1), f = u?.artifact?.pending, p = e.locked ? "Restricted work item" : e.title, h = s && u?.fresh === !0, g = u?.emphasis === "earlier" || u?.emphasis === "input", _ = !!u?.artifact?.revisions.length && e.status !== "running", v = Ye[e.kind], y = e.status === "error", b = u?.emphasis === "current" || !g && e.status === "running" && h, x = e.status === "running" && s && !h ? "Running · updates delayed" : e.status, S = u?.lines?.length ? u.lines : [x], C = {
		kind: "node",
		id: e.id,
		...d ? { revisionId: d.id } : {}
	}, w = () => c(C);
	return /* @__PURE__ */ A("div", {
		className: "pointer-events-auto relative w-[200px]",
		"data-emphasis": u?.emphasis ?? "current",
		"data-work-node": e.id,
		onClick: w,
		children: [
			/* @__PURE__ */ A("article", {
				role: "button",
				tabIndex: 0,
				"aria-label": `${p}, ${e.status}${e.status === "running" && !h ? ", updates delayed" : ""}`,
				"aria-pressed": r,
				"data-work-card": e.id,
				onKeyDown: (e) => {
					(e.key === "Enter" || e.key === " ") && (e.preventDefault(), w());
				},
				className: t("relative overflow-hidden rounded-lg border bg-surface text-left shadow-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary", y ? "border-danger" : b ? "border-info" : _ ? "border-success" : "border-border", y || b || _ ? "border-2" : "", _ && "bg-success-bg/40", g && "opacity-80", r && "ring-2 ring-primary/30"),
				children: [
					/* @__PURE__ */ k("span", {
						"aria-hidden": "true",
						className: t("absolute inset-y-0 left-0 w-[3px]", y ? "bg-danger" : _ ? "bg-success" : b ? "bg-info" : v.bar)
					}),
					/* @__PURE__ */ A("header", {
						className: "flex items-center gap-2 border-b border-border bg-surface-panel py-1.5 pl-3.5 pr-2.5",
						children: [
							/* @__PURE__ */ k("span", {
								"aria-hidden": "true",
								className: t("flex h-5 w-5 shrink-0 items-center justify-center rounded text-[11px] leading-none", v.chip),
								children: Je[e.kind]
							}),
							/* @__PURE__ */ k("span", {
								className: t("min-w-0 flex-1 truncate text-[12px] font-semibold", g ? "text-text-secondary" : "text-text-primary"),
								children: p
							}),
							/* @__PURE__ */ k("span", {
								"aria-hidden": "true",
								className: t("h-2 w-2 shrink-0 rounded-full", g ? "bg-border-emphasis" : Ze[e.status])
							})
						]
					}),
					/* @__PURE__ */ A("div", {
						className: t("space-y-1.5 py-2 pl-3.5 pr-2.5 text-[11px] leading-snug", g ? "text-text-tertiary" : "text-text-secondary"),
						children: [
							S.map((n, r) => /* @__PURE__ */ A("div", {
								className: "flex items-start justify-between gap-1.5",
								children: [/* @__PURE__ */ k("span", {
									className: "min-w-0",
									children: n
								}), r === 0 && u?.badge && /* @__PURE__ */ k("span", {
									className: t("shrink-0 rounded px-1.5 py-px text-[10px] font-semibold", e.status === "running" ? "border border-info-border text-info-fg" : "bg-info-bg text-info-fg"),
									children: u.badge
								})]
							}, `${r}-${n}`)),
							!!u?.participants?.length && /* @__PURE__ */ A("div", {
								className: "flex items-center gap-1.5",
								children: [/* @__PURE__ */ k("span", {
									className: "flex -space-x-1.5",
									children: u.participants.slice(0, 3).map((e) => /* @__PURE__ */ k(m, {
										name: e.label,
										src: e.avatarUrl,
										size: 18,
										className: "ring-1 ring-surface"
									}, e.id))
								}), /* @__PURE__ */ A("span", {
									className: "min-w-0 truncate text-[10px]",
									children: [u.participants.map((e) => e.label).slice(0, 2).join(", "), u.participants.length > 2 ? ` +${u.participants.length - 2}` : ""]
								})]
							}),
							u?.excerpt && /* @__PURE__ */ k("p", {
								className: t("text-[11px] italic", g ? "text-text-secondary" : "text-text-primary"),
								children: `“${u.excerpt}”`
							}),
							u?.attentionLabel && /* @__PURE__ */ k("p", {
								className: "font-medium text-text-primary",
								children: u.attentionLabel
							}),
							d?.preview && /* @__PURE__ */ k("div", {
								className: t("aspect-[16/10] w-full overflow-hidden rounded border border-border bg-surface", "flex items-center justify-center [&>*]:h-full [&>*]:w-full [&_img]:h-full [&_img]:w-full [&_img]:object-contain [&_svg]:h-full [&_svg]:w-full"),
								"aria-label": `${p} ${d.label} preview`,
								children: d.preview
							}),
							!!u?.artifact?.revisions.length && /* @__PURE__ */ A("div", {
								className: "flex flex-wrap items-center gap-1 text-[10px]",
								"aria-label": `${p} revisions`,
								children: [u.artifact.revisions.map((e) => /* @__PURE__ */ k("span", {
									className: t("rounded px-1.5 py-0.5", e.id === d?.id ? "bg-info-bg font-medium text-info-fg" : "text-text-tertiary"),
									children: e.label
								}, e.id)), f?.status === "generating" && /* @__PURE__ */ A("span", {
									className: "rounded px-1.5 py-0.5 text-info-fg",
									children: [f.label, " generating"]
								})]
							}),
							f?.status === "failed" && !u?.lines?.length && /* @__PURE__ */ A("p", {
								className: "text-danger-fg",
								children: [f.label, " generation failed"]
							})
						]
					}),
					u?.footer && /* @__PURE__ */ A("div", {
						className: "flex items-center justify-between gap-2 border-t border-border py-1.5 pl-3.5 pr-2.5 text-[10px] text-text-tertiary",
						children: [/* @__PURE__ */ k("span", {
							className: "truncate",
							children: u.footer.label
						}), u.footer.note && /* @__PURE__ */ k("span", {
							className: "shrink-0",
							children: u.footer.note
						})]
					})
				]
			}),
			!!u?.tools?.length && /* @__PURE__ */ A("div", {
				className: "flex flex-wrap items-center gap-1.5 pl-1 pt-1 text-[10px] text-text-tertiary",
				children: [/* @__PURE__ */ k("span", { children: "Tools" }), u.tools.map((e) => /* @__PURE__ */ k("span", {
					className: "rounded bg-surface-panel px-1.5 py-0.5 font-semibold text-text-secondary",
					children: e
				}, e))]
			}),
			!!u?.feedbackCount && l && (!a || d) && /* @__PURE__ */ A(i, {
				size: "sm",
				className: "nodrag nopan absolute -right-2 -top-3 h-7 w-7 rounded-full border border-border bg-surface shadow-sm",
				"aria-label": `${u.feedbackCount} comments on ${p}`,
				onClick: (e) => {
					e.stopPropagation(), l(C);
				},
				children: [/* @__PURE__ */ k(o, { size: 14 }), /* @__PURE__ */ k("span", {
					className: "absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-0.5 text-[10px] text-white",
					children: u.feedbackCount
				})]
			})
		]
	});
}
//#endregion
//#region src/components/graph/work/WorkActivityCanvas.tsx
var X = "!h-1.5 !w-1.5 !min-h-0 !min-w-0 !border-0 !bg-border-emphasis";
function $e({ data: e, selected: t }) {
	return /* @__PURE__ */ A(O, { children: [
		/* @__PURE__ */ k(F, {
			type: "target",
			id: "in-left",
			position: L.Left,
			isConnectable: !1,
			className: X
		}),
		/* @__PURE__ */ k(F, {
			type: "target",
			id: "in-top",
			position: L.Top,
			isConnectable: !1,
			className: X
		}),
		/* @__PURE__ */ k(Qe, {
			node: e.entity,
			detail: e.detail,
			live: e.live,
			selected: !!t,
			selectedRevisionId: e.revisionId,
			onSelect: e.onSelect,
			onFeedback: e.onFeedback
		}),
		/* @__PURE__ */ k(F, {
			type: "source",
			id: "out-right",
			position: L.Right,
			isConnectable: !1,
			className: X
		}),
		/* @__PURE__ */ k(F, {
			type: "source",
			id: "out-bottom",
			position: L.Bottom,
			isConnectable: !1,
			className: X
		})
	] });
}
function et({ data: e }) {
	return /* @__PURE__ */ k(h, {
		tone: "surface",
		title: /* @__PURE__ */ A("span", {
			className: "inline-flex items-center gap-1.5 font-sans text-[11px] font-semibold text-text-secondary",
			children: [e.live && /* @__PURE__ */ k("span", {
				"aria-hidden": "true",
				className: "inline-block h-1.5 w-1.5 rounded-full bg-primary/50"
			}), e.title]
		}),
		className: "pointer-events-none h-full w-full rounded-xl border-dashed border-border-subtle bg-surface/60",
		"data-testid": "work-effort",
		titleAction: /* @__PURE__ */ A("span", {
			className: "pointer-events-auto flex items-center gap-1",
			children: [e.sources > 0 && /* @__PURE__ */ k(n, {
				size: "sm",
				variant: "ghost",
				className: "nodrag nopan",
				"aria-label": `${e.expanded ? "Hide" : "Show"} ${e.sources} sources for ${e.title}`,
				onClick: e.onSources,
				children: e.expanded ? "Sources" : `+ ${e.sources} sources`
			}), /* @__PURE__ */ k(n, {
				size: "sm",
				variant: "ghost",
				className: "nodrag nopan",
				"aria-label": e.focused ? "Show all activities" : `Focus on ${e.title}`,
				onClick: e.onFocus,
				children: e.focused ? "All activities" : "Focus"
			})]
		}),
		children: /* @__PURE__ */ A("div", {
			className: "px-4 pt-1 text-[10px] text-text-tertiary",
			children: [e.subtitle, e.cycle && /* @__PURE__ */ k("span", {
				role: "status",
				className: "ml-2 text-warning-fg",
				children: "Relationship order unavailable"
			})]
		})
	});
}
function tt(e) {
	let n = e.data;
	return n ? /* @__PURE__ */ A(O, { children: [/* @__PURE__ */ k(x, {
		...e,
		data: { state: n.failed ? "traversed-failure" : n.active ? "active" : "default" }
	}), /* @__PURE__ */ k(P, { children: /* @__PURE__ */ k("button", {
		type: "button",
		className: t("nodrag nopan pointer-events-auto absolute z-10 flex items-center justify-center rounded-full text-[10px] font-medium leading-none focus-visible:outline-2 focus-visible:outline-primary", n.pill ? t("h-5 max-w-28 border bg-surface px-2 shadow-sm", n.failed ? "border-danger text-danger-fg" : n.active ? "border-info text-info-fg" : "border-border-emphasis text-text-secondary") : "h-3 w-3 border border-transparent bg-transparent text-transparent focus-visible:border-border focus-visible:bg-surface"),
		style: { transform: `translate(-50%, -50%) translate(${n.labelX}px, ${n.labelY}px)` },
		onClick: n.onSelect,
		"aria-label": `${n.label}${n.failed ? ", failed" : n.active ? ", active" : ""}`,
		title: n.label,
		"data-work-edge-label": n.canonicalId,
		children: n.pill ? /* @__PURE__ */ k("span", {
			className: "truncate",
			children: n.pill
		}) : /* @__PURE__ */ k("span", {
			className: "sr-only",
			children: n.label
		})
	}) })] }) : null;
}
var nt = {
	activity: $e,
	effort: et
}, rt = { activity: tt };
function it(e) {
	let { activity: r, nodes: a, edges: o, selection: s, viewport: c, onViewportChange: l, onSelectionChange: u } = e, d = E(null), [f, p] = D({
		width: 640,
		height: 480
	}), [m, h] = D(/* @__PURE__ */ new Map()), g = E(null), _ = E(r.view.focusedEffortId), { view: v, onViewChange: y } = r;
	C(() => {
		let e = d.current;
		if (!e || typeof ResizeObserver > "u") return;
		let t = new ResizeObserver(([e]) => {
			let { width: t, height: n } = e.contentRect;
			t > 0 && n > 0 && p((e) => e.width === t && e.height === n ? e : {
				width: t,
				height: n
			});
		});
		return t.observe(e), () => t.disconnect();
	}, []);
	let b = [...Object.keys(r.edgeLabels ?? {}), ...r.failedEdgeIds ?? []].sort().join("\0"), x = T(() => qe(a, o, r.efforts, {
		width: f.width,
		height: f.height,
		full: r.mode === "full",
		focusedEffortId: v.focusedEffortId,
		expandedSourceEfforts: v.expandedSourceEfforts,
		reversedEdgeIds: r.reversedEdgeIds,
		labelledEdgeIds: b.split("\0").filter(Boolean),
		measurements: m
	}), [
		a,
		o,
		r.efforts,
		r.mode,
		r.reversedEdgeIds,
		b,
		v.focusedEffortId,
		v.expandedSourceEfforts,
		f,
		m
	]), w = S(() => {
		let e = Math.min(0, ...x.map((e) => e.x)), t = Math.min(0, ...x.map((e) => e.y)), n = Math.max(1, ...x.map((e) => e.x + e.width)) - e, r = Math.max(1, ...x.map((e) => e.y + e.height)) - t, i = Math.max(.4, Math.min(1.2, (f.width - 48) / n, (f.height - 48) / r));
		return {
			x: (f.width - n * i) / 2 - e * i,
			y: (f.height - r * i) / 2 - t * i,
			zoom: i
		};
	}, [x, f]), O = JSON.stringify([
		f,
		r.mode,
		v.focusedEffortId,
		v.expandedSourceEfforts,
		x.map((e) => [
			e.id,
			e.nodes.map((e) => e.id),
			e.edges.map((e) => e.id)
		]),
		x.every((e) => e.nodes.every((e) => m.has(e.entityId)))
	]);
	C(() => {
		if (g.current === O) return;
		let e = g.current === null;
		g.current = O;
		let t = _.current && !v.focusedEffortId && v.overviewViewport;
		if (_.current = v.focusedEffortId, t) {
			l(t);
			return;
		}
		e && v.canvasInitialized || (l(w()), v.canvasInitialized || y({
			...v,
			canvasInitialized: !0
		}));
	}, [
		O,
		w,
		v,
		y,
		l
	]);
	let M = (e) => y({
		...v,
		focusedEffortId: v.focusedEffortId === e ? null : e,
		overviewViewport: v.focusedEffortId ? v.overviewViewport : c
	}), N = new Map(a.map((e) => [e.id, e])), P = new Map(o.map((e) => [e.id, e])), F = r.window.following, L = new Set(F ? r.activeEdgeIds : []), z = new Set(r.failedEdgeIds ?? []), B = [], V = [];
	for (let e of x) {
		let t = JSON.stringify(["effort", e.id]), n = v.expandedSourceEfforts.includes(e.id);
		B.push({
			id: t,
			type: "effort",
			position: {
				x: e.x,
				y: e.y
			},
			style: {
				width: e.width,
				height: e.height
			},
			selectable: !1,
			focusable: !1,
			data: {
				title: e.title,
				subtitle: e.subtitle,
				live: F && e.nodes.some((e) => N.get(e.entityId)?.status === "running"),
				sources: !v.focusedEffortId && (e.collapsedSourceCount > 0 || n) ? e.sourceCount : 0,
				expanded: n,
				focused: v.focusedEffortId === e.id,
				cycle: e.cyclicNodeIds.length > 0,
				onFocus: () => M(e.id),
				onSources: () => y({
					...v,
					expandedSourceEfforts: n ? v.expandedSourceEfforts.filter((t) => t !== e.id) : [...v.expandedSourceEfforts, e.id]
				})
			}
		});
		for (let n of e.nodes) B.push({
			id: n.id,
			type: "activity",
			parentId: t,
			extent: "parent",
			position: {
				x: n.x,
				y: n.y
			},
			selected: s?.kind === "node" && s.id === n.entityId,
			focusable: !1,
			data: {
				entity: N.get(n.entityId),
				detail: r.details?.[n.entityId],
				revisionId: s?.kind === "node" && s.id === n.entityId ? s.revisionId : void 0,
				live: F,
				onSelect: u,
				onFeedback: r.onFeedback
			}
		});
		for (let t of e.edges) {
			let n = P.get(t.entityId), i = e.x + t.labelX, a = e.y + t.labelY, o = L.has(n.id) && n.status === "running" && !n.endedAt, c = z.has(n.id), l = n.label || n.relation.replaceAll("-", " "), d = r.edgeLabels?.[n.id] ?? (c ? "failed" : void 0);
			V.push({
				id: t.id,
				type: "activity",
				source: t.source,
				target: t.target,
				sourceHandle: t.sourceHandle,
				targetHandle: t.targetHandle,
				selected: s?.kind === "edge" && s.id === n.id,
				focusable: !1,
				markerEnd: {
					type: I.ArrowClosed,
					color: c ? "var(--color-danger)" : "var(--color-border-emphasis)"
				},
				data: {
					canonicalId: n.id,
					label: l,
					pill: d,
					active: o,
					failed: c,
					labelX: i,
					labelY: a,
					onSelect: () => u({
						kind: "edge",
						id: n.id
					})
				}
			});
		}
	}
	let H = new Map(B.filter((e) => e.type === "activity").map((e) => [e.id, e.data.entity.id])), U = (e) => l({
		...c,
		zoom: Math.max(.4, Math.min(2.5, c.zoom * e))
	});
	return /* @__PURE__ */ A("div", {
		ref: d,
		className: "relative min-h-80 min-w-0 flex-1 overflow-hidden",
		"data-testid": "work-activity-canvas",
		children: [
			/* @__PURE__ */ k(R, {
				nodes: B,
				edges: V,
				nodeTypes: nt,
				edgeTypes: rt,
				viewport: c,
				onViewportChange: l,
				onPaneClick: () => u(null),
				onEdgeClick: (e, t) => t.data?.onSelect(),
				minZoom: .4,
				maxZoom: 2.5,
				nodesDraggable: !1,
				nodesConnectable: !1,
				elementsSelectable: !1,
				deleteKeyCode: null,
				proOptions: { hideAttribution: !0 },
				onNodesChange: (e) => {
					let t = e.filter((e) => e.type === "dimensions");
					t.length && h((e) => {
						let n = new Map(e), r = !1;
						for (let i of t) {
							let t = H.get(i.id);
							if (!t || !i.dimensions) continue;
							let a = e.get(t), o = {
								width: Math.max(a?.width ?? 0, i.dimensions.width),
								height: Math.max(a?.height ?? 0, i.dimensions.height)
							};
							(a?.width !== o.width || a?.height !== o.height) && (n.set(t, o), r = !0);
						}
						return r ? n : e;
					});
				},
				children: /* @__PURE__ */ k(j, {
					gap: 20,
					size: 1,
					color: "var(--color-border)"
				})
			}),
			/* @__PURE__ */ A("div", {
				className: "absolute bottom-3 left-3 flex items-center gap-1 rounded-md border border-border bg-surface p-1",
				"data-testid": "work-activity-controls",
				children: [
					/* @__PURE__ */ k(i, {
						size: "sm",
						"aria-label": "Zoom in",
						onClick: () => U(1.2),
						children: "+"
					}),
					/* @__PURE__ */ k(i, {
						size: "sm",
						"aria-label": "Zoom out",
						onClick: () => U(1 / 1.2),
						children: "−"
					}),
					/* @__PURE__ */ k(n, {
						size: "sm",
						variant: "secondary",
						onClick: () => l(w()),
						children: "Fit graph"
					})
				]
			}),
			/* @__PURE__ */ k("ul", {
				"aria-label": "Activity emphasis legend",
				className: "pointer-events-none absolute bottom-4 right-4 flex items-center gap-2 rounded bg-surface/90 px-2 py-1 text-[10px] text-text-tertiary",
				children: [
					[
						"earlier",
						"Earlier",
						"border-border bg-surface-inset opacity-70"
					],
					[
						"input",
						"Input",
						"border-border-emphasis bg-surface-inset"
					],
					[
						"active",
						F ? "Active" : "Active then",
						"border-info bg-info"
					]
				].map(([e, n, r]) => /* @__PURE__ */ A("li", {
					className: "flex items-center gap-1",
					children: [/* @__PURE__ */ k("span", {
						"aria-hidden": "true",
						className: t("inline-block h-2 w-2 rounded-sm border", r)
					}), n]
				}, e))
			})
		]
	});
}
//#endregion
//#region src/components/graph/work/WorkActivityHeader.tsx
function at({ title: e, subtitle: n, expanded: r = !1, onExpand: o, onPopOut: s, onClose: c, actions: l, className: u, "data-testid": d = "work-activity-header" }) {
	return /* @__PURE__ */ A("header", {
		"data-testid": d,
		className: t("flex shrink-0 items-center justify-between gap-2 border-b border-border bg-surface px-3 py-1.5", u),
		children: [/* @__PURE__ */ A("span", {
			className: "flex min-w-0 flex-col",
			children: [/* @__PURE__ */ k("span", {
				className: "truncate text-[12px] font-semibold text-text-secondary",
				"data-testid": `${d}-title`,
				children: e
			}), n && /* @__PURE__ */ k("span", {
				className: "truncate text-[11px] text-text-tertiary",
				"data-testid": `${d}-subtitle`,
				children: n
			})]
		}), /* @__PURE__ */ A("span", {
			className: "flex shrink-0 items-center gap-1",
			children: [
				l,
				o && /* @__PURE__ */ k(y, {
					content: r ? "Show chat" : "Expand activity",
					placement: "bottom",
					children: /* @__PURE__ */ k(i, {
						size: "md",
						"aria-label": r ? "Show chat" : "Expand activity",
						"aria-pressed": r,
						onClick: o,
						"data-testid": `${d}-expand`,
						children: /* @__PURE__ */ k("svg", {
							width: "16",
							height: "16",
							viewBox: "0 0 16 16",
							fill: "none",
							stroke: "currentColor",
							strokeWidth: "1.5",
							strokeLinecap: "round",
							strokeLinejoin: "round",
							"aria-hidden": "true",
							children: r ? /* @__PURE__ */ A(O, { children: [/* @__PURE__ */ k("rect", {
								x: "2",
								y: "2.5",
								width: "12",
								height: "11",
								rx: "1.5"
							}), /* @__PURE__ */ k("path", { d: "M6 2.5v11" })] }) : /* @__PURE__ */ k("path", { d: "M6 2H2v4M10 2h4v4M14 10v4h-4M6 14H2v-4" })
						})
					})
				}),
				s && /* @__PURE__ */ k(y, {
					content: "Open activity in its own page",
					placement: "bottom",
					children: /* @__PURE__ */ k(i, {
						size: "md",
						"aria-label": "Open activity in its own page",
						onClick: s,
						"data-testid": `${d}-pop-out`,
						children: /* @__PURE__ */ k("svg", {
							width: "16",
							height: "16",
							viewBox: "0 0 16 16",
							fill: "none",
							stroke: "currentColor",
							strokeWidth: "1.5",
							strokeLinecap: "round",
							strokeLinejoin: "round",
							"aria-hidden": "true",
							children: /* @__PURE__ */ k("path", { d: "M9 2h5v5M14 2 7 9M6 3H3a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1v-3" })
						})
					})
				}),
				c && /* @__PURE__ */ k(y, {
					content: "Close activity",
					placement: "bottom",
					children: /* @__PURE__ */ k(i, {
						size: "md",
						"aria-label": "Close activity",
						onClick: c,
						"data-testid": `${d}-close`,
						children: /* @__PURE__ */ k(a, {})
					})
				})
			]
		})]
	});
}
//#endregion
//#region src/components/graph/work/WorkArtifactInspector.tsx
function ot(e, t) {
	let n = t.revisionId ? e.revisions.find((e) => e.id === t.revisionId) : e.revisions.at(-1), r = n?.slides ?? [];
	return {
		revision: n,
		slides: r,
		slide: r.find((e) => e.id === t.anchorId) ?? r.find((e) => e.id === n?.anchorId) ?? r[0]
	};
}
function st({ node: e, artifact: r, selection: a, onSelectionChange: o, onOpen: s, onReference: c, quiet: l = !1 }) {
	let u = w(), { revision: p, slides: m, slide: h } = ot(r, a), g = h ? m.indexOf(h) : -1, v = {
		...a,
		revisionId: p?.id,
		anchorId: h?.id ?? p?.anchorId
	}, y = e.capabilities.includes("view-document") || e.capabilities.includes("edit-document"), b = r.pending, x = (t) => o({
		kind: "node",
		id: e.id,
		revisionId: p?.id,
		anchorId: t
	}), S = [...r.revisions.map((e) => ({
		id: e.id,
		label: e.label
	})), ...b?.status === "generating" ? [{
		id: b.id,
		label: `${b.label} · Generating`,
		disabled: !0
	}] : []];
	return /* @__PURE__ */ A("div", {
		className: "space-y-3",
		children: [
			r.revisions.length > 0 && /* @__PURE__ */ A("section", {
				className: "space-y-1.5",
				children: [/* @__PURE__ */ k("h3", {
					className: "text-[10px] font-semibold uppercase tracking-wide text-text-tertiary",
					children: "Revisions"
				}), /* @__PURE__ */ k(d, {
					idPrefix: u,
					"aria-label": "Available revisions",
					variant: "segmented",
					size: "sm",
					className: "w-full [&>button]:flex-1",
					items: S,
					value: p?.id ?? "",
					onValueChange: (t) => {
						t !== b?.id && o({
							kind: "node",
							id: e.id,
							revisionId: t
						});
					}
				})]
			}),
			b?.status === "generating" && !l && /* @__PURE__ */ A("p", {
				role: "status",
				className: "text-xs text-text-secondary",
				children: [
					b.label,
					" is generating. You can review available revisions.",
					b.message ? ` ${b.message}` : ""
				]
			}),
			b?.status === "failed" && !l && /* @__PURE__ */ A("p", {
				role: "status",
				className: "text-xs text-danger-fg",
				children: [
					b.label,
					" could not be generated.",
					b.message ? ` ${b.message}` : ""
				]
			}),
			p ? /* @__PURE__ */ A(f, {
				idPrefix: u,
				id: p.id,
				when: p.id,
				className: "space-y-2",
				children: [
					/* @__PURE__ */ k("div", {
						"aria-label": `${p.label} preview`,
						className: t("aspect-video overflow-hidden rounded border border-border bg-surface", Xe),
						children: h?.preview ?? p.preview ?? /* @__PURE__ */ k("span", {
							className: "flex h-full items-center justify-center text-sm text-text-secondary",
							children: "Preview unavailable"
						})
					}),
					m.length > 0 && h && /* @__PURE__ */ A("div", {
						className: "flex items-center gap-1",
						children: [
							/* @__PURE__ */ k(i, {
								size: "sm",
								"aria-label": "Previous slide",
								disabled: g <= 0,
								onClick: () => x(m[g - 1].id),
								children: "‹"
							}),
							/* @__PURE__ */ A("span", {
								className: "flex-1 text-center text-xs text-text-secondary",
								children: [
									"Slide ",
									h.index,
									" of ",
									m.length
								]
							}),
							/* @__PURE__ */ k(i, {
								size: "sm",
								"aria-label": "Next slide",
								disabled: g >= m.length - 1,
								onClick: () => x(m[g + 1].id),
								children: "›"
							}),
							/* @__PURE__ */ k(_, {
								size: "sm",
								"aria-label": "Slide",
								className: "w-32",
								value: h.id,
								options: m.map((e) => ({
									value: e.id,
									label: `${e.index}. ${e.title}`
								})),
								onChange: (e) => x(e.target.value)
							})
						]
					}),
					r.onOpenPreview && /* @__PURE__ */ k(n, {
						size: "sm",
						variant: "secondary",
						fullWidth: !0,
						onClick: () => r.onOpenPreview(p.id, h?.id ?? p.anchorId),
						children: "Open larger preview"
					}),
					!h && /* @__PURE__ */ k("p", {
						className: "text-xs text-text-secondary",
						children: p.anchorLabel ?? p.label
					})
				]
			}) : /* @__PURE__ */ k("p", {
				className: "text-sm text-text-secondary",
				children: a.revisionId ? "The selected revision is unavailable." : "No revision is available yet."
			}),
			/* @__PURE__ */ A("div", {
				className: "flex flex-wrap gap-2",
				children: [y && s && p && /* @__PURE__ */ k(n, {
					size: "sm",
					variant: "secondary",
					onClick: () => s(v),
					children: "Open presentation"
				}), c && p && /* @__PURE__ */ k(n, {
					size: "sm",
					variant: "secondary",
					onClick: () => c(v),
					children: "Reference in chat"
				})]
			})
		]
	});
}
//#endregion
//#region src/components/graph/work/WorkNodePane.tsx
var ct = {
	info: {
		card: "border-info-border bg-info-bg",
		dot: "bg-info",
		title: "text-info-fg"
	},
	success: {
		card: "border-success-border bg-success-bg",
		dot: "bg-success",
		title: "text-success-fg"
	},
	error: {
		card: "border-danger-border bg-danger-bg",
		dot: "bg-danger",
		title: "text-danger-fg"
	}
};
function lt({ banner: e }) {
	let n = ct[e.tone];
	return /* @__PURE__ */ A("div", {
		role: "status",
		className: t("flex gap-2 rounded-md border p-2.5", n.card),
		"data-testid": "work-pane-banner",
		"data-tone": e.tone,
		children: [/* @__PURE__ */ k("span", {
			"aria-hidden": "true",
			className: t("mt-1.5 h-2 w-2 shrink-0 rounded-full", n.dot)
		}), /* @__PURE__ */ A("span", {
			className: "min-w-0",
			children: [/* @__PURE__ */ k("span", {
				className: t("block text-[13px] font-semibold", n.title),
				children: e.title
			}), e.description && /* @__PURE__ */ k("span", {
				className: "block text-xs text-text-secondary",
				children: e.description
			})]
		})]
	});
}
function Z({ label: e, children: t }) {
	return /* @__PURE__ */ A("section", {
		className: "space-y-1.5",
		children: [/* @__PURE__ */ k("h3", {
			className: "text-[10px] font-semibold uppercase tracking-wide text-text-tertiary",
			children: e
		}), t]
	});
}
function ut({ item: e, onSelect: t }) {
	let n = /* @__PURE__ */ A(O, { children: [
		/* @__PURE__ */ k("span", {
			"aria-hidden": "true",
			className: "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded bg-info-bg text-[11px] text-info-fg",
			children: "▤"
		}),
		/* @__PURE__ */ A("span", {
			className: "min-w-0 flex-1",
			children: [/* @__PURE__ */ k("span", {
				className: "block truncate text-[13px] font-medium text-text-primary",
				children: e.title
			}), e.meta && /* @__PURE__ */ k("span", {
				className: "block truncate text-xs text-text-tertiary",
				children: e.meta
			})]
		}),
		e.selection && t && /* @__PURE__ */ k("span", {
			"aria-hidden": "true",
			className: "shrink-0 text-text-tertiary",
			children: "↗"
		})
	] });
	return !e.selection || !t ? /* @__PURE__ */ k("div", {
		className: "flex gap-2 rounded-md border border-border p-2",
		children: n
	}) : /* @__PURE__ */ k("button", {
		type: "button",
		className: "flex w-full gap-2 rounded-md border border-border p-2 text-left hover:border-border-emphasis focus-visible:outline-2 focus-visible:outline-primary",
		onClick: () => t(e.selection),
		children: n
	});
}
function dt({ transcript: e, onSelect: t }) {
	let n = w(), [r, i] = D("transcript"), a = e.ask;
	return /* @__PURE__ */ A("div", {
		className: "space-y-3",
		"data-testid": "work-transcript-panel",
		children: [
			/* @__PURE__ */ k(d, {
				idPrefix: n,
				"aria-label": "Transcript views",
				variant: "underline",
				size: "sm",
				value: r,
				onValueChange: i,
				items: [{
					id: "transcript",
					label: "Transcript"
				}, ...a ? [{
					id: "ask",
					label: "Ask"
				}] : []]
			}),
			/* @__PURE__ */ A(f, {
				idPrefix: n,
				id: "transcript",
				when: r,
				className: "space-y-3",
				children: [e.segments.map((e) => /* @__PURE__ */ A("div", {
					className: "space-y-0.5",
					children: [/* @__PURE__ */ A("p", {
						className: "flex items-baseline gap-2 text-xs",
						children: [/* @__PURE__ */ k("span", {
							className: "tabular-nums text-text-tertiary",
							children: e.at
						}), /* @__PURE__ */ k("span", {
							className: "font-semibold text-text-primary",
							children: e.speaker
						})]
					}), /* @__PURE__ */ k("p", {
						className: "text-[13px] leading-snug text-text-secondary",
						children: e.text
					})]
				}, e.id)), !e.segments.length && /* @__PURE__ */ k("p", {
					className: "text-sm text-text-secondary",
					children: "No transcript rows are shared with you."
				})]
			}),
			a && /* @__PURE__ */ k(f, {
				idPrefix: n,
				id: "ask",
				when: r,
				children: /* @__PURE__ */ k(ft, {
					ask: a,
					onSelect: t
				})
			})
		]
	});
}
function ft({ ask: e, onSelect: t }) {
	let [r, i] = D(""), [a, o] = D(null), [c, l] = D(null), [u, d] = D(!1);
	if (!e.enabled) return /* @__PURE__ */ k("p", {
		className: "text-sm text-text-secondary",
		children: e.unavailableLabel ?? "Ask is unavailable for this transcript."
	});
	let f = async () => {
		if (!(!r.trim() || u)) {
			d(!0), l(null);
			try {
				o(await e.onAsk(r.trim()));
			} catch {
				o(null), l("That question could not be answered right now.");
			} finally {
				d(!1);
			}
		}
	};
	return /* @__PURE__ */ A("div", {
		className: "space-y-2",
		children: [
			/* @__PURE__ */ k("label", {
				className: "block text-xs text-text-secondary",
				htmlFor: "work-ask-input",
				children: "Ask this transcript"
			}),
			/* @__PURE__ */ A("div", {
				className: "flex gap-1.5",
				children: [/* @__PURE__ */ k(p, {
					id: "work-ask-input",
					size: "sm",
					className: "flex-1",
					placeholder: e.placeholder ?? "Anything for me?",
					value: r,
					onChange: (e) => i(e.target.value),
					onKeyDown: (e) => {
						e.key === "Enter" && f();
					}
				}), /* @__PURE__ */ k(n, {
					size: "sm",
					variant: "primary",
					disabled: u || !r.trim(),
					onClick: () => void f(),
					children: "Ask"
				})]
			}),
			c && /* @__PURE__ */ k("p", {
				role: "status",
				className: "text-xs text-danger-fg",
				children: c
			}),
			a && /* @__PURE__ */ A("div", {
				className: "space-y-2 rounded-md border border-border p-2.5",
				"data-testid": "work-ask-answer",
				children: [
					/* @__PURE__ */ k("p", {
						className: "text-[13px] leading-snug text-text-primary",
						children: a.text
					}),
					!!a.citations?.length && /* @__PURE__ */ k("div", {
						className: "flex flex-wrap gap-1.5",
						children: a.citations.map((e) => e.selection && t ? /* @__PURE__ */ A(n, {
							size: "sm",
							variant: "secondary",
							onClick: () => t(e.selection),
							children: [e.label, " ↗"]
						}, e.id) : /* @__PURE__ */ k(s, {
							size: "sm",
							children: e.label
						}, e.id))
					}),
					a.note && /* @__PURE__ */ k("p", {
						className: "text-[11px] text-text-tertiary",
						children: a.note
					})
				]
			})
		]
	});
}
function pt({ node: e, detail: r, selection: o, onSelectionChange: c, onClose: l, onOpen: u, onReference: d, className: f, "data-testid": p = "activity-inspector" }) {
	let m = e.locked || e.disclosure === "existence", h = m ? void 0 : r, g = e.locked ? "Restricted work item" : e.title, _ = h?.sections, v = h?.artifact ? ot(h.artifact, o) : void 0, y = v?.revision ? {
		...o,
		revisionId: v.revision.id,
		anchorId: v.slide?.id ?? o.anchorId ?? v.revision.anchorId
	} : { ...o }, b = !h?.banner && !h?.artifact && !h?.transcript && !_ && !h?.note && !h?.actions?.length;
	return /* @__PURE__ */ A("section", {
		"aria-label": g,
		"data-testid": p,
		className: t("flex h-full min-h-0 flex-col border-l border-border bg-surface", f),
		children: [
			/* @__PURE__ */ A("header", {
				className: "flex shrink-0 items-start justify-between gap-2 border-b border-border px-3 py-2",
				children: [/* @__PURE__ */ A("span", {
					className: "flex min-w-0 flex-col",
					children: [/* @__PURE__ */ k("span", {
						className: "truncate text-sm font-semibold text-text-primary",
						"data-testid": `${p}-title`,
						children: g
					}), h?.subtitle && /* @__PURE__ */ k("span", {
						className: "truncate text-xs text-text-tertiary",
						"data-testid": `${p}-subtitle`,
						children: h.subtitle
					})]
				}), /* @__PURE__ */ k(i, {
					size: "md",
					"aria-label": "Close details",
					onClick: l,
					"data-testid": `${p}-close`,
					className: "shrink-0",
					children: /* @__PURE__ */ k(a, {})
				})]
			}),
			/* @__PURE__ */ A("div", {
				className: "min-h-0 flex-1 space-y-4 overflow-auto p-3",
				children: [
					h?.banner && /* @__PURE__ */ k(lt, { banner: h.banner }),
					_?.description && /* @__PURE__ */ k("p", {
						className: "text-[13px] leading-snug text-text-secondary",
						children: _.description
					}),
					h?.artifact && /* @__PURE__ */ k(st, {
						node: e,
						artifact: h.artifact,
						selection: o,
						onSelectionChange: c,
						onOpen: u,
						quiet: !!h.banner
					}),
					h?.transcript && /* @__PURE__ */ k(dt, {
						transcript: h.transcript,
						onSelect: c
					}),
					!!_?.inputs?.length && /* @__PURE__ */ k(Z, {
						label: "Inputs",
						children: /* @__PURE__ */ k("div", {
							className: "flex flex-wrap gap-1.5",
							children: _.inputs.map((e, t) => typeof e == "string" ? /* @__PURE__ */ k(s, {
								size: "sm",
								children: e
							}, `${t}-${e}`) : /* @__PURE__ */ k(s, {
								size: "sm",
								title: e.meta,
								children: e.title
							}, e.id))
						})
					}),
					!!_?.tools?.length && /* @__PURE__ */ k(Z, {
						label: "Tools in this run",
						children: /* @__PURE__ */ k("div", {
							className: "flex flex-wrap gap-1.5",
							children: _.tools.map((e, t) => /* @__PURE__ */ k(s, {
								size: "sm",
								tone: "info",
								children: e
							}, `${t}-${e}`))
						})
					}),
					!!_?.sources?.length && /* @__PURE__ */ k(Z, {
						label: "Sources used",
						children: /* @__PURE__ */ k("div", {
							className: "space-y-1.5",
							children: _.sources.map((e) => /* @__PURE__ */ k(ut, {
								item: e,
								onSelect: c
							}, e.id))
						})
					}),
					_?.workItem && /* @__PURE__ */ k(Z, {
						label: "Work item",
						children: /* @__PURE__ */ k(ut, {
							item: _.workItem,
							onSelect: c
						})
					}),
					!!h?.actions?.length && /* @__PURE__ */ k("div", {
						className: "flex flex-wrap gap-2",
						children: h.actions.map((e) => /* @__PURE__ */ k(n, {
							size: "sm",
							variant: "secondary",
							onClick: () => {
								e.onSelect?.(), e.selection && c(e.selection);
							},
							children: e.label
						}, e.id))
					}),
					h?.note && /* @__PURE__ */ k("p", {
						className: "text-xs leading-snug text-text-tertiary",
						children: h.note
					}),
					b && /* @__PURE__ */ k("p", {
						className: "text-sm text-text-secondary",
						children: m ? "Only the existence of this work is shared with you." : "No further detail is shared with you."
					})
				]
			}),
			d && !m && /* @__PURE__ */ k("div", {
				className: "shrink-0 border-t border-border p-2",
				children: /* @__PURE__ */ k(n, {
					size: "sm",
					variant: "secondary",
					fullWidth: !0,
					onClick: () => d(y),
					children: "Reference in chat"
				})
			})
		]
	});
}
//#endregion
//#region src/components/forms/RangeSlider.tsx
function mt({ value: e, min: n, max: r, step: i = 1, minDistance: a = i, labels: o, formatValue: s, onChange: c, className: l }) {
	let u = w(), d = Math.max(1, r - n), f = (e) => Math.max(n, Math.min(r, e)), p = f(e[0]), m = Math.max(p, f(e[1])), h = Math.min(a, r - n);
	return /* @__PURE__ */ A("div", {
		className: t("relative h-7 min-w-0", l),
		children: [
			/* @__PURE__ */ k("div", { className: "absolute inset-x-0 top-3 h-1 rounded-full bg-surface-inset" }),
			/* @__PURE__ */ k("div", {
				className: "absolute top-3 h-1 rounded-full bg-primary/30",
				style: {
					left: `${(p - n) / d * 100}%`,
					right: `${(r - m) / d * 100}%`
				}
			}),
			[0, 1].map((e) => /* @__PURE__ */ k("input", {
				id: `${u}-${e}`,
				type: "range",
				min: n,
				max: r,
				step: i,
				value: e === 0 ? p : m,
				disabled: r <= n,
				"aria-label": o[e],
				"aria-valuemin": e === 0 ? n : Math.min(r, p + h),
				"aria-valuemax": e === 0 ? Math.max(n, m - h) : r,
				"aria-valuetext": s?.(e === 0 ? p : m),
				onChange: (t) => {
					let n = f(Number(t.target.value));
					c(e === 0 ? [Math.min(n, m - h), m] : [p, Math.max(n, p + h)]);
				},
				className: "pointer-events-none absolute inset-0 m-0 h-7 w-full appearance-none bg-transparent accent-primary focus-visible:outline-2 focus-visible:outline-primary [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:cursor-ew-resize [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-surface [&::-webkit-slider-thumb]:bg-primary [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:cursor-ew-resize [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-surface [&::-moz-range-thumb]:bg-primary"
			}, e))
		]
	});
}
//#endregion
//#region src/components/graph/work/WorkTimeWindow.tsx
var Q = 6e4, $ = 60 * Q, ht = [
	[2 * $, 30 * Q],
	[6 * $, $],
	[12 * $, 2 * $],
	[Infinity, 3 * $]
];
function gt({ activity: e, timezone: r = "UTC" }) {
	let { bounds: a, window: o, onWindowChange: s } = e, c = Math.max(Q, o.end - o.start), l = new Intl.DateTimeFormat(void 0, {
		timeZone: r,
		hour: "numeric",
		minute: "2-digit"
	}), u = (e) => l.format(e), d = new Intl.DateTimeFormat("en-GB", {
		timeZone: r,
		hour: "2-digit",
		minute: "2-digit",
		hourCycle: "h23"
	}), f = (e) => {
		let t = d.formatToParts(e), n = t.find((e) => e.type === "hour")?.value ?? "0", r = t.find((e) => e.type === "minute")?.value ?? "00";
		return `${Number(n)}:${r}`;
	}, p = e.now ?? (o.following ? o.end : Date.now()), m = e.temporalMode === "recent" || o.following ? Math.min(a.end, Math.max(a.start + Q, p)) : a.end, h = Math.max(1, m - a.start), g = (e) => Math.min(100, Math.max(0, (e - a.start) / h * 100)), v = (e, t, n = c) => {
		let r = Math.max(a.start + Math.min(n, h), Math.min(m, e));
		s({
			start: Math.max(a.start, r - n),
			end: r,
			following: t
		});
	}, y = [
		15,
		30,
		60
	].find((e) => c === e * Q), b = o.start === a.start && o.end >= m, x = o.end >= m, S = [Math.min(Math.max(o.start, a.start), m), Math.min(Math.max(o.end, a.start), m)], C = ht.find(([e]) => h <= e)[1], w = [];
	for (let e = Math.ceil(a.start / C) * C; e <= m; e += C) (e - a.start) / h < .82 && w.push(e);
	return /* @__PURE__ */ A("div", {
		className: "shrink-0 border-b border-border bg-surface px-3 pb-3 pt-2",
		"aria-label": "Work time window",
		children: [
			/* @__PURE__ */ A("div", {
				className: "flex flex-wrap items-center gap-1.5 text-xs text-text-secondary",
				children: [
					/* @__PURE__ */ A("strong", {
						"aria-live": "polite",
						title: r,
						className: "tabular-nums font-semibold text-text-primary",
						children: [
							f(S[0]),
							" – ",
							x ? "Now" : f(S[1])
						]
					}),
					/* @__PURE__ */ k("span", { className: "flex-1" }),
					/* @__PURE__ */ k(i, {
						size: "sm",
						"aria-label": "Previous interval",
						disabled: o.start <= a.start,
						onClick: () => v(o.end - c, !1),
						children: "‹"
					}),
					/* @__PURE__ */ k(i, {
						size: "sm",
						"aria-label": "Next interval",
						disabled: x,
						onClick: () => v(o.end + c, !1),
						children: "›"
					}),
					/* @__PURE__ */ A(n, {
						size: "sm",
						variant: "secondary",
						disabled: o.following,
						onClick: () => v(m, !0),
						children: [/* @__PURE__ */ k("span", {
							"aria-hidden": "true",
							className: t("mr-1 inline-block h-1.5 w-1.5 rounded-full align-middle", o.following ? "bg-success" : "bg-border-emphasis")
						}), o.following ? "Following now" : "Back to now"]
					}),
					/* @__PURE__ */ k(_, {
						"aria-label": "Interval duration",
						value: b ? "day" : y ? String(y) : "custom",
						size: "sm",
						className: "w-auto",
						options: [
							...!y && !b ? [{
								value: "custom",
								label: "Custom"
							}] : [],
							{
								value: "15",
								label: "15 min"
							},
							{
								value: "30",
								label: "30 min"
							},
							{
								value: "60",
								label: "1 hour"
							},
							{
								value: "day",
								label: "Full day"
							}
						],
						onChange: (e) => v(o.end, o.following, e.target.value === "day" ? h : Number(e.target.value) * Q)
					})
				]
			}),
			/* @__PURE__ */ A("div", {
				className: "relative mx-1 mt-2 h-4 text-[10px] text-text-tertiary",
				"aria-hidden": "true",
				"data-testid": "work-time-ruler",
				children: [w.map((e) => /* @__PURE__ */ k("span", {
					className: "absolute top-0 -translate-x-1/2 first:translate-x-0 tabular-nums",
					style: { left: `${g(e)}%` },
					children: f(e)
				}, e)), /* @__PURE__ */ A("span", {
					className: "absolute right-0 top-0 font-semibold tabular-nums text-text-secondary",
					children: ["Now ", f(m)]
				})]
			}),
			/* @__PURE__ */ k("div", {
				className: "relative mx-1 h-3 border-b border-border",
				"aria-label": "Activity markers",
				children: e.events?.filter((e) => e.at >= a.start && e.at <= m && e.count > 0).map((e) => {
					let n = e.at >= S[0] && e.at <= S[1];
					return /* @__PURE__ */ k("button", {
						type: "button",
						"aria-label": `${e.count} events at ${u(e.at)}`,
						title: `${e.count} events at ${u(e.at)}`,
						className: t("absolute bottom-0.5 h-2 w-2 -translate-x-1/2 rounded-full focus-visible:outline-2 focus-visible:outline-primary", n ? "bg-primary ring-2 ring-primary/20" : "bg-primary/40"),
						style: {
							left: `${g(e.at)}%`,
							opacity: Math.min(1, .45 + Math.log2(e.count + 1) / 5)
						},
						onClick: () => v(e.at, !1)
					}, e.at);
				})
			}),
			/* @__PURE__ */ k(mt, {
				className: "mx-1",
				value: S,
				min: a.start,
				max: m,
				step: Q,
				labels: ["Interval start", "Interval end"],
				formatValue: u,
				onChange: ([e, t]) => s({
					start: e,
					end: t,
					following: !1
				})
			}),
			!o.following && e.temporalMode === "recent" && /* @__PURE__ */ k("p", {
				className: "text-xs text-text-secondary",
				children: "Recent work · statuses reflect the latest available state"
			})
		]
	});
}
//#endregion
//#region src/components/graph/work/WorkActivityGraph.tsx
var _t = 820;
function vt(e) {
	let { nodes: r, edges: i, selection: a, activity: o, onSelectionChange: s } = e, c = E(null), l = E(null), u = E(null), [d, f] = D(!1), [p, m] = D(!0), h = a?.kind === "node" ? r.find((e) => e.id === a.id) : void 0, g = a?.kind === "edge" ? i.find((e) => e.id === a.id && r.some((t) => t.id === e.fromId) && r.some((t) => t.id === e.toId)) : void 0, _ = !!(h || g), { window: v, bounds: y, onWindowChange: x, onEarlier: S } = o, w = o.detailsPlacement ?? "auto", T = w === "overlay" || w === "auto" && !p;
	C(() => {
		a && !_ && s(null);
	}, [
		a,
		_,
		s
	]), C(() => {
		a && c.current?.contains(document.activeElement) && document.activeElement instanceof HTMLElement && !document.activeElement.closest("[data-testid=\"activity-inspector\"]") && (u.current = document.activeElement);
	}, [a]), C(() => {
		let e = l.current;
		if (!e || typeof ResizeObserver > "u") return;
		let t = new ResizeObserver(([e]) => m(e.contentRect.width >= _t));
		return t.observe(e), () => t.disconnect();
	}, []);
	let O = () => {
		s(null), requestAnimationFrame(() => {
			u.current?.isConnected && u.current.focus();
		});
	}, j = () => {
		if (S) {
			S();
			return;
		}
		let e = Math.max(6e4, v.end - v.start), t = Math.max(y.start, v.start - e);
		x({
			start: t,
			end: t + e,
			following: !1
		});
	}, M = T ? "absolute inset-y-0 right-0 z-10 w-[min(340px,85%)] shadow-lg" : "w-[340px] max-w-[45%] shrink-0";
	return /* @__PURE__ */ A("section", {
		ref: c,
		"aria-label": "Shared work graph",
		className: t("flex h-full min-h-0 min-w-0 flex-col bg-surface", e.className),
		onKeyDown: (e) => {
			e.key === "Escape" && a && (e.stopPropagation(), O());
		},
		children: [
			o.title && /* @__PURE__ */ k(at, {
				title: o.title,
				subtitle: o.subtitle,
				expanded: o.expanded ?? o.mode === "full",
				onExpand: o.onExpand,
				onPopOut: o.onPopOut,
				onClose: o.onClose
			}),
			e.state === "partial" && /* @__PURE__ */ k("p", {
				role: "status",
				className: "border-b border-warning-border bg-warning-bg px-3 py-1 text-xs text-warning-fg",
				children: "Some work sources are delayed or unavailable."
			}),
			/* @__PURE__ */ A("div", {
				ref: l,
				className: "relative flex min-h-0 min-w-0 flex-1",
				children: [/* @__PURE__ */ A("div", {
					className: "flex min-h-0 min-w-0 flex-1 flex-col",
					children: [
						/* @__PURE__ */ k(gt, {
							activity: o,
							timezone: e.timezone
						}),
						/* @__PURE__ */ k(it, { ...e }),
						/* @__PURE__ */ A("div", {
							className: "flex h-9 shrink-0 items-center justify-between gap-2 border-t border-border px-4 text-[10px] text-text-tertiary",
							"data-testid": "work-activity-footer",
							children: [o.view.focusedEffortId ? /* @__PURE__ */ k(n, {
								size: "sm",
								variant: "ghost",
								onClick: () => o.onViewChange({
									...o.view,
									focusedEffortId: null
								}),
								children: "← All activities"
							}) : /* @__PURE__ */ A("span", { children: [o.efforts.length, " parallel activities · Newest work first"] }), /* @__PURE__ */ k(n, {
								size: "sm",
								variant: "ghost",
								disabled: v.start <= y.start,
								onClick: j,
								children: "← Earlier work"
							})]
						})
					]
				}), w !== "none" && _ && (h && a?.kind === "node" ? /* @__PURE__ */ k(pt, {
					node: h,
					detail: o.details?.[h.id],
					selection: a,
					onSelectionChange: s,
					onClose: O,
					onOpen: e.onOpen,
					onReference: e.onReference,
					className: M
				}) : /* @__PURE__ */ k(b, {
					title: g?.label || "Relationship",
					onClose: O,
					className: M,
					"data-testid": "activity-inspector",
					children: /* @__PURE__ */ k(Fe, { ...e })
				}))]
			}),
			/* @__PURE__ */ k("div", {
				className: "shrink-0 border-t border-border px-2 py-1",
				children: /* @__PURE__ */ k(n, {
					size: "sm",
					variant: "ghost",
					"aria-expanded": d,
					onClick: () => f(!d),
					children: d ? "Hide accessible list" : "View as accessible list"
				})
			}),
			d && /* @__PURE__ */ k("div", {
				className: "max-h-60 shrink-0 overflow-auto p-3",
				children: /* @__PURE__ */ k(Ae, { ...e })
			})
		]
	});
}
//#endregion
//#region src/components/graph/work/WorkGraph.tsx
var yt = 328, bt = 224, xt = {
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
function St(e) {
	return e.locked ? "Restricted work item" : e.title.trim() || "Untitled work item";
}
function Ct({ data: e }) {
	return /* @__PURE__ */ A("div", {
		className: "w-[248px]",
		children: [
			/* @__PURE__ */ k(F, {
				type: "target",
				position: L.Left,
				isConnectable: !1,
				className: "opacity-0"
			}),
			/* @__PURE__ */ k(Te, {
				node: e.entity,
				selected: e.selected,
				onSelect: e.onSelect,
				onOpen: e.onOpen
			}),
			/* @__PURE__ */ k(F, {
				type: "source",
				position: L.Right,
				isConnectable: !1,
				className: "opacity-0"
			})
		]
	});
}
function wt({ id: t, sourceX: n, sourceY: r, targetX: i, targetY: a, sourcePosition: o, targetPosition: s, markerEnd: c, data: l }) {
	let u = e(), [d, f, p] = z({
		sourceX: n,
		sourceY: r,
		targetX: i,
		targetY: a,
		sourcePosition: o,
		targetPosition: s
	});
	if (!l) return null;
	let m = l.entity.status === "running" && !l.entity.endedAt;
	return /* @__PURE__ */ A(O, { children: [
		/* @__PURE__ */ k(M, {
			id: t,
			path: d,
			markerEnd: c,
			interactionWidth: 24,
			className: l.selected ? "stroke-primary" : "stroke-border-emphasis"
		}),
		m && !u ? /* @__PURE__ */ k("circle", {
			r: "4",
			className: "fill-primary",
			"aria-hidden": "true",
			"data-testid": `work-edge-motion-${l.entity.id}`,
			children: /* @__PURE__ */ k("animateMotion", {
				dur: "2s",
				repeatCount: "indefinite",
				path: d
			})
		}) : null,
		/* @__PURE__ */ k("foreignObject", {
			x: f - 104,
			y: p - 40,
			width: "208",
			height: "80",
			className: "overflow-visible",
			children: /* @__PURE__ */ k("div", {
				className: "nodrag nopan w-52",
				"data-work-edge-label": l.entity.id,
				children: /* @__PURE__ */ k(De, {
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
var Tt = { work: Ct }, Et = { work: wt };
function Dt(e, t) {
	let n = new Set(e.map((e) => e.id)), r = new Map(e.map((e) => [e.id, 0])), i = new Map(e.map((e) => [e.id, []]));
	for (let e of t) !n.has(e.fromId) || !n.has(e.toId) || e.fromId === e.toId || (i.get(e.fromId)?.push(e.toId), r.set(e.toId, (r.get(e.toId) ?? 0) + 1));
	let a = /* @__PURE__ */ new Map(), o = e.filter((e) => r.get(e.id) === 0).sort(Ot).map((e) => e.id);
	for (let e of o) a.set(e, 0);
	for (let e = 0; e < o.length; e += 1) {
		let t = o[e], n = (a.get(t) ?? 0) + 1;
		for (let e of (i.get(t) ?? []).sort()) a.set(e, Math.max(a.get(e) ?? 0, n)), r.set(e, (r.get(e) ?? 1) - 1), r.get(e) === 0 && o.push(e);
	}
	for (let t of [...e].sort(Ot)) a.has(t.id) || a.set(t.id, xt[t.kind] % 4);
	let s = /* @__PURE__ */ new Map();
	for (let t of e) {
		let e = a.get(t.id) ?? 0, n = s.get(e) ?? [];
		n.push(t), s.set(e, n);
	}
	let c = /* @__PURE__ */ new Map(), l = new Map(e.map((e) => [e.id, []]));
	for (let e of t) l.get(e.toId)?.push(e.fromId);
	let u = /* @__PURE__ */ new Map();
	for (let e of [...s.keys()].sort((e, t) => e - t)) {
		let t = s.get(e);
		t.sort((e, t) => {
			let n = (e) => {
				let t = (l.get(e) ?? []).map((e) => u.get(e)).filter((e) => e !== void 0);
				return t.length ? t.reduce((e, t) => e + t, 0) / t.length : Infinity;
			};
			return n(e.id) - n(t.id) || Ot(e, t);
		}), t.forEach((t, n) => {
			u.set(t.id, n), c.set(t.id, {
				x: 48 + e * yt,
				y: 48 + n * bt
			});
		});
	}
	return c;
}
function Ot(e, t) {
	return xt[e.kind] - xt[t.kind] || e.id.localeCompare(t.id);
}
function kt(e, t, n) {
	return e ? e.kind === "node" ? t.some((t) => t.id === e.id) : n.some((t) => t.id === e.id) : !1;
}
function At({ state: e, errorMessage: t, onRetry: r }) {
	return e === "loading" ? /* @__PURE__ */ k("div", {
		role: "status",
		"data-testid": "work-graph-loading",
		className: "flex min-h-[22rem] items-center justify-center rounded-lg border border-border bg-surface text-sm text-text-secondary",
		children: "Loading shared work…"
	}) : e === "error" ? /* @__PURE__ */ k(c, {
		testId: "work-graph-error",
		icon: "!",
		title: "Shared work is unavailable",
		description: t || "The work graph could not be loaded.",
		action: r ? /* @__PURE__ */ k(n, {
			onClick: r,
			children: "Try again"
		}) : void 0
	}) : /* @__PURE__ */ k(c, {
		testId: "work-graph-empty",
		icon: "○",
		title: "No shared work",
		description: "There is no shared work available for this day."
	});
}
function jt({ nodes: e, edges: n, selection: r, viewport: i, day: a, timezone: o, sources: s = [], state: c = "ready", errorMessage: l, className: u, onSelectionChange: d, onViewportChange: f, onRetry: p, onOpen: m, onReference: h, onRequestCollaboration: g }) {
	let _ = T(() => new Set(e.map((e) => e.id)), [e]), v = T(() => n.filter((e) => _.has(e.fromId) && _.has(e.toId)), [n, _]), y = kt(r, e, v) ? r : null;
	C(() => {
		r && !y && d(null);
	}, [
		y,
		d,
		r
	]);
	let b = Dt(e.map((e) => ({
		id: e.id,
		kind: e.kind
	})), v), x = new Map(e.map((e) => [e.id, e])), S = e.map((e) => ({
		id: e.id,
		type: "work",
		position: b.get(e.id) ?? {
			x: 0,
			y: 0
		},
		selected: y?.kind === "node" && y.id === e.id,
		draggable: !1,
		connectable: !1,
		data: {
			entity: e,
			selected: y?.kind === "node" && y.id === e.id,
			onSelect: (e) => d({
				kind: "node",
				id: e
			}),
			onOpen: m ? (e) => m({
				kind: "node",
				id: e
			}) : void 0
		}
	})), w = v.map((e) => ({
		id: e.id,
		type: "work",
		source: e.fromId,
		target: e.toId,
		selected: y?.kind === "edge" && y.id === e.id,
		focusable: !1,
		data: {
			entity: e,
			selected: y?.kind === "edge" && y.id === e.id,
			fromLabel: St(x.get(e.fromId)),
			toLabel: St(x.get(e.toId)),
			onSelect: (e) => d({
				kind: "edge",
				id: e
			})
		}
	}));
	if (c === "loading" || c === "error" || c === "empty" || e.length === 0) return /* @__PURE__ */ k("section", {
		"aria-label": "Shared work graph",
		className: t("min-w-0", u),
		children: /* @__PURE__ */ k(At, {
			state: c === "ready" ? "empty" : c,
			errorMessage: l,
			onRetry: p
		})
	});
	let E = s.filter((e) => e.health !== "available");
	return /* @__PURE__ */ A("section", {
		"aria-label": "Shared work graph",
		className: t("min-w-0 space-y-4", u),
		"data-state": c,
		children: [
			c === "partial" ? /* @__PURE__ */ A("div", {
				role: "status",
				"data-testid": "work-graph-partial",
				className: "rounded-lg border border-warning-border bg-warning-bg px-3 py-2 text-sm text-warning-fg",
				children: [/* @__PURE__ */ k("p", {
					className: "font-medium",
					children: "Some work sources are unavailable or delayed."
				}), E.length > 0 ? /* @__PURE__ */ k("ul", {
					className: "mt-1 list-disc pl-5 text-xs",
					children: E.map((e) => /* @__PURE__ */ k("li", { children: e.message || `${e.source} is ${e.health}.` }, e.source))
				}) : null]
			}) : null,
			a ? /* @__PURE__ */ k(Ke, {
				day: a,
				timezone: o || "UTC",
				nodes: e,
				edges: v,
				selection: y,
				onSelectionChange: d
			}) : null,
			/* @__PURE__ */ A("div", {
				className: "grid min-w-0 grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_20rem]",
				"data-testid": "work-graph-layout",
				children: [/* @__PURE__ */ k("div", {
					className: "relative h-[clamp(22rem,55vh,42rem)] min-w-0 overflow-hidden rounded-lg border border-border bg-surface",
					"data-testid": "work-graph-canvas",
					children: /* @__PURE__ */ A(R, {
						nodes: S,
						edges: w,
						nodeTypes: Tt,
						edgeTypes: Et,
						viewport: i,
						onViewportChange: f,
						onPaneClick: () => d(null),
						minZoom: .35,
						maxZoom: 2.5,
						nodesDraggable: !1,
						nodesConnectable: !1,
						elementsSelectable: !1,
						onlyRenderVisibleElements: !0,
						proOptions: { hideAttribution: !0 },
						children: [/* @__PURE__ */ k(j, {
							gap: 20,
							size: 1,
							color: "var(--color-border)"
						}), /* @__PURE__ */ k(N, { showInteractive: !1 })]
					})
				}), /* @__PURE__ */ k(Fe, {
					nodes: e,
					edges: v,
					selection: y,
					onSelectionChange: d,
					onOpen: m,
					onReference: h,
					onRequestCollaboration: g
				})]
			}),
			/* @__PURE__ */ k(Ae, {
				nodes: e,
				edges: v,
				selection: y,
				onSelectionChange: d,
				onOpen: m,
				onReference: h,
				onRequestCollaboration: g
			})
		]
	});
}
function Mt(e) {
	return e.activity && e.nodes.length > 0 && e.state !== "loading" && e.state !== "error" && e.state !== "empty" ? /* @__PURE__ */ k(vt, {
		...e,
		activity: e.activity
	}) : /* @__PURE__ */ k(jt, { ...e });
}
//#endregion
export { se as C, H as D, V as E, te as S, B as T, ge as _, dt as a, pe as b, Ue as c, Ae as d, De as f, _e as g, ve as h, lt as i, Ve as l, be as m, mt as n, st as o, Te as p, pt as r, at as s, Mt as t, Fe as u, fe as v, K as w, me as x, he as y };
