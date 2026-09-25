import { t as e } from "./usePrefersReducedMotion-Cllucr7i.js";
import { t } from "./cn-DhjIN-s0.js";
import { _ as n, f as r, g as i, p as a } from "./overlayStack-CHdlnODN.js";
import { t as o } from "./Card-RQCeAPNU.js";
import { t as s } from "./Chip-4IBrlduZ.js";
import { t as c } from "./IconButton-DDeXW3mZ.js";
import { l, p as u } from "./Icons-BSEVGRI6.js";
import { t as d } from "./Input-DLknWXri.js";
import { t as f } from "./EmptyState-zKbpAhFD.js";
import { t as p } from "./Spinner-CLcq5z8N.js";
import { t as m } from "./SkeletonCard-CGe8XFPB.js";
import { n as h, t as g } from "./Tabs-CWj6ZL7J.js";
import { t as _ } from "./Avatar-DeJWic2B.js";
import { t as v } from "./TitledFrame-D8PekrkI.js";
import { t as y } from "./InlineAlert-CRnIKeAF.js";
import { t as b } from "./LogStream-J2cxfOVI.js";
import { a as x, o as S, s as C } from "./backdropTone-BF54k8gW.js";
import { n as w, r as T, t as E } from "./RippleGridBackground-DTc7RHie.js";
import { t as D } from "./DropdownMenu-CHrQvZgc.js";
import { t as O } from "./StatusPill-C-aN2Pzz.js";
import { t as k } from "./Select-D3fGI8SO.js";
import { t as A } from "./Checkbox-Dftwml_V.js";
import { t as j } from "./Tooltip-af4BrR7T.js";
import { t as M } from "./useMeasuredWidth-BPrwD0q5.js";
import { t as ee } from "./formatBytes-05ivRSJY.js";
import { c as N, n as P, s as F } from "./useComputeProjects-C2esFdTJ.js";
import { n as te } from "./ChatSidePanelRegistry-CFYMdnJZ.js";
/* empty css               */
import { t as I } from "./AnimatedEdge-OTHCEYJd.js";
import { Suspense as L, createContext as R, lazy as z, useCallback as B, useContext as V, useEffect as H, useId as U, useMemo as W, useRef as G, useState as K } from "react";
import { Fragment as q, jsx as J, jsxs as Y } from "react/jsx-runtime";
import { Background as ne, BaseEdge as re, Controls as ie, EdgeLabelRenderer as ae, Handle as X, MarkerType as Z, Position as Q, ReactFlow as oe, getBezierPath as se, getSmoothStepPath as ce, useReactFlow as le, useStore as ue, useViewport as de } from "@xyflow/react";
var fe = R({ right: 0 });
function pe() {
	return V(fe);
}
//#endregion
//#region src/components/graph/layout.ts
function me(e) {
	let t = e.find((e) => e.group === "center");
	if (t) return t;
	let n = null, r = !1;
	for (let t of e) typeof t.weight == "number" && (!n || t.weight > n.weight ? (n = t, r = !1) : t.weight === n.weight && (r = !0));
	return n && !r ? n : null;
}
function $(e) {
	let t = [];
	for (let n of e) {
		let e = n.group ?? "";
		e !== "center" && (t.includes(e) || t.push(e));
	}
	return t;
}
function he(e, t, n, r) {
	if (e.length === 0) return /* @__PURE__ */ new Map();
	switch (n) {
		case "grid": return _e(e, r);
		case "force": return ve(e, t, r);
		default: return ge(e, r);
	}
}
function ge(e, { width: t, height: n, padding: r = 40 }) {
	let i = /* @__PURE__ */ new Map(), a = t / 2, o = n / 2, s = me(e), c = e.filter((e) => e !== s);
	if (s && i.set(s.id, {
		x: a,
		y: o
	}), c.length === 0) return i;
	let l = $(c), u = /* @__PURE__ */ new Map();
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
				x: ye(a + r * Math.cos(n)),
				y: ye(o + r * Math.sin(n))
			});
		});
	}), i;
}
function _e(e, { width: t, height: n, padding: r = 40 }) {
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
				x: ye(n),
				y: ye(u)
			});
		});
	}), i;
}
function ve(e, t, { width: n, height: r, padding: i = 40 }) {
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
			x: ye(b + (s[t] - p) * y),
			y: ye(x + (c[t] - h) * y)
		});
	}), S;
}
function ye(e) {
	return Math.round(e * 100) / 100;
}
//#endregion
//#region src/components/graph/NodeGraph.tsx
var be = 480, xe = [
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
], Se = {
	fill: "fill-primary",
	bg: "bg-primary"
};
function Ce(e, t) {
	if (e === "center") return Se;
	let n = t.indexOf(e ?? "");
	return xe[(n < 0 ? 0 : n) % xe.length];
}
var we = .5, Te = 4, Ee = {
	x: 0,
	y: 0,
	k: 1
};
function De({ nodes: e, edges: n, layout: r = "radial", selectedId: i = null, onSelect: a, height: o = 320, className: s, "data-testid": l = "node-graph" }) {
	let u = W(() => he(e, n, r, {
		width: 480,
		height: o
	}), [
		e,
		n,
		r,
		480,
		o
	]), d = W(() => $(e), [e]), f = W(() => me(e), [e]), p = W(() => Oe(e, f), [e, f]), [m, h] = K(Ee), [g, _] = K(null), v = G(null), y = G(null), [b, x] = K(!1), S = () => {
		let e = v.current?.getBoundingClientRect();
		return e && e.width > 0 ? 480 / e.width : 1;
	};
	H(() => {
		let e = v.current;
		if (!e) return;
		let t = (t) => {
			t.preventDefault();
			let n = e.getBoundingClientRect(), r = n.width > 0 ? 480 / n.width : 1, i = (t.clientX - n.left) * r, a = (t.clientY - n.top) * r;
			h((e) => {
				let n = Ae(e.k * (t.deltaY < 0 ? 1.1 : 1 / 1.1), we, Te), r = n / e.k;
				return {
					k: n,
					x: i - (i - e.x) * r,
					y: a - (a - e.y) * r
				};
			});
		};
		return e.addEventListener("wheel", t, { passive: !1 }), () => e.removeEventListener("wheel", t);
	}, [480]);
	let C = (e) => {
		e.button === 0 && (y.current = {
			startX: e.clientX,
			startY: e.clientY,
			originX: m.x,
			originY: m.y
		}, x(!0));
	};
	H(() => {
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
	let w = (e) => a?.(e), T = (e, t) => {
		(e.key === "Enter" || e.key === " ") && (e.preventDefault(), w(t));
	}, E = m.x === 0 && m.y === 0 && m.k === 1, D = W(() => new Map(e.map((e) => [e.id, e])), [e]);
	return /* @__PURE__ */ Y("div", {
		className: t("relative flex flex-col overflow-hidden rounded-lg border border-border bg-surface", s),
		"data-testid": l,
		children: [
			/* @__PURE__ */ J("svg", {
				ref: v,
				role: "img",
				"aria-label": `Graph of ${e.length} nodes`,
				viewBox: `0 0 480 ${o}`,
				width: "100%",
				height: o,
				className: t("block select-none touch-none", b ? "cursor-grabbing" : "cursor-grab"),
				onMouseDown: C,
				"data-testid": `${l}-svg`,
				children: /* @__PURE__ */ Y("g", {
					transform: `translate(${m.x} ${m.y}) scale(${m.k})`,
					"data-testid": `${l}-viewport`,
					children: [n.map((e, t) => {
						let n = u.get(e.from), r = u.get(e.to);
						if (!n || !r) return null;
						let a = i !== null && (e.from === i || e.to === i);
						return /* @__PURE__ */ Y("g", {
							"data-testid": `${l}-edge-${e.from}-${e.to}`,
							children: [/* @__PURE__ */ J("line", {
								x1: n.x,
								y1: n.y,
								x2: r.x,
								y2: r.y,
								strokeWidth: ke(e.weight),
								className: a ? "stroke-primary" : "stroke-border-emphasis"
							}), e.label && /* @__PURE__ */ J("text", {
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
						let r = p.get(e.id) ?? 16, a = e.id === i, o = Ce(e.group, d), s = `${l}-clip-${e.id}`;
						return /* @__PURE__ */ Y("g", {
							role: "button",
							tabIndex: 0,
							"aria-label": e.sublabel ? `${e.label}, ${e.sublabel}` : e.label,
							"aria-pressed": a,
							transform: `translate(${n.x} ${n.y})`,
							className: "cursor-pointer outline-none",
							onClick: (t) => {
								t.stopPropagation(), w(e);
							},
							onMouseDown: (e) => e.stopPropagation(),
							onKeyDown: (t) => T(t, e),
							onFocus: () => _(e.id),
							onBlur: () => _((t) => t === e.id ? null : t),
							"data-testid": `${l}-node-${e.id}`,
							"data-selected": a || void 0,
							children: [
								/* @__PURE__ */ J("title", { children: e.sublabel ?? e.label }),
								(a || g === e.id) && /* @__PURE__ */ J("circle", {
									r: r + 4,
									className: t("fill-none", a ? "stroke-primary" : "stroke-border-emphasis"),
									strokeWidth: 2,
									strokeDasharray: a ? void 0 : "3 3"
								}),
								e.avatarUrl ? /* @__PURE__ */ Y(q, { children: [
									/* @__PURE__ */ J("clipPath", {
										id: s,
										children: /* @__PURE__ */ J("circle", { r })
									}),
									/* @__PURE__ */ J("circle", {
										r,
										className: t("stroke-surface", o.fill),
										strokeWidth: 2
									}),
									/* @__PURE__ */ J("image", {
										href: e.avatarUrl,
										x: -r,
										y: -r,
										width: r * 2,
										height: r * 2,
										clipPath: `url(#${s})`,
										preserveAspectRatio: "xMidYMid slice"
									})
								] }) : /* @__PURE__ */ J("circle", {
									r,
									fill: e.color,
									className: t("stroke-surface", !e.color && o.fill),
									strokeWidth: 2
								}),
								!e.avatarUrl && /* @__PURE__ */ J("text", {
									y: 1,
									textAnchor: "middle",
									dominantBaseline: "middle",
									className: "pointer-events-none fill-white text-[10px] font-semibold",
									children: je(e.label)
								}),
								/* @__PURE__ */ J("text", {
									y: r + 12,
									textAnchor: "middle",
									className: "pointer-events-none fill-text-primary text-[11px]",
									children: e.label
								}),
								e === f && e.sublabel && /* @__PURE__ */ J("text", {
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
			/* @__PURE__ */ Y("div", {
				className: "pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-2",
				children: [d.length > 0 && (d.length > 1 || d[0] !== "") ? /* @__PURE__ */ J("ul", {
					"aria-label": "Legend",
					className: "pointer-events-auto flex flex-wrap gap-x-3 gap-y-1 rounded-md bg-surface/85 px-2 py-1 text-[11px] text-text-secondary",
					"data-testid": `${l}-legend`,
					children: d.map((e) => /* @__PURE__ */ Y("li", {
						className: "flex items-center gap-1",
						children: [/* @__PURE__ */ J("span", {
							"aria-hidden": !0,
							className: t("inline-block h-2 w-2 rounded-full", Ce(e, d).bg)
						}), e || "Other"]
					}, e || "(none)"))
				}) : /* @__PURE__ */ J("span", {}), /* @__PURE__ */ J(c, {
					size: "sm",
					"aria-label": "Reset view",
					title: "Reset view",
					disabled: E,
					onClick: () => h(Ee),
					className: "pointer-events-auto bg-surface/85",
					"data-testid": `${l}-reset`,
					children: "⟲"
				})]
			}),
			i && D.get(i) && /* @__PURE__ */ Y("span", {
				className: "sr-only",
				"aria-live": "polite",
				children: ["Selected ", D.get(i).label]
			})
		]
	});
}
function Oe(e, t) {
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
function ke(e) {
	return typeof e == "number" ? Ae(1 + e * 1.5, 1, 5) : 1.5;
}
function Ae(e, t, n) {
	return Math.min(n, Math.max(t, e));
}
function je(e) {
	let t = e.trim().split(/\s+/).filter(Boolean);
	return t.length === 0 ? "" : t.length === 1 ? t[0].slice(0, 2).toUpperCase() : (t[0][0] + t[t.length - 1][0]).toUpperCase();
}
//#endregion
//#region src/components/graph/PeopleGraph.tsx
var Me = "__query__";
function Ne(e, t) {
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
function Pe(e, t) {
	let n = [{
		id: Me,
		label: t?.trim() || "Everyone",
		sublabel: `${e.length} ${e.length === 1 ? "person" : "people"}`,
		group: "center"
	}], r = [];
	for (let i of e) {
		let e = Ne(i, t);
		n.push({
			id: i.id,
			label: i.name,
			sublabel: i.title,
			group: e,
			weight: i.score,
			avatarUrl: i.avatarUrl
		}), r.push({
			from: Me,
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
function Fe({ people: e, query: r, onOpenPerson: i, onMessagePerson: a, graphHeight: c = 300, className: l, "data-testid": u = "people-graph" }) {
	let [d, p] = K(null), { nodes: m, edges: h } = W(() => Pe(e, r), [e, r]), g = W(() => $(m), [m]);
	return e.length === 0 ? /* @__PURE__ */ J(f, {
		size: "sm",
		icon: "🕸️",
		title: "No people found",
		body: r ? `Nothing matched “${r}”.` : "There is nobody to show yet.",
		testId: `${u}-empty`,
		className: l
	}) : /* @__PURE__ */ J("div", {
		className: t("@container flex min-h-0 flex-col gap-3 p-3", l),
		"data-testid": u,
		children: /* @__PURE__ */ Y("div", {
			className: "flex min-h-0 flex-col gap-3 @lg:flex-row",
			children: [/* @__PURE__ */ J(De, {
				nodes: m,
				edges: h,
				layout: "radial",
				height: c,
				selectedId: d,
				onSelect: (e) => p(e.id === "__query__" ? null : e.id),
				className: "@lg:flex-1",
				"data-testid": `${u}-graph`
			}), /* @__PURE__ */ J("ul", {
				className: "flex min-w-0 flex-col gap-2 @lg:w-[260px] @lg:shrink-0",
				"aria-label": "People",
				"data-testid": `${u}-list`,
				children: e.map((e) => {
					let c = Ne(e, r), l = e.id === d;
					return /* @__PURE__ */ J("li", { children: /* @__PURE__ */ Y(o, {
						padding: "none",
						className: t("flex cursor-pointer items-center gap-3 p-2", l && "ring-2 ring-primary"),
						onClick: () => p(l ? null : e.id),
						"data-testid": `${u}-row-${e.id}`,
						"data-selected": l || void 0,
						children: [
							/* @__PURE__ */ J("span", {
								className: t("h-2 w-2 shrink-0 rounded-full", Ce(c, g).bg),
								"aria-hidden": !0
							}),
							/* @__PURE__ */ J(_, {
								name: e.name,
								src: e.avatarUrl,
								size: 28
							}),
							/* @__PURE__ */ Y("span", {
								className: "flex min-w-0 flex-1 flex-col",
								children: [
									/* @__PURE__ */ J("span", {
										className: "truncate text-[13px] font-medium text-text-primary",
										children: e.name
									}),
									e.title && /* @__PURE__ */ J("span", {
										className: "truncate text-[11px] text-text-tertiary",
										children: e.title
									}),
									c && /* @__PURE__ */ J("span", {
										className: "mt-0.5",
										children: /* @__PURE__ */ J(s, {
											size: "xs",
											children: c
										})
									})
								]
							}),
							/* @__PURE__ */ Y("span", {
								className: "flex shrink-0 items-center gap-1",
								children: [a && /* @__PURE__ */ J(n, {
									size: "sm",
									variant: "secondary",
									onClick: (t) => {
										t.stopPropagation(), a(e.id);
									},
									"data-testid": `${u}-message-${e.id}`,
									children: "Message"
								}), i && /* @__PURE__ */ J(n, {
									size: "sm",
									variant: "ghost",
									onClick: (t) => {
										t.stopPropagation(), i(e.id);
									},
									"data-testid": `${u}-open-${e.id}`,
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
function Ie(e) {
	return Array.isArray(e.people);
}
function Le(e) {
	return (t, n) => /* @__PURE__ */ J(Re, {
		panel: t,
		api: n,
		options: e
	});
}
function Re({ panel: e, api: t, options: r }) {
	let { load: i, onOpenPerson: a, onMessagePerson: o, onSelectNode: s, graphHeight: c = 300, "data-testid": l = "graph-panel" } = r, [u, d] = K({ status: "loading" }), [f, h] = K(0), [g, _] = K(null);
	H(() => {
		let n = !1;
		return d({ status: "loading" }), i(e).then((e) => {
			n || (d({
				status: "ready",
				data: e
			}), e.title && t.setTitle(e.title));
		}, (e) => {
			n || d({
				status: "error",
				message: e instanceof Error ? e.message : String(e)
			});
		}), () => {
			n = !0;
		};
	}, [
		e.kind,
		e.id,
		f
	]);
	let v = B(() => h((e) => e + 1), []), b = {
		panel: e,
		api: t
	};
	if (u.status === "loading") return /* @__PURE__ */ Y("div", {
		className: "relative flex flex-col gap-3 p-3",
		"data-testid": `${l}-loading`,
		"aria-busy": "true",
		children: [
			/* @__PURE__ */ J(m, {
				height: c,
				rounded: "lg"
			}),
			/* @__PURE__ */ J(m, { height: 44 }),
			/* @__PURE__ */ J(m, { height: 44 }),
			/* @__PURE__ */ J("div", {
				className: "absolute inset-0 flex items-center justify-center",
				children: /* @__PURE__ */ J(p, {
					size: "md",
					"aria-label": "Loading graph"
				})
			})
		]
	});
	if (u.status === "error") return /* @__PURE__ */ Y("div", {
		className: "flex flex-col gap-2 p-3",
		"data-testid": `${l}-error`,
		children: [/* @__PURE__ */ Y(y, {
			tone: "error",
			children: ["Could not load this graph: ", u.message]
		}), /* @__PURE__ */ J(n, {
			size: "sm",
			variant: "secondary",
			onClick: v,
			className: "self-start",
			"data-testid": `${l}-retry`,
			children: "Try again"
		})]
	});
	let { data: x } = u;
	return Ie(x) ? /* @__PURE__ */ J(Fe, {
		people: x.people,
		query: x.query ?? e.params?.q ?? e.params?.query,
		graphHeight: c,
		onOpenPerson: a ? (e) => a(e, b) : void 0,
		onMessagePerson: o ? (e) => o(e, b) : void 0,
		"data-testid": `${l}-people`
	}) : /* @__PURE__ */ J("div", {
		className: "p-3",
		"data-testid": `${l}-nodes`,
		children: /* @__PURE__ */ J(De, {
			nodes: x.nodes,
			edges: x.edges,
			layout: x.layout ?? "force",
			height: c,
			selectedId: g,
			onSelect: (e) => {
				_(e.id), s?.(e, b);
			},
			"data-testid": `${l}-graph`
		})
	});
}
//#endregion
//#region src/components/graph/CanvasZoomControls.tsx
function ze() {
	return /* @__PURE__ */ J("svg", {
		"aria-hidden": "true",
		width: "14",
		height: "14",
		viewBox: "0 0 14 14",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		strokeLinecap: "round",
		children: /* @__PURE__ */ J("path", { d: "M1.5 5 V1.5 H5 M9 1.5 H12.5 V5 M12.5 9 V12.5 H9 M5 12.5 H1.5 V9" })
	});
}
function Be({ zoom: e, onZoomIn: n, onZoomOut: r, onFit: i, minZoom: a, maxZoom: o, className: s, "aria-label": l = "Zoom", "data-testid": u = "canvas-zoom-controls" }) {
	let d = .001, f = e !== void 0 && a !== void 0 && e <= a + d, p = e !== void 0 && o !== void 0 && e >= o - d, m = e !== void 0 && Number.isFinite(e) ? `${Math.round(e * 100)}%` : null;
	return /* @__PURE__ */ Y("div", {
		role: "toolbar",
		"aria-label": l,
		className: t("inline-flex items-center gap-1.5", s),
		"data-testid": u,
		children: [/* @__PURE__ */ Y("div", {
			className: "inline-flex items-center rounded-md border border-border bg-surface",
			children: [
				/* @__PURE__ */ J(c, {
					size: "md",
					"aria-label": "Zoom out",
					onClick: r,
					disabled: f,
					className: "rounded-r-none",
					children: /* @__PURE__ */ J("span", {
						"aria-hidden": "true",
						className: "text-[15px] leading-none text-text-secondary",
						children: "−"
					})
				}),
				m && /* @__PURE__ */ J("span", {
					className: "min-w-[3.25rem] border-x border-border px-1 text-center text-[12px] tabular-nums text-text-secondary",
					"aria-label": `Zoom ${m}`,
					"data-testid": `${u}-percent`,
					children: m
				}),
				/* @__PURE__ */ J(c, {
					size: "md",
					"aria-label": "Zoom in",
					onClick: n,
					disabled: p,
					className: "rounded-l-none",
					children: /* @__PURE__ */ J("span", {
						"aria-hidden": "true",
						className: "text-[15px] leading-none text-text-secondary",
						children: "+"
					})
				})
			]
		}), i && /* @__PURE__ */ J(c, {
			size: "md",
			variant: "outline",
			"aria-label": "Fit to view",
			onClick: i,
			children: /* @__PURE__ */ J(ze, {})
		})]
	});
}
//#endregion
//#region src/components/graph/TypedNodeCanvas.tsx
var Ve = 224, He = 168;
function Ue(e, t) {
	let n = new Set(e.map((e) => e.id)), r = new Map(e.map((e) => [e.id, 0])), i = new Map(e.map((e) => [e.id, []]));
	for (let e of t) !n.has(e.from) || !n.has(e.to) || e.from === e.to || (i.get(e.from).push(e.to), r.set(e.to, (r.get(e.to) ?? 0) + 1));
	let a = /* @__PURE__ */ new Map(), o = e.filter((e) => r.get(e.id) === 0).map((e) => e.id);
	for (let e of o) a.set(e, 0);
	for (let e = 0; e < o.length; e += 1) {
		let t = o[e];
		for (let e of i.get(t)) a.set(e, Math.max(a.get(e) ?? 0, (a.get(t) ?? 0) + 1)), r.set(e, r.get(e) - 1), r.get(e) === 0 && o.push(e);
	}
	for (let t of e) typeof t.rank == "number" && Number.isFinite(t.rank) ? a.set(t.id, t.rank) : a.has(t.id) || a.set(t.id, 0);
	return a;
}
function We(e, t, n = {}) {
	let { layout: r = "ltr", nodeWidth: i = Ve, nodeHeight: a = He, columnGap: o = 144, rowGap: s = 32 } = n, c = /* @__PURE__ */ new Map();
	if (r === "manual") {
		for (let t of e) c.set(t.id, {
			x: t.x ?? 0,
			y: t.y ?? 0
		});
		return c;
	}
	let l = Ue(e, t), u = /* @__PURE__ */ new Map();
	for (let t of e) {
		let e = l.get(t.id) ?? 0, n = u.get(e) ?? 0, r = typeof t.x == "number" && typeof t.y == "number";
		r || u.set(e, n + 1), c.set(t.id, r ? {
			x: t.x,
			y: t.y
		} : {
			x: e * (i + o),
			y: n * (a + s)
		});
	}
	return c;
}
function Ge(e, t, n) {
	return t.x >= e.x + n / 2 ? ["r", "l"] : t.x + n / 2 <= e.x ? ["l", "r"] : t.y >= e.y ? ["b", "t"] : ["t", "b"];
}
Q.Left, Q.Right, Q.Top, Q.Bottom;
function Ke({ data: e }) {
	return /* @__PURE__ */ Y("div", {
		role: "group",
		tabIndex: 0,
		"aria-label": e.label,
		"aria-current": e.selected ? "true" : void 0,
		"data-canvas-node": "",
		"data-selected": e.selected ? "true" : "false",
		onClick: (t) => {
			t.target.closest("a,button,input,select,textarea") || e.onSelect?.();
		},
		onKeyDown: (t) => {
			t.target === t.currentTarget && (t.key === "Enter" || t.key === " ") && (t.preventDefault(), e.onSelect?.());
		},
		className: t("nodrag relative w-full rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2", e.onSelect && "cursor-pointer"),
		children: [
			/* @__PURE__ */ J(X, {
				id: "l",
				type: "target",
				position: Q.Left,
				isConnectable: !1,
				className: "opacity-0"
			}),
			/* @__PURE__ */ J(X, {
				id: "t",
				type: "target",
				position: Q.Top,
				isConnectable: !1,
				className: "opacity-0"
			}),
			/* @__PURE__ */ J(X, {
				id: "rt",
				type: "target",
				position: Q.Right,
				isConnectable: !1,
				className: "opacity-0"
			}),
			/* @__PURE__ */ J(X, {
				id: "bt",
				type: "target",
				position: Q.Bottom,
				isConnectable: !1,
				className: "opacity-0"
			}),
			e.content,
			/* @__PURE__ */ J(X, {
				id: "r",
				type: "source",
				position: Q.Right,
				isConnectable: !1,
				className: "opacity-0"
			}),
			/* @__PURE__ */ J(X, {
				id: "b",
				type: "source",
				position: Q.Bottom,
				isConnectable: !1,
				className: "opacity-0"
			}),
			/* @__PURE__ */ J(X, {
				id: "ls",
				type: "source",
				position: Q.Left,
				isConnectable: !1,
				className: "opacity-0"
			}),
			/* @__PURE__ */ J(X, {
				id: "ts",
				type: "source",
				position: Q.Top,
				isConnectable: !1,
				className: "opacity-0"
			})
		]
	});
}
function qe(e, t, n) {
	switch (n) {
		case Q.Left: return `M${e - 7} ${t - 4} L${e} ${t} L${e - 7} ${t + 4} Z`;
		case Q.Right: return `M${e + 7} ${t - 4} L${e} ${t} L${e + 7} ${t + 4} Z`;
		case Q.Top: return `M${e - 4} ${t - 7} L${e} ${t} L${e + 4} ${t - 7} Z`;
		default: return `M${e - 4} ${t + 7} L${e} ${t} L${e + 4} ${t + 7} Z`;
	}
}
function Je({ sourceX: e, sourceY: n, targetX: o, targetY: s, sourcePosition: c, targetPosition: l, data: u }) {
	let [d, f, p] = ce({
		sourceX: e,
		sourceY: n,
		targetX: o,
		targetY: s,
		sourcePosition: c,
		targetPosition: l,
		borderRadius: 10
	});
	if (!u) return null;
	let { entity: m, selected: h, reducedMotion: g, onSelect: _ } = u, v = m.tone ? i(m.tone) : "var(--color-primary)", y = !!m.label || m.detail != null || !!m.marker;
	return /* @__PURE__ */ Y("g", {
		"data-edge-id": m.id,
		"data-selected": h ? "true" : "false",
		children: [
			/* @__PURE__ */ J("path", {
				d,
				fill: "none",
				stroke: v,
				strokeWidth: h ? 2.25 : 1.5
			}),
			/* @__PURE__ */ J("path", {
				d: qe(o, s, l),
				fill: v
			}),
			/* @__PURE__ */ J("path", {
				d,
				fill: "none",
				stroke: v,
				strokeOpacity: 0,
				strokeWidth: 20,
				className: _ ? "cursor-pointer" : void 0
			}),
			m.animated && !g ? /* @__PURE__ */ J("circle", {
				r: "4",
				fill: v,
				"aria-hidden": "true",
				"data-testid": `typed-edge-motion-${m.id}`,
				children: /* @__PURE__ */ J("animateMotion", {
					dur: "2s",
					repeatCount: "indefinite",
					path: d
				})
			}) : null,
			y ? /* @__PURE__ */ J("foreignObject", {
				x: f - 90,
				y: p - 30,
				width: "180",
				height: "76",
				className: "overflow-visible",
				children: /* @__PURE__ */ Y("div", {
					className: "nodrag nopan pointer-events-none flex h-full flex-col items-center text-center",
					"data-typed-edge-label": m.id,
					children: [
						/* @__PURE__ */ J("span", {
							className: t("h-5 whitespace-nowrap text-[13px] font-medium leading-5", m.tone ? a[m.tone] : "text-primary"),
							children: m.label ?? ""
						}),
						/* @__PURE__ */ J("span", {
							className: "flex h-5 items-center justify-center",
							children: m.marker ? /* @__PURE__ */ J("button", {
								type: "button",
								"aria-label": m.marker.label,
								"aria-pressed": h,
								onClick: (e) => {
									e.stopPropagation(), _?.();
								},
								disabled: !_,
								className: t("pointer-events-auto h-3 w-3 rounded-full border-none p-0 ring-2 ring-surface", r[m.marker.tone ?? m.tone ?? "info"], _ ? "cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary" : "cursor-default", h && "outline-2 outline-offset-2 outline-primary"),
								"data-testid": `typed-edge-marker-${m.id}`
							}) : null
						}),
						m.detail != null && /* @__PURE__ */ J("span", {
							className: "text-[12px] leading-4 text-text-tertiary",
							children: m.detail
						})
					]
				})
			}) : null
		]
	});
}
var Ye = { typed: Ke }, Xe = { typed: Je };
function Ze({ controls: e, caption: t, minZoom: n, maxZoom: r, fitKey: i, reducedMotion: a, userMoved: o }) {
	let s = le(), { zoom: c } = de(), l = a ? 0 : 200, u = B(() => {
		o.current = !1, s.fitView({
			padding: .15,
			maxZoom: 1,
			duration: l
		});
	}, [
		s,
		l,
		o
	]), d = ue((e) => e.width), f = ue((e) => e.height), p = G(null);
	H(() => {
		if (!d || !f) return;
		let e = p.current;
		p.current = {
			w: d,
			h: f
		}, !(!e || o.current) && (Math.abs(e.w - d) < 8 && Math.abs(e.h - f) < 8 || s.fitView({
			padding: .15,
			maxZoom: 1,
			duration: 0
		}));
	}, [
		d,
		f,
		s,
		o
	]);
	let m = G(!0);
	return H(() => {
		if (m.current) {
			m.current = !1;
			return;
		}
		let e = typeof requestAnimationFrame == "function" ? requestAnimationFrame(u) : void 0;
		return () => {
			e !== void 0 && typeof cancelAnimationFrame == "function" && cancelAnimationFrame(e);
		};
	}, [i, u]), !e && t == null ? null : /* @__PURE__ */ Y("div", {
		className: "pointer-events-none absolute inset-x-3 bottom-3 z-10 flex items-center gap-4",
		children: [e && /* @__PURE__ */ J(Be, {
			className: "pointer-events-auto",
			zoom: c,
			minZoom: n,
			maxZoom: r,
			onZoomIn: () => {
				o.current = !0, s.zoomIn({ duration: l });
			},
			onZoomOut: () => {
				o.current = !0, s.zoomOut({ duration: l });
			},
			onFit: u
		}), t != null && /* @__PURE__ */ J("p", {
			className: "m-0 min-w-0 flex-1 truncate text-center text-[12px] text-text-tertiary",
			children: t
		})]
	});
}
function Qe({ nodes: e, edges: n, order: r, selectedId: i, onSelectNode: a, onSelectEdge: o, renderListItem: s, ariaLabel: c, testId: l, className: u }) {
	let d = new Map(e.map((e) => [e.id, e])), f = [...e].sort((e, t) => (r.get(e.id) ?? 0) - (r.get(t.id) ?? 0));
	return /* @__PURE__ */ J("ol", {
		"aria-label": c,
		className: t("m-0 flex list-none flex-col divide-y divide-border p-0", u),
		"data-testid": `${l}-list`,
		children: f.map((e) => {
			let r = i === e.id, c = e.label ?? e.id, u = n.filter((t) => t.from === e.id && d.has(t.to)), f = s ? s(e) : /* @__PURE__ */ Y("span", {
				className: "flex min-w-0 items-baseline gap-2",
				children: [/* @__PURE__ */ J("span", {
					className: "truncate text-[13px] font-medium text-text-primary",
					children: c
				}), /* @__PURE__ */ J("span", {
					className: "text-[12px] text-text-tertiary",
					children: e.kind
				})]
			});
			return /* @__PURE__ */ Y("li", {
				className: t("flex min-w-0 flex-col gap-1 px-3 py-2.5", r && "bg-surface-hover"),
				"data-testid": `${l}-list-node-${e.id}`,
				children: [a ? /* @__PURE__ */ J("button", {
					type: "button",
					"aria-label": c,
					"aria-current": r ? "true" : void 0,
					onClick: () => a(e.id),
					className: "min-w-0 cursor-pointer border-none bg-transparent p-0 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
					children: f
				}) : f, u.length > 0 && /* @__PURE__ */ J("ul", {
					className: "m-0 flex list-none flex-col gap-0.5 p-0 pl-3",
					children: u.map((e) => {
						let t = `${e.label ? `${e.label} ` : ""}→ ${d.get(e.to).label ?? e.to}`;
						return /* @__PURE__ */ Y("li", {
							className: "flex min-w-0 flex-wrap items-baseline gap-x-2 text-[12px] text-text-secondary",
							children: [
								o ? /* @__PURE__ */ J("button", {
									type: "button",
									onClick: () => o(e.id),
									"aria-current": i === e.id ? "true" : void 0,
									className: "cursor-pointer border-none bg-transparent p-0 text-left text-[12px] text-primary hover:underline",
									children: t
								}) : /* @__PURE__ */ J("span", { children: t }),
								e.detail != null && /* @__PURE__ */ J("span", {
									className: "text-text-tertiary",
									children: e.detail
								}),
								e.marker && /* @__PURE__ */ Y("span", {
									className: "text-text-tertiary",
									children: ["· ", e.marker.label]
								})
							]
						}, e.id);
					})
				})]
			}, e.id);
		})
	});
}
function $e({ nodes: n, edges: r, renderNode: i, layout: a = "ltr", onSelectNode: o, onSelectEdge: s, selectedId: c = null, listFallback: l = !1, renderListItem: u, nodeWidth: d = Ve, nodeHeight: f = He, columnGap: p = 144, rowGap: m = 32, controls: h = !0, caption: g, minZoom: _ = .3, maxZoom: v = 2, onViewportChange: y, emptyLabel: b = "Nothing to draw yet", className: x, "aria-label": S = "Graph", "data-testid": C = "typed-node-canvas" }) {
	let w = e(), T = G(null), E = G(!1), D = W(() => We(n, r, {
		layout: a,
		nodeWidth: d,
		nodeHeight: f,
		columnGap: p,
		rowGap: m
	}), [
		n,
		r,
		a,
		d,
		f,
		p,
		m
	]), O = W(() => {
		let e = [...n].sort((e, t) => {
			let n = D.get(e.id), r = D.get(t.id);
			return n.x - r.x || n.y - r.y;
		});
		return new Map(e.map((e, t) => [e.id, t]));
	}, [n, D]), k = W(() => new Set(n.map((e) => e.id)), [n]), A = W(() => r.filter((e) => k.has(e.from) && k.has(e.to) && e.from !== e.to), [r, k]), j = W(() => [...k].sort().join("|"), [k]);
	if (n.length === 0) return /* @__PURE__ */ J("div", {
		className: t("flex min-h-40 items-center justify-center text-[13px] text-text-tertiary", x),
		"data-testid": `${C}-empty`,
		children: b
	});
	if (l) return /* @__PURE__ */ J(Qe, {
		nodes: n,
		edges: A,
		order: O,
		selectedId: c,
		onSelectNode: o,
		onSelectEdge: s,
		renderListItem: u,
		ariaLabel: S,
		testId: C,
		className: x
	});
	let M = [...n].sort((e, t) => O.get(e.id) - O.get(t.id)).map((e) => {
		let t = c === e.id;
		return {
			id: e.id,
			type: "typed",
			position: D.get(e.id),
			draggable: !1,
			connectable: !1,
			selectable: !1,
			focusable: !1,
			width: d,
			data: {
				content: i(e, { selected: t }),
				label: e.label ?? e.id,
				selected: t,
				width: d,
				onSelect: o ? () => o(e.id) : void 0
			}
		};
	}), ee = A.map((e) => {
		let [t, n] = Ge(D.get(e.from), D.get(e.to), d), r = t === "r" ? "r" : t === "b" ? "b" : t === "l" ? "ls" : "ts", i = n === "l" ? "l" : n === "t" ? "t" : n === "r" ? "rt" : "bt";
		return {
			id: e.id,
			type: "typed",
			source: e.from,
			target: e.to,
			sourceHandle: r,
			targetHandle: i,
			focusable: !1,
			selectable: !1,
			data: {
				entity: e,
				selected: c === e.id,
				reducedMotion: w,
				onSelect: s ? () => s(e.id) : void 0
			}
		};
	});
	return /* @__PURE__ */ J("div", {
		ref: T,
		role: "region",
		"aria-label": S,
		className: t("relative isolate min-h-64 min-w-0 overflow-hidden", x),
		onKeyDown: (e) => {
			if (![
				"ArrowRight",
				"ArrowDown",
				"ArrowLeft",
				"ArrowUp",
				"Home",
				"End"
			].includes(e.key)) return;
			let t = e.target;
			if (!t.matches("[data-canvas-node]")) return;
			let n = Array.from(T.current?.querySelectorAll("[data-canvas-node]") ?? []), r = n.indexOf(t);
			r < 0 || (e.preventDefault(), n[e.key === "Home" ? 0 : e.key === "End" ? n.length - 1 : e.key === "ArrowRight" || e.key === "ArrowDown" ? Math.min(n.length - 1, r + 1) : Math.max(0, r - 1)]?.focus());
		},
		"data-testid": C,
		"data-reduced-motion": w ? "true" : "false",
		children: /* @__PURE__ */ J(oe, {
			nodes: M,
			edges: ee,
			nodeTypes: Ye,
			edgeTypes: Xe,
			fitView: !0,
			fitViewOptions: {
				padding: .15,
				maxZoom: 1
			},
			minZoom: _,
			maxZoom: v,
			onEdgeClick: s ? (e, t) => s(t.id) : void 0,
			onViewportChange: y,
			onMoveStart: (e) => {
				e && (E.current = !0);
			},
			nodesDraggable: !1,
			nodesConnectable: !1,
			nodesFocusable: !1,
			edgesFocusable: !1,
			elementsSelectable: !1,
			zoomOnScroll: !1,
			preventScrolling: !1,
			deleteKeyCode: null,
			disableKeyboardA11y: !0,
			proOptions: { hideAttribution: !0 },
			children: /* @__PURE__ */ J(Ze, {
				controls: h,
				caption: g,
				minZoom: _,
				maxZoom: v,
				fitKey: j,
				reducedMotion: w,
				userMoved: E
			})
		})
	});
}
//#endregion
//#region src/components/graph/work/WorkStatus.tsx
var et = {
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
function tt(e, t) {
	if (!(e !== "waiting" || !t)) return t.reason === "awaiting_approval" ? "Needs approval" : t.step ? `Paused at ${t.step}` : "Paused";
}
function nt({ status: n, sharingFresh: r = !1, label: i, className: a }) {
	let o = e(), s = et[n], c = i ?? s.label, l = n === "running" && r && !o;
	return /* @__PURE__ */ Y("span", {
		role: "status",
		"aria-label": i ? `${s.label}: ${i}` : s.label,
		"data-status": n,
		"data-sharing-fresh": r ? "true" : "false",
		className: t("inline-flex items-center gap-1.5 whitespace-nowrap text-xs font-medium", s.tone, a),
		children: [/* @__PURE__ */ J("span", {
			"aria-hidden": "true",
			className: t("inline-flex h-4 w-4 items-center justify-center rounded-full border border-current text-[10px] leading-none", l && "animate-pulse"),
			children: s.icon
		}), /* @__PURE__ */ J("span", { children: c })]
	});
}
//#endregion
//#region src/components/graph/work/WorkNode.tsx
var rt = {
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
}, it = {
	terminal: "observe-terminal",
	document: "view-document",
	conversation: "join-conversation",
	meeting: "join-meeting",
	transcript: "view-transcript",
	run: "view-run"
}, at = {
	terminal: "Observe",
	document: "View",
	conversation: "Open chat",
	meeting: "Join",
	transcript: "View",
	run: "View"
};
function ot(e) {
	if (!e) return null;
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? null : t.toLocaleString(void 0, {
		dateStyle: "medium",
		timeStyle: "short"
	});
}
function st(e) {
	return e.locked ? "Restricted work item" : e.title.trim() || `${rt[e.kind]} (untitled)`;
}
function ct({ node: e, selected: r = !1, sharingFresh: i = !1, onSelect: a, onOpen: o }) {
	let s = st(e), c = it[e.kind], l = c !== void 0 && e.capabilities.includes(c), u = at[e.kind] ?? "Open", d = ot(e.updatedAt), f = ot(e.startedAt), p = ot(e.endedAt), m = () => a?.(e.id);
	return /* @__PURE__ */ Y("article", {
		role: "group",
		tabIndex: 0,
		"aria-label": `${rt[e.kind]}: ${s}`,
		"aria-current": r ? "true" : void 0,
		"data-testid": `work-node-${e.id}`,
		"data-kind": e.kind,
		"data-locked": e.locked ? "true" : "false",
		onClick: m,
		onKeyDown: (e) => {
			(e.key === "Enter" || e.key === " ") && (e.preventDefault(), m());
		},
		className: t("flex min-w-0 flex-col gap-3 rounded-lg border bg-surface p-3 text-left transition-colors", r ? "border-primary ring-2 ring-primary/20" : "border-border hover:bg-surface-hover", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"),
		children: [
			/* @__PURE__ */ Y("div", {
				className: "flex min-w-0 items-start gap-2",
				children: [
					/* @__PURE__ */ J(_, {
						name: e.locked ? "Restricted work item" : s,
						...!e.locked && e.avatarUrl ? { src: e.avatarUrl } : {},
						size: 32
					}),
					/* @__PURE__ */ Y("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ J("div", {
							className: "mb-1 text-[11px] font-medium uppercase tracking-wide text-text-tertiary",
							children: rt[e.kind]
						}), /* @__PURE__ */ J("h3", {
							className: "break-words line-clamp-2 text-sm font-semibold text-text-primary",
							"data-testid": "work-node-title",
							children: s
						})]
					}),
					r && /* @__PURE__ */ J("span", {
						className: "sr-only",
						children: "Selected"
					})
				]
			}),
			e.kind === "conversation" && e.status === "completed" ? /* @__PURE__ */ J("span", {
				role: "status",
				className: "text-xs font-medium text-text-secondary",
				children: "Recent activity"
			}) : /* @__PURE__ */ J(nt, {
				status: e.status,
				sharingFresh: i
			}),
			!e.locked && e.description && /* @__PURE__ */ J("p", {
				className: "break-words line-clamp-3 text-xs text-text-secondary",
				children: e.description
			}),
			/* @__PURE__ */ Y("dl", {
				className: "grid min-w-0 gap-1 text-[11px] text-text-tertiary",
				children: [
					f && /* @__PURE__ */ Y("div", { children: [/* @__PURE__ */ J("dt", {
						className: "inline font-medium",
						children: e.kind === "conversation" ? "First activity: " : "Started: "
					}), /* @__PURE__ */ J("dd", {
						className: "inline",
						children: f
					})] }),
					/* @__PURE__ */ Y("div", { children: [/* @__PURE__ */ J("dt", {
						className: "inline font-medium",
						children: e.kind === "conversation" ? "Last activity: " : "Updated: "
					}), /* @__PURE__ */ J("dd", {
						className: "inline",
						children: d ?? "Unknown"
					})] }),
					p && /* @__PURE__ */ Y("div", { children: [/* @__PURE__ */ J("dt", {
						className: "inline font-medium",
						children: "Ended: "
					}), /* @__PURE__ */ J("dd", {
						className: "inline",
						children: p
					})] })
				]
			}),
			l && c && /* @__PURE__ */ J(n, {
				size: "sm",
				variant: "secondary",
				disabled: !l || !o,
				"data-capability": c,
				"aria-label": `${u} ${rt[e.kind].toLowerCase()}`,
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
var lt = {
	"works-on": "Works on",
	"runs-in": "Runs in",
	"operates-on": "Operates on",
	produced: "Produced",
	edited: "Edited",
	attended: "Attended",
	discussed: "Discussed",
	"derived-from": "Derived from"
};
function ut({ edge: e, selected: n = !1, reducedMotion: r = !1, fromLabel: i, toLabel: a, onSelect: o }) {
	let s = lt[e.relation], c = e.disclosure === "existence", l = c ? "Shared connection" : e.label?.trim() || s;
	return /* @__PURE__ */ Y("button", {
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
			/* @__PURE__ */ J("span", {
				"aria-hidden": "true",
				className: t("h-px min-w-4 flex-1 bg-border", n ? "bg-primary" : "group-hover:bg-primary/50")
			}),
			/* @__PURE__ */ Y("span", {
				className: "min-w-0 flex-1",
				children: [/* @__PURE__ */ J("span", {
					className: "block truncate text-xs font-medium text-text-primary",
					children: l
				}), /* @__PURE__ */ Y("span", {
					className: "block truncate text-[11px] text-text-tertiary",
					children: [
						i,
						" → ",
						a
					]
				})]
			}),
			/* @__PURE__ */ J(nt, { status: e.status }),
			/* @__PURE__ */ J("span", {
				"aria-hidden": "true",
				className: t("h-px min-w-4 flex-1 bg-border", n ? "bg-primary" : "group-hover:bg-primary/50")
			}),
			n && /* @__PURE__ */ J("span", {
				className: "sr-only",
				children: "Selected"
			})
		]
	});
}
//#endregion
//#region src/components/graph/work/WorkEntityList.tsx
function dt(e, t, n) {
	return e?.kind === t && e.id === n;
}
function ft(e) {
	return e.locked ? "Restricted work item" : e.title.trim() || "Untitled work item";
}
function pt(e, t) {
	let n = t.get(e.fromId), r = t.get(e.toId), i = n ? ft(n) : "Unavailable item", a = r ? ft(r) : "Unavailable item";
	return e.label?.trim() || `${i} ${e.relation} ${a}`;
}
var mt = (e) => t("w-full rounded-md border px-3 py-2 text-left text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50", e ? "border-primary bg-primary/10 ring-1 ring-primary" : "border-border hover:bg-surface-hover");
function ht({ nodes: e, edges: t, selection: n, onSelectionChange: r, heading: i = "Accessible work graph", groups: a, footer: o, statusLabelOf: s }) {
	let c = new Map(e.map((e) => [e.id, e])), l = G(null), u = n ? `${n.kind}:${n.id}` : null;
	H(() => {
		u && l.current?.scrollIntoView?.({ block: "nearest" });
	}, [u]);
	let d = (e) => {
		let t = dt(n, "node", e.id);
		return /* @__PURE__ */ J("li", { children: /* @__PURE__ */ Y("button", {
			ref: t ? l : void 0,
			type: "button",
			"aria-label": `Work item: ${ft(e)}`,
			"aria-pressed": t,
			"aria-current": t ? "true" : void 0,
			"data-selected": t || void 0,
			onClick: () => r({
				kind: "node",
				id: e.id
			}),
			className: mt(t),
			children: [/* @__PURE__ */ J("span", {
				className: "block break-words font-medium text-text-primary",
				children: ft(e)
			}), /* @__PURE__ */ J("span", {
				className: "text-xs text-text-tertiary",
				children: e.kind === "conversation" ? "Chat · Recent activity" : `${e.kind} · ${s?.(e) ?? e.status}`
			})]
		}) }, e.id);
	}, f = a?.map((e) => ({
		...e,
		items: e.nodeIds.map((e) => c.get(e)).filter((e) => !!e)
	})).filter((e) => e.items.length > 0), p = f ? f.length === 0 && t.length === 0 : e.length === 0 && t.length === 0;
	return /* @__PURE__ */ Y("section", {
		"aria-labelledby": "work-entity-list-heading",
		className: "min-w-0 space-y-3",
		children: [
			/* @__PURE__ */ J("h3", {
				id: "work-entity-list-heading",
				className: "text-sm font-semibold text-text-primary",
				children: i
			}),
			p ? /* @__PURE__ */ J("p", {
				className: "text-sm text-text-secondary",
				children: "No shared work is available."
			}) : /* @__PURE__ */ Y("div", {
				className: "grid gap-3 md:grid-cols-2",
				children: [/* @__PURE__ */ Y("div", { children: [/* @__PURE__ */ J("h4", {
					className: "mb-1 text-xs font-medium uppercase tracking-wide text-text-tertiary",
					children: "Items"
				}), f ? f.map((e) => /* @__PURE__ */ Y("section", {
					"aria-label": e.title,
					className: "mb-2",
					"data-testid": "work-entity-list-group",
					children: [/* @__PURE__ */ Y("h5", {
						className: "mb-1 truncate text-xs font-semibold text-text-secondary",
						children: [e.title, e.subtitle && /* @__PURE__ */ Y("span", {
							className: "font-normal text-text-tertiary",
							children: [" · ", e.subtitle]
						})]
					}), /* @__PURE__ */ J("ul", {
						className: "space-y-1",
						children: e.items.map(d)
					})]
				}, e.id)) : /* @__PURE__ */ J("ul", {
					className: "space-y-1",
					children: e.map(d)
				})] }), /* @__PURE__ */ Y("div", { children: [/* @__PURE__ */ J("h4", {
					className: "mb-1 text-xs font-medium uppercase tracking-wide text-text-tertiary",
					children: "Relationships"
				}), /* @__PURE__ */ J("ul", {
					className: "space-y-1",
					children: t.map((e) => {
						let t = dt(n, "edge", e.id), i = pt(e, c);
						return /* @__PURE__ */ J("li", { children: /* @__PURE__ */ Y("button", {
							ref: t ? l : void 0,
							type: "button",
							"aria-label": `Relationship: ${i}`,
							"aria-pressed": t,
							"aria-current": t ? "true" : void 0,
							"data-selected": t || void 0,
							onClick: () => r({
								kind: "edge",
								id: e.id
							}),
							className: mt(t),
							children: [/* @__PURE__ */ J("span", {
								className: "block break-words font-medium text-text-primary",
								children: i
							}), /* @__PURE__ */ Y("span", {
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
			}),
			o
		]
	});
}
//#endregion
//#region src/components/graph/work/WorkInspector.tsx
var gt = {
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
}, _t = /* @__PURE__ */ new Set([
	"view-document",
	"edit-document",
	"join-conversation",
	"join-meeting",
	"observe-terminal",
	"control-terminal",
	"view-transcript",
	"view-run"
]);
function vt(e, t, n) {
	if (n) return n.kind === "node" ? e.find((e) => e.id === n.id) : t.find((e) => e.id === n.id);
}
function yt(e) {
	return "kind" in e ? e.locked ? "Restricted work item" : e.title : e.label?.trim() || `${e.relation} relationship`;
}
function bt({ nodes: e, edges: t, selection: r, onSelectionChange: i, onOpen: a, onReference: o, onRequestCollaboration: s }) {
	let c = vt(e, t, r);
	if (H(() => {
		r && !c && i(null);
	}, [
		c,
		i,
		r
	]), !r || !c) return /* @__PURE__ */ J("aside", {
		"aria-label": "Work details",
		className: "rounded-lg border border-border bg-surface p-4",
		children: /* @__PURE__ */ J("p", {
			className: "text-sm text-text-secondary",
			children: "Select a work item or relationship to inspect it."
		})
	});
	let l = r, u = c.capabilities.find((e) => _t.has(e));
	return /* @__PURE__ */ Y("aside", {
		"aria-label": "Work details",
		className: "space-y-4 rounded-lg border border-border bg-surface p-4",
		children: [
			/* @__PURE__ */ Y("div", {
				className: "min-w-0",
				children: [
					/* @__PURE__ */ J("p", {
						className: "text-xs font-medium uppercase tracking-wide text-text-tertiary",
						children: "kind" in c ? c.kind : "Relationship"
					}),
					/* @__PURE__ */ J("h3", {
						className: "break-words text-base font-semibold text-text-primary",
						children: yt(c)
					}),
					/* @__PURE__ */ J("p", {
						className: "text-sm text-text-secondary",
						children: c.status
					}),
					"description" in c && !c.locked && c.description ? /* @__PURE__ */ J("p", {
						className: "mt-2 break-words text-sm text-text-secondary",
						children: c.description
					}) : null
				]
			}),
			/* @__PURE__ */ Y("div", {
				className: "flex flex-wrap gap-2",
				children: [u && a ? /* @__PURE__ */ J(n, {
					size: "sm",
					variant: "secondary",
					onClick: () => a(l),
					children: "Open"
				}) : null, o ? /* @__PURE__ */ J(n, {
					size: "sm",
					variant: "secondary",
					onClick: () => o(l),
					children: "Reference"
				}) : null]
			}),
			c.capabilities.length > 0 && s ? /* @__PURE__ */ Y("div", { children: [/* @__PURE__ */ J("h4", {
				className: "mb-2 text-xs font-medium uppercase tracking-wide text-text-tertiary",
				children: "Request collaboration"
			}), /* @__PURE__ */ J("div", {
				className: "flex flex-wrap gap-2",
				children: c.capabilities.map((e) => /* @__PURE__ */ J(n, {
					size: "sm",
					variant: "secondary",
					onClick: () => s(l, e),
					children: gt[e]
				}, e))
			})] }) : null
		]
	});
}
//#endregion
//#region src/components/graph/work/WorkSharingControls.tsx
var xt = [
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
function St(e) {
	return e.locked ? "Restricted work item" : e.title.trim() || "Untitled work item";
}
function Ct(e) {
	return e.label?.trim() || `${e.relation} relationship`;
}
function wt(e, t, n, r) {
	let i = e[t];
	return {
		...e,
		[t]: r ? i.includes(n) ? i : [...i, n] : i.filter((e) => e !== n)
	};
}
function Tt(e) {
	return e.audience.kind === "organization" ? ["Everyone in your organization"] : e.audience.kind === "people" ? e.audience.personIds : e.audience.conversationIds;
}
var Et = 8;
function Dt({ legend: e, empty: t, saving: n, idPrefix: r, items: i, selected: a, onToggle: o }) {
	let [s, c] = K(""), l = s.trim().toLowerCase(), u = l ? i.filter((e) => `${e.label} ${e.meta}`.toLowerCase().includes(l)) : i, f = i.filter((e) => a.includes(e.id)).length;
	return /* @__PURE__ */ Y("fieldset", {
		disabled: n,
		className: "space-y-2",
		"data-testid": `work-sharing-${e.toLowerCase().replace(/\s+/g, "-")}`,
		children: [/* @__PURE__ */ Y("legend", {
			className: "text-sm font-semibold text-text-primary",
			children: [e, i.length > 0 && /* @__PURE__ */ Y("span", {
				className: "ml-2 text-xs font-normal text-text-tertiary",
				children: [
					f,
					" of ",
					i.length,
					" selected"
				]
			})]
		}), i.length === 0 ? /* @__PURE__ */ J("p", {
			className: "text-sm text-text-secondary",
			children: t
		}) : /* @__PURE__ */ Y(q, { children: [i.length > Et && /* @__PURE__ */ J(d, {
			type: "search",
			value: s,
			placeholder: `Filter ${e.toLowerCase()}`,
			"aria-label": `Filter ${e.toLowerCase()}`,
			onChange: (e) => c(e.target.value)
		}), /* @__PURE__ */ Y("div", {
			className: "max-h-72 space-y-2 overflow-y-auto pr-1",
			"data-testid": "work-sharing-checklist",
			children: [u.length === 0 && /* @__PURE__ */ J("p", {
				className: "text-sm text-text-secondary",
				children: "Nothing matches."
			}), u.map((e) => {
				let t = `${r}-${e.id}`;
				return /* @__PURE__ */ Y("label", {
					htmlFor: t,
					className: "flex items-start gap-2 rounded-md border border-border px-3 py-2 text-sm text-text-primary",
					children: [/* @__PURE__ */ J(A, {
						id: t,
						checked: a.includes(e.id),
						disabled: n,
						onChange: (t) => o(e.id, t)
					}), /* @__PURE__ */ Y("span", {
						className: "min-w-0 break-words",
						children: [/* @__PURE__ */ J("span", {
							className: "block font-medium",
							children: e.label
						}), /* @__PURE__ */ J("span", {
							className: "text-xs text-text-tertiary",
							children: e.meta
						})]
					})]
				}, e.id);
			})]
		})] })]
	});
}
function Ot({ state: e, value: t, availableNodes: r, availableEdges: i, saving: a = !1, error: o, conflict: s = !1, onChange: c, onStart: l, onPause: u, onResume: f, onStop: p }) {
	let m = U(), h = Tt(t), g = e === "off" ? "Off" : e.charAt(0).toUpperCase() + e.slice(1);
	return /* @__PURE__ */ Y("section", {
		"aria-labelledby": "work-sharing-heading",
		className: "space-y-5 rounded-lg border border-border bg-surface p-4",
		children: [
			/* @__PURE__ */ Y("div", {
				className: "flex flex-wrap items-start justify-between gap-3",
				children: [/* @__PURE__ */ Y("div", { children: [/* @__PURE__ */ J("h3", {
					id: "work-sharing-heading",
					className: "text-base font-semibold text-text-primary",
					children: "Share work activity"
				}), /* @__PURE__ */ J("p", {
					className: "mt-1 text-sm text-text-secondary",
					children: "Sharing is voluntary. Only the audience, work, relationships, and detail selected here are shared."
				})] }), /* @__PURE__ */ J("span", {
					className: "rounded-full border border-border bg-surface-inset px-2.5 py-1 text-xs font-medium text-text-secondary",
					children: g
				})]
			}),
			o ? /* @__PURE__ */ J(y, {
				tone: "error",
				children: o
			}) : null,
			s ? /* @__PURE__ */ J(y, {
				tone: "warning",
				children: "Sharing changed elsewhere. Review the current settings before trying again."
			}) : null,
			a ? /* @__PURE__ */ J("p", {
				role: "status",
				"aria-live": "polite",
				className: "text-sm text-text-secondary",
				children: "Saving sharing settings…"
			}) : null,
			/* @__PURE__ */ Y("fieldset", {
				disabled: a,
				className: "space-y-2",
				children: [
					/* @__PURE__ */ J("legend", {
						className: "text-sm font-semibold text-text-primary",
						children: "Audience"
					}),
					/* @__PURE__ */ J("p", {
						className: "text-xs text-text-tertiary",
						children: t.audience.kind === "people" ? "Selected people" : t.audience.kind === "conversation" ? "Selected conversations" : "Organization"
					}),
					h.length > 0 ? /* @__PURE__ */ J("ul", {
						"aria-label": "Current sharing audience",
						className: "flex flex-wrap gap-2",
						children: h.map((e) => /* @__PURE__ */ J("li", {
							className: "max-w-full break-all rounded-md border border-border bg-surface-inset px-2 py-1 text-xs text-text-secondary",
							children: e
						}, e))
					}) : /* @__PURE__ */ J("p", {
						className: "text-sm text-text-secondary",
						children: "No audience selected."
					}),
					/* @__PURE__ */ J("p", {
						className: "text-xs text-text-tertiary",
						children: "Audience choices are provided by the host application."
					})
				]
			}),
			/* @__PURE__ */ J(Dt, {
				legend: "Work items",
				empty: "No work items are available.",
				saving: a,
				idPrefix: `${m}-node`,
				items: r.map((e) => ({
					id: e.id,
					label: St(e),
					meta: e.kind
				})),
				selected: t.selectedNodeIds,
				onToggle: (e, n) => c(wt(t, "selectedNodeIds", e, n))
			}),
			/* @__PURE__ */ J(Dt, {
				legend: "Relationships",
				empty: "No relationships are available.",
				saving: a,
				idPrefix: `${m}-edge`,
				items: i.map((e) => ({
					id: e.id,
					label: Ct(e),
					meta: e.relation
				})),
				selected: t.selectedEdgeIds,
				onToggle: (e, n) => c(wt(t, "selectedEdgeIds", e, n))
			}),
			/* @__PURE__ */ Y("div", {
				className: "grid gap-4 sm:grid-cols-2",
				children: [/* @__PURE__ */ Y("label", {
					className: "space-y-1 text-sm font-medium text-text-primary",
					children: [/* @__PURE__ */ J("span", { children: "Detail shared" }), /* @__PURE__ */ J("select", {
						value: t.disclosure,
						disabled: a,
						onChange: (e) => c({
							...t,
							disclosure: e.target.value
						}),
						className: "h-9 w-full rounded-md border border-border-emphasis bg-surface-panel px-2.5 text-sm text-text-primary outline-none focus:border-info focus:ring-1 focus:ring-info/40 disabled:cursor-not-allowed disabled:opacity-50",
						children: xt.map((e) => /* @__PURE__ */ J("option", {
							value: e.value,
							children: e.label
						}, e.value))
					})]
				}), /* @__PURE__ */ Y("label", {
					className: "space-y-1 text-sm font-medium text-text-primary",
					children: [/* @__PURE__ */ J("span", { children: "Live sharing expires" }), /* @__PURE__ */ J(d, {
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
			/* @__PURE__ */ Y("fieldset", {
				disabled: a,
				className: "space-y-3 rounded-md border border-border p-3",
				children: [
					/* @__PURE__ */ J("legend", {
						className: "px-1 text-sm font-semibold text-text-primary",
						children: "Earlier work"
					}),
					/* @__PURE__ */ Y("label", {
						htmlFor: `${m}-history`,
						className: "flex items-start gap-2 text-sm text-text-primary",
						children: [/* @__PURE__ */ J(A, {
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
						}), /* @__PURE__ */ Y("span", { children: [/* @__PURE__ */ J("span", {
							className: "block font-medium",
							children: "Share selected history"
						}), /* @__PURE__ */ J("span", {
							className: "block text-xs text-text-tertiary",
							children: "Historical work is never included unless you select this option."
						})] })]
					}),
					t.history ? /* @__PURE__ */ Y("div", {
						className: "grid gap-3 sm:grid-cols-3",
						children: [
							/* @__PURE__ */ Y("label", {
								className: "space-y-1 text-sm font-medium text-text-primary",
								children: [/* @__PURE__ */ J("span", { children: "First day" }), /* @__PURE__ */ J(d, {
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
							/* @__PURE__ */ Y("label", {
								className: "space-y-1 text-sm font-medium text-text-primary",
								children: [/* @__PURE__ */ J("span", { children: "Last day" }), /* @__PURE__ */ J(d, {
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
							/* @__PURE__ */ Y("label", {
								className: "space-y-1 text-sm font-medium text-text-primary",
								children: [/* @__PURE__ */ J("span", { children: "History access expires" }), /* @__PURE__ */ J(d, {
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
			/* @__PURE__ */ Y("div", {
				className: "flex flex-wrap gap-2",
				children: [
					e === "off" || e === "stopped" || e === "expired" ? /* @__PURE__ */ J(n, {
						disabled: a,
						onClick: l,
						children: e === "off" ? "Start sharing" : "Start sharing again"
					}) : null,
					e === "active" ? /* @__PURE__ */ J(n, {
						variant: "secondary",
						disabled: a,
						onClick: u,
						children: "Pause sharing"
					}) : null,
					e === "paused" ? /* @__PURE__ */ J(n, {
						disabled: a,
						onClick: f,
						children: "Resume sharing"
					}) : null,
					e === "active" || e === "paused" ? /* @__PURE__ */ J(n, {
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
var kt = /* @__PURE__ */ new Set([
	"view-document",
	"edit-document",
	"join-conversation",
	"join-meeting",
	"observe-terminal",
	"control-terminal",
	"view-transcript",
	"view-run"
]);
function At({ target: e, state: t, node: r, edge: i, unavailableLabel: a, onSelect: o, onOpen: s }) {
	let c = e?.kind === "node" ? r : e?.kind === "edge" ? i : void 0;
	if (t === "loading") return /* @__PURE__ */ J("article", {
		"aria-label": "Shared work reference",
		"aria-busy": "true",
		className: "rounded-lg border border-border bg-surface p-3",
		children: /* @__PURE__ */ J("p", {
			role: "status",
			className: "text-sm text-text-secondary",
			children: "Loading shared work…"
		})
	});
	if (t === "unavailable" || !e || !c) return /* @__PURE__ */ J("article", {
		"aria-label": "Shared work reference",
		className: "rounded-lg border border-border bg-surface p-3",
		children: /* @__PURE__ */ J("p", {
			className: "text-sm text-text-secondary",
			children: a ?? "This work item is unavailable."
		})
	});
	let l = e.kind === "node" ? r?.locked ? "Restricted work item" : r?.title : i?.label?.trim() || `${i?.relation ?? "Shared"} relationship`, u = (e.kind === "node" ? r?.capabilities ?? [] : i?.capabilities ?? []).some((e) => kt.has(e)), d = e;
	return /* @__PURE__ */ Y("article", {
		"aria-label": "Shared work reference",
		className: "space-y-3 rounded-lg border border-border bg-surface p-3",
		children: [/* @__PURE__ */ Y("button", {
			type: "button",
			"aria-label": `Select reference: ${l}`,
			disabled: !o,
			onClick: () => o?.(d),
			className: "block w-full rounded text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:cursor-default",
			children: [
				/* @__PURE__ */ J("span", {
					className: "block text-xs font-medium uppercase tracking-wide text-text-tertiary",
					children: e.kind === "node" ? r?.kind : "Relationship"
				}),
				/* @__PURE__ */ J("span", {
					className: "block break-words text-sm font-semibold text-text-primary",
					children: l
				}),
				/* @__PURE__ */ J("span", {
					className: "block text-xs text-text-secondary",
					children: c.status
				})
			]
		}), u && s ? /* @__PURE__ */ J(n, {
			size: "sm",
			variant: "secondary",
			onClick: () => s(d),
			children: "Open shared work"
		}) : null]
	});
}
//#endregion
//#region src/components/graph/work/WorkActivityTimeline.tsx
function jt(e, t) {
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
function Mt(e, t, n, r, i) {
	let a = t.updatedAt || t.startedAt;
	if (!a) return null;
	let o = new Date(a);
	if (Number.isNaN(o.getTime())) return null;
	let s = jt(o, i);
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
function Nt({ day: e, timezone: t, nodes: n, edges: r, selection: i, onSelectionChange: a }) {
	let [o, s] = K(() => /* @__PURE__ */ new Date());
	H(() => {
		let e = window.setInterval(() => s(/* @__PURE__ */ new Date()), 6e4);
		return () => window.clearInterval(e);
	}, []);
	let c = W(() => {
		let i = new Map(n.map((e) => [e.id, e.locked ? "Restricted work item" : e.title.trim() || "Untitled work item"]));
		return [...n.map((n) => Mt("node", n, i.get(n.id), e, t)), ...r.map((n) => Mt("edge", n, `${i.get(n.fromId) ?? "Work item"} → ${i.get(n.toId) ?? "Work item"}`, e, t))].filter((e) => e !== null).sort((e, t) => e.minute - t.minute || e.key.localeCompare(t.key));
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
	let u = jt(o, t), d = u.day === e;
	return /* @__PURE__ */ Y("div", {
		className: "rounded-lg border border-border bg-surface px-4 py-3",
		"aria-label": `Activity on ${e}`,
		"data-testid": "work-activity-timeline",
		children: [
			/* @__PURE__ */ Y("div", {
				className: "mb-3 flex items-baseline justify-between gap-3",
				children: [/* @__PURE__ */ Y("div", { children: [/* @__PURE__ */ J("h2", {
					className: "text-sm font-semibold text-text-primary",
					children: "Activity over the day"
				}), /* @__PURE__ */ J("p", {
					className: "text-xs text-text-secondary",
					children: "Select a time to inspect visible work and its branches."
				})] }), /* @__PURE__ */ J("span", {
					className: "shrink-0 text-xs text-text-secondary",
					children: t
				})]
			}),
			/* @__PURE__ */ Y("div", {
				className: "relative h-10 border-b border-border",
				children: [
					[
						0,
						6,
						12,
						18,
						24
					].map((e) => /* @__PURE__ */ J("span", {
						"aria-hidden": "true",
						className: "absolute bottom-0 h-2 border-l border-border",
						style: { left: `${e / 24 * 100}%` }
					}, e)),
					Array.from(l, ([e, t]) => {
						let n = t.some((e) => i?.kind === e.selection.kind && i.id === e.selection.id), r = t.some((e) => e.live);
						return /* @__PURE__ */ J("button", {
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
					d ? /* @__PURE__ */ J("span", {
						"aria-hidden": "true",
						className: "pointer-events-none absolute bottom-0 top-0 border-l-2 border-primary",
						style: { left: `${u.minute / 1440 * 100}%` }
					}) : null
				]
			}),
			/* @__PURE__ */ Y("div", {
				className: "mt-1 flex justify-between text-[11px] text-text-secondary",
				"aria-hidden": "true",
				children: [
					/* @__PURE__ */ J("span", { children: "12 AM" }),
					/* @__PURE__ */ J("span", { children: "6 AM" }),
					/* @__PURE__ */ J("span", { children: "12 PM" }),
					/* @__PURE__ */ J("span", { children: "6 PM" }),
					/* @__PURE__ */ J("span", { children: "12 AM" })
				]
			}),
			/* @__PURE__ */ Y("p", {
				className: "mt-2 text-xs text-text-secondary",
				children: [c.length === 0 ? "No visible activity recorded for this day." : `${c.length} visible work ${c.length === 1 ? "item" : "items"} across ${l.size} ${l.size === 1 ? "hour" : "hours"}.`, d ? ` Now ${u.time}.` : ""]
			}),
			c.length > 0 ? /* @__PURE__ */ Y("details", {
				className: "mt-2 text-xs",
				children: [/* @__PURE__ */ J("summary", {
					className: "cursor-pointer text-primary",
					children: "Browse activity"
				}), /* @__PURE__ */ J("ol", {
					className: "mt-2 max-h-36 space-y-1 overflow-y-auto",
					children: c.map((e) => /* @__PURE__ */ J("li", { children: /* @__PURE__ */ Y("button", {
						type: "button",
						className: `w-full rounded px-2 py-1 text-left hover:bg-surface-hover ${i?.kind === e.selection.kind && i.id === e.selection.id ? "font-semibold text-primary" : "text-text-primary"}`,
						onClick: () => a(e.selection),
						"aria-current": i?.kind === e.selection.kind && i.id === e.selection.id ? "true" : void 0,
						children: [
							/* @__PURE__ */ J("time", { children: e.time }),
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
var Pt = .4, Ft = .1, It = Pt, Lt = .8, Rt = 2, zt = 0, Bt = (e, t, n) => JSON.stringify([
	e,
	t,
	n
]);
function Vt(e) {
	if (!e) return 0;
	let t = Date.parse(e);
	return Number.isNaN(t) ? 0 : t;
}
var Ht = /* @__PURE__ */ new Set(["document"]);
function Ut(e, t, n = {}) {
	let r = n.max ?? 2;
	if (!Number.isFinite(r) || r <= 0 || e.length <= r) return [...e];
	let i = new Map(t.map((e) => [e.id, Math.max(Vt(e.updatedAt), Vt(e.startedAt))])), a = e.map((e, t) => ({
		index: t,
		recency: Math.max(0, ...e.nodeIds.map((e) => i.get(e) ?? 0))
	})).sort((e, t) => t.recency - e.recency || e.index - t.index), o = a.slice(0, r), s = new Map(t.map((e) => [e.id, e.kind])), c = (t) => e[t].nodeIds.some((e) => Ht.has(s.get(e)));
	if (n.keepLatestMade !== !1 && !o.some((e) => c(e.index))) {
		let e = a.find((e) => c(e.index));
		e && (o[o.length - 1] = e);
	}
	let l = new Set(o.map((e) => e.index)), u = n.keepEffortId ? e.findIndex((e) => e.id === n.keepEffortId) : -1;
	if (u >= 0 && !l.has(u)) {
		let e = [...o].reverse().find((e) => !c(e.index) || r === 1) ?? o[o.length - 1];
		l.delete(e.index), l.add(u);
	}
	return e.filter((e, t) => l.has(t));
}
function Wt(e, t, n, r) {
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
		let j = Math.max(w.length, ...[...k.values()].map((e) => e + 1), 1), M = r.labelledEdgeIds?.some((e) => m.some((t) => t.id === e && k.has(t.from))) ? 132 : 56, ee = T.length ? Math.max(...T.map((e) => x(e).width)) : 0, N = c + (ee ? ee + M : 0), P = (e) => [...w.filter((t) => E.get(t) === e), ...[...k].filter(([, t]) => t === e).map(([e]) => e)], F = [...Array(j).keys()].map((e) => Math.max(0, ...P(e).map((e) => x(e).height))), te = [...Array(j).keys()].map((e) => 32 + Math.max(1, ...P(e).map((e) => m.filter((t) => t.to === e).length)) * 24), I = F.reduce((e, t, n) => e + t + (n ? te[n] : 0), 56 + c), L = T.length === 0 && r.height && I > r.height && j > 2 ? F.reduce((e, t, n) => {
			let r = e.run + t + (n ? te[n] : 0);
			return r < I / 2 ? {
				row: n + 1,
				run: r
			} : e;
		}, {
			row: 0,
			run: 56
		}).row || Math.ceil(j / 2) : j, R = (e) => e < L ? 0 : 1, z = F.reduce((e, t, n) => [...e, n === 0 || R(n) !== R(n - 1) ? 56 : e[n - 1] + F[n - 1] + te[n]], []), B = Math.max(0, ...w.map((e) => x(e).width)), V = (e) => N + R(e) * (B + Math.max(96, M)), H = [];
		for (let t of w) H.push({
			id: Bt(e.id, "node", t),
			entityId: t,
			x: V(E.get(t)),
			y: z[E.get(t)],
			...x(t)
		});
		for (let [t, n] of k) H.push({
			id: Bt(e.id, "node", t),
			entityId: t,
			x: c,
			y: z[n],
			...x(t)
		});
		let U = T.length === 0, W = new Map(H.map((e) => [e.entityId, e])), G = /* @__PURE__ */ new Map();
		p.push({
			id: e.id,
			title: e.title,
			subtitle: e.subtitle,
			x: 0,
			y: 0,
			width: Math.max(...H.map((e) => e.x + e.width)) + c,
			height: Math.max(...H.map((e) => e.y + e.height)) + c,
			collapsedSourceCount: t.length - u.length,
			sourceCount: l.size,
			vertical: U,
			cyclicNodeIds: y,
			nodes: H,
			edges: m.map((t) => {
				let n = G.get(t.to) ?? 0;
				G.set(t.to, n + 1);
				let r = W.get(t.from), i = W.get(t.to), a = r.x !== i.x, o = a ? "out-right" : "out-bottom", s = a ? "in-left" : "in-top";
				return {
					id: Bt(e.id, "edge", t.id),
					entityId: t.id,
					source: Bt(e.id, "node", t.from),
					target: Bt(e.id, "node", t.to),
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
		if (i.length) return Wt(e, t, n, {
			...r,
			foldedForHeight: [...r.foldedForHeight ?? [], ...i.map((e) => e.id)]
		});
	}
	for (let [e, t] of p.entries()) t.x = _.places[e].x, t.y = _.places[e].y;
	return p;
}
//#endregion
//#region src/components/graph/work/WorkActivityNode.tsx
var Gt = {
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
}, Kt = {
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
}, qt = "flex items-center justify-center [&>*]:h-full [&>*]:w-full [&_img]:h-full [&_img]:w-full [&_img]:object-contain [&_svg]:h-full [&_svg]:w-full", Jt = {
	idle: "bg-border-emphasis",
	running: "bg-info",
	waiting: "bg-caution",
	completed: "bg-success",
	error: "bg-danger",
	stopped: "bg-border-emphasis",
	stale: "bg-border-emphasis"
};
function Yt({ node: e, detail: n, selected: r, selectedRevisionId: i, live: a, onSelect: o, onFeedback: s }) {
	let u = e.locked || e.disclosure === "existence" ? void 0 : n, d = i ? u?.artifact?.revisions.find((e) => e.id === i) : u?.artifact?.revisions.at(-1), f = u?.artifact?.pending, p = e.locked ? "Restricted work item" : e.title, m = a && u?.fresh === !0, h = u?.emphasis === "earlier" || u?.emphasis === "input", g = f?.status === "generating", v = !!u?.artifact?.revisions.length && e.status !== "running" && !g, y = Kt[e.kind], b = e.status === "error", x = u?.emphasis === "current" || !h && e.status === "running" && m, S = e.status === "running" && a && !m, C = tt(e.status, u?.pause), w = S ? "Running · updates delayed" : C ?? e.status, T = u?.lines?.length ? S ? [...u.lines, "Updates delayed"] : u.lines : [w], E = f?.status === "generating" ? `${f.label} generating` : f?.status === "failed" ? `${f.label} generation failed` : e.status === "running" && !m ? "running, updates delayed" : C ? `waiting, ${C}` : e.status, D = {
		kind: "node",
		id: e.id,
		...d ? { revisionId: d.id } : {}
	}, O = () => o(D);
	return /* @__PURE__ */ Y("div", {
		className: "pointer-events-auto relative w-[200px]",
		"data-emphasis": u?.emphasis ?? "current",
		"data-work-node": e.id,
		onClick: O,
		children: [
			/* @__PURE__ */ Y("article", {
				role: "button",
				tabIndex: 0,
				"aria-label": `${p}, ${E}`,
				"aria-pressed": r,
				"data-work-card": e.id,
				onKeyDown: (e) => {
					(e.key === "Enter" || e.key === " ") && (e.preventDefault(), O());
				},
				className: t("relative overflow-hidden rounded-lg border bg-surface text-left shadow-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary", b ? "border-danger" : x ? "border-info" : v ? "border-success" : "border-border", b || x || v ? "border-2" : "", v && "bg-success-bg/40", h && "opacity-80", r && "ring-2 ring-primary/30"),
				children: [
					/* @__PURE__ */ J("span", {
						"aria-hidden": "true",
						className: t("absolute inset-y-0 left-0 w-[3px]", b ? "bg-danger" : v ? "bg-success" : x ? "bg-info" : y.bar)
					}),
					/* @__PURE__ */ Y("header", {
						className: "flex items-center gap-2 border-b border-border bg-surface-panel py-1.5 pl-3.5 pr-2.5",
						children: [
							/* @__PURE__ */ J("span", {
								"aria-hidden": "true",
								className: t("flex h-5 w-5 shrink-0 items-center justify-center rounded text-[11px] leading-none", y.chip),
								children: Gt[e.kind]
							}),
							/* @__PURE__ */ J("span", {
								className: t("min-w-0 flex-1 truncate text-[12px] font-semibold", h ? "text-text-secondary" : "text-text-primary"),
								children: p
							}),
							/* @__PURE__ */ J("span", {
								"aria-hidden": "true",
								className: t("h-2 w-2 shrink-0 rounded-full", h ? "bg-border-emphasis" : Jt[e.status])
							})
						]
					}),
					/* @__PURE__ */ Y("div", {
						className: t("space-y-1.5 py-2 pl-3.5 pr-2.5 text-[11px] leading-snug", h ? "text-text-tertiary" : "text-text-secondary"),
						children: [
							T.map((n, r) => /* @__PURE__ */ Y("div", {
								className: "flex items-start justify-between gap-1.5",
								children: [
									/* @__PURE__ */ J("span", {
										className: "min-w-0",
										children: n
									}),
									r === 0 && u?.badge && /* @__PURE__ */ J("span", {
										className: t("shrink-0 rounded px-1.5 py-px text-[10px] font-semibold", e.status === "running" ? "border border-info-border text-info-fg" : "bg-info-bg text-info-fg"),
										children: u.badge
									}),
									r === 0 && !u?.badge && C && n !== C && /* @__PURE__ */ J("span", {
										"data-testid": "work-card-pause",
										className: "shrink-0 rounded bg-warning-bg px-1.5 py-px text-[10px] font-semibold text-warning-fg",
										children: C
									})
								]
							}, `${r}-${n}`)),
							!!u?.participants?.length && /* @__PURE__ */ Y("div", {
								className: "flex items-center gap-1.5",
								children: [/* @__PURE__ */ J("span", {
									className: "flex -space-x-1.5",
									children: u.participants.slice(0, 3).map((e) => /* @__PURE__ */ J(_, {
										name: e.label,
										src: e.avatarUrl,
										size: 18,
										className: "ring-1 ring-surface"
									}, e.id))
								}), /* @__PURE__ */ Y("span", {
									className: "min-w-0 truncate text-[10px]",
									children: [u.participants.map((e) => e.label).slice(0, 2).join(", "), u.participants.length > 2 ? ` +${u.participants.length - 2}` : ""]
								})]
							}),
							u?.excerpt && /* @__PURE__ */ J("p", {
								className: t("text-[11px] italic", h ? "text-text-secondary" : "text-text-primary"),
								children: `“${u.excerpt}”`
							}),
							u?.attentionLabel && /* @__PURE__ */ J("p", {
								className: "font-medium text-text-primary",
								children: u.attentionLabel
							}),
							d?.preview && /* @__PURE__ */ J("div", {
								className: t("aspect-video w-full overflow-hidden rounded-lg border border-border bg-surface", "flex items-center justify-center [&>*]:h-full [&>*]:w-full [&_img]:h-full [&_img]:w-full [&_img]:object-contain [&_svg]:h-full [&_svg]:w-full"),
								"aria-label": `${p} ${d.label} preview`,
								children: d.preview
							}),
							!!u?.artifact?.revisions.length && /* @__PURE__ */ Y("div", {
								className: "flex flex-wrap items-center gap-1 text-[10px]",
								"aria-label": `${p} revisions`,
								children: [u.artifact.revisions.map((e) => /* @__PURE__ */ J("span", {
									className: t("rounded px-1.5 py-0.5", e.id === d?.id ? "bg-info-bg font-medium text-info-fg" : "text-text-tertiary"),
									children: e.label
								}, e.id)), f?.status === "generating" && /* @__PURE__ */ Y("span", {
									className: "rounded px-1.5 py-0.5 text-info-fg",
									children: [f.label, " generating"]
								})]
							}),
							f?.status === "failed" && !u?.lines?.length && /* @__PURE__ */ Y("p", {
								className: "text-danger-fg",
								children: [f.label, " generation failed"]
							})
						]
					}),
					u?.footer && /* @__PURE__ */ Y("div", {
						className: "flex items-center justify-between gap-2 border-t border-border py-1.5 pl-3.5 pr-2.5 text-[10px] text-text-tertiary",
						children: [/* @__PURE__ */ J("span", {
							className: "truncate",
							children: u.footer.label
						}), u.footer.note && /* @__PURE__ */ J("span", {
							className: "shrink-0",
							children: u.footer.note
						})]
					})
				]
			}),
			!!u?.tools?.length && /* @__PURE__ */ Y("div", {
				className: "flex flex-wrap items-center gap-1.5 pl-1 pt-1 text-[10px] text-text-tertiary",
				children: [/* @__PURE__ */ J("span", { children: "Tools" }), u.tools.map((e) => /* @__PURE__ */ J("span", {
					className: "rounded bg-surface-panel px-1.5 py-0.5 font-semibold text-text-secondary",
					children: e
				}, e))]
			}),
			!!u?.feedbackCount && s && (!i || d) && /* @__PURE__ */ Y(c, {
				size: "sm",
				className: "nodrag nopan absolute -right-2 -top-3 h-7 w-7 rounded-full border border-border bg-surface shadow-sm",
				"aria-label": `${u.feedbackCount} comments on ${p}`,
				onClick: (e) => {
					e.stopPropagation(), s(D);
				},
				children: [/* @__PURE__ */ J(l, { size: 14 }), /* @__PURE__ */ J("span", {
					className: "absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-0.5 text-[10px] text-white",
					children: u.feedbackCount
				})]
			})
		]
	});
}
//#endregion
//#region src/components/graph/work/WorkOmittedGroup.tsx
var Xt = {
	run: "Run",
	agent: "Agent",
	document: "Document",
	change: "Revision",
	conversation: "Chat",
	meeting: "Meeting",
	transcript: "Transcript",
	terminal: "Workspace",
	project: "Project",
	task: "Work item"
};
function Zt(e, t) {
	let n = new Date(e);
	if (Number.isNaN(n.getTime())) return "";
	try {
		return new Intl.DateTimeFormat(void 0, {
			hour: "numeric",
			minute: "2-digit",
			...t ? { timeZone: t } : {}
		}).format(n);
	} catch {
		return new Intl.DateTimeFormat(void 0, {
			hour: "numeric",
			minute: "2-digit"
		}).format(n);
	}
}
function Qt({ omitted: e, timezone: r, className: i }) {
	let { count: a, expanded: o, items: s, loading: c, error: l, hasMore: u, onExpand: d, onCollapse: f, onLoadMore: p } = e, m = a.toLocaleString();
	if (!o) return /* @__PURE__ */ Y("div", {
		className: t("flex items-center gap-2 rounded-xl border border-dashed border-border bg-surface/90 px-3 py-1.5 shadow-sm", i),
		"data-testid": "work-omitted-group",
		"data-expanded": "false",
		children: [/* @__PURE__ */ Y("span", {
			className: "text-[11px] font-semibold text-text-secondary",
			children: [m, " more earlier"]
		}), /* @__PURE__ */ J(n, {
			size: "sm",
			variant: "link",
			className: "text-[11px]",
			"aria-expanded": !1,
			"aria-label": `Show ${m} earlier items held back from the graph`,
			onClick: d,
			children: "Show"
		})]
	});
	let h = Math.max(0, a - s.length);
	return /* @__PURE__ */ Y("section", {
		"aria-label": `${m} earlier items`,
		className: t("flex max-h-full w-[min(22rem,calc(100vw-2rem))] min-h-0 flex-col rounded-xl border border-dashed border-border bg-surface shadow-md", i),
		"data-testid": "work-omitted-group",
		"data-expanded": "true",
		children: [
			/* @__PURE__ */ Y("header", {
				className: "flex items-center justify-between gap-2 border-b border-border-subtle px-3 py-1.5",
				children: [/* @__PURE__ */ Y("span", {
					className: "min-w-0 truncate text-[11px] font-semibold text-text-secondary",
					children: [m, " more earlier · newest first"]
				}), /* @__PURE__ */ J(n, {
					size: "sm",
					variant: "link",
					className: "text-[11px]",
					"aria-expanded": !0,
					onClick: f,
					children: "Collapse"
				})]
			}),
			/* @__PURE__ */ Y("ul", {
				className: "min-h-0 flex-1 divide-y divide-border-subtle overflow-auto",
				"data-testid": "work-omitted-items",
				children: [s.map((e) => /* @__PURE__ */ Y("li", {
					className: "flex items-center gap-2 px-3 py-1.5",
					"data-work-omitted-item": e.id,
					children: [/* @__PURE__ */ Y("span", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ J("span", {
							className: "block truncate text-xs font-medium text-text-primary",
							title: e.title,
							children: e.locked ? "Restricted work item" : e.title.trim() || "Untitled work item"
						}), /* @__PURE__ */ Y("span", {
							className: "block text-[10px] text-text-tertiary",
							children: [
								Xt[e.kind] ?? e.kind,
								" · ",
								Zt(e.updatedAt, r)
							]
						})]
					}), /* @__PURE__ */ J(nt, {
						status: e.status,
						className: "shrink-0 text-[10px]"
					})]
				}, e.id)), s.length === 0 && !c && !l && /* @__PURE__ */ J("li", {
					className: "px-3 py-2 text-xs text-text-tertiary",
					children: "Nothing to show yet."
				})]
			}),
			l && /* @__PURE__ */ J(y, {
				tone: "error",
				className: "mx-2 my-1 text-[11px]",
				children: l
			}),
			/* @__PURE__ */ Y("footer", {
				className: "flex items-center justify-between gap-2 border-t border-border-subtle px-3 py-1.5 text-[10px] text-text-tertiary",
				children: [/* @__PURE__ */ Y("span", { children: [
					s.length.toLocaleString(),
					" of ",
					m,
					" shown"
				] }), (u || c) && /* @__PURE__ */ J(n, {
					size: "sm",
					variant: "secondary",
					className: "text-[11px]",
					disabled: c,
					onClick: p,
					children: c ? "Loading…" : `Load ${Math.min(h, e.pageSize ?? 25).toLocaleString()} more`
				})]
			})
		]
	});
}
//#endregion
//#region src/components/graph/work/WorkActivityCanvas.tsx
var $t = 24, en = 56, tn = "!h-1.5 !w-1.5 !min-h-0 !min-w-0 !border-0 !bg-border-emphasis";
function nn({ data: e, selected: t }) {
	return /* @__PURE__ */ Y(q, { children: [
		/* @__PURE__ */ J(X, {
			type: "target",
			id: "in-left",
			position: Q.Left,
			isConnectable: !1,
			className: tn
		}),
		/* @__PURE__ */ J(X, {
			type: "target",
			id: "in-top",
			position: Q.Top,
			isConnectable: !1,
			className: tn
		}),
		/* @__PURE__ */ J(Yt, {
			node: e.entity,
			detail: e.detail,
			live: e.live,
			selected: !!t,
			selectedRevisionId: e.revisionId,
			onSelect: e.onSelect,
			onFeedback: e.onFeedback
		}),
		/* @__PURE__ */ J(X, {
			type: "source",
			id: "out-right",
			position: Q.Right,
			isConnectable: !1,
			className: tn
		}),
		/* @__PURE__ */ J(X, {
			type: "source",
			id: "out-bottom",
			position: Q.Bottom,
			isConnectable: !1,
			className: tn
		})
	] });
}
function rn({ data: e }) {
	return /* @__PURE__ */ J(v, {
		tone: "surface",
		titleText: e.title,
		title: /* @__PURE__ */ Y("span", {
			className: "flex min-w-0 max-w-full items-center gap-1.5 font-sans text-[11px] font-semibold text-text-secondary",
			children: [e.live && /* @__PURE__ */ J("span", {
				"aria-hidden": "true",
				className: "inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-primary/50"
			}), /* @__PURE__ */ J("span", {
				className: "truncate",
				"data-work-effort-title": "",
				children: e.title
			})]
		}),
		className: "pointer-events-none h-full w-full rounded-xl border-dashed border-border-subtle bg-surface/60",
		"data-testid": "work-effort",
		children: /* @__PURE__ */ Y("div", {
			className: "flex min-w-0 items-center gap-2 px-4 pt-1 text-[10px] leading-4 text-text-tertiary",
			children: [/* @__PURE__ */ Y("span", {
				className: "min-w-0 flex-1 truncate",
				title: e.subtitle,
				children: [e.subtitle, e.cycle && /* @__PURE__ */ J("span", {
					role: "status",
					className: "ml-2 text-warning-fg",
					children: "Relationship order unavailable"
				})]
			}), /* @__PURE__ */ Y("span", {
				className: "pointer-events-auto flex shrink-0 items-center gap-2",
				children: [e.sources > 0 && /* @__PURE__ */ J(n, {
					size: "sm",
					variant: "link",
					className: "nodrag nopan text-[10px]",
					"aria-label": `${e.expanded ? "Hide" : "Show"} ${e.sources} sources for ${e.title}`,
					onClick: e.onSources,
					children: e.expanded ? "Hide sources" : `+ ${e.sources} sources`
				}), /* @__PURE__ */ J(n, {
					size: "sm",
					variant: "link",
					className: "nodrag nopan text-[10px]",
					"aria-label": e.focused ? "Show all activities" : `Focus on ${e.title}`,
					onClick: e.onFocus,
					children: e.focused ? "All activities" : "Focus"
				})]
			})]
		})
	});
}
function an(e) {
	let n = e.data;
	return n ? /* @__PURE__ */ Y(q, { children: [/* @__PURE__ */ J(I, {
		...e,
		data: { state: n.failed ? "traversed-failure" : n.active ? "active" : "default" }
	}), /* @__PURE__ */ J(ae, { children: /* @__PURE__ */ J("button", {
		type: "button",
		className: t("nodrag nopan pointer-events-auto absolute z-10 flex items-center justify-center rounded-full text-[10px] font-medium leading-none focus-visible:outline-2 focus-visible:outline-primary", n.pill ? t("h-5 max-w-28 border bg-surface px-2 shadow-sm", n.failed ? "border-danger text-danger-fg" : n.active ? "border-info text-info-fg" : "border-border-emphasis text-text-secondary") : "h-3 w-3 border border-transparent bg-transparent text-transparent focus-visible:border-border focus-visible:bg-surface"),
		style: { transform: `translate(-50%, -50%) translate(${n.labelX}px, ${n.labelY}px)` },
		onClick: n.onSelect,
		"aria-label": `${n.label}${n.failed ? ", failed" : n.active ? ", active" : ""}`,
		title: n.label,
		"data-work-edge-label": n.canonicalId,
		children: n.pill ? /* @__PURE__ */ J("span", {
			className: "truncate",
			children: n.pill
		}) : /* @__PURE__ */ J("span", {
			className: "sr-only",
			children: n.label
		})
	}) })] }) : null;
}
var on = {
	activity: nn,
	effort: rn
}, sn = { activity: an }, cn = {
	ArrowRight: [1, 0],
	ArrowLeft: [-1, 0],
	ArrowDown: [0, 1],
	ArrowUp: [0, -1]
};
function ln(e, t, [n, r]) {
	let i = e.left + e.width / 2, a = e.top + e.height / 2, o = null;
	for (let { element: e, rect: s } of t) {
		let t = s.left + s.width / 2 - i, c = s.top + s.height / 2 - a, l = t * n + c * r;
		if (l <= 4) continue;
		let u = l + Math.abs(n ? c : t) * 2;
		(!o || u < o.score) && (o = {
			element: e,
			score: u
		});
	}
	return o?.element ?? null;
}
function un(e) {
	let { activity: t, nodes: r, edges: i, selection: a, viewport: o, onViewportChange: s, onSelectionChange: l, background: u = "ripple-grid", onViewAsList: d, maxEfforts: f = 2 } = e, p = G(null), [m, h] = K({
		width: 640,
		height: 480
	}), [g, _] = K(/* @__PURE__ */ new Map()), v = G(/* @__PURE__ */ new Map()), b = G(null), S = G(void 0), C = G(t.view.focusedEffortId), { view: D, onViewChange: O } = t, k = pe().right;
	H(() => {
		let e = p.current;
		if (!e || typeof ResizeObserver > "u") return;
		let t = new ResizeObserver(([e]) => {
			let { width: t, height: n } = e.contentRect;
			t > 0 && n > 0 && h((e) => e.width === t && e.height === n ? e : {
				width: t,
				height: n
			});
		});
		return t.observe(e), () => t.disconnect();
	}, []);
	let A = [...Object.keys(t.edgeLabels ?? {}), ...t.failedEdgeIds ?? []].sort().join("\0"), j = a?.kind === "node" ? a.id : void 0, M = D.focusedEffortId ?? (j ? t.efforts.find((e) => e.nodeIds.includes(j))?.id ?? null : null), ee = W(() => Ut(t.efforts, r, {
		max: f,
		keepEffortId: M
	}), [
		t.efforts,
		r,
		f,
		M
	]), N = W(() => Wt(r, i, ee, {
		width: m.width,
		height: m.height,
		full: t.mode === "full",
		focusedEffortId: D.focusedEffortId,
		expandedSourceEfforts: D.expandedSourceEfforts,
		reversedEdgeIds: t.reversedEdgeIds,
		labelledEdgeIds: A.split("\0").filter(Boolean),
		measurements: g
	}), [
		r,
		i,
		ee,
		t.mode,
		t.reversedEdgeIds,
		A,
		D.focusedEffortId,
		D.expandedSourceEfforts,
		m,
		g
	]), P = W(() => {
		let e = Math.min(0, ...N.map((e) => e.x)), t = Math.min(0, ...N.map((e) => e.y));
		return {
			left: e,
			top: t,
			width: Math.max(1, ...N.map((e) => e.x + e.width)) - e,
			height: Math.max(1, ...N.map((e) => e.y + e.height)) - t
		};
	}, [N]), F = B((e, t) => e <= m.width - 48 ? (m.width - e) / 2 - t : 24 - t, [m]), te = B(() => {
		let { left: e, top: t, width: n, height: r } = P, i = Math.max(1, m.height - $t - en), a = Math.max(Ft, Math.min(1.2, (m.width - 48) / n, i / r));
		return {
			x: F(n * a, e * a),
			y: $t + Math.max(0, (i - r * a) / 2) - t * a,
			zoom: a
		};
	}, [
		P,
		m,
		F
	]), I = f !== 0, L = B(() => {
		let e = te();
		if (!I) return e;
		let { left: t, top: n, width: r } = P, i = Math.max(e.zoom, Math.min(Lt, (m.width - 48) / r));
		return i <= e.zoom ? e : {
			x: F(r * i, t * i),
			y: $t - n * i,
			zoom: i
		};
	}, [
		te,
		I,
		P,
		m,
		F
	]), R = W(() => {
		if (!j) return null;
		for (let e of N) {
			let t = e.nodes.find((e) => e.entityId === j);
			if (t) return {
				x: e.x + t.x,
				y: e.y + t.y,
				width: t.width,
				height: t.height
			};
		}
		return null;
	}, [N, j]), z = Math.max(1, m.width - k), V = B((e) => {
		if (!R) return e;
		let t = Math.max(e.zoom, Math.min(Lt, (z - 48) / R.width));
		return {
			x: z / 2 - (R.x + R.width / 2) * t,
			y: m.height / 2 - (R.y + R.height / 2) * t,
			zoom: t
		};
	}, [
		R,
		m,
		z
	]), U = JSON.stringify([
		m,
		t.mode,
		D.focusedEffortId,
		D.expandedSourceEfforts,
		N.map((e) => [
			e.id,
			e.nodes.map((e) => e.id),
			e.edges.map((e) => e.id)
		]),
		N.every((e) => e.nodes.every((e) => g.has(e.entityId)))
	]);
	H(() => {
		if (b.current === U) return;
		let e = b.current === null;
		b.current = U;
		let t = C.current && !D.focusedEffortId && D.overviewViewport;
		if (C.current = D.focusedEffortId, t) {
			s(t);
			return;
		}
		e && D.canvasInitialized || (s(V(L())), S.current = j ? `${j}\u0000${k}` : void 0, D.canvasInitialized || O({
			...D,
			canvasInitialized: !0
		}));
	}, [
		U,
		L,
		V,
		D,
		O,
		s,
		j,
		k
	]), H(() => {
		if (!j) {
			S.current = void 0;
			return;
		}
		let e = `${j}\u0000${k}`;
		if (S.current === e || !R || b.current === null) return;
		S.current = e;
		let t = R.x * o.zoom + o.x, n = R.y * o.zoom + o.y;
		t >= 0 && n >= 0 && t + R.width * o.zoom <= z && n + R.height * o.zoom <= m.height || s(V(o));
	}, [
		j,
		R,
		o,
		m,
		z,
		k,
		V,
		s
	]);
	let q = (e) => O({
		...D,
		focusedEffortId: D.focusedEffortId === e ? null : e,
		overviewViewport: D.focusedEffortId ? D.overviewViewport : o
	}), re = new Map(r.map((e) => [e.id, e])), ie = new Map(i.map((e) => [e.id, e])), ae = t.window.following, X = new Set(ae ? t.activeEdgeIds : []), Q = new Set(t.failedEdgeIds ?? []), se = [], ce = [];
	for (let e of N) {
		let n = JSON.stringify(["effort", e.id]), r = D.expandedSourceEfforts.includes(e.id);
		se.push({
			id: n,
			type: "effort",
			position: {
				x: e.x,
				y: e.y
			},
			measured: v.current.get(n),
			style: {
				width: e.width,
				height: e.height
			},
			selectable: !1,
			focusable: !1,
			data: {
				title: e.title,
				subtitle: e.subtitle,
				live: ae && e.nodes.some((e) => re.get(e.entityId)?.status === "running"),
				sources: !D.focusedEffortId && (e.collapsedSourceCount > 0 || r) ? e.sourceCount : 0,
				expanded: r,
				focused: D.focusedEffortId === e.id,
				cycle: e.cyclicNodeIds.length > 0,
				onFocus: () => q(e.id),
				onSources: () => O({
					...D,
					expandedSourceEfforts: r ? D.expandedSourceEfforts.filter((t) => t !== e.id) : [...D.expandedSourceEfforts, e.id]
				})
			}
		});
		for (let r of e.nodes) se.push({
			id: r.id,
			type: "activity",
			parentId: n,
			extent: "parent",
			position: {
				x: r.x,
				y: r.y
			},
			measured: v.current.get(r.id),
			selected: a?.kind === "node" && a.id === r.entityId,
			focusable: !1,
			data: {
				entity: re.get(r.entityId),
				detail: t.details?.[r.entityId],
				revisionId: a?.kind === "node" && a.id === r.entityId ? a.revisionId : void 0,
				live: ae,
				onSelect: l,
				onFeedback: t.onFeedback
			}
		});
		for (let n of e.edges) {
			let r = ie.get(n.entityId), i = e.x + n.labelX, o = e.y + n.labelY, s = X.has(r.id) && r.status === "running" && !r.endedAt, c = Q.has(r.id), u = r.label || r.relation.replaceAll("-", " "), d = t.edgeLabels?.[r.id] ?? (c ? "failed" : void 0);
			ce.push({
				id: n.id,
				type: "activity",
				source: n.source,
				target: n.target,
				sourceHandle: n.sourceHandle,
				targetHandle: n.targetHandle,
				selected: a?.kind === "edge" && a.id === r.id,
				focusable: !1,
				markerEnd: {
					type: Z.ArrowClosed,
					color: c ? "var(--color-danger)" : "var(--color-border-emphasis)"
				},
				data: {
					canonicalId: r.id,
					label: u,
					pill: d,
					active: s,
					failed: c,
					labelX: i,
					labelY: o,
					onSelect: () => l({
						kind: "edge",
						id: r.id
					})
				}
			});
		}
	}
	let le = new Map(se.filter((e) => e.type === "activity").map((e) => [e.id, e.data.entity.id])), ue = Math.min(Pt, o.zoom), de = (e) => s({
		...o,
		zoom: Math.max(ue, Math.min(2.5, o.zoom * e))
	}), fe = o.zoom < It, me = (e) => {
		let t = cn[e.key], n = t && e.target instanceof HTMLElement ? e.target.closest("[data-work-card]") : null, r = p.current;
		if (!t || !n || !r || e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
		e.preventDefault(), e.stopPropagation();
		let i = [...r.querySelectorAll("[data-work-card]")].filter((e) => e !== n).map((e) => ({
			element: e,
			rect: e.getBoundingClientRect()
		})), a = ln(n.getBoundingClientRect(), i, t);
		if (!a) return;
		a.focus({ preventScroll: !0 });
		let c = r.getBoundingClientRect(), l = a.getBoundingClientRect(), u = c.right - k;
		l.left >= c.left && l.top >= c.top && l.right <= u && l.bottom <= c.bottom || s({
			...o,
			x: o.x + (c.left + (u - c.left) / 2) - (l.left + l.width / 2),
			y: o.y + (c.top + c.height / 2) - (l.top + l.height / 2)
		});
	}, $ = u === "ripple-grid", he = x(p, "auto", $);
	return /* @__PURE__ */ Y("div", {
		ref: p,
		className: "relative isolate min-h-40 min-w-0 flex-1 overflow-hidden",
		"data-testid": "work-activity-canvas",
		onKeyDown: me,
		"data-background": u,
		"data-backdrop-ink": $ ? he === "night" ? "dark" : "light" : void 0,
		children: [
			$ && /* @__PURE__ */ J(T, {
				...he === "night" ? w : E,
				className: "absolute inset-0 -z-10",
				"data-testid": "work-activity-ripple"
			}),
			/* @__PURE__ */ J(oe, {
				nodes: se,
				edges: ce,
				nodeTypes: on,
				edgeTypes: sn,
				viewport: o,
				onViewportChange: s,
				onPaneClick: () => l(null),
				onEdgeClick: (e, t) => t.data?.onSelect(),
				minZoom: ue,
				maxZoom: 2.5,
				nodesDraggable: !1,
				nodesConnectable: !1,
				elementsSelectable: !1,
				deleteKeyCode: null,
				proOptions: { hideAttribution: !0 },
				onNodesChange: (e) => {
					let t = e.filter((e) => e.type === "dimensions");
					if (t.length) {
						for (let e of t) e.dimensions && v.current.set(e.id, e.dimensions);
						_((e) => {
							let n = new Map(e), r = !1;
							for (let i of t) {
								let t = le.get(i.id);
								if (!t || !i.dimensions) continue;
								let a = e.get(t), o = {
									width: Math.max(a?.width ?? 0, i.dimensions.width),
									height: Math.max(a?.height ?? 0, i.dimensions.height)
								};
								(a?.width !== o.width || a?.height !== o.height) && (n.set(t, o), r = !0);
							}
							return r ? n : e;
						});
					}
				},
				children: !$ && /* @__PURE__ */ J(ne, {
					gap: 20,
					size: 1,
					color: "var(--color-border)"
				})
			}),
			(fe || t.omitted) && /* @__PURE__ */ Y("div", {
				className: "pointer-events-none absolute left-3 top-3 z-10 flex max-h-[calc(100%-4.5rem)] min-h-0 max-w-[calc(100%-1.5rem)] flex-col items-start gap-2",
				"data-testid": "work-activity-top-left",
				children: [fe && /* @__PURE__ */ Y(y, {
					tone: "info",
					className: "pointer-events-auto max-w-[min(26rem,100%)] text-[11px]",
					"data-testid": "work-activity-zoom-hint",
					children: [/* @__PURE__ */ Y("span", { children: ["The whole graph is in view, but too small to read.", d && " "] }), d && /* @__PURE__ */ J(n, {
						size: "sm",
						variant: "link",
						onClick: d,
						"data-testid": "work-activity-zoom-hint-list",
						children: "View as accessible list"
					})]
				}), t.omitted && /* @__PURE__ */ J(Qt, {
					omitted: t.omitted,
					timezone: e.timezone,
					className: "pointer-events-auto nodrag nopan"
				})]
			}),
			/* @__PURE__ */ Y("div", {
				className: "absolute z-10 bottom-3 left-3 flex items-center gap-1 rounded-md border border-border bg-surface p-1",
				"data-testid": "work-activity-controls",
				children: [
					/* @__PURE__ */ J(c, {
						size: "sm",
						"aria-label": "Zoom in",
						onClick: () => de(1.2),
						children: "+"
					}),
					/* @__PURE__ */ J(c, {
						size: "sm",
						"aria-label": "Zoom out",
						onClick: () => de(1 / 1.2),
						children: "−"
					}),
					/* @__PURE__ */ J(n, {
						size: "sm",
						variant: "secondary",
						onClick: () => s(te()),
						children: "Fit graph"
					})
				]
			})
		]
	});
}
function dn({ live: e }) {
	return /* @__PURE__ */ J("ul", {
		"aria-label": "Activity emphasis legend",
		className: "hidden items-center gap-2 text-[10px] text-text-tertiary @xl:flex",
		"data-testid": "work-activity-legend",
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
				e ? "Active" : "Active then",
				"border-info bg-info"
			]
		].map(([e, n, r]) => /* @__PURE__ */ Y("li", {
			className: "flex items-center gap-1",
			children: [/* @__PURE__ */ J("span", {
				"aria-hidden": "true",
				className: t("inline-block h-2 w-2 rounded-sm border", r)
			}), n]
		}, e))
	});
}
//#endregion
//#region src/components/graph/work/WorkActivityHeader.tsx
var fn = [{
	id: "activity",
	label: "Activity"
}, {
	id: "lab",
	label: "Computer Lab"
}], pn = [
	1,
	2,
	3,
	5
], mn = "all";
function hn({ title: e, subtitle: n, expanded: r = !1, onExpand: i, onPopOut: a, onClose: o, actions: s, view: l = "activity", onViewChange: d, viewNote: f, effortCount: p = 0, maxEfforts: m, onMaxEffortsChange: g, className: _, "data-testid": v = "work-activity-header" }) {
	let y = !!g && p > 1, b = m ?? 0, x = Number.isFinite(b) && b > 0 && b < p, S = [...[.../* @__PURE__ */ new Set([...pn, ...x ? [b] : []])].filter((e) => e < p).sort((e, t) => e - t).map((e) => ({
		value: String(e),
		label: `Show ${e} of ${p} activities`
	})), {
		value: mn,
		label: `All ${p} activities`
	}], C = /* @__PURE__ */ Y("header", {
		"data-testid": v,
		className: t("flex shrink-0 items-center justify-between gap-2 border-b border-border bg-surface px-3 py-1.5", _),
		children: [/* @__PURE__ */ Y("span", {
			className: "flex min-w-0 flex-col",
			children: [/* @__PURE__ */ J("span", {
				className: "truncate text-[12px] font-semibold text-text-secondary",
				"data-testid": `${v}-title`,
				children: e
			}), n && /* @__PURE__ */ J("span", {
				className: "truncate text-[11px] text-text-tertiary",
				"data-testid": `${v}-subtitle`,
				children: n
			})]
		}), /* @__PURE__ */ Y("span", {
			className: "flex shrink-0 items-center gap-1",
			children: [
				s,
				i && /* @__PURE__ */ J(j, {
					content: r ? "Show chat" : "Expand activity",
					placement: "bottom",
					children: /* @__PURE__ */ J(c, {
						size: "md",
						"aria-label": r ? "Show chat" : "Expand activity",
						"aria-pressed": r,
						onClick: i,
						"data-testid": `${v}-expand`,
						children: /* @__PURE__ */ J("svg", {
							width: "16",
							height: "16",
							viewBox: "0 0 16 16",
							fill: "none",
							stroke: "currentColor",
							strokeWidth: "1.5",
							strokeLinecap: "round",
							strokeLinejoin: "round",
							"aria-hidden": "true",
							children: r ? /* @__PURE__ */ Y(q, { children: [/* @__PURE__ */ J("rect", {
								x: "2",
								y: "2.5",
								width: "12",
								height: "11",
								rx: "1.5"
							}), /* @__PURE__ */ J("path", { d: "M6 2.5v11" })] }) : /* @__PURE__ */ J("path", { d: "M6 2H2v4M10 2h4v4M14 10v4h-4M6 14H2v-4" })
						})
					})
				}),
				a && /* @__PURE__ */ J(j, {
					content: "Open activity in its own page",
					placement: "bottom",
					children: /* @__PURE__ */ J(c, {
						size: "md",
						"aria-label": "Open activity in its own page",
						onClick: a,
						"data-testid": `${v}-pop-out`,
						children: /* @__PURE__ */ J("svg", {
							width: "16",
							height: "16",
							viewBox: "0 0 16 16",
							fill: "none",
							stroke: "currentColor",
							strokeWidth: "1.5",
							strokeLinecap: "round",
							strokeLinejoin: "round",
							"aria-hidden": "true",
							children: /* @__PURE__ */ J("path", { d: "M9 2h5v5M14 2 7 9M6 3H3a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1v-3" })
						})
					})
				}),
				o && /* @__PURE__ */ J(j, {
					content: "Close activity",
					placement: "bottom",
					children: /* @__PURE__ */ J(c, {
						size: "md",
						"aria-label": "Close activity",
						onClick: o,
						"data-testid": `${v}-close`,
						children: /* @__PURE__ */ J(u, {})
					})
				})
			]
		})]
	});
	return !d && !y ? C : /* @__PURE__ */ Y("div", {
		className: "flex shrink-0 flex-col",
		children: [C, /* @__PURE__ */ Y("div", {
			"data-testid": `${v}-views`,
			className: "@container flex shrink-0 items-center gap-2.5 border-b border-border bg-surface px-3 py-1.5",
			children: [
				d && /* @__PURE__ */ J(h, {
					items: fn,
					value: l,
					onValueChange: (e) => d(e),
					variant: "segmented",
					size: "sm",
					"aria-label": "Side panel content",
					idPrefix: `${v}-view`
				}),
				y && /* @__PURE__ */ J(k, {
					size: "sm",
					variant: "pill",
					className: "max-w-52 truncate normal-case",
					"aria-label": "Activities shown",
					"data-testid": `${v}-max-efforts`,
					options: S,
					value: x ? String(b) : mn,
					onChange: (e) => g(e.target.value === mn ? 0 : Number(e.target.value))
				}),
				f && /* @__PURE__ */ J("span", {
					className: "hidden min-w-0 truncate text-[11px] text-text-tertiary @lg:inline",
					"data-testid": `${v}-view-note`,
					children: f
				})
			]
		})]
	});
}
//#endregion
//#region src/components/graph/work/WorkArtifactInspector.tsx
function gn(e, t) {
	let n = t.revisionId ? e.revisions.find((e) => e.id === t.revisionId) : e.revisions.at(-1), r = n?.slides ?? [];
	return {
		revision: n,
		slides: r,
		slide: r.find((e) => e.id === t.anchorId) ?? r.find((e) => e.id === n?.anchorId) ?? r[0]
	};
}
function _n({ node: e, artifact: r, selection: i, onSelectionChange: a, onOpen: o, onReference: s, quiet: l = !1 }) {
	let u = U(), { revision: d, slides: f, slide: p } = gn(r, i), m = p ? f.indexOf(p) : -1, _ = {
		...i,
		revisionId: d?.id,
		anchorId: p?.id ?? d?.anchorId
	}, v = e.capabilities.includes("view-document") || e.capabilities.includes("edit-document"), y = r.pending, b = (t) => a({
		kind: "node",
		id: e.id,
		revisionId: d?.id,
		anchorId: t
	}), x = [...r.revisions.map((e) => ({
		id: e.id,
		label: e.label
	})), ...y?.status === "generating" ? [{
		id: y.id,
		label: `${y.label} · Generating`,
		disabled: !0
	}] : []];
	return /* @__PURE__ */ Y("div", {
		className: "space-y-3",
		children: [
			r.revisions.length > 0 && /* @__PURE__ */ Y("section", {
				className: "space-y-1.5",
				children: [/* @__PURE__ */ J("h3", {
					className: "text-[10px] font-semibold uppercase tracking-wide text-text-tertiary",
					children: "Revisions"
				}), /* @__PURE__ */ J(h, {
					idPrefix: u,
					"aria-label": "Available revisions",
					variant: "segmented",
					size: "sm",
					className: "w-full [&>button]:flex-1",
					items: x,
					value: d?.id ?? "",
					onValueChange: (t) => {
						t !== y?.id && a({
							kind: "node",
							id: e.id,
							revisionId: t
						});
					}
				})]
			}),
			y?.status === "generating" && !l && /* @__PURE__ */ Y("p", {
				role: "status",
				className: "text-xs text-text-secondary",
				children: [
					y.label,
					" is generating. You can review available revisions.",
					y.message ? ` ${y.message}` : ""
				]
			}),
			y?.status === "failed" && !l && /* @__PURE__ */ Y("p", {
				role: "status",
				className: "text-xs text-danger-fg",
				children: [
					y.label,
					" could not be generated.",
					y.message ? ` ${y.message}` : ""
				]
			}),
			d ? /* @__PURE__ */ Y(g, {
				idPrefix: u,
				id: d.id,
				when: d.id,
				className: "space-y-2",
				children: [
					/* @__PURE__ */ J("div", {
						"aria-label": `${d.label} preview`,
						className: t("aspect-video overflow-hidden rounded-lg border border-border bg-surface", qt),
						children: p?.preview ?? d.preview ?? /* @__PURE__ */ J("span", {
							className: "flex h-full items-center justify-center text-sm text-text-secondary",
							children: "Preview unavailable"
						})
					}),
					f.length > 0 && p && /* @__PURE__ */ Y("div", {
						className: "flex items-center gap-1",
						children: [
							/* @__PURE__ */ J(c, {
								size: "sm",
								"aria-label": "Previous slide",
								disabled: m <= 0,
								onClick: () => b(f[m - 1].id),
								children: "‹"
							}),
							/* @__PURE__ */ Y("span", {
								className: "flex-1 text-center text-xs text-text-secondary",
								children: [
									"Slide ",
									p.index,
									" of ",
									f.length
								]
							}),
							/* @__PURE__ */ J(c, {
								size: "sm",
								"aria-label": "Next slide",
								disabled: m >= f.length - 1,
								onClick: () => b(f[m + 1].id),
								children: "›"
							}),
							/* @__PURE__ */ J(k, {
								size: "sm",
								"aria-label": "Slide",
								className: "w-32",
								value: p.id,
								options: f.map((e) => ({
									value: e.id,
									label: `${e.index}. ${e.title}`
								})),
								onChange: (e) => b(e.target.value)
							})
						]
					}),
					r.onOpenPreview && /* @__PURE__ */ J(n, {
						size: "sm",
						variant: "secondary",
						fullWidth: !0,
						onClick: () => r.onOpenPreview(d.id, p?.id ?? d.anchorId),
						children: "Open larger preview"
					}),
					!p && /* @__PURE__ */ J("p", {
						className: "text-xs text-text-secondary",
						children: d.anchorLabel ?? d.label
					})
				]
			}) : /* @__PURE__ */ J("p", {
				className: "text-sm text-text-secondary",
				children: i.revisionId ? "The selected revision is unavailable." : "No revision is available yet."
			}),
			/* @__PURE__ */ Y("div", {
				className: "flex flex-wrap gap-2",
				children: [v && o && d && /* @__PURE__ */ J(n, {
					size: "sm",
					variant: "secondary",
					onClick: () => o(_),
					children: "Open presentation"
				}), s && d && /* @__PURE__ */ J(n, {
					size: "sm",
					variant: "secondary",
					onClick: () => s(_),
					children: "Reference in chat"
				})]
			})
		]
	});
}
//#endregion
//#region src/components/graph/work/WorkComputePane.tsx
var vn = z(() => import("./ChatLabTerminal-Di2AZJhg.js")), yn = {
	planning: {
		label: "PLANNING",
		pill: "info",
		box: "running",
		busy: !0,
		tone: "info"
	},
	starting: {
		label: "QUEUED",
		pill: "pending",
		box: "running",
		busy: !0,
		tone: "info"
	},
	running: {
		label: "RUNNING",
		pill: "info",
		box: "running",
		busy: !0,
		tone: "info"
	},
	waiting: {
		label: "NEEDS YOU",
		pill: "warning",
		box: "waiting",
		busy: !1,
		tone: "info"
	},
	done: {
		label: "DONE",
		pill: "success",
		box: "idle",
		busy: !1,
		tone: "success"
	},
	failed: {
		label: "FAILED",
		pill: "error",
		box: "error",
		busy: !1,
		tone: "error"
	},
	stopped: {
		label: "STOPPED",
		pill: "neutral",
		box: "stopped",
		busy: !1,
		tone: "info"
	},
	budget: {
		label: "BUDGET",
		pill: "warning",
		box: "stopped",
		busy: !1,
		tone: "info"
	}
}, bn = {
	pending: {
		dot: "bg-border-emphasis",
		text: "text-text-tertiary",
		word: "Queued"
	},
	running: {
		dot: "bg-info animate-pulse motion-reduce:animate-none",
		text: "text-text-primary",
		word: "Running"
	},
	done: {
		dot: "bg-success",
		text: "text-text-secondary",
		word: "Completed"
	},
	failed: {
		dot: "bg-danger",
		text: "text-danger-fg",
		word: "Failed"
	},
	skipped: {
		dot: "bg-border-emphasis",
		text: "text-text-tertiary line-through",
		word: "Skipped"
	}
}, xn = {
	prompt: {
		glyph: "$",
		text: "text-code-green"
	},
	step: {
		glyph: "▶",
		text: "text-code-blue"
	},
	done: {
		glyph: "✓",
		text: "text-code-green"
	},
	pending: {
		glyph: "○",
		text: "text-code-muted"
	},
	text: {
		glyph: "·",
		text: "text-code-subtle"
	}
}, Sn = {
	command: {
		glyph: "$",
		text: "text-code-mauve"
	},
	text: {
		glyph: "·",
		text: "text-code-text"
	},
	tool: {
		glyph: "⚙",
		text: "text-code-blue"
	},
	result: {
		glyph: "✓",
		text: "text-code-green"
	},
	error: {
		glyph: "✗",
		text: "text-code-red"
	},
	status: {
		glyph: "›",
		text: "text-code-subtle"
	},
	iteration: {
		glyph: "⟳",
		text: "text-code-yellow"
	}
};
function Cn(e) {
	let t = 2166136261;
	for (let n = 0; n < e.length; n += 1) t ^= e.charCodeAt(n), t = Math.imul(t, 16777619);
	return t >>> 0;
}
function wn(e) {
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? "" : t.toLocaleTimeString([], { hour12: !1 });
}
function Tn(e) {
	if (e == null || !Number.isFinite(e) || e < 0) return "";
	let t = Math.round(e / 1e3);
	if (t < 60) return `${t}s`;
	let n = Math.floor(t / 60);
	return n < 60 ? t % 60 ? `${n}m ${t % 60}s` : `${n}m` : `${Math.floor(n / 60)}h ${String(n % 60).padStart(2, "0")}m`;
}
function En(e) {
	let t = bn[e.status].word, n = Tn(e.elapsedMs);
	return n ? e.status === "running" ? `${t} · ${n} elapsed` : `${t} · ${n}` : t;
}
function Dn(e) {
	let { metrics: t, task: n } = e, r = t.contextBudgetTokens;
	return {
		id: e.label,
		label: e.label,
		sessionId: e.shell?.sessionId ?? "",
		createdAt: n.startedAt ?? "",
		status: yn[e.status].box,
		...e.project ? { project: e.project } : {},
		...e.stopsInMs == null ? {} : { stopsInMs: e.stopsInMs },
		...r ? { contextUsed: Math.min(1, Math.max(0, t.contextTokens / r)) } : {},
		...t.model ? { activeModel: t.model } : {},
		...t.costUsd == null ? {} : {
			spendUsd: t.costUsd,
			lastResult: {
				subtype: "success",
				turns: 0,
				durationMs: n.elapsedMs ?? 0,
				costUsd: t.costUsd
			}
		},
		currentTask: e.workItem ? `${e.workItem.key} · ${n.title}` : n.title
	};
}
function On({ label: e, value: t, title: n }) {
	return /* @__PURE__ */ Y("div", {
		className: "min-w-0 rounded-md border border-border bg-surface-inset px-2 py-1.5",
		children: [/* @__PURE__ */ J("span", {
			className: "block text-[10px] font-semibold uppercase tracking-wide text-text-tertiary",
			children: e
		}), /* @__PURE__ */ J("span", {
			className: "block truncate font-mono text-[12px] text-text-primary",
			title: n,
			children: t
		})]
	});
}
function kn({ label: e, trailing: t, children: n }) {
	return /* @__PURE__ */ Y("section", {
		className: "space-y-1.5 rounded-md border border-border p-2.5",
		children: [/* @__PURE__ */ Y("h4", {
			className: "flex items-baseline gap-2 text-[10px] font-semibold uppercase tracking-wide text-text-tertiary",
			children: [/* @__PURE__ */ J("span", {
				className: "min-w-0 truncate",
				children: e
			}), t && /* @__PURE__ */ J("span", {
				className: "ml-auto shrink-0 normal-case tracking-normal text-text-tertiary",
				children: t
			})]
		}), n]
	});
}
function An({ lines: e, running: n, label: r, environment: i, seed: a, testId: o }) {
	return /* @__PURE__ */ Y("div", {
		"data-testid": o,
		className: "overflow-hidden rounded-md border border-code-border bg-code-bg font-mono text-[11px] leading-relaxed",
		children: [/* @__PURE__ */ Y("div", {
			className: t("flex items-center gap-2 border-b border-code-border px-2 py-1", n ? "bg-transparent" : "bg-code-panel"),
			children: [
				/* @__PURE__ */ J("span", {
					"aria-hidden": "true",
					className: "text-code-green",
					children: "$"
				}),
				/* @__PURE__ */ J("span", {
					className: "min-w-0 truncate text-code-text",
					children: r
				}),
				/* @__PURE__ */ J("span", {
					className: "ml-auto shrink-0 text-code-blue",
					children: i
				})
			]
		}), /* @__PURE__ */ Y(C, {
			active: n,
			particleCount: 90,
			speed: .1,
			alphaParticles: !0,
			particleColors: S,
			fallbackIntensity: "low",
			seed: a,
			className: "space-y-0.5 px-2 py-1.5",
			"data-testid": `${o}-particles`,
			children: [
				e.map((e, n) => {
					let r = xn[e.glyph] ?? xn.text;
					return /* @__PURE__ */ Y("p", {
						className: "flex gap-1.5",
						children: [/* @__PURE__ */ J("span", {
							"aria-hidden": "true",
							className: t("shrink-0", r.text),
							children: r.glyph
						}), /* @__PURE__ */ J("span", {
							className: "min-w-0 whitespace-pre-wrap break-words text-code-subtle",
							children: e.text
						})]
					}, `${n}-${e.text}`);
				}),
				!e.length && /* @__PURE__ */ J("p", {
					className: "text-code-muted",
					children: "No output yet."
				}),
				n && /* @__PURE__ */ J("p", {
					"aria-hidden": "true",
					className: "text-code-green",
					children: /* @__PURE__ */ J("span", {
						className: "inline-block animate-pulse motion-reduce:animate-none",
						children: "▌"
					})
				})
			]
		})]
	});
}
function jn({ compute: e, banner: r, className: i, "data-testid": a = "work-compute-pane" }) {
	let [o, c] = K("activity"), [l, u] = K([]), d = yn[e.status] ?? yn.running, { metrics: f, task: p } = e, m = e.runtime === "agentcore-microvm" ? "AgentCore microVM" : "Local runtime", v = W(() => Dn(e), [e]), y = W(() => Cn(e.shell?.sessionId ?? e.label), [e.shell?.sessionId, e.label]), x = f.contextBudgetTokens, w = x ? `${Math.round(f.contextTokens / x * 100)}% (${P(x)})` : P(f.contextTokens), T = W(() => e.events.map((e) => {
		let n = l.includes(e.id), r = Sn[e.kind] ?? Sn.text;
		return {
			id: e.id,
			timestamp: wn(e.at),
			...e.kind === "error" ? { level: "error" } : {},
			message: /* @__PURE__ */ Y("span", {
				className: "flex flex-wrap items-baseline gap-1.5",
				children: [
					/* @__PURE__ */ J("span", {
						"aria-hidden": "true",
						className: t("shrink-0", r.text),
						children: r.glyph
					}),
					/* @__PURE__ */ J("span", {
						className: t("whitespace-pre-wrap break-words", r.text),
						children: e.text
					}),
					e.mock && /* @__PURE__ */ J(s, {
						size: "xs",
						mono: !0,
						uppercase: !0,
						palette: "code",
						tone: "caution",
						title: "Produced by a mock runtime, not a real box",
						children: "mock"
					}),
					e.detail && /* @__PURE__ */ J("button", {
						type: "button",
						"aria-expanded": n,
						onClick: () => u((t) => t.includes(e.id) ? t.filter((t) => t !== e.id) : [...t, e.id]),
						className: "cursor-pointer border-none bg-transparent p-0 text-[10px] uppercase tracking-wide text-code-muted hover:text-code-text",
						children: n ? "− hide" : "+ detail"
					}),
					e.detail && n && /* @__PURE__ */ J("span", {
						className: "mt-1 block w-full whitespace-pre-wrap break-words rounded border border-code-border bg-code-bg px-2 py-1 text-[11px] text-code-subtle",
						children: e.detail
					})
				]
			})
		};
	}), [e.events, l]), E = r ?? {
		tone: d.tone,
		title: p.title,
		description: [
			e.label,
			m,
			p.startedAt ? `started ${p.startedAt}` : null,
			e.shared ? "Shared with you" : "Yours"
		].filter(Boolean).join(" · ")
	}, k = E.tone === "error" ? {
		card: "border-danger-border bg-danger-bg",
		dot: "bg-danger",
		title: "text-danger-fg"
	} : E.tone === "success" ? {
		card: "border-success-border bg-success-bg",
		dot: "bg-success",
		title: "text-success-fg"
	} : {
		card: "border-info-border bg-info-bg",
		dot: "bg-info",
		title: "text-info-fg"
	}, A = () => {
		c("shell"), e.onOpenShell?.();
	}, j = [
		{
			id: "activity",
			label: "Activity"
		},
		...e.shell ? [{
			id: "shell",
			label: "Shell"
		}] : [],
		{
			id: "workspace",
			label: "Workspace"
		}
	], M = o === "shell" && !e.shell ? "activity" : o;
	return /* @__PURE__ */ Y("div", {
		"data-testid": a,
		"data-status": e.status,
		className: t("space-y-3", i),
		children: [
			/* @__PURE__ */ Y("div", {
				role: "status",
				"data-testid": `${a}-card`,
				"data-tone": E.tone,
				className: t("flex gap-2 rounded-md border p-2.5", k.card),
				children: [/* @__PURE__ */ J("span", {
					"aria-hidden": "true",
					className: t("mt-1.5 h-2 w-2 shrink-0 rounded-full", k.dot, d.busy && "animate-pulse motion-reduce:animate-none")
				}), /* @__PURE__ */ Y("span", {
					className: "min-w-0",
					children: [
						/* @__PURE__ */ J("span", {
							className: t("block text-[13px] font-semibold", k.title),
							children: E.title
						}),
						E.description && /* @__PURE__ */ J("span", {
							className: "block text-xs text-text-secondary",
							children: E.description
						}),
						p.description && /* @__PURE__ */ J("span", {
							className: "mt-1 block text-xs text-text-secondary",
							children: p.description
						})
					]
				})]
			}),
			e.notice && /* @__PURE__ */ J("p", {
				role: "status",
				"data-testid": `${a}-notice`,
				className: "rounded-md border border-warning-border bg-warning-bg px-2 py-1 text-[11px] text-warning-fg",
				children: e.notice
			}),
			/* @__PURE__ */ Y("div", {
				className: "flex items-center gap-2",
				"data-testid": `${a}-owner`,
				children: [
					/* @__PURE__ */ J(_, {
						name: e.owner.name,
						size: 22,
						...e.owner.avatarUrl ? { src: e.owner.avatarUrl } : {}
					}),
					/* @__PURE__ */ Y("span", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ J("span", {
							className: "block truncate text-[13px] text-text-primary",
							children: e.owner.name
						}), /* @__PURE__ */ J("span", {
							className: "block truncate text-[11px] text-text-tertiary",
							children: e.shared ? "Shared with you" : "Yours"
						})]
					}),
					/* @__PURE__ */ J(O, {
						state: d.pill,
						label: d.label,
						size: "sm",
						"data-testid": `${a}-status`
					})
				]
			}),
			/* @__PURE__ */ Y("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [
					e.shell && /* @__PURE__ */ Y(n, {
						size: "sm",
						variant: "primary",
						onClick: A,
						"data-testid": `${a}-open-shell`,
						children: [/* @__PURE__ */ J("span", {
							"aria-hidden": "true",
							className: "font-mono",
							children: ">_"
						}), " Open shell"]
					}),
					e.onOpenLab && /* @__PURE__ */ J(n, {
						size: "sm",
						variant: "secondary",
						onClick: e.onOpenLab,
						"data-testid": `${a}-open-lab`,
						children: "Open in Computer Lab"
					}),
					!!e.moreActions?.length && /* @__PURE__ */ J(D, {
						trigger: /* @__PURE__ */ J("span", {
							"aria-hidden": "true",
							children: "…"
						}),
						triggerLabel: "More session actions",
						align: "end",
						triggerTestId: `${a}-more`,
						"data-testid": `${a}-more-menu`,
						sections: [{ items: e.moreActions.map((e) => ({
							label: e.label,
							...e.onSelect ? { onSelect: e.onSelect } : {}
						})) }]
					})
				]
			}),
			/* @__PURE__ */ J("div", {
				className: "overflow-hidden rounded-md border border-border bg-code-bg",
				children: /* @__PURE__ */ J(F, {
					computer: v,
					modelId: f.model,
					...e.idleWindowMs ? { idleWindowMs: e.idleWindowMs } : {},
					className: "border-t-0",
					"data-testid": `${a}-gauges`
				})
			}),
			/* @__PURE__ */ Y("div", {
				className: "grid grid-cols-2 gap-2",
				"data-testid": `${a}-metrics`,
				children: [
					/* @__PURE__ */ J(On, {
						label: "Model",
						value: N(f.model),
						title: f.model
					}),
					/* @__PURE__ */ J(On, {
						label: "Cost",
						value: f.costUsd == null ? "—" : `$${f.costUsd.toFixed(4)}`
					}),
					/* @__PURE__ */ J(On, {
						label: "Context",
						value: w,
						title: `${f.contextTokens} tokens used`
					}),
					/* @__PURE__ */ J(On, {
						label: "Environment",
						value: p.environment
					})
				]
			}),
			/* @__PURE__ */ J("div", { children: /* @__PURE__ */ J(h, {
				items: j,
				value: M,
				onValueChange: (e) => c(e),
				variant: "underline",
				size: "sm",
				idPrefix: `${a}-tab`,
				"aria-label": "Cloud session view"
			}) }),
			/* @__PURE__ */ J(g, {
				idPrefix: `${a}-tab`,
				id: "activity",
				when: M,
				className: "space-y-2",
				children: /* @__PURE__ */ Y(C, {
					active: d.busy,
					particleCount: 200,
					speed: .14,
					alphaParticles: !0,
					moveParticlesOnHover: !0,
					particleHoverFactor: .6,
					particleColors: S,
					fallbackIntensity: "medium",
					seed: y,
					className: "overflow-hidden rounded-md border border-code-border bg-code-bg",
					"data-testid": `${a}-tail`,
					children: [
						/* @__PURE__ */ Y("div", {
							className: t("flex items-center gap-2 border-b border-code-border px-2 py-1", d.busy ? "bg-transparent" : "bg-code-panel"),
							children: [
								/* @__PURE__ */ J(s, {
									size: "xs",
									mono: !0,
									palette: "code",
									tone: e.terminalPreview.running ? "success" : "neutral",
									dot: "static",
									children: e.terminalPreview.running ? "tailing" : "idle"
								}),
								d.busy && /* @__PURE__ */ J(s, {
									size: "xs",
									mono: !0,
									palette: "code",
									tone: "info",
									dot: "pulse",
									children: "running"
								}),
								/* @__PURE__ */ J("span", {
									className: "ml-auto shrink-0 font-mono text-[10px] text-code-muted",
									children: "read-only"
								}),
								e.onOpenInNew && /* @__PURE__ */ J(n, {
									tone: "code",
									variant: "ghost",
									size: "sm",
									onClick: e.onOpenInNew,
									"data-testid": `${a}-open-in-new`,
									children: "Open in new"
								})
							]
						}),
						/* @__PURE__ */ Y("div", {
							className: "flex items-center gap-2 border-b border-code-border px-2 py-1 font-mono text-[11px]",
							children: [
								/* @__PURE__ */ J("span", {
									"aria-hidden": "true",
									className: "text-code-green",
									children: "▶"
								}),
								/* @__PURE__ */ J("span", {
									className: "min-w-0 truncate text-code-text",
									children: e.label
								}),
								/* @__PURE__ */ J("span", {
									className: "ml-auto shrink-0 text-code-blue",
									children: p.environment
								})
							]
						}),
						/* @__PURE__ */ J(b, {
							lines: T,
							title: null,
							showLevel: !1,
							showSource: !1,
							maxHeight: "16rem",
							emptyMessage: "No output yet.",
							tone: d.busy ? "transparent" : "code",
							className: "rounded-none border-none",
							"data-testid": `${a}-stream`
						})
					]
				})
			}),
			e.shell && /* @__PURE__ */ J(g, {
				idPrefix: `${a}-tab`,
				id: "shell",
				when: M,
				children: /* @__PURE__ */ J(C, {
					active: d.busy,
					particleCount: 90,
					speed: .1,
					alphaParticles: !0,
					particleColors: S,
					fallbackIntensity: "low",
					seed: y,
					className: "space-y-2 rounded-md",
					"data-testid": `${a}-shell-particles`,
					children: e.shell.shellUrl ? /* @__PURE__ */ J(L, {
						fallback: /* @__PURE__ */ J("p", {
							className: "rounded-md border border-code-border bg-code-bg px-2 py-6 text-center font-mono text-[11px] text-code-muted",
							children: "Loading terminal…"
						}),
						children: /* @__PURE__ */ J(vn, {
							sessionId: e.shell.sessionId,
							shellUrl: e.shell.shellUrl,
							className: "flex h-72 min-h-0 flex-col overflow-hidden rounded-md border border-code-border",
							"data-testid": `${a}-terminal`
						})
					}) : /* @__PURE__ */ Y(q, { children: [
						/* @__PURE__ */ J(An, {
							lines: e.terminalPreview.lines,
							running: e.terminalPreview.running,
							label: e.label,
							environment: p.environment,
							seed: y,
							testId: `${a}-preview`
						}),
						/* @__PURE__ */ J("p", {
							className: "text-xs text-text-secondary",
							children: "The agent is working in a cloud computer. Open a shell to look around its workspace — the same PTY, the same files."
						}),
						/* @__PURE__ */ Y(n, {
							size: "sm",
							variant: "primary",
							fullWidth: !0,
							onClick: A,
							disabled: !e.onOpenShell,
							"data-testid": `${a}-connect`,
							children: [/* @__PURE__ */ J("span", {
								"aria-hidden": "true",
								className: "font-mono",
								children: ">_"
							}), " Open shell"]
						})
					] })
				})
			}),
			/* @__PURE__ */ Y(g, {
				idPrefix: `${a}-tab`,
				id: "workspace",
				when: M,
				className: "space-y-3",
				children: [
					/* @__PURE__ */ J(kn, {
						label: "Progress",
						trailing: `${e.progress.length} ${e.progress.length === 1 ? "step" : "steps"}`,
						children: e.progress.length ? /* @__PURE__ */ J("ol", {
							className: "space-y-1.5",
							"data-testid": `${a}-progress`,
							children: e.progress.map((e) => {
								let n = bn[e.status];
								return /* @__PURE__ */ Y("li", {
									"data-state": e.status,
									className: "flex items-baseline gap-2 text-[12px]",
									children: [
										/* @__PURE__ */ J("span", {
											"aria-hidden": "true",
											className: t("mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full", n.dot)
										}),
										/* @__PURE__ */ J("span", {
											className: t("min-w-0 flex-1 truncate", n.text),
											title: e.title,
											children: e.title
										}),
										/* @__PURE__ */ J("span", {
											className: "shrink-0 text-[11px] tabular-nums text-text-tertiary",
											children: En(e)
										})
									]
								}, e.id);
							})
						}) : /* @__PURE__ */ J("p", {
							className: "text-xs text-text-secondary",
							children: "No plan was recorded for this session."
						})
					}),
					/* @__PURE__ */ J(kn, {
						label: "Artifacts",
						trailing: `${e.artifacts.length} ${e.artifacts.length === 1 ? "file" : "files"}`,
						children: e.artifacts.length ? /* @__PURE__ */ J("ul", {
							className: "space-y-1",
							"data-testid": `${a}-artifacts`,
							children: e.artifacts.map((e) => /* @__PURE__ */ Y("li", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ Y("span", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ J("span", {
										className: "block truncate font-mono text-[12px] text-text-primary",
										children: e.name
									}), /* @__PURE__ */ J("span", {
										className: "block truncate text-[11px] text-text-tertiary",
										children: [e.sizeBytes == null ? null : ee(e.sizeBytes), e.updatedAt].filter(Boolean).join(" · ")
									})]
								}), e.onDownload && /* @__PURE__ */ J(n, {
									size: "sm",
									variant: "ghost",
									onClick: e.onDownload,
									children: "Download"
								})]
							}, e.id))
						}) : /* @__PURE__ */ J("p", {
							className: "text-xs text-text-secondary",
							children: "This session has not written a file you can see."
						})
					}),
					e.workItem && /* @__PURE__ */ J(kn, {
						label: "Work item",
						children: (() => {
							let t = e.workItem, n = /* @__PURE__ */ Y(q, { children: [/* @__PURE__ */ Y("span", {
								className: "flex min-w-0 flex-1 flex-col text-left",
								children: [/* @__PURE__ */ Y("span", {
									className: "flex items-baseline gap-2",
									children: [/* @__PURE__ */ J("span", {
										className: "font-mono text-[12px] font-semibold text-text-primary",
										children: t.key
									}), /* @__PURE__ */ J(s, {
										size: "xs",
										children: t.status
									})]
								}), /* @__PURE__ */ J("span", {
									className: "truncate text-[12px] text-text-secondary",
									children: t.title
								})]
							}), t.onOpen && /* @__PURE__ */ J("span", {
								"aria-hidden": "true",
								className: "shrink-0 text-text-tertiary",
								children: "↗"
							})] });
							return /* @__PURE__ */ Y(q, { children: [t.onOpen ? /* @__PURE__ */ J("button", {
								type: "button",
								onClick: t.onOpen,
								"data-testid": `${a}-work-item`,
								className: "flex w-full items-center gap-2 rounded-md border border-border p-2 text-left hover:border-border-emphasis focus-visible:outline-2 focus-visible:outline-primary",
								children: n
							}) : /* @__PURE__ */ J("div", {
								"data-testid": `${a}-work-item`,
								className: "flex items-center gap-2 rounded-md border border-border p-2",
								children: n
							}), !!t.tags.length && /* @__PURE__ */ J("div", {
								className: "flex flex-wrap gap-1.5",
								children: t.tags.map((e) => /* @__PURE__ */ J(s, {
									size: "xs",
									tone: "info",
									children: e
								}, e))
							})] });
						})()
					})
				]
			})
		]
	});
}
//#endregion
//#region src/components/graph/work/WorkNodePane.tsx
var Mn = {
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
function Nn({ banner: e }) {
	let n = Mn[e.tone];
	return /* @__PURE__ */ Y("div", {
		role: "status",
		className: t("flex gap-2 rounded-md border p-2.5", n.card),
		"data-testid": "work-pane-banner",
		"data-tone": e.tone,
		children: [/* @__PURE__ */ J("span", {
			"aria-hidden": "true",
			className: t("mt-1.5 h-2 w-2 shrink-0 rounded-full", n.dot)
		}), /* @__PURE__ */ Y("span", {
			className: "min-w-0",
			children: [/* @__PURE__ */ J("span", {
				className: t("block text-[13px] font-semibold", n.title),
				children: e.title
			}), e.description && /* @__PURE__ */ J("span", {
				className: "block text-xs text-text-secondary",
				children: e.description
			})]
		})]
	});
}
function Pn({ label: e, children: t }) {
	return /* @__PURE__ */ Y("section", {
		className: "space-y-1.5",
		children: [/* @__PURE__ */ J("h3", {
			className: "text-[10px] font-semibold uppercase tracking-wide text-text-tertiary",
			children: e
		}), t]
	});
}
function Fn({ item: e, onSelect: t }) {
	let n = /* @__PURE__ */ Y(q, { children: [
		/* @__PURE__ */ J("span", {
			"aria-hidden": "true",
			className: "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded bg-info-bg text-[11px] text-info-fg",
			children: "▤"
		}),
		/* @__PURE__ */ Y("span", {
			className: "min-w-0 flex-1",
			children: [/* @__PURE__ */ J("span", {
				className: "block truncate text-[13px] font-medium text-text-primary",
				children: e.title
			}), e.meta && /* @__PURE__ */ J("span", {
				className: "block truncate text-xs text-text-tertiary",
				children: e.meta
			})]
		}),
		e.selection && t && /* @__PURE__ */ J("span", {
			"aria-hidden": "true",
			className: "shrink-0 text-text-tertiary",
			children: "↗"
		})
	] });
	return !e.selection || !t ? /* @__PURE__ */ J("div", {
		className: "flex gap-2 rounded-md border border-border p-2",
		children: n
	}) : /* @__PURE__ */ J("button", {
		type: "button",
		className: "flex w-full gap-2 rounded-md border border-border p-2 text-left hover:border-border-emphasis focus-visible:outline-2 focus-visible:outline-primary",
		onClick: () => t(e.selection),
		children: n
	});
}
function In({ transcript: e, onSelect: t }) {
	let n = U(), [r, i] = K("transcript"), a = e.ask;
	return /* @__PURE__ */ Y("div", {
		className: "space-y-3",
		"data-testid": "work-transcript-panel",
		children: [
			/* @__PURE__ */ J(h, {
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
			/* @__PURE__ */ Y(g, {
				idPrefix: n,
				id: "transcript",
				when: r,
				className: "space-y-3",
				children: [e.segments.map((e) => /* @__PURE__ */ Y("div", {
					className: "space-y-0.5",
					children: [/* @__PURE__ */ Y("p", {
						className: "flex items-baseline gap-2 text-xs",
						children: [/* @__PURE__ */ J("span", {
							className: "tabular-nums text-text-tertiary",
							children: e.at
						}), /* @__PURE__ */ J("span", {
							className: "font-semibold text-text-primary",
							children: e.speaker
						})]
					}), /* @__PURE__ */ J("p", {
						className: "text-[13px] leading-snug text-text-secondary",
						children: e.text
					})]
				}, e.id)), !e.segments.length && /* @__PURE__ */ J("p", {
					className: "text-sm text-text-secondary",
					children: "No transcript rows are shared with you."
				})]
			}),
			a && /* @__PURE__ */ J(g, {
				idPrefix: n,
				id: "ask",
				when: r,
				children: /* @__PURE__ */ J(Ln, {
					ask: a,
					onSelect: t
				})
			})
		]
	});
}
function Ln({ ask: e, onSelect: t }) {
	let [r, i] = K(""), [a, o] = K(null), [s, c] = K(null), [l, u] = K(!1);
	if (!e.enabled) return /* @__PURE__ */ J("p", {
		className: "text-sm text-text-secondary",
		children: e.unavailableLabel ?? "Ask is unavailable for this transcript."
	});
	let f = async () => {
		if (!(!r.trim() || l)) {
			u(!0), c(null);
			try {
				o(await e.onAsk(r.trim()));
			} catch {
				o(null), c("That question could not be answered right now.");
			} finally {
				u(!1);
			}
		}
	};
	return /* @__PURE__ */ Y("div", {
		className: "space-y-2",
		children: [
			/* @__PURE__ */ J("label", {
				className: "block text-xs text-text-secondary",
				htmlFor: "work-ask-input",
				children: "Ask this transcript"
			}),
			/* @__PURE__ */ Y("div", {
				className: "flex gap-1.5",
				children: [/* @__PURE__ */ J(d, {
					id: "work-ask-input",
					size: "sm",
					className: "flex-1",
					placeholder: e.placeholder ?? "Anything for me?",
					value: r,
					onChange: (e) => i(e.target.value),
					onKeyDown: (e) => {
						e.key === "Enter" && f();
					}
				}), /* @__PURE__ */ J(n, {
					size: "sm",
					variant: "primary",
					disabled: l || !r.trim(),
					onClick: () => void f(),
					children: "Ask"
				})]
			}),
			s && /* @__PURE__ */ J("p", {
				role: "status",
				className: "text-xs text-danger-fg",
				children: s
			}),
			a && /* @__PURE__ */ Y("div", {
				className: "space-y-2 rounded-md border border-border p-2.5",
				"data-testid": "work-ask-answer",
				children: [
					/* @__PURE__ */ J("p", {
						className: "text-[13px] leading-snug text-text-primary",
						children: a.text
					}),
					!!a.citations?.length && /* @__PURE__ */ J("div", {
						className: "flex flex-wrap gap-1.5",
						children: a.citations.map((e) => e.selection && t ? /* @__PURE__ */ Y(n, {
							size: "sm",
							variant: "secondary",
							onClick: () => t(e.selection),
							children: [e.label, " ↗"]
						}, e.id) : /* @__PURE__ */ J(Bn, { children: e.label }, e.id))
					}),
					a.note && /* @__PURE__ */ J("p", {
						className: "text-[11px] text-text-tertiary",
						children: a.note
					})
				]
			})
		]
	});
}
function Rn(e) {
	return e.replace(/\s+/g, " ").trim().toLowerCase();
}
function zn(e, t) {
	let n = Rn(e);
	return !n || t.some((e) => !!e && (Rn(e) === n || n.length >= 8 && Rn(e).includes(n)));
}
function Bn({ children: e, title: t, tone: n }) {
	return /* @__PURE__ */ J(s, {
		size: "sm",
		className: "max-w-full min-w-0",
		...t ? { title: t } : {},
		...n ? { tone: n } : {},
		children: /* @__PURE__ */ J("span", {
			className: "min-w-0 truncate",
			children: e
		})
	});
}
function Vn({ node: e, detail: r, selection: i, onSelectionChange: a, onClose: o, onOpen: s, onReference: l, live: d, headerAccessory: f, className: p, "data-testid": m = "activity-inspector" }) {
	let h = e.locked || e.disclosure === "existence", g = h ? void 0 : r, _ = e.locked ? "Restricted work item" : e.title, v = g?.sections, y = g?.artifact ? gn(g.artifact, i) : void 0, b = y?.revision ? {
		...i,
		revisionId: y.revision.id,
		anchorId: y.slide?.id ?? i.anchorId ?? y.revision.anchorId
	} : { ...i }, x = g?.compute, S = g?.banner?.description && zn(g.banner.description, [_, g.subtitle]) ? {
		tone: g.banner.tone,
		title: g.banner.title
	} : g?.banner, C = S && zn(S.title, [_]) ? S.description ? {
		tone: S.tone,
		title: S.description
	} : void 0 : S, w = !h && !!d && e.status === "running" && g?.fresh !== !0, T = w ? g?.subtitle ? `${g.subtitle} · updates delayed` : "Running · updates delayed" : g?.subtitle, E = !!x || !!g?.artifact || !!g?.transcript, D = [
		C?.title,
		C?.description,
		v?.description,
		g?.subtitle,
		g?.excerpt
	], O = E ? [] : (g?.lines ?? []).filter((e, t, n) => n.indexOf(e) === t && !zn(e, D)), k = E ? void 0 : g?.excerpt, A = g?.actions ?? [], j = !!s && !!y?.revision && (e.capabilities.includes("view-document") || e.capabilities.includes("edit-document")), M = !x && !C && !g?.artifact && !g?.transcript && !v && !g?.note && !g?.actions?.length && !k && O.length === 0;
	return /* @__PURE__ */ Y("section", {
		"aria-label": _,
		"data-testid": m,
		className: t("flex h-full min-h-0 flex-col border-l border-border bg-surface", p),
		onKeyDown: (e) => {
			e.key === "Escape" && !e.defaultPrevented && (e.stopPropagation(), o());
		},
		children: [
			/* @__PURE__ */ Y("header", {
				className: "flex shrink-0 items-start justify-between gap-2 border-b border-border px-3 py-2",
				children: [/* @__PURE__ */ Y("span", {
					className: "flex min-w-0 flex-col",
					children: [/* @__PURE__ */ J("span", {
						className: "truncate text-sm font-semibold text-text-primary",
						"data-testid": `${m}-title`,
						children: _
					}), T && /* @__PURE__ */ J("span", {
						className: "truncate text-xs text-text-tertiary",
						"data-testid": `${m}-subtitle`,
						...w ? { "data-delayed": "true" } : {},
						children: T
					})]
				}), /* @__PURE__ */ Y("span", {
					className: "flex shrink-0 items-center gap-2",
					children: [f != null && /* @__PURE__ */ J("span", {
						className: "flex items-center",
						"data-testid": `${m}-accessory`,
						children: f
					}), /* @__PURE__ */ J(c, {
						size: "md",
						"aria-label": "Close details",
						onClick: o,
						"data-testid": `${m}-close`,
						className: "shrink-0",
						children: /* @__PURE__ */ J(u, {})
					})]
				})]
			}),
			/* @__PURE__ */ Y("div", {
				className: "min-h-0 flex-1 space-y-4 overflow-auto p-3",
				children: [
					!x && C && /* @__PURE__ */ J(Nn, { banner: C }),
					x && /* @__PURE__ */ J(jn, {
						compute: x,
						...C ? { banner: C } : {}
					}),
					k && /* @__PURE__ */ J("p", {
						className: "text-[13px] italic leading-snug text-text-primary",
						"data-testid": `${m}-excerpt`,
						children: `“${k}”`
					}),
					O.length > 0 && /* @__PURE__ */ J("ul", {
						className: "space-y-0.5 text-[13px] leading-snug text-text-secondary",
						"data-testid": `${m}-lines`,
						children: O.map((e, t) => /* @__PURE__ */ J("li", { children: e }, `${t}-${e}`))
					}),
					v?.description && /* @__PURE__ */ J("p", {
						className: "text-[13px] leading-snug text-text-secondary",
						children: v.description
					}),
					g?.artifact && /* @__PURE__ */ J(_n, {
						node: e,
						artifact: g.artifact,
						selection: i,
						onSelectionChange: a,
						quiet: !!g.banner
					}),
					g?.transcript && /* @__PURE__ */ J(In, {
						transcript: g.transcript,
						onSelect: a
					}),
					!!v?.inputs?.length && /* @__PURE__ */ J(Pn, {
						label: "Inputs",
						children: /* @__PURE__ */ J("div", {
							className: "flex flex-wrap gap-1.5",
							children: v.inputs.map((e, t) => typeof e == "string" ? /* @__PURE__ */ J(Bn, { children: e }, `${t}-${e}`) : /* @__PURE__ */ J(Bn, {
								title: e.meta,
								children: e.title
							}, e.id))
						})
					}),
					!!v?.tools?.length && /* @__PURE__ */ J(Pn, {
						label: "Tools in this run",
						children: /* @__PURE__ */ J("div", {
							className: "flex flex-wrap gap-1.5",
							children: v.tools.map((e, t) => /* @__PURE__ */ J(Bn, {
								tone: "info",
								children: e
							}, `${t}-${e}`))
						})
					}),
					!!v?.sources?.length && /* @__PURE__ */ J(Pn, {
						label: "Sources used",
						children: /* @__PURE__ */ J("div", {
							className: "space-y-1.5",
							children: v.sources.map((e) => /* @__PURE__ */ J(Fn, {
								item: e,
								onSelect: a
							}, e.id))
						})
					}),
					v?.workItem && /* @__PURE__ */ J(Pn, {
						label: "Work item",
						children: /* @__PURE__ */ J(Fn, {
							item: v.workItem,
							onSelect: a
						})
					}),
					g?.note && /* @__PURE__ */ J("p", {
						className: "text-xs leading-snug text-text-tertiary",
						children: g.note
					}),
					M && /* @__PURE__ */ J("p", {
						className: "text-sm text-text-secondary",
						children: h ? "Only the existence of this work is shared with you." : "No further detail is shared with you."
					})
				]
			}),
			(j || A.length > 0 || l && !h) && /* @__PURE__ */ Y("div", {
				className: "shrink-0 space-y-2 border-t border-border p-2",
				"data-testid": `${m}-footer`,
				children: [(j || A.length > 0) && /* @__PURE__ */ Y("div", {
					className: "grid gap-2",
					"data-testid": `${m}-actions`,
					children: [j && /* @__PURE__ */ J(n, {
						size: "sm",
						variant: "primary",
						fullWidth: !0,
						onClick: () => s(b),
						children: "Open presentation"
					}), A.map((e) => /* @__PURE__ */ J(n, {
						size: "sm",
						variant: "secondary",
						fullWidth: !0,
						onClick: () => {
							e.onSelect?.(), e.selection && a(e.selection);
						},
						children: e.label
					}, e.id))]
				}), l && !h && /* @__PURE__ */ J(n, {
					size: "sm",
					variant: "secondary",
					fullWidth: !0,
					onClick: () => l(b),
					children: "Reference in chat"
				})]
			})
		]
	});
}
//#endregion
//#region src/components/forms/RangeSlider.tsx
function Hn({ value: e, min: n, max: r, step: i = 1, minDistance: a = i, labels: o, formatValue: s, onChange: c, className: l }) {
	let u = U(), d = Math.max(1, r - n), f = (e) => Math.max(n, Math.min(r, e)), p = f(e[0]), m = Math.max(p, f(e[1])), h = Math.min(a, r - n);
	return /* @__PURE__ */ Y("div", {
		className: t("relative h-7 min-w-0", l),
		children: [
			/* @__PURE__ */ J("div", { className: "absolute inset-x-0 top-3 h-1 rounded-full bg-surface-inset" }),
			/* @__PURE__ */ J("div", {
				className: "absolute top-3 h-1 rounded-full bg-primary/30",
				style: {
					left: `${(p - n) / d * 100}%`,
					right: `${(r - m) / d * 100}%`
				}
			}),
			[0, 1].map((e) => /* @__PURE__ */ J("input", {
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
var Un = 6e4, Wn = 60 * Un, Gn = [
	[2 * Wn, 30 * Un],
	[6 * Wn, Wn],
	[12 * Wn, 2 * Wn],
	[Infinity, 3 * Wn]
], Kn = 80, qn = 44;
function Jn({ activity: e, timezone: r = "UTC" }) {
	let { bounds: i, window: a, onWindowChange: o } = e, s = Math.max(Un, a.end - a.start), l = new Intl.DateTimeFormat(void 0, {
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
	}, p = e.now ?? (a.following ? a.end : Date.now()), m = e.temporalMode === "recent" || a.following ? Math.min(i.end, Math.max(i.start + Un, p)) : i.end, h = Math.max(1, m - i.start), g = (e) => Math.min(100, Math.max(0, (e - i.start) / h * 100)), _ = (e, t, n = s) => {
		let r = Math.max(i.start + Math.min(n, h), Math.min(m, e));
		o({
			start: Math.max(i.start, r - n),
			end: r,
			following: t
		});
	}, v = [
		15,
		30,
		60
	].find((e) => s === e * Un), y = a.start === i.start && a.end >= m, b = a.end >= m, x = [Math.min(Math.max(a.start, i.start), m), Math.min(Math.max(a.end, i.start), m)], S = Gn.find(([e]) => h <= e)[1], C = M(), w = C.width ?? 0, T = [];
	for (let e = Math.ceil(i.start / S) * S; e <= m; e += S) {
		let t = (e - i.start) / h;
		if (!(t >= .82)) {
			if (w > 0) {
				if ((1 - t) * w < Kn) continue;
				let n = T[T.length - 1];
				if (n !== void 0 && (e - n) / h * w < qn) continue;
			}
			T.push(e);
		}
	}
	return /* @__PURE__ */ Y("div", {
		className: "shrink-0 border-b border-border bg-surface px-3 pb-3 pt-2",
		"aria-label": "Work time window",
		children: [
			/* @__PURE__ */ Y("div", {
				className: "flex flex-wrap items-center gap-1.5 text-xs text-text-secondary",
				children: [
					/* @__PURE__ */ Y("strong", {
						"aria-live": "polite",
						title: r,
						className: "tabular-nums font-semibold text-text-primary",
						children: [
							f(x[0]),
							" – ",
							b ? "Now" : f(x[1])
						]
					}),
					/* @__PURE__ */ J("span", { className: "flex-1" }),
					/* @__PURE__ */ J(c, {
						size: "sm",
						"aria-label": "Previous interval",
						disabled: a.start <= i.start,
						onClick: () => _(a.end - s, !1),
						children: "‹"
					}),
					/* @__PURE__ */ J(c, {
						size: "sm",
						"aria-label": "Next interval",
						disabled: b,
						onClick: () => _(a.end + s, !1),
						children: "›"
					}),
					/* @__PURE__ */ Y(n, {
						size: "sm",
						variant: "secondary",
						disabled: a.following,
						onClick: () => _(m, !0),
						children: [/* @__PURE__ */ J("span", {
							"aria-hidden": "true",
							className: t("mr-1 inline-block h-1.5 w-1.5 rounded-full align-middle", a.following ? "bg-success" : "bg-border-emphasis")
						}), a.following ? "Following now" : "Back to now"]
					}),
					/* @__PURE__ */ J(k, {
						"aria-label": "Interval duration",
						value: y ? "day" : v ? String(v) : "custom",
						size: "sm",
						className: "w-auto",
						options: [
							...!v && !y ? [{
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
						onChange: (e) => _(a.end, a.following, e.target.value === "day" ? h : Number(e.target.value) * Un)
					})
				]
			}),
			/* @__PURE__ */ Y("div", {
				ref: C.ref,
				className: "relative mx-1 mt-2 h-4 text-[10px] text-text-tertiary",
				"aria-hidden": "true",
				"data-testid": "work-time-ruler",
				children: [T.map((e) => /* @__PURE__ */ J("span", {
					className: "absolute top-0 -translate-x-1/2 first:translate-x-0 tabular-nums",
					style: { left: `${g(e)}%` },
					children: f(e)
				}, e)), /* @__PURE__ */ Y("span", {
					className: "absolute right-0 top-0 font-semibold tabular-nums text-text-secondary",
					children: ["Now ", f(m)]
				})]
			}),
			/* @__PURE__ */ J("div", {
				className: "relative mx-1 h-3 border-b border-border",
				"aria-label": "Activity markers",
				children: e.events?.filter((e) => e.at >= i.start && e.at <= m && e.count > 0).map((e) => {
					let n = e.at >= x[0] && e.at <= x[1];
					return /* @__PURE__ */ J("button", {
						type: "button",
						"aria-label": `${e.count} events at ${u(e.at)}`,
						title: `${e.count} events at ${u(e.at)}`,
						className: t("absolute bottom-0.5 h-2 w-2 -translate-x-1/2 rounded-full focus-visible:outline-2 focus-visible:outline-primary", n ? "bg-primary ring-2 ring-primary/20" : "bg-primary/40"),
						style: {
							left: `${g(e.at)}%`,
							opacity: Math.min(1, .45 + Math.log2(e.count + 1) / 5)
						},
						onClick: () => _(e.at, !1)
					}, e.at);
				})
			}),
			/* @__PURE__ */ J(Hn, {
				className: "mx-1",
				value: x,
				min: i.start,
				max: m,
				step: Un,
				labels: ["Interval start", "Interval end"],
				formatValue: u,
				onChange: ([e, t]) => o({
					start: e,
					end: t,
					following: !1
				})
			}),
			!a.following && e.temporalMode === "recent" && /* @__PURE__ */ J("p", {
				className: "text-xs text-text-secondary",
				children: "Recent work · statuses reflect the latest available state"
			})
		]
	});
}
//#endregion
//#region src/components/graph/work/WorkActivityGraph.tsx
var Yn = 820, Xn = 720;
function Zn(e) {
	let { nodes: r, edges: i, selection: a, activity: o, onSelectionChange: s, onMaxEffortsChange: c } = e, l = G(null), u = G(null), d = G(null), [f, p] = K(!1), [m, h] = K(!0), [g, _] = K(!1), [v, y] = K(null), [b, x] = K(e.maxEfforts ?? 2), S = c ? e.maxEfforts ?? 2 : b, C = (e) => {
		if (!c) {
			x(e);
			return;
		}
		c(e);
	}, w = a?.kind === "node" ? a.id : null, T = o.view.focusedEffortId ?? null, E = T ?? (w ? o.efforts.find((e) => e.nodeIds.includes(w))?.id ?? null : null), D = Ut(o.efforts, r, {
		max: S,
		keepEffortId: E
	}), O = D.length, k = T ? D.filter((e) => e.id === T) : D, A = o.efforts.length === 0 ? void 0 : k.map((e) => ({
		id: e.id,
		title: e.title,
		subtitle: e.subtitle,
		nodeIds: [.../* @__PURE__ */ new Set([...e.nodeIds, ...e.contextNodeIds ?? []])]
	}));
	A && w && r.some((e) => e.id === w) && !A.some((e) => e.nodeIds.includes(w)) && A.unshift({
		id: "__selected",
		title: "Selected",
		nodeIds: [w]
	});
	let j = A ? new Set(k.flatMap((e) => e.edgeIds)) : null;
	j && a?.kind === "edge" && j.add(a.id);
	let M = j ? i.filter((e) => j.has(e.id)) : i, ee = (T ? 0 : o.efforts.length - O) > 0 ? /* @__PURE__ */ Y("div", {
		className: "flex flex-wrap items-center justify-between gap-2 border-t border-border pt-2 text-xs text-text-tertiary",
		"data-testid": "work-activity-list-more",
		children: [/* @__PURE__ */ Y("span", { children: [
			"Showing ",
			O,
			" of ",
			o.efforts.length,
			" activities · Newest work first"
		] }), /* @__PURE__ */ Y(n, {
			size: "sm",
			variant: "secondary",
			onClick: () => C(0),
			children: [
				"Show all ",
				o.efforts.length,
				" activities"
			]
		})]
	}) : void 0, N = (e) => tt(e.status, o.details?.[e.id]?.pause), P = /* @__PURE__ */ J(ht, {
		...e,
		edges: M,
		groups: A,
		footer: ee,
		statusLabelOf: N
	}), F = a?.kind === "node" ? r.find((e) => e.id === a.id) : void 0, I = a?.kind === "edge" ? i.find((e) => e.id === a.id && r.some((t) => t.id === e.fromId) && r.some((t) => t.id === e.toId)) : void 0, L = !!(F || I), { window: R, bounds: z, onWindowChange: B, onEarlier: V } = o, U = o.detailsPlacement ?? "auto", W = U === "overlay" || U === "auto" && !m;
	H(() => {
		a && !L && s(null);
	}, [
		a,
		L,
		s
	]), H(() => {
		a && l.current?.contains(document.activeElement) && document.activeElement instanceof HTMLElement && !document.activeElement.closest("[data-testid=\"activity-inspector\"]") && (d.current = document.activeElement);
	}, [a]);
	let q = G(!1);
	H(() => {
		if (a) {
			q.current = !0;
			return;
		}
		if (!q.current) return;
		q.current = !1;
		let e = d.current;
		e && requestAnimationFrame(() => {
			let t = document.activeElement;
			e.isConnected && (!t || t === document.body) && e.focus({ preventScroll: !0 });
		});
	}, [a]), H(() => {
		let e = u.current;
		if (!e || typeof ResizeObserver > "u") return;
		let t = new ResizeObserver(([e]) => h(e.contentRect.width >= Yn));
		return t.observe(e), () => t.disconnect();
	}, []), H(() => {
		let e = l.current;
		if (!e || typeof ResizeObserver > "u") return;
		let t = new ResizeObserver(([e]) => _(e.contentRect.height < Xn));
		return t.observe(e), () => t.disconnect();
	}, []);
	let ne = () => {
		s(null), requestAnimationFrame(() => {
			d.current?.isConnected && d.current.focus();
		});
	}, re = () => {
		if (V) {
			V();
			return;
		}
		let e = Math.max(6e4, R.end - R.start), t = Math.max(z.start, R.start - e);
		B({
			start: t,
			end: t + e,
			following: !1
		});
	}, ie = L, ae = a ? `${a.kind}:${a.id}` : null, X = ie && e.viewport.zoom < .4 && v !== ae, Z = X || f && g, Q = f && !Z, oe = Z || Q, se = () => {
		if (!oe) {
			p(!0);
			return;
		}
		p(!1), X && y(ae);
	}, ce = pe().right, le = ce > 0 ? { paddingRight: ce } : void 0, ue = W ? "absolute inset-y-0 right-0 z-10 w-[min(340px,85%)] shadow-lg" : "w-[340px] max-w-[45%] shrink-0";
	return /* @__PURE__ */ Y("section", {
		ref: l,
		"aria-label": "Shared work graph",
		className: t("flex h-full min-h-0 min-w-0 flex-col bg-surface", e.className),
		onKeyDown: (e) => {
			e.key === "Escape" && a && (e.stopPropagation(), ne());
		},
		children: [
			o.title && /* @__PURE__ */ J(hn, {
				title: o.title,
				subtitle: o.subtitle,
				expanded: o.expanded ?? o.mode === "full",
				onExpand: o.onExpand,
				onPopOut: o.onPopOut,
				onClose: o.onClose,
				effortCount: o.efforts.length,
				maxEfforts: S,
				onMaxEffortsChange: C
			}),
			e.state === "partial" && /* @__PURE__ */ J("p", {
				role: "status",
				className: "border-b border-warning-border bg-warning-bg px-3 py-1 text-xs text-warning-fg",
				children: "Some work sources are delayed or unavailable."
			}),
			/* @__PURE__ */ Y("div", {
				ref: u,
				className: "relative flex min-h-0 min-w-0 flex-1",
				children: [/* @__PURE__ */ Y("div", {
					className: "flex min-h-0 min-w-0 flex-1 flex-col",
					children: [
						/* @__PURE__ */ J("div", {
							style: le,
							"data-testid": "work-activity-time-window-frame",
							children: /* @__PURE__ */ J(Jn, {
								activity: o,
								timezone: e.timezone
							})
						}),
						/* @__PURE__ */ Y("div", {
							className: "relative flex min-h-0 flex-1 flex-col overflow-hidden",
							"data-testid": "work-activity-region",
							"data-list": Z ? "region" : void 0,
							children: [/* @__PURE__ */ J("div", {
								className: t("flex min-h-0 flex-1 flex-col", Z && "invisible"),
								"aria-hidden": Z || void 0,
								inert: Z || void 0,
								children: /* @__PURE__ */ J(un, {
									...e,
									maxEfforts: S,
									onViewAsList: () => p(!0)
								})
							}), Z && /* @__PURE__ */ J("div", {
								className: "absolute inset-0 overflow-auto bg-surface p-3",
								"data-testid": "work-activity-list-region",
								children: P
							})]
						}),
						/* @__PURE__ */ Y("div", {
							className: "@container flex h-9 shrink-0 items-center justify-between gap-2 border-t border-border px-4 text-[10px] text-text-tertiary",
							style: ce > 0 ? { paddingRight: ce + 16 } : void 0,
							"data-testid": "work-activity-footer",
							children: [o.view.focusedEffortId ? /* @__PURE__ */ J(n, {
								size: "sm",
								variant: "ghost",
								onClick: () => o.onViewChange({
									...o.view,
									focusedEffortId: null
								}),
								children: "← All activities"
							}) : /* @__PURE__ */ Y("span", { children: [O < o.efforts.length ? `Showing ${O} of ${o.efforts.length} parallel activities` : `${o.efforts.length} parallel activities`, " · Newest work first"] }), /* @__PURE__ */ Y("span", {
								className: "ml-auto flex items-center gap-3",
								children: [!Z && /* @__PURE__ */ J(dn, { live: o.window.following }), /* @__PURE__ */ J(n, {
									size: "sm",
									variant: "ghost",
									disabled: R.start <= z.start,
									onClick: re,
									children: "← Earlier work"
								})]
							})]
						})
					]
				}), U !== "none" && L && (F && a?.kind === "node" ? /* @__PURE__ */ J(Vn, {
					node: F,
					detail: o.details?.[F.id],
					selection: a,
					onSelectionChange: s,
					onClose: ne,
					onOpen: e.onOpen,
					onReference: e.onReference,
					className: ue
				}) : /* @__PURE__ */ J(te, {
					title: I?.label || "Relationship",
					onClose: ne,
					className: ue,
					"data-testid": "activity-inspector",
					children: /* @__PURE__ */ J(bt, { ...e })
				}))]
			}),
			/* @__PURE__ */ J("div", {
				className: "shrink-0 border-t border-border px-2 py-1",
				children: /* @__PURE__ */ J(n, {
					size: "sm",
					variant: "ghost",
					"aria-expanded": oe,
					onClick: se,
					"data-testid": "work-activity-list-toggle",
					children: X ? "Show the graph" : oe ? "Hide accessible list" : "View as accessible list"
				})
			}),
			Q && /* @__PURE__ */ J("div", {
				className: "max-h-60 min-h-0 shrink-0 overflow-auto border-t border-border p-3",
				"data-testid": "work-activity-list-below",
				children: P
			})
		]
	});
}
//#endregion
//#region src/components/graph/work/WorkGraph.tsx
var Qn = 328, $n = 224, er = {
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
function tr(e) {
	return e.locked ? "Restricted work item" : e.title.trim() || "Untitled work item";
}
function nr({ data: e }) {
	return /* @__PURE__ */ Y("div", {
		className: "w-[248px]",
		children: [
			/* @__PURE__ */ J(X, {
				type: "target",
				position: Q.Left,
				isConnectable: !1,
				className: "opacity-0"
			}),
			/* @__PURE__ */ J(ct, {
				node: e.entity,
				selected: e.selected,
				onSelect: e.onSelect,
				onOpen: e.onOpen
			}),
			/* @__PURE__ */ J(X, {
				type: "source",
				position: Q.Right,
				isConnectable: !1,
				className: "opacity-0"
			})
		]
	});
}
function rr({ id: t, sourceX: n, sourceY: r, targetX: i, targetY: a, sourcePosition: o, targetPosition: s, markerEnd: c, data: l }) {
	let u = e(), [d, f, p] = se({
		sourceX: n,
		sourceY: r,
		targetX: i,
		targetY: a,
		sourcePosition: o,
		targetPosition: s
	});
	if (!l) return null;
	let m = l.entity.status === "running" && !l.entity.endedAt;
	return /* @__PURE__ */ Y(q, { children: [
		/* @__PURE__ */ J(re, {
			id: t,
			path: d,
			markerEnd: c,
			interactionWidth: 24,
			className: l.selected ? "stroke-primary" : "stroke-border-emphasis"
		}),
		m && !u ? /* @__PURE__ */ J("circle", {
			r: "4",
			className: "fill-primary",
			"aria-hidden": "true",
			"data-testid": `work-edge-motion-${l.entity.id}`,
			children: /* @__PURE__ */ J("animateMotion", {
				dur: "2s",
				repeatCount: "indefinite",
				path: d
			})
		}) : null,
		/* @__PURE__ */ J("foreignObject", {
			x: f - 104,
			y: p - 40,
			width: "208",
			height: "80",
			className: "overflow-visible",
			children: /* @__PURE__ */ J("div", {
				className: "nodrag nopan w-52",
				"data-work-edge-label": l.entity.id,
				children: /* @__PURE__ */ J(ut, {
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
var ir = { work: nr }, ar = { work: rr };
function or(e, t) {
	let n = new Set(e.map((e) => e.id)), r = new Map(e.map((e) => [e.id, 0])), i = new Map(e.map((e) => [e.id, []]));
	for (let e of t) !n.has(e.fromId) || !n.has(e.toId) || e.fromId === e.toId || (i.get(e.fromId)?.push(e.toId), r.set(e.toId, (r.get(e.toId) ?? 0) + 1));
	let a = /* @__PURE__ */ new Map(), o = e.filter((e) => r.get(e.id) === 0).sort(sr).map((e) => e.id);
	for (let e of o) a.set(e, 0);
	for (let e = 0; e < o.length; e += 1) {
		let t = o[e], n = (a.get(t) ?? 0) + 1;
		for (let e of (i.get(t) ?? []).sort()) a.set(e, Math.max(a.get(e) ?? 0, n)), r.set(e, (r.get(e) ?? 1) - 1), r.get(e) === 0 && o.push(e);
	}
	for (let t of [...e].sort(sr)) a.has(t.id) || a.set(t.id, er[t.kind] % 4);
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
			return n(e.id) - n(t.id) || sr(e, t);
		}), t.forEach((t, n) => {
			u.set(t.id, n), c.set(t.id, {
				x: 48 + e * Qn,
				y: 48 + n * $n
			});
		});
	}
	return c;
}
function sr(e, t) {
	return er[e.kind] - er[t.kind] || e.id.localeCompare(t.id);
}
function cr(e, t, n) {
	return e ? e.kind === "node" ? t.some((t) => t.id === e.id) : n.some((t) => t.id === e.id) : !1;
}
function lr({ state: e, errorMessage: t, onRetry: r }) {
	return e === "loading" ? /* @__PURE__ */ J("div", {
		role: "status",
		"data-testid": "work-graph-loading",
		className: "flex min-h-[22rem] items-center justify-center rounded-lg border border-border bg-surface text-sm text-text-secondary",
		children: "Loading shared work…"
	}) : e === "error" ? /* @__PURE__ */ J(f, {
		testId: "work-graph-error",
		icon: "!",
		title: "Shared work is unavailable",
		description: t || "The work graph could not be loaded.",
		action: r ? /* @__PURE__ */ J(n, {
			onClick: r,
			children: "Try again"
		}) : void 0
	}) : /* @__PURE__ */ J(f, {
		testId: "work-graph-empty",
		icon: "○",
		title: "No shared work",
		description: "There is no shared work available for this day."
	});
}
function ur({ nodes: e, edges: n, selection: r, viewport: i, day: a, timezone: o, sources: s = [], state: c = "ready", errorMessage: l, className: u, onSelectionChange: d, onViewportChange: f, onRetry: p, onOpen: m, onReference: h, onRequestCollaboration: g }) {
	let _ = W(() => new Set(e.map((e) => e.id)), [e]), v = W(() => n.filter((e) => _.has(e.fromId) && _.has(e.toId)), [n, _]), y = cr(r, e, v) ? r : null;
	H(() => {
		r && !y && d(null);
	}, [
		y,
		d,
		r
	]);
	let b = or(e.map((e) => ({
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
	})), C = v.map((e) => ({
		id: e.id,
		type: "work",
		source: e.fromId,
		target: e.toId,
		selected: y?.kind === "edge" && y.id === e.id,
		focusable: !1,
		data: {
			entity: e,
			selected: y?.kind === "edge" && y.id === e.id,
			fromLabel: tr(x.get(e.fromId)),
			toLabel: tr(x.get(e.toId)),
			onSelect: (e) => d({
				kind: "edge",
				id: e
			})
		}
	}));
	if (c === "loading" || c === "error" || c === "empty" || e.length === 0) return /* @__PURE__ */ J("section", {
		"aria-label": "Shared work graph",
		className: t("min-w-0", u),
		children: /* @__PURE__ */ J(lr, {
			state: c === "ready" ? "empty" : c,
			errorMessage: l,
			onRetry: p
		})
	});
	let w = s.filter((e) => e.health !== "available");
	return /* @__PURE__ */ Y("section", {
		"aria-label": "Shared work graph",
		className: t("min-w-0 space-y-4", u),
		"data-state": c,
		children: [
			c === "partial" ? /* @__PURE__ */ Y("div", {
				role: "status",
				"data-testid": "work-graph-partial",
				className: "rounded-lg border border-warning-border bg-warning-bg px-3 py-2 text-sm text-warning-fg",
				children: [/* @__PURE__ */ J("p", {
					className: "font-medium",
					children: "Some work sources are unavailable or delayed."
				}), w.length > 0 ? /* @__PURE__ */ J("ul", {
					className: "mt-1 list-disc pl-5 text-xs",
					children: w.map((e) => /* @__PURE__ */ J("li", { children: e.message || `${e.source} is ${e.health}.` }, e.source))
				}) : null]
			}) : null,
			a ? /* @__PURE__ */ J(Nt, {
				day: a,
				timezone: o || "UTC",
				nodes: e,
				edges: v,
				selection: y,
				onSelectionChange: d
			}) : null,
			/* @__PURE__ */ Y("div", {
				className: "grid min-w-0 grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_20rem]",
				"data-testid": "work-graph-layout",
				children: [/* @__PURE__ */ J("div", {
					className: "relative h-[clamp(22rem,55vh,42rem)] min-w-0 overflow-hidden rounded-lg border border-border bg-surface",
					"data-testid": "work-graph-canvas",
					children: /* @__PURE__ */ Y(oe, {
						nodes: S,
						edges: C,
						nodeTypes: ir,
						edgeTypes: ar,
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
						children: [/* @__PURE__ */ J(ne, {
							gap: 20,
							size: 1,
							color: "var(--color-border)"
						}), /* @__PURE__ */ J(ie, { showInteractive: !1 })]
					})
				}), /* @__PURE__ */ J(bt, {
					nodes: e,
					edges: v,
					selection: y,
					onSelectionChange: d,
					onOpen: m,
					onReference: h,
					onRequestCollaboration: g
				})]
			}),
			/* @__PURE__ */ J(ht, {
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
function dr(e) {
	return e.activity && e.nodes.length > 0 && e.state !== "loading" && e.state !== "error" && e.state !== "empty" ? /* @__PURE__ */ J(Zn, {
		...e,
		activity: e.activity
	}) : /* @__PURE__ */ J(ur, { ...e });
}
//#endregion
export { Ne as A, Ue as C, Ie as D, Le as E, me as F, $ as I, he as L, be as M, De as N, Me as O, Ce as P, fe as R, We as S, Re as T, ut as _, In as a, tt as b, hn as c, Rt as d, Ut as f, ht as g, bt as h, Nn as i, Pe as j, Fe as k, Qt as l, Ot as m, Hn as n, jn as o, At as p, Vn as r, _n as s, dr as t, zt as u, ct as v, Be as w, $e as x, nt as y, pe as z };
