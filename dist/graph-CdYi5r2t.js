import { t as e } from "./usePrefersReducedMotion-Cllucr7i.js";
import { t } from "./cn-DhjIN-s0.js";
import { t as n } from "./Button-BhS4-R6_.js";
import { t as r } from "./Card-RQCeAPNU.js";
import { t as i } from "./IconButton-C3DMtvSx.js";
import { o as a } from "./Icons-CQiDn2Ki.js";
import { t as o } from "./Chip-BENLwTlq.js";
import { t as s } from "./EmptyState-JzzL2z1E.js";
import { t as c } from "./Spinner-CLcq5z8N.js";
import { t as l } from "./SkeletonCard-CGe8XFPB.js";
import { n as u, t as d } from "./Tabs-Bc6QoOAC.js";
import { t as f } from "./Input-DLknWXri.js";
import { t as p } from "./Avatar-BzicCOft.js";
import { t as m } from "./TitledFrame-DUsxfZCI.js";
import { n as h } from "./Tooltip-CNcSG30U.js";
import { t as g } from "./Select-CqVokE2v.js";
import { t as _ } from "./Checkbox-DqN9RkXK.js";
import { n as v } from "./ChatSidePanelRegistry-CQhaeb1a.js";
/* empty css               */
import { d as y, t as b } from "./BaseNode-e2p30Fsu.js";
import { useCallback as x, useEffect as S, useId as C, useMemo as w, useRef as T, useState as E } from "react";
import { Fragment as D, jsx as O, jsxs as k } from "react/jsx-runtime";
import { Background as A, BaseEdge as j, Controls as M, EdgeLabelRenderer as N, Handle as P, MarkerType as ee, Position as F, ReactFlow as te, getBezierPath as ne } from "@xyflow/react";
//#region src/components/graph/layout.ts
function I(e) {
	let t = e.find((e) => e.group === "center");
	if (t) return t;
	let n = null, r = !1;
	for (let t of e) typeof t.weight == "number" && (!n || t.weight > n.weight ? (n = t, r = !1) : t.weight === n.weight && (r = !0));
	return n && !r ? n : null;
}
function L(e) {
	let t = [];
	for (let n of e) {
		let e = n.group ?? "";
		e !== "center" && (t.includes(e) || t.push(e));
	}
	return t;
}
function re(e, t, n, r) {
	if (e.length === 0) return /* @__PURE__ */ new Map();
	switch (n) {
		case "grid": return ae(e, r);
		case "force": return oe(e, t, r);
		default: return ie(e, r);
	}
}
function ie(e, { width: t, height: n, padding: r = 40 }) {
	let i = /* @__PURE__ */ new Map(), a = t / 2, o = n / 2, s = I(e), c = e.filter((e) => e !== s);
	if (s && i.set(s.id, {
		x: a,
		y: o
	}), c.length === 0) return i;
	let l = L(c), u = /* @__PURE__ */ new Map();
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
				x: R(a + r * Math.cos(n)),
				y: R(o + r * Math.sin(n))
			});
		});
	}), i;
}
function ae(e, { width: t, height: n, padding: r = 40 }) {
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
				x: R(n),
				y: R(u)
			});
		});
	}), i;
}
function oe(e, t, { width: n, height: r, padding: i = 40 }) {
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
			x: R(b + (s[t] - p) * y),
			y: R(x + (c[t] - h) * y)
		});
	}), S;
}
function R(e) {
	return Math.round(e * 100) / 100;
}
//#endregion
//#region src/components/graph/NodeGraph.tsx
var se = 480, ce = [
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
], le = {
	fill: "fill-primary",
	bg: "bg-primary"
};
function z(e, t) {
	if (e === "center") return le;
	let n = t.indexOf(e ?? "");
	return ce[(n < 0 ? 0 : n) % ce.length];
}
var ue = .5, de = 4, fe = {
	x: 0,
	y: 0,
	k: 1
};
function B({ nodes: e, edges: n, layout: r = "radial", selectedId: a = null, onSelect: o, height: s = 320, className: c, "data-testid": l = "node-graph" }) {
	let u = w(() => re(e, n, r, {
		width: 480,
		height: s
	}), [
		e,
		n,
		r,
		480,
		s
	]), d = w(() => L(e), [e]), f = w(() => I(e), [e]), p = w(() => pe(e, f), [e, f]), [m, h] = E(fe), [g, _] = E(null), v = T(null), y = T(null), [b, x] = E(!1), C = () => {
		let e = v.current?.getBoundingClientRect();
		return e && e.width > 0 ? 480 / e.width : 1;
	};
	S(() => {
		let e = v.current;
		if (!e) return;
		let t = (t) => {
			t.preventDefault();
			let n = e.getBoundingClientRect(), r = n.width > 0 ? 480 / n.width : 1, i = (t.clientX - n.left) * r, a = (t.clientY - n.top) * r;
			h((e) => {
				let n = he(e.k * (t.deltaY < 0 ? 1.1 : 1 / 1.1), ue, de), r = n / e.k;
				return {
					k: n,
					x: i - (i - e.x) * r,
					y: a - (a - e.y) * r
				};
			});
		};
		return e.addEventListener("wheel", t, { passive: !1 }), () => e.removeEventListener("wheel", t);
	}, [480]);
	let A = (e) => {
		e.button === 0 && (y.current = {
			startX: e.clientX,
			startY: e.clientY,
			originX: m.x,
			originY: m.y
		}, x(!0));
	};
	S(() => {
		if (!b) return;
		let e = (e) => {
			let t = y.current;
			if (!t) return;
			let n = C();
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
	}, N = m.x === 0 && m.y === 0 && m.k === 1, P = w(() => new Map(e.map((e) => [e.id, e])), [e]);
	return /* @__PURE__ */ k("div", {
		className: t("relative flex flex-col overflow-hidden rounded-lg border border-border bg-surface", c),
		"data-testid": l,
		children: [
			/* @__PURE__ */ O("svg", {
				ref: v,
				role: "img",
				"aria-label": `Graph of ${e.length} nodes`,
				viewBox: `0 0 480 ${s}`,
				width: "100%",
				height: s,
				className: t("block select-none touch-none", b ? "cursor-grabbing" : "cursor-grab"),
				onMouseDown: A,
				"data-testid": `${l}-svg`,
				children: /* @__PURE__ */ k("g", {
					transform: `translate(${m.x} ${m.y}) scale(${m.k})`,
					"data-testid": `${l}-viewport`,
					children: [n.map((e, t) => {
						let n = u.get(e.from), r = u.get(e.to);
						if (!n || !r) return null;
						let i = a !== null && (e.from === a || e.to === a);
						return /* @__PURE__ */ k("g", {
							"data-testid": `${l}-edge-${e.from}-${e.to}`,
							children: [/* @__PURE__ */ O("line", {
								x1: n.x,
								y1: n.y,
								x2: r.x,
								y2: r.y,
								strokeWidth: me(e.weight),
								className: i ? "stroke-primary" : "stroke-border-emphasis"
							}), e.label && /* @__PURE__ */ O("text", {
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
						let r = p.get(e.id) ?? 16, i = e.id === a, o = z(e.group, d), s = `${l}-clip-${e.id}`;
						return /* @__PURE__ */ k("g", {
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
								/* @__PURE__ */ O("title", { children: e.sublabel ?? e.label }),
								(i || g === e.id) && /* @__PURE__ */ O("circle", {
									r: r + 4,
									className: t("fill-none", i ? "stroke-primary" : "stroke-border-emphasis"),
									strokeWidth: 2,
									strokeDasharray: i ? void 0 : "3 3"
								}),
								e.avatarUrl ? /* @__PURE__ */ k(D, { children: [
									/* @__PURE__ */ O("clipPath", {
										id: s,
										children: /* @__PURE__ */ O("circle", { r })
									}),
									/* @__PURE__ */ O("circle", {
										r,
										className: t("stroke-surface", o.fill),
										strokeWidth: 2
									}),
									/* @__PURE__ */ O("image", {
										href: e.avatarUrl,
										x: -r,
										y: -r,
										width: r * 2,
										height: r * 2,
										clipPath: `url(#${s})`,
										preserveAspectRatio: "xMidYMid slice"
									})
								] }) : /* @__PURE__ */ O("circle", {
									r,
									fill: e.color,
									className: t("stroke-surface", !e.color && o.fill),
									strokeWidth: 2
								}),
								!e.avatarUrl && /* @__PURE__ */ O("text", {
									y: 1,
									textAnchor: "middle",
									dominantBaseline: "middle",
									className: "pointer-events-none fill-white text-[10px] font-semibold",
									children: ge(e.label)
								}),
								/* @__PURE__ */ O("text", {
									y: r + 12,
									textAnchor: "middle",
									className: "pointer-events-none fill-text-primary text-[11px]",
									children: e.label
								}),
								e === f && e.sublabel && /* @__PURE__ */ O("text", {
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
			/* @__PURE__ */ k("div", {
				className: "pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-2",
				children: [d.length > 0 && (d.length > 1 || d[0] !== "") ? /* @__PURE__ */ O("ul", {
					"aria-label": "Legend",
					className: "pointer-events-auto flex flex-wrap gap-x-3 gap-y-1 rounded-md bg-surface/85 px-2 py-1 text-[11px] text-text-secondary",
					"data-testid": `${l}-legend`,
					children: d.map((e) => /* @__PURE__ */ k("li", {
						className: "flex items-center gap-1",
						children: [/* @__PURE__ */ O("span", {
							"aria-hidden": !0,
							className: t("inline-block h-2 w-2 rounded-full", z(e, d).bg)
						}), e || "Other"]
					}, e || "(none)"))
				}) : /* @__PURE__ */ O("span", {}), /* @__PURE__ */ O(i, {
					size: "sm",
					"aria-label": "Reset view",
					title: "Reset view",
					disabled: N,
					onClick: () => h(fe),
					className: "pointer-events-auto bg-surface/85",
					"data-testid": `${l}-reset`,
					children: "⟲"
				})]
			}),
			a && P.get(a) && /* @__PURE__ */ k("span", {
				className: "sr-only",
				"aria-live": "polite",
				children: ["Selected ", P.get(a).label]
			})
		]
	});
}
function pe(e, t) {
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
function me(e) {
	return typeof e == "number" ? he(1 + e * 1.5, 1, 5) : 1.5;
}
function he(e, t, n) {
	return Math.min(n, Math.max(t, e));
}
function ge(e) {
	let t = e.trim().split(/\s+/).filter(Boolean);
	return t.length === 0 ? "" : t.length === 1 ? t[0].slice(0, 2).toUpperCase() : (t[0][0] + t[t.length - 1][0]).toUpperCase();
}
//#endregion
//#region src/components/graph/PeopleGraph.tsx
var V = "__query__";
function H(e, t) {
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
function _e(e, t) {
	let n = [{
		id: V,
		label: t?.trim() || "Everyone",
		sublabel: `${e.length} ${e.length === 1 ? "person" : "people"}`,
		group: "center"
	}], r = [];
	for (let i of e) {
		let e = H(i, t);
		n.push({
			id: i.id,
			label: i.name,
			sublabel: i.title,
			group: e,
			weight: i.score,
			avatarUrl: i.avatarUrl
		}), r.push({
			from: V,
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
function ve({ people: e, query: i, onOpenPerson: a, onMessagePerson: c, graphHeight: l = 300, className: u, "data-testid": d = "people-graph" }) {
	let [f, m] = E(null), { nodes: h, edges: g } = w(() => _e(e, i), [e, i]), _ = w(() => L(h), [h]);
	return e.length === 0 ? /* @__PURE__ */ O(s, {
		size: "sm",
		icon: "🕸️",
		title: "No people found",
		body: i ? `Nothing matched “${i}”.` : "There is nobody to show yet.",
		testId: `${d}-empty`,
		className: u
	}) : /* @__PURE__ */ O("div", {
		className: t("@container flex min-h-0 flex-col gap-3 p-3", u),
		"data-testid": d,
		children: /* @__PURE__ */ k("div", {
			className: "flex min-h-0 flex-col gap-3 @lg:flex-row",
			children: [/* @__PURE__ */ O(B, {
				nodes: h,
				edges: g,
				layout: "radial",
				height: l,
				selectedId: f,
				onSelect: (e) => m(e.id === "__query__" ? null : e.id),
				className: "@lg:flex-1",
				"data-testid": `${d}-graph`
			}), /* @__PURE__ */ O("ul", {
				className: "flex min-w-0 flex-col gap-2 @lg:w-[260px] @lg:shrink-0",
				"aria-label": "People",
				"data-testid": `${d}-list`,
				children: e.map((e) => {
					let s = H(e, i), l = e.id === f;
					return /* @__PURE__ */ O("li", { children: /* @__PURE__ */ k(r, {
						padding: "none",
						className: t("flex cursor-pointer items-center gap-3 p-2", l && "ring-2 ring-primary"),
						onClick: () => m(l ? null : e.id),
						"data-testid": `${d}-row-${e.id}`,
						"data-selected": l || void 0,
						children: [
							/* @__PURE__ */ O("span", {
								className: t("h-2 w-2 shrink-0 rounded-full", z(s, _).bg),
								"aria-hidden": !0
							}),
							/* @__PURE__ */ O(p, {
								name: e.name,
								src: e.avatarUrl,
								size: 28
							}),
							/* @__PURE__ */ k("span", {
								className: "flex min-w-0 flex-1 flex-col",
								children: [
									/* @__PURE__ */ O("span", {
										className: "truncate text-[13px] font-medium text-text-primary",
										children: e.name
									}),
									e.title && /* @__PURE__ */ O("span", {
										className: "truncate text-[11px] text-text-tertiary",
										children: e.title
									}),
									s && /* @__PURE__ */ O("span", {
										className: "mt-0.5",
										children: /* @__PURE__ */ O(o, {
											size: "xs",
											children: s
										})
									})
								]
							}),
							/* @__PURE__ */ k("span", {
								className: "flex shrink-0 items-center gap-1",
								children: [c && /* @__PURE__ */ O(n, {
									size: "sm",
									variant: "secondary",
									onClick: (t) => {
										t.stopPropagation(), c(e.id);
									},
									"data-testid": `${d}-message-${e.id}`,
									children: "Message"
								}), a && /* @__PURE__ */ O(n, {
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
function ye(e) {
	return Array.isArray(e.people);
}
function be(e) {
	return (t, n) => /* @__PURE__ */ O(U, {
		panel: t,
		api: n,
		options: e
	});
}
function U({ panel: e, api: t, options: r }) {
	let { load: i, onOpenPerson: a, onMessagePerson: o, onSelectNode: s, graphHeight: u = 300, "data-testid": d = "graph-panel" } = r, [f, p] = E({ status: "loading" }), [m, g] = E(0), [_, v] = E(null);
	S(() => {
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
	let y = x(() => g((e) => e + 1), []), b = {
		panel: e,
		api: t
	};
	if (f.status === "loading") return /* @__PURE__ */ k("div", {
		className: "relative flex flex-col gap-3 p-3",
		"data-testid": `${d}-loading`,
		"aria-busy": "true",
		children: [
			/* @__PURE__ */ O(l, {
				height: u,
				rounded: "lg"
			}),
			/* @__PURE__ */ O(l, { height: 44 }),
			/* @__PURE__ */ O(l, { height: 44 }),
			/* @__PURE__ */ O("div", {
				className: "absolute inset-0 flex items-center justify-center",
				children: /* @__PURE__ */ O(c, {
					size: "md",
					"aria-label": "Loading graph"
				})
			})
		]
	});
	if (f.status === "error") return /* @__PURE__ */ k("div", {
		className: "flex flex-col gap-2 p-3",
		"data-testid": `${d}-error`,
		children: [/* @__PURE__ */ k(h, {
			tone: "error",
			children: ["Could not load this graph: ", f.message]
		}), /* @__PURE__ */ O(n, {
			size: "sm",
			variant: "secondary",
			onClick: y,
			className: "self-start",
			"data-testid": `${d}-retry`,
			children: "Try again"
		})]
	});
	let { data: C } = f;
	return ye(C) ? /* @__PURE__ */ O(ve, {
		people: C.people,
		query: C.query ?? e.params?.q ?? e.params?.query,
		graphHeight: u,
		onOpenPerson: a ? (e) => a(e, b) : void 0,
		onMessagePerson: o ? (e) => o(e, b) : void 0,
		"data-testid": `${d}-people`
	}) : /* @__PURE__ */ O("div", {
		className: "p-3",
		"data-testid": `${d}-nodes`,
		children: /* @__PURE__ */ O(B, {
			nodes: C.nodes,
			edges: C.edges,
			layout: C.layout ?? "force",
			height: u,
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
var xe = {
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
function W({ status: n, sharingFresh: r = !1, label: i, className: a }) {
	let o = e(), s = xe[n], c = i ?? s.label, l = n === "running" && r && !o;
	return /* @__PURE__ */ k("span", {
		role: "status",
		"aria-label": i ? `${s.label}: ${i}` : s.label,
		"data-status": n,
		"data-sharing-fresh": r ? "true" : "false",
		className: t("inline-flex items-center gap-1.5 whitespace-nowrap text-xs font-medium", s.tone, a),
		children: [/* @__PURE__ */ O("span", {
			"aria-hidden": "true",
			className: t("inline-flex h-4 w-4 items-center justify-center rounded-full border border-current text-[10px] leading-none", l && "animate-pulse"),
			children: s.icon
		}), /* @__PURE__ */ O("span", { children: c })]
	});
}
//#endregion
//#region src/components/graph/work/WorkNode.tsx
var G = {
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
}, Se = {
	terminal: "observe-terminal",
	document: "view-document",
	conversation: "join-conversation",
	meeting: "join-meeting",
	transcript: "view-transcript",
	run: "view-run"
}, Ce = {
	terminal: "Observe",
	document: "View",
	conversation: "Open chat",
	meeting: "Join",
	transcript: "View",
	run: "View"
};
function K(e) {
	if (!e) return null;
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? null : t.toLocaleString(void 0, {
		dateStyle: "medium",
		timeStyle: "short"
	});
}
function we(e) {
	return e.locked ? "Restricted work item" : e.title.trim() || `${G[e.kind]} (untitled)`;
}
function Te({ node: e, selected: r = !1, sharingFresh: i = !1, onSelect: a, onOpen: o }) {
	let s = we(e), c = Se[e.kind], l = c !== void 0 && e.capabilities.includes(c), u = Ce[e.kind] ?? "Open", d = K(e.updatedAt), f = K(e.startedAt), m = K(e.endedAt), h = () => a?.(e.id);
	return /* @__PURE__ */ k("article", {
		role: "group",
		tabIndex: 0,
		"aria-label": `${G[e.kind]}: ${s}`,
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
			/* @__PURE__ */ k("div", {
				className: "flex min-w-0 items-start gap-2",
				children: [
					/* @__PURE__ */ O(p, {
						name: e.locked ? "Restricted work item" : s,
						...!e.locked && e.avatarUrl ? { src: e.avatarUrl } : {},
						size: 32
					}),
					/* @__PURE__ */ k("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ O("div", {
							className: "mb-1 text-[11px] font-medium uppercase tracking-wide text-text-tertiary",
							children: G[e.kind]
						}), /* @__PURE__ */ O("h3", {
							className: "break-words line-clamp-2 text-sm font-semibold text-text-primary",
							"data-testid": "work-node-title",
							children: s
						})]
					}),
					r && /* @__PURE__ */ O("span", {
						className: "sr-only",
						children: "Selected"
					})
				]
			}),
			e.kind === "conversation" && e.status === "completed" ? /* @__PURE__ */ O("span", {
				role: "status",
				className: "text-xs font-medium text-text-secondary",
				children: "Recent activity"
			}) : /* @__PURE__ */ O(W, {
				status: e.status,
				sharingFresh: i
			}),
			!e.locked && e.description && /* @__PURE__ */ O("p", {
				className: "break-words line-clamp-3 text-xs text-text-secondary",
				children: e.description
			}),
			/* @__PURE__ */ k("dl", {
				className: "grid min-w-0 gap-1 text-[11px] text-text-tertiary",
				children: [
					f && /* @__PURE__ */ k("div", { children: [/* @__PURE__ */ O("dt", {
						className: "inline font-medium",
						children: e.kind === "conversation" ? "First activity: " : "Started: "
					}), /* @__PURE__ */ O("dd", {
						className: "inline",
						children: f
					})] }),
					/* @__PURE__ */ k("div", { children: [/* @__PURE__ */ O("dt", {
						className: "inline font-medium",
						children: e.kind === "conversation" ? "Last activity: " : "Updated: "
					}), /* @__PURE__ */ O("dd", {
						className: "inline",
						children: d ?? "Unknown"
					})] }),
					m && /* @__PURE__ */ k("div", { children: [/* @__PURE__ */ O("dt", {
						className: "inline font-medium",
						children: "Ended: "
					}), /* @__PURE__ */ O("dd", {
						className: "inline",
						children: m
					})] })
				]
			}),
			l && c && /* @__PURE__ */ O(n, {
				size: "sm",
				variant: "secondary",
				disabled: !l || !o,
				"data-capability": c,
				"aria-label": `${u} ${G[e.kind].toLowerCase()}`,
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
	return /* @__PURE__ */ k("button", {
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
			/* @__PURE__ */ O("span", {
				"aria-hidden": "true",
				className: t("h-px min-w-4 flex-1 bg-border", n ? "bg-primary" : "group-hover:bg-primary/50")
			}),
			/* @__PURE__ */ k("span", {
				className: "min-w-0 flex-1",
				children: [/* @__PURE__ */ O("span", {
					className: "block truncate text-xs font-medium text-text-primary",
					children: l
				}), /* @__PURE__ */ k("span", {
					className: "block truncate text-[11px] text-text-tertiary",
					children: [
						i,
						" → ",
						a
					]
				})]
			}),
			/* @__PURE__ */ O(W, { status: e.status }),
			/* @__PURE__ */ O("span", {
				"aria-hidden": "true",
				className: t("h-px min-w-4 flex-1 bg-border", n ? "bg-primary" : "group-hover:bg-primary/50")
			}),
			n && /* @__PURE__ */ O("span", {
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
function q(e) {
	return e.locked ? "Restricted work item" : e.title.trim() || "Untitled work item";
}
function ke(e, t) {
	let n = t.get(e.fromId), r = t.get(e.toId), i = n ? q(n) : "Unavailable item", a = r ? q(r) : "Unavailable item";
	return e.label?.trim() || `${i} ${e.relation} ${a}`;
}
function J({ nodes: e, edges: n, selection: r, onSelectionChange: i, heading: a = "Accessible work graph" }) {
	let o = new Map(e.map((e) => [e.id, e]));
	return /* @__PURE__ */ k("section", {
		"aria-labelledby": "work-entity-list-heading",
		className: "min-w-0 space-y-3",
		children: [/* @__PURE__ */ O("h3", {
			id: "work-entity-list-heading",
			className: "text-sm font-semibold text-text-primary",
			children: a
		}), e.length === 0 && n.length === 0 ? /* @__PURE__ */ O("p", {
			className: "text-sm text-text-secondary",
			children: "No shared work is available."
		}) : /* @__PURE__ */ k("div", {
			className: "grid gap-3 md:grid-cols-2",
			children: [/* @__PURE__ */ k("div", { children: [/* @__PURE__ */ O("h4", {
				className: "mb-1 text-xs font-medium uppercase tracking-wide text-text-tertiary",
				children: "Items"
			}), /* @__PURE__ */ O("ul", {
				className: "space-y-1",
				children: e.map((e) => {
					let n = Oe(r, "node", e.id);
					return /* @__PURE__ */ O("li", { children: /* @__PURE__ */ k("button", {
						type: "button",
						"aria-label": `Work item: ${q(e)}`,
						"aria-pressed": n,
						onClick: () => i({
							kind: "node",
							id: e.id
						}),
						className: t("w-full rounded-md border px-3 py-2 text-left text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50", n ? "border-primary bg-primary/5" : "border-border hover:bg-surface-hover"),
						children: [/* @__PURE__ */ O("span", {
							className: "block break-words font-medium text-text-primary",
							children: q(e)
						}), /* @__PURE__ */ O("span", {
							className: "text-xs text-text-tertiary",
							children: e.kind === "conversation" ? "Chat · Recent activity" : `${e.kind} · ${e.status}`
						})]
					}) }, e.id);
				})
			})] }), /* @__PURE__ */ k("div", { children: [/* @__PURE__ */ O("h4", {
				className: "mb-1 text-xs font-medium uppercase tracking-wide text-text-tertiary",
				children: "Relationships"
			}), /* @__PURE__ */ O("ul", {
				className: "space-y-1",
				children: n.map((e) => {
					let n = Oe(r, "edge", e.id), a = ke(e, o);
					return /* @__PURE__ */ O("li", { children: /* @__PURE__ */ k("button", {
						type: "button",
						"aria-label": `Relationship: ${a}`,
						"aria-pressed": n,
						onClick: () => i({
							kind: "edge",
							id: e.id
						}),
						className: t("w-full rounded-md border px-3 py-2 text-left text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50", n ? "border-primary bg-primary/5" : "border-border hover:bg-surface-hover"),
						children: [/* @__PURE__ */ O("span", {
							className: "block break-words font-medium text-text-primary",
							children: a
						}), /* @__PURE__ */ k("span", {
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
var Ae = {
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
}, je = /* @__PURE__ */ new Set([
	"view-document",
	"edit-document",
	"join-conversation",
	"join-meeting",
	"observe-terminal",
	"control-terminal",
	"view-transcript",
	"view-run"
]);
function Me(e, t, n) {
	if (n) return n.kind === "node" ? e.find((e) => e.id === n.id) : t.find((e) => e.id === n.id);
}
function Ne(e) {
	return "kind" in e ? e.locked ? "Restricted work item" : e.title : e.label?.trim() || `${e.relation} relationship`;
}
function Y({ nodes: e, edges: t, selection: r, onSelectionChange: i, onOpen: a, onReference: o, onRequestCollaboration: s }) {
	let c = Me(e, t, r);
	if (S(() => {
		r && !c && i(null);
	}, [
		c,
		i,
		r
	]), !r || !c) return /* @__PURE__ */ O("aside", {
		"aria-label": "Work details",
		className: "rounded-lg border border-border bg-surface p-4",
		children: /* @__PURE__ */ O("p", {
			className: "text-sm text-text-secondary",
			children: "Select a work item or relationship to inspect it."
		})
	});
	let l = r, u = c.capabilities.find((e) => je.has(e));
	return /* @__PURE__ */ k("aside", {
		"aria-label": "Work details",
		className: "space-y-4 rounded-lg border border-border bg-surface p-4",
		children: [
			/* @__PURE__ */ k("div", {
				className: "min-w-0",
				children: [
					/* @__PURE__ */ O("p", {
						className: "text-xs font-medium uppercase tracking-wide text-text-tertiary",
						children: "kind" in c ? c.kind : "Relationship"
					}),
					/* @__PURE__ */ O("h3", {
						className: "break-words text-base font-semibold text-text-primary",
						children: Ne(c)
					}),
					/* @__PURE__ */ O("p", {
						className: "text-sm text-text-secondary",
						children: c.status
					}),
					"description" in c && !c.locked && c.description ? /* @__PURE__ */ O("p", {
						className: "mt-2 break-words text-sm text-text-secondary",
						children: c.description
					}) : null
				]
			}),
			/* @__PURE__ */ k("div", {
				className: "flex flex-wrap gap-2",
				children: [u && a ? /* @__PURE__ */ O(n, {
					size: "sm",
					variant: "secondary",
					onClick: () => a(l),
					children: "Open"
				}) : null, o ? /* @__PURE__ */ O(n, {
					size: "sm",
					variant: "secondary",
					onClick: () => o(l),
					children: "Reference"
				}) : null]
			}),
			c.capabilities.length > 0 && s ? /* @__PURE__ */ k("div", { children: [/* @__PURE__ */ O("h4", {
				className: "mb-2 text-xs font-medium uppercase tracking-wide text-text-tertiary",
				children: "Request collaboration"
			}), /* @__PURE__ */ O("div", {
				className: "flex flex-wrap gap-2",
				children: c.capabilities.map((e) => /* @__PURE__ */ O(n, {
					size: "sm",
					variant: "secondary",
					onClick: () => s(l, e),
					children: Ae[e]
				}, e))
			})] }) : null
		]
	});
}
//#endregion
//#region src/components/graph/work/WorkSharingControls.tsx
var Pe = [
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
function Fe(e) {
	return e.locked ? "Restricted work item" : e.title.trim() || "Untitled work item";
}
function Ie(e) {
	return e.label?.trim() || `${e.relation} relationship`;
}
function Le(e, t, n, r) {
	let i = e[t];
	return {
		...e,
		[t]: r ? i.includes(n) ? i : [...i, n] : i.filter((e) => e !== n)
	};
}
function Re(e) {
	return e.audience.kind === "organization" ? ["Everyone in your organization"] : e.audience.kind === "people" ? e.audience.personIds : e.audience.conversationIds;
}
function ze({ state: e, value: t, availableNodes: r, availableEdges: i, saving: a = !1, error: o, conflict: s = !1, onChange: c, onStart: l, onPause: u, onResume: d, onStop: p }) {
	let m = C(), g = Re(t), v = e === "off" ? "Off" : e.charAt(0).toUpperCase() + e.slice(1);
	return /* @__PURE__ */ k("section", {
		"aria-labelledby": "work-sharing-heading",
		className: "space-y-5 rounded-lg border border-border bg-surface p-4",
		children: [
			/* @__PURE__ */ k("div", {
				className: "flex flex-wrap items-start justify-between gap-3",
				children: [/* @__PURE__ */ k("div", { children: [/* @__PURE__ */ O("h3", {
					id: "work-sharing-heading",
					className: "text-base font-semibold text-text-primary",
					children: "Share work activity"
				}), /* @__PURE__ */ O("p", {
					className: "mt-1 text-sm text-text-secondary",
					children: "Sharing is voluntary. Only the audience, work, relationships, and detail selected here are shared."
				})] }), /* @__PURE__ */ O("span", {
					className: "rounded-full border border-border bg-surface-inset px-2.5 py-1 text-xs font-medium text-text-secondary",
					children: v
				})]
			}),
			o ? /* @__PURE__ */ O(h, {
				tone: "error",
				children: o
			}) : null,
			s ? /* @__PURE__ */ O(h, {
				tone: "warning",
				children: "Sharing changed elsewhere. Review the current settings before trying again."
			}) : null,
			a ? /* @__PURE__ */ O("p", {
				role: "status",
				"aria-live": "polite",
				className: "text-sm text-text-secondary",
				children: "Saving sharing settings…"
			}) : null,
			/* @__PURE__ */ k("fieldset", {
				disabled: a,
				className: "space-y-2",
				children: [
					/* @__PURE__ */ O("legend", {
						className: "text-sm font-semibold text-text-primary",
						children: "Audience"
					}),
					/* @__PURE__ */ O("p", {
						className: "text-xs text-text-tertiary",
						children: t.audience.kind === "people" ? "Selected people" : t.audience.kind === "conversation" ? "Selected conversations" : "Organization"
					}),
					g.length > 0 ? /* @__PURE__ */ O("ul", {
						"aria-label": "Current sharing audience",
						className: "flex flex-wrap gap-2",
						children: g.map((e) => /* @__PURE__ */ O("li", {
							className: "max-w-full break-all rounded-md border border-border bg-surface-inset px-2 py-1 text-xs text-text-secondary",
							children: e
						}, e))
					}) : /* @__PURE__ */ O("p", {
						className: "text-sm text-text-secondary",
						children: "No audience selected."
					}),
					/* @__PURE__ */ O("p", {
						className: "text-xs text-text-tertiary",
						children: "Audience choices are provided by the host application."
					})
				]
			}),
			/* @__PURE__ */ k("fieldset", {
				disabled: a,
				className: "space-y-2",
				children: [/* @__PURE__ */ O("legend", {
					className: "text-sm font-semibold text-text-primary",
					children: "Work items"
				}), r.length === 0 ? /* @__PURE__ */ O("p", {
					className: "text-sm text-text-secondary",
					children: "No work items are available."
				}) : /* @__PURE__ */ O("div", {
					className: "space-y-2",
					children: r.map((e) => {
						let n = `${m}-node-${e.id}`;
						return /* @__PURE__ */ k("label", {
							htmlFor: n,
							className: "flex items-start gap-2 rounded-md border border-border px-3 py-2 text-sm text-text-primary",
							children: [/* @__PURE__ */ O(_, {
								id: n,
								checked: t.selectedNodeIds.includes(e.id),
								disabled: a,
								onChange: (n) => c(Le(t, "selectedNodeIds", e.id, n))
							}), /* @__PURE__ */ k("span", {
								className: "min-w-0 break-words",
								children: [/* @__PURE__ */ O("span", {
									className: "block font-medium",
									children: Fe(e)
								}), /* @__PURE__ */ O("span", {
									className: "text-xs text-text-tertiary",
									children: e.kind
								})]
							})]
						}, e.id);
					})
				})]
			}),
			/* @__PURE__ */ k("fieldset", {
				disabled: a,
				className: "space-y-2",
				children: [/* @__PURE__ */ O("legend", {
					className: "text-sm font-semibold text-text-primary",
					children: "Relationships"
				}), i.length === 0 ? /* @__PURE__ */ O("p", {
					className: "text-sm text-text-secondary",
					children: "No relationships are available."
				}) : /* @__PURE__ */ O("div", {
					className: "space-y-2",
					children: i.map((e) => {
						let n = `${m}-edge-${e.id}`;
						return /* @__PURE__ */ k("label", {
							htmlFor: n,
							className: "flex items-start gap-2 rounded-md border border-border px-3 py-2 text-sm text-text-primary",
							children: [/* @__PURE__ */ O(_, {
								id: n,
								checked: t.selectedEdgeIds.includes(e.id),
								disabled: a,
								onChange: (n) => c(Le(t, "selectedEdgeIds", e.id, n))
							}), /* @__PURE__ */ k("span", {
								className: "min-w-0 break-words",
								children: [/* @__PURE__ */ O("span", {
									className: "block font-medium",
									children: Ie(e)
								}), /* @__PURE__ */ O("span", {
									className: "text-xs text-text-tertiary",
									children: e.relation
								})]
							})]
						}, e.id);
					})
				})]
			}),
			/* @__PURE__ */ k("div", {
				className: "grid gap-4 sm:grid-cols-2",
				children: [/* @__PURE__ */ k("label", {
					className: "space-y-1 text-sm font-medium text-text-primary",
					children: [/* @__PURE__ */ O("span", { children: "Detail shared" }), /* @__PURE__ */ O("select", {
						value: t.disclosure,
						disabled: a,
						onChange: (e) => c({
							...t,
							disclosure: e.target.value
						}),
						className: "h-9 w-full rounded-md border border-border-emphasis bg-surface-panel px-2.5 text-sm text-text-primary outline-none focus:border-info focus:ring-1 focus:ring-info/40 disabled:cursor-not-allowed disabled:opacity-50",
						children: Pe.map((e) => /* @__PURE__ */ O("option", {
							value: e.value,
							children: e.label
						}, e.value))
					})]
				}), /* @__PURE__ */ k("label", {
					className: "space-y-1 text-sm font-medium text-text-primary",
					children: [/* @__PURE__ */ O("span", { children: "Live sharing expires" }), /* @__PURE__ */ O(f, {
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
			/* @__PURE__ */ k("fieldset", {
				disabled: a,
				className: "space-y-3 rounded-md border border-border p-3",
				children: [
					/* @__PURE__ */ O("legend", {
						className: "px-1 text-sm font-semibold text-text-primary",
						children: "Earlier work"
					}),
					/* @__PURE__ */ k("label", {
						htmlFor: `${m}-history`,
						className: "flex items-start gap-2 text-sm text-text-primary",
						children: [/* @__PURE__ */ O(_, {
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
						}), /* @__PURE__ */ k("span", { children: [/* @__PURE__ */ O("span", {
							className: "block font-medium",
							children: "Share selected history"
						}), /* @__PURE__ */ O("span", {
							className: "block text-xs text-text-tertiary",
							children: "Historical work is never included unless you select this option."
						})] })]
					}),
					t.history ? /* @__PURE__ */ k("div", {
						className: "grid gap-3 sm:grid-cols-3",
						children: [
							/* @__PURE__ */ k("label", {
								className: "space-y-1 text-sm font-medium text-text-primary",
								children: [/* @__PURE__ */ O("span", { children: "First day" }), /* @__PURE__ */ O(f, {
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
							/* @__PURE__ */ k("label", {
								className: "space-y-1 text-sm font-medium text-text-primary",
								children: [/* @__PURE__ */ O("span", { children: "Last day" }), /* @__PURE__ */ O(f, {
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
							/* @__PURE__ */ k("label", {
								className: "space-y-1 text-sm font-medium text-text-primary",
								children: [/* @__PURE__ */ O("span", { children: "History access expires" }), /* @__PURE__ */ O(f, {
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
			/* @__PURE__ */ k("div", {
				className: "flex flex-wrap gap-2",
				children: [
					e === "off" || e === "stopped" || e === "expired" ? /* @__PURE__ */ O(n, {
						disabled: a,
						onClick: l,
						children: e === "off" ? "Start sharing" : "Start sharing again"
					}) : null,
					e === "active" ? /* @__PURE__ */ O(n, {
						variant: "secondary",
						disabled: a,
						onClick: u,
						children: "Pause sharing"
					}) : null,
					e === "paused" ? /* @__PURE__ */ O(n, {
						disabled: a,
						onClick: d,
						children: "Resume sharing"
					}) : null,
					e === "active" || e === "paused" ? /* @__PURE__ */ O(n, {
						variant: "danger",
						disabled: a,
						onClick: p,
						children: "Stop sharing"
					}) : null
				]
			})
		]
	});
}
//#endregion
//#region src/components/graph/work/WorkReferenceCard.tsx
var Be = /* @__PURE__ */ new Set([
	"view-document",
	"edit-document",
	"join-conversation",
	"join-meeting",
	"observe-terminal",
	"control-terminal",
	"view-transcript",
	"view-run"
]);
function Ve({ target: e, state: t, node: r, edge: i, unavailableLabel: a, onSelect: o, onOpen: s }) {
	let c = e?.kind === "node" ? r : e?.kind === "edge" ? i : void 0;
	if (t === "loading") return /* @__PURE__ */ O("article", {
		"aria-label": "Shared work reference",
		"aria-busy": "true",
		className: "rounded-lg border border-border bg-surface p-3",
		children: /* @__PURE__ */ O("p", {
			role: "status",
			className: "text-sm text-text-secondary",
			children: "Loading shared work…"
		})
	});
	if (t === "unavailable" || !e || !c) return /* @__PURE__ */ O("article", {
		"aria-label": "Shared work reference",
		className: "rounded-lg border border-border bg-surface p-3",
		children: /* @__PURE__ */ O("p", {
			className: "text-sm text-text-secondary",
			children: a ?? "This work item is unavailable."
		})
	});
	let l = e.kind === "node" ? r?.locked ? "Restricted work item" : r?.title : i?.label?.trim() || `${i?.relation ?? "Shared"} relationship`, u = (e.kind === "node" ? r?.capabilities ?? [] : i?.capabilities ?? []).some((e) => Be.has(e)), d = e;
	return /* @__PURE__ */ k("article", {
		"aria-label": "Shared work reference",
		className: "space-y-3 rounded-lg border border-border bg-surface p-3",
		children: [/* @__PURE__ */ k("button", {
			type: "button",
			"aria-label": `Select reference: ${l}`,
			disabled: !o,
			onClick: () => o?.(d),
			className: "block w-full rounded text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:cursor-default",
			children: [
				/* @__PURE__ */ O("span", {
					className: "block text-xs font-medium uppercase tracking-wide text-text-tertiary",
					children: e.kind === "node" ? r?.kind : "Relationship"
				}),
				/* @__PURE__ */ O("span", {
					className: "block break-words text-sm font-semibold text-text-primary",
					children: l
				}),
				/* @__PURE__ */ O("span", {
					className: "block text-xs text-text-secondary",
					children: c.status
				})
			]
		}), u && s ? /* @__PURE__ */ O(n, {
			size: "sm",
			variant: "secondary",
			onClick: () => s(d),
			children: "Open shared work"
		}) : null]
	});
}
//#endregion
//#region src/components/graph/work/WorkActivityTimeline.tsx
function He(e, t) {
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
function Ue(e, t, n, r, i) {
	let a = t.updatedAt || t.startedAt;
	if (!a) return null;
	let o = new Date(a);
	if (Number.isNaN(o.getTime())) return null;
	let s = He(o, i);
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
function We({ day: e, timezone: t, nodes: n, edges: r, selection: i, onSelectionChange: a }) {
	let [o, s] = E(() => /* @__PURE__ */ new Date());
	S(() => {
		let e = window.setInterval(() => s(/* @__PURE__ */ new Date()), 6e4);
		return () => window.clearInterval(e);
	}, []);
	let c = w(() => {
		let i = new Map(n.map((e) => [e.id, e.locked ? "Restricted work item" : e.title.trim() || "Untitled work item"]));
		return [...n.map((n) => Ue("node", n, i.get(n.id), e, t)), ...r.map((n) => Ue("edge", n, `${i.get(n.fromId) ?? "Work item"} → ${i.get(n.toId) ?? "Work item"}`, e, t))].filter((e) => e !== null).sort((e, t) => e.minute - t.minute || e.key.localeCompare(t.key));
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
	let u = He(o, t), d = u.day === e;
	return /* @__PURE__ */ k("div", {
		className: "rounded-lg border border-border bg-surface px-4 py-3",
		"aria-label": `Activity on ${e}`,
		"data-testid": "work-activity-timeline",
		children: [
			/* @__PURE__ */ k("div", {
				className: "mb-3 flex items-baseline justify-between gap-3",
				children: [/* @__PURE__ */ k("div", { children: [/* @__PURE__ */ O("h2", {
					className: "text-sm font-semibold text-text-primary",
					children: "Activity over the day"
				}), /* @__PURE__ */ O("p", {
					className: "text-xs text-text-secondary",
					children: "Select a time to inspect visible work and its branches."
				})] }), /* @__PURE__ */ O("span", {
					className: "shrink-0 text-xs text-text-secondary",
					children: t
				})]
			}),
			/* @__PURE__ */ k("div", {
				className: "relative h-10 border-b border-border",
				children: [
					[
						0,
						6,
						12,
						18,
						24
					].map((e) => /* @__PURE__ */ O("span", {
						"aria-hidden": "true",
						className: "absolute bottom-0 h-2 border-l border-border",
						style: { left: `${e / 24 * 100}%` }
					}, e)),
					Array.from(l, ([e, t]) => {
						let n = t.some((e) => i?.kind === e.selection.kind && i.id === e.selection.id), r = t.some((e) => e.live);
						return /* @__PURE__ */ O("button", {
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
					d ? /* @__PURE__ */ O("span", {
						"aria-hidden": "true",
						className: "pointer-events-none absolute bottom-0 top-0 border-l-2 border-primary",
						style: { left: `${u.minute / 1440 * 100}%` }
					}) : null
				]
			}),
			/* @__PURE__ */ k("div", {
				className: "mt-1 flex justify-between text-[11px] text-text-secondary",
				"aria-hidden": "true",
				children: [
					/* @__PURE__ */ O("span", { children: "12 AM" }),
					/* @__PURE__ */ O("span", { children: "6 AM" }),
					/* @__PURE__ */ O("span", { children: "12 PM" }),
					/* @__PURE__ */ O("span", { children: "6 PM" }),
					/* @__PURE__ */ O("span", { children: "12 AM" })
				]
			}),
			/* @__PURE__ */ k("p", {
				className: "mt-2 text-xs text-text-secondary",
				children: [c.length === 0 ? "No visible activity recorded for this day." : `${c.length} visible work ${c.length === 1 ? "item" : "items"} across ${l.size} ${l.size === 1 ? "hour" : "hours"}.`, d ? ` Now ${u.time}.` : ""]
			}),
			c.length > 0 ? /* @__PURE__ */ k("details", {
				className: "mt-2 text-xs",
				children: [/* @__PURE__ */ O("summary", {
					className: "cursor-pointer text-primary",
					children: "Browse activity"
				}), /* @__PURE__ */ O("ol", {
					className: "mt-2 max-h-36 space-y-1 overflow-y-auto",
					children: c.map((e) => /* @__PURE__ */ O("li", { children: /* @__PURE__ */ k("button", {
						type: "button",
						className: `w-full rounded px-2 py-1 text-left hover:bg-surface-hover ${i?.kind === e.selection.kind && i.id === e.selection.id ? "font-semibold text-primary" : "text-text-primary"}`,
						onClick: () => a(e.selection),
						"aria-current": i?.kind === e.selection.kind && i.id === e.selection.id ? "true" : void 0,
						children: [
							/* @__PURE__ */ O("time", { children: e.time }),
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
var X = (e, t, n) => JSON.stringify([
	e,
	t,
	n
]);
function Ge(e, t, n, r) {
	let i = new Map(e.map((e) => [e.id, e])), a = new Map(t.map((e) => [e.id, e])), o = new Set(r.expandedSourceEfforts), s = new Set(r.reversedEdgeIds), c = r.full ? 28 : 20, l = r.full ? 64 : 36, u = Math.max(240, r.width - 32), d = (n.length >= 3 || n.length >= 2 && u < 1200) && !r.focusedEffortId, f = r.focusedEffortId ? n.filter((e) => e.id === r.focusedEffortId) : n, p = [];
	for (let e of f) {
		let t = [...new Set(e.nodeIds)].filter((e) => i.has(e)), n = new Set(t), m = new Set(e.contextNodeIds?.filter((e) => n.has(e))), h = (d || r.foldedForHeight?.includes(e.id)) && !o.has(e.id) && m.size < t.length ? t.filter((e) => !m.has(e)) : t;
		if (!h.length) continue;
		let g = new Set(h), _ = [...new Set(e.edgeIds)].flatMap((e) => {
			let t = a.get(e);
			return !t || !g.has(t.fromId) || !g.has(t.toId) || t.fromId === t.toId ? [] : [{
				id: e,
				from: s.has(e) ? t.toId : t.fromId,
				to: s.has(e) ? t.fromId : t.toId
			}];
		}), v = new Map(h.map((e) => [e, 0])), y = new Map(h.map((e) => [e, []]));
		for (let e of _) v.set(e.to, v.get(e.to) + 1), y.get(e.from).push(e.to);
		let b = h.filter((e) => v.get(e) === 0).sort(), x = new Map(b.map((e) => [e, 0]));
		for (let e = 0; e < b.length; e++) {
			let t = b[e];
			for (let e of y.get(t).sort()) x.set(e, Math.max(x.get(e) ?? 0, x.get(t) + 1)), v.set(e, v.get(e) - 1), v.get(e) || b.push(e);
		}
		let S = h.filter((e) => !b.includes(e));
		for (let e of S) x.set(e, 0);
		let C = /* @__PURE__ */ new Map();
		for (let e of h) {
			let t = x.get(e);
			C.set(t, [...C.get(t) ?? [], e]);
		}
		let w = (e) => r.measurements?.get(e) ?? {
			width: 200,
			height: 112
		}, T = [...C.keys()].sort((e, t) => e - t), E = T.reduce((e, t) => e + Math.max(...C.get(t).map((e) => w(e).width)), c * 2) + Math.max(0, T.length - 1) * 144 > (f.length === 2 ? (u - l) / 2 : u), D = [], O = (e) => _.filter((t) => t.to === e).length, k = 0, A = E ? 56 : c;
		for (let [t, n] of T.entries()) {
			let r = E ? c : 56, i = 0;
			for (let t of C.get(n).sort()) {
				let n = w(t);
				D.push({
					id: X(e.id, "node", t),
					entityId: t,
					x: E ? r : A,
					y: E ? A : r,
					...n
				});
				let a = E ? n.width : Math.max(n.height, O(t) * 40);
				k = Math.max(k, E ? A + n.height : r + a), r += a + 28, i = Math.max(i, E ? n.height : n.width);
			}
			let a = C.get(T[t + 1]) ?? [], o = Math.max(64, ...a.map((e) => O(e) * 40 + 16));
			A += i + (E ? o : 144);
		}
		let j = new Map(D.map((e) => [e.entityId, e])), M = /* @__PURE__ */ new Map();
		p.push({
			id: e.id,
			title: e.title,
			x: 0,
			y: 0,
			width: Math.max(...D.map((e) => e.x + e.width)) + c,
			height: k + c,
			collapsedSourceCount: t.length - h.length,
			sourceCount: m.size,
			vertical: E,
			cyclicNodeIds: S,
			nodes: D,
			edges: _.map((t) => {
				let n = j.get(t.to), r = M.get(t.to) ?? 0;
				return M.set(t.to, r + 1), {
					id: X(e.id, "edge", t.id),
					entityId: t.id,
					source: X(e.id, "node", t.from),
					target: X(e.id, "node", t.to),
					labelX: E ? n.x + n.width / 2 : n.x - 72,
					labelY: E ? n.y - (O(t.to) - r) * 40 - 8 + 16 : n.y + r * 40 + 16
				};
			})
		});
	}
	if (r.height && !r.focusedEffortId) {
		let i = p.filter((e) => e.height > r.height && e.sourceCount > 0 && e.sourceCount < e.nodes.length && e.collapsedSourceCount === 0 && !o.has(e.id) && !r.foldedForHeight?.includes(e.id));
		if (i.length) return Ge(e, t, n, {
			...r,
			foldedForHeight: [...r.foldedForHeight ?? [], ...i.map((e) => e.id)]
		});
	}
	let m = 16, h = 24, g = 0;
	for (let e of p) m > 16 && m + e.width > u && (m = 16, h += g + l, g = 0), e.x = m, e.y = h, m += e.width + l, g = Math.max(g, e.height);
	return p;
}
//#endregion
//#region src/components/graph/work/WorkActivityNode.tsx
var Ke = {
	project: "▱",
	terminal: ">_",
	agent: "✦",
	run: "▶",
	document: "▤",
	change: "⌘",
	conversation: "◌",
	meeting: "◎",
	transcript: "≡",
	task: "✓"
}, qe = {
	idle: "idle",
	running: "running",
	waiting: "awaiting",
	completed: "completed",
	error: "failed",
	stopped: "idle",
	stale: "idle"
};
function Je({ node: e, detail: n, selected: r, selectedRevisionId: s, live: c, onSelect: l, onFeedback: u }) {
	let d = e.locked || e.disclosure === "existence" ? void 0 : n, f = s ? d?.artifact?.revisions.find((e) => e.id === s) : d?.artifact?.revisions.at(-1), p = d?.artifact?.pending, m = e.locked ? "Restricted work item" : e.title, h = c && d?.fresh === !0, g = e.status === "running" && !h ? "idle" : qe[e.status], _ = {
		kind: "node",
		id: e.id,
		...f ? { revisionId: f.id } : {}
	};
	return /* @__PURE__ */ k("div", {
		className: t("pointer-events-auto relative w-[200px]", d?.emphasis === "earlier" && "[&_[data-pipeline-node]]:border-border [&_[data-pipeline-node]]:bg-surface-inset", d?.emphasis === "input" && "[&_[data-pipeline-node]]:border-border-emphasis"),
		"data-emphasis": d?.emphasis ?? "current",
		onClick: () => l(_),
		onKeyDown: (e) => {
			e.target instanceof HTMLElement && e.target.dataset.pipelineNode && (e.key === "Enter" || e.key === " ") && (e.preventDefault(), e.stopPropagation(), l(_));
		},
		children: [/* @__PURE__ */ O(b, {
			icon: Ke[e.kind],
			subtitle: m,
			state: g,
			selected: r,
			ariaLabel: `${m}, ${e.status}${e.status === "running" && !h ? ", updates delayed" : ""}`,
			body: /* @__PURE__ */ k("div", {
				className: "space-y-2 text-xs",
				children: [
					/* @__PURE__ */ O("p", {
						className: "text-text-secondary",
						children: e.status === "running" && c && !h ? "Running · updates delayed" : e.status
					}),
					d?.attentionLabel && /* @__PURE__ */ O("p", {
						className: "font-medium text-text-primary",
						children: d.attentionLabel
					}),
					f && /* @__PURE__ */ k("div", {
						className: "space-y-1",
						children: [/* @__PURE__ */ O("div", {
							className: "h-16 overflow-hidden rounded border border-border bg-surface-inset",
							"aria-label": `${m} ${f.label} preview`,
							children: f.preview ?? /* @__PURE__ */ O("span", {
								className: "flex h-full items-center justify-center text-text-secondary",
								children: "Preview unavailable"
							})
						}), /* @__PURE__ */ k("span", { children: [f.label, " available"] })]
					}),
					p && /* @__PURE__ */ k("p", {
						className: p.status === "failed" ? "text-danger-fg" : "text-info-fg",
						children: [
							p.label,
							" ",
							p.status === "generating" ? "generating" : "generation failed"
						]
					}),
					!!d?.tools?.length && /* @__PURE__ */ O("div", {
						className: "flex flex-wrap gap-1",
						children: d.tools.map((e) => /* @__PURE__ */ O(o, {
							size: "xs",
							children: e
						}, e))
					})
				]
			})
		}), !!d?.feedbackCount && u && (!s || f) && /* @__PURE__ */ k(i, {
			size: "sm",
			className: "nodrag nopan absolute -right-2 -top-2 h-7 w-7 rounded-full border border-border bg-surface",
			"aria-label": `${d.feedbackCount} comments on ${m}`,
			onClick: (e) => {
				e.stopPropagation(), u(_);
			},
			children: [/* @__PURE__ */ O(a, { size: 14 }), /* @__PURE__ */ O("span", {
				className: "absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-0.5 text-[10px] text-white",
				children: d.feedbackCount
			})]
		})]
	});
}
//#endregion
//#region src/components/graph/work/WorkActivityCanvas.tsx
function Ye({ data: e, selected: t }) {
	return /* @__PURE__ */ k(D, { children: [
		/* @__PURE__ */ O(P, {
			type: "target",
			position: e.vertical ? F.Top : F.Left,
			isConnectable: !1
		}),
		/* @__PURE__ */ O(Je, {
			node: e.entity,
			detail: e.detail,
			live: e.live,
			selected: !!t,
			selectedRevisionId: e.revisionId,
			onSelect: e.onSelect,
			onFeedback: e.onFeedback
		}),
		/* @__PURE__ */ O(P, {
			type: "source",
			position: e.vertical ? F.Bottom : F.Right,
			isConnectable: !1
		})
	] });
}
function Xe({ data: e }) {
	return /* @__PURE__ */ O(m, {
		tone: "surface",
		title: /* @__PURE__ */ O("span", {
			className: "font-sans text-xs font-semibold text-text-secondary",
			children: e.title
		}),
		className: "h-full w-full bg-surface/50",
		"data-testid": "work-effort",
		titleAction: /* @__PURE__ */ O(n, {
			size: "sm",
			variant: "ghost",
			className: "nodrag nopan",
			onClick: e.onFocus,
			children: e.focused ? "All activities" : "Focus"
		}),
		children: /* @__PURE__ */ k("div", {
			className: "flex items-center gap-2 px-3 pt-2",
			children: [e.sources > 0 && /* @__PURE__ */ O(n, {
				size: "sm",
				variant: "ghost",
				className: "nodrag nopan pointer-events-auto",
				onClick: e.onSources,
				children: e.expanded ? "Hide earlier sources" : `${e.sources} sources`
			}), e.cycle && /* @__PURE__ */ O("span", {
				role: "status",
				className: "text-xs text-warning-fg",
				children: "Relationship order unavailable"
			})]
		})
	});
}
function Ze(e) {
	let t = e.data;
	return t ? /* @__PURE__ */ k(D, { children: [/* @__PURE__ */ O(y, {
		...e,
		data: { state: t.active ? "active" : "default" }
	}), /* @__PURE__ */ O(N, { children: /* @__PURE__ */ O("button", {
		type: "button",
		className: "nodrag nopan pointer-events-auto absolute flex h-8 w-28 items-center justify-center rounded border border-border bg-surface px-1 text-xs leading-tight text-text-secondary focus-visible:outline-2 focus-visible:outline-primary",
		style: { transform: `translate(-50%, -50%) translate(${t.labelX}px, ${t.labelY}px)` },
		onClick: t.onSelect,
		"aria-label": `${t.label}${t.active ? ", active" : ""}`,
		title: t.label,
		"data-work-edge-label": t.canonicalId,
		children: /* @__PURE__ */ O("span", {
			className: "line-clamp-2 break-words",
			children: t.label
		})
	}) })] }) : null;
}
var Qe = {
	activity: Ye,
	effort: Xe
}, $e = { activity: Ze };
function et(e) {
	let { activity: t, nodes: n, edges: r, selection: i, viewport: a, onViewportChange: o, onSelectionChange: s } = e, c = T(null), [l, u] = E({
		width: 640,
		height: 480
	}), [d, f] = E(/* @__PURE__ */ new Map()), p = T(null), m = T(t.view.focusedEffortId), { view: h, onViewChange: g } = t;
	S(() => {
		let e = c.current;
		if (!e || typeof ResizeObserver > "u") return;
		let t = new ResizeObserver(([e]) => {
			let { width: t, height: n } = e.contentRect;
			t > 0 && n > 0 && u((e) => e.width === t && e.height === n ? e : {
				width: t,
				height: n
			});
		});
		return t.observe(e), () => t.disconnect();
	}, []);
	let _ = w(() => Ge(n, r, t.efforts, {
		width: l.width,
		height: l.height - 56,
		full: t.mode === "full",
		focusedEffortId: h.focusedEffortId,
		expandedSourceEfforts: h.expandedSourceEfforts,
		reversedEdgeIds: t.reversedEdgeIds,
		measurements: d
	}), [
		n,
		r,
		t.efforts,
		t.mode,
		t.reversedEdgeIds,
		h.focusedEffortId,
		h.expandedSourceEfforts,
		l,
		d
	]), v = JSON.stringify([
		l,
		t.mode,
		h.focusedEffortId,
		h.expandedSourceEfforts,
		_.map((e) => [
			e.id,
			e.nodes.map((e) => e.id),
			e.edges.map((e) => e.id)
		]),
		_.every((e) => e.nodes.every((e) => d.has(e.entityId)))
	]);
	S(() => {
		if (p.current === v) return;
		let e = p.current === null;
		p.current = v;
		let t = m.current && !h.focusedEffortId && h.overviewViewport;
		if (m.current = h.focusedEffortId, t) {
			o(t);
			return;
		}
		if (e && h.canvasInitialized) return;
		let n = Math.max(1, ..._.map((e) => e.x + e.width)), r = Math.max(1, ..._.map((e) => e.y + e.height)), i = Math.max(1, Math.min(1.2, (l.width - 48) / n, (l.height - 56) / r));
		o({
			x: 16,
			y: 24,
			zoom: i
		}), h.canvasInitialized || g({
			...h,
			canvasInitialized: !0
		});
	}, [
		v,
		_,
		l,
		h,
		g,
		o
	]);
	let y = (e) => g({
		...h,
		focusedEffortId: h.focusedEffortId === e ? null : e,
		overviewViewport: h.focusedEffortId ? h.overviewViewport : a
	}), b = new Map(n.map((e) => [e.id, e])), x = new Map(r.map((e) => [e.id, e])), C = t.window.following, D = new Set(C ? t.activeEdgeIds : []), j = [], N = [];
	for (let e of _) {
		let n = JSON.stringify(["effort", e.id]), r = h.expandedSourceEfforts.includes(e.id);
		j.push({
			id: n,
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
				sources: !h.focusedEffortId && (e.collapsedSourceCount > 0 || r) ? e.sourceCount : 0,
				expanded: r,
				focused: h.focusedEffortId === e.id,
				cycle: e.cyclicNodeIds.length > 0,
				onFocus: () => y(e.id),
				onSources: () => g({
					...h,
					expandedSourceEfforts: r ? h.expandedSourceEfforts.filter((t) => t !== e.id) : [...h.expandedSourceEfforts, e.id]
				})
			}
		});
		for (let r of e.nodes) j.push({
			id: r.id,
			type: "activity",
			parentId: n,
			extent: "parent",
			position: {
				x: r.x,
				y: r.y
			},
			selected: i?.kind === "node" && i.id === r.entityId,
			focusable: !1,
			data: {
				entity: b.get(r.entityId),
				detail: t.details?.[r.entityId],
				revisionId: i?.kind === "node" && i.id === r.entityId ? i.revisionId : void 0,
				live: C,
				vertical: e.vertical,
				onSelect: s,
				onFeedback: t.onFeedback
			}
		});
		for (let t of e.edges) {
			let n = x.get(t.entityId), r = e.x + t.labelX, a = e.y + t.labelY;
			N.push({
				id: t.id,
				type: "activity",
				source: t.source,
				target: t.target,
				selected: i?.kind === "edge" && i.id === n.id,
				focusable: !1,
				markerEnd: {
					type: ee.ArrowClosed,
					color: "var(--color-border-emphasis)"
				},
				data: {
					canonicalId: n.id,
					label: n.label || n.relation.replaceAll("-", " "),
					active: D.has(n.id) && n.status === "running" && !n.endedAt,
					vertical: e.vertical,
					labelX: r,
					labelY: a,
					onSelect: () => s({
						kind: "edge",
						id: n.id
					})
				}
			});
		}
	}
	let P = new Map(j.filter((e) => e.type === "activity").map((e) => [e.id, e.data.entity.id]));
	return /* @__PURE__ */ O("div", {
		ref: c,
		className: "relative min-h-80 min-w-0 flex-1 overflow-hidden",
		"data-testid": "work-activity-canvas",
		children: /* @__PURE__ */ k(te, {
			nodes: j,
			edges: N,
			nodeTypes: Qe,
			edgeTypes: $e,
			viewport: a,
			onViewportChange: o,
			onPaneClick: () => s(null),
			onEdgeClick: (e, t) => t.data?.onSelect(),
			minZoom: .5,
			maxZoom: 2.5,
			nodesDraggable: !1,
			nodesConnectable: !1,
			elementsSelectable: !1,
			deleteKeyCode: null,
			proOptions: { hideAttribution: !0 },
			onNodesChange: (e) => {
				let t = e.filter((e) => e.type === "dimensions");
				t.length && f((e) => {
					let n = new Map(e), r = !1;
					for (let i of t) {
						let t = P.get(i.id);
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
			children: [/* @__PURE__ */ O(A, {
				gap: 20,
				size: 1,
				color: "var(--color-border)"
			}), /* @__PURE__ */ O(M, {
				showInteractive: !1,
				fitViewOptions: {
					minZoom: 1,
					maxZoom: 1.2,
					padding: .15
				}
			})]
		})
	});
}
//#endregion
//#region src/components/graph/work/WorkArtifactInspector.tsx
function tt({ node: e, artifact: t, selection: r, onSelectionChange: i, onOpen: a, onReference: o }) {
	let s = C(), c = r.revisionId ? t.revisions.find((e) => e.id === r.revisionId) : t.revisions.at(-1), l = {
		...r,
		revisionId: c?.id,
		anchorId: c?.anchorId
	}, f = e.capabilities.includes("view-document") || e.capabilities.includes("edit-document");
	return /* @__PURE__ */ k("div", {
		className: "space-y-4 p-3",
		children: [
			t.revisions.length > 0 && /* @__PURE__ */ O(u, {
				idPrefix: s,
				"aria-label": "Available revisions",
				variant: "segmented",
				size: "sm",
				items: t.revisions.map((e) => ({
					id: e.id,
					label: e.label
				})),
				value: c?.id ?? "",
				onValueChange: (t) => i({
					kind: "node",
					id: e.id,
					revisionId: t
				})
			}),
			t.pending && /* @__PURE__ */ k("p", {
				role: "status",
				className: "text-sm text-text-secondary",
				children: [
					t.pending.label,
					" ",
					t.pending.status === "generating" ? "is generating. You can review available revisions." : "could not be generated.",
					t.pending.message ? ` ${t.pending.message}` : ""
				]
			}),
			c ? /* @__PURE__ */ k(d, {
				idPrefix: s,
				id: c.id,
				when: c.id,
				className: "space-y-2",
				children: [/* @__PURE__ */ O("div", {
					"aria-label": `${c.label} preview`,
					className: "aspect-video overflow-hidden rounded border border-border bg-surface-inset",
					children: c.preview ?? /* @__PURE__ */ O("span", {
						className: "flex h-full items-center justify-center text-sm text-text-secondary",
						children: "Preview unavailable"
					})
				}), /* @__PURE__ */ O("p", {
					className: "text-xs text-text-secondary",
					children: c.anchorLabel ?? c.label
				})]
			}) : /* @__PURE__ */ O("p", {
				className: "text-sm text-text-secondary",
				children: r.revisionId ? "The selected revision is unavailable." : "No revision is available yet."
			}),
			/* @__PURE__ */ k("div", {
				className: "flex flex-wrap gap-2",
				children: [f && a && c && /* @__PURE__ */ O(n, {
					size: "sm",
					variant: "secondary",
					onClick: () => a(l),
					children: "Open presentation"
				}), o && c && /* @__PURE__ */ O(n, {
					size: "sm",
					variant: "secondary",
					onClick: () => o(l),
					children: "Reference in chat"
				})]
			})
		]
	});
}
//#endregion
//#region src/components/forms/RangeSlider.tsx
function nt({ value: e, min: n, max: r, step: i = 1, minDistance: a = i, labels: o, formatValue: s, onChange: c, className: l }) {
	let u = C(), d = Math.max(1, r - n), f = (e) => Math.max(n, Math.min(r, e)), p = f(e[0]), m = Math.max(p, f(e[1])), h = Math.min(a, r - n);
	return /* @__PURE__ */ k("div", {
		className: t("relative h-7 min-w-0", l),
		children: [
			/* @__PURE__ */ O("div", { className: "absolute inset-x-0 top-3 h-1 rounded-full bg-surface-inset" }),
			/* @__PURE__ */ O("div", {
				className: "absolute top-3 h-1 rounded-full bg-primary/30",
				style: {
					left: `${(p - n) / d * 100}%`,
					right: `${(r - m) / d * 100}%`
				}
			}),
			[0, 1].map((e) => /* @__PURE__ */ O("input", {
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
var Z = 6e4;
function rt({ activity: e, timezone: t = "UTC" }) {
	let { bounds: r, window: a, onWindowChange: o } = e, s = Math.max(Z, a.end - a.start), c = (e) => new Intl.DateTimeFormat(void 0, {
		timeZone: t,
		hour: "numeric",
		minute: "2-digit"
	}).format(e), l = (e, t, n = s) => {
		let i = Math.max(r.start + Math.min(n, r.end - r.start), Math.min(r.end, e));
		o({
			start: Math.max(r.start, i - n),
			end: i,
			following: t
		});
	}, u = Math.max(1, r.end - r.start), d = [
		15,
		30,
		60
	].find((e) => s === e * Z), f = a.start === r.start && a.end === r.end;
	return /* @__PURE__ */ k("div", {
		className: "shrink-0 border-b border-border bg-surface px-3 py-2",
		"aria-label": "Work time window",
		children: [
			/* @__PURE__ */ k("div", {
				className: "flex flex-wrap items-center gap-1.5 text-xs text-text-secondary",
				children: [
					/* @__PURE__ */ O(i, {
						size: "sm",
						"aria-label": "Previous interval",
						disabled: a.start <= r.start,
						onClick: () => l(a.end - s, !1),
						children: "‹"
					}),
					/* @__PURE__ */ k("span", {
						className: "tabular-nums text-text-primary",
						children: [
							c(a.start),
							"–",
							c(a.end)
						]
					}),
					/* @__PURE__ */ O(i, {
						size: "sm",
						"aria-label": "Next interval",
						disabled: a.end >= r.end,
						onClick: () => l(a.end + s, !1),
						children: "›"
					}),
					/* @__PURE__ */ O("span", {
						title: t,
						children: t
					}),
					/* @__PURE__ */ O("span", { className: "flex-1" }),
					/* @__PURE__ */ O(n, {
						size: "sm",
						variant: "ghost",
						onClick: () => l(r.end, !0),
						children: a.following ? "Following now" : "Back to now"
					}),
					/* @__PURE__ */ O(g, {
						"aria-label": "Interval duration",
						value: f ? "day" : d ? String(d) : "custom",
						size: "sm",
						className: "w-auto",
						options: [
							...!d && !f ? [{
								value: "custom",
								label: "Custom"
							}] : [],
							{
								value: "15",
								label: "15 minutes"
							},
							{
								value: "30",
								label: "30 minutes"
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
						onChange: (e) => l(a.end, a.following, e.target.value === "day" ? u : Number(e.target.value) * Z)
					})
				]
			}),
			/* @__PURE__ */ O("div", {
				className: "relative mx-2 mt-1 h-3",
				"aria-label": "Activity markers",
				children: e.events?.filter((e) => e.at >= r.start && e.at <= r.end && e.count > 0).map((e) => /* @__PURE__ */ O("button", {
					type: "button",
					"aria-label": `${e.count} events at ${c(e.at)}`,
					title: `${e.count} events at ${c(e.at)}`,
					className: "absolute top-0 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-primary/60 focus-visible:outline-2 focus-visible:outline-primary",
					style: {
						left: `${(e.at - r.start) / u * 100}%`,
						opacity: Math.min(1, .35 + Math.log2(e.count + 1) / 5)
					},
					onClick: () => l(e.at, !1)
				}, e.at))
			}),
			/* @__PURE__ */ O(nt, {
				value: [a.start, a.end],
				min: r.start,
				max: r.end,
				step: Z,
				labels: ["Interval start", "Interval end"],
				formatValue: c,
				onChange: ([e, t]) => o({
					start: e,
					end: t,
					following: !1
				})
			}),
			!a.following && e.temporalMode === "recent" && /* @__PURE__ */ O("p", {
				className: "text-xs text-text-secondary",
				children: "Recent work · statuses reflect the latest available state"
			})
		]
	});
}
//#endregion
//#region src/components/graph/work/WorkActivityGraph.tsx
function it(e) {
	let { nodes: r, edges: i, selection: a, activity: o, onSelectionChange: s } = e, c = T(null), l = T(null), [u, d] = E(!1), f = a?.kind === "node" ? r.find((e) => e.id === a.id) : void 0, p = a?.kind === "edge" ? i.find((e) => e.id === a.id && r.some((t) => t.id === e.fromId) && r.some((t) => t.id === e.toId)) : void 0, m = !!(f || p), h = f && !f.locked && f.disclosure !== "existence" ? o.details?.[f.id]?.artifact : void 0;
	S(() => {
		a && !m && s(null);
	}, [
		a,
		m,
		s
	]), S(() => {
		a && c.current?.contains(document.activeElement) && document.activeElement instanceof HTMLElement && !document.activeElement.closest("[data-testid=\"activity-inspector\"]") && (l.current = document.activeElement);
	}, [a]);
	let _ = () => {
		s(null), requestAnimationFrame(() => {
			l.current?.isConnected && l.current.focus();
		});
	};
	return /* @__PURE__ */ k("section", {
		ref: c,
		"aria-label": "Shared work graph",
		className: t("flex h-full min-h-0 min-w-0 flex-col bg-surface", e.className),
		onKeyDown: (e) => {
			e.key === "Escape" && a && (e.stopPropagation(), _());
		},
		children: [
			e.state === "partial" && /* @__PURE__ */ O("p", {
				role: "status",
				className: "border-b border-warning-border bg-warning-bg px-3 py-1 text-xs text-warning-fg",
				children: "Some work sources are delayed or unavailable."
			}),
			/* @__PURE__ */ O(rt, {
				activity: o,
				timezone: e.timezone
			}),
			/* @__PURE__ */ k("div", {
				className: "flex shrink-0 items-center gap-2 border-b border-border px-3 py-1 text-xs text-text-secondary",
				children: [
					/* @__PURE__ */ k("span", { children: [o.efforts.length, " activities"] }),
					/* @__PURE__ */ O(g, {
						"aria-label": "Focus activity",
						size: "sm",
						value: o.view.focusedEffortId ?? "",
						className: "w-auto min-w-0 max-w-[50%]",
						options: [{
							value: "",
							label: "All activities"
						}, ...o.efforts.map((e) => ({
							value: e.id,
							label: e.title
						}))],
						onChange: (t) => o.onViewChange({
							...o.view,
							focusedEffortId: t.target.value || null,
							overviewViewport: o.view.focusedEffortId ? o.view.overviewViewport : e.viewport
						})
					}),
					/* @__PURE__ */ O("span", {
						className: "ml-auto",
						children: "Pan or focus to explore"
					})
				]
			}),
			/* @__PURE__ */ k("div", {
				className: "flex min-h-0 min-w-0 flex-1",
				children: [/* @__PURE__ */ O(et, { ...e }), m && /* @__PURE__ */ O(v, {
					title: f?.locked ? "Restricted work item" : f?.title || p?.label || "Relationship",
					onClose: _,
					className: "w-72 max-w-[65%] shrink-0",
					"data-testid": "activity-inspector",
					children: f && h && a?.kind === "node" ? /* @__PURE__ */ O(tt, {
						node: f,
						artifact: h,
						selection: a,
						onSelectionChange: s,
						onOpen: e.onOpen,
						onReference: e.onReference
					}) : /* @__PURE__ */ O(Y, { ...e })
				})]
			}),
			/* @__PURE__ */ O("div", {
				className: "shrink-0 border-t border-border px-2 py-1",
				children: /* @__PURE__ */ O(n, {
					size: "sm",
					variant: "ghost",
					"aria-expanded": u,
					onClick: () => d(!u),
					children: u ? "Hide accessible list" : "View as accessible list"
				})
			}),
			u && /* @__PURE__ */ O("div", {
				className: "max-h-60 shrink-0 overflow-auto p-3",
				children: /* @__PURE__ */ O(J, { ...e })
			})
		]
	});
}
//#endregion
//#region src/components/graph/work/WorkGraph.tsx
var at = 328, ot = 224, Q = {
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
function st(e) {
	return e.locked ? "Restricted work item" : e.title.trim() || "Untitled work item";
}
function ct({ data: e }) {
	return /* @__PURE__ */ k("div", {
		className: "w-[248px]",
		children: [
			/* @__PURE__ */ O(P, {
				type: "target",
				position: F.Left,
				isConnectable: !1,
				className: "opacity-0"
			}),
			/* @__PURE__ */ O(Te, {
				node: e.entity,
				selected: e.selected,
				onSelect: e.onSelect,
				onOpen: e.onOpen
			}),
			/* @__PURE__ */ O(P, {
				type: "source",
				position: F.Right,
				isConnectable: !1,
				className: "opacity-0"
			})
		]
	});
}
function lt({ id: t, sourceX: n, sourceY: r, targetX: i, targetY: a, sourcePosition: o, targetPosition: s, markerEnd: c, data: l }) {
	let u = e(), [d, f, p] = ne({
		sourceX: n,
		sourceY: r,
		targetX: i,
		targetY: a,
		sourcePosition: o,
		targetPosition: s
	});
	if (!l) return null;
	let m = l.entity.status === "running" && !l.entity.endedAt;
	return /* @__PURE__ */ k(D, { children: [
		/* @__PURE__ */ O(j, {
			id: t,
			path: d,
			markerEnd: c,
			interactionWidth: 24,
			className: l.selected ? "stroke-primary" : "stroke-border-emphasis"
		}),
		m && !u ? /* @__PURE__ */ O("circle", {
			r: "4",
			className: "fill-primary",
			"aria-hidden": "true",
			"data-testid": `work-edge-motion-${l.entity.id}`,
			children: /* @__PURE__ */ O("animateMotion", {
				dur: "2s",
				repeatCount: "indefinite",
				path: d
			})
		}) : null,
		/* @__PURE__ */ O("foreignObject", {
			x: f - 104,
			y: p - 40,
			width: "208",
			height: "80",
			className: "overflow-visible",
			children: /* @__PURE__ */ O("div", {
				className: "nodrag nopan w-52",
				"data-work-edge-label": l.entity.id,
				children: /* @__PURE__ */ O(De, {
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
var ut = { work: ct }, dt = { work: lt };
function ft(e, t) {
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
			return n(e.id) - n(t.id) || $(e, t);
		}), t.forEach((t, n) => {
			u.set(t.id, n), c.set(t.id, {
				x: 48 + e * at,
				y: 48 + n * ot
			});
		});
	}
	return c;
}
function $(e, t) {
	return Q[e.kind] - Q[t.kind] || e.id.localeCompare(t.id);
}
function pt(e, t, n) {
	return e ? e.kind === "node" ? t.some((t) => t.id === e.id) : n.some((t) => t.id === e.id) : !1;
}
function mt({ state: e, errorMessage: t, onRetry: r }) {
	return e === "loading" ? /* @__PURE__ */ O("div", {
		role: "status",
		"data-testid": "work-graph-loading",
		className: "flex min-h-[22rem] items-center justify-center rounded-lg border border-border bg-surface text-sm text-text-secondary",
		children: "Loading shared work…"
	}) : e === "error" ? /* @__PURE__ */ O(s, {
		testId: "work-graph-error",
		icon: "!",
		title: "Shared work is unavailable",
		description: t || "The work graph could not be loaded.",
		action: r ? /* @__PURE__ */ O(n, {
			onClick: r,
			children: "Try again"
		}) : void 0
	}) : /* @__PURE__ */ O(s, {
		testId: "work-graph-empty",
		icon: "○",
		title: "No shared work",
		description: "There is no shared work available for this day."
	});
}
function ht({ nodes: e, edges: n, selection: r, viewport: i, day: a, timezone: o, sources: s = [], state: c = "ready", errorMessage: l, className: u, onSelectionChange: d, onViewportChange: f, onRetry: p, onOpen: m, onReference: h, onRequestCollaboration: g }) {
	let _ = w(() => new Set(e.map((e) => e.id)), [e]), v = w(() => n.filter((e) => _.has(e.fromId) && _.has(e.toId)), [n, _]), y = pt(r, e, v) ? r : null;
	S(() => {
		r && !y && d(null);
	}, [
		y,
		d,
		r
	]);
	let b = ft(e.map((e) => ({
		id: e.id,
		kind: e.kind
	})), v), x = new Map(e.map((e) => [e.id, e])), C = e.map((e) => ({
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
	})), T = v.map((e) => ({
		id: e.id,
		type: "work",
		source: e.fromId,
		target: e.toId,
		selected: y?.kind === "edge" && y.id === e.id,
		focusable: !1,
		data: {
			entity: e,
			selected: y?.kind === "edge" && y.id === e.id,
			fromLabel: st(x.get(e.fromId)),
			toLabel: st(x.get(e.toId)),
			onSelect: (e) => d({
				kind: "edge",
				id: e
			})
		}
	}));
	if (c === "loading" || c === "error" || c === "empty" || e.length === 0) return /* @__PURE__ */ O("section", {
		"aria-label": "Shared work graph",
		className: t("min-w-0", u),
		children: /* @__PURE__ */ O(mt, {
			state: c === "ready" ? "empty" : c,
			errorMessage: l,
			onRetry: p
		})
	});
	let E = s.filter((e) => e.health !== "available");
	return /* @__PURE__ */ k("section", {
		"aria-label": "Shared work graph",
		className: t("min-w-0 space-y-4", u),
		"data-state": c,
		children: [
			c === "partial" ? /* @__PURE__ */ k("div", {
				role: "status",
				"data-testid": "work-graph-partial",
				className: "rounded-lg border border-warning-border bg-warning-bg px-3 py-2 text-sm text-warning-fg",
				children: [/* @__PURE__ */ O("p", {
					className: "font-medium",
					children: "Some work sources are unavailable or delayed."
				}), E.length > 0 ? /* @__PURE__ */ O("ul", {
					className: "mt-1 list-disc pl-5 text-xs",
					children: E.map((e) => /* @__PURE__ */ O("li", { children: e.message || `${e.source} is ${e.health}.` }, e.source))
				}) : null]
			}) : null,
			a ? /* @__PURE__ */ O(We, {
				day: a,
				timezone: o || "UTC",
				nodes: e,
				edges: v,
				selection: y,
				onSelectionChange: d
			}) : null,
			/* @__PURE__ */ k("div", {
				className: "grid min-w-0 grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_20rem]",
				"data-testid": "work-graph-layout",
				children: [/* @__PURE__ */ O("div", {
					className: "relative h-[clamp(22rem,55vh,42rem)] min-w-0 overflow-hidden rounded-lg border border-border bg-surface",
					"data-testid": "work-graph-canvas",
					children: /* @__PURE__ */ k(te, {
						nodes: C,
						edges: T,
						nodeTypes: ut,
						edgeTypes: dt,
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
						children: [/* @__PURE__ */ O(A, {
							gap: 20,
							size: 1,
							color: "var(--color-border)"
						}), /* @__PURE__ */ O(M, { showInteractive: !1 })]
					})
				}), /* @__PURE__ */ O(Y, {
					nodes: e,
					edges: v,
					selection: y,
					onSelectionChange: d,
					onOpen: m,
					onReference: h,
					onRequestCollaboration: g
				})]
			}),
			/* @__PURE__ */ O(J, {
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
function gt(e) {
	return e.activity && e.nodes.length > 0 && e.state !== "loading" && e.state !== "error" && e.state !== "empty" ? /* @__PURE__ */ O(it, {
		...e,
		activity: e.activity
	}) : /* @__PURE__ */ O(ht, { ...e });
}
//#endregion
export { re as S, se as _, Y as a, I as b, Te as c, be as d, ye as f, _e as g, H as h, ze as i, W as l, ve as m, nt as n, J as o, V as p, Ve as r, De as s, gt as t, U as u, B as v, L as x, z as y };
